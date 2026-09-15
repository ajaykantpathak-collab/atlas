'use client';

import React, { useCallback, useMemo, useState } from 'react';

/**
 * Class 10 Maths -- Probability
 * Run coin tosses and dice rolls in bulk; watch experimental probability
 * converge to the theoretical value (the Empirical vs Classical story).
 * Self-contained: react + tailwind only.
 */

type Mode = 'coin' | 'die';

// ─── Class 10 board-depth drill bank ───
// Targets uncovered board diagnostics for this chapter's nodes
// (see backend/its/competency/CLASS10_NODE_DEPTH.json). Static and deterministic.
interface DepthQuizItem {
  nodeId: string;
  q: string;
  options: string[];
  answer: number;
  why: string;
}

const DEPTH_QUIZ: DepthQuizItem[] = [
  {
    nodeId: 'c10_math_cbse_14_001',
    q: 'A bag contains 5 red and 3 blue balls. One ball is drawn at random. P(red) = ?',
    options: ['5/8', '5/3', '3/5', '1/2'],
    answer: 0,
    why: 'Classical probability = favourable / total = 5 / (5 + 3) = 5/8. P = 5/3 is impossible -- a probability can never exceed 1. The definition also needs EQUALLY LIKELY outcomes: each ball must have the same chance of being picked before favourable/total means anything.',
  },
  {
    nodeId: 'c10_math_cbse_14_001',
    q: 'What is the range of possible values of P(E)?',
    options: [
      '0 <= P(E) <= 1; P(E) = 0 for an impossible event, P(E) = 1 for a certain event',
      '-1 <= P(E) <= 1',
      '0 < P(E) < 1 only',
      'Any number between 0 and 100',
    ],
    answer: 0,
    why: 'A bag with ONLY red balls: P(blue) = 0 (impossible), P(red) = 1 (certain). P(E) = -0.5 is meaningless -- favourable outcomes and total outcomes are both counts, so their ratio cannot be negative.',
  },
  {
    nodeId: 'c10_math_cbse_14_002',
    q: 'A student writes the sample space for tossing two coins simultaneously as S = {HH, HT, TH}. Complete it correctly.',
    options: [
      'S = {HH, HT, TH, TT} -- four equally likely outcomes; missing TT',
      'S = {HH, HT} -- two outcomes',
      'S = {0H, 1H, 2H} -- three outcomes',
      'S = {HH, TT} -- two outcomes',
    ],
    answer: 0,
    why: 'TT is a real outcome -- omitting it makes the list incomplete and every computed probability wrong. Note the outcomes are distinct because coin 1 and coin 2 are distinguishable: HT and TH are different outcomes, each with probability 1/4.',
  },
  {
    nodeId: 'c10_math_cbse_14_002',
    q: 'A bag holds 5 red balls numbered 1-5 and 3 blue balls numbered 1-3. One ball is drawn. The sample space is best written as...',
    options: [
      'S = {R1, R2, R3, R4, R5, B1, B2, B3} -- 8 equally likely outcomes',
      'S = {red, blue} -- 2 outcomes',
      'S = {1, 2, 3, 4, 5} -- 5 outcomes',
      'S = {1, 2, 3} -- 3 outcomes',
    ],
    answer: 0,
    why: 'Colour AND number identify the outcome. With 8 equally likely outcomes, an event like "red ball with an even number" = {R2, R4} has P = 2/8 = 1/4.',
  },
  {
    nodeId: 'c10_math_cbse_14_003',
    q: 'Design an experiment with exactly 8 equally likely outcomes and an event E with P(E) = 3/8. Which design works?',
    options: [
      'A bag with 3 red and 5 blue identical balls: E = "ball drawn is red", P(E) = 3/8',
      'Throw a coin 3 times; E = "at least two heads" (P = 4/8, not 3/8)',
      'Roll one die; E = "get a 6" (P = 1/6)',
      'Draw from 2 red and 6 blue balls (P(red) = 1/4)',
    ],
    answer: 0,
    why: 'Any single draw from 8 identical-from-outside balls gives 8 equally likely outcomes; E as any 3 of them has probability 3/8. (The 3-coin toss DOES have 8 outcomes, but "at least two heads" covers HHX outcomes 4 ways = 1/2.)',
  },
  {
    nodeId: 'c10_math_cbse_14_004',
    q: 'A bag has 3 red, 4 blue, 5 green balls. A student says "3 colours, so P(red) = 1/3." What is wrong?',
    options: [
      'Outcomes (balls) must be equally likely, not colours; P(red) = 3/12 = 1/4',
      'Nothing -- 1/3 is correct',
      'P(red) = 3 + 4 + 5 = 12',
      'P(red) = 4/3',
    ],
    answer: 0,
    why: 'Colours are not outcomes of equal chance -- individual balls are. Red = 3 of 12 balls -> 1/4, blue = 4/12 = 1/3, green = 5/12. Counting categories instead of equally likely outcomes is the classic error.',
  },
  {
    nodeId: 'c10_math_cbse_14_005',
    q: 'A box holds 5 red, 8 blue, 7 green marbles (20 total). P(NOT green) = ?',
    options: ['13/20', '7/20', '7/13', '1/3'],
    answer: 0,
    why: 'Complement rule: P(not E) = 1 - P(E) = 1 - 7/20 = 13/20. When the "not" event is big and messy, computing the small event and subtracting is the fast, safe route -- e.g. P(card is NOT an ace) = 1 - 4/52 = 48/52 = 12/13.',
  },
  {
    nodeId: 'c10_math_cbse_14_005',
    q: 'Weather report: "probability of rain is 0.3". P(no rain) is...',
    options: [
      '0.7 -- rain and no-rain are complementary events, P(E) + P(not E) = 1',
      '0.3 -- rain is equally likely',
      '0 -- rain may not happen',
      '1.3 -- add the chances',
    ],
    answer: 0,
    why: 'E = "no rain" is exactly the complement of "rain", so P = 1 - 0.3 = 0.7. Complements must cover ALL possibilities with no overlap: every single die throw, E = prime {2,3,5} and F = even {2,4,6} overlap at 2, so they are NOT complementary even though P(E) = P(F) = 1/2.',
  },
  {
    nodeId: 'c10_math_cbse_14_006',
    q: 'One card from a standard 52-card deck. P(red or black) = ?',
    options: ['1 (a certain event)', '26/52 = 1/2', '13/52', '0'],
    answer: 0,
    why: 'Every card is red or black -- the event covers the whole sample space, so P = 52/52 = 1 (certainty). Contrast: a bag of only red balls gives P(blue) = 0 (impossible). Probability lives between these extremes.',
  },
  {
    nodeId: 'c10_math_cbse_14_007',
    q: 'A bag has 10 balls, 4 defective. P(non-defective) = ?',
    options: ['6/10 = 3/5', '4/10', '1/4', '10/4'],
    answer: 0,
    why: 'P(defective) = 4/10, so P(not defective) = 1 - 4/10 = 6/10. WHY does P(E) + P(not E) = 1? E and its complement partition the sample space: favourable(not E) = total - favourable(E), so dividing by the total gives the identity.',
  },
  {
    nodeId: 'c10_math_cbse_14_008',
    q: 'Two dice are rolled. A friend says P(sum = 7 or 11) = 2/11 "because there are 2 favoured sums out of 11 possible sums". Correct?',
    options: [
      'No -- sums are not equally likely; the 36 ordered pairs are. P = 6/36 + 2/36 = 8/36 = 2/9',
      'Yes -- 2 out of 11',
      'No -- the answer is 2/36',
      'Yes -- because dice have 6 faces each',
    ],
    answer: 0,
    why: 'The sample space for two dice is 36 ordered pairs, each equally likely. Sum 7 comes from 6 pairs, sum 11 from 2 pairs: P = 8/36 = 2/9. Counting "sums" instead of "pairs" is exactly the same error as counting colours instead of balls.',
  },
  {
    nodeId: 'c10_math_cbse_14_008',
    q: 'Two dice rolled: P(product is a perfect square)? A student counts only (1,1),(2,2),(3,3),(4,4),(5,5),(6,6) and answers 6/36. What did they miss?',
    options: [
      'Ordered non-equal pairs also give square products -- e.g. (1,4) and (4,1) give 4 -- so the count is 8 pairs, P = 8/36 = 2/9',
      'Nothing -- 6/36 is right',
      'Products on two dice can never be perfect squares',
      'The answer should be computed from sums instead',
    ],
    answer: 0,
    why: 'Perfect-square products: 1=(1,1); 4=(1,4),(2,2),(4,1); 9=(3,3); 16=(4,4); 25=(5,5); 36=(6,6) -- 8 ordered pairs out of 36. Dice are distinguishable (first die, second die), so (1,4) and (4,1) are different outcomes.',
  },
  {
    nodeId: 'c10_math_cbse_14_009',
    q: 'One card from 52. P(a face card) = ? and P(a red face card) = ?',
    options: [
      '12/52 = 3/13 and 6/52 = 3/26',
      '16/52 and 8/52 (counting aces as face cards)',
      '12/52 and 12/52',
      '9/52 and 3/26',
    ],
    answer: 0,
    why: 'Face cards = J, Q, K -- 3 per suit x 4 suits = 12, so 3/13. Red face cards = 3 in hearts + 3 in diamonds = 6, so 3/26. Aces are NOT face cards. "King OR red": 4 kings + 26 red - 2 red kings (overlap!) = 28, P = 28/52 = 7/13 -- never double-count the intersection.',
  },
  {
    nodeId: 'c10_math_cbse_14_009',
    q: 'A student computes P(spade or ace) as (13 + 4)/52 = 17/52. Fix it.',
    options: [
      'The ace of spades was counted twice: 13 + 4 - 1 = 16, P = 16/52 = 4/13',
      'Correct as 17/52',
      'Should be 13 x 4 / 52',
      'Should be 9/52',
    ],
    answer: 0,
    why: 'Addition rule: P(A or B) = P(A) + P(B) - P(A and B). Ace of spades is both a spade and an ace -- subtract 1. Same discipline as P(king or red) = 4/52 + 26/52 - 2/52 = 28/52.',
  },
  {
    nodeId: 'c10_math_cbse_14_010',
    q: 'Two coins tossed once. Which event has probability exactly 1/2?',
    options: [
      '"At least one head" = {HH, HT, TH} -- 3/4? No. The event with P = 1/2 is "exactly one head" = {HT, TH}, 2/4 = 1/2',
      '"At least one head" has P = 1/2',
      '"Same face" has P = 1/2',
      '"Two heads" has P = 1/2',
    ],
    answer: 0,
    why: 'Careful with "at least one head": {HH, HT, TH} = 3/4, NOT 1/2. Exactly one head = {HT, TH} = 1/2. Same face = {HH, TT} = 1/2 as well -- but "at least" phrasing is the trap this question trains.',
  },
  {
    nodeId: 'c10_math_cbse_14_011',
    q: 'A lottery has 100 tickets; you buy 5. P(you do NOT win) = ?',
    options: ['95/100 = 19/20', '5/100', '1/95', '1/20'],
    answer: 0,
    why: 'P(win) = 5/100 = 1/20, so P(not win) = 1 - 1/20 = 19/20. Survey version: 200 people, 80 tea / 70 coffee / 50 juice; P(selected person prefers tea or coffee) = 150/200 = 3/4. A "60% chance of rain" is exactly P(rain) = 0.6 stated as a percentage.',
  },
];

function DepthDrill() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState({ right: 0, done: 0 });
  const item = DEPTH_QUIZ[idx];
  const answered = picked !== null;

  const pick = (i: number) => {
    if (answered) return;
    setPicked(i);
    setScore((s) => ({ right: s.right + (i === item.answer ? 1 : 0), done: s.done + 1 }));
  };

  return (
    <div className="bg-slate-900/80 rounded-2xl border border-amber-800/60 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Board-depth drill</p>
        <span className="text-[11px] font-mono text-slate-400">
          {idx + 1}/{DEPTH_QUIZ.length} -- {score.right}/{score.done} correct
        </span>
      </div>
      <p className="text-sm text-slate-200 leading-relaxed">{item.q}</p>
      <div className="space-y-1.5">
        {item.options.map((opt, i) => {
          const state = !answered
            ? 'bg-slate-800 hover:bg-slate-700 border-slate-700'
            : i === item.answer
              ? 'bg-emerald-900/70 border-emerald-500 text-emerald-100'
              : i === picked
                ? 'bg-rose-900/60 border-rose-600 text-rose-100'
                : 'bg-slate-800/40 border-slate-800 opacity-60';
          return (
            <button key={i} onClick={() => pick(i)} disabled={answered}
              className={`w-full text-left px-3 py-2 rounded-xl border text-xs leading-snug transition ${state}`}>
              <span className="font-bold mr-1.5">{'ABCD'[i]}.</span>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="text-xs leading-relaxed text-amber-200 bg-amber-950/40 border border-amber-800/50 rounded-xl px-3 py-2">
          <span className="font-bold">Misconception killed: </span>
          {item.why}
        </div>
      )}
      <div className="flex gap-2">
        <button onClick={() => { setIdx((i) => (i + 1) % DEPTH_QUIZ.length); setPicked(null); }}
          className="flex-1 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-slate-950 transition">
          Next question
        </button>
        <button onClick={() => { setIdx(0); setPicked(null); setScore({ right: 0, done: 0 }); }}
          className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-rose-900 transition">
          Reset
        </button>
      </div>
    </div>
  );
}

export function C10_MathematicsProbabilitySim() {
  const [mode, setMode] = useState<Mode>('coin');
  const [coin, setCoin] = useState({ heads: 0, tails: 0 });
  const [die, setDie] = useState([0, 0, 0, 0, 0, 0]);
  const [lastFlashes, setLastFlashes] = useState<number[]>([]);

  const coinTotal = coin.heads + coin.tails;
  const dieTotal = die.reduce((a, b) => a + b, 0);

  const runTrials = useCallback(
    (count: number) => {
      if (mode === 'coin') {
        let h = 0;
        let t = 0;
        for (let i = 0; i < count; i++) (Math.random() < 0.5 ? h++ : t++);
        setCoin((c) => ({ heads: c.heads + h, tails: c.tails + t }));
      } else {
        setDie((d) => {
          const next = [...d];
          const fresh: number[] = [];
          for (let i = 0; i < count; i++) {
            const face = Math.floor(Math.random() * 6);
            next[face] += 1;
            if (fresh.length < 12) fresh.push(face + 1);
          }
          setLastFlashes(fresh);
          return next;
        });
      }
    },
    [mode]
  );

  const reset = () => {
    setCoin({ heads: 0, tails: 0 });
    setDie([0, 0, 0, 0, 0, 0]);
    setLastFlashes([]);
  };

  const expHeads = coinTotal ? (coin.heads / coinTotal) * 100 : 0;
  const diff = Math.abs(expHeads - 50);
  const faceBars = useMemo(
    () =>
      die.map((count, i) => ({
        face: i + 1,
        count,
        pct: dieTotal ? (count / dieTotal) * 100 : 0,
        dev: dieTotal ? Math.abs((count / dieTotal) * 100 - 100 / 6) : 0,
      })),
    [die, dieTotal]
  );
  const maxDieDev = Math.max(...faceBars.map((f) => f.dev), 0.001);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-700">🎲</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Class 10 -- Probability</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Empirical vs Classical Probability Lab</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
          {mode === 'coin' ? (
            <div>
              <div className="flex items-center justify-center gap-6 my-2">
                <div className={`text-center transition-transform duration-200 ${lastFlashes.length ? 'scale-105' : ''}`}>
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 border-4 border-amber-600 flex items-center justify-center text-slate-900 font-black text-lg shadow-xl">
                    HEADS
                  </div>
                  <p className="text-xs text-amber-300 mt-2 font-mono">{coin.heads} times</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 border-4 border-slate-600 flex items-center justify-center text-slate-900 font-black text-lg shadow-xl">
                    TAILS
                  </div>
                  <p className="text-xs text-slate-300 mt-2 font-mono">{coin.tails} times</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="h-8 w-full bg-slate-800 rounded-full overflow-hidden flex border border-slate-700">
                  <div className="bg-amber-400 flex items-center justify-center text-[11px] font-bold text-slate-900 transition-all duration-300"
                    style={{ width: `${expHeads}%` }}>
                    {coinTotal ? `${expHeads.toFixed(1)}%` : ''}
                  </div>
                  <div className="bg-slate-500 flex-1 flex items-center justify-end pr-2 text-[11px] font-bold">
                    {coinTotal ? `${(100 - expHeads).toFixed(1)}%` : ''}
                  </div>
                </div>
                <div className="relative h-5">
                  <div className="absolute left-1/2 -translate-x-1/2 text-[10px] text-emerald-400 font-bold">| theory: 50%</div>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-3">
                Tosses: <span className="font-mono text-slate-200">{coinTotal}</span> -- your gap from theory:{' '}
                <span className={`font-mono font-bold ${diff < 2 ? 'text-emerald-400' : diff < 5 ? 'text-amber-400' : 'text-rose-400'}`}>
                  {diff.toFixed(2)}%
                </span>
                {coinTotal >= 300 && diff < 2 && (
                  <span className="text-emerald-400 font-semibold"> -- Law of Large Numbers showing up live!</span>
                )}
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-end gap-3 h-56 px-2">
                {faceBars.map((f) => (
                  <div key={f.face} className="flex-1 flex flex-col items-center justify-end h-full">
                    <span className="text-[10px] font-mono text-slate-400 mb-1">{f.pct.toFixed(1)}%</span>
                    <div
                      className={`w-full rounded-t-lg transition-all duration-300 ${f.dev === maxDieDev ? 'bg-rose-500/80' : 'bg-emerald-500/80'}`}
                      style={{ height: `${Math.max(f.pct, 1) * 4}%` }}
                    />
                    <span className="text-lg mt-1 font-black text-emerald-300">{f.face}</span>
                    <span className="text-[10px] font-mono text-slate-500">{f.count}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-center text-xs text-slate-400">
                Theory line: 16.7% per face. Total rolls: <span className="font-mono text-slate-200">{dieTotal}</span>
              </div>
              {lastFlashes.length > 0 && (
                <p className="text-[11px] font-mono text-emerald-400 mt-2 text-center">
                  last batch: {lastFlashes.join(', ')}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => { setMode('coin'); }}
                className={`py-2 rounded-xl text-xs font-bold ${mode === 'coin' ? 'bg-emerald-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Fair coin
              </button>
              <button onClick={() => { setMode('die'); }}
                className={`py-2 rounded-xl text-xs font-bold ${mode === 'die' ? 'bg-emerald-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Fair die
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 10, 100].map((k) => (
                <button key={k} onClick={() => runTrials(k)}
                  className="py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-emerald-700 transition">
                  +{k}
                </button>
              ))}
            </div>
            <button onClick={() => runTrials(1000)}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 transition">
              +1000 trials (fast forward)
            </button>
            <button onClick={reset}
              className="w-full py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-rose-900 transition">
              Reset experiment
            </button>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              Classical probability P(E) = favourable outcomes / total outcomes -- it comes from
              reasoning (1/2 or 1/6). Empirical probability comes from actually running the experiment:
              P(E) = times E happened / trials. With few trials the two disagree wildly; with thousands
              they hug each other.
            </p>
          </div>

          <div className="bg-emerald-950/40 rounded-2xl border border-emerald-800/50 p-4 text-xs">
            <p className="font-bold text-emerald-300 mb-1">What to try</p>
            <p>1. Add only 10 tosses 5 separate times -- how far from 50% can you drift?</p>
            <p>2. On the die, run 1000 and find the face with the largest deviation. Is it the same face every reset?</p>
          </div>

          <DepthDrill />
        </div>
      </div>
    </div>
  );
}

export default C10_MathematicsProbabilitySim;
