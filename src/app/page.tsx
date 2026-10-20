import Landing from '@/components/landing';
import { site } from '@/config/site';
export default function Home() {return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({'@context':'https://schema.org','@type':'SoftwareApplication',name:site.name,description:site.description,applicationCategory:'BusinessApplication',operatingSystem:'Web',inLanguage:'uk',url:site.url}).replace(/</g,'\\u003c')}}/><Landing/></>;}
