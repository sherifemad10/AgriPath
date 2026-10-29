import type { LivePaper } from "@/types/research";

export type CitationStyle = "apa" | "mla" | "harvard" | "chicago" | "bibtex" | "ris";

export function formatCitation(paper: LivePaper, style: CitationStyle): string {
  const authorStr = paper.authors.length > 0
    ? paper.authors.length > 3
      ? `${paper.authors.slice(0, 3).join(", ")} et al.`
      : paper.authors.join(", ")
    : "Anonymous";

  const cleanTitle = paper.title.trim().replace(/[.]+$/, "");
  const venue = paper.venue || "Scholarly Publication";
  const year = paper.year;
  const link = paper.doi ? `https://doi.org/${paper.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "")}` : paper.url;

  switch (style) {
    case "apa":
      return `${authorStr} (${year}). ${cleanTitle}. ${venue}. ${link}`;

    case "mla":
      return `${authorStr}. "${cleanTitle}." ${venue}, ${year}, ${link}.`;

    case "chicago":
      return `${authorStr}. "${cleanTitle}." ${venue} (${year}). ${link}.`;

    case "harvard":
      return `${authorStr}, ${year}. ${cleanTitle}. ${venue}. Available at: <${link}>.`;

    case "bibtex": {
      const citeKey = (paper.authors[0]?.split(" ").pop() || "paper")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "") + year;
      return `@article{${citeKey},
  author    = {${paper.authors.join(" and ") || "Anonymous"}},
  title     = {${cleanTitle}},
  journal   = {${venue}},
  year      = {${year}},
  url       = {${link}}${paper.doi ? `,\n  doi       = {${paper.doi}}` : ""}
}`;
    }

    case "ris":
      return `TY  - JOUR
TI  - ${cleanTitle}
${paper.authors.map((a) => `AU  - ${a}`).join("\n")}
JO  - ${venue}
PY  - ${year}
UR  - ${link}
${paper.doi ? `DO  - ${paper.doi}\n` : ""}ER  -`;

    default:
      return `${authorStr} (${year}). ${cleanTitle}. ${venue}. ${link}`;
  }
}
