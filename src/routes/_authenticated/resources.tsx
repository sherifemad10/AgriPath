import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink, Library, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
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
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { specializations } from "@/data/specializations";
import type { Resource } from "@/types";

export const Route = createFileRoute("/_authenticated/resources")({
  head: () => ({
    meta: [
      { title: "المصادر | أجريباث" },
      { name: "description", content: "مكتبة مصادرك: كتب، دورات، قنوات وأدوات مرتبة بحالة التعلّم." },
      { property: "og:title", content: "المصادر | أجريباث" },
      { property: "og:description", content: "اجمع مصادر تعلّمك الزراعي ورتّبها." },
    ],
  }),
  component: Resources,
});

const statuses: Resource["status"][] = ["to-learn", "learning", "completed"];
const statusLabel = {
  "to-learn": { ar: "للتعلّم", en: "To learn" },
  learning: { ar: "جارٍ التعلّم", en: "Learning" },
  completed: { ar: "مكتمل", en: "Completed" },
};

function Resources() {
  const { t, L, lang } = useI18n();
  const store = useStore();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [specId, setSpecId] = useState(specializations[0]!.id);
  const [filter, setFilter] = useState<Resource["status"] | "all">("all");

  const list = store.resources.filter((r) => filter === "all" || r.status === filter);

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <h1 className="flex items-center gap-2 font-display text-3xl font-bold text-foreground">
          <Library className="size-6 text-primary" /> {t("nav_resources")}
        </h1>

        <div className="mt-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="border-border/70">
            <CardContent className="space-y-3 p-6">
              <h2 className="font-display font-bold text-foreground">{t("addResource")}</h2>
              <div className="space-y-2">
                <Label htmlFor="rt">{lang === "ar" ? "العنوان" : "Title"}</Label>
                <Input id="rt" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ru">{lang === "ar" ? "الرابط" : "Link"}</Label>
                <Input id="ru" value={url} onChange={(e) => setUrl(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rc">{lang === "ar" ? "النوع" : "Type"}</Label>
                <Input
                  id="rc"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder={lang === "ar" ? "كتاب / دورة / قناة" : "Book / Course / Channel"}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("nav_specializations")}</Label>
                <Select value={specId} onValueChange={setSpecId}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {L(s.name)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rd">{lang === "ar" ? "وصف قصير" : "Short description"}</Label>
                <Textarea
                  id="rd"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <Button
                disabled={!title.trim()}
                onClick={() => {
                  store.addResource({
                    title,
                    url,
                    description,
                    category: category || (lang === "ar" ? "عام" : "General"),
                    specializationId: specId,
                    status: "to-learn",
                  });
                  setTitle("");
                  setUrl("");
                  setDescription("");
                  setCategory("");
                  toast.success(t("save"));
                }}
              >
                {t("save")}
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {(["all", ...statuses] as const).map((s) => (
                <Button
                  key={s}
                  size="sm"
                  variant={filter === s ? "default" : "outline"}
                  onClick={() => setFilter(s)}
                >
                  {s === "all" ? (lang === "ar" ? "الكل" : "All") : L(statusLabel[s])}
                </Button>
              ))}
            </div>

            {list.length === 0 && (
              <p className="text-sm text-muted-foreground">{t("emptyResources")}</p>
            )}

            {list.map((r) => (
              <Card key={r.id} className="border-border/70">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{r.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{r.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-[11px]">
                          {r.category}
                        </Badge>
                        <Badge variant="secondary" className="text-[11px]">
                          {L(statusLabel[r.status])}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {r.url && (
                        <a href={r.url} target="_blank" rel="noreferrer">
                          <Button size="icon" variant="ghost">
                            <ExternalLink className="size-4" />
                          </Button>
                        </a>
                      )}
                      <Button size="icon" variant="ghost" onClick={() => store.deleteResource(r.id)}>
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {statuses.map((s) => (
                      <Button
                        key={s}
                        size="sm"
                        variant={r.status === s ? "default" : "outline"}
                        onClick={() => store.setResourceStatus(r.id, s)}
                      >
                        {L(statusLabel[s])}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
