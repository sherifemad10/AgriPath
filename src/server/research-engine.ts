import { RESEARCH_TOPICS, type LivePaper, type ResearchQuery } from "@/types/research";
import { sanitizeText } from "./security";

export { RESEARCH_TOPICS };
export type { LivePaper, ResearchQuery };

const cache = new Map<string, { at: number; value: { papers: LivePaper[]; total: number; fetchedAt: string } }>();
const TTL = 10 * 60 * 1000; // 10 minutes cache

// Agricultural Arabic to English expansion dictionary
const AGRI_KEYWORD_MAP: Record<string, string> = {
  قمح: "wheat triticum",
  ذرة: "maize corn zea mays",
  أرز: "rice oryza sativa",
  ارز: "rice oryza sativa",
  طماطم: "tomato solanum lycopersicum",
  بطاطس: "potato solanum tuberosum",
  ري: "irrigation water use efficiency",
  "ري بالتنقيط": "drip irrigation microirrigation",
  تربة: "soil salinity soil fertility soil health",
  ملوحة: "salinity salt stress halophyte",
  تسميد: "fertilizer nutrient management nitrogen",
  سماد: "fertilizer soil amendment",
  صوب: "greenhouse protected cultivation",
  صوبات: "greenhouse protected cultivation microclimate",
  هيدروبونيك: "hydroponics soilless culture",
  "زراعة مائية": "hydroponics aquaponics soilless",
  وقاية: "plant protection integrated pest management",
  آفات: "pest management insect resistance biocontrol",
  حشرات: "insect pest agricultural entomology",
  فطريات: "fungal disease pathogen phytopathology",
  "أمراض النبات": "plant pathology crop disease resistance",
  "استشعار عن بعد": "remote sensing NDVI satellite crop monitoring",
  استشعار: "remote sensing multispectral UAV",
  درون: "drone UAV agricultural monitoring precision",
  "ذكاء اصطناعي": "artificial intelligence precision agriculture machine learning",
  "تقنية حيوية": "agricultural biotechnology CRISPR gene editing molecular breeding",
  "سلامة الغذاء": "food safety HACCP postharvest quality",
  "ما بعد الحصاد": "postharvest shelf life cold storage fruit quality",
  ميكنة: "agricultural mechanization farm machinery tractor",
  "طاقة شمسية": "solar powered irrigation pump agrivoltaics",
  نخيل: "date palm phoenix dactylifera",
  زيتون: "olive olea europaea oil quality",
  موالح: "citrus fruit production",
  أعلاف: "forage crops alfalfa silage",
  هندسة: "agricultural engineering mechanization",
};

export function windowYears() {
  const to = new Date();
  const currentYear = to.getFullYear();
  // Strictly the last 3 years: e.g. 2026, 2025, 2024
  const minYear = currentYear - 2;
  const maxYear = currentYear;
  const from = new Date(`${minYear}-01-01`);
  return { from, to, minYear, maxYear, yearsList: [String(maxYear), String(maxYear - 1), String(minYear)] };
}

function expandQuery(raw?: string): string {
  if (!raw || !raw.trim()) return "";
  const cleaned = raw.trim();
  let expanded = cleaned;
  for (const [arWord, enTerms] of Object.entries(AGRI_KEYWORD_MAP)) {
    if (cleaned.includes(arWord)) {
      expanded = `${expanded} ${enTerms}`;
      break;
    }
  }
  return expanded;
}

function rebuildAbstract(idx: Record<string, number[]> | null | undefined): string {
  if (!idx) return "";
  const words: string[] = [];
  for (const [w, pos] of Object.entries(idx)) {
    for (const p of pos) words[p] = w;
  }
  return words.filter(Boolean).join(" ");
}

export function scholarUrl(title: string, doi: string | null, minYear: number) {
  const q = doi ? `"${doi}"` : `"${title.slice(0, 100)}"`;
  return `https://scholar.google.com/scholar?q=${encodeURIComponent(q)}&hl=en&as_ylo=${minYear}`;
}

export function scholarCitationsUrl(title: string) {
  return `https://scholar.google.com/scholar?q=${encodeURIComponent(`"${title.slice(0, 100)}"`)}&hl=en`;
}

export function scholarRelatedUrl(title: string) {
  return `https://scholar.google.com/scholar?q=related:${encodeURIComponent(title.slice(0, 80))}:scholar.google.com/&hl=en`;
}

function doiUrl(doi: string | null) {
  if (!doi) return null;
  const clean = doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "");
  return `https://doi.org/${clean}`;
}

function keyOf(p: LivePaper) {
  return (p.doi || p.title).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

async function fetchJson(url: string, headers?: Record<string, string>) {
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "AgriPath-ResearchEngine/2.0 (https://agripath.local; mailto:research@agripath.local)",
      ...(headers ?? {}),
    },
    signal: AbortSignal.timeout(12000),
  });
  if (!res.ok) throw new Error(`Upstream ${res.status}`);
  return res.json();
}

// 1. OpenAlex Provider (Global open scholarly index, millions of agricultural papers)
async function fromOpenAlex(q: ResearchQuery, minYear: number, maxYear: number, page: number): Promise<{ papers: LivePaper[]; total: number }> {
  const topic = RESEARCH_TOPICS.find((t) => t.id === q.topic) ?? RESEARCH_TOPICS[0]!;
  const userSearch = expandQuery(q.q);
  const topicSearch = topic.id === "all" ? "agriculture agronomy" : topic.q;
  const search = [userSearch, topicSearch].filter(Boolean).join(" ");

  const fromDate = q.year && q.year !== "all" ? `${q.year}-01-01` : `${minYear}-01-01`;
  const toDate = q.year && q.year !== "all" ? `${q.year}-12-31` : `${maxYear}-12-31`;

  const filter = [
    `from_publication_date:${fromDate}`,
    `to_publication_date:${toDate}`,
    "type:article",
    q.openAccess ? "is_oa:true" : "",
  ]
    .filter(Boolean)
    .join(",");

  const params = new URLSearchParams({
    filter,
    sort: q.sort === "citations" ? "cited_by_count:desc" : "publication_date:desc",
    "per-page": "15",
    page: String(page),
    mailto: "research@agripath.local",
  });
  if (search) params.set("search", search.slice(0, 180));

  try {
    const json = (await fetchJson(`https://api.openalex.org/works?${params}`)) as {
      results?: Record<string, unknown>[];
      meta?: { count?: number };
    };

    const papers: LivePaper[] = (json.results ?? []).map((w) => {
      const title = String(w["display_name"] ?? w["title"] ?? "").trim();
      const ids = (w["ids"] as Record<string, string> | undefined) ?? {};
      const doi = typeof ids["doi"] === "string" ? ids["doi"] : typeof w["doi"] === "string" ? String(w["doi"]) : null;
      const loc = w["primary_location"] as {
        source?: { display_name?: string; publisher_name?: string };
        landing_page_url?: string;
        pdf_url?: string;
        is_oa?: boolean;
      } | undefined;
      const authorships = (w["authorships"] as { author?: { display_name?: string } }[] | undefined) ?? [];
      const year = Number(w["publication_year"] ?? minYear);
      const date = String(w["publication_date"] ?? `${year}-01-01`);
      const oa = Boolean((w["open_access"] as { is_oa?: boolean } | undefined)?.is_oa || loc?.is_oa);
      const pdfUrl = loc?.pdf_url ?? ((w["open_access"] as { oa_url?: string } | undefined)?.oa_url || null);
      const url = doiUrl(doi) ?? loc?.landing_page_url ?? String(w["id"] ?? "");
      const id = String(w["id"] ?? title).split("/").pop() || title;

      return {
        id: `oa-${id}`,
        title,
        date,
        year,
        authors: authorships
          .slice(0, 6)
          .map((a) => a.author?.display_name)
          .filter((n): n is string => Boolean(n)),
        venue: loc?.source?.display_name ?? null,
        citations: Number(w["cited_by_count"] ?? 0),
        abstract: rebuildAbstract(w["abstract_inverted_index"] as Record<string, number[]> | undefined).slice(0, 4000),
        url,
        scholarUrl: scholarUrl(title, doi, minYear),
        citationsUrl: scholarCitationsUrl(title),
        relatedUrl: scholarRelatedUrl(title),
        pdfUrl: pdfUrl || null,
        doi,
        openAccess: oa,
        source: "OpenAlex",
        topic: topic.id,
        publisher: loc?.source?.publisher_name ?? null,
      };
    });

    return { papers, total: json.meta?.count ?? papers.length };
  } catch {
    return { papers: [], total: 0 };
  }
}

// 2. Semantic Scholar Provider (AI Citation Index)
async function fromSemanticScholar(q: ResearchQuery, minYear: number, maxYear: number, page: number): Promise<{ papers: LivePaper[]; total: number }> {
  const topic = RESEARCH_TOPICS.find((t) => t.id === q.topic) ?? RESEARCH_TOPICS[0]!;
  const userSearch = expandQuery(q.q);
  const topicSearch = topic.id === "all" ? "agriculture agronomy" : topic.q.split(" ").slice(0, 4).join(" ");
  const query = [userSearch, topicSearch].filter(Boolean).join(" ");
  const offset = (page - 1) * 15;

  const targetYear = q.year && q.year !== "all" ? q.year : `${minYear}-${maxYear}`;
  const params = new URLSearchParams({
    query: query.slice(0, 160),
    offset: String(offset),
    limit: "15",
    year: targetYear,
    fields: "title,year,authors,abstract,venue,citationCount,url,externalIds,publicationDate,isOpenAccess,openAccessPdf,publicationVenue",
  });

  const headers: Record<string, string> = {};
  const key = process.env["SEMANTIC_SCHOLAR_API_KEY"];
  if (key) headers["x-api-key"] = key;

  try {
    const json = (await fetchJson(`https://api.semanticscholar.org/graph/v1/paper/search?${params}`, headers)) as {
      total?: number;
      data?: Record<string, unknown>[];
    };

    const papers: LivePaper[] = (json.data ?? []).map((w) => {
      const title = String(w["title"] ?? "").trim();
      const ext = (w["externalIds"] as Record<string, string> | undefined) ?? {};
      const doi = ext["DOI"] ? `https://doi.org/${ext["DOI"]}` : null;
      const year = Number(w["year"] ?? minYear);
      const authors = ((w["authors"] as { name?: string }[] | undefined) ?? [])
        .slice(0, 6)
        .map((a) => a.name)
        .filter((n): n is string => Boolean(n));
      const venueObj = w["publicationVenue"] as { name?: string } | undefined;
      const oaPdf = w["openAccessPdf"] as { url?: string } | undefined;

      return {
        id: `ss-${String(w["paperId"] ?? title)}`,
        title,
        date: String(w["publicationDate"] ?? `${year}-01-01`),
        year,
        authors,
        venue: venueObj?.name ?? (typeof w["venue"] === "string" ? String(w["venue"]) : null),
        citations: Number(w["citationCount"] ?? 0),
        abstract: String(w["abstract"] ?? "").slice(0, 4000),
        url: doiUrl(doi) ?? String(w["url"] ?? ""),
        scholarUrl: scholarUrl(title, doi, minYear),
        citationsUrl: scholarCitationsUrl(title),
        relatedUrl: scholarRelatedUrl(title),
        pdfUrl: oaPdf?.url ?? null,
        doi,
        openAccess: Boolean(w["isOpenAccess"]),
        source: "Semantic Scholar",
        topic: topic.id,
      };
    });

    return { papers, total: json.total ?? papers.length };
  } catch {
    return { papers: [], total: 0 };
  }
}

// 3. Crossref Provider (Official International DOI Registry - Elsevier, Springer Nature, Wiley, MDPI)
async function fromCrossref(q: ResearchQuery, minYear: number, maxYear: number, page: number): Promise<{ papers: LivePaper[]; total: number }> {
  const topic = RESEARCH_TOPICS.find((t) => t.id === q.topic) ?? RESEARCH_TOPICS[0]!;
  const userSearch = expandQuery(q.q);
  const topicSearch = topic.id === "all" ? "agriculture agronomy crop" : topic.q.split(" ").slice(0, 3).join(" ");
  const query = [userSearch, topicSearch].filter(Boolean).join(" ");

  const filterYear = q.year && q.year !== "all" ? q.year : String(minYear);
  const rows = 15;
  const offset = (page - 1) * rows;

  const params = new URLSearchParams({
    query: query.slice(0, 140),
    filter: `from-pub-date:${filterYear}-01-01,type:journal-article`,
    sort: q.sort === "citations" ? "is-referenced-by-count" : "published",
    order: "desc",
    rows: String(rows),
    offset: String(offset),
    mailto: "research@agripath.local",
  });

  try {
    const json = (await fetchJson(`https://api.crossref.org/works?${params}`)) as {
      message?: {
        "total-results"?: number;
        items?: Record<string, unknown>[];
      };
    };

    const items = json.message?.items ?? [];
    const papers: LivePaper[] = items.map((w) => {
      const titles = (w["title"] as string[] | undefined) ?? [];
      const title = titles[0] ?? "";
      const doi = typeof w["DOI"] === "string" ? w["DOI"] : null;
      const authors = ((w["author"] as { given?: string; family?: string }[] | undefined) ?? [])
        .slice(0, 6)
        .map((a) => [a.given, a.family].filter(Boolean).join(" "))
        .filter(Boolean);
      const container = (w["container-title"] as string[] | undefined) ?? [];
      const venue = container[0] ?? null;

      // Extract year
      const pub = (w["published"] ?? w["created"]) as { "date-parts"?: number[][] } | undefined;
      const dateParts = pub?.["date-parts"]?.[0] ?? [minYear, 1, 1];
      const year = dateParts[0] ?? minYear;
      const month = String(dateParts[1] ?? 1).padStart(2, "0");
      const day = String(dateParts[2] ?? 1).padStart(2, "0");
      const date = `${year}-${month}-${day}`;

      const citations = Number(w["is-referenced-by-count"] ?? 0);
      const link = (w["link"] as { URL?: string; "content-type"?: string }[] | undefined) ?? [];
      const pdfItem = link.find((l) => l["content-type"]?.includes("pdf"));
      const pdfUrl = pdfItem?.URL ?? null;

      const cleanAbstract = String(w["abstract"] ?? "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      return {
        id: `cr-${doi || encodeURIComponent(title.slice(0, 40))}`,
        title,
        date,
        year,
        authors,
        venue,
        citations,
        abstract: cleanAbstract.slice(0, 4000),
        url: doiUrl(doi) ?? (typeof w["URL"] === "string" ? w["URL"] : scholarUrl(title, doi, minYear)),
        scholarUrl: scholarUrl(title, doi, minYear),
        citationsUrl: scholarCitationsUrl(title),
        relatedUrl: scholarRelatedUrl(title),
        pdfUrl,
        doi,
        openAccess: Boolean(pdfUrl),
        source: "CrossRef",
        topic: topic.id,
        publisher: typeof w["publisher"] === "string" ? w["publisher"] : null,
      };
    });

    return { papers, total: json.message?.["total-results"] ?? papers.length };
  } catch {
    return { papers: [], total: 0 };
  }
}

// 4. Google Scholar Provider (SerpApi engine when API key is provided)
async function fromGoogleScholar(q: ResearchQuery, minYear: number) {
  const key = process.env["SERPAPI_KEY"];
  const query = q.q?.trim();
  if (!key || !query) return [] as LivePaper[];

  const topic = RESEARCH_TOPICS.find((t) => t.id === q.topic) ?? RESEARCH_TOPICS[0]!;
  const params = new URLSearchParams({
    engine: "google_scholar",
    q: `${query} ${topic.id === "all" ? "agriculture" : topic.q}`.trim(),
    as_ylo: String(minYear),
    hl: "en",
    num: "15",
    api_key: key,
  });

  try {
    const json = (await fetchJson(`https://serpapi.com/search.json?${params}`)) as {
      organic_results?: Record<string, unknown>[];
    };
    return (json.organic_results ?? []).map((r, i) => {
      const title = String(r["title"] ?? "");
      const pub = (r["publication_info"] as { summary?: string; authors?: { name?: string }[] } | undefined) ?? {};
      const yearMatch = String(pub.summary ?? "").match(/\b(20\d{2})\b/);
      const year = yearMatch ? Number(yearMatch[1]) : minYear;
      const link = String(r["link"] ?? "");
      return {
        id: `gs-${String(r["result_id"] ?? i)}`,
        title,
        date: `${year}-01-01`,
        year,
        authors: (pub.authors ?? []).map((a) => a.name).filter((n): n is string => Boolean(n)).slice(0, 6),
        venue: pub.summary ?? "Google Scholar",
        citations: Number((r["inline_links"] as { cited_by?: { total?: number } } | undefined)?.cited_by?.total ?? 0),
        abstract: String(r["snippet"] ?? "").slice(0, 4000),
        url: link || scholarUrl(title, null, minYear),
        scholarUrl: scholarUrl(title, null, minYear),
        citationsUrl: scholarCitationsUrl(title),
        relatedUrl: scholarRelatedUrl(title),
        doi: null,
        openAccess: false,
        source: "Google Scholar",
        topic: topic.id,
      } satisfies LivePaper;
    });
  } catch {
    return [];
  }
}

function mergePapers(groups: LivePaper[][], sort: "date" | "citations", minYear: number) {
  const map = new Map<string, LivePaper>();
  for (const list of groups) {
    for (const p of list) {
      if (!p.title || p.title.length < 5) continue;
      // Filter out papers older than last 3 years
      if (p.year < minYear) continue;

      const k = keyOf(p);
      const prev = map.get(k);
      if (!prev) {
        map.set(k, p);
      } else {
        // Merge best data: highest citations, richest abstract, valid PDF URL
        map.set(k, {
          ...prev,
          citations: Math.max(prev.citations, p.citations),
          abstract: prev.abstract.length >= p.abstract.length ? prev.abstract : p.abstract,
          pdfUrl: prev.pdfUrl || p.pdfUrl,
          doi: prev.doi || p.doi,
          venue: prev.venue || p.venue,
          url: prev.url || p.url,
          openAccess: prev.openAccess || p.openAccess,
        });
      }
    }
  }

  const papers = [...map.values()];
  papers.sort((a, b) => {
    if (sort === "citations") return b.citations - a.citations;
    // Default: Newest first (by ISO date, then by year)
    return b.date.localeCompare(a.date) || b.year - a.year;
  });
  return papers;
}

export async function searchResearch(raw: ResearchQuery) {
  const { minYear, maxYear } = windowYears();
  const page = Math.min(30, Math.max(1, raw.page ?? 1));
  const year = raw.year && raw.year !== "all" ? raw.year : undefined;

  const query: ResearchQuery = {
    q: raw.q ? sanitizeText(raw.q, 160) : undefined,
    topic: raw.topic && RESEARCH_TOPICS.some((t) => t.id === raw.topic) ? raw.topic : "all",
    year: year && Number(year) >= minYear && Number(year) <= maxYear ? year : "all",
    openAccess: Boolean(raw.openAccess),
    sort: raw.sort === "citations" ? "citations" : "date",
    page,
  };

  const cacheKey = JSON.stringify(query);
  const hit = cache.get(cacheKey);
  if (hit && Date.now() - hit.at < TTL) return hit.value;

  const oaYearMin = year ? Number(year) : minYear;
  const oaYearMax = year ? Number(year) : maxYear;

  // Run global academic indexes in parallel
  const [oa, ss, cr, gs] = await Promise.all([
    fromOpenAlex(query, oaYearMin, oaYearMax, page).catch(() => ({ papers: [] as LivePaper[], total: 0 })),
    fromSemanticScholar(query, oaYearMin, oaYearMax, page).catch(() => ({ papers: [] as LivePaper[], total: 0 })),
    fromCrossref(query, oaYearMin, oaYearMax, page).catch(() => ({ papers: [] as LivePaper[], total: 0 })),
    fromGoogleScholar(query, oaYearMin).catch(() => [] as LivePaper[]),
  ]);

  let papers = mergePapers([oa.papers, ss.papers, cr.papers, gs], query.sort ?? "date", minYear);

  if (query.openAccess) {
    papers = papers.filter((p) => p.openAccess || Boolean(p.pdfUrl));
  }
  if (year) {
    papers = papers.filter((p) => String(p.year) === year);
  }

  const value = {
    papers: papers.slice(0, 24),
    total: Math.max(oa.total, ss.total, cr.total, papers.length),
    fetchedAt: new Date().toISOString(),
  };

  cache.set(cacheKey, { at: Date.now(), value });
  return value;
}

function sentences(text: string) {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 35);
}

export async function translateToArabic(text: string): Promise<string> {
  if (!text || !text.trim()) return "";
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ar&dt=t&q=${encodeURIComponent(text.slice(0, 3000))}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) return text;
    const data = (await res.json()) as [[string, ...unknown[]][]];
    if (Array.isArray(data) && Array.isArray(data[0])) {
      const translated = data[0].map((item) => item[0]).join("").trim();
      if (translated) return translated;
    }
  } catch {
    // fallback to original if offline
  }
  return text;
}

export async function extractiveSummary(title: string, abstract: string) {
  const parts = sentences(abstract);
  const ideaEn = parts.slice(0, 2).join(" ") || title;
  const summaryEn = parts.slice(0, 5).join(" ") || abstract.slice(0, 600) || title;
  const flagged = parts.filter((s) =>
    /result|increase|decrease|significan|found|showed|yield|efficiency|reduced|improved|conclude|demonstrate|observed|optimiz/i.test(s),
  );
  const rawFindings = (flagged.length ? flagged : parts.slice(-4)).slice(0, 4);

  // Translate all components concurrently to Arabic
  const [arTitle, arIdea, arSummary, ...arFindings] = await Promise.all([
    translateToArabic(title),
    translateToArabic(ideaEn),
    translateToArabic(summaryEn),
    ...rawFindings.map((f) => translateToArabic(f)),
  ]);

  return {
    arabicTitle: arTitle || title,
    idea: arIdea || title,
    summary: arSummary || summaryEn,
    findings:
      arFindings.filter(Boolean).length > 0
        ? arFindings.filter(Boolean)
        : [arSummary || "أظهرت الدراسة نتائج وتوصيات عملية لتحسين كفاءة الإنتاج وإدارة المحصول."],
    fieldApplications: [
      "تطبيق الممارسات والمعايير الموصى بها في الحقل لتحسين كفاءة استخدام الموارد والمحصول.",
      "مراعاة الجرعات ومعايير الجودة والظروف البيئية المحددة في نتائج البحث.",
    ],
  };
}

export async function aiSummary(title: string, abstract: string) {
  const openai = process.env["OPENAI_API_KEY"];
  const groq = process.env["GROQ_API_KEY"];
  const endpoint = groq ? "https://api.groq.com/openai/v1/chat/completions" : "https://api.openai.com/v1/chat/completions";
  const key = groq || openai;

  if (!key || !abstract || abstract.length < 50) return await extractiveSummary(title, abstract);

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(20000),
      body: JSON.stringify({
        model: groq ? "llama-3.3-70b-versatile" : process.env["OPENAI_MODEL"] || "gpt-4o-mini",
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are an expert agronomist research analyst. Return JSON with keys: arabicTitle (string: accurate Arabic translation of title), idea (string: 2 concise sentences explaining core thesis in Arabic), summary (string: 4-5 sentences explaining methodology and context in Arabic), findings (array of 3-4 strings detailing specific quantitative or practical findings in Arabic), fieldApplications (array of 2 strings with concrete instructions for farm managers in Arabic). Write in clean, modern formal Arabic.",
          },
          {
            role: "user",
            content: `لخص البحث العلمي التالي لمهندس زراعي تطبيقي باللغة العربية الفصحى:\nالعنوان: ${title}\n\nالملخص الأصلي:\n${abstract}`,
          },
        ],
      }),
    });

    if (!res.ok) return await extractiveSummary(title, abstract);
    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const raw = json.choices?.[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(raw) as {
      arabicTitle?: unknown;
      idea?: unknown;
      summary?: unknown;
      findings?: unknown;
      fieldApplications?: unknown;
    };

    return {
      arabicTitle: parsed.arabicTitle ? String(parsed.arabicTitle) : await translateToArabic(title),
      idea: String(parsed.idea || title),
      summary: String(parsed.summary || abstract.slice(0, 500)),
      findings: Array.isArray(parsed.findings) && parsed.findings.length ? parsed.findings.map(String) : [abstract.slice(0, 300)],
      fieldApplications: Array.isArray(parsed.fieldApplications) && parsed.fieldApplications.length
        ? parsed.fieldApplications.map(String)
        : [
            "تطبيق التوصيات في الحقل لترشيد الاستهلاك وتحسين المحصول.",
            "مراقبة مؤشرات التربة والإنتاج بناءً على معايير الدراسة.",
          ],
    };
  } catch {
    return await extractiveSummary(title, abstract);
  }
}
