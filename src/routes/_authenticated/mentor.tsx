import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Bot, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { buildPrompt, getSpecialization, specializations } from "@/data/specializations";

export const Route = createFileRoute("/_authenticated/mentor")({
  validateSearch: (search: Record<string, unknown>): { specId?: string | undefined; topicId?: string | undefined } => ({
    specId: typeof search["specId"] === "string" ? search["specId"] : undefined,
    topicId: typeof search["topicId"] === "string" ? search["topicId"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "المرشد الذكي | أجريباث" },
      {
        name: "description",
        content: "ولّد برومبت تعليمي مخصص لأي موضوع زراعي واستخدمه مع أي مساعد ذكي.",
      },
      { property: "og:title", content: "المرشد الذكي | أجريباث" },
      { property: "og:description", content: "مرشد ذكي يشرح، يمتحنك، ويصحح لك." },
    ],
  }),
  component: Mentor,
});

const AI_LINKS = [
  { label: "ChatGPT", url: "https://chat.openai.com/" },
  { label: "Gemini", url: "https://gemini.google.com/" },
  { label: "Claude", url: "https://claude.ai/" },
];

function Mentor() {
  const search = Route.useSearch();
  const { t, L, lang } = useI18n();
  const store = useStore();

  const withStages = specializations.filter((s) => s.stages.length > 0);
  const [specId, setSpecId] = useState(
    search.specId ?? store.profile.primarySpecialization ?? withStages[0]!.id,
  );
  const spec = getSpecialization(specId) ?? withStages[0]!;
  const topics = spec.stages.flatMap((s) => s.topics);
  const [topicId, setTopicId] = useState(search.topicId ?? topics[0]?.id ?? "");
  const topic = topics.find((x) => x.id === topicId) ?? topics[0];

  const generated = useMemo(() => {
    if (!topic) return "";
    return buildPrompt({
      lang,
      persona: L(spec.mentorPersona),
      topic: L(topic.title),
      focus: L(topic.promptFocus),
      level: t(store.profile.level),
      goal: store.profile.careerGoal,
      task: L(topic.task),
    });
  }, [topic, spec, lang, L, t, store.profile.level, store.profile.careerGoal]);

  const [edited, setEdited] = useState<string | null>(null);
  const text = edited ?? generated;

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        <div className="flex items-center gap-2">
          <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
            <Bot className="size-5" />
          </span>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">{t("nav_mentor")}</h1>
            <p className="text-sm text-muted-foreground">{L(spec.mentorPersona)}</p>
          </div>
        </div>

        <Card className="mt-8 border-border/70">
          <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t("nav_specializations")}</Label>
              <Select
                value={specId}
                onValueChange={(v) => {
                  setSpecId(v);
                  const s = getSpecialization(v);
                  setTopicId(s?.stages[0]?.topics[0]?.id ?? "");
                  setEdited(null);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {withStages.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {L(s.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t("roadmap")}</Label>
              <Select
                value={topicId}
                onValueChange={(v) => {
                  setTopicId(v);
                  setEdited(null);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((x) => (
                    <SelectItem key={x.id} value={x.id}>
                      {L(x.title)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-5 border-primary/30 bg-primary/5">
          <CardContent className="space-y-3 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display font-bold text-foreground">{t("aiPrompt")}</h2>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5"
                  onClick={() => {
                    navigator.clipboard.writeText(text);
                    toast.success(t("copied"));
                  }}
                >
                  <Copy className="size-3.5" /> {t("copyPrompt")}
                </Button>
                {AI_LINKS.map((l) => (
                  <a key={l.label} href={l.url} target="_blank" rel="noreferrer">
                    <Button size="sm" variant="secondary" className="gap-1.5">
                      {l.label} <ExternalLink className="size-3.5" />
                    </Button>
                  </a>
                ))}
              </div>
            </div>
            <Textarea
              value={text}
              onChange={(e) => setEdited(e.target.value)}
              rows={18}
              className="bg-card text-xs leading-relaxed"
            />
            <p className="text-[11px] text-muted-foreground">
              {lang === "ar"
                ? "انسخ البرومبت والصقه في أي مساعد ذكي — سيعمل كمعلّم ويمتحنك ويصحح لك."
                : "Copy the prompt into any AI assistant — it will teach, quiz and grade you."}
            </p>
          </CardContent>
        </Card>

        {topic && (
          <Card className="mt-5 border-border/70">
            <CardContent className="space-y-3 p-6">
              <h2 className="font-display font-bold text-foreground">{t("practicalTask")}</h2>
              <p className="text-sm text-muted-foreground">{L(topic.task)}</p>
              <div className="flex flex-wrap gap-2">
                {topic.skills.map((s) => (
                  <Badge key={s} variant="outline" className="text-[11px]">
                    {s}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
