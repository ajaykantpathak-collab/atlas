import { api } from '@/lib/api'

export interface AchievementSchema {
  id: string
  achievementId: string
  title: string
  description: string
  iconName: string
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  xpReward: number
  unlocked: boolean
  unlockedAt?: string
  progress?: number
  maxProgress?: number
}

export interface AchievementListResponse {
  achievements: AchievementSchema[]
  unlockedCount: number
  totalXp: number
}

export const achievementService = {
  getAchievements: (filter?: 'all' | 'unlocked' | 'locked') =>
    api.get<AchievementListResponse>(
      `/api/achievements${filter ? `?filter=${filter}` : ''}`
    ),

  getAchievement: (achievementId: string) =>
    api.get<AchievementSchema>(`/api/achievements/${achievementId}`),

  getStats: () =>
    api.get<{ unlockedCount: number; totalXp: number; completionPercentage: number }>(
      '/api/achievements/stats'
    ),
}
