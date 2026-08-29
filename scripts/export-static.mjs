import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, "static-site");

async function exportPage(route, destination) {
  const response = await fetch(`http://localhost:3000${route}`);
  if (!response.ok) throw new Error(`Failed to render ${route}: ${response.status}`);
  let html = await response.text();

  html = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b[^>]*(?:modulepreload|data-rsc-css-href)[^>]*\/?\s*>/gi, "")
    .replace(/<style\b[^>]*data-vinext-fonts[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<!--\s*-->/g, "")
    .replaceAll('/favicon.svg', '/favicon.png')
    .replace("</head>", '<link rel="stylesheet" href="/styles.css"/></head>')
    .replaceAll('href="/product"', 'href="/product/"')
    .replaceAll('href="/"', 'href="/"');

  const target = path.join(out, destination);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, html, "utf8");
}

await fs.rm(out, { recursive: true, force: true });
await fs.mkdir(out, { recursive: true });
await exportPage("/", "index.html");
await exportPage("/product", "product/index.html");
await exportPage("/product/miniscope-1", "product/miniscope-1/index.html");

let css = await fs.readFile(path.join(root, "app", "globals.css"), "utf8");
css = css.replace(/^@import\s+["']tailwindcss["'];?\s*/m, "");
await fs.writeFile(path.join(out, "styles.css"), css, "utf8");
await fs.cp(path.join(root, "public", "images"), path.join(out, "images"), { recursive: true });
await fs.copyFile(path.join(root, "public", "favicon.png"), path.join(out, "favicon.png"));
await fs.mkdir(path.join(out, ".vscode"), { recursive: true });
await fs.writeFile(path.join(out, ".vscode", "extensions.json"), '{"recommendations":["ritwickdey.liveserver"]}\n');
await fs.writeFile(path.join(out, ".vscode", "settings.json"), '{"liveServer.settings.port":8080,"liveServer.settings.root":"/"}\n');
await fs.writeFile(path.join(out, "serve.ps1"), 'Set-Location -LiteralPath $PSScriptRoot\npython -m http.server 8080 --bind 127.0.0.1\n');
await fs.writeFile(path.join(out, "CNAME"), "holylens.com\n");

console.log(`Static site exported to ${out}`);
