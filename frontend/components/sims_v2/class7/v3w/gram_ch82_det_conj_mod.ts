import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c7_gram_ch82 The Logic Words (determiners, subordinators, modifiers).
 * Nodes: c7_gram_cbse_82_001, 82_002, 82_003. */
export const c7_gram_ch82: SimDef = {
    id: 'v3w_c7_gram_ch82',
    title: 'The Logic Words',
    subtitle: 'this-or-that, some-or-any, because-or-although — and the modifiers that must describe the right word',
    classLevel: 7, subject: 'english-grammar', topic: 'Determiners, subordinating conjunctions, adjectives and adverbs',
    chapters: ['c7_gram_ch82'],
    nodeIds: ['c7_gram_cbse_82_001', 'c7_gram_cbse_82_002', 'c7_gram_cbse_82_003'],
    emoji: '🧭', theme: { bg: 'from-slate-900 to-gold-950', accent: 'indigo', scene: 'junior' },

    scenario: {
        role: 'a navigator choosing words by the direction they point',
        intro: 'Every small word points somewhere — near or far, countable or mass, reason or contrast, noun or verb. Point wrong and the sentence tilts.',
        goal: 'Run the distance/countability axes for determiners, the logic map for subordinators, and the modifies-what test for adjectives vs adverbs.',
    },
    discovery: {
        question: '"Would you like SOME tea?" but "There isn\'t ANY milk" — why the switch?',
        options: [
            'some lives in offers/positives; any lives in questions and negatives',
            'tea takes some; milk takes any',
            'any is always wrong in questions',
            'random choice — both work everywhere',
        ],
        answer: 'some lives in offers/positives; any lives in questions and negatives',
        hook: 'Polarity runs the some/any split — and polite offers are a sneaky exception that keeps "some" inside a question.',
    },
    teaching: [
        { title: 'The two axes', text: 'Pointing: this/these = near, that/those = far. Quantity: many/few = countable, much/little = mass.', emoji: '📐', bgColor: 'from-gold-500 to-gold-600' },
        { title: 'The logic map', text: 'because=reason, although=concession, when/while=time, if/unless=condition, until=limit. Dependent clause first → comma follows.', emoji: '🗺️', bgColor: 'from-gold-500 to-purple-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c7_gram_cbse_82_001', title: 'Run the axes',
          scaffold: {
            problem: '"___ shoes here are mine, but ___ over there are yours."',
            steps: [
                { text: 'Near + plural → these. Far + plural → those.' },
                { text: 'Distance axis and number axis decide together.', faded: true },
                { text: 'So: "these shoes here … those over there".', faded: true },
                { text: 'You: "___ book in my hand" (one, near) → ', blankAnswer: 'this' },
            ],
          } },
        { type: 'dissect', nodeId: 'c7_gram_cbse_82_002', title: 'Name the logic',
          dissect: { specimen: 'subordinators at work',
          spots: [
            { id: 's1', label: 'concession', prompt: '"Although it rained, the match continued." — what logic does although carry?', answer: 'concession — yes it rained, BUT anyway the match continued', options: ['concession — yes it rained, BUT anyway the match continued', 'reason — rain caused the match', 'time — two events together', 'condition — rain decided the match'] },
            { id: 's2', label: 'condition', prompt: '"Unless you hurry, you will miss the bus." — what does unless mean?', answer: 'if not — a negative condition', options: ['if not — a negative condition', 'until — a time limit', 'because — a reason', 'although — a contrast'] },
            { id: 's3', label: 'comma', prompt: '"When the bell rang the students rushed out." — what is missing?', answer: 'a comma after the fronted dependent clause: "When the bell rang, …"', options: ['a comma after the fronted dependent clause: "When the bell rang, …"', 'nothing', 'a comma after students', 'a semicolon'] },
          ] } },
        { type: 'case', nodeId: 'c7_gram_cbse_82_003', title: 'Modifies what?',
          caseStudy: {
            intro: 'Adjectives describe nouns; adverbs describe verbs. The trap pairs break the rules.',
            decisions: [
              { prompt: '"She sings beautiful." — fix it.', options: [
                  { text: 'sings beautifully — the word modifies the verb, so it must be an adverb', outcome: 'Correct — the modifies-what test settled it.' },
                  { text: 'sings beautiful is fine — beautiful describes her', outcome: 'The word describes HOW she sings, not who she is — verb-modifiers take adverb form.', reveals: 'modifies-what-blind' },
                ] },
              { prompt: '"He works ___ all day." hard or hardly?', options: [
                  { text: 'hard — works with effort', outcome: 'Correct — hard doubles as its own adverb.' },
                  { text: 'hardly — the -ly marks the adverb', outcome: '"Hardly" means "almost not" — "he hardly works" = almost never works. Trap pair.', reveals: 'hardly-trap' },
                ] },
            ],
          } },
        { type: 'drill', nodeId: 'c7_gram_cbse_82_001', title: 'Some-or-any speed round', drill: { kind: 'fill', count: 4, level: 3 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c7_gram_cbse_82_001', difficulty: 'foundation',
          question: '"___ money do you have?" much or many?',
          options: [
              { text: 'much — money is uncountable' },
              { text: 'many — money is a lot of things', reveals: 'count-mass-blind' },
          ],
          answer: 'much — money is uncountable',
          remediations: {
              'count-mass-blind': { steps: ['Split nouns into countables (books, students) and masses (money, water, time).', 'many/few count things; much/little measure stuff.'] },
          },
          hint: 'Can you count money one-two-three, or only measure it?',
          misconception: 'students use much/many without the count-mass partition' },
        { type: 'mcq', nodeId: 'c7_gram_cbse_82_002', difficulty: 'standard',
          question: '"___ it rained heavily, the match continued." because or although?',
          options: [
              { text: 'although — continuing DESPITE rain is concession, not causation' },
              { text: 'because — rain is a reason', reveals: 'logic-flip' },
              { text: 'when — it is a time clause', reveals: 'logic-blur' },
          ],
          answer: 'although — continuing DESPITE rain is concession, not causation',
          remediations: {
              'logic-flip': { steps: ['"Because" would make rain the REASON the match continued — absurd.', 'The second clause fights the expectation — that is concession: although/even though.'] },
              'logic-blur': { steps: ['Two clauses sharing a time is not the point — the surprise is. Although marks the surprise.'] },
          },
          hint: 'Does the rain cause the match, or fail to stop it?',
          misconception: 'students default to because — the cause-effect logic-flip' },
        { type: 'mcq', nodeId: 'c7_gram_cbse_82_003', difficulty: 'standard',
          question: '"friendly" ends in -ly. Adjective or adverb?',
          options: [
              { text: 'Adjective — "a friendly dog"; the adverb form is "in a friendly way"' },
              { text: 'Adverb — -ly always marks adverbs', reveals: 'ly-trust' },
              { text: 'Both — like fast', reveals: 'fast-overapply' },
          ],
          answer: 'Adjective — "a friendly dog"; the adverb form is "in a friendly way"',
          remediations: {
              'ly-trust': { steps: ['-ly is a hint, not a rule — friendly, lovely, lonely are adjectives.', 'The modifies-what test settles it: describes a noun → adjective.'] },
              'fast-overapply': { steps: ['fast/hard/late are true duals — friendly is not. It cannot modify a verb.'] },
          },
          hint: 'Can you say "she smiled friendly"?',
          misconception: 'students trust the -ly test blindly' },
        { type: 'sort', nodeId: 'c7_gram_cbse_82_002', difficulty: 'standard',
          question: 'Sort the subordinators by their logic:',
          sortItems: [
              { id: 'a', label: 'because', emoji: '❓', correctBin: 'reason' },
              { id: 'b', label: 'although', emoji: '↔️', correctBin: 'concession' },
              { id: 'c', label: 'unless', emoji: '🚫', correctBin: 'condition' },
              { id: 'd', label: 'until', emoji: '⏳', correctBin: 'limit' },
              { id: 'e', label: 'while', emoji: '🕐', correctBin: 'time' },
          ],
          bins: [
              { id: 'reason', label: 'REASON', color: '#22c55e' },
              { id: 'concession', label: 'CONCESSION', color: '#f59e0b' },
              { id: 'condition', label: 'CONDITION', color: '#0ea5e9' },
              { id: 'limit', label: 'TIME-LIMIT', color: '#8b5cf6' },
              { id: 'time', label: 'TIME', color: '#6366f1' },
          ],
          hint: 'although = "yes, but anyway"; unless = "if not"; until = "up to the moment".',
          misconception: 'students treat subordinators as interchangeable glue — each carries a different logic' },
        { type: 'subpart', nodeId: 'c7_gram_cbse_82_003', difficulty: 'advanced',
          question: '"He is a good swimmer — he swims ___." — complete the pair correctly.',
          hint: 'The trap pair: good is the adjective; its adverb is different.',
          misconception: 'uses "good" as an adverb or "goodly" — the good/well pair is irregular',
          parts: [
              { id: 'a', prompt: 'The adverb of "good" is…',
                answer: 'well',
                options: ['well', 'goodly', 'good'],
                hint: 'Irregular pair — good does not take -ly.',
                misconception: 'good-as-adverb or invented goodly' },
              { id: 'b', prompt: 'Complete: "he swims ___"',
                answer: 'well',
                options: ['well', 'good', 'beautiful'],
                hint: 'Modifies the verb → adverb form.',
                misconception: 'adjective used as adverb' },
          ] },
    ],

    reflect: { prompts: ['Which logic do you overuse — because or although?', 'Explain the some/any split to a friend.'] },
    successLine: 'Every small word points the right direction now.',
    tryAgainLine: 'Axes for determiners, logic for joiners, modifies-what for modifiers.',
};
