'use client';
/**
 * C8_ScienceChemicalEffectsElectricCurrentSim (Class 8 Science)
 *
 * ONE chapter: Chemical Effects of Electric Current (NCERT VIII).
 * Three live stations, all with honest numerics:
 *   • Conduction tester: I = V·G/gap model per liquid; LED needs ~2 mA,
 *     a torch bulb needs ~150 mA — that is WHY testers use an LED.
 *   • Water splitting: pure water barely conducts (add drops of acid),
 *     and the gases come off in the fixed 2 : 1 volume ratio because
 *     2 H2O -> 2 H2 + O2. Moles from charge: mol = Q / (n·F).
 *   • Electroplating: real Faraday arithmetic m = (I·t·M)/(n·F) and
 *     thickness = mass/(density × area). The object is ALWAYS the cathode.
 *
 * Deep layout (5 tabs):
 *   1. Predict   -- will the LED glow? guess first
 *   2. Tester    -- liquid conduction station
 *   3. Baths     -- water splitting + plating shop
 *   4. Challenge -- 9 questions in 3 tiers with hints
 *   5. Truths    -- misconception killer + honest summary
 */
import React, { useMemo, useState } from 'react';

type TabKey = 'predict' | 'tester' | 'baths' | 'challenge' | 'truths';

const TABS: { id: TabKey; label: string; emoji: string }[] = [
  { id: 'predict', label: '1 · Predict', emoji: '❓' },
  { id: 'tester', label: '2 · Tester', emoji: '💡' },
  { id: 'baths', label: '3 · Baths', emoji: '⚗️' },
  { id: 'challenge', label: '4 · Challenge', emoji: '🎯' },
  { id: 'truths', label: '5 · Truths', emoji: '🧠' },
];

// conductance factor G (mS-scale relative model, honest ORDERING from data:
// salt/acid solutions >> tap water > rainwater >> honey > distilled >> oil)
const LIQUIDS: Record<string, { label: string; G: number; note: string }> = {
  salt: { label: 'salt solution (NaCl in water)', G: 12, note: 'ions Na⁺ and Cl⁻ carry the charge freely' },
  lemon: { label: 'lemon juice', G: 9, note: 'citric acid releases H⁺ ions' },
  tap: { label: 'tap water', G: 2.2, note: 'dissolved salts make it a weak conductor' },
  rain: { label: 'rainwater', G: 1.1, note: 'very low dissolved minerals — weak' },
  honey: { label: 'honey', G: 0.35, note: 'little free water, few mobile ions — poor' },
  distilled: { label: 'distilled water', G: 0.02, note: 'almost no ions — current is nearly zero' },
  oil: { label: 'vegetable oil', G: 0.001, note: 'covalent molecules, no free charges' },
};

const F = 96500; // C per mole of electrons

const PLATINGS: Record<string, { label: string; M: number; n: number; density: number; color: string }> = {
  copper: { label: 'Copper (from CuSO₄)', M: 63.5, n: 2, density: 8.96, color: '#c2743d' },
  silver: { label: 'Silver (from AgNO₃)', M: 107.9, n: 1, density: 10.49, color: '#d8dee6' },
  chromium: { label: 'Chromium (from CrO₃ bath)', M: 52.0, n: 3, density: 7.19, color: '#b9c2c9' },
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
    skill: 'Conductor or not',
    question: 'The tester glows brightly in salt water but NOT in distilled water. The best reason is:',
    options: [
      'distilled water has almost no free ions to carry charge; salt dissolves into Na⁺ and Cl⁻ which move and conduct',
      'distilled water is too pure to let anything pass — it blocks like plastic',
      'salt water heats up and pushes electricity through by convection',
      'the LED only works in coloured liquids',
    ],
    correctIndex: 0,
    explanation:
      'Current in a liquid is carried by MOVING IONS. Distilled water has almost none (that is why your conductivity readout was ~0 mA). Dissolving salt releases Na⁺ and Cl⁻ — an ion highway. The Tester tab shows the same story for all seven liquids.',
    hints: ['What physically carries charge through a liquid?', 'Ions — where do they come from in salt water?', 'No ions in distilled water, plenty in salt solution.'],
  },
  {
    id: 'ch_02',
    tier: 'foundation',
    skill: 'Why an LED',
    question: 'Conduction testers use an LED instead of a torch bulb because:',
    options: [
      'LEDs are cheaper than bulbs',
      'an LED glows visibly at a few milliamps — currents too weak to light a bulb (which needs ~150 mA)',
      'bulbs melt in liquids',
      'LEDs store electricity for later',
    ],
    correctIndex: 1,
    explanation:
      'Tap water lets only a small current through — enough for an LED (~2 mA) but far below a bulb\'s ~150 mA. Switch the Tester between LED and bulb and watch the verdict flip on the same liquid.',
    hints: ['Compare the two thresholds in the Tester panel.', 'Which needs the smaller current to glow?', 'The LED — it detects weak currents.'],
  },
  {
    id: 'ch_03',
    tier: 'foundation',
    skill: 'Gas ratio',
    question: 'When acidified water is electrolysed, hydrogen and oxygen come off at the electrodes in the volume ratio:',
    options: ['H : O = 1 : 2', 'H : O = 2 : 1', 'H : O = 1 : 1', 'H : O = 8 : 1'],
    correctIndex: 1,
    explanation:
      'The decomposition 2 H₂O → 2 H₂ + O₂ releases TWO volumes of hydrogen for ONE of oxygen. The Baths tab fills the two tubes at exactly this 2 : 1 pace, however long you run it.',
    hints: ['Write the balanced equation.', 'Count the H₂ and O₂ coefficients.', '2 : 1 — more hydrogen.'],
  },
  {
    id: 'ch_04',
    tier: 'foundation',
    skill: 'Which electrode',
    question: 'In electroplating a spoon with silver, the spoon must be the:',
    options: ['anode (+)', 'cathode (−)', 'electrolyte', 'either terminal'],
    correctIndex: 1,
    explanation:
      'Positive Ag⁺ ions swim to the NEGATIVE cathode, take electrons, and stick as neutral silver atoms. So the object to be plated is always the cathode; a silver anode dissolves to refill the Ag⁺ supply. The Plating Shop labels both electrodes for your setup.',
    hints: ['Positive ions move toward which terminal?', 'Reduction (electron gain) happens where?', 'Cathode — negative.'],
  },
  {
    id: 'ch_05',
    tier: 'standard',
    skill: 'Classify the liquid',
    question: 'Which set is correctly labelled?',
    options: [
      'good: lemon juice, salt solution · poor: distilled water, vegetable oil',
      'good: distilled water, oil · poor: lemon juice, salt solution',
      'good: honey, oil · poor: tap water, rainwater',
      'all liquids conduct equally well',
    ],
    correctIndex: 0,
    explanation:
      'Acid/salt solutions release ions (good conductors). Oils are covalent with no free charges; distilled water is nearly ion-free (poor). The Tester\'s mA readout gives the full ranking on one screen.',
    hints: ['Look for liquids that release IONS in water.', 'Check the Tester readouts: which gave milliamps?', 'Acidic/salty = good; oil and distilled = poor.'],
  },
  {
    id: 'ch_06',
    tier: 'standard',
    skill: 'Water that won\'t conduct',
    question: 'Pure water does not electrolyse well even at 12 V in the Baths tab. What fixes it, and why?',
    options: [
      'adding MORE water dilutes the blockage',
      'a few drops of acid (or salt) add mobile ions, so the liquid can carry current',
      'freezing the water first',
      'nothing can make water conduct',
    ],
    correctIndex: 1,
    explanation:
      'Pure water ionises only minutely — about one in ten million molecules. A few drops of acid flood it with H⁺ ions (and the anion), giving the charge carriers it needs. Watch the current jump when you toggle the drops in the Baths tab.',
    hints: ['What does a liquid need to conduct?', 'Where do the charge carriers come from?', 'Added ions — acid or salt drops.'],
  },
  {
    id: 'ch_07',
    tier: 'advanced',
    skill: 'Faraday numerics',
    question: 'Silver plating at 0.5 A for 965 s (M of Ag = 108, n = 1, F = 96500). Mass deposited is about:',
    options: ['0.54 g', '1.08 g', '0.27 g', '5.4 g'],
    correctIndex: 0,
    explanation:
      'Q = 0.5 × 965 = 482.5 C. Moles of electrons = 482.5/96500 = 0.005. n = 1, so moles Ag = 0.005 → mass = 0.005 × 108 = 0.54 g. Set the Plating Shop to these exact values and read the same number.',
    hints: ['Q = I × t first.', 'moles = Q/(n·F).', '0.005 mol × 108 g/mol = 0.54 g.'],
  },
  {
    id: 'ch_08',
    tier: 'advanced',
    skill: 'Thickness logic',
    question: 'The same charge plates two objects: one 4 cm², one 40 cm². The chromium layers differ how?',
    options: [
      'same thickness — charge decides mass, mass spread over area decides thickness',
      'the big object gets 10× thicker',
      'the small object gets no layer',
      'thickness never depends on area',
    ],
    correctIndex: 0,
    explanation:
      'Same charge deposits the same MASS (Faraday). Thickness = mass/(density × area): spreading 0.2 g over 40 cm² gives a tenth the thickness of 4 cm². The Plating Shop shows exactly this when you slide only the area.',
    hints: ['Same charge → same deposited mass?', 'Thickness = volume ÷ area.', 'Same mass over 10× area = 10× thinner.'],
  },
  {
    id: 'ch_09',
    tier: 'advanced',
    skill: 'Synthesis',
    question: 'During the water experiment the bubbles STOP appearing though the meter still shows current. The most scientific suspicion is:',
    options: [
      'water has been fully converted to gas — the beaker is empty',
      'the current is now flowing through paths or ions that do not decompose water (or the electrodes reacted), so charge flows without splitting H₂O — check the electrode material and solution',
      'gases turn back into water instantly',
      'current always makes bubbles forever',
    ],
    correctIndex: 1,
    explanation:
      'Current is a flow of charge, and splitting water is only ONE thing charge can do in a cell. If electrodes react (say copper dissolves) or side ions carry the current, charge flows with no gas. Real electroplaters use this: current flows for DAYS while metal — not gas — carries the chemistry. The meter reading alone never proves which reaction is running.',
    hints: ['Does current ALWAYS have to split water?', 'What else could carry the charge?', 'Electrode/side reactions can carry charge without gas.'],
  },
];

const MISCONCEPTIONS: { misconception: string; correction: string }[] = [
  {
    misconception: 'All liquids conduct electricity.',
    correction:
      'Only liquids containing mobile charged particles conduct: salt/acid SOLUTIONS (ions) and molten salts. Vegetable oil has neutral covalent molecules; distilled water has almost no ions. The Tester ranks seven liquids from thousandths of a milliamp to over 200 mA.',
  },
  {
    misconception: 'Pure water is a good conductor because H₂O is an ionic formula.',
    correction:
      'H₂O is a covalent molecule and only a vanishing fraction ionises (~10⁻⁷ of molecules). The dangerous tap-water conductivity comes from DISSOLVED SALTS, not the water itself — which is why electricity and wet hands are about the salts on your skin and in the water.',
  },
  {
    misconception: 'In water electrolysis, oxygen gas is more because O atoms are bigger.',
    correction:
      'Volume ratio is fixed by the balanced equation 2H₂O → 2H₂ + O₂: TWO volumes of hydrogen, ONE of oxygen — size of atoms is irrelevant. Atom size has nothing to do with moles of gas produced.',
  },
  {
    misconception: 'Electroplating is painting a metal layer onto the object.',
    correction:
      'Plating is ion-by-ion DEPOSITION driven by charge: each Ag⁺ that reaches the cathode gains an electron and locks into the metal lattice. The layer thickness follows Faraday\'s m = QM/(nF) — paint has no such law. That is why the Plating Shop can PREDICT thickness from current and time.',
  },
  {
    misconception: 'Current gets "used up" as it passes through the liquid.',
    correction:
      'The same current that enters at the anode leaves at the cathode — charge is conserved. What IS consumed: electrical ENERGY (converted to chemical energy stored in the products H₂, O₂, plated metal). Measure I at both wires of the Baths cell: identical.',
  },
];

// ─── main component ───

export function C8_ScienceChemicalEffectsElectricCurrentSim() {
  const [tab, setTab] = useState<TabKey>('predict');

  // tester state
  const [liquid, setLiquid] = useState<string>('salt');
  const [cells, setCells] = useState(3); // 1.5 V each
  const [gapCm, setGapCm] = useState(4);
  const [detector, setDetector] = useState<'led' | 'bulb'>('led');

  // water bath state
  const [acidAdded, setAcidAdded] = useState(true);
  const [bathVolts, setBathVolts] = useState(6);
  const [bathSecs, setBathSecs] = useState(300);

  // plating state
  const [plating, setPlating] = useState<string>('copper');
  const [plateCurrent, setPlateCurrent] = useState(0.5); // A
  const [plateSecs, setPlateSecs] = useState(965);
  const [plateArea, setPlateArea] = useState(10); // cm²

  // predict/challenge/truths state
  const [predicted, setPredicted] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [hintLevel, setHintLevel] = useState<Record<string, number>>({});
  const [tierFilter, setTierFilter] = useState<'all' | Challenge['tier']>('all');
  const [openMisc, setOpenMisc] = useState<number | null>(null);

  // ── tester numerics: I (mA) = V·G/gapNorm, honest ordering ──
  const V = cells * 1.5;
  const cfg = LIQUIDS[liquid];
  const currentMA = (V * cfg.G) / (gapCm / 2); // gap 2 cm = reference
  const ledOn = currentMA >= 2;
  const bulbOn = currentMA >= 150;
  const glowing = detector === 'led' ? ledOn : bulbOn;
  const brightness = Math.min(1, detector === 'led' ? currentMA / 12 : currentMA / 220);

  // ── water bath numerics ──
  const bathR = acidAdded ? 24 : 4e9; // ohms (model: ion-rich vs ion-free)
  const bathI = bathVolts / bathR; // A
  const bathQ = bathI * bathSecs; // C
  const molE = bathQ / F;
  const molH2 = molE / 2; // 2 e- per H2
  const molO2 = molE / 4; // 4 e- per O2
  const ratioCheck = molH2 / Math.max(molO2, 1e-12); // should be 2
  // gas tube fill fractions (cap display)
  const h2Fill = Math.min(1, molH2 / 0.004);
  const o2Fill = Math.min(1, molO2 / 0.002);

  // ── plating numerics (real Faraday) ──
  const pcfg = PLATINGS[plating];
  const plateQ = plateCurrent * plateSecs; // C
  const plateMol = plateQ / (pcfg.n * F); // mol metal
  const plateMassG = plateMol * pcfg.M; // g
  const thicknessUm = (plateMassG / pcfg.density / plateArea) * 1e4; // µm
  const plateVisible = thicknessUm >= 2;

  const score = useMemo(() => {
    let right = 0;
    let attempted = 0;
    Object.entries(answers).forEach(([id, choice]) => {
      const ch = CHALLENGES.find((q) => q.id === id);
      if (ch) {
        attempted += 1;
        if (choice === ch.correctIndex) right += 1;
      }
    });
    return { right, attempted };
  }, [answers]);

  const visibleChallenges = CHALLENGES.filter((q) => tierFilter === 'all' || q.tier === tierFilter);

  const pickAnswer = (id: string, idx: number) => {
    if (revealed[id]) return;
    setAnswers((p) => ({ ...p, [id]: idx }));
    setRevealed((p) => ({ ...p, [id]: true }));
  };

  const resetAll = () => {
    setLiquid('salt');
    setCells(3);
    setGapCm(4);
    setDetector('led');
    setAcidAdded(true);
    setBathVolts(6);
    setBathSecs(300);
    setPlating('copper');
    setPlateCurrent(0.5);
    setPlateSecs(965);
    setPlateArea(10);
    setPredicted(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 rounded-3xl border border-slate-800 font-sans text-slate-100 shadow-2xl">
      {/* header */}
      <div className="flex flex-wrap items-center gap-3 pb-3 mb-3 border-b border-slate-800">
        <span className="text-3xl p-2 bg-teal-950/80 rounded-2xl border border-teal-700">⚗️</span>
        <div className="flex-1 min-w-[220px]">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-400">Class 8 Science — Chemical Effects of Electric Current</p>
          <h1 className="text-xl md:text-2xl font-black text-teal-300">Ions at Work: testers, gas columns &amp; the plating shop</h1>
        </div>
        <div className="text-right">
          <span className="font-mono text-xs text-slate-400 block">m = Q·M/(n·F)</span>
          <span className="font-mono text-xs text-slate-500 block">2H₂O → 2H₂ + O₂ (2 : 1)</span>
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
                ? 'bg-teal-600 border-teal-500 text-white shadow-lg shadow-teal-900/40'
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
          <div className="p-5 bg-slate-900/70 rounded-2xl border border-teal-900/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-teal-400 mb-2">Predict before you play</p>
            <p className="text-sm text-slate-200 leading-relaxed">
              The circuit: battery → LED → two carbon rods dipped 4 cm apart in a beaker. You pour
              in DISTILLED water, then stir in a spoon of salt. What does the LED do?
            </p>
            <div className="mt-3 space-y-2">
              {[
                'Glows in both — water always conducts',
                'Dark in distilled water, then glows once salt dissolves — the Na⁺ and Cl⁻ ions carry the current',
                'Glows only in distilled water — salt blocks it',
                'Stays dark in both — LEDs never work in liquids',
              ].map((opt, i) => {
                const chosen = predicted === i;
                const isCorrect = i === 1;
                let cls = 'border-slate-700 bg-slate-900 hover:border-teal-600';
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
                Liquid currents are MOVING IONS. Distilled water has almost none; salt water is an
                ion highway. Verify: set the Tester to distilled (read ~0.05 mA), then salt solution
                (read ~27 mA at 4.5 V). The LED threshold is 2 mA.
                <button onClick={() => setTab('tester')} className="ml-2 underline font-bold text-amber-300">Open Tester →</button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { t: 'Walk 1: rank all seven', d: 'Cycle through every liquid at the same voltage and gap. The mA readout builds the conductor ranking with no memorising.' },
              { t: 'Walk 2: force the ratio', d: 'In Baths, split water at 6 V for 300 s, then 600 s: the tubes hold double the gas but the H₂ : O₂ ratio stays locked at 2 : 1.' },
              { t: 'Walk 3: plate honestly', d: 'Set 0.5 A for 965 s on silver: the shop predicts 0.54 g. Halve the time — the mass halves. Charge is the currency.' },
            ].map((s, i) => (
              <div key={i} className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
                <p className="text-xs font-bold text-slate-200 mb-1">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-[10px] font-black mr-1.5">{i + 1}</span>
                  {s.t}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: TESTER                                                */}
      {/* ============================================================ */}
      {tab === 'tester' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="col-span-2">
              <label className="text-xs font-semibold text-slate-400 block mb-1">liquid in the beaker</label>
              <select value={liquid} onChange={(e) => setLiquid(e.target.value)}
                className="w-full min-h-11 bg-slate-900 border border-slate-700 rounded-xl px-3 text-sm text-slate-200">
                {Object.entries(LIQUIDS).map(([k, L]) => (
                  <option key={k} value={k}>{L.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>battery cells</span>
                <span className="font-mono text-teal-300">{cells} × 1.5 V = {V.toFixed(1)} V</span>
              </label>
              <input type="range" min={1} max={6} step={1} value={cells} aria-label="battery cells"
                onChange={(e) => setCells(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-teal-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>electrode gap</span>
                <span className="font-mono text-teal-300">{gapCm} cm</span>
              </label>
              <input type="range" min={1} max={10} step={1} value={gapCm} aria-label="electrode gap"
                onChange={(e) => setGapCm(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-teal-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* beaker SVG */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2">
              <svg viewBox="0 0 340 300" className="w-full h-60 md:h-72" preserveAspectRatio="xMidYMid meet">
                {/* beaker */}
                <path d="M 70 60 L 70 260 Q 70 275 85 275 L 255 275 Q 270 275 270 260 L 270 60" fill="none" stroke="#94a3b8" strokeWidth={3} />
                {/* liquid */}
                <rect x={72} y={130} width={196} height={143} fill={liquid === 'oil' ? '#a16207' : liquid === 'honey' ? '#ca8a04' : liquid === 'lemon' ? '#fde047' : liquid === 'salt' ? '#0ea5e9' : '#1d4ed8'} fillOpacity={0.45}
                  style={{ transition: 'all 200ms ease' }} />
                <text x={170} y={155} fontSize={11} fill="#e2e8f0" textAnchor="middle">{cfg.label}</text>
                {/* electrodes */}
                <rect x={135} y={60} width={10} height={120} fill="#64748b" />
                <rect x={195} y={60} width={10} height={120} fill="#64748b" />
                <text x={140} y={52} fontSize={10} fill="#94a3b8" textAnchor="middle">−</text>
                <text x={200} y={52} fontSize={10} fill="#94a3b8" textAnchor="middle">+</text>
                {/* wires */}
                <path d="M 140 60 L 140 30 L 40 30 L 40 100" fill="none" stroke="#fbbf24" strokeWidth={2.5} />
                <path d="M 200 60 L 200 30 L 300 30 L 300 100" fill="none" stroke="#fbbf24" strokeWidth={2.5} />
                {/* detector: LED or bulb */}
                {detector === 'led' ? (
                  <g>
                    <circle cx={40} cy={112} r={12} fill={glowing ? '#f87171' : '#4b5563'} stroke="#e5e7eb" strokeWidth={2}
                      style={{ filter: glowing ? `drop-shadow(0 0 ${brightness * 22}px #ef4444)` : 'none', transition: 'all 200ms ease' }} />
                    <text x={40} y={145} fontSize={10} fill="#94a3b8" textAnchor="middle">LED</text>
                  </g>
                ) : (
                  <g>
                    <circle cx={40} cy={112} r={14} fill={glowing ? '#fde68a' : '#4b5563'} stroke="#e5e7eb" strokeWidth={2}
                      style={{ filter: glowing ? `drop-shadow(0 0 ${brightness * 26}px #fbbf24)` : 'none', transition: 'all 200ms ease' }} />
                    <text x={40} y={145} fontSize={10} fill="#94a3b8" textAnchor="middle">bulb</text>
                  </g>
                )}
                {/* ions animation: small dots drifting between electrodes when conducting */}
                {currentMA > 1 &&
                  Array.from({ length: 8 }, (_, i) => (
                    <circle key={i} cx={150 + (i % 4) * 12 + ((i * 37) % 20)} cy={175 + ((i * 53 + (i % 2) * 60) % 80)} r={2.5}
                      fill={i % 2 === 0 ? '#7dd3fc' : '#fda4af'} opacity={0.85}>
                      <animate attributeName="cy" values={`${170 + (i % 5) * 12};${230};${170 + (i % 5) * 12}`} dur={`${1.6 + (i % 3) * 0.5}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.9;0.15;0.9" dur={`${1.6 + (i % 3) * 0.5}s`} repeatCount="indefinite" />
                    </circle>
                  ))}
                <text x={170} y={293} fontSize={10} fill="#64748b" textAnchor="middle">carbon rods {gapCm} cm apart · blue dots = cations, red = anions</text>
              </svg>
            </div>

            {/* tester panel */}
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { k: 'applied voltage', v: `${V.toFixed(1)} V` },
                  { k: 'measured current', v: `${currentMA >= 100 ? currentMA.toFixed(0) : currentMA.toFixed(2)} mA` },
                ].map((x) => (
                  <div key={x.k} className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{x.k}</p>
                    <p className="font-mono text-lg font-bold text-teal-300">{x.v}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">verdicts (live)</p>
                <p className={`text-xs font-bold ${ledOn ? 'text-emerald-300' : 'text-slate-500'}`}>LED ({currentMA.toFixed(2)} mA vs ~2 mA need): {ledOn ? 'GLOWS ✓' : 'stays dark'}</p>
                <p className={`text-xs font-bold ${bulbOn ? 'text-emerald-300' : 'text-slate-500'}`}>bulb (~150 mA need): {bulbOn ? 'glows ✓' : 'stays dark'}</p>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">why (chemistry)</p>
                <p className="text-xs text-slate-300 leading-relaxed">{cfg.note}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setDetector(detector === 'led' ? 'bulb' : 'led')}
                  className="min-h-11 px-3 py-2 rounded-xl text-xs font-bold border bg-slate-800 border-slate-700 text-slate-200 transition-all">
                  detector: {detector === 'led' ? 'LED (needs ~2 mA)' : 'bulb (needs ~150 mA)'}
                </button>
              </div>
            </div>
          </div>

          {/* ranking strip */}
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-[11px] font-bold uppercase tracking-wider text-teal-400 mb-2">live ranking at {V.toFixed(1)} V, {gapCm} cm gap (mA)</p>
            <div className="space-y-1">
              {Object.entries(LIQUIDS)
                .map(([k, L]) => ({ k, L, ma: (V * L.G) / (gapCm / 2) }))
                .sort((x, y) => y.ma - x.ma)
                .map(({ k, L, ma }) => (
                  <button key={k} onClick={() => setLiquid(k)} className="w-full text-left group">
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] w-56 truncate ${liquid === k ? 'text-teal-300 font-bold' : 'text-slate-400 group-hover:text-slate-200'}`}>{L.label}</span>
                      <div className="flex-1 h-4 bg-slate-950 rounded overflow-hidden border border-slate-800">
                        <div className="h-full bg-teal-600 group-hover:bg-teal-500" style={{ width: `${Math.min(100, (Math.log10(ma * 1000 + 10) / 5.2) * 100)}%`, transition: 'width 200ms ease' }} />
                      </div>
                      <span className="font-mono text-[11px] text-teal-300 w-20 text-right">{ma >= 1 ? ma.toFixed(1) : ma.toFixed(3)} mA</span>
                    </div>
                  </button>
                ))}
            </div>
            <p className="mt-2 text-[11px] text-slate-500">bar widths use a log scale — the ranking is what matters; click a row to load that liquid.</p>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-amber-900/50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2">What to try</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              ① Load tap water (weak glow) and switch the detector to bulb: verdict flips to dark.
              Same liquid, different detector — that is exactly why school testers use LEDs.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
              ② Push the gap from 1 cm to 10 cm in salt solution: the current falls in steps of two
              — longer ion journey, more resistance. Gap 1 cm at 9 V reads ~216 mA; the same setup in
              distilled never leaves 0.4 mA.
            </p>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: BATHS (water splitting + plating)                     */}
      {/* ============================================================ */}
      {tab === 'baths' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* water splitting */}
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
              <p className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-2">Water-splitting cell</p>
              <button onClick={() => setAcidAdded(!acidAdded)} className={`min-h-11 w-full px-3 py-2 rounded-xl text-xs font-bold border transition-all mb-2 ${acidAdded ? 'bg-teal-600 border-teal-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}>
                drops of acid: {acidAdded ? 'added (ions present)' : 'NOT added (pure water)'}
              </button>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>supply voltage</span>
                <span className="font-mono text-teal-300">{bathVolts} V</span>
              </label>
              <input type="range" min={1} max={12} step={1} value={bathVolts} aria-label="supply voltage"
                onChange={(e) => setBathVolts(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-teal-500" />
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>run time</span>
                <span className="font-mono text-teal-300">{Math.floor(bathSecs / 60)} min {bathSecs % 60} s</span>
              </label>
              <input type="range" min={0} max={1800} step={30} value={bathSecs} aria-label="run time"
                onChange={(e) => setBathSecs(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-teal-500" />

              {/* gas tubes */}
              <div className="bg-slate-950 rounded-xl border border-slate-800 p-2 mt-2">
                <svg viewBox="0 0 240 170" className="w-full h-36" preserveAspectRatio="xMidYMid meet">
                  <rect x={30} y={20} width={60} height={130} fill="#0b1220" stroke="#64748b" strokeWidth={2} rx={6} />
                  <rect x={150} y={20} width={60} height={130} fill="#0b1220" stroke="#64748b" strokeWidth={2} rx={6} />
                  <rect x={32} y={20 + 128 * (1 - h2Fill)} width={56} height={Math.max(0, 128 * h2Fill)} fill="#60a5fa" fillOpacity={0.55} rx={4} style={{ transition: 'all 200ms ease' }} />
                  <rect x={152} y={20 + 128 * (1 - o2Fill)} width={56} height={Math.max(0, 128 * o2Fill)} fill="#f87171" fillOpacity={0.55} rx={4} style={{ transition: 'all 200ms ease' }} />
                  <text x={60} y={165} fontSize={10} fill="#93c5fd" textAnchor="middle">H₂ (cathode −)</text>
                  <text x={180} y={165} fontSize={10} fill="#fca5a5" textAnchor="middle">O₂ (anode +)</text>
                  {molH2 > 0 && <text x={60} y={40} fontSize={11} fill="#e2e8f0" textAnchor="middle" fontFamily="monospace">{(molH2 * 24000).toFixed(1)} mL</text>}
                  {molO2 > 0 && <text x={180} y={40} fontSize={11} fill="#e2e8f0" textAnchor="middle" fontFamily="monospace">{(molO2 * 24000).toFixed(1)} mL</text>}
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  { k: 'cell current', v: bathI >= 0.01 ? `${bathI.toFixed(2)} A` : `${(bathI * 1e6).toFixed(1)} µA` },
                  { k: 'charge passed Q', v: `${(bathQ).toFixed(1)} C` },
                  { k: 'H₂ collected (mol)', v: bathQ > 0 ? molH2.toExponential(2) : '0' },
                  { k: 'H : O volume ratio', v: bathQ > 0 ? `${ratioCheck.toFixed(2)} : 1 (theory 2 : 1)` : '—' },
                ].map((x) => (
                  <div key={x.k} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{x.k}</p>
                    <p className="font-mono text-sm font-bold text-teal-300">{x.v}</p>
                  </div>
                ))}
              </div>
              {!acidAdded && (
                <p className="mt-2 text-[11px] text-rose-300 leading-relaxed">
                  Current ~0 — pure water has almost no ions. Add the acid drops: H⁺ carries charge to
                  the cathode and the cell comes alive.
                </p>
              )}
            </div>

            {/* plating shop */}
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
              <p className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-2">Plating shop (Faraday arithmetic)</p>
              <label className="text-xs font-semibold text-slate-400 block mb-1">plating metal</label>
              <select value={plating} onChange={(e) => setPlating(e.target.value)}
                className="w-full min-h-11 bg-slate-900 border border-slate-700 rounded-xl px-3 text-sm text-slate-200 mb-2">
                {Object.entries(PLATINGS).map(([k, P]) => (
                  <option key={k} value={k}>{P.label}</option>
                ))}
              </select>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>current I</span>
                <span className="font-mono text-teal-300">{plateCurrent.toFixed(1)} A</span>
              </label>
              <input type="range" min={0.1} max={2} step={0.1} value={plateCurrent} aria-label="plating current"
                onChange={(e) => setPlateCurrent(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-teal-500" />
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>time t</span>
                <span className="font-mono text-teal-300">{Math.floor(plateSecs / 60)} min {plateSecs % 60} s</span>
              </label>
              <input type="range" min={60} max={3600} step={5} value={plateSecs} aria-label="plating time"
                onChange={(e) => setPlateSecs(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-teal-500" />
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>object area</span>
                <span className="font-mono text-teal-300">{plateArea} cm²</span>
              </label>
              <input type="range" min={2} max={60} step={1} value={plateArea} aria-label="object area"
                onChange={(e) => setPlateArea(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-teal-500" />

              {/* plated object visual */}
              <div className="bg-slate-950 rounded-xl border border-slate-800 p-2 mt-2">
                <svg viewBox="0 0 240 110" className="w-full h-24" preserveAspectRatio="xMidYMid meet">
                  <rect x={40} y={30} width={160} height={50} rx={10}
                    fill={pcfg.color} fillOpacity={Math.min(1, 0.15 + thicknessUm / 12)}
                    stroke={pcfg.color} strokeWidth={2}
                    style={{ transition: 'all 200ms ease' }} />
                  <text x={120} y={59} fontSize={11} fill="#0f172a" textAnchor="middle" fontWeight="bold">object (cathode −)</text>
                  <rect x={40} y={88} width={160} height={8} rx={4} fill="#94a3b8" />
                  <text x={120} y={106} fontSize={9} fill="#64748b" textAnchor="middle">anode (+) = plating metal bar, dissolving slowly</text>
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  { k: 'charge Q = I·t', v: `${plateQ.toFixed(0)} C` },
                  { k: 'metal deposited', v: plateMassG >= 1 ? `${plateMassG.toFixed(2)} g` : `${(plateMassG * 1000).toFixed(1)} mg` },
                  { k: 'layer thickness', v: `${thicknessUm.toFixed(2)} µm` },
                  { k: 'verdict', v: plateVisible ? 'visible protective layer ✓' : 'too thin — increase charge' },
                ].map((x) => (
                  <div key={x.k} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{x.k}</p>
                    <p className={`font-mono text-sm font-bold ${x.k === 'verdict' ? (plateVisible ? 'text-emerald-300' : 'text-amber-300') : 'text-teal-300'}`}>{x.v}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-slate-500 font-mono">m = Q·M/(n·F), n = {pcfg.n}, M = {pcfg.M} g/mol · thickness = m/(ρ·A), ρ = {pcfg.density} g/cm³</p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-amber-900/50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2">What to try</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              ① Run the water cell at 6 V for 300 s, then slide to 600 s WITHOUT changing anything
              else: both tubes DOUBLE, and the H : O readout stays pinned at 2.00 : 1 — the ratio is
              chemistry (2H₂O → 2H₂ + O₂), the amount is electricity (Q = I·t).
            </p>
            <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
              ② Plate copper at 0.5 A for 965 s: 0.16 g. Now switch to silver with the SAME charge:
              0.54 g. Same electricity, different metal — the M/n ratio (63.5/2 vs 108/1) decides how
              much mass each coulomb buys.
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
                  tierFilter === t ? 'bg-teal-600 border-teal-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}>
                {t}
              </button>
            ))}
            <span className="ml-auto font-mono text-xs text-slate-400">score {score.right}/{score.attempted}</span>
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
                    let cls = 'border-slate-700 bg-slate-900 hover:border-teal-600';
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
                    <button onClick={() => setHintLevel((h) => ({ ...h, [ch.id]: Math.min((h[ch.id] ?? 0) + 1, ch.hints.length) }))}
                      className="min-h-9 px-3 rounded-lg bg-amber-950/60 border border-amber-800 text-[11px] font-bold text-amber-300">
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
            <p className="text-[11px] font-bold uppercase tracking-wider text-rose-400 mb-3">Misconception killer — tap to open</p>
            <div className="space-y-2">
              {MISCONCEPTIONS.map((m, i) => (
                <div key={i} className="bg-slate-900/80 rounded-xl border border-slate-800 overflow-hidden">
                  <button onClick={() => setOpenMisc(openMisc === i ? null : i)}
                    className="w-full text-left px-4 py-3 flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-rose-300">“{m.misconception}”</span>
                    <span className="text-slate-500 text-lg leading-none">{openMisc === i ? '−' : '+'}</span>
                  </button>
                  {openMisc === i && <p className="px-4 pb-3 text-xs text-slate-300 leading-relaxed">{m.correction}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
              <p className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-2">Live facts of this chapter</p>
              <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
                <li>• Liquids conduct via IONS, not electrons: solutions of acids, bases and salts conduct; distilled water, oil and honey barely.</li>
                <li>• LED testers detect ~2 mA; bulbs need ~150 mA — weak currents are invisible to a bulb.</li>
                <li>• Electrolysis of water: H₂ : O₂ = 2 : 1 by volume at the cathode/anode.</li>
                <li>• Electroplating: object = cathode; plating metal bar = anode; mass follows Faraday m = QM/(nF).</li>
                <li>• The chemical effect of current stores ENERGY in new substances — that is a chemical change.</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
              <p className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-2">Honest-numerics notes</p>
              <ul className="text-xs text-slate-400 space-y-1.5 leading-relaxed">
                <li>• The Tester orders liquids by real conductivity data; the mA numbers are a simple G·V/gap teaching model scaled to realistic values — the RANKING and the LED/bulb thresholds are the physics.</li>
                <li>• The Baths cell uses a resistance model (24 Ω ionised vs ~GΩ pure) purely to show WHY pure water fails; gas amounts follow mol = Q/(nF) exactly.</li>
                <li>• The Plating Shop is genuine Faraday arithmetic with textbook M, n, ρ values — its predictions match any NCERT numerical.</li>
                <li>• Safety truth not simulated: mains electricity and unknown liquids must never be tested at home — classroom low-voltage cells only.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Where this chapter goes next</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Everything here scales up: Faraday&apos;s laws you previewed in the Plating Shop become
              Class 9–12 electrochemistry; the ion story explains corrosion (rusting) and why
              electrolyte-filled car batteries work; and electroplating remains a billion-rupee
              industry — jewellery, chromium bumpers, zinc-coated (galvanised) iron sheets that guard
              the roofs over our heads.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default C8_ScienceChemicalEffectsElectricCurrentSim;
