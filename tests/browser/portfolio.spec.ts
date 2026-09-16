import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { siteConfig } from "../../lib/siteConfig";

const pages = ["/", "/about", "/services", "/case-studies", "/insights", "/contact", "/privacy", "/disclaimer"];

// Browser checks must never send real submissions, including when reusing a
// server that loaded .env.local. API tests separately exercise the route handlers.
test.beforeEach(async ({ page }) => {
  await page.route("**/api/{contact,reviews}", route => route.fulfill({
    status: 503,
    json: { ok: false, message: "The form is temporarily unavailable. Please try again later." },
  }));
});

for (const width of [375, 430, 768, 1024, 1280, 1440]) {
  test(`public pages render without horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    for (const path of pages) {
      const response = await page.goto(path);
      expect(response?.status(), path).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.getByRole("main")).toBeVisible();
      const overflow = await page.evaluate(() => ({ width: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
      expect(overflow.content, `${path} at ${width}px`).toBeLessThanOrEqual(overflow.width);
    }
    expect(errors).toEqual([]);
  });
}

test("mobile menu supports navigation, Escape and keyboard focus", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  const mobile = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(mobile).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(mobile).not.toBeVisible();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await mobile.getByRole("link", { name: "Services", exact: true }).click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).not.toBeVisible();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("service category links, searches and details work", async ({ page }) => {
  await page.goto("/services?category=fellowship");
  await expect(page.locator(".service-card")).toHaveCount(2);
  await expect(page.locator(".service-card").first()).toContainText("FIET");
  await page.getByRole("button", { name: "All services", exact: true }).click();
  await expect(page.locator(".service-card")).toHaveCount(12);
  await page.getByRole("searchbox").fill("zz-no-matching-service");
  await expect(page.locator(".service-card")).toHaveCount(0);
  await expect(page.locator(".empty-state")).toBeVisible();
  await page.getByRole("searchbox").fill("O-1A");
  await expect(page.locator(".service-card")).toHaveCount(1);
  await page.locator(".service-card").getByRole("link").last().click();
  await expect(page.locator("h1")).toContainText("O-1A");
  await page.locator(".detail-sidebar").getByRole("link", { name: /assessment|consultation/i }).first().click();
  await expect(page.getByLabel("Target service")).toHaveValue("O-1A Profile Development");
});

test("articles are readable and drafts remain labeled", async ({ page }) => {
  await page.goto("/insights");
  await expect(page.locator(".article-card")).toHaveCount(5);
  await page.locator(".article-card").first().getByRole("heading").getByRole("link").click();
  await expect(page.locator(".article-body")).toBeVisible();
  await expect(page.getByText("Sample article · Editorial draft", { exact: true })).toBeVisible();
});

test("review dialog works on mobile, validates, and never publishes submissions", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/#testimonials");
  const trigger = page.getByRole("button", { name: "Share Your Experience", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.click({ position: { x: 10, y: 10 } });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Submit Review" }).click();
  await expect(dialog.locator(".form-error").first()).toBeVisible();
  await dialog.getByLabel("Full name").fill("Example Professional");
  await dialog.getByLabel("Professional title").fill("Engineer");
  await dialog.getByLabel("Service used").selectOption("Professional Profile Assessment");
  await dialog.getByRole("radio", { name: "5 stars", exact: true }).check();
  await dialog.getByLabel("Review / testimonial").fill("A browser test review that must never be published to the live page.");
  await dialog.getByRole("checkbox").check();
  const reviewResponse = page.waitForResponse("**/api/reviews");
  await dialog.getByRole("button", { name: "Submit Review" }).click();
  expect((await reviewResponse).status()).toBe(503);
  await expect(dialog.locator(".form-status-error")).toBeVisible();
  await expect(dialog.getByLabel("Full name")).toHaveValue("Example Professional");
  expect(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  await page.route("**/api/reviews", route => route.fulfill({ status: 200, json: { ok: true, message: "Your review was received for moderation. It will not appear automatically." } }));
  await dialog.getByRole("button", { name: "Submit Review" }).click();
  await expect(dialog.locator(".form-status-success")).toBeFocused();
  await expect(dialog.getByRole("button", { name: "Share another experience" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(page.locator(".testimonials-empty")).toContainText("Client testimonials will be added with permission.");
});

test("consultation retains input on delivery failure and handles confirmed success", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Full name").fill("Example Professional");
  await page.getByLabel("Email address").fill("example@example.org");
  await page.getByLabel("Phone number").fill("+234 803 123 4567");
  await page.getByLabel(/^Country/).fill("Nigeria");
  await page.getByLabel("Profession / job title").fill("Engineer");
  await page.getByLabel("Years of professional experience").fill("10");
  await page.getByLabel("Target service").selectOption("Professional Profile Assessment");
  await page.getByLabel("Current situation").fill("I would like to organize my professional achievements.");
  await page.getByLabel("What would you like help with?").fill("I need a clear roadmap for documenting evidence.");
  await page.getByRole("checkbox").check();
  const responsePromise = page.waitForResponse("**/api/contact");
  await page.getByRole("button", { name: "Request Consultation" }).click();
  expect((await responsePromise).status()).toBe(503);
  await expect(page.locator(".form-status-error")).toBeVisible();
  await expect(page.getByLabel("Full name")).toHaveValue("Example Professional");
  await expect(page.getByRole("button", { name: "Request Consultation" })).toBeEnabled();
  let releaseDelivery!: () => void;
  const delivery = new Promise<void>(resolve => { releaseDelivery = resolve; });
  await page.route("**/api/contact", async route => {
    await delivery;
    await route.fulfill({ status: 200, json: { ok: true, message: "Your consultation request has been received." } });
  });
  await page.getByRole("button", { name: "Request Consultation" }).click();
  await expect(page.getByRole("button", { name: "Sending…" })).toBeDisabled();
  releaseDelivery();
  await expect(page.locator(".form-status-success")).toBeFocused();
  await expect(page.getByRole("button", { name: "Send another inquiry" })).toBeVisible();
});

test("assessment validates email and required phone before submitting a manual country", async ({ page }) => {
  const submissions: Record<string, unknown>[] = [];
  await page.route("**/api/contact", async route => {
    submissions.push(route.request().postDataJSON());
    await route.fulfill({ status: 200, json: { ok: true, message: "Your consultation request has been received." } });
  });
  await page.goto("/contact");
  const email = page.getByLabel("Email address");
  const phone = page.getByLabel("Phone number");
  const submit = page.getByRole("button", { name: "Request Consultation" });
  await page.getByLabel("Full name").fill("Example Professional");
  await email.fill("not-an-email");
  await expect(email).toHaveAttribute("type", "email");
  await expect(phone).toHaveAttribute("required", "");
  await submit.click();
  expect(await email.evaluate((input: HTMLInputElement) => input.validity.typeMismatch)).toBe(true);
  await expect(email).toBeFocused();
  expect(submissions).toHaveLength(0);

  await email.fill("example@example.org");
  await submit.click();
  expect(await phone.evaluate((input: HTMLInputElement) => input.validity.valueMissing)).toBe(true);
  await expect(phone).toBeFocused();
  expect(submissions).toHaveLength(0);

  await phone.fill("+234 803 123 4567");
  await page.getByRole("combobox", { name: /^Country/ }).fill("Kosovo");
  await page.getByLabel("Profession / job title").fill("Engineer");
  await page.getByLabel("Years of professional experience").fill("10");
  await page.getByLabel("Target service").selectOption("Professional Profile Assessment");
  await page.getByLabel("Current situation").fill("I would like to organize my professional achievements.");
  await page.getByLabel("What would you like help with?").fill("I need a clear roadmap for documenting evidence.");
  await page.getByRole("checkbox").check();
  await email.fill("example@example");
  await submit.click();
  await expect(page.locator(".form-error")).toContainText("Enter a valid email address.");
  expect(submissions).toHaveLength(0);

  await email.fill("example@example.org");
  await phone.fill("call me tomorrow");
  await submit.click();
  await expect(phone).toHaveAttribute("aria-invalid", "true");
  expect(submissions).toHaveLength(0);

  await phone.fill("+234 803 123 4567");
  await submit.click();
  await expect(page.locator(".form-status-success")).toBeFocused();
  expect(submissions).toHaveLength(1);
  expect(submissions[0]).toMatchObject({ email: "example@example.org", phone: "+234 803 123 4567", country: "Kosovo" });
});

test("country dropdown is alphabetical, searchable and keyboard accessible on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/contact");
  const country = page.getByRole("combobox", { name: /^Country/ });
  await country.focus();
  await country.press("ArrowDown");
  const list = page.getByRole("listbox");
  await expect(list).toBeVisible();
  await expect(list.getByRole("option")).toHaveCount(249);
  const names = await list.getByRole("option").allTextContents();
  expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, "en")));
  await expect(list.getByRole("option").first()).toContainText("Afghanistan");
  await expect(list.getByRole("option").last()).toContainText("Zimbabwe");
  await country.press("Escape");
  await expect(list).not.toBeVisible();
  await expect(country).toBeFocused();

  await country.fill("nige");
  await expect(list.getByRole("option", { name: "Nigeria", exact: true })).toBeVisible();
  await list.getByRole("option", { name: "Nigeria", exact: true }).click();
  await expect(country).toHaveValue("Nigeria");
  await expect(list).not.toBeVisible();
  await country.fill("canada");
  await country.press("ArrowDown");
  await country.press("Enter");
  await expect(country).toHaveValue("Canada");
  await expect(list).not.toBeVisible();
  await country.fill("My manually entered country");
  await country.press("Tab");
  await expect(list).not.toBeVisible();
  await expect(country).toHaveValue("My manually entered country");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

  await country.fill("");
  await country.press("ArrowDown");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(results.violations.map(violation => ({ id: violation.id, targets: violation.nodes.map(node => node.target) }))).toEqual([]);
});

test("metadata, sitemap, profile assets and reduced motion have safe defaults", async ({ page, request }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  const imageFile = ["samuel-profile.jpg", "samuel-profile.png"].find(file => existsSync(join(process.cwd(), "public/images", file)));
  if (imageFile) {
    const portrait = page.getByRole("img", { name: siteConfig.name, exact: true });
    await expect(portrait).toBeVisible();
    await expect.poll(() => portrait.evaluate(image => {
      const element = image as HTMLImageElement;
      return element.complete && element.naturalWidth > 0 && element.naturalHeight > 0;
    })).toBe(true);
    await expect(page.locator(".profile-monogram")).toHaveCount(0);
  } else {
    const initials = siteConfig.name.split(" ").map(part => part[0]).join("");
    await expect(page.getByRole("img", { name: `${initials}, initials of ${siteConfig.name}`, exact: true })).toBeVisible();
    await expect(page.locator(".profile-image img")).toHaveCount(0);
  }
  await expect(page.getByRole("link", { name: "Download CV" })).toHaveCount(0);
  await expect(page.locator('a[href*="YOUR_"]')).toHaveCount(0);
  expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toMatch(/^https?:\/\//);
  expect(JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) || "{}")["@graph"]).toHaveLength(3);
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect((await request.get("/robots.txt")).status()).toBe(200);
  expect((await request.get("/opengraph-image")).status()).toBe(200);
  expect((await request.get("/page-that-does-not-exist")).status()).toBe(404);
  const faq = page.locator(".faq-item").filter({ hasText: "Do you guarantee EB-1A approval?" });
  await faq.locator("summary").click();
  await expect(faq.locator("p")).toBeVisible();
  await faq.locator("summary").press("Enter");
  await expect(faq.locator("p")).not.toBeVisible();
});

test("core pages have no automated WCAG A/AA violations", async ({ page }) => {
  test.setTimeout(90_000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of pages) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(results.violations.map(violation => ({ id: violation.id, nodes: violation.nodes.map(node => ({ target: node.target, summary: node.failureSummary })) })), path).toEqual([]);
  }
});
