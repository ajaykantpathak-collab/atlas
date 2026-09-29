"use client";

/**
 * StudentDock — the persistent, pocket-sized navigation every student
 * surface was missing.
 *
 * CHILD-LENS fix ([CHILD-LENS][P3 NO-GLOBAL-NAV]): a child who finished a
 * practice session, or landed on /progress or a lesson, had exactly one way
 * out — the browser Back button (the audit's link inventory for /practice
 * found a single anchor, "Skip to content"). Children don't use Back; they
 * give up. This dock rides above every student route with the places
 * a child actually needs, in child words ("Check-up", not "Diagnostic").
 * Today joined the dock because the daily assembler (/today) had no
 * inbound link anywhere in the app — unreachable ≠ optional.
 *
 * Design constraints honoured here:
 *  - No page owns its chrome, so the dock is a self-contained floating pill
 *    mounted once from app/(student)/layout.tsx — zero layout changes on
 *    the pages themselves.
 *  - /junior keeps its own walled garden (its full-screen world is designed
 *    for the youngest children) and /offline is a kiosk surface — the dock
 *    hides on both via usePathname.
 *  - It stays visible during practice and diagnostics on purpose: the audit
 *    flagged that the diagnostic's only exit was a tiny ✕. An always-present
 *    Home is an honest escape hatch, not a distraction.
 *  - Icons + words both, because pre-readers and Class 6 readers use this.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BookOpen, ClipboardCheck, Home, Sunrise, Target } from "lucide-react";

const DOCK_ITEMS = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/today", label: "Today", icon: Sunrise },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/practice", label: "Practice", icon: Target },
  { href: "/diagnostic", label: "Check-up", icon: ClipboardCheck },
  { href: "/progress", label: "Progress", icon: BarChart3 },
] as const;

/** /junior and /offline are self-contained surfaces; the dock stays out. */
const HIDDEN_PREFIXES = ["/junior", "/offline"];

function isActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") {
    // /dashboard is the home; anything not matching a dock section lands here
    // conceptually, but only mark it active on the page itself.
    return pathname === "/dashboard";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function StudentDock() {
  const pathname = usePathname() ?? "";
  if (HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  return (
    <nav
      aria-label="Quick navigation"
      data-testid="student-dock"
      className="fixed bottom-[calc(0.625rem+env(safe-area-inset-bottom,0px))] left-1/2 z-40 -translate-x-1/2 print:hidden"
    >
      <div className="glass-strong flex items-center gap-0.5 rounded-full border border-white/10 px-1.5 py-1 shadow-[0_8px_30px_rgba(0,0,0,0.45)] sm:gap-1 sm:px-2">
        {DOCK_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex min-w-[3.1rem] flex-col items-center gap-0.5 rounded-full px-2 py-1.5 transition-colors sm:min-w-[3.6rem] ${
                active
                  ? "bg-gold-500/15 text-gold-300"
                  : "text-surface-600 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
              <span className="text-[9px] font-semibold leading-none tracking-wide">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
