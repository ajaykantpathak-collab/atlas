/**
 * englishMeter — deterministic English poem scanner (Atlas literature engine).
 *
 * Closed-world discipline: this module scans the TEXT it is handed. It never
 * fetches, never invents poem bodies the corpus does not carry, and never
 * consults an LLM or network. Every classification ships with per-line syllable
 * counts and the stress pattern string as its "steps", a 0..1 confidence, and
 * honest declines (too short, prose-like) or a free-verse verdict when nothing
 * aligns.
 *
 * Pipeline (all rule-based):
 *   1. TOKENISE    — lines, stanzas, words (unicode-safe, emoji/Hindi tolerated).
 *   2. SYLLABLES   — irregular-word dictionary (~200 commonest irregulars in the
 *                    corpus poems) first; otherwise the vowel-group heuristic
 *                    with silent-e / -ed / -es / -le / medial-hiatus rules.
 *   3. STRESS      — function words unstressed; content words get a stress map
 *                    from suffix shift rules (-ic/-ion/-ity/-ify/-ical/-ious...)
 *                    plus a small override table for scansion-critical words.
 *   4. FOOT        — per line, edit distance of the stress pattern against
 *                    canonical foot templates (iamb x/, trochee /x, anapest xx/,
 *                    dactyl /xx) with initial-inversion, catalexis and
 *                    feminine-ending variants.
 *   5. VERDICT     — dominant family (fit-weighted vote) + feet range across
 *                    lines, approximate spelling rhyme scheme as a verification
 *                    beat, confidence, or free verse when no family dominates.
 *
 * Nothing in here mutates state and nothing reads a node id.
 */
// ─── 1 · irregular dictionary (syllable counts; corpus-poem vocabulary) ──────
/**
 * Counts for words whose spelling betrays the vowel-group heuristic.
 * Sourced from the commonest irregulars in the corpus poems (Frost, Blake,
 * Whitman vocabulary) plus high-frequency function/content words.
 * Poetic scansion values: `fire` = 1 (Frost's "…end in fire" scans 8),
 * `every` = 2, `hour` = 1, `flower` = 2, `buried` = 2, `rued` = 1.
 */
const SYLLABLE_DICT = {
    // function / high-frequency words
    the: 1, a: 1, an: 1, and: 1, of: 1, to: 1, in: 1, on: 1, at: 1, by: 1,
    for: 1, with: 1, from: 1, as: 1, is: 1, are: 1, was: 1, were: 1, be: 1,
    been: 1, being: 2, am: 1, it: 1, its: 1, this: 1, that: 1, these: 1,
    those: 1, i: 1, you: 1, he: 1, she: 1, we: 1, they: 1, me: 1, him: 1,
    her: 1, us: 1, them: 1, my: 1, your: 1, his: 1, our: 1, their: 1,
    who: 1, whose: 1, whom: 1, what: 1, when: 1, where: 1, why: 1, how: 1,
    not: 1, no: 1, nor: 1, so: 1, if: 1, then: 1, than: 1, all: 1, some: 1,
    any: 1, each: 1, both: 1, few: 1, more: 1, most: 1, other: 2, into: 2,
    out: 1, up: 1, down: 1, over: 2, under: 2, again: 2, once: 1, there: 1,
    here: 1, now: 1, o: 1, oh: 1, ere: 1, till: 1, yet: 1, still: 1, too: 1,
    do: 1, does: 1, did: 1, done: 1, has: 1, have: 1, had: 1, will: 1,
    would: 1, shall: 1, should: 1, can: 1, could: 1, may: 1, might: 1,
    must: 1, said: 1, says: 1, one: 1, two: 1,
    // common irregulars (heuristic traps)
    every: 2, evening: 2, fire: 1, hour: 1, flower: 2, flowers: 2, buried: 2,
    quiet: 2, quietly: 3, poem: 2, poems: 2, poet: 2, poetry: 3, idea: 3,
    ideas: 3, real: 1, really: 2, cruel: 2, jewel: 2, jewels: 2, lion: 2,
    lions: 2, riot: 2, ruin: 2, ruins: 2, science: 2, client: 2, diet: 2,
    giant: 2, radio: 3, video: 3, period: 3, piano: 3, museum: 3, media: 3,
    usual: 3, usually: 4, actual: 3, actually: 4, beautiful: 3, society: 4,
    hierarchy: 4, heaven: 2, heavens: 2, given: 2, chosen: 2, written: 2,
    beaten: 2, broken: 2, shaken: 2, taken: 2, eaten: 2, frozen: 2, stolen: 2,
    rued: 1, ruined: 2, pursued: 2, viewed: 1, chewed: 1, stewed: 1,
    saved: 1, loved: 1, moved: 1, lived: 1, changed: 1, wished: 1,
    watched: 1, looked: 1, asked: 1, thanked: 1, fixed: 1, mixed: 1,
    tired: 1, hired: 1, bored: 1, scored: 1, shared: 1, cared: 1,
    aged: 1, cursed: 2, blessed: 2, wicked: 2, naked: 2, sacred: 2,
    crooked: 2, learned: 2, ragged: 2, dogged: 2,
    area: 3, ocean: 2, doing: 2, going: 2, seeing: 2,
    praying: 2, playing: 2, saying: 2, dying: 2, lying: 2, tying: 2,
    // Frost / First Flight vocabulary
    crow: 1, snow: 1, hemlock: 2, tree: 1, heart: 1, mood: 1, part: 1,
    day: 1, dust: 1, shook: 1, way: 1, world: 1, end: 1, ice: 1,
    tasted: 2, desire: 2, favor: 2, favour: 2, perish: 2, twice: 1,
    hate: 1, destruction: 3, great: 1, suffice: 2, roads: 1, diverged: 2,
    yellow: 2, wood: 1, travel: 2, stood: 1, grass: 1, wanted: 2, wear: 1,
    claim: 1, perhaps: 2, fair: 1, having: 2, second: 2, first: 1,
    hence: 1, sigh: 1, ages: 2, difference: 3, different: 3, undergrowth: 3,
    trodden: 2, leaves: 1, morning: 2, inspects: 2, inspected: 3,
    honestly: 3, equally: 3, laying: 2, step: 1, black: 1, worn: 1,
    telling: 2, somewhere: 2, travelled: 2, traveler: 2, traveller: 3,
    // Blake / The Tyger vocabulary
    tyger: 2, tiger: 2, burning: 2, bright: 1, forests: 2, forest: 2,
    night: 1, immortal: 3, hand: 1, eye: 1, eyes: 1, frame: 1, thy: 1,
    fearful: 2, symmetry: 3, distant: 2, deeps: 1, skies: 1, burnt: 1,
    wings: 1, aspire: 2, seized: 1, seize: 1, art: 1, twisted: 2,
    sinews: 2, knee: 1, knees: 1, began: 2, beat: 1, terrors: 2,
    clasp: 1, merciless: 3, chain: 1, chains: 1, watered: 2,
    hammer: 2, furnace: 2, brain: 1, brains: 1, anvil: 2, dare: 1,
    deadly: 2, grasp: 1, spears: 1, stars: 1, threw: 1, smiles: 1,
    tears: 1, lamb: 1, maker: 2, made: 1,
    // Whitman / Animals vocabulary
    animals: 3, animal: 3, placid: 2, stand: 1, long: 1, sweat: 1,
    whine: 1, condition: 3, awake: 2, dark: 1, weep: 1, sins: 1, sick: 1,
    discussing: 3, duty: 2, god: 1, dissatisfied: 4, demented: 3, mania: 3,
    owning: 2, things: 1, kneels: 1, kind: 1, thousands: 2, years: 1,
    ago: 2, respectable: 4, unhappy: 3, earth: 1, turn: 1, live: 1,
    look: 1, thinking: 2, thoughts: 2, tokens: 2, myself: 2, wonder: 2,
};
/** scansion-critical stress overrides: word → '/'x' string, one char per syllable */
const STRESS_OVERRIDE = {
    tyger: "/x", tiger: "/x", burning: "/x", forests: "/x", immortal: "x/x",
    symmetry: "/xx", fearful: "/x", distant: "/x", hemlock: "/x",
    diverged: "x/", yellow: "/x", undergrowth: "/xx", trodden: "/x",
    desire: "x/", favor: "/x", favour: "/x", destruction: "x/x",
    perish: "/x", aspire: "x/", sinews: "/x", anvil: "/x", furnace: "/x",
    shoulder: "/x", merciless: "/xx", dissatisfied: "xxx/",
    respectable: "x/xx", animals: "/xx", animal: "/xx", condition: "x/x",
    mania: "x/x", demented: "x/x", unhappy: "xx/", beautiful: "/xx",
    difference: "/xx", different: "/xx", heaven: "/x", heavens: "/x",
    given: "/x", buried: "/x", quiet: "/x", quietly: "/xx", poem: "/x",
    poetry: "/xx", idea: "x/x", ideas: "x/x", morning: "/x", telling: "/x",
    ages: "/x", somewhere: "/x", traveller: "/xx", equally: "/xx",
    honestly: "/xx", inspected: "x/x", rued: "/", watered: "/x",
    twisted: "/x", began: "x/", terrors: "/x", breaking: "/x",
    darkness: "/x", wonder: "/x", myself: "x/", selfcontained: "x//",
    thousand: "/x", thousands: "/x", travelled: "/x",
};
/** Function words / obvious unstressed monosyllables. */
const FUNCTION_WORDS = new Set([
    "the", "a", "an", "of", "to", "in", "on", "at", "by", "for", "with",
    "from", "as", "is", "are", "was", "were", "be", "been", "am", "it",
    "its", "this", "that", "these", "those", "i", "you", "he", "she", "we",
    "they", "me", "him", "her", "us", "them", "my", "your", "his", "our",
    "their", "who", "whom", "what", "when", "where", "how", "not", "no",
    "nor", "so", "if", "then", "than", "and", "or", "but", "both", "all",
    "some", "any", "each", "into", "out", "over", "under",
    "there", "here", "now", "o", "oh", "ere", "till", "yet", "too", "do",
    "does", "did", "has", "have", "had", "will", "would", "shall", "should",
    "can", "could", "may", "might", "must", "upon", "off", "per",
    // contracted forms scan weak (I've, don't, it's …)
    "i'm", "i've", "i'll", "i'd", "you're", "you've", "we're", "we've",
    "they're", "it's", "that's", "there's", "what's", "he's", "she's",
    "let's", "don't", "won't", "can't", "isn't", "aren't", "wasn't",
    "weren't", "didn't", "doesn't", "couldn't", "shouldn't", "wouldn't",
    // archaic pronouns/auxiliaries common in the corpus poems (Blake et al.)
    "thou", "thee", "thy", "thine", "ye", "hath", "doth", "thyself",
]);
// ─── 2 · syllable counting ────────────────────────────────────────────────────
const VOWELS = "aeiouy";
function isVowel(ch) {
    return VOWELS.includes(ch);
}
function cleanWord(w) {
    return w
        .toLowerCase()
        .replace(/[^a-z']/g, "")
        .replace(/'+/g, "'")
        .replace(/^'+|'+$/g, "");
}
function dictCount(w) {
    if (Object.prototype.hasOwnProperty.call(SYLLABLE_DICT, w))
        return SYLLABLE_DICT[w];
    // contraction tail: I've → i, you're → you (but don't keeps its 't)
    const bare = w.replace(/'(s|ve|ll|re|m|d)$/g, "");
    if (bare !== w && Object.prototype.hasOwnProperty.call(SYLLABLE_DICT, bare)) {
        return SYLLABLE_DICT[bare];
    }
    return null;
}
/**
 * Count syllables of one word. Dictionary first; then the vowel-group
 * heuristic with the standard repairs (silent e, -le, -ed, -es, hiatus).
 */
export function countSyllables(word) {
    const w = cleanWord(word);
    if (!w)
        return 0;
    const hit = dictCount(w);
    if (hit !== null)
        return hit;
    let count = 0;
    const n = w.length;
    let prevVowel = false;
    for (let i = 0; i < n; i++) {
        const ch = w[i];
        if (!isVowel(ch)) {
            prevVowel = false;
            continue;
        }
        if (!prevVowel) {
            count++;
            // medial hiatus: io/ia/eo/ua/uo/iu usually splits (pe·ri·od, me·di·a)
            // unless it is -tion/-sion/-cial/-tial or follows n (o·pin·ion family)
            if (i > 0) {
                const pair = w.slice(i, i + 2);
                const before = w[i - 1];
                const after = w[i + 2] ?? "";
                const four = w.slice(Math.max(0, i - 1), i + 3);
                const isSion = (before === "s" || before === "t") && pair === "io" && after === "n";
                const isCial = four === "cial" || four === "tial";
                const afterN = before === "n" && pair === "io";
                if (["io", "ia", "eo", "ua", "uo", "iu"].includes(pair) &&
                    !isSion && !isCial && !afterN) {
                    count++;
                }
            }
        }
        prevVowel = true;
    }
    // silent final e (make → 1); "...le" endings keep their syllable (ta·ble)
    if (n >= 3 && w[n - 1] === "e" && !isVowel(w[n - 2]))
        count--;
    if (/(?:[^aeiouy])le$/.test(w))
        count++;
    // -ed: silent unless the stem ends in t/d (loved=1, hated=2); "ied"/vowel
    // stems were already one group (carried=2, tried=1)
    if (/ed$/.test(w) && n >= 3) {
        const stemEnd = w[n - 3];
        if (stemEnd !== "t" && stemEnd !== "d" && !isVowel(stemEnd))
            count--;
    }
    // -es: silent unless after a sibilant (makes=1, boxes=2)
    if (/es$/.test(w) && n >= 3) {
        const two = w.slice(Math.max(0, n - 4), n - 2); // last two chars of the stem
        if (!/(s|x|z|ch|sh|ge|ce)$/.test(two))
            count--;
    }
    return Math.max(1, count);
}
// ─── 3 · stress estimation ────────────────────────────────────────────────────
/**
 * Map word → per-syllable stress string ('/' / 'x').
 * Order: scansion override → function word (unstressed) → suffix shift rules
 * (-tion/-sion, -ic, -ity, -ify/-ical/-ious/-eous/-ial/-ian, -y antepenult)
 * → defaults (2 syl: first-syllable; longer: antepenult).
 */
export function stressOf(word) {
    const w = cleanWord(word);
    if (!w)
        return "";
    const nSyl = countSyllables(w);
    if (Object.prototype.hasOwnProperty.call(STRESS_OVERRIDE, w)) {
        const ov = STRESS_OVERRIDE[w];
        if (ov.length === nSyl)
            return ov;
    }
    if (FUNCTION_WORDS.has(w))
        return "x".repeat(Math.max(1, nSyl));
    if (nSyl === 1)
        return "/";
    const syls = splitSyllables(w, nSyl);
    const last = syls[syls.length - 1];
    const stressAt = (idx) => syls.map((_, k) => (k === idx ? "/" : "x")).join("");
    if (/(?:tion|sion)$/.test(last) && syls.length >= 2)
        return stressAt(syls.length - 2);
    if (/ic$/.test(last) && syls.length >= 2)
        return stressAt(syls.length - 2);
    if (/ity$/.test(last) && syls.length >= 3)
        return stressAt(syls.length - 3);
    if (/(?:ify|ical|ious|eous|ial|ian)$/.test(last) && syls.length >= 2) {
        return stressAt(syls.length - 2);
    }
    if (/y$/.test(last) && syls.length >= 3)
        return stressAt(syls.length - 3);
    if (syls.length === 2)
        return "/x";
    return stressAt(Math.max(0, syls.length - 3));
}
/** Deterministic syllable splitter consistent with countSyllables (for stress maps). */
function splitSyllables(w, n) {
    const cuts = [0];
    let prevVowel = false;
    for (let i = 0; i < w.length; i++) {
        if (isVowel(w[i])) {
            if (!prevVowel && i > 0)
                cuts.push(i);
            prevVowel = true;
        }
        else {
            prevVowel = false;
        }
    }
    while (cuts.length > n && cuts.length > 1)
        cuts.pop();
    const out = [];
    for (let k = 0; k < cuts.length; k++) {
        out.push(w.slice(cuts[k], k + 1 < cuts.length ? cuts[k + 1] : w.length));
    }
    return out;
}
const NAMES = {
    1: "monometer", 2: "dimeter", 3: "trimeter", 4: "tetrameter",
    5: "pentameter", 6: "hexameter", 7: "heptameter", 8: "octameter",
};
/**
 * Weighted edit distance; deleting the pattern's FIRST character costs extra
 * (1.6): a scansion that discards the opening syllable is weak evidence for a
 * foot, while a substitution there is a normal initial inversion. This keeps
 * iambic as the default without letting it swallow trochaic lines like
 * "What immortal hand or eye".
 */
function editDistance(a, b) {
    const m = a.length;
    const nn = b.length;
    if (!m)
        return nn;
    if (!nn)
        return m;
    const INF = 1e9;
    const d = Array.from({ length: m + 1 }, () => new Array(nn + 1).fill(INF));
    for (let j = 0; j <= nn; j++)
        d[0][j] = j;
    for (let i = 1; i <= m; i++) {
        const delCost = i === 1 ? 1.6 : 1;
        for (let j = 1; j <= nn; j++) {
            const sub = d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1);
            d[i][j] = Math.min(sub, d[i - 1][j] + delCost, d[i][j - 1] + 1);
        }
    }
    return d[m][nn];
}
/**
 * Classify a stress pattern into the cheapest canonical foot template.
 * Variants cover the normal English licences: initial inversion ("Shook
 * down on me"), catalexis (trochaic lines missing the final slack syllable),
 * feminine endings, an anacrusis before the first ictus.
 * Tie order: lower cost → template length equal to the pattern length (a pure
 * substitution is stronger evidence than one that discards syllables) →
 * iambic (the English default) → fewer feet.
 */
function classifyPattern(pattern) {
    const beatsMax = Math.min(6, Math.max(1, Math.ceil(pattern.length / 2)));
    const cands = [];
    const push = (family, beats, template) => {
        // triple meters (anapest/dactyl) must win DECISIVELY: the taught anthology
        // is duple (Frost iambic, Blake trochaic), so a triple reading carries a
        // scepticism penalty — near-exact triples survive (cost 0 × anything = 0)
        const effCost = editDistance(pattern, template) * (family === "anapestic" || family === "dactylic" ? 2.5 : 1);
        cands.push({
            family,
            beats,
            cost: effCost,
            templateLen: template.length,
        });
    };
    for (let b = 1; b <= beatsMax; b++) {
        push("iambic", b, "x/".repeat(b)); // x/ x/ …
        push("iambic", b, "/x" + "x/".repeat(b - 1)); // initial inversion: /x x/ …
        push("iambic", b, "x/".repeat(b) + "x"); // feminine ending
        push("trochaic", b, "/x".repeat(b)); // /x /x …
        push("trochaic", b, "/x".repeat(b - 1) + "/"); // catalectic: /x /x /
        push("trochaic", b, "/x".repeat(b) + "x"); // feminine
        push("anapestic", b, "xx/".repeat(b)); // xx/ xx/ …
        push("anapestic", b, "x" + "xx/".repeat(b)); // anacrusis
        push("dactylic", b, "/xx".repeat(b)); // /xx /xx …
        push("dactylic", b, "/xx".repeat(b - 1) + "/"); // catalectic
    }
    if (!cands.length)
        return { all: [], best: null };
    cands.sort((p, q) => {
        if (p.cost !== q.cost)
            return p.cost - q.cost;
        const pExactLen = p.templateLen === pattern.length ? 0 : 1;
        const qExactLen = q.templateLen === pattern.length ? 0 : 1;
        if (pExactLen !== qExactLen)
            return pExactLen - qExactLen;
        if (p.family === "iambic" && q.family !== "iambic")
            return -1;
        if (q.family === "iambic" && p.family !== "iambic")
            return 1;
        return p.beats - q.beats;
    });
    return { all: cands, best: cands[0] };
}
// ─── 5 · approximate rhyme (spelling-based, labelled approximate) ────────────
function rhymeTail(word) {
    const w = word.toLowerCase().replace(/[^a-z]/g, "");
    if (w.length < 2)
        return null;
    // vowel-group starts
    const starts = [];
    for (let i = 0; i < w.length; i++) {
        if (isVowel(w[i]) && (i === 0 || !isVowel(w[i - 1])))
            starts.push(i);
    }
    if (!starts.length)
        return null;
    // a word-final silent e is not the rhyme vowel (fire → ire, not "e")
    let start = starts[starts.length - 1];
    if (starts.length >= 2 && /[^aeiouy]e$/.test(w) && start === w.length - 1) {
        start = starts[starts.length - 2];
    }
    let tail = w.slice(start);
    tail = tail.replace(/^ue/, "oo"); // rued → ood (rhymes with mood)
    tail = tail.replace(/(.)\1$/, "$1"); // tree → tre vs me → me? no: ee → e
    return tail || null;
}
function rhymeScheme(stanzaLineWords) {
    const letters = "ABCDEFGH";
    const seen = [];
    let out = "";
    let next = 0;
    for (const words of stanzaLineWords) {
        const last = words.length ? words[words.length - 1] : "";
        const tail = rhymeTail(last);
        if (!tail) {
            out += "?";
            continue;
        }
        const hit = seen.find(([t]) => t === tail);
        if (hit) {
            out += hit[1];
        }
        else {
            const letter = letters[next] ?? "Z";
            next++;
            seen.push([tail, letter]);
            out += letter;
        }
    }
    return out;
}
// ─── 6 · poem scanning ────────────────────────────────────────────────────────
function tidyText(text) {
    return text.replace(/\r\n?/g, "\n").split("\n").map((l) => l.trim());
}
function splitStanzas(lines) {
    const stanzas = [];
    let cur = [];
    for (const line of lines) {
        if (line === "") {
            if (cur.length)
                stanzas.push(cur);
            cur = [];
        }
        else {
            cur.push(line);
        }
    }
    if (cur.length)
        stanzas.push(cur);
    return stanzas;
}
/**
 * Beat promotion: when 3+ unstressed syllables pile up before a stress
 * ("in the FOR-ests OF the NIGHT"), a function word has swallowed a beat.
 * Deterministic repair: move the stress one seat earlier (the preposition is
 * promoted, the noun's first syllable demoted) — the standard scansion move.
 */
function promoteBeats(pattern) {
    const out = pattern.split("");
    for (let i = 3; i < pattern.length; i++) {
        if (pattern[i] === "/" && pattern[i - 1] === "x" && pattern[i - 2] === "x" && pattern[i - 3] === "x") {
            out[i - 2] = "/";
            out[i] = "x";
        }
    }
    return out.join("");
}
function scanLine(line) {
    const rawWords = line.split(/\s+/).filter(Boolean);
    const words = rawWords.map(cleanWord).filter(Boolean);
    let pattern = "";
    let syllables = 0;
    for (const w of words) {
        pattern += stressOf(w);
        syllables += countSyllables(w);
    }
    pattern = promoteBeats(pattern);
    // per-family best candidates within tolerance of the overall best
    const { all, best } = pattern.length >= 3 ? classifyPattern(pattern) : { all: [], best: null };
    const fitOf = (c) => Math.max(0, 1 - c.cost / Math.max(pattern.length, 1));
    let alts;
    if (best) {
        const families = new Map();
        for (const c of all) {
            if (c.cost > best.cost + 1 || c.cost > Math.max(2, Math.ceil(pattern.length / 3)))
                continue;
            const cur = families.get(c.family);
            if (!cur || c.cost < cur.cost || (c.cost === cur.cost && c.family === "iambic")) {
                families.set(c.family, c);
            }
        }
        alts = Array.from(families.entries())
            .filter(([f]) => f !== best.family)
            .map(([f, c]) => ({ foot: f, feet: c.beats, fit: fitOf(c) }));
        if (!alts.length)
            alts = undefined;
    }
    return {
        line,
        syllables,
        pattern,
        foot: best ? best.family : null,
        feet: best ? best.beats : null,
        lineName: best && NAMES[best.beats] ? `${best.family} ${NAMES[best.beats]}` : null,
        fit: best ? fitOf(best) : 0,
        words: rawWords.length,
        alts,
    };
}
const FREE_VERSE_SHARE = 0.5; // below this weighted share: no dominant family
const REGULAR_SHARE = 0.7; // at/above this: the metre is "regular"
function declinedResult(kind, steps) {
    return {
        ok: false, declined: kind, verdict: "declined", family: null, metre: null,
        label: null, stanzas: [], lineCount: 0, syllableTotal: 0, rhymeScheme: null,
        confidence: 0, steps, notes: [],
    };
}
/**
 * Scan a poem: full per-line breakdown + dominant-metre verdict.
 * Declines: empty input, fewer than 2 verse lines ("too_short"),
 * prose-like input (average > 15 words/line or any line > 25 words).
 * Poems whose lines fit no foot family report "free_verse" honestly.
 */
export function scanEnglishPoem(text) {
    const notes = [];
    if (!text || !text.trim()) {
        return declinedResult("empty", ["Decline: no text supplied to scan."]);
    }
    const rawLines = tidyText(text);
    const verseLines = rawLines.filter((l) => l !== "");
    if (verseLines.length < 2) {
        return declinedResult("too_short", ["Decline: a metre verdict needs at least 2 verse lines; got " + verseLines.length + "."]);
    }
    const wordCounts = verseLines.map((l) => l.split(/\s+/).filter(Boolean).length);
    const avgWords = wordCounts.reduce((s, n) => s + n, 0) / wordCounts.length;
    const maxWords = Math.max(...wordCounts);
    if (avgWords > 15 || maxWords > 25) {
        return declinedResult("prose_like", [
            "Decline: input reads as prose (average " + avgWords.toFixed(1) +
                " words/line, longest line " + maxWords +
                " words), so stress-scanning would be meaningless.",
        ]);
    }
    const stanzaTexts = splitStanzas(rawLines);
    const stanzas = stanzaTexts.map((lines) => ({ lines: lines.map(scanLine), rhyme: "" }));
    const allLines = stanzas.flatMap((s) => s.lines);
    const syllableTotal = allLines.reduce((s, l) => s + l.syllables, 0);
    stanzaTexts.forEach((_, i) => {
        const wordsPerLine = stanzaTexts[i].map((l) => l.split(/\s+/).map(cleanWord).filter(Boolean));
        stanzas[i].rhyme = rhymeScheme(wordsPerLine);
    });
    const rhymeJoined = stanzas.map((s) => s.rhyme).join(" / ");
    // ── two-pass family resolution ──
    // Pass 1: only lines whose best reading beats every alternative family by a
    // full cost unit ("strict" lines) vote, weighted by fit.
    // Pass 2: ambiguous lines resolve to the poem's dominant family when one of
    // their alternatives matches; per-line fields are rewritten accordingly.
    const strict = [];
    for (const l of allLines) {
        if (!l.foot)
            continue;
        const worstAlt = l.alts && l.alts.length ? Math.min(...l.alts.map((a) => 1 - a.fit)) : Infinity;
        const bestCost = 1 - l.fit;
        if (worstAlt - bestCost >= 0.5)
            strict.push({ l, foot: l.foot, fit: l.fit });
    }
    // the strict vote only drives ambiguity resolution; the reported family is
    // recomputed from the full tally after resolution
    const resolveVote = {};
    for (const s of strict) {
        resolveVote[s.foot] = (resolveVote[s.foot] ?? 0) + s.fit * (s.foot === "iambic" ? 1.001 : 1);
    }
    let resolveFamily = null;
    let resolveBest = -1;
    for (const [f, v] of Object.entries(resolveVote)) {
        if (v > resolveBest) {
            resolveFamily = f;
            resolveBest = v;
        }
    }
    if (resolveFamily) {
        for (const l of allLines) {
            if (!l.foot || !l.alts || !l.alts.length)
                continue;
            const match = l.alts.find((a) => a.foot === resolveFamily);
            if (match) {
                l.foot = resolveFamily;
                l.feet = match.feet;
                l.fit = match.fit;
                l.lineName = NAMES[match.feet] ? `${resolveFamily} ${NAMES[match.feet]}` : null;
            }
        }
    }
    // final tally over all (resolved) lines
    const tally = {};
    for (const l of allLines) {
        if (!l.foot)
            continue;
        if (!tally[l.foot])
            tally[l.foot] = { n: 0, fitSum: 0 };
        tally[l.foot].n++;
        tally[l.foot].fitSum += l.fit;
    }
    let family = null;
    let familyScore = -1;
    for (const [f, t] of Object.entries(tally)) {
        const score = t.fitSum * (f === "iambic" ? 1.001 : 1);
        if (score > familyScore) {
            family = f;
            familyScore = score;
        }
    }
    const share = family && tally[family] ? tally[family].n / allLines.length : 0;
    const avgFit = family && tally[family] ? tally[family].fitSum / tally[family].n : 0;
    // feet range among dominant-family lines, with the dominant count first
    let metre = null;
    if (family) {
        const famLines = allLines.filter((l) => l.foot === family);
        const counts = {};
        for (const l of famLines)
            counts[l.feet] = (counts[l.feet] ?? 0) + 1;
        const feetSet = Object.keys(counts).map(Number).sort((a, b) => counts[b] - counts[a]);
        if (feetSet.length) {
            const dom = feetSet[0];
            const others = feetSet.slice(1).sort((a, b) => a - b);
            const nameList = (arr) => {
                const ns = arr.map((f) => NAMES[f] ?? String(f));
                return ns.length <= 1
                    ? ns.join("")
                    : ns.slice(0, -1).join(", ") + " and " + ns[ns.length - 1];
            };
            metre =
                others.length === 0
                    ? NAMES[dom] ?? String(dom)
                    : (NAMES[dom] ?? String(dom)) + " (with " + nameList(others) + " lines)";
        }
    }
    let verdict;
    let label = null;
    let confidence = 0;
    // free verse signals: no dominant family, wildly varying line lengths, or
    // long-line verse (Whitman tradition: average 11+ syllables with variation)
    const syls = allLines.map((l) => l.syllables);
    const sylRange = Math.max(...syls) - Math.min(...syls);
    const avgSyl = syls.reduce((s, n) => s + n, 0) / syls.length;
    const wildRange = (sylRange >= 8 && share < 0.85) || (avgSyl >= 11 && sylRange >= 6);
    if (!family || share < FREE_VERSE_SHARE || wildRange) {
        verdict = "free_verse";
        if (avgSyl >= 11 && sylRange >= 6) {
            notes.push("Long, varied lines (average " + avgSyl.toFixed(1) + " syllables, range " +
                Math.min(...syls) + "\u2013" + Math.max(...syls) +
                ") with waves of unstressed syllables — scanned as free verse; any foot reading would overstate the regularity.");
        }
        else if (wildRange) {
            notes.push("Line lengths vary widely (" + Math.min(...syls) + "\u2013" + Math.max(...syls) +
                " syllables) with no stable foot — characteristic of free verse.");
        }
        else {
            notes.push("No foot family covers \u226550% of lines; reported as free verse / irregular rather than forcing a metre.");
        }
    }
    else {
        verdict = share >= REGULAR_SHARE ? "regular_meter" : "mixed_meter";
        label = family + (metre ? " " + metre : "");
        confidence = Math.round(share * (0.6 + 0.4 * avgFit) * 100) / 100;
    }
    // steps — contract spirit: method → substitution/evidence → verification → interpretation
    const steps = [];
    steps.push("Rule: English metre = repeating stressed/unstressed syllable feet per line — iamb x/, trochee /x, anapest xx/, dactyl /xx; the foot count names the line (2 dimeter, 3 trimeter, 4 tetrameter, 5 pentameter).");
    steps.push("Syllable rule: irregular-word dictionary first, then vowel groups with silent-e / -le / -ed / -es / hiatus repairs. Stress rule: function words unstressed; content words via suffix shift rules (-ic/-ion/-ity/-ify…) plus scansion overrides.");
    for (const l of allLines.slice(0, 12)) {
        steps.push("Line \u201C" + l.line + "\u201D \u2192 " + l.syllables + " syllables \u2192 pattern " +
            (l.pattern || "?") + " \u2192 " + (l.lineName ?? "no foot within tolerance") +
            (l.lineName && l.fit < 1 ? " (fit " + l.fit.toFixed(2) + ")" : ""));
    }
    if (allLines.length > 12) {
        steps.push("… " + (allLines.length - 12) + " more lines scanned the same way (full breakdown in stanzas).");
    }
    steps.push("Verification: " + (family ? tally[family].n : 0) + "/" + allLines.length +
        " lines align to " + (family ?? "no single family") + " (share " + (share * 100).toFixed(0) +
        "%, average template fit " + avgFit.toFixed(2) + "); per-stanza spelling rhyme (approximate): " +
        rhymeJoined + ".");
    steps.push(verdict === "free_verse"
        ? "Interpretation: line lengths and stress patterns vary beyond one repeating foot — this scans as free verse, and the honest answer is that no metre is claimed."
        : "Interpretation: dominant pattern is " + label + " — the poem keeps this pulse across " +
            (verdict === "regular_meter" ? "nearly all" : "most") + " lines (confidence " +
            confidence.toFixed(2) + "); deviations are normal substitutions, not errors.");
    return {
        ok: true,
        declined: null,
        verdict,
        family,
        metre,
        label,
        stanzas,
        lineCount: allLines.length,
        syllableTotal,
        rhymeScheme: rhymeJoined,
        confidence,
        steps,
        notes,
    };
}
