/* SEVEN HANDS Docs: template editor & interactive document system.
   Supports full browser routing, WhatsApp preview & sharing, interactive preloader, live filters, and calculation animations. */
(function () {
  "use strict";
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const KEY = "shdocs:v1", UIKEY = "shdocs:ui";

  const STR = {
    ar: {
      app: "محرر الأوراق والقوالب الهندسية",
      sub: "سفن هاندز | قسم تكنولوجيا المعلومات",
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
      waCopySub: "حفظ الرابط المباشر في الحافظة"
    },
    en: {
      app: "Engineering Documents & Templates Editor",
      sub: "SEVEN HANDS | IT Department",
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
      waCopySub: "Copy direct page URL to clipboard"
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
    $("#appTitle").textContent = t("app");
    $("#appSub").textContent = t("sub");
    $("#uiLang").textContent = ui === "ar" ? "EN" : "عربي";
    $("#homeBtnLabel").textContent = t("back");

    const regLbl = $("#headerRegistryLabel");
    if (regLbl) regLbl.textContent = t("registryShort");
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
      const docName = (cur.name || cur.title || (ui === "ar" ? "ورقة عمل" : "Document")) + docCode;
      const msg = encodeURIComponent(
        (ui === "ar" ? "ورقة عمل هندسية من سفن هاندز: " : "Seven Hands Engineering Document: ") +
        docName + "\n" + currentUrl
      );
      waShareDocLink.href = "https://api.whatsapp.com/send?text=" + msg;
      if (waDocTitle) waDocTitle.textContent = (ui === "ar" ? "مشاركة: " : "Share: ") + docName;
      if (waDocSub) waDocSub.textContent = ui === "ar" ? "إرسال رابط الورقة الحالية مباشرة للزملاء" : "Send direct worksheet link to colleagues";
    } else {
      const msg = encodeURIComponent(
        (ui === "ar"
          ? "منظومة سفن هاندز للنماذج الهندسية وأوراق عمل تكنولوجيا المعلومات:\n"
          : "Seven Hands Engineering Docs & IT Templates System:\n") + currentUrl
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

  /* ---------- Home View with Interactive Search & Filters ---------- */
  function renderHome() {
    $("#editor").hidden = true;
    $("#home").hidden = false;
    $("#homeBtn").hidden = true;

    const h = $("#home");
    const allDocs = Object.values(store.all()).sort((a, b) => b.updated - a.updated);

    // Build department categories list
    const categories = [
      { id: "all", label: t("all"), icon: "⚡" },
      { id: "it", label: t("deptIt"), icon: "💻" },
      { id: "procurement", label: t("deptProcurement"), icon: "🛒" },
      { id: "hr", label: t("deptHr"), icon: "👥" },
      { id: "secretary", label: t("deptSecretary"), icon: "📋" },
      { id: "engineering", label: t("deptEngineering"), icon: "📐" },
      { id: "management", label: t("deptManagement"), icon: "🏢" },
      { id: "saved", label: t("catSaved"), icon: "💾" },
      { id: "blank", label: t("deptBlank"), icon: "📄" }
    ];

    h.innerHTML = `
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
        <div class="stat-card">
          <div class="stat-icon">⚡</div>
          <div class="stat-info">
            <span class="stat-val">${ui === "ar" ? "فوري وتلقائي" : "Live & Realtime"}</span>
            <span class="stat-lbl">${t("statCalc")}</span>
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
      const docName = cur.name || cur.title || (ui === "ar" ? "وثيقة عمل" : "Worksheet");
      const msg = encodeURIComponent(
        (ui === "ar" ? "ورقة عمل من سفن هاندز: " : "Seven Hands IT Worksheet: ") +
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
