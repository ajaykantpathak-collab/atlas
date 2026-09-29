'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 10 Science -- Our Environment
 *
 * The ten percent law of energy flow up a food chain, biological
 * magnification of pesticide up the same pyramid, plus waste sorting
 * (biodegradable vs non-biodegradable) and the ozone story.
 *
 * Deep layout (master-class, 5 tabs):
 *   1. Discover    -- predict-then-test walks
 *   2. Pyramid Lab -- original energy pyramid + DDT magnification,
 *                     preserved + extended (per-level energy audit)
 *   3. Waste & Ozone -- sort-the-rubbish game + CFC/ozone panel
 *   4. Challenge   -- 3-tier quiz with hints
 *   5. Truths      -- misconceptions + honest summary
 * Self-contained: react + tailwind only.
 */

type TabKey = 'discover' | 'pyramid' | 'waste' | 'challenge' | 'truths';

const TABS: { id: TabKey; label: string; emoji: string }[] = [
  { id: 'discover', label: '1 \u00b7 Predict', emoji: '\u26a1' },
  { id: 'pyramid', label: '2 \u00b7 Pyramid Lab', emoji: '\ud83c\udf3f' },
  { id: 'waste', label: '3 \u00b7 Waste & Ozone', emoji: '\ud83d\uddd1\ufe0f' },
  { id: 'challenge', label: '4 \u00b7 Challenge', emoji: '\ud83c\udfaf' },
  { id: 'truths', label: '5 \u00b7 Truths', emoji: '\ud83e\udee0' },
];

const LEVELS = [
  { name: 'Producers (grass)', emoji: '\ud83c\udf3f', color: '#4ade80' },
  { name: 'Herbivores (grasshopper)', emoji: '\ud83e\udd77', color: '#facc15' },
  { name: 'Carnivores (frog)', emoji: '\ud83d\udc38', color: '#fb923c' },
  { name: 'Top carnivores (snake)', emoji: '\ud83d\udc0d', color: '#f87171' },
];

// ==========================================
// WASTE SORTING DATA
// ==========================================

type WasteCat = 'biodegradable' | 'recyclable' | 'hazardous';

const WASTE_ITEMS: { item: string; emoji: string; cat: WasteCat; why: string }[] = [
  { item: 'Vegetable peels', emoji: '\ud83e\udd66', cat: 'biodegradable', why: 'Broken down by decomposers in days -- compost, not landfill.' },
  { item: 'Cotton cloth scraps', emoji: '\ud83d\udc55', cat: 'biodegradable', why: 'Natural fibre; microbes digest it in weeks to months.' },
  { item: 'Aluminium can', emoji: '\ud83e\udd43', cat: 'recyclable', why: 'Non-biodegradable but infinitely recyclable -- recycling saves 95% of the energy of new smelting.' },
  { item: 'Glass bottle', emoji: '\ud83c\udf7e', cat: 'recyclable', why: 'Chemically inert (that is the problem in a dump) and perfectly recyclable.' },
  { item: 'Newspaper', emoji: '\ud83d\udcf0', cat: 'recyclable', why: 'Paper fibres survive 4-7 recycling loops before shortening too far.' },
  { item: 'Polythene bag', emoji: '\ud83d\udec3', cat: 'hazardous', why: 'Non-biodegradable for centuries; clogs drains, kills cattle that swallow it, releases toxins if burned.' },
  { item: 'Spent AA battery', emoji: '\ud83d\udd0b', cat: 'hazardous', why: 'Heavy metals (cadmium, mercury, lead) leach into soil and groundwater -- never with ordinary waste.' },
  { item: 'Old CFL bulb', emoji: '\ud83d\udca1', cat: 'hazardous', why: 'Contains mercury vapour -- a few milligrams can contaminate thousands of litres of water.' },
];

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
    skill: 'Ten percent law',
    question: 'Producers capture 100,000 kJ. With 10% transfer, the energy reaching a SECOND-ORDER consumer (frog) is:',
    options: ['10,000 kJ', '1,000 kJ', '100 kJ', '10 kJ'],
    correctIndex: 1,
    explanation:
      'Two transfers: 100,000 \u2192 10,000 (herbivore) \u2192 1,000 (frog). Trace the pyramid bar by bar in the lab; each step keeps only a tenth.',
    hints: [
      'Count the arrows crossed: producer \u2192 herbivore \u2192 carnivore.',
      'Each arrow keeps 10%.',
      '100,000 \u00d7 0.1 \u00d7 0.1 = 1,000 kJ.',
    ],
  },
  {
    id: 'ch_02',
    tier: 'foundation',
    skill: 'Energy vs matter',
    question: 'Energy through an ecosystem and MATTER through an ecosystem differ because:',
    options: [
      'both flow one way and are lost',
      'energy flows one way and is lost as heat; matter cycles back via decomposers',
      'energy cycles; matter flows one way',
      'neither changes form',
    ],
    correctIndex: 1,
    explanation:
      'The 90% "lost" at each level becomes heat (2nd law of thermodynamics) -- heat never returns to the chain. But the ATOMS (carbon, nitrogen, water) are never destroyed: decomposers return them to soil and air for producers to reuse.',
    hints: [
      'Can a plant use the heat a grasshopper gave off? Can it use the atoms of a dead grasshopper?',
      'One is a one-way street, the other a round trip.',
      'Energy: one-way. Matter: cycled.',
    ],
  },
  {
    id: 'ch_03',
    tier: 'foundation',
    skill: 'Decomposers',
    question: 'Decomposers (bacteria, fungi) are vital because they:',
    options: [
      'are the first step of every food chain',
      'break down dead organic matter and return nutrients to the soil, completing the matter cycle',
      'capture sunlight directly like plants',
      'remove energy from the ecosystem permanently',
    ],
    correctIndex: 1,
    explanation:
      'Without decomposers, dead material would lock up its atoms forever and the soil would exhaust itself. They sit OFF the main grazing chain but run the recycling loop that keeps it alive.',
    hints: [
      'What happens to a fallen log in a forest over five years?',
      'Which trophic level do they feed?',
      'They feed at EVERY level -- recycling nutrients, not occupying a rung.',
    ],
  },
  // --- standard ---
  {
    id: 'ch_04',
    tier: 'standard',
    skill: 'Pyramid shape',
    question: 'Why can a food chain rarely sustain a fifth trophic level?',
    options: [
      'Animals refuse to eat higher-level predators',
      'At 10% transfer, a 5th level would receive ~0.01% of producer energy -- too little to support a viable population',
      'Predators always become biodegradable',
      'Fifth levels exist only in water',
    ],
    correctIndex: 1,
    explanation:
      '100,000 kJ \u2192 10,000 \u2192 1,000 \u2192 100 \u2192 10 kJ. A predator needing thousands of kJ per day would need a breeding territory spanning tonnes of grass. The pyramid\u2019s apex is energy-starved -- hence scarce top predators.',
    hints: [
      'Extend the lab\u2019s arithmetic one more level: what number do you reach?',
      'Each level costs a factor of 10.',
      '10 kJ cannot run an animal.',
    ],
  },
  {
    id: 'ch_05',
    tier: 'standard',
    skill: 'Biomagnification',
    question: 'Water holds 0.02 ppm of a non-excretable pesticide. Why does the top predator carry thousands of times more?',
    options: [
      'The pesticide becomes more toxic chemically at each level',
      'It cannot be excreted, so it accumulates in each organism\u2019s tissues -- and each predator eats MANY contaminated prey over its lifetime',
      'Predators drink more water than herbivores',
      'The pesticide mutates upward through the chain',
    ],
    correctIndex: 1,
    explanation:
      'A frog eats hundreds of contaminated insects; each insect\u2019s stored dose joins the frog\u2019s body burden. Concentration multiplies ~10\u00d7 per level even though ENERGY shrinks 10\u00d7 per level. DDT: 0.02 ppm in lake water \u2192 ~25 ppm in fish-eating birds, thinning eggshells.',
    hints: [
      'One predator = many prey worth of stored pesticide.',
      'Energy gets used up and leaves; a non-excretable chemical STAYS.',
      'Accumulation runs opposite to the energy flow.',
    ],
  },
  {
    id: 'ch_06',
    tier: 'standard',
    skill: 'Waste classification',
    question: 'Why is a polythene bag an environmental worse-off than a cotton bag, even though both carry vegetables equally well?',
    options: [
      'Polythene is heavier per carry',
      'Polythene is non-biodegradable -- microbes have no enzyme pathway for it, so it persists for centuries and fragments into microplastics',
      'Cotton bags cannot be reused',
      'Polythene decomposes into fertiliser',
    ],
    correctIndex: 1,
    explanation:
      'Biodegradability is about microbial digestibility. Cotton (cellulose) is food for decomposers; polyethylene\u2019s C\u2013C backbone resists every common enzyme. The Waste tab\u2019s sorting game drills exactly this line.',
    hints: [
      'Which bag can soil bacteria actually digest?',
      'It is about time-scale of breakdown, not strength.',
      'Polythene: centuries of persistence.',
    ],
  },
  // --- advanced ---
  {
    id: 'ch_07',
    tier: 'advanced',
    skill: 'Energy accounting',
    question: 'A herbivore eats 10,000 kJ of plant matter. Roughly how is it partitioned in the lab\u2019s model and in real ecology?',
    options: [
      '10,000 kJ all becomes herbivore flesh',
      'About 10% becomes new herbivore growth; the rest is lost as heat (respiration), excreted, or never eaten (uneaten parts)',
      '90% becomes flesh; 10% is excreted',
      'It all becomes heat immediately',
    ],
    correctIndex: 1,
    explanation:
      'The "lost 90%" is not one leak but three: respiration heat (roughly half), excretion/undigested material, and parts never eaten (roots, bark). The lab folds all three into the transfer slider -- reality splits them roughly equally.',
    hints: [
      'Does a cow turn all its grass into cow?',
      'Name the three sinks: heat, waste, uneaten.',
      '~10% growth; ~half heat; rest excreted or uneaten.',
    ],
  },
  {
    id: 'ch_08',
    tier: 'advanced',
    skill: 'Ozone chemistry',
    question: 'A CFC molecule in the stratosphere can destroy tens of thousands of ozone molecules because:',
    options: [
      'CFCs are heavy and crush the ozone layer mechanically',
      'UV light breaks off a chlorine atom, and that one Cl radical catalytically converts O3 to O2 over and over before being removed',
      'CFCs feed the ozone and make it grow',
      'Ozone dissolves CFCs as fertiliser',
    ],
    correctIndex: 1,
    explanation:
      'Cl + O3 \u2192 ClO + O2; ClO + O \u2192 Cl + O2. The chlorine reappears -- a catalyst. One radical, tens of thousands of turnovers. That multiplier is why even parts-per-billion CFCs carved the Antarctic hole, and why the Montreal Protocol mattered.',
    hints: [
      'Watch what happens to the chlorine atom at the end of the two reaction steps.',
      'A catalyst is consumed and regenerated -- how many times can it work?',
      'Chlorine is regenerated: chain reaction.',
    ],
  },
  {
    id: 'ch_09',
    tier: 'advanced',
    skill: 'Synthesis',
    question: 'A village switches from catching fish to catching fish-EATING birds. Using BOTH lab quantities (energy and pesticide), the honest prediction is:',
    options: [
      'More meat per unit effort, with no other change',
      'Each bird contains far less usable energy AND far more accumulated pesticide than the fish it ate -- a double loss',
      'Less pesticide, more energy',
      'No change -- levels do not matter',
    ],
    correctIndex: 1,
    explanation:
      'One level higher means one more 10% tax (less energy per bird) and one more \u00d710 concentration step (more poison per bird). Eating high on the pyramid is the worst of both quantities -- the core lesson of the whole chapter.',
    hints: [
      'Apply both sliding rules: energy \u00f710, pesticide \u00d710 per level.',
      'Which direction does each quantity move as you climb?',
      'Energy down, toxin up.',
    ],
  },
];

// ==========================================
// MISCONCEPTIONS
// ==========================================

const MISCONCEPTIONS: { misconception: string; correction: string }[] = [
  {
    misconception: 'Plants are not part of the "food chain" -- only animals eat.',
    correction:
      'Producers ARE the chain\u2019s base: every kJ in the pyramid entered through photosynthesis. Remove plants and the entire structure starves within a season. The lab\u2019s first bar is deliberately the widest.',
  },
  {
    misconception: 'The energy lost at each level is destroyed.',
    correction:
      'Energy is never destroyed -- it is degraded to heat that can no longer do biological work. The first law is safe; it is the SECOND law (increasing disorder) that shapes the pyramid.',
  },
  {
    misconception: 'If pesticide concentration rises in water, only the water organisms are affected.',
    correction:
      'Biomagnification DELIVERS the water\u2019s poison upward: top predators inherit the sum of everything below. Humans eating tuna are a top trophic level -- mercury warnings on fish are this exact mechanism.',
  },
  {
    misconception: 'Ozone is simply "pollution", so all ozone is bad.',
    correction:
      'Location decides. Stratospheric ozone (25-35 km up) shields life from UV-B and is essential; ground-level ozone is a harmful pollutant. The "hole" is a THINNING of the good ozone, caused by CFCs, not extra bad ozone.',
  },
  {
    misconception: 'Biodegradable waste is harmless wherever you dump it.',
    correction:
      'In a heap, biodegradable waste composts. Buried anaerobically in a landfill it makes methane (a greenhouse gas ~25\u00d7 CO\u2082\u2019s potency) and leachate that poisons groundwater. "Biodegradable" still demands the RIGHT conditions.',
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export function C10_ScienceOurEnvironmentSim() {
  const [tab, setTab] = useState<TabKey>('discover');

  // ── pyramid lab state (original preserved) ──
  const [producerKJ, setProducerKJ] = useState(100000);
  const [transfer, setTransfer] = useState(10);
  const [pesticidePPM, setPesticidePPM] = useState(0.02);
  const [levels, setLevels] = useState(4);

  // ── waste game state ──
  const [bin, setBin] = useState<WasteCat | null>(null);
  const [sorted, setSorted] = useState<Record<string, WasteCat>>({});
  const [wasteIdx, setWasteIdx] = useState(0);
  const [wasteScore, setWasteScore] = useState({ right: 0, wrong: 0 });
  const [showWhy, setShowWhy] = useState<string | null>(null);

  // ── discover / challenge / truths state ──
  const [predicted, setPredicted] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [hintLevel, setHintLevel] = useState<Record<string, number>>({});
  const [tierFilter, setTierFilter] = useState<'all' | Challenge['tier']>('all');
  const [openMisc, setOpenMisc] = useState<number | null>(null);

  // ── pyramid numerics (original formulas preserved) ──
  const energies = useMemo(() => {
    const arr: number[] = [producerKJ];
    for (let i = 1; i < LEVELS.length; i++) {
      arr.push((arr[i - 1] * transfer) / 100);
    }
    return arr;
  }, [producerKJ, transfer]);

  const pesticides = useMemo(() => {
    const arr: number[] = [pesticidePPM];
    for (let i = 1; i < LEVELS.length; i++) {
      arr.push(arr[i - 1] * 10); // biomagnification: ~10x per trophic level
    }
    return arr;
  }, [pesticidePPM]);

  const maxLog = Math.log10(Math.max(producerKJ, 1));

  // waste game helpers
  const currentWaste = WASTE_ITEMS[wasteIdx];
  const sortAttempt = (cat: WasteCat) => {
    if (sorted[currentWaste.item] !== undefined) return;
    const correct = currentWaste.cat === cat;
    setSorted((s) => ({ ...s, [currentWaste.item]: currentWaste.cat }));
    setWasteScore((s) => ({ right: s.right + (correct ? 1 : 0), wrong: s.wrong + (correct ? 0 : 1) }));
    setShowWhy(currentWaste.item);
    setTimeout(() => {
      setShowWhy(null);
      setWasteIdx((i) => (i + 1) % WASTE_ITEMS.length);
    }, 1800);
  };

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

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* header */}
      <div className="flex flex-wrap items-center gap-3 pb-3 mb-3 border-b border-slate-800">
        <span className="text-3xl p-2 bg-green-950/80 rounded-2xl border border-green-700">\ud83c\udf0d</span>
        <div className="flex-1 min-w-[220px]">
          <span className="text-xs font-bold uppercase tracking-wider text-green-400">Class 10 -- Our Environment</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Energy Flow, Biomagnification and Waste</h1>
        </div>
        <span className="font-mono text-xs text-slate-500">{transfer}% per level</span>
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
      {/* TAB 1: DISCOVER                                              */}
      {/* ============================================================ */}
      {tab === 'discover' && (
        <div className="space-y-4">
          <div className="p-5 bg-slate-900/70 rounded-2xl border border-green-900/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-green-400 mb-2">Predict before you play</p>
            <p className="text-sm text-slate-200 leading-relaxed">
              Two quantities ride the same food chain. Going UP one level, ENERGY is divided by 10 and
              a non-excretable PESTICIDE is multiplied by 10. A village eats frogs today and snake
              tomorrow. What happens to their dinner?
            </p>
            <div className="mt-3 space-y-2">
              {[
                'More energy, more poison',
                'Less energy, more poison',
                'Less energy, less poison',
                'Nothing changes -- levels are just labels',
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
                    {predicted !== null && isCorrect && <span className="ml-2 text-emerald-400 font-bold text-xs">\u2713</span>}
                  </button>
                );
              })}
            </div>
            {predicted !== null && (
              <div className="mt-3 p-3 rounded-xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
                Both quantities move -- in OPPOSITE directions. Watch the pyramid bars shrink while the
                pink DDT readout explodes upward in the Pyramid Lab.
                <button onClick={() => setTab('pyramid')} className="ml-2 underline font-bold text-amber-300">
                  Open Pyramid Lab \u2192
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                t: 'Walk 1: Starve the apex',
                d: 'Drop the transfer slider from 20% to 4%. Watch how fast the top bar collapses -- and why real chains stop at 4 levels.',
              },
              {
                t: 'Walk 2: Count the leaks',
                d: 'Read the energy-audit line under each bar: heat, waste, uneaten. "Lost 90%" is three separate leaks, not one.',
              },
              {
                t: 'Walk 3: Sort the bin',
                d: 'Waste & Ozone tab: sort eight real items into three bins, then connect CFCs to the ozone thinning they caused.',
              },
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
      {/* TAB 2: PYRAMID LAB (original sim preserved + extended)       */}
      {/* ============================================================ */}
      {tab === 'pyramid' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
            {/* sun input */}
            <div className="flex items-center gap-2 mb-3 text-xs">
              <span className="text-2xl">\u2600\ufe0f</span>
              <div className="flex-1">
                <div className="h-3 rounded-full bg-gradient-to-r from-amber-500/70 to-green-500/70 relative overflow-hidden">
                  <div className="absolute right-0 top-0 bottom-0 bg-slate-950/70" style={{ width: '99%' }} />
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  the sun pours ~10\u2078 kJ on this field daily -- plants bank only ~1% of it
                </p>
              </div>
            </div>

            {/* energy pyramid (original, preserved) */}
            <div className="space-y-2">
              {LEVELS.slice(0, levels).map((lv, i) => {
                const e = energies[i];
                const widthPct = (Math.log10(Math.max(e, 1)) / maxLog) * 100;
                const loss = i === 0 ? 0 : energies[i - 1] - e;
                return (
                  <div key={lv.name} className="flex items-center gap-3">
                    <div className="w-8 text-center text-xl">{lv.emoji}</div>
                    <div className="flex-1">
                      <div
                        className="h-11 rounded-lg border-2 transition-all duration-500 flex items-center px-3 overflow-hidden"
                        style={{ width: `${Math.max(widthPct, 22)}%`, borderColor: lv.color, background: `${lv.color}22` }}
                      >
                        <span className="text-[10px] whitespace-nowrap font-bold" style={{ color: lv.color }}>
                          {lv.name}
                        </span>
                      </div>
                      <div className="flex gap-3 text-[10px] mt-0.5 flex-wrap">
                        <span className="font-mono" style={{ color: lv.color }}>
                          T{i + 1}: {e >= 1 ? e.toLocaleString(undefined, { maximumFractionDigits: 1 }) : e.toFixed(2)} kJ
                        </span>
                        {i > 0 && (
                          <span className="text-slate-500 font-mono">
                            lost {loss >= 1 ? loss.toLocaleString(undefined, { maximumFractionDigits: 0 }) : loss.toFixed(2)} kJ as heat + waste
                          </span>
                        )}
                        <span className="text-fuchsia-400 font-mono">DDT {pesticides[i]} ppm</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* arrows of energy flow (original, preserved) */}
            <div className="mt-4 bg-slate-950 rounded-xl border border-slate-800 p-3 text-[11px] font-mono text-slate-400">
              Sun --(1%)--&gt; Producers --({transfer}%)--&gt; Herbivores --({transfer}%)--&gt; Carnivores
              {levels === 4 && <> --({transfer}%)--&gt; Top</>}
              <p className="text-slate-600 mt-1">
                The {100 - transfer}% not passed on: roughly half lost as heat (2nd law of thermodynamics), rest excreted or uneaten.
              </p>
            </div>

            {/* energy audit table (new) */}
            <div className="mt-3 bg-slate-950 rounded-xl border border-slate-800 p-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">
                Energy audit for the herbivore level (assumes it eats the full herbivore budget)
              </p>
              <table className="w-full text-[11px] font-mono">
                <tbody>
                  <tr className="text-slate-400">
                    <td className="py-0.5">ingested by herbivores</td>
                    <td className="text-right text-yellow-300">{energies[0].toLocaleString(undefined, { maximumFractionDigits: 0 })} kJ</td>
                  </tr>
                  <tr className="text-slate-400">
                    <td className="py-0.5">\u2192 passed on to frogs ({transfer}%)</td>
                    <td className="text-right text-emerald-300">{energies[1].toLocaleString(undefined, { maximumFractionDigits: 1 })} kJ</td>
                  </tr>
                  <tr className="text-slate-400">
                    <td className="py-0.5">\u2192 respiration heat (~half of the loss)</td>
                    <td className="text-right text-orange-300">
                      {((energies[0] - energies[1]) * 0.5).toLocaleString(undefined, { maximumFractionDigits: 0 })} kJ
                    </td>
                  </tr>
                  <tr className="text-slate-400">
                    <td className="py-0.5">\u2192 excreted / uneaten (~half of the loss)</td>
                    <td className="text-right text-slate-300">
                      {((energies[0] - energies[1]) * 0.5).toLocaleString(undefined, { maximumFractionDigits: 0 })} kJ
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="text-[10px] text-slate-600 mt-1.5">
                The heat row never re-enters the chain. The excreted row DOES: decomposers return those
                atoms to the soil for the grass.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Producer energy captured</span>
                  <span className="font-mono font-bold text-green-400">{producerKJ.toLocaleString()} kJ</span>
                </div>
                <input
                  type="range" min={10000} max={500000} step={10000} value={producerKJ} aria-label="producer energy"
                  onChange={(e) => setProducerKJ(Number(e.target.value))}
                  className="w-full accent-green-500"
                />
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Transfer efficiency per level</span>
                  <span className="font-mono font-bold text-amber-400">{transfer}%</span>
                </div>
                <input
                  type="range" min={4} max={20} value={transfer} aria-label="transfer efficiency"
                  onChange={(e) => setTransfer(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Pesticide in water</span>
                  <span className="font-mono font-bold text-fuchsia-400">{pesticidePPM} ppm</span>
                </div>
                <input
                  type="range" min={0.01} max={0.1} step={0.01} value={pesticidePPM} aria-label="pesticide concentration"
                  onChange={(e) => setPesticidePPM(Number(e.target.value))}
                  className="w-full accent-fuchsia-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[3, 4].map((n) => (
                  <button
                    key={n}
                    onClick={() => setLevels(n)}
                    className={`py-2 rounded-xl text-[10px] font-bold ${levels === n ? 'bg-green-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                  >
                    {n}-level chain
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/80 rounded-2xl border border-fuchsia-800/60 p-4 text-xs space-y-1 font-mono">
              <p className="text-fuchsia-300 font-bold">Biomagnification check</p>
              <p className="text-slate-400">Water: {pesticidePPM} ppm</p>
              <p className="text-slate-400">
                Top consumer:{' '}
                <span className="text-rose-300 font-bold">
                  {pesticides[Math.min(levels, 4) - 1] * 10} ppm
                </span>{' '}
                (\u00d7{((pesticides[Math.min(levels, 4) - 1] * 10) / pesticidePPM).toFixed(0)})
              </p>
              <p className="text-slate-600 text-[10px] font-sans">
                Real case: 0.02 ppm DDT in lake water reached ~25 ppm in fish-eating birds, thinning eggshells.
              </p>
            </div>

            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
              <p className="font-bold text-slate-300 mb-1">Teaching note</p>
              <p>
                Energy flows one way: sun to producers to consumers, shrinking ten-fold at every step.
                That is why food chains rarely exceed four levels and why top predators are scarce.
                Matter, unlike energy, cycles back through decomposers. Pollutants that cannot be
                excreted do the opposite: they magnify upward.
              </p>
            </div>

            <div className="bg-green-950/40 rounded-2xl border border-green-800/50 p-4 text-xs">
              <p className="font-bold text-green-300 mb-1">What to try</p>
              <p>1. At 10% transfer, how much producer energy does one snake need? Trace the maths level by level.</p>
              <p className="mt-1">2. Cut the chain to 3 levels and give the frog the snake\u2019s share -- how much richer is its diet?</p>
              <p className="mt-1">3. Set the pesticide to 0.01 ppm and a 4-level chain. How many ppm must a bird\u2019s eggs survive? Compare with the real DDT record.</p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: WASTE & OZONE                                         */}
      {/* ============================================================ */}
      {tab === 'waste' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            {/* sorting game */}
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold uppercase tracking-wider text-green-400">Sort the waste</p>
                <span className="font-mono text-[11px] text-slate-400">
                  <span className="text-emerald-300">{wasteScore.right}</span> right \u00b7{' '}
                  <span className="text-rose-300">{wasteScore.wrong}</span> wrong
                </span>
              </div>
              <div className="flex items-center gap-3 bg-slate-950 rounded-xl border border-slate-800 p-3">
                <span className="text-3xl">{currentWaste.emoji}</span>
                <div>
                  <p className="text-sm font-bold text-slate-100">{currentWaste.item}</p>
                  <p className="text-[10px] text-slate-500">Which bin does it belong in?</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {([
                  ['biodegradable', '\ud83c\udf31 compost', 'bg-green-700 hover:bg-green-600'],
                  ['recyclable', '\u267b recycle', 'bg-gold-700 hover:bg-gold-600'],
                  ['hazardous', '\u26a0\ufe0f special', 'bg-rose-700 hover:bg-rose-600'],
                ] as const).map(([cat, label, cls]) => (
                  <button
                    key={cat}
                    onClick={() => sortAttempt(cat as WasteCat)}
                    disabled={sorted[currentWaste.item] !== undefined}
                    className={`min-h-11 rounded-xl text-[11px] font-bold text-white transition-all disabled:opacity-50 ${cls}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {showWhy && (
                <div className="mt-3 p-3 rounded-xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
                  {sorted[showWhy] === WASTE_ITEMS.find((w) => w.item === showWhy)?.cat ? (
                    <span className="font-bold text-emerald-300">Correct. </span>
                  ) : (
                    <span className="font-bold text-rose-300">
                      Actually {WASTE_ITEMS.find((w) => w.item === showWhy)?.cat}.{' '}
                    </span>
                  )}
                  {WASTE_ITEMS.find((w) => w.item === showWhy)?.why}
                </div>
              )}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {WASTE_ITEMS.map((w) => (
                  <span
                    key={w.item}
                    title={w.item}
                    className={`text-lg px-1.5 py-0.5 rounded-lg border ${
                      sorted[w.item]
                        ? w.cat === 'biodegradable'
                          ? 'bg-green-950 border-green-700'
                          : w.cat === 'recyclable'
                          ? 'bg-gold-950 border-gold-700'
                          : 'bg-rose-950 border-rose-700'
                        : 'bg-slate-950 border-slate-800 opacity-40'
                    }`}
                  >
                    {w.emoji}
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-slate-600 mt-1">Sorted items get their true bin colour.</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* ozone panel */}
            <div className="bg-slate-900/80 rounded-2xl border border-gold-900/50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-2">
                The ozone story: a shield 25-35 km up
              </p>
              <svg viewBox="0 0 420 190" className="w-full" role="img" aria-label="ozone layer diagram">
                {/* sun + UV */}
                <circle cx={60} cy={30} r={16} fill="#fbbf24" />
                <text x={60} y={35} textAnchor="middle" fontSize={14}>\u2600</text>
                {[0, 1, 2].map((i) => (
                  <line key={i} x1={80} y1={38 + i * 6} x2={200} y2={60 + i * 14} stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 4">
                    <animate attributeName="stroke-dashoffset" values="18;0" dur="1.2s" repeatCount="indefinite" />
                  </line>
                ))}
                <text x={120} y={26} fontSize={9} fill="#f59e0b">UV-B radiation</text>
                {/* ozone band */}
                <rect x={30} y={70} width={360} height={26} rx={8} fill="rgba(139,92,246,0.25)" stroke="#8b5cf6" strokeWidth={1.5} />
                <text x={210} y={87} textAnchor="middle" fontSize={10} fill="#c4b5fd">
                  ozone layer: O3 absorbs UV-B \u2192 O2 + O \u2192 rejoin as O3 (a standing shield)
                </text>
                {/* CFC attack */}
                <g>
                  <circle cx={330} cy={120} r={8} fill="#22d3ee" />
                  <text x={330} y={136} textAnchor="middle" fontSize={8} fill="#22d3ee">CFC rises</text>
                  <line x1={330} y1={112} x2={330} y2={100} stroke="#22d3ee" strokeWidth={2}>
                    <animate attributeName="y2" values="112;98;112" dur="2s" repeatCount="indefinite" />
                  </line>
                </g>
                {/* earth */}
                <path d="M 30,170 Q 210,150 390,170 L 390,190 L 30,190 Z" fill="rgba(74,222,128,0.2)" stroke="#4ade80" strokeWidth={1.5} />
                <text x={210} y={184} textAnchor="middle" fontSize={9} fill="#4ade80">earth\u2019s surface -- life lives under the shield</text>
              </svg>
              <div className="mt-2 space-y-1 text-[11px] font-mono text-slate-400">
                <p>Cl + O\u2083 \u2192 ClO + O\u2082</p>
                <p>ClO + O \u2192 Cl + O\u2082</p>
                <p className="text-rose-300">net: O\u2083 + O \u2192 2 O\u2082, chlorine REBORN each cycle</p>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-2">
                One chlorine radical flips ozone back to ordinary oxygen tens of thousands of times
                before it leaves the stratosphere. That catalytic multiplier is why parts-per-billion
                CFCs thinned the Antarctic ozone layer -- and why the 1987 Montreal Protocol banning
                them is the most successful environmental treaty ever signed.
              </p>
            </div>

            <div className="bg-green-950/40 rounded-2xl border border-green-800/50 p-4 text-xs">
              <p className="font-bold text-green-300 mb-1">What to try</p>
              <p>1. Sort all eight items with zero wrong. Then write the one-line rule your score card implies about "natural vs manufactured".</p>
              <p className="mt-1">2. Explain to a neighbour why a fridge (CFC-era) and a polythene bag share a single chapter -- what property do they share?</p>
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
                    tierFilter === t ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
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
                    let cls = 'border-slate-700 bg-slate-950 hover:border-green-600';
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
            <p className="text-xs font-bold uppercase tracking-wider text-green-400 mb-2">If you remember three lines</p>
            <ol className="space-y-2 text-sm text-slate-300 leading-relaxed list-decimal ml-5">
              <li>Energy shrinks 10\u00d7 per level (one-way, heat-taxed); matter cycles through decomposers.</li>
              <li>Poisons that cannot be excreted run the OPPOSITE way -- multiplying 10\u00d7 per level.</li>
              <li>Our waste problems are biodegradability problems: what microbes cannot eat, we inherit.</li>
            </ol>
            <div className="mt-3 flex gap-2">
              <button onClick={() => setTab('pyramid')} className="min-h-11 px-5 rounded-xl bg-green-600 hover:bg-green-500 text-sm font-bold">
                Back to the Pyramid
              </button>
              <button
                onClick={() => { setProducerKJ(100000); setTransfer(10); setPesticidePPM(0.02); setLevels(4); }}
                className="min-h-11 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold"
              >
                Reset the ecosystem
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default C10_ScienceOurEnvironmentSim;
