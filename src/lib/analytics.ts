export function track(event: 'cta_click' | 'demo_prompt' | 'waitlist_submit', properties?: Record<string, string>) {
  // TODO: Connect a consent-aware analytics provider. Never send message text or email.
  if (process.env.NODE_ENV === 'development') console.info('[analytics]', event, properties || {});
}
