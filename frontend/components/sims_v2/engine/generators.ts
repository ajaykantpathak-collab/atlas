/**
 * generators.ts — deterministic procedural question generators.
 *
 * Each generator produces a fresh Challenge from a seed + difficulty level.
 * Seeded so a student retrying gets the SAME question (fair), but a new
 * playthrough gets different numbers. No repeats within a sim run.
 *
 * Level scales difficulty: level 1 = single digit, level 5 = multi-digit.
 */
import type { Challenge } from './types';

// ─── seeded RNG ──────────────────────────────────────────────
function mulberry32(seed: number) {
    return function () {
        let t = (seed += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
function pick<T>(rand: () => number, arr: T[]): T {
    return arr[Math.floor(rand() * arr.length)];
}
function shuffle<T>(rand: () => number, arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
// unique wrong options near the answer
function wrongOptions(rand: () => number, answer: number, count = 2): string[] {
    const seen = new Set<number>([answer]);
    const out: string[] = [];
    let guard = 0;
    while (out.length < count && guard++ < 60) {
        const delta = Math.floor(rand() * 8) - 4 || 3;
        const w = answer + delta + (rand() < 0.3 ? 10 : 0);
        if (w >= 0 && !seen.has(w)) { seen.add(w); out.push(String(w)); }
    }
    return out;
}

// difficulty ranges by level
const RANGES: Record<string, [number, number][]> = {
    add: [[1, 9], [5, 20], [11, 60], [50, 200], [200, 900]],
    sub: [[2, 9], [6, 30], [15, 80], [60, 300], [200, 999]],
    mul: [[1, 5], [2, 9], [3, 12], [5, 20], [11, 25]],
    div: [[1, 5], [2, 9], [3, 12], [4, 20], [10, 25]],
    place: [[10, 99], [100, 999], [1000, 9999], [10000, 99999], [100000, 999999]],
};
function range(kind: string, level: number): [number, number] {
    const r = RANGES[kind] ?? RANGES.add;
    return r[Math.min(level, r.length) - 1];
}
function intIn(rand: () => number, lo: number, hi: number) {
    return lo + Math.floor(rand() * (hi - lo + 1));
}

// ─── generator signature ─────────────────────────────────────
export type GenFn = (rand: () => number, level: number) => Challenge;

// ─── ADDITION ────────────────────────────────────────────────
export const genAdd: GenFn = (rand, level) => {
    const [lo, hi] = range('add', level);
    const a = intIn(rand, lo, hi), b = intIn(rand, lo, Math.max(lo, Math.floor(hi / 2)));
    const ans = a + b;
    return {
        type: 'mcq', question: `What is ${a} + ${b}?`, answer: String(ans),
        options: shuffle(rand, [String(ans), ...wrongOptions(rand, ans)]),
        hint: 'Add the tens, then the ones!',
        misconception: `Split it: ${a} + ${b} — add tens first, then ones!`,
        workedExample: [`Add tens of ${a} and ${b}.`, 'Add ones.', `Total = ${ans}.`],
    };
};

// ─── SUBTRACTION ─────────────────────────────────────────────
export const genSub: GenFn = (rand, level) => {
    const [lo, hi] = range('sub', level);
    const a = intIn(rand, Math.floor(hi / 2), hi);
    const b = intIn(rand, lo, a - 1); // keep positive
    const ans = a - b;
    return {
        type: 'mcq', question: `What is ${a} − ${b}?`, answer: String(ans),
        options: shuffle(rand, [String(ans), ...wrongOptions(rand, ans)]),
        hint: 'Take away — count the ones first!',
        misconception: `Subtract place by place: ${a} − ${b} = ${ans}.`,
        workedExample: [`Ones: subtract.`, 'Tens: subtract.', `→ ${ans}.`],
    };
};

// ─── MULTIPLICATION ──────────────────────────────────────────
export const genMul: GenFn = (rand, level) => {
    const [lo, hi] = range('mul', level);
    const a = intIn(rand, lo, hi), b = intIn(rand, 2, Math.min(12, hi));
    const ans = a * b;
    return {
        type: 'mcq', question: `What is ${a} × ${b}?`, answer: String(ans),
        options: shuffle(rand, [String(ans), ...wrongOptions(rand, ans)]),
        hint: `${a} groups of ${b}!`,
        misconception: `${a} × ${b} = ${ans} — ${a} groups of ${b}!`,
        workedExample: [`${a} × ${b} = ${a} groups of ${b}.`, `= ${ans}.`],
    };
};

// ─── DIVISION (exact) ────────────────────────────────────────
export const genDiv: GenFn = (rand, level) => {
    const [lo, hi] = range('div', level);
    const b = intIn(rand, 2, Math.min(12, hi));
    const ans = intIn(rand, 2, Math.min(12, hi));
    const a = b * ans; // exact division
    return {
        type: 'mcq', question: `What is ${a} ÷ ${b}?`, answer: String(ans),
        options: shuffle(rand, [String(ans), ...wrongOptions(rand, ans)]),
        hint: `How many ${b}s in ${a}?`,
        misconception: `${b} × ${ans} = ${a}, so ${a} ÷ ${b} = ${ans}!`,
        workedExample: [`Think: ${b} × ? = ${a}.`, `${b} × ${ans} = ${a}.`, `= ${ans}.`],
    };
};

// ─── PLACE VALUE ─────────────────────────────────────────────
export const genPlace: GenFn = (rand, level) => {
    const [lo, hi] = range('place', level);
    // Pick a number where the asked digit occurs EXACTLY ONCE (and is not 0),
    // so "what is the value of the digit d?" has exactly one defensible answer
    // — no "In 6643, the value of the digit 6?" ambiguity.
    let n = lo, digits = String(n), pos = 0, digit = Number(digits[pos]);
    for (let guard = 0; guard < 60; guard++) {
        n = intIn(rand, lo, hi);
        digits = String(n);
        pos = intIn(rand, 0, digits.length - 1);
        digit = Number(digits[pos]);
        if (digit !== 0 && digits.split('').filter(d => d === digits[pos]).length === 1) break;
    }
    const placeName = ['ones', 'tens', 'hundreds', 'thousands', 'ten-thousands', 'lakhs'][digits.length - 1 - pos];
    const val = digit * Math.pow(10, digits.length - 1 - pos);
    const ans = String(val);
    const candidates = [String(digit), String(digit * Math.pow(10, digits.length - pos)),
        String(digit * Math.pow(10, Math.max(0, digits.length - 2 - pos))),
        String(digit * Math.pow(10, Math.max(0, digits.length - 3 - pos)))];
    const options = [ans];
    for (const c of candidates) if (options.length < 4 && !options.includes(c)) options.push(c);
    let topGuard = 0;   // ones-place draws collapse the candidates — top up with near-misses
    while (options.length < 4 && topGuard++ < 60) {
        for (const w of wrongOptions(rand, val, 2)) if (options.length < 4 && !options.includes(w)) options.push(w);
    }
    return {
        type: 'mcq', question: `In ${n}, what is the value of the digit ${digit}?`,
        answer: ans,
        options: shuffle(rand, options),
        hint: 'Which place is it in?',
        misconception: `The ${digit} is in the ${placeName} place = ${val}!`,
        workedExample: [`${n}: find the ${digit}.`, `It is in the ${placeName} place.`, `= ${val}.`],
    };
};

// ─── PATTERN (arithmetic sequence) ───────────────────────────
export const genPattern: GenFn = (rand, level) => {
    const step = intIn(rand, 2, 2 + level * 3);
    const start = intIn(rand, 1, 5 + level * 5);
    const seq = [start, start + step, start + step * 2, start + step * 3];
    const ans = start + step * 4;
    return {
        type: 'mcq', question: `${seq.join(', ')}, ___?`, answer: String(ans),
        options: shuffle(rand, [String(ans), ...wrongOptions(rand, ans)]),
        hint: `Each step adds ${step}!`,
        misconception: `The rule is +${step}: ${seq[3]} + ${step} = ${ans}!`,
        workedExample: [`Jump = +${step}.`, `${seq[3]} + ${step} = ${ans}.`],
    };
};

// ─── FRACTIONS ───────────────────────────────────────────────
const FRACTIONS: [number, number][] = [[1, 2], [1, 3], [1, 4], [3, 4], [2, 3], [1, 5]];
const FRAC_NAMES: Record<string, string> = { '1/2': 'half', '1/3': 'a third', '1/4': 'a quarter', '3/4': 'three quarters', '2/3': 'two thirds', '1/5': 'a fifth' };
export const genFraction: GenFn = (rand, level) => {
    const [n, d] = pick(rand, FRACTIONS);
    const whole = intIn(rand, 2, 5 + level) * d; // divisible
    const ans = (whole / d) * n;
    return {
        type: 'mcq', question: `What is ${n}/${d} of ${whole}?`, answer: String(ans),
        options: shuffle(rand, [String(ans), ...wrongOptions(rand, ans)]),
        hint: `Divide by ${d}, then multiply by ${n}!`,
        misconception: `${n}/${d} of ${whole}: ${whole}÷${d}=${whole / d}, then ×${n} = ${ans}!`,
        workedExample: [`${whole} ÷ ${d} = ${whole / d}.`, `${whole / d} × ${n} = ${ans}.`],
    };
};

// ─── AREA / PERIMETER ────────────────────────────────────────
export const genArea: GenFn = (rand, level) => {
    let l = 2, w = 2;
    let opts: string[] = [];
    for (let guard = 0; guard < 40; guard++) {   // regenerate until options are all distinct
        l = intIn(rand, 2, 5 + level * 2); w = intIn(rand, 2, 5 + level);
        const ans = l * w;
        opts = [`${ans} sq cm`, `${2 * (l + w)} sq cm`, `${l + w} sq cm`, `${ans + 4} sq cm`];
        if (new Set(opts).size === opts.length) break;
    }
    return {
        type: 'mcq', question: `A rectangle is ${l} cm long and ${w} cm wide. Its area?`, answer: opts[0],
        options: shuffle(rand, opts),
        hint: 'Area = length × width!',
        misconception: `Area = L × W = ${l} × ${w} = ${l * w} sq cm (not perimeter!)`,
        workedExample: ['Area = length × width.', `${l} × ${w} = ${l * w} sq cm.`],
    };
};
export const genPerimeter: GenFn = (rand, level) => {
    let l = 2, w = 2;
    let opts: string[] = [];
    for (let guard = 0; guard < 40; guard++) {   // regenerate until options are all distinct
        l = intIn(rand, 2, 6 + level * 2); w = intIn(rand, 2, 5 + level);
        const ans = 2 * (l + w);
        opts = [`${ans} m`, `${l * w} m`, `${l + w} m`, `${ans + 4} m`];
        if (new Set(opts).size === opts.length) break;
    }
    return {
        type: 'mcq', question: `A field is ${l} m long and ${w} m wide. Its perimeter?`, answer: opts[0],
        options: shuffle(rand, opts),
        hint: 'Add all four sides!',
        misconception: `Perimeter = 2×(L+W) = 2×(${l}+${w}) = ${2 * (l + w)} m!`,
        workedExample: ['Perimeter = all sides.', `${l}+${w}+${l}+${w} = ${2 * (l + w)} m.`],
    };
};

// ─── DECIMALS ────────────────────────────────────────────────
export const genDecimal: GenFn = (rand, level) => {
    const a = intIn(rand, 1, 9) / 10, b = intIn(rand, 1, 9) / 10;
    const ans = Math.round((a + b) * 10) / 10;
    const opts = [ans.toFixed(1), (ans + 0.1).toFixed(1), (ans - 0.1 > 0 ? ans - 0.1 : ans + 0.2).toFixed(1)];
    return {
        type: 'mcq', question: `${a.toFixed(1)} + ${b.toFixed(1)} = ?`, answer: ans.toFixed(1),
        options: shuffle(rand, opts),
        hint: 'Add the tenths!',
        misconception: `${a.toFixed(1)} + ${b.toFixed(1)} = ${ans.toFixed(1)} — add tenths like numbers!`,
        workedExample: [`${Math.round(a * 10)} tenths + ${Math.round(b * 10)} tenths.`, `= ${ans.toFixed(1)}.`],
    };
};

// ─── MONEY ───────────────────────────────────────────────────
export const genMoney: GenFn = (rand, level) => {
    // paid is a real note; change is drawn in 1..note-1 so it is NEVER ₹0
    // (no price-equals-paid draws) and always strictly less than the note.
    const note = level >= 3 ? 50 : 10;
    const paid = intIn(rand, 1, 2 + level) * note;
    const change = intIn(rand, 1, note - 1);
    const price = paid - change;                       // ≥ 1, always < paid
    const ans = `₹${change}`;
    const opts = new Set<string>([ans]);
    for (const c of [`₹${change + 10}`, `₹${change + 1}`, `₹${price}`, `₹${price + 10}`]) {
        if (opts.size < 4) opts.add(c);
    }
    let guard = 0;                                     // top up until 4 DISTINCT options
    while (opts.size < 4 && guard++ < 60) opts.add(`₹${change + 1 + Math.floor(rand() * (note + 10))}`);
    return {
        type: 'mcq', question: `A toy costs ₹${price}. You give ₹${paid}. Change back?`, answer: ans,
        options: shuffle(rand, Array.from(opts)),
        hint: 'Change = what you gave − price!',
        misconception: `Change = ₹${paid} − ₹${price} = ₹${change}!`,
        workedExample: [`Gave ₹${paid}.`, `Price ₹${price}.`, `Change ₹${change}.`],
    };
};

// ─── TIME ────────────────────────────────────────────────────
export const genTime: GenFn = (rand, level) => {
    const h = intIn(rand, 1, 12);
    const m = pick(rand, level >= 3 ? [0, 15, 30, 45] : [0, 30]);
    const label = m === 0 ? `${h} o'clock` : m === 30 ? `half past ${h}` : m === 15 ? `quarter past ${h}` : `quarter to ${h + 1}`;
    return {
        type: 'interact', question: `Set the clock to ${h}:${String(m).padStart(2, '0')} (${label})!`, options: [],
        interactGoal: { instruction: `Hour ${h}, minutes ${m}`, widget: 'clock', validate: `clock:hour=${h === 12 ? 12 : h},mins=${m}` },
        hint: `Hour hand on ${h}, minutes to ${m}!`,
        misconception: `${h}:${String(m).padStart(2, '0')} = hour ${h}, minutes ${m}!`,
        workedExample: [`Hour = ${h}.`, `Minutes = ${m}.`, `Set the clock.`],
    };
};

// ─── MEASUREMENT (weight / capacity / length sense) ──────────
// Tables: [label, grams] / [label, millilitres] / [label, centimetres]
const HEAVY_THINGS: [string, number][] = [
    ['a feather', 5], ['a pencil', 15], ['an apple', 150],
    ['a book', 400], ['a watermelon', 3500], ['a school bag', 4500],
    ['a cow', 300000], ['an elephant', 4000000],
];
const CONTAINERS: [string, number][] = [
    ['a spoon', 5], ['a glass', 250], ['a mug', 350],
    ['a jug', 1200], ['a bucket', 15000], ['a bathtub', 150000],
];
const LONG_THINGS: [string, number][] = [
    ['an ant', 1], ['a pencil', 15], ['a cricket bat', 90],
    ['a door', 200], ['a bus', 1000],
];
export const genMeasure: GenFn = (rand, level) => {
    // level ≤ 2: qualitative comparison (heavier / holds more / longer)
    // level ≥ 3: adds kg↔g conversion draws
    const kind = level >= 3 ? intIn(rand, 0, 3) : intIn(rand, 0, 2);
    if (kind === 0) {
        const a = pick(rand, HEAVY_THINGS);
        let b = pick(rand, HEAVY_THINGS);
        for (let g = 0; b[1] === a[1] && g < 20; g++) b = pick(rand, HEAVY_THINGS);
        const heavier = a[1] > b[1] ? a[0] : b[0];
        return {
            type: 'mcq', question: `Which is HEAVIER: ${a[0]} or ${b[0]}?`, answer: heavier,
            options: shuffle(rand, [a[0], b[0], 'Both weigh the same']),
            hint: 'Think about real life — which one needs two hands?',
            misconception: `${heavier} is heavier — compare what each weighs in real life!`,
            workedExample: [`Weigh ${a[0]} vs ${b[0]}.`, `${heavier} is heavier.`],
        };
    }
    if (kind === 1) {
        const a = pick(rand, CONTAINERS);
        let b = pick(rand, CONTAINERS);
        for (let g = 0; b[1] === a[1] && g < 20; g++) b = pick(rand, CONTAINERS);
        const holds = a[1] > b[1] ? a[0] : b[0];
        return {
            type: 'mcq', question: `Which holds MORE water: ${a[0]} or ${b[0]}?`, answer: holds,
            options: shuffle(rand, [a[0], b[0], 'Both hold the same']),
            hint: 'Bigger inside = more water!',
            misconception: `${holds} holds more — capacity is how much fits inside!`,
            workedExample: [`Compare ${a[0]} and ${b[0]}.`, `${holds} is bigger inside.`],
        };
    }
    if (kind === 2) {
        const a = pick(rand, LONG_THINGS);
        let b = pick(rand, LONG_THINGS);
        for (let g = 0; b[1] === a[1] && g < 20; g++) b = pick(rand, LONG_THINGS);
        const longer = a[1] > b[1] ? a[0] : b[0];
        return {
            type: 'mcq', question: `Which is LONGER: ${a[0]} or ${b[0]}?`, answer: longer,
            options: shuffle(rand, [a[0], b[0], 'Both are the same length']),
            hint: 'Compare the two ends!',
            misconception: `${longer} is longer — compare real lengths!`,
            workedExample: [`Compare ${a[0]} and ${b[0]}.`, `${longer} is longer.`],
        };
    }
    // kg ↔ g conversion
    const kg = intIn(rand, 1, 2 + level);
    const ans = kg * 1000;
    return {
        type: 'mcq', question: `${kg} kg = how many grams?`, answer: String(ans),
        options: shuffle(rand, [String(ans), ...wrongOptions(rand, ans)]),
        hint: 'Kilo means thousand!',
        misconception: `1 kg = 1000 g, so ${kg} kg = ${kg} × 1000 = ${ans} g!`,
        workedExample: [`1 kg = 1000 g.`, `${kg} × 1000 = ${ans} g.`],
    };
};

// ─── ALGEBRA (solve for x) ───────────────────────────────────
export const genAlgebra: GenFn = (rand, level) => {
    const kind = intIn(rand, 0, 2);
    let x: number, q: string, m: string;
    if (kind === 0) {                    // x + a = b
        const a = intIn(rand, 2, 5 + level);
        x = intIn(rand, 1, 8 + level);
        q = `x + ${a} = ${x + a}. x = ?`; m = `x + ${a} = ${x + a} → x = ${x + a} − ${a} = ${x}.`;
    } else if (kind === 1) {             // x − a = b
        const a = intIn(rand, 2, 5 + level);
        x = a + intIn(rand, 1, 8 + level);
        q = `x − ${a} = ${x - a}. x = ?`; m = `x − ${a} = ${x - a} → x = ${x - a} + ${a} = ${x}.`;
    } else {                             // a·x = b (exact)
        const a = intIn(rand, 2, Math.min(9, 3 + level));
        x = intIn(rand, 2, Math.min(12, 4 + level));
        q = `${a}x = ${a * x}. x = ?`; m = `${a}x = ${a * x} → x = ${a * x} ÷ ${a} = ${x}.`;
    }
    return {
        type: 'mcq', question: q, answer: String(x),
        options: shuffle(rand, [String(x), ...wrongOptions(rand, x)]),
        hint: 'Undo the operation on both sides!',
        misconception: m,
        workedExample: [q.replace('. x = ?', '.'), `Undo it: keep sides equal.`, `x = ${x}.`],
    };
};

// ─── DATA HANDLING (mean / median / pictograph) ──────────────
export const genData: GenFn = (rand, level) => {
    const kind = intIn(rand, 0, 2);
    if (kind === 0) {                    // mean of three whole numbers
        let a = 0, b = 0, c = 0, mean = 0;
        for (let guard = 0; guard < 40; guard++) {
            a = intIn(rand, 1, 9 + level); b = intIn(rand, 1, 9 + level);
            mean = intIn(rand, 2, 10 + level);
            c = 3 * mean - a - b;
            if (c >= 1 && c !== a && c !== b && a !== b) break;
        }
        return {
            type: 'mcq', question: `Mean of ${a}, ${b}, ${c}?`, answer: String(mean),
            options: shuffle(rand, [String(mean), ...wrongOptions(rand, mean)]),
            hint: 'Add all values, divide by how many!',
            misconception: `Mean = (${a}+${b}+${c}) ÷ 3 = ${a + b + c} ÷ 3 = ${mean}.`,
            workedExample: [`${a}+${b}+${c} = ${a + b + c}.`, `÷ 3 = ${mean}.`],
        };
    }
    if (kind === 1) {                    // median of five sorted values
        // one offset below and one above keeps the list strictly sorted;
        // mid ≥ 8 keeps every listed value ≥ 2 (min below-offset is -4, minus 2 more)
        const mid = intIn(rand, 8, 10 + level);
        const below = pick(rand, [-4, -3, -2, -1]);
        const above = pick(rand, [1, 2, 3, 4]);
        const vals = [mid + below - 2, mid - 1, mid, mid + 1, mid + above + 2];
        return {
            type: 'mcq', question: `The median of ${vals.join(', ')}?`, answer: String(mid),
            options: shuffle(rand, [String(mid), String(mid - 1), String(mid + 1)]),
            hint: 'Sort them — take the middle value!',
            misconception: `Sorted: ${vals.join(', ')}. The middle (3rd) value = ${mid}.`,
            workedExample: ['Median = middle value.', `Middle = ${mid}.`],
        };
    }
    // pictograph scale
    const each = pick(rand, [2, 5, 10]);
    const pics = intIn(rand, 2, 7);
    const ans = each * pics;
    return {
        type: 'mcq', question: `A pictograph: each 🌟 = ${each} votes. ${'🌟'.repeat(pics)} = how many votes?`, answer: String(ans),
        options: shuffle(rand, [String(ans), ...wrongOptions(rand, ans)]),
        hint: `Each star is ${each} — count in ${each}s!`,
        misconception: `${pics} stars × ${each} = ${ans} votes!`,
        workedExample: [`Each 🌟 = ${each}.`, `${pics} × ${each} = ${ans}.`],
    };
};

// ─── SENIOR: PERCENT & PROFIT-LOSS ──────────────────────────
export const genPercent: GenFn = (rand, level) => {
    const kind = intIn(rand, 0, 2);
    if (kind === 0) {                    // p% of N
        const p = pick(rand, [5, 10, 15, 20, 25, 40, 50, 75]);
        const n = pick(rand, [40, 60, 80, 100, 120, 200, 240, 400, 500]);
        const ans = (p * n) / 100;
        return {
            type: 'mcq', question: `What is ${p}% of ${n}?`, answer: String(ans),
            options: shuffle(rand, [String(ans), ...wrongOptions(rand, ans)]),
            hint: 'Percent means per hundred!',
            misconception: `${p}% of ${n} = ${p}/100 × ${n} = ${ans} — not ${p} × ${n}!`,
            workedExample: [`${p}% = ${p}/100.`, `${p}/100 × ${n} = ${ans}.`],
        };
    }
    if (kind === 1) {                    // profit percent
        const cp = pick(rand, [100, 200, 250, 400, 500, 800]);
        const profit = pick(rand, [20, 40, 50, 80, 100]);
        const pct = Math.round((profit / cp) * 100);
        return {
            type: 'mcq', question: `Cost price ₹${cp}, sold for ₹${cp + profit}. Profit %?`, answer: `${pct}%`,
            options: shuffle(rand, [`${pct}%`, `${pct + 5}%`, `${Math.max(1, pct - 5)}%`]),
            hint: 'Profit % = profit ÷ cost × 100!',
            misconception: `Profit ₹${profit} on CP ₹${cp} → ${profit}/${cp} × 100 = ${pct}%!`,
            workedExample: [`Profit = ${cp + profit} − ${cp} = ₹${profit}.`, `${profit}/${cp} × 100 = ${pct}%.`],
        };
    }
    // increase/decrease by p%
    const n = pick(rand, [100, 200, 300, 400, 800, 1000]);
    const p = pick(rand, [10, 20, 25, 50]);
    const up = rand() < 0.5;
    const ans = up ? n + (n * p) / 100 : n - (n * p) / 100;
    return {
        type: 'mcq', question: `${n} ${up ? 'increased' : 'decreased'} by ${p}% = ?`, answer: String(ans),
        options: shuffle(rand, [String(ans), ...wrongOptions(rand, ans)]),
        hint: `Find ${p}% of ${n} first!`,
        misconception: `${p}% of ${n} = ${(n * p) / 100}; ${n} ${up ? '+' : '−'} ${(n * p) / 100} = ${ans}!`,
        workedExample: [`${p}% of ${n} = ${(n * p) / 100}.`, `${n} ${up ? '+' : '−'} ${(n * p) / 100} = ${ans}.`],
    };
};

// ─── SENIOR: RATIO & PROPORTION ─────────────────────────────
export const genRatio: GenFn = (rand, level) => {
    const kind = intIn(rand, 0, 1);
    if (kind === 0) {                    // simplify a:b — Set-guard: sa:sb must differ from sb:sa
        const g = pick(rand, [2, 3, 4, 5, 6, 8]);
        const a = intIn(rand, 1, 9) * g, b = intIn(rand, 1, 9) * g;
        const sa = a / g, sb = b / g;
        const opts = new Set([`${sa} : ${sb}`]);
        for (const c of [`${a} : ${b}`, `${sb} : ${sa}`, `${sa + 1} : ${sb}`, `${sa} : ${sb + 1}`])
            if (opts.size < 4) opts.add(c);
        let g2 = 0;
        while (opts.size < 4 && g2++ < 40) opts.add(`${sa + g2 + 2} : ${sb}`);
        return {
            type: 'mcq', question: `Simplify the ratio ${a} : ${b}`, answer: `${sa} : ${sb}`,
            options: shuffle(rand, Array.from(opts)),
            hint: 'Divide both by the same number!',
            misconception: `${a}:${b} ÷ ${g} = ${sa}:${sb} — the order matters, ${sb}:${sa} is different!`,
            workedExample: [`HCF of ${a}, ${b} = ${g}.`, `${a}÷${g} : ${b}÷${g} = ${sa}:${sb}.`],
        };
    }
    // share in ratio — distractors must not collide with the answer
    const r1 = intIn(rand, 1, 5), r2 = intIn(rand, 1, 5), each = pick(rand, [10, 20, 25, 50, 100]);
    const total = (r1 + r2) * each;
    const ans = r1 * each;
    const opts = new Set([`₹${ans}`]);
    for (const c of [r2 * each, ans + each, Math.abs(ans - each), ans + 2 * each])
        if (opts.size < 4 && c > 0) opts.add(`₹${c}`);
    let guard = 0;
    while (opts.size < 4 && guard++ < 40) opts.add(`₹${ans + (guard + 3) * each}`);
    return {
        type: 'mcq', question: `₹${total} shared in ratio ${r1}:${r2}. First share?`, answer: `₹${ans}`,
        options: shuffle(rand, Array.from(opts)),
        hint: `Total parts = ${r1 + r2}!`,
        misconception: `${r1}+${r2} = ${r1 + r2} parts; each part = ${total}÷${r1 + r2} = ${each}; first share = ${r1}×${each} = ₹${ans}!`,
        workedExample: [`Parts: ${r1}+${r2}=${r1 + r2}.`, `${total}÷${r1 + r2}=${each}.`, `${r1}×${each}=₹${ans}.`],
    };
};

// ─── SENIOR: SIMPLE INTEREST ────────────────────────────────
export const genSI: GenFn = (rand, level) => {
    const P = pick(rand, [1000, 2000, 5000, 8000, 10000]);
    const R = pick(rand, [5, 8, 10, 12]);
    const T = pick(rand, [2, 3, 4]);                          // T≥2 — T=1 collides distractors
    const si = (P * R * T) / 100;
    const opts = new Set([`₹${si}`]);
    for (const c of [`₹${(P * R) / 100}`, `₹${si + P / 10}`, `₹${(P * R * (T + 1)) / 100}`]) if (opts.size < 4) opts.add(c);
    let guard = 0;
    while (opts.size < 4 && guard++ < 40) opts.add(`₹${si + (guard + 1) * 50}`);
    return {
        type: 'mcq', question: `Simple interest on ₹${P} at ${R}% p.a. for ${T} years?`, answer: `₹${si}`,
        options: shuffle(rand, Array.from(opts)),
        hint: 'SI = P × R × T ÷ 100!',
        misconception: `SI = (${P}×${R}×${T})/100 = ₹${si} — forgetting ×T or ÷100 gives a wrong answer!`,
        workedExample: [`SI = P×R×T/100.`, `= ${P}×${R}×${T}/100.`, `= ₹${si}.`],
    };
};

// ─── SENIOR: EXPONENTS ──────────────────────────────────────
export const genExponent: GenFn = (rand, level) => {
    const kind = intIn(rand, 0, 2);
    if (kind === 0) {                    // a^m × a^n
        const m = intIn(rand, 2, 6), n = intIn(rand, 2, 6);
        const a = intIn(rand, 2, 5);
        const opts = new Set([String(m + n)]);
        for (const c of [m * n, 2 * m - n, m + n + 1, m + n - 1, m * n + 1])
            if (opts.size < 4 && c > 0) opts.add(String(c));
        let g = 0;
        while (opts.size < 4 && g++ < 40) opts.add(String(m + n + g + 1));
        return {
            type: 'mcq', question: `${a}^${m} × ${a}^${n} = ${a}^?`, answer: String(m + n),
            options: shuffle(rand, Array.from(opts)),
            hint: 'Same base → add powers!',
            misconception: `${a}^${m} × ${a}^${n} = ${a}^(${m}+${n}) = ${a}^${m + n} — you ADD exponents, not multiply!`,
            workedExample: ['Same base: add exponents.', `${m}+${n} = ${m + n}.`],
        };
    }
    if (kind === 1) {                    // a^m ÷ a^n
        const n = intIn(rand, 1, 4), m = n + intIn(rand, 1, 5);
        const a = intIn(rand, 2, 6);
        const opts = new Set([String(m - n)]);
        for (const c of [m + n, Math.round(m / n), m - n + 1, m - n - 1, m + n + 1])
            if (opts.size < 4 && c > 0) opts.add(String(c));
        let g = 0;
        while (opts.size < 4 && g++ < 40) opts.add(String(m - n + g + 2));
        return {
            type: 'mcq', question: `${a}^${m} ÷ ${a}^${n} = ${a}^?`, answer: String(m - n),
            options: shuffle(rand, Array.from(opts)),
            hint: 'Same base → subtract powers!',
            misconception: `${a}^${m} ÷ ${a}^${n} = ${a}^(${m}−${n}) = ${a}^${m - n}!`,
            workedExample: ['Same base: subtract exponents.', `${m}−${n} = ${m - n}.`],
        };
    }
    // evaluate a^n — a·n collides when a^n == a·n (e.g. 2²); regenerate
    let a = 3, n = 3;
    for (let g = 0; g < 40; g++) {
        a = intIn(rand, 2, 5); n = intIn(rand, 2, level >= 4 ? 5 : 4);
        if (Math.pow(a, n) !== a * n) break;
    }
    const ans = Math.pow(a, n);
    const opts2 = new Set([String(ans)]);
    for (const c of [String(a * n), String(ans + a)]) if (opts2.size < 4) opts2.add(c);
    for (const w of wrongOptions(rand, ans, 2)) if (opts2.size < 4) opts2.add(w);
    return {
        type: 'mcq', question: `${a}^${n} = ?`, answer: String(ans),
        options: shuffle(rand, Array.from(opts2)),
        hint: `Multiply ${a} by itself ${n} times!`,
        misconception: `${a}^${n} = ${a}×…×${a} (${n} times) = ${ans} — NOT ${a}×${n}!`,
        workedExample: [`${a}^${n} means ${n} factors of ${a}.`, `= ${ans}.`],
    };
};

// ─── SENIOR: TWO-STEP LINEAR (ax + b = c) ───────────────────
export const genLinear2: GenFn = (rand, level) => {
    let a = 3, x = 4, b = 7;
    for (let g = 0; g < 40; g++) {       // x±1 can equal c−b (= a·x) — regenerate until distinct
        a = intIn(rand, 2, Math.min(9, 3 + level));
        x = intIn(rand, 2, 9 + level);
        b = intIn(rand, 1, 15 + level);
        if (a * x !== x + 1 && a * x !== x - 1) break;
    }
    const c = a * x + b;
    return {
        type: 'mcq', question: `Solve: ${a}x + ${b} = ${c}`, answer: `x = ${x}`,
        options: shuffle(rand, [`x = ${x}`, `x = ${c - b}`, `x = ${x + 1}`, `x = ${x - 1}`]),
        hint: `Subtract ${b} first, then divide by ${a}!`,
        misconception: `${a}x + ${b} = ${c} → ${a}x = ${c - b} → x = ${x}. Dividing first is the classic error!`,
        workedExample: [`${a}x + ${b} = ${c}.`, `${a}x = ${c} − ${b} = ${c - b}.`, `x = ${c - b} ÷ ${a} = ${x}.`],
    };
};

// ─── registry ────────────────────────────────────────────────
export const GENERATORS: Record<string, GenFn> = {
    percent: genPercent, ratio: genRatio, si: genSI,
    exponent: genExponent, linear2: genLinear2,
    add: genAdd, sub: genSub, mul: genMul, div: genDiv,
    place: genPlace, pattern: genPattern, fraction: genFraction,
    area: genArea, perimeter: genPerimeter, decimal: genDecimal,
    money: genMoney, time: genTime,
    measure: genMeasure, algebra: genAlgebra, data: genData,
};

/** Generate `count` fresh challenges for a sim. Seed differs per run → new questions.
 *  `kind` may be a single key ('add') or several ('add,sub') — mixed round-robin. */
export function generateChallenges(kind: string | string[], count: number, level: number, seed?: number): Challenge[] {
    const kinds = (Array.isArray(kind) ? kind : kind.split(',')).map(k => k.trim()).filter(k => GENERATORS[k]);
    if (!kinds.length) return [];
    const base = seed ?? Math.floor(Math.random() * 1e9);
    const out: Challenge[] = [];
    const seen = new Set<string>();
    for (let i = 0; out.length < count && i < count * 10; i++) {
        const gen = GENERATORS[kinds[i % kinds.length]];
        const rand = mulberry32(base + i * 7919);
        const c = gen(rand, level);
        if (c.question && !seen.has(c.question)) { seen.add(c.question); out.push(c); }
    }
    return out;
}
