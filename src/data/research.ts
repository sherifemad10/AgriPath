import type { ResearchPaper } from "@/types";

const t = (ar: string, en: string) => ({ ar, en });

export const researchPapers: ResearchPaper[] = [
  {
    id: "r1",
    title: t(
      "استخدام مؤشر NDVI من أقمار سنتينل-2 للتنبؤ بإنتاجية القمح",
      "Sentinel-2 NDVI for wheat yield prediction",
    ),
    journal: "Remote Sensing",
    year: 2024,
    authors: "Zhang et al.",
    specializationId: "digital-agriculture",
    summary: t(
      "الدراسة اختبرت قدرة مؤشر NDVI المستخرج من صور سنتينل-2 على التنبؤ بإنتاجية القمح قبل الحصاد بستة أسابيع على 120 حقلًا تجاريًا.",
      "The study tested how well Sentinel-2 NDVI predicts wheat yield six weeks before harvest across 120 commercial fields.",
    ),
    findings: [
      t(
        "أعلى ارتباط بالإنتاجية كان في مرحلة طرد السنابل (R² = 0.78).",
        "Correlation with yield peaked at heading stage (R² = 0.78).",
      ),
      t(
        "دمج NDVI مع درجات الحرارة التراكمية رفع الدقة إلى 0.85.",
        "Combining NDVI with growing degree days raised accuracy to 0.85.",
      ),
      t(
        "الحقول المالحة أعطت قراءات مضللة تحتاج تصحيحًا بمؤشر SAVI.",
        "Saline fields gave misleading readings; SAVI correction is needed.",
      ),
    ],
    application: t(
      "استخدم صورة NDVI أسبوعية في مرحلة طرد السنابل لتقسيم الحقل إلى مناطق إدارة وتوجيه التسميد المتغير، وصحّح القراءات في المناطق المالحة.",
      "Use weekly NDVI at heading to build management zones for variable-rate fertilization, and correct readings on saline patches.",
    ),
    url: "https://www.mdpi.com/journal/remotesensing",
  },
  {
    id: "r2",
    title: t(
      "إدارة ملوحة التربة بالغسيل المتحكم فيه في الأراضي الجديدة",
      "Managing soil salinity with controlled leaching in newly reclaimed land",
    ),
    journal: "Agricultural Water Management",
    year: 2023,
    authors: "El-Sayed & Ibrahim",
    specializationId: "soil-water",
    summary: t(
      "تجربة حقلية على ثلاث سنوات لتقييم متطلبات الغسيل اللازمة لخفض ملوحة التربة في أراضٍ رملية حديثة الاستصلاح.",
      "A three-year field trial evaluating leaching requirements to reduce salinity in newly reclaimed sandy soils.",
    ),
    findings: [
      t(
        "غسيل بنسبة 15% فوق الاحتياج المائي خفض EC من 6.2 إلى 2.8 dS/m.",
        "A 15% leaching fraction cut EC from 6.2 to 2.8 dS/m.",
      ),
      t(
        "الغسيل الليلي كان أكفأ بنسبة 22% في استهلاك المياه.",
        "Night leaching was 22% more water-efficient.",
      ),
      t(
        "بدون مصارف فعالة عاد التملح خلال موسم واحد.",
        "Without working drains, salinity returned within one season.",
      ),
    ],
    application: t(
      "احسب متطلب الغسيل من تحليل EC لماء الريّ والتربة، ونفّذه ليلًا، وتأكد من عمل شبكة الصرف قبل أي برنامج غسيل.",
      "Compute the leaching requirement from irrigation and soil EC, apply it at night, and verify drainage works before any leaching program.",
    ),
    url: "https://www.sciencedirect.com/journal/agricultural-water-management",
  },
  {
    id: "r3",
    title: t(
      "المكافحة المتكاملة لذبابة الفاكهة باستخدام المصائد الفرمونية",
      "Integrated pest management of fruit fly using pheromone traps",
    ),
    journal: "Crop Protection",
    year: 2024,
    authors: "Kumar et al.",
    specializationId: "plant-protection",
    summary: t(
      "مقارنة بين برنامج رش تقليدي وبرنامج متكامل يعتمد على المصائد الفرمونية والرش الموضعي في بساتين المانجو.",
      "Comparison of a conventional spray program with an IPM program based on pheromone traps and spot spraying in mango orchards.",
    ),
    findings: [
      t("انخفاض الإصابة بنسبة 61% مع 3 مصائد للفدان.", "Infestation dropped 61% with 3 traps per acre."),
      t("انخفاض استهلاك المبيدات بنسبة 48%.", "Pesticide use fell by 48%."),
      t(
        "عدد الحشرات في المصيدة أسبوعيًا كان أفضل مؤشر لتوقيت الرش.",
        "Weekly trap counts were the best spray-timing indicator.",
      ),
    ],
    application: t(
      "ابنِ سجل مراقبة أسبوعي لعدد الحشرات في المصائد واربط قرار الرش بعتبة اقتصادية بدل الرش بالجدول الزمني.",
      "Keep a weekly trap-count log and tie spray decisions to an economic threshold instead of a fixed calendar.",
    ),
    url: "https://www.sciencedirect.com/journal/crop-protection",
  },
  {
    id: "r4",
    title: t(
      "تأثير درجة حرارة المحلول المغذي على إنتاج الخس في نظام NFT",
      "Nutrient solution temperature effects on lettuce in NFT systems",
    ),
    journal: "Horticulturae",
    year: 2025,
    authors: "Park & Lee",
    specializationId: "hydroponics",
    summary: t(
      "دراسة أثر أربع درجات حرارة للمحلول المغذي على نمو الخس وتركيز الأكسجين المذاب ومعدل تعفن الجذور.",
      "Four nutrient solution temperatures were tested for lettuce growth, dissolved oxygen and root rot incidence.",
    ),
    findings: [
      t("أفضل نمو عند 20–22°م.", "Best growth at 20–22°C."),
      t(
        "فوق 26°م انخفض الأكسجين المذاب 35% وزاد تعفن الجذور.",
        "Above 26°C dissolved oxygen dropped 35% and root rot rose.",
      ),
      t("تبريد المحلول أرخص من تبريد الصوبة كاملة.", "Chilling the solution is cheaper than cooling the whole greenhouse."),
    ],
    application: t(
      "راقب حرارة الخزان يوميًا واستهدف 20–22°م، وإذا ارتفعت استخدم تظليل الخزان أو مبرّدًا صغيرًا بدل تبريد الصوبة.",
      "Log tank temperature daily, target 20–22°C, and shade the tank or add a small chiller instead of cooling the house.",
    ),
    url: "https://www.mdpi.com/journal/horticulturae",
  },
  {
    id: "r5",
    title: t(
      "جدولة الريّ بالاعتماد على حساسات رطوبة التربة مقابل البخر-نتح",
      "Sensor-based versus ET-based irrigation scheduling",
    ),
    journal: "Irrigation Science",
    year: 2023,
    authors: "Moreno et al.",
    specializationId: "irrigation",
    summary: t(
      "مقارنة موسمين من جدولة الريّ بحساسات رطوبة التربة مقابل حساب البخر-نتح المرجعي في محصول الطماطم.",
      "Two seasons comparing soil-moisture sensor scheduling with reference ET calculations in tomato.",
    ),
    findings: [
      t("توفير 18% من المياه بالحساسات دون خفض الإنتاج.", "Sensors saved 18% water with no yield loss."),
      t(
        "الجمع بين الطريقتين أعطى أفضل ثبات في الإنتاجية.",
        "Combining both methods gave the most stable yield.",
      ),
      t("موضع الحساس أهم من عدد الحساسات.", "Sensor placement mattered more than sensor count."),
    ],
    application: t(
      "ضع حساسين على عمقي الجذور الفعالين في منطقة تمثيلية، واستخدم البخر-نتح كتحقق أسبوعي للجدول.",
      "Place two sensors at the effective root depths in a representative zone and use ET as a weekly sanity check.",
    ),
    url: "https://link.springer.com/journal/271",
  },
  {
    id: "r6",
    title: t(
      "تطبيق HACCP في خطوط تعبئة الخضروات الطازجة",
      "HACCP implementation in fresh vegetable packing lines",
    ),
    journal: "Food Control",
    year: 2024,
    authors: "Rossi et al.",
    specializationId: "food-safety",
    summary: t(
      "تحليل 40 خط تعبئة لتحديد نقاط التحكم الحرجة الأكثر تكرارًا وأسباب فشل التدقيق.",
      "Analysis of 40 packing lines identifying the most common critical control points and audit failure causes.",
    ),
    findings: [
      t(
        "أكثر نقطة حرجة فشلًا هي تركيز الكلور في ماء الغسيل.",
        "The most-failed CCP was chlorine concentration in wash water.",
      ),
      t("70% من حالات الفشل سببها سجلات ناقصة لا عملية خاطئة.", "70% of failures came from incomplete records, not bad process."),
      t("تدريب العمال خفض الانحرافات بنسبة النصف.", "Worker training halved deviations."),
    ],
    application: t(
      "ابنِ نموذج سجل يومي لتركيز الكلور ودرجة الحرارة مع توقيع المسؤول، ودرّب العمال على التسجيل لحظيًا.",
      "Build a daily log for chlorine and temperature with a signature, and train workers to record in real time.",
    ),
    url: "https://www.sciencedirect.com/journal/food-control",
  },
  {
    id: "r7",
    title: t(
      "الروبوتات الزراعية لإزالة الأعشاب: الجدوى الاقتصادية",
      "Agricultural weeding robots: economic feasibility",
    ),
    journal: "Computers and Electronics in Agriculture",
    year: 2025,
    authors: "Nguyen et al.",
    specializationId: "agtech",
    summary: t(
      "تقييم اقتصادي لروبوتات إزالة الأعشاب بالرؤية الحاسوبية في محاصيل الخضر عالية القيمة.",
      "Economic assessment of vision-based weeding robots in high-value vegetable crops.",
    ),
    findings: [
      t("فترة استرداد رأس المال 2.4 سنة فوق 50 هكتارًا.", "Payback period of 2.4 years above 50 hectares."),
      t("دقة التعرف على الأعشاب 93% في ظروف نهارية ثابتة.", "93% weed detection accuracy under stable daylight."),
      t("الأداء يتراجع بشدة في التربة الرطبة جدًا.", "Performance degrades sharply on very wet soil."),
    ],
    application: t(
      "قيّم المساحة والعمالة قبل التوصية بالروبوت، واحسب الاسترداد على أساس تكلفة العمالة الحقيقية في منطقتك.",
      "Check area and labour cost before recommending a robot, and compute payback from real local labour cost.",
    ),
    url: "https://www.sciencedirect.com/journal/computers-and-electronics-in-agriculture",
  },
  {
    id: "r8",
    title: t(
      "تصميم التجارب الحقلية: أخطاء شائعة في التحليل الإحصائي",
      "Field experiment design: common statistical mistakes",
    ),
    journal: "Field Crops Research",
    year: 2023,
    authors: "Ahmed & Novak",
    specializationId: "ag-research",
    summary: t(
      "مراجعة 200 ورقة بحثية زراعية لحصر الأخطاء الإحصائية الأكثر شيوعًا في التجارب الحقلية.",
      "A review of 200 agronomy papers cataloguing the most frequent statistical mistakes in field trials.",
    ),
    findings: [
      t("41% من الأوراق بها تكرارات غير كافية.", "41% of papers had insufficient replication."),
      t("الخلط بين التكرار والقياس المتعدد شائع جدًا.", "Confusing replication with subsampling was very common."),
      t("إهمال تأثير الموقع أدى لنتائج غير قابلة للتعميم.", "Ignoring site effects produced non-generalizable results."),
    ],
    application: t(
      "خطط للتجربة بثلاث تكرارات على الأقل، وفرّق بين وحدة التجربة والقياسات داخلها قبل جمع أي بيانات.",
      "Plan at least three true replicates and separate the experimental unit from subsamples before collecting data.",
    ),
    url: "https://www.sciencedirect.com/journal/field-crops-research",
  },
];
