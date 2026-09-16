const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
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
