'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ==========================================================================
// Types
// ==========================================================================

export type AuthStatus = 'guest' | 'authenticating' | 'logged_in' | 'error';

export interface StudentProfile {
  id?: string;
  name: string;
  class: number;
  subjects: string[];
  languagePref: 'en' | 'hinglish' | 'hi';
  streak: number;
  lastActiveDate: string | null;
  totalSessions: number;
}

export interface MasterySummary {
  [subject: string]: {
    solved: number;
    accuracy: number;
    weakTopics: string[];
    strongTopics: string[];
  };
}

export interface AuthState {
  status: AuthStatus;
  phoneNumber: string | null;
  token: string | null;
  refreshToken: string | null;
  tokenExpiresAt: number | null;
}

export interface OnboardingStep {
  name: 'name' | 'class' | 'subjects' | null;
}

export interface StudentState {
  // Profile (always available, synced when online)
  profile: StudentProfile;

  // Auth state
  auth: AuthState;

  // Onboarding flow tracking
  onboardingStep: OnboardingStep['name'];
  showLoginPrompt: boolean;

  // Usage tracking for login nudge
  sessionCount: number;
  LOGIN_PROMPT_THRESHOLD: number;

  // UI state
  isLoading: boolean;
  error: string | null;

  // ---- Profile Actions ----
  setName: (name: string) => void;
  setStudentClass: (classLevel: number) => void;
  setSubjects: (subjects: string[]) => void;
  setLanguagePref: (lang: 'en' | 'hinglish' | 'hi') => void;
  updateStreak: () => void;
  incrementSessions: () => void;
  recordSessionComplete: () => void;

  // ---- Auth Actions ----
  setPhoneNumber: (phone: string) => void;
  initiateLogin: (phoneNumber: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  logout: () => void;
  restoreSession: () => Promise<void>;

  // ---- Onboarding Actions ----
  setOnboardingStep: (step: OnboardingStep['name']) => void;
  completeOnboarding: () => void;
  dismissLoginPrompt: () => void;

  // ---- Utility ----
  reset: () => void;
}

// ==========================================================================
// Default values
// ==========================================================================

const defaultProfile: StudentProfile = {
  name: '',
  class: 0,
  subjects: [],
  languagePref: 'hinglish',
  streak: 0,
  lastActiveDate: null,
  totalSessions: 0,
};

const defaultAuth: AuthState = {
  status: 'guest',
  phoneNumber: null,
  token: null,
  refreshToken: null,
  tokenExpiresAt: null,
};

const initialState: StudentState = {
  profile: defaultProfile,
  auth: defaultAuth,
  onboardingStep: 'name',
  showLoginPrompt: false,
  sessionCount: 0,
  LOGIN_PROMPT_THRESHOLD: 3,
  isLoading: false,
  error: null,
  setName: () => {},
  setStudentClass: () => {},
  setSubjects: () => {},
  setLanguagePref: () => {},
  updateStreak: () => {},
  incrementSessions: () => {},
  recordSessionComplete: () => {},
  setPhoneNumber: () => {},
  initiateLogin: async () => {},
  verifyOtp: async () => {},
  logout: () => {},
  restoreSession: async () => {},
  setOnboardingStep: () => {},
  completeOnboarding: () => {},
  dismissLoginPrompt: () => {},
  reset: () => {},
};

// ==========================================================================
// Storage helpers (IndexedDB via plain promise interface)
// ==========================================================================

const DB_NAME = 'study-platform-db';
const DB_VERSION = 1;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('student-profile')) {
        db.createObjectStore('student-profile', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('mastery-summary')) {
        db.createObjectStore('mastery-summary', { keyPath: 'studentId' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveToIndexedDb(storeName: string, data: Record<string, unknown>): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.put(data);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch {
    // Silently fail — localStorage still works, sync will happen when online
  }
}

async function getFromIndexedDb<T>(storeName: string, key: string): Promise<T | null> {
  try {
    const db = await openDb();
    const result = await new Promise<T | null>((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result?.data ?? null);
      request.onerror = () => reject(request.error);
    });
    db.close();
    return result;
  } catch {
    return null;
  }
}

// ==========================================================================
// Mastery summary helpers (IndexedDB)
// ==========================================================================

const MASTERY_STORE = 'mastery-summary';

export async function saveMasterySummary(studentId: string, summary: MasterySummary): Promise<void> {
  await saveToIndexedDb(MASTERY_STORE, { studentId, data: summary });
}

export async function getMasterySummary(studentId: string): Promise<MasterySummary | null> {
  return getFromIndexedDb<MasterySummary>(MASTERY_STORE, studentId);
}

// ==========================================================================
// API helpers
// ==========================================================================

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || err.message || 'Request failed');
  }
  return res.json();
}

// ==========================================================================
// Streak calculation
// ==========================================================================

function calculateStreak(lastActiveDate: string | null): number {
  if (!lastActiveDate) return 1;
  const last = new Date(lastActiveDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  last.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 0; // already counted today, no increment
  if (diffDays === 1) return 1; // consecutive day
  return -1; // streak broken, caller should reset to 1
}

// ==========================================================================
// Onboarding sequence
// ==========================================================================

const ONBOARDING_SEQUENCE: OnboardingStep['name'][] = ['name', 'class', 'subjects'];

function getNextStep(currentStep: OnboardingStep['name']): OnboardingStep['name'] {
  const idx = ONBOARDING_SEQUENCE.indexOf(currentStep);
  if (idx >= 0 && idx < ONBOARDING_SEQUENCE.length - 1) {
    return ONBOARDING_SEQUENCE[idx + 1];
  }
  return null;
}

// ==========================================================================
// Store
// ==========================================================================

export const useStudentStore = create<StudentState>()(
  persist(
    (set, get) => ({
      profile: defaultProfile,
      auth: defaultAuth,
      onboardingStep: 'name',
      showLoginPrompt: false,
      sessionCount: 0,
      LOGIN_PROMPT_THRESHOLD: 3,
      isLoading: false,
      error: null,

      // ---- Profile Actions ----

      setName: (name: string) =>
        set((state) => ({
          profile: { ...state.profile, name },
        })),

      setStudentClass: (classLevel: number) =>
        set((state) => ({
          profile: { ...state.profile, class: classLevel },
        })),

      setSubjects: (subjects: string[]) =>
        set((state) => ({
          profile: { ...state.profile, subjects },
        })),

      setLanguagePref: (lang: 'en' | 'hinglish' | 'hi') =>
        set((state) => ({
          profile: { ...state.profile, languagePref: lang },
        })),

      updateStreak: () =>
        set((state) => {
          const result = calculateStreak(state.profile.lastActiveDate);
          if (result === -1) {
            return {
              profile: {
                ...state.profile,
                streak: 1,
                lastActiveDate: new Date().toISOString(),
              },
            };
          }
          return {
            profile: {
              ...state.profile,
              streak: state.profile.streak + result,
              lastActiveDate: new Date().toISOString(),
            },
          };
        }),

      incrementSessions: () =>
        set((state) => ({
          profile: { ...state.profile, totalSessions: state.profile.totalSessions + 1 },
        })),

      recordSessionComplete: () => {
        const state = get();

        // Update streak
        state.updateStreak();

        // Increment session count (for login prompt threshold)
        const newSessionCount = state.sessionCount + 1;

        // Check if we should show login prompt
        // Only prompt if still guest mode and threshold reached
        const shouldPrompt =
          state.auth.status === 'guest' &&
          newSessionCount >= state.LOGIN_PROMPT_THRESHOLD &&
          !state.showLoginPrompt;

        set({
          sessionCount: newSessionCount,
          showLoginPrompt: shouldPrompt,
        });

        // Persist to IndexedDB if online and logged in
        if (navigator.onLine && state.auth.status === 'logged_in') {
          saveToIndexedDb('student-profile', {
            id: state.profile.id || 'current',
            data: {
              ...state.profile,
              totalSessions: state.profile.totalSessions + 1,
            },
          }).catch(() => {});
        }
      },

      // ---- Auth Actions ----

      setPhoneNumber: (phoneNumber: string) =>
        set((state) => ({
          auth: { ...state.auth, phoneNumber },
        })),

      initiateLogin: async (phoneNumber: string) => {
        set({ isLoading: true, error: null });
        try {
          get().setPhoneNumber(phoneNumber);
          await apiPost('/auth/send-otp', { phone_number: phoneNumber });
          set((state) => ({
            auth: { ...state.auth, status: 'authenticating' },
          }));
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : 'Failed to send OTP',
            isLoading: false,
          });
        }
      },

      verifyOtp: async (otp: string) => {
        const { phoneNumber } = get().auth;
        if (!phoneNumber) {
          set({ error: 'Phone number not found. Please try again.', isLoading: false });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const response = await apiPost<{
            access_token: string;
            refresh_token: string;
            expires_in: number;
            student_id: string;
          }>('/auth/verify-otp', {
            phone_number: phoneNumber,
            otp,
          });

          const tokenExpiresAt = Date.now() + response.expires_in * 1000;

          // Update auth state
          set((state) => ({
            auth: {
              status: 'logged_in',
              phoneNumber: state.auth.phoneNumber,
              token: response.access_token,
              refreshToken: response.refresh_token,
              tokenExpiresAt,
            },
            isLoading: false,
            showLoginPrompt: false,
            profile: {
              ...state.profile,
              id: response.student_id,
            },
          }));

          // Store token in localStorage for axios interceptor
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', response.access_token);
            localStorage.setItem('refresh_token', response.refresh_token);
          }

          // Sync local profile to server
          await syncProfileToServer();
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : 'Invalid OTP. Please try again.',
            isLoading: false,
            auth: { ...get().auth, status: 'guest' },
          });
        }
      },

      restoreSession: async () => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const refreshToken = typeof window !== 'undefined'
          ? localStorage.getItem('refresh_token')
          : null;

        if (!token || !refreshToken) return;

        set({ isLoading: true });
        try {
          const response = await apiPost<{
            access_token: string;
            refresh_token: string;
            expires_in: number;
          }>('/auth/refresh', {
            refresh_token: refreshToken,
          });

          const tokenExpiresAt = Date.now() + response.expires_in * 1000;

          set((state) => ({
            auth: {
              ...state.auth,
              status: 'logged_in',
              token: response.access_token,
              refreshToken: response.refresh_token,
              tokenExpiresAt,
            },
            isLoading: false,
          }));

          if (typeof window !== 'undefined') {
            localStorage.setItem('token', response.access_token);
            localStorage.setItem('refresh_token', response.refresh_token);
          }
        } catch {
          // Refresh failed — clear tokens, stay in guest mode
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');
          }
          set((state) => ({
            auth: { ...defaultAuth },
            isLoading: false,
          }));
        }
      },

      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
        }
        set({
          profile: defaultProfile,
          auth: defaultAuth,
          onboardingStep: 'name',
          showLoginPrompt: false,
          sessionCount: 0,
          isLoading: false,
          error: null,
        });
      },

      // ---- Onboarding Actions ----

      setOnboardingStep: (step: OnboardingStep['name']) =>
        set({ onboardingStep: step }),

      completeOnboarding: () =>
        set({ onboardingStep: null }),

      dismissLoginPrompt: () =>
        set({ showLoginPrompt: false }),

      // ---- Utility ----

      reset: () => set(initialState),
    }),
    {
      name: 'student-storage',

      // Use custom storage to control what goes where
      storage: createJSONStorage(() => localStorage),

      // Only persist these keys (auth tokens and profile)
      partialize: (state) => ({
        profile: state.profile,
        auth: {
          status: state.auth.status,
          phoneNumber: state.auth.phoneNumber,
          // Don't persist tokens via zustand — use localStorage directly for security
        },
        onboardingStep: state.onboardingStep,
        sessionCount: state.sessionCount,
        showLoginPrompt: state.showLoginPrompt,
      }),

      // Merge stored data on rehydration
      merge: (persisted: Partial<StudentState>, current: StudentState) => {
        if (!persisted.profile) return current;
        return {
          ...current,
          profile: { ...current.profile, ...persisted.profile },
          auth: { ...current.auth, ...persisted.auth },
          onboardingStep: persisted.onboardingStep ?? current.onboardingStep,
          sessionCount: persisted.sessionCount ?? 0,
          showLoginPrompt: persisted.showLoginPrompt ?? false,
        };
      },

      // On rehydration, try to restore session if tokens exist
      onRehydrateStorage: () => (state) => {
        if (typeof window === 'undefined') return;
        if (state?.auth?.token && state?.auth?.refreshToken) {
          state.restoreSession();
        }
      },
    }
  )
);

// ==========================================================================
// Selector hooks (prevent unnecessary re-renders)
// ==========================================================================

export const useStudentProfile = () =>
  useStudentStore((s) => s.profile);

export const useAuthState = () => useStudentStore((s) => s.auth);
export const useIsLoggedIn = () =>
  useStudentStore((s) => s.auth.status === 'logged_in');

export const useIsGuest = () =>
  useStudentStore((s) => s.auth.status === 'guest');

export const useOnboardingStep = () =>
  useStudentStore((s) => s.onboardingStep);
export const useShowLoginPrompt = () =>
  useStudentStore((s) => s.showLoginPrompt);

export const useSessionCount = () =>
  useStudentStore((s) => s.sessionCount);

// ==========================================================================
// Offline sync queue (queues mutations while offline, replays when online)
// ==========================================================================

type QueuedAction = {
  id: string;
  type: string;
  payload: unknown;
  timestamp: number;
};

const SYNC_QUEUE_KEY = 'student-sync-queue';

async function getSyncQueue(): Promise<QueuedAction[]> {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(SYNC_QUEUE_KEY);
  return raw ? JSON.parse(raw) : [];
}

async function addToSyncQueue(action: Omit<QueuedAction, 'id' | 'timestamp'>): Promise<void> {
  const queue = await getSyncQueue();
  const entry: QueuedAction = {
    ...action,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  };
  queue.push(entry);
  localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
}

async function clearSyncQueue(): Promise<void> {
  localStorage.removeItem(SYNC_QUEUE_KEY);
}

export async function syncWithServer(): Promise<void> {
  if (!navigator.onLine) return;

  const store = useStudentStore.getState();
  if (store.auth.status !== 'logged_in') return;

  const queue = await getSyncQueue();
  if (queue.length === 0) return;

  const token = store.auth.token;
  if (!token) return;

  // Replay queued actions against server
  for (const action of queue) {
    try {
      await fetch(`${API_BASE}/student/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(action),
      });
    } catch {
      // Individual sync failed — keep in queue for next attempt
      break;
    }
  }

  await clearSyncQueue();
}

// Listen for online event
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    syncWithServer();
  });
}

// ==========================================================================
// Helper: sync current profile to server
// ==========================================================================

export async function syncProfileToServer(): Promise<void> {
  const store = useStudentStore.getState();
  if (store.auth.status !== 'logged_in') return;
  if (!navigator.onLine) {
    // Queue for later
    await addToSyncQueue({
      type: 'PROFILE_UPDATE',
      payload: store.profile,
    });
    return;
  }

  try {
    const token = store.auth.token;
    await fetch(`${API_BASE}/student/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(store.profile),
    });
  } catch {
    await addToSyncQueue({
      type: 'PROFILE_UPDATE',
      payload: store.profile,
    });
  }
}
