'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'

export default function LogoutPage() {
  const router = useRouter()
  const logout = useAuthStore((s) => s.logout)

  useEffect(() => {
    logout()
    try {
      localStorage.removeItem('dream-auth')
    } catch {
      /* storage unavailable */
    }
    router.replace('/login')
  }, [logout, router])

  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center">
      <p className="text-white/50 text-sm">Signing you out…</p>
    </div>
  )
}
