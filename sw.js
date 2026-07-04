const CACHE_NAME = 'runflow-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Installeer de service worker en sla bestanden op in de cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Zorg dat de app bestanden uit de cache haalt als er geen internet is
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
