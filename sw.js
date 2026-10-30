// غيّر رقم النسخة كل ما تحدّث الملفات حتى يتحدّث التطبيق عند الزبائن
const V="raihan-v9",SHELL=["./","index.html","config.js","manifest.json","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>Promise.allSettled(SHELL.map(u=>c.add(u)))).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==V).map(n=>caches.delete(n)))).then(()=>self.clients.claim()));});
// الشبكة أولاً (حتى تظهر التعديلات الجديدة)، وإذا ما كو إنترنت يفتح من الذاكرة
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put(r,c));return res;}).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))));
});
