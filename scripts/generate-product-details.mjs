import fs from "node:fs/promises";
import path from "node:path";
import { productDetailCatalog } from "./product-detail-catalog.mjs";

const root = process.cwd();
const site = path.join(root, "static-site");
const templates = {
  root: await fs.readFile(path.join(site, "product", "miniscope-1", "index.html"), "utf8"),
  en: await fs.readFile(path.join(site, "en", "product", "miniscope-1", "index.html"), "utf8"),
  zh: await fs.readFile(path.join(site, "zh", "product", "miniscope-1", "index.html"), "utf8"),
};

const labels = {
  en: { back: "← All products", request: "Request product information", overview: "PRODUCT OVERVIEW", functions: "CORE FUNCTIONS", structure: "DEVICE STRUCTURE", workflow: "CLINICAL WORKFLOW", specs: "SPECIFICATIONS", settings: "INTENDED SETTINGS", enquiries: "PRODUCT ENQUIRIES", note: "Specifications shown are the proposed product configuration and may vary by region or final regulatory authorization.", cta: "Talk with the HolyLens team about product configuration, availability and integration." },
  zh: { back: "← 返回全部产品", request: "索取产品资料", overview: "产品概览", functions: "核心功能", structure: "设备结构", workflow: "使用流程", specs: "产品规格", settings: "适用场景", enquiries: "产品咨询", note: "所示规格为建议产品配置，可能因地区或最终监管许可而有所不同。", cta: "与 HolyLens 团队沟通产品配置、供应情况与使用集成方案。" },
};

const localized = (entry, lang) => entry[lang];
const split = (entry, lang) => localized(entry, lang).split("|");
const subject = (name) => encodeURIComponent(`${name} enquiry`).replaceAll("%20", "%20");

function sectionReplace(html, className, content) {
  return html.replace(new RegExp(`<section class="${className}"[\\s\\S]*?<\\/section>`), content);
}

function renderPage(template, product, lang, prefix) {
  const l = labels[lang];
  const name = localized(product.name, lang);
  const mailSubject = subject(product.name.en);
  const productHref = `${prefix}/product/`;
  const wideHeroClass = product.hero.startsWith("product-effect-") ? " detail-hero-wide" : "";
  const tags = product.tags.map((tag) => `<span>${localized(tag, lang)}</span>`).join("");
  const features = product.features.map((feature, index) => { const [title, body] = split(feature, lang); return `<article><span>0${index + 1}</span><div><h3>${title}</h3><p>${body}</p></div></article>`; }).join("");
  const structureItems = product.structureItems.map((item) => { const [title, body] = split(item, lang); return `<li><b>${title}</b><span>${body}</span></li>`; }).join("");
  const workflow = product.workflow.map((step, index) => { const [title, body] = split(step, lang); return `<article><span>0${index + 1}</span><h3>${title}</h3><p>${body}</p></article>`; }).join("");
  const specs = product.specs.map((spec) => { const [term, value] = split(spec, lang); return `<div><dt>${term}</dt><dd>${value}</dd></div>`; }).join("");
  const settings = product.settings.map((setting) => { const [title, body] = split(setting, lang); return `<article><h3>${title}</h3><p>${body}</p></article>`; }).join("");

  let html = template.replaceAll("/product/miniscope-1/", `/product/${product.slug}/`);
  html = sectionReplace(html, "detail-hero", `<section class="detail-hero"><div class="detail-hero-copy"><a class="detail-back" href="${productHref}">${l.back}</a><p class="detail-kicker">${localized(product.kicker, lang)}</p><h1>${name}</h1><p class="detail-lead">${localized(product.tagline, lang)}</p><div class="detail-tags">${tags}</div><a class="detail-primary" href="mailto:sales@holylens.com?subject=${mailSubject}">${l.request} <b>↗</b></a></div><div class="detail-hero-image${wideHeroClass}"><img src="/images/holylens/${product.hero}" alt="${name}"/></div></section>`);
  html = sectionReplace(html, "detail-intro", `<section class="detail-intro"><p class="detail-section-label">${l.overview}</p><div><h2>${localized(product.overviewTitle, lang)}</h2><p>${localized(product.overview, lang)}</p></div></section>`);
  html = sectionReplace(html, "detail-features", `<section class="detail-features"><div class="detail-feature-image"><img src="/images/holylens/${product.scene}" alt="${name}"/></div><div class="detail-feature-copy"><p class="detail-section-label">${l.functions}</p><h2>${localized(product.featureTitle, lang)}</h2><div class="feature-list">${features}</div></div></section>`);
  html = sectionReplace(html, "detail-structure", `<section class="detail-structure"><div class="detail-structure-copy"><p class="detail-section-label">${l.structure}</p><h2>${localized(product.structureTitle, lang)}</h2><p>${localized(product.structureBody, lang)}</p><ol>${structureItems}</ol></div><div class="detail-structure-image"><img src="/images/holylens/${product.structure}" alt="${name}"/></div></section>`);
  html = sectionReplace(html, "detail-workflow", `<section class="detail-workflow"><p class="detail-section-label">${l.workflow}</p><h2>${localized(product.workflowTitle, lang)}</h2><div class="workflow-steps">${workflow}</div></section>`);
  html = sectionReplace(html, "detail-specs", `<section class="detail-specs" id="specifications"><div><p class="detail-section-label">${l.specs}</p><h2>${name}<br/>${lang === "zh" ? "技术规格。" : "technical profile."}</h2><p>${l.note}</p></div><dl>${specs}</dl></section>`);
  html = sectionReplace(html, "detail-use-cases", `<section class="detail-use-cases"><div><p class="detail-section-label">${l.settings}</p><h2>${localized(product.settingsTitle, lang)}</h2></div><div class="use-case-grid">${settings}</div></section>`);
  html = sectionReplace(html, "detail-cta", `<section class="detail-cta"><div><p class="detail-section-label">${l.enquiries}</p><h2>${localized(product.ctaTitle, lang)}</h2></div><div><p>${l.cta}</p><a href="mailto:sales@holylens.com?subject=${mailSubject}">sales@holylens.com ↗</a><span>+86 177 2101 8082</span></div></section>`);
  return html;
}

for (const product of productDetailCatalog) {
  for (const [variant, template] of Object.entries(templates)) {
    const lang = variant === "zh" ? "zh" : "en";
    const prefix = variant === "root" ? "" : `/${variant}`;
    const target = variant === "root" ? path.join(site, "product", product.slug, "index.html") : path.join(site, variant, "product", product.slug, "index.html");
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, renderPage(template, product, lang, prefix), "utf8");
  }
}

console.log(`Generated ${productDetailCatalog.length * 3} additional product detail pages.`);
