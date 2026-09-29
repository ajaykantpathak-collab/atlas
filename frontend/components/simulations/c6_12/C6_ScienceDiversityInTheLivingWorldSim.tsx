/**
 * C6 Science -- Diversity in the Living World (Curiosity)
 *
 * One chapter concept: the huge variety of living things can be grouped
 * (classified) by features we choose -- how they move, where they live,
 * or what covers their body. The same animals sort differently when the
 * sorting rule changes.
 *
 * Interaction model: pick a sorting rule, then click animals to send
 * them into the correct group; feedback and score show how the SAME
 * organism belongs to different groups under different rules.
 */
import React, { useState } from 'react';

type Rule = 'move' | 'home' | 'cover';
type Animal = { name: string; emoji: string; move: string; home: string; cover: string };

const ANIMALS: Animal[] = [
  { name: 'Sparrow', emoji: '\u{1F426}', move: 'flies', home: 'trees', cover: 'feathers' },
  { name: 'Fish', emoji: '\u{1F41F}', move: 'swims', home: 'water', cover: 'scales' },
  { name: 'Cow', emoji: '\u{1F404}', move: 'walks', home: 'land', cover: 'fur' },
  { name: 'Frog', emoji: '\u{1F438}', move: 'hops', home: 'both', cover: 'moist skin' },
  { name: 'Snake', emoji: '\u{1F40D}', move: 'crawls', home: 'land', cover: 'scales' },
  { name: 'Butterfly', emoji: '\u{1F98B}', move: 'flies', home: 'land', cover: 'scales' },
  { name: 'Duck', emoji: '\u{1F986}', move: 'swims', home: 'both', cover: 'feathers' },
  { name: 'Monkey', emoji: '\u{1F435}', move: 'walks', home: 'trees', cover: 'fur' },
];

const RULES: Record<Rule, { label: string; groups: string[]; question: string }> = {
  move: { label: 'How does it move?', groups: ['flies', 'swims', 'walks', 'crawls', 'hops'], question: 'Click an animal, then click the movement group it belongs to.' },
  home: { label: 'Where does it live?', groups: ['land', 'water', 'trees', 'both'], question: '"both" means it lives happily on land AND in water.' },
  cover: { label: 'What covers its body?', groups: ['feathers', 'fur', 'scales', 'moist skin'], question: 'Body covering is a very useful clue scientists use to group animals.' },
};

function C6_ScienceDiversityInTheLivingWorldSim() {
  const [rule, setRule] = useState<Rule>('move');
  const [picked, setPicked] = useState<Animal>(ANIMALS[0]);
  const [placed, setPlaced] = useState<Record<string, string>>({}); // animal name -> group (latest)
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);
  const [score, setScore] = useState({ right: 0, tried: 0 });

  const groups = RULES[rule].groups;
  const placedCount = Object.keys(placed).length;

  const place = (g: string) => {
    const correctGroup = picked[rule];
    const ok = g === correctGroup;
    setPlaced((p) => ({ ...p, [picked.name]: g }));
    setFeedback({ ok, text: ok ? picked.name + ' belongs to "' + g + '" under this rule!' : picked.name + ' actually goes to "' + correctGroup + '". Look again!' });
    setScore((s) => ({ right: s.right + (ok ? 1 : 0), tried: s.tried + 1 }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl border-2 border-teal-200 shadow-xl font-sans text-slate-800">
      <h2 className="text-xl md:text-2xl font-black text-teal-700">Diversity in the Living World -- Sorting Safari</h2>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
        Scientists have described more than a million kinds of living things! To study them we <b>group</b> them by
        features. But here is the twist: the <b>same animal</b> lands in different groups when you change the
        sorting rule. Try all three rules on the duck!
      </p>

      <div className="flex flex-wrap gap-2 mt-3">
        {(Object.keys(RULES) as Rule[]).map((r) => (
          <button key={r} onClick={() => { setRule(r); setFeedback(null); }} className={'px-4 py-1.5 rounded-full text-sm font-bold transition-all ' + (rule === r ? 'bg-teal-600 text-white shadow-md' : 'bg-teal-100 text-teal-700 hover:bg-teal-200')}>
            {RULES[r].label}
          </button>
        ))}
        <button onClick={() => { setPlaced({}); setFeedback(null); setScore({ right: 0, tried: 0 }); }} className="ml-auto px-4 py-1.5 rounded-full text-xs font-black bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">
          Reset board
        </button>
      </div>

      <div className="grid md:grid-cols-[1fr_240px] gap-4 mt-4">
        <div className="rounded-2xl border-2 border-teal-100 bg-teal-50/40 p-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Click an animal, then its group</div>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {ANIMALS.map((a) => (
              <button key={a.name} onClick={() => { setPicked(a); setFeedback(null); }} className={'p-2 rounded-xl text-center transition-all duration-200 border-2 ' + (picked.name === a.name ? 'bg-white border-teal-500 shadow-md scale-105' : 'bg-white/70 border-transparent hover:border-teal-200')}>
                <div className="text-3xl">{a.emoji}</div>
                <div className="text-[10px] font-bold text-slate-600">{a.name}</div>
                {placed[a.name] && <div className="text-[9px] font-black text-teal-600">{placed[a.name]}</div>}
              </button>
            ))}
          </div>
          <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(' + Math.min(groups.length, 3) + ', minmax(0, 1fr))' }}>
            {groups.map((g) => (
              <button key={g} onClick={() => place(g)} className={'px-2 py-2.5 rounded-xl text-xs font-black capitalize transition-all active:scale-95 ' + (feedback && feedback.ok && picked[rule] === g ? 'bg-emerald-500 text-white' : 'bg-white text-teal-700 border-2 border-teal-200 hover:bg-teal-600 hover:text-white')}>
                {g}
              </button>
            ))}
          </div>
          <div className="mt-2 text-[11px] text-slate-500">{RULES[rule].question} -- placed {placedCount}/{ANIMALS.length}.</div>
        </div>

        <div className="space-y-3">
          <div className="p-3 rounded-2xl bg-teal-600 text-white text-center">
            <div className="text-xs uppercase tracking-widest opacity-80">Holding</div>
            <div className="text-3xl">{picked.emoji}</div>
            <div className="text-sm font-black">{picked.name}</div>
          </div>
          {feedback && (
            <div key={feedback.text} className={'p-3 rounded-2xl text-xs font-bold border-2 ' + (feedback.ok ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-rose-50 border-rose-300 text-rose-600')}>
              {feedback.ok ? 'Correct! ' : 'Not quite. '}
              {feedback.text}
            </div>
          )}
          <div className="p-2 rounded-xl bg-gold-50 border-2 border-gold-200 text-[11px] text-gold-800 font-bold text-center">
            Score: {score.right}/{score.tried}
          </div>
          <div className="p-2 rounded-xl bg-amber-50 border-2 border-amber-200 text-[11px] text-amber-800 font-semibold">
            Rule: {RULES[rule].label} -- try the duck under EVERY rule to see how groups change!
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-gold-50 border-2 border-gold-200">
        <div className="text-sm font-black text-gold-800">What to try</div>
        <ol className="text-xs text-gold-700 list-decimal list-inside mt-1 space-y-1">
          <li>Sort ALL 8 animals under "How does it move?", then switch to "Where does it live?". Which animal changed groups the most?</li>
          <li>Find one group that is ALWAYS empty no matter the rule -- or prove all groups can be filled. What does that tell you about choosing good features for classification?</li>
        </ol>
      </div>
    </div>
  );
}

export { C6_ScienceDiversityInTheLivingWorldSim };
export default C6_ScienceDiversityInTheLivingWorldSim;
