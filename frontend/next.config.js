// PWA note (2026-09-19): next-pwa was REMOVED from the build pipeline.
// Its workbox precache SW was the original offender — it cached dead chunk
// hashes and served a stale app (purged via /unregister-sw), and any prod
// build would regenerate public/sw.js over the hand-written worker.
// Atlas now ships a hand-written, versioned service worker at public/sw.js
// (app shell + stale-while-revalidate static/game data + network-first API
// with honest offline fallbacks), registered from the student/premium
// layouts via components/pwa/PWAProvider. Nothing here may inject or
// generate another service worker.
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  reactStrictMode: true,
  // Isolated build dir for parallel sessions: two `next dev`/`next build`
  // processes in this tree (multiple agents share it) trample each other's
  // .next artifacts and randomly 404 existing routes. Set NEXT_DIST_DIR to
  // give a second instance its own build output; unset = default '.next'.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Dockerfile.frontend copies .next/standalone — required or stage 3 fails.
  output: "standalone",
  // Type gate is `npx tsc --noEmit` (passes clean as of the sim-JSON emit
  // refactor — ~80MB of data defs no longer live in the module graph).
  // Kept as a safety net for generated/legacy debt only.
  typescript: { ignoreBuildErrors: true },
  // Canonical routes (Phase 4 product coherence): one experience per URL.
  // Sources verified against app/ — every page below exists (or existed as a
  // duplicate variant) and now funnels into the canonical route. Variants also
  // keep a page-level redirect() stub so they work in dev without a rebuild.
  async redirects() {
    return [
      // Tutor variants → /tutor (the canonical Socratic tutor).
      { source: "/ai-tutor", destination: "/tutor", permanent: false },
      { source: "/socratic-tutor", destination: "/tutor", permanent: false },
      { source: "/competency-tutor", destination: "/tutor", permanent: false },
      { source: "/tutoring", destination: "/tutor", permanent: false },
      // Exam variants → /exam (canonical exam player; attempts live at /exam/[examId]).
      // (/exam-prep is NO LONGER redirected — it is now the Pre-Board Simulator page.)
      { source: "/exam-simulator", destination: "/exam", permanent: false },
      { source: "/exam-simulator/:examId", destination: "/exam/:examId", permanent: false },
      // One Atlas showcase: the design-system preview folds into the real app.
      { source: "/atlas-v2", destination: "/atlas", permanent: false },
      // Legacy junior landing (dead subpage links, static numbers) → /junior.
      { source: "/junior-simple", destination: "/junior", permanent: false },
    ];
  },
  async rewrites() {
    // `fallback` (NOT a flat array): array = afterFiles, which shadows Next's
    // own dynamic app/api/* routes (verified: /api/sims/for-node/[nodeId] etc.
    // never executed — every /api/* call was proxied to FastAPI and 404'd).
    // fallback runs after ALL filesystem routes, so Next handlers win and
    // only unmatched paths proxy to the backend.
    return {
      fallback: [
        {
          source: "/api/:path*",
          // Docker sets INTERNAL_API_URL=http://backend-1:8000; dev default
          // is the local backend on 8001.
          destination: `${process.env.INTERNAL_API_URL || "http://localhost:8001"}/api/:path*`,
        },
      ],
    };
  },
};

module.exports = withNextIntl(nextConfig);
