/**
 * Gamification types — badges, streaks, world state
 */

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  /** Condition: how many X to earn */
  threshold: number;
  /** What metric to check */
  metric: 'total_correct' | 'math_correct' | 'science_correct' | 'streak' | 'daily_streak' | 'comeback' | 'speed' | 'show_me' | 'perfect_game' | 'topics_mastered';
  /** Subject filter (for math/science specific badges) */
  subject?: string;
}

export interface StreakInfo {
  /** Current correct-answer streak */
  current: number;
  /** Best correct-answer streak */
  best: number;
  /** Daily streak (consecutive days) */
  daily: number;
  /** Whether streak is "on fire" (>= 5) */
  onFire: boolean;
}

export interface WorldState {
  /** Number of mastered topics */
  masteredTopics: number;
  /** Total mastery score (0-100) */
  totalMastery: number;
  /** World level (0-10) based on mastery */
  worldLevel: number;
  /** Unlocked elements */
  elements: WorldElement[];
  /** Current season (based on mastery) */
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  /** Time of day (based on progress) */
  timeOfDay: 'dawn' | 'day' | 'dusk' | 'night';
}

export type WorldElement =
  | 'tree' | 'flower_red' | 'flower_blue' | 'flower_yellow'
  | 'butterfly' | 'bird' | 'rabbit' | 'deer'
  | 'house' | 'fountain' | 'bridge' | 'windmill'
  | 'rainbow' | 'cloud' | 'sun' | 'star';

export interface BadgePopup {
  badge: Badge;
  timestamp: string;
}
