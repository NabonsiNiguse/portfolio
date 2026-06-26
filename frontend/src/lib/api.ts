/**
 * Central API configuration.
 *
 * In development, Vite proxies /api/* and /media/* to Django on port 8000,
 * so we use a relative base URL — no hardcoded localhost anywhere.
 *
 * In production, set VITE_API_BASE_URL in your .env to point at the deployed
 * backend (e.g. https://api.yourdomain.com).
 */
export const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

/**
 * Typed fetch wrapper. Throws on non-2xx responses.
 * Usage: await apiFetch<SkillGroup[]>('/api/skills/')
 */
export async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${path}`);
  return res.json() as Promise<T>;
}
