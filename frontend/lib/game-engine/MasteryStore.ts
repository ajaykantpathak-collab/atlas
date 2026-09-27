/**
 * MasteryStore — tracks per-game mastery (80%+ score earned twice = mastered).
 *
 * NIPUN-style gating: a game unlocks the next game in its class+subject
 * sequence only when the previous game is mastered.
 */

const STORAGE_KEY = 'atlas_game_mastery';
const MASTERY_SCORE = 80;
const MASTERY_RUNS = 2;

export interface MasteryRecord {
  gameFile: string;
  attempts: number;
  best: number;
  /** number of completions at >= MASTERY_SCORE */
  passes: number;
  mastered: boolean;
}

export class MasteryStore {
  static getAll(): Record<string, MasteryRecord> {
    if (typeof window === 'undefined') return {};
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  static get(gameFile: string): MasteryRecord | null {
    return this.getAll()[gameFile] || null;
  }

  /**
   * NAV-01 sync-down: merge backend game mastery into the local store so
   * a fresh device (or cleared browser) still sees prior progress.  Backend
   * rows come from /api/progress/game-mastery — never downgrade a higher
   * local best, only fill in what the device lacks.
   */
  static mergeFromBackend(
    rows: Array<{ gameFile: string; bestScore: number; attempts: number; mastered: boolean }>,
  ): Record<string, MasteryRecord> {
    if (typeof window === 'undefined') return this.getAll();
    const all = this.getAll();
    for (const r of rows) {
      const gf = r.gameFile;
      const prev = all[gf];
      if (!prev) {
        // Local store doesn't know this game — adopt backend record so
        // mastered states and attempts survive device changes.
        all[gf] = {
          gameFile: gf,
          attempts: r.attempts,
          best: r.bestScore,
          passes: r.mastered ? MASTERY_RUNS : (r.bestScore >= MASTERY_SCORE ? 1 : 0),
          mastered: r.mastered,
        };
      } else {
        // Merge: max attempts/best, OR mastered — never lose a local master.
        all[gf] = {
          ...prev,
          attempts: Math.max(prev.attempts, r.attempts),
          best: Math.max(prev.best, r.bestScore),
          mastered: prev.mastered || r.mastered,
        };
      }
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    } catch { /* storage unavailable */ }
    return all;
  }

  /**
   * Record a completed run for a game. Score is 0-100.
   * Returns the updated record so callers can show "Mastered!" celebrations.
   */
  static record(gameFile: string, score: number): MasteryRecord {
    const all = this.getAll();
    const prev = all[gameFile] || { gameFile, attempts: 0, best: 0, passes: 0, mastered: false };
    const rec: MasteryRecord = {
      gameFile,
      attempts: prev.attempts + 1,
      best: Math.max(prev.best, score),
      passes: prev.passes + (score >= MASTERY_SCORE ? 1 : 0),
      mastered: false,
    };
    rec.mastered = prev.mastered || rec.passes >= MASTERY_RUNS;
    if (typeof window !== 'undefined') {
      try {
        all[gameFile] = rec;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      } catch { /* storage unavailable */ }
    }
    return rec;
  }

  static isMastered(gameFile: string): boolean {
    return this.get(gameFile)?.mastered === true;
  }

  /**
   * Whether a game is unlocked given its position in a subject sequence.
   * First game is always open; every later game needs the previous mastered.
   */
  static isUnlocked(gameFile: string, indexInSequence: number, sequence: string[]): boolean {
    if (indexInSequence <= 0) return true;
    const prevFile = sequence[indexInSequence - 1];
    return this.isMastered(prevFile);
  }

  /** Hint text for a locked game card. */
  static lockHint(prevGameTitle: string): string {
    return `Finish "${prevGameTitle}" at ${MASTERY_SCORE}+ twice to unlock`;
  }
}
