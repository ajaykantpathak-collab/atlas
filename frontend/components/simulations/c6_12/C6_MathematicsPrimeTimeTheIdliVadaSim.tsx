/**
 * C6 Mathematics -- Prime Time: The Idli-Vada Game (Ganita Prakash)
 *
 * One chapter concept: common multiples and the LCM. Children count
 * numbers in turn; multiples of the first number are "idli", multiples
 * of the second are "vada", and common multiples shout "idli-vada"!
 *
 * Interaction model: press Next (or Auto play) to march the counter,
 * watch the speech bubble say number / idli / vada / idli-vada, change
 * the two game numbers, and speed up the count.
 */
import React, { useState, useEffect, useRef } from 'react';

function C6_MathematicsPrimeTimeTheIdliVadaSim() {
  const [numA, setNumA] = useState(3);
  const [numB, setNumB] = useState(5);
  const [current, setCurrent] = useState(0); // 0 = game not started yet
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(2); // ticks per second
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isA = current > 0 && current % numA === 0;
  const isB = current > 0 && current % numB === 0;
  const say = current === 0 ? 'Press Next to start!' : isA && isB ? 'idli-vada!' : isA ? 'idli!' : isB ? 'vada!' : String(current);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (playing) {
      timerRef.current = setInterval(() => {
        setCurrent((c) => (c >= 60 ? 1 : c + 1));
      }, 1000 / speed);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing, speed]);

  const step = () => setCurrent((c) => (c >= 60 ? 1 : c + 1));
  const reset = () => {
    setPlaying(false);
    setCurrent(0);
  };

  const cellTone = (n: number): string => {
    if (n === current) return 'bg-indigo-600 text-white scale-110 shadow-lg ring-2 ring-indigo-300';
    const a = n % numA === 0;
    const b = n % numB === 0;
    if (a && b) return 'bg-purple-500 text-white font-black';
    if (a) return 'bg-sky-200 text-sky-900 font-bold';
    if (b) return 'bg-orange-200 text-orange-900 font-bold';
    return 'bg-white text-slate-500 hover:bg-slate-100';
  };

  const firstCommon = (numA * numB) / gcd(numA, numB);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl border-2 border-purple-200 shadow-xl font-sans text-slate-800">
      <h2 className="text-xl md:text-2xl font-black text-purple-700">The Idli-Vada Game -- common multiples hunt</h2>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
        Friends sit in a circle and count 1, 2, 3... If the number is a multiple of <b>{numA}</b> you say
        <b> "idli"</b>. If it is a multiple of <b>{numB}</b> you say <b>"vada"</b>. A multiple of BOTH? You must
        shout <b>"idli-vada"</b>! The first such number is the <b>LCM</b>.
      </p>

      <div className="flex flex-wrap items-center gap-3 mt-3 p-3 rounded-2xl bg-purple-50 border-2 border-purple-100">
        {[
          { label: 'Game number A', v: numA, set: setNumA },
          { label: 'Game number B', v: numB, set: setNumB },
        ].map((s) => (
          <label key={s.label} className="text-xs font-semibold text-slate-500">
            <span className="block">{s.label}</span>
            <input type="range" min={2} max={9} value={s.v} onChange={(e) => { s.set(Number(e.target.value)); reset(); }} className="w-32 accent-purple-600" />
            <span className="text-purple-700 font-black ml-1">{s.v}</span>
          </label>
        ))}
        <label className="text-xs font-semibold text-slate-500">
          <span className="block">Speed</span>
          <input type="range" min={1} max={6} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-24 accent-purple-600" />
          <span className="text-purple-700 font-black ml-1">{speed}x</span>
        </label>
      </div>

      <div className="grid md:grid-cols-[1fr_220px] gap-4 mt-4">
        <div className="grid grid-cols-10 gap-1 p-2 rounded-2xl bg-purple-50 border-2 border-purple-100">
          {Array.from({ length: 60 }, (_, i) => i + 1).map((n) => (
            <button key={n} onClick={() => { setPlaying(false); setCurrent(n); }} className={'aspect-square rounded-lg text-xs transition-all duration-200 ' + cellTone(n)}>
              {n}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-gradient-to-b from-purple-500 to-fuchsia-500 text-white text-center shadow-lg">
            <div className="text-xs uppercase tracking-widest opacity-80">Child number {Math.max(current, 1)} says...</div>
            <div className="text-3xl font-black mt-2 min-h-[2.5rem] flex items-center justify-center">{say}</div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { setPlaying(false); step(); }} className="flex-1 px-3 py-2 rounded-xl bg-purple-600 text-white text-sm font-black hover:bg-purple-700 transition-colors">
              Next &gt;
            </button>
            <button onClick={() => setPlaying(!playing)} className="flex-1 px-3 py-2 rounded-xl bg-fuchsia-600 text-white text-sm font-black hover:bg-fuchsia-700 transition-colors">
              {playing ? 'Pause' : 'Auto play'}
            </button>
          </div>
          <button onClick={reset} className="w-full px-3 py-2 rounded-xl bg-slate-100 text-slate-500 text-xs font-bold hover:bg-slate-200 transition-colors">
            Reset game
          </button>
          <div className="p-3 rounded-2xl bg-amber-50 border-2 border-amber-200 text-xs">
            <span className="font-bold text-amber-800">Secret revealed: </span>
            <span className="text-amber-700">
              the first idli-vada (LCM of {numA} and {numB}) is <b>{firstCommon}</b>. Idli-vada repeats every {firstCommon} numbers!
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-sky-50 border-2 border-sky-200">
        <div className="text-sm font-black text-sky-800">What to try</div>
        <ol className="text-xs text-sky-700 list-decimal list-inside mt-1 space-y-1">
          <li>Set the game numbers to 4 and 6. When do you FIRST shout idli-vada? It is NOT 24 -- look carefully!</li>
          <li>Can you find two game numbers where idli-vada comes very quickly (at the 6th count)? What do you notice about them?</li>
        </ol>
      </div>
    </div>
  );
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export { C6_MathematicsPrimeTimeTheIdliVadaSim };
export default C6_MathematicsPrimeTimeTheIdliVadaSim;
