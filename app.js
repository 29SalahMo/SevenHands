/* SEVEN HANDS Docs: template editor. State lives in `cur`; everything renders from it. */
(function () {
  "use strict";
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const KEY = "shdocs:v1", UIKEY = "shdocs:ui";
  const STR = {
    ar: { app: "محرر الأوراق والقوالب", sub: "سفن هاندز | قسم تكنولوجيا المعلومات", newFrom: "ابدأ من قالب", saved: "أوراقي المحفوظة", none: "لا توجد أوراق محفوظة بعد. اختر قالباً للبدء.", open: "فتح", del: "حذف", imp: "استيراد ملف JSON", back: "الرئيسية", save: "حفظ", savedOk: "تم الحفظ", dl: "تحميل", word: "Word (.docx)", excel: "Excel (.xlsx)", pdf: "PDF (صورة الصفحة)", print: "طباعة / حفظ PDF نصي", json: "نسخة JSON (للنقل)", add: "إضافة", heading: "عنوان", text: "نص", table: "جدول", note: "ملاحظة", sign: "توقيعات", addRow: "+ صف", addCol: "+ عمود", cols: "الأعمدة", orient: "الاتجاه", land: "أفقي", port: "عمودي", dir: "لغة الورقة", logo: "الشعار", name: "اسم الملف", copy: "حفظ كنسخة", confirm: "حذف هذه الورقة نهائياً؟", total: "الإجمالي", metaAdd: "+ حقل", apply: "تطبيق", cancel: "إلغاء", label: "العنوان", kind: "النوع", expr: "المعادلة", width: "العرض", kText: "نص", kNum: "رقم (يُجمع)", kCalc: "محسوب", hint: "المعادلة تستخدم مفاتيح الأعمدة مثل qty*price أو MIN(a,b,c)", key: "المفتاح", showTotal: "صف إجمالي", totalLabel: "عنوان الإجمالي", date: "آخر تعديل", exporting: "جارٍ التحضير...", failed: "تعذر إنشاء الملف", zoom: "تكبير", tools: "أدوات", up: "أعلى", down: "أسفل", rm: "حذف", delRow: "حذف الصف", delCol: "حذف", autosave: "الحفظ تلقائي في هذا المتصفح", tip: "اضغط أي نص أو خلية للتعديل مباشرة" },
    en: { app: "Documents and Templates Editor", sub: "SEVEN HANDS | IT Department", newFrom: "Start from a template", saved: "My saved documents", none: "Nothing saved yet. Pick a template to start.", open: "Open", del: "Delete", imp: "Import JSON file", back: "Home", save: "Save", savedOk: "Saved", dl: "Download", word: "Word (.docx)", excel: "Excel (.xlsx)", pdf: "PDF (page image)", print: "Print / save text PDF", json: "JSON copy (to move)", add: "Add", heading: "Heading", text: "Text", table: "Table", note: "Note", sign: "Signatures", addRow: "+ Row", addCol: "+ Column", cols: "Columns", orient: "Orientation", land: "Landscape", port: "Portrait", dir: "Document language", logo: "Logo", name: "File name", copy: "Save as copy", confirm: "Delete this document permanently?", total: "Total", metaAdd: "+ Field", apply: "Apply", cancel: "Cancel", label: "Label", kind: "Type", expr: "Formula", width: "Width", kText: "Text", kNum: "Number (summed)", kCalc: "Calculated", hint: "Formulas use column keys, e.g. qty*price or MIN(a,b,c)", key: "Key", showTotal: "Total row", totalLabel: "Total label", date: "Last edited", exporting: "Preparing...", failed: "Could not create the file", zoom: "Zoom", tools: "Tools", up: "Up", down: "Down", rm: "Delete", delRow: "Delete row", delCol: "Delete", autosave: "Autosaves in this browser", tip: "Click any text or cell to edit it" },
  };
  let ui = "ar";
  try { ui = localStorage.getItem(UIKEY) || "ar"; } catch (e) {}
  const t = (k) => STR[ui][k] || k;
  let cur = null, zoom = 1, saveTimer = null;

  /* ---------- storage ---------- */
  const store = {
    all() { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; } },
    put(doc) { try { const a = store.all(); doc.updated = Date.now(); a[doc.id] = doc; localStorage.setItem(KEY, JSON.stringify(a)); return true; } catch (e) { return false; } },
    del(id) { try { const a = store.all(); delete a[id]; localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} },
  };
  const uid = () => "d" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const clone = (o) => JSON.parse(JSON.stringify(o));

  /* ---------- calc engine (shared with export) ---------- */
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
  function rowGetter(b, r) { const idx = {}; b.cols.forEach((c, i) => (idx[c.key] = i)); return (k) => (k in idx ? (b.cols[idx[k]].kind === "calc" ? calcCell(b, r, idx[k], 0) : num(r[idx[k]])) : null); }
  function calcCell(b, r, ci, depth) {
    if (depth > 4) return null; const c = b.cols[ci]; const idx = {}; b.cols.forEach((x, i) => (idx[x.key] = i));
    return evalExpr(c.expr || "", (k) => { if (!(k in idx)) return null; const j = idx[k]; return b.cols[j].kind === "calc" ? calcCell(b, r, j, depth + 1) : num(r[j]); });
  }
  function colTotal(b, ci) { let s = 0, any = false; b.rows.forEach((r) => { const c = b.cols[ci]; const v = c.kind === "calc" ? calcCell(b, r, ci, 0) : num(r[ci]); if (v !== null) { s += v; any = true; } }); return any ? s : 0; }
  window.SHCALC = { num, calcCell, colTotal, fmtNum, evalExpr };

  /* ---------- UI language ---------- */
  function applyUI() {
    document.documentElement.lang = ui; document.documentElement.dir = ui === "ar" ? "rtl" : "ltr";
    $("#appTitle").textContent = t("app"); $("#appSub").textContent = t("sub"); $("#uiLang").textContent = ui === "ar" ? "EN" : "عربي";
    $("#homeBtn").textContent = t("back");
    if (cur) renderEditor(); else renderHome();
  }

  /* ---------- home ---------- */
  function renderHome() {
    $("#editor").hidden = true; $("#home").hidden = false; $("#homeBtn").hidden = true;
    const h = $("#home"); const docs = Object.values(store.all()).sort((a, b) => b.updated - a.updated);
    h.innerHTML = `<section><h2>${t("newFrom")}</h2><div class="grid" id="tgrid"></div></section>
      <section><div class="row-between"><h2>${t("saved")}</h2><label class="btn ghost">${t("imp")}<input type="file" id="impFile" accept=".json,application/json" hidden></label></div><div id="saved" class="list"></div></section>`;
    const g = $("#tgrid");
    SH.TEMPLATES.forEach((tp) => {
      const b = document.createElement("button"); b.className = "tcard"; b.innerHTML = `<span class="ti">${tp.icon}</span><b>${ui === "ar" ? tp.ar : tp.en}</b><small>${tp.desc}</small>`;
      b.onclick = () => { cur = tp.make(); cur.id = uid(); cur.name = ui === "ar" ? tp.ar : tp.en; cur.tpl = tp.id; store.put(cur); location.hash = "#" + cur.id; openDoc(cur); };
      g.appendChild(b);
    });
    const s = $("#saved");
    if (!docs.length) s.innerHTML = `<p class="muted">${t("none")}</p>`;
    docs.forEach((d) => {
      const r = document.createElement("div"); r.className = "srow";
      r.innerHTML = `<div><b></b><small>${new Date(d.updated).toLocaleString(ui === "ar" ? "ar-EG" : "en-GB")}</small></div><div class="acts"><button class="btn">${t("open")}</button><button class="btn danger">${t("del")}</button></div>`;
      $("b", r).textContent = d.name || d.title;
      $(".btn", r).onclick = () => { location.hash = "#" + d.id; openDoc(d); };
      $(".danger", r).onclick = () => { if (confirm(t("confirm"))) { store.del(d.id); renderHome(); } };
      s.appendChild(r);
    });
    $("#impFile").onchange = (e) => {
      const f = e.target.files[0]; if (!f) return; const rd = new FileReader();
      rd.onload = () => { try { const d = JSON.parse(rd.result); d.id = uid(); d.name = d.name || d.title; store.put(d); openDoc(d); } catch (x) { alert("JSON error"); } };
      rd.readAsText(f);
    };
  }
  function openDoc(d) { cur = clone(d); renderEditor(); window.scrollTo(0, 0); }
  function goHome() { flushSave(); cur = null; history.replaceState(null, "", location.pathname); renderHome(); }

  /* ---------- editor ---------- */
  function scheduleSave() { clearTimeout(saveTimer); saveTimer = setTimeout(flushSave, 500); }
  function flushSave() { if (!cur) return; clearTimeout(saveTimer); if (store.put(cur)) { const s = $("#saveState"); if (s) { s.textContent = t("savedOk"); setTimeout(() => s && (s.textContent = t("autosave")), 1500); } } }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  function editable(el, get, set, multiline) {
    el.contentEditable = "true"; el.spellcheck = false;
    el.addEventListener("input", () => { set(el.innerText.replace(/ /g, " ")); scheduleSave(); });
    el.addEventListener("paste", (e) => { e.preventDefault(); const tx = (e.clipboardData || window.clipboardData).getData("text/plain"); document.execCommand("insertText", false, multiline ? tx : tx.replace(/\s*\n\s*/g, " ")); });
    if (!multiline) el.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); const cells = $$("td[contenteditable]", el.closest("tbody") || document); const i = cells.indexOf(el); const cols = el.parentElement.children.length; const nx = cells[i + cols - 1]; (nx && nx.closest("tr") !== el.closest("tr") ? nx : null) && nx.focus(); } });
    el.textContent = get();
    return el;
  }
  function renderEditor() {
    $("#home").hidden = true; $("#editor").hidden = false; $("#homeBtn").hidden = false;
    const ed = $("#editor"); const rtl = cur.lang === "ar";
    ed.innerHTML = `<div class="toolbar no-print">
      <div class="tgroup"><label>${t("name")}<input id="fName" value=""></label>
        <label>${t("dir")}<select id="fLang"><option value="ar">العربية (RTL)</option><option value="en">English (LTR)</option></select></label>
        <label>${t("orient")}<select id="fOr"><option value="landscape">${t("land")}</option><option value="portrait">${t("port")}</option></select></label>
        <label class="chk"><input type="checkbox" id="fLogo"> ${t("logo")}</label></div>
      <div class="tgroup"><div class="dd"><button class="btn" id="addBtn">${t("add")} ▾</button><div class="menu" id="addMenu" hidden>
          <button data-a="heading">${t("heading")}</button><button data-a="text">${t("text")}</button><button data-a="table">${t("table")}</button><button data-a="box">${t("note")}</button><button data-a="sign">${t("sign")}</button></div></div>
        <button class="btn primary" id="saveBtn">${t("save")}</button><button class="btn" id="copyBtn">${t("copy")}</button>
        <div class="dd"><button class="btn accent" id="dlBtn">${t("dl")} ▾</button><div class="menu" id="dlMenu" hidden>
          <button data-d="docx">${t("word")}</button><button data-d="xlsx">${t("excel")}</button><button data-d="pdf">${t("pdf")}</button><button data-d="print">${t("print")}</button><button data-d="json">${t("json")}</button></div></div>
        <span class="zoom"><button class="btn" id="zOut">−</button><button class="btn" id="zIn">+</button></span></div>
      <div class="tip"><span id="saveState">${t("autosave")}</span> · ${t("tip")}</div></div>
      <div class="stage"><div id="page" class="page ${cur.orient}" dir="${rtl ? "rtl" : "ltr"}"></div></div>`;
    $("#fName").value = cur.name || ""; $("#fLang").value = cur.lang; $("#fOr").value = cur.orient; $("#fLogo").checked = !!cur.logo;
    $("#fName").oninput = (e) => { cur.name = e.target.value; scheduleSave(); };
    $("#fLang").onchange = (e) => { cur.lang = e.target.value; flushSave(); renderEditor(); };
    $("#fOr").onchange = (e) => { cur.orient = e.target.value; flushSave(); renderEditor(); };
    $("#fLogo").onchange = (e) => { cur.logo = e.target.checked; flushSave(); renderEditor(); };
    const menu = (btn, m) => { $(btn).onclick = (e) => { e.stopPropagation(); const h = $(m).hidden; $$(".menu").forEach((x) => (x.hidden = true)); $(m).hidden = !h; }; };
    menu("#addBtn", "#addMenu"); menu("#dlBtn", "#dlMenu");
    $$("#addMenu button").forEach((b) => (b.onclick = () => { addBlock(b.dataset.a); }));
    $$("#dlMenu button").forEach((b) => (b.onclick = () => { download(b.dataset.d); $("#dlMenu").hidden = true; }));
    $("#saveBtn").onclick = () => flushSave();
    $("#copyBtn").onclick = () => { const c = clone(cur); c.id = uid(); c.name = (cur.name || cur.title) + " (copy)"; store.put(c); cur = c; location.hash = "#" + c.id; renderEditor(); };
    $("#zIn").onclick = () => setZoom(zoom + 0.1); $("#zOut").onclick = () => setZoom(zoom - 0.1);
    renderPage(); setZoom(zoom);
  }
  function setZoom(z) { zoom = Math.max(0.4, Math.min(1.6, z)); const p = $("#page"); if (p) p.style.zoom = zoom; }
  function renderPage() {
    const p = $("#page"); p.innerHTML = ""; const rtl = cur.lang === "ar";
    const head = document.createElement("div"); head.className = "ph";
    head.innerHTML = `<div class="ph-text"><h1 class="ph-title"></h1><p class="ph-sub"></p></div>${cur.logo ? '<img class="ph-logo" src="logo.png" alt="SEVEN HANDS">' : ""}`;
    editable($(".ph-title", head), () => cur.title, (v) => (cur.title = v), false); editable($(".ph-sub", head), () => cur.subtitle || "", (v) => (cur.subtitle = v), false);
    p.appendChild(head);
    const meta = document.createElement("div"); meta.className = "meta";
    cur.meta.forEach((m, i) => {
      const d = document.createElement("div"); d.className = "mf"; d.innerHTML = `<span class="ml"></span><span class="mv"></span><button class="x no-print" title="${t("rm")}">×</button>`;
      editable($(".ml", d), () => m.l, (v) => (m.l = v), false); editable($(".mv", d), () => m.v, (v) => (m.v = v), false);
      $(".x", d).onclick = () => { cur.meta.splice(i, 1); scheduleSave(); renderPage(); }; meta.appendChild(d);
    });
    const ma = document.createElement("button"); ma.className = "btn ghost no-print small"; ma.textContent = t("metaAdd"); ma.onclick = () => { cur.meta.push({ l: ui === "ar" ? "حقل" : "Field", v: "" }); scheduleSave(); renderPage(); }; meta.appendChild(ma);
    p.appendChild(meta);
    cur.blocks.forEach((b, i) => p.appendChild(renderBlock(b, i)));
    const ft = document.createElement("div"); ft.className = "pfoot"; ft.textContent = "SEVEN HANDS"; p.appendChild(ft);
    let ps = $("#printStyle"); if (!ps) { ps = document.createElement("style"); ps.id = "printStyle"; document.head.appendChild(ps); }
    ps.textContent = `@page{size:A4 ${cur.orient};margin:8mm}`;
  }
  function tools(i, extra) {
    const d = document.createElement("div"); d.className = "btools no-print";
    d.innerHTML = `${extra || ""}<button data-m="up" title="${t("up")}">↑</button><button data-m="down" title="${t("down")}">↓</button><button data-m="rm" class="danger" title="${t("rm")}">✕</button>`;
    d.addEventListener("click", (e) => { const m = e.target.dataset && e.target.dataset.m; if (!m) return; const a = cur.blocks;
      if (m === "up" && i > 0) [a[i - 1], a[i]] = [a[i], a[i - 1]]; else if (m === "down" && i < a.length - 1) [a[i + 1], a[i]] = [a[i], a[i + 1]]; else if (m === "rm") a.splice(i, 1); else return;
      scheduleSave(); renderPage(); });
    return d;
  }
  function renderBlock(b, i) {
    const w = document.createElement("div"); w.className = "blk blk-" + b.type; w.dataset.i = i;
    if (b.type === "heading") { const h = document.createElement("h2"); editable(h, () => b.text, (v) => (b.text = v), false); w.append(tools(i), h); }
    else if (b.type === "text") { const p = document.createElement("div"); p.className = "txt"; editable(p, () => b.text, (v) => (b.text = v), true); w.append(tools(i), p); }
    else if (b.type === "box") { const p = document.createElement("div"); p.className = "box " + (b.tone || "info"); editable(p, () => b.text, (v) => (b.text = v), true); w.append(tools(i, `<button data-m="tone" class="tone">◐</button>`), p);
      $(".tone", w).onclick = () => { b.tone = b.tone === "warn" ? "info" : "warn"; scheduleSave(); renderPage(); }; }
    else if (b.type === "sign") { const s = document.createElement("div"); s.className = "signs"; b.items.forEach((it, k) => { const d = document.createElement("div"); d.className = "sg"; editable(d, () => it, (v) => (b.items[k] = v), false); s.appendChild(d); });
      const add = document.createElement("button"); add.className = "btn ghost small no-print"; add.textContent = "+"; add.onclick = () => { b.items.push(ui === "ar" ? "توقيع: ____________" : "Signature: ____________"); scheduleSave(); renderPage(); };
      const rem = document.createElement("button"); rem.className = "btn ghost small no-print"; rem.textContent = "−"; rem.onclick = () => { if (b.items.length > 1) { b.items.pop(); scheduleSave(); renderPage(); } };
      w.append(tools(i), s, add, rem); }
    else if (b.type === "table") w.append(tools(i, `<button data-m="ar">${t("addRow")}</button><button data-m="ac">${t("addCol")}</button><button data-m="cols">${t("cols")}</button>`), tableEl(b));
    if (b.type === "table") { const tl = $(".btools", w); $('[data-m="ar"]', tl).onclick = (e) => { e.stopPropagation(); b.rows.push(b.cols.map(() => "")); scheduleSave(); renderPage(); };
      $('[data-m="ac"]', tl).onclick = (e) => { e.stopPropagation(); b.cols.push({ key: "c" + (b.cols.length + 1), label: ui === "ar" ? "عمود" : "Column", w: 1, kind: "text", expr: "" }); b.rows.forEach((r) => r.push("")); scheduleSave(); renderPage(); };
      $('[data-m="cols"]', tl).onclick = (e) => { e.stopPropagation(); colDialog(b); }; }
    return w;
  }
  function tableEl(b) {
    const wrap = document.createElement("div"); wrap.className = "tw"; const tb = document.createElement("table"); const sum = b.cols.reduce((a, c) => a + (c.w || 1), 0);
    tb.innerHTML = `<colgroup>${b.cols.map((c) => `<col style="width:${((c.w || 1) / sum * 100).toFixed(2)}%">`).join("")}<col class="no-print" style="width:26px"></colgroup>`;
    const th = document.createElement("thead"), tr = document.createElement("tr");
    b.cols.forEach((c) => { const h = document.createElement("th"); editable(h, () => c.label, (v) => (c.label = v), false); tr.appendChild(h); });
    tr.appendChild(Object.assign(document.createElement("th"), { className: "no-print ghc" })); th.appendChild(tr); tb.appendChild(th);
    const body = document.createElement("tbody");
    b.rows.forEach((r, ri) => {
      const row = document.createElement("tr");
      b.cols.forEach((c, ci) => { const td = document.createElement("td"); td.className = c.kind;
        if (c.kind === "calc") { td.textContent = fmtNum(calcCell(b, r, ci, 0)); } else editable(td, () => r[ci] || "", (v) => { r[ci] = v; recalc(b, tb); }, false); row.appendChild(td); });
      const x = document.createElement("td"); x.className = "no-print rx"; x.innerHTML = `<button class="x" title="${t("delRow")}">×</button>`; x.firstChild.onclick = () => { b.rows.splice(ri, 1); scheduleSave(); renderPage(); }; row.appendChild(x);
      body.appendChild(row);
    });
    tb.appendChild(body);
    if (b.total && b.cols.some((c) => c.kind !== "text")) {
      const f = document.createElement("tfoot"); const fr = document.createElement("tr"); let first = true;
      b.cols.forEach((c, ci) => { const td = document.createElement("td"); td.className = "tot " + c.kind;
        if (c.kind === "text" && first) { td.textContent = b.totalLabel || t("total"); first = false; td.contentEditable = "true"; td.addEventListener("input", () => { b.totalLabel = td.innerText; scheduleSave(); }); }
        else if (c.kind !== "text") td.textContent = fmtNum(colTotal(b, ci)); fr.appendChild(td); });
      fr.appendChild(Object.assign(document.createElement("td"), { className: "no-print" })); f.appendChild(fr); tb.appendChild(f);
    }
    wrap.appendChild(tb); return wrap;
  }
  function recalc(b, tb) {
    const rows = $$("tbody tr", tb);
    rows.forEach((tr, ri) => b.cols.forEach((c, ci) => { if (c.kind === "calc") tr.children[ci].textContent = fmtNum(calcCell(b, b.rows[ri], ci, 0)); }));
    const f = $("tfoot tr", tb); if (f) b.cols.forEach((c, ci) => { if (c.kind !== "text") f.children[ci].textContent = fmtNum(colTotal(b, ci)); });
  }
  function addBlock(kind) {
    const ar = cur.lang === "ar";
    const nb = { heading: { type: "heading", text: ar ? "عنوان جديد" : "New heading" }, text: { type: "text", text: ar ? "اكتب هنا..." : "Write here..." }, box: { type: "box", tone: "info", text: ar ? "ملاحظة..." : "Note..." },
      sign: { type: "sign", items: ar ? ["إعداد: م. صلاح", "مراجعة: م. عصام"] : ["Prepared by: Eng. Salah", "Reviewed by: Eng. Esam"] },
      table: { type: "table", total: false, totalLabel: "", cols: [{ key: "n", label: ar ? "م" : "#", w: 0.5, kind: "text", expr: "" }, { key: "item", label: ar ? "البند" : "Item", w: 3, kind: "text", expr: "" }, { key: "qty", label: ar ? "العدد" : "Qty", w: 0.8, kind: "num", expr: "" }, { key: "price", label: ar ? "السعر" : "Price", w: 1, kind: "num", expr: "" }, { key: "tot", label: ar ? "الإجمالي" : "Total", w: 1.1, kind: "calc", expr: "qty*price" }], rows: [["1", "", "", "", ""], ["2", "", "", "", ""], ["3", "", "", "", ""]] } }[kind];
    cur.blocks.push(nb); $("#addMenu").hidden = true; scheduleSave(); renderPage(); const p = $("#page"); p.lastElementChild.previousElementSibling.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function colDialog(b) {
    const m = $("#modal"); m.hidden = false;
    const rowsHtml = b.cols.map((c, i) => `<tr data-i="${i}"><td><input class="f-label" value="${esc(c.label)}"></td><td><input class="f-key" value="${esc(c.key)}" size="7"></td>
      <td><select class="f-kind"><option value="text">${t("kText")}</option><option value="num">${t("kNum")}</option><option value="calc">${t("kCalc")}</option></select></td>
      <td><input class="f-expr" value="${esc(c.expr || "")}" size="16"></td><td><input class="f-w" type="number" step="0.1" min="0.2" value="${c.w || 1}" style="width:60px"></td><td><button class="btn danger f-del">${t("delCol")}</button></td></tr>`).join("");
    m.innerHTML = `<div class="dlg"><h3>${t("cols")}</h3><p class="muted">${t("hint")}</p><div class="dscroll"><table class="ctab"><thead><tr><th>${t("label")}</th><th>${t("key")}</th><th>${t("kind")}</th><th>${t("expr")}</th><th>${t("width")}</th><th></th></tr></thead><tbody>${rowsHtml}</tbody></table></div>
      <label class="chk"><input type="checkbox" id="f-total" ${b.total ? "checked" : ""}> ${t("showTotal")}</label>
      <div class="acts"><button class="btn primary" id="dOk">${t("apply")}</button><button class="btn" id="dNo">${t("cancel")}</button></div></div>`;
    $$(".ctab tbody tr", m).forEach((tr, i) => { $(".f-kind", tr).value = b.cols[i].kind; });
    $$(".f-del", m).forEach((bt) => (bt.onclick = () => { const i = +bt.closest("tr").dataset.i; if (b.cols.length > 1) { b.cols.splice(i, 1); b.rows.forEach((r) => r.splice(i, 1)); m.hidden = true; scheduleSave(); renderPage(); } }));
    $("#dNo").onclick = () => (m.hidden = true);
    $("#dOk").onclick = () => { $$(".ctab tbody tr", m).forEach((tr, i) => { const c = b.cols[i]; c.label = $(".f-label", tr).value; c.key = ($(".f-key", tr).value || "c" + i).replace(/[^A-Za-z0-9_]/g, "") || "c" + i; c.kind = $(".f-kind", tr).value; c.expr = $(".f-expr", tr).value.trim(); c.w = parseFloat($(".f-w", tr).value) || 1; });
      b.total = $("#f-total").checked; m.hidden = true; scheduleSave(); renderPage(); };
  }

  /* ---------- downloads ---------- */
  function fileBase() { return (cur.name || cur.title || "document").replace(/[\\/:*?"<>|]+/g, "-").trim().slice(0, 80) || "document"; }
  function saveBlob(blob, name) { const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500); }
  async function download(kind) {
    flushSave(); const st = $("#saveState"); const old = st.textContent; st.textContent = t("exporting");
    try {
      if (kind === "json") saveBlob(new Blob([JSON.stringify(cur, null, 1)], { type: "application/json" }), fileBase() + ".json");
      else if (kind === "print") { await document.fonts.ready; window.print(); }
      else if (kind === "docx") saveBlob(await SHEXPORT.docx(cur), fileBase() + ".docx");
      else if (kind === "xlsx") saveBlob(await SHEXPORT.xlsx(cur), fileBase() + ".xlsx");
      else if (kind === "pdf") await SHEXPORT.pdf($("#page"), cur, fileBase() + ".pdf");
    } catch (e) { console.error(e); alert(t("failed") + ": " + (e && e.message)); }
    st.textContent = old;
  }
  window.SHAPP = { get cur() { return cur; }, store, download, openDoc };

  /* ---------- boot ---------- */
  document.addEventListener("click", () => $$(".menu").forEach((x) => (x.hidden = true)));
  document.addEventListener("keydown", (e) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s" && cur) { e.preventDefault(); flushSave(); } });
  window.addEventListener("beforeunload", () => flushSave());
  $("#uiLang").onclick = () => { ui = ui === "ar" ? "en" : "ar"; try { localStorage.setItem(UIKEY, ui); } catch (e) {} applyUI(); };
  $("#homeBtn").onclick = goHome;
  const h = location.hash.slice(1); const d0 = h && store.all()[h];
  if (d0) { applyUI(); openDoc(d0); } else applyUI();
})();
