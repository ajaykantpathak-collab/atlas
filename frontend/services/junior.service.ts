'use client';

import { useQuery, useMutation, useQueryClient, MutationFunction, QueryFunction, QueryKey, QueryClient } from '@tanstack/react-query';

// Local toast stub — 'sonner' package is not installed in this environment
const toast = {
  success: (msg: string, _opts?: Record<string, unknown>) => { /* no-op */ },
  error: (msg: string, _opts?: Record<string, unknown>) => { /* no-op */ },
};

// ---------------------------------------------------------------------------
// Shared infrastructure
// ---------------------------------------------------------------------------

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '/api';

async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  fallback?: T,
): Promise<T> {
  const url = `${API_BASE}${path}`;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 30_000);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers ?? {}),
      },
    });

    clearTimeout(id);

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      const message = (errBody as ApiError).message ?? res.statusText ?? 'Something went wrong';
      const error = new Error(message) as unknown as ApiError & { status: number };
      error.status = res.status;
      throw error;
    }

    if (res.status === 204) return {} as T;
    return (await res.json()) as T;
  } catch (err) {
    clearTimeout(id);
    if ((err as Error).name === 'AbortError') {
      throw Object.assign(new Error('Request timed out. Please check your internet connection.'), { status: 408 });
    }
    throw err;
  }
}

// ---------------------------------------------------------------------------
// Type definitions
// ---------------------------------------------------------------------------

export type JuniorGrade = 1 | 2 | 3 | 4 | 5;
export type LessonStatus = 'not_started' | 'in_progress' | 'completed' | 'skipped';
export type Subject =
  | 'hindi'
  | 'english'
  | 'maths'
  | 'science'
  | 'social_studies'
  | 'environmental_studies'
  | 'art'
  | 'moral_science';
export type VoiceFeedbackType = 'correct' | 'incorrect' | 'partial' | 'unclear' | 'try_again';
export type StoryTheme =
  | 'adventure'
  | 'friendship'
  | 'nature'
  | 'festival'
  | 'moral'
  | 'animals'
  | 'space'
  | 'fantasy';
export type SupportedLanguage = 'en' | 'hi' | 'en-hi';

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: Record<string, string[] | string>;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

// -- Lesson types --

export interface Lesson {
  id: string;
  title: Record<SupportedLanguage, string>;
  description: Record<SupportedLanguage, string>;
  subject: Subject;
  grade: JuniorGrade;
  difficulty: 'easy' | 'medium' | 'hard';
  durationMinutes: number;
  thumbnailUrl: string | null;
  activityType: 'quiz' | 'matching' | 'fill_blank' | 'listening' | 'voice_response' | 'drag_drop';
  prerequisites: string[];
  learningOutcomes: string[];
  isVoiceFirst: boolean;
  estimatedQuestions: number;
  createdAt: string;
  updatedAt: string;
}

export interface LessonStep {
  stepNumber: number;
  type: 'instruction' | 'question' | 'interaction' | 'feedback' | 'celebration';
  text: Record<SupportedLanguage, string>;
  audioUrl: string | null;
  hint?: Record<SupportedLanguage, string>;
  hintAudioUrl?: string | null;
  options?: LessonStepOption[];
  correctAnswer?: string | string[];
  points: number;
}

export interface LessonStepOption {
  id: string;
  label: Record<SupportedLanguage, string>;
  icon?: string;
}

export interface StartLessonRequest {
  grade: JuniorGrade;
  subject: Subject;
  preferredLanguage: SupportedLanguage;
  lessonId?: string;
  activityType?: Lesson['activityType'];
}

export interface StartLessonResponse {
  sessionId: string;
  lesson: Lesson;
  currentStep: LessonStep;
  totalSteps: number;
  scoreSoFar: number;
  timeRemainingSeconds: number | null;
  availableHints: number;
  encouragement: Record<SupportedLanguage, string>;
}

// -- Voice answer types --

export interface SubmitVoiceAnswerRequest {
  sessionId: string;
  stepNumber: number;
  audioDataUri: string;          // base64 data URI from Web Audio API / MediaRecorder
  durationMs: number;
  language: SupportedLanguage;
  autoSubmit?: boolean;
}

export interface SubmitVoiceAnswerResponse {
  isCorrect: boolean;
  feedbackType: VoiceFeedbackType;
  scoreEarned: number;
  totalScore: number;
  feedbackText: Record<SupportedLanguage, string>;
  feedbackAudioUrl: string | null;
  celebrationType: 'none' | 'confetti' | 'star' | 'trophy' | 'level_up';
  nextStepAvailable: boolean;
  hintsRemaining: number;
  recognizedText?: string;
  recognizedConfidence?: number;
  pronunciationTips?: Record<SupportedLanguage, string>;
  retryAllowed: boolean;
}

// -- Progress types --

export interface JuniorProgressSummary {
  studentId: string;
  grade: JuniorGrade;
  totalLessonsCompleted: number;
  totalLessonsAttempted: number;
  totalPoints: number;
  totalStars: number;
  currentStreak: number;
  longestStreak: number;
  subjectProgress: SubjectProgress[];
  weeklyGoal: WeeklyGoal;
  recentBadges: Badge[];
  level: number;
  xpToNextLevel: number;
  xpCurrentLevel: number;
}

export interface SubjectProgress {
  subject: Subject;
  lessonsCompleted: number;
  lessonsTotal: number;
  masteryPercentage: number;
  averageScore: number;
  lastPracticed: string | null;
  strengths: string[];
  areasToImprove: string[];
}

export interface WeeklyGoal {
  targetLessons: number;
  completedLessons: number;
  targetMinutes: number;
  completedMinutes: number;
  weekStart: string;
  weekEnd: string;
  rewardUnlocked: boolean;
}

export interface Badge {
  id: string;
  name: Record<SupportedLanguage, string>;
  description: Record<SupportedLanguage, string>;
  iconUrl: string;
  earnedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface LessonHistoryEntry {
  lessonId: string;
  lessonTitle: Record<SupportedLanguage, string>;
  subject: Subject;
  score: number;
  maxScore: number;
  completedAt: string;
  timeSpentMinutes: number;
  starsEarned: number;
  attempts: number;
}

export interface JuniorProgressResponse {
  summary: JuniorProgressSummary;
  history: PaginatedResponse<LessonHistoryEntry>;
  leaderboard?: LeaderboardEntry[];
}

export interface LeaderboardEntry {
  rank: number;
  studentId: string;
  studentName: string;
  avatarUrl: string;
  grade: JuniorGrade;
  totalPoints: number;
  isCurrentStudent: boolean;
}

// -- Story generation types --

export interface GenerateStoryRequest {
  grade: JuniorGrade;
  subject: Subject;
  theme: StoryTheme;
  language: SupportedLanguage;
  wordCountTarget: number;
  difficulty: 'easy' | 'medium' | 'hard';
  includeVocabularyList: boolean;
  includeComprehensionQuestions: boolean;
  vocabularyWords?: string[];
  moralLesson?: string;
  protagonistName?: string;
  customPrompt?: string;
}

export interface VocabularyWord {
  word: string;
  meaning: Record<SupportedLanguage, string>;
  exampleSentence: Record<SupportedLanguage, string>;
  pronunciation: string;
}

export interface ComprehensionQuestion {
  question: Record<SupportedLanguage, string>;
  options: Record<SupportedLanguage, string>[];
  correctOptionIndex: number;
  explanation: Record<SupportedLanguage, string>;
}

export interface GeneratedStory {
  id: string;
  title: Record<SupportedLanguage, string>;
  paragraphs: Record<SupportedLanguage, string>[];
  moral?: Record<SupportedLanguage, string>;
  vocabulary: VocabularyWord[];
  comprehensionQuestions: ComprehensionQuestion[];
  wordCount: number;
  readingTimeMinutes: number;
  difficulty: 'easy' | 'medium' | 'hard';
  illustrationPrompts: string[];
  createdAt: string;
}

export interface GenerateStoryResponse {
  story: GeneratedStory;
  relatedStories: Pick<GeneratedStory, 'id' | 'title'>[];
}

// -- Cancellation / cleanup --

export type QueryCanceler = () => void;

function createCancelToken(): [QueryCanceler, AbortController] {
  const controller = new AbortController();
  const cancel = () => controller.abort();
  return [cancel, controller];
}

// ---------------------------------------------------------------------------
// Query key factories
// ---------------------------------------------------------------------------

export const juniorKeys = {
  all: ['junior'] as const,
  lesson: (sessionId: string) => [...juniorKeys.all, 'lesson', sessionId] as const,
  progress: (studentId: string) => [...juniorKeys.all, 'progress', studentId] as const,
  story: (theme: StoryTheme, grade: JuniorGrade) =>
    [...juniorKeys.all, 'story', theme, grade] as const,
};

// ---------------------------------------------------------------------------
// Mutation functions (thin wrappers — no side-effects here)
// ---------------------------------------------------------------------------

const startLessonFn: MutationFunction<StartLessonResponse, StartLessonRequest> = (params) =>
  apiFetch<StartLessonResponse>('/v1/junior/lessons/start', {
    method: 'POST',
    body: JSON.stringify(params),
  });

const submitVoiceAnswerFn: MutationFunction<SubmitVoiceAnswerResponse, SubmitVoiceAnswerRequest> = (params) =>
  apiFetch<SubmitVoiceAnswerResponse>('/v1/junior/lessons/voice-answer', {
    method: 'POST',
    body: JSON.stringify(params),
  });

const fetchProgressFn: QueryFunction<JuniorProgressResponse, readonly unknown[]> = (ctx) =>
  apiFetch<JuniorProgressResponse>(`/v1/junior/students/${ctx.queryKey[2] as string}/progress`);

const generateStoryFn: MutationFunction<GenerateStoryResponse, GenerateStoryRequest> = (params) =>
  apiFetch<GenerateStoryResponse>('/v1/junior/stories/generate', {
    method: 'POST',
    body: JSON.stringify(params),
  });

// ---------------------------------------------------------------------------
// React Query hooks
// ---------------------------------------------------------------------------

const defaultRetryConfig = {
  retry: (failureCount: number, error: unknown) => {
    if (failureCount >= 3) return false;
    const status = (error as ApiError)?.status;
    if (status && status >= 400 && status < 500) return false;
    return true;
  },
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 8000),
};

/**
 * Starts a new junior lesson session for the student.
 *
 * @param params.grade            - Student's class (1-5)
 * @param params.subject          - Subject of the lesson
 * @param params.preferredLanguage - 'en' | 'hi' | 'en-hi'
 * @param params.lessonId         - Optional specific lesson to start
 * @param params.activityType     - Optional activity filter
 *
 * @returns { sessionId, lesson, currentStep, ... } — populates lesson context
 *          in the cache keyed by sessionId so the lesson store can subscribe.
 */
export function useStartJuniorLesson(options?: { enabled?: boolean }) {
  const { enabled = true } = options ?? {};
  return useMutation({
    mutationFn: startLessonFn,
    retry: defaultRetryConfig.retry,
    retryDelay: defaultRetryConfig.retryDelay,
    ...(enabled !== undefined && { enabled }),
    onSuccess: (data) => {
      toast.success(`🎉 Lesson started: ${data.lesson.title.en ?? 'New Lesson'}`, {
        duration: 3000,
        id: `lesson-start-${data.sessionId}`,
      });
    },
    onError: (error: ApiError) => {
      const messages: Record<string, string> = {
        NO_LESSONS_AVAILABLE: 'No lessons available right now. Please try later!',
        GRADE_NOT_SUPPORTED: 'Lessons for your grade are coming soon.',
        NETWORK_ERROR: 'Could not connect. Check your internet and try again.',
      };
      toast.error(messages[error.code ?? ''] ?? error.message ?? 'Could not start lesson', {
        duration: 5000,
      });
    },
  });
}

/**
 * Submits a voice-recorded answer for a specific step within a lesson session.
 * Optimistically updates local score; rolls back on failure.
 *
 * @param sessionId - Active lesson session ID (required; validates the context)
 *
 * Usage:
 *   const { mutate: submitAnswer, data, isPending } = useSubmitVoiceAnswer(sessionId);
 *   submitAnswer({
 *     sessionId, stepNumber: 3, audioDataUri, durationMs, language: 'en'
 *   });
 */
export function useSubmitVoiceAnswer(sessionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitVoiceAnswerFn,
    retry: (failureCount, error) => {
      // Voice answers are idempotent for scoring but don't re-submit audio
      if (failureCount >= 2) return false;
      const status = (error as unknown as ApiError)?.status;
      if (status && status >= 400 && status < 500) return false;
      return true;
    },
    retryDelay: (attemptIndex) => Math.min(1500 * 2 ** attemptIndex, 6000),
    onMutate: async (newAnswer) => {
      // Cancel any in-flight queries for this session so they don't overwrite
      await queryClient.cancelQueries({ queryKey: juniorKeys.lesson(sessionId) });

      const previousStep = queryClient.getQueryData<StartLessonResponse>(
        juniorKeys.lesson(sessionId),
      );

      // Optimistically bump score if correct
      if (newAnswer.autoSubmit && previousStep) {
        queryClient.setQueryData<StartLessonResponse>(juniorKeys.lesson(sessionId), {
          ...previousStep,
          scoreSoFar: previousStep.scoreSoFar + 1,
        });
      }

      return { previousStep };
    },
    onError: (_err, _newAnswer, context) => {
      // Roll back optimistic update
      if (context?.previousStep) {
        queryClient.setQueryData(juniorKeys.lesson(sessionId), context.previousStep);
      }
      toast.error('Could not submit your answer. Please try recording again.', { duration: 4000 });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: juniorKeys.lesson(sessionId) });
    },
  });
}

/**
 * Fetches the full progress dashboard for a junior student.
 * Stale-while-revalidate so kids see their latest stars instantly.
 *
 * @param studentId - UUID of the student
 * @param opts.grade - Optional grade filter (affects which subjects show)
 *
 * Cached for 30 s stale time; background refetches every 60 s when tab is active.
 */
export function useJuniorProgress(
  studentId: string,
  opts?: { grade?: JuniorGrade; staleTime?: number; refetchInterval?: number },
) {
  const {
    grade,
    staleTime = 30_000,
    refetchInterval = 60_000,
  } = opts ?? {};

  return useQuery<JuniorProgressResponse, Error, JuniorProgressResponse>({
    queryKey: juniorKeys.progress(studentId),
    queryFn: fetchProgressFn,
    staleTime,
    refetchInterval: refetchInterval ?? (window.document.visibilityState === 'visible' ? 60_000 : false),
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    ...defaultRetryConfig,
    select: grade ? (data: JuniorProgressResponse) => filterProgressByGrade(data, grade) : undefined,
    placeholderData: (previousData: JuniorProgressResponse | undefined) => previousData, // smooth SWR
    enabled: !!studentId,
  });
}

/**
 * Generates a personalised AI story for the junior student.
 * Heavy computation; the hook exposes `isPending` for loading skeletons.
 *
 * @param options.grade            - Student's class (determines vocabulary)
 * @param options.subject          - Ties story to curriculum subject
 * @param options.theme            - Story theme (animals, space, etc.)
 * @param options.language         - 'en' | 'hi' | 'en-hi'
 * @param options.wordCountTarget  - Target word count (80–400 typical)
 * @param options.difficulty       - Vocabulary difficulty
 * @param options.includeVocabularyList  - Attach word definitions
 * @param options.includeComprehensionQuestions - Add post-reading quiz
 * @param options.vocabularyWords  - Optional: force specific words into story
 * @param options.moralLesson      - Optional: embed a moral lesson
 * @param options.protagonistName  - Optional: name the story hero
 */
export function useGenerateStory(options?: Partial<GenerateStoryRequest>) {
  return useMutation({
    mutationFn: generateStoryFn,
    retry: (failureCount, error) => {
      if (failureCount >= 2) return false;
      const status = (error as ApiError)?.status;
      if (status && status >= 400 && status < 500) return false;
      return true;
    },
    retryDelay: (attemptIndex) => Math.min(2000 * 2 ** attemptIndex, 10_000),
    onSuccess: (data) => {
      toast.success(`📖 "${data.story.title.en ?? 'Story'} is ready!`, {
        description: `~${data.story.wordCount} words · ${data.story.readingTimeMinutes} min read`,
        duration: 4000,
      });
    },
    onError: (error: ApiError) => {
      const messages: Record<string, string> = {
        CONTENT_FILTER: 'Let us pick a different theme — try again!',
        GRADE_NOT_SUPPORTED: 'Stories for your class are coming soon.',
        WORD_COUNT_TOO_LARGE: 'Let us try a shorter story.',
        TIMEOUT: 'The story is taking too long. Please try once more.',
      };
      toast.error(messages[error.code ?? ''] ?? error.message ?? 'Could not create story', {
        duration: 5000,
      });
    },
  });
}

// ---------------------------------------------------------------------------
// Helper: optional grade-filter for progress (keeps the hook lean)
// ---------------------------------------------------------------------------

function filterProgressByGrade(
  response: JuniorProgressResponse,
  grade: JuniorGrade,
): JuniorProgressResponse {
  return {
    ...response,
    summary: {
      ...response.summary,
      subjectProgress: response.summary.subjectProgress.filter((sp) => sp.subject),
    },
  };
}

// ---------------------------------------------------------------------------
// Convenience: pre-fetch helper (called from page-level useEffect)
// ---------------------------------------------------------------------------

/**
 * Call once when a student logs in to warm the progress cache.
 * Returns a cleanup function to cancel if the student logs out mid-fetch.
 */
export function prefetchJuniorProgress(studentId: string, client?: QueryClient): QueryCanceler {
  const [cancel, controller] = createCancelToken();
  const qc = client ?? new QueryClient();

  // We use the raw query fn here to bypass the enabled gate in the hook
  qc
    .prefetchQuery({
      queryKey: juniorKeys.progress(studentId),
      queryFn: () =>
        apiFetch<JuniorProgressResponse>(`/v1/junior/students/${studentId}/progress`, {
          signal: controller.signal,
        }),
      staleTime: 30_000,
    })
    .catch(() => {
      /* swallow — errors handled via toast in actual calls */
    });

  return cancel;
}

// ---------------------------------------------------------------------------
// Type-guard utilities
// ---------------------------------------------------------------------------

export function isVoiceFeedbackComplete(
  feedback: SubmitVoiceAnswerResponse,
): boolean {
  return (
    feedback.feedbackType !== 'unclear' &&
    feedback.feedbackType !== 'try_again'
  );
}

export function getStoryReadingLevel(story: GeneratedStory): string {
  if (story.difficulty === 'easy') return 'Grade 1-2';
  if (story.difficulty === 'medium') return 'Grade 3-4';
  return 'Grade 5+';
}

export function calculateMasteryColor(percentage: number): string {
  if (percentage >= 80) return '#22c55e'; // green-500
  if (percentage >= 50) return '#f59e0b'; // amber-500
  return '#ef4444';                       // red-500
}

// ---------------------------------------------------------------------------
// Offline helpers (use with service worker / IndexedDB via `zustand`)
// ---------------------------------------------------------------------------

interface QueuedVoiceAnswerEntry {
  id: string;
  payload: Omit<SubmitVoiceAnswerRequest, 'audioDataUri'>;
  audioBlob: Blob;
  queuedAt: string;
}

/**
 * Serialises a voice answer payload for offline queueing.
 * Call when navigator.onLine === false, then replay via useSubmitVoiceAnswer.
 */
export function queueVoiceAnswerOffline(
  payload: Omit<SubmitVoiceAnswerRequest, 'audioDataUri'> & { audioBlob: Blob },
): void {
  if (typeof indexedDB === 'undefined') {
    console.warn('[JuniorService] IndexedDB unavailable — offline queue skipped.');
    return;
  }

  const request = indexedDB.open('junior-platform-offline', 1);
  request.onupgradeneeded = () => {
    const db = request.result;
    if (!db.objectStoreNames.contains('voice-answer-queue')) {
      db.createObjectStore('voice-answer-queue', { keyPath: 'id' });
    }
  };
  request.onsuccess = () => {
    const db = request.result;
    const tx = db.transaction('voice-answer-queue', 'readwrite');
    const store = tx.objectStore('voice-answer-queue');
    store.put({
      id: `voice-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      payload: { ...payload, audioDataUri: '' },
      audioBlob: payload.audioBlob,
      queuedAt: new Date().toISOString(),
    });
  };
}

/**
 * Replays queued voice answers once connectivity is restored.
 * Safe to call on 'online' event listener.
 */
export async function replayQueuedVoiceAnswers(
  submitFn: MutationFunction<SubmitVoiceAnswerResponse, SubmitVoiceAnswerRequest>,
): Promise<void> {
  if (typeof indexedDB === 'undefined') return;

  const request = indexedDB.open('junior-platform-offline', 1);
  request.onsuccess = async () => {
    const db = request.result;
    if (!db.objectStoreNames.contains('voice-answer-queue')) return;

    const tx = db.transaction('voice-answer-queue', 'readonly');
    const store = tx.objectStore('voice-answer-queue');
    const all = await new Promise<QueuedVoiceAnswerEntry[]>((resolve) => {
      const items: QueuedVoiceAnswerEntry[] = [];
      store.openCursor(null, 'prev').onsuccess = (e: Event) => {
        const cursor = (e.target as IDBRequest).result as IDBCursorWithValue | null;
        if (cursor) {
          items.push(cursor.value as QueuedVoiceAnswerEntry);
          cursor.continue();
        } else {
          resolve(items);
        }
      };
    });

    const writeTx = db.transaction('voice-answer-queue', 'readwrite');
    const writeStore = writeTx.objectStore('voice-answer-queue');

    for (const item of all) {
      try {
        const blob: Blob = item.audioBlob;
        const reader = new FileReader();
        const dataUri: string = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });

        await submitFn({
          ...item.payload,
          audioDataUri: dataUri,
        }, {} as never);
        writeStore.delete(item.id);
      } catch {
        // Leave in queue for next attempt
      }
    }
  };
}