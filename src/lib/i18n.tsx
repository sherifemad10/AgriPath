import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Lang, Loc } from "@/types";

const DICT = {
  brand: { ar: "أجريـبـاث", en: "AgriPath" },
  brandSub: { ar: "مرشدك المهني بالذكاء الاصطناعي", en: "AI Career Mentor" },
  nav_home: { ar: "الرئيسية", en: "Home" },
  nav_dashboard: { ar: "لوحتي", en: "Dashboard" },
  nav_specializations: { ar: "التخصصات", en: "Specializations" },
  nav_mentor: { ar: "المرشد الذكي", en: "AI Mentor" },
  nav_projects: { ar: "المشاريع", en: "Projects" },
  nav_notes: { ar: "ملاحظاتي", en: "Notes" },
  nav_resources: { ar: "المصادر", en: "Resources" },
  nav_research: { ar: "الأبحاث", en: "Research" },
  nav_live_research: { ar: "الأبحاث", en: "Research" },
  nav_readiness: { ar: "الجاهزية المهنية", en: "Career Readiness" },
  nav_profile: { ar: "الملف الشخصي", en: "Profile" },
  nav_settings: { ar: "الإعدادات", en: "Settings" },
  search: { ar: "ابحث في المنصة", en: "Search the platform" },
  searchHint: { ar: "اضغط Ctrl + K", en: "Press Ctrl + K" },
  signIn: { ar: "تسجيل الدخول", en: "Sign in" },
  signUp: { ar: "إنشاء حساب", en: "Create account" },
  signOut: { ar: "تسجيل الخروج", en: "Sign out" },
  exploreCta: { ar: "استكشف المسارات المهنية", en: "Explore Career Paths" },
  mentorCta: { ar: "تعرّف على مرشدك الذكي", en: "Meet Your AI Mentor" },
  heroTitle: {
    ar: "ازرع المعرفة اليوم، واحصد التميّز غدًا.",
    en: "Build Your Agricultural Career. One Skill at a Time.",
  },
  heroSub: {
    ar: "مرشدك المدعوم بالذكاء الاصطناعي لاكتشاف الوظائف الزراعية، اتباع خرائط طريق عملية، تعلّم مهارات السوق، والوصول إلى الجاهزية الوظيفية.",
    en: "Your AI-powered mentor for discovering agricultural careers, following practical roadmaps, learning industry skills, and becoming job-ready.",
  },
  difficulty: { ar: "المستوى", en: "Difficulty" },
  duration: { ar: "الوقت المتوقع", en: "Estimated time" },
  demand: { ar: "الطلب في السوق", en: "Industry demand" },
  hours: { ar: "ساعة", en: "hours" },
  minutes: { ar: "دقيقة", en: "min" },
  beginner: { ar: "مبتدئ", en: "Beginner" },
  intermediate: { ar: "متوسط", en: "Intermediate" },
  advanced: { ar: "متقدم", en: "Advanced" },
  roadmap: { ar: "خريطة الطريق المهنية", en: "Career Roadmap" },
  jobs: { ar: "الوظائف المتاحة", en: "Job Roles" },
  skills: { ar: "المهارات", en: "Skills" },
  tools: { ar: "الأدوات", en: "Tools" },
  projects: { ar: "المشاريع العملية", en: "Practical Projects" },
  overview: { ar: "نظرة عامة", en: "Overview" },
  markComplete: { ar: "تحديد كمكتمل", en: "Mark as completed" },
  completed: { ar: "مكتمل", en: "Completed" },
  inProgress: { ar: "قيد التنفيذ", en: "In progress" },
  available: { ar: "متاح", en: "Available" },
  locked: { ar: "مغلق", en: "Locked" },
  whatYouLearn: { ar: "ماذا ستتعلم", en: "What you will learn" },
  whyMatters: { ar: "لماذا يهم هذا في سوق العمل", en: "Why this matters in the job market" },
  shouldBeAble: { ar: "ما يجب أن تكون قادرًا عليه", en: "What you should be able to do" },
  practicalTask: { ar: "مهمة عملية", en: "Practical task" },
  aiPrompt: { ar: "برومبت التعلّم الذكي", en: "AI Learning Prompt" },
  copyPrompt: { ar: "نسخ البرومبت", en: "Copy prompt" },
  openMentor: { ar: "افتح المرشد الذكي", en: "Open AI Mentor" },
  customizePrompt: { ar: "تخصيص البرومبت", en: "Customize prompt" },
  copied: { ar: "تم النسخ", en: "Copied" },
  progress: { ar: "التقدم", en: "Progress" },
  continueLearning: { ar: "أكمل التعلم", en: "Continue learning" },
  todayGoal: { ar: "هدف اليوم", en: "Today's goal" },
  streak: { ar: "أيام متتالية", en: "Day streak" },
  recentNotes: { ar: "أحدث الملاحظات", en: "Recent notes" },
  savedResources: { ar: "المصادر المحفوظة", en: "Saved resources" },
  recommended: { ar: "الخطوة الموصى بها", en: "Recommended next step" },
  readinessScore: { ar: "درجة الجاهزية الوظيفية", en: "Career readiness score" },
  jobReady: { ar: "جاهز للعمل", en: "Job ready" },
  emptyNotes: { ar: "لا توجد ملاحظات بعد.", en: "No notes yet." },
  emptyResources: { ar: "احفظ أول مصدر لك.", en: "Save your first resource." },
  emptyRoadmap: { ar: "ابدأ أول خريطة طريق.", en: "Start your first roadmap." },
  emptyProjects: { ar: "لم تكمل أي مشروع بعد.", en: "No projects completed yet." },
  addNote: { ar: "إضافة ملاحظة سريعة", en: "Quick add note" },
  addResource: { ar: "إضافة مصدر", en: "Add resource" },
  save: { ar: "حفظ", en: "Save" },
  readFull: { ar: "قراءة البحث كامل", en: "Read full paper" },
  researchSummary: { ar: "ملخص البحث", en: "Paper summary" },
  researchFindings: { ar: "النتائج التي تم التوصل إليها", en: "Key findings" },
  researchApplication: { ar: "التطبيق العملي في الحقل", en: "Practical field application" },
  startPath: { ar: "ابدأ هذا المسار", en: "Start this path" },
  activePath: { ar: "مسارك الحالي", en: "Your active path" },
  finalCta: { ar: "ابدأ بناء مستقبلك الزراعي", en: "Start Building Your Agricultural Career" },
  language: { ar: "English", en: "العربية" },
} as const;

export type DictKey = keyof typeof DICT;

interface I18nValue {
  lang: Lang;
  dir: "rtl" | "ltr";
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: (key: DictKey) => string;
  L: (value: Loc | undefined) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    const stored = localStorage.getItem("agripath.lang");
    if (stored === "en" || stored === "ar") setLang(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("agripath.lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const t = useCallback((key: DictKey) => DICT[key][lang], [lang]);
  const L = useCallback((value: Loc | undefined) => (value ? value[lang] : ""), [lang]);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      setLang,
      toggleLang: () => setLang((p) => (p === "ar" ? "en" : "ar")),
      t,
      L,
    }),
    [lang, t, L],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
