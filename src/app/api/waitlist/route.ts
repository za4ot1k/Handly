import { NextRequest, NextResponse } from 'next/server';
import { businessTypes, validEmail } from '@/lib/waitlist';
export const runtime = 'nodejs';
// TODO: Replace process-local storage and rate limiting with a durable provider/Redis.
const entries = new Map<string,{business:string;createdAt:number}>();
const attempts = new Map<string,{count:number;reset:number}>();
const WINDOW = 15*60*1000;
export async function POST(request:NextRequest) {
 const ip=request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
 const now=Date.now();
 for(const [key,value] of attempts) if(value.reset<=now) attempts.delete(key);
 if(attempts.size>10000) return NextResponse.json({error:'busy'},{status:503});
 const bucket=attempts.get(ip) || {count:0,reset:now+WINDOW}; bucket.count++;attempts.set(ip,bucket);
 if(bucket.count>5)return NextResponse.json({error:'rate_limited'},{status:429,headers:{'Retry-After':String(Math.ceil((bucket.reset-now)/1000))}});
 if(request.headers.get('origin') && request.headers.get('origin') !== request.nextUrl.origin) return NextResponse.json({error:'origin'},{status:403});
 if(!request.headers.get('content-type')?.includes('application/json'))return NextResponse.json({error:'content_type'},{status:415});
 try {
  // Bound the stream before parsing to avoid accepting arbitrarily large bodies.
  const reader=request.body?.getReader(); if(!reader)return NextResponse.json({error:'body'},{status:400});
  const chunks:Uint8Array[]=[];let size=0;
  while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>2048){await reader.cancel();return NextResponse.json({error:'too_large'},{status:413});}chunks.push(value);}
  const body=JSON.parse(Buffer.concat(chunks).toString('utf8'));
  if(!body || typeof body!=='object' || Array.isArray(body))return NextResponse.json({error:'invalid'},{status:400});
  if(body.website)return NextResponse.json({ok:true});
  const email=typeof body.email==='string'?body.email.trim().toLowerCase():body.email;
  if(!validEmail(email) || (body.business && !businessTypes.includes(body.business)))return NextResponse.json({error:'invalid'},{status:400});
  if(entries.size>=10000&&!entries.has(email))return NextResponse.json({error:'full'},{status:503});
  entries.set(email,{business:body.business||'',createdAt:now});
  return NextResponse.json({ok:true},{headers:{'Cache-Control':'no-store'}});
 }catch {return NextResponse.json({error:'invalid_json'},{status:400});}
}
