/**
 * SpacedRepetition — schedules topic reviews at increasing intervals.
 *
 * Based on Khan Academy's mastery challenge system:
 * - Topics are reviewed at increasing intervals: 1 → 3 → 7 → 14 → 30 days
 * - After each correct review, interval increases
 * - After a wrong review, interval resets to 1 day
 * - "Review due" when current date >= nextReviewDue
 */

import type { TopicMastery, ReviewItem, MasteryLevel } from './types';

const INTERVALS = [1, 3, 7, 14, 30, 60, 90];

export class SpacedRepetition {
  /**
   * Calculate the next review date after a correct answer.
   * Increases the interval to the next level.
   */
  static scheduleNextReview(topic: TopicMastery): string {
    const currentIntervalIndex = INTERVALS.indexOf(topic.reviewInterval);
    const nextIntervalIndex = Math.min(currentIntervalIndex + 1, INTERVALS.length - 1);
    const nextInterval = INTERVALS[Math.max(nextIntervalIndex, 0)];

    const next = new Date();
    next.setDate(next.getDate() + nextInterval);
    return next.toISOString();
  }

  /**
   * Reset the review interval after a wrong answer.
   * Goes back to 1 day.
   */
  static resetReview(topic: TopicMastery): string {
    const next = new Date();
    next.setDate(next.getDate() + 1);
    return next.toISOString();
  }

  /**
   * Get all topics that are due for review.
   */
  static getDueReviews(topics: Record<string, TopicMastery>): ReviewItem[] {
    const now = new Date();
    const due: ReviewItem[] = [];

    for (const key of Object.keys(topics)) {
      const topic = topics[key];
      if (!topic.nextReviewDue) continue;
      if (topic.level === 'not_started') continue;

      const dueDate = new Date(topic.nextReviewDue);
      if (now >= dueDate) {
        const daysOverdue = Math.floor((now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
        due.push({
          topic: topic.topic,
          subject: topic.subject,
          daysOverdue: Math.max(0, daysOverdue),
          masteryLevel: topic.level,
        });
      }
    }

    // Sort by most overdue first
    due.sort((a, b) => b.daysOverdue - a.daysOverdue);
    return due;
  }

  /**
   * Generate a mastery challenge: 6 questions covering 3 due-for-review topics.
   * Returns the topics to review (the caller generates actual questions).
   */
  static generateMasteryChallenge(topics: Record<string, TopicMastery>): ReviewItem[] {
    const due = this.getDueReviews(topics);
    // Take top 3 most overdue
    return due.slice(0, 3);
  }

  /**
   * Check if a topic needs review soon (within 1 day).
   */
  static isReviewDueSoon(topic: TopicMastery): boolean {
    if (!topic.nextReviewDue) return false;
    const now = new Date();
    const due = new Date(topic.nextReviewDue);
    const hoursUntilDue = (due.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursUntilDue <= 24;
  }

  /**
   * Get the initial review interval (1 day).
   */
  static getInitialInterval(): number {
    return INTERVALS[0];
  }

  /**
   * Get the initial next-review date for a newly practiced topic.
   */
  static getInitialReviewDate(): string {
    const next = new Date();
    next.setDate(next.getDate() + INTERVALS[0]);
    return next.toISOString();
  }
}
