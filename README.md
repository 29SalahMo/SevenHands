# SEVEN HANDS Docs

محرر قوالب وأوراق عمل (عربي/English) لقسم تكنولوجيا المعلومات في سفن هاندز.
Template editor for IT work documents: price-comparison sheets, quotations, RFQs, purchase requests, inventory and survey forms.

- Edit any text or cell directly; add rows, columns and blocks; formulas such as `qty*price` or `MIN(a,b,c)`
- Autosave in the browser (localStorage); export/import JSON to move documents between devices
- Download as **Word (.docx)**, **Excel (.xlsx)** with live formulas, or **PDF**; or print
- Pure static site: no build step, no backend. Libraries are vendored (docx, ExcelJS, html2pdf).

## Run locally
    python3 -m http.server 8000   # then open http://localhost:8000

## Deploy
Vercel: import the repo, Framework Preset "Other", no build command, output directory = repo root.
