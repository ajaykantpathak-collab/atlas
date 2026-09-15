'use client'

import { RouteError } from '@/components/common/RouteErrorBoundary'

export default function PremiumError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <RouteError error={error} reset={reset} />
}
