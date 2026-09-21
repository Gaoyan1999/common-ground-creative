'use client';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function AgentPage() {
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState('');
  function submit(event: FormEvent) { event.preventDefault(); if (message.trim()) { setSent(true); setMessage(''); } }
  return <main className="agent-page">
    <nav className="agent-top"><Link className="wordmark" href="/">COMMON<span>GROUND</span><i>®</i></Link><Link className="back-link" href="/">← HOME</Link><span className="agent-status"><b /> BRIEFING AGENT ONLINE</span></nav>
    <div className="agent-layout">
      <aside className="agent-aside"><p className="eyebrow">AU MARKET ENTRY / 01</p><h1>Your first<br /><em>local read.</em></h1><p>Give us the context behind your brand. We&apos;ll turn it into a sharp first view of your opportunity in Australia.</p><div className="mini-process"><div><strong>1</strong> Brand context</div><div><strong>2</strong> Market signal</div><div><strong>3</strong> Expert call</div></div></aside>
      <section className="agent-workspace"><div className="conversation">
        <div className="message assistant-message"><p className="message-label">COMMON GROUND / 09:41</p><p>Welcome. I&apos;m here to help you make your first Australian move with more clarity. Start by telling me about your brand, product and where you&apos;re seeing momentum today.</p></div>
        <div className="message"><p className="message-label">YOU / 09:42</p><p>We&apos;re a Singapore-based DTC skincare brand. We&apos;ve built a strong audience around barrier repair and sensitive skin, and we&apos;re exploring an Australian launch this year.</p></div>
        <div className="message assistant-message"><p className="message-label">COMMON GROUND / 09:43</p><p>That&apos;s a promising starting point. Barrier repair maps to a clear Australian need: skincare buyers here value clinical proof, everyday usability and considered ingredients.</p></div>
        <article className="brief-card"><div className="brief-card-top"><div><p>INITIAL MARKET SIGNAL</p><h2>Australian opportunity</h2></div><span>EARLY VIEW</span></div><div className="brief-insight"><div><span>PRODUCT FIT</span><b>High potential</b></div><div><span>PRIMARY AUDIENCE</span><b>25–39, ingredient-led</b></div><div><span>OPENING CHANNEL</span><b>Meta + creator proof</b></div></div><p>Your clearest entry position: everyday barrier care, translated through proof-led creator stories and a hero-product launch.</p><div className="brief-card-actions"><Link href="/call" className="dark-button">Discuss this with an expert ↗</Link><button className="outline-button">Save brief</button></div></article>
        {sent && <div className="message assistant-message"><p className="message-label">COMMON GROUND / NOW</p><p>Got it. I&apos;ve added that to your brief. A little more context will make the expert conversation even more useful.</p></div>}
        <form className="chat-form" onSubmit={submit}><input aria-label="Add more brand context" value={message} onChange={e => setMessage(e.target.value)} placeholder="Add more context about your brand…"/><button aria-label="Send message" type="submit">↑</button></form>
      </div></section>
    </div>
  </main>;
}
