import Link from 'next/link';

const proof = [
  ['01', 'Market intelligence', 'Know where your brand fits before you invest.'],
  ['02', 'Local growth strategy', 'A focused plan for the Australian customer.'],
  ['03', 'Expert-backed execution', 'Human specialists turn the plan into market activity.'],
];

export default function Home() {
  return (
    <main className="site-shell">
      <nav className="top-nav">
        <Link className="wordmark" href="/">COMMON<span>GROUND</span><i>®</i></Link>
        <div className="nav-links"><a href="#approach">How it works</a><a href="#why">Why Australia</a></div>
        <Link className="nav-cta" href="/agent">Build your plan <span>↗</span></Link>
      </nav>
      <section className="hero">
        <div className="hero-kicker"><span className="pulse" /> AUSTRALIAN MARKET ENTRY, REIMAGINED</div>
        <h1>Find your<br /><em>common ground</em><br />in Australia.</h1>
        <div className="hero-foot"><p>For ambitious DTC brands ready to land, learn and grow in Australia — with strategy that begins in days, not months.</p><Link href="/agent" className="primary-button">Start your market brief <span>↗</span></Link></div>
        <div className="hero-grid" aria-hidden="true"><span>AUS</span><span>01</span><span>SYD / MEL / BNE</span><span>CGC</span></div>
      </section>
      <section className="statement" id="approach"><p className="eyebrow">THE GAP BETWEEN INSIGHT &amp; ACTION</p><h2>Australia is not<br />a copy-and-paste<br /><em>market.</em></h2><div className="statement-copy">You have a product with momentum. We help you translate it for a new audience, a new culture and a new growth curve — without building an in-house team first.</div></section>
      <section className="steps"><div className="steps-title"><p className="eyebrow">ONE CLEAR PATH</p><h2>From first<br />signal to launch.</h2></div><div className="step-list">{proof.map(([number, title, text]) => <article className="step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><b>↗</b></article>)}</div></section>
      <section className="brief-banner" id="why"><p className="eyebrow">YOUR ENTRY POINT</p><h2>Start with a<br /><em>market brief.</em></h2><p>Tell our AI about your brand. In one guided conversation, get an initial view of your Australian opportunity and the next moves worth making.</p><Link href="/agent" className="primary-button">Create my brief <span>↗</span></Link><div className="banner-mark">CG<br />C</div></section>
      <footer><Link className="wordmark" href="/">COMMON<span>GROUND</span><i>®</i></Link><p>Built for brands entering Australia.</p><p>© 2026 Common Ground Creative</p></footer>
    </main>
  );
}
