import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Layers, Search } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { specializations } from "@/data/specializations";
import { specProgress } from "@/lib/progress";
import type { Difficulty } from "@/types";

export const Route = createFileRoute("/specializations/")({
  head: () => ({
    meta: [
      { title: "التخصصات الزراعية | أجريباث" },
      {
        name: "description",
        content: "12 تخصصًا زراعيًا مع الوظائف والمهارات والأدوات وخرائط الطريق المهنية.",
      },
      { property: "og:title", content: "التخصصات الزراعية | أجريباث" },
      { property: "og:description", content: "اختر تخصصك وابدأ خريطة طريق عملية." },
    ],
  }),
  component: SpecList,
});

const levels: (Difficulty | "all")[] = ["all", "beginner", "intermediate", "advanced"];

function SpecList() {
  const { t, L, lang } = useI18n();
  const { completedTopics } = useStore();
  const [q, setQ] = useState("");
  const [level, setLevel] = useState<Difficulty | "all">("all");

  const list = specializations.filter((s) => {
    const hay = `${s.name.ar} ${s.name.en} ${s.skills.join(" ")} ${s.tools.join(" ")}`.toLowerCase();
    return (level === "all" || s.difficulty === level) && hay.includes(q.toLowerCase());
  });

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-7xl px-4 py-10">
        <h1 className="font-display text-3xl font-bold text-foreground">
          {t("nav_specializations")}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {lang === "ar"
            ? "كل تخصص يحتوي على الوظائف المتاحة، المهارات، الأدوات، خريطة طريق متدرجة، ومشاريع عملية."
            : "Each field includes job roles, skills, tools, a staged roadmap and practical projects."}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="relative w-full max-w-sm">
            <Search className="absolute top-1/2 size-4 -translate-y-1/2 text-muted-foreground start-3" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("search")}
              className="ps-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {levels.map((l) => (
              <Button
                key={l}
                size="sm"
                variant={level === l ? "default" : "outline"}
                onClick={() => setLevel(l)}
              >
                {l === "all" ? (lang === "ar" ? "الكل" : "All") : t(l)}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => {
            const p = specProgress(s, completedTopics);
            return (
              <Link key={s.id} to="/specializations/$specId" params={{ specId: s.id }}>
                <Card className="h-full border-border/70 transition-shadow hover:shadow-lift">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-display text-lg font-bold text-foreground">
                        {L(s.name)}
                      </h2>
                      <Badge variant="secondary" className="shrink-0 text-[11px]">
                        {t(s.difficulty)}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-primary">{L(s.tagline)}</p>
                    <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                      {L(s.description)}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.tools.slice(0, 3).map((tool) => (
                        <Badge key={tool} variant="outline" className="text-[11px]">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" /> {s.hours} {t("hours")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Layers className="size-3.5" /> {s.stages.length} {t("roadmap")}
                      </span>
                      <span>
                        {t("demand")}: {"★".repeat(s.demand)}
                      </span>
                    </div>
                    {p.total > 0 && (
                      <div className="mt-auto pt-4">
                        <Progress value={p.pct} />
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          {t("progress")} {p.pct}%
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
