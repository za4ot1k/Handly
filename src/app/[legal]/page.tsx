import Link from 'next/link';
import { notFound } from 'next/navigation';
import { uk } from '@/content/uk';
import { site } from '@/config/site';
export function generateStaticParams(){return [{legal:'privacy'},{legal:'terms'}];}
export async function generateMetadata({params}:{params:Promise<{legal:string}>}) {const {legal}=await params;return {title:legal==='privacy'?uk.privacy:uk.terms};}
export default async function Legal({params}:{params:Promise<{legal:string}>}) {const {legal}=await params;if(legal!=='privacy'&&legal!=='terms')notFound(); const content=uk.legal[legal];return <main className="container legal"><Link href="/">← {uk.back}</Link><p className="eyebrow">{site.name}</p><h1>{content.title}</h1><p>{content.text}</p><a href={`mailto:${site.email}`}>{site.email}</a></main>;}
