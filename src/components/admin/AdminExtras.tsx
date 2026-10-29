import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowDown, ArrowUp, Plus, RotateCcw, Trash2, UserCheck, Users, UserPlus } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { listRegisteredUsers, listUserProgress, setUserBanned, type AdminUser } from "@/lib/admin.functions";
import { listPageViews, upsertCatalogRow, deleteCatalogRow } from "@/lib/catalog.functions";
import { specializations } from "@/data/specializations";
import { getBuiltin, BUILTIN_IDS } from "@/lib/catalog";
import type { Loc, Specialization, Stage, Topic } from "@/types";

const fmt = (d: string | null) => (d ? new Date(d).toLocaleString("ar-EG") : "—");

export function UsersPanel() {
  const fetchUsers = useServerFn(listRegisteredUsers);
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [q, setQ] = useState("");
  const banFn = useServerFn(setUserBanned);
  const [prog, setProg] = useState<Record<string, { primary_specialization: string | null; level: string | null; career_goal: string | null; completed_topics: string[]; completed_projects: string[]; updated_at: string }>>({});

  const load = () =>
    fetchUsers()
      .then((r) => setUsers(r.users))
      .catch((e) => { toast.error(String(e?.message ?? e)); setUsers([]); });
  useEffect(() => {
    void load();
    void listUserProgress().then((data) => setProg(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchUsers]);

  async function toggleBan(u: AdminUser) {
    if (!confirm(u.banned ? "إعادة تشغيل هذا الحساب؟" : "إيقاف هذا الحساب؟ لن يستطيع تسجيل الدخول.")) return;
    try {
      await banFn({ data: { userId: u.id, banned: !u.banned } });
      toast.success(u.banned ? "تم تشغيل الحساب" : "تم إيقاف الحساب");
      await load();
    } catch (e) { toast.error(String((e as Error).message)); }
  }

  const stats = useMemo(() => {
    const list = users ?? [];
    const week = Date.now() - 7 * 864e5;
    return {
      total: list.length,
      newWeek: list.filter((u) => +new Date(u.created_at) > week).length,
      activeWeek: list.filter((u) => u.last_sign_in_at && +new Date(u.last_sign_in_at) > week).length,
    };
  }, [users]);

  const shown = (users ?? []).filter(
    (u) => !q || (u.email ?? "").toLowerCase().includes(q.toLowerCase()) || (u.name ?? "").includes(q),
  );

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <Mini icon={<Users className="size-5" />} label="إجمالي المسجلين" value={stats.total} />
        <Mini icon={<UserPlus className="size-5" />} label="سجلوا آخر 7 أيام" value={stats.newWeek} />
        <Mini icon={<UserCheck className="size-5" />} label="نشطين آخر 7 أيام" value={stats.activeWeek} />
      </div>
      <Card>
        <CardContent className="space-y-3 p-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display font-bold text-foreground">المستخدمون المسجلون</h3>
            <Input className="max-w-xs" placeholder="بحث بالإيميل أو الاسم" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          {users === null ? (
            <p className="text-sm text-muted-foreground">جارٍ التحميل...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <th className="p-2 text-start">الإيميل</th>
                    <th className="p-2 text-start">الاسم</th>
                    <th className="p-2 text-start">طريقة الدخول</th>
                    <th className="p-2 text-start">تاريخ التسجيل</th>
                    <th className="p-2 text-start">آخر دخول</th>
                    <th className="p-2 text-start">بيدرس إيه</th>
                    <th className="p-2 text-start">التقدم</th>
                    <th className="p-2 text-start">الحالة</th>
                    <th className="p-2 text-start">إجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {shown.map((u) => (
                    <tr key={u.id} className="border-b border-border/50">
                      <td className="p-2" dir="ltr">{u.email}</td>
                      <td className="p-2">{u.name ?? "—"}</td>
                      <td className="p-2">{u.provider === "google" ? "Google" : "إيميل"}</td>
                      <td className="p-2">{fmt(u.created_at)}</td>
                      <td className="p-2">{fmt(u.last_sign_in_at)}</td>
                      <td className="p-2">
                        {(() => {
                          const p = prog[u.id];
                          const sp = specializations.find((s) => s.id === p?.primary_specialization);
                          return sp ? (
                            <div>
                              <p className="font-medium text-foreground">{sp.name.ar}</p>
                              {p?.career_goal && <p className="text-xs text-muted-foreground">الهدف: {p.career_goal}</p>}
                            </div>
                          ) : <span className="text-muted-foreground">لم يختر بعد</span>;
                        })()}
                      </td>
                      <td className="p-2 text-xs">
                        {prog[u.id] ? (
                          <>
                            <p>{prog[u.id]!.completed_topics.length} موضوع منجز</p>
                            <p className="text-muted-foreground">{prog[u.id]!.completed_projects.length} مشروع</p>
                          </>
                        ) : "—"}
                      </td>
                      <td className="p-2">
                        <Badge variant={u.banned ? "destructive" : "secondary"}>{u.banned ? "موقوف" : "نشط"}</Badge>
                      </td>
                      <td className="p-2">
                        <Button size="sm" variant={u.banned ? "default" : "outline"} onClick={() => toggleBan(u)}>
                          {u.banned ? "تشغيل" : "إيقاف"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {shown.length === 0 && <p className="mt-3 text-sm text-muted-foreground">لا يوجد مستخدمون.</p>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Mini({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
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

const L = (ar: string, en?: string): Loc => ({ ar, en: en || ar });

function newTopic(spec: Specialization, stage: Stage): Topic {
  return {
    id: `${stage.id}-t${Date.now().toString(36)}`,
    title: L("موضوع جديد", "New topic"),
    summary: L("وصف مختصر للموضوع."),
    why: L(`مهم للتقدم في ${spec.name.ar}.`, `Important for progress in ${spec.name.en}.`),
    outcomes: [],
    difficulty: spec.difficulty,
    minutes: 60,
    skills: [],
    prerequisites: [],
    task: L("طبّق ما تعلمته في تمرين عملي قصير."),
    promptFocus: L("اشرح هذا الموضوع بأمثلة عملية."),
  };
}

function move<T>(arr: T[], i: number, d: number) {
  const j = i + d;
  if (j < 0 || j >= arr.length) return arr;
  const c = [...arr];
  const a = c[i] as T;
  c[i] = c[j] as T;
  c[j] = a;
  return c;
}

export function RoadmapEditor({
  spec,
  open,
  onClose,
  onSaved,
}: {
  spec: Specialization;
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [draft, setDraft] = useState<Specialization>(() => structuredClone(spec));
  const [busy, setBusy] = useState(false);
  useEffect(() => { if (open) setDraft(structuredClone(spec)); }, [open, spec]);

  const isBuiltin = BUILTIN_IDS.has(spec.id);
  const setStages = (stages: Stage[]) =>
    setDraft((d) => ({ ...d, stages: stages.map((s, i) => ({ ...s, order: i + 1 })) }));
  const updStage = (i: number, patch: Partial<Stage>) =>
    setStages(draft.stages.map((s, k) => (k === i ? { ...s, ...patch } : s)));
  const updTopic = (si: number, ti: number, patch: Partial<Topic>) =>
    updStage(si, { topics: (draft.stages[si]?.topics ?? []).map((t, k) => (k === ti ? { ...t, ...patch } : t)) });

  async function save() {
    if (draft.stages.some((s) => s.topics.length === 0)) { toast.error("كل مرحلة لازم يكون فيها موضوع واحد على الأقل."); return; }
    setBusy(true);
    const data = { ...draft, stages: draft.stages.map((s) => ({ ...s, topics: s.topics.map((t) => ({ ...t, videos: (t.videos ?? []).filter(Boolean), outcomes: t.outcomes.filter((o) => o.ar.trim()) })) })), topicsPool: draft.stages.flatMap((s) => s.topics.map((t) => t.title)) };
    try {
      await upsertCatalogRow({ data: { id: spec.id, data: data as never, hidden: false } });
    } catch (e) {
      setBusy(false);
      toast.error(String((e as Error).message));
      return;
    }
    setBusy(false);
    toast.success("تم حفظ الخريطة");
    onSaved();
  }

  async function restore() {
    if (!confirm("استرجاع الخريطة الأصلية وحذف تعديلاتك؟")) return;
    try {
      await deleteCatalogRow({ data: { id: spec.id } });
    } catch (e) {
      toast.error(String((e as Error).message));
      return;
    }
    toast.success("تم الاسترجاع");
    onSaved();
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent dir="rtl" className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>تعديل تخصص: {spec.name.ar}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input value={draft.name.ar} onChange={(e) => setDraft({ ...draft, name: { ...draft.name, ar: e.target.value } })} />
          <Input dir="ltr" value={draft.name.en} onChange={(e) => setDraft({ ...draft, name: { ...draft.name, en: e.target.value } })} />
          <Textarea rows={2} value={draft.description.ar} onChange={(e) => setDraft({ ...draft, description: { ...draft.description, ar: e.target.value } })} />
          <Textarea dir="ltr" rows={2} value={draft.description.en} onChange={(e) => setDraft({ ...draft, description: { ...draft.description, en: e.target.value } })} />
        </div>
        <p className="font-display font-bold text-foreground">خريطة التعلم (بالترتيب من الأساسيات للجاهزية)</p>
        <div className="space-y-4">
          {draft.stages.map((st, si) => (
            <Card key={st.id} className="border-primary/20">
              <CardContent className="space-y-3 p-4">
                <div className="flex items-center gap-2">
                  <Badge>المرحلة {si + 1}</Badge>
                  <Input value={st.title.ar} onChange={(e) => updStage(si, { title: { ...st.title, ar: e.target.value } })} />
                  <Input dir="ltr" value={st.title.en} onChange={(e) => updStage(si, { title: { ...st.title, en: e.target.value } })} />
                  <Button size="icon" variant="ghost" onClick={() => setStages(move(draft.stages, si, -1))}><ArrowUp className="size-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => setStages(move(draft.stages, si, 1))}><ArrowDown className="size-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => confirm("حذف المرحلة؟") && setStages(draft.stages.filter((_, k) => k !== si))}>
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
                <Input placeholder="هدف المرحلة" value={st.goal.ar} onChange={(e) => updStage(si, { goal: { ...st.goal, ar: e.target.value } })} />
                <div className="space-y-2 ps-4">
                  {st.topics.map((t, ti) => (
                    <div key={t.id} className="space-y-1 rounded-lg border border-border/60 p-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{ti + 1}.</span>
                        <Input value={t.title.ar} onChange={(e) => updTopic(si, ti, { title: { ...t.title, ar: e.target.value } })} />
                        <Input dir="ltr" value={t.title.en} onChange={(e) => updTopic(si, ti, { title: { ...t.title, en: e.target.value } })} />
                        <Input className="w-20" dir="ltr" type="number" value={t.minutes} onChange={(e) => updTopic(si, ti, { minutes: Number(e.target.value) || 30 })} />
                        <Button size="icon" variant="ghost" onClick={() => updStage(si, { topics: move(st.topics, ti, -1) })}><ArrowUp className="size-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => updStage(si, { topics: move(st.topics, ti, 1) })}><ArrowDown className="size-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => updStage(si, { topics: st.topics.filter((_, k) => k !== ti) })}>
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </div>
                      <Textarea
                        rows={2}
                        placeholder="ما يجب دراسته في هذا الموضوع (كل نقطة في سطر)"
                        value={t.outcomes.map((o) => o.ar).join("\n")}
                        onChange={(e) =>
                          updTopic(si, ti, {
                            outcomes: e.target.value.split("\n").map((x, k) => ({ ar: x, en: t.outcomes[k]?.en || x })),
                          })
                        }
                      />
                      <Textarea
                        rows={1}
                        dir="ltr"
                        placeholder="روابط فيديو الشرح (YouTube / Vimeo / Google Drive) — كل رابط في سطر"
                        value={(t.videos ?? []).join("\n")}
                        onChange={(e) => updTopic(si, ti, { videos: e.target.value.split("\n").map((x) => x.trim()) })}
                      />
                      <Textarea rows={1} placeholder="شرح مختصر" value={t.summary.ar} onChange={(e) => updTopic(si, ti, { summary: { ...t.summary, ar: e.target.value } })} />
                    </div>
                  ))}
                  <Button size="sm" variant="outline" className="gap-1" onClick={() => updStage(si, { topics: [...st.topics, newTopic(draft, st)] })}>
                    <Plus className="size-3.5" /> إضافة موضوع
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button
            variant="outline"
            className="gap-1"
            onClick={() => {
              const st: Stage = { id: `${spec.id}-s${Date.now().toString(36)}`, order: 0, title: L("مرحلة جديدة", "New stage"), goal: L("هدف المرحلة"), topics: [] };
              setStages([...draft.stages, { ...st, topics: [newTopic(draft, st)] }]);
            }}
          >
            <Plus className="size-4" /> إضافة مرحلة
          </Button>
        </div>
        <div className="flex justify-between gap-2 border-t border-border pt-4">
          {isBuiltin && getBuiltin(spec.id) !== spec ? (
            <Button variant="ghost" className="gap-1" onClick={restore}><RotateCcw className="size-4" /> استرجاع الأصلي</Button>
          ) : <span />}
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>إلغاء</Button>
            <Button disabled={busy} onClick={save}>حفظ التعديلات</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function OverviewPanel({ onGo }: { onGo: (tab: string) => void }) {
  const fetchUsers = useServerFn(listRegisteredUsers);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [views, setViews] = useState<{ session_id: string; created_at: string; path: string }[]>([]);

  useEffect(() => {
    fetchUsers().then((r) => setUsers(r.users)).catch(() => {});
    void listPageViews({ data: { days: 30 } }).then((data) => setViews(data));
  }, [fetchUsers]);

  const days = Array.from({ length: 14 }, (_, i) => new Date(Date.now() - (13 - i) * 864e5).toISOString().slice(0, 10));
  const visitorsByDay = days.map((d) => new Set(views.filter((v) => v.created_at.startsWith(d)).map((v) => v.session_id)).size);
  const signupsByDay = days.map((d) => users.filter((u) => u.created_at.startsWith(d)).length);
  const today = days[days.length - 1] ?? "";

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Mini icon={<Users className="size-5" />} label="إجمالي المسجلين" value={users.length} />
        <Mini icon={<UserPlus className="size-5" />} label="مسجلين اليوم" value={users.filter((u) => u.created_at.startsWith(today)).length} />
        <Mini icon={<UserCheck className="size-5" />} label="زوار آخر 30 يوم" value={new Set(views.map((v) => v.session_id)).size} />
        <Mini icon={<UserCheck className="size-5" />} label="زوار اليوم" value={visitorsByDay[visitorsByDay.length - 1] ?? 0} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Chart title="الزوار يوميًا (آخر 14 يوم)" data={visitorsByDay} labels={days} />
        <Chart title="التسجيلات الجديدة يوميًا" data={signupsByDay} labels={days} />
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-foreground">أحدث المسجلين</h3>
            <Button size="sm" variant="ghost" onClick={() => onGo("users")}>عرض الكل</Button>
          </div>
          <ul className="mt-3 divide-y divide-border text-sm">
            {users.slice(0, 6).map((u) => (
              <li key={u.id} className="flex justify-between py-2">
                <span dir="ltr">{u.email}</span>
                <span className="text-muted-foreground">{fmt(u.created_at)}</span>
              </li>
            ))}
            {users.length === 0 && <li className="py-2 text-muted-foreground">لا يوجد مسجلين بعد.</li>}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function Chart({ title, data, labels }: { title: string; data: number[]; labels: string[] }) {
  const max = Math.max(1, ...data);
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-display font-bold text-foreground">{title}</h3>
        <div className="mt-4 flex h-40 items-end gap-1" dir="ltr">
          {data.map((n, i) => (
            <div key={labels[i]} className="flex flex-1 flex-col items-center gap-1" title={`${labels[i]}: ${n}`}>
              <span className="text-[10px] text-muted-foreground">{n || ""}</span>
              <div className="w-full rounded-t bg-primary/80" style={{ height: `${(n / max) * 100}%`, minHeight: n ? 4 : 1 }} />
              <span className="text-[9px] text-muted-foreground">{labels[i]?.slice(8)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
