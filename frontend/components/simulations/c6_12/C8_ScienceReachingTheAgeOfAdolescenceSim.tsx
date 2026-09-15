'use client';
/**
 * C8_ScienceReachingTheAgeOfAdolescenceSim (Class 8 Science)
 *
 * ELI5: Between about 11 and 19, hormones switch on growth and change: the
 * growth spurt, new body proportions, oily skin, and secondary sexual
 * characters. Girls usually start earlier than boys; everyone lands at a
 * different point on the same timeline - and it is completely normal.
 */
import React, { useState } from 'react';

const CHANGES: { name: string; girlStart: number; boyStart: number; note: string }[] = [
  { name: 'Sudden height spurt begins', girlStart: 10, boyStart: 12, note: 'longest bones grow fastest - girls often shoot up first' },
  { name: 'Skin gets oily, pimples appear', girlStart: 11, boyStart: 13, note: 'sweat and oil glands become more active' },
  { name: 'Body shape changes (hips / shoulders)', girlStart: 11, boyStart: 13, note: 'girls widen at hips, boys at shoulders' },
  { name: 'Voice deepens', girlStart: 12, boyStart: 13, note: 'larynx grows - in boys it is dramatic (voice cracking!)' },
  { name: 'Hair grows in armpits and pubic area', girlStart: 12, boyStart: 13, note: 'one of the clearest secondary sexual characters' },
  { name: 'First menstruation / increased muscle', girlStart: 12, boyStart: 14, note: 'girls: menarche; boys: muscle mass and broader chest' },
];

function heightAt(age: number, isGirl: boolean): number {
  // simplified S-curve growth (cm)
  const adult = isGirl ? 162 : 175;
  const mid = isGirl ? 12 : 14;
  const steep = 1 / (1 + Math.exp(-(age - mid) * 1.1));
  return Math.round((adult * (0.72 + 0.28 * steep)) * 10) / 10;
}

export function C8_ScienceReachingTheAgeOfAdolescenceSim() {
  const [age, setAge] = useState(8);
  const [isGirl, setIsGirl] = useState(true);
  const [quiz, setQuiz] = useState<number | null>(null);

  const height = heightAt(age, isGirl);
  const otherHeight = heightAt(age, !isGirl);
  const active = CHANGES.filter((c) => age >= (isGirl ? c.girlStart : c.boyStart));
  const pubertyStart = isGirl ? 10 : 12;
  const inAdolescence = age >= 11 && age <= 19;
  const growthRate = Math.round((heightAt(age + 0.25, isGirl) - height) * 40); // cm/year approx

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-pink-700">Reaching the Age of Adolescence: The Timeline Machine</h1>

      <div className="mt-3 p-4 bg-pink-50 border border-pink-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-pink-700">Growing up map:</span> adolescence means
          &quot;growing into adulthood&quot; - roughly ages 11 to 19. Chemical messengers called
          hormones (from the endocrine system: pituitary, thyroid, and sex hormones) switch the
          changes on one by one. Girls usually begin around 10-12, boys around 12-14, and both
          arrive at healthy adulthood on different schedules.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => setIsGirl(true)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${isGirl ? 'bg-pink-600 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}>
          Girl timeline
        </button>
        <button onClick={() => setIsGirl(false)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${!isGirl ? 'bg-sky-600 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}>
          Boy timeline
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Age</span><span className="font-mono text-pink-600">{age} years</span></label>
            <input type="range" min={8} max={19} value={age} aria-label="age" onChange={(e) => setAge(Number(e.target.value))} className="w-full mt-1 accent-pink-600" />
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
            <div>approx height: <span className="font-bold text-indigo-700">{height} cm</span></div>
            <div>growth rate now: <span className="font-bold" style={{ color: growthRate > 6 ? '#e11d48' : '#475569' }}>{growthRate} cm per year {growthRate > 6 ? '- GROWTH SPURT!' : ''}</span></div>
            <div className="text-xs text-slate-500 mt-1 font-sans">
              {age < pubertyStart
                ? `childhood - changes usually begin near age ${pubertyStart} on this timeline`
                : inAdolescence
                  ? `adolescence - ${active.length} of 6 milestone changes have appeared`
                  : 'young adulthood - the timeline is essentially complete'}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 mb-1">QUICK CHECK</p>
            <p className="text-xs text-slate-600 mb-1">Which gland is called the master gland because it controls other endocrine glands?</p>
            <div className="flex flex-wrap gap-2">
              {['Pancreas', 'Pituitary', 'Thyroid'].map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => setQuiz(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${quiz === i ? (i === 1 ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white') : 'bg-slate-200 hover:bg-slate-300'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {quiz !== null && (
              <div className={`mt-2 text-xs font-bold ${quiz === 1 ? 'text-emerald-700' : 'text-rose-700'}`}>
                {quiz === 1 ? 'Correct! The pituitary also triggers the growth spurt.' : 'Not quite - it is the pituitary, sitting just under the brain.'}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 bg-gradient-to-b from-pink-50 to-white rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 mb-2">CHANGE CHECKLIST (lit = appeared)</p>
          {CHANGES.map((c) => {
            const start = isGirl ? c.girlStart : c.boyStart;
            const on = age >= start;
            return (
              <div key={c.name} className={`mb-1.5 p-2 rounded-lg border text-xs transition-all ${on ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-slate-200'}`}>
                <div className="font-bold text-slate-700">
                  [{on ? 'x' : ' '}] {c.name} <span className="font-normal text-slate-400">(around age {start})</span>
                </div>
                {on && <div className="text-slate-500 mt-0.5">{c.note}</div>}
              </div>
            );
          })}
          <div className="mt-2 text-xs text-slate-500">
            The other timeline at age {age}: {otherHeight} cm - same journey, different schedule. Personal hygiene (bathing, clean clothes) matters extra now because sweat glands are active.
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Slide through one timeline and note the year with the fastest growth rate. Compare it with the other timeline - who peaks earlier?</li>
          <li>Find the youngest age at which all 6 changes have appeared on each timeline. Why is a 2-year spread between friends totally normal?</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_ScienceReachingTheAgeOfAdolescenceSim;
