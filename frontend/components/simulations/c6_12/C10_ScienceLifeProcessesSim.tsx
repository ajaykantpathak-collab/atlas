'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Class 10 Science -- Life Processes (respiration; circulation is covered
 * separately by C10_BiologyCirculatorySystemdetailedSim).
 *
 * Breathing ventilation math plus aerobic vs anaerobic ATP accounting.
 * Deep layout (master-class, 6 tabs):
 *   1. Discover  -- predict-then-test guided walks
 *   2. Lungs Lab -- animated breathing, tidal volume, dead-space meter
 *   3. Alveoli   -- gas-exchange close-up with partial-pressure readouts
 *   4. ATP Ledger-- aerobic vs anaerobic energy accounting, O2 debt
 *   5. Challenge -- 3-tier quiz with hints
 *   6. Misconceptions + honest summary
 * Self-contained: react + tailwind only.
 */

type TabKey = 'discover' | 'lungs' | 'alveoli' | 'ledger' | 'challenge' | 'misconceptions';
type Activity = 'rest' | 'walk' | 'sprint';
type Mode = 'aerobic' | 'anaerobic';

// ==========================================
// CONSTANTS & DATA
// ==========================================

const DEAD_SPACE_ML = 150; // anatomical dead space per breath
const O2_IN_AIR = 0.21; // fraction of O2 in inhaled air
const CO2_IN_AIR = 0.0004;
const ALVEOLAR_O2 = 0.14; // fraction of O2 in alveolar air
const O2_PER_GLUCOSE_MOL = 6; // stoichiometry of aerobic respiration
const GLUCOSE_MG_PER_MMOL_O2 = 180 / 1; // mg per mmol O2 (22.4 mL O2 = 1 mmol)
const KCAL_PER_ATP_MOL = 7.3;

const ACTIVITY_O2: Record<Activity, number> = { rest: 0.25, walk: 0.9, sprint: 2.5 };
const ACTIVITY_PULSE: Record<Activity, number> = { rest: 72, walk: 100, sprint: 160 };
const ACTIVITY_LABEL: Record<Activity, string> = { rest: 'sitting still', walk: 'brisk walk', sprint: '100 m sprint' };

const TABS: { id: TabKey; label: string; emoji: string }[] = [
  { id: 'discover', label: '1 \u00b7 Predict', emoji: '\u26a1' },
  { id: 'lungs', label: '2 \u00b7 Lungs Lab', emoji: '\ud83e\uddeA' },
  { id: 'alveoli', label: '3 \u00b7 Alveoli', emoji: '\ud83e\uddea' },
  { id: 'ledger', label: '4 \u00b7 ATP Ledger', emoji: '\u26a1' },
  { id: 'challenge', label: '5 \u00b7 Challenge', emoji: '\ud83c\udfaf' },
  { id: 'misconceptions', label: '6 \u00b7 Truths', emoji: '\ud83e\udee0' },
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
    skill: 'Definition',
    question: 'Respiration is correctly described as:',
    options: [
      'the movement of air in and out of the lungs',
      'the process by which food is broken down to release energy inside every living cell',
      'only the exchange of gases in the alveoli',
      'the pumping of blood by the heart to the lungs',
    ],
    correctIndex: 1,
    explanation:
      'Breathing (ventilation) is only the delivery step. Respiration proper is the cellular process that breaks down glucose to release usable energy (ATP) -- it happens in every cell, not just the lungs.',
    hints: [
      'Which option works even for an amoeba, which has no lungs at all?',
      'Breathing is to respiration what a delivery truck is to a factory.',
      'Option 2 -- energy release inside cells.',
    ],
  },
  {
    id: 'ch_02',
    tier: 'foundation',
    skill: 'Aerobic vs anaerobic',
    question: 'Aerobic respiration of one glucose molecule releases at most how many ATP (Class 10 accounting), and anaerobic how many?',
    options: ['38 and 2', '2 and 38', '36 and 4', '100 and 10'],
    correctIndex: 0,
    explanation:
      'Aerobic: glucose + 6O2 \u2192 6CO2 + 6H2O + 38 ATP. Anaerobic in muscle: glucose \u2192 lactic acid + 2 ATP. That 19-fold gap is why oxygen debt makes you exhausted.',
    hints: [
      'The two equation cards in the ATP ledger show the numbers directly.',
      'Aerobic uses mitochondria -- the powerhouse -- so it wins by a landslide.',
      '38 aerobic, 2 anaerobic.',
    ],
  },
  {
    id: 'ch_03',
    tier: 'foundation',
    skill: 'Anaerobic products',
    question: 'During a sprint, your leg muscles switch partly to anaerobic respiration. The chemical that builds up and causes the cramp is:',
    options: ['lactic acid', 'ethanol', 'carbon dioxide', 'pyruvate salt'],
    correctIndex: 0,
    explanation:
      'Human muscle anaerobic respiration: glucose \u2192 lactic acid. Yeast would make ethanol and CO2 instead -- same low ATP yield, different end product. The "oxygen debt" you repay by panting afterwards clears the lactic acid.',
    hints: [
      'Which option is also what yeast produces... in a different organism?',
      'The ATP ledger tab names it under the anaerobic equation.',
      'Lactic acid.',
    ],
  },
  // --- standard ---
  {
    id: 'ch_04',
    tier: 'standard',
    skill: 'Ventilation math',
    question: 'A person breathes 20 times per minute at 400 mL per breath. Another breathes 10 times per minute at 800 mL. Whose FRESH AIR actually reaches the alveoli faster (ignore dead space differences beyond the fixed 150 mL)?',
    options: [
      'The fast, shallow breather: 8 L/min total',
      'The slow, deep breather: 6.5 L/min alveolar ventilation vs 5 L/min',
      'Both identical -- total volume is what matters',
      'Impossible to say without knowing their lung capacity',
    ],
    correctIndex: 1,
    explanation:
      'Alveolar ventilation = rate \u00d7 (tidal \u2212 150): shallow = 20\u00d7250 = 5.0 L/min; deep = 10\u00d7650 = 6.5 L/min. The first 150 mL of every breath just pushes stale air around -- wasted effort. That is why deep slow breathing wins.',
    hints: [
      'Subtract the dead space BEFORE multiplying by rate.',
      'For the shallow breather, nearly 40% of each breath never reaches the alveoli.',
      'Deep breather: 10 \u00d7 650 mL = 6.5 L/min.',
    ],
  },
  {
    id: 'ch_05',
    tier: 'standard',
    skill: 'Gas exchange',
    question: 'Oxygen actually moves from the alveolus into the blood because:',
    options: [
      'the blood pumps it in actively, using ATP',
      'it diffuses down its concentration gradient -- alveolar O2 is higher than deoxygenated blood O2',
      'haemoglobin chemically grabs O2 and pulls it against the gradient',
      'the diaphragm squeezes the alveoli and pushes O2 into capillaries',
    ],
    correctIndex: 1,
    explanation:
      'Alveolar air holds ~14% O2; arriving venous blood has much lower O2, so O2 diffuses IN while CO2 diffuses OUT (blood CO2 is higher). No energy is spent on the exchange itself -- only the breathing muscles cost ATP. Haemoglobin just keeps blood O2 low by binding what arrives, maintaining the gradient.',
    hints: [
      'Which process requires no energy and always runs downhill?',
      'Diffusion needs a difference -- what difference exists between alveolus and venous blood?',
      'Passive diffusion down the O2 concentration gradient.',
    ],
  },
  {
    id: 'ch_06',
    tier: 'standard',
    skill: 'Reading the model',
    question: 'In the lungs lab, you set the breathing rate to 45/min with 300 mL tidal volume during a sprint. The extraction efficiency shows over 100% and the panel warns of O2 debt. What is the honest physiological meaning?',
    options: [
      'The lungs are extracting more oxygen than exists -- the model is broken',
      'Ventilation alone cannot supply 2.5 L/min; the shortfall is paid by ANAEROBIC respiration in muscles, creating the oxygen debt you repay later',
      'The person will faint immediately',
      'The alveoli have doubled in size to compensate',
    ],
    correctIndex: 1,
    explanation:
      'Even maximum panting (45\u00d7300 mL) only delivers ~2.8 L/min of fresh air, less after dead space. Sprinting needs 2.5 L/min of O2 USE -- the gap is met anaerobically. Panting fast and shallow is a terrible fix: dead space eats 150 mL of every tiny breath.',
    hints: [
      'What was the alveolar ventilation figure at those settings? Compare it with 2.5 L/min.',
      'Where else can a cell get ATP when O2 runs short?',
      'The deficit is paid by anaerobic respiration -- the oxygen debt.',
    ],
  },
  // --- advanced ---
  {
    id: 'ch_07',
    tier: 'advanced',
    skill: 'Stoichiometry',
    question: 'Using the ledger\u2019s chemistry: consuming 0.25 L/min of O2 at rest corresponds to roughly how many mg of glucose being oxidised per minute?',
    options: ['about 3.4 mg/min', 'about 34 mg/min', 'about 340 mg/min', 'about 3400 mg/min'],
    correctIndex: 2,
    explanation:
      '0.25 L O2 = 250 mL \u00f7 22.4 mL/mmol \u2248 11.2 mmol O2. Glucose needs 6 O2 per molecule, so glucose \u2248 1.86 mmol \u00d7 180 mg/mmol \u2248 335 mg/min. Sanity check: 335 mg glucose \u00d7 17 kJ/g \u2248 5.7 kJ/min \u2248 1.4 kcal/min -- exactly a resting metabolic rate. The 6:1 stoichiometry is the exam skill.',
    hints: [
      'Convert O2 volume to mmol: 22.4 mL per mmol.',
      'Divide by 6 for glucose moles, multiply by 180 mg/mmol.',
      '11.2 \u00f7 6 \u00d7 180 \u2248 335 mg/min.',
    ],
  },
  {
    id: 'ch_08',
    tier: 'advanced',
    skill: 'Design of the system',
    question: 'Why do alveoli exist as ~300 million tiny sacs rather than two big hollow lung-balloons?',
    options: [
      'Tiny sacs are stronger against coughing pressure',
      'Surface area: the same lung volume split into millions of sacs gives ~70 m\u00b2 of exchange surface -- a tennis court folded into your chest',
      'Big balloons would need thicker walls to hold the same volume',
      'It is an accident of embryology with no functional meaning',
    ],
    correctIndex: 1,
    explanation:
      'Diffusion rate scales with surface area and wall thinness. 300 million alveoli of ~0.2 mm each give ~70 m\u00b2 of surface behind a wall just 0.5 \u00b5m thick. Two balloons would offer under 1 m\u00b2 -- a 70-fold handicap no heart rate could overcome.',
    hints: [
      'What does diffusion depend on geometrically?',
      'Halve the radius of a sphere and you double the surface per unit volume.',
      'Surface area -- 70 m\u00b2, like a tennis court.',
    ],
  },
  {
    id: 'ch_09',
    tier: 'advanced',
    skill: 'Synthesis',
    question: 'A patient hyperventilates (breathes far too fast) before a medical test and feels dizzy. Using the lab\u2019s quantities, the dizziness is best explained by:',
    options: [
      'too much oxygen entering the blood -- oxygen toxicity',
      'blowing off too much CO2, which raises blood pH and momentarily reduces the CO2-driven signal that keeps breathing and blood flow calibrated',
      'the lungs overheating from rapid airflow',
      'increased ATP production flooding the brain',
    ],
    correctIndex: 1,
    explanation:
      'Blood O2 is already ~98% saturated at rest -- extra breathing cannot add much O2. But CO2 drops steeply, and CO2 level (not O2) is the main driver of the breathing reflex and blood-vessel tone. The dizziness is the CO2 crash, not an O2 surplus -- a beautiful proof that breathing serves gas BALANCE, not just gas delivery.',
    hints: [
      'If blood is already ~98% saturated with O2, what CAN extra breathing still change?',
      'The reflex that controls breathing tracks one of the two gases much more tightly.',
      'CO2 falls -- pH rises -- vessels constrict: dizziness.',
    ],
  },
  // ─── Class 10 board-depth additions: life-processes diagnostics ───
  {
    id: 'ch_depth_lp_autotrophs',
    tier: 'standard',
    skill: 'Define + compare',
    question:
      'Define autotrophic nutrition, name its two categories by energy source, and explain why chlorophyll is essential for plants but not for chemoautotrophs. Why can a mushroom never be an autotroph?',
    options: [
      'Autotrophs build food from CO2 and water using an external ENERGY source: photoautotrophs (sunlight, via chlorophyll) and chemoautotrophs (chemical energy from oxidising inorganic substances like sulfur or ammonia -- no chlorophyll needed). A mushroom is a heterotroph: it has no chlorophyll and absorbs ready-made organic matter',
      'Autotrophs eat other organisms; both categories need chlorophyll; mushrooms photosynthesise at night',
      'Chemoautotrophs use chlorophyll with dim light; mushrooms are autotrophs that lack sunlight',
      'Autotrophic means needing vitamins; mushrooms fail for that reason'
    ],
    correctIndex: 0,
    explanation:
      'Compare the two columns: autotroph = CO2 carbon source + self-made energy (light or chemistry); heterotroph = organic carbon + energy from food. Investigation: destarch a croton (variegated) leaf for 48 h, test with iodine -- only the chlorophyll-bearing patches turn blue-black, proving chlorophyll is the light-catching necessity for photosynthesis.',
    hints: [
      'Same food (glucose), different power plug: light vs chemicals.',
      'Chlorophyll is only the solar panel -- some bacteria use a chemical battery.',
      'No chlorophyll, no autotrophy -- what does a fungus do instead?'
    ],
  },
  {
    id: 'ch_depth_lp_anaerobic_value',
    tier: 'standard',
    skill: 'Evaluate',
    question:
      'Evaluate: "Since anaerobic respiration gives only 2 ATP, it is useless for the organism."',
    options: [
      'False -- 2 ATP keep cells alive when oxygen runs out: yeast survives fermentation, and human muscle cells keep contracting in a sprint on lactic-acid fermentation; some organisms are obligate anaerobes for whom oxygen is poison',
      'True -- 2 ATP cannot power any cell',
      'False because anaerobic respiration actually yields more ATP than aerobic',
      'True because muscle cells cannot use fermentation at all'
    ],
    correctIndex: 0,
    explanation:
      'Energy accounting: glucose -> 2 pyruvate gives a net 2 ATP in fermentation versus about 36-38 in full aerobic breakdown. The trade: fast ATP without oxygen at low efficiency. The cramp connection: lactic acid accumulation in oxygen-starved muscle is the price of that emergency ATP -- oxygen debt is repaid after the sprint.',
    hints: [
      'Useless compared with WHAT, in WHICH conditions?',
      'Name two real users: yeast and sprinting muscle.',
      'Efficiency low but emergency supply high.'
    ],
  },
  {
    id: 'ch_depth_lp_breathing_altitude',
    tier: 'advanced',
    skill: 'Explain + analyse',
    question:
      'During inhalation, what exactly do the diaphragm and intercostal muscles do, and why does a person born at 3,500 m (Leh) have different blood oxygen dynamics from a sea-level visitor?',
    options: [
      'The diaphragm CONTRACTS and flattens while external intercostals lift ribs up-and-out, enlarging the chest cavity so lung pressure falls below atmospheric and air rushes in; the high-altitude resident has more haemoglobin and larger lung capacity from long-term acclimatisation, compensating for lower partial pressure of oxygen',
      'The diaphragm relaxes and rises to suck air in; altitude only makes people tired with no bodily changes',
      'Ribs move inward to enlarge the chest; visitors grow new alveoli within minutes',
      'Breathing is driven by the lungs expanding themselves actively'
    ],
    correctIndex: 0,
    explanation:
      'Breathing is a pressure story: volume up -> pressure down -> air in (inspiration); muscle relaxation reverses it (expiration is largely passive at rest). Acclimatisation takes days to weeks: kidneys secrete erythropoietin, red-cell count and haemoglobin rise -- the visitor simply cannot borrow that in a day, which is why altitude sickness hits fit lowlanders.',
    hints: [
      'Muscle contraction enlarges the cage -- suction, not pumping.',
      'Thin air = less O2 per breath, not less percentage.',
      'More haemoglobin is the altitude resident\'s quiet advantage.'
    ],
  }
];

// ==========================================
// MISCONCEPTIONS
// ==========================================

const MISCONCEPTIONS: { misconception: string; correction: string }[] = [
  {
    misconception: 'Respiration IS breathing -- they are the same word.',
    correction:
      'Breathing is ventilation: moving air. Respiration is cellular chemistry: releasing energy from food. You can breathe perfectly and still have failing cellular respiration (e.g. cyanide poisoning blocks the ATP machinery inside mitochondria).',
  },
  {
    misconception: 'We breathe to "get oxygen for the blood" -- the blood itself is the point.',
    correction:
      'Blood is the transport, not the destination. Every one of your ~30 trillion cells consumes the O2. The alveoli load O2 into blood because blood is the delivery fleet to those cells.',
  },
  {
    misconception: 'Anaerobic respiration happens only in bacteria -- human muscles never do it.',
    correction:
      'Human muscles run anaerobic respiration every time demand outstrips O2 supply -- that is exactly the O2-debt warning in the lab. Yeast uses the same low-ATP pathway but ends at ethanol; muscle ends at lactic acid.',
  },
  {
    misconception: 'Deep breathing is "more oxygen" -- fast shallow breathing gives the same total air.',
    correction:
      'Equal TOTAL ventilation, unequal USEFUL ventilation. The first 150 mL of every breath only refreshes the dead space. Panting 20\u00d7400 mL delivers just 5 L/min to alveoli; 10\u00d7800 mL delivers 6.5 L/min with HALF the muscular effort per litre.',
  },
  {
    misconception: 'Plants only respire at night; in daylight they only photosynthesise.',
    correction:
      'Plants respire 24/7 in every cell -- photosynthesis merely runs alongside in daylight and exceeds it. The "plants give out CO2 at night" fact is respiration unmasked, not respiration switched on.',
  },
];

// ==========================================
// SUB-COMPONENTS
// ==========================================

function StatCard({
  label, value, sub, color,
}: { label: string; value: string; sub?: string; color: string }) {
  return (
    <div className="bg-slate-950 rounded-xl px-3 py-2 border border-slate-800">
      <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
      <p className={`font-mono font-black text-lg ${color}`}>{value}</p>
      {sub && <p className="text-[10px] text-slate-500">{sub}</p>}
    </div>
  );
}

function Chip({ children, tone = 'slate' }: { children: React.ReactNode; tone?: string }) {
  const tones: Record<string, string> = {
    slate: 'bg-slate-800 text-slate-300 border-slate-700',
    green: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    red: 'bg-rose-950 text-rose-300 border-rose-800',
    amber: 'bg-amber-950 text-amber-300 border-amber-800',
    sky: 'bg-gold-950 text-gold-300 border-gold-800',
    violet: 'bg-gold-950 text-gold-300 border-gold-800',
  };
  return (
    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${tones[tone] ?? tones.slate}`}>
      {children}
    </span>
  );
}

/** Animated breathing loop: drives 0..1 phase at the current breath rate. */
function useBreathPhase(rate: number, active: boolean) {
  const [phase, setPhase] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    let alive = true;
    let last = 0;
    const period = 60000 / Math.max(rate, 4) / 2; // half cycle for inhale
    const loop = (t: number) => {
      if (!alive) return;
      if (t - last > 40) {
        last = t;
        setPhase((ph) => {
          if (!active) return 0.25; // relaxed partial fill
          const speed = 0.04 * (60 / Math.max(rate, 8));
          return (ph + speed) % 1;
        });
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      alive = false;
      cancelAnimationFrame(raf.current);
    };
  }, [rate, active]);
  return phase;
}

// ==========================================
// MAIN COMPONENT
// ==========================================

export function C10_ScienceLifeProcessesSim() {
  const [tab, setTab] = useState<TabKey>('discover');

  // ── lungs lab state (original controls preserved) ──
  const [breathRate, setBreathRate] = useState(16);
  const [tidalVol, setTidalVol] = useState(500);
  const [activity, setActivity] = useState<Activity>('rest');
  const [mode, setMode] = useState<Mode>('aerobic');
  const [breathingOn, setBreathingOn] = useState(true);

  // ── discovery state ──
  const [predicted, setPredicted] = useState<number | null>(null);

  // ── challenge state ──
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [hintLevel, setHintLevel] = useState<Record<string, number>>({});
  const [tierFilter, setTierFilter] = useState<'all' | Challenge['tier']>('all');

  // ── misconception state ──
  const [openMisc, setOpenMisc] = useState<number | null>(null);

  const phase = useBreathPhase(breathRate, breathingOn);

  // ── Ventilation numerics (original formulas preserved) ──
  const minuteVent = (breathRate * tidalVol) / 1000; // L/min
  const alveolarVent = (breathRate * (tidalVol - DEAD_SPACE_ML)) / 1000; // L/min fresh to alveoli
  const o2In = minuteVent * O2_IN_AIR; // L/min of O2 breathed in
  const o2Used = ACTIVITY_O2[activity]; // L/min consumed
  const extraction = Math.min(100, (o2Used / Math.max(o2In, 0.01)) * 100);
  const debt = Math.max(0, o2Used - alveolarVent * O2_IN_AIR);

  // ── ATP accounting (original formulas preserved) ──
  const glucoseMgPerMin = (o2Used / 22.4) * 180 * 1000 * (mode === 'aerobic' ? 1 : 0.06);
  const atpPerMin =
    mode === 'aerobic'
      ? (o2Used / 22.4) * 180 * 1000 * 0.0056 * 38
      : (o2Used / 22.4) * 180 * 1000 * 0.0056 * 2;
  const atpPerGlucose = mode === 'aerobic' ? 38 : 2;

  // animation geometry
  const fill = 0.5 + 0.5 * Math.sin(phase * Math.PI * 2); // 0..1 breathing wave
  const lungFill = Math.min(100, (tidalVol / 3000) * 100) * (0.75 + 0.25 * fill);
  const pulse = ACTIVITY_PULSE[activity];

  // per-minute energy cost of the breathing muscles themselves
  const workOfBreathingKcal = minuteVent * 0.008; // ~0.3 kcal per litre at rest-ish effort

  // score
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

  const resetLab = () => {
    setBreathRate(16);
    setTidalVol(500);
    setActivity('rest');
    setMode('aerobic');
    setBreathingOn(true);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ── header ── */}
      <div className="flex flex-wrap items-center gap-3 pb-3 mb-3 border-b border-slate-800">
        <span className="text-3xl p-2 bg-red-950/80 rounded-2xl border border-red-700">\ud83e\uddeA</span>
        <div className="flex-1 min-w-[220px]">
          <span className="text-xs font-bold uppercase tracking-wider text-red-400">
            Class 10 -- Life Processes: Respiration
          </span>
          <h1 className="text-xl md:text-2xl font-extrabold">Breathing Math and the ATP Ledger</h1>
        </div>
        <Chip tone="red">pulse {pulse} bpm</Chip>
      </div>

      {/* ── tab bar ── */}
      <nav className="flex flex-wrap gap-1.5 mb-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`min-h-9 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              tab === t.id
                ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-900/40'
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
          <div className="p-5 bg-slate-900/70 rounded-2xl border border-red-900/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-red-400 mb-2">
              Predict before you play
            </p>
            <p className="text-sm text-slate-200 leading-relaxed">
              Two students climb the same four flights of stairs. Student A pants at 40 breaths/min
              with 300 mL per breath. Student B climbs slowly at 12 breaths/min with 900 mL. Who
              delivers MORE fresh air to their alveoli every minute?
            </p>
            <div className="mt-3 space-y-2">
              {[
                'A -- panting moves more air in total (12 L/min vs 10.8 L/min), so A wins.',
                'B -- after the 150 mL dead space per breath, B still delivers 9 L/min while A only 3 L/min.',
                'Identical -- total volume is all that matters.',
                'Neither -- stairs are anaerobic anyway.',
              ].map((opt, i) => {
                const chosen = predicted === i;
                const isCorrect = i === 1;
                let cls = 'border-slate-700 bg-slate-900 hover:border-red-600';
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
                    {predicted !== null && isCorrect && (
                      <span className="ml-2 text-emerald-400 font-bold text-xs">\u2713</span>
                    )}
                  </button>
                );
              })}
            </div>
            {predicted !== null && (
              <div className="mt-3 p-3 rounded-xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
                The first 150 mL of EVERY breath never reaches the alveoli -- it just refills the
                windpipe. Panting spends that 150 mL again and again. Verify in the Lungs Lab: set
                A\u2019s numbers, read alveolar ventilation, then set B\u2019s.
                <button
                  onClick={() => setTab('lungs')}
                  className="ml-2 underline font-bold text-amber-300"
                >
                  Open Lungs Lab \u2192
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                t: 'Walk 1: Resting lungs',
                d: 'Set activity to rest. Slide the breathing rate down from 30 to 8 -- watch which line (total vs alveolar) responds and by how much. Find where alveolar ventilation drops below what rest needs.',
              },
              {
                t: 'Walk 2: The sprint switch',
                d: 'Set activity to sprint. The extraction efficiency turns red. Switch to the ATP Ledger tab and toggle aerobic \u2194 anaerobic -- feel the 19\u00d7 energy gap.',
              },
              {
                t: 'Walk 3: Debt repayment',
                d: 'After a sprint you keep panting while sitting. Set activity back to rest but push the breathing rate up. That mismatch IS the oxygen debt being repaid.',
              },
            ].map((s, i) => (
              <div key={i} className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
                <p className="text-xs font-bold text-slate-200 mb-1">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-black mr-1.5">
                    {i + 1}
                  </span>
                  {s.t}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: LUNGS LAB (original sim preserved + extended)         */}
      {/* ============================================================ */}
      {tab === 'lungs' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
            {/* animated lungs + diaphragm */}
            <svg viewBox="0 0 440 260" className="w-full" role="img" aria-label="animated lungs">
              {/* trachea */}
              <rect x={210} y={10} width={20} height={50} rx={8} fill="#475569" />
              <text x={244} y={22} fontSize={9} fill="#94a3b8">trachea -- dead space begins here</text>
              {/* bronchi */}
              <line x1={220} y1={55} x2={160} y2={90} stroke="#475569" strokeWidth={14} strokeLinecap="round" />
              <line x1={220} y1={55} x2={280} y2={90} stroke="#475569" strokeWidth={14} strokeLinecap="round" />
              {/* lungs scale with tidal volume + breathing wave */}
              <g style={{ transition: 'all 0.12s linear' }}>
                <path
                  d={`M 160,90 Q 110,100 110,160 Q 110,205 165,210 L 168,90 Z`}
                  fill={`rgba(56,189,248,${0.12 + (lungFill / 100) * 0.3})`}
                  stroke="#38bdf8"
                  strokeWidth={2.5}
                  transform={`scale(${0.85 + (lungFill / 100) * 0.2})`}
                  transform-origin="160 150"
                />
                <path
                  d={`M 280,90 Q 330,100 330,160 Q 330,205 275,210 L 272,90 Z`}
                  fill={`rgba(56,189,248,${0.12 + (lungFill / 100) * 0.3})`}
                  stroke="#38bdf8"
                  strokeWidth={2.5}
                  transform={`scale(${0.85 + (lungFill / 100) * 0.2})`}
                  transform-origin="280 150"
                />
                {/* ribcage hints */}
                {[0, 1, 2].map((i) => (
                  <path
                    key={i}
                    d={`M ${70 - i * 4},${120 + i * 26} Q 220,${96 + i * 26} ${370 + i * 4},${120 + i * 26}`}
                    stroke="#1e293b"
                    strokeWidth={2}
                    fill="none"
                  />
                ))}
              </g>
              {/* diaphragm */}
              <path
                d={`M 90,225 Q 220,${activity === 'sprint' && breathRate > 30 ? 240 : 230 - (lungFill / 100) * 18} 350,225`}
                stroke="#f43f5e"
                strokeWidth={5}
                fill="none"
                style={{ transition: 'all 0.12s linear' }}
              />
              <text x={220} y={250} textAnchor="middle" fontSize={10} fill="#f43f5e">
                diaphragm {breathingOn ? (fill > 0.5 ? 'contracting (breathing IN)' : 'relaxing (breathing OUT)') : 'held'} \u00b7{' '}
                {breathRate > 24 ? 'pumping fast' : 'calm'}
              </text>
              <text x={220} y={70} textAnchor="middle" fontSize={11} fill="#94a3b8" fontFamily="monospace">
                {tidalVol} mL per breath \u00d7 {breathRate} breaths/min
              </text>
              {/* air particles animated with the breath */}
              {breathingOn &&
                [0, 1, 2].map((i) => (
                  <circle
                    key={i}
                    cx={220}
                    cy={30 + i * 14 + fill * 20}
                    r={3}
                    fill="#7dd3fc"
                    opacity={0.5 + 0.5 * fill}
                  />
                ))}
            </svg>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setBreathingOn((b) => !b)}
                className={`flex-1 min-h-9 rounded-xl text-xs font-bold border transition-all ${
                  breathingOn
                    ? 'bg-gold-600 border-gold-500 text-white'
                    : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                {breathingOn ? 'Hold breath (pause animation)' : 'Resume breathing'}
              </button>
              <button
                onClick={resetLab}
                className="flex-1 min-h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold"
              >
                Reset lab
              </button>
            </div>

            {/* equations (preserved) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <div className="bg-slate-950 rounded-xl p-3 border border-gold-800/60">
                <p className="text-[10px] uppercase tracking-wider text-gold-400 mb-1">
                  Aerobic (mitochondria)
                </p>
                <p className="text-xs font-mono text-slate-200">Glucose + 6 O2 \u2192 6 CO2 + 6 H2O</p>
                <p className="text-xs font-mono text-emerald-300">+ 38 ATP</p>
              </div>
              <div className="bg-slate-950 rounded-xl p-3 border border-purple-800/60">
                <p className="text-[10px] uppercase tracking-wider text-purple-400 mb-1">
                  Anaerobic (cytoplasm, muscles)
                </p>
                <p className="text-xs font-mono text-slate-200">Glucose \u2192 lactic acid</p>
                <p className="text-xs font-mono text-amber-300">+ 2 ATP only</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
              <div className="grid grid-cols-3 gap-1.5">
                {(['rest', 'walk', 'sprint'] as Activity[]).map((a) => (
                  <button
                    key={a}
                    onClick={() => setActivity(a)}
                    className={`py-1.5 rounded-lg text-[10px] font-bold capitalize ${
                      activity === a ? 'bg-red-600' : 'bg-slate-800 hover:bg-slate-700'
                    }`}
                  >
                    {a} (O2 {ACTIVITY_O2[a]} L/min)
                  </button>
                ))}
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Breathing rate</span>
                  <span className="font-mono font-bold text-gold-400">{breathRate} /min</span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={45}
                  value={breathRate}
                  aria-label="breathing rate"
                  onChange={(e) => setBreathRate(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Tidal volume</span>
                  <span className="font-mono font-bold text-gold-300">{tidalVol} mL</span>
                </div>
                <input
                  type="range"
                  min={300}
                  max={3000}
                  step={50}
                  value={tidalVol}
                  aria-label="tidal volume"
                  onChange={(e) => setTidalVol(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMode('aerobic')}
                  className={`py-2 rounded-xl text-xs font-bold ${
                    mode === 'aerobic' ? 'bg-emerald-600' : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                >
                  Aerobic
                </button>
                <button
                  onClick={() => setMode('anaerobic')}
                  className={`py-2 rounded-xl text-xs font-bold ${
                    mode === 'anaerobic' ? 'bg-purple-600' : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                >
                  Anaerobic
                </button>
              </div>
            </div>

            {/* rich readouts (original panel extended) */}
            <div className="bg-slate-900/80 rounded-2xl border border-red-800/60 p-4 text-xs font-mono space-y-1">
              <p className="text-slate-300">
                Minute ventilation = {breathRate} \u00d7 {(tidalVol / 1000).toFixed(2)} L ={' '}
                <span className="text-gold-300 font-bold">{minuteVent.toFixed(2)} L/min</span>
              </p>
              <p className="text-slate-500">
                Alveolar (minus {DEAD_SPACE_ML} mL dead space) ={' '}
                <span className="text-gold-300">{alveolarVent.toFixed(2)} L/min</span>
              </p>
              <p className="text-slate-500">
                Dead-space waste ={' '}
                <span className="text-amber-300">
                  {(((DEAD_SPACE_ML * breathRate) / 1000 / minuteVent) * 100).toFixed(0)}%
                </span>{' '}
                of every minute\u2019s air
              </p>
              <p className="text-slate-500">
                O2 inhaled = <span className="text-slate-300">{o2In.toFixed(2)} L/min</span> vs body needs{' '}
                <span className="text-rose-300">{o2Used} L/min</span>
              </p>
              <p className="text-slate-500">
                Extraction efficiency ={' '}
                <span className={extraction > 100 ? 'text-rose-400 font-bold' : 'text-emerald-300 font-bold'}>
                  {Math.min(extraction, 100).toFixed(0)}%
                </span>
                {extraction > 100 && ' -- you are in O2 debt! (panting)'}
              </p>
              {debt > 0 && (
                <p className="text-rose-400">
                  O2 debt building at {debt.toFixed(2)} L/min \u2192 repaid AFTER the effort stops
                </p>
              )}
              <p className="text-slate-300">
                Energy: <span className={mode === 'aerobic' ? 'text-emerald-300' : 'text-purple-300'}>
                  {atpPerGlucose} ATP/glucose
                </span>
                , roughly {Math.round(atpPerMin).toLocaleString()} ATP/min
              </p>
              <p className="text-slate-600">
                Breathing muscles themselves cost ~{workOfBreathingKcal.toFixed(2)} kcal/min at this
                ventilation
              </p>
            </div>

            {/* demand vs supply meter */}
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5">
                O2 supply vs demand ({ACTIVITY_LABEL[activity]})
              </p>
              <div className="relative h-4 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-200"
                  style={{ width: `${Math.min(100, (o2In / 3) * 100)}%` }}
                />
                <div
                  className="absolute inset-y-0 w-1 bg-rose-500 transition-all duration-200"
                  style={{ left: `${Math.min(100, (o2Used / 3) * 100)}%` }}
                  title="demand"
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>0 L/min</span>
                <span className="text-rose-400">\u2588 demand marker</span>
                <span>3 L/min</span>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
              <p className="font-bold text-slate-300 mb-1">Teaching note</p>
              <p>
                Anaerobic respiration pays 2 ATP per glucose versus 38 aerobically -- 19 times poorer --
                and taxes muscles with lactic acid (the cramp after a sprint). Deep slow breaths beat
                shallow fast ones because the first {DEAD_SPACE_ML} mL of each breath never reaches the
                alveoli.
              </p>
            </div>

            <div className="bg-red-950/40 rounded-2xl border border-red-800/50 p-4 text-xs">
              <p className="font-bold text-red-300 mb-1">What to try</p>
              <p>
                1. At rest, find a breathing pattern (rate \u00d7 volume) that beats 5 L/min alveolar
                ventilation -- then argue why panting fails.
              </p>
              <p className="mt-1">
                2. Switch to sprint + anaerobic. Why does the ATP/min figure collapse even though effort
                rises?
              </p>
              <p className="mt-1">
                3. Push tidal volume to 3000 mL at 8 breaths/min. Read the alveolar number -- could you
                sustain this? Why do singers and swimmers train exactly this?
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: ALVEOLI                                               */}
      {/* ============================================================ */}
      {tab === 'alveoli' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-2">
              One alveolus, cross-section -- diffusion does the work
            </p>
            <svg viewBox="0 0 440 260" className="w-full" role="img" aria-label="alveolus cross section">
              {/* alveolus */}
              <circle cx={180} cy={130} r={85} fill="rgba(56,189,248,0.10)" stroke="#38bdf8" strokeWidth={3} />
              <text x={180} y={54} textAnchor="middle" fontSize={11} fill="#7dd3fc">
                alveolus (air side)
              </text>
              {/* O2 molecules in alveolus */}
              {[
                [140, 110], [200, 95], [225, 140], [160, 165], [185, 135], [210, 115],
              ].map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r={7} fill="#38bdf8" opacity={0.85}>
                    <animate attributeName="opacity" values="0.85;0.4;0.85" dur={`${1.6 + i * 0.3}s`} repeatCount="indefinite" />
                  </circle>
                  <text x={x} y={y + 3} textAnchor="middle" fontSize={7} fill="#082f49" fontWeight="bold">
                    O2
                  </text>
                </g>
              ))}
              {/* CO2 molecules in alveolus (few) */}
              {[[155, 130], [205, 170]].map(([x, y], i) => (
                <g key={`c${i}`}>
                  <circle cx={x} cy={y} r={7} fill="#a78bfa" opacity={0.7}>
                    <animate attributeName="cy" values={`${y};${y - 6};${y}`} dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
                  </circle>
                  <text x={x} y={y + 3} textAnchor="middle" fontSize={6} fill="#1e1b4b" fontWeight="bold">
                    CO2
                  </text>
                </g>
              ))}
              {/* wall */}
              <path d="M 95,130 A 85 85 0 0 1 265,130" fill="none" stroke="#fbbf24" strokeWidth={7} opacity={0.8} />
              <text x={310} y={100} fontSize={9} fill="#fbbf24">
                wall: 0.5 \u00b5m thin
              </text>
              {/* capillary */}
              <path
                d="M 265,120 Q 330,110 370,140 Q 395,165 360,190 Q 320,205 285,180"
                fill="none"
                stroke="#f43f5e"
                strokeWidth={16}
                strokeLinecap="round"
                opacity={0.55}
              />
              <text x={350} y={215} fontSize={10} fill="#fda4af">
                capillary (blood side)
              </text>
              {/* diffusion arrows */}
              <g>
                <path d="M 240,110 L 310,125 M 302,120 L 310,125 L 304,132" stroke="#38bdf8" strokeWidth={2.5} fill="none" />
                <text x={262} y={104} fontSize={9} fill="#38bdf8" fontWeight="bold">O2 \u2192 blood</text>
                <path d="M 320,165 L 250,160 M 258,155 L 250,160 L 256,167" stroke="#a78bfa" strokeWidth={2.5} fill="none" />
                <text x={300} y={182} fontSize={9} fill="#a78bfa" fontWeight="bold">CO2 \u2192 air</text>
              </g>
              {/* RBC */}
              <circle cx={355} cy={150} r={9} fill="#ef4444">
                <animate attributeName="cx" values="375;300;375" dur="4s" repeatCount="indefinite" />
              </circle>
              <text x={355} y={153} textAnchor="middle" fontSize={7} fill="#fecaca" fontWeight="bold">
                RBC
              </text>
              {/* scale note */}
              <text x={20} y={245} fontSize={9} fill="#64748b">
                alveolus \u2248 0.2 mm \u00b7 wall + capillary wall \u2248 0.5 \u00b5m \u00b7 ~300 million alveoli \u2248 70 m\u00b2 surface
              </text>
            </svg>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <StatCard label="Surface area" value="70 m\u00b2" sub="a tennis court, folded" color="text-gold-300" />
              <StatCard label="Wall thickness" value="0.5 \u00b5m" sub="one cell each side" color="text-amber-300" />
              <StatCard label="Alveoli count" value="~300 million" sub="per human lung pair" color="text-emerald-300" />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-900/80 rounded-2xl border border-gold-800/60 p-4 text-xs font-mono space-y-1.5">
              <p className="text-slate-300 font-bold">Partial-pressure logic (why diffusion always runs the right way)</p>
              <p className="text-slate-400">Alveolar air: O2 {ALVEOLAR_O2 * 100}% \u00b7 CO2 ~5.3%</p>
              <p className="text-slate-400">Inhaled air: O2 {O2_IN_AIR * 100}% \u00b7 CO2 {(CO2_IN_AIR * 100).toFixed(2)}%</p>
              <p className="text-slate-400">Venous blood arriving: O2 low, CO2 high</p>
              <p className="text-emerald-300">O2 falls DOWNHILL: air \u2192 blood. CO2 falls DOWNHILL: blood \u2192 air.</p>
              <p className="text-slate-500 font-sans leading-relaxed pt-1">
                No ATP is spent on the exchange itself. The only energetic cost is the breathing
                muscles -- and haemoglobin keeps blood O2 low by binding what arrives, so the gradient
                never fades.
              </p>
            </div>

            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
              <p className="font-bold text-slate-300 mb-1">Why so many small sacs?</p>
              <p>
                Diffusion rate = area \u00f7 distance. Two big balloons would offer under 1 m\u00b2 of
                surface; 300 million alveoli offer ~70 m\u00b2 behind a wall half a micron thick. The
                same trick reappears in root hairs, villi and gills -- life always solves exchange the
                same way.
              </p>
            </div>

            <div className="bg-gold-950/40 rounded-2xl border border-gold-800/50 p-4 text-xs">
              <p className="font-bold text-gold-300 mb-1">What to try</p>
              <p>
                1. Trace one red blood cell in the animation. At 72 beats/min and ~5 L/min blood flow,
                how many round trips does it make while you read this?
              </p>
              <p className="mt-1">
                2. Emphysema merges alveoli into fewer, larger sacs. Use the area argument to explain
                why patients breathe faster but stay O2-starved.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: ATP LEDGER                                            */}
      {/* ============================================================ */}
      {tab === 'ledger' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Scenario: {ACTIVITY_LABEL[activity]} \u00b7 O2 demand {o2Used} L/min
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {(['rest', 'walk', 'sprint'] as Activity[]).map((a) => (
                  <button
                    key={a}
                    onClick={() => setActivity(a)}
                    className={`py-2 rounded-xl text-xs font-bold capitalize ${
                      activity === a ? 'bg-red-600' : 'bg-slate-800 hover:bg-slate-700'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMode('aerobic')}
                  className={`py-2.5 rounded-xl text-xs font-bold ${
                    mode === 'aerobic' ? 'bg-emerald-600' : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                >
                  Pay aerobically (O2 ready)
                </button>
                <button
                  onClick={() => setMode('anaerobic')}
                  className={`py-2.5 rounded-xl text-xs font-bold ${
                    mode === 'anaerobic' ? 'bg-purple-600' : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                >
                  Pay anaerobically (O2 short)
                </button>
              </div>
            </div>

            {/* the ledger table */}
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-950 text-slate-500">
                    <th className="text-left px-3 py-2 font-semibold">Account</th>
                    <th className="text-right px-3 py-2 font-semibold">Aerobic</th>
                    <th className="text-right px-3 py-2 font-semibold">Anaerobic</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  <tr className="border-t border-slate-800">
                    <td className="px-3 py-2 text-slate-300">ATP per glucose</td>
                    <td className="px-3 py-2 text-right text-emerald-300 font-bold">38</td>
                    <td className="px-3 py-2 text-right text-amber-300 font-bold">2</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="px-3 py-2 text-slate-300">O2 needed</td>
                    <td className="px-3 py-2 text-right text-gold-300">6 mol / mol glucose</td>
                    <td className="px-3 py-2 text-right text-slate-500">none</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="px-3 py-2 text-slate-300">Waste product</td>
                    <td className="px-3 py-2 text-right text-gold-300">CO2 (exhaled)</td>
                    <td className="px-3 py-2 text-right text-rose-300">lactic acid (muscle)</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="px-3 py-2 text-slate-300">Location</td>
                    <td className="px-3 py-2 text-right text-slate-400">mitochondria</td>
                    <td className="px-3 py-2 text-right text-slate-400">cytoplasm</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="px-3 py-2 text-slate-300">Energy efficiency</td>
                    <td className="px-3 py-2 text-right text-emerald-300">~40%</td>
                    <td className="px-3 py-2 text-right text-amber-300">~2%</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="px-3 py-2 text-slate-300">This activity\u2019s ATP/min</td>
                    <td className={`px-3 py-2 text-right font-bold ${mode === 'aerobic' ? 'text-emerald-300' : 'text-slate-600'}`}>
                      {Math.round((o2Used / 22.4) * 180 * 1000 * 0.0056 * 38).toLocaleString()}
                    </td>
                    <td className={`px-3 py-2 text-right font-bold ${mode === 'anaerobic' ? 'text-amber-300' : 'text-slate-600'}`}>
                      {Math.round((o2Used / 22.4) * 180 * 1000 * 0.0056 * 2).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            {/* ATP bar comparison */}
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">
                ATP per glucose molecule -- the 19\u00d7 gap
              </p>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-emerald-300 font-bold">aerobic</span>
                    <span className="font-mono text-emerald-300">38 ATP</span>
                  </div>
                  <div className="h-6 rounded-lg bg-emerald-600 transition-all duration-500" style={{ width: '100%' }} />
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-amber-300 font-bold">anaerobic</span>
                    <span className="font-mono text-amber-300">2 ATP</span>
                  </div>
                  <div className="h-6 rounded-lg bg-amber-600 transition-all duration-500" style={{ width: '5.3%' }} />
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                Same glucose. Same 2870 kJ inside it. The difference is whether oxygen gets to be the
                final electron acceptor.
              </p>
            </div>

            {/* live numbers for current selection */}
            <div className="grid grid-cols-2 gap-2">
              <StatCard
                label="Glucose burned"
                value={`${Math.round(glucoseMgPerMin)} mg/min`}
                sub={`mode: ${mode}`}
                color="text-gold-300"
              />
              <StatCard
                label="Energy released"
                value={`${((atpPerMin * KCAL_PER_ATP_MOL) / 1e6).toFixed(2)} kcal/min`}
                sub={`pulse ${pulse} bpm`}
                color="text-amber-300"
              />
              <StatCard
                label="CO2 produced"
                value={`${(o2Used * (mode === 'aerobic' ? 1 : 0)).toFixed(2)} L/min`}
                sub={mode === 'aerobic' ? 'exhaled, 1:1 with O2' : 'zero -- anaerobic'}
                color="text-gold-300"
              />
              <StatCard
                label="Lactic acid tax"
                value={mode === 'anaerobic' ? 'building' : 'clearing'}
                sub={mode === 'anaerobic' ? 'cramp + oxygen debt' : 'debt being repaid'}
                color={mode === 'anaerobic' ? 'text-rose-300' : 'text-emerald-300'}
              />
            </div>

            <div className="bg-purple-950/40 rounded-2xl border border-purple-800/50 p-4 text-xs leading-relaxed text-purple-100">
              <p className="font-bold text-purple-300 mb-1">The honest fine print</p>
              <p>
                The "38 ATP" figure is the classic textbook ceiling; modern measurements put aerobic
                yield nearer 30-32. The 19\u00d7 gap stands either way. Exams want 38 vs 2 -- the ledger
                shows both worlds honestly.
              </p>
            </div>

            <div className="bg-red-950/40 rounded-2xl border border-red-800/50 p-4 text-xs">
              <p className="font-bold text-red-300 mb-1">What to try</p>
              <p>
                1. Rest costs ~0.25 L O2/min. Run the ledger: how many glucose mg/min does a resting
                brain-and-body burn, and how much of your food is merely paying for being alive?
              </p>
              <p className="mt-1">
                2. A sprinter finishes and keeps panting for 4 minutes. Estimate the oxygen debt using
                the supply-vs-demand meter from the Lungs Lab.
              </p>
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
                    tierFilter === t ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
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
                  <Chip tone={ch.tier === 'foundation' ? 'green' : ch.tier === 'standard' ? 'amber' : 'red'}>
                    {ch.tier}
                  </Chip>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500">{ch.skill}</span>
                  <span className="text-[10px] text-slate-600 ml-auto">Q{qi + 1}</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed mb-2.5">{ch.question}</p>
                <div className="space-y-1.5">
                  {ch.options.map((opt, i) => {
                    let cls = 'border-slate-700 bg-slate-950 hover:border-red-600';
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
                      <p className="text-[11px] text-amber-200/90 leading-relaxed w-full px-1">
                        {ch.hints[hints - 1]}
                      </p>
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
      {/* TAB 6: TRUTHS (misconceptions + summary)                     */}
      {/* ============================================================ */}
      {tab === 'misconceptions' && (
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
            <p className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2">
              If you remember three lines
            </p>
            <ol className="space-y-2 text-sm text-slate-300 leading-relaxed list-decimal ml-5">
              <li>Respiration happens in every cell; breathing is just its delivery service.</li>
              <li>38 ATP with oxygen, 2 without -- and the lactic acid bill comes due as cramp.</li>
              <li>Deep beats fast: the first 150 mL of every breath is dead weight.</li>
            </ol>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setTab('lungs')}
                className="min-h-11 px-5 rounded-xl bg-red-600 hover:bg-red-500 text-sm font-bold"
              >
                Back to the Lungs Lab
              </button>
              <button onClick={resetLab} className="min-h-11 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold">
                Reset everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default C10_ScienceLifeProcessesSim;
