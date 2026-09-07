import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const site = path.join(root, "static-site");
const scriptTag = '<script src="/mobile-nav.js"></script>';

async function visit(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await visit(target);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith(".html")) continue;
    const html = await fs.readFile(target, "utf8");
    if (html.includes('/mobile-nav.js') || !html.includes("</body>")) continue;
    await fs.writeFile(target, html.replace("</body>", `${scriptTag}</body>`), "utf8");
  }
}

await fs.copyFile(path.join(root, "public", "mobile-nav.js"), path.join(site, "mobile-nav.js"));
await visit(site);
console.log("Mobile navigation added to the static site.");
