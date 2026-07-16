import { access, cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const source = path.join(root, "source", "holylens.com");
const output = path.join(root, "public");
const localizedOutput = path.join(output, "_pages");

const translations = {
  "HolyLens - Innovative Medical Facility with AI": "HolyLens - AI 创新医疗设备",
  Home: "首页",
  "Home One": "首页一",
  "Home Two": "首页二",
  "Home Three": "首页三",
  "About Us": "关于我们",
  About: "关于我们",
  Product: "产品",
  Products: "产品",
  Projects: "产品",
  Project: "产品",
  "Project Details": "产品详情",
  Solution: "解决方案",
  Solutions: "解决方案",
  Service: "服务",
  Services: "服务",
  "Service Details": "服务详情",
  "Solution Details": "解决方案详情",
  Contact: "联系我们",
  "Contact Us": "联系我们",
  "Contact us": "联系我们",
  Contacts: "联系方式",
  Team: "团队",
  "Team Details": "团队详情",
  Blog: "资讯",
  "Blog Details": "资讯详情",
  Page: "页面",
  FAQ: "常见问题",
  Faq: "常见问题",
  "Requesting A Call:": "电话咨询：",
  "Sunday - Friday:": "周日至周五：",
  "9 am - 8 pm": "上午 9 点至晚上 8 点",
  "Get a quote": "获取方案",
  "More Services": "更多服务",
  "Read More": "阅读更多",
  MORE: "更多",
  "Learn More": "了解更多",
  "Know More": "了解更多",
  "View Details": "查看详情",
  "view details": "查看详情",
  Submit: "提交",
  "Submit Now": "立即提交",
  REPLY: "回复",
  Search: "搜索",
  "All Reviews": "全部评价",
  "More Doctors": "更多医生",
  "More Blogs": "更多资讯",
  "Let’s Talk": "联系我们",
  "Get in Touch": "联系我们",
  "Get In Touch": "联系我们",
  "GET APPOINMENT": "预约咨询",
  "GET FREE LINKS": "快捷链接",
  "Quick LINKS": "快捷链接",
  "QUICK LINKS": "快捷链接",
  "OUR PRODUCTS": "我们的产品",
  "OUR SOLUTIONS": "我们的解决方案",
  "OUR SERVICES": "我们的服务",
  "More Services": "更多服务",
  "CONTACT US": "联系我们",
  "Our ADDRESS": "我们的地址",
  "Our Latest News": "最新资讯",
  "Latest News": "最新资讯",
  "Latest Posts": "最新文章",
  "Popular Post": "热门文章",
  Newsletter: "订阅资讯",
  "Follow On:": "关注我们：",
  "Popular Tags": "热门标签",
  Categories: "分类",
  Category: "分类",
  "Comments (05)": "评论（05）",
  "Comment (6)": "评论（6）",
  "Leave a Reply": "发表评论",
  "By admin": "管理员发布",
  "By Admin": "管理员发布",
  "Terms &amp; Condition": "条款与条件",
  "Privacy &amp; Policy": "隐私政策",
  "Customer Relationship": "客户关系",
  "Shareholder Value": "股东价值",
  Compliance: "合规治理",
  "Corporate Culture": "企业文化",
  "Management Team": "管理团队",
  Career: "加入我们",
  "Heart Diseases": "心脏疾病",
  "Weight Diseases": "体重管理",
  "Dibetics Diseases": "糖尿病",
  "Kidney Diseases": "肾脏疾病",
  "Cancer Diseases": "肿瘤疾病",
  "Others Diseases": "其他疾病",
  "Heart Sound": "心音检测",
  "Blood Pressure": "血压检测",
  "Blood Glucose": "血糖检测",
  ECG: "心电检测",
  "Blood Oxygen": "血氧检测",
  "Uric Acid": "尿酸检测",
  "Check by yourself": "自主检测",
  "Your Wellness, Our Unwavering Commitment": "守护健康，始终如一",
  "We detect disease before it strikes.": "让疾病风险被更早发现。",
  "HolyLens is a global innovator in AI medical devices, combining AI with advanced imaging and acoustic technologies.": "HolyLens 是全球 AI 医疗设备创新者，将人工智能与先进医学影像、声学技术深度融合。",
  "We treat with the mind": "以智慧守护健康",
  "The power of applied intelligence": "释放应用智能的力量",
  "We take a closer look": "让每一次检测更深入",
  Technology: "人工智能技术",
  Agriculture: "医学影像",
  Financial: "声学检测",
  "Our services": "我们的服务",
  "Healthcare is a basic human right": "让优质医疗触手可及",
  "Root with nature": "智能心音筛查",
  "Uprooted to earth": "多模态影像分析",
  "Grow naturally": "个体化健康管理",
  "Performing surgeries": "临床辅助决策",
  "Number Talks": "数字见证",
  "Adding Green to your Life": "为生命增添健康底色",
  Patients: "服务患者",
  "Specialist Doctor": "合作专家",
  "Patients Satisfaction": "患者满意度",
  Visitors: "网站访客",
  "Dedicated team": "专业团队",
  "our Best Doctors": "我们的专家团队",
  "Our Guidelines": "我们的准则",
  "Better Care!": "更好的照护",
  "Smile Again": "重拾安心笑容",
  "Clients Talk": "客户评价",
  "Healthcare is wealth": "健康就是财富",
  "Put your health in good hands": "把健康交给值得信赖的科技",
  "Giving You a Reason To Smile Again": "让每一次健康管理更安心",
  "A nation grows with help of health care": "医疗创新推动更健康的社会",
  "We treat even the most complicated cases": "复杂病例也能获得清晰洞察",
  "Our medical team is dedicated to providing": "专业团队持续提供可靠支持",
  "Caring is a cause of the growing community": "以关怀连接更健康的社区",
  "Even the Most Complicated Cases Our Expertise Makes a Difference": "专业能力，让复杂病例也有所不同",
  "Better health and a better way of life": "更健康，更好的生活方式",
  "Protect yourself and the ones you love": "守护自己与所爱之人",
  "Let’s talk about a healthier tomorrow": "一起开启更健康的明天",
  "Since from 2018": "始于 2018",
  "There is a Big opportunity of our Medical Facilities": "用 AI 医疗设备拓展诊疗新可能",
  "OUR VISION": "我们的愿景",
  "OUR HISTORY": "我们的历程",
  "Our Team": "我们的团队",
  "Working steps": "工作流程",
  "Step 1": "第一步",
  "Step 2": "第二步",
  "Step 3": "第三步",
  Prescribing: "制定检测方案",
  Medicine: "医学分析",
  "Cheak up": "复核结果",
  "Health care is foundation of modern treatment": "医疗科技是现代诊疗的重要基础",
  "Medical service refers of healthcare": "覆盖多场景的智能医疗服务",
  "Heart Service": "心脏健康服务",
  "Financial Services": "健康风险评估",
  "Technical Assistance": "技术支持",
  "Medicine Service": "医学服务",
  "Work gallery": "应用场景",
  "Life's Stages Loyal Protection for All": "全生命周期的忠诚守护",
  "Your health is our passion": "专注每个人的健康",
  "Health Planning": "健康规划",
  "Medicine Sector": "医学分析",
  "Heart Section": "心脏健康",
  "Service lists": "服务列表",
  "What we offer": "我们提供什么",
  "Health system": "健康管理系统",
  "Best Health Service": "优质健康服务",
  "Hospital Profile": "医院概况",
  "Medicine industry": "医疗行业",
  "Dibetics section": "糖尿病管理",
  "do you have any question?": "您有任何问题吗？",
  "have You any question?": "您有任何问题吗？",
  "Touch Here Any time ?": "随时与我们联系",
  Location: "地址",
  Email: "邮箱",
  "Say yes to your good health!": "拥抱更健康的自己",
  "Be safe and healthy": "安全检测，健康相伴",
  "Creating a Balanced and Nutritious": "建立均衡营养方案",
  "The Importance of Staying Hydrated": "保持充足水分的重要性",
  "The Link Between Mental Health": "心理健康与身体状态的联系",
  "How to Get Enough Sleep": "如何获得充足睡眠",
  "Staying Hydrated": "保持充足水分",
  "Meditation and Mindfulness": "冥想与正念",
  "Creating a Balanced Diet": "建立均衡饮食",
  "Positive Thinking and Health": "积极思维与健康",
  Name: "名称",
  Author: "作者",
  Date: "日期",
  Tags: "标签",
  Value: "价值",
  Surgery: "医学项目",
  "Medical,Operation": "医疗，检测",
  "Achieving better health care one patient at a time": "从每一位患者开始，改善医疗体验",
  Qualification: "资质",
  "Working Hour": "工作时间",
  Monday: "周一",
  Tuesday: "周二",
  Friday: "周五",
  "Heart Specialist": "心脏专科专家",
  "Open Heart Surgery": "心脏外科",
  "Discover Covid-Support &amp; Resources": "健康支持与资源",
  "Health Service": "健康服务",
  "Cancer Service": "肿瘤健康服务",
  "Kidney Service": "肾脏健康服务",
  "Others Service": "其他健康服务",
  Appointment: "预约",
  Doctors: "医生",
  Diagnosis: "诊断",
  Pharmaceuticals: "药物",
  Professional: "专业服务",
  Healthcare: "医疗健康",
  Healthcareworkers: "医护人员",
  Babyhealthcare: "儿童健康",
  "Helping Tips": "健康建议",
  Life: "生活方式",
  Cancer: "肿瘤健康",
  Kidney: "肾脏健康",
  Dibetics: "糖尿病",
  "Medical Conditions": "健康状况",
  "Medication and Treatment": "药物与治疗",
  "Mental Health": "心理健康",
  "Women's Health": "女性健康",
  "Diet and Nutrition": "饮食与营养",
  "Health and Wellness": "健康与福祉",
  "Finest Products, Finest Results": "优质产品，可靠结果",
  "Many Thoughts On “Reach your health potential”": "关于“释放健康潜能”的讨论",
  "Your E-mail address will be not published.Required fields are marked*": "您的邮箱不会公开，带 * 的字段为必填项。",
  "Save my name,email and website in this browser for the next time": "在此浏览器中保存我的姓名、邮箱与网站，方便下次填写。",
  "Subscribe for get more help and information": "订阅以获得更多帮助与资讯",
  "Marketing Coordinator": "市场协调员",
  "Medical Assistant": "医疗助理",
  "Nursing Assistant": "护理助理",
  "Heart Speceilis": "心脏专科专家",
  "Cancer Special": "肿瘤专科",
  "Heart Special": "心脏专科",
  "Kidney Special": "肾脏专科",
};

const genericCopy =
  "HolyLens 以人工智能、医学影像与声学技术为核心，为医疗机构与个人提供更早期、更便捷、更可靠的健康洞察。";

function normalize(value) {
  return value.replace(/\s+/g, " ").trim();
}

function translateTextNode(value) {
  const text = normalize(value);
  if (!text || !/[A-Za-z]/.test(text)) return value;
  const exact = translations[text];
  if (exact) return value.replace(text, exact);

  if (/lorem|dummy|desktop publishing|readable content|aliquam|posuere|typesetting|printing|car owners|variations of passages/i.test(text)) {
    return value.replace(text, genericCopy);
  }

  if (/^(?:Dr\.|MIckel|John |Jane |Floyd |Marvin |Cody |Guy |Albert |Devon |Kathryn |Richard |Mike |Mark |Chis |MiniScope|StarScope|TurgoScope|MiniVision|MBBS|FCPS|MB\(|Harverd|New York|Old city|[A-Z][a-z]+ [A-Z][a-z]+$)/.test(text)) {
    return value;
  }

  let translated = text;
  const phraseReplacements = [
    [/Healthcare/gi, "医疗健康"],
    [/Medical/gi, "医疗"],
    [/Health/gi, "健康"],
    [/Service/gi, "服务"],
    [/Details/gi, "详情"],
    [/Heart/gi, "心脏"],
    [/Kidney/gi, "肾脏"],
    [/Cancer/gi, "肿瘤"],
    [/Medicine/gi, "医学"],
    [/Doctor/gi, "医生"],
    [/Patient/gi, "患者"],
    [/Team/gi, "团队"],
    [/Blog/gi, "资讯"],
    [/Project/gi, "产品"],
    [/Contact/gi, "联系"],
    [/Care/gi, "照护"],
  ];
  for (const [pattern, replacement] of phraseReplacements) {
    translated = translated.replace(pattern, replacement);
  }
  if (translated !== text) return value.replace(text, translated);
  if (text.length > 70) return value.replace(text, genericCopy);
  return value;
}

function translateHtml(html) {
  const parts = html.split(/(<[^>]+>)/g);
  for (let i = 0; i < parts.length; i += 2) parts[i] = translateTextNode(parts[i]);
  return parts.join("")
    .replace(/placeholder="Your mail address"/g, 'placeholder="请输入邮箱地址"')
    .replace(/placeholder="Your Name"/g, 'placeholder="您的姓名"')
    .replace(/placeholder="Your Email"/g, 'placeholder="您的邮箱"')
    .replace(/placeholder="Email Address"/g, 'placeholder="邮箱地址"')
    .replace(/placeholder="Subject"/g, 'placeholder="主题"')
    .replace(/placeholder="Message"/g, 'placeholder="留言内容"')
    .replace(/placeholder="Search"/g, 'placeholder="搜索"');
}

function fixAssetPaths(html) {
  return html
    .replace(/data-bg-image="assets\//g, 'data-bg-image="/assets/')
    .replace(/data-bg-image="pattern\/footer-pattern\.png"/g, 'data-bg-image="/assets/img/pattern/footer-pattern.png"')
    .replace(/src="image\/icons\/doctor-report-writing-pen-check\.svg"/g, 'src="/assets/img/logos/logo_fav.jpg"');
}

function rewriteLinks(html, locale) {
  return html.replace(/href="\/([^"?#]+\.html)([^"#?]*)"/g, `href="/${locale}/$1$2"`);
}

function injectBilingualUi(html, locale, filename) {
  const other = locale === "en" ? "zh" : "en";
  const label = locale === "en" ? "中文" : "EN";
  const aria = locale === "en" ? "切换到中文" : "Switch to English";
  const stylesheet = '    <link rel="stylesheet" href="/holylens-bilingual.css">\n';
  const switcher = `\n    <a class="hl-language-switch" href="/${other}/${filename}" aria-label="${aria}">${label}</a>\n`;
  return html.replace("</head>", `${stylesheet}</head>`).replace("</body>", `${switcher}</body>`);
}

await rm(path.join(output, "en"), { recursive: true, force: true });
await rm(path.join(output, "zh"), { recursive: true, force: true });
await rm(localizedOutput, { recursive: true, force: true });
await rm(path.join(output, "assets"), { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(path.join(source, "assets"), path.join(output, "assets"), { recursive: true });

const files = (await readdir(source)).filter((file) => file.endsWith(".html"));
for (const locale of ["en", "zh"]) {
  const localeDir = path.join(localizedOutput, locale);
  await mkdir(localeDir, { recursive: true });
  for (const filename of files) {
    let html = await readFile(path.join(source, filename), "utf8");
    html = fixAssetPaths(html);
    html = rewriteLinks(html, locale);
    html = html.replace(/<html([^>]*?)lang="en"/i, `<html$1lang="${locale === "en" ? "en" : "zh-CN"}"`);
    html = html.replace(/DeepCare - Health &amp; Medical HTML Template \| Home 0[12]/g, "HolyLens - Innovative Medical Facility with AI");
    if (locale === "zh") html = translateHtml(html);
    html = injectBilingualUi(html, locale, filename);
    await writeFile(path.join(localeDir, filename), html);
  }
}

const referencedAssets = new Set();
for (const filename of files) {
  const html = await readFile(path.join(localizedOutput, "en", filename), "utf8");
  for (const match of html.matchAll(/\/assets\/[^\s"'()<>]+/g)) {
    referencedAssets.add(decodeURIComponent(match[0].split(/[?#]/)[0]));
  }
}
const compiledCss = await readFile(path.join(output, "assets", "css", "styles.min.css"), "utf8");
for (const match of compiledCss.matchAll(/\/assets\/[^\s"'()<>]+/g)) {
  referencedAssets.add(decodeURIComponent(match[0].split(/[?#]/)[0]));
}
const missingAssets = [];
for (const asset of referencedAssets) {
  try {
    await access(path.join(output, asset.replace(/^\//, "")));
  } catch {
    missingAssets.push(asset);
  }
}
if (missingAssets.length) {
  throw new Error(`Missing local assets:\n${missingAssets.sort().join("\n")}`);
}

console.log(`Built ${files.length} English pages and ${files.length} Chinese pages.`);
console.log(`Verified ${referencedAssets.size} local asset references.`);
