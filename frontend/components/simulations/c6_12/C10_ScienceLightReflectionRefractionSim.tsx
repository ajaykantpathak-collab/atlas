'use client';
/**
 * C10_ScienceLightReflectionRefractionSim (Class 10 Science)
 *
 * ONE chapter: Light -- Reflection and Refraction (NCERT X).
 * Every number on screen is the real Gaussian optics result:
 *   mirrors:      1/v + 1/u = 1/f          (f = R/2, u < 0 by sign rule)
 *   lenses:       1/v - 1/u = 1/f
 *   magnification mirror  m = -v/u ;  lens  m = v/u
 *   Snell:        n1 sin(i) = n2 sin(r) ;  TIR beyond ic = asin(n2/n1)
 * The picture is RAY TRACED, not sketched: parallel ray -> focal point,
 * ray through the centre -> straight. If the drawing and the formula
 * disagreed, the drawing wins the bug report.
 *
 * Deep layout (5 tabs):
 *   1. Predict    -- guess, then verify on the bench
 *   2. Bench      -- mirror/lens optical bench, ray traced live
 *   3. Tank       -- Snell's law refraction tank + total internal reflection
 *   4. Challenge  -- 9 questions in 3 tiers with hints
 *   5. Truths     -- misconception killer + honest summary
 */
import React, { useMemo, useState } from 'react';

type TabKey = 'predict' | 'bench' | 'tank' | 'challenge' | 'truths';

const TABS: { id: TabKey; label: string; emoji: string }[] = [
  { id: 'predict', label: '1 \u00b7 Predict', emoji: '\u2753' },
  { id: 'bench', label: '2 \u00b7 Optical Bench', emoji: '🔍' },
  { id: 'tank', label: '3 \u00b7 Refraction Tank', emoji: '\ud83c\udf0a' },
  { id: 'challenge', label: '4 \u00b7 Challenge', emoji: '\ud83c\udfaf' },
  { id: 'truths', label: '5 \u00b7 Truths', emoji: '\ud83e\udee0' },
];

type ElementKey = 'concaveMirror' | 'convexMirror' | 'convexLens' | 'concaveLens';

const ELEMENTS: Record<ElementKey, { label: string; short: string; formula: string; fDefault: number }> = {
  concaveMirror: { label: 'Concave mirror', short: 'concave', formula: '1/v + 1/u = 1/f \u00b7 f = R/2', fDefault: 20 },
  convexMirror: { label: 'Convex mirror', short: 'convex M', formula: '1/v + 1/u = 1/f \u00b7 f > 0 (behind)', fDefault: 20 },
  convexLens: { label: 'Convex lens', short: 'convex L', formula: '1/v − 1/u = 1/f \u00b7 f > 0', fDefault: 20 },
  concaveLens: { label: 'Concave lens', short: 'concave L', formula: '1/v − 1/u = 1/f \u00b7 f < 0', fDefault: 20 },
};

const LIQUIDS: Record<string, { label: string; n: number }> = {
  air: { label: 'Air', n: 1.0 },
  ice: { label: 'Ice', n: 1.31 },
  water: { label: 'Water', n: 1.33 },
  kerosene: { label: 'Kerosene', n: 1.39 },
  glass: { label: 'Glass', n: 1.5 },
  diamond: { label: 'Diamond', n: 2.42 },
};

interface Challenge {
  id: string;
  tier: 'foundation' | 'standard' | 'advanced';
  skill: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
}

const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    tier: 'foundation',
    skill: 'Mirror focus',
    question: 'The radius of curvature of a spherical mirror is 20 cm. Its focal length is:',
    options: ['40 cm', '20 cm', '10 cm', '5 cm'],
    correctIndex: 2,
    explanation: 'f = R/2 for spherical mirrors of small aperture: 20/2 = 10 cm. The Bench tab shows the focus exactly at half the curvature.',
    hints: ['One number is divided by another.', 'f = R/2.', '20/2 = 10 cm.'],
  },
  {
    id: 'ch_02',
    tier: 'foundation',
    skill: 'Which mirror',
    question: 'A vehicle uses a mirror that ALWAYS gives an erect, diminished (smaller) image. Which mirror?',
    options: ['Concave', 'Convex', 'Plane', 'Any spherical mirror'],
    correctIndex: 1,
    explanation: 'A convex mirror gives a virtual, erect and diminished image for EVERY object position -- that wide, always-upright view is why it sits on vehicles and at blind turns.',
    hints: ['Which mirror has its focus BEHIND the reflecting surface?', 'Convex.', 'Convex mirror -- always virtual, erect, diminished.'],
  },
  {
    id: 'ch_03',
    tier: 'foundation',
    skill: 'Refraction or not',
    question: 'Light passes from air into a glass slab and comes out the other side. The emerging ray is displaced but PARALLEL to the incident ray because:',
    options: [
      'glass absorbs and re-emits the light in the same direction',
      'the two refractions (air→glass, glass→air) bend the ray by equal and opposite amounts',
      'light speeds up inside glass compensating the bend',
      'the slab reflects the ray internally',
    ],
    correctIndex: 1,
    explanation: 'At each face Snell\u2019s law applies. Entering glass the ray bends toward the normal; leaving, exactly the same amount away (same pair of media, reversed order). Net: a sideways shift only.',
    hints: ['Trace both surfaces -- what is different between them?', 'The two bends are mirror images of each other.', 'Equal and opposite deviations.'],
  },
  {
    id: 'ch_04',
    tier: 'standard',
    skill: 'Mirror numerics',
    question: 'An object stands 30 cm from a concave mirror of focal length 10 cm (u = −30 cm). Where is the image?',
    options: ['v = −15 cm, real', 'v = −15 cm, virtual', 'v = +15 cm, real', 'v = −60 cm, virtual'],
    correctIndex: 0,
    explanation: 'Sign rule first: concave mirror f = −10 cm, u = −30 cm. Then 1/v = 1/f − 1/u = −1/10 + 1/30 = −2/30, so v = −15 cm — in front of the mirror: real. Magnification m = −v/u = −0.5: inverted, half-size. The Bench reproduces v = −15 cm exactly at these settings.',
    hints: ['Sign rule first: concave mirror f = −10 cm, u = −30 cm.', '1/v = 1/f − 1/u.', '1/v = −1/10 + 1/30 = −3/30 + 1/30 = −2/30 → v = −15 cm.'],
  },
  {
    id: 'ch_05',
    tier: 'standard',
    skill: 'Lens shift',
    question: 'In the Bench, an object at 40 cm from a convex lens (f = 20 cm) forms a sharp image at 40 cm. You slide the object to 25 cm. The screen must move:',
    options: ['closer to the lens', 'farther from the lens, to 100 cm', 'to exactly 25 cm', 'nowhere -- the image stays at 40 cm'],
    correctIndex: 1,
    explanation:
      'Gaussian form for lenses: 1/v \u2212 1/u = 1/f with u = \u221225, f = +20 gives 1/v = 1/f + 1/u = 0.05 \u2212 0.04 = 0.01, so v = +100 cm -- a real image 100 cm from the lens, magnified m = v/u = \u22124. Moving the object from 2f toward f pushes the real image from 2f toward infinity. The Bench reproduces it: set u = 25, f = 20.',
    hints: ['Object moving from 2f toward f sends the image from 2f toward infinity.', 'Between f and 2f the image lands beyond 2f.', 'Farther from the lens -- try u = 25, f = 20 on the Bench.'],
  },
  {
    id: 'ch_06',
    tier: 'standard',
    skill: 'Magnification',
    question: 'A 2 cm object in front of a concave mirror gives a 6 cm tall INVERTED image. The magnification and image type are:',
    options: ['m = +3, virtual', 'm = −3, real', 'm = −0.33, real', 'm = +0.33, virtual'],
    correctIndex: 1,
    explanation: 'm = h\u2032/h = −6/2 = −3. The minus sign says inverted; inverted by a mirror means real. |m| = 3 means three times enlarged -- the object must sit between f and 2f.',
    hints: ['m = height of image / height of object, keeping the sign.', 'Inverted image → negative m.', '−6/2 = −3, real.'],
  },
  {
    id: 'ch_07',
    tier: 'advanced',
    skill: 'Critical angle',
    question: 'The critical angle for the water→air boundary is closest to:',
    options: ['about 41°', 'about 49°', 'about 24°', 'water has no critical angle'],
    correctIndex: 1,
    explanation: 'sin(ic) = n2/n1 = 1/1.33 = 0.752 → ic \u2248 48.8°. Any underwater ray hitting the surface at more than ~49° from the normal is totally internally reflected -- the Refraction Tank shows the flip live.',
    hints: ['sin(ic) = 1/n for water→air.', 'arcsin(0.752) = ?', '\u224849°.'],
  },
  {
    id: 'ch_08',
    tier: 'advanced',
    skill: 'Power pair',
    question: 'Two thin lenses of powers +2.5 D and −4.0 D are placed in contact. The combination behaves as:',
    options: ['a converging lens of f = +40 cm', 'a diverging lens of f = −66.7 cm', 'a converging lens of f = +6.5 cm', 'a diverging lens of f = −1.5 cm'],
    correctIndex: 1,
    explanation: 'P = P1 + P2 = +2.5 − 4.0 = −1.5 D. f = 100/P cm = 100/(−1.5) \u2248 −66.7 cm -- net diverging. (Focal length in cm: 100/power in dioptres.)',
    hints: ['Powers simply add for touching lenses.', 'P = −1.5 D -- what sign of f is that?', 'f = 100/(−1.5) cm.'],
  },
  {
    id: 'ch_09',
    tier: 'advanced',
    skill: 'Synthesis',
    question: 'A dentist\u2019s mirror shows your tooth enlarged and upright. From the Bench\u2019s physics, this needs:',
    options: [
      'a convex mirror with the tooth beyond its focus',
      'a concave mirror with the tooth INSIDE its focal length (u < |f|)',
      'a plane mirror held at 45°',
      'a concave mirror with the tooth outside 2f',
    ],
    correctIndex: 1,
    explanation: 'Only a concave mirror with the object inside f gives a virtual, erect, ENLARGED image (m = −v/u with v < 0 flips the sign). Outside f the image turns real and inverted -- useless for a dentist. Set u = 7, f = 10 on the Bench and watch it happen.',
    hints: ['Which setup gives m > 0 AND |m| > 1 for a mirror?', 'Slide u below |f| for the concave mirror.', 'Concave, object inside the focus.'],
  },
];

const MISCONCEPTIONS: { misconception: string; correction: string }[] = [
  {
    misconception: 'The image in a mirror/lens "moves" when you move your eye.',
    correction:
      'The image POSITION is fixed by u and f alone (1/v + 1/u = 1/f). Moving your eye changes which rays enter it, never where the image forms. Only moving the OBJECT or changing f moves the image -- prove it on the Bench.',
  },
  {
    misconception: 'A convex lens always magnifies.',
    correction:
      'Slide the object beyond 2f: the image is real, inverted and DIMINISHED (|m| < 1). Magnification happens only between f and 2f (enlarged real) and inside f (enlarged virtual). A camera works because "outside 2f" makes things small.',
  },
  {
    misconception: 'Virtual images are "fake" and cannot be photographed or measured.',
    correction:
      'Virtual only means the rays DIVERGE from the image point -- a camera or your eye happily focuses those diverging rays. The dentists\u2019 enlarged view and every rear-view mirror image is a photographed "virtual" image.',
  },
  {
    misconception: 'Light slows down in glass because glass "blocks" it partially.',
    correction:
      'The AVERAGE speed drops (v = c/n) because light is repeatedly absorbed and re-emitted by atoms, not because photons get filtered. Frequency never changes across a boundary -- the WAVELENGTH shortens to c/(n\u00b7f).',
  },
  {
    misconception: 'Total internal reflection happens inside the denser medium for any angle.',
    correction:
      'TIR needs BOTH conditions: travelling from denser to rarer (n1 > n2) AND incidence beyond the critical angle. Air→water can NEVER produce TIR, whatever the angle -- set the tank to air→water and drag the angle through 89°.',
  },
];

// ==========================================
// RAY-TRACE CORE (honest optics)
// Mirrors: 1/v + 1/u = 1/f. Sign rule: light travels left->right,
// u < 0 (object in front), concave f < 0, convex f > 0.
// Lenses: 1/v - 1/u = 1/f. Sign rule: u < 0, converging f > 0.
// ==========================================

interface BenchResult {
  v: number; // signed image distance (mirror/lens sign rule)
  m: number; // signed magnification
  h2: number; // image height (cm), sign = orientation
  real: boolean;
  atInfinity: boolean;
  nature: string;
}

function traceElement(el: ElementKey, uMag: number, fMag: number, h1: number): BenchResult {
  const u = -uMag; // object distance signed (always in front -> negative)
  let f = fMag;
  if (el === 'concaveMirror' || el === 'concaveLens') f = -fMag;
  let v: number;
  if (el === 'concaveMirror' || el === 'convexMirror') {
    v = 1 / (1 / f - 1 / u); // 1/v + 1/u = 1/f -> v = 1/(1/f - 1/u)
  } else {
    v = 1 / (1 / f + 1 / u); // 1/v - 1/u = 1/f -> v = 1/(1/f + 1/u)
  }
  const atInfinity = !isFinite(v);
  if (atInfinity) {
    return { v: Infinity, m: Infinity, h2: Infinity, real: true, atInfinity: true, nature: 'image at infinity (object at focus)' };
  }
  const m = el === 'concaveMirror' || el === 'convexMirror' ? -v / u : v / u;
  const h2 = m * h1;
  const real = el === 'concaveMirror' || el === 'convexMirror' ? v < 0 : v > 0;
  const orient = h2 < 0 ? 'inverted' : 'erect';
  const sizeWord = Math.abs(Math.abs(m) - 1) < 0.02 ? 'same size' : Math.abs(m) > 1 ? 'enlarged' : 'diminished';
  const nature = `${real ? 'real' : 'virtual'}, ${orient}, ${sizeWord}`;
  return { v, m, h2, real, atInfinity: false, nature };
}

// screen-space ray geometry for the SVG bench
// optical axis at y=cy, element at x=cx; object to the LEFT.
// Ray 1: parallel-to-axis ray -> refracted/reflected along the line to F.
// Ray 2: mirror -> hits the pole and reflects with equal angle;
//        lens  -> passes straight through the optical centre.
// Dashed = virtual (backward) extension, drawn to the virtual image.
function rayPaths(el: ElementKey, uMag: number, fMag: number, h1: number, cx: number, cy: number, scale: number) {
  const r = traceElement(el, uMag, fMag, h1);
  const u = -uMag;
  let f = fMag;
  if (el === 'concaveMirror' || el === 'concaveLens') f = -fMag;
  const isMirror = el === 'concaveMirror' || el === 'convexMirror';
  const objX = cx + u * scale; // u negative -> left
  const objY = cy - h1 * scale;
  const fx = cx + f * scale; // signed focal point on screen
  const fin = !r.atInfinity;
  const imgX = fin ? cx + r.v * scale : cx;
  const imgY = fin ? cy - r.h2 * scale : cy;

  const lines: { x1: number; y1: number; x2: number; y2: number; kind: 'real' | 'virt' }[] = [];

  // Ray 1: parallel to the axis, then along line(P, F)
  const pX = cx;
  const pY = objY;
  const dfx = fx - pX;
  const dfy = cy - pY;
  // concave mirror / convex lens: outgoing ray passes THROUGH F and beyond
  // convex mirror / concave lens: outgoing ray travels directly AWAY from F
  const outgoingTowardF = (isMirror && f < 0) || (!isMirror && f > 0);
  const vImg = fin ? r.v * scale : 0;
  lines.push({ x1: objX, y1: objY, x2: pX, y2: pY, kind: 'real' });
  if (fin && outgoingTowardF && r.real) {
    lines.push({ x1: pX, y1: pY, x2: fx, y2: cy, kind: 'real' });
    lines.push({ x1: fx, y1: cy, x2: imgX, y2: imgY, kind: 'real' });
  } else if (fin && outgoingTowardF && !r.real) {
    // reflected/refracted ray passes F and keeps going; image is the backward extension
    lines.push({ x1: pX, y1: pY, x2: fx, y2: cy, kind: 'real' });
    lines.push({ x1: fx, y1: cy, x2: fx + dfx * 0.9, y2: cy + dfy * 0.9, kind: 'real' });
    lines.push({ x1: pX, y1: pY, x2: imgX, y2: imgY, kind: 'virt' });
  } else if (fin && !outgoingTowardF) {
    // outgoing ray leaves directly away from F; image is on the backward extension
    lines.push({ x1: pX, y1: pY, x2: pX - dfx * 0.9, y2: pY - dfy * 0.9, kind: 'real' });
    lines.push({ x1: pX, y1: pY, x2: imgX, y2: imgY, kind: 'virt' });
  } else {
    // image at infinity: draw the parallel outgoing beam to the edge
    const dl = outgoingTowardF ? { x: dfx, y: dfy } : { x: -dfx, y: -dfy };
    const L = Math.hypot(dl.x, dl.y) || 1;
    if (outgoingTowardF) lines.push({ x1: pX, y1: pY, x2: fx, y2: cy, kind: 'real' });
    lines.push({ x1: outgoingTowardF ? fx : pX, y1: outgoingTowardF ? cy : pY, x2: (outgoingTowardF ? fx : pX) + (dl.x / L) * 280, y2: (outgoingTowardF ? cy : pY) + (dl.y / L) * 280, kind: 'real' });
  }

  // Ray 2: pole (mirror) / centre (lens)
  const d2x = cx - objX;
  const d2y = cy - objY;
  if (isMirror) {
    lines.push({ x1: objX, y1: objY, x2: cx, y2: cy, kind: 'real' });
    if (fin) {
      lines.push({ x1: cx, y1: cy, x2: imgX, y2: imgY, kind: r.real ? 'real' : 'virt' });
    } else {
      const L = Math.hypot(d2x, d2y) || 1;
      lines.push({ x1: cx, y1: cy, x2: cx - (d2x / L) * 300, y2: cy + (d2y / L) * 300, kind: 'real' });
    }
  } else {
    lines.push({ x1: objX, y1: objY, x2: cx, y2: cy, kind: 'real' });
    if (fin) {
      lines.push({ x1: cx, y1: cy, x2: imgX, y2: imgY, kind: r.real ? 'real' : 'virt' });
    } else {
      const L = Math.hypot(d2x, d2y) || 1;
      lines.push({ x1: cx, y1: cy, x2: cx + (d2x / L) * 300, y2: cy + (d2y / L) * 300, kind: 'real' });
    }
  }

  void vImg;
  return { lines, objX, objY, imgX, imgY, r };
}

// ==========================================
// MAIN COMPONENT
// ==========================================

export function C10_ScienceLightReflectionRefractionSim() {
  const [tab, setTab] = useState<TabKey>('predict');

  // bench state
  const [el, setEl] = useState<ElementKey>('concaveMirror');
  const [uMag, setUMag] = useState(30); // object distance, cm
  const [fMag, setFMag] = useState(20); // |f|, cm
  const [h1, setH1] = useState(4); // object height, cm
  const [showVirtual, setShowVirtual] = useState(true);
  const [showGrid, setShowGrid] = useState(true);

  // tank state
  const [n1Key, setN1Key] = useState<keyof typeof LIQUIDS>('water');
  const [n2Key, setN2Key] = useState<keyof typeof LIQUIDS>('air');
  const [incidence, setIncidence] = useState(35); // degrees
  const [tankAnim, setTankAnim] = useState(false);
  const [sweepDir, setSweepDir] = useState(1);

  // predict / challenge / truths state
  const [predicted, setPredicted] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [hintLevel, setHintLevel] = useState<Record<string, number>>({});
  const [tierFilter, setTierFilter] = useState<'all' | Challenge['tier']>('all');
  const [openMisc, setOpenMisc] = useState<number | null>(null);

  // bench numerics (single source of truth)
  const bench = useMemo(() => traceElement(el, uMag, fMag, h1), [el, uMag, fMag, h1]);
  const geo = useMemo(
    () => rayPaths(el, uMag, fMag, h1, 340, 150, 3.2),
    [el, uMag, fMag, h1]
  );

  // tank numerics
  const n1 = LIQUIDS[n1Key].n;
  const n2 = LIQUIDS[n2Key].n;
  const denserToRarer = n1 > n2;
  const sinI = Math.sin((incidence * Math.PI) / 180);
  const sinT = (n1 * sinI) / n2;
  const tir = denserToRarer && sinT > 1;
  const refAngle = tir ? null : (Math.asin(Math.min(1, sinT)) * 180) / Math.PI;
  const critical = denserToRarer ? (Math.asin(Math.min(1, n2 / n1)) * 180) / Math.PI : null;
  const snellLHS = n1 * sinI;
  const snellRHS = tir ? NaN : n2 * Math.sin((refAngle! * Math.PI) / 180);

  // deterministic tank sweep animation driven by rAF
  React.useEffect(() => {
    if (!tankAnim) return;
    let raf = 0;
    const tick = () => {
      setIncidence((i) => {
        let next = i + sweepDir * 0.75;
        if (next >= 88) { next = 88; }
        if (next <= 2) { next = 2; }
        if (next >= 88 || next <= 2) setSweepDir((d) => -d);
        return Math.round(next * 10) / 10;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [tankAnim, sweepDir]);

  const score = useMemo(() => {
    let right = 0;
    let attempted = 0;
    Object.entries(answers).forEach(([id, choice]) => {
      const ch = CHALLENGES.find((c) => c.id === id);
      if (ch) {
        attempted += 1;
        if (choice === ch.correctIndex) right += 1;
      }
    });
    return { right, attempted };
  }, [answers]);

  const visibleChallenges = CHALLENGES.filter((c) => tierFilter === 'all' || c.tier === tierFilter);

  const pickAnswer = (id: string, idx: number) => {
    if (revealed[id]) return;
    setAnswers((a) => ({ ...a, [id]: idx }));
    setRevealed((r) => ({ ...r, [id]: true }));
  };

  const showHint = (id: string, hints: [string, string, string]) => {
    setHintLevel((h) => ({ ...h, [id]: Math.min((h[id] ?? 0) + 1, hints.length) }));
  };

  const resetAll = () => {
    setEl('concaveMirror'); setUMag(30); setFMag(20); setH1(4);
    setShowVirtual(true); setShowGrid(true);
    setN1Key('water'); setN2Key('air'); setIncidence(35); setTankAnim(false); setSweepDir(1);
    setPredicted(null);
  };

  const elementGlyph = (k: ElementKey) =>
    k === 'concaveMirror' ? '\u25e1' : k === 'convexMirror' ? '\u25e2' : k === 'convexLens' ? '\u23e9' : '\u23ea';

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 rounded-3xl border border-slate-800 font-sans text-slate-100 shadow-2xl">
      {/* header */}
      <div className="flex flex-wrap items-center gap-3 pb-3 mb-3 border-b border-slate-800">
        <span className="text-3xl p-2 bg-sky-950/80 rounded-2xl border border-sky-700">🔍</span>
        <div className="flex-1 min-w-[220px]">
          <p className="text-xs font-bold uppercase tracking-wider text-sky-400">Class 10 Science -- Light: Reflection and Refraction</p>
          <h1 className="text-xl md:text-2xl font-black text-sky-300">Ray-Traced Bench: mirrors, lenses &amp; Snell</h1>
        </div>
        <div className="text-right">
          <span className="font-mono text-xs text-slate-400 block">1/v + 1/u = 1/f</span>
          <span className="font-mono text-xs text-slate-500 block">n1 sin i = n2 sin r</span>
        </div>
        <button onClick={resetAll} className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold transition-all">
          Reset
        </button>
      </div>

      {/* tab bar */}
      <nav className="flex flex-wrap gap-1.5 mb-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`min-h-9 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              tab === t.id
                ? 'bg-sky-600 border-sky-500 text-white shadow-lg shadow-sky-900/40'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-600'
            }`}
          >
            <span className="mr-1">{t.emoji}</span>
            {t.label}
          </button>
        ))}
      </nav>

      {/* ============================================================ */}
      {/* TAB 1: PREDICT                                               */}
      {/* ============================================================ */}
      {tab === 'predict' && (
        <div className="space-y-4">
          <div className="p-5 bg-slate-900/70 rounded-2xl border border-sky-900/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-sky-400 mb-2">Predict before you play</p>
            <p className="text-sm text-slate-200 leading-relaxed">
              A candle is placed 30 cm in front of a concave mirror of focal length 20 cm -- that is
              BETWEEN the focus (20 cm) and twice the focus (40 cm). What does the mirror show?
            </p>
            <div className="mt-3 space-y-2">
              {[
                'A small, upright image -- concave mirrors shrink things',
                'A large, INVERTED, real image beyond the mirror\u2019s centre of curvature',
                'No image at all -- the candle is too close to the focus',
                'An image of exactly the same size, upside down',
              ].map((opt, i) => {
                const chosen = predicted === i;
                const isCorrect = i === 1;
                let cls = 'border-slate-700 bg-slate-900 hover:border-sky-600';
                if (predicted !== null && isCorrect) cls = 'border-emerald-600 bg-emerald-950/40';
                else if (chosen && !isCorrect) cls = 'border-rose-600 bg-rose-950/40';
                return (
                  <button
                    key={i}
                    onClick={() => setPredicted(i)}
                    disabled={predicted !== null}
                    className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all disabled:cursor-default ${cls}`}
                  >
                    <span className="font-mono text-xs text-slate-500 mr-2">{'ABCD'[i]}</span>
                    {opt}
                    {predicted !== null && isCorrect && <span className="ml-2 text-emerald-400 font-bold text-xs">✓</span>}
                  </button>
                );
              })}
            </div>
            {predicted !== null && (
              <div className="mt-3 p-3 rounded-xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
                Between f and 2f a concave mirror throws a real, inverted, enlarged image BEYOND 2f --
                the formula gives v = 60 cm, m = −2. Verify it: set the Bench to u = 30 cm,
                f = 20 cm and read the live panel.
                <button onClick={() => setTab('bench')} className="ml-2 underline font-bold text-amber-300">
                  Open the Bench →
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { t: 'Walk 1: cross the focus', d: 'Set the concave mirror, f = 20. Drag u from 30 cm to 15 cm. Watch the image flip from real+inverted to virtual+erect at u = f -- the bench panel marks the flip.' },
              { t: 'Walk 2: the always-polite mirror', d: 'Switch to the convex mirror. Slide u anywhere 10→60 cm. The image stays virtual, erect and diminished for EVERY position.' },
              { t: 'Walk 3: bend a beam', d: 'In the Tank, fire water→air at 50°: total internal reflection. Then switch to air→water and try 89° -- no TIR is possible that way.' },
            ].map((s, i) => (
              <div key={i} className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
                <p className="text-xs font-bold text-slate-200 mb-1">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-600 text-[10px] font-black mr-1.5">{i + 1}</span>
                  {s.t}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: BENCH                                                 */}
      {/* ============================================================ */}
      {tab === 'bench' && (
        <div className="space-y-4">
          {/* element selector */}
          <div className="flex flex-wrap gap-2">
            {(Object.keys(ELEMENTS) as ElementKey[]).map((k) => (
              <button
                key={k}
                onClick={() => setEl(k)}
                className={`min-h-11 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                  el === k
                    ? 'bg-sky-600 border-sky-500 text-white shadow-lg shadow-sky-900/40'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600'
                }`}
              >
                <span className="mr-1">{elementGlyph(k)}</span>
                {ELEMENTS[k].label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>Object distance u</span>
                <span className="font-mono text-sky-300">{uMag} cm</span>
              </label>
              <input type="range" min={5} max={60} step={1} value={uMag} aria-label="object distance"
                onChange={(e) => setUMag(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-sky-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>Focal length |f|</span>
                <span className="font-mono text-sky-300">{fMag} cm</span>
              </label>
              <input type="range" min={5} max={40} step={1} value={fMag} aria-label="focal length"
                onChange={(e) => setFMag(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-sky-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>Object height h</span>
                <span className="font-mono text-sky-300">{h1} cm</span>
              </label>
              <input type="range" min={1} max={7} step={0.5} value={h1} aria-label="object height"
                onChange={(e) => setH1(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-sky-500" />
            </div>
          </div>

          {/* the traced bench */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2">
            <svg viewBox="0 0 680 300" className="w-full h-64 md:h-80" preserveAspectRatio="xMidYMid meet">
              {/* grid */}
              {showGrid &&
                Array.from({ length: 17 }, (_, i) => (
                  <line key={`gv${i}`} x1={40 + i * 37.5} y1={20} x2={40 + i * 37.5} y2={280} stroke="#1e293b" strokeWidth={1} />
                ))}
              {showGrid &&
                Array.from({ length: 9 }, (_, i) => (
                  <line key={`gh${i}`} x1={40} y1={20 + i * 32.5} x2={640} y2={20 + i * 32.5} stroke="#1e293b" strokeWidth={1} />
                ))}
              {/* optical axis */}
              <line x1={30} y1={150} x2={650} y2={150} stroke="#475569" strokeWidth={1.5} strokeDasharray="6 5" />

              {/* element drawing */}
              {el === 'concaveMirror' && (
                <path d="M 340 40 Q 310 150 340 260" fill="none" stroke="#38bdf8" strokeWidth={5} strokeLinecap="round" />
              )}
              {el === 'convexMirror' && (
                <path d="M 326 40 Q 356 150 326 260" fill="none" stroke="#f59e0b" strokeWidth={5} strokeLinecap="round" />
              )}
              {el === 'convexLens' && (
                <path d="M 340 40 Q 368 150 340 260 Q 312 150 340 40" fill="#38bdf8" fillOpacity={0.22} stroke="#38bdf8" strokeWidth={3} />
              )}
              {el === 'concaveLens' && (
                <path d="M 328 40 L 352 40 Q 328 150 352 260 L 328 260 Q 352 150 328 40" fill="#fbbf24" fillOpacity={0.22} stroke="#fbbf24" strokeWidth={3} />
              )}
              {/* focal points */}
              <circle cx={340 + (el === 'concaveMirror' || el === 'concaveLens' ? -fMag : fMag) * 3.2} cy={150} r={4} fill="#a78bfa" />
              <circle cx={340 - (el === 'concaveMirror' || el === 'concaveLens' ? -fMag : fMag) * 3.2} cy={150} r={4} fill="#a78bfa" />
              <text x={340 + (el === 'concaveMirror' || el === 'concaveLens' ? -fMag : fMag) * 3.2} y={168} fontSize={10} fill="#a78bfa" textAnchor="middle">F</text>

              {/* principal focus label 2F */}
              <circle cx={340 + (el === 'concaveMirror' || el === 'concaveLens' ? -2 * fMag : 2 * fMag) * 3.2} cy={150} r={3} fill="#7c6bd6" />

              {/* rays: each with CSS transition on endpoints so slides animate */}
              {geo.lines.map((L, i) => (
                <line
                  key={i}
                  x1={L.x1} y1={L.y1} x2={L.x2} y2={L.y2}
                  stroke={L.kind === 'virt' ? '#64748b' : i === 0 || i === 1 ? '#fbbf24' : '#34d399'}
                  strokeWidth={L.kind === 'virt' ? 1.5 : 2}
                  strokeDasharray={L.kind === 'virt' ? '5 5' : undefined}
                  opacity={L.kind === 'virt' && !showVirtual ? 0 : 0.95}
                  style={{ transition: 'all 120ms ease-out' }}
                />
              ))}

              {/* object arrow */}
              <line x1={geo.objX} y1={150} x2={geo.objX} y2={geo.objY} stroke="#f8fafc" strokeWidth={3} style={{ transition: 'all 120ms ease-out' }} />
              <polygon
                points={`${geo.objX - 6},${geo.objY + 10} ${geo.objX + 6},${geo.objY + 10} ${geo.objX},${geo.objY}`}
                fill="#f8fafc" style={{ transition: 'all 120ms ease-out' }}
              />
              <text x={geo.objX} y={285} fontSize={11} fill="#e2e8f0" textAnchor="middle">object {uMag} cm</text>

              {/* image arrow */}
              {bench.atInfinity ? (
                <text x={560} y={60} fontSize={12} fill="#fb7185">image → infinity (rays emerge parallel)</text>
              ) : (
                <g style={{ transition: 'all 120ms ease-out' }}>
                  <line
                    x1={geo.imgX} y1={150} x2={geo.imgX} y2={geo.imgY}
                    stroke={bench.real ? '#fb7185' : '#c084fc'} strokeWidth={3} strokeDasharray={bench.real ? undefined : '6 4'}
                  />
                  <polygon
                    points={`${geo.imgX - 6},${geo.imgY + (bench.h2 > 0 ? -10 : 10)} ${geo.imgX + 6},${geo.imgY + (bench.h2 > 0 ? -10 : 10)} ${geo.imgX},${geo.imgY}`}
                    fill={bench.real ? '#fb7185' : '#c084fc'}
                  />
                  <text x={geo.imgX} y={bench.real ? 285 : 135} fontSize={11} fill={bench.real ? '#fb7185' : '#c084fc'} textAnchor="middle">
                    image {Math.abs(bench.v) >= 999 ? '>999' : Math.abs(bench.v).toFixed(1)} cm {bench.real ? '(front)' : '(behind)'}
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* live readouts WITH UNITS */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {[
              { k: 'u', v: `−${uMag} cm`, c: 'text-slate-200' },
              { k: '|f|', v: `${fMag} cm`, c: 'text-slate-200' },
              { k: 'v', v: bench.atInfinity ? '∞' : `${bench.v.toFixed(1)} cm`, c: bench.real ? 'text-rose-300' : 'text-violet-300' },
              { k: 'm', v: bench.atInfinity ? '∞' : bench.m.toFixed(2), c: 'text-amber-300' },
              { k: "h'", v: bench.atInfinity ? '∞' : `${bench.h2.toFixed(1)} cm`, c: 'text-amber-300' },
              { k: 'nature', v: bench.atInfinity ? 'at infinity' : bench.nature, c: 'text-emerald-300' },
            ].map((x) => (
              <div key={x.k} className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{x.k}</p>
                <p className={`font-mono text-sm font-bold ${x.c}`}>{x.v}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={() => setShowVirtual(!showVirtual)} className={`min-h-11 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${showVirtual ? 'bg-slate-800 border-slate-600 text-white' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              virtual extensions {showVirtual ? 'shown' : 'hidden'}
            </button>
            <button onClick={() => setShowGrid(!showGrid)} className={`min-h-11 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${showGrid ? 'bg-slate-800 border-slate-600 text-white' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              grid {showGrid ? 'on' : 'off'}
            </button>
            <span className="text-xs text-slate-500 font-mono">{ELEMENTS[el].formula}</span>
          </div>

          {/* guided challenges */}
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-amber-900/50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2">What to try</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              ① Set the concave mirror to f = 10 cm and u = 15 cm. Read v: the image is real,
              inverted and ENLARGED (m = −2). Now slide u to 5 cm (inside f) and watch the arrow
              flip upright and dashed -- the shaving-mirror zone.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
              ② Switch to the convex lens, f = 20, u = 40: image at 40 cm, same size. Drag u to
              25 and see the screen distance chase past 50 cm -- that is why projectors zoom by
              moving the lens, not the screen.
            </p>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: TANK                                                  */}
      {/* ============================================================ */}
      {tab === 'tank' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">From medium n\u2081</label>
              <select value={n1Key} onChange={(e) => setN1Key(e.target.value as keyof typeof LIQUIDS)}
                className="w-full min-h-11 bg-slate-900 border border-slate-700 rounded-xl px-3 text-sm text-slate-200">
                {Object.entries(LIQUIDS).map(([k, L]) => (
                  <option key={k} value={k}>{L.label} (n = {L.n})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Into medium n\u2082</label>
              <select value={n2Key} onChange={(e) => setN2Key(e.target.value as keyof typeof LIQUIDS)}
                className="w-full min-h-11 bg-slate-900 border border-slate-700 rounded-xl px-3 text-sm text-slate-200">
                {Object.entries(LIQUIDS).map(([k, L]) => (
                  <option key={k} value={k}>{L.label} (n = {L.n})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>Angle of incidence i</span>
                <span className="font-mono text-sky-300">{incidence.toFixed(1)}°</span>
              </label>
              <input type="range" min={0} max={89.5} step={0.5} value={incidence} aria-label="angle of incidence"
                onChange={(e) => { setTankAnim(false); setIncidence(Number(e.target.value)); }}
                className="w-full mt-1 min-h-11 accent-sky-500" />
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2">
            <svg viewBox="0 0 680 320" className="w-full h-64 md:h-80" preserveAspectRatio="xMidYMid meet">
              {/* media halves: top = medium 1, bottom = medium 2 */}
              <rect x={40} y={20} width={600} height={140} fill={n1Key === 'air' ? '#0b1220' : n1Key === 'diamond' ? '#2e1065' : '#0e2a44'} opacity={0.9} />
              <rect x={40} y={160} width={600} height={140} fill={n2Key === 'air' ? '#0b1220' : n2Key === 'diamond' ? '#2e1065' : '#0e2a44'} opacity={0.9} />
              <line x1={40} y1={160} x2={640} y2={160} stroke="#94a3b8" strokeWidth={2} />
              <text x={54} y={38} fontSize={11} fill="#7dd3fc">medium 1: {LIQUIDS[n1Key].label} n={n1}</text>
              <text x={54} y={290} fontSize={11} fill="#7dd3fc">medium 2: {LIQUIDS[n2Key].label} n={n2}</text>

              {/* normal */}
              <line x1={340} y1={40} x2={340} y2={280} stroke="#475569" strokeDasharray="6 5" strokeWidth={1.5} />
              <text x={346} y={52} fontSize={10} fill="#64748b">normal</text>

              {/* incidence geometry: ray comes from top-left of the normal */}
              {
                (() => {
                  const rad = (incidence * Math.PI) / 180;
                  const L = 170;
                  const dx = Math.sin(rad) * L;
                  const dy = Math.cos(rad) * L;
                  const ox = 340 - dx; const oy = 160 - dy;
                  const segs: { x1: number; y1: number; x2: number; y2: number; color: string; dash?: string; label?: string }[] = [];
                  segs.push({ x1: ox, y1: oy, x2: 340, y2: 160, color: '#fbbf24' });
                  if (tir) {
                    const rx = 340 + dx; const ry = 160 - dy;
                    segs.push({ x1: 340, y1: 160, x2: rx, y2: ry, color: '#fb7185' });
                  } else if (refAngle !== null) {
                    const trad = (refAngle * Math.PI) / 180;
                    const tx = Math.sin(trad) * L;
                    const ty = Math.cos(trad) * L;
                    segs.push({ x1: 340, y1: 160, x2: 340 + tx, y2: 160 + ty, color: '#34d399' });
                    // faint partial reflection (real physics: reflection co-efficient grows near ic)
                    const rr = Math.min(1, Math.pow(n1 / n2 - 1, 2) * 0.4 + (tir ? 1 : sinT > 0.9 ? 0.35 : 0.06));
                    segs.push({ x1: 340, y1: 160, x2: 340 + dx * 0.9, y2: 160 - dy * 0.9, color: '#fb7185', dash: rr < 0.2 ? '3 6' : undefined });
                  }
                  return segs.map((s, i) => (
                    <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={s.color} strokeWidth={2.5}
                      strokeDasharray={s.dash} style={{ transition: 'all 100ms linear' }} />
                  ));
                })()
              }

              {/* angle arcs + labels */}
              <text x={300} y={110} fontSize={12} fill="#fbbf24" textAnchor="middle">i = {incidence.toFixed(1)}°</text>
              {tir ? (
                <text x={430} y={110} fontSize={13} fill="#fb7185" fontWeight="bold">TIR! r → {incidence.toFixed(1)}°</text>
              ) : (
                <text x={392} y={225} fontSize={12} fill="#34d399" textAnchor="middle">r = {refAngle?.toFixed(1)}°</text>
              )}
            </svg>
          </div>

          {/* live tank readouts */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {[
              { k: 'n\u2081 sin i', v: snellLHS.toFixed(3) },
              { k: 'n\u2082 sin r', v: tir ? '-- (TIR)' : snellRHS.toFixed(3) },
              { k: 'angle r', v: tir ? 'no refracted ray' : `${refAngle?.toFixed(2)}°` },
              { k: 'critical angle', v: critical === null ? 'not possible' : `${critical.toFixed(1)}°` },
              { k: 'speed in medium 2', v: `${(3e8 / n2 / 1e8).toFixed(2)}×10⁸ m/s` },
            ].map((x) => (
              <div key={x.k} className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{x.k}</p>
                <p className="font-mono text-sm font-bold text-sky-300">{x.v}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={() => setTankAnim(!tankAnim)} className={`min-h-11 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${tankAnim ? 'bg-sky-600 border-sky-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-200'}`}>
              {tankAnim ? '⏸ pause sweep' : '▶ sweep angle'}
            </button>
            <span className="text-xs text-slate-500 font-mono">n1 sin i = n2 sin r &middot; sin(ic) = n2/n1</span>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-amber-900/50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2">What to try</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              ① Choose water → air and sweep: at i = 48.8° the green refracted ray
              flattens along the surface (r = 90°) and just past it the tank flips to full
              orange TIR. That angle is the critical angle sin⁻¹(1/1.33).
            </p>
            <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
              ② Now set air → water and push i to 89°: no flip ever happens -- TIR is
              mathematically impossible into a DENSER medium because sin r can never exceed n1/n2 &lt; 1.
            </p>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: CHALLENGE                                             */}
      {/* ============================================================ */}
      {tab === 'challenge' && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {(['all', 'foundation', 'standard', 'advanced'] as const).map((t) => (
              <button key={t} onClick={() => setTierFilter(t)}
                className={`min-h-9 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all capitalize ${
                  tierFilter === t ? 'bg-sky-600 border-sky-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}>
                {t}
              </button>
            ))}
            <span className="ml-auto font-mono text-xs text-slate-400">
              score {score.right}/{score.attempted}
            </span>
          </div>

          {visibleChallenges.map((ch) => {
            const picked = answers[ch.id];
            const done = revealed[ch.id];
            const lvl = hintLevel[ch.id] ?? 0;
            return (
              <div key={ch.id} className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                    ch.tier === 'foundation' ? 'bg-emerald-950 text-emerald-300' : ch.tier === 'standard' ? 'bg-amber-950 text-amber-300' : 'bg-rose-950 text-rose-300'
                  }`}>{ch.tier}</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{ch.skill}</span>
                </div>
                <p className="text-sm text-slate-200 font-medium mb-3">{ch.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {ch.options.map((opt, i) => {
                    const isCorrect = i === ch.correctIndex;
                    let cls = 'border-slate-700 bg-slate-900 hover:border-sky-600';
                    if (done && isCorrect) cls = 'border-emerald-600 bg-emerald-950/40';
                    else if (done && picked === i) cls = 'border-rose-600 bg-rose-950/40';
                    return (
                      <button key={i} onClick={() => pickAnswer(ch.id, i)} disabled={done}
                        className={`text-left px-3 py-2.5 rounded-xl border text-xs transition-all disabled:cursor-default ${cls}`}>
                        <span className="font-mono text-[10px] text-slate-500 mr-1.5">{'ABCD'[i]}</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {!done && (
                  <div className="mt-2">
                    <button onClick={() => showHint(ch.id, ch.hints as [string, string, string])} className="min-h-9 px-3 rounded-lg bg-amber-950/60 border border-amber-800 text-[11px] font-bold text-amber-300">
                      hint {Math.min(lvl + 1, ch.hints.length)}/3
                    </button>
                    {lvl > 0 && (
                      <p className="mt-2 text-xs text-amber-200/90 bg-amber-950/30 border border-amber-900/60 rounded-lg px-3 py-2 inline-block">
                        {ch.hints[lvl - 1]}
                      </p>
                    )}
                  </div>
                )}
                {done && (
                  <div className={`mt-3 p-3 rounded-xl border text-xs leading-relaxed ${
                    picked === ch.correctIndex ? 'bg-emerald-950/30 border-emerald-800 text-emerald-200' : 'bg-rose-950/30 border-rose-800 text-rose-200'
                  }`}>
                    <span className="font-bold">{picked === ch.correctIndex ? 'Correct. ' : 'Not quite. '}</span>
                    {ch.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 5: TRUTHS                                                */}
      {/* ============================================================ */}
      {tab === 'truths' && (
        <div className="space-y-3">
          <div className="p-4 bg-rose-950/20 rounded-2xl border border-rose-900/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-rose-400 mb-3">Misconception killer -- tap to open</p>
            <div className="space-y-2">
              {MISCONCEPTIONS.map((m, i) => (
                <div key={i} className="bg-slate-900/80 rounded-xl border border-slate-800 overflow-hidden">
                  <button onClick={() => setOpenMisc(openMisc === i ? null : i)}
                    className="w-full text-left px-4 py-3 flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-rose-300">&quot;{m.misconception}&quot;</span>
                    <span className="text-slate-500 text-lg leading-none">{openMisc === i ? '−' : '+'}</span>
                  </button>
                  {openMisc === i && (
                    <p className="px-4 pb-3 text-xs text-slate-300 leading-relaxed">{m.correction}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
              <p className="text-xs font-bold text-sky-300 uppercase tracking-wider mb-2">Formula sheet (all live in this sim)</p>
              <ul className="text-xs text-slate-300 space-y-1.5 font-mono">
                <li>spherical mirror &nbsp;1/v + 1/u = 1/f, f = R/2</li>
                <li>thin lens &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1/v − 1/u = 1/f</li>
                <li>magnification &nbsp;&nbsp;mirror m = −v/u &middot; lens m = v/u</li>
                <li>lens power &nbsp;&nbsp;&nbsp;&nbsp;P = 1/f(m) dioptre, P = P1+P2 in contact</li>
                <li>Snell &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;n1 sin i = n2 sin r</li>
                <li>critical angle &nbsp;&nbsp;sin ic = n2/n1 (denser → rarer only)</li>
                <li>speed in medium v = c/n</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
              <p className="text-xs font-bold text-sky-300 uppercase tracking-wider mb-2">Honest-numerics notes</p>
              <ul className="text-xs text-slate-400 space-y-1.5 leading-relaxed">
                <li>• The Bench draws only 2 of infinitely many rays -- the image point is where ALL reflected/refracted rays of that pencil meet (paraxial approximation).</li>
                <li>• Mirror sign rule (Cartesian): light left→right, distances measured from the pole, against-light = negative. That is why u is shown as −u.</li>
                <li>• The faint second reflection in the Tank grows as i nears ic (Fresnel behaviour, simplified) -- real physics, drawn honestly as dashed, not hidden.</li>
                <li>• n values: air 1.00, ice 1.31, water 1.33, kerosene 1.39, glass 1.50, diamond 2.42 -- standard NCERT table.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Where you meet this chapter in real life</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dentists use u &lt; |f| concave mirrors (Bench zone 1). Rear-view mirrors are convex
              (always diminished, wide field). Projectors place the slide between f and 2f of a
              convex lens. Optical fibres and the sparkle of diamonds are total internal reflection
              (Tank). Endoscopes, periscopes with 45° prisms, mirages on hot roads -- all of it is
              this one chapter.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default C10_ScienceLightReflectionRefractionSim;
