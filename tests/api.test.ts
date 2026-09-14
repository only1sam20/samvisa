import assert from "node:assert/strict";
import { test, type TestContext } from "node:test";
import { POST as contactPost } from "../app/api/contact/route";
import { POST as reviewPost } from "../app/api/reviews/route";
import { checkRateLimit, readJsonBody, RequestError } from "../lib/server/request";
import { contactSchema, reviewDisplayName, reviewSchema } from "../lib/validation";

const contact = {
  name: "Example Professional", email: "example@example.org", phone: "", country: "Nigeria",
  profession: "Software engineer", experience: "10", service: "Professional Profile Assessment",
  situation: "I would like to document my existing professional achievements.",
  help: "I need support organizing my professional evidence.", contactMethod: "Email",
  linkedin: "", consent: true, website: "",
};
const review = {
  name: "Example Professional", professionalTitle: "Software engineer", company: "Example organization",
  service: "Professional Profile Assessment", rating: 4, review: "The process helped me organize my career documentation clearly.",
  privacyPreference: "anonymous", consent: true, website: "",
};
let requestNumber = 0;

function setup(t: TestContext, configured = true) {
  const keys = ["RESEND_API_KEY", "CONTACT_EMAIL", "RESEND_FROM_EMAIL", "VERCEL", "NODE_ENV", "NEXT_PUBLIC_SITE_URL"];
  const original = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  Object.assign(process.env, {
    RESEND_API_KEY: configured ? "re_test_not_a_real_key" : "",
    CONTACT_EMAIL: configured ? "owner@example.org" : "",
    RESEND_FROM_EMAIL: configured ? "forms@example.org" : "",
    VERCEL: "1", NODE_ENV: "development", NEXT_PUBLIC_SITE_URL: "https://portfolio.example.org",
  });
  t.after(() => {
    for (const key of keys) {
      if (original[key] === undefined) delete process.env[key];
      else process.env[key] = original[key];
    }
  });
}

function request(path: "contact" | "reviews", body: unknown, headers: Record<string, string> = {}) {
  requestNumber += 1;
  return new Request(`https://portfolio.example.org/api/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://portfolio.example.org", "x-forwarded-for": `192.0.2.${requestNumber}`, ...headers },
    body: JSON.stringify(body),
  });
}

test("a valid consultation reaches the owner as plain text with a reply address", async (t) => {
  setup(t);
  const fetchMock = t.mock.method(globalThis, "fetch", async (url: Parameters<typeof fetch>[0], init?: Parameters<typeof fetch>[1]) => {
    assert.equal(url, "https://api.resend.com/emails");
    const payload = JSON.parse(String(init?.body));
    assert.equal(payload.reply_to, contact.email);
    assert.equal(payload.from, "forms@example.org");
    assert.deepEqual(payload.to, ["owner@example.org"]);
    assert.match(payload.text, /Years of professional experience: 10/);
    assert.equal(payload.html, undefined);
    return Response.json({ id: "test-email-id" });
  });
  const response = await contactPost(request("contact", contact));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.equal(fetchMock.mock.callCount(), 1);
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("unconfigured email fails gracefully without reporting success", async (t) => {
  setup(t, false);
  const fetchMock = t.mock.method(globalThis, "fetch", async () => { throw new Error("Unexpected network request"); });
  const response = await contactPost(request("contact", contact));
  assert.equal(response.status, 503);
  const payload = await response.json();
  assert.equal(payload.ok, false);
  assert.match(payload.message, /RESEND_API_KEY/);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("production missing-configuration errors do not expose implementation details", async (t) => {
  setup(t, false);
  Object.assign(process.env, { NODE_ENV: "production" });
  const response = await reviewPost(request("reviews", review));
  assert.equal(response.status, 503);
  const payload = await response.json();
  assert.doesNotMatch(payload.message, /RESEND|\.env|API_KEY/);
});

test("WhatsApp requires a phone number and LinkedIn requires a real profile URL", async (t) => {
  setup(t);
  const whatsapp = await contactPost(request("contact", { ...contact, contactMethod: "WhatsApp" }));
  assert.equal(whatsapp.status, 422);
  assert.ok((await whatsapp.json()).fieldErrors.phone);
  const linkedin = await contactPost(request("contact", { ...contact, contactMethod: "LinkedIn", linkedin: "https://linkedin.com.attacker.example/in/example" }));
  assert.equal(linkedin.status, 422);
  assert.ok((await linkedin.json()).fieldErrors.linkedin);
  assert.equal(contactSchema.safeParse({ ...contact, contactMethod: "LinkedIn", linkedin: "https://www.linkedin.com/in/example/" }).success, true);
  assert.equal(contactSchema.safeParse({ ...contact, contactMethod: "LinkedIn", linkedin: "https://www.linkedin.com/in/" }).success, false);
  assert.equal(contactSchema.safeParse({ ...contact, contactMethod: "LinkedIn", linkedin: "https://www.linkedin.com:444/in/example/" }).success, false);
});

test("consent is required and a caller cannot self-approve a review", async (t) => {
  setup(t);
  const noConsent = await reviewPost(request("reviews", { ...review, consent: false }));
  assert.equal(noConsent.status, 422);
  assert.ok((await noConsent.json()).fieldErrors.consent);
  const approved = await reviewPost(request("reviews", { ...review, approved: true }));
  assert.equal(approved.status, 422);
  assert.equal(reviewSchema.safeParse({ ...review, rating: 6 }).success, false);
  assert.equal(reviewSchema.safeParse({ ...review, rating: 0 }).success, false);
});

test("review emails are unapproved and explicitly preserve anonymous publication", async (t) => {
  setup(t);
  t.mock.method(globalThis, "fetch", async (_url: Parameters<typeof fetch>[0], init?: Parameters<typeof fetch>[1]) => {
    const payload = JSON.parse(String(init?.body));
    assert.match(payload.text, /approved: false/);
    assert.match(payload.text, /Permitted public display name: Anonymous client/);
    assert.match(payload.text, /omit company, professional title/);
    assert.match(payload.text, /This review has NOT been published/);
    return Response.json({ id: "test-review-email" });
  });
  const response = await reviewPost(request("reviews", review));
  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.match(payload.message, /moderation/);
  assert.doesNotMatch(JSON.stringify(payload), /Example Professional/);
});

test("name privacy formatting never exposes a full name for restricted preferences", () => {
  assert.equal(reviewDisplayName({ name: "Samuel Example", privacyPreference: "first-name" }), "Samuel");
  assert.equal(reviewDisplayName({ name: "Samuel Example", privacyPreference: "anonymous" }), "Anonymous client");
  assert.equal(reviewDisplayName({ name: "Samuel Example", privacyPreference: "full-name" }), "Samuel Example");
});

test("provider rejection returns a safe failure without provider diagnostics", async (t) => {
  setup(t);
  t.mock.method(globalThis, "fetch", async () => Response.json({ message: "Private provider debug and re_test_not_a_real_key" }, { status: 403 }));
  const response = await contactPost(request("contact", contact));
  assert.equal(response.status, 502);
  const payload = await response.json();
  assert.equal(payload.ok, false);
  assert.doesNotMatch(payload.message, /Private provider|re_test/);
});

test("a malformed provider success cannot produce a false success state", async (t) => {
  setup(t);
  t.mock.method(globalThis, "fetch", async () => Response.json({}));
  const response = await contactPost(request("contact", contact));
  assert.equal(response.status, 502);
  assert.equal((await response.json()).ok, false);
});

test("network failures report uncertain delivery without exposing the cause", async (t) => {
  setup(t);
  t.mock.method(globalThis, "fetch", async () => { throw new TypeError("DNS failure: private-provider-debug"); });
  const response = await contactPost(request("contact", contact));
  assert.equal(response.status, 503);
  const payload = await response.json();
  assert.equal(payload.ok, false);
  assert.match(payload.message, /could not confirm delivery/i);
  assert.match(payload.message, /may have reached Samuel/);
  assert.doesNotMatch(payload.message, /DNS|private-provider-debug|did not respond in time/);
});

test("cross-origin requests and populated honeypots are blocked", async (t) => {
  setup(t);
  const otherOrigin = await contactPost(request("contact", contact, { Origin: "https://untrusted.example" }));
  assert.equal(otherOrigin.status, 403);
  const crossSite = await contactPost(request("contact", contact, { "sec-fetch-site": "cross-site" }));
  assert.equal(crossSite.status, 403);
  const honeypot = await contactPost(request("contact", { ...contact, website: "spam" }));
  assert.equal(honeypot.status, 400);
});

test("same-origin checks use the incoming Host when Next normalizes its internal URL", async (t) => {
  setup(t, false);
  const normalizedRequest = (origin: string, host = "127.0.0.1:3100") => new Request("http://localhost:3100/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", Origin: origin, Host: host,
      "Sec-Fetch-Site": "same-origin", "x-forwarded-for": "198.51.100.20",
    },
    body: JSON.stringify(contact),
  });
  const accepted = await contactPost(normalizedRequest("http://127.0.0.1:3100"));
  assert.equal(accepted.status, 503);
  assert.match((await accepted.json()).message, /Email is not configured/);
  assert.equal((await contactPost(normalizedRequest("http://localhost:3100"))).status, 403);
  assert.equal((await contactPost(normalizedRequest("https://untrusted.example"))).status, 403);
  assert.equal((await contactPost(normalizedRequest("http://127.0.0.1:3100", "127.0.0.1:3100/anything"))).status, 400);
});

test("forwarded transport is trusted only on the managed Vercel boundary", async (t) => {
  setup(t, false);
  delete process.env.NEXT_PUBLIC_SITE_URL;
  const proxiedRequest = () => new Request("http://localhost:3100/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", Origin: "https://portfolio.example.org", Host: "portfolio.example.org",
      "Sec-Fetch-Site": "same-origin", "x-forwarded-proto": "https", "x-forwarded-for": "198.51.100.21",
    },
    body: JSON.stringify(contact),
  });
  assert.equal((await contactPost(proxiedRequest())).status, 503);
  delete process.env.VERCEL;
  assert.equal((await contactPost(proxiedRequest())).status, 403);
});

test("oversized bodies are bounded even without a Content-Length header", async () => {
  const oversized = new Request("https://portfolio.example.org/api/contact", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: "x".repeat(25 * 1024) }),
  });
  await assert.rejects(readJsonBody(oversized), (error: unknown) => error instanceof RequestError && error.status === 413);
  const declaredOversized = new Request("https://portfolio.example.org/api/contact", {
    method: "POST", headers: { "Content-Type": "application/json", "Content-Length": String(25 * 1024) }, body: "{}",
  });
  await assert.rejects(readJsonBody(declaredOversized), (error: unknown) => error instanceof RequestError && error.status === 413);
});

test("malformed JSON and non-JSON requests get useful errors", async (t) => {
  setup(t);
  const malformed = new Request("https://portfolio.example.org/api/contact", {
    method: "POST", headers: { "Content-Type": "application/json", "x-forwarded-for": "198.51.100.1" }, body: "{broken",
  });
  assert.equal((await contactPost(malformed)).status, 400);
  assert.equal((await contactPost(request("contact", contact, { "Content-Type": "text/plain" }))).status, 415);
  assert.equal((await contactPost(request("contact", contact, { "Content-Type": "application/json-not-a-real-type" }))).status, 415);
  assert.deepEqual(await readJsonBody(request("contact", { value: "accepted" }, { "Content-Type": "application/json; charset=utf-8" })), { value: "accepted" });
});

test("validation rejects empty experience, header control characters and oversized messages", () => {
  assert.equal(contactSchema.safeParse({ ...contact, experience: "" }).success, false);
  assert.equal(contactSchema.safeParse({ ...contact, experience: "10.5" }).success, false);
  assert.equal(contactSchema.safeParse({ ...contact, name: "Example\r\nBcc: unwanted@example.org" }).success, false);
  assert.equal(contactSchema.safeParse({ ...contact, help: "x".repeat(3001) }).success, false);
  assert.equal(contactSchema.safeParse({ ...contact, experience: 0 }).success, true);
});

test("rate limits reject a sixth attempt and expire after fifteen minutes", () => {
  const key = "test-rate-limit";
  const now = Date.now();
  for (let attempt = 0; attempt < 5; attempt++) checkRateLimit(key, now);
  assert.throws(() => checkRateLimit(key, now), (error: unknown) => error instanceof RequestError && error.status === 429 && error.retryAfter === 900);
  assert.doesNotThrow(() => checkRateLimit(key, now + 15 * 60 * 1000));
});
