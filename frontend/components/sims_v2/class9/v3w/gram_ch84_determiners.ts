import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c9_gram_ch84 The Invisible Marks (determiners — board set).
 * Node: c9_gram_cbse_84_001. */
export const c9_gram_ch84: SimDef = {
    id: 'v3w_c9_gram_ch84',
    title: 'The Invisible Marks',
    subtitle: 'a/an/the by the algorithm, a-vs-an by sound, and the "a" that flips few into a few',
    classLevel: 9, subject: 'english-grammar', topic: 'Determiners — the board set',
    chapters: ['c9_gram_ch84'],
    nodeIds: ['c9_gram_cbse_84_001'],
    emoji: '🔬', theme: { bg: 'from-slate-900 to-rose-950', accent: 'rose', scene: 'senior' },

    scenario: {
        role: 'a proofreader paid a mark for every small word — the ones everyone else skips',
        intro: 'Determiners are the smallest words on the page and the cheapest marks to lose. The good news: articles run on an algorithm and quantifiers run on countability + attitude.',
        goal: 'Run the specificity algorithm, the sound rule for a/an, and the count-mass plus attitude axes for quantifiers.',
    },
    discovery: {
        question: '"___ honesty is the best policy." — a, an, the, or nothing?',
        options: [
            'nothing — abstract nouns used generically take zero article',
            'the — honesty is a specific virtue',
            'an — honesty starts with a vowel sound',
            'a — it introduces the concept',
        ],
        answer: 'nothing — abstract nouns used generically take zero article',
        hook: 'Over-specification is the silent error — "the honesty" points at a WHICH that does not exist.',
    },
    teaching: [
        { title: 'The algorithm', text: 'Q1: does the listener know WHICH one? → the. Q2: new + singular countable? → a/an by SOUND. Otherwise → zero.', emoji: '🤖', bgColor: 'from-rose-500 to-pink-600' },
        { title: 'The attitude pair', text: 'few = almost none (bad news). a few = some (good news). Countables take few/many; masses take little/much.', emoji: '⚗️', bgColor: 'from-pink-500 to-fuchsia-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c9_gram_cbse_84_001', title: 'Run the algorithm',
          scaffold: {
            problem: '"She goes to ___ school by bus" vs "The parents met at ___ school."',
            steps: [
                { text: 'First: school-as-purpose (to study) → zero article.' },
                { text: 'Second: the building, a specific place → "the".' },
                { text: 'Institutions-as-purpose drop the: school, hospital, church, bed.', faded: true },
                { text: 'You: "He is in ___ hospital (as a patient)." → ', blankAnswer: 'zero article' },
            ],
          } },
        { type: 'dissect', nodeId: 'c9_gram_cbse_84_001', title: 'The sound rule',
          dissect: { specimen: 'a vs an — by ear, not by eye',
          spots: [
            { id: 's1', label: 'European', prompt: '"___ European" — a or an?', answer: 'a — European starts with a yoo- consonant SOUND', options: ['a — European starts with a yoo- consonant SOUND', 'an — E is a vowel letter', 'the — Europe is a place', 'zero — names need none'] },
            { id: 's2', label: 'honest', prompt: '"___ honest man" — a or an?', answer: 'an — the h is silent; vowel sound', options: ['an — the h is silent; vowel sound', 'a — h is a consonant', 'the — honest is an adjective', 'zero'] },
            { id: 's3', label: 'M.A.', prompt: '"___ M.A. student" — a or an?', answer: 'an — the letter name starts with a vowel sound (em-)', options: ['an — the letter name starts with a vowel sound (em-)', 'a — M is consonant', 'the — degrees take the', 'zero'] },
          ] } },
        { type: 'case', nodeId: 'c9_gram_cbse_84_001', title: 'Good news or bad?',
          caseStudy: {
            intro: '"He has few friends" and "He has a few friends" — the "a" flips the entire mood.',
            decisions: [
              { prompt: '"He has ___ friends, so he is always lonely."', options: [
                  { text: 'few — the loneliness clue demands the negative reading', outcome: 'Correct — bare "few" = almost none, matching the lonely consequence.' },
                  { text: 'a few — he has some', outcome: 'Contradicts the clue — if he had some friends, why lonely? The "a" flips scarcity to sufficiency.', reveals: 'few-afew-blind' },
                ] },
              { prompt: '"There were ___ students today." less or fewer?', options: [
                  { text: 'fewer — students are countable', outcome: 'Correct — less is for mass nouns only.' },
                  { text: 'less — it is a small number', outcome: '"Less" measures mass nouns; countables take "fewer" — supermarket signs get this wrong, boards do not.', reveals: 'count-mass-blind' },
                ] },
            ],
          } },
        { type: 'drill', nodeId: 'c9_gram_cbse_84_001', title: 'Article speed round', drill: { kind: 'fill', count: 4, level: 4 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c9_gram_cbse_84_001', difficulty: 'foundation',
          question: '"___ European union" — a or an?',
          options: [
              { text: 'a — "European" starts with a yoo- consonant sound' },
              { text: 'an — E is a vowel letter', reveals: 'letter-match' },
          ],
          answer: 'a — "European" starts with a yoo- consonant sound',
          remediations: {
              'letter-match': { steps: ['Say the word aloud — sound decides, not spelling.', 'yoo-sounds → a (a university, a European); silent h → an (an hour, an honest man).'] },
          },
          hint: 'Say it aloud.',
          misconception: 'students apply a/an to letters instead of sounds — the most-tested determiner trap' },
        { type: 'mcq', nodeId: 'c9_gram_cbse_84_001', difficulty: 'standard',
          question: '"He has ___ friends, so he feels lonely."',
          options: [
              { text: 'few — "lonely" signals the negative reading (almost none)' },
              { text: 'a few — he has some friends', reveals: 'few-afew-blind' },
              { text: 'the few — collect his small set', reveals: 'the-few-misfire' },
          ],
          answer: 'few — "lonely" signals the negative reading (almost none)',
          remediations: {
              'few-afew-blind': { steps: ['few = almost none (bad news); a few = some (good news).', 'The context clue "lonely" tells you which mood the sentence needs.', 'The "a" is not decoration — it flips scarcity into sufficiency.'] },
              'the-few-misfire': { steps: ['"the few" = all of a scarce set — here the clause reports a lack, not a surviving set.'] },
          },
          hint: 'Is the news good or bad? Read "lonely".',
          misconception: 'students read few/a few as interchangeable spellings — missing the attitude the "a" carries' },
        { type: 'mcq', nodeId: 'c9_gram_cbse_84_001', difficulty: 'standard',
          question: 'Fix: "Less students attended the match today."',
          options: [
              { text: 'Fewer students — countables take fewer' },
              { text: 'Correct as written', reveals: 'count-mass-blind' },
              { text: 'Lesser students — comparative needed', reveals: 'lesser-trap' },
          ],
          answer: 'Fewer students — countables take fewer',
          remediations: {
              'count-mass-blind': { steps: ['Partition nouns: count (students, books) vs mass (water, time).', 'few/fewer/many → count; little/less/much → mass.'] },
              'lesser-trap': { steps: ['"lesser" means minor/inferior (a lesser evil) — it is not little\'s comparative for counts.', 'little → less → least for mass; few → fewer → fewest for count.'] },
          },
          hint: 'Can you count students?',
          misconception: 'students use "less" for countables — the count/mass partition is missing' },
        { type: 'sort', nodeId: 'c9_gram_cbse_84_001', difficulty: 'foundation',
          question: 'Sort the quantifiers by which family they govern:',
          sortItems: [
              { id: 'a', label: 'few', emoji: '🧮', correctBin: 'count' },
              { id: 'b', label: 'little', emoji: '💧', correctBin: 'mass' },
              { id: 'c', label: 'many', emoji: '🔢', correctBin: 'count' },
              { id: 'd', label: 'much', emoji: '🌊', correctBin: 'mass' },
              { id: 'e', label: 'fewer', emoji: '📉', correctBin: 'count' },
              { id: 'f', label: 'less', emoji: '📊', correctBin: 'mass' },
          ],
          bins: [
              { id: 'count', label: 'COUNTABLES', color: '#22c55e' },
              { id: 'mass', label: 'UNCOUNTABLES', color: '#3b82f6' },
          ],
          hint: 'few/many/fewer count things; little/much/less measure stuff.',
          misconception: 'count/mass families mixed — "less students" is the classic board error' },
        { type: 'subpart', nodeId: 'c9_gram_cbse_84_001', difficulty: 'advanced',
          question: '"___ honesty is ___ best policy." — run the algorithm on both blanks.',
          hint: 'Q1 first: is there a WHICH to point at?',
          misconception: 'over-specifies — marks every noun as needing an article',
          parts: [
              { id: 'a', prompt: 'First blank — honesty used generically?',
                answer: 'zero article — abstract concept, no specific "which"',
                options: ['zero article — abstract concept, no specific "which"', 'the', 'an'],
                hint: 'There is no "which honesty" to point at.',
                misconception: 'over-specification' },
              { id: 'b', prompt: 'Second blank — "best" is a superlative, so…',
                answer: 'the — superlatives take "the"',
                options: ['the — superlatives take "the"', 'zero — consistency', 'a — one of many bests'],
                hint: 'Fixed pattern: the best, the tallest, the only.',
                misconception: 'superlative-the missed' },
          ] },
    ],

    reflect: { prompts: ['Which trap caught you — yoo-sound or the few/a-few mood flip?', 'What does "the few" mean that "a few" does not?'] },
    successLine: 'The invisible words are visible to you now — every article earned.',
    tryAgainLine: 'Specific? Countable? Attitude? Run the checks before the word.',
};
