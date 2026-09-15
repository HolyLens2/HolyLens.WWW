import type { Metadata } from "next";
import "./solution.css";
export const metadata: Metadata = { title: "HOLYLENS | 解决方案", description: "探索医学影像、声学智能与临床工作流解决方案。" };
export function SolutionContent({english=false}:{english?:boolean}) {
 const root=english?"/en":"/zh";
 const text=(zh:string,en:string)=>english?en:zh;
 const solutions=[
  ["imaging","医学影像 AI","AI Medical Imaging","将医学影像采集与智能分析相结合，为影像研究与阅片工作提供支持。","Connect medical image acquisition with intelligent analysis to support imaging research and review.","solution-ai-imaging.png","影像采集 · 智能分析 · 结果呈现","Image acquisition · AI analysis · Findings"],
  ["acoustic","声学智能","Acoustic Intelligence","从心音录音到声学特征分析，让声音成为可理解的信息。通过 PCG 插件体验心音分析流程。","Turn heart sound recordings into understandable acoustic findings. Explore the analysis workflow with the PCG plugin.","solution-acoustic-intelligence.png","心音采集 · 质量评估 · 特征解读","Heart sounds · Quality assessment · Acoustic findings"],
  ["clinical","临床工作流","Clinical Workflows","围绕实际使用场景，连接设备、分析与结果查看，探索适合团队的工作流程。","Connect devices, analysis and result review around real-world use cases to explore workflows that fit your team.","solution-clinical-workflow-v2.png","设备连接 · 流程协同 · 结果查看","Device integration · Workflow coordination · Result review"]
 ];
 return <main className="solution-page" id="top">
    <div className="topbar" />
    <header className="nav"><a className="brand" href={`${root}/`}><img className="official-logo" src="/images/holylens/logo-hd.png" alt="HOLYLENS" /></a><nav aria-label={text("主导航", "Main navigation")}><a href={`${root}/`}>{text("首页", "Home")}</a><a href={`${root}/product/`}>{text("设备", "Devices")}</a><a href={`${root}/lab/`}>{text("AI实验室", "AI Lab")}</a><a href={`${root}/download/`}>{text("下载", "Download")}</a><a className="active" aria-current="page" href={`${root}/solution/`}>{text("解决方案", "Solution")}</a><a href={`${root}/contact/`}>{text("联系", "Contact")}</a></nav><a className="mobile-contact" href={`${root}/contact/`}>{text("联系", "Contact")}</a><a className="language-switch" href={english ? "/zh/solution/" : "/en/solution/"} lang={english ? "zh-CN" : "en"}>{english ? "中文" : "EN"}</a></header>

 <section className="solution-hero"><div><p className="solution-kicker">HOLYLENS AI · SOLUTIONS</p><h1>{text("连接技术，","Connect technology.")}<br/><em>{text("走进医疗场景","Bring insight to care.")}</em></h1><p>{text("从医学影像到声学智能，将设备、AI 分析与工作流程连接起来。","Connect devices, AI analysis and workflows, from medical imaging to acoustic intelligence.")}</p><a href="#solutions">{text("探索解决方案","Explore solutions")} ↓</a></div><div className="solution-diagram" role="img" aria-label={text("数据采集经过 AI 分析得到结果，应用于医疗工作流程","Data acquisition flows through AI analysis into findings and care workflows")}><div>{text("医学影像","MEDICAL IMAGING")}<span>＋</span>{text("声学信号","ACOUSTIC SIGNALS")}</div><span aria-hidden="true">↓</span><strong>HOLYLENS AI</strong><span aria-hidden="true">↓</span><div>{text("分析结果","FINDINGS")}<span>→</span>{text("工作流程","WORKFLOWS")}</div></div></section>
 <div className="solution-wrap" id="solutions"><div className="solution-intro"><p className="label">OUR SOLUTIONS</p><h2>{text("面向场景的智能解决方案","Intelligence for real-world workflows")}</h2></div>
 {solutions.map(([id,zh,en,descZh,descEn,img,tagsZh,tagsEn],i)=><section className="solution-row" id={id} key={id}><div className="solution-image"><img src={`/images/holylens/${img}`} alt={text(zh,en)} loading="lazy" width="768" height="512"/></div><div><p className="label">0{i+1} / HOLYLENS AI</p><h2>{text(zh,en)}</h2><p>{text(descZh,descEn)}</p><p className="solution-tags">{text(tagsZh,tagsEn)}</p><a href={`${root}/${id==='acoustic'?'download':id==='imaging'?'lab':'contact'}/`}>{id==='acoustic'?text("体验心音分析","Try heart sound analysis"):id==='imaging'?text("探索实验室","Explore the lab"):text("联系我们","Contact us")} ↗</a></div></section>)}
 <div className="solution-end"><h2>{text("找到适合您的应用方式","Find the right fit for your team")}</h2><a className="button" href={`${root}/contact/`}>{text("联系团队","Contact our team")} ↗</a></div></div>
 <footer className="solution-footer"><a href={`${root}/`}>HOLYLENS</a><span>{text("让洞察，更早一步。","Earlier insight. Better care.")}</span><a href={`${root}/contact/`}>{text("联系","Contact")} ↗</a></footer>
 </main>;
}
export default function SolutionPage(){return <SolutionContent/>;}
