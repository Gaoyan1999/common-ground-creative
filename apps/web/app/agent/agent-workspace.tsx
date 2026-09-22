'use client';

import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';
import type { MarketAnalysis, MarketEntryReport } from '@common-ground/shared';

type Stage = 'upload' | 'signal' | 'summary';
type BriefContext = {
  brand: string;
  role: string;
  website: string;
  businessType: string;
  monthlyRevenue: string;
  goals: string;
};

const MAYA_CONTEXT_STORAGE_KEY = 'common-ground:maya-context';
const MAYA_TRANSCRIPT_STORAGE_KEY = 'common-ground:maya-transcript';

function compactContext(value: string, limit: number) {
  const cleanValue = value.replace(/\s+/g, ' ').trim();
  return cleanValue.length > limit ? `${cleanValue.slice(0, limit - 1).trim()}…` : cleanValue;
}

function saveMayaCallContext(briefContext: BriefContext, analysis: MarketAnalysis | null) {
  const context = [
    briefContext.brand && `Brand: ${compactContext(briefContext.brand, 80)}`,
    briefContext.businessType && `Business: ${briefContext.businessType}`,
    briefContext.monthlyRevenue && `Revenue range: ${briefContext.monthlyRevenue}`,
    briefContext.goals && `Stated goal: ${compactContext(briefContext.goals, 220)}`,
    analysis?.summary && `Initial analysis: ${compactContext(analysis.summary, 360)}`,
    analysis?.productFit && `Product fit: ${compactContext(analysis.productFit, 120)}`,
    analysis?.primaryAudience && `Likely audience: ${compactContext(analysis.primaryAudience, 120)}`,
    analysis?.openingChannel && `Potential opening channel: ${compactContext(analysis.openingChannel, 120)}`,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    if (context) window.sessionStorage.setItem(MAYA_CONTEXT_STORAGE_KEY, context.slice(0, 1_100));
  } catch {
    // The call can still start if browser storage is unavailable.
  }
}

function getStoredValue(key: string) {
  try {
    return window.sessionStorage.getItem(key) ?? '';
  } catch {
    return '';
  }
}

function PhoneIcon() {
  return (
    <svg className="button-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.2 3.8 9.1 7l-1.7 2.8c1 2.1 2.7 3.8 4.8 4.8l2.8-1.7 3.2 2.9-1.6 3.1c-.3.6-1 .9-1.7.8C8.7 18.8 5.2 15.3 4.3 9.1c-.1-.7.2-1.4.8-1.7l1.1-.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AnalysisIcon() {
  return (
    <svg className="button-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 3.5h10l4 4V20.5H5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M15 3.5v4h4M8.5 16l2.3-2.4 2 1.5 3-3.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DemoMarketReport({ report }: { report: MarketEntryReport }) {
  return (
    <article className="market-report" aria-label="Demo Australian market-entry report">
      <section className="report-page report-page--cover">
        <header className="report-header">
          <span className="report-brand">COMMON<br />GROUND<br />CREATIVE</span>
          <span>AUSTRALIAN MARKET ENTRY REPORT</span>
          <b>DEMO</b>
        </header>
        <div className="report-cover-copy">
          <p>SYDNEY / AUSTRALIA / SEPTEMBER 2026</p>
          <h3>{report.brandName}<br /><em>{report.reportTitle}</em></h3>
          <p className="report-lead">
            {report.executiveSummary}
          </p>
        </div>
        <div className="report-kpis">
          <div><span>PRIMARY AUDIENCE</span><b>Priority</b><small>{report.primaryAudience}</small></div>
          <div><span>OPENING MARKET</span><b>Australia</b><small>validate local fit before scale</small></div>
          <div><span>TEST WINDOW</span><b>90 days</b><small>focused learning period</small></div>
        </div>
        <footer>Prepared for demo purposes · Common Ground Creative</footer>
      </section>

      <section className="report-page">
        <header className="report-header">
          <span className="report-brand">COMMON<br />GROUND<br />CREATIVE</span>
          <span>01 / OPPORTUNITY &amp; AUDIENCE</span>
          <b>01</b>
        </header>
        <div className="report-section-heading">
          <p>EXECUTIVE SUMMARY</p>
          <h3>{report.opportunityHeadline}</h3>
          <p>
            {report.marketOpportunity}
          </p>
        </div>
        <div className="report-insight-grid">
          <article><span>01 / POSITIONING</span><h4>{report.positioning}</h4><p>Use this as the clearest local entry point across the product story, creator brief and landing page.</p></article>
          <article><span>02 / CUSTOMER</span><h4>{report.primaryAudience}</h4><p>Prioritise the customer tension and decision trigger over broad demographic reach.</p></article>
          <article><span>03 / COMMERCIAL SIGNAL</span><h4>{report.commercialSignal}</h4><p>Use the first market test to validate this commercial assumption before expanding investment.</p></article>
        </div>
        <div className="report-callout"><span>RECOMMENDATION</span><p>{report.recommendation}</p></div>
        <footer>Solace Skin demo report · Page 2 of 3</footer>
      </section>

      <section className="report-page">
        <header className="report-header">
          <span className="report-brand">COMMON<br />GROUND<br />CREATIVE</span>
          <span>02 / GO-TO-MARKET PLAN</span>
          <b>02</b>
        </header>
        <div className="report-section-heading report-section-heading--compact">
          <p>CHANNEL &amp; ACTIVATION</p>
          <h3>Build proof in public,<br /><em>then buy scale.</em></h3>
        </div>
        <div className="report-table" role="table" aria-label="90-day launch plan">
          <div className="report-table-row report-table-head" role="row"><span>PHASE</span><span>FOCUS</span><span>SUCCESS SIGNAL</span></div>
          {report.ninetyDayPlan.map((step) => (
            <div className="report-table-row" role="row" key={step.phase}><span>{step.phase}</span><span>{step.focus}</span><span>{step.successSignal}</span></div>
          ))}
        </div>
        <div className="report-bottom-grid">
          <div><span>CHANNEL PRIORITY</span><ol>{report.channelPriorities.map((item) => <li key={item.channel}><b>{item.channel}</b> - {item.rationale}</li>)}</ol></div>
          <div><span>WATCHOUTS</span><p>{report.watchouts.join(' ')}</p></div>
        </div>
        <div className="report-callout"><span>NEXT DECISION</span><p>{report.nextDecision}</p></div>
        <footer>Solace Skin demo report · Page 3 of 3</footer>
      </section>
    </article>
  );
}

export default function AgentWorkspace({ initialStage }: { initialStage: 'upload' | 'summary' }) {
  const [stage, setStage] = useState<Stage>(initialStage);
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [analysis, setAnalysis] = useState<MarketAnalysis | null>(null);
  const [report, setReport] = useState<MarketEntryReport | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(initialStage === 'summary');
  const [reportError, setReportError] = useState('');
  const [analysisError, setAnalysisError] = useState('');
  const [briefContext, setBriefContext] = useState<BriefContext>({
    brand: '',
    role: '',
    website: '',
    businessType: '',
    monthlyRevenue: '',
    goals: '',
  });
  const progress = stage === 'upload' ? 1 : stage === 'signal' ? 2 : 4;
  useEffect(() => {
    if (initialStage !== 'summary') return;

    const background = getStoredValue(MAYA_CONTEXT_STORAGE_KEY);
    const transcript = getStoredValue(MAYA_TRANSCRIPT_STORAGE_KEY);
    if (!background && !transcript) {
      setIsGeneratingReport(false);
      setReportError('Start with company context and a Maya conversation to generate your report.');
      return;
    }

    let cancelled = false;
    async function generateReport() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}/report/generate`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ background, transcript }),
          },
        );
        const result = (await response.json()) as MarketEntryReport | { message?: string };
        if (!response.ok || !('executiveSummary' in result)) {
          throw new Error('message' in result ? result.message : 'The report could not be generated.');
        }
        if (!cancelled) setReport(result);
      } catch (error) {
        if (!cancelled) {
          setReportError(error instanceof Error ? error.message : 'The report could not be generated.');
        }
      } finally {
        if (!cancelled) setIsGeneratingReport(false);
      }
    }
    void generateReport();

    return () => {
      cancelled = true;
    };
  }, [initialStage]);
  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);
      setAnalysisError('');
    }
  }
  function updateBriefContext(field: keyof BriefContext, value: string) {
    setBriefContext((current) => ({ ...current, [field]: value }));
  }
  async function analyseDocument() {
    setIsAnalysing(true);
    setAnalysisError('');
    try {
      const body = new FormData();
      const context = [
        briefContext.brand && `Brand: ${briefContext.brand}`,
        briefContext.role && `Role: ${briefContext.role}`,
        briefContext.website && `Website: ${briefContext.website}`,
        briefContext.businessType && `Business type: ${briefContext.businessType}`,
        briefContext.monthlyRevenue && `Monthly revenue: ${briefContext.monthlyRevenue}`,
        briefContext.goals && `Goals: ${briefContext.goals}`,
      ]
        .filter(Boolean)
        .join('\n');
      if (context) body.append('briefContext', context);
      if (file) body.append('document', file);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}/brief/analyse`,
        { method: 'POST', body },
      );
      const result = (await response.json()) as MarketAnalysis | { message?: string };
      if (!response.ok || !('summary' in result)) {
        throw new Error('message' in result ? result.message : 'Analysis could not be completed.');
      }
      saveMayaCallContext(briefContext, result);
      setAnalysis(result);
      setStage('signal');
    } catch (error) {
      setAnalysisError(error instanceof Error ? error.message : 'Analysis could not be completed.');
    } finally {
      setIsAnalysing(false);
    }
  }

  return (
    <main className="agent-page">
      <nav className="agent-top">
        <Link className="wordmark" href="/">
          COMMON<span>GROUND</span>
          <i>®</i>
        </Link>
        <Link className="back-link" href="/">
          ← HOME
        </Link>
        <span className="agent-status">
          <b /> BRIEFING AGENT ONLINE
        </span>
      </nav>
      <div className="agent-layout">
        <aside className="agent-aside">
          <p className="eyebrow">AU MARKET ENTRY / 0{progress}</p>
          <h1>
            {stage === 'summary' ? (
              <>
                Your market-entry
                <br />
                <em>readout.</em>
              </>
            ) : (
              <>
                Start with
                <br />
                <em>your story.</em>
              </>
            )}
          </h1>
          <p>
            {stage === 'summary'
              ? 'Your company context and discussion with Maya are now organised into a concise launch brief.'
              : 'Share whatever company context you have. We&apos;ll use it to create a first local read before your market-entry conversation.'}
          </p>
          <div className="mini-process">
            <div className={progress === 1 ? 'is-current' : ''}>
              <strong>1</strong> Company context
            </div>
            <div className={progress === 2 ? 'is-current' : ''}>
              <strong>2</strong> Market signal
            </div>
            <div>
              <strong>3</strong> Expert call
            </div>
            <div className={progress === 4 ? 'is-current' : ''}>
              <strong>4</strong> Final report
            </div>
          </div>
        </aside>
        <section className="agent-workspace">
          <div className="conversation">
            {stage === 'upload' && (
              <div className="upload-stage">
                <p className="message-label">STEP 01 / COMPANY CONTEXT</p>
                <h2>
                  Share your company
                  <br />
                  <em>context.</em>
                </h2>
                <p>
                  Add as much or as little as you have. A company deck, product brief or existing
                  market plan can help, but is not required.
                </p>
                <section className="brief-submission" aria-labelledby="brief-submission-title">
                  <div className="brief-submission-heading">
                    <div>
                      <p>COMPANY CONTEXT</p>
                      <h3 id="brief-submission-title">Tell us what you can</h3>
                    </div>
                    <span>All optional</span>
                  </div>
                  <div className="brief-form">
                    <label>
                      Company or brand name
                      <input
                        value={briefContext.brand}
                        onChange={(event) => updateBriefContext('brand', event.target.value)}
                        placeholder="Your brand or business"
                      />
                    </label>
                    <label>
                      Your role
                      <input
                        value={briefContext.role}
                        onChange={(event) => updateBriefContext('role', event.target.value)}
                        placeholder="Founder, Head of Growth…"
                      />
                    </label>
                    <label>
                      Website URL
                      <input
                        type="url"
                        value={briefContext.website}
                        onChange={(event) => updateBriefContext('website', event.target.value)}
                        placeholder="https://yoursite.com"
                      />
                    </label>
                    <div className="brief-form-grid">
                      <label>
                        Business type
                        <select
                          value={briefContext.businessType}
                          onChange={(event) =>
                            updateBriefContext('businessType', event.target.value)
                          }
                        >
                          <option value="">Select one</option>
                          <option>DTC / Ecommerce</option>
                          <option>Marketplace brand</option>
                          <option>Retail brand</option>
                          <option>Service business</option>
                          <option>Other</option>
                        </select>
                      </label>
                      <label>
                        Monthly revenue
                        <select
                          value={briefContext.monthlyRevenue}
                          onChange={(event) =>
                            updateBriefContext('monthlyRevenue', event.target.value)
                          }
                        >
                          <option value="">Select a range</option>
                          <option>Pre-revenue</option>
                          <option>Under A$25k</option>
                          <option>A$25k–A$100k</option>
                          <option>A$100k–A$500k</option>
                          <option>Over A$500k</option>
                        </select>
                      </label>
                    </div>
                    <label>
                      What are you looking to achieve?
                      <textarea
                        rows={4}
                        value={briefContext.goals}
                        onChange={(event) => updateBriefContext('goals', event.target.value)}
                        placeholder="Tell us about your goals, challenges, or what you want to validate in Australia."
                      />
                    </label>
                  </div>
                  <div className="brief-upload">
                    <div className="brief-upload-label">
                      <span>REFERENCE DOCUMENT</span>
                      <small>Optional · PDF only</small>
                    </div>
                    <label className={`upload-box ${fileName ? 'has-file' : ''}`}>
                      <input type="file" accept="application/pdf,.pdf" onChange={selectFile} />
                      <span className="upload-icon">↥</span>
                      <span>
                        <b>{fileName || 'Drop a PDF here, or browse'}</b>
                        <small>
                          {fileName
                            ? 'Ready for analysis'
                            : 'Company deck · Product brief · Brand presentation'}
                        </small>
                      </span>
                      {fileName && <i>PDF</i>}
                    </label>
                  </div>
                </section>
                <button className="analyse-button" disabled={isAnalysing} onClick={analyseDocument}>
                  {isAnalysing ? 'Analysing company context…' : 'Analyse company context'}{' '}
                  <span>↗</span>
                </button>
                {analysisError && (
                  <p className="upload-error" role="alert">
                    {analysisError}
                  </p>
                )}
                <p className="upload-note">Your document is used only to generate this analysis.</p>
              </div>
            )}
            {stage === 'signal' && (
              <>
                <div className="message assistant-message">
                  <p className="message-label">COMMON GROUND / ANALYSIS COMPLETE</p>
                  <p>{analysis?.summary}</p>
                </div>
                <article className="brief-card">
                  <div className="brief-card-top">
                    <div>
                      <p>INITIAL MARKET SIGNAL</p>
                      <h2>Australian opportunity</h2>
                    </div>
                    <span>EARLY VIEW</span>
                  </div>
                  <div className="brief-insight">
                    <div>
                      <span>PRODUCT FIT</span>
                      <b>{analysis?.productFit}</b>
                    </div>
                    <div>
                      <span>PRIMARY AUDIENCE</span>
                      <b>{analysis?.primaryAudience}</b>
                    </div>
                    <div>
                      <span>OPENING CHANNEL</span>
                      <b>{analysis?.openingChannel}</b>
                    </div>
                  </div>
                  <p>{analysis?.marketOpportunity}</p>
                  <div className="brief-card-actions">
                    <Link
                      href="/call"
                      className="dark-button"
                      onClick={() => saveMayaCallContext(briefContext, analysis)}
                    >
                      Discuss this with Maya ↗
                    </Link>
                    <button className="outline-button" onClick={() => setStage('upload')}>
                      Replace document
                    </button>
                  </div>
                </article>
                <div className="next-step">
                  <span>02</span>
                  <p>
                    Next: talk through the opportunity with our virtual market-entry advisor. Your
                    call creates the context for your final report.
                  </p>
                </div>
              </>
            )}
            {stage === 'summary' && (
              <div className="summary-workspace">
                <p className="message-label">STEP 04 / REPORT READY</p>
                <h2>
                  Your market-entry
                  <br />
                  <em>report is ready.</em>
                </h2>
                <p className="summary-intro">
                  A concise, decision-ready starting point for your team and the marketing
                  specialist who will shape your Australian launch.
                </p>
                {isGeneratingReport && (
                  <div className="report-loading" role="status" aria-live="polite">
                    <div className="report-loading-mark" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </div>
                    <div>
                      <p className="message-label">COMMON GROUND / REPORT GENERATING</p>
                      <h3>Building your market-entry readout</h3>
                      <p>Maya&apos;s conversation, your brief and the market signals are being organised into a structured report.</p>
                      <div className="report-loading-track" aria-hidden="true"><i /></div>
                    </div>
                  </div>
                )}
                {report && <DemoMarketReport report={report} />}
                {reportError && <p className="upload-error" role="alert">{reportError}</p>}
                <div className="summary-actions">
                  <Link className="continue-call" href="/call">
                    <PhoneIcon /> Continue conversation
                  </Link>
                  <button
                    className="analyse-button generate-report"
                    type="button"
                    disabled={!report}
                    onClick={() => window.print()}
                  >
                    <AnalysisIcon /> Export PDF report
                  </button>
                </div>
                <p className="upload-note">
                  Your report is structured from the submitted brief and Maya&apos;s call transcript. Review recommendations before treating them as final market evidence.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
