const CACHE_NAME = 'wallet7-v1';
const RUNTIME_CACHE = 'wallet7-runtime';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/login',
  '/register',
  '/admin',
  '/member',
  '/manifest.json',
  '/icons/app-icons/android-icon-192x192.png',
  '/icons/app-icons/android-icon-144x144.png',
  '/icons/app-icons/android-icon-96x96.png',
  '/icons/app-icons/android-icon-72x72.png',
  '/icons/app-icons/android-icon-48x48.png',
  '/icons/app-icons/android-icon-36x36.png',
  '/icons/app-icons/favicon-32x32.png',
  '/icons/app-icons/favicon-16x16.png',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[ServiceWorker] Cache failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              console.log('[ServiceWorker] Removing old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other protocols
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then((cache) => {
        return fetch(request)
          .then((response) => {
            // Clone the response before caching
            const responseClone = response.clone();
            cache.put(request, responseClone);
            return response;
          })
          .catch(() => {
            // Return cached version if network fails
            return cache.match(request);
          });
      })
    );
    return;
  }

  // Handle page requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          return response;
        })
        .catch(() => {
          // Return offline page or cached index for SPA
          return caches.match('/') || caches.match('/offline.html');
        })
    );
    return;
  }

  // Handle static assets
  event.respondWith(
    caches
      .match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request).then((response) => {
          // Don't cache non-successful responses
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });

          return response;
        });
      })
      .catch(() => {
        // Fallback for images
        if (request.destination === 'image') {
          return caches.match('/icons/app-icons/android-icon-192x192.png');
        }
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'payment-sync') {
    event.waitUntil(
      // Handle offline payment submissions
      handleOfflinePayments()
    );
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: '/icons/app-icons/android-icon-192x192.png',
    badge: '/icons/app-icons/android-icon-96x96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: 'explore',
        title: 'View',
        icon: '/icons/app-icons/android-icon-96x96.png',
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/app-icons/android-icon-96x96.png',
      },
    ],
  };

  event.waitUntil(self.registration.showNotification('Wallet7', options));
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[ServiceWorker] Notification click received.');

  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(clients.openWindow('/'));
  }
});

// Helper function to handle offline payments
async function handleOfflinePayments() {
  try {
    // Get offline payment data from IndexedDB
    const offlinePayments = await getOfflinePayments();

    for (const payment of offlinePayments) {
      try {
        const response = await fetch('/api/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payment),
        });

        if (response.ok) {
          // Remove from offline storage
          await removeOfflinePayment(payment.id);
        }
      } catch (error) {
        console.error('Failed to sync payment:', error);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Placeholder functions for IndexedDB operations
async function getOfflinePayments() {
  // Implement IndexedDB logic to get offline payments
  return [];
}

async function removeOfflinePayment(paymentId) {
  // Implement IndexedDB logic to remove synced payment
  console.log('Removing offline payment:', paymentId);
}
