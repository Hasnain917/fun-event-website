(()=>{
'use strict';
const KEY='fe-content-overrides-v1';
const path=(()=>{const clean=location.pathname||'/';return clean==='/'?'/':clean.replace(/\/+$/,'')+'/'})();
let edits=[];
try{edits=JSON.parse(localStorage.getItem(KEY)||'[]')}catch{edits=[]}
edits.filter(item=>{
 const itemPath=(item.page||'/')==='/'?'/':String(item.page).split(/[?#]/)[0].replace(/\/+$/,'')+'/';
 return itemPath===path;
}).forEach(item=>{
 let el;try{el=document.querySelector(item.selector)}catch{return}
 if(!el)return;
 if(item.html!==null&&item.html!==undefined)el.innerHTML=item.html;
 Object.entries(item.attrs||{}).forEach(([name,value])=>{if(value)el.setAttribute(name,value);else el.removeAttribute(name)});
 Object.entries(item.style||{}).forEach(([name,value])=>{el.style[name]=value});
});
})();