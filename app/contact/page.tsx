import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact HolyLens | Project Enquiry",
  description: "Tell HolyLens about your clinical, product or partnership requirements.",
};

function Logo() {
  return <img className="official-logo" src="/images/holylens/logo-hd.png" alt="HOLYLENS" />;
}

export default function ContactPage() {
  return (
    <main className="contact-page" id="top">
      <div className="topbar" />
      <header className="nav">
        <a className="brand" href="/"><Logo /></a>
        <nav aria-label="Main navigation">
          <a href="/">Home</a><a href="/product">Product</a><a href="/lab">Lab</a>
          <a href="/#solution">Solution</a><a className="active" href="/contact">Contact</a>
        </nav>
        <a className="mobile-contact" href="/contact">Contact</a>
      </header>

      <section className="enquiry-hero">
        <div>
          <p className="label">PROJECT ENQUIRY</p>
          <h1>Tell us what<br />you need.</h1>
        </div>
        <p>Whether you are evaluating a medical device, planning a clinical workflow or exploring a technology partnership, share the essentials and our team will follow up.</p>
      </section>

      <section className="enquiry-layout">
        <aside className="enquiry-aside">
          <p className="label">HOW WE CAN HELP</p>
          <h2>Start with your<br />real-world need.</h2>
          <p>Provide as much context as you can. It helps us connect you with the right product, clinical or technical specialist.</p>
          <dl>
            <div><dt>01</dt><dd><b>Describe the setting</b><span>Hospital, clinic, research team, distributor or home-health project.</span></dd></div>
            <div><dt>02</dt><dd><b>Clarify the objective</b><span>Product evaluation, integration, procurement, research or partnership.</span></dd></div>
            <div><dt>03</dt><dd><b>Receive a response</b><span>Our team will review your request and contact you by email.</span></dd></div>
          </dl>
          <div className="enquiry-direct"><small>DIRECT CONTACT</small><a href="mailto:sales@holylens.com">sales@holylens.com ↗</a></div>
        </aside>

        <form className="enquiry-form" action="mailto:sales@holylens.com" method="post" encType="text/plain">
          <div className="form-heading"><span>REQUIREMENT FORM</span><small>* Required fields</small></div>
          <div className="field-grid">
            <label><span>Name *</span><input name="Name" type="text" autoComplete="name" required placeholder="Your name" /></label>
            <label><span>Organization *</span><input name="Organization" type="text" autoComplete="organization" required placeholder="Hospital, company or institution" /></label>
            <label><span>Work email *</span><input name="Email" type="email" autoComplete="email" required placeholder="name@organization.com" /></label>
            <label><span>Phone</span><input name="Phone" type="tel" autoComplete="tel" placeholder="Country code and number" /></label>
            <label><span>Country / Region *</span><input name="Region" type="text" autoComplete="country-name" required placeholder="Country or region" /></label>
            <label><span>Area of interest *</span><select name="Interest" required defaultValue=""><option value="" disabled>Select an area</option><option>Medical devices</option><option>Clinical AI platform</option><option>Medical AI chip</option><option>Research collaboration</option><option>Distribution partnership</option><option>Other</option></select></label>
            <label><span>Project stage *</span><select name="Stage" required defaultValue=""><option value="" disabled>Select a stage</option><option>Early exploration</option><option>Technical evaluation</option><option>Clinical validation</option><option>Procurement planning</option><option>Deployment and integration</option></select></label>
            <label><span>Expected timeline</span><select name="Timeline" defaultValue=""><option value="">Not decided</option><option>Within 3 months</option><option>3–6 months</option><option>6–12 months</option><option>More than 12 months</option></select></label>
          </div>
          <label className="field-wide"><span>Requirement details *</span><textarea name="Requirements" rows={7} required placeholder="Please describe the clinical setting, intended users, desired functions, quantity or integration requirements." /></label>
          <label className="consent"><input type="checkbox" required /><span>I agree that HolyLens may use this information to respond to my enquiry. *</span></label>
          <div className="form-submit"><p>Submitting opens your email application with the completed enquiry. You can review it before sending.</p><button type="submit">Submit enquiry <b>↗</b></button></div>
        </form>
      </section>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand"><a className="brand" href="#top"><Logo /></a><h2>See earlier.<br />Care better.</h2><p>AI medical devices for earlier insight and better care.</p></div>
          <div className="footer-links">
            <div><small>Explore</small><a href="/">Home</a><a href="/product">Product</a><a href="/lab">Lab</a><a href="/#solution">Solution</a></div>
            <div><small>Technology</small><a href="/#solution">Medical AI Platform</a><a href="/#solution">Medical AI Chip</a><a href="/#demos">Clinical Solutions</a></div>
            <div><small>Contact</small><a href="mailto:info@holylens.com">info@holylens.com</a><a href="mailto:sales@holylens.com">sales@holylens.com</a></div>
          </div>
        </div>
        <div className="footer-bottom"><span>HolyLens (Shanghai) Medical Devices Co., Ltd.</span><span>Address: 4F, Liuhe Building, No. 59 North Yunnan Road, Huangpu District, Shanghai</span><a href="#top">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
