import { Skeleton, SkeletonGrid } from '@/components/common/Skeleton'

/**
 * Route-group loading boundary for every student route.
 *
 * Before this, the app shipped ZERO loading.tsx files across 95 routes and no
 * Suspense boundary in the student layout, so any navigation that had to fetch
 * rendered a blank screen until the data arrived. On a slow school connection
 * that reads as a broken app.
 *
 * Next.js renders this immediately on navigation, so it covers all child routes
 * without touching each page. It is deliberately neutral — a skeleton that
 * guesses the content would flash the wrong layout (the "measured-zero vs
 * no-data" problem in visual form).
 */
export default function StudentLoading() {
  return (
    <div
      className="min-h-screen px-4 py-6 sm:px-6"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <span className="sr-only">Loading…</span>

      {/* Page heading */}
      <Skeleton className="h-8 w-56" />
      <Skeleton className="mt-3 h-4 w-80" />

      {/* Primary stat / hero row */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-5">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="mt-3 h-7 w-16" />
          </div>
        ))}
      </div>

      {/* Content cards */}
      <div className="mt-6">
        <SkeletonGrid count={4} />
      </div>

      {/* Secondary content */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-4 h-3 w-full" />
            <Skeleton className="mt-2 h-3 w-5/6" />
            <Skeleton className="mt-2 h-3 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  )
}
