import Link from 'next/link';
import Image from 'next/image';

const steps = [
  ['01', 'Smart Input', 'Start with what you already have.', 'Add your website or product brief. AI understands your business and market-entry goals without a lengthy questionnaire.'],
  ['02', 'Market Snapshot', 'Understand your Australian opportunity.', 'Get instant AI insights on market potential, customers, competitors, localisation gaps and key challenges.'],
  ['03', 'AI Strategy Builder', 'Build a locally relevant strategy.', 'Talk with AI to refine your goals, strategy and budget — while identifying local talent, SMEs and community opportunities.'],
  ['04', 'Actionable Plan', 'Turn insight into real market action.', 'Receive an Australia-ready marketing and local impact plan, then move into campaign execution with local expert support.'],
];

const marqueeLogos = [
  { src: '/logos/ahri.png', width: 1897, height: 829 },
  { src: '/logos/the-marketing-club.png', width: 2170, height: 725 },
  { src: '/logos/coles-clean.png', width: 2172, height: 724 },
  { src: '/logos/bupa-clean.png', width: 2172, height: 724 },
];

export default function Home() {
  return (
    <main className="arc-page">
      <nav className="arc-nav" aria-label="Primary navigation">
        <Link className="arc-brand" href="/" aria-label="Common Ground Creative home">
          <Image src="/brand/common-ground-creative-logo-orange.png" alt="Common Ground Creative" width={1774} height={887} priority />
        </Link>
        <div className="arc-nav-links">
          <a href="#how-it-works">How it works</a>
          <a href="#solutions">Solutions</a>
          <a href="#about">About</a>
        </div>
        <Link className="arc-nav-cta" href="/agent">Start analysis</Link>
      </nav>

      <section className="arc-hero" id="about">
        <div className="arc-hero-copy">
          <p className="arc-kicker">AI MARKET ENTRY PLATFORM / AUSTRALIA</p>
          <h1>Enter Australia.<br />Execute with<br />confidence.</h1>
          <p className="arc-intro">Turn market insight into an executable Australian growth plan — powered by AI and reviewed by marketing specialists.</p>
          <Link className="arc-primary-button" href="/agent">Build my plan <span>→</span></Link>
        </div>

        <aside className="snapshot-card" aria-label="Example market snapshot">
          <p className="arc-kicker">LIVE DEMO PREVIEW</p>
          <h2>Intelligent<br />Market Snapshot</h2>
          <p className="snapshot-context">Brand: Xiaomi <i>/</i> Product: YU7 GT</p>
          <div className="snapshot-grid">
            <div><span>Opportunity</span><strong>82 / 100</strong></div>
            <div><span>Priority</span><strong>HIGH</strong></div>
            <div><span>Customer segments</span><strong>03</strong></div>
            <div><span>Channels</span><strong>05</strong></div>
          </div>
        </aside>
      </section>

      <section className="arc-marquee" id="solutions" aria-labelledby="plan-covers-heading">
        <h2 id="plan-covers-heading">What your plan covers</h2>
        <div className="scroller" data-animated="true" data-speed="slow">
          <ul className="tag-list scroller__inner">
            {marqueeLogos.map((logo) => (
              <li key={logo.src}>
                <Image src={logo.src} alt="" width={logo.width} height={logo.height} />
              </li>
            ))}
            {marqueeLogos.map((logo) => (
              <li key={`${logo.src}-duplicate`} aria-hidden="true">
                <Image src={logo.src} alt="" width={logo.width} height={logo.height} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="arc-process" id="how-it-works">
        <header>
          <p className="arc-kicker">HOW IT WORKS</p>
          <h2>A direct path from input to<br />action.</h2>
        </header>
        <div className="arc-step-grid">
          {steps.map(([number, title, lead, description]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <strong>{lead}</strong>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
