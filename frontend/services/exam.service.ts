/**
 * Exam Service — React Query hooks for the exam API
 *
 * Hooks:
 *  - useCreateExam()            → mutation
 *  - useSubmitExam(examId)      → mutation (optimistic invalidation)
 *  - useExamResult(examId)      → query
 *  - useExamStrategy(examId)    → query
 *  - useExamHistory(studentId)  → query (paginated)
 *
 * All mutations return typed data; all queries include
 * retry logic, stale-while-revalidate caching, and
 * i18n-aware error messages.
 */

'use client';

import {
  useQuery,
  useMutation,
  useQueryClient,
  type QueryFunctionContext,
  type QueryKey,
  type UseQueryOptions,
  type UseMutationOptions,
} from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';

// ═══════════════════════════════════════════════════════════
//  1.  TYPES
// ═══════════════════════════════════════════════════════════

/** Difficulty tier displayed with gold / indigo badge. */
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

/** Exam status in the student's journey. */
export type ExamStatus = 'draft' | 'scheduled' | 'in_progress' | 'submitted' | 'graded' | 'expired';

/** Subject these questions belong to. */
export type Subject =
  | 'mathematics' | 'science' | 'social_studies' | 'english' | 'hindi'
  | 'physics' | 'chemistry' | 'biology' | 'computer_science' | 'other';

/** ─── Question ────────────────────────────────────────── */

export interface ExamQuestion {
  id: string;
  examId: string;
  /** Ordered position in the exam (1-indexed). */
  order: number;
  /** LaTeX-encoded question text rendered by KaTeX. */
  question: string;
  type: 'mcq_single' | 'mcq_multi' | 'integer' | 'fill_blank' | 'true_false' | 'descriptive';
  /** Maximum marks for this question. */
  maxMarks: number;
  /** Optional negative marks for wrong answer (e.g. -0.25). */
  negativeMarks: number | null;
  difficulty: DifficultyLevel;
  /** Marks actually awarded after grading (null until graded). */
  awardedMarks: number | null;
  /** Whether the student attempted this question. */
  attempted: boolean;
  /** Student's submitted answer(s). */
  studentAnswer: string | string[] | number | null;
  /** Options rendered as radio/checkbox for MCQ types. */
  options?: QuestionOption[];
  /** Hints unlocked by the student during the exam. */
  hintsUnlocked: string[];
  /** Timestamp when the student last viewed this question. */
  lastViewedAt: string | null;
  /** Tags for adaptive difficulty engine. */
  tags: string[];
}

export interface QuestionOption {
  id: string;
  label: string;
  text: string;      // LaTeX-safe
  isCorrect: boolean; // only returned after exam is graded
}

/** ─── Exam ─────────────────────────────────────────────── */

export interface Exam {
  id: string;
  title: string;
  description: string;
  /** Exam code students use to join (e.g. EXAM-2026-001). */
  examCode: string;
  subject: Subject;
  gradeLevel: number;  // 1–12
  /** ISO 8601 start time. */
  startsAt: string;
  /** ISO 8601 end time. */
  endsAt: string;
  /** Duration in minutes (0 = self-paced). */
  durationMinutes: number;
  status: ExamStatus;
  /** Total marks available. */
  totalMarks: number;
  /** Marks needed to pass (percentage, 0–100). */
  passPercentage: number;
  /** Whether the exam allows revisiting questions. */
  allowRevisit: boolean;
  /** Whether to shuffle question order per student. */
  shuffleQuestions: boolean;
  /** Whether to shuffle options within each question. */
  shuffleOptions: boolean;
  /** Whether a calculator tool is available. */
  showCalculator: boolean;
  /** Whether hints cost negative marks. */
  hintsEnabled: boolean;
  /** Number of hints available per exam. */
  totalHints: number;
  /** Created by teacher id. */
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

/** ─── Exam with questions populated ────────────────────── */

export interface ExamDetail extends Exam {
  questions: ExamQuestion[];
}

/** ─── Exam Result ──────────────────────────────────────── */

export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  /** Timestamp when the student submitted. */
  submittedAt: string;
  /** Raw score (0 – totalMarks). */
  score: number;
  /** Percentage (0 – 100). */
  percentage: number;
  /** Whether the student cleared the pass threshold. */
  passed: boolean;
  /** Time taken in seconds (null if self-paced). */
  timeTakenSeconds: number | null;
  /** Rank in the class/cohort (null if solo). */
  rank: number | null;
  /** Total students who took this exam. */
  totalStudents: number;
  /** Per-question breakdown for review. */
  questionBreakdown: ExamQuestion[];
  /** AI-generated strengths (array of topic names). */
  strengths: string[];
  /** AI-generated weaknesses (array of topic names). */
  weaknesses: string[];
  /** Recommended next steps for the student. */
  recommendations: string[];
}

/** ─── Exam Strategy ────────────────────────────────────── */

export interface ExamStrategy {
  id: string;
  examId: string;
  /** Which questions to attempt first. */
  priorityOrder: string[];
  /** Questions marked as "skip for now". */
  skipList: string[];
  /** Per-question time allocation in seconds. */
  timeAllocation: Record<string, number>;
  /** Estimated total time required (seconds). */
  estimatedTime: number;
  /** ML confidence in this strategy (0 – 1). */
  confidenceScore: number;
  /** Reasons generated by the model (human-readable). */
  rationale: string;
  /** Detected strengths the student can leverage. */
  strengths: string[];
  /** Topics flagged for extra caution. */
  cautionAreas: string[];
  /** Success rate of students with similar profiles. */
  similarStudentsSuccessRate: number;
  generatedAt: string;
}

/** ─── Exam History ─────────────────────────────────────── */

export interface ExamHistoryItem {
  id: string;
  examId: string;
  examTitle: string;
  subject: Subject;
  submittedAt: string;
  score: number;
  totalMarks: number;
  percentage: number;
  passed: boolean;
  timeTakenSeconds: number | null;
  rank: number | null;
  totalStudents: number;
}

/** ─── Paginated list ───────────────────────────────────── */

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/** ─── DTOs for mutations ───────────────────────────────── */

export interface CreateExamDTO {
  title: string;
  description: string;
  subject: Subject;
  gradeLevel: number;
  startsAt: string;
  endsAt: string;
  durationMinutes: number;
  passPercentage: number;
  allowRevisit?: boolean;
  shuffleQuestions?: boolean;
  shuffleOptions?: boolean;
  showCalculator?: boolean;
  hintsEnabled?: boolean;
  totalHints?: number;
  questions: CreateQuestionDTO[];
}

export interface CreateQuestionDTO {
  question: string;
  type: ExamQuestion['type'];
  maxMarks: number;
  negativeMarks?: number | null;
  difficulty: DifficultyLevel;
  options?: CreateOptionDTO[];
  hints?: string[];
  tags?: string[];
}

export interface CreateOptionDTO {
  label: string;
  text: string;
  isCorrect: boolean;
}

export interface SubmitExamDTO {
  answers: Record<string, string | string[] | number>;
  /** Questions the student chose to skip. */
  skipped: string[];
  /** Hints the student consumed (question ids). */
  hintsUsed: string[];
  /** Client-side time tracking (ms since exam start). */
  timeTakenMs: number;
}

/** ─── API envelope ─────────────────────────────────────── */

export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    field?: string;
  };
}

/** ─── API Error ────────────────────────────────────────── */

export class ExamApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly field?: string,
    public readonly statusCode: number = 400,
  ) {
    super(message);
    this.name = 'ExamApiError';
  }

  static fromAxios(error: AxiosError<ApiEnvelope<unknown>>): ExamApiError {
    const code = error.response?.data?.error?.code ?? 'UNKNOWN';
    const message =
      error.response?.data?.error?.message ??
      error.message ??
      'An unexpected error occurred. Please try again.';
    const field = error.response?.data?.error?.field;
    const statusCode = error.response?.status ?? 500;
    return new ExamApiError(code, message, field, statusCode);
  }
}

/** Human-readable error map keyed by i18n locale. */
export const ERROR_MESSAGES: Record<string, Record<string, string>> = {
  en: {
    EXAM_NOT_FOUND:       'This exam could not be found. Check the exam code and try again.',
    EXAM_EXPIRED:         'This exam has expired and is no longer accepting submissions.',
    EXAM_NOT_STARTED:     'This exam has not started yet. Please wait until the scheduled time.',
    ALREADY_SUBMITTED:    'You have already submitted this exam.',
    UNAUTHORIZED:         'You do not have permission to access this exam.',
    NETWORK_ERROR:        'Network error. Please check your connection and try again.',
    TIMEOUT:              'The request timed out. Please try again.',
    VALIDATION_ERROR:     'Please check your answers and try again.',
    RATE_LIMIT:           'Too many requests. Please wait a moment and try again.',
    HINTS_EXHAUSTED:      'No hints remaining for this exam.',
  },
  hi: {
    EXAM_NOT_FOUND:       'यह परीक्षा नहीं मिल सकी। परीक्षा कोड की जांच करें और पुनः प्रयास करें।',
    EXAM_EXPIRED:         'यह परीक्षा समाप्त हो गई है और अब सबमिशन स्वीकार नहीं कर रही है।',
    EXAM_NOT_STARTED:     'यह परीक्षा अभी शुरू नहीं हुई है। कृपया निर्धारित समय तक प्रतीक्षा करें।',
    ALREADY_SUBMITTED:    'आपने पहले ही इस परीक्षा का सबमिशन कर दिया है।',
    UNAUTHORIZED:         'आपके पास इस परीक्षा तक पहुंचने की अनुमति नहीं है।',
    NETWORK_ERROR:        'नेटवर्क त्रुटि। कृपया अपना कनेक्शन जांचें और पुनः प्रयास करें।',
    TIMEOUT:              'अनुरोध का समय समाप्त हो गया। कृपया पुनः प्रयास करें।',
    VALIDATION_ERROR:     'कृपया अपने उत्तरों की जांच करें और पुनः प्रयास करें।',
    RATE_LIMIT:           'बहुत से अनुरोध। कृपया एक पल प्रतीक्षा करें और पुनः प्रयास करें।',
    HINTS_EXHAUSTED:      'इस परीक्षा के लिए कोई संकेत शेष नहीं है।',
  },
  en_hinglish: {
    EXAM_NOT_FOUND:       'Yeh exam nahi mili. Exam code check karke dobara try karo.',
    EXAM_EXPIRED:         'Yeh exam expire ho gayi hai, ab submission accept nahi karegi.',
    EXAM_NOT_STARTED:     'Yeh exam abhi start nahi hui. Scheduled time tak intezaar karo.',
    ALREADY_SUBMITTED:    'Aapne pehle hi is exam ka submit kar diya hai.',
    UNAUTHORIZED:         'Aapke paas is exam tak access karne ki permission nahi hai.',
    NETWORK_ERROR:        'Network issue. Connection check karke dobara try karo.',
    TIMEOUT:              'Request time out ho gaya. Dobara try karo.',
    VALIDATION_ERROR:     'Apne answers check karke dobara try karo.',
    RATE_LIMIT:           'Bahut saare requests. Thodi der wait karke try karo.',
    HINTS_EXHAUSTED:      'Is exam ke liye koi hints nahi bachi.',
  },
} as const;

/** ⚡ Singleton query-key factory — keeps keys consistent. */
export const examKeys = {
  all: ['exams'] as const,
  lists: () => [...examKeys.all, 'list'] as const,
  detail: (id: string) => [...examKeys.all, 'detail', id] as const,
  questions: (examId: string) => [...examKeys.all, 'questions', examId] as const,
  result: (examId: string) => [...examKeys.all, 'result', examId] as const,
  strategy: (examId: string) => [...examKeys.all, 'strategy', examId] as const,
  history: (studentId: string, page: number, pageSize: number) =>
    [...examKeys.all, 'history', studentId, { page, pageSize }] as const,
};

// ═══════════════════════════════════════════════════════════
//  2.  BASE API CLIENT (typed)
// ═══════════════════════════════════════════════════════════

import axios from 'axios';

/**
 * Pre-configured axios instance.
 * The base URL, auth interceptor, and locale interceptor
 * live in your lib/axios.ts — import that in production.
 * We re-declare here so this file is self-contained.
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? '/api',
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/** Generic typed fetcher with proper error extraction. */
async function fetcher<T>({
  url,
  method = 'get',
  params,
  data,
  token,
}: {
  url: string;
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
  params?: Record<string, unknown>;
  data?: unknown;
  token?: string;
}): Promise<T> {
  try {
    const response: AxiosResponse<ApiEnvelope<T>> = await api.request({
      url,
      method,
      params,
      data,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    if (!response.data.success) {
      throw new ExamApiError(
        response.data.error?.code ?? 'API_ERROR',
        response.data.error?.message ?? response.data.message ?? 'Request failed',
        response.data.error?.field,
        response.status,
      );
    }

    return response.data.data;
  } catch (err) {
    if (err instanceof ExamApiError) throw err;
    if (axios.isAxiosError(err)) {
      // Network / timeout errors have no response
      if (!err.response) {
        const msg =
          err.code === 'ECONNABORTED' ? 'TIMEOUT' : 'NETWORK_ERROR';
        throw new ExamApiError(msg, getMessage(msg), undefined, err.code === 'ECONNABORTED' ? 408 : 503);
      }
      throw ExamApiError.fromAxios(err);
    }
    throw new ExamApiError('UNKNOWN', 'An unexpected error occurred.', undefined, 500);
  }
}

function getMessage(code: string, locale: string = 'en'): string {
  return ERROR_MESSAGES[locale]?.[code] ?? ERROR_MESSAGES.en[code] ?? code;
}

// ═══════════════════════════════════════════════════════════
//  3.  QUERY FACTORY
// ═══════════════════════════════════════════════════════════

/** Helper: pass current locale (default 'en') for i18n error messages. */
function useQueryLocale(): string {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('app-locale');
    if (stored) return stored;
    return navigator.language.split('-')[0] === 'hi' ? 'hi' : 'en';
  }
  return 'en';
}

/** Default stale + cache window tuned for exam data (relatively static). */
const DEFAULT_QUERY_OPTS = {
  staleTime: 30_000,          // 30 s — questions don't change mid-exam
  gcTime: 5 * 60_000,         // 5 min cache in memory
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
} as const;

/** Retry: 3 attempts with exponential backoff, max 10 s. */
function smartRetry(retryCount: number, error: unknown): boolean {
  // Don't retry auth or validation errors
  if (error instanceof ExamApiError) {
    return !['UNAUTHORIZED', 'VALIDATION_ERROR', 'ALREADY_SUBMITTED'].includes(error.code);
  }
  return retryCount < 3;
}

function retryDelay(retryCount: number): number {
  return Math.min(1000 * 2 ** retryCount, 10_000);
}

// ═══════════════════════════════════════════════════════════
//  4.  HOOKS
// ═══════════════════════════════════════════════════════════

/**
 * ── useCreateExam ───────────────────────────────────────
 *
 * Mutation: POST /api/exams
 *
 * On success the server returns the created ExamDetail (with questions).
 * The hook invalidates the exam list so any dashboard table refreshes.
 *
 * @param options — optional overrides for the underlying mutation
 *                  (e.g. onSuccess callback).
 */
export function useCreateExam(
  options?: Omit<
    UseMutationOptions<ExamDetail, ExamApiError, CreateExamDTO>,
    'mutationFn'
  >,
) {
  const queryClient = useQueryClient();

  return useMutation({
    // Spread user-supplied options first so our callbacks below
    // can layer on top and invoke them with the full v5 arg list.
    ...options,

    mutationFn: async (dto: CreateExamDTO): Promise<ExamDetail> => {
      return fetcher<ExamDetail>({
        url: '/exams',
        method: 'post',
        data: dto,
      });
    },

    retry: smartRetry,
    retryDelay,

    /** Invalidate exam list caches so new exam appears everywhere. */
    onSuccess: (createdExam, vars, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: examKeys.lists() });
      // Pre-populate detail cache so opening the exam is instant.
      queryClient.setQueryData(
        examKeys.detail(createdExam.id),
        createdExam,
      );
      return options?.onSuccess?.(createdExam, vars, onMutateResult, context);
    },

    onError: (err: ExamApiError, vars, onMutateResult, context) => {
      console.error('[useCreateExam]', err.message);
      return options?.onError?.(err, vars, onMutateResult, context);
    },
  });
}

/**
 * ── useSubmitExam ───────────────────────────────────────
 *
 * Mutation: POST /api/exams/:examId/submit
 *
 * Optimistically moves the exam status to 'submitted' so the UI
 * shows the submit confirmation immediately, then reconciles
 * with the server response.
 */
export function useSubmitExam(
  examId: string,
  options?: Omit<
    UseMutationOptions<
      ExamResult,
      ExamApiError,
      SubmitExamDTO,
      { snapshot: ExamDetail | undefined }
    >,
    'mutationFn'
  >,
) {
  const queryClient = useQueryClient();

  return useMutation({
    // Spread user-supplied options first so our callbacks below
    // can layer on top and invoke them with the full v5 arg list.
    ...options,

    mutationFn: async (dto: SubmitExamDTO): Promise<ExamResult> => {
      return fetcher<ExamResult>({
        url: `/exams/${examId}/submit`,
        method: 'post',
        data: dto,
      });
    },

    retry: (count, err) => {
      // Never retry a successful submission to avoid double-submit.
      if (err instanceof ExamApiError && err.code === 'ALREADY_SUBMITTED') return false;
      return smartRetry(count, err);
    },
    retryDelay,

    /** Optimistic update: mark exam as submitted in cache immediately. */
    onMutate: async (dto) => {
      // Cancel outstanding queries so they don't overwrite the optimistic value.
      await queryClient.cancelQueries({ queryKey: examKeys.detail(examId) });

      const snapshot = queryClient.getQueryData<ExamDetail>(
        examKeys.detail(examId),
      );

      if (snapshot) {
        queryClient.setQueryData<ExamDetail>(examKeys.detail(examId), {
          ...snapshot,
          status: 'submitted' as ExamStatus,
        });
      }

      return { snapshot };
    },

    /** Roll back on error, then forward to the user's callback. */
    onError: (err: ExamApiError, dto, ctx, context) => {
      if (ctx?.snapshot) {
        queryClient.setQueryData(examKeys.detail(examId), ctx.snapshot);
      }
      console.error('[useSubmitExam]', err.message);
      return options?.onError?.(err, dto, ctx, context);
    },

    /** Invalidate everything related to this exam after a confirmed submit. */
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: examKeys.detail(examId) });
      queryClient.invalidateQueries({ queryKey: examKeys.result(examId) });
      queryClient.invalidateQueries({ queryKey: examKeys.questions(examId) });
      // Invalidate every cached history page (prefix match).
      queryClient.invalidateQueries({ queryKey: [...examKeys.all, 'history'] });
    },
  });
}

/**
 * ── useExamResult ───────────────────────────────────────
 *
 * Query: GET /api/exams/:examId/result
 *
 * Returns the graded result including per-question breakdown.
 * StaleTime is long (5 min) because the result doesn't change
 * after grading is complete.
 */
export function useExamResult(
  examId: string,
  options?: Omit<
    UseQueryOptions<ExamResult, ExamApiError>,
    'queryKey' | 'queryFn'
  >,
) {
  const locale = useQueryLocale();

  return useQuery({
    queryKey: examKeys.result(examId),

    queryFn: async (): Promise<ExamResult> => {
      return fetcher<ExamResult>({
        url: `/exams/${examId}/result`,
        method: 'get',
      });
    },

    enabled: !!examId && options?.enabled !== false,

    /** Results are immutable once published — cache aggressively. */
    staleTime: 5 * 60_000, // 5 minutes
    gcTime: 30 * 60_000,   // 30 minutes in memory

    retry: smartRetry,
    retryDelay,

    meta: { locale },

    ...options,
  });
}

/**
 * ── useExamStrategy ─────────────────────────────────────
 *
 * Query: GET /api/exams/:examId/strategy
 *
 * Returns AI-generated strategy for this student on this exam.
 * Slightly shorter stale window since strategy may be regenerated.
 */
export function useExamStrategy(
  examId: string,
  options?: Omit<
    UseQueryOptions<ExamStrategy, ExamApiError>,
    'queryKey' | 'queryFn'
  >,
) {
  const locale = useQueryLocale();

  return useQuery({
    queryKey: examKeys.strategy(examId),

    queryFn: async (): Promise<ExamStrategy> => {
      return fetcher<ExamStrategy>({
        url: `/exams/${examId}/strategy`,
        method: 'get',
      });
    },

    enabled: !!examId && options?.enabled !== false,

    staleTime: 2 * 60_000,  // 2 minutes — strategy may update
    gcTime: 10 * 60_000,

    retry: smartRetry,
    retryDelay,

    meta: { locale },

    ...options,
  });
}

/**
 * ── useExamHistory ──────────────────────────────────────
 *
 * Query: GET /api/students/:studentId/exams/history
 *
 * Paginated list of past exam submissions for a student.
 * The `studentId` parameter is included in the query key so each
 * student's history is cached independently.
 */
export function useExamHistory(
  studentId: string,
  page = 1,
  pageSize = 20,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<ExamHistoryItem>, ExamApiError>,
    'queryKey' | 'queryFn'
  >,
) {
  const locale = useQueryLocale();

  const queryKey = examKeys.history(studentId, page, pageSize);

  return useQuery({
    queryKey,

    queryFn: async (): Promise<PaginatedResponse<ExamHistoryItem>> => {
      return fetcher<PaginatedResponse<ExamHistoryItem>>({
        url: `/students/${encodeURIComponent(studentId)}/exams/history`,
        method: 'get',
        params: { page, pageSize },
      });
    },

    enabled: !!studentId && options?.enabled !== false,

    staleTime: 60_000,      // 1 minute — history grows with each exam
    gcTime: 10 * 60_000,

    retry: smartRetry,
    retryDelay,

    meta: { locale }
      ,

    ...options,
  });
}

// ═══════════════════════════════════════════════════════════
//  5.  BATCH HELPERS  (for dashboards)
// ═══════════════════════════════════════════════════════════

/**
 * Pre-fetch all exam-related data for a student in parallel.
 * Useful when entering the exam room page.
 *
 * @returns promise that resolves when all data is cached.
 */
export async function prefetchExamContext(
  queryClient: ReturnType<typeof useQueryClient>,
  studentId: string,
  examIds: string[],
  locale: string = 'en',
): Promise<void> {
  await Promise.allSettled(
    examIds.map((examId) =>
      queryClient
        .fetchQuery({
          queryKey: examKeys.result(examId),
          queryFn: (): Promise<ExamResult> =>
            fetcher<ExamResult>({ url: `/exams/${examId}/result` }),
          staleTime: 5 * 60_000,
        })
        .catch(() => {
          /* individual failures are non-fatal */
        }),
    ),
  );
}

/**
 * Invalidate all cached exam data across the app.
 * Call this after a profile-wide event (e.g. new grade set).
 */
export function invalidateAllExamQueries(
  queryClient: ReturnType<typeof useQueryClient>,
): void {
  queryClient.invalidateQueries({ queryKey: examKeys.all });
}

// ═══════════════════════════════════════════════════════════
//  6.  EXPORTS
// ═══════════════════════════════════════════════════════════
//
// All symbols are already exported at their declaration site
// (export class / export const / export interface / export
// function).  Re-exporting them here would conflict with those
// declarations, so this section is intentionally empty.
