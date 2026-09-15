import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'student' | 'teacher' | 'parent' | 'admin'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
  board?: 'CBSE' | 'CISCE'
  classLevel?: number
  class_level?: number
  avatarUrl?: string
  total_xp?: number
  streak_days?: number
  current_level?: number
  subject?: string
}

interface AuthState {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean

  login: (email: string, password: string) => Promise<void>
  signup: (data: SignupData) => Promise<void>
  logout: () => void
  setUser: (user: AuthUser) => void
}

interface SignupData {
  name: string
  email: string
  password: string
  role: UserRole
  board?: 'CBSE' | 'CISCE'
  classLevel?: number
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })
          if (!res.ok) throw new Error('Login failed')
          const data = await res.json()
          set({
            user: data.user,
            token: data.access_token || data.token,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch {
          set({ isLoading: false })
          throw new Error('Login failed')
        }
      },

      signup: async (data) => {
        set({ isLoading: true })
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
          if (!res.ok) throw new Error('Signup failed')
          const result = await res.json()
          set({
            user: result.user,
            token: result.access_token || result.token,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch {
          set({ isLoading: false })
          throw new Error('Signup failed')
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
      },

      setUser: (user) => set({ user }),
    }),
    {
      name: 'dream-auth',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
)
