import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { supabase } from "@/integrations/supabase/client";
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

const signInLocalAccount = createServerFn({ method: "POST" })
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

const signUpLocalAccount = createServerFn({ method: "POST" })
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

const signOutLocalAccount = createServerFn({ method: "POST" }).handler(async () => {
  const { clearSession } = await import("@/server/auth");
  await clearSession();
  return { ok: true };
});

function supabaseConfigured() {
  const configured = Boolean(
    import.meta.env["VITE_SUPABASE_URL"] &&
      import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"],
  );
  if (!configured && import.meta.env.PROD) {
    throw new Error("Missing Supabase environment variables");
  }
  return configured;
}

async function toPublicSupabaseUser(user: {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
}): Promise<PublicUser> {
  let role: PublicUser["role"] = "user";
  const { data: claimedAdmin, error: claimError } = await supabase.rpc("claim_admin");
  if (!claimError && claimedAdmin) {
    role = "admin";
  } else {
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id);
    if (roles?.some((entry) => entry.role === "admin")) role = "admin";
  }

  const metadataName = user.user_metadata?.["name"];
  return {
    id: user.id,
    email: user.email ?? "",
    name: typeof metadataName === "string" ? metadataName : user.email?.split("@")[0] ?? "User",
    role,
  };
}

export async function signInAccount({ data }: { data: z.infer<typeof signInValidator> }) {
  if (!supabaseConfigured()) return signInLocalAccount({ data });
  const { data: result, error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    if (error.code === "invalid_credentials") throw new Error("INVALID_CREDENTIALS");
    throw error;
  }
  if (!result.user) throw new Error("INVALID_CREDENTIALS");
  return toPublicSupabaseUser(result.user);
}

export async function signUpAccount({ data }: { data: z.infer<typeof signUpValidator> }) {
  if (!supabaseConfigured()) return signUpLocalAccount({ data });
  const { data: result, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: { data: { name: data.name.trim().slice(0, 80) } },
  });
  if (error) {
    if (error.code === "user_already_exists") throw new Error("EMAIL_TAKEN");
    throw error;
  }
  if (!result.user) throw new Error("SIGNUP_FAILED");
  if (!result.session) throw new Error("EMAIL_CONFIRMATION_REQUIRED");
  return toPublicSupabaseUser(result.user);
}

export async function signOutAccount() {
  if (!supabaseConfigured()) return signOutLocalAccount();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return { ok: true };
}

export const saveProgress = createServerFn({ method: "POST" })
  .validator((d: unknown) => progressValidator.parse(d))
  .handler(async ({ data }) => {
    const { currentUser, supabaseForCurrentRequest } = await import("@/server/auth");
    const user = await currentUser();
    if (!user) return { ok: false };

    const supabaseClient = supabaseForCurrentRequest();
    if (supabaseClient) {
      const { error } = await supabaseClient.from("user_progress").upsert(
        {
          user_id: user.id,
          primary_specialization: data.primarySpecialization,
          level: data.level,
          career_goal: data.careerGoal,
          interests: data.interests,
          completed_topics: data.completedTopics,
          completed_projects: data.completedProjects,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      );
      if (error) throw error;
      return { ok: true };
    }

    const { withDb } = await import("@/server/store");
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
