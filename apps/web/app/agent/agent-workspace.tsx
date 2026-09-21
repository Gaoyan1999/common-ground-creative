'use client';

import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

type Stage = 'upload' | 'signal' | 'summary' | 'report';

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
  const [isAnalysing, setIsAnalysing] = useState(false);
  const progress = stage === 'upload' ? 1 : stage === 'signal' ? 2 : stage === 'summary' ? 3 : 4;
  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setFileName(selectedFile.name);
  }
  function analyseDocument() {
    if (!fileName) return;
    setIsAnalysing(true);
    window.setTimeout(() => {
      setIsAnalysing(false);
      setStage('signal');
    }, 1100);
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
                  disabled={!fileName || isAnalysing}
                  onClick={analyseDocument}
                >
                  {isAnalysing ? 'Analysing company context…' : 'Analyse company context'}{' '}
                  <span>↗</span>
                </button>
                <p className="upload-note">
                  Demo mode — your file stays in this browser and is not sent anywhere.
                </p>
              </div>
            )}
            {stage === 'signal' && (
              <>
                <div className="message assistant-message">
                  <p className="message-label">COMMON GROUND / ANALYSIS COMPLETE</p>
                  <p>
                    I&apos;ve reviewed <b>{fileName}</b>. Your product story has strong early
                    alignment with Australia&apos;s considered skincare category — particularly
                    where proof and accessibility meet.
                  </p>
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
                      <b>High potential</b>
                    </div>
                    <div>
                      <span>PRIMARY AUDIENCE</span>
                      <b>25–39, ingredient-led</b>
                    </div>
                    <div>
                      <span>OPENING CHANNEL</span>
                      <b>Meta + creator proof</b>
                    </div>
                  </div>
                  <p>
                    Your clearest entry position: everyday barrier care, translated through
                    proof-led creator stories and a hero-product launch.
                  </p>
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
