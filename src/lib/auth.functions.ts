import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import type { PublicUser } from "@/server/auth";

export type { PublicUser };

const signInValidator = z.object({
  email: z.string().max(180),
  password: z.string().min(8).max(200),
});

const signUpValidator = z.object({
  name: z.string().max(80),
  email: z.string().max(180),
  password: z.string().min(8).max(200),
});

const progressValidator = z.object({
  primarySpecialization: z.string().max(80).nullable(),
  level: z.string().max(40).nullable(),
  careerGoal: z.string().max(400).nullable(),
  interests: z.array(z.string().max(80)).max(40),
  completedTopics: z.array(z.string().max(80)).max(2000),
  completedProjects: z.array(z.string().max(80)).max(500),
});

export const getCurrentUser = createServerFn({ method: "GET" }).handler(async () => {
  const { currentUser } = await import("@/server/auth");
  return currentUser();
});

export const signInAccount = createServerFn({ method: "POST" })
  .validator((d: unknown) => signInValidator.parse(d))
  .handler(async ({ data }) => {
    const { clientIp, isEmail, rateLimit } = await import("@/server/security");
    const { authenticate, issueSession, toPublic } = await import("@/server/auth");

    rateLimit(`login:${clientIp()}`, 8, 15 * 60 * 1000);
    if (!isEmail(data.email)) throw new Error("Invalid email");
    const user = await authenticate(data.email, data.password);
    if (!user) throw new Error("INVALID_CREDENTIALS");
    await issueSession(user.id);
    return toPublic(user);
  });

export const signUpAccount = createServerFn({ method: "POST" })
  .validator((d: unknown) => signUpValidator.parse(d))
  .handler(async ({ data }) => {
    const { clientIp, isEmail, rateLimit, sanitizeText } = await import("@/server/security");
    const { createUser, issueSession, toPublic } = await import("@/server/auth");

    rateLimit(`signup:${clientIp()}`, 5, 60 * 60 * 1000);
    if (!isEmail(data.email)) throw new Error("Invalid email");
    try {
      const user = await createUser({
        email: data.email,
        password: data.password,
        name: sanitizeText(data.name, 80),
      });
      await issueSession(user.id);
      return toPublic(user);
    } catch (e) {
      if (e instanceof Error && e.message === "EMAIL_TAKEN") throw new Error("EMAIL_TAKEN");
      throw e;
    }
  });

export const signOutAccount = createServerFn({ method: "POST" }).handler(async () => {
  const { clearSession } = await import("@/server/auth");
  await clearSession();
  return { ok: true };
});

export const saveProgress = createServerFn({ method: "POST" })
  .validator((d: unknown) => progressValidator.parse(d))
  .handler(async ({ data }) => {
    const { currentUser } = await import("@/server/auth");
    const { withDb } = await import("@/server/store");

    const user = await currentUser();
    if (!user) return { ok: false };
    await withDb((db) => {
      const row = {
        userId: user.id,
        primarySpecialization: data.primarySpecialization,
        level: data.level,
        careerGoal: data.careerGoal,
        interests: data.interests,
        completedTopics: data.completedTopics,
        completedProjects: data.completedProjects,
        updatedAt: new Date().toISOString(),
      };
      const idx = db.progress.findIndex((p) => p.userId === user.id);
      if (idx >= 0) db.progress[idx] = row;
      else db.progress.push(row);
    });
    return { ok: true };
  });
