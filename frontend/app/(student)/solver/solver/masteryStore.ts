// Minimal mastery store for solver page — wraps lib/masteryStore
export function useMasteryStore() {
  // Simple localStorage-based mastery tracking
  const STORAGE_KEY = "solver_mastery_v2";

  function load(): Record<string, { mastery: number; attempts: number; correct: number }> {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function save(data: Record<string, { mastery: number; attempts: number; correct: number }>) {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  }

  return {
    getMastery: (problemType: string): number => {
      const store = load();
      return store[problemType]?.mastery ?? 0;
    },
    getAttempts: (problemType: string): number => {
      const store = load();
      return store[problemType]?.attempts ?? 0;
    },
    incrementAttempt: (problemType: string) => {
      const store = load();
      if (!store[problemType]) store[problemType] = { mastery: 0, attempts: 0, correct: 0 };
      store[problemType].attempts++;
      const e = store[problemType];
      e.mastery = Math.round((e.correct / e.attempts) * 100);
      save(store);
    },
    incrementCorrect: (problemType: string) => {
      const store = load();
      if (!store[problemType]) store[problemType] = { mastery: 0, attempts: 0, correct: 0 };
      store[problemType].correct++;
      store[problemType].attempts++;
      const e = store[problemType];
      e.mastery = Math.round((e.correct / e.attempts) * 100);
      save(store);
    },
  };
}
