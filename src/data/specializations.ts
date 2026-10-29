import type { Specialization } from "@/types";
import { extraStages } from "./roadmaps-extra";

/**
 * Content layer. Structured so an admin CMS or API can replace this module
 * without any component change: every screen reads from these models only.
 */

const t = (ar: string, en: string) => ({ ar, en });

export const specializations: Specialization[] = [
  /* ─────────────────────────── 1. Digital Agriculture ─────────────────────── */
  {
    id: "digital-agriculture",
    name: t("الزراعة الرقمية", "Digital Agriculture"),
    tagline: t("بيانات وأقمار صناعية وقرار حقلي دقيق", "Satellites, sensors and field decisions"),
    description: t(
      "تخصص يجمع بين الزراعة الدقيقة ونظم المعلومات الجغرافية والاستشعار عن بعد وتحليل البيانات لاتخاذ قرارات حقلية مبنية على أرقام حقيقية. من أسرع المجالات نموًا في شركات الزراعة الحديثة.",
      "Precision agriculture, GIS, remote sensing and data analysis combined to drive field decisions from real numbers. One of the fastest-growing areas in modern agribusiness.",
    ),
    icon: "Satellite",
    difficulty: "intermediate",
    hours: 180,
    demand: 5,
    skills: ["GIS", "QGIS", "Remote Sensing", "NDVI", "GPS", "Data Analysis", "VRA", "Excel"],
    tools: ["QGIS", "Google Earth Engine", "Sentinel Hub", "Excel", "Power BI", "Python (basics)"],
    topicsPool: [
      t("الزراعة الدقيقة", "Precision agriculture"),
      t("نظم المعلومات الجغرافية", "GIS"),
      t("الاستشعار عن بعد", "Remote sensing"),
      t("بيانات الأقمار الصناعية", "Satellite data"),
      t("الطائرات الزراعية بدون طيار", "Agricultural drones"),
      t("الحساسات وإنترنت الأشياء", "Sensors & IoT"),
      t("تحليل البيانات", "Data analysis"),
      t("المعدل المتغير للتطبيق", "Variable rate application"),
    ],
    roles: [
      {
        id: "precision-ag-specialist",
        title: t("متخصص زراعة دقيقة", "Precision Agriculture Specialist"),
        description: t(
          "يحول بيانات الحقل إلى توصيات تشغيلية: خرائط تسميد متغيرة، جدولة ريّ، ومتابعة صحة المحصول.",
          "Turns field data into operational recommendations: variable-rate fertilization maps, irrigation scheduling and crop health monitoring.",
        ),
        responsibilities: [
          t("إعداد خرائط الحقول وتقسيمها إلى مناطق إدارة", "Build field maps and management zones"),
          t("تحليل صور الأقمار الصناعية أسبوعيًا", "Analyse weekly satellite imagery"),
          t("كتابة توصيات للمهندس الحقلي", "Write recommendations for field agronomists"),
        ],
        skills: ["GIS", "NDVI", "GPS", "Data Analysis"],
        tools: ["QGIS", "Sentinel Hub", "Excel"],
        entry: t("QGIS + NDVI + إكسل متقدم", "QGIS + NDVI + advanced Excel"),
        senior: t(
          "بايثون، Google Earth Engine، ونماذج إنتاجية",
          "Python, Google Earth Engine and yield models",
        ),
      },
      {
        id: "ag-data-analyst",
        title: t("محلل بيانات زراعية", "Agricultural Data Analyst"),
        description: t(
          "يبني لوحات متابعة للإنتاجية والتكاليف والاستهلاك المائي ويكتشف أسباب انخفاض العائد.",
          "Builds dashboards for yield, cost and water use, and explains why performance drops.",
        ),
        responsibilities: [
          t("تنظيف بيانات الحقول والمزارع", "Clean farm and field datasets"),
          t("بناء تقارير أسبوعية للإدارة", "Build weekly management reports"),
        ],
        skills: ["Data Cleaning", "Statistics", "Visualization"],
        tools: ["Excel", "Power BI", "SQL (basics)"],
        entry: t("إكسل + إحصاء أساسي", "Excel + basic statistics"),
        senior: t("SQL وبايثون ونماذج تنبؤ", "SQL, Python and forecasting models"),
      },
      {
        id: "remote-sensing-specialist",
        title: t("متخصص استشعار عن بعد", "Remote Sensing Specialist"),
        description: t(
          "يحلل الصور الطيفية لتقييم صحة المحصول والإجهاد المائي ومساحات الزراعة.",
          "Analyses spectral imagery to assess crop health, water stress and planted area.",
        ),
        responsibilities: [
          t("معالجة صور Sentinel و Landsat", "Process Sentinel and Landsat imagery"),
          t("حساب المؤشرات النباتية وتفسيرها", "Compute and interpret vegetation indices"),
        ],
        skills: ["Remote Sensing", "NDVI", "Image Interpretation"],
        tools: ["QGIS", "Google Earth Engine"],
        entry: t("فهم النطاقات الطيفية والمؤشرات", "Spectral bands and index literacy"),
        senior: t("تصنيف الصور والتعلم الآلي", "Image classification and machine learning"),
      },
    ],
    mentorPersona: t(
      "أنت مهندس زراعة دقيقة أول لديه 12 سنة خبرة في تشغيل مزارع كبيرة بالبيانات.",
      "You are a senior precision-agriculture engineer with 12 years running large data-driven farms.",
    ),
    stages: [
      {
        id: "da-s1",
        order: 1,
        title: t("المرحلة 01 — الأساسيات", "Stage 01 — Foundations"),
        goal: t(
          "تفهم الحقل قبل أن تفهم البيانات.",
          "Understand the field before you understand the data.",
        ),
        topics: [
          {
            id: "da-t1",
            title: t("أساسيات الإنتاج الزراعي", "Agricultural production fundamentals"),
            summary: t(
              "دورة حياة المحصول، العمليات الزراعية، ومواعيد القرارات الحقلية.",
              "Crop life cycle, field operations and the timing of field decisions.",
            ),
            why: t(
              "أي تحليل بيانات لا يفهم دورة المحصول ينتج توصيات غير قابلة للتنفيذ.",
              "Any analysis that ignores the crop cycle produces unusable recommendations.",
            ),
            outcomes: [
              t("تحديد مراحل نمو المحصول", "Identify crop growth stages"),
              t("ربط كل مرحلة بقرار إداري", "Map each stage to a management decision"),
            ],
            difficulty: "beginner",
            minutes: 90,
            skills: ["Crop Management"],
            prerequisites: [t("لا يوجد", "None")],
            task: t(
              "اختر محصولًا واحدًا واكتب جدولًا لمراحل نموه مع القرار المطلوب في كل مرحلة.",
              "Pick one crop and write a table of growth stages with the decision required at each stage.",
            ),
            promptFocus: t(
              "أساسيات الإنتاج الزراعي من منظور اتخاذ القرار الحقلي",
              "Crop production fundamentals from a field decision-making perspective",
            ),
          },
          {
            id: "da-t2",
            title: t("مفاهيم البيانات الزراعية", "Agricultural data concepts"),
            summary: t(
              "أنواع البيانات الحقلية، جودة البيانات، والأخطاء الشائعة في التسجيل.",
              "Types of field data, data quality, and common recording errors.",
            ),
            why: t(
              "الشركات تشتكي من بيانات غير نظيفة أكثر من نقص الأدوات.",
              "Companies suffer far more from dirty data than from missing tools.",
            ),
            outcomes: [
              t("تصميم نموذج تسجيل بيانات حقلية", "Design a field data-collection sheet"),
              t("اكتشاف القيم الشاذة", "Spot outliers"),
            ],
            difficulty: "beginner",
            minutes: 60,
            skills: ["Data Cleaning"],
            prerequisites: [t("إكسل أساسي", "Basic Excel")],
            task: t(
              "صمم ملف إكسل لتسجيل بيانات 10 قطاعات حقلية وأضف تحققًا من صحة الإدخال.",
              "Build an Excel sheet for 10 field blocks and add input validation.",
            ),
            promptFocus: t("جودة البيانات الزراعية عمليًا", "Practical agricultural data quality"),
          },
        ],
      },
      {
        id: "da-s2",
        order: 2,
        title: t("المرحلة 02 — نظم المعلومات الجغرافية", "Stage 02 — GIS"),
        goal: t("ترسم الحقل وتحلله مكانيًا.", "Map and spatially analyse the field."),
        topics: [
          {
            id: "da-t3",
            title: t("مفاهيم GIS وأنظمة الإحداثيات", "GIS concepts & coordinate systems"),
            summary: t(
              "الطبقات، البيانات المتجهة والنقطية، أنظمة الإحداثيات وWGS84 وUTM.",
              "Layers, vector vs raster, coordinate systems, WGS84 and UTM.",
            ),
            why: t(
              "خطأ نظام الإحداثيات يفسد كل حساب مساحة في المشروع.",
              "A coordinate-system mistake ruins every area calculation in a project.",
            ),
            outcomes: [
              t("اختيار نظام الإحداثيات المناسب", "Choose the right coordinate system"),
              t("حساب مساحة الحقل بدقة", "Compute field area accurately"),
            ],
            difficulty: "beginner",
            minutes: 120,
            skills: ["GIS"],
            prerequisites: [t("أساسيات الحاسب", "Computer basics")],
            task: t(
              "ارسم حدود حقل حقيقي من صور جوية واحسب مساحته بالفدان.",
              "Digitise a real field boundary from imagery and compute its area.",
            ),
            promptFocus: t("GIS للمهندس الزراعي", "GIS for the agricultural engineer"),
          },
          {
            id: "da-t4",
            title: t("العمل الاحترافي على QGIS", "Working professionally in QGIS"),
            summary: t(
              "إنشاء المشاريع، الطبقات، التصنيف، والتحليل المكاني وإخراج الخرائط.",
              "Projects, layers, styling, spatial analysis and map export.",
            ),
            why: t(
              "QGIS هو الأداة المطلوبة في معظم الوظائف بدون تكلفة ترخيص.",
              "QGIS is the tool most job posts ask for, with no licence cost.",
            ),
            outcomes: [
              t("إنتاج خريطة احترافية جاهزة للعميل", "Produce a client-ready map"),
              t("تنفيذ تحليل مكاني بسيط", "Run a basic spatial analysis"),
            ],
            difficulty: "intermediate",
            minutes: 180,
            skills: ["QGIS", "GIS"],
            prerequisites: [t("مفاهيم GIS", "GIS concepts")],
            task: t(
              "أنتج خريطة لمزرعة تحتوي على القطاعات ومصادر الري ومفتاح خريطة ومقياس رسم.",
              "Produce a farm map with blocks, water sources, legend and scale bar.",
            ),
            promptFocus: t("QGIS التطبيقي في المزارع", "Applied QGIS for farms"),
          },
        ],
      },
      {
        id: "da-s3",
        order: 3,
        title: t("المرحلة 03 — الاستشعار عن بعد", "Stage 03 — Remote Sensing"),
        goal: t("تقرأ صحة المحصول من الفضاء.", "Read crop health from space."),
        topics: [
          {
            id: "da-t5",
            title: t("النطاقات الطيفية والمؤشرات النباتية", "Spectral bands & vegetation indices"),
            summary: t(
              "الأشعة القريبة من الحمراء، NDVI و NDRE و NDWI ومتى تستخدم كل مؤشر.",
              "Near-infrared, NDVI, NDRE, NDWI and when each index applies.",
            ),
            why: t(
              "المؤشرات النباتية هي لغة تقارير الزراعة الدقيقة في الشركات.",
              "Vegetation indices are the reporting language of precision-ag teams.",
            ),
            outcomes: [
              t("تفسير خريطة NDVI", "Interpret an NDVI map"),
              t("التمييز بين إجهاد مائي ومرضي", "Distinguish water stress from disease stress"),
            ],
            difficulty: "intermediate",
            minutes: 150,
            skills: ["Remote Sensing", "NDVI"],
            prerequisites: [t("QGIS", "QGIS")],
            task: t(
              "حمّل صورة Sentinel-2 لحقل واحسب NDVI وحدد المناطق الضعيفة.",
              "Download a Sentinel-2 scene, compute NDVI and flag weak zones.",
            ),
            promptFocus: t("المؤشرات الطيفية وتفسيرها حقليًا", "Spectral indices and field interpretation"),
          },
        ],
      },
      {
        id: "da-s4",
        order: 4,
        title: t("المرحلة 04 — الزراعة الدقيقة", "Stage 04 — Precision Agriculture"),
        goal: t("تحويل الخرائط إلى تنفيذ.", "Turn maps into execution."),
        topics: [
          {
            id: "da-t6",
            title: t("مناطق الإدارة والتطبيق المتغير", "Management zones & variable rate"),
            summary: t(
              "تقسيم الحقل إلى مناطق وبناء وصفة تسميد أو ريّ متغيرة.",
              "Split the field into zones and build a variable fertilization or irrigation prescription.",
            ),
            why: t(
              "هذه المخرجات هي ما تدفع الشركات مقابله فعليًا.",
              "This deliverable is what companies actually pay for.",
            ),
            outcomes: [
              t("بناء 3 مناطق إدارة مبرَّرة", "Build 3 justified management zones"),
              t("كتابة وصفة تطبيق متغير", "Write a variable-rate prescription"),
            ],
            difficulty: "advanced",
            minutes: 180,
            skills: ["VRA", "GIS", "Data Analysis"],
            prerequisites: [t("NDVI + QGIS", "NDVI + QGIS")],
            task: t(
              "اقترح خطة تسميد متغيرة لحقل 50 فدانًا بناءً على NDVI وتحليل التربة.",
              "Propose a variable fertilization plan for a 50-acre field using NDVI plus soil tests.",
            ),
            promptFocus: t("التطبيق المتغير عمليًا", "Variable rate application in practice"),
          },
        ],
      },
      {
        id: "da-s5",
        order: 5,
        title: t("المرحلة 05 — تحليل البيانات", "Stage 05 — Data Analysis"),
        goal: t("تحوّل الأرقام إلى قرار.", "Convert numbers into decisions."),
        topics: [
          {
            id: "da-t7",
            title: t("الإحصاء التطبيقي وتصوير البيانات", "Applied statistics & visualization"),
            summary: t(
              "المتوسط والتشتت، الارتباط، الرسوم التي تُقنع الإدارة.",
              "Means and spread, correlation, and charts that convince management.",
            ),
            why: t(
              "المهندس الذي يعرض نتائجه بوضوح يُرقّى أسرع.",
              "The engineer who communicates results clearly gets promoted faster.",
            ),
            outcomes: [
              t("بناء لوحة متابعة إنتاجية", "Build a yield dashboard"),
              t("اختبار فرق بين معاملتين", "Test the difference between two treatments"),
            ],
            difficulty: "intermediate",
            minutes: 150,
            skills: ["Statistics", "Visualization", "Excel"],
            prerequisites: [t("إكسل", "Excel")],
            task: t(
              "قارن إنتاجية قطاعين إحصائيًا واكتب استنتاجًا في 5 أسطر.",
              "Statistically compare two blocks' yield and write a 5-line conclusion.",
            ),
            promptFocus: t("الإحصاء الزراعي التطبيقي", "Applied agricultural statistics"),
          },
        ],
      },
      {
        id: "da-s6",
        order: 6,
        title: t("المرحلة 06 — مشاريع عملية", "Stage 06 — Practical Projects"),
        goal: t("تبني أعمالًا حقيقية في ملفك.", "Build real work into your portfolio."),
        topics: [
          {
            id: "da-t8",
            title: t("مشروع خريطة صحة المحصول", "Crop health map project"),
            summary: t(
              "مشروع متكامل من تحميل الصور إلى تقرير توصيات.",
              "End-to-end project from imagery download to a recommendation report.",
            ),
            why: t(
              "المشروع الموثق يغني عن 3 كورسات في المقابلة.",
              "One documented project beats three certificates in an interview.",
            ),
            outcomes: [
              t("تسليم تقرير احترافي بصفحتين", "Deliver a 2-page professional report"),
              t("عرض النتائج بخريطة واضحة", "Present findings on a clear map"),
            ],
            difficulty: "advanced",
            minutes: 300,
            skills: ["GIS", "Remote Sensing", "Reporting"],
            prerequisites: [t("مراحل 1-5", "Stages 1-5")],
            task: t(
              "نفّذ المشروع على حقل حقيقي وارفع الملفات على GitHub أو Drive.",
              "Execute the project on a real field and publish the files on GitHub or Drive.",
            ),
            promptFocus: t("إدارة مشروع زراعة دقيقة", "Managing a precision-ag project"),
          },
        ],
      },
      {
        id: "da-s7",
        order: 7,
        title: t("المرحلة 07 — التحضير للوظيفة", "Stage 07 — Job Preparation"),
        goal: t("تصبح مرشحًا مقنعًا.", "Become a convincing candidate."),
        topics: [
          {
            id: "da-t9",
            title: t("ملف الأعمال والسيرة الذاتية والمقابلة", "Portfolio, CV & interview"),
            summary: t(
              "بناء ملف أعمال، صياغة سيرة موجهة للوظيفة، والتدريب على مهام المقابلة العملية.",
              "Build a portfolio, write a role-targeted CV and rehearse practical interview tasks.",
            ),
            why: t(
              "معظم المرشحين يفقدون الوظيفة في العرض لا في المعرفة.",
              "Most candidates lose the offer on presentation, not knowledge.",
            ),
            outcomes: [
              t("سيرة ذاتية بصفحة واحدة موجهة", "A targeted one-page CV"),
              t("الإجابة على 10 أسئلة مقابلة فنية", "Answer 10 technical interview questions"),
            ],
            difficulty: "intermediate",
            minutes: 120,
            skills: ["Portfolio", "Interview"],
            prerequisites: [t("مشروع واحد على الأقل", "At least one project")],
            task: t(
              "اطلب من المرشد الذكي إجراء مقابلة محاكاة لوظيفة متخصص زراعة دقيقة.",
              "Ask the AI mentor to run a mock interview for a precision-ag specialist role.",
            ),
            promptFocus: t("محاكاة مقابلة زراعة دقيقة", "Precision-ag mock interview"),
          },
        ],
      },
    ],
    projects: [
      {
        id: "da-p1",
        title: t("تحليل صور أقمار صناعية لحقل", "Analyse satellite imagery for a field"),
        level: "beginner",
        objective: t("قياس تفاوت صحة المحصول داخل الحقل.", "Measure in-field crop health variability."),
        problem: t(
          "المزارع يشكو من انخفاض الإنتاج في أجزاء من الحقل دون سبب واضح.",
          "The grower reports lower yield in parts of the field with no clear cause.",
        ),
        skills: ["Remote Sensing", "NDVI", "QGIS"],
        tools: ["QGIS", "Sentinel Hub"],
        steps: [
          t("حدد الحقل وحمّل صورتين بفارق شهر", "Define the field and download two scenes a month apart"),
          t("احسب NDVI وقارن", "Compute NDVI and compare"),
          t("اكتب 3 فرضيات للسبب", "Write 3 hypotheses for the cause"),
        ],
        deliverables: [t("خريطتان + تقرير صفحة", "Two maps + one-page report")],
        portfolio: t("أضف الخريطة والتقرير في ملف أعمالك.", "Add the map and report to your portfolio."),
      },
      {
        id: "da-p2",
        title: t("بناء نظام توصية بالريّ", "Build an irrigation recommendation tool"),
        level: "advanced",
        objective: t("توليد جدول ريّ أسبوعي من بيانات المناخ.", "Generate a weekly irrigation schedule from climate data."),
        problem: t("الريّ يتم بالعادة لا بالاحتياج.", "Irrigation runs on habit, not on need."),
        skills: ["Data Analysis", "Irrigation Scheduling", "Excel"],
        tools: ["Excel", "Weather APIs"],
        steps: [
          t("اجمع ET0 والأمطار", "Collect ET0 and rainfall"),
          t("احسب الاحتياج المائي للمحصول", "Compute crop water requirement"),
          t("ابنِ ملفًا يحدّث الجدول تلقائيًا", "Build a sheet that updates the schedule automatically"),
        ],
        deliverables: [t("ملف حاسبة + دليل استخدام", "Calculator file + usage guide")],
        portfolio: t("قدّمه كأداة قابلة لإعادة الاستخدام.", "Present it as a reusable tool."),
      },
    ],
  },

  /* ─────────────────────────── 2. Soil & Water ────────────────────────────── */
  {
    id: "soil-water",
    name: t("تقييم جودة التربة واستصلاح الأراضي", "Soil Quality Assessment & Land Reclamation"),
    tagline: t("تحاليل معملية، تشخيص ملوحة، وخطط استصلاح كبرى", "Lab diagnostics, salinity reclamation & spatial fertility mapping"),
    description: t(
      "أساس المشاريع الزراعية الكبرى: تقييم جودة وصحة التربة، سحب العينات الممثلة، التحاليل المعملية، علاج الملوحة والصودية، وحساب الاحتياج الجبسي والغسيلي ورسم خرائط الخصوبة المكانية.",
      "The foundation of agricultural mega-projects: soil quality and health assessment, representative sampling, lab testing, salinity/sodicity reclamation, gypsum/leaching calculations and GIS fertility mapping.",
    ),
    icon: "Layers",
    difficulty: "intermediate",
    hours: 160,
    demand: 5,
    skills: ["Soil Analysis", "EC/pH", "Fertility", "Salinity & Sodicity", "Land Evaluation", "Reclamation", "QGIS"],
    tools: ["Flame Photometer", "AAS", "Core Samplers", "Penetrometer", "Excel", "QGIS"],
    topicsPool: [
      t("فيزياء وقوام التربة", "Soil physics & texture"),
      t("كيمياء وخصوبة التربة", "Soil chemistry & fertility"),
      t("سحب العينات القياسي", "Standard soil sampling"),
      t("التحاليل المعملية وطرق الاستخلاص", "Lab analysis & extraction methods"),
      t("الملوحة والصودية (ECe/SAR/ESP)", "Salinity & sodicity"),
      t("الأراضي الجيرية والكلسية", "Calcareous soils"),
      t("حسابات الجبس الزراعي والغسيل", "Gypsum & leaching calculations"),
      t("خرائط الخصوبة المكانية", "Spatial fertility mapping"),
    ],
    roles: [
      {
        id: "soil-specialist",
        title: t("متخصص أراضٍ وجودة تربة", "Soil Quality & Fertility Specialist"),
        description: t(
          "يقرأ تحاليل التربة ويربطها بمشاكل الحقل ويكتب برامج علاج وتسميد.",
          "Reads soil analyses, links them to field problems and writes treatment and fertilization programmes.",
        ),
        responsibilities: [
          t("سحب عينات ممثلة", "Collect representative samples"),
          t("تفسير التحاليل وكتابة التوصيات", "Interpret results and write recommendations"),
        ],
        skills: ["Soil Analysis", "Fertility"],
        tools: ["Excel", "Lab reports"],
        entry: t("تفسير تقرير تحليل تربة كامل", "Interpret a full soil report"),
        senior: t("تصميم برامج استصلاح كاملة", "Design full reclamation programmes"),
      },
      {
        id: "reclamation-engineer",
        title: t("مهندس استصلاح أراضٍ", "Land Reclamation Engineer"),
        description: t(
          "يخطط لتحويل الأراضي الملحية والصحراوية إلى أراضٍ منتجة.",
          "Plans the conversion of saline and desert land into productive fields.",
        ),
        responsibilities: [
          t("حساب احتياجات الغسيل", "Calculate leaching requirements"),
          t("تصميم شبكات الصرف", "Design drainage networks"),
        ],
        skills: ["Salinity", "Drainage", "Reclamation"],
        tools: ["Excel", "AutoCAD (basics)"],
        entry: t("حساب EC وSAR والاحتياج للغسيل", "EC, SAR and leaching requirement"),
        senior: t("إدارة مشروع استصلاح متكامل", "Manage a full reclamation project"),
      },
    ],
    mentorPersona: t(
      "أنت عالم أراضٍ أول عمل 15 سنة في الاستصلاح ومعامل التحليل.",
      "You are a senior soil scientist with 15 years in reclamation and lab work.",
    ),
    stages: [
      {
        id: "sw-s1",
        order: 1,
        title: t("المرحلة 01 — مورفولوجيا وفيزياء التربة والخواص المائية", "Stage 01 — Soil Physics, Morphology & Water Retention"),
        goal: t("إتقان وصف قطاع التربة ومثلث القوام والكثافة الظاهرية ومعدل الرشح.", "Master soil profile description, texture triangle, bulk density and infiltration rates."),
        topics: [
          {
            id: "sw-t1",
            title: t("قوام التربة وبناؤها ومثلث القوام الميكانيكي", "Soil texture, structure & mechanical hydrometer classification"),
            summary: t(
              "تحليل الحبيبات بالهيدروميتر، مثلث قوام USDA، وتأثير نسب الطين والسلت والرمل على تهوية الجذور وحركة المياه.",
              "Hydrometer particle size analysis, USDA texture triangle, and effects of sand/silt/clay fractions on root aeration and drainage.",
            ),
            why: t(
              "القوام خاصية أساسية ثابتة تحدد كل شيء: نوع شبكة الري، مسافات النقاطات، ومعدل امتصاص العناصر الغذائية.",
              "Soil texture is a permanent foundational property that dictates irrigation hydraulics, emitter spacing and nutrient buffering.",
            ),
            outcomes: [
              t("تحديد قوام التربة حقلياً بالملمس ومعملياً بالهيدروميتر", "Determine soil texture by field feel and laboratory hydrometer"),
              t("تحديد نظام الري ومسافات النقاطات بناءً على قوام التربة", "Specify irrigation emitter spacing and flow rates matching soil texture"),
            ],
            difficulty: "beginner",
            minutes: 90,
            skills: ["Soil Physics", "Texture Triangle", "Hydrometer"],
            prerequisites: [t("لا يوجد", "None")],
            task: t(
              "استخدم مثلث القوام لتصنيف 5 عينات بأوزان رمل وسلت وطين مختلفة، وحدد شكل البصلة الرطوبة المتوقعة لكل منها.",
              "Classify 5 samples on the USDA texture triangle and sketch the expected moisture wetting bulb beneath the dripper for each.",
            ),
            promptFocus: t("قوام التربة والتحليل الميكانيكي", "Soil texture classification and water movement"),
          },
          {
            id: "sw-t2",
            title: t("الكثافة الظاهرية، الدمك، ومنحنى الاحتفاظ بالرطوبة", "Bulk density, compaction hardpans & water retention curve"),
            summary: t(
              "قياس الكثافة الظاهرية بأسطوانة التربة غير المخلخلة، استخدام مخترق التربة (Penetrometer) لكشف الطبقات الصماء، وحساب السعة الحقلية ونقطة الذبول.",
              "Core sampler bulk density measurement, penetrometer detection of compaction hardpans, and calculating field capacity vs permanent wilting point.",
            ),
            why: t(
              "دمك التربة وارتفاع الكثافة الظاهرية عن 1.6 جم/سم³ يخنق الجذور ويمنع تعمقها فيفشل المحصول مهما تم تسميده.",
              "Bulk density exceeding 1.6 g/cm³ creates impenetrable root-restricting hardpans, starving the crop regardless of fertilizer inputs.",
            ),
            outcomes: [
              t("حساب المسامية الكلية والماء الميسر (AWC) بالمليمتر لكل متر عمق", "Calculate total porosity and available water capacity (AWC) in mm per meter depth"),
              t("تشخيص عمق الطبقة الصماء وتحديد قرار الحرث العميق (Subsoiling)", "Identify compaction hardpan depth and prescribe subsoiler shank depth"),
            ],
            difficulty: "beginner",
            minutes: 90,
            skills: ["Bulk Density", "Compaction Testing", "Water Relations"],
            prerequisites: [t("قوام التربة", "Soil texture")],
            task: t(
              "احسب الكثافة الظاهرية والمسامية لعينة أسطوانية حجمها 100 سم³ ووزنها الجاف 145 جم، وحدد هل تعيق الجذور أم لا.",
              "Compute bulk density and porosity for a 100 cm³ core sample with 145g dry weight, evaluating root penetration resistance.",
            ),
            promptFocus: t("الكثافة الظاهرية ودمك التربة", "Soil bulk density, compaction and available water capacity"),
          },
        ],
      },
      {
        id: "sw-s2",
        order: 2,
        title: t("المرحلة 02 — كيمياء التربة والملوحة والصودية", "Stage 02 — Soil Chemistry, Salinity & Sodicity Diagnostics"),
        goal: t("تشخيص السعة التبادلية CEC والـ pH وملوحة ECe وصودية التربة SAR و ESP.", "Master CEC interpretation, pH buffering, ECe salinity, SAR sodicity and calcareous soils."),
        topics: [
          {
            id: "sw-t3",
            title: t("السعة التبادلية الكاتيونية (CEC) ودرجة تشبع القواعد والـ pH", "Cation exchange capacity (CEC), base saturation & soil pH dynamics"),
            summary: t(
              "تعريف الـ CEC وأهميتها في تثبيت الكاتيونات ($Ca^{2+}, Mg^{2+}, K^+, Na^+$)، تأثير المادة العضوية والمعادن الطينية، والـ pH وتأثيره على تيسر العناصر.",
              "CEC fundamentals, retaining exchangeable cations, contribution of organic matter vs clay minerals, and pH impacts on nutrient availability.",
            ),
            why: t(
              "الأراضي الرملية الصحراوية تمتلك CEC منخفضاً جداً (< 5 meq/100g) مما يعني أن التسميد الغزير يُغسل فوراً في المياه الجوفية.",
              "Desert sandy soils have very low CEC (< 5 meq/100g), meaning heavy slug fertilization leaches directly into groundwater.",
            ),
            outcomes: [
              t("تفسير قيم CEC في تقرير التحليل وتعديل تردد التسميد", "Interpret CEC lab values and adjust fertigation frequency accordingly"),
              t("حساب نسب تشبع القواعد والتوازن بين الكالسيوم والمغنيسيوم والبوتاسيوم", "Calculate base saturation ratios and optimize Ca:Mg:K balance on exchange sites"),
            ],
            difficulty: "intermediate",
            minutes: 120,
            skills: ["CEC", "Soil Chemistry", "Base Saturation"],
            prerequisites: [t("كيمياء عامة", "General chemistry")],
            task: t(
              "قارن تقريري تربة (أرض رملية CEC=4 مقابل أرض طينية CEC=28) واكتب خطة التسميد المناسبة لكل منهما.",
              "Compare two soil reports (sandy CEC=4 vs clay CEC=28) and outline the fertigation timing and dose strategy for each.",
            ),
            promptFocus: t("السعة التبادلية الكاتيونية والـ pH في التربة", "Cation exchange capacity and pH dynamics in soils"),
          },
          {
            id: "sw-t4",
            title: t("الملوحة والصودية (ECe, SAR, ESP) وخصائص الأراضي الجيرية", "Salinity & sodicity diagnostics (ECe, SAR, ESP) and calcareous soils"),
            summary: t(
              "قياس ملوحة مستخلص العجينة المشبعة (ECe)، نسبة الصوديوم الممتز (SAR)، نسبة الصوديوم المتبادل (ESP)، وتصنيف الأراضي (ملحية، صودية، ملحية صودية)، ومشاكل كربونات الكالسيوم النشطة ($CaCO_3$).",
              "Saturated paste extract salinity (ECe), Sodium Adsorption Ratio (SAR), Exchangeable Sodium Percentage (ESP), soil classification, and active CaCO3 in calcareous soils.",
            ),
            why: t(
              "الخطأ في التفرقة بين التربة الملحية والصودية يؤدي إلى غسيل التربة الصودية بدون جبس فتنهدم بنيتها وتتحول إلى صخرة غير منفذة.",
              "Confusing saline with sodic soils leads to leaching without gypsum, destroying soil structure and turning the field into an impermeable crust.",
            ),
            outcomes: [
              t("تصنيف التربة بدقة بناءً على قيم ECe و pH و ESP", "Classify soils as saline, sodic, or saline-sodic based on lab thresholds"),
              t("تحديد استراتيجية التعامل مع الأراضي الجيرية وتثبيت الفوسفور ونقص الحديد", "Diagnose active CaCO3 buffering and overcome phosphorus fixation and iron chlorosis"),
            ],
            difficulty: "intermediate",
            minutes: 130,
            skills: ["Salinity Diagnostics", "Sodicity", "Calcareous Soils"],
            prerequisites: [t("كيمياء التربة", "Soil chemistry")],
            task: t(
              "لديك عينة تربة: ECe = 7.5 dS/m, pH = 8.5, SAR = 18. صنف هذه التربة وحدد الترتيب الصحيح لخطوات الاستصلاح.",
              "Given ECe = 7.5 dS/m, pH = 8.5, SAR = 18: classify the soil and specify the sequential order of reclamation steps.",
            ),
            promptFocus: t("تشخيص ملوحة وصودية التربة", "Soil salinity, sodicity and calcareous land diagnostics"),
          },
        ],
      },
      {
        id: "sw-s3",
        order: 3,
        title: t("المرحلة 03 — بروتوكولات سحب العينات والتحاليل المعملية القياسية", "Stage 03 — Representative Sampling & Lab Analytical Methods"),
        goal: t("تصميم خطط سحب العينات الحقلية وإتقان طرق الاستخلاص المعملية القياسية.", "Design sampling grids and master laboratory extraction chemistry."),
        topics: [
          {
            id: "sw-t5",
            title: t("تصميم خطط سحب العينات الحقلية الممثلة (Grid vs Zone)", "Representative sampling protocols: grid vs zone sampling"),
            summary: t(
              "سحب العينات المركبة (Composite samples)، الأعماق القياسية (0-30 سم، 30-60 سم)، واستخدام صور الأقمار الصناعية لتقسيم الحقل إلى مناطق سحب عينات ذكية (Smart Zone Sampling).",
              "Composite sampling protocols, standard root depths (0-30cm, 30-60cm), and using satellite vegetation maps to design smart zone sampling grids.",
            ),
            why: t(
              "أي خطأ في سحب العينة الحقلية لا يمكن للمعمل تصحيحه؛ عينة غير ممثلة تعني توصيات خاطئة بملايين الجنيهات.",
              "Field sampling errors cannot be corrected by the lab; an unrepresentative sample leads to erroneous recommendations costing millions.",
            ),
            outcomes: [
              t("رسم خطة سحب عينات بنظام الشبكة أو المناطق على تطبيق حقلي أو خريطة GPS", "Design GPS-referenced grid and zone sampling plans using field GIS apps"),
              t("تجهيز العينة للمعمل: التجفيف الهوائي، الطحن، والنخل عبر منخل 2 مم", "Proper sample preparation: air drying, crushing, and sieving through a 2mm mesh"),
            ],
            difficulty: "intermediate",
            minutes: 100,
            skills: ["Soil Sampling", "Field GIS", "Sample Preparation"],
            prerequisites: [t("أساسيات التربة", "Soil basics")],
            task: t(
              "صمم خطة سحب عينات مركبة لمزرعة 120 فدانًا متباينة في النمو بناءً على خريطة NDVI للأقمار الصناعية.",
              "Design a composite sampling plan for a heterogeneous 120-acre farm based on a satellite NDVI anomaly map.",
            ),
            promptFocus: t("بروتوكولات سحب عينات التربة الحقلية", "Representative soil sampling methodology and protocols"),
          },
          {
            id: "sw-t6",
            title: t("طرق الاستخلاص المعملية القياسية (Olsen P, AAS, Flame Photometer)", "Standard lab analytical extraction methods & instrumentation"),
            summary: t(
              "طريقة أولسن (Olsen) للفوسفور في الترب القلوية، خلات الأمونيوم المعتدلة للكاتيونات المتبادلة بجهاز مقياس اللهب، وجهاز الامتصاص الذري (AAS) للعناصر الصغرى، وتقدير المادة العضوية بطريقة Walkley-Black.",
              "Olsen sodium bicarbonate extraction for alkaline phosphorus, ammonium acetate for exchangeable bases via flame photometer, AAS for trace micronutrients, and Walkley-Black organic matter.",
            ),
            why: t(
              "مهندس الأراضي المحترف يجب أن يفهم طريقة الاستخلاص المستخدمة في التقرير المعملي ليعرف كيف يُفسر الأرقام بشكل صحيح.",
              "Agronomists must know which chemical extractant the lab used to properly interpret sufficiency thresholds.",
            ),
            outcomes: [
              t("التحقق من صحة نتائج المعمل وموازنة الشحنات الكاتيونية والأنيونية", "Verify lab analytical data quality using cation-anion balance checks"),
              t("ربط تركيزات العناصر الميسرة بالحدود الحرجة للمحاصيل", "Correlate extractable nutrient concentrations with crop critical sufficiency levels"),
            ],
            difficulty: "advanced",
            minutes: 140,
            skills: ["Lab Instrumentation", "Analytical Chemistry", "QA/QC"],
            prerequisites: [t("كيمياء التربة", "Soil chemistry")],
            task: t(
              "راجع نتائج تقرير معملي لـ 10 عينات واكتشف الخطأ الكيميائي غير المنطقي في موازنة الكاتيونات.",
              "Audit a 10-sample lab analytical sheet and identify the chemically inconsistent cation-anion imbalance.",
            ),
            promptFocus: t("طرق تحاليل التربة المعملية والاستخلاص", "Soil testing lab extraction methods and analytical instrumentation"),
          },
        ],
      },
      {
        id: "sw-s4",
        order: 4,
        title: t("المرحلة 04 — تفسير التقارير المعملية واستصلاح الأراضي", "Stage 04 — Lab Interpretation, Reclamation & Drainage Engineering"),
        goal: t("حساب الاحتياجات الاستصلاحية للجبس الزراعي ومياه الغسيل وتصميم شبكات الصرف.", "Calculate gypsum requirements, leaching fractions and design agricultural drainage systems."),
        topics: [
          {
            id: "sw-t7",
            title: t("حساب الاحتياج الجبسي (Gypsum Requirement) لاستصلاح التربة الصودية", "Gypsum requirement calculation & sodic soil reclamation"),
            summary: t(
              "المعادلة الرياضية لاحتساب أطنان الجبس الزراعي اللازمة لكل فدان لإحلال الكالسيوم محل الصوديوم المتبادل وخفض ESP إلى أقل من 10%.",
              "Mathematical formula to calculate metric tons of gypsum per acre needed to replace exchangeable sodium and lower ESP below 10%.",
            ),
            why: t(
              "حساب الجبس الخاطئ إما يترك الأرض قلوية صودية غير منتجة أو يهدر مئات الآلاف من الجنيهات في شراء جبس لا تحتاجه التربة.",
              "Incorrect gypsum calculation either leaves land sodic and barren or wastes massive budgets on redundant amendments.",
            ),
            outcomes: [
              t("حساب كمية الجبس الزراعي النقي والتجاري بناءً على درجة نقاوة الخام", "Calculate theoretical and commercial gypsum tonnage based on purity percentage"),
              t("تحديد طريقة الخلط الميكانيكي مع التربة وبروتوكول المياه اللازم للذوبان", "Specify mechanical incorporation depth and dissolution water application schedule"),
            ],
            difficulty: "advanced",
            minutes: 140,
            skills: ["Gypsum Calculations", "Sodic Reclamation", "Soil Amendments"],
            prerequisites: [t("كيمياء الصودية", "Sodicity chemistry")],
            task: t(
              "احسب الاحتياج الجبسي لـ 50 فدانًا ذات CEC = 18 meq/100g و ESP = 22% لخفض الـ ESP إلى 8% باستخدام جبس تجاري نقاوته 80%.",
              "Compute commercial gypsum tonnage (80% purity) for 50 acres with CEC=18 meq/100g and ESP=22% to reduce ESP to 8%.",
            ),
            promptFocus: t("حساب الاحتياج الجبسي واستصلاح الأراضي الصودية", "Gypsum requirement calculation and sodic soil reclamation"),
          },
          {
            id: "sw-t8",
            title: t("حساب الاحتياجات الغسيلية (Leaching Requirements) وتصميم الصرف", "Leaching requirements (LR) & agricultural drainage design"),
            summary: t(
              "معادلة الفاو (FAO) للاحتياج الغسيلي بناءً على ملوحة مياه الري ومتحمل المحصول للأملاح ($EC_e$)، وتصميم شبكات الصرف السطحي والمغطى.",
              "FAO leaching requirement formula based on irrigation water EC and crop salinity threshold, and subsurface drain spacing design.",
            ),
            why: t(
              "الغسيل بدون صرف فعال يؤدي إلى ارتفاع منسوب الماء الأرضي المالح وتمليح منطقة الجذور بالخاصية الشعرية.",
              "Leaching without functional drainage causes water table rise and secondary salinization via capillary rise.",
            ),
            outcomes: [
              t("حساب نسبة مياه الغسيل الإضافية وجدولة دورات الغسيل الموسمية", "Calculate additional leaching water fractions and schedule seasonal flushing cycles"),
              t("تحديد أعماق ومسافات مصارف الصرف المغطى لتصريف المياه المحملة بالأملاح", "Determine subsurface drain pipe spacing and depth to safely evacuate saline leachate"),
            ],
            difficulty: "advanced",
            minutes: 150,
            skills: ["Leaching Fraction", "Drainage Design", "Salinity Management"],
            prerequisites: [t("حسابات الاستصلاح", "Reclamation calculations")],
            task: t(
              "احسب نسبة الغسيل الإضافية لمحصول موالح ($EC_e$ الحرج = 1.7 dS/m) يروى بمياه بئر ملوحتها 1.2 dS/m مع رسم مقطع مصرف مغطى.",
              "Calculate leaching fraction for citrus (threshold ECe = 1.7 dS/m) irrigated with 1.2 dS/m well water and sketch a drain trench cross-section.",
            ),
            promptFocus: t("حساب الاحتياجات الغسيلية وتصميم الصرف الزراعي", "Leaching fraction calculations and agricultural drainage engineering"),
          },
        ],
      },
      {
        id: "sw-s5",
        order: 5,
        title: t("المرحلة 05 — الخرائط المكانية للخصوبة والجاهزية المهنية", "Stage 05 — Spatial Fertility Mapping & Career Readiness"),
        goal: t("رسم خرائط الخصوبة المكانية بـ QGIS وإعداد تقارير ملاءمة الأراضي واجتياز المقابلات.", "Generate spatial fertility maps with QGIS, write land evaluation studies and ace technical interviews."),
        topics: [
          {
            id: "sw-t9",
            title: t("رسم خرائط الخصوبة وتوزيع الملوحة ببرنامج QGIS", "Spatial fertility & salinity mapping using QGIS interpolation"),
            summary: t(
              "إدخال إحداثيات GPS وبيانات المعمل إلى QGIS، تطبيق خوارزميات الاستيفاء المكاني (IDW و Kriging)، وتوليد خرائط ملونة للملوحة والـ pH والمادة العضوية.",
              "Importing GPS coordinates and lab data into QGIS, running spatial interpolation (IDW / Ordinary Kriging), and producing fertility gradient maps.",
            ),
            why: t(
              "كبرى الشركات الزراعية لا تقبل جداول Excel ميتة؛ بل تطلب خرائط ملونة تفاعلية توجه الجرارات وفرق الاستصلاح في الحقل.",
              "Modern agribusiness demands visual spatial distribution maps to guide reclamation equipment rather than static spreadsheets.",
            ),
            outcomes: [
              t("إنشاء خرائط رقمية لتباين الملوحة والخصوبة مقسمة إلى فئات إدارية", "Generate high-resolution interpolated salinity and fertility maps classified into management zones"),
              t("تصدير خرائط العمل لتوجيه معدات نثر الجبس ومعدات التسوية الحقلية", "Export actionable GIS layers for variable-rate gypsum spreaders and scrapers"),
            ],
            difficulty: "advanced",
            minutes: 150,
            skills: ["QGIS", "Spatial Interpolation", "Kriging", "Digital Cartography"],
            prerequisites: [t("التحاليل المعملية", "Lab analytics")],
            task: t(
              "أدخل بيانات 30 نقطة فحص في ملف Excel إلى QGIS، وطبّق استيفاء IDW لإنتاج خريطة توزيع ملوحة التربة لمشروع استصلاح.",
              "Import a 30-sample coordinate sheet into QGIS and run IDW interpolation to produce an operational salinity contour map.",
            ),
            promptFocus: t("رسم خرائط خصوبة وملوحة التربة بـ QGIS", "Spatial soil fertility and salinity mapping in QGIS"),
          },
          {
            id: "sw-t10",
            title: t("إعداد دراسة ملاءمة الأراضي (Land Suitability) والتحضير للمقابلات", "Land suitability assessment report & technical interview preparation"),
            summary: t(
              "كتابة تقرير تقييم شامل وفق معايير FAO Land Evaluation لمشروع زراعي عملاق، والتدريب على أسئلة المقابلات الفنية في كبرى شركات الاستصلاح.",
              "Authoring an enterprise-grade FAO land evaluation report for agricultural projects, and mock technical interview training for reclamation firms.",
            ),
            why: t(
              "تقرير الملاءمة هو المستند الذي بناءً عليه تقرر البنوك والمستثمرون ضخ مئات الملايين لاستصلاح قطعة أرض أو رفضها.",
              "A land suitability study is the core document determining multimillion-dollar investment decisions in land reclamation.",
            ),
            outcomes: [
              t("إعداد تقرير فني متكامل يضم التحاليل الكيميائية والفيزيائية وخطة الاستصلاح والميزانية التقديرية", "Produce an investment-ready land suitability report including physics, chemistry, reclamation plan and CapEx"),
              t("إتقان الإجابة على الأسئلة الحسابية المعقدة في مقابلات كبرى شركات الاستصلاح الزراعي", "Flawlessly answer complex numerical and chemical questions in top-tier reclamation firm hiring interviews"),
            ],
            difficulty: "advanced",
            minutes: 160,
            skills: ["Land Evaluation", "Technical Reporting", "Technical Interview"],
            prerequisites: [t("مراحل 1-4", "Stages 1-4")],
            task: t(
              "أجرِ محاكاة مقابلة عمل فنية لوظيفة استشاري أراضٍ واستصلاح مع المرشد الذكي تغطي تشخيص تربة صودية جيرية وتصميم خطة غسيلها.",
              "Execute a mock technical interview for a Senior Land Reclamation Consultant role addressing a calcareous-sodic soil challenge with the AI mentor.",
            ),
            promptFocus: t("مقابلات مهندس أراضٍ واستصلاح", "Soil specialist and land reclamation technical hiring interviews"),
          },
        ],
      },
    ],
    projects: [
      {
        id: "sw-p1",
        title: t("تحليل ملوحة التربة في حقل زراعي", "Analyse soil salinity in a field"),
        level: "intermediate",
        objective: t("رسم خريطة توزيع الملوحة وتحديد المناطق الحرجة.", "Map salinity distribution and flag critical zones."),
        problem: t("موت شتلات متكرر في أطراف الحقل.", "Repeated seedling death at the field edges."),
        skills: ["Soil Analysis", "EC/pH", "Excel", "GIS"],
        tools: ["Lab data", "Excel", "QGIS"],
        steps: [
          t("سحب 12 عينة على شبكة", "Collect 12 grid samples"),
          t("تحليل EC وترتيب النتائج", "Analyse EC and tabulate results"),
          t("رسم خريطة توزيع", "Map the distribution"),
        ],
        deliverables: [t("خريطة ملوحة + توصيات", "Salinity map + recommendations")],
        portfolio: t("قدّمه كحالة تشخيص حقلي.", "Present it as a field diagnosis case."),
      },
    ],
  },

  /* ─────────────────────────── 3. Plant Protection ───────────────────────── */
  {
    id: "plant-protection",
    name: t("أمراض النبات ووقاية المحاصيل", "Plant Diseases & Plant Protection"),
    tagline: t("تشخيص دقيق ومكافحة متكاملة", "Accurate diagnosis, integrated control"),
    description: t(
      "تشخيص الأمراض والآفات في الحقل، الإدارة المتكاملة، المكافحة الحيوية والكيميائية، وإدارة المقاومة. مطلوب في شركات المبيدات والإنتاج والتصدير.",
      "Field diagnosis of diseases and pests, integrated pest management, biological and chemical control and resistance management. In demand with crop-protection, production and export companies.",
    ),
    icon: "Bug",
    difficulty: "intermediate",
    hours: 150,
    demand: 4,
    skills: ["Diagnosis", "IPM", "Scouting", "Pesticides", "Biological Control"],
    tools: ["Hand lens", "Scouting sheets", "Spray calculators", "Field apps"],
    topicsPool: [
      t("أمراض النبات", "Plant pathology"),
      t("تشخيص الأمراض", "Disease diagnosis"),
      t("تعريف الآفات", "Pest identification"),
      t("الإدارة المتكاملة للآفات", "Integrated pest management"),
      t("المكافحة الحيوية", "Biological control"),
      t("المكافحة الكيميائية", "Chemical control"),
      t("المسح الحقلي", "Field scouting"),
      t("إدارة المقاومة", "Resistance management"),
    ],
    roles: [
      {
        id: "crop-protection-advisor",
        title: t("مستشار وقاية محاصيل", "Crop Protection Advisor"),
        description: t(
          "يزور المزارع، يشخّص المشكلة، ويكتب برنامج مكافحة آمنًا وفعّالًا.",
          "Visits farms, diagnoses problems and writes a safe, effective control programme.",
        ),
        responsibilities: [
          t("مسح حقلي دوري", "Routine field scouting"),
          t("كتابة برامج رش بجرعات صحيحة", "Write spray programmes with correct rates"),
        ],
        skills: ["Diagnosis", "IPM", "Pesticides"],
        tools: ["Hand lens", "Spray calculators"],
        entry: t("تشخيص 20 مرضًا وآفة شائعة", "Diagnose 20 common pests and diseases"),
        senior: t("إدارة مقاومة وبرامج موسمية كاملة", "Resistance management and full-season programmes"),
      },
    ],
    mentorPersona: t(
      "أنت أخصائي وقاية نبات أول قضى سنوات في المسح الحقلي والتشخيص.",
      "You are a senior plant-protection specialist with years of field scouting and diagnosis.",
    ),
    stages: [
      {
        id: "pp-s1",
        order: 1,
        title: t("المرحلة 01 — التشخيص الحقلي للآفات والأمراض والمسببات", "Stage 01 — Field Diagnosis & Etiology"),
        goal: t("التشخيص الميداني الفوري والتفريق بين الإصابات الحيوية والأضرار الفسيولوجية.", "Master immediate field diagnosis and separate biotic pathogens from abiotic disorders."),
        topics: [
          {
            id: "pp-t1",
            title: t("مثلث المرض والأعراض والتمييز بين الأضرار الحيوية والفسيولوجية", "Disease triangle, symptoms vs signs & abiotic disorder differentiation"),
            summary: t(
              "العائل والبيئة والممرض، الفرق بين العرض والعلامة، والتفريق الحاسم بين أعراض نقص العناصر والسمية وضربات الشمس وبين الإصابات الفطرية والبكتيرية والفيروسية.",
              "Host, pathogen and environmental triangle, signs vs symptoms, and differentiating nutrient deficiencies/sunscald from fungal, bacterial and viral diseases.",
            ),
            why: t(
              "أكثر من 50% من تكاليف الرش تُهدر هباءً بسبب رش مبيدات فطرية على أعراض سببها ملوحة أو نقص كالسيوم أو إجهاد حراري.",
              "Over 50% of spray budgets are squandered spraying fungicides on physiological leaf scorch caused by salinity or heat stress.",
            ),
            outcomes: [
              t("التمييز الميداني بالعدسة المكبرة بين اللفحات الفطرية والتلطخات البكتيرية", "Field diagnosis of fungal blights vs bacterial leaf spots using a 20x hand lens"),
              t("استبعاد الأسباب الفسيولوجية قبل التوصية بأي معاملة كيميائية", "Rule out abiotic stressors before prescribing any chemical intervention"),
            ],
            difficulty: "beginner",
            minutes: 90,
            skills: ["Field Diagnosis", "Plant Pathology"],
            prerequisites: [t("لا يوجد", "None")],
            task: t(
              "افحص 5 عينات نباتية مصابة واكتب تقرير تشخيص يوضح: هل السبب فطري، بكتيري، فيروسي، أم فسيولوجي؟ مع الدليل.",
              "Inspect 5 diseased crop samples and write a diagnosis memo classifying each as fungal, bacterial, viral or physiological with evidence.",
            ),
            promptFocus: t("تشخيص أمراض النبات الميداني", "Field diagnosis of plant diseases and abiotic disorders"),
          },
          {
            id: "pp-t2",
            title: t("مورفولوجيا الآفات الحشرية والأكاروسية وأطوارها الضارة", "Agricultural entomology, mite morphology & life cycles"),
            summary: t(
              "الآفات الثاقبة الماصة (التربس، الذبابة البيضاء، المن، الجاسيد)، الآفات القارضة (توتا أبسوليوتا، دودة الحشد)، وأكاروسات الصدأ والعنكبوت الأحمر.",
              "Piercing-sucking pests (thrips, whiteflies, aphids, jassids), chewing lepidoptera (Tuta absoluta, fall armyworm), and rust/spider mites.",
            ),
            why: t(
              "معرفة الطور الضار (يرقة، حورية، حشرة كاملة) وموقع وضع البيض يحدد التوقيت الصحيح للتدخل قبل استفحال الضرر.",
              "Knowing the vulnerable instar and egg placement dictates the exact timing of control before irreparable economic damage occurs.",
            ),
            outcomes: [
              t("التعرف على أطوار الحشرات والأكاروسات وأعراض الإصابة المميزة لكل آفة", "Identify insect/mite developmental stages and characteristic damage signatures"),
              t("فحص الجوانب السفلية للأوراق والبراعم بالعدسة المكبرة لرصد البيض والفقس", "Inspect abaxial leaf surfaces and apical buds with a hand lens to detect egg hatch"),
            ],
            difficulty: "beginner",
            minutes: 90,
            skills: ["Agricultural Entomology", "Acarology", "Scouting"],
            prerequisites: [t("أساسيات التشخيص", "Diagnosis basics")],
            task: t(
              "حدد نوعين من الحشرات الثاقبة الماصة ونوعين من صانعات الأنفاق في محصولك ووثق أطوار حياتها الحقلية.",
              "Identify 2 piercing-sucking pests and 2 leafminers in your target crop and document their field life stages.",
            ),
            promptFocus: t("حشرات وآفات المحاصيل الزراعية", "Crop insect pests and mite identification"),
          },
        ],
      },
      {
        id: "pp-s2",
        order: 2,
        title: t("المرحلة 02 — الاستكشاف الحقلي والعتبات الاقتصادية (IPM Scouting)", "Stage 02 — Systematic Field Scouting & Action Thresholds"),
        goal: t("بناء بروتوكول استكشاف حقلي منتظم وحساب العتبات الاقتصادية للتدخل.", "Master systematic scouting patterns, trap grids and economic intervention thresholds."),
        topics: [
          {
            id: "pp-t3",
            title: t("منهجية المسح الحقلي وشبكات المصائد الفرمونية واللاصقة", "Field scouting methodology & trap monitoring networks"),
            summary: t(
              "أنماط السير الحقلية (W و X)، عدد نقاط الفحص لكل فدان، تركيب وقراءة المصائد الفرمونية والمصائد الصفراء والزرقاء اللاصقة وتوثيق النتائج في سجلات رقمية.",
              "Field walking patterns (W & X routes), sample points per acre, pheromone and chromatic sticky trap grid setups and digital logging.",
            ),
            why: t(
              "الشركات الزراعية الكبرى تقيس كفاءة مهندس الوقاية بقدرته على اكتشاف البؤر الأولى للإصابة قبل انتشارها في المزرعة.",
              "Commercial mega-farms judge crop protection managers by their ability to detect primary hot spots before pest outbreaks explode.",
            ),
            outcomes: [
              t("تصميم شبكة مصائد استكشافية وتحديد كثافة الفحص لكل حوض زراعي", "Design an early detection trap grid and establish inspection frequencies per sector"),
              t("إعداد تقرير مسح حقلي أسبوعي ببيانات كمية ورسوم بيانية للإدارة", "Produce weekly quantitative scouting reports with infestation heatmaps for management"),
            ],
            difficulty: "intermediate",
            minutes: 110,
            skills: ["Field Scouting", "Trap Monitoring", "Data Logging"],
            prerequisites: [t("التعرف على الآفات", "Pest identification")],
            task: t(
              "صمم خطة مسح حقلي لمزرعة 100 فدان طماطم أو موالح تحدد فيها نقاط الفحص والمصائد الفرمونية واللاصقة.",
              "Design a field scouting protocol for a 100-acre citrus or tomato farm detailing inspection checkpoints and trap arrays.",
            ),
            promptFocus: t("المسح والاستكشاف الحقلي للآفات", "Agricultural field scouting and trap monitoring networks"),
          },
          {
            id: "pp-t4",
            title: t("العتبة الاقتصادية للتدخل (ET) ونماذج درجات الحرارة المتراكمة", "Economic thresholds (ET / EIL) & degree-day predictive modeling"),
            summary: t(
              "حساب الحد الاقتصادي الحرج (ET) والحد الحرج للضرر (EIL)، وربط درجات الحرارة المتراكمة (Degree-Days) بالتنبؤ بفقس بيض دودة ثمار الطماطم وذبابة الفاكهة.",
              "Calculating Economic Injury Levels (EIL) and Economic Thresholds (ET), and using degree-day biofix models to predict moth and fruit fly flight peaks.",
            ),
            why: t(
              "الرش قبل وصول الآفة للعتبة الاقتصادية خسارة مادية وقتل للأعداء الحيوية، والرش بعد فوات الأوان خسارة للمحصول.",
              "Spraying below threshold wastes capital and kills beneficials; spraying too late causes irreversible yield destruction.",
            ),
            outcomes: [
              t("اتخاذ قرار التدخل (رش كيميائي / إطلاق أعداء حيوية) بناءً على الأرقام الحقيقية وليس التخمين", "Make data-backed intervention decisions based on calculated injury thresholds rather than guesswork"),
              t("التنبؤ بميعاد ذروة خروج اليرقات للرش في الوقت الأكثر حساسية", "Forecast larval emergence peaks using degree-day biofixes to target the most vulnerable stage"),
            ],
            difficulty: "intermediate",
            minutes: 120,
            skills: ["Economic Thresholds", "Biofix Modeling", "Decision Making"],
            prerequisites: [t("المسح الحقلي", "Field scouting")],
            task: t(
              "لحقل ذرة مصاب بدودة الحشد الخريفية: احسب نسبة النباتات المصابة وقارنها بالعتبة الاقتصادية لتحديد قرار الرش.",
              "For a corn field infested with Fall Armyworm: calculate infestation percentage and evaluate against economic threshold for spray decision.",
            ),
            promptFocus: t("العتبة الاقتصادية للتدخل في مكافحة الآفات", "Economic injury thresholds and degree-day predictive modeling"),
          },
        ],
      },
      {
        id: "pp-s3",
        order: 3,
        title: t("المرحلة 03 — المكافحة الحيوية والبيولوجية والممارسات الزراعية", "Stage 03 — Biological Control, Biopesticides & Cultural Tactics"),
        goal: t("إتقان إطلاق الأعداء الحيوية، المبيدات البيولوجية، والمكافحة المستدامة.", "Master beneficial insect releases, microbial biopesticides and mating disruption."),
        topics: [
          {
            id: "pp-t5",
            title: t("المفترسات والطفيليات التجارية (Phytoseiulus, Orius, Trichogramma)", "Commercial beneficials: predatory mites, Orius & parasitoids"),
            summary: t(
              "بروتوكولات إطلاق المفترس الأكاروسي (*Phytoseiulus persimilis*) ضد العنكبوت الأحمر، البق المفترس (*Orius*) ضد التربس، وطفيليات التريكوجراما لدودة الثمار.",
              "Release protocols for Phytoseiulus against spider mites, Orius bugs for thrips, and Trichogramma wasps for lepidopteran eggs.",
            ),
            why: t(
              "مزارع التصدير الحديثة تعتمد بنسبة 80% على المكافحة الحيوية لتفادي مشكلات متبقيات المبيدات وظهور أجيال مقاومة.",
              "Export farms rely up to 80% on biological control to eliminate chemical residues and bypass acaricide resistance.",
            ),
            outcomes: [
              t("حساب معدلات وتوقيتات إطلاق المفترسات الحيوية لكل متر مربع", "Calculate commercial predator release rates and timing per m²"),
              t("الحفاظ على حيوية الأعداء الحيوية وتوفير الغذاء التكميلي (Nutrimite) عند انخفاض الفريسة", "Maintain predator population stability with supplemental pollen feed during low pest densities"),
            ],
            difficulty: "intermediate",
            minutes: 110,
            skills: ["Biological Control", "Biocontrol Augmentation"],
            prerequisites: [t("بيولوجيا الآفات", "Pest biology")],
            task: t(
              "ضع برنامج إطلاق أعداء حيوية متكامل (المفترس الأكاروسي + الأوريوس) لصوبة فلفل حلو على مدار 12 أسبوعاً.",
              "Formulate a 12-week biological predator release program (Phytoseiulus + Orius) for a commercial sweet pepper greenhouse.",
            ),
            promptFocus: t("المكافحة الحيوية وإطلاق المفترسات في الزراعة", "Commercial biological control and beneficial insect releases"),
          },
          {
            id: "pp-t6",
            title: t("المبيدات الميكروبية، المستخلصات الطبيعية والتشويش الجنسي", "Microbial biopesticides, botanicals & mating disruption"),
            summary: t(
              "استخدام بكتيريا *Bacillus thuringiensis* (Bt)، وفطريات *Beauveria bassiana*، زيوت النيم والأملاح البوتاسية، وحبال الفرمونات للتشويش التزاوجي (Mating Disruption).",
              "Deploying Bacillus thuringiensis (Bt), Beauveria bassiana entomopathogenic fungi, neem azadirachtin, and pheromone dispensers for mating disruption.",
            ),
            why: t(
              "المبيدات البيولوجية ليس لها فترة أمان (PHI = 0 days)، وهي الأداة الأساسية للرش أثناء فترات الجني والحصاد اليومي.",
              "Microbial biopesticides have zero PHI, making them the indispensable weapon during active harvest weeks.",
            ),
            outcomes: [
              t("اختيار وتطبيق المبيد الحيوي المناسب للطور اليرقي وتوفير ظروف الرطوبة اللازمة لإنبات الفطر الممرض", "Apply microbial biopesticides under optimal humidity and UV conditions for maximum infection rates"),
              t("توزيع موزعات التشويش الجنسي لسوسة النخيل الحمراء وتوتا أبسوليوتا وخفض معدلات التزاوج", "Deploy mating disruption pheromone dispensers to collapse mating success in Tuta absoluta and Red Palm Weevil"),
            ],
            difficulty: "intermediate",
            minutes: 100,
            skills: ["Biopesticides", "Mating Disruption", "IPM Tactics"],
            prerequisites: [t("المكافحة الحيوية", "Biological control")],
            task: t(
              "صمم استراتيجية تشويش تزاوجي باستخدام الفرمونات لمزرعة نخيل 50 فدانًا ضد سوسة النخيل الحمراء.",
              "Design a pheromone mating disruption grid across a 50-acre date palm plantation against Red Palm Weevil.",
            ),
            promptFocus: t("المبيدات الحيوية والتشويش الفرموني", "Biopesticides and pheromone mating disruption in IPM"),
          },
        ],
      },
      {
        id: "pp-s4",
        order: 4,
        title: t("المرحلة 04 — كيمياء المبيدات، تكنولوجيا الرش، وإدارة المقاومة", "Stage 04 — Pesticide Chemistry, Spray Physics & Resistance Management"),
        goal: t("إتقان ميكانيكية عمل المبيدات (IRAC/FRAC)، معايرة آلات الرش، ومنع تكون سلالات مقاومة.", "Master IRAC/FRAC modes of action, sprayer calibration, droplet sizing and anti-resistance strategies."),
        topics: [
          {
            id: "pp-t7",
            title: t("ميكانيكية عمل المبيدات وتصنيفات IRAC / FRAC / HRAC", "Modes of action (IRAC/FRAC/HRAC) & cross-resistance mitigation"),
            summary: t(
              "تصنيف المبيدات حسب طريقة التأثير: مثبطات قنوات الصوديوم، الأسيتيل كولين إستراز، تخليق الدهون، وتثيط التنفس الميتوكوندري، وتصميم برامج التناوب الإلزامي.",
              "Classifying active ingredients by biochemical target: sodium channel modulators, AChE inhibitors, lipid synthesis inhibitors and mitochondrial respiration blockers.",
            ),
            why: t(
              "تكرار الرش بنفس المجموعة الكيميائية يولد مناعة وراثية للآفة تجعل المبيد عديم الفائدة وتتسبب في خسائر فادحة.",
              "Repeated applications of the same chemical mode of action breed genetic resistance, rendering multimillion-dollar chemicals ineffective.",
            ),
            outcomes: [
              t("قراءة كود IRAC و FRAC على العبوات وبناء جدول تدوير كيميائي صارم", "Read IRAC/FRAC codes on labels and construct a strict mode-of-action rotation matrix"),
              t("منع المقاومة المتصالبة (Cross-Resistance) بين المبيدات ذات التأثير المتشابه", "Prevent cross-resistance between seemingly different commercial brands sharing the same group"),
            ],
            difficulty: "advanced",
            minutes: 130,
            skills: ["Pesticide Chemistry", "IRAC / FRAC", "Resistance Management"],
            prerequisites: [t("كيمياء عامة", "General chemistry")],
            task: t(
              "ابنِ جدول تدوير مجموعات كيميائية لمكافحة الذبابة البيضاء في محصول خيار يضمن عدم تكرار نفس كود IRAC لأكثر من جيلين.",
              "Build a mode-of-action rotation matrix for whitefly in cucumber ensuring no IRAC group is repeated within two consecutive generations.",
            ),
            promptFocus: t("إدارة مقاومة المبيدات وتصنيف IRAC و FRAC", "Pesticide resistance management and IRAC/FRAC classifications"),
          },
          {
            id: "pp-t8",
            title: t("هندسة ومعايرة الرش: اختيار الفوهات، حجم القطرات (VMD) وضبط pH مياه الرش", "Spray mechanics: nozzle selection, droplet spectrum (VMD) & tank mix water chemistry"),
            summary: t(
              "أنواع الفوهات (Hollow cone للمبيدات الحشرية والفطرية vs Flat fan للحشائش)، حجم القطرات وتجنب الانجراف (Drift)، ومعايرة معدل التدفق، وتأثير قلوية المياه على تحلل المبيدات.",
              "Nozzle hydraulics (hollow cone for insecticides/fungicides vs flat fan for herbicides), VMD droplet spectrum, drift reduction, flow calibration, and water pH buffering.",
            ),
            why: t(
              "ماء الرش القلوي ($pH > 7.5$) يكسر المادة الفعالة خلال 30 دقيقة بالتحلل المائي؛ ورش قطرات غير متجانسة يهدر 40% من المبيد.",
              "Alkaline spray water ($pH > 7.5$) hydrolyzes organophosphates and pyrethroids within 30 minutes; poor droplets waste 40% of spray to drift.",
            ),
            outcomes: [
              t("معايرة آلة الرش (البوم سبرير أو الرشاش الهوائي) وضبط ضغط التشغيل وسرعة الجرار", "Calibrate boom and air-blast sprayers, optimizing ground speed and pressure"),
              t("استخدام أوراق الكشف الحساسة للماء (Water Sensitive Paper) للتأكد من التغطية المثالية على السطح السفلي للأوراق", "Verify droplet density and underside leaf canopy penetration using water-sensitive paper cards"),
            ],
            difficulty: "advanced",
            minutes: 140,
            skills: ["Sprayer Calibration", "Spray Physics", "Water Buffering"],
            prerequisites: [t("كيمياء المبيدات", "Pesticide chemistry")],
            task: t(
              "احسب معدل تدفق الفوهة (L/min) لجرار يسير بسرعة 6 كم/ساعة لرش 400 لتر/فدان بمسافة 50 سم بين الفوهات، وحدد الـ pH المستهدف للمحلول.",
              "Calculate nozzle flow rate (L/min) for a tractor at 6 km/h delivering 400 L/acre with 50cm nozzle spacing, and set target water mix pH.",
            ),
            promptFocus: t("معايرة آلات الرش وتكنولوجيا التطبيق", "Agricultural sprayer calibration and droplet physics"),
          },
        ],
      },
      {
        id: "pp-s5",
        order: 5,
        title: t("المرحلة 05 — معايير التصدير، إدارة MRL، والجاهزية لسوق العمل", "Stage 05 — Export Compliance, MRL Limits & Career Readiness"),
        goal: t("إدارة فترات الأمان PHI والحدود القصوى للمتبقيات MRL واجتياز مقابلات كبرى الشركات التصديرية.", "Master pre-harvest intervals, EU MRL compliance, GlobalG.A.P audits and multinational hiring interviews."),
        topics: [
          {
            id: "pp-t9",
            title: t("فترات ما قبل الحصاد (PHI) وقواعد بيانات متبقيات المبيدات (EU MRLs)", "Pre-harvest intervals (PHI), EU MRL database & zero-residue management"),
            summary: t(
              "التعامل مع قاعدة بيانات الاتحاد الأوروبي للمبيدات (EU Pesticides Database)، حساب فترات الأمان التصديرية، وتصميم استراتيجيات خلو الشحنات من المتبقيات.",
              "Navigating the official EU Pesticides Database, computing export PHIs, and designing zero-detectable residue protocols for supermarket retail chains.",
            ),
            why: t(
              "ظهور أثر لمبيد محظور في تحليل عشوائي بميناء أوروبي يؤدي إلى إعدام الشحنة فوراً، وفرض غرامات بآلاف اليوروهات، وحظر المزرعة بالكامل.",
              "A single non-compliant residue detection at an EU port triggers immediate cargo destruction, severe penalties and commercial export blacklisting.",
            ),
            outcomes: [
              t("استخراج أحدث حدود MRL لأي محصول مستهدف في الأسواق الأوروبية والبريطانية والخليجية", "Extract up-to-date MRL tolerances for European, UK and Gulf destination markets"),
              t("تحديد موعد التوقف الإلزامي عن الرش الكيميائي والتحول الكامل للمبيدات البيولوجية قبل الحصاد", "Schedule the cutoff date for synthetic chemistries and switch to biologicals prior to harvest"),
            ],
            difficulty: "advanced",
            minutes: 130,
            skills: ["MRL Compliance", "Export Regulations", "PHI Management"],
            prerequisites: [t("كيمياء المبيدات", "Pesticide chemistry")],
            task: t(
              "افحص قاعدة بيانات الاتحاد الأوروبي واستخرج الـ MRL لـ 5 مبيدات شائعة في العنب أو الفراولة، وحدد برنامج الرش المناسب قبل 15 يوماً من الجمع.",
              "Query the EU database for MRLs of 5 major grape/strawberry chemicals and construct a compliant 15-day pre-harvest spray plan.",
            ),
            promptFocus: t("إدارة متبقيات المبيدات والتصدير MRL و PHI", "Pesticide MRL compliance, EU regulations and export PHI"),
          },
          {
            id: "pp-t10",
            title: t("بروتوكول المكافحة الموسمي الشامل والتحضير لمقابلات كبرى الشركات", "Full-season IPM protocol, GlobalG.A.P audit & technical interview prep"),
            summary: t(
              "تجميع ملف بورتفوليو مهني يتضمن برنامج مكافحة متكامل لموسم كامل، استيفاء سجلات GlobalG.A.P لسلامة المحاصيل، ومحاكاة المقابلات الفنية في كبرى الشركات الزراعية العالمية.",
              "Assembling a professional IPM portfolio, fulfilling GlobalG.A.P plant protection recordkeeping, and rehearsing technical hiring interviews with multinational agri-firms.",
            ),
            why: t(
              "المشاريع الكبرى وشركات مثل Bayer و Syngenta تبحث عن مهندس يمتلك عقيدة IPM كاملة ويدير الأزمات الحقلية بثقة علمية.",
              "Mega-farms and multinational leaders like Bayer and Syngenta recruit agronomists who embody rigorous IPM principles and handle field emergencies.",
            ),
            outcomes: [
              t("ملف بورتفوليو معتمد يثبت قدرتك على حماية مزارع بآلاف الأفدنة بأعلى جودة وأقل تكلفة متبقيات", "A verified portfolio demonstrating capability to protect thousand-acre operations while safeguarding export compliance"),
              t("إتقان إجابات أسئلة المقابلات الفنية المعقدة في التشخيص وإدارة المقاومة والرش", "Flawlessly answer complex technical interview questions on field etiology, resistance management and spray physics"),
            ],
            difficulty: "advanced",
            minutes: 150,
            skills: ["Portfolio", "GlobalG.A.P", "Technical Interview"],
            prerequisites: [t("مراحل 1-4", "Stages 1-4")],
            task: t(
              "أجرِ محاكاة مقابلة عمل فنية لوظيفة مدير وقاية محصول لمزرعة تصديرية مع المرشد الذكي تغطي أزمة ظهور مقاومة حادة للعنكبوت الأحمر.",
              "Execute a mock technical interview for a Crop Protection Manager role handling acute acaricide resistance in an export farm with the AI mentor.",
            ),
            promptFocus: t("مقابلات مهندس وقاية نبات ومكافحة آفات", "Crop Protection and IPM Manager technical hiring interviews"),
          },
        ],
      },
    ],
    projects: [
      {
        id: "pp-p1",
        title: t("خطة إدارة متكاملة لآفة", "Integrated management plan for one pest"),
        level: "intermediate",
        objective: t("تقليل الإصابة بأقل استخدام كيميائي.", "Reduce infestation with minimal chemical use."),
        problem: t("مقاومة متزايدة بعد رش متكرر بنفس المادة.", "Growing resistance after repeated sprays of the same active."),
        skills: ["IPM", "Biological Control", "Pesticides"],
        tools: ["Scouting sheets", "Excel"],
        steps: [
          t("توثيق تاريخ الرش", "Document spray history"),
          t("بناء برنامج بديل بالتدوير", "Build a rotation-based alternative"),
        ],
        deliverables: [t("برنامج موسمي + مبررات", "Season programme + justification")],
        portfolio: t("أضفه كحالة إدارة مقاومة.", "Add it as a resistance-management case."),
      },
    ],
  },

  /* ─────────────────────────── 4. Hydroponics ─────────────────────────────── */
  {
    id: "hydroponics",
    name: t("الزراعة المائية بدون تربة", "Hydroponics & Soilless Agriculture"),
    tagline: t("محاليل مغذية وأنظمة وتشخيص سريع", "Nutrient solutions, systems and fast troubleshooting"),
    description: t(
      "تصميم وتشغيل أنظمة الزراعة بدون تربة: المحاليل المغذية، EC و pH، إدارة المياه، اختيار المحاصيل وحل المشكلات. مطلوب في المشاريع المحمية الحديثة.",
      "Design and operate soilless systems: nutrient solutions, EC and pH, water management, crop selection and troubleshooting. In demand across modern protected-agriculture projects.",
    ),
    icon: "Droplets",
    difficulty: "intermediate",
    hours: 140,
    demand: 4,
    skills: ["Nutrient Solutions", "EC/pH", "System Design", "Troubleshooting"],
    tools: ["EC/pH meters", "Dosing systems", "Excel nutrient calculators"],
    topicsPool: [
      t("أنظمة الزراعة المائية", "Hydroponic systems"),
      t("المحاليل المغذية", "Nutrient solutions"),
      t("EC", "EC"),
      t("pH", "pH"),
      t("إدارة المياه", "Water management"),
      t("تصميم الأنظمة", "System design"),
      t("اختيار المحاصيل", "Crop selection"),
      t("حل المشكلات", "Troubleshooting"),
    ],
    roles: [
      {
        id: "hydroponics-grower",
        title: t("مسؤول تشغيل زراعة مائية", "Hydroponics Grower / Operator"),
        description: t(
          "يدير المحلول المغذي والبيئة اليومية ويحقق إنتاجية ثابتة.",
          "Manages the nutrient solution and daily environment to hit consistent yields.",
        ),
        responsibilities: [
          t("قياس ومعايرة EC وpH يوميًا", "Measure and correct EC and pH daily"),
          t("تشخيص أعراض نقص العناصر", "Diagnose nutrient deficiency symptoms"),
        ],
        skills: ["Nutrient Solutions", "EC/pH", "Troubleshooting"],
        tools: ["EC/pH meters", "Dosing systems"],
        entry: t("تحضير محلول مغذٍ صحيح", "Prepare a correct nutrient solution"),
        senior: t("تصميم نظام كامل وحساب تكاليفه", "Design a full system and cost it"),
      },
    ],
    mentorPersona: t(
      "أنت مدير إنتاج زراعة مائية شغّل مشاريع تجارية كبيرة.",
      "You are a hydroponics production manager who has run large commercial projects.",
    ),
    stages: [
      {
        id: "hy-s1",
        order: 1,
        title: t("المرحلة 01 — كيمياء المياه وفيزيولوجيا الجذور", "Stage 01 — Water Chemistry & Rootzone Physiology"),
        goal: t("إتقان تحليل المياه الخام ومحددات الزراعة المائية وتوفير بيئة جذرية مثالية.", "Master raw water analysis, hydroponic constraints and ideal rootzone aeration."),
        topics: [
          {
            id: "hy-t1",
            title: t("تحليل المياه الخام ومحددات الصلاحية (EC/pH/Bicarbonates)", "Raw water analysis: EC, pH, bicarbonates & toxic ions"),
            summary: t(
              "تقييم مياه الري للمزارع المائية: الملوحة المبدئية، البيكربونات والقلوية، الصوديوم والكلوريد والبورون السام.",
              "Evaluating irrigation water for soilless culture: baseline EC, bicarbonate alkalinity, sodium, chloride and boron thresholds.",
            ),
            why: t(
              "استخدام مياه غير صالحة أو غنية بالصوديوم يؤدي إلى تراكم الأملاح السامة في الأنظمة المغلقة وفشل المحصول.",
              "Using unsuitable raw water high in sodium causes toxic ion buildup in closed loops, destroying crop vigor.",
            ),
            outcomes: [
              t("قراءة تقرير تحليل مياه خام وتحديد كمية الحمض اللازمة لمعادلة البيكربونات", "Read raw water reports and compute acid required to neutralize bicarbonates"),
              t("اتخاذ قرار استخدام محطة تناضح عكسي (RO) من عدمه", "Decide whether reverse osmosis (RO) desalination is economically required"),
            ],
            difficulty: "beginner",
            minutes: 90,
            skills: ["Water Quality", "Salinity", "Hydroponics Basics"],
            prerequisites: [t("لا يوجد", "None")],
            task: t(
              "حلل تقرير مياه بئر (EC=1.8, HCO3=220 ppm, Na=90 ppm) واكتب تقييم صلاحيته لنظام NFT خس.",
              "Analyze a well water report (EC=1.8, HCO3=220 ppm, Na=90 ppm) and write a suitability verdict for NFT lettuce.",
            ),
            promptFocus: t("تحليل مياه الزراعة المائية", "Hydroponic raw water analysis and treatment"),
          },
          {
            id: "hy-t2",
            title: t("الأكسجين الذائب (DO) وحرارة المحلول وتنفس الجذور", "Dissolved oxygen (DO), solution temperature & root respiration"),
            summary: t(
              "العلاقة بين حرارة المحلول المغذي والأكسجين الذائب (DO > 6-8 mg/L)، تأثير درجات الحرارة فوق 24°C على موت الشعيرات الجذرية.",
              "Correlation between nutrient temperature and dissolved oxygen, and how temperatures above 24°C trigger root asphyxiation.",
            ),
            why: t(
              "انخفاض الأكسجين الذائب هو السبب رقم 1 للإصابة بفطر البيثيوم (عفن الجذور) وتوقف امتصاص الفوسفور والحديد.",
              "Low DO is the primary catalyst for Pythium root rot outbreaks and blocks active uptake of phosphorus and iron.",
            ),
            outcomes: [
              t("تصميم شبكات تهوية المحلول وحواقن الفنتوري وحساب سعة مبردات المياه (Chillers)", "Design aeration manifolds, venturi injectors and size water chillers"),
              t("الحفاظ على قراءة DO ثابتة أعلى من 7 ppm في أشد أوقات الصيف", "Maintain stable DO above 7 ppm even during peak summer ambient heat"),
            ],
            difficulty: "beginner",
            minutes: 80,
            skills: ["Rootzone Management", "Aeration", "Water Cooling"],
            prerequisites: [t("كيمياء المياه", "Water chemistry")],
            task: t(
              "صمم نظام تبريد وتهوية لمحلول مغذي في خزان 5000 لتر في بيئة صحراوية صيفية.",
              "Design an aeration and chiller loop for a 5000 L reservoir in a hot summer desert greenhouse.",
            ),
            promptFocus: t("الأكسجين الذائب وتبريد المحلول المغذي", "Dissolved oxygen and nutrient chilling in hydroponics"),
          },
        ],
      },
      {
        id: "hy-s2",
        order: 2,
        title: t("المرحلة 02 — هندسة الأنظمة والوسائط البديلة", "Stage 02 — Systems & Substrates Engineering"),
        goal: t("اختيار وتصميم النظام والبيئة الصلبة المناسبة لطبيعة المحصول.", "Engineer NFT, DWC, and substrate drip systems tailored to specific crops."),
        topics: [
          {
            id: "hy-t3",
            title: t("مقارنة أنظمة NFT و DWC والداتش باكت ومحاذيرها", "Engineering NFT, DWC and Dutch bucket systems"),
            summary: t(
              "حسابات ميل القنوات (1:30 إلى 1:40)، معدلات التدفق (1-2 لتر/دقيقة لكل قناة)، ومقارنة الأنظمة المغلقة والمفتوحة.",
              "Channel slope calculations (1:30 to 1:40), flow rates (1-2 L/min per gully), and open vs closed loop hydraulics.",
            ),
            why: t(
              "اختيار نظام خاطئ (مثل زراعة الطماطم في قنوات NFT صغيرة) يسبب انسداد الجذور وغرق القنوات وخسارة المشروع.",
              "Choosing the wrong system (e.g. growing heavy tomatoes in small NFT gullies) chokes channels and collapses yields.",
            ),
            outcomes: [
              t("حساب أقطار المواسير وتدفق الطلمبات وضغوط التشغيل", "Size pipe diameters, pump flow rates and operating heads"),
              t("اختيار النظام المتطابق مع فسيولوجيا المحصول وحجم المجموع الجذري", "Match system geometry to crop rooting volume and growth cycle"),
            ],
            difficulty: "intermediate",
            minutes: 110,
            skills: ["System Design", "Hydraulics", "Facility Sizing"],
            prerequisites: [t("فيزيولوجيا الجذور", "Rootzone physiology")],
            task: t(
              "ارسم مخطط شبكة ري وصرف لنظام NFT يضم 40 قناة بطول 12 متراً مع حساب حجم الطلمبة والخزان.",
              "Draft an irrigation and return schematic for 40 NFT gullies of 12m length, sizing the pump and catchment tank.",
            ),
            promptFocus: t("تصميم وهندسة أنظمة الزراعة المائية", "Engineering hydroponic NFT and substrate systems"),
          },
          {
            id: "hy-t4",
            title: t("وسائط النمو البديلة: الصوف الصخري والكوكوبيت والبيرلايت", "Substrates: Rockwool slabs, coco coir & perlite dynamics"),
            summary: t(
              "مقارنة الخصائص الفيزيائية: السعة الهوائية (Air-Filled Porosity)، قدرة حفظ الماء، والـ CEC، وبروتوكول الغسيل والتكييف المسبق.",
              "Physical characteristics: air-filled porosity, water retention, buffering CEC, and pre-planting conditioning protocols.",
            ),
            why: t(
              "الكوكوبيت غير المغسول يحتوي على نسب خطيرة من الصوديوم والبوتاسيوم تثبت الكالسيوم؛ والصوف الصخري يحتاج ضبط تشبع دقيق.",
              "Unbuffered coco coir binds calcium and releases toxic sodium; improper rockwool saturation leads to root rot.",
            ),
            outcomes: [
              t("غسيل وشحن وسائد الكوكوبيت بنترات الكالسيوم (Buffering)", "Buffer coco coir slabs with calcium nitrate to displace sodium"),
              t("إدارة نسب الرطوبة اليومية ونسبة الصرف (Drainage %)", "Manage slab moisture dry-back curves and daily drainage percentage"),
            ],
            difficulty: "intermediate",
            minutes: 100,
            skills: ["Substrates", "Root Media", "Buffer Chemistry"],
            prerequisites: [t("هندسة الأنظمة", "Systems engineering")],
            task: t(
              "اكتب خطة تكييف وغسيل لـ 500 لوح كوكوبيت مضغوط قبل شتل محصول الفلفل الحلو.",
              "Write an expansion, washing, and calcium-buffering protocol for 500 compressed coco slabs before planting peppers.",
            ),
            promptFocus: t("وسائط الزراعة بدون تربة والصوف الصخري", "Hydroponic substrates: Rockwool, coco coir and perlite"),
          },
        ],
      },
      {
        id: "hy-s3",
        order: 3,
        title: t("المرحلة 03 — كيمياء وموازنة المحاليل المغذية", "Stage 03 — Nutrient Solutions & Chemical Formulation"),
        goal: t("حساب وخلط المحاليل القياسية بدقة وتجنب الترسيب باستخدام HydroBuddy.", "Formulate commercial nutrient solutions, avoid precipitation and use HydroBuddy."),
        topics: [
          {
            id: "hy-t5",
            title: t("صياغة المحاليل القياسية وحسابات PPM ببرنامج HydroBuddy", "Formulating standard solutions & PPM calculations with HydroBuddy"),
            summary: t(
              "صيغ Hoagland و Sonneveld و Resh، تحويل النسب بين PPM و meq/L، وإتقان برنامج HydroBuddy لحساب أوزان الأسمدة بدقة 0.1 جرام.",
              "Standard formulations (Hoagland, Sonneveld), PPM to meq/L conversions, and using HydroBuddy to calculate fertilizer mass to 0.1g.",
            ),
            why: t(
              "المهندس المحترف يصنع محلوله الخاص من الأسمدة الأحادية النقية بتكلفة تعادل ثلث المحاليل الجاهزة التجارية.",
              "Professional growers formulate from raw straight fertilizers, saving 65% compared to commercial premixed jugs.",
            ),
            outcomes: [
              t("تركيب محلول مغذٍ كامل لأي محصول من الصفر", "Formulate a complete crop-specific nutrient solution from scratch"),
              t("استخدام برنامج HydroBuddy وموازنة الأيونات المتعارضة", "Master HydroBuddy software and balance cation/anion ratios"),
            ],
            difficulty: "advanced",
            minutes: 160,
            skills: ["Nutrient Solutions", "HydroBuddy", "Fertilizer Formulation"],
            prerequisites: [t("كيمياء عامة", "General chemistry")],
            task: t(
              "احسب وصفة خزان مركز 1:100 (1000 لتر) لطماطم مرحلة الإثمار بناءً على صيغة Sonneveld باستخدام HydroBuddy.",
              "Calculate a 1:100 concentrated 1000L stock tank recipe for fruiting tomato using Sonneveld formula in HydroBuddy.",
            ),
            promptFocus: t("حساب المحاليل المغذية ببرنامج هيدروبادي", "Nutrient solution calculations with HydroBuddy"),
          },
          {
            id: "hy-t6",
            title: t("فصل الخزانات A و B وتجنب الترسيب وضبط الـ pH ديناميكيًا", "Tank separation A/B/C, precipitation prevention & dynamic pH dosing"),
            summary: t(
              "كيمياء الترسيب بين الكالسيوم والفوسفات والكبريتات، تصميم خزانات A و B، واختيار أحماض ضبط الـ pH (النيتريك والفوسفوريك).",
              "Precipitation chemistry between calcium, phosphates and sulfates, stock tank A & B isolation, and nitric vs phosphoric acid dosing.",
            ),
            why: t(
              "خلط الكالسيوم مع الكبريتات في نفس الخزان المركز ينتج كبريتات كالسيوم (جبس غير ذائب) يسد المنظومة فوراً.",
              "Mixing calcium with sulfates in concentrated tanks precipitates insoluble gypsum, instantly ruining pumps and drippers.",
            ),
            outcomes: [
              t("توزيع الأسمدة بدقة بين خزان A وخزان B وخزان الأحماض", "Correctly distribute fertilizers between tank A, tank B and acid tank"),
              t("معايرة طلمبات الحقن المتناسب وحساسات الـ pH والـ EC", "Calibrate proportional dosing injectors, pH probes and EC sensors"),
            ],
            difficulty: "intermediate",
            minutes: 100,
            skills: ["Stock Tanks", "Acid Dosing", "Precipitation Prevention"],
            prerequisites: [t("حسابات المحاليل", "Nutrient formulation")],
            task: t(
              "ضع جدول توزيع 8 أنواع أسمدة مختلفة بين خزان A وخزان B مع تحديد نوع الحمض وتركيزه لماء عسر.",
              "Draft a distribution matrix of 8 fertilizers between Tanks A and B, specifying acid type and strength for hard water.",
            ),
            promptFocus: t("فصل خزانات المحاليل المغذية وضبط الحموضة", "Hydroponic stock tank separation and pH management"),
          },
        ],
      },
      {
        id: "hy-s4",
        order: 4,
        title: t("المرحلة 04 — صحة الجذور والتعقيم وحل المشكلات الحقلية", "Stage 04 — Root Health, Disinfection & Troubleshooting"),
        goal: t("حماية النظام من مسببات أعفان الجذور وتشخيص انحرافات EC و pH والأملاح.", "Prevent Pythium outbreaks, disinfect recirculating loops and diagnose nutrient disorders."),
        topics: [
          {
            id: "hy-t7",
            title: t("إدارة أمراض الجذور المائية (Pythium) وتعقيم المحلول", "Waterborne root pathogens (Pythium), UV & ozone disinfection"),
            summary: t(
              "دورة حياة فطر البيثيوم والفيتوفثورا في البيئة المائية، التعقيم بالأشعة فوق البنفسجية (UV-C) وبيروكسيد الهيدروجين والأوزون.",
              "Lifecycle of Pythium and Phytophthora in hydroponics, UV-C sterilizers, hydrogen peroxide sanitization and ozone filtration.",
            ),
            why: t(
              "دخول فطر البيثيوم في نظام مائي مغلق قادر على إبادة محصول صوبة كاملة خلال 72 ساعة إذا لم يكن هناك تعقيم.",
              "Pythium introduced into a closed recirculating loop can destroy a multi-span greenhouse crop within 72 hours.",
            ),
            outcomes: [
              t("تشخيص أعراض موت الجذور البني والرائحة العفنة مبكراً", "Diagnose brown root rot and anoxic root odor at the earliest stage"),
              t("حساب جرعة الأشعة فوق البنفسجية المطلوبة (mJ/cm²) لتعقيم مياه الصرف", "Calculate UV-C dosage (mJ/cm²) needed to sterilize recirculating drain water"),
            ],
            difficulty: "advanced",
            minutes: 120,
            skills: ["Biosecurity", "Disinfection", "Root Pathology"],
            prerequisites: [t("فيزيولوجيا الجذور", "Root physiology")],
            task: t(
              "اكتب خطة طوارئ بيولوجية وصحية لإنقاذ نظام هيدروبونيك ظهرت فيه بوادر إصابة بفطر البيثيوم.",
              "Draft an emergency protocol to isolate and cure an early Pythium outbreak in a commercial recirculating NFT system.",
            ),
            promptFocus: t("مكافحة أمراض الجذور وتعقيم مياه الزراعة المائية", "Hydroponic root rot control and water disinfection"),
          },
          {
            id: "hy-t8",
            title: t("تشخيص أعراض النقص والسمية وإدارة ملوحة الصرف", "Deficiency diagnosis, salt accumulation & drain management"),
            summary: t(
              "مراقبة الفرق بين EC الداخل و EC الصرف (Drainage EC)، وتحديد أسباب ارتفاع الصوديوم وتصحيح أعراض النقص التغذوي الحاد.",
              "Monitoring inflow EC vs drain EC differential, identifying sodium accumulation thresholds, and correcting acute leaf disorders.",
            ),
            why: t(
              "ارتفاع EC الصرف عن المحلول الداخل بأكثر من 0.8 dS/m يعني تراكم أملاح ضار يستوجب الغسيل الفوري.",
              "Drain EC rising more than 0.8 dS/m above inflow indicates dangerous rootzone salt accumulation requiring immediate flushing.",
            ),
            outcomes: [
              t("قراءة وتحليل نسبة الصرف (Drainage %) ومحتواها الأيوني", "Analyze drainage volume percentage and leachate ion concentration"),
              t("التفريق الدقيق بين نقص الكالسيوم ونقص البورون والإجهاد الرطوبي", "Distinguish between calcium deficiency, boron deficiency and VPD water stress"),
            ],
            difficulty: "intermediate",
            minutes: 110,
            skills: ["Troubleshooting", "Deficiency Diagnosis", "Drainage Monitoring"],
            prerequisites: [t("كيمياء المحاليل", "Nutrient solutions")],
            task: t(
              "إذا لاحظت احتراق أطراف الأوراق الحديثة في الخس (Tipburn) مع EC=2.2، ما هو تحليلك والحل الفوري؟",
              "If young lettuce leaves exhibit tipburn with feed EC=2.2, diagnose the physiological cause and specify immediate fixes.",
            ),
            promptFocus: t("تشخيص مشاكل التغذية ونقص العناصر في الزراعة المائية", "Hydroponic nutritional deficiency and toxicity diagnosis"),
          },
        ],
      },
      {
        id: "hy-s5",
        order: 5,
        title: t("المرحلة 05 — المشاريع التجارية والجاهزية المهنية", "Stage 05 — Commercial Scale, Feasibility & Career Readiness"),
        goal: t("دراسات الجدوى المالية وتكاليف CapEx/OpEx واجتياز مقابلات كبرى مشاريع الهيدروبونيك.", "Build commercial feasibility models, manage CapEx/OpEx and master multinational hiring interviews."),
        topics: [
          {
            id: "hy-t9",
            title: t("حساب تكاليف التأسيس والتشغيل (CapEx/OpEx) ودراسة الجدوى", "Commercial CapEx, OpEx costing & feasibility modeling"),
            summary: t(
              "حساب تكلفة المتر المربع (الهيكل، شبكات الري، الطلمبات، كمبيوتر التسميد)، تكاليف التشغيل الشهرية (أسمدة، كهرباء، عمالة، بذور)، ونقطة التعادل.",
              "Cost per square meter (structure, plumbing, injection skid, sensors), monthly OpEx (fertilizers, kWh, labor, seeds), and break-even point.",
            ),
            why: t(
              "كبار المستثمرين والمشاريع الزراعية يعينون المدير الذي يحسب تكلفة الكيلو جرام الواحد من المحصول بدقة السنت.",
              "Mega-farm investors hire the grower who knows production cost per kilogram down to the exact cent.",
            ),
            outcomes: [
              t("بناء نموذج مالي متكامل لمزرعة هيدروبونيك تجارية على Excel", "Build a complete financial Excel model for a commercial hydroponic farm"),
              t("حساب العائد على الاستثمار (ROI) وفترة استرداد رأس المال", "Calculate ROI, payback period and gross profit margins"),
            ],
            difficulty: "advanced",
            minutes: 140,
            skills: ["Financial Modeling", "CapEx/OpEx", "Feasibility Studies"],
            prerequisites: [t("هندسة الأنظمة والمحاليل", "Systems & solutions engineering")],
            task: t(
              "احسب تكلفة التأسيس والتشغيل السنوية لمزرعة NFT ورقيات بمساحة 2000 م² مع تحديد سعر بيع الكيلو لتحقيق التعادل.",
              "Calculate CapEx and yearly OpEx for a 2000 m² NFT leafy greens project, determining break-even sale price per kg.",
            ),
            promptFocus: t("دراسة جدوى وتكاليف مشاريع الزراعة المائية", "Hydroponic commercial feasibility and costing"),
          },
          {
            id: "hy-t10",
            title: t("ملف الأعمال الاحترافي والتحضير لمقابلات كبرى الشركات", "Hydroponics portfolio, GlobalG.A.P certification & technical interview prep"),
            summary: t(
              "توثيق ملف أعمال متكامل (تصميم المنظومة، وصفات المحلول، بروتوكولات الأمان الحيوي)، وتدريبات المقابلات الفنية في كبرى المزارع.",
              "Compiling an industry-grade portfolio (CAD layouts, HydroBuddy recipes, biosecurity SOPs), and mock technical interviews with agri-enterprises.",
            ),
            why: t(
              "ملف أعمال موثق مع إجابات فنية دقيقة يضمن لك وظيفة Head Grower أو مهندس إنتاج براتب متميز.",
              "A documented portfolio and technical precision guarantees selection for Head Grower and Production Agronomist roles.",
            ),
            outcomes: [
              t("بورتفوليو مهني متكامل يثبت كفاءتك في إدارة وتشغيل المزارع بدون تربة", "A verified portfolio proving ability to operate commercial soilless facilities"),
              t("اجتياز المقابلات الفنية لشركات الزراعة الرأسية والصوب الحديثة في مصر والخليج", "Acing technical interviews for vertical farms and CEA operations across the MENA region"),
            ],
            difficulty: "advanced",
            minutes: 150,
            skills: ["Portfolio", "Technical Interview", "GlobalG.A.P"],
            prerequisites: [t("مراحل 1-4", "Stages 1-4")],
            task: t(
              "أجرِ محاكاة مقابلة عمل فنية لوظيفة كبير مزارعي زراعة مائية (Head Grower) مع المرشد الذكي تغطي تصحيح انحراف الـ EC وأزمة تعطل الطلمبات.",
              "Conduct a mock technical interview for a Head Grower role covering severe EC drift and emergency pump failures with the AI mentor.",
            ),
            promptFocus: t("مقابلات مهندس زراعة مائية", "Hydroponics Head Grower technical job interviews"),
          },
        ],
      },
    ],
    projects: [
      {
        id: "hy-p1",
        title: t("تصميم وحدة زراعة مائية 200 م²", "Design a 200 m² hydroponic unit"),
        level: "advanced",
        objective: t("تصميم كامل مع وصفة تغذية وتكلفة.", "Full design with nutrient recipe and cost."),
        problem: t("مستثمر يريد بدء إنتاج خس بجودة تصدير.", "An investor wants export-grade lettuce production."),
        skills: ["System Design", "Nutrient Solutions"],
        tools: ["Excel", "EC/pH meters"],
        steps: [
          t("اختيار النظام والتخطيط", "Select the system and lay it out"),
          t("حساب التغذية والاستهلاك المائي", "Compute nutrition and water use"),
          t("تقدير التكلفة والعائد", "Estimate cost and return"),
        ],
        deliverables: [t("مخطط + وصفة + جدول تكاليف", "Layout + recipe + cost sheet")],
        portfolio: t("أقوى مشروع لملف الزراعة المائية.", "The strongest portfolio piece for hydroponics."),
      },
    ],
  },

  /* ─────────────────────────── 4b. Plant Nutrition & Fertigation ──────────── */
  {
    id: "plant-nutrition",
    name: t("تغذية وتسميد النبات", "Plant Nutrition & Fertigation Management"),
    tagline: t("برامج تسميد دقيقة، محطات حقن، وإنتاجية قصوى", "Precision fertigation, injection stations & yield optimization"),
    description: t(
      "تخطيط وهندسة برامج التغذية النباتية المتكاملة، كيمياء الأسمدة والذوبانية، التسميد بالري (Fertigation)، معالجة أعراض النقص والسمية، تحاليل الأوراق، وتصميم برامج موسمية متكاملة لمزارع التصدير.",
      "Planning and engineering integrated plant nutrition programmes, fertilizer chemistry, fertigation, diagnosing deficiencies, leaf tissue testing and building seasonal export crop programmes.",
    ),
    icon: "Sparkles",
    difficulty: "intermediate",
    hours: 150,
    demand: 5,
    skills: ["Fertigation", "Plant Physiology", "Fertilizer Chemistry", "Tissue Analysis", "Foliar Nutrition"],
    tools: ["Smart Fertilizer", "SPAD meter", "Horiba LAQUAtwin", "Excel calculators", "Dosing pumps"],
    topicsPool: [
      t("العناصر الكبرى والصغرى", "Macro & micronutrients"),
      t("كيمياء الأسمدة والذوبانية", "Fertilizer chemistry & solubility"),
      t("التسميد مع الري", "Fertigation"),
      t("التسميد الورقي", "Foliar nutrition"),
      t("تحاليل الأوراق", "Leaf tissue analysis"),
      t("أعراض النقص والسمية", "Deficiency & toxicity symptoms"),
      t("مخلبيات العناصر الصغرى", "Micronutrient chelates"),
      t("برامج التسميد الموسمية", "Seasonal fertigation programmes"),
    ],
    roles: [
      {
        id: "fertigation-agronomist",
        title: t("مهندس تغذية وتسميد مزارع", "Fertigation Agronomist"),
        description: t(
          "يدير محطات حقن الأسمدة ويضع الجداول الأسبوعية للتسميد بما يتوافق مع المراحل الفينولوجية للمحصول وجودة الإنتاج.",
          "Manages fertilizer injection stations and designs weekly fertigation schedules aligned with crop phenological stages and yield quality.",
        ),
        responsibilities: [
          t("حساب وضبط المقررات السمادية الأسبوعية", "Calculate and adjust weekly fertilizer quotas"),
          t("متابعة تركيزات المحاليل والأملاح في منطقة الجذور", "Monitor solution concentrations and EC in the rootzone"),
          t("إدارة محطات الحقن والفلاتر", "Manage dosing stations and filtration systems"),
        ],
        skills: ["Fertigation", "Fertilizer Chemistry", "Rootzone Monitoring"],
        tools: ["Dosing pumps", "EC/pH meters", "Excel"],
        entry: t("حساب وحدات التسميد النقي وموازنة الخزانات", "Calculate pure nutrient units and balance tanks"),
        senior: t("إدارة التغذية لمحاصيل تصديرية كبرى وخفض الفاقد", "Manage nutrition for major export crops and minimize losses"),
      },
      {
        id: "technical-nutrition-advisor",
        title: t("مستشار دعم فني وتغذية نبات", "Technical Crop Nutrition Advisor"),
        description: t(
          "يقدم الاستشارات الفنية لكبرى المزارع نيابة عن شركات الأسمدة العالمية ويشخص المشاكل التغذوية الحقلية.",
          "Provides technical advice to large commercial farms for multinational fertilizer firms and diagnoses field nutrition issues.",
        ),
        responsibilities: [
          t("تفسير تحاليل الأوراق والتربة للمزارع الكبرى", "Interpret leaf and soil analyses for large farms"),
          t("كتابة برامج تغذية نوعية للمحاصيل التصديرية", "Formulate targeted nutrition programmes for export crops"),
        ],
        skills: ["Tissue Analysis", "Plant Physiology", "Consulting"],
        tools: ["Smart Fertilizer software", "SPAD meter"],
        entry: t("ربط أعراض النقص بالتحاليل الورقية", "Correlate deficiency symptoms with tissue analysis"),
        senior: t("تصميم مركبات سمادية واستراتيجيات تغذية مناخية", "Formulate fertilizer blends and climate-stress nutrition strategies"),
      },
    ],
    mentorPersona: t(
      "أنت خبير تغذية نبات وتسميد ري أول عمل أكثر من 15 سنة في كبرى شركات الأسمدة العالمية ومزارع التصدير.",
      "You are a senior plant nutrition and fertigation expert with 15+ years in global fertilizer firms and export mega-farms.",
    ),
    stages: [
      {
        id: "pn-s1",
        order: 1,
        title: t("المرحلة 01 — فسيولوجيا العناصر وميتابوليزم النبات وتفاعلات ملدر", "Stage 01 — Plant Nutrient Physiology & Mulder's Chart"),
        goal: t("إتقان الأدوار الحيوية للعناصر وحركتها داخل النبات وتفاعلات التضاد والتآزر.", "Master biological nutrient functions, phloem mobility and Mulder's chart interactions."),
        topics: [
          {
            id: "pn-t1",
            title: t("وظائف العناصر الكبرى والمتوسطة والصغرى وميكانيكية الامتصاص", "Macro, secondary & micronutrient physiological functions & active uptake"),
            summary: t(
              "الأدوار الأيضية لـ N-P-K، Ca-Mg-S، والحديد والزنك والمنجنيز والبورون، وميكانيكيات الامتصاص النشط والسلبي عبر الشعيرات الجذرية.",
              "Metabolic functions of N-P-K, Ca-Mg-S, and micronutrients, active vs passive ion uptake pathways across root membranes.",
            ),
            why: t(
              "فهمك للوظيفة الحيوية لكل عنصر هو الأساس الذي يمنعك من تسميد عنصر لا يحتاجه النبات في تلك المرحلة.",
              "Understanding specific metabolic roles prevents costly misapplications of nutrients when the plant cannot assimilate them.",
            ),
            outcomes: [
              t("شرح دور كل عنصر في البناء الضوئي، انقسام الخلايا، وبناء البروتين والسكريات", "Explain individual nutrient roles in photosynthesis, cell division and starch/protein synthesis"),
              t("تحديد متطلبات النبات من كل عنصر خلال مراحل دورة حياته", "Determine shifting nutrient demands across crop ontogeny"),
            ],
            difficulty: "beginner",
            minutes: 90,
            skills: ["Plant Physiology", "Nutrient Functions"],
            prerequisites: [t("لا يوجد", "None")],
            task: t(
              "اكتب ملخصاً في جدول يوضح وظيفة كل من البوتاسيوم والكالسيوم والبورون في مرحلة التزهير وعقد الثمار.",
              "Summarize in a matrix table the metabolic functions of K, Ca, and B during flowering and fruit setting stages.",
            ),
            promptFocus: t("فسيولوجيا ووظائف العناصر الغذائية في النبات", "Plant nutrient physiological functions and uptake mechanisms"),
          },
          {
            id: "pn-t2",
            title: t("حركية العناصر داخل النبات وتفاعلات التضاد والتآزر (Mulder's Chart)", "Nutrient mobility (phloem vs xylem) & Mulder's antagonism chart"),
            summary: t(
              "العناصر المتحركة (تظهر أعراض نقصها على الأوراق المسنة أولاً) vs عديمة الحركة (تظهر على القمم النامية)، وتأثير التضاد مثل البوتاسيوم ضد المغنيسيوم والكالسيوم.",
              "Phloem-mobile vs immobile nutrients (visual deficiency symptom localization), and Mulder's chart antagonisms (K vs Mg/Ca, P vs Zn).",
            ),
            why: t(
              "التسميد الزائد بالبوتاسيوم يحجب امتصاص المغنيسيوم والكالسيوم؛ والتسميد المفرط بالفوسفور يسبب نقصاً حاداً في الزنك.",
              "Excessive potassium blocks magnesium and calcium uptake; heavy phosphorus causes severe induced zinc chlorosis.",
            ),
            outcomes: [
              t("تحديد موضع ظهور النقص فوراً وتحديد ما إذا كان العنصر متحركاً أم ثابتاً", "Pinpoint deficiency symptom locations and determine ion mobility classification"),
              t("تطبيق مخطط ملدر لتفادي التسميد المتضاد في برامج التغذية", "Apply Mulder's chart to prevent induced nutrient deficiencies in recipe designs"),
            ],
            difficulty: "intermediate",
            minutes: 100,
            skills: ["Mulder's Chart", "Nutrient Antagonism", "Diagnostic Sighting"],
            prerequisites: [t("وظائف العناصر", "Nutrient functions")],
            task: t(
              "حلل حالة حقلية ظهر فيها اصفرار بين عروق الأوراق المسنة في محصول بطاطس بعد تسميد بوتاسي غزير واشرح السبب الفسيولوجي.",
              "Analyze a field case of interveinal chlorosis on older potato leaves following high potassium applications, explaining the mechanism.",
            ),
            promptFocus: t("مخطط ملدر وحركية العناصر داخل النبات", "Mulder's chart of nutrient interactions and mobility"),
          },
        ],
      },
      {
        id: "pn-s2",
        order: 2,
        title: t("المرحلة 02 — كيمياء الأسمدة وجودتها وسلوكها في التربة والماء", "Stage 02 — Fertilizer Chemistry, Solubility & Behavior"),
        goal: t("التمييز بين مصادر الأسمدة، الذوبانية، مؤشر الملح ومخلبيات العناصر الصغرى.", "Master fertilizer sources, solubility curves, salt indexes and micronutrient chelates."),
        topics: [
          {
            id: "pn-t3",
            title: t("مصادر الأسمدة التجارية والذوبانية ومؤشر الملح (Salt Index)", "Commercial fertilizer sources, solubility curves & salt index rating"),
            summary: t(
              "الفرق بين النترات والأمونيوم واليوريا وتأثيرها على pH الجذور، مصادر الفوسفور (MAP, MKP, حمض الفوسفوريك)، مصادر البوتاسيوم، ومؤشر الملح لتجنب إجهاد الشتلات.",
              "Nitrate vs ammonium vs urea effects on rhizosphere pH, phosphate sources (MAP, MKP, phosphoric acid), potassium forms, and salt index ratings.",
            ),
            why: t(
              "استخدام سماد ذي مؤشر ملحي مرتفع في جو حار يحرق الشعيرات الجذرية ويشل قدرة النبات على امتصاص الماء.",
              "Applying high salt-index fertilizers during hot weather scorches root tips and induces osmotic drought stress.",
            ),
            outcomes: [
              t("اختيار مصدر السماد الأنسب لنوع التربة ومرحلة نمو النبات", "Select optimal fertilizer carriers tailored to soil pH and crop stage"),
              t("حساب درجة الذوبانية ودرجات حرارة إذابة الأسمدة الماصة للحرارة (كالنترات)", "Calculate solubility limits and handle endothermic cooling during fertilizer batching"),
            ],
            difficulty: "intermediate",
            minutes: 110,
            skills: ["Fertilizer Chemistry", "Solubility", "Salt Index"],
            prerequisites: [t("كيمياء عامة", "General chemistry")],
            task: t(
              "رتب 6 أسمدة تجارية شائعة حسب مؤشر الملح وقارن تأثير نترات الأمونيوم وسلفات الأمونيوم على حموضة التربة.",
              "Rank 6 commercial fertilizers by salt index and compare the acidification impact of ammonium nitrate vs ammonium sulfate.",
            ),
            promptFocus: t("أنواع وكيمياء الأسمدة التجارية", "Commercial fertilizer chemistry, solubility and salt index"),
          },
          {
            id: "pn-t4",
            title: t("مخلبيات العناصر الصغرى (EDTA, DTPA, EDDHA) وكفاءتها حسب الـ pH", "Micronutrient chelates: EDTA, DTPA & EDDHA pH stability chemistry"),
            summary: t(
              "كيمياء التخلب (Chelation)، منحنيات ثبات مخلبيات الحديد (Fe-EDTA حتى pH 6.5، Fe-DTPA حتى pH 7.5، و Fe-EDDHA للأراضي القلوية الجيرية حتى pH 9.0)، ونسب الأيزومرات (Ortho-Ortho).",
              "Chelation chemistry, iron chelate stability curves (EDTA up to pH 6.5, DTPA up to 7.5, EDDHA up to 9.0 in calcareous soils), and ortho-ortho isomer percentages.",
            ),
            why: t(
              "استخدام حديد EDTA في الأراضي القلوية الجيرية بالشرق الأوسط هو إهدار كامل للمال لأن الحديد يترسب فوراً كأكسيد حديد غير ذائب.",
              "Using Fe-EDTA in Middle Eastern alkaline soils is total waste; calcium displaces iron and precipitates it as insoluble rust.",
            ),
            outcomes: [
              t("اختيار المخلب المناسب بناءً على pH التربة ومياه الري", "Select the chemically correct chelate matching soil and irrigation water pH"),
              t("فحص جودة مركب Fe-EDDHA التجاري ونسبة الأيزومر الفعال (Ortho-Ortho)", "Evaluate commercial Fe-EDDHA labels for verified ortho-ortho active isomer purity"),
            ],
            difficulty: "intermediate",
            minutes: 100,
            skills: ["Micronutrient Chelates", "pH Stability", "Ortho-Ortho Testing"],
            prerequisites: [t("مصادر الأسمدة", "Fertilizer sources")],
            task: t(
              "اشرح بالمعادلات والمنحنيات لماذا يفشل حديد Fe-EDTA في تربة كلسية ذات pH = 8.2 وما هو البديل التجاري الأكفأ.",
              "Demonstrate using stability curves why Fe-EDTA fails in calcareous soils at pH 8.2 and formulate the superior chelated alternative.",
            ),
            promptFocus: t("مخلبيات العناصر الصغرى واستخداماتها", "Micronutrient chelates stability and application guidelines"),
          },
        ],
      },
      {
        id: "pn-s3",
        order: 3,
        title: t("المرحلة 03 — هندسة التسميد بالري وحسابات الوحدات النقية (Fertigation)", "Stage 03 — Fertigation Engineering & Nutrient Calculations"),
        goal: t("حساب الوحدات السمادية الصافية وهندسة الحقن مع الري ومراقبة منطقة الجذور.", "Master pure nutrient unit calculations, fertigation injection timing and rootzone monitoring."),
        topics: [
          {
            id: "pn-t5",
            title: t("حساب الوحدات السمادية الصافية وتحويلها لأوزان أسمدة تجارية", "Calculating pure nutrient units to commercial fertilizer weights"),
            summary: t(
              "المعادلات الرياضية للتحويل بين وحدات N-P-K النقية وأوزان الأسمدة التجارية المركبة والأحادية، وتوزيع المقررات السمادية على مراحل الموسم.",
              "Mathematical formulas converting pure elemental N-P-K units into commercial straight and compound fertilizer weights across seasonal growth blocks.",
            ),
            why: t(
              "أي مهندس تغذية في أكبر الشركات يُختبر فوراً في قدرته على تحويل توصية '30 وحدة آزوت و 40 وحدة بوتاسيوم' إلى أكياس أسمدة حقيقية.",
              "Commercial mega-farm agronomy interviews always test immediate numerical conversion from nutrient unit quotas to fertilizer bags.",
            ),
            outcomes: [
              t("إجراء الحسابات السمادية بدقة دون أخطاء رياضية قد تضر المحصول", "Perform flawless stoichiometric fertilizer dosage calculations under pressure"),
              t("تصميم خلطات سمادية متوازنة بأقل تكلفة للطن", "Formulate custom fertilizer blends optimizing cost per nutrient unit"),
            ],
            difficulty: "advanced",
            minutes: 140,
            skills: ["Fertigation Calculations", "Unit Conversion", "Cost Optimization"],
            prerequisites: [t("كيمياء الأسمدة", "Fertilizer chemistry")],
            task: t(
              "احسب كميات نترات النشادر، سلفات البوتاسيوم، وحمض الفوسفوريك اللازمة لإمداد 50 فدان بطاطس بـ 25 وحدة آزوت و 35 وحدة بوتاسيوم و 15 وحدة فوسفور.",
              "Calculate the exact kilograms of ammonium nitrate, potassium sulfate and phosphoric acid to supply 50 potato acres with 25 N, 35 K2O and 15 P2O5 units.",
            ),
            promptFocus: t("حساب الوحدات السمادية والتسميد بالري", "Calculating pure nutrient units and commercial fertilizer conversions"),
          },
          {
            id: "pn-t6",
            title: t("ديناميكية الحقن الزمني ومراقبة EC و pH في منطقة الجذور", "Injection timing dynamics, wetting front & rootzone EC/pH monitoring"),
            summary: t(
              "توقيت بدء الحقن بعد استقرار الضغوط وزمن إنهاء الحقن لغسيل الشبكة، حركة العناصر في بصلة الرطوبة (النيتروجين المتحرك vs الفوسفور الثابت)، ومراقبة ملوحة الجذور بمستخلص العصارة.",
              "Fertigation timing (starting after pressurization, flushing lines), ion movement in the wetting bulb (mobile N vs immobile P), and rootzone pore water EC monitoring.",
            ),
            why: t(
              "الحقن في نهاية الرية دون غسيل يترك أملاحاً مركزة ترسب في النقاطات وتسد الشبكة وتملح سطح التربة.",
              "Injecting at the end of an irrigation cycle without sufficient line flushing leaves concentrated salts that clog drippers and salt-scorch roots.",
            ),
            outcomes: [
              t("ضبط زمن الحقن وتوزيع السماد بدقة في الثلثين الأوسطين من زمن الرية", "Coordinate injection timing to deposit fertilizer in the optimal active root volume"),
              t("استخدام أجهزة سحب عصارة التربة (Suction Lysimeters) لفحص EC الفعلي حول الجذور", "Deploy suction lysimeters to monitor actual electrical conductivity in root pore solution"),
            ],
            difficulty: "advanced",
            minutes: 120,
            skills: ["Fertigation Operation", "Lysimeters", "Hydraulic Coordination"],
            prerequisites: [t("حسابات الوحدات", "Unit calculations")],
            task: t(
              "لرية مدتها 4 ساعات في تربة رملية: حدد بدقة متى يبدأ حقن السماد، مدة الحقن، وزمن غسيل الشبكة بالمياه الصافية.",
              "For a 4-hour irrigation run in sandy soil: determine exact fertilizer injection start time, injection duration and clean water flush time.",
            ),
            promptFocus: t("ديناميكية وتوقيت حقن الأسمدة مع الري", "Fertigation injection timing, wetting front and line flushing"),
          },
        ],
      },
      {
        id: "pn-s4",
        order: 4,
        title: t("المرحلة 04 — التشخيص الميداني، التحاليل الورقية، والتسميد الورقي", "Stage 04 — Field Deficiency Diagnosis, Leaf Analysis & Foliar Feeding"),
        goal: t("تشخيص أعراض النقص والسمية حقلياً وسحب عينات الأوراق القياسية وتصميم الرش الورقي.", "Diagnose field disorders, conduct standard tissue sampling and engineer targeted foliar nutrition."),
        topics: [
          {
            id: "pn-t7",
            title: t("التشخيص الميداني الدقيق لأعراض النقص والسمية", "Visual field deficiency and toxicity symptoms diagnosis"),
            summary: t(
              "التشخيص الحقلي الممنهج لأعراض نقص النيتروجين والحديد والزنك والماغنسيوم والكالسيوم والبورون، وأعراض سمية الصوديوم والكلوريد والبورون.",
              "Systematic field visual diagnosis of N, Fe, Zn, Mg, Ca, and B deficiencies, alongside toxicity symptoms of sodium, chloride and boron.",
            ),
            why: t(
              "القدرة على التشخيص البصري الفوري في الحقل تمكنك من اتخاذ إجراء إنقاذ عاجل قبل تدهور حالة الأشجار أو النباتات.",
              "Instant visual diagnostic acuity enables prompt corrective action before crop decline causes permanent economic loss.",
            ),
            outcomes: [
              t("التفريق الدقيق بين اصفرار نقص الحديد (أوراق قمة) ونقص المغنيسيوم (أوراق قاعدة) ونقص النيتروجين", "Distinguish between iron chlorosis (apical), magnesium chlorosis (basal) and general nitrogen yellowing"),
              t("تشخيص احتراق حواف الأوراق الناتج عن سمية الكلوريد أو الصوديوم", "Diagnose marginal leaf necrosis triggered by sodium and chloride accumulation"),
            ],
            difficulty: "intermediate",
            minutes: 110,
            skills: ["Field Diagnosis", "Symptomatology", "Visual Auditing"],
            prerequisites: [t("حركية العناصر", "Nutrient mobility")],
            task: t(
              "افحص صور 6 أوراق تظهر أعراض اصفرار واحتراق واكتب تشخيصك الفوري لكل حالة مع التوصية بالعلاج.",
              "Audit 6 leaf images showing chlorosis and necrotic margins, writing an immediate diagnostic verdict and corrective action for each.",
            ),
            promptFocus: t("تشخيص أعراض نقص العناصر على النبات", "Plant nutrient deficiency and toxicity visual diagnosis"),
          },
          {
            id: "pn-t8",
            title: t("تحاليل الأنسجة النباتية وتكنولوجيا التسميد الورقي والمواد المساعدة", "Leaf tissue analysis (DRIS), foliar nutrition science & adjuvants"),
            summary: t(
              "بروتوكول أخذ عينات الأوراق التشخيصية القياسية لكل محصول، تفسير تقارير المعمل بمعايير الكفاية ونظام DRIS، وفسيولوجيا الرش الورقي (فتحات الكيوتيكل، نقطة انعدام الشحنة، المواد الناشرة والمبللة).",
              "Standard index tissue sampling protocols per crop, interpreting lab dry weight assays via DRIS norms, and foliar penetration science (cuticle pores, point of deliquescence, organosilicone surfactants).",
            ),
            why: t(
              "الرش الورقي دون مادة ناشرة ومعدل pH لمياه الرش يفقد 70% من كفاءة امتصاص الكالسيوم أو العناصر الصغرى.",
              "Foliar sprays applied without proper organosilicone surfactants and water conditioning waste 70% of applied nutrients.",
            ),
            outcomes: [
              t("سحب عينات أوراق معتمدة طبقاً للمواصفات الدولية لمزارع التصدير", "Collect representative diagnostic leaf samples conforming to international export standards"),
              t("تصميم محاليل رش ورقي متوازنة وتحديد التوقيت الأمثل للرش وفق الرطوبة والـ VPD", "Formulate tank mixes with proper adjuvants and identify optimal application windows based on humidity and VPD"),
            ],
            difficulty: "advanced",
            minutes: 130,
            skills: ["Tissue Analysis", "Foliar Nutrition", "Adjuvants", "DRIS"],
            prerequisites: [t("التشخيص الميداني", "Field diagnosis")],
            task: t(
              "قيّم تقرير تحليل أوراق لمزرعة عنب مائدة (المستويات المئوية لـ N, P, K, Ca, Mg)، وصمم رشة ورقية علاجية لتصحيح النقص.",
              "Evaluate a table grape leaf assay report (N, P, K, Ca, Mg dry weight percentages) and design a corrective foliar spray recipe.",
            ),
            promptFocus: t("تحليل الأوراق والتسميد الورقي للنبات", "Leaf tissue testing interpretation and foliar feeding technology"),
          },
        ],
      },
      {
        id: "pn-s5",
        order: 5,
        title: t("المرحلة 05 — تصميم برامج التسميد الموسمية والجاهزية لسوق العمل", "Stage 05 — Full-Season Crop Programs & Career Readiness"),
        goal: t("بناء برامج تغذية موسمية متكاملة لمحاصيل التصدير وإتقان مقابلات كبرى الشركات.", "Build commercial season-long fertigation programs for export crops and master hiring interviews."),
        topics: [
          {
            id: "pn-t9",
            title: t("تصميم برنامج تسميد موسمي كامل لمحصول تجاري استراتيجي", "Designing a commercial full-season fertigation schedule"),
            summary: t(
              "تخطيط برنامج تغذية أسبوعي لموسم كامل لمحصول تصديري (مثل العنب، الموالح، البطاطس، أو الفراولة): ربط الجرعات بمراحل النمو، حساب التكاليف، والتنسيق مع ملوحة التربة والري.",
              "Engineering weekly season-long nutrition schedules for major export crops (table grapes, citrus, potatoes, strawberries), coordinating quotas with phenology, water quality and budgeting.",
            ),
            why: t(
              "هذا هو المنتج النهائي والملموس الذي تدفع من أجله الشركات الكبرى أعلى الرواتب لمهندس التغذية والتسميد.",
              "A comprehensive seasonal fertigation matrix is the primary deliverable for which agribusinesses pay premium agronomist salaries.",
            ),
            outcomes: [
              t("بناء جدول أسبوعي متكامل بالكميات التجارية والمواعيد لكل قطاع في المزرعة", "Construct an operational weekly calendar specifying fertilizer commercial weights per irrigation sector"),
              t("حساب تكلفة التسميد لكل فدان ونسبة العائد على الاستثمار السمادي (Fertilizer ROI)", "Calculate per-acre fertilizer expenditure and evaluate input return on investment"),
            ],
            difficulty: "advanced",
            minutes: 160,
            skills: ["Seasonal Programming", "Crop Scheduling", "Fertigation Budgeting"],
            prerequisites: [t("مراحل 1-4", "Stages 1-4")],
            task: t(
              "صمم برنامج تسميد موسمي كامل (من السكون حتى ما بعد الحصاد) لـ 100 فدان عنب مائدة تصدير مع جدول الكميات الأسبوعية.",
              "Design a complete seasonal fertigation schedule (dormancy to post-harvest) for a 100-acre export table grape vineyard with weekly rates.",
            ),
            promptFocus: t("تصميم برامج التسميد الموسمية للمحاصيل", "Designing comprehensive commercial season fertigation programs"),
          },
          {
            id: "pn-t10",
            title: t("ملف الأعمال التغذوي الاحترافي والتحضير لمقابلات كبرى الشركات", "Fertigation portfolio, multinational standards & technical interview prep"),
            summary: t(
              "تجهيز ملف أعمال متكامل يضم برامج التسميد وحسابات الوحدات وتحاليل الأوراق، ومحاكاة المقابلات الفنية في كبرى شركات الأسمدة العالمية والمزارع الاستثمارية.",
              "Compiling a professional nutrition portfolio (Excel season models, leaf diagnosis logs, acid dosing calculators) and rehearsing technical interviews with global fertilizer leaders.",
            ),
            why: t(
              "كبرى الشركات متعددة الجنسيات (Yara, Haifa, ICL) تبحث عن مرشح يستطيع مناقشة الفروق الكيميائية والتغذوية الحقلية بثقة علمية مطلقة.",
              "Global fertilizer leaders hire agronomists who demonstrate deep biochemical rationale and numerical mastery under interview scrutiny.",
            ),
            outcomes: [
              t("ملف بورتفوليو مهني يثبت خبرتك كمهندس تغذية وتسميد محترف", "A validated technical portfolio demonstrating professional fertigation engineering competence"),
              t("إتقان الإجابة على الأسئلة الحسابية والفنية في مقابلات كبرى الشركات والمزارع", "Confidently ace complex nutritional and chemical questions in multinational hiring interviews"),
            ],
            difficulty: "advanced",
            minutes: 150,
            skills: ["Portfolio", "Technical Interview", "Yara / Haifa Standards"],
            prerequisites: [t("مراحل 1-4", "Stages 1-4")],
            task: t(
              "أجرِ محاكاة مقابلة عمل فنية لوظيفة كبير مهندسي التغذية والتسميد مع المرشد الذكي تغطي تصحيح نقص المغنيسيوم وحسابات خلط الأسمدة.",
              "Execute a mock technical interview for a Chief Fertigation Agronomist role covering magnesium deficiency correction and fertilizer solubility limits with the AI mentor.",
            ),
            promptFocus: t("مقابلات مهندس تغذية وتسميد نبات", "Plant nutrition and fertigation specialist technical hiring interviews"),
          },
        ],
      },
    ],
    projects: [
      {
        id: "pn-p1",
        title: t("تصميم برنامج تسميد سنوي لمزرعة فواكه تصديرية 100 فدان", "Design a yearly fertigation program for a 100-acre export fruit farm"),
        level: "advanced",
        objective: t("بناء برنامج أسبوعي كامل بالتكاليف ومطابقة معايير الجودة والتصدير.", "Build a complete weekly fertigation schedule with costing, targeting export quality standards."),
        problem: t("تذبذب في أحجام الثمار وانخفاض نسبة السكر (Brix) مع تكاليف سمادية مرتفعة.", "Inconsistent fruit sizing, low Brix sugar levels and excessive fertilizer expenditure."),
        skills: ["Fertigation", "Plant Physiology", "Fertilizer Chemistry", "Costing"],
        tools: ["Excel", "Smart Fertilizer", "SPAD meter"],
        steps: [
          t("تحليل بيانات التربة ومياه الري والمحصول", "Analyze soil, water and crop historical data"),
          t("حساب الاحتياجات السمادية الصافية لكل مرحلة فينولوجية", "Calculate pure nutrient requirements per phenological stage"),
          t("تحديد مصادر الأسمدة وجداول الحقن الأسبوعية", "Select fertilizer carriers and formulate weekly injection schedules"),
          t("وضع خطة التسميد الورقي الداعم والميزانية", "Establish supportive foliar sprays and financial input budget"),
        ],
        deliverables: [t("جدول تسميد موسمي أسبوعي + نموذج حساب تكلفة الفدان", "Weekly seasonal schedule + per-acre cost optimization model")],
        portfolio: t("أقوى مشروع لإثبات الكفاءة في مقابلات كبرى المزارع وشركات الأسمدة.", "The standout portfolio piece to demonstrate fertigation mastery to top employers."),
      },
    ],
  },

  /* ─────────────────────────── 5. Crops & Fruits ─────────────────────────── */
  {
    id: "crop-production",
    name: t("المحاصيل وإنتاج الفاكهة", "Crops & Fruit Production"),
    tagline: t("إدارة موسم كامل حتى ما بعد الحصاد", "Manage a full season through post-harvest"),
    description: t(
      "إدارة الإنتاج الحقلي والبستاني: خدمة المحصول، التسميد، الريّ، تحسين الإنتاجية، الحصاد وما بعد الحصاد. العمود الفقري لشركات الإنتاج والتصدير.",
      "Field and horticultural production management: crop husbandry, fertilization, irrigation, yield optimisation, harvest and post-harvest. The backbone of production and export companies.",
    ),
    icon: "Sprout",
    difficulty: "beginner",
    hours: 150,
    demand: 5,
    skills: ["Crop Management", "Fertilization", "Irrigation", "Post-Harvest", "Yield Optimization"],
    tools: ["Field records", "Excel", "Fertigation plans"],
    topicsPool: [
      t("إنتاج المحاصيل", "Crop production"),
      t("البستنة", "Horticulture"),
      t("إنتاج الفاكهة", "Fruit production"),
      t("إنتاج الخضر", "Vegetable production"),
      t("الإنتاج المحمي", "Greenhouse production"),
      t("إدارة الريّ", "Irrigation management"),
      t("التسميد", "Fertilization"),
      t("ما بعد الحصاد", "Post-harvest"),
    ],
    roles: [
      {
        id: "farm-agronomist",
        title: t("مهندس إنتاج / مسؤول مزرعة", "Farm Agronomist"),
        description: t(
          "يدير عمليات الموسم ويحقق مستهدفات الإنتاجية والجودة.",
          "Runs season operations and delivers yield and quality targets.",
        ),
        responsibilities: [
          t("بناء برنامج تسميد وريّ", "Build fertilization and irrigation programmes"),
          t("متابعة العمالة والعمليات", "Supervise labour and operations"),
        ],
        skills: ["Crop Management", "Fertilization", "Irrigation"],
        tools: ["Excel", "Field records"],
        entry: t("تنفيذ برنامج موسمي بدقة", "Execute a season programme accurately"),
        senior: t("إدارة مزرعة كاملة بالميزانية", "Run a whole farm against a budget"),
      },
      {
        id: "postharvest-officer",
        title: t("مسؤول ما بعد الحصاد", "Post-Harvest Officer"),
        description: t(
          "يحافظ على الجودة من الحقل إلى محطة التعبئة والتصدير.",
          "Protects quality from field to packhouse and export.",
        ),
        responsibilities: [t("إدارة سلسلة التبريد", "Manage the cold chain")],
        skills: ["Post-Harvest", "Quality Control"],
        tools: ["Cold chain logs"],
        entry: t("فهم درجات التبريد ومعايير الفرز", "Cooling regimes and grading standards"),
        senior: t("تقليل الفاقد وإدارة الجودة", "Loss reduction and quality management"),
      },
    ],
    mentorPersona: t(
      "أنت مدير إنتاج زراعي أدار مزارع تصدير لسنوات طويلة.",
      "You are a production manager who has run export farms for many years.",
    ),
    stages: [
      {
        id: "cp-s1",
        order: 1,
        title: t("المرحلة 01 — أساسيات المحصول", "Stage 01 — Crop Foundations"),
        goal: t("تفهم احتياجات المحصول بدقة.", "Know crop requirements precisely."),
        topics: [
          {
            id: "cp-t1",
            title: t("مراحل النمو والاحتياجات", "Growth stages & requirements"),
            summary: t(
              "الاحتياج المائي والغذائي في كل مرحلة نمو.",
              "Water and nutrient demand at every growth stage.",
            ),
            why: t(
              "التسميد في غير مرحلته إهدار مباشر للمال.",
              "Fertilizing at the wrong stage is a direct waste of money.",
            ),
            outcomes: [t("بناء منحنى احتياج للمحصول", "Build a crop demand curve")],
            difficulty: "beginner",
            minutes: 90,
            skills: ["Crop Management"],
            prerequisites: [t("لا يوجد", "None")],
            task: t(
              "ابنِ جدول احتياجات موسم كامل لمحصول تختاره.",
              "Build a full-season requirement table for a crop of your choice.",
            ),
            promptFocus: t("مراحل نمو المحصول واحتياجاته", "Crop stages and requirements"),
          },
        ],
      },
      {
        id: "cp-s2",
        order: 2,
        title: t("المرحلة 02 — التسميد والريّ", "Stage 02 — Fertilization & Irrigation"),
        goal: t("تكتب برامج قابلة للتنفيذ.", "Write executable programmes."),
        topics: [
          {
            id: "cp-t2",
            title: t("برامج التسميد بالتنقيط", "Fertigation programmes"),
            summary: t(
              "حساب الجرعات، الذوبان، التوافق بين الأسمدة، التوزيع الأسبوعي.",
              "Rate calculation, solubility, fertilizer compatibility and weekly distribution.",
            ),
            why: t(
              "أول ما يُطلب من المهندس الجديد كتابة برنامج تسميد.",
              "Writing a fertigation programme is the first task a new agronomist gets.",
            ),
            outcomes: [
              t("كتابة برنامج تسميد أسبوعي", "Write a weekly fertigation programme"),
              t("تجنب التفاعلات والترسيب", "Avoid precipitation and incompatibility"),
            ],
            difficulty: "intermediate",
            minutes: 150,
            skills: ["Fertilization", "Irrigation"],
            prerequisites: [t("مراحل النمو", "Growth stages")],
            task: t(
              "اكتب برنامج تسميد 12 أسبوعًا لفلفل تحت التنقيط.",
              "Write a 12-week drip fertigation programme for pepper.",
            ),
            promptFocus: t("برامج التسميد العملية", "Practical fertigation programmes"),
          },
        ],
      },
      {
        id: "cp-s3",
        order: 3,
        title: t("المرحلة 03 — الجودة وما بعد الحصاد", "Stage 03 — Quality & Post-Harvest"),
        goal: t("تحافظ على القيمة حتى التصدير.", "Protect value through export."),
        topics: [
          {
            id: "cp-t3",
            title: t("الحصاد وسلسلة التبريد", "Harvest & the cold chain"),
            summary: t(
              "توقيت الحصاد، التبريد الأولي، الفرز، والفاقد.",
              "Harvest timing, pre-cooling, grading and losses.",
            ),
            why: t(
              "الفاقد بعد الحصاد يأكل هامش الربح كاملًا.",
              "Post-harvest loss can eat the whole profit margin.",
            ),
            outcomes: [t("حساب نسبة الفاقد واقتراح خطة تقليله", "Quantify loss and plan its reduction")],
            difficulty: "intermediate",
            minutes: 120,
            skills: ["Post-Harvest", "Quality Control"],
            prerequisites: [t("إدارة المحصول", "Crop management")],
            task: t(
              "حلّل عملية حصاد وحدد 3 نقاط لتقليل الفاقد.",
              "Analyse a harvest operation and identify 3 loss-reduction points.",
            ),
            promptFocus: t("ما بعد الحصاد وسلسلة التبريد", "Post-harvest and cold chain"),
          },
        ],
      },
      {
        id: "cp-s4",
        order: 4,
        title: t("المرحلة 04 — مشاريع ووظيفة", "Stage 04 — Projects & Job"),
        goal: t("تتحدث بلغة الأرقام أمام الإدارة.", "Speak the language of numbers to management."),
        topics: [
          {
            id: "cp-t4",
            title: t("خطة موسم كاملة + مقابلة", "Full season plan + interview"),
            summary: t(
              "خطة موسم بميزانية ومستهدفات ومؤشرات أداء.",
              "A season plan with budget, targets and KPIs.",
            ),
            why: t(
              "هذه الوثيقة تفصل المهندس المنفّذ عن المهندس المخطّط.",
              "This document separates an executor from a planner.",
            ),
            outcomes: [t("خطة موسم قابلة للعرض", "A presentable season plan")],
            difficulty: "advanced",
            minutes: 180,
            skills: ["Planning", "Crop Management"],
            prerequisites: [t("مراحل 1-3", "Stages 1-3")],
            task: t(
              "أعد خطة موسم لـ 10 أفدنة طماطم واطلب نقد المرشد الذكي.",
              "Prepare a 10-acre tomato season plan and ask the AI mentor to critique it.",
            ),
            promptFocus: t("تخطيط موسم زراعي", "Agricultural season planning"),
          },
        ],
      },
    ],
    projects: [
      {
        id: "cp-p1",
        title: t("خطة تسميد وريّ لموسم كامل", "Full-season fertigation & irrigation plan"),
        level: "intermediate",
        objective: t("برنامج قابل للتنفيذ بميزانية.", "An executable programme within a budget."),
        problem: t("تكاليف تسميد مرتفعة بإنتاجية متوسطة.", "High fertilizer cost with average yield."),
        skills: ["Fertilization", "Irrigation", "Excel"],
        tools: ["Excel"],
        steps: [
          t("تحليل التربة والمياه", "Analyse soil and water"),
          t("بناء البرنامج الأسبوعي", "Build the weekly programme"),
        ],
        deliverables: [t("ملف برنامج + ملخص تكاليف", "Programme file + cost summary")],
        portfolio: t("مشروع مثالي للمقابلات الحقلية.", "An ideal project for field interviews."),
      },
    ],
  },

  /* ───────── Remaining specializations: metadata + roles (roadmaps in build) ───────── */
  {
    id: "irrigation",
    name: t("الريّ وإدارة المياه", "Irrigation & Water Management"),
    tagline: t("تصميم شبكات وجدولة ريّ بكفاءة", "Network design and efficient scheduling"),
    description: t(
      "أنظمة الريّ بالتنقيط والرشّ، الجدولة، الاحتياج المائي، المفاهيم الهيدروليكية، وتصميم الشبكات وكفاءة استخدام المياه.",
      "Drip and sprinkler systems, scheduling, crop water requirements, hydraulics, network design and water-use efficiency.",
    ),
    icon: "Waves",
    difficulty: "intermediate",
    hours: 130,
    demand: 5,
    skills: ["Irrigation Design", "Scheduling", "Hydraulics", "Water Efficiency"],
    tools: ["Excel", "IrriPro", "AutoCAD (basics)"],
    topicsPool: [
      t("الريّ بالتنقيط", "Drip irrigation"),
      t("الريّ بالرشّ", "Sprinkler irrigation"),
      t("جدولة الريّ", "Irrigation scheduling"),
      t("الاحتياج المائي", "Water requirements"),
      t("الهيدروليكا", "Hydraulics"),
      t("تصميم الشبكات", "Network design"),
    ],
    roles: [
      {
        id: "irrigation-designer",
        title: t("مهندس تصميم ريّ", "Irrigation Design Engineer"),
        description: t(
          "يصمم شبكات ريّ متكاملة ويحسب الضغوط والتصرفات والتكلفة.",
          "Designs complete irrigation networks and calculates pressures, flows and cost.",
        ),
        responsibilities: [t("إعداد مخططات وحساب هيدروليكي", "Produce layouts and hydraulic calculations")],
        skills: ["Irrigation Design", "Hydraulics"],
        tools: ["Excel", "AutoCAD"],
        entry: t("حساب الاحتياج المائي وتصميم قطعة", "Water requirement and single-block design"),
        senior: t("تصميم مشاريع مئات الأفدنة", "Design projects of hundreds of acres"),
      },
    ],
    mentorPersona: t(
      "أنت مهندس ريّ أول صمّم مشاريع ريّ حديثة في الأراضي الجديدة.",
      "You are a senior irrigation engineer who designed modern schemes in newly reclaimed land.",
    ),
    stages: [],
    projects: [
      {
        id: "ir-p1",
        title: t("تصميم شبكة تنقيط 20 فدانًا", "Design a 20-acre drip network"),
        level: "advanced",
        objective: t("تصميم كامل مع حساب هيدروليكي.", "Complete design with hydraulic calculations."),
        problem: t("توزيع مياه غير منتظم في الحقل.", "Uneven water distribution in the field."),
        skills: ["Irrigation Design", "Hydraulics"],
        tools: ["Excel", "AutoCAD"],
        steps: [t("حساب الاحتياج", "Compute demand"), t("تصميم الشبكة", "Design the network")],
        deliverables: [t("مخطط + جدول حسابات", "Layout + calculation sheet")],
        portfolio: t("مشروع تصميم مطلوب بشدة.", "A highly requested design project."),
      },
    ],
  },
  {
    id: "greenhouses",
    name: t("الصوب الزراعية", "Greenhouses"),
    tagline: t("تحكم مناخي وإنتاج محمي", "Climate control and protected production"),
    description: t(
      "إدارة الصوب: التحكم في الحرارة والرطوبة والتهوية، التسميد بالريّ، الحساسات والأتمتة وإدارة المحصول المحمي.",
      "Greenhouse management: temperature, humidity and ventilation control, fertigation, sensors, automation and protected crop management.",
    ),
    icon: "Home",
    difficulty: "intermediate",
    hours: 120,
    demand: 4,
    skills: ["Climate Control", "Fertigation", "Automation", "Crop Management"],
    tools: ["Climate computers", "Sensors", "Excel"],
    topicsPool: [
      t("إدارة الصوب", "Greenhouse management"),
      t("التحكم المناخي", "Climate control"),
      t("الرطوبة والتهوية", "Humidity & ventilation"),
      t("التسميد بالريّ", "Fertigation"),
      t("الأتمتة", "Automation"),
    ],
    roles: [
      {
        id: "greenhouse-manager",
        title: t("مدير صوب", "Greenhouse Manager"),
        description: t(
          "يدير المناخ والمحصول والعمالة لتحقيق إنتاجية عالية على مدار العام.",
          "Manages climate, crop and labour for high year-round productivity.",
        ),
        responsibilities: [t("ضبط استراتيجية المناخ اليومية", "Set the daily climate strategy")],
        skills: ["Climate Control", "Crop Management"],
        tools: ["Climate computers", "Sensors"],
        entry: t("فهم VPD والتهوية", "Understand VPD and ventilation"),
        senior: t("استراتيجيات مناخ موسمية متقدمة", "Advanced seasonal climate strategies"),
      },
    ],
    mentorPersona: t(
      "أنت مدير صوب خبير في التحكم المناخي والإنتاج المحمي.",
      "You are an expert greenhouse manager in climate control and protected production.",
    ),
    stages: [
      {
        id: "gh-s1",
        order: 1,
        title: t("المرحلة 01 — الهياكل ومواد التغطية والتهوية", "Stage 01 — Structures, Coverings & Ventilation"),
        goal: t("فهم فيزياء هياكل الصوب ومواد التغطية وإدارة الهواء.", "Master greenhouse structural physics, cladding materials and airflow management."),
        topics: [
          {
            id: "gh-t1",
            title: t("هياكل الصوب ومواد التغطية ونفاذية الضوء", "Greenhouse structures, cladding materials & PAR transmission"),
            summary: t(
              "أنواع الصوب (Venlo الزجاجية، Multi-span البلاستيكية، الشبك)، وخصائص البولي إيثيلين المعالج والزجاج المنتشر.",
              "Greenhouse types (Venlo glass, multi-span polyethylene, net houses) and properties of diffused glass vs thermal anti-drip films.",
            ),
            why: t(
              "اختيار هيكل وغطاء خاطئ يدمر الجدوى الاقتصادية ويقلل نفاذية الضوء الضروري للبناء الضوئي.",
              "Wrong structure and cladding choices destroy profitability and restrict PAR light critical for photosynthesis.",
            ),
            outcomes: [
              t("مقارنة نفاذية الضوء والعزل الحراري لمواد التغطية", "Compare light transmission and thermal insulation of cladding materials"),
              t("اختيار الهيكل الأمثل للمناخ الحار والجاف", "Select the optimal structure for hot arid climates"),
            ],
            difficulty: "beginner",
            minutes: 90,
            skills: ["Greenhouse Design", "Light Management"],
            prerequisites: [t("لا يوجد", "None")],
            task: t(
              "قارن في جدول بين صوبة Venlo زجاجية وصوبة بلاستيكية مكيفة لمشروع طماطم تصدير في مصر أو الخليج.",
              "Compare in a table a Venlo glasshouse and a plastic pad-and-fan greenhouse for export tomatoes in Egypt or the Gulf.",
            ),
            promptFocus: t("هياكل الصوب الزراعية ومواد التغطية", "Greenhouse structures and cladding materials"),
          },
          {
            id: "gh-t2",
            title: t("التهوية والتبريد التبخيري Pad & Fan", "Ventilation & evaporative cooling systems"),
            summary: t(
              "حسابات معدلات تجديد الهواء، خلايا التبريد الكرتونية (Pads)، مراوح الشفط (Fans)، ومسار تدرج درجات الحرارة.",
              "Air exchange rate calculations, evaporative cooling pads, exhaust fans and temperature gradient management.",
            ),
            why: t(
              "في الصيف الحار، التبريد التبخيري هو العامل الوحيد الذي يمنع موت النبات وفشل العقد الزهري.",
              "In hot summers, evaporative cooling is the sole factor preventing crop death and pollination failure.",
            ),
            outcomes: [
              t("حساب مساحة خلايا التبريد وقوة الشفاطات المطلوبة", "Calculate required cooling pad area and fan cfm capacity"),
              t("إدارة كفاءة التبريد ونظافة المياه", "Manage cooling efficiency and water hygiene to prevent algae"),
            ],
            difficulty: "intermediate",
            minutes: 100,
            skills: ["Climate Control", "Cooling Systems"],
            prerequisites: [t("هياكل الصوب", "Greenhouse structures")],
            task: t(
              "احسب عدد الشفاطات ومساحة خلايا التبريد لصوبة بمساحة 1000 م² وارتفاع 4 أمتار.",
              "Calculate the number of exhaust fans and pad area for a 1000 m² greenhouse with 4m gutter height.",
            ),
            promptFocus: t("تبريد الصوب الزراعية والتهوية", "Greenhouse cooling and ventilation"),
          },
        ],
      },
      {
        id: "gh-s2",
        order: 2,
        title: t("المرحلة 02 — ديناميكا المناخ الداخلي وإدارة VPD", "Stage 02 — Internal Climate Dynamics & VPD"),
        goal: t("التحكم الكامل في رطوبة وحرارة الصوبة ونقطة الندى.", "Master humidity, temperature, dew point and transpiration driving forces."),
        topics: [
          {
            id: "gh-t3",
            title: t("عجز ضغط بخار الماء VPD ومخطط السايكرومترك", "VPD management & psychrometric chart dynamics"),
            summary: t(
              "معادلة VPD، النطاق المثالي (0.8 - 1.2 kPa)، وعلاقته المباشرة بنتح النبات وامتصاص الكالسيوم وفتح الثغور.",
              "VPD formula, ideal crop ranges (0.8 - 1.2 kPa) and direct correlation to transpiration, calcium uptake and stomatal conductance.",
            ),
            why: t(
              "عدم ضبط الـ VPD يسبب عفن الطرف الزهري (Blossom End Rot) واحتراق الحواف (Tipburn) وانتشار الفطريات.",
              "Unmanaged VPD causes blossom-end rot, tipburn and explosive fungal spore germination.",
            ),
            outcomes: [
              t("حساب وتفسير قيم VPD وتحديد حالة نشاط النبات", "Calculate and interpret VPD to gauge plant activity"),
              t("تجنب نقطة الندى وتكثف المياه على الثمار", "Prevent dew point condensation on leaves and fruits"),
            ],
            difficulty: "intermediate",
            minutes: 120,
            skills: ["Climate Control", "VPD", "Plant Physiology"],
            prerequisites: [t("أساسيات المناخ", "Climate basics")],
            task: t(
              "إذا كانت حرارة الهواء 24°C والرطوبة 85% وحرارة سطح الورقة 22°C، احسب VPD وحدد الإجراء المناخي.",
              "Given air temp 24°C, RH 85% and leaf temp 22°C, compute VPD and determine the climate correction.",
            ),
            promptFocus: t("إدارة VPD في الصوب الزراعية", "VPD management in commercial greenhouses"),
          },
          {
            id: "gh-t4",
            title: t("الستائر والشاشات الحرارية وإدارة الضوء", "Thermal screens, shading curtains & light regulation"),
            summary: t(
              "تشغيل شاشات التظليل لحجب الإشعاع الزائد نهارًا والشاشات الحرارية الموفرة للطاقة لمنع الفقد الإشعاعي ليلًا.",
              "Operating shading screens to block excess solar radiation and energy-saving thermal screens to retain night heat.",
            ),
            why: t(
              "إدارة الستائر الصحيحة توفر حتى 35% من تكاليف التدفئة وتمنع احتراق الثمار صيفًا.",
              "Proper screen management saves up to 35% of heating energy and prevents summer fruit scorching.",
            ),
            outcomes: [
              t("برمجة شروط فتح وغلق الشاشات بناءً على الواط/م²", "Program screen open/close triggers based on W/m² radiation"),
              t("تقليل تكلفة الطاقة وتحسين المناخ الليلي", "Cut energy expenses while stabilizing night humidity"),
            ],
            difficulty: "intermediate",
            minutes: 90,
            skills: ["Climate Control", "Energy Management"],
            prerequisites: [t("ديناميكا المناخ", "Climate dynamics")],
            task: t(
              "ضع جدول استراتيجية تحريك الشاشات الحرارية على مدار 24 ساعة ليوم شتوي بارد.",
              "Create a 24-hour thermal screen strategy schedule for a cold winter day.",
            ),
            promptFocus: t("الشاشات الحرارية والستائر في الصوب", "Thermal and shade screens in greenhouses"),
          },
        ],
      },
      {
        id: "gh-s3",
        order: 3,
        title: t("المرحلة 03 — العمليات الفنية للمحاصيل السلكية", "Stage 03 — High-Wire Crop Management"),
        goal: t("إتقان عمليات رعاية المحصول السلكي لتحقيق أعلى إنتاجية تجارية.", "Master high-wire trellising, pruning, lowering and biological pollination."),
        topics: [
          {
            id: "gh-t5",
            title: t("التربية الرأسية، الترقيد (Lean & Lower) وخف العناقيد", "High-wire trellising, lean & lowering, and cluster pruning"),
            summary: t(
              "إدارة المحاصيل السلكية (طماطم غير محدودة النمو، فلفل، خيار): التوريق الدوري، الترقيد، وتوحيد أحجام الثمار.",
              "Managing indeterminate crops: de-leafing, lean-and-lowering hooks, and cluster pruning to standardize fruit grades.",
            ),
            why: t(
              "الترقيد والخف المنظم هو الفارق بين إنتاج 15 كجم/م² وإنتاج 60 كجم/م² بمواصفات تصديرية.",
              "Systematic lowering and cluster pruning separates a 15 kg/m² harvest from an export-grade 60 kg/m² yield.",
            ),
            outcomes: [
              t("وضع خطة خف العناقيد وفق قوة نمو الهجين ونمط الإشعاع", "Set pruning ratios according to vegetative balance and solar joules"),
              t("تدريب عمال الصوبة على التوريق والترقيد السليم دون إتلاف الساق", "Train greenhouse teams on clean de-leafing and stem lowering"),
            ],
            difficulty: "intermediate",
            minutes: 110,
            skills: ["Crop Operations", "High-Wire Training"],
            prerequisites: [t("فسيولوجيا النبات", "Plant physiology")],
            task: t(
              "صمم خطة خف عناقيد لطماطم شيري (Cherry) وعناقيد طماطم بيف (Beef) لموازنة الحمل الثمري.",
              "Design a cluster pruning guide for cherry vs beef tomato to balance vegetative and generative growth.",
            ),
            promptFocus: t("العمليات الفنية لمحاصيل الصوب السلكية", "High-wire crop technical operations"),
          },
          {
            id: "gh-t6",
            title: t("التلقيح الحيوي وإدارة خلايا النحل الطنان (Bombus)", "Biological pollination & Bumblebee management"),
            summary: t(
              "استخدام النحل الطنان في الصوب لتلقيح أزهار الطماطم والفلفل، سلوك النحل، وتوافقه مع المبيدات الحيوية.",
              "Using commercial bumblebees for buzz pollination in tomato and pepper greenhouses, colony lifecycle and spray safety.",
            ),
            why: t(
              "التلقيح بالهرمونات أو الهز اليدوي مكلف وذو جودة رديئة مقارنة بالنحل الذي يضمن امتلاء غرف الثمرة بالكامل.",
              "Hormonal or manual vibration pollination produces inferior hollow fruit compared to bumblebee buzz pollination.",
            ),
            outcomes: [
              t("فحص كفاءة التلقيح عبر علامات العض على متوك الزهرة", "Inspect pollination efficiency via flower bite marks"),
              t("حماية خلايا النحل وتوقيت إغلاقها عند الرش", "Protect bee hives and time closures during required treatments"),
            ],
            difficulty: "intermediate",
            minutes: 80,
            skills: ["Biological Pollination", "IPM Compatibility"],
            prerequisites: [t("العمليات الفنية", "Crop operations")],
            task: t(
              "اكتب بروتوكول فحص يومي لنسبة تلقيح أزهار الطماطم عبر علامات العض (Bite marks) وقرار استبدال الخلية.",
              "Write a daily inspection SOP for tomato flower bite marks and hive replacement timing.",
            ),
            promptFocus: t("إدارة النحل الطنان في الصوب", "Bumblebee hive management in commercial greenhouses"),
          },
        ],
      },
      {
        id: "gh-s4",
        order: 4,
        title: t("المرحلة 04 — كمبيوترات المناخ والأتمتة واستراتيجيات 24 ساعة", "Stage 04 — Climate Computers & 24h Automation"),
        goal: t("برمجة كمبيوتر المناخ وإدارة استراتيجيات الليل والنهار وتسميد CO2.", "Master climate computer programming, day/night DIF strategies and CO2 dosing."),
        topics: [
          {
            id: "gh-t7",
            title: t("برمجة كمبيوترات المناخ (Priva / Ridder / Hoogendoorn)", "Climate computers programming (Priva / Ridder)"),
            summary: t(
              "واجهات كمبيوترات المناخ، ضبط المنحنيات الحرارية، فترات الانتقال (P-bands)، وربط فتح النوافذ باتجاه وسرعة الرياح.",
              "Climate computer UI, target temperature curves, proportional bands, and windward/leeward vent coordination.",
            ),
            why: t(
              "أي خطأ في برمجة الكمبيوتر قد يفتح النوافذ وقت العاصفة أو يغلق التهوية فيذوب المحصول بالحرارة.",
              "A single programming mistake can open vents during a storm or seal a greenhouse into a lethal heat trap.",
            ),
            outcomes: [
              t("ضبط منحنى حراري يتدرج من النهار إلى الليل (Pre-night drop)", "Program day-to-night pre-night temperature drops"),
              t("تحليل سجلات الكمبيوتر واكتشاف أخطاء الحساسات والمحركات", "Analyze climate logs to diagnose actuator and sensor faults"),
            ],
            difficulty: "advanced",
            minutes: 150,
            skills: ["Climate Computers", "Automation", "Priva Systems"],
            prerequisites: [t("ديناميكا المناخ", "Climate dynamics")],
            task: t(
              "اكتب سيناريو إعدادات لكمبيوتر مناخ لمواجهة موجة حارة مفاجئة تتجاوز 42°C في الخارج.",
              "Formulate climate computer parameters to handle an abrupt 42°C exterior heatwave.",
            ),
            promptFocus: t("برمجة كمبيوتر المناخ بريفا وريدر", "Priva and Ridder climate computer programming"),
          },
          {
            id: "gh-t8",
            title: t("حقن ثاني أكسيد الكربون CO2 وتكامل الري مع الإشعاع", "CO2 enrichment & radiation-sum irrigation integration"),
            summary: t(
              "حقن غاز CO2 حتى 800-1000 PPM وقت فتح الثغور، وبرمجة نبضات الري بناءً على مجاميع الجول (Joules/cm²).",
              "CO2 dosing up to 800-1000 PPM during active photosynthesis, and triggering irrigation cycles on solar joule accumulation.",
            ),
            why: t(
              "رفع الـ CO2 يزيد المحصول بنسبة 20-30%، والري بحساب الجول يمنع غرق الجذور في الأيام الغائمة أو تعطيشها شمسًا.",
              "CO2 dosing lifts yields by 20-30%, while radiation-based irrigation prevents waterlogging on cloudy days.",
            ),
            outcomes: [
              t("حساب كمية CO2 المطلوبة حسب ساعات التهوية وسرعة الرياح", "Calculate CO2 demand relative to vent position and air exchange"),
              t("برمجة حجم وتوقيت نبضات الري على عداد الإشعاع الشمسي", "Program irrigation start triggers and pulse volumes on solar accumulation"),
            ],
            difficulty: "advanced",
            minutes: 130,
            skills: ["CO2 Enrichment", "Automated Fertigation"],
            prerequisites: [t("برمجة كمبيوتر المناخ", "Climate computer programming")],
            task: t(
              "احسب متى تبدأ النبضة الأولى للري وكم جول مطلوب بين النبضات ليوم مشمس كامل.",
              "Calculate the first morning irrigation start and required joule sum between pulses on a high-radiation day.",
            ),
            promptFocus: t("حقن CO2 والري الشمسي بالصوب", "CO2 enrichment and solar-radiation irrigation in greenhouses"),
          },
        ],
      },
      {
        id: "gh-s5",
        order: 5,
        title: t("المرحلة 05 — إدارة المجمع التجاري والجاهزية الوظيفية", "Stage 05 — Commercial Facility Management & Career Readiness"),
        goal: t("إدارة العمليات والتكاليف والعمالة وجاهزية المقابلات الفنية لكبرى المزارع.", "Manage commercial facility P&L, workforce efficiency, export audits and technical interviews."),
        topics: [
          {
            id: "gh-t9",
            title: t("إنتاجية العمالة، تكاليف الطاقة وحسابات الـ P&L", "Labour productivity, energy costing & facility P&L"),
            summary: t(
              "مؤشرات كفاءة العمالة (ساعات التوريق، الجمع بالكيلو لكل ساعة)، حساب تكلفة التبريد والتدفئة لكل كجم منتج، وإدارة فرق العمل.",
              "Labour KPIs (de-leafing meters/hour, harvesting kg/hour), cooling and heating cost per kg of yield, and crew scheduling.",
            ),
            why: t(
              "العمالة والطاقة تمثلان أكثر من 60% من مصاريف تشغيل الصوب، وإدارتهما تحدد ربحية المشروع.",
              "Labour and energy account for over 60% of greenhouse operating expenses; mastering them defines project profitability.",
            ),
            outcomes: [
              t("إعداد نموذج متابعة تكاليف التشغيل وإنتاجية العمالة اليومية", "Build a daily labour and operational cost tracking template"),
              t("التنبؤ الأسبوعي بالكميات المحصودة (Yield Forecasting)", "Execute weekly crop yield and grading forecasts for sales teams"),
            ],
            difficulty: "advanced",
            minutes: 140,
            skills: ["Facility Management", "Labour Management", "Costing"],
            prerequisites: [t("العمليات ومبرمجة المناخ", "Operations & climate control")],
            task: t(
              "ابنِ لوحة قياس مؤشرات أداء (KPIs) لـ 20 عاملاً في صوبة طماطم 5 هكتار مع نظام حوافز مرتبط بالجودة.",
              "Build a performance KPI dashboard for 20 greenhouse workers across 5 hectares with a quality incentive scheme.",
            ),
            promptFocus: t("إدارة الصوب التجارية وحساب التكاليف", "Commercial greenhouse management and costing"),
          },
          {
            id: "gh-t10",
            title: t("ملف إدارة الصوب والتحضير للمقابلات الفنية", "Greenhouse portfolio, GlobalG.A.P audits & interview prep"),
            summary: t(
              "إعداد ملف أعمال احترافي يحوي استراتيجيات مناخية حقيقية، اجتياز مراجعات GlobalG.A.P، والتدريب على أسئلة مقابلات كبرى الشركات.",
              "Assembling a professional operational portfolio, mastering GlobalG.A.P audit requirements, and rehearsing technical interview scenarios.",
            ),
            why: t(
              "المشاريع الكبرى توظف المهندس القادر على قيادة موقع بالكامل وحل الأزمات المناخية تحت الضغط.",
              "Agribusiness mega-projects hire growers who demonstrate crisis management under intense climatic pressure.",
            ),
            outcomes: [
              t("ملف أعمال جاهز يتضمن خطة مناخ سنوية وحسابات VPD وتكاليف", "Ready portfolio with seasonal climate strategies, VPD logs and OpEx models"),
              t("إجابة أسئلة المقابلات الفنية لشركات الصوب الزراعية الكبرى بثقة", "Confidently answer technical interview questions for major commercial growers"),
            ],
            difficulty: "advanced",
            minutes: 150,
            skills: ["Portfolio", "GlobalG.A.P", "Technical Interview"],
            prerequisites: [t("مراحل 1-4", "Stages 1-4")],
            task: t(
              "أجرِ محاكاة مقابلة لوظيفة مدير تشغيل صوب زراعية مع المرشد الذكي تغطي أزمة تعطل التبريد في يوم شديد الحرارة.",
              "Run a mock technical interview for a Greenhouse Operations Manager role addressing a cooling pad failure during a 45°C day.",
            ),
            promptFocus: t("مقابلات مهندس صوب زراعية", "Greenhouse grower and manager technical interviews"),
          },
        ],
      },
    ],
    projects: [
      {
        id: "gh-p1",
        title: t("استراتيجية مناخ لصوبة طماطم", "Climate strategy for a tomato greenhouse"),
        level: "intermediate",
        objective: t("خطة مناخ أسبوعية تقلل الأمراض.", "A weekly climate plan that reduces disease."),
        problem: t("رطوبة مرتفعة ليلًا وانتشار البوتريتس.", "High night humidity and Botrytis spread."),
        skills: ["Climate Control"],
        tools: ["Sensors", "Excel"],
        steps: [t("تحليل بيانات المناخ", "Analyse climate data")],
        deliverables: [t("خطة مناخ + مؤشرات", "Climate plan + KPIs")],
        portfolio: t("يعرض فهمك للتشغيل الفعلي.", "Shows real operational understanding."),
      },
    ],
  },
  {
    id: "ag-engineering",
    name: t("الهندسة الزراعية والميكنة", "Agricultural Engineering & Mechanization"),
    tagline: t("آلات ومعدات وأتمتة الحقل", "Machinery, equipment and field automation"),
    description: t(
      "الآلات الزراعية، اختيار المعدات وصيانتها، الميكنة، هندسة الريّ وتقنيات الصوب والأتمتة.",
      "Agricultural machinery, equipment selection and maintenance, mechanization, irrigation engineering, greenhouse technology and automation.",
    ),
    icon: "Cog",
    difficulty: "intermediate",
    hours: 140,
    demand: 3,
    skills: ["Machinery", "Maintenance", "Mechanization", "Equipment Selection"],
    tools: ["Maintenance logs", "CAD", "Field machinery"],
    topicsPool: [
      t("الآلات الزراعية", "Agricultural machinery"),
      t("الميكنة", "Mechanization"),
      t("الصيانة", "Maintenance"),
      t("اختيار المعدات", "Equipment selection"),
    ],
    roles: [
      {
        id: "mechanization-engineer",
        title: t("مهندس ميكنة زراعية", "Mechanization Engineer"),
        description: t(
          "يختار المعدات المناسبة ويجدول الصيانة ويحسب تكلفة الساعة التشغيلية.",
          "Selects suitable equipment, schedules maintenance and computes hourly operating cost.",
        ),
        responsibilities: [t("إدارة أسطول المعدات", "Manage the equipment fleet")],
        skills: ["Machinery", "Maintenance"],
        tools: ["Maintenance logs", "Excel"],
        entry: t("حساب تكلفة تشغيل آلة", "Compute machine operating cost"),
        senior: t("إدارة أسطول ومشاريع ميكنة", "Fleet and mechanization project management"),
      },
    ],
    mentorPersona: t(
      "أنت مهندس ميكنة زراعية بخبرة تشغيل وصيانة أساطيل.",
      "You are an agricultural mechanization engineer experienced in fleet operations and maintenance.",
    ),
    stages: [],
    projects: [
      {
        id: "ae-p1",
        title: t("خطة صيانة وقائية لأسطول مزرعة", "Preventive maintenance plan for a farm fleet"),
        level: "intermediate",
        objective: t("تقليل التوقفات في الموسم.", "Reduce in-season downtime."),
        problem: t("أعطال متكررة وقت الحصاد.", "Repeated breakdowns during harvest."),
        skills: ["Maintenance"],
        tools: ["Excel"],
        steps: [t("جرد المعدات", "Inventory the equipment")],
        deliverables: [t("جدول صيانة سنوي", "Annual maintenance schedule")],
        portfolio: t("يبرز مهارة الإدارة التشغيلية.", "Highlights operational management skill."),
      },
    ],
  },
  {
    id: "food-safety",
    name: t("سلامة وجودة الغذاء", "Food Safety & Quality"),
    tagline: t("HACCP وتتبع وتدقيق", "HACCP, traceability and auditing"),
    description: t(
      "سلامة الغذاء وأنظمة HACCP و GMP و GHP، مراقبة وضمان الجودة، التتبع والتدقيق. مسار قوي في محطات التعبئة والتصدير.",
      "Food safety with HACCP, GMP and GHP, quality control and assurance, traceability and auditing. A strong path in packhouses and export.",
    ),
    icon: "ShieldCheck",
    difficulty: "intermediate",
    hours: 110,
    demand: 5,
    skills: ["HACCP", "GMP", "Quality Control", "Traceability", "Auditing"],
    tools: ["Checklists", "QMS documents", "Excel"],
    topicsPool: [
      t("سلامة الغذاء", "Food safety"),
      t("HACCP", "HACCP"),
      t("ضمان الجودة", "Quality assurance"),
      t("التتبع", "Traceability"),
      t("التدقيق", "Auditing"),
    ],
    roles: [
      {
        id: "qa-officer",
        title: t("مسؤول ضمان جودة", "Quality Assurance Officer"),
        description: t(
          "يبني وثائق النظام ويراقب الالتزام ويجهّز المنشأة للتدقيق الخارجي.",
          "Builds system documentation, monitors compliance and prepares the facility for external audits.",
        ),
        responsibilities: [t("متابعة نقاط التحكم الحرجة", "Monitor critical control points")],
        skills: ["HACCP", "Auditing"],
        tools: ["Checklists", "QMS"],
        entry: t("فهم خطة HACCP وتوثيقها", "Understand and document a HACCP plan"),
        senior: t("قيادة تدقيق واعتماد", "Lead audits and certification"),
      },
    ],
    mentorPersona: t(
      "أنت مدير جودة معتمد عمل في محطات تعبئة وتصدير.",
      "You are a certified quality manager from packhouse and export operations.",
    ),
    stages: [],
    projects: [
      {
        id: "fs-p1",
        title: t("بناء خطة HACCP لخط تعبئة", "Build a HACCP plan for a packing line"),
        level: "advanced",
        objective: t("خطة كاملة مع نقاط تحكم حرجة.", "A complete plan with critical control points."),
        problem: t("رفض شحنة تصدير لأسباب جودة.", "An export shipment rejected on quality grounds."),
        skills: ["HACCP", "Quality Control"],
        tools: ["QMS documents"],
        steps: [t("تحليل المخاطر", "Hazard analysis")],
        deliverables: [t("خطة HACCP موثقة", "Documented HACCP plan")],
        portfolio: t("مطلوب مباشرة في مقابلات الجودة.", "Directly asked for in quality interviews."),
      },
    ],
  },
  {
    id: "agribusiness",
    name: t("الأعمال والمبيعات الزراعية", "Agricultural Business & Sales"),
    tagline: t("مبيعات فنية وفهم السوق", "Technical sales and market understanding"),
    description: t(
      "المبيعات الفنية الزراعية، فهم العميل، معرفة المنتج، تحليل السوق، مهارات التفاوض وإدارة العلاقات.",
      "Agricultural technical sales, customer understanding, product knowledge, market analysis, negotiation and CRM.",
    ),
    icon: "TrendingUp",
    difficulty: "beginner",
    hours: 100,
    demand: 5,
    skills: ["Technical Sales", "Market Analysis", "Negotiation", "CRM", "Communication"],
    tools: ["CRM", "Excel", "Presentation tools"],
    topicsPool: [
      t("المبيعات الفنية", "Technical sales"),
      t("فهم العميل", "Customer understanding"),
      t("تحليل السوق", "Market analysis"),
      t("التفاوض", "Negotiation"),
    ],
    roles: [
      {
        id: "technical-sales",
        title: t("مهندس مبيعات فنية", "Technical Sales Engineer"),
        description: t(
          "يربط الحل الفني باحتياج المزارع ويحقق مستهدفات البيع.",
          "Matches technical solutions to grower needs and hits sales targets.",
        ),
        responsibilities: [t("زيارات ميدانية وعروض فنية", "Field visits and technical demos")],
        skills: ["Technical Sales", "Communication"],
        tools: ["CRM", "Excel"],
        entry: t("معرفة المنتج + مهارة زيارة", "Product knowledge + visit skills"),
        senior: t("إدارة منطقة ومحفظة عملاء", "Manage a territory and customer portfolio"),
      },
    ],
    mentorPersona: t(
      "أنت مدير مبيعات زراعية بنى فرقًا ناجحة في السوق.",
      "You are an agricultural sales manager who has built successful field teams.",
    ),
    stages: [],
    projects: [
      {
        id: "ab-p1",
        title: t("خطة اختراق سوق لمنتج زراعي", "Market entry plan for an agri-input"),
        level: "intermediate",
        objective: t("خطة بيع لمنطقة محددة.", "A sales plan for a defined territory."),
        problem: t("منتج جيد بمبيعات ضعيفة.", "A good product with weak sales."),
        skills: ["Market Analysis", "Technical Sales"],
        tools: ["Excel", "CRM"],
        steps: [t("تحليل المنافسين", "Analyse competitors")],
        deliverables: [t("خطة بيع + عرض تقديمي", "Sales plan + pitch deck")],
        portfolio: t("يثبت تفكيرك التجاري.", "Proves commercial thinking."),
      },
    ],
  },
  {
    id: "ag-research",
    name: t("البحث الزراعي والبيانات", "Agricultural Research & Data"),
    tagline: t("تصميم تجارب وتحليل نتائج", "Experimental design and analysis"),
    description: t(
      "تصميم التجارب، جمع البيانات، التحليل الإحصائي، مناهج البحث، تصوير البيانات والتواصل العلمي.",
      "Experimental design, data collection, statistical analysis, research methods, data visualization and scientific communication.",
    ),
    icon: "FlaskConical",
    difficulty: "advanced",
    hours: 130,
    demand: 3,
    skills: ["Experimental Design", "Statistics", "Data Visualization", "Scientific Writing"],
    tools: ["R", "SPSS", "Excel", "Zotero"],
    topicsPool: [
      t("تصميم التجارب", "Experimental design"),
      t("التحليل الإحصائي", "Statistical analysis"),
      t("مناهج البحث", "Research methods"),
      t("التواصل العلمي", "Scientific communication"),
    ],
    roles: [
      {
        id: "research-assistant",
        title: t("باحث / مساعد بحث زراعي", "Agricultural Research Assistant"),
        description: t(
          "ينفّذ التجارب الحقلية ويحلل النتائج ويكتب التقارير العلمية.",
          "Runs field trials, analyses results and writes scientific reports.",
        ),
        responsibilities: [t("تنفيذ تجربة بتصميم إحصائي سليم", "Run a trial with sound statistical design")],
        skills: ["Experimental Design", "Statistics"],
        tools: ["R", "Excel"],
        entry: t("RCBD وتحليل ANOVA", "RCBD and ANOVA"),
        senior: t("نشر علمي وقيادة مشاريع بحثية", "Publication and leading research projects"),
      },
    ],
    mentorPersona: t(
      "أنت باحث زراعي أول خبير في تصميم التجارب الحقلية.",
      "You are a senior agricultural researcher expert in field trial design.",
    ),
    stages: [],
    projects: [
      {
        id: "ar-p1",
        title: t("تصميم تجربة مقارنة معاملات تسميد", "Design a fertilization trial"),
        level: "advanced",
        objective: t("تجربة قابلة للتحليل إحصائيًا.", "A statistically analysable trial."),
        problem: t("نتائج حقلية غير قابلة للاستنتاج.", "Field results that cannot support conclusions."),
        skills: ["Experimental Design", "Statistics"],
        tools: ["R", "Excel"],
        steps: [t("اختيار التصميم والمكررات", "Choose design and replications")],
        deliverables: [t("بروتوكول تجربة + تحليل", "Trial protocol + analysis")],
        portfolio: t("مهم لمسار البحث والدراسات العليا.", "Key for research and postgraduate paths."),
      },
    ],
  },
  {
    id: "agtech",
    name: t("تكنولوجيا الزراعة AgTech", "Agricultural Technology / AgTech"),
    tagline: t("إنترنت الأشياء والذكاء الاصطناعي والروبوتات", "IoT, AI and robotics"),
    description: t(
      "الزراعة الذكية، إنترنت الأشياء، الحساسات، الأتمتة، الذكاء الاصطناعي والرؤية الحاسوبية والروبوتات الزراعية.",
      "Smart agriculture, IoT, sensors, automation, AI, computer vision and agricultural robotics.",
    ),
    icon: "Cpu",
    difficulty: "advanced",
    hours: 170,
    demand: 4,
    skills: ["IoT", "Sensors", "Automation", "AI in Agriculture", "Computer Vision"],
    tools: ["Arduino/ESP32", "Python", "Dashboards", "Cloud platforms"],
    topicsPool: [
      t("الزراعة الذكية", "Smart agriculture"),
      t("إنترنت الأشياء", "IoT"),
      t("الحساسات", "Sensors"),
      t("الذكاء الاصطناعي في الزراعة", "AI in agriculture"),
      t("الروبوتات", "Robotics"),
    ],
    roles: [
      {
        id: "agtech-specialist",
        title: t("متخصص AgTech", "AgTech Specialist"),
        description: t(
          "يربط بين احتياج المزرعة والحل التقني ويشرف على التركيب والتشغيل.",
          "Bridges farm needs and technical solutions, overseeing installation and operation.",
        ),
        responsibilities: [t("تركيب حساسات ومتابعة لوحات البيانات", "Install sensors and monitor dashboards")],
        skills: ["IoT", "Sensors", "Automation"],
        tools: ["ESP32", "Python", "Dashboards"],
        entry: t("فهم الحساسات ولوحات المتابعة", "Sensor and dashboard literacy"),
        senior: t("تصميم حلول ذكية متكاملة", "Design full smart-farming solutions"),
      },
    ],
    mentorPersona: t(
      "أنت مهندس AgTech نفّذ حلول إنترنت أشياء في مزارع تجارية.",
      "You are an AgTech engineer who deployed IoT solutions on commercial farms.",
    ),
    stages: [],
    projects: [
      {
        id: "at-p1",
        title: t("محطة مراقبة تربة بإنترنت الأشياء", "IoT soil monitoring station"),
        level: "advanced",
        objective: t("قياس الرطوبة وإرسال التنبيهات.", "Measure moisture and push alerts."),
        problem: t("ريّ زائد يرفع التكلفة ويضر الجذور.", "Over-irrigation raising cost and harming roots."),
        skills: ["IoT", "Sensors"],
        tools: ["ESP32", "Dashboards"],
        steps: [t("تجميع الدائرة والحساسات", "Assemble circuit and sensors")],
        deliverables: [t("نموذج عامل + لوحة بيانات", "Working prototype + dashboard")],
        portfolio: t("مشروع مميز جدًا في ملف AgTech.", "A standout AgTech portfolio project."),
      },
    ],
  },
];

// Fill any specialization without hand-written stages with an ordered
// foundations -> job-ready roadmap.
for (const s of specializations) {
  if (s.stages.length === 0) s.stages = extraStages(s.id, s.name);
}


export const getSpecialization = (id: string) => specializations.find((s) => s.id === id);

export const allTopics = specializations.flatMap((s) =>
  s.stages.flatMap((st) => st.topics.map((tp) => ({ topic: tp, stage: st, spec: s }))),
);

export const allProjects = specializations.flatMap((s) =>
  s.projects.map((p) => ({ project: p, spec: s })),
);

export const getTopic = (specId: string, topicId: string) => {
  const spec = getSpecialization(specId);
  if (!spec) return undefined;
  for (const stage of spec.stages) {
    const topic = stage.topics.find((tp) => tp.id === topicId);
    if (topic) return { spec, stage, topic };
  }
  return undefined;
};

export function buildPrompt(opts: {
  lang: "ar" | "en";
  persona: string;
  topic: string;
  focus: string;
  level: string;
  goal: string;
  task: string;
}) {
  if (opts.lang === "ar") {
    return `${opts.persona}
مهمتك أن تعلّمني موضوع: «${opts.topic}» (${opts.focus}) من مستوى ${opts.level} حتى المستوى المهني، مع التركيز على ما يحتاجه سوق العمل فعليًا.
هدفي المهني: ${opts.goal || "العمل كمهندس زراعي محترف في هذا التخصص"}.

اتبع هذا الترتيب بدقة:
1) شرح مبسط بلغة عملية بدون حشو أكاديمي.
2) مثال حقلي واقعي من مزرعة أو شركة.
3) الأخطاء الشائعة التي يرتكبها المهندسون الجدد في هذا الموضوع.
4) الأدوات المستخدمة في الشركات وكيف تُستخدم.
5) تمرين عملي أنفّذه بنفسي: ${opts.task}
6) اختبار من 5 أسئلة قصيرة ثم صحّح إجاباتي وأعطني تقييمًا.
7) ثلاثة أسئلة مقابلة عمل حول هذا الموضوع مع نموذج إجابة قوية.
8) الخطوة التالية الموصى بها في مساري.

اسألني سؤالًا واحدًا عن مستواي الحالي قبل أن تبدأ.`;
  }
  return `${opts.persona}
Teach me the topic "${opts.topic}" (${opts.focus}) from ${opts.level} level to professional level, focused strictly on what the job market actually requires.
My career goal: ${opts.goal || "working as a professional agricultural engineer in this field"}.

Follow this exact order:
1) Practical explanation, no academic filler.
2) A realistic field example from a farm or company.
3) Common mistakes junior engineers make on this topic.
4) Tools used in industry and how they are used.
5) A hands-on exercise for me: ${opts.task}
6) A 5-question quiz, then grade my answers and give feedback.
7) Three interview questions on this topic with strong model answers.
8) The recommended next step in my roadmap.

Ask me one question about my current level before you begin.`;
}
