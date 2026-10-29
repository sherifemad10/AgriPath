import { getRequest } from "@tanstack/react-start/server";

const buckets = new Map<string, number[]>();

export function clientIp(): string {
  try {
    const req = getRequest();
    const fwd = req.headers.get("x-forwarded-for");
    if (fwd) return fwd.split(",")[0]?.trim() || "unknown";
    const real = req.headers.get("x-real-ip");
    if (real) return real.trim();
    return req.headers.get("cf-connecting-ip") || "unknown";
  } catch {
    return "unknown";
  }
}

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const stamp = `${key}:${Math.floor(now / windowMs)}`;
  const hits = (buckets.get(stamp) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    throw new Error("Too many requests. Please wait a moment and try again.");
  }
  hits.push(now);
  buckets.set(stamp, hits);

  // Prune expired buckets to prevent memory leak
  if (buckets.size > 2000) {
    const currentWindow = String(Math.floor(now / windowMs));
    for (const k of buckets.keys()) {
      if (!k.endsWith(currentWindow)) buckets.delete(k);
      if (buckets.size < 800) break;
    }
  }
}

export function sanitizeText(value: string, max: number): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .trim()
    .slice(0, max);
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 180;
}

export function securityHeaders(): Record<string, string> {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "X-DNS-Prefetch-Control": "off",
    "Cross-Origin-Opener-Policy": "same-origin",
    "X-XSS-Protection": "1; mode=block",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  };
}
