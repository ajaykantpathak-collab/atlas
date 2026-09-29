/**
 * C6 Science -- The Wonderful World of Science
 *
 * One chapter concept: science is a METHOD, not a list of facts. We
 * observe something, ask a question, make a guess (hypothesis), TEST
 * it, and conclude from what we saw. A guess that fails the test is
 * still good science -- the test decides, not us.
 *
 * Interaction model: two kitchen mysteries. First put the five steps
 * of the scientific method in order, then actually RUN the test and
 * wait a few days to see the verdict for yourself.
 */
import React, { useState } from 'react';

type Step = 'observe' | 'question' | 'guess' | 'test' | 'conclude';
const RIGHT_ORDER: Step[] = ['observe', 'question', 'guess', 'test', 'conclude'];
const SHUFFLED: Step[] = ['guess', 'test', 'observe', 'conclude', 'question'];

const STEP_LABEL: Record<string, string> = {
  observe: '1. Observe', question: '2. Ask a question', guess: '3. Make a guess', test: '4. Test it', conclude: '5. Conclude',
};

type Mystery = {
  name: string;
  text: Record<string, string>;
  testButton: string;
  verdict: string;
  rule: string;
};

const MYSTERIES: Mystery[] = [
  {
    name: 'The leaning sprout',
    text: {
      observe: 'My bean sprout on the windowsill has bent towards the WINDOW.',
      question: 'Why is it bending towards the window and not straight up?',
      guess: 'Maybe it grows towards LIGHT (the window is the brightest place).',
      test: 'Turn the pot around so the sprout leans AWAY from the window. Then wait 3 days.',
      verdict: 'After 3 days it bent BACK to the window -- even in the turned pot!',
      rule: 'Conclusion: light steers the sprout\'s growth. A plant responds to light (this is called phototropism).',
    },
    testButton: 'Test: turn the pot around',
    verdict: 'The sprout bent back toward the light within 3 days. The guess survives the test!',
    rule: 'Conclusion: the plant is responding to light -- one more way living things respond to their surroundings.',
  },
  {
    name: 'The vanishing water',
    text: {
      observe: 'The water in my open glass on the table keeps going down -- nobody drank it!',
      question: 'Where is the water going?',
      guess: 'Maybe it is escaping into the AIR as invisible vapour.',
      test: 'Cover a second glass with a lid, keep both side by side, then wait 3 days.',
      verdict: 'Open glass: level fell. Covered glass: level stayed, with drops ON the lid!',
      rule: 'Conclusion: the drops on the lid prove it -- water turned into vapour, hit the lid, and stayed. It evaporated.',
    },
    testButton: 'Test: cover one glass',
    verdict: 'Drops sit on the lid of the covered glass. The escaping water was caught red-handed!',
    rule: 'Conclusion: water escapes into air as vapour (evaporation) -- the covered glass proves it.',
  },
];

function C6_ScienceTheWonderfulWorldOfScienceSim() {
  const [m, setM] = useState(0);
  const [progress, setProgress] = useState(0); // how many steps correctly placed
  const [ranTest, setRanTest] = useState(false);
  const [waited, setWaited] = useState(false);
  const [wrong, setWrong] = useState<string | null>(null);

  const reset = () => {
    setProgress(0);
    setRanTest(false);
    setWaited(false);
    setWrong(null);
  };
  const pickMystery = (i: number) => {
    setM(i);
    reset();
  };

  const clickStep = (s: Step) => {
    if (progress >= 5) return;
    if (RIGHT_ORDER[progress] === s) {
      setProgress(progress + 1);
      setWrong(null);
    } else {
      setWrong(progress === 0
        ? 'Start at the very beginning: what did you actually SEE? That is "' + STEP_LABEL[RIGHT_ORDER[0]] + '".'
        : 'Not yet -- after "' + STEP_LABEL[RIGHT_ORDER[progress - 1]] + '" comes "' + STEP_LABEL[RIGHT_ORDER[progress]] + '".');
    }
  };

  const done = progress >= 5;
  const mys = MYSTERIES[m];
  const testReady = done;
  const verdictReady = ranTest && waited;

  // sprout lean: right (toward window) -> turned left -> bends right again
  const lean = m === 0 ? (ranTest ? (waited ? 1 : -1) : 1) : 1;
  const openLevel = m === 1 ? (waited ? 30 : 70) : 70;
  const lidLevel = 70;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl border-2 border-gold-200 shadow-xl font-sans text-slate-800">
      <h2 className="text-xl md:text-2xl font-black text-gold-700">The wonderful world of science -- think like a scientist</h2>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
        Science is not magic answers -- it is a fair <b>method</b>: observe, question, guess, test, conclude.
        Order the five steps, then run the test and WAIT. Remember: a wrong guess is not a failure -- the test
        is the judge.
      </p>

      <div className="flex flex-wrap gap-2 mt-3">
        {MYSTERIES.map((mys2, i) => (
          <button key={mys2.name} onClick={() => pickMystery(i)} className={'px-3 py-2 rounded-xl text-xs font-black transition-colors ' + (m === i ? 'bg-gold-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}>
            Mystery {i + 1}: {mys2.name}
          </button>
        ))}
        <button onClick={reset} className="px-3 py-2 rounded-xl text-xs font-black bg-slate-800 text-white hover:bg-slate-700 transition-colors">
          Reset
        </button>
      </div>

      <div className="grid md:grid-cols-[1fr_260px] gap-4 mt-4">
        <div className="rounded-2xl border-2 border-gold-100 bg-gold-50/40 overflow-hidden">
          <svg viewBox="0 0 640 300" className="w-full">
            <rect width="640" height="300" fill="#f5f3ff" />
            {m === 0 && (
              <g>
                {/* window with light beam on the right */}
                <rect x="500" y="40" width="120" height="150" rx="6" fill="#bae6fd" stroke="#7dd3fc" strokeWidth="4" />
                <line x1="560" y1="40" x2="560" y2="190" stroke="#7dd3fc" strokeWidth="3" />
                <polygon points="500,115 300,140 300,220 500,175" fill="#fef08a" opacity="0.45" />
                {/* sill and pot */}
                <rect x="120" y="220" width="420" height="14" rx="4" fill="#a8a29e" />
                <path d="M 270 220 L 280 190 L 340 190 L 350 220 Z" fill="#d97706" />
                <g style={{ transition: 'transform 1.2s ease', transform: 'translate(310px,190px) scale(' + lean + ',1) translate(-310px,-190px)' }}>
                  <path d="M 310 190 Q 322 140 316 95" stroke="#16a34a" strokeWidth="7" fill="none" strokeLinecap="round" />
                  <ellipse cx="330" cy="120" rx="18" ry="9" fill="#22c55e" transform="rotate(-28 330 120)" />
                  <ellipse cx="306" cy="150" rx="16" ry="8" fill="#16a34a" transform="rotate(24 306 150)" />
                </g>
                <text x="320" y="262" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#5b21b6">
                  {verdictReady ? 'Day 3: bent back to the window -- even in the turned pot!' : ranTest ? 'Pot turned: sprout now leans away. Now WAIT 3 days...' : 'The sprout leans toward the window light.'}
                </text>
              </g>
            )}
            {m === 1 && (
              <g>
                <rect x="0" y="230" width="640" height="70" fill="#ddd6fe" />
                {/* open glass */}
                <path d="M 190 110 L 200 230 L 300 230 L 310 110" stroke="#64748b" strokeWidth="5" fill="none" />
                <rect x={198 + (70 - openLevel) * 0.14} y={230 - openLevel} width={104 - (70 - openLevel) * 0.14} height={openLevel} fill="#38bdf8" opacity="0.8" style={{ transition: 'all 1s ease' }} />
                <text x="250" y="258" textAnchor="middle" fontSize="12" fontWeight="900" fill="#4c1d95">open glass</text>
                {/* covered glass */}
                <path d="M 400 110 L 410 230 L 510 230 L 520 110" stroke="#64748b" strokeWidth="5" fill="none" />
                <rect x="418" y={230 - lidLevel} width={94} height={lidLevel} fill="#38bdf8" opacity="0.8" style={{ transition: 'all 1s ease' }} />
                {waited && [0, 1, 2, 3].map((i) => <circle key={i} cx={425 + i * 22} cy="112" r="4.5" fill="#e0f2fe" stroke="#7dd3fc" />)}
                {waited && <rect x="396" y="96" width="128" height="12" rx="6" fill="#94a3b8" />}
                <text x="460" y="258" textAnchor="middle" fontSize="12" fontWeight="900" fill="#4c1d95">{waited ? 'covered + drops on lid' : 'covered glass'}</text>
                <text x="320" y="290" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#5b21b6">
                  {verdictReady ? 'Day 3: open glass fell, covered glass kept its water!' : ranTest ? 'One glass covered. Now WAIT 3 days...' : 'Two identical glasses of water on the table.'}
                </text>
              </g>
            )}
          </svg>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Order the method</div>
          {SHUFFLED.map((s) => {
            const placed = RIGHT_ORDER.findIndex((r) => r === s) < progress;
            return (
              <button key={s} onClick={() => clickStep(s)} disabled={placed} className={'w-full text-left px-3 py-2 rounded-xl text-xs font-black transition-colors ' + (placed ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200')}>
                {placed ? '[ok] ' : ''}{STEP_LABEL[s]}
              </button>
            );
          })}
          {wrong && <div className="p-2 rounded-xl bg-rose-50 border-2 border-rose-300 text-[11px] font-semibold text-rose-700">{wrong}</div>}
          {done && (
            <div className="p-2 rounded-xl bg-gold-50 border-2 border-gold-300 text-[11px] text-gold-800 font-semibold">
              {mys.text[progress >= 5 ? 'test' : 'observe']}
            </div>
          )}
          {testReady && !ranTest && (
            <button onClick={() => setRanTest(true)} className="w-full min-h-11 px-3 py-2 rounded-xl text-xs font-black bg-gold-600 text-white hover:bg-gold-700 transition-colors">
              {mys.testButton}
            </button>
          )}
          {ranTest && !waited && (
            <button onClick={() => setWaited(true)} className="w-full min-h-11 px-3 py-2 rounded-xl text-xs font-black bg-amber-400 text-amber-900 hover:bg-amber-300 transition-colors">
              Wait 3 days &gt;
            </button>
          )}
          {verdictReady && (
            <div className="p-2 rounded-xl bg-emerald-50 border-2 border-emerald-300 text-[11px] font-bold text-emerald-800">
              {mys.verdict}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-amber-50 border-2 border-amber-200">
        <div className="text-sm font-black text-amber-800">Misconception buster</div>
        <div className="text-xs text-amber-700 mt-0.5">
          "If my guess fails the test, science failed." Wrong! Imagine the sprout had NOT turned back -- that result is just as useful: it kills the guess and points to a new one. Scientists are wrong BEFORE they are right, every time.
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-gold-50 border-2 border-gold-200">
        <div className="text-sm font-black text-gold-800">What to try</div>
        <ol className="text-xs text-gold-700 list-decimal list-inside mt-1 space-y-1">
          <li>Order all 5 steps with ZERO wrong clicks on both mysteries -- then write the full chain from observation to conclusion for ONE of them.</li>
          <li>Design a better test for Mystery 1: what would you expect if you covered the window with black paper? Which step would that answer?</li>
        </ol>
      </div>
    </div>
  );
}

export { C6_ScienceTheWonderfulWorldOfScienceSim };
export default C6_ScienceTheWonderfulWorldOfScienceSim;
