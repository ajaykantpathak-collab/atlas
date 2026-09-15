"use client";

// ─── React Query ──────────────────────────────────────────────────────────
import {
  useQuery,
  useMutation,
  useQueryClient,
  type QueryClient,
  type QueryKey,
} from "@tanstack/react-query";

// ─── IndexedDB ─────────────────────────────────────────────────────────────
import { openDB, type IDBPDatabase } from "idb";

// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 1 — TYPES
// ══════════════════════════════════════════════════════════════════════════════

export interface StudentProfile {
  studentId: string;
  gradeLevel: number; // 1-12 (Indian K-12)
  board: "CBSE" | "ICSE" | "State" | "IB" | "NCERT";
  preferredLanguage: "en" | "hi" | "en-hi";
  strengths: string[];
  weaknesses: string[];
}

export interface QuestionOption {
  optionId: string;
  text: string;
  textHi?: string;
  textEnHi?: string;
  icon?: string;
}

export interface DiagnosticQuestion {
  questionId: string;
  subject: Subject;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  questionText: string;
  questionTextHi?: string;
  questionTextEnHi?: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
  explanationHi?: string;
  explanationEnHi?: string;
}

export type Subject =
  | "Mathematics"
  | "Science"
  | "SocialScience"
  | "English"
  | "Hindi"
  | "EVS"
  | "Physics"
  | "Chemistry"
  | "Biology";

export interface DiagnosticConfig {
  subjects: Subject[];
  gradeLevel: number;
  board: StudentProfile["board"];
  language: StudentProfile["preferredLanguage"];
  questionCountPerSubject: number;
  timeLimitMinutes?: number;
  adaptiveEnabled: boolean;
}

export interface DiagnosticSession {
  sessionId: string;
  studentId: string;
  config: DiagnosticConfig;
  status: "not_started" | "in_progress" | "completed" | "expired";
  questions: DiagnosticQuestion[];
  currentQuestionIndex: number;
  answersSubmitted: AnswerRecord[];
  startedAt: string; // ISO
  completedAt?: string;
  timeRemainingSeconds?: number;
}

export interface AnswerRecord {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  timeSpentSeconds: number;
  submittedAt: string;
}

export type MasteryLevel = "emerging" | "developing" | "proficient" | "advanced";

export interface SkillAssessment {
  skillId: string;
  skillName: string;
  skillNameHi?: string;
  subject: Subject;
  masteryLevel: MasteryLevel;
  masteryScore: number; // 0-100
  questionsCorrect: number;
  questionsTotal: number;
  recommendedPriority: "high" | "medium" | "low";
}

export interface DiagnosticResult {
  sessionId: string;
  studentId: string;
  overallScore: number; // 0-100
  percentile: number;
  skillAssessments: SkillAssessment[];
  strengths: string[];
  weaknesses: string[];
  totalTimeSpentSeconds: number;
  completedAt: string;
  recommendations: LearningRecommendation[];
}

export interface LearningRecommendation {
  recommendationId: string;
  skillId: string;
  skillName: string;
  reason: string;
  reasonHi?: string;
  priority: "high" | "medium" | "low";
  suggestedRemediationId?: string;
}

export type RemediationStatus =
  | "not_started"
  | "in_progress"
  | "completed"
  | "mastered";

export interface RemediationPath {
  remediationId: string;
  studentId: string;
  diagnosticSessionId: string;
  skillId: string;
  skillName: string;
  subject: Subject;
  status: RemediationStatus;
  overallProgress: number; // 0-100
  steps: RemediationStep[];
  currentStepIndex: number;
  estimatedDurationMinutes: number;
  completedAt?: string;
  masteryAfterScore: number;
}

export type StepType = "lesson" | "practice" | "quiz" | "game";

export type StepStatus = "locked" | "available" | "in_progress" | "completed";

export interface RemediationStep {
  stepId: string;
  stepNumber: number;
  type: StepType;
  title: string;
  titleHi?: string;
  titleEnHi?: string;
  description: string;
  descriptionHi?: string;
  descriptionEnHi?: string;
  contentUrl?: string;
  estimatedDurationMinutes: number;
  status: StepStatus;
  completedAt?: string;
  score?: number;
  attempts: number;
}

export interface DiagnosticHistoryItem {
  sessionId: string;
  completedAt: string;
  subjects: Subject[];
  overallScore: number;
  durationMinutes: number;
  skillsAssessed: number;
  skillsImproved: number;
}

export interface DiagnosticHistoryResponse {
  history: DiagnosticHistoryItem[];
  totalCount: number;
  averageScore: number;
  improvementTrend: "improving" | "stable" | "declining";
}

// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 2 — IndexedDB LAYER (Offline-first)
// ══════════════════════════════════════════════════════════════════════════════

const DB_NAME = "k12-platform-db";
const DB_VERSION = 1;

interface K12PlatformDB {
  diagnosticSessions: { key: string; value: DiagnosticSession };
  diagnosticResults: { key: string; value: DiagnosticResult };
  remediationPaths: { key: string; value: RemediationPath };
  diagnosticHistory: { key: string; value: DiagnosticHistoryResponse };
  pendingMutations: { key: string; value: PendingMutation };
}

interface PendingMutation {
  id: string;
  type: string;
  payload: unknown;
  timestamp: number;
  retryCount: number;
}

let dbInstance: IDBPDatabase<K12PlatformDB> | null = null;

async function getDB(): Promise<IDBPDatabase<K12PlatformDB>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<K12PlatformDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      const stores = [
        "diagnosticSessions",
        "diagnosticResults",
        "remediationPaths",
        "diagnosticHistory",
        "pendingMutations",
      ];
      for (const name of stores) {
        if (!db.objectStoreNames.contains(name)) {
          db.createObjectStore(name, { keyPath: "sessionId" });
        }
      }
      // pendingMutations uses a different key
      const pendingStore = db.transaction("pendingMutations", "readwrite").store;
      // keyPath is "id" for pendingMutations
    },
  });

  return dbInstance;
}

/** Cache a diagnostic session in IndexedDB */
async function cacheSession(session: DiagnosticSession): Promise<void> {
  const db = await getDB();
  await db.put("diagnosticSessions", session);
}

/** Get a cached diagnostic session */
async function getCachedSession(sessionId: string): Promise<DiagnosticSession | undefined> {
  const db = await getDB();
  return db.get("diagnosticSessions", sessionId);
}

/** Cache a diagnostic result */
async function cacheResult(result: DiagnosticResult): Promise<void> {
  const db = await getDB();
  await db.put("diagnosticResults", result);
}

/** Get a cached diagnostic result */
async function getCachedResult(sessionId: string): Promise<DiagnosticResult | undefined> {
  const db = await getDB();
  return db.get("diagnosticResults", sessionId);
}

/** Cache a remediation path */
async function cacheRemediation(path: RemediationPath): Promise<void> {
  const db = await getDB();
  await db.put("remediationPaths", path);
}

/** Get a cached remediation path */
async function getCachedRemediation(remediationId: string): Promise<RemediationPath | undefined> {
  const db = await getDB();
  return db.get("remediationPaths", remediationId);
}

/** Cache diagnostic history */
async function cacheHistory(studentId: string, data: DiagnosticHistoryResponse): Promise<void> {
  const db = await getDB();
  await db.put("diagnosticHistory", { ...data, sessionId: studentId });
}

/** Get cached diagnostic history */
async function getCachedHistory(studentId: string): Promise<DiagnosticHistoryResponse | undefined> {
  const db = await getDB();
  const raw = await db.get("diagnosticHistory", studentId);
  if (!raw) return undefined;
  const { sessionId, ...rest } = raw as Record<string, unknown> & DiagnosticHistoryResponse;
  return rest;
}

/** Store a pending mutation for offline retry */
async function queuePendingMutation(mutation: PendingMutation): Promise<void> {
  const db = await getDB();
  await db.put("pendingMutations", mutation);
}

/** Process all pending mutations (called on reconnect) */
async function flushPendingMutations(
  processFn: (mutation: PendingMutation) => Promise<void>
): Promise<void> {
  const db = await getDB();
  const pending = await db.getAll("pendingMutations");
  for (const mutation of pending) {
    try {
      await processFn(mutation);
      await db.delete("pendingMutations", mutation.id);
    } catch {
      // increment retry count and keep in queue
      mutation.retryCount += 1;
      if (mutation.retryCount < 5) {
        await db.put("pendingMutations", mutation);
      } else {
        await db.delete("pendingMutations", mutation.id);
      }
    }
  }
}

// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 3 — API CLIENT
// ══════════════════════════════════════════════════════════════════════════════

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "/api";

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message ?? `HTTP ${response.status}: ${response.statusText}`);
  }

  if (response.status === 204) return undefined as T;
  return response.json();
}

// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 4 — QUERY KEY FACTORIES
// ══════════════════════════════════════════════════════════════════════════════

const queryKeys = {
  diagnosticSession: (sessionId: string) =>
    ["diagnostic", "session", sessionId] as const,
  diagnosticResult: (sessionId: string) =>
    ["diagnostic", "result", sessionId] as const,
  remediationPath: (sessionId: string) =>
    ["diagnostic", "remediation", sessionId] as const,
  diagnosticHistory: (studentId: string) =>
    ["diagnostic", "history", studentId] as const,
} as const;

// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 5 — REACT QUERY HOOKS
// ══════════════════════════════════════════════════════════════════════════════

// ─── QUERY: useDiagnosticResult ─────────────────────────────────────────────

interface UseDiagnosticResultOptions {
  enabled?: boolean;
  language?: "en" | "hi" | "en-hi";
}

/**
 * Fetches diagnostic results for a completed session.
 * Falls back to IndexedDB cache when offline.
 */
export function useDiagnosticResult(
  sessionId: string | undefined,
  options: UseDiagnosticResultOptions = {}
) {
  const { enabled = true, language = "en" } = options;
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: queryKeys.diagnosticResult(sessionId ?? ""),
    enabled: enabled && !!sessionId,

    queryFn: async (): Promise<DiagnosticResult> => {
      try {
        const result = await apiRequest<DiagnosticResult>(
          `/diagnostics/${sessionId}/result`
        );
        // hydrate cache on successful fetch
        await cacheResult(result);
        return result;
      } catch (error) {
        // offline fallback
        const cached = await getCachedResult(sessionId!);
        if (cached) return cached;
        throw error;
      }
    },

    // stale after 5 minutes
    staleTime: 5 * 60 * 1000,

    // cache for 30 minutes
    gcTime: 30 * 60 * 1000,

    // retry with exponential backoff
    retry: (failureCount, error) => {
      // don't retry 4xx client errors
      if (error instanceof Error && error.message.includes("4")) return false;
      return failureCount < 3;
    },
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),

    // refetch when window regains focus
    refetchOnWindowFocus: true,

    // placeholder data for skeleton (also keeps previous data during refetch)
    placeholderData: (previousData) => previousData,
  });
}

// ─── QUERY: useRemediationPath ──────────────────────────────────────────────

interface UseRemediationPathOptions {
  enabled?: boolean;
}

/**
 * Fetches the remediation path for a given diagnostic session.
 * Returns cached path when offline.
 */
export function useRemediationPath(
  sessionId: string | undefined,
  options: UseRemediationPathOptions = {}
) {
  const { enabled = true } = options;

  return useQuery({
    queryKey: queryKeys.remediationPath(sessionId ?? ""),
    enabled: enabled && !!sessionId,

    queryFn: async (): Promise<RemediationPath> => {
      try {
        const path = await apiRequest<RemediationPath>(
          `/diagnostics/${sessionId}/remediation`
        );
        await cacheRemediation(path);
        return path;
      } catch (error) {
        const cached = await getCachedRemediation(sessionId!);
        if (cached) return cached;
        throw error;
      }
    },

    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,

    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),

    refetchOnWindowFocus: false,
  });
}

// ─── QUERY: useDiagnosticHistory ────────────────────────────────────────────

interface UseDiagnosticHistoryOptions {
  enabled?: boolean;
  page?: number;
  pageSize?: number;
}

/**
 * Fetches diagnostic history for a student.
 */
export function useDiagnosticHistory(
  studentId: string | undefined,
  options: UseDiagnosticHistoryOptions = {}
) {
  const { enabled = true, page = 1, pageSize = 20 } = options;

  return useQuery({
    queryKey: queryKeys.diagnosticHistory(studentId ?? ""),
    enabled: enabled && !!studentId,

    queryFn: async (): Promise<DiagnosticHistoryResponse> => {
      try {
        const history = await apiRequest<DiagnosticHistoryResponse>(
          `/diagnostics/history?studentId=${studentId}&page=${page}&pageSize=${pageSize}`
        );
        await cacheHistory(studentId!, history);
        return history;
      } catch (error) {
        const cached = await getCachedHistory(studentId!);
        if (cached) return cached;
        throw error;
      }
    },

    staleTime: 2 * 60 * 1000,
    gcTime: 15 * 60 * 1000,

    retry: 2,
    retryDelay: (attempt) => Math.min(500 * 2 ** attempt, 4000),
  });
}

// ─── MUTATION: useStartDiagnostic ──────────────────────────────────────────

interface StartDiagnosticPayload {
  studentId: string;
  config: DiagnosticConfig;
}

/**
 * Starts a new diagnostic session.
 * Optimistically sets the session to in_progress.
 */
export function useStartDiagnostic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: StartDiagnosticPayload) => {
      const session = await apiRequest<DiagnosticSession>(
        "/diagnostics/start",
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );
      await cacheSession(session);
      return session;
    },

    // Optimistic update: show session immediately
    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.diagnosticHistory(payload.studentId),
      });

      const previousHistory = queryClient.getQueryData(
        queryKeys.diagnosticHistory(payload.studentId)
      );

      // Snapshot previous history for rollback
      return { previousHistory };
    },

    onError: (_err, _payload, context) => {
      // rollback history
      if (context?.previousHistory) {
        queryClient.setQueryData(
          queryKeys.diagnosticHistory(_payload.studentId),
          context.previousHistory
        );
      }
    },

    onSuccess: (session) => {
      // cache the new session
      cacheSession(session);

      // invalidate history list to show new in-progress entry
      queryClient.invalidateQueries({
        queryKey: queryKeys.diagnosticHistory(session.studentId),
      });
    },
  });
}

// ─── MUTATION: useSubmitDiagnostic ─────────────────────────────────────────

interface SubmitDiagnosticPayload {
  answers: AnswerRecord[];
  completedAt: string;
}

/**
 * Submits all answers for a diagnostic session.
 * On success, invalidates session and result queries.
 */
export function useSubmitDiagnostic(sessionId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SubmitDiagnosticPayload) => {
      const result = await apiRequest<DiagnosticResult>(
        `/diagnostics/${sessionId}/submit`,
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );
      await cacheResult(result);
      return result;
    },

    onMutate: async (payload) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.diagnosticSession(sessionId ?? ""),
      });

      // Snapshot the current session for rollback
      const previousSession = queryClient.getQueryData(
        queryKeys.diagnosticSession(sessionId ?? "")
      );

      // Optimistically mark session as completed
      if (sessionId) {
        queryClient.setQueryData<DiagnosticSession>(
          queryKeys.diagnosticSession(sessionId),
          (old) =>
            old
              ? {
                  ...old,
                  status: "completed",
                  completedAt: payload.completedAt,
                }
              : old
        );
      }

      return { previousSession };
    },

    onError: (_err, _payload, context) => {
      // rollback session state
      if (context?.previousSession && sessionId) {
        queryClient.setQueryData(
          queryKeys.diagnosticSession(sessionId),
          context.previousSession
        );
      }
    },

    onSettled: () => {
      // Always refetch to sync with server
      if (sessionId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.diagnosticSession(sessionId) });
        queryClient.invalidateQueries({ queryKey: queryKeys.diagnosticResult(sessionId) });
        queryClient.invalidateQueries({ queryKey: queryKeys.remediationPath(sessionId) });
      }
    },
  });
}

// ─── MUTATION: useStartRemediationStep ─────────────────────────────────────

interface StartRemediationStepPayload {
  stepId: string;
}

/**
 * Marks a remediation step as in_progress.
 */
export function useStartRemediationStep(sessionId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: StartRemediationStepPayload) => {
      const updatedPath = await apiRequest<RemediationPath>(
        `/diagnostics/${sessionId}/remediation/steps/${payload.stepId}/start`,
        { method: "POST" }
      );
      await cacheRemediation(updatedPath);
      return updatedPath;
    },

    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.remediationPath(sessionId ?? ""),
      });

      const previousPath = queryClient.getQueryData(
        queryKeys.remediationPath(sessionId ?? "")
      );

      // Optimistically mark the step as in_progress
      if (sessionId) {
        queryClient.setQueryData<RemediationPath>(
          queryKeys.remediationPath(sessionId),
          (old) =>
            old
              ? {
                  ...old,
                  steps: old.steps.map((step) =>
                    step.stepId === payload.stepId
                      ? { ...step, status: "in_progress" as StepStatus }
                      : step
                  ),
                }
              : old
        );
      }

      return { previousPath };
    },

    onError: (_err, _payload, context) => {
      if (context?.previousPath && sessionId) {
        queryClient.setQueryData(
          queryKeys.remediationPath(sessionId),
          context.previousPath
        );
      }
    },

    onSuccess: (updatedPath) => {
      if (sessionId) {
        queryClient.setQueryData(
          queryKeys.remediationPath(sessionId),
          updatedPath
        );
      }
    },
  });
}

// ─── MUTATION: useCompleteRemediationStep ───────────────────────────────────

interface CompleteRemediationStepPayload {
  stepId: string;
  score: number;
  timeSpentSeconds: number;
}

/**
 * Completes a remediation step and advances progress.
 * Optimistically marks step as completed and increments progress.
 */
export function useCompleteRemediationStep(sessionId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CompleteRemediationStepPayload) => {
      const updatedPath = await apiRequest<RemediationPath>(
        `/diagnostics/${sessionId}/remediation/steps/${payload.stepId}/complete`,
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );
      await cacheRemediation(updatedPath);
      return updatedPath;
    },

    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.remediationPath(sessionId ?? ""),
      });

      const previousPath = queryClient.getQueryData(
        queryKeys.remediationPath(sessionId ?? "")
      );

      // Optimistically mark step complete + bump progress
      if (sessionId) {
        queryClient.setQueryData<RemediationPath>(
          queryKeys.remediationPath(sessionId),
          (old) => {
            if (!old) return old;
            const completedSteps = old.steps.filter(
              (s) => s.status === "completed"
            ).length;
            const totalSteps = old.steps.length;
            const newProgress = Math.round(
              ((completedSteps + 1) / totalSteps) * 100
            );

            return {
              ...old,
              overallProgress: newProgress,
              steps: old.steps.map((step) =>
                step.stepId === payload.stepId
                  ? {
                      ...step,
                      status: "completed" as StepStatus,
                      completedAt: new Date().toISOString(),
                      score: payload.score,
                    }
                  : step
              ),
            };
          }
        );
      }

      return { previousPath }
    },

    onError: (_err, _payload, context) => {
      if (context?.previousPath && sessionId) {
        queryClient.setQueryData(
          queryKeys.remediationPath(sessionId),
          context.previousPath
        );
      }
    },

    onSuccess: (updatedPath) => {
      if (sessionId) {
        queryClient.setQueryData(
          queryKeys.remediationPath(sessionId),
          updatedPath
        );
        // if fully completed, refresh history
        if (updatedPath.status === "completed" || updatedPath.status === "mastered") {
          queryClient.invalidateQueries({
            queryKey: queryKeys.diagnosticHistory(updatedPath.studentId),
          });
        }
      }
    },
  });
}

// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 6 — OFFLINE QUEUE PROCESSOR
// ══════════════════════════════════════════════════════════════════════════════

/**
 * Flush queued mutations when connectivity is restored.
 * Hook this into your online/offline event listener.
 */
export function useOfflineSync() {
  const queryClient = useQueryClient();

  // Expose a function to manually trigger sync
  const flush = async () => {
    await flushPendingMutations(async (mutation) => {
      try {
        await apiRequest(
          `/diagnostics/mutations/replay`,
          {
            method: "POST",
            body: JSON.stringify(mutation),
          }
        );
        // Invalidate relevant queries after successful replay
        // The server should return which data changed;
        // for now invalidate broadly
        queryClient.invalidateQueries({ queryKey: ["diagnostic"] });
      } catch {
        // will be re-queued by flushPendingMutations
        throw new Error("Sync failed, will retry");
      }
    });
  };

  return { flush };
}

// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 7 — COMPOSITE HOOKS (convenience)
// ══════════════════════════════════════════════════════════════════════════════

interface UseFullDiagnosticFlowOptions {
  studentId: string;
  language?: "en" | "hi" | "en-hi";
}

/**
 * All-in-one hook for a student's diagnostic view.
 * Loads history + enables result/remediation queries.
 */
export function useFullDiagnosticFlow(opts: UseFullDiagnosticFlowOptions) {
  const { studentId, language = "en" } = opts;
  const historyQuery = useDiagnosticHistory(studentId);

  const latestSessionId =
    historyQuery.data?.history[0]?.sessionId ?? undefined;

  const resultQuery = useDiagnosticResult(latestSessionId, {
    enabled: !!latestSessionId && historyQuery.isSuccess,
    language,
  });

  const remediationQuery = useRemediationPath(latestSessionId, {
    enabled: !!latestSessionId && resultQuery.data !== undefined,
  });

  return {
    history: historyQuery,
    result: resultQuery,
    remediation: remediationQuery,
    latestSessionId,
  };
}
