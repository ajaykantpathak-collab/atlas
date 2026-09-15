/**
 * GamificationManager — badges, streaks, and world progression.
 *
 * Badges:
 * - First Steps: complete first challenge
 * - Math Master: 10 correct math answers
 * - Science Explorer: 10 correct science answers
 * - Streak Star: 5 correct in a row
 * - Comeback Kid: recover from 3 wrong to correct
 * - Speed Learner: answer in under 5 seconds
 * - Show-me Survivor: complete after using show-me
 * - Perfectionist: complete all challenges with no errors
 * - Topic Master: master 3 topics
 *
 * Streaks:
 * - Daily streak (consecutive days of practice)
 * - Correct-answer streak (with fire animation at 5+)
 *
 * Living World:
 * - World evolves as mastery increases
 * - Starts as empty grassland
 * - Adds flowers, animals, buildings, weather as topics are mastered
 */

import type { Badge, StreakInfo, WorldState, WorldElement, BadgePopup } from './types';
import type { LearningAnalytics } from '../analytics/LearningAnalytics';

// ─── Badge definitions ───────────────────────────────────────

export const BADGES: Badge[] = [
  {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Complete your first challenge',
    emoji: '👣',
    threshold: 1,
    metric: 'total_correct',
  },
  {
    id: 'math_master',
    name: 'Math Master',
    description: 'Get 10 math answers correct',
    emoji: '🔢',
    threshold: 10,
    metric: 'math_correct',
    subject: 'maths',
  },
  {
    id: 'science_explorer',
    name: 'Science Explorer',
    description: 'Get 10 science answers correct',
    emoji: '🔬',
    threshold: 10,
    metric: 'science_correct',
    subject: 'science',
  },
  {
    id: 'streak_star',
    name: 'Streak Star',
    description: 'Get 5 correct answers in a row',
    emoji: '⭐',
    threshold: 5,
    metric: 'streak',
  },
  {
    id: 'comeback_kid',
    name: 'Comeback Kid',
    description: 'Recover from 3 wrong answers to get one right',
    emoji: '💪',
    threshold: 1,
    metric: 'comeback',
  },
  {
    id: 'speed_learner',
    name: 'Speed Learner',
    description: 'Answer correctly in under 5 seconds',
    emoji: '⚡',
    threshold: 1,
    metric: 'speed',
  },
  {
    id: 'show_me_survivor',
    name: 'Show-me Survivor',
    description: 'Complete a challenge after using Show-me',
    emoji: '🦉',
    threshold: 1,
    metric: 'show_me',
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Complete all 8 challenges with no errors',
    emoji: '🏆',
    threshold: 1,
    metric: 'perfect_game',
  },
  {
    id: 'topic_master',
    name: 'Topic Master',
    description: 'Master 3 different topics',
    emoji: '🎓',
    threshold: 3,
    metric: 'topics_mastered',
  },
  {
    id: 'daily_devoted',
    name: 'Daily Devoted',
    description: 'Practice 5 days in a row',
    emoji: '📅',
    threshold: 5,
    metric: 'daily_streak',
  },
];

// ─── GamificationManager ─────────────────────────────────────

export class GamificationManager {
  private analytics: LearningAnalytics;
  private recentWrongCount = 0;
  private badgePopups: BadgePopup[] = [];
  private onBadgeEarned?: (badge: Badge) => void;

  constructor(analytics: LearningAnalytics) {
    this.analytics = analytics;
  }

  /**
   * Set callback for when a badge is earned.
   */
  setBadgeCallback(cb: (badge: Badge) => void): void {
    this.onBadgeEarned = cb;
  }

  /**
   * Record a correct answer and check for badges.
   */
  recordCorrect(params: {
    subject: string;
    timeTaken: number;
    showMeUsed: boolean;
    perfectGame: boolean;
  }): void {
    const { subject, timeTaken, showMeUsed, perfectGame } = params;
    const profile = this.analytics.getProfile();
    if (!profile) return;

    // Track comeback
    let comeback = false;
    if (this.recentWrongCount >= 3) {
      comeback = true;
    }
    this.recentWrongCount = 0;

    // Check each badge
    for (const badge of BADGES) {
      if (this.analytics.getBadges().includes(badge.id)) continue;

      let earned = false;
      switch (badge.metric) {
        case 'total_correct':
          earned = profile.totalCorrect + 1 >= badge.threshold;
          break;
        case 'math_correct':
          if (subject === 'maths') {
            const mathCorrect = profile.attempts.filter(a => a.subject === 'maths' && a.correct).length;
            earned = mathCorrect + 1 >= badge.threshold;
          }
          break;
        case 'science_correct':
          if (subject === 'science') {
            const sciCorrect = profile.attempts.filter(a => a.subject === 'science' && a.correct).length;
            earned = sciCorrect + 1 >= badge.threshold;
          }
          break;
        case 'streak':
          earned = profile.currentStreak + 1 >= badge.threshold;
          break;
        case 'daily_streak':
          earned = profile.dailyStreak >= badge.threshold;
          break;
        case 'comeback':
          earned = comeback;
          break;
        case 'speed':
          earned = timeTaken < 5;
          break;
        case 'show_me':
          earned = showMeUsed;
          break;
        case 'perfect_game':
          earned = perfectGame;
          break;
        case 'topics_mastered':
          const mastered = this.analytics.getMasteredTopics();
          earned = mastered.length >= badge.threshold;
          break;
      }

      if (earned) {
        this.analytics.addBadge(badge.id);
        this.badgePopups.push({ badge, timestamp: new Date().toISOString() });
        this.onBadgeEarned?.(badge);
      }
    }
  }

  /**
   * Record a wrong answer.
   */
  recordWrong(): void {
    this.recentWrongCount++;
  }

  /**
   * Get current streak info.
   */
  getStreakInfo(): StreakInfo {
    const profile = this.analytics.getProfile();
    if (!profile) {
      return { current: 0, best: 0, daily: 0, onFire: false };
    }
    return {
      current: profile.currentStreak,
      best: profile.bestStreak,
      daily: profile.dailyStreak,
      onFire: profile.currentStreak >= 5,
    };
  }

  /**
   * Get all earned badges.
   */
  getEarnedBadges(): Badge[] {
    const earnedIds = this.analytics.getBadges();
    return BADGES.filter(b => earnedIds.includes(b.id));
  }

  /**
   * Get all badges (earned + unearned) for display.
   */
  getAllBadges(): { badge: Badge; earned: boolean }[] {
    const earnedIds = this.analytics.getBadges();
    return BADGES.map(b => ({ badge: b, earned: earnedIds.includes(b.id) }));
  }

  /**
   * Get pending badge popups (and clear them).
   */
  consumeBadgePopups(): BadgePopup[] {
    const popups = this.badgePopups;
    this.badgePopups = [];
    return popups;
  }

  /**
   * Get the current world state based on mastery.
   */
  getWorldState(): WorldState {
    const mastered = this.analytics.getMasteredTopics();
    const totalMastery = this.analytics.getTotalMasteryScore();
    const worldLevel = Math.min(10, Math.floor(totalMastery / 10));

    // Unlock elements based on world level
    const elements = this.getElementsForLevel(worldLevel);

    // Season based on mastery
    let season: WorldState['season'] = 'spring';
    if (totalMastery >= 75) season = 'summer';
    else if (totalMastery >= 50) season = 'spring';
    else if (totalMastery >= 25) season = 'autumn';
    else season = 'winter';

    // Time of day based on progress
    let timeOfDay: WorldState['timeOfDay'] = 'dawn';
    if (totalMastery >= 90) timeOfDay = 'day';
    else if (totalMastery >= 60) timeOfDay = 'day';
    else if (totalMastery >= 30) timeOfDay = 'dusk';
    else timeOfDay = 'dawn';

    return {
      masteredTopics: mastered.length,
      totalMastery,
      worldLevel,
      elements,
      season,
      timeOfDay,
    };
  }

  /**
   * Get world elements unlocked at a given level.
   */
  private getElementsForLevel(level: number): WorldElement[] {
    const elements: WorldElement[] = ['tree'];
    if (level >= 1) elements.push('flower_red');
    if (level >= 2) elements.push('flower_blue', 'flower_yellow');
    if (level >= 3) elements.push('butterfly', 'bird');
    if (level >= 4) elements.push('rabbit', 'cloud');
    if (level >= 5) elements.push('sun', 'deer');
    if (level >= 6) elements.push('house', 'bridge');
    if (level >= 7) elements.push('fountain', 'windmill');
    if (level >= 8) elements.push('rainbow');
    if (level >= 9) elements.push('star');
    return elements;
  }
}
