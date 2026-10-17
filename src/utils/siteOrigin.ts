// Publicación: configura PUBLIC_SITE_URL solamente cuando tengas una URL HTTPS real.
export function getSiteOrigin(): string | undefined {
  const env = import.meta.env.PUBLIC_SITE_URL?.trim();
  if (!env) return undefined;
  try {
    const url = new URL(env);
    if (url.protocol !== 'https:' || url.hostname === 'localhost') return undefined;
    return url.origin;
  } catch { return undefined; }
}
