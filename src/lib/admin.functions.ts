import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export interface AdminUser {
  id: string;
  email: string | null;
  name: string | null;
  provider: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  confirmed: boolean;
  banned: boolean;
}

const banValidator = z.object({
  userId: z.string().max(80),
  banned: z.boolean(),
});

export const listRegisteredUsers = createServerFn({ method: "GET" }).handler(async () => {
  const { requireAdmin } = await import("@/server/auth");
  const { readDb } = await import("@/server/store");

  await requireAdmin();
  const users = await readDb((db) =>
    db.users
      .map((u) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        provider: "password",
        created_at: u.createdAt,
        last_sign_in_at: u.lastSignInAt,
        confirmed: true,
        banned: u.banned,
      }))
      .sort((a, b) => b.created_at.localeCompare(a.created_at)),
  );
  return { users };
});

export const setUserBanned = createServerFn({ method: "POST" })
  .validator((d: unknown) => banValidator.parse(d))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/server/auth");
    const { withDb } = await import("@/server/store");

    const admin = await requireAdmin();
    if (data.userId === admin.id) throw new Error("لا يمكنك إيقاف حسابك");
    await withDb((db) => {
      const user = db.users.find((u) => u.id === data.userId);
      if (!user) throw new Error("User not found");
      user.banned = data.banned;
      if (data.banned) db.sessions = db.sessions.filter((s) => s.userId !== data.userId);
    });
    return { ok: true };
  });

export const listUserProgress = createServerFn({ method: "GET" }).handler(async () => {
  const { requireAdmin } = await import("@/server/auth");
  const { readDb } = await import("@/server/store");

  await requireAdmin();
  return readDb((db) =>
    Object.fromEntries(
      db.progress.map((r) => [
        r.userId,
        {
          primary_specialization: r.primarySpecialization,
          level: r.level,
          career_goal: r.careerGoal,
          completed_topics: r.completedTopics,
          completed_projects: r.completedProjects,
          updated_at: r.updatedAt,
        },
      ]),
    ),
  );
});

export const claimAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const { currentUser } = await import("@/server/auth");
  const user = await currentUser();
  return Boolean(user?.role === "admin");
});
