import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, Bot, CheckCircle2, Copy, Notebook } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { buildPrompt, getTopic } from "@/data/specializations";

export const Route = createFileRoute("/_authenticated/learn/$specId/$topicId")({
  // Admin-added topics load on the client, so a miss here isn't a 404.
  loader: ({ params }) => {
    const found = getTopic(params.specId, params.topicId);
    return found ? { title: found.topic.title, summary: found.topic.summary } : null;
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.title.ar} | أجريباث` : "درس | أجريباث";
    const desc = loaderData?.summary.ar ?? "موضوع تعلّم عملي على أجريباث.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: TopicPage,
});

function TopicPage() {
  const { specId, topicId } = Route.useParams();
  const { t, L, lang } = useI18n();
  const store = useStore();
  const found = getTopic(specId, topicId);

  const base = useMemo(() => {
    if (!found) return "";
    return buildPrompt({
      lang,
      persona: L(found.spec.mentorPersona),
      topic: L(found.topic.title),
      focus: L(found.topic.promptFocus),
      level: t(store.profile.level),
      goal: store.profile.careerGoal,
      task: L(found.topic.task),
    });
  }, [found, lang, L, t, store.profile.level, store.profile.careerGoal]);

  const [prompt, setPrompt] = useState<string | null>(null);
  const [note, setNote] = useState("");
  if (!found) return null;

  const { spec, stage, topic } = found;
  const done = store.completedTopics.includes(topic.id);
  const text = prompt ?? base;

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Link to="/specializations/$specId" params={{ specId: spec.id }} className="text-primary">
            {L(spec.name)}
          </Link>
          <span>/</span>
          <span>{L(stage.title)}</span>
        </div>

        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">{L(topic.title)}</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{L(topic.summary)}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{t(topic.difficulty)}</Badge>
            <Badge variant="outline">
              {topic.minutes} {t("minutes")}
            </Badge>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-5">
            {(topic.videos ?? []).filter(Boolean).map((v, i) => (
              <Card key={i} className="overflow-hidden border-border/70">
                <div className="aspect-video bg-muted">
                  <iframe
                    src={toEmbed(v)}
                    title={`video-${i}`}
                    className="size-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </Card>
            ))}
            <Card className="border-border/70">
              <CardContent className="space-y-4 p-6">
                <Section title={t("whyMatters")} body={L(topic.why)} />
                <div>
                  <h3 className="font-display font-bold text-foreground">{t("shouldBeAble")}</h3>
                  <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                    {topic.outcomes.map((o, i) => (
                      <li key={i} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                        {L(o)}
                      </li>
                    ))}
                  </ul>
                </div>
                {topic.prerequisites.length > 0 && (
                  <div>
                    <h3 className="font-display font-bold text-foreground">
                      {lang === "ar" ? "المتطلبات السابقة" : "Prerequisites"}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {topic.prerequisites.map((p, i) => (
                        <Badge key={i} variant="outline" className="text-[11px]">
                          {L(p)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="rounded-xl bg-secondary/50 p-4">
                  <h3 className="font-display font-bold text-foreground">{t("practicalTask")}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{L(topic.task)}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="space-y-3 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="flex items-center gap-2 font-display font-bold text-foreground">
                    <Bot className="size-4 text-primary" /> {t("aiPrompt")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(text);
                        toast.success(t("copied"));
                      }}
                      className="gap-1.5"
                    >
                      <Copy className="size-3.5" /> {t("copyPrompt")}
                    </Button>
                    <Link to="/mentor" search={{ specId: spec.id, topicId: topic.id }}>
                      <Button size="sm" className="gap-1.5">
                        {t("openMentor")} <ArrowUpRight className="size-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
                <Textarea
                  value={text}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={14}
                  className="bg-card font-sans text-xs leading-relaxed"
                />
                <p className="text-[11px] text-muted-foreground">{t("customizePrompt")}</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-5">
            <Card className="border-border/70">
              <CardContent className="space-y-3 p-6">
                <Button
                  className="w-full"
                  variant={done ? "outline" : "default"}
                  onClick={() => store.toggleTopic(topic.id, topic.minutes)}
                >
                  {done ? t("completed") : t("markComplete")}
                </Button>
                <div className="flex flex-wrap gap-2">
                  {topic.skills.map((s) => (
                    <Badge key={s} variant="secondary" className="text-[11px]">
                      {s}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/70">
              <CardContent className="space-y-3 p-6">
                <h3 className="flex items-center gap-2 font-display font-bold text-foreground">
                  <Notebook className="size-4 text-primary" /> {t("addNote")}
                </h3>
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={5}
                  placeholder={lang === "ar" ? "ماذا تعلّمت؟" : "What did you learn?"}
                />
                <Button
                  size="sm"
                  disabled={!note.trim()}
                  onClick={() => {
                    store.addNote({
                      title: L(topic.title),
                      content: note,
                      category: L(spec.name),
                      tags: topic.skills,
                      favorite: false,
                    });
                    setNote("");
                    toast.success(t("save"));
                  }}
                >
                  {t("save")}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/70">
              <CardContent className="p-6">
                <h3 className="font-display font-bold text-foreground">{t("roadmap")}</h3>
                <div className="mt-3 space-y-2">
                  {stage.topics.map((tp) => (
                    <Link
                      key={tp.id}
                      to="/learn/$specId/$topicId"
                      params={{ specId: spec.id, topicId: tp.id }}
                      className="block rounded-lg border border-border/70 p-2.5 text-xs text-muted-foreground hover:bg-secondary/60"
                    >
                      {L(tp.title)}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="font-display font-bold text-foreground">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function toEmbed(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v") ?? u.pathname.split("/").pop();
      return `https://www.youtube.com/embed/${id}`;
    }
    if (u.hostname.includes("vimeo.com")) return `https://player.vimeo.com/video/${u.pathname.split("/").pop()}`;
    if (u.hostname.includes("drive.google.com")) return url.replace(/\/view.*$/, "/preview");
    return url;
  } catch {
    return url;
  }
}
