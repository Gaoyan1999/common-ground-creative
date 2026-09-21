'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FormEvent, useState } from 'react';

export default function AgentPage() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');
  function submit(event: FormEvent) { event.preventDefault(); setSubmitted(true); }
  return <main className="agent-page">
    <nav className="agent-top"><Link className="agent-brand" href="/" aria-label="Common Ground Creative home"><Image src="/brand/common-ground-creative-master-logo.png" alt="Common Ground Creative" width={1774} height={887} priority /></Link><Link className="back-link" href="/">← BACK TO HOME</Link><span className="agent-status"><b /> MARKET BRIEF IN PROGRESS</span></nav>
    <div className="agent-layout">
      <aside className="agent-aside"><p className="eyebrow">AUSTRALIAN MARKET BRIEF / 01</p><h1>Your first<br />local read.</h1><p>Share the context behind your brand. We&apos;ll turn it into a practical first view of your Australian opportunity.</p><div className="mini-process"><div><strong>1</strong> Brand context <span>Complete</span></div><div><strong>2</strong> Market signal <span>In progress</span></div><div><strong>3</strong> Launch direction <span>Next</span></div></div></aside>
      <section className="agent-workspace"><div className="conversation">
        <section className="brief-submission" aria-labelledby="submission-heading">
          <div className="submission-intro"><p className="message-label">BUILD YOUR BRIEF / OPTIONAL CONTEXT</p><h2 id="submission-heading">Bring us closer to your brand.</h2><p>Share as much or as little as feels useful. Every field below is optional, and helps us make your market brief more specific.</p></div>
          <form className="brief-form" onSubmit={submit}>
            <div className="form-field"><label htmlFor="company">Company or brand name <span>Optional</span></label><input id="company" name="company" placeholder="Your brand or business" /></div>
            <div className="form-field"><label htmlFor="role">Your role <span>Optional</span></label><input id="role" name="role" placeholder="Founder, Head of Growth, Marketing Lead…" /></div>
            <div className="form-field"><label htmlFor="website">Website URL <span>Optional</span></label><input id="website" name="website" type="url" placeholder="https://yoursite.com" /></div>
            <div className="form-grid">
              <div className="form-field"><label htmlFor="business-type">Business type <span>Optional</span></label><select id="business-type" name="business-type" defaultValue=""><option value="" disabled>Select one</option><option>DTC / Ecommerce</option><option>Marketplace brand</option><option>Retail brand</option><option>Service business</option><option>Other</option></select></div>
              <div className="form-field"><label htmlFor="revenue">Monthly revenue <span>Optional</span></label><select id="revenue" name="revenue" defaultValue=""><option value="" disabled>Select a range</option><option>Pre-revenue</option><option>Under A$25k</option><option>A$25k–A$100k</option><option>A$100k–A$500k</option><option>Over A$500k</option></select></div>
            </div>
            <div className="form-field"><label htmlFor="goals">What are you looking to achieve? <span>Optional</span></label><textarea id="goals" name="goals" placeholder="Tell us about your goals, challenges, or what you would like to validate in Australia." rows={5} /></div>
            <div className="form-field"><span className="upload-label">Supporting material <em>Optional</em></span><label className={`upload-field${fileName ? ' has-file' : ''}`} htmlFor="supporting-material"><input id="supporting-material" name="supporting-material" type="file" multiple onChange={event => setFileName(Array.from(event.target.files ?? []).map(file => file.name).join(', '))} /><span className="upload-icon">↑</span><strong>{fileName || 'Upload a file'}</strong><small>{fileName ? 'Ready to include with your brief' : 'Decks, product catalogues, campaign reports or other context'}</small></label></div>
            <button className="submit-brief" type="submit">Save to my brief <span>↗</span></button>
          </form>
        </section>
        {submitted && <article className="brief-card saved-brief-card"><div className="brief-card-top"><div><p>INITIAL MARKET SIGNAL</p><h2>Australian opportunity</h2></div><span>EARLY VIEW</span></div><div className="brief-insight"><div><span>PRODUCT FIT</span><b>High potential</b></div><div><span>PRIMARY AUDIENCE</span><b>25–39, ingredient-led</b></div><div><span>OPENING CHANNEL</span><b>Meta + creator proof</b></div></div><p>Your clearest entry position: everyday barrier care, translated through proof-led creator stories and a hero-product launch.</p><div className="brief-card-actions"><Link href="/call" className="dark-button">Discuss this with an expert ↗</Link><button className="outline-button" type="button">Save brief</button></div></article>}
      </div></section>
    </div>
  </main>;
}
