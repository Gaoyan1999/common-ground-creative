import Link from 'next/link';
import Image from 'next/image';

const process: Array<[string, string, string, string[]]> = [
  ['01', 'Understand your brand', 'A guided intake captures your product, goals, price point and launch constraints.', ['Brand & product intake', 'Commercial context', 'Launch-readiness review']],
  ['02', 'Read the Australian market', 'AI turns local audience behaviour, competitors and category signals into a clear opportunity.', ['Target-customer profile', 'Competitor scan', 'Local purchase drivers']],
  ['03', 'Build your launch plan', 'Choose the positioning, channel mix, budget logic and campaign ideas worth testing first.', ['Go-to-market strategy', 'Channel & budget plan', 'Campaign blueprint']],
  ['04', 'Launch, learn, refine', 'A local specialist reviews the approved plan and helps convert it into live activity.', ['Specialist review', 'Campaign execution', 'Learning loop']],
];

const services = [
  ['Australian customer intelligence', 'Audience segments, objections, motivations and category behaviour.'],
  ['Positioning & message design', 'A local story that feels native, not merely translated.'],
  ['Channel & budget planning', 'A practical first mix across paid, owned and creator channels.'],
  ['Campaign-ready execution', 'Human review and hands-on support when it is time to go live.'],
];

const faqs = [
  ['Is Common Ground Creative an agency?', 'We are an AI-powered market-entry partner. The platform builds a rigorous starting point quickly; local marketing specialists add practical judgement and campaign execution.'],
  ['Who is it for?', 'Overseas DTC and ecommerce brands with a proven product that are considering an Australian launch or need to improve an early entry strategy.'],
  ['What do I receive first?', 'An Australian market brief: target customer, local positioning, channel priorities and the next decisions needed for an executable launch plan.'],
  ['Can you execute the campaign?', 'Yes. Once the strategy is approved, Common Ground Creative can connect you with a marketing specialist to review, refine and deliver the work.'],
];

export default function Home() {
  return <main className="site-shell">
    <nav className="top-nav">
      <Link className="brand-logo" href="/" aria-label="Common Ground Creative home"><Image src="/brand/common-ground-creative-logo.png" alt="Common Ground Creative" width={1774} height={887} priority /></Link>
      <div className="nav-links"><a href="#process">How it works</a><a href="#services">What we cover</a><a href="#fit">Who it&apos;s for</a></div>
      <Link className="nav-cta" href="/agent">Build your growth plan <span>↗</span></Link>
    </nav>

    <section className="hero">
      <p className="label">AUSTRALIAN MARKET ENTRY FOR DTC BRANDS</p>
      <h1>Enter Australia<br />with a plan built<br /><em>to move.</em></h1>
      <div className="hero-bottom"><p>AI-powered market intelligence, a local go-to-market strategy and specialist execution—built for overseas brands ready to grow in Australia.</p><div><Link className="button primary" href="/agent">Build my market brief <span>↗</span></Link><a className="quiet-link" href="#process">See how it works ↓</a></div></div>
    </section>

    <section className="proof-bar"><div><strong>LOCAL</strong><span>Customer intelligence before campaign spend</span></div><div><strong>CLEAR</strong><span>A single strategy across message, channel and budget</span></div><div><strong>READY</strong><span>Expert-backed support when it is time to launch</span></div></section>

    <section className="results"><header className="section-header"><p className="label">THE OPPORTUNITY</p><h2>Turn a new market<br />into your next<br /><em>growth engine.</em></h2><p>Most brands do not fail because their product is wrong. They struggle because local insight never becomes a practical, coordinated launch plan.</p></header><div className="result-cards"><article><span>MARKET SIGNAL</span><h3>Know where your brand fits.</h3><p>Understand the people, category expectations and competitive whitespace worth pursuing.</p></article><article><span>LOCAL STORY</span><h3>Give customers a reason to care.</h3><p>Translate your product&apos;s value into positioning and messages that feel at home in Australia.</p></article><article><span>REAL ACTIVATION</span><h3>Move from plan to market.</h3><p>Prioritise the right channels and campaign tests, then bring local expertise into execution.</p></article></div></section>

    <section className="process" id="process"><header className="center-header"><p className="label">HOW IT WORKS</p><h2>From deep context<br />to campaigns live.</h2><p>Each stage builds on the last until every important launch decision is ready to act on.</p></header><div className="process-grid">{process.map(([number, title, description, bullets]) => <article className="process-card" key={number}><div className="icon-box">↗</div><span>STEP {number}</span><h3>{title}</h3><p>{description}</p><ul>{bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></article>)}</div></section>

    <section className="services" id="services"><header className="section-header compact"><p className="label">WHAT WE COVER</p><h2>One local launch<br />system—not a<br /><em>static report.</em></h2><p>Every recommendation connects to the next choice, so your team can make confident decisions and execute them with purpose.</p></header><div className="service-grid">{services.map(([title, description], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p><b>↗</b></article>)}</div></section>

    <section className="fit" id="fit"><header><p className="label">IS THIS YOU?</p><h2>Built for brands<br />ready to make<br /><em>the move.</em></h2></header><div className="fit-cards"><article className="fit-card accent"><span>GREAT FIT</span><h3>You have</h3><ul><li>A product with evidence of demand</li><li>A clear ambition to enter Australia</li><li>A budget for launch learning</li><li>A team that wants a local partner</li></ul></article><article className="fit-card"><span>NOT YET</span><h3>You may need more time if</h3><ul><li>Your product direction is still undecided</li><li>There is no capacity to test the market</li><li>You only need generic content generation</li><li>Logistics is your first priority</li></ul></article></div></section>

    <section className="faq"><header className="center-header"><p className="label">FAQ</p><h2>Common questions.</h2><p>Clear answers before you build your first brief.</p></header><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>

    <section className="cta"><div><p className="label">YOUR ENTRY POINT</p><h2>Start with a<br /><em>market brief.</em></h2><p>Tell our AI about your brand. In one guided conversation, get an initial view of your Australian opportunity and the next moves worth making.</p><Link className="button primary" href="/agent">Create my brief <span>↗</span></Link></div></section>
    <footer><Link className="footer-brand" href="/">COMMON GROUND CREATIVE</Link><p>Built for brands entering Australia.</p><p>© 2026 Common Ground Creative</p></footer>
  </main>;
}
