'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 10 Geography -- Lifelines of National Economy (Chapter 7)
 * Freight-mode cost lab: compare road, rail, water, pipeline and air for a
 * consignment over distance and terrain, with honest computed rupee-per-
 * tonne-km and transit time. Includes the network facts (Golden
 * Quadrilateral, gauges, ports, airports) and trade basics.
 * Self-contained: react + tailwind only. Deterministic.
 */

type Mode = 'road' | 'rail' | 'water' | 'pipeline' | 'air';

const MODES: Record<Mode, { label: string; rsPerTonneKm: number; kmPerHour: number; note: string }> = {
  road: { label: 'Road (NH/truck)', rsPerTonneKm: 2.5, kmPerHour: 40, note: 'Door-to-door flexibility; growing share; costliest per tonne-km for long hauls.' },
  rail: { label: 'Rail (Indian Railways)', rsPerTonneKm: 1.2, kmPerHour: 50, note: 'Backbone of long-haul, bulk freight; largest network in Asia under one management.' },
  water: { label: 'Water (coastal/inland)', rsPerTonneKm: 0.4, kmPerHour: 15, note: 'Cheapest for bulky, low-value cargo; slow; needs ports and navigable waterways.' },
  pipeline: { label: 'Pipeline (oil/gas)', rsPerTonneKm: 0.5, kmPerHour: 5, note: 'For liquids and gas only; negligible running cost, high initial laying cost.' },
  air: { label: 'Air cargo', rsPerTonneKm: 18, kmPerHour: 700, note: 'Costliest; for high-value, perishable, urgent freight (flowers, pharma, documents).' },
};

const PORTS = [
  'Kandla (first port after Partition)', 'Mumbai (largest, natural harbour)', 'JLN Nhava Sheva (containers)',
  'Marmagao (iron ore exports)', 'New Mangalore', 'Kochi (south-western terminus)',
  'Tuticorin (southern extremity)', 'Chennai (artificial, oldest)', 'Ennore (private, coal)',
  'Vishakhapatnam (deepest, landlocked + landlocked hinterland)', 'Paradip', 'Haldia (Hooghly)',
];

export function C10_GeographyLifelinesNationalEconomySim() {
  const [mode, setMode] = useState<Mode>('road');
  const [distance, setDistance] = useState(1500);
  const [tonnes, setTonnes] = useState(100);
  const [terrain, setTerrain] = useState(1); // multiplier: 1 plain, 1.4 plateau, 1.8 mountain
  const [valuePerTonne, setValuePerTonne] = useState(20000); // rupees per tonne of cargo value

  const m = MODES[mode];
  const terrainLabel = terrain === 1 ? 'plains' : terrain === 1.4 ? 'plateau/hilly' : 'mountain';
  const effKmph = m.kmPerHour / terrain;
  const cost = distance * tonnes * m.rsPerTonneKm * terrain;
  const hours = distance / effKmph;
  const railCost = distance * tonnes * MODES.rail.rsPerTonneKm * terrain;
  const savingsVsRoad = distance * tonnes * MODES.road.rsPerTonneKm * terrain - cost;
  const insurancePerDay = (tonnes * valuePerTonne) * 0.0002; // holding cost of value in transit

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-teal-950/80 rounded-2xl border border-teal-700">🚂</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Class 10 Geography -- Lifelines of National Economy</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Freight Mode Cost and Network Lab</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Choose the mode</p>
              <div className="grid grid-cols-5 gap-1.5">
                {(Object.keys(MODES) as Mode[]).map((k) => (
                  <button key={k} onClick={() => setMode(k)}
                    className={`py-2 rounded-xl text-[10px] font-bold ${mode === k ? 'bg-teal-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
                    {k}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 mt-1">{m.note}</p>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Distance</span><span className="font-mono text-gold-300">{distance} km</span>
              </div>
              <input type="range" min={100} max={3000} step={50} value={distance} aria-label="distance"
                onChange={(e) => setDistance(Number(e.target.value))} className="w-full accent-gold-500" />
              <p className="text-[10px] text-slate-500">Delhi-Kolkata ~1,450 km (Golden Quadrilateral arm); Mumbai-Delhi ~1,400 km.</p>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Consignment size</span><span className="font-mono text-emerald-300">{tonnes} tonnes</span>
              </div>
              <input type="range" min={1} max={1000} step={1} value={tonnes} aria-label="tonnes"
                onChange={(e) => setTonnes(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Terrain</span><span className="font-mono text-amber-300">{terrainLabel} (x{terrain})</span>
              </div>
              <input type="range" min={1} max={1.8} step={0.4} value={terrain} aria-label="terrain"
                onChange={(e) => setTerrain(Number(e.target.value))} className="w-full accent-amber-500" />
              <p className="text-[10px] text-slate-500">Border Roads Organisation builds at 1.8x cost in the Himalayas; Konkan Railway threaded the Sahyadri at huge engineering cost (92 tunnels, 2,000 bridges).</p>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Cargo value (Rs per tonne)</span><span className="font-mono text-pink-300">{valuePerTonne.toLocaleString('en-IN')}</span>
              </div>
              <input type="range" min={5000} max={5000000} step={5000} value={valuePerTonne} aria-label="cargo value per tonne"
                onChange={(e) => setValuePerTonne(Number(e.target.value))} className="w-full accent-pink-500" />
              <p className="text-[10px] text-slate-500">Value in transit is why flowers/pharma fly despite air freight cost -- holding cost rises with value per day.</p>
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-teal-800/60 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-2">Computed freight economics</p>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
                <p className="text-[10px] text-slate-500">Freight cost</p>
                <p className="font-mono font-black text-teal-300">Rs {(cost / 100000).toFixed(2)} L</p>
                <p className="text-[9px] text-slate-600">Rs {m.rsPerTonneKm}/t-km x{terrain}</p>
              </div>
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
                <p className="text-[10px] text-slate-500">Transit time</p>
                <p className="font-mono font-black text-gold-300">{hours.toFixed(1)} h</p>
                <p className="text-[9px] text-slate-600">{effKmph.toFixed(0)} km/h effective</p>
              </div>
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
                <p className="text-[10px] text-slate-500">vs same trip by rail</p>
                <p className={`font-mono font-black ${cost > railCost ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {cost > railCost ? '-' : '+'}Rs {(Math.abs(cost - railCost) / 100000).toFixed(2)} L
                </p>
                <p className="text-[9px] text-slate-600">rail benchmark Rs {railCost / 100000 > 0 ? (railCost / 100000).toFixed(2) : '0.00'} L</p>
              </div>
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
                <p className="text-[10px] text-slate-500">Value-in-transit/day</p>
                <p className="font-mono font-black text-pink-300">Rs {(insurancePerDay * 24).toFixed(0)}</p>
                <p className="text-[9px] text-slate-600">holding cost of goods on the move</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              Verdict logic: {mode === 'air' ? 'air wins only when value-per-tonne and urgency dominate -- the holding cost dwarfs freight.' : mode === 'water' ? 'water wins for bulk (coal, ore, grain) where speed is irrelevant.' : mode === 'pipeline' ? 'pipelines win for steady liquid/gas flows (oil fields to refineries: Naharkatiya-Nunmati-Barauni, HVJ gas pipeline).' : mode === 'rail' ? 'rail is the long-haul bulk backbone -- the cheapest surface option over 500 km in plains.' : 'road wins on short hauls and door-to-door; compare the rail benchmark for long hauls.'}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 text-xs text-slate-300 leading-relaxed space-y-3">
            <div>
              <p className="font-bold text-teal-300 mb-1">Roads (second largest network: about 62 lakh km)</p>
              <p className="text-slate-400 text-[11px]">Golden Quadrilateral 5,846 km (Delhi-Mumbai-Chennai-Kolkata), NS-EW corridors; NHAI maintains National Highways (2% of length, ~40% of traffic); SH (state), District, Rural (PMGSY), Border Roads (BRO, 1960). Classification by width and surfacing: National/State/District/Rural/Border.</p>
            </div>
            <div>
              <p className="font-bold text-teal-300 mb-1">Railways (largest in Asia under single management)</p>
              <p className="text-slate-400 text-[11px]">Gauges: broad (1.676 m), metre (1.0), narrow (0.762/0.610) -- unification to broad gauge is the project; Konkan Railway (740 km, Roha-Mangalore) through the Western Ghats; containerisation (CONCOR) links rail to ports.</p>
            </div>
            <div>
              <p className="font-bold text-teal-300 mb-1">Ports, airways, trade</p>
              <p className="text-slate-400 text-[11px]">12 major ports on west + east coasts; Deendayal (Kandla) was built after Karachi went to Pakistan. Airways: Air India (1947 nationalised; 1953 splits), 1990s private jets era; 94 airports classed international. Trade: exports+imports = foreign trade; balance of trade surplus/deficit; tourism = invisible trade (15 million+ foreign visitors pre-2020).</p>
            </div>
            <div className="p-3 rounded-xl bg-teal-950/40 border border-teal-800/60 text-[11px] text-teal-200 leading-relaxed">
              <span className="font-bold">Misconception killer:</span> &quot;The cheapest mode should always be used.&quot; The lab computes why that is false: choose water for 100 t of coal (cheap, slow, value small) and air for 1 t of vaccines (holding cost + urgency dominate) -- the MODE is chosen by value density, urgency, terrain and available infrastructure together, not by unit freight cost alone.
            </div>
          </div>

          <DepthDrill />
        </div>
      </div>
    </div>
  );
}

// ─── Class 10 board-depth drill bank (Chapter 7: Lifelines) ───
interface DepthQuizItem {
  nodeId: string;
  q: string;
  options: string[];
  answer: number;
  why: string;
}

const DEPTH_QUIZ: DepthQuizItem[] = [
  {
    nodeId: 'c10_geo_cbse_07_001',
    q: 'Why are transport, communication and trade called the "lifelines" of a national economy?',
    options: [
      'Because goods, people and ideas must MOVE for the economy to live: raw materials reach factories, finished goods reach markets, disaster relief reaches victims -- the pace of development depends on the pace of these flows',
      'Because they are the only industries the government owns',
      'Because lifelines is a poetic word with no economic meaning',
      'Because they earn the largest share of GDP of any sector'
    ],
    answer: 0,
    why: 'The chapter\'s opening claim: today the world is a "global village" precisely because these flows are dense and fast -- the 1998 Rajasthan-Gujarat link (well-supplied markets) vs remote areas shows development tracks connectivity.',
  },
  {
    nodeId: 'c10_geo_cbse_07_002',
    q: 'Match the road classes with their features.',
    options: [
      'Golden Quadrilateral: 5,846 km super-highway Delhi-Mumbai-Chennai-Kolkata; National Highways: ~2% of road length but ~40% of traffic (NHAI); Border Roads: BRO-built strategic roads in frontier areas',
      'GQ: 5,846 km along the coast; NH: village roads; BRO: city buses',
      'GQ connects only Mumbai and Delhi; NH are state roads; BRO builds ports',
      'The Golden Quadrilateral is a railway line'
    ],
    answer: 0,
    why: 'The GQ cuts travel time between the four metro economies; the North-South (Srinagar-Kanyakumari) and East-West (Silchar-Porbandar) corridors complement it. Road density still correlates with terrain and wealth: Kerala high, Rajasthan low.',
  },
  {
    nodeId: 'c10_geo_cbse_07_003',
    q: 'Indian Railways: which statements are correct?',
    options: [
      'Largest network in Asia under a single management; three gauges (broad 1.676 m, metre 1.0 m, narrow 0.762/0.610 m) being unified to broad gauge; the Konkan Railway (740 km Roha-Mangalore) crossed the Sahyadri with 92 tunnels and about 2,000 bridges',
      'India runs only metre gauge; the Konkan line crosses the Himalayas',
      'Railways carry passengers only, never freight',
      'Broad gauge is the narrowest Indian gauge'
    ],
    answer: 0,
    why: 'Railway zone headquarters distribute administration across the country. The Himalayan mountain routes needed engineering like the Konkan project -- tunnels, bridges, cuttings -- to thread the western coast.',
  },
  {
    nodeId: 'c10_geo_cbse_07_004',
    q: 'Which pair of ports matches its special feature correctly?',
    options: [
      'Deendayal (Kandla): developed after Partition to replace Karachi; Vishakhapatnam: deepest landlocked and protected port; Marmagao: premier iron-ore exporter; JLN Nhava Sheva: largest container port',
      'Kandla: famous for tea exports; Kochi: deepest landlocked port',
      'Chennai: newest private port; Ennore: oldest artificial port',
      'Mumbai is an inland river port on the Hooghly'
    ],
    answer: 0,
    why: 'The 12 major ports ring the peninsula: west (Kandla, Mumbai, Nhava Sheva, Marmagao, New Mangalore, Kochi) and east (Tuticorin, Chennai, Ennore, Vishakhapatnam, Paradip, Haldia). Kolkata is the inland river port; Tuticorin is the southernmost.',
  },
  {
    nodeId: 'c10_geo_cbse_07_005',
    q: 'Pipelines are the ideal mode for...',
    options: [
      'liquids and gases over fixed, steady corridors: crude from Naharkatiya to Nunmati-Barauni refineries, the HVJ gas pipeline, product lines between refineries and distribution points -- negligible running cost, tiny maintenance, but costly to lay and inflexible',
      'moving wheat and coal to any destination',
      'carrying passengers between cities',
      'sending electricity across the country'
    ],
    answer: 0,
    why: 'Initial cost is high but operating cost is minimal and supply is uninterrupted (no return empty run). Solids can be piped as slurry (coal-water mixtures) -- the frontier of pipeline use.',
  },
  {
    nodeId: 'c10_geo_cbse_07_006',
    q: 'Balance of trade means...',
    options: [
      'the difference between a country\'s EXPORTS and IMPORTS: exports > imports = favourable (surplus); imports > exports = unfavourable (deficit) -- India trades with most countries, importing petroleum, machinery, gold and exporting gems, engineering goods, services',
      'the balance between road and rail freight',
      'the profit of ports only',
      'the difference between domestic and foreign tourists'
    ],
    answer: 0,
    why: 'Trade classification: bilateral (two countries) vs multilateral (many); commodities vs services. Tourism is INVISIBLE trade -- earning foreign exchange without shipping a crate.',
  },
  {
    nodeId: 'c10_geo_cbse_07_007',
    q: 'Why does air transport suit India despite its high cost?',
    options: [
      'vast distances, difficult terrain (north-eastern states, Himalayas), and high-value urgent cargo (pharma, flowers, documents) -- airways were nationalised in 1953 and the 1990s opened the door to private carriers on international routes',
      'because air tickets are the cheapest mode',
      'because airplanes need no airports',
      'because India has no other transport at all'
    ],
    answer: 0,
    why: 'The north-east\'s terrain makes surface links slow and fragile -- air links are lifelines there. About 94 airports are classed international; air cargo carries the highest value per tonne.',
  },
  {
    nodeId: 'c10_geo_cbse_07_008',
    q: 'International tourism is counted as...',
    options: [
      'INVISIBLE trade: foreign tourists spend on hotels, food, transport and guides -- India earns foreign exchange without exporting a physical good; rajasthan, Goa and Kerala lead arrivals',
      'visible trade because tourists are physically visible',
      'a transfer payment that adds nothing to the economy',
      'part of domestic trade'
    ],
    answer: 0,
    why: 'Over 15 million foreign tourists visited India in the best pre-2020 years -- supporting employment in hospitality. Tourism is also the chapter\'s bridge to "lifelines": tourists depend entirely on the transport-communication network.',
  },
  {
    nodeId: 'c10_geo_cbse_07_009',
    q: 'Mass communication vs personal communication: which pairing is right?',
    options: [
      'Personal: letters, e-mail, telephone (one-to-one). Mass: radio (All India Radio reaches ~99% of the population), Doordarshan TV, newspapers, cinema, internet portals (one-to-many)',
      'Radio is personal; letters are mass media',
      'Mass media reaches exactly one person at a time',
      'India Post is a mass medium because it carries many letters'
    ],
    answer: 0,
    why: 'The longest written constitution analogy aside -- communication networks carry the "ideas" lifeline: 99% radio reach makes AIR the widest mass medium; India Post remains the largest postal network with about 1.5 lakh post offices.',
  },
  {
    nodeId: 'c10_geo_cbse_07_006',
    q: 'Which authority plans and upgrades National Highways, and which body runs helicopter and regional-air services?',
    options: [
      'NHAI (National Highways Authority of India, 1988/1995 statute) builds and upgrades National Highways incl. the Golden Quadrilateral; Pawan Hans Helicopters Ltd provides helicopter services to remote/offshore areas; UDAN (Ude Desh ka Aam Nagrik) is the regional-connectivity scheme making small-city airports viable with capped fares',
      'NHAI runs railways; Pawan Hans issues driving licences; UDAN builds seaports',
      'The BRO collects tolls on all National Highways',
      'No single authority exists; road upgrades are ad hoc'
    ],
    answer: 0,
    why: 'Evaluate the UDAN claim ("it has made flying affordable for the common person everywhere"): it revived dozens of small airports and capped seat fares, but low air-travel penetration outside metros shows the scheme as a START, not a finished revolution. Flying Mumbai to Dubai: you need a passport/visa, an international airport (about 94 classed international, e.g. Mumbai CSI, Delhi IGI) and an emigration check.',
  },
  {
    nodeId: 'c10_geo_cbse_07_006',
    q: 'Sketch an annotated map of India\'s transport grid for a board answer: what must appear?',
    options: [
      'Golden Quadrilateral + NS-EW corridors, major National Highways (NH-44 Srinagar-Kanyakumari), the railway trunk routes and Konkan line, major ports on both coasts (Kandla to Haldia) with their hinterlands, international airports (Delhi, Mumbai, Kolkata, Chennai, Hyderabad, Bengaluru), and the HVJ pipeline route',
      'Only the state capitals and nothing else',
      'Rivers and mountains only -- transport never goes on maps',
      'Every village road in the country'
    ],
    answer: 0,
    why: 'A one-page annotated map scores by layers: road (GQ), rail (trunk + Konkan), pipeline (HVJ Hazira-Vijaipur-Jagdishpur for gas), sea (12 major ports + hinterland links), air (international gateways). Annotate each with one feature (name, length, or cargo) -- that is what examiners reward.',
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

export default C10_GeographyLifelinesNationalEconomySim;
