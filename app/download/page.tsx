import type { Metadata } from "next";
import "./download.css";

export const metadata: Metadata = { title: "HOLYLENS | 下载与插件安装", description: "下载 HolyLens 心音分析插件，在 Windows 或 macOS 的 Codex 中使用。" };

export function DownloadContent({ english = false }: { english?: boolean }) {
  const root = english ? "/en" : "/zh";
  const text = (zh: string, en: string) => english ? en : zh;
  const prompt = text("请安装我提供的 holylens-pcg-0.2.0-remote.zip：解压插件，注册到我的个人插件市场并安装。", "Install the holylens-pcg-0.2.0-remote.zip file I provided: extract it, register it in my personal plugin marketplace, and install it.");
  return <main className="download-page" id="top">
    <div className="topbar" />
    <header className="nav"><a className="brand" href={`${root}/`}><img className="official-logo" src="/images/holylens/logo-hd.png" alt="HOLYLENS" /></a><nav aria-label={text("主导航", "Main navigation")}><a href={`${root}/`}>{text("首页", "Home")}</a><a href={`${root}/product/`}>{text("产品", "Product")}</a><a href={`${root}/lab/`}>{text("实验室", "Lab")}</a><a className="active" aria-current="page" href={`${root}/download/`}>{text("下载", "Download")}</a><a href={`${root}/#solution`}>{text("解决方案", "Solution")}</a><a href={`${root}/contact/`}>{text("联系", "Contact")}</a></nav><a className="download-language" href={english ? "/zh/download/" : "/en/download/"} lang={english ? "zh-CN" : "en"}>{english ? "中文" : "EN"} ↗</a></header>
    <div className="download-wrap">
      <header className="download-heading"><p className="label">HOLYLENS DOWNLOADS</p><h1>{text("下载与插件安装", "Downloads & plugins")}</h1><p>{text("将 HolyLens 心音分析，带入你的 Codex 工作流程。", "Bring HolyLens heart sound analysis into your Codex workflow.")}</p></header>
      <section className="plugin-release" aria-labelledby="plugin-name">
        <div className="plugin-overview"><div className="plugin-identity"><img src="/downloads/holylens-pcg-icon.png" width="88" height="88" alt="" /><div><span className="plugin-type">CODEX PLUGIN</span><h2 id="plugin-name">HolyLens PCG</h2><p>{text("心音分析插件", "Heart sound analysis")}</p></div></div><p className="plugin-description">{text("上传一段心音录音，在对话中获取录音质量、心率与心音特征等分析结果，并以中文或英文解读。", "Upload a heart sound recording and review recording quality, heart rate and acoustic findings in conversation, in Chinese or English.")}</p><div className="plugin-platforms"><span>Windows</span><span>macOS</span><span>{text("需要 Codex", "Requires Codex")}</span></div></div>
        <div className="plugin-download"><p className="plugin-version">{text("当前版本", "Current version")} <strong>0.2.0</strong></p><a className="button" href="/downloads/holylens-pcg-0.2.0-remote.zip" download>{text("下载插件", "Download plugin")} <span aria-hidden="true">↓</span></a><p>{text("同一份 ZIP，适用于 Windows 与 macOS。", "One ZIP package for Windows and macOS.")}</p><a className="download-guide-link" href="#install">{text("查看安装步骤", "Installation steps")} ↓</a></div>
      </section>
      <section id="install" className="plugin-install" aria-labelledby="install-title"><div className="install-title"><p className="label">GET STARTED</p><h2 id="install-title">{text("三个步骤，开始使用", "Get started in three steps")}</h2><p>{text("当前提供插件包安装；官方一键安装入口尚未上线。", "Package installation is available now. An official one-click installation link is not yet available.")}</p></div>
        <ol className="install-steps"><li><span className="step-number">01</span><h3>{text("下载插件包", "Download the package")}</h3><p>{text("点击上方“下载插件”，将 ZIP 保存到电脑。", "Save the ZIP package to your computer using the download button above.")}</p></li><li><span className="step-number">02</span><h3>{text("交给 Codex 安装", "Install with Codex")}</h3><p>{text("在 Codex 中提供下载的文件或其完整路径，再发送下方安装指令。", "Provide the downloaded file or its full path in Codex, then send the installation prompt below.")}</p></li><li><span className="step-number">03</span><h3>{text("新建任务，分析心音", "Start a new task")}</h3><p>{text("安装完成后，新建任务说“使用 HolyLens PCG 分析心音”。按提示打开上传链接，上传后返回说“已上传”。", "Ask “Use HolyLens PCG to analyze heart sounds.” Open the upload link, select a recording, then return and confirm the upload.")}</p></li></ol>
        <div className="install-prompt"><div><h3>{text("安装指令", "Installation prompt")}</h3><button type="button" data-copy-install data-copy-done={text("已复制", "Copied")} data-copy-error={text("请选中下方文字复制", "Select the text below to copy")}>{text("复制指令", "Copy prompt")}</button></div><p id="install-prompt-text">{prompt}</p><span className="copy-status" role="status" aria-live="polite" /></div>
      </section>
      <section className="download-details"><div><h2>{text("支持哪些录音？", "Supported recordings")}</h2><p>{text("WAV、MP3、RAW 和 PCM，单个文件最大 25 MB。RAW / PCM 需提供采样率，并使用单声道、有符号 16 位小端格式。", "WAV, MP3, RAW and PCM, up to 25 MB per file. RAW / PCM requires a known sample rate and mono signed 16-bit little-endian audio.")}</p></div><div><h2>{text("需要部署服务吗？", "Do I need a local server?")}</h2><p>{text("不需要。插件连接 HolyLens 线上服务，不需要安装 Node.js。上传链接 15 分钟内有效，未分析录音仅在服务内存中临时保存。", "No. The plugin connects to the HolyLens online service without Node.js. Upload links last 15 minutes; pending recordings are held temporarily in server memory.")}</p></div></section>
      <p className="download-research">{text("使用说明：当前分析结果用于研发参考，不构成临床诊断。", "Research use: analysis results are not a clinical diagnosis.")}</p>
    </div><footer className="download-footer"><a href={`${root}/`}>HOLYLENS</a><span>{text("让洞察，更早一步。", "Earlier insight. Better care.")}</span><a href={`${root}/contact/`}>{text("联系支持", "Contact support")} ↗</a></footer>
    <script src="/download.js" />
  </main>;
}
export default function DownloadPage() { return <DownloadContent />; }
