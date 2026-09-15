/**
 * Accessibility types — configuration for accessibility features
 */

export type FontSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface AccessibilityConfig {
  /** Whether keyboard navigation is enabled */
  keyboardNavigation: boolean;
  /** Whether screen reader announcements are on */
  screenReader: boolean;
  /** Whether colorblind mode is on (high-contrast palette) */
  colorblindMode: boolean;
  /** Font size */
  fontSize: FontSize;
  /** Whether reduced motion is on (no animations) */
  reducedMotion: boolean;
  /** Whether high contrast is on */
  highContrast: boolean;
}

export const DEFAULT_CONFIG: AccessibilityConfig = {
  keyboardNavigation: true,
  screenReader: true,
  colorblindMode: false,
  fontSize: 'medium',
  reducedMotion: false,
  highContrast: false,
};

export const FONT_SIZE_MULTIPLIERS: Record<FontSize, number> = {
  small: 0.85,
  medium: 1.0,
  large: 1.25,
  xlarge: 1.5,
};
