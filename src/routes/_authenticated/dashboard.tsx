import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Gauge, Notebook, Library, Target, ArrowUpRight } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { specializations, getSpecialization } from "@/data/specializations";
import { nextTopic, readiness, specProgress } from "@/lib/progress";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "لوحتي | أجريباث" },
      { name: "description", content: "تقدمك، هدف اليوم، الخطوة الموصى بها، وملاحظاتك ومصادرك." },
      { property: "og:title", content: "لوحتي | أجريباث" },
      { property: "og:description", content: "تابع تقدمك المهني الزراعي في مكان واحد." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { t, L, lang } = useI18n();
  const store = useStore();
  const spec =
    getSpecialization(store.profile.primarySpecialization ?? "") ??
    specializations.find((s) => s.stages.length > 0)!;

  const prog = specProgress(spec, store.completedTopics);
  const next = nextTopic(spec, store.completedTopics);
  const score = readiness({
    specId: spec.id,
    completedTopics: store.completedTopics,
    completedProjects: store.completedProjects,
    notes: store.notes.length,
    resources: store.resources.length,
    onboarded: store.profile.onboarded,
  });

  const missions = [
    { id: "m1", label: { ar: "أكمل موضوعًا واحدًا", en: "Finish one topic" } },
    { id: "m2", label: { ar: "استخدم المرشد الذكي", en: "Use the AI mentor" } },
    { id: "m3", label: { ar: "اكتب ملاحظة تعلّم", en: "Write a learning note" } },
  ];

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-7xl px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              {store.profile.name
                ? `${lang === "ar" ? "أهلًا" : "Welcome"}، ${store.profile.name}`
                : t("nav_dashboard")}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("activePath")}: {L(spec.name)}
            </p>
          </div>
          <Link to="/specializations/$specId" params={{ specId: spec.id }}>
            <Button variant="outline" className="gap-2">
              {t("roadmap")} <ArrowUpRight className="size-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <Card className="border-border/70 lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-display text-base">{t("progress")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{L(spec.name)}</span>
                  <span className="font-semibold text-primary">{prog.pct}%</span>
                </div>
                <Progress value={prog.pct} className="mt-2" />
                <p className="mt-2 text-xs text-muted-foreground">
                  {prog.done} / {prog.total} {t("skills")}
                </p>
              </div>

              {next ? (
                <div className="rounded-xl border border-border/70 bg-secondary/40 p-4">
                  <p className="text-xs font-medium text-muted-foreground">{t("recommended")}</p>
                  <p className="mt-1 font-display font-bold text-foreground">{L(next.topic.title)}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{L(next.stage.title)}</p>
                  <Link
                    to="/learn/$specId/$topicId"
                    params={{ specId: spec.id, topicId: next.topic.id }}
                  >
                    <Button size="sm" className="mt-3">
                      {t("continueLearning")}
                    </Button>
                  </Link>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{t("emptyRoadmap")}</p>
              )}

              <div className="grid gap-3 sm:grid-cols-3">
                <Stat icon={Flame} label={t("streak")} value={String(store.streak)} />
                <Stat
                  icon={Target}
                  label={lang === "ar" ? "دقائق هذا الأسبوع" : "Minutes this week"}
                  value={String(store.weeklyMinutes)}
                />
                <Stat
                  icon={Gauge}
                  label={t("readinessScore")}
                  value={`${score.total}%`}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="font-display text-base">{t("todayGoal")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {missions.map((m) => (
                <label key={m.id} className="flex items-center gap-3 text-sm">
                  <Checkbox
                    checked={store.dailyDone.includes(m.id)}
                    onCheckedChange={() => store.toggleMission(m.id)}
                  />
                  <span
                    className={
                      store.dailyDone.includes(m.id)
                        ? "text-muted-foreground line-through"
                        : "text-foreground"
                    }
                  >
                    {L(m.label)}
                  </span>
                </label>
              ))}
              <Link to="/readiness">
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  {t("readinessScore")}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-base">
                <Notebook className="size-4 text-primary" /> {t("recentNotes")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {store.notes.slice(0, 4).map((n) => (
                <div key={n.id} className="rounded-lg border border-border/70 p-3">
                  <p className="text-sm font-medium text-foreground">{n.title}</p>
                  <p className="line-clamp-2 text-xs text-muted-foreground">{n.content}</p>
                </div>
              ))}
              {!store.notes.length && (
                <p className="text-sm text-muted-foreground">{t("emptyNotes")}</p>
              )}
              <Link to="/notes">
                <Button variant="ghost" size="sm">
                  {t("addNote")}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-base">
                <Library className="size-4 text-primary" /> {t("savedResources")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {store.resources.slice(0, 4).map((r) => (
                <div key={r.id} className="rounded-lg border border-border/70 p-3">
                  <p className="text-sm font-medium text-foreground">{r.title}</p>
                  <Badge variant="outline" className="mt-1 text-[11px]">
                    {r.status}
                  </Badge>
                </div>
              ))}
              {!store.resources.length && (
                <p className="text-sm text-muted-foreground">{t("emptyResources")}</p>
              )}
              <Link to="/resources">
                <Button variant="ghost" size="sm">
                  {t("addResource")}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="font-display text-base">{t("jobs")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {spec.roles.slice(0, 3).map((r) => (
                <div key={r.id} className="rounded-lg border border-border/70 p-3">
                  <p className="text-sm font-semibold text-foreground">{L(r.title)}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{L(r.entry)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Flame;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border/70 p-4">
      <Icon className="size-4 text-primary" />
      <p className="mt-2 font-display text-xl font-bold text-foreground">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}
