import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { RESEARCH_TOPICS, type LivePaper, type PaperSummary, type ResearchQuery } from "@/types/research";

export type { LivePaper, PaperSummary, ResearchQuery };
export const researchTopics = RESEARCH_TOPICS;

const searchValidator = z.object({
  q: z.string().max(160).optional(),
  topic: z.string().max(60).optional(),
  year: z.string().max(10).optional(),
  openAccess: z.boolean().optional(),
  sort: z.enum(["date", "citations"]).optional(),
  page: z.number().int().min(1).max(30).default(1),
});

const summarizeValidator = z.object({
  id: z.string().max(120),
  title: z.string().max(800),
  abstract: z.string().max(8000),
});

export const listLivePapers = createServerFn({ method: "GET" })
  .validator((d: unknown) => searchValidator.parse(d))
  .handler(async ({ data }) => {
    const { clientIp, rateLimit } = await import("@/server/security");
    const { searchResearch } = await import("@/server/research-engine");

    rateLimit(`research:${clientIp()}`, 60, 60 * 1000);
    return searchResearch(data);
  });

export const summarizePaper = createServerFn({ method: "POST" })
  .validator((d: unknown) => summarizeValidator.parse(d))
  .handler(async ({ data }): Promise<PaperSummary> => {
    const { clientIp, rateLimit } = await import("@/server/security");
    const { readDb, withDb } = await import("@/server/store");
    const { aiSummary } = await import("@/server/research-engine");

    rateLimit(`sum:${clientIp()}`, 30, 60 * 1000);
    const cached = await readDb((db) => db.summaries[data.id] ?? null);
    if (cached) return cached;

    const summary = await aiSummary(data.title, data.abstract);
    await withDb((db) => {
      db.summaries[data.id] = summary;
    });
    return summary;
  });
