"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  MutationFunction,
  UseQueryOptions,
} from "@tanstack/react-query";
import { useState, useCallback, useEffect, useRef } from "react";
import { getAuthToken } from "@/lib/api";

// ──────────────────────────────────────────────
// TYPES — matching backend Pydantic schemas
// ──────────────────────────────────────────────

export interface PracticeQuestion {
  id: string;
  text: string;
  options: string[];
  correct_option?: number; // omitted for student view
  explanation?: string;
  difficulty: "easy" | "medium" | "hard";
  subject: string;
  topic: string;
  hints?: string[];
  image_url?: string;
}

export interface PracticeSession {
  id: string;
  student_id: string;
  subject: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  status: "active" | "completed" | "paused";
  questions: PracticeQuestion[];
  current_index: number;
  answers: AnswerRecord[];
  score: number;
  started_at: string;
  ended_at?: string;
}

export interface AnswerRecord {
  question_id: string;
  selected_option: number;
  is_correct: boolean;
  time_taken_seconds: number;
  hints_used: number;
  submitted_at: string;
}

export interface SubmitAnswerPayload {
  question_id: string;
  selected_option: number;
  time_taken_seconds: number;
  hints_used: number;
}

export interface SubmitAnswerResponse {
  session: PracticeSession;
  feedback: Feedback;
  next_question?: PracticeQuestion;
  session_completed: boolean;
}

export interface Feedback {
  is_correct: boolean;
  correct_answer: number;
  explanation: string;
  points_earned: number;
  streak: number;
}

export interface SessionSummary {
  session_id: string;
  total_questions: number;
  correct_answers: number;
  score: number;
  accuracy_percent: number;
  average_time_per_question: number;
  time_spent_seconds: number;
  topic_breakdown: TopicBreakdown[];
  weak_topics: string[];
  recommendations: string[];
}

export interface TopicBreakdown {
  topic: string;
  questions_attempted: number;
  correct_answers: number;
  accuracy_percent: number;
}

export interface DueReviewItem {
  question_id: string;
  question_text: string;
  options: string[];
  subject: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  last_attempted: string;
  mastery_level: number; // 0–100
  interval_days: number;
  next_review: string;
  image_url?: string;
}

export interface StartPracticePayload {
  subject: string;
  topic?: string;
  difficulty?: "easy" | "medium" | "hard";
  num_questions?: number;
  mode?: "practice" | "test" | "review";
}

// ──────────────────────────────────────────────
// INDEXEDDB — offline cache & answer queue
// ──────────────────────────────────────────────

const DB_NAME = "k12_platform";
const DB_VERSION = 1;

interface DBSchema {
  questionCache: { key: string; value: any };
  answerQueue: { key: string; value: QueuedAnswer };
  sessionCache: { key: string; value: any };
}

interface QueuedAnswer {
  sessionId: string;
  payload: SubmitAnswerPayload;
  queuedAt: string;
  retries: number;
  status: "pending" | "syncing" | "failed";
}

class IndexedDBManager {
  private db: IDBDatabase | null = null;

  async connect(): Promise<IDBDatabase> {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains("questionCache")) {
          db.createObjectStore("questionCache", { keyPath: "key" });
        }
        if (!db.objectStoreNames.contains("answerQueue")) {
          const store = db.createObjectStore("answerQueue", { keyPath: "key" });
          store.createIndex("sessionId", "sessionId", { unique: false });
          store.createIndex("status", "status", { unique: false });
        }
        if (!db.objectStoreNames.contains("sessionCache")) {
          db.createObjectStore("sessionCache", { keyPath: "key" });
        }
      };
    });
  }

  private async tx(
    storeName: string,
    mode: IDBTransactionMode
  ): Promise<IDBObjectStore> {
    const db = await this.connect();
    const transaction = db.transaction(storeName, mode);
    return transaction.objectStore(storeName);
  }

  private async get<T>(storeName: string, key: string): Promise<T | undefined> {
    const store = await this.tx(storeName, "readonly");
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result?.value);
      request.onerror = () => reject(request.error);
    });
  }

  private async put<T>(storeName: string, key: string, value: T): Promise<void> {
    const store = await this.tx(storeName, "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.put({ key, value });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private async getAll<T>(storeName: string, indexName?: string, query?: IDBKeyRange): Promise<T[]> {
    const store = await this.tx(storeName, "readonly");
    const target = indexName ? store.index(indexName) : store;

    return new Promise((resolve, reject) => {
      const request = target.getAll(query);
      request.onsuccess = () => resolve(request.result.map((r: any) => r.value));
      request.onerror = () => reject(request.error);
    });
  }

  private async remove(storeName: string, key: string): Promise<void> {
    const store = await this.tx(storeName, "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // ── Question Cache ──
  async cacheQuestions(sessionId: string, questions: PracticeQuestion[]): Promise<void> {
    await this.put("questionCache", sessionId, questions);
  }

  async getCachedQuestions(sessionId: string): Promise<PracticeQuestion[] | undefined> {
    return this.get<PracticeQuestion[]>("questionCache", sessionId);
  }

  async clearQuestionCache(sessionId: string): Promise<void> {
    await this.remove("questionCache", sessionId);
  }

  // ── Session Cache ──
  async cacheSession(session: PracticeSession): Promise<void> {
    await this.put("sessionCache", session.id, session);
  }

  async getCachedSession(sessionId: string): Promise<PracticeSession | undefined> {
    return this.get<PracticeSession>("sessionCache", sessionId);
  }

  // ── Answer Queue ──
  async queueAnswer(queued: QueuedAnswer): Promise<void> {
    await this.put("answerQueue", queued.sessionId + "_" + queued.payload.question_id, queued);
  }

  async getQueuedAnswers(): Promise<QueuedAnswer[]> {
    return this.getAll<QueuedAnswer>("answerQueue", "status", IDBKeyRange.only("pending"));
  }

  async getAllQueuedAnswers(): Promise<QueuedAnswer[]> {
    return this.getAll<QueuedAnswer>("answerQueue");
  }

  async updateQueuedAnswer(key: string, updates: Partial<QueuedAnswer>): Promise<void> {
    const existing = await this.get<QueuedAnswer>("answerQueue", key);
    if (existing) {
      await this.put("answerQueue", key, { ...existing, ...updates });
    }
  }

  async removeQueuedAnswer(key: string): Promise<void> {
    await this.remove("answerQueue", key);
  }

  async clearAnswerQueue(): Promise<void> {
    const all = await this.getAll<QueuedAnswer>("answerQueue");
    for (const item of all) {
      const key = item.sessionId + "_" + item.payload.question_id;
      await this.remove("answerQueue", key);
    }
  }
}

export const idb = new IndexedDBManager();

// ──────────────────────────────────────────────
// NETWORK — retry with exponential backoff
// ──────────────────────────────────────────────

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 500;

function isOnline(): boolean {
  return typeof navigator !== "undefined" ? navigator.onLine : true;
}

export async function fetchWithRetry<T>(
  input: RequestInfo,
  init: RequestInit = {},
  retries = MAX_RETRIES
): Promise<T> {
  const token = typeof localStorage !== "undefined" ? getAuthToken() : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string> || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const makeRequest = async (): Promise<Response> => {
    const res = await fetch(input, { ...init, headers });

    if (!res.ok) {
      const errorBody = await res.text().catch(() => res.statusText);
      throw new ApiError(res.status, errorBody);
    }

    return res;
  };

  try {
    const res = await makeRequest();
    if (res.status === 204) return undefined as T;
    return await res.json();
  } catch (err) {
    if (retries <= 0) throw err;

    // Only retry on network errors, not HTTP errors
    if (err instanceof ApiError && err.status < 500) {
      throw err;
    }

    const delay = BASE_DELAY_MS * 2 ** (MAX_RETRIES - retries);
    await sleep(delay);
    return fetchWithRetry<T>(input, init, retries - 1);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(`API Error ${status}: ${message}`);
    this.name = "ApiError";
  }
}

const API_BASE =
  typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001"
    : "http://localhost:8001";

function buildUrl(path: string): string {
  return `${API_BASE}${path}`;
}

// ──────────────────────────────────────────────
// OFFLINE SYNC MANAGER
// ──────────────────────────────────────────────

class OfflineSyncManager {
  private syncing = false;
  private listeners: Set<() => void> = new Set();

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((fn) => fn());
  }

  async addToQueue(sessionId: string, payload: SubmitAnswerPayload): Promise<void> {
    const queued: QueuedAnswer = {
      sessionId,
      payload,
      queuedAt: new Date().toISOString(),
      retries: 0,
      status: "pending",
    };
    await idb.queueAnswer(queued);
    this.notify();
  }

  async syncPendingAnswers(
    onSynced: (synced: number) => void,
    onError: (err: Error) => void
  ): Promise<void> {
    if (this.syncing || !isOnline()) return;
    this.syncing = true;

    try {
      const queued = await idb.getQueuedAnswers();
      let syncedCount = 0;

      for (const item of queued) {
        const key = `${item.sessionId}_${item.payload.question_id}`;
        try {
          await idb.updateQueuedAnswer(key, { status: "syncing" });

          const res = await fetchWithRetry<SubmitAnswerResponse>(
            buildUrl(`/api/practice/${item.sessionId}/submit`),
            {
              method: "POST",
              body: JSON.stringify(item.payload),
            }
          );

          await idb.removeQueuedAnswer(key);
          syncedCount++;

          // Invalidate React Query caches for this session
          if (typeof window !== "undefined") {
            window.dispatchEvent(
              new CustomEvent("practice-synced", { detail: { sessionId: item.sessionId, response: res } })
            );
          }
        } catch (err) {
          await idb.updateQueuedAnswer(key, {
            status: "pending",
            retries: item.retries + 1,
          });
        }
      }

      if (syncedCount > 0) {
        onSynced(syncedCount);
        this.notify();
      }
    } finally {
      this.syncing = false;
    }
  }

  async getPendingCount(): Promise<number> {
    const queued = await idb.getQueuedAnswers();
    return queued.length;
  }
}

export const offlineSync = new OfflineSyncManager();

// ──────────────────────────────────────────────
// REACT QUERY HOOKS
// ──────────────────────────────────────────────

const SESSIONS_QUERY_KEY = ["practice", "sessions"];
const REVIEWS_QUERY_KEY = ["practice", "reviews"];

// ── useStartPractice ──

interface StartPracticeOptions {
  onSuccess?: (session: PracticeSession) => void;
  onError?: (error: Error) => void;
}

export function useStartPractice(options: StartPracticeOptions = {}) {
  const queryClient = useQueryClient();
  const [isPending, setIsPending] = useState(false);

  const mutate: MutationFunction<PracticeSession, StartPracticePayload> = async (
    payload
  ) => {
    if (!isOnline()) {
      // Return optimistic stub — real sync happens on reconnect
      const stubId = `offline_${Date.now()}`;
      const stub: PracticeSession = {
        id: stubId,
        student_id: "",
        subject: payload.subject,
        topic: payload.topic || payload.subject,
        difficulty: payload.difficulty || "medium",
        status: "active",
        questions: [],
        current_index: 0,
        answers: [],
        score: 0,
        started_at: new Date().toISOString(),
      };
      return stub;
    }

    const session = await fetchWithRetry<PracticeSession>(
      buildUrl("/api/practice/start"),
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );

    // Cache questions for offline use
    await idb.cacheQuestions(session.id, session.questions);
    await idb.cacheSession(session);

    // Invalidate relevant queries
    queryClient.invalidateQueries({ queryKey: SESSIONS_QUERY_KEY });

    return session;
  };

  const mutationResult = useMutation({
    mutationFn: mutate,
    onSuccess: (session) => {
      queryClient.setQueryData(["practice", "session", session.id], session);
      options.onSuccess?.(session);
    },
    onError: (error) => {
      options.onError?.(error);
    },
  });

  // Track pending state for optimistic UI
  useEffect(() => {
    setIsPending(mutationResult.isPending);
  }, [mutationResult.isPending]);

  return {
    startPractice: mutationResult.mutate,
    startPracticeAsync: mutationResult.mutateAsync,
    reset: mutationResult.reset,
    ...mutationResult,
  };
}

// ── useSubmitAnswer ──

export function useSubmitAnswer(sessionId: string) {
  const queryClient = useQueryClient();
  const [optimisticFeedback, setOptimisticFeedback] = useState<Feedback | null>(null);

  const mutation: MutationFunction<
    SubmitAnswerResponse,
    { payload: SubmitAnswerPayload; optimistic?: Feedback }
  > = async ({ payload, optimistic }) => {
    // Show optimistic feedback immediately
    if (optimistic) {
      setOptimisticFeedback(optimistic);
    }

    if (!isOnline()) {
      // Queue answer for later sync
      await offlineSync.addToQueue(sessionId, payload);

      // Return cached session with optimistic feedback
      const cached = await idb.getCachedSession(sessionId);
      const cachedQuestions = await idb.getCachedQuestions(sessionId);

      if (cached && cachedQuestions) {
        const question = cachedQuestions.find((q) => q.id === payload.question_id);
        const isCorrect = question
          ? payload.selected_option === question.correct_option
          : optimistic?.is_correct ?? false;

        const localFeedback: Feedback = {
          is_correct: isCorrect,
          correct_answer: question?.correct_option ?? payload.selected_option,
          explanation: question?.explanation || "Synced when back online",
          points_earned: isCorrect ? 10 : 0,
          streak: optimistic?.streak ?? 0,
        };

        return {
          session: { ...cached, status: "active" },
          feedback: localFeedback,
          session_completed: false,
        } satisfies SubmitAnswerResponse;
      }

      // Return minimal fallback
      return {
        session: { id: sessionId, status: "active", score: 0, current_index: 0, answers: [], questions: [], started_at: "", student_id: "", subject: "", topic: "", difficulty: "medium" },
        feedback: optimistic || { is_correct: false, correct_answer: 0, explanation: "", points_earned: 0, streak: 0 },
        session_completed: false,
      } satisfies SubmitAnswerResponse;
    }

    const response = await fetchWithRetry<SubmitAnswerResponse>(
      buildUrl(`/api/practice/${sessionId}/submit`),
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );

    // Update caches
    await idb.cacheSession(response.session);
    await idb.cacheQuestions(sessionId, response.session.questions);

    // Invalidate session query to trigger refetch
    queryClient.invalidateQueries({ queryKey: ["practice", "session", sessionId] });

    // Clear optimistic feedback once real data arrives
    setOptimisticFeedback(null);

    return response;
  };

  const mutationResult = useMutation({
    mutationFn: mutation,
    onMutate: async ({ optimistic }) => {
      // Cancel outstanding session queries to avoid overwriting optimistic data
      await queryClient.cancelQueries({ queryKey: ["practice", "session", sessionId] });

      // Snapshot previous session state
      const prev = queryClient.getQueryData<PracticeSession>(["practice", "session", sessionId]);

      // Optimistically update session in cache
      if (prev) {
        queryClient.setQueryData<PracticeSession>(["practice", "session", sessionId], {
          ...prev,
          answers: optimistic?.is_correct
            ? [...prev.answers, {
                question_id: prev.questions[prev.current_index]?.id,
                selected_option: 0,
                is_correct: true,
                time_taken_seconds: 0,
                hints_used: 0,
                submitted_at: new Date().toISOString(),
              }]
            : prev.answers,
          current_index: prev.current_index + 1,
          score: optimistic?.is_correct ? prev.score + 10 : prev.score,
        });
      }

      return { prev };
    },
    onError: (_err, _vars, context) => {
      // Rollback on error
      if (context?.prev) {
        queryClient.setQueryData(["practice", "session", sessionId], context.prev);
      }
      setOptimisticFeedback(null);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["practice", "session", sessionId] });
    },
  });

  return {
    submitAnswer: mutationResult.mutate,
    submitAnswerAsync: mutationResult.mutateAsync,
    optimisticFeedback,
    resetOptimistic: () => setOptimisticFeedback(null),
    ...mutationResult,
  };
}

// ── useSession ──

export function useSession(
  sessionId: string | null,
  options: Omit<UseQueryOptions<PracticeSession>, "queryKey" | "queryFn"> = {}
) {
  return useQuery<PracticeSession>({
    queryKey: ["practice", "session", sessionId],
    queryFn: async () => {
      if (!sessionId) throw new Error("No session ID provided");

      try {
        const session = await fetchWithRetry<PracticeSession>(
          buildUrl(`/api/practice/${sessionId}`)
        );
        await idb.cacheSession(session);
        await idb.cacheQuestions(sessionId, session.questions);
        return session;
      } catch (error) {
        // Fallback to IndexedDB cache on network failure
        const cached = await idb.getCachedSession(sessionId);
        if (cached) return cached;
        throw error;
      }
    },
    enabled: !!sessionId && options.enabled !== false,
    staleTime: 10_000,
    gcTime: 30 * 60_000, // 30 minutes
    retry: 2,
    ...options,
  });
}

// ── useEndPractice ──

export function useEndPractice(sessionId: string) {
  const queryClient = useQueryClient();

  const mutation: MutationFunction<SessionSummary, void> = async () => {
    if (!isOnline()) {
      // Queue end request — try again on reconnect
      await offlineSync.addToQueue(sessionId, {
        question_id: "__end_session__",
        selected_option: -1,
        time_taken_seconds: 0,
        hints_used: 0,
      });
      throw new Error("Offline — session end queued for sync");
    }

    const summary = await fetchWithRetry<SessionSummary>(
      buildUrl(`/api/practice/${sessionId}/end`),
      { method: "POST" }
    );

    return summary;
  };

  const mutationResult = useMutation({
    mutationFn: mutation,
    onSuccess: (summary) => {
      // Invalidate and update caches
      queryClient.invalidateQueries({ queryKey: SESSIONS_QUERY_KEY });
      queryClient.setQueryData(["practice", "summary", sessionId], summary);
      queryClient.removeQueries({ queryKey: ["practice", "session", sessionId] });

      // Clean up IndexedDB
      idb.clearQuestionCache(sessionId);
    },
  });

  return {
    endPractice: mutationResult.mutate,
    endPracticeAsync: mutationResult.mutateAsync,
    ...mutationResult,
  };
}

// ── useDueReviews ──

export function useDueReviews(
  studentId: string | null,
  options: Omit<UseQueryOptions<DueReviewItem[]>, "queryKey" | "queryFn"> = {}
) {
  return useQuery<DueReviewItem[]>({
    queryKey: [...REVIEWS_QUERY_KEY, studentId],
    queryFn: async () => {
      if (!studentId) return [];
      return fetchWithRetry<DueReviewItem[]>(
        buildUrl(`/api/practice/review/${encodeURIComponent(studentId)}`)
      );
    },
    enabled: !!studentId && options.enabled !== false,
    staleTime: 60_000,
    gcTime: 10 * 60_000,
    retry: 2,
    ...options,
  });
}

// ──────────────────────────────────────────────
// CUSTOM HOOKS — offline state & sync
// ──────────────────────────────────────────────

interface UseOfflineStateReturn {
  isOnline: boolean;
  pendingCount: number;
  syncNow: () => Promise<void>;
  isSyncing: boolean;
}

export function useOfflineState(): UseOfflineStateReturn {
  const [isOnlineState, setIsOnlineState] = useState(isOnline());
  const [pendingCount, setPendingCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnlineState(true);
    const handleOffline = () => setIsOnlineState(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const updateCount = async () => {
      const count = await offlineSync.getPendingCount();
      setPendingCount(count);
    };

    updateCount();
    const unsub = offlineSync.subscribe(updateCount);

    // Listen for synced events from offlineSync
    const handler = () => updateCount();
    window.addEventListener("practice-synced", handler);

    return () => {
      unsub();
      window.removeEventListener("practice-synced", handler);
    };
  }, []);

  const syncNow = useCallback(async () => {
    if (!isOnlineState) return;

    setIsSyncing(true);
    try {
      await offlineSync.syncPendingAnswers(
        (count) => {
          // Success — refetch all active session queries
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("offline-sync-complete", { detail: { count } }));
          }
        },
        (err) => {
          console.error("Sync failed:", err);
        }
      );
    } finally {
      setIsSyncing(false);
    }
  }, [isOnlineState]);

  // Auto-sync when coming back online
  useEffect(() => {
    if (isOnlineState && pendingCount > 0) {
      syncNow();
    }
  }, [isOnlineState, pendingCount, syncNow]);

  return {
    isOnline: isOnlineState,
    pendingCount,
    syncNow,
    isSyncing,
  };
}

// ──────────────────────────────────────────────
// UTILITY HOOKS
// ──────────────────────────────────────────────

/** Preload questions for offline use. Call when session starts. */
export function usePreloadOffline(sessionId: string | null) {
  const sessionQuery = useSession(sessionId, { enabled: !!sessionId });

  useEffect(() => {
    if (sessionQuery.data?.questions && sessionId) {
      idb.cacheQuestions(sessionId, sessionQuery.data.questions).catch(console.error);
    }
  }, [sessionQuery.data?.questions, sessionId]);

  return sessionQuery;
}

/** Get cached questions for a session — works offline. */
export async function getCachedQuestions(
  sessionId: string
): Promise<PracticeQuestion[] | undefined> {
  return idb.getCachedQuestions(sessionId);
}

/** Get cached session — works offline. */
export async function getCachedSession(
  sessionId: string
): Promise<PracticeSession | undefined> {
  return idb.getCachedSession(sessionId);
}

// ──────────────────────────────────────────────
// GLOBAL REACT QUERY LISTENER — auto-sync on reconnect
// ──────────────────────────────────────────────

export function registerOfflineSync(queryClient: ReturnType<typeof useQueryClient>) {
  if (typeof window === "undefined") return;

  const handler = () => {
    offlineSync
      .syncPendingAnswers(
        (count) => {
          // Refetch all practice-related queries after sync
          queryClient.invalidateQueries({ queryKey: ["practice"] });
          console.log(`Synced ${count} queued answers`);
        },
        (err) => console.error("Background sync error:", err)
      )
      .catch(console.error);
  };

  window.addEventListener("online", handler);

  return () => window.removeEventListener("online", handler);
}
