import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

for (const lang of ["zh", "en"]) {
  const file = path.join(root, "static-site", lang, "index.html");
  let html = await fs.readFile(file, "utf8");
  html = html
    .replace(/<section class="contact" id="contact">[\s\S]*?<\/section>/, "")
    .replaceAll('href="#contact"', `href="/${lang}/contact/"`);
  await fs.writeFile(file, html, "utf8");
}

console.log("Removed the homepage contact section and updated its links.");
