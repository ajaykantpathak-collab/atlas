"use client";

import { create } from "zustand";

// ─── Types ────────────────────────────────────────────────────────────────────
export type StepId = "welcome" | "class" | "subjects" | "language" | "goal" | "ready";
export type Language = "en" | "hinglish" | "hindi";
export type BoardType = "CBSE" | "ICSE" | "State Board";
export type ClassLevel = 11 | 12;
export type Subject = "maths" | "physics" | "chemistry" | "biology" | "english" | "history" | "geography" | "political_science" | "economics" | "informatics";
export type GoalType = "boards_top" | "boards_good" | "foundation" | "competitive";

export interface OnboardingState {
  step: StepId;
  classLevel: ClassLevel | null;
  board: BoardType | null;
  subjects: Subject[];
  language: Language;
  goal: GoalType | null;
  completed: boolean;
  setStep: (step: StepId) => void;
  next: () => void;
  prev: () => void;
  setClassLevel: (level: ClassLevel) => void;
  setBoard: (board: BoardType) => void;
  toggleSubject: (subject: Subject) => void;
  setLanguage: (lang: Language) => void;
  setGoal: (goal: GoalType) => void;
  complete: () => void;
  reset: () => void;
}

const STORAGE_KEY = "onboarding_state";

const loadState = (): Partial<OnboardingState> => {
  try {
    if (typeof window === "undefined") return {};
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const saveState = (state: Partial<OnboardingState>) => {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full or unavailable
  }
};

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  step: "welcome",
  classLevel: null,
  board: null,
  subjects: [],
  language: "en",
  goal: null,
  completed: false,
  setStep: (step) => set({ step }),
  next: () => set((s) => {
    const order: StepId[] = ["welcome", "class", "subjects", "language", "goal", "ready"];
    const idx = order.indexOf(s.step);
    return idx < order.length - 1 ? { step: order[idx + 1] } : {};
  }),
  prev: () => set((s) => {
    const order: StepId[] = ["welcome", "class", "subjects", "language", "goal", "ready"];
    const idx = order.indexOf(s.step);
    return idx > 0 ? { step: order[idx - 1] } : {};
  }),
  setClassLevel: (level) => {
    set({ classLevel: level });
    saveState({ classLevel: level });
  },
  setBoard: (board) => {
    set({ board });
    saveState({ board });
  },
  toggleSubject: (subject) =>
    set((s) => {
      const next = s.subjects.includes(subject)
        ? s.subjects.filter((x) => x !== subject)
        : [...s.subjects, subject];
      saveState({ subjects: next });
      return { subjects: next };
    }),
  setLanguage: (lang) => {
    set({ language: lang });
    saveState({ language: lang });
  },
  setGoal: (goal) => {
    set({ goal });
    saveState({ goal });
  },
  complete: () => {
    set({ completed: true, step: "ready" });
    saveState({ completed: true });
  },
  reset: () => {
    set({ step: "welcome", classLevel: null, board: null, subjects: [], language: "en", goal: null, completed: false });
    localStorage.removeItem(STORAGE_KEY);
  },
}));
