export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "parent" | "admin";
  avatar?: string;
  classLevel?: number;
  board?: "CBSE" | "CISCE";
  subjects?: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface KnowledgeNode {
  id: string;
  label: string;
  description: string;
  subject: string;
  classLevel: number;
  chapter: string;
  nodeType: "story" | "poem" | "grammar" | "vocabulary" | "writing" | "speaking" | "info";
  simplifiedContent?: string;
  prerequisites?: string[];
  forwardNodes?: string[];
  masteryProbability?: number;
  x?: number;
  y?: number;
  z?: number;
  size?: number;
}

export interface KnowledgeLink {
  source: string;
  target: string;
  type: "prerequisite" | "related" | "forward";
}

export interface EnrichedNode extends KnowledgeNode {
  pronunciationGuide?: string;
  listenRepeatExercises?: string[];
  readingLevel?: string;
  engagementHooks?: string[];
  bilingualGlossary?: Record<string, { en: string; hi: string }>;
  glossaryInline?: { term: string; meaning: string }[];
  commonMistakes?: { mistake: string; correction: string; example: string }[];
  faq?: { question: string; answer: string }[];
  keywords?: string[];
  speakingRubric?: { fluency: string; clarity: string; expression: string; confidence: string };
  quickSummary?: string;
  textBreakdown?: string;
  examPitfalls?: { type: string; description: string }[];
  crossClassPrerequisites?: string[];
  hookNarrative?: string;
  learningLadder?: { level: string; question: string; answer: string }[];
  modelAnswer?: { question: string; answer: string; marks: number; markingScheme: string }[];
  extractPractice?: { extract: string; questions: { question: string; answer: string; marks: number }[] }[];
  selfAssessment?: { question: string; options: string[]; correct: string; explanation: string }[];
  crossChapterLink?: { concept: string; connections: { chapter: string; link: string }[] };
  retrievalPractice?: { timing: string; question: string; answer: string }[];
  writingTemplate?: string;
  trailConnection?: { from: string; to: string; skill: string };
  assertionReasonPractice?: { assertion: string; reason: string; answer: string; explanation: string }[];
  paradoxAnalysis?: string;
  poemAnalysisDeep?: {
    title?: string;
    poet?: string;
    form?: string;
    rhymeScheme?: string;
    meter?: string;
    structure?: string;
    devices?: { device: string; example: string; effect: string }[];
    toneProgression?: string;
    themeSynthesis?: string;
  };
  markingPrecision?: { marks: number; breakdown: { component: string; marks: number }[] }[];
}

export interface QuizQuestion {
  id: string;
  nodeId: string;
  question: string;
  type: "mcq" | "short" | "long" | "extract" | "competency";
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  marks: number;
  markingScheme?: string;
}

export interface ReviewItem {
  nodeId: string;
  conceptName: string;
  easinessFactor: number;
  interval: number;
  repetitions: number;
  lastReviewDate: string;
  nextReviewDate: string;
  reviewHistory: { date: string; quality: number; responseTime: number }[];
}

export interface BKTState {
  pKnown: number;
  pTransit: number;
  pSlip: number;
  pGuess: number;
}

export interface ExamConfiguration {
  examId: string;
  board: "CBSE" | "CISCE";
  classLevel: number;
  subject: string;
  duration: number;
  totalMarks: number;
  sections: ExamSection[];
  instructions: string[];
}

export interface ExamSection {
  sectionId: string;
  title: string;
  marks: number;
  questionCount: number;
  questionType: "mcq" | "short" | "long" | "extract" | "competency";
  instructions: string;
  questions: ExamQuestion[];
}

export interface ExamQuestion {
  id: string;
  question: string;
  options?: string[];
  marks: number;
  type: "mcq" | "short" | "long" | "extract" | "competency";
}

export interface ExamResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  timeTaken: number;
  sectionWise: { sectionId: string; score: number; maxScore: number }[];
  topicWise: { nodeId: string; conceptName: string; correct: number; total: number }[];
  weaknessAreas: { nodeId: string; conceptName: string; masteryProbability: number; recommendedAction: string }[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  unlocked: boolean;
  unlockedDate?: string;
}

export interface SubjectPortfolio {
  subject: string;
  conceptsMastered: number;
  totalConcepts: number;
  masteryLevel: "beginner" | "developing" | "proficient" | "advanced" | "expert";
  learningVelocity: number;
  retentionRate: number;
}

export interface MasteryPortfolio {
  studentId: string;
  studentName: string;
  classLevel: number;
  academicYear: string;
  subjects: SubjectPortfolio[];
  achievements: Achievement[];
  bestAnswers: { questionText: string; studentAnswer: string; marks: number; maxMarks: number; subject: string }[];
}

export interface ParentInsight {
  category: "strength" | "weakness" | "pattern" | "recommendation" | "milestone";
  title: string;
  description: string;
  evidence: string[];
  recommendation: string;
  urgency: "low" | "medium" | "high";
  trend: "improving" | "declining" | "stable";
}

export interface SocraticTurn {
  role: "tutor" | "student";
  content: string;
  type?: "question" | "hint" | "confirmation" | "redirect" | "answer";
  misconceptionDetected?: string;
  prerequisiteGap?: string;
}

export interface BilingualContent {
  en: string;
  hi: string;
  mixed: string;
}

export type LanguageMode = "en" | "hi" | "both";

export interface ContentManifest {
  classes: {
    classLevel: number;
    subjects: {
      subject: string;
      totalNodes: number;
      enrichedNodes: number;
      available: boolean;
    }[];
  }[];
}
