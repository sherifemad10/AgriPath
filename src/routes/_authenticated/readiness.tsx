import { createFileRoute, Link } from "@tanstack/react-router";
import { Target } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { readiness } from "@/lib/progress";
import { getSpecialization } from "@/data/specializations";

export const Route = createFileRoute("/_authenticated/readiness")({
  head: () => ({
    meta: [
      { title: "الجاهزية المهنية | أجريباث" },
      { name: "description", content: "قِس مدى جاهزيتك لسوق العمل الزراعي واعرف ما ينقصك." },
      { property: "og:title", content: "الجاهزية المهنية | أجريباث" },
      { property: "og:description", content: "درجة جاهزيتك الوظيفية وخطوات تحسينها." },
    ],
  }),
  component: Readiness,
});

function Readiness() {
  const { t, L, lang } = useI18n();
  const s = useStore();
  const r = readiness({
    specId: s.profile.primarySpecialization,
    completedTopics: s.completedTopics,
    completedProjects: s.completedProjects,
    notes: s.notes.length,
    resources: s.resources.length,
    onboarded: s.profile.onboarded,
  });
  const spec = s.profile.primarySpecialization
    ? getSpecialization(s.profile.primarySpecialization)
    : undefined;
  const level =
    r.total >= 80
      ? t("jobReady")
      : r.total >= 50
        ? lang === "ar" ? "قريب من الجاهزية" : "Almost ready"
        : lang === "ar" ? "في بداية الطريق" : "Getting started";

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-4xl px-4 py-10">
        <h1 className="flex items-center gap-2 font-display text-3xl font-bold text-foreground">
          <Target className="size-6 text-primary" /> {t("nav_readiness")}
        </h1>

        <Card className="mt-8 border-primary/30 bg-primary/5">
          <CardContent className="p-8 text-center">
            <p className="text-sm text-muted-foreground">{t("readinessScore")}</p>
            <p className="mt-2 font-display text-6xl font-bold text-primary">{r.total}%</p>
            <p className="mt-2 font-semibold text-foreground">{level}</p>
            {spec && <p className="mt-1 text-xs text-muted-foreground">{L(spec.name)}</p>}
          </CardContent>
        </Card>

        <div className="mt-6 space-y-3">
          {r.parts.map((p) => (
            <Card key={p.key} className="border-border/70">
              <CardContent className="p-5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">{L(p.label)}</span>
                  <span className="text-muted-foreground">
                    {p.value}/{p.max}
                  </span>
                </div>
                <Progress value={(p.value / p.max) * 100} className="mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {spec ? (
            <Link to="/specializations/$specId" params={{ specId: spec.id }}>
              <Button>{t("continueLearning")}</Button>
            </Link>
          ) : (
            <Link to="/specializations">
              <Button>{t("exploreCta")}</Button>
            </Link>
          )}
          <Link to="/projects">
            <Button variant="outline">{t("projects")}</Button>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
