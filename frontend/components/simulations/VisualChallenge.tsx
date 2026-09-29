'use client';

/**
 * VisualChallenge — Renders visual representations of challenge problems.
 *
 * For a struggling student, seeing the problem visually is critical:
 * - Math: number line, counting objects, fraction bars
 * - Biology: body parts, animals, plants with labels
 * - Chemistry: beakers, states of matter
 * - Physics: forces, light, sound waves
 * - Geography: maps, weather, landforms
 * - CS: computer parts, devices
 * - EVS: animals, food, transport
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface VisualChallengeProps {
  question: string;
  subject: string;
  answer: string;
  options: string[];
  showCorrect: boolean;
  wrongAnswer: string | null;
}

export function VisualChallenge({ question, subject, answer, options, showCorrect, wrongAnswer }: VisualChallengeProps) {
  const q = question.toLowerCase();

  // ─── MATH: Addition with visual objects ───────────────────
  const addMatch = q.match(/(\d+)\s*\+\s*(\d+)/);
  if (addMatch && (subject === 'maths' || q.includes('mango') || q.includes('apple') || q.includes('add'))) {
    const a = parseInt(addMatch[1]);
    const b = parseInt(addMatch[2]);
    return <AdditionVisual a={a} b={b} question={q} answer={answer} showCorrect={showCorrect} />;
  }

  // ─── MATH: Subtraction with visual objects ────────────────
  const subMatch = q.match(/(\d+)\s*-\s*(\d+)/);
  if (subMatch && (subject === 'maths' || q.includes('take away') || q.includes('give') || q.includes('left'))) {
    const a = parseInt(subMatch[1]);
    const b = parseInt(subMatch[2]);
    return <SubtractionVisual a={a} b={b} question={q} answer={answer} showCorrect={showCorrect} />;
  }

  // ─── MATH: Multiplication ─────────────────────────────────
  const mulMatch = q.match(/(\d+)\s*[×x*]\s*(\d+)/) || q.match(/(\d+)\s+times\s+(\d+)/) || q.match(/(\d+)\s+groups?\s+of\s+(\d+)/);
  if (mulMatch && subject === 'maths') {
    const a = parseInt(mulMatch[1]);
    const b = parseInt(mulMatch[2]);
    return <MultiplicationVisual a={a} b={b} answer={answer} showCorrect={showCorrect} />;
  }

  // ─── MATH: Division ───────────────────────────────────────
  const divMatch = q.match(/(\d+)\s*[÷/]\s*(\d+)/) || q.match(/(\d+)\s+divided\s+by\s+(\d+)/) || q.match(/split\s+(\d+)\s+.*?\s+(\d+)/);
  if (divMatch && subject === 'maths') {
    const a = parseInt(divMatch[1]);
    const b = parseInt(divMatch[2]);
    return <DivisionVisual a={a} b={b} answer={answer} showCorrect={showCorrect} />;
  }

  // ─── MATH: Fractions ──────────────────────────────────────
  if (q.includes('fraction') || q.includes('half') || q.includes('quarter') || q.includes('third')) {
    return <FractionVisual question={q} answer={answer} options={options} showCorrect={showCorrect} />;
  }

  // ─── MATH: Number line / counting on ──────────────────────
  if (q.includes('number line') || q.includes('hop') || q.includes('counting on') || q.includes('count back')) {
    return <NumberLineVisual question={q} answer={answer} showCorrect={showCorrect} />;
  }

  // ─── MATH: Greater than / less than / compare ─────────────
  if (q.includes('greater') || q.includes('less') || q.includes('bigger') || q.includes('smaller') || q.includes('compare') || q.includes('largest') || q.includes('smallest')) {
    const numbers = q.match(/\d+/g);
    if (numbers && numbers.length >= 2) {
      return <CompareVisual numbers={numbers.map(Number)} question={q} answer={answer} showCorrect={showCorrect} />;
    }
  }

  // ─── MATH: Counting objects ───────────────────────────────
  if (q.includes('how many') && subject === 'maths') {
    const countMatch = q.match(/how many\s+(\w+)/);
    const word = countMatch ? countMatch[1] : '';
    const emoji = getEmojiForWord(word);
    const count = parseInt(q.match(/\d+/)?.[0] || '5');
    return <CountingVisual emoji={emoji} count={count} answer={answer} showCorrect={showCorrect} />;
  }

  // ─── BIOLOGY: Body parts ──────────────────────────────────
  if (q.includes('body') || q.includes('eye') || q.includes('ear') || q.includes('nose') || q.includes('mouth') || q.includes('hand') || q.includes('leg') || q.includes('heart') || q.includes('brain') || q.includes('bone') || q.includes('muscle') || q.includes('digest') || q.includes('organ') || q.includes('skeleton') || q.includes('skin')) {
    return <BodyVisual question={q} answer={answer} options={options} showCorrect={showCorrect} />;
  }

  // ─── BIOLOGY: Animals ─────────────────────────────────────
  if (q.includes('animal') || q.includes('pet') || q.includes('wild') || q.includes('domestic') || q.includes('bird') || q.includes('fish') || q.includes('insect') || q.includes('habitat') || q.includes('live')) {
    return <AnimalVisual question={q} answer={answer} options={options} showCorrect={showCorrect} />;
  }

  // ─── BIOLOGY: Plants ──────────────────────────────────────
  if (q.includes('plant') || q.includes('leaf') || q.includes('flower') || q.includes('root') || q.includes('stem') || q.includes('seed') || q.includes('tree')) {
    return <PlantVisual question={q} answer={answer} options={options} showCorrect={showCorrect} />;
  }

  // ─── CHEMISTRY: States of matter / water ──────────────────
  if (q.includes('water') || q.includes('solid') || q.includes('liquid') || q.includes('gas') || q.includes('matter') || q.includes('mix') || q.includes('dissolve')) {
    return <ChemistryVisual question={q} answer={answer} options={options} showCorrect={showCorrect} />;
  }

  // ─── PHYSICS: Force / light / sound / air ─────────────────
  if (q.includes('force') || q.includes('push') || q.includes('pull') || q.includes('light') || q.includes('sound') || q.includes('air') || q.includes('wind') || q.includes('energy') || q.includes('heat') || q.includes('magnet') || q.includes('electric')) {
    return <PhysicsVisual question={q} answer={answer} options={options} showCorrect={showCorrect} />;
  }

  // ─── GEOGRAPHY: Earth / weather / maps ────────────────────
  if (q.includes('earth') || q.includes('weather') || q.includes('map') || q.includes('globe') || q.includes('continent') || q.includes('ocean') || q.includes('mountain') || q.includes('river') || q.includes('land') || q.includes('sky') || q.includes('sun') || q.includes('moon') || q.includes('season') || q.includes('day') || q.includes('night')) {
    return <GeographyVisual question={q} answer={answer} options={options} showCorrect={showCorrect} />;
  }

  // ─── CS: Computer parts ───────────────────────────────────
  if (q.includes('computer') || q.includes('keyboard') || q.includes('mouse') || q.includes('screen') || q.includes('monitor') || q.includes('cpu') || q.includes('input') || q.includes('output') || q.includes('device') || q.includes('software') || q.includes('hardware')) {
    return <ComputerVisual question={q} answer={answer} options={options} showCorrect={showCorrect} />;
  }

  // ─── EVS: Food / transport / safety / cleanliness ─────────
  if (q.includes('food') || q.includes('transport') || q.includes('safety') || q.includes('clean') || q.includes('wear') || q.includes('eat') || q.includes('healthy')) {
    return <EVSVisual question={q} answer={answer} options={options} showCorrect={showCorrect} />;
  }

  // ─── Default: show option emojis ──────────────────────────
  return <OptionEmojisVisual options={options} question={question} answer={answer} showCorrect={showCorrect} wrongAnswer={wrongAnswer} />;
}

// ─── Helper: get emoji for a word ────────────────────────────

function getEmojiForWord(word: string): string {
  const w = word.toLowerCase();
  const map: Record<string, string> = {
    apple: '🍎', mango: '🥭', banana: '🍌', orange: '🍊', fruit: '🍎',
    star: '⭐', ball: '⚽', balloon: '🎈', car: '🚗', bus: '🚌',
    cat: '🐱', dog: '🐶', fish: '🐟', bird: '🐦', cow: '🐮',
    flower: '🌸', tree: '🌳', leaf: '🍃', sun: '☀️', moon: '🌙',
    book: '📚', pencil: '✏️', stone: '🪨', feather: '🪶',
    water: '💧', fire: '🔥', ice: '🧊', cloud: '☁️', rain: '🌧️',
    hand: '✋', eye: '👁️', ear: '👂', nose: '👃', mouth: '👄',
    heart: '❤️', bone: '🦴', brain: '🧠', house: '🏠', school: '🏫',
    circle: '⭕', square: '⬜', triangle: '🔺', star_shape: '⭐',
    candy: '🍬', chocolate: '🍫', cake: '🎂', cookie: '🍪',
    key: '🔑', clock: '🕐', phone: '📱', computer: '💻',
    shirt: '👕', shoe: '👟', hat: '🎩', umbrella: '☂️',
    plate: '🍽️', cup: '☕', bottle: '🍼', jar: '🫙',
    box: '📦', bag: '🎒', ball_toy: '🎾', doll: '🧸',
  };
  for (const [key, emoji] of Object.entries(map)) {
    if (w.includes(key)) return emoji;
  }
  return '🔵';
}

function getEmojiForOption(opt: string, question: string): string {
  const o = opt.toLowerCase();
  const q = question.toLowerCase();
  // Check option text first
  const direct = getEmojiForWord(o);
  if (direct !== '🔵') return direct;
  // Check question context
  if (q.includes('mango')) return '🥭';
  if (q.includes('apple')) return '🍎';
  if (q.includes('animal') || q.includes('pet')) return '🐱';
  if (q.includes('body') || o.includes('eye')) return '👁️';
  if (o.includes('heavy')) return '⬇️';
  if (o.includes('light')) return '⬆️';
  if (o.includes('correct') || o.includes('yes') || o.includes('true')) return '✅';
  if (o.includes('wrong') || o.includes('no') || o.includes('false')) return '❌';
  if (o.includes('solid')) return '🧊';
  if (o.includes('liquid')) return '💧';
  if (o.includes('gas')) return '💨';
  if (o.includes('hot') || o.includes('warm')) return '🔥';
  if (o.includes('cold') || o.includes('cool')) return '❄️';
  if (o.includes('big') || o.includes('large')) return '🐘';
  if (o.includes('small') || o.includes('tiny')) return '🐜';
  if (o.includes('fast')) return '⚡';
  if (o.includes('slow')) return '🐢';
  if (o.includes('up') || o.includes('high')) return '⬆️';
  if (o.includes('down') || o.includes('low')) return '⬇️';
  if (o.includes('day')) return '☀️';
  if (o.includes('night')) return '🌙';
  if (o.includes('sunny')) return '☀️';
  if (o.includes('rainy')) return '🌧️';
  if (o.includes('cloudy')) return '☁️';
  if (o.includes('windy')) return '💨';
  return '';
}

// ─── Addition Visual ─────────────────────────────────────────

function AdditionVisual({ a, b, question, answer, showCorrect }: { a: number; b: number; question: string; answer: string; showCorrect: boolean }) {
  const emoji = question.includes('mango') ? '🥭' : question.includes('apple') ? '🍎' : question.includes('star') ? '⭐' : question.includes('ball') ? '⚽' : question.includes('cand') ? '🍬' : question.includes('toffee') ? '🍬' : question.includes('flower') ? '🌸' : '🔵';
  const total = a + b;
  const [countedTo, setCountedTo] = useState(0);

  useEffect(() => {
    setCountedTo(0);
    // Animate counting
    const timer = setInterval(() => {
      setCountedTo(prev => {
        if (prev >= total) { clearInterval(timer); return prev; }
        return prev + 1;
      });
    }, 400);
    return () => clearInterval(timer);
  }, [a, b, total]);

  return (
    <div className="my-3 py-3 px-4 bg-gradient-to-br from-gold-50 to-purple-50 rounded-2xl border-2 border-gold-200">
      {/* Group A */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <div className="flex flex-wrap gap-1 justify-center max-w-[140px] p-2 bg-white/60 rounded-xl">
          {Array.from({ length: a }).map((_, i) => (
            <motion.span key={`a${i}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }} className="text-2xl">{emoji}</motion.span>
          ))}
        </div>
        <span className="text-3xl font-black text-gold-600">+</span>
        <div className="flex flex-wrap gap-1 justify-center max-w-[140px] p-2 bg-white/60 rounded-xl">
          {Array.from({ length: b }).map((_, i) => (
            <motion.span key={`b${i}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: (a + i) * 0.1 }} className="text-2xl">{emoji}</motion.span>
          ))}
        </div>
        <span className="text-3xl font-black text-gold-600">=</span>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: (a + b) * 0.1 + 0.3 }} className="text-3xl font-black text-purple-600 bg-white px-3 py-1 rounded-xl border-2 border-purple-300">
          {showCorrect ? total : countedTo > 0 ? countedTo : '?'}
        </motion.div>
      </div>
      {/* Counting narration */}
      <div className="text-center text-xs text-gold-600 font-bold">
        {countedTo > 0 && countedTo <= total && `Counting: 1, 2, 3... ${countedTo}`}
        {countedTo === total && `Total: ${total} ${emoji}`}
      </div>
      {/* Number line */}
      <NumberLine max={Math.max(total + 2, 10)} highlight={total} showCorrect={showCorrect} />
    </div>
  );
}

// ─── Subtraction Visual ──────────────────────────────────────

function SubtractionVisual({ a, b, question, answer, showCorrect }: { a: number; b: number; question: string; answer: string; showCorrect: boolean }) {
  const emoji = question.includes('mango') ? '🥭' : question.includes('apple') ? '🍎' : question.includes('toffee') || question.includes('cand') ? '🍬' : question.includes('ball') ? '⚽' : '🔵';
  const result = a - b;

  return (
    <div className="my-3 py-3 px-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200">
      <div className="flex items-center justify-center gap-2 mb-2">
        <div className="flex flex-wrap gap-1 justify-center max-w-[140px] p-2 bg-white/60 rounded-xl">
          {Array.from({ length: a }).map((_, i) => (
            <motion.span
              key={`s${i}`}
              initial={{ scale: 1, opacity: 1 }}
              animate={i < b ? { scale: 0.5, opacity: 0.2, y: 10 } : { scale: 1, opacity: 1 }}
              transition={{ delay: i < b ? 0.3 : 0 }}
              className="text-2xl"
              style={{ textDecoration: i < b ? 'line-through' : 'none' }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
        <span className="text-3xl font-black text-red-500">−</span>
        <div className="flex flex-wrap gap-1 justify-center max-w-[80px] p-2 bg-red-100 rounded-xl">
          {Array.from({ length: b }).map((_, i) => (
            <motion.span key={`r${i}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 + i * 0.1 }} className="text-2xl opacity-40">{emoji}</motion.span>
          ))}
        </div>
        <span className="text-3xl font-black text-gold-600">=</span>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }} className="text-3xl font-black text-purple-600 bg-white px-3 py-1 rounded-xl border-2 border-purple-300">
          {showCorrect ? result : '?'}
        </motion.div>
      </div>
      <div className="text-center text-xs text-orange-600 font-bold">
        Start with {a}, take away {b}, count what's left: {showCorrect ? result : '...'}
      </div>
      <NumberLine max={Math.max(a + 1, 10)} highlight={result} start={a} showCorrect={showCorrect} />
    </div>
  );
}

// ─── Multiplication Visual ───────────────────────────────────

function MultiplicationVisual({ a, b, answer, showCorrect }: { a: number; b: number; answer: string; showCorrect: boolean }) {
  const total = a * b;
  return (
    <div className="my-3 py-3 px-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl border-2 border-green-200">
      <div className="text-center text-sm font-bold text-green-700 mb-2">
        {a} groups of {b} = ?
      </div>
      <div className="flex flex-col gap-1 items-center">
        {Array.from({ length: a }).map((_, row) => (
          <div key={row} className="flex gap-1 p-1 bg-white/60 rounded-lg">
            {Array.from({ length: b }).map((_, col) => (
              <motion.span key={col} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: (row * b + col) * 0.05 }} className="text-xl">🔵</motion.span>
            ))}
          </div>
        ))}
      </div>
      <div className="text-center mt-2 text-2xl font-black text-green-600">
        = {showCorrect ? total : '?'}
      </div>
    </div>
  );
}

// ─── Division Visual ─────────────────────────────────────────

function DivisionVisual({ a, b, answer, showCorrect }: { a: number; b: number; answer: string; showCorrect: boolean }) {
  const result = Math.floor(a / b);
  return (
    <div className="my-3 py-3 px-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
      <div className="text-center text-sm font-bold text-purple-700 mb-2">
        Split {a} into {b} groups = ?
      </div>
      <div className="flex gap-2 justify-center">
        {Array.from({ length: b }).map((_, group) => (
          <div key={group} className="flex flex-col gap-0.5 p-2 bg-white/60 rounded-xl border-2 border-purple-200 min-h-[60px]">
            {Array.from({ length: result }).map((_, i) => (
              <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: (group * result + i) * 0.05 }} className="text-lg">🔵</motion.span>
            ))}
          </div>
        ))}
      </div>
      <div className="text-center mt-2 text-2xl font-black text-purple-600">
        = {showCorrect ? result : '?'} each
      </div>
    </div>
  );
}

// ─── Fraction Visual ─────────────────────────────────────────

function FractionVisual({ question, answer, options, showCorrect }: { question: string; answer: string; options: string[]; showCorrect: boolean }) {
  const halfMatch = question.match(/half|1\/2/);
  const quarterMatch = question.match(/quarter|1\/4/);
  const thirdMatch = question.match(/third|1\/3/);

  let parts = 2;
  let filled = 1;
  if (quarterMatch) { parts = 4; filled = 1; }
  else if (thirdMatch) { parts = 3; filled = 1; }

  return (
    <div className="my-3 py-3 px-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-200">
      <div className="flex justify-center gap-2">
        {/* Pizza circle */}
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="#fff8e1" stroke="#f59e0b" strokeWidth="3" />
          {Array.from({ length: parts }).map((_, i) => {
            const angle = (i * 360) / parts;
            const rad = (angle * Math.PI) / 180;
            const x = 50 + 45 * Math.cos(rad - Math.PI / 2);
            const y = 50 + 45 * Math.sin(rad - Math.PI / 2);
            return <line key={i} x1="50" y1="50" x2={x} y2={y} stroke="#f59e0b" strokeWidth="2" />;
          })}
          {Array.from({ length: filled }).map((_, i) => {
            const startAngle = (i * 360) / parts - 90;
            const endAngle = ((i + 1) * 360) / parts - 90;
            const x1 = 50 + 45 * Math.cos((startAngle * Math.PI) / 180);
            const y1 = 50 + 45 * Math.sin((startAngle * Math.PI) / 180);
            const x2 = 50 + 45 * Math.cos((endAngle * Math.PI) / 180);
            const y2 = 50 + 45 * Math.sin((endAngle * Math.PI) / 180);
            return <path key={i} d={`M 50 50 L ${x1} ${y1} A 45 45 0 0 1 ${x2} ${y2} Z`} fill="#fbbf24" opacity="0.6" />;
          })}
        </svg>
      </div>
      <div className="text-center text-sm font-bold text-yellow-700 mt-1">
        {filled}/{parts} shaded {showCorrect && `= ${answer}`}
      </div>
    </div>
  );
}

// ─── Number Line Visual ──────────────────────────────────────

function NumberLine({ max, highlight, start, showCorrect }: { max: number; highlight: number; start?: number; showCorrect: boolean }) {
  const numbers = Array.from({ length: max + 1 }, (_, i) => i);
  return (
    <div className="mt-2 flex items-center justify-center">
      <div className="flex items-center">
        {numbers.map(n => (
          <div key={n} className="flex flex-col items-center">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
              showCorrect && n === highlight
                ? 'bg-green-500 text-white border-green-600 scale-125'
                : start !== undefined && n === start
                ? 'bg-gold-500 text-white border-gold-600'
                : n === highlight
                ? 'bg-purple-200 text-purple-700 border-purple-400'
                : 'bg-white text-gray-600 border-gray-300'
            }`}>
              {n}
            </div>
            {n < max && <div className="w-3 h-0.5 bg-gray-300" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function NumberLineVisual({ question, answer, showCorrect }: { question: string; answer: string; showCorrect: boolean }) {
  const isAdd = question.includes('add') || question.includes('forward') || question.includes('hop forward');
  const isSub = question.includes('subtract') || question.includes('backward') || question.includes('hop back');
  return (
    <div className="my-3 py-3 px-4 bg-gradient-to-br from-gold-50 to-gold-50 rounded-2xl border-2 border-gold-200">
      <div className="text-center text-sm font-bold text-gold-700 mb-2">
        {isAdd ? '↗️ Hop forward to add!' : isSub ? '↙️ Hop backward to subtract!' : '🔢 Number Line'}
      </div>
      <NumberLine max={15} highlight={parseInt(answer) || 0} showCorrect={showCorrect} />
    </div>
  );
}

// ─── Compare Visual ──────────────────────────────────────────

function CompareVisual({ numbers, question, answer, showCorrect }: { numbers: number[]; question: string; answer: string; showCorrect: boolean }) {
  const isGreatest = question.includes('greatest') || question.includes('largest') || question.includes('biggest');
  const isSmallest = question.includes('smallest') || question.includes('least');
  const target = isGreatest ? Math.max(...numbers) : isSmallest ? Math.min(...numbers) : 0;

  return (
    <div className="my-3 py-3 px-4 bg-gradient-to-br from-teal-50 to-gold-50 rounded-2xl border-2 border-teal-200">
      <div className="flex justify-center gap-3 flex-wrap">
        {numbers.map((n, i) => {
          const isAnswer = showCorrect && n === target;
          const blocks = Math.min(n, 10);
          return (
            <div key={i} className={`flex flex-col items-center p-2 rounded-xl border-2 ${isAnswer ? 'bg-green-100 border-green-400 scale-110' : 'bg-white/60 border-gray-200'}`}>
              <div className="flex flex-wrap gap-0.5 justify-center max-w-[60px]">
                {Array.from({ length: blocks }).map((_, j) => <span key={j} className="text-sm">🟦</span>)}
                {n > 10 && <span className="text-xs">+{n - 10}</span>}
              </div>
              <div className={`text-lg font-black mt-1 ${isAnswer ? 'text-green-600' : 'text-gray-700'}`}>{n}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Counting Visual ─────────────────────────────────────────

function CountingVisual({ emoji, count, answer, showCorrect }: { emoji: string; count: number; answer: string; showCorrect: boolean }) {
  const [counted, setCounted] = useState(0);
  useEffect(() => {
    setCounted(0);
    const timer = setInterval(() => {
      setCounted(prev => {
        if (prev >= count) { clearInterval(timer); return prev; }
        return prev + 1;
      });
    }, 300);
    return () => clearInterval(timer);
  }, [count]);

  return (
    <div className="my-3 py-3 px-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border-2 border-pink-200">
      <div className="flex flex-wrap gap-1 justify-center max-w-[200px] mx-auto">
        {Array.from({ length: count }).map((_, i) => (
          <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.15 }} className="text-2xl">{emoji}</motion.span>
        ))}
      </div>
      <div className="text-center mt-2 text-sm font-bold text-pink-600">
        {counted > 0 ? `Count: ${counted}` : 'Count the objects!'}
        {showCorrect && ` → Answer: ${answer}`}
      </div>
    </div>
  );
}

// ─── Body Visual (Biology) ───────────────────────────────────

function BodyVisual({ question, answer, options, showCorrect }: { question: string; answer: string; options: string[]; showCorrect: boolean }) {
  const partEmojis: Record<string, string> = {
    eye: '👁️', eyes: '👁️', ear: '👂', ears: '👂', nose: '👃', mouth: '👄',
    hand: '✋', hands: '✋', leg: '🦵', legs: '🦵', foot: '🦶', feet: '🦶',
    heart: '❤️', brain: '🧠', bone: '🦴', skeleton: '💀', skin: '🤚',
    stomach: '🫃', lung: '🫁', lungs: '🫁', muscle: '💪', teeth: '🦷', tooth: '🦷',
  };

  return (
    <div className="my-3 py-3 px-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl border-2 border-red-200">
      {/* Simple body outline */}
      <div className="flex justify-center mb-2">
        <div className="text-6xl">🧒</div>
      </div>
      {/* Option emojis */}
      <div className="flex flex-wrap gap-2 justify-center">
        {options.map((opt, i) => {
          const o = opt.toLowerCase();
          let emoji = '❓';
          for (const [key, e] of Object.entries(partEmojis)) {
            if (o.includes(key)) { emoji = e; break; }
          }
          const isCorrect = showCorrect && opt === answer;
          return (
            <div key={i} className={`flex flex-col items-center p-2 rounded-xl border-2 ${isCorrect ? 'bg-green-100 border-green-400' : 'bg-white/60 border-gray-200'}`}>
              <span className="text-3xl">{emoji}</span>
              <span className="text-xs font-bold mt-1">{opt}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Animal Visual (Biology) ─────────────────────────────────

function AnimalVisual({ question, answer, options, showCorrect }: { question: string; answer: string; options: string[]; showCorrect: boolean }) {
  const animalEmojis: Record<string, string> = {
    dog: '🐶', cat: '🐱', cow: '🐮', horse: '🐴', pig: '🐷', sheep: '🐑', goat: '🐐',
    lion: '🦁', tiger: '🐯', elephant: '🐘', bear: '🐻', monkey: '🐵', deer: '🦌',
    rabbit: '🐰', rat: '🐀', mouse: '🐭', fish: '🐟', bird: '🐦', eagle: '🦅',
    parrot: '🦜', crow: '🐦‍⬛', hen: '🐔', duck: '🦆', snake: '🐍', frog: '🐸',
    turtle: '🐢', lizard: '🦎', bee: '🐝', ant: '🐜', butterfly: '🦋', spider: '🕷️',
    pet: '🐱', wild: '🦁', domestic: '🐮', farm: '🐮',
  };

  return (
    <div className="my-3 py-3 px-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
      <div className="flex flex-wrap gap-2 justify-center">
        {options.map((opt, i) => {
          const o = opt.toLowerCase();
          let emoji = '🐾';
          for (const [key, e] of Object.entries(animalEmojis)) {
            if (o.includes(key)) { emoji = e; break; }
          }
          const isCorrect = showCorrect && opt === answer;
          return (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`flex flex-col items-center p-2 rounded-xl border-2 ${isCorrect ? 'bg-green-100 border-green-400 scale-110' : 'bg-white/60 border-gray-200'}`}
            >
              <span className="text-4xl">{emoji}</span>
              <span className="text-xs font-bold mt-1">{opt}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Plant Visual (Biology) ──────────────────────────────────

function PlantVisual({ question, answer, options, showCorrect }: { question: string; answer: string; options: string[]; showCorrect: boolean }) {
  const plantEmojis: Record<string, string> = {
    root: '🪵', roots: '🪓', stem: '🌿', leaf: '🍃', leaves: '🍃', flower: '🌸',
    flower_s: '🌷', fruit: '🍎', seed: '🌱', seeds: '🌱', tree: '🌳', branch: '🌿',
    petal: '🌺', pollen: '🌼', bud: '🥦',
  };

  return (
    <div className="my-3 py-3 px-4 bg-gradient-to-br from-green-50 to-lime-50 rounded-2xl border-2 border-green-200">
      {/* Plant diagram */}
      <div className="flex justify-center mb-2">
        <div className="text-5xl">🌳</div>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {options.map((opt, i) => {
          const o = opt.toLowerCase();
          let emoji = '🌿';
          for (const [key, e] of Object.entries(plantEmojis)) {
            if (o.includes(key)) { emoji = e; break; }
          }
          const isCorrect = showCorrect && opt === answer;
          return (
            <div key={i} className={`flex flex-col items-center p-2 rounded-xl border-2 ${isCorrect ? 'bg-green-100 border-green-400' : 'bg-white/60 border-gray-200'}`}>
              <span className="text-3xl">{emoji}</span>
              <span className="text-xs font-bold mt-1">{opt}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Chemistry Visual ────────────────────────────────────────

function ChemistryVisual({ question, answer, options, showCorrect }: { question: string; answer: string; options: string[]; showCorrect: boolean }) {
  const chemEmojis: Record<string, string> = {
    water: '💧', ice: '🧊', steam: '💨', gas: '💨', solid: '🧊', liquid: '💧',
    fire: '🔥', hot: '🔥', cold: '❄️', warm: '🌡️', beaker: '🧪', test: '🔬',
    mix: '🥤', dissolve: '🧂', salt: '🧂', sugar: '🍬', oil: '🛢️',
  };

  return (
    <div className="my-3 py-3 px-4 bg-gradient-to-br from-gold-50 to-gold-50 rounded-2xl border-2 border-gold-200">
      <div className="flex justify-center mb-2">
        <div className="text-5xl">🧪</div>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {options.map((opt, i) => {
          const o = opt.toLowerCase();
          let emoji = '⚗️';
          for (const [key, e] of Object.entries(chemEmojis)) {
            if (o.includes(key)) { emoji = e; break; }
          }
          const isCorrect = showCorrect && opt === answer;
          return (
            <div key={i} className={`flex flex-col items-center p-2 rounded-xl border-2 ${isCorrect ? 'bg-green-100 border-green-400' : 'bg-white/60 border-gray-200'}`}>
              <span className="text-3xl">{emoji}</span>
              <span className="text-xs font-bold mt-1">{opt}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Physics Visual ──────────────────────────────────────────

function PhysicsVisual({ question, answer, options, showCorrect }: { question: string; answer: string; options: string[]; showCorrect: boolean }) {
  const physEmojis: Record<string, string> = {
    push: '👉', pull: '👈', force: '💪', light: '💡', sound: '🔊', air: '💨',
    wind: '🌬️', energy: '⚡', heat: '🔥', cold: '❄️', magnet: '🧲', electric: '⚡',
    battery: '🔋', bulb: '💡', fan: '🌀', balloon: '🎈', kite: '🪁',
  };

  return (
    <div className="my-3 py-3 px-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border-2 border-yellow-200">
      <div className="flex justify-center mb-2">
        <div className="text-5xl">⚡</div>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {options.map((opt, i) => {
          const o = opt.toLowerCase();
          let emoji = '🔧';
          for (const [key, e] of Object.entries(physEmojis)) {
            if (o.includes(key)) { emoji = e; break; }
          }
          const isCorrect = showCorrect && opt === answer;
          return (
            <div key={i} className={`flex flex-col items-center p-2 rounded-xl border-2 ${isCorrect ? 'bg-green-100 border-green-400' : 'bg-white/60 border-gray-200'}`}>
              <span className="text-3xl">{emoji}</span>
              <span className="text-xs font-bold mt-1">{opt}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Geography Visual ────────────────────────────────────────

function GeographyVisual({ question, answer, options, showCorrect }: { question: string; answer: string; options: string[]; showCorrect: boolean }) {
  const geoEmojis: Record<string, string> = {
    earth: '🌍', sun: '☀️', moon: '🌙', star: '⭐', cloud: '☁️', rain: '🌧️',
    snow: '❄️', wind: '💨', storm: '⛈️', sunny: '☀️', cloudy: '☁️', hot: '🔥',
    mountain: '⛰️', river: '🏞️', ocean: '🌊', sea: '🌊', lake: '🏞️', forest: '🌲',
    desert: '🏜️', island: '🏝️', map: '🗺️', globe: '🌐', continent: '🗺️',
    day: '☀️', night: '🌙', season: '🍂', spring: '🌸', summer: '☀️', winter: '❄️',
    shirt: '👕', jacket: '🧥', umbrella: '☂️', hat: '🎩', shoes: '👟',
  };

  return (
    <div className="my-3 py-3 px-4 bg-gradient-to-br from-gold-50 to-gold-50 rounded-2xl border-2 border-gold-200">
      <div className="flex justify-center mb-2">
        <div className="text-5xl">🌍</div>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {options.map((opt, i) => {
          const o = opt.toLowerCase();
          let emoji = '🗺️';
          for (const [key, e] of Object.entries(geoEmojis)) {
            if (o.includes(key)) { emoji = e; break; }
          }
          const isCorrect = showCorrect && opt === answer;
          return (
            <div key={i} className={`flex flex-col items-center p-2 rounded-xl border-2 ${isCorrect ? 'bg-green-100 border-green-400' : 'bg-white/60 border-gray-200'}`}>
              <span className="text-3xl">{emoji}</span>
              <span className="text-xs font-bold mt-1">{opt}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Computer Visual (CS) ────────────────────────────────────

function ComputerVisual({ question, answer, options, showCorrect }: { question: string; answer: string; options: string[]; showCorrect: boolean }) {
  const csEmojis: Record<string, string> = {
    computer: '💻', laptop: '💻', desktop: '🖥️', monitor: '🖥️', screen: '🖥️',
    keyboard: '⌨️', mouse: '🖱️', cpu: '🖥️', printer: '🖨️', scanner: '🖨️',
    speaker: '🔊', microphone: '🎤', camera: '📷', webcam: '📹',
    input: '⌨️', output: '🖥️', software: '💿', hardware: '🔧',
    internet: '🌐', browser: '🌐', website: '🌐', email: '📧',
    file: '📄', folder: '📁', save: '💾', delete: '🗑️',
    phone: '📱', tablet: '📱', keyboard_key: '🔤',
  };

  return (
    <div className="my-3 py-3 px-4 bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl border-2 border-slate-300">
      <div className="flex justify-center mb-2">
        <div className="text-5xl">💻</div>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {options.map((opt, i) => {
          const o = opt.toLowerCase();
          let emoji = '🖥️';
          for (const [key, e] of Object.entries(csEmojis)) {
            if (o.includes(key)) { emoji = e; break; }
          }
          const isCorrect = showCorrect && opt === answer;
          return (
            <div key={i} className={`flex flex-col items-center p-2 rounded-xl border-2 ${isCorrect ? 'bg-green-100 border-green-400' : 'bg-white/60 border-gray-200'}`}>
              <span className="text-3xl">{emoji}</span>
              <span className="text-xs font-bold mt-1">{opt}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── EVS Visual ──────────────────────────────────────────────

function EVSVisual({ question, answer, options, showCorrect }: { question: string; answer: string; options: string[]; showCorrect: boolean }) {
  const evsEmojis: Record<string, string> = {
    food: '🍽️', fruit: '🍎', vegetable: '🥕', milk: '🥛', bread: '🍞',
    rice: '🍚', water: '💧', healthy: '🥗', junk: '🍔',
    car: '🚗', bus: '🚌', train: '🚂', plane: '✈️', boat: '⛵', cycle: '🚲',
    walk: '🚶', road: '🛣️', signal: '🚦', helmet: '⛑️', seatbelt: '🪢',
    wash: '🧼', soap: '🧼', brush: '🪥', teeth: '🦷', bath: '🛁',
    wear: '👕', shirt: '👕', pants: '👖', shoes: '👟', jacket: '🧥',
    house: '🏠', school: '🏫', park: '🏞️', market: '🛒', hospital: '🏥',
  };

  return (
    <div className="my-3 py-3 px-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border-2 border-orange-200">
      <div className="flex flex-wrap gap-2 justify-center">
        {options.map((opt, i) => {
          const o = opt.toLowerCase();
          let emoji = '📌';
          for (const [key, e] of Object.entries(evsEmojis)) {
            if (o.includes(key)) { emoji = e; break; }
          }
          const isCorrect = showCorrect && opt === answer;
          return (
            <div key={i} className={`flex flex-col items-center p-2 rounded-xl border-2 ${isCorrect ? 'bg-green-100 border-green-400' : 'bg-white/60 border-gray-200'}`}>
              <span className="text-3xl">{emoji}</span>
              <span className="text-xs font-bold mt-1">{opt}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Option Emojis Visual (fallback) ─────────────────────────

function OptionEmojisVisual({ options, question, answer, showCorrect, wrongAnswer }: { options: string[]; question: string; answer: string; showCorrect: boolean; wrongAnswer: string | null }) {
  return (
    <div className="my-3 py-2 px-3 bg-gold-50 rounded-xl border border-gold-200">
      <div className="flex flex-wrap gap-2 justify-center">
        {options.map((opt, i) => {
          const emoji = getEmojiForOption(opt, question);
          const isCorrect = showCorrect && opt === answer;
          const isWrong = wrongAnswer === opt;
          if (!emoji) return null;
          return (
            <div key={i} className={`flex flex-col items-center p-1.5 rounded-lg border-2 ${isCorrect ? 'bg-green-100 border-green-400' : isWrong ? 'bg-red-100 border-red-400' : 'bg-white/60 border-gray-200'}`}>
              <span className="text-2xl">{emoji}</span>
              <span className="text-[10px] font-bold mt-0.5">{opt}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
