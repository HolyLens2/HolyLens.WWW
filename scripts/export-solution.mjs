import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const root = process.cwd();
const target = path.resolve(process.argv[2] || 'static-site');
const source = (await fs.readFile('app/solution/page.tsx','utf8')).replace('import "./solution.css";', 'import React from "react";');
const compiled = ts.transpileModule(source,{compilerOptions:{jsx:ts.JsxEmit.React,module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const temp = path.join(root,'scripts','.solution-render.mjs');
await fs.writeFile(temp,compiled);
let SolutionContent;
try { ({SolutionContent} = await import(pathToFileURL(temp).href)); } finally { await fs.unlink(temp); }
for (const language of ['zh','en']) {
  const english=language==='en';
  const body=renderToStaticMarkup(React.createElement(SolutionContent,{english}));
  const html=`<!doctype html><html lang="${english?'en':'zh-CN'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>HOLYLENS | ${english?'Solutions':'解决方案'}</title><meta name="description" content="${english?'Explore medical imaging, acoustic intelligence and clinical workflows.':'探索医学影像、声学智能与临床工作流解决方案。'}"><link rel="icon" href="/favicon.png?v=2"><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/solution.css"></head><body>${body}<script src="/mobile-nav.js"></script></body></html>`;
  await fs.mkdir(path.join(target,language,'solution'),{recursive:true});
  await fs.writeFile(path.join(target,language,'solution/index.html'),html);
}
await fs.mkdir(path.join(target,'solution'),{recursive:true});
await fs.writeFile(path.join(target,'solution/index.html'),'<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=/zh/solution/"><title>HOLYLENS | 下载</title><body><a href="/zh/solution/">解决方案</a></body></html>');
await fs.copyFile('app/solution/solution.css',path.join(target,'solution.css'));
