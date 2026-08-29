const features = [
  ["Portable imaging", "A compact handheld system designed for bedside, outpatient and mobile clinical use."],
  ["AI-assisted guidance", "Real-time acquisition guidance helps clinicians obtain clear, consistent images with less repetition."],
  ["Clear on-device review", "A high-contrast display presents live imaging, measurements and examination status at a glance."],
  ["Connected workflow", "Encrypted examination data can move securely into the HolyLens workspace for review and reporting."],
];

const specifications = [
  ["Imaging modes", "B-mode / M-mode / Color Doppler"],
  ["Display", "5.5-inch medical-grade touch display"],
  ["Probe", "Multi-frequency convex array probe"],
  ["Frequency range", "2–5 MHz"],
  ["Battery", "Up to 4 hours of continuous operation"],
  ["Connectivity", "Wi-Fi 6 / Bluetooth 5.2 / USB-C"],
  ["Data format", "DICOM / JPEG / MP4 / structured report"],
  ["Protection", "IP54 device enclosure"],
  ["Weight", "Approximately 680 g, excluding probe"],
  ["Security", "Encrypted storage and role-based access"],
  ["Operating environment", "10–35 °C / 15–80% RH"],
  ["Intended users", "Trained healthcare professionals"],
];

function Logo() {
  return <img className="official-logo" src="/images/holylens/logo-hd.png" alt="HolyLens" />;
}

export default function MiniScopeDetailPage() {
  return (
    <main className="product-page product-detail-page" id="top">
      <div className="topbar" />
      <header className="nav">
        <a className="brand" href="/"><Logo /></a>
        <nav aria-label="Main navigation">
          <a href="/">Home</a><a href="/#about">About Us</a><a className="active" href="/product">Product</a>
          <a href="/#solution">Solution</a><a href="/#contact">Contact</a>
        </nav>
        <a className="mobile-contact" href="/#contact">Contact</a>
      </header>

      <section className="detail-hero">
        <div className="detail-hero-copy">
          <a className="detail-back" href="/product">← All products</a>
          <p className="detail-kicker">PORTABLE AI ULTRASOUND</p>
          <h1>MiniScope 1.0</h1>
          <p className="detail-lead">Portable intelligent ultrasound for fast, consistent imaging at the point of care.</p>
          <div className="detail-tags"><span>AI-assisted</span><span>Portable</span><span>Connected</span></div>
          <a className="detail-primary" href="mailto:sales@holylens.com?subject=MiniScope%201.0%20enquiry">Request product information <b>↗</b></a>
        </div>
        <div className="detail-hero-image"><img src="/images/holylens/product-miniscope-1-solid-wide.png" alt="MiniScope 1.0 portable ultrasound system" /></div>
      </section>

      <section className="detail-intro">
        <p className="detail-section-label">PRODUCT OVERVIEW</p>
        <div><h2>Clear imaging,<br />where care happens.</h2><p>MiniScope 1.0 brings ultrasound acquisition, AI guidance and clinical review into one lightweight device. Its simplified controls support efficient examinations while preserving the image quality and dependable data handling clinical teams expect.</p></div>
      </section>

      <section className="detail-features">
        <div className="detail-feature-image"><img src="/images/holylens/about-device-detail-realistic.png" alt="Clinician using the MiniScope 1.0 probe and connected workspace" /></div>
        <div className="detail-feature-copy"><p className="detail-section-label">CORE FUNCTIONS</p><h2>Designed around the examination.</h2>
          <div className="feature-list">{features.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        </div>
      </section>

      <section className="detail-structure">
        <div className="detail-structure-copy"><p className="detail-section-label">DEVICE STRUCTURE</p><h2>Everything needed,<br />held in one hand.</h2><p>A durable handheld console combines live imaging, direct controls and secure local processing. The detachable probe and standard USB-C interface simplify clinical use, cleaning and charging.</p>
          <ol><li><b>Medical display</b><span>Live image, measurement and status review</span></li><li><b>Direct control pad</b><span>Fast adjustment with gloved hands</span></li><li><b>AI processing module</b><span>On-device image optimization and guidance</span></li><li><b>Detachable probe</b><span>Multi-frequency convex array transducer</span></li></ol>
        </div>
        <div className="detail-structure-image"><img src="/images/holylens/hero-portable-ultrasound-transparent-v4.png" alt="MiniScope 1.0 handheld console and ultrasound probe" /></div>
      </section>

      <section className="detail-workflow">
        <p className="detail-section-label">CLINICAL WORKFLOW</p><h2>From scan to report,<br />without unnecessary steps.</h2>
        <div className="workflow-steps"><article><span>01</span><h3>Prepare</h3><p>Select the examination preset and connect the appropriate probe.</p></article><article><span>02</span><h3>Acquire</h3><p>Use live AI guidance to support positioning and image consistency.</p></article><article><span>03</span><h3>Review</h3><p>Confirm images and measurements directly on the device.</p></article><article><span>04</span><h3>Share</h3><p>Send encrypted data to the HolyLens workspace for reporting and follow-up.</p></article></div>
      </section>

      <section className="detail-specs" id="specifications">
        <div><p className="detail-section-label">SPECIFICATIONS</p><h2>MiniScope 1.0<br />technical profile.</h2><p>Specifications shown are the proposed product configuration and may vary by region or final regulatory authorization.</p></div>
        <dl>{specifications.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>
      </section>

      <section className="detail-use-cases">
        <div><p className="detail-section-label">INTENDED SETTINGS</p><h2>Built for flexible clinical use.</h2></div>
        <div className="use-case-grid"><article><h3>Primary care</h3><p>Accessible imaging support for routine assessment and earlier referral decisions.</p></article><article><h3>Bedside assessment</h3><p>Portable scanning for wards, emergency care and patients with limited mobility.</p></article><article><h3>Mobile services</h3><p>Compact equipment for outreach clinics and care delivered closer to communities.</p></article></div>
      </section>

      <section className="detail-cta"><div><p className="detail-section-label">PRODUCT ENQUIRIES</p><h2>Bring MiniScope 1.0<br />into your workflow.</h2></div><div><p>Talk with the HolyLens team about product configuration, availability and clinical integration.</p><a href="mailto:sales@holylens.com?subject=MiniScope%201.0%20enquiry">sales@holylens.com ↗</a><span>+86 177 2101 8082</span></div></section>

      <footer className="site-footer">
        <div className="footer-main"><div className="footer-brand"><a className="brand" href="#top"><Logo /></a><h2>See earlier.<br />Care better.</h2><p>AI medical devices for earlier insight and better care.</p></div><div className="footer-links"><div><small>Explore</small><a href="/">Home</a><a href="/#about">About Us</a><a href="/product">Product</a><a href="/#solution">Solution</a></div><div><small>Technology</small><a href="/#solution">Medical AI Platform</a><a href="/#solution">Medical AI Chip</a><a href="/#demos">Clinical Solutions</a></div><div><small>Contact</small><a href="mailto:info@holylens.com">info@holylens.com</a><a href="mailto:sales@holylens.com">sales@holylens.com</a><p>+86 177 2101 8082</p></div></div></div>
        <div className="footer-bottom"><span>HolyLens (Shanghai) Medical Devices Co., Ltd.</span><span>Address: 4F, Liuhe Building, No. 59 North Yunnan Road, Huangpu District, Shanghai<br />Postal Code: 200001</span><a href="#top">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
