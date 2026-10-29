import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  FlaskConical,
  Gauge,
  GraduationCap,
  Leaf,
  Map,
  Sparkles,
  Wrench,
} from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { specializations } from "@/data/specializations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "أجريباث | AgriPath " },
      {
        name: "description",
        content:
          "اكتشف مسارك المهني في الزراعة مع أجريباث: تخصصات زراعية، خرائط تعلّم عملية، مهارات مطلوبة، مشاريع تطبيقية، وإرشاد مهني بالذكاء الاصطناعي.",
      },
      { name: "keywords", content: "الإرشاد المهني الزراعي، وظائف زراعية، تخصصات زراعية، مهارات المهندس الزراعي، الزراعة الرقمية، أجريباث" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "أجريباث | مسارات مهنية زراعية وإرشاد ذكي" },
      {
        property: "og:description",
        content:
          "منصة تساعد طلاب وخريجي الزراعة على اكتشاف التخصصات، وتعلّم مهارات سوق العمل، وبناء خبرة عملية خطوة بخطوة.",
      },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "أجريباث | مسارات مهنية زراعية" },
      {
        name: "twitter:description",
        content: "تخصصات زراعية، خرائط تعلّم، مشاريع عملية، وإرشاد مهني بالذكاء الاصطناعي.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { t, L, lang } = useI18n();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const specializationCount = specializations.length;
  const stageCount = specializations.reduce((total, spec) => total + spec.stages.length, 0);
  const projectCount = specializations.reduce((total, spec) => total + spec.projects.length, 0);
  const roleCount = specializations.reduce((total, spec) => total + spec.roles.length, 0);

  const steps = [
    {
      icon: Map,
      title: { ar: "اختر تخصصك", en: "Pick your specialization" },
      body: {
        ar: `${specializationCount} تخصصًا زراعيًا مع الوظائف والمهارات والأدوات المرتبطة بكل مسار.`,
        en: `${specializationCount} agricultural fields with the job roles, skills and tools connected to each path.`,
      },
    },
    {
      icon: Bot,
      title: { ar: "تعلّم مع مرشدك الذكي", en: "Learn with your AI mentor" },
      body: {
        ar: "كل موضوع يولّد برومبت تعليمي جاهز يشرح، يمتحنك، ويصحح لك.",
        en: "Every topic generates a ready teaching prompt that explains, quizzes and corrects you.",
      },
    },
    {
      icon: Wrench,
      title: { ar: "نفّذ مشاريع عملية", en: "Build practical projects" },
      body: {
        ar: "مشاريع حقلية بمخرجات تصلح لملف أعمال تعرضه على صاحب العمل.",
        en: "Field projects with deliverables you can show an employer.",
      },
    },
    {
      icon: Gauge,
      title: { ar: "قِس جاهزيتك", en: "Measure your readiness" },
      body: {
        ar: "درجة جاهزية وظيفية تتحرك مع تقدمك الفعلي لا مع عدد الساعات.",
        en: "A readiness score driven by real progress, not hours watched.",
      },
    },
  ];

  return (
    <AppShell>
      <section className="relative overflow-hidden border-b border-border/60">
        <div
          className="absolute inset-0 -z-10 opacity-90"
          style={{
            background:
              "radial-gradient(1000px 500px at 80% -10%, var(--emerald-soft), transparent), radial-gradient(700px 400px at 0% 0%, var(--sand), transparent)",
          }}
        />
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
          <div>
            <Badge variant="secondary" className="mb-5 gap-1.5 px-3 py-1.5">
              <Sparkles className="size-3.5" />
              {t("brandSub")}
            </Badge>
            <h1 className="font-display text-4xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("heroSub")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/specializations">
                <Button size="lg" className="gap-2 shadow-lift">
                  {t("exploreCta")}
                  <Arrow className="size-4" />
                </Button>
              </Link>
              <Link to="/mentor">
                <Button size="lg" variant="outline" className="gap-2">
                  <Bot className="size-4" />
                  {t("mentorCta")}
                </Button>
              </Link>
            </div>
            <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4">
              {[
                { n: specializationCount, l: { ar: "تخصصًا زراعيًا", en: "Career tracks" } },
                { n: stageCount, l: { ar: "مرحلة تعلّم", en: "Learning stages" } },
                { n: projectCount, l: { ar: "مشروعًا عمليًا", en: "Practical projects" } },
              ].map((s) => (
                <div key={s.n} className="rounded-2xl bg-card/70 p-4 shadow-soft">
                  <dt className="font-display text-2xl font-bold text-primary">{s.n}</dt>
                  <dd className="text-xs text-muted-foreground">{L(s.l)}</dd>
                </div>
              ))}
            </dl>
          </div>

          <Card className="self-center border-border/70 shadow-lift">
            <CardContent className="space-y-4 p-6">
              <p className="font-display text-sm font-semibold text-muted-foreground">
                {lang === "ar" ? "مسارات مطلوبة الآن" : "In demand right now"}
              </p>
              {specializations.slice(0, 4).map((s) => (
                <Link
                  key={s.id}
                  to="/specializations/$specId"
                  params={{ specId: s.id }}
                  className="block rounded-xl border border-border/70 p-4 transition-colors hover:border-primary/50 hover:bg-secondary/50"
                >
                  <p className="font-semibold text-foreground">{L(s.name)}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{L(s.tagline)}</p>
                  <p className="mt-2 text-[11px] text-primary">
                    {t("demand")}: {"★".repeat(s.demand)}
                  </p>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16">
        <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          {lang === "ar" ? "كيف تعمل المنصة" : "How the platform works"}
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Card key={i} className="border-border/70 shadow-soft">
              <CardContent className="p-6">
                <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-display font-bold text-foreground">{L(s.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{L(s.body)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-secondary/40">
        <div className="mx-auto w-full max-w-7xl px-4 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              {t("nav_specializations")}
              <span className="ms-2 text-base font-semibold text-primary">
                ({specializationCount})
              </span>
            </h2>
            <Link to="/specializations" className="text-sm font-medium text-primary">
              {t("exploreCta")}
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {specializations.map((s) => (
              <Link key={s.id} to="/specializations/$specId" params={{ specId: s.id }}>
                <Card className="h-full border-border/70 transition-shadow hover:shadow-lift">
                  <CardContent className="p-6">
                    <h3 className="font-display font-bold text-foreground">{L(s.name)}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                      {L(s.description)}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.skills.slice(0, 3).map((sk) => (
                        <Badge key={sk} variant="outline" className="text-[11px]">
                          {sk}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Live Google Scholar Research Hub Highlight */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-card via-secondary/30 to-primary/10 p-8 sm:p-12 shadow-soft">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default" className="gap-1.5 px-3 py-1 font-semibold bg-primary text-primary-foreground">
                  <GraduationCap className="size-4" />
                  Google Scholar & Scholarly Indexes
                </Badge>
                <Badge variant="outline" className="border-primary/30">
                  {lang === "ar" ? "آخر 3 سنوات (2024 - 2026)" : "Last 3 Years"}
                </Badge>
              </div>

              <h2 className="mt-4 font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                {lang === "ar"
                  ? "أحدث الأبحاث الزراعية العالمية الحية المرتبطة بـ Google Scholar"
                  : "Live Global Agricultural Research on Google Scholar"}
              </h2>

              <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                {lang === "ar"
                  ? "تصفح فورياً آلاف الأوراق العلمية المحكمة من آخر 3 سنوات، مرتبة من الأحدث للأقدم، مع إمكانية التصفية بحسب المحصول، والري، واستصلاح الأراضي، والتقنية الحيوية، مع ملخصات ذكية وتوليد فوري للاستشهادات."
                  : "Explore thousands of peer-reviewed papers from the last 3 years ranked newest first. Filter by crop, modern irrigation, precision ag, and generate instant academic citations."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/research">
                <Button size="lg" className="gap-2 shadow-lift">
                  <FlaskConical className="size-4" />
                  {lang === "ar" ? "تصفح الأبحاث الآن" : "Explore Research Now"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section replacing the bottom account creation banner */}
      <section id="about" aria-labelledby="about-title" className="mx-auto w-full max-w-7xl px-4 py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-b from-card via-secondary/20 to-background p-8 sm:p-12 shadow-soft">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="gap-1.5 px-3.5 py-1.5 text-xs font-semibold">
              <Leaf className="size-3.5 text-primary" />
              {lang === "ar" ? "عن منصة أجريباث (About AgriPath)" : "About AgriPath Platform"}
            </Badge>

            <h2 id="about-title" className="mt-4 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {lang === "ar"
                ? "أجريباث: منصة الإرشاد المهني الزراعي"
                : "AgriPath: Agricultural Career Guidance"}
            </h2>

            <div className="mt-6 space-y-5 text-start text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                {lang === "ar"
                  ? "تساعد أجريباث طلاب وخريجي كليات الزراعة والمهندسين الزراعيين على تحويل المعرفة الأكاديمية إلى مهارات عملية وخطوات واضحة نحو الوظيفة المناسبة. تجمع المنصة التخصصات الزراعية والمهارات المطلوبة وخرائط التعلّم في مكان واحد."
                  : "AgriPath helps agriculture students, graduates and agricultural engineers turn academic knowledge into practical skills and clear steps toward a suitable career. Explore agricultural specializations, in-demand skills and learning roadmaps in one place."}
              </p>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  {lang === "ar" ? "رؤيتنا" : "Our vision"}
                </h3>
                <p className="mt-1">
                  {lang === "ar"
                    ? "أن نكون نقطة انطلاق مهنية تساعد الكفاءات الزراعية على مواكبة تطور القطاع والمساهمة في مستقبل زراعي أكثر استدامة وابتكارًا."
                    : "To help agricultural professionals keep pace with a changing sector and contribute to a more sustainable, innovative future for agriculture."}
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  {lang === "ar" ? "رسالتنا" : "Our mission"}
                </h3>
                <p className="mt-1">
                  {lang === "ar"
                    ? "نربط التعلّم بمتطلبات العمل عبر مسارات منظمة، ومشاريع تطبيقية، وإرشاد يساعد المتعلّم على تحديد مهاراته التالية ومتابعة تقدمه."
                    : "We connect learning with workplace needs through structured roadmaps, practical projects and guidance that helps learners choose their next skills and track progress."}
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  {lang === "ar" ? "لماذا أجريباث؟" : "Why AgriPath?"}
                </h3>
                <p className="mt-1">
                  {lang === "ar"
                    ? "بدلًا من التشتت بين المصادر، استكشف مجالات مثل الزراعة الرقمية، وإدارة المحاصيل، والري، واستصلاح الأراضي؛ ثم تعلّم المهارات والأدوات المرتبطة بكل مسار واستفد من الأبحاث الزراعية الحديثة."
                    : "Instead of navigating disconnected resources, explore fields such as digital agriculture, crop management, irrigation and land reclamation, then build relevant skills and learn from current agricultural research."}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border/70 bg-card/60 transition-all hover:border-primary/40 hover:shadow-md">
              <CardContent className="p-6">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary mb-4">
                  <Map className="size-5" />
                </div>
                <h3 className="font-display font-bold text-foreground text-base">
                  {lang === "ar" ? "مسارات مبنية على السوق" : "Market-Driven Roadmaps"}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {lang === "ar"
                    ? `تضم المنصة ${specializationCount} تخصصًا زراعيًا، مع توضيح المهارات والأدوات المرتبطة بكل مجال.`
                    : `Explore ${specializationCount} agricultural specializations with skills and tools connected to each field.`}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-card/60 transition-all hover:border-primary/40 hover:shadow-md">
              <CardContent className="p-6">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary mb-4">
                  <Bot className="size-5" />
                </div>
                <h3 className="font-display font-bold text-foreground text-base">
                  {lang === "ar" ? "مرشد ذكي متخصص" : "AI Agronomy Mentorship"}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {lang === "ar"
                    ? "مدرب ذكاء اصطناعي تفاعلي مدرّب على علوم الأراضي، التسميد، الوقاية والمحميات؛ يدربك ويجري معك مقابلات فنية حقيقية."
                    : "Interactive AI mentor trained on crop science, fertigation, and protected agriculture to train and test you."}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-card/60 transition-all hover:border-primary/40 hover:shadow-md">
              <CardContent className="p-6">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary mb-4">
                  <Wrench className="size-5" />
                </div>
                <h3 className="font-display font-bold text-foreground text-base">
                  {lang === "ar" ? "مشاريع بورتفوليو معتمدة" : "Portfolio-Grade Deliverables"}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {lang === "ar"
                    ? "بناء ملف أعمال حقيقي (دراسات جدوى، برامج تسميد، خرائط GIS، وتصميم صوب) يثبت كفاءتك أمام مسؤولي التوظيف."
                    : "Build tangible portfolio deliverables—hydraulic plans, fertigation schedules and GIS maps—that prove your value."}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-card/60 transition-all hover:border-primary/40 hover:shadow-md">
              <CardContent className="p-6">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary mb-4">
                  <GraduationCap className="size-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground text-base">
                  {lang === "ar" ? "أبحاث علمية حية ومترجمة" : "Live Scholarly Research"}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {lang === "ar"
                    ? "ربط مباشر بـ Google Scholar وفهارس الأبحاث العالمية مع ملخصات ذكية باللغة العربية وأهم النتائج للتطبيق الميداني."
                    : "Direct integration with Google Scholar offering Arabic executive summaries and key findings for immediate field use."}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-10 grid grid-cols-2 gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center sm:grid-cols-4">
            <div>
              <p className="font-display text-2xl font-extrabold text-primary sm:text-3xl">
                {specializationCount}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {lang === "ar" ? "تخصصًا زراعيًا" : "Career fields"}
              </p>
            </div>
            <div>
              <p className="font-display text-2xl font-extrabold text-primary sm:text-3xl">
                {stageCount}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {lang === "ar" ? "مرحلة تعلّم" : "Learning stages"}
              </p>
            </div>
            <div>
              <p className="font-display text-2xl font-extrabold text-primary sm:text-3xl">
                {roleCount}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {lang === "ar" ? "دورًا وظيفيًا" : "Career roles"}
              </p>
            </div>
            <div>
              <p className="font-display text-2xl font-extrabold text-primary sm:text-3xl">
                {projectCount}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {lang === "ar" ? "مشروعًا عمليًا" : "Practical projects"}
              </p>
            </div>
          </div>

          {/* Action Links */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/specializations">
              <Button size="lg" className="gap-2">
                <Map className="size-4" />
                {lang === "ar" ? "استكشف التخصصات الزراعية" : "Explore Specializations"}
              </Button>
            </Link>
            <Link to="/research">
              <Button size="lg" variant="outline" className="gap-2">
                <FlaskConical className="size-4 text-primary" />
                {lang === "ar" ? "تصفح الأبحاث العلمية" : "Browse Research Hub"}
              </Button>
            </Link>
            <Link to="/mentor">
              <Button size="lg" variant="secondary" className="gap-2">
                <Bot className="size-4" />
                {lang === "ar" ? "استشر المرشد الذكي" : "Ask AI Mentor"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
