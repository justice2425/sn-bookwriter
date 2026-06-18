(()=>{var Ct=Object.create;var rt=Object.defineProperty;var Tt=Object.getOwnPropertyDescriptor;var It=Object.getOwnPropertyNames;var Et=Object.getPrototypeOf,Mt=Object.prototype.hasOwnProperty;var $t=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}};var At=(e,t,n,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of It(t))!Mt.call(e,a)&&a!==n&&rt(e,a,{get:()=>t[a],enumerable:!(s=Tt(t,a))||s.enumerable});return e};var Nt=(e,t,n)=>(n=e!=null?Ct(Et(e)):{},At(t||!e||!e.__esModule?rt(n,"default",{value:e,enumerable:!0}):n,e));var ct=$t((R,K)=>{(function(e,t){if(typeof R=="object"&&typeof K=="object")K.exports=t();else if(typeof define=="function"&&define.amd)define([],t);else{var n=t();for(var s in n)(typeof R=="object"?R:e)[s]=n[s]}})(self,()=>(()=>{"use strict";var e,t,n={d:(o,i)=>{for(var r in i)n.o(i,r)&&!n.o(o,r)&&Object.defineProperty(o,r,{enumerable:!0,get:i[r]})},o:(o,i)=>Object.prototype.hasOwnProperty.call(o,i)},s={};n.d(s,{default:()=>a}),(function(o){o.StreamContextItem="stream-context-item",o.SaveItems="save-items",o.ComponentRegistered="component-registered",o.ActivateThemes="themes",o.ThemesActivated="themes-activated",o.SetComponentData="set-component-data"})(e||(e={})),(function(o){o.Component="component"})(t||(t={}));let a=new class{constructor(){this.component={activeThemes:[],acceptsThemes:!0},this.sentMessages=[],this.messageQueue=[],this.subscriptions=[],this.generateNotePreview=!0}initialize(o={}){if(this.contentWindow)throw"Cannot initialize mediator more than once";this.contentWindow=window,this.coallesedSavingDelay=o.debounceSave!==void 0?o.debounceSave:250,this.registerMessageHandler(),this.postMessage(e.StreamContextItem,{},i=>{let{item:r}=i;(!this.lastStreamedItem||this.lastStreamedItem.uuid!==r.uuid)&&this.pendingSaveTimeout&&(clearTimeout(this.pendingSaveTimeout),this.performSavingOfItems(this.pendingSaveParams),this.pendingSaveTimeout=void 0,this.pendingSaveParams=void 0),this.lastStreamedItem=r,this.lastStreamedItem.isMetadataUpdate||this.subscriptions.forEach(u=>{u(this.text,this.meta)})})}subscribe(o){return this.subscriptions.push(o),this.lastStreamedItem&&setTimeout(()=>{o(this.text,this.meta)}),()=>{let i=this.subscriptions.indexOf(o);i>=0&&this.subscriptions.splice(i,1)}}get text(){var o,i;return this.checkNoteExists(),((i=(o=this.lastStreamedItem)===null||o===void 0?void 0:o.content)===null||i===void 0?void 0:i.text)||""}get meta(){var o;return this.checkNoteExists(),!((o=this.lastStreamedItem)===null||o===void 0)&&o.content?this.lastStreamedItem.content.appData[this.lastStreamedItem.content.editorIdentifier]:{}}get extensionMeta(){return this.component.data}get locked(){var o,i;return this.checkNoteExists(),(i=(o=this.lastStreamedItem)===null||o===void 0?void 0:o.content)===null||i===void 0?void 0:i.appData["org.standardnotes.sn"].locked}get preview(){var o,i;return this.checkNoteExists(),(i=(o=this.lastStreamedItem)===null||o===void 0?void 0:o.content)===null||i===void 0?void 0:i.preview_plain}set text(o){this.checkNoteExists(),this.lastStreamedItem.content.text=o,this.saveNote(this.lastStreamedItem)}set preview(o){this.checkNoteExists(),this.generateNotePreview=!1,this.lastStreamedItem.content.preview_plain=o}set meta(o){this.checkNoteExists(),this.lastStreamedItem.content.appData[this.lastStreamedItem.content.editorIdentifier]=o,this.saveNote(this.lastStreamedItem)}set extensionMeta(o){this.component.data=o,this.postMessage(e.SetComponentData,{componentData:o})}registerMessageHandler(){this.messageHandler=o=>{let{data:i}=o,r=(u=>{if(typeof u!="string")return!1;try{let d=JSON.parse(u),p=Object.prototype.toString.call(d);return p==="[object Object]"||p==="[object Array]"}catch{return!1}})(i)?JSON.parse(i):i;r&&this.handleMessage(r)},this.contentWindow.document.addEventListener("message",this.messageHandler,!1),this.contentWindow.addEventListener("message",this.messageHandler,!1)}handleMessage(o){var i,r;switch(o.action){case e.ComponentRegistered:this.component.sessionKey=o.sessionKey,o.componentData&&(this.component.data=o.componentData),this.onReady(o.data);break;case e.ActivateThemes:this.activateThemes(o.data.themes);break;default:{if(!o.original)return;let u=(i=this.sentMessages)===null||i===void 0?void 0:i.filter(d=>{var p;return d.messageId===((p=o.original)===null||p===void 0?void 0:p.messageId)})[0];if(!u)return;(r=u?.callback)===null||r===void 0||r.call(u,o.data);break}}}onReady(o){this.component.environment=o.environment,this.component.platform=o.platform,this.component.uuid=o.uuid;for(let i of this.messageQueue)this.postMessage(i.action,i.data,i.callback);this.messageQueue=[],this.activateThemes(o.activeThemeUrls||[]),this.postMessage(e.ThemesActivated,{})}get isRunningInDesktopApplication(){return this.component.environment==="desktop"}get isRunningInMobileApplication(){return this.component.environment==="mobile"}get isRunningInBrowser(){return this.component.environment==="web"}postMessage(o,i,r){if(!this.component.sessionKey)return void this.messageQueue.push({action:o,data:i,api:t.Component,callback:r});let u={action:o,data:i,messageId:this.generateUUID(),sessionKey:this.component.sessionKey,api:t.Component},d=JSON.parse(JSON.stringify(u)),p;d.callback=r,this.sentMessages.push(d),p=this.isRunningInMobileApplication?JSON.stringify(u):u,this.contentWindow.parent.postMessage(p,"*")}activateThemes(o=[]){if(!this.component.acceptsThemes)return;let{activeThemes:i}=this.component;if(i&&i.sort().toString()==o.sort().toString())return;let r=o,u=[];for(let d of i)o.includes(d)?r=r.filter(p=>p!==d):u.push(d);for(let d of u)this.deactivateTheme(d);this.component.activeThemes=o;for(let d of r){if(!d)continue;let p=d.endsWith("/org.standardnotes.theme-focus/index.css")?"https://app.standardnotes.com/components/assets/org.standardnotes.theme-focus/index.css":d,h=this.contentWindow.document.createElement("link");h.id=btoa(d),h.href=p,h.type="text/css",h.rel="stylesheet",h.media="screen,print",h.className="custom-theme",this.contentWindow.document.getElementsByTagName("head")[0].appendChild(h)}this.onThemesChangeCallback&&this.onThemesChangeCallback()}themeElementForUrl(o){return Array.from(this.contentWindow.document.getElementsByClassName("custom-theme")).slice().find(i=>i.id==btoa(o))}deactivateTheme(o){let i=this.themeElementForUrl(o);i&&i.parentNode&&(i.setAttribute("disabled","true"),i.parentNode.removeChild(i))}generateUUID(){return crypto.randomUUID()}get platform(){return this.component.platform}get environment(){return this.component.environment}performSavingOfItems({items:o,callback:i}){this.generateNotePreview&&(o[0].content.preview_plain=((u,d=50)=>u.length<=d?u:u.substring(0,d)+"...")(o[0].content.text));let r=[];for(let u of o)r.push(this.jsonObjectForItem(u));this.postMessage(e.SaveItems,{items:r},()=>{i?.()})}saveNote(o,i){let r=[o];if(this.pendingSaveItems||(this.pendingSaveItems=[]),this.coallesedSavingDelay){this.pendingSaveTimeout&&clearTimeout(this.pendingSaveTimeout);let u=r.map(p=>p.uuid),d=this.pendingSaveItems.filter(p=>!u.includes(p.uuid));this.pendingSaveItems=d.concat(r),this.pendingSaveParams={items:this.pendingSaveItems,callback:i},this.pendingSaveTimeout=setTimeout(()=>{this.performSavingOfItems(this.pendingSaveParams),this.pendingSaveItems=[],this.pendingSaveTimeout=void 0,this.pendingSaveParams=null},this.coallesedSavingDelay)}else this.performSavingOfItems({items:r,callback:i})}jsonObjectForItem(o){let i=Object.assign({},o);return i.children=null,i.parent=null,i}checkNoteExists(){if(!this.lastStreamedItem)throw"Trying to interact with note before it is received from Standard Notes. Use subscribe function."}};return s.default})())});var S=Nt(ct(),1);var M="snbook-v1";function T(){return"c"+Math.random().toString(36).slice(2,9)+Date.now().toString(36).slice(-4)}function P(e){if(!e)return"";let t=String(e);return t=t.replace(/<\s*(br|\/p|\/div|\/h[1-6]|\/li|\/blockquote)\s*>/gi,`
`),t=t.replace(/<[^>]+>/g," "),t=t.replace(/&nbsp;/gi," ").replace(/&amp;/gi,"&").replace(/&lt;/gi,"<").replace(/&gt;/gi,">").replace(/&quot;/gi,'"').replace(/&#39;/gi,"'"),t.replace(/[ \t]{2,}/g," ").replace(/[ \t]+\n/g,`
`).replace(/\n{3,}/g,`

`).trim()}function jt(e){let t=(e||"").trim();if(!t)return 0;let n=t.match(/[A-Za-z0-9À-ɏЀ-ӿ'’-]+/g);return n?n.length:0}function lt(e){let t=String(e||"").replace(/<sup\b[^>]*class="[^"]*fn-ref[^"]*"[^>]*>[\s\S]*?<\/sup>/gi," ");return jt(P(t))}function Rt(e){let t=[],n=/<sup\b[^>]*\bdata-fn="([^"]+)"[^>]*>/gi,s;for(;s=n.exec(e||"");)t.push(s[1]);return t}function $(e){let t=Rt(e.html),n={};for(let o of e.footnotes||[])n[o.id]=o.text||"";let s=new Set,a=[];for(let o of t)s.has(o)||(s.add(o),a.push({num:a.length+1,id:o,text:n[o]||""}));return a}function D(){let e=T();return{format:M,chapters:[{id:e,title:"Chapter 1",html:"",footnotes:[]}],activeId:e}}function B(e){let t=(e==null?"":String(e)).trim();if(!t)return D();if(t[0]==="{")try{let n=JSON.parse(t);if(n&&n.format===M&&Array.isArray(n.chapters)){let s=n.chapters.filter(o=>o&&typeof o=="object").map(o=>({id:o.id||T(),title:typeof o.title=="string"?o.title:"Untitled",html:typeof o.html=="string"?o.html:"",footnotes:Array.isArray(o.footnotes)?o.footnotes.filter(i=>i&&typeof i=="object"&&i.id).map(i=>({id:String(i.id),text:typeof i.text=="string"?i.text:""})):[]}));if(s.length===0)return D();let a=n.activeId;return s.some(o=>o.id===a)||(a=s[0].id),{format:M,chapters:s,activeId:a}}}catch{}return Ot(t)}function Ot(e){let t=T(),n=Dt(e);return{format:M,chapters:[{id:t,title:"Imported text",html:n,footnotes:[]}],activeId:t}}function O(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Dt(e){return String(e).replace(/\r\n/g,`
`).split(/\n{2,}/).map(n=>{let s=O(n).replace(/\n/g,"<br>");return s.trim()?`<p>${s}</p>`:""}).filter(Boolean).join(`
`)||"<p></p>"}function G(e){return JSON.stringify({format:M,chapters:e.chapters.map(t=>({id:t.id,title:t.title,html:t.html,footnotes:Array.isArray(t.footnotes)?t.footnotes:[]})),activeId:e.activeId})}function I(e){return e.chapters.reduce((t,n)=>t+lt(n.html),0)}function H(e){return lt(e?e.html:"")}function Pt(e){if(!e)return"";let t=String(e);return t=t.replace(/\r/g,""),t=t.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi,(n,s)=>`
# ${C(s)}

`),t=t.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi,(n,s)=>`
## ${C(s)}

`),t=t.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi,(n,s)=>`
### ${C(s)}

`),t=t.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi,(n,s)=>`
> ${C(s).replace(/\n+/g," ")}

`),t=t.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi,(n,s)=>`- ${C(s)}
`),t=t.replace(/<\/?(ul|ol)[^>]*>/gi,`
`),t=t.replace(/<\/(p|div)>/gi,`

`),t=t.replace(/<(p|div)[^>]*>/gi,""),t=t.replace(/<br\s*\/?>/gi,`  
`),t=C(t),t.replace(/\n{3,}/g,`

`).trim()}function C(e){return String(e).replace(/<a\b[^>]*\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi,(t,n,s)=>`[${s.replace(/<[^>]+>/g,"")}](${n})`).replace(/<(strong|b)[^>]*>([\s\S]*?)<\/(strong|b)>/gi,(t,n,s)=>`**${s}**`).replace(/<(em|i)[^>]*>([\s\S]*?)<\/(em|i)>/gi,(t,n,s)=>`*${s}*`).replace(/<s\b[^>]*>([\s\S]*?)<\/s>/gi,(t,n)=>`~~${n}~~`).replace(/<u[^>]*>([\s\S]*?)<\/u>/gi,(t,n)=>n).replace(/<[^>]+>/g,"").replace(/&nbsp;/gi," ").replace(/&amp;/gi,"&").replace(/&lt;/gi,"<").replace(/&gt;/gi,">").replace(/&quot;/gi,'"').replace(/&#39;/gi,"'")}function Q(e,t){return String(e||"").replace(/<sup\b[^>]*\bdata-fn="([^"]+)"[^>]*>[\s\S]*?<\/sup>/gi,(n,s)=>t(s))}function dt(e,t){let n=[];return t&&n.push(`# ${t}
`),e.chapters.forEach((s,a)=>{let o=$(s),i={};o.forEach(d=>{i[d.id]=`${a+1}-${d.num}`});let r=Q(s.html,d=>i[d]?`[^${i[d]}]`:"");n.push(`
## ${s.title}
`);let u=Pt(r);n.push(u?u+`
`:""),o.length&&n.push(o.map(d=>`[^${a+1}-${d.num}]: ${d.text}`).join(`
`)+`
`)}),n.join(`
`).replace(/\n{3,}/g,`

`).trim()+`
`}function ut(e,t){let n=[];t&&n.push(t.toUpperCase()+`
`);for(let s of e.chapters){let a=$(s),o={};a.forEach(r=>{o[r.id]=r.num});let i=Q(s.html,r=>o[r]?`[${o[r]}]`:"");n.push(`

`+s.title.toUpperCase()+`
`),n.push(P(i)),a.length&&n.push(`
Notes:
`+a.map(r=>`${r.num}. ${r.text}`).join(`
`))}return n.join(`
`).replace(/\n{4,}/g,`


`).trim()+`
`}function pt(e,t){let n=O(t||"Manuscript"),s=e.chapters.map((a,o)=>{let i=$(a),r={};i.forEach(p=>{r[p.id]=p.num});let u=Q(a.html,p=>{let h=r[p];return h?`<sup id="fnref-${o+1}-${h}"><a href="#fn-${o+1}-${h}">${h}</a></sup>`:""}),d=`<section>
<h2>${O(a.title)}</h2>
${u||"<p></p>"}`;if(i.length){let p=i.map(h=>`<li id="fn-${o+1}-${h.num}">${O(h.text)} <a href="#fnref-${o+1}-${h.num}">&#8617;</a></li>`).join(`
`);d+=`
<hr>
<ol class="footnotes">
${p}
</ol>`}return d+`
</section>`}).join(`
`);return`<!DOCTYPE html>
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
</style>
</head>
<body>
<h1>${n}</h1>
${s}
</body>
</html>
`}function E(e){let t=e||new Date,n=t.getFullYear(),s=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0");return`${n}-${s}-${a}`}function Y(e,t,n){let s=Object.assign({},e||{}),a=n||E();return(!s.session||s.session.date!==a||typeof s.session.startWords!="number")&&(s.session={date:a,startWords:t}),s}function mt(e,t,n){let s=n||E();return e&&e.session&&e.session.date===s&&typeof e.session.startWords=="number"?Math.max(0,t-e.session.startWords):0}var l=D(),f={},m={},X=null,W=!1,v=!1,Bt=250,c=e=>document.querySelector(e),b=(e,t={},n=[])=>{let s=document.createElement(e);for(let a in t)a==="class"?s.className=t[a]:a==="html"?s.innerHTML=t[a]:a.startsWith("on")&&typeof t[a]=="function"?s.addEventListener(a.slice(2),t[a]):s.setAttribute(a,t[a]);for(let a of[].concat(n))s.appendChild(typeof a=="string"?document.createTextNode(a):a);return s};function x(){let e=l.chapters.find(t=>t.id===l.activeId)||l.chapters[0];return e&&!Array.isArray(e.footnotes)&&(e.footnotes=[]),e}var F=null;function y(){v||(F&&clearTimeout(F),F=setTimeout(yt,400))}function yt(){F=null;let e=G(l);X=e,S.default.text=e;let t=x(),n=P(t?t.html:"").slice(0,90)||t?.title||"Manuscript";S.default.preview=n}function xt(){v||(S.default.meta=f)}function et(){S.default.extensionMeta=m}function kt(){k(),q(),L(),nt(),ot()}function k(){let e=c("#chapter-list");e.innerHTML="",l.chapters.forEach((t,n)=>{let s=H(t),a=b("div",{class:"chapter-row"+(t.id===l.activeId?" active":""),draggable:v?"false":"true","data-id":t.id});a.appendChild(b("span",{class:"chapter-name"},t.title||"Untitled")),a.appendChild(b("span",{class:"chapter-words"},String(s))),a.addEventListener("click",i=>{i.target.closest(".row-actions")||Wt(t.id)});let o=b("div",{class:"row-actions"});v||(o.appendChild(b("button",{class:"icon-btn",title:"Rename",onclick:i=>{i.stopPropagation(),Ut(t.id)}},"\u270E")),o.appendChild(b("button",{class:"icon-btn",title:"Move up",onclick:i=>{i.stopPropagation(),ft(n,-1)}},"\u2191")),o.appendChild(b("button",{class:"icon-btn",title:"Move down",onclick:i=>{i.stopPropagation(),ft(n,1)}},"\u2193")),o.appendChild(b("button",{class:"icon-btn danger",title:"Delete",onclick:i=>{i.stopPropagation(),qt(t.id)}},"\u{1F5D1}"))),a.appendChild(o),v||(a.addEventListener("dragstart",i=>{A=t.id,a.classList.add("dragging"),i.dataTransfer.effectAllowed="move"}),a.addEventListener("dragend",()=>{A=null,a.classList.remove("dragging")}),a.addEventListener("dragover",i=>{i.preventDefault(),a.classList.add("drag-over")}),a.addEventListener("dragleave",()=>a.classList.remove("drag-over")),a.addEventListener("drop",i=>{i.preventDefault(),a.classList.remove("drag-over"),Ht(t.id)})),e.appendChild(a)}),c("#total-words").textContent=I(l).toLocaleString()}var A=null;function Ht(e){if(!A||A===e)return;let t=l.chapters.findIndex(a=>a.id===A),n=l.chapters.findIndex(a=>a.id===e);if(t<0||n<0)return;let[s]=l.chapters.splice(t,1);l.chapters.splice(n,0,s),k(),y()}function Wt(e){e!==l.activeId&&(w(),l.activeId=e,k(),q(),y(),_())}function Ft(){w();let e=T();l.chapters.push({id:e,title:`Chapter ${l.chapters.length+1}`,html:""}),l.activeId=e,k(),q(),y(),_()}function Ut(e){let t=l.chapters.find(s=>s.id===e);if(!t)return;let n=window.prompt("Chapter title:",t.title);n!=null&&(t.title=n.trim()||t.title,k(),L(),y())}function ft(e,t){let n=e+t;if(n<0||n>=l.chapters.length)return;let s=l.chapters;[s[e],s[n]]=[s[n],s[e]],k(),y()}function qt(e){if(l.chapters.length===1){window.alert("A manuscript needs at least one chapter.");return}let t=l.chapters.find(s=>s.id===e);if(!window.confirm(`Delete "${t?t.title:"chapter"}"? This cannot be undone.`))return;let n=l.chapters.findIndex(s=>s.id===e);l.chapters.splice(n,1),l.activeId===e&&(l.activeId=l.chapters[Math.max(0,n-1)].id),k(),q(),L(),y()}var g=()=>c("#editor");function q(){let e=x(),t=g();t.innerHTML=e&&e.html?e.html:"<p><br></p>",c("#chapter-title-input").value=e?e.title:"",t.contentEditable=v?"false":"true",z(),w(),J(),L()}function w(){let e=x();e&&(e.html=g().innerHTML)}function j(){z(),w(),J(),L(),_t(),y(),m.focusMode&&it()}function _t(){document.querySelectorAll(".chapter-row").forEach(t=>{let n=t.getAttribute("data-id"),s=l.chapters.find(a=>a.id===n);s&&(t.querySelector(".chapter-words").textContent=String(H(s)))}),c("#total-words").textContent=I(l).toLocaleString()}function N(e,t=null){v||(g().focus(),document.execCommand(e,!1,t),j())}function _(){let e=g();e.focus();let t=document.createRange();t.selectNodeContents(e),t.collapse(!1);let n=window.getSelection();n.removeAllRanges(),n.addRange(t)}function zt(e){if(!v)switch(e){case"indent":tt(1);break;case"outdent":tt(-1);break;case"link":Gt();break;case"unlink":N("unlink");break;case"footnote":Qt();break;case"undo":N("undo");break;case"redo":N("redo");break;case"clear":g().focus(),document.execCommand("removeFormat"),document.execCommand("formatBlock",!1,"p"),j();break}}function Jt(){let e=g(),t=window.getSelection();if(!t.rangeCount)return[];let n=t.getRangeAt(0),s=[];for(let a of e.children)n.intersectsNode(a)&&s.push(a);if(s.length===0){let a=st();a&&a.parentNode===e&&s.push(a)}return s}function tt(e){g().focus();let t=Jt();if(t.length!==0){for(let n of t){let s=parseFloat(n.style.marginLeft)||0,a=Math.max(0,s+e*2);n.style.marginLeft=a?a+"em":""}j()}}function Kt(e){let t=e.trim();return t?/^(https?:|mailto:|#|\/)/i.test(t)?t:/^[\w.+-]+@[\w.-]+\.\w+$/.test(t)?"mailto:"+t:"https://"+t:""}function Gt(){g().focus();let t=window.getSelection(),n=t.rangeCount&&!t.getRangeAt(0).collapsed,s=window.prompt("Link URL:","https://");if(s==null)return;let a=Kt(s);if(a){if(n)document.execCommand("createLink",!1,a);else{let o=window.prompt("Link text:",a)||a;document.execCommand("insertHTML",!1,`<a href="${a.replace(/"/g,"&quot;")}">${o.replace(/</g,"&lt;")}</a>`)}j()}}function Qt(){g().focus();let t="fn"+T();document.execCommand("insertHTML",!1,`<sup class="fn-ref" data-fn="${t}" contenteditable="false">?</sup>\u200B`),x().footnotes.push({id:t,text:""}),z(),w(),J(),y();let s=document.querySelector(`#fn-list textarea[data-fn="${t}"]`);s&&s.focus()}function z(){let e=g(),t=Array.from(e.querySelectorAll("sup.fn-ref")),n={},s=0;for(let o of t){let i=o.getAttribute("data-fn");i in n||(s+=1,n[i]=s),o.textContent=String(n[i])}let a=x();a.footnotes=(a.footnotes||[]).filter(o=>o.id in n)}function J(){let e=c("#footnotes-panel"),t=c("#fn-list"),n=x(),s=$(n);if(t.innerHTML="",s.length===0){e.hidden=!0;return}e.hidden=!1;for(let a of s){let o=b("div",{class:"fn-row"});o.appendChild(b("span",{class:"fn-num"},String(a.num)));let i=b("textarea",{class:"fn-text",rows:"1","data-fn":a.id,placeholder:"Footnote text\u2026"});i.value=a.text,i.disabled=v,i.addEventListener("input",()=>{let r=n.footnotes.find(u=>u.id===a.id);r&&(r.text=i.value,y()),i.style.height="auto",i.style.height=i.scrollHeight+"px"}),o.appendChild(i),v||o.appendChild(b("button",{class:"icon-btn danger",title:"Delete footnote",onclick:()=>Yt(a.id)},"\u{1F5D1}")),t.appendChild(o),requestAnimationFrame(()=>{i.style.height="auto",i.style.height=i.scrollHeight+"px"})}}function Yt(e){g().querySelectorAll(`sup.fn-ref[data-fn="${e}"]`).forEach(s=>s.remove());let n=x();n.footnotes=n.footnotes.filter(s=>s.id!==e),z(),w(),J(),L(),y()}function L(){let e=x(),t=H(e),n=I(l),s=Math.max(1,Math.round(n/Bt));c("#stat-chapter").textContent=`${t.toLocaleString()} words in this chapter`,c("#stat-total").textContent=`${n.toLocaleString()} total`,c("#stat-reading").textContent=`~${s} min read`,f=Y(f,n,E());let a=mt(f,n,E()),o=Number(f.sessionGoal)||0;c("#stat-session").textContent=o?`Today: ${a.toLocaleString()} / ${o.toLocaleString()}`:`Today: ${a.toLocaleString()} words`;let i=o?Math.min(100,Math.round(a/o*100)):0;c("#session-bar").style.width=i+"%",c("#session-bar").classList.toggle("done",o>0&&a>=o)}function nt(){c("#target-manuscript").value=f.manuscriptTarget||"",c("#target-session").value=f.sessionGoal||"";let e=I(l),t=Number(f.manuscriptTarget)||0,n=t?Math.min(100,Math.round(e/t*100)):0;c("#manuscript-bar").style.width=n+"%",c("#manuscript-pct").textContent=t?`${n}% of ${t.toLocaleString()}`:"no target set"}function ht(){let e=parseInt(c("#target-manuscript").value,10),t=parseInt(c("#target-session").value,10);f.manuscriptTarget=Number.isFinite(e)&&e>0?e:0,f.sessionGoal=Number.isFinite(t)&&t>0?t:0,xt(),nt(),L()}function ot(){document.body.classList.toggle("focus-mode",!!m.focusMode),document.body.classList.toggle("typewriter",!!m.typewriter),c("#btn-focus").classList.toggle("on",!!m.focusMode),c("#btn-typewriter").classList.toggle("on",!!m.typewriter),wt(),m.focusMode?it():Lt()}var gt={tight:"0.15em",normal:"0.65em",loose:"1.1em"};function wt(){let e=g();if(!e)return;let t=m.lineSpacing||1.5,n=gt[m.paraSpacing]||gt.tight;e.style.setProperty("--ls",t),e.style.setProperty("--para-gap",n),e.classList.toggle("first-indent",!!m.firstLineIndent),document.querySelectorAll('#format-menu .menu-seg[data-pref="lineSpacing"] button').forEach(a=>a.classList.toggle("on",String(t)===a.dataset.val)),document.querySelectorAll('#format-menu .menu-seg[data-pref="paraSpacing"] button').forEach(a=>a.classList.toggle("on",(m.paraSpacing||"tight")===a.dataset.val));let s=c('#format-menu .menu-toggle[data-pref="firstLineIndent"]');s&&s.classList.toggle("on",!!m.firstLineIndent)}function Z(e,t){m[e]=t,et(),wt(),_()}function bt(){m.focusMode=!m.focusMode,et(),ot(),_()}function Zt(){m.typewriter=!m.typewriter,et(),ot(),m.typewriter&&at()}function st(){let e=window.getSelection();if(!e.rangeCount)return null;let t=e.getRangeAt(0).startContainer;t.nodeType===3&&(t=t.parentNode);let n=g();for(;t&&t!==n&&t.parentNode!==n;)t=t.parentNode;return t&&t!==n?t:null}function Lt(){g().querySelectorAll(".cur-block").forEach(e=>e.classList.remove("cur-block"))}function it(){Lt();let e=st();e&&e.classList&&e.classList.add("cur-block")}function at(){let e=window.getSelection();if(!e.rangeCount)return;let n=e.getRangeAt(0).cloneRange().getBoundingClientRect();if(!n||n.top===0&&n.bottom===0){let i=st();i&&(n=i.getBoundingClientRect())}if(!n)return;let s=c("#editor-scroll"),a=s.clientHeight/2,o=n.top-s.getBoundingClientRect().top-a;s.scrollTop+=o}function vt(){W&&document.activeElement===g()&&(m.focusMode&&it(),m.typewriter&&at())}function Vt(){return l.chapters[0]&&l.chapters[0].title,"Manuscript"}function V(e,t,n){let s=new Blob([t],{type:n}),a=URL.createObjectURL(s),o=b("a",{href:a,download:e});document.body.appendChild(o),o.click(),setTimeout(()=>{document.body.removeChild(o),URL.revokeObjectURL(a)},0)}function Xt(e){w();let t=Vt();e==="md"?V("manuscript.md",dt(l,t),"text/markdown"):e==="txt"?V("manuscript.txt",ut(l,t),"text/plain"):e==="html"&&V("manuscript.html",pt(l,t),"text/html"),U()}function U(e){document.querySelectorAll(".menu.open").forEach(t=>{t!==e&&t.classList.remove("open")})}function te(){let e=c("#app");e.innerHTML=`
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
    </div>
    <button id="exit-focus" title="Exit focus mode">Exit focus</button>
  </main>`,c("#btn-add").addEventListener("click",Ft),c("#chapter-title-input").addEventListener("input",n=>{let s=x();s&&(s.title=n.target.value,k(),y())}),document.querySelectorAll(".fmt").forEach(n=>{n.addEventListener("mousedown",s=>s.preventDefault()),n.addEventListener("click",()=>{n.dataset.cmd?N(n.dataset.cmd):n.dataset.block?N("formatBlock",n.dataset.block):n.dataset.action&&zt(n.dataset.action)})});let t=g();t.addEventListener("input",j),t.addEventListener("keyup",()=>{m.typewriter&&at()}),t.addEventListener("click",vt),t.addEventListener("keydown",n=>{n.key==="Tab"&&(n.preventDefault(),tt(n.shiftKey?-1:1))}),document.addEventListener("selectionchange",vt),c("#btn-format").addEventListener("click",n=>{n.stopPropagation(),U(c("#format-menu")),c("#format-menu").classList.toggle("open")}),c("#format-menu").addEventListener("click",n=>n.stopPropagation()),document.querySelectorAll('#format-menu .menu-seg[data-pref="lineSpacing"] button').forEach(n=>n.addEventListener("click",()=>Z("lineSpacing",parseFloat(n.dataset.val)))),document.querySelectorAll('#format-menu .menu-seg[data-pref="paraSpacing"] button').forEach(n=>n.addEventListener("click",()=>Z("paraSpacing",n.dataset.val))),c('#format-menu .menu-toggle[data-pref="firstLineIndent"]').addEventListener("click",()=>Z("firstLineIndent",!m.firstLineIndent)),c("#target-manuscript").addEventListener("change",ht),c("#target-session").addEventListener("change",ht),c("#btn-focus").addEventListener("click",bt),c("#exit-focus").addEventListener("click",bt),c("#btn-typewriter").addEventListener("click",Zt),c("#btn-export").addEventListener("click",n=>{n.stopPropagation(),U(c("#export-menu")),c("#export-menu").classList.toggle("open")}),document.querySelectorAll("#export-menu button").forEach(n=>n.addEventListener("click",()=>Xt(n.dataset.export))),document.addEventListener("click",U),document.addEventListener("keydown",n=>{(n.metaKey||n.ctrlKey)&&n.key.toLowerCase()==="s"&&(n.preventDefault(),w(),yt())})}function ee(e,t){f=t&&typeof t=="object"?Object.assign({},t):{},l=B(e),v=!!S.default.locked,m=S.default.extensionMeta&&typeof S.default.extensionMeta=="object"?S.default.extensionMeta:{},document.body.classList.toggle("locked",v),kt();let n=JSON.stringify(f.session||null);f=Y(f,I(l),E()),JSON.stringify(f.session||null)!==n&&xt()}function St(){te(),S.default.initialize({debounceSave:350}),S.default.subscribe((e,t)=>{if(e===X){f=t&&typeof t=="object"?Object.assign({},t):f,nt(),L();return}X=G(B(e)),W=!0,ee(e,t)}),setTimeout(()=>{W||(W=!0,l=B(""),l.chapters[0].html="<p>This is a standalone preview. Inside Standard Notes your manuscript loads here automatically.</p>",kt())},1200)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",St):St();})();
