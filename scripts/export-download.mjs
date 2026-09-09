import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const root = process.cwd();
const target = path.resolve(process.argv[2] || 'static-site');
const source = (await fs.readFile('app/download/page.tsx','utf8')).replace('import "./download.css";', 'import React from "react";');
const compiled = ts.transpileModule(source,{compilerOptions:{jsx:ts.JsxEmit.React,module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const temp = path.join(root,'scripts','.download-render.mjs');
await fs.writeFile(temp,compiled);
let DownloadContent;
try { ({DownloadContent} = await import(pathToFileURL(temp).href)); } finally { await fs.unlink(temp); }
for (const language of ['zh','en']) {
  const english=language==='en';
  const body=renderToStaticMarkup(React.createElement(DownloadContent,{english}));
  const html=`<!doctype html><html lang="${english?'en':'zh-CN'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>HOLYLENS | ${english?'Downloads & plugin installation':'下载与插件安装'}</title><meta name="description" content="${english?'Download the HolyLens PCG plugin for Codex on Windows and macOS.':'下载 HolyLens 心音分析插件，在 Windows 与 macOS 的 Codex 中使用。'}"><link rel="icon" href="/favicon.png?v=2"><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/download.css"></head><body>${body}<script src="/mobile-nav.js"></script></body></html>`;
  await fs.mkdir(path.join(target,language,'download'),{recursive:true});
  await fs.writeFile(path.join(target,language,'download/index.html'),html);
}
await fs.mkdir(path.join(target,'download'),{recursive:true});
await fs.writeFile(path.join(target,'download/index.html'),'<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=/zh/download/"><title>HOLYLENS | 下载</title><body><a href="/zh/download/">下载与插件安装</a></body></html>');
await fs.copyFile('app/download/download.css',path.join(target,'download.css'));
await fs.copyFile('public/download.js',path.join(target,'download.js'));
await fs.mkdir(path.join(target,'downloads'),{recursive:true});
for (const name of ['holylens-pcg-0.2.0-remote.zip','holylens-pcg-icon.png']) await fs.copyFile(path.join(root,'public/downloads',name),path.join(target,'downloads',name));
console.log(`Download pages exported to ${target}`);
