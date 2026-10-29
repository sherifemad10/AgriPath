import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { BarChart3, Eye, EyeOff, LogOut, Plus, ShieldCheck, Trash2, Users } from "lucide-react";
import { toast } from "sonner";

import { getCurrentUser, signInAccount, signOutAccount, signUpAccount, type PublicUser } from "@/lib/auth.functions";
import { listPageViews } from "@/lib/catalog.functions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BUILTIN_IDS, useCatalog } from "@/lib/catalog";
import { OverviewPanel, RoadmapEditor, UsersPanel } from "@/components/admin/AdminExtras";
import { LayoutDashboard, Map as MapIcon, Pencil } from "lucide-react";
import { specializations } from "@/data/specializations";
import { buildStages, JOB_STAGE, STAGES, type Pair } from "@/data/roadmaps-extra";
import type { Difficulty, Specialization } from "@/types";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "لوحة التحكم | أجريباث" },
      { name: "description", content: "لوحة تحكم المسؤول لإدارة التخصصات ومتابعة زيارات الموقع." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "لوحة التحكم | أجريباث" },
      { property: "og:description", content: "إدارة أجريباث." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    void getCurrentUser().then((u) => {
      setUser(u);
      setChecked(true);
    });
  }, []);

  const ready = checked && user && user.role === "admin" && user.email.toLowerCase() === "dr.sherifemadd@gmail.com";
  if (ready) return <AdminShell email={user.email} />;

  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-foreground">
            <ShieldCheck className="size-5 text-primary" /> لوحة تحكم أجريباث
          </Link>
          {user && (
            <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => void signOutAccount().then(() => (window.location.href = "/"))}>
              <LogOut className="size-4" /> خروج
            </Button>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">
        {!checked ? null : !user ? (
          <AdminLogin />
        ) : (
          <Card className="mx-auto max-w-md">
            <CardContent className="p-6 text-center text-sm text-muted-foreground">
              هذا الحساب ({user.email}) ليس له صلاحية الدخول للوحة التحكم. لوحة الإدارة مخصصة حصرياً لـ <span className="font-bold text-foreground" dir="ltr">dr.sherifemadd@gmail.com</span>.
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

const SECTIONS = [
  { id: "overview", label: "نظرة عامة", icon: LayoutDashboard },
  { id: "traffic", label: "الزوار وحركة الموقع", icon: BarChart3 },
  { id: "users", label: "المستخدمون المسجلون", icon: Users },
  { id: "specs", label: "التخصصات وخرائط التعلم", icon: MapIcon },
] as const;

function AdminShell({ email }: { email: string }) {
  const [tab, setTab] = useState<(typeof SECTIONS)[number]["id"]>("overview");
  const current = SECTIONS.find((s) => s.id === tab)!;
  return (
    <div dir="rtl" className="flex min-h-screen bg-secondary/30">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-e border-border bg-card p-4 md:flex">
        <Link to="/" className="mb-8 flex items-center gap-2 px-2 font-display text-lg font-bold text-foreground">
          <ShieldCheck className="size-6 text-primary" /> أجريباث
        </Link>
        <nav className="flex-1 space-y-1">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setTab(s.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                tab === s.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <s.icon className="size-4" /> {s.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-border pt-4">
          <p className="truncate px-2 text-xs text-muted-foreground" dir="ltr">{email}</p>
          <Button variant="ghost" size="sm" className="mt-2 w-full justify-start gap-2" onClick={() => void signOutAccount().then(() => (window.location.href = "/"))}>
            <LogOut className="size-4" /> خروج
          </Button>
        </div>
      </aside>
      <div className="flex-1">
        <header className="sticky top-0 z-10 border-b border-border bg-card/90 px-6 py-4 backdrop-blur">
          <h1 className="font-display text-xl font-bold text-foreground">{current.label}</h1>
          <div className="mt-3 flex gap-2 overflow-x-auto md:hidden">
            {SECTIONS.map((s) => (
              <Button key={s.id} size="sm" variant={tab === s.id ? "default" : "outline"} onClick={() => setTab(s.id)}>
                {s.label}
              </Button>
            ))}
          </div>
        </header>
        <main className="p-6">
          {tab === "overview" && <OverviewPanel onGo={(t) => setTab(t as never)} />}
          {tab === "traffic" && <Analytics />}
          {tab === "users" && <UsersPanel />}
          {tab === "specs" && <SpecsManager />}
        </main>
      </div>
    </div>
  );
}

function AdminLogin() {
  const [email, setEmail] = useState("dr.sherifemadd@gmail.com");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"in" | "up">("in");
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true);
    if (email.trim().toLowerCase() !== "dr.sherifemadd@gmail.com") {
      toast.error("غير مصرح: لوحة الإدارة مخصصة حصرياً لـ dr.sherifemadd@gmail.com");
      setBusy(false);
      return;
    }
    try {
      if (mode === "in") await signInAccount({ data: { email, password } });
      else await signUpAccount({ data: { name: "Dr. Sherif Emad", email, password } });
      window.location.reload();
    } catch (e) {
      toast.error(String((e as Error).message));
    }
    setBusy(false);
  }

  return (
    <Card className="mx-auto max-w-md border-border/80 shadow-soft">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-5 text-primary" />
          <h1 className="font-display text-xl font-bold text-foreground">
            {mode === "in" ? "دخول المسؤول المعتمد" : "إنشاء حساب المسؤول"}
          </h1>
        </div>

        <div className="rounded-lg border border-primary/20 bg-primary/5 p-2.5 text-center text-xs text-primary font-medium">
          لوحة الإدارة مخصصة حصرياً للمسؤول: <span dir="ltr" className="font-bold">dr.sherifemadd@gmail.com</span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ae">البريد الإلكتروني المعتمد</Label>
          <Input id="ae" type="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ap">كلمة المرور</Label>
          <Input
            id="ap"
            type="password"
            dir="ltr"
            placeholder="8 أحرف على الأقل"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button className="w-full" disabled={busy || !email || password.length < 8} onClick={submit}>
          {mode === "in" ? "دخول لوحة التحكم" : "إنشاء الحساب والتعيين كمسؤول"}
        </Button>
        <button
          className="w-full text-xs text-muted-foreground underline"
          onClick={() => setMode(mode === "in" ? "up" : "in")}
        >
          {mode === "in" ? "أول مرة؟ أنشئ كلمة المرور لحساب المسؤول" : "لديك كلمة مرور سابقة؟ سجّل الدخول"}
        </button>
      </CardContent>
    </Card>
  );
}

interface View {
  path: string;
  session_id: string;
  created_at: string;
  referrer: string | null;
}

function Analytics() {
  const [views, setViews] = useState<View[]>([]);
  const [days, setDays] = useState(7);

  useEffect(() => {
    void listPageViews({ data: { days } }).then((data) => setViews(data as View[]));
  }, [days]);

  const stats = useMemo(() => {
    const visitors = new Set(views.map((v) => v.session_id)).size;
    const byPath = new Map<string, number>();
    const byDay = new Map<string, number>();
    for (const v of views) {
      byPath.set(v.path, (byPath.get(v.path) ?? 0) + 1);
      const d = v.created_at.slice(0, 10);
      byDay.set(d, (byDay.get(d) ?? 0) + 1);
    }
    const dayList = Array.from({ length: days }, (_, i) => {
      const d = new Date(Date.now() - (days - 1 - i) * 864e5).toISOString().slice(0, 10);
      return { d, n: byDay.get(d) ?? 0 };
    });
    const top = [...byPath.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
    const today = byDay.get(new Date().toISOString().slice(0, 10)) ?? 0;
    return { visitors, dayList, top, today, max: Math.max(1, ...dayList.map((x) => x.n)) };
  }, [views, days]);

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {[1, 7, 30].map((d) => (
          <Button key={d} size="sm" variant={days === d ? "default" : "outline"} onClick={() => setDays(d)}>
            {d === 1 ? "اليوم" : `آخر ${d} يوم`}
          </Button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat icon={<BarChart3 className="size-5" />} label="مشاهدات الصفحات" value={views.length} />
        <Stat icon={<Users className="size-5" />} label="زوار مختلفين" value={stats.visitors} />
        <Stat icon={<Eye className="size-5" />} label="مشاهدات اليوم" value={stats.today} />
      </div>
      {days > 1 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-display font-bold text-foreground">المشاهدات اليومية</h3>
            <div className="mt-4 flex h-40 items-end gap-1" dir="ltr">
              {stats.dayList.map((x) => (
                <div key={x.d} className="flex flex-1 flex-col items-center gap-1" title={`${x.d}: ${x.n}`}>
                  <div
                    className="w-full rounded-t bg-primary/80"
                    style={{ height: `${(x.n / stats.max) * 100}%`, minHeight: x.n ? 4 : 1 }}
                  />
                  {days <= 7 && <span className="text-[10px] text-muted-foreground">{x.d.slice(5)}</span>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-display font-bold text-foreground">أكثر الصفحات زيارة</h3>
          {stats.top.length === 0 && <p className="mt-3 text-sm text-muted-foreground">لا توجد زيارات بعد.</p>}
          <ul className="mt-3 space-y-2 text-sm">
            {stats.top.map(([p, n]) => (
              <li key={p} className="flex justify-between border-b border-border/50 pb-2">
                <span dir="ltr" className="text-foreground">{p}</span>
                <span className="text-muted-foreground">{n}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-5">
        <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">{icon}</span>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="font-display text-2xl font-bold text-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function SpecsManager() {
  const { rows, refresh, saveRow, removeRow } = useCatalog();
  const hiddenIds = rows.filter((r) => r.hidden).map((r) => r.id);
  const hiddenBuiltins = [...BUILTIN_IDS].filter((id) => hiddenIds.includes(id));
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Specialization | null>(null);

  async function hideBuiltin(id: string, hide: boolean) {
    try {
      if (hide) await saveRow({ id, hidden: true, data: null });
      else await removeRow(id);
    } catch (e) {
      toast.error(String((e as Error).message));
    }
  }

  async function remove(id: string) {
    if (!confirm("حذف هذا التخصص نهائيًا؟")) return;
    if (BUILTIN_IDS.has(id)) { await hideBuiltin(id, true); return; }
    try {
      await removeRow(id);
      toast.success("تم الحذف");
    } catch (e) {
      toast.error(String((e as Error).message));
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-foreground">التخصصات ({specializations.length})</h2>
        <Button className="gap-1.5" onClick={() => setShowForm(!showForm)}>
          <Plus className="size-4" /> إضافة تخصص
        </Button>
      </div>

      {showForm && (
        <SpecForm
          onSaved={async () => {
            setShowForm(false);
            await refresh();
          }}
        />
      )}

      <div className="grid gap-3 md:grid-cols-2">
        {specializations.map((s) => (
          <Card key={s.id}>
            <CardContent className="flex items-start justify-between gap-3 p-5">
              <div>
                <p className="font-semibold text-foreground">{s.name.ar}</p>
                <p className="text-xs text-muted-foreground">{s.name.en}</p>
                <div className="mt-2 flex gap-2">
                  <Badge variant="outline" className="text-[11px]">
                    {s.stages.length} مراحل
                  </Badge>
                  <Badge variant="secondary" className="text-[11px]">
                    {BUILTIN_IDS.has(s.id) ? "أساسي" : "مضاف"}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-1">
                <Link to="/specializations/$specId" params={{ specId: s.id }}>
                  <Button size="icon" variant="ghost">
                    <Eye className="size-4" />
                  </Button>
                </Link>
                <Button size="icon" variant="ghost" title="تعديل الخريطة" onClick={() => setEditing(s)}>
                  <Pencil className="size-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => remove(s.id)}>
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {editing && (
        <RoadmapEditor
          spec={editing}
          open
          onClose={() => setEditing(null)}
          onSaved={async () => { setEditing(null); await refresh(); }}
        />
      )}

      {hiddenBuiltins.length > 0 && (
        <Card>
          <CardContent className="p-5">
            <p className="font-semibold text-foreground">تخصصات محذوفة (يمكن استرجاعها)</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {hiddenBuiltins.map((id) => (
                <Button key={id} size="sm" variant="outline" className="gap-1.5" onClick={() => hideBuiltin(id, false)}>
                  <EyeOff className="size-3.5" /> {id} — استرجاع
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

const DEFAULT_STAGE_TEXT = STAGES.map((_, i) =>
  i === STAGES.length - 1 ? JOB_STAGE.map((p) => p.join(" | ")).join("\n") : "",
);

function SpecForm({ onSaved }: { onSaved: () => void }) {
  const [f, setF] = useState({
    nameAr: "",
    nameEn: "",
    taglineAr: "",
    taglineEn: "",
    descAr: "",
    descEn: "",
    difficulty: "beginner" as Difficulty,
    hours: 120,
    demand: 4,
    skills: "",
    tools: "",
    rolesAr: "",
  });
  const [stageText, setStageText] = useState<string[]>(DEFAULT_STAGE_TEXT);
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof f, v: string | number) => setF((p) => ({ ...p, [k]: v }));
  const list = (s: string) => s.split(/[,،\n]/).map((x) => x.trim()).filter(Boolean);

  async function save() {
    const slug =
      f.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") ||
      `spec-${Date.now()}`;
    if (specializations.some((s) => s.id === slug)) { toast.error("يوجد تخصص بنفس الاسم الإنجليزي."); return; }
    const plan: Pair[][] = stageText.map((txt) =>
      txt
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .map((l) => {
          const [ar, en] = l.split("|").map((x) => x.trim());
          return [ar ?? l, en || ar || l] as Pair;
        }),
    );
    if (plan.some((st) => st.length === 0)) { toast.error("أضف موضوعًا واحدًا على الأقل في كل مرحلة."); return; }
    const name = { ar: f.nameAr, en: f.nameEn };
    const spec: Specialization = {
      id: slug,
      name,
      tagline: { ar: f.taglineAr, en: f.taglineEn || f.taglineAr },
      description: { ar: f.descAr, en: f.descEn || f.descAr },
      icon: "Sprout",
      difficulty: f.difficulty,
      hours: Number(f.hours) || 100,
      demand: Math.min(5, Math.max(1, Number(f.demand))) as Specialization["demand"],
      skills: list(f.skills),
      tools: list(f.tools),
      topicsPool: plan.flat().map(([ar, en]) => ({ ar, en })),
      roles: list(f.rolesAr).map((r, i) => ({
        id: `${slug}-role-${i + 1}`,
        title: { ar: r, en: r },
        description: { ar: `وظيفة في مجال ${f.nameAr}.`, en: `A role in ${f.nameEn}.` },
        responsibilities: [],
        skills: list(f.skills).slice(0, 4),
        tools: list(f.tools).slice(0, 4),
        entry: { ar: "حديث تخرج", en: "Fresh graduate" },
        senior: { ar: "خبرة 5+ سنوات", en: "5+ years" },
      })),
      stages: buildStages(slug, name, plan),
      projects: [],
      mentorPersona: {
        ar: `مهندس خبير في ${f.nameAr} يدرّبك خطوة بخطوة حتى الجاهزية لسوق العمل.`,
        en: `An expert ${f.nameEn} engineer coaching you step by step to job readiness.`,
      },
    };
    setBusy(true);
    try {
      const { upsertCatalogRow } = await import("@/lib/catalog.functions");
      await upsertCatalogRow({ data: { id: slug, data: spec, hidden: false } });
    } catch (e) {
      setBusy(false);
      toast.error(String((e as Error).message));
      return;
    }
    setBusy(false);
    toast.success("تمت إضافة التخصص");
    onSaved();
  }

  const valid = f.nameAr.trim() && f.nameEn.trim() && f.descAr.trim();

  return (
    <Card className="border-primary/30">
      <CardContent className="space-y-4 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="اسم التخصص (عربي)" value={f.nameAr} onChange={(v) => set("nameAr", v)} />
          <Field label="Name (English)" value={f.nameEn} onChange={(v) => set("nameEn", v)} ltr />
          <Field label="وصف مختصر (عربي)" value={f.taglineAr} onChange={(v) => set("taglineAr", v)} />
          <Field label="Tagline (English)" value={f.taglineEn} onChange={(v) => set("taglineEn", v)} ltr />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>الوصف (عربي)</Label>
            <Textarea rows={3} value={f.descAr} onChange={(e) => set("descAr", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Description (English)</Label>
            <Textarea dir="ltr" rows={3} value={f.descEn} onChange={(e) => set("descEn", e.target.value)} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label>المستوى</Label>
            <Select value={f.difficulty} onValueChange={(v) => set("difficulty", v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">مبتدئ</SelectItem>
                <SelectItem value="intermediate">متوسط</SelectItem>
                <SelectItem value="advanced">متقدم</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Field label="عدد الساعات" value={String(f.hours)} onChange={(v) => set("hours", v)} ltr />
          <Field label="الطلب في السوق (1-5)" value={String(f.demand)} onChange={(v) => set("demand", v)} ltr />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="المهارات (افصل بفاصلة)" value={f.skills} onChange={(v) => set("skills", v)} />
          <Field label="الأدوات (افصل بفاصلة)" value={f.tools} onChange={(v) => set("tools", v)} />
          <Field label="الوظائف المتاحة (افصل بفاصلة)" value={f.rolesAr} onChange={(v) => set("rolesAr", v)} />
        </div>

        <div className="space-y-3">
          <p className="font-display font-bold text-foreground">خريطة الطريق بالترتيب</p>
          <p className="text-xs text-muted-foreground">
            اكتب كل موضوع في سطر: <span dir="ltr">عربي | English</span>
          </p>
          {STAGES.map((st, i) => (
            <div key={i} className="space-y-1.5">
              <Label>
                المرحلة {i + 1}: {st.title[0]}
              </Label>
              <Textarea
                rows={3}
                value={stageText[i]}
                onChange={(e) => setStageText((p) => p.map((x, j) => (j === i ? e.target.value : x)))}
                placeholder="أساسيات التربة | Soil basics"
              />
            </div>
          ))}
        </div>

        <Button disabled={!valid || busy} onClick={save}>
          حفظ التخصص
        </Button>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  value,
  onChange,
  ltr,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  ltr?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input dir={ltr ? "ltr" : undefined} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
