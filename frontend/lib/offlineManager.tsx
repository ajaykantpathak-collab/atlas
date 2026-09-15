'use client'

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from 'react'

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════

export interface OfflineStatus {
  isOnline: boolean
  isSyncing: boolean
  pendingCount: number
  conflictCount: number
  lastSync: number | null
  lastSyncAttempt: number | null
  syncError: string | null
  swStatus: 'unsupported' | 'installing' | 'installed' | 'activating' | 'activated' | 'redundant' | 'error'
  swUpdateAvailable: boolean
}

export interface SyncQueueItem {
  id: string
  url: string
  method: string
  headers: Record<string, string>
  body?: string
  contentType?: string
  timestamp: number
  retries: number
  maxRetries: number
  status: 'pending' | 'syncing' | 'completed' | 'failed' | 'conflict'
  error?: string
  conflictData?: ConflictData
}

export interface ConflictData {
  localVersion: Record<string, unknown>
  serverVersion: Record<string, unknown>
  resourceType: string
  resourceId: string
  detectedAt: number
  resolved: boolean
  resolution?: 'local' | 'server' | 'merged'
  mergedData?: Record<string, unknown>
}

export interface CacheConfig {
  name: string
  strategy: 'cache-first' | 'network-first' | 'stale-while-revalidate'
  maxAgeSeconds?: number
  maxEntries?: number
  patterns: RegExp[]
}

export interface PreloadItem {
  url: string
  priority: 'critical' | 'important' | 'optional'
  strategy: 'cache-first' | 'network-first' | 'stale-while-revalidate'
}

export interface ConflictResolutionResult {
  itemId: string
  resolution: 'local' | 'server' | 'merged'
  mergedData?: Record<string, unknown>
}

// ═══════════════════════════════════════════════════════════════
// CONSTANTS & CONFIG
// ═══════════════════════════════════════════════════════════════

const DB_NAME = 'offline-manager-db'
const DB_VERSION = 1

const CACHE_CONFIGS: CacheConfig[] = [
  {
    name: 'static-assets-v1',
    strategy: 'cache-first',
    maxAgeSeconds: 7 * 24 * 3600, // 7 days
    maxEntries: 200,
    patterns: [
      /\.(js|mjs|tsx?)$/,
      /\.css$/,
      /\.woff2?$/,
      /\.png$/,
      /\.jpg$/,
      /\.svg$/,
      /\.ico$/,
      /\.webp$/,
    ],
  },
  {
    name: 'static-assets-v1', // shared cache with different sub-strategy
    strategy: 'stale-while-revalidate',
    maxAgeSeconds: 24 * 3600,
    patterns: [
      /\/api\/curriculum/,
      /\/api\/subjects/,
      /\/api\/lessons/,
    ],
  },
  {
    name: 'dynamic-api-v1',
    strategy: 'network-first',
    maxAgeSeconds: 5 * 60, // 5 minutes
    maxEntries: 100,
    patterns: [
      /\/api\/homework/,
      /\/api\/messages/,
      /\/api\/practice/,
      /\/api\/grades/,
      /\/api\/attendance/,
      /\/api\/notifications/,
    ],
  },
]

const DEFAULT_PRELOAD_ITEMS: PreloadItem[] = [
  { url: '/api/curriculum/current', priority: 'critical', strategy: 'network-first' },
  { url: '/api/homework/current', priority: 'critical', strategy: 'network-first' },
  { url: '/api/messages/recent', priority: 'important', strategy: 'network-first' },
  { url: '/api/practice/recommended', priority: 'important', strategy: 'stale-while-revalidate' },
]

const SW_CODE = `
  // ─── Service Worker: Offline Manager v1 ───
  const CACHE_STATIC = 'static-assets-v1'
  const CACHE_DYNAMIC = 'dynamic-api-v1'
  const CACHE_PRELOAD = 'preload-v1'

  const STATIC_MAX_AGE = 7 * 24 * 3600
  const DYNAMIC_MAX_AGE = 5 * 60

  const PRECACHE_URLS = [
    '/',
    '/offline',
  ]

  // ─── Install: precache critical assets ───
  self.addEventListener('install', (event) => {
    console.log('[SW] Installing...')
    event.waitUntil(
      caches.open(CACHE_STATIC)
        .then(cache => cache.addAll(PRECACHE_URLS))
        .then(() => self.skipWaiting())
        .catch(err => console.warn('[SW] Precache failed:', err))
    )
  })

  // ─── Activate: clean old caches ───
  self.addEventListener('activate', (event) => {
    console.log('[SW] Activating...')
    event.waitUntil(
      caches.keys().then(keys => {
        const valid = [CACHE_STATIC, CACHE_DYNAMIC, CACHE_PRELOAD]
        return Promise.all(
          keys
            .filter(k => !valid.some(v => k.startsWith(v)))
            .map(k => caches.delete(k))
        )
      }).then(() => self.clients.claim())
    )
  })

  // ─── Fetch: apply cache strategies ───
  self.addEventListener('fetch', (event) => {
    const { request } = event
    if (request.method !== 'GET') return

    const url = new URL(request.url)

    // Skip non-http(s)
    if (!url.protocol.startsWith('http')) return

    // Static assets → cache-first
    if (isStaticAsset(url.pathname)) {
      event.respondWith(cacheFirst(request, CACHE_STATIC, STATIC_MAX_AGE))
      return
    }

    // API curriculum/lessons → stale-while-revalidate
    if (isContentApi(url.pathname)) {
      event.respondWith(staleWhileRevalidate(request, CACHE_DYNAMIC))
      return
    }

    // Dynamic API → network-first
    if (isDynamicApi(url.pathname)) {
      event.respondWith(networkFirst(request, CACHE_DYNAMIC, DYNAMIC_MAX_AGE))
      return
    }

    // Everything else → network-first with fallback
    event.respondWith(networkFirst(request, CACHE_STATIC, STATIC_MAX_AGE))
  })

  // ─── Background Sync ───
  self.addEventListener('sync', (event) => {
    console.log('[SW] Background sync:', event.tag)
    if (event.tag === 'sync-pending-requests') {
      event.waitUntil(flushSyncQueue())
    }
    if (event.tag === 'preload-resources') {
      event.waitUntil(preloadCriticalResources())
    }
  })

  // ─── Push Notifications ───
  self.addEventListener('push', (event) => {
    const data = event.data?.json() ?? {}
    const title = data.title ?? 'New Notification'
    const options = {
      body: data.body ?? '',
      icon: '/icons/notification-192.png',
      badge: '/icons/badge-72.png',
      data: data.url ? { url: data.url } : undefined,
      tag: data.tag ?? 'notification',
      renotify: false,
      actions: data.actions ?? [{ action: 'open', title: 'View' }],
    }
    event.waitUntil(self.registration.showNotification(title, options))
  })

  self.addEventListener('notificationclick', (event) => {
    event.notification.close()
    const targetUrl = event.notification.data?.url ?? '/'
    event.waitUntil(
      self.clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then(clients => {
          for (const client of clients) {
            if (client.url === targetUrl) return client.focus()
          }
          return self.clients.openWindow(targetUrl)
        })
    )
  })

  // ─── Helper: Pattern matching ───
  function isStaticAsset(pathname: string): boolean {
    return /\.(js|mjs|css|woff2?|ttf|png|jpe?g|svg|gif|ico|webp|avif|map)$/i.test(pathname)
  }

  function isContentApi(pathname: string): boolean {
    return /\/api\/(curriculum|subjects|lessons|content)/.test(pathname)
  }

  function isDynamicApi(pathname: string): boolean {
    return /\/api\/(homework|messages|practice|grades|attendance|notifications)/.test(pathname)
  }

  // ─── Cache Strategies ───
  async function cacheFirst(request: Request, cacheName: string, maxAge: number): Promise<Response> {
    const cached = await caches.match(request)
    if (cached) {
      const date = cached.headers.get('date')
      if (date && Date.now() - new Date(date).getTime() < maxAge * 1000) {
        return cached
      }
    }
    try {
      const response = await fetch(request)
      if (response.ok) {
        const clone = response.clone()
        const cache = await caches.open(cacheName)
        cache.put(request, clone)
      }
      return response
    } catch {
      if (cached) return cached
      return new Response('Offline — resource not cached', { status: 503 })
    }
  }

  async function networkFirst(request: Request, cacheName: string, maxAge: number): Promise<Response> {
    try {
      const response = await fetch(request)
      if (response.ok) {
        const clone = response.clone()
        const cache = await caches.open(cacheName)
        cache.put(request, clone)
      }
      return response
    } catch {
      const cached = await caches.match(request)
      if (cached) return cached
      return offlineResponse(request)
    }
  }

  async function staleWhileRevalidate(request: Request, cacheName: string): Promise<Response> {
    const cached = await caches.match(request)
    const fetchPromise = fetch(request)
      .then(response => {
        if (response.ok) {
          const clone = response.clone()
          caches.open(cacheName).then(cache => cache.put(request, clone))
        }
        return response
      })
      .catch(() => cached)
    return cached ?? await fetchPromise
  }

  function offlineResponse(request: Request): Response {
    if (request.url.includes('/api/')) {
      return new Response(JSON.stringify({ offline: true, message: 'No cached data available' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 503,
      })
    }
    return caches.match('/offline') ?? new Response('Offline', { status: 503 })
  }

  // ─── Sync Queue (uses IndexedDB via postMessage) ───
  async function flushSyncQueue(): Promise<void> {
    // The main thread handles actual sync via IndexedDB
    // SW just triggers the process
    const allClients = await self.clients.matchAll()
    allClients.forEach(client => {
      client.postMessage({ type: 'SYNC_REQUESTED' })
    })
  }

  async function preloadCriticalResources(): Promise<void> {
    const cache = await caches.open(CACHE_PRELOAD)
    const urls = [
      '/api/curriculum/current',
      '/api/homework/current',
      '/api/messages/recent',
      '/api/practice/recommended',
    ]
    await cache.addAll(urls).catch(err => console.warn('[SW] Preload failed:', err))
  }
`

// ═══════════════════════════════════════════════════════════════
// INDEXEDDB WRAPPER
// ═══════════════════════════════════════════════════════════════

class IndexedDBStore {
  private db: IDBDatabase | null = null
  private ready: Promise<void>

  constructor() {
    this.ready = this.init()
  }

  private async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Sync queue store
        if (!db.objectStoreNames.contains('syncQueue')) {
          const queueStore = db.createObjectStore('syncQueue', { keyPath: 'id' })
          queueStore.createIndex('status', 'status', { unique: false })
          queueStore.createIndex('timestamp', 'timestamp', { unique: false })
          queueStore.createIndex('url', 'url', { unique: false })
        }

        // Cached responses store
        if (!db.objectStoreNames.contains('cachedResponses')) {
          const cacheStore = db.createObjectStore('cachedResponses', { keyPath: 'url' })
          cacheStore.createIndex('cachedAt', 'cachedAt', { unique: false })
        }

        // Conflicts store
        if (!db.objectStoreNames.contains('conflicts')) {
          const conflictStore = db.createObjectStore('conflicts', { keyPath: 'id' })
          conflictStore.createIndex('resolved', 'resolved', { unique: false })
          conflictStore.createIndex('detectedAt', 'detectedAt', { unique: false })
        }

        // Metadata store
        if (!db.objectStoreNames.contains('meta')) {
          db.createObjectStore('meta', { keyPath: 'key' })
        }
      }
    })
  }

  private async tx(
    storeName: string,
    mode: IDBTransactionMode = 'readonly'
  ): Promise<{ store: IDBObjectStore; tx: IDBTransaction }> {
    await this.ready
    const transaction = this.db!.transaction(storeName, mode)
    const store = transaction.objectStore(storeName)
    return { store, tx: transaction }
  }

  private async promisifiedRequest<T>(
    request: IDBRequest<T>,
    transaction: IDBTransaction
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
      transaction.oncomplete = () => {}
    })
  }

  // ─── Sync Queue Operations ───

  async enqueue(item: Omit<SyncQueueItem, 'id'>): Promise<string> {
    const id = crypto.randomUUID()
    const record: SyncQueueItem = { ...item, id }
    const { store } = await this.tx('syncQueue', 'readwrite')
    await this.promisifiedRequest(store.put(record), store.transaction)
    return id
  }

  async getPending(): Promise<SyncQueueItem[]> {
    const { store } = await this.tx('syncQueue')
    const index = store.index('status')
    const results = await this.promisifiedRequest(index.getAll('pending'), store.transaction)
    return results.sort((a, b) => a.timestamp - b.timestamp)
  }

  async getByStatus(status: SyncQueueItem['status']): Promise<SyncQueueItem[]> {
    const { store } = await this.tx('syncQueue')
    const index = store.index('status')
    return this.promisifiedRequest(index.getAll(status), store.transaction)
  }

  async getAll(): Promise<SyncQueueItem[]> {
    const { store } = await this.tx('syncQueue')
    return this.promisifiedRequest(store.getAll(), store.transaction)
  }

  async updateStatus(id: string, status: SyncQueueItem['status'], error?: string): Promise<void> {
    const { store } = await this.tx('syncQueue', 'readwrite')
    const record = await this.promisifiedRequest(store.get(id), store.transaction)
    if (record) {
      record.status = status
      if (error) record.error = error
      if (status === 'syncing') record.retries++
      store.put(record)
    }
  }

  async updateConflict(id: string, conflictData: ConflictData): Promise<void> {
    const { store } = await this.tx('syncQueue', 'readwrite')
    const record = await this.promisifiedRequest(store.get(id), store.transaction)
    if (record) {
      record.status = 'conflict'
      record.conflictData = conflictData
      store.put(record)
    }
  }

  async remove(id: string): Promise<void> {
    const { store } = await this.tx('syncQueue', 'readwrite')
    store.delete(id)
  }

  async clearCompleted(): Promise<void> {
    const { store } = await this.tx('syncQueue', 'readwrite')
    const index = store.index('status')
    const completed = await this.promisifiedRequest(index.getAll('completed'), store.transaction)
    for (const item of completed) {
      store.delete(item.id)
    }
  }

  async getCount(status?: SyncQueueItem['status']): Promise<number> {
    if (status) {
      const { store } = await this.tx('syncQueue')
      const index = store.index('status')
      return this.promisifiedRequest(index.count(status), store.transaction)
    }
    const { store } = await this.tx('syncQueue')
    return this.promisifiedRequest(store.count(), store.transaction)
  }

  // ─── Cached Responses ───

  async cacheResponse(url: string, response: Response): Promise<void> {
    const { store } = await this.tx('cachedResponses', 'readwrite')
    const blob = await response.clone().blob()
    const headers: Record<string, string> = {}
    response.headers.forEach((value, key) => { headers[key] = value })
    store.put({
      url,
      blob,
      headers,
      status: response.status,
      cachedAt: Date.now(),
      ttl: 5 * 60_000, // 5 minutes default
    })
  }

  async getCachedResponse(url: string): Promise<Response | null> {
    const { store } = await this.tx('cachedResponses')
    const record = await this.promisifiedRequest(store.get(url), store.transaction)
    if (!record) return null
    if (Date.now() - record.cachedAt > record.ttl) {
      store.delete(url)
      return null
    }
    return new Response(record.blob, {
      status: record.status,
      headers: record.headers,
    })
  }

  async clearCache(): Promise<void> {
    const names = ['cachedResponses', 'syncQueue']
    for (const name of names) {
      const { store } = await this.tx(name, 'readwrite')
      store.clear()
    }
  }

  // ─── Conflicts ───

  async saveConflict(conflict: ConflictData): Promise<void> {
    const { store } = await this.tx('conflicts', 'readwrite')
    store.put({ ...conflict, id: conflict.resourceId })
  }

  async getUnresolvedConflicts(): Promise<ConflictData[]> {
    const { store } = await this.tx('conflicts')
    const index = store.index('resolved')
    const all = await this.promisifiedRequest(index.getAll(), store.transaction)
    return all.filter(c => !c.resolved)
  }

  async resolveConflict(id: string, resolution: 'local' | 'server' | 'merged', mergedData?: Record<string, unknown>): Promise<void> {
    const { store } = await this.tx('conflicts', 'readwrite')
    const record = await this.promisifiedRequest(store.get(id), store.transaction)
    if (record) {
      record.resolved = true
      record.resolution = resolution
      if (mergedData) record.mergedData = mergedData
      store.put(record)
    }
  }

  // ─── Meta ───

  async getMeta(key: string): Promise<unknown> {
    const { store } = await this.tx('meta')
    const record = await this.promisifiedRequest(store.get(key), store.transaction)
    return record?.value
  }

  async setMeta(key: string, value: unknown): Promise<void> {
    const { store } = await this.tx('meta', 'readwrite')
    store.put({ key, value })
  }
}

// ═══════════════════════════════════════════════════════════════
// SERVICE WORKER REGISTRATION
// ═══════════════════════════════════════════════════════════════

async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.warn('[OfflineManager] Service workers not supported')
    return null
  }

  try {
    // Create SW from inline code via blob URL
    const blob = new Blob([SW_CODE], { type: 'application/javascript' })
    const swUrl = URL.createObjectURL(blob)

    const registration = await navigator.serviceWorker.register(swUrl, {
      scope: '/',
      updateViaCache: 'imports',
    })

    // Listen for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing
      if (!newWorker) return

      newWorker.addEventListener('statechange', () => {
        notifyListeners('swStatus', newWorker.state as OfflineStatus['swStatus'])
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // New version available
          notifyListeners('swUpdateAvailable', true)
        }
      })
    })

    // Check for existing controller
    if (navigator.serviceWorker.controller) {
      notifyListeners('swStatus', 'activated')
    }

    // Listen for messages from SW
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data?.type === 'SYNC_REQUESTED') {
        offlineManager.sync()
      }
    })

    // Clean up blob URL
    URL.revokeObjectURL(swUrl)

    console.log('[OfflineManager] Service worker registered')
    return registration
  } catch (error) {
    console.error('[OfflineManager] SW registration failed:', error)
    notifyListeners('swStatus', 'error')
    return null
  }
}

// ═══════════════════════════════════════════════════════════════
// NETWORK PING (more reliable than navigator.onLine)
// ═══════════════════════════════════════════════════════════════

async function pingServer(): Promise<boolean> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    // Use a lightweight endpoint or the app origin
    const response = await fetch('/', {
      method: 'HEAD',
      mode: 'no-cors',
      signal: controller.signal,
      cache: 'no-store',
    })

    clearTimeout(timeout)
    return true
  } catch {
    // Try a CORS-friendly fallback
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 3000)

      await fetch('/api/health', {
        method: 'GET',
        signal: controller.signal,
        cache: 'no-store',
      })
      clearTimeout(timeout)
      return true
    } catch {
      return false
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// CACHE STRATEGY IMPLEMENTATIONS
// ═══════════════════════════════════════════════════════════════

async function cacheFirstStrategy(
  request: Request,
  maxAge: number
): Promise<Response> {
  const cache = await caches.open('static-assets-v1')
  const cached = await cache.match(request)

  if (cached) {
    const age = Date.now() - (cached.headers.get('sw-cache-timestamp') ?
      Number(cached.headers.get('sw-cache-timestamp')) : 0)
    if (age < maxAge * 1000) return cached
  }

  try {
    const response = await fetch(request.clone())
    if (response.ok) {
      const responseToCache = new Response(response.body, response)
      responseToCache.headers.set('sw-cache-timestamp', String(Date.now()))
      cache.put(request, responseToCache)
    }
    return response
  } catch {
    if (cached) return cached
    return new Response(JSON.stringify({ offline: true }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

async function networkFirstStrategy(
  request: Request,
  maxAge: number
): Promise<Response> {
  try {
    const response = await fetch(request.clone())
    if (response.ok) {
      const cache = await caches.open('dynamic-api-v1')
      const toCache = new Response(response.body, response)
      toCache.headers.set('sw-cache-timestamp', String(Date.now()))
      cache.put(request, toCache)
    }
    return response
  } catch {
    const cache = await caches.open('dynamic-api-v1')
    const cached = await cache.match(request)
    if (cached) {
      const age = Date.now() - Number(cached.headers.get('sw-cache-timestamp') ?? 0)
      if (age < maxAge * 1000) return cached
    }

    return new Response(JSON.stringify({
      offline: true,
      message: 'You are offline. Showing cached data.',
      cached: !!cached,
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

async function staleWhileRevalidateStrategy(
  request: Request
): Promise<Response> {
  const cache = await caches.open('dynamic-api-v1')
  const cached = await cache.match(request)

  const fetchPromise = fetch(request.clone())
    .then(response => {
      if (response.ok) {
        const toCache = new Response(response.body, response)
        toCache.headers.set('sw-cache-timestamp', String(Date.now()))
        cache.put(request, toCache)
      }
      return response
    })
    .catch(() => cached as Response | undefined)

  return cached ?? await fetchPromise
}

// ═══════════════════════════════════════════════════════════════
// SYNC ENGINE
// ═══════════════════════════════════════════════════════════════

async function executeRequest(item: SyncQueueItem): Promise<Response> {
  const response = await fetch(item.url, {
    method: item.method,
    headers: item.headers,
    body: item.body,
    cache: 'no-store',
  })

  if (!response.ok) {
    const errorBody = await response.text().catch(() => 'Unknown error')
    throw new Error(`HTTP ${response.status}: ${errorBody}`)
  }

  return response
}

function detectConflict(
  localData: Record<string, unknown>,
  serverData: Record<string, unknown>
): ConflictData | null {
  // Simple conflict detection: compare modification timestamps
  // In production, you'd use version vectors or ETags
  const localModified = localData._modifiedAt as number ?? 0
  const serverModified = serverData._modifiedAt as number ?? 0
  const localVersion = localData._version as string ?? '0'
  const serverVersion = serverData._version as string ?? '0'

  if (localModified > serverModified && localVersion !== serverVersion) {
    return {
      localVersion: localData,
      serverVersion: serverData as Record<string, unknown>,
      resourceType: (localData._resourceType as string) ?? 'unknown',
      resourceId: (localData._id as string) ?? itemIdFromUrl(serverData._url as string),
      detectedAt: Date.now(),
      resolved: false,
    }
  }

  return null
}

function itemIdFromUrl(url: string): string {
  const parts = url.split('/')
  return parts[parts.length - 1] || parts[parts.length - 2] || 'unknown'
}

// ═══════════════════════════════════════════════════════════════
// EVENT EMITTER (lightweight internal pub/sub)
// ═══════════════════════════════════════════════════════════════

type ListenerKey = 'status' | 'swStatus' | 'swUpdateAvailable' | 'conflictDetected' | 'syncComplete'

const listeners = new Map<ListenerKey, Set<(...args: unknown[]) => void>>()

function notifyListeners(key: ListenerKey, ...args: unknown[]): void {
  const set = listeners.get(key)
  if (set) set.forEach(fn => { try { fn(...args) } catch (e) { console.error(e) } })
}

function onStatusChange(fn: (status: Partial<OfflineStatus>) => void): () => void {
  if (!listeners.has('status')) listeners.set('status', new Set())
  listeners.get('status')!.add(fn)
  return () => listeners.get('status')!.delete(fn)
}

// ═══════════════════════════════════════════════════════════════
// OFFLINE MANAGER — SINGLETON
// ═══════════════════════════════════════════════════════════════

class OfflineManagerClass {
  private db: IndexedDBStore
  private status: OfflineStatus
  private statusListeners = new Set<(status: OfflineStatus) => void>()
  private swRegistration: ServiceWorkerRegistration | null = null
  private pingInterval: ReturnType<typeof setInterval> | null = null
  private syncInProgress = false
  private initialized = false

  constructor() {
    this.db = new IndexedDBStore()
    this.status = {
      isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
      isSyncing: false,
      pendingCount: 0,
      conflictCount: 0,
      lastSync: null,
      lastSyncAttempt: null,
      syncError: null,
      swStatus: typeof navigator !== 'undefined' && 'serviceWorker' in navigator ? 'unsupported' : 'unsupported',
      swUpdateAvailable: false,
    }
  }

  // ─── Initialization ───

  async init(options?: { enableSW?: boolean; enableAutoSync?: boolean; pingIntervalMs?: number }): Promise<OfflineStatus> {
    if (this.initialized) return this.status

    const opts = {
      enableSW: true,
      enableAutoSync: true,
      pingIntervalMs: 30_000,
      ...options,
    }

    // Set initial online status
    this.status.isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true

    // Register service worker
    if (opts.enableSW && typeof window !== 'undefined') {
      try {
        this.swRegistration = await registerServiceWorker()
        this.status.swStatus = (this.swRegistration?.active?.state ?? 'installed') as OfflineStatus['swStatus']
      } catch (e) {
        console.warn('[OfflineManager] SW init failed:', e)
      }
    }

    // Load persisted queue counts
    try {
      const pendingCount = await this.db.getCount('pending')
      const allConflicts = await this.db.getUnresolvedConflicts()
      this.status.pendingCount = pendingCount
      this.status.conflictCount = allConflicts.length
    } catch (e) {
      console.warn('[OfflineManager] Failed to load persisted state:', e)
    }

    // Set up online/offline listeners
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.handleOnline())
      window.addEventListener('offline', () => this.handleOffline())

      // Visibility change: re-check connectivity when tab becomes visible
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          this.handleVisibilityChange()
        }
      })

      // Periodic ping
      if (opts.pingIntervalMs > 0) {
        this.pingInterval = setInterval(() => this.checkConnectivity(), opts.pingIntervalMs)
      }

      // Auto-sync when online
      if (opts.enableAutoSync) {
        window.addEventListener('online', () => {
          setTimeout(() => this.sync(), 1000)
        })
      }

      // Listen for SW messages
      if (navigator.serviceWorker) {
        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data?.type === 'SYNC_REQUESTED') {
            this.sync()
          }
        })
      }
    }

    this.initialized = true
    this.emitStatus()
    return this.status
  }

  // ─── Online / Offline Handling ───

  private async handleOnline(): Promise<void> {
    console.log('[OfflineManager] Back online')
    this.status.isOnline = true
    this.status.syncError = null
    this.emitStatus()

    // Wait a moment for connection to stabilize
    setTimeout(() => this.sync(), 500)
  }

  private handleOffline(): void {
    console.log('[OfflineManager] Gone offline')
    this.status.isOnline = false
    this.emitStatus()
  }

  private async handleVisibilityChange(): Promise<void> {
    if (document.visibilityState !== 'visible') return

    // Re-check connectivity with a real ping
    const isActuallyOnline = await pingServer()
    if (isActuallyOnline !== this.status.isOnline) {
      this.status.isOnline = isActuallyOnline
      if (isActuallyOnline) {
        this.handleOnline()
      } else {
        this.handleOffline()
      }
    }
  }

  private async checkConnectivity(): Promise<void> {
    if (this.syncInProgress) return

    const isOnline = await pingServer()
    if (isOnline !== this.status.isOnline) {
      this.status.isOnline = isOnline
      this.emitStatus()
      if (isOnline) {
        setTimeout(() => this.sync(), 500)
      }
    }
  }

  // ─── Sync ───

  async sync(): Promise<{ synced: number; failed: number; conflicts: number }> {
    if (this.syncInProgress || !this.status.isOnline) {
      return { synced: 0, failed: 0, conflicts: 0 }
    }

    this.syncInProgress = true
    this.status.isSyncing = true
    this.status.lastSyncAttempt = Date.now()
    this.status.syncError = null
    this.emitStatus()

    let synced = 0
    let failed = 0
    let conflicts = 0

    try {
      // Get all pending items
      const pendingItems = await this.db.getPending()
      if (pendingItems.length === 0) {
        this.status.isSyncing = false
        this.status.lastSync = Date.now()
        this.syncInProgress = false
        this.emitStatus()
        return { synced: 0, failed: 0, conflicts: 0 }
      }

      console.log(`[OfflineManager] Syncing ${pendingItems.length} items`)

      for (const item of pendingItems) {
        try {
          // Mark as syncing
          await this.db.updateStatus(item.id, 'syncing')
          this.emitStatus()

          // Execute the request
          const response = await executeRequest(item)
          const responseData = await response.json().catch(() => ({}))

          // Check for conflicts
          if (response.status === 409 || responseData.conflict) {
            const conflictData: ConflictData = {
              localVersion: this.parseBody(item.body),
              serverVersion: responseData.serverVersion ?? responseData,
              resourceType: responseData.resourceType ?? 'unknown',
              resourceId: item.id,
              detectedAt: Date.now(),
              resolved: false,
            }

            await this.db.updateConflict(item.id, conflictData)
            await this.db.saveConflict(conflictData)
            conflicts++

            notifyListeners('conflictDetected', conflictData)
            continue
          }

          // Success
          await this.db.updateStatus(item.id, 'completed')
          synced++

          // Update cached responses for GET requests
          if (item.method === 'GET') {
            const cachedResponse = new Response(JSON.stringify(responseData), {
              headers: { 'Content-Type': 'application/json' },
            })
            await this.db.cacheResponse(item.url, cachedResponse)
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error'
          console.error(`[OfflineManager] Failed to sync item ${item.id}:`, errorMessage)

          if (item.retries >= item.maxRetries) {
            await this.db.updateStatus(item.id, 'failed', errorMessage)
            failed++
          } else {
            await this.db.updateStatus(item.id, 'pending')
            failed++
          }
        }

        // Update counts after each item
        this.status.pendingCount = await this.db.getCount('pending')
        this.emitStatus()
      }

      // Clean up completed items
      await this.db.clearCompleted()

      // Update conflict count
      const unresolvedConflicts = await this.db.getUnresolvedConflicts()
      this.status.conflictCount = unresolvedConflicts.length

      this.status.lastSync = Date.now()
      notifyListeners('syncComplete', { synced, failed, conflicts })
    } catch (error) {
      console.error('[OfflineManager] Sync error:', error)
      this.status.syncError = error instanceof Error ? error.message : 'Sync failed'
    } finally {
      this.status.isSyncing = false
      this.syncInProgress = false
      this.status.pendingCount = await this.db.getCount('pending')
      this.emitStatus()
    }

    return { synced, failed, conflicts }
  }

  // ─── Queue Operations (used by the app) ───

  async queueRequest(
    url: string,
    method: string,
    data?: unknown,
    options?: { maxRetries?: number; headers?: Record<string, string> }
  ): Promise<string> {
    const body = data ? JSON.stringify(data) : undefined
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options?.headers,
    }

    // If online, try immediately
    if (this.status.isOnline) {
      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
          cache: 'no-store',
        })

        if (response.ok) {
          const responseData = await response.json().catch(() => ({}))

          if (response.status === 409 || responseData.conflict) {
            const conflictData: ConflictData = {
              localVersion: this.parseBody(body),
              serverVersion: responseData.serverVersion ?? responseData,
              resourceType: (data as Record<string, unknown>)?._resourceType as string ?? 'unknown',
              resourceId: (data as Record<string, unknown>)?._id as string ?? itemIdFromUrl(url),
              detectedAt: Date.now(),
              resolved: false,
            }
            await this.db.saveConflict(conflictData)
            notifyListeners('conflictDetected', conflictData)
            this.status.conflictCount = await this.db.getUnresolvedConflicts().then(c => c.length)
            this.emitStatus()
          }

          // Cache the response
          const cachedResponse = new Response(JSON.stringify(responseData), {
            headers: { 'Content-Type': 'application/json' },
          })
          await this.db.cacheResponse(url, cachedResponse)

          return '' // No queue ID needed, request succeeded
        }
      } catch (e) {
        // Network failed, fall through to queue
        console.warn('[OfflineManager] Network request failed, queuing:', e)
      }
    }

    // Queue the request
    const queueItem: Omit<SyncQueueItem, 'id'> = {
      url,
      method,
      headers,
      body,
      contentType: 'application/json',
      timestamp: Date.now(),
      retries: 0,
      maxRetries: options?.maxRetries ?? 3,
      status: 'pending',
    }

    const id = await this.db.enqueue(queueItem)
    this.status.pendingCount = await this.db.getCount('pending')
    this.emitStatus()

    // Try background sync
    this.requestBackgroundSync()

    return id
  }

  // ─── Conflict Resolution ───

  async resolveConflict(
    conflictId: string,
    resolution: 'local' | 'server' | 'merged',
    mergedData?: Record<string, unknown>
  ): Promise<{ success: boolean; synced: boolean }> {
    try {
      // Mark conflict as resolved
      await this.db.resolveConflict(conflictId, resolution, mergedData)

      // Update the sync queue item
      const queueItems = await this.db.getAll()
      const queueItem = queueItems.find(i => i.conflictData?.resourceId === conflictId)
      if (queueItem) {
        if (resolution === 'server') {
          // Discard local, remove from queue
          await this.db.remove(queueItem.id)
        } else if (resolution === 'local') {
          // Keep local data, re-queue
          await this.db.updateStatus(queueItem.id, 'pending')
        } else if (resolution === 'merged' && mergedData) {
          // Update the request body with merged data
          const { store } = await (this.db as unknown as { tx: (s: string, m?: IDBTransactionMode) => Promise<{ store: IDBObjectStore; tx: IDBTransaction }> })
            .tx('syncQueue', 'readwrite')
          const record = await (this.db as unknown as { promisifiedRequest: <T>(r: IDBRequest<T>, t: IDBTransaction) => Promise<T> })
            .promisifiedRequest(store.get(queueItem.id), store.transaction)
          if (record) {
            record.body = JSON.stringify(mergedData)
            record.status = 'pending'
            record.conflictData = undefined
            store.put(record)
          }
        }
      }

      // Update counts
      this.status.conflictCount = await this.db.getUnresolvedConflicts().then(c => c.length)
      this.status.pendingCount = await this.db.getCount('pending')
      this.emitStatus()

      // Try to sync the resolved item
      if (this.status.isOnline) {
        setTimeout(() => this.sync(), 300)
      }

      return { success: true, synced: this.status.isOnline }
    } catch (error) {
      console.error('[OfflineManager] Conflict resolution failed:', error)
      return { success: false, synced: false }
    }
  }

  async getUnresolvedConflicts(): Promise<ConflictData[]> {
    return this.db.getUnresolvedConflicts()
  }

  // ─── Preloading ───

  async preload(items?: PreloadItem[]): Promise<{ loaded: number; failed: number }> {
    const toPreload = items ?? DEFAULT_PRELOAD_ITEMS
    let loaded = 0
    let failed = 0

    const promises = toPreload.map(async (item) => {
      try {
        if (item.strategy === 'cache-first') {
          const cache = await caches.open('preload-v1')
          await cache.add(item.url)
        } else {
          // network-first: fetch and cache
          const response = await fetch(item.url, { cache: 'no-store' })
          if (response.ok) {
            const cache = await caches.open('preload-v1')
            cache.put(item.url, response)
          }
        }
        loaded++
      } catch {
        failed++
      }
    })

    await Promise.allSettled(promises)
    return { loaded, failed }
  }

  // ─── Background Sync ───

  async requestBackgroundSync(): Promise<boolean> {
    if (!this.swRegistration?.active) return false

    try {
      const reg = this.swRegistration as ServiceWorkerRegistration & {
        sync?: { register: (tag: string) => Promise<void> }
      }
      if (!reg.sync) return false
      await reg.sync.register('sync-pending-requests')
      console.log('[OfflineManager] Background sync registered')
      return true
    } catch (error) {
      console.warn('[OfflineManager] Background sync not available:', error)
      // Fall back to regular sync
      if (this.status.isOnline) {
        setTimeout(() => this.sync(), 100)
      }
      return false
    }
  }

  // ─── Status ───

  getStatus(): OfflineStatus {
    return { ...this.status }
  }

  onStatusChange(fn: (status: OfflineStatus) => void): () => void {
    this.statusListeners.add(fn)
    return () => this.statusListeners.delete(fn)
  }

  private emitStatus(): void {
    const status = this.getStatus()
    this.statusListeners.forEach(fn => {
      try { fn(status) } catch (e) { console.error(e) }
    })
    notifyListeners('status', status)
  }

  // ─── Apply SW Update ───

  async applyUpdate(): Promise<boolean> {
    if (!this.swRegistration?.waiting) return false

    this.swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' })

    return new Promise((resolve) => {
      const checkController = () => {
        if (navigator.serviceWorker.controller) {
          this.status.swUpdateAvailable = false
          this.emitStatus()
          window.location.reload()
          resolve(true)
        } else {
          setTimeout(checkController, 100)
        }
      }
      checkController()
    })
  }

  // ─── Utility ───

  private parseBody(body: string | undefined): Record<string, unknown> {
    try { return body ? JSON.parse(body) : {} } catch { return {} }
  }

  // ─── Cleanup ───

  async destroy(): Promise<void> {
    if (this.pingInterval) clearInterval(this.pingInterval)
    this.statusListeners.clear()
    this.initialized = false
  }
}

// ═══════════════════════════════════════════════════════════════
// SINGLETON EXPORT
// ═══════════════════════════════════════════════════════════════

export const offlineManager = new OfflineManagerClass()

// ═══════════════════════════════════════════════════════════════
// REACT HOOK: useOfflineStatus
// ═══════════════════════════════════════════════════════════════

export function useOfflineStatus(): OfflineStatus {
  const [status, setStatus] = useState<OfflineStatus>(() => offlineManager.getStatus())

  useEffect(() => {
    const unsub = offlineManager.onStatusChange(setStatus)
    return unsub
  }, [])

  // Subscribe to native online/offline events as a fallback
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleOnline = () => setStatus(prev => ({ ...prev, isOnline: true }))
    const handleOffline = () => setStatus(prev => ({ ...prev, isOnline: false }))

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return status
}

// ═══════════════════════════════════════════════════════════════
// REACT COMPONENT: SyncIndicator
// ═══════════════════════════════════════════════════════════════

export interface SyncIndicatorProps {
  /** Show only when there's an issue, hide when fully online and synced */
  showOnlyOnIssue?: boolean
  /** Position variant */
  position?: 'top' | 'bottom' | 'floating'
  /** Custom className */
  className?: string
  /** Callback when indicator is tapped */
  onTap?: () => void
}

const SYNC_STATUS_MESSAGES: Record<OfflineStatus['swStatus'], string> = {
  unsupported: '',
  installing: 'Installing offline support…',
  installed: 'Ready to work offline',
  activating: 'Activating offline support…',
  activated: '',
  redundant: '',
  error: 'Offline support failed to load',
}

export function SyncIndicator({
  showOnlyOnIssue = false,
  position = 'bottom',
  className = '',
  onTap,
}: SyncIndicatorProps): React.ReactElement | null {
  const status = useOfflineStatus()
  const [expanded, setExpanded] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const animFrameRef = useRef<number | null>(null)

  // Determine if we should show
  const hasIssue = !status.isOnline || status.isSyncing || status.pendingCount > 0 ||
    status.conflictCount > 0 || status.swUpdateAvailable || status.syncError !== null

  if (showOnlyOnIssue && !hasIssue && !status.isSyncing) {
    return null
  }

  // Auto-dismiss after 8s when everything is fine
  useEffect(() => {
    if (!hasIssue && !dismissed) {
      animFrameRef.current = window.setTimeout(() => setDismissed(true), 8000)
    }
    return () => { if (animFrameRef.current) clearTimeout(animFrameRef.current) }
  }, [hasIssue, dismissed])

  if (dismissed && !hasIssue) return null

  // Determine banner color
  const getBannerClass = (): string => {
    if (!status.isOnline) return 'bg-red-600 text-white'
    if (status.syncError) return 'bg-orange-500 text-white'
    if (status.conflictCount > 0) return 'bg-amber-500 text-white'
    if (status.isSyncing) return 'bg-blue-500 text-white'
    if (status.pendingCount > 0) return 'bg-blue-400 text-white'
    if (status.swUpdateAvailable) return 'bg-indigo-500 text-white'
    return 'bg-emerald-500 text-white'
  }

  const getIcon = (): string => {
    if (!status.isOnline) return '📡'
    if (status.isSyncing) return '🔄'
    if (status.conflictCount > 0) return '⚠️'
    if (status.swUpdateAvailable) return '🆕'
    if (status.pendingCount > 0) return '⏳'
    if (status.syncError) return '❌'
    return '✅'
  }

  const getStatusText = (): string => {
    if (!status.isOnline) return 'You are offline — changes will sync when connected'
    if (status.isSyncing) return 'Syncing your changes…'
    if (status.conflictCount > 0) return `${status.conflictCount} sync conflict${status.conflictCount > 1 ? 's' : ''} need${status.conflictCount === 1 ? 's' : ''} your attention`
    if (status.pendingCount > 0) return `${status.pendingCount} change${status.pendingCount > 1 ? 's' : ''} waiting to sync`
    if (status.swUpdateAvailable) return 'App update available — tap to refresh'
    if (status.syncError) return status.syncError
    if (SYNC_STATUS_MESSAGES[status.swStatus]) return SYNC_STATUS_MESSAGES[status.swStatus]
    return status.isOnline ? 'All changes synced' : 'Offline'
  }

  const positionClasses: Record<string, string> = {
    top: 'top-0 left-0 right-0 rounded-b-lg',
    bottom: 'bottom-0 left-0 right-0 rounded-t-lg',
    floating: 'bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 rounded-lg shadow-xl',
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={getStatusText()}
      className={`
        fixed z-50
        ${positionClasses[position]}
        ${getBannerClass()}
        px-4 py-3
        transition-all duration-300 ease-in-out
        ${dismissed && !hasIssue ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}
        ${className}
      `}
      onClick={() => {
        onTap?.()
        if (status.conflictCount > 0 || status.swUpdateAvailable) {
          setExpanded(!expanded)
        }
      }}
    >
      <div className="flex items-center gap-3 max-w-screen-xl mx-auto">
        {/* Icon with animation */}
        <span
          className="text-xl flex-shrink-0"
          role="img"
          aria-hidden="true"
        >
          {status.isSyncing && (
            <span className="inline-block animate-spin">
              {getIcon()}
            </span>
          )}
          {!status.isSyncing && getIcon()}
        </span>

        {/* Status text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">
            {getStatusText()}
          </p>
          {expanded && status.conflictCount > 0 && (
            <p className="text-xs opacity-80 mt-1">
              Tap here to resolve conflicts
            </p>
          )}
          {expanded && status.swUpdateAvailable && (
            <p className="text-xs opacity-80 mt-1">
              A new version is ready. Refresh now?
            </p>
          )}
        </div>

        {/* Count badge */}
        {(status.pendingCount > 0 || status.conflictCount > 0) && (
          <span className="
            flex-shrink-0
            bg-white/20
            rounded-full
            px-2 py-0.5
            text-xs
            font-bold
          ">
            {status.pendingCount + status.conflictCount}
          </span>
        )}

        {/* Dismiss button */}
        {!status.isSyncing && status.isOnline && status.pendingCount === 0 && status.conflictCount === 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              setDismissed(true)
            }}
            className="flex-shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Dismiss"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>

      {/* Expanded action buttons */}
      {expanded && status.swUpdateAvailable && (
        <div className="mt-3 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              offlineManager.applyUpdate()
            }}
            className="
              flex-1
              bg-white/20
              hover:bg-white/30
              text-sm
              font-medium
              py-2
              px-4
              rounded-lg
              transition-colors
            "
          >
            Refresh Now
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setExpanded(false)
            }}
            className="
              bg-white/10
              hover:bg-white/20
              text-sm
              py-2
              px-4
              rounded-lg
              transition-colors
            "
          >
            Later
          </button>
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// REACT COMPONENT: ConflictResolutionModal
// ═══════════════════════════════════════════════════════════════

export interface ConflictResolutionModalProps {
  /** Conflict to display */
  conflict: ConflictData
  /** Whether the modal is open */
  isOpen: boolean
  /** Called when modal closes (resolution or dismiss) */
  onClose: (resolved: boolean) => void
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return '—'
  if (typeof value === 'object') {
    try { return JSON.stringify(value, null, 2) } catch { return String(value) }
  }
  return String(value)
}

function DiffViewer({
  localVersion,
  serverVersion,
  resourceType,
}: {
  localVersion: Record<string, unknown>
  serverVersion: Record<string, unknown>
  resourceType: string
}): React.ReactElement {
  const allKeys = Array.from(new Set([...Object.keys(localVersion), ...Object.keys(serverVersion)]))
    .filter(k => !k.startsWith('_')) // Hide internal fields
    .sort()

  return (
    <div className="text-left text-sm">
      <p className="text-xs uppercase tracking-wider opacity-70 mb-2 font-semibold">
        {resourceType.charAt(0).toUpperCase() + resourceType.slice(1)} — Changes
      </p>
      <div className="space-y-1 max-h-64 overflow-y-auto pr-2">
        {allKeys.map(key => {
          const local = localVersion[key]
          const server = serverVersion[key]
          const changed = JSON.stringify(local) !== JSON.stringify(server)
          if (!changed) return null

          return (
            <div key={key} className="grid grid-cols-2 gap-2 py-1.5 border-b border-white/10 last:border-0">
              <div className="space-y-0.5">
                <span className="text-xs opacity-70 block">Your version</span>
                <span className="text-orange-200 font-mono text-xs break-all">
                  {formatValue(local)}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-xs opacity-70 block">Server version</span>
                <span className="text-blue-200 font-mono text-xs break-all">
                  {formatValue(server)}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function ConflictResolutionModal({
  conflict,
  isOpen,
  onClose,
}: ConflictResolutionModalProps): React.ReactElement | null {
  const [resolving, setResolving] = useState(false)
  const [resolution, setResolution] = useState<'local' | 'server' | null>(null)

  if (!isOpen) return null

  const timeAgo = (timestamp: number): string => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`
    return `${Math.floor(seconds / 86400)} days ago`
  }

  const handleResolve = async (choice: 'local' | 'server'): Promise<void> => {
    setResolving(true)
    setResolution(choice)

    try {
      const result = await offlineManager.resolveConflict(conflict.resourceId, choice)
      onClose(result.success)
    } catch (error) {
      console.error('Conflict resolution failed:', error)
      setResolving(false)
      setResolution(null)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="conflict-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => !resolving && onClose(false)}
      />

      {/* Modal */}
      <div className="
        relative
        bg-white
        rounded-2xl
        shadow-2xl
        max-w-lg
        w-full
        max-h-[90vh]
        overflow-y-auto
        animate-in
        fade-in
        zoom-in-95
        duration-200
      ">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">⚠️</span>
            <h2
              id="conflict-title"
              className="text-lg font-bold text-gray-900"
            >
              Sync Conflict Detected
            </h2>
          </div>
          <p className="text-sm text-gray-500">
            This {conflict.resourceType} was modified both on this device and the server.
            Choose which version to keep.
          </p>
        </div>

        {/* Diff viewer */}
        <div className="px-6 pb-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <DiffViewer
              localVersion={conflict.localVersion}
              serverVersion={conflict.serverVersion as Record<string, unknown>}
              resourceType={conflict.resourceType}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Detected {timeAgo(conflict.detectedAt)}
          </p>
        </div>

        {/* Action buttons */}
        <div className="p-6 pt-2 space-y-3">
          {/* Keep local version */}
          <button
            onClick={() => handleResolve('local')}
            disabled={resolving}
            className="
              w-full
              flex
              items-center
              gap-3
              p-4
              rounded-xl
              border-2
              border-orange-200
              hover:border-orange-400
              hover:bg-orange-50
              transition-all
              text-left
              disabled:opacity-50
              disabled:cursor-wait
            "
          >
            <span className="text-xl">📱</span>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Keep my changes</p>
              <p className="text-xs text-gray-500">Use the version from this device</p>
            </div>
            {resolution === 'local' && resolving && (
              <span className="ml-auto text-orange-500 animate-spin">⏳</span>
            )}
            {resolution === 'local' && !resolving && (
              <span className="ml-auto text-green-500">✓</span>
            )}
          </button>

          {/* Keep server version */}
          <button
            onClick={() => handleResolve('server')}
            disabled={resolving}
            className="
              w-full
              flex
              items-center
              gap-3
              p-4
              rounded-xl
              border-2
              border-blue-200
              hover:border-blue-400
              hover:bg-blue-50
              transition-all
              text-left
              disabled:opacity-50
              disabled:cursor-wait
            "
          >
            <span className="text-xl">☁️</span>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Use server version</p>
              <p className="text-xs text-gray-500">Discard local changes, keep the server copy</p>
            </div>
            {resolution === 'server' && resolving && (
              <span className="ml-auto text-blue-500 animate-spin">⏳</span>
            )}
            {resolution === 'server' && !resolving && (
              <span className="ml-auto text-green-500">✓</span>
            )}
          </button>

          {/* Dismiss */}
          {!resolving && (
            <button
              onClick={() => onClose(false)}
              className="
                w-full
                py-2
                text-sm
                text-gray-400
                hover:text-gray-600
                transition-colors
              "
            >
              Decide later
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════

export { IndexedDBStore }
