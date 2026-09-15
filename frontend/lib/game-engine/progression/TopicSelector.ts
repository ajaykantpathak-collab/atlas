/**
 * TopicSelector — student agency through topic choice.
 *
 * Instead of linear progression, shows a topic map where students
 * can choose which topic to explore next. Topics unlock as
 * prerequisites are mastered.
 *
 * Features:
 * - Visual map showing mastered (green), in-progress (yellow), locked (gray) topics
 * - "Recommended next" highlight based on analytics
 * - "Review due" badges from spaced repetition
 * - Prerequisites: must master topic A before unlocking topic B
 */

import type { LearningAnalytics } from '../analytics/LearningAnalytics';
import type { MasteryLevel, ReviewItem } from '../analytics/types';
import { SpacedRepetition } from '../analytics/SpacedRepetition';

// ─── Topic definitions ───────────────────────────────────────

export interface TopicNode {
  id: string;
  name: string;
  subject: string;
  classLevel: number;
  emoji: string;
  /** Prerequisite topic IDs */
  prerequisites: string[];
  /** Related game ID (for launching) */
  gameId?: string;
}

// ─── Class 1-5 topic map ─────────────────────────────────────

export const TOPIC_MAP: TopicNode[] = [
  // Class 1
  { id: 'c1_addition', name: 'Addition', subject: 'maths', classLevel: 1, emoji: '➕', prerequisites: [] },
  { id: 'c1_subtraction', name: 'Subtraction', subject: 'maths', classLevel: 1, emoji: '➖', prerequisites: ['c1_addition'] },
  { id: 'c1_shapes', name: 'Shapes', subject: 'maths', classLevel: 1, emoji: '⭐', prerequisites: [] },
  { id: 'c1_counting', name: 'Counting 1-20', subject: 'maths', classLevel: 1, emoji: '🔢', prerequisites: [] },
  { id: 'c1_body', name: 'Body Parts', subject: 'science', classLevel: 1, emoji: '🫶', prerequisites: [] },
  { id: 'c1_animals', name: 'Animals', subject: 'science', classLevel: 1, emoji: '🐰', prerequisites: [] },
  { id: 'c1_plants', name: 'Plants', subject: 'science', classLevel: 1, emoji: '🌿', prerequisites: [] },

  // Class 2
  { id: 'c2_addition', name: 'Addition to 50', subject: 'maths', classLevel: 2, emoji: '➕', prerequisites: ['c1_addition'] },
  { id: 'c2_subtraction', name: 'Subtraction to 50', subject: 'maths', classLevel: 2, emoji: '➖', prerequisites: ['c1_subtraction'] },
  { id: 'c2_multiplication', name: 'Multiplication', subject: 'maths', classLevel: 2, emoji: '✖️', prerequisites: ['c2_addition'] },
  { id: 'c2_fractions', name: 'Fractions', subject: 'maths', classLevel: 2, emoji: '🍕', prerequisites: ['c2_division'] },
  { id: 'c2_division', name: 'Division', subject: 'maths', classLevel: 2, emoji: '➗', prerequisites: ['c2_multiplication'] },
  { id: 'c2_habitat', name: 'Habitats', subject: 'science', classLevel: 2, emoji: '🏠', prerequisites: ['c1_animals'] },
  { id: 'c2_food', name: 'Food & Health', subject: 'science', classLevel: 2, emoji: '🍎', prerequisites: [] },

  // Class 3
  { id: 'c3_number_line', name: 'Number Line', subject: 'maths', classLevel: 3, emoji: '🐸', prerequisites: ['c2_addition'] },
  { id: 'c3_patterns', name: 'Patterns', subject: 'maths', classLevel: 3, emoji: '📿', prerequisites: [] },
  { id: 'c3_roman', name: 'Roman Numerals', subject: 'maths', classLevel: 3, emoji: '📜', prerequisites: [] },
  { id: 'c3_symmetry', name: 'Symmetry', subject: 'maths', classLevel: 3, emoji: '🦋', prerequisites: [] },
  { id: 'c3_mixing', name: 'Mixtures', subject: 'science', classLevel: 3, emoji: '🧪', prerequisites: [] },
  { id: 'c3_environment', name: 'Environment', subject: 'science', classLevel: 3, emoji: '🌍', prerequisites: [] },
  { id: 'c3_transport', name: 'Transport', subject: 'science', classLevel: 3, emoji: '✈️', prerequisites: [] },

  // Class 4
  { id: 'c4_angles', name: 'Angles', subject: 'maths', classLevel: 4, emoji: '📐', prerequisites: [] },
  { id: 'c4_perimeter', name: 'Perimeter', subject: 'maths', classLevel: 4, emoji: '🚧', prerequisites: [] },
  { id: 'c4_area', name: 'Area', subject: 'maths', classLevel: 4, emoji: '🖼️', prerequisites: ['c4_perimeter'] },
  { id: 'c4_decimals', name: 'Decimals', subject: 'maths', classLevel: 4, emoji: '0️⃣', prerequisites: ['c2_fractions'] },
  { id: 'c4_prime', name: 'Prime & Composite', subject: 'maths', classLevel: 4, emoji: '🔍', prerequisites: [] },
  { id: 'c4_plant_growth', name: 'Plant Growth', subject: 'science', classLevel: 4, emoji: '🌱', prerequisites: ['c1_plants'] },
  { id: 'c4_physical_chemical', name: 'Physical & Chemical Changes', subject: 'science', classLevel: 4, emoji: '⚗️', prerequisites: ['c3_mixing'] },
  { id: 'c4_computer', name: 'Computer History', subject: 'science', classLevel: 4, emoji: '💻', prerequisites: [] },

  // Class 5
  { id: 'c5_percentage', name: 'Percentages', subject: 'maths', classLevel: 5, emoji: '🏷️', prerequisites: ['c4_decimals'] },
  { id: 'c5_integers', name: 'Integers', subject: 'maths', classLevel: 5, emoji: '⛰️', prerequisites: [] },
  { id: 'c5_3d_shapes', name: '3D Shapes', subject: 'maths', classLevel: 5, emoji: '🧊', prerequisites: [] },
  { id: 'c5_circulatory', name: 'Circulatory System', subject: 'science', classLevel: 5, emoji: '🫀', prerequisites: ['c1_body'] },
  { id: 'c5_disasters', name: 'Natural Disasters', subject: 'science', classLevel: 5, emoji: '🌋', prerequisites: [] },
  { id: 'c5_air', name: 'Air Composition', subject: 'science', classLevel: 5, emoji: '💨', prerequisites: [] },
];

// ─── Topic status ────────────────────────────────────────────

export type TopicStatus = 'mastered' | 'in_progress' | 'available' | 'locked' | 'review_due';

export interface TopicWithStatus extends TopicNode {
  status: TopicStatus;
  masteryLevel: MasteryLevel;
  masteryScore: number;
  reviewDue: boolean;
  recommended: boolean;
}

// ─── TopicSelector ───────────────────────────────────────────

export class TopicSelector {
  private analytics: LearningAnalytics;

  constructor(analytics: LearningAnalytics) {
    this.analytics = analytics;
  }

  /**
   * Get all topics for a class level, with status.
   */
  getTopicsForClass(classLevel: number): TopicWithStatus[] {
    const topics = TOPIC_MAP.filter(t => t.classLevel === classLevel);
    const profile = this.analytics.getProfile();
    const dueReviews = profile ? SpacedRepetition.getDueReviews(profile.topics) : [];
    const dueReviewTopics = new Set(dueReviews.map(r => r.topic));

    return topics.map(t => {
      const mastery = this.analytics.getTopicMastery(t.name.toLowerCase().replace(/\s+/g, '_'), t.subject);
      const prereqsMet = this.arePrerequisitesMet(t);
      const reviewDue = mastery ? dueReviewTopics.has(mastery.topic) : false;

      let status: TopicStatus;
      if (mastery?.level === 'mastered') {
        status = reviewDue ? 'review_due' : 'mastered';
      } else if (mastery && mastery.attempts > 0) {
        status = 'in_progress';
      } else if (prereqsMet) {
        status = 'available';
      } else {
        status = 'locked';
      }

      return {
        ...t,
        status,
        masteryLevel: mastery?.level || 'not_started',
        masteryScore: mastery?.score || 0,
        reviewDue,
        recommended: this.isRecommended(t, prereqsMet),
      };
    });
  }

  /**
   * Check if all prerequisites for a topic are mastered.
   */
  private arePrerequisitesMet(topic: TopicNode): boolean {
    if (topic.prerequisites.length === 0) return true;
    for (const prereqId of topic.prerequisites) {
      const prereq = TOPIC_MAP.find(t => t.id === prereqId);
      if (!prereq) continue;
      const mastery = this.analytics.getTopicMastery(prereq.name.toLowerCase().replace(/\s+/g, '_'), prereq.subject);
      if (!mastery || mastery.level !== 'mastered') return false;
    }
    return true;
  }

  /**
   * Check if a topic is recommended (next best step).
   * A topic is recommended if:
   * - It's available (prereqs met, not started)
   * - It's the first available topic for its subject
   * - Or it has a review due
   */
  private isRecommended(topic: TopicNode, prereqsMet: boolean): boolean {
    if (!prereqsMet) return false;
    const mastery = this.analytics.getTopicMastery(topic.name.toLowerCase().replace(/\s+/g, '_'), topic.subject);
    if (mastery?.level === 'mastered') return false;

    // If no mastery at all and prereqs are met, it's a candidate
    if (!mastery || mastery.attempts === 0) {
      // Check if there's no earlier available topic in the same subject
      const sameSubjectTopics = TOPIC_MAP.filter(t => t.subject === topic.subject && t.classLevel <= topic.classLevel);
      for (const t of sameSubjectTopics) {
        if (t.id === topic.id) return true; // First available
        const tMastery = this.analytics.getTopicMastery(t.name.toLowerCase().replace(/\s+/g, '_'), t.subject);
        if (!tMastery || tMastery.level !== 'mastered') return false;
      }
    }

    return false;
  }

  /**
   * Get the recommended next topic.
   */
  getRecommendedTopic(classLevel: number): TopicWithStatus | null {
    const topics = this.getTopicsForClass(classLevel);
    // First, check for review-due topics
    const reviewDue = topics.find(t => t.status === 'review_due');
    if (reviewDue) return reviewDue;
    // Then, check for recommended topics
    const recommended = topics.find(t => t.recommended);
    if (recommended) return recommended;
    // Then, first in-progress
    const inProgress = topics.find(t => t.status === 'in_progress');
    if (inProgress) return inProgress;
    // Then, first available
    const available = topics.find(t => t.status === 'available');
    if (available) return available;
    return null;
  }

  /**
   * Get status color for a topic (for UI rendering).
   */
  getStatusColor(status: TopicStatus): string {
    switch (status) {
      case 'mastered': return '#22c55e';
      case 'review_due': return '#f97316';
      case 'in_progress': return '#fbbf24';
      case 'available': return '#3b82f6';
      case 'locked': return '#9ca3af';
    }
  }

  /**
   * Get status emoji for a topic.
   */
  getStatusEmoji(status: TopicStatus): string {
    switch (status) {
      case 'mastered': return '✅';
      case 'review_due': return '🔄';
      case 'in_progress': return '⏳';
      case 'available': return '▶️';
      case 'locked': return '🔒';
    }
  }
}
