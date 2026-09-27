/**
 * offlineLibrary — the REAL offline story library, backed by Cache Storage.
 *
 * The single source of truth is the `atlas-stories-v1` cache: entries are
 * written by pinStory() when a student opens a Story while online (the
 * service worker's general API cache is deliberately bypassed for node
 * content URLs so nothing is stored twice and the library survives SW
 * version bumps). Every count/list shown in the UI is derived by reading
 * this cache back — never from a server flag or a hardcoded number.
 */

export const STORIES_CACHE = 'atlas-stories-v1'

const ENRICHMENT_RE = /^\/api\/content\/nodes\/(.+)\/enrichment$/

export interface DownloadedStory {
  nodeId: string
  title: string
  subject: string
  chapter: string
  classLevel: number | null
  sizeBytes: number
  storyUrl: string
}

function contentUrls(nodeId: string): { enrichment: string; detail: string } {
  const base = `/api/content/nodes/${encodeURIComponent(nodeId)}`
  return { enrichment: `${base}/enrichment`, detail: base }
}

function jsonResponse(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    headers: { 'Content-Type': 'application/json' },
  })
}

/** Pin a node's Story payload (enrichment + node detail) for offline use.
 *  Called after the story loads successfully while online. Best-effort:
 *  callers swallow failures — offline support must never break the story. */
export async function pinStory(
  nodeId: string,
  enrichment: unknown,
  detail?: unknown
): Promise<boolean> {
  if (typeof caches === 'undefined' || !nodeId || !enrichment) return false
  try {
    const cache = await caches.open(STORIES_CACHE)
    const urls = contentUrls(nodeId)
    await cache.put(urls.enrichment, jsonResponse(enrichment))
    if (detail) await cache.put(urls.detail, jsonResponse(detail))
    return true
  } catch {
    return false
  }
}

/** Pin the story page document itself so a hard navigation (installed PWA
 *  opened straight at /learn/<id>/story, or a refresh) works offline too —
 *  client-side navigations are covered by the SW's RSC cache. The stored
 *  headers drop cache-control (SW-managed retention) AND content-encoding /
 *  content-length: fetch() already delivered the decoded body, so keeping
 *  "br"/"gzip" metadata would break offline decoding. */
export async function pinStoryDocument(storyUrl: string): Promise<boolean> {
  if (typeof caches === 'undefined' || !storyUrl) return false
  try {
    const res = await fetch(storyUrl)
    if (!res.ok) return false
    const cache = await caches.open(STORIES_CACHE)
    const body = await res.arrayBuffer()
    const headers = new Headers(res.headers)
    headers.delete('cache-control')
    headers.delete('content-encoding')
    headers.delete('content-length')
    await cache.put(
      storyUrl,
      new Response(body, { status: res.status, statusText: res.statusText, headers })
    )
    // Sweep the static assets the story document references (CSS/JS chunks):
    // on a student's FIRST page load those requests race the SW registration
    // and bypass it, so without this sweep an offline reopen renders
    // unstyled. Best-effort, bounded.
    try {
      const html = new TextDecoder().decode(body)
      const assets = Array.from(
        new Set(html.match(/\/_next\/static\/[^"'?]+\.(?:js|css)/g) || [])
      ).slice(0, 60)
      await Promise.all(
        assets.map(async (u) => {
          try {
            const r = await fetch(u)
            if (!r.ok) return
            const h = new Headers(r.headers)
            h.delete('cache-control')
            h.delete('content-encoding')
            h.delete('content-length')
            await cache.put(u, new Response(await r.arrayBuffer(), {
              status: r.status,
              statusText: r.statusText,
              headers: h,
            }))
          } catch { /* best-effort */ }
        })
      )
    } catch { /* best-effort */ }
    return true
  } catch {
    return false
  }
}

/** Is this node's story present in the offline library? */
export async function isStoryPinned(nodeId: string): Promise<boolean> {
  if (typeof caches === 'undefined') return false
  try {
    const cache = await caches.open(STORIES_CACHE)
    const hit = await cache.match(contentUrls(nodeId).enrichment)
    return !!hit
  } catch {
    return false
  }
}

/** Every story actually sitting in the device cache right now. */
export async function listDownloadedStories(): Promise<DownloadedStory[]> {
  if (typeof caches === 'undefined') return []
  const cache = await caches.open(STORIES_CACHE)
  const requests = await cache.keys()
  const stories: DownloadedStory[] = []

  for (const request of requests) {
    const pathname = new URL(request.url).pathname
    const match = ENRICHMENT_RE.exec(pathname)
    if (!match) continue
    const nodeId = decodeURIComponent(match[1])
    const res = await cache.match(request)
    if (!res) continue

    let sizeBytes = 0
    try {
      sizeBytes = (await res.clone().blob()).size
    } catch { /* size is optional */ }

    // Title/meta come from the cached enrichment payload itself — if the
    // payload can't be parsed the node id-derived label is used, never a
    // made-up title.
    let title = nodeId
    let subject = ''
    let chapter = ''
    let classLevel: number | null = null
    try {
      const data = await res.json()
      if (data && typeof data.title === 'string' && data.title) title = data.title
      if (data && typeof data.subject === 'string') subject = data.subject
      if (data && typeof data.chapter_title === 'string') chapter = data.chapter_title
      else if (data && typeof data.chapter === 'string') chapter = data.chapter
      if (data && typeof data.class_level === 'number') classLevel = data.class_level
      else if (data && typeof data.class === 'number') classLevel = data.class
    } catch { /* keep id-derived label */ }

    stories.push({
      nodeId,
      title,
      subject,
      chapter,
      classLevel,
      sizeBytes,
      storyUrl: `/learn/${nodeId}/story`,
    })
  }

  stories.sort((a, b) => a.title.localeCompare(b.title))
  return stories
}

/** Remove one story from the offline library. */
export async function removeDownloadedStory(nodeId: string): Promise<void> {
  if (typeof caches === 'undefined') return
  const cache = await caches.open(STORIES_CACHE)
  const urls = contentUrls(nodeId)
  await cache.delete(urls.enrichment)
  await cache.delete(urls.detail)
}

/** Clear the whole offline library. */
export async function clearDownloadedStories(): Promise<number> {
  const stories = await listDownloadedStories()
  await Promise.all(stories.map((s) => removeDownloadedStory(s.nodeId)))
  return stories.length
}

export function formatBytes(bytes: number): string {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
