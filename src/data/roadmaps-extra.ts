import type { Difficulty, Stage } from "@/types";

/**
 * Ordered career roadmaps (foundations -> job-ready) for specializations
 * that don't have hand-written stages. Every roadmap follows the same
 * 5-stage progression so learners always know what comes next.
 */

export type Pair = [string, string];

export const STAGES: { title: Pair; goal: Pair; level: Difficulty }[] = [
  { title: ["الأساسيات العلمية", "Scientific foundations"], goal: ["تبني قاعدة علمية صلبة قبل أي تطبيق.", "Build a solid scientific base before any application."], level: "beginner" },
  { title: ["المهارات الفنية الأساسية", "Core technical skills"], goal: ["تتقن المهارات التي يُطلب منك تنفيذها يوميًا في العمل.", "Master the skills you'll perform daily on the job."], level: "beginner" },
  { title: ["الأدوات والتطبيق العملي", "Tools & hands-on practice"], goal: ["تستخدم أدوات وبرامج السوق الفعلية باحتراف.", "Use real industry tools and software confidently."], level: "intermediate" },
  { title: ["المشاريع الميدانية والتخصص المتقدم", "Field projects & advanced topics"], goal: ["تنفذ مشاريع حقيقية تثبت قدرتك أمام صاحب العمل.", "Deliver real projects that prove your ability to employers."], level: "advanced" },
  { title: ["الجاهزية لسوق العمل", "Job readiness"], goal: ["تجهّز ملف أعمالك وسيرتك الذاتية وتستعد للمقابلات.", "Prepare portfolio, CV and interviews to get hired."], level: "intermediate" },
];

export const JOB_STAGE: Pair[] = [
  ["بناء ملف أعمال احترافي", "Building a professional portfolio"],
  ["السيرة الذاتية وملف LinkedIn", "CV and LinkedIn profile"],
  ["التحضير للمقابلات الفنية", "Technical interview preparation"],
];

const DATA: Record<string, Pair[][]> = {
  irrigation: [
    [["علاقة التربة والماء والنبات", "Soil–water–plant relations"], ["الاحتياجات المائية وحساب ET", "Crop water requirements & ET"]],
    [["أنظمة الري بالتنقيط والرش", "Drip & sprinkler systems"], ["الهيدروليكا وحساب فواقد الضغط", "Hydraulics & pressure loss"], ["جدولة الري", "Irrigation scheduling"]],
    [["تصميم شبكات الري ببرامج CAD", "Designing networks with CAD tools"], ["حساسات الرطوبة والتحكم الآلي", "Moisture sensors & automation"]],
    [["تصميم مشروع ري متكامل لمزرعة", "Full farm irrigation design"], ["التسميد مع الري (Fertigation)", "Fertigation"]],
    JOB_STAGE,
  ],
  greenhouses: [
    [["أنواع الصوب وهياكلها", "Greenhouse types & structures"], ["فسيولوجيا النبات تحت الحماية", "Plant physiology under cover"]],
    [["التحكم في المناخ: حرارة، رطوبة، تهوية", "Climate control: heat, humidity, ventilation"], ["إدارة الري والتسميد داخل الصوب", "Irrigation & nutrition in greenhouses"]],
    [["أنظمة التحكم الآلي والحساسات", "Automation controllers & sensors"], ["المكافحة الحيوية والمتكاملة", "Biological & integrated pest control"]],
    [["تخطيط دورة إنتاج خيار/طماطم", "Planning a cucumber/tomato cycle"], ["حساب التكاليف والعائد", "Cost & return analysis"]],
    JOB_STAGE,
  ],
  "ag-engineering": [
    [["أساسيات الميكانيكا والمحركات", "Mechanics & engines basics"], ["قراءة الرسومات الهندسية", "Reading engineering drawings"]],
    [["الجرارات ومعدات الحرث والزراعة", "Tractors, tillage & planting equipment"], ["معايرة الرشاشات والبذارات", "Calibrating sprayers & seeders"]],
    [["التصميم بـ AutoCAD / SolidWorks", "Design with AutoCAD / SolidWorks"], ["الصيانة الوقائية وإدارة الأسطول", "Preventive maintenance & fleet management"]],
    [["الزراعة الدقيقة وتوجيه GPS", "Precision ag & GPS guidance"], ["مشروع تصميم آلة زراعية بسيطة", "Designing a simple farm machine"]],
    JOB_STAGE,
  ],
  "food-safety": [
    [["ميكروبيولوجيا الأغذية", "Food microbiology"], ["كيمياء الأغذية الأساسية", "Basic food chemistry"]],
    [["نظام HACCP", "HACCP system"], ["ممارسات التصنيع الجيد GMP", "Good Manufacturing Practices"]],
    [["معايير ISO 22000 و GlobalG.A.P", "ISO 22000 & GlobalG.A.P"], ["التحاليل المعملية وضبط الجودة", "Lab analysis & quality control"]],
    [["إعداد خطة HACCP لمصنع", "Writing a HACCP plan for a plant"], ["التدقيق الداخلي والتتبع", "Internal audit & traceability"]],
    JOB_STAGE,
  ],
  agribusiness: [
    [["مبادئ الاقتصاد الزراعي", "Agricultural economics principles"], ["سلاسل الإمداد الزراعية", "Agricultural supply chains"]],
    [["حساب التكاليف ودراسات الجدوى", "Costing & feasibility studies"], ["التسويق الزراعي والتصدير", "Agri marketing & export"]],
    [["Excel والتحليل المالي", "Excel & financial analysis"], ["إدارة المبيعات وعلاقات العملاء", "Sales & customer relations"]],
    [["إعداد خطة عمل لمشروع زراعي", "Business plan for an agri project"], ["إدارة المخاطر والتمويل", "Risk management & finance"]],
    JOB_STAGE,
  ],
  "ag-research": [
    [["المنهج العلمي وصياغة الفرضيات", "Scientific method & hypotheses"], ["الإحصاء الأساسي", "Basic statistics"]],
    [["تصميم التجارب الحقلية", "Field experiment design"], ["جمع البيانات وتسجيلها", "Data collection & recording"]],
    [["التحليل الإحصائي بـ R", "Statistical analysis in R"], ["البحث في الأدبيات وإدارة المراجع", "Literature search & reference management"]],
    [["كتابة ورقة بحثية ونشرها", "Writing & publishing a paper"], ["كتابة مقترح تمويل بحثي", "Writing a research grant proposal"]],
    JOB_STAGE,
  ],
  agtech: [
    [["مشاكل الزراعة التي تحلها التكنولوجيا", "Farm problems tech can solve"], ["أساسيات البرمجة (Python)", "Programming basics (Python)"]],
    [["إنترنت الأشياء والحساسات", "IoT & sensors"], ["قواعد البيانات وتحليل البيانات", "Databases & data analysis"]],
    [["الذكاء الاصطناعي ورؤية الحاسب في الزراعة", "AI & computer vision in agriculture"], ["بناء نموذج أولي (MVP)", "Building an MVP"]],
    [["مشروع منتج AgTech متكامل", "End-to-end AgTech product project"], ["نماذج الأعمال للشركات الناشئة", "Startup business models"]],
    JOB_STAGE,
  ],
};

export function extraStages(specId: string, specName: { ar: string; en: string }): Stage[] {
  const plan = DATA[specId];
  if (!plan) return [];
  return buildStages(specId, specName, plan);
}

export function buildStages(
  specId: string,
  specName: { ar: string; en: string },
  plan: Pair[][],
): Stage[] {
  return plan.map((topics, i) => {
    const meta = STAGES[i]!;
    return {
      id: `${specId}-s${i + 1}`,
      order: i + 1,
      title: { ar: meta.title[0], en: meta.title[1] },
      goal: { ar: meta.goal[0], en: meta.goal[1] },
      topics: topics.map(([ar, en], j) => ({
        id: `${specId}-s${i + 1}-t${j + 1}`,
        title: { ar, en },
        summary: {
          ar: `تتعلم ${ar} كجزء من مسار ${specName.ar} بطريقة عملية مرتبطة بسوق العمل.`,
          en: `Learn ${en.toLowerCase()} as part of the ${specName.en} path, tied to real job needs.`,
        },
        why: {
          ar: `أصحاب العمل في مجال ${specName.ar} يتوقعون منك إتقان ${ar}.`,
          en: `Employers in ${specName.en} expect you to be competent in ${en.toLowerCase()}.`,
        },
        outcomes: [
          { ar: `شرح مفاهيم ${ar} بوضوح`, en: `Explain the concepts of ${en.toLowerCase()} clearly` },
          { ar: `تطبيق ${ar} في موقف عملي`, en: `Apply ${en.toLowerCase()} in a practical situation` },
        ],
        difficulty: meta.level,
        minutes: 45 + i * 15,
        skills: [en],
        prerequisites: i === 0 ? [] : [{ ar: STAGES[i - 1]!.title[0], en: STAGES[i - 1]!.title[1] }],
        task: {
          ar: `نفّذ تطبيقًا عمليًا قصيرًا على ${ar} ووثّق النتائج في ملاحظة.`,
          en: `Do a short hands-on exercise on ${en.toLowerCase()} and document results in a note.`,
        },
        promptFocus: {
          ar: `${ar} في سياق ${specName.ar}`,
          en: `${en} in the context of ${specName.en}`,
        },
      })),
    };
  });
}
