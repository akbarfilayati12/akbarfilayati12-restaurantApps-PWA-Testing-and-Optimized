import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

// Precache assets
precacheAndRoute(self.__WB_MANIFEST || []);

// Cache API responses
registerRoute(
  ({ url }) => url.origin === 'https://restaurant-api.dicoding.dev',
  new NetworkFirst({
    cacheName: 'restaurant-api-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
      }),
    ],
  })
);

// Cache images
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
      }),
    ],
  })
);

// Cache static assets
registerRoute(
  ({ request }) => ['style', 'script', 'document'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'static-assets-cache',
  })
);

// Listen for 'install'
self.addEventListener('install', () => {
  self.skipWaiting();
});

// Activate new service worker version
self.addEventListener('activate', () => {
  self.clients.claim();
});

// Handle fetch events
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/detail/')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).catch(() => {
          return new Response(
            JSON.stringify({
              error: 'offline',
              message: 'Data tidak dapat dimuat karena Anda sedang offline.',
            }),
            { headers: { 'Content-Type': 'application/json' } }
          );
        });
      })
    );
  }
});
