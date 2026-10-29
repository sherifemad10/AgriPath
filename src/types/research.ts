export type LivePaper = {
  id: string;
  title: string;
  date: string;
  year: number;
  authors: string[];
  venue: string | null;
  citations: number;
  abstract: string;
  url: string;
  scholarUrl: string;
  citationsUrl?: string;
  relatedUrl?: string;
  pdfUrl?: string | null;
  doi: string | null;
  openAccess: boolean;
  source: string;
  topic: string;
  publisher?: string | null;
};

export type ResearchQuery = {
  q?: string;
  topic?: string;
  year?: string;
  openAccess?: boolean;
  sort?: "date" | "citations";
  page?: number;
};

export type PaperSummary = {
  arabicTitle?: string;
  idea: string;
  summary: string;
  findings: string[];
  fieldApplications?: string[];
};

export type ResearchTopicItem = {
  id: string;
  q: string;
  ar: string;
  en: string;
  iconName?: string;
  keywords: string[];
};

export const RESEARCH_TOPICS: ResearchTopicItem[] = [
  {
    id: "all",
    q: "agriculture agronomy farming crops",
    ar: "جميع المجالات الزراعية",
    en: "All Fields",
    keywords: ["agriculture", "agronomy", "farming", "crops", "زراعة", "محاصيل"],
  },
  {
    id: "digital-agriculture",
    q: "precision agriculture remote sensing NDVI UAV drone satellite AI smart farming",
    ar: "الزراعة الذكية والرقمية",
    en: "Smart & Precision Ag",
    keywords: ["precision agriculture", "remote sensing", "NDVI", "drones", "ذكاء اصطناعي", "استشعار عن بعد"],
  },
  {
    id: "soil-water",
    q: "soil salinity soil fertility soil health reclamation water quality salinity management",
    ar: "الأراضي وإدارة المياه",
    en: "Soil & Water Management",
    keywords: ["soil salinity", "soil health", "reclamation", "ملوحة التربة", "خصوبة التربة"],
  },
  {
    id: "plant-protection",
    q: "integrated pest management plant pathology crop disease fungal biocontrol pesticide resistance",
    ar: "وقاية النبات ومكافحة الآفات",
    en: "Plant Pathology & IPM",
    keywords: ["pest management", "biocontrol", "fungal", "مكافحة حيوية", "أمراض نبات"],
  },
  {
    id: "hydroponics",
    q: "hydroponics soilless culture nutrient film technique aquaponics vertical farming aeroponics",
    ar: "الزراعة المائية وبدون تربة",
    en: "Hydroponics & Soilless",
    keywords: ["hydroponics", "soilless", "aquaponics", "هيدروبونيك", "زراعة مائية"],
  },
  {
    id: "crop-production",
    q: "crop production agronomy grain yield wheat maize barley rice drought tolerance",
    ar: "إنتاج المحاصيل الحقلية",
    en: "Field Crops & Agronomy",
    keywords: ["wheat", "maize", "cereal", "قمح", "محاصيل حقلية", "إنتاجية"],
  },
  {
    id: "irrigation",
    q: "drip irrigation micro irrigation water use efficiency evapotranspiration deficit irrigation",
    ar: "نظم الري وترشيد المياه",
    en: "Modern Irrigation Systems",
    keywords: ["drip irrigation", "water efficiency", "ري بالتنقيط", "ترشيد المياه"],
  },
  {
    id: "greenhouses",
    q: "greenhouse protected cultivation climate control cooling microclimate horticulture",
    ar: "الزراعة المحمية والصوبات",
    en: "Greenhouses & Controlled Ag",
    keywords: ["greenhouse", "climate control", "صوبات", "زراعة محمية"],
  },
  {
    id: "biotech",
    q: "agricultural biotechnology CRISPR gene editing plant genetics molecular breeding GMO",
    ar: "التقنية الحيوية والوراثة",
    en: "Ag Biotech & Genetics",
    keywords: ["biotechnology", "CRISPR", "breeding", "تقنية حيوية", "هندسة وراثية"],
  },
  {
    id: "food-safety",
    q: "food safety HACCP postharvest quality shelf life cold chain food security mycotoxin",
    ar: "سلامة الغذاء ومعاملات ما بعد الحصاد",
    en: "Food Safety & Postharvest",
    keywords: ["food safety", "postharvest", "shelf life", "سلامة الغذاء", "ما بعد الحصاد"],
  },
  {
    id: "ag-engineering",
    q: "agricultural mechanization farm robotics solar pump tractor autonomous weeding",
    ar: "الميكنة والهندسة الزراعية",
    en: "Ag Engineering & Robotics",
    keywords: ["mechanization", "robotics", "solar pumping", "ميكنة زراعية", "طاقة شمسية"],
  },
  {
    id: "agribusiness",
    q: "agribusiness agricultural economics farm economics supply chain agricultural market",
    ar: "الاقتصاد والأعمال الزراعية",
    en: "Agribusiness & Economics",
    keywords: ["economics", "market", "supply chain", "اقتصاد زراعي", "سلاسل الإمداد"],
  },
];
