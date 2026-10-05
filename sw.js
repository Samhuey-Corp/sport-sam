/* Cache hors-ligne. Réseau d'abord (les mises à jour arrivent toutes seules),
 * cache en secours quand il n'y a pas de réseau — salle en sous-sol, sortie VTT.
 *
 * ponytail: pas de stratégie par type de fichier, l'app fait 20 Ko en tout.
 * Bump CACHE à chaque déploiement pour purger l'ancienne version.
 */
const CACHE = 'sport-sam-v5';
const FICHIERS = ['./', './index.html', './seances.js', './manifest.webmanifest'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then((r) => {
        const copie = r.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copie));
        return r;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
