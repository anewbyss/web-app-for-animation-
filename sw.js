'use strict';
// The build script injects an asset hash and a complete, relative asset list.
const VERSION = 'flat-22aee1fb024d72d2';
const FILES = ["ContentView.swift", "GENETIC_PROWESS.md", "GITHUB_PAGES.md", "OFFLINE.md", "README.md", "START_HERE.md", "Swift-README.md", "UNREAL_GUIDE.md", "app.js", "apple-touch-icon.png", "forma-studio.zip", "game-core.js", "game-data.js", "game.js", "icon-192.png", "icon-512.png", "import_assets.py", "index.html", "manifest.webmanifest", "maskable-512.png", "offline.js", "soft-particle.tga", "spark.tga", "style.css"];
const BASE = new URL(self.registration.scope);
const PREFIX = 'forma-offline-' + BASE.pathname + '--';
const CACHE = PREFIX + VERSION;
const urls = FILES.map(path=>new URL(path,BASE).href);
const known = new Set(urls);
self.addEventListener('install',event=>{
 event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  try{
   // Fetch each required file before publishing a usable offline installation.
   await Promise.all(urls.map(async url=>{
    const response=await fetch(new Request(url,{cache:'reload',credentials:'same-origin'}));
    if(!response.ok||response.redirected||response.type==='opaque')throw Error('Offline asset unavailable');
    if(!url.endsWith('.html')&&/text\/html/i.test(response.headers.get('content-type')||''))throw Error('Unexpected login page');
    await cache.put(url,response);
   }));
  }catch(error){await caches.delete(CACHE);throw error;}
 })());
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  for(const name of await caches.keys())if(name.startsWith(PREFIX)&&name!==CACHE)await caches.delete(name);
  await self.clients.claim();
 })());
});
self.addEventListener('message',event=>{
 if(event.data?.type==='ACTIVATE_UPDATE')self.skipWaiting();
 if(event.data?.type==='OFFLINE_STATUS')event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);const matches=await Promise.all(urls.map(url=>cache.match(url)));event.ports[0]?.postMessage({ready:matches.every(Boolean),version:VERSION});
 })());
});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==BASE.origin)return;
 const navigation=event.request.mode==='navigate'&&(url.pathname===BASE.pathname||url.pathname===new URL('index.html',BASE).pathname);
 const key=navigation?new URL('index.html',BASE).href:url.href;
 if(!navigation&&!known.has(key))return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);const saved=await cache.match(key);
  if(saved)return saved;
  return fetch(event.request);
 })());
});
