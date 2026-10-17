/* Template library. Each template returns a fresh document object. */
const SH = (function () {
  const col = (key, label, w, kind, expr) => ({ key, label, w: w || 1, kind: kind || "text", expr: expr || "" });
  const doc = (o) => Object.assign({ lang: "ar", orient: "landscape", logo: true, subtitle: "سفن هاندز | قسم تكنولوجيا المعلومات", meta: [], blocks: [] }, o);
  const sign = (items) => ({ type: "sign", items });
  const rows = (arr) => arr.map((r) => r.map((x) => (x === null || x === undefined ? "" : String(x))));
  const blank = (n, cols) => Array.from({ length: n }, () => Array(cols).fill(""));

  const partsA = [
    ["معالج Ryzen 7 5700 (مقبس AM4، صينية أو علبة)", "6,799"], ["مذربورد B550M يدعم DDR4 (مثل ASUS PRIME B550M-K ARGB)", "4,199"],
    ["رام 32GB DDR4-3200 (2 × 16GB) للديسكتوب", "13,000"], ["مبرد معالج يدعم AM4 و LGA1700", "1,249"],
    ["كيس mATX/ATX مع باور 650W 80+ Bronze", "3,399"], ["كارت شاشة RTX 3050 6GB (2 HDMI + 1 DP)", "13,800"],
    ["هارد NVMe سعة 1TB", "7,350"], ["معالج Intel Core i5-14400F (مقبس LGA1700)", "7,699"],
    ["مذربورد B760M يدعم DDR4 (مثل ASUS PRIME B760M-K D4)", "5,199"], ["رخصة Windows 11 Pro (ريتيل أو OEM)", "اسأل"],
    ["جهاز كامل: Ryzen 7 5700 + RTX 5060 8GB + 500GB (مثل Sigma Fighter B65)", "47,000"], ["جهاز كامل: i5-12400F + RTX 5060 8GB (مثل Sigma Fighter A65)", "45,275"]];
  const partsB = [
    ["ماوس سلكي Logitech B100", "199"], ["ماوس لاسلكي Logitech M185", "549"], ["كيبورد Logitech K120 بحروف عربي", "500"], ["كومبو لاسلكي Logitech MK270", "1,299"],
    ["كومبو سلكي Logitech MK120", "675"], ["ماوس بلوتوث صامت Logitech M240", "899"], ["كابل HDMI طول 1.5 متر (18Gbps)", "95"], ["كابل DisplayPort طول 1.8 متر", "95"],
    ["سلك باور للكمبيوتر C13 طول 1.5 متر", "35"], ["هاب USB 3.0 بأربع منافذ", "100"], ["هاب USB-C سبعة في واحد", "390"], ["ماوس باد Logitech Studio Series", "549"]];
  const priceCols = () => [col("n", "م", 0.4), col("item", "البند والمواصفات", 3.4), col("ref", "السعر المرجعي أونلاين (جنيه)", 1.2),
    col("p1", "محل 1: السعر", 1), col("s1", "محل 1: المخزون", 0.9), col("p2", "محل 2: السعر", 1), col("s2", "محل 2: المخزون", 0.9),
    col("p3", "محل 3: السعر", 1), col("s3", "محل 3: المخزون", 0.9), col("w", "الضمان", 0.8), col("best", "الأفضل", 0.8)];
  const priceRows = (list, start) => list.map((r, i) => [String(start + i), r[0], r[1], "", "", "", "", "", "", "", ""]);

  const T = [];
  T.push({ id: "bostan", icon: "🏬", ar: "ورقة مقارنة الأسعار: مول البستان", en: "Price comparison sheet: Bostan Mall", desc: "ورقة تُملأ في المحل: 3 محلات، سعر ومخزون وضمان", make: () => doc({
    title: "ورقة مقارنة الأسعار: مول البستان", meta: [{ l: "المول / الدور", v: "مول البستان، ______________" }, { l: "تاريخ الزيارة", v: "____ / ____ / 2026" }, { l: "اسم المسؤول", v: "______________________" }],
    blocks: [{ type: "heading", text: "الجزء (أ): قطع الأجهزة والأجهزة الجاهزة" }, { type: "table", cols: priceCols(), rows: priceRows(partsA, 1), total: false },
      { type: "box", tone: "warn", text: "اسأل كل محل: (1) سعر القطعة وسعرها لـ 10 قطع أو أكثر، (2) العدد المتاح اليوم، (3) مدة الضمان، (4) صلاحية العرض وهل مع فاتورة." },
      { type: "heading", text: "الجزء (ب): الماوسات والكيبوردات والكابلات والملحقات (احتياطي)" }, { type: "table", cols: priceCols(), rows: priceRows(partsB, 13), total: false },
      { type: "box", tone: "info", text: "قاعدة القرار: أقل سعر يفوز فقط إذا كان الصنف متاحاً الآن، وضمانه لا يقل عن الضمان أونلاين، ومعه فاتورة." },
      sign(["إعداد: م. صلاح، مهندس علوم حاسب", "مراجعة: م. عصام، مدير تكنولوجيا المعلومات", "اعتماد المدير: ______________________"])] }) });

  T.push({ id: "builds-cmp", icon: "⚖️", ar: "مقارنة أسعار التجميعتين (سيجما / النخيلي / البستان)", en: "Two builds price comparison", desc: "الأرخص يُحسب تلقائياً والإجمالي = العدد × الأرخص", make: () => doc({
    title: "مقارنة أسعار: تجميعتان للشراء السريع", meta: [{ l: "تاريخ الأسعار", v: "16 أكتوبر 2026" }, { l: "المسؤول", v: "م. صلاح" }],
    blocks: [{ type: "table", total: true, totalLabel: "إجمالي أرخص الأسعار",
      cols: [col("n", "م", 0.4), col("item", "البند والمواصفات", 3.4), col("qty", "العدد", 0.6, "num"), col("sig", "سيجما", 1, "num"), col("nek", "النخيلي", 1, "num"), col("bos", "البستان", 1, "num"),
        col("best", "الأرخص", 1, "calc", "MIN(sig,nek,bos)"), col("tot", "الإجمالي", 1.2, "calc", "qty*best"), col("stk", "ملاحظة المخزون", 1.4)],
      rows: rows([[1, "Ryzen 7 5700 (AM4)", 1, 6799, "", "", "", "", "متوفر"], [2, "ASUS PRIME B550M-K ARGB", 1, 4199, "", "", "", "", "متوفر"], [3, "Intel Core i5-14400F", 1, 7699, "", "", "", "", "متوفر"],
        [4, "ASUS PRIME B760M-K D4", 1, 5199, "", "", "", "", "غير مذكور"], [5, "رام 32GB (2×16) DDR4-3200", 2, 13000, "", "", "", "", "غير مؤكد"], [6, "RTX 3050 6GB (2 HDMI + 1 DP)", 2, 13800, "", "", "", "", "زر الشراء ظاهر"],
        [7, "SSD 1TB NVMe", 2, 7350, "", "", "", "", "متوفر"], [8, "مبرد MSI AA13", 2, 1249, "", "", "", "", "متوفر"], [9, "كيس + باور 650W", 2, 3399, "", "", "", "", "متوفر"],
        [10, "كابل DisplayPort 1.8م", 2, 95, "", "", "", "", ""], [11, "كابل HDMI 1.5م", 2, 95, "", "", "", "", ""], [12, "محوّل HDMI إلى VGA نشط", 1, 639, "", "", "", "", ""]]) },
      { type: "box", tone: "info", text: "اكتب عروض النخيلي والبستان في أعمدتهما فقط، وسيظهر الأرخص والإجمالي تلقائياً. قارن نفس المواصفة وبشرط توفر المخزون." },
      sign(["إعداد: م. صلاح، مهندس علوم حاسب", "مراجعة: م. عصام، مدير تكنولوجيا المعلومات", "اعتماد: ______________________"])] }) });

  const buildDoc = (name, items) => doc({ title: name, orient: "portrait", meta: [{ l: "التاريخ", v: "16 أكتوبر 2026" }, { l: "نوع الشاشتين", v: "DP + HDMI" }],
    blocks: [{ type: "table", total: true, totalLabel: "إجمالي الجهاز",
      cols: [col("n", "م", 0.4), col("cat", "البند", 1.1), col("part", "القطعة", 3.6), col("qty", "العدد", 0.6, "num"), col("price", "السعر", 1, "num"), col("tot", "الإجمالي", 1.1, "calc", "qty*price")],
      rows: rows(items.map((r, i) => [i + 1, ...r])) },
      { type: "box", tone: "info", text: "كارت RTX 3050 فيه مخرجان HDMI ومخرج DisplayPort: شاشتان DP + HDMI بكابلين. شاشة VGA تحتاج محوّل HDMI إلى VGA نشط. المعالج بلا كارت داخلي فكل الشاشات على الكارت." },
      sign(["إعداد: م. صلاح", "مراجعة: م. عصام"])] });
  T.push({ id: "build-a", icon: "🖥️", ar: "تسعير تجميعة (أ): Ryzen 7 5700", en: "Build A quotation: Ryzen 7 5700", desc: "قطع وأسعار سيجما 16 أكتوبر، قابلة للتعديل", make: () => buildDoc("تسعير تجميعة (أ): AMD Ryzen 7 5700", [
    ["المعالج", "AMD Ryzen 7 5700 (8 أنوية / 16 خيط، AM4)", 1, 6799], ["اللوحة الأم", "ASUS PRIME B550M-K ARGB (DDR4، شبكة 1GbE)", 1, 4199], ["الرام", "Corsair Vengeance LPX 32GB (2×16) DDR4-3200", 1, 13000],
    ["كارت الشاشة", "MSI RTX 3050 VENTUS 2X E 6GB", 1, 13800], ["الهارد", "WD Blue SN5100 1TB NVMe", 1, 7350], ["المبرد", "MSI MAG CoreFrozr AA13", 1, 1249], ["كيس + باور", "AeroCool B508A Flow + LUX 650W Bronze", 1, 3399],
    ["الخدمة", "تركيب ويندوز وتجميع واختبار", 1, 3000], ["كابلات", "DisplayPort 1.8م", 1, 95], ["كابلات", "HDMI 1.5م", 1, 95]]) });
  T.push({ id: "build-b", icon: "🖥️", ar: "تسعير تجميعة (ب): Intel i5-14400F", en: "Build B quotation: i5-14400F", desc: "قطع وأسعار سيجما 16 أكتوبر، قابلة للتعديل", make: () => buildDoc("تسعير تجميعة (ب): Intel Core i5-14400F", [
    ["المعالج", "Intel Core i5-14400F (10 أنوية / 16 خيط، LGA1700)", 1, 7699], ["اللوحة الأم", "ASUS PRIME B760M-K D4 (DDR4، شبكة 2.5GbE)", 1, 5199], ["الرام", "Corsair Vengeance LPX 32GB (2×16) DDR4-3200", 1, 13000],
    ["كارت الشاشة", "MSI RTX 3050 VENTUS 2X E 6GB", 1, 13800], ["الهارد", "WD Blue SN5100 1TB NVMe", 1, 7350], ["المبرد", "MSI MAG CoreFrozr AA13", 1, 1249], ["كيس + باور", "AeroCool B508A Flow + LUX 650W Bronze", 1, 3399],
    ["الخدمة", "تركيب ويندوز وتجميع واختبار", 1, 3000], ["كابلات", "DisplayPort 1.8م", 1, 95], ["كابلات", "HDMI 1.5م", 1, 95]]) });

  T.push({ id: "spares", icon: "🖱️", ar: "خطة الاحتياطي: ماوس وكيبورد وكابلات", en: "Peripherals and spares plan", desc: "كميات وأسعار وإجمالي لكل مستوى", make: () => doc({
    title: "خطة الاحتياطي: الماوسات والكيبوردات والملحقات", meta: [{ l: "التاريخ", v: "____ / ____ / 2026" }, { l: "عدد الأجهزة", v: "63" }],
    blocks: [{ type: "table", total: true, totalLabel: "إجمالي الاحتياطي",
      cols: [col("n", "م", 0.4), col("item", "الصنف", 3), col("lvl", "المستوى", 1), col("qty", "العدد", 0.7, "num"), col("price", "سعر الوحدة", 1, "num"), col("tot", "الإجمالي", 1.1, "calc", "qty*price"), col("sup", "المورد", 1.2), col("note", "ملاحظات", 1.8)],
      rows: rows([[1, "ماوس Logitech B100 سلكي", "أساسي", "", 199, "", "Jumia", ""], [2, "ماوس Logitech M185 لاسلكي", "أساسي", "", 549, "", "Jumia", ""], [3, "كيبورد Logitech K120 عربي", "أساسي", "", 500, "", "Jumia", ""],
        [4, "كومبو Logitech MK270", "أساسي", "", 1299, "", "Jumia", ""], [5, "كابل HDMI 1.5م", "أساسي", "", 95, "", "Makers", ""], [6, "كابل DisplayPort 1.8م", "أساسي", "", 95, "", "Makers", ""],
        [7, "سلك باور C13", "أساسي", "", 35, "", "Makers", ""], [8, "هاب USB 3.0", "أساسي", "", 100, "", "Jumia", ""], [9, "ماوس صامت Logitech M240", "موصى به", "", 899, "", "Jumia", ""],
        [10, "كومبو Logitech MK120 سلكي", "موصى به", "", 675, "", "Jumia", ""], [11, "هاب USB-C سبعة في واحد", "موصى به", "", 390, "", "Jumia", ""], [12, "ماوس باد", "اختياري", "", 549, "", "Jumia", ""]]) },
      { type: "box", tone: "info", text: "اكتب العدد في كل صنف، واخصم الموجود في المكتب قبل الشراء. الأسعار أقل سعر متاح بدون الشحن." }, sign(["إعداد: م. صلاح", "مراجعة: م. عصام"])] }) });

  T.push({ id: "rfq", icon: "✉️", ar: "طلب عرض سعر من مورّد", en: "Request for quotation (Arabic)", desc: "خطاب رسمي + جدول أصناف يملؤه المورد", make: () => doc({
    title: "طلب عرض سعر", orient: "portrait", meta: [{ l: "إلى السادة", v: "______________________" }, { l: "التاريخ", v: "____ / ____ / 2026" }, { l: "رقم الطلب", v: "RFQ-____" }],
    blocks: [{ type: "text", text: "تحية طيبة وبعد،\nبرجاء التكرم بموافاتنا بعرض سعر مكتوب للأصناف الموضحة أدناه، شاملاً سعر الوحدة والكمية المتاحة حالياً ومدة الضمان، على أن يكون العرض صالحاً لمدة 7 أيام على الأقل." },
      { type: "table", total: true, totalLabel: "الإجمالي",
        cols: [col("n", "م", 0.4), col("item", "الصنف والمواصفات", 3.4), col("qty", "العدد", 0.6, "num"), col("price", "سعر الوحدة (يملؤه المورد)", 1.2, "num"), col("tot", "الإجمالي", 1.1, "calc", "qty*price"), col("stk", "المخزون", 0.9), col("w", "الضمان", 0.9)],
        rows: rows([[1, "AMD Ryzen 7 5700 (AM4)", 2, "", "", "", ""], [2, "رام 32GB (2×16) DDR4-3200", 2, "", "", "", ""], [3, "RTX 3050 6GB (2 HDMI + 1 DP)", 2, "", "", "", ""], ...blank(5, 7).map((r, i) => [i + 4, ...r.slice(1)])]) },
      { type: "box", tone: "warn", text: "الشروط: السعر شامل الضريبة، التسليم خلال ____ أيام، الدفع: ______________. يرجى إرفاق صور أو روابط للمنتجات إن وجدت." },
      sign(["مقدّم الطلب: م. صلاح، مهندس علوم حاسب", "مراجعة: م. عصام، مدير تكنولوجيا المعلومات", "ختم وتوقيع المورّد: ______________"])] }) });

  T.push({ id: "pr", icon: "📝", ar: "طلب شراء واعتماد", en: "Purchase request and approval", desc: "للمدير: بنود، مبررات، وتوقيعات الاعتماد", make: () => doc({
    title: "طلب شراء واعتماد", orient: "portrait", meta: [{ l: "القسم", v: "تكنولوجيا المعلومات" }, { l: "التاريخ", v: "____ / ____ / 2026" }, { l: "مقدّم الطلب", v: "م. صلاح" }, { l: "رقم الطلب", v: "PR-____" }],
    blocks: [{ type: "table", total: true, totalLabel: "إجمالي الطلب",
      cols: [col("n", "م", 0.4), col("item", "البند", 2.6), col("qty", "العدد", 0.6, "num"), col("price", "السعر المتوقع", 1, "num"), col("tot", "الإجمالي", 1.1, "calc", "qty*price"), col("why", "مبرر الطلب", 2.2)],
      rows: rows([[1, "", "", "", "", ""], [2, "", "", "", "", ""], [3, "", "", "", "", ""], [4, "", "", "", "", ""], [5, "", "", "", "", ""]]) },
      { type: "text", text: "ملاحظات إضافية:\n______________________________________________________________" },
      sign(["مقدّم الطلب", "مدير تكنولوجيا المعلومات: م. عصام", "المدير العام", "الحسابات"])] }) });

  T.push({ id: "inventory", icon: "🗂️", ar: "جرد الأجهزة وفجوات المواصفات", en: "Workstation inventory and gaps", desc: "جدول جرد الأجهزة (معالج، رام، كارت، هارد)", make: () => doc({
    title: "جرد أجهزة المهندسين وفجوات المواصفات", meta: [{ l: "الفرع", v: "______________" }, { l: "تاريخ الجرد", v: "____ / ____ / 2026" }],
    blocks: [{ type: "table", total: false, cols: [col("id", "كود الجهاز", 1), col("dept", "القسم", 1), col("cpu", "المعالج", 1.6), col("ram", "الرام GB", 0.7, "num"), col("gpu", "كارت الشاشة", 1.4), col("vram", "VRAM GB", 0.7, "num"), col("ssd", "هارد النظام GB", 0.9, "num"), col("sw", "البرامج", 1.4), col("gap", "تحت المواصفة؟", 1)],
      rows: [["M-ELEC-04", "كهرباء", "Xeon E5-2697v4", "64", "RTX 3050", "8", "512", "Revit 2023", "معالج"]].concat(blank(14, 9)) },
      { type: "box", tone: "info", text: "الحد المرجعي: معالج نواة واحدة 3,000+ (PassMark)، رام 32GB، كارت 4GB+، هارد النظام أكبر من 256GB. الصف الأول مثال، عدّله أو احذفه." }, sign(["إعداد: م. صلاح", "مراجعة: م. عصام"])] }) });

  T.push({ id: "survey", icon: "📋", ar: "استبيان المهندسين (ورقي)", en: "Engineers survey (paper)", desc: "أسئلة قابلة للتعديل بخيارات للتأشير", make: () => doc({
    title: "استبيان المهندسين: أداء أجهزة العمل", orient: "portrait", meta: [{ l: "الاسم (اختياري)", v: "______________" }, { l: "القسم", v: "______________" }, { l: "التاريخ", v: "____ / ____ / 2026" }],
    blocks: [{ type: "text", text: "الهدف: تحديد أولويات تطوير الأجهزة. تستغرق الإجابة أقل من 3 دقائق. ضع علامة ✓ في الخيار المناسب." },
      { type: "table", total: false, cols: [col("n", "م", 0.4), col("q", "السؤال", 3.2), col("a", "الخيارات", 3.4)],
        rows: rows([[1, "ما البرنامج الأكثر استخداماً يومياً؟", "☐ Revit    ☐ AutoCAD    ☐ Navisworks    ☐ أخرى: ______"], [2, "كم ساعة يومياً تعمل على النماذج الثقيلة؟", "☐ أقل من 2    ☐ 2 إلى 4    ☐ 4 إلى 6    ☐ أكثر من 6"],
          [3, "كم مرة يتجمد الجهاز أو يتأخر أثناء العمل؟", "☐ يومياً    ☐ أسبوعياً    ☐ نادراً    ☐ أبداً"], [4, "كم دقيقة تنتظر لفتح أكبر نموذج؟", "☐ أقل من 2    ☐ 2 إلى 5    ☐ 5 إلى 10    ☐ أكثر من 10"],
          [5, "هل تستخدم شاشتين؟ وما نوع التوصيل؟", "☐ لا    ☐ DP + HDMI    ☐ VGA + HDMI    ☐ غير ذلك"], [6, "هل الشبكة بطيئة عند فتح الملفات المشتركة؟", "☐ نعم دائماً    ☐ أحياناً    ☐ لا"],
          [7, "ما أكثر ما يعطّل عملك في الجهاز الحالي؟", "☐ المعالج    ☐ الرام    ☐ كارت الشاشة    ☐ الهارد    ☐ الشبكة"], [8, "اقتراحات أخرى", "______________________________________________"]]) },
      sign(["شكراً لمشاركتك"])] }) });

  T.push({ id: "blank-ar", icon: "📄", ar: "ورقة فارغة (عربي)", en: "Blank document (Arabic)", desc: "ابدأ من الصفر: أضف عناوين ونصوص وجداول", make: () => doc({ title: "عنوان الورقة", blocks: [{ type: "text", text: "اكتب هنا..." }] }) });
  T.push({ id: "blank-en", icon: "📃", ar: "ورقة فارغة (إنجليزي)", en: "Blank document (English)", desc: "Start from scratch in English (left to right)", make: () => doc({ lang: "en", title: "Document title", subtitle: "SEVEN HANDS | IT Department", blocks: [{ type: "text", text: "Write here..." }] }) });
  T.push({ id: "rfq-en", icon: "✉️", ar: "طلب عرض سعر (إنجليزي)", en: "Request for quotation (English)", desc: "Formal letter and item table for the supplier", make: () => doc({
    lang: "en", orient: "portrait", title: "Request for Quotation", subtitle: "SEVEN HANDS | IT Department", meta: [{ l: "To", v: "______________________" }, { l: "Date", v: "____ / ____ / 2026" }, { l: "RFQ No.", v: "RFQ-____" }],
    blocks: [{ type: "text", text: "Dear Sir/Madam,\nPlease send us a written quotation for the items below, including unit price, current stock and warranty. The offer must remain valid for at least 7 days." },
      { type: "table", total: true, totalLabel: "Total", cols: [col("n", "#", 0.4), col("item", "Item and specification", 3.4), col("qty", "Qty", 0.6, "num"), col("price", "Unit price (supplier fills)", 1.3, "num"), col("tot", "Total", 1.1, "calc", "qty*price"), col("stk", "Stock", 0.9), col("w", "Warranty", 0.9)],
        rows: rows([[1, "", "", "", "", "", ""], [2, "", "", "", "", "", ""], [3, "", "", "", "", "", ""], [4, "", "", "", "", "", ""]]) },
      { type: "box", tone: "warn", text: "Terms: prices include tax, delivery within ____ days, payment: ______________." },
      sign(["Prepared by: Eng. Salah, Computer Science Engineer", "Reviewed by: Eng. Esam, IT Manager", "Supplier stamp and signature: ______________"])] }) });
  return { TEMPLATES: T, col };
})();
