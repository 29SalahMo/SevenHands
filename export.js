/* Exporters: Word (docx), Excel (exceljs), PDF (html2pdf). Pure functions of the document object. */
(function () {
  "use strict";
  const C = () => window.SHCALC;
  const NAVY = "094878", CYAN = "13B7CD", SOFT = "EAF3F8", GREY = "8A92A0";
  async function logoBytes() {
    try { const r = await fetch("logo.png"); if (!r.ok) throw 0; return new Uint8Array(await r.arrayBuffer()); } catch (e) { return null; }
  }
  const val = (b, r, ci) => { const c = b.cols[ci]; return c.kind === "calc" ? C().calcCell(b, r, ci, 0) : C().num(r[ci]); };

  /* ---------------- DOCX ---------------- */
  async function toDocx(d) {
    const X = window.docx; const rtl = d.lang === "ar"; const font = "Arial";
    const land = d.orient === "landscape"; const pageW = land ? 16838 : 11906, margin = 567, usable = pageW - margin * 2;
    const run = (text, o) => new X.TextRun(Object.assign({ text: String(text), font, rightToLeft: rtl }, o || {}));
    const para = (text, o) => new X.Paragraph(Object.assign({ bidirectional: rtl, alignment: rtl ? X.AlignmentType.RIGHT : X.AlignmentType.LEFT, children: [run(text, o && o.run)] }, (o && o.p) || {}));
    const lines = (text, o) => String(text).split("\n").map((t) => para(t, o));
    const kids = [];
    const lb = d.logo ? await logoBytes() : null;
    const head = [para(d.title, { run: { bold: true, size: 40, color: NAVY }, p: { spacing: { after: 40 } } })];
    if (d.subtitle) head.push(para(d.subtitle, { run: { size: 20, color: "5B6B7A" } }));
    if (lb) {
      const none = { style: X.BorderStyle.NONE, size: 0, color: "FFFFFF" }, nb = { top: none, bottom: none, left: none, right: none };
      kids.push(new X.Table({ width: { size: usable, type: X.WidthType.DXA }, columnWidths: [usable - 1700, 1700], visuallyRightToLeft: rtl, borders: { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: none },
        rows: [new X.TableRow({ children: [new X.TableCell({ borders: nb, width: { size: usable - 1700, type: X.WidthType.DXA }, children: head }),
          new X.TableCell({ borders: nb, width: { size: 1700, type: X.WidthType.DXA }, children: [new X.Paragraph({ alignment: X.AlignmentType.CENTER, children: [new X.ImageRun({ data: lb, transformation: { width: 80, height: 80 }, type: "png" })] })] })] })] }));
    } else kids.push(...head);
    kids.push(new X.Paragraph({ border: { bottom: { style: X.BorderStyle.SINGLE, size: 18, color: NAVY, space: 1 } }, spacing: { after: 120 }, children: [] }));
    if (d.meta.length) {
      const per = Math.min(3, d.meta.length), rowsN = Math.ceil(d.meta.length / per), cw = Math.floor(usable / per), none = { style: X.BorderStyle.NONE, size: 0, color: "FFFFFF" };
      const rows = [];
      for (let r = 0; r < rowsN; r++) {
        const cells = [];
        for (let k = 0; k < per; k++) { const m = d.meta[r * per + k];
          cells.push(new X.TableCell({ width: { size: cw, type: X.WidthType.DXA }, borders: { top: none, left: none, right: none, bottom: { style: X.BorderStyle.SINGLE, size: 4, color: GREY } },
            children: [new X.Paragraph({ bidirectional: rtl, alignment: rtl ? X.AlignmentType.RIGHT : X.AlignmentType.LEFT, children: m ? [run(m.l + " ", { color: "5B6B7A", size: 20 }), run(m.v, { size: 20 })] : [] })] })); }
        rows.push(new X.TableRow({ children: cells }));
      }
      kids.push(new X.Table({ width: { size: cw * per, type: X.WidthType.DXA }, columnWidths: Array(per).fill(cw), visuallyRightToLeft: rtl, rows }));
      kids.push(new X.Paragraph({ children: [] }));
    }
    const bd = { style: X.BorderStyle.SINGLE, size: 4, color: GREY }, borders = { top: bd, bottom: bd, left: bd, right: bd };
    for (const b of d.blocks) {
      if (b.type === "heading") kids.push(para(b.text, { run: { bold: true, size: 28, color: NAVY }, p: { spacing: { before: 200, after: 80 }, keepNext: true } }));
      else if (b.type === "text") kids.push(...lines(b.text, { run: { size: 22 }, p: { spacing: { after: 80, line: 340 } } }));
      else if (b.type === "box") {
        const fill = b.tone === "warn" ? "FFF6DC" : SOFT, col = b.tone === "warn" ? "F2D98A" : "C9D8E4", bb = { style: X.BorderStyle.SINGLE, size: 4, color: col };
        kids.push(new X.Table({ width: { size: usable, type: X.WidthType.DXA }, columnWidths: [usable], visuallyRightToLeft: rtl, rows: [new X.TableRow({ children: [new X.TableCell({ width: { size: usable, type: X.WidthType.DXA }, borders: { top: bb, bottom: bb, left: bb, right: bb }, shading: { type: X.ShadingType.CLEAR, color: "auto", fill }, margins: { top: 80, bottom: 80, left: 140, right: 140 }, children: lines(b.text, { run: { size: 20 } }) })] })] }));
        kids.push(new X.Paragraph({ children: [] }));
      } else if (b.type === "table") {
        const sum = b.cols.reduce((a, c) => a + (c.w || 1), 0); let ws = b.cols.map((c) => Math.floor(((c.w || 1) / sum) * usable)); ws[ws.length - 1] += usable - ws.reduce((a, c) => a + c, 0);
        const cell = (txt, i, o) => new X.TableCell({ width: { size: ws[i], type: X.WidthType.DXA }, borders, verticalAlign: X.VerticalAlign.CENTER, margins: { top: 40, bottom: 40, left: 80, right: 80 },
          shading: o.fill ? { type: X.ShadingType.CLEAR, color: "auto", fill: o.fill } : undefined,
          children: [new X.Paragraph({ bidirectional: rtl, alignment: o.center ? X.AlignmentType.CENTER : (rtl ? X.AlignmentType.RIGHT : X.AlignmentType.LEFT), children: [run(txt, { size: 19, bold: !!o.bold, color: o.color })] })] });
        const rows = [new X.TableRow({ tableHeader: true, cantSplit: true, children: b.cols.map((c, i) => cell(c.label, i, { fill: NAVY, bold: true, color: "FFFFFF", center: true })) })];
        b.rows.forEach((r) => rows.push(new X.TableRow({ cantSplit: true, height: { value: 420, rule: X.HeightRule.ATLEAST }, children: b.cols.map((c, i) => {
          if (c.kind === "calc") return cell(C().fmtNum(val(b, r, i)), i, { fill: SOFT, bold: true, center: true });
          return cell(r[i] || "", i, { center: c.kind === "num" }); }) })));
        if (b.total && b.cols.some((c) => c.kind !== "text")) { let first = true;
          rows.push(new X.TableRow({ cantSplit: true, children: b.cols.map((c, i) => { if (c.kind === "text") { const t = first ? (b.totalLabel || (rtl ? "الإجمالي" : "Total")) : ""; first = false; return cell(t, i, { fill: "DCEBF4", bold: true }); }
            let s = 0; b.rows.forEach((r) => { const v = val(b, r, i); if (v !== null) s += v; }); return cell(C().fmtNum(s), i, { fill: "DCEBF4", bold: true, center: true }); }) })); }
        kids.push(new X.Table({ width: { size: usable, type: X.WidthType.DXA }, columnWidths: ws, visuallyRightToLeft: rtl, rows }));
        kids.push(new X.Paragraph({ children: [] }));
      } else if (b.type === "sign") {
        const n = b.items.length, cw = Math.floor(usable / n), none = { style: X.BorderStyle.NONE, size: 0, color: "FFFFFF" };
        kids.push(new X.Paragraph({ spacing: { before: 400 }, children: [] }));
        kids.push(new X.Table({ width: { size: cw * n, type: X.WidthType.DXA }, columnWidths: Array(n).fill(cw), visuallyRightToLeft: rtl, rows: [new X.TableRow({ children: b.items.map((t) => new X.TableCell({ width: { size: cw, type: X.WidthType.DXA }, borders: { top: { style: X.BorderStyle.SINGLE, size: 6, color: "0B1F33" }, bottom: none, left: none, right: none }, margins: { left: 120, right: 120 }, children: [para(t, { run: { size: 20 } })] })) })] }));
      }
    }
    const doc = new X.Document({ creator: "SEVEN HANDS", title: d.title, styles: { default: { document: { run: { font, size: 22 } } } },
      sections: [{ properties: { page: { size: { width: 11906, height: 16838, orientation: land ? X.PageOrientation.LANDSCAPE : X.PageOrientation.PORTRAIT }, margin: { top: margin, bottom: margin, left: margin, right: margin } } },
        footers: { default: new X.Footer({ children: [new X.Paragraph({ alignment: X.AlignmentType.CENTER, children: [new X.TextRun({ text: "SEVEN HANDS", size: 16, color: "5B6B7A", font })] })] }) }, children: kids }] });
    return X.Packer.toBlob(doc);
  }

  /* ---------------- XLSX ---------------- */
  function colL(n) { let s = ""; n++; while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; }
  function toFormula(expr, b, rowNum) {
    const idx = {}; b.cols.forEach((c, i) => (idx[c.key] = i));
    return expr.replace(/[A-Za-z_][A-Za-z0-9_]*/g, (m) => (["MIN", "MAX", "SUM"].includes(m.toUpperCase()) ? m.toUpperCase() : m in idx ? colL(idx[m]) + rowNum : "0"));
  }
  async function toXlsx(d) {
    const rtl = d.lang === "ar"; const wb = new ExcelJS.Workbook(); wb.creator = "SEVEN HANDS";
    const ws = wb.addWorksheet((d.name || d.title || "Sheet").replace(/[\\/?*\[\]:]/g, " ").slice(0, 30) || "Sheet", { views: [{ rightToLeft: rtl, showGridLines: false }], pageSetup: { orientation: d.orient, paperSize: 9, fitToPage: true, fitToWidth: 1, fitToHeight: 0 } });
    const tabs = d.blocks.filter((b) => b.type === "table"); const ncol = Math.max(6, ...tabs.map((t) => t.cols.length));
    const widths = Array(ncol).fill(12); tabs.forEach((t) => { const sum = t.cols.reduce((a, c) => a + (c.w || 1), 0); t.cols.forEach((c, i) => (widths[i] = Math.max(widths[i], Math.round(((c.w || 1) / sum) * 110)))); });
    ws.columns = widths.map((w) => ({ width: Math.min(60, w) }));
    const al = (extra) => Object.assign({ horizontal: rtl ? "right" : "left", vertical: "middle", wrapText: true, readingOrder: rtl ? "rtl" : "ltr" }, extra || {});
    const thin = { style: "thin", color: { argb: "FF" + GREY } }, bord = { top: thin, bottom: thin, left: thin, right: thin };
    const fillC = (h) => ({ type: "pattern", pattern: "solid", fgColor: { argb: "FF" + h } });
    let r = 1; const merge = () => { ws.mergeCells(r, 1, r, ncol); return ws.getCell(r, 1); };
    let c = merge(); c.value = d.title; c.font = { name: "Arial", size: 18, bold: true, color: { argb: "FF" + NAVY } }; c.alignment = al(); ws.getRow(r).height = 30; r++;
    if (d.docNumber) {
      c = merge();
      c.value = (rtl ? "كود المستند: " : "Doc Code: ") + d.docNumber + "  |  " + (rtl ? "الحالة: " : "Status: ") + (d.status === "approved" ? (rtl ? "معتمد" : "Approved") : d.status === "review" ? (rtl ? "قيد المراجعة" : "Under Review") : (rtl ? "مسودة" : "Draft"));
      c.font = { name: "Arial", size: 10, bold: true, color: { argb: "FF" + NAVY } };
      c.alignment = al();
      ws.getRow(r).height = 18;
      r++;
    }
    if (d.subtitle) { c = merge(); c.value = d.subtitle; c.font = { name: "Arial", size: 10, color: { argb: "FF5B6B7A" } }; c.alignment = al(); r++; }
    d.meta.forEach((m) => { ws.getCell(r, 1).value = m.l; ws.getCell(r, 1).font = { name: "Arial", bold: true, color: { argb: "FF5B6B7A" } }; ws.getCell(r, 1).alignment = al();
      ws.mergeCells(r, 2, r, Math.min(ncol, 4)); const v = ws.getCell(r, 2); v.value = m.v; v.alignment = al(); v.border = { bottom: thin }; r++; });
    r++;
    for (const b of d.blocks) {
      if (b.type === "heading") { c = merge(); c.value = b.text; c.font = { name: "Arial", size: 13, bold: true, color: { argb: "FF" + NAVY } }; c.alignment = al(); r += 1; }
      else if (b.type === "text" || b.type === "box") { c = merge(); c.value = b.text; c.alignment = al({ vertical: "top" }); c.font = { name: "Arial", size: 10 };
        if (b.type === "box") { c.fill = fillC(b.tone === "warn" ? "FFF6DC" : SOFT); c.border = bord; } ws.getRow(r).height = Math.max(20, 15 * Math.ceil(String(b.text).length / 110) + 6 * (String(b.text).split("\n").length - 1)); r += 2; }
      else if (b.type === "sign") { b.items.forEach((t, i) => { const cc = ws.getCell(r, 1 + i * Math.floor(ncol / b.items.length)); cc.value = t; cc.border = { top: thin }; cc.alignment = al(); cc.font = { name: "Arial", size: 10 }; }); r += 2; }
      else if (b.type === "table") {
        const hr = r; b.cols.forEach((col, i) => { const h = ws.getCell(r, i + 1); h.value = col.label; h.font = { name: "Arial", bold: true, color: { argb: "FFFFFFFF" } }; h.fill = fillC(NAVY); h.border = bord; h.alignment = al({ horizontal: "center" }); }); ws.getRow(r).height = 24; r++;
        const first = r;
        b.rows.forEach((row) => { b.cols.forEach((col, i) => { const cell = ws.getCell(r, i + 1); cell.border = bord; cell.font = { name: "Arial", size: 10 };
          if (col.kind === "calc") { const f = toFormula(col.expr || "", b, r); const res = C().calcCell(b, row, i, 0); cell.value = { formula: f, result: res === null ? 0 : res }; cell.numFmt = "#,##0.##"; cell.fill = fillC(SOFT); cell.font = { name: "Arial", size: 10, bold: true }; cell.alignment = al({ horizontal: "center" }); }
          else if (col.kind === "num") { const n = C().num(row[i]); if (n !== null) { cell.value = n; cell.numFmt = "#,##0.##"; } else cell.value = row[i] || null; cell.alignment = al({ horizontal: "center" }); }
          else { cell.value = row[i] || null; cell.alignment = al(); } }); ws.getRow(r).height = 22; r++; });
        if (b.total && b.rows.length && b.cols.some((x) => x.kind !== "text")) { let f1 = true;
          b.cols.forEach((col, i) => { const cell = ws.getCell(r, i + 1); cell.border = bord; cell.fill = fillC("DCEBF4"); cell.font = { name: "Arial", bold: true, size: 10 };
            if (col.kind === "text") { if (f1) { cell.value = b.totalLabel || (rtl ? "الإجمالي" : "Total"); f1 = false; } cell.alignment = al(); }
            else { let s = 0; b.rows.forEach((row) => { const v = val(b, row, i); if (v !== null) s += v; }); cell.value = { formula: `SUM(${colL(i)}${first}:${colL(i)}${r - 1})`, result: s }; cell.numFmt = "#,##0.##"; cell.alignment = al({ horizontal: "center" }); } });
          r++; }
        ws.getRow(hr).getCell(1).alignment = al({ horizontal: "center" }); r++;
      }
    }
    const buf = await wb.xlsx.writeBuffer();
    return new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  }

  /* ---------------- REGISTRY XLSX ---------------- */
  async function toRegistryXlsx(docsList) {
    const wb = new ExcelJS.Workbook();
    wb.creator = "SEVEN HANDS IT Department";
    const ws = wb.addWorksheet("سجل المستندات المركزي", {
      views: [{ rightToLeft: true, showGridLines: true }],
      pageSetup: { orientation: "landscape", paperSize: 9, fitToPage: true }
    });

    ws.columns = [
      { header: "م", key: "idx", width: 6 },
      { header: "كود المستند", key: "code", width: 24 },
      { header: "عنوان المستند", key: "title", width: 40 },
      { header: "القسم", key: "dept", width: 18 },
      { header: "الحالة", key: "status", width: 16 },
      { header: "المُعد", key: "author", width: 24 },
      { header: "المُراجع", key: "reviewer", width: 24 },
      { header: "تاريخ آخر تعديل", key: "updated", width: 20 }
    ];

    const headRow = ws.getRow(1);
    headRow.height = 28;
    headRow.font = { name: "Arial", size: 11, bold: true, color: { argb: "FFFFFFFF" } };
    headRow.alignment = { horizontal: "center", vertical: "middle" };
    headRow.eachCell((cell) => {
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF094878" } };
      cell.border = {
        top: { style: "thin", color: { argb: "FF8A92A0" } },
        bottom: { style: "thin", color: { argb: "FF8A92A0" } },
        left: { style: "thin", color: { argb: "FF8A92A0" } },
        right: { style: "thin", color: { argb: "FF8A92A0" } }
      };
    });

    docsList.forEach((d, i) => {
      const row = ws.addRow({
        idx: i + 1,
        code: d.docNumber || "SH-DOC-2026-" + String(i + 1).padStart(4, "0"),
        title: d.name || d.title || "مستند بدون عنوان",
        dept: d.dept || "عام",
        status: d.status === "approved" ? "معتمد" : d.status === "review" ? "قيد المراجعة" : "مسودة",
        author: "م. صلاح (مهندس علوم حاسب)",
        reviewer: "م. عصام (مدير IT)",
        updated: new Date(d.updated || Date.now()).toLocaleDateString("ar-EG")
      });
      row.height = 22;
      row.alignment = { horizontal: "center", vertical: "middle" };
      row.getCell("title").alignment = { horizontal: "right", vertical: "middle" };
    });

    const buf = await wb.xlsx.writeBuffer();
    return new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  }

  /* ---------------- PDF ----------------
     Rendered by the browser itself (SVG foreignObject) so Arabic shaping stays correct, then sliced to A4 at row boundaries. */
  const b64 = (buf) => { let s = "", u = new Uint8Array(buf); for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); return btoa(s); };
  let cssCache = null;
  async function inlineCss() {
    if (cssCache) return cssCache;
    let css = await (await fetch("style.css")).text(); css = css.replace(/@media print\{[\s\S]*$/, "");
    const urls = Array.from(new Set(Array.from(css.matchAll(/url\((fonts\/[^)]+)\)/g)).map((m) => m[1])));
    for (const u of urls) { const r = await fetch(u); css = css.split("url(" + u + ")").join("url(data:font/woff2;base64," + b64(await r.arrayBuffer()) + ")"); }
    return (cssCache = css);
  }
  async function toPdf(pageEl, d, filename) {
    await document.fonts.ready;
    const css = await inlineCss(); const prevZoom = pageEl.style.zoom; pageEl.style.zoom = 1;
    const W = pageEl.offsetWidth, H = pageEl.offsetHeight, top0 = pageEl.getBoundingClientRect().top;
    const safe = Array.from(pageEl.querySelectorAll("tr,.blk,.ph,.meta,.mf")).map((e) => Math.round(e.getBoundingClientRect().bottom - top0)).concat([H]).sort((a, b) => a - b);
    const tops = Array.from(pageEl.querySelectorAll("tr,.blk,.ph")).map((e) => Math.round(e.getBoundingClientRect().top - top0));
    const clone = pageEl.cloneNode(true); pageEl.style.zoom = prevZoom;
    clone.querySelectorAll(".no-print").forEach((e) => e.remove()); clone.querySelectorAll("[contenteditable]").forEach((e) => e.removeAttribute("contenteditable"));
    clone.style.cssText = `width:${W}px;height:${H}px;margin:0;box-shadow:none;zoom:1;box-sizing:border-box`;
    const lg = clone.querySelector(".ph-logo"); if (lg) { try { const r = await fetch("logo.png"); lg.setAttribute("src", "data:image/png;base64," + b64(await r.arrayBuffer())); } catch (e) {} }
    const xml = new XMLSerializer().serializeToString(clone);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><foreignObject x="0" y="0" width="${W}" height="${H}"><div xmlns="http://www.w3.org/1999/xhtml" style="width:${W}px;height:${H}px"><style>${css}</style>${xml}</div></foreignObject></svg>`;
    const img = new Image(); await new Promise((res, rej) => { img.onload = res; img.onerror = () => rej(new Error("render failed")); img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg); });
    const SC = 2, full = document.createElement("canvas"); full.width = W * SC; full.height = H * SC; const fx = full.getContext("2d"); fx.fillStyle = "#fff"; fx.fillRect(0, 0, full.width, full.height); fx.drawImage(img, 0, 0, full.width, full.height);
    const land = d.orient === "landscape", pw = land ? 297 : 210, ph = land ? 210 : 297, m = 6, cw = pw - 2 * m, chMm = ph - 2 * m;
    const pagePx = Math.floor((chMm / cw) * W);            // content height in page px
    const cuts = [0]; let start = 0;
    while (H - start > pagePx + 1) { const lim = start + pagePx; let cut = 0; for (const y of safe) if (y <= lim && y > start + 40) cut = y; if (!cut || tops.some((t) => t > start + 40 && t < lim && cut < t - 1 && false)) cut = lim; cuts.push(cut); start = cut; }
    cuts.push(H);
    const seed = document.createElement("canvas"); seed.width = seed.height = 2;
    const pdf = await window.html2pdf().set({ jsPDF: { unit: "mm", format: "a4", orientation: d.orient } }).from(seed, "canvas").toPdf().get("pdf");
    const n0 = pdf.getNumberOfPages();
    for (let i = 0; i < cuts.length - 1; i++) {
      const y0 = cuts[i], y1 = cuts[i + 1], sl = document.createElement("canvas"); sl.width = W * SC; sl.height = Math.max(1, (y1 - y0) * SC);
      const sx = sl.getContext("2d"); sx.fillStyle = "#fff"; sx.fillRect(0, 0, sl.width, sl.height); sx.drawImage(full, 0, y0 * SC, W * SC, (y1 - y0) * SC, 0, 0, W * SC, (y1 - y0) * SC);
      pdf.addPage([pw, ph], d.orient); pdf.addImage(sl.toDataURL("image/jpeg", 0.95), "JPEG", m, m, cw, ((y1 - y0) / W) * cw);
    }
    for (let k = 0; k < n0; k++) pdf.deletePage(1);
    pdf.setProperties({ title: d.title, creator: "SEVEN HANDS" }); pdf.save(filename);
  }
  window.SHEXPORT = { docx: toDocx, xlsx: toXlsx, pdf: toPdf, registryXlsx: toRegistryXlsx };
})();
