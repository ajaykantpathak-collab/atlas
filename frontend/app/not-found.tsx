import Link from 'next/link'

/**
 * Global 404.
 *
 * The app had zero not-found.tsx files, so any mistyped or retired URL rendered
 * Next's bare default page — which looks broken rather than designed, and gives
 * a dead end with no way back into the app.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-6xl font-bold text-brand-300/80">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-white">
        This page isn&apos;t here
      </h1>
      <p className="mt-2 max-w-md text-sm text-white/60">
        The link may be old, or the page may have moved. Everything you have
        started is still saved.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/dashboard"
          className="rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-400 transition-colors"
        >
          Go to my dashboard
        </Link>
        <Link
          href="/learn"
          className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 transition-colors"
        >
          Browse lessons
        </Link>
      </div>
    </div>
  )
}
