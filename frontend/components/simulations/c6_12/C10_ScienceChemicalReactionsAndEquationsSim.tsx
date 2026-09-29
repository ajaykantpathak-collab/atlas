'use client';

import React, { useState } from 'react';

/**
 * Class 10 Science -- Chemical Reactions and Equations
 * Reaction-type explorer: pick a classic reaction, apply heat where needed,
 * and read the balanced equation plus the observations that prove a
 * chemical change happened. Self-contained: react + tailwind only.
 */

type RxnKey = 'combination' | 'decomposition' | 'displacement' | 'doubleDisp' | 'oxidation';

const REACTIONS: Record<RxnKey, {
  name: string;
  needsHeat: boolean;
  reactants: { f: string; c: string }[];
  products: { f: string; c: string }[];
  equation: string;
  observations: string[];
  energy: 'exothermic' | 'endothermic';
  note: string;
}> = {
  combination: {
    name: 'Combination (quicklime + water)',
    needsHeat: false,
    reactants: [{ f: 'CaO', c: 'white solid' }, { f: 'H2O', c: 'liquid' }],
    products: [{ f: 'Ca(OH)2', c: 'slaked lime' }],
    equation: 'CaO + H2O -> Ca(OH)2 + heat',
    observations: ['Hissing sound', 'Flask becomes hot (exothermic)', 'White solid crumbles to paste'],
    energy: 'exothermic',
    note: 'One product from two reactants. The heat released can cook eggs -- villagers slake lime this way.',
  },
  decomposition: {
    name: 'Thermal decomposition (ferrous sulfate)',
    needsHeat: true,
    reactants: [{ f: 'FeSO4.7H2O', c: 'green crystals' }],
    products: [{ f: 'Fe2O3', c: 'brown residue' }, { f: 'SO2', c: 'gas' }, { f: 'SO3', c: 'gas' }, { f: 'H2O', c: 'vapour' }],
    equation: '2 FeSO4 -> Fe2O3 + SO2 + SO3',
    observations: ['Green colour fades to brown', 'Smell of burning sulfur (SO2)', 'Water droplets on tube walls'],
    energy: 'endothermic',
    note: 'One reactant splits into several products; heat supplies the activation energy.',
  },
  displacement: {
    name: 'Displacement (iron nail in copper sulfate)',
    needsHeat: false,
    reactants: [{ f: 'Fe', c: 'grey nail' }, { f: 'CuSO4', c: 'blue solution' }],
    products: [{ f: 'FeSO4', c: 'pale green solution' }, { f: 'Cu', c: 'brown deposit' }],
    equation: 'Fe + CuSO4 -> FeSO4 + Cu',
    observations: ['Blue colour fades to pale green', 'Brown copper coats the nail'],
    energy: 'exothermic',
    note: 'Iron is more reactive, so it pushes copper out of its salt solution.',
  },
  doubleDisp: {
    name: 'Double displacement (barium chloride + sodium sulfate)',
    needsHeat: false,
    reactants: [{ f: 'BaCl2', c: 'solution' }, { f: 'Na2SO4', c: 'solution' }],
    products: [{ f: 'BaSO4', c: 'white precipitate' }, { f: 'NaCl', c: 'in solution' }],
    equation: 'BaCl2 + Na2SO4 -> BaSO4 (ppt) + 2 NaCl',
    observations: ['Instant milky-white precipitate', 'Precipitate does not dissolve in dilute acid'],
    energy: 'exothermic',
    note: 'Ions exchange partners; the insoluble BaSO4 drives the reaction (precipitation).',
  },
  oxidation: {
    name: 'Oxidation / redox (copper oxide + hydrogen)',
    needsHeat: true,
    reactants: [{ f: 'CuO', c: 'black solid' }, { f: 'H2', c: 'gas' }],
    products: [{ f: 'Cu', c: 'reddish-brown metal' }, { f: 'H2O', c: 'droplets' }],
    equation: 'CuO + H2 -> Cu + H2O',
    observations: ['Black CuO turns reddish-brown', 'Water droplets form in the cooler tube part'],
    energy: 'endothermic',
    note: 'CuO loses oxygen (is reduced); H2 gains oxygen (is oxidised). Both happen together -- redox.',
  },
};

// ─── Class 10 board-depth drill bank ───
// Targets uncovered board diagnostics for this chapter's nodes
// (see backend/its/competency/CLASS10_NODE_DEPTH.json). Static and deterministic.
interface DepthQuizItem {
  nodeId: string;
  q: string;
  options: string[];
  answer: number;
  why: string;
}

const DEPTH_QUIZ: DepthQuizItem[] = [
  {
    nodeId: 'c10_chem_cbse_01_001',
    q: 'Zinc granules + dilute hydrochloric acid give bubbles of gas. A student calls this a "physical change". Correct?',
    options: [
      'No -- a NEW substance (hydrogen gas) with new properties forms; new-substance formation is the test of a chemical change',
      'Yes -- bubbling is only a physical effect',
      'Yes -- because zinc stays zinc',
      'No -- because all gas evolution is combustion',
    ],
    answer: 0,
    why: 'Zn + 2HCl -> ZnCl2 + H2. Chemical change criteria: new substance, permanent change, change in mass/colour/energy. The burning-magnesium paradox: the white MgO ash WEIGHS MORE than the ribbon because oxygen from the air joins the product -- mass is conserved when you count all reactants.',
  },
  {
    nodeId: 'c10_chem_cbse_01_001',
    q: 'BaCl2 + Na2SO4 gives an instant white precipitate. Why does precipitate formation prove ions exchanged partners?',
    options: [
      'Ba2+ left chloride to pair with SO4 2- making insoluble BaSO4, while Na+ took Cl- -- the insoluble product drives the double displacement',
      'Barium metal replaced sodium metal',
      'The white solid was already present in one solution',
      'Chlorine gas escaped leaving the solid behind',
    ],
    answer: 0,
    why: 'Double displacement AB + CD -> AD + CB. Observable signs: precipitate, colour change, gas evolution, or temperature change. Kitchen version: vinegar + baking soda (gas, hiss), or soap on hard water (scum precipitate).',
  },
  {
    nodeId: 'c10_chem_cbse_01_002',
    q: 'A student writes CaCO3(s) -> CaO(s) + CO2(g) and claims it is balanced "because the formulas look right". What is the correct discipline?',
    options: [
      'Count atoms of each element on both sides: Ca 1=1, C 1=1, O 3 = 1+2 -- this equation passes; atom inventory (conservation of mass), not appearance, decides balance',
      'State symbols decide whether an equation is balanced',
      'Heat must appear as a reactant with a coefficient',
      'Every equation must be doubled before it counts as balanced',
    ],
    answer: 0,
    why: 'CaCO3 -> CaO + CO2 is genuinely balanced (O: 3 = 2 + 1). But the reasoning matters: Na + Cl2 -> NaCl looks fine too and is WRONG until you write 2Na + Cl2 -> 2NaCl. Always run the atom count.',
  },
  {
    nodeId: 'c10_chem_cbse_01_003',
    q: 'Which is a combination reaction with a correctly balanced equation?',
    options: [
      '2 H2 + O2 -> 2 H2O (two elements combine into one compound)',
      'CaCO3 -> CaO + CO2',
      'Fe + CuSO4 -> FeSO4 + Cu',
      'NaOH + HCl -> NaCl + H2O',
    ],
    answer: 0,
    why: 'Combination A + B -> AB: hydrogen burns in oxygen to give a single product, water. CaCO3 -> CaO + CO2 is decomposition; Fe + CuSO4 is displacement; NaOH + HCl is double displacement (neutralisation). Classroom demo: burn magnesium ribbon (2Mg + O2 -> 2MgO) -- a combination that is also oxidation.',
  },
  {
    nodeId: 'c10_chem_cbse_01_004',
    q: 'Silver chloride turns grey in sunlight while calcium carbonate needs constant heat to decompose. What is the energy difference?',
    options: [
      'AgCl undergoes PHOTOLYTIC decomposition (light supplies the energy); CaCO3 undergoes THERMAL decomposition (heat supplies it). Electrolysis is the third route -- electrical energy',
      'Both are thermal; sunlight is just hot',
      'AgCl decomposes because of oxygen in air',
      'CaCO3 decomposition is photosynthetic',
    ],
    answer: 0,
    why: '2AgCl -> 2Ag + Cl2 (light, used in photographic films); CaCO3 -> CaO + CO2 (heat, lime kiln); 2H2O -> 2H2 + O2 (electricity -- and the correct equation needs coefficients and is ENDOTHERMIC). Pattern check: metal carbonates give oxide + CO2; metal nitrates give oxide + NO2 + O2.',
  },
  {
    nodeId: 'c10_chem_cbse_01_005',
    q: 'Chlorine gas is bubbled through potassium iodide solution. What happens and why?',
    options: [
      'Cl2 displaces iodine: Cl2 + 2KI -> 2KCl + I2 -- chlorine is MORE reactive (higher in the reactivity series) than iodine',
      'Nothing -- chlorine cannot react with iodine salts',
      'Iodine displaces chlorine because iodine is a solid',
      'They form KCl and KI together',
    ],
    answer: 0,
    why: 'Displacement follows the reactivity series: K > Na > Ca > Mg > Al > Zn > Fe > ... > H > Cu > Hg > Ag > (I2 < Cl2 among halogens). This is why Mg + 2HCl -> MgCl2 + H2 works but Cu + HCl gives NO reaction -- copper is below hydrogen.',
  },
  {
    nodeId: 'c10_chem_cbse_01_006',
    q: 'Na2CO3 + CaCl2 -> CaCO3 + 2NaCl. 5.0 g of Na2CO3 (M = 106 g/mol) reacts with excess CaCl2. Mass of CaCO3 (M = 100 g/mol) precipitated?',
    options: ['About 4.7 g', 'About 5.0 g', 'About 9.4 g', 'About 2.4 g'],
    answer: 0,
    why: 'Moles Na2CO3 = 5.0/106 = 0.047 mol; 1:1 ratio gives 0.047 mol CaCO3 = 0.047 x 100 = 4.7 g. Excess CaCl2 means carbonate is fully consumed. Mole-ratio arithmetic on the balanced equation is the standard board calculation.',
  },
  {
    nodeId: 'c10_chem_cbse_01_006',
    q: 'A student writes HCl + NaOH -> NaCl + H2O and claims "this is a double displacement with no visible change, so nothing happened". Evaluate.',
    options: [
      'Neutralisation IS double displacement (ions exchange: H+ pairs with OH-); the observable outcome here is heat evolved (exothermic), not every double displacement makes a precipitate',
      'Correct -- no precipitate means no reaction',
      'It is a decomposition because water forms',
      'It is displacement because sodium pushes hydrogen',
    ],
    answer: 0,
    why: 'Three common double-displacement outcomes: precipitate (BaSO4), gas, or heat/neutralisation. Acid-base neutralisation is ion-exchange with energy release.',
  },
  {
    nodeId: 'c10_chem_cbse_01_007',
    q: '(i) 2Mg + O2 -> 2MgO and (ii) H2 + Cl2 -> 2HCl. In which does oxidation occur under the classical (oxygen/hydrogen) definition?',
    options: [
      'In (i): Mg GAINS oxygen so it is oxidised. In (ii) there is no oxygen at all, yet it is still redox under the modern (electron-transfer) definition: H loses electrons to Cl',
      'In both, because both burn',
      'In (ii) only, because chlorine is an oxide',
      'In neither -- oxidation needs water',
    ],
    answer: 0,
    why: 'Classical: oxidation = gain of oxygen (or loss of hydrogen); reduction = loss of oxygen. Modern: oxidation = loss of electrons, reduction = gain. H2 + Cl2 has no oxygen but H is oxidised (H -> H+ + e-) and Cl is reduced -- why we need the electron definition. In MnO2 + 4HCl -> MnCl2 + Cl2 + 2H2O, MnO2 is REDUCED (loses oxygen) so it is the oxidising agent, not the reducing agent -- the HCl is oxidised to Cl2.',
  },
  {
    nodeId: 'c10_chem_cbse_01_008',
    q: 'Zn + CuSO4 -> ZnSO4 + Cu. Write the electron transfer explicitly.',
    options: [
      'Zn -> Zn2+ + 2e- (oxidation, zinc is the reducing agent); Cu2+ + 2e- -> Cu (reduction, Cu2+ is the oxidising agent)',
      'Zn gains 2 electrons; Cu loses 2 electrons',
      'Both Zn and Cu lose electrons together',
      'Electrons move from Cu2+ to Zn',
    ],
    answer: 0,
    why: 'Half-reactions expose redox: oxidation half (Zn loses electrons) and reduction half (Cu2+ gains electrons). Oxidising agent = the species that GETS reduced (CuSO4); reducing agent = the species that GETS oxidised (Zn). Memory hook: OIL RIG -- Oxidation Is Loss, Reduction Is Gain of electrons.',
  },
  {
    nodeId: 'c10_chem_cbse_01_009',
    q: 'Define corrosion, give the formula of rust, and state the two conditions iron needs to rust.',
    options: [
      'Corrosion = slow eating-away of a metal by air/moisture; rust = Fe2O3.xH2O (hydrated iron(III) oxide); iron needs BOTH oxygen AND water',
      'Rust = FeO; only water is needed',
      'Rust = FeS; only dry air is needed',
      'Corrosion only happens to copper',
    ],
    answer: 0,
    why: 'Classic three-nail experiment: nail in (A) tap water -- rusts (has O2 + H2O); (B) boiled water + oil layer -- no rust (water but no dissolved O2); (C) dry air + anhydrous CaCl2 -- no rust (O2 but no moisture). BOTH are essential. Protection: galvanisation (zinc coat) still protects a SCRATCHED surface because zinc is more reactive and corrodes sacrificially first.',
  },
  {
    nodeId: 'c10_chem_cbse_01_009',
    q: 'Iron rusts brown, copper turns green, aluminium stays shiny. What are the products and why is aluminium different?',
    options: [
      'Copper forms basic copper carbonate (green patina); aluminium forms a thin, tight Al2O3 layer that STICKS and protects the metal beneath -- unlike flaky rust',
      'All three form the same oxide',
      'Aluminium cannot react with oxygen',
      'Copper turns green from paint',
    ],
    answer: 0,
    why: 'Corrosion products differ: rust (flaky, non-protective), copper patina (CuCO3/Cu(OH)2, green), aluminium oxide (self-sealing protective film). That is why aluminium utensils last despite aluminium being quite reactive.',
  },
  {
    nodeId: 'c10_chem_cbse_01_010',
    q: 'Butter left out develops a bad smell. What is the process, why do sunflower oils go rancid faster than ghee, and why is the chip packet flushed with nitrogen?',
    options: [
      'Rancidity = oxidation of fats by air oxygen; polyunsaturated oils have more C=C double bonds that oxygen attacks, so they spoil faster; nitrogen flushing removes the oxygen so oxidation cannot start',
      'Rancidity is bacterial digestion only; nitrogen feeds the butter',
      'Rancidity is reduction; nitrogen cools the packet',
      'Ghee is rancid already',
    ],
    answer: 0,
    why: 'Rancidity is slow OXIDATION. Defence stack: airtight packaging, nitrogen flushing (displaces O2), refrigeration (SLOWS but does not stop oxidation -- evaluate that claim as false), and antioxidants like BHA which are oxidised in place of the fat. Light accelerates the same oxidation -- keep oil in dark bottles.',
  },
];

function DepthDrill() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState({ right: 0, done: 0 });
  const item = DEPTH_QUIZ[idx];
  const answered = picked !== null;

  const pick = (i: number) => {
    if (answered) return;
    setPicked(i);
    setScore((s) => ({ right: s.right + (i === item.answer ? 1 : 0), done: s.done + 1 }));
  };

  return (
    <div className="bg-slate-900/80 rounded-2xl border border-amber-800/60 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Board-depth drill</p>
        <span className="text-[11px] font-mono text-slate-400">
          {idx + 1}/{DEPTH_QUIZ.length} -- {score.right}/{score.done} correct
        </span>
      </div>
      <p className="text-sm text-slate-200 leading-relaxed">{item.q}</p>
      <div className="space-y-1.5">
        {item.options.map((opt, i) => {
          const state = !answered
            ? 'bg-slate-800 hover:bg-slate-700 border-slate-700'
            : i === item.answer
              ? 'bg-emerald-900/70 border-emerald-500 text-emerald-100'
              : i === picked
                ? 'bg-rose-900/60 border-rose-600 text-rose-100'
                : 'bg-slate-800/40 border-slate-800 opacity-60';
          return (
            <button key={i} onClick={() => pick(i)} disabled={answered}
              className={`w-full text-left px-3 py-2 rounded-xl border text-xs leading-snug transition ${state}`}>
              <span className="font-bold mr-1.5">{'ABCD'[i]}.</span>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="text-xs leading-relaxed text-amber-200 bg-amber-950/40 border border-amber-800/50 rounded-xl px-3 py-2">
          <span className="font-bold">Misconception killed: </span>
          {item.why}
        </div>
      )}
      <div className="flex gap-2">
        <button onClick={() => { setIdx((i) => (i + 1) % DEPTH_QUIZ.length); setPicked(null); }}
          className="flex-1 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-slate-950 transition">
          Next question
        </button>
        <button onClick={() => { setIdx(0); setPicked(null); setScore({ right: 0, done: 0 }); }}
          className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-rose-900 transition">
          Reset
        </button>
      </div>
    </div>
  );
}

export function C10_ScienceChemicalReactionsAndEquationsSim() {
  const [key, setKey] = useState<RxnKey>('combination');
  const [heated, setHeated] = useState(false);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const rxn = REACTIONS[key];

  const run = () => {
    if (rxn.needsHeat && !heated) return;
    setRunning(true);
    setProgress(0);
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(iv);
          return 100;
        }
        return p + 4;
      });
    }, 60);
  };

  const done = progress >= 100;
  const temp = rxn.energy === 'exothermic' ? 22 + (progress / 100) * 26 : heated ? 100 - (progress / 100) * 78 : 22;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-orange-950/80 rounded-2xl border border-orange-700">🔥</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Class 10 -- Chemical Reactions and Equations</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Reaction Types and Their Evidence</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
          {/* test tube scene */}
          <div className="flex items-end justify-center gap-8 h-56">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Reactants</p>
              <div className="flex gap-2 justify-center">
                {rxn.reactants.map((r) => (
                  <div key={r.f} className="w-20 h-24 border-2 border-slate-600 rounded-b-2xl rounded-t-lg flex flex-col items-center justify-center overflow-hidden"
                    style={{ background: r.c.includes('blue') ? '#1d4ed855' : r.c.includes('green') ? '#16653455' : r.c.includes('black') ? '#0f0f0f' : 'rgba(255,255,255,0.06)' }}>
                    <span className="font-mono text-[11px] font-bold">{r.f}</span>
                    <span className="text-[8px] text-slate-400 text-center px-1">{r.c}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center">
              {/* flame / heat badge */}
              {(rxn.needsHeat || rxn.energy === 'exothermic') && (
                <div className={`text-2xl transition-opacity ${rxn.needsHeat ? (heated ? 'opacity-100' : 'opacity-20') : done ? 'opacity-100' : 'opacity-0'}`}>
                  {rxn.energy === 'exothermic' ? '🔥' : heated ? '🔥' : '🧊'}
                </div>
              )}
              <button onClick={run} disabled={rxn.needsHeat && !heated}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-500 disabled:bg-slate-800 disabled:text-slate-600 transition">
                {rxn.needsHeat && !heated ? 'Apply heat first' : 'Start reaction'}
              </button>
              <div className="w-40 h-2 bg-slate-800 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-100"
                  style={{ width: `${progress}%` }} />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">{done ? 'reaction complete' : running ? 'reacting...' : 'waiting'}</p>
            </div>

            <div className="text-center">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Products</p>
              <div className={`flex gap-2 justify-center transition-opacity duration-500 ${done ? 'opacity-100' : 'opacity-25'}`}>
                {rxn.products.map((p) => (
                  <div key={p.f} className="w-20 h-24 border-2 border-slate-600 rounded-b-2xl rounded-t-lg flex flex-col items-center justify-center overflow-hidden"
                    style={{ background: p.c.includes('brown') ? '#92400e88' : p.c.includes('green') ? '#16653455' : p.c.includes('reddish') ? '#b4530988' : 'rgba(255,255,255,0.06)' }}>
                    <span className="font-mono text-[11px] font-bold">{p.f}</span>
                    <span className="text-[8px] text-slate-400 text-center px-1">{p.c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 bg-slate-950 rounded-xl border border-gold-800/60 p-3 text-center">
            <p className="text-[10px] uppercase tracking-wider text-gold-400">Balanced equation</p>
            <p className={`font-mono font-bold text-lg transition-colors ${done ? 'text-emerald-300' : 'text-slate-500'}`}>
              {rxn.equation}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <select value={key} onChange={(e) => { setKey(e.target.value as RxnKey); setHeated(false); setRunning(false); setProgress(0); }}
              aria-label="pick reaction" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm">
              {(Object.keys(REACTIONS) as RxnKey[]).map((k) => (
                <option key={k} value={k}>{REACTIONS[k].name}</option>
              ))}
            </select>
            <button onClick={() => { setHeated((h) => !h); setProgress(0); setRunning(false); }}
              className={`w-full py-2 rounded-xl text-xs font-bold transition ${heated ? 'bg-red-600' : rxn.needsHeat ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-800 text-slate-600'}`}
              disabled={!rxn.needsHeat}>
              {rxn.needsHeat ? (heated ? 'Burner: ON' : 'Burner: OFF') : 'No heat needed'}
            </button>
            <div className="flex items-center gap-2 bg-slate-950 rounded-xl px-3 py-2">
              <span className="text-xs text-slate-400">Tube temperature</span>
              <span className={`ml-auto font-mono font-bold ${temp > 40 ? 'text-red-400' : temp < 30 ? 'text-gold-300' : 'text-amber-300'}`}>
                {temp.toFixed(0)} deg C
              </span>
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase ${rxn.energy === 'exothermic' ? 'bg-red-950 text-red-300 border border-red-700' : 'bg-gold-950 text-gold-300 border border-gold-700'}`}>
              {rxn.energy}
            </span>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Observations that prove a chemical change</p>
            <ul className="space-y-1 text-xs">
              {rxn.observations.map((o) => (
                <li key={o} className={`flex gap-2 ${done ? 'text-slate-300' : 'text-slate-600'}`}>
                  <span className={done ? 'text-emerald-400' : 'text-slate-700'}>{done ? '[x]' : '[ ]'}</span> {o}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>{rxn.note} A chemical equation is balanced because atoms are only rearranged, never created or
              destroyed -- count each element on both sides to verify.</p>
          </div>

          <div className="bg-orange-950/40 rounded-2xl border border-orange-800/50 p-4 text-xs">
            <p className="font-bold text-orange-300 mb-1">What to try</p>
            <p>1. Count atoms in the iron sulfate decomposition: do 2 Fe, 2 S and 8 O match on both sides?</p>
            <p>2. In the displacement reaction, swap iron for copper nail. Predict what happens, then reason why the sim has no such option.</p>
          </div>

          <DepthDrill />
        </div>
      </div>
    </div>
  );
}

export default C10_ScienceChemicalReactionsAndEquationsSim;
