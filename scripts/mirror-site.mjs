import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ORIGIN = "https://www.holylens.com";
const OUT = path.resolve("source/holylens.com");
const queue = [new URL("/", ORIGIN)];
const seen = new Set();
const htmlPages = new Set();

const isSkippable = (value) =>
  !value || /^(?:#|data:|mailto:|tel:|javascript:)/i.test(value.trim());

function localPath(url, contentType = "") {
  let pathname = decodeURIComponent(url.pathname);
  if (pathname.endsWith("/")) pathname += "index.html";
  if (!path.extname(pathname) && contentType.includes("text/html")) {
    pathname += ".html";
  }
  return path.join(OUT, pathname.replace(/^\/+/, ""));
}

function enqueue(raw, base, { followHtml = false } = {}) {
  if (isSkippable(raw)) return;
  let url;
  try {
    url = new URL(raw.trim().replace(/^['"]|['"]$/g, ""), base);
  } catch {
    return;
  }
  if (url.origin !== ORIGIN) return;
  url.hash = "";
  const ext = path.extname(url.pathname).toLowerCase();
  const isHtml = !ext || ext === ".html" || ext === ".htm";
  if (followHtml && isHtml) htmlPages.add(url.href);
  if (followHtml || !isHtml) queue.push(url);
}

function extractHtml(html, base) {
  for (const match of html.matchAll(/\b(?:href|src|poster|data-src|data-bg-image)\s*=\s*["']([^"']+)["']/gi)) {
    const attr = match[0].slice(0, match[0].indexOf("=")).trim().toLowerCase();
    enqueue(match[1], base, { followHtml: attr === "href" });
  }
  for (const match of html.matchAll(/\bsrcset\s*=\s*["']([^"']+)["']/gi)) {
    for (const item of match[1].split(",")) enqueue(item.trim().split(/\s+/)[0], base);
  }
  for (const match of html.matchAll(/url\(\s*([^)]+?)\s*\)/gi)) enqueue(match[1], base);
}

function extractCss(css, base) {
  for (const match of css.matchAll(/url\(\s*([^)]+?)\s*\)/gi)) enqueue(match[1], base);
  for (const match of css.matchAll(/@import\s+(?:url\()?\s*["']?([^"')\s;]+)["']?/gi)) {
    enqueue(match[1], base);
  }
}

while (queue.length) {
  const url = queue.shift();
  const key = `${url.origin}${url.pathname}`;
  if (seen.has(key)) continue;
  seen.add(key);

  const response = await fetch(url, {
    redirect: "follow",
    headers: { "user-agent": "HolyLens bilingual site migration" },
  });
  if (!response.ok) {
    console.warn(`${response.status} ${url.href}`);
    continue;
  }

  const contentType = response.headers.get("content-type") || "";
  const bytes = new Uint8Array(await response.arrayBuffer());
  const destination = localPath(url, contentType);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, bytes);

  if (contentType.includes("text/html") || /\.html?$/.test(url.pathname) || url.pathname === "/") {
    const html = new TextDecoder().decode(bytes);
    extractHtml(html, url);
  } else if (contentType.includes("text/css") || url.pathname.endsWith(".css")) {
    const css = new TextDecoder().decode(bytes);
    extractCss(css, url);
  }

  if (seen.size > 1200) throw new Error("Crawl stopped: more than 1200 files discovered");
}

console.log(`Mirrored ${seen.size} same-origin files.`);
console.log(`Discovered ${htmlPages.size} linked HTML pages.`);
