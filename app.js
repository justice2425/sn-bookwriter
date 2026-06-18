(()=>{var Kt=Object.create;var Lt=Object.defineProperty;var Gt=Object.getOwnPropertyDescriptor;var Qt=Object.getOwnPropertyNames;var Yt=Object.getPrototypeOf,Vt=Object.prototype.hasOwnProperty;var Zt=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}};var Xt=(e,t,n,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of Qt(t))!Vt.call(e,a)&&a!==n&&Lt(e,a,{get:()=>t[a],enumerable:!(o=Gt(t,a))||o.enumerable});return e};var te=(e,t,n)=>(n=e!=null?Kt(Yt(e)):{},Xt(t||!e||!e.__esModule?Lt(n,"default",{value:e,enumerable:!0}):n,e));var It=Zt((F,nt)=>{(function(e,t){if(typeof F=="object"&&typeof nt=="object")nt.exports=t();else if(typeof define=="function"&&define.amd)define([],t);else{var n=t();for(var o in n)(typeof F=="object"?F:e)[o]=n[o]}})(self,()=>(()=>{"use strict";var e,t,n={d:(s,i)=>{for(var r in i)n.o(i,r)&&!n.o(s,r)&&Object.defineProperty(s,r,{enumerable:!0,get:i[r]})},o:(s,i)=>Object.prototype.hasOwnProperty.call(s,i)},o={};n.d(o,{default:()=>a}),(function(s){s.StreamContextItem="stream-context-item",s.SaveItems="save-items",s.ComponentRegistered="component-registered",s.ActivateThemes="themes",s.ThemesActivated="themes-activated",s.SetComponentData="set-component-data"})(e||(e={})),(function(s){s.Component="component"})(t||(t={}));let a=new class{constructor(){this.component={activeThemes:[],acceptsThemes:!0},this.sentMessages=[],this.messageQueue=[],this.subscriptions=[],this.generateNotePreview=!0}initialize(s={}){if(this.contentWindow)throw"Cannot initialize mediator more than once";this.contentWindow=window,this.coallesedSavingDelay=s.debounceSave!==void 0?s.debounceSave:250,this.registerMessageHandler(),this.postMessage(e.StreamContextItem,{},i=>{let{item:r}=i;(!this.lastStreamedItem||this.lastStreamedItem.uuid!==r.uuid)&&this.pendingSaveTimeout&&(clearTimeout(this.pendingSaveTimeout),this.performSavingOfItems(this.pendingSaveParams),this.pendingSaveTimeout=void 0,this.pendingSaveParams=void 0),this.lastStreamedItem=r,this.lastStreamedItem.isMetadataUpdate||this.subscriptions.forEach(c=>{c(this.text,this.meta)})})}subscribe(s){return this.subscriptions.push(s),this.lastStreamedItem&&setTimeout(()=>{s(this.text,this.meta)}),()=>{let i=this.subscriptions.indexOf(s);i>=0&&this.subscriptions.splice(i,1)}}get text(){var s,i;return this.checkNoteExists(),((i=(s=this.lastStreamedItem)===null||s===void 0?void 0:s.content)===null||i===void 0?void 0:i.text)||""}get meta(){var s;return this.checkNoteExists(),!((s=this.lastStreamedItem)===null||s===void 0)&&s.content?this.lastStreamedItem.content.appData[this.lastStreamedItem.content.editorIdentifier]:{}}get extensionMeta(){return this.component.data}get locked(){var s,i;return this.checkNoteExists(),(i=(s=this.lastStreamedItem)===null||s===void 0?void 0:s.content)===null||i===void 0?void 0:i.appData["org.standardnotes.sn"].locked}get preview(){var s,i;return this.checkNoteExists(),(i=(s=this.lastStreamedItem)===null||s===void 0?void 0:s.content)===null||i===void 0?void 0:i.preview_plain}set text(s){this.checkNoteExists(),this.lastStreamedItem.content.text=s,this.saveNote(this.lastStreamedItem)}set preview(s){this.checkNoteExists(),this.generateNotePreview=!1,this.lastStreamedItem.content.preview_plain=s}set meta(s){this.checkNoteExists(),this.lastStreamedItem.content.appData[this.lastStreamedItem.content.editorIdentifier]=s,this.saveNote(this.lastStreamedItem)}set extensionMeta(s){this.component.data=s,this.postMessage(e.SetComponentData,{componentData:s})}registerMessageHandler(){this.messageHandler=s=>{let{data:i}=s,r=(c=>{if(typeof c!="string")return!1;try{let d=JSON.parse(c),p=Object.prototype.toString.call(d);return p==="[object Object]"||p==="[object Array]"}catch{return!1}})(i)?JSON.parse(i):i;r&&this.handleMessage(r)},this.contentWindow.document.addEventListener("message",this.messageHandler,!1),this.contentWindow.addEventListener("message",this.messageHandler,!1)}handleMessage(s){var i,r;switch(s.action){case e.ComponentRegistered:this.component.sessionKey=s.sessionKey,s.componentData&&(this.component.data=s.componentData),this.onReady(s.data);break;case e.ActivateThemes:this.activateThemes(s.data.themes);break;default:{if(!s.original)return;let c=(i=this.sentMessages)===null||i===void 0?void 0:i.filter(d=>{var p;return d.messageId===((p=s.original)===null||p===void 0?void 0:p.messageId)})[0];if(!c)return;(r=c?.callback)===null||r===void 0||r.call(c,s.data);break}}}onReady(s){this.component.environment=s.environment,this.component.platform=s.platform,this.component.uuid=s.uuid;for(let i of this.messageQueue)this.postMessage(i.action,i.data,i.callback);this.messageQueue=[],this.activateThemes(s.activeThemeUrls||[]),this.postMessage(e.ThemesActivated,{})}get isRunningInDesktopApplication(){return this.component.environment==="desktop"}get isRunningInMobileApplication(){return this.component.environment==="mobile"}get isRunningInBrowser(){return this.component.environment==="web"}postMessage(s,i,r){if(!this.component.sessionKey)return void this.messageQueue.push({action:s,data:i,api:t.Component,callback:r});let c={action:s,data:i,messageId:this.generateUUID(),sessionKey:this.component.sessionKey,api:t.Component},d=JSON.parse(JSON.stringify(c)),p;d.callback=r,this.sentMessages.push(d),p=this.isRunningInMobileApplication?JSON.stringify(c):c,this.contentWindow.parent.postMessage(p,"*")}activateThemes(s=[]){if(!this.component.acceptsThemes)return;let{activeThemes:i}=this.component;if(i&&i.sort().toString()==s.sort().toString())return;let r=s,c=[];for(let d of i)s.includes(d)?r=r.filter(p=>p!==d):c.push(d);for(let d of c)this.deactivateTheme(d);this.component.activeThemes=s;for(let d of r){if(!d)continue;let p=d.endsWith("/org.standardnotes.theme-focus/index.css")?"https://app.standardnotes.com/components/assets/org.standardnotes.theme-focus/index.css":d,g=this.contentWindow.document.createElement("link");g.id=btoa(d),g.href=p,g.type="text/css",g.rel="stylesheet",g.media="screen,print",g.className="custom-theme",this.contentWindow.document.getElementsByTagName("head")[0].appendChild(g)}this.onThemesChangeCallback&&this.onThemesChangeCallback()}themeElementForUrl(s){return Array.from(this.contentWindow.document.getElementsByClassName("custom-theme")).slice().find(i=>i.id==btoa(s))}deactivateTheme(s){let i=this.themeElementForUrl(s);i&&i.parentNode&&(i.setAttribute("disabled","true"),i.parentNode.removeChild(i))}generateUUID(){return crypto.randomUUID()}get platform(){return this.component.platform}get environment(){return this.component.environment}performSavingOfItems({items:s,callback:i}){this.generateNotePreview&&(s[0].content.preview_plain=((c,d=50)=>c.length<=d?c:c.substring(0,d)+"...")(s[0].content.text));let r=[];for(let c of s)r.push(this.jsonObjectForItem(c));this.postMessage(e.SaveItems,{items:r},()=>{i?.()})}saveNote(s,i){let r=[s];if(this.pendingSaveItems||(this.pendingSaveItems=[]),this.coallesedSavingDelay){this.pendingSaveTimeout&&clearTimeout(this.pendingSaveTimeout);let c=r.map(p=>p.uuid),d=this.pendingSaveItems.filter(p=>!c.includes(p.uuid));this.pendingSaveItems=d.concat(r),this.pendingSaveParams={items:this.pendingSaveItems,callback:i},this.pendingSaveTimeout=setTimeout(()=>{this.performSavingOfItems(this.pendingSaveParams),this.pendingSaveItems=[],this.pendingSaveTimeout=void 0,this.pendingSaveParams=null},this.coallesedSavingDelay)}else this.performSavingOfItems({items:r,callback:i})}jsonObjectForItem(s){let i=Object.assign({},s);return i.children=null,i.parent=null,i}checkNoteExists(){if(!this.lastStreamedItem)throw"Trying to interact with note before it is received from Standard Notes. Use subscribe function."}};return o.default})())});var w=te(It(),1);var B="snbook-v1";function A(){return"c"+Math.random().toString(36).slice(2,9)+Date.now().toString(36).slice(-4)}function W(e){if(!e)return"";let t=String(e);return t=t.replace(/<img\b[^>]*>/gi,n=>{let o=(n.match(/\balt="([^"]*)"/i)||[])[1]||"";return o?`[image: ${o}]`:"[image]"}),t=t.replace(/<\/(td|th)\s*>/gi,"	").replace(/<\/(tr|caption)\s*>/gi,`
`),t=t.replace(/<\s*(br|\/p|\/div|\/h[1-6]|\/li|\/blockquote)\s*>/gi,`
`),t=t.replace(/<[^>]+>/g," "),t=t.replace(/&nbsp;/gi," ").replace(/&amp;/gi,"&").replace(/&lt;/gi,"<").replace(/&gt;/gi,">").replace(/&quot;/gi,'"').replace(/&#39;/gi,"'"),t.replace(/ {2,}/g," ").replace(/ *\t */g,"	").replace(/[ \t]+\n/g,`
`).replace(/\t{2,}/g,"	").replace(/\n{3,}/g,`

`).trim()}function ee(e){let t=(e||"").trim();if(!t)return 0;let n=t.match(/[A-Za-z0-9À-ɏЀ-ӿ'’-]+/g);return n?n.length:0}function Tt(e){let t=String(e||"").replace(/<sup\b[^>]*class="[^"]*fn-ref[^"]*"[^>]*>[\s\S]*?<\/sup>/gi," ").replace(/<(span|sup)\b[^>]*class="[^"]*cite[^"]*"[^>]*>[\s\S]*?<\/\1>/gi," ").replace(/<img\b[^>]*>/gi," ");return ee(W(t))}function ne(e){let t=[],n=/<sup\b[^>]*\bdata-fn="([^"]+)"[^>]*>/gi,o;for(;o=n.exec(e||"");)t.push(o[1]);return t}function D(e){let t=ne(e.html),n={};for(let s of e.footnotes||[])n[s.id]=s.text||"";let o=new Set,a=[];for(let s of t)o.has(s)||(o.add(s),a.push({num:a.length+1,id:s,text:n[s]||""}));return a}function oe(e){let t=[],n=/<(?:span|sup)\b[^>]*\bclass="[^"]*cite[^"]*"[^>]*>/gi,o=/\bdata-src="([^"]+)"/i,a=/\bdata-loc="([^"]*)"/i,s;for(;s=n.exec(e||"");){let i=s[0],r=(i.match(o)||[])[1];r&&t.push({id:r,loc:(i.match(a)||[])[1]||""})}return t}function ot(e,t){return String(e||"").replace(/<(span|sup)\b([^>]*\bclass="[^"]*cite[^"]*"[^>]*)>[\s\S]*?<\/\1>/gi,(n,o,a)=>{let s=(a.match(/\bdata-src="([^"]+)"/i)||[])[1],i=(a.match(/\bdata-loc="([^"]*)"/i)||[])[1]||"";return s?t(s,i):n})}function se(e){let t=String(e||"").split(/;| and |&/i)[0].trim();if(!t)return"Anon.";if(t.includes(","))return t.split(",")[0].trim();let n=t.split(/\s+/);return n[n.length-1]}function $(e,t,n,o){if(!e)return"";if(t==="numbered")return`[${n}]`;let s=[se(e.author)];return e.year&&s.push(e.year),o&&s.push(o),`(${s.join(", ")})`}function Et(e){return e.replace(/\s{2,}/g," ").replace(/\.\s*\./g,".").replace(/\s+\./g,".").trim()}function ie(e,t,n){let o=e.author||"",a=e.year||"",s=e.title||"",i=e.container||"",r=e.publisher||"",c=e.url||"";if(t==="numbered"){let p=[o,s,i,r,a].filter(Boolean).join(". ");return Et(`${n}. ${p}.`+(c?` ${c}`:""))}let d="";return o&&(d+=o+" "),d+=`(${a||"n.d."}). `,s&&(d+=s+". "),i&&(d+=i+". "),r&&(d+=r+". "),c&&(d+=c),Et(d)}function _(e){let t=new Set,n=[];for(let o of e.chapters)for(let a of oe(o.html))t.has(a.id)||(t.add(a.id),n.push(a.id));return n}function st(e){let t=e.citationStyle==="numbered"?"numbered":"author-date",n={};for(let s of e.sources||[])n[s.id]=s;let a=_(e).filter(s=>n[s]).map((s,i)=>({num:i+1,id:s,source:n[s]}));return t==="author-date"&&(a=a.slice().sort((s,i)=>(s.source.author||"").localeCompare(i.source.author||"")||(s.source.year||"").localeCompare(i.source.year||""))),a.map(s=>({...s,text:ie(s.source,t,s.num)}))}function q(){let e=A();return{format:B,chapters:[{id:e,title:"Chapter 1",html:"",footnotes:[]}],activeId:e,sources:[],citationStyle:"author-date"}}var it=["type","author","year","title","container","publisher","volume","pages","url","accessed"];function at(e){let t={id:String(e.id)};for(let n of it)t[n]=typeof e[n]=="string"?e[n]:"";return t.type||(t.type="book"),t}function z(e){let t=(e==null?"":String(e)).trim();if(!t)return q();if(t[0]==="{")try{let n=JSON.parse(t);if(n&&n.format===B&&Array.isArray(n.chapters)){let o=n.chapters.filter(r=>r&&typeof r=="object").map(r=>({id:r.id||A(),title:typeof r.title=="string"?r.title:"Untitled",html:typeof r.html=="string"?r.html:"",footnotes:Array.isArray(r.footnotes)?r.footnotes.filter(c=>c&&typeof c=="object"&&c.id).map(c=>({id:String(c.id),text:typeof c.text=="string"?c.text:""})):[]}));if(o.length===0)return q();let a=n.activeId;o.some(r=>r.id===a)||(a=o[0].id);let s=Array.isArray(n.sources)?n.sources.filter(r=>r&&typeof r=="object"&&r.id).map(at):[],i=n.citationStyle==="numbered"?"numbered":"author-date";return{format:B,chapters:o,activeId:a,sources:s,citationStyle:i}}}catch{}return ae(t)}function ae(e){let t=A(),n=re(e);return{format:B,chapters:[{id:t,title:"Imported text",html:n,footnotes:[]}],activeId:t,sources:[],citationStyle:"author-date"}}function C(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function re(e){return String(e).replace(/\r\n/g,`
`).split(/\n{2,}/).map(n=>{let o=C(n).replace(/\n/g,"<br>");return o.trim()?`<p>${o}</p>`:""}).filter(Boolean).join(`
`)||"<p></p>"}function rt(e){return JSON.stringify({format:B,chapters:e.chapters.map(t=>({id:t.id,title:t.title,html:t.html,footnotes:Array.isArray(t.footnotes)?t.footnotes:[]})),activeId:e.activeId,sources:Array.isArray(e.sources)?e.sources:[],citationStyle:e.citationStyle==="numbered"?"numbered":"author-date"})}function N(e){return e.chapters.reduce((t,n)=>t+Tt(n.html),0)}function J(e){return Tt(e?e.html:"")}function ce(e){let t=[...e.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map(i=>[...i[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(r=>T(r[1]).replace(/\s*\n\s*/g," ").replace(/\|/g,"\\|").trim()));if(!t.length)return"";let n=Math.max(...t.map(i=>i.length)),o=i=>{let r=i.slice();for(;r.length<n;)r.push("");return r},a=o(t[0]),s=`
| `+a.join(" | ")+` |
| `+a.map(()=>"---").join(" | ")+` |
`;for(let i=1;i<t.length;i++)s+="| "+o(t[i]).join(" | ")+` |
`;return s+`
`}function le(e){if(!e)return"";let t=String(e);return t=t.replace(/\r/g,""),t=t.replace(/<table[^>]*>[\s\S]*?<\/table>/gi,n=>ce(n)),t=t.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi,(n,o)=>`
# ${T(o)}

`),t=t.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi,(n,o)=>`
## ${T(o)}

`),t=t.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi,(n,o)=>`
### ${T(o)}

`),t=t.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi,(n,o)=>`
> ${T(o).replace(/\n+/g," ")}

`),t=t.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi,(n,o)=>`- ${T(o)}
`),t=t.replace(/<\/?(ul|ol)[^>]*>/gi,`
`),t=t.replace(/<\/(p|div)>/gi,`

`),t=t.replace(/<(p|div)[^>]*>/gi,""),t=t.replace(/<br\s*\/?>/gi,`  
`),t=T(t),t.replace(/\n{3,}/g,`

`).trim()}function T(e){return String(e).replace(/<img\b[^>]*>/gi,t=>{let n=(t.match(/\bsrc="([^"]*)"/i)||[])[1]||"",o=(t.match(/\balt="([^"]*)"/i)||[])[1]||"";return n?`![${o}](${n})`:""}).replace(/<a\b[^>]*\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi,(t,n,o)=>`[${o.replace(/<[^>]+>/g,"")}](${n})`).replace(/<(strong|b)[^>]*>([\s\S]*?)<\/(strong|b)>/gi,(t,n,o)=>`**${o}**`).replace(/<(em|i)[^>]*>([\s\S]*?)<\/(em|i)>/gi,(t,n,o)=>`*${o}*`).replace(/<s\b[^>]*>([\s\S]*?)<\/s>/gi,(t,n)=>`~~${n}~~`).replace(/<u[^>]*>([\s\S]*?)<\/u>/gi,(t,n)=>n).replace(/<[^>]+>/g,"").replace(/&nbsp;/gi," ").replace(/&amp;/gi,"&").replace(/&lt;/gi,"<").replace(/&gt;/gi,">").replace(/&quot;/gi,'"').replace(/&#39;/gi,"'")}function ct(e,t){return String(e||"").replace(/<sup\b[^>]*\bdata-fn="([^"]+)"[^>]*>[\s\S]*?<\/sup>/gi,(n,o)=>t(o))}function lt(e){let t=e.citationStyle==="numbered"?"numbered":"author-date",n={};for(let a of e.sources||[])n[a.id]=a;let o={};return _(e).filter(a=>n[a]).forEach((a,s)=>{o[a]=s+1}),{style:t,byId:n,numById:o,bib:st(e)}}function At(e,t){let n=[],o=lt(e);return t&&n.push(`# ${t}
`),e.chapters.forEach((a,s)=>{let i=D(a),r={};i.forEach(p=>{r[p.id]=`${s+1}-${p.num}`});let c=ct(a.html,p=>r[p]?`[^${r[p]}]`:"");c=ot(c,(p,g)=>o.byId[p]?$(o.byId[p],o.style,o.numById[p],g):""),n.push(`
## ${a.title}
`);let d=le(c);n.push(d?d+`
`:""),i.length&&n.push(i.map(p=>`[^${s+1}-${p.num}]: ${p.text}`).join(`
`)+`
`)}),o.bib.length&&(n.push(`
## References
`),n.push(o.bib.map(a=>(o.style==="numbered",a.text)).join(`

`)+`
`)),n.join(`
`).replace(/\n{3,}/g,`

`).trim()+`
`}function Mt(e,t){let n=[],o=lt(e);t&&n.push(t.toUpperCase()+`
`);for(let a of e.chapters){let s=D(a),i={};s.forEach(c=>{i[c.id]=c.num});let r=ct(a.html,c=>i[c]?`[${i[c]}]`:"");r=ot(r,(c,d)=>o.byId[c]?$(o.byId[c],o.style,o.numById[c],d):""),n.push(`

`+a.title.toUpperCase()+`
`),n.push(W(r)),s.length&&n.push(`
Notes:
`+s.map(c=>`${c.num}. ${c.text}`).join(`
`))}return o.bib.length&&n.push(`

REFERENCES
`+o.bib.map(a=>a.text).join(`
`)),n.join(`
`).replace(/\n{4,}/g,`


`).trim()+`
`}function $t(e,t){let n=C(t||"Manuscript"),o=lt(e),a=e.chapters.map((s,i)=>{let r=D(s),c={};r.forEach(g=>{c[g.id]=g.num});let d=ct(s.html,g=>{let x=c[g];return x?`<sup id="fnref-${i+1}-${x}"><a href="#fn-${i+1}-${x}">${x}</a></sup>`:""});d=ot(d,(g,x)=>o.byId[g]?C($(o.byId[g],o.style,o.numById[g],x)):"");let p=`<section>
<h2>${C(s.title)}</h2>
${d||"<p></p>"}`;if(r.length){let g=r.map(x=>`<li id="fn-${i+1}-${x.num}">${C(x.text)} <a href="#fnref-${i+1}-${x.num}">&#8617;</a></li>`).join(`
`);p+=`
<hr>
<ol class="footnotes">
${g}
</ol>`}return p+`
</section>`}).join(`
`);if(o.bib.length){let s=o.bib.map(r=>`<li>${C(o.style==="numbered"?r.text.replace(/^\d+\.\s*/,""):r.text)}</li>`).join(`
`),i=o.style==="numbered"?"ol":"ul";a+=`
<section>
<h2>References</h2>
<${i} class="references">
${s}
</${i}>
</section>`}return`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${n}</title>
<style>
  body { font-family: Georgia, 'Times New Roman', serif; max-width: 40em; margin: 2em auto; line-height: 1.6; padding: 0 1em; }
  h1 { text-align: center; }
  section { page-break-before: always; }
  h2 { margin-top: 2em; }
  sup a { text-decoration: none; }
  hr { margin-top: 2.5em; border: none; border-top: 1px solid #ccc; }
  ol.footnotes { font-size: .85em; color: #444; }
  ol.footnotes li { margin-bottom: .4em; }
  img { max-width: 100%; height: auto; }
  figure { margin: 1.5em 0; text-align: center; }
  figcaption { font-size: .85em; color: #666; margin-top: .4em; }
  table { border-collapse: collapse; margin: 1.5em 0; width: 100%; }
  th, td { border: 1px solid #bbb; padding: .4em .6em; text-align: left; }
  .references li { margin-bottom: .6em; }
  ul.references { list-style: none; padding-left: 0; }
  ul.references li { padding-left: 1.6em; text-indent: -1.6em; }
</style>
</head>
<body>
<h1>${n}</h1>
${a}
</body>
</html>
`}function R(e){let t=e||new Date,n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0");return`${n}-${o}-${a}`}function dt(e,t,n){let o=Object.assign({},e||{}),a=n||R();return(!o.session||o.session.date!==a||typeof o.session.startWords!="number")&&(o.session={date:a,startWords:t}),o}function Nt(e,t,n){let o=n||R();return e&&e.session&&e.session.date===o&&typeof e.session.startWords=="number"?Math.max(0,t-e.session.startWords):0}var de="1.2.2",u=q(),b={},f={},mt=null,K=!1,v=!1,ue=250,l=e=>document.querySelector(e),m=(e,t={},n=[])=>{let o=document.createElement(e);for(let a in t)a==="class"?o.className=t[a]:a==="html"?o.innerHTML=t[a]:a.startsWith("on")&&typeof t[a]=="function"?o.addEventListener(a.slice(2),t[a]):o.setAttribute(a,t[a]);for(let a of[].concat(n))o.appendChild(typeof a=="string"?document.createTextNode(a):a);return o};function k(){let e=u.chapters.find(t=>t.id===u.activeId)||u.chapters[0];return e&&!Array.isArray(e.footnotes)&&(e.footnotes=[]),e}var G=null;function y(){v||(G&&clearTimeout(G),G=setTimeout(Pt,400))}function Pt(){G=null;let e=rt(u);mt=e,w.default.text=e;let t=k(),n=W(t?t.html:"").slice(0,90)||t?.title||"Manuscript";w.default.preview=n}function Ft(){v||(w.default.meta=b)}function vt(){w.default.extensionMeta=f}function qt(){E(),Y(),I(),wt(),xt()}function E(){let e=l("#chapter-list");e.innerHTML="",u.chapters.forEach((t,n)=>{let o=J(t),a=m("div",{class:"chapter-row"+(t.id===u.activeId?" active":""),draggable:v?"false":"true","data-id":t.id});a.appendChild(m("span",{class:"chapter-name"},t.title||"Untitled")),a.appendChild(m("span",{class:"chapter-words"},String(o))),a.addEventListener("click",i=>{i.target.closest(".row-actions")||me(t.id)});let s=m("div",{class:"row-actions"});v||(s.appendChild(m("button",{class:"icon-btn",title:"Rename",onclick:i=>{i.stopPropagation(),he(t.id)}},"\u270E")),s.appendChild(m("button",{class:"icon-btn",title:"Move up",onclick:i=>{i.stopPropagation(),Rt(n,-1)}},"\u2191")),s.appendChild(m("button",{class:"icon-btn",title:"Move down",onclick:i=>{i.stopPropagation(),Rt(n,1)}},"\u2193")),s.appendChild(m("button",{class:"icon-btn danger",title:"Delete",onclick:i=>{i.stopPropagation(),ge(t.id)}},"\u{1F5D1}"))),a.appendChild(s),v||(a.addEventListener("dragstart",i=>{O=t.id,a.classList.add("dragging"),i.dataTransfer.effectAllowed="move"}),a.addEventListener("dragend",()=>{O=null,a.classList.remove("dragging")}),a.addEventListener("dragover",i=>{i.preventDefault(),a.classList.add("drag-over")}),a.addEventListener("dragleave",()=>a.classList.remove("drag-over")),a.addEventListener("drop",i=>{i.preventDefault(),a.classList.remove("drag-over"),pe(t.id)})),e.appendChild(a)}),l("#total-words").textContent=N(u).toLocaleString()}var O=null;function pe(e){if(!O||O===e)return;let t=u.chapters.findIndex(a=>a.id===O),n=u.chapters.findIndex(a=>a.id===e);if(t<0||n<0)return;let[o]=u.chapters.splice(t,1);u.chapters.splice(n,0,o),E(),y()}function me(e){e!==u.activeId&&(S(),u.activeId=e,E(),Y(),y(),V())}function fe(){S();let e=A();u.chapters.push({id:e,title:`Chapter ${u.chapters.length+1}`,html:""}),u.activeId=e,E(),Y(),y(),V()}function he(e){let t=u.chapters.find(o=>o.id===e);if(!t)return;let n=window.prompt("Chapter title:",t.title);n!=null&&(t.title=n.trim()||t.title,E(),I(),y())}function Rt(e,t){let n=e+t;if(n<0||n>=u.chapters.length)return;let o=u.chapters;[o[e],o[n]]=[o[n],o[e]],E(),y()}function ge(e){if(u.chapters.length===1){window.alert("A manuscript needs at least one chapter.");return}let t=u.chapters.find(o=>o.id===e);if(!window.confirm(`Delete "${t?t.title:"chapter"}"? This cannot be undone.`))return;let n=u.chapters.findIndex(o=>o.id===e);u.chapters.splice(n,1),u.activeId===e&&(u.activeId=u.chapters[Math.max(0,n-1)].id),E(),Y(),I(),y()}var h=()=>l("#editor");function Y(){let e=k(),t=h();t.innerHTML=e&&e.html?e.html:"<p><br></p>",l("#chapter-title-input").value=e?e.title:"",t.contentEditable=v?"false":"true",Z(),H(),S(),X(),I(),setTimeout(P,0)}function S(){let e=k();e&&(e.html=h().innerHTML)}function L(){Z(),H(),S(),X(),I(),be(),y(),f.focusMode&&Ct()}function be(){document.querySelectorAll(".chapter-row").forEach(t=>{let n=t.getAttribute("data-id"),o=u.chapters.find(a=>a.id===n);o&&(t.querySelector(".chapter-words").textContent=String(J(o)))}),l("#total-words").textContent=N(u).toLocaleString()}function U(e,t=null){v||(h().focus(),document.execCommand(e,!1,t),L())}function V(){let e=h();e.focus();let t=document.createRange();t.selectNodeContents(e),t.collapse(!1);let n=window.getSelection();n.removeAllRanges(),n.addRange(t)}function ve(e){if(!v)switch(e){case"indent":ft(1);break;case"outdent":ft(-1);break;case"link":we();break;case"unlink":U("unlink");break;case"footnote":xe();break;case"undo":U("undo");break;case"redo":U("redo");break;case"clear":h().focus(),document.execCommand("removeFormat"),document.execCommand("formatBlock",!1,"p"),L();break}}function ye(){let e=h(),t=window.getSelection();if(!t.rangeCount)return[];let n=t.getRangeAt(0),o=[];for(let a of e.children)n.intersectsNode(a)&&o.push(a);if(o.length===0){let a=et();a&&a.parentNode===e&&o.push(a)}return o}function ft(e){h().focus();let t=ye();if(t.length!==0){for(let n of t){let o=parseFloat(n.style.marginLeft)||0,a=Math.max(0,o+e*2);n.style.marginLeft=a?a+"em":""}L()}}function Se(e){let t=e.trim();return t?/^(https?:|mailto:|#|\/)/i.test(t)?t:/^[\w.+-]+@[\w.-]+\.\w+$/.test(t)?"mailto:"+t:"https://"+t:""}function we(){h().focus();let t=window.getSelection(),n=t.rangeCount&&!t.getRangeAt(0).collapsed,o=window.prompt("Link URL:","https://");if(o==null)return;let a=Se(o);if(a){if(n)document.execCommand("createLink",!1,a);else{let s=window.prompt("Link text:",a)||a;document.execCommand("insertHTML",!1,`<a href="${a.replace(/"/g,"&quot;")}">${s.replace(/</g,"&lt;")}</a>`)}L()}}function xe(){h().focus();let t="fn"+A();document.execCommand("insertHTML",!1,`<sup class="fn-ref" data-fn="${t}" contenteditable="false">?</sup>\u200B`),k().footnotes.push({id:t,text:""}),Z(),S(),X(),y();let o=document.querySelector(`#fn-list textarea[data-fn="${t}"]`);o&&o.focus()}function Z(){let e=h(),t=Array.from(e.querySelectorAll("sup.fn-ref")),n={},o=0;for(let s of t){let i=s.getAttribute("data-fn");i in n||(o+=1,n[i]=o),s.textContent=String(n[i])}let a=k();a.footnotes=(a.footnotes||[]).filter(s=>s.id in n)}function X(){let e=l("#footnotes-panel"),t=l("#fn-list"),n=k(),o=D(n);if(t.innerHTML="",o.length===0){e.hidden=!0;return}e.hidden=!1;for(let a of o){let s=m("div",{class:"fn-row"});s.appendChild(m("span",{class:"fn-num"},String(a.num)));let i=m("textarea",{class:"fn-text",rows:"1","data-fn":a.id,placeholder:"Footnote text\u2026"});i.value=a.text,i.disabled=v,i.addEventListener("input",()=>{let r=n.footnotes.find(c=>c.id===a.id);r&&(r.text=i.value,y()),i.style.height="auto",i.style.height=i.scrollHeight+"px"}),s.appendChild(i),v||s.appendChild(m("button",{class:"icon-btn danger",title:"Delete footnote",onclick:()=>Ce(a.id)},"\u{1F5D1}")),t.appendChild(s),requestAnimationFrame(()=>{i.style.height="auto",i.style.height=i.scrollHeight+"px"})}}function Ce(e){h().querySelectorAll(`sup.fn-ref[data-fn="${e}"]`).forEach(o=>o.remove());let n=k();n.footnotes=n.footnotes.filter(o=>o.id!==e),Z(),S(),X(),I(),y()}var ht=null;function Q(){let e=window.getSelection();e.rangeCount&&h().contains(e.anchorNode)&&(ht=e.getRangeAt(0).cloneRange())}function ke(){if(h().focus(),!ht)return;let e=window.getSelection();e.removeAllRanges(),e.addRange(ht)}function yt(e){ke(),document.execCommand("insertHTML",!1,e)}var M=e=>String(e??"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");function Le(){if(v)return;let e=window.prompt("Table size \u2014 columns x rows:","3 x 3");if(e==null)return;let t=e.split(/[x×,]/i),n=Math.min(12,Math.max(1,parseInt(t[0],10)||3)),o=Math.min(60,Math.max(1,parseInt(t[1],10)||3)),a="<table><tbody>";for(let s=0;s<o;s++){a+="<tr>";for(let i=0;i<n;i++){let r=s===0?"th":"td";a+=`<${r}><br></${r}>`}a+="</tr>"}a+="</tbody></table><p><br></p>",h().focus(),document.execCommand("insertHTML",!1,a),L()}function Wt(){let e=et()||window.getSelection().anchorNode||null,t=h();for(;e&&e!==t;){if(e.tagName==="TABLE")return e;e=e.parentNode}let o=window.getSelection().anchorNode;for(;o&&o!==t;){if(o.tagName==="TABLE")return o;o=o.parentNode}return null}function Ie(){let e=window.getSelection().anchorNode,t=h();for(;e&&e!==t;){if(e.tagName==="TD"||e.tagName==="TH")return e;e=e.parentNode}return null}function Ee(e){let t=Wt();if(!t)return;let n=Ie(),o=n?n.parentNode:null,a=n&&o?Array.from(o.children).indexOf(n):0,s=Array.from(t.querySelectorAll("tr"));if(e==="row-after"&&o){let i=document.createElement("tr");Array.from(o.children).forEach(()=>{let r=document.createElement("td");r.innerHTML="<br>",i.appendChild(r)}),o.after(i)}else if(e==="col-after")s.forEach(i=>{let r=i.children[a],c=r&&r.tagName==="TH",d=document.createElement(c?"th":"td");d.innerHTML="<br>",r?r.after(d):i.appendChild(d)});else if(e==="row-del"&&o)s.length>1&&o.remove();else if(e==="col-del")s.forEach(i=>{i.children.length>1&&i.children[a]&&i.children[a].remove()});else if(e==="header"){let i=s[0];if(i){let r=i.children[0]&&i.children[0].tagName==="TD";Array.from(i.children).forEach(c=>{let d=document.createElement(r?"th":"td");d.innerHTML=c.innerHTML,c.replaceWith(d)})}}else e==="delete"&&t.remove();L(),setTimeout(P,0)}function P(){let e=l("#table-toolbar");if(!e)return;let t=!v&&document.activeElement===h()?Wt():null;if(!t){e.hidden=!0;return}let n=t.getBoundingClientRect();e.hidden=!1,e.style.top=Math.max(6,n.top-34)+"px",e.style.left=Math.min(window.innerWidth-e.offsetWidth-8,n.left)+"px"}function Te(e){let t=String(e||"").trim();return/^\s*javascript:/i.test(t)?"":t}function Ae(){if(v)return;Q();let e=window.prompt("Image URL:","https://");if(e==null)return;let t=Te(e);if(!t)return;let n=window.prompt("Alt text (a short description, for accessibility & export):","")||"";yt(`<img src="${M(t)}" alt="${M(n)}">`),L()}function Me(){v||(Q(),l("#image-file").value="",l("#image-file").click())}function $e(e,t){return new Promise((n,o)=>{let a=new FileReader;a.onerror=o,a.onload=()=>{let s=new Image;s.onerror=o,s.onload=()=>{let{width:i,height:r}=s,c=Math.min(1,t/Math.max(i,r));i=Math.round(i*c),r=Math.round(r*c);let d=document.createElement("canvas");d.width=i,d.height=r,d.getContext("2d").drawImage(s,0,0,i,r);let p=e.type==="image/png"?"image/png":"image/jpeg";n(d.toDataURL(p,.85))},s.src=a.result},a.readAsDataURL(e)})}async function Ne(e){let t=e.target.files&&e.target.files[0];if(t)try{let n=await $e(t,1200),o=window.prompt("Alt text (a short description):",t.name.replace(/\.[^.]+$/,""))||"";yt(`<img src="${n}" alt="${M(o)}">`),L(),n.length>6e5&&window.alert("Heads up: this image is fairly large and is embedded directly in the note, which increases its size and sync time. For big images, consider hosting them and using \u2018Image by URL\u2019 instead.")}catch{window.alert("Sorry, that image couldn't be processed.")}}function H(){S();let e=u.citationStyle==="numbered"?"numbered":"author-date",t={};_(u).forEach((o,a)=>{t[o]=a+1});let n={};(u.sources||[]).forEach(o=>{n[o.id]=o}),h().querySelectorAll(".cite").forEach(o=>{let a=o.getAttribute("data-src"),s=o.getAttribute("data-loc")||"",i=n[a];if(!i){o.textContent=e==="numbered"?"[?]":"(source removed)";return}o.textContent=$(i,e,t[a],s)})}function Re(e,t){let n=u.citationStyle==="numbered"?"numbered":"author-date",o;if(n==="numbered")o=`<sup class="cite" data-src="${M(e)}" data-loc="${M(t)}" contenteditable="false">[?]</sup>`;else{let a=(u.sources||[]).find(i=>i.id===e),s=$(a,n,0,t);o=`<span class="cite" data-src="${M(e)}" data-loc="${M(t)}" contenteditable="false">${C(s)}</span>`}yt(o+"\u200B"),H(),S(),I(),y()}var gt="manage";function jt(e){gt=e||"manage",l("#sources-title").textContent=gt==="pick"?"Insert citation \u2014 choose a source":"Sources",l("#citation-style").value=u.citationStyle==="numbered"?"numbered":"author-date",l("#source-form").hidden=!0,l("#sources-modal").hidden=!1,St(),tt()}function bt(){l("#sources-modal").hidden=!0}function St(){let e=l("#sources-list");e.innerHTML="";let t=u.sources||[];if(t.length===0){e.appendChild(m("div",{class:"muted small"},"No sources yet. Add one to start citing."));return}for(let n of t){let o=m("div",{class:"src-row"}),a=[n.author,n.year?`(${n.year})`:"",n.title].filter(Boolean).join(" ");o.appendChild(m("span",{class:"src-label"},a||"Untitled source"));let s=m("div",{class:"row-actions always"});gt==="pick"&&s.appendChild(m("button",{class:"btn small",onclick:()=>De(n.id)},"Insert")),s.appendChild(m("button",{class:"icon-btn",title:"Edit",onclick:()=>_t(n)},"\u270E")),s.appendChild(m("button",{class:"icon-btn danger",title:"Delete",onclick:()=>Be(n.id)},"\u{1F5D1}")),o.appendChild(s),e.appendChild(o)}}var je={type:"Type",author:"Author(s)",year:"Year",title:"Title",container:"Journal / Book / Site",publisher:"Publisher",volume:"Volume/Issue",pages:"Pages",url:"URL",accessed:"Accessed date"};function _t(e){let t=l("#source-form"),n=e||{id:"",type:"book"};t.hidden=!1,t.innerHTML="";let o=m("div",{class:"form-grid"});for(let i of it){let r=m("label",{class:"field"+(i==="title"||i==="author"?" wide":"")},je[i]||i),c;i==="type"?(c=m("select",{"data-f":"type"}),["book","article","chapter","website","report","other"].forEach(d=>{let p=m("option",{value:d},d[0].toUpperCase()+d.slice(1));(n.type||"book")===d&&(p.selected=!0),c.appendChild(p)})):c=m("input",{type:"text","data-f":i,value:n[i]||""}),r.appendChild(c),o.appendChild(r)}t.appendChild(o);let a=m("div",{class:"form-bar"});a.appendChild(m("button",{class:"btn",onclick:()=>He(e?e.id:null)},"Save source")),a.appendChild(m("button",{class:"btn ghost",onclick:()=>{t.hidden=!0}},"Cancel")),t.appendChild(a);let s=t.querySelector('input[data-f="author"]');s&&s.focus()}function He(e){let t=l("#source-form"),n={id:e||"src"+A()};t.querySelectorAll("[data-f]").forEach(s=>{n[s.getAttribute("data-f")]=s.value.trim()});let o=at(n);u.sources=u.sources||[];let a=u.sources.findIndex(s=>s.id===o.id);a>=0?u.sources[a]=o:u.sources.push(o),t.hidden=!0,H(),S(),y(),St(),tt()}function Be(e){window.confirm("Delete this source? In-text citations to it will show as \u2018source removed\u2019.")&&(u.sources=(u.sources||[]).filter(t=>t.id!==e),H(),S(),y(),St(),tt())}function De(e){let t=window.prompt("Page or locator (optional, e.g. \u2018p. 42\u2019):","")||"";bt(),Re(e,t)}function Oe(){u.citationStyle=l("#citation-style").value==="numbered"?"numbered":"author-date",H(),S(),y(),tt()}function tt(){let e=l("#ref-preview"),t=st(u);if(t.length===0){e.innerHTML='<div class="muted small">No citations in the text yet.</div>';return}e.innerHTML=t.map(n=>`<div class="ref-item">${C(n.text)}</div>`).join("")}function I(){let e=k(),t=J(e),n=N(u),o=Math.max(1,Math.round(n/ue));l("#stat-chapter").textContent=`${t.toLocaleString()} words in this chapter`,l("#stat-total").textContent=`${n.toLocaleString()} total`,l("#stat-reading").textContent=`~${o} min read`,b=dt(b,n,R());let a=Nt(b,n,R()),s=Number(b.sessionGoal)||0;l("#stat-session").textContent=s?`Today: ${a.toLocaleString()} / ${s.toLocaleString()}`:`Today: ${a.toLocaleString()} words`;let i=s?Math.min(100,Math.round(a/s*100)):0;l("#session-bar").style.width=i+"%",l("#session-bar").classList.toggle("done",s>0&&a>=s)}function wt(){l("#target-manuscript").value=b.manuscriptTarget||"",l("#target-session").value=b.sessionGoal||"";let e=N(u),t=Number(b.manuscriptTarget)||0,n=t?Math.min(100,Math.round(e/t*100)):0;l("#manuscript-bar").style.width=n+"%",l("#manuscript-pct").textContent=t?`${n}% of ${t.toLocaleString()}`:"no target set"}function Ht(){let e=parseInt(l("#target-manuscript").value,10),t=parseInt(l("#target-session").value,10);b.manuscriptTarget=Number.isFinite(e)&&e>0?e:0,b.sessionGoal=Number.isFinite(t)&&t>0?t:0,Ft(),wt(),I()}function xt(){document.body.classList.toggle("focus-mode",!!f.focusMode),document.body.classList.toggle("typewriter",!!f.typewriter),l("#btn-focus").classList.toggle("on",!!f.focusMode),l("#btn-typewriter").classList.toggle("on",!!f.typewriter),zt(),f.focusMode?Ct():Jt()}var Bt={tight:"0.15em",normal:"0.65em",loose:"1.1em"};function zt(){let e=h();if(!e)return;let t=f.lineSpacing||1.5,n=Bt[f.paraSpacing]||Bt.tight;e.style.setProperty("--ls",t),e.style.setProperty("--para-gap",n),e.classList.toggle("first-indent",!!f.firstLineIndent),document.querySelectorAll('#format-menu .menu-seg[data-pref="lineSpacing"] button').forEach(a=>a.classList.toggle("on",String(t)===a.dataset.val)),document.querySelectorAll('#format-menu .menu-seg[data-pref="paraSpacing"] button').forEach(a=>a.classList.toggle("on",(f.paraSpacing||"tight")===a.dataset.val));let o=l('#format-menu .menu-toggle[data-pref="firstLineIndent"]');o&&o.classList.toggle("on",!!f.firstLineIndent)}function ut(e,t){f[e]=t,vt(),zt(),V()}function Dt(){f.focusMode=!f.focusMode,vt(),xt(),V()}function Ue(){f.typewriter=!f.typewriter,vt(),xt(),f.typewriter&&kt()}function et(){let e=window.getSelection();if(!e.rangeCount)return null;let t=e.getRangeAt(0).startContainer;t.nodeType===3&&(t=t.parentNode);let n=h();for(;t&&t!==n&&t.parentNode!==n;)t=t.parentNode;return t&&t!==n?t:null}function Jt(){h().querySelectorAll(".cur-block").forEach(e=>e.classList.remove("cur-block"))}function Ct(){Jt();let e=et();e&&e.classList&&e.classList.add("cur-block")}function kt(){let e=window.getSelection();if(!e.rangeCount)return;let n=e.getRangeAt(0).cloneRange().getBoundingClientRect();if(!n||n.top===0&&n.bottom===0){let i=et();i&&(n=i.getBoundingClientRect())}if(!n)return;let o=l("#editor-scroll"),a=o.clientHeight/2,s=n.top-o.getBoundingClientRect().top-a;o.scrollTop+=s}function Ot(){K&&(P(),document.activeElement===h()&&(f.focusMode&&Ct(),f.typewriter&&kt()))}function Pe(){return u.chapters[0]&&u.chapters[0].title,"Manuscript"}function pt(e,t,n){let o=new Blob([t],{type:n}),a=URL.createObjectURL(o),s=m("a",{href:a,download:e});document.body.appendChild(s),s.click(),setTimeout(()=>{document.body.removeChild(s),URL.revokeObjectURL(a)},0)}function Fe(e){S();let t=Pe();e==="md"?pt("manuscript.md",At(u,t),"text/markdown"):e==="txt"?pt("manuscript.txt",Mt(u,t),"text/plain"):e==="html"&&pt("manuscript.html",$t(u,t),"text/html"),j()}function j(e){document.querySelectorAll(".menu.open").forEach(t=>{t!==e&&t.classList.remove("open")})}function qe(){let e=l("#app");e.innerHTML=`
  <aside id="sidebar">
    <div class="sidebar-head">
      <span class="brand">Manuscript</span>
      <button id="btn-add" class="btn small" title="Add chapter">+ Chapter</button>
    </div>
    <div id="chapter-list" class="chapter-list"></div>
    <div class="binder-foot">
      <div class="muted">Total</div><div id="total-words" class="total">0</div>
    </div>
    <div class="targets">
      <label>Manuscript goal
        <input id="target-manuscript" type="number" min="0" step="1000" placeholder="e.g. 80000">
      </label>
      <div class="bar"><div id="manuscript-bar" class="bar-fill"></div></div>
      <div id="manuscript-pct" class="muted small"></div>
      <label>Daily goal
        <input id="target-session" type="number" min="0" step="100" placeholder="e.g. 1000">
      </label>
    </div>
  </aside>

  <main id="main">
    <div id="toolbar">
      <input id="chapter-title-input" class="chapter-title" placeholder="Chapter title">
      <div class="fmt-group">
        <button class="fmt" data-cmd="bold" title="Bold (Ctrl/Cmd+B)"><b>B</b></button>
        <button class="fmt" data-cmd="italic" title="Italic (Ctrl/Cmd+I)"><i>I</i></button>
        <button class="fmt" data-cmd="underline" title="Underline (Ctrl/Cmd+U)"><u>U</u></button>
        <button class="fmt" data-cmd="strikeThrough" title="Strikethrough"><s>S</s></button>
        <span class="sep"></span>
        <button class="fmt" data-block="h1" title="Heading 1">H1</button>
        <button class="fmt" data-block="h2" title="Heading 2">H2</button>
        <button class="fmt" data-block="h3" title="Heading 3">H3</button>
        <button class="fmt" data-block="p" title="Body text">\xB6</button>
        <button class="fmt" data-block="blockquote" title="Block quote">&ldquo;</button>
        <span class="sep"></span>
        <button class="fmt" data-cmd="insertUnorderedList" title="Bullet list">&bull;</button>
        <button class="fmt" data-cmd="insertOrderedList" title="Numbered list">1.</button>
        <button class="fmt" data-action="outdent" title="Decrease indent (Shift+Tab)">&#8676;</button>
        <button class="fmt" data-action="indent" title="Increase indent (Tab)">&#8677;</button>
        <span class="sep"></span>
        <button class="fmt" data-cmd="justifyLeft" title="Align left">&#8801;</button>
        <button class="fmt" data-cmd="justifyCenter" title="Align center">&#8803;</button>
        <button class="fmt" data-cmd="justifyRight" title="Align right">&#8805;</button>
        <button class="fmt" data-cmd="justifyFull" title="Justify">&#9783;</button>
        <span class="sep"></span>
        <button class="fmt" data-action="link" title="Insert / edit link">&#128279;</button>
        <button class="fmt" data-action="unlink" title="Remove link">&#9586;</button>
        <button class="fmt" data-action="footnote" title="Insert footnote">fn</button>
        <button class="fmt" data-cmd="insertHorizontalRule" title="Horizontal rule">&#8213;</button>
        <span class="sep"></span>
        <button class="fmt" data-action="undo" title="Undo (Ctrl/Cmd+Z)">&#8630;</button>
        <button class="fmt" data-action="redo" title="Redo (Ctrl/Cmd+Y)">&#8631;</button>
        <button class="fmt" data-action="clear" title="Clear formatting">&#10005;</button>
      </div>
      <div class="spacer"></div>
      <div class="menu-wrap">
        <button id="btn-insert" class="btn ghost" title="Insert">Insert &#9662;</button>
        <div class="menu" id="insert-menu">
          <button data-insert="table">Table\u2026</button>
          <button data-insert="image-url">Image by URL\u2026</button>
          <button data-insert="image-upload">Upload image\u2026</button>
          <button data-insert="citation">Citation\u2026</button>
          <button data-insert="sources">Manage sources\u2026</button>
        </div>
      </div>
      <div class="menu-wrap">
        <button id="btn-format" class="btn ghost" title="Spacing & layout">Aa &#9662;</button>
        <div class="menu" id="format-menu">
          <div class="menu-label">Line spacing</div>
          <div class="menu-seg" data-pref="lineSpacing">
            <button data-val="1.15">1.15</button><button data-val="1.5">1.5</button><button data-val="2">2.0</button>
          </div>
          <div class="menu-label">Space between paragraphs</div>
          <div class="menu-seg" data-pref="paraSpacing">
            <button data-val="tight">Tight</button><button data-val="normal">Normal</button><button data-val="loose">Loose</button>
          </div>
          <div class="menu-label">Paragraph</div>
          <button class="menu-toggle" data-pref="firstLineIndent">First-line indent</button>
        </div>
      </div>
      <button id="btn-typewriter" class="btn ghost" title="Typewriter scrolling">Typewriter</button>
      <button id="btn-focus" class="btn ghost" title="Focus mode">Focus</button>
      <div class="menu-wrap">
        <button id="btn-export" class="btn ghost">Export &#9662;</button>
        <div class="menu" id="export-menu">
          <button data-export="md">Markdown (.md)</button>
          <button data-export="html">HTML / Word (.html)</button>
          <button data-export="txt">Plain text (.txt)</button>
        </div>
      </div>
    </div>

    <div id="editor-scroll">
      <div id="editor" spellcheck="true"></div>
      <div id="footnotes-panel" class="fn-panel" hidden>
        <div class="fn-panel-head">Footnotes</div>
        <div id="fn-list"></div>
      </div>
    </div>

    <div id="statusbar">
      <span id="stat-chapter">0 words in this chapter</span>
      <span class="dot">\u2022</span>
      <span id="stat-total">0 total</span>
      <span class="dot">\u2022</span>
      <span id="stat-reading">~1 min read</span>
      <div class="spacer"></div>
      <span id="stat-session">Today: 0 words</span>
      <div class="session-bar-wrap"><div id="session-bar" class="bar-fill"></div></div>
      <span class="dot">\u2022</span>
      <span id="app-version" title="Plugin version">v${de}</span>
    </div>
    <button id="exit-focus" title="Exit focus mode">Exit focus</button>

    <div id="table-toolbar" class="table-toolbar" hidden>
      <button data-tbl="row-after" title="Add row below">+Row</button>
      <button data-tbl="col-after" title="Add column right">+Col</button>
      <button data-tbl="row-del" title="Delete row">&minus;Row</button>
      <button data-tbl="col-del" title="Delete column">&minus;Col</button>
      <button data-tbl="header" title="Toggle header row">Header</button>
      <button data-tbl="delete" title="Delete table" class="danger">&#10005;</button>
    </div>
  </main>

  <input id="image-file" type="file" accept="image/*" hidden>

  <div id="sources-modal" class="modal" hidden>
    <div class="modal-card">
      <div class="modal-head">
        <span id="sources-title">Sources</span>
        <button id="sources-close" class="icon-btn" title="Close">&#10005;</button>
      </div>
      <div class="modal-row">
        <label class="inline">Citation style:
          <select id="citation-style">
            <option value="author-date">Author\u2013date (Smith, 2020)</option>
            <option value="numbered">Numbered [1]</option>
          </select>
        </label>
        <button id="src-add" class="btn small">+ Add source</button>
      </div>
      <div id="sources-list" class="sources-list"></div>
      <div id="source-form" class="source-form" hidden></div>
      <details id="ref-preview-wrap" class="ref-preview-wrap">
        <summary>References preview</summary>
        <div id="ref-preview" class="ref-preview"></div>
      </details>
    </div>
  </div>`,l("#btn-add").addEventListener("click",fe),l("#chapter-title-input").addEventListener("input",n=>{let o=k();o&&(o.title=n.target.value,E(),y())}),document.querySelectorAll(".fmt").forEach(n=>{n.addEventListener("mousedown",o=>o.preventDefault()),n.addEventListener("click",()=>{n.dataset.cmd?U(n.dataset.cmd):n.dataset.block?U("formatBlock",n.dataset.block):n.dataset.action&&ve(n.dataset.action)})});let t=h();t.addEventListener("input",L),t.addEventListener("keyup",()=>{f.typewriter&&kt()}),t.addEventListener("click",Ot),t.addEventListener("keydown",n=>{n.key==="Tab"&&(n.preventDefault(),ft(n.shiftKey?-1:1))}),document.addEventListener("selectionchange",Ot),l("#btn-format").addEventListener("click",n=>{n.stopPropagation(),j(l("#format-menu")),l("#format-menu").classList.toggle("open")}),l("#format-menu").addEventListener("click",n=>n.stopPropagation()),document.querySelectorAll('#format-menu .menu-seg[data-pref="lineSpacing"] button').forEach(n=>n.addEventListener("click",()=>ut("lineSpacing",parseFloat(n.dataset.val)))),document.querySelectorAll('#format-menu .menu-seg[data-pref="paraSpacing"] button').forEach(n=>n.addEventListener("click",()=>ut("paraSpacing",n.dataset.val))),l('#format-menu .menu-toggle[data-pref="firstLineIndent"]').addEventListener("click",()=>ut("firstLineIndent",!f.firstLineIndent)),l("#btn-insert").addEventListener("click",n=>{n.stopPropagation(),Q(),j(l("#insert-menu")),l("#insert-menu").classList.toggle("open")}),document.querySelectorAll("#insert-menu button").forEach(n=>n.addEventListener("click",()=>{let o=n.dataset.insert;j(),o==="table"?Le():o==="image-url"?Ae():o==="image-upload"?Me():o==="citation"?(Q(),jt("pick")):o==="sources"&&jt("manage")})),l("#image-file").addEventListener("change",Ne),document.querySelectorAll("#table-toolbar button").forEach(n=>{n.addEventListener("mousedown",o=>o.preventDefault()),n.addEventListener("click",()=>Ee(n.dataset.tbl))}),l("#editor-scroll").addEventListener("scroll",P),window.addEventListener("resize",P),l("#sources-close").addEventListener("click",bt),l("#sources-modal").addEventListener("click",n=>{n.target.id==="sources-modal"&&bt()}),l("#citation-style").addEventListener("change",Oe),l("#src-add").addEventListener("click",()=>_t(null)),l("#target-manuscript").addEventListener("change",Ht),l("#target-session").addEventListener("change",Ht),l("#btn-focus").addEventListener("click",Dt),l("#exit-focus").addEventListener("click",Dt),l("#btn-typewriter").addEventListener("click",Ue),l("#btn-export").addEventListener("click",n=>{n.stopPropagation(),j(l("#export-menu")),l("#export-menu").classList.toggle("open")}),document.querySelectorAll("#export-menu button").forEach(n=>n.addEventListener("click",()=>Fe(n.dataset.export))),document.addEventListener("click",j),document.addEventListener("keydown",n=>{(n.metaKey||n.ctrlKey)&&n.key.toLowerCase()==="s"&&(n.preventDefault(),S(),Pt())})}function We(e,t){b=t&&typeof t=="object"?Object.assign({},t):{},u=z(e),v=!!w.default.locked,f=w.default.extensionMeta&&typeof w.default.extensionMeta=="object"?w.default.extensionMeta:{},document.body.classList.toggle("locked",v),qt();let n=JSON.stringify(b.session||null);b=dt(b,N(u),R()),JSON.stringify(b.session||null)!==n&&Ft()}function Ut(){qe(),w.default.initialize({debounceSave:350}),w.default.subscribe((e,t)=>{if(e===mt){b=t&&typeof t=="object"?Object.assign({},t):b,wt(),I();return}mt=rt(z(e)),K=!0,We(e,t)}),setTimeout(()=>{K||(K=!0,u=z(""),u.chapters[0].html="<p>This is a standalone preview. Inside Standard Notes your manuscript loads here automatically.</p>",qt())},1200)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ut):Ut();})();
