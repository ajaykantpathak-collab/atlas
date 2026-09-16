import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c6_gram_ch80 The Sentence Lab (subject/predicate, 4 types, word order).
 * Nodes: c6_gram_cbse_80_001, 80_002, 80_003. */
export const c6_gram_ch80: SimDef = {
    id: 'v3_c6_gram_ch80',
    title: 'The Sentence Lab',
    subtitle: 'Every sentence needs two parts — learn to find them, name the four sentence jobs, and unscramble word order',
    classLevel: 6, subject: 'english-grammar', topic: 'The sentence — parts and types',
    chapters: ['c6_gram_ch80'],
    nodeIds: ['c6_gram_cbse_80_001', 'c6_gram_cbse_80_002', 'c6_gram_cbse_80_003'],
    emoji: '🧪', theme: { bg: 'from-slate-900 to-sky-950', accent: 'sky', scene: 'junior' },

    scenario: {
        role: 'a word scientist who repairs broken sentences',
        intro: 'Some word-groups look like sentences but are missing a piece — a who or a what-happened. Your job: find what each group needs.',
        goal: 'Split sentences into subject and predicate, name the four sentence types, and rebuild jumbled words in the right order.',
    },
    discovery: {
        question: '"Under the bed." — is this a sentence?',
        options: [
            'No — nothing happens and nobody does anything; it is a phrase',
            'Yes — it has two words',
            'Yes — it ends with a full stop',
            'No — it needs a capital letter',
        ],
        answer: 'No — nothing happens and nobody does anything; it is a phrase',
        hook: 'A sentence must answer WHO or WHAT, plus WHAT HAPPENED. "Under the bed" answers neither.',
    },
    teaching: [
        { title: 'The two halves', text: 'Subject = who or what. Predicate = does or is what. "The little boy / ran home."', emoji: '✂️', bgColor: 'from-sky-500 to-blue-600' },
        { title: 'Four jobs, four names', text: 'Tells = declarative. Asks = interrogative. Commands = imperative. Exclaims = exclamatory.', emoji: '🎭', bgColor: 'from-blue-500 to-indigo-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c6_gram_cbse_80_001', title: 'Split the sentence',
          scaffold: {
            problem: '"The tall girl with red ribbons skipped to school." — where is the split?',
            steps: [
                { text: 'Find the verb — the action word: "skipped".' },
                { text: 'Ask "who skipped?" → the whole front part is the subject.' },
                { text: 'Subject: "The tall girl with red ribbons". Predicate: "skipped to school".', faded: true },
                { text: 'You try: "My best friend plays cricket." The subject is ___', blankAnswer: 'My best friend' },
            ],
          } },
        { type: 'dissect', nodeId: 'c6_gram_cbse_80_002', title: 'Name the job',
          dissect: { specimen: 'four sentences, four jobs',
          spots: [
            { id: 's1', label: 'telling', prompt: '"You scored a goal." — which type?', answer: 'declarative — it states a fact', options: ['declarative — it states a fact', 'interrogative', 'imperative', 'exclamatory'] },
            { id: 's2', label: 'asking', prompt: '"Did you score a goal?" — which type?', answer: 'interrogative — it asks', options: ['interrogative — it asks', 'declarative', 'imperative', 'exclamatory'] },
            { id: 's3', label: 'exclaiming', prompt: '"What a goal!" — careful, it has "what" but…?', answer: 'exclamatory — it exclaims; "what" here shows excitement, not a question', options: ['exclamatory — it exclaims; "what" here shows excitement, not a question', 'interrogative — it starts with what', 'imperative', 'declarative'] },
          ] } },
        { type: 'build', nodeId: 'c6_gram_cbse_80_003', title: 'Unscramble',
          build: {
            prompt: 'Order the words into a sentence: "school / to / goes / Meena / every day"',
            blocks: ['school', 'to', 'goes', 'Meena', 'every day'],
            answer: 'Meena goes to school every day',
          } },
        { type: 'drill', nodeId: 'c6_gram_cbse_80_002', title: 'Sentence-type speed round', drill: { kind: 'fill', count: 4, level: 2 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c6_gram_cbse_80_001', difficulty: 'foundation',
          question: '"Because it was raining very hard." — sentence or fragment?',
          options: [
              { text: 'Fragment — "because" makes it lean on a main part that is missing' },
              { text: 'Sentence — it is long enough', reveals: 'length-test' },
              { text: 'Sentence — it has a verb', reveals: 'verb-only-test' },
          ],
          answer: 'Fragment — "because" makes it lean on a main part that is missing',
          remediations: {
              'length-test': { steps: ['Length is not the test — completeness is.', '"Because…" always needs a partner clause. Alone it is a fragment.'] },
              'verb-only-test': { steps: ['A verb alone is not enough — "because" subordinates the whole clause.', 'A fragment can contain a verb yet still not stand alone.'] },
          },
          hint: 'Does it feel finished, or is it waiting for the rest?',
          misconception: 'students count words, not completeness — length does not make a sentence' },
        { type: 'mcq', nodeId: 'c6_gram_cbse_80_002', difficulty: 'foundation',
          question: 'Classify: "What a beautiful painting this is!"',
          options: [
              { text: 'Exclamatory — it admires, it does not ask' },
              { text: 'Interrogative — it starts with "what"', reveals: 'what-trap' },
              { text: 'Declarative — it states an opinion', reveals: 'flat-read' },
          ],
          answer: 'Exclamatory — it admires, it does not ask',
          remediations: {
              'what-trap': { steps: ['"What/How" can open exclamations too — check the job, not the first word.', 'Questions want answers; exclamations want feelings. "What a day!" wants no answer.'] },
              'flat-read': { steps: ['The exclamation mark and the admiring structure mark it as exclamatory.', 'Ask: telling, asking, ordering, or exclaiming? This one exclaims.'] },
          },
          hint: 'Does it want an answer, or does it want a reaction?',
          misconception: 'students read "what" as question-automatic — the job decides, not the keyword' },
        { type: 'mcq', nodeId: 'c6_gram_cbse_80_003', difficulty: 'standard',
          question: 'Same meaning or different? "Only Ravi ate the mango" vs "Ravi ate only the mango."',
          options: [
              { text: 'Different — "only" attaches to what follows it: nobody else ate vs he ate nothing else' },
              { text: 'Same — the same words always mean the same thing', reveals: 'position-blind' },
          ],
          answer: 'Different — "only" attaches to what follows it: nobody else ate vs he ate nothing else',
          remediations: {
              'position-blind': { steps: ['Word order carries meaning — "only" modifies its neighbour.', 'Test: move "only" and watch who ate what change.'] },
          },
          hint: 'What does "only" sit next to in each sentence?',
          misconception: 'students think "only" floats freely — position changes meaning' },
        { type: 'order', nodeId: 'c6_gram_cbse_80_003', difficulty: 'foundation',
          question: 'Order the reasoning for unscrambling "yesterday / the match / won / our team":',
          sortItems: [
              { id: 's1', label: 'Find the verb: won', emoji: '🔍', correctBin: 'p1' },
              { id: 's2', label: 'Who won? our team → subject first', emoji: '👥', correctBin: 'p2' },
              { id: 's3', label: 'Won what? the match → object', emoji: '🏆', correctBin: 'p3' },
              { id: 's4', label: 'Time word goes last: yesterday', emoji: '🕐', correctBin: 'p4' },
          ],
          bins: [
              { id: 'p1', label: '1', color: '#0ea5e9' },
              { id: 'p2', label: '2', color: '#6366f1' },
              { id: 'p3', label: '3', color: '#8b5cf6' },
              { id: 'p4', label: '4', color: '#22c55e' },
          ],
          hint: 'Verb → who → what → when.',
          misconception: 'students place time-words anywhere without checking the surviving grammar' },
        { type: 'subpart', nodeId: 'c6_gram_cbse_80_001', difficulty: 'standard',
          question: '"Playing in the rain is fun." — hunt the real subject.',
          hint: 'The subject is not always a person.',
          misconception: 'students hunt for a person as subject instead of the whole activity',
          parts: [
              { id: 'a', prompt: 'What is the verb?',
                answer: 'is',
                options: ['is', 'playing', 'rain'],
                hint: 'Which word drives the sentence — the -ing word names the activity, it does not drive.',
                misconception: 'labels any -ing word the verb' },
              { id: 'b', prompt: 'So the subject is…',
                answer: 'Playing in the rain',
                options: ['Playing in the rain', 'rain', 'fun'],
                hint: 'Ask "what IS fun?" — the whole activity answers.',
                misconception: 'cuts the subject at the first noun' },
          ] },
    ],

    reflect: { prompts: ['Which fooled you — "because…" fragments or the "what!" trap?', 'Can you make one idea into all four sentence types?'] },
    successLine: 'You repair sentences like a scientist — subject found, job named, order rebuilt.',
    tryAgainLine: 'Two questions every time: who/what? — does/is what?',
};
