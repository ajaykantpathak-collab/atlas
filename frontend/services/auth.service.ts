import { api } from '@/lib/api'
import type { User } from '@/types'

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  name: string
  email: string
  password: string
  role: 'student' | 'teacher' | 'parent' | 'admin'
  board?: 'CBSE' | 'CISCE'
  classLevel?: number
}

export interface TokenResponse {
  access_token: string
  token_type: string
  user: User
}

export const authService = {
  login: (data: LoginRequest) =>
    api.post<TokenResponse>('/api/auth/login', data),

  signup: (data: SignupRequest) =>
    api.post<TokenResponse>('/api/auth/signup', data),

  getProfile: () =>
    api.get<User>('/api/auth/me'),

  updateProfile: (data: Partial<User>) =>
    api.patch<User>('/api/auth/me', data),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.post<{ success: boolean }>('/api/auth/change-password', data),

  logout: () =>
    api.post<{ success: boolean }>('/api/auth/logout'),
}
