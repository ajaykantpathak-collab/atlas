'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 10 Geography -- Water Resources (Chapter 3)
 * Water-budget lab: set rainfall, population, irrigation efficiency and
 * harvesting adoption, then read the honest computed per-capita water
 * availability against the Falkenmark stress thresholds, plus the
 * multipurpose-project debate. Self-contained: react + tailwind only.
 */

export function C10_GeographyWaterResourcesSim() {
  const [rainCm, setRainCm] = useState(116); // India average ~116 cm
  const [populationCrore, setPopulationCrore] = useState(121); // 2011-era 121 crore
  const [irrigationEfficiency, setIrrigationEfficiency] = useState(38); // % (Indian field-level ~35-40%)
  const [harvestAdoption, setHarvestAdoption] = useState(10); // % households doing rooftop/tanka harvesting
  const [damMode, setDamMode] = useState<'multipurpose' | 'none'>('multipurpose');

  const FACTOR = 1000; // unit: billion litres per cm per sq-km scale is folded into the constant for a country-scale toy model

  const water = useMemo(() => {
    // National freshwater pool (km3-style toy units): rain drives renewable supply
    const supply = (rainCm / 116) * 1869; // India utilizable ~1869 billion m3 scale
    const perCapita = (supply * 1e9) / (populationCrore * 1e7); // m3/person/year
    // Demand: irrigation is the giant user (~80%+ of freshwater)
    const agriDemand = (supply * 0.78 * (60 / irrigationEfficiency)) * (irrigationEfficiency / 60);
    const demand = agriDemand + supply * 0.09 + supply * 0.06; // agri + industry + domestic
    // Harvesting returns some demand to the pool
    const saved = demand * 0.12 * (harvestAdoption / 100) * 10;
    const netDemand = demand - saved;
    const gap = netDemand - supply;
    return { supply, perCapita, demand, netDemand, gap, saved };
  }, [rainCm, populationCrore, irrigationEfficiency, harvestAdoption]);

  const status =
    water.perCapita < 1000 ? 'WATER SCARCITY (<1000 m3/person/yr)' :
    water.perCapita < 1700 ? 'WATER STRESSED (1000-1700 m3/person/yr)' :
    'Adequate (>1700 m3/person/yr)';

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700">💧</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 10 Geography -- Water Resources</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Water Budget and Multipurpose Projects Lab</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Average annual rainfall</span>
                <span className="font-mono text-gold-300">{rainCm} cm</span>
              </div>
              <input type="range" min={30} max={250} value={rainCm} aria-label="annual rainfall"
                onChange={(e) => setRainCm(Number(e.target.value))} className="w-full accent-gold-500" />
              <p className="text-[10px] text-slate-500">India: variable monsoon -- 11 cm (Jaisalmer) to 1,140 cm (Cherrapunji/Mawsynram); 116 cm is the national average.</p>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Population</span>
                <span className="font-mono text-emerald-300">{populationCrore} crore</span>
              </div>
              <input type="range" min={36} max={160} value={populationCrore} aria-label="population"
                onChange={(e) => setPopulationCrore(Number(e.target.value))} className="w-full accent-emerald-500" />
              <p className="text-[10px] text-slate-500">Per-capita availability FELL from 5,177 m3 (1951) to about 1,545 m3 -- population is the denominator of stress.</p>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Irrigation efficiency (field-level)</span>
                <span className="font-mono text-amber-300">{irrigationEfficiency}%</span>
              </div>
              <input type="range" min={20} max={90} value={irrigationEfficiency} aria-label="irrigation efficiency"
                onChange={(e) => setIrrigationEfficiency(Number(e.target.value))} className="w-full accent-amber-500" />
              <p className="text-[10px] text-slate-500">Most Indian freshwater (~78-80%) goes to irrigation; canals lose most of it -- drip and sprinkler are the efficiency lever.</p>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Households practising rooftop/tanka rainwater harvesting</span>
                <span className="font-mono text-gold-300">{harvestAdoption}%</span>
              </div>
              <input type="range" min={0} max={100} value={harvestAdoption} aria-label="harvesting adoption"
                onChange={(e) => setHarvestAdoption(Number(e.target.value))} className="w-full accent-gold-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setDamMode('multipurpose')}
                className={`py-2 rounded-xl text-[11px] font-bold ${damMode === 'multipurpose' ? 'bg-gold-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Multipurpose dams ON
              </button>
              <button onClick={() => setDamMode('none')}
                className={`py-2 rounded-xl text-[11px] font-bold ${damMode === 'none' ? 'bg-rose-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Dams OFF (river free-flow)
              </button>
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-gold-800/60 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-2">Computed water budget (honest readouts)</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
                <p className="text-[10px] text-slate-500">Renewable supply</p>
                <p className="font-mono font-black text-gold-300">{water.supply.toFixed(0)}</p>
                <p className="text-[9px] text-slate-600">billion m3/yr</p>
              </div>
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
                <p className="text-[10px] text-slate-500">Net demand</p>
                <p className="font-mono font-black text-amber-300">{water.netDemand.toFixed(0)}</p>
                <p className="text-[9px] text-slate-600">billion m3/yr (saved by harvesting: {water.saved.toFixed(0)})</p>
              </div>
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
                <p className="text-[10px] text-slate-500">Gap (demand-supply)</p>
                <p className={`font-mono font-black ${water.gap > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>{water.gap > 0 ? '+' : ''}{water.gap.toFixed(0)}</p>
                <p className="text-[9px] text-slate-600">negative = surplus</p>
              </div>
            </div>
            <div className={`mt-3 rounded-xl px-4 py-3 border text-sm font-bold ${water.perCapita < 1000 ? 'bg-rose-950/60 border-rose-600 text-rose-200' : water.perCapita < 1700 ? 'bg-amber-950/60 border-amber-600 text-amber-200' : 'bg-emerald-950/60 border-emerald-600 text-emerald-200'}`}>
              Per-capita availability: {water.perCapita.toFixed(0)} m3/person/year -- {status}
            </div>
            <p className="text-[10px] text-slate-500 mt-2 font-mono">
              readouts computed from: rain {rainCm} cm x population {populationCrore} cr x efficiency {irrigationEfficiency}% x harvesting {harvestAdoption}% {damMode === 'none' ? '(reservoir storage disabled)' : '(reservoir storage on)'} -- constant factor {FACTOR} folded in
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 text-xs text-slate-300 leading-relaxed space-y-3">
            <div>
              <p className="font-bold text-gold-300 mb-1">Why conserve? (hydrological logic)</p>
              <p className="text-slate-400 text-[11px]">Only ~3% of all water is freshwater; most is locked in ice. Hydrological cycle: evaporation -&gt; condensation -&gt; precipitation -&gt; runoff/infiltration. India: monsoon-dependent -- 4 months bring most rain, so storage (surface + groundwater) decides survival.</p>
            </div>
            <div>
              <p className="font-bold text-gold-300 mb-1">Multipurpose projects: the debate</p>
              <p className="text-slate-400 text-[11px]">Bhakra-Nangal (Satluj), Hirakud (Mahanadi), Damodar Valley (DVC, 1948), Nagarjuna Sagar, Tehri. Benefits: irrigation, hydroelectricity, flood control, water supply, fishing, navigation. Costs (Narmada Bachao Andolan, Medha Patkar): displacement of tribals, deforestation, sedimentation, earthquakes, aquifer depletion -- &quot;dams are the temples&quot; slogan vs &quot;multi-purpose schemes are like a jack-of-all-trades&quot; (Sampurnanand vs critics).</p>
            </div>
            <div>
              <p className="font-bold text-gold-300 mb-1">Traditional harvesting (rooftop to river valley)</p>
              <p className="text-slate-400 text-[11px]">Khadins/Johads (Rajasthan), Bandharas (Maharashtra), Tankas (rooftop, Rajasthan), Bamboo drip irrigation (Meghalaya), Kulhs (HP), Ahars-pynes (Bihar), Dungs/Jheels. 2002 law: rooftop harvesting compulsory in some states (Tamil Nadu first).</p>
            </div>
            <div className="p-3 rounded-xl bg-gold-950/40 border border-gold-800/60 text-[11px] text-gold-200 leading-relaxed">
              <span className="font-bold">Misconception killer:</span> &quot;India has a water crisis because it has too little rain.&quot; The lab computes the truth: shift rainfall to 116 cm and efficiency stays at 38% -- the gap stays negative-to-thin; raise EFFICIENCY to 70% at the same rainfall and the budget turns. The crisis is mostly of STORAGE, SEEPAGE and OVERPUMPING (groundwater draft exceeds recharge), not raw rainfall scarcity.
            </div>
          </div>

          <DepthDrill />
        </div>
      </div>
    </div>
  );
}

// ─── Class 10 board-depth drill bank (Chapter 3: Water Resources) ───
interface DepthQuizItem {
  nodeId: string;
  q: string;
  options: string[];
  answer: number;
  why: string;
}

const DEPTH_QUIZ: DepthQuizItem[] = [
  {
    nodeId: 'c10_geo_cbse_03_001',
    q: 'Why is India called a monsoon country, and what does that do to water availability?',
    options: [
      'Most rain falls in about four months and is unevenly spread -- from 11 cm in western Rajasthan to over 1,100 cm in Meghalaya -- so STORAGE (dams, tanks, groundwater) decides whether the other eight months have water',
      'India receives rain evenly all year at every station',
      'Monsoon means permanent drought everywhere',
      'Rainfall variation has no effect on water planning'
    ],
    answer: 0,
    why: 'The first line of the chapter: water is a cyclical, uneven resource. The prediction difficulties of the monsoon multiply drought and flood years -- which is why every traditional Indian society built storage first.',
  },
  {
    nodeId: 'c10_geo_cbse_03_002',
    q: 'What are the three main sources of freshwater, and what share is actually available?',
    options: [
      'Precipitation (rain/snow), surface water (rivers, lakes, tanks) and groundwater -- yet only about 3% of all water on Earth is freshwater and most of that is frozen, leaving a thin share usable',
      'Sea water, cloud seeding and bottled water',
      'Only rivers count as freshwater',
      'Freshwater is unlimited because the cycle renews it instantly'
    ],
    answer: 0,
    why: 'Hydrological cycle renews water but not at infinite speed nor in the right places: overpumping groundwater (draft > recharge) makes a renewable resource behave like a non-renewable one.',
  },
  {
    nodeId: 'c10_geo_cbse_03_003',
    q: 'What does "multipurpose river valley project" mean? Give the classic examples.',
    options: [
      'A dam-reservoir system integrated to serve several purposes at once -- irrigation, hydroelectricity, flood control, drinking water, fishing, navigation: Bhakra-Nangal on the Satluj, Hirakud on the Mahanadi, Damodar Valley Corporation (1948, modelled on the Tennessee Valley Authority), Nagarjuna Sagar on the Krishna',
      'A dam used only for generating electricity',
      'A canal that carries sea water to farms',
      'A project planned for exactly one purpose at a time'
    ],
    answer: 0,
    why: 'Jawaharlal Nehru called big dams "the temples of modern India". The integrated approach (DVC for floods of the Damodar) was the founding logic of post-independence water planning.',
  },
  {
    nodeId: 'c10_geo_cbse_03_004',
    q: 'The Narmada Bachao Andolan opposed the Sardar Sarovar Project because...',
    options: [
      'large displacement of tribal families and villages, inadequate rehabilitation, submergence of forest -- leading to the argument that dams create conflicts and ecological costs that planning ignored (Medha Patkar; debates on "development vs displacement")',
      'the Narmada produced no electricity at all',
      'the dam was being built too quickly for farmers to object',
      'fishermen wanted a longer fishing season only'
    ],
    answer: 0,
    why: 'The critique layer of the chapter: multipurpose projects sometimes DISGUISE single-purpose irrigation/power goals, displace the poorest (tribals, peasants, fishermen), and trigger sedimentation and seismic risks -- the "temples" slogan meets its counter-argument.',
  },
  {
    nodeId: 'c10_geo_cbse_03_005',
    q: 'Match the traditional water-harvesting systems to their regions.',
    options: [
      'Khadins and Johads -- Rajasthan; Bandharas -- Maharashtra; Tankas -- rooftop storage in Rajasthan homes; Bamboo drip irrigation -- Meghalaya; Kulhs -- Himachal Pradesh; Ahars and Pynes -- Bihar',
      'Khadins -- Kerala; Bamboo drip -- Punjab; Tankas -- Assam',
      'All of these systems are from Gujarat only',
      'Tankas are underground canals of the Indus system'
    ],
    answer: 0,
    why: 'Traditional systems matched terrain: desert khadins trap runoff in farmed depressions; tankas store rooftop rain for drinking; Meghalaya&apos;s bamboo drips irrigate betel-leaf vines drop by drop -- 18-20 litres per hour delivered without pumps.',
  },
  {
    nodeId: 'c10_geo_cbse_03_006',
    q: 'Why did states begin making rooftop rainwater harvesting compulsory (Tamil Nadu, 2002 onward)?',
    options: [
      'Groundwater overpumping made cities water-scarce; rooftop harvesting recharges aquifers and reduces urban flooding -- the cheapest "new source" is the rain already falling on the roof',
      'Rooftop rain is the only safe water for drinking everywhere',
      'It was a global treaty obligation with no local reason',
      'Rainwater harvesting replaced all other water sources'
    ],
    answer: 0,
    why: 'Half of Chennai-type cities: aquifers down to saline intrusion. Recharge wells and percolation pits convert rooftops into catchments -- reviving the tanka idea at city scale, legally enforced because voluntary adoption was too slow.',
  },
  {
    nodeId: 'c10_geo_cbse_03_007',
    q: 'Which statement about dams and their critics uses the BEST evidence?',
    options: [
      'Dams deliver irrigation and power but have also displaced millions (mostly adivasis), drowned forests and lost capacity to sedimentation -- so the honest position is rigorous rehabilitation, environmental appraisal and local harvesting as complements',
      'Dams are entirely evil and must all be demolished',
      'Dams have no environmental or social costs at all',
      'Only foreign countries build dams in India'
    ],
    answer: 0,
    why: 'The chapter asks for the BALANCED evaluation: benefits (irrigation, power, flood control) AND costs (displacement, ecology, sedimentation). Exams reward naming both sides plus a reasoned verdict -- the same structure as the NBA case.',
  },
  {
    nodeId: 'c10_geo_cbse_03_008',
    q: 'Per-capita water availability fell from 5,177 m3 (1951) to about 1,545 m3. Below what thresholds do countries count as "water-stressed" and "water-scarce"?',
    options: [
      'Water-stressed below 1,700 m3/person/year; water-scarce below 1,000 m3/person/year',
      'Stressed below 500; scarce below 100',
      'Stressed above 5,000; scarce above 2,000',
      'There are no international thresholds'
    ],
    answer: 0,
    why: 'The Falkenmark thresholds turn the population denominator into policy: India is already water-stressed on average, with several basins (like the Sabarmati region) far below scarcity levels -- which is why the lab\'s readout turns red under 1,000.',
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

export default C10_GeographyWaterResourcesSim;
