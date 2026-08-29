const services = [
  ["01", "AI Medical Imaging", "Deep-learning assisted imaging analysis for earlier, clearer clinical insight.", "solution-ai-imaging.png"],
  ["02", "Acoustic Intelligence", "Advanced acoustic sensing combined with AI for fast, non-invasive screening.", "solution-acoustic-intelligence.png"],
  ["03", "Clinical Solutions", "Integrated devices and workflows designed for real-world healthcare environments.", "solution-clinical-workflow-v2.png"],
];

const team = [
  ["Dr. Lin Wei", "Cardiologist"],
  ["Dr. Seo-yun Kim", "Radiologist"],
  ["Dr. Emily Carter", "Clinical AI Specialist"],
  ["Dr. Marcus Johnson", "Medical Device Specialist"],
];

const posts = [
  {
    category: "Clinical Intelligence",
    title: "AI-assisted review makes complex cases clearer",
    text: "Multimodal analysis brings imaging, pathology and clinical context into one dependable view.",
    image: "news-complex-case-realistic.png",
  },
  {
    category: "Connected Care",
    title: "Multidisciplinary care, connected by intelligence",
    text: "Shared insight helps clinical teams make faster, better-informed decisions around every patient.",
    image: "news-care-team-realistic.png",
  },
  {
    category: "Community Health",
    title: "Earlier screening, closer to every community",
    text: "Portable intelligent devices bring dependable screening and follow-up closer to families.",
    image: "news-community-care-realistic.png",
  },
];

const applications = [
  ["医学影像 AI 诊断", "支持 CT、MRI、X 光、超声等多模态影像的自动化分析", "肺结节检测 · 骨折识别 · 肿瘤分割 · 病灶追踪"],
  ["病理智能分析", "数字化病理切片的全景扫描与 AI 辅助诊断", "癌变检测 · 分级评估 · 免疫组化 · 预后预测"],
  ["临床决策支持", "融合千万级病例，提供实时个性化诊疗建议", "智能问诊 · 用药推荐 · 风险评估 · 治疗方案"],
  ["药物研发加速", "利用大模型预测分子活性，缩短筛选周期", "靶点发现 · 分子设计 · 临床试验 · 副作用预测"],
  ["智慧医院管理", "全院级 AI 赋能，提升运营效率与服务质量", "智能导诊 · 排班优化 · 质控管理 · 耗材管理"],
  ["科研算力平台", "为医学科研提供高性能 AI 训练与推理算力", "基因组学 · 蛋白质分析 · 临床数据 · 多中心研究"],
];

export default function Home() {
  return (
    <main id="top">
      <div className="topbar" />
      <header className="nav">
        <a className="brand" href="#top" aria-label="HolyLens home">
          <img className="official-logo" src="/images/holylens/logo-hd.png" alt="HolyLens" />
        </a>
        <nav aria-label="Main navigation">
          <a href="#top">Home</a><a href="#about">About Us</a>
          <a href="/product">Product</a><a href="#solution">Solution</a><a href="#contact">Contact</a>
        </nav>
        <a className="mobile-contact" href="mailto:info@holylens.com">Contact</a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="kicker">| Your Wellness, Our Unwavering Commitment</p>
          <h1>We detect<br />disease before<br />it strikes.</h1>
          <p>HolyLens is a global innovator in AI medical devices, combining AI with advanced imaging and acoustic technologies.</p>
          <a className="button" href="#solution">More Services <span>››</span></a>
        </div>
        <div className="device-scene" aria-label="HolyLens medical device">
          <img className="hero-photo" src="/images/holylens/hero-portable-ultrasound-transparent-v4.png" alt="HolyLens 便携式手持超声检查设备" />
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-visual">
          <img className="about-main-photo" src="/images/holylens/about-consultation-realistic.png" alt="HolyLens clinician consulting with a patient" />
          <img className="about-small-photo" src="/images/holylens/about-device-detail-realistic.png" alt="HolyLens clinical diagnostic technology" />
          <small>ADVANCED IMAGING × ACOUSTIC TECHNOLOGY</small>
        </div>
        <div className="about-copy">
          <p className="label">About Us</p>
          <h2>We treat with<br />the mind.</h2>
          <p>HolyLens is a world-leading innovative AI medical device company, dedicated to deeply integrating artificial intelligence with cutting-edge medical imaging equipment.</p>
          <p>Our work brings intelligent screening closer to patients and gives healthcare professionals dependable tools for earlier intervention.</p>
          <ul>
            <li>✓ The power of applied intelligence</li>
            <li>✓ We take a closer look</li>
            <li>✓ Built for practical clinical care</li>
          </ul>
          <a className="text-link" href="#contact">Let’s Talk ↗</a>
        </div>
      </section>

      <section className="service-section" id="solution">
        <p className="label">Our Services</p>
        <div className="section-title">
          <h2>Healthcare is a<br />basic human right.</h2>
          <p>AI-powered devices and clinical workflows that help healthcare teams see more, sooner.</p>
        </div>
        <div className="cards">
          {services.map(([id, title, text, visual], index) => (
            <article className={index === 0 ? "service-feature" : "service-compact"} key={id}>
              <div className="service-visual"><img className="service-photo" src={`/images/holylens/${visual}`} alt={title} /></div>
              <div className="service-content"><h3>{title}</h3><p>{text}</p><a href="#contact">Read More <b>↗</b></a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="numbers" id="product">
        <div>
          <p className="label">Number Talks</p>
          <h2>Adding intelligence<br />to healthcare.</h2>
        </div>
        <div className="stat-grid">
          <article><strong>1280+</strong><span>Patients</span></article>
          <article><strong>600+</strong><span>Specialist Doctors</span></article>
          <article><strong>1200+</strong><span>Patient Satisfaction</span></article>
          <article><strong>1000+</strong><span>Visitors</span></article>
        </div>
      </section>

      <section className="source-products">
        <p className="label">PRODUCT PORTFOLIO</p>
        <div className="section-title"><h2>从芯片到平台，<br />全栈优化医疗 AI。</h2><p>覆盖诊断全流程的智能平台与为医疗场景深度优化的处理器。</p></div>
        <div className="source-product-grid">
          <article className="platform-card">
            <img src="/images/holylens/platform-medical-foundation-model.png" alt="HolyLens AI 医疗大模型平台" />
            <span className="inside-badge"><img src="/images/holylens/holycores-mark-black.svg" alt="HolyCores" /></span>
            <div><small>高性能推理 · 低功耗运行 · 边缘部署</small><h3>AI 医疗大模型平台</h3><p>集成影像诊断、病理分析、临床决策支持和药物研发四大核心模块，基于专用硬件优化，实现超低延迟实时推理。</p><ul><li>影像诊断</li><li>病理分析</li><li>临床决策</li><li>药物研发</li></ul></div>
          </article>
          <article className="platform-card">
            <img src="/images/holylens/platform-medical-ai-chip-hcx-e1.png" alt="HolyLens AI 医疗专用芯片 HCX E1" />
            <span className="inside-badge"><img src="/images/holylens/holycores-mark-black.svg" alt="HolyCores" /></span>
            <div><small>AI ISP · 低功耗 · 小体积</small><h3>AI 医疗专用芯片</h3><p>自研神经网络加速器架构，针对医疗 AI 模型特性深度优化，支持从云端到边缘的全场景部署。</p><ul><li>HolyLens-N3</li><li>神经网络加速器</li><li>HolyLens-E1</li><li>边缘推理芯片</li></ul></div>
          </article>
        </div>
      </section>

      <section className="updates">
        <p className="label">LATEST / 最新动态</p>
        <div className="update-grid">
          <article><small>AWARDS</small><h3>HolyLens 荣获 2026 全球医疗 AI 创新大奖，引领芯智一体化技术新方向</h3><a href="#contact">了解更多 →</a></article>
          <article><small>WEBINAR</small><h3>Meet HolyLens-N3：面向医疗 AI 的高效神经网络加速器架构解析</h3><p>2026 年 6 月 15 日 · 线上直播</p></article>
          <article><small>CASE STUDY</small><h3>AI 驱动的基层医疗机构智能影像诊断系统成功覆盖 500+ 县域医院</h3><a href="#cases">阅读案例 →</a></article>
        </div>
      </section>

      <section className="case-study" id="cases">
        <div className="case-image"><img src="/images/holylens/case-county-radiology-realistic.png" alt="AI 影像诊断系统临床应用" /></div>
        <div className="case-copy"><p className="label">客户与伙伴的声音</p><h2>AI 影像诊断系统<br />覆盖 500+ 县域医院。</h2><blockquote>“HolyLens 的 AI 影像诊断平台帮助我们实现了基层医疗机构诊断能力的质的提升，将优质诊断能力带到了县域医院。”</blockquote><p><b>张明远</b><br />智慧医疗联盟 · 技术总监</p></div>
      </section>

      <section className="evolution" id="evolution">
        <p className="label">HOLYLENS AI 技术演进</p>
        <h2>从感知智能，<br />迈向自主智能。</h2>
        <div className="evolution-tabs"><span>01 感知智能</span><span>02 增强智能</span><span>03 生成智能</span><span>04 自主智能 · NEW</span></div>
        <div className="evolution-body">
          <img src="/images/holylens/evolution-perceptive-realistic.png" alt="多模态医疗感知智能" />
          <div><h3>感知智能</h3><p>基于深度学习的环境感知与理解，实时识别医学影像中的异常区域，为诊断提供第一层智能筛选。</p><ul><li>场景理解</li><li>多模态感知</li><li>事件触发</li><li>远程诊断</li></ul></div>
        </div>
      </section>

      <section className="chip-specs">
        <div><p className="label">核心技术</p><h2>AI 医疗<br />专用芯片。</h2><p>从晶体管到算法层的垂直优化，消除软硬件间的性能损耗。</p></div>
        <div className="spec-metrics"><article><strong>10×</strong><span>推理效率 / 相比通用 GPU</span></article><article><strong>5×</strong><span>能效比 / TOPS/W</span></article><article><strong>&lt;5ms</strong><span>端到端响应延迟</span></article></div>
        <dl><div><dt>架构</dt><dd>HolyLens-N3 神经网络加速器</dd></div><div><dt>制程</dt><dd>7nm 先进工艺</dd></div><div><dt>算力</dt><dd>128 TOPS INT8</dd></div><div><dt>功耗</dt><dd>&lt; 15W 超低功耗</dd></div><div><dt>接口</dt><dd>PCIe Gen4 x4</dd></div><div><dt>支持</dt><dd>CNN / Transformer / LLM</dd></div></dl>
      </section>

      <section className="applications">
        <p className="label">应用场景 / APPLICATIONS</p>
        <div className="section-title"><h2>覆盖诊断、治疗、<br />科研与管理。</h2><p>让一套智能底座服务完整医疗体系。</p></div>
        <div className="application-grid">{applications.map(([title, text, tags], i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p><small>{tags}</small></article>)}</div>
      </section>

      <section className="demos" id="demos">
        <p className="label">演示与案例</p><h2>看见真实医疗场景中的 AI。</h2>
        <div className="demo-grid">
          <article><img src="/images/holylens/demo-lung-ct-ai-realistic.png" alt="实时肺部 CT 自动分析" /><small>演示</small><h3>实时 AI 影像诊断 — 肺部 CT 自动分析</h3><p>基于 HolyLens-N3 芯片的实时推理演示</p></article>
          <article><img src="/images/holylens/demo-pathology-ai-realistic.png" alt="癌细胞精准识别" /><small>演示</small><h3>数字化病理 AI 辅助 — 癌细胞精准识别</h3><p>边缘设备上的高效病理分析</p></article>
          <article><img src="/images/holylens/demo-surgical-navigation-realistic.png" alt="手术 AI 导航" /><small>演示</small><h3>手术 AI 导航 — 实时器官追踪与预警</h3><p>超低延迟的边缘 AI 推理</p></article>
        </div>
      </section>

      <section className="guidelines" id="guidelines">
        <p className="label">Our Guidelines</p>
        <h2>Better care,<br />built around people.</h2>
        <div className="guide-grid">
          <article><img src="/images/holylens/guide-better-care-realistic.png" alt="Better Care" /><span>01</span><h3>Better Care</h3><p>Technology should make every clinical interaction clearer, faster and more human.</p></article>
          <article><img src="/images/holylens/guide-earlier-insight-realistic.png" alt="Earlier Insight" /><span>02</span><h3>Earlier Insight</h3><p>Detect subtle risk signals while there is still time to make a meaningful difference.</p></article>
          <article><img src="/images/holylens/guide-smile-again-realistic.png" alt="Smile Again" /><span>03</span><h3>Smile Again</h3><p>Help patients move forward with more confidence and better-informed care.</p></article>
        </div>
      </section>

      <section className="team" id="team">
        <p className="label">Dedicated Team</p>
        <div className="section-title"><h2>Our best doctors.</h2><p>A multidisciplinary team working at the intersection of medicine, devices and AI.</p></div>
        <div className="team-grid">
          {team.map(([name, role], i) => <article key={name}><img className="portrait" src={`/images/holylens/team-diverse-${i + 1}.png`} alt={name} /><h3>{name}</h3><p>{role}</p></article>)}
        </div>
      </section>

      <section className="news" id="news">
        <div className="news-heading">
          <div><p className="label">Latest News</p><h2>A nation grows with<br />the help of healthcare.</h2></div>
          <p>Practical stories about intelligent diagnosis, connected clinical teams and earlier access to care.</p>
        </div>
        <div className="post-grid">
          {posts.map((post, i) => <article className={i === 0 ? "post-featured" : "post-compact"} key={post.title}>
            <div className="post-image"><img src={`/images/holylens/${post.image}`} alt={post.title} /></div>
            <div className="post-content"><small>{post.category}</small><h3>{post.title}</h3><p>{post.text}</p><a href="#contact">Read More →</a></div>
          </article>)}
        </div>
      </section>

      <section className="contact" id="contact">
        <div><p className="label">Get in Touch</p><h2>Let’s talk about a<br />healthier tomorrow.</h2></div>
        <div className="contact-grid">
          <p><b>New York</b><br />175 Varick St, 3rd FL,<br />New York, NY, 10014</p>
          <p><b>Email</b><br /><a href="mailto:info@holylens.com">info@holylens.com</a><br /><a href="mailto:sales@holylens.com">sales@holylens.com</a></p>
          <p><b>Phone</b><br />(+1) 609 943 2573<br />(+86) 177 987 765</p>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand" href="#top"><img className="official-logo" src="/images/holylens/logo-hd.png" alt="HolyLens" /></a>
            <h2>See earlier.<br />Care better.</h2>
            <p>AI medical devices for earlier insight and better care.</p>
          </div>
          <div className="footer-links">
            <div><small>Explore</small><a href="#top">Home</a><a href="#about">About Us</a><a href="/product">Product</a><a href="#solution">Solution</a></div>
            <div><small>Technology</small><a href="#solution">Medical AI Platform</a><a href="#solution">Medical AI Chip</a><a href="#demos">Clinical Solutions</a><a href="#cases">Customer Stories</a></div>
            <div><small>Contact</small><a href="mailto:info@holylens.com">info@holylens.com</a><a href="mailto:sales@holylens.com">sales@holylens.com</a><p>(+1) 609 943 2573<br />(+86) 177 987 765</p></div>
          </div>
        </div>
        <div className="footer-bottom"><span>© HolyLens 2026. All rights reserved.</span><span>Intelligence for human health.</span><a href="#top">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
