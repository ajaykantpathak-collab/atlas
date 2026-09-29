'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore, type UserRole } from '@/stores/authStore'

interface AuthGuardProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
  redirectTo?: string
}

/** True when localStorage holds a persisted auth blob with a token. */
function storedAuthHasToken(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const raw = localStorage.getItem('dream-auth')
    return Boolean(raw && JSON.parse(raw)?.state?.token)
  } catch {
    return false
  }
}

/**
 * Auth guard component.
 * Redirects to login if not authenticated.
 * If allowedRoles is provided, redirects if user role doesn't match.
 *
 * The zustand persist store can still be empty on the first render even
 * though `dream-auth` is already in localStorage (late rehydration during
 * Next.js client hydration). Deciding on the bare store state bounced
 * signed-in users to /login right after mount. So the unauthenticated
 * verdict also requires that no persisted auth blob exists.
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
    // Check if authenticated (from store or persisted/localStorage token)
    const hasToken =
      Boolean(token) ||
      isAuthenticated ||
      Boolean(typeof window !== 'undefined' && localStorage.getItem('token')) ||
      storedAuthHasToken()

    if (!hasToken) {
      router.push(redirectTo)
      return
    }

    // Check role if allowedRoles is specified (only when the profile has
    // rehydrated; a mid-hydration user is not a role mismatch).
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      // Redirect to user's appropriate dashboard
      const roleRedirects: Record<UserRole, string> = {
        student: '/tutor',
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
          <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-gold-200 border-t-gold-600 animate-spin" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
