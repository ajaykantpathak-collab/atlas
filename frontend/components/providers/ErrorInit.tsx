'use client'

/**
 * ErrorInit — mounts window.onerror + unhandledrejection reporting once.
 * Errors POST to /api/progress/client-error → activity_log, so real-user
 * crashes are visible instead of silent.
 */
import { useEffect } from 'react'
import { initErrorReporting } from '@/lib/errorReporter'

export default function ErrorInit() {
  useEffect(() => {
    initErrorReporting()
  }, [])
  return null
}
