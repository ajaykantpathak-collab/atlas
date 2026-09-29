'use client';
/**
 * C7_SciencePhysicalChemicalChangesSim (Class 7 Science)
 *
 * ONE chapter: Physical and Chemical Changes (NCERT VII).
 * The chapter's ONE test, applied honestly everywhere:
 *   a NEW SUBSTANCE with new properties formed?  -> chemical change
 *   only shape / state / size rearranged?        -> physical change
 * Every number is a model shown AS a model:
 *   • Rusting: rate ∝ moisture × oxygen × salt factor; the nail GAINS
 *     mass because oxygen atoms join the iron (Fe → Fe₂O₃·xH₂O) —
 *     chemistry says heavier, and the balance panel shows it.
 *   • Sorting bench: 10 processes with the real verdict and the real
 *     evidence, checked instantly.
 *
 * Deep layout (5 tabs):
 *   1. Predict   -- classic trap cases, guess first
 *   2. Rust Lab  -- condition sliders + live balance + colour
 *   3. Sort Bench -- drag-free sorting game with evidence cards
 *   4. Challenge -- 9 questions in 3 tiers with hints
 *   5. Truths    -- misconception killer + honest summary
 */
import React, { useMemo, useState } from 'react';

type TabKey = 'predict' | 'rust' | 'sort' | 'challenge' | 'truths';

const TABS: { id: TabKey; label: string; emoji: string }[] = [
  { id: 'predict', label: '1 · Predict', emoji: '❓' },
  { id: 'rust', label: '2 · Rust Lab', emoji: '🔗' },
  { id: 'sort', label: '3 · Sort Bench', emoji: '🃏' },
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
    skill: 'The one test',
    question: 'The DEFINING sign of a chemical change is:',
    options: [
      'the substance gets hot',
      'a NEW substance with different properties is formed',
      'the colour changes in any way',
      'the material changes shape',
    ],
    correctIndex: 1,
    explanation:
      'Only "new substance formed" defines a chemical change. Heat or colour alone can appear in physical changes too (glowing filament, dissolving a coloured salt) — the Rust Lab and Sort Bench test every case with this single question.',
    hints: ['Which option talks about identity, not appearance?', 'Melting ice changes state but not identity.', 'A new substance with new properties.'],
  },
  {
    id: 'ch_02',
    tier: 'foundation',
    skill: 'Rusting needs',
    question: 'Iron rusts only when it is exposed to:',
    options: ['water alone', 'air alone', 'BOTH air (oxygen) and moisture together', 'sunlight'],
    correctIndex: 2,
    explanation:
      'Rusting is iron + oxygen + water forming hydrated iron oxide. The Rust Lab proves it: slide moisture to 0 with full air — no rust; slide air to 0 with full water — no rust. Only both together turns the nail orange.',
    hints: ['Try each condition alone in the Rust Lab.', 'A dry nail in open air stays bright; a nail under boiled water with an oil seal stays bright.', 'Both together.'],
  },
  {
    id: 'ch_03',
    tier: 'foundation',
    skill: 'Sort the easy one',
    question: 'Melting of ice into water is a physical change because:',
    options: [
      'it absorbs heat',
      'it is quick',
      'it is only a change of STATE — the substance stays H₂O and freezing reverses it',
      'water is a new chemical',
    ],
    correctIndex: 2,
    explanation:
      'H₂O molecules before, H₂O molecules after — only arrangement and state changed, and cooling reverses it exactly. State changes (melting, boiling, freezing, condensation) are the physical family.',
    hints: ['What is the chemical identity of ice and water?', 'Same molecules, new arrangement.', 'Change of state only.'],
  },
  {
    id: 'ch_04',
    tier: 'standard',
    skill: 'The filament trap',
    question: 'A glowing electric bulb filament (white hot, ~2500 °C) shows light. This is classified as:',
    options: [
      'a chemical change — the filament burns',
      'a physical change — the tungsten only gets hot and glows; switch it off and it is the same tungsten (a real filament does slowly evaporate, but glowing itself creates no new substance)',
      'rusting of tungsten',
      'no change at all — glowing is an illusion',
    ],
    correctIndex: 1,
    explanation:
      'The glow is temperature, not chemistry: no new substance forms while it glows. (NCERT\'s classic point: the glowing bulb is a physical change, unlike burning magnesium, whose white ash MgO is a NEW substance.)',
    hints: ['Is anything new formed while it glows?', 'Compare with burning magnesium ribbon in the Sort Bench.', 'Physical — only the temperature changed.'],
  },
  {
    id: 'ch_05',
    tier: 'standard',
    skill: 'Dissolving salt',
    question: 'Salt dissolved in water is best classified as:',
    options: [
      'a chemical change — salt disappears',
      'a physical change — evaporate the water and the SAME salt is back',
      'a chemical change — the water becomes salty forever',
      'not a change at all',
    ],
    correctIndex: 1,
    explanation:
      'Dissolving mixes; it does not transform. Evaporation recovers the original salt — proof that no new substance formed. (NCERT adds a nuance: some scientists call acid-on-metal, which bubbles gas, chemical even though you might recover part of it — the deciding evidence is a NEW substance, here hydrogen gas.)',
    hints: ['Can you get the salt back unchanged?', 'What does evaporation of the solution give?', 'Physical — recovery is possible.'],
  },
  {
    id: 'ch_06',
    tier: 'standard',
    skill: 'Mass on the balance',
    question: 'An iron nail left to rust completely on a closed pan is weighed. Compared to the shiny nail, it weighs:',
    options: ['less — rust flakes fall off', 'the same — mass is always conserved', 'MORE — oxygen from the air has joined the iron as oxide', 'it cannot be weighed'],
    correctIndex: 2,
    explanation:
      'Rust is iron PLUS oxygen (and water of hydration): atoms were ADDED from the air, so the mass increases. The Rust Lab balance shows the gain live — "rust is heavier than the iron it ate" is real chemistry, not a trick.',
    hints: ['What does rust contain besides iron?', 'Where did that extra stuff come from?', 'More — oxygen joined the iron.'],
  },
  {
    id: 'ch_07',
    tier: 'advanced',
    skill: 'Ship protection',
    question: 'Ships and gates are painted, and iron sheets are galvanised (zinc-coated). Both tricks work because they:',
    options: [
      'make the iron stronger',
      'keep air and moisture from touching the iron — removing rusting\'s two raw materials',
      'feed the iron with nutrients',
      'change iron into another metal permanently',
    ],
    correctIndex: 1,
    explanation:
      'Rusting needs oxygen + moisture ON THE IRON SURFACE. Paint and zinc coating physically block both (zinc even sacrifices itself first). Set moisture and oxygen to zero in the Rust Lab — that IS the painted gate, and rust stops.',
    hints: ['Return to the two raw materials from ch_02.', 'What does a coat physically do?', 'Blocks air and moisture.'],
  },
  {
    id: 'ch_08',
    tier: 'advanced',
    skill: 'Reversibility trap',
    question: 'Which pair is sorted correctly by reversibility reasoning?',
    options: [
      'burning paper (irreversible, chemical) and freezing juice (reversible, physical)',
      'burning paper (reversible, physical) and freezing juice (irreversible, chemical)',
      'both are chemical because both change appearance',
      'both are physical because both are everyday events',
    ],
    correctIndex: 0,
    explanation:
      'Burning paper makes ash, CO₂ and smoke — new substances, no un-burning (chemical, irreversible in practice). Freezing juice only rearranges water molecules; thawing restores it (physical, reversible). Caution: reversibility is a useful CLUE, not the definition — new substance is the judge.',
    hints: ['Which process makes new substances?', 'Can you un-burn paper? Can you un-freeze juice?', 'Burning = chemical; freezing = physical.'],
  },
  {
    id: 'ch_09',
    tier: 'advanced',
    skill: 'Synthesis',
    question: 'Souring of milk and curdling of milk both spoil the milk for tea. The scientific classification is:',
    options: [
      'physical — the milk is still milk',
      'chemical — bacteria convert milk sugar into lactic acid; a NEW substance with a new taste forms',
      'physical — only the smell changed',
      'chemical only if the curd is green',
    ],
    correctIndex: 1,
    explanation:
      'Bacteria chemically convert lactose to lactic acid (and proteins curdle): new substances, new properties — taste that no amount of stirring reverses. The Sort Bench grades it chemical, exactly like the board exam does.',
    hints: ['What did the bacteria make inside the milk?', 'Lactic acid is a different compound from lactose.', 'Chemical — new substance formed.'],
  },
];

const MISCONCEPTIONS: { misconception: string; correction: string }[] = [
  {
    misconception: 'If it is reversible, it must be physical; if irreversible, chemical.',
    correction:
      'Reversibility is a CLUE, not the definition. The definition is: did a NEW substance form? (Some chemical processes can be run backwards industrially; some physical ones, like cracking an egg, you cannot undo.) Always ask the identity question first.',
  },
  {
    misconception: 'Dissolving salt or sugar is a chemical change because the solid "disappears".',
    correction:
      'Disappearing is not transforming: evaporate the water and the same salt crystallises back. The molecules were only separated and surrounded by water — a physical mixing, fully recoverable.',
  },
  {
    misconception: 'The glowing bulb filament is burning (a chemical change).',
    correction:
      'Glowing is white-HOT tungsten, not burning — no new substance forms while it shines. Burning MAGNESIUM ribbon, by contrast, converts metal into white MgO ash: a genuinely new substance. Same white light, opposite verdicts — the Sort Bench pairs them.',
  },
  {
    misconception: 'Rusting just makes the iron look old; the metal amount is the same.',
    correction:
      'Rust is hydrated iron oxide — iron atoms PLUS oxygen (and water) captured from the air. A fully rusted nail weighs MORE than the shiny one and its iron is chemically bound into a flaky new substance. The Rust Lab balance shows the grams climbing.',
  },
  {
    misconception: 'Cutting paper, tearing cloth or breaking glass are chemical changes.',
    correction:
      'Shape and size changed; the substance is still paper, cloth, glass. Only the geometry moved. If you can name the material before and after and it is the same material, it is physical.',
  },
];

const SORT_CARDS: { id: string; label: string; chemical: boolean; evidence: string }[] = [
  { id: 'ice', label: 'ice melting to water', chemical: false, evidence: 'same H₂O, only state changed — freezing reverses it' },
  { id: 'paper', label: 'paper burning', chemical: true, evidence: 'ash + CO₂ + smoke: new substances, no un-burning' },
  { id: 'salt', label: 'salt dissolving in water', chemical: false, evidence: 'evaporation recovers the same salt — only mixed' },
  { id: 'rust', label: 'iron nail rusting', chemical: true, evidence: 'hydrated iron oxide forms — a new substance (heavier!)' },
  { id: 'bulb', label: 'bulb filament glowing', chemical: false, evidence: 'hot tungsten glows; switch off — same tungsten' },
  { id: 'milk', label: 'milk souring', chemical: true, evidence: 'lactose → lactic acid by bacteria: new taste, new substance' },
  { id: 'cut', label: 'cutting paper into strips', chemical: false, evidence: 'still paper — only shape and size changed' },
  { id: 'mg', label: 'burning magnesium ribbon', chemical: true, evidence: 'dazzling white MgO ash forms — brand new compound' },
  { id: 'boil', label: 'boiling water to steam', chemical: false, evidence: 'same H₂O as gas — condense it back' },
  { id: 'curd', label: 'milk curdling into curd', chemical: true, evidence: 'proteins set into a new solid; stirring never un-curdles it' },
];

// ─── main component ───

export function C7_SciencePhysicalChemicalChangesSim() {
  const [tab, setTab] = useState<TabKey>('predict');

  // rust lab state
  const [moisture, setMoisture] = useState(60); // %
  const [oxygen, setOxygen] = useState(80); // %
  const [salty, setSalty] = useState(false);
  const [days, setDays] = useState(10);
  const [nailMass, setNailMass] = useState(5.0); // g

  // sort bench state
  const [buckets, setBuckets] = useState<Record<string, 'physical' | 'chemical'>>({});
  const [checked, setChecked] = useState(false);

  // predict/challenge/truths
  const [predicted, setPredicted] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [hintLevel, setHintLevel] = useState<Record<string, number>>({});
  const [tierFilter, setTierFilter] = useState<'all' | Challenge['tier']>('all');
  const [openMisc, setOpenMisc] = useState<number | null>(null);

  // ── rust numerics (relative model, shown as a model) ──
  // rate index: fraction of surface converted
  const rate = (moisture / 100) * (oxygen / 100) * (salty ? 1.8 : 1);
  const rustPct = Math.min(100, rate * days * 4.2);
  // mass gain: oxygen atoms join; full conversion adds ~44% of Fe mass (Fe2O3 vs 2Fe: 48/112)
  const massGain = (rustPct / 100) * nailMass * (48 / 112) * 0.8;
  const currentMass = nailMass + massGain;
  // nail colour interpolation grey -> orange-brown
  const rustColor = `rgb(${Math.round(148 + rustPct * 0.78)}, ${Math.round(163 - rustPct * 0.85)}, ${Math.round(184 - rustPct * 1.35)})`;

  const sortScore = useMemo(() => {
    let right = 0;
    SORT_CARDS.forEach((c) => {
      if (buckets[c.id] === (c.chemical ? 'chemical' : 'physical')) right += 1;
    });
    return { right, total: SORT_CARDS.length };
  }, [buckets]);

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
    setMoisture(60);
    setOxygen(80);
    setSalty(false);
    setDays(10);
    setNailMass(5.0);
    setBuckets({});
    setChecked(false);
    setPredicted(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 rounded-3xl border border-slate-800 font-sans text-slate-100 shadow-2xl">
      {/* header */}
      <div className="flex flex-wrap items-center gap-3 pb-3 mb-3 border-b border-slate-800">
        <span className="text-3xl p-2 bg-orange-950/80 rounded-2xl border border-orange-700">🔗</span>
        <div className="flex-1 min-w-[220px]">
          <p className="text-xs font-bold uppercase tracking-wider text-orange-400">Class 7 Science — Physical and Chemical Changes</p>
          <h1 className="text-xl md:text-2xl font-black text-orange-300">New Substance? The One Question That Decides</h1>
        </div>
        <div className="text-right">
          <span className="font-mono text-xs text-slate-400 block">chemical ⇢ new substance forms</span>
          <span className="font-mono text-xs text-slate-500 block">physical ⇢ same substance, new arrangement</span>
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
                ? 'bg-orange-600 border-orange-500 text-white shadow-lg shadow-orange-900/40'
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
          <div className="p-5 bg-slate-900/70 rounded-2xl border border-orange-900/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-orange-400 mb-2">Predict before you play</p>
            <p className="text-sm text-slate-200 leading-relaxed">
              Two nails are weighed, then nail A rusts completely on a sealed pan while nail B stays
              shiny in a vacuum jar. Which one weighs more at the end?
            </p>
            <div className="mt-3 space-y-2">
              {[
                'Both exactly the same — matter never changes',
                'Nail A (rusted) — it captured oxygen from the air into new iron oxide',
                'Nail B — rust flakes blew away',
                'Neither can be weighed after a week',
              ].map((opt, i) => {
                const chosen = predicted === i;
                const isCorrect = i === 1;
                let cls = 'border-slate-700 bg-slate-900 hover:border-orange-600';
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
                Rust = iron + oxygen (+ water): atoms JOIN the nail, so the pan weighs more. Watch the
                Rust Lab balance climb as the orange spreads — chemistry you can weigh.
                <button onClick={() => setTab('rust')} className="ml-2 underline font-bold text-amber-300">Open Rust Lab →</button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { t: 'Walk 1: starve the rust', d: 'Set moisture = 0 (dry air) — no rust in 30 days. Then oxygen = 0 (boiled, oil-sealed water) — still none. Both gates must open.' },
              { t: 'Walk 2: the sea cheat', d: 'Same moisture and air, toggle salt ON: the orange races ahead — salt is a catalyst-like speed-up, not a raw material.' },
              { t: 'Walk 3: judge ten cases', d: 'Sort Bench: grade all 10 cards, press Check. Every verdict comes with the ONE piece of evidence that decides it.' },
            ].map((s, i) => (
              <div key={i} className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
                <p className="text-xs font-bold text-slate-200 mb-1">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-[10px] font-black mr-1.5">{i + 1}</span>
                  {s.t}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: RUST LAB                                              */}
      {/* ============================================================ */}
      {tab === 'rust' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>moisture</span>
                <span className="font-mono text-orange-300">{moisture} %</span>
              </label>
              <input type="range" min={0} max={100} step={5} value={moisture} aria-label="moisture"
                onChange={(e) => setMoisture(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-orange-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>oxygen exposure</span>
                <span className="font-mono text-orange-300">{oxygen} %</span>
              </label>
              <input type="range" min={0} max={100} step={5} value={oxygen} aria-label="oxygen exposure"
                onChange={(e) => setOxygen(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-orange-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>days exposed</span>
                <span className="font-mono text-orange-300">{days}</span>
              </label>
              <input type="range" min={0} max={30} step={1} value={days} aria-label="days"
                onChange={(e) => setDays(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-orange-500" />
            </div>
            <div className="flex items-end">
              <button onClick={() => setSalty(!salty)} className={`min-h-11 w-full px-3 py-2 rounded-xl text-xs font-bold border transition-all ${salty ? 'bg-orange-600 border-orange-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                salty spray: {salty ? 'ON (×1.8 rate)' : 'off'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* nail SVG */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3">
              <svg viewBox="0 0 320 160" className="w-full h-40 md:h-48" preserveAspectRatio="xMidYMid meet">
                {/* water/air backdrop hint */}
                <rect x={10} y={10} width={300} height={140} rx={10} fill="#0b1220" stroke="#1e293b" />
                <text x={24} y={30} fontSize={10} fill={moisture > 20 ? '#38bdf8' : '#64748b'}>moisture {moisture}%</text>
                <text x={24} y={44} fontSize={10} fill={oxygen > 20 ? '#94a3b8' : '#475569'}>air (O₂) {oxygen}%</text>
                {/* the nail */}
                <g>
                  <rect x={90} y={70} width={150} height={16} rx={8} fill={rustColor} style={{ transition: 'fill 250ms ease' }} />
                  <polygon points="90,62 90,94 62,78" fill={rustColor} style={{ transition: 'fill 250ms ease' }} />
                </g>
                {/* rust flakes */}
                {rustPct > 25 && Array.from({ length: Math.round(rustPct / 12) }, (_, i) => (
                  <circle key={i} cx={100 + ((i * 41) % 150)} cy={68 + ((i * 29) % 26)} r={2 + (i % 3)}
                    fill="#c2410c" opacity={0.8} />
                ))}
                <text x={160} y={128} fontSize={11} fill="#e2e8f0" textAnchor="middle" fontFamily="monospace">
                  rust coverage {rustPct.toFixed(0)} % · {(salty ? 'salty' : 'fresh')} conditions
                </text>
                <text x={160} y={144} fontSize={10} fill="#fb923c" textAnchor="middle" fontFamily="monospace">
                  Fe + O₂ + H₂O → Fe₂O₃·xH₂O (a NEW substance)
                </text>
              </svg>
            </div>

            {/* balance + verdict panel */}
            <div className="space-y-2">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2">the balance (mass is a chemistry clue)</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[11px] text-slate-400">shiny nail</p>
                    <p className="font-mono text-xl font-bold text-slate-200">{nailMass.toFixed(2)} g</p>
                  </div>
                  <span className="text-2xl">⚖️</span>
                  <div>
                    <p className="text-[11px] text-slate-400">after {days} days</p>
                    <p className={`font-mono text-xl font-bold ${massGain > 0.01 ? 'text-orange-300' : 'text-slate-200'}`}>{currentMass.toFixed(2)} g</p>
                  </div>
                </div>
                <p className={`mt-1 text-xs font-bold ${massGain > 0.01 ? 'text-orange-300' : 'text-slate-500'}`}>
                  {massGain > 0.01 ? `+${massGain.toFixed(2)} g — oxygen JOINED the iron` : 'no rust → no mass change'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { k: 'rust coverage', v: `${rustPct.toFixed(0)} %` },
                  { k: 'change type', v: rustPct > 0.5 ? 'CHEMICAL (new substance)' : 'no change yet' },
                  { k: 'raw materials present', v: `${oxygen > 5 ? 'O₂ ✓' : 'O₂ ✗'} · ${moisture > 5 ? 'H₂O ✓' : 'H₂O ✗'}` },
                  { k: 'reversible by un-rusting?', v: rustPct > 0.5 ? 'no practical way' : '—' },
                ].map((x) => (
                  <div key={x.k} className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{x.k}</p>
                    <p className={`font-mono text-sm font-bold ${x.k === 'change type' && rustPct > 0.5 ? 'text-rose-300' : 'text-orange-300'}`}>{x.v}</p>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">protect the nail (engineering)</p>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => { setOxygen(0); }} className="min-h-11 px-3 py-2 rounded-xl text-[11px] font-bold border bg-slate-800 border-slate-700 text-slate-300">oil it (blocks air)</button>
                  <button onClick={() => { setMoisture(0); }} className="min-h-11 px-3 py-2 rounded-xl text-[11px] font-bold border bg-slate-800 border-slate-700 text-slate-300">keep it dry (blocks water)</button>
                  <button onClick={() => { setOxygen(0); setMoisture(0); setSalty(false); }} className="min-h-11 px-3 py-2 rounded-xl text-[11px] font-bold border bg-emerald-800 border-emerald-700 text-emerald-200">paint it (blocks both)</button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-amber-900/50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2">What to try</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              ① Set moisture = 100, oxygen = 100, days = 30: coverage 100 % and the balance shows
              about +1.7 g on a 5 g nail — captured air. That extra weight IS the chemical change,
              made visible.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
              ② Now moisture = 100, oxygen = 100, but press &quot;paint it&quot;: both raw materials
              drop to zero and the nail stops aging. Every anti-rust trick in the world is this
              slider move.
            </p>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: SORT BENCH                                            */}
      {/* ============================================================ */}
      {tab === 'sort' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-400 leading-relaxed">
            Grade all 10 everyday changes, then press Check. The evidence line under each card is the
            reason — memorise the REASON, not the answer.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {SORT_CARDS.map((c) => {
              const chosen = buckets[c.id];
              const isChemical = c.chemical;
              let cardCls = 'border-slate-800 bg-slate-900/70';
              if (checked && chosen) {
                cardCls = chosen === (isChemical ? 'chemical' : 'physical') ? 'border-emerald-700 bg-emerald-950/30' : 'border-rose-700 bg-rose-950/30';
              }
              return (
                <div key={c.id} className={`p-3 rounded-xl border ${cardCls}`}>
                  <p className="text-xs font-bold text-slate-200 mb-2">{c.label}</p>
                  <div className="flex gap-2">
                    {(['physical', 'chemical'] as const).map((g) => (
                      <button key={g} onClick={() => !checked && setBuckets((b) => ({ ...b, [c.id]: g }))}
                        className={`flex-1 min-h-11 rounded-lg text-[11px] font-bold border transition-all ${
                          chosen === g
                            ? g === 'chemical' ? 'bg-rose-600 border-rose-500 text-white' : 'bg-gold-600 border-gold-500 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600'
                        }`}>
                        {g}
                      </button>
                    ))}
                  </div>
                  {checked && chosen && (
                    <p className={`mt-2 text-[11px] leading-relaxed ${chosen === (isChemical ? 'chemical' : 'physical') ? 'text-emerald-300' : 'text-rose-300'}`}>
                      {chosen === (isChemical ? 'chemical' : 'physical') ? '✓ ' : '✗ actually '}{c.evidence}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setChecked(true)} className="min-h-11 px-4 py-2 rounded-xl bg-orange-600 border border-orange-500 text-xs font-bold text-white transition-all">
              check my bench ({Object.keys(buckets).length}/{SORT_CARDS.length} graded)
            </button>
            <button onClick={() => { setBuckets({}); setChecked(false); }} className="min-h-11 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300">
              clear bench
            </button>
            {checked && (
              <span className={`ml-auto font-mono text-sm font-bold ${sortScore.right === sortScore.total ? 'text-emerald-300' : 'text-amber-300'}`}>
                {sortScore.right}/{sortScore.total} correct
              </span>
            )}
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-amber-900/50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2">What to try</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              ① Grade &quot;bulb filament glowing&quot; and &quot;burning magnesium ribbon&quot; back
              to back: both blaze white — one physical, one chemical. The evidence lines show why
              light proves nothing by itself.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
              ② Grade &quot;cutting paper&quot; then &quot;burning paper&quot;: same starting sheet,
              opposite verdicts. Shape is geometry; ash is chemistry.
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
                  tierFilter === t ? 'bg-orange-600 border-orange-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
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
                    let cls = 'border-slate-700 bg-slate-900 hover:border-orange-600';
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
              <p className="text-xs font-bold text-orange-300 uppercase tracking-wider mb-2">Decision chart (used live in this sim)</p>
              <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
                <li>1. Is the substance before and after the SAME material? → physical (state/shape/size only)</li>
                <li>2. Is a NEW substance with NEW properties formed? → chemical (rust, ash, curd, MgO)</li>
                <li>Clues that support chemical: permanent colour change, gas bubbles, precipitate, heat/light from the substance itself, mass change from captured atoms.</li>
                <li>Clues that are NOT proof: hotness alone, light alone, dissolving, shape change.</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
              <p className="text-xs font-bold text-orange-300 uppercase tracking-wider mb-2">Honest-numerics notes</p>
              <ul className="text-xs text-slate-400 space-y-1.5 leading-relaxed">
                <li>• The rust numbers are a TEACHING MODEL (rate ∝ moisture × oxygen × salt) — the qualitative laws are real: both raw materials required, salt accelerates, mass increases.</li>
                <li>• The mass-gain figure uses true stoichiometry proportions: Fe₂O₃ carries 48 mass units of oxygen per 112 of iron — the balance gain is the chemistry, not decoration.</li>
                <li>• Every sort-bench verdict ships with its evidence; nothing is graded by vibes.</li>
                <li>• Real rusting kinetics depend on temperature, surface and impurities — a classroom lab measures, this sim reasons.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Where this chapter goes next</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              The new-substance test grows into full chemical reactions: Class 8 chemical formulas and
              Class 10&apos;s Chemical Reactions and Equations (with its own chapter sim here) reuse
              today&apos;s evidence list — gas, precipitate, colour, heat — as the official signs of
              reaction. Crystallisation, galvanisation and rancidity all stand on this chapter&apos;s
              legs.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default C7_SciencePhysicalChemicalChangesSim;
