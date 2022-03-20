const APP_PREFIX = 'budget-';     
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;


const FILES_TO_CACHE = [
    './index.html',
    './public/css/styles.css',
    './public/icons/icon-72x72.png',
    './public/icons/icon-96x96.png',
    './public/icons/icon-128x128.png',
    './public/icons/icon-144x144.png',
    './public/icons/icon-152x152.png',
    './public/icons/icon-192x192.png',
    './public/icons/icon-384x384.png',
    './public/icons/icon-512x512.png',
    './public/js/idb.js',
    './public/js/index.js'
];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
          console.log('installing cache : ' + CACHE_NAME)
          return cache.addAll(FILES_TO_CACHE)
        })
      )

});