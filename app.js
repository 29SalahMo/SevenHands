/* SEVEN HANDS Docs: template editor & interactive document system.
   Supports full browser routing, WhatsApp preview & sharing, interactive preloader, live filters, and calculation animations. */
(function () {
  "use strict";
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const KEY = "shdocs:v1", UIKEY = "shdocs:ui";

  const STR = {
    ar: {
      app: "سفن هاندز للخدمات الهندسية والمقاولات",
      sub: "المنظومة الرقمية المعتمدة للوثائق واللوائح",
      newFrom: "ابدأ من النماذج المعتمدة",
      saved: "أوراقي ومستنداتي المحفوظة",
      none: "لا توجد أوراق محفوظة بعد. اختر قالباً من الأعلى للبدء فوراً.",
      open: "فتح المستند",
      del: "حذف",
      imp: "استيراد ملف JSON",
      back: "الرئيسية",
      backToDocs: "العودة إلى القوالب",
      home: "الرئيسية",
      save: "حفظ",
      savedOk: "تم حفظ الورقة بنجاح",
      dl: "تصدير / تحميل",
      word: "Word (.docx)",
      excel: "Excel (.xlsx)",
      pdf: "PDF (صورة الصفحة)",
      print: "طباعة / PDF نصي",
      json: "نسخة JSON (للنقل)",
      shareWa: "مشاركة عبر واتساب",
      shareDoc: "مشاركة الورقة عبر واتساب",
      copyLink: "نسخ الرابط المباشر",
      linkCopied: "تم نسخ رابط المستند إلى الحافظة بنجاح 🔗",
      add: "إضافة عنصر",
      heading: "عنوان فرعي",
      text: "فقرة نصية",
      table: "جدول تسعير / بيانات",
      note: "ملاحظة تنبيهية",
      sign: "توقيعات واعتماد",
      addRow: "+ صف",
      addCol: "+ عمود",
      cols: "إدارة الأعمدة والصيغ",
      orient: "الاتجاه",
      land: "أفقي (Landscape)",
      port: "عمودي (Portrait)",
      dir: "لغة الورقة",
      logo: "إظهار الشعار",
      name: "اسم الملف / الورقة",
      copy: "حفظ كنسخة جديدة",
      confirm: "هل أنت متأكد من حذف هذه الورقة نهائياً؟",
      total: "الإجمالي",
      metaAdd: "+ إضافة حقل بيانات",
      apply: "تطبيق التعديلات",
      cancel: "إلغاء",
      label: "اسم العمود",
      kind: "النوع",
      expr: "المعادلة الرياضية",
      width: "العرض النسبي",
      kText: "نص عادي",
      kNum: "رقم (يُجمع)",
      kCalc: "معادلة محسوبة",
      hint: "المعادلة تستخدم رموز الأعمدة مثل qty*price أو MIN(sig,nek,bos)",
      key: "رمز العمود",
      showTotal: "إظهار صف المجموع الإجمالي",
      totalLabel: "عنوان صف المجموع",
      date: "آخر تعديل",
      exporting: "جارٍ تجهيز الملف للتحميل...",
      failed: "تعذر إنشاء الملف",
      zoom: "المعاينة",
      tools: "أدوات",
      up: "أعلى",
      down: "أسفل",
      rm: "حذف",
      delRow: "حذف الصف",
      delCol: "حذف العمود",
      autosave: "الحفظ التلقائي نشط محلياً",
      tip: "اضغط أي نص أو خلية للتعديل الفوري · يتم الحساب تلقائياً",
      searchPlaceholder: "ابحث بالاسم أو الوصف أو القسم في القوالب والمستندات المحفوظة...",
      all: "⚡ الكل",
      deptAccounting: "💰 الإدارة المالية والحسابات",
      deptIt: "💻 تكنولوجيا المعلومات",
      deptProcurement: "🛒 المشتريات والعقود",
      deptHr: "👥 الموارد البشرية",
      deptSecretary: "📋 السكرتارية والإدارة",
      deptEngineering: "📐 الخدمات الهندسية",
      deptManagement: "🏢 الإدارة العامة",
      deptBlank: "📄 أوراق فارغة",
      catSaved: "💾 مستنداتي المحفوظة",
      statTemplates: "قوالب هندسية معتمدة",
      statSaved: "أوراق محفوظة بالمتصفح",
      statCalc: "محرك حساب فوري نشط",
      statExport: "تصدير Excel · Word · PDF",
      showing: "عرض",
      of: "من أصل",
      templates: "قالب",
      noResults: "لا توجد نتائج تطابق بحثك.",
      clearSearch: "مسح البحث",
      duplicate: "نسخ كجديد",
      startDoc: "بدء التعديل ↗",
      docNumber: "كود المستند",
      docStatus: "حالة الاعتماد",
      docDept: "القسم التابع",
      statusDraft: "مسودة",
      statusReview: "قيد المراجعة (م. عصام)",
      statusApproved: "معتمد (الإدارة العامة)",
      registry: "سجل المستندات المركزي",
      registryShort: "سجل المستندات",
      registryDesc: "قاعدة بيانات لجميع المستندات والنماذج المحفوظة محلياً مع تصدير مباشر إلى Excel",
      exportRegistry: "تصدير السجل إلى Excel (.xlsx)",
      noSavedDocs: "لا توجد مستندات محفوظة بالسجل حتى الآن.",
      close: "إغلاق",
      code: "كود المستند",
      title: "العنوان",
      author: "المُعد",
      reviewer: "المُراجع",
      status: "الحالة",
      actions: "إجراءات",
      waLabel: "واتساب",
      waMenuTitle: "مشاركة وتواصل سريع",
      waDocSub: "إرسال رابط الورقة الحالية مباشرة للزملاء",
      waSiteTitle: "مشاركة رابط المنظومة",
      waSiteSub: "مشاركة رابط الموقع العام عبر واتساب",
      waCopyTitle: "نسخ رابط الصفحة الحالية",
      waCopySub: "حفظ الرابط المباشر في الحافظة",
      bylawsLabel: "لائحة الشركة",
      bylawsTitle: "لائحة وسياسة الموارد البشرية الرسمية",
      bylawsDesc: "دليل السياسات واللوائح المعتمدة لشركة سفن هاندز: مواعيد العمل، الإجازات، الأذونات، الأوفر تايم والجزاءات",
      partitionLabel: "قسم العمل",
      allDepts: "كافة الأقسام",
      headerAccountingLabel: "أدوات المحاسب",
      accToolsTitle: "أدوات وحاسبة المحاسب والتفقيط المالي المعتمد"
    },
    en: {
      app: "SEVEN HANDS For Engineering Services & Construction",
      sub: "Corporate Engineering Documents & Operations Portal",
      newFrom: "Start from Approved Templates",
      saved: "My Saved Documents & Worksheets",
      none: "Nothing saved yet. Select a template above to start immediately.",
      open: "Open Document",
      del: "Delete",
      imp: "Import JSON File",
      back: "Home",
      backToDocs: "Back to Templates",
      home: "Home",
      save: "Save",
      savedOk: "Document saved successfully",
      dl: "Export / Download",
      word: "Word (.docx)",
      excel: "Excel (.xlsx)",
      pdf: "PDF (page image)",
      print: "Print / Text PDF",
      json: "JSON File (portable)",
      shareWa: "Share via WhatsApp",
      shareDoc: "Share sheet via WhatsApp",
      copyLink: "Copy Direct Link",
      linkCopied: "Direct document link copied to clipboard 🔗",
      add: "Add Block",
      heading: "Heading",
      text: "Text paragraph",
      table: "Table / Pricing",
      note: "Alert / Note box",
      sign: "Signatures",
      addRow: "+ Row",
      addCol: "+ Column",
      cols: "Columns & Formulas",
      orient: "Orientation",
      land: "Landscape",
      port: "Portrait",
      dir: "Document Language",
      logo: "Show Logo",
      name: "File / Sheet Name",
      copy: "Save as Copy",
      confirm: "Permanently delete this document?",
      total: "Total",
      metaAdd: "+ Add Field",
      apply: "Apply Changes",
      cancel: "Cancel",
      label: "Column Label",
      kind: "Type",
      expr: "Formula",
      width: "Width",
      kText: "Text",
      kNum: "Number (summed)",
      kCalc: "Calculated",
      hint: "Formulas use column keys like qty*price or MIN(sig,nek,bos)",
      key: "Column Key",
      showTotal: "Show total sum row",
      totalLabel: "Total Label",
      date: "Last edited",
      exporting: "Preparing file for download...",
      failed: "Could not create the file",
      zoom: "Zoom",
      tools: "Tools",
      up: "Up",
      down: "Down",
      rm: "Delete",
      delRow: "Delete Row",
      delCol: "Delete Column",
      autosave: "Autosaves locally in this browser",
      tip: "Click any cell or text to edit directly · Calculations update live",
      searchPlaceholder: "Search templates, departments and saved sheets...",
      all: "⚡ All",
      deptAccounting: "💰 Finance & Accounting",
      deptIt: "💻 IT Department",
      deptProcurement: "🛒 Procurement & Quotes",
      deptHr: "👥 Human Resources",
      deptSecretary: "📋 Secretary & Admin",
      deptEngineering: "📐 Engineering Services",
      deptManagement: "🏢 General Management",
      deptBlank: "📄 Blank Documents",
      catSaved: "💾 Saved Documents",
      statTemplates: "Approved Templates",
      statSaved: "Saved in Browser",
      statCalc: "Live Formula Engine",
      statExport: "Export Excel · Word · PDF",
      showing: "Showing",
      of: "of",
      templates: "templates",
      noResults: "No results match your search.",
      clearSearch: "Clear Search",
      duplicate: "Duplicate",
      startDoc: "Open Sheet ↗",
      docNumber: "Document Ref Code",
      docStatus: "Approval Status",
      docDept: "Department",
      statusDraft: "Draft",
      statusReview: "Under Review (Eng. Esam)",
      statusApproved: "Approved (Management)",
      registry: "Central Document Register",
      registryShort: "Document Register",
      registryDesc: "Central registry of all saved documents and engineering templates with Excel export",
      exportRegistry: "Export Register to Excel (.xlsx)",
      noSavedDocs: "No saved documents in registry yet.",
      close: "Close",
      code: "Doc Code",
      title: "Title",
      author: "Prepared by",
      reviewer: "Reviewed by",
      status: "Status",
      actions: "Actions",
      waLabel: "WhatsApp",
      waMenuTitle: "Quick Share & Connect",
      waDocSub: "Send direct sheet link to colleagues",
      waSiteTitle: "Share Platform Link",
      waSiteSub: "Share general platform link via WhatsApp",
      waCopyTitle: "Copy Page Link",
      waCopySub: "Copy direct page URL to clipboard",
      bylawsLabel: "Company Bylaws",
      bylawsTitle: "Official HR Policy & Bylaws",
      bylawsDesc: "Official regulations: working hours, leaves, permissions, overtime, and penalties",
      partitionLabel: "Partition",
      allDepts: "All Departments",
      headerAccountingLabel: "Accounting Tools",
      accToolsTitle: "Accountant Tools, Calculator & Arabic Tafqeet"
    }
  };

  let ui = "ar";
  try { ui = localStorage.getItem(UIKEY) || "ar"; } catch (e) {}
  const t = (k) => (STR[ui] && STR[ui][k]) || STR.ar[k] || k;

  let cur = null, zoom = 1, saveTimer = null;
  let activeFilter = "all", searchQuery = "";

  /* ---------- storage ---------- */
  const store = {
    all() { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; } },
    put(doc) {
      try {
        const a = store.all();
        doc.updated = Date.now();
        a[doc.id] = doc;
        localStorage.setItem(KEY, JSON.stringify(a));
        return true;
      } catch (e) { return false; }
    },
    del(id) {
      try {
        const a = store.all();
        delete a[id];
        localStorage.setItem(KEY, JSON.stringify(a));
      } catch (e) {}
    }
  };
  const uid = () => "d" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const esc = (s) => String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  /* ---------- Toast System ---------- */
  function showToast(msg, icon = "✓", duration = 2500) {
    const container = $("#toastContainer");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span>${icon}</span><span>${esc(msg)}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("toast-out");
      setTimeout(() => toast.remove(), 260);
    }, duration);
  }

  /* ---------- Vercel Web Analytics & Speed Insights Custom Events ---------- */
  function trackEvent(name, data) {
    try {
      if (typeof window !== "undefined" && typeof window.va === "function") {
        window.va("event", { name, data: data || {} });
      }
    } catch (e) {}
  }

  /* ---------- Calc Engine (shared with export) ---------- */
  const AR_DIG = "٠١٢٣٤٥٦٧٨٩";
  function num(s) {
    if (s === null || s === undefined) return null;
    let x = String(s).replace(/[٠-٩]/g, (d) => AR_DIG.indexOf(d)).replace(/[,\s٬]/g, "").replace("٫", ".");
    if (x === "" || !/^-?\d*\.?\d+$/.test(x)) return null;
    return parseFloat(x);
  }
  const FN = ["MIN", "MAX", "SUM"];
  function tokenOK(js) {
    const re = /\s+|\d+(?:\.\d+)?|[+\-*\/(),]|\$(?:MIN|MAX|SUM)|v\("[A-Za-z0-9_]+"\)/y; let i = 0;
    while (i < js.length) { re.lastIndex = i; const m = re.exec(js); if (!m) return false; i = re.lastIndex; }
    return true;
  }
  function evalExpr(expr, get) {
    try {
      const js = expr.replace(/[A-Za-z_][A-Za-z0-9_]*/g, (m) => (FN.includes(m.toUpperCase()) ? "$" + m.toUpperCase() : `v(${JSON.stringify(m)})`));
      if (!tokenOK(js)) return null;
      const fl = (a) => a.filter((x) => x !== null && !isNaN(x));
      const f = new Function("v", "$MIN", "$MAX", "$SUM", "return " + js);
      const r = f(get, (...a) => { a = fl(a); return a.length ? Math.min(...a) : null; }, (...a) => { a = fl(a); return a.length ? Math.max(...a) : null; }, (...a) => fl(a).reduce((x, y) => x + y, 0));
      return r === null || !isFinite(r) ? null : r;
    } catch (e) { return null; }
  }
  const fmtNum = (n) => (n === null || n === undefined ? "" : (Math.round(n * 100) / 100).toLocaleString("en-US"));
  function calcCell(b, r, ci, depth) {
    if (depth > 4) return null; const c = b.cols[ci]; const idx = {}; b.cols.forEach((x, i) => (idx[x.key] = i));
    return evalExpr(c.expr || "", (k) => { if (!(k in idx)) return null; const j = idx[k]; return b.cols[j].kind === "calc" ? calcCell(b, r, j, depth + 1) : num(r[j]); });
  }
  function colTotal(b, ci) {
    let s = 0, any = false;
    b.rows.forEach((r) => { const c = b.cols[ci]; const v = c.kind === "calc" ? calcCell(b, r, ci, 0) : num(r[ci]); if (v !== null) { s += v; any = true; } });
    return any ? s : 0;
  }
  window.SHCALC = { num, calcCell, colTotal, fmtNum, evalExpr };

  /* ---------- UI language ---------- */
  function applyUI() {
    document.documentElement.lang = ui;
    document.documentElement.dir = ui === "ar" ? "rtl" : "ltr";
    document.title = ui === "ar"
      ? (cur ? (cur.name || cur.title) + " | سفن هاندز للخدمات الهندسية والمقاولات" : "شركة سفن هاندز للخدمات الهندسية والمقاولات | SEVEN HANDS")
      : (cur ? (cur.name || cur.title) + " | SEVEN HANDS For Engineering Services & Construction" : "SEVEN HANDS For Engineering Services & Construction");
    $("#appTitle").textContent = t("app");
    $("#appSub").textContent = t("sub");
    $("#uiLang").textContent = ui === "ar" ? "EN" : "عربي";
    $("#homeBtnLabel").textContent = t("back");

    const regLbl = $("#headerRegistryLabel");
    if (regLbl) regLbl.textContent = t("registryShort");
    const bylawsLbl = $("#headerBylawsLabel");
    if (bylawsLbl) bylawsLbl.textContent = t("bylawsLabel");
    const accLbl = $("#headerAccountingLabel");
    if (accLbl) accLbl.textContent = t("headerAccountingLabel");
    if (typeof updateHeaderDept === "function") updateHeaderDept();
    const waLbl = $("#floatingWaLabel");
    if (waLbl) waLbl.textContent = t("waLabel");
    const resWaLbl = $("#restoreWaLabel");
    if (resWaLbl) resWaLbl.textContent = t("waLabel");
    const waHeadTitle = $("#waMenuHeaderTitle");
    if (waHeadTitle) waHeadTitle.textContent = t("waMenuTitle");
    const waSiteTitle = $("#waSiteTitle");
    if (waSiteTitle) waSiteTitle.textContent = t("waSiteTitle");
    const waSiteSub = $("#waSiteSub");
    if (waSiteSub) waSiteSub.textContent = t("waSiteSub");
    const waCopyTitle = $("#waCopyTitle");
    if (waCopyTitle) waCopyTitle.textContent = t("waCopyTitle");
    const waCopySub = $("#waCopySub");
    if (waCopySub) waCopySub.textContent = t("waCopySub");

    if (cur) renderEditor(); else renderHome();
    updateWaLinks();
  }

  /* ---------- Navigation & Router (Fix Back Return Pages) ---------- */
  function openDoc(d, pushHash = true) {
    cur = clone(d);
    if (pushHash && location.hash !== "#" + cur.id) {
      location.hash = "#" + cur.id;
    }
    renderEditor();
    window.scrollTo({ top: 0, behavior: "smooth" });
    updateWaLinks();
    trackEvent("open_document", { id: cur ? cur.id : "", title: cur ? cur.title : "" });
  }

  function goHome() {
    flushSave();
    const currentHash = location.hash.replace(/^#/, "").trim();
    if (currentHash && currentHash !== "home") {
      if (window.history.length > 1) {
        window.history.back();
        setTimeout(() => {
          const check = location.hash.replace(/^#/, "").trim();
          if (check && check !== "home") {
            location.hash = "";
          }
        }, 160);
      } else {
        location.hash = "";
      }
    } else {
      cur = null;
      renderHome();
    }
  }

  function handleRoute() {
    const h = location.hash.replace(/^#/, "").trim();
    if (!h || h === "home") {
      if (cur) flushSave();
      cur = null;
      renderHome();
    } else {
      const doc = store.all()[h];
      if (doc) {
        if (!cur || cur.id !== doc.id) {
          openDoc(doc, false);
        }
      } else {
        cur = null;
        renderHome();
      }
    }
    updateWaLinks();
  }

  window.addEventListener("hashchange", handleRoute);
  window.addEventListener("popstate", handleRoute);

  /* ---------- WhatsApp & Floating Quick Actions ---------- */
  const PROD_URL = "https://sevenhands-eta.vercel.app/";
  function getLiveUrl() {
    if (window.location.protocol.startsWith("http") && !window.location.hostname.includes("localhost") && !window.location.hostname.includes("127.0.0.1")) {
      return window.location.href;
    }
    return PROD_URL + (location.hash || "");
  }

  function updateWaLinks() {
    const waShareDocLink = $("#waShareDocLink");
    const waDocTitle = $("#waDocTitle");
    const waDocSub = $("#waDocSub");
    if (!waShareDocLink) return;

    const currentUrl = getLiveUrl();
    if (cur) {
      const docCode = cur.docNumber ? ` [${cur.docNumber}]` : "";
      const docName = (cur.name || cur.title || (ui === "ar" ? "وثيقة رسمية" : "Document")) + docCode;
      const msg = encodeURIComponent(
        (ui === "ar" ? "وثيقة رسمية معتمدة من شركة سفن هاندز: " : "Official Document from SEVEN HANDS: ") +
        docName + "\n" + currentUrl
      );
      waShareDocLink.href = "https://api.whatsapp.com/send?text=" + msg;
      if (waDocTitle) waDocTitle.textContent = (ui === "ar" ? "مشاركة: " : "Share: ") + docName;
      if (waDocSub) waDocSub.textContent = ui === "ar" ? "إرسال رابط الورقة الحالية مباشرة للزملاء" : "Send direct worksheet link to colleagues";
    } else {
      const msg = encodeURIComponent(
        (ui === "ar"
          ? "شركة سفن هاندز للخدمات الهندسية والمقاولات - المنظومة الرقمية المعتمدة للوثائق واللوائح:\n"
          : "SEVEN HANDS For Engineering Services & Construction - Corporate Operations Portal:\n") + currentUrl
      );
      waShareDocLink.href = "https://api.whatsapp.com/send?text=" + msg;
      if (waDocTitle) waDocTitle.textContent = ui === "ar" ? "مشاركة رابط المنظومة" : "Share System Link";
      if (waDocSub) waDocSub.textContent = ui === "ar" ? "مشاركة رابط الموقع العام عبر واتساب" : "Share general system link via WhatsApp";
    }
  }

  function initFloatingActions() {
    const floatingActions = $("#floatingActions");
    const trigger = $("#floatingWaTrigger");
    const menu = $("#waMenuDropdown");
    const closeBtn = $("#closeWaMenuBtn");
    const minimizeBtn = $("#minimizeWaBtn");
    const hideBtn = $("#floatingWaHideBtn");
    const restoreBtn = $("#restoreWaBtn");
    const copyBtn = $("#quickCopyLinkBtn");

    const isWaHidden = localStorage.getItem("sh_wa_hidden") === "true";
    const isWaMinimized = localStorage.getItem("sh_wa_minimized") === "true";

    if (floatingActions) {
      if (isWaHidden) {
        floatingActions.classList.add("is-hidden");
        if (restoreBtn) restoreBtn.hidden = false;
      }
      if (isWaMinimized) {
        floatingActions.classList.add("is-minimized");
      }
    }

    if (trigger && menu) {
      trigger.onclick = (e) => {
        e.stopPropagation();
        menu.hidden = !menu.hidden;
        updateWaLinks();
      };
      if (closeBtn) {
        closeBtn.onclick = (e) => {
          e.stopPropagation();
          menu.hidden = true;
        };
      }
      document.addEventListener("click", (e) => {
        if (!menu.contains(e.target) && e.target !== trigger) {
          menu.hidden = true;
        }
      });
    }

    if (minimizeBtn && floatingActions) {
      minimizeBtn.onclick = (e) => {
        e.stopPropagation();
        floatingActions.classList.toggle("is-minimized");
        menu.hidden = true;
        const isMin = floatingActions.classList.contains("is-minimized");
        localStorage.setItem("sh_wa_minimized", isMin);
        showToast(isMin ? (ui === "ar" ? "تم تصغير زر واتساب" : "WhatsApp widget minimized") : (ui === "ar" ? "تم توسيع زر واتساب" : "WhatsApp widget expanded"), "💬");
      };
    }

    if (hideBtn && floatingActions) {
      hideBtn.onclick = (e) => {
        e.stopPropagation();
        floatingActions.classList.add("is-hidden");
        if (menu) menu.hidden = true;
        if (restoreBtn) restoreBtn.hidden = false;
        localStorage.setItem("sh_wa_hidden", "true");
        showToast(ui === "ar" ? "تم إخفاء زر واتساب لتفريغ مساحة العمل" : "WhatsApp button hidden to clear workspace", "👁️");
      };
    }

    if (restoreBtn && floatingActions) {
      restoreBtn.onclick = () => {
        floatingActions.classList.remove("is-hidden");
        restoreBtn.hidden = true;
        localStorage.setItem("sh_wa_hidden", "false");
        showToast(ui === "ar" ? "تمت استعادة زر واتساب" : "WhatsApp button restored", "💬");
      };
    }

    if (copyBtn) {
      copyBtn.onclick = () => {
        const live = getLiveUrl();
        navigator.clipboard.writeText(live).then(() => {
          showToast(t("linkCopied"), "🔗");
          if (menu) menu.hidden = true;
        }).catch(() => {
          prompt(t("copyLink"), live);
        });
      };
    }
  }

  /* ---------- Interactive Preloader (Zero friction) ---------- */
  function initInteractiveLoader() {
    const loader = $("#appLoader");
    if (!loader) return;

    // Instant bypass if user came with direct hash or has visited before in session
    const isDirectLink = location.hash && location.hash.length > 2;
    const hasVisited = sessionStorage.getItem("sh_visited_session");
    if (isDirectLink || hasVisited) {
      loader.style.display = "none";
      return;
    }

    const barFill = $("#loaderBarFill");
    const statusTxt = $("#loaderStatusText");
    const percentVal = $("#loaderPercentVal");
    const skipBtn = $("#loaderSkipBtn");
    const glowOrb = $("#loaderGlowOrb");

    let progress = 0;
    let finished = false;

    const steps = [
      { p: 35, ar: "تهيئة بيئة العمل والنماذج الهندسية...", en: "Checking engineering templates & workspace..." },
      { p: 70, ar: "تحميل محرك العمليات الحسابية والصيغ...", en: "Initializing formula and calculation engine..." },
      { p: 100, ar: "النظام جاهز! مرحباً بك في SEVEN HANDS Docs", en: "System ready! Welcome to SEVEN HANDS Docs" }
    ];

    function dismiss() {
      if (finished) return;
      finished = true;
      sessionStorage.setItem("sh_visited_session", "1");
      if (barFill) barFill.style.width = "100%";
      if (percentVal) percentVal.textContent = "100%";
      if (statusTxt) statusTxt.textContent = ui === "ar" ? "النظام جاهز للاستخدام!" : "Ready to use!";
      loader.classList.add("loader-done");
      setTimeout(() => { loader.style.display = "none"; }, 350);
    }

    loader.addEventListener("mousemove", (e) => {
      if (glowOrb) {
        glowOrb.style.left = e.clientX + "px";
        glowOrb.style.top = e.clientY + "px";
      }
    });

    if (skipBtn) skipBtn.onclick = (e) => { e.stopPropagation(); dismiss(); };
    loader.onclick = dismiss;

    window.addEventListener("keydown", function skipOnKey(e) {
      if (!finished && (e.code === "Space" || e.code === "Enter" || e.code === "Escape")) {
        dismiss();
        window.removeEventListener("keydown", skipOnKey);
      }
    });

    const interval = setInterval(() => {
      if (finished) { clearInterval(interval); return; }
      progress += Math.floor(Math.random() * 12) + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(dismiss, 80);
      }
      const st = steps.find(s => progress <= s.p) || steps[steps.length - 1];
      if (barFill) barFill.style.width = progress + "%";
      if (percentVal) percentVal.textContent = progress + "%";
      if (statusTxt) statusTxt.textContent = ui === "ar" ? st.ar : st.en;
    }, 35);
  }

  /* ---------- Central Document Register Modal ---------- */
  function openRegistryModal() {
    const modal = $("#modal");
    if (!modal) return;
    const allDocs = Object.values(store.all()).sort((a, b) => (b.updated || 0) - (a.updated || 0));

    modal.hidden = false;
    modal.innerHTML = `
      <div class="modal-registry" role="dialog" aria-modal="true" aria-label="${t("registry")}">
        <div class="modal-registry-head">
          <div class="modal-registry-title">
            <span>📑</span>
            <span>${t("registry")} (${allDocs.length})</span>
          </div>
          <button class="btn ghost-white small" id="closeRegistryModalBtn" aria-label="${t("close")}">✕</button>
        </div>
        <div class="modal-registry-body">
          <div class="registry-actions-bar">
            <div>
              <p class="muted" style="margin:0">${t("registryDesc")}</p>
            </div>
            <button class="btn accent" id="exportRegistryBtn" ${allDocs.length ? "" : "disabled"}>
              📗 ${t("exportRegistry")}
            </button>
          </div>

          ${allDocs.length === 0 ? `
            <div style="padding:40px;text-align:center" class="muted">
              <p style="font-size:16px">${t("noSavedDocs")}</p>
            </div>
          ` : `
            <div style="overflow-x:auto">
              <table class="registry-table">
                <thead>
                  <tr>
                    <th style="width:40px">#</th>
                    <th>${t("code")}</th>
                    <th>${t("title")}</th>
                    <th>${t("docDept")}</th>
                    <th>${t("status")}</th>
                    <th>${t("author")}</th>
                    <th>${t("date")}</th>
                    <th style="text-align:center">${t("actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  ${allDocs.map((d, i) => {
                    const statusClass = d.status === "approved" ? "approved" : d.status === "review" ? "review" : "draft";
                    const statusName = d.status === "approved" ? t("statusApproved") : d.status === "review" ? t("statusReview") : t("statusDraft");
                    const deptKey = "dept" + (d.dept ? d.dept.charAt(0).toUpperCase() + d.dept.slice(1) : "It");
                    const deptName = t(deptKey) || d.dept || "IT";
                    const dateStr = new Date(d.updated || Date.now()).toLocaleDateString(ui === "ar" ? "ar-EG" : "en-GB");
                    return `
                      <tr>
                        <td>${i + 1}</td>
                        <td><span class="doc-code-badge">${esc(d.docNumber || "SH-DOC-2026-" + String(i + 1).padStart(4, "0"))}</span></td>
                        <td><strong>${esc(d.name || d.title || "مستند بدون عنوان")}</strong></td>
                        <td><span class="card-dept-tag" style="margin:0">${deptName}</span></td>
                        <td><span class="doc-status-badge doc-status-${statusClass}">${statusName}</span></td>
                        <td class="muted">${ui === "ar" ? "م. صلاح" : "Eng. Salah"}</td>
                        <td class="muted">${dateStr}</td>
                        <td style="text-align:center;white-space:nowrap">
                          <button class="btn small primary reg-open-btn" data-id="${d.id}">${t("open")}</button>
                          <button class="btn small danger reg-del-btn" data-id="${d.id}" title="${t("del")}">🗑️</button>
                        </td>
                      </tr>
                    `;
                  }).join("")}
                </tbody>
              </table>
            </div>
          `}
        </div>
      </div>
    `;

    $("#closeRegistryModalBtn").onclick = () => { modal.hidden = true; };
    modal.onclick = (e) => { if (e.target === modal) modal.hidden = true; };

    const expBtn = $("#exportRegistryBtn");
    if (expBtn) {
      expBtn.onclick = async () => {
        try {
          expBtn.disabled = true;
          expBtn.textContent = t("exporting");
          const blob = await SHEXPORT.registryXlsx(allDocs);
          saveBlob(blob, `SEVEN_HANDS_Document_Registry_${new Date().toISOString().slice(0, 10)}.xlsx`);
          showToast(ui === "ar" ? "تم تصدير سجل المستندات بنجاح إلى Excel 🚀" : "Document registry exported to Excel 🚀", "📗");
        } catch (err) {
          console.error(err);
          alert(t("failed") + ": " + (err && err.message));
        } finally {
          expBtn.disabled = false;
          expBtn.innerHTML = `📗 ${t("exportRegistry")}`;
        }
      };
    }

    $$(".reg-open-btn", modal).forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute("data-id");
        const doc = store.all()[id];
        if (doc) {
          modal.hidden = true;
          openDoc(doc);
        }
      };
    });

    $$(".reg-del-btn", modal).forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute("data-id");
        if (confirm(t("confirm"))) {
          store.del(id);
          showToast(t("del"), "🗑️");
          openRegistryModal();
          if (!cur) renderHome();
        }
      };
    });
  }

  /* ---------- Official SEVEN HANDS HR Bylaws & Policy Interactive Reader ---------- */
  function openBylawsModal() {
    const modal = $("#modal");
    if (!modal) return;
    modal.hidden = false;

    const chapters = [
      {
        id: "ch-general",
        icon: "🏢",
        titleAr: "الأحكام العامة ومواعيد العمل",
        titleEn: "General Provisions & Working Hours",
        contentAr: `
          <div class="bylaws-article">
            <h4>📌 نطاق التطبيق والهدف (مادة 1 & 2)</h4>
            <p>تسري هذه السياسة على كافة العاملين بشركة <strong>سفن هاندز (SEVEN HANDS)</strong>، وهي كيان مستقل وليست تابعة لأي شركة داخل جمهورية مصر العربية. تهدف اللائحة لوضع اللوائح والقوانين المنظمة لسير العمل والتعرف على حقوق وواجبات كل موظف. المدة السنوية بالتقويم الميلادي، والقيم بالجنيه المصري.</p>
          </div>
          <div class="bylaws-article">
            <h4>⏰ مواعيد العمل الرسمية (المقر الرئيسي والمشاريع)</h4>
            <ul>
              <li><strong>الحضور:</strong> الساعة 9:00 صباحاً طوال أيام الأسبوع.</li>
              <li><strong>فترة الراحة وتناول الطعام:</strong> من 12:30 ظهراً حتى 1:00 ظهراً (30 دقيقة).</li>
              <li><strong>الانصراف:</strong> الساعة 5:30 مساءً طوال أيام الأسبوع.</li>
              <li><strong>مواعيد يوم الخميس:</strong> من الساعة 9:00 صباحاً حتى الساعة 1:00 ظهراً بدون وقت راحة بالمقر الرئيسي.</li>
              <li><strong>يوم الجمعة:</strong> إجازة نهاية الأسبوع مدفوعة الأجر عن 6 أيام عمل أسبوعياً.</li>
              <li><strong>المشاريع والمواقع:</strong> الالتزام بمواعيد كل مشروع على حدة بما يتناسب مع ظروف الأعمال الهندسية.</li>
            </ul>
          </div>
          <div class="bylaws-article">
            <h4>⚖️ آلية التظلم والشكاوى (مادة 3)</h4>
            <p>يتم النظر والبت في الشكاوى والتظلمات بين الموظف ومسؤول الموارد البشرية ومدير المشروع / المدير العام والرد عليها بحد أقصى <strong>7 أيام عمل</strong>.</p>
          </div>
        `
      },
      {
        id: "ch-leaves",
        icon: "🏖️",
        titleAr: "قواعد وضوابط الإجازات (21 يوماً)",
        titleEn: "Leave Regulations (21 Days)",
        contentAr: `
          <div class="bylaws-article">
            <h4>📅 رصيد الإجازات السنوي (مادة 47 من قانون العمل)</h4>
            <p>لكل موظف <strong>15 يوماً إجازة اعتيادية</strong> + <strong>6 أيام إجازة عارضة</strong> (إجمالي 21 يوماً في السنة مدفوعة الأجر).</p>
            <p style="color:var(--danger);font-weight:700">⚠️ رصيد الإجازات السنوي لا يرحل للعام الذي يليه ولا يصرف نقدياً، بل يلتزم الموظف باستهلاكه خلال العام الجاري بموجب خطة إجازات معتمدة كل 15 يوماً.</p>
          </div>
          <div class="bylaws-article">
            <h4>⏱️ ضوابط الإجازة العارضة</h4>
            <ul>
              <li>للموظف الحق في أخذ إجازة عارضة مقسمة بواقع <strong>يومين كل 4 شهور</strong> (إجمالي 6 أيام سنوياً).</li>
              <li>يتم تقديم الإجازة العارضة في يوم مسبق أو في نفس اليوم <strong>بحد أقصى الساعة 10:00 صباحاً</strong>. إذا لم يتم الإبلاغ بها يخصم اليوم بيومين.</li>
            </ul>
          </div>
          <div class="bylaws-article">
            <h4>📝 ضوابط الإجازة الاعتيادية</h4>
            <ul>
              <li>يتم تقديم الإجازة الاعتيادية في مدة لا تقل عن <strong>48 ساعة عمل</strong> قبل موعد الإجازة (إذا كانت يومين أو أقل).</li>
              <li>إذا تعدت الإجازة أكثر من يومين، يتم تقديمها واعتمادها قبل موعد الإجازة بمدة <strong>أسبوع كامل</strong>.</li>
              <li>إذا قُدمت الإجازة الاعتيادية في موعد أقل من 48 ساعة، تحول إلى عارضة إن وجد رصيد، وإلا تخصم وفقاً للائحة الجزاءات.</li>
              <li>في حالة العمل بأيام العطلات الأسبوعية أو الرسمية لضرورة المشروع، يحق للموظف أخذ <strong>يوم راحة بديل</strong>.</li>
            </ul>
          </div>
        `
      },
      {
        id: "ch-permissions",
        icon: "🎫",
        titleAr: "الأذونات والتأخيرات الشهرية",
        titleEn: "Permissions & Late Arrivals",
        contentAr: `
          <div class="bylaws-article">
            <h4>🚪 قواعد الأذونات الرسمية</h4>
            <ul>
              <li>الحد الأقصى للأذونات هو <strong>4 ساعات شهرياً</strong> تقسم على <strong>إذنين فقط (ساعتين لكل إذن)</strong>.</li>
              <li><strong>حظر أذونات الخميس:</strong> لا يحق اعتماد أي إذن خروج أو تأخير يوم الخميس نظراً لأن الدوام ينتهي 1:00 ظهراً.</li>
              <li>في حالة تجاوز الحد المسموح، يخصم الأذن من الراتب وفقاً للائحة ويكون له تأثير على التقييم السنوي.</li>
            </ul>
          </div>
          <div class="bylaws-article">
            <h4>⏰ السماح بالتأخير الصباحي</h4>
            <ul>
              <li>يسمح بالتأخير لمدة <strong>15 دقيقة لعدد 4 أيام فقط</strong> في الشهر.</li>
              <li>يلتزم الموظف بإبلاغ مديره المباشر قبل بدء يوم العمل وإبلاغ شؤون العاملين خلال ساعة من بدء الدوام (الساعة 10:00 ص كحد أقصى).</li>
            </ul>
          </div>
        `
      },
      {
        id: "ch-allowances",
        icon: "💼",
        titleAr: "البدلات والأوفر تايم والانتقالات",
        titleEn: "Allowances, Overtime & Travel",
        contentAr: `
          <div class="bylaws-article">
            <h4>🚐 لائحة السكن والانتقالات</h4>
            <ul>
              <li>تتحمل الشركة كافة نفقات الانتقالات الخاصة بالمأموريات الرسمية فقط. ولا تتحمل الشركة نفقات الانتقال العادية من وإلى مقر العمل.</li>
              <li>توفر الشركة السكن المناسب أو بدله في حالة مأموريات العمل خارج محافظتي القاهرة والجيزة.</li>
            </ul>
          </div>
          <div class="bylaws-article">
            <h4>💵 لائحة البدلات والمأموريات الخارجية</h4>
            <p>يصرف للموظف أو العامل <strong>بدل 40%</strong> عن كل يوم عمل خارج محافظتي القاهرة والجيزة وفقاً لظروف وطبيعة العمل.</p>
          </div>
          <div class="bylaws-article">
            <h4>⏱️ لائحة العمل الإضافي (Overtime)</h4>
            <ul>
              <li>يصرف الأوفر تايم بناءً على ورقة مسبقة معتمدة ومحددة بعدد ساعات العمل الإضافية المنجزة.</li>
              <li><strong>سعر ساعة العمل الإضافي = 1.4 ساعة</strong> (الساعة تحسب بساعة وأربعين دقيقة).</li>
              <li>يحتسب البدل بعد انقضاء <strong>ساعة كاملة</strong> من مواعيد الانصراف الرسمي (5:30 م)، ويحتسب بعد ذلك كل ربع ساعة.</li>
            </ul>
          </div>
        `
      },
      {
        id: "ch-penalties",
        icon: "⚖️",
        titleAr: "لائحة الجزاءات والخصومات",
        titleEn: "Penalties & Deductions",
        contentAr: `
          <div class="bylaws-article">
            <h4>🚫 جزاءات الغياب والانقطاع</h4>
            <ul>
              <li>الغياب بدون إذن مسبق: <strong>خصم اليوم بيومين</strong>.</li>
              <li>الإجازة بدون رصيد إجازات بعد موافقة الإدارة: <strong>خصم اليوم بيوم ونصف</strong>.</li>
              <li>الغياب لأكثر من 3 أيام في الأسبوع: <strong>خصم يوم الجمعة بدون أجر</strong>.</li>
              <li>وقوع يوم الجمعة بين يومي غياب: <strong>تخصم الجمعة كيوم عمل</strong>.</li>
              <li><strong>الانقطاع المتصل:</strong> 3 أيام متصلة (إنذار أول) · 6 أيام متصلة (إنذار ثانٍ) · 10 أيام متصلة (فصل نهائي من العمل).</li>
              <li><strong>الانقطاع المتقطع:</strong> 5 أيام (إنذار أول) · 10 أيام (إنذار ثانٍ) · 20 يوماً خلال السنة (فصل نهائي).</li>
            </ul>
          </div>
          <div class="bylaws-article">
            <h4>⏳ جزاءات التأخير الصباحي (بعد الـ 15 دقيقة المسموحة)</h4>
            <ul>
              <li>التأخير حتى 15 دقيقة: تخصم الدقيقة بدقيقة.</li>
              <li>التأخير من 15 إلى 30 دقيقة: يخصم بساعة واحدة.</li>
              <li>التأخير من 30 إلى 60 دقيقة: يخصم بساعتين.</li>
              <li>التأخير من 60 إلى 90 دقيقة: يخصم بنصف يوم عمل.</li>
              <li>التأخير من 90 إلى 120 دقيقة: يخصم بيوم إلا ربع (0.75 يوم).</li>
            </ul>
          </div>
        `
      },
      {
        id: "ch-onboarding-resignation",
        icon: "📜",
        titleAr: "الموظفون الجدد والاستقالة",
        titleEn: "Probation & Resignation",
        contentAr: `
          <div class="bylaws-article">
            <h4>👔 ضوابط الموظفين الجدد وفترة الاختبار</h4>
            <ul>
              <li>يلتزم الموظف بتقديم كافة مسوغات التعيين الرسمية مع بداية أول يوم عمل ولا يسمح بأي نقص.</li>
              <li>يكون الموظف في <strong>فترة اختبار لمدة ثلاثة شهور</strong>.</li>
              <li>لا يسمح بالغياب أو الإجازة أو التأخير خلال فترة الاختبار.</li>
              <li>يسمح بإذن لمدة <strong>ساعتين مرة واحدة في الشهر</strong> فقط خلال فترة الاختبار.</li>
            </ul>
          </div>
          <div class="bylaws-article">
            <h4>🤝 ضوابط الاستقالة وإخلاء الطرف</h4>
            <ul>
              <li>يتم تقديم الاستقالة كتابياً في مدة <strong>لا تقل عن شهر</strong> من تاريخ ترك العمل.</li>
              <li>يقوم الموظف بتسليم كامل أعماله وملفاته بالتنسيق مع مديره المباشر والزميل البديل.</li>
              <li>تسليم كامل العهدة التقنية (لابتوب، أجهزة كمبيوتر، شاشات، شواحن) لقسم IT وتسليم العهد المالية والمستندات قبل صرف المستحقات.</li>
            </ul>
          </div>
        `
      }
    ];

    modal.innerHTML = `
      <div class="bylaws-modal-wrap" role="dialog" aria-modal="true" aria-label="لائحة وسياسة الموارد البشرية">
        <div class="bylaws-modal-head">
          <div class="bylaws-title">
            <span>📖</span>
            <span>سياسة ولائحة الموارد البشرية الرسمية - شركة سفن هاندز</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <button class="btn ghost-white small" id="printBylawsBtn" title="طباعة اللائحة">🖨️ طباعة</button>
            <button class="btn ghost-white small" id="openBylawsDocBtn" title="فتح كقالب قابل للتعديل">📝 فتح القالب</button>
            <button class="btn ghost-white small" id="closeBylawsModalBtn" aria-label="إغلاق">✕</button>
          </div>
        </div>
        <div class="bylaws-modal-body">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:14px;flex-wrap:wrap">
            <span class="partition-badge">كود اللائحة المعتمدة: POL-HR-01/2024 · الإصدار 1.0</span>
            <input type="text" id="bylawsSearch" placeholder="ابحث داخل مواد وبنود اللائحة..." style="border:1px solid var(--line);border-radius:20px;padding:6px 14px;font-size:13px;width:240px">
          </div>
          <div class="bylaws-nav-tabs" id="bylawsNavTabs">
            ${chapters.map((ch, idx) => `
              <button class="bylaws-tab-btn ${idx === 0 ? "active" : ""}" data-id="${ch.id}">
                <span>${ch.icon}</span>
                <span>${ui === "ar" ? ch.titleAr : ch.titleEn}</span>
              </button>
            `).join("")}
          </div>
          <div id="bylawsContentArea">
            ${chapters[0].contentAr}
          </div>
        </div>
      </div>
    `;

    $("#closeBylawsModalBtn").onclick = () => { modal.hidden = true; };
    modal.onclick = (e) => { if (e.target === modal) modal.hidden = true; };

    $("#printBylawsBtn").onclick = () => window.print();
    $("#openBylawsDocBtn").onclick = () => {
      modal.hidden = true;
      const tpl = SH.TEMPLATES.find(x => x.id === "hr-bylaws-doc");
      if (tpl) {
        const d = tpl.make();
        d.id = uid();
        store.put(d);
        openDoc(d);
      }
    };

    const tabs = $$(".bylaws-tab-btn", modal);
    tabs.forEach(tab => {
      tab.onclick = () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const chId = tab.getAttribute("data-id");
        const found = chapters.find(c => c.id === chId);
        if (found) {
          $("#bylawsContentArea").innerHTML = found.contentAr;
        }
      };
    });

    const searchInput = $("#bylawsSearch");
    if (searchInput) {
      searchInput.oninput = (e) => {
        const q = e.target.value.trim().toLowerCase();
        if (!q) {
          const activeTab = $(".bylaws-tab-btn.active", modal);
          const chId = activeTab ? activeTab.getAttribute("data-id") : chapters[0].id;
          const found = chapters.find(c => c.id === chId);
          if (found) $("#bylawsContentArea").innerHTML = found.contentAr;
          return;
        }
        let matches = "";
        chapters.forEach(ch => {
          if (ch.contentAr.toLowerCase().includes(q) || ch.titleAr.toLowerCase().includes(q)) {
            matches += `
              <div style="margin-bottom:18px;border-bottom:1px dashed var(--line);padding-bottom:12px">
                <h3 style="color:var(--navy);font-size:16px;margin:0 0 8px">${ch.icon} ${ch.titleAr}</h3>
                ${ch.contentAr}
              </div>
            `;
          }
        });
        $("#bylawsContentArea").innerHTML = matches || `<p class="muted" style="text-align:center;padding:24px">لا توجد بنود تطابق: "${esc(q)}"</p>`;
      };
    }
  }

  /* ========================================================
     Accounting Suite: Arabic Tafqeet & Financial Calculator
     ======================================================== */
  function tafqeet(num, currCode) {
    currCode = currCode || "EGP";
    num = parseFloat(num);
    if (isNaN(num) || num === 0) {
      return ui === "ar" ? "فقط صفر جنيه مصري لا غير" : "Zero EGP only";
    }

    const ones = ["", "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة", "ستة", "سبعة", "ثمانية", "تسعة", "عشرة",
      "أحد عشر", "اثنا عشر", "ثلاثة عشر", "أربعة عشر", "خمسة عشر", "ستة عشر", "سبعة عشر", "ثمانية عشر", "تسعة عشر"];
    const tens = ["", "", "عشرون", "ثلاثون", "أربعون", "خمسون", "ستون", "سبعون", "ثمانون", "تسعون"];
    const hundreds = ["", "مائة", "مائتان", "ثلاثمائة", "أربعمائة", "خمسمائة", "ستمائة", "سبعمائة", "ثمانمائة", "تسعمائة"];

    function convertGroup(n) {
      let s = "";
      const h = Math.floor(n / 100);
      const rem = n % 100;
      if (h > 0) s += hundreds[h];
      if (rem > 0) {
        if (s) s += " و";
        if (rem < 20) s += ones[rem];
        else {
          const o = rem % 10;
          const t = Math.floor(rem / 10);
          if (o > 0) s += ones[o] + " و" + tens[t];
          else s += tens[t];
        }
      }
      return s;
    }

    const intPart = Math.floor(Math.abs(num));
    const decPart = Math.round((Math.abs(num) - intPart) * 100);

    const parts = [];
    const b = Math.floor(intPart / 1000000000);
    const m = Math.floor((intPart % 1000000000) / 1000000);
    const th = Math.floor((intPart % 1000000) / 1000);
    const u = intPart % 1000;

    if (b > 0) {
      if (b === 1) parts.push("مليار");
      else if (b === 2) parts.push("ملياران");
      else if (b >= 3 && b <= 10) parts.push(convertGroup(b) + " مليارات");
      else parts.push(convertGroup(b) + " ملياراً");
    }

    if (m > 0) {
      if (m === 1) parts.push("مليون");
      else if (m === 2) parts.push("مليونان");
      else if (m >= 3 && m <= 10) parts.push(convertGroup(m) + " ملايين");
      else parts.push(convertGroup(m) + " مليونا");
    }

    if (th > 0) {
      if (th === 1) parts.push("ألف");
      else if (th === 2) parts.push("ألفان");
      else if (th >= 3 && th <= 10) parts.push(convertGroup(th) + " آلاف");
      else parts.push(convertGroup(th) + " ألفاً");
    }

    if (u > 0) {
      parts.push(convertGroup(u));
    }

    let mainUnit = "جنيه مصري";
    let subUnit = "قرش";
    if (currCode === "USD") { mainUnit = "دولار أمريكي"; subUnit = "سنت"; }
    else if (currCode === "SAR") { mainUnit = "ريال سعودي"; subUnit = "هللة"; }
    else if (currCode === "EUR") { mainUnit = "يورو"; subUnit = "سنت"; }

    let currText = mainUnit;
    if (currCode === "EGP") {
      if (intPart === 1) currText = "جنيه مصري واحد";
      else if (intPart === 2) currText = "جنيهان مصريان";
      else if (intPart >= 3 && intPart <= 10) currText = "جنيهات مصرية";
      else if (intPart > 10 && (intPart % 100 !== 0 || intPart < 100)) currText = "جنيهاً مصرياً";
      else currText = "جنيه مصري";
    }

    let res = "";
    if (parts.length > 0) {
      const words = parts.join(" و");
      res = (intPart === 1 || intPart === 2) && currCode === "EGP" ? currText : words + " " + currText;
    }

    if (decPart > 0) {
      const decWords = convertGroup(decPart);
      let pCurr = subUnit;
      if (currCode === "EGP") {
        pCurr = (decPart >= 3 && decPart <= 10) ? "قروش" : "قرشاً";
      }
      res += (res ? " و" : "") + decWords + " " + pCurr;
    }

    return "فقط " + (res || "صفر " + mainUnit) + " لا غير";
  }

  function startTemplateById(tplId, customData) {
    const tp = SH.TEMPLATES.find(x => x.id === tplId || x.prefix === tplId);
    if (!tp) return;
    const allDocs = Object.values(store.all());
    const newDoc = tp.make();
    newDoc.id = uid();
    newDoc.name = ui === "ar" ? tp.ar : tp.en;
    newDoc.tpl = tp.id;
    newDoc.dept = tp.dept || "accounting";
    const nextSeq = allDocs.length + 1;
    newDoc.docNumber = `${tp.prefix || "SH-DOC"}-2026-${String(nextSeq).padStart(4, "0")}`;
    newDoc.status = "draft";
    if (customData) {
      Object.assign(newDoc, customData);
    }
    store.put(newDoc);
    const modal = $("#modal");
    if (modal) modal.hidden = true;
    showToast(t("savedOk"), "💾");
    openDoc(newDoc);
  }

  function openAccountingToolsModal() {
    trackEvent("open_accounting_tools");
    const modal = $("#modal");
    if (!modal) return;
    modal.hidden = false;

    modal.innerHTML = `
      <div class="acc-modal-wrap" role="dialog" aria-modal="true" aria-label="أدوات وحاسبة المحاسب والتفقيط المالي">
        <div class="acc-modal-head">
          <div>
            <div class="acc-modal-title">
              <span>💰</span>
              <span>أدوات وحاسبة المحاسب والتفقيط المالي المعتمد</span>
            </div>
            <small class="acc-modal-sub">سفن هاندز للخدمات الهندسية والمقاولات · الإدارة المالية والحسابات</small>
          </div>
          <button class="btn ghost-white small" id="closeAccModalBtn" aria-label="إغلاق">✕</button>
        </div>
        <div class="acc-modal-body">
          <!-- Navigation Tabs -->
          <div class="acc-tabs-nav">
            <button class="acc-tab-btn active" id="accTabBtnTafqeet" data-tab="tafqeet">
              <span>✍️</span> <span>التفقيط المالي باللغة العربية</span>
            </button>
            <button class="acc-tab-btn" id="accTabBtnCalc" data-tab="calc">
              <span>🧮</span> <span>حاسبة الضرائب والاستقطاعات الهندسية</span>
            </button>
            <button class="acc-tab-btn" id="accTabBtnForms" data-tab="forms">
              <span>📑</span> <span>النماذج والسندات المحاسبية (ISO)</span>
            </button>
          </div>

          <!-- Tab 1: Tafqeet -->
          <div id="accTabContentTafqeet">
            <div class="acc-card">
              <h3 class="acc-card-title"><span>✍️</span> تحويل المبالغ النقدية إلى كلمات (التفقيط الرسمي للشيكات والسندات)</h3>
              <p class="muted" style="margin-top:0">أدخل المبلغ بالأرقام للحصول على الصياغة العربية المعتمدة للسندات والشيكات والفواتير الرسمية فوراً.</p>

              <div class="acc-input-row">
                <input type="number" id="tafqeetAmountInput" class="acc-input-field" placeholder="أدخل المبلغ بالأرقام (مثال: 15450.75)" value="15450.75" step="any">
                <select id="tafqeetCurrencySelect" class="acc-select-field">
                  <option value="EGP" selected>🇪🇬 جنيه مصري (EGP)</option>
                  <option value="USD">🇺🇸 دولار أمريكي (USD)</option>
                  <option value="SAR">🇸🇦 ريال سعودي (SAR)</option>
                  <option value="EUR">🇪🇺 يورو (EUR)</option>
                </select>
              </div>

              <div class="acc-tafqeet-box">
                <div class="acc-tafqeet-label"><span>📜</span> النص العربي المفقط المعتمد:</div>
                <div id="tafqeetOutputText" class="acc-tafqeet-text">فقط خمسة عشر ألفاً وأربعمائة وخمسون جنيهاً مصرياً وخمسة وسبعون قرشاً لا غير</div>
              </div>

              <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:14px">
                <button class="btn primary" id="copyTafqeetBtn">📋 نسخ التفقيط</button>
                <button class="btn accent" id="insertTafqeetBtn" title="إدراج في الورقة النشطة المفتوحة">✏️ إدراج بالورقة المفتوحة</button>
                <button class="btn ghost small" id="createVoucherWithTafqeetBtn">💵 إنشاء سند صرف بهذا المبلغ</button>
              </div>

              <div style="margin-top:16px">
                <small class="muted" style="font-weight:700">مبالغ شائعة وسريعة:</small>
                <div class="acc-preset-pills">
                  <button class="acc-preset-btn" data-val="1000">1,000 ج.م</button>
                  <button class="acc-preset-btn" data-val="5000">5,000 ج.م (عهدة)</button>
                  <button class="acc-preset-btn" data-val="15450.75">15,450.75 ج.م</button>
                  <button class="acc-preset-btn" data-val="47000">47,000 ج.م (محطة عمل)</button>
                  <button class="acc-preset-btn" data-val="65730">65,730 ج.م (مستخلص)</button>
                  <button class="acc-preset-btn" data-val="100000">100,000 ج.م</button>
                  <button class="acc-preset-btn" data-val="2500000">2,500,000 ج.م (مشروع)</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab 2: Calculator -->
          <div id="accTabContentCalc" hidden>
            <div class="acc-card">
              <h3 class="acc-card-title"><span>🧮</span> حاسبة الفواتير والضرائب واستقطاعات المقاولات</h3>
              <p class="muted" style="margin-top:0">حساب فوري شامل لضريبة القيمة المضافة (14%)، ضريبة الخصم والتحصيل (أ.ت.ص)، تأمين الأعمال (5%)، والدفعة المقدمة (10%).</p>

              <div class="acc-calc-grid">
                <!-- Left: Inputs -->
                <div>
                  <label style="display:block;font-weight:700;margin-bottom:6px;color:var(--navy)">المبلغ الأساسي (قبل الضريبة / قيمة الأعمال المنفذة):</label>
                  <div class="acc-input-row">
                    <input type="number" id="calcBaseInput" class="acc-input-field" value="100000" step="any" placeholder="المبلغ الأساسي">
                    <span style="font-weight:700;color:var(--navy)">ج.م</span>
                  </div>

                  <div class="acc-options-group">
                    <label class="acc-option-label">
                      <input type="checkbox" id="calcOptVat" checked>
                      <span>إضافة ضريبة القيمة المضافة (+ 14% VAT)</span>
                    </label>

                    <div style="background:#f4f8fb;padding:10px 12px;border-radius:8px;border:1px solid var(--line)">
                      <span style="font-size:12.5px;font-weight:700;display:block;margin-bottom:6px;color:var(--navy)">ضريبة الخصم والإضافة (خصم من المنبع - أ.ت.ص):</span>
                      <div style="display:flex;gap:12px;flex-wrap:wrap">
                        <label class="acc-option-label">
                          <input type="radio" name="calcWht" value="0.01" checked>
                          <span>1% (توريدات ومعدات)</span>
                        </label>
                        <label class="acc-option-label">
                          <input type="radio" name="calcWht" value="0.03">
                          <span>3% (خدمات ومقاولات)</span>
                        </label>
                        <label class="acc-option-label">
                          <input type="radio" name="calcWht" value="0">
                          <span>بدون خصم</span>
                        </label>
                      </div>
                    </div>

                    <label class="acc-option-label">
                      <input type="checkbox" id="calcOptRetention" checked>
                      <span>خصم تأمين ضمان أعمال وحسن تنفيذ (- 5%)</span>
                    </label>

                    <label class="acc-option-label">
                      <input type="checkbox" id="calcOptAdvance" checked>
                      <span>خصم استرداد دفعة مقدمة (- 10%)</span>
                    </label>
                  </div>
                </div>

                <!-- Right: Breakdown Table -->
                <div>
                  <div style="background:#fff;border:1.5px solid #bce1f5;border-radius:10px;padding:14px;box-shadow:0 4px 12px rgba(9,72,120,0.06)">
                    <span style="font-weight:700;color:var(--navy);display:block;margin-bottom:8px">📊 بيان الحسبة المالية المعتمد:</span>
                    <table class="acc-calc-table">
                      <tbody>
                        <tr>
                          <td>المبلغ الأساسي (قبل الضريبة)</td>
                          <td style="text-align:left;font-weight:700" id="calcRowBase">100,000.00 ج.م</td>
                        </tr>
                        <tr style="color:#0a7e50">
                          <td>+ ضريبة القيمة المضافة (14%)</td>
                          <td style="text-align:left;font-weight:700" id="calcRowVat">+14,000.00 ج.م</td>
                        </tr>
                        <tr class="total-row">
                          <td>= الإجمالي شامل الضريبة (14%)</td>
                          <td style="text-align:left" id="calcRowTotalWithVat">114,000.00 ج.م</td>
                        </tr>
                        <tr style="color:#b3261e">
                          <td>- خصم ضريبة أ.ت.ص (منبع)</td>
                          <td style="text-align:left;font-weight:700" id="calcRowWht">-1,000.00 ج.م</td>
                        </tr>
                        <tr style="color:#b3261e">
                          <td>- تأمين ضمان الأعمال (5%)</td>
                          <td style="text-align:left;font-weight:700" id="calcRowRetention">-5,000.00 ج.م</td>
                        </tr>
                        <tr style="color:#b3261e">
                          <td>- استرداد دفعة مقدمة (10%)</td>
                          <td style="text-align:left;font-weight:700" id="calcRowAdvance">-10,000.00 ج.م</td>
                        </tr>
                        <tr class="net-row">
                          <td>صافي المستحق للصرف للشيك</td>
                          <td style="text-align:left" id="calcRowNet">98,000.00 ج.م</td>
                        </tr>
                      </tbody>
                    </table>

                    <div style="margin-top:12px;background:#f0f7fb;border-radius:6px;padding:10px;border:1px solid #cce4f2">
                      <small class="muted" style="font-weight:700;display:block;margin-bottom:4px">تفقيط صافي المستحق:</small>
                      <div id="calcNetTafqeet" style="font-weight:700;color:var(--navy);font-size:13.5px">فقط ثمانية وتسعون ألف جنيهاً مصرياً لا غير</div>
                    </div>

                    <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
                      <button class="btn small primary" id="copyCalcSummaryBtn">📋 نسخ ملخص الحسبة</button>
                      <button class="btn small accent" id="createVoucherFromCalcBtn">💵 إصدار سند صرف</button>
                      <button class="btn small ghost" id="createIpcFromCalcBtn">🏗️ إصدار مستخلص</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab 3: Accounting Templates -->
          <div id="accTabContentForms" hidden>
            <div class="acc-card">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px">
                <div>
                  <h3 class="acc-card-title" style="margin:0"><span>📑</span> النماذج والدفاتر المحاسبية المعتمدة (ISO F-08/10)</h3>
                  <p class="muted" style="margin:4px 0 0">نماذج رسمية جاهزة للطباعة والتصدير الفوري إلى Excel و Word و PDF.</p>
                </div>
                <button class="btn primary small" id="switchAccPartitionBtn">⚡ الانتقال لبيئة عمل الحسابات</button>
              </div>

              <div class="acc-templates-grid">
                <div class="acc-tpl-card">
                  <div>
                    <div class="acc-tpl-head">
                      <span class="acc-tpl-icon">💵</span>
                      <div>
                        <h4 class="acc-tpl-title">سند صرف نقدية / شيك</h4>
                        <span class="acc-tpl-code">F-08/10 F1 · حفظ 5 سنوات</span>
                      </div>
                    </div>
                    <p class="acc-tpl-desc">سند صرف رسمي للموردين والمقاولين والمصروفات مع التوجيه المحاسبي.</p>
                  </div>
                  <button class="btn small primary launch-acc-tpl-btn" data-tpl="acc-payment-voucher">فتح وتحرير النموذج ↗</button>
                </div>

                <div class="acc-tpl-card">
                  <div>
                    <div class="acc-tpl-head">
                      <span class="acc-tpl-icon">💳</span>
                      <div>
                        <h4 class="acc-tpl-title">سند قبض نقدية / شيك</h4>
                        <span class="acc-tpl-code">F-08/10 F2 · حفظ 5 سنوات</span>
                      </div>
                    </div>
                    <p class="acc-tpl-desc">سند تحصيل وقبض رسمي لإيداعات العملاء ودفعات المشروعات.</p>
                  </div>
                  <button class="btn small primary launch-acc-tpl-btn" data-tpl="acc-receipt-voucher">فتح وتحرير النموذج ↗</button>
                </div>

                <div class="acc-tpl-card">
                  <div>
                    <div class="acc-tpl-head">
                      <span class="acc-tpl-icon">💼</span>
                      <div>
                        <h4 class="acc-tpl-title">استمارة تسوية عهدة نقدية</h4>
                        <span class="acc-tpl-code">F-08/10 F3 · حفظ 5 سنوات</span>
                      </div>
                    </div>
                    <p class="acc-tpl-desc">كشف تسوية الفواتير والمصروفات النثرية مع حساب المتبقي أو المستحق.</p>
                  </div>
                  <button class="btn small primary launch-acc-tpl-btn" data-tpl="acc-petty-cash">فتح وتحرير النموذج ↗</button>
                </div>

                <div class="acc-tpl-card">
                  <div>
                    <div class="acc-tpl-head">
                      <span class="acc-tpl-icon">🏗️</span>
                      <div>
                        <h4 class="acc-tpl-title">مستخلص جاري مقاولي باطن</h4>
                        <span class="acc-tpl-code">F-08/10 F4 · مشاريع هندسية</span>
                      </div>
                    </div>
                    <p class="acc-tpl-desc">حصر كميات الأعمال، نسب الإنجاز، واستقطاعات الدفعة المقدمة والضمان.</p>
                  </div>
                  <button class="btn small primary launch-acc-tpl-btn" data-tpl="acc-contractor-cert">فتح وتحرير النموذج ↗</button>
                </div>

                <div class="acc-tpl-card">
                  <div>
                    <div class="acc-tpl-head">
                      <span class="acc-tpl-icon">👥</span>
                      <div>
                        <h4 class="acc-tpl-title">كشف مسير رواتب شهري</h4>
                        <span class="acc-tpl-code">F-08/10 F5 · شؤون العاملين</span>
                      </div>
                    </div>
                    <p class="acc-tpl-desc">مسير الرواتب: أساسي، بدلات، أوفرتايم، استقطاعات غياب وتأمينات، وصافي الراتب.</p>
                  </div>
                  <button class="btn small primary launch-acc-tpl-btn" data-tpl="acc-payroll-sheet">فتح وتحرير النموذج ↗</button>
                </div>

                <div class="acc-tpl-card">
                  <div>
                    <div class="acc-tpl-head">
                      <span class="acc-tpl-icon">💰</span>
                      <div>
                        <h4 class="acc-tpl-title">طلب سلفة مالية مؤقتة</h4>
                        <span class="acc-tpl-code">F-08/10 F6 · حفظ 3 سنوات</span>
                      </div>
                    </div>
                    <p class="acc-tpl-desc">طلب سلفة على الراتب وتحديد الأقساط الشهرية ورصيد السلف السابقة.</p>
                  </div>
                  <button class="btn small primary launch-acc-tpl-btn" data-tpl="acc-advance-request">فتح وتحرير النموذج ↗</button>
                </div>

                <div class="acc-tpl-card">
                  <div>
                    <div class="acc-tpl-head">
                      <span class="acc-tpl-icon">🧾</span>
                      <div>
                        <h4 class="acc-tpl-title">سجل فحص الفواتير والضريبة</h4>
                        <span class="acc-tpl-code">F-08/10 F7 · فحص ضريبي</span>
                      </div>
                    </div>
                    <p class="acc-tpl-desc">مطابقة الفواتير الإلكترونية، ضريبة 14%، وخصم 1% مع أوامر التوريد.</p>
                  </div>
                  <button class="btn small primary launch-acc-tpl-btn" data-tpl="acc-tax-audit">فتح وتحرير النموذج ↗</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Hook up modal close
    $("#closeAccModalBtn").onclick = () => { modal.hidden = true; };
    modal.onclick = (e) => { if (e.target === modal) modal.hidden = true; };

    // Hook up tab buttons
    const tabs = ["tafqeet", "calc", "forms"];
    tabs.forEach(tId => {
      const b = $(`#accTabBtn${tId.charAt(0).toUpperCase() + tId.slice(1)}`);
      if (b) {
        b.onclick = () => {
          $$(".acc-tab-btn", modal).forEach(x => x.classList.remove("active"));
          b.classList.add("active");
          $("#accTabContentTafqeet").hidden = tId !== "tafqeet";
          $("#accTabContentCalc").hidden = tId !== "calc";
          $("#accTabContentForms").hidden = tId !== "forms";
        };
      }
    });

    // Tafqeet logic
    const tafqeetInput = $("#tafqeetAmountInput");
    const tafqeetCurr = $("#tafqeetCurrencySelect");
    const tafqeetOut = $("#tafqeetOutputText");

    function refreshTafqeet() {
      const val = parseFloat(tafqeetInput.value);
      const curr = tafqeetCurr.value;
      const text = tafqeet(val, curr);
      tafqeetOut.textContent = text;
    }

    if (tafqeetInput) tafqeetInput.oninput = refreshTafqeet;
    if (tafqeetCurr) tafqeetCurr.onchange = refreshTafqeet;

    $$(".acc-preset-btn", modal).forEach(btn => {
      btn.onclick = () => {
        const v = btn.getAttribute("data-val");
        tafqeetInput.value = v;
        refreshTafqeet();
      };
    });

    // Copy Tafqeet
    const copyTafqeetBtn = $("#copyTafqeetBtn");
    if (copyTafqeetBtn) {
      copyTafqeetBtn.onclick = () => {
        const text = tafqeetOut.textContent;
        navigator.clipboard.writeText(text).then(() => {
          showToast("تم نسخ التفقيط إلى الحافظة بنجاح 📋", "✍️");
        });
      };
    }

    // Insert Tafqeet into open document
    const insertTafqeetBtn = $("#insertTafqeetBtn");
    if (insertTafqeetBtn) {
      insertTafqeetBtn.onclick = () => {
        if (!cur) {
          showToast("يرجى فتح مستند أولاً لإدراج التفقيط به", "ℹ️");
          return;
        }
        const text = tafqeetOut.textContent;
        let inserted = false;
        if (cur.blocks) {
          for (let b of cur.blocks) {
            if (b.type === "table" && b.rows) {
              for (let r of b.rows) {
                if (Array.isArray(r) && r.some(cell => typeof cell === "string" && (cell.includes("فقط") || cell.includes("وقدره")))) {
                  for (let i = 0; i < r.length; i++) {
                    if (typeof r[i] === "string" && (r[i].includes("فقط") || r[i].includes("وقدره"))) {
                      r[i] = text;
                      inserted = true;
                      break;
                    }
                  }
                }
                if (inserted) break;
              }
            }
            if (inserted) break;
          }
          if (!inserted) {
            cur.blocks.push({ type: "box", tone: "info", text: "المبلغ فقط وقدره: " + text });
            inserted = true;
          }
        }
        flushSave();
        renderEditor();
        modal.hidden = true;
        showToast("تم إدراج النص المفقط بالوثيقة بنجاح ✍️", "✅");
      };
    }

    // Create Voucher with current Tafqeet
    const createVoucherWithTafqeetBtn = $("#createVoucherWithTafqeetBtn");
    if (createVoucherWithTafqeetBtn) {
      createVoucherWithTafqeetBtn.onclick = () => {
        const val = parseFloat(tafqeetInput.value) || 0;
        const text = tafqeetOut.textContent;
        startTemplateById("acc-payment-voucher");
        if (cur && cur.blocks && cur.blocks[0] && cur.blocks[0].rows) {
          cur.blocks[0].rows[1][1] = fmtNum(val) + " ج.م";
          cur.blocks[0].rows[2][1] = text;
          flushSave();
          renderEditor();
        }
      };
    }

    // Calculator Logic
    const calcBase = $("#calcBaseInput");
    const calcVatCheck = $("#calcOptVat");
    const calcRetentionCheck = $("#calcOptRetention");
    const calcAdvanceCheck = $("#calcOptAdvance");

    function refreshCalc() {
      const base = parseFloat(calcBase.value) || 0;
      const vatRate = calcVatCheck.checked ? 0.14 : 0;
      const whtRadio = document.querySelector('input[name="calcWht"]:checked');
      const whtRate = whtRadio ? parseFloat(whtRadio.value) || 0 : 0;
      const retentionRate = calcRetentionCheck.checked ? 0.05 : 0;
      const advanceRate = calcAdvanceCheck.checked ? 0.10 : 0;

      const vatVal = base * vatRate;
      const totalWithVat = base + vatVal;
      const whtVal = base * whtRate;
      const retentionVal = base * retentionRate;
      const advanceVal = base * advanceRate;
      const netVal = totalWithVat - whtVal - retentionVal - advanceVal;

      $("#calcRowBase").textContent = fmtNum(base) + " ج.م";
      $("#calcRowVat").textContent = (vatVal > 0 ? "+" : "") + fmtNum(vatVal) + " ج.م";
      $("#calcRowTotalWithVat").textContent = fmtNum(totalWithVat) + " ج.م";
      $("#calcRowWht").textContent = (whtVal > 0 ? "-" : "") + fmtNum(whtVal) + " ج.م";
      $("#calcRowRetention").textContent = (retentionVal > 0 ? "-" : "") + fmtNum(retentionVal) + " ج.م";
      $("#calcRowAdvance").textContent = (advanceVal > 0 ? "-" : "") + fmtNum(advanceVal) + " ج.م";
      $("#calcRowNet").textContent = fmtNum(netVal) + " ج.م";

      const netTafqeet = tafqeet(netVal, "EGP");
      $("#calcNetTafqeet").textContent = netTafqeet;
    }

    if (calcBase) calcBase.oninput = refreshCalc;
    if (calcVatCheck) calcVatCheck.onchange = refreshCalc;
    if (calcRetentionCheck) calcRetentionCheck.onchange = refreshCalc;
    if (calcAdvanceCheck) calcAdvanceCheck.onchange = refreshCalc;
    $$('input[name="calcWht"]', modal).forEach(r => r.onchange = refreshCalc);

    refreshCalc();

    // Copy Calc Summary
    const copyCalcSummaryBtn = $("#copyCalcSummaryBtn");
    if (copyCalcSummaryBtn) {
      copyCalcSummaryBtn.onclick = () => {
        const base = $("#calcRowBase").textContent;
        const vat = $("#calcRowVat").textContent;
        const tot = $("#calcRowTotalWithVat").textContent;
        const wht = $("#calcRowWht").textContent;
        const ret = $("#calcRowRetention").textContent;
        const adv = $("#calcRowAdvance").textContent;
        const net = $("#calcRowNet").textContent;
        const taf = $("#calcNetTafqeet").textContent;

        const summary = `بيان الحسبة المالية - سفن هاندز للخدمات الهندسية والمقاولات:
• القيمة الأساسية: ${base}
• ضريبة القيمة المضافة 14%: ${vat}
• الإجمالي شامل الضريبة: ${tot}
• خصم ضريبة أ.ت.ص: ${wht}
• تأمين ضمان الأعمال 5%: ${ret}
• استرداد دفعة مقدمة 10%: ${adv}
• صافي المبلغ المستحق للصرف: ${net}
• التفقيط: ${taf}`;

        navigator.clipboard.writeText(summary).then(() => {
          showToast("تم نسخ تفاصيل الحسبة المالية بنجاح 📊", "📋");
        });
      };
    }

    // Create Voucher from Calc
    const createVoucherFromCalcBtn = $("#createVoucherFromCalcBtn");
    if (createVoucherFromCalcBtn) {
      createVoucherFromCalcBtn.onclick = () => {
        const net = $("#calcRowNet").textContent;
        const taf = $("#calcNetTafqeet").textContent;
        startTemplateById("acc-payment-voucher");
        if (cur && cur.blocks && cur.blocks[0] && cur.blocks[0].rows) {
          cur.blocks[0].rows[1][1] = net;
          cur.blocks[0].rows[2][1] = taf;
          flushSave();
          renderEditor();
        }
      };
    }

    // Create IPC from Calc
    const createIpcFromCalcBtn = $("#createIpcFromCalcBtn");
    if (createIpcFromCalcBtn) {
      createIpcFromCalcBtn.onclick = () => {
        startTemplateById("acc-contractor-cert");
      };
    }

    // Switch to accounting partition button
    const switchAccPartBtn = $("#switchAccPartitionBtn");
    if (switchAccPartBtn) {
      switchAccPartBtn.onclick = () => {
        modal.hidden = true;
        setPartition("accounting");
      };
    }

    // Launch template buttons in forms tab
    $$(".launch-acc-tpl-btn", modal).forEach(btn => {
      btn.onclick = () => {
        const tplId = btn.getAttribute("data-tpl");
        startTemplateById(tplId);
      };
    });
  }

  /* ---------- Department Partitions & Access Control ---------- */
  const PARTITION_KEY = "sh_active_partition";
  let activePartition = "all";
  try {
    activePartition = localStorage.getItem(PARTITION_KEY) || "all";
  } catch (e) {}

  const DEPT_INFO = {
    all: {
      id: "all",
      icon: "⚡",
      ar: "كافة الأقسام",
      en: "All Departments",
      subAr: "صلاحيات كاملة لجميع النماذج واللوائح",
      subEn: "Full access to all templates and bylaws",
      descAr: "عرض موحد وشامل لكافة أقسام شركة سفن هاندز: تكنولوجيا المعلومات، الموارد البشرية، المشتريات، السكرتارية، الهندسة، والإدارة.",
      descEn: "Comprehensive view of all SEVEN HANDS departments.",
      managerAr: "الإدارة العامة / مسؤول النظام",
      managerEn: "General Management / System Admin"
    },
    hr: {
      id: "hr",
      icon: "👥",
      ar: "الموارد البشرية وشؤون العاملين",
      en: "HR & Personnel",
      subAr: "اللوائح الرسمية، الإجازات، الأذونات، الأوفر تايم، والاستقالات",
      subEn: "Official bylaws, leaves, permissions, overtime, resignations",
      descAr: "قسم شؤون العاملين واللوائح الرسمية المعتمدة (F-08/10): نماذج الإجازات (اعتيادي، عارضة، نصف يوم)، أذونات الحضور والانصراف، ساعات العمل الإضافي، إخلاء الطرف، ودليل اللائحة.",
      descEn: "Personnel affairs and ISO F-08/10 forms: leaves, permissions, overtime, bylaws manual.",
      managerAr: "إدارة الموارد البشرية وشؤون العاملين",
      managerEn: "HR & Personnel Department",
      quickActions: [
        { label: "📖 لائحة الشركة المعتمدة", action: () => openBylawsModal(), highlight: true },
        { label: "📝 طلب إجازة رسمي", tpl: "hr-leave-req" },
        { label: "🎫 طلب إذن رسمي", tpl: "hr-prm-gen" },
        { label: "💼 كشف أوفر تايم", tpl: "hr-overtime" },
        { label: "🤝 تسليم عهدة", tpl: "hr-handover" },
        { label: "📜 طلب استقالة", tpl: "hr-resignation" }
      ]
    },
    it: {
      id: "it",
      icon: "💻",
      ar: "تكنولوجيا المعلومات",
      en: "IT Department",
      subAr: "محطات Revit، مقارنات الأسعار، الصيانة، وجرد الأجهزة",
      subEn: "Revit workstations, price comparisons, maintenance, inventory",
      descAr: "قسم IT - م. صلاح (مهندس علوم حاسب) تحت إشراف م. عصام (مدير IT): ترقية محطات عمل أسطول Revit/Autodesk لـ 5 سنوات، مقارنات مول البستان والنخيلي وسيجما، وتذاكر الصيانة.",
      descEn: "IT Department: Revit/Autodesk fleet upgrades, Bostan/Sigma price comparison, maintenance.",
      managerAr: "إعداد: م. صلاح (مهندس علوم حاسب) · إشراف: م. عصام (مدير IT)",
      managerEn: "Prep: Eng. Salah · Review: Eng. Esam (IT Manager)",
      quickActions: [
        { label: "💻 مواصفات Revit (5 سنوات)", tpl: "spec-revit" },
        { label: "🏬 مقارنة مول البستان", tpl: "bostan" },
        { label: "🛠️ تذكرة صيانة IT", tpl: "it-ticket" },
        { label: "🗂️ سجل جرد الأجهزة", tpl: "it-inventory" },
        { label: "🖱️ خطة الملحقات والاحتياطي", tpl: "spares" }
      ]
    },
    procurement: {
      id: "procurement",
      icon: "🛒",
      ar: "المشتريات والعقود",
      en: "Procurement & Contracts",
      subAr: "طلبات الشراء، مقارنات الموردين، وأوامر التوريد",
      subEn: "Purchase requests, supplier quotes, purchase orders",
      descAr: "قسم المشتريات والعقود: إعداد أذونات الشراء المعتمدة، مقارنة عروض الأسعار بين Sigma والنخيلي ومول البستان، إصدار أوامر التوريد للموردين المعتمدين.",
      descEn: "Procurement & Contracts: PRs, price comparisons, supply orders.",
      managerAr: "إدارة المشتريات ولجنة البت المالي",
      managerEn: "Procurement & Financial Committee",
      quickActions: [
        { label: "🏬 مقارنة أسعار البستان", tpl: "bostan" },
        { label: "🛒 طلب شراء معتمد (PR)", tpl: "proc-pr" },
        { label: "🚚 أمر توريد رسمي (PO)", tpl: "proc-po" }
      ]
    },
    secretary: {
      id: "secretary",
      icon: "📋",
      ar: "السكرتارية والإدارة المكتبية",
      en: "Secretary & Admin",
      subAr: "الخطابات الرسمية، محاضر الاجتماعات، وحجز القاعات",
      subEn: "Official letters, meeting minutes, room scheduling",
      descAr: "السكرتارية التنفيذية: الخطابات الصادرة والواردة، توثيق وتوزيع محاضر الاجتماعات وتوصيات الإدارة، وجدول حجز قاعة الاجتماعات وسماعة Anker والشاشة 65 بوصة.",
      descEn: "Executive Secretary: Official letters, meeting minutes, meeting room schedule.",
      managerAr: "السكرتارية التنفيذية وإدارة المكتب",
      managerEn: "Executive Secretariat",
      quickActions: [
        { label: "✉️ خطاب رسمي صادر", tpl: "sec-letter" },
        { label: "📝 محضر اجتماع", tpl: "sec-minutes" },
        { label: "📅 حجز قاعة الاجتماعات", tpl: "sec-room" }
      ]
    },
    engineering: {
      id: "engineering",
      icon: "📐",
      ar: "الخدمات الهندسية والمشاريع",
      en: "Engineering Services",
      subAr: "فحص محطات Revit، تراخيص البرامج الهندسية، والمشاريع",
      subEn: "Revit workstation validation, software licensing, site inspection",
      descAr: "قسم الخدمات الهندسية والمكتب الفني: مطابقة كفاءة محطات العمل لتشغيل Autodesk Revit و AutoCAD، طلبات التراخيص الهندسية وتقارير الفحص.",
      descEn: "Engineering Services: Autodesk/Revit performance inspection and licensing.",
      managerAr: "المكتب الفني وإدارة المشاريع الهندسية",
      managerEn: "Technical Office & Projects",
      quickActions: [
        { label: "📐 فحص محطات Revit", tpl: "eng-inspection" },
        { label: "💻 مواصفات Revit (5 سنوات)", tpl: "spec-revit" }
      ]
    },
    management: {
      id: "management",
      icon: "🏢",
      ar: "الإدارة العامة والمدير التنفيذي",
      en: "General Management",
      subAr: "مذكرات العرض الإداري، قرارات الاعتماد، وسجل المستندات",
      subEn: "Administrative memos, approvals, central document register",
      descAr: "الإدارة العامة والمدير التنفيذي: مذكرات اتخاذ القرار لتطوير الأسطول والأصول، اعتمادات طلبات الشراء، ومتابعة سجل المستندات المركزي وتصديره.",
      descEn: "General Management: Decision-ready briefs, approvals, document registry.",
      managerAr: "الرئيس التنفيذي / المدير العام",
      managerEn: "Chief Executive Officer / General Manager",
      quickActions: [
        { label: "🏢 مذكرة قرار إداري", tpl: "mgmt-decision" },
        { label: "📑 سجل المستندات المركزي", action: () => openRegistryModal(), highlight: true }
      ]
    },
    accounting: {
      id: "accounting",
      icon: "💰",
      ar: "الإدارة المالية والحسابات",
      en: "Finance & Accounting",
      subAr: "سندات الصرف والقبض، تسوية العهد النقدية، مستخلصات المقاولين، ومسير الرواتب",
      subEn: "Payment/receipt vouchers, petty cash, interim contractor certificates, payroll",
      descAr: "قسم الحسابات والإدارة المالية: إصدار ومراجعة سندات الصرف والقبض، استمارات تسوية العهد النقدية، مستخلصات مقاولي الباطن والمشاريع الهندسية، مراجعة الفواتير الضريبية وتطبيق التفقيط التلقائي.",
      descEn: "Finance & Accounting: Cash/cheque vouchers, petty cash reconciliation, interim contractor certificates, tax invoice audit, and automatic Arabic currency tafqeet.",
      managerAr: "رئيس الحسابات والإدارة المالية · SEVEN HANDS",
      managerEn: "Chief Accountant & Finance Department",
      quickActions: [
        { label: "🧮 حاسبة المحاسب والتفقيط", action: () => openAccountingToolsModal(), highlight: true },
        { label: "💵 سند صرف نقدية / شيك", tpl: "acc-payment-voucher" },
        { label: "💳 سند قبض نقدية / شيك", tpl: "acc-receipt-voucher" },
        { label: "💼 تسوية عهدة مالية", tpl: "acc-petty-cash" },
        { label: "🏗️ مستخلص جاري مقاولين", tpl: "acc-contractor-cert" },
        { label: "👥 مسير رواتب ومستحقات", tpl: "acc-payroll-sheet" },
        { label: "🧾 فحص فواتير وضريبة 14%", tpl: "acc-tax-audit" }
      ]
    }
  };

  function setPartition(deptId) {
    activePartition = deptId || "all";
    try {
      localStorage.setItem(PARTITION_KEY, activePartition);
    } catch (e) {}
    updateHeaderDept();
    activeFilter = activePartition;
    renderHome();
    showToast((ui === "ar" ? "تم الانتقال إلى: " : "Partition: ") + getPartitionName(activePartition), "⚡");
  }

  function getPartitionName(deptId) {
    const info = DEPT_INFO[deptId] || DEPT_INFO.all;
    return ui === "ar" ? info.ar : info.en;
  }

  function updateHeaderDept() {
    const iconEl = $("#headerDeptIcon");
    const labelEl = $("#headerDeptLabel");
    const info = DEPT_INFO[activePartition] || DEPT_INFO.all;
    if (iconEl) iconEl.textContent = info.icon;
    if (labelEl) labelEl.textContent = ui === "ar" ? info.ar : info.en;

    $$(".dept-opt-btn").forEach(btn => {
      const d = btn.getAttribute("data-dept");
      btn.classList.toggle("active", d === activePartition);
    });
  }

  function initDepartmentSwitcher() {
    const btn = $("#deptSwitcherBtn");
    const menu = $("#deptDropdownMenu");
    const bylawsBtn = $("#headerBylawsBtn");

    if (bylawsBtn) {
      bylawsBtn.onclick = openBylawsModal;
    }

    const accBtn = $("#headerAccountingBtn");
    if (accBtn) {
      accBtn.onclick = openAccountingToolsModal;
    }

    if (btn && menu) {
      btn.onclick = (e) => {
        e.stopPropagation();
        menu.hidden = !menu.hidden;
        btn.setAttribute("aria-expanded", String(!menu.hidden));
      };

      $$(".dept-opt-btn", menu).forEach(opt => {
        opt.onclick = (e) => {
          e.stopPropagation();
          const dept = opt.getAttribute("data-dept");
          menu.hidden = true;
          btn.setAttribute("aria-expanded", "false");
          setPartition(dept);
        };
      });

      document.addEventListener("click", () => {
        if (!menu.hidden) {
          menu.hidden = true;
          btn.setAttribute("aria-expanded", "false");
        }
      });
    }

    updateHeaderDept();
  }

  /* ---------- Home View with Interactive Search & Filters ---------- */
  function renderHome() {
    document.title = ui === "ar"
      ? "شركة سفن هاندز للخدمات الهندسية والمقاولات | SEVEN HANDS"
      : "SEVEN HANDS For Engineering Services & Construction";
    $("#editor").hidden = true;
    $("#home").hidden = false;
    $("#homeBtn").hidden = true;

    const h = $("#home");
    const allDocs = Object.values(store.all()).sort((a, b) => b.updated - a.updated);
    const deptInfo = DEPT_INFO[activePartition] || DEPT_INFO.all;

    // Filter categories list
    const categories = [
      { id: "all", label: t("all"), icon: "⚡" },
      { id: "accounting", label: t("deptAccounting"), icon: "💰" },
      { id: "hr", label: t("deptHr"), icon: "👥" },
      { id: "it", label: t("deptIt"), icon: "💻" },
      { id: "procurement", label: t("deptProcurement"), icon: "🛒" },
      { id: "secretary", label: t("deptSecretary"), icon: "📋" },
      { id: "engineering", label: t("deptEngineering"), icon: "📐" },
      { id: "management", label: t("deptManagement"), icon: "🏢" },
      { id: "saved", label: t("catSaved"), icon: "💾" },
      { id: "blank", label: t("deptBlank"), icon: "📄" }
    ];

    h.innerHTML = `
      ${activePartition !== "all" ? `
        <!-- Department Partition Workspace Card -->
        <div class="partition-card">
          <div class="partition-head">
            <div>
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap">
                <span class="partition-badge">قسم معتمد · SEVEN HANDS</span>
                <span class="partition-badge" style="background:rgba(255,255,255,0.15);border-color:rgba(255,255,255,0.3)">${deptInfo.managerAr}</span>
              </div>
              <h2 class="partition-title">${deptInfo.icon} ${ui === "ar" ? deptInfo.ar : deptInfo.en}</h2>
              <p class="partition-desc">${ui === "ar" ? deptInfo.descAr : deptInfo.descEn}</p>
            </div>
            <button class="part-act-btn" id="switchAllPartBtn" title="عرض كافة الأقسام">
              <span>🔄</span>
              <span>${ui === "ar" ? "عرض كل الأقسام" : "View All"}</span>
            </button>
          </div>
          ${deptInfo.quickActions && deptInfo.quickActions.length ? `
            <div class="partition-actions">
              <small style="font-weight:700;color:#b8f4fc;margin-inline-end:6px">إجراءات ونماذج سريعة:</small>
              ${deptInfo.quickActions.map((qa, i) => `
                <button class="part-act-btn ${qa.highlight ? "highlight" : ""}" data-qa-idx="${i}">
                  <span>${qa.label}</span>
                </button>
              `).join("")}
            </div>
          ` : ""}
        </div>
      ` : `
        <!-- Stats Dashboard -->
        <div class="stats-bar">
          <div class="stat-card">
            <div class="stat-icon">📄</div>
            <div class="stat-info">
              <span class="stat-val">${SH.TEMPLATES.length}</span>
              <span class="stat-lbl">${t("statTemplates")}</span>
            </div>
          </div>
          <div class="stat-card" id="savedStatsCard" role="button" tabindex="0" title="${t("registry")}">
            <div class="stat-icon">💾</div>
            <div class="stat-info">
              <span class="stat-val">${allDocs.length}</span>
              <span class="stat-lbl">${t("statSaved")} (انقر للسجل)</span>
            </div>
          </div>
          <div class="stat-card" id="bylawsStatsCard" role="button" tabindex="0" title="${t("bylawsTitle")}">
            <div class="stat-icon">📖</div>
            <div class="stat-info">
              <span class="stat-val">F-08/10</span>
              <span class="stat-lbl">${t("bylawsLabel")} (معتمدة)</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🚀</div>
            <div class="stat-info">
              <span class="stat-val">Excel · Word · PDF</span>
              <span class="stat-lbl">${t("statExport")}</span>
            </div>
          </div>
        </div>
      `}

      <!-- Search & Interactive Filter Pills -->
      <div class="search-filter-wrap">
        <div class="search-row">
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input type="text" id="tplSearch" value="${esc(searchQuery)}" placeholder="${t("searchPlaceholder")}">
            <button id="clearSearchBtn" class="clear-search-btn" ${searchQuery ? "" : "hidden"}>×</button>
          </div>
          <button class="btn accent" id="homeRegistryBtn" style="margin:0" title="${t("registryDesc")}">
            📑 ${t("registryShort")}
          </button>
          <label class="btn ghost" style="margin:0">
            📁 ${t("imp")}
            <input type="file" id="impFile" accept=".json,application/json" hidden>
          </label>
        </div>

        <div class="filter-pills" id="filterPills"></div>
        <div class="filter-results-info">
          <span id="resultsCount"></span>
          <span class="muted">${t("tip")}</span>
        </div>
      </div>

      <!-- Templates Section -->
      <section id="templatesSection">
        <h2>${t("newFrom")}</h2>
        <div class="grid" id="tgrid"></div>
        <div id="noTemplatesMsg" class="muted" style="padding:20px;text-align:center" hidden>
          ${t("noResults")} <button class="btn small" id="resetSearchBtn">${t("clearSearch")}</button>
        </div>
      </section>

      <!-- Saved Documents Section -->
      <section id="savedSection" style="margin-top:28px">
        <div class="row-between">
          <h2>${t("saved")} (${allDocs.length})</h2>
          <button class="btn ghost small" id="viewRegistryTableBtn">📑 ${t("registry")}</button>
        </div>
        <div id="saved" class="list"></div>
      </section>
    `;

    // Hook up switch all button
    const swAll = $("#switchAllPartBtn");
    if (swAll) swAll.onclick = () => setPartition("all");

    // Hook up partition quick actions
    if (deptInfo.quickActions) {
      $$("[data-qa-idx]", h).forEach(b => {
        b.onclick = () => {
          const idx = parseInt(b.getAttribute("data-qa-idx"), 10);
          const qa = deptInfo.quickActions[idx];
          if (qa) {
            if (qa.action) {
              qa.action();
            } else if (qa.tpl) {
              startTemplateById(qa.tpl);
            }
          }
        };
      });
    }

    // Render filter pills
    const pillsContainer = $("#filterPills");
    categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = "pill-btn" + (activeFilter === cat.id ? " active" : "");
      let count = 0;
      if (cat.id === "all") count = SH.TEMPLATES.length;
      else if (cat.id === "saved") count = allDocs.length;
      else count = SH.TEMPLATES.filter(tp => (tp.dept === cat.id || tp.cat === cat.id)).length;

      btn.innerHTML = `<span>${cat.label}</span><span class="pill-count">${count}</span>`;
      btn.onclick = () => {
        activeFilter = cat.id;
        $$(".pill-btn", pillsContainer).forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        applyFilter();
        if (cat.id === "saved") {
          $("#savedSection").scrollIntoView({ behavior: "smooth" });
        }
      };
      pillsContainer.appendChild(btn);
    });

    const sStatsCard = $("#savedStatsCard");
    if (sStatsCard) sStatsCard.onclick = openRegistryModal;
    const bStatsCard = $("#bylawsStatsCard");
    if (bStatsCard) bStatsCard.onclick = openBylawsModal;
    const hRegBtn = $("#homeRegistryBtn");
    if (hRegBtn) hRegBtn.onclick = openRegistryModal;
    const vRegBtn = $("#viewRegistryTableBtn");
    if (vRegBtn) vRegBtn.onclick = openRegistryModal;

    // Search events
    const sInput = $("#tplSearch");
    const clearBtn = $("#clearSearchBtn");
    sInput.oninput = (e) => {
      searchQuery = e.target.value.trim();
      clearBtn.hidden = !searchQuery;
      applyFilter();
    };
    clearBtn.onclick = () => {
      sInput.value = "";
      searchQuery = "";
      clearBtn.hidden = true;
      applyFilter();
      sInput.focus();
    };

    const resetBtn = $("#resetSearchBtn");
    if (resetBtn) {
      resetBtn.onclick = () => {
        sInput.value = "";
        searchQuery = "";
        activeFilter = "all";
        renderHome();
      };
    }

    // Import file
    $("#impFile").onchange = (e) => {
      const f = e.target.files[0];
      if (!f) return;
      const rd = new FileReader();
      rd.onload = () => {
        try {
          const d = JSON.parse(rd.result);
          d.id = uid();
          d.name = d.name || d.title;
          if (!d.docNumber) {
            const allDocs = Object.values(store.all());
            d.docNumber = `SH-DOC-2026-${String(allDocs.length + 1).padStart(4, "0")}`;
          }
          if (!d.status) d.status = "draft";
          store.put(d);
          showToast(t("savedOk"), "✓");
          openDoc(d);
        } catch (x) {
          alert("JSON format error");
        }
      };
      rd.readAsText(f);
    };

    function applyFilter() {
      const q = searchQuery.toLowerCase();
      const grid = $("#tgrid");
      grid.innerHTML = "";

      let visibleCount = 0;
      SH.TEMPLATES.forEach((tp) => {
        const matchesCategory = (activeFilter === "all") || (tp.dept === activeFilter) || (tp.cat === activeFilter);
        const textTarget = (tp.ar + " " + tp.en + " " + (tp.desc || "") + " " + (tp.dept || "") + " " + (tp.prefix || "")).toLowerCase();
        const matchesSearch = !q || textTarget.includes(q);

        if (matchesCategory && matchesSearch && activeFilter !== "saved") {
          visibleCount++;
          const b = document.createElement("button");
          b.className = "tcard";
          const deptKey = "dept" + (tp.dept ? tp.dept.charAt(0).toUpperCase() + tp.dept.slice(1) : "It");
          const deptName = t(deptKey) || tp.dept || "";
          b.innerHTML = `
            <div class="tcard-top">
              <span class="ti">${tp.icon}</span>
              <span class="card-dept-tag">${deptName}</span>
              <span class="doc-code-badge">${esc(tp.prefix || "SH-DOC")}</span>
            </div>
            <b>${esc(ui === "ar" ? tp.ar : tp.en)}</b>
            <small>${esc(tp.desc || "")}</small>
            <div class="tcard-footer">
              <span>${t("startDoc")}</span>
              <span style="font-size:16px">➔</span>
            </div>
          `;
          b.onclick = () => {
            cur = tp.make();
            cur.id = uid();
            cur.name = ui === "ar" ? tp.ar : tp.en;
            cur.tpl = tp.id;
            cur.dept = tp.dept || "it";
            if (!cur.docNumber) {
              const allDocs = Object.values(store.all());
              const nextSeq = allDocs.length + 1;
              cur.docNumber = `${tp.prefix || "SH-DOC"}-2026-${String(nextSeq).padStart(4, "0")}`;
            }
            if (!cur.status) cur.status = "draft";
            store.put(cur);
            showToast(t("savedOk"), "💾");
            openDoc(cur);
          };
          grid.appendChild(b);
        }
      });

      $("#noTemplatesMsg").hidden = visibleCount > 0 || activeFilter === "saved";
      $("#templatesSection").hidden = activeFilter === "saved";
      $("#resultsCount").textContent = `${t("showing")} ${visibleCount} ${t("of")} ${SH.TEMPLATES.length} ${t("templates")}`;

      // Filter saved documents list
      const s = $("#saved");
      s.innerHTML = "";
      const filteredDocs = allDocs.filter(d => {
        if (!q) return true;
        const dt = ((d.name || d.title || "") + " " + (d.docNumber || "") + " " + (d.dept || "")).toLowerCase();
        return dt.includes(q);
      });

      if (!filteredDocs.length) {
        s.innerHTML = `<p class="muted">${q ? t("noResults") : t("none")}</p>`;
      } else {
        filteredDocs.forEach((d) => {
          const r = document.createElement("div");
          r.className = "srow";
          const dDate = new Date(d.updated).toLocaleString(ui === "ar" ? "ar-EG" : "en-GB");
          const statusClass = d.status === "approved" ? "approved" : d.status === "review" ? "review" : "draft";
          const statusName = d.status === "approved" ? t("statusApproved") : d.status === "review" ? t("statusReview") : t("statusDraft");
          const deptKey = "dept" + (d.dept ? d.dept.charAt(0).toUpperCase() + d.dept.slice(1) : "It");
          const deptName = t(deptKey) || d.dept || "IT";

          r.innerHTML = `
            <div class="srow-meta">
              <span class="srow-icon">📋</span>
              <div>
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;flex-wrap:wrap">
                  <span class="doc-code-badge">${esc(d.docNumber || "SH-DOC")}</span>
                  <span class="doc-status-badge doc-status-${statusClass}">${statusName}</span>
                  <span class="card-dept-tag" style="margin:0">${deptName}</span>
                </div>
                <b class="srow-title"></b>
                <small>${t("date")}: ${dDate}</small>
              </div>
            </div>
            <div class="acts">
              <button class="btn open-btn">${t("open")}</button>
              <button class="btn ghost copy-btn" title="${t("copy")}">📋</button>
              <button class="btn danger del-btn" title="${t("del")}">🗑️</button>
            </div>
          `;
          $(".srow-title", r).textContent = d.name || d.title;
          $(".open-btn", r).onclick = () => openDoc(d);
          $(".copy-btn", r).onclick = () => {
            const dup = clone(d);
            dup.id = uid();
            dup.name = (d.name || d.title) + (ui === "ar" ? " (نسخة)" : " (copy)");
            const allDocs = Object.values(store.all());
            dup.docNumber = (d.docNumber || "SH-DOC").replace(/\d+$/, "") + String(allDocs.length + 1).padStart(4, "0");
            dup.status = "draft";
            store.put(dup);
            showToast(ui === "ar" ? "تم نسخ المستند بنجاح" : "Document duplicated", "📋");
            renderHome();
          };
          $(".del-btn", r).onclick = () => {
            if (confirm(t("confirm"))) {
              store.del(d.id);
              showToast(ui === "ar" ? "تم حذف الورقة" : "Document deleted", "🗑️");
              renderHome();
            }
          };
          s.appendChild(r);
        });
      }
    }

    applyFilter();
  }

  /* ---------- Editor Implementation ---------- */
  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(flushSave, 450);
  }

  function flushSave() {
    if (!cur) return;
    clearTimeout(saveTimer);
    if (store.put(cur)) {
      const s = $("#saveState");
      if (s) {
        s.textContent = t("savedOk");
        s.style.color = "var(--cyan)";
        setTimeout(() => {
          if (s) {
            s.textContent = t("autosave");
            s.style.color = "";
          }
        }, 1400);
      }
    }
  }

  function editable(el, get, set, multiline) {
    el.contentEditable = "true";
    el.spellcheck = false;
    el.addEventListener("input", () => {
      set(el.innerText.replace(/ /g, " "));
      scheduleSave();
    });
    el.addEventListener("paste", (e) => {
      e.preventDefault();
      const tx = (e.clipboardData || window.clipboardData).getData("text/plain");
      document.execCommand("insertText", false, multiline ? tx : tx.replace(/\s*\n\s*/g, " "));
    });
    if (!multiline) {
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const cells = $$("td[contenteditable]", el.closest("tbody") || document);
          const i = cells.indexOf(el);
          const cols = el.parentElement.children.length;
          const nx = cells[i + cols - 1];
          if (nx && nx.closest("tr") !== el.closest("tr")) nx.focus();
        }
      });
    }
    el.textContent = get();
    return el;
  }

  function renderEditor() {
    document.title = (cur.name || cur.title || (ui === "ar" ? "وثيقة رسمية" : "Document")) +
      (ui === "ar" ? " | سفن هاندز للخدمات الهندسية والمقاولات" : " | SEVEN HANDS");
    $("#home").hidden = true;
    $("#editor").hidden = false;
    $("#homeBtn").hidden = false;

    const ed = $("#editor");
    const rtl = cur.lang === "ar";

    ed.innerHTML = `
      <div class="toolbar no-print">
        <!-- Prominent Back Navigation & Breadcrumb -->
        <div class="editor-nav-row">
          <nav class="breadcrumb">
            <a class="bc-link" id="bcHomeLink">🏠 <span>${t("home")}</span></a>
            <span class="bc-sep">/</span>
            <span class="bc-current" id="bcCurrentDoc">${esc(cur.name || cur.title)}</span>
          </nav>
          <div class="acts">
            <button class="btn back-nav-btn small" id="edToolbarBackBtn">
              <span class="back-arrow-icon">←</span>
              <span>${t("backToDocs")}</span>
            </button>
            <button class="btn ghost small" id="shareDocWaBtn" title="${t("shareWa")}">
              💬 <span>${t("shareWa")}</span>
            </button>
          </div>
        </div>

        <div class="tgroup">
          <label>${t("name")}<input id="fName" value=""></label>
          <label>${t("docNumber")}<input id="fDocNum" value="" placeholder="SH-IT-PR-2026-0001" style="width:160px;font-family:monospace;font-weight:700"></label>
          <label>${t("docStatus")}<select id="fStatus">
            <option value="draft">${t("statusDraft")}</option>
            <option value="review">${t("statusReview")}</option>
            <option value="approved">${t("statusApproved")}</option>
          </select></label>
          <label>${t("docDept")}<select id="fDept">
            <option value="it">${t("deptIt")}</option>
            <option value="procurement">${t("deptProcurement")}</option>
            <option value="hr">${t("deptHr")}</option>
            <option value="secretary">${t("deptSecretary")}</option>
            <option value="engineering">${t("deptEngineering")}</option>
            <option value="management">${t("deptManagement")}</option>
            <option value="blank">${t("deptBlank")}</option>
          </select></label>
          <label>${t("dir")}<select id="fLang"><option value="ar">العربية (RTL)</option><option value="en">English (LTR)</option></select></label>
          <label>${t("orient")}<select id="fOr"><option value="landscape">${t("land")}</option><option value="portrait">${t("port")}</option></select></label>
          <label class="chk"><input type="checkbox" id="fLogo"> ${t("logo")}</label>
        </div>

        <div class="tgroup">
          <div class="dd">
            <button class="btn" id="addBtn">${t("add")} ▾</button>
            <div class="menu" id="addMenu" hidden>
              <button data-a="heading">📌 ${t("heading")}</button>
              <button data-a="text">📄 ${t("text")}</button>
              <button data-a="table">📊 ${t("table")}</button>
              <button data-a="box">💡 ${t("note")}</button>
              <button data-a="sign">✍️ ${t("sign")}</button>
            </div>
          </div>

          <button class="btn primary" id="saveBtn">${t("save")}</button>
          <button class="btn" id="copyBtn">${t("copy")}</button>

          <div class="dd">
            <button class="btn accent" id="dlBtn">${t("dl")} ▾</button>
            <div class="menu" id="dlMenu" hidden>
              <button data-d="docx">📘 ${t("word")}</button>
              <button data-d="xlsx">📗 ${t("excel")}</button>
              <button data-d="pdf">📕 ${t("pdf")}</button>
              <button data-d="print">🖨️ ${t("print")}</button>
              <button data-d="json">💾 ${t("json")}</button>
              <button data-d="wa">💬 ${t("shareWa")}</button>
            </div>
          </div>

          <span class="zoom">
            <button class="btn" id="zOut">−</button>
            <button class="btn ghost small zoom-val" id="zReset" title="100%">${Math.round(zoom * 100)}%</button>
            <button class="btn" id="zIn">+</button>
          </span>
        </div>

        <div class="tip">
          <span class="save-indicator" id="saveState">● ${t("autosave")}</span> · ${t("tip")}
        </div>
      </div>

      <div class="stage">
        <div id="page" class="page ${cur.orient}" dir="${rtl ? "rtl" : "ltr"}"></div>
      </div>
    `;

    // Bind Back Navigation
    $("#bcHomeLink").onclick = goHome;
    $("#edToolbarBackBtn").onclick = goHome;

    $("#fName").value = cur.name || "";
    $("#fDocNum").value = cur.docNumber || "";
    $("#fStatus").value = cur.status || "draft";
    $("#fDept").value = cur.dept || "it";
    $("#fLang").value = cur.lang;
    $("#fOr").value = cur.orient;
    $("#fLogo").checked = !!cur.logo;

    $("#fName").oninput = (e) => {
      cur.name = e.target.value;
      $("#bcCurrentDoc").textContent = cur.name || cur.title;
      scheduleSave();
      updateWaLinks();
    };
    $("#fDocNum").oninput = (e) => {
      cur.docNumber = e.target.value.trim();
      scheduleSave();
      renderPage();
      updateWaLinks();
    };
    $("#fStatus").onchange = (e) => {
      cur.status = e.target.value;
      scheduleSave();
      renderPage();
      showToast(ui === "ar" ? "تم تحديث حالة المستند" : "Status updated", "✓");
    };
    $("#fDept").onchange = (e) => {
      cur.dept = e.target.value;
      scheduleSave();
      renderPage();
    };
    $("#fLang").onchange = (e) => { cur.lang = e.target.value; flushSave(); renderEditor(); };
    $("#fOr").onchange = (e) => { cur.orient = e.target.value; flushSave(); renderEditor(); };
    $("#fLogo").onchange = (e) => { cur.logo = e.target.checked; flushSave(); renderEditor(); };

    // Menus
    const menu = (btn, m) => {
      $(btn).onclick = (e) => {
        e.stopPropagation();
        const h = $(m).hidden;
        $$(".menu").forEach((x) => (x.hidden = true));
        $(m).hidden = !h;
      };
    };
    menu("#addBtn", "#addMenu");
    menu("#dlBtn", "#dlMenu");

    $$("#addMenu button").forEach((b) => (b.onclick = () => { addBlock(b.dataset.a); }));
    $$("#dlMenu button").forEach((b) => (b.onclick = () => { download(b.dataset.d); $("#dlMenu").hidden = true; }));

    $("#saveBtn").onclick = () => {
      flushSave();
      showToast(t("savedOk"), "💾");
    };

    $("#copyBtn").onclick = () => {
      const c = clone(cur);
      c.id = uid();
      c.name = (cur.name || cur.title) + (ui === "ar" ? " (نسخة)" : " (copy)");
      const allDocs = Object.values(store.all());
      c.docNumber = (cur.docNumber || "SH-DOC").replace(/\d+$/, "") + String(allDocs.length + 1).padStart(4, "0");
      c.status = "draft";
      store.put(c);
      cur = c;
      location.hash = "#" + c.id;
      showToast(ui === "ar" ? "تم إنشاء نسخة من المستند" : "Saved as a copy", "📋");
      renderEditor();
    };

    $("#shareDocWaBtn").onclick = () => download("wa");

    // Zoom
    $("#zIn").onclick = () => setZoom(zoom + 0.1);
    $("#zOut").onclick = () => setZoom(zoom - 0.1);
    $("#zReset").onclick = () => setZoom(1);

    renderPage();
    setZoom(zoom);
    updateWaLinks();
  }

  function setZoom(z) {
    zoom = Math.max(0.4, Math.min(1.6, z));
    const p = $("#page");
    if (p) p.style.zoom = zoom;
    const zv = $("#zReset");
    if (zv) zv.textContent = Math.round(zoom * 100) + "%";
  }

  function renderPage() {
    const p = $("#page");
    p.innerHTML = "";
    const rtl = cur.lang === "ar";

    // Header
    const head = document.createElement("div");
    head.className = "ph";
    const statusClass = cur.status === "approved" ? "approved" : cur.status === "review" ? "review" : "draft";
    const statusName = cur.status === "approved" ? t("statusApproved") : cur.status === "review" ? t("statusReview") : t("statusDraft");
    const deptKey = "dept" + (cur.dept ? cur.dept.charAt(0).toUpperCase() + cur.dept.slice(1) : "It");
    const deptName = t(deptKey) || cur.dept || "IT";

    head.innerHTML = `
      <div class="ph-text">
        <div class="ph-meta-bar" style="display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap">
          <span class="doc-code-badge">${esc(cur.docNumber || "SH-DOC-2026-0001")}</span>
          <span class="doc-status-badge doc-status-${statusClass}">${statusName}</span>
          <span class="card-dept-tag" style="margin:0">${deptName}</span>
        </div>
        <h1 class="ph-title"></h1>
        <p class="ph-sub"></p>
      </div>
      ${cur.logo ? '<img class="ph-logo" src="logo.png" alt="SEVEN HANDS Engineering Services & Construction">' : ""}
    `;
    editable($(".ph-title", head), () => cur.title, (v) => { cur.title = v; $("#bcCurrentDoc").textContent = cur.name || cur.title; }, false);
    editable($(".ph-sub", head), () => cur.subtitle || "", (v) => (cur.subtitle = v), false);
    p.appendChild(head);

    // Metadata Fields
    const meta = document.createElement("div");
    meta.className = "meta";
    cur.meta.forEach((m, i) => {
      const d = document.createElement("div");
      d.className = "mf";
      d.innerHTML = `<span class="ml"></span><span class="mv"></span><button class="x no-print" title="${t("rm")}">×</button>`;
      editable($(".ml", d), () => m.l, (v) => (m.l = v), false);
      editable($(".mv", d), () => m.v, (v) => (m.v = v), false);
      $(".x", d).onclick = () => { cur.meta.splice(i, 1); scheduleSave(); renderPage(); };
      meta.appendChild(d);
    });
    const ma = document.createElement("button");
    ma.className = "btn ghost no-print small";
    ma.textContent = t("metaAdd");
    ma.onclick = () => {
      cur.meta.push({ l: ui === "ar" ? "حقل" : "Field", v: "" });
      scheduleSave();
      renderPage();
    };
    meta.appendChild(ma);
    p.appendChild(meta);

    // Blocks
    cur.blocks.forEach((b, i) => p.appendChild(renderBlock(b, i)));

    // Footer
    const ft = document.createElement("div");
    ft.className = "pfoot";
    ft.textContent = "SEVEN HANDS FOR ENGINEERING SERVICES & CONSTRUCTION · IT DEPARTMENT";
    p.appendChild(ft);

    // Print Size Style
    let ps = $("#printStyle");
    if (!ps) {
      ps = document.createElement("style");
      ps.id = "printStyle";
      document.head.appendChild(ps);
    }
    ps.textContent = `@page{size:A4 ${cur.orient};margin:8mm}`;
  }

  function tools(i, extra) {
    const d = document.createElement("div");
    d.className = "btools no-print";
    d.innerHTML = `${extra || ""}<button data-m="up" title="${t("up")}">↑</button><button data-m="down" title="${t("down")}">↓</button><button data-m="rm" class="danger" title="${t("rm")}">✕</button>`;
    d.addEventListener("click", (e) => {
      const m = e.target.dataset && e.target.dataset.m;
      if (!m) return;
      const a = cur.blocks;
      if (m === "up" && i > 0) [a[i - 1], a[i]] = [a[i], a[i - 1]];
      else if (m === "down" && i < a.length - 1) [a[i + 1], a[i]] = [a[i], a[i + 1]];
      else if (m === "rm") a.splice(i, 1);
      else return;
      scheduleSave();
      renderPage();
    });
    return d;
  }

  function renderBlock(b, i) {
    const w = document.createElement("div");
    w.className = "blk blk-" + b.type;
    w.dataset.i = i;

    if (b.type === "heading") {
      const h = document.createElement("h2");
      editable(h, () => b.text, (v) => (b.text = v), false);
      w.append(tools(i), h);
    } else if (b.type === "text") {
      const p = document.createElement("div");
      p.className = "txt";
      editable(p, () => b.text, (v) => (b.text = v), true);
      w.append(tools(i), p);
    } else if (b.type === "box") {
      const p = document.createElement("div");
      p.className = "box " + (b.tone || "info");
      editable(p, () => b.text, (v) => (b.text = v), true);
      w.append(tools(i, `<button data-m="tone" class="tone">◐</button>`), p);
      $(".tone", w).onclick = () => {
        b.tone = b.tone === "warn" ? "info" : "warn";
        scheduleSave();
        renderPage();
      };
    } else if (b.type === "sign") {
      const s = document.createElement("div");
      s.className = "signs";
      b.items.forEach((it, k) => {
        const d = document.createElement("div");
        d.className = "sg";
        editable(d, () => it, (v) => (b.items[k] = v), false);
        s.appendChild(d);
      });
      const add = document.createElement("button");
      add.className = "btn ghost small no-print";
      add.textContent = "+";
      add.onclick = () => {
        b.items.push(ui === "ar" ? "توقيع: ____________" : "Signature: ____________");
        scheduleSave();
        renderPage();
      };
      const rem = document.createElement("button");
      rem.className = "btn ghost small no-print";
      rem.textContent = "−";
      rem.onclick = () => {
        if (b.items.length > 1) {
          b.items.pop();
          scheduleSave();
          renderPage();
        }
      };
      w.append(tools(i), s, add, rem);
    } else if (b.type === "table") {
      w.append(tools(i, `<button data-m="ar">${t("addRow")}</button><button data-m="ac">${t("addCol")}</button><button data-m="cols">${t("cols")}</button>`), tableEl(b));
      const tl = $(".btools", w);
      $('[data-m="ar"]', tl).onclick = (e) => {
        e.stopPropagation();
        b.rows.push(b.cols.map(() => ""));
        scheduleSave();
        renderPage();
      };
      $('[data-m="ac"]', tl).onclick = (e) => {
        e.stopPropagation();
        b.cols.push({ key: "c" + (b.cols.length + 1), label: ui === "ar" ? "عمود" : "Column", w: 1, kind: "text", expr: "" });
        b.rows.forEach((r) => r.push(""));
        scheduleSave();
        renderPage();
      };
      $('[data-m="cols"]', tl).onclick = (e) => {
        e.stopPropagation();
        colDialog(b);
      };
    }
    return w;
  }

  function tableEl(b) {
    const wrap = document.createElement("div");
    wrap.className = "tw";
    const tb = document.createElement("table");
    const sum = b.cols.reduce((a, c) => a + (c.w || 1), 0);

    tb.innerHTML = `<colgroup>${b.cols.map((c) => `<col style="width:${((c.w || 1) / sum * 100).toFixed(2)}%">`).join("")}<col class="no-print" style="width:26px"></colgroup>`;
    const th = document.createElement("thead"), tr = document.createElement("tr");
    b.cols.forEach((c) => {
      const h = document.createElement("th");
      editable(h, () => c.label, (v) => (c.label = v), false);
      tr.appendChild(h);
    });
    tr.appendChild(Object.assign(document.createElement("th"), { className: "no-print ghc" }));
    th.appendChild(tr);
    tb.appendChild(th);

    const body = document.createElement("tbody");
    b.rows.forEach((r, ri) => {
      const row = document.createElement("tr");
      b.cols.forEach((c, ci) => {
        const td = document.createElement("td");
        td.className = c.kind;
        if (c.kind === "calc") {
          td.textContent = fmtNum(calcCell(b, r, ci, 0));
        } else {
          editable(td, () => r[ci] || "", (v) => {
            r[ci] = v;
            recalc(b, tb);
          }, false);
        }
        row.appendChild(td);
      });
      const x = document.createElement("td");
      x.className = "no-print rx";
      x.innerHTML = `<button class="x" title="${t("delRow")}">×</button>`;
      x.firstChild.onclick = () => {
        b.rows.splice(ri, 1);
        scheduleSave();
        renderPage();
      };
      row.appendChild(x);
      body.appendChild(row);
    });
    tb.appendChild(body);

    if (b.total && b.cols.some((c) => c.kind !== "text")) {
      const f = document.createElement("tfoot");
      const fr = document.createElement("tr");
      let first = true;
      b.cols.forEach((c, ci) => {
        const td = document.createElement("td");
        td.className = "tot " + c.kind;
        if (c.kind === "text" && first) {
          td.textContent = b.totalLabel || t("total");
          first = false;
          td.contentEditable = "true";
          td.addEventListener("input", () => {
            b.totalLabel = td.innerText;
            scheduleSave();
          });
        } else if (c.kind !== "text") {
          td.textContent = fmtNum(colTotal(b, ci));
        }
        fr.appendChild(td);
      });
      fr.appendChild(Object.assign(document.createElement("td"), { className: "no-print" }));
      f.appendChild(fr);
      tb.appendChild(f);
    }
    wrap.appendChild(tb);
    return wrap;
  }

  /* Live reactive calculations with animated flash highlight */
  function recalc(b, tb) {
    const rows = $$("tbody tr", tb);
    rows.forEach((tr, ri) => b.cols.forEach((c, ci) => {
      if (c.kind === "calc") {
        const cell = tr.children[ci];
        const oldVal = cell.textContent;
        const newVal = fmtNum(calcCell(b, b.rows[ri], ci, 0));
        if (oldVal !== newVal) {
          cell.textContent = newVal;
          cell.classList.remove("calc-updated");
          void cell.offsetWidth;
          cell.classList.add("calc-updated");
        }
      }
    }));
    const f = $("tfoot tr", tb);
    if (f) {
      b.cols.forEach((c, ci) => {
        if (c.kind !== "text") {
          const cell = f.children[ci];
          const oldVal = cell.textContent;
          const newVal = fmtNum(colTotal(b, ci));
          if (oldVal !== newVal) {
            cell.textContent = newVal;
            cell.classList.remove("calc-updated");
            void cell.offsetWidth;
            cell.classList.add("calc-updated");
          }
        }
      });
    }
  }

  function addBlock(kind) {
    const ar = cur.lang === "ar";
    const nb = {
      heading: { type: "heading", text: ar ? "عنوان جديد" : "New heading" },
      text: { type: "text", text: ar ? "اكتب هنا..." : "Write here..." },
      box: { type: "box", tone: "info", text: ar ? "ملاحظة..." : "Note..." },
      sign: {
        type: "sign",
        items: ar
          ? ["إعداد: م. صلاح، مهندس علوم حاسب", "مراجعة: م. عصام، مدير تكنولوجيا المعلومات", "اعتماد: الإدارة العامة / المدير التنفيذي"]
          : ["Prepared by: Eng. Salah, Computer Science Engineer", "Reviewed by: Eng. Esam, IT Manager", "Approved by: General Management"]
      },
      table: {
        type: "table",
        total: false,
        totalLabel: "",
        cols: [
          { key: "n", label: ar ? "م" : "#", w: 0.5, kind: "text", expr: "" },
          { key: "item", label: ar ? "البند" : "Item", w: 3, kind: "text", expr: "" },
          { key: "qty", label: ar ? "العدد" : "Qty", w: 0.8, kind: "num", expr: "" },
          { key: "price", label: ar ? "السعر" : "Price", w: 1, kind: "num", expr: "" },
          { key: "tot", label: ar ? "الإجمالي" : "Total", w: 1.1, kind: "calc", expr: "qty*price" }
        ],
        rows: [["1", "", "", "", ""], ["2", "", "", "", ""], ["3", "", "", "", ""]]
      }
    }[kind];

    cur.blocks.push(nb);
    $("#addMenu").hidden = true;
    scheduleSave();
    renderPage();
    const p = $("#page");
    if (p && p.lastElementChild && p.lastElementChild.previousElementSibling) {
      p.lastElementChild.previousElementSibling.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function colDialog(b) {
    const m = $("#modal");
    m.hidden = false;
    const rowsHtml = b.cols.map((c, i) => `
      <tr data-i="${i}">
        <td><input class="f-label" value="${esc(c.label)}"></td>
        <td><input class="f-key" value="${esc(c.key)}" size="7"></td>
        <td>
          <select class="f-kind">
            <option value="text">${t("kText")}</option>
            <option value="num">${t("kNum")}</option>
            <option value="calc">${t("kCalc")}</option>
          </select>
        </td>
        <td><input class="f-expr" value="${esc(c.expr || "")}" size="16"></td>
        <td><input class="f-w" type="number" step="0.1" min="0.2" value="${c.w || 1}" style="width:60px"></td>
        <td><button class="btn danger f-del">${t("delCol")}</button></td>
      </tr>
    `).join("");

    m.innerHTML = `
      <div class="dlg">
        <h3>${t("cols")}</h3>
        <p class="muted">${t("hint")}</p>
        <div class="dscroll">
          <table class="ctab">
            <thead>
              <tr>
                <th>${t("label")}</th>
                <th>${t("key")}</th>
                <th>${t("kind")}</th>
                <th>${t("expr")}</th>
                <th>${t("width")}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </div>
        <label class="chk"><input type="checkbox" id="f-total" ${b.total ? "checked" : ""}> ${t("showTotal")}</label>
        <div class="acts">
          <button class="btn primary" id="dOk">${t("apply")}</button>
          <button class="btn" id="dNo">${t("cancel")}</button>
        </div>
      </div>
    `;

    $$(".ctab tbody tr", m).forEach((tr, i) => { $(".f-kind", tr).value = b.cols[i].kind; });
    $$(".f-del", m).forEach((bt) => (bt.onclick = () => {
      const i = +bt.closest("tr").dataset.i;
      if (b.cols.length > 1) {
        b.cols.splice(i, 1);
        b.rows.forEach((r) => r.splice(i, 1));
        m.hidden = true;
        scheduleSave();
        renderPage();
      }
    }));
    $("#dNo").onclick = () => (m.hidden = true);
    $("#dOk").onclick = () => {
      $$(".ctab tbody tr", m).forEach((tr, i) => {
        const c = b.cols[i];
        c.label = $(".f-label", tr).value;
        c.key = ($(".f-key", tr).value || "c" + i).replace(/[^A-Za-z0-9_]/g, "") || "c" + i;
        c.kind = $(".f-kind", tr).value;
        c.expr = $(".f-expr", tr).value.trim();
        c.w = parseFloat($(".f-w", tr).value) || 1;
      });
      b.total = $("#f-total").checked;
      m.hidden = true;
      scheduleSave();
      renderPage();
    };
  }

  /* ---------- Downloads & WhatsApp Sharing ---------- */
  function fileBase() {
    return (cur.name || cur.title || "document").replace(/[\\/:*?"<>|]+/g, "-").trim().slice(0, 80) || "document";
  }
  function saveBlob(blob, name) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  }

  async function download(kind) {
    flushSave();

    // Direct WhatsApp Sharing
    if (kind === "wa") {
      const currentUrl = getLiveUrl();
      const docName = cur.name || cur.title || (ui === "ar" ? "وثيقة رسمية" : "Official Document");
      const msg = encodeURIComponent(
        (ui === "ar" ? "وثيقة رسمية معتمدة من شركة سفن هاندز للخدمات الهندسية والمقاولات: " : "Official Document - SEVEN HANDS Engineering Services & Construction: ") +
        docName + "\n" + currentUrl
      );
      window.open("https://api.whatsapp.com/send?text=" + msg, "_blank");
      showToast(t("shareWa"), "💬");
      return;
    }

    const st = $("#saveState");
    const old = st ? st.textContent : "";
    if (st) st.textContent = t("exporting");
    showToast(t("exporting"), "⏳", 3000);

    try {
      if (kind === "json") {
        saveBlob(new Blob([JSON.stringify(cur, null, 1)], { type: "application/json" }), fileBase() + ".json");
        showToast(ui === "ar" ? "تم تصدير ملف JSON بنجاح" : "JSON exported", "💾");
      } else if (kind === "print") {
        await document.fonts.ready;
        window.print();
      } else if (kind === "docx") {
        saveBlob(await SHEXPORT.docx(cur), fileBase() + ".docx");
        showToast(ui === "ar" ? "تم تحميل ملف Word بنجاح 🚀" : "Word exported 🚀", "📘");
      } else if (kind === "xlsx") {
        saveBlob(await SHEXPORT.xlsx(cur), fileBase() + ".xlsx");
        showToast(ui === "ar" ? "تم تحميل ملف Excel بنجاح 🚀" : "Excel exported 🚀", "📗");
      } else if (kind === "pdf") {
        await SHEXPORT.pdf($("#page"), cur, fileBase() + ".pdf");
        showToast(ui === "ar" ? "تم تحميل ملف PDF بنجاح 🚀" : "PDF exported 🚀", "📕");
      }
      trackEvent("export_document", { format: kind, title: cur ? cur.title : "untitled" });
    } catch (e) {
      console.error(e);
      alert(t("failed") + ": " + (e && e.message));
    }
    if (st) st.textContent = old;
  }

  window.SHAPP = { get cur() { return cur; }, store, download, openDoc, goHome, showToast };

  /* ---------- Global Event Listeners & Boot ---------- */
  document.addEventListener("click", () => $$(".menu").forEach((x) => (x.hidden = true)));
  document.addEventListener("keydown", (e) => {
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s" && cur) {
      e.preventDefault();
      flushSave();
      showToast(t("savedOk"), "💾");
    }
    // Escape to close menus / modals
    if (e.key === "Escape") {
      const modal = $("#modal");
      if (modal && !modal.hidden) modal.hidden = true;
      const waMenu = $("#waMenuDropdown");
      if (waMenu && !waMenu.hidden) waMenu.hidden = true;
      $$(".menu").forEach((x) => (x.hidden = true));
    }
  });

  window.addEventListener("beforeunload", () => flushSave());

  $("#uiLang").onclick = () => {
    ui = ui === "ar" ? "en" : "ar";
    try { localStorage.setItem(UIKEY, ui); } catch (e) {}
    applyUI();
  };

  $("#homeBtn").onclick = goHome;
  const brandHeader = $("#brandHeaderLink");
  if (brandHeader) {
    brandHeader.onclick = goHome;
    brandHeader.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") goHome(); };
  }
  const headerReg = $("#headerRegistryBtn");
  if (headerReg) headerReg.onclick = openRegistryModal;

  // Initialize interactive components
  initInteractiveLoader();
  initFloatingActions();
  initDepartmentSwitcher();

  // Route initial URL
  const initialHash = location.hash.replace(/^#/, "").trim();
  const initialDoc = initialHash && store.all()[initialHash];
  if (initialDoc) {
    applyUI();
    openDoc(initialDoc, false);
  } else {
    applyUI();
  }
})();
