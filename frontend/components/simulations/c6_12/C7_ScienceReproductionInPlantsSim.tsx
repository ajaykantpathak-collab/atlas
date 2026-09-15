'use client';
/**
 * C7_ScienceReproductionInPlantsSim (Class 7 Science)
 *
 * ONE chapter: Reproduction in Plants (NCERT VII).
 * Two honest stations:
 *   • Flower Lab: the full sexual chain -- pollination (self/cross, by
 *     wind or insect) -> pollen tube growth -> fertilisation of ovules
 *     -> seeds and fruit. Every count is computed from YOUR sliders:
 *     stigmas reached, ovules fertilised (capped by the ovule count),
 *     fruit set %. Pollination (pollen on stigma) and FERTILISATION
 *     (male + female gamete fusing) are shown as two separate gates.
 *   • Asexual Lab: budding, fragmentation, spores -- one parent, no
 *     gametes, offspring are clones; growth is exponential where it
 *     really is (yeast doubles per generation).
 *
 * Deep layout (5 tabs):
 *   1. Predict   -- is pollen on the stigma already a seed? guess first
 *   2. Flower    -- the sexual reproduction chain, live
 *   3. Asexual   -- one-parent reproduction, counted
 *   4. Challenge -- 9 questions in 3 tiers with hints
 *   5. Truths    -- misconception killer + honest summary
 */
import React, { useMemo, useState, useEffect } from 'react';

type TabKey = 'predict' | 'flower' | 'asexual' | 'challenge' | 'truths';

const TABS: { id: TabKey; label: string; emoji: string }[] = [
  { id: 'predict', label: '1 · Predict', emoji: '❓' },
  { id: 'flower', label: '2 · Flower Lab', emoji: '🌸' },
  { id: 'asexual', label: '3 · Asexual Lab', emoji: '🫧' },
  { id: 'challenge', label: '4 · Challenge', emoji: '🎯' },
  { id: 'truths', label: '5 · Truths', emoji: '🧠' },
];

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
    skill: 'Male parts',
    question: 'The male reproductive parts of a flower are the:',
    options: ['stigma and style', 'anther and filament (the stamen)', 'ovary and ovules', 'petals and sepals'],
    correctIndex: 1,
    explanation:
      'The stamen = anther (makes pollen, the male gametes) + filament (its stalk). The pistil — stigma, style, ovary — is the FEMALE part. Click the parts in the Flower Lab to see each label light up.',
    hints: ['Which part makes the yellow pollen?', 'Stamen = anther + filament.', 'Male = stamen.'],
  },
  {
    id: 'ch_02',
    tier: 'foundation',
    skill: 'Where seeds come from',
    question: 'After fertilisation, the ovules and the ovary become respectively:',
    options: ['fruit and seeds', 'seeds and fruit', 'petals and sepals', 'stamen and pistil'],
    correctIndex: 1,
    explanation:
      'Each fertilised ovule becomes a SEED; the ovary around them swells into the FRUIT. The sweet flesh is the swollen ovary wall — the new plant hides inside the seeds, not the flesh.',
    hints: ['Which structure held the ovules before fertilisation?', 'Ovule → seed first, then the whole ovary → fruit.', 'Ovules → seeds; ovary → fruit.'],
  },
  {
    id: 'ch_03',
    tier: 'foundation',
    skill: 'Colour and reward',
    question: 'Brightly coloured petals mostly help the plant by:',
    options: [
      'making photosynthesis faster',
      'attracting pollinating insects and birds',
      'protecting seeds from rain',
      'absorbing water for the roots',
    ],
    correctIndex: 1,
    explanation:
      'Petals are advertising billboards for pollinators. In the Flower Lab, compare pollination with 0 insects (petals or not — nothing moves pollen) versus 12 bees: agents matter, colour is their signal.',
    hints: ['Who notices the colour?', 'Pollination needs an agent.', 'Insects and birds.'],
  },
  {
    id: 'ch_04',
    tier: 'standard',
    skill: 'Two gates',
    question: 'Pollination differs from fertilisation because pollination is:',
    options: [
      'the fusion of male and female gametes',
      'only the TRANSFER of pollen to a stigma — fertilisation happens later, inside the ovary',
      'the formation of fruit',
      'the same event with a different name',
    ],
    correctIndex: 1,
    explanation:
      'Two separate gates: pollination = pollen lands on the stigma (outside job, needs wind/water/insects). Fertilisation = gametes fuse (inside job, after the pollen tube grows down the style). The Flower Lab never lets seed-count exceed fertilised ovules.',
    hints: ['One happens ON the stigma, one INSIDE the ovary.', 'Transfer first, fusion second.', 'Transfer ≠ fusion.'],
  },
  {
    id: 'ch_05',
    tier: 'standard',
    skill: 'Cross vs self',
    question: 'Cross-pollination (between two different plants) is valued because:',
    options: [
      'it always produces more seeds',
      'it mixes parent traits, giving variation that helps the species adapt',
      'it needs no pollinating agent',
      'it skips the pollen-tube stage',
    ],
    correctIndex: 1,
    explanation:
      'Cross-pollination shuffles genes: varied offspring survive disease and climate swings better. Self-pollination is a reliable backup (one plant, no partner needed) but the offspring are near-clones. The Flower Lab flags variation for each mode.',
    hints: ['What is the long-term value of mixing two parents\' traits?', 'Variation helps survival.', 'Cross = variation.'],
  },
  {
    id: 'ch_06',
    tier: 'standard',
    skill: 'Count the seeds',
    question: 'A flower has 6 ovules. 40 pollen grains land on its stigma but only 4 pollen grains germinate and reach ovules. How many SEEDS form?',
    options: ['40', '6', '4', '0'],
    correctIndex: 2,
    explanation:
      'Seeds = fertilised ovules = min(reached pollen, available ovules) = min(4, 6) = 4. The two extra ovules stay unfertilised. The Flower Lab reproduces exactly this capping logic on its sliders.',
    hints: ['Only pollen that REACHES an ovule can fertilise it.', 'Seeds cannot exceed the ovule count either.', 'min(4, 6) = 4.'],
  },
  {
    id: 'ch_07',
    tier: 'advanced',
    skill: 'Asexual engines',
    question: 'Yeast reproduces by budding. Starting from 1 cell and 4 doublings (buds separating as new cells), the count becomes:',
    options: ['4 cells', '8 cells', '16 cells', '5 cells'],
    correctIndex: 2,
    explanation:
      'Each budding event doubles the population: 1 → 2 → 4 → 8 → 16 after four doublings. The Asexual Lab grows the colony generation by generation — exponential, with every cell a clone of the parent.',
    hints: ['Budding doubles the count each round.', '2⁴.', '16 cells.'],
  },
  {
    id: 'ch_08',
    tier: 'advanced',
    skill: 'Agents of transfer',
    question: 'A wind-pollinated plant (like maize) differs from an insect-pollinated one (like rose) in that wind-pollinated flowers usually:',
    options: [
      'have big colourful petals and strong scent',
      'produce huge amounts of light, dry pollen — most of it never reaches a stigma',
      'have no anthers at all',
      'grow their seeds before flowering',
    ],
    correctIndex: 1,
    explanation:
      'Wind is a wasteful courier, so grasses and maize flood the air with light pollen — quantity for luck. Insect flowers invest in petals, scent and nectar instead, because a bee delivers pollen precisely. The Flower Lab models the same trade-off in its efficiency factors.',
    hints: ['How targeted is wind as a delivery service?', 'Wasteful agent → enormous pollen numbers.', 'Light, dry, super-abundant pollen.'],
  },
  {
    id: 'ch_09',
    tier: 'advanced',
    skill: 'Synthesis',
    question: 'A farmer grows seedless grapes. The best reading of "seedless" in reproduction language is:',
    options: [
      'the grapes grew without any flower',
      'the ovules were not fertilised (or aborted), so no seeds developed — but the ovary still swelled into fruit, often helped by growers',
      'the fruit is a root, not an ovary',
      'seedless fruits reproduce through their flowers during eating',
    ],
    correctIndex: 1,
    explanation:
      'Fruit development is largely the ovary\'s job and can proceed with unfertilised ovules (parthenocarpy), leaving no seeds inside. It shows how precisely the ovule→seed and ovary→fruit tracks are separated — the same two tracks the Flower Lab keeps distinct in its readouts.',
    hints: ['Seedless means which stage failed?', 'Ovules without fertilisation never become seeds.', 'No fertilised ovules, but the ovary can still swell.'],
  },
];

const MISCONCEPTIONS: { misconception: string; correction: string }[] = [
  {
    misconception: 'Pollination and fertilisation are the same thing.',
    correction:
      'Pollination is DELIVERY: pollen lands on the stigma. Fertilisation is FUSION: male gamete meets egg inside the ovule, after the pollen tube grows down the style. A flower can be pollinated on 40 stigmas yet have 0 fertilisations in bad conditions — the Flower Lab keeps the two gates separate on purpose.',
  },
  {
    misconception: 'Flowers exist to look pretty and give bees nectar.',
    correction:
      'Reverse the charity: the plant PAYS nectar to hire the bee as a pollen courier. A flower is a reproductive organ — every petal, scent and drop of nectar is recruitment for gamete transfer. Pretty is a side effect of hiring.',
  },
  {
    misconception: 'Every plant grows from seeds.',
    correction:
      'Potatoes sprout from stem tubers, roses from stem cuttings, sweet potato from roots, moss and ferns from spores, yeast by budding, Spirogyra by fragmentation. Seed-making (sexual) is one strategy; the Asexual Lab shows the one-parent alternatives.',
  },
  {
    misconception: 'The juicy fruit flesh grows into the new plant.',
    correction:
      'The flesh is the swollen OVARY WALL — a lunchbox and a fertiliser pack for animals. The embryo inside the SEED is the next plant. Eat the mango, spit the seed: the plant planned exactly that.',
  },
  {
    misconception: 'Insects "help" flowers out of kindness, and flowers would die without every insect.',
    correction:
      'It is a two-way contract: insects take energy-rich nectar and pollen (food) while unknowingly transferring pollen. Some crops are self-pollinating and need no agents at all — set the Flower Lab to self-pollination with 0 insects and watch seeds still form.',
  },
];

// ─── main component ───

export function C7_ScienceReproductionInPlantsSim() {
  const [tab, setTab] = useState<TabKey>('predict');

  // flower lab state
  const [mode, setMode] = useState<'self' | 'cross'>('cross');
  const [agent, setAgent] = useState<'insect' | 'wind'>('insect');
  const [pollen, setPollen] = useState(60);
  const [pollinators, setPollinators] = useState(8);
  const [ovules, setOvules] = useState(6);
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0); // 0 flower, 1 pollinated, 2 tube grown, 3 seeds/fruit
  const [tubeProgress, setTubeProgress] = useState(0); // 0..1
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  // asexual lab state
  const [aMode, setAMode] = useState<'budding' | 'fragmentation' | 'spores'>('budding');
  const [generations, setGenerations] = useState(4);
  const [fragments, setFragments] = useState(5);
  const [sporesPer, setSporesPer] = useState(50);
  const [parentCells, setParentCells] = useState(1);

  // predict/challenge/truths
  const [predicted, setPredicted] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [hintLevel, setHintLevel] = useState<Record<string, number>>({});
  const [tierFilter, setTierFilter] = useState<'all' | Challenge['tier']>('all');
  const [openMisc, setOpenMisc] = useState<number | null>(null);

  // ── flower numerics (deterministic from sliders) ──
  const agentFactor = mode === 'self' ? 0.9 : agent === 'insect' ? 1.0 : 0.35; // wind wastes pollen
  const pollinatorNeed = mode === 'cross' ? Math.max(1, pollinators) : Math.max(1, pollinators * 0.6);
  const stigmasInPatch = mode === 'cross' ? 8 : 1; // cross needs other plants
  const pollenLanded = Math.round(Math.min(pollen, pollen * 0.6 * agentFactor * (pollinators > 0 ? 1 + pollinators / 12 : 0.15) * (stigmasInPatch / 2)));
  const stigmasPollinated = Math.min(stigmasInPatch, Math.round(pollenLanded / 8));
  const pollenGerminated = Math.round(Math.min(pollenLanded, pollenLanded * 0.55));
  const ovulesFertilised = Math.min(ovules, pollenGerminated);
  const fruitSetPct = Math.round((Math.min(stigmasPollinated, stigmasInPatch) / stigmasInPatch) * 100);
  const variation = mode === 'cross';

  const growTube = () => {
    setStage(1);
    setTubeProgress(0);
  };

  // deterministic pollen tube growth animation
  useEffect(() => {
    if (stage !== 1) return;
    let raf = 0;
    const tick = () => {
      setTubeProgress((p) => {
        const next = p + 0.02;
        if (next >= 1) {
          setStage(2);
          return 1;
        }
        return next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stage]);

  // ── asexual numerics ──
  const asexualCount =
    aMode === 'budding'
      ? parentCells * Math.pow(2, generations)
      : aMode === 'fragmentation'
        ? fragments * Math.pow(2, Math.min(generations, 6))
        : sporesPer * Math.max(1, Math.min(generations, 20));

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
    setMode('cross');
    setAgent('insect');
    setPollen(60);
    setPollinators(8);
    setOvules(6);
    setStage(0);
    setTubeProgress(0);
    setSelectedPart(null);
    setAMode('budding');
    setGenerations(4);
    setFragments(5);
    setSporesPer(50);
    setParentCells(1);
    setPredicted(null);
  };

  const PART_INFO: Record<string, { label: string; role: string }> = {
    sepal: { label: 'Sepal', role: 'outer green armor — protected the bud before it opened' },
    petal: { label: 'Petal', role: 'coloured advertisement that recruits insect pollinators' },
    anther: { label: 'Anther', role: 'pollen factory — each grain holds the male gametes' },
    filament: { label: 'Filament', role: 'stalk that holds the anther up where agents can reach it' },
    stigma: { label: 'Stigma', role: 'sticky landing pad — pollen must stick here for pollination' },
    style: { label: 'Style', role: 'the tube-passage the pollen grows down to reach the ovary' },
    ovary: { label: 'Ovary', role: 'swells into the FRUIT after fertilisation' },
    ovule: { label: 'Ovule', role: 'holds the egg — each fertilised ovule becomes a SEED' },
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 rounded-3xl border border-slate-800 font-sans text-slate-100 shadow-2xl">
      {/* header */}
      <div className="flex flex-wrap items-center gap-3 pb-3 mb-3 border-b border-slate-800">
        <span className="text-3xl p-2 bg-pink-950/80 rounded-2xl border border-pink-700">🌸</span>
        <div className="flex-1 min-w-[220px]">
          <p className="text-xs font-bold uppercase tracking-wider text-pink-400">Class 7 Science — Reproduction in Plants</p>
          <h1 className="text-xl md:text-2xl font-black text-pink-300">Pollen to Seed: the two-gate journey</h1>
        </div>
        <div className="text-right">
          <span className="font-mono text-xs text-slate-400 block">pollination → tube → fusion</span>
          <span className="font-mono text-xs text-slate-500 block">ovule → seed · ovary → fruit</span>
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
                ? 'bg-pink-600 border-pink-500 text-white shadow-lg shadow-pink-900/40'
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
          <div className="p-5 bg-slate-900/70 rounded-2xl border border-pink-900/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-pink-400 mb-2">Predict before you play</p>
            <p className="text-sm text-slate-200 leading-relaxed">
              40 pollen grains stick to a stigma whose ovary holds 6 ovules. Does this already mean
              40 new seeds?
            </p>
            <div className="mt-3 space-y-2">
              {[
                'Yes — every pollen grain = one seed',
                'No — seeds need fertilisation: only pollen that grows down and reaches ovules counts, and never more than 6',
                'Yes — but only if the flower is cross-pollinated',
                'No — seeds come from petals, not ovules',
              ].map((opt, i) => {
                const chosen = predicted === i;
                const isCorrect = i === 1;
                let cls = 'border-slate-700 bg-slate-900 hover:border-pink-600';
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
                Two gates: pollination (landing) then fertilisation (fusion inside the ovule). Set
                the Flower Lab to pollen = 40, ovules = 6 and press Grow — the seed counter stops at
                the SMALLER number, never 40.
                <button onClick={() => setTab('flower')} className="ml-2 underline font-bold text-amber-300">Open Flower Lab →</button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { t: 'Walk 1: fire the bee', d: 'Set pollinators to 0: pollen landed collapses to almost nothing — colour and nectar hire couriers, but with no courier nothing moves.' },
              { t: 'Walk 2: cross vs self', d: 'Switch to self-pollination: one stigma in the patch, no partner needed, variation flag OFF. Both modes obey the same two gates.' },
              { t: 'Walk 3: one parent is enough', d: 'Asexual Lab: yeast at 6 doublings from 1 cell = 64 clones. No stigmas, no pollen, no variation.' },
            ].map((s, i) => (
              <div key={i} className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
                <p className="text-xs font-bold text-slate-200 mb-1">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-[10px] font-black mr-1.5">{i + 1}</span>
                  {s.t}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: FLOWER LAB                                            */}
      {/* ============================================================ */}
      {tab === 'flower' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-wrap gap-2">
              <div className="flex gap-1">
                {(['self', 'cross'] as const).map((m) => (
                  <button key={m} onClick={() => { setMode(m); setStage(0); }}
                    className={`min-h-11 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${mode === m ? 'bg-pink-600 border-pink-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                    {m === 'self' ? 'self-pollination' : 'cross-pollination'}
                  </button>
                ))}
              </div>
              <div className="flex gap-1">
                {(['insect', 'wind'] as const).map((a) => (
                  <button key={a} onClick={() => { setAgent(a); setStage(0); }}
                    className={`min-h-11 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${agent === a ? 'bg-amber-600 border-amber-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                    by {a}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs font-semibold text-slate-400 flex justify-between">
                  <span>pollen</span>
                  <span className="font-mono text-pink-300">{pollen}</span>
                </label>
                <input type="range" min={10} max={200} step={5} value={pollen} aria-label="pollen grains"
                  onChange={(e) => { setPollen(Number(e.target.value)); setStage(0); }} className="w-full mt-1 min-h-11 accent-pink-500" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 flex justify-between">
                  <span>pollinators</span>
                  <span className="font-mono text-pink-300">{pollinators}</span>
                </label>
                <input type="range" min={0} max={20} step={1} value={pollinators} aria-label="pollinators"
                  onChange={(e) => { setPollinators(Number(e.target.value)); setStage(0); }} className="w-full mt-1 min-h-11 accent-pink-500" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 flex justify-between">
                  <span>ovules</span>
                  <span className="font-mono text-pink-300">{ovules}</span>
                </label>
                <input type="range" min={1} max={12} step={1} value={ovules} aria-label="ovules"
                  onChange={(e) => { setOvules(Number(e.target.value)); setStage(0); }} className="w-full mt-1 min-h-11 accent-pink-500" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* flower SVG */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2">
              <svg viewBox="0 0 320 340" className="w-full h-72 md:h-80" preserveAspectRatio="xMidYMid meet">
                {/* stem */}
                <line x1={160} y1={200} x2={160} y2={330} stroke="#4ade80" strokeWidth={5} />
                {/* sepals */}
                {[{ x: 120, y: 205 }, { x: 200, y: 205 }].map((p, i) => (
                  <ellipse key={i} cx={p.x} cy={p.y} rx={22} ry={9} fill="#166534" transform={`rotate(${i === 0 ? -30 : 30} ${p.x} ${p.y})`}
                    onClick={() => setSelectedPart('sepal')} className="cursor-pointer" />
                ))}
                {/* petals */}
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                  <ellipse key={deg} cx={160 + 52 * Math.cos((deg * Math.PI) / 180)} cy={140 + 52 * Math.sin((deg * Math.PI) / 180)}
                    rx={34} ry={18} fill="#f9a8d4" fillOpacity={0.85} stroke="#ec4899"
                    transform={`rotate(${deg} ${160 + 52 * Math.cos((deg * Math.PI) / 180)} ${140 + 52 * Math.sin((deg * Math.PI) / 180)})`}
                    onClick={() => setSelectedPart('petal')} className="cursor-pointer" />
                ))}
                {/* stamens: filament + anther */}
                {[{ x: 138, y: 122 }, { x: 182, y: 122 }, { x: 148, y: 108 }, { x: 172, y: 108 }].map((p, i) => (
                  <g key={i}>
                    <line x1={160} y1={140} x2={p.x} y2={p.y} stroke="#fcd34d" strokeWidth={2.5}
                      onClick={() => setSelectedPart('filament')} className="cursor-pointer" />
                    <ellipse cx={p.x} cy={p.y - 4} rx={8} ry={5} fill="#f59e0b"
                      onClick={() => setSelectedPart('anther')} className="cursor-pointer" />
                  </g>
                ))}
                {/* pollen dust on anthers (density from slider) */}
                {Array.from({ length: Math.min(20, Math.round(pollen / 10)) }, (_, i) => (
                  <circle key={i} cx={150 + ((i * 23) % 44)} cy={100 + ((i * 17) % 14)} r={1.6} fill="#fde68a" opacity={0.9} />
                ))}
                {/* pistil: stigma + style + ovary */}
                <path d="M 160 140 L 160 96" stroke="#a78bfa" strokeWidth={7}
                  onClick={() => setSelectedPart('style')} className="cursor-pointer" />
                <ellipse cx={160} cy={92} rx={10} ry={7} fill="#c4b5fd"
                  onClick={() => setSelectedPart('stigma')} className="cursor-pointer" />
                {/* pollen ON the stigma after pollination */}
                {stage >= 1 && Array.from({ length: Math.min(8, Math.round(pollenLanded / 6)) }, (_, i) => (
                  <circle key={i} cx={153 + ((i * 7) % 15)} cy={87 + ((i * 5) % 9)} r={1.8} fill="#fde68a" />
                ))}
                {/* pollen tube growing down the style */}
                {stage >= 1 && (
                  <line x1={160} y1={96} x2={160} y2={96 + tubeProgress * 58} stroke="#fbbf24" strokeWidth={2.5}
                    strokeDasharray="4 3" style={{ transition: 'all 50ms linear' }} />
                )}
                {/* ovary with ovules */}
                <ellipse cx={160} cy={215} rx={26} ry={18} fill="#7c3aed" fillOpacity={0.75}
                  onClick={() => setSelectedPart('ovary')} className="cursor-pointer" />
                {Array.from({ length: ovules }, (_, i) => {
                  const ang = (i / ovules) * 2 * Math.PI;
                  const fert = stage >= 2 && i < ovulesFertilised;
                  return (
                    <circle key={i} cx={160 + 14 * Math.cos(ang)} cy={215 + 9 * Math.sin(ang)} r={4}
                      fill={fert ? '#fbbf24' : '#e9d5ff'}
                      onClick={() => setSelectedPart('ovule')} className="cursor-pointer"
                      style={{ transition: 'fill 400ms ease' }} />
                  );
                })}
                {/* stage 3: fruit hint */}
                {stage >= 2 && ovulesFertilised > 0 && (
                  <text x={160} y={252} fontSize={11} fill="#fbbf24" textAnchor="middle">ovary → fruit, gold ovules → seeds</text>
                )}
                {/* bee agent */}
                {agent === 'insect' && pollinators > 0 && stage === 0 && (
                  <g>
                    <ellipse cx={235} cy={90} rx={9} ry={6} fill="#fbbf24" />
                    <line x1={228} y1={84} x2={242} y2={82} stroke="#1f2937" strokeWidth={2} />
                    <animateTransform attributeName="transform" type="translate" values="0 0; -6 8; 0 0" dur="2.2s" repeatCount="indefinite" />
                  </g>
                )}
              </svg>
              {/* part info */}
              <div className="p-2 min-h-14">
                {selectedPart ? (
                  <p className="text-xs text-slate-300">
                    <span className="font-bold text-pink-300">{PART_INFO[selectedPart]?.label ?? selectedPart}:</span>{' '}
                    {PART_INFO[selectedPart]?.role}
                  </p>
                ) : (
                  <p className="text-xs text-slate-500">tap any flower part to read its reproductive job</p>
                )}
              </div>
            </div>

            {/* chain panel */}
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { k: 'pollen landed on stigmas', v: `${pollenLanded}` },
                  { k: 'stigmas pollinated', v: `${stigmasPollinated} / ${stigmasInPatch}` },
                  { k: 'pollen tubes reached ovary', v: stage >= 2 ? `${pollenGerminated}` : '—' },
                  { k: 'ovules fertilised (seeds)', v: stage >= 2 ? `${ovulesFertilised} / ${ovules}` : '—' },
                  { k: 'fruit set of patch', v: `${fruitSetPct} %` },
                  { k: 'genetic variation in offspring', v: variation ? 'yes (two parents)' : 'minimal (one parent)' },
                ].map((x) => (
                  <div key={x.k} className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{x.k}</p>
                    <p className="font-mono text-sm font-bold text-pink-300">{x.v}</p>
                  </div>
                ))}
              </div>

              {/* stage controls */}
              <div className="flex flex-wrap gap-2">
                <button onClick={growTube} disabled={stage >= 1}
                  className="min-h-11 px-4 py-2 rounded-xl bg-pink-600 border border-pink-500 text-xs font-bold text-white disabled:opacity-40 transition-all">
                  1 · pollinate (land pollen)
                </button>
                <button onClick={() => setTubeProgress((p) => Math.min(1, p + 0.34))} disabled={stage !== 1}
                  className="min-h-11 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 disabled:opacity-40 transition-all">
                  2 · tube grows down (auto — tap to speed)
                </button>
                <button onClick={() => setStage(3)} disabled={stage < 2}
                  className="min-h-11 px-4 py-2 rounded-xl bg-amber-600 border border-amber-500 text-xs font-bold text-white disabled:opacity-40 transition-all">
                  3 · form seeds &amp; fruit
                </button>
                <button onClick={() => { setStage(0); setTubeProgress(0); }}
                  className="min-h-11 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300">
                  ↺ new flower
                </button>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">the two gates (live status)</p>
                <p className={`text-xs font-bold ${stigmasPollinated > 0 ? 'text-emerald-300' : 'text-slate-500'}`}>
                  gate 1 — pollination: {stigmasPollinated > 0 ? `${pollenLanded} grains landed on ${stigmasPollinated} stigma(s)` : 'no pollen delivered yet'}
                </p>
                <p className={`text-xs font-bold ${stage >= 2 ? 'text-emerald-300' : 'text-slate-500'}`}>
                  gate 2 — fertilisation: {stage >= 2 ? `${ovulesFertilised} ovule(s) fused → seeds locked in` : 'waiting for tubes to reach the ovary'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-amber-900/50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2">What to try</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              ① Set pollen = 40, ovules = 6, run all three stages: fertilised stops at min(germinated,
              6). Now cut pollen to 20 and set the agent to wind: landed collapses — delivery, not
              desire, limits seeds.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
              ② Self mode with pollinators = 0 still manages a little landing (stigmas are millimetres
              from anthers) — that is self-pollination&apos;s survival trick. Cross mode with 0
              pollinators is sterile: no courier, no babies.
            </p>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: ASEXUAL LAB                                           */}
      {/* ============================================================ */}
      {tab === 'asexual' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {([['budding', 'yeast — budding'], ['fragmentation', 'spirogyra — fragmentation'], ['spores', 'moss / fern — spores']] as const).map(([k, label]) => (
              <button key={k} onClick={() => setAMode(k)}
                className={`min-h-11 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${aMode === k ? 'bg-pink-600 border-pink-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                {label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {aMode === 'budding' && (
              <div>
                <label className="text-xs font-semibold text-slate-400 flex justify-between">
                  <span>starting cells</span>
                  <span className="font-mono text-pink-300">{parentCells}</span>
                </label>
                <input type="range" min={1} max={10} step={1} value={parentCells} aria-label="starting cells"
                  onChange={(e) => setParentCells(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-pink-500" />
              </div>
            )}
            {aMode === 'fragmentation' && (
              <div>
                <label className="text-xs font-semibold text-slate-400 flex justify-between">
                  <span>fragments cut</span>
                  <span className="font-mono text-pink-300">{fragments}</span>
                </label>
                <input type="range" min={2} max={12} step={1} value={fragments} aria-label="fragments"
                  onChange={(e) => setFragments(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-pink-500" />
              </div>
            )}
            {aMode === 'spores' && (
              <div>
                <label className="text-xs font-semibold text-slate-400 flex justify-between">
                  <span>spores per capsule</span>
                  <span className="font-mono text-pink-300">{sporesPer}</span>
                </label>
                <input type="range" min={10} max={200} step={10} value={sporesPer} aria-label="spores per capsule"
                  onChange={(e) => setSporesPer(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-pink-500" />
              </div>
            )}
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>{aMode === 'spores' ? 'capsules opened' : 'generations / rounds'}</span>
                <span className="font-mono text-pink-300">{generations}</span>
              </label>
              <input type="range" min={1} max={10} step={1} value={generations} aria-label="generations"
                onChange={(e) => setGenerations(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-pink-500" />
            </div>
            <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">offspring total</p>
              <p className="font-mono text-2xl font-black text-pink-300">{asexualCount.toLocaleString('en-IN')}</p>
              <p className="text-[10px] text-slate-500">parents involved: exactly ONE</p>
            </div>
          </div>

          {/* growth bars */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3">
            <svg viewBox="0 0 620 220" className="w-full h-48 md:h-56" preserveAspectRatio="xMidYMid meet">
              {(() => {
                const N = Math.min(generations, 10);
                const counts = Array.from({ length: N }, (_, i) => {
                  const g = i + 1;
                  if (aMode === 'budding') return parentCells * Math.pow(2, g);
                  if (aMode === 'fragmentation') return fragments * Math.pow(2, Math.min(g, 6));
                  return sporesPer * Math.min(g, 20);
                });
                const maxC = Math.max(...counts, 1);
                return counts.map((c, i) => {
                  const h = (c / maxC) * 160;
                  return (
                    <g key={i}>
                      <rect x={40 + i * 56} y={190 - h} width={38} height={Math.max(2, h)} rx={5}
                        fill={i === N - 1 ? '#ec4899' : '#7c3aed'} fillOpacity={0.85}
                        style={{ transition: 'all 150ms ease-out' }} />
                      <text x={40 + i * 56 + 19} y={186 - h} fontSize={10} fill="#e9d5ff" textAnchor="middle" fontFamily="monospace">{c}</text>
                      <text x={40 + i * 56 + 19} y={206} fontSize={10} fill="#64748b" textAnchor="middle">g{i + 1}</text>
                    </g>
                  );
                });
              })()}
              <line x1={30} y1={190} x2={600} y2={190} stroke="#475569" strokeWidth={1.5} />
            </svg>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            <p className="text-xs text-slate-300 leading-relaxed">
              {aMode === 'budding' && 'Yeast: a bud bulges off the parent cell, nucleus splits, bud pinches off as a CLONE. Population doubles per round — the bar chart is exponential.'}
              {aMode === 'fragmentation' && 'Spirogyra: cut the filament into pieces and EACH fragment regrows into a full alga — every piece is a clone of the one parent plant.'}
              {aMode === 'spores' && 'Moss and ferns make tiny light spores in capsules; each spore grows into a new plant. Spores are clones dispersed by wind — huge numbers, tiny odds.'}
            </p>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-amber-900/50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2">What to try</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              ① Budding from 1 cell: read g1…g10 = 2, 4, 8 … 1024. Doubling is why bread rises
              overnight and why one infected cell becomes a colony by morning.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
              ② Compare: Flower Lab cross-pollination says variation YES; here every counter says
              CLONE. That single contrast is the exam&apos;s favourite &quot;advantage of sexual
              reproduction&quot; question.
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
                  tierFilter === t ? 'bg-pink-600 border-pink-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
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
                    let cls = 'border-slate-700 bg-slate-900 hover:border-pink-600';
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
              <p className="text-xs font-bold text-pink-300 uppercase tracking-wider mb-2">The chain (all live in this sim)</p>
              <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
                <li>pollen (anther) → stigma = POLLINATION (needs wind / water / insects)</li>
                <li>pollen → tube down the style → ovary</li>
                <li>gametes fuse = FERTILISATION (one per ovule)</li>
                <li>ovule → seed · ovary → fruit · petals fall</li>
                <li>asexual: one parent, no gametes, clones (budding / fragmentation / spores)</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
              <p className="text-xs font-bold text-pink-300 uppercase tracking-wider mb-2">Honest-numerics notes</p>
              <ul className="text-xs text-slate-400 space-y-1.5 leading-relaxed">
                <li>• Seeds = min(pollen that reached ovules, ovules available) — the counter physically cannot exceed the ovule slider.</li>
                <li>• Pollination efficiency factors (wind wastes ~65 %) reflect the real wind-vs-insect delivery trade-off as a teaching model; the ORDERING is the biology.</li>
                <li>• Fruit set is tracked per stigma in the patch — a flower the agent never visits makes no fruit, honestly.</li>
                <li>• Budding growth is exact doubling: 2^g, integer arithmetic, no rounding.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Where this chapter goes next</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              The two-gate logic (transfer, then fusion) is the same story in Class 8&apos;s
              reproduction in animals and Class 10&apos;s flowering-plants chapter — with the pollen
              tube spelled out to the embryo sac. Variation from cross-pollination is your first
              meeting with genetics&apos; central idea: mixing genes is a species-level survival
              strategy, and agriculture exploits it on every seed packet.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default C7_ScienceReproductionInPlantsSim;
