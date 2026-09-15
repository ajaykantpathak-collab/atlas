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
  // 11k-module app — full tsc during build OOMs/dies on dev machines.
  // Gate stays: `npx tsc --noEmit` in CI/dev. Legacy master sims are
  // individually marked @ts-nocheck for their pre-existing debt.
  typescript: { ignoreBuildErrors: true },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8001/api/:path*",
      },
    ];
  },
};

module.exports = withNextIntl(withPWA(nextConfig));
