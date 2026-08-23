import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders confirmed TEDxGHRCEMN event information", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /TEDxGHRCEMN • 9 SEPTEMBER 2026/);
  assert.match(html, /9:00 AM–6:00 PM IST/);
  assert.match(html, /https:\/\/konfhub\.com\/tedxghrcemn-82e1c5a4/);
  assert.match(html, /This independent TEDx event is operated under license from TED\./);
  assert.doesNotMatch(html, /AUGUST 2026 • TENTATIVE|\[OFFICIAL_EMAIL\]|\[MAP_EMBED_URL\]/);
});

test("publishes the verified Pre-Fest registrations", async () => {
  const response = await render("/activities");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Beyond Build/);
  assert.match(html, /AI in Development &amp; Design/);
  assert.match(html, /https:\/\/konfhub\.com\/beyondbuild/);
  assert.match(html, /https:\/\/konfhub\.com\/ai-in-development-design/);
  assert.match(html, /8 September 2026/);
  assert.match(html, /₹99/);
});

test("publishes first-edition photography in the gallery", async () => {
  const response = await render("/gallery");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /\/gallery\/audience-01\.jpg/);
  assert.match(html, /Last Year&#x27;s Photos/);
  assert.doesNotMatch(html, /Gallery categories|Gallery image coming soon/);
});

test("keeps official external links and contact details in source data", async () => {
  const data = await readFile(new URL("../data/site.ts", import.meta.url), "utf8");
  assert.match(data, /https:\/\/www\.instagram\.com\/tedx_ghrcemn\//);
  assert.match(data, /https:\/\/www\.ted\.com\/tedx\/events\/69572/);
  assert.match(data, /https:\/\/ghrcemn\.raisoni\.net/);
  assert.match(data, /tedxghrcemn@gmail\.com/);
});
