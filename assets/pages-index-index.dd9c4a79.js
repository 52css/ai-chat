import{r as e,o as t,a as o,d as n,b as r,c as s,w as i,e as a,f as l,g as c,F as h,n as d,u,i as p,S as m,I as y,h as g,t as b,j as f,k as w,l as v}from"./index-6a9a093f.js";function T(e){let t,o,n,r=!1;return function(s){void 0===t?(t=s,o=0,n=-1):t=function(e,t){const o=new Uint8Array(e.length+t.length);return o.set(e),o.set(t,e.length),o}(t,s);const i=t.length;let a=0;for(;o<i;){r&&(10===t[o]&&(a=++o),r=!1);let s=-1;for(;o<i&&-1===s;++o)switch(t[o]){case 58:-1===n&&(n=o-a);break;case 13:r=!0;case 10:s=o}if(-1===s)break;e(t.subarray(a,s),n),a=o,n=-1}a===i?t=void 0:0!==a&&(t=t.subarray(a),o-=a)}}var S=globalThis&&globalThis.__rest||function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(o[n[r]]=e[n[r]])}return o};const O="text/event-stream",A="last-event-id";function _(e,t){var{signal:o,headers:n,onopen:r,onmessage:s,onclose:i,onerror:a,openWhenHidden:l,fetch:c}=t,h=S(t,["signal","headers","onopen","onmessage","onclose","onerror","openWhenHidden","fetch"]);return new Promise(((t,d)=>{const u=Object.assign({},n);let p;function m(){p.abort(),document.hidden||v()}u.accept||(u.accept=O),l||document.addEventListener("visibilitychange",m);let y=1e3,g=0;function b(){document.removeEventListener("visibilitychange",m),window.clearTimeout(g),p.abort()}null==o||o.addEventListener("abort",(()=>{b(),t()}));const f=null!=c?c:window.fetch,w=null!=r?r:k;async function v(){var o;p=new AbortController;try{const o=await f(e,Object.assign(Object.assign({},h),{headers:u,signal:p.signal}));await w(o),await async function(e,t){const o=e.getReader();let n;for(;!(n=await o.read()).done;)t(n.value)}(o.body,T(function(e,t,o){let n={data:"",event:"",id:"",retry:void 0};const r=new TextDecoder;return function(s,i){if(0===s.length)null==o||o(n),n={data:"",event:"",id:"",retry:void 0};else if(i>0){const o=r.decode(s.subarray(0,i)),a=i+(32===s[i+1]?2:1),l=r.decode(s.subarray(a));switch(o){case"data":n.data=n.data?n.data+"\n"+l:l;break;case"event":n.event=l;break;case"id":e(n.id=l);break;case"retry":const o=parseInt(l,10);isNaN(o)||t(n.retry=o)}}}}((e=>{e?u[A]=e:delete u[A]}),(e=>{y=e}),s))),null==i||i(),b(),t()}catch(n){if(!p.signal.aborted)try{const e=null!==(o=null==a?void 0:a(n))&&void 0!==o?o:y;window.clearTimeout(g),g=window.setTimeout(v,e)}catch(r){b(),d(r)}}}v()}))}function k(e){const t=e.headers.get("content-type");if(!(null==t?void 0:t.startsWith(O)))throw new Error(`Expected content-type to be ${O}, Actual: ${t}`)}class C{constructor(e=null,t=null,o=6e4,n="2023-07-01-preview",r={"gpt-3.5-turbo":"GPT35","gpt-3.5-turbo-0301":"GPT35","gpt-3.5-turbo-0613":"GPT35","gpt-3.5-16k":"GPT35-16K","gpt-3.5-16k-0613":"GPT35-16K","gpt-4":"GPT4","text-embedding-ada-002":"EBD002"}){this.key=e,this.apiBaseUrl=t||(e&&e.startsWith("fk")?"https://oa.api2d.net":"https://api.openai.com"),this.deployments=r,this.version=n,this.apiBaseUrl.includes("openai.azure.com")?(this.by="azure",this.authHeader={"api-key":this.key}):(this.by=e.startsWith("fk")?"api2d":"openai",this.authHeader={Authorization:"Bearer "+this.key}),this.timeout=o,this.controller=new AbortController}setKey(e){this.key=e}setApiBaseUrl(e){this.apiBaseUrl=e}setTimeout(e){this.timeout=parseInt(e)||6e4}abort(){this.controller.abort(),this.controller=new AbortController}api2dOnly(e=!1){if(e){if("api2d"!=this.by&&"openai"!=this.by)throw new Error("Only support api2d")}else if("api2d"!=this.by)throw new Error("Only support api2d")}buildUrlByModel(e){if(console.log("model",e),"azure"==this.by){const t=this.deployments[e]||"GPT35";return String(e).toLowerCase().startsWith("text-embedding")?this.apiBaseUrl+"/openai/deployments/"+t+"/embeddings?api-version="+this.version:this.apiBaseUrl+"/openai/deployments/"+t+"/chat/completions?api-version="+this.version}return String(e).toLowerCase().startsWith("text-embedding")?this.apiBaseUrl+"/v1/embeddings":this.apiBaseUrl+"/v1/chat/completions"}async completion(e){const t={"Content-Type":"application/json",...this.authHeader},{onMessage:o,onEnd:n,model:r,noCache:s,...i}=e,a=this.buildUrlByModel(r||"gpt-3.5-turbo"),l="azure"==this.by?{}:{model:r||"gpt-3.5-turbo"};if(s&&(t["x-api2d-no-cache"]=1),i.stream&&o)return new Promise((async(e,r)=>{try{let s="";const c=setTimeout((()=>{this.controller.abort(),this.controller=new AbortController,r(new Error(`[408]:Timeout by ${this.timeout} ms`))}),this.timeout);await _(a,{signal:this.controller.signal,method:"POST",headers:{...t,Accept:"text/event-stream"},body:JSON.stringify({...i,...l}),async onopen(e){if(200!=e.status)throw new Error(`[${e.status}]:${e.statusText}`)},onmessage:t=>{if(c&&clearTimeout(c),"[DONE]"==t.data)n&&n(s),e(s);else{const r=JSON.parse(t.data);if(r.error)throw new Error(r.error.message);if(r.choices&&r.choices.length>0)if(r.choices[0].finish_reason)n&&n(s),e(s);else{const e=r.choices[0].delta.content;e&&(s+=e,o&&o(s,e))}}},onerror:e=>{console.log(e);let t=String(e);if(t&&t.match(/\[(\d+)\]/)){const e=t.match(/\[(\d+)\]/);t=`[${e[1]}]:${t}`}throw new Error(t)}})}catch(s){console.log(s),r(s)}}));{const e=setTimeout((()=>{this.controller.abort(),this.controller=new AbortController}),this.timeout),o=await fetch(a,{signal:this.controller.signal,method:"POST",headers:t,body:JSON.stringify({...i,...l})}),n=await o.json();return clearTimeout(e),n}}async completionWithRetry(e,t=2){return new Promise(((o,n)=>{try{this.completion(e).then(o).catch((r=>{console.log("error in completion",r),t>0&&String(r).includes("retry")?setTimeout((()=>{this.completionWithRetry(e,t-1).then(o).catch(n)}),1e3):(console.log("error in completion",r),n(r))}))}catch(r){console.log("error in completion",r)}}))}async embeddings(e){const t={"Content-Type":"application/json",...this.authHeader},{model:o,...n}=e,r="azure"==this.by?{}:{model:o||"text-embedding-ada-002"},s=this.buildUrlByModel(o||"text-embedding-ada-002"),i=setTimeout((()=>{this.controller.abort(),this.controller=new AbortController}),this.timeout),a=await fetch(s,{signal:this.controller.signal,method:"POST",headers:t,body:JSON.stringify({...n,...r})}),l=await a.json();return clearTimeout(i),l}async billing(){this.api2dOnly(!0);const e=this.apiBaseUrl+"/dashboard/billing/credit_grants",t={"Content-Type":"application/json",Authorization:"Bearer "+this.key},o=await fetch(e,{signal:this.controller.signal,method:"GET",headers:t}),n=setTimeout((()=>{this.controller.abort(),this.controller=new AbortController}),this.timeout),r=await o.json();return clearTimeout(n),r}async vectorSave(e){this.api2dOnly();const{text:t,embedding:o,uuid:n,meta:r}=e,s=this.apiBaseUrl+"/vector",i={"Content-Type":"application/json",Authorization:"Bearer "+this.key},a=await fetch(s,{signal:this.controller.signal,method:"POST",headers:i,body:JSON.stringify({text:t,uuid:n||"",embedding:o,meta:r||""})}),l=setTimeout((()=>{this.controller.abort(),this.controller=new AbortController}),this.timeout),c=await a.json();return clearTimeout(l),c}async vectorSearch(e){this.api2dOnly();const{searchable_id:t,embedding:o,topk:n}=e,r=this.apiBaseUrl+"/vector/search",s={"Content-Type":"application/json",Authorization:"Bearer "+this.key},i=setTimeout((()=>{this.controller.abort(),this.controller=new AbortController}),this.timeout),a=await fetch(r,{signal:this.controller.signal,method:"POST",headers:s,body:JSON.stringify({searchable_id:t,embedding:o,topk:n||1})}),l=await a.json();return clearTimeout(i),l}async vectorDelete(e){this.api2dOnly();const{uuid:t}=e,o=this.apiBaseUrl+"/vector/delete",n={"Content-Type":"application/json",Authorization:"Bearer "+this.key},r=setTimeout((()=>{this.controller.abort(),this.controller=new AbortController}),this.timeout),s=await fetch(o,{signal:this.controller.signal,method:"POST",headers:n,body:JSON.stringify({uuid:t})}),i=await s.json();return clearTimeout(r),i}async vectorDeleteAll(){this.api2dOnly();const e=this.apiBaseUrl+"/vector/delete-all",t={"Content-Type":"application/json",Authorization:"Bearer "+this.key},o=setTimeout((()=>{this.controller.abort(),this.controller=new AbortController}),this.timeout),n=await fetch(e,{signal:this.controller.signal,method:"POST",headers:t,body:JSON.stringify({})}),r=await n.json();return clearTimeout(o),r}async textToSpeech(e){this.api2dOnly();const{text:t,voiceName:o,responseType:n,output:r,speed:s}=e,i=this.apiBaseUrl+"/azure/tts",a={"Content-Type":"application/json",Authorization:"Bearer "+this.key},l=setTimeout((()=>{this.controller.abort(),this.controller=new AbortController}),this.timeout),c=fetch(i,{signal:this.controller.signal,method:"POST",headers:a,body:JSON.stringify({text:t,voiceName:o,speed:s})}).then((e=>{const t=e.body.getReader();return new ReadableStream({start:e=>function o(){return t.read().then((({done:t,value:n})=>{if(!t)return e.enqueue(n),o();e.close()}))}()})})).then((e=>new Response(e))).then((e=>e.blob())),h=(d=document.createElement("a"),document.body.appendChild(d),d.style="display: none",function(e,t){var o=window.URL.createObjectURL(e);d.href=o,d.download=t,d.click(),window.URL.revokeObjectURL(o)});var d;if("file"===n){const e=c.then((e=>h(e,r)));return clearTimeout(l),e}if("blob"===n){const e=c;return clearTimeout(l),e}if("blob-url"===n){const e=c.then((e=>window.URL.createObjectURL(e)));return clearTimeout(l),e}throw new Error("responseType must be file, blob or blob-url")}async speechToText(e){this.api2dOnly();const{file:t,language:o,moderation:n,moderation_stop:r}=e,s=this.apiBaseUrl+"/azure/stt",i={"Content-Type":"multipart/form-data",Authorization:"Bearer "+this.key},a=new FormData;a.set("language",o),a.set("moderation",n),a.set("moderation_stop",r),a.set("file",t);const l=setTimeout((()=>{this.controller.abort(),this.controller=new AbortController}),this.timeout),c=await axios.post(s,a,{headers:i,signal:this.controller.signal});return clearTimeout(l),c.data}async request(e){this.api2dOnly();const{url:t,method:o,headers:n,body:r,path:s,data:i}=e,a=setTimeout((()=>{this.controller.abort(),this.controller=new AbortController}),this.timeout),l=s?this.apiBaseUrl+"/"+s:t,c=i?JSON.stringify(i):r;let h={signal:this.controller.signal,method:o||"GET",headers:{...n||{},"Content-Type":"application/json",Authorization:"Bearer "+this.key}};["GET","HEAD"].includes(o.toUpperCase())||(h.body=c);const d=await fetch(l,h);console.log(l,h,d);const u=await d.json();return clearTimeout(a),u}}const E=((e,t)=>{const o=e.__vccOpts||e;for(const[n,r]of t)o[n]=r;return o})(n({__name:"index",setup(n){const{height:T}=function(n={}){const r=e((null==n?void 0:n.height)||0);let s=window.visualViewport;return t((()=>{let e=!1;function t(t){e||(e=!0,requestAnimationFrame((()=>{e=!1,r.value=s.offsetTop})))}s.addEventListener("scroll",t),s.addEventListener("resize",t);var i=0,a=-1/0;function l(e){const t=n.tapSelector&&Array.from(document.querySelectorAll(n.tapSelector)),o=t&&t.some((t=>t.contains(e.target))),r=n.yScrollSelector&&Array.from(document.querySelectorAll(n.yScrollSelector)),s=r&&r.find((t=>t.contains(e.target))),l=n.xScrollSelector&&Array.from(document.querySelectorAll(n.xScrollSelector)),c=l&&l.find((t=>t.contains(e.target)));o||c||(s?(i=e.changedTouches[0].clientY,a=s.clientHeight-s.scrollHeight+1):e.preventDefault())}function c(e){const t=n.yScrollSelector&&Array.from(document.querySelectorAll(n.yScrollSelector)),o=t&&t.find((t=>t.contains(e.target))),r=e.changedTouches[0].clientY-i,s=n.xScrollSelector&&Array.from(document.querySelectorAll(n.xScrollSelector)),l=s&&s.find((t=>t.contains(e.target)));if(e.stopPropagation(),l);else if(o){var c=o.scrollTop;o.clientHeight,o.scrollHeight;const t="TEXTAREA"===o.tagName;r>0?(t?c<=0:c<a)&&e.preventDefault():r<0&&(t?c>=Math.abs(a):0===c)&&e.preventDefault()}else e.preventDefault()}window.addEventListener("touchstart",l,{passive:!1}),window.addEventListener("touchmove",c,{passive:!1}),o((()=>{s.removeEventListener("scroll",t),s.removeEventListener("resize",t),window.removeEventListener("touchstart",l),window.removeEventListener("touchmove",c)}))})),{height:r}}({height:0,tapSelector:".input",yScrollSelector:".message",xScrollSelector:".tip"}),S=e([{type:"system",content:"你好，我是小助手，有什么可以帮到你的吗？"}]),O=e([{type:"system",content:"讲个笑话"},{type:"system",content:"音乐推荐"}]),A=e(!1),_=v(),k=e(0),E=()=>{f().in(_).select(".message__list").boundingClientRect((e=>{w((()=>{k.value=e.height+100}))})).exec()},x=new C("fk211166-MyLi1GKk3wYQoIMlsN3KMMmqtvr19HZW","https://openai.api2d.net/");return(e,t)=>{const o=p,n=m,f=y;return r(),s(o,{class:"container",style:d({"--margin-top":u(T)+"px"})},{default:i((()=>[a(o,{class:"girl"}),a(n,{class:"message","scroll-y":"","scroll-with-animation":"","scroll-top":k.value},{default:i((()=>[a(o,{class:"message__list"},{default:i((()=>[(r(!0),l(h,null,c(S.value,(e=>(r(),s(o,{class:"message__item","data-type":e.type},{default:i((()=>[g("div",{class:"message__content"},b(e.content),1)])),_:2},1032,["data-type"])))),256))])),_:1})])),_:1},8,["scroll-top"]),a(n,{class:"tip","scroll-x":""},{default:i((()=>[a(o,{class:"tip__list"},{default:i((()=>[(r(!0),l(h,null,c(O.value,((e,t)=>(r(),s(o,{key:t,class:"tip__item",onClick:t=>(async e=>{if(A.value)return;A.value=!0,console.log("开始聊天",e),S.value.push({type:"user",content:e}),S.value.push({type:"system",content:"..."});const t=await x.completion({model:"gpt-3.5-turbo",messages:[{role:"user",content:e}],stream:!0,onMessage:e=>{S.value[S.value.length-1].content=e+"...",E()},onEnd:e=>{S.value[S.value.length-1].content=e,E(),A.value=!1}});console.log("ret",t)})(e.content)},{default:i((()=>[g("div",{class:"tip__content"},b(e.content),1)])),_:2},1032,["onClick"])))),128))])),_:1})])),_:1}),a(f,{class:"input",disabled:A.value,placeholder:"来和晓晓聊聊天吧","placeholder-class":"placeholder"},null,8,["disabled"])])),_:1},8,["style"])}}}),[["__scopeId","data-v-ac958fa0"]]);export{E as default};
