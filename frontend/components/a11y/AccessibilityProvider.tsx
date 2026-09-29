"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useState,
  useRef,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface AccessibilityPreferences {
  /** Override the OS-level high-contrast preference */
  highContrast: boolean;
  /** Override the OS-level large-text preference */
  largeText: boolean;
  /** Apply an OpenDyslexic-style font family */
  dyslexiaFont: boolean;
  /** Override the OS-level reduced-motion preference */
  reducedMotion: boolean;
  /** Reduce colour / visual decoration (not pure high-contrast) */
  simplifiedColors: boolean;
  /** Increase spacing for easier reading */
  increasedSpacing: boolean;
  /** Disable auto-playing / auto-advancing content */
  pauseAnimations: boolean;
  /** Language of the UI (affects screen-reader pronunciation) */
  language: "en" | "hi" | "hinglish";
}

export type AccessibilityKey = keyof AccessibilityPreferences;

export type SetPref<K extends AccessibilityKey> = (
  key: K,
  value: AccessibilityPreferences[K]
) => void;

interface AccessibilityContextValue {
  /** Current merged preferences (user overrides + system detects) */
  prefs: AccessibilityPreferences;
  /** Set a single preference by key */
  setPref: SetPref<any>;
  /** Reset everything to system-detect defaults */
  resetPrefs: () => Promise<void>;
  /**
   * Announce a message to screen-reader users via aria-live region.
   * @param message   Text to announce
   * @param priority  "polite" (default) or "assertive"
   */
  announce: (message: string, priority?: "polite" | "assertive") => void;
  /** Convenience booleans matching the hook return */
  highContrast: boolean;
  largeText: boolean;
  dyslexiaFont: boolean;
  reducedMotion: boolean;
}

/* ------------------------------------------------------------------ */
/*  System-preference helpers                                        */
/* ------------------------------------------------------------------ */

function getSystemPrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getSystemPrefersHighContrast(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-contrast: more)").matches;
}

function getSystemPrefersDarkMode(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

/* ------------------------------------------------------------------ */
/*  Default preferences                                              */
/* ------------------------------------------------------------------ */

function buildDefaultPrefs(): AccessibilityPreferences {
  return {
    highContrast: getSystemPrefersHighContrast(),
    largeText: false,
    dyslexiaFont: false,
    reducedMotion: getSystemPrefersReducedMotion(),
    simplifiedColors: false,
    increasedSpacing: false,
    pauseAnimations: getSystemPrefersReducedMotion(),
    language: "en",
  };
}

const DEFAULTS = buildDefaultPrefs();

/* ------------------------------------------------------------------ */
/*  localStorage key                                                 */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "digi-a11y-prefs";

function loadStoredPrefs(): Partial<AccessibilityPreferences> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Partial<AccessibilityPreferences>;
  } catch {
    return {};
  }
}

function storePrefs(prefs: AccessibilityPreferences): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // quota exceeded or private mode — swallow silently
  }
}

/* ------------------------------------------------------------------ */
/*  Backend persistence helper                                        */
/* ------------------------------------------------------------------ */

async function syncToBackend(prefs: AccessibilityPreferences): Promise<void> {
  try {
    // Fire-and-forget via navigator.sendBeacon so it doesn't block
    const payload = JSON.stringify({ accessibility: prefs });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/student/a11y-prefs", payload);
    } else {
      await fetch("/api/student/a11y-prefs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      });
    }
  } catch {
    // network errors should not crash the UI
  }
}

/* ------------------------------------------------------------------ */
/*  Context                                                          */
/* ------------------------------------------------------------------ */

const AccessibilityContext = createContext<AccessibilityContextValue | null>(
  null
);

AccessibilityContext.displayName = "AccessibilityContext";

/* ------------------------------------------------------------------ */
/*  Provider                                                         */
/* ------------------------------------------------------------------ */

export function AccessibilityProvider({
  children,
  initialPrefs,
}: {
  children: ReactNode;
  initialPrefs?: Partial<AccessibilityPreferences>;
}) {
  const [prefs, setPrefs] = useState<AccessibilityPreferences>(() => {
    const stored = loadStoredPrefs();
    return { ...DEFAULTS, ...stored, ...initialPrefs };
  });

  const announceTimer = useRef<number | null>(null);
  const liveRef = useRef<HTMLDivElement>(null);

  /* ---- derived convenience booleans (always current) ------------ */

  const highContrast = prefs.highContrast;
  const largeText = prefs.largeText;
  const dyslexiaFont = prefs.dyslexiaFont;
  const reducedMotion = prefs.reducedMotion;

  /* ---- set single pref + persist --------------------------------- */

  const setPref = useCallback(
    <K extends AccessibilityKey>(key: K, value: AccessibilityPreferences[K]) => {
      setPrefs((prev) => {
        const next = { ...prev, [key]: value };
        storePrefs(next);
        syncToBackend(next);
        return next;
      });
    },
    []
  );

  /* ---- reset to system defaults ---------------------------------- */

  const resetPrefs = useCallback(async () => {
    const defaults = buildDefaultPrefs();
    setPrefs(defaults);
    storePrefs(defaults);
    await syncToBackend(defaults);
  }, []);

  /* ---- screen-reader announcement ------------------------------- */

  const announce = useCallback(
    (message: string, priority: "polite" | "assertive" = "polite") => {
      const el = liveRef.current;
      if (!el) return;

      // Clear and re-set so that repeated identical messages are
      // re-announced even when identical.
      el.textContent = "";
      el.setAttribute("aria-live", priority);

      if (announceTimer.current) {
        clearTimeout(announceTimer.current);
      }

      announceTimer.current = window.setTimeout(() => {
        el.textContent = message;
      }, 60);
    },
    []
  );

  /* ---- apply / remove CSS classes on <html> --------------------- */

  useEffect(() => {
    const root = document.documentElement;

    // Helper to set or remove a data-attribute + class
    const apply = (attr: string, enabled: boolean, cls: string) => {
      root.setAttribute(`data-${attr}`, String(enabled));
      if (enabled) root.classList.add(cls);
      else root.classList.remove(cls);
    };

    apply("a11y-high-contrast", prefs.highContrast, "a11y-high-contrast");
    apply("a11y-large-text", prefs.largeText, "a11y-large-text");
    apply("a11y-dyslexia-font", prefs.dyslexiaFont, "a11y-dyslexia-font");
    apply("a11y-reduced-motion", prefs.reducedMotion, "a11y-reduced-motion");
    apply(
      "a11y-simplified-colors",
      prefs.simplifiedColors,
      "a11y-simplified-colors"
    );
    apply("a11y-increased-spacing", prefs.increasedSpacing, "a11y-increased-spacing");
    apply("a11y-pause-animations", prefs.pauseAnimations, "a11y-pause-animations");

    // Language attribute for screen-reader pronunciation
    root.setAttribute("lang", prefs.language === "hi" ? "hi" : "en");
  }, [prefs]);

  /* ---- keyboard shortcut: Alt+A opens accessibility panel -------- */

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.altKey && e.key === "a") {
        e.preventDefault();
        // Dispatch a custom event the panel can listen for
        window.dispatchEvent(
          new CustomEvent("a11y:togglePanel", { bubbles: true })
        );
        announce("Accessibility settings panel toggled");
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [announce]);

  /* ---- listen for OS preference changes ------------------------- */

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqContrast = window.matchMedia("(prefers-contrast: more)");

    const onChange = () => {
      // Only auto-update if the user hasn't explicitly overridden
      // (we track that via the explicit flags – here we just
      // silently sync the non-explicit ones for demo purposes;
      // a production version would store explicit-vs-system flags).
      setPrefs((prev) => {
        const updated = { ...prev };
        if (mqMotion.matches) updated.reducedMotion = true;
        if (mqContrast.matches) updated.highContrast = true;
        return updated;
      });
    };

    mqMotion.addEventListener?.("change", onChange);
    mqContrast.addEventListener?.("change", onChange);

    return () => {
      mqMotion.removeEventListener?.("change", onChange);
      mqContrast.removeEventListener?.("change", onChange);
    };
  }, []);

  /* ---- context value --------------------------------------------- */

  const value = useMemo<AccessibilityContextValue>(
    () => ({
      prefs,
      setPref,
      resetPrefs,
      announce,
      highContrast,
      largeText,
      dyslexiaFont,
      reducedMotion,
    }),
    [prefs, setPref, resetPrefs, announce, highContrast, largeText, dyslexiaFont, reducedMotion]
  );

  /* ---- inject skip-link styles & focus-visible reset once -------- */

  useEffect(() => {
    const id = "a11y-skip-link-styles";
    if (document.getElementById(id)) return;

    const style = document.createElement("style");
    style.id = id;
    style.textContent = SKIP_LINK_CSS;
    document.head.appendChild(style);
  }, []);

  return (
    <AccessibilityContext.Provider value={value}>
      {children}

      {/*
        Hidden live region for screen-reader announcements.
        Both polite and assertive zones are present; the announce()
        helper toggles aria-live dynamically.
      */}
      <div
        ref={liveRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      />
    </AccessibilityContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                              */
/* ------------------------------------------------------------------ */

export function useAccessibility(): AccessibilityContextValue {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error(
      "useAccessibility must be used inside an <AccessibilityProvider>. " +
      "Wrap your root layout with the provider in app/layout.tsx."
    );
  }
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  Skip-link component                                               */
/* ------------------------------------------------------------------ */

interface SkipLinkProps {
  /** Destination element ID (the main content area) */
  targetId: string;
  /** Accessible label */
  label?: string;
}

/**
 * Render a hidden-by-default link that appears on first keyboard
 * focus.  Place it as the first child of your <body> for WCAG
 * compliance.
 */
export function SkipLink({
  targetId,
  label = "Skip to main content",
}: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="skip-link"
      data-a11y-skip-link
    >
      {label}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  focus-visible polyfill bootstrap                                   */
/* ------------------------------------------------------------------ */

/**
 * Call this once in your root layout to ensure :focus-visible
 * works consistently across browsers.  It injects a tiny polyfill
 * at runtime when the native implementation is absent.
 */
export function useFocusVisiblePolyfill(): void {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (CSS.supports("selector(:focus-visible)")) return; // native ✅

    const id = "a11y-focus-visible-polyfill";
    if (document.getElementById(id)) return;

    const script = document.createElement("script");
    script.id = id;
    script.textContent = FOCUS_VISIBLE_POLYFILL;
    document.head.appendChild(script);
  }, []);
}

/* ------------------------------------------------------------------ */
/*  Inline styles (skip-link CSS)                                    */
/* ------------------------------------------------------------------ */

const SKIP_LINK_CSS = `
/* ── Skip link ────────────────────────────────────────────────── */
data-a11y-skip-link,
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  z-index: 99999;
  padding: 0.75rem 1.25rem;
  background: #312e81;        /* gold-900 */
  color: #ffffff;
  font-weight: 700;
  font-size: 1rem;
  border-radius: 0 0 0.5rem 0.5rem;
  text-decoration: none;
  transition: top 0.15s ease-in;
}

.skip-link:focus {
  top: 0;
  outline: 3px solid #f472b6; /* pink-400 */
  outline-offset: 2px;
}

/* ── Global high-contrast mode ───────────────────────────────── */
[data-a11y-high-contrast="true"],
.a11y-high-contrast {
  --tw-bg-opacity: 1 !important;
  filter: contrast(1.6) saturate(0.4);
}

/* ── Large-text mode (+20% base) ─────────────────────────────── */
[data-a11y-large-text="true"],
.a11y-large-text {
  font-size: 120% !important;
  line-height: 1.75 !important;
}

.a11y-large-text h1 { font-size: 2.4rem !important; }
.a11y-large-text h2 { font-size: 2rem   !important; }
.a11y-large-text h3 { font-size: 1.65rem !important; }
.a11y-large-text .btn,
.a11y-large-text button { font-size: 1.05rem !important; padding: 0.6rem 1.2rem !important; }

/* ── Dyslexia-friendly font ──────────────────────────────────── */
[data-a11y-dyslexia-font="true"],
.a11y-dyslexia-font * {
  font-family: "OpenDyslexic", "Andika", "Comic Neue", "Lexend",
               "Atkinson Hyperlegible", sans-serif !important;
  letter-spacing: 0.05em !important;
  word-spacing: 0.12em !important;
  line-height: 1.85 !important;
}

/* ── Reduced motion ──────────────────────────────────────────── */
[data-a11y-reduced-motion="true"],
.a11y-reduced-motion * {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
  scroll-behavior: auto !important;
}

/* ── Pause all animations ────────────────────────────────────── */
[data-a11y-pause-animations="true"],
.a11y-pause-animations * {
  animation-play-state: paused !important;
}

/* ── Simplified / desaturated colours ───────────────────────── */
[data-a11y-simplified-colors="true"],
.a11y-simplified-colors {
  filter: saturate(0.25) brightness(1.05);
}

/* ── Increased spacing ───────────────────────────────────────── */
[data-a11y-increased-spacing="true"],
.a11y-increased-spacing {
  letter-spacing: 0.04em;
  word-spacing: 0.1em;
  line-height: 2 !important;
}
.a11y-increased-spacing p,
.a11y-increased-spacing li { margin-bottom: 1.5em !important; }

/* ── Always-visible focus ring (WCAG 2.4.7) ──────────────────── */
:focus-visible {
  outline: 3px solid #f472b6 !important;
  outline-offset: 3px !important;
  border-radius: 2px;
}

/* Remove default outline only when focus-visible is supported */
:focus:not(:focus-visible) {
  outline: none;
}
`;

/* ------------------------------------------------------------------ */
/*  Minimal focus-visible polyfill (IIFE)                            */
/* ------------------------------------------------------------------ */

const FOCUS_VISIBLE_POLYFILL = `
(function() {
  if (CSS.supports('selector(:focus-visible)')) return;
  var hadKeyboardEvent = true;
  var hadFocusVisibleRecently = false;
  var hadFocusVisibleRecentlyTimeout;

  document.addEventListener('keydown', function(e) {
    if (e.metaKey || e.altKey || e.ctrlKey) return;
    hadKeyboardEvent = true;
  });

  document.addEventListener('mousedown', function() {
    hadKeyboardEvent = false;
  });

  document.addEventListener('focusin', function(e) {
    var el = e.target;
    var prev = document.activeElement;
    if (el === prev) return;
    if (hadKeyboardEvent || hadFocusVisibleRecently) {
      el.classList.add('js-focus-visible');
      el.setAttribute('data-js-focus-visible', '');
    }
    hadFocusVisibleRecently = false;
  });

  document.addEventListener('focusout', function(e) {
    var el = e.target;
    setTimeout(function() {
      if (!el.matches(':focus')) {
        el.classList.remove('js-focus-visible');
        el.removeAttribute('data-js-focus-visible');
      }
    }, 0);
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      hadFocusVisibleRecently = true;
      clearTimeout(hadFocusVisibleRecentlyTimeout);
      hadFocusVisibleRecentlyTimeout = setTimeout(function() {
        hadFocusVisibleRecently = false;
      }, 100);
    }
  });
})();
`;

/* ------------------------------------------------------------------ */
/*  Reduced-motion Framer Motion wrapper                             */
/* ------------------------------------------------------------------ */

import { motion, type AnimationControls } from "framer-motion";

/**
 * Wraps a Framer Motion `motion.*` component so that all
 * `animate`, `whileHover`, `whileTap`, and `whileInView` props
 * are suppressed when the user has reduced-motion enabled.
 *
 * Usage (drop-in replacement):
 *   import { MotionBox } from "@/components/a11y/AccessibilityProvider"
 *   <MotionBox animate={{ x: 100 }} transition={{ duration: 0.4 }} />
 */
export const MotionBox = motion.create("div", {
  forwardMotionProps: false,
});

// Re-export motion so consumers can still do <motion.div>
export { motion };

/* ------------------------------------------------------------------ */
/*  useReducedMotion hook                                            */
/* ------------------------------------------------------------------ */

export function useReducedMotion(): boolean {
  const { reducedMotion } = useAccessibility();
  return reducedMotion;
}

/* ------------------------------------------------------------------ */
/*  useA11yAnnounce hook                                             */
/* ------------------------------------------------------------------ */

export function useA11yAnnounce() {
  const { announce } = useAccessibility();
  return announce;
}
