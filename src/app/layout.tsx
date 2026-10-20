import type { Metadata } from 'next';
import { Manrope, Nunito_Sans } from 'next/font/google';
import { site } from '@/config/site';
import './globals.css';
import './handly.css';
const display = Manrope({subsets:['latin','cyrillic'],variable:'--font-display',display:'swap'});
const text = Nunito_Sans({subsets:['latin','cyrillic'],variable:'--font-text',display:'swap'});
export const metadata: Metadata = {metadataBase:new URL(site.url),title:{default:`${site.name} — ${site.tagline}`,template:`%s | ${site.name}`},description:site.description,openGraph:{title:site.name,description:site.description,locale:'uk_UA',type:'website',url:site.url},twitter:{card:'summary_large_image',title:site.name,description:site.description}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="uk"><body className={`${display.variable} ${text.variable}`}>{children}</body></html>;}

