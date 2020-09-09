const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'style.css',
    'script.js',
    '/img/bgImg.jpg'
]

// call install event

self.addEventListener('install', e => {
    console.log('Service Worker: Installed');

    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log('Service Worker: Caching Files');
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    )
})

// call active event
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    // remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheName => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        console.log('Service worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// call fetch event
self.addEventListener('fetch', e => {
    console.log('Service worker: Fetching');
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});