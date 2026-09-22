import Link from 'next/link';
import Image from 'next/image';

const steps = [
  ['01', 'Quick Input', 'Add your website, product and market goal.'],
  ['02', 'AI Snapshot', 'Reveal local opportunities and audience signals.'],
  ['03', 'AI Consultant', 'Answer only the follow-up questions that matter.'],
  ['04', 'Final Report', 'Receive a structured plan your team can execute.'],
];

const marqueeLogos = [
  { src: '/logos/ahri.png', width: 1897, height: 829 },
  { src: '/logos/the-marketing-club.png', width: 2170, height: 725 },
  { src: '/logos/coles.png', width: 2147, height: 672 },
  { src: '/logos/bupa.png', width: 2066, height: 568 },
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
          {steps.map(([number, title, description]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
