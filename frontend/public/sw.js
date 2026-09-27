/* Atlas service worker — hand-written, honest, versioned.
 *
 * Replaces both earlier attempts:
 *   1. the next-pwa/workbox precache SW (cached dead chunk hashes, served a
 *      stale app — purged via /unregister-sw) — next-pwa is fully removed
 *      from next.config.js so no build ever regenerates this file;
 *   2. the minimal network-first stub (never cached story content).
 *
 * Caching strategy:
 *   - app shell: /offline fallback page (+ its static chunks), manifest,
 *     icons — precached at install;
 *   - static (/_next/static, /icons, /data incl. game JSONs, fonts, images):
 *     stale-while-revalidate;
 *   - navigations + RSC payloads: network-first into cache (fresh online,
 *     cached copy offline);
 *   - /api GETs: network-first into cache with graceful fallbacks — a cached
 *     copy when one exists, the /offline page for navigations, an honest 503
 *     JSON otherwise. POSTs are never touched (nothing faked).
 *
 * Story Mode payloads live in their own persistent cache (`atlas-stories-v1`)
 * written by the page (lib/offlineLibrary.pinStory) when a student opens a
 * story online — so downloaded stories survive SW version bumps.
 *
 * Bump VERSION whenever offline behavior changes. Old atlas-* caches are
 * swept on activate; the story library cache is never swept.
 *
 * v3.2026.09.20.1: every cache.match() below passes { ignoreSearch: true }.
 * Dev builds stamp static URLs with ?v=<ts> query params, and both asset
 * sweeps store normalized (query-stripped) keys — after a VERSION bump the
 * versioned runtime cache is swept and only those normalized pins remain,
 * so strict URL matching served 504s for chunks that were actually pinned.
 * ignoreSearch makes lookups hit the pinned copy regardless of query drift
 * and is a no-op for production's content-hashed, query-less URLs.
 */
const VERSION = 'v3.2026.09.20.1'

const SHELL_CACHE = `atlas-shell-${VERSION}`
const RUNTIME_CACHE = `atlas-runtime-${VERSION}`
const API_CACHE = `atlas-api-${VERSION}`
const PAGES_CACHE = `atlas-pages-${VERSION}`
// Version-INDEPENDENT: pinned stories must survive SW updates.
const STORIES_CACHE = 'atlas-stories-v1'

const OFFLINE_URL = '/offline'
const PRECACHE_URLS = [
  OFFLINE_URL,
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
]

const API_CACHE_LIMIT = 150
const PAGES_CACHE_LIMIT = 60

const STATIC_PATTERNS = [
  /^\/_next\/static\//,
  /^\/icons\//,
  /^\/data\//, // game JSONs, galaxy.json, sims data — served stale-while-revalidate
  /\.(?:css|js|mjs|woff2?|ttf|png|jpe?g|gif|svg|webp|avif|ico)$/i,
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const shell = await caches.open(SHELL_CACHE)
      // Precache the offline fallback page, then sweep in the static chunk
      // URLs it references so the fallback page actually hydrates offline.
      // Every step is best-effort: a partial shell must not break installs.
      for (const url of PRECACHE_URLS) {
        try {
          const res = await fetch(url)
          if (res.ok) await shell.put(url, await storeable(res))
        } catch { /* best-effort */ }
      }
      try {
        const res = await shell.match(OFFLINE_URL)
        if (res) {
          const html = await res.text()
          const urls = new Set(
            html.match(/\/_next\/static\/[^"']+\.(?:js|css)/g) || []
          )
          const rt = await caches.open(RUNTIME_CACHE)
          await Promise.all(
            [...urls].slice(0, 80).map(async (u) => {
              try {
                const r = await fetch(u)
                if (r.ok) await rt.put(u, r)
              } catch { /* best-effort */ }
            })
          )
        }
      } catch { /* best-effort */ }
      await self.skipWaiting()
    })()
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([SHELL_CACHE, RUNTIME_CACHE, API_CACHE, PAGES_CACHE, STORIES_CACHE])
      const names = await caches.keys()
      await Promise.all(
        names
          .filter(
            (n) =>
              !keep.has(n) &&
              (/^workbox-/.test(n) ||
                /^atlas-(shell|runtime|api|pages)-/.test(n) ||
                n === 'atlas-v1')
          )
          .map((n) => caches.delete(n))
      )
      await self.clients.claim()
    })()
  )
})

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting()
  if (event.data && event.data.type === 'GET_VERSION') {
    event.source && event.source.postMessage({ type: 'VERSION', version: VERSION })
  }
})

// ─── helpers ────────────────────────────────────────────────────────────────

/** Re-wrap a response without the directives that break offline reuse.
 *  - Cache-Control: no-store — Cache Storage refuses to persist such
 *    responses verbatim (Next dev serves no-store everywhere); the SW owns
 *    retention here, so the directive is stripped before the explicit put.
 *  - Content-Encoding / Content-Length: fetch() hands us the DECODED body
 *    while the headers still say "br"/"gzip" — storing that pair makes the
 *    browser fail to decode on later offline reads. Both are stripped. */
async function storeable(res) {
  if (!res) return res
  try {
    const body = await res.clone().arrayBuffer()
    const headers = new Headers(res.headers)
    headers.delete('cache-control')
    headers.delete('clear-site-data')
    headers.delete('content-encoding')
    headers.delete('content-length')
    return new Response(body, {
      status: res.status,
      statusText: res.statusText,
      headers,
    })
  } catch {
    return res
  }
}

/** Serve a cache hit, sanitizing entries stored before the encoding strip
 *  (defense in depth for older pins: decode-safe delivery regardless of what
 *  metadata went in). */
async function serveCached(hit) {
  if (!hit) return hit
  if (!hit.headers.has('content-encoding')) return hit
  try {
    const body = await hit.arrayBuffer()
    const headers = new Headers(hit.headers)
    headers.delete('content-encoding')
    headers.delete('content-length')
    return new Response(body, { status: hit.status, statusText: hit.statusText, headers })
  } catch {
    return hit
  }
}

async function trimCache(name, max) {
  try {
    const cache = await caches.open(name)
    let keys = await cache.keys()
    while (keys.length > max) {
      await cache.delete(keys[0])
      keys = await cache.keys()
    }
  } catch { /* best-effort */ }
}

function cacheable(res) {
  return res && res.ok && res.type !== 'opaque' && !res.headers.has('range')
}

const OFFLINE_JSON = JSON.stringify({
  detail: "You're offline. Showing saved content — this action needs a connection.",
  offline: true,
})

function offlineResponse() {
  return new Response(OFFLINE_JSON, {
    status: 503,
    headers: { 'Content-Type': 'application/json' },
  })
}

// ─── strategies ─────────────────────────────────────────────────────────────

/** When a story's enrichment payload is served, pin the story page document
 *  plus the static assets it references (SW-side, so it survives the student
 *  navigating away mid-pin — a page-side pin can be cut by the unload). The
 *  asset sweep closes the first-visit gap: on a brand-new browser the CSS/
 *  chunk requests of the very first page load race the SW registration and
 *  bypass it, so without this sweep an offline reopen renders unstyled. */
async function pinStoryDocumentInBackground(path) {
  const match = /^\/api\/content\/nodes\/(.+)\/enrichment$/.exec(path)
  if (!match) return
  try {
    const docPath = `/learn/${decodeURIComponent(match[1])}/story`
    const res = await fetch(docPath)
    if (!res.ok) return
    const stored = await storeable(res)
    const cache = await caches.open(STORIES_CACHE)
    await cache.put(docPath, stored.clone())
    try {
      const html = await stored.text()
      const assets = [...new Set(html.match(/\/_next\/static\/[^"'?]+\.(?:js|css)/g) || [])]
      const runtime = await caches.open(RUNTIME_CACHE)
      await Promise.all(
        assets.slice(0, 60).map(async (u) => {
          try {
            const r = await fetch(u)
            if (r.ok) await runtime.put(u, await storeable(r))
          } catch { /* best-effort */ }
        })
      )
    } catch { /* best-effort */ }
  } catch { /* best-effort */ }
}

/** /api GETs: network-first, fall back to cache (api cache, then pinned
 *  stories), then honest 503 JSON. Never caches: non-GET, non-ok, and node
 *  content URLs (the page pins those into the persistent stories cache). */
async function handleApi(request) {
  const path = new URL(request.url).pathname
  const pinnedPath = path.startsWith('/api/content/nodes/')
  try {
    const res = await fetch(request)
    if (cacheable(res)) {
      if (pinnedPath) {
        pinStoryDocumentInBackground(path).catch(() => {})
      } else {
        const copy = res.clone()
        caches
          .open(API_CACHE)
          .then((c) => storeable(copy).then((stored) => c.put(request, stored)))
          .then(() => trimCache(API_CACHE, API_CACHE_LIMIT))
          .catch(() => {})
      }
    }
    return res
  } catch {
    for (const name of [API_CACHE, STORIES_CACHE]) {
      try {
        const cache = await caches.open(name)
        const hit =
          (await cache.match(request, { ignoreSearch: true })) ||
          (await cache.match(path, { ignoreSearch: true }))
        if (hit) return hit
      } catch { /* try next */ }
    }
    return offlineResponse()
  }
}

/** Page loads: network-first into PAGES_CACHE; offline → cached copy (this
 *  cache, then story documents the page pinned), then the precached /offline
 *  fallback page. */
async function handleNavigation(request) {
  try {
    const res = await fetch(request)
    if (cacheable(res)) {
      const copy = res.clone()
      caches
        .open(PAGES_CACHE)
        .then((c) => storeable(copy).then((stored) => c.put(request, stored)))
        .then(() => trimCache(PAGES_CACHE, PAGES_CACHE_LIMIT))
        .catch(() => {})
    }
    return res
  } catch {
    try {
      const pages = await caches.open(PAGES_CACHE)
      const pathname = new URL(request.url).pathname
      const hit =
        (await pages.match(request, { ignoreSearch: true })) ||
        (await pages.match(pathname, { ignoreSearch: true })) ||
        (await pages.match(OFFLINE_URL))
      if (hit) return serveCached(hit)
      // Story documents pinned by the app live in the persistent stories
      // cache — check it before giving up.
      try {
        const stories = await caches.open(STORIES_CACHE)
        const storyDoc =
          (await stories.match(request, { ignoreSearch: true })) ||
          (await stories.match(pathname, { ignoreSearch: true }))
        if (storyDoc) return serveCached(storyDoc)
      } catch { /* fall through */ }
      const shell = await caches.open(SHELL_CACHE)
      const offline = await shell.match(OFFLINE_URL)
      if (offline) return serveCached(offline)
    } catch { /* fall through */ }
    return new Response('<h1>You are offline</h1>', {
      status: 503,
      headers: { 'Content-Type': 'text/html' },
    })
  }
}

/** Static assets + game data: stale-while-revalidate. */
async function handleStaleWhileRevalidate(request) {
  let cached = null
  try {
    const cache = await caches.open(RUNTIME_CACHE)
    cached = await cache.match(request, { ignoreSearch: true })
  } catch { /* ignore */ }
  const refresh = fetch(request)
    .then(async (res) => {
      if (cacheable(res)) {
        const copy = res.clone()
        const cache = await caches.open(RUNTIME_CACHE)
        await cache.put(request, await storeable(copy))
      }
      return res
    })
    .catch(() => null)
  if (cached) return serveCached(cached)
  const fresh = await refresh
  if (fresh) return fresh
  // Story-pinned assets (first-visit sweep lives in the page) land in the
  // persistent stories cache — check it before giving up offline.
  try {
    const stories = await caches.open(STORIES_CACHE)
    const pinned = await stories.match(request, { ignoreSearch: true })
    if (pinned) return serveCached(pinned)
  } catch { /* fall through */ }
  return new Response('', { status: 504 })
}

/** RSC payloads + misc same-origin GETs: network-first into RUNTIME. */
async function handleNetworkFirstRuntime(request) {
  try {
    const res = await fetch(request)
    if (cacheable(res)) {
      const copy = res.clone()
      caches
        .open(RUNTIME_CACHE)
        .then((c) => storeable(copy).then((stored) => c.put(request, stored)))
        .catch(() => {})
    }
    return res
  } catch {
    for (const name of [RUNTIME_CACHE, STORIES_CACHE]) {
      try {
        const cache = await caches.open(name)
        const hit = await cache.match(request, { ignoreSearch: true })
        if (hit) return serveCached(hit)
      } catch { /* try next */ }
    }
    return new Response('', { status: 504 })
  }
}

// ─── router ─────────────────────────────────────────────────────────────────

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return

  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return
  const path = url.pathname

  // Never intercept: the one-shot SW purge page must always hit the network.
  if (path === '/unregister-sw') return
  // Live streams (dev HMR event source, SSE) and hot-update files must pass
  // straight through.
  if (
    path === '/_next/webpack-hmr' ||
    path.includes('.hot-update.') ||
    req.headers.get('accept') === 'text/event-stream'
  ) {
    return
  }
  // Media range requests (audio/video seeking) — let the browser handle.
  if (req.headers.has('range')) return

  if (path.startsWith('/api/')) {
    event.respondWith(handleApi(req))
    return
  }
  if (req.mode === 'navigate') {
    event.respondWith(handleNavigation(req))
    return
  }
  // Next.js App Router client payloads.
  if (req.headers.get('rsc') === '1') {
    event.respondWith(handleNetworkFirstRuntime(req))
    return
  }
  if (STATIC_PATTERNS.some((re) => re.test(path))) {
    event.respondWith(handleStaleWhileRevalidate(req))
    return
  }
  event.respondWith(handleNetworkFirstRuntime(req))
})
