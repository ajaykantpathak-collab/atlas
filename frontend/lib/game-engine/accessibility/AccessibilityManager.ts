/**
 * AccessibilityManager — manages accessibility features.
 *
 * Features:
 * - Keyboard navigation: Tab through canvas elements, Enter to activate, arrows for dragging
 * - Screen reader: ARIA live region announces challenge text, feedback, progress
 * - Colorblind mode: High-contrast palette, patterns instead of colors
 * - Font size control: S/M/L/XL text scaling
 * - Reduced motion: Disables GSAP animations, instant state changes
 *
 * Settings persist to localStorage.
 */

import type { AccessibilityConfig, FontSize } from './types';
import { DEFAULT_CONFIG, FONT_SIZE_MULTIPLIERS } from './types';

const STORAGE_KEY = 'atlas_a11y_config';

export class AccessibilityManager {
  private config: AccessibilityConfig = { ...DEFAULT_CONFIG };
  private ariaRegion: HTMLElement | null = null;
  private keyboardHandlers: Map<string, (e: KeyboardEvent) => void> = new Map();

  /**
   * Initialize: load config from localStorage and set up ARIA region.
   */
  init(): void {
    this.loadConfig();
    this.setupAriaRegion();
  }

  /**
   * Load config from localStorage.
   */
  private loadConfig(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        this.config = { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
      }
    } catch {
      // Use defaults
    }
  }

  /**
   * Save config to localStorage.
   */
  private saveConfig(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.config));
    } catch {
      // ignore
    }
  }

  /**
   * Set up the ARIA live region for screen reader announcements.
   */
  private setupAriaRegion(): void {
    if (typeof document === 'undefined') return;
    let region = document.getElementById('atlas-aria-live');
    if (!region) {
      region = document.createElement('div');
      region.id = 'atlas-aria-live';
      region.setAttribute('aria-live', 'polite');
      region.setAttribute('aria-atomic', 'true');
      region.style.position = 'absolute';
      region.style.width = '1px';
      region.style.height = '1px';
      region.style.padding = '0';
      region.style.margin = '-1px';
      region.style.overflow = 'hidden';
      region.style.clip = 'rect(0, 0, 0, 0)';
      region.style.whiteSpace = 'nowrap';
      region.style.border = '0';
      document.body.appendChild(region);
    }
    this.ariaRegion = region;
  }

  /**
   * Announce text to screen readers.
   */
  announce(text: string): void {
    if (!this.config.screenReader || !this.ariaRegion) return;
    this.ariaRegion.textContent = text;
  }

  /**
   * Get the current config.
   */
  getConfig(): AccessibilityConfig {
    return { ...this.config };
  }

  /**
   * Update the config and save.
   */
  updateConfig(partial: Partial<AccessibilityConfig>): void {
    this.config = { ...this.config, ...partial };
    this.saveConfig();
  }

  /**
   * Toggle a boolean config value.
   */
  toggle(key: keyof AccessibilityConfig): void {
    if (typeof this.config[key] === 'boolean') {
      (this.config as any)[key] = !(this.config as any)[key];
      this.saveConfig();
    }
  }

  /**
   * Set font size.
   */
  setFontSize(size: FontSize): void {
    this.config.fontSize = size;
    this.saveConfig();
  }

  /**
   * Get the font size multiplier for the current setting.
   */
  getFontMultiplier(): number {
    return FONT_SIZE_MULTIPLIERS[this.config.fontSize];
  }

  /**
   * Scale a font size by the current multiplier.
   */
  scaleFont(baseSize: number): number {
    return Math.round(baseSize * this.getFontMultiplier());
  }

  /**
   * Check if reduced motion is enabled.
   */
  isReducedMotion(): boolean {
    return this.config.reducedMotion;
  }

  /**
   * Check if colorblind mode is enabled.
   */
  isColorblindMode(): boolean {
    return this.config.colorblindMode;
  }

  /**
   * Check if high contrast is enabled.
   */
  isHighContrast(): boolean {
    return this.config.highContrast;
  }

  /**
   * Check if keyboard navigation is enabled.
   */
  isKeyboardNavigation(): boolean {
    return this.config.keyboardNavigation;
  }

  /**
   * Register keyboard handlers for canvas interaction.
   * Returns a cleanup function.
   */
  registerKeyboardHandlers(
    handlers: {
      onTab?: () => void;
      onEnter?: () => void;
      onArrowUp?: () => void;
      onArrowDown?: () => void;
      onArrowLeft?: () => void;
      onArrowRight?: () => void;
      onEscape?: () => void;
    },
    id: string,
  ): () => void {
    if (!this.config.keyboardNavigation) return () => {};

    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Tab': e.preventDefault(); handlers.onTab?.(); break;
        case 'Enter': case ' ': e.preventDefault(); handlers.onEnter?.(); break;
        case 'ArrowUp': e.preventDefault(); handlers.onArrowUp?.(); break;
        case 'ArrowDown': e.preventDefault(); handlers.onArrowDown?.(); break;
        case 'ArrowLeft': e.preventDefault(); handlers.onArrowLeft?.(); break;
        case 'ArrowRight': e.preventDefault(); handlers.onArrowRight?.(); break;
        case 'Escape': e.preventDefault(); handlers.onEscape?.(); break;
      }
    };

    this.keyboardHandlers.set(id, handler);
    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
      this.keyboardHandlers.delete(id);
    };
  }

  /**
   * Get a high-contrast color for a given semantic role.
   */
  getHighContrastColor(role: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'background' | 'text'): number {
    if (this.config.highContrast) {
      const highContrast: Record<string, number> = {
        primary: 0x000000,
        secondary: 0x333333,
        success: 0x006600,
        error: 0xcc0000,
        warning: 0xcc8800,
        background: 0xffffff,
        text: 0x000000,
      };
      return highContrast[role];
    }

    const normal: Record<string, number> = {
      primary: 0x6c5ce7,
      secondary: 0x6b7280,
      success: 0x22c55e,
      error: 0xef4444,
      warning: 0xfbbf24,
      background: 0xf9fafb,
      text: 0x1f2937,
    };
    return normal[role];
  }

  /**
   * Get a colorblind-safe color for a category index.
   * Uses the Wong (2011) palette.
   */
  getColorblindSafeColor(index: number): number {
    const palette = [
      0x0072b2, // blue
      0xe69f00, // orange
      0x009e73, // green
      0xd55e00, // vermillion
      0xcc79a7, // purple
      0x56b4e9, // sky blue
      0xf0e442, // yellow
    ];
    return palette[index % palette.length];
  }

  /**
   * Get a pattern name for a category index (for colorblind mode).
   * Patterns can be rendered as stripes, dots, etc. instead of just colors.
   */
  getCategoryPattern(index: number): 'solid' | 'stripes' | 'dots' | 'grid' | 'diagonal' {
    const patterns: Array<'solid' | 'stripes' | 'dots' | 'grid' | 'diagonal'> = ['solid', 'stripes', 'dots', 'grid', 'diagonal'];
    return patterns[index % patterns.length];
  }

  /**
   * Reset to defaults.
   */
  reset(): void {
    this.config = { ...DEFAULT_CONFIG };
    this.saveConfig();
  }
}
