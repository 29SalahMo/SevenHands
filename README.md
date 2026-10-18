# شركة سفن هاندز للخدمات الهندسية والمقاولات
## SEVEN HANDS For Engineering Services & Construction

🔗 **Live Deployment**: [https://sevenhands-eta.vercel.app/](https://sevenhands-eta.vercel.app/)  
📦 **GitHub Repository**: [https://github.com/29SalahMo/SevenHands](https://github.com/29SalahMo/SevenHands)

المنظومة الرقمية الرسمية المعتمدة لشركة **سفن هاندز للخدمات الهندسية والمقاولات** لإدارة وتوثيق النماذج واللوائح، أوراق العمل، عروض ومقارنة الأسعار، وطلبات الشراء لكافة أقسام الشركة.  
Comprehensive Enterprise Operations, Documents, ISO Templates & Bylaws Portal for **SEVEN HANDS For Engineering Services & Construction**.

## Key Features
- **Corporate Department Partitions**: Dedicated workspace partitions for **Finance & Accounting**, **Engineering & Projects**, **Human Resources & Bylaws**, **Procurement & Pricing**, **IT Operations**, and **Executive Management & Secretary**.
- **Accountant Suite & Arabic Currency Tafqeet**: Interactive financial calculator and Arabic text converter (التفقيط المالي باللغة العربية) with live calculation of VAT 14%, WHT 1%/3%, 5% retention, and 10% advance payments.
- **Interactive HR Bylaws Reader**: Complete 7-page interactive digitization of the official SEVEN HANDS HR Policy with search, article tabs, and instant print.
- **42 Approved ISO Templates**: Full library of official company forms with unified ISO headers (`F-08/10 A/B/C/F`, retention 3-5 years) including cash/cheque payment vouchers, receipt vouchers, petty cash reconciliation, subcontractor interim payment certificates, monthly payroll, advance requests, tax audits, leaves, overtime sheets (1.4x), and procurement orders.
- **Central Document Registry**: Auto-generated corporate document serial numbering (`SH-DOC-2026-XXXX`).
- **Interactive Routing & Navigation**: Full browser back/forward and mobile swipe support between sheets and the template library.
- **WhatsApp & Social Cards**: Rich 1200x630 link preview with official branding and 1-click WhatsApp document sharing.
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
