'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 10 Civics -- Political Parties (Chapter 4)
 * Coalition arithmetic and party-health lab: distribute 543 Lok Sabha
 * seats among parties, build a majority coalition, and score the four
 * recognised challenges facing parties (internal democracy, dynastic
 * succession, money and muscle power, meaningful choice).
 * Self-contained: react + tailwind only. Deterministic.
 */

interface Party {
  id: string;
  name: string;
  short: string;
  national: boolean;
  base: number; // baseline seat share weight
  internalDemocracy: number; // 0-100 health
  dynastic: number; // 0-100 dynastic control
  moneyPower: number; // 0-100 reliance on money/muscle
  ideology: string;
}

const PARTIES: Party[] = [
  { id: 'p1', name: 'Party A (national)', short: 'A', national: true, base: 240, internalDemocracy: 55, dynastic: 70, moneyPower: 75, ideology: 'Centrist, umbrella party' },
  { id: 'p2', name: 'Party B (national)', short: 'B', national: true, base: 142, internalDemocracy: 45, dynastic: 65, moneyPower: 70, ideology: 'Secular, coalition-of-regions' },
  { id: 'p3', name: 'Party C (national)', short: 'C', national: true, base: 93, internalDemocracy: 60, dynastic: 30, moneyPower: 65, ideology: 'Left, cadre based' },
  { id: 'p4', name: 'Party D (state)', short: 'D', national: false, base: 38, internalDemocracy: 40, dynastic: 75, moneyPower: 60, ideology: 'Regional identity + welfare' },
  { id: 'p5', name: 'Party E (state)', short: 'E', national: false, base: 30, internalDemocracy: 50, dynastic: 50, moneyPower: 55, ideology: 'Regional pride, federal demands' },
];

export function C10_CivicsPoliticalPartiesSim() {
  const [swing, setSwing] = useState(0); // -30..30 national swing
  const [coalition, setCoalition] = useState<string[]>(['p1']);

  const seats = useMemo(() => {
    const raw = PARTIES.map((p) => Math.max(2, p.base + (p.national ? swing : -swing * 0.6)));
    const total = raw.reduce((a, b) => a + b, 0);
    return PARTIES.map((p, i) => ({ ...p, seats: Math.round((raw[i] / total) * 543) }));
  }, [swing]);

  const coalitionSeats = seats.filter((p) => coalition.includes(p.id)).reduce((a, p) => a + p.seats, 0);
  const majority = coalitionSeats >= 272;

  const health = (p: Party) => Math.round((p.internalDemocracy + (100 - p.dynastic) + (100 - p.moneyPower)) / 3);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-orange-950/80 rounded-2xl border border-orange-700">🏛️</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Class 10 Civics -- Political Parties</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Coalition Arithmetic and Party Health Lab</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Seat allocation: 543 Lok Sabha seats</p>
            <div className="flex h-12 w-full rounded-xl overflow-hidden border border-slate-700">
              {seats.map((p, i) => (
                <button key={p.id} onClick={() => setCoalition((c) => (c.includes(p.id) ? c.filter((x) => x !== p.id) : [...c, p.id]))}
                  title={`${p.name}: ${p.seats} seats -- click to add/remove from coalition`}
                  className={`h-full flex flex-col items-center justify-center text-[10px] font-black transition ${coalition.includes(p.id) ? 'text-slate-950' : 'text-slate-200'}`}
                  style={{
                    width: `${(p.seats / 543) * 100}%`,
                    backgroundColor: coalition.includes(p.id)
                      ? ['#f59e0b', '#10b981', '#38bdf8', '#a78bfa', '#fbbf24'][i]
                      : '#1e293b',
                  }}>
                  <span>{p.short}</span>
                  <span className="font-mono">{p.seats}</span>
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Click a party block to add/remove it from the proposed coalition.</p>
            <div className="mt-3">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>National swing (toward Party A / toward state parties)</span>
                <span className="font-mono text-amber-300">{swing > 0 ? '+' : ''}{swing}</span>
              </div>
              <input type="range" min={-30} max={30} value={swing} aria-label="national swing"
                onChange={(e) => setSwing(Number(e.target.value))} className="w-full accent-amber-500" />
            </div>
            <div className={`mt-3 rounded-xl px-4 py-3 border text-sm font-bold ${majority ? 'bg-emerald-950/60 border-emerald-600 text-emerald-200' : 'bg-rose-950/50 border-rose-700 text-rose-200'}`}>
              Coalition: {coalitionSeats} seats -- {majority ? `MAJORITY (272 needed; +${coalitionSeats - 272} spare)` : `SHORT of 272 by ${272 - coalitionSeats}; hung parliament -> coalition bargaining`}
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Party health scores (the four challenges, computed)</p>
            <div className="space-y-2">
              {seats.map((p) => (
                <div key={p.id} className="flex items-center gap-2 text-[11px]">
                  <span className="w-5 font-black text-slate-300">{p.short}</span>
                  <span className="w-40 text-slate-400 truncate">{p.ideology}</span>
                  <div className="flex-1 h-3 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
                    <div className={`h-full ${health(p) >= 50 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${health(p)}%` }} />
                  </div>
                  <span className={`font-mono font-bold ${health(p) >= 50 ? 'text-emerald-300' : 'text-rose-300'}`}>{health(p)}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 mt-2 font-mono">health = (internal democracy + (100 - dynasty) + (100 - money/muscle)) / 3</p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 text-xs text-slate-300 leading-relaxed space-y-3">
            <div>
              <p className="font-bold text-orange-300 mb-1">What parties do (functions)</p>
              <ul className="text-slate-400 text-[11px] list-disc pl-4 space-y-0.5">
                <li>Contest elections, put forward POLICIES and programmes</li>
                <li>Prepare a slate of leaders (recruit, train, choose)</li>
                <li>Make laws: parties pass laws -- legislature votes on party lines</li>
                <li>Form and run governments; opposition shapes debate</li>
                <li>Mechanism of public opinion: movements turn into parties (e.g. a welfare movement becoming a regional party)</li>
                <li>Access to government welfare and schemes via party workers</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-orange-300 mb-1">Recognition (Election Commission)</p>
              <p className="text-slate-400 text-[11px]">NATIONAL party: 6% votes in 4+ states AND 4 Lok Sabha seats, or recognition in 4 states. STATE party: 6% votes + 2 seats in the state, or 3% of assembly seats. Registered-but-unrecognised parties exist in thousands.</p>
            </div>
            <div>
              <p className="font-bold text-orange-300 mb-1">Reforms proposed</p>
              <ul className="text-slate-400 text-[11px] list-disc pl-4 space-y-0.5">
                <li>Anti-defection law (52nd/91st Amendment): disqualification for switching parties</li>
                <li>Affidavit of assets and criminal cases before elections</li>
                <li>Mandatory audit and Election Commission oversight of donations</li>
                <li>Internal democracy: regular, open party elections (a proposal, not law)</li>
                <li>Quota for women candidates (a proposal, not law)</li>
              </ul>
            </div>
            <div className="p-3 rounded-xl bg-orange-950/40 border border-orange-800/60 text-[11px] text-orange-200 leading-relaxed">
              <span className="font-bold">Misconception killer:</span> &quot;Parties are a necessary evil we would be better off without.&quot; Try running the lab with zero parties: every candidate stands alone, no common programme, no accountability collective, no stable majority -- representative democracy cannot aggregate 90 crore voters without parties. The honest verdict: parties are a NECESSITY; the reform fight is over their health (internal democracy, dynasty, money), not their existence.
            </div>
          </div>

          <DepthDrill />
        </div>
      </div>
    </div>
  );
}

// ─── Class 10 board-depth drill bank (Chapter 4: Political Parties) ───
interface DepthQuizItem {
  nodeId: string;
  q: string;
  options: string[];
  answer: number;
  why: string;
}

const DEPTH_QUIZ: DepthQuizItem[] = [
  {
    nodeId: 'c10_civ_cbse_04_001',
    q: 'What is a political party?',
    options: [
      'A group of people who come together to contest elections and hold power in government, agreeing on some policies and programmes for society',
      'Any crowd gathered at a political rally',
      'A government department that conducts elections',
      'A court that judges disputes between politicians'
    ],
    answer: 0,
    why: 'Three parts: organisation + contesting elections + shared policies/programmes. Parties are the link between society and government -- they aggregate millions of preferences into a governable programme.',
  },
  {
    nodeId: 'c10_civ_cbse_04_002',
    q: 'Which of these is NOT a function of political parties?',
    options: [
      'Filling public offices through their own unelected nominations without elections',
      'Contesting elections and putting forward policies and programmes',
      'Making and shaping laws in the legislature',
      'Playing the role of the opposition when out of power'
    ],
    answer: 0,
    why: 'Parties do fill offices -- but THROUGH elections (they select candidates, the voters decide). The other three are core functions: law-making, forming/running governments and opposition, shaping public opinion and providing access to welfare.',
  },
  {
    nodeId: 'c10_civ_cbse_04_003',
    q: 'A party system is called a MULTI-party system when...',
    options: [
      'several parties compete, and often no single party wins a majority, so governments are formed by coalitions or alliances (India, and the 1989 onward era of coalitions at the centre)',
      'one party is legally allowed and others banned',
      'exactly two parties alternate in power',
      'the army chooses which parties may exist'
    ],
    answer: 0,
    why: 'Three families: one-party (China), two-party (USA/UK roughly), multi-party (India). Multi-party systems allow diverse interests representation but demand coalition dharma -- common-minimum programmes and alliance coordination.',
  },
  {
    nodeId: 'c10_civ_cbse_04_004',
    q: 'Which pair names a national and a state party correctly, with the reason?',
    options: [
      'A party with 6% votes in four states plus 4 Lok Sabha seats is NATIONAL; a party recognised in one state (6% votes + 2 assembly seats, or 3% of seats) is a STATE party -- like a left national party vs a Dravidian regional party',
      'National = parties founded before 1947; state = founded later',
      'National = parties with the most MONEY; state = poor parties',
      'National = parties led by the PM; state = led by MLAs'
    ],
    answer: 0,
    why: 'Recognition is by the Election Commission on ELECTORAL PERFORMANCE, not age, money or leadership. Status matters: reserved symbols, free copies of electoral rolls, broadcast time -- and it can be LOST (several parties lost national status after poor performances).',
  },
  {
    nodeId: 'c10_civ_cbse_04_005',
    q: 'The challenge of dynastic succession means...',
    options: [
      'leadership passes within families, supporters without family connections lose fair advancement, and ordinary workers cannot rise -- it harms parties of ALL ideologies and is hardest to fix because the family controls the party machine',
      'kings still legally appoint Indian party leaders',
      'parties refuse to admit women dynasts',
      'dynasty is a problem only in monarchies'
    ],
    answer: 0,
    why: 'One of the four recognised challenges (with lack of internal democracy, money-muscle power, and lack of meaningful choice). The textbook challenge: even critics inside parties hesitate because the leader\'s family controls tickets and funds -- the reform conversation is unfinished.',
  },
  {
    nodeId: 'c10_civ_cbse_04_006',
    q: 'The anti-defection law was enacted because...',
    options: [
      'MLAs/MPs elected on one party ticket defected for ministerial posts or cash, toppling governments -- the law disqualifies legislators who switch parties (91st Amendment), though critics say it stiffles honest dissent',
      'defection is a sporting term',
      'it was designed to let leaders defect freely',
      'the Constitution always allowed unlimited party switching'
    ],
    answer: 0,
    why: 'Order-maintaining reform: the Speaker decides disqualification petitions. Evaluation note: it stabilised governments but concentrated power in high commands -- one reason internal democracy demands surfaced.',
  },
  {
    nodeId: 'c10_civ_cbse_04_007',
    q: 'Which reform is still only a PROPOSAL (not yet law)?',
    options: [
      'Making it compulsory for parties to hold open, regular internal elections and maintain registers of members -- and a quota for women in party tickets',
      'Candidates filing affidavits of assets and criminal cases',
      'Election Commission recognition rules for state/national parties',
      'Disqualification of defectors'
    ],
    answer: 0,
    why: 'Affidavits, EC regulation and anti-defection are LAW; mandatory internal democracy and women-in-ticket quotas remain debated proposals -- exactly the four-challenges-to-reform gap the chapter maps.',
  },
  {
    nodeId: 'c10_civ_cbse_04_008',
    q: '"Lack of meaningful choice" as a party challenge means...',
    options: [
      'the gap between parties shrinks on fundamentals (economic policy converges) and voters find the same faces and families across parties -- so the choice looks like a choice of personalities, not policies',
      'voters have no right to choose at all',
      'there are no parties left to choose from',
      'elections are cancelled when choices repeat'
    ],
    answer: 0,
    why: 'The fourth challenge. The honest counterpoint: parties DO differ on state-level welfare designs and social-justice coalitions, and differentiation is why regional parties keep growing -- the lab\'s coalition arithmetic shows fragmentation giving voters more, not fewer, credible blocs.',
  },
  {
    nodeId: 'c10_civ_cbse_04_002',
    q: 'Name the core ideological difference between the two all-India parties of the Congress era vs the BJP, and the social base of a typical regional party.',
    options: [
      'Congress: centrist, secular-pluralist, mixed economy legacy, pan-India "umbrella" social coalition; BJP: Hindu-nationalist cultural politics + market-leaning economics, backed historically by the Sangh Parivar family of organisations. Regional parties (e.g. a Dravidian party) rise on language/regional identity and federal demands, drawing support from the dominant castes and communities of that state',
      'Both parties are identical in every policy; regional parties exist only in the north-east',
      'Congress is a religious party; BJP was founded by socialists',
      'Regional parties have no social base; they are run by outsiders'
    ],
    answer: 0,
    why: 'Ideology is what makes a party MORE than a candidate list: it aggregates interests into programmes. Evaluate "the decline of the Congress system": one-party dominance (1952-67) gave way to coalition decades -- voters gained choice, governments gained fragility; create a hypothetical manifesto excerpt naming a welfare scheme, a federal demand and a financing source to see how programmes bind a coalition.',
  },
  {
    nodeId: 'c10_civ_cbse_04_002',
    q: 'A UP voter from a historically disadvantaged community weighs parties. Which model explains how parties RESPOND to such voters?',
    options: [
      'Parties choose candidates and design manifestos anticipating caste/community arithmetic (win-nability logic), while the community ALSO negotiates -- bargaining, not blind loyalty; universal franchise turned dispersed social groups into coveted vote blocs (Mandal-era mobilisation is the classic case)',
      'Voters are assigned parties by the Election Commission',
      'Parties ignore social composition entirely',
      'Only national parties may seek such voters'
    ],
    answer: 0,
    why: 'The two-way street: social groups use parties as much as parties use social groups. When a community shifts loyalty after unmet promises, that is democratic accountability working -- not "casteism". The challenge is ensuring the bargain delivers development, not only tickets.',
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

export default C10_CivicsPoliticalPartiesSim;
