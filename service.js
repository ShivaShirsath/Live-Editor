const cacheName = "codechache";
const staticAssets = [
  ".",
  "index.html",
  "css/style.css",
  "js/script.js",
  "index.js",
  "service.js",
  "codemirror/lib/codemirror.css",
  "codemirror/theme/darcula.css",
  "manifest.webmanifest",
  "js/jquery.min.js",
  "codemirror/lib/codemirror.js",
  "codemirror/mode/xml/xml.js",
  "codemirror/mode/css/css.js",
  "codemirror/mode/javascript/javascript.js",
  "codemirror/addon/edit/closebrackets.js",
  "codemirror/addon/edit/closetag.js",
  "codemirror/addon/edit/continuelist.js",
  "codemirror/addon/edit/matchbrackets.js",
  "codemirror/addon/edit/matchtags.js",
  "codemirror/addon/edit/trailingspace.js",
  "favicon_io/apple-touch-icon.png",
  "favicon_io/favicon-32x32.png",
  "favicon_io/favicon-16x16.png",
  "favicon_io/site.webmanifest",
];

self.addEventListener("install", async (e) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  self.clients.claim();
});

self.addEventListener("fetch", async (e) => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}
