/**
 * C6 Science -- Nature's Treasures
 *
 * One chapter concept: nature gives us treasures -- sunlight, wind,
 * water, forests, soil -- and FUELS (coal, petroleum) hidden under the
 * ground. Sunlight and wind come back every day (renewable), but coal
 * and petroleum took millions of years to form, so once burnt they are
 * gone (non-renewable). Wasteful habits empty every treasure faster.
 *
 * Interaction model: run a small village. Choose its energy, its water
 * habit and its tree rule, then advance 10 years at a time and watch
 * the gauges: fuel underground, trees standing, water in the tank.
 */
import React, { useState } from 'react';

function C6_ScienceNatureSTreasuresSim() {
  const [energy, setEnergy] = useState<'sun' | 'coal'>('coal');
  const [water, setWater] = useState<'drip' | 'open'>('open');
  const [trees, setTrees] = useState<'protect' | 'cut'>('cut');
  const [years, setYears] = useState(0);
  const [fuel, setFuel] = useState(100);
  const [treeCount, setTreeCount] = useState(30);
  const [tank, setTank] = useState(100);
  const [log, setLog] = useState<string[]>([]);

  const reset = () => {
    setEnergy('coal');
    setWater('open');
    setTrees('cut');
    setYears(0);
    setFuel(100);
    setTreeCount(30);
    setTank(100);
    setLog([]);
  };

  const advance = () => {
    const fuelDrop = energy === 'coal' ? 18 : 0;
    const treeDelta = trees === 'cut' ? -6 : 5;
    const tankDelta = water === 'open' ? -12 : 0;
    const nf = Math.max(0, fuel - fuelDrop);
    const nt = Math.max(0, Math.min(60, treeCount + treeDelta));
    const nk = Math.max(0, Math.min(100, tank + tankDelta));
    const notes: string[] = [];
    notes.push('Year ' + (years + 10) + ': ');
    if (fuelDrop > 0) notes.push('burned coal, fuel left ' + nf + '%. ');
    else notes.push('ran on sun and wind -- fuel untouched. ');
    if (trees === 'cut') notes.push('Cut 6 trees; forests feed soil and rain. ');
    else notes.push('Planted 5 more trees. ');
    if (tankDelta < 0) notes.push('Leaky open taps wasted tank water.');
    setFuel(nf);
    setTreeCount(nt);
    setTank(nk);
    setYears(years + 10);
    setLog([notes.join(''), ...log].slice(0, 4));
  };

  const fuelVerdict = fuel <= 0 ? 'FUEL OVER -- the village is in darkness!' : fuel < 30 ? 'Almost gone: this took MILLIONS of years to make.' : 'Coal and petroleum under the ground';
  const treeDraw = Math.min(8, Math.round(treeCount / 4));

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl border-2 border-yellow-200 shadow-xl font-sans text-slate-800">
      <h2 className="text-xl md:text-2xl font-black text-yellow-700">Nature's treasures -- run your village</h2>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
        Sunlight, wind, water, forests, soil -- and coal and petroleum underground -- are nature's
        <b> treasures</b>. Choose how your village uses them, then step forward 10 years each time. Can you
        keep every treasure alive for 50 years?
      </p>

      <div className="grid md:grid-cols-[1fr_250px] gap-4 mt-4">
        <div className="rounded-2xl border-2 border-yellow-100 bg-yellow-50/40 overflow-hidden">
          <svg viewBox="0 0 640 300" className="w-full">
            <rect width="640" height="300" fill="#fefce8" />
            <circle cx="80" cy="60" r="34" fill="#fbbf24" />
            {/* windmill spins when solar chosen */}
            <style>{'@keyframes nts_spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }'}</style>
            <g transform="translate(180,150)">
              <line x1="0" y1="0" x2="0" y2="70" stroke="#78716c" strokeWidth="6" />
              <g style={{ transformOrigin: '0px 0px', animation: energy === 'sun' ? 'nts_spin 3s linear infinite' : 'none' }}>
                <line x1="0" y1="0" x2="0" y2="-44" stroke="#e2e8f0" strokeWidth="7" strokeLinecap="round" />
                <line x1="0" y1="0" x2="38" y2="22" stroke="#e2e8f0" strokeWidth="7" strokeLinecap="round" />
                <line x1="0" y1="0" x2="-38" y2="22" stroke="#e2e8f0" strokeWidth="7" strokeLinecap="round" />
              </g>
            </g>
            {/* energy plant */}
            <rect x="270" y="120" width="90" height="70" rx="8" fill={energy === 'coal' ? '#57534e' : '#38bdf8'} />
            {energy === 'coal' ? (
              <g opacity={fuel > 0 ? 1 : 0}>
                <circle cx="290" cy="104" r="12" fill="#a8a29e" opacity="0.7" />
                <circle cx="312" cy="88" r="16" fill="#a8a29e" opacity="0.5" />
                <circle cx="336" cy="70" r="20" fill="#a8a29e" opacity="0.35" />
              </g>
            ) : (
              <text x="315" y="160" textAnchor="middle" fontSize="13" fontWeight="900" fill="#ffffff">SOLAR</text>
            )}
            {/* trees */}
            {Array.from({ length: treeDraw }, (_, i) => (
              <g key={i} transform={'translate(' + (20 + i * 36) + ',240)'}>
                <rect x="-4" y="0" width="8" height="26" fill="#92400e" />
                <circle cx="0" cy="-8" r="18" fill="#16a34a" />
              </g>
            ))}
            <rect x="0" y="266" width="640" height="34" fill="#a16207" opacity="0.5" />
            {/* water tank */}
            <rect x="470" y="120" width="70" height="110" rx="10" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
            <rect x="472" y={230 - (tank / 100) * 106} width="66" height={(tank / 100) * 106} fill="#38bdf8" style={{ transition: 'all 0.8s' }} />
            <text x="505" y="255" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">tank {tank}%</text>
            {/* underground fuel gauge */}
            <rect x="560" y="120" width="34" height="110" rx="8" fill="#292524" />
            <rect x="562" y={228 - (fuel / 100) * 104} width="30" height={(fuel / 100) * 104} fill={fuel <= 0 ? '#7f1d1d' : '#f59e0b'} style={{ transition: 'all 0.8s' }} />
            <text x="577" y="255" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#451a03">fuel {fuel}%</text>
            <text x="320" y="290" textAnchor="middle" fontSize="13" fontWeight="900" fill="#713f12">Year {years} -- trees standing: {treeCount}</text>
          </svg>
        </div>

        <div className="space-y-3">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Village energy</div>
            <div className="grid grid-cols-2 gap-1.5">
              <button onClick={() => setEnergy('sun')} className={'px-2 py-2 rounded-xl text-xs font-black transition-colors ' + (energy === 'sun' ? 'bg-gold-500 text-white' : 'bg-slate-100 text-slate-500')}>Sun + wind</button>
              <button onClick={() => setEnergy('coal')} className={'px-2 py-2 rounded-xl text-xs font-black transition-colors ' + (energy === 'coal' ? 'bg-stone-600 text-white' : 'bg-slate-100 text-slate-500')}>Coal plant</button>
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Water habit</div>
            <div className="grid grid-cols-2 gap-1.5">
              <button onClick={() => setWater('drip')} className={'px-2 py-2 rounded-xl text-xs font-black transition-colors ' + (water === 'drip' ? 'bg-gold-500 text-white' : 'bg-slate-100 text-slate-500')}>Fix drips</button>
              <button onClick={() => setWater('open')} className={'px-2 py-2 rounded-xl text-xs font-black transition-colors ' + (water === 'open' ? 'bg-orange-400 text-white' : 'bg-slate-100 text-slate-500')}>Open taps</button>
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Forest rule</div>
            <div className="grid grid-cols-2 gap-1.5">
              <button onClick={() => setTrees('protect')} className={'px-2 py-2 rounded-xl text-xs font-black transition-colors ' + (trees === 'protect' ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-500')}>Protect + plant</button>
              <button onClick={() => setTrees('cut')} className={'px-2 py-2 rounded-xl text-xs font-black transition-colors ' + (trees === 'cut' ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-500')}>Cut freely</button>
            </div>
          </div>
          <button onClick={advance} className="w-full min-h-11 px-3 py-2 rounded-xl text-xs font-black bg-gold-600 text-white hover:bg-gold-700 transition-colors">
            Advance 10 years &gt;
          </button>
          <div className={'p-2 rounded-xl text-[11px] font-bold border-2 ' + (fuel <= 0 ? 'bg-rose-50 border-rose-300 text-rose-700' : fuel < 30 ? 'bg-amber-50 border-amber-300 text-amber-800' : 'bg-slate-100 border-slate-200 text-slate-600')}>
            {fuelVerdict}
          </div>
          {log.length > 0 && (
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-[10px] text-slate-500 leading-snug">
              {log.map((l, i) => <div key={i}>{l}</div>)}
            </div>
          )}
          <button onClick={reset} className="w-full px-3 py-2 rounded-xl text-xs font-black bg-slate-800 text-white hover:bg-slate-700 transition-colors">
            Reset
          </button>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-rose-50 border-2 border-rose-200">
        <div className="text-sm font-black text-rose-800">Misconception buster</div>
        <div className="text-xs text-rose-700 mt-0.5">
          "Nature's treasures can never finish." The sun rises again tomorrow, but the coal bar took MILLIONS of years to fill. Burn it and your grandchildren inherit an empty bar.
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-gold-50 border-2 border-gold-200">
        <div className="text-sm font-black text-gold-800">What to try</div>
        <ol className="text-xs text-gold-700 list-decimal list-inside mt-1 space-y-1">
          <li>Run 50 years with coal + open taps + cutting. Write down what happened to every gauge.</li>
          <li>Now keep sun-and-wind, fixed drips and tree-planting for 50 years. Which treasures GREW instead of shrinking?</li>
        </ol>
      </div>
    </div>
  );
}

export { C6_ScienceNatureSTreasuresSim };
export default C6_ScienceNatureSTreasuresSim;
