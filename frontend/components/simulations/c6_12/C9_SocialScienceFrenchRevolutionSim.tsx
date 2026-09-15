'use client';
/**
 * C9_SocialScienceFrenchRevolutionSim (Class 9 Social Science)
 *
 * ELI5: The Revolution was a PRESSURE problem: bread eating most of a
 * worker's wage, a crown drowning in war debt, one estate paying the taxes
 * and a voting rule that let nobles block every reform. Set the dials and
 * watch 1789 unlock, event by event.
 */
import React, { useState } from 'react';

const WAGE = 30; // sous per day, unskilled Paris worker
const EVENTS = [
  { at: 25, label: '5 May 1789', text: 'Estates-General summoned at Versailles -- first call since 1614' },
  { at: 40, label: '17 Jun 1789', text: 'Third Estate declares itself the National Assembly' },
  { at: 52, label: '20 Jun 1789', text: 'Tennis Court Oath: never separate until France has a constitution' },
  { at: 65, label: '14 Jul 1789', text: 'Paris crowds storm the Bastille' },
  { at: 78, label: '4 Aug 1789', text: 'Assembly abolishes feudal privileges and church tithes' },
  { at: 90, label: '1791', text: 'Constitution limits the monarchy; France becomes a constitutional monarchy' },
];

// ─── Class 10 board-depth drill bank (Nationalism in Europe diagnostics) ───
// See backend/its/competency/CLASS10_NODE_DEPTH.json. Static and deterministic.
interface DepthQuizItem {
  nodeId: string;
  q: string;
  options: string[];
  answer: number;
  why: string;
}

const DEPTH_QUIZ: DepthQuizItem[] = [
  {
    nodeId: 'c10_hist_cbse_01_001',
    q: 'In which year did the French Revolution begin, and what is its symbolic start?',
    options: [
      '1789 -- the storming of the Bastille fortress-prison on 14 July 1789',
      '1791 -- the execution of the king',
      '1804 -- Napoleon crowns himself emperor',
      '1815 -- the Congress of Vienna',
    ],
    answer: 0,
    why: '1789: Estates-General (May), National Assembly and Tennis Court Oath (June), Bastille (14 July). The revolutionaries replaced royal symbols with national ones -- the tricolour flag, the Marseillaise anthem, uniforms -- to make citizens feel they belonged to the NATION, not to the king. New principle: sovereignty resides in the nation, not in the monarch; the citizen (not the subject) now owns the state.',
  },
  {
    nodeId: 'c10_hist_cbse_01_001',
    q: 'Assess: "The French Revolution created the modern nation-state but excluded women and slaves from full citizenship."',
    options: [
      'Largely true -- the Declaration of the Rights of Man spoke of "male citizens"; women marched to Versailles yet got the vote only in 1946 in France, and slavery in the colonies was abolished only in 1848 after revolts in Haiti/Martinique',
      'False -- women voted from 1792 and slaves were free from 1789',
      'True but irrelevant -- France had no colonies',
      'False -- the Revolution had nothing to do with citizenship',
    ],
    answer: 0,
    why: 'The ideas of liberty and democratic rights were the revolution\'s greatest legacy, but their application was restricted. Olympe de Gouges demanded equal rights and was executed; Napoleon reintroduced slavery in the colonies in 1804. The nation-state idea spread with an exclusions problem built in.',
  },
  {
    nodeId: 'c10_hist_cbse_01_002',
    q: 'The 1804 legal document that standardised civil law across France and conquered territories, and why the aristocracy still hated it:',
    options: [
      'The Napoleonic Code -- it abolished all privileges by birth, established equality before the law and secured the right to property; aristocrats lost their feudal privileges and birth-based status',
      'The Declaration of Rights -- it taxed only nobles; they hated losing taxes',
      'The Concordat -- it made France Protestant',
      'The Congress system -- it dissolved the French empire',
    ],
    answer: 0,
    why: 'Napoleonic Code (1804): equality before law, no privileges by birth, right to property protected, simplified administrative divisions, weights and measures decimalised. Paradox: it exported French laws (administrative uniformity) WITHOUT French liberty -- conquered peoples like the Poles got the Code plus censorship, conscription and taxation, which is why Hobsbawm could still call it the most effective propaganda for nationalism: local groups admired the laws and resented the ruler at once.',
  },
  {
    nodeId: 'c10_hist_cbse_01_003',
    q: 'What did the European middle class primarily advocate for national unity in the German states before 1848?',
    options: [
      'Economic union -- a customs union or Zollverein abolishing tariff barriers among German states (completed 1834), alongside elected assemblies and freedom of markets',
      'Restoration of the Holy Roman Empire',
      'Rule by the Habsburg emperor',
      'Abolition of all German languages except French',
    ],
    answer: 0,
    why: 'Liberal-nationalism for the educated, middle-class bourgeoisie = constitutional government + free markets. The Zollverein welded 39 states into one economic space by rail and tariff-free trade. Yet the same middle class often OPPOSED universal male suffrage in 1848 -- they wanted property rights first, which is why the Frankfurt parliament (women-only-gallery "liberals" and property qualifications) split and failed.',
  },
  {
    nodeId: 'c10_hist_cbse_01_004',
    q: 'The primary political goal of the Congress of Vienna (1815) regarding the map of Europe:',
    options: [
      'Restore the monarchies overthrown by Napoleon and create a conservative order -- redraw borders so France is ringed by stronger states (Netherlands, Prussia got Rhineland, Austria got northern Italy)',
      'Unify Germany and Italy into nation-states',
      'Guarantee constitutions for every European state',
      'Colonise Africa jointly',
    ],
    answer: 0,
    why: 'Hosted by Austrian chancellor Metternich: the Bourbon dynasty restored in France, balance-of-power buffer states around it. Conservatism meant: established churches, hereditary monarchy, no constitutions, censorship. Censorship laws of 1815 gagged newspapers, books, plays and songs celebrating liberty -- pushing liberals into secret societies and the uprisings of 1830 and 1848. The Carlsbad Decrees (1819) then crushed student nationalism (Burschenschaften) -- a turning point in conservative vs liberal conflict.',
  },
  {
    nodeId: 'c10_hist_cbse_01_005',
    q: 'Where did the Carbonari first emerge as a significant secret society, and why operate underground?',
    options: [
      'Italy (after 1815) -- censorship and repression by restored monarchies (and Austria) made open political parties impossible, so patriots used passwords, rituals and cells',
      'France in 1789 -- the Jacobins were a secret society',
      'Prussia in 1871 -- to prepare the empire proclamation',
      'England -- to protect factory owners',
    ],
    answer: 0,
    why: 'Post-1815 Italy: Carbonari revolts of 1820-21 (Naples, Piedmont) failed. The lesson learnt by Mazzini: secret conspiracies lacked a mass base and a clear programme, so he founded Young Italy (1831) -- an OPEN-style movement for a unified democratic republic. Mazzini, "the prophet of Italian unification", also founded Young Europe (Berlin, 1834) and inspired similar societies across Europe -- Metternich called him "the most dangerous enemy of our social order".',
  },
  {
    nodeId: 'c10_hist_cbse_01_006',
    q: 'Arrange the Italian unification story correctly:',
    options: [
      'Cavour becomes PM of Piedmont-Sardinia (1852) -> allies with France, provokes Austria into war 1859 -> Garibaldi\'s Thousand lands in Sicily 1860 -> Kingdom of Italy proclaimed 1861 -> Venetia 1866, Rome 1870',
      'Garibaldi frees Sicily first, then Cavour becomes PM, then Austria unifies Italy',
      'Italy was unified by the Congress of Vienna in 1815',
      'Mazzini became King of Italy in 1861',
    ],
    answer: 0,
    why: 'Diplomacy + revolution: Cavour engineered a war with Austria so France would fight on Piedmont\'s side (an ally, not an aggressor); he secretly accepted Garibaldi\'s conquest of the South to prevent a republic. "Unification complete in 1861" is FALSE -- Venetia came via the Austro-Prussian War of 1866 and Rome via the Franco-Prussian War of 1870, when French troops left the Pope.',
  },
  {
    nodeId: 'c10_hist_cbse_01_007',
    q: 'In which year and place was the German Empire proclaimed?',
    options: [
      '18 January 1871 -- the Hall of Mirrors, Palace of Versailles',
      '1848 -- Frankfurt parliament',
      '1866 -- Vienna',
      '1878 -- Berlin',
    ],
    answer: 0,
    why: 'Prussian victory over France completed Bismarck\'s three wars (Denmark 1864, Austria 1866, France 1870-71); William I (Kaiser) was proclaimed in Versailles -- deliberately rubbing defeat into France. Bismarck\'s strategy vs Cavour\'s: both used war + diplomacy for unification, but Bismarck unified Germany UNDER Prussian monarchy (a "revolution from above" that kept the monarchy and army supreme, betraying the 1848 liberal-constitutional dream), while Cavour operated through plebiscites and a constitutional monarchy. The Zollverein (1834) had already unified the ECONOMY; Prussia excluded Austria from it, weakening Austria before the 1866 war.',
  },
  {
    nodeId: 'c10_hist_cbse_01_008',
    q: 'The two most iconic attributes of Marianne, allegory of the French Republic, and the standard attributes of Germania:',
    options: [
      'Marianne: red cap (liberty) + tricolour (national identity), on coins and stamps; Germania: crown of oak leaves (heroism) + sword, breastplate, tricolour flag -- painted by Philipp Veit, hung in Frankfurt parliament',
      'Marianne: a lion; Germania: an eagle of Napoleon',
      'Marianne: crown of thorns; Germania: a steam engine',
      'Both were kings painted by Delacroix',
    ],
    answer: 0,
    why: 'Artists personified the Nation as a FEMALE figure because the nation was imagined as a mother/protector of citizens -- an abstraction given a human face that worked even for the illiterate (visual propaganda). Delacroix\'s "Liberty Leading the People" (1830) shows a militant, bare-breasted Marianne on the barricades; official Marianne (coins, stamps) is calm and institutional. Germania: oak-leaf crown, sword, breastplate, black-red-gold flag. Design an Indian allegory (Bharat Mata): sari/saree-clad mother figure, lion, lotus, flag -- Abanindranath Tagore painted Bharat Mata (1905).',
  },
  {
    nodeId: 'c10_hist_cbse_01_009',
    q: 'The Balkans became "the most serious source of nationalist tension in Europe" after 1871. Which sequence explains the slide to World War I?',
    options: [
      'Ottoman decline -> nationalist revolts + great-power rivalry -> Congress of Berlin 1878 revises San Stefano -> Bosnia annexation crisis 1908 -> Balkan Wars 1912-13 -> Sarajevo assassination 1914',
      'Germany invaded the Balkans in 1871 and the war started there',
      'The Congress of Vienna gave the Balkans to France',
      'Russia annexed Serbia peacefully in 1912',
    ],
    answer: 0,
    why: 'The disintegrating Ottoman Empire invited both Balkan nationalism (each state claiming territory on ethnicity/history) and great-power greed (Russia pan-Slavism backing Serbia; Austria-Hungary fearing South-Slav unity). The 1908 annexation of Bosnia-Herzegovina (administered by Austria since 1878) humiliated Serbia AND Russia (backed down, unready after 1905). Balkan Wars 1912-13 rehearsed trench warfare and great-power brinkmanship. Each crisis pushed alliances harder: Triple Alliance vs Triple Entente.',
  },
  {
    nodeId: 'c10_hist_cbse_01_010',
    q: 'Which conference revised the Treaty of San Stefano and recognised Serbia, Montenegro, Romania as independent?',
    options: [
      'The Congress of Berlin, 1878, chaired by Bismarck',
      'The Congress of Vienna, 1815',
      'The Frankfurt Parliament, 1848',
      'The Paris Peace Conference, 1919',
    ],
    answer: 0,
    why: 'Berlin 1878: Bismarck hosted; Russia\'s big-Bulgaria plan was cut down, Ottoman land was redistributed, and the new Balkan states were recognised -- but so was Austria-Hungary\'s right to "occupy and administer" Bosnia-Herzegovina, planting the Sarajevo time bomb. Evaluate: was Sarajevo (Franz Ferdinand, June 1914, killed by Gavrilo Princip) the INEVITABLE result of Balkan nationalism? It needed nationalism + alliance rigidity + great-power willingness to gamble -- contingency and structure both.',
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
    <div className="p-4 bg-slate-900/70 rounded-2xl border border-amber-800/60 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Board-depth drill (Nationalism in Europe)</p>
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

export function C9_SocialScienceFrenchRevolutionSim() {
  const [bread, setBread] = useState(14.5); // sous per 4-lb loaf
  const [debt, setDebt] = useState(4); // billion livres
  const [taxShare, setTaxShare] = useState(100); // % of direct taxes paid by Third Estate
  const [byHead, setByHead] = useState(false);

  const breadPct = Math.round((bread / WAGE) * 100);
  const interest = debt * 0.125; // ~12.5% service, half the budget at 4bn
  const pressure = Math.max(0, Math.min(100, Math.round(
    0.45 * breadPct + debt * 6 + taxShare * 0.2 + (byHead ? -4 : 8)
  )));
  const unlocked = EVENTS.filter((e) => pressure >= e.at);

  const reset = () => { setBread(14.5); setDebt(4); setTaxShare(100); setByHead(false); };
  const angle = -90 + (pressure / 100) * 180;
  const zone = pressure >= 78 ? 'text-rose-400' : pressure >= 52 ? 'text-amber-300' : 'text-emerald-300';

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">Class 9 History - The French Revolution</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Revolution Pressure Gauge: France, 1789</h1>
        </div>
        <button onClick={reset} className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold transition-all">Reset</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>Cost of a 4-lb loaf (daily wage: 30 sous)</span>
                <span className={`font-mono ${breadPct > 70 ? 'text-rose-400' : 'text-amber-300'}`}>{bread.toFixed(1)} sous = {breadPct}% of a day&apos;s wage</span>
              </label>
              <input type="range" min={8} max={30} step={0.5} value={bread} aria-label="bread price"
                onChange={(e) => setBread(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-rose-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>Royal war debt (American war, court spending)</span>
                <span className="font-mono text-amber-300">{debt.toFixed(1)} bn livres (interest {interest.toFixed(2)} bn/yr)</span>
              </label>
              <input type="range" min={0} max={5} step={0.5} value={debt} aria-label="debt"
                onChange={(e) => setDebt(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-amber-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>Direct taxes paid by the Third Estate</span>
                <span className="font-mono text-indigo-300">{taxShare}% of the total</span>
              </label>
              <input type="range" min={50} max={100} step={5} value={taxShare} aria-label="tax share"
                onChange={(e) => setTaxShare(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-indigo-500" />
            </div>
            <button onClick={() => setByHead((b) => !b)}
              className={`w-full min-h-11 rounded-xl text-xs font-bold border transition-all ${byHead ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-emerald-600'}`}>
              Estates-General voting: {byHead ? 'by HEAD (1 deputy, 1 vote)' : 'by ORDER (nobles + clergy can block)'}
            </button>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <p className="font-bold text-indigo-300 mb-1">France in three estates</p>
            <div className="flex items-end gap-2 h-16 mt-1">
              <div className="flex-1 bg-violet-800 rounded-t-lg relative" style={{ height: '18%' }}><span className="absolute -top-4 left-1 text-[9px]">Clergy ~1%</span></div>
              <div className="flex-1 bg-indigo-800 rounded-t-lg relative" style={{ height: '26%' }}><span className="absolute -top-4 left-1 text-[9px]">Nobles ~2%</span></div>
              <div className="flex-1 bg-emerald-700 rounded-t-lg relative" style={{ height: '100%' }}><span className="absolute -top-4 left-1 text-[9px]">Third Estate ~97% -- pays {taxShare}% of direct taxes</span></div>
            </div>
            <p className="text-[11px] text-slate-500 mt-4">The first two estates owned much land and paid almost no direct tax -- yet by the by-ORDER rule each held one vote, so 3% outvoted 97%.</p>
            <p className="text-[11px] text-slate-500 mt-1">Glossary: livre = French money unit; sans-culottes = &quot;without knee-breeches&quot;, the working poor of Paris; tithe = church tax.</p>
            <p className="text-[11px] text-slate-500 mt-1">Why nobles blocked reform: they paid almost no land tax -- any change by head-vote meant finally paying their share.</p>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-1">Where the pressure comes from</p>
            <p className="text-xs font-mono text-slate-200">bread {Math.round(0.45 * breadPct)} + debt {Math.round(debt * 6)} + taxes {Math.round(taxShare * 0.2)} + voting {byHead ? -4 : 8} = <span className={zone}>{pressure}</span></p>
            <p className="text-[11px] text-slate-500 mt-1">Each dial feeds the gauge -- cut any one and see which events drop back below their thresholds.</p>
            <p className="text-[11px] text-slate-500 mt-1">The nobles&apos; tax exemption was the spark: every reform plan died because two estates refused to pay.</p>
          </div>

          <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
            <span className="font-bold">Misconception killer:</span> the Third Estate was not suddenly poorer in 1789. Misery was OLD. What was new: a harvest-failure bread spike, a crown too broke to back down, and a voting rule that let 2% of the nation veto reform -- pressure, not just poverty. Add a failed monsoon (bread slider up) and watch even a moderate debt tip the gauge.
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 flex items-center gap-4">
            <svg viewBox="0 0 200 120" className="w-44">
              <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="#334155" strokeWidth="14" strokeLinecap="round" />
              <path d="M20 100 A80 80 0 0 1 100 20" fill="none" stroke="#10b981" strokeWidth="14" />
              <path d="M100 20 A80 80 0 0 1 160 55" fill="none" stroke="#f59e0b" strokeWidth="14" />
              <path d="M160 55 A80 80 0 0 1 180 100" fill="none" stroke="#f43f5e" strokeWidth="14" />
              <line x1="100" y1="100" x2="100" y2="34" stroke="#e2e8f0" strokeWidth="4"
                strokeLinecap="round" transform={`rotate(${angle} 100 100)`} style={{ transition: 'transform 300ms' }} />
              <circle cx="100" cy="100" r="6" fill="#e2e8f0" />
            </svg>
            <div>
              <p className="text-[11px] text-slate-400 uppercase tracking-wider">Revolution pressure</p>
              <p className={`font-mono text-4xl font-black ${zone}`}>{pressure}</p>
              <p className="text-xs text-slate-400 mt-1">{pressure < 52 ? 'grievances simmer, reform still possible' : pressure < 78 ? 'crowds move, authority collapsing' : 'the old order is finished'}</p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-violet-400">Event timeline (lights up when pressure crosses it)</p>
            {EVENTS.map((e) => {
              const on = pressure >= e.at;
              return (
                <div key={e.label} className={`p-2 rounded-lg border text-xs transition-all duration-500 ${on ? 'bg-emerald-950/50 border-emerald-700 text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                  <span className="font-bold">{e.label}:</span> {e.text} <span className="text-slate-500">(needs {e.at})</span>
                </div>
              );
            })}
            <p className="text-[11px] text-slate-400">{unlocked.length}/6 events triggered</p>
          </div>
        </div>
      </div>

      <DepthDrill />

      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
        <span className="text-slate-500 font-bold uppercase tracking-wider">Key words:</span>
        {['livre', 'tithe', 'Estates-General', 'National Assembly', 'Bastille', 'feudal privilege', 'constitution'].map((k) => (
          <span key={k} className="px-2 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">{k}</span>
        ))}
      </div>

      <footer className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-900/60 text-xs text-slate-200">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. With the 1789 defaults (14.5 sous, 4 bn, 100%), switch voting by ORDER to by HEAD -- how much does pressure drop, and why did nobles refuse exactly this?</p>
        <p className="mt-1">2. Try to reach the Bastille (65) using bread price alone -- then explain which TWO dials together carry the most pressure.</p>
      </footer>
    </div>
  );
}

export default C9_SocialScienceFrenchRevolutionSim;
