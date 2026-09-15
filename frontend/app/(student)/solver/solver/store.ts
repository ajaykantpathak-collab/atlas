// Minimal solver store — Zustand-compatible hook for mastery tracking
// Uses localStorage for persistence, no backend required

interface MasteryEntry {
  mastery: number; // 0-100
  attempts: number;
  correct: number;
}

const STORAGE_KEY = "solver_mastery";

function loadStore(): Record<string, MasteryEntry> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveStore(data: Record<string, MasteryEntry>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function useSolverStore() {
  return {
    getMastery: (problemType: string): number => {
      const store = loadStore();
      return store[problemType]?.mastery ?? 0;
    },
    getAttempts: (problemType: string): number => {
      const store = loadStore();
      return store[problemType]?.attempts ?? 0;
    },
    incrementAttempt: (problemType: string) => {
      const store = loadStore();
      if (!store[problemType]) store[problemType] = { mastery: 0, attempts: 0, correct: 0 };
      store[problemType].attempts++;
      // Simple BKT: mastery = (correct / attempts) * 100
      const e = store[problemType];
      e.mastery = Math.round((e.correct / e.attempts) * 100);
      saveStore(store);
    },
    incrementCorrect: (problemType: string) => {
      const store = loadStore();
      if (!store[problemType]) store[problemType] = { mastery: 0, attempts: 0, correct: 0 };
      store[problemType].correct++;
      store[problemType].attempts++;
      const e = store[problemType];
      e.mastery = Math.round((e.correct / e.attempts) * 100);
      saveStore(store);
    },
  };
}

export type { ProblemType } from "@/services/solver.service";
