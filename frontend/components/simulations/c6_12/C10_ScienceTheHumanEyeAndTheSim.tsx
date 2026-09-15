'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 10 Science -- The Human Eye and the Colourful World
 *
 * Accommodation engine: the ciliary muscle must supply power
 * P = 40 + 100/d dioptres. Myopia/hypermetropia shift the eye's power
 * window; a spectacle lens slides it back.
 *
 * Deep layout (master-class, 6 tabs):
 *   1. Discover  -- predict-then-test walks
 *   2. Focus Lab -- original accommodation engine, preserved + extended
 *   3. Clinic    -- prescription scenarios with far/near point scale
 *   4. Colourful World -- dispersion + sky scattering (Rayleigh) panel
 *   5. Challenge -- 3-tier quiz with hints
 *   6. Truths    -- misconceptions + honest summary
 * Self-contained: react + tailwind only.
 */

type TabKey = 'discover' | 'focus' | 'clinic' | 'colour' | 'challenge' | 'truths';
type Defect = 'normal' | 'myopia' | 'hypermetropia';

const TABS: { id: TabKey; label: string; emoji: string }[] = [
  { id: 'discover', label: '1 \u00b7 Predict', emoji: '\u26a1' },
  { id: 'focus', label: '2 \u00b7 Focus Lab', emoji: '\ud83d\udc41' },
  { id: 'clinic', label: '3 \u00b7 Clinic', emoji: '\ud83e\udd7a' },
  { id: 'colour', label: '4 \u00b7 Colourful World', emoji: '\ud83c\udf08' },
  { id: 'challenge', label: '5 \u00b7 Challenge', emoji: '\ud83c\udfaf' },
  { id: 'truths', label: '6 \u00b7 Truths', emoji: '\ud83e\udee0' },
];

// ==========================================
// CHALLENGES (3 tiers)
// ==========================================

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
  // --- foundation ---
  {
    id: 'ch_01',
    tier: 'foundation',
    skill: 'Accommodation mechanism',
    question: 'The eye changes focus from a distant mountain to a book in your hands by:',
    options: [
      'moving the lens backwards and forwards like a camera lens',
      'changing the curvature (and hence the power) of the lens using ciliary muscles',
      'changing the length of the eyeball',
      'widening the pupil to let in more light',
    ],
    correctIndex: 1,
    explanation:
      'The eye lens is fixed in place; the ciliary muscles swell or relax it. More curvature = more power = focus on near objects. The pupil controls light amount, not focus.',
    hints: [
      'Cameras move the lens; eyes cannot -- the eyeball length is fixed.',
      'What do the ciliary muscles physically do?',
      'They change the lens curvature -- power changes, position does not.',
    ],
  },
  {
    id: 'ch_02',
    tier: 'foundation',
    skill: 'Least distance',
    question: 'The near point of a normal young adult eye is 25 cm. This number is really:',
    options: [
      'the shortest distance at which the fully relaxed (minimum power) eye can focus',
      'the shortest distance at which the fully strained (maximum power) eye can focus',
      'the distance of sharpest colour vision',
      'a fixed property of light itself',
    ],
    correctIndex: 1,
    explanation:
      'Near point = where maximum accommodation (Pmax \u2248 44 D) still forms a sharp image on the retina. Beyond that power, close objects blur -- hold a pencil 8 cm away and try. The far point is the relaxed-eye limit.',
    hints: [
      'Focusing on NEAR objects needs MORE power, not less.',
      'Near point uses the eye\u2019s biggest effort.',
      'It is the maximum-power limit: P = 44 D gives v = 2.5 cm for an object at 25 cm.',
    ],
  },
  {
    id: 'ch_03',
    tier: 'foundation',
    skill: 'Defect recognition',
    question: 'A student sees the blackboard blurry but reads a book comfortably. The defect, its cause, and the correcting lens are:',
    options: [
      'hypermetropia; eyeball too long; convex lens',
      'myopia; eyeball too long OR lens too curved; concave (minus) lens',
      'myopia; eyeball too short; convex lens',
      'hypermetropia; lens too flat; concave lens',
    ],
    correctIndex: 1,
    explanation:
      'Far objects blur = myopia: the eye\u2019s power window is shifted too strong, so the far point pulls in from infinity. A minus (diverging) lens moves the far point back out. Near vision stays fine because the shifted window still covers 25 cm.',
    hints: [
      'Which distance is the problem -- far or near?',
      'A too-strong eye converges rays too early; what kind of lens spreads rays apart first?',
      'Myopia, fixed by a concave minus lens.',
    ],
  },
  // --- standard ---
  {
    id: 'ch_04',
    tier: 'standard',
    skill: 'Lens arithmetic',
    question: 'A myopic eye has a far point of 50 cm. What spectacle power lets it again see infinity clearly?',
    options: ['\u22121.0 D', '\u22122.0 D', '+2.0 D', '\u22120.5 D'],
    correctIndex: 1,
    explanation:
      'The lens must take an object at infinity and form its virtual image AT the far point: 1/f = 1/v + 1/u with u = \u221e gives P = 1/f = 1/(\u22120.5 m) = \u22122.0 D. Verify in the Focus Lab: myopia + \u22122.0 D, object at 400 cm -- sharp.',
    hints: [
      'The correcting lens must image infinity exactly at the far point.',
      'P = 1/f with f in metres, f = \u2212far point distance.',
      'P = 1/(\u22120.50) = \u22122 D.',
    ],
  },
  {
    id: 'ch_05',
    tier: 'standard',
    skill: 'Presbyopia',
    question: 'A 55-year-old with otherwise normal far vision needs reading glasses. Her condition and its mechanism are:',
    options: [
      'myopia -- her eyeball grew longer with age',
      'presbyopia -- the lens stiffens and the ciliary muscles weaken, so maximum power falls and the near point slides away',
      'hypermetropia from birth, only noticed now',
      'colour blindness developing with age',
    ],
    correctIndex: 1,
    explanation:
      'Presbyopia is an accommodation LOSS: Pmax drops below 44 D, so the near point recedes past 25 cm. A convex add-up lens restores close focus. If she is also myopic, bifocals combine both corrections.',
    hints: [
      'Reading needs the MAXIMUM power end of the window -- which end decays with age?',
      'It is not a shift of the window (that is myopia/hypermetropia) but a shrink of its top.',
      'Presbyopia: Pmax falls, near point recedes, convex lens helps.',
    ],
  },
  {
    id: 'ch_06',
    tier: 'standard',
    skill: 'Scattering',
    question: 'The sky is blue at noon but red at sunset. Both effects come from Rayleigh scattering, whose strength grows as roughly 1/\u03bb\u2074. What actually changes between noon and sunset?',
    options: [
      'The Sun emits redder light in the evening',
      'The light\u2019s path through the atmosphere lengthens, so most short-wavelength (blue) light is scattered OUT of the direct beam before it reaches your eyes',
      'Ozone scatters red light only at dusk',
      'The temperature of the sky changes its colour',
    ],
    correctIndex: 1,
    explanation:
      'Scattering strength depends on path length \u00d7 1/\u03bb\u2074. At noon the path is short: blue scatters across the whole sky and reaches your eye from everywhere. At sunset the path is ~30\u00d7 longer: blue is scattered away entirely, and only red/orange survives the trip. Verify in the Colourful World tab.',
    hints: [
      'The Sun\u2019s colour output barely changes in one day.',
      'What multiplies the scattering strength along the way?',
      'A longer atmospheric path removes the blue before the light arrives.',
    ],
  },
  // --- advanced ---
  {
    id: 'ch_07',
    tier: 'advanced',
    skill: 'Model arithmetic',
    question: 'Using P = 40 + 100/d: what power must the eye supply to focus an object 10 cm away, and why is reading at 10 cm tiring?',
    options: [
      '50 D -- only 6 D above the relaxed value, so it is effortless',
      '50 D -- the full 10 D above relaxation must ALL come from ciliary strain, and holding it tires the muscle',
      '14 D -- power adds by 40 + 10 + 100',
      '10 D -- the ciliary muscle contributes 1 D per cm',
    ],
    correctIndex: 1,
    explanation:
      'P = 40 + 100/10 = 50 D. A young eye\u2019s window tops out near 54 D, so 10 cm is possible -- but holding ~10 D of sustained accommodation is exactly what "eye strain" means. The Focus Lab shows the effort meter at 250% of the comfortable reading effort.',
    hints: [
      'Just substitute d = 10 into P = 40 + 100/d.',
      'Compare the effort with focusing at 25 cm (44 D).',
      '50 D, i.e. 10 D above relaxed -- all muscular.',
    ],
  },
  {
    id: 'ch_08',
    tier: 'advanced',
    skill: 'Dispersion and recombination',
    question: 'A prism splits white light into a spectrum, but a second identical prism placed upside-down restores a white beam. What does this prove?',
    options: [
      'The prism creates colours and the second one destroys them',
      'White light is ALREADY a mixture of colours; the prisms only separate and then recombine them -- the colours were in the light, not the glass',
      'The two prisms cancel each other\u2019s refraction completely',
      'Colour is a property of the glass surface',
    ],
    correctIndex: 1,
    explanation:
      'Newton\u2019s classic experiment. Dispersion happens because the glass refracts each wavelength by a different amount; recombining the separated beams reconstitutes white. Glass adds no colour -- it only sorts what was always there.',
    hints: [
      'If the prism CREATED colour, could the second prism undo it?',
      'Newton\'s word for the result: white light is a "mixture".',
      'The colours pre-exist in white light.',
    ],
  },
  {
    id: 'ch_09',
    tier: 'advanced',
    skill: 'Synthesis',
    question: 'A patient\u2019s eye has a power window of [42, 48] D. Which statement is exactly true (retina at 2.5 cm behind the lens)?',
    options: [
      'Far point = infinity; near point = 25 cm -- a perfectly normal eye',
      'Far point = 100/2 = 50 cm; near point = 100/(48\u221240) = 12.5 cm -- a myopic eye whose near vision is BETTER than normal',
      'This eye cannot focus at any distance',
      'Near point = 100/48 \u2248 2.1 cm',
    ],
    correctIndex: 1,
    explanation:
      'Relaxed power 42 D focuses objects where 40 + 100/d = 42 \u2192 d = 50 cm, so the far point is pulled in to 50 cm. Fully strained 48 D covers down to d = 100/8 = 12.5 cm. A strong-shifted window = myopia (far point pulled in) with near vision sharper than the normal 25 cm. The Focus Lab reproduces exactly this case.',
    hints: [
      'Solve 40 + 100/d = P for BOTH window ends.',
      'The far point comes from the RELAXED end; the near point from the MAXIMUM end.',
      'd = 50 cm far, d = 12.5 cm near.',
    ],
  },
];

// ==========================================
// MISCONCEPTIONS
// ==========================================

const MISCONCEPTIONS: { misconception: string; correction: string }[] = [
  {
    misconception: 'A concave lens "weakens the eye" -- glasses are bad for your vision.',
    correction:
      'A minus lens just pre-diverges rays so the over-strong eye can finish the job. It changes nothing inside the eye; myopia may progress with growth, but that happens with or without corrected spectacles. Under-corrected vision is simply blurred vision.',
  },
  {
    misconception: 'The lens moves forward and backward inside the eye to focus.',
    correction:
      'The eyeball length is fixed at about 2.5 cm lens-to-retina. Only the lens SHAPE changes. A camera focuses by moving its lens; your eye focuses by deforming it.',
  },
  {
    misconception: 'Rainbows are formed by raindrops acting like mirrors.',
    correction:
      'Raindrops act as tiny prisms: light refracts on entry, reflects once inside, refracts again on exit -- dispersing 40\u00b0 (red) to 42\u00b0 (violet) from the anti-solar point. No mirror image, no reflection of a rainbow from the sky.',
  },
  {
    misconception: 'The sky is blue because it reflects the ocean.',
    correction:
      'Rayleigh scattering: air molecules scatter short wavelengths ~10\u00d7 more than long ones, and scattered blue reaches your eye from every direction. The ocean is red-herring: deserts sit under equally blue skies.',
  },
  {
    misconception: 'Stars twinkle because their light is weak; planets do not twinkle because they are bright.',
    correction:
      'Twinkling is atmospheric refraction of effectively POINT sources -- stellar discs are so tiny that variable refraction noticeably shifts brightness. Planets are close enough to be small DISCS; their many rays average out the flicker. Brightness is not the mechanism.',
  },
];

// ==========================================
// COLOUR WORLD DATA
// ==========================================

const SPECTRUM = [
  { name: 'violet', nm: 400, hex: '#8b5cf6' },
  { name: 'blue', nm: 460, hex: '#3b82f6' },
  { name: 'green', nm: 520, hex: '#22c55e' },
  { name: 'yellow', nm: 580, hex: '#eab308' },
  { name: 'orange', nm: 610, hex: '#f97316' },
  { name: 'red', nm: 680, hex: '#ef4444' },
];

/** Relative Rayleigh scattering weight ~ (550/lambda)^4. */
const scatterWeight = (nm: number) => Math.pow(550 / nm, 4);

function skyMix(sunElevationDeg: number): string {
  // honest first-order model: the scattering path factor grows as the sun drops;
  // blue light is progressively scattered OUT of the direct view, red survives.
  const elevation = Math.max(0, sunElevationDeg);
  const pathFactor = 1 + 30 * Math.pow(1 - elevation / 90, 3); // 1x at zenith, ~31x at horizon
  const blueKeep = Math.max(0.08, 1 / Math.sqrt(pathFactor)); // short-wavelength survivor fraction
  const redBoost = Math.min(1, pathFactor / 12); // long-wavelength dominance at low sun
  const rr = Math.round(30 + 120 * redBoost);
  const gg = Math.round(40 + 90 * blueKeep * 0.6 + 30 * redBoost);
  const bb = Math.round(60 + 160 * blueKeep);
  return `rgb(${Math.min(rr, 235)}, ${Math.min(gg, 200)}, ${Math.min(bb, 235)})`;
}

// ==========================================
// SUB-COMPONENTS
// ==========================================

function Chip({ children, tone = 'slate' }: { children: React.ReactNode; tone?: string }) {
  const tones: Record<string, string> = {
    slate: 'bg-slate-800 text-slate-300 border-slate-700',
    green: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    red: 'bg-rose-950 text-rose-300 border-rose-800',
    amber: 'bg-amber-950 text-amber-300 border-amber-800',
    sky: 'bg-sky-950 text-sky-300 border-sky-800',
  };
  return (
    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${tones[tone] ?? tones.slate}`}>
      {children}
    </span>
  );
}

function StatCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color: string }) {
  return (
    <div className="bg-slate-950 rounded-xl px-3 py-2 border border-slate-800">
      <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
      <p className={`font-mono font-black text-lg ${color}`}>{value}</p>
      {sub && <p className="text-[10px] text-slate-500">{sub}</p>}
    </div>
  );
}

/** Power-window bar: shows the eye's usable power range and the demanded power. */
function PowerWindow({
  pMin, pMax, needed, canFocus,
}: { pMin: number; pMax: number; needed: number; canFocus: boolean }) {
  const LO = 36, HI = 58; // display range in dioptres
  const x = (v: number) => ((Math.min(Math.max(v, LO), HI) - LO) / (HI - LO)) * 100;
  return (
    <div className="bg-slate-950 rounded-xl border border-slate-800 p-3">
      <div className="relative h-7 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
        <div
          className="absolute inset-y-0 bg-gradient-to-r from-sky-700 to-sky-500 opacity-60"
          style={{ left: `${x(pMin)}%`, width: `${Math.max(2, x(pMax) - x(pMin))}%` }}
          title="usable power window"
        />
        <div
          className="absolute inset-y-0 w-1 transition-all duration-200"
          style={{
            left: `${x(needed)}%`,
            background: canFocus ? '#34d399' : '#fb7185',
          }}
          title="power demanded now"
        />
      </div>
      <div className="flex justify-between text-[9px] text-slate-600 mt-1">
        <span>{LO} D</span>
        <span className="text-sky-400">window [{pMin.toFixed(1)}, {pMax.toFixed(1)}]</span>
        <span>{HI} D</span>
      </div>
    </div>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================

export function C10_ScienceTheHumanEyeAndTheSim() {
  const [tab, setTab] = useState<TabKey>('discover');

  // ── focus lab state (original engine preserved) ──
  const [distanceCm, setDistanceCm] = useState(25);
  const [defect, setDefect] = useState<Defect>('normal');
  const [correction, setCorrection] = useState(0);

  // ── discovery / clinic / colour state ──
  const [predicted, setPredicted] = useState<number | null>(null);
  const [patientIdx, setPatientIdx] = useState(0);
  const [patientRx, setPatientRx] = useState(0);
  const [sunElevation, setSunElevation] = useState(70);

  // ── challenge / truths state ──
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [hintLevel, setHintLevel] = useState<Record<string, number>>({});
  const [tierFilter, setTierFilter] = useState<'all' | Challenge['tier']>('all');
  const [openMisc, setOpenMisc] = useState<number | null>(null);

  // ── the original accommodation engine (formulas preserved exactly) ──
  const defectShift = defect === 'myopia' ? 1.5 : defect === 'hypermetropia' ? -2 : 0;
  const pMin = 40 + defectShift; // relaxed power
  const pMax = pMin + 4; // full accommodation
  const farPoint = defectShift > 0 ? 100 / defectShift : Infinity;
  const nearPoint = 100 / (pMax - 40);

  const reqPower = 40 + 100 / distanceCm; // power needed for object at distanceCm
  const needed = reqPower - correction; // what the eye must supply
  const eyeUsed = Math.min(Math.max(needed, pMin), pMax);
  const canFocus = Math.abs(eyeUsed - needed) < 0.001;

  // actual image distance for the power the eye could supply
  const netP = eyeUsed + correction;
  const vImg = 1 / (netP - 1 / (distanceCm / 100)); // metres
  const blurMM = (vImg - 0.025) * 1000;

  // SVG ray convergence: retina at x=330, lens at x=150
  const pxPerCm = (330 - 150) / 2.5;
  const focusX = 150 + vImg * 100 * pxPerCm;

  const status = canFocus
    ? { text: `Sharp focus -- ciliary muscle at ${(((eyeUsed - pMin) / 4) * 100).toFixed(0)}% effort`, cls: 'text-emerald-300 border-emerald-700 bg-emerald-950/40' }
    : blurMM < 0
    ? { text: `BLURRED: rays meet ${(0 - blurMM).toFixed(1)} mm in FRONT of retina (image too close)`, cls: 'text-rose-300 border-rose-700 bg-rose-950/40' }
    : { text: `BLURRED: rays meet ${blurMM.toFixed(1)} mm BEHIND retina (image too far)`, cls: 'text-amber-300 border-amber-700 bg-amber-950/40' };

  const effortPct = Math.min(150, Math.max(0, ((eyeUsed - pMin) / 4) * 100));

  // ── clinic: prescription patients ──
  const PATIENTS = [
    {
      name: 'Aarav, 14',
      complaint: 'Cannot read the blackboard from the back bench; books are fine. Far point measured at 66.7 cm.',
      defect: 'myopia' as Defect,
      idealRx: -1.5,
      verdictOk: (rx: number) => Math.abs(rx + 1.5) < 0.26,
      teach: 'Far point 66.7 cm needs P = 1/(\u22120.667) = \u22121.5 D. Slide the correction to \u22121.50 D and check the object at 400 cm.',
    },
    {
      name: 'Mrs. D\u2019Souza, 58',
      complaint: 'Threads a needle only at arm\u2019s length now; distance vision unchanged since childhood.',
      defect: 'normal' as Defect,
      idealRx: 2,
      verdictOk: (rx: number) => Math.abs(rx - 2) < 0.26,
      teach: 'Presbyopia: a convex ADD for close work. +2.0 D brings the near point back to ~25 cm without touching distance vision.',
    },
    {
      name: 'Kiran, 12',
      complaint: 'Headaches after reading; holds books at 40+ cm. Cannot see clearly closer than 50 cm.',
      defect: 'hypermetropia' as Defect,
      idealRx: 2,
      verdictOk: (rx: number) => Math.abs(rx - 2) < 0.26,
      teach: 'Hypermetropia: near point pushed out to 50 cm. A +2.0 D convex lens restores comfortable 25 cm reading. Verify in the Focus Lab.',
    },
  ];
  const patient = PATIENTS[patientIdx];

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

  const skyColour = skyMix(sunElevation);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* header */}
      <div className="flex flex-wrap items-center gap-3 pb-3 mb-3 border-b border-slate-800">
        <span className="text-3xl p-2 bg-sky-950/80 rounded-2xl border border-sky-700">\ud83d\udc41</span>
        <div className="flex-1 min-w-[220px]">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
            Class 10 -- The Human Eye and the Colourful World
          </span>
          <h1 className="text-xl md:text-2xl font-extrabold">Accommodation Engine and Correcting Defects</h1>
        </div>
        <Chip tone="sky">retina 2.5 cm</Chip>
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
      {/* TAB 1: DISCOVER                                              */}
      {/* ============================================================ */}
      {tab === 'discover' && (
        <div className="space-y-4">
          <div className="p-5 bg-slate-900/70 rounded-2xl border border-sky-900/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-sky-400 mb-2">Predict before you play</p>
            <p className="text-sm text-slate-200 leading-relaxed">
              A myopic eye\u2019s far point is 66.7 cm. You give it a \u22121.50 D spectacle lens. Where
              is the far point NOW -- measured from the lens?
            </p>
            <div className="mt-3 space-y-2">
              {[
                'Still 66.7 cm -- glasses only help nearby.',
                'At infinity -- that is exactly what the prescription was designed to do.',
                'At 33 cm -- glasses halve the defect.',
                'At 25 cm -- the normal near point.',
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
                    {predicted !== null && isCorrect && <span className="ml-2 text-emerald-400 font-bold text-xs">\u2713</span>}
                  </button>
                );
              })}
            </div>
            {predicted !== null && (
              <div className="mt-3 p-3 rounded-xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
                A \u22121.5 D lens images infinity at 1/1.5 = 0.667 m -- precisely at the far point. The
                eye then does what it always could. Verify: Focus Lab \u2192 myopia \u2192 \u22121.50 D
                \u2192 object at 400 cm \u2192 sharp.
                <button onClick={() => setTab('focus')} className="ml-2 underline font-bold text-amber-300">
                  Open Focus Lab \u2192
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                t: 'Walk 1: Find the limits',
                d: 'Normal eye. Slide the object from 400 cm inward. Note where focus first fails -- that is the near point acting. Watch the effort meter climb.',
              },
              {
                t: 'Walk 2: Break the eye',
                d: 'Switch to myopia. The far point collapses from infinity to ~67 cm. Now find the one correction value that returns infinity vision.',
              },
              {
                t: 'Walk 3: The sunset trick',
                d: 'Open the Colourful World tab and drag the Sun from noon to the horizon. The same physics that blurs stars paints the sky.',
              },
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
      {/* TAB 2: FOCUS LAB (original engine preserved + extended)      */}
      {/* ============================================================ */}
      {tab === 'focus' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
            <svg viewBox="0 0 460 260" className="w-full" role="img" aria-label="eye ray diagram">
              {/* object arrow */}
              <line x1={40} y1={200} x2={40} y2={120} stroke="#e2e8f0" strokeWidth={3} />
              <polygon points="40,114 34,128 46,128" fill="#e2e8f0" />
              <text x={40} y={216} textAnchor="middle" fontSize={10} fill="#94a3b8">object at {distanceCm} cm</text>
              {/* distance ruler */}
              <line x1={40} y1={228} x2={300} y2={228} stroke="#334155" strokeWidth={1} strokeDasharray="2 4" />
              {/* eyeball */}
              <circle cx={300} cy={160} r={110} fill="rgba(56,189,248,0.05)" stroke="#334155" strokeWidth={2} />
              {/* cornea + lens */}
              <path
                d={`M 172,110 Q ${148 - effortPct * 0.14},160 172,210`}
                fill="rgba(251,191,36,0.25)"
                stroke="#fbbf24"
                strokeWidth={3}
                style={{ transition: 'all 0.2s' }}
              />
              <text x={150} y={232} fontSize={10} fill="#fbbf24">lens (bulges with effort)</text>
              {/* retina */}
              <path d="M 395,80 A 118 118 0 0 1 395,240" fill="none" stroke="#f43f5e" strokeWidth={4} />
              <text x={408} y={163} fontSize={10} fill="#f43f5e">retina</text>
              {/* rays converging */}
              {[[110, 160], [210, 160]].map(([ly], i) => (
                <g key={i}>
                  <line
                    x1={40} y1={160 - (i === 0 ? 4 : -4) - 60 + (i === 0 ? 64 : 56)} x2={172}
                    y2={i === 0 ? 152 : 168}
                    stroke={canFocus ? '#38bdf8' : '#fb7185'} strokeWidth={1.8}
                    style={{ transition: 'stroke 0.3s' }}
                  />
                  <line
                    x1={172} y1={i === 0 ? 152 : 168}
                    x2={Math.min(Math.max(focusX, 200), 460)}
                    y2={i === 0 ? 160 + (focusX > 172 ? 0 : -8 * (172 - focusX) / 40) : 160 + (focusX > 172 ? 0 : 8 * (172 - focusX) / 40)}
                    stroke={canFocus ? '#38bdf8' : '#fb7185'} strokeWidth={1.8}
                    style={{ transition: 'stroke 0.3s' }}
                  />
                </g>
              ))}
              {/* focus point */}
              <circle cx={Math.min(Math.max(focusX, 200), 458)} cy={160} r={6} fill={canFocus ? '#34d399' : '#fb7185'} style={{ transition: 'all 0.3s' }}>
                <animate attributeName="r" values="5;7;5" dur="1s" repeatCount="indefinite" />
              </circle>
              {/* retina plane marker */}
              <line x1={330} y1={100} x2={330} y2={220} stroke="#475569" strokeWidth={1} strokeDasharray="4 3" />
              <text x={330} y={94} textAnchor="middle" fontSize={9} fill="#64748b">2.5 cm plane</text>
              {/* ciliary muscle annotation */}
              <text x={300} y={30} textAnchor="middle" fontSize={9} fill="#fbbf24">
                ciliary effort: {effortPct.toFixed(0)}% {effortPct > 100 ? '(beyond limit!)' : effortPct > 60 ? '(straining)' : '(relaxed)'}
              </text>
            </svg>
            <div className={`rounded-xl border px-3 py-2 text-xs font-mono ${status.cls}`}>{status.text}</div>
            {/* power window */}
            <div className="mt-3">
              <PowerWindow pMin={pMin} pMax={pMax} needed={needed} canFocus={canFocus} />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Object distance</span>
                  <span className="font-mono font-bold text-sky-400">{distanceCm} cm</span>
                </div>
                <input
                  type="range" min={15} max={400} value={distanceCm} aria-label="object distance"
                  onChange={(e) => setDistanceCm(Number(e.target.value))}
                  className="w-full accent-sky-500"
                />
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {(['normal', 'myopia', 'hypermetropia'] as Defect[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => { setDefect(d); setCorrection(0); }}
                    className={`py-1.5 rounded-lg text-[10px] font-bold capitalize ${defect === d ? 'bg-sky-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Spectacle lens power</span>
                  <span className={`font-mono font-bold ${correction < 0 ? 'text-cyan-300' : correction > 0 ? 'text-amber-300' : 'text-slate-400'}`}>
                    {correction > 0 ? '+' : ''}{correction.toFixed(2)} D
                  </span>
                </div>
                <input
                  type="range" min={-6} max={4} step={0.25} value={correction} aria-label="correction power"
                  onChange={(e) => setCorrection(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
              <button
                onClick={() => { setDefect('normal'); setCorrection(0); setDistanceCm(25); }}
                className="w-full min-h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold"
              >
                Reset eye
              </button>
            </div>

            {/* readouts (original panel preserved + extended) */}
            <div className="bg-slate-900/80 rounded-2xl border border-sky-800/60 p-4 text-xs font-mono space-y-1">
              <p className="text-slate-300">Power needed: 40 + 100/{distanceCm} = <span className="text-sky-300 font-bold">{reqPower.toFixed(2)} D</span></p>
              <p className="text-slate-500">
                Eye window: [{pMin.toFixed(1)}, {pMax.toFixed(1)}] D
                {defect !== 'normal' && <span className="text-rose-400"> (shifted by {defectShift} D)</span>}
              </p>
              <p className="text-slate-500">
                Far point = {farPoint === Infinity ? 'infinity' : `${farPoint.toFixed(0)} cm`} ; Near point = {nearPoint.toFixed(0)} cm
              </p>
              <p className="text-slate-500">Image forms at {vImg.toFixed(3)} cm from lens (retina wants 2.500 cm)</p>
              <p className="text-slate-500">
                Spectacle adds {correction.toFixed(2)} D in front -- net demand on the eye: {needed.toFixed(2)} D
              </p>
              {defect === 'myopia' && farPoint < Infinity && (
                <p className="text-cyan-300">
                  Correct infinity Rx = 1/(\u2212{(farPoint / 100).toFixed(2)} m) = {(-100 / farPoint).toFixed(2)} D
                </p>
              )}
            </div>

            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
              <p className="font-bold text-slate-300 mb-1">Teaching note</p>
              <p>
                The eye focuses not by moving the lens but by swelling it: power P = 40 + 100/d
                dioptres. Myopia is a window shifted too strong (distant objects blur; fix with a
                minus, concave lens). Hypermetropia is too weak up close (fix with a plus, convex
                lens). Age weakens accommodation -- presbyopia needs bifocals.
              </p>
            </div>

            <div className="bg-sky-950/40 rounded-2xl border border-sky-800/50 p-4 text-xs">
              <p className="font-bold text-sky-300 mb-1">What to try</p>
              <p>1. Give the myopic eye exactly \u22121.50 D and slide the object to 300 cm. Predict sharp before checking.</p>
              <p className="mt-1">2. With the normal eye at 25 cm, why does the near point equal exactly 25? Verify with P = 44 D.</p>
              <p className="mt-1">3. Over-correct on purpose (+1 D too much). Which direction does the blur go, and what does that feel like in real life?</p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: CLINIC                                                */}
      {/* ============================================================ */}
      {tab === 'clinic' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
              <div className="flex gap-1.5">
                {PATIENTS.map((pt, i) => (
                  <button
                    key={pt.name}
                    onClick={() => { setPatientIdx(i); setPatientRx(0); }}
                    className={`flex-1 py-2 rounded-xl text-[11px] font-bold ${patientIdx === i ? 'bg-sky-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                  >
                    Patient {i + 1}
                  </button>
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-100">{patient.name}</p>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">{patient.complaint}</p>
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Your prescription</span>
                  <span className={`font-mono font-bold ${patientRx < 0 ? 'text-cyan-300' : patientRx > 0 ? 'text-amber-300' : 'text-slate-500'}`}>
                    {patientRx > 0 ? '+' : ''}{patientRx.toFixed(2)} D
                  </span>
                </div>
                <input
                  type="range" min={-4} max={4} step={0.25} value={patientRx} aria-label="prescription"
                  onChange={(e) => setPatientRx(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
              <button
                onClick={() => setTab('focus')}
                className="w-full min-h-9 rounded-xl bg-sky-600 hover:bg-sky-500 text-xs font-bold"
              >
                Test this Rx in the Focus Lab \u2192
              </button>
            </div>

            <div
              className={`rounded-2xl border p-4 text-xs leading-relaxed ${
                patientRx === 0
                  ? 'bg-slate-900/70 border-slate-800 text-slate-400'
                  : patient.verdictOk(patientRx)
                  ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-800 text-rose-200'
              }`}
            >
              {patientRx === 0 ? (
                'Choose a power, then verify it: set the matching defect and correction in the Focus Lab and slide the object to the problem distance.'
              ) : patient.verdictOk(patientRx) ? (
                <>
                  <span className="font-bold">Correct prescription.</span> {patient.teach}
                </>
              ) : (
                <>
                  <span className="font-bold">Not the ideal Rx.</span> Work from the complaint: which
                  distance fails? Far \u2192 myopia \u2192 minus lens sized to the far point. Near \u2192
                  plus lens. {patient.teach}
                </>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {/* far/near point scale */}
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">
                Range of clear vision -- three eyes compared
              </p>
              {[
                { name: 'normal young eye', fp: 'infinity', np: 25, tone: 'emerald' },
                { name: 'myopic (window +1.5 D)', fp: '67 cm', np: 25, tone: 'rose' },
                { name: 'presbyopic (Pmax \u22122 D)', fp: 'infinity', np: 50, tone: 'amber' },
              ].map((row) => (
                <div key={row.name} className="mb-2.5">
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-slate-300 font-semibold">{row.name}</span>
                    <span className="font-mono text-slate-500">far {row.fp} \u00b7 near {row.np} cm</span>
                  </div>
                  <div className="relative h-4 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                    <div
                      className={`absolute inset-y-0 ${row.tone === 'rose' ? 'bg-rose-700' : row.tone === 'amber' ? 'bg-amber-600' : 'bg-emerald-600'} opacity-70 transition-all`}
                      style={{
                        left: row.fp === 'infinity' ? '0%' : `${(1 - 1 / 4) * 100}%`,
                        width: row.fp === 'infinity' ? '100%' : `${(1 / 4) * 100}%`,
                      }}
                    />
                    {/* 25 cm reference */}
                    <div className="absolute inset-y-0 w-px bg-white/40" style={{ left: '25%' }} />
                  </div>
                </div>
              ))}
              <p className="text-[10px] text-slate-500 leading-relaxed mt-1">
                Bar = range of sharp vision (log scale, 0-400 cm compressed). The white tick is the
                25 cm reading distance. Myopia LOSES the far end; presbyopia LOSES the near end.
              </p>
            </div>

            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
              <p className="font-bold text-slate-300 mb-1">How optometrists actually measure this</p>
              <p>
                They do not ask your ciliary muscles to confess. They find the far point by sliding
                test lenses until the smallest chart line is sharp, then compute P = 1/(far point in
                metres). The Clinic\u2019s three cases are the real decision tree.
              </p>
            </div>

            <div className="bg-sky-950/40 rounded-2xl border border-sky-800/50 p-4 text-xs">
              <p className="font-bold text-sky-300 mb-1">What to try</p>
              <p>1. Patient 1: derive the Rx from 66.7 cm yourself BEFORE checking -- P = 1/(\u22120.667 m).</p>
              <p className="mt-1">2. Give Kiran (patient 3) a \u22121.00 D by mistake. What happens to his near point, and why does he now complain twice as much?</p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: COLOURFUL WORLD                                       */}
      {/* ============================================================ */}
      {tab === 'colour' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            {/* prism dispersion */}
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-2">
                Dispersion: the prism sorts what white light already contains
              </p>
              <svg viewBox="0 0 440 200" className="w-full" role="img" aria-label="prism dispersion">
                {/* incoming white beam */}
                <line x1={20} y1={100} x2={185} y2={100} stroke="#f8fafc" strokeWidth={5} opacity={0.9} />
                <text x={70} y={88} fontSize={10} fill="#e2e8f0">white light</text>
                {/* prism */}
                <polygon points="200,60 260,160 140,160" fill="rgba(167,139,250,0.15)" stroke="#a78bfa" strokeWidth={2} />
                {/* dispersed beams */}
                {SPECTRUM.map((c, i) => {
                  const spread = (i - 2.5) * 14;
                  return (
                    <line
                      key={c.name}
                      x1={200} y1={110 + (i - 2.5) * 2}
                      x2={430} y2={100 + spread}
                      stroke={c.hex}
                      strokeWidth={3}
                      opacity={0.9}
                    />
                  );
                })}
                <text x={340} y={40} fontSize={9} fill="#8b5cf6">violet bends most</text>
                <text x={340} y={185} fontSize={9} fill="#ef4444">red bends least</text>
                <text x={300} y={165} fontSize={8} fill="#64748b">
                  n(violet) &gt; n(red) -- short wavelengths refract harder
                </text>
              </svg>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Every wavelength refracts at its own angle (violet most). A second upside-down prism
                recombines them -- proving the colours were in the light, not the glass.
              </p>
            </div>

            {/* scattering table */}
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">
                Rayleigh scattering weight \u221d (550/\u03bb)\u2074
              </p>
              <div className="space-y-1.5">
                {SPECTRUM.map((c) => {
                  const w = scatterWeight(c.nm);
                  return (
                    <div key={c.name} className="flex items-center gap-2">
                      <span className="text-[10px] w-14 text-slate-400">{c.name}</span>
                      <div className="flex-1 h-3 rounded bg-slate-950 border border-slate-800 overflow-hidden">
                        <div
                          className="h-full transition-all duration-300"
                          style={{ width: `${(w / scatterWeight(400)) * 100}%`, background: c.hex }}
                        />
                      </div>
                      <span className="font-mono text-[10px] text-slate-500 w-10 text-right">{w.toFixed(1)}\u00d7</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                Violet scatters ~2.9\u00d7 harder than red. The sky is not violet only because the Sun
                emits less violet and our eyes are poor at seeing it.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* sky simulator */}
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2">
                Sky colour vs Sun elevation
              </p>
              <div
                className="h-32 rounded-xl border border-slate-700 transition-all duration-300 flex items-end justify-center pb-2"
                style={{ background: skyColour }}
              >
                <span className="text-xs font-bold text-white/90 drop-shadow">
                  {sunElevation > 30 ? 'noon sky -- blue dominates' : sunElevation > 8 ? 'low sun -- orange stretch' : 'sunset -- red survives the long trip'}
                </span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Sun elevation</span>
                  <span className="font-mono font-bold text-amber-400">{sunElevation}\u00b0</span>
                </div>
                <input
                  type="range" min={0} max={90} value={sunElevation} aria-label="sun elevation"
                  onChange={(e) => setSunElevation(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-2">
                Scattering strength \u221d path length \u00d7 1/\u03bb\u2074. Lower the Sun: the path
                through air stretches up to ~30\u00d7, blue is scattered away before reaching you, and
                the direct beam that survives is red. Twinkling stars, the advanced sunrise and the
                blue sky are all the same refraction-and-scattering story.
              </p>
            </div>

            {/* rainbow geometry */}
            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
              <p className="font-bold text-slate-300 mb-1">The rainbow\u2019s recipe (one drop, 42\u00b0)</p>
              <p>
                Enter the drop (refract + disperse) \u2192 reflect once off the back \u2192 exit
                (refract again). Red exits at 42\u00b0 from the anti-solar point, violet at 40\u00b0.
                That is why rainbows always sit OPPOSITE the Sun, and why you can never approach one.
              </p>
            </div>

            <div className="bg-violet-950/40 rounded-2xl border border-violet-800/50 p-4 text-xs">
              <p className="font-bold text-violet-300 mb-1">What to try</p>
              <p>1. Drag the Sun from 90\u00b0 to 0\u00b0 and narrate the colour change with the 1/\u03bb\u2074 rule.</p>
              <p className="mt-1">2. Why does a "red sunset" prove the atmosphere, not the Sun, is doing the colouring? What would the sky look like from the Moon (no air)?</p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 5: CHALLENGE                                             */}
      {/* ============================================================ */}
      {tab === 'challenge' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs text-slate-400 mr-1">
              Score: <span className="font-mono font-bold text-emerald-300">{score.right}</span>/{score.attempted || 0}
            </p>
            <Chip tone="green">{score.right} correct</Chip>
            <Chip tone="slate">{CHALLENGES.length} questions</Chip>
            <div className="ml-auto flex gap-1.5">
              {(['all', 'foundation', 'standard', 'advanced'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTierFilter(t)}
                  className={`min-h-9 px-3 rounded-lg text-[11px] font-bold capitalize transition-all ${
                    tierFilter === t ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {visibleChallenges.map((ch, qi) => {
            const chosen = answers[ch.id];
            const isRevealed = revealed[ch.id];
            const hints = hintLevel[ch.id] ?? 0;
            return (
              <div
                key={ch.id}
                className={`p-4 rounded-2xl border ${
                  isRevealed
                    ? chosen === ch.correctIndex
                      ? 'bg-emerald-950/30 border-emerald-800'
                      : 'bg-rose-950/30 border-rose-800'
                    : 'bg-slate-900/70 border-slate-800'
                }`}
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Chip tone={ch.tier === 'foundation' ? 'green' : ch.tier === 'standard' ? 'amber' : 'red'}>{ch.tier}</Chip>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500">{ch.skill}</span>
                  <span className="text-[10px] text-slate-600 ml-auto">Q{qi + 1}</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed mb-2.5">{ch.question}</p>
                <div className="space-y-1.5">
                  {ch.options.map((opt, i) => {
                    let cls = 'border-slate-700 bg-slate-950 hover:border-sky-600';
                    if (isRevealed && i === ch.correctIndex) cls = 'border-emerald-600 bg-emerald-950/60';
                    else if (isRevealed && i === chosen) cls = 'border-rose-600 bg-rose-950/60';
                    return (
                      <button
                        key={i}
                        onClick={() => pickAnswer(ch.id, i)}
                        disabled={isRevealed}
                        className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all disabled:cursor-default ${cls}`}
                      >
                        <span className="font-mono text-xs text-slate-500 mr-2">{'ABCD'[i]}</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {!isRevealed && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => setHintLevel((h) => ({ ...h, [ch.id]: Math.min(3, hints + 1) }))}
                      disabled={hints >= 3}
                      className="min-h-9 px-3 rounded-lg bg-amber-950/60 border border-amber-800 text-[11px] font-bold text-amber-300 disabled:opacity-40"
                    >
                      {hints === 0 ? 'I need a hint' : `more (${hints}/3)`}
                    </button>
                    {hints > 0 && (
                      <p className="text-[11px] text-amber-200/90 leading-relaxed w-full px-1">{ch.hints[hints - 1]}</p>
                    )}
                  </div>
                )}
                {isRevealed && (
                  <div className="mt-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className={chosen === ch.correctIndex ? 'font-bold text-emerald-400' : 'font-bold text-rose-400'}>
                      {chosen === ch.correctIndex ? 'Correct. ' : 'Not yet. '}
                    </span>
                    {ch.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 6: TRUTHS                                                */}
      {/* ============================================================ */}
      {tab === 'truths' && (
        <div className="space-y-4">
          <div className="space-y-3">
            {MISCONCEPTIONS.map((m, i) => (
              <div key={i} className="rounded-2xl border border-rose-900/60 bg-rose-950/20 overflow-hidden">
                <button
                  onClick={() => setOpenMisc((cur) => (cur === i ? null : i))}
                  className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-rose-950/40 transition-colors"
                >
                  <span className="text-rose-400 font-black text-lg leading-none">\u2717</span>
                  <span className="text-sm font-bold text-rose-200 flex-1">{m.misconception}</span>
                  <span className="text-slate-500 text-xs">{openMisc === i ? '\u25b2' : '\u25bc'}</span>
                </button>
                {openMisc === i && (
                  <div className="px-4 pb-4">
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-200 leading-relaxed">
                      <span className="font-bold text-emerald-300">The truth: </span>
                      {m.correction}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-5 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2">If you remember three lines</p>
            <ol className="space-y-2 text-sm text-slate-300 leading-relaxed list-decimal ml-5">
              <li>The eye focuses by CHANGING its lens shape -- power window [40, 44] D for a young normal eye.</li>
              <li>Myopia = window too strong (far point pulled in, minus lens fixes); hypermetropia = too weak up close (plus lens).</li>
              <li>Blue skies, red sunsets, twinkling stars and rainbows are all one story: refraction + 1/\u03bb\u2074 scattering.</li>
            </ol>
            <div className="mt-3 flex gap-2">
              <button onClick={() => setTab('focus')} className="min-h-11 px-5 rounded-xl bg-sky-600 hover:bg-sky-500 text-sm font-bold">
                Back to the Focus Lab
              </button>
              <button
                onClick={() => { setDefect('normal'); setCorrection(0); setDistanceCm(25); }}
                className="min-h-11 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold"
              >
                Reset the eye
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default C10_ScienceTheHumanEyeAndTheSim;
