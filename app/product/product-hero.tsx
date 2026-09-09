export default function ProductHero({ english = true }: { english?: boolean }) {
  const text = (zh: string, en: string) => english ? en : zh;
  return <header className="product-hero">
    <div className="product-hero-copy"><p className="product-hero-kicker">HOLYLENS AI · PRODUCTS</p><h1>{text("智能设备，", "Intelligent devices.")}<br /><em>{text("连接每一份健康", "Connected care.")}</em></h1><p>{text("从专业医疗到家庭健康，让影像、声学与 AI 协同工作。", "From clinical settings to everyday health, connect imaging, acoustic sensing and AI.")}</p><a href="#product-list">{text("探索产品系列", "Explore the collection")} <span aria-hidden="true">↓</span></a></div>
    <div className="product-concept" role="img" aria-label={text("医学影像、声学采集与家庭健康设备连接 AI 平台的概念图", "Concept diagram of imaging, acoustic and home health devices connected to AI")}>
      <svg viewBox="0 0 480 300" fill="none" aria-hidden="true">
        <circle cx="240" cy="150" r="125" stroke="white" strokeOpacity=".15" /><circle cx="240" cy="150" r="90" stroke="#8fcfff" strokeOpacity=".2" strokeDasharray="3 7" />
        <path d="M151 92L210 126M150 213L211 174M300 150H363" stroke="#75d4ff" strokeWidth="1.5" strokeDasharray="5 5" />
        <circle cx="240" cy="150" r="54" fill="#0b3970" stroke="#74d5ff" strokeWidth="1.5" /><circle cx="240" cy="150" r="42" stroke="#74d5ff" strokeOpacity=".2" />
        <text x="240" y="160" textAnchor="middle" fill="white" fontSize="29" fontWeight="600" fontFamily="system-ui">AI</text>
        <rect x="66" y="41" width="99" height="81" rx="14" fill="#114578" stroke="#72c8f5" strokeOpacity=".6" /><rect x="86" y="57" width="59" height="40" rx="5" stroke="#a3e4ff" strokeWidth="2" /><path d="M111 99V109M99 109H132M96 80L104 73L112 86L123 67L134 80" stroke="#79d8ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="66" y="179" width="99" height="81" rx="14" fill="#114578" stroke="#72c8f5" strokeOpacity=".6" /><path d="M84 220H96L102 207L110 238L120 200L129 222H149" stroke="#90e0ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="345" y="107" width="83" height="88" rx="15" fill="#114578" stroke="#72c8f5" strokeOpacity=".6" /><path d="M364 148L386 128L409 148M369 145V173H404V145M380 173V158H392V173" stroke="#a3e4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="262" cy="27" r="5" fill="#59c7ff" /><circle cx="316" cy="249" r="4" fill="#91eeed" /><circle cx="117" cy="149" r="3" fill="#59c7ff" />
      </svg><div className="product-concept-labels"><span>{text("多模态采集", "MULTIMODAL SENSING")}</span><span>{text("智能协同", "CONNECTED AI")}</span><span>{text("健康管理", "HEALTH INSIGHTS")}</span></div>
    </div>
  </header>;
}
