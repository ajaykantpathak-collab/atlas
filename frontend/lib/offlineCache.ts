"use client";

// =============================================================================
// OFFLINE CACHE â IndexedDB-backed offline-first layer
// =============================================================================
// Schema:
//   solves      â problem_type + hash(values)+seed â result
//   questions   â problem_type + id â question body
//   mastery     â problem_type â mastery level / state
//   profile     â student profile snapshot
//   syncQueue   â actions performed offline, flushed when online
// =============================================================================

const DB_NAME = "k12_offline_cache";
const DB_VERSION = 1;
const MAX_CACHE_BYTES = 50 * 1024 * 1024; // 50 MB cap

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SolveRecord {
  problem_type: string;
  values_hash: string;
  seed: number;
  result: unknown;
  timestamp: number;
  access_count: number;
}

export interface QuestionRecord {
  problem_type: string;
  id: string;
  content: unknown;
  options?: unknown[];
  difficulty?: string;
  timestamp: number;
  access_count: number;
}

export interface MasteryRecord {
  problem_type: string;
  level: number;
  last_updated: number;
  attempts: number;
  correct: number;
}

export interface ProfileRecord {
  key: string;
  data: unknown;
  timestamp: number;
}

export interface SyncAction {
  id?: number;
  action_type: string;
  payload: unknown;
  timestamp: number;
  retries: number;
}

export interface OfflineCacheAPI {
  cacheSolve(
    problem_type: string,
    values: unknown,
    seed: number,
    result: unknown,
  ): Promise<void>;
  getCachedSolve(
    problem_type: string,
    values: unknown,
    seed: number,
  ): Promise<unknown | null>;
  cacheQuestion(question: QuestionRecord): Promise<void>;
  getCachedQuestions(problem_type: string): Promise<QuestionRecord[]>;
  setMastery(mastery: MasteryRecord): Promise<void>;
  getMastery(problem_type: string): Promise<MasteryRecord | null>;
  setProfile(key: string, data: unknown): Promise<void>;
  getProfile(key: string): Promise<unknown | null>;
  queueAction(action_type: string, payload: unknown): Promise<void>;
  processSyncQueue(): Promise<{ synced: number; failed: number }>;
  isOnline(): boolean;
  getCacheSize(): Promise<number>; // MB
  clearAll(): Promise<void>;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function hashValues(values: unknown): string {
  try {
    const str = JSON.stringify(values);
    // Fast non-cryptographic hash (djb2 variant)
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
    }
    return hash.toString(36);
  } catch {
    return String(values);
  }
}

function estimateBytes(obj: unknown): number {
  try {
    return new TextEncoder().encode(JSON.stringify(obj)).length;
  } catch {
    return 100;
  }
}

// ---------------------------------------------------------------------------
// IndexedDB bootstrap
// ---------------------------------------------------------------------------

let dbInstance: IDBDatabase | null = null;

function getDB(): Promise<IDBDatabase> {
  if (dbInstance) return Promise.resolve(dbInstance);

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () =>
      reject(new Error("IndexedDB failed to open"));

    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // --- solves store ---
      if (!db.objectStoreNames.contains("solves")) {
        const solveStore = db.createObjectStore("solves", {
          keyPath: ["problem_type", "values_hash", "seed"],
        });
        solveStore.createIndex("problem_type", "problem_type", {
          unique: false,
        });
        solveStore.createIndex("timestamp", "timestamp", { unique: false });
      }

      // --- questions store ---
      if (!db.objectStoreNames.contains("questions")) {
        const qStore = db.createObjectStore("questions", {
          keyPath: ["problem_type", "id"],
        });
        qStore.createIndex("problem_type", "problem_type", {
          unique: false,
        });
        qStore.createIndex("timestamp", "timestamp", { unique: false });
      }

      // --- mastery store ---
      if (!db.objectStoreNames.contains("mastery")) {
        const mStore = db.createObjectStore("mastery", {
          keyPath: "problem_type",
        });
        mStore.createIndex("last_updated", "last_updated", {
          unique: false,
        });
      }

      // --- profile store ---
      if (!db.objectStoreNames.contains("profile")) {
        db.createObjectStore("profile", { keyPath: "key" });
      }

      // --- sync queue store ---
      if (!db.objectStoreNames.contains("syncQueue")) {
        const sqStore = db.createObjectStore("syncQueue", {
          keyPath: "id",
          autoIncrement: true,
        });
        sqStore.createIndex("timestamp", "timestamp", { unique: false });
      }
    };
  });
}

// ---------------------------------------------------------------------------
// Generic IDB helpers (fast path â <10ms target)
// ---------------------------------------------------------------------------

function idbGet<T>(
  storeName: string,
  key: IDBValidKey,
): Promise<T | null> {
  return getDB().then((db) =>
    new Promise<T | null>((resolve, reject) => {
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => reject(req.error);
    }),
  );
}

function idbPut<T>(
  storeName: string,
  value: T,
  key?: IDBValidKey,
): Promise<void> {
  return getDB().then((db) =>
    new Promise<void>((resolve, reject) => {
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const req = store.put(value);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    }),
  );
}

function idbGetAll<T>(
  storeName: string,
  indexName: string,
  value: IDBValidKey,
): Promise<T[]> {
  return getDB().then((db) =>
    new Promise<T[]>((resolve, reject) => {
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const idx = store.index(indexName);
      const req = idx.getAll(value);
      req.onsuccess = () => resolve(req.result ?? []);
      req.onerror = () => reject(req.error);
    }),
  );
}

function idbDelete(
  storeName: string,
  key: IDBValidKey,
): Promise<void> {
  return getDB().then((db) =>
    new Promise<void>((resolve, reject) => {
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    }),
  );
}

function idbClear(storeName: string): Promise<void> {
  return getDB().then((db) =>
    new Promise<void>((resolve, reject) => {
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    }),
  );
}

// ---------------------------------------------------------------------------
// LRU eviction â keep total cached bytes â¤ 50 MB
// ---------------------------------------------------------------------------

async function evictIfOverLimit(
  addedBytes: number,
): Promise<void> {
  const currentSize = await getCacheSizeBytes();
  if (currentSize + addedBytes <= MAX_CACHE_BYTES) return;

  // Collect all timestamp-sortable entries across evictable stores
  const db = await getDB();

  const candidates: { store: string; key: string; ts: number }[] = [];

  const scanStore = (
    storeName: string,
    tsIndex: string,
    extractKey: (rec: unknown) => string,
  ) => {
    return new Promise<void>((resolve) => {
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const idx = store.index(tsIndex);
      const req = idx.openCursor();
      req.onsuccess = () => {
        const cursor = req.result;
        if (cursor) {
          const rec = cursor.value as Record<string, unknown>;
          candidates.push({
            store: storeName,
            key: extractKey(rec),
            ts: (rec.timestamp as number) || 0,
          });
          cursor.continue();
        } else {
          resolve();
        }
      };
      req.onerror = () => resolve();
    });
  };

  await scanStore("solves", "timestamp", (r) =>
    `${(r as SolveRecord).problem_type}|${(r as SolveRecord).values_hash}|${(r as SolveRecord).seed}`,
  );
  await scanStore("questions", "timestamp", (r) =>
    `${(r as QuestionRecord).problem_type}|${(r as QuestionRecord).id}`,
  );

  // Sort oldest-first (LRU)
  candidates.sort((a, b) => a.ts - b.ts);

  const deleteKeys = candidates.map((c) => c.key);

  for (const keyStr of deleteKeys) {
    const [storeName, ...rest] = keyStr.split("|");
    // Reconstruct composite key for solves / questions
    const db2 = await getDB();
    const tx = db2.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);

    if (storeName === "solves") {
      const [pt, vh, s] = rest;
      store.delete([pt, vh, parseInt(s, 10)] as IDBValidKey);
    } else if (storeName === "questions") {
      const [pt, qid] = rest;
      store.delete([pt, qid] as IDBValidKey);
    }

    if ((await getCacheSizeBytes()) + addedBytes <= MAX_CACHE_BYTES) break;
  }
}

async function getCacheSizeBytes(): Promise<number> {
  const db = await getDB();
  let total = 0;

  const measureStore = (storeName: string): Promise<void> =>
    new Promise<void>((resolve) => {
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const req = store.openCursor();
      req.onsuccess = () => {
        const cursor = req.result;
        if (cursor) {
          total += estimateBytes(cursor.value);
          cursor.continue();
        } else {
          resolve();
        }
      };
      req.onerror = () => resolve();
    });

  await measureStore("solves");
  await measureStore("questions");
  await measureStore("mastery");
  await measureStore("profile");

  return total;
}

// ---------------------------------------------------------------------------
// Network status
// ---------------------------------------------------------------------------

let onlineStatus: boolean = typeof navigator !== "undefined"
  ? navigator.onLine
  : true;

if (typeof window !== "undefined") {
  window.addEventListener("online", () => {
    onlineStatus = true;
    // Auto-flush sync queue when connection returns
    offlineCache.processSyncQueue().catch(console.error);
  });
  window.addEventListener("offline", () => {
    onlineStatus = false;
  });
}

// ---------------------------------------------------------------------------
// API implementation
// ---------------------------------------------------------------------------

export const offlineCache: OfflineCacheAPI = {
  // =======================================================================
  // Solved-problem cache
  // =======================================================================

  async cacheSolve(
    problem_type: string,
    values: unknown,
    seed: number,
    result: unknown,
  ): Promise<void> {
    const values_hash = hashValues(values);
    const record: SolveRecord = {
      problem_type,
      values_hash,
      seed,
      result,
      timestamp: Date.now(),
      access_count: 0,
    };

    const bytes = estimateBytes(record);
    await evictIfOverLimit(bytes);

    const key: [string, string, number] = [problem_type, values_hash, seed];

    // Check if existing â update access_count if replacing
    const existing = await idbGet<SolveRecord>("solves", key);
    if (existing) {
      record.access_count = existing.access_count + 1;
    }

    await idbPut("solves", record, key);
  },

  async getCachedSolve(
    problem_type: string,
    values: unknown,
    seed: number,
  ): Promise<unknown | null> {
    const values_hash = hashValues(values);
    const key: [string, string, number] = [problem_type, values_hash, seed];

    const record = await idbGet<SolveRecord>("solves", key);
    if (!record) return null;

    // Increment access_count for LRU tracking
    record.access_count += 1;
    await idbPut("solves", record, key);

    return record.result;
  },

  // =======================================================================
  // Practice-question cache
  // =======================================================================

  async cacheQuestion(question: QuestionRecord): Promise<void> {
    question.timestamp = Date.now();
    question.access_count = (question.access_count ?? 0) + 1;

    const bytes = estimateBytes(question);
    await evictIfOverLimit(bytes);

    const key: [string, string] = [question.problem_type, question.id];
    await idbPut("questions", question, key);
  },

  async getCachedQuestions(problem_type: string): Promise<QuestionRecord[]> {
    const results = await idbGetAll<QuestionRecord>(
      "questions",
      "problem_type",
      problem_type,
    );

    // Bump access_count for LRU
    const db = await getDB();
    const tx = db.transaction("questions", "readwrite");
    const store = tx.objectStore("questions");
    for (const q of results) {
      q.access_count = (q.access_count ?? 0) + 1;
      store.put(q);
    }

    return results;
  },

  // =======================================================================
  // Mastery state (server wins on conflict)
  // =======================================================================

  async setMastery(mastery: MasteryRecord): Promise<void> {
    const existing = await idbGet<MasteryRecord>("mastery", mastery.problem_type);

    // Conflict resolution: if server sent a more recent update, keep it
    if (existing && existing.last_updated > mastery.last_updated) {
      // Server is newer â merge client correct count into server data
      mastery.attempts += existing.attempts;
      mastery.correct += existing.correct;
    }

    mastery.last_updated = Date.now();
    await idbPut("mastery", mastery);
  },

  async getMastery(problem_type: string): Promise<MasteryRecord | null> {
    return idbGet<MasteryRecord>("mastery", problem_type);
  },

  // =======================================================================
  // Profile cache
  // =======================================================================

  async setProfile(key: string, data: unknown): Promise<void> {
    const record: ProfileRecord = {
      key,
      data,
      timestamp: Date.now(),
    };
    await idbPut("profile", record, key);
  },

  async getProfile(key: string): Promise<unknown | null> {
    const record = await idbGet<ProfileRecord>("profile", key);
    return record?.data ?? null;
  },

  // =======================================================================
  // Sync queue
  // =======================================================================

  async queueAction(action_type: string, payload: unknown): Promise<void> {
    const action: SyncAction = {
      action_type,
      payload,
      timestamp: Date.now(),
      retries: 0,
    };

    await idbPut("syncQueue", action);

    // Attempt immediate sync if online
    if (offlineCache.isOnline()) {
      offlineCache.processSyncQueue().catch(console.error);
    }
  },

  async processSyncQueue(): Promise<{ synced: number; failed: number }> {
    if (!offlineCache.isOnline()) {
      return { synced: 0, failed: 0 };
    }

    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    if (!token) {
      return { synced: 0, failed: 0 };
    }

    const db = await getDB();
    const tx = db.transaction("syncQueue", "readonly");
    const store = tx.objectStore("syncQueue");

    const allActions: SyncAction[] = await new Promise((resolve) => {
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result ?? []);
      req.onerror = () => resolve([]);
    });

    let synced = 0;
    let failed = 0;

    for (const action of allActions) {
      try {
        const endpoint = `/api/sync/${action.action_type}`;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001"}${endpoint}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(action.payload),
          },
        );

        if (response.ok) {
          // Remove from queue on success
          if (action.id !== undefined) {
            await idbDelete("syncQueue", action.id);
          }
          synced++;
        } else if (response.status >= 500) {
          // Server error â increment retry, keep in queue
          action.retries = (action.retries ?? 0) + 1;
          if (action.retries < 5 && action.id !== undefined) {
            await idbPut("syncQueue", action, action.id);
          } else {
            // Drop after 5 retries to prevent queue bloat
            if (action.id !== undefined) {
              await idbDelete("syncQueue", action.id);
            }
            failed++;
          }
        } else {
          // 4xx â don't retry, drop
          if (action.id !== undefined) {
            await idbDelete("syncQueue", action.id);
          }
          failed++;
        }
      } catch {
        // Network error â keep in queue for next attempt
        action.retries = (action.retries ?? 0) + 1;
        if (action.id !== undefined) {
          await idbPut("syncQueue", action, action.id);
        }
        failed++;
        // Don't process remaining â network is down
        break;
      }
    }

    return { synced, failed };
  },

  // =======================================================================
  // Utilities
  // =======================================================================

  isOnline(): boolean {
    return onlineStatus;
  },

  async getCacheSize(): Promise<number> {
    const bytes = await getCacheSizeBytes();
    return Math.round((bytes / (1024 * 1024)) * 100) / 100; // MB
  },

  async clearAll(): Promise<void> {
    const db = await getDB();
    const stores = [
      "solves",
      "questions",
      "mastery",
      "profile",
      "syncQueue",
    ];

    await Promise.all(
      stores.map((name) =>
        new Promise<void>((resolve) => {
          const tx = db.transaction(name, "readwrite");
          const store = tx.objectStore(name);
          const req = store.clear();
          req.onsuccess = () => resolve();
          req.onerror = () => resolve();
        }),
      ),
    );
  },
};

export default offlineCache;