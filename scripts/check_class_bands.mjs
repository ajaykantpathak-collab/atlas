#!/usr/bin/env node
/**
 * Verifies the junior class-band rule against the REAL TypeScript module.
 *
 * Product rule: junior is classes 1-5; normal content starts at class 6.
 * The threshold used to be inlined as a magic number in three places, and the
 * three copies disagreed (8, 8 and 7) — so classes 6-8 were served the junior
 * chapter list, junior tutor chips, and the Junior Mode door. The rule now
 * lives in one place (frontend/lib/classBands.ts) and this script executes that
 * module directly via Node's type stripping, so the check tests the shipped
 * logic rather than a mirrored copy of it.
 *
 * Usage: node --no-warnings --experimental-strip-types scripts/check_class_bands.mjs
 *   (--no-warnings silences MODULE_TYPELESS_PACKAGE_JSON, which is noise
 *   because frontend/package.json has no "type": "module")
 * Exit code 1 if any expectation fails.
 */

import { pathToFileURL } from 'node:url'
import path from 'node:path'

const FRONTEND = path.resolve(import.meta.dirname, '..', 'frontend')
const mod = await import(
  pathToFileURL(path.join(FRONTEND, 'lib', 'classBands.ts')).href
)

const { JUNIOR_MAX_CLASS, getClassBand, isJunior } = mod

// [classLevel, expectedJunior, expectedBand, why]
const CASES = [
  [1, true, 1, 'junior, lowest class'],
  [5, true, 1, 'junior upper bound - the regression case'],
  [6, false, 2, 'first normal class - the regression case'],
  [7, false, 2, 'was junior under the old <= 7/8 gates'],
  [8, false, 2, 'was junior under the old <= 8 gates'],
  [10, false, 2, 'middle band upper bound'],
  [11, false, 3, 'senior band'],
  [12, false, 3, 'senior band, top class'],
  [0, true, 1, 'class 0 is not a real class; keep it out of normal content'],
]

const failures = []
if (JUNIOR_MAX_CLASS !== 5) {
  failures.push(`JUNIOR_MAX_CLASS is ${JUNIOR_MAX_CLASS}, expected 5`)
}
if (mod.MID_MAX_CLASS !== 10) {
  failures.push(`MID_MAX_CLASS is ${mod.MID_MAX_CLASS}, expected 10`)
}

for (const [level, wantJunior, wantBand, why] of CASES) {
  const gotJunior = isJunior(level)
  const gotBand = getClassBand(level)
  if (gotJunior !== wantJunior) {
    failures.push(`isJunior(${level}) = ${gotJunior}, expected ${wantJunior} (${why})`)
  }
  if (gotBand !== wantBand) {
    failures.push(`getClassBand(${level}) = ${gotBand}, expected ${wantBand} (${why})`)
  }
}

// An unknown class level must stay in band 0 so surfaces claim nothing.
for (const unknown of [null, undefined, NaN, '5']) {
  if (getClassBand(unknown) !== 0) {
    failures.push(`getClassBand(${String(unknown)}) must be 0 (claim nothing)`)
  }
  if (isJunior(unknown) !== false) {
    failures.push(`isJunior(${String(unknown)}) must be false`)
  }
}

if (failures.length) {
  console.error('CLASS BAND CHECK FAILED:')
  for (const f of failures) console.error('  - ' + f)
  process.exit(1)
}

console.log(
  `class bands OK — junior 1-${JUNIOR_MAX_CLASS}, middle 6-${mod.MID_MAX_CLASS}, senior 11-12`,
)
