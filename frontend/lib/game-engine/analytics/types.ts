/**
 * Analytics types — data structures for learning analytics
 */

// ─── Per-attempt tracking ────────────────────────────────────

export type ErrorType = 'procedural' | 'conceptual' | 'careless' | 'none';

export interface AttemptRecord {
  /** ISO timestamp */
  timestamp: string;
  /** The question asked */
  question: string;
  /** Subject (maths, science, etc.) */
  subject: string;
  /** Topic key (e.g., 'addition', 'fractions', 'mixing') */
  topic: string;
  /** Student's answer */
  studentAnswer: string;
  /** Correct answer */
  correctAnswer: string;
  /** Whether the answer was correct */
  correct: boolean;
  /** Type of error (if wrong) */
  errorType: ErrorType;
  /** Specific misconception identified */
  misconception?: string;
  /** Time taken in seconds */
  timeTaken: number;
  /** Number of hints used */
  hintsUsed: number;
  /** Whether show-me was used */
  showMeUsed: boolean;
  /** Class level (1-5) */
  classLevel: number;
}

// ─── Per-topic mastery ───────────────────────────────────────

export type MasteryLevel = 'not_started' | 'familiar' | 'proficient' | 'mastered';

export interface TopicMastery {
  topic: string;
  subject: string;
  /** Mastery level */
  level: MasteryLevel;
  /** Mastery score 0-100 */
  score: number;
  /** Total attempts */
  attempts: number;
  /** Correct attempts */
  correct: number;
  /** Current streak of correct answers */
  currentStreak: number;
  /** Best streak */
  bestStreak: number;
  /** Error patterns: map of misconception -> count */
  errorPatterns: Record<string, number>;
  /** Last practiced ISO timestamp */
  lastPracticed: string | null;
  /** Spaced repetition: next review due ISO timestamp */
  nextReviewDue: string | null;
  /** Spaced repetition interval in days */
  reviewInterval: number;
  /** Scaffold level (3=full support, 2=partial, 1=abstract) */
  scaffoldLevel: number;
}

// ─── Student profile ─────────────────────────────────────────

export interface StudentProfile {
  /** Unique student ID */
  studentId: string;
  /** Display name */
  name: string;
  /** Class level (1-5) */
  classLevel: number;
  /** All attempt records */
  attempts: AttemptRecord[];
  /** Per-topic mastery */
  topics: Record<string, TopicMastery>;
  /** Total correct answers */
  totalCorrect: number;
  /** Total wrong answers */
  totalWrong: number;
  /** Current correct-answer streak */
  currentStreak: number;
  /** Best correct-answer streak */
  bestStreak: number;
  /** Daily streak (consecutive days of practice) */
  dailyStreak: number;
  /** Last practice date (ISO date string, no time) */
  lastPracticeDate: string | null;
  /** Badges earned */
  badges: string[];
  /** Created timestamp */
  createdAt: string;
  /** Last updated timestamp */
  updatedAt: string;
}

// ─── Insights ────────────────────────────────────────────────

export interface Insight {
  type: 'strength' | 'weakness' | 'review_due' | 'streak' | 'milestone';
  topic?: string;
  message: string;
  /** Severity 1-3 (3 = most important) */
  severity: number;
}

// ─── Spaced repetition ───────────────────────────────────────

export interface ReviewItem {
  topic: string;
  subject: string;
  /** Days since last review */
  daysOverdue: number;
  /** Current mastery level */
  masteryLevel: MasteryLevel;
}

// ─── Error classification ────────────────────────────────────

export interface ErrorClassification {
  type: ErrorType;
  misconception: string;
  /** Human-readable explanation */
  explanation: string;
}
