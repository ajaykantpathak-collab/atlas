/**
 * C6 Science -- Living Creatures: Exploring their Characteristics
 *
 * One chapter concept: ALL living things share the full set of life
 * characteristics -- they grow, respire, respond to their surroundings,
 * reproduce, and have a life cycle that ends in death. A thing that
 * shows ONE or TWO of these (a robot beeps and moves, a cloud grows)
 * is still NOT alive. Alive = shows ALL of them.
 *
 * Interaction model: pick a specimen, then push time forward with the
 * day slider, move the lamp (do they respond?), and clap (do they
 * react?). The checklist fills in live and the alive-verdict updates.
 */
import React, { useState } from 'react';

type Specimen = 'seedling' | 'robot' | 'cloud';

const SPECS: Record<Specimen, { name: string; hints: string }> = {
  seedling: { name: 'Bean seedling', hints: 'Water it with days and watch it stretch toward the lamp.' },
  robot: { name: 'Toy robot', hints: 'It walks and beeps at your clap. Is that enough to be alive?' },
  cloud: { name: 'Rain cloud', hints: 'It swells bigger every day. Growing is not the whole story!' },
};

function C6_ScienceLivingCreaturesExploringTheirCharacteristicsSim() {
  const [specimen, setSpecimen] = useState<Specimen>('seedling');
  const [days, setDays] = useState(5);
  const [lampX, setLampX] = useState(320);
  const [clap, setClap] = useState(false);

  const reset = () => {
    setDays(5);
    setLampX(320);
    setClap(false);
    setSpecimen('seedling');
  };

  const alive = specimen === 'seedling';
  // honest per-characteristic answers for the checklist
  const checks: { label: string; yes: boolean; note: string }[] = [
    { label: 'Grows bigger', yes: specimen !== 'robot', note: 'cloud grows too -- one tick is not enough!' },
    { label: 'Breathes (respires)', yes: alive, note: 'leaves take in air day and night; the robot only has a fan' },
    { label: 'Responds to surroundings', yes: alive || specimen === 'robot', note: 'the robot beeps, the seedling bends to light' },
    { label: 'Reproduces (makes more of itself)', yes: alive, note: 'a seedling makes seeds; robots need a factory' },
    { label: 'Has a life cycle (grows old, dies)', yes: alive, note: 'the robot stops only when its battery ends' },
  ];
  const allYes = checks.every((c) => c.yes);
  const yesCount = checks.filter((c) => c.yes).length;

  // visuals
  const lean = alive ? (lampX - 320) / 90 : 0; // seedling bends toward the lamp
  const height = alive ? 40 + days * 9 : specimen === 'cloud' ? 20 + days * 2.2 : 60;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl border-2 border-teal-200 shadow-xl font-sans text-slate-800">
      <h2 className="text-xl md:text-2xl font-black text-teal-700">Is it alive? The life-characteristics lab</h2>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
        Scientists say something is <b>alive</b> only if it shows <b>ALL</b> the life characteristics together:
        growth, respiration, response, reproduction and a life cycle. Move time, move the lamp, clap -- then
        judge for yourself.
      </p>

      <div className="flex flex-wrap gap-2 mt-3">
        {(Object.keys(SPECS) as Specimen[]).map((s) => (
          <button key={s} onClick={() => setSpecimen(s)} className={'px-3 py-2 rounded-xl text-xs font-black transition-colors ' + (specimen === s ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200')}>
            {SPECS[s].name}
          </button>
        ))}
        <button onMouseDown={() => setClap(true)} onMouseUp={() => setClap(false)} onMouseLeave={() => setClap(false)} className="px-4 py-2 rounded-xl text-xs font-black bg-amber-400 text-amber-900 hover:bg-amber-300 transition-colors">
          CLAP!
        </button>
        <button onClick={reset} className="px-4 py-2 rounded-xl text-xs font-black bg-slate-800 text-white hover:bg-slate-700 transition-colors">
          Reset
        </button>
      </div>

      <div className="grid md:grid-cols-[1fr_250px] gap-4 mt-4">
        <div className="rounded-2xl border-2 border-teal-100 bg-teal-50/40 overflow-hidden">
          <svg viewBox="0 0 640 300" className="w-full">
            <rect width="640" height="300" fill="#f0fdfa" />
            {/* lamp, slides with the control */}
            <line x1={lampX} y1="30" x2={lampX} y2="58" stroke="#475569" strokeWidth="5" />
            <path d={'M ' + (lampX - 26) + ' 58 L ' + (lampX + 26) + ' 58 L ' + (lampX + 14) + ' 86 L ' + (lampX - 14) + ' 86 Z'} fill="#fbbf24" />
            <circle cx={lampX} cy={96} r={40} fill="#fde68a" opacity="0.35" />
            {clap && <text x="70" y="60" fontSize="16" fontWeight="900" fill="#d97706">*clap*</text>}
            {specimen === 'seedling' && (
              <g style={{ transition: 'transform 0.5s ease' }}>
                <rect x="290" y={250 - height} width="14" height={height} rx="7" fill="#16a34a" transform={'rotate(' + lean * 0.5 + ' 297 250)'} style={{ transition: 'height 0.4s, y 0.4s' }} />
                <ellipse cx={285 + lean * 0.6} cy={250 - height + 14} rx="26" ry="12" fill="#22c55e" transform={'rotate(' + lean * 0.6 + ' ' + (285 + lean * 0.6) + ' ' + (250 - height + 14) + ')'} />
                <ellipse cx={312 + lean * 0.8} cy={250 - height + 26} rx="24" ry="11" fill="#16a34a" transform={'rotate(' + lean * 0.8 + ' ' + (312 + lean * 0.8) + ' ' + (250 - height + 26) + ')'} />
                {days >= 25 && <circle cx="318" cy={250 - height - 6} r="8" fill="#f59e0b" />}
                {days >= 25 && <text x="318" y={250 - height - 16} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b45309">seeds!</text>}
                <rect x="250" y="250" width="94" height="22" rx="8" fill="#a16207" />
              </g>
            )}
            {specimen === 'robot' && (
              <g>
                <rect x="272" y="150" width="60" height="70" rx="10" fill="#64748b" />
                <rect x="280" y="96" width="44" height="40" rx="8" fill="#94a3b8" />
                <circle cx="293" cy="114" r="5" fill={clap ? '#fbbf24' : '#0ea5e9'} style={{ transition: 'fill 0.15s' }} />
                <circle cx="311" cy="114" r="5" fill={clap ? '#fbbf24' : '#0ea5e9'} style={{ transition: 'fill 0.15s' }} />
                {clap && <text x="352" y="108" fontSize="12" fontWeight="bold" fill="#475569">beep!</text>}
                <text x="302" y="248" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">same size on day {days}</text>
              </g>
            )}
            {specimen === 'cloud' && (
              <g>
                <ellipse cx="320" cy="160" rx={90 + days * 3} ry={38 + days * 1.1} fill="#e2e8f0" style={{ transition: 'all 0.4s' }} />
                <ellipse cx={270 - days} cy="172" rx={44 + days} ry={26 + days * 0.7} fill="#f1f5f9" />
                <ellipse cx={372 + days} cy="174" rx={40 + days} ry={24 + days * 0.7} fill="#f1f5f9" />
                {days >= 18 && <line x1="300" y1="205" x2="300" y2="235" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />}
                {days >= 18 && <line x1="330" y1="205" x2="330" y2="243" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />}
                <text x="320" y="268" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">bigger every day... but is it alive?</text>
              </g>
            )}
            <text x="320" y="290" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f766e">Day {days}</text>
          </svg>
        </div>

        <div className="space-y-3">
          <div className={'p-3 rounded-2xl text-white text-center ' + (allYes ? 'bg-emerald-600' : 'bg-rose-500')}>
            <div className="text-xs uppercase tracking-widest opacity-80">Verdict</div>
            <div className="text-2xl font-black">{allYes ? 'ALIVE' : 'NOT alive'}</div>
            <div className="text-[11px] opacity-90">{yesCount} of 5 characteristics shown</div>
          </div>
          <div>
            <label className="flex justify-between text-xs font-semibold text-slate-500">
              <span>Days</span>
              <span className="text-teal-700 font-black">{days}</span>
            </label>
            <input type="range" min={1} max={30} value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full accent-teal-500" />
            <label className="flex justify-between text-xs font-semibold text-slate-500 mt-2">
              <span>Lamp position</span>
              <span className="text-amber-600 font-black">{Math.round(lampX)}</span>
            </label>
            <input type="range" min={140} max={500} value={lampX} onChange={(e) => setLampX(Number(e.target.value))} className="w-full accent-amber-500" />
          </div>
          <div className="p-2 rounded-xl bg-slate-100 text-[11px] text-slate-600 font-semibold">{SPECS[specimen].hints}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-1.5 mt-4">
        {checks.map((c) => (
          <div key={c.label} className={'p-2 rounded-xl text-center border-2 ' + (c.yes ? 'bg-emerald-50 border-emerald-300' : 'bg-rose-50 border-rose-300')}>
            <div className={'text-lg font-black ' + (c.yes ? 'text-emerald-600' : 'text-rose-500')}>{c.yes ? 'YES' : 'NO'}</div>
            <div className="text-[10px] font-bold text-slate-600 leading-tight">{c.label}</div>
            <div className="text-[9px] text-slate-400 mt-0.5 leading-tight">{c.note}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-gold-50 border-2 border-gold-200">
        <div className="text-sm font-black text-gold-800">What to try</div>
        <ol className="text-xs text-gold-700 list-decimal list-inside mt-1 space-y-1">
          <li>Slide the lamp to the far left, then to the far right. Which specimen responds, and how do you SEE the response?</li>
          <li>The robot shows 2 of 5 characteristics. Which two -- and why is that still not alive?</li>
        </ol>
      </div>
    </div>
  );
}

export { C6_ScienceLivingCreaturesExploringTheirCharacteristicsSim };
export default C6_ScienceLivingCreaturesExploringTheirCharacteristicsSim;
