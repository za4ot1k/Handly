'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowUp, RotateCcw, CalendarDays, Receipt, Info } from 'lucide-react';
import { uk } from '@/content/uk';
import { site, assetPath } from '@/config/site';
import { track } from '@/lib/analytics';
import { MoneyCard, SectionTitle } from './ui';
type Kind = 'income' | 'booking' | 'expense' | 'reminder' | 'fallback';
type Message = { role: 'user' | 'assistant'; text: string; kind?: Kind; amount?: string };
export function classify(text: string): Kind {
  const q = text.toLocaleLowerCase('uk');
  if (/витрат|матеріал|чек/.test(q)) return 'expense';
  if (/нагада|оплат/.test(q)) return 'reminder';
  if (/запиши|запис|вівтор|календар/.test(q)) return 'booking';
  if (/зароб|дох[іо]д|прибут|місяц|фінанс/.test(q)) return 'income';
  return 'fallback';
}
export default function Demo() {
  const [messages, setMessages] = useState<Message[]>([{role: 'assistant', text: uk.greeting}]);
  const [input, setInput] = useState(''); const [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null); const log = useRef<HTMLDivElement>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  useEffect(() => { if(log.current) log.current.scrollTop = log.current.scrollHeight; }, [messages, busy]);
  function send(text: string) {
    const value = text.trim(); if (!value || busy) return;
    const kind = classify(value); const amount = value.match(/\d+(?:[.,]\d{1,2})?/)?.[0] || '500';
    track('demo_prompt', {kind}); setMessages(prev => [...prev.slice(-18), {role:'user', text:value}]); setInput(''); setBusy(true);
    timer.current = setTimeout(() => {setMessages(prev => [...prev, {role: 'assistant', text: uk.responses[kind], kind, amount}]); setBusy(false);}, 850);
  }
  return <section className="demo-section section" id="demo"><div className="container demo-layout"><div><SectionTitle label={uk.demoLabel} title={uk.demoTitle}/><p className="section-description">{uk.demoIntro}</p><div className="prompt-list">{uk.prompts.map((p,i) => <button key={p} disabled={busy} onClick={() => send(p)}><span>0{i+1}</span>{p}<span aria-hidden="true">↗</span></button>)}</div><p className="demo-disclaimer"><Info size={17}/>{uk.demoNotice}</p></div><div className="demo-chat"><div className="chat-header"><span className="assistant-avatar"><Image src={assetPath('/logo.svg')} width={24} height={25} alt=""/></span><div><b>{site.name}</b></div><button className="icon-button reset" aria-label={uk.reset} onClick={() => {if(timer.current) clearTimeout(timer.current); setBusy(false); setMessages([{role:'assistant',text:uk.greeting}]);}}><RotateCcw size={17}/></button></div><div className="demo-log" ref={log} role="log" aria-live="polite" aria-relevant="additions" tabIndex={0} aria-label={uk.demoTitle}>{messages.map((m,i) => <div key={i} className={`message-wrap ${m.role}`}><div className={`bubble ${m.role}`}>{m.text}</div>{m.kind === 'income' && <MoneyCard/>}{m.kind === 'booking' && <div className="result-card"><CalendarDays/><div><b>{uk.bookingTitle}</b><p>{uk.bookingTime}</p><small>{uk.bookingNote}</small></div></div>}{m.kind === 'expense' && <div className="result-card"><Receipt/><div><b>{uk.expenseTitle} · {m.amount} ₴</b><p>{uk.expenseNote}</p></div></div>}</div>)}{busy && <div className="typing" role="status" aria-label={uk.typing}><i/><i/><i/></div>}</div><form className="demo-input" onSubmit={e => {e.preventDefault(); send(input);}}><input aria-label={uk.inputPlaceholder} placeholder={uk.inputPlaceholder} value={input} onChange={e => setInput(e.target.value)} maxLength={500}/><button aria-label={uk.send} disabled={busy || !input.trim()}><ArrowUp size={20}/></button></form></div></div></section>;
}
