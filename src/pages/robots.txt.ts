import type { APIRoute } from 'astro';
import { getSiteOrigin } from '../utils/siteOrigin';
export const GET: APIRoute = () => {
  const origin = getSiteOrigin();
  const content = origin
    ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
