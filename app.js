(()=>{var vt=Object.create;var Y=Object.defineProperty;var bt=Object.getOwnPropertyDescriptor;var St=Object.getOwnPropertyNames;var yt=Object.getPrototypeOf,xt=Object.prototype.hasOwnProperty;var wt=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}};var kt=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of St(t))!xt.call(e,a)&&a!==n&&Y(e,a,{get:()=>t[a],enumerable:!(i=bt(t,a))||i.enumerable});return e};var Tt=(e,t,n)=>(n=e!=null?vt(yt(e)):{},kt(t||!e||!e.__esModule?Y(n,"default",{value:e,enumerable:!0}):n,e));var Z=wt((O,H)=>{(function(e,t){if(typeof O=="object"&&typeof H=="object")H.exports=t();else if(typeof define=="function"&&define.amd)define([],t);else{var n=t();for(var i in n)(typeof O=="object"?O:e)[i]=n[i]}})(self,()=>(()=>{"use strict";var e,t,n={d:(s,o)=>{for(var l in o)n.o(o,l)&&!n.o(s,l)&&Object.defineProperty(s,l,{enumerable:!0,get:o[l]})},o:(s,o)=>Object.prototype.hasOwnProperty.call(s,o)},i={};n.d(i,{default:()=>a}),(function(s){s.StreamContextItem="stream-context-item",s.SaveItems="save-items",s.ComponentRegistered="component-registered",s.ActivateThemes="themes",s.ThemesActivated="themes-activated",s.SetComponentData="set-component-data"})(e||(e={})),(function(s){s.Component="component"})(t||(t={}));let a=new class{constructor(){this.component={activeThemes:[],acceptsThemes:!0},this.sentMessages=[],this.messageQueue=[],this.subscriptions=[],this.generateNotePreview=!0}initialize(s={}){if(this.contentWindow)throw"Cannot initialize mediator more than once";this.contentWindow=window,this.coallesedSavingDelay=s.debounceSave!==void 0?s.debounceSave:250,this.registerMessageHandler(),this.postMessage(e.StreamContextItem,{},o=>{let{item:l}=o;(!this.lastStreamedItem||this.lastStreamedItem.uuid!==l.uuid)&&this.pendingSaveTimeout&&(clearTimeout(this.pendingSaveTimeout),this.performSavingOfItems(this.pendingSaveParams),this.pendingSaveTimeout=void 0,this.pendingSaveParams=void 0),this.lastStreamedItem=l,this.lastStreamedItem.isMetadataUpdate||this.subscriptions.forEach(d=>{d(this.text,this.meta)})})}subscribe(s){return this.subscriptions.push(s),this.lastStreamedItem&&setTimeout(()=>{s(this.text,this.meta)}),()=>{let o=this.subscriptions.indexOf(s);o>=0&&this.subscriptions.splice(o,1)}}get text(){var s,o;return this.checkNoteExists(),((o=(s=this.lastStreamedItem)===null||s===void 0?void 0:s.content)===null||o===void 0?void 0:o.text)||""}get meta(){var s;return this.checkNoteExists(),!((s=this.lastStreamedItem)===null||s===void 0)&&s.content?this.lastStreamedItem.content.appData[this.lastStreamedItem.content.editorIdentifier]:{}}get extensionMeta(){return this.component.data}get locked(){var s,o;return this.checkNoteExists(),(o=(s=this.lastStreamedItem)===null||s===void 0?void 0:s.content)===null||o===void 0?void 0:o.appData["org.standardnotes.sn"].locked}get preview(){var s,o;return this.checkNoteExists(),(o=(s=this.lastStreamedItem)===null||s===void 0?void 0:s.content)===null||o===void 0?void 0:o.preview_plain}set text(s){this.checkNoteExists(),this.lastStreamedItem.content.text=s,this.saveNote(this.lastStreamedItem)}set preview(s){this.checkNoteExists(),this.generateNotePreview=!1,this.lastStreamedItem.content.preview_plain=s}set meta(s){this.checkNoteExists(),this.lastStreamedItem.content.appData[this.lastStreamedItem.content.editorIdentifier]=s,this.saveNote(this.lastStreamedItem)}set extensionMeta(s){this.component.data=s,this.postMessage(e.SetComponentData,{componentData:s})}registerMessageHandler(){this.messageHandler=s=>{let{data:o}=s,l=(d=>{if(typeof d!="string")return!1;try{let p=JSON.parse(d),u=Object.prototype.toString.call(p);return u==="[object Object]"||u==="[object Array]"}catch{return!1}})(o)?JSON.parse(o):o;l&&this.handleMessage(l)},this.contentWindow.document.addEventListener("message",this.messageHandler,!1),this.contentWindow.addEventListener("message",this.messageHandler,!1)}handleMessage(s){var o,l;switch(s.action){case e.ComponentRegistered:this.component.sessionKey=s.sessionKey,s.componentData&&(this.component.data=s.componentData),this.onReady(s.data);break;case e.ActivateThemes:this.activateThemes(s.data.themes);break;default:{if(!s.original)return;let d=(o=this.sentMessages)===null||o===void 0?void 0:o.filter(p=>{var u;return p.messageId===((u=s.original)===null||u===void 0?void 0:u.messageId)})[0];if(!d)return;(l=d?.callback)===null||l===void 0||l.call(d,s.data);break}}}onReady(s){this.component.environment=s.environment,this.component.platform=s.platform,this.component.uuid=s.uuid;for(let o of this.messageQueue)this.postMessage(o.action,o.data,o.callback);this.messageQueue=[],this.activateThemes(s.activeThemeUrls||[]),this.postMessage(e.ThemesActivated,{})}get isRunningInDesktopApplication(){return this.component.environment==="desktop"}get isRunningInMobileApplication(){return this.component.environment==="mobile"}get isRunningInBrowser(){return this.component.environment==="web"}postMessage(s,o,l){if(!this.component.sessionKey)return void this.messageQueue.push({action:s,data:o,api:t.Component,callback:l});let d={action:s,data:o,messageId:this.generateUUID(),sessionKey:this.component.sessionKey,api:t.Component},p=JSON.parse(JSON.stringify(d)),u;p.callback=l,this.sentMessages.push(p),u=this.isRunningInMobileApplication?JSON.stringify(d):d,this.contentWindow.parent.postMessage(u,"*")}activateThemes(s=[]){if(!this.component.acceptsThemes)return;let{activeThemes:o}=this.component;if(o&&o.sort().toString()==s.sort().toString())return;let l=s,d=[];for(let p of o)s.includes(p)?l=l.filter(u=>u!==p):d.push(p);for(let p of d)this.deactivateTheme(p);this.component.activeThemes=s;for(let p of l){if(!p)continue;let u=p.endsWith("/org.standardnotes.theme-focus/index.css")?"https://app.standardnotes.com/components/assets/org.standardnotes.theme-focus/index.css":p,x=this.contentWindow.document.createElement("link");x.id=btoa(p),x.href=u,x.type="text/css",x.rel="stylesheet",x.media="screen,print",x.className="custom-theme",this.contentWindow.document.getElementsByTagName("head")[0].appendChild(x)}this.onThemesChangeCallback&&this.onThemesChangeCallback()}themeElementForUrl(s){return Array.from(this.contentWindow.document.getElementsByClassName("custom-theme")).slice().find(o=>o.id==btoa(s))}deactivateTheme(s){let o=this.themeElementForUrl(s);o&&o.parentNode&&(o.setAttribute("disabled","true"),o.parentNode.removeChild(o))}generateUUID(){return crypto.randomUUID()}get platform(){return this.component.platform}get environment(){return this.component.environment}performSavingOfItems({items:s,callback:o}){this.generateNotePreview&&(s[0].content.preview_plain=((d,p=50)=>d.length<=p?d:d.substring(0,p)+"...")(s[0].content.text));let l=[];for(let d of s)l.push(this.jsonObjectForItem(d));this.postMessage(e.SaveItems,{items:l},()=>{o?.()})}saveNote(s,o){let l=[s];if(this.pendingSaveItems||(this.pendingSaveItems=[]),this.coallesedSavingDelay){this.pendingSaveTimeout&&clearTimeout(this.pendingSaveTimeout);let d=l.map(u=>u.uuid),p=this.pendingSaveItems.filter(u=>!d.includes(u.uuid));this.pendingSaveItems=p.concat(l),this.pendingSaveParams={items:this.pendingSaveItems,callback:o},this.pendingSaveTimeout=setTimeout(()=>{this.performSavingOfItems(this.pendingSaveParams),this.pendingSaveItems=[],this.pendingSaveTimeout=void 0,this.pendingSaveParams=null},this.coallesedSavingDelay)}else this.performSavingOfItems({items:l,callback:o})}jsonObjectForItem(s){let o=Object.assign({},s);return o.children=null,o.parent=null,o}checkNoteExists(){if(!this.lastStreamedItem)throw"Trying to interact with note before it is received from Standard Notes. Use subscribe function."}};return i.default})())});var f=Tt(Z());var I="snbook-v1";function L(){return"c"+Math.random().toString(36).slice(2,9)+Date.now().toString(36).slice(-4)}function j(e){if(!e)return"";let t=String(e);return t=t.replace(/<\s*(br|\/p|\/div|\/h[1-6]|\/li|\/blockquote)\s*>/gi,`
`),t=t.replace(/<[^>]+>/g," "),t=t.replace(/&nbsp;/gi," ").replace(/&amp;/gi,"&").replace(/&lt;/gi,"<").replace(/&gt;/gi,">").replace(/&quot;/gi,'"').replace(/&#39;/gi,"'"),t.replace(/[ \t]{2,}/g," ").replace(/[ \t]+\n/g,`
`).replace(/\n{3,}/g,`

`).trim()}function Ct(e){let t=(e||"").trim();if(!t)return 0;let n=t.match(/[A-Za-z0-9À-ɏЀ-ӿ'’-]+/g);return n?n.length:0}function V(e){return Ct(j(e))}function A(){let e=L();return{format:I,chapters:[{id:e,title:"Chapter 1",html:""}],activeId:e}}function D(e){let t=(e==null?"":String(e)).trim();if(!t)return A();if(t[0]==="{")try{let n=JSON.parse(t);if(n&&n.format===I&&Array.isArray(n.chapters)){let i=n.chapters.filter(s=>s&&typeof s=="object").map(s=>({id:s.id||L(),title:typeof s.title=="string"?s.title:"Untitled",html:typeof s.html=="string"?s.html:""}));if(i.length===0)return A();let a=n.activeId;return i.some(s=>s.id===a)||(a=i[0].id),{format:I,chapters:i,activeId:a}}}catch{}return It(t)}function It(e){let t=L(),n=Lt(e);return{format:I,chapters:[{id:t,title:"Imported text",html:n}],activeId:t}}function U(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Lt(e){return String(e).replace(/\r\n/g,`
`).split(/\n{2,}/).map(n=>{let i=U(n).replace(/\n/g,"<br>");return i.trim()?`<p>${i}</p>`:""}).filter(Boolean).join(`
`)||"<p></p>"}function P(e){return JSON.stringify({format:I,chapters:e.chapters.map(t=>({id:t.id,title:t.title,html:t.html})),activeId:e.activeId})}function T(e){return e.chapters.reduce((t,n)=>t+V(n.html),0)}function $(e){return V(e?e.html:"")}function Mt(e){if(!e)return"";let t=String(e);return t=t.replace(/\r/g,""),t=t.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi,(n,i)=>`
# ${k(i)}

`),t=t.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi,(n,i)=>`
## ${k(i)}

`),t=t.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi,(n,i)=>`
### ${k(i)}

`),t=t.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi,(n,i)=>`
> ${k(i).replace(/\n+/g," ")}

`),t=t.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi,(n,i)=>`- ${k(i)}
`),t=t.replace(/<\/?(ul|ol)[^>]*>/gi,`
`),t=t.replace(/<\/(p|div)>/gi,`

`),t=t.replace(/<(p|div)[^>]*>/gi,""),t=t.replace(/<br\s*\/?>/gi,`  
`),t=k(t),t.replace(/\n{3,}/g,`

`).trim()}function k(e){return String(e).replace(/<(strong|b)[^>]*>([\s\S]*?)<\/(strong|b)>/gi,(t,n,i)=>`**${i}**`).replace(/<(em|i)[^>]*>([\s\S]*?)<\/(em|i)>/gi,(t,n,i)=>`*${i}*`).replace(/<u[^>]*>([\s\S]*?)<\/u>/gi,(t,n)=>n).replace(/<[^>]+>/g,"").replace(/&nbsp;/gi," ").replace(/&amp;/gi,"&").replace(/&lt;/gi,"<").replace(/&gt;/gi,">").replace(/&quot;/gi,'"').replace(/&#39;/gi,"'")}function X(e,t){let n=[];t&&n.push(`# ${t}
`);for(let i of e.chapters){n.push(`
## ${i.title}
`);let a=Mt(i.html);n.push(a?a+`
`:"")}return n.join(`
`).replace(/\n{3,}/g,`

`).trim()+`
`}function tt(e,t){let n=[];t&&n.push(t.toUpperCase()+`
`);for(let i of e.chapters)n.push(`

`+i.title.toUpperCase()+`
`),n.push(j(i.html));return n.join(`
`).replace(/\n{4,}/g,`


`).trim()+`
`}function et(e,t){let n=U(t||"Manuscript"),i=e.chapters.map(a=>`<section>
<h2>${U(a.title)}</h2>
${a.html||"<p></p>"}
</section>`).join(`
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
</style>
</head>
<body>
<h1>${n}</h1>
${i}
</body>
</html>
`}function C(e){let t=e||new Date,n=t.getFullYear(),i=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0");return`${n}-${i}-${a}`}function _(e,t,n){let i=Object.assign({},e||{}),a=n||C();return(!i.session||i.session.date!==a||typeof i.session.startWords!="number")&&(i.session={date:a,startWords:t}),i}function nt(e,t,n){let i=n||C();return e&&e.session&&e.session.date===i&&typeof e.session.startWords=="number"?Math.max(0,t-e.session.startWords):0}var r=A(),m={},h={},F=null,W=!1,v=!1,Et=250,c=e=>document.querySelector(e),g=(e,t={},n=[])=>{let i=document.createElement(e);for(let a in t)a==="class"?i.className=t[a]:a==="html"?i.innerHTML=t[a]:a.startsWith("on")&&typeof t[a]=="function"?i.addEventListener(a.slice(2),t[a]):i.setAttribute(a,t[a]);for(let a of[].concat(n))i.appendChild(typeof a=="string"?document.createTextNode(a):a);return i};function E(){return r.chapters.find(e=>e.id===r.activeId)||r.chapters[0]}var B=null;function b(){v||(B&&clearTimeout(B),B=setTimeout(lt,400))}function lt(){B=null;let e=P(r);F=e,f.default.text=e;let t=E(),n=j(t?t.html:"").slice(0,90)||t?.title||"Manuscript";f.default.preview=n}function dt(){v||(f.default.meta=m)}function pt(){f.default.extensionMeta=h}function ut(){S(),R(),w(),z(),K()}function S(){let e=c("#chapter-list");e.innerHTML="",r.chapters.forEach((t,n)=>{let i=$(t),a=g("div",{class:"chapter-row"+(t.id===r.activeId?" active":""),draggable:v?"false":"true","data-id":t.id});a.appendChild(g("span",{class:"chapter-name"},t.title||"Untitled")),a.appendChild(g("span",{class:"chapter-words"},String(i))),a.addEventListener("click",o=>{o.target.closest(".row-actions")||Ot(t.id)});let s=g("div",{class:"row-actions"});v||(s.appendChild(g("button",{class:"icon-btn",title:"Rename",onclick:o=>{o.stopPropagation(),jt(t.id)}},"\u270E")),s.appendChild(g("button",{class:"icon-btn",title:"Move up",onclick:o=>{o.stopPropagation(),st(n,-1)}},"\u2191")),s.appendChild(g("button",{class:"icon-btn",title:"Move down",onclick:o=>{o.stopPropagation(),st(n,1)}},"\u2193")),s.appendChild(g("button",{class:"icon-btn danger",title:"Delete",onclick:o=>{o.stopPropagation(),Dt(t.id)}},"\u{1F5D1}"))),a.appendChild(s),v||(a.addEventListener("dragstart",o=>{M=t.id,a.classList.add("dragging"),o.dataTransfer.effectAllowed="move"}),a.addEventListener("dragend",()=>{M=null,a.classList.remove("dragging")}),a.addEventListener("dragover",o=>{o.preventDefault(),a.classList.add("drag-over")}),a.addEventListener("dragleave",()=>a.classList.remove("drag-over")),a.addEventListener("drop",o=>{o.preventDefault(),a.classList.remove("drag-over"),Nt(t.id)})),e.appendChild(a)}),c("#total-words").textContent=T(r).toLocaleString()}var M=null;function Nt(e){if(!M||M===e)return;let t=r.chapters.findIndex(a=>a.id===M),n=r.chapters.findIndex(a=>a.id===e);if(t<0||n<0)return;let[i]=r.chapters.splice(t,1);r.chapters.splice(n,0,i),S(),b()}function Ot(e){e!==r.activeId&&(N(),r.activeId=e,S(),R(),b(),J())}function At(){N();let e=L();r.chapters.push({id:e,title:`Chapter ${r.chapters.length+1}`,html:""}),r.activeId=e,S(),R(),b(),J()}function jt(e){let t=r.chapters.find(i=>i.id===e);if(!t)return;let n=window.prompt("Chapter title:",t.title);n!=null&&(t.title=n.trim()||t.title,S(),w(),b())}function st(e,t){let n=e+t;if(n<0||n>=r.chapters.length)return;let i=r.chapters;[i[e],i[n]]=[i[n],i[e]],S(),b()}function Dt(e){if(r.chapters.length===1){window.alert("A manuscript needs at least one chapter.");return}let t=r.chapters.find(i=>i.id===e);if(!window.confirm(`Delete "${t?t.title:"chapter"}"? This cannot be undone.`))return;let n=r.chapters.findIndex(i=>i.id===e);r.chapters.splice(n,1),r.activeId===e&&(r.activeId=r.chapters[Math.max(0,n-1)].id),S(),R(),w(),b()}var y=()=>c("#editor");function R(){let e=E(),t=y();t.innerHTML=e&&e.html?e.html:"<p><br></p>",c("#chapter-title-input").value=e?e.title:"",t.contentEditable=v?"false":"true",w()}function N(){let e=E();e&&(e.html=y().innerHTML)}function mt(){N(),w(),$t(),b(),h.focusMode&&Q()}function $t(){document.querySelectorAll(".chapter-row").forEach(t=>{let n=t.getAttribute("data-id"),i=r.chapters.find(a=>a.id===n);i&&(t.querySelector(".chapter-words").textContent=String($(i)))}),c("#total-words").textContent=T(r).toLocaleString()}function it(e,t=null){v||(y().focus(),document.execCommand(e,!1,t),mt())}function J(){let e=y();e.focus();let t=document.createRange();t.selectNodeContents(e),t.collapse(!1);let n=window.getSelection();n.removeAllRanges(),n.addRange(t)}function w(){let e=E(),t=$(e),n=T(r),i=Math.max(1,Math.round(n/Et));c("#stat-chapter").textContent=`${t.toLocaleString()} words in this chapter`,c("#stat-total").textContent=`${n.toLocaleString()} total`,c("#stat-reading").textContent=`~${i} min read`,m=_(m,n,C());let a=nt(m,n,C()),s=Number(m.sessionGoal)||0;c("#stat-session").textContent=s?`Today: ${a.toLocaleString()} / ${s.toLocaleString()}`:`Today: ${a.toLocaleString()} words`;let o=s?Math.min(100,Math.round(a/s*100)):0;c("#session-bar").style.width=o+"%",c("#session-bar").classList.toggle("done",s>0&&a>=s)}function z(){c("#target-manuscript").value=m.manuscriptTarget||"",c("#target-session").value=m.sessionGoal||"";let e=T(r),t=Number(m.manuscriptTarget)||0,n=t?Math.min(100,Math.round(e/t*100)):0;c("#manuscript-bar").style.width=n+"%",c("#manuscript-pct").textContent=t?`${n}% of ${t.toLocaleString()}`:"no target set"}function ot(){let e=parseInt(c("#target-manuscript").value,10),t=parseInt(c("#target-session").value,10);m.manuscriptTarget=Number.isFinite(e)&&e>0?e:0,m.sessionGoal=Number.isFinite(t)&&t>0?t:0,dt(),z(),w()}function K(){document.body.classList.toggle("focus-mode",!!h.focusMode),document.body.classList.toggle("typewriter",!!h.typewriter),c("#btn-focus").classList.toggle("on",!!h.focusMode),c("#btn-typewriter").classList.toggle("on",!!h.typewriter),h.focusMode?Q():ft()}function at(){h.focusMode=!h.focusMode,pt(),K(),J()}function Wt(){h.typewriter=!h.typewriter,pt(),K(),h.typewriter&&G()}function ht(){let e=window.getSelection();if(!e.rangeCount)return null;let t=e.getRangeAt(0).startContainer;t.nodeType===3&&(t=t.parentNode);let n=y();for(;t&&t!==n&&t.parentNode!==n;)t=t.parentNode;return t&&t!==n?t:null}function ft(){y().querySelectorAll(".cur-block").forEach(e=>e.classList.remove("cur-block"))}function Q(){ft();let e=ht();e&&e.classList&&e.classList.add("cur-block")}function G(){let e=window.getSelection();if(!e.rangeCount)return;let n=e.getRangeAt(0).cloneRange().getBoundingClientRect();if(!n||n.top===0&&n.bottom===0){let o=ht();o&&(n=o.getBoundingClientRect())}if(!n)return;let i=c("#editor-scroll"),a=i.clientHeight/2,s=n.top-i.getBoundingClientRect().top-a;i.scrollTop+=s}function rt(){W&&document.activeElement===y()&&(h.focusMode&&Q(),h.typewriter&&G())}function Bt(){return r.chapters[0]&&r.chapters[0].title,"Manuscript"}function q(e,t,n){let i=new Blob([t],{type:n}),a=URL.createObjectURL(i),s=g("a",{href:a,download:e});document.body.appendChild(s),s.click(),setTimeout(()=>{document.body.removeChild(s),URL.revokeObjectURL(a)},0)}function Rt(e){N();let t=Bt();e==="md"?q("manuscript.md",X(r,t),"text/markdown"):e==="txt"?q("manuscript.txt",tt(r,t),"text/plain"):e==="html"&&q("manuscript.html",et(r,t),"text/html"),gt()}function gt(){document.querySelectorAll(".menu.open").forEach(e=>e.classList.remove("open"))}function Ht(){let e=c("#app");e.innerHTML=`
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
        <button class="fmt" data-cmd="underline" title="Underline"><u>U</u></button>
        <span class="sep"></span>
        <button class="fmt" data-block="h1" title="Heading 1">H1</button>
        <button class="fmt" data-block="h2" title="Heading 2">H2</button>
        <button class="fmt" data-block="p" title="Body text">\xB6</button>
        <button class="fmt" data-block="blockquote" title="Quote">&ldquo;</button>
        <button class="fmt" data-cmd="insertUnorderedList" title="Bullet list">\u2022</button>
      </div>
      <div class="spacer"></div>
      <button id="btn-typewriter" class="btn ghost" title="Typewriter scrolling">Typewriter</button>
      <button id="btn-focus" class="btn ghost" title="Focus mode">Focus</button>
      <div class="menu-wrap">
        <button id="btn-export" class="btn ghost">Export \u25BE</button>
        <div class="menu" id="export-menu">
          <button data-export="md">Markdown (.md)</button>
          <button data-export="html">HTML / Word (.html)</button>
          <button data-export="txt">Plain text (.txt)</button>
        </div>
      </div>
    </div>

    <div id="editor-scroll">
      <div id="editor" spellcheck="true"></div>
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
  </main>`,c("#btn-add").addEventListener("click",At),c("#chapter-title-input").addEventListener("input",n=>{let i=E();i&&(i.title=n.target.value,S(),b())}),document.querySelectorAll(".fmt").forEach(n=>{n.addEventListener("mousedown",i=>i.preventDefault()),n.addEventListener("click",()=>{n.dataset.cmd?it(n.dataset.cmd):n.dataset.block&&it("formatBlock",n.dataset.block)})});let t=y();t.addEventListener("input",mt),t.addEventListener("keyup",()=>{h.typewriter&&G()}),t.addEventListener("click",rt),document.addEventListener("selectionchange",rt),c("#target-manuscript").addEventListener("change",ot),c("#target-session").addEventListener("change",ot),c("#btn-focus").addEventListener("click",at),c("#exit-focus").addEventListener("click",at),c("#btn-typewriter").addEventListener("click",Wt),c("#btn-export").addEventListener("click",n=>{n.stopPropagation(),c("#export-menu").classList.toggle("open")}),document.querySelectorAll("#export-menu button").forEach(n=>n.addEventListener("click",()=>Rt(n.dataset.export))),document.addEventListener("click",gt),document.addEventListener("keydown",n=>{(n.metaKey||n.ctrlKey)&&n.key.toLowerCase()==="s"&&(n.preventDefault(),N(),lt())})}function Ut(e,t){m=t&&typeof t=="object"?Object.assign({},t):{},r=D(e),v=!!f.default.locked,h=f.default.extensionMeta&&typeof f.default.extensionMeta=="object"?f.default.extensionMeta:{},document.body.classList.toggle("locked",v),ut();let n=JSON.stringify(m.session||null);m=_(m,T(r),C()),JSON.stringify(m.session||null)!==n&&dt()}function ct(){Ht(),f.default.initialize({debounceSave:350}),f.default.subscribe((e,t)=>{if(e===F){m=t&&typeof t=="object"?Object.assign({},t):m,z(),w();return}F=P(D(e)),W=!0,Ut(e,t)}),setTimeout(()=>{W||(W=!0,r=D(""),r.chapters[0].html="<p>This is a standalone preview. Inside Standard Notes your manuscript loads here automatically.</p>",ut())},1200)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ct):ct();})();
