import { createFileRoute, Link } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { getSpecialization } from "@/data/specializations";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "الملف الشخصي | أجريباث" },
      { name: "description", content: "بياناتك المهنية وهدفك الوظيفي وإعدادات اللغة." },
      { property: "og:title", content: "الملف الشخصي | أجريباث" },
      { property: "og:description", content: "أدر ملفك المهني على أجريباث." },
    ],
  }),
  component: Profile,
});

function Profile() {
  const { t, L, lang, toggleLang } = useI18n();
  const s = useStore();
  const [name, setName] = useState(s.profile.name);
  const [goal, setGoal] = useState(s.profile.careerGoal);
  const [hours, setHours] = useState(s.profile.weeklyHours);
  useEffect(() => {
    setName(s.profile.name);
    setGoal(s.profile.careerGoal);
    setHours(s.profile.weeklyHours);
  }, [s.ready]); // eslint-disable-line react-hooks/exhaustive-deps

  const spec = s.profile.primarySpecialization
    ? getSpecialization(s.profile.primarySpecialization)
    : undefined;

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <h1 className="flex items-center gap-2 font-display text-3xl font-bold text-foreground">
          <UserRound className="size-6 text-primary" /> {t("nav_profile")}
        </h1>

        <Card className="mt-8 border-border/70">
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <Label htmlFor="pn">{lang === "ar" ? "الاسم" : "Name"}</Label>
              <Input id="pn" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>{lang === "ar" ? "البريد" : "Email"}</Label>
              <Input value={s.profile.email} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pg">{lang === "ar" ? "الهدف الوظيفي" : "Career goal"}</Label>
              <Input id="pg" value={goal} onChange={(e) => setGoal(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ph">{lang === "ar" ? "ساعات التعلم أسبوعيًا" : "Weekly hours"}</Label>
              <Input
                id="ph"
                type="number"
                min={1}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value) || 1)}
              />
            </div>
            <Button
              onClick={() => {
                s.updateProfile({ name, careerGoal: goal, weeklyHours: hours });
                toast.success(t("save"));
              }}
            >
              {t("save")}
            </Button>
          </CardContent>
        </Card>

        <Card className="mt-5 border-border/70">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 p-6">
            <div>
              <p className="text-xs text-muted-foreground">{t("activePath")}</p>
              <p className="font-semibold text-foreground">
                {spec ? L(spec.name) : lang === "ar" ? "لم تختر بعد" : "Not chosen yet"}
              </p>
            </div>
            <Link to="/onboarding">
              <Button variant="outline">{lang === "ar" ? "تعديل المسار" : "Change path"}</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="mt-5 border-border/70">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 p-6">
            <p className="font-semibold text-foreground">{t("nav_settings")}</p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={toggleLang}>
                {t("language")}
              </Button>
              <Button variant="destructive" onClick={s.signOut}>
                {t("signOut")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
