/**
 * Live backend contracts for the student dashboards.
 * Every field mirrors what the running API on :8001 actually returns
 * (verified against /openapi.json and live curl responses) — no invented data.
 */

/** GET /api/progress/mastery → SubjectMasterySchema[] */
export interface SubjectMastery {
  subject: string;
  totalNodes?: number;
  masteredNodes?: number;
  learningNodes?: number;
  notStartedNodes?: number;
  masteryPercentage?: number;
  weeklyChange?: number;
}

/** GET /api/progress/overview → ProgressOverviewSchema */
export interface ProgressOverview {
  totalNodes?: number;
  masteredNodes?: number;
  studyTimeHours?: number;
  avgMastery?: number;
  subjects?: SubjectMastery[];
}

/** GET /api/progress/activity?limit= → ActivitySchema[] */
export interface ActivityItem {
  id: string;
  activityType: string;
  title: string;
  subject?: string | null;
  score?: string | null;
  time: string;
}

/** GET /api/progress/weekly-activity → WeeklyActivitySchema[] */
export interface WeeklyActivityDay {
  day: string;
  value?: number;
}

/** DashboardSchema.recommendedLessons[] — GET /api/progress/dashboard */
export interface RecommendedLesson {
  node_id: string;
  subject?: string;
  topic?: string;
  chapter?: string;
  progress?: number;
  difficulty?: string;
  estimated_time?: number;
  icon?: string;
}

/** DashboardSchema.user — UserInfo */
export interface DashboardUser {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  board?: string;
  class_level?: number;
  total_xp?: number;
  current_level?: number;
  streak_days?: number;
}

/** GET /api/progress/dashboard → DashboardSchema */
export interface DashboardData {
  user?: DashboardUser;
  totalXp?: number;
  level?: number;
  levelXp?: number;
  levelMax?: number;
  streak?: number;
  recommendedLessons?: RecommendedLesson[];
  masterySubjects?: SubjectMastery[];
  recentActivity?: ActivityItem[];
}

/** GET /api/achievements/ → AchievementSchema (inside AchievementListResponse) */
export interface Achievement {
  id: string;
  achievementId?: string;
  title: string;
  description: string;
  iconName?: string;
  icon?: string | null;
  tier?: string;
  xpReward?: number;
  unlocked?: boolean;
  unlockedAt?: string | null;
  progress?: number | null;
  maxProgress?: number | null;
}

/** GET /api/achievements/ → AchievementListResponse */
export interface AchievementListResponse {
  achievements?: Achievement[];
  items?: Achievement[];
  unlockedCount?: number;
  totalXp?: number;
}
