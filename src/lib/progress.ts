import type { Specialization } from "@/types";
import { specializations } from "@/data/specializations";

export const specTopicIds = (spec: Specialization) =>
  spec.stages.flatMap((s) => s.topics.map((t) => t.id));

export function specProgress(spec: Specialization, completedTopics: string[]) {
  const ids = specTopicIds(spec);
  if (!ids.length) return { done: 0, total: 0, pct: 0 };
  const done = ids.filter((id) => completedTopics.includes(id)).length;
  return { done, total: ids.length, pct: Math.round((done / ids.length) * 100) };
}

export function stageState(
  spec: Specialization,
  stageIndex: number,
  completedTopics: string[],
): "completed" | "inProgress" | "available" | "locked" {
  const stage = spec.stages[stageIndex];
  if (!stage) return "locked";
  const ids = stage.topics.map((t) => t.id);
  const done = ids.filter((id) => completedTopics.includes(id)).length;
  if (done === ids.length && ids.length > 0) return "completed";
  if (done > 0) return "inProgress";
  if (stageIndex === 0) return "available";
  const prev = (spec.stages[stageIndex - 1]?.topics ?? []).map((t) => t.id);
  const prevDone = prev.filter((id) => completedTopics.includes(id)).length;
  return prevDone >= Math.ceil(prev.length / 2) ? "available" : "locked";
}

export function nextTopic(spec: Specialization, completedTopics: string[]) {
  for (const stage of spec.stages) {
    for (const topic of stage.topics) {
      if (!completedTopics.includes(topic.id)) return { stage, topic };
    }
  }
  return null;
}

export interface Readiness {
  total: number;
  parts: { key: string; label: { ar: string; en: string }; value: number; max: number }[];
}

export function readiness(opts: {
  specId: string | null;
  completedTopics: string[];
  completedProjects: string[];
  notes: number;
  resources: number;
  onboarded: boolean;
}): Readiness {
  const spec = specializations.find((s) => s.id === opts.specId);
  const learning = spec ? specProgress(spec, opts.completedTopics).pct : 0;
  const projTotal = spec?.projects.length ?? 0;
  const projDone = spec
    ? spec.projects.filter((p) => opts.completedProjects.includes(p.id)).length
    : 0;
  const parts = [
    {
      key: "learning",
      label: { ar: "إتمام خريطة الطريق", en: "Roadmap completion" },
      value: Math.round((learning / 100) * 40),
      max: 40,
    },
    {
      key: "projects",
      label: { ar: "المشاريع العملية", en: "Practical projects" },
      value: projTotal ? Math.round((projDone / projTotal) * 30) : 0,
      max: 30,
    },
    {
      key: "notes",
      label: { ar: "التوثيق والملاحظات", en: "Documentation & notes" },
      value: Math.min(15, opts.notes * 3),
      max: 15,
    },
    {
      key: "resources",
      label: { ar: "المصادر والتعلّم الذاتي", en: "Resources & self-learning" },
      value: Math.min(10, opts.resources * 2),
      max: 10,
    },
    {
      key: "profile",
      label: { ar: "اكتمال الملف المهني", en: "Profile completeness" },
      value: opts.onboarded ? 5 : 0,
      max: 5,
    },
  ];
  return { total: parts.reduce((a, p) => a + p.value, 0), parts };
}
