/**
 * Class bands — the single source of truth for "which stream is this child in?".
 *
 * Product rule: JUNIOR is classes 1-5; normal ("senior") content starts at
 * class 6.
 *
 * This file exists because the threshold was previously inlined as a magic
 * number in two places, both of which used `<= 8`:
 *   - diagnostic/page.tsx  -> served the JUNIOR chapter list to classes 6-8
 *   - tutor/page.tsx       -> gave classes 6-8 the `s_*_junior` opening chip
 * A Class 7 student was therefore being handed a Class 3 syllabus and a
 * babyish tutor voice. Other surfaces already used the correct boundary
 * (`sims-v2/[id]`: `classLevel >= 6 ? 'senior' : 'junior'`), which is exactly
 * how the drift stayed invisible.
 *
 * Import from here rather than re-typing a number.
 */

/** Highest class level that counts as junior. Normal nodes start at 6. */
export const JUNIOR_MAX_CLASS = 5

/** Highest class level in the middle band (6-10). */
export const MID_MAX_CLASS = 10

/**
 * 0 = class unknown (generic; claim nothing)
 * 1 = junior, classes 1-5
 * 2 = middle, classes 6-10
 * 3 = senior, classes 11-12
 */
export type ClassBand = 0 | 1 | 2 | 3

export function isJunior(classLevel?: number | null): boolean {
  return typeof classLevel === 'number' && classLevel <= JUNIOR_MAX_CLASS
}

/** Band for a class level. Unknown/absent class levels are band 0. */
export function getClassBand(classLevel?: number | null): ClassBand {
  if (typeof classLevel !== 'number' || Number.isNaN(classLevel)) return 0
  if (classLevel <= JUNIOR_MAX_CLASS) return 1
  if (classLevel <= MID_MAX_CLASS) return 2
  return 3
}
