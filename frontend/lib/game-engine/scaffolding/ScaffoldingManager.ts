/**
 * ScaffoldingManager — manages scaffold levels per topic.
 *
 * Fades visual supports as mastery increases:
 * - Level 3 (full): drag physical objects, count aloud, mascot narrates
 * - Level 2 (partial): number line, simplified visuals
 * - Level 1 (abstract): symbols only, no manipulatives
 *
 * Fade logic:
 * - Start at Level 3 for new topics
 * - Move to Level 2 after 2 correct in a row
 * - Move to Level 1 after 4 correct in a row
 * - Drop back to Level 3 after 2 wrong in a row
 *
 * This helps students transfer from concrete to abstract understanding,
 * which is essential for doing tests without manipulatives.
 */

import type { ScaffoldLevel, ScaffoldConfig } from './types';
import { getScaffoldConfig } from './types';
import type { LearningAnalytics } from '../analytics/LearningAnalytics';

export class ScaffoldingManager {
  private analytics: LearningAnalytics;

  constructor(analytics: LearningAnalytics) {
    this.analytics = analytics;
  }

  /**
   * Get the current scaffold level for a topic.
   * Falls back to level 3 (full support) for new topics.
   */
  getLevel(topic: string, subject: string): ScaffoldLevel {
    const mastery = this.analytics.getTopicMastery(topic, subject);
    if (!mastery) return 3;
    return mastery.scaffoldLevel as ScaffoldLevel;
  }

  /**
   * Get the full scaffold config for a topic.
   */
  getConfig(topic: string, subject: string): ScaffoldConfig {
    return getScaffoldConfig(this.getLevel(topic, subject));
  }

  /**
   * Check if manipulatives should be used for this topic.
   */
  shouldUseManipulatives(topic: string, subject: string): boolean {
    return this.getConfig(topic, subject).useManipulatives;
  }

  /**
   * Check if number line should be shown for this topic.
   */
  shouldUseNumberLine(topic: string, subject: string): boolean {
    return this.getConfig(topic, subject).useNumberLine;
  }

  /**
   * Check if show-me should be available for this topic.
   */
  shouldShowShowMe(topic: string, subject: string): boolean {
    return this.getConfig(topic, subject).showMeAvailable;
  }

  /**
   * Check if abstract (symbolic) rendering should be used.
   */
  shouldUseAbstract(topic: string, subject: string): boolean {
    return this.getConfig(topic, subject).abstractOnly;
  }

  /**
   * Check if full narration should be used.
   */
  shouldUseFullNarration(topic: string, subject: string): boolean {
    return this.getConfig(topic, subject).fullNarration;
  }

  /**
   * Get a human-readable description of the current scaffold level.
   */
  getLevelDescription(topic: string, subject: string): string {
    const level = this.getLevel(topic, subject);
    switch (level) {
      case 3: return 'Full support — drag objects and count along';
      case 2: return 'Partial support — using number line';
      case 1: return 'Abstract — solving with numbers and symbols';
    }
  }
}
