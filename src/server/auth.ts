import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { deleteCookie, getCookie, getRequest, setCookie } from "@tanstack/react-start/server";

import { readDb, withDb, type StoredUser, type UserRole } from "./store";

const scryptAsync = promisify(scrypt);
const COOKIE = "agripath_session";
const SESSION_DAYS = 7;

export type PublicUser = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
};

function sessionSecret() {
  const secret = process.env["SESSION_SECRET"];
  if (secret && secret.length >= 32) return secret;
  return "dev-only-change-SESSION_SECRET-before-production-use!!";
}

export function hashToken(token: string) {
  return createHash("sha256").update(`${sessionSecret()}:${token}`).digest("hex");
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [salt, hex] = stored.split(":");
  if (!salt || !hex) return false;
  const derived = (await scryptAsync(password, salt, 64)) as Buffer;
  const expected = Buffer.from(hex, "hex");
  if (derived.length !== expected.length) return false;
  return timingSafeEqual(derived, expected);
}

function cookieSecure() {
  try {
    const url = getRequest().url;
    return url.startsWith("https://");
  } catch {
    return process.env["NODE_ENV"] === "production";
  }
}

export function toPublic(user: StoredUser): PublicUser {
  return { id: user.id, email: user.email, name: user.name, role: user.role };
}

export const PRIMARY_ADMIN_EMAIL = "dr.sherifemadd@gmail.com";

export function isAuthorizedAdminEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  const envAdmin = (process.env["ADMIN_EMAIL"] ?? "").trim().toLowerCase();
  return normalized === PRIMARY_ADMIN_EMAIL || (Boolean(envAdmin) && normalized === envAdmin);
}

export async function createUser(input: { email: string; password: string; name: string }) {
  const email = input.email.trim().toLowerCase();
  const passwordHash = await hashPassword(input.password);
  return withDb((db) => {
    if (db.users.some((u) => u.email === email)) throw new Error("EMAIL_TAKEN");
    const role: UserRole = isAuthorizedAdminEmail(email) ? "admin" : "user";
    const user: StoredUser = {
      id: crypto.randomUUID(),
      email,
      name: input.name.trim().slice(0, 80) || email.split("@")[0] || "User",
      passwordHash,
      role,
      banned: false,
      createdAt: new Date().toISOString(),
      lastSignInAt: null,
    };
    db.users.push(user);
    return user;
  });
}

export async function authenticate(email: string, password: string) {
  const user = await readDb((db) => db.users.find((u) => u.email === email.trim().toLowerCase()) ?? null);
  if (!user) return null;
  if (user.banned) throw new Error("ACCOUNT_DISABLED");
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return null;
  return user;
}

export async function issueSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 864e5).toISOString();
  await withDb((db) => {
    db.sessions = db.sessions.filter((s) => s.userId !== userId && s.expiresAt > new Date().toISOString());
    db.sessions.push({
      id: crypto.randomUUID(),
      userId,
      tokenHash: hashToken(token),
      expiresAt,
    });
    const user = db.users.find((u) => u.id === userId);
    if (user) user.lastSignInAt = new Date().toISOString();
  });
  setCookie(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: cookieSecure(),
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function clearSession() {
  const token = getCookie(COOKIE);
  if (token) {
    const hash = hashToken(token);
    await withDb((db) => {
      db.sessions = db.sessions.filter((s) => s.tokenHash !== hash);
    });
  }
  deleteCookie(COOKIE);
}

export async function currentUser(): Promise<PublicUser | null> {
  const token = getCookie(COOKIE);
  if (!token) return null;
  const hash = hashToken(token);
  const now = new Date().toISOString();
  return readDb((db) => {
    const session = db.sessions.find((s) => s.tokenHash === hash && s.expiresAt > now);
    if (!session) return null;
    const user = db.users.find((u) => u.id === session.userId);
    if (!user || user.banned) return null;
    return toPublic(user);
  });
}

export async function requireUser(): Promise<PublicUser> {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

export async function requireAdmin(): Promise<PublicUser> {
  const user = await requireUser();
  if (user.role !== "admin" || !isAuthorizedAdminEmail(user.email)) {
    throw new Error("Forbidden: Admin privileges restricted");
  }
  return user;
}
