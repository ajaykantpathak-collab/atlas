// =============================================================================
// Solver Service Layer — React Query Hooks + IndexedDB Cache + Offline Retry
// =============================================================================

import axios, { AxiosError } from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useCallback, useEffect, useRef, useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// 1. TYPE DEFINITIONS  (matches backend Pydantic schemas)
// ─────────────────────────────────────────────────────────────────────────────

/** Difficulty levels for generated problems */
export enum DifficultyLevel {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

/** A single step in a worked solution */
export interface SolutionStep {
  step_number: number;
  description: string;
  latex_expression?: string;
  result: string;
  hint?: string;
}

/** Full solver response returned after solving a problem */
export interface SolverResponse {
  success: boolean;
  answer: string;
  formatted_answer: string;
  steps: SolutionStep[];
  explanation: string;
  latex_output?: string;
  seed: number;
  time_taken_ms: number;
  cached: boolean;
}

/** One field in a problem-type form definition */
export interface FormFieldDef {
  key: string;
  label: string;
  type: 'number' | 'text' | 'select' | 'boolean';
  required: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
}

/** Definition of a problem type (used to render dynamic forms) */
export interface ProblemType {
  id: string;
  name: string;
  display_name: string;
  description: string;
  subject: string;
  chapter?: string;
  difficulty: DifficultyLevel;
  fields: FormFieldDef[];
  icon?: string;
  tags: string[];
}

/** Response from GET /api/solver/types */
export interface ProblemTypesResponse {
  subjects: Record<string, ProblemType[]>; // keyed by subject name
  total_count: number;
}

/** Payload for POST /api/solver/solve */
export interface SolveRequest {
  problem_type: string;
  values: Record<string, number | string | boolean>;
  seed: number;
}

/** Payload for POST /api/solver/generate */
export interface GenerateRequest {
  problem_type: string;
  seed?: number;
  difficulty: DifficultyLevel;
}

/** Response from POST /api/solver/generate */
export interface GenerateResponse {
  problem_type: string;
  seed: number;
  question_text: string;
  values: Record<string, number | string | boolean>;
  difficulty: DifficultyLevel;
}

/** Health check response */
export interface HealthResponse {
  status: 'ok' | 'degraded' | 'down';
  solver_loaded: boolean;
  model_loaded: boolean;
  cache_size_mb?: number;
  uptime_seconds?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. API CLIENT
// ─────────────────────────────────────────────────────────────────────────────

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || '';

/** Auth token key in localStorage */
const TOKEN_KEY = 'token';

/** Create an axios instance with base config */
const createApiClient = () => {
  const token = typeof window !== 'undefined'
    ? localStorage.getItem(TOKEN_KEY)
    : null;

  return axios.create({
    baseURL: API_BASE_URL,
    timeout: 60_000, // 60 s — network may be slow on 3G
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};

/** Generic request with 3 retries + exponential backoff */
async function requestWithRetry<T>(
  requestFn: () => Promise<{ data: T }>,
  retries = 3,
  baseDelay = 1000,
): Promise<T> {
  let lastError: AxiosError | undefined;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const { data } = await requestFn();
      return data;
    } catch (err) {
      lastError = err as AxiosError;

      // Don't retry on 4xx (client errors)
      if (lastError.response && lastError.response.status < 500) {
        throw lastError;
      }

      // If this was the last attempt, throw
      if (attempt === retries) break;

      // Exponential backoff with jitter
      const jitter = Math.random() * 500;
      const delay = baseDelay * 2 ** attempt + jitter;
      await new Promise((r) => setTimeout(r, delay));
    }
  }

  throw lastError;
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. INDEXED-DB CACHE  (offline-first)
// ─────────────────────────────────────────────────────────────────────────────

const DB_NAME = 'learn-solver-cache';
const STORE_NAME = 'solved-problems';
const DB_VERSION = 1;

function openCacheDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'cacheKey' });
        store.createIndex('problemType', 'problemType', { unique: false });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/** Deterministic hash: seed + JSON(values) → string key */
function buildCacheKey(problemType: string, values: Record<string, unknown>, seed: number): string {
  // Stable JSON stringify (sorted keys)
  const valuesStr = Object.keys(values)
    .sort()
    .map((k) => `${k}=${values[k]}`)
    .join('&');
  return `${problemType}:${seed}:${valuesStr}`;
}

/** Return a SHA-256-style hex hash for use as a safe IndexedDB key */
async function hashKey(key: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

interface CachedEntry {
  cacheKey: string;
  problemType: string;
  seed: number;
  valuesHash: string;
  response: SolverResponse;
  timestamp: number;
  expiryMs: number;
}

const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

async function getCached(cacheKey: string): Promise<CachedEntry | null> {
  try {
    const db = await openCacheDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(cacheKey);
      req.onsuccess = () => {
        const entry = req.result as CachedEntry | undefined;
        if (!entry) return resolve(null);
        // Purge expired entries on read
        if (Date.now() > entry.timestamp + entry.expiryMs) {
          store.delete(cacheKey);
          return resolve(null);
        }
        resolve(entry);
      };
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

async function setCached(entry: CachedEntry): Promise<void> {
  try {
    const db = await openCacheDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(entry);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // Silently fail — cache is non-critical
  }
}

/** Purge old entries (used for periodic cleanup) */
async function purgeExpiredCache(): Promise<void> {
  try {
    const db = await openCacheDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const index = store.index('timestamp');
      const req = index.openCursor();

      req.onsuccess = (ev: Event) => {
        const cursor = (ev.target as IDBRequest).result as IDBCursorWithValue | null;
        if (cursor) {
          const entry = cursor.value as CachedEntry;
          if (Date.now() > entry.timestamp + entry.expiryMs) {
            cursor.delete();
          }
          cursor.continue();
        } else {
          resolve();
        }
      };
      req.onerror = () => reject(req.error);
    });
  } catch {
    // Non-critical
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. RAW API SERVICE FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

const api = createApiClient();

async function fetchProblemTypes(): Promise<ProblemTypesResponse> {
  return requestWithRetry(() => api.get('/api/solver/types'));
}

async function fetchProblemTypeById(id: string): Promise<ProblemType> {
  return requestWithRetry(() => api.get(`/api/solver/types/${encodeURIComponent(id)}`));
}

async function solveProblem(req: SolveRequest): Promise<SolverResponse> {
  return requestWithRetry(() => api.post('/api/solver/solve', req));
}

async function generateProblem(req: GenerateRequest): Promise<GenerateResponse> {
  return requestWithRetry(() => api.post('/api/solver/generate', req));
}

async function checkSolverHealth(): Promise<HealthResponse> {
  return requestWithRetry(() => api.get('/api/solver/health'), 1);
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. REACT QUERY HOOKS
// ─────────────────────────────────────────────────────────────────────────────

// ---- useSolverTypes ---------------------------------------------------------
/** List all problem types grouped by subject. Refetches every 5 minutes. */
export function useSolverTypes(enabled = true) {
  return useQuery({
    queryKey: ['solver', 'types'],
    queryFn: fetchProblemTypes,
    enabled,
    staleTime: 5 * 60 * 1000,   // 5 min
    gcTime: 30 * 60 * 1000,     // 30 min
    retry: 2,
    refetchOnWindowFocus: false, // avoid refetch while student is solving
  });
}

// ---- useProblemType ---------------------------------------------------------
/** Get a single problem type definition by ID */
export function useProblemType(id: string | undefined, enabled = true) {
  return useQuery({
    queryKey: ['solver', 'types', id],
    queryFn: () => fetchProblemTypeById(id!),
    enabled: enabled && !!id,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
  });
}

// ---- useSolve ---------------------------------------------------------------
/**
 * Solve a problem. Flow:
 *   1. Compute deterministic cache key from (problem_type, values, seed).
 *   2. If navigator.onLine === false → return cached result instantly (offline mode).
 *   3. If online → POST to /api/solver/solve, then cache the response in IndexedDB.
 *   4. On network failure after 3 retries → fall back to cache if available.
 */
export function useSolve() {
  const queryClient = useQueryClient();
  const abortRef = useRef<AbortController | null>(null);

  const solveMutation = useMutation({
    mutationFn: async (req: SolveRequest): Promise<SolverResponse> => {
      const cacheKey = await hashKey(buildCacheKey(req.problem_type, req.values, req.seed));

      // ── Offline: try cache first ────────────────────────────────────────
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        const cached = await getCached(cacheKey);
        if (cached) {
          return { ...cached.response, cached: true };
        }
        throw new Error(
          'No cached result found. Please connect to the internet to solve this problem.',
        );
      }

      // ── Online: try API ─────────────────────────────────────────────────
      abortRef.current = new AbortController();

      try {
        const result = await solveProblem(req);

        // Cache the successful response
        const fullCacheKey = buildCacheKey(req.problem_type, req.values, req.seed);
        const hashedKey = await hashKey(fullCacheKey);
        await setCached({
          cacheKey: hashedKey,
          problemType: req.problem_type,
          seed: req.seed,
          valuesHash: await hashKey(JSON.stringify(req.values)),
          response: result,
          timestamp: Date.now(),
          expiryMs: CACHE_TTL,
        });

        // Invalidate types list in case solver added new support
        queryClient.invalidateQueries({ queryKey: ['solver'] });

        return result;
      } catch (apiError) {
        const axiosErr = apiError as AxiosError;

        // API failed → try cache
        const cached = await getCached(cacheKey);
        if (cached) {
          return { ...cached.response, cached: true };
        }

        // Enhance error message for students
        if (axiosErr.code === 'ECONNABORTED') {
          throw new Error('Network is slow. Please check your connection and try again.');
        }
        if (axiosErr.code === 'ERR_NETWORK') {
          throw new Error('No internet connection. Showing cached results if available.');
        }

        throw apiError;
      }
    },

    // ── Optimistic UI is NOT safe here (math results must be accurate) ────
    // But we do provide state tracking so the UI can show progress

    onError: (error: Error) => {
      console.error('[Solver] Solve failed:', error.message);
    },

    onSettled: () => {
      if (abortRef.current) {
        abortRef.current.abort();
        abortRef.current = null;
      }
    },
  });

  /** Cancel any in-flight request */
  const cancelSolve = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  }, []);

  /** Check if a specific problem is already cached (for instant UI feedback) */
  const checkCached = useCallback(async (req: SolveRequest): Promise<SolverResponse | null> => {
    const cacheKey = await hashKey(buildCacheKey(req.problem_type, req.values, req.seed));
    const cached = await getCached(cacheKey);
    if (cached) {
      return { ...cached.response, cached: true };
    }
    return null;
  }, []);

  return {
    ...solveMutation,
    cancelSolve,
    checkCached,
  };
}

// ---- useGenerate ------------------------------------------------------------
/** Generate a random problem of a given type & difficulty */
export function useGenerate() {
  return useMutation({
    mutationFn: generateProblem,
    retry: 2,
    onError: (error: Error) => {
      console.error('[Solver] Generate failed:', error.message);
    },
  });
}

// ---- useSolverHealth --------------------------------------------------------
/** One-shot health check — refetch manually via returned function */
export function useSolverHealth() {
  return useQuery({
    queryKey: ['solver', 'health'],
    queryFn: checkSolverHealth,
    refetchInterval: 60_000,       // poll every 60 s
    retry: 1,
    staleTime: 30_000,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. UTILITY HOOKS
// ─────────────────────────────────────────────────────────────────────────────

/** Derived hook: returns whether we're currently online (updates on events) */
export function useOnlineStatus(): boolean {
  const [online, setOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return online;
}

/** Check if a solve result is from cache */
export function isCachedResult(response: SolverResponse | undefined): boolean {
  return response?.cached ?? false;
}

/** Prefetch a problem type's form definition into React Query cache */
export function prefetchProblemType(
  queryClient: ReturnType<typeof useQueryClient>,
  id: string,
): Promise<void> {
  return queryClient.prefetchQuery({
    queryKey: ['solver', 'types', id],
    queryFn: () => fetchProblemTypeById(id),
    staleTime: 10 * 60 * 1000,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. PERIODIC CLEANUP  (purge stale cache entries)
// ─────────────────────────────────────────────────────────────────────────────

let cleanupInterval: ReturnType<typeof setInterval> | null = null;

/** Call once at app startup (e.g. in layout.tsx) */
export function startCacheCleanup(intervalMs = 3600_000): void {
  if (cleanupInterval) return; // already running

  // Clean on load
  purgeExpiredCache();

  cleanupInterval = setInterval(() => {
    purgeExpiredCache();
  }, intervalMs);
}

/** Stop the cleanup loop (e.g. in layout unmount) */
export function stopCacheCleanup(): void {
  if (cleanupInterval) {
    clearInterval(cleanupInterval);
    cleanupInterval = null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. NEEDED IMPORT FIX
// ─────────────────────────────────────────────────────────────────────────────

// Fix the missing import for useOnlineStatus

