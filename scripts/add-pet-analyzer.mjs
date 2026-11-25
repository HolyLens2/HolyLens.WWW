import fs from 'node:fs/promises';
import path from 'node:path';

// Public product information derived from the supplied engineering proposal.
// Keep internal BOM, pricing and unvalidated commercial claims out of the site.
const root = process.cwd();
const slug = 'pet-5diff';
const image = '/images/holylens/pet-5diff-exterior-solid.jpg';
const structure = '/images/holylens/pet-5diff-back-solid.jpg';
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const content = {
  zh: {
    name: '宠物AI五分类血液分析仪', category: '面向宠物',
    categoryTitle: '为宠物诊疗设计的智能设备',
    categoryText: '以微流控与 AI 显微成像，支持宠物医院的血常规检测与细胞形态学复核。',
    kicker: '宠物五分类血常规 · 研发中',
    lead: '单人份微流控卡盒与 AI 显微成像，让血细胞计数与形态学观察在一台桌面设备中协同完成。',
    tags: ['五分类血常规', 'AI 显微成像', '单人份卡盒'],
    back: '← 返回全部设备', request: '咨询产品方案', overview: '产品概览',
    overviewTitle: '看见血细胞，<br/>理解更多细节。',
    overviewText: '面向宠物医院与连锁诊疗机构的桌面式血液分析研发方案。通过一次性微流控卡盒承载样本，结合明场、荧光成像与 AI 分析，规划输出血常规参数及可供兽医复核的细胞图像。优先围绕犬猫场景开展研发，其他物种能力需分别验证。',
    functions: '核心功能', featureTitle: '从数值到图像，<br/>连接检验与复核。',
    features: [
      ['白细胞五分类', '规划识别中性粒细胞、淋巴细胞、单核细胞、嗜酸性粒细胞及嗜碱性粒细胞，并结合红细胞、血小板相关分析形成血常规报告。'],
      ['单人份微流控卡盒', '样本与试剂置于一次性卡盒内，主机不采用传统湿式分析管路。使用后的卡盒按生物样本耗材要求处置。'],
      ['AI 辅助形态学观察', '保留细胞显微图像，规划对血小板聚集及异常细胞线索进行提示，支持兽医人工复核；相关性能需经验证。'],
      ['一体化触屏工作台', '10.1英寸触屏整合样本操作、结果查看与图像复核。单次分析时间设计目标为3–5分钟，实际表现以验证结果为准。'],
    ],
    structureLabel: '设备结构', structureTitle: '紧凑机身，<br/>集成完整成像链路。',
    structureText: '外观图展示完整不透明机身及背部接口，来自本产品三维工程概念模型。下方模块示意说明内部功能组成，不采用透视外壳展示。',
    structureItems: [
      ['显示与计算', '10.1英寸触屏；Windows 11工控平台，负责交互、图像处理与AI推理。'],
      ['微流控卡盒舱', '前置舱门、电动进出卡托盘及卡盒识别模块。'],
      ['光学与精密运动', '500万像素相机、20×/40×物镜、XY扫描与Z轴自动对焦。'],
      ['控制、接口与散热', 'STM32控制板、24V供电、USB接口及带HEPA过滤的散热风道。'],
    ],
    workflowLabel: '操作流程', workflowTitle: '一张卡盒，<br/>连接四步检验流程。',
    workflow: [['准备样本', '按经验证的采样及卡盒操作规程准备样本。'], ['放入卡盒', '将单人份卡盒放入前舱，识别卡盒并确认样本信息。'], ['扫描分析', '自动对焦与扫描获取细胞图像，运行计数与分类算法。'], ['复核报告', '兽医结合参数、原始图像与提示信息复核结果。']],
    specsLabel: '产品规格', specsTitle: '工程配置与设计目标。',
    note: '本页展示研发阶段配置与设计目标，并非已验证的性能承诺。样本量、精密度、准确度、参考区间、物种适配及上市信息尚待确定。',
    specs: [['外形尺寸', '310 × 310 × 315毫米'], ['设备形式', '桌面式一体机'], ['检测路线', '单人份微流控卡盒 + AI显微成像'], ['分析内容', '白细胞五分类；血常规26项参数为规划目标，具体清单待验证'], ['分析时间', '设计目标3–5分钟/次'], ['适用物种', '犬、猫为研发重点；其他物种待验证'], ['显示屏', '10.1英寸IPS电容触屏，1280 × 800'], ['成像配置', '500万像素全局快门USB 3.0相机；20×/40×物镜'], ['照明配置', '白光透射；405/488纳米荧光激发（设计配置）'], ['运动系统', 'XY扫描载物台 + Z轴自动对焦 + 电动卡托'], ['计算平台', 'Intel N100/i3-N305方案；16GB内存、256GB NVMe；Windows 11'], ['控制与供电', 'STM32下位机；24V电源'], ['耗材识别', '规划采用RFID/二维码'], ['产品状态', '研发方案；仅用于动物诊疗方向，不用于人体检测']],
    settingsLabel: '适用场景', settingsTitle: '围绕宠物诊疗工作流。',
    settings: [['宠物医院', '支持门诊血液检查与兽医结果复核的产品研发方向。'], ['连锁诊疗机构', '围绕标准化操作、人员培训和结果管理设计。'], ['兽医研发与验证', '支持卡盒、成像、分类算法及多物种性能的研发验证。']],
    ctaLabel: '产品咨询', ctaTitle: '一起完善，<br/>下一代宠物检验。', ctaText: '了解研发进展、样机合作与产品配置方案。',
    imageAlt: '宠物AI五分类血液分析仪完整机身外观效果图', structureAlt: '宠物AI五分类血液分析仪完整机身背部效果图', link: '查看产品资料 ↗',
  },
  en: {
    name: 'Pet AI 5-Part Hematology Analyzer', category: 'FOR PETS',
    categoryTitle: 'Intelligent devices for veterinary care',
    categoryText: 'Microfluidics and AI microscopy for veterinary blood testing and cell morphology review.',
    kicker: 'VETERINARY 5-PART CBC · IN DEVELOPMENT',
    lead: 'A single-use microfluidic cartridge and AI microscopy bring blood cell analysis and morphology review into one desktop instrument.',
    tags: ['5-part differential', 'AI microscopy', 'Single-use cartridge'],
    back: '← All devices', request: 'Discuss the product', overview: 'PRODUCT OVERVIEW',
    overviewTitle: 'See the cells.<br/>Understand the details.',
    overviewText: 'A desktop hematology development concept for veterinary hospitals and clinic groups. A disposable microfluidic cartridge holds the sample while brightfield and fluorescence imaging support AI analysis. Planned outputs include CBC parameters and cell images for veterinarian review. Development focuses on dogs and cats; other species require separate validation.',
    functions: 'CORE FUNCTIONS', featureTitle: 'Connect the numbers<br/>with the cells.',
    features: [
      ['Five-part differential', 'Planned differentiation of neutrophils, lymphocytes, monocytes, eosinophils and basophils, alongside red blood cell and platelet analysis.'],
      ['Single-use microfluidics', 'The sample and reagents remain within a disposable cartridge rather than a conventional wet analyzer fluid circuit. Used cartridges require appropriate biological waste handling.'],
      ['AI-assisted morphology', 'Cell images are retained for review. Platelet clumping and abnormal-cell flags are planned capabilities requiring performance validation.'],
      ['Integrated touchscreen', 'A 10.1-inch display combines sample operation, results and image review. The analysis time design target is 3–5 minutes, subject to validation.'],
    ],
    structureLabel: 'DEVICE STRUCTURE', structureTitle: 'A compact system.<br/>A complete imaging chain.',
    structureText: 'Solid exterior views show the complete opaque enclosure and rear interfaces from the engineering concept model. The module diagram below explains the functional architecture without a transparent housing view.',
    structureItems: [['Display and computing', '10.1-inch touchscreen and Windows 11 industrial computing for interaction, image processing and AI inference.'], ['Cartridge chamber', 'Front access door, motorized tray and cartridge identification.'], ['Optics and motion', '5 MP camera, 20×/40× objectives, XY scanning and Z-axis autofocus.'], ['Control and cooling', 'STM32 controller, 24 V power, USB connectivity and a HEPA-filtered cooling path.']],
    workflowLabel: 'WORKFLOW', workflowTitle: 'One cartridge.<br/>Four connected steps.',
    workflow: [['Prepare', 'Prepare the specimen using validated sampling and cartridge instructions.'], ['Load', 'Insert the single-use cartridge and confirm specimen details.'], ['Analyze', 'Autofocus and scanning capture cell images for counting and classification.'], ['Review', 'A veterinarian reviews parameters, original images and flags together.']],
    specsLabel: 'SPECIFICATIONS', specsTitle: 'Engineering configuration<br/>and design targets.',
    note: 'This page describes a development configuration and design targets, not validated performance claims. Sample volume, precision, accuracy, reference intervals, species support and availability remain to be established.',
    specs: [['Dimensions', '310 × 310 × 315 mm'], ['Format', 'Integrated desktop instrument'], ['Method', 'Single-use microfluidic cartridge + AI microscopy'], ['Analysis', 'Five-part WBC differential; 26 CBC parameters planned, final panel subject to validation'], ['Analysis time', 'Design target: 3–5 minutes per test'], ['Species', 'Dogs and cats prioritized; other species subject to validation'], ['Display', '10.1-inch IPS capacitive touchscreen, 1280 × 800'], ['Imaging', '5 MP global-shutter USB 3.0 camera; 20×/40× objectives'], ['Illumination', 'Transmitted white light; 405/488 nm fluorescence excitation (design configuration)'], ['Motion', 'XY scanning stage, Z-axis autofocus and motorized cartridge tray'], ['Computing', 'Intel N100/i3-N305 options; 16 GB RAM, 256 GB NVMe; Windows 11'], ['Control and power', 'STM32 controller; 24 V power supply'], ['Cartridge identification', 'RFID / QR code planned'], ['Status', 'In development for veterinary use; not for human testing']],
    settingsLabel: 'INTENDED SETTINGS', settingsTitle: 'Designed around veterinary care.',
    settings: [['Veterinary hospitals', 'Development focused on routine hematology and veterinarian review.'], ['Clinic groups', 'Designed around consistent operation, staff training and result management.'], ['Research and validation', 'Cartridge, imaging, algorithm and species-specific performance development.']],
    ctaLabel: 'PRODUCT ENQUIRIES', ctaTitle: 'Shape the next step<br/>in veterinary testing.', ctaText: 'Discuss development progress, prototype collaboration and configuration.',
    imageAlt: 'Pet AI 5-part hematology analyzer solid exterior rendering', structureAlt: 'Pet AI 5-part hematology analyzer solid rear exterior rendering', link: 'View product information ↗',
  },
};

for (const variant of ['zh', 'en', '']) {
  const lang = variant === 'zh' ? 'zh' : 'en';
  const c = content[lang];
  const prefix = variant ? `/${variant}` : '';
  const directory = path.join(root, 'static-site', variant, 'product');
  let html = await fs.readFile(path.join(directory, 'miniscope-1/index.html'), 'utf8');
  const replace = (name, body) => { html = html.replace(new RegExp(`<section class="${name}"[\\s\\S]*?</section>`), `<section class="${name}">${body}</section>`); };
  const img = (src, alt) => `<img loading="lazy" decoding="async" src="${src}" alt="${escape(alt)}"/>`;
  replace('detail-hero', `<div class="detail-hero-copy"><a class="detail-back" href="${prefix}/product/#pets">${c.back}</a><p class="detail-kicker">${c.kicker}</p><h1>${c.name}</h1><p class="detail-lead">${c.lead}</p><div class="detail-tags">${c.tags.map(t=>`<span>${t}</span>`).join('')}</div><a class="detail-primary" href="#specifications">${lang==='zh'?'查看技术规格':'Explore specifications'} ↘</a></div><div class="detail-hero-image">${img(image,c.imageAlt).replace('loading="lazy"','fetchpriority="high"')}</div>`);
  replace('detail-intro', `<p class="detail-section-label">${c.overview}</p><div><h2>${c.overviewTitle}</h2><p>${c.overviewText}</p></div>`);
  replace('detail-features', `<div class="detail-feature-image">${img(image,c.imageAlt)}</div><div class="detail-feature-copy"><p class="detail-section-label">${c.functions}</p><h2>${c.featureTitle}</h2><div class="feature-list">${c.features.map(([t,b],i)=>`<article><span>0${i+1}</span><div><h3>${t}</h3><p>${b}</p></div></article>`).join('')}</div></div>`);
  replace('detail-structure', `<div class="detail-structure-copy"><p class="detail-section-label">${c.structureLabel}</p><h2>${c.structureTitle}</h2><p>${c.structureText}</p><ol>${c.structureItems.map(([t,b])=>`<li><b>${t}</b><span>${b}</span></li>`).join('')}</ol></div><div class="detail-structure-image" style="height:auto;aspect-ratio:auto;overflow:visible">${img(structure,c.structureAlt)}<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:20px" aria-label="${lang==='zh'?'功能模块示意图':'Functional module diagram'}">${c.structureItems.map(([t],i)=>`<div style="padding:16px;background:white;border:1px solid #cad8e8;color:#0c2b55;font-size:16px;line-height:1.5"><small style="display:block;color:#1674c9">0${i+1}</small>${t}</div>`).join('')}</div></div>`);
  replace('detail-workflow', `<p class="detail-section-label">${c.workflowLabel}</p><h2>${c.workflowTitle}</h2><div class="workflow-steps">${c.workflow.map(([t,b],i)=>`<article><span>0${i+1}</span><h3>${t}</h3><p>${b}</p></article>`).join('')}</div>`);
  replace('detail-specs', `<div><p class="detail-section-label">${c.specsLabel}</p><h2>${c.specsTitle}</h2><p>${c.note}</p></div><dl>${c.specs.map(([t,b])=>`<div><dt>${t}</dt><dd>${b}</dd></div>`).join('')}</dl>`);
  html = html.replace('<section class="detail-specs">','<section class="detail-specs" id="specifications">');
  replace('detail-use-cases', `<div><p class="detail-section-label">${c.settingsLabel}</p><h2>${c.settingsTitle}</h2></div><div class="use-case-grid">${c.settings.map(([t,b])=>`<article><h3>${t}</h3><p>${b}</p></article>`).join('')}</div>`);
  replace('detail-cta', `<div><p class="detail-section-label">${c.ctaLabel}</p><h2>${c.ctaTitle}</h2></div><div><p>${c.ctaText}</p><a href="mailto:sales@holylens.com?subject=Pet%205-Part%20Hematology%20Analyzer">sales@holylens.com ↗</a></div>`);
  html = html.replaceAll('/product/miniscope-1/', `/product/${slug}/`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${c.name} | HOLYLENS</title>`)
    .replace(/<meta name="description" content="[^"]*"\/>/, `<meta name="description" content="${escape(c.lead)}"/>`)
    .replace(/<link rel="preload"[^>]*as="image"\/>/g, '')
    .replace('</head>', `<style>.product-detail-page .detail-hero h1{font-size:clamp(30px,3.2vw,52px);line-height:1.2;overflow-wrap:anywhere}.product-detail-page .detail-hero-image img,.product-detail-page .detail-feature-image img,.product-detail-page .detail-structure-image img{width:100%;height:auto;max-height:640px;object-fit:contain;transform:none;position:static}.product-detail-page .detail-feature-image{overflow:hidden;align-self:center}.product-detail-page .detail-feature-image img{max-width:100%;margin:0}.product-detail-page .detail-specs dd{overflow-wrap:anywhere}@media(max-width:767px){.product-detail-page h2{font-size:clamp(25px,6vw,36px);line-height:1.3}.product-detail-page .detail-hero-image img,.product-detail-page .detail-feature-image img,.product-detail-page .detail-structure-image img{max-height:420px}}</style></head>`);
  await fs.mkdir(path.join(directory, slug), {recursive:true});
  await fs.writeFile(path.join(directory, slug, 'index.html'), html);

  let listing = await fs.readFile(path.join(directory, 'index.html'), 'utf8');
  listing = listing.replaceAll('/images/holylens/pet-5diff-exterior.jpg', image);
  const section = `<div class="catalog-heading home" id="pets"><p>${c.category}</p><h1>${c.categoryTitle}</h1><span>${c.categoryText}</span></div><article class="catalog-row"><div class="catalog-number">01<i></i></div><div class="catalog-image">${img(image,c.imageAlt)}</div><div class="catalog-info"><p>${c.kicker}</p><h2>${c.name}</h2><p class="description">${c.lead}</p><ul>${c.tags.map(t=>`<li>${t}</li>`).join('')}</ul><a href="${prefix}/product/${slug}/">${c.link}</a></div></article>`;
  if (!listing.includes('id="pets"')) listing = listing.replace('</section><section class="product-platform">',`${section}</section><section class="product-platform">`);
  if (!listing.includes('id="pets"')) throw new Error(`Catalog insertion failed: ${variant}`);
  listing = listing.replace('</head>', '<style>#pets{scroll-margin-top:120px}#pets+article .catalog-image img{object-fit:contain;width:100%;height:100%}#pets+article .catalog-info h2{font-size:clamp(24px,2.4vw,34px);line-height:1.25}</style></head>');
  await fs.writeFile(path.join(directory, 'index.html'), listing);
}
console.log('Added veterinary category and three localized pet analyzer pages.');
