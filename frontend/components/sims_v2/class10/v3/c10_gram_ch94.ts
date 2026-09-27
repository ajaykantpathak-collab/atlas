import type { SimDef } from '../../engine/types';

/** v3 generated — c10_gram_ch94 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_gram_ch94: SimDef = {
    id: 'v3_c10_gram_ch94',
    title: 'Article choice follows a two-question.',
    subtitle: 'Covers the core algorithm and standard exceptions (unique objects: the sun; superlatives.',
    classLevel: 10, subject: 'gram', topic: 'Article choice follows a two-question.',
    chapters: ['c10_gram_ch94'],
    nodeIds: ['c10_gram_cbse_94_001', 'c10_gram_cbse_94_002', 'c10_gram_ch94_003', 'c10_gram_ch94_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'Narrate two sentences: \'I saw a dog. The dog was huge.\' First mention = \'a\' (new information), second = \'the\'.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Article choice follows a two-question.', text: 'Article choice follows a two-question algorithm: (1) Is the noun specific/known to both speaker and listener? → \'the\'. (2) If not, is it singular countable? → \'a/an\' (an before vowel SOUND).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c10_gram_cbse_94_002', title: 'Quantifiers encode attitude: \'few\' =.',
          caseStudy: { intro: 'Two glasses on the desk: \'There is little water\' — bad news, nearly empty. \'There is a little water\' — good news, enough for a sip.',
            decisions: [{ prompt: '\'He has ___ friends, so he is always lonely.\' few or a few?', options: [
                { text: '\'few\' — the loneliness clue signals the negative reading (almost none)', outcome: '\'few\' — the loneliness clue signals the negative reading (almost none).' },
                { text: 'few/a few differ only in style, not attitude', outcome: 'Not quite — Students think few/a few differ only in style, not attitude — missing that \'few\' is pessimistic.', reveals: 'few-a-few-differ-only' }
            ] }] } },
        { type: 'case', nodeId: 'c10_gram_ch94_004', title: 'Demonstratives encode distance —.',
          caseStudy: { intro: '1. Near vs far: \'this room\' (where I am), \'that room\' (over there). Plural: \'these books\' / \'those books\'. 2.',
            decisions: [{ prompt: '\'___ days are gone forever — my childhood summers.\'', options: [
                { text: '\'Those\' — remote past time', outcome: '\'Those\' — remote past time.' },
                { text: 'demonstratives only point at physical objects', outcome: 'Not quite — Students think demonstratives only point at physical objects. The same near/far logic runs on time.', reveals: 'demonstratives-only-point-at-physical' }
            ] }] } },
        { type: 'case', nodeId: 'c10_gram_ch94_004', title: 'Demonstratives encode distance —.',
          caseStudy: { intro: '1. Near vs far: \'this room\' (where I am), \'that room\' (over there). Plural: \'these books\' / \'those books\'. 2.',
            decisions: [{ prompt: '\'___ days are gone forever — my childhood summers.\'', options: [
                { text: '\'Those\' — remote past time', outcome: '\'Those\' — remote past time.' },
                { text: 'demonstratives only point at physical objects', outcome: 'Not quite — Students think demonstratives only point at physical objects. The same near/far logic runs on time.', reveals: 'demonstratives-only-point-at-physical' }
            ] }] } },
        { type: 'dissect', nodeId: 'c10_gram_cbse_94_002', title: 'Identify each idea',
          dissect: { specimen: 'Article choice follows a two-question.', spots: [
            { id: 's1', label: 'Article choice follows a two-question', prompt: 'Which idea is this? — Article choice follows a two-question algorithm: (1) Is the noun specific/known to both.', answer: 'Article choice follows a two-question', options: ['Article choice follows a two-question', 'Quantifiers encode attitude few', 'Distributive determiners carve the group', 'Demonstratives encode distance physical'] },
            { id: 's2', label: 'Quantifiers encode attitude few', prompt: 'Which idea is this? — Quantifiers encode attitude: \'few\' = almost none (negative), \'a few\' = some (positive).', answer: 'Quantifiers encode attitude few', options: ['Quantifiers encode attitude few', 'Article choice follows a two-question', 'Distributive determiners carve the group', 'Demonstratives encode distance physical'] },
            { id: 's3', label: 'Distributive determiners carve the group', prompt: 'Which idea is this? — Distributive determiners carve the group differently: \'each\' distributes to members.', answer: 'Distributive determiners carve the group', options: ['Distributive determiners carve the group', 'Article choice follows a two-question', 'Quantifiers encode attitude few', 'Demonstratives encode distance physical'] },
            { id: 's4', label: 'Demonstratives encode distance physical', prompt: 'Which idea is this? — Demonstratives encode distance — physical and temporal: \'this/these\' mark what is near.', answer: 'Demonstratives encode distance physical', options: ['Demonstratives encode distance physical', 'Article choice follows a two-question', 'Quantifiers encode attitude few', 'Distributive determiners carve the group'] }
          ] } },
        { type: 'case', nodeId: 'c10_gram_ch94_004', title: 'You made it',
          caseStudy: { intro: 'You finished Article choice follows a two-question. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c10_gram_cbse_94_001', difficulty: 'standard',
          question: 'Article choice follows a two-question algorithm: (1) Is the noun specific/known.',
          hint: 'Work step by step.',
          misconception: 'Students choose \'an\' by spelling (writing \'an university\'), use \'the\' for general categories (\'the dogs are faithful.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Article choice follows a two-question algorithm: (1) Is the noun specific/known to both',
                  options: ['Article choice follows a two-question algorithm: (1) Is the noun specific/known to both', 'Quantifiers encode attitude: \'few\' = almost none (negative), \'a few\' = some (positive)', 'Distributive determiners carve the group differently: \'each\' distributes to members', 'Demonstratives encode distance'],
                  hint: 'Recall the definition.',
                  misconception: 'Students choose \'an\' by spelling (writing \'an university\'), use \'the\' for general categories (\'the dogs are faithful animals\' — generic.' }
          ],
            remediations: { 'students-choose-an-by-spelling': { steps: ['Ask \'does the listener know WHICH one?\' → yes: \'the\'.', 'No → is it singular countable? → a/an by SOUND.', 'Plural/uncountable + general → zero.', 'Check fixed patterns — superlatives, unique objects, holy books, rivers.'] } } },
        { type: 'subpart', nodeId: 'c10_gram_cbse_94_002', difficulty: 'standard',
          question: 'Quantifiers encode attitude: \'few\' = almost none (negative), \'a few\' = some.',
          hint: 'Work step by step.',
          misconception: 'Students think few/a few differ only in style, not attitude — missing that \'few\' is pessimistic.',
          parts: [
                { id: 'a', prompt: '\'He has ___ friends, so he is always lonely.\' few or a few?', answer: '\'few\' — the loneliness clue signals the negative reading (almost none)',
                  options: ['\'few\' — the loneliness clue signals the negative reading (almost none)', 'few/a few differ only in style, not attitude'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think few/a few differ only in style, not attitude — missing that \'few\' is pessimistic.' },
                { id: 'b', prompt: 'Correct: \'There were less students today.\'', answer: '\'fewer students\'',
                  options: ['\'fewer students\'', 'few/a few differ only in style, not attitude'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think few/a few differ only in style, not attitude — missing that \'few\' is pessimistic.' },
                { id: 'c', prompt: '\'___ knowledge he had saved him.\' the few / a little / the little?', answer: '\'the little\' — the small amount of knowledge that existed was sufficient',
                  options: ['\'the little\' — the small amount of knowledge that existed was sufficient', 'few/a few differ only in style, not attitude'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think few/a few differ only in style, not attitude — missing that \'few\' is pessimistic.' },
                { id: 'd', prompt: '______ governs the family: few/fewer/many for countables, little/less/much for uncountables, and \'the few/the little\' means \'the small amount that exists\'.', answer: 'Countability',
                  options: ['Countability', 'few/a few differ only in style, not attitude'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think few/a few differ only in style, not attitude — missing that \'few\' is pessimistic.' }
          ],
            remediations: { 'few-a-few-differ-only': { steps: ['Countable or not? → picks the family (few/many vs little/much).', 'Is the news good or bad? → \'a-\' forms mean \'enough to matter\', bare forms mean \'almost none\'.', 'Comparatives — fewer for countables, less for uncountables.'] } } },
        { type: 'subpart', nodeId: 'c10_gram_cbse_94_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think few/a few differ only in style, not attitude — missing that \'few\' is pessimistic.',
          parts: [
                { id: 'a', prompt: 'Fill in the blank: ______ encode attitude: \'few\' = almost none (negative), \'a few\' = some (positive); \'little\' = almost none, \'a little\' = some.', answer: 'Quantifiers',
                  options: ['Quantifiers', 'few/a few differ only in style, not attitude'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think few/a few differ only in style, not attitude — missing that \'few\' is pessimistic.' },
                { id: 'b', prompt: 'Fill in the blank: Two glasses on the desk: \'There is little water\' — bad news, nearly empty. \'There is a little water\' — good news, ______ for a sip.', answer: 'enough',
                  options: ['enough', 'few/a few differ only in style, not attitude'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think few/a few differ only in style, not attitude — missing that \'few\' is pessimistic.' }
          ],
            remediations: { 'few-a-few-differ-only': { steps: ['Countable or not? → picks the family (few/many vs little/much).', 'Is the news good or bad? → \'a-\' forms mean \'enough to matter\', bare forms mean \'almost none\'.', 'Comparatives — fewer for countables, less for uncountables.'] } } },
        { type: 'subpart', nodeId: 'c10_gram_ch94_003', difficulty: 'standard',
          question: 'Distributive determiners carve the group differently: \'each\' distributes.',
          hint: 'Work step by step.',
          misconception: 'Students treat each/every/all as stylistic synonyms. The grammar differs — \'each of\', singular verbs for each/every.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Distributive determiners carve the group differently: \'each\' distributes to members',
                  options: ['Distributive determiners carve the group differently: \'each\' distributes to members', 'Article choice follows a two-question algorithm: (1) Is the noun specific/known to both', 'Quantifiers encode attitude: \'few\' = almost none (negative), \'a few\' = some (positive)', 'Demonstratives encode distance'],
                  hint: 'Recall the definition.',
                  misconception: 'Students treat each/every/all as stylistic synonyms. The grammar differs — \'each of\', singular verbs for each/every, \'both\' capped at two.' }
          ],
            remediations: { 'students-treat-each-every-all': { steps: ['Ask how the sentence distributes — one at a time (each), the whole via members (every), the totality (all), or exactly.', 'Then fix agreement: each/every singular, all/both plural (or mass singular).'] } } },
        { type: 'subpart', nodeId: 'c10_gram_ch94_004', difficulty: 'standard',
          question: 'Demonstratives encode distance — physical and temporal: \'this/these\' mark what.',
          hint: 'Work step by step.',
          misconception: 'Students think demonstratives only point at physical objects. The same near/far logic runs on time (\'these days\'.',
          parts: [
                { id: 'a', prompt: '\'___ days are gone forever — my childhood summers.\'', answer: '\'Those\' — remote past time',
                  options: ['\'Those\' — remote past time', 'demonstratives only point at physical objects'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think demonstratives only point at physical objects. The same near/far logic runs on time (\'these days\' vs \'those days\') and.' },
                { id: 'b', prompt: '\'___ is what I meant earlier\' — pointing at the thing just said.', answer: '\'This\' — current/just-mentioned reference',
                  options: ['\'This\' — current/just-mentioned reference', 'demonstratives only point at physical objects'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think demonstratives only point at physical objects. The same near/far logic runs on time (\'these days\' vs \'those days\') and.' },
                { id: 'c', prompt: '\'___ house across the road is new\' vs \'___ room is where I sleep.\'', answer: '\'That\' (far) vs \'this\' (near)',
                  options: ['\'That\' (far) vs \'this\' (near)', 'demonstratives only point at physical objects'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think demonstratives only point at physical objects. The same near/far logic runs on time (\'these days\' vs \'those days\') and.' },
                { id: 'd', prompt: '\'In ___ days, letters took a week to arrive\' — looking back.', answer: '\'those\' — remote time marker',
                  options: ['\'those\' — remote time marker', 'demonstratives only point at physical objects'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think demonstratives only point at physical objects. The same near/far logic runs on time (\'these days\' vs \'those days\') and.' }
          ],
            remediations: { 'demonstratives-only-point-at-physical': { steps: ['Ask \'near or far\' in three dimensions: space (this room/that room), time (this week/that week), discourse (this idea.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
