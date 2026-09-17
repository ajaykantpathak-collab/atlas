const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  // ── Precache hygiene (Phase 5.1, 2026-09-16) ──────────────────────────
  // public/ carries ~4.9GB of on-demand assets: doodle_cards/ is 9,024
  // files / 4.8GB, sims/ is 2,520 files / 75MB, plus rive/ and data/.
  // next-pwa globs ALL of public/ into the SW precache manifest, which
  // (a) made the generated sw.js blow past 500KB (the ">500KB" build
  // warning) and (b) would make a service-worker install try to download
  // ~4.9GB. These trees stay SERVED as-is; they are simply never swept
  // into the precache. ('!noprecache/**/*' is the plugin default, kept.)
  publicExcludes: [
    "!noprecache/**/*",
    "!doodle_cards/**/*",
    "!sims/**/*",
    "!rive/**/*",
    "!data/**/*",
  ],
  // The /sims-v2 route emits a ~2.6MB shared chunk (sim registry + engine,
  // chunks/41779-* in the 2026-09 build). Workbox's default
  // maximumFileSizeToCacheInBytes is 2MB, so that chunk was dropped from
  // the precache with a "exceeds size, not precached" warning on every
  // build. Ship decision: RAISE the ceiling to 5MB so the chunk precaches
  // cleanly and /sims-v2 keeps working offline — a bounded ~2.6MB one-time
  // install cost, versus excluding it and silently losing offline support.
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
});

const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  reactStrictMode: true,
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
      { source: "/exam-prep", destination: "/exam", permanent: false },
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

module.exports = withNextIntl(withPWA(nextConfig));
