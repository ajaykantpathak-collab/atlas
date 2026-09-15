'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 11 Political Science -- Citizenship
 * ONE concept: citizenship is membership with rights AND duties, granted
 * by rules (birth, descent, naturalisation) that can include or exclude.
 * Process an applicant, then stress the boundary cases. react + tailwind.
 */

type Route = 'birth' | 'descent' | 'naturalisation' | 'refugee';

export function C11_PoliticalScienceCitizenshipSim() {
  const [route, setRoute] = useState<Route>('naturalisation');
  const [bornHere, setBornHere] = useState(false);
  const [parentCitizen, setParentCitizen] = useState(true);
  const [residenceYears, setResidenceYears] = useState(4);
  const [languageTest, setLanguageTest] = useState(true);
  const [showDebate, setShowDebate] = useState(false);

  const verdict = useMemo(() => {
    if (route === 'birth') return { ok: bornHere, why: bornHere ? 'jus soli: born on the soil = citizen' : 'not born on the soil -- route fails' };
    if (route === 'descent') return { ok: parentCitizen, why: parentCitizen ? 'jus sanguinis: citizen parent passes it on' : 'no citizen parent -- route fails' };
    if (route === 'naturalisation') {
      const yrsOk = residenceYears >= 5;
      const langOk = languageTest;
      return { ok: yrsOk && langOk, why: yrsOk ? (langOk ? 'residence 5+ yrs and language test passed' : 'residence ok, but language test failed') : `needs ${5 - residenceYears} more year(s) of residence` };
    }
    return { ok: residenceYears >= 10, why: residenceYears >= 10 ? 'long stay recognised as citizen after 10 yrs' : 'refugee route: no fast track in most states -- rights on hold' };
  }, [route, bornHere, parentCitizen, residenceYears, languageTest]);

  const rightsScore = verdict.ok ? 100 : route === 'refugee' ? 35 : 10;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-blue-950/80 rounded-2xl border border-blue-700">🛂</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Class 11 -- Citizenship</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Border Desk: Who Becomes a Citizen, Who Stays Out?</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 280" className="w-full">
            <rect x={0} y={0} width={460} height={280} rx={10} fill="#0b1220" />
            {/* border gate */}
            <rect x={0} y={0} width={150} height={280} rx={10} fill="#0f172a" />
            <line x1={150} y1={0} x2={150} y2={280} stroke={verdict.ok ? '#10b981' : '#f43f5e'} strokeWidth={3}
              className="transition-colors duration-500" strokeDasharray="10 6" />
            <text x={75} y={40} fontSize={11} fill="#94a3b8" textAnchor="middle">outside</text>
            <text x={300} y={40} fontSize={11} fill="#94a3b8" textAnchor="middle">the political community</text>
            {/* applicant walks in or turns back */}
            <g className="transition-all duration-700"
              style={{ transform: `translateX(${verdict.ok ? 260 : -10}px)` }}>
              <circle cx={130} cy={140} r={14} fill={verdict.ok ? '#10b981' : '#f43f5e'} />
              <rect x={112} y={158} width={36} height={54} rx={10} fill={verdict.ok ? '#10b981' : '#f43f5e'} />
            </g>
            <text x={130} y={250} fontSize={10} fill={verdict.ok ? '#34d399' : '#fb7185'} textAnchor="middle"
              className="transition-colors duration-500">
              {verdict.ok ? 'CITIZEN' : route === 'refugee' ? 'DENIED (protected alien)' : 'DENIED'}
            </text>
            {/* rights card */}
            <rect x={210} y={70} width={210} height={130} rx={12} fill="#020617" stroke="#334155" />
            <text x={315} y={94} fontSize={11} fill="#93c5fd" textAnchor="middle">rights bundle held</text>
            {['vote in elections', 'stand for office', 'state protection abroad', 'welfare and public schooling'].map((r, i) => {
              const has = verdict.ok || (route === 'refugee' && i === 3);
              return (
                <g key={r}>
                  <circle cx={228} cy={114 + i * 20} r={4} fill={has ? '#10b981' : '#334155'} className="transition-colors duration-500" />
                  <text x={240} y={118 + i * 20} fontSize={9.5} fill={has ? '#a7f3d0' : '#475569'}>{r}</text>
                </g>
              );
            })}
            <rect x={210} y={210} width={210} height={10} rx={5} fill="#1e293b" />
            <rect x={210} y={210} width={rightsScore * 2.1} height={10} rx={5}
              fill={rightsScore > 80 ? '#10b981' : rightsScore > 30 ? '#f59e0b' : '#f43f5e'}
              className="transition-all duration-500" />
            <text x={315} y={248} fontSize={10} fill="#94a3b8" textAnchor="middle">verdict: {verdict.why}</text>
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Route</p>
              <p className="font-mono font-bold text-blue-300 capitalize">{route}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Decision</p>
              <p className={`font-mono font-bold ${verdict.ok ? 'text-emerald-300' : 'text-rose-400'}`}>{verdict.ok ? 'GRANTED' : 'REFUSED'}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Rights held</p>
              <p className="font-mono font-bold text-amber-300">{rightsScore}%</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {(['birth', 'descent', 'naturalisation', 'refugee'] as Route[]).map((r) => (
                <button key={r} onClick={() => setRoute(r)}
                  className={`min-h-11 rounded-xl text-[10px] font-bold capitalize ${route === r ? 'bg-blue-500 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
                  {r}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setBornHere(!bornHere)}
                className={`min-h-11 rounded-xl text-[10px] font-bold ${bornHere ? 'bg-emerald-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Born on soil: {bornHere ? 'yes' : 'no'}
              </button>
              <button onClick={() => setParentCitizen(!parentCitizen)}
                className={`min-h-11 rounded-xl text-[10px] font-bold ${parentCitizen ? 'bg-emerald-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Parent citizen: {parentCitizen ? 'yes' : 'no'}
              </button>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Years of residence</span><span className="font-mono font-bold text-amber-400">{residenceYears}</span>
              </div>
              <input type="range" min={0} max={12} step={1} value={residenceYears} aria-label="residence years"
                onChange={(e) => setResidenceYears(Number(e.target.value))} className="w-full min-h-11 accent-amber-500" />
            </div>
            <button onClick={() => setLanguageTest(!languageTest)}
              className={`min-h-11 w-full rounded-xl text-xs font-bold ${languageTest ? 'bg-sky-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
              Language test: {languageTest ? 'passed' : 'failed'}
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setShowDebate(!showDebate)}
                className={`min-h-11 rounded-xl text-xs font-bold ${showDebate ? 'bg-violet-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Boundary cases
              </button>
              <button onClick={() => { setRoute('naturalisation'); setBornHere(false); setParentCitizen(true); setResidenceYears(4); setLanguageTest(true); setShowDebate(false); }}
                className="min-h-11 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
            </div>
          </div>

          {showDebate && (
            <div className="bg-violet-950/40 rounded-2xl border border-violet-800/50 p-4 text-xs space-y-1">
              <p className="font-bold text-violet-300 mb-1">Boundary cases (think like a judge)</p>
              <p>A child born to citizens abroad -- soil or blood?</p>
              <p>A refugee born here, parents not citizens -- which rule wins?</p>
              <p>Should residence alone ever be enough? What about language tests?</p>
            </div>
          )}

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;Everyone inside a country has the same rights.&quot; Slide the residence dial to 2
              on the refugee route: a person can live, work and raise children in a state for decades
              and still hold only a fraction of the citizen&apos;s rights bundle.
            </p>
          </div>

          <div className="bg-blue-950/40 rounded-2xl border border-blue-800/50 p-4 text-xs">
            <p className="font-bold text-blue-300 mb-1">What to try</p>
            <p>1. Build an applicant who passes BOTH birth and descent routes at once. Then break each rule with one switch.</p>
            <p>2. Set route to naturalisation with 6 years of residence, then flip the language test. Should a state be allowed to refuse on that alone?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_PoliticalScienceCitizenshipSim;
