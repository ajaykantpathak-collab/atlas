/**
 * C6 Science -- The Living Organisms: Characteristics and Habitats
 *
 * One chapter concept: a habitat is the place that gives an organism
 * air, water, food and shelter. Every organism has ADAPTATIONS that
 * fit exactly ONE set of conditions -- the camel's hump and padded
 * feet suit hot deserts, gills suit ponds, a warm coat suits cold
 * mountains. Change the habitat's rain or temperature and the organism
 * thrives, struggles, or is in danger.
 *
 * Interaction model: pick an organism, then drag the two habitat
 * dials -- yearly rainfall and temperature. The scene redraws (pond,
 * snow, sun) and the comfort meter tells you how the adaptation is
 * coping.
 */
import React, { useState } from 'react';

type Who = 'camel' | 'fish' | 'goat';

const ORG: Record<Who, { name: string; t: [number, number]; r: [number, number]; adaptations: string[] }> = {
  camel: {
    name: 'Camel (desert)',
    t: [30, 50],
    r: [0, 25],
    adaptations: ['Hump stores fat (not water!) for weeks', 'Long eyelashes and closing nostrils keep sand out', 'Wide padded feet walk on hot sand'],
  },
  fish: {
    name: 'Fish (pond)',
    t: [5, 30],
    r: [75, 100],
    adaptations: ['Gills take oxygen dissolved in water', 'Fins and a streamlined body for swimming', 'Scales protect in water -- but it CANNOT live out of it'],
  },
  goat: {
    name: 'Mountain goat',
    t: [-5, 15],
    r: [25, 75],
    adaptations: ['Thick warm coat against freezing wind', 'Strong split hooves grip rocky slopes', 'Eats tough mountain grass'],
  },
};

function comfortOf(who: Who, temp: number, rain: number): { pct: number; problem: string } {
  const o = ORG[who];
  const tMid = (o.t[0] + o.t[1]) / 2;
  const tHalf = (o.t[1] - o.t[0]) / 2;
  const rMid = (o.r[0] + o.r[1]) / 2;
  const rHalf = (o.r[1] - o.r[0]) / 2;
  const dt = Math.max(0, Math.abs(temp - tMid) - tHalf);
  const dr = Math.max(0, Math.abs(rain - rMid) - rHalf);
  const pct = Math.max(0, Math.round(100 - dt * 5 - dr * 1.7));
  let problem = 'All needs met -- this IS its habitat.';
  if (who === 'fish' && rain < 50) problem = 'Almost no water -- gills cannot breathe air. It will die, however much you feed it!';
  else if (who === 'camel' && rain > 55) problem = 'Wet marshy ground -- the desert feet of the camel sink and its fur rots.';
  else if (who === 'goat' && temp > 25) problem = 'Too hot -- the thick coat overheats. This coat was made for icy wind!';
  else if (dt > 0 && dr > 0) problem = 'Both temperature and water are wrong for this organism.';
  else if (dt > 0) problem = 'Wrong temperature for this adaptation.';
  else if (dr > 0) problem = 'Wrong rainfall for this habitat.';
  return { pct, problem };
}

function C6_ScienceTheLivingOrganismsCharacteristicsAndSim() {
  const [who, setWho] = useState<Who>('camel');
  const [temp, setTemp] = useState(40);
  const [rain, setRain] = useState(10);

  const reset = () => {
    setWho('camel');
    setTemp(40);
    setRain(10);
  };

  const { pct, problem } = comfortOf(who, temp, rain);
  const mood = pct >= 75 ? 'THRIVING' : pct >= 40 ? 'STRUGGLING' : 'IN DANGER';
  const moodColor = pct >= 75 ? 'bg-emerald-600' : pct >= 40 ? 'bg-amber-500' : 'bg-rose-600';

  const pondW = rain * 2.6;
  const face = pct >= 75 ? 0 : pct >= 40 ? 1 : 2;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl border-2 border-emerald-200 shadow-xl font-sans text-slate-800">
      <h2 className="text-xl md:text-2xl font-black text-emerald-700">Habitats -- will your organism survive here?</h2>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
        A <b>habitat</b> gives air, water, food and shelter. Each organism's <b>adaptations</b> fit only ONE
        kind of place. Drag the rainfall and temperature dials and watch the habitat change -- can the camel,
        the fish or the mountain goat cope?
      </p>

      <div className="flex flex-wrap gap-2 mt-3">
        {(Object.keys(ORG) as Who[]).map((w) => (
          <button key={w} onClick={() => setWho(w)} className={'px-3 py-2 rounded-xl text-xs font-black transition-colors ' + (who === w ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}>
            {ORG[w].name}
          </button>
        ))}
        <button onClick={reset} className="px-3 py-2 rounded-xl text-xs font-black bg-slate-800 text-white hover:bg-slate-700 transition-colors">
          Reset
        </button>
      </div>

      <div className="grid md:grid-cols-[1fr_250px] gap-4 mt-4">
        <div className="rounded-2xl border-2 border-emerald-100 bg-emerald-50/40 overflow-hidden">
          <svg viewBox="0 0 640 300" className="w-full">
            <rect width="640" height="300" fill={temp <= 0 ? '#dbeafe' : temp > 35 ? '#fef3c7' : '#e0f2fe'} style={{ transition: 'fill 0.5s' }} />
            <circle cx="70" cy="55" r={temp > 0 ? 30 : 26} fill={temp > 35 ? '#f97316' : '#fbbf24'} style={{ transition: 'all 0.4s' }} />
            {temp <= 0 && [0, 1, 2, 3, 4].map((i) => <circle key={i} cx={150 + i * 90} cy={40 + (i % 3) * 25} r="4" fill="#ffffff" />)}
            <rect x="0" y="230" width="640" height="70" fill={rain < 30 ? '#fbbf24' : rain < 65 ? '#84cc16' : '#166534'} style={{ transition: 'fill 0.5s' }} />
            {/* pond grows with rain */}
            <ellipse cx="450" cy="255" rx={pondW < 15 ? 0 : pondW} ry="26" fill="#38bdf8" style={{ transition: 'all 0.5s' }} />
            {/* vegetation with rain */}
            {rain >= 45 && [0, 1, 2].map((i) => <path key={i} d={'M ' + (180 + i * 60) + ' 235 q 6 -26 12 0'} stroke="#166534" strokeWidth="4" fill="none" />)}
            {rain < 30 && [0, 1].map((i) => (
              <g key={i} transform={'translate(' + (210 + i * 120) + ',215)'}>
                <rect x="-5" y="0" width="10" height="30" rx="5" fill="#15803d" />
                <line x1="0" y1="8" x2="16" y2="2" stroke="#15803d" strokeWidth="5" strokeLinecap="round" />
                <line x1="0" y1="14" x2="-16" y2="8" stroke="#15803d" strokeWidth="5" strokeLinecap="round" />
              </g>
            ))}
            {/* the organism */}
            {who === 'camel' && (
              <g transform="translate(280,150)">
                <ellipse cx="0" cy="30" rx="52" ry="26" fill="#b45309" />
                <path d="M -20 6 q 14 -26 28 0" fill="#b45309" />
                <ellipse cx="38" cy="0" rx="12" ry="18" fill="#b45309" />
                <circle cx="46" cy="-18" r="10" fill="#b45309" />
                {[-32, -14, 16, 34].map((x) => <rect key={x} x={x} y="50" width="8" height="34" rx="4" fill="#92400e" />)}
                <path d={face === 0 ? 'M 44 -18 q 4 3 8 0' : face === 1 ? 'M 44 -17 l 8 0' : 'M 44 -14 q 4 -4 8 0'} stroke="#7c2d12" strokeWidth="2.5" fill="none" />
              </g>
            )}
            {who === 'fish' && (
              <g transform={'translate(450,245)'} style={{ transition: 'opacity 0.5s', opacity: rain < 15 ? 0.4 : 1 }}>
                <ellipse cx="0" cy="0" rx="38" ry="18" fill="#ea580c" />
                <polygon points="36,0 58,-16 58,16" fill="#c2410c" />
                <circle cx="-18" cy="-4" r="4" fill="#1f2937" />
                <path d={face === 0 ? 'M -30 6 q 5 4 10 0' : face === 1 ? 'M -30 8 l 10 0' : 'M -30 11 q 5 -4 10 0'} stroke="#7c2d12" strokeWidth="2" fill="none" />
                {rain >= 75 && [0, 1].map((i) => <circle key={i} cx={-10 - i * 12} cy={-28 - i * 12} r="4" fill="#e0f2fe" opacity="0.8" />)}
              </g>
            )}
            {who === 'goat' && (
              <g transform="translate(250,150)">
                <ellipse cx="0" cy="26" rx="40" ry="22" fill="#e7e5e4" />
                <ellipse cx="34" cy="2" rx="13" ry="14" fill="#d6d3d1" />
                <path d="M 30 -10 q -8 -12 -14 -8 M 38 -10 q 8 -12 14 -8" stroke="#78716c" strokeWidth="4" fill="none" strokeLinecap="round" />
                <circle cx="38" cy="0" r="2.5" fill="#1f2937" />
                {[-24, -8, 12, 28].map((x) => <rect key={x} x={x} y="42" width="7" height="30" rx="3" fill="#a8a29e" />)}
                <path d={face === 0 ? 'M 34 8 q 4 3 8 0' : face === 1 ? 'M 34 9 l 8 0' : 'M 34 12 q 4 -4 8 0'} stroke="#44403c" strokeWidth="2" fill="none" />
              </g>
            )}
            <text x="320" y="290" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#064e3b">Rainfall {rain} cm/year -- {temp}&deg;C</text>
          </svg>
        </div>

        <div className="space-y-3">
          <div className={'p-3 rounded-2xl text-white text-center ' + moodColor}>
            <div className="text-xs uppercase tracking-widest opacity-80">Comfort meter</div>
            <div className="text-3xl font-black">{pct}%</div>
            <div className="text-sm font-black tracking-wide">{mood}</div>
          </div>
          <div>
            <label className="flex justify-between text-xs font-semibold text-slate-500">
              <span>Yearly rainfall</span>
              <span className="text-emerald-700 font-black">{rain} cm</span>
            </label>
            <input type="range" min={0} max={100} value={rain} onChange={(e) => setRain(Number(e.target.value))} className="w-full accent-emerald-500" />
            <label className="flex justify-between text-xs font-semibold text-slate-500 mt-2">
              <span>Temperature</span>
              <span className="text-red-600 font-black">{temp}&deg;C</span>
            </label>
            <input type="range" min={-5} max={50} value={temp} onChange={(e) => setTemp(Number(e.target.value))} className="w-full accent-red-500" />
          </div>
          <div className="p-2 rounded-xl bg-rose-50 border-2 border-rose-200 text-[11px] text-rose-800 font-semibold">{problem}</div>
          <div className="p-2 rounded-xl bg-slate-100 text-[11px] text-slate-600 font-semibold">
            {ORG[who].name} adaptations:
            <ul className="list-disc list-inside mt-0.5 space-y-0.5">
              {ORG[who].adaptations.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-rose-50 border-2 border-rose-200">
        <div className="text-sm font-black text-rose-800">Misconception buster</div>
        <div className="text-xs text-rose-700 mt-0.5">
          "The camel is strong, so it can live anywhere." Drag the camel into 100 cm of rain -- its own amazing adaptations become useless. Adaptations are not "strength"; they are a perfect match for ONE habitat.
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-gold-50 border-2 border-gold-200">
        <div className="text-sm font-black text-gold-800">What to try</div>
        <ol className="text-xs text-gold-700 list-decimal list-inside mt-1 space-y-1">
          <li>Find the perfect habitat for each of the three organisms (comfort 100%) and write down its rain and temperature.</li>
          <li>Put the fish at 10 cm of rain. Read the danger message: why does FOOD not save it?</li>
        </ol>
      </div>
    </div>
  );
}

export { C6_ScienceTheLivingOrganismsCharacteristicsAndSim };
export default C6_ScienceTheLivingOrganismsCharacteristicsAndSim;
