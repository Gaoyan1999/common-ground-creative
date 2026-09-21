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
