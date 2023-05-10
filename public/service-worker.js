// service-worker.js
self.addEventListener('install', (event) => {
    console.log('Service worker installed');
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service worker activated');
  });
  
  self.addEventListener('fetch', (event) => {
    // Ignore POST requests and requests with 'chrome-extension' scheme
    if (
      event.request.method === 'POST' ||
      event.request.url.startsWith('chrome-extension')
    ) {
      event.respondWith(fetch(event.request));
    } else {
      event.respondWith(
        caches.match(event.request).then((response) => {
          return (
            response ||
            fetch(event.request)
              .then((res) => {
                return caches.open('cache').then((cache) => {
                  cache.put(event.request.url, res.clone());
                  return res;
                });
              })
              .catch((err) => console.log(err))
          );
        })
      );
    }
  });
  