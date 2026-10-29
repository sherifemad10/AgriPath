import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  FileDown,
  FileText,
  Filter,
  FlaskConical,
  GraduationCap,
  Loader2,
  Quote,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { listLivePapers, researchTopics, summarizePaper, type LivePaper } from "@/lib/live-research.functions";
import { useI18n } from "@/lib/i18n";
import { formatCitation, type CitationStyle } from "@/lib/citations";

export const Route = createFileRoute("/_authenticated/research")({
  head: () => ({
    meta: [
      { title: "الأبحاث الزراعية الحية و Google Scholar | AgriPath" },
      {
        name: "description",
        content:
          "أحدث الأبحاث الزراعية المحكمة من آخر 3 سنوات، مرتبطة مباشرة بـ Google Scholar والفهارس العالمية، محدثة باستمرار مع إمكانية التصفية المتقدمة وتوليد الاستشهادات.",
      },
      { property: "og:title", content: "الأبحاث الزراعية الحية | AgriPath" },
      { property: "og:description", content: "تحديث فوري للأبحاث الزراعية العالمية من Google Scholar و CrossRef و OpenAlex." },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: Research,
});

const QUICK_SUGGESTIONS = [
  { ar: "ري بالتنقيط", en: "Drip irrigation" },
  { ar: "استشعار عن بعد", en: "Remote sensing" },
  { ar: "قمح", en: "Wheat yield" },
  { ar: "ملوحة التربة", en: "Soil salinity" },
  { ar: "هيدروبونيك", en: "Hydroponics" },
  { ar: "مكافحة حيوية", en: "Biocontrol" },
  { ar: "صوبات زراعية", en: "Greenhouses" },
  { ar: "ذكاء اصطناعي في الزراعة", en: "AI in agriculture" },
];

function Research() {
  const { lang } = useI18n();
  const list = useServerFn(listLivePapers);
  const ar = lang === "ar";

  // Last 3 years strictly
  const currentYear = new Date().getFullYear();
  const yearsList = useMemo(() => [String(currentYear), String(currentYear - 1), String(currentYear - 2)], [currentYear]);

  const [q, setQ] = useState("");
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");
  const [year, setYear] = useState("all");
  const [openAccess, setOpenAccess] = useState(false);
  const [sort, setSort] = useState<"date" | "citations">("date");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  // Modals state
  const [selectedPaper, setSelectedPaper] = useState<LivePaper | null>(null);
  const [citePaper, setCitePaper] = useState<LivePaper | null>(null);

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["live-papers", query, topic, year, openAccess, sort, page],
    queryFn: () =>
      list({
        data: {
          q: query || undefined,
          topic,
          year,
          openAccess,
          sort,
          page,
        },
      }),
    placeholderData: keepPreviousData,
    staleTime: 8 * 60 * 1000,
  });

  const filteredPapers = useMemo(() => {
    if (!data?.papers) return [];
    if (sourceFilter === "all") return data.papers;
    return data.papers.filter((p) => p.source.toLowerCase().includes(sourceFilter.toLowerCase()));
  }, [data?.papers, sourceFilter]);

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:py-10">
        {/* Header Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-background p-6 shadow-soft sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default" className="gap-1.5 px-3 py-1 bg-primary text-primary-foreground font-semibold">
                  <GraduationCap className="size-4" />
                  Google Scholar & Global Indexes
                </Badge>
                <Badge variant="outline" className="border-primary/30 text-xs">
                  {ar ? "آخر 3 سنوات (2024 - 2026)" : "Last 3 Years (2024 - 2026)"}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {ar ? "تحديث مستمر حي" : "Real-time Live Sync"}
                </Badge>
              </div>

              <h1 className="mt-4 flex items-center gap-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                <FlaskConical className="size-8 text-primary" />
                {ar ? "فهرس الأبحاث الزراعية العالمية الحية" : "Live Global Agricultural Research"}
              </h1>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {ar
                  ? "منصة متصلة مباشرة بمحرك Google Scholar وفهارس الأبحاث العالمية (OpenAlex, CrossRef, Semantic Scholar). تعرض أحدث الأوراق العلمية المحكّمة من آخر 3 سنوات من الأحدث للأقدم، مع ملخصات تطبيقية ذكية، ورابط مباشر لكل ورقة على Google Scholar، وتوليد فوري للاستشهادات الأكاديمية."
                  : "Connected live to Google Scholar and global scholarly indexes. Discover peer-reviewed agronomy papers from the last 3 years ranked newest first, with field-ready executive summaries, direct Google Scholar links, and instant academic citation generation."}
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:items-end">
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary" className="gap-1 font-medium">
                  <GraduationCap className="size-3 text-primary" /> Google Scholar
                </Badge>
                <Badge variant="outline">CrossRef</Badge>
                <Badge variant="outline">OpenAlex</Badge>
                <Badge variant="outline">Semantic Scholar</Badge>
              </div>
              <p className="text-[11px] text-muted-foreground">
                {ar ? "فهرسة دورية ذكية بدون وسيط" : "Direct API scholarly integration"}
              </p>
            </div>
          </div>
        </div>

        {/* Search & Advanced Filters Bar */}
        <Card className="mt-6 border-border/80 shadow-soft">
          <CardContent className="space-y-4 p-5 sm:p-6">
            {/* Search Input Row */}
            <form
              className="flex flex-col gap-2.5 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                setPage(1);
                setQuery(q);
              }}
            >
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="h-11 ps-10 text-sm"
                  dir="auto"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={
                    ar
                      ? "ابحث بالعربية أو الإنجليزية: قمح، ري بالتنقيط، ملوحة، استشعار، طماطم، DOI..."
                      : "Search by crop, topic, author, or DOI: wheat, drip irrigation, salinity, remote sensing..."
                  }
                />
              </div>

              <Button type="submit" size="lg" className="gap-2 h-11 px-6 shadow-soft">
                <Filter className="size-4" />
                {ar ? "بحث وتصفية" : "Search"}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-11 px-4 gap-2"
                onClick={() => {
                  refetch();
                  toast.success(ar ? "تم طلب تحديث الفهرس من المصادر" : "Refreshing live scholarly indexes");
                }}
                aria-label="Refresh live data"
              >
                <RefreshCw className={`size-4 ${isFetching ? "animate-spin text-primary" : ""}`} />
                <span className="hidden sm:inline">{ar ? "تحديث" : "Refresh"}</span>
              </Button>
            </form>

            {/* Quick Keyword Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-semibold text-muted-foreground me-1">{ar ? "مقترحات سريعة:" : "Quick tags:"}</span>
              {QUICK_SUGGESTIONS.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    const term = ar ? s.ar : s.en;
                    setQ(term);
                    setQuery(term);
                    setPage(1);
                  }}
                  className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary hover:border-primary/40"
                >
                  {ar ? s.ar : s.en}
                </button>
              ))}
            </div>

            <hr className="border-border/60" />

            {/* Topic Filter Chips */}
            <div>
              <div className="mb-2 flex items-center justify-between text-xs font-semibold text-muted-foreground">
                <span>{ar ? "التخصص الزراعي:" : "Agricultural Specialization:"}</span>
                {topic !== "all" && (
                  <button
                    onClick={() => {
                      setTopic("all");
                      setPage(1);
                    }}
                    className="text-primary hover:underline"
                  >
                    {ar ? "عرض جميع التخصصات" : "Reset topic"}
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {researchTopics.map((t) => {
                  const active = topic === t.id;
                  return (
                    <Button
                      key={t.id}
                      size="sm"
                      variant={active ? "default" : "outline"}
                      onClick={() => {
                        setTopic(t.id);
                        setPage(1);
                      }}
                      className={`text-xs h-8 ${active ? "shadow-soft font-semibold" : "border-border/70 text-muted-foreground hover:text-foreground"}`}
                    >
                      {ar ? t.ar : t.en}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Granular Criteria Row: Year, Sort, Open Access, Source */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                  <Calendar className="size-3.5" />
                  {ar ? "السنة (آخر 3 سنوات):" : "Year:"}
                </span>

                <Button
                  size="sm"
                  variant={year === "all" ? "default" : "outline"}
                  onClick={() => {
                    setYear("all");
                    setPage(1);
                  }}
                  className="h-7 text-xs"
                >
                  {ar ? "الكل (2024 - 2026)" : "All (2024 - 2026)"}
                </Button>

                {yearsList.map((y) => (
                  <Button
                    key={y}
                    size="sm"
                    variant={year === y ? "default" : "outline"}
                    onClick={() => {
                      setYear(y);
                      setPage(1);
                    }}
                    className="h-7 text-xs"
                  >
                    {y}
                  </Button>
                ))}

                <span className="ms-3 text-xs font-semibold text-muted-foreground flex items-center gap-1">
                  <SlidersHorizontal className="size-3.5" />
                  {ar ? "الترتيب:" : "Sort:"}
                </span>

                <Button
                  size="sm"
                  variant={sort === "date" ? "default" : "outline"}
                  onClick={() => {
                    setSort("date");
                    setPage(1);
                  }}
                  className="h-7 text-xs"
                >
                  {ar ? "الأحدث أولاً" : "Newest first"}
                </Button>

                <Button
                  size="sm"
                  variant={sort === "citations" ? "default" : "outline"}
                  onClick={() => {
                    setSort("citations");
                    setPage(1);
                  }}
                  className="h-7 text-xs"
                >
                  {ar ? "الأكثر استشهاداً" : "Most cited"}
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-border/80 bg-secondary/30 px-3 py-1 text-xs font-medium transition-colors hover:bg-secondary/60">
                  <Checkbox
                    checked={openAccess}
                    onCheckedChange={(v) => {
                      setOpenAccess(v === true);
                      setPage(1);
                    }}
                  />
                  <span>{ar ? "مفتوح الوصول فقط (PDF مجاني)" : "Open Access Only (Free PDF)"}</span>
                </label>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span>{ar ? "المصدر:" : "Source:"}</span>
                  <select
                    value={sourceFilter}
                    onChange={(e) => setSourceFilter(e.target.value)}
                    className="rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="all">{ar ? "جميع الفهارس" : "All Indexes"}</option>
                    <option value="google">Google Scholar</option>
                    <option value="openalex">OpenAlex</option>
                    <option value="crossref">CrossRef</option>
                    <option value="semantic">Semantic Scholar</option>
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Status Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {data
                ? ar
                  ? `تم العثور على ${data.total.toLocaleString("ar-EG")} ورقة بحثية · آخر تحديث حي: ${new Date(data.fetchedAt).toLocaleTimeString("ar-EG")}`
                  : `Found ${data.total.toLocaleString("en-US")} peer-reviewed papers · Synced at ${new Date(data.fetchedAt).toLocaleTimeString()}`
                : ar
                  ? "جارٍ استدعاء أحدث الأبحاث من Google Scholar والفهارس العلمية..."
                  : "Querying Google Scholar and scholarly indexes in real time..."}
            </span>
          </div>

          <div className="text-[11px]">
            {ar ? "مرتبة زمنياً من الأحدث إلى الأقدم (2024 - 2026)" : "Ranked newest to oldest (2024 - 2026)"}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-center text-sm text-destructive">
            {ar
              ? "تعذر تحميل بعض الأبحاث من الفهارس العلمية بسبب ضغط الخوادم. اضغط على زر التحديث لإعادة المحاولة."
              : "Could not load papers from scholarly index. Please retry shortly."}
          </div>
        )}

        {/* Loading spinner */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="size-10 animate-spin text-primary" />
            <p className="mt-4 text-sm text-muted-foreground">
              {ar ? "جارٍ جلب وتصفية الأبحاث من Google Scholar و CrossRef..." : "Fetching live agricultural papers from Google Scholar..."}
            </p>
          </div>
        )}

        {/* Papers Grid */}
        {!isLoading && filteredPapers.length === 0 && (
          <div className="mt-12 rounded-2xl border border-border/80 bg-card p-12 text-center">
            <FlaskConical className="mx-auto size-12 text-muted-foreground/50" />
            <h3 className="mt-4 font-display text-lg font-bold text-foreground">
              {ar ? "لم يتم العثور على أبحاث مطابقة" : "No papers match your filters"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              {ar
                ? "جرّب تغيير كلمات البحث، أو اختر 'جميع المجالات' أو وسّع فلتر السنوات لتشمل جميع الأبحاث."
                : "Try adjusting your search query, choosing 'All Fields', or disabling the Open Access filter."}
            </p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => {
                setQ("");
                setQuery("");
                setTopic("all");
                setYear("all");
                setOpenAccess(false);
                setSourceFilter("all");
              }}
            >
              {ar ? "إعادة ضبط جميع الفلاتر" : "Reset all filters"}
            </Button>
          </div>
        )}

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {filteredPapers.map((paper) => (
            <Card
              key={paper.id}
              className="flex flex-col justify-between border-border/70 transition-all hover:border-primary/50 hover:shadow-md"
            >
              <CardContent className="p-6">
                {/* Badges Header */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge variant="default" className="font-semibold px-2 py-0.5">
                      {paper.year}
                    </Badge>

                    {paper.openAccess && (
                      <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1 text-[11px]">
                        <BookOpen className="size-3" />
                        {ar ? "مفتوح مجاني" : "Open Access"}
                      </Badge>
                    )}

                    <Badge variant="outline" className="text-[11px]">
                      {paper.source}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                    <Award className="size-3.5 text-primary" />
                    <span>
                      {ar ? `${paper.citations} استشهاد` : `${paper.citations} citations`}
                    </span>
                  </div>
                </div>

                {/* Journal / Venue */}
                {paper.venue && (
                  <p className="mt-2 text-xs font-semibold text-primary truncate" title={paper.venue}>
                    {paper.venue}
                  </p>
                )}

                {/* Title */}
                <h3
                  dir="ltr"
                  className="mt-2 text-start font-display text-base font-bold leading-snug text-foreground hover:text-primary transition-colors cursor-pointer"
                  onClick={() => setSelectedPaper(paper)}
                >
                  {paper.title}
                </h3>

                {/* Authors */}
                <p dir="ltr" className="mt-2 text-start text-xs text-muted-foreground line-clamp-1">
                  {paper.authors.length > 0 ? paper.authors.join(", ") : "Scholarly Consortium"}
                </p>

                {/* Abstract snippet */}
                {paper.abstract && (
                  <p dir="auto" className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                    {paper.abstract}
                  </p>
                )}
              </CardContent>

              {/* Action Buttons Footer */}
              <div className="border-t border-border/50 bg-secondary/20 p-4 pt-3">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {/* Google Scholar direct link */}
                  <a
                    href={paper.scholarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-1.5 text-xs border-primary/40 hover:bg-primary/10 hover:text-primary"
                      title={ar ? "فتح الورقة في Google Scholar" : "Open in Google Scholar"}
                    >
                      <GraduationCap className="size-3.5 text-primary" />
                      Scholar
                    </Button>
                  </a>

                  {/* Summary Modal trigger */}
                  <Button
                    variant="default"
                    size="sm"
                    className="gap-1.5 text-xs shadow-soft"
                    onClick={() => setSelectedPaper(paper)}
                  >
                    <Sparkles className="size-3.5" />
                    {ar ? "ملخص ذكي" : "Summary"}
                  </Button>

                  {/* Citation Generator modal trigger */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-xs"
                    onClick={() => setCitePaper(paper)}
                    title={ar ? "توليد استشهاد أكاديمي (APA, MLA, BibTeX)" : "Cite paper"}
                  >
                    <Quote className="size-3.5 text-muted-foreground" />
                    {ar ? "استشهاد" : "Cite"}
                  </Button>

                  {/* Original / PDF Link */}
                  {paper.pdfUrl ? (
                    <a
                      href={paper.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full gap-1.5 text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300"
                      >
                        <FileDown className="size-3.5" />
                        PDF
                      </Button>
                    </a>
                  ) : (
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button variant="outline" size="sm" className="w-full gap-1 text-xs">
                        <ExternalLink className="size-3.5" />
                        {ar ? "المصدر" : "Source"}
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination Controls */}
        {data && filteredPapers.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6">
            <p className="text-xs text-muted-foreground">
              {ar
                ? `صفحة ${page} · تعرض 24 ورقة علمية من أصل ${data.total.toLocaleString("ar-EG")}`
                : `Page ${page} · Showing 24 papers of ${data.total.toLocaleString("en-US")}`}
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => {
                  setPage(page - 1);
                  window.scrollTo({ top: 200, behavior: "smooth" });
                }}
              >
                {ar ? "الصفحة السابقة" : "Previous"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                disabled={page >= 30 || filteredPapers.length < 8}
                onClick={() => {
                  setPage(page + 1);
                  window.scrollTo({ top: 200, behavior: "smooth" });
                }}
              >
                {ar ? "الصفحة التالية" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Detail & AI Summary Dialog */}
      <Dialog open={!!selectedPaper} onOpenChange={(open) => !open && setSelectedPaper(null)}>
        <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-3xl">
          {selectedPaper && <PaperDetailModal paper={selectedPaper} ar={ar} onCite={() => setCitePaper(selectedPaper)} />}
        </DialogContent>
      </Dialog>

      {/* Citation Generator Dialog */}
      <Dialog open={!!citePaper} onOpenChange={(open) => !open && setCitePaper(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
          {citePaper && <CitationModal paper={citePaper} ar={ar} />}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}

// Paper Detail & Smart Summary Subcomponent
function PaperDetailModal({ paper, ar, onCite }: { paper: LivePaper; ar: boolean; onCite: () => void }) {
  const summarize = useServerFn(summarizePaper);

  const { data, isLoading, error } = useQuery({
    queryKey: ["paper-summary", paper.id],
    queryFn: () => summarize({ data: { id: paper.id, title: paper.title, abstract: paper.abstract } }),
    staleTime: Infinity,
    retry: false,
  });

  return (
    <>
      <DialogHeader>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="default">{paper.year}</Badge>
          {paper.venue && <Badge variant="secondary">{paper.venue}</Badge>}
          {paper.openAccess && <Badge className="bg-emerald-600 text-white">{ar ? "مفتوح مجاني" : "Open Access"}</Badge>}
        </div>

        <DialogTitle dir="ltr" className="text-start font-display text-lg sm:text-xl font-bold leading-tight">
          {paper.title}
        </DialogTitle>

        <DialogDescription dir="ltr" className="text-start text-xs text-muted-foreground mt-1">
          {paper.authors.join(", ") || "Authors unlisted"} · {paper.date}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 pt-2 text-sm">
        {/* Loading summary state */}
        {isLoading && (
          <div className="flex items-center gap-2.5 rounded-lg border border-primary/20 bg-primary/5 p-4 text-muted-foreground">
            <Loader2 className="size-5 animate-spin text-primary" />
            <span>{ar ? "جارٍ إعداد التحليل الزراعي والملخص التنفيذي..." : "Generating field analysis and summary..."}</span>
          </div>
        )}

        {error && (
          <p className="text-xs text-destructive">
            {ar ? "تعذر إعداد الملخص الذكي للبحث حالياً." : "Could not generate summary."}
          </p>
        )}

        {data && (
          <div className="space-y-3">
            {/* Core Thesis Card */}
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
              <h4 className="flex items-center gap-1.5 font-semibold text-foreground text-sm">
                <Sparkles className="size-4 text-primary" />
                {ar ? "فكرة البحث الأساسية" : "Core Thesis"}
              </h4>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-foreground/90">{data.idea}</p>
            </div>

            {/* Summary */}
            <div className="rounded-xl border border-border/80 bg-card p-4">
              <h4 className="flex items-center gap-1.5 font-semibold text-foreground text-sm">
                <FileText className="size-4 text-primary" />
                {ar ? "الملخص التنفيذي للمهندس الزراعي" : "Executive Summary"}
              </h4>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">{data.summary}</p>
            </div>

            {/* Key Findings */}
            <div className="rounded-xl border border-border/80 bg-card p-4">
              <h4 className="flex items-center gap-1.5 font-semibold text-foreground text-sm">
                <Award className="size-4 text-emerald-600" />
                {ar ? "أهم النتائج التطبيقية" : "Key Practical Findings"}
              </h4>
              <ul className="mt-2 list-disc space-y-1.5 ps-5 text-xs sm:text-sm text-muted-foreground">
                {data.findings.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            {/* Field Applications */}
            {data.fieldApplications && data.fieldApplications.length > 0 && (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 p-4">
                <h4 className="flex items-center gap-1.5 font-semibold text-emerald-800 dark:text-emerald-300 text-sm">
                  <Check className="size-4 text-emerald-600" />
                  {ar ? "التطبيق الميداني في المزرعة والمشروع" : "Field Application"}
                </h4>
                <ul className="mt-2 list-disc space-y-1 ps-5 text-xs text-muted-foreground">
                  {data.fieldApplications.map((app, i) => (
                    <li key={i}>{app}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Original Abstract */}
        {paper.abstract && (
          <details className="rounded-lg border border-border/60 bg-secondary/30 p-3 text-xs">
            <summary className="cursor-pointer font-medium text-foreground">
              {ar ? "عرض الملخص الأصلي المنشور (Abstract)" : "View Original Abstract"}
            </summary>
            <p dir="auto" className="mt-2 leading-relaxed text-muted-foreground">
              {paper.abstract}
            </p>
          </details>
        )}

        {/* Action Row */}
        <div className="grid gap-2 sm:grid-cols-3 pt-2">
          {/* Google Scholar Link */}
          <a href={paper.scholarUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="w-full gap-2 border-primary/40 hover:bg-primary/10">
              <GraduationCap className="size-4 text-primary" />
              Google Scholar
            </Button>
          </a>

          {/* Cite button */}
          <Button variant="outline" className="w-full gap-2" onClick={onCite}>
            <Quote className="size-4 text-muted-foreground" />
            {ar ? "توليد استشهاد" : "Cite Paper"}
          </Button>

          {/* Full Paper / PDF */}
          <a href={paper.pdfUrl || paper.url} target="_blank" rel="noopener noreferrer">
            <Button className="w-full gap-2">
              {paper.pdfUrl ? (
                <>
                  <Download className="size-4" /> {ar ? "تحميل PDF" : "Download PDF"}
                </>
              ) : (
                <>
                  <ExternalLink className="size-4" /> {ar ? "المصدر الأصلي" : "Original Link"}
                </>
              )}
            </Button>
          </a>
        </div>
      </div>
    </>
  );
}

// Citation Modal Subcomponent
function CitationModal({ paper, ar }: { paper: LivePaper; ar: boolean }) {
  const [copiedStyle, setCopiedStyle] = useState<string | null>(null);

  const copyText = (style: CitationStyle) => {
    const text = formatCitation(paper, style);
    navigator.clipboard.writeText(text);
    setCopiedStyle(style);
    toast.success(ar ? `تم نسخ الاستشهاد بصيغة ${style.toUpperCase()}` : `Copied ${style.toUpperCase()} citation!`);
    setTimeout(() => setCopiedStyle(null), 2500);
  };

  const downloadBib = () => {
    const bib = formatCitation(paper, "bibtex");
    const blob = new Blob([bib], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `citation-${paper.year}.bib`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(ar ? "تم تنزيل ملف BibTeX" : "Downloaded BibTeX file");
  };

  const STYLES: { id: CitationStyle; name: string }[] = [
    { id: "apa", name: "APA 7th" },
    { id: "mla", name: "MLA 9th" },
    { id: "harvard", name: "Harvard" },
    { id: "chicago", name: "Chicago" },
    { id: "bibtex", name: "BibTeX" },
    { id: "ris", name: "RIS" },
  ];

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 font-display text-lg">
          <Quote className="size-5 text-primary" />
          {ar ? "توليد الاستشهاد الأكاديمي للبحث" : "Cite this research"}
        </DialogTitle>
        <DialogDescription dir="ltr" className="text-xs truncate">
          {paper.title}
        </DialogDescription>
      </DialogHeader>

      <div className="mt-3">
        <Tabs defaultValue="apa" className="w-full">
          <TabsList className="grid grid-cols-3 sm:grid-cols-6 h-auto p-1">
            {STYLES.map((s) => (
              <TabsTrigger key={s.id} value={s.id} className="text-xs py-1.5">
                {s.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {STYLES.map((s) => {
            const formatted = formatCitation(paper, s.id);
            const isCopied = copiedStyle === s.id;

            return (
              <TabsContent key={s.id} value={s.id} className="mt-3 space-y-3">
                <div className="relative rounded-lg border border-border bg-secondary/40 p-4 font-mono text-xs text-foreground/90 whitespace-pre-wrap select-all">
                  {formatted}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-[11px] text-muted-foreground">
                    {ar ? `صيغة ${s.name} المعتمدة عالمياً` : `Standard ${s.name} format`}
                  </div>

                  <div className="flex gap-2">
                    {s.id === "bibtex" && (
                      <Button variant="outline" size="sm" onClick={downloadBib} className="gap-1.5 text-xs">
                        <FileDown className="size-3.5" />
                        {ar ? "تنزيل .bib" : "Download .bib"}
                      </Button>
                    )}

                    <Button
                      size="sm"
                      onClick={() => copyText(s.id)}
                      className={`gap-1.5 text-xs ${isCopied ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
                    >
                      {isCopied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                      {isCopied ? (ar ? "تم النسخ!" : "Copied!") : ar ? "نسخ الاستشهاد" : "Copy"}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Google Scholar Quick Search helper */}
        <div className="mt-5 rounded-lg border border-primary/20 bg-primary/5 p-3 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            {ar ? "هل تريد فتح الورقة والاستشهادات على Google Scholar؟" : "Open in Google Scholar for more citations?"}
          </span>
          <a href={paper.scholarUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm" className="gap-1 text-xs text-primary font-semibold hover:bg-primary/10">
              <GraduationCap className="size-4" />
              Google Scholar
            </Button>
          </a>
        </div>
      </div>
    </>
  );
}
