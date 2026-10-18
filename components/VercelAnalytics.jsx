import React from 'react';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

/**
 * SEVEN HANDS - Vercel Analytics & Speed Insights Component
 * For React and Next.js Application Layouts
 *
 * Prepared for: Eng. Salah, IT Department
 * Corporate: SEVEN HANDS For Engineering Services & Construction
 */
export function VercelAnalytics() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default VercelAnalytics;
