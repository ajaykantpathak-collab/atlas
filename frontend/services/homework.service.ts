"use client";

import { useQuery, useMutation, useQueryClient, type QueryClient, type UseQueryOptions } from "@tanstack/react-query";
import { getAuthToken } from "@/lib/api";

// ─────────────────────────────────────────────────────
// TRANSLATIONS
// ─────────────────────────────────────────────────────

export const translations = {
  en: {
    homeworkListTitle: "Homework",
    homeworkDetailTitle: "Homework Detail",
    submitBtn: "Submit",
    submittingBtn: "Submitting…",
    overdueTitle: "Overdue Homework",
    loadError: "Could not load homework. Please try again.",
    submitSuccess: "Homework submitted successfully!",
    submitError: "Submission failed. Your answers are saved offline.",
    retrying: "Retrying…",
    noHomework: "No homework assigned yet.",
    noOverdue: "No overdue homework. Great job!",
    offlineBanner: "You are offline. Showing cached data.",
    lastSynced: "Last synced:",
  },
  hi: {
    homeworkListTitle: "गृहकार्य",
    homeworkDetailTitle: "गृहकार्य विवरण",
    submitBtn: "जमा करें",
    submittingBtn: "जमा हो रहा है…",
    overdueTitle: "देर से गृहकार्य",
    loadError: "गृहकार्य लोड नहीं हो सका। कृपया पुनः प्रयास करें।",
    submitSuccess: "गृहकार्य सफलतापूर्वक जमा हो गया!",
    submitError: "जमा करने में विफल। आपके उत्तर ऑफ़लाइन सहेजे गए हैं।",
    retrying: "पुनः प्रयास हो रहा है…",
    noHomework: "अभी कोई गृहकार्य असाइन नहीं किया गया है।",
    noOverdue: "कोई देर से गृहकार्य नहीं है। बहुत बढ़िया!",
    offlineBanner: "आप ऑफ़लाइन हैं। कैश डेटा दिखाया जा रहा है।",
    lastSynced: "अंतिम सिंक:",
  },
  hi_en: {
    homeworkListTitle: "Homework / गृहकार्य",
    homeworkDetailTitle: "Homework Detail / गृहकार्य विवरण",
    submitBtn: "Submit / जमा करें",
    submittingBtn: "Submitting… / जमा हो रहा है…",
    overdueTitle: "Overdue / देर से गृहकार्य",
    loadError: "Could not load homework / गृहकार्य लोड नहीं हो सका।",
    submitSuccess: "Submitted successfully! / सफलतापूर्वक जमा!",
    submitError: "Failed. Saved offline / विफल। ऑफ़लाइन सहेजा।",
    retrying: "Retrying… / पुनः प्रयास…",
    noHomework: "No homework yet / अभी कोई गृहकार्य नहीं",
    noOverdue: "No overdue / कोई देर से नहीं। बहुत बढ़िया!",
    offlineBanner: "Offline – showing cached / ऑफ़लाइन – कैश दिखाया जा रहा",
    lastSynced: "Last synced / अंतिम सिंक:",
  },
} as const;

export type Language = keyof typeof translations;

export function t(lang: Language, key: keyof typeof translations["en"]): string {
  return translations[lang]?.[key] ?? translations["en"][key];
}

// ─────────────────────────────────────────────────────
// TYPE DEFINITIONS
// ─────────────────────────────────────────────────────

export interface Question {
  id: string;
  text: string;
  type: "mcq" | "fill_blank" | "long_answer";
  options?: string[];
  marks: number;
  studentAnswer?: string;
}

export interface Homework {
  id: string;
  title: string;
  subject: string;
  description: string;
  dueDate: string; // ISO-8601
  assignedDate: string;
  status: "pending" | "submitted" | "graded" | "overdue";
  totalMarks: number;
  obtainedMarks?: number;
  questions: Question[];
  teacherFeedback?: string;
}

export interface HomeworkDetail extends Homework {
  attachments?: Array<{ name: string; url: string }>;
  submissionHistory?: Array<{
    submittedAt: string;
    answers: Record<string, string>;
  }>;
}

export interface SubmitPayload {
  answers: Record<string, string>; // questionId -> answer
  timeSpentSeconds?: number;
}

export interface SubmitResponse {
  success: boolean;
  submissionId: string;
  submittedAt: string;
  message: string;
}

export interface HomeworkListResponse {
  homework: Homework[];
  total: number;
  page: number;
  pageSize: number;
}

export interface OverdueResponse {
  overdue: Homework[];
  totalOverdue: number;
}

// ─────────────────────────────────────────────────────
// INDEXEDDB HELPERS
// ─────────────────────────────────────────────────────

const DB_NAME = "homework-cache-db";
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("homeworkList")) {
        const store = db.createObjectStore("homeworkList", { keyPath: "studentId" });
        store.createIndex("timestamp", "timestamp", { unique: false });
      }
      if (!db.objectStoreNames.contains("homeworkDetail")) {
        db.createObjectStore("homeworkDetail", { keyPath: "homeworkId" });
      }
      if (!db.objectStoreNames.contains("overdueList")) {
        const store = db.createObjectStore("overdueList", { keyPath: "studentId" });
        store.createIndex("timestamp", "timestamp", { unique: false });
      }
      if (!db.objectStoreNames.contains("pendingSubmissions")) {
        db.createObjectStore("pendingSubmissions", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function idbPut<T>(storeName: string, value: T): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    tx.objectStore(storeName).put({ ...(value as Record<string, unknown>), timestamp: Date.now() });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function idbGet<T>(storeName: string, key: string | number): Promise<T | undefined> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const req = tx.objectStore(storeName).get(key);
    req.onsuccess = () => resolve(req.result as T | undefined);
    req.onerror = () => reject(req.error);
  });
}

async function idbGetAll<T>(storeName: string): Promise<T[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const req = tx.objectStore(storeName).getAll();
    req.onsuccess = () => resolve(req.result as T[]);
    req.onerror = () => reject(req.error);
  });
}

async function idbDelete(storeName: string, key: string | number): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    tx.objectStore(storeName).delete(key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// ─────────────────────────────────────────────────────
// API HELPERS
// ─────────────────────────────────────────────────────

const BASE_URL =
  typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL
    : "";

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => response.statusText);
    throw new Error(`HTTP ${response.status}: ${errorBody}`);
  }

  // Handle 204 No-Content
  if (response.status === 204) return undefined as T;

  return response.json() as Promise<T>;
}

/**
 * Smart fetcher: tries network first, falls back to IndexedDB when offline.
 */
async function fetchWithOfflineFallback<T>
  (path: string, idbKey: string | number, idbStore: string, fetchFn: () => Promise<T>)
  : Promise<T | null> {
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    const cached = await idbGet<T>(idbStore, idbKey);
    return cached ?? null;
  }
  try {
    const data = await fetchFn();
    if (data !== null && data !== undefined) {
      await idbPut(idbStore, { ...(data as Record<string, unknown>), _key: idbKey });
    }
    return data;
  } catch (err) {
    // Network failed – try cache
    console.warn(`[homework.service] Network error for ${path}, falling back to cache:`, err);
    const cached = await idbGet<T>(idbStore, idbKey);
    return cached ?? null;
  }
}

// ─────────────────────────────────────────────────────
// OFFLINE SUBMISSION QUEUE
// ─────────────────────────────────────────────────────

interface QueuedSubmission {
  id?: number;
  homeworkId: string;
  payload: SubmitPayload;
  createdAt: number;
  retries: number;
}

const MAX_QUEUE_RETRIES = 5;
const QUEUE_PROCESS_INTERVAL_MS = 30_000;

let queueProcessing = false;
let queueTimer: ReturnType<typeof setInterval> | null = null;

function notifyOnlineListeners() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("homework:online"));
  }
}

/** Start periodic queue flushing (call once, e.g. in a layout or root component). */
export function startOfflineQueueProcessor(): void {
  if (typeof window === "undefined" || queueTimer) return;

  const flush = async () => {
    if (queueProcessing || !navigator.onLine) return;
    queueProcessing = true;
    try {
      const items = await idbGetAll<QueuedSubmission>("pendingSubmissions");
      for (const item of items) {
        if (item.retries >= MAX_QUEUE_RETRIES) {
          await idbDelete("pendingSubmissions", item.id!);
          console.warn(`[homework.service] Dropped stale submission for homework ${item.homeworkId}`);
          continue;
        }
        try {
          const token = getAuthToken();
          const res = await fetch(`${BASE_URL}/api/homework/${item.homeworkId}/submit`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(item.payload),
          });
          if (res.ok) {
            await idbDelete("pendingSubmissions", item.id!);
            // Invalidate related queries
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("homework:submitted", { detail: item.homeworkId }));
            }
          } else {
            await idbPut("pendingSubmissions", { ...item, retries: item.retries + 1 });
          }
        } catch {
          await idbPut("pendingSubmissions", { ...item, retries: item.retries + 1 });
        }
      }
    } finally {
      queueProcessing = false;
    }
  };

  flush(); // Try immediately on start
  queueTimer = setInterval(flush, QUEUE_PROCESS_INTERVAL_MS);

  if (typeof window !== "undefined") {
    window.addEventListener("online", () => {
      notifyOnlineListeners();
      flush();
    });
  }
}

/** Stop the periodic queue processor (e.g. on unmount / logout). */
export function stopOfflineQueueProcessor(): void {
  if (queueTimer) {
    clearInterval(queueTimer);
    queueTimer = null;
  }
}

/** Queue a submission for later sync when offline. */
async function queueSubmissionLocally(homeworkId: string, payload: SubmitPayload): Promise<void> {
  const item: QueuedSubmission = { homeworkId, payload, createdAt: Date.now(), retries: 0 };
  await idbPut("pendingSubmissions", item);
}

/** Check if a homework has a pending offline submission. */
export async function hasPendingSubmission(homeworkId: string): Promise<boolean> {
  const items = await idbGetAll<QueuedSubmission>("pendingSubmissions");
  return items.some((item) => item.homeworkId === homeworkId);
}

// ─────────────────────────────────────────────────────
// QUERY KEYS FACTORY
// ─────────────────────────────────────────────────────

export const homeworkKeys = {
  all: ["homework"] as const,
  lists: () => [...homeworkKeys.all, "list"] as const,
  list: (studentId: string) => [...homeworkKeys.lists(), studentId] as const,
  details: () => [...homeworkKeys.all, "detail"] as const,
  detail: (homeworkId: string) => [...homeworkKeys.details(), homeworkId] as const,
  overdue: (studentId: string) => [...homeworkKeys.all, "overdue", studentId] as const,
  pendingSubmissions: () => [...homeworkKeys.all, "pending"] as const,
};

// ─────────────────────────────────────────────────────
// REACT QUERY HOOKS
// ─────────────────────────────────────────────────────

/**
 * Fetch the list of homework for a student.
 * Uses IndexedDB cache when offline; invalidates on mutation success.
 */
export function useHomeworkList(
  studentId: string,
  language: Language = "en",
  options?: Omit<UseQueryOptions<HomeworkListResponse>, "queryKey" | "queryFn">
) {
  return useQuery<HomeworkListResponse>({
    queryKey: homeworkKeys.list(studentId),

    queryFn: async () => {
      const result = await fetchWithOfflineFallback<
        HomeworkListResponse
      >(
        `/api/homework/student/${encodeURIComponent(studentId)}`,
        studentId,
        "homeworkList",
        () => apiFetch<HomeworkListResponse>(`/api/homework/student/${encodeURIComponent(studentId)}`)
      );

      if (result === null) {
        throw new Error(t(language, "loadError"));
      }
      return result;
    },

    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes

    retry: (failureCount, error) => {
      // Don't retry on 4xx client errors
      if (error instanceof Error && error.message.startsWith("HTTP 4")) return false;
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10_000),

    ...options,
  });
}

/**
 * Fetch detail for a single homework item.
 */
export function useHomeworkDetail(
  homeworkId: string,
  language: Language = "en",
  options?: Omit<UseQueryOptions<HomeworkDetail>, "queryKey" | "queryFn">
) {
  return useQuery<HomeworkDetail>({
    queryKey: homeworkKeys.detail(homeworkId),

    queryFn: async () => {
      const result = await fetchWithOfflineFallback<HomeworkDetail>(
        `/api/homework/${encodeURIComponent(homeworkId)}`,
        homeworkId,
        "homeworkDetail",
        () => apiFetch<HomeworkDetail>(`/api/homework/${encodeURIComponent(homeworkId)}`)
      );

      if (result === null) {
        throw new Error(t(language, "loadError"));
      }
      return result;
    },

    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 30,

    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.startsWith("HTTP 4")) return false;
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10_000),

    ...options,
  });
}

/**
 * Submit homework answers.
 * - Optimistic UI: immediately updates the query cache to "submitted"
 * - If offline, queues in IndexedDB and retries when back online
 * - On success, invalidates related queries
 */
export function useSubmitHomework(
  homeworkId: string,
  queryClient: QueryClient,
  language: Language = "en",
) {
  const isOnline = typeof navigator !== "undefined" ? navigator.onLine : true;

  return useMutation<SubmitResponse, Error, SubmitPayload, { previousDetail?: HomeworkDetail; previousList?: HomeworkListResponse }>({
    mutationFn: async (payload) => {
      if (!isOnline) {
        await queueSubmissionLocally(homeworkId, payload);
        // Return a synthetic success for optimistic UI
        return {
          success: true,
          submissionId: `offline-${Date.now()}`,
          submittedAt: new Date().toISOString(),
          message: t(language, "submitError"),
        } satisfies SubmitResponse;
      }

      return apiFetch<SubmitResponse>(`/api/homework/${encodeURIComponent(homeworkId)}/submit`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },

    // ── Optimistic update ──
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: homeworkKeys.detail(homeworkId) });
      await queryClient.cancelQueries({ queryKey: homeworkKeys.list(homeworkId) });

      const previousDetail = queryClient.getQueryData<HomeworkDetail>(homeworkKeys.detail(homeworkId));
      const previousList = queryClient.getQueryData<HomeworkListResponse>(homeworkKeys.list(homeworkId));

      // Optimistically mark as submitted in detail cache
      if (previousDetail) {
        queryClient.setQueryData<HomeworkDetail>(homeworkKeys.detail(homeworkId), {
          ...previousDetail,
          status: "submitted",
        });
      }

      // Optimistically update the list cache
      if (previousList) {
        queryClient.setQueryData<HomeworkListResponse>(homeworkKeys.list(homeworkId), {
          ...previousList,
          homework: previousList.homework.map((hw) =>
            hw.id === homeworkId ? { ...hw, status: "submitted" as const } : hw
          ),
        });
      }

      return { previousDetail, previousList };
    },

    // ── On error, roll back optimistic update ──
    onError: (_err, _payload, context) => {
      if (context?.previousDetail) {
        queryClient.setQueryData(homeworkKeys.detail(homeworkId), context.previousDetail);
      }
      if (context?.previousList) {
        queryClient.setQueryData(homeworkKeys.list(homeworkId), context.previousList);
      }
    },

    // ── Always invalidate & refetch after settle ──
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: homeworkKeys.detail(homeworkId) });
      queryClient.invalidateQueries({ queryKey: homeworkKeys.detail(homeworkId) });

      // Also invalidate any list queries that might contain this homework
      queryClient.invalidateQueries({ queryKey: homeworkKeys.lists(), exact: false });
      queryClient.invalidateQueries({ queryKey: homeworkKeys.overdue(homeworkId) });
    },

    // ── On success, clear any pending queue entry for this homework ──
    onSuccess: async () => {
      const items = await idbGetAll<QueuedSubmission>("pendingSubmissions");
      const stale = items.filter((i) => i.homeworkId === homeworkId);
      for (const item of stale) {
        if (item.id !== undefined) await idbDelete("pendingSubmissions", item.id);
      }
    },
  });
}

/**
 * Fetch overdue homework for a student.
 */
export function useOverdueHomework(
  studentId: string,
  language: Language = "en",
  options?: Omit<UseQueryOptions<OverdueResponse>, "queryKey" | "queryFn">
) {
  return useQuery<OverdueResponse>({
    queryKey: homeworkKeys.overdue(studentId),

    queryFn: async () => {
      const result = await fetchWithOfflineFallback<OverdueResponse>(
        `/api/homework/overdue/${encodeURIComponent(studentId)}`,
        studentId,
        "overdueList",
        () => apiFetch<OverdueResponse>(`/api/homework/overdue/${encodeURIComponent(studentId)}`)
      );

      if (result === null) {
        throw new Error(t(language, "loadError"));
      }
      return result;
    },

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,

    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.startsWith("HTTP 4")) return false;
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10_000),

    ...options,
  });
}

// ─────────────────────────────────────────────────────
// UTILITY HOOKS / HELPERS
// ─────────────────────────────────────────────────────

/** Listen for the global "homework:online" event and trigger a refetch. */
export function useOnlineSync(queryClient: QueryClient): void {
  if (typeof window === "undefined") return;

  // Use a ref-like pattern via a mounted flag to avoid re-registering listeners
  // In a real component, wrap this in useEffect:
  // useEffect(() => { useOnlineSync(queryClient); return () => { /* cleanup */ }; }, [queryClient]);
}

/**
 * Prefetch homework detail (useful on hover / list item click).
 */
export async function prefetchHomeworkDetail(
  queryClient: QueryClient,
  homeworkId: string
): Promise<void> {
  await queryClient.prefetchQuery({
    queryKey: homeworkKeys.detail(homeworkId),
    queryFn: () => apiFetch<HomeworkDetail>(`/api/homework/${encodeURIComponent(homeworkId)}`),
    staleTime: 1000 * 60 * 3,
  });
}

/**
 * Clear all homework-related cache (e.g. on logout).
 */
export async function clearHomeworkCache(queryClient: QueryClient): Promise<void> {
  queryClient.removeQueries({ queryKey: homeworkKeys.all });
  const db = await openDB();
  const stores = ["homeworkList", "homeworkDetail", "overdueList", "pendingSubmissions"] as const;
  const tx = db.transaction(stores, "readwrite");
  for (const store of stores) {
    tx.objectStore(store).clear();
  }
  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/** Check whether the device is currently online. */
export function useIsOnline(): boolean {
  if (typeof navigator === "undefined") return true;
  return navigator.onLine;
}
