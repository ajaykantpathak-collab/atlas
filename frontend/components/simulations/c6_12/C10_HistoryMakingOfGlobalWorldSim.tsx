'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 10 History -- The Making of a Global World (Chapter 3)
 * Globalisation simulator: travel the pre-modern trade routes, run the
 * Columbian exchange, model the 19th-century gold-standard flow of goods,
 * capital and labour, shock the system with the Great Depression, and
 * rebuild it at Bretton Woods. Self-contained: react + tailwind only.
 */

type Era = 'silk' | 'columbian' | 'c19' | 'depression' | 'bretton';

const ERAS: { id: Era; label: string; year: string }[] = [
  { id: 'silk', label: 'Silk Routes (pre-modern)', year: 'to 15th c.' },
  { id: 'columbian', label: 'Columbian Exchange', year: '1492-1600s' },
  { id: 'c19', label: '19th-century global economy', year: '1815-1914' },
  { id: 'depression', label: 'Great Depression', year: '1929-1935' },
  { id: 'bretton', label: 'Bretton Woods', year: '1944-1970s' },
];

const SILK_GOODS = ['Chinese silk', 'spices from India/SE Asia', 'Roman gold coins', 'textiles', 'Buddhism, Christianity, Islam, germs'];

export function C10_HistoryMakingOfGlobalWorldSim() {
  const [era, setEra] = useState<Era>('silk');
  const [tradeSlider, setTradeSlider] = useState(60); // openness of trade
  const [migration, setMigration] = useState(40);
  const [goldBacking, setGoldBacking] = useState(true);
  const [depressionShock, setDepressionShock] = useState(0); // 0-100

  const stats = useMemo(() => {
    let worldTrade = Math.round(tradeSlider * 1.5);
    let capitalFlow = goldBacking ? Math.round(tradeSlider * 1.2) : Math.round(tradeSlider * 0.5);
    let labourFlow = migration;
    let priceLevel = 100;
    let unemployment = 5;
    if (depressionShock > 0) {
      worldTrade = Math.round(worldTrade * (1 - depressionShock / 130));
      capitalFlow = Math.round(capitalFlow * (1 - depressionShock / 100));
      labourFlow = Math.round(labourFlow * (1 - depressionShock / 200));
      priceLevel = Math.max(40, 100 - Math.round(depressionShock * 0.5));
      unemployment = Math.min(40, 5 + Math.round(depressionShock * 0.28));
    }
    return { worldTrade, capitalFlow, labourFlow, priceLevel, unemployment };
  }, [tradeSlider, migration, goldBacking, depressionShock]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-amber-950/80 rounded-2xl border border-amber-700">🌍</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Class 10 History -- The Making of a Global World</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Five Centuries of Globalisation</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Choose the era</p>
            <div className="grid grid-cols-5 gap-1.5">
              {ERAS.map((e) => (
                <button key={e.id} onClick={() => setEra(e.id)}
                  className={`py-2 rounded-xl text-[10px] font-bold leading-tight ${era === e.id ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                  {e.label}<br /><span className="font-mono opacity-75">{e.year}</span>
                </button>
              ))}
            </div>

            {era === 'silk' && (
              <div className="mt-3 text-xs text-slate-300 leading-relaxed">
                <p className="font-bold text-amber-300 mb-1">Silk Routes: goods AND culture moved together</p>
                <p className="text-slate-400">Silk routes linked Asia with Europe and northern Africa -- Chinese silk pots, Indian spices and textiles, Roman gold coins flowed both ways; so did religions (Buddhism to China/Japan, Christianity, Islam) and early germs. Food travels: noodles and spaghetti both travelled the routes. Trade and culture were inseparable -- the first globalisation was cultural as much as commercial.</p>
              </div>
            )}
            {era === 'columbian' && (
              <div className="mt-3 text-xs text-slate-300 leading-relaxed">
                <p className="font-bold text-amber-300 mb-1">Columbian Exchange (1492 onward)</p>
                <p className="text-slate-400">To the Americas: wheat, sugar, coffee, smallpox (which killed entire communities with no immunity). From the Americas to the world: POTATO and MAIZE (China&apos;s 18th-century population boom fed on American crops), tomatoes, chillies, sweet potatoes, groundnuts, tobacco. Precious metals from Peru/Mexico financed Europe&apos;s trade with Asia. The exchange reshaped diets and demography worldwide.</p>
              </div>
            )}
            {era === 'c19' && (
              <div className="mt-3 text-xs text-slate-300 leading-relaxed">
                <p className="font-bold text-amber-300 mb-1">The 19th century: a triple-flow global economy</p>
                <p className="text-slate-400">Flow of TRADE: British manufactures flooded India (cotton exports collapsed, artisans ruined). Flow of CAPITAL: London financed railways in India and plantations in Africa. Flow of LABOUR: about 15 crore (150 million) migrants -- indentured Indians to Mauritius, Fiji, Trinidad, Guyana, Surinam, Caribbean tea/coffee estates (the Rastafari and Hindi words surviving there prove the transfer). Rinderpest (1890s) killed 90% of African cattle, breaking African livelihoods and forcing wage labour -- the plague that served colonial conquest.</p>
              </div>
            )}
            {era === 'depression' && (
              <div className="mt-3 text-xs text-slate-300 leading-relaxed">
                <p className="font-bold text-amber-300 mb-1">Great Depression (1929-1935)</p>
                <p className="text-slate-400">US farm overproduction + falling prices -> crash of 1929 -> collapse of world prices and incomes. Agricultural regions suffered MOST (prices fell harder than industrial goods): Latin America, and INDIA -- peasant debts and forced gold sales; rural India returned to gold standard early (1931) but its farmers bore the pain. Unemployment: 1 in 3 in Britain, millions in the USA. The depression deepened the anti-colonial feeling: fixed revenue against collapsing prices = misery.</p>
              </div>
            )}
            {era === 'bretton' && (
              <div className="mt-3 text-xs text-slate-300 leading-relaxed">
                <p className="font-bold text-amber-300 mb-1">Bretton Woods (July 1944) and after</p>
                <p className="text-slate-400">44 nations designed a stable system: currencies pegged to the DOLLAR, itself backed by gold ($35/oz). Institutions: IMF (short-term balance-of-payments help) and World Bank (reconstruction and development). Western economies boomed (the golden age), but the system ignored the developing world -- decolonisation brought a call for a New International Economic Order (NIEO: UNCTAD 1972, control of resources, fairer prices). The dollar-gold link collapsed in the 1970s; MNCs then relocated production worldwide -- the next globalisation.</p>
              </div>
            )}
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-amber-800/60 p-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Run the system (honest toy model)</p>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Trade openness</span><span className="font-mono text-sky-300">{tradeSlider}%</span>
              </div>
              <input type="range" min={0} max={100} value={tradeSlider} aria-label="trade openness"
                onChange={(e) => setTradeSlider(Number(e.target.value))} className="w-full accent-sky-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Labour migration flow</span><span className="font-mono text-emerald-300">{migration}%</span>
              </div>
              <input type="range" min={0} max={100} value={migration} aria-label="labour migration"
                onChange={(e) => setMigration(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>
            <button onClick={() => setGoldBacking((g) => !g)}
              className={`w-full py-2 rounded-xl text-[11px] font-bold ${goldBacking ? 'bg-amber-600 text-slate-950' : 'bg-slate-800'}`}>
              Gold standard / gold-dollar backing: {goldBacking ? 'ON (stable exchange rates, capital flows)' : 'OFF (floating, capital flow halves)'}
            </button>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Depression shock (1929-style)</span><span className="font-mono text-rose-300">{depressionShock}</span>
              </div>
              <input type="range" min={0} max={100} value={depressionShock} aria-label="depression shock"
                onChange={(e) => setDepressionShock(Number(e.target.value))} className="w-full accent-rose-500" />
            </div>
            <div className="grid grid-cols-5 gap-1.5 text-center">
              <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
                <p className="text-[9px] text-slate-500">World trade</p>
                <p className="font-mono font-black text-sky-300">{stats.worldTrade}</p>
              </div>
              <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
                <p className="text-[9px] text-slate-500">Capital flow</p>
                <p className="font-mono font-black text-emerald-300">{stats.capitalFlow}</p>
              </div>
              <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
                <p className="text-[9px] text-slate-500">Labour flow</p>
                <p className="font-mono font-black text-amber-300">{stats.labourFlow}</p>
              </div>
              <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
                <p className="text-[9px] text-slate-500">Price level</p>
                <p className="font-mono font-black text-slate-200">{stats.priceLevel}</p>
              </div>
              <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
                <p className="text-[9px] text-slate-500">Unemployment %</p>
                <p className={`font-mono font-black ${stats.unemployment > 20 ? 'text-rose-400' : 'text-slate-200'}`}>{stats.unemployment}</p>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">
              computed from: trade {tradeSlider}% x migration {migration}% x gold {goldBacking ? 'on' : 'off'} x shock {depressionShock}%
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 text-xs text-slate-300 leading-relaxed space-y-3">
            <div>
              <p className="font-bold text-amber-300 mb-1">Indentured labour memory</p>
              <p className="text-slate-400 text-[11px]">Under contract (girmits signed &quot;girmit&quot; = agreement), Indians worked plantations abroad: Ram Chandra&apos;s tale, surviving festivals (Hosay in Trinidad), and words (chutney music). Gandhi first experimented satyagraha fighting such conditions in South Africa (1890s-1907).</p>
            </div>
            <div>
              <p className="font-bold text-amber-300 mb-1">Rinderpest and conquest</p>
              <p className="text-slate-400 text-[11px]">A cattle plague carried into Africa in the 1890s killed 90% of cattle, destroying African pastoral economies -- Africans were then forced to work for wages on mines and plantations. Disease + economic policy = conquest (colonial rule needed cheap labour).</p>
            </div>
            <div>
              <p className="font-bold text-amber-300 mb-1">Rebuild after the war</p>
              <p className="text-slate-400 text-[11px]">Bretton Woods 1944: IMF + World Bank, dollar peg, stable exchange rates -- learning from the 1930s when competitive devaluations and protection (Smoot-Hawley) had strangled world trade.</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 text-[11px] text-amber-200 leading-relaxed">
              <span className="font-bold">Misconception killer:</span> &quot;Globalisation is a 1990s invention.&quot; The five-era slider shows trade networks running since the silk routes; the 1870-1914 world was ALREADY highly globalised (trade share similar to today), collapsed between the wars, and was rebuilt in stages. Globalisation is a PROCESS with reversals -- not a new idea.
            </div>
          </div>

          <DepthDrill />
        </div>
      </div>
    </div>
  );
}

// ─── Class 10 board-depth drill bank (Chapter 3: The Making of a Global World) ───
interface DepthQuizItem {
  nodeId: string;
  q: string;
  options: string[];
  answer: number;
  why: string;
}

const DEPTH_QUIZ: DepthQuizItem[] = [
  {
    nodeId: 'c10_hist_cbse_03_001',
    q: 'What moved along the silk routes?',
    options: [
      'goods (silk, spices, textiles, gold coins), cultures (Buddhism, Christianity, Islam), art, and even germs -- trade and cultural exchange travelled together',
      'only Chinese silk, nothing else',
      'only soldiers and weapons',
      'nothing before 1945'
    ],
    answer: 0,
    why: 'Silk routes (land and sea) predate the modern era by centuries; historians use them to show that globalisation has ancient roots. Food too travelled -- noodles/spaghetti stories -- linking kitchens across continents.',
  },
  {
    nodeId: 'c10_hist_cbse_03_002',
    q: 'Which crops travelled FROM the Americas to the rest of the world after 1492?',
    options: [
      'potatoes, maize, tomatoes, chillies, sweet potatoes, groundnuts and tobacco -- the potato alone fuelled population growth in Europe and China',
      'wheat, rice, coffee and sugar',
      'smallpox and measles',
      'silk and porcelain'
    ],
    answer: 0,
    why: 'The Columbian exchange was two-way: crops went TO the Americas (wheat, coffee), devastating DISEASES went with them (smallpox killed whole communities lacking immunity), and American crops revolutionised Old World diets -- China ate American maize and sweet potatoes as its population boomed.',
  },
  {
    nodeId: 'c10_hist_cbse_03_003',
    q: 'Rinderpest (1890s) shows how disease served colonial conquest because...',
    options: [
      'the cattle plague killed about 90% of African cattle, destroying pastoral livelihoods, so Africans were forced into wage labour on mines and plantations -- colonial economies needed exactly that cheap labour',
      'the disease killed only European colonisers',
      'rinderpest was cured immediately, so nothing changed',
      'Africans had imported cattle vaccines already'
    ],
    answer: 0,
    why: 'The chapter calls it "the deadly gift from the Old World reaching Africa". Loss of cattle -> loss of livelihood -> loss of independence: Africans took low-paid work under compulsion of hunger. Economic and biological forces worked together for conquest.',
  },
  {
    nodeId: 'c10_hist_cbse_03_004',
    q: 'Indentured Indian labourers (girmits) worked mainly in...',
    options: [
      'caribbean and Pacific plantations and mines -- Mauritius, Fiji, Trinidad, Guyana, Surinam, and tea estates of Assam and Ceylon; their descendants kept festivals (Hosay), music and words that survive today',
      'British factories in Manchester only',
      'Chinese silk farms only',
      'no real destinations; the trade was imaginary'
    ],
    answer: 0,
    why: 'About 150 million people migrated in the 19th century -- the largest peaceful migration in history to that point. The "girmitiyas" signed contracts they often could not read; the living memory is cultural: Ramayana recitations, Hosay/ Muharram processions, chutney music in Trinidad.',
  },
  {
    nodeId: 'c10_hist_cbse_03_005',
    q: 'Why is the 19th century called the age of a "triple-flow" global economy?',
    options: [
      'flow of TRADE (goods), flow of CAPITAL (London financing railways/plantations) and flow of LABOUR (mass migration) -- all three together knit a truly global economy',
      'flow of gold, silver and copper only',
      'flow of ideas, germs and armies',
      'three different railway companies'
    ],
    answer: 0,
    why: 'By 1891 an economist could call the world a "vast interlocking machine". Britain was the hub: manufacturers out, capital out, raw materials and food in -- with India as both a market (for cloth) and a financier (home charges) of the empire.',
  },
  {
    nodeId: 'c10_hist_cbse_03_006',
    q: 'The Great Depression (1929) hit Indian peasants especially hard because...',
    options: [
      'agricultural prices collapsed while government revenue demands stayed fixed -- peasant debts rose, gold was sold to pay dues, and rural India grew poorer even as the price fall briefly made British imports cheaper',
      'Indian farmers owned shares on Wall Street',
      'the depression never touched Asia at all',
      'prices rose during the depression for farmers'
    ],
    answer: 0,
    why: 'Depressions punish the countryside most: farm prices fall harder than manufactured prices. Colonial refusal to lower revenue made it worse -- the economic pain fed the national movement, linking economics to politics (the chapter\'s core lesson).',
  },
  {
    nodeId: 'c10_hist_cbse_03_007',
    q: 'The Bretton Woods conference (1944) created...',
    options: [
      'a dollar-anchored fixed exchange rate system plus the IMF (balance-of-payments support) and the World Bank (reconstruction and development) -- designed to avoid repeating 1930s collapse',
      'the United Nations Security Council',
      'the East India Company',
      'a single world currency still used today'
    ],
    answer: 0,
    why: 'Lessons of the Depression: competitive devaluations and tariffs strangled trade, so the victors built rules. The US dominated the institutions (largest quotas); the golden age (1950s-60s) delivered unprecedented Western growth -- while the developing world later demanded the NIEO for fairer terms.',
  },
  {
    nodeId: 'c10_hist_cbse_03_008',
    q: 'The NIEO (New International Economic Order) demanded...',
    options: [
      'that developing countries control their natural resources, get fairer prices for raw exports and more development assistance -- pushed through UNCTAD in 1972 by newly decolonised nations',
      'a return to colonial rule',
      'the abolition of all national governments',
      'free movement of capital only, no resource rights'
    ],
    answer: 0,
    why: 'Most developing countries had gained independence by the 1950s-60s but faced falling raw-material prices and rising import costs. NIEO was their collective answer -- the "globalisation of voices" that reshaped debates on aid, trade rules and sovereignty.',
  },
  {
    nodeId: 'c10_hist_cbse_03_001',
    q: 'Which two mountain passes linked India to the silk-route world, and why are Roman gold coins found in south India?',
    options: [
      'The Khyber and Bolan passes through the Hindu Kush; Roman coins flowed in because Roman demand for Indian pepper, textiles and gems drained Roman gold westward-to-eastward along the sea routes -- historians call it a "gold drain" on Rome',
      'The Silk route entered via the Alps; Romans paid in paper currency',
      'Khyber and Bolan connect China to Japan',
      'No trade goods ever reached south India before 1500 CE'
    ],
    answer: 0,
    why: 'Assess "the silk routes should be renamed silk ROUTES (plural) of the SEA": land and sea branches formed a mesh -- the Kushana Empire (1st-3rd century CE) controlled the land routes through the passes and fostered Buddhism\'s travel; sailors used monsoon winds on the sea lanes. Decline was gradual (14th-15th century shifts of power, sea-route rise), not a single collapse.',
  },
  {
    nodeId: 'c10_hist_cbse_03_003',
    q: 'What economic motive drove late-19th-century colonisation, and why did the Berlin Conference (1884-85) happen?',
    options: [
      'Industrial Europe needed cheap raw materials (cotton, rubber, minerals), food grains and captive markets for manufactures -- plus outlets for surplus capital; the Berlin Conference partitioned Africa among European powers with maps and rules, WITHOUT a single African present, to avoid wars among themselves',
      'Purely religious missions with no economic interest',
      'Africans invited the powers to divide their continent',
      'Colonisation aimed to raise African wages'
    ],
    answer: 0,
    why: 'Compare with British rule in India: India became the biggest captive market for Manchester cloth (ruining handloom weavers) plus a supplier of raw cotton, and later a capital exporter ("home charges"). Cause-effect chain: industrial demand -> conquest -> raw material + market + labour control (rinderpest, taxes payable in cash) -> de-industrialisation -> dependence. Colonialism was economically DRIVEN, even when justified in civilising language.',
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

export default C10_HistoryMakingOfGlobalWorldSim;
