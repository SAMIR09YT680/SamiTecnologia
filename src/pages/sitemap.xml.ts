import type { APIRoute } from 'astro';
import { indiceBusqueda } from '../data/search';
import { getSiteOrigin } from '../utils/siteOrigin';
const extra = ['/', '/nosotros/', '/contacto/', '/privacidad/', '/cookies/', '/terminos/'];
const encodeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const GET: APIRoute = () => {
  const origin = getSiteOrigin();
  const paths = Array.from(new Set([...extra, ...indiceBusqueda.map((entry) => entry.href)]));
  const urls = origin ? paths.map((path) => `  <url><loc>${encodeXml(new URL(path, origin).href)}</loc></url>`).join('\n') : '';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
