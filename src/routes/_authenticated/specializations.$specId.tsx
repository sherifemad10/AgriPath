import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Circle, Clock, Lock, PlayCircle } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { getSpecialization } from "@/data/specializations";
import { nextTopic, specProgress, stageState } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/specializations/$specId")({
  // Admin-added specializations load on the client, so a miss here isn't a 404.
  loader: ({ params }) => {
    const spec = getSpecialization(params.specId);
    return spec ? { name: spec.name, tagline: spec.tagline } : null;
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.name.ar} | أجريباث` : "تخصص | أجريباث";
    const desc = loaderData?.tagline.ar ?? "تخصص زراعي على منصة أجريباث.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: SpecDetail,
});

function SpecDetail() {
  const { specId } = Route.useParams();
  const { t, L, lang } = useI18n();
  const store = useStore();
  const spec = getSpecialization(specId);
  if (!spec) return null;

  const prog = specProgress(spec, store.completedTopics);
  const next = nextTopic(spec, store.completedTopics);
  const isActive = store.profile.primarySpecialization === spec.id;

  return (
    <AppShell>
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="mx-auto w-full max-w-7xl px-4 py-12">
          <Badge variant="secondary">{t(spec.difficulty)}</Badge>
          <h1 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
            {L(spec.name)}
          </h1>
          <p className="mt-2 text-sm text-primary">{L(spec.tagline)}</p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {L(spec.description)}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="size-4" /> {spec.hours} {t("hours")}
            </span>
            <span>
              {t("demand")}: {"★".repeat(spec.demand)}
            </span>
            <span>
              {t("jobs")}: {spec.roles.length}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              onClick={() => store.updateProfile({ primarySpecialization: spec.id, onboarded: true })}
              variant={isActive ? "outline" : "default"}
            >
              {isActive ? t("activePath") : t("startPath")}
            </Button>
            {next && (
              <Link to="/learn/$specId/$topicId" params={{ specId: spec.id, topicId: next.topic.id }}>
                <Button variant="secondary" className="gap-2">
                  <PlayCircle className="size-4" /> {t("continueLearning")}
                </Button>
              </Link>
            )}
          </div>

          {prog.total > 0 && (
            <div className="mt-6 max-w-md">
              <Progress value={prog.pct} />
              <p className="mt-1 text-xs text-muted-foreground">
                {t("progress")} {prog.pct}% — {prog.done}/{prog.total}
              </p>
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-4 py-10">
        <Tabs defaultValue="roadmap">
          <TabsList className="flex-wrap">
            <TabsTrigger value="roadmap">{t("roadmap")}</TabsTrigger>
            <TabsTrigger value="jobs">{t("jobs")}</TabsTrigger>
            <TabsTrigger value="skills">{t("skills")}</TabsTrigger>
            <TabsTrigger value="projects">{t("projects")}</TabsTrigger>
            <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
          </TabsList>

          <TabsContent value="roadmap" className="mt-6">
            {spec.stages.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("emptyRoadmap")}</p>
            ) : (
              <div className="space-y-4">
                {spec.stages.map((stage, i) => {
                  const state = stageState(spec, i, store.completedTopics);
                  return (
                    <Card key={stage.id} className="border-border/70">
                      <CardContent className="p-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              {lang === "ar" ? "المرحلة" : "Stage"} {stage.order}
                            </p>
                            <h3 className="font-display text-lg font-bold text-foreground">
                              {L(stage.title)}
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">{L(stage.goal)}</p>
                          </div>
                          <Badge
                            variant={state === "completed" ? "default" : "outline"}
                            className="gap-1.5"
                          >
                            {state === "locked" ? (
                              <Lock className="size-3.5" />
                            ) : state === "completed" ? (
                              <CheckCircle2 className="size-3.5" />
                            ) : (
                              <Circle className="size-3.5" />
                            )}
                            {t(state)}
                          </Badge>
                        </div>

                        <div className="mt-5 grid gap-3">
                          {stage.topics.map((topic) => {
                            const done = store.completedTopics.includes(topic.id);
                            return (
                              <Link
                                key={topic.id}
                                to="/learn/$specId/$topicId"
                                params={{ specId: spec.id, topicId: topic.id }}
                                className={cn(
                                  "flex items-start justify-between gap-3 rounded-xl border p-4 transition-colors hover:bg-secondary/60",
                                  done ? "border-primary/40 bg-primary/5" : "border-border/70",
                                )}
                              >
                                <span>
                                  <span className="block font-medium text-foreground">
                                    {L(topic.title)}
                                  </span>
                                  <span className="mt-1 block text-xs text-muted-foreground">
                                    {L(topic.summary)}
                                  </span>
                                </span>
                                <span className="shrink-0 text-[11px] text-muted-foreground">
                                  {topic.minutes} {t("minutes")}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="jobs" className="mt-6 grid gap-4 lg:grid-cols-2">
            {spec.roles.map((role) => (
              <Card key={role.id} className="border-border/70">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-bold text-foreground">{L(role.title)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{L(role.description)}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                    {role.responsibilities.map((r, i) => (
                      <li key={i} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                        {L(r)}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 grid gap-2 text-xs">
                    <p>
                      <span className="font-semibold text-foreground">
                        {lang === "ar" ? "للمبتدئ" : "Entry"}:{" "}
                      </span>
                      <span className="text-muted-foreground">{L(role.entry)}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">
                        {lang === "ar" ? "للمتقدم" : "Senior"}:{" "}
                      </span>
                      <span className="text-muted-foreground">{L(role.senior)}</span>
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {role.skills.map((s) => (
                      <Badge key={s} variant="outline" className="text-[11px]">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="skills" className="mt-6 grid gap-4 sm:grid-cols-2">
            <Card className="border-border/70">
              <CardContent className="p-6">
                <h3 className="font-display font-bold text-foreground">{t("skills")}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {spec.skills.map((s) => (
                    <Badge key={s} variant="secondary">
                      {s}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/70">
              <CardContent className="p-6">
                <h3 className="font-display font-bold text-foreground">{t("tools")}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {spec.tools.map((s) => (
                    <Badge key={s} variant="outline">
                      {s}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="mt-6 space-y-4">
            {spec.projects.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("emptyProjects")}</p>
            ) : (
              <Accordion type="single" collapsible className="space-y-3">
                {spec.projects.map((p) => (
                  <AccordionItem
                    key={p.id}
                    value={p.id}
                    className="rounded-xl border border-border/70 px-4"
                  >
                    <AccordionTrigger className="text-start">
                      <span>
                        <span className="block font-semibold text-foreground">{L(p.title)}</span>
                        <span className="text-xs text-muted-foreground">{t(p.level)}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                      <p>{L(p.objective)}</p>
                      <p>{L(p.problem)}</p>
                      <div>
                        <p className="font-semibold text-foreground">
                          {lang === "ar" ? "الخطوات" : "Steps"}
                        </p>
                        <ol className="mt-1 list-decimal space-y-1 ps-5">
                          {p.steps.map((s, i) => (
                            <li key={i}>{L(s)}</li>
                          ))}
                        </ol>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {lang === "ar" ? "المخرجات" : "Deliverables"}
                        </p>
                        <ul className="mt-1 list-disc space-y-1 ps-5">
                          {p.deliverables.map((s, i) => (
                            <li key={i}>{L(s)}</li>
                          ))}
                        </ul>
                      </div>
                      <Button
                        size="sm"
                        variant={store.completedProjects.includes(p.id) ? "outline" : "default"}
                        onClick={() => store.toggleProject(p.id)}
                      >
                        {store.completedProjects.includes(p.id) ? t("completed") : t("markComplete")}
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </TabsContent>

          <TabsContent value="overview" className="mt-6">
            <Card className="border-border/70">
              <CardContent className="space-y-4 p-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {L(spec.description)}
                </p>
                <div>
                  <h3 className="font-display font-bold text-foreground">{t("whatYouLearn")}</h3>
                  <ul className="mt-2 grid gap-1.5 text-sm text-muted-foreground sm:grid-cols-2">
                    {spec.topicsPool.map((x, i) => (
                      <li key={i} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                        {L(x)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl bg-secondary/50 p-4">
                  <p className="text-xs font-semibold text-foreground">{t("nav_mentor")}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{L(spec.mentorPersona)}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
