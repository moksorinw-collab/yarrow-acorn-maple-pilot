import { chromium } from "playwright";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const html = pathToFileURL(resolve("/workspace/.grok/og-card.html")).href;
const out = resolve("/workspace/.grok/og-card-raw.png");
const faviconHtml = pathToFileURL(resolve("/workspace/.grok/favicon-preview.html")).href;

const browser = await chromium.launch({ args: ["--disable-web-security"] });
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,
});
await page.goto(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(200);
await page.screenshot({ path: out, type: "png" });

const favPage = await browser.newPage({
  viewport: { width: 128, height: 128 },
  deviceScaleFactor: 1,
});
await favPage.goto(faviconHtml, { waitUntil: "networkidle" });
await favPage.screenshot({ path: "/workspace/.grok/favicon-128.png", type: "png" });

const fav16 = await browser.newPage({
  viewport: { width: 16, height: 16 },
  deviceScaleFactor: 1,
});
await fav16.goto(faviconHtml, { waitUntil: "networkidle" });
await fav16.screenshot({ path: "/workspace/.grok/favicon-16.png", type: "png" });

await browser.close();
console.log("wrote", out);
