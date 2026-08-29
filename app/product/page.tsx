const products = [
  ["MiniScope 1.0", "Portable AI Screening", "Compact intelligent imaging for fast, consistent screening at the point of care.", "product-miniscope-1-solid-wide.png"],
  ["MiniScope PRO", "Professional Imaging", "Enhanced optics and AI analysis for demanding, high-volume clinical environments.", "product-miniscope-pro-solid-wide.png"],
  ["StarScope 1.0", "Advanced Medical Imaging", "High-quality acquisition and intelligent risk detection for deeper assessment.", "product-starscope-1-solid-wide.png"],
  ["TurgoScope 1.0", "Acoustic Intelligence", "Advanced acoustic sensing and machine intelligence for non-invasive insight.", "product-turgoscope-1-solid-wide.png"],
  ["MiniVision 1.0", "Clinical AI Platform", "A unified workspace for examinations, AI findings and structured reports.", "product-minivision-1-solid-wide.png"],
];

const homeProducts = [
  ["HearScope 1.0", "AI Home Auscultation", "AI-guided heart and lung sound capture for convenient everyday family screening.", "product-effect-1.jpg"],
  ["PressScope 1.0", "Smart Blood Pressure", "Comfortable home blood-pressure and pulse monitoring with clear trend tracking.", "product-effect-2.jpg"],
  ["GlucoScope 1.0", "Smart Glucose Monitoring", "Fast everyday glucose checks with simple records that support long-term health management.", "product-effect-3.jpg"],
  ["CardioScope 1.0", "Personal ECG Monitoring", "Multi-lead ECG capture at home for reliable rhythm records and easier remote review.", "product-effect-4.jpg"],
  ["OxyScope 1.0", "Blood Oxygen Monitoring", "Compact fingertip oxygen-saturation and pulse monitoring for daily wellness checks.", "product-effect-5.jpg"],
];

function Logo() {
  return <img className="official-logo" src="/images/holylens/logo-hd.png" alt="HolyLens" />;
}

export default function ProductPage() {
  return (
    <main className="product-page" id="top">
      <div className="topbar" />
      <header className="nav">
        <a className="brand" href="/"><Logo /></a>
        <nav aria-label="Main navigation">
          <a href="/">Home</a><a href="/#about">About Us</a><a className="active" href="/product">Product</a>
          <a href="/#solution">Solution</a><a href="/#contact">Contact</a>
        </nav>
        <a className="mobile-contact" href="/#contact">Contact</a>
      </header>

      <section className="product-catalog" aria-label="HolyLens product portfolio">
        <div className="catalog-heading"><p>CLINICAL &amp; INSTITUTIONAL</p><h1>Products for hospitals and healthcare organizations</h1><span>Professional devices and AI workspaces designed for clinical teams, high-quality acquisition and dependable medical workflows.</span></div>
        {products.map(([name, type, text, visual], index) => (
          <article className="catalog-row" key={name}>
            <div className="catalog-number">0{index + 1}<i /></div>
            <div className="catalog-image"><img src={`/images/holylens/${visual}`} alt={name} /></div>
            <div className="catalog-info"><p>{type}</p><h2>{name}</h2><p className="description">{text}</p>
              <ul><li>AI-assisted</li><li>Clinical workflow</li><li>Secure data</li></ul>
              <a href={index === 0 ? "/product/miniscope-1" : "mailto:sales@holylens.com"}>View product information ↗</a>
            </div>
          </article>
        ))}

        <div className="catalog-heading home"><p>PERSONAL &amp; FAMILY HEALTH</p><h1>Products for individuals and families</h1><span>Approachable connected devices that bring everyday health monitoring and clearer personal insights into the home.</span></div>
        {homeProducts.map(([name, type, text, visual], index) => (
          <article className="catalog-row" key={name}>
            <div className="catalog-number">0{index + 1}<i /></div>
            <div className="catalog-image"><img src={`/images/holylens/${visual}`} alt={name} /></div>
            <div className="catalog-info"><p>{type}</p><h2>{name}</h2><p className="description">{text}</p>
              <ul><li>Home monitoring</li><li>Family health</li><li>Secure data</li></ul>
              <a href="mailto:sales@holylens.com">View product information ↗</a>
            </div>
          </article>
        ))}
      </section>

      <section className="product-platform">
        <div><p className="label">ONE HOLYLENS PLATFORM</p><h2>Devices that work<br />better together.</h2></div>
        <div className="platform-flow"><span>CAPTURE</span><b>→</b><span>ANALYZE</span><b>→</b><span>REPORT</span><b>→</b><span>CARE</span></div>
        <p>Standardized acquisition, intelligent analysis and structured reporting create a consistent path from examination to clinical action.</p>
      </section>

      <section className="contact product-contact">
        <div><p className="label">Product Enquiries</p><h2>Find the right device<br />for your workflow.</h2></div>
        <div className="contact-grid"><p><b>Email</b><br /><a href="mailto:sales@holylens.com">sales@holylens.com</a></p><p><b>Phone</b><br />+86 177 2101 8082</p></div>
      </section>

      <footer><a className="brand" href="/"><Logo /></a><p>AI medical devices for earlier insight and better care.</p><span>© HolyLens 2026</span><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
