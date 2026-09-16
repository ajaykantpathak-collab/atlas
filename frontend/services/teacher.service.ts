/**
 * Teacher Service — React Query hooks for teacher-facing API endpoints.
 *
 * Architecture:
 *   1. Shared types (domain models, API request/response shapes)
 *   2. Low-level API functions (thin fetch wrappers)
 *   3. React Query hooks (caching, retry, stale-while-revalidate)
 *
 * All hooks are typed, error-handled, and configured with sensible defaults
 * (retry on 5xx, stale-while-revalidate, cache deduplication).
 */

import { useQuery, useMutation, useQueryClient, MutationFunction, QueryFunction, QueryKey } from "@tanstack/react-query";

/* =========================================================================
   1. DOMAIN TYPES
   ========================================================================= */

/** Difficulty level for a worksheet or homework assignment. */
export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

/** Status of a worksheet lifecycle. */
export enum WorksheetStatus {
  Draft = "draft",
  Published = "published",
  Archived = "archived",
}

/** Language in which content should be served. */
export enum ContentLanguage {
  English = "en",
  Hinglish = "hi-en",
  Hindi = "hi",
}

/** A single question on a worksheet. */
export interface WorksheetQuestion {
  id: string;
  type: "multiple_choice" | "true_false" | "fill_blank" | "short_answer" | "long_answer";
  prompt: string;
  promptTranslations?: Partial<Record<ContentLanguage, string>>;
  options?: string[];
  correctAnswer: string | string[];
  marks: number;
  hints?: string[];
}

/** Full worksheet payload returned by the API. */
export interface Worksheet {
  id: string;
  title: string;
  description?: string;
  subject: string;
  grade: number;
  chapter?: string;
  difficulty: Difficulty;
  status: WorksheetStatus;
  language: ContentLanguage;
  questions: WorksheetQuestion[];
  totalMarks: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  assignedCount?: number;
  completedCount?: number;
  averageScore?: number;
}

/** Minimal worksheet summary used in lists. */
export interface WorksheetSummary {
  id: string;
  title: string;
  subject: string;
  grade: number;
  difficulty: Difficulty;
  status: WorksheetStatus;
  totalMarks: number;
  assignedCount: number;
  completedCount: number;
  averageScore: number;
  createdAt: string;
}

/** Shape of the create-worksheet request body. */
export interface CreateWorksheetInput {
  title: string;
  description?: string;
  subject: string;
  grade: number;
  chapter?: string;
  difficulty: Difficulty;
  language: ContentLanguage;
  questions: Omit<WorksheetQuestion, "id">[];
}

/** Shape of the assign-homework request body. */
export interface AssignHomeworkInput {
  classId: string;
  worksheetId: string;
  dueDate: string;
  allowLateSubmission: boolean;
  notifyViaWhatsApp?: boolean;
  note?: string;
}

/** Shape of the send-worksheet-via-WhatsApp request body. */
export interface SendWorksheetInput {
  recipientIds: string[];
  message?: string;
}

/** Performance metrics for a single worksheet. */
export interface ClassPerformance {
  worksheetId: string;
  totalStudents: number;
  submittedCount: number;
  pendingCount: number;
  averageScore: number;
  medianScore: number;
  highestScore: number;
  lowestScore: number;
  scoreDistribution: Record<string, number>;
  completionRate: number;
  perStudent: Array<{
    studentId: string;
    studentName: string;
    score: number | null;
    submittedAt?: string;
    timeSpentMinutes?: number;
  }>;
}

/** Aggregate class progress over time. */
export interface ClassProgress {
  classId: string;
  className: string;
  totalWorksheetsAssigned: number;
  totalWorksheetsCompleted: number;
  overallCompletionRate: number;
  averageScore: number;
  trend: Array<{
    date: string;
    completionRate: number;
    averageScore: number;
  }>;
  subjectBreakdown: Array<{
    subject: string;
    completionRate: number;
    averageScore: number;
  }>;
}

/** A single student record. */
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  rollNumber?: string;
  email?: string;
  phoneNumber?: string;
  whatsappNumber?: string;
  parentWhatsAppNumber?: string;
  avatarUrl?: string;
}

/** A class / section taught by the teacher. */
export interface Class {
  id: string;
  name: string;
  grade: number;
  section: string;
  subject: string;
  studentCount: number;
  academicYear: string;
  isActive: boolean;
}

/** Paginated envelope used by list endpoints. */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

/** Standardised API error shape returned by the backend. */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

/** Response shape from the printable-worksheet endpoint. */
export interface PrintableWorksheetResponse {
  html: string;
  css: string;
}

/** Response shape from the WhatsApp send endpoint. */
export interface SendWorksheetResponse {
  messageId: string;
  status: "queued" | "sent" | "failed";
  recipientsReached: number;
  recipientsFailed: number;
  failedRecipients?: string[];
}

/* =========================================================================
   2. LOW-LEVEL API FUNCTIONS
   ========================================================================= */

/**
 * Centralised fetch helper that attaches auth headers, normalises errors,
 * and parses JSON.  Replace with your HTTP client of choice (axios, ky …).
 */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "/api";
  const url = `${baseUrl}${endpoint}`;

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token") ||
        localStorage.getItem("auth_token")
      : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    let errorBody: ApiError;
    try {
      errorBody = await response.json();
    } catch {
      errorBody = {
        code: `HTTP_${response.status}`,
        message: response.statusText,
      };
    }
    const err = new Error(errorBody.message) as Error & { code: string; details?: Record<string, string[]> };
    err.code = errorBody.code;
    err.details = errorBody.details;
    throw err;
  }

  // 204 No Content — no body to parse
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

/* ---------- Worksheet CRUD ---------- */

export async function fetchCreateWorksheet(
  input: CreateWorksheetInput,
): Promise<Worksheet> {
  return apiFetch<Worksheet>("/teacher/worksheets", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function fetchWorksheet(
  worksheetId: string,
): Promise<Worksheet> {
  return apiFetch<Worksheet>(`/teacher/worksheets/${worksheetId}`);
}

export async function fetchWorksheetPrintable(
  worksheetId: string,
): Promise<PrintableWorksheetResponse> {
  return apiFetch<PrintableWorksheetResponse>(
    `/teacher/worksheets/${worksheetId}/printable`,
  );
}

/* ---------- WhatsApp send ---------- */

export async function fetchSendWorksheet(
  worksheetId: string,
  input: SendWorksheetInput,
): Promise<SendWorksheetResponse> {
  return apiFetch<SendWorksheetResponse>(
    `/teacher/worksheets/${worksheetId}/send-whatsapp`,
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
}

/* ---------- Performance ---------- */

export async function fetchClassPerformance(
  worksheetId: string,
): Promise<ClassPerformance> {
  return apiFetch<ClassPerformance>(
    `/teacher/worksheets/${worksheetId}/performance`,
  );
}

/* ---------- Classes ---------- */

export async function fetchTeacherClasses(
  teacherId: string,
  page = 1,
  pageSize = 20,
): Promise<PaginatedResponse<Class>> {
  return apiFetch<PaginatedResponse<Class>>(
    `/teacher/classes?teacherId=${teacherId}&page=${page}&pageSize=${pageSize}`,
  );
}

export async function fetchClassStudents(
  classId: string,
): Promise<Student[]> {
  return apiFetch<Student[]>(`/teacher/classes/${classId}/students`);
}

export async function fetchClassProgress(
  classId: string,
): Promise<ClassProgress> {
  return apiFetch<ClassProgress>(`/teacher/classes/${classId}/progress`);
}

/* ---------- Homework assignment ---------- */

export async function fetchAssignHomework(
  input: AssignHomeworkInput,
): Promise<{ assignmentId: string }> {
  return apiFetch<{ assignmentId: string }>("/teacher/assignments", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

/* =========================================================================
   3. REACT QUERY HOOKS
   ========================================================================= */

/** Default stale + cache durations (tuned for classroom workflows). */
const STALE_TIMES = {
  worksheet: 5 * 60 * 1000, // 5 min — worksheets change when edited
  printable: 30 * 60 * 1000, // 30 min — printable HTML is expensive to generate
  performance: 2 * 60 * 1000, // 2 min — scores update as students submit
  classes: 10 * 60 * 1000, // 10 min — class roster rarely changes mid-session
  students: 10 * 60 * 1000, // 10 min
  progress: 5 * 60 * 1000, // 5 min
} as const;

const CACHE_TIMES = {
  worksheet: 30 * 60 * 1000,
  printable: 60 * 60 * 1000,
  performance: 10 * 60 * 1000,
  classes: 30 * 60 * 1000,
  students: 30 * 60 * 1000,
  progress: 15 * 60 * 1000,
} as const;

/** Retry configuration — don't hammer the API on client errors. */
const RETRY_CONFIG = {
  retry: (failureCount: number, error: unknown) => {
    // Don't retry on 4xx (client errors)
    if (error instanceof Error && "code" in error) {
      const code = (error as Error & { code: string }).code;
      if (code.startsWith("4")) return false;
    }
    // Exponential back-off up to 3 retries
    return failureCount < 3;
  },
  retryDelay: (attemptIndex: number) =>
    Math.min(1000 * 2 ** attemptIndex, 8000),
} as const;

/** Shared query options factory so components can override as needed. */
function baseQueryOptions<T>(key: QueryKey, queryFn: QueryFunction<T>) {
  return {
    queryKey: key,
    queryFn,
    staleTime: STALE_TIMES[key[0] as keyof typeof STALE_TIMES] ?? STALE_TIMES.worksheet,
    gcTime: CACHE_TIMES[key[0] as keyof typeof CACHE_TIMES] ?? CACHE_TIMES.worksheet,
    ...RETRY_CONFIG,
  };
}

/**
 * useCreateWorksheet
 *
 * Creates a new worksheet via POST /teacher/worksheets.
 *
 * On success the cached worksheet list (if any) is invalidated so the new
 * item appears immediately in any listing component.
 *
 * @example
 *   const { mutate, isPending, error } = useCreateWorksheet();
 *   mutate({ title: "Fractions", subject: "Math", grade: 5, … });
 */
export function useCreateWorksheet() {
  const queryClient = useQueryClient();

  const mutation: ReturnType<typeof useMutation<Worksheet, Error, CreateWorksheetInput>> =
    useMutation({
      mutationFn: fetchCreateWorksheet,

      /** Refresh any open worksheet lists after creation. */
      onSuccess: (newWorksheet) => {
        queryClient.invalidateQueries({ queryKey: ["teacherClasses"] });
        // Pre-populate the new worksheet cache so a follow-up navigation is instant
        queryClient.setQueryData(["worksheet", newWorksheet.id], newWorksheet);
      },

      onError: (error) => {
        console.error("Failed to create worksheet:", error);
        // TODO: integrate with your toast / notification system
      },
    });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
    data: mutation.data,
  };
}

/**
 * useWorksheet
 *
 * Fetches a single worksheet by ID.
 * Keeps data fresh for 5 min; prefetches are suggested on hover/links.
 *
 * @example
 *   const { data, isLoading, error } = useWorksheet("ws_abc123");
 */
export function useWorksheet(worksheetId: string | null | undefined) {
  const options = baseQueryOptions<Worksheet>(
    ["worksheet", worksheetId!],
    () => fetchWorksheet(worksheetId!),
  );

  const query = useQuery({
    ...options,
    enabled: !!worksheetId,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

/**
 * useWorksheetPrintable
 *
 * Fetches printer-ready HTML + CSS for a worksheet.
 * Longer stale time because generating printable content is expensive.
 *
 * @example
 *   const { data, isLoading } = useWorksheetPrintable("ws_abc123");
 *   // data.html → inject into a print window
 */
export function useWorksheetPrintable(
  worksheetId: string | null | undefined,
) {
  const options = baseQueryOptions<PrintableWorksheetResponse>(
    ["worksheetPrintable", worksheetId!],
    () => fetchWorksheetPrintable(worksheetId!),
  );

  const query = useQuery({
    ...options,
    enabled: !!worksheetId,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

/**
 * useSendWorksheet
 *
 * Triggers a WhatsApp message blast for the worksheet.
 *
 * @example
 *   const { mutate, isPending } = useSendWorksheet("ws_abc123");
 *   mutate({ recipientIds: ["stu_1", "stu_2"], message: "Here is your worksheet!" });
 */
export function useSendWorksheet(worksheetId: string | null | undefined) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (input: SendWorksheetInput) =>
      fetchSendWorksheet(worksheetId!, input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classPerformance", worksheetId],
      });
    },
    onError: (error) => {
      console.error("Failed to send worksheet via WhatsApp:", error);
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
}

/**
 * useClassPerformance
 *
 * Returns per-student performance breakdown for a specific worksheet.
 * Stale after 2 min (frequently updated as submissions come in).
 *
 * @example
 *   const { data } = useClassPerformance("ws_abc123");
 *   // data.averageScore, data.perStudent, data.scoreDistribution
 */
export function useClassPerformance(worksheetId: string | null | undefined) {
  const options = baseQueryOptions<ClassPerformance>(
    ["classPerformance", worksheetId!],
    () => fetchClassPerformance(worksheetId!),
  );

  const query = useQuery({ ...options, enabled: !!worksheetId });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

/**
 * useTeacherClasses
 *
 * Paginated list of classes taught by a teacher.
 * Pass `page` and `pageSize` to paginate through results.
 *
 * @example
 *   const { data, isLoading } = useTeacherClasses("teacher_01");
 */
export function useTeacherClasses(
  teacherId: string | null | undefined,
  page?: number,
  pageSize = 20,
) {
  const options = baseQueryOptions<PaginatedResponse<Class>>(
    ["teacherClasses", teacherId!, page, pageSize],
    () => fetchTeacherClasses(teacherId!, page ?? 1, pageSize),
  );

  const query = useQuery({ ...options, enabled: !!teacherId });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

/**
 * useClassStudents
 *
 * Full roster of students in a class.
 *
 * @example
 *   const { data, isLoading } = useClassStudents("cls_01");
 */
export function useClassStudents(classId: string | null | undefined) {
  const options = baseQueryOptions<Student[]>(
    ["classStudents", classId!],
    () => fetchClassStudents(classId!),
  );

  const query = useQuery({ ...options, enabled: !!classId });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

/**
 * useClassProgress
 *
 * Aggregate progress metrics (completion rates, score trends) for a class.
 *
 * @example
 *   const { data } = useClassProgress("cls_01");
 *   // data.overallCompletionRate, data.trend, data.subjectBreakdown
 */
export function useClassProgress(classId: string | null | undefined) {
  const options = baseQueryOptions<ClassProgress>(
    ["classProgress", classId!],
    () => fetchClassProgress(classId!),
  );

  const query = useQuery({ ...options, enabled: !!classId });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

/**
 * useAssignHomework
 *
 * Assigns a worksheet to a class as homework with a due date.
 *
 * On success, invalidates both the class progress and the worksheet detail
 * cache so dashboards refresh automatically.
 *
 * @example
 *   const { mutate, isPending } = useAssignHomework();
 *   mutate({
 *     classId: "cls_01",
 *     worksheetId: "ws_abc123",
 *     dueDate: "2025-04-30",
 *     allowLateSubmission: true,
 *     notifyViaWhatsApp: true,
 *   });
 */
export function useAssignHomework() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: fetchAssignHomework,

    onSuccess: (_result, variables) => {
      const { classId, worksheetId } = variables;
      queryClient.invalidateQueries({ queryKey: ["classProgress", classId] });
      queryClient.invalidateQueries({ queryKey: ["worksheet", worksheetId] });
      queryClient.invalidateQueries({ queryKey: ["teacherClasses"] });
    },

    onError: (error) => {
      console.error("Failed to assign homework:", error);
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
}

/* =========================================================================
   4. EXPORTED TYPES
   =========================================================================
   All domain types and enums are already exported at their declarations
   above (export enum / export interface), so no re-export block is needed.
   Consuming components can import them directly, e.g.:
     import { Worksheet, Difficulty, useWorksheet } from "@/services/teacher.service";
   */
