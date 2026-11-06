(function(root){
'use strict';
function csv(text){
 const rows=[];let row=[],cell='',quoted=false;
 for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){cell+='"';i++;}else quoted=!quoted;}
 else if(!quoted&&(c===','||c==='\n'||c==='\r')){row.push(cell);cell='';if(c!==','){if(c==='\r'&&text[i+1]==='\n')i++;if(row.some(v=>v!==''))rows.push(row);row=[];}}
 else cell+=c;}
 if(quoted)throw Error('Unclosed CSV quotation');if(cell||row.length){row.push(cell);rows.push(row);}if(rows.length<2)throw Error('No data rows');
 const headers=rows.shift().map(v=>v.replace(/^\uFEFF/,'').trim());if(new Set(headers).size!==headers.length)throw Error('Duplicate CSV columns');
 if(!['event','stance','shot'].every(k=>headers.includes(k)))throw Error('Choose a MotionQA qa.csv file');
 if(rows.length>10000)throw Error('Maximum 10,000 QA rows');return rows.map(r=>{if(r.length!==headers.length)throw Error('CSV column count differs');return Object.fromEntries(headers.map((h,i)=>[h,r[i]]));});
}
function summarize(rows){let fail=0,warn=0;for(const r of rows){const v=['hands','clothes','direction','spine','connect'].map(k=>r[k]);if(v.includes('fail'))fail++;else if(v.includes('warn'))warn++;}return {rows:rows.length,fail,warn};}
function compare(before,after){const key=r=>JSON.stringify([r.event,r.stance,r.shot]);const b=new Map(before.map(r=>[key(r),r]));return after.map(r=>{const prev=b.get(key(r));const x=Number(prev?.exit_snap_deg),y=Number(r.exit_snap_deg);return {...r,before_exit:prev?.exit_snap_deg??'—',delta:prev&&prev.exit_snap_deg!==''&&r.exit_snap_deg!==''&&Number.isFinite(x)&&Number.isFinite(y)?+(y-x).toFixed(2):null};});}
function read(obj,path){return path.reduce((o,k)=>o?.[k],obj);}
function apply(obj,changes){const copy=JSON.parse(JSON.stringify(obj));for(const c of changes){if(c.path.some(k=>['__proto__','constructor','prototype'].includes(String(k))))throw Error('Invalid path');if(JSON.stringify(read(copy,c.path))!==JSON.stringify(c.before))throw Error('Source changed: '+c.path.join('.'));let p=copy;for(const k of c.path.slice(0,-1))p=p[k];p[c.path.at(-1)]=c.after;}return copy;}
const api={csv,summarize,compare,read,apply};if(typeof module!=='undefined')module.exports=api;root.FormaGameCore=api;
})(typeof window!=='undefined'?window:globalThis);
