import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const site = path.join(root, "static-site");
const source = await fs.readFile(path.join(root, "public", "lab-static", "index.html"), "utf8");

const translations = [
  ["用于产品研发规划，不构成医疗建议。所有医疗设备均需完成适用的安全、性能和临床验证。", "For product research and development planning only; not medical advice. All medical devices require applicable safety, performance and clinical validation."],
  ["从体表声音到医学影像，建立 HolyLens 多模态采集技术地图。", "From body-surface sounds to medical imaging, mapping the HolyLens multimodal sensing technology landscape."],
  ["脑、脊柱、关节及软组织三维影像", "Three-dimensional imaging of the brain, spine, joints and soft tissue"],
  ["脑功能、纤维连接和水分子扩散", "Brain function, fiber connectivity and water diffusion"],
  ["多角度X光重建的断层体数据", "Tomographic volume data reconstructed from multi-angle X-ray acquisition"],
  ["偏振放大的皮肤表层与色素结构", "Polarized magnification of skin surface and pigmented structures"],
  ["呼吸音、啰音、哮鸣音与摩擦音", "Breath sounds, crackles, wheezes and friction rubs"],
  ["腹部蠕动声与胃肠动力声学信号", "Abdominal motility sounds and gastrointestinal acoustic signals"],
  ["使用低相干光生成浅层断层图像", "Low-coherence light for shallow tomographic imaging"],
  ["S1/S2、附加心音与瓣膜杂音", "S1/S2, additional heart sounds and valvular murmurs"],
  ["颈动脉杂音、瘘管与血流声", "Carotid bruits, fistula sounds and blood-flow acoustics"],
  ["胸片、骨骼和静态投影影像", "Chest radiographs, skeletal and static projection imaging"],
  ["器官功能、灌注和示踪剂分布", "Organ function, perfusion and tracer distribution"],
  ["腔道和内部器官的实时可视化", "Real-time visualization of lumens and internal organs"],
  ["视网膜、视盘和眼底血管", "Retina, optic disc and fundus vasculature"],
  ["细胞、血液和组织切片数字化", "Digital capture of cells, blood and tissue slides"],
  ["咳嗽、打鼾、呼吸节律与语音", "Cough, snoring, respiratory rhythm and voice"],
  ["牙齿、牙龈、舌面与咽部", "Teeth, gums, tongue surface and pharynx"],
  ["外耳道、鼓膜和耳部病灶", "Ear canal, tympanic membrane and ear lesions"],
  ["温度分布、炎症和伤口观察", "Temperature distribution, inflammation and wound observation"],
  ["双足温差和局部热点变化", "Bilateral foot-temperature differences and localized hot spots"],
  ["器官和软组织断层结构", "Cross-sectional structure of organs and soft tissue"],
  ["心脏结构、瓣膜和运动轨迹", "Cardiac structures, valves and motion trajectories"],
  ["血流方向、速度和频谱", "Blood-flow direction, velocity and spectrum"],
  ["介入操作和造影剂动态观察", "Interventional procedures and dynamic contrast observation"],
  ["代谢与分子活动的功能影像", "Functional imaging of metabolic and molecular activity"],
  ["非接触体表温度和趋势监测", "Non-contact surface temperature and trend monitoring"],
  ["咽部吞咽音与表面振动", "Pharyngeal swallowing sounds and surface vibration"],
  ["运动中的摩擦、弹响与振动", "Friction, clicks and vibration during movement"],
  ["胎儿心搏和心率节律", "Fetal heartbeat and heart-rate rhythm"],
  ["皮肤、创面、肢体和颜色变化", "Skin, wounds, limbs and color changes"],
  ["人体声音采集", "Body Sound Acquisition"],
  ["光学与微型成像", "Optical and Miniature Imaging"],
  ["红外与热成像", "Infrared and Thermal Imaging"],
  ["多模态联合采集", "Multimodal Combined Acquisition"],
  ["声学、节律与结构联合", "Combined acoustic, rhythm and structural signals"],
  ["呼吸状态联合观察", "Combined respiratory-state observation"],
  ["形态与温度趋势联合", "Combined morphology and temperature trends"],
  ["多源慢病风险研究", "Multi-source chronic-disease risk research"],
  ["没有匹配的采集技术", "No matching sensing technology"],
  ["换一个关键词或选择其他技术域。", "Try another keyword or select a different technology domain."],
  ["研发地图 · 非临床建议", "R&D MAP · NOT CLINICAL ADVICE"],
  ["HOLYLENS 建议路径", "HOLYLENS RECOMMENDED PATH"],
  ["电子听诊头 · MEMS · 压电", "Electronic chestpiece · MEMS · Piezoelectric"],
  ["接触麦克风 · 听诊阵列", "Contact microphone · Auscultation array"],
  ["压电贴片 · 接触麦克风", "Piezoelectric patch · Contact microphone"],
  ["电子听诊 · 多普勒探头", "Electronic auscultation · Doppler probe"],
  ["空气麦克风 · 喉部传感器", "Air microphone · Throat sensor"],
  ["胎心听诊 · 超声多普勒", "Fetal auscultation · Ultrasound Doppler"],
  ["接触麦克风 · 加速度计", "Contact microphone · Accelerometer"],
  ["喉部麦克风 · 加速度计", "Throat microphone · Accelerometer"],
  ["RGB相机 · 标定光源", "RGB camera · Calibrated illumination"],
  ["偏振镜头 · 环形光", "Polarized lens · Ring light"],
  ["微型镜头 · 冷光源", "Miniature lens · Cold light source"],
  ["口腔镜 · 微距摄像头", "Oral scope · Macro camera"],
  ["眼底相机 · 专用光路", "Fundus camera · Dedicated optics"],
  ["红外光源 · 干涉光路", "Infrared source · Interferometric optics"],
  ["柔性光纤 · 微型相机", "Flexible fiber optics · Miniature camera"],
  ["显微镜 · 病理扫描仪", "Microscope · Pathology scanner"],
  ["热阵列 · 标准化踏板", "Thermal array · Standardized footplate"],
  ["搜索设备、部位或技术", "Search devices, anatomy or technology"],
  ["身体信息，", "Body signals,"],
  ["如何被看见与听见", "made visible and audible"],
  ["采集技术域", "Sensing Domains"],
  ["技术域", "Technology Domains"],
  ["设备与模态", "Devices & Modalities"],
  ["优先产品方向", "Priority Product Directions"],
  ["优先产品方向", "Priority Product Directions"],
  ["近期优先", "Near-term Priority"],
  ["建议下一步", "Recommended Next"],
  ["便携方向", "Portable Direction"],
  ["中期方向", "Mid-term Direction"],
  ["平台方向", "Platform Direction"],
  ["电离辐射", "Ionizing Radiation"],
  ["放射性示踪", "Radioactive Tracer"],
  ["神镜实验室", "HolyLens Lab"],
  ["打开 HL.AI.PCG →", "Open HL.AI.PCG →"],
  ["在新标签页打开 HL.AI.PCG", "Open HL.AI.PCG in a new tab"],
  ["打开 HL.AI.VAG →", "Open HL.AI.VAG →"],
  ["在新标签页打开 HL.AI.VAG", "Open HL.AI.VAG in a new tab"],
  ["在新标签页打开项目", "Open project in a new tab"],
  ["电子听诊", "Electronic Auscultation"],
  ["耳镜 / 皮肤镜 / 热像", "Otoscope / Dermatoscope / Thermal"],
  ["便携超声", "Portable Ultrasound"],
  ["多模态 AI", "Multimodal AI"],
  ["心脏与 M 模式", "Cardiac and M-mode"],
  ["功能与弥散 MRI", "Functional and Diffusion MRI"],
  ["足部温度地图", "Foot Temperature Map"],
  ["体表与伤口", "Body Surface and Wounds"],
  ["口腔与咽喉", "Oral Cavity and Throat"],
  ["二维 B 模式", "2D B-mode"],
  ["透视与造影", "Fluoroscopy and Angiography"],
  ["人体声音", "Body Sounds"],
  ["心音", "Heart Sounds"],
  ["肺音", "Lung Sounds"],
  ["肠鸣音", "Bowel Sounds"],
  ["血管音", "Vascular Sounds"],
  ["咳嗽与呼吸", "Cough and Breathing"],
  ["胎心音", "Fetal Heart Sounds"],
  ["关节声音", "Joint Sounds"],
  ["吞咽声音", "Swallowing Sounds"],
  ["皮肤镜", "Dermatoscopy"],
  ["电子耳镜", "Digital Otoscopy"],
  ["眼底成像", "Fundus Imaging"],
  ["内窥成像", "Endoscopic Imaging"],
  ["数字显微", "Digital Microscopy"],
  ["红外测温", "Infrared Thermometry"],
  ["医学热像", "Medical Thermography"],
  ["超声成像", "Ultrasound Imaging"],
  ["多普勒超声", "Doppler Ultrasound"],
  ["弹性成像", "Elastography"],
  ["数字 X 光", "Digital X-ray"],
  ["磁共振成像", "Magnetic Resonance Imaging"],
  ["解剖 MRI", "Anatomical MRI"],
  ["核医学成像", "Nuclear Medicine Imaging"],
  ["传感器", "Sensor"],
  ["设备", "Device"],
  ["输出", "Output"],
  ["全部", "All"],
  ["声音", "Sound"],
  ["光学", "Optical"],
  ["热成像", "Thermal"],
  ["超声", "Ultrasound"],
  ["放射", "Radiology"],
  ["大型影像", "Advanced Imaging"],
  ["多模态", "Multimodal"],
  ["便携", "Portable"],
  ["建议方向", "Suggested Direction"],
  ["研究", "Research"],
  ["探索", "Exploratory"],
  ["实验室", "Laboratory"],
  ["专业设备", "Professional Device"],
  ["高门槛", "High Complexity"],
  ["高监管", "Highly Regulated"],
  ["大型设备", "Large Equipment"],
  ["专业研究", "Specialist Research"],
  ["极高门槛", "Very High Complexity"],
  ["高阶", "Advanced"],
  ["红外温度阵列", "Infrared temperature array"],
  ["长波红外相机", "Long-wave infrared camera"],
  ["多通道音频", "Multichannel audio"],
  ["长时声学序列", "Long-duration acoustic sequence"],
  ["声频 / 多普勒频谱", "Audio / Doppler spectrum"],
  ["音频 / 事件序列", "Audio / Event sequence"],
  ["音频 / 振动", "Audio / Vibration"],
  ["声振联合信号", "Combined acoustic-vibration signal"],
  ["图像 / 视频", "Image / Video"],
  ["视频 / 图像", "Video / Image"],
  ["照片 / 视频", "Photo / Video"],
  ["高分辨率图像", "High-resolution image"],
  ["眼底图像", "Fundus image"],
  ["超大幅图像", "Whole-slide image"],
  ["2D灰阶图像", "2D grayscale image"],
  ["彩色 / 频谱数据", "Color / Spectral data"],
  ["弹性图 / 数值", "Elastogram / Values"],
  ["DICOM影像", "DICOM image"],
  ["DICOM序列 / 3D", "DICOM series / 3D"],
  ["实时X光序列", "Real-time X-ray sequence"],
  ["DICOM / 3D体数据", "DICOM / 3D volume data"],
  ["时序 / 参数图", "Time series / Parametric maps"],
  ["3D活度分布", "3D activity distribution"],
  ["断层功能图", "Tomographic functional map"],
  ["断层体数据", "Tomographic volume data"],
  ["音频 / FHR", "Audio / FHR"],
  ["血氧", "SpO₂"],
  ["呼吸率", "Respiratory Rate"],
  ["伤口图像", "Wound Image"],
  ["眼底", "Fundus"],
  ["血压", "Blood Pressure"],
  ["血糖", "Blood Glucose"],
  ["组织硬度和形变分布", "Tissue stiffness and deformation distribution"],
  ["X光与 CT", "X-ray and CT"],
  ["HOLYLENS Lab · 采集技术", "HOLYLENS Lab · Sensing Technology"]
];

function nav(lang) {
  const zh = lang === "zh";
  const other = zh ? "en" : "zh";
  return `<nav class="lab-nav"><a class="official-brand" href="/${lang}/" aria-label="HOLYLENS home"><img class="lab-logo" src="/images/holylens/logo-hd.png" alt="HOLYLENS"></a><div class="official-links"><a href="/${lang}/">${zh ? "首页" : "Home"}</a><a href="/${lang}/product/">${zh ? "产品" : "Product"}</a><a class="active" href="/${lang}/lab/">${zh ? "实验室" : "Lab"}</a><a href="/${lang}/#solution">${zh ? "解决方案" : "Solution"}</a><a href="/${lang}/contact/">${zh ? "联系" : "Contact"}</a></div><a class="official-language desktop-language" href="/${other}/lab/">${zh ? "EN" : "CN"} ↗</a><div class="official-mobile-links"><a href="/${lang}/contact/">${zh ? "联系" : "Contact"}</a><a class="official-language" href="/${other}/lab/">${zh ? "EN" : "CN"} ↗</a></div></nav>`;
}

function footer(lang) {
  const zh = lang === "zh";
  return `<footer class="lab-site-footer"><div class="lab-footer-main"><div class="lab-footer-brand"><a href="/${lang}/"><img src="/images/holylens/logo-hd.png" alt="HOLYLENS"></a><h2>${zh ? "更早看见，<br>更好守护。" : "See earlier.<br>Care better."}</h2><p>${zh ? "以 AI 医疗设备带来更早洞察与更优质医疗。" : "AI medical devices for earlier insight and better care."}</p></div><div class="lab-footer-links"><div><small>${zh ? "网站导航" : "Explore"}</small><a href="/${lang}/">${zh ? "首页" : "Home"}</a><a href="/${lang}/product/">${zh ? "产品" : "Product"}</a><a href="/${lang}/lab/">${zh ? "实验室" : "Lab"}</a><a href="/${lang}/#solution">${zh ? "解决方案" : "Solution"}</a></div><div><small>${zh ? "核心技术" : "Technology"}</small><a href="/${lang}/#solution">${zh ? "AI 医疗大模型平台" : "Medical AI Platform"}</a><a href="/${lang}/#solution">${zh ? "AI 医疗专用芯片" : "Medical AI Chip"}</a><a href="/${lang}/#demos">${zh ? "临床解决方案" : "Clinical Solutions"}</a></div><div><small>${zh ? "联系我们" : "Contact"}</small><a href="mailto:info@holylens.com">info@holylens.com</a><a href="mailto:sales@holylens.com">sales@holylens.com</a></div></div></div><div class="lab-footer-bottom"><span>${zh ? "神镜（上海）医疗设备有限公司" : "HolyLens (Shanghai) Medical Devices Co., Ltd."}</span><span>${zh ? "地址：上海市黄浦区云南北路59号六合大厦4层" : "Address: 4F, Liuhe Building, No. 59 North Yunnan Road, Huangpu District, Shanghai"}</span><a href="#top">${zh ? "返回顶部" : "Back to top"} ↑</a></div></footer>`;
}

function normalize(html, lang) {
  let output = html
    .replaceAll("./static/", "/lab-static/static/")
    .replace(/<nav class="lab-nav">[\s\S]*?<\/nav>/, nav(lang))
    .replace(/<footer class="lab-site-footer">[\s\S]*?<\/footer>/, footer(lang));
  if (lang === "en") {
    output = output
      .replace('lang="zh-CN"', 'lang="en"')
      .replace(/data-search="[^"]*"/g, 'data-search=""')
      .replace(/(https:\/\/[a-z0-9-]+\.holylens\.com)\/zh\//g, "$1/en/");
    for (const [from, to] of [...translations].sort((a, b) => b[0].length - a[0].length)) output = output.replaceAll(from, to);
    if (/[\u3400-\u9fff]/.test(output)) {
      const remaining = [...new Set(output.match(/[\u3400-\u9fff][^<>"']*/g) || [])];
      throw new Error(`Untranslated Chinese remains in English Lab page: ${remaining.join(" | ")}`);
    }
  }
  return output;
}

for (const lang of ["zh", "en"]) {
  const target = path.join(site, lang, "lab", "index.html");
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, normalize(source, lang), "utf8");
}

console.log("Generated Chinese and English Lab pages.");
