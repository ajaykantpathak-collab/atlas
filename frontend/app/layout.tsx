import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import QueryClientWrapper from "@/components/QueryClientWrapper";
import ErrorInit from "@/components/providers/ErrorInit";
import IntlProviderBridge from "@/components/providers/IntlProviderBridge";

// Define --font-inter app-wide: tailwind's `font-sans` and every explicit
// 'Plus Jakarta Sans' reference resolve through this variable. Without it the
// var() made font-family declarations invalid at computed-value time and all
// student pages inherited the browser's default SERIF font.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const dynamic = "force-dynamic";

// PWA viewport: theme color matches the manifest (#0a0a0f) and
// viewport-fit=cover lets standalone mode paint the whole notched screen —
// safe-area padding is applied via the .sticky.top-0 / safe-* rules in
// globals.css. The service worker is NOT registered here: registration lives
// in the student/premium layouts (components/pwa/PWAProvider).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0f",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  // `default` covers the landing page and any route without its own title;
  // `template` turns each surface's metadata title into "<Surface> | Atlas"
  // so every route reports what it actually is (P5 audit: layout-uniform
  // titles). Child surfaces that need a full custom title use `absolute`.
  title: {
    default: "Atlas — Every answer verified, never guessed | CBSE",
    template: "%s | Atlas",
  },
  description:
    "Atlas maps your entire syllabus as a living galaxy — interactive simulations, verified step-by-step solutions, per-concept mastery and board-pattern exams for Classes 1–12 across CBSE.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // SSR always renders EN; the stored EN/हिंदी preference is applied
  // client-side by IntlProviderBridge (LanguageProvider effect) with no
  // hydration drift. Chrome strings translate; authored corpus content
  // stays in its authored language.
  return (
    <html lang="en" className={`dark ${jakarta.variable}`}>
      <body className="min-h-screen bg-[#0a0a0f] text-slate-100 font-sans">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <IntlProviderBridge>
          <QueryClientWrapper>{children}</QueryClientWrapper>
          {/* MON-01 lite: client error reporting (deduped, throttled) */}
          <ErrorInit />
        </IntlProviderBridge>
      </body>
    </html>
  );
}
