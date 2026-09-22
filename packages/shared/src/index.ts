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
  executiveSummary: reportText(600),
  opportunityHeadline: reportText(120),
  marketOpportunity: reportText(420),
  primaryAudience: reportText(180),
  positioning: reportText(180),
  commercialSignal: reportText(180),
  recommendation: reportText(260),
  channelPriorities: z
    .array(
      z.object({
        channel: reportText(80),
        rationale: reportText(180),
      }),
    )
    .min(3)
    .max(3),
  ninetyDayPlan: z
    .array(
      z.object({
        phase: reportText(40),
        focus: reportText(220),
        successSignal: reportText(180),
      }),
    )
    .min(3)
    .max(3),
  watchouts: z.array(reportText(180)).min(2).max(4),
  nextDecision: reportText(220),
});

export type MarketEntryReport = z.infer<typeof marketEntryReportSchema>;
