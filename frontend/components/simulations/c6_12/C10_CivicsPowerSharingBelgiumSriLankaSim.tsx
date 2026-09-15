'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 10 Civics -- Power Sharing (Chapter 1)
 * Representation arithmetic lab: set a country's community population
 * shares, pick a seat-allocation rule (majoritarian vs consociational),
 * and read the honest computed consequences for representation, tension
 * and stability. Belgium and Sri Lanka presets included.
 * Self-contained: react + tailwind only. All numbers are deterministic.
 */

type Rule = 'majoritarian' | 'consociational' | 'federal';

const BELGIUM = { dutch: 59, french: 40, german: 1 };
const SRI_LANKA = { sinhala: 74, tamil: 26 }; // Sri Lankan Tamils + Indian Tamils

export function C10_CivicsPowerSharingBelgiumSriLankaSim() {
  const [groupA, setGroupA] = useState(59); // majority community %
  const [groupB, setGroupB] = useState(41); // rest, auto-adjusted
  const [rule, setRule] = useState<Rule>('majoritarian');
  const [capitalMinority, setCapitalMinority] = useState(80); // Brussels-style French-speaking %
  const [vetoEnabled, setVetoEnabled] = useState(true);

  const seats = useMemo(() => {
    if (rule === 'majoritarian') {
      // winner-take-almost-all: majority sweeps ~93% of seats
      return { a: Math.min(100, Math.round(groupA * 1.6)), b: 100 - Math.min(100, Math.round(groupA * 1.6)) };
    }
    if (rule === 'consociational') {
      // Belgium model: seats proportional, plus community veto, plus a central
      // government with equal ministers from each community
      return { a: groupA, b: 100 - groupA };
    }
    // federal: units get fixed equal representation regardless of population
    return { a: 50, b: 50 };
  }, [rule, groupA]);

  // Prudential index: how safe the minority feels (0-100). Higher = calmer.
  const tension = useMemo(() => {
    const underRep = seats.a - groupA; // how much the majority is over-represented
    const capitalDanger = rule === 'majoritarian' ? Math.max(0, capitalMinority - 50) : Math.min(25, capitalMinority - 50);
    let t = 0;
    t += underRep * 1.6;
    t += capitalDanger * 0.8;
    t += rule === 'majoritarian' ? 30 : 0;
    t += rule === 'consociational' && vetoEnabled ? -25 : 0;
    t += rule === 'federal' ? -10 : 0;
    return Math.max(0, Math.min(100, Math.round(t)));
  }, [seats, groupA, rule, capitalMinority, vetoEnabled]);

  const verdict =
    tension >= 75 ? 'HIGH RISK of civil war / partition demands' :
    tension >= 45 ? 'Unstable -- majoritarian resentment building up' :
    tension >= 20 ? 'Workable -- power sharing holding the country together' :
    'Stable and inclusive';

  const seatA = Math.min(96, seats.a);
  const seatB = 100 - seatA;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-cyan-950/80 rounded-2xl border border-cyan-700">⚖️</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Class 10 Civics -- Power Sharing</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Majoritarianism vs Consociational Arithmetic</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Population of the two communities (auto-balanced to 100%)
            </p>
            <div className="flex items-end gap-4 h-40 px-2">
              <div className="flex-1 flex flex-col items-center justify-end h-full">
                <span className="text-[11px] font-mono text-amber-300 mb-1">{groupA}%</span>
                <div className="w-full bg-amber-500/80 rounded-t-lg border border-amber-600" style={{ height: `${groupA}%` }} />
                <span className="text-[10px] text-slate-400 mt-1">Community A (majority)</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-end h-full">
                <span className="text-[11px] font-mono text-sky-300 mb-1">{groupB}%</span>
                <div className="w-full bg-sky-500/80 rounded-t-lg border border-sky-600" style={{ height: `${groupB}%` }} />
                <span className="text-[10px] text-slate-400 mt-1">Community B (minority)</span>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Community A population share</span>
                <span className="font-mono text-amber-300">{groupA}%</span>
              </div>
              <input type="range" min={50} max={95} value={groupA} aria-label="majority population share"
                onChange={(e) => { const v = Number(e.target.value); setGroupA(v); setGroupB(100 - v); }}
                className="w-full accent-amber-500" />
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Seats won under the chosen rule (100-seat parliament)</p>
            <div className="h-10 w-full rounded-xl overflow-hidden flex border border-slate-700">
              <div className="bg-amber-500 flex items-center justify-center text-xs font-black text-slate-950" style={{ width: `${seatA}%` }}>{seatA}</div>
              <div className="bg-sky-500 flex items-center justify-center text-xs font-black text-slate-950" style={{ width: `${seatB}%` }}>{seatB}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <button onClick={() => setRule('majoritarian')}
                className={`py-2 rounded-xl text-[11px] font-bold ${rule === 'majoritarian' ? 'bg-rose-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Majoritarian (Sri Lanka style)
              </button>
              <button onClick={() => setRule('consociational')}
                className={`py-2 rounded-xl text-[11px] font-bold ${rule === 'consociational' ? 'bg-emerald-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Consociational (Belgium style)
              </button>
              <button onClick={() => setRule('federal')}
                className={`py-2 rounded-xl text-[11px] font-bold ${rule === 'federal' ? 'bg-indigo-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Federal equal units
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
              {rule === 'majoritarian' && 'Rule of the majority community ALONE: winner takes the state, minority language/religion sidelined (Sri Lanka 1956: Sinhala Only Act, preferential policies, civil war).'}
              {rule === 'consociational' && 'Belgium model: proportional representation, a community government elected by one language community, EQUAL ministers from Dutch and French in the centre, and (toggle below) a minority veto on special-majority laws.'}
              {rule === 'federal' && 'Federal sharing: power divided between levels of government (vertical division), each unit sends equal representatives -- United States style Senate.'}
            </p>
            {rule === 'consociational' && (
              <button onClick={() => setVetoEnabled((v) => !v)}
                className={`mt-2 w-full py-2 rounded-xl text-[11px] font-bold ${vetoEnabled ? 'bg-emerald-700' : 'bg-slate-800'}`}>
                Community veto on cultural/education laws: {vetoEnabled ? 'ON (majority of 2/3 needs support of both communities)' : 'OFF'}
              </button>
            )}
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-cyan-800/60 p-4 space-y-2">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Capital-city minority share (Brussels: French-speaking {capitalMinority}%)</span>
                <span className="font-mono text-cyan-300">{capitalMinority}%</span>
              </div>
              <input type="range" min={50} max={95} value={capitalMinority} aria-label="capital minority share"
                onChange={(e) => setCapitalMinority(Number(e.target.value))} className="w-full accent-cyan-500" />
              <p className="text-[10px] text-slate-500">Brussels puzzle: Dutch-majority country, French-majority capital -- solved by a separate Brussels government with TWO communities as equal partners.</p>
            </div>
            <div className="flex items-center gap-4 bg-slate-950 rounded-xl p-3 border border-slate-800">
              <div className="text-center">
                <p className="text-[10px] text-slate-500 uppercase">Tension index</p>
                <p className={`font-mono text-3xl font-black ${tension >= 75 ? 'text-rose-400' : tension >= 45 ? 'text-amber-300' : 'text-emerald-300'}`}>{tension}</p>
              </div>
              <p className={`text-sm font-bold ${tension >= 75 ? 'text-rose-300' : tension >= 45 ? 'text-amber-200' : 'text-emerald-200'}`}>{verdict}</p>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">
              computed: overrepresentation {Math.round(seatA - groupA)} pts x 1.6 + capital danger {Math.max(0, capitalMinority - 50)} x 0.8 + rule modifiers {(rule === 'majoritarian' ? 30 : rule === 'federal' ? -10 : vetoEnabled ? -25 : 0)}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => { setGroupA(BELGIUM.dutch); setGroupB(100 - BELGIUM.dutch); setCapitalMinority(80); setRule('consociational'); setVetoEnabled(true); }}
                className="py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-emerald-800 transition">
                Preset: Belgium 59/40
              </button>
              <button onClick={() => { setGroupA(SRI_LANKA.sinhala); setGroupB(100 - SRI_LANKA.sinhala); setCapitalMinority(80); setRule('majoritarian'); }}
                className="py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-rose-900 transition">
                Preset: Sri Lanka 74/26
              </button>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed">
              <p className="font-bold text-cyan-300 mb-1">Prudential vs Moral reasons for power sharing</p>
              <p className="text-slate-400 text-[11px]">PRUDENTIAL: it reduces conflict -- power shared is stability bought (Belgium avoided Sri Lanka's civil war). MORAL: it is the very spirit of democracy -- people are affected by decisions, so they must govern through legitimate institutions.</p>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed">
              <p className="font-bold text-cyan-300 mb-1">Four forms of power sharing</p>
              <ol className="text-slate-400 text-[11px] list-decimal pl-4 space-y-0.5">
                <li>Horizontal: legislature, executive, judiciary check each other (legal/constitutional)</li>
                <li>Vertical: levels of government -- union, state, local (people elect each level)</li>
                <li>Social groups: religious/linguistic -- Belgium's community government</li>
                <li>Parties & pressure groups: competition, coalitions, interest sharing</li>
              </ol>
            </div>
            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/60 text-[11px] text-cyan-200 leading-relaxed">
              <span className="font-bold">Misconception killer:</span> &quot;Power sharing weakens the nation.&quot; The computed tension index shows the opposite -- the MAJORITARIAN route maximises one group's seats while pushing tension toward civil war (Sri Lanka, 1983-2009), while the consociational route costs the majority a few seats and buys decades of peace (Belgium). Prudential arithmetic: ~93 seats + 90 tension, or ~59 seats + ~10 tension.
            </div>
          </div>

          <DepthDrill />
        </div>
      </div>
    </div>
  );
}

// ─── Class 10 board-depth drill bank (Chapter 1: Power Sharing) ───
interface DepthQuizItem {
  nodeId: string;
  q: string;
  options: string[];
  answer: number;
  why: string;
}

const DEPTH_QUIZ: DepthQuizItem[] = [
  {
    nodeId: 'c10_civ_cbse_01_001',
    q: 'Belgium\'s ethnic composition: which figures are correct?',
    options: [
      '59% Dutch (Flemish region), 40% French (Wallonia), 1% German -- but the capital Brussels has 80% French speakers',
      '80% Sinhala, 18% Tamil',
      '54% Sinhala, 18% Indian Tamils',
      '59% French and 40% Dutch, with a Dutch-majority capital'
    ],
    answer: 0,
    why: 'The Brussels twist is the whole point: a French-majority capital sits inside a Dutch-majority Flanders region -- the accommodation design gave Brussels its own elected government with equal Dutch and French ministers.',
  },
  {
    nodeId: 'c10_civ_cbse_01_002',
    q: 'Sri Lanka\'s majoritarian measures after 1956 included all EXCEPT...',
    options: [
      'A separate elected Tamil state government with veto powers',
      'Sinhala as the sole official language (1956 Act)',
      'Preferential university and government-job policies for Sinhala applicants',
      'A new constitution protecting and championing Buddhism',
    ],
    answer: 0,
    why: 'Sri Lanka went the MAJORITARIAN route: recognition of Sinhala only, preferential policies, state protection of Buddhism -- and NO regional autonomy for Tamils. The consequence: distrust, Tamil party demands for independence (Eelam), and a civil war (1983-2009) killing thousands.',
  },
  {
    nodeId: 'c10_civ_cbse_01_003',
    q: 'Which reason for power sharing is called PRUDENTIAL and which MORAL?',
    options: [
      'Prudential: it reduces the likelihood of conflict and produces better outcomes; moral: it is the democratic spirit -- all are affected, all should share power',
      'Prudential: it is required by God; moral: it saves money',
      'Prudential: majorities deserve to rule; moral: minorities should obey',
      'Both mean the same thing in the textbook'
    ],
    answer: 0,
    why: 'Prudential = calculated, self-interested wisdom (Belgium avoided war). Moral = intrinsic value of democracy (legitimate government). Board answers must give ONE example of each.',
  },
  {
    nodeId: 'c10_civ_cbse_01_004',
    q: 'Match the form of power sharing: (i) legislature-executive-judiciary, (ii) union-state-local, (iii) religious/linguistic groups, (iv) parties and pressure groups.',
    options: [
      '(i) horizontal distribution, (ii) vertical (federal) division, (iii) sharing among social groups, (iv) sharing among political parties, interest groups and movements',
      '(i) vertical, (ii) horizontal, (iii) party-based, (iv) community-based',
      'All four are forms of majoritarianism',
      '(i) is despotic because organs are unequal'
    ],
    answer: 0,
    why: 'Horizontal = organs at the SAME level checking each other (judges appointed vs legislature law-making; each organ limits the others). Vertical = DIFFERENT levels, each elected by the people. Belgium\'s community government = social; coalition governments = party-based.',
  },
  {
    nodeId: 'c10_civ_cbse_01_005',
    q: 'Why is horizontal distribution of power called a system of CHECKS AND BALANCES?',
    options: [
      'Each organ examines and limits the others: the legislature can pass laws but courts can declare them unconstitutional; ministers are answerable to Parliament -- no single organ wields unlimited power',
      'Because all three organs always agree after checking',
      'Because the judiciary appoints the legislature',
      'Because only the executive is checked by anyone'
    ],
    answer: 0,
    why: 'Horizontal sharing creates a balance so that power is not concentrated in one organ -- autocracy is checked even though organs may belong to the same party (India vs the USA\'s stricter separation).',
  },
  {
    nodeId: 'c10_civ_cbse_01_006',
    q: 'What made the Belgian model unusual among democracies?',
    options: [
      'A community government elected by ONE language community (Dutch, French or German) with power over culture, education and language issues -- plus equal Dutch/French ministers in the central government and special-majority laws needing both communities\' support',
      'A king with absolute power over all regions',
      'Abolition of all community-based representation',
      'A single national language imposed by law'
    ],
    answer: 0,
    why: 'Four key elements: (1) equal ministers from Dutch and French communities in the centre, (2) Brussels two-community government, (3) community government for culture/education, (4) constitutional special majority + no single-community decision. Constitution amended FOUR times (1970-1993) to reach this.',
  },
  {
    nodeId: 'c10_civ_cbse_01_007',
    q: 'The Sri Lankan Tamils demanded... and when the demand was repeatedly denied...',
    options: [
      'Recognition of Tamil as an official language, regional autonomy, then EQUALITY of opportunity; denial pushed parties to demand a separate state (Tamil Eelam) and armed struggle -- LTTE vs government forces, civil war till 2009',
      'Immediate migration to India; which was granted peacefully',
      'A monarchy; which the Dutch king accepted',
      'More Sinhala schools; which ended all conflict'
    ],
    answer: 0,
    why: 'The escalation ladder is the exam favourite: distrust -> party demands -> autonomy demand -> separate country (Eelam) -> civil war. Prudential lesson: timely power sharing is cheaper than war and reconciliation.',
  },
  {
    nodeId: 'c10_civ_cbse_01_008',
    q: 'Lebanon (2005-2008) example shows the same lesson -- which one?',
    options: [
      'A diverse country needs power sharing across its communities; when the balance broke (President/PM/Parliament mismatched among Maronite, Sunni, Shia), conflict resumed -- diversity without accommodation breeds conflict',
      'Lebanon proves only majorities should govern',
      'Lebanon had no diversity and no conflict',
      'The military should rule diverse countries'
    ],
    answer: 0,
    why: 'One-third each of Maronite Christians, Sunni and Shia Muslims -- power shared by a fixed formula. When the formula\'s balance failed, Lebanon slipped back into conflict: the same prudential logic as Belgium vs Sri Lanka, computed live in the tension index.',
  },
  {
    nodeId: 'c10_civ_cbse_01_005',
    q: 'What are the three lists of the Seventh Schedule of the Indian Constitution, and why does "Education" sit on the Concurrent List?',
    options: [
      'Union List (defence, foreign affairs -- only Parliament legislates), State List (police, agriculture -- normally states), Concurrent List (education, forests, marriage -- both can legislate, Union law prevails in conflict). Education is Concurrent because a national standard and State-level delivery must cooperate',
      'Union, State and Private lists; education is Union-only',
      'There are only two lists; education is on the State List exclusively',
      'The Schedule lists religions allowed in each state'
    ],
    answer: 0,
    why: 'The Seventh Schedule (Article 246) is vertical power sharing in table form. Residuary subjects (like cyber law) go to the Union. Evaluate: "the Indian Constitution enables only the Union to decide everything" is FALSE -- states legislate on 60+ State List subjects, and local bodies add a third elected tier.',
  },
  {
    nodeId: 'c10_civ_cbse_01_005',
    q: 'A State Government wants to regulate a subject on the Concurrent List that conflicts with a central law. What happens?',
    options: [
      'States may still legislate, but if a Union law on the Concurrent subject conflicts, the Union law PREVAILS (Article 254); the constitutional status of Union and State governments is otherwise equal in their own spheres -- each directly elected by the people',
      'States must wait for presidential permission to pass any law',
      'The state law automatically overrides the central law',
      'Concurrent subjects can be legislated only by district panchayats'
    ],
    answer: 0,
    why: 'Both levels derive authority directly from the Constitution -- the Union is not the "boss" of a legal hierarchy but a partner with enumerated strengths (defence, currency) and shared subjects with a tie-break rule. Draft-a-new-Concurrent-entry (e.g. disaster management) shows how the list evolves by constitutional amendment.',
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

export default C10_CivicsPowerSharingBelgiumSriLankaSim;
