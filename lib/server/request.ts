import { createHash } from "node:crypto";

const MAX_BODY_BYTES = 24 * 1024;
const WINDOW_MS = 15 * 60 * 1000;
const MAX_KEYS = 2000;
const MAX_SUBMISSIONS = 5;
type RateEntry = { count: number; resetAt: number };

// This memory is shared only within one running instance. For multiple Vercel
// instances, add a persistent atomic limiter (for example Redis) or Vercel WAF.
// Raw visitor IP addresses are never retained in this map or application logs.
const entries = new Map<string, RateEntry>();

export class RequestError extends Error {
  constructor(public status: number, message: string, public retryAfter?: number) {
    super(message);
  }
}

export function jsonResponse(payload: unknown, status = 200, retryAfter?: number) {
  const headers: Record<string, string> = { "Cache-Control": "no-store" };
  if (retryAfter) headers["Retry-After"] = String(retryAfter);
  return Response.json(payload, { status, headers });
}

export function enforceSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site" || fetchSite === "same-site") {
    throw new RequestError(403, "Please submit the form from this website.");
  }
  // Origin-less requests remain usable by non-browser clients; browsers sending
  // cross-origin POSTs must pass the explicit Origin check below.
  if (!origin) return;
  const allowed = new Set([new URL(request.url).origin]);
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    try { allowed.add(new URL(process.env.NEXT_PUBLIC_SITE_URL).origin); } catch { /* Ignore invalid optional site configuration. */ }
  }
  if (!allowed.has(origin)) throw new RequestError(403, "Please submit the form from this website.");
}

export function checkRateLimit(key: string, now = Date.now()) {
  for (const [entryKey, entry] of entries) {
    if (entry.resetAt <= now) entries.delete(entryKey);
  }
  const current = entries.get(key);
  if (current) {
    if (current.count >= MAX_SUBMISSIONS) {
      throw new RequestError(429, "Too many requests. Please wait a few minutes before trying again.", Math.max(1, Math.ceil((current.resetAt - now) / 1000)));
    }
    current.count += 1;
    return;
  }
  // Fail closed on capacity rather than evicting active limits, which would let
  // a flood of distinct keys bypass the limiter. Expired keys are removed above.
  if (entries.size >= MAX_KEYS) throw new RequestError(429, "The form is receiving a high volume of requests. Please try again shortly.", 60);
  entries.set(key, { count: 1, resetAt: now + WINDOW_MS });
}

export function requestRateKey(request: Request, form: "contact" | "reviews") {
  // Vercel overwrites x-forwarded-for at its trusted proxy boundary. Elsewhere,
  // use a shared local key unless a trusted reverse proxy is explicitly added.
  const ip = process.env.VERCEL === "1"
    ? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    : "local";
  return createHash("sha256").update(`${form}:${ip}`).digest("hex");
}

export async function readJsonBody(request: Request): Promise<unknown> {
  const mediaType = request.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase();
  if (mediaType !== "application/json") {
    throw new RequestError(415, "Please submit the form as JSON.");
  }
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    throw new RequestError(413, "Your submission is too large. Please shorten your message.");
  }
  if (!request.body) throw new RequestError(400, "Your submission is empty.");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new RequestError(413, "Your submission is too large. Please shorten your message.");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  try {
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch {
    throw new RequestError(400, "We could not read your submission. Please try again.");
  }
}

export async function prepareSubmission(request: Request, form: "contact" | "reviews") {
  enforceSameOrigin(request);
  checkRateLimit(requestRateKey(request, form));
  const body = await readJsonBody(request);
  if (body && typeof body === "object" && "website" in body && body.website) {
    throw new RequestError(400, "We could not accept this submission. Please try again.");
  }
  return body;
}

export function handleRequestError(error: unknown) {
  if (error instanceof RequestError) return jsonResponse({ ok: false, message: error.message }, error.status, error.retryAfter);
  // Never return provider errors or log submission contents, credentials or PII.
  return jsonResponse({ ok: false, message: "Your submission could not be sent. Please try again later." }, 500);
}
