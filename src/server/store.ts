import { mkdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import type { Specialization } from "@/types";

export type UserRole = "user" | "admin";

export interface StoredUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: UserRole;
  banned: boolean;
  createdAt: string;
  lastSignInAt: string | null;
}

export interface StoredSession {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: string;
}

export interface UserProgressRow {
  userId: string;
  primarySpecialization: string | null;
  level: string | null;
  careerGoal: string | null;
  interests: string[];
  completedTopics: string[];
  completedProjects: string[];
  updatedAt: string;
}

export interface CatalogRow {
  id: string;
  data: Specialization | null;
  hidden: boolean;
}

export interface PageView {
  path: string;
  sessionId: string;
  referrer: string | null;
  lang: string | null;
  createdAt: string;
}

export interface PaperSummary {
  idea: string;
  summary: string;
  findings: string[];
  fieldApplications?: string[];
}

export interface SavedPaperRow {
  id: string;
  userId: string;
  paperId: string;
  title: string;
  year: number;
  authors: string[];
  venue: string | null;
  url: string;
  scholarUrl: string;
  pdfUrl: string | null;
  savedAt: string;
}

export interface DatabaseState {
  users: StoredUser[];
  sessions: StoredSession[];
  progress: UserProgressRow[];
  catalog: CatalogRow[];
  pageViews: PageView[];
  summaries: Record<string, PaperSummary>;
  savedPapers: SavedPaperRow[];
}

function dbFilePath() {
  return process.env["SQLITE_FILE"] || join(process.cwd(), "data", "agripath.sqlite");
}

function jsonLegacyPath() {
  return process.env["DATA_FILE"] || join(process.cwd(), "data", "agripath.json");
}

let sqliteInstance: DatabaseSync | null = null;

function getSqlite(): DatabaseSync {
  if (sqliteInstance) return sqliteInstance;

  const file = dbFilePath();
  // Ensure data directory exists
  try {
    const fs = require("node:fs");
    fs.mkdirSync(dirname(file), { recursive: true });
  } catch {
    // ignore
  }

  const db = new DatabaseSync(file);
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");

  // Schema creation
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      banned INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      last_sign_in_at TEXT
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      token_hash TEXT UNIQUE NOT NULL,
      expires_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token_hash);
    CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);

    CREATE TABLE IF NOT EXISTS progress (
      user_id TEXT PRIMARY KEY,
      primary_specialization TEXT,
      level TEXT,
      career_goal TEXT,
      interests TEXT NOT NULL,
      completed_topics TEXT NOT NULL,
      completed_projects TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS catalog (
      id TEXT PRIMARY KEY,
      data TEXT,
      hidden INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS page_views (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      path TEXT NOT NULL,
      session_id TEXT NOT NULL,
      referrer TEXT,
      lang TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS paper_summaries (
      id TEXT PRIMARY KEY,
      idea TEXT NOT NULL,
      summary TEXT NOT NULL,
      findings TEXT NOT NULL,
      field_applications TEXT,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS saved_papers (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      paper_id TEXT NOT NULL,
      title TEXT NOT NULL,
      year INTEGER NOT NULL,
      authors TEXT NOT NULL,
      venue TEXT,
      url TEXT NOT NULL,
      scholar_url TEXT NOT NULL,
      pdf_url TEXT,
      saved_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_saved_user ON saved_papers(user_id);

    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      action TEXT NOT NULL,
      ip TEXT,
      user_id TEXT,
      details TEXT,
      created_at TEXT NOT NULL
    );
  `);

  sqliteInstance = db;
  migrateLegacyJson(db);
  return db;
}

// Migrate from agripath.json if it exists and users table is empty
function migrateLegacyJson(db: DatabaseSync) {
  try {
    const userCount = (db.prepare("SELECT COUNT(*) as c FROM users").get() as { c: number } | undefined)?.c ?? 0;
    if (userCount > 0) return;

    const legacy = jsonLegacyPath();
    const fs = require("node:fs");
    if (!fs.existsSync(legacy)) return;

    const raw = fs.readFileSync(legacy, "utf8");
    const json = JSON.parse(raw);

    if (Array.isArray(json.users)) {
      const insUser = db.prepare(
        "INSERT OR IGNORE INTO users (id, email, name, password_hash, role, banned, created_at, last_sign_in_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      );
      for (const u of json.users) {
        insUser.run(u.id, u.email, u.name, u.passwordHash, u.role, u.banned ? 1 : 0, u.createdAt, u.lastSignInAt);
      }
    }

    if (Array.isArray(json.sessions)) {
      const insSession = db.prepare("INSERT OR IGNORE INTO sessions (id, user_id, token_hash, expires_at) VALUES (?, ?, ?, ?)");
      for (const s of json.sessions) {
        insSession.run(s.id, s.userId, s.tokenHash, s.expiresAt);
      }
    }

    if (Array.isArray(json.progress)) {
      const insProgress = db.prepare(
        "INSERT OR REPLACE INTO progress (user_id, primary_specialization, level, career_goal, interests, completed_topics, completed_projects, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      );
      for (const p of json.progress) {
        insProgress.run(
          p.userId,
          p.primarySpecialization,
          p.level,
          p.careerGoal,
          JSON.stringify(p.interests || []),
          JSON.stringify(p.completedTopics || []),
          JSON.stringify(p.completedProjects || []),
          p.updatedAt,
        );
      }
    }

    if (json.summaries && typeof json.summaries === "object") {
      const insSum = db.prepare(
        "INSERT OR REPLACE INTO paper_summaries (id, idea, summary, findings, field_applications, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
      );
      for (const [id, s] of Object.entries(json.summaries as Record<string, PaperSummary>)) {
        insSum.run(id, s.idea, s.summary, JSON.stringify(s.findings || []), JSON.stringify(s.fieldApplications || []), new Date().toISOString());
      }
    }
  } catch {
    // ignore migration error
  }
}

// Synchronize DatabaseState from SQLite
function loadFullState(db: DatabaseSync): DatabaseState {
  const usersRows = db.prepare("SELECT * FROM users").all() as Record<string, unknown>[];
  const users: StoredUser[] = usersRows.map((r) => ({
    id: String(r["id"]),
    email: String(r["email"]),
    name: String(r["name"]),
    passwordHash: String(r["password_hash"]),
    role: (r["role"] as UserRole) || "user",
    banned: Boolean(r["banned"]),
    createdAt: String(r["created_at"]),
    lastSignInAt: r["last_sign_in_at"] ? String(r["last_sign_in_at"]) : null,
  }));

  const sessionsRows = db.prepare("SELECT * FROM sessions").all() as Record<string, unknown>[];
  const sessions: StoredSession[] = sessionsRows.map((r) => ({
    id: String(r["id"]),
    userId: String(r["user_id"]),
    tokenHash: String(r["token_hash"]),
    expiresAt: String(r["expires_at"]),
  }));

  const progressRows = db.prepare("SELECT * FROM progress").all() as Record<string, unknown>[];
  const progress: UserProgressRow[] = progressRows.map((r) => {
    let interests: string[] = [];
    let completedTopics: string[] = [];
    let completedProjects: string[] = [];
    try { interests = JSON.parse(String(r["interests"] || "[]")); } catch {}
    try { completedTopics = JSON.parse(String(r["completed_topics"] || "[]")); } catch {}
    try { completedProjects = JSON.parse(String(r["completed_projects"] || "[]")); } catch {}

    return {
      userId: String(r["user_id"]),
      primarySpecialization: r["primary_specialization"] ? String(r["primary_specialization"]) : null,
      level: r["level"] ? String(r["level"]) : null,
      careerGoal: r["career_goal"] ? String(r["career_goal"]) : null,
      interests,
      completedTopics,
      completedProjects,
      updatedAt: String(r["updated_at"]),
    };
  });

  const catalogRows = db.prepare("SELECT * FROM catalog").all() as Record<string, unknown>[];
  const catalog: CatalogRow[] = catalogRows.map((r) => {
    let data: Specialization | null = null;
    try { if (r["data"]) data = JSON.parse(String(r["data"])); } catch {}
    return {
      id: String(r["id"]),
      data,
      hidden: Boolean(r["hidden"]),
    };
  });

  const pageViewRows = db.prepare("SELECT * FROM page_views ORDER BY id DESC LIMIT 500").all() as Record<string, unknown>[];
  const pageViews: PageView[] = pageViewRows.map((r) => ({
    path: String(r["path"]),
    sessionId: String(r["session_id"]),
    referrer: r["referrer"] ? String(r["referrer"]) : null,
    lang: r["lang"] ? String(r["lang"]) : null,
    createdAt: String(r["created_at"]),
  }));

  const summaryRows = db.prepare("SELECT * FROM paper_summaries").all() as Record<string, unknown>[];
  const summaries: Record<string, PaperSummary> = {};
  for (const r of summaryRows) {
    let findings: string[] = [];
    let fieldApplications: string[] = [];
    try { findings = JSON.parse(String(r["findings"] || "[]")); } catch {}
    try { fieldApplications = JSON.parse(String(r["field_applications"] || "[]")); } catch {}
    summaries[String(r["id"])] = {
      idea: String(r["idea"]),
      summary: String(r["summary"]),
      findings,
      fieldApplications,
    };
  }

  const savedRows = db.prepare("SELECT * FROM saved_papers").all() as Record<string, unknown>[];
  const savedPapers: SavedPaperRow[] = savedRows.map((r) => {
    let authors: string[] = [];
    try { authors = JSON.parse(String(r["authors"] || "[]")); } catch {}
    return {
      id: String(r["id"]),
      userId: String(r["user_id"]),
      paperId: String(r["paper_id"]),
      title: String(r["title"]),
      year: Number(r["year"]),
      authors,
      venue: r["venue"] ? String(r["venue"]) : null,
      url: String(r["url"]),
      scholarUrl: String(r["scholar_url"]),
      pdfUrl: r["pdf_url"] ? String(r["pdf_url"]) : null,
      savedAt: String(r["saved_at"]),
    };
  });

  return { users, sessions, progress, catalog, pageViews, summaries, savedPapers };
}

// Persist mutated state back into SQLite
function saveFullState(db: DatabaseSync, state: DatabaseState) {
  // Sync users
  const upsertUser = db.prepare(`
    INSERT INTO users (id, email, name, password_hash, role, banned, created_at, last_sign_in_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      email=excluded.email,
      name=excluded.name,
      password_hash=excluded.password_hash,
      role=excluded.role,
      banned=excluded.banned,
      last_sign_in_at=excluded.last_sign_in_at
  `);
  for (const u of state.users) {
    upsertUser.run(u.id, u.email, u.name, u.passwordHash, u.role, u.banned ? 1 : 0, u.createdAt, u.lastSignInAt);
  }

  // Delete removed users
  if (state.users.length > 0) {
    const userIds = state.users.map((u) => `'${u.id}'`).join(",");
    db.exec(`DELETE FROM users WHERE id NOT IN (${userIds})`);
  }

  // Sync sessions
  db.exec("DELETE FROM sessions");
  const insSession = db.prepare("INSERT INTO sessions (id, user_id, token_hash, expires_at) VALUES (?, ?, ?, ?)");
  for (const s of state.sessions) {
    insSession.run(s.id, s.userId, s.tokenHash, s.expiresAt);
  }

  // Sync progress
  const upsertProgress = db.prepare(`
    INSERT INTO progress (user_id, primary_specialization, level, career_goal, interests, completed_topics, completed_projects, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET
      primary_specialization=excluded.primary_specialization,
      level=excluded.level,
      career_goal=excluded.career_goal,
      interests=excluded.interests,
      completed_topics=excluded.completed_topics,
      completed_projects=excluded.completed_projects,
      updated_at=excluded.updated_at
  `);
  for (const p of state.progress) {
    upsertProgress.run(
      p.userId,
      p.primarySpecialization,
      p.level,
      p.careerGoal,
      JSON.stringify(p.interests || []),
      JSON.stringify(p.completedTopics || []),
      JSON.stringify(p.completedProjects || []),
      p.updatedAt,
    );
  }

  // Sync summaries
  const upsertSummary = db.prepare(`
    INSERT INTO paper_summaries (id, idea, summary, findings, field_applications, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      idea=excluded.idea,
      summary=excluded.summary,
      findings=excluded.findings,
      field_applications=excluded.field_applications,
      updated_at=excluded.updated_at
  `);
  for (const [id, s] of Object.entries(state.summaries)) {
    upsertSummary.run(
      id,
      s.idea,
      s.summary,
      JSON.stringify(s.findings || []),
      JSON.stringify(s.fieldApplications || []),
      new Date().toISOString(),
    );
  }

  // Sync catalog
  const upsertCat = db.prepare(`
    INSERT INTO catalog (id, data, hidden) VALUES (?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET data=excluded.data, hidden=excluded.hidden
  `);
  for (const c of state.catalog) {
    upsertCat.run(c.id, c.data ? JSON.stringify(c.data) : null, c.hidden ? 1 : 0);
  }
}

let queue: Promise<unknown> = Promise.resolve();

export function withDb<T>(fn: (db: DatabaseState) => Promise<T> | T): Promise<T> {
  const run = queue.then(async () => {
    const sqlite = getSqlite();
    const state = loadFullState(sqlite);
    const result = await fn(state);
    saveFullState(sqlite, state);
    return result;
  });
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

export function readDb<T>(fn: (db: DatabaseState) => Promise<T> | T): Promise<T> {
  const run = queue.then(async () => {
    const sqlite = getSqlite();
    const state = loadFullState(sqlite);
    return fn(state);
  });
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

export function logAudit(action: string, ip?: string, userId?: string, details?: string) {
  try {
    const db = getSqlite();
    db.prepare("INSERT INTO audit_logs (action, ip, user_id, details, created_at) VALUES (?, ?, ?, ?, ?)").run(
      action,
      ip || null,
      userId || null,
      details || null,
      new Date().toISOString(),
    );
  } catch {
    // non-fatal
  }
}
