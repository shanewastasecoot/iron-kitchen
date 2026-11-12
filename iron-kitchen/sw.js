// Network-first service worker: always tries for fresh files, falls back to
// the cached copy when offline (e.g. in the grocery store).
// Bump VERSION if you ever need to force-clear old caches.
const VERSION = "ik-v3";
const SHELL = ["./", "index.html", "app.js", "data/catalog.js", "recipes/index.js", "manifest.webmanifest", "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png"];

self.addEventListener("install", e => {
  // Cache the app shell plus every recipe file, so it all works offline from day one.
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await c.addAll(SHELL);
    const list = await (await fetch("recipes/index.js", { cache: "no-store" })).text();
    const names = [...list.matchAll(/^\s*"([a-z0-9-]+)",?\s*$/gm)].map(m => `recipes/${m[1]}.js`);
    await c.addAll(names);
    await self.skipWaiting();
  })());
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match("index.html")))
  );
});
