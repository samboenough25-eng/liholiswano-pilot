const CACHE_NAME = "liholiswano-v1";
const CORE_ASSETS = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first for the API and any dynamic calls; cache-first for the app shell.
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  const isAppShell = CORE_ASSETS.some((asset) => url.pathname.endsWith(asset.replace("./", "")));
  if (isAppShell) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
  }
  // All other requests (API calls) go straight to the network — group data must stay live.
});
