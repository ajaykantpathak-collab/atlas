/**
 * C6 Science -- Mindful Eating: A Path to a Healthy Body
 *
 * One chapter concept: a healthy meal is a TEAM of foods. Energy-giving
 * foods (rice, roti), body-building foods (dal, egg, paneer) and
 * protective foods (vegetables, fruits) are all needed in the right
 * amounts. Skip a team member for weeks and a deficiency disease
 * appears; overload one and the others get crowded out.
 *
 * Interaction model: build today's lunch by tapping foods onto the
 * plate. The plate wedges rescale live, and the coach card grades the
 * plate and warns about missing groups.
 */
import React, { useState } from 'react';

type Group = 'energy' | 'building' | 'protective' | 'extra';

const FOODS: { name: string; group: Group }[] = [
  { name: 'Rice', group: 'energy' },
  { name: 'Roti', group: 'energy' },
  { name: 'Poha', group: 'energy' },
  { name: 'Dal', group: 'building' },
  { name: 'Egg', group: 'building' },
  { name: 'Paneer', group: 'building' },
  { name: 'Spinach', group: 'protective' },
  { name: 'Carrot', group: 'protective' },
  { name: 'Papaya', group: 'protective' },
  { name: 'Jalebi', group: 'extra' },
  { name: 'Chips', group: 'extra' },
];

const GROUPS: Record<Group, { label: string; color: string; job: string; min: number; max: number; missing: string }> = {
  energy: { label: 'Energy-giving', color: '#f59e0b', job: 'runs and plays fuel', min: 3, max: 5, missing: 'No fuel -- you will feel tired and weak by evening.' },
  building: { label: 'Body-building', color: '#6366f1', job: 'muscle and growth material', min: 2, max: 4, missing: 'No building food -- growth slows and wounds heal slowly.' },
  protective: { label: 'Protective', color: '#22c55e', job: 'shield against illness', min: 2, max: 4, missing: 'No protective food -- you fall sick more often and eyes suffer.' },
  extra: { label: 'Once-in-a-while', color: '#f43f5e', job: 'taste, not nutrition', min: 0, max: 1, missing: '' },
};

function arcSlice(cx: number, cy: number, r: number, a0: number, a1: number): string {
  const p0 = { x: cx + r * Math.cos(a0), y: cy + r * Math.sin(a0) };
  const p1 = { x: cx + r * Math.cos(a1), y: cy + r * Math.sin(a1) };
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return 'M ' + cx + ' ' + cy + ' L ' + p0.x.toFixed(1) + ' ' + p0.y.toFixed(1) + ' A ' + r + ' ' + r + ' 0 ' + large + ' 1 ' + p1.x.toFixed(1) + ' ' + p1.y.toFixed(1) + ' Z';
}

function C6_ScienceMindfulEatingAPathToSim() {
  const [plate, setPlate] = useState<Record<string, number>>({ Rice: 3, Dal: 1, Spinach: 1 });
  const [review, setReview] = useState<string | null>(null);

  const reset = () => {
    setPlate({ Rice: 3, Dal: 1, Spinach: 1 });
    setReview(null);
  };

  const count = (g: Group): number =>
    FOODS.filter((f) => f.group === g).reduce((sum, f) => sum + (plate[f.name] || 0), 0);

  const total = count('energy') + count('building') + count('protective') + count('extra');

  const groupScore = (g: Group): number => {
    const c = count(g);
    if (g === 'extra') return c <= GROUPS.extra.max ? 1 : 0.4;
    if (c === 0) return 0;
    if (c < GROUPS[g].min) return 0.6;
    if (c > GROUPS[g].max) return 0.6;
    return 1;
  };
  const score = Math.round(((groupScore('energy') + groupScore('building') + groupScore('protective') + groupScore('extra')) / 4) * 100);

  const serve = () => {
    const lines: string[] = [];
    (['energy', 'building', 'protective'] as Group[]).forEach((g) => {
      const c = count(g);
      if (c === 0) lines.push(GROUPS[g].missing);
      else if (c < GROUPS[g].min) lines.push('A little more ' + GROUPS[g].label.toLowerCase() + ' food would help (' + GROUPS[g].job + ').');
      else if (c > GROUPS[g].max) lines.push('Too much ' + GROUPS[g].label.toLowerCase() + ' food -- it is crowding out the others!');
    });
    if (count('extra') > 1) lines.push('Lots of sweets and chips: tasty, but they push real food off the plate.');
    setReview(lines.length ? lines.join(' ') : 'Balanced plate! Fuel, builders and shields are all on board. Enjoy your lunch mindfully.');
  };

  // pie geometry
  let angle = -Math.PI / 2;
  const wedges = (['energy', 'building', 'protective', 'extra'] as Group[]).map((g) => {
    const c = count(g);
    const frac = total > 0 ? c / total : 0;
    const a0 = angle;
    const a1 = angle + frac * Math.PI * 2;
    angle = a1;
    return { g, c, d: c > 0 ? arcSlice(190, 150, 110, a0, a1) : '' };
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl border-2 border-green-200 shadow-xl font-sans text-slate-800">
      <h2 className="text-xl md:text-2xl font-black text-green-700">Mindful eating -- build a balanced plate</h2>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
        No ONE food keeps you healthy. Tap foods to add a serving to your plate and watch the wedges move:
        <b className="text-amber-600"> energy</b>, <b className="text-indigo-600">body-building</b>,
        <b className="text-green-600"> protective</b> and <b className="text-rose-500">once-in-a-while</b>.
      </p>

      <div className="grid md:grid-cols-[1fr_260px] gap-4 mt-4">
        <div className="rounded-2xl border-2 border-green-100 bg-green-50/40 overflow-hidden">
          <svg viewBox="0 0 640 300" className="w-full">
            <rect width="640" height="300" fill="#f0fdf4" />
            <circle cx="190" cy="150" r="124" fill="#ffffff" stroke="#bbf7d0" strokeWidth="6" />
            {total === 0 && <text x="190" y="155" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#94a3b8">empty plate!</text>}
            {wedges.map((w) =>
              w.c > 0 ? (
                <path key={w.g} d={w.d} fill={GROUPS[w.g].color} opacity="0.85" stroke="#ffffff" strokeWidth="3" style={{ transition: 'd 0.5s ease, opacity 0.4s' }} />
              ) : null
            )}
            <circle cx="190" cy="150" r="30" fill="#ffffff" />
            <text x="190" y="155" textAnchor="middle" fontSize="16" font-weight="900" fill="#166534">{total}</text>
            {/* coach board */}
            <g>
              <rect x="360" y="40" width="250" height="220" rx="14" fill="#ffffff" stroke="#d1d5db" strokeWidth="2" />
              {(['energy', 'building', 'protective', 'extra'] as Group[]).map((g, i) => {
                const c = count(g);
                const ok = g === 'extra' ? c <= GROUPS[g].max : c >= GROUPS[g].min && c <= GROUPS[g].max;
                return (
                  <g key={g}>
                    <circle cx="385" cy={70 + i * 50} r="10" fill={GROUPS[g].color} opacity={c === 0 && g !== 'extra' ? 0.25 : 1} />
                    <text x="404" y={66 + i * 50} fontSize="12" fontWeight="bold" fill="#374151">{GROUPS[g].label}</text>
                    <text x="404" y={82 + i * 50} fontSize="11" fill={ok ? '#16a34a' : '#dc2626'} fontWeight="900">
                      {c} serving{c === 1 ? '' : 's'} {g === 'extra' ? (ok ? '(ok)' : '(too many!)') : ok ? '(good range)' : c === 0 ? '(missing!)' : c < GROUPS[g].min ? '(too few)' : '(too much)'}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-1.5">
            {FOODS.map((f) => (
              <button key={f.name} onClick={() => setPlate({ ...plate, [f.name]: (plate[f.name] || 0) + 1 })} className="px-2 py-2 rounded-xl text-[11px] font-black text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: GROUPS[f.group].color }}>
                {f.name} +{plate[f.name] ? ' (' + plate[f.name] + ')' : ''}
              </button>
            ))}
          </div>
          <button onClick={() => setPlate({})} className="w-full px-3 py-2 rounded-xl text-xs font-black bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
            Clear the plate
          </button>
          <button onClick={serve} className="w-full px-3 py-2 rounded-xl text-xs font-black bg-green-600 text-white hover:bg-green-700 transition-colors">
            Serve the day! (grade my plate)
          </button>
          <div className="p-3 rounded-2xl bg-green-600 text-white text-center">
            <div className="text-xs uppercase tracking-widest opacity-80">Balance score</div>
            <div className="text-3xl font-black">{score}/100</div>
          </div>
          {review && (
            <div className={'p-2 rounded-xl text-[11px] font-semibold border-2 ' + (score >= 90 ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-amber-50 border-amber-300 text-amber-800')}>
              {review}
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
          "Sweets give instant energy, so they are the best food." Try a plate of ONLY jalebi and rice -- the score collapses. Quick energy without builders and shields still leaves you weak and sick.
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-sky-50 border-2 border-sky-200">
        <div className="text-sm font-black text-sky-800">What to try</div>
        <ol className="text-xs text-sky-700 list-decimal list-inside mt-1 space-y-1">
          <li>Build a 100/100 plate using at least SIX different foods -- then read the coach card with zero warnings.</li>
          <li>Make the plate missing ONLY body-building food and read the warning. Now which of your favourite dishes fixes it?</li>
        </ol>
      </div>
    </div>
  );
}

export { C6_ScienceMindfulEatingAPathToSim };
export default C6_ScienceMindfulEatingAPathToSim;
