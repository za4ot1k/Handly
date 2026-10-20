'use client';
import { uk } from '@/content/uk';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { site } from '@/config/site';
import { track } from '@/lib/analytics';
export function Logo() { return <Link className="logo" href="/" aria-label={site.name}><Image className="brand-mark" src="/logo.svg" width={38} height={40} alt="" priority/>{site.name}<span className="logo-dot">.</span></Link>; }
export function CTA({ children, href = '#waitlist', secondary = false, source = 'page' }: {children: React.ReactNode; href?: string; secondary?: boolean; source?: string}) {
  return <a className={`button ${secondary ? 'button-secondary' : ''}`} href={href} onClick={() => track('cta_click', { source })}>{children}<ArrowUpRight size={17}/></a>;
}
export function Reveal({children, className = ''}: {children: React.ReactNode; className?: string}) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : {opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once:true, amount:0.15}} transition={{duration: .6}}>{children}</motion.div>;
}
export function SectionTitle({label, title, center = false}: {label?: string; title: string; center?: boolean}) {
  return <div className={`section-title ${center ? 'center' : ''}`}>{label && <p className="eyebrow">{label}</p>}<h2>{title}</h2></div>;
}
export function MoneyCard() {
  return <div className="money-card"><div className="money-top"><span>{uk.balance}</span></div><strong>32 500 <small>грн</small></strong><div className="bar-chart" aria-hidden="true">{[32, 46, 39, 62, 51, 72, 67, 90, 78, 100, 85, 110].map((h, i) => <span key={i} style={{height: h}}/>)}</div><div className="money-bottom"><span>{uk.income} <b>45 000 ₴</b></span><span>{uk.expense} <b>12 500 ₴</b></span></div></div>;
}
