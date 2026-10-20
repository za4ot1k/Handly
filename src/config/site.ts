export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const assetPath = (path: string) => `${basePath}${path}`;

export const site = {
  name: 'handly',
  tagline: 'Менше рутини. Більше своєї справи.',
  description: 'Облік, клієнти та записи в одній розмові. AI-помічник для вашого малого бізнесу.',
  email: 'hello@pomichnyk.example',
  url: (process.env.NEXT_PUBLIC_SITE_URL || `http://localhost:3000${basePath}`).replace(/\/$/, ''),
  waitlistEndpoint: process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT || '',
};

