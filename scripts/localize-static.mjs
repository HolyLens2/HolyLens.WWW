import fs from "node:fs/promises";
import path from "node:path";
import { productDetailCatalog } from "./product-detail-catalog.mjs";

const root = process.cwd();
const site = path.join(root, "static-site");

function cleanHtml(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b[^>]*(?:modulepreload|data-rsc-css-href)[^>]*\/?\s*>/gi, "")
    .replace(/<style\b[^>]*data-vinext-fonts[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<!--\s*-->/g, "")
    .replaceAll('/favicon.svg', '/favicon.png')
    .replace("</head>", '<link rel="stylesheet" href="/styles.css"/></head>');
}

const [sourceHome, sourceProduct, sourceMiniScope] = await Promise.all([
  fetch("http://localhost:3000/").then((response) => response.text()).then(cleanHtml),
  fetch("http://localhost:3000/product").then((response) => response.text()).then(cleanHtml),
  fetch("http://localhost:3000/product/miniscope-1").then((response) => response.text()).then(cleanHtml),
]);

function replaceAll(input, replacements) {
  let output = input;
  for (const [from, to] of replacements) output = output.split(from).join(to);
  return output;
}

function injectLanguageSwitch(html, lang, page) {
  const other = lang === "zh" ? "EN" : "CN";
  const otherLang = lang === "zh" ? "en" : "zh";
  const suffix = page === "product" ? "product/" : page === "miniscope" ? "product/miniscope-1/" : "";
  return html.replace("</header>", `<a class="language-switch" href="/${otherLang}/${suffix}">${other}</a></header>`);
}

const zhCommon = [
  ['lang="zh-CN"', 'lang="zh-CN"'],
  [">Home<", ">首页<"], [">About Us<", ">关于我们<"], [">Product<", ">产品<"], [">Solution<", ">解决方案<"], [">Contact<", ">联系我们<"],
  ["Your Wellness, Our Unwavering Commitment", "您的健康，是我们坚定不移的承诺"],
  ["We detect<br/>disease before<br/>it strikes.", "在疾病发生之前，<br/>我们先一步发现。"],
  ["HolyLens is a global innovator in AI medical devices, combining AI with advanced imaging and acoustic technologies.", "HolyLens 是全球领先的 AI 医疗设备创新企业，将人工智能与先进医学影像及声学技术深度融合。"],
  ["More Services", "了解更多"], ["About Us", "关于我们"], ["We treat with<br/>the mind.", "以智慧，<br/>守护健康。"],
  ["HolyLens is a world-leading innovative AI medical device company, dedicated to deeply integrating artificial intelligence with cutting-edge medical imaging equipment.", "HolyLens 是全球领先的创新型 AI 医疗设备企业，致力于将人工智能与前沿医学影像设备深度融合。"],
  ["Our work brings intelligent screening closer to patients and gives healthcare professionals dependable tools for earlier intervention.", "我们让智能筛查更贴近患者，并为医疗专业人员提供可靠的早期干预工具。"],
  ["The power of applied intelligence", "应用智能的力量"], ["We take a closer look", "洞察更细微的信号"], ["Built for practical clinical care", "为真实临床场景而生"], ["Let’s Talk", "联系我们"],
  ["Our Services", "我们的服务"], ["Healthcare is a<br/>basic human right.", "医疗健康是<br/>每个人的基本权利。"], ["AI-powered devices and clinical workflows that help healthcare teams see more, sooner.", "以 AI 设备与临床工作流，帮助医疗团队更早看见更多信息。"],
  ["AI Medical Imaging", "AI 医学影像"], ["Deep-learning assisted imaging analysis for earlier, clearer clinical insight.", "通过深度学习辅助影像分析，提供更早、更清晰的临床洞察。"],
  ["Acoustic Intelligence", "声学智能"], ["Advanced acoustic sensing combined with AI for fast, non-invasive screening.", "先进声学感知与 AI 融合，实现快速、无创筛查。"],
  ["Clinical Solutions", "临床解决方案"], ["Integrated devices and workflows designed for real-world healthcare environments.", "面向真实医疗环境设计的一体化设备与工作流。"], ["Read More", "了解更多"],
  ["Number Talks", "数据一览"], ["Adding intelligence<br/>to healthcare.", "让智能融入<br/>医疗健康。"], ["Patients", "患者"], ["Specialist Doctors", "专科医生"], ["Patient Satisfaction", "患者满意度"], ["Visitors", "访问者"],
  ["Our Guidelines", "我们的准则"], ["Better care,<br/>built around people.", "以人为本，<br/>构建更优质的医疗。"], ["Better Care", "更优质的医疗"], ["Earlier Insight", "更早的洞察"], ["Smile Again", "重拾笑容"],
  ["Technology should make every clinical interaction clearer, faster and more human.", "科技应让每一次临床互动更清晰、更快速、更有人情味。"], ["Detect subtle risk signals while there is still time to make a meaningful difference.", "在仍有机会产生积极改变时，发现细微的风险信号。"], ["Help patients move forward with more confidence and better-informed care.", "通过更充分的信息与医疗支持，帮助患者更有信心地前行。"],
  ["Dedicated Team", "专业团队"], ["Our best doctors.", "我们的专业医生。"], ["A multidisciplinary team working at the intersection of medicine, devices and AI.", "一支横跨医学、医疗设备与人工智能的多学科团队。"],
  ["Dr. Lin Wei", "林伟医生"], ["Cardiologist", "心脏专科医生"], ["Dr. Seo-yun Kim", "金瑞允医生"], ["Radiologist", "放射影像科医生"], ["Dr. Emily Carter", "艾米丽·卡特医生"], ["Clinical AI Specialist", "临床 AI 专家"], ["Dr. Marcus Johnson", "马库斯·约翰逊医生"], ["Medical Device Specialist", "医疗设备专家"],
  ["Heart Specialist", "心脏专科医生"], ["Marketing Coordinator", "市场协调员"], ["Medical Assistant", "医疗助理"], ["Nursing Assistant", "护理助理"],
  ["Latest News", "最新资讯"], ["A nation grows with<br/>the help of healthcare.", "医疗健康，<br/>助力社会持续发展。"], ["EMERGENCY · BY ADMIN", "医疗资讯 · 编辑部"], ["Explore new perspectives on prevention, clinical innovation and the future of intelligent care.", "探索疾病预防、临床创新与智能医疗未来的新视角。"],
  ["Practical stories about intelligent diagnosis, connected clinical teams and earlier access to care.", "关注智能诊断、临床协作与基层医疗可及性的真实实践。"],
  ["Clinical Intelligence", "临床智能"], ["AI-assisted review makes complex cases clearer", "AI 辅助会诊，让复杂病例更清晰"], ["Multimodal analysis brings imaging, pathology and clinical context into one dependable view.", "多模态分析融合影像、病理与临床信息，为复杂病例提供可靠、完整的判断依据。"],
  ["Connected Care", "协作诊疗"], ["Multidisciplinary care, connected by intelligence", "以智能连接多学科诊疗"], ["Shared insight helps clinical teams make faster, better-informed decisions around every patient.", "共享洞察帮助医疗团队围绕每位患者，更快做出信息充分的诊疗决策。"],
  ["Community Health", "基层健康"], ["Earlier screening, closer to every community", "让更早筛查走近每个社区"], ["Portable intelligent devices bring dependable screening and follow-up closer to families.", "便携智能设备把可靠筛查与持续随访带到社区和家庭身边。"],
  ["Get in Touch", "联系我们"], ["Let’s talk about a<br/>healthier tomorrow.", "共同探讨一个<br/>更健康的明天。"], ["Shanghai", "上海"], ["Email", "邮箱"], ["Phone", "电话"], ["Back to top", "返回顶部"],
  ["AI medical devices for earlier insight and better care.", "以 AI 医疗设备带来更早洞察与更优质医疗。"],
  ["See earlier.<br/>Care better.", "更早看见，<br/>更好守护。"], ["Start a conversation", "与我们联系"], [">Explore<", ">网站导航<"], [">Technology<", ">核心技术<"],
  ["Medical AI Platform", "AI 医疗大模型平台"], ["Medical AI Chip", "AI 医疗专用芯片"], ["Customer Stories", "客户案例"], ["Intelligence for human health.", "以智能守护人类健康。"], ["All rights reserved.", "保留所有权利。"],
  ["ADVANCED IMAGING × ACOUSTIC TECHNOLOGY", "先进医学影像 × 声学技术"], ["PRODUCT PORTFOLIO", "产品组合"], ["LATEST / 最新动态", "最新动态"], ["APPLICATIONS", "应用场景"], ["AWARDS", "获奖资讯"], ["WEBINAR", "线上研讨会"], ["CASE STUDY", "客户案例"],
  ["We treat even the most complicated cases", "我们致力于应对最复杂的医疗案例"], ["Our medical team is dedicated to providing better care", "我们的医疗团队致力于提供更优质的医疗服务"], ["Caring is a cause of the growing community", "关怀推动健康社区持续成长"],
  ["Dr. Devilman Crybaby", "德维尔曼医生"], ["Jane Cooper", "简·库珀"], ["Floyd Miles", "弗洛伊德·迈尔斯"], ["Marvin McKinney", "马文·麦金尼"],
  ["4F, No. 59 North Yunnan Road,", "云南北路59号 4层，"], ["Shanghai 200001", "上海 200001"], ["AI MEDICAL DEVICE", "AI 医疗设备"], ["AI IMAGING", "AI 影像系统"], ["ACOUSTIC", "声学系统"], ["ONLINE", "在线"], ["READY", "就绪"], ["Meet HolyLens-N3", "认识 HolyLens-N3"]
];

const enCommon = [
  ['lang="zh-CN"', 'lang="en"'], ["产品组合 / PRODUCT PORTFOLIO", "PRODUCT PORTFOLIO"], ["从芯片到平台，<br/>全栈优化医疗 AI。", "Full-stack medical AI,<br/>from chips to platforms."], ["覆盖诊断全流程的智能平台与为医疗场景深度优化的处理器。", "An intelligent platform spanning the diagnostic workflow and processors optimized for medical AI."],
  ["高性能推理 · 低功耗运行 · 边缘部署", "HIGH-PERFORMANCE INFERENCE · LOW POWER · EDGE DEPLOYMENT"], ["AI 医疗大模型平台", "Medical AI Foundation Model Platform"], ["集成影像诊断、病理分析、临床决策支持和药物研发四大核心模块，基于专用硬件优化，实现超低延迟实时推理。", "Integrates imaging diagnosis, pathology analysis, clinical decision support and drug discovery, optimized on dedicated hardware for ultra-low-latency inference."],
  ["影像诊断", "Imaging Diagnosis"], ["病理分析", "Pathology Analysis"], ["临床决策", "Clinical Decisions"], ["药物研发", "Drug Discovery"], ["AI ISP · 低功耗 · 小体积", "AI ISP · LOW POWER · COMPACT"], ["AI 医疗专用芯片", "Dedicated Medical AI Chip"], ["自研神经网络加速器架构，针对医疗 AI 模型特性深度优化，支持从云端到边缘的全场景部署。", "A proprietary neural-network accelerator deeply optimized for medical AI models across cloud and edge deployments."], ["神经网络加速器", "Neural Network Accelerator"], ["边缘推理芯片", "Edge Inference Chip"],
  ["LATEST / 最新动态", "LATEST"], ["HolyLens 荣获 2026 全球医疗 AI 创新大奖，引领芯智一体化技术新方向", "HolyLens wins the 2026 Global Medical AI Innovation Award"], ["了解更多", "Learn More"], ["面向医疗 AI 的高效神经网络加速器架构解析", "Inside an efficient neural-network accelerator architecture for medical AI"], ["2026 年 6 月 15 日 · 线上直播", "June 15, 2026 · Online Webinar"], ["AI 驱动的基层医疗机构智能影像诊断系统成功覆盖 500+ 县域医院", "AI imaging diagnosis deployed across 500+ county hospitals"], ["阅读案例", "Read Case Study"],
  ["客户与伙伴的声音", "CUSTOMER & PARTNER VOICES"], ["AI 影像诊断系统<br/>覆盖 500+ 县域医院。", "AI imaging diagnosis<br/>reaches 500+ county hospitals."], ["HolyLens 的 AI 影像诊断平台帮助我们实现了基层医疗机构诊断能力的质的提升，将优质诊断能力带到了县域医院。", "HolyLens has transformed diagnostic capacity in primary care and brought high-quality diagnosis to county hospitals."], ["智慧医疗联盟 · 技术总监", "Smart Healthcare Alliance · Technical Director"],
  ["HOLYLENS AI 技术演进", "HOLYLENS AI EVOLUTION"], ["从感知智能，<br/>迈向自主智能。", "From perception<br/>to autonomous intelligence."], ["感知智能", "Perceptive Intelligence"], ["增强智能", "Augmented Intelligence"], ["生成智能", "Generative Intelligence"], ["自主智能", "Autonomous Intelligence"], ["基于深度学习的环境感知与理解，实时识别医学影像中的异常区域，为诊断提供第一层智能筛选。", "Deep-learning perception identifies abnormal regions in medical images in real time, providing the first intelligent screening layer."], ["场景理解", "Context Understanding"], ["多模态感知", "Multimodal Perception"], ["事件触发", "Event Triggering"], ["远程诊断", "Remote Diagnosis"],
  ["核心技术", "CORE TECHNOLOGY"], ["AI 医疗<br/>专用芯片。", "Dedicated<br/>medical AI silicon."], ["从晶体管到算法层的垂直优化，消除软硬件间的性能损耗。", "Vertical optimization from transistors to algorithms eliminates software-hardware performance loss."], ["推理效率 / 相比通用 GPU", "Inference efficiency / vs. general GPU"], ["能效比 / TOPS/W", "Energy efficiency / TOPS/W"], ["端到端响应延迟", "End-to-end latency"], ["架构", "Architecture"], ["制程", "Process"], ["先进工艺", "advanced process"], ["算力", "Compute"], ["功耗", "Power"], ["超低功耗", "ultra-low power"], ["接口", "Interface"], ["支持", "Support"],
  ["应用场景 / APPLICATIONS", "APPLICATIONS"], ["覆盖诊断、治疗、<br/>科研与管理。", "Across diagnosis, treatment,<br/>research and operations."], ["让一套智能底座服务完整医疗体系。", "One intelligent foundation for the entire healthcare system."],
  ["医学影像 AI 诊断", "Medical Imaging AI Diagnosis"], ["支持 CT、MRI、X 光、超声等多模态影像的自动化分析", "Automated multimodal analysis across CT, MRI, X-ray and ultrasound"], ["肺结节检测 · 骨折识别 · 肿瘤分割 · 病灶追踪", "Lung nodule detection · Fracture recognition · Tumor segmentation · Lesion tracking"], ["病理智能分析", "Intelligent Pathology Analysis"], ["数字化病理切片的全景扫描与 AI 辅助诊断", "Whole-slide scanning and AI-assisted diagnosis for digital pathology"], ["癌变检测 · 分级评估 · 免疫组化 · 预后预测", "Cancer detection · Grading · Immunohistochemistry · Prognosis"], ["临床决策支持", "Clinical Decision Support"], ["融合千万级病例，提供实时个性化诊疗建议", "Real-time personalized recommendations informed by millions of cases"], ["智能问诊 · 用药推荐 · 风险评估 · 治疗方案", "Smart consultation · Medication · Risk assessment · Treatment plans"], ["药物研发加速", "Accelerated Drug Discovery"], ["利用大模型预测分子活性，缩短筛选周期", "Foundation models predict molecular activity and shorten screening cycles"], ["靶点发现 · 分子设计 · 临床试验 · 副作用预测", "Target discovery · Molecular design · Clinical trials · Side-effect prediction"], ["智慧医院管理", "Smart Hospital Operations"], ["全院级 AI 赋能，提升运营效率与服务质量", "Hospital-wide AI improves operational efficiency and service quality"], ["智能导诊 · 排班优化 · 质控管理 · 耗材管理", "Smart triage · Scheduling · Quality control · Supply management"], ["科研算力平台", "Research Compute Platform"], ["为医学科研提供高性能 AI 训练与推理算力", "High-performance AI training and inference for medical research"], ["基因组学 · 蛋白质分析 · 临床数据 · 多中心研究", "Genomics · Protein analysis · Clinical data · Multi-center studies"],
  ["演示与案例", "DEMOS & CASES"], ["看见真实医疗场景中的 AI。", "See AI at work in real healthcare."], ["实时 AI 影像诊断 — 肺部 CT 自动分析", "Real-time AI Imaging — Automated Lung CT Analysis"], ["基于 HolyLens-N3 芯片的实时推理演示", "Real-time inference powered by HolyLens-N3"], ["数字化病理 AI 辅助 — 癌细胞精准识别", "Digital Pathology AI — Precise Cancer Cell Detection"], ["边缘设备上的高效病理分析", "Efficient pathology analysis on edge devices"], ["手术 AI 导航 — 实时器官追踪与预警", "Surgical AI Navigation — Real-time Organ Tracking"], ["超低延迟的边缘 AI 推理", "Ultra-low-latency edge AI inference"], [">演示<", ">DEMO<"],
  ["HolyLens｜看见疾病，在它发生之前", "HolyLens | Detect disease before it strikes"], ["HolyLens 将人工智能与先进医学影像、声学技术深度融合，为医疗机构提供更早、更可靠的临床洞察。", "HolyLens combines AI with advanced medical imaging and acoustic technologies to deliver earlier, more reliable clinical insight."],
  ["HolyLens 便携式手持超声检查设备", "HolyLens portable handheld ultrasound scanner"],
  ["Meet HolyLens-N3：面向医疗 AI 的高效Neural Network AcceleratorArchitecture解析", "Meet HolyLens-N3: An Efficient Neural Network Accelerator for Medical AI"], ["AI 驱动的基层医疗机构智能Imaging Diagnosis系统成功覆盖 500+ 县域医院", "AI-powered imaging diagnosis deployed across 500+ county hospitals"], ["AI Imaging Diagnosis系统<br/>覆盖 500+ 县域医院。", "AI imaging diagnosis<br/>reaches 500+ county hospitals."], ["AI Imaging Diagnosis系统 覆盖 500+ 县域医院。", "AI imaging diagnosis reaches 500+ county hospitals."], ["HolyLens 的 AI Imaging Diagnosis平台帮助我们实现了基层医疗机构诊断能力的质的提升，将优质诊断能力带到了县域医院。", "HolyLens has transformed diagnostic capacity in primary care and brought high-quality diagnosis to county hospitals."], ["张明远", "Mingyuan Zhang"],
  ["&lt; 15W 超低Power", "&lt; 15W ultra-low power"], ["Support CT、MRI、X 光、超声等多模态影像的自动化分析", "Automated multimodal analysis across CT, MRI, X-ray and ultrasound"], ["Drug Discovery加速", "Accelerated Drug Discovery"], ["科研Compute平台", "Research Compute Platform"], ["为医学科研提供高性能 AI 训练与推理Compute", "High-performance AI training and inference for medical research"],
  ["实时 AI Imaging Diagnosis — 肺部 CT 自动分析", "Real-time AI Imaging — Automated Lung CT Analysis"], ["边缘设备上的高效Pathology Analysis", "Efficient pathology analysis on edge devices"], ["实时肺部 CT 自动分析", "Real-time automated lung CT analysis"], ["癌细胞精准识别", "Precise cancer cell detection"], ["手术 AI 导航", "Surgical AI navigation"], ["多模态医疗感知智能", "Multimodal medical perception"], ["多模态医疗Perceptive Intelligence", "Multimodal medical perception"], ["AI 影像诊断系统临床应用", "Clinical AI imaging diagnosis"], ["AI Imaging Diagnosis系统临床应用", "Clinical AI imaging diagnosis"], ["HolyLens-N3 神经网络加速器", "HolyLens-N3 neural network accelerator"], ["7nm 先进工艺", "7nm advanced process"]
];

const zhProduct = [
  ["MiniScope 1.0", "微影 1.0"], ["MiniScope PRO", "微影专业版"], ["StarScope 1.0", "星析 1.0"], ["TurgoScope 1.0", "声境 1.0"], ["MiniVision 1.0", "微视 1.0"],
  ["HearScope 1.0", "聆镜 1.0"], ["PressScope 1.0", "压康 1.0"], ["GlucoScope 1.0", "糖衡 1.0"], ["CardioScope 1.0", "心律 1.0"], ["OxyScope 1.0", "氧安 1.0"],
  ["CLINICAL &amp; INSTITUTIONAL", "医院与医疗机构"], ["Products for hospitals and healthcare organizations", "面向医院和医疗机构的产品"], ["Professional devices and AI workspaces designed for clinical teams, high-quality acquisition and dependable medical workflows.", "为临床团队打造的专业设备与 AI 工作空间，支持高质量采集和可靠的医疗工作流程。"],
  ["PERSONAL &amp; FAMILY HEALTH", "个人与家庭健康"], ["Products for individuals and families", "面向个人和家庭的产品"], ["Approachable connected devices that bring everyday health monitoring and clearer personal insights into the home.", "易用的智能互联设备，将日常健康监测和更清晰的个人健康洞察带入家庭。"],
  ["HOLYLENS PRODUCT PORTFOLIO", "HOLYLENS 产品矩阵"], ["Intelligence,<br/>made tangible.", "让智能，<br/>触手可及。"], ["From portable screening devices to professional imaging and clinical software, HolyLens connects advanced hardware with AI built for healthcare.", "从便携式筛查设备到专业影像与临床软件，HolyLens 将先进硬件与医疗 AI 深度连接。"], ["Our Products", "我们的产品"], ["One connected family.<br/>Five ways to see earlier.", "一体化产品家族，<br/>五种更早洞察的方式。"], ["Each HolyLens product transforms complex medical signals into clear, useful clinical information.", "每一款 HolyLens 产品都将复杂的医疗信号转化为清晰、实用的临床信息。"],
  ["Portable AI Screening", "便携式 AI 筛查"], ["Digital Pathology Imaging", "数字病理影像"], ["Advanced Ultrasound Imaging", "先进超声影像"], ["Acoustic Tissue Intelligence", "声学组织智能"], ["Ophthalmic AI Platform", "眼科 AI 平台"], ["Compact intelligent imaging for fast, consistent screening at the point of care.", "紧凑型智能影像设备，为诊疗现场提供快速、一致的筛查能力。"], ["High-resolution tissue imaging and AI-assisted slide review for modern pathology workflows.", "面向现代病理工作流程，提供高分辨率组织成像与 AI 辅助切片查看。"], ["Professional ultrasound acquisition with intelligent guidance and a streamlined clinical console.", "通过智能引导与简洁临床主机，实现专业超声影像采集。"], ["Multichannel acoustic sensing and intelligent tissue assessment for non-invasive insight.", "多通道声学感知与智能组织评估，提供无创临床洞察。"], ["A connected workspace for retinal imaging, AI findings and longitudinal ophthalmic review.", "连接视网膜影像、AI 发现与眼科纵向查看的一体化工作空间。"],
  ["AI Home Auscultation", "AI 家庭听诊"], ["Smart Blood Pressure", "智能血压监测"], ["Smart Glucose Monitoring", "智能血糖监测"], ["Personal ECG Monitoring", "个人心电监测"], ["Blood Oxygen Monitoring", "血氧监测"],
  ["AI-guided heart and lung sound capture for convenient everyday family screening.", "通过 AI 引导采集心肺声音，为家庭日常筛查提供便捷支持。"], ["Comfortable home blood-pressure and pulse monitoring with clear trend tracking.", "舒适完成家庭血压与脉搏监测，并清晰记录长期变化趋势。"], ["Fast everyday glucose checks with simple records that support long-term health management.", "快速完成日常血糖检测，以简明记录支持长期健康管理。"], ["Multi-lead ECG capture at home for reliable rhythm records and easier remote review.", "在家完成多导联心电采集，可靠记录心律并便于远程查看。"], ["Compact fingertip oxygen-saturation and pulse monitoring for daily wellness checks.", "小巧的指夹式血氧与脉率监测设备，满足日常健康检查需要。"],
  ["AI-assisted", "AI 辅助"], ["Clinical workflow", "临床工作流"], ["Home monitoring", "家庭监测"], ["Family health", "家庭健康"], ["Secure data", "安全数据"], ["View product information", "查看产品资料"], ["Request product information", "索取产品资料"], ["ONE HOLYLENS PLATFORM", "统一 HOLYLENS 平台"], ["Devices that work<br/>better together.", "设备互联，<br/>协同更高效。"], ["CAPTURE", "采集"], ["ANALYZE", "分析"], ["REPORT", "报告"], ["CARE", "诊疗"], ["Standardized acquisition, intelligent analysis and structured reporting create a consistent path from examination to clinical action.", "标准化采集、智能分析与结构化报告，构建从检查到临床行动的一致路径。"], ["Product Enquiries", "产品咨询"], ["Find the right device<br/>for your workflow.", "为您的工作流程，<br/>选择合适的设备。"]
];

const zhMiniScope = [
  ["← All products", "← 返回全部产品"], ["PORTABLE AI ULTRASOUND", "便携式 AI 超声"],
  ["Portable intelligent ultrasound for fast, consistent imaging at the point of care.", "便携式智能超声，为诊疗现场提供快速、一致的医学影像。"],
  ["Request product information", "索取产品资料"],
  ["PRODUCT OVERVIEW", "产品概览"], ["Clear imaging,<br/>where care happens.", "清晰影像，<br/>随诊疗所需而至。"],
  ["MiniScope 1.0 brings ultrasound acquisition, AI guidance and clinical review into one lightweight device. Its simplified controls support efficient examinations while preserving the image quality and dependable data handling clinical teams expect.", "微影 1.0 将超声采集、AI 引导与临床查看整合于一台轻量化设备。简洁的操作方式提升检查效率，同时提供临床团队所需的影像质量与可靠数据管理。"],
  ["CORE FUNCTIONS", "核心功能"], ["Designed around the examination.", "围绕临床检查而设计。"],
  ["Portable imaging", "便携式影像"], ["A compact handheld system designed for bedside, outpatient and mobile clinical use.", "紧凑型手持系统，适用于床旁、门诊和移动医疗场景。"],
  ["AI-assisted guidance", "AI 辅助引导"], ["Real-time acquisition guidance helps clinicians obtain clear, consistent images with less repetition.", "实时采集引导帮助医务人员减少重复操作，获得清晰、一致的影像。"],
  ["Clear on-device review", "设备端清晰查看"], ["A high-contrast display presents live imaging, measurements and examination status at a glance.", "高对比度显示屏集中呈现实时影像、测量结果与检查状态。"],
  ["Connected workflow", "互联工作流程"], ["Encrypted examination data can move securely into the HolyLens workspace for review and reporting.", "加密检查数据可安全传输至 HolyLens 工作空间，用于查看与生成报告。"],
  ["DEVICE STRUCTURE", "设备结构"], ["Everything needed,<br/>held in one hand.", "所需功能，<br/>尽在一手掌握。"],
  ["A durable handheld console combines live imaging, direct controls and secure local processing. The detachable probe and standard USB-C interface simplify clinical use, cleaning and charging.", "耐用的手持主机集实时成像、快捷控制与安全本地处理于一体。可拆卸探头与标准 USB-C 接口，便于临床使用、清洁和充电。"],
  ["Medical display", "医用显示屏"], ["Live image, measurement and status review", "查看实时影像、测量结果与设备状态"], ["Direct control pad", "快捷控制按键"], ["Fast adjustment with gloved hands", "戴手套时也能快速调节"],
  ["AI processing module", "AI 处理模块"], ["On-device image optimization and guidance", "在设备端完成影像优化与操作引导"], ["Detachable probe", "可拆卸探头"], ["Multi-frequency convex array transducer", "多频凸阵换能器"],
  ["CLINICAL WORKFLOW", "临床工作流程"], ["From scan to report,<br/>without unnecessary steps.", "从扫描到报告，<br/>减少不必要步骤。"],
  ["Prepare", "准备"], ["Select the examination preset and connect the appropriate probe.", "选择检查预设并连接适用探头。"], ["Acquire", "采集"], ["Use live AI guidance to support positioning and image consistency.", "通过实时 AI 引导辅助定位并保持影像一致性。"], ["Review", "查看"], ["Confirm images and measurements directly on the device.", "直接在设备上确认影像与测量结果。"], ["Share", "共享"], ["Send encrypted data to the HolyLens workspace for reporting and follow-up.", "将加密数据发送至 HolyLens 工作空间，用于报告与随访。"],
  ["SPECIFICATIONS", "产品规格"], ["MiniScope 1.0<br/>technical profile.", "微影 1.0<br/>技术规格。"], ["Specifications shown are the proposed product configuration and may vary by region or final regulatory authorization.", "所示规格为建议产品配置，可能因地区或最终监管许可而有所不同。"],
  ["Imaging modes", "成像模式"], ["B-mode / M-mode / Color Doppler", "B 模式 / M 模式 / 彩色多普勒"], ["Display", "显示屏"], ["5.5-inch medical-grade touch display", "5.5 英寸医用级触控显示屏"], ["Probe", "探头"], ["Multi-frequency convex array probe", "多频凸阵探头"], ["Frequency range", "频率范围"],
  ["Battery", "电池"], ["Up to 4 hours of continuous operation", "最长 4 小时连续工作"], ["Connectivity", "连接方式"], ["Wi-Fi 6 / Bluetooth 5.2 / USB-C", "Wi-Fi 6 / 蓝牙 5.2 / USB-C"], ["Data format", "数据格式"], ["DICOM / JPEG / MP4 / structured report", "DICOM / JPEG / MP4 / 结构化报告"], ["Protection", "防护等级"], ["IP54 device enclosure", "设备外壳 IP54"], ["Weight", "重量"], ["Approximately 680 g, excluding probe", "约 680 克，不含探头"], ["Security", "数据安全"], ["Encrypted storage and role-based access", "加密存储与基于角色的访问控制"], ["Operating environment", "工作环境"], ["10–35 °C / 15–80% RH", "10–35 °C / 15–80% 相对湿度"], ["Intended users", "适用人员"], ["Trained healthcare professionals", "经过培训的医疗专业人员"],
  ["INTENDED SETTINGS", "适用场景"], ["Built for flexible clinical use.", "为灵活的临床应用而设计。"], ["Primary care", "基层医疗"], ["Accessible imaging support for routine assessment and earlier referral decisions.", "为常规评估和更早转诊决策提供便捷的影像支持。"], ["Bedside assessment", "床旁评估"], ["Portable scanning for wards, emergency care and patients with limited mobility.", "为病房、急诊及行动受限患者提供便携式扫描。"], ["Mobile services", "移动医疗"], ["Compact equipment for outreach clinics and care delivered closer to communities.", "紧凑型设备适用于巡回门诊，让医疗服务更贴近社区。"],
  ["PRODUCT ENQUIRIES", "产品咨询"], ["Bring MiniScope 1.0<br/>into your workflow.", "让微影 1.0<br/>融入您的工作流程。"], ["Talk with the HolyLens team about product configuration, availability and clinical integration.", "与 HolyLens 团队沟通产品配置、供应情况与临床集成方案。"],
  ["MiniScope 1.0 portable ultrasound system", "微影 1.0 便携式超声系统"], ["Clinician using the MiniScope 1.0 probe and connected workspace", "医务人员使用微影 1.0 探头与互联工作空间"], ["MiniScope 1.0 handheld console and ultrasound probe", "微影 1.0 手持主机与超声探头"],
  [">AI-assisted<", ">AI 辅助<"], [">Portable<", ">便携设计<"], [">Connected<", ">智能互联<"], ["MiniScope 1.0", "微影 1.0"]
];

let zhHome = replaceAll(sourceHome, zhCommon);
let enHome = replaceAll(sourceHome, enCommon);
let zhProductHtml = replaceAll(sourceProduct, [...zhCommon, ...zhProduct]);
let enProductHtml = replaceAll(sourceProduct, enCommon);
let zhMiniScopeHtml = replaceAll(sourceMiniScope, [...zhMiniScope, ...zhCommon, ...zhProduct]);
let enMiniScopeHtml = replaceAll(sourceMiniScope, enCommon);

for (const [lang, page, html] of [["zh","home",zhHome],["en","home",enHome],["zh","product",zhProductHtml],["en","product",enProductHtml],["zh","miniscope",zhMiniScopeHtml],["en","miniscope",enMiniScopeHtml]]) {
  let localized = injectLanguageSwitch(html, lang, page);
  const prefix = `/${lang}`;
  for (const slug of ["miniscope-1", ...productDetailCatalog.map((product) => product.slug)]) {
    localized = localized.replaceAll(`href="/product/${slug}"`, `href="${prefix}/product/${slug}/"`);
  }
  localized = localized
    .replaceAll('href="/product/"', `href="${prefix}/product/"`)
    .replaceAll('href="/product"', `href="${prefix}/product/"`)
    .replaceAll('href="/"', `href="${prefix}/"`)
    .replaceAll('href="/#', `href="${prefix}/#`);
  const file = page === "home" ? path.join(site, lang, "index.html") : page === "miniscope" ? path.join(site, lang, "product", "miniscope-1", "index.html") : path.join(site, lang, "product", "index.html");
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, localized, "utf8");
}

const redirect = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=/zh/"><title>HolyLens</title></head><body><p><a href="/zh/">中文</a> · <a href="/en/">English</a></p></body></html>`;
await fs.writeFile(path.join(site, "index.html"), redirect, "utf8");

console.log("Chinese and English static sites generated.");
await import("./generate-product-details.mjs");
