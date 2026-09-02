import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const labPage = path.join(root, "public", "lab-static", "index.html");

// Projects whose HTTPS endpoint currently has a valid SSL certificate.
const publishedHosts = new Set([
  "bsg.holylens.com",
  "cbr.holylens.com",
  "ct.holylens.com",
  "drm.holylens.com",
  "fhs.holylens.com",
  "fnd.holylens.com",
  "oto.holylens.com",
  "pcg.holylens.com",
  "vag.holylens.com",
  "vsc.holylens.com",
  "wnd.holylens.com",
]);

// Keep Lab links aligned with the actual IIS project host names.
const canonicalHosts = new Map([
  ["cough.holylens.com", "cbr.holylens.com"],
  ["derm.holylens.com", "drm.holylens.com"],
  ["fcg.holylens.com", "fhs.holylens.com"],
  ["vsg.holylens.com", "vsc.holylens.com"],
  ["wound.holylens.com", "wnd.holylens.com"],
]);

let html = await fs.readFile(labPage, "utf8");
html = html.replace(
  /<article class="([^"]+)"([^>]*)><a class="([^"]+)" href="https:\/\/([^/]+)\/zh\//g,
  (match, classes, attributes, linkClass, originalHost) => {
    const host = canonicalHosts.get(originalHost) ?? originalHost;
    const state = publishedHosts.has(host) ? "is-published" : "is-unpublished";
    const normalizedClasses = classes
      .split(/\s+/)
      .filter((name) => name && name !== "is-published" && name !== "is-unpublished")
      .concat(state)
      .join(" ");
    return `<article class="${normalizedClasses}"${attributes}><a class="${linkClass}" href="https://${host}/zh/`;
  },
);
html = html.replace(/lab-extra\.css\?v=[^"]+/g, "lab-extra.css?v=availability-1");

await fs.writeFile(labPage, html, "utf8");
console.log(`Marked ${publishedHosts.size} published Lab modules and 19 unpublished modules.`);
