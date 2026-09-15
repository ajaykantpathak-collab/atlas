/**
 * GameProgressStore — persists game progress across sessions.
 *
 * Saves which challenge the student is on, so they can resume
 * if they close the browser mid-game.
 */

const STORAGE_KEY = 'atlas_game_progress';

export interface GameProgress {
  gameFile: string;
  classLevel: number;
  currentChallenge: number;
  stars: number;
  score: number;
  timestamp: string;
}

export class GameProgressStore {
  /**
   * Save progress for a game.
   */
  static save(progress: GameProgress): void {
    if (typeof window === 'undefined') return;
    try {
      const all = this.getAll();
      all[progress.gameFile] = progress;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    } catch {
      // localStorage not available
    }
  }

  /**
   * Get progress for a specific game.
   */
  static get(gameFile: string): GameProgress | null {
    if (typeof window === 'undefined') return null;
    try {
      const all = this.getAll();
      return all[gameFile] || null;
    } catch {
      return null;
    }
  }

  /**
   * Get all saved game progress.
   */
  static getAll(): Record<string, GameProgress> {
    if (typeof window === 'undefined') return {};
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  /**
   * Clear progress for a game (after completion).
   */
  static clear(gameFile: string): void {
    if (typeof window === 'undefined') return;
    try {
      const all = this.getAll();
      delete all[gameFile];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    } catch {
      // localStorage not available
    }
  }

  /**
   * Check if a game has saved progress.
   */
  static hasProgress(gameFile: string): boolean {
    return this.get(gameFile) !== null;
  }
}
