# SEVEN HANDS Docs

🔗 **Live Deployment**: [https://sevenhands-eta.vercel.app/](https://sevenhands-eta.vercel.app/)  
📦 **GitHub Repository**: [https://github.com/29SalahMo/SevenHands](https://github.com/29SalahMo/SevenHands)

محرر قوالب وأوراق عمل (عربي/English) لقسم تكنولوجيا المعلومات في شركة **سفن هاندز للخدمات الهندسية والمقاولات**.  
Interactive worksheet & template editor for engineering IT work: price comparison sheets, quotations, RFQs, purchase requests, inventory and survey forms.

## Features
- **Interactive Routing & Navigation**: Full browser back/forward and mobile swipe support between sheets and the template library.
- **WhatsApp & Social Cards**: Rich link preview with official branding and 1-click WhatsApp document sharing.
- **Interactive Preloader**: High-tech engineering loading screen with smooth progress, status updates, and instant skip controls.
- **Live Search & Filter**: Real-time keyword search and category pills across templates and saved sheets.
- **Live Calculation Engine**: Real-time formula calculations (`qty*price`, `MIN(sig,nek,bos)`, `SUM`) with visual reactive pulse feedback.
- **Autosave & Privacy**: Client-side autosave in the browser (`localStorage`) with JSON export/import for cross-device migration.
- **Multi-Format Export**: Instant download as **Word (.docx)**, **Excel (.xlsx)** with live formulas, or **PDF**; plus direct print.
- **Pure Static Architecture**: Zero build step, zero backend required. Vendored libraries (`docx`, `exceljs`, `html2pdf`).

## Run locally
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deployment
- **Platform**: Vercel
- **Production URL**: [https://sevenhands-eta.vercel.app/](https://sevenhands-eta.vercel.app/)
- **Repository**: [https://github.com/29SalahMo/SevenHands](https://github.com/29SalahMo/SevenHands)
- **Settings**: Framework Preset "Other", no build command, output directory = repo root.
