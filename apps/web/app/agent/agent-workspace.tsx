'use client';

import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import type { MarketAnalysis } from '@common-ground/shared';

type Stage = 'upload' | 'signal' | 'summary' | 'report';
type BriefContext = {
  brand: string;
  role: string;
  website: string;
  businessType: string;
  monthlyRevenue: string;
  goals: string;
};

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

export default function AgentWorkspace({ initialStage }: { initialStage: 'upload' | 'summary' }) {
  const [stage, setStage] = useState<Stage>(initialStage);
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [analysis, setAnalysis] = useState<MarketAnalysis | null>(null);
  const [analysisError, setAnalysisError] = useState('');
  const [briefContext, setBriefContext] = useState<BriefContext>({
    brand: '',
    role: '',
    website: '',
    businessType: '',
    monthlyRevenue: '',
    goals: '',
  });
  const progress = stage === 'upload' ? 1 : stage === 'signal' ? 2 : stage === 'summary' ? 3 : 4;
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
    if (!file) return;
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
      body.append('document', file);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}/brief/analyse`,
        { method: 'POST', body },
      );
      const result = (await response.json()) as MarketAnalysis | { message?: string };
      if (!response.ok || !('summary' in result)) {
        throw new Error('message' in result ? result.message : 'Analysis could not be completed.');
      }
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
            {stage === 'summary' || stage === 'report' ? (
              <>
                Your local
                <br />
                <em>story, clarified.</em>
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
            {stage === 'summary' || stage === 'report'
              ? 'Your company context and discussion with Maya are now one clear market-entry narrative.'
              : 'Share the company document you already have. We&apos;ll use it to create a first local read before your market-entry conversation.'}
          </p>
          <div className="mini-process">
            <div className={progress === 1 ? 'is-current' : ''}>
              <strong>1</strong> Company document
            </div>
            <div className={progress === 2 ? 'is-current' : ''}>
              <strong>2</strong> Market signal
            </div>
            <div className={progress === 3 ? 'is-current' : ''}>
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
                  Upload your company
                  <br />
                  <em>overview.</em>
                </h2>
                <p>
                  A company deck, product brief or existing market plan is enough. PDF only for this
                  MVP.
                </p>
                <details className="brief-submission">
                  <summary>Make your brief more specific <span>Optional</span></summary>
                  <div className="brief-form">
                    <label>
                      Company or brand name
                      <input value={briefContext.brand} onChange={(event) => updateBriefContext('brand', event.target.value)} placeholder="Your brand or business" />
                    </label>
                    <label>
                      Your role
                      <input value={briefContext.role} onChange={(event) => updateBriefContext('role', event.target.value)} placeholder="Founder, Head of Growth…" />
                    </label>
                    <label>
                      Website URL
                      <input type="url" value={briefContext.website} onChange={(event) => updateBriefContext('website', event.target.value)} placeholder="https://yoursite.com" />
                    </label>
                    <div className="brief-form-grid">
                      <label>
                        Business type
                        <select value={briefContext.businessType} onChange={(event) => updateBriefContext('businessType', event.target.value)}>
                          <option value="">Select one</option><option>DTC / Ecommerce</option><option>Marketplace brand</option><option>Retail brand</option><option>Service business</option><option>Other</option>
                        </select>
                      </label>
                      <label>
                        Monthly revenue
                        <select value={briefContext.monthlyRevenue} onChange={(event) => updateBriefContext('monthlyRevenue', event.target.value)}>
                          <option value="">Select a range</option><option>Pre-revenue</option><option>Under A$25k</option><option>A$25k–A$100k</option><option>A$100k–A$500k</option><option>Over A$500k</option>
                        </select>
                      </label>
                    </div>
                    <label>
                      What are you looking to achieve?
                      <textarea rows={4} value={briefContext.goals} onChange={(event) => updateBriefContext('goals', event.target.value)} placeholder="Tell us about your goals, challenges, or what you want to validate in Australia." />
                    </label>
                  </div>
                </details>
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
                <button
                  className="analyse-button"
                  disabled={!file || isAnalysing}
                  onClick={analyseDocument}
                >
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
                    <Link href="/call" className="dark-button">
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
                <p className="message-label">STEP 03 / CALL SUMMARY</p>
                <h2>
                  Your call, turned into
                  <br />
                  <em>clear next moves.</em>
                </h2>
                <p className="summary-intro">
                  You and Maya explored how your barrier-care proposition can translate for
                  Australian buyers: lead with clinical proof, launch around one hero product, and
                  validate the message with creators before scaling paid media.
                </p>
                <article className="summary-card">
                  <div className="summary-card-head">
                    <span>AI CALL SYNTHESIS</span>
                    <b>CONTEXT COMPLETE</b>
                  </div>
                  <div className="summary-point">
                    <span>01</span>
                    <div>
                      <h3>Positioning to lead with</h3>
                      <p>
                        Barrier-care efficacy that feels simple enough for everyday Australian
                        routines — grounded in clinical proof, not skincare jargon.
                      </p>
                    </div>
                  </div>
                  <div className="summary-point">
                    <span>02</span>
                    <div>
                      <h3>Launch focus</h3>
                      <p>
                        Open with one hero product and creator-led education. Keep the first market
                        test focused before widening the range.
                      </p>
                    </div>
                  </div>
                  <div className="summary-point">
                    <span>03</span>
                    <div>
                      <h3>First channel mix</h3>
                      <p>
                        Use Meta for high-intent learning, supported by selective creator seeding to
                        build the local proof your audience needs.
                      </p>
                    </div>
                  </div>
                </article>
                <div className="summary-actions">
                  <Link className="continue-call" href="/call">
                    <PhoneIcon /> Continue conversation
                  </Link>
                  <button
                    className="analyse-button generate-report"
                    onClick={() => setStage('report')}
                  >
                    <AnalysisIcon /> Preview business analysis
                  </button>
                </div>
                <p className="upload-note">
                  You can keep refining the conversation before generating a final PDF report.
                </p>
              </div>
            )}
            {stage === 'report' && (
              <div className="summary-workspace">
                <p className="message-label">STEP 04 / REPORT READY</p>
                <h2>
                  Your market-entry
                  <br />
                  <em>report is ready.</em>
                </h2>
                <p className="summary-intro">
                  A concise starting point for your team and a useful brief for the marketing
                  specialist who will review your launch.
                </p>
                <article className="agent-report-preview">
                  <div className="report-side">
                    COMMON
                    <br />
                    GROUND
                    <br />
                    CREATIVE
                  </div>
                  <div>
                    <span>AUSTRALIAN MARKET ENTRY REPORT</span>
                    <h3>
                      Barrier care,
                      <br />
                      made local.
                    </h3>
                    <p>Company context · Market signal · Call summary</p>
                  </div>
                  <b>PDF</b>
                </article>
                <button className="analyse-button generate-report" onClick={() => window.print()}>
                  Download PDF report <span>↓</span>
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
