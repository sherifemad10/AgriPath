import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Wrench } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { allProjects, specializations } from "@/data/specializations";
import type { Difficulty } from "@/types";

export const Route = createFileRoute("/_authenticated/projects")({
  head: () => ({
    meta: [
      { title: "المشاريع العملية | أجريباث" },
      {
        name: "description",
        content: "مشاريع زراعية تطبيقية بمخرجات تصلح لملف أعمال تعرضه على صاحب العمل.",
      },
      { property: "og:title", content: "المشاريع العملية | أجريباث" },
      { property: "og:description", content: "نفّذ مشاريع حقلية حقيقية وابنِ ملف أعمالك." },
    ],
  }),
  component: Projects,
});

const levels: (Difficulty | "all")[] = ["all", "beginner", "intermediate", "advanced"];

function Projects() {
  const { t, L, lang } = useI18n();
  const store = useStore();
  const [spec, setSpec] = useState<string>("all");
  const [level, setLevel] = useState<Difficulty | "all">("all");

  const list = allProjects.filter(
    ({ project, spec: s }) =>
      (spec === "all" || s.id === spec) && (level === "all" || project.level === level),
  );
  const doneCount = list.filter(({ project }) => store.completedProjects.includes(project.id))
    .length;

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <h1 className="flex items-center gap-2 font-display text-3xl font-bold text-foreground">
          <Wrench className="size-6 text-primary" /> {t("projects")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {lang === "ar"
            ? `أكملت ${doneCount} من ${list.length} مشروعًا.`
            : `You completed ${doneCount} of ${list.length} projects.`}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={spec === "all" ? "default" : "outline"}
            onClick={() => setSpec("all")}
          >
            {lang === "ar" ? "كل التخصصات" : "All fields"}
          </Button>
          {specializations
            .filter((s) => s.projects.length > 0)
            .map((s) => (
              <Button
                key={s.id}
                size="sm"
                variant={spec === s.id ? "default" : "outline"}
                onClick={() => setSpec(s.id)}
              >
                {L(s.name)}
              </Button>
            ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {levels.map((l) => (
            <Badge
              key={l}
              variant={level === l ? "default" : "outline"}
              className="cursor-pointer px-3 py-1.5"
              onClick={() => setLevel(l)}
            >
              {l === "all" ? (lang === "ar" ? "كل المستويات" : "All levels") : t(l)}
            </Badge>
          ))}
        </div>

        <Accordion type="single" collapsible className="mt-8 space-y-3">
          {list.map(({ project: p, spec: s }) => {
            const done = store.completedProjects.includes(p.id);
            return (
              <AccordionItem
                key={p.id}
                value={p.id}
                className="rounded-xl border border-border/70 bg-card px-4"
              >
                <AccordionTrigger className="text-start">
                  <span className="flex flex-1 flex-wrap items-center justify-between gap-2 pe-2">
                    <span>
                      <span className="block font-semibold text-foreground">{L(p.title)}</span>
                      <span className="text-xs text-muted-foreground">{L(s.name)}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-[11px]">
                        {t(p.level)}
                      </Badge>
                      {done && <CheckCircle2 className="size-4 text-primary" />}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 text-sm text-muted-foreground">
                  <p>{L(p.objective)}</p>
                  <p className="rounded-lg bg-secondary/50 p-3">{L(p.problem)}</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="font-semibold text-foreground">
                        {lang === "ar" ? "الخطوات" : "Steps"}
                      </p>
                      <ol className="mt-1 list-decimal space-y-1 ps-5">
                        {p.steps.map((x, i) => (
                          <li key={i}>{L(x)}</li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {lang === "ar" ? "المخرجات" : "Deliverables"}
                      </p>
                      <ul className="mt-1 list-disc space-y-1 ps-5">
                        {p.deliverables.map((x, i) => (
                          <li key={i}>{L(x)}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border/70 p-3">
                    <p className="text-xs font-semibold text-foreground">
                      {lang === "ar" ? "قيمة المشروع في ملف أعمالك" : "Portfolio value"}
                    </p>
                    <p className="mt-1 text-xs">{L(p.portfolio)}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {p.tools.map((x) => (
                      <Badge key={x} variant="outline" className="text-[11px]">
                        {x}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    size="sm"
                    variant={done ? "outline" : "default"}
                    onClick={() => store.toggleProject(p.id)}
                  >
                    {done ? t("completed") : t("markComplete")}
                  </Button>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </AppShell>
  );
}
