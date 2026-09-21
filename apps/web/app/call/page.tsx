import Link from 'next/link';

export default function CallPage() {
  return (
    <main className="call-page">
      <nav className="call-nav">
        <Link className="wordmark" href="/">
          COMMON<span>GROUND</span>
          <i>®</i>
        </Link>
        <Link className="back-link" href="/agent">
          ← BACK TO BRIEF
        </Link>
      </nav>
      <section className="call-main">
        <p className="eyebrow">MARKET ENTRY SESSION / LIVE</p>
        <h1>
          Meet your
          <br />
          <em>Australian guide.</em>
        </h1>
        <p>
          A focused conversation with Maya, your virtual growth advisor. We&apos;ll add the
          decisions you make here to your final market-entry report.
        </p>
        <div className="caller">
          <div>M</div>
        </div>
        <div className="call-controls">
          <Link
            className="circle-control end end-call-link"
            href="/agent?stage=summary"
            aria-label="End call"
          >
            ×
          </Link>
        </div>
      </section>
      <footer className="call-note">
        <span>● CONNECTED TO MAYA</span>
        <span>00:00:12</span>
      </footer>
    </main>
  );
}
