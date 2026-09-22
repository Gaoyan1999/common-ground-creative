import { z } from 'zod';

export const healthResponseSchema = z.object({
  status: z.literal('ok'),
  timestamp: z.string().datetime(),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;

export const marketAnalysisSchema = z.object({
  summary: z.string().min(1).max(1_200),
  productFit: z.string().min(1).max(120),
  primaryAudience: z.string().min(1).max(120),
  openingChannel: z.string().min(1).max(120),
  marketOpportunity: z.string().min(1).max(900),
});

export type MarketAnalysis = z.infer<typeof marketAnalysisSchema>;

const reportText = (max: number) => z.string().min(1).max(max);

export const marketEntryReportSchema = z.object({
  brandName: reportText(80),
  reportTitle: reportText(100),
  business: reportText(320),
  market: reportText(320),
  customers: reportText(320),
  strategy: reportText(320),
  budget: reportText(320),
  campaign: reportText(320),
});

export type MarketEntryReport = z.infer<typeof marketEntryReportSchema>;
