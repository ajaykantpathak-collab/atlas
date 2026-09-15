/**
 * lexgen.ts — lexicon-driven question generators for EVS/language sims.
 *
 * Mirrors backend question_types.py's "lexicons are data" stance: instead
 * of hand-writing every challenge, a sim supplies a DATA TABLE (facts,
 * pairs, member sets) and the generator produces fresh questions each run.
 *
 * Generator kinds:
 *   sort    — sample K items from the sort pool into bins (uses sim's own items)
 *   which   — "Which of these is a {category}?" member vs non-member MCQ
 *   fill    — "The ___ lives in a ___" fill-in-blank from sentence data
 *   match   — two-column match rendered as MCQ ("X goes with ___?")
 *   opposite— "Opposite of {a}?" from a pairs table
 *   oddone  — "Which is the odd one out?" from category sets
 */
import type { Challenge, Bin, SortItem } from './types';

function rng(seed: number) {
    let s = seed;
    return function () {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
    };
}
function pick<T>(r: () => number, a: T[]): T { return a[Math.floor(r() * a.length)]; }
function shuffle<T>(r: () => number, a: T[]): T[] {
    const c = [...a];
    for (let i = c.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [c[i], c[j]] = [c[j], c[i]]; }
    return c;
}
function sample<T>(r: () => number, a: T[], k: number): T[] { return shuffle(r, a).slice(0, Math.min(k, a.length)); }

// ─── lexicon data shapes ─────────────────────────────────────
export interface WhichLex { category: string; members: { label: string; emoji: string }[]; others: { label: string; emoji: string }[] }
export interface FillLex { template: string; blank: string; answer: string; distractors: string[]; fact: string }
export interface MatchLex { pairs: { a: string; b: string; emojiA?: string }[]; prompt: string }
export interface OppLex { pairs: { a: string; b: string }[] }
export interface OddLex { category: string; members: { label: string; emoji: string }[]; others: { label: string; emoji: string }[] }

export type LexData =
    | { kind: 'sort'; bins: Bin[]; items: SortItem[]; sample?: number }
    | { kind: 'which'; sets: WhichLex[] }
    | { kind: 'fill'; items: FillLex[] }
    | { kind: 'match'; sets: MatchLex[] }
    | { kind: 'opposite'; data: OppLex }
    | { kind: 'oddone'; sets: OddLex[] };

// ─── generators ──────────────────────────────────────────────
function gSort(d: Extract<LexData, { kind: 'sort' }>, r: () => number): Challenge {
    const k = d.sample ?? Math.min(5, d.items.length);
    const items = sample(r, d.items, k);
    // The sampled items are part of the question text — otherwise every draw
    // shares one constant string and the deduper collapses N rounds into 1.
    return {
        type: 'sort', question: `Sort these ${items.length} items: ${items.map(i => i.label).join(', ')}!`, options: [],
        sortItems: items, bins: d.bins,
        hint: 'Think about which group each belongs to!',
        misconception: 'Read each item — which bin does it truly belong to?',
        workedExample: ['Look at each item.', 'Match to the right bin.'],
    };
}
function gWhich(d: Extract<LexData, { kind: 'which' }>, r: () => number): Challenge {
    const set = pick(r, d.sets);
    const member = pick(r, set.members);
    const others = sample(r, set.others.filter(o => o.label !== member.label), 2);
    const opts = shuffle(r, [member.label, ...others.map(o => o.label)]);
    return {
        type: 'mcq', question: `Which of these is a ${set.category}?`, answer: member.label, options: opts,
        hint: `Think — what makes something a ${set.category}?`,
        misconception: `${member.label} is a ${set.category} — the others are not!`,
        workedExample: [`Recall what a ${set.category} is.`, `${member.label} fits.`],
    };
}
function gFill(d: Extract<LexData, { kind: 'fill' }>, r: () => number): Challenge {
    const it = pick(r, d.items);
    const opts = shuffle(r, [it.answer, ...sample(r, it.distractors, 2)]);
    return {
        type: 'mcq', question: it.template, answer: it.answer, options: opts,
        hint: it.fact,
        misconception: `The answer is "${it.answer}" — ${it.fact}`,
        workedExample: [it.fact, `→ ${it.answer}.`],
    };
}
function gMatch(d: Extract<LexData, { kind: 'match' }>, r: () => number): Challenge {
    const set = pick(r, d.sets);
    const pair = pick(r, set.pairs);
    const wrongs = sample(r, set.pairs.filter(p => p.b !== pair.b), 2).map(p => p.b);
    const opts = shuffle(r, [pair.b, ...wrongs]);
    return {
        type: 'mcq', question: `${set.prompt}: ${pair.a} → ?`, answer: pair.b, options: opts,
        hint: `What goes with ${pair.a}?`,
        misconception: `${pair.a} goes with ${pair.b}!`,
        workedExample: [`${pair.a} matches ${pair.b}.`],
    };
}
function gOpposite(d: Extract<LexData, { kind: 'opposite' }>, r: () => number): Challenge {
    const pair = pick(r, d.data.pairs);
    const wrongs = sample(r, d.data.pairs.filter(p => p.b !== pair.b), 2).map(p => p.b);
    const opts = shuffle(r, [pair.b, ...wrongs]);
    return {
        type: 'mcq', question: `What is the opposite of "${pair.a}"?`, answer: pair.b, options: opts,
        hint: `Think of the reverse of ${pair.a}!`,
        misconception: `${pair.a} ↔ ${pair.b} are opposites!`,
        workedExample: [`${pair.a}'s opposite.`, `= ${pair.b}.`],
    };
}
function gOddOne(d: Extract<LexData, { kind: 'oddone' }>, r: () => number): Challenge {
    const set = pick(r, d.sets);
    const member = pick(r, set.members);
    const odd = pick(r, set.others);
    const fillers = sample(r, set.members.filter(m => m.label !== member.label), 2);
    const shown = shuffle(r, [member.label, ...fillers.map(f => f.label), odd.label]);
    return {
        type: 'mcq', question: `Which is the ODD one out? (${set.category})`, answer: odd.label, options: shown,
        hint: `Three are ${set.category} — one is not!`,
        misconception: `${odd.label} is NOT a ${set.category} — the rest are!`,
        workedExample: [`${set.category}: ${member.label}, ${fillers[0]?.label}, ${fillers[1]?.label}.`, `Odd one: ${odd.label}.`],
    };
}

/** Generate challenges from lexicon data. */
export function generateLex(d: LexData, count: number, seed?: number): Challenge[] {
    const base = seed ?? Math.floor(Math.random() * 1e9);
    const out: Challenge[] = [];
    const seen = new Set<string>();
    for (let i = 0; out.length < count && i < count * 12; i++) {
        const r = rng(base + i * 7919);
        let c: Challenge | null = null;
        if (d.kind === 'sort') c = gSort(d, r);
        else if (d.kind === 'which') c = gWhich(d, r);
        else if (d.kind === 'fill') c = gFill(d, r);
        else if (d.kind === 'match') c = gMatch(d, r);
        else if (d.kind === 'opposite') c = gOpposite(d, r);
        else if (d.kind === 'oddone') c = gOddOne(d, r);
        if (c && c.question && !seen.has(c.question)) { seen.add(c.question); out.push(c); }
    }
    return out;
}
