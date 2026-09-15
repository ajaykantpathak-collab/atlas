/**
 * ProgressStore — localStorage persistence for student progress.
 *
 * Saves and loads StudentProfile to/from localStorage.
 * Handles serialization, versioning, and error recovery.
 */

import type { StudentProfile } from './types';

const STORAGE_KEY = 'atlas_student_profile';
const STORAGE_VERSION = 1;

interface StoredData {
  version: number;
  profile: StudentProfile;
}

export class ProgressStore {
  /**
   * Load the student profile from localStorage.
   * Returns null if no profile exists or data is corrupted.
   */
  static load(): StudentProfile | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data: StoredData = JSON.parse(raw);
      if (data.version !== STORAGE_VERSION) {
        // Version mismatch — could migrate here in future
        return data.profile;
      }
      return data.profile;
    } catch {
      return null;
    }
  }

  /**
   * Save the student profile to localStorage.
   */
  static save(profile: StudentProfile): void {
    try {
      const data: StoredData = {
        version: STORAGE_VERSION,
        profile,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // localStorage might be full or unavailable
      // Silently fail — analytics are non-critical
    }
  }

  /**
   * Clear all stored progress.
   */
  static clear(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  /**
   * Create a new empty student profile.
   */
  static createProfile(studentId: string, name: string, classLevel: number): StudentProfile {
    const now = new Date().toISOString();
    return {
      studentId,
      name,
      classLevel,
      attempts: [],
      topics: {},
      totalCorrect: 0,
      totalWrong: 0,
      currentStreak: 0,
      bestStreak: 0,
      dailyStreak: 0,
      lastPracticeDate: null,
      badges: [],
      createdAt: now,
      updatedAt: now,
    };
  }
}
