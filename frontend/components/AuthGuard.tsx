'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore, type UserRole } from '@/stores/authStore'

interface AuthGuardProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
  redirectTo?: string
}

/**
 * Auth guard component.
 * Redirects to login if not authenticated.
 * If allowedRoles is provided, redirects if user role doesn't match.
 */
export default function AuthGuard({
  children,
  allowedRoles,
  redirectTo = '/login',
}: AuthGuardProps) {
  const router = useRouter()
  const { user, token, isAuthenticated } = useAuthStore()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    // Check if authenticated (from store or localStorage token)
    const hasToken = token || (typeof window !== 'undefined' && localStorage.getItem('token'))
    
    if (!hasToken && !isAuthenticated) {
      router.push(redirectTo)
      return
    }

    // Check role if allowedRoles is specified
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      // Redirect to user's appropriate dashboard
      const roleRedirects: Record<UserRole, string> = {
        student: '/socratic-tutor',
        teacher: '/teacher-portal',
        parent: '/parent-portal',
        admin: '/admin-dashboard',
      }
      router.push(roleRedirects[user.role] || redirectTo)
      return
    }

    setChecked(true)
  }, [router, user, token, isAuthenticated, allowedRoles, redirectTo])

  if (!checked) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
