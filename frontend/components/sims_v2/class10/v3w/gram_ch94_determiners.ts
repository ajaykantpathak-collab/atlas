import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c10_gram_ch94 Small Words, Big Marks (determiners).
 * Nodes: c10_gram_cbse_94_001 (articles), 94_002 (quantifiers). */
export const c10_gram_ch94: SimDef = {
    id: 'v3_c10_gram_ch94',
    title: 'Small Words, Big Marks',
    subtitle: 'a/an/the/zero is an algorithm, and the "a" in "a few" flips scarcity into sufficiency',
    classLevel: 10, subject: 'english-grammar', topic: 'Articles and quantifiers',
    chapters: ['c10_gram_ch94'],
    nodeIds: ['c10_gram_cbse_94_001', 'c10_gram_cbse_94_002'],
    emoji: '🔬', theme: { bg: 'from-slate-900 to-rose-950', accent: 'rose', scene: 'senior' },

    scenario: {
        role: 'a copy-editor who loses a mark for every wrong article — the smallest words on the page',
        intro: 'Boards know these words look invisible, so they hide a mark inside each one. The good news: articles run on a two-question algorithm, and quantifiers run on attitude.',
        goal: 'Run the specificity algorithm on any noun phrase — then master the few/a few attitude flip that boards test every single year.',
    },
    discovery: {
        question: '"I saw a dog. ___ dog was huge." — which article fills the second mention?',
        options: [
            'the — now we both know WHICH dog',
            'a — it is still just one dog',
            'no article — already mentioned once',
            'an — dog starts with a vowel sound in speech',
        ],
        answer: 'the — now we both know WHICH dog',
        hook: 'That one sentence pair IS the algorithm: a/an introduces, the points back at shared knowledge.',
    },
    teaching: [
        { title: 'The algorithm', text: 'Q1: does the listener know WHICH one? → the. Q2: no → singular countable? → a/an by SOUND. Otherwise → zero.', emoji: '🤖', bgColor: 'from-rose-500 to-pink-600' },
        { title: 'The attitude quantifiers', text: 'few = almost none (bad news). a few = some (good news). Same quantity, opposite mood — the "a" is the whole difference.', emoji: '⚗️', bgColor: 'from-pink-500 to-fuchsia-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c10_gram_cbse_94_001', title: 'Run the algorithm',
          scaffold: {
            problem: 'Fill: "___ honesty is the best policy."',
            steps: [
                { text: 'Q1: does the listener know which honesty? No — it is the concept itself.' },
                { text: 'Q2: singular countable? No — abstract uncountable.' },
                { text: 'Therefore: zero article — "Honesty is the best policy."', faded: true },
                { text: 'You: "___ Ganga is a holy river." → ', blankAnswer: 'The' },
            ],
          } },
        { type: 'dissect', nodeId: 'c10_gram_cbse_94_001', title: 'The an-trap: sound, not spelling',
          dissect: { specimen: 'a vs an',
          spots: [
            { id: 's1', label: 'hour', prompt: '"an hour" — why an when h is a consonant?', answer: 'the h is silent — an follows SOUND, and hour starts with a vowel sound', options: ['the h is silent — an follows SOUND, and hour starts with a vowel sound', 'hour is special-cased', 'an comes before all time words', 'h is always silent'] },
            { id: 's2', label: 'university', prompt: '"a university" — why a when u is a vowel?', answer: 'it starts with a yoo- consonant SOUND — sound, not spelling', options: ['it starts with a yoo- consonant SOUND — sound, not spelling', 'u is not always a vowel', 'long words take a', 'universities are uncountable'] },
            { id: 's3', label: 'school', prompt: '"She goes to school" (zero) vs "met at the school" (the) — what changes?', answer: 'school-as-purpose drops the; the building keeps it', options: ['school-as-purpose drops the; the building keeps it', 'first is informal', 'the is always optional', 'she is a student so no article'] },
          ] } },
        { type: 'case', nodeId: 'c10_gram_cbse_94_002', title: 'Good news or bad news?',
          caseStudy: {
            intro: 'Two glasses of water: "There is little water" vs "There is a little water." Same quantity — the a flips the mood.',
            decisions: [
              { prompt: '"He has ___ friends, so he is always lonely." Which fits?', options: [
                  { text: 'few — the loneliness clue demands the negative reading (almost none)', outcome: 'Correct — context says the news is bad, so bare "few".' },
                  { text: 'a few — some friends exist', outcome: 'Contradicts the clue — if he had some friends, why is he lonely? The "a" flips scarcity to sufficiency.', reveals: 'few-afew-blind' },
                ] },
              { prompt: '"___ knowledge he had saved him." — the few / a little / the little?', options: [
                  { text: 'the little — the whole scarce supply was enough', outcome: 'Correct — "the little" collects ALL of the scarce set; that is what saved him.' },
                  { text: 'a little — he had some knowledge', outcome: 'Weak — "a little" means merely some; the sentence claims his entire small stock rescued him.', reveals: 'the-little-blind' },
                ] },
            ],
          } },
        { type: 'drill', nodeId: 'c10_gram_cbse_94_001', title: 'Article speed round', drill: { kind: 'fill', count: 4, level: 4 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c10_gram_cbse_94_001', difficulty: 'standard',
          question: '"___ honesty is the best policy."',
          options: [
              { text: 'zero article — abstract uncountable used generically' },
              { text: 'the — honesty is a specific virtue', reveals: 'over-specify' },
              { text: 'an — honesty starts with a vowel', reveals: 'an-spelling' },
          ],
          answer: 'zero article — abstract uncountable used generically',
          remediations: {
              'over-specify': { steps: ['Abstract nouns used generically take NO article — honesty, courage, education.', 'The marks shared knowledge; there is no "which honesty" to point at.', 'Hindi lets abstract nouns take determiners differently — do not translate the article.'] },
              'an-spelling': { steps: ['Before reaching for a/an, run Q1 first — specificity comes before the a/an decision.', 'And "an" needs singular countable anyway — honesty is uncountable.'] },
          },
          hint: 'Does "which honesty?" even make sense?',
          misconception: 'students mark every noun as needing an article — over-specification from L1 transfer' },
        { type: 'mcq', nodeId: 'c10_gram_cbse_94_001', difficulty: 'standard',
          question: 'Choose: "___ European" and "___ honest man".',
          options: [
              { text: 'a European / an honest man — an follows SOUND: yoo- is consonant, h is silent' },
              { text: 'an European / a honest man — match the spelling', reveals: 'an-spelling' },
              { text: 'a European / a honest man — both start with consonant letters', reveals: 'an-spelling' },
          ],
          answer: 'a European / an honest man — an follows SOUND: yoo- is consonant, h is silent',
          remediations: {
              'an-spelling': { steps: ['Say the word aloud — an listens to sound, not letters.', 'yoo-sounds → a (a university, a European); silent h → an (an hour, an honest).', 'Letter-initials: an M.A., an S.P. — the letter names start with vowel sounds.'] },
          },
          hint: 'Say "university" aloud — what is the first sound?',
          misconception: 'students apply a/an to spelling, not pronunciation — the most-tested determiner trap' },
        { type: 'mcq', nodeId: 'c10_gram_cbse_94_002', difficulty: 'standard',
          question: 'Correct: "There were less students today."',
          options: [
              { text: 'fewer students — students are countable' },
              { text: 'the sentence is correct as written', reveals: 'count-mass-blind' },
              { text: 'lesser students — comparative form needed', reveals: 'comparative-form' },
          ],
          answer: 'fewer students — students are countable',
          remediations: {
              'count-mass-blind': { steps: ['Split English nouns into count (students, books) vs mass (water, time, money-as-amount).', 'few/fewer/many for countables; little/less/much for mass.', 'Supermarket signs get this wrong — "10 items or less" — but boards do not.'] },
              'comparative-form': { steps: ['"lesser" is not the comparative of little — it means minor/inferior (a lesser evil).', 'little → less → least is the scale for mass nouns only.'] },
          },
          hint: 'Can you count students one by one?',
          misconception: 'students do not partition nouns into count/mass — prerequisite for half the determiner system' },
        { type: 'mcq', nodeId: 'c10_gram_cbse_94_002', difficulty: 'advanced',
          question: '"He has ___ friends, so he is always lonely."',
          options: [
              { text: 'few — the loneliness clue demands the negative reading' },
              { text: 'a few — at least he has some', reveals: 'few-afew-blind' },
              { text: 'the few — collect his small set', reveals: 'the-few-misfire' },
          ],
          answer: 'few — the loneliness clue demands the negative reading',
          remediations: {
              'few-afew-blind': { steps: ['few = almost none (bad news); a few = some (good news).', 'Read the context clue — "so he is lonely" tells you which mood the sentence needs.', 'The "a" is not decoration — it flips scarcity into sufficiency.'] },
              'the-few-misfire': { steps: ['"the few" = all of a scarce set ("the few friends he had visited him"). Here the clause reports a lack, not a set — plain "few".'] },
          },
          hint: 'Is the news good or bad? The clue is "lonely".',
          misconception: 'students read few/a few as interchangeable spellings — missing the attitudinal payload the "a" carries' },
        { type: 'sort', nodeId: 'c10_gram_cbse_94_002', difficulty: 'foundation',
          question: 'Sort the quantifiers by which noun family they govern:',
          sortItems: [
              { id: 'a', label: 'few', emoji: '🧮', correctBin: 'count' },
              { id: 'b', label: 'many', emoji: '🔢', correctBin: 'count' },
              { id: 'c', label: 'little', emoji: '💧', correctBin: 'mass' },
              { id: 'd', label: 'much', emoji: '🌊', correctBin: 'mass' },
              { id: 'e', label: 'fewer', emoji: '📉', correctBin: 'count' },
              { id: 'f', label: 'less', emoji: '📊', correctBin: 'mass' },
          ],
          bins: [
              { id: 'count', label: 'COUNTABLES', color: '#22c55e' },
              { id: 'mass', label: 'UNCOUNTABLES', color: '#3b82f6' },
          ],
          hint: 'few/many/fewer count things; little/much/less measure stuff.',
          misconception: 'students mix the count/mass families — "less students" is the classic board error' },
        { type: 'subpart', nodeId: 'c10_gram_cbse_94_001', difficulty: 'advanced',
          question: '"She goes to ___ school by bus" vs "The parents met at ___ school." — run the algorithm on both.',
      hint: 'Work the parts in order — each answer feeds the next.',
      misconception: 'rushes to the final answer without building the chain',
          parts: [
              { id: 'a', prompt: 'First blank — what does "school" mean here?',
                answer: 'school-as-purpose (to study)',
                options: ['school-as-purpose (to study)', 'the school building', 'a specific school'],
                hint: 'Going to school = going to learn, not to a building.',
                misconception: 'treats all school-mentions as the building' },
              { id: 'b', prompt: 'So the first blank takes…',
                answer: 'zero article',
                options: ['zero article', 'the', 'a'],
                hint: 'Institutions-as-purpose drop the: go to school/hospital/church/bed.',
                misconception: 'over-specifies institutional purpose' },
              { id: 'c', prompt: 'And the second blank?',
                answer: 'the',
                options: ['the', 'zero article', 'a'],
                hint: 'Parents met AT the building — a specific place.',
                misconception: 'drops the where the building is meant' },
          ] },
    ],

    reflect: { prompts: ['The "a" that flips few→a few — can you feel the mood change now?', 'Say "a European" aloud — where is the vowel hiding?'] },
    successLine: 'Copy-editor eyes — you catch the invisible words that cost everyone else marks.',
    tryAgainLine: 'Run the algorithm every time: specific? countable? — then decide.',
};
