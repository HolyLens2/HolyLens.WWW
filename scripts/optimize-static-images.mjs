import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const site = path.join(root, "static-site");
const imageRoot = path.join(site, "images", "holylens");

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(target));
    else files.push(target);
  }
  return files;
}

const contentFiles = (await walk(site)).filter((file) => /\.(?:html|css)$/i.test(file));
const contents = new Map(await Promise.all(contentFiles.map(async (file) => [file, await fs.readFile(file, "utf8")])));
const referencedPngs = new Set();

for (const content of contents.values()) {
  for (const match of content.matchAll(/\/images\/holylens\/([A-Za-z0-9._-]+\.png)/g)) referencedPngs.add(match[1]);
}

let originalBytes = 0;
let optimizedBytes = 0;
let converted = 0;
const replacements = new Map();

for (const filename of referencedPngs) {
  const input = path.join(imageRoot, filename);
  const inputStat = await fs.stat(input);
  if (inputStat.size < 128 * 1024 || filename === "logo-hd.png") continue;

  const webpName = filename.replace(/\.png$/i, ".webp");
  const output = path.join(imageRoot, webpName);
  await sharp(input).webp({ quality: 84, alphaQuality: 92, effort: 6, smartSubsample: true }).toFile(output);
  const outputStat = await fs.stat(output);

  if (outputStat.size >= inputStat.size * 0.95) {
    await fs.rm(output, { force: true });
    continue;
  }

  replacements.set(filename, webpName);
  originalBytes += inputStat.size;
  optimizedBytes += outputStat.size;
  converted += 1;
}

for (const [file, source] of contents) {
  let content = source;
  for (const [png, webp] of replacements) content = content.replaceAll(`/images/holylens/${png}`, `/images/holylens/${webp}`);

  if (/\.html$/i.test(file)) {
    content = content
      .replace(/<img([^>]*class="[^"]*hero-photo[^"]*"[^>]*)>/gi, '<img$1 fetchpriority="high" decoding="async">')
      .replace(/(<div class="detail-hero-image[^"]*"><img)(?![^>]*fetchpriority=)/gi, '$1 fetchpriority="high" decoding="async"')
      .replace(/<img(?![^>]*(?:loading=|fetchpriority=))([^>]*)>/gi, '<img loading="lazy" decoding="async"$1>');
  }

  if (content !== source) await fs.writeFile(file, content, "utf8");
}

const saved = originalBytes - optimizedBytes;
console.log(`Optimized ${converted} referenced PNG images: ${(originalBytes / 1048576).toFixed(1)} MB → ${(optimizedBytes / 1048576).toFixed(1)} MB (saved ${(saved / 1048576).toFixed(1)} MB).`);
