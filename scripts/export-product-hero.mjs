import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import ts from 'typescript';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
const root=process.cwd(), target=path.resolve(process.argv[2]||'static-site');
const source='import React from "react";\n'+await fs.readFile('app/product/product-hero.tsx','utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{jsx:ts.JsxEmit.React,module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const temp=path.join(root,'scripts','.product-hero-render.mjs');
await fs.writeFile(temp,compiled);let ProductHero;
try{({default:ProductHero}=await import(pathToFileURL(temp).href));}finally{await fs.unlink(temp);}
for(const lang of ['zh','en','']){
 const file=path.join(target,lang,'product/index.html');
 let html=await fs.readFile(file,'utf8');
 html=html.replace(/<header class="product-hero">[\s\S]*?<\/header>/,'');
 const hero=renderToStaticMarkup(React.createElement(ProductHero,{english:lang!=='zh'}));
 html=html.replace(/<section(?: id="product-list")? class="product-catalog"/,hero+'<section id="product-list" class="product-catalog"');
 if(!html.includes('href="/product-hero.css"'))html=html.replace('</head>','<link rel="stylesheet" href="/product-hero.css"></head>');
 await fs.writeFile(file,html);
}
await fs.copyFile('app/product/product-hero.css',path.join(target,'product-hero.css'));
console.log('Product hero exported: '+target);
