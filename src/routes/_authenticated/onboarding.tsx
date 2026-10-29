import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { specializations } from "@/data/specializations";
import type { Difficulty } from "@/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/onboarding")({
  head: () => ({
    meta: [
      { title: "ابدأ مسارك | أجريباث" },
      { name: "description", content: "حدد مستواك واهتماماتك وهدفك المهني ليبني المرشد الذكي خطتك." },
      { property: "og:title", content: "ابدأ مسارك | أجريباث" },
      { property: "og:description", content: "خطة تعلّم مخصصة لمهندس الزراعة في خطوات قصيرة." },
    ],
  }),
  component: Onboarding,
});

const levels: Difficulty[] = ["beginner", "intermediate", "advanced"];

function Onboarding() {
  const { t, L, lang } = useI18n();
  const { profile, updateProfile } = useStore();
  const navigate = useNavigate();

  const [level, setLevel] = useState<Difficulty>(profile.level);
  const [goal, setGoal] = useState(profile.careerGoal);
  const [background, setBackground] = useState(profile.background);
  const [hours, setHours] = useState(profile.weeklyHours || 6);
  const [interests, setInterests] = useState<string[]>(profile.interests);
  const [spec, setSpec] = useState<string | null>(profile.primarySpecialization);

  const toggle = (id: string) =>
    setInterests((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-4xl px-4 py-12">
        <h1 className="font-display text-3xl font-bold text-foreground">
          {lang === "ar" ? "نبني خطتك المهنية" : "Let's build your career plan"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("brandSub")}</p>

        <div className="mt-8 space-y-6">
          <Card className="border-border/70">
            <CardContent className="space-y-4 p-6">
              <Label>{lang === "ar" ? "مستواك الحالي" : "Your current level"}</Label>
              <div className="flex flex-wrap gap-2">
                {levels.map((l) => (
                  <Button
                    key={l}
                    type="button"
                    variant={level === l ? "default" : "outline"}
                    onClick={() => setLevel(l)}
                  >
                    {t(l)}
                  </Button>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal">{lang === "ar" ? "هدفك المهني" : "Career goal"}</Label>
                <Input
                  id="goal"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder={
                    lang === "ar"
                      ? "مثال: العمل كمتخصص زراعة دقيقة"
                      : "e.g. work as a precision agriculture specialist"
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bg">
                  {lang === "ar" ? "خلفيتك الدراسية أو العملية" : "Study or work background"}
                </Label>
                <Textarea id="bg" value={background} onChange={(e) => setBackground(e.target.value)} />
              </div>

              <div className="space-y-3">
                <Label>
                  {lang === "ar" ? "ساعات التعلّم أسبوعيًا" : "Weekly learning hours"}: {hours}
                </Label>
                <Slider
                  value={[hours]}
                  min={2}
                  max={25}
                  step={1}
                  onValueChange={(v) => setHours(v[0] ?? 6)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardContent className="p-6">
              <Label>{lang === "ar" ? "ما يثير اهتمامك" : "What interests you"}</Label>
              <div className="mt-3 flex flex-wrap gap-2">
                {specializations.map((s) => (
                  <Badge
                    key={s.id}
                    onClick={() => toggle(s.id)}
                    variant={interests.includes(s.id) ? "default" : "outline"}
                    className="cursor-pointer px-3 py-1.5 text-xs"
                  >
                    {L(s.name)}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardContent className="p-6">
              <Label>{lang === "ar" ? "تخصصك الأساسي" : "Your primary specialization"}</Label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {specializations
                  .filter((s) => s.stages.length > 0)
                  .map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSpec(s.id)}
                      className={cn(
                        "rounded-xl border p-4 text-start transition-colors",
                        spec === s.id
                          ? "border-primary bg-primary/5"
                          : "border-border/70 hover:bg-secondary/60",
                      )}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-foreground">{L(s.name)}</span>
                        {spec === s.id ? <Check className="size-4 text-primary" /> : null}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {L(s.tagline)}
                      </span>
                    </button>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Button
            size="lg"
            disabled={!spec}
            onClick={() => {
              updateProfile({
                level,
                careerGoal: goal,
                background,
                weeklyHours: hours,
                interests,
                primarySpecialization: spec,
                onboarded: true,
              });
              navigate({ to: "/dashboard" });
            }}
          >
            {lang === "ar" ? "ابدأ رحلتي" : "Start my journey"}
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
