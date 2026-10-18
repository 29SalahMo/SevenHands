import React from 'react';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

/**
 * SEVEN HANDS - Root Layout Component
 * Integrates Vercel Web Analytics and Speed Insights for Next.js App Router / Pages Router
 *
 * Prepared for: Eng. Salah, IT Department
 * Corporate: SEVEN HANDS For Engineering Services & Construction
 */
export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <title>شركة سفن هاندز للخدمات الهندسية والمقاولات | SEVEN HANDS</title>
        <meta name="description" content="المنظومة الرقمية المعتمدة لشركة سفن هاندز للخدمات الهندسية والمقاولات" />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
