// D:\platform\frontend\lib\theme.ts
// ============================================================================
// COMPREHENSIVE THEME SYSTEM — Design Tokens, Dark/Light, High Contrast,
// Colorblind Palettes, CSS Variables, Zustand Store, Tailwind Integration
// ============================================================================

import { useEffect, useCallback, useMemo, useState, useReducer } from "react";

// ─────────────────────────────────────────────
// 1. DESIGN TOKEN CATEGORIES
// ─────────────────────────────────────────────

export type SpacingKey =
  | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10"
  | "12" | "14" | "16" | "20" | "24" | "28" | "32" | "36" | "40"
  | "48" | "56" | "64" | "72" | "80" | "96";

export type FontSizeKey =
  | "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl"
  | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl";

export type FontWeightKey =
  | "thin" | "light" | "normal" | "medium" | "semibold"
  | "bold" | "extrabold" | "black";

export type LineHeightKey =
  | "none" | "tight" | "snug" | "normal" | "relaxed" | "loose";

export type RadiusKey =
  | "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
  | "full" | "card" | "button" | "input" | "modal";

export type ShadowKey =
  | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "inner";

export type DurationKey =
  | "0" | "75" | "100" | "150" | "200" | "300" | "500"
  | "700" | "1000";

export type EasingKey =
  | "linear" | "in" | "out" | "in-out";

// ─────────────────────────────────────────────
// 2. THEME & PALETTE TYPE DEFINITIONS
// ─────────────────────────────────────────────

export type ThemeMode = "light" | "dark";
export type HighContrast = "off" | "on";
export type ColorblindPalette =
  | "default"
  | "protanopia"
  | "deuteranopia"
  | "tritanopia"
  | "achromatopsia";

export interface ThemeConfig {
  id: ThemeMode;
  label: string;
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    elevated: string;
    overlay: string;
    subtle: string;
  };
  foreground: {
    primary: string;
    secondary: string;
    tertiary: string;
    muted: string;
    inverse: string;
  };
  border: {
    DEFAULT: string;
    subtle: string;
    strong: string;
    focus: string;
  };
  semantic: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  interactive: {
    primary: string;
    primaryHover: string;
    primaryActive: string;
    secondary: string;
    secondaryHover: string;
  };
  brand: {
    indigo: string;
    indigoLight: string;
    indigoDark: string;
    pink: string;
    pinkLight: string;
    pinkDark: string;
    gold: string;
    goldLight: string;
    mint: string;
    mintLight: string;
  };
  chart: {
    c1: string; c2: string; c3: string; c4: string;
    c5: string; c6: string; c7: string; c8: string;
  };
}

export interface ColorblindPaletteConfig {
  id: ColorblindPalette;
  label: string;
  description: string;
  brand: {
    indigo: string;
    indigoLight: string;
    indigoDark: string;
    pink: string;
    pinkLight: string;
    pinkDark: string;
    gold: string;
    goldLight: string;
    mint: string;
    mintLight: string;
  };
  semantic: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  chart: {
    c1: string; c2: string; c3: string; c4: string;
    c5: string; c6: string; c7: string; c8: string;
  };
}

export interface DesignTokens {
  spacing: Record<SpacingKey, string>;
  fontSize: Record<FontSizeKey, string>;
  fontWeight: Record<FontWeightKey, number>;
  lineHeight: Record<LineHeightKey, number>;
  radius: Record<RadiusKey, string>;
  shadow: Record<ShadowKey, string>;
  duration: Record<DurationKey, string>;
  easing: Record<EasingKey, string>;
}

// ─────────────────────────────────────────────
// 3. DESIGN TOKEN CONSTANTS
// ─────────────────────────────────────────────

export const SPACING_TOKENS: Record<SpacingKey, string> = {
  "0": "0px",
  "1": "0.25rem",
  "2": "0.5rem",
  "3": "0.75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "8": "2rem",
  "10": "2.5rem",
  "12": "3rem",
  "14": "3.5rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
  "28": "7rem",
  "32": "8rem",
  "36": "9rem",
  "40": "10rem",
  "48": "12rem",
  "56": "14rem",
  "64": "16rem",
  "72": "18rem",
  "80": "20rem",
  "96": "24rem",
};

export const FONT_SIZE_TOKENS: Record<FontSizeKey, string> = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
  "8xl": "6rem",
  "9xl": "8rem",
};

export const FONT_WEIGHT_TOKENS: Record<FontWeightKey, number> = {
  thin: 100,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

export const LINE_HEIGHT_TOKENS: Record<LineHeightKey, number> = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
};

export const RADIUS_TOKENS: Record<RadiusKey, string> = {
  none: "0px",
  sm: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px",
  card: "1rem",
  button: "0.5rem",
  input: "0.5rem",
  modal: "1.25rem",
};

export const SHADOW_TOKENS: Record<ShadowKey, string> = {
  none: "none",
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
};

export const DURATION_TOKENS: Record<DurationKey, string> = {
  "0": "0ms",
  "75": "75ms",
  "100": "100ms",
  "150": "150ms",
  "200": "200ms",
  "300": "300ms",
  "500": "500ms",
  "700": "700ms",
  "1000": "1000ms",
};

export const EASING_TOKENS: Record<EasingKey, string> = {
  linear: "linear",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
};

// ─────────────────────────────────────────────
// 4. COLORBLIND PALETTE CONFIGS
//    Transformations based on simulation of
//    LMS color-space matrices for each CVD type
// ─────────────────────────────────────────────

export const COLORBLIND_PALETTES: ColorblindPaletteConfig[] = [
  {
    id: "default",
    label: "Default (Full Color)",
    description: "Standard color palette for users with typical color vision.",
    brand: {
      indigo: "#4F46E5",
      indigoLight: "#818CF8",
      indigoDark: "#3730A3",
      pink: "#EC4899",
      pinkLight: "#F472B6",
      pinkDark: "#BE185D",
      gold: "#F59E0B",
      goldLight: "#FBBF24",
      mint: "#10B981",
      mintLight: "#34D399",
    },
    semantic: {
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#3B82F6",
    },
    chart: {
      c1: "#4F46E5", c2: "#EC4899", c3: "#F59E0B",
      c4: "#10B981", c5: "#3B82F6", c6: "#8B5CF6",
      c7: "#F97316", c8: "#06B6D4",
    },
  },
  {
    id: "protanopia",
    label: "Protanopia (Red-Blind)",
    description: "Optimized for users who cannot perceive red light (~1% of males).",
    brand: {
      // Red shifted to amber/orange — avoids red-green confusion
      indigo: "#3366CC",
      indigoLight: "#5599DD",
      indigoDark: "#224488",
      pink: "#CC7700",
      pinkLight: "#DD9933",
      pinkDark: "#885500",
      gold: "#DDA800",
      goldLight: "#EEBB33",
      mint: "#009966",
      mintLight: "#33BB88",
    },
    semantic: {
      success: "#009966",
      warning: "#DDA800",
      error: "#CC5500",
      info: "#3366CC",
    },
    chart: {
      c1: "#3366CC", c2: "#CC7700", c3: "#DDA800",
      c4: "#009966", c5: "#5577AA", c6: "#9966CC",
      c7: "#CC5500", c8: "#0099BB",
    },
  },
  {
    id: "deuteranopia",
    label: "Deuteranopia (Green-Blind)",
    description: "Optimized for users who cannot perceive green light (~1% of males).",
    brand: {
      // Green shifted to teal/blue — avoids red-green confusion
      indigo: "#4444AA",
      indigoLight: "#6666CC",
      indigoDark: "#2A2A77",
      pink: "#CC4488",
      pinkLight: "#DD66AA",
      pinkDark: "#882255",
      gold: "#CCAA00",
      goldLight: "#DDCC33",
      mint: "#008888",
      mintLight: "#33AAAA",
    },
    semantic: {
      success: "#008888",
      warning: "#CCAA00",
      error: "#CC4444",
      info: "#4444AA",
    },
    chart: {
      c1: "#4444AA", c2: "#CC4488", c3: "#CCAA00",
      c4: "#008888", c5: "#6666AA", c6: "#8855AA",
      c7: "#AA4444", c8: "#3388AA",
    },
  },
  {
    id: "tritanopia",
    label: "Tritanopia (Blue-Blind)",
    description: "Optimized for users who cannot perceive blue light (rare, ~0.001%).",
    brand: {
      // Blue shifted to red/orange — avoids blue-yellow confusion
      indigo: "#6633AA",
      indigoLight: "#8855CC",
      indigoDark: "#442277",
      pink: "#CC3366",
      pinkLight: "#DD5588",
      pinkDark: "#882244",
      gold: "#DDAA00",
      goldLight: "#EECC33",
      mint: "#AA5500",
      mintLight: "#CC8833",
    },
    semantic: {
      success: "#AA5500",
      warning: "#DDAA00",
      error: "#CC3333",
      info: "#6633AA",
    },
    chart: {
      c1: "#6633AA", c2: "#CC3366", c3: "#DDAA00",
      c4: "#AA5500", c5: "#8855AA", c6: "#9944AA",
      c7: "#CC3333", c8: "#AA7744",
    },
  },
  {
    id: "achromatopsia",
    label: "Achromatopsia (Monochromacy)",
    description: "Optimized for users with complete color vision deficiency (very rare). Uses only luminance and pattern.",
    brand: {
      indigo: "#555555",
      indigoLight: "#888888",
      indigoDark: "#333333",
      pink: "#777777",
      pinkLight: "#AAAAAA",
      pinkDark: "#555555",
      gold: "#999999",
      goldLight: "#BBBBBB",
      mint: "#666666",
      mintLight: "#999999",
    },
    semantic: {
      success: "#666666",
      warning: "#999999",
      error: "#333333",
      info: "#888888",
    },
    chart: {
      c1: "#333333", c2: "#555555", c3: "#777777",
      c4: "#999999", c5: "#AAAAAA", c6: "#444444",
      c7: "#666666", c8: "#888888",
    },
  },
];

// ─────────────────────────────────────────────
// 5. THEME DEFINITIONS
// ─────────────────────────────────────────────

function makeLightTheme(): ThemeConfig {
  return {
    id: "light",
    label: "Light",
    background: {
      primary: "var(--color-bg-primary, #FFFFFF)",
      secondary: "var(--color-bg-secondary, #F8FAFC)",
      tertiary: "var(--color-bg-tertiary, #F1F5F9)",
      elevated: "var(--color-bg-elevated, #FFFFFF)",
      overlay: "var(--color-bg-overlay, rgba(15, 23, 42, 0.4))",
      subtle: "var(--color-bg-subtle, #F8FAFC)",
    },
    foreground: {
      primary: "var(--color-fg-primary, #0F172A)",
      secondary: "var(--color-fg-secondary, #334155)",
      tertiary: "var(--color-fg-tertiary, #64748B)",
      muted: "var(--color-fg-muted, #94A3B8)",
      inverse: "var(--color-fg-inverse, #FFFFFF)",
    },
    border: {
      DEFAULT: "var(--color-border, #E2E8F0)",
      subtle: "var(--color-border-subtle, #F1F5F9)",
      strong: "var(--color-border-strong, #CBD5E1)",
      focus: "var(--color-border-focus, #4F46E5)",
    },
    semantic: {
      success: "var(--color-success, #10B981)",
      warning: "var(--color-warning, #F59E0B)",
      error: "var(--color-error, #EF4444)",
      info: "var(--color-info, #3B82F6)",
    },
    interactive: {
      primary: "var(--color-interactive-primary, #4F46E5)",
      primaryHover: "var(--color-interactive-primary-hover, #4338CA)",
      primaryActive: "var(--color-interactive-primary-active, #3730A3)",
      secondary: "var(--color-interactive-secondary, #F1F5F9)",
      secondaryHover: "var(--color-interactive-secondary-hover, #E2E8F0)",
    },
    brand: {
      indigo: "var(--color-brand-indigo, #4F46E5)",
      indigoLight: "var(--color-brand-indigo-light, #818CF8)",
      indigoDark: "var(--color-brand-indigo-dark, #3730A3)",
      pink: "var(--color-brand-pink, #EC4899)",
      pinkLight: "var(--color-brand-pink-light, #F472B6)",
      pinkDark: "var(--color-brand-pink-dark, #BE185D)",
      gold: "var(--color-brand-gold, #F59E0B)",
      goldLight: "var(--color-brand-gold-light, #FBBF24)",
      mint: "var(--color-brand-mint, #10B981)",
      mintLight: "var(--color-brand-mint-light, #34D399)",
    },
    chart: {
      c1: "var(--color-chart-1, #4F46E5)",
      c2: "var(--color-chart-2, #EC4899)",
      c3: "var(--color-chart-3, #F59E0B)",
      c4: "var(--color-chart-4, #10B981)",
      c5: "var(--color-chart-5, #3B82F6)",
      c6: "var(--color-chart-6, #8B5CF6)",
      c7: "var(--color-chart-7, #F97316)",
      c8: "var(--color-chart-8, #06B6D4)",
    },
  };
}

function makeDarkTheme(): ThemeConfig {
  return {
    id: "dark",
    label: "Dark",
    background: {
      primary: "var(--color-bg-primary, #0F172A)",
      secondary: "var(--color-bg-secondary, #1E293B)",
      tertiary: "var(--color-bg-tertiary, #334155)",
      elevated: "var(--color-bg-elevated, #1E293B)",
      overlay: "var(--color-bg-overlay, rgba(0, 0, 0, 0.6))",
      subtle: "var(--color-bg-subtle, #1E293B)",
    },
    foreground: {
      primary: "var(--color-fg-primary, #F8FAFC)",
      secondary: "var(--color-fg-secondary, #CBD5E1)",
      tertiary: "var(--color-fg-tertiary, #94A3B8)",
      muted: "var(--color-fg-muted, #64748B)",
      inverse: "var(--color-fg-inverse, #0F172A)",
    },
    border: {
      DEFAULT: "var(--color-border, #334155)",
      subtle: "var(--color-border-subtle, #1E293B)",
      strong: "var(--color-border-strong, #475569)",
      focus: "var(--color-border-focus, #818CF8)",
    },
    semantic: {
      success: "var(--color-success, #34D399)",
      warning: "var(--color-warning, #FBBF24)",
      error: "var(--color-error, #F87171)",
      info: "var(--color-info, #60A5FA)",
    },
    interactive: {
      primary: "var(--color-interactive-primary, #818CF8)",
      primaryHover: "var(--color-interactive-primary-hover, #A5B4FC)",
      primaryActive: "var(--color-interactive-primary-active, #6366F1)",
      secondary: "var(--color-interactive-secondary, #334155)",
      secondaryHover: "var(--color-interactive-secondary-hover, #475569)",
    },
    brand: {
      indigo: "var(--color-brand-indigo, #818CF8)",
      indigoLight: "var(--color-brand-indigo-light, #A5B4FC)",
      indigoDark: "var(--color-brand-indigo-dark, #6366F1)",
      pink: "var(--color-brand-pink, #F472B6)",
      pinkLight: "var(--color-brand-pink-light, #F9A8D4)",
      pinkDark: "var(--color-brand-pink-dark, #EC4899)",
      gold: "var(--color-brand-gold, #FBBF24)",
      goldLight: "var(--color-brand-gold-light, #FDE68A)",
      mint: "var(--color-brand-mint, #34D399)",
      mintLight: "var(--color-brand-mint-light, #6EE7B7)",
    },
    chart: {
      c1: "var(--color-chart-1, #818CF8)",
      c2: "var(--color-chart-2, #F472B6)",
      c3: "var(--color-chart-3, #FBBF24)",
      c4: "var(--color-chart-4, #34D399)",
      c5: "var(--color-chart-5, #60A5FA)",
      c6: "var(--color-chart-6, #A78BFA)",
      c7: "var(--color-chart-7, #FB923C)",
      c8: "var(--color-chart-8, #22D3EE)",
    },
  };
}

function makeHCTheme(isDark: boolean): ThemeConfig {
  if (isDark) {
    return {
      id: "dark",
      label: "High Contrast Dark",
      background: {
        primary: "var(--color-bg-primary, #000000)",
        secondary: "var(--color-bg-secondary, #000000)",
        tertiary: "var(--color-bg-tertiary, #000000)",
        elevated: "var(--color-bg-elevated, #0A0A0A)",
        overlay: "var(--color-bg-overlay, rgba(0, 0, 0, 0.8))",
        subtle: "var(--color-bg-subtle, #000000)",
      },
      foreground: {
        primary: "var(--color-fg-primary, #FFFF00)",
        secondary: "var(--color-fg-secondary, #FFFFFF)",
        tertiary: "var(--color-fg-tertiary, #FFFF00)",
        muted: "var(--color-fg-muted, #FFFFFF)",
        inverse: "var(--color-fg-inverse, #000000)",
      },
      border: {
        DEFAULT: "var(--color-border, #FFFF00)",
        subtle: "var(--color-border-subtle, #FFFF00)",
        strong: "var(--color-border-strong, #FFFFFF)",
        focus: "var(--color-border-focus, #00FFFF)",
      },
      semantic: {
        success: "var(--color-success, #00FF00)",
        warning: "var(--color-warning, #FFFF00)",
        error: "var(--color-error, #FF0000)",
        info: "var(--color-info, #00FFFF)",
      },
      interactive: {
        primary: "var(--color-interactive-primary, #FFFF00)",
        primaryHover: "var(--color-interactive-primary-hover, #FFFFFF)",
        primaryActive: "var(--color-interactive-primary-active, #FFFF00)",
        secondary: "var(--color-interactive-secondary, #333333)",
        secondaryHover: "var(--color-interactive-secondary-hover, #555555)",
      },
      brand: {
        indigo: "var(--color-brand-indigo, #8888FF)",
        indigoLight: "var(--color-brand-indigo-light, #AAAADD)",
        indigoDark: "var(--color-brand-indigo-dark, #6666CC)",
        pink: "var(--color-brand-pink, #FF88FF)",
        pinkLight: "var(--color-brand-pink-light, #FFAAFF)",
        pinkDark: "var(--color-brand-pink-dark, #FF55FF)",
        gold: "var(--color-brand-gold, #FFFF00)",
        goldLight: "var(--color-brand-gold-light, #FFFF55)",
        mint: "var(--color-brand-mint, #00FF00)",
        mintLight: "var(--color-brand-mint-light, #88FF88)",
      },
      chart: {
        c1: "var(--color-chart-1, #FFFF00)",
        c2: "var(--color-chart-2, #FF88FF)",
        c3: "var(--color-chart-3, #00FF00)",
        c4: "var(--color-chart-4, #00FFFF)",
        c5: "var(--color-chart-5, #FFFF88)",
        c6: "var(--color-chart-6, #88FF88)",
        c7: "var(--color-chart-7, #FF8888)",
        c8: "var(--color-chart-8, #8888FF)",
      },
    };
  }

  return {
    id: "light",
    label: "High Contrast Light",
    background: {
      primary: "var(--color-bg-primary, #FFFFFF)",
      secondary: "var(--color-bg-secondary, #FFFFFF)",
      tertiary: "var(--color-bg-tertiary, #FFFFFF)",
      elevated: "var(--color-bg-elevated, #FFFFFF)",
      overlay: "var(--color-bg-overlay, rgba(255, 255, 255, 0.9))",
      subtle: "var(--color-bg-subtle, #FFFFFF)",
    },
    foreground: {
      primary: "var(--color-fg-primary, #000000)",
      secondary: "var(--color-fg-secondary, #000000)",
      tertiary: "var(--color-fg-tertiary, #000000)",
      muted: "var(--color-fg-muted, #000000)",
      inverse: "var(--color-fg-inverse, #FFFFFF)",
    },
    border: {
      DEFAULT: "var(--color-border, #000000)",
      subtle: "var(--color-border-subtle, #000000)",
      strong: "var(--color-border-strong, #000000)",
      focus: "var(--color-border-focus, #0000FF)",
    },
    semantic: {
      success: "var(--color-success, #008000)",
      warning: "var(--color-warning, #805800)",
      error: "var(--color-error, #CC0000)",
      info: "var(--color-info, #0000CC)",
    },
    interactive: {
      primary: "var(--color-interactive-primary, #0000CC)",
      primaryHover: "var(--color-interactive-primary-hover, #000099)",
      primaryActive: "var(--color-interactive-primary-active, #000066)",
      secondary: "var(--color-interactive-secondary, #CCCCCC)",
      secondaryHover: "var(--color-interactive-secondary-hover, #999999)",
    },
    brand: {
      indigo: "var(--color-brand-indigo, #000099)",
      indigoLight: "var(--color-brand-indigo-light, #3333CC)",
      indigoDark: "var(--color-brand-indigo-dark, #000066)",
      pink: "var(--color-brand-pink, #990066)",
      pinkLight: "var(--color-brand-pink-light, #CC3399)",
      pinkDark: "var(--color-brand-pink-dark, #660044)",
      gold: "var(--color-brand-gold, #996600)",
      goldLight: "var(--color-brand-gold-light, #CC8800)",
      mint: "var(--color-brand-mint, #006600)",
      mintLight: "var(--color-brand-mint-light, #339933)",
    },
    chart: {
      c1: "var(--color-chart-1, #000099)",
      c2: "var(--color-chart-2, #990066)",
      c3: "var(--color-chart-3, #996600)",
      c4: "var(--color-chart-4, #006600)",
      c5: "var(--color-chart-5, #006699)",
      c6: "var(--color-chart-6, #660099)",
      c7: "var(--color-chart-7, #CC0000)",
      c8: "var(--color-chart-8, #006666)",
    },
  };
}

// ─────────────────────────────────────────────
// 6. DERIVED THEME GENERATOR
// ─────────────────────────────────────────────

function buildTheme(theme: ThemeMode, highContrast: boolean): ThemeConfig {
  if (highContrast) return makeHCTheme(theme === "dark");
  if (theme === "dark") return makeDarkTheme();
  return makeLightTheme();
}

// ─────────────────────────────────────────────
// 7. CSS VARIABLE REGISTRY
//    Maps token names → CSS custom properties
// ─────────────────────────────────────────────

export const CSS_VAR_NAMES = {
  // Background
  bgPrimary: "--color-bg-primary",
  bgSecondary: "--color-bg-secondary",
  bgTertiary: "--color-bg-tertiary",
  bgElevated: "--color-bg-elevated",
  bgOverlay: "--color-bg-overlay",
  bgSubtle: "--color-bg-subtle",
  // Foreground
  fgPrimary: "--color-fg-primary",
  fgSecondary: "--color-fg-secondary",
  fgTertiary: "--color-fg-tertiary",
  fgMuted: "--color-fg-muted",
  fgInverse: "--color-fg-inverse",
  // Border
  border: "--color-border",
  borderSubtle: "--color-border-subtle",
  borderStrong: "--color-border-strong",
  borderFocus: "--color-border-focus",
  // Semantic
  success: "--color-success",
  warning: "--color-warning",
  error: "--color-error",
  info: "--color-info",
  // Interactive
  interactivePrimary: "--color-interactive-primary",
  interactivePrimaryHover: "--color-interactive-primary-hover",
  interactivePrimaryActive: "--color-interactive-primary-active",
  interactiveSecondary: "--color-interactive-secondary",
  interactiveSecondaryHover: "--color-interactive-secondary-hover",
  // Brand
  brandIndigo: "--color-brand-indigo",
  brandIndigoLight: "--color-brand-indigo-light",
  brandIndigoDark: "--color-brand-indigo-dark",
  brandPink: "--color-brand-pink",
  brandPinkLight: "--color-brand-pink-light",
  brandPinkDark: "--color-brand-pink-dark",
  brandGold: "--color-brand-gold",
  brandGoldLight: "--color-brand-gold-light",
  brandMint: "--color-brand-mint",
  brandMintLight: "--color-brand-mint-light",
  // Chart
  chart1: "--color-chart-1",
  chart2: "--color-chart-2",
  chart3: "--color-chart-3",
  chart4: "--color-chart-4",
  chart5: "--color-chart-5",
  chart6: "--color-chart-6",
  chart7: "--color-chart-7",
  chart8: "--color-chart-8",
  // Shadow
  shadowSm: "--shadow-sm",
  shadowMd: "--shadow-md",
  shadowLg: "--shadow-lg",
  // Radius
  radiusCard: "--radius-card",
  radiusButton: "--radius-button",
  radiusInput: "--radius-input",
  radiusModal: "--radius-modal",
} as const;

// ─────────────────────────────────────────────
// 8. CSS VARIABLE APPLICATION
//    Flatten theme into a single CSS var map
// ─────────────────────────────────────────────

function themeToCSSVars(theme: ThemeConfig): Record<string, string> {
  const vars: Record<string, string> = {};

  // Background
  vars[CSS_VAR_NAMES.bgPrimary] = theme.background.primary;
  vars[CSS_VAR_NAMES.bgSecondary] = theme.background.secondary;
  vars[CSS_VAR_NAMES.bgTertiary] = theme.background.tertiary;
  vars[CSS_VAR_NAMES.bgElevated] = theme.background.elevated;
  vars[CSS_VAR_NAMES.bgOverlay] = theme.background.overlay;
  vars[CSS_VAR_NAMES.bgSubtle] = theme.background.subtle;

  // Foreground
  vars[CSS_VAR_NAMES.fgPrimary] = theme.foreground.primary;
  vars[CSS_VAR_NAMES.fgSecondary] = theme.foreground.secondary;
  vars[CSS_VAR_NAMES.fgTertiary] = theme.foreground.tertiary;
  vars[CSS_VAR_NAMES.fgMuted] = theme.foreground.muted;
  vars[CSS_VAR_NAMES.fgInverse] = theme.foreground.inverse;

  // Border
  vars[CSS_VAR_NAMES.border] = theme.border.DEFAULT;
  vars[CSS_VAR_NAMES.borderSubtle] = theme.border.subtle;
  vars[CSS_VAR_NAMES.borderStrong] = theme.border.strong;
  vars[CSS_VAR_NAMES.borderFocus] = theme.border.focus;

  // Semantic
  vars[CSS_VAR_NAMES.success] = theme.semantic.success;
  vars[CSS_VAR_NAMES.warning] = theme.semantic.warning;
  vars[CSS_VAR_NAMES.error] = theme.semantic.error;
  vars[CSS_VAR_NAMES.info] = theme.semantic.info;

  // Interactive
  vars[CSS_VAR_NAMES.interactivePrimary] = theme.interactive.primary;
  vars[CSS_VAR_NAMES.interactivePrimaryHover] = theme.interactive.primaryHover;
  vars[CSS_VAR_NAMES.interactivePrimaryActive] = theme.interactive.primaryActive;
  vars[CSS_VAR_NAMES.interactiveSecondary] = theme.interactive.secondary;
  vars[CSS_VAR_NAMES.interactiveSecondaryHover] = theme.interactive.secondaryHover;

  // Brand
  vars[CSS_VAR_NAMES.brandIndigo] = theme.brand.indigo;
  vars[CSS_VAR_NAMES.brandIndigoLight] = theme.brand.indigoLight;
  vars[CSS_VAR_NAMES.brandIndigoDark] = theme.brand.indigoDark;
  vars[CSS_VAR_NAMES.brandPink] = theme.brand.pink;
  vars[CSS_VAR_NAMES.brandPinkLight] = theme.brand.pinkLight;
  vars[CSS_VAR_NAMES.brandPinkDark] = theme.brand.pinkDark;
  vars[CSS_VAR_NAMES.brandGold] = theme.brand.gold;
  vars[CSS_VAR_NAMES.brandGoldLight] = theme.brand.goldLight;
  vars[CSS_VAR_NAMES.brandMint] = theme.brand.mint;
  vars[CSS_VAR_NAMES.brandMintLight] = theme.brand.mintLight;

  // Chart
  vars[CSS_VAR_NAMES.chart1] = theme.chart.c1;
  vars[CSS_VAR_NAMES.chart2] = theme.chart.c2;
  vars[CSS_VAR_NAMES.chart3] = theme.chart.c3;
  vars[CSS_VAR_NAMES.chart4] = theme.chart.c4;
  vars[CSS_VAR_NAMES.chart5] = theme.chart.c5;
  vars[CSS_VAR_NAMES.chart6] = theme.chart.c6;
  vars[CSS_VAR_NAMES.chart7] = theme.chart.c7;
  vars[CSS_VAR_NAMES.chart8] = theme.chart.c8;

  return vars;
}

function paletteToCSSVars(
  palette: ColorblindPaletteConfig,
): Record<string, string> {
  const vars: Record<string, string> = {};

  vars["--palette-brand-indigo"] = palette.brand.indigo;
  vars["--palette-brand-indigo-light"] = palette.brand.indigoLight;
  vars["--palette-brand-indigo-dark"] = palette.brand.indigoDark;
  vars["--palette-brand-pink"] = palette.brand.pink;
  vars["--palette-brand-pink-light"] = palette.brand.pinkLight;
  vars["--palette-brand-pink-dark"] = palette.brand.pinkDark;
  vars["--palette-brand-gold"] = palette.brand.gold;
  vars["--palette-brand-gold-light"] = palette.brand.goldLight;
  vars["--palette-brand-mint"] = palette.brand.mint;
  vars["--palette-brand-mint-light"] = palette.brand.mintLight;

  vars["--palette-semantic-success"] = palette.semantic.success;
  vars["--palette-semantic-warning"] = palette.semantic.warning;
  vars["--palette-semantic-error"] = palette.semantic.error;
  vars["--palette-semantic-info"] = palette.semantic.info;

  vars["--palette-chart-1"] = palette.chart.c1;
  vars["--palette-chart-2"] = palette.chart.c2;
  vars["--palette-chart-3"] = palette.chart.c3;
  vars["--palette-chart-4"] = palette.chart.c4;
  vars["--palette-chart-5"] = palette.chart.c5;
  vars["--palette-chart-6"] = palette.chart.c6;
  vars["--palette-chart-7"] = palette.chart.c7;
  vars["--palette-chart-8"] = palette.chart.c8;

  return vars;
}

// ─────────────────────────────────────────────
// 9. ROOT CSS VARIABLE APPLICATION
//    Writes all token CSS variables to :root
// ─────────────────────────────────────────────

export function applyThemeCSSVariables(theme: ThemeConfig): void {
  const root = document.documentElement;
  const vars = themeToCSSVars(theme);

  // Remove old theme vars first
  root.querySelectorAll("[data-theme-var]").forEach((el) => {
    root.style.removeProperty(el.getAttribute("data-theme-var")!);
  });

  for (const [name, value] of Object.entries(vars)) {
    root.style.setProperty(name, value);
  }

  // Add data attribute for CSS selector targeting
  root.setAttribute("data-theme", theme.id);
}

export function applyPaletteCSSVariables(
  palette: ColorblindPaletteConfig,
): void {
  const root = document.documentElement;
  const vars = paletteToCSSVars(palette);

  for (const [name, value] of Object.entries(vars)) {
    root.style.setProperty(name, value);
  }

  root.setAttribute("data-palette", palette.id);
}

export function removePaletteCSSVariables(): void {
  const root = document.documentElement;
  const paletteVars = paletteToCSSVars(COLORBLIND_PALETTES[0]);
  for (const name of Object.keys(paletteVars)) {
    root.style.removeProperty(name);
  }
  root.setAttribute("data-palette", "default");
}

// ─────────────────────────────────────────────
// 10. APPLY DESIGN TOKEN CSS VARIABLES
// ─────────────────────────────────────────────

export function applyDesignTokenVariables(tokens: DesignTokens): void {
  const root = document.documentElement;

  // Spacing
  for (const [key, value] of Object.entries(tokens.spacing)) {
    root.style.setProperty(`--space-${key}`, value);
  }

  // Font sizes
  for (const [key, value] of Object.entries(tokens.fontSize)) {
    root.style.setProperty(`--text-${key}`, value);
  }

  // Font weights
  for (const [key, value] of Object.entries(tokens.fontWeight)) {
    root.style.setProperty(`--font-weight-${key}`, String(value));
  }

  // Line heights
  for (const [key, value] of Object.entries(tokens.lineHeight)) {
    root.style.setProperty(`--leading-${key}`, String(value));
  }

  // Radii
  for (const [key, value] of Object.entries(tokens.radius)) {
    root.style.setProperty(`--radius-${key}`, value);
  }

  // Shadows
  for (const [key, value] of Object.entries(tokens.shadow)) {
    root.style.setProperty(`--shadow-${key}`, value);
  }

  // Durations
  for (const [key, value] of Object.entries(tokens.duration)) {
    root.style.setProperty(`--duration-${key}`, value);
  }

  // Easings
  for (const [key, value] of Object.entries(tokens.easing)) {
    root.style.setProperty(`--ease-${key}`, value);
  }

  // Set data attribute
  root.setAttribute("data-tokens-applied", "true");
}

// ─────────────────────────────────────────────
// 11. THEME TRANSITION
// ─────────────────────────────────────────────

export function enableThemeTransitions(durationMs: number = 300): void {
  const root = document.documentElement;
  root.style.setProperty(
    "--theme-transition-duration",
    `${durationMs}ms`,
  );
  root.classList.add("theme-transitioning");
}

export function disableThemeTransitions(): void {
  const root = document.documentElement;
  root.classList.remove("theme-transitioning");
}

// ─────────────────────────────────────────────
// 12. SYSTEM PREFERENCE DETECTION
// ─────────────────────────────────────────────

export function getSystemPrefersDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function getSystemPrefersHighContrast(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-contrast: more)").matches;
}

export function getSystemPrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function getSystemPrefersColorScheme(): "light" | "dark" | "no-preference" {
  if (typeof window === "undefined") return "no-preference";
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  if (window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
  return "no-preference";
}

export function onSystemThemeChange(
  callback: (isDark: boolean) => void,
): () => void {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");

  const handler = (e: MediaQueryListEvent) => callback(e.matches);
  mq.addEventListener("change", handler);

  return () => mq.removeEventListener("change", handler);
}

// ─────────────────────────────────────────────
// 13. LOCAL STORAGE PERSISTENCE
// ─────────────────────────────────────────────

export const THEME_STORAGE_KEY = "platform-theme-config";
export const THEME_PALETTE_KEY = "platform-colorblind-palette";

export interface PersistedThemeConfig {
  theme: ThemeMode;
  highContrast: "off" | "on";
  palette: ColorblindPalette;
  syncedWithSystem: boolean;
}

export function loadPersistedThemeConfig(): PersistedThemeConfig | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedThemeConfig;
  } catch {
    return null;
  }
}

export function persistThemeConfig(config: PersistedThemeConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(config));
  } catch {
    // Storage full or unavailable — silently fail
  }
}

export function loadPersistedPalette(): ColorblindPalette {
  if (typeof window === "undefined") return "default";
  try {
    const raw = localStorage.getItem(THEME_PALETTE_KEY);
    if (!raw) return "default";
    return raw as ColorblindPalette;
  } catch {
    return "default";
  }
}

export function persistPalette(palette: ColorblindPalette): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(THEME_PALETTE_KEY, palette);
  } catch {
    // Silently fail
  }
}

// ─────────────────────────────────────────────
// 14. RESOLVE INITIAL THEME STATE
// ─────────────────────────────────────────────

export function resolveInitialTheme(): {
  theme: ThemeMode;
  highContrast: "off" | "on";
  palette: ColorblindPalette;
} {
  const persisted = loadPersistedThemeConfig();

  if (persisted && !persisted.syncedWithSystem) {
    return {
      theme: persisted.theme,
      highContrast: persisted.highContrast,
      palette: loadPersistedPalette(),
    };
  }

  if (persisted && persisted.syncedWithSystem) {
    return {
      theme: getSystemPrefersDark() ? "dark" : "light",
      highContrast: getSystemPrefersHighContrast() ? "on" : "off",
      palette: loadPersistedPalette(),
    };
  }

  // No persisted config — use system preferences
  return {
    theme: getSystemPrefersDark() ? "dark" : "light",
    highContrast: getSystemPrefersHighContrast() ? "on" : "off",
    palette: "default",
  };
}

// ─────────────────────────────────────────────
// 15. ZUSTAND STORE
// ─────────────────────────────────────────────

export interface ThemeState {
  // Core state
  theme: ThemeMode;
  highContrast: "off" | "on";
  palette: ColorblindPalette;
  syncedWithSystem: boolean;

  // Computed (derived, but cached for convenience)
  themeConfig: ThemeConfig;
  paletteConfig: ColorblindPaletteConfig;

  // Actions
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setHighContrast: (hc: "off" | "on") => void;
  toggleHighContrast: () => void;
  setPalette: (palette: ColorblindPalette) => void;
  syncWithSystem: (enabled: boolean) => void;

  // Low-level
  applyToDOM: () => void;
  resetToSystem: () => void;
}

export interface ThemeActions {
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setHighContrast: (hc: "off" | "on") => void;
  toggleHighContrast: () => void;
  setPalette: (palette: ColorblindPalette) => void;
  syncWithSystem: (enabled: boolean) => void;
  applyToDOM: () => void;
  resetToSystem: () => void;
}

let zustandModule: typeof import("zustand") | null = null;

try {
  zustandModule = require("zustand");
} catch {
  // zustand not installed — will fallback to manual context
}

// Try to import create from zustand
import { create } from "zustand";

const initial = resolveInitialTheme();

export const useThemeStore = create<ThemeState & ThemeActions>((set, get) => ({
  // ── Initial state ──
  theme: initial.theme,
  highContrast: initial.highContrast,
  palette: initial.palette,
  syncedWithSystem: loadPersistedThemeConfig()?.syncedWithSystem ?? false,

  get themeConfig() {
    const { theme, highContrast } = get();
    return buildTheme(theme, highContrast === "on");
  },

  get paletteConfig() {
    const { palette } = get();
    return COLORBLIND_PALETTES.find((p) => p.id === palette) ?? COLORBLIND_PALETTES[0];
  },

  // ── Actions ──
  setTheme: (theme: ThemeMode) => {
    set({ theme, syncedWithSystem: false });
    get().applyToDOM();
    persistThemeConfig({
      theme,
      highContrast: get().highContrast,
      palette: get().palette,
      syncedWithSystem: false,
    });
  },

  toggleTheme: () => {
    const next: ThemeMode = get().theme === "dark" ? "light" : "dark";
    get().setTheme(next);
  },

  setHighContrast: (hc: "off" | "on") => {
    set({ highContrast: hc, syncedWithSystem: false });
    get().applyToDOM();
    persistThemeConfig({
      theme: get().theme,
      highContrast: hc,
      palette: get().palette,
      syncedWithSystem: false,
    });
  },

  toggleHighContrast: () => {
    const next: "off" | "on" = get().highContrast === "on" ? "off" : "on";
    get().setHighContrast(next);
  },

  setPalette: (palette: ColorblindPalette) => {
    set({ palette });
    get().applyToDOM();
    persistPalette(palette);
    persistThemeConfig({
      theme: get().theme,
      highContrast: get().highContrast,
      palette,
      syncedWithSystem: get().syncedWithSystem,
    });
  },

  syncWithSystem: (enabled: boolean) => {
    set({ syncedWithSystem: enabled });
    if (enabled) {
      const isDark = getSystemPrefersDark();
      set({ theme: isDark ? "dark" : "light" });
      const isHC = getSystemPrefersHighContrast();
      set({ highContrast: isHC ? "on" : "off" });
    }
    get().applyToDOM();
    persistThemeConfig({
      theme: get().theme,
      highContrast: get().highContrast,
      palette: get().palette,
      syncedWithSystem: enabled,
    });
  },

  applyToDOM: () => {
    const state = get();
    applyThemeCSSVariables(state.themeConfig);
    if (state.palette !== "default") {
      applyPaletteCSSVariables(state.paletteConfig);
    } else {
      removePaletteCSSVariables();
    }
  },

  resetToSystem: () => {
    const isDark = getSystemPrefersDark();
    const isHC = getSystemPrefersHighContrast();
    set({
      theme: isDark ? "dark" : "light",
      highContrast: isHC ? "on" : "off",
      syncedWithSystem: true,
    });
    get().applyToDOM();
    persistThemeConfig({
      theme: isDark ? "dark" : "light",
      highContrast: isHC ? "on" : "off",
      palette: get().palette,
      syncedWithSystem: true,
    });
  },
}));

// ─────────────────────────────────────────────
// 16. REACT HOOK — useTheme()
//    Convenience wrapper with full typing
// ─────────────────────────────────────────────

export interface UseThemeReturn {
  // Current state
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  isDark: boolean;

  // Colorblind
  palette: ColorblindPalette;
  setPalette: (palette: ColorblindPalette) => void;
  paletteConfig: ColorblindPaletteConfig;
  availablePalettes: ColorblindPaletteConfig[];

  // High contrast
  highContrast: "off" | "on";
  toggleHighContrast: () => void;

  // Computed theme
  themeConfig: ThemeConfig;

  // System sync
  syncedWithSystem: boolean;
  syncWithSystem: (enabled: boolean) => void;
  resetToSystem: () => void;

  // DOM
  applyToDOM: () => void;
}

export function useTheme(): UseThemeReturn {
  const store = useThemeStore();

  return {
    // Core theme
    theme: store.theme,
    setTheme: store.setTheme,
    toggleTheme: store.toggleTheme,
    isDark: store.theme === "dark",

    // Colorblind palette
    palette: store.palette,
    setPalette: store.setPalette,
    paletteConfig: store.paletteConfig,
    availablePalettes: COLORBLIND_PALETTES,

    // High contrast
    highContrast: store.highContrast,
    toggleHighContrast: store.toggleHighContrast,

    // Computed
    themeConfig: store.themeConfig,

    // System
    syncedWithSystem: store.syncedWithSystem,
    syncWithSystem: store.syncWithSystem,
    resetToSystem: store.resetToSystem,

    // DOM
    applyToDOM: store.applyToDOM,
  };
}

// ─────────────────────────────────────────────
// 17. THEME PROVIDER COMPONENT
// ─────────────────────────────────────────────

import { type ReactNode, type FC, useRef } from "react";

export interface ThemeProviderProps {
  children: ReactNode;
  designTokens?: Partial<DesignTokens>;
  enableTransitions?: boolean;
  transitionDuration?: number;
  storageKeys?: {
    theme?: string;
    palette?: string;
  };
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  designTokens,
  enableTransitions = true,
  transitionDuration = 300,
  storageKeys,
}) => {
  const themeConfig = useThemeStore((s) => s.themeConfig);
  const paletteConfig = useThemeStore((s) => s.paletteConfig);
  const palette = useThemeStore((s) => s.palette);
  const applyToDOM = useThemeStore((s) => s.applyToDOM);
  const reducedMotion = useSystemPrefersReducedMotion();

  const isInitialMount = useRef(true);

  // Apply theme on change
  useEffect(() => {
    applyToDOM();
  }, [themeConfig, paletteConfig, applyToDOM]);

  // Apply design tokens on mount (only once)
  useEffect(() => {
    if (isInitialMount.current && designTokens) {
      const mergedTokens: DesignTokens = {
        spacing: { ...SPACING_TOKENS, ...(designTokens.spacing ?? {}) },
        fontSize: { ...FONT_SIZE_TOKENS, ...(designTokens.fontSize ?? {}) },
        fontWeight: {
          ...FONT_WEIGHT_TOKENS,
          ...(designTokens.fontWeight ?? {}),
        },
        lineHeight: {
          ...LINE_HEIGHT_TOKENS,
          ...(designTokens.lineHeight ?? {}),
        },
        radius: { ...RADIUS_TOKENS, ...(designTokens.radius ?? {}) },
        shadow: { ...SHADOW_TOKENS, ...(designTokens.shadow ?? {}) },
        duration: { ...DURATION_TOKENS, ...(designTokens.duration ?? {}) },
        easing: { ...EASING_TOKENS, ...(designTokens.easing ?? {}) },
      };
      applyDesignTokenVariables(mergedTokens);
      isInitialMount.current = false;
    }
  }, [designTokens]);

  // Enable transitions
  useEffect(() => {
    if (enableTransitions && !reducedMotion) {
      enableThemeTransitions(transitionDuration);
      return () => disableThemeTransitions();
    }
  }, [enableTransitions, transitionDuration, reducedMotion]);

  // Listen for system preference changes when synced
  const syncedWithSystem = useThemeStore((s) => s.syncedWithSystem);
  const syncWithSystem = useThemeStore((s) => s.syncWithSystem);

  useEffect(() => {
    if (!syncedWithSystem) return;

    const unsub1 = onSystemThemeChange(() => {
      syncWithSystem(true);
    });

    const unsub2 = () => {
      const mqHC = window.matchMedia("(prefers-contrast: more)");
      const handler = () => syncWithSystem(true);
      mqHC.addEventListener("change", handler);
      return () => mqHC.removeEventListener("change", handler);
    };

    return () => {
      unsub1();
      unsub2();
    };
  }, [syncedWithSystem, syncWithSystem]);

  return <>{children}</>;
};

// ─────────────────────────────────────────────
// 18. THEME CLASS NAME UTILITY
//    Generates a className string for the
//    current theme state (useful for <html>)
// ─────────────────────────────────────────────

export function getThemeClassName(state: {
  theme: ThemeMode;
  highContrast: "off" | "on";
  palette: ColorblindPalette;
  syncedWithSystem: boolean;
}): string {
  const parts: string[] = [];

  parts.push(state.theme === "dark" ? "theme-dark" : "theme-light");
  if (state.highContrast === "on") parts.push("theme-high-contrast");
  if (state.palette !== "default") parts.push(`palette-${state.palette}`);
  if (state.syncedWithSystem) parts.push("theme-system-synced");

  return parts.join(" ");
}

// ─────────────────────────────────────────────
// 19. GLOBAL CSS (injectable via <style> or
//    loaded as a CSS module)
// ─────────────────────────────────────────────

export const GLOBAL_THEME_CSS = /* css */ `
  /* ── Theme Transition ───────────────────────────── */
  .theme-transitioning,
  .theme-transitioning *,
  .theme-transitioning *::before,
  .theme-transitioning *::after {
    transition-property: background-color, border-color, color, fill, stroke, box-shadow, outline-color;
    transition-duration: var(--theme-transition-duration, 300ms);
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* ── Theme data attributes for CSS selectors ───── */
  [data-theme="light"] {
    color-scheme: light;
  }

  [data-theme="dark"] {
    color-scheme: dark;
  }

  [data-theme="light"].theme-high-contrast,
  [data-theme="dark"].theme-high-contrast {
    color-scheme: light dark;
  }

  /* ── Reduced motion ─────────────────────────────── */
  @media (prefers-reduced-motion: reduce) {
    .theme-transitioning,
    .theme-transitioning *,
    .theme-transitioning *::before,
    .theme-transitioning *::after {
      transition-duration: 0ms !important;
      animation-duration: 0ms !important;
    }
  }

  /* ── High contrast overrides ────────────────────── */
  .theme-high-contrast [data-theme="light"],
  .theme-high-contrast [data-theme="dark"] {
    --shadow-sm: none;
    --shadow-md: none;
    --shadow-lg: none;
    --shadow-xl: none;
    --shadow-2xl: none;
  }

  .theme-high-contrast * {
    text-decoration-thickness: 2px !important;
    border-width: 2px !important;
  }

  .theme-high-contrast a {
    text-decoration: underline !important;
    text-underline-offset: 3px !important;
  }

  /* ── Focus visibility ───────────────────────────── */
  .theme-high-contrast :focus-visible {
    outline: 4px solid var(--color-border-focus, #0000FF) !important;
    outline-offset: 2px !important;
  }

  /* ── Colorblind palette overrides ───────────────── */
  [data-palette="protanopia"] {
    --palette-active: 1;
  }

  [data-palette="deuteranopia"] {
    --palette-active: 1;
  }

  [data-palette="tritanopia"] {
    --palette-active: 1;
  }

  [data-palette="achromatopsia"] {
    --palette-active: 1;
  }
`;

// ─────────────────────────────────────────────
// 20. INJECT GLOBAL CSS HELPER
// ─────────────────────────────────────────────

export function injectGlobalThemeCSS(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById("global-theme-styles")) return;

  const style = document.createElement("style");
  style.id = "global-theme-styles";
  style.setAttribute("data-theme-css", "");
  style.textContent = GLOBAL_THEME_CSS;
  document.head.appendChild(style);
}

// ─────────────────────────────────────────────
// 21. HOOK FOR REDUCED MOTION
// ─────────────────────────────────────────────

export function useSystemPrefersReducedMotion(): boolean {
  const [reduced, setReduced] = ReactUseState(getSystemPrefersReducedMotion);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

// Lightweight useState clone for use outside React context
declare function ReactUseState<T>(
  initial: T | (() => T),
): [T, (v: T | ((prev: T) => T)) => void];

// Safe version that works inside React components
export function useReducedMotion(): boolean {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [reduced, setReduced] = useState(getSystemPrefersReducedMotion);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => {
      setReduced(e.matches);
      forceUpdate();
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

// ─────────────────────────────────────────────
// 22. THEME PRESET UTILITIES
//    Pre-configured combinations for
//    common use cases
// ─────────────────────────────────────────────

export interface ThemePreset {
  name: string;
  description: string;
  theme: ThemeMode;
  highContrast: "off" | "on";
  palette: ColorblindPalette;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    name: "Light",
    description: "Standard light theme",
    theme: "light",
    highContrast: "off",
    palette: "default",
  },
  {
    name: "Dark",
    description: "Standard dark theme",
    theme: "dark",
    highContrast: "off",
    palette: "default",
  },
  {
    name: "Light (High Contrast)",
    description: "Light theme with maximum contrast for low vision",
    theme: "light",
    highContrast: "on",
    palette: "default",
  },
  {
    name: "Dark (High Contrast)",
    description: "Dark theme with maximum contrast for low vision",
    theme: "dark",
    highContrast: "on",
    palette: "default",
  },
  {
    name: "Protanopia Safe",
    description: "Light theme optimized for red-colorblind users",
    theme: "light",
    highContrast: "off",
    palette: "protanopia",
  },
  {
    name: "Deuteranopia Safe",
    description: "Dark theme optimized for green-colorblind users",
    theme: "dark",
    highContrast: "off",
    palette: "deuteranopia",
  },
  {
    name: "Tritanopia Safe",
    description: "Light theme optimized for blue-colorblind users",
    theme: "light",
    highContrast: "off",
    palette: "tritanopia",
  },
  {
    name: "Monochrome",
    description: "High contrast theme for users with achromatopsia",
    theme: "light",
    highContrast: "on",
    palette: "achromatopsia",
  },
];

export function applyPreset(preset: ThemePreset): void {
  useThemeStore.setState({
    theme: preset.theme,
    highContrast: preset.highContrast,
    palette: preset.palette,
    syncedWithSystem: false,
  });
  const state = useThemeStore.getState();
  state.applyToDOM();
  persistThemeConfig({
    theme: preset.theme,
    highContrast: preset.highContrast,
    palette: preset.palette,
    syncedWithSystem: false,
  });
  persistPalette(preset.palette);
}

// ─────────────────────────────────────────────
// 23. TAILWIND CSS CONFIG GENERATOR
//    Returns a partial Tailwind config object
//    that extends your existing theme with
//    the runtime CSS variables
// ─────────────────────────────────────────────

export interface TailwindThemeExtension {
  colors: Record<string, Record<string, string> | string>;
  spacing: Record<string, string>;
  fontSize: Record<string, [string, { lineHeight: number }?]>;
  fontWeight: Record<string, number>;
  lineHeight: Record<string, number>;
  borderRadius: Record<string, string>;
  boxShadow: Record<string, string>;
  transitionDuration: Record<string, string>;
  transitionTimingFunction: Record<string, string>;
}

export function generateTailwindExtension(): TailwindThemeExtension {
  return {
    colors: {
      // Background colors
      bg: {
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
        tertiary: "var(--color-bg-tertiary)",
        elevated: "var(--color-bg-elevated)",
        subtle: "var(--color-bg-subtle)",
      },
      // Foreground / text colors
      fg: {
        primary: "var(--color-fg-primary)",
        secondary: "var(--color-fg-secondary)",
        tertiary: "var(--color-fg-tertiary)",
        muted: "var(--color-fg-muted)",
        inverse: "var(--color-fg-inverse)",
      },
      // Border colors
      border: {
        DEFAULT: "var(--color-border)",
        subtle: "var(--color-border-subtle)",
        strong: "var(--color-border-strong)",
        focus: "var(--color-border-focus)",
      },
      // Semantic colors
      semantic: {
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        info: "var(--color-info)",
      },
      // Interactive
      interactive: {
        primary: "var(--color-interactive-primary)",
        "primary-hover": "var(--color-interactive-primary-hover)",
        "primary-active": "var(--color-interactive-primary-active)",
        secondary: "var(--color-interactive-secondary)",
        "secondary-hover": "var(--color-interactive-secondary-hover)",
      },
      // Brand colors
      brand: {
        indigo: "var(--color-brand-indigo)",
        "indigo-light": "var(--color-brand-indigo-light)",
        "indigo-dark": "var(--color-brand-indigo-dark)",
        pink: "var(--color-brand-pink)",
        "pink-light": "var(--color-brand-pink-light)",
        "pink-dark": "var(--color-brand-pink-dark)",
        gold: "var(--color-brand-gold)",
        "gold-light": "var(--color-brand-gold-light)",
        mint: "var(--color-brand-mint)",
        "mint-light": "var(--color-brand-mint-light)",
      },
      // Chart colors
      chart: {
        c1: "var(--color-chart-1)",
        c2: "var(--color-chart-2)",
        c3: "var(--color-chart-3)",
        c4: "var(--color-chart-4)",
        c5: "var(--color-chart-5)",
        c6: "var(--color-chart-6)",
        c7: "var(--color-chart-7)",
        c8: "var(--color-chart-8)",
      },
    },
    spacing: SPACING_TOKENS,
    fontSize: Object.fromEntries(
      Object.entries(FONT_SIZE_TOKENS).map(([key, val]) => [
        key,
        [val, { lineHeight: LINE_HEIGHT_TOKENS.normal }],
      ]),
    ) as Record<string, [string, { lineHeight: number }?]>,
    fontWeight: FONT_WEIGHT_TOKENS,
    lineHeight: Object.fromEntries(
      Object.entries(LINE_HEIGHT_TOKENS).map(([key, val]) => [key, val]),
    ) as Record<string, number>,
    borderRadius: RADIUS_TOKENS,
    boxShadow: SHADOW_TOKENS,
    transitionDuration: DURATION_TOKENS,
    transitionTimingFunction: {
      linear: "linear",
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
      "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  };
}

// ─────────────────────────────────────────────
// 24. TAILWIND CSS (CSS-MODE) UTILITY CLASSES
//    Pre-built class utility map for
//    applying tokens via className
// ─────────────────────────────────────────────

export const TW_CLASS_UTILITIES = {
  // Semantic text colors
  "text-fg-primary": "color: var(--color-fg-primary)",
  "text-fg-secondary": "color: var(--color-fg-secondary)",
  "text-fg-tertiary": "color: var(--color-fg-tertiary)",
  "text-fg-muted": "color: var(--color-fg-muted)",
  "text-fg-inverse": "color: var(--color-fg-inverse)",
  "text-semantic-success": "color: var(--color-success)",
  "text-semantic-warning": "color: var(--color-warning)",
  "text-semantic-error": "color: var(--color-error)",
  "text-semantic-info": "color: var(--color-info)",
  "text-brand-indigo": "color: var(--color-brand-indigo)",
  "text-brand-pink": "color: var(--color-brand-pink)",
  "text-brand-gold": "color: var(--color-brand-gold)",
  "text-brand-mint": "color: var(--color-brand-mint)",
  // Semantic bg colors
  "bg-bg-primary": "background-color: var(--color-bg-primary)",
  "bg-bg-secondary": "background-color: var(--color-bg-secondary)",
  "bg-bg-tertiary": "background-color: var(--color-bg-tertiary)",
  "bg-bg-elevated": "background-color: var(--color-bg-elevated)",
  "bg-bg-subtle": "background-color: var(--color-bg-subtle)",
  "bg-brand-indigo": "background-color: var(--color-brand-indigo)",
  "bg-brand-pink": "background-color: var(--color-brand-pink)",
  "bg-brand-gold": "background-color: var(--color-brand-gold)",
  "bg-brand-mint": "background-color: var(--color-brand-mint)",
  // Semantic border colors
  "border-border": "border-color: var(--color-border)",
  "border-border-focus": "border-color: var(--color-border-focus)",
  // Interactive
  "bg-interactive-primary": "background-color: var(--color-interactive-primary)",
  "bg-interactive-primary-hover": "background-color: var(--color-interactive-primary-hover)",
  "text-interactive-primary": "color: var(--color-interactive-primary)",
  // Shadows
  "shadow-shadow-sm": "box-shadow: var(--shadow-sm)",
  "shadow-shadow-md": "box-shadow: var(--shadow-md)",
  "shadow-shadow-lg": "box-shadow: var(--shadow-lg)",
  "shadow-shadow-xl": "box-shadow: var(--shadow-xl)",
  // Focus ring
  "ring-border-focus": "box-shadow: 0 0 0 3px var(--color-border-focus)",
  // Theme transition
  "theme-transition":
    "transition: background-color var(--theme-transition-duration, 300ms) cubic-bezier(0.4, 0, 0.2, 1), border-color var(--theme-transition-duration, 300ms) cubic-bezier(0.4, 0, 0.2, 1), color var(--theme-transition-duration, 300ms) cubic-bezier(0.4, 0, 0.2, 1), box-shadow var(--theme-transition-duration, 300ms) cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

// ─────────────────────────────────────────────
// 25. TAILWIND CSS CONFIG FILE GENERATOR
//    Returns the full tailwind.config.ts content
//    to paste into your project
// ─────────────────────────────────────────────

export function generateTailwindConfigContent(): string {
  const ext = generateTailwindExtension();
  return `import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", "[data-theme='dark']"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Semantic aliases ──────────────────────
        bg: {
          primary: "var(--color-bg-primary)",
          secondary: "var(--color-bg-secondary)",
          tertiary: "var(--color-bg-tertiary)",
          elevated: "var(--color-bg-elevated)",
          subtle: "var(--color-bg-subtle)",
        },
        fg: {
          primary: "var(--color-fg-primary)",
          secondary: "var(--color-fg-secondary)",
          tertiary: "var(--color-fg-tertiary)",
          muted: "var(--color-fg-muted)",
          inverse: "var(--color-fg-inverse)",
        },
        "border-custom": {
          DEFAULT: "var(--color-border)",
          subtle: "var(--color-border-subtle)",
          strong: "var(--color-border-strong)",
          focus: "var(--color-border-focus)",
        },
        semantic: {
          success: "var(--color-success)",
          warning: "var(--color-warning)",
          error: "var(--color-error)",
          info: "var(--color-info)",
        },
        interactive: {
          primary: "var(--color-interactive-primary)",
          "primary-hover": "var(--color-interactive-primary-hover)",
          "primary-active": "var(--color-interactive-primary-active)",
          secondary: "var(--color-interactive-secondary)",
          "secondary-hover": "var(--color-interactive-secondary-hover)",
        },
        brand: {
          indigo: "var(--color-brand-indigo)",
          "indigo-light": "var(--color-brand-indigo-light)",
          "indigo-dark": "var(--color-brand-indigo-dark)",
          pink: "var(--color-brand-pink)",
          "pink-light": "var(--color-brand-pink-light)",
          "pink-dark": "var(--color-brand-pink-dark)",
          gold: "var(--color-brand-gold)",
          "gold-light": "var(--color-brand-gold-light)",
          mint: "var(--color-brand-mint)",
          "mint-light": "var(--color-brand-mint-light)",
        },
        chart: {
          c1: "var(--color-chart-1)",
          c2: "var(--color-chart-2)",
          c3: "var(--color-chart-3)",
          c4: "var(--color-chart-4)",
          c5: "var(--color-chart-5)",
          c6: "var(--color-chart-6)",
          c7: "var(--color-chart-7)",
          c8: "var(--color-chart-8)",
        },
      },
      spacing: ${JSON.stringify(SPACING_TOKENS, null, 8)},
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
      },
      fontWeight: ${JSON.stringify(FONT_WEIGHT_TOKENS, null, 8)},
      lineHeight: ${JSON.stringify({
        ...LINE_HEIGHT_TOKENS,
        none: 1,
        tight: 1.25,
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.625,
        loose: 2,
      }, null, 8)},
      borderRadius: ${JSON.stringify(RADIUS_TOKENS, null, 8)},
      boxShadow: {
        ...${JSON.stringify(SHADOW_TOKENS, null, 8)},
        focus: "0 0 0 3px var(--color-border-focus, #4F46E5)",
      },
      transitionDuration: ${JSON.stringify(DURATION_TOKENS, null, 8)},
      transitionTimingFunction: {
        linear: "linear",
        in: "cubic-bezier(0.4, 0, 1, 1)",
        out: "cubic-bezier(0, 0, 0.2, 1)",
        "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      extend: {
        animation: {
          "theme-fade-in": "themeFadeIn 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          "theme-fade-out": "themeFadeOut 150ms ease-in",
        },
        keyframes: {
          themeFadeIn: {
            "0%": { opacity: "0.7" },
            "100%": { opacity: "1" },
          },
          themeFadeOut: {
            "0%": { opacity: "1" },
            "100%": { opacity: "0.7" },
          },
        },
      },
    },
  },
};

export default config;
`;
}

// ─────────────────────────────────────────────
// 26. CSS MODULE FOR TAILWIND
// ─────────────────────────────────────────────

export const TW_CSS_MODULE = /* css */ `
@layer utilities {
  /* ── Background semantic colors ──────────────── */
  .bg-bg-primary { background-color: var(--color-bg-primary); }
  .bg-bg-secondary { background-color: var(--color-bg-secondary); }
  .bg-bg-tertiary { background-color: var(--color-bg-tertiary); }
  .bg-bg-elevated { background-color: var(--color-bg-elevated); }
  .bg-bg-subtle { background-color: var(--color-bg-subtle); }

  .bg-brand-indigo { background-color: var(--color-brand-indigo); }
  .bg-brand-pink { background-color: var(--color-brand-pink); }
  .bg-brand-gold { background-color: var(--color-brand-gold); }
  .bg-brand-mint { background-color: var(--color-brand-mint); }

  .bg-interactive-primary { background-color: var(--color-interactive-primary); }
  .bg-interactive-secondary { background-color: var(--color-interactive-secondary); }
  .bg-interactive-primary-hover { background-color: var(--color-interactive-primary-hover); }
  .bg-interactive-secondary-hover { background-color: var(--color-interactive-secondary-hover); }

  .bg-semantic-success { background-color: var(--color-success); }
  .bg-semantic-warning { background-color: var(--color-warning); }
  .bg-semantic-error { background-color: var(--color-error); }
  .bg-semantic-info { background-color: var(--color-info); }

  /* ── Text semantic colors ────────────────────── */
  .text-fg-primary { color: var(--color-fg-primary); }
  .text-fg-secondary { color: var(--color-fg-secondary); }
  .text-fg-tertiary { color: var(--color-fg-tertiary); }
  .text-fg-muted { color: var(--color-fg-muted); }
  .text-fg-inverse { color: var(--color-fg-inverse); }

  .text-brand-indigo { color: var(--color-brand-indigo); }
  .text-brand-pink { color: var(--color-brand-pink); }
  .text-brand-gold { color: var(--color-brand-gold); }
  .text-brand-mint { color: var(--color-brand-mint); }

  .text-semantic-success { color: var(--color-success); }
  .text-semantic-warning { color: var(--color-warning); }
  .text-semantic-error { color: var(--color-error); }
  .text-semantic-info { color: var(--color-info); }

  .text-interactive-primary { color: var(--color-interactive-primary); }

  /* ── Border colors ───────────────────────────── */
  .border-border-default { border-color: var(--color-border); }
  .border-border-subtle { border-color: var(--color-border-subtle); }
  .border-border-strong { border-color: var(--color-border-strong); }
  .border-border-focus { border-color: var(--color-border-focus); }

  /* ── Focus rings ─────────────────────────────── */
  .ring-brand-indigo { box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.4); }
  .ring-border-focus { box-shadow: 0 0 0 3px var(--color-border-focus); }

  /* ── Theme transitions ───────────────────────── */
  .theme-transition {
    transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
                border-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
                color 300ms cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .theme-transition-fast {
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1),
                border-color 150ms cubic-bezier(0.4, 0, 0.2, 1),
                color 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* ── High contrast overrides ─────────────────── */
  .theme-high-contrast * {
    text-decoration-thickness: 2px !important;
  }

  .theme-high-contrast :focus-visible {
    outline: 4px solid var(--color-border-focus, #FFFF00) !important;
    outline-offset: 2px !important;
  }
}
`;

// ─────────────────────────────────────────────
// 27. THEME-AWARE CLASS NAME COMPOSER
// ─────────────────────────────────────────────

export function composeThemeClasses(
  base: string,
  themeState: {
    theme: ThemeMode;
    highContrast: "off" | "on";
  },
): string {
  const parts = [base];

  if (themeState.theme === "dark") parts.push("theme-dark");
  else parts.push("theme-light");

  if (themeState.highContrast === "on") parts.push("theme-high-contrast");

  return parts.join(" ");
}

// ─────────────────────────────────────────────
// 28. EXPORT COLLECTIONS
// ─────────────────────────────────────────────

export const THEME_MODES: { id: ThemeMode; label: string }[] = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
];

export const HIGH_CONTRAST_OPTIONS: { id: "off" | "on"; label: string }[] = [
  { id: "off", label: "Standard" },
  { id: "on", label: "High Contrast" },
];

export const PALETTE_OPTIONS = COLORBLIND_PALETTES;

export const DESIGN_TOKENS: DesignTokens = {
  spacing: SPACING_TOKENS,
  fontSize: FONT_SIZE_TOKENS,
  fontWeight: FONT_WEIGHT_TOKENS,
  lineHeight: LINE_HEIGHT_TOKENS,
  radius: RADIUS_TOKENS,
  shadow: SHADOW_TOKENS,
  duration: DURATION_TOKENS,
  easing: EASING_TOKENS,
};

// ─────────────────────────────────────────────
// 29. REACT QUERY INTEGRATION (Optional)
//    For server-side theme configuration
// ─────────────────────────────────────────────

export interface ThemeConfigResponse {
  availableThemes: ThemeMode[];
  availablePalettes: ColorblindPaletteConfig[];
  defaultTheme: ThemeMode;
  defaultPalette: ColorblindPalette;
  enforceSystemPreference: boolean;
}

export function createThemeConfigFetcher(
  baseUrl: string = "/api/theme",
) {
  return async (): Promise<ThemeConfigResponse> => {
    const res = await fetch(baseUrl, {
      headers: { "Content-Type": "application/json" },
      // Add offline retry logic
      next: { revalidate: 86400 }, // 24 hours
    });

    if (!res.ok) {
      // Return defaults on failure
      return {
        availableThemes: ["light", "dark"],
        availablePalettes: COLORBLIND_PALETTES,
        defaultTheme: "light",
        defaultPalette: "default",
        enforceSystemPreference: false,
      };
    }

    return res.json();
  };
}

// ─────────────────────────────────────────────
// 30. INITIALIZATION FUNCTION
//    Call once in your root layout to set
//    up the theme system completely
// ─────────────────────────────────────────────

export interface InitializeThemeOptions {
  designTokens?: Partial<DesignTokens>;
  enableTransitions?: boolean;
  transitionDuration?: number;
  storageKeys?: {
    theme?: string;
    palette?: string;
  };
  autoDetectSystem?: boolean;
  injectGlobalCSS?: boolean;
}

export async function initializeTheme(
  options: InitializeThemeOptions = {},
): Promise<void> {
  const {
    designTokens,
    enableTransitions = true,
    transitionDuration = 300,
    autoDetectSystem = true,
    injectGlobalCSS = true,
  } = options;

  // Inject global CSS
  if (injectGlobalCSS) {
    injectGlobalThemeCSS();
  }

  // Apply design tokens
  if (designTokens) {
    const mergedTokens: DesignTokens = {
      spacing: { ...SPACING_TOKENS, ...(designTokens.spacing ?? {}) },
      fontSize: { ...FONT_SIZE_TOKENS, ...(designTokens.fontSize ?? {}) },
      fontWeight: { ...FONT_WEIGHT_TOKENS, ...(designTokens.fontWeight ?? {}) },
      lineHeight: { ...LINE_HEIGHT_TOKENS, ...(designTokens.lineHeight ?? {}) },
      radius: { ...RADIUS_TOKENS, ...(designTokens.radius ?? {}) },
      shadow: { ...SHADOW_TOKENS, ...(designTokens.shadow ?? {}) },
      duration: { ...DURATION_TOKENS, ...(designTokens.duration ?? {}) },
      easing: { ...EASING_TOKENS, ...(designTokens.easing ?? {}) },
    };
    applyDesignTokenVariables(mergedTokens);
  }

  // Apply current theme
  const state = useThemeStore.getState();
  state.applyToDOM();

  // Enable transitions
  if (enableTransitions) {
    const reducedMotion = getSystemPrefersReducedMotion();
    if (!reducedMotion) {
      enableThemeTransitions(transitionDuration);
    }
  }

  // Listen for system changes
  if (autoDetectSystem) {
    onSystemThemeChange(() => {
      if (useThemeStore.getState().syncedWithSystem) {
        useThemeStore.getState().syncWithSystem(true);
      }
    });
  }
}

// ─────────────────────────────────────────────
// 31. UTILITY: Check if a color is
//    distinguishable for a given palette
// ─────────────────────────────────────────────

export function areColorsDistinguishable(
  color1: string,
  color2: string,
  palette: ColorblindPalette = "default",
): boolean {
  // Simple WCAG contrast check — in production, use a proper
  // color-difference algorithm (CIEDE2000) with CVD simulation
  const getLuminance = (hex: string): number => {
    const c = hex.replace("#", "");
    const r = parseInt(c.substring(0, 2), 16) / 255;
    const g = parseInt(c.substring(2, 4), 16) / 255;
    const b = parseInt(c.substring(4, 6), 16) / 255;
    const [rs, gs, bs] = [r, g, b].map((v) =>
      v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4),
    );
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const ratio =
    (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  return ratio >= 3; // WCAG AA minimum for large text
}

// ─────────────────────────────────────────────
// 32. UTILITY: Get contrast color
//    (black or white) for any background
// ─────────────────────────────────────────────

export function getContrastColor(hexColor: string): string {
  const getLuminance = (hex: string): number => {
    const c = hex.replace("#", "");
    const r = parseInt(c.substring(0, 2), 16) / 255;
    const g = parseInt(c.substring(2, 4), 16) / 255;
    const b = parseInt(c.substring(4, 6), 16) / 255;
    const [rs, gs, bs] = [r, g, b].map((v) =>
      v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4),
    );
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  return getLuminance(hexColor) > 0.179 ? "#000000" : "#FFFFFF";
}

// ─────────────────────────────────────────────
// 33. TYPE GUARDS
// ─────────────────────────────────────────────

export function isValidColorblindPalette(
  value: string,
): value is ColorblindPalette {
  return [
    "default",
    "protanopia",
    "deuteranopia",
    "tritanopia",
    "achromatopsia",
  ].includes(value);
}

export function isValidThemeMode(value: string): value is ThemeMode {
  return ["light", "dark"].includes(value);
}

// ─────────────────────────────────────────────
// 34. OFFLINE SUPPORT
//    Cache theme config for offline use
// ─────────────────────────────────────────────

const OFFLINE_THEME_CACHE_KEY = "platform-theme-offline-cache";

export function cacheThemeForOffline(): void {
  if (typeof window === "undefined") return;
  try {
    const state = useThemeStore.getState();
    const cache = {
      config: {
        theme: state.theme,
        highContrast: state.highContrast,
        palette: state.palette,
        syncedWithSystem: state.syncedWithSystem,
      },
      themeConfig: state.themeConfig,
      paletteConfig: state.paletteConfig,
      cachedAt: Date.now(),
    };
    localStorage.setItem(OFFLINE_THEME_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Silently fail
  }
}

export function loadThemeFromOfflineCache(): {
  theme: ThemeMode;
  highContrast: "off" | "on";
  palette: ColorblindPalette;
} | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(OFFLINE_THEME_CACHE_KEY);
    if (!raw) return null;
    const cache = JSON.parse(raw);
    // Cache expires after 7 days
    if (Date.now() - cache.cachedAt > 7 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(OFFLINE_THEME_CACHE_KEY);
      return null;
    }
    return cache.config;
  } catch {
    return null;
  }
}

// Auto-cache on state changes
export function setupOfflineCaching(): () => void {
  const unsub = useThemeStore.subscribe(() => {
    cacheThemeForOffline();
  });
  // Initial cache
  cacheThemeForOffline();
  return unsub;
}

// ─────────────────────────────────────────────
// 35. SSR / HYDRATION HELPERS
// ─────────────────────────────────────────────

export function getSSRThemeClass(themeMode: ThemeMode): string {
  return themeMode === "dark" ? "theme-dark" : "theme-light";
}

export interface SSRThemeProps {
  theme: ThemeMode;
  highContrast?: "off" | "on";
  palette?: ColorblindPalette;
}

export function getSSRHTMLAttributes(props: SSRThemeProps): Record<string, string> {
  const attrs: Record<string, string> = {
    "data-theme": props.theme,
  };

  if (props.highContrast === "on") {
    attrs["data-high-contrast"] = "true";
  }

  if (props.palette && props.palette !== "default") {
    attrs["data-palette"] = props.palette;
  }

  return attrs;
}

// ─────────────────────────────────────────────
// 36. FINAL EXPORTS
// ─────────────────────────────────────────────

export default {
  // Hooks
  useTheme,
  useReducedMotion,
  useSystemPrefersReducedMotion,

  // Store
  useThemeStore,

  // Theme system
  buildTheme,
  applyThemeCSSVariables,
  applyPaletteCSSVariables,
  removePaletteCSSVariables,
  applyDesignTokenVariables,
  enableThemeTransitions,
  disableThemeTransitions,

  // Detection
  getSystemPrefersDark,
  getSystemPrefersHighContrast,
  getSystemPrefersReducedMotion,
  getSystemPrefersColorScheme,
  onSystemThemeChange,

  // Persistence
  loadPersistedThemeConfig,
  persistThemeConfig,
  loadPersistedPalette,
  persistPalette,
  resolveInitialTheme,
  cacheThemeForOffline,
  loadThemeFromOfflineCache,
  setupOfflineCaching,

  // Config
  DESIGN_TOKENS,
  SPACING_TOKENS,
  FONT_SIZE_TOKENS,
  FONT_WEIGHT_TOKENS,
  LINE_HEIGHT_TOKENS,
  RADIUS_TOKENS,
  SHADOW_TOKENS,
  DURATION_TOKENS,
  EASING_TOKENS,
  COLORBLIND_PALETTES,
  THEME_MODES,
  HIGH_CONTRAST_OPTIONS,
  PALETTE_OPTIONS,
  THEME_PRESETS,
  CSS_VAR_NAMES,
  TW_CLASS_UTILITIES,
  GLOBAL_THEME_CSS,
  TW_CSS_MODULE,

  // Generators
  generateTailwindExtension,
  generateTailwindConfigContent,

  // Actions
  applyPreset,
  composeThemeClasses,
  getThemeClassName,
  injectGlobalThemeCSS,
  initializeTheme,

  // Utilities
  areColorsDistinguishable,
  getContrastColor,
  isValidColorblindPalette,
  isValidThemeMode,

  // SSR
  getSSRThemeClass,
  getSSRHTMLAttributes,

  // React Query
  createThemeConfigFetcher,
};