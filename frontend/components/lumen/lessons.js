export const VIEW_TILT = (58 * Math.PI) / 180
// The hole reads best near-edge-on (Interstellar): the disk becomes a thin
// blade across the silhouette, with the lensed halo arcing over the top.
// sin(tilt) is the on-screen ellipse ratio, so 7° ≈ 0.12 — a blade.
export const HOLE_TILT = (7 * Math.PI) / 180

export const LESSONS = {
  solar: {
    id: 'solar',
    index: '01',
    subject: 'Astronomy',
    title: 'Solar System',
    lede: 'A star, eight worlds, and a thin disk of leftover ice. Gravity writes ellipses. Distance writes time.',
    grade: 'Grades 6–9',
    facts: [
      'Inner worlds are rocky. Outer worlds are gas and ice giants.',
      'Kepler’s law: closer planets sweep faster. Mercury sprints. Neptune crawls.',
      'If the Sun were a grapefruit, Earth would be a peppercorn about 15 meters away.'
    ],
    tryThis: 'Your pointer is a passing mass. Nudge a world off its path, then watch gravity remember the orbit.',
    colors: {
      a: '#a8dcc8',
      b: '#8fb8d8',
      c: '#d4b8e6',
      core: '#ffe8c4'
    },
    tint: [0.05, 0.08, 0.09],
    hold: 2.55,
    noise: 0.1,
    spin: 0.04,
    orbit: 0.0,
    kepler: 1.35,
    friction: 0.972,
    bloom: 0.27,
    labels: []
  },
  galaxy: {
    id: 'galaxy',
    index: '02',
    subject: 'Astronomy',
    title: 'Milky Way',
    lede: 'Four hundred billion suns, wound into a barred spiral. We live on a minor arm, looking in.',
    grade: 'Grades 6–10',
    facts: [
      'The Milky Way is a barred spiral about 100,000 light-years across.',
      'The bright center is not a second sun — it is a packed bulge around a black hole.',
      'Our solar system sits in the Orion Arm, roughly 27,000 light-years from the core.'
    ],
    tryThis: 'Your pointer is a tidal force. Tear an arm, then let differential rotation spin the disk back together.',
    colors: {
      a: '#9fe4e2',
      b: '#a9a4f0',
      c: '#dcb8f0',
      core: '#ffedbe'
    },
    tint: [0.05, 0.06, 0.11],
    hold: 1.85,
    noise: 0.08,
    spin: 0.04,
    orbit: 0.0,
    kepler: 0.5,
    shear: 0.35,
    friction: 0.97,
    bloom: 0.34,
    labels: []
  },
  hole: {
    id: 'hole',
    index: '03',
    subject: 'Physics',
    title: 'Black Hole',
    lede: 'An event horizon. No surface. No light. Matter falls, time stretches, and the disk screams in X-rays.',
    grade: 'Grades 8–12',
    facts: [
      'The event horizon is a boundary, not a thing. Inside, light cannot climb out.',
      'The glowing ring is an accretion disk — gas heated by friction as it spirals in.',
      'Jets fire along the spin axis, driven by twisted magnetic fields.'
    ],
    tryThis: 'The hole is still. The disk is not. Watch gas shear, fall, and vanish. Stir it if you dare.',
    colors: {
      a: '#ffbe78',
      b: '#f7dfae',
      c: '#93b4ec',
      core: '#fff6e4'
    },
    tint: [0.05, 0.05, 0.09],
    hold: 1.35,
    noise: 0.07,
    spin: 0.0,
    orbit: 0.0,
    kepler: 1.7,
    shear: 1.45,
    tilt: HOLE_TILT,
    friction: 0.982,
    bloom: 0.36,
    labels: []
  }
}

export const LESSON_ORDER = ['solar', 'galaxy', 'hole']

let ACTIVE_TILT = VIEW_TILT

export function applyTilt(x, y, z) {
  const c = Math.cos(ACTIVE_TILT)
  const s = Math.sin(ACTIVE_TILT)
  return [x, y * c - z * s, y * s + z * c]
}

export function generateCloud(lessonId, bounds) {
  ACTIVE_TILT = lessonId === 'hole' ? HOLE_TILT : VIEW_TILT
  const extent = Math.min(bounds.x, bounds.y) * 0.42
  if (lessonId === 'galaxy') return generateGalaxy(extent)
  if (lessonId === 'hole') return generateHole(extent)
  ACTIVE_TILT = VIEW_TILT
  return generateSolar(extent)
}

function generateSolar(extent) {
  const points = []
  const sunR = extent * 0.15

  // sun — sparse and wide: a warm heart, never a white blast
  for (let i = 0; i < 14000; i += 1) {
    const p = randomInSphere(sunR * (i < 9000 ? 0.72 : 1))
    pushTilted(points, p[0], p[1], p[2], i % 9 === 0 ? 0.18 : 0.1)
  }

  const planets = [
    { r: 0.2, s: 0.018, n: 4200, role: 0.32, ring: 9000 },
    { r: 0.28, s: 0.028, n: 6400, role: 0.38, ring: 10000 },
    { r: 0.38, s: 0.03, n: 7800, role: 0.58, ring: 11000 },
    { r: 0.48, s: 0.022, n: 5200, role: 0.44, ring: 9000 },
    { r: 0.64, s: 0.07, n: 18000, role: 0.26, ring: 14000 },
    { r: 0.78, s: 0.058, n: 14000, role: 0.34, ring: 12000, belt: true },
    { r: 0.9, s: 0.04, n: 8000, role: 0.86, ring: 10000 },
    { r: 1.0, s: 0.038, n: 7600, role: 0.94, ring: 10000 }
  ]

  for (const planet of planets) {
    const orbitR = planet.r * extent
    const angle = planet.r * 12.7
    const px = Math.cos(angle) * orbitR
    const pz = Math.sin(angle) * orbitR
    const body = planet.s * extent * 1.4

    for (let i = 0; i < planet.n; i += 1) {
      const p = randomInSphere(body)
      pushTilted(points, px + p[0], p[1] * 0.85, pz + p[2], planet.role)
    }

    addOrbit(points, orbitR, planet.ring * 0.7, 0.012 * extent, planet.role * 0.7 + 0.15)

    if (planet.belt) {
      for (let i = 0; i < 18000; i += 1) {
        const a = Math.random() * Math.PI * 2
        const rr = orbitR + (Math.random() - 0.5) * extent * 0.09
        const y = (Math.random() - 0.5) * extent * 0.012
        pushTilted(points, Math.cos(a) * rr, y, Math.sin(a) * rr, 0.48)
      }
    }
  }

  for (let i = 0; i < 14000; i += 1) {
    const a = Math.random() * Math.PI * 2
    const rr = extent * (0.52 + Math.random() * 0.08)
    const y = (Math.random() - 0.5) * extent * 0.01
    pushTilted(points, Math.cos(a) * rr, y, Math.sin(a) * rr, 0.5)
  }

  return pack(points)
}

function addOrbit(points, radius, count, thickness, role) {
  for (let i = 0; i < count; i += 1) {
    const a = (i / count) * Math.PI * 2
    const r = radius + (Math.random() - 0.5) * thickness * 3
    const y = (Math.random() - 0.5) * thickness
    pushTilted(points, Math.cos(a) * r, y, Math.sin(a) * r, role)
  }
}

function generateGalaxy(extent) {
  const points = []

  for (let i = 0; i < 14000; i += 1) {
    const x = (Math.random() - 0.5) * extent * 0.52
    const z = (Math.random() - 0.5) * extent * 0.09
    const y = (Math.random() - 0.5) * extent * 0.045
    pushTilted(points, x, y, z, 0.1)
  }

  for (let i = 0; i < 9000; i += 1) {
    const p = randomInSphere(extent * 0.11)
    p[0] *= 1.9
    p[1] *= 0.4
    p[2] *= 0.55
    pushTilted(points, p[0], p[1], p[2], 0.06)
  }

  const arms = 4
  const pitch = 0.3
  for (let arm = 0; arm < arms; arm += 1) {
    const offset = (arm / arms) * Math.PI * 2
    for (let i = 0; i < 30000; i += 1) {
      const t = Math.pow(Math.random(), 0.62)
      const r = extent * (0.16 + t * 0.84)
      const a = offset + Math.log(r / (extent * 0.16)) / pitch + (Math.random() - 0.5) * (0.12 + t * 0.26)
      const x = Math.cos(a) * r
      const z = Math.sin(a) * r
      const y = (Math.random() - 0.5) * extent * 0.03 * (1 - t * 0.7)
      const role = t < 0.28 ? 0.24 : t < 0.62 ? 0.6 : 0.9
      pushTilted(points, x, y, z, role)
    }
  }

  for (let i = 0; i < 12000; i += 1) {
    const a = Math.random() * Math.PI * 2
    const r = extent * Math.pow(Math.random(), 0.45) * 0.88
    const y = (Math.random() - 0.5) * extent * 0.018 * (1 - r / extent)
    pushTilted(points, Math.cos(a) * r, y, Math.sin(a) * r, 0.48)
  }

  return pack(points)
}

function generateHole(extent) {
  const points = []
  const horizon = extent * 0.26
  const diskInner = horizon * 1.35
  const diskOuter = extent * 0.5

  // accretion disk — t^0.72 spreads density so the inner edge stays hot
  // without blowing out to a white blob; the approaching side (cos a > 0)
  // keeps more particles (Doppler beaming cue)
  for (let i = 0; i < 110000; i += 1) {
    const t = Math.pow(Math.random(), 0.72)
    const r = diskInner + (diskOuter - diskInner) * t
    const a = Math.random() * Math.PI * 2
    const flare = 0.38 + 0.62 * Math.max(0, Math.cos(a))
    if (Math.random() > 0.18 + flare * 0.82) continue
    const y = (Math.random() - 0.5) * extent * (0.006 + t * 0.006)
    const approaching = Math.cos(a) > 0
    const role = approaching
      ? t < 0.22
        ? 0.14
        : 0.32
      : t < 0.22
        ? 0.44
        : 0.68
    pushTilted(points, Math.cos(a) * r, y, Math.sin(a) * r, role)
  }

  // inner edge glow — the bright rim where the disk plunges
  for (let i = 0; i < 30000; i += 1) {
    const a = Math.random() * Math.PI * 2
    const r = horizon * 1.45 + (Math.random() - 0.5) * extent * 0.02
    const y = (Math.random() - 0.5) * extent * 0.01
    pushTilted(points, Math.cos(a) * r, y, Math.sin(a) * r, 0.16)
  }

  // lensed far side — the Interstellar halo: the disk's image bent above
  // and below the silhouette. Pushed RAW (no tilt): these must hug the
  // silhouette in view space, sitting just behind the hole.
  for (let i = 0; i < 26000; i += 1) {
    const t = Math.random()
    const side = i % 2 === 0 ? 1 : -1
    const a = (Math.random() - 0.5) * 1.9
    const r = horizon * (1.05 + t * 0.24)
    const x = Math.sin(a) * r
    const y = side * (horizon * (1.02 + Math.cos(a) * 0.1 + t * 0.12))
    const z = -horizon * (0.5 - t * 0.45)
    points.push(x, y, z, 0.12 + t * 0.22)
  }

  // jets — collimated beams, deliberately SPARSE: they read as faint
  // light pillars; the accretion disk is the star of the scene
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i < 9000; i += 1) {
      const t = Math.pow(Math.random(), 0.6)
      const y = side * (horizon * 1.25 + t * extent * 1.05)
      const spread = extent * 0.0048 * (0.12 + t * 4.6)
      const x = (Math.random() - 0.5) * spread
      const z = (Math.random() - 0.5) * spread
      points.push(x, y, z, 0.74)
    }
  }

  return pack(points)
}

function pushTilted(points, x, y, z, role) {
  const t = applyTilt(x, y, z)
  points.push(t[0], t[1], t[2], role)
}

function randomInSphere(radius) {
  let x = 0
  let y = 0
  let z = 0
  let d = 2
  while (d > 1) {
    x = Math.random() * 2 - 1
    y = Math.random() * 2 - 1
    z = Math.random() * 2 - 1
    d = x * x + y * y + z * z
  }
  const s = radius * Math.cbrt(Math.random())
  return [x * s, y * s, z * s]
}

function pack(list) {
  return new Float32Array(list)
}

export function fillFromCloud(textureData, size, cloud) {
  const count = size * size
  const n = cloud.length / 4
  for (let i = 0; i < count; i += 1) {
    const pick = (Math.random() * n) | 0
    const src = pick * 4
    const dst = i * 4
    textureData[dst] = cloud[src]
    textureData[dst + 1] = cloud[src + 1]
    textureData[dst + 2] = cloud[src + 2]
    textureData[dst + 3] = cloud[src + 3]
  }
}

export function labelWorld(lesson, bounds) {
  const extent = Math.min(bounds.x, bounds.y) * 0.42
  return lesson.labels.map((label) => {
    const [x, y, z] = applyTilt(
      label.local[0] * extent,
      label.local[1] * extent,
      label.local[2] * extent
    )
    return { ...label, x, y, z }
  })
}
