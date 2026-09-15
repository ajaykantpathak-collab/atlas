/**
 * VisualStyle — consistent color palette and visual constants
 * for the Atlas learning platform.
 *
 * All games and renderers should use these colors to maintain
 * visual consistency across the app.
 */

export const AtlasPalette = {
  // Primary brand colors
  primary: 0x6366f1,      // Indigo
  primaryLight: 0x818cf8,
  primaryDark: 0x4f46e5,

  // Subject colors
  maths: 0x3b82f6,        // Blue
  science: 0x22c55e,      // Green
  evs: 0xf59e0b,          // Amber
  english: 0xec4899,      // Pink
  social: 0xa855f7,       // Purple
  computer: 0x06b6d4,     // Cyan

  // Feedback colors
  correct: 0x22c55e,      // Green
  wrong: 0xef4444,        // Red
  hint: 0xf59e0b,         // Amber
  celebration: 0xfbbf24,  // Gold

  // Background colors
  bgWarm: 0xfdf6e3,       // Warm cream
  bgCool: 0xf0f9ff,       // Cool blue
  bgSoft: 0xfef3c7,       // Soft yellow

  // Nature colors (for Living World)
  sky: 0x93c5fd,
  skyDawn: 0xfe9ca7,
  skyDusk: 0xf97316,
  skyNight: 0x1e1b4b,
  grass: 0x86efac,
  grassAutumn: 0xd4a373,
  grassWinter: 0xe5e7eb,
  ground: 0x92400e,
  tree: 0x16a34a,
  treeTrunk: 0x78350f,

  // Object colors (consistent across games)
  apple: 0xef4444,
  mango: 0xfbbf24,
  ball: 0x3b82f6,
  star: 0xfbbf24,
  flower: 0xec4899,
  leaf: 0x16a34a,
  water: 0x3b82f6,

  // UI colors
  buttonPrimary: 0x6366f1,
  buttonSecondary: 0xa855f7,
  buttonSuccess: 0x22c55e,
  buttonDanger: 0xef4444,
  panel: 0xffffff,
  panelBorder: 0xc7d2fe,
  textDark: 0x1e293b,
  textLight: 0x64748b,
} as const;

/**
 * Get the subject color for a given subject name.
 */
export function getSubjectColor(subject: string): number {
  const s = subject.toLowerCase();
  if (s.includes('math')) return AtlasPalette.maths;
  if (s.includes('science')) return AtlasPalette.science;
  if (s.includes('evs')) return AtlasPalette.evs;
  if (s.includes('english')) return AtlasPalette.english;
  if (s.includes('social') || s.includes('history') || s.includes('geo')) return AtlasPalette.social;
  if (s.includes('computer')) return AtlasPalette.computer;
  return AtlasPalette.primary;
}

/**
 * Get a consistent gradient for a subject (for backgrounds, panels, etc.)
 */
export function getSubjectGradient(subject: string): [number, number] {
  const base = getSubjectColor(subject);
  // Lighten the color for the second stop
  const r = (base >> 16) & 0xff;
  const g = (base >> 8) & 0xff;
  const b = base & 0xff;
  const lightR = Math.min(255, r + 40);
  const lightG = Math.min(255, g + 40);
  const lightB = Math.min(255, b + 40);
  const lightColor = (lightR << 16) | (lightG << 8) | lightB;
  return [base, lightColor];
}
