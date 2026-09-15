/**
 * LearningAnalytics — core analytics engine.
 *
 * Tracks every attempt, computes mastery, classifies errors,
 * generates insights, and integrates with spaced repetition.
 *
 * Usage:
 *   const analytics = new LearningAnalytics();
 *   analytics.init('student_001', 'Bunty', 3);
 *   analytics.recordAttempt({ question: '3+4', studentAnswer: '7', correctAnswer: '7', ... });
 *   const insights = analytics.getInsights();
 *   const dueReviews = analytics.getDueReviews();
 */

import type {
  StudentProfile,
  AttemptRecord,
  TopicMastery,
  Insight,
  MasteryLevel,
  ReviewItem,
  ErrorType,
} from './types';
import { ProgressStore } from './ProgressStore';
import { ErrorClassifier } from './ErrorClassifier';
import { SpacedRepetition } from './SpacedRepetition';

export class LearningAnalytics {
  private profile: StudentProfile | null = null;

  /**
   * Initialize: load existing profile or create new one.
   */
  init(studentId: string, name: string, classLevel: number): void {
    const existing = ProgressStore.load();
    if (existing && existing.studentId === studentId) {
      this.profile = existing;
    } else {
      this.profile = ProgressStore.createProfile(studentId, name, classLevel);
      ProgressStore.save(this.profile);
    }
  }

  /**
   * Get the current profile (or null if not initialized).
   */
  getProfile(): StudentProfile | null {
    return this.profile;
  }

  /**
   * Record a single attempt.
   */
  recordAttempt(params: {
    question: string;
    subject: string;
    topic: string;
    studentAnswer: string;
    correctAnswer: string;
    correct: boolean;
    timeTaken: number;
    hintsUsed: number;
    showMeUsed: boolean;
    classLevel: number;
  }): void {
    if (!this.profile) return;

    const { question, subject, topic, studentAnswer, correctAnswer, correct, timeTaken, hintsUsed, showMeUsed, classLevel } = params;

    // Classify error if wrong
    let errorType: ErrorType = 'none';
    let misconception: string | undefined;
    if (!correct) {
      const classification = ErrorClassifier.classify(question, studentAnswer, correctAnswer, subject);
      errorType = classification.type;
      misconception = classification.misconception;
    }

    // Create attempt record
    const attempt: AttemptRecord = {
      timestamp: new Date().toISOString(),
      question,
      subject,
      topic,
      studentAnswer,
      correctAnswer,
      correct,
      errorType,
      misconception,
      timeTaken,
      hintsUsed,
      showMeUsed,
      classLevel,
    };

    this.profile.attempts.push(attempt);

    // Update totals
    if (correct) {
      this.profile.totalCorrect++;
      this.profile.currentStreak++;
      if (this.profile.currentStreak > this.profile.bestStreak) {
        this.profile.bestStreak = this.profile.currentStreak;
      }
    } else {
      this.profile.totalWrong++;
      this.profile.currentStreak = 0;
    }

    // Update daily streak
    this.updateDailyStreak();

    // Update topic mastery
    this.updateTopicMastery(topic, subject, correct, misconception);

    // Update spaced repetition
    const topicKey = this.topicKey(topic, subject);
    const topicMastery = this.profile.topics[topicKey];
    if (topicMastery) {
      if (correct) {
        topicMastery.nextReviewDue = SpacedRepetition.scheduleNextReview(topicMastery);
        const intervalIdx = [1, 3, 7, 14, 30, 60, 90].indexOf(topicMastery.reviewInterval);
        topicMastery.reviewInterval = [1, 3, 7, 14, 30, 60, 90][Math.min(intervalIdx + 1, 6)];
      } else {
        topicMastery.nextReviewDue = SpacedRepetition.resetReview(topicMastery);
        topicMastery.reviewInterval = 1;
      }
    }

    this.profile.updatedAt = new Date().toISOString();
    ProgressStore.save(this.profile);
  }

  /**
   * Update mastery for a specific topic.
   */
  private updateTopicMastery(topic: string, subject: string, correct: boolean, misconception?: string): void {
    if (!this.profile) return;
    const key = this.topicKey(topic, subject);
    let tm = this.profile.topics[key];

    if (!tm) {
      tm = {
        topic,
        subject,
        level: 'not_started',
        score: 0,
        attempts: 0,
        correct: 0,
        currentStreak: 0,
        bestStreak: 0,
        errorPatterns: {},
        lastPracticed: null,
        nextReviewDue: null,
        reviewInterval: 1,
        scaffoldLevel: 3,
      };
      this.profile.topics[key] = tm;
    }

    tm.attempts++;
    tm.lastPracticed = new Date().toISOString();

    if (correct) {
      tm.correct++;
      tm.currentStreak++;
      if (tm.currentStreak > tm.bestStreak) tm.bestStreak = tm.currentStreak;
    } else {
      tm.currentStreak = 0;
      if (misconception) {
        tm.errorPatterns[misconception] = (tm.errorPatterns[misconception] || 0) + 1;
      }
    }

    // Compute mastery score (0-100)
    const accuracy = tm.attempts > 0 ? tm.correct / tm.attempts : 0;
    const streakBonus = Math.min(tm.currentStreak * 10, 30);
    tm.score = Math.round(accuracy * 70 + streakBonus);

    // Update mastery level (Khan Academy style)
    // Level up on 2 correct in a row, level down on 2 wrong in a row
    if (tm.currentStreak >= 2) {
      if (tm.level === 'not_started') tm.level = 'familiar';
      else if (tm.level === 'familiar') tm.level = 'proficient';
      else if (tm.level === 'proficient') tm.level = 'mastered';
    } else if (tm.attempts >= 2 && tm.currentStreak === 0 && tm.attempts - tm.correct >= 2) {
      if (tm.level === 'mastered') tm.level = 'proficient';
      else if (tm.level === 'proficient') tm.level = 'familiar';
    }

    // Update scaffold level based on mastery
    if (tm.level === 'mastered') tm.scaffoldLevel = 1;
    else if (tm.level === 'proficient') tm.scaffoldLevel = 2;
    else tm.scaffoldLevel = 3;
  }

  /**
   * Update daily streak.
   */
  private updateDailyStreak(): void {
    if (!this.profile) return;
    const today = new Date().toISOString().split('T')[0];

    if (this.profile.lastPracticeDate === null) {
      this.profile.dailyStreak = 1;
    } else {
      const last = this.profile.lastPracticeDate;
      const lastDate = new Date(last);
      const todayDate = new Date(today);
      const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        // Same day — no change to streak
      } else if (diffDays === 1) {
        // Consecutive day — increment streak
        this.profile.dailyStreak++;
      } else {
        // Gap — reset streak
        this.profile.dailyStreak = 1;
      }
    }

    this.profile.lastPracticeDate = today;
  }

  /**
   * Generate insights for the student.
   */
  getInsights(): Insight[] {
    if (!this.profile) return [];
    const insights: Insight[] = [];

    // Find strengths (topics with high accuracy)
    const topicList = Object.values(this.profile.topics);
    for (const tm of topicList) {
      if (tm.attempts >= 3 && tm.correct / tm.attempts >= 0.8) {
        insights.push({
          type: 'strength',
          topic: tm.topic,
          message: `Great job with ${tm.topic}! You're getting ${Math.round((tm.correct / tm.attempts) * 100)}% correct!`,
          severity: 1,
        });
      }
    }

    // Find weaknesses (topics with low accuracy)
    for (const tm of topicList) {
      if (tm.attempts >= 3 && tm.correct / tm.attempts < 0.5) {
        const topError = Object.entries(tm.errorPatterns).sort((a, b) => b[1] - a[1])[0];
        const errorDesc = topError ? topError[0].replace(/_/g, ' ') : 'this topic';
        insights.push({
          type: 'weakness',
          topic: tm.topic,
          message: `${tm.topic} needs work. Common issue: ${errorDesc}. Let's practice more!`,
          severity: 3,
        });
      }
    }

    // Check for reviews due
    const dueReviews = SpacedRepetition.getDueReviews(this.profile.topics);
    if (dueReviews.length > 0) {
      insights.push({
        type: 'review_due',
        topic: dueReviews[0].topic,
        message: `${dueReviews.length} topic${dueReviews.length > 1 ? 's' : ''} due for review. Spaced practice helps you remember!`,
        severity: 2,
      });
    }

    // Streak milestones
    if (this.profile.currentStreak >= 5) {
      insights.push({
        type: 'streak',
        message: `${this.profile.currentStreak} correct in a row! You're on fire! 🔥`,
        severity: 2,
      });
    }

    if (this.profile.dailyStreak >= 3) {
      insights.push({
        type: 'streak',
        message: `${this.profile.dailyStreak} day streak! Keep practicing daily! 📅`,
        severity: 1,
      });
    }

    // Sort by severity (highest first)
    insights.sort((a, b) => b.severity - a.severity);
    return insights;
  }

  /**
   * Get topics due for review.
   */
  getDueReviews(): ReviewItem[] {
    if (!this.profile) return [];
    return SpacedRepetition.getDueReviews(this.profile.topics);
  }

  /**
   * Get mastery for a specific topic.
   */
  getTopicMastery(topic: string, subject: string): TopicMastery | null {
    if (!this.profile) return null;
    return this.profile.topics[this.topicKey(topic, subject)] || null;
  }

  /**
   * Get scaffold level for a topic (3=full, 2=partial, 1=abstract).
   */
  getScaffoldLevel(topic: string, subject: string): number {
    const tm = this.getTopicMastery(topic, subject);
    return tm ? tm.scaffoldLevel : 3;
  }

  /**
   * Get all mastered topics.
   */
  getMasteredTopics(): TopicMastery[] {
    if (!this.profile) return [];
    return Object.values(this.profile.topics).filter(t => t.level === 'mastered');
  }

  /**
   * Get total mastery score across all topics.
   */
  getTotalMasteryScore(): number {
    if (!this.profile) return 0;
    const topics = Object.values(this.profile.topics);
    if (topics.length === 0) return 0;
    return Math.round(topics.reduce((sum, t) => sum + t.score, 0) / topics.length);
  }

  /**
   * Add a badge if not already earned.
   */
  addBadge(badgeId: string): boolean {
    if (!this.profile) return false;
    if (this.profile.badges.includes(badgeId)) return false;
    this.profile.badges.push(badgeId);
    ProgressStore.save(this.profile);
    return true;
  }

  /**
   * Get all earned badges.
   */
  getBadges(): string[] {
    return this.profile ? this.profile.badges : [];
  }

  /**
   * Reset all progress (for testing).
   */
  reset(): void {
    ProgressStore.clear();
    this.profile = null;
  }

  /**
   * Generate a topic key for the topics map.
   */
  private topicKey(topic: string, subject: string): string {
    return `${subject}:${topic}`;
  }
}
