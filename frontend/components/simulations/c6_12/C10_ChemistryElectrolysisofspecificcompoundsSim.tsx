'use client';
/**
 * C10_ChemistryElectrolysisofspecificcompoundsSim (Class 10 Chemistry)
 *
 * ONE concept: Faraday's first law -- mass plated m = (I x t x M) / (n x F).
 * Same charge does NOT mean same mass: M and n decide.
 *
 * Deep layout (master-class, 5 tabs):
 *   1. Discover -- predict-then-test walks
 *   2. Cell Lab -- the original electrolysis cell, preserved + extended
 *                  (same-charge comparison strip, experiment log)
 *   3. Plating Shop -- industry module: object area + target thickness
 *                      -> required charge, time and current (real numerics)
 *   4. Challenge -- 3-tier quiz with hints
 *   5. Truths    -- misconceptions + honest summary
 */
import React, { useMemo, useState } from 'react';

type TabKey = 'discover' | 'cell' | 'shop' | 'challenge' | 'truths';
type IonKey = 'cuso4' | 'agno3' | 'al2o3';

const TABS: { id: TabKey; label: string; emoji: string }[] = [
  { id: 'discover', label: '1 \u00b7 Predict', emoji: '\u26a1' },
  { id: 'cell', label: '2 \u00b7 Cell Lab', emoji: '\ud83d\udd0b' },
  { id: 'shop', label: '3 \u00b7 Plating Shop', emoji: '\ud83c\udfed' },
  { id: 'challenge', label: '4 \u00b7 Challenge', emoji: '\ud83c\udfaf' },
  { id: 'truths', label: '5 \u00b7 Truths', emoji: '\ud83e\udee0' },
];

const ION: Record<IonKey, { label: string; metal: string; M: number; n: number; color: string; density: number }> = {
  cuso4: { label: 'CuSO4 (Cu2+)', metal: 'Copper Cu', M: 63.5, n: 2, color: '#fb923c', density: 8.96 },
  agno3: { label: 'AgNO3 (Ag+)', metal: 'Silver Ag', M: 107.9, n: 1, color: '#e2e8f0', density: 10.49 },
  al2o3: { label: 'Al2O3 (Al3+)', metal: 'Aluminium Al', M: 27.0, n: 3, color: '#94a3b8', density: 2.70 },
};
const F = 96500; // C per mole of electrons
const ELECTRONS_PER_C = 1 / (1.602e-19); // electrons in one coulomb

// ==========================================
// CHALLENGES
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
    skill: 'Faraday I',
    question: 'Faraday\u2019s first law of electrolysis says the mass deposited at an electrode is proportional to:',
    options: [
      'the voltage of the cell only',
      'the quantity of charge (Q = I \u00d7 t) passed through the electrolyte',
      'the volume of the electrolyte',
      'the temperature of the bath',
    ],
    correctIndex: 1,
    explanation:
      'm \u221d Q. Double the current or double the time -- either doubles the charge and so doubles the deposited mass. Voltage only sets how fast charge flows.',
    hints: [
      'What does m = (Q \u00d7 M)/(n \u00d7 F) put in front?',
      'Q = I \u00d7 t -- current times time.',
      'Charge passed.',
    ],
  },
  {
    id: 'ch_02',
    tier: 'foundation',
    skill: 'Which electrode',
    question: 'In electroplating a spoon with silver, the spoon must be connected as the:',
    options: [
      'anode (+), where silver dissolves',
      'cathode (\u2212), where Ag+ ions gain electrons and deposit',
      'electrolyte container',
      'either electrode -- it makes no difference',
    ],
    correctIndex: 1,
    explanation:
      'Metal ions are positive; they migrate to the negative cathode, accept n electrons each, and plate out as neutral metal atoms. The object to be plated is ALWAYS the cathode; a silver anode replenishes the Ag+ supply.',
    hints: [
      'Which electrode attracts positive ions?',
      'Reduction (gain of electrons) happens at which electrode?',
      'The cathode, negative.',
    ],
  },
  {
    id: 'ch_03',
    tier: 'foundation',
    skill: 'Ion charge',
    question: 'Why does Al3+ need THREE electrons per deposited atom while Ag+ needs only one?',
    options: [
      'Aluminium atoms are three times bigger',
      'The aluminium ion carries a 3+ charge -- neutralising it demands 3 electrons, by definition of the ion',
      'Electricity in aluminium moves faster',
      'It does not -- both need one electron',
    ],
    correctIndex: 1,
    explanation:
      'The subscript n in m = QM/(nF) IS the ion charge. Charge conservation: one Al3+ + 3e\u2212 \u2192 Al\u2070. That single "3" is why aluminium plates so reluctantly per coulomb.',
    hints: [
      'Read the formula: what role does n play?',
      'How much negative charge cancels a 3+ charge?',
      'Three electrons per ion -- n = 3.',
    ],
  },
  // --- standard ---
  {
    id: 'ch_04',
    tier: 'standard',
    skill: 'Numerical',
    question: 'A current of 0.5 A flows for 965 seconds through AgNO3. Mass of silver deposited (M = 108, n = 1, F = 96500):',
    options: ['about 0.54 g', 'about 1.08 g', 'about 0.108 g', 'about 5.4 g'],
    correctIndex: 0,
    explanation:
      'Q = 0.5 \u00d7 965 = 482.5 C. mol e\u2212 = 482.5/96500 = 0.005 mol. With n = 1, mol Ag = 0.005 \u2192 mass = 0.005 \u00d7 108 = 0.54 g. The Cell Lab reproduces this exactly.',
    hints: [
      'Q = I \u00d7 t first.',
      'Divide Q by F for moles of electrons; n = 1 means moles Ag equal that.',
      '0.005 mol \u00d7 108 g/mol = 0.54 g.',
    ],
  },
  {
    id: 'ch_05',
    tier: 'standard',
    skill: 'Same charge, different mass',
    question: 'The same 96500 C passes through three cells (AgNO3, CuSO4, Al2O3) in series. Which statement is TRUE?',
    options: [
      'Each cell deposits the same mass of metal',
      'Ag (108 g), Cu (31.75 g), Al (9 g) -- mass per mole of electrons is M/n, which differs for each metal',
      'Aluminium deposits the most because its ion has the largest charge',
      'Copper deposits most because it is between the others',
    ],
    correctIndex: 1,
    explanation:
      'One faraday of electrons deposits 1 mol Ag (n=1), \u00bd mol Cu (n=2), or \u2153 mol Al (n=3): 108 g, 31.75 g, 9 g. This is Faraday\u2019s SECOND law -- equivalent masses. Series cells receive identical charge, so identical charge deposits unequal mass.',
    hints: [
      'How many moles of each ion can one mole of electrons neutralise?',
      'Compute M/n for each metal.',
      '108, 31.75, 9 grams.',
    ],
  },
  {
    id: 'ch_06',
    tier: 'standard',
    skill: 'Reading the lab',
    question: 'In the Cell Lab you switch from CuSO4 to AgNO3 at fixed current and time. The mass JUMPS UP even though copper needs FEWER electrons per ion than... wait -- silver needs FEWER electrons per ion (n=1 vs 2). Why does silver still gain more mass per coulomb than copper would at equal n?',
    options: [
      'Silver ions are heavier AND need fewer electrons, so both factors (M/n) push the same way: 108/1 beats 63.5/2',
      'Silver is denser so more fits on the cathode',
      'Copper ions move slower in solution',
      'The lab adds a bonus for silver',
    ],
    correctIndex: 0,
    explanation:
      'Mass per coulomb is M/(nF). Silver wins on BOTH levers: bigger M (108 vs 63.5) AND smaller n (1 vs 2). That is why the same charge yields ~1.12 mg/C of silver but only ~0.33 mg/C of copper.',
    hints: [
      'The comparison quantity is M/n.',
      '108/1 vs 63.5/2 -- which is larger?',
      'Silver\u2019s M/n = 108 more than triples copper\u2019s 31.75.',
    ],
  },
  // --- advanced ---
  {
    id: 'ch_07',
    tier: 'advanced',
    skill: 'Coulomb counting',
    question: 'How many electrons flow when 1 ampere runs for exactly 1 second, and what does this make the coulomb?',
    options: [
      'about 6.24\u00d710\u00b9\u2078 electrons -- the coulomb is that many electrons\u2019 worth of charge',
      'exactly 1 electron',
      'about 96500 electrons',
      'about 6.02\u00d710\u00b2\u00b3 electrons',
    ],
    correctIndex: 0,
    explanation:
      '1 C \u00f7 1.602\u00d710\u207b\u00b9\u2079 C/e\u2212 \u2248 6.24\u00d710\u00b9\u2078 electrons. (Avogadro\u2019s 6.02\u00d710\u00b2\u00b3 is the count in a MOLE -- 96500 C -- one faraday.) The Plating Shop tab counts electrons for real plating jobs.',
    hints: [
      'A coulomb is the charge of how many electron charges?',
      '1 / 1.602\u00d710\u207b\u00b9\u2079.',
      '\u22486.24\u00d710\u00b9\u2078.',
    ],
  },
  {
    id: 'ch_08',
    tier: 'advanced',
    skill: 'Industrial calculation',
    question: 'A chrome-style shop plates 200 cm\u00b2 of surface to 10 \u00b5m with silver (density 10.49 g/cm\u00b3, M = 107.9, n = 1). Rough charge required?',
    options: ['about 19 C', 'about 188 C', 'about 1,880 C', 'about 18,800 C'],
    correctIndex: 2,
    explanation:
      'Volume = 200 cm\u00b2 \u00d7 0.001 cm = 0.2 cm\u00b3 \u2192 mass = 0.2 \u00d7 10.49 \u2248 2.1 g. Moles Ag = 2.1/107.9 \u2248 0.01946. Electrons = same (n=1) \u2192 Q = 0.01946 \u00d7 96500 \u2248 1,878 C. At 2 A that is ~15.6 minutes. The Plating Shop tab runs this calculation live.',
    hints: [
      'Mass = area \u00d7 thickness \u00d7 density first.',
      'Convert mass to moles with M, then Q = moles \u00d7 n \u00d7 F.',
      '2.1 g \u2192 0.0195 mol \u2192 \u22481880 C.',
    ],
  },
  {
    id: 'ch_09',
    tier: 'advanced',
    skill: 'Synthesis',
    question: 'Aluminium is extracted industrially from molten Al2O3 (Hall-H\u00e9roult), not from its aqueous solution. Using the lab\u2019s quantities, the best reason is:',
    options: [
      'Al2O3 is too cheap to waste',
      'Water itself is electrolysed preferentially: H+ accepts electrons before Al3+ can, so aqueous baths give hydrogen gas, not aluminium metal -- molten salt is required',
      'Aluminium dissolves back too fast in water',
      'Aluminium is magnetic and sticks to the wrong electrode',
    ],
    correctIndex: 1,
    explanation:
      'In water, the discharge (electrochemical) series rules: H+ is reduced before Al3+. So aqueous Al3+ electrolysis yields H\u2082 at the cathode and zero aluminium. Molten Al2O3 (dissolved in cryolite, ~950 \u00b0C) removes water from the competition -- and n = 3 explains the enormous electricity bill of aluminium smelters.',
    hints: [
      'What else in an aqueous bath can grab electrons?',
      'Where does H+ sit in the discharge series relative to Al3+?',
      'Hydrogen wins in water -- hence molten salt.',
    ],
  },
];

// ==========================================
// MISCONCEPTIONS
// ==========================================

const MISCONCEPTIONS: { misconception: string; correction: string }[] = [
  {
    misconception: 'More voltage always means more metal plated.',
    correction:
      'Mass depends on CHARGE (I \u00d7 t), not voltage directly. Raising voltage usually raises current (and heat, and side reactions) -- but at fixed current and time the deposit is identical whether the bath needed 2 V or 4 V.',
  },
  {
    misconception: 'The same current for the same time deposits the same mass of any metal.',
    correction:
      'Same charge deposits equal NUMBERS of electrons -- but metals take different numbers of electrons per atom and have different atomic masses. Per faraday: Ag 108 g, Cu 31.75 g, Al 9 g. Only equivalent masses are equal.',
  },
  {
    misconception: 'The object being plated should be the anode.',
    correction:
      'The plated OBJECT is the cathode: positive metal ions must travel TO it and stick. The anode (if made of the plating metal) merely dissolves to refill the ion supply.',
  },
  {
    misconception: 'Electroplating adds mass because the metal appears from nowhere.',
    correction:
      'Every plated atom travelled through the electrolyte as an ion (from the anode or the dissolved salt). Mass moves; it is not created. Weigh the anode after a long run: it has lost what the cathode gained (plus losses to sludge).',
  },
  {
    misconception: 'Electrolysis of aqueous Al2O3 fails only because water dilutes the ions.',
    correction:
      'It fails because water COMPETES and WINS: H+ is discharged in preference to Al3+, giving hydrogen gas at the cathode. Competition (the discharge series), not dilution, is the gatekeeper -- hence molten cryolite baths.',
  },
];

function thicknessProxy(um: number): number {
  return Math.min(18, um / 12);
}

// ==========================================
// MAIN COMPONENT
// ==========================================

export function C10_ChemistryElectrolysisofspecificcompoundsSim() {
  const [tab, setTab] = useState<TabKey>('discover');

  // ── cell lab state (original preserved) ──
  const [ion, setIon] = useState<IonKey>('cuso4');
  const [current, setCurrent] = useState(0.5); // amperes
  const [secs, setSecs] = useState(300); // seconds

  // ── plating shop state ──
  const [shopIon, setShopIon] = useState<IonKey>('agno3');
  const [shopArea, setShopArea] = useState(200); // cm^2
  const [shopThickUm, setShopThickUm] = useState(10); // micrometres
  const [shopCurrent, setShopCurrent] = useState(2); // A

  // ── discover / challenge / truths state ──
  const [predicted, setPredicted] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [hintLevel, setHintLevel] = useState<Record<string, number>>({});
  const [tierFilter, setTierFilter] = useState<'all' | Challenge['tier']>('all');
  const [openMisc, setOpenMisc] = useState<number | null>(null);
  const [log, setLog] = useState<{ ion: IonKey; charge: number; mass: number }[]>([]);

  // ── core numerics (original formulas preserved) ──
  const cfg = ION[ion];
  const charge = current * secs; // C
  const molE = charge / F;
  const molMetal = molE / cfg.n;
  const mass = molMetal * cfg.M; // g
  const thickUm = (mass / cfg.density / 4) * 1e4; // micrometres on a 4 cm2 face
  const electrons = charge * ELECTRONS_PER_C;
  const mins = Math.floor(secs / 60);
  const rem = secs % 60;

  // same-charge comparison strip: mass per coulomb for each metal
  const massPerC = (k: IonKey) => (ION[k].M / (ION[k].n * F)) * 1000; // mg per coulomb

  // ── plating shop numerics ──
  const shopCfg = ION[shopIon];
  const shopThickCm = shopThickUm / 1e4;
  const shopVol = shopArea * shopThickCm; // cm^3
  const shopMass = shopVol * shopCfg.density; // g
  const shopMol = shopMass / shopCfg.M;
  const shopCharge = shopMol * shopCfg.n * F; // C
  const shopTime = shopCharge / Math.max(shopCurrent, 0.01); // s
  const shopTimeH = shopTime / 3600;

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

  const recordRun = () => {
    setLog((l) => [{ ion, charge, mass }, ...l].slice(0, 6));
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 rounded-3xl border border-slate-800 font-sans text-slate-100 shadow-2xl">
      {/* header */}
      <div className="flex flex-wrap items-center gap-3 pb-3 mb-3 border-b border-slate-800">
        <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700">\u26a1</span>
        <div className="flex-1 min-w-[220px]">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">Class 10 Chemistry -- Electrolysis</p>
          <h1 className="text-xl md:text-2xl font-black text-indigo-300">Faraday\u2019s First Law, Live</h1>
        </div>
        <span className="font-mono text-xs text-slate-500">m = QM / nF</span>
      </div>

      {/* tab bar */}
      <nav className="flex flex-wrap gap-1.5 mb-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`min-h-9 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              tab === t.id
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/40'
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
          <div className="p-5 bg-slate-900/70 rounded-2xl border border-indigo-900/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 mb-2">Predict before you play</p>
            <p className="text-sm text-slate-200 leading-relaxed">
              One coulomb of charge is passed through each of three cells: AgNO\u2083 (Ag\u207a), CuSO\u2084
              (Cu\u00b2\u207a) and Al\u2082O\u2083 (Al\u00b3\u207a). Which metal is deposited in the LARGEST mass?
            </p>
            <div className="mt-3 space-y-2">
              {[
                'Aluminium -- its ion carries the biggest charge so it attracts the most',
                'Silver -- per electron it has the biggest M/n: 108 g per mole of electrons vs 31.75 (Cu) and 9 (Al)',
                'All equal -- one coulomb is one coulomb',
                'Copper -- it needs an intermediate number of electrons',
              ].map((opt, i) => {
                const chosen = predicted === i;
                const isCorrect = i === 1;
                let cls = 'border-slate-700 bg-slate-900 hover:border-indigo-600';
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
                Charge buys ELECTRONS, not mass. Each metal converts electrons to grams at its own rate
                M/(nF). Verify in the Cell Lab\u2019s comparison strip -- the same charge, three very
                different cathodes.
                <button onClick={() => setTab('cell')} className="ml-2 underline font-bold text-amber-300">
                  Open Cell Lab \u2192
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                t: 'Walk 1: Count the electrons',
                d: 'Set 1 A for 10 s in the Cell Lab. The electron counter shows ~6.2\u00d710\u00b9\u2079 electrons -- every one carrying the same 1.6\u00d710\u207b\u00b9\u2079 C.',
              },
              {
                t: 'Walk 2: Double one dial',
                d: 'Double the current. Mass doubles. Reset, double the time. Mass doubles. Charge is the only currency -- m \u221d I \u00d7 t.',
              },
              {
                t: 'Walk 3: Plate a spoon',
                d: 'Plating Shop: size a real silver job -- 200 cm\u00b2, 10 \u00b5m, 2 A -- and read the required charge and plating hours.',
              },
            ].map((s, i) => (
              <div key={i} className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
                <p className="text-xs font-bold text-slate-200 mb-1">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-black mr-1.5">{i + 1}</span>
                  {s.t}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: CELL LAB (original sim preserved + extended)          */}
      {/* ============================================================ */}
      {tab === 'cell' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>Current I</span>
                <span className="font-mono text-indigo-300">{current.toFixed(1)} A</span>
              </label>
              <input type="range" min={0.1} max={3} step={0.1} value={current} aria-label="current"
                onChange={(e) => setCurrent(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-indigo-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>Time t</span>
                <span className="font-mono text-indigo-300">{mins}m {rem}s</span>
              </label>
              <input type="range" min={10} max={1800} step={10} value={secs} aria-label="time"
                onChange={(e) => setSecs(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-indigo-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400">Electrolyte</label>
              <select value={ion} aria-label="electrolyte"
                onChange={(e) => setIon(e.target.value as IonKey)}
                className="w-full mt-1 min-h-11 px-3 rounded-xl bg-slate-900 border border-slate-700 text-sm font-bold text-slate-100">
                {(Object.keys(ION) as IonKey[]).map((k) => (
                  <option key={k} value={k}>{ION[k].label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
              <svg viewBox="0 0 560 230" className="w-full" role="img" aria-label="electrolysis cell">
                <rect x={60} y={40} width={440} height={160} rx={12} fill="#0c4a6e" opacity={0.35} stroke="#1e3a5f" />
                <text x={280} y={28} textAnchor="middle" fill="#7dd3fc" fontSize={14} fontWeight="bold">
                  {cfg.label} -- {cfg.metal} plates on the cathode
                </text>
                {/* anode */}
                <rect x={120} y={70} width={14} height={100} rx={3} fill="#78716c" />
                <text x={127} y={190} textAnchor="middle" fill="#a8a29e" fontSize={12}>anode +</text>
                {/* battery */}
                <line x1={127} y1={70} x2={127} y2={20} stroke="#64748b" strokeWidth={2} />
                <line x1={127} y1={20} x2={430} y2={20} stroke="#64748b" strokeWidth={2} />
                <line x1={430} y1={20} x2={430} y2={70} stroke="#64748b" strokeWidth={2} />
                <rect x={255} y={8} width={44} height={24} rx={4} fill="#1e293b" stroke="#475569" />
                <text x={277} y={24} textAnchor="middle" fontSize={9} fill="#e2e8f0">{current.toFixed(1)} A</text>
                {/* cathode with plating layer growing (original) */}
                <rect x={420} y={70} width={14} height={100} rx={3} fill="#57534e" />
                <rect
                  x={420 - Math.min(20, 2 + thicknessProxy(thickUm))}
                  y={70} width={14} height={100} rx={3}
                  fill={cfg.color} opacity={0.95}
                  className="transition-all duration-300"
                />
                <text x={427} y={190} textAnchor="middle" fill="#a8a29e" fontSize={12}>cathode \u2212</text>
                {/* ions drifting (original) */}
                {[0, 1, 2].map((i) => (
                  <circle key={i} cx={200 + i * 70} cy={100 + (i % 2) * 40} r={7} fill={cfg.color} opacity={0.8}>
                    <animate attributeName="cx" values={`${200 + i * 70};${410}`} dur={`${2.5 - i * 0.4}s`} repeatCount="indefinite" />
                    <text x={200 + i * 70} y={103 + (i % 2) * 40} textAnchor="middle" fontSize={7} fill="#0f172a" fontWeight="bold">
                      {cfg.n === 1 ? '+' : cfg.n === 2 ? '2+' : '3+'}
                    </text>
                  </circle>
                ))}
                {/* electrons streaming along the wire */}
                {[0, 1, 2, 3].map((i) => (
                  <circle key={`e${i}`} r={3} fill="#fbbf24">
                    <animateMotion dur="2s" repeatCount="indefinite" path={`M 430,70 L 430,20 L 127,20 L 127,70`} begin={`${i * 0.5}s`} />
                  </circle>
                ))}
                <text x={280} y={218} textAnchor="middle" fill="#e2e8f0" fontSize={13} fontFamily="monospace">
                  Q = I \u00d7 t = {current.toFixed(1)} \u00d7 {secs} = {charge.toFixed(0)} C
                </text>
              </svg>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Charge passed</div>
                  <div className="font-mono text-indigo-300 font-bold text-lg">{charge.toFixed(0)} C</div>
                </div>
                <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Moles of e\u2212</div>
                  <div className="font-mono text-violet-300 font-bold text-lg">{molE.toFixed(5)} mol</div>
                </div>
                <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Moles of metal</div>
                  <div className="font-mono text-emerald-300 font-bold text-lg">{molMetal.toFixed(5)} mol</div>
                </div>
                <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Mass plated</div>
                  <div className="font-mono text-amber-300 font-bold text-lg">{mass.toFixed(4)} g</div>
                </div>
              </div>

              <div className="p-3 bg-slate-900/70 rounded-2xl border border-slate-800 text-xs font-mono text-slate-400 leading-relaxed">
                m = (Q \u00d7 M) / (n \u00d7 F) = ({charge.toFixed(0)} \u00d7 {cfg.M}) / ({cfg.n} \u00d7 96500) ={' '}
                <span className="text-amber-300 font-bold">{mass.toFixed(4)} g</span>
                <br />
                plating thickness on a 4 cm\u00b2 face \u2248 {thickUm.toFixed(1)} \u00b5m
                <br />
                electrons through the wire: {electrons.toExponential(2)}
                <br />
                atoms landed: {(molMetal * 6.022e23).toExponential(2)}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={recordRun}
                  className="min-h-9 flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold"
                >
                  Log this run
                </button>
                <button
                  onClick={() => { setIon('cuso4'); setCurrent(0.5); setSecs(300); setLog([]); }}
                  className="min-h-9 flex-1 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold"
                >
                  Reset
                </button>
              </div>

              {log.length > 0 && (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 max-h-32 overflow-y-auto">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">experiment log</p>
                  {log.map((e, i) => (
                    <p key={i} className="text-[11px] font-mono text-slate-400">
                      {ION[e.ion].metal.split(' ')[0]}: {e.charge.toFixed(0)} C \u2192 {e.mass.toFixed(4)} g
                      <span className="text-slate-600">
                        {' '}( {(e.mass / e.charge * 1000).toFixed(3)} mg/C)
                      </span>
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* same-charge comparison strip (new) */}
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">
              The same charge, three cathodes -- mass per coulomb M/(nF)
            </p>
            <div className="space-y-2">
              {(Object.keys(ION) as IonKey[]).map((k) => {
                const mpc = massPerC(k);
                const perThisRun = mpc * charge / 1000;
                return (
                  <div key={k} className="flex items-center gap-2">
                    <span className="text-[10px] w-24 text-slate-400">{ION[k].metal.split(' ')[0]} ({ION[k].n} e\u2212)</span>
                    <div className="flex-1 h-5 rounded bg-slate-950 border border-slate-800 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${k === ion ? 'opacity-100' : 'opacity-40'}`}
                        style={{ width: `${(mpc / massPerC('agno3')) * 100}%`, background: ION[k].color }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-slate-300 w-28 text-right">
                      {mpc.toFixed(3)} mg/C \u00b7 this run: {perThisRun.toFixed(4)} g
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-700/60 rounded-2xl text-xs text-amber-200">
            <span className="font-bold">Misconception killer:</span> the same 1 C of charge does NOT deposit the same
            mass of every metal. Ag (n=1) gets ~1.12 mg per coulomb; Al (n=3) only ~0.09 mg. Divide by n before you
            divide by M.
          </div>

          <div className="p-4 bg-emerald-500/10 border border-emerald-800/60 rounded-2xl text-sm">
            <p className="font-bold text-emerald-300 mb-1">What to try</p>
            <ol className="list-decimal ml-5 space-y-1 text-slate-300">
              <li>Switch electrolyte at fixed I and t. Why does silver jump ahead of copper even though copper needs only half the electrons per ion... or does it?</li>
              <li>Find the time needed to plate exactly 0.108 g of Ag at 0.5 A. Hint: that is 0.001 mol -- how many coulombs is that?</li>
            </ol>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: PLATING SHOP                                          */}
      {/* ============================================================ */}
      {tab === 'shop' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-400">Plating metal</label>
                <select value={shopIon} aria-label="shop metal"
                  onChange={(e) => setShopIon(e.target.value as IonKey)}
                  className="w-full mt-1 min-h-11 px-3 rounded-xl bg-slate-900 border border-slate-700 text-sm font-bold text-slate-100">
                  {(Object.keys(ION) as IonKey[]).map((k) => (
                    <option key={k} value={k}>{ION[k].metal} ({ION[k].label.split('(')[1]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 flex justify-between">
                  <span>Object surface area</span>
                  <span className="font-mono text-sky-300">{shopArea} cm\u00b2</span>
                </label>
                <input type="range" min={10} max={2000} step={10} value={shopArea} aria-label="area"
                  onChange={(e) => setShopArea(Number(e.target.value))} className="w-full min-h-11 accent-sky-500" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 flex justify-between">
                  <span>Target thickness</span>
                  <span className="font-mono text-amber-300">{shopThickUm} \u00b5m</span>
                </label>
                <input type="range" min={1} max={50} step={1} value={shopThickUm} aria-label="thickness"
                  onChange={(e) => setShopThickUm(Number(e.target.value))} className="w-full min-h-11 accent-amber-500" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 flex justify-between">
                  <span>Available current</span>
                  <span className="font-mono text-indigo-300">{shopCurrent.toFixed(1)} A</span>
                </label>
                <input type="range" min={0.2} max={10} step={0.1} value={shopCurrent} aria-label="shop current"
                  onChange={(e) => setShopCurrent(Number(e.target.value))} className="w-full min-h-11 accent-indigo-500" />
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-800/60 text-xs font-mono space-y-1.5">
              <p className="text-emerald-300 font-bold">The shop\u2019s bill of quantities</p>
              <p className="text-slate-400">
                volume needed = area \u00d7 thickness = {shopArea} \u00d7 {shopThickCm.toFixed(4)} cm = {shopVol.toFixed(4)} cm\u00b3
              </p>
              <p className="text-slate-400">
                mass = volume \u00d7 density ({shopCfg.density} g/cm\u00b3) = <span className="text-amber-300">{shopMass.toFixed(3)} g</span>
              </p>
              <p className="text-slate-400">
                moles metal = {shopMass.toFixed(3)} / {shopCfg.M} = {shopMol.toFixed(4)} mol
              </p>
              <p className="text-slate-400">
                charge = mol \u00d7 n \u00d7 F = {shopMol.toFixed(4)} \u00d7 {shopCfg.n} \u00d7 96500 ={' '}
                <span className="text-indigo-300 font-bold">{shopCharge.toFixed(0)} C</span>
              </p>
              <p className="text-slate-400">
                at {shopCurrent.toFixed(1)} A: time = {shopTime.toFixed(0)} s \u2248{' '}
                <span className="text-emerald-300 font-bold">
                  {shopTimeH >= 1 ? `${shopTimeH.toFixed(1)} hours` : `${(shopTime / 60).toFixed(1)} min`}
                </span>
              </p>
              <p className="text-slate-600 text-[10px] font-sans">
                {shopTimeH > 8
                  ? 'Over a full shift -- real shops raise the current or plate in baths in parallel.'
                  : shopTime < 60
                  ? 'Under a minute -- watch for burning at high current density.'
                  : 'A plausible single-bath job.'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* object visualisation */}
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">The job, to scale (square plate)</p>
              <svg viewBox="0 0 300 220" className="w-full" role="img" aria-label="plated object">
                <rect x={40} y={20} width={220} height={160} rx={10} fill="#1e293b" stroke="#475569" strokeWidth={2} />
                {/* plated face glowing to target thickness */}
                <rect
                  x={40} y={20} width={220} height={160} rx={10}
                  fill={shopCfg.color} opacity={Math.min(0.85, 0.15 + shopThickUm / 60)}
                  className="transition-all duration-300"
                />
                <rect x={40} y={20} width={220} height={160} rx={10} fill="none" stroke={shopCfg.color} strokeWidth={Math.min(8, 1 + shopThickUm / 8)} />
                <text x={150} y={105} textAnchor="middle" fontSize={13} fill="#0f172a" fontWeight="bold">
                  {shopArea} cm\u00b2 \u00b7 {shopThickUm} \u00b5m
                </text>
                <text x={150} y={126} textAnchor="middle" fontSize={11} fill="#0f172a">
                  {shopMass.toFixed(2)} g of {shopCfg.metal.split(' ')[0]}
                </text>
                <text x={150} y={205} textAnchor="middle" fontSize={10} fill="#64748b">
                  brighter/larger rim = thicker deposit
                </text>
              </svg>
            </div>

            {/* cost intuition */}
            <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 text-xs leading-relaxed text-slate-400">
              <p className="font-bold text-slate-300 mb-1">Why smelters fear n = 3</p>
              <p>
                Aluminium\u2019s extraction needs 3 electrons per atom AND a molten (~950 \u00b0C) cryolite
                bath. Per kilogram that is roughly 96500 \u00d7 (1000/27) \u00d7 3 \u2248 1.1\u00d710\u2077 C
                -- megajoules of electricity. This is why recycling aluminium cans saves ~95% of the
                energy: the metal is already reduced.
              </p>
            </div>

            <div className="p-3 bg-emerald-500/10 border border-emerald-800/60 rounded-2xl text-xs">
              <p className="font-bold text-emerald-300 mb-1">What to try</p>
              <ol className="list-decimal ml-5 space-y-1 text-slate-300">
                <li>Plate 500 cm\u00b2 with copper at 5 \u00b5m. How many minutes at 2 A? Then switch to silver -- same geometry, what happens to the time?</li>
                <li>Halve the current. Does the required charge change? Does the required time? Separate the two ideas.</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: CHALLENGE                                             */}
      {/* ============================================================ */}
      {tab === 'challenge' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs text-slate-400 mr-1">
              Score: <span className="font-mono font-bold text-emerald-300">{score.right}</span>/{score.attempted || 0}
            </p>
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold border bg-emerald-950 text-emerald-300 border-emerald-800">
              {score.right} correct
            </span>
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold border bg-slate-800 text-slate-300 border-slate-700">
              {CHALLENGES.length} questions
            </span>
            <div className="ml-auto flex gap-1.5">
              {(['all', 'foundation', 'standard', 'advanced'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTierFilter(t)}
                  className={`min-h-9 px-3 rounded-lg text-[11px] font-bold capitalize transition-all ${
                    tierFilter === t ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
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
                  <span
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${
                      ch.tier === 'foundation'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : ch.tier === 'standard'
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-rose-950 text-rose-300 border-rose-800'
                    }`}
                  >
                    {ch.tier}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500">{ch.skill}</span>
                  <span className="text-[10px] text-slate-600 ml-auto">Q{qi + 1}</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed mb-2.5">{ch.question}</p>
                <div className="space-y-1.5">
                  {ch.options.map((opt, i) => {
                    let cls = 'border-slate-700 bg-slate-950 hover:border-indigo-600';
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
      {/* TAB 5: TRUTHS                                                */}
      {/* ============================================================ */}
      {tab === 'truths' && (
        <div className="space-y-4">
          <div className="space-y-3">
            {MISCONCEPTIONS.map((mm, i) => (
              <div key={i} className="rounded-2xl border border-rose-900/60 bg-rose-950/20 overflow-hidden">
                <button
                  onClick={() => setOpenMisc((cur) => (cur === i ? null : i))}
                  className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-rose-950/40 transition-colors"
                >
                  <span className="text-rose-400 font-black text-lg leading-none">\u2717</span>
                  <span className="text-sm font-bold text-rose-200 flex-1">{mm.misconception}</span>
                  <span className="text-slate-500 text-xs">{openMisc === i ? '\u25b2' : '\u25bc'}</span>
                </button>
                {openMisc === i && (
                  <div className="px-4 pb-4">
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-200 leading-relaxed">
                      <span className="font-bold text-emerald-300">The truth: </span>
                      {mm.correction}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-5 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">If you remember three lines</p>
            <ol className="space-y-2 text-sm text-slate-300 leading-relaxed list-decimal ml-5">
              <li>Charge (I \u00d7 t) is the only currency: m \u221d Q (Faraday I).</li>
              <li>Same charge, unequal mass: per faraday each metal delivers M/n grams (Faraday II).</li>
              <li>The plated object is the cathode; aqueous baths obey the discharge series -- H\u207a beats Al\u00b3\u207a.</li>
            </ol>
            <div className="mt-3 flex gap-2">
              <button onClick={() => setTab('cell')} className="min-h-11 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-bold">
                Back to the Cell
              </button>
              <button onClick={() => { setIon('cuso4'); setCurrent(0.5); setSecs(300); }} className="min-h-11 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold">
                Reset the cell
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default C10_ChemistryElectrolysisofspecificcompoundsSim;
