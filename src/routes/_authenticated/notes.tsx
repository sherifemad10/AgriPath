import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Notebook, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/_authenticated/notes")({
  head: () => ({
    meta: [
      { title: "ملاحظاتي | أجريباث" },
      { name: "description", content: "دفتر ملاحظات التعلّم: وثّق ما تتعلمه وصنّفه بالوسوم." },
      { property: "og:title", content: "ملاحظاتي | أجريباث" },
      { property: "og:description", content: "وثّق تعلّمك الزراعي في مكان واحد." },
    ],
  }),
  component: Notes,
});

function Notes() {
  const { t, lang } = useI18n();
  const store = useStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [q, setQ] = useState("");
  const [favOnly, setFavOnly] = useState(false);

  const list = store.notes.filter(
    (n) =>
      (!favOnly || n.favorite) &&
      `${n.title} ${n.content} ${n.category} ${n.tags.join(" ")}`
        .toLowerCase()
        .includes(q.toLowerCase()),
  );

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <h1 className="flex items-center gap-2 font-display text-3xl font-bold text-foreground">
          <Notebook className="size-6 text-primary" /> {t("nav_notes")}
        </h1>

        <div className="mt-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="border-border/70">
            <CardContent className="space-y-3 p-6">
              <h2 className="font-display font-bold text-foreground">{t("addNote")}</h2>
              <div className="space-y-2">
                <Label htmlFor="nt">{lang === "ar" ? "العنوان" : "Title"}</Label>
                <Input id="nt" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nc">{lang === "ar" ? "التصنيف" : "Category"}</Label>
                <Input id="nc" value={category} onChange={(e) => setCategory(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nb">{lang === "ar" ? "المحتوى" : "Content"}</Label>
                <Textarea
                  id="nb"
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <Button
                disabled={!title.trim() || !content.trim()}
                onClick={() => {
                  store.addNote({
                    title,
                    content,
                    category: category || (lang === "ar" ? "عام" : "General"),
                    tags: [],
                    favorite: false,
                  });
                  setTitle("");
                  setContent("");
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
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("search")}
                className="max-w-xs"
              />
              <Button variant={favOnly ? "default" : "outline"} onClick={() => setFavOnly(!favOnly)}>
                <Star className="size-4" />
              </Button>
            </div>

            {list.length === 0 && (
              <p className="text-sm text-muted-foreground">{t("emptyNotes")}</p>
            )}

            {list.map((n) => (
              <Card key={n.id} className="border-border/70">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{n.title}</h3>
                      <Badge variant="outline" className="mt-1 text-[11px]">
                        {n.category}
                      </Badge>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => store.updateNote(n.id, { favorite: !n.favorite })}
                      >
                        <Star
                          className={n.favorite ? "size-4 fill-primary text-primary" : "size-4"}
                        />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => store.deleteNote(n.id)}>
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">
                    {n.content}
                  </p>
                  {n.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {n.tags.map((x) => (
                        <Badge key={x} variant="secondary" className="text-[11px]">
                          {x}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
