import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import type { CatalogRow } from "@/server/store";

export type { CatalogRow };

const pageViewValidator = z.object({
  path: z.string().max(300),
  sessionId: z.string().max(80),
  referrer: z.string().max(300).nullable(),
  lang: z.string().max(8).nullable(),
});

const upsertCatalogValidator = z.object({
  id: z.string().max(80),
  hidden: z.boolean(),
  data: z.unknown().nullable(),
});

const idValidator = z.object({
  id: z.string().max(80),
});

const pageViewsQueryValidator = z.object({
  days: z.number().int().min(1).max(90).default(7),
});

export const listCatalog = createServerFn({ method: "GET" }).handler(async () => {
  const { readDb } = await import("@/server/store");
  return readDb((db) => db.catalog as CatalogRow[]);
});

export const trackPageView = createServerFn({ method: "POST" })
  .validator((d: unknown) => pageViewValidator.parse(d))
  .handler(async ({ data }) => {
    const { clientIp, rateLimit, sanitizeText } = await import("@/server/security");
    const { withDb } = await import("@/server/store");

    rateLimit(`pv:${clientIp()}`, 40, 60 * 1000);
    const path = sanitizeText(data.path, 300);
    if (path.startsWith("/admin")) return { ok: true };
    await withDb((db) => {
      db.pageViews.push({
        path,
        sessionId: sanitizeText(data.sessionId, 80),
        referrer: data.referrer ? sanitizeText(data.referrer, 300) : null,
        lang: data.lang,
        createdAt: new Date().toISOString(),
      });
      if (db.pageViews.length > 20000) db.pageViews = db.pageViews.slice(-15000);
    });
    return { ok: true };
  });

export const upsertCatalogRow = createServerFn({ method: "POST" })
  .validator((d: unknown) => upsertCatalogValidator.parse(d))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/server/auth");
    const { withDb } = await import("@/server/store");

    await requireAdmin();
    await withDb((db) => {
      const row: CatalogRow = { id: data.id, hidden: data.hidden, data: (data.data as CatalogRow["data"]) ?? null };
      const idx = db.catalog.findIndex((r) => r.id === data.id);
      if (idx >= 0) db.catalog[idx] = row;
      else db.catalog.push(row);
    });
    return { ok: true };
  });

export const deleteCatalogRow = createServerFn({ method: "POST" })
  .validator((d: unknown) => idValidator.parse(d))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/server/auth");
    const { withDb } = await import("@/server/store");

    await requireAdmin();
    await withDb((db) => {
      db.catalog = db.catalog.filter((r) => r.id !== data.id);
    });
    return { ok: true };
  });

export const listPageViews = createServerFn({ method: "GET" })
  .validator((d: unknown) => pageViewsQueryValidator.parse(d ?? { days: 7 }))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/server/auth");
    const { readDb } = await import("@/server/store");

    await requireAdmin();
    const since = Date.now() - data.days * 864e5;
    return readDb((db) =>
      db.pageViews
        .filter((v) => +new Date(v.createdAt) >= since)
        .slice(-5000)
        .map((v) => ({
          path: v.path,
          session_id: v.sessionId,
          created_at: v.createdAt,
          referrer: v.referrer,
        })),
    );
  });

export const whoAmIAdmin = createServerFn({ method: "GET" }).handler(async () => {
  const { currentUser } = await import("@/server/auth");
  const user = await currentUser();
  return { user, isAdmin: user?.role === "admin" };
});
