/**
 * Scaffolding types — scaffold levels for fading visual support
 */

/**
 * Scaffold levels:
 * - 3: Full support (manipulatives, drag objects, mascot narrates every step)
 * - 2: Partial support (number line, simplified visuals, mascot on key moments)
 * - 1: Abstract (symbols only, no manipulatives, mascot on correct/wrong only)
 */
export type ScaffoldLevel = 1 | 2 | 3;

export interface ScaffoldConfig {
  /** Current scaffold level */
  level: ScaffoldLevel;
  /** Whether show-me is available */
  showMeAvailable: boolean;
  /** Whether mascot narrates every step */
  fullNarration: boolean;
  /** Whether to use physical manipulatives */
  useManipulatives: boolean;
  /** Whether to show number line */
  useNumberLine: boolean;
  /** Whether to use abstract symbols only */
  abstractOnly: boolean;
}

/**
 * Get the scaffold config for a given level.
 */
export function getScaffoldConfig(level: ScaffoldLevel): ScaffoldConfig {
  switch (level) {
    case 3:
      return {
        level: 3,
        showMeAvailable: true,
        fullNarration: true,
        useManipulatives: true,
        useNumberLine: true,
        abstractOnly: false,
      };
    case 2:
      return {
        level: 2,
        showMeAvailable: true,
        fullNarration: false,
        useManipulatives: false,
        useNumberLine: true,
        abstractOnly: false,
      };
    case 1:
      return {
        level: 1,
        showMeAvailable: false,
        fullNarration: false,
        useManipulatives: false,
        useNumberLine: false,
        abstractOnly: true,
      };
  }
}
