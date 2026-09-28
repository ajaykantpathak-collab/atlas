/**
 * geoData.ts — schematic-but-accurate 2D map geometry + lab datasets for
 * the E5 Geospatial Explorer. 2D-map-native per SANDBOX_TAXONOMY.md (E5),
 * no network tiles, no 3D.
 *
 * Rules honoured here:
 *  - Outline paths are simplified public-domain-style schematic polygons
 *    embedded in code (recognisable shapes, correct relative positions).
 *  - Every teaching NODE a click/quiz resolves to is an authored corpus
 *    node id — the words shown to the student come from the enrichment
 *    API (closed-world), never from this file. This file carries only
 *    geometry, short labels and dataset numbers framed as approximate.
 *  - Climate-region datasets encode the authored climatic signatures of
 *    c9_geo_icse_06_002 (the corpus's seven natural regions).
 */

// ---------------------------------------------------------------- types --

export interface MapFeature {
  key: string
  label: string
  /** Authored corpus node whose enrichment explains this feature. */
  nodeId: string
  /** Point feature anchor (normalised 0-100 map units). */
  x: number
  y: number
  /** Polyline/polygon anchor for line features (ranges, rivers). */
  line?: Array<{ x: number; y: number }>
  kind: 'mountain' | 'plateau' | 'plain' | 'desert' | 'river' | 'water' | 'coast' | 'island' | 'country'
}

// ---------------------------------------------------------------- INDIA --

/** Schematic India outline — Kashmir top to Kanyakumari tip, NE arm. */
export const INDIA_OUTLINE = `
M 30,2 L 35,6 L 38,10 L 33,12 L 28,11 L 26,14 L 20,18 L 15,24 L 12,29 L 7,31
L 10,34 L 5,36 L 10,39 L 15,38 L 17,42 L 16,48 L 18,55 L 21,62 L 24,70 L 29,78
L 34,74 L 37,68 L 38,64 L 43,58 L 47,52 L 50,47 L 54,42 L 58,39 L 61,36
L 60,31 L 62,26 L 66,23 L 72,21 L 78,18 L 84,14 L 88,18 L 84,23 L 81,29
L 77,35 L 72,31 L 70,27 L 64,27 L 61,26 L 58,24 L 52,21 L 46,19 L 40,17
L 35,14 L 31,10 Z`

/** 23.5°N dashed line (Tropic of Cancer) at y≈36 on this projection. */
export const INDIA_TROPIC_Y = 36
/** 82.5°E standard meridian dashed line at x≈47 on this projection. */
export const INDIA_MERIDIAN_X = 47

export const INDIA_RIVERS: Array<{ key: string; label: string; nodeId: string; pts: string }> = [
  { key: 'indus', label: 'Indus (Sutlej enters India)', nodeId: 'c10_geo_icse_02_002', pts: 'M 55,15 L 47,14 L 38,12 L 29,11 L 21,12' },
  { key: 'ganga', label: 'Ganga', nodeId: 'c10_geo_icse_02_002', pts: 'M 56,23 L 59,27 L 63,30 L 68,32 L 74,35 L 78,37' },
  { key: 'yamuna', label: 'Yamuna', nodeId: 'c10_geo_icse_02_002', pts: 'M 54,24 L 58,28 L 62,31' },
  { key: 'brahmaputra', label: 'Brahmaputra', nodeId: 'c10_geo_icse_02_002', pts: 'M 86,17 L 78,20 L 70,23 L 65,28 L 67,33' },
  { key: 'narmada', label: 'Narmada', nodeId: 'c10_geo_icse_02_002', pts: 'M 42,35 L 34,35 L 26,34 L 17,36' },
  { key: 'tapi', label: 'Tapi', nodeId: 'c10_geo_icse_02_002', pts: 'M 40,38 L 31,37 L 21,38' },
  { key: 'godavari', label: 'Godavari', nodeId: 'c10_geo_icse_02_002', pts: 'M 36,44 L 44,46 L 52,46 L 60,45 L 66,44' },
  { key: 'krishna', label: 'Krishna', nodeId: 'c10_geo_icse_02_002', pts: 'M 34,50 L 42,52 L 50,53 L 58,53' },
  { key: 'kaveri', label: 'Kaveri', nodeId: 'c10_geo_icse_02_002', pts: 'M 32,62 L 40,64 L 48,66 L 53,68' },
  { key: 'mahanadi', label: 'Mahanadi', nodeId: 'c10_geo_icse_02_002', pts: 'M 44,38 L 52,40 L 60,41' },
]

/** Himalayan + peninsular hydro projects (corpus: c10_geo_icse_07_007,
 *  c7_geo_icse_05_005 — Bhakra Nangal, Tehri, Koyna, Srisailam named). */
export const INDIA_POWER_PROJECTS: Array<{
  key: string; dam: string; river: string; state: string; x: number; y: number; nodeId: string
}> = [
  { key: 'bhakra', dam: 'Bhakra Nangal', river: 'Sutlej', state: 'Himachal Pradesh / Punjab', x: 42, y: 13, nodeId: 'c10_geo_icse_07_007' },
  { key: 'tehri', dam: 'Tehri', river: 'Bhagirathi (Ganga headstream)', state: 'Uttarakhand', x: 52, y: 20, nodeId: 'c10_geo_icse_07_007' },
  { key: 'hirakud', dam: 'Hirakud', river: 'Mahanadi', state: 'Odisha', x: 51, y: 40, nodeId: 'c7_geo_icse_05_005' },
  { key: 'sagar', dam: 'Nagarjuna Sagar', river: 'Krishna', state: 'Telangana / Andhra Pradesh', x: 50, y: 53, nodeId: 'c7_geo_icse_05_005' },
  { key: 'srisailam', dam: 'Srisailam', river: 'Krishna', state: 'Andhra Pradesh', x: 55, y: 52, nodeId: 'c10_geo_icse_07_007' },
  { key: 'koyna', dam: 'Koyna', river: 'Koyna (Krishna basin)', state: 'Maharashtra', x: 31, y: 46, nodeId: 'c10_geo_icse_07_007' },
  { key: 'mettur', dam: 'Mettur', river: 'Kaveri', state: 'Tamil Nadu', x: 40, y: 64, nodeId: 'c7_geo_icse_05_005' },
  { key: 'dvc', dam: 'Damodar Valley (DVC)', river: 'Damodar', state: 'Jharkhand / West Bengal', x: 66, y: 34, nodeId: 'c7_geo_icse_05_005' },
]

export const INDIA_FEATURES: MapFeature[] = [
  { key: 'himalayas', label: 'Himalayas', nodeId: 'c6_geo_icse_01_002', x: 56, y: 19, kind: 'mountain', line: [{ x: 28, y: 5 }, { x: 40, y: 10 }, { x: 50, y: 15 }, { x: 58, y: 19 }, { x: 66, y: 22 }, { x: 76, y: 20 }, { x: 84, y: 16 }] },
  { key: 'nplains', label: 'Northern Plains', nodeId: 'c6_geo_icse_01_001', x: 52, y: 26, kind: 'plain', line: [{ x: 28, y: 16 }, { x: 40, y: 19 }, { x: 52, y: 22 }, { x: 64, y: 28 }, { x: 72, y: 31 }] },
  { key: 'thar', label: 'Thar Desert', nodeId: 'c9_geo_icse_06_002', x: 17, y: 21, kind: 'desert' },
  { key: 'deccan', label: 'Deccan Plateau', nodeId: 'c6_geo_icse_01_001', x: 38, y: 48, kind: 'plateau' },
  { key: 'wghats', label: 'Western Ghats (Sahyadri)', nodeId: 'c10_geo_icse_02_002', x: 22, y: 56, kind: 'mountain', line: [{ x: 18, y: 44 }, { x: 21, y: 52 }, { x: 25, y: 62 }, { x: 28, y: 70 }] },
  { key: 'eghats', label: 'Eastern Ghats', nodeId: 'c10_geo_icse_02_002', x: 44, y: 52, kind: 'mountain', line: [{ x: 36, y: 64 }, { x: 41, y: 56 }, { x: 47, y: 50 }, { x: 51, y: 44 }] },
  { key: 'aravalli', label: 'Aravallis', nodeId: 'c6_geo_icse_01_002', x: 24, y: 19, kind: 'mountain', line: [{ x: 21, y: 16 }, { x: 26, y: 21 }] },
  { key: 'konkan', label: 'Konkan & Malabar coast', nodeId: 'c10_geo_icse_02_002', x: 20, y: 58, kind: 'coast' },
  { key: 'coromandel', label: 'Coromandel coast', nodeId: 'c10_geo_icse_02_002', x: 39, y: 63, kind: 'coast' },
  { key: 'andaman', label: 'Andaman & Nicobar Islands', nodeId: 'c10_geo_icse_02_002', x: 78, y: 72, kind: 'island' },
  { key: 'lakshadweep', label: 'Lakshadweep', nodeId: 'c10_geo_icse_02_002', x: 14, y: 67, kind: 'island' },
]

// --------------------------------------------------------------- AFRICA --

export const AFRICA_OUTLINE = `
M 16,10 L 22,7 L 30,6 L 36,10 L 44,8 L 52,10 L 58,6 L 66,7 L 71,12 L 74,20
L 80,28 L 86,31 L 90,33 L 84,40 L 76,48 L 70,56 L 66,64 L 62,72 L 56,82
L 48,92 L 42,97 L 36,95 L 32,86 L 30,74 L 30,64 L 28,56 L 24,52 L 26,48
L 20,48 L 12,46 L 6,42 L 0,34 L 2,26 L 8,20 L 12,14 Z`

export const AFRICA_MADAGASCAR = 'M 78,66 L 83,70 L 82,78 L 77,76 Z'

export const AFRICA_FEATURES: MapFeature[] = [
  { key: 'sahara', label: 'Sahara Desert', nodeId: 'c9_geo_icse_06_002', x: 32, y: 22, kind: 'desert' },
  { key: 'atlas', label: 'Atlas Mountains', nodeId: 'c7_geo_icse_06_007', x: 17, y: 9, kind: 'mountain', line: [{ x: 12, y: 9 }, { x: 22, y: 8 }] },
  { key: 'nile', label: 'Nile River', nodeId: 'c7_geo_icse_06_007', x: 64, y: 22, kind: 'river', line: [{ x: 66, y: 8 }, { x: 65, y: 14 }, { x: 64, y: 22 }, { x: 62, y: 30 }, { x: 63, y: 36 }, { x: 66, y: 42 }] },
  { key: 'victoria', label: 'Lake Victoria', nodeId: 'c7_geo_icse_06_007', x: 67, y: 43, kind: 'water' },
  { key: 'congo', label: 'Congo Basin & River', nodeId: 'c7_geo_icse_06_010', x: 42, y: 52, kind: 'river', line: [{ x: 28, y: 52 }, { x: 34, y: 50 }, { x: 40, y: 50 }, { x: 46, y: 52 }] },
  { key: 'niger', label: 'Niger River', nodeId: 'c7_geo_icse_06_010', x: 14, y: 36, kind: 'river', line: [{ x: 2, y: 30 }, { x: 10, y: 34 }, { x: 16, y: 40 }, { x: 20, y: 46 }, { x: 24, y: 48 }] },
  { key: 'rift', label: 'East African Rift Valley', nodeId: 'c6_geo_icse_01_017', x: 62, y: 46, kind: 'plain', line: [{ x: 60, y: 30 }, { x: 64, y: 40 }, { x: 64, y: 50 }, { x: 60, y: 60 }] },
  { key: 'kilimanjaro', label: 'Mt Kilimanjaro (volcanic)', nodeId: 'c6_geo_icse_01_009', x: 69, y: 56, kind: 'mountain' },
  { key: 'ethiopia', label: 'Ethiopian Highlands', nodeId: 'c7_geo_icse_06_002', x: 76, y: 32, kind: 'plateau' },
  { key: 'kalahari', label: 'Kalahari Desert', nodeId: 'c9_geo_icse_06_002', x: 44, y: 84, kind: 'desert' },
  { key: 'cape', label: 'Cape of Good Hope', nodeId: 'c7_geo_icse_06_012', x: 37, y: 95, kind: 'coast' },
  { key: 'madagascar', label: 'Madagascar', nodeId: 'c7_geo_icse_06_007', x: 80, y: 72, kind: 'island' },
]

// ----------------------------------------------------------------- ASIA --

export const ASIA_OUTLINE = `
M 25,2 L 60,2 L 78,4 L 90,10 L 88,18 L 80,24 L 78,32 L 72,38 L 70,46 L 68,54
L 64,50 L 62,44 L 58,40 L 56,36 L 52,38 L 52,50 L 54,62 L 52,66 L 49,60
L 48,46 L 44,42 L 40,46 L 36,54 L 32,58 L 27,63 L 24,58 L 26,50 L 28,44
L 24,38 L 25,28 L 25,8 Z`

export const ASIA_FEATURES: MapFeature[] = [
  { key: 'urals', label: 'Ural Mountains', nodeId: 'c8_geo_icse_05_003', x: 25, y: 18, kind: 'mountain', line: [{ x: 25, y: 8 }, { x: 25, y: 28 }] },
  { key: 'siberia', label: 'North Asia (Siberia)', nodeId: 'c8_geo_icse_05_003', x: 38, y: 12, kind: 'plain' },
  { key: 'centralasia', label: 'Central Asia (-stan lands)', nodeId: 'c8_geo_icse_05_004', x: 38, y: 24, kind: 'plain' },
  { key: 'gobi', label: 'Gobi Desert', nodeId: 'c8_geo_icse_05_009', x: 56, y: 24, kind: 'desert' },
  { key: 'tibetan', label: 'Tibetan Plateau', nodeId: 'c9_geo_icse_07_013', x: 54, y: 33, kind: 'plateau' },
  { key: 'himalayas_a', label: 'Himalayas', nodeId: 'c8_geo_icse_05_005', x: 52, y: 37, kind: 'mountain', line: [{ x: 44, y: 38 }, { x: 52, y: 36 }, { x: 60, y: 38 }] },
  { key: 'indus_a', label: 'Indus River', nodeId: 'c8_geo_icse_05_007', x: 48, y: 42, kind: 'river', line: [{ x: 52, y: 36 }, { x: 48, y: 42 }, { x: 46, y: 46 }] },
  { key: 'ganga_a', label: 'Ganga River basin', nodeId: 'c8_geo_icse_05_007', x: 56, y: 40, kind: 'river', line: [{ x: 52, y: 38 }, { x: 56, y: 40 }, { x: 60, y: 41 }] },
  { key: 'yangtze', label: 'Yangtze River', nodeId: 'c8_geo_icse_05_007', x: 66, y: 32, kind: 'river', line: [{ x: 58, y: 32 }, { x: 66, y: 32 }, { x: 74, y: 34 }] },
  { key: 'mekong', label: 'Mekong River', nodeId: 'c8_geo_icse_05_007', x: 64, y: 46, kind: 'river', line: [{ x: 62, y: 40 }, { x: 64, y: 46 }, { x: 66, y: 52 }] },
  { key: 'ob', label: 'Ob River (Siberian basin)', nodeId: 'c8_geo_icse_05_007', x: 31, y: 8, kind: 'river', line: [{ x: 32, y: 12 }, { x: 30, y: 4 }] },
  { key: 'arabia', label: 'Arabian Peninsula', nodeId: 'c8_geo_icse_05_009', x: 30, y: 55, kind: 'desert' },
  { key: 'india_pen', label: 'India (peninsular plateau)', nodeId: 'c8_geo_icse_05_006', x: 51, y: 48, kind: 'plateau' },
  { key: 'japan', label: 'Japan (island arc)', nodeId: 'c8_geo_icse_05_008', x: 82, y: 24, kind: 'island' },
  { key: 'indo_isles', label: 'Indonesia & Malaysia (islands)', nodeId: 'c8_geo_icse_05_008', x: 72, y: 62, kind: 'island' },
]

// --------------------------------------------------------------- EUROPE --

export const EUROPE_OUTLINE = `
M 34,2 L 26,6 L 22,14 L 26,22 L 30,26 L 32,28 L 34,22 L 36,12 L 40,6
L 42,12 L 40,18 L 46,20 L 48,24 L 46,28 L 50,30 L 56,30 L 62,32 L 66,38
L 62,44 L 58,46 L 56,50 L 60,54 L 54,56 L 52,62 L 48,56 L 44,52 L 40,50
L 42,56 L 46,61 L 43,63 L 38,56 L 34,50 L 30,48 L 28,50 L 24,54 L 16,66
L 12,60 L 14,52 L 22,44 L 20,40 L 24,36 L 28,32 L 30,30 L 32,30 L 34,24
L 36,30 L 40,30 L 44,29 Z`

export const EUROPE_UK = 'M 24,16 L 28,14 L 30,20 L 28,28 L 25,26 Z'
export const EUROPE_IRELAND = 'M 19,24 L 22,23 L 22,28 L 19,28 Z'

export const EUROPE_FEATURES: MapFeature[] = [
  { key: 'uk', label: 'United Kingdom', nodeId: 'c7_geo_icse_06_011', x: 26, y: 21, kind: 'country' },
  { key: 'france', label: 'France', nodeId: 'c7_geo_icse_06_001', x: 28, y: 41, kind: 'country' },
  { key: 'spain', label: 'Spain & Portugal', nodeId: 'c7_geo_icse_06_001', x: 20, y: 58, kind: 'country' },
  { key: 'germany', label: 'Germany', nodeId: 'c7_geo_icse_06_011', x: 38, y: 28, kind: 'country' },
  { key: 'italy', label: 'Italy', nodeId: 'c7_geo_icse_06_001', x: 41, y: 54, kind: 'country' },
  { key: 'norway', label: 'Norway & Sweden', nodeId: 'c7_geo_icse_06_011', x: 27, y: 14, kind: 'country' },
  { key: 'poland', label: 'Poland', nodeId: 'c7_geo_icse_06_011', x: 47, y: 27, kind: 'country' },
  { key: 'ukraine', label: 'Ukraine', nodeId: 'c7_geo_icse_06_011', x: 61, y: 34, kind: 'country' },
  { key: 'greece', label: 'Greece', nodeId: 'c7_geo_icse_06_001', x: 52, y: 58, kind: 'country' },
  { key: 'alps', label: 'The Alps', nodeId: 'c7_geo_icse_06_011', x: 36, y: 45, kind: 'mountain', line: [{ x: 30, y: 47 }, { x: 36, y: 44 }, { x: 42, y: 47 }] },
  { key: 'rhine', label: 'Rhine River', nodeId: 'c7_geo_icse_06_011', x: 34, y: 34, kind: 'river', line: [{ x: 36, y: 22 }, { x: 33, y: 34 }, { x: 30, y: 44 }] },
  { key: 'danube', label: 'Danube River', nodeId: 'c7_geo_icse_06_011', x: 50, y: 45, kind: 'river', line: [{ x: 38, y: 44 }, { x: 46, y: 45 }, { x: 56, y: 44 }, { x: 60, y: 44 }] },
  { key: 'med', label: 'Mediterranean Sea', nodeId: 'c7_geo_icse_06_001', x: 36, y: 66, kind: 'water' },
]

// ------------------------------------------------- CONTOUR-READER LAB ----

export type ContourPatternKey =
  | 'conical-hill' | 'valley' | 'spur' | 'ridge' | 'cliff' | 'saddle' | 'plateau'

export const CONTOUR_PATTERNS: Array<{
  key: ContourPatternKey
  label: string
  nodeId: string
  /** Height function over a normalised 0-1 field (u = east, v = south). */
  height: (u: number, v: number) => number
}> = [
  {
    key: 'conical-hill', label: 'Conical hill', nodeId: 'c7_geo_icse_07_002',
    height: (u, v) => 100 * Math.exp(-(((u - 0.5) ** 2 + (v - 0.5) ** 2)) / 0.09),
  },
  {
    key: 'valley', label: 'River valley (V points upstream)', nodeId: 'c7_geo_icse_07_002',
    height: (u, v) => 70 * u + 30 - 90 * Math.exp(-(((v - 0.5) ** 2)) / 0.012) * Math.min(1, u * 2),
  },
  {
    key: 'spur', label: 'Spur (contours bulge downhill)', nodeId: 'c7_geo_icse_07_002',
    height: (u, v) => 70 * u + 30 + 45 * Math.exp(-(((v - 0.5) ** 2)) / 0.02) * Math.min(1, u * 1.6),
  },
  {
    key: 'ridge', label: 'Elongated ridge', nodeId: 'c7_geo_icse_07_002',
    height: (u, v) => 95 * Math.exp(-((v - 0.5) ** 2) / 0.02) * Math.exp(-((u - 0.5) ** 2) / 0.2),
  },
  {
    key: 'cliff', label: 'Cliff (contours merge)', nodeId: 'c7_geo_icse_07_003',
    height: (u, v) => 100 / (1 + Math.exp(-(u - 0.45) * 60)),
  },
  {
    key: 'saddle', label: 'Saddle between two hills', nodeId: 'c7_geo_icse_07_002',
    height: (u, v) =>
      90 * Math.exp(-(((u - 0.28) ** 2 + (v - 0.5) ** 2)) / 0.035) +
      90 * Math.exp(-(((u - 0.72) ** 2 + (v - 0.5) ** 2)) / 0.035),
  },
  {
    key: 'plateau', label: 'Plateau (flat top, steep edge)', nodeId: 'c6_geo_icse_01_001',
    height: (u, v) => {
      const d = Math.max(Math.abs(u - 0.5), Math.abs(v - 0.5))
      return 90 / (1 + Math.exp((d - 0.28) * 45))
    },
  },
]

export const CONTOUR_LEVELS = [10, 20, 30, 40, 50, 60, 70, 80, 90]

/**
 * marchingSquares — deterministic iso-line extraction for the contour
 * lab. Returns SVG path segment strings for one contour level over an
 * N×N sampled field of `height` (u,v in 0-1 mapped to the view box).
 */
export function contourPath(
  height: (u: number, v: number) => number,
  level: number,
  size: number,
  n = 56,
): string {
  let d = ''
  const val = (i: number, j: number) => height(i / n, j / n)
  const interp = (a: number, b: number) => (level - a) / (b - a)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const tl = val(i, j), tr = val(i + 1, j), br = val(i + 1, j + 1), bl = val(i, j + 1)
      // corner booleans: above-level → 1
      const c = (tl > level ? 8 : 0) | (tr > level ? 4 : 0) | (br > level ? 2 : 0) | (bl > level ? 1 : 0)
      if (c === 0 || c === 15) continue
      const x0 = (i / n) * size, x1 = ((i + 1) / n) * size
      const y0 = (j / n) * size, y1 = ((j + 1) / n) * size
      // edge crossing points
      const top = { x: x0 + (x1 - x0) * interp(tl, tr), y: y0 }
      const right = { x: x1, y: y0 + (y1 - y0) * interp(tr, br) }
      const bottom = { x: x0 + (x1 - x0) * interp(bl, br), y: y1 }
      const left = { x: x0, y: y0 + (y1 - y0) * interp(tl, bl) }
      const seg = (p: { x: number; y: number }, q: { x: number; y: number }) => {
        d += `M ${p.x.toFixed(1)},${p.y.toFixed(1)} L ${q.x.toFixed(1)},${q.y.toFixed(1)} `
      }
      switch (c) {
        case 1: case 14: seg(left, bottom); break
        case 2: case 13: seg(bottom, right); break
        case 3: case 12: seg(left, right); break
        case 4: case 11: seg(top, right); break
        case 5: seg(left, top); seg(bottom, right); break
        case 6: case 9: seg(top, bottom); break
        case 7: case 8: seg(left, top); break
        case 10: seg(left, bottom); seg(top, right); break
      }
    }
  }
  return d
}

/** 4-figure grid-reference drill (corpus: c10_geo_icse_01_001). */
export const GRID_REF_QUIZ = {
  eastings: ['04', '05', '06', '07', '08'],
  northings: ['94', '93', '92', '91', '90'],
  items: [
    { key: 'temple', label: 'temple', sym: '▲', cell: [2, 1] as const, ref: '0609' },
    { key: 'well', label: 'open well', sym: '○', cell: [0, 3] as const, ref: '0491' },
    { key: 'settlement', label: 'settlement', sym: '•••', cell: [3, 2] as const, ref: '0709' },
    { key: 'police', label: 'police station', sym: 'PS', cell: [1, 0] as const, ref: '0594' },
  ],
}

// ------------------------------------------------ CLIMATE-GRAPH (E1) -----

/** Monthly climate normals per natural region — encodes the authored
 *  signatures of c9_geo_icse_06_002 (temp °C, rain mm/month). */
export interface ClimatePreset {
  key: string
  label: string
  hint: string
  nodeId: string
  temps: number[]
  rain: number[]
}

export const CLIMATE_PRESETS: ClimatePreset[] = [
  {
    key: 'equatorial', label: 'Equatorial', nodeId: 'c9_geo_icse_06_002',
    hint: 'hot & wet all year; convectional afternoon rain; annual range barely 2-3°C',
    temps: [26, 26, 26.5, 27, 27, 27, 27, 27, 27, 27, 26.5, 26],
    rain: [190, 180, 210, 190, 175, 165, 155, 165, 195, 205, 200, 205],
  },
  {
    key: 'monsoon', label: 'Tropical Monsoon Lands', nodeId: 'c9_geo_icse_06_002',
    hint: 'seasonal reversal: torrential SW-monsoon summer rain, dry cooler winter',
    temps: [24, 26, 30, 33, 33, 30, 28, 28, 29, 29, 26, 24],
    rain: [15, 15, 10, 15, 45, 190, 290, 270, 220, 90, 20, 10],
  },
  {
    key: 'hotdesert', label: 'Tropical (Hot) Desert', nodeId: 'c9_geo_icse_06_002',
    hint: 'under 250 mm unreliable rain; fierce day heat, cool nights — huge diurnal range',
    temps: [18, 21, 25, 29, 32, 34, 35, 34, 32, 28, 22, 18],
    rain: [5, 3, 2, 1, 1, 0, 0, 0, 0, 1, 2, 3],
  },
  {
    key: 'grassland', label: 'Temperate Grasslands', nodeId: 'c9_geo_icse_06_002',
    hint: 'continental interior: 250-750 mm summer-max rain, hot summer, severe winter',
    temps: [-4, -2, 4, 11, 17, 22, 24, 23, 17, 10, 2, -2],
    rain: [20, 20, 30, 45, 60, 70, 65, 60, 45, 40, 30, 25],
  },
  {
    key: 'mediterranean', label: 'Mediterranean', nodeId: 'c9_geo_icse_06_002',
    hint: 'two seasons: hot rainless summer, mild wet winter — winter-maximum rain',
    temps: [10, 11, 13, 16, 20, 24, 27, 27, 24, 19, 14, 11],
    rain: [80, 75, 60, 45, 30, 12, 3, 8, 25, 65, 80, 85],
  },
  {
    key: 'taiga', label: 'Taiga (Coniferous Forest)', nodeId: 'c9_geo_icse_06_002',
    hint: 'cool short summer, long severe winter; modest precip, slight summer max',
    temps: [-16, -13, -6, 4, 11, 16, 18, 16, 10, 3, -7, -14],
    rain: [25, 20, 25, 25, 40, 55, 70, 65, 50, 40, 35, 30],
  },
  {
    key: 'tundra', label: 'Tundra', nodeId: 'c9_geo_icse_06_002',
    hint: 'warmest month under 10°C; permafrost; low precipitation in any form',
    temps: [-26, -27, -24, -16, -6, 1, 6, 5, -1, -9, -18, -24],
    rain: [15, 12, 12, 12, 12, 20, 30, 30, 22, 18, 15, 15],
  },
]

export const MONTH_LABELS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

/**
 * classifyClimate — deterministic nearest-signature solver: compares a
 * 12-month temp/rain pair against the authored presets (L2 distance on
 * z-scored temperature + log-rain vectors) and returns the ranking.
 */
export function classifyClimate(temps: number[], rain: number[]):
  Array<{ key: string; label: string; score: number }> {
  const z = (v: number[]) => {
    const mu = v.reduce((a, b) => a + b, 0) / v.length
    const sd = Math.sqrt(v.reduce((a, b) => a + (b - mu) ** 2, 0) / v.length) || 1
    return v.map(x => (x - mu) / sd)
  }
  const tz = z(temps)
  const lr = rain.map(r => Math.log10(r + 2))
  const lrz = z(lr)
  return CLIMATE_PRESETS.map(p => {
    const ptz = z(p.temps)
    const plr = z(p.rain.map(r => Math.log10(r + 2)))
    let d = 0
    for (let i = 0; i < 12; i++) {
      d += (tz[i] - ptz[i]) ** 2 + (lrz[i] - plr[i]) ** 2
    }
    return { key: p.key, label: p.label, score: Math.sqrt(d) }
  }).sort((a, b) => a.score - b.score)
}

// ------------------------------------------------- MONSOON ANIMATION -----

export interface MonsoonPhase {
  key: string
  label: string
  months: string
  /** Wind arrows: [fromX, fromY, toX, toY] in India-map units. */
  arrows: Array<[number, number, number, number]>
  /** Rain blobs: cx, cy, rx, ry, opacity 0-1. */
  rain: Array<[number, number, number, number, number]>
  lowOverNW?: boolean
  /** Authored corpus node driving the phase's explanation text. */
  nodeId: string
}

export const MONSOON_PHASES: MonsoonPhase[] = [
  {
    key: 'winter', label: 'Winter — NE monsoon (dry)', months: 'Dec-Jan',
    arrows: [[62, 18, 54, 30], [72, 22, 62, 32], [48, 16, 40, 26]],
    rain: [[69, 30, 3.5, 5, 0.55]],
    nodeId: 'c10_geo_icse_03_003',
  },
  {
    key: 'premonsoon', label: 'Pre-monsoon — thermal low builds', months: 'Mar-May',
    arrows: [],
    rain: [[22, 20, 4, 3, 0.15]],
    lowOverNW: true,
    nodeId: 'c10_geo_icse_03_003',
  },
  {
    key: 'onset', label: 'Onset — SW monsoon strikes Kerala', months: 'early June',
    arrows: [[4, 48, 20, 60], [8, 40, 22, 50], [6, 56, 24, 66]],
    rain: [[22, 66, 3, 7, 0.8], [26, 48, 3, 5, 0.5]],
    nodeId: 'c10_geo_icse_03_003',
  },
  {
    key: 'advance', label: 'Advance — country swept by rain', months: 'Jun-Jul',
    arrows: [[4, 44, 26, 54], [10, 36, 34, 40], [70, 48, 56, 34], [78, 52, 64, 38]],
    rain: [[24, 58, 4, 8, 0.85], [40, 30, 8, 4, 0.7], [74, 26, 4, 3, 0.6], [56, 44, 6, 6, 0.45]],
    nodeId: 'c10_geo_icse_03_003',
  },
  {
    key: 'retreat', label: 'Retreat — rains withdraw south', months: 'Sep-Oct',
    arrows: [[26, 50, 8, 42], [60, 36, 74, 44]],
    rain: [[24, 66, 3, 6, 0.5], [40, 36, 6, 3, 0.25]],
    nodeId: 'c10_geo_icse_03_003',
  },
  {
    key: 'ne', label: 'NE monsoon — Tamil Nadu coast rain', months: 'Nov-Dec',
    arrows: [[58, 22, 46, 32], [50, 18, 40, 28]],
    rain: [[38, 68, 4, 4, 0.7]],
    nodeId: 'c10_geo_icse_03_003',
  },
]

// --------------------------------------------- GEOSURVEY DATA (c8/c7) ----

/** India electricity generation, approximate shares (corpus framing:
 *  c7_geo_icse_05_011 pie-chart node + c10_geo_icse_07_007 energy belts:
 *  coal dominates; hydro at Bhakra Nangal/Tehri/Koyna/Srisailam; solar &
 *  wind lead in Rajasthan/Gujarat/Tamil Nadu). */
export const ENERGY_PIE: Array<{ label: string; pct: number; renewable: boolean; nodeId: string }> = [
  { label: 'Coal', pct: 70, renewable: false, nodeId: 'c7_geo_icse_05_004' },
  { label: 'Hydro', pct: 10, renewable: true, nodeId: 'c7_geo_icse_05_005' },
  { label: 'Wind + Solar', pct: 12, renewable: true, nodeId: 'c7_geo_icse_05_003' },
  { label: 'Natural gas', pct: 4, renewable: false, nodeId: 'c7_geo_icse_05_004' },
  { label: 'Nuclear', pct: 3, renewable: false, nodeId: 'c7_geo_icse_05_002' },
  { label: 'Biomass & other', pct: 1, renewable: true, nodeId: 'c7_geo_icse_05_003' },
]

/** Renewable vs non-renewable sort drill (corpus: c7_geo_icse_05_002-004). */
export const ENERGY_SORT: Array<{ item: string; renewable: boolean; nodeId: string }> = [
  { item: 'Sunlight (solar)', renewable: true, nodeId: 'c7_geo_icse_05_003' },
  { item: 'Wind', renewable: true, nodeId: 'c7_geo_icse_05_003' },
  { item: 'River water (hydro)', renewable: true, nodeId: 'c7_geo_icse_05_005' },
  { item: 'Plant waste (biomass)', renewable: true, nodeId: 'c7_geo_icse_05_003' },
  { item: 'Coal', renewable: false, nodeId: 'c7_geo_icse_05_004' },
  { item: 'Petrol / crude oil', renewable: false, nodeId: 'c7_geo_icse_05_004' },
  { item: 'Natural gas', renewable: false, nodeId: 'c7_geo_icse_05_004' },
]

/** Census of India decadal population, millions (drives the growth graph;
 *  density/distribution framing from c8_geo_icse_01_001-004). */
export const POPULATION_CENSUS: Array<{ year: number; millions: number }> = [
  { year: 1951, millions: 361 }, { year: 1961, millions: 439 },
  { year: 1971, millions: 548 }, { year: 1981, millions: 683 },
  { year: 1991, millions: 846 }, { year: 2001, millions: 1028 },
  { year: 2011, millions: 1210 },
]

/** Disaster information-source drill (corpus: c8_geo_icse_04_006-013). */
export const DISASTER_SOURCES: Array<{
  scenario: string; answer: string; distractors: string[]; nodeId: string
}> = [
  {
    scenario: 'Daily reports of a flood as it happens, city by city',
    answer: 'Newspaper', distractors: ['Mock drill', 'Case study', 'Documentary'], nodeId: 'c8_geo_icse_04_008',
  },
  {
    scenario: 'Months later: WHY the 2018 Kerala floods unfolded the way they did',
    answer: 'Journal / magazine', distractors: ['Newspaper', 'Discussion', 'Internet'], nodeId: 'c8_geo_icse_04_009',
  },
  {
    scenario: 'A detective-notebook deep study of one single disaster',
    answer: 'Case study', distractors: ['Newspaper', 'Documentary', 'Photograph'], nodeId: 'c8_geo_icse_04_010',
  },
  {
    scenario: 'Real-time satellite images and official warnings on your screen',
    answer: 'Internet', distractors: ['Journal', 'Mock drill', 'Newspaper'], nodeId: 'c8_geo_icse_04_011',
  },
  {
    scenario: 'Practising drop-cover-hold BEFORE an earthquake ever comes',
    answer: 'Mock drill', distractors: ['Case study', 'Internet', 'Journal'], nodeId: 'c8_geo_icse_04_012',
  },
  {
    scenario: 'Seeing a storm surge actually wash away a coastal settlement',
    answer: 'Documentary / photograph', distractors: ['Discussion', 'Newspaper', 'Mock drill'], nodeId: 'c8_geo_icse_04_006',
  },
]

/** World population distribution concept (corpus: c8_geo_icse_01_001 —
 *  crowded monsoon lands vs near-empty deserts, high mountains, poles). */
export const POPULATION_HOTSPOTS: Array<{ label: string; crowded: boolean; why: string; nodeId: string }> = [
  { label: 'Monsoon Asia (Ganga plain, Java, Japan)', crowded: true, why: 'fertile plains + reliable rain + long farming history', nodeId: 'c8_geo_icse_01_001' },
  { label: 'Western Europe', crowded: true, why: 'industrialisation, mild climate, good transport', nodeId: 'c8_geo_icse_01_001' },
  { label: 'Eastern North America', crowded: true, why: 'industrial + urban concentration', nodeId: 'c8_geo_icse_01_001' },
  { label: 'Sahara & Arabian deserts', crowded: false, why: 'extreme aridity — water, not heat, is the limit', nodeId: 'c8_geo_icse_01_001' },
  { label: 'Amazon & Congo rainforests', crowded: false, why: 'heat, humidity, disease, poor soils under the forest', nodeId: 'c8_geo_icse_01_001' },
  { label: 'Polar lands (Antarctica, Greenland)', crowded: false, why: 'perpetual cold; no agriculture possible', nodeId: 'c8_geo_icse_01_001' },
  { label: 'High mountains (Tibet, Andes core)', crowded: false, why: 'rugged relief, thin soils, short growing season', nodeId: 'c8_geo_icse_01_001' },
]
