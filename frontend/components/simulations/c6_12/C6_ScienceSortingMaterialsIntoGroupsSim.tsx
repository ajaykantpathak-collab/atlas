/**
 * C6 Science -- Sorting Materials into Groups
 *
 * One chapter concept: we sort objects into groups by choosing ONE
 * property at a time -- is it metal? does it shine? does it float? is
 * it transparent? The SAME objects land in different groups when the
 * chosen property changes. Watch out: shiny does not mean metal!
 *
 * Interaction model: pick a property with the four big buttons and the
 * objects fly into YES / NO bins. Click any object to inspect its full
 * property card and hunt the trick objects.
 */
import React, { useState } from 'react';

type Obj = { name: string; color: string; shape: 'nail' | 'spoon' | 'ball' | 'block' | 'marble' | 'bottle' | 'wire' | 'chalk'; metal: boolean; shiny: boolean; floats: boolean; transparent: boolean };

const OBJECTS: Obj[] = [
  { name: 'Iron nail', color: '#64748b', shape: 'nail', metal: true, shiny: true, floats: false, transparent: false },
  { name: 'Copper wire', color: '#ea580c', shape: 'wire', metal: true, shiny: true, floats: false, transparent: false },
  { name: 'Steel spoon', color: '#94a3b8', shape: 'spoon', metal: true, shiny: true, floats: false, transparent: false },
  { name: 'Glass marble', color: '#67e8f9', shape: 'marble', metal: false, shiny: true, floats: false, transparent: true },
  { name: 'Wooden block', color: '#b45309', shape: 'block', metal: false, shiny: false, floats: true, transparent: false },
  { name: 'Plastic bottle', color: '#a5f3fc', shape: 'bottle', metal: false, shiny: false, floats: true, transparent: true },
  { name: 'Rubber ball', color: '#f43f5e', shape: 'ball', metal: false, shiny: false, floats: true, transparent: false },
  { name: 'Chalk', color: '#e7e5e4', shape: 'chalk', metal: false, shiny: false, floats: false, transparent: false },
];

type Prop = 'metal' | 'shiny' | 'floats' | 'transparent';
const PROPS: Record<Prop, { label: string; question: string }> = {
  metal: { label: 'Made of metal?', question: 'Which objects are METALS?' },
  shiny: { label: 'Shiny (lustre)?', question: 'Which objects SHINE when light falls on them?' },
  floats: { label: 'Floats in water?', question: 'Which objects FLOAT in water?' },
  transparent: { label: 'See-through?', question: 'Which objects can you SEE THROUGH?' },
};

function ObjShape(o: Obj): JSX.Element {
  switch (o.shape) {
    case 'nail':
      return <g><rect x="-5" y="-6" width="10" height="26" rx="3" fill={o.color} /><polygon points="-5,-6 5,-6 0,-18" fill={o.color} /></g>;
    case 'spoon':
      return <g><ellipse cx="0" cy="-10" rx="10" ry="14" fill={o.color} /><rect x="-3" y="2" width="6" height="22" rx="3" fill={o.color} /></g>;
    case 'ball':
      return <circle r="15" fill={o.color} />;
    case 'block':
      return <rect x="-16" y="-11" width="32" height="22" rx="3" fill={o.color} />;
    case 'marble':
      return <g><circle r="14" fill={o.color} opacity="0.85" /><circle cx="-5" cy="-5" r="3.5" fill="#ffffff" opacity="0.9" /></g>;
    case 'bottle':
      return <g><rect x="-8" y="-6" width="16" height="24" rx="4" fill={o.color} opacity="0.85" /><rect x="-4" y="-14" width="8" height="9" rx="2" fill="#0284c7" /></g>;
    case 'wire':
      return <path d="M -14 12 Q -14 -14 0 -14 Q 14 -14 14 12" stroke={o.color} strokeWidth="5" fill="none" strokeLinecap="round" />;
    case 'chalk':
      return <rect x="-14" y="-6" width="28" height="12" rx="4" fill={o.color} stroke="#d6d3d1" />;
  }
}

function C6_ScienceSortingMaterialsIntoGroupsSim() {
  const [prop, setProp] = useState<Prop>('metal');
  const [inspect, setInspect] = useState(3);
  const [sorted, setSorted] = useState(false);

  const reset = () => {
    setProp('metal');
    setInspect(3);
    setSorted(false);
  };

  const chooseProp = (p: Prop) => {
    setProp(p);
    setSorted(true);
  };

  const target = (o: Obj): { x: number; y: number } => (o[prop] ? { x: 160, y: 215 } : { x: 480, y: 215 });
  const o = OBJECTS[inspect];
  const yesList = OBJECTS.filter((ob) => ob[prop]).map((ob) => ob.name);
  const trapNote = prop === 'shiny'
    ? 'Trick: the glass marble sneaks into the shiny group -- but it is NOT a metal!'
    : prop === 'floats'
    ? 'Pattern: everything that floats here is a non-metal. Metals are dense -- they sink.'
    : prop === 'metal'
    ? 'Pattern: all three metals are also shiny and all of them sink.'
    : 'Only the marble and the plastic bottle let light pass cleanly.';

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl border-2 border-sky-200 shadow-xl font-sans text-slate-800">
      <h2 className="text-xl md:text-2xl font-black text-sky-700">Sorting materials into groups</h2>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
        Scientists sort things by ONE property at a time. Choose a property and watch all 8 objects rush to
        their bins. Change the property -- the SAME objects make completely NEW groups!
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 mt-3">
        {(Object.keys(PROPS) as Prop[]).map((p) => (
          <button key={p} onClick={() => chooseProp(p)} className={'px-2 min-h-11 rounded-xl text-xs font-black transition-colors ' + (prop === p && sorted ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}>
            {PROPS[p].label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-[1fr_240px] gap-4 mt-4">
        <div className="rounded-2xl border-2 border-sky-100 bg-sky-50/40 overflow-hidden">
          <svg viewBox="0 0 640 300" className="w-full">
            <rect width="640" height="300" fill="#f0f9ff" />
            <text x="320" y="24" textAnchor="middle" fontSize="14" fontWeight="900" fill="#0369a1">{PROPS[prop].question}</text>
            <rect x="0" y="76" width="640" height="8" fill="#bae6fd" />
            {/* bins */}
            <rect x="70" y="195" width="180" height="90" rx="12" fill="#dcfce7" stroke="#22c55e" strokeWidth="3" />
            <text x="160" y="280" textAnchor="middle" fontSize="12" fontWeight="900" fill="#166534">YES: {yesList.length} objects</text>
            <rect x="390" y="195" width="180" height="90" rx="12" fill="#fee2e2" stroke="#ef4444" strokeWidth="3" />
            <text x="480" y="280" textAnchor="middle" fontSize="12" fontWeight="900" fill="#991b1b">NO: {8 - yesList.length} objects</text>
            {OBJECTS.map((ob, i) => {
              const t = sorted ? target(ob) : { x: 80 + i * 70, y: 55 };
              return (
                <g key={ob.name} onClick={() => setInspect(i)} style={{ cursor: 'pointer', transition: 'transform 0.8s ease ' + (sorted ? i * 0.06 : 0) + 's', transform: 'translate(' + t.x + 'px,' + t.y + 'px)' }}>
                  <g style={{ transition: 'transform 0.3s ease' }} transform={i === inspect ? 'scale(1.25)' : 'scale(1)'}>
                    <ObjShape {...ob} />
                  </g>
                  {i === inspect && <circle r="24" fill="none" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="4 4" />}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="space-y-3">
          <div className="p-3 rounded-2xl bg-sky-600 text-white">
            <div className="text-xs uppercase tracking-widest opacity-80">Inspector card</div>
            <div className="text-xl font-black">{o.name}</div>
            <ul className="text-xs mt-1 space-y-0.5">
              <li>Metal: {o.metal ? 'YES' : 'no'}</li>
              <li>Shiny: {o.shiny ? 'YES' : 'no'}</li>
              <li>Floats: {o.floats ? 'YES' : 'no'}</li>
              <li>See-through: {o.transparent ? 'YES' : 'no'}</li>
            </ul>
            <div className="text-[10px] opacity-80 mt-1">Click any object on the shelf to inspect it.</div>
          </div>
          <div className="p-2 rounded-xl bg-amber-50 border-2 border-amber-200 text-[11px] text-amber-800 font-semibold">{trapNote}</div>
          <button onClick={reset} className="w-full px-3 py-2 rounded-xl text-xs font-black bg-slate-800 text-white hover:bg-slate-700 transition-colors">
            Reset
          </button>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-rose-50 border-2 border-rose-200">
        <div className="text-sm font-black text-rose-800">Misconception buster</div>
        <div className="text-xs text-rose-700 mt-0.5">
          "If it shines, it is metal." Choose "Shiny" -- four objects glow, but only three are metals. The glass marble shines just like a jewel without a gram of metal in it.
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-sky-50 border-2 border-sky-200">
        <div className="text-sm font-black text-sky-800">What to try</div>
        <ol className="text-xs text-sky-700 list-decimal list-inside mt-1 space-y-1">
          <li>Sort by "See-through", then inspect the plastic bottle: it is see-through like glass -- is it a metal? Which TWO properties agree?</li>
          <li>Find ONE property that puts the iron nail and the wooden block in the SAME group -- or prove none exists.</li>
        </ol>
      </div>
    </div>
  );
}

export { C6_ScienceSortingMaterialsIntoGroupsSim };
export default C6_ScienceSortingMaterialsIntoGroupsSim;
