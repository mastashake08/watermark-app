if(!self.define){let e,t={};const n=(n,i)=>(n=new URL(n+".js",i).href,t[n]||new Promise((t=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=t,document.head.appendChild(e)}else e=n,importScripts(n),t()})).then((()=>{let e=t[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,s)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(t[r])return;let o={};const d=e=>n(e,r),u={module:{uri:r},exports:o,require:d};t[r]=Promise.all(i.map((e=>u[e]||d(e)))).then((e=>(s(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"_nuxt/builds/latest.json",revision:"eb68c6296afa0e54495bfe975d266eae"},{url:"_nuxt/builds/meta/0cf8179b-174b-4b40-84d6-c9cde2d5b474.json",revision:null},{url:"manifest.webmanifest",revision:"de369ad77fa3f868d7b524e837782fda"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/watermark-app/")))}));
