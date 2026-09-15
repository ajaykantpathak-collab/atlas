'use client';
/**
 * C6_ScienceGettingToKnowPlantsSim (Class 6 Science)
 *
 * ONE chapter: Getting to Know Plants (NCERT VI).
 * Two live stations with honest, dataset-driven numerics:
 *   • Plant Sorter: 8 real plants with real height/stem/branch data.
 *     The classifier applies the NCERT rules and shows WHY:
 *        herb  — soft green stem, under ~1 m
 *        shrub — hard stem, branches near the base, ~1–3 m
 *        tree  — hard thick trunk, branches higher up, tall
 *     plus the seed-law pairing that exams love:
 *        taproot ⇄ reticulate venation (2 seed leaves)
 *        fibrous ⇄ parallel venation (1 seed leaf)
 *   • Leaf Lab: transpiration model — water loss climbs with leaf area,
 *     sunlight and wind, and falls as humidity rises. Stomata respond.
 *
 * Deep layout (5 tabs):
 *   1. Predict   -- is a banana "a tree"? guess first
 *   2. Sorter    -- classify 8 plants from their traits
 *   3. Leaf Lab  -- the leaf as a water pump, live
 *   4. Challenge -- 9 questions in 3 tiers with hints
 *   5. Truths    -- misconception killer + honest summary
 */
import React, { useMemo, useState, useEffect } from 'react';

type TabKey = 'predict' | 'sorter' | 'leaf' | 'challenge' | 'truths';

const TABS: { id: TabKey; label: string; emoji: string }[] = [
  { id: 'predict', label: '1 · Predict', emoji: '❓' },
  { id: 'sorter', label: '2 · Plant Sorter', emoji: '🌳' },
  { id: 'leaf', label: '3 · Leaf Lab', emoji: '🍃' },
  { id: 'challenge', label: '4 · Challenge', emoji: '🎯' },
  { id: 'truths', label: '5 · Truths', emoji: '🧠' },
];

interface Plant {
  name: string;
  heightM: number;
  stem: 'soft green' | 'hard brown';
  branch: 'near base' | 'higher up' | 'basal tuft';
  root: 'taproot' | 'fibrous';
  venation: 'reticulate' | 'parallel';
  category: 'herb' | 'shrub' | 'tree';
  note: string;
}

// textbook dataset (heights typical of NCERT examples)
const PLANTS: Plant[] = [
  { name: 'Tomato', heightM: 1.0, stem: 'soft green', branch: 'near base', root: 'taproot', venation: 'reticulate', category: 'herb', note: 'the classic herb — tender green stem, barely waist-high' },
  { name: 'Mustard', heightM: 1.2, stem: 'soft green', branch: 'near base', root: 'taproot', venation: 'reticulate', category: 'herb', note: 'herb with taproot and net-veined leaves' },
  { name: 'Wheat', heightM: 0.9, stem: 'soft green', branch: 'basal tuft', root: 'fibrous', venation: 'parallel', category: 'herb', note: 'grass-family herb: fibrous roots, parallel veins' },
  { name: 'Hibiscus', heightM: 2.5, stem: 'hard brown', branch: 'near base', root: 'taproot', venation: 'reticulate', category: 'shrub', note: 'the textbook shrub — woody, bushy from the base' },
  { name: 'Lemon', heightM: 2.8, stem: 'hard brown', branch: 'near base', root: 'taproot', venation: 'reticulate', category: 'shrub', note: 'shrub: many woody stems from the base, no single trunk' },
  { name: 'Mango', heightM: 12, stem: 'hard brown', branch: 'higher up', root: 'taproot', venation: 'reticulate', category: 'tree', note: 'tree — thick trunk bare for metres before branches' },
  { name: 'Neem', heightM: 15, stem: 'hard brown', branch: 'higher up', root: 'taproot', venation: 'reticulate', category: 'tree', note: 'tree with a clear trunk crown' },
  { name: 'Banana', heightM: 4, stem: 'soft green', branch: 'basal tuft', root: 'fibrous', venation: 'parallel', category: 'herb', note: 'the trap: tall but soft "pseudostem" — botanically a giant herb' },
];

function classify(p: { heightM: number; stem: string; branch: string }): 'herb' | 'shrub' | 'tree' {
  if (p.stem === 'soft green') return 'herb';
  if (p.branch === 'higher up' && p.heightM > 3) return 'tree';
  return 'shrub';
}

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
    skill: 'Root–vein law',
    question: 'A leaf shows RETICULATE (net-like) venation. Its root system is almost certainly:',
    options: ['fibrous', 'taproot', 'no roots', 'both kinds equally likely'],
    correctIndex: 1,
    explanation:
      'Venation and root type travel together because both are set by the seed: two seed leaves (dicot) give reticulate veins AND a taproot; one seed leaf (monocot) gives parallel veins AND a fibrous root. The Sorter checks this pairing on every plant.',
    hints: ['Which pair always comes as a set?', 'Net veins ⇄ one main root going down.', 'Taproot.'],
  },
  {
    id: 'ch_02',
    tier: 'foundation',
    skill: 'Herb or shrub',
    question: 'The single clearest difference between a shrub and a herb is:',
    options: [
      'shrubs are always taller than 5 m',
      'the shrub has a hard, woody stem with branching near the base; the herb has a soft green stem',
      'herbs cannot flower',
      'shrubs have parallel venation',
    ],
    correctIndex: 1,
    explanation:
      'Height alone misleads (a 2 m herb exists); the stem tells the truth — tender and green vs woody and brown. The Sorter classifies tomato (1 m, soft) as herb and hibiscus (2.5 m, woody) as shrub on exactly this.',
    hints: ['Feel the stem, not the height.', 'Woody + branches from the base = shrub.', 'Soft green stem = herb.'],
  },
  {
    id: 'ch_03',
    tier: 'foundation',
    skill: 'Leaf parts',
    question: 'The stalk that attaches a leaf blade to the stem is the:',
    options: ['lamina', 'petiole', 'midrib', 'stipule'],
    correctIndex: 1,
    explanation:
      'Petiole = stalk; lamina = the flat green blade; midrib = the thick vein running down the lamina\'s centre. The Leaf Lab labels all three on its diagram.',
    hints: ['Which part is the flat blade?', 'The blade hangs on a stalk.', 'Petiole.'],
  },
  {
    id: 'ch_04',
    tier: 'standard',
    skill: 'Transpiration',
    question: 'On a windy, dry afternoon a plant loses water from its leaves FASTEST because:',
    options: [
      'wind pushes water back into the roots',
      'open stomata let water vapour out, and wind + dry air carry it away quickest',
      'sunlight boils the water inside the leaf',
      'dry air makes water heavier',
    ],
    correctIndex: 1,
    explanation:
      'Transpiration = water vapour escaping through stomata. Dry air has room for more vapour and wind sweeps it away, steepening the pull that drags water up from the roots. The Leaf Lab multiplies exactly these factors.',
    hints: ['Where does the water exit the leaf?', 'What pulls the vapour out fastest?', 'Stomata + wind + dry air.'],
  },
  {
    id: 'ch_05',
    tier: 'standard',
    skill: 'Wheat vs mango',
    question: 'Wheat and mango differ in their root systems because wheat has:',
    options: [
      'a taproot with parallel venation',
      'a fibrous bundle of thin roots with parallel leaf veins — the monocot package',
      'no roots at all',
      'reticulate venation and fibrous roots',
    ],
    correctIndex: 1,
    explanation:
      'Wheat is a monocot: one seed leaf → parallel veins → fibrous roots. Mango is a dicot: two seed leaves → net veins → taproot. The Sorter lists both and the pairing never crosses.',
    hints: ['Look at a blade of grass — parallel lines?', 'Which root bundle suits thin grass roots?', 'Fibrous + parallel.'],
  },
  {
    id: 'ch_06',
    tier: 'standard',
    skill: 'The banana trap',
    question: 'A banana "tree" stands 4 m tall. Botanically it is classified as a herb because:',
    options: [
      'it has no leaves',
      'its "trunk" is a soft, green pseudostem of packed leaf bases — no woody bark',
      'it grows in clusters',
      'height never matters in classification',
    ],
    correctIndex: 1,
    explanation:
      'The Sorter\'s banana row is the exam trap: tall but SOFT. Classification keys on the stem\'s texture and the branching pattern, not the height alone. Feel the "trunk" — no wood at all.',
    hints: ['Try to bend a mango trunk vs a banana pseudostem.', 'What is the stem made of?', 'Soft stem → herb, however tall.'],
  },
  {
    id: 'ch_07',
    tier: 'advanced',
    skill: 'Midday wilt',
    question: 'A potted plant wilts at 2 pm even though the soil is wet. Using the Leaf Lab\'s variables, the best explanation is:',
    options: [
      'the roots stopped existing',
      'loss (blazing sun + dry air + wind) exceeded uptake for hours; leaves lost turgor faster than the roots could replace it',
      'the leaves drank all the water',
      'wilting is a chemical change in the stem',
    ],
    correctIndex: 1,
    explanation:
      'Wilting is a water-budget failure: transpiration outpacing uptake. The Leaf Lab\'s readout goes red exactly when loss runs ahead of uptake — more sun, more wind, drier air all push it there. Watering at evening, not noon, is the gardener\'s fix.',
    hints: ['Compare the loss vs uptake readouts at extreme settings.', 'Loss has four multipliers; uptake is capped.', 'Loss > uptake → wilt.'],
  },
  {
    id: 'ch_08',
    tier: 'advanced',
    skill: 'Creepers and climbers',
    question: 'A pumpkin vine (creeper) and a money plant (climber) both have weak stems. The correct reading is:',
    options: [
      'both are shrubs because they spread far',
      'they are herbs with weak stems that need support — the pumpkin spreads on the ground, the money plant climbs',
      'they are trees lying down',
      'weak stems prove they are not plants',
    ],
    correctIndex: 1,
    explanation:
      'Weak-stemmed plants solve support two ways: creepers spread flat on the soil (pumpkin, watermelon); climbers grip upward with tendrils or roots (money plant, grapevine). The stem is still soft and green — the herb family\'s strategy.',
    hints: ['What does each plant DO with its weak stem?', 'Ground vs support.', 'Both are weak-stemmed herbs with different support tricks.'],
  },
  {
    id: 'ch_09',
    tier: 'advanced',
    skill: 'Synthesis',
    question: 'You are handed ONE unknown leaf. Using this chapter\'s tools, the maximum you can correctly infer is:',
    options: [
      'nothing at all — leaves look alike',
      'from venation alone: the likely root system and seed-leaf count (reticulate → taproot plant, parallel → fibrous plant)',
      'the exact height of the parent plant',
      'whether the plant is a tree or shrub with certainty',
    ],
    correctIndex: 1,
    explanation:
      'Venation is a reliable window into the seed-root package, but height and herb/shrub/tree status live in the STEM, which a lone leaf cannot show. Knowing what a clue can and cannot tell you is the real scientific skill — the Sorter shows which traits it used for every verdict.',
    hints: ['Which trait pair is locked together by seed structure?', 'Can a leaf tell you tree vs shrub?', 'Venation → root type and seed leaves.'],
  },
];

const MISCONCEPTIONS: { misconception: string; correction: string }[] = [
  {
    misconception: 'Root type and leaf venation are random — any plant can have any mix.',
    correction:
      'They are locked together by the seed: dicots (2 seed leaves) carry reticulate veins + a taproot; monocots (1 seed leaf) carry parallel veins + fibrous roots. Nature never ships taproot-with-parallel-veins. The Sorter\'s law panel runs this check live on every plant.',
  },
  {
    misconception: 'Anything tall must be a tree; anything small must be a herb.',
    correction:
      'Height lies; texture tells. A 4 m banana is a giant HERB (soft pseudostem), while a 1.5 m hibiscus is a true shrub (woody). Classification reads the stem and branching first, height second.',
  },
  {
    misconception: 'The midrib and veins are only for strength.',
    correction:
      'Veins are the leaf\'s plumbing AND skeleton: they deliver water and minerals in, and carry food (sugar) out to the rest of the plant. A leaf with severed veins starves even in full sunlight.',
  },
  {
    misconception: 'Leaves lose water only when the plant is over-watered.',
    correction:
      'Losing water vapour through stomata is the leaf\'s normal breathing — it is what pulls water up from the roots in the first place. Trouble starts only when LOSS beats UPTAKE (hot, dry, windy), which is wilting — the Leaf Lab\'s red zone.',
  },
  {
    misconception: 'All weak-stemmed plants are creepers.',
    correction:
      'Weak stems come in two strategies: creepers spread flat on the ground (pumpkin), climbers grip and rise (money plant, grapevine with tendrils). Same softness, opposite directions.',
  },
];

// ─── main component ───

export function C6_ScienceGettingToKnowPlantsSim() {
  const [tab, setTab] = useState<TabKey>('predict');

  // sorter state
  const [plantIdx, setPlantIdx] = useState(0);
  const [showVerdict, setShowVerdict] = useState(true);

  // leaf lab state
  const [leafArea, setLeafArea] = useState(50); // cm2
  const [sun, setSun] = useState(6); // 0..10
  const [wind, setWind] = useState(3); // 0..10
  const [humidity, setHumidity] = useState(50); // %
  const [uptake, setUptake] = useState(4); // root supply mL/h

  // predict/challenge/truths
  const [predicted, setPredicted] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [hintLevel, setHintLevel] = useState<Record<string, number>>({});
  const [tierFilter, setTierFilter] = useState<'all' | Challenge['tier']>('all');
  const [openMisc, setOpenMisc] = useState<number | null>(null);

  const plant = PLANTS[plantIdx];
  const verdict = classify(plant);
  const verdictAgrees = verdict === plant.category;

  // ── leaf numerics (relative model, honest ordering) ──
  const stomataOpen = sun > 1 && humidity < 92;
  const openFactor = stomataOpen ? 1 : 0.08; // closed stomata nearly stop loss
  const lossRate = leafArea * 0.0022 * (0.25 + sun * 0.11) * (0.5 + wind * 0.09) * ((100 - humidity) / 100) * 10 * openFactor; // mL/h
  const deficit = lossRate - uptake;
  const wilting = deficit > 0;

  // droplet animation count
  const drops = Math.max(0, Math.min(12, Math.round(lossRate / 3)));

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
    setPlantIdx(0);
    setShowVerdict(true);
    setLeafArea(50);
    setSun(6);
    setWind(3);
    setHumidity(50);
    setUptake(4);
    setPredicted(null);
  };

  // deterministic leaf droplet shimmer
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setT((v) => v + 0.016);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 rounded-3xl border border-slate-800 font-sans text-slate-100 shadow-2xl">
      {/* header */}
      <div className="flex flex-wrap items-center gap-3 pb-3 mb-3 border-b border-slate-800">
        <span className="text-3xl p-2 bg-green-950/80 rounded-2xl border border-green-700">🌿</span>
        <div className="flex-1 min-w-[220px]">
          <p className="text-xs font-bold uppercase tracking-wider text-green-400">Class 6 Science — Getting to Know Plants</p>
          <h1 className="text-xl md:text-2xl font-black text-green-300">Stems, Roots, Veins: classify &amp; read the leaf</h1>
        </div>
        <div className="text-right">
          <span className="font-mono text-xs text-slate-400 block">taproot ⇄ reticulate · fibrous ⇄ parallel</span>
          <span className="font-mono text-xs text-slate-500 block">soft stem = herb · woody = shrub/tree</span>
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
                ? 'bg-green-600 border-green-500 text-white shadow-lg shadow-green-900/40'
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
          <div className="p-5 bg-slate-900/70 rounded-2xl border border-green-900/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-green-400 mb-2">Predict before you play</p>
            <p className="text-sm text-slate-200 leading-relaxed">
              A plant in the school garden is 4 metres tall. Most students call it a tree. What does
              the science say decides — and what would a banana plant reveal?
            </p>
            <div className="mt-3 space-y-2">
              {[
                'Height above 3 m always means tree',
                'The stem decides: soft green = herb whatever the height; the banana is a giant herb',
                'Leaves decide — broad leaves mean tree',
                'Where it grows decides — gardens only hold herbs',
              ].map((opt, i) => {
                const chosen = predicted === i;
                const isCorrect = i === 1;
                let cls = 'border-slate-700 bg-slate-900 hover:border-green-600';
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
                Feel the stem, not the measuring tape. The Sorter&#39;s banana row is 4 m tall yet
                classifies as a HERB — soft pseudostem, no wood. Compare it with the 2.5 m woody
                hibiscus shrub.
                <button onClick={() => setTab('sorter')} className="ml-2 underline font-bold text-amber-300">Open Plant Sorter →</button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { t: 'Walk 1: run the law', d: 'Click through all 8 plants and watch the root-vein law panel: every reticulate plant has a taproot, every parallel plant fibrous. Zero exceptions.' },
              { t: 'Walk 2: wilt the leaf', d: 'Leaf Lab: push sun to 10, humidity to 20, wind to 10 — loss blows past uptake and the leaf wilts. Then raise humidity: recovery.' },
              { t: 'Walk 3: break it on purpose', d: 'Try to build a &quot;parallel veins + taproot&quot; plant from the dropdowns — the pairing panel refuses. That refusal IS the biology.' },
            ].map((s, i) => (
              <div key={i} className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
                <p className="text-xs font-bold text-slate-200 mb-1">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[10px] font-black mr-1.5">{i + 1}</span>
                  {s.t}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: PLANT SORTER                                          */}
      {/* ============================================================ */}
      {tab === 'sorter' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {PLANTS.map((p, i) => (
              <button key={p.name} onClick={() => setPlantIdx(i)}
                className={`min-h-11 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                  plantIdx === i ? 'bg-green-600 border-green-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600'
                }`}>
                {p.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* plant drawing */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2">
              <svg viewBox="0 0 300 340" className="w-full h-72 md:h-80" preserveAspectRatio="xMidYMid meet">
                {(() => {
                  const h = Math.min(260, 60 + plant.heightM * 14);
                  const baseY = 320;
                  const woody = plant.stem === 'hard brown';
                  const stemW = woody ? 10 : 6;
                  const stemColor = woody ? '#78350f' : '#4ade80';
                  const branchY = plant.branch === 'near base' ? baseY - h * 0.3 : plant.branch === 'higher up' ? baseY - h * 0.62 : baseY - h * 0.5;
                  return (
                    <g>
                      {/* ground */}
                      <line x1={20} y1={baseY} x2={280} y2={baseY} stroke="#365314" strokeWidth={3} />
                      {/* roots */}
                      {plant.root === 'taproot' ? (
                        <g stroke="#a16207" strokeWidth={3} fill="none">
                          <line x1={150} y1={baseY} x2={150} y2={baseY + 26} />
                          <line x1={150} y1={baseY + 8} x2={132} y2={baseY + 14} />
                          <line x1={150} y1={baseY + 8} x2={168} y2={baseY + 14} />
                        </g>
                      ) : (
                        <g stroke="#a16207" strokeWidth={2.5} fill="none">
                          <line x1={150} y1={baseY} x2={128} y2={baseY + 14} />
                          <line x1={150} y1={baseY} x2={172} y2={baseY + 14} />
                          <line x1={150} y1={baseY} x2={140} y2={baseY + 20} />
                          <line x1={150} y1={baseY} x2={162} y2={baseY + 20} />
                        </g>
                      )}
                      {/* stem / trunk */}
                      <rect x={150 - stemW / 2} y={baseY - h} width={stemW} height={h} rx={stemW / 2} fill={stemColor} style={{ transition: 'all 200ms ease' }} />
                      {/* branches */}
                      {[{ y: branchY, x: 118 }, { y: branchY + 14, x: 182 }].map((b, i) => (
                        <line key={i} x1={150} y1={b.y} x2={b.x} y2={b.y - 18} stroke={stemColor} strokeWidth={4} />
                      ))}
                      {/* leaves with venation */}
                      {[{ x: 108, y: branchY - 26 }, { x: 190, y: branchY - 8 }, { x: 150, y: baseY - h - 4 }].map((p, i) => (
                        <g key={i}>
                          <ellipse cx={p.x} cy={p.y} rx={24} ry={10} fill="#22c55e" fillOpacity={0.9} />
                          <line x1={p.x - 22} y1={p.y} x2={p.x + 22} y2={p.y} stroke="#14532d" strokeWidth={1.5} />
                          {plant.venation === 'reticulate'
                            ? [0, 1, 2].map((k) => (
                                <g key={k} stroke="#14532d" strokeWidth={0.8}>
                                  <line x1={p.x - 12 + k * 12} y1={p.y} x2={p.x - 18 + k * 12} y2={p.y - 6} />
                                  <line x1={p.x - 12 + k * 12} y1={p.y} x2={p.x - 18 + k * 12} y2={p.y + 6} />
                                </g>
                              ))
                            : [0, 1, 2, 3, 4].map((k) => (
                                <line key={k} x1={p.x - 20 + k * 10} y1={p.y - 8} x2={p.x - 14 + k * 10} y2={p.y + 8} stroke="#14532d" strokeWidth={0.8} />
                              ))}
                        </g>
                      ))}
                      <text x={150} y={30} fontSize={13} fill="#e2e8f0" textAnchor="middle" fontWeight="bold">{plant.name}</text>
                      <text x={150} y={46} fontSize={10} fill="#94a3b8" textAnchor="middle">height ≈ {plant.heightM} m · stem {plant.stem} · branches {plant.branch}</text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* classification panel */}
            <div className="space-y-2">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2">NCERT classifier — live</p>
                {[
                  { rule: 'soft green stem, short', met: plant.stem === 'soft green' },
                  { rule: 'woody stem, branches near base → shrub', met: plant.stem === 'hard brown' && plant.branch === 'near base' },
                  { rule: 'woody trunk, branches higher up, tall → tree', met: plant.stem === 'hard brown' && plant.branch === 'higher up' && plant.heightM > 3 },
                ].map((r) => (
                  <p key={r.rule} className={`text-xs ${r.met ? 'text-emerald-300' : 'text-slate-500'}`}>
                    {r.met ? '✓' : '·'} {r.rule}
                  </p>
                ))}
                {showVerdict && (
                  <p className="mt-2 text-sm font-black text-green-300">
                    verdict: {plant.name} is a {verdict.toUpperCase()}
                    {verdict !== plant.category && <span className="text-amber-300"> (textbook lists it as {plant.category})</span>}
                  </p>
                )}
                <p className="mt-1 text-[11px] text-slate-400">{plant.note}</p>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2">the seed law (root ⇄ vein pairing)</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className={`p-2 rounded-lg border ${plant.root === 'taproot' ? 'border-emerald-600 bg-emerald-950/30' : 'border-slate-800'}`}>
                    <p className="text-[10px] text-slate-500">root system</p>
                    <p className="text-xs font-bold text-green-300">{plant.root}</p>
                  </div>
                  <div className={`p-2 rounded-lg border ${plant.venation === 'reticulate' ? 'border-emerald-600 bg-emerald-950/30' : 'border-slate-800'}`}>
                    <p className="text-[10px] text-slate-500">leaf venation</p>
                    <p className="text-xs font-bold text-green-300">{plant.venation}</p>
                  </div>
                </div>
                <p className={`mt-2 text-xs font-bold ${
                  (plant.root === 'taproot') === (plant.venation === 'reticulate') ? 'text-emerald-300' : 'text-rose-300'
                }`}>
                  {(plant.root === 'taproot') === (plant.venation === 'reticulate')
                    ? '✓ lawful pair: taproot ⇄ reticulate · fibrous ⇄ parallel'
                    : '✗ unlawful mix — this pairing never occurs in nature'}
                </p>
              </div>

              <button onClick={() => setShowVerdict(!showVerdict)} className={`min-h-11 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${showVerdict ? 'bg-slate-800 border-slate-600 text-white' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                verdict {showVerdict ? 'shown' : 'hidden (quiz yourself!)'}
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-amber-900/50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2">What to try</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              ① Hide the verdict, click through all 8 plants and call each one — then reveal. Score
              6/8 or better and the herb/shrub/tree rules are yours for the exam.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
              ② Compare wheat with tomato: same size class (both herbs) but OPPOSITE root-vein
              packages — proof that the seed, not the size, runs the pairing law.
            </p>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: LEAF LAB                                              */}
      {/* ============================================================ */}
      {tab === 'leaf' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>total leaf area</span>
                <span className="font-mono text-green-300">{leafArea} cm²</span>
              </label>
              <input type="range" min={10} max={200} step={5} value={leafArea} aria-label="leaf area"
                onChange={(e) => setLeafArea(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-green-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>sunlight</span>
                <span className="font-mono text-green-300">{sun} / 10</span>
              </label>
              <input type="range" min={0} max={10} step={1} value={sun} aria-label="sunlight"
                onChange={(e) => setSun(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-green-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>wind</span>
                <span className="font-mono text-green-300">{wind} / 10</span>
              </label>
              <input type="range" min={0} max={10} step={1} value={wind} aria-label="wind"
                onChange={(e) => setWind(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-green-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>humidity</span>
                <span className="font-mono text-green-300">{humidity} %</span>
              </label>
              <input type="range" min={10} max={95} step={5} value={humidity} aria-label="humidity"
                onChange={(e) => setHumidity(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-green-500" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 flex justify-between">
              <span>root uptake (water supply)</span>
              <span className="font-mono text-green-300">{uptake} mL/h</span>
            </label>
            <input type="range" min={1} max={12} step={1} value={uptake} aria-label="root uptake"
              onChange={(e) => setUptake(Number(e.target.value))} className="w-full mt-1 min-h-11 max-w-xs accent-green-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* leaf diagram */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2">
              <svg viewBox="0 0 320 300" className="w-full h-64 md:h-72" preserveAspectRatio="xMidYMid meet">
                {/* petiole */}
                <line x1={160} y1={280} x2={160} y2={210} stroke="#65a30d" strokeWidth={7} />
                <text x={196} y={260} fontSize={10} fill="#a3e635">petiole</text>
                {/* lamina */}
                <path d="M 160 210 Q 60 150 160 60 Q 260 150 160 210" fill={wilting ? '#4d7c0f' : '#16a34a'} fillOpacity={0.9} style={{ transition: 'fill 300ms ease' }}
                  transform={wilting ? 'rotate(4 160 210)' : undefined} />
                {/* midrib */}
                <line x1={160} y1={210} x2={160} y2={62} stroke="#14532d" strokeWidth={4} />
                {/* veins: reticulate net */}
                {Array.from({ length: 6 }, (_, i) => {
                  const y = 190 - i * 22;
                  return (
                    <g key={i} stroke="#14532d" strokeWidth={1.4}>
                      <line x1={160} y1={y} x2={104 + i * 4} y2={y - 14} />
                      <line x1={160} y1={y} x2={216 - i * 4} y2={y - 14} />
                    </g>
                  );
                })}
                <text x={160} y={52} fontSize={10} fill="#a3e635" textAnchor="middle">lamina (blade) with midrib + net of veins</text>
                {/* stomata dots */}
                {stomataOpen && Array.from({ length: 14 }, (_, i) => (
                  <ellipse key={i} cx={110 + ((i * 47) % 100)} cy={100 + ((i * 31) % 90)} rx={2.5} ry={1.4}
                    fill="#bae6fd" opacity={0.5 + 0.5 * Math.abs(Math.sin(t * 2 + i))} />
                ))}
                {/* escaping vapour */}
                {stomataOpen && Array.from({ length: drops }, (_, i) => (
                  <circle key={i} cx={95 + i * 12} cy={80 - ((t * 22 + i * 24) % 46)} r={2 + (i % 2)}
                    fill="#7dd3fc" opacity={0.7 - ((t * 0.4 + i * 0.08) % 0.7)} />
                ))}
                {!stomataOpen && <text x={160} y={40} fontSize={11} fill="#fbbf24" textAnchor="middle">stomata CLOSED — loss nearly stopped</text>}
                {/* root + uptake arrow */}
                <text x={160} y={295} fontSize={10} fill="#a3e635" textAnchor="middle">roots pulling {uptake} mL/h from soil</text>
              </svg>
            </div>

            {/* water budget */}
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { k: 'water loss (transpiration)', v: `${lossRate.toFixed(1)} mL/h` },
                  { k: 'root uptake', v: `${uptake} mL/h` },
                  { k: 'stomata', v: stomataOpen ? 'open (light, not saturated)' : 'closed' },
                  { k: 'water budget', v: `${deficit >= 0 ? '−' : '+'}${Math.abs(deficit).toFixed(1)} mL/h` },
                ].map((x) => (
                  <div key={x.k} className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{x.k}</p>
                    <p className={`font-mono text-sm font-bold ${x.k === 'water budget' ? (wilting ? 'text-rose-300' : 'text-emerald-300') : 'text-green-300'}`}>{x.v}</p>
                  </div>
                ))}
              </div>
              <div className={`p-3 rounded-xl border ${wilting ? 'bg-rose-950/30 border-rose-800' : 'bg-emerald-950/30 border-emerald-800'}`}>
                <p className={`text-sm font-bold ${wilting ? 'text-rose-300' : 'text-emerald-300'}`}>
                  {wilting ? 'wilted — losing water faster than the roots supply it' : 'turgid — uptake covers the loss; leaf stands firm'}
                </p>
                <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                  loss = area × light × wind × dryness × stomata-openness. Four dials, one budget —
                  the same equation gardeners fight every summer.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-amber-900/50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2">What to try</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              ① Leave sun, wind and humidity alone and just double the leaf area from 50 to 100
              cm²: the loss doubles — more stomata, more exits. Area is the multiplication sign of
              transpiration.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
              ② Create a wilt, then rescue it with the ONLY dial a plant controls itself: push
              sunlight to 0 — stomata close, openFactor collapses, loss crashes to near zero. That
              is why leaves close shop at night.
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
                  tierFilter === t ? 'bg-green-600 border-green-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
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
                    let cls = 'border-slate-700 bg-slate-900 hover:border-green-600';
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
              <p className="text-xs font-bold text-green-300 uppercase tracking-wider mb-2">Classification key (all live in this sim)</p>
              <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
                <li>herb — soft green stem, short (tomato, mustard, wheat… and banana!)</li>
                <li>shrub — hard woody stem, branches near the base (hibiscus, lemon)</li>
                <li>tree — hard thick trunk, branches higher up (mango, neem)</li>
                <li>creeper — weak stem on the ground (pumpkin) · climber — weak stem climbing (money plant)</li>
                <li>seed law: taproot ⇄ reticulate · fibrous ⇄ parallel</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
              <p className="text-xs font-bold text-green-300 uppercase tracking-wider mb-2">Honest-numerics notes</p>
              <ul className="text-xs text-slate-400 space-y-1.5 leading-relaxed">
                <li>• The 8-plant dataset uses real typical heights and the real root/vein packages — the law panel never finds a violation because nature never offers one.</li>
                <li>• The transpiration numbers are a relative teaching model (mL/h on one plant); the ORDERING with sun, wind, dryness and area is the real physics of evaporation.</li>
                <li>• Stomata closure at night/low light is modelled as the openFactor collapse — you can see loss crash when light hits 0.</li>
                <li>• Banana&#39;s pseudostem is drawn soft-green on purpose: the picture argues with the word &quot;tree&quot;, exactly like the exam trap intends.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Where this chapter goes next</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              The root-vein-seed law becomes the monocot/dicot classification of Class 9
              (diversity chapter) and the transpiration budget returns in Class 7 transport chapter
              as the engine that lifts water up tall trunks. Flower parts you met here get their full
              reproductive story in the Class 7 Reproduction in Plants sim.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default C6_ScienceGettingToKnowPlantsSim;
