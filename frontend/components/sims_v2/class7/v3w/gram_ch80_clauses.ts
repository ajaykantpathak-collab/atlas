import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c7_gram_ch80 The Clause Test (phrase/clause, compound/complex, S-V-O-C).
 * Nodes: c7_gram_cbse_80_001, 80_002, 80_003. */
export const c7_gram_ch80: SimDef = {
    id: 'v3w_c7_gram_ch80',
    title: 'The Clause Test',
    subtitle: 'Subject-verb pairs, leaning words, and the joiner that decides compound vs complex',
    classLevel: 7, subject: 'english-grammar', topic: 'Phrases, clauses and sentence structures',
    chapters: ['c7_gram_ch80'],
    nodeIds: ['c7_gram_cbse_80_001', 'c7_gram_cbse_80_002', 'c7_gram_cbse_80_003'],
    emoji: '🔍', theme: { bg: 'from-slate-900 to-gold-950', accent: 'blue', scene: 'junior' },

    scenario: {
        role: 'a grammar detective who finds the hidden subject-verb pairs inside sentences',
        intro: 'Phrases have no engine. Clauses do. And the joiner between clauses — and/but vs because/although — decides whether they stand equal or one leans.',
        goal: 'Separate phrases from clauses, classify compound vs complex by the joiner, and label subject-verb-object-complement jobs.',
    },
    discovery: {
        question: '"After the match ended" vs "after the match" — which is a clause?',
        options: [
            '"After the match ended" — it has a subject (match) and verb (ended)',
            '"after the match" — it is shorter and cleaner',
            'Both — both start with after',
            'Neither — after is a preposition',
        ],
        answer: '"After the match ended" — it has a subject (match) and verb (ended)',
        hook: 'The subject-verb test decides everything — length is a lie.',
    },
    teaching: [
        { title: 'The engine test', text: 'Clause = has a subject-verb pair. Phrase = no pair. Dependent clause = clause that leans (because/when/if…).', emoji: '🧪', bgColor: 'from-gold-500 to-gold-600' },
        { title: 'Equals vs leaners', text: 'Compound = two independent clauses + coordinator (and/but/so). Complex = main + dependent + subordinator (because/although/when).', emoji: '⚖️', bgColor: 'from-gold-500 to-gold-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c7_gram_cbse_80_001', title: 'Run the engine test',
          scaffold: {
            problem: 'Phrase or clause: "under the tall banyan tree" vs "when the rain stopped"?',
            steps: [
                { text: 'Hunt a subject-verb pair in each.' },
                { text: '"under the tall banyan tree" — no verb at all → phrase.' },
                { text: '"when the rain stopped" — subject "rain", verb "stopped" → clause; "when" makes it lean → dependent.', faded: true },
                { text: 'You: "because she smiled" → phrase or clause?', blankAnswer: 'dependent clause' },
            ],
          } },
        { type: 'dissect', nodeId: 'c7_gram_cbse_80_002', title: 'The joiner decides',
          dissect: { specimen: 'compound vs complex',
          spots: [
            { id: 's1', label: 'compound', prompt: '"She was ill, but she attended the exam." — which structure?', answer: 'compound — "but" is a coordinator joining equals', options: ['compound — "but" is a coordinator joining equals', 'complex — two clauses', 'simple', 'a fragment'] },
            { id: 's2', label: 'complex', prompt: '"Although she was ill, she attended the exam." — same clauses, different structure. Why?', answer: 'complex — "although" is a subordinator; the first clause leans', options: ['complex — "although" is a subordinator; the first clause leans', 'compound — still two clauses', 'simple', 'a run-on'] },
            { id: 's3', label: 'splice', prompt: '"It rained, we stayed home." — which structure?', answer: 'none — it is a comma splice error; needs a joiner or a full stop', options: ['none — it is a comma splice error; needs a joiner or a full stop', 'compound', 'complex', 'simple'] },
          ] } },
        { type: 'case', nodeId: 'c7_gram_cbse_80_003', title: 'Object or complement?',
          caseStudy: {
            intro: 'Everything after the verb is NOT automatically an object — being-verbs take complements that rename the subject.',
            decisions: [
              { prompt: '"The sky turned grey." — what is "grey"?', options: [
                  { text: 'complement — "turned" here means "became"; grey describes the sky\'s state', outcome: 'Correct — nothing receives an action; the word renames the subject\'s state.' },
                  { text: 'object — it comes after the verb', outcome: 'Position is not the test — ask whether something was acted upon. The sky did nothing to "grey".', reveals: 'everything-object' },
                ] },
              { prompt: '"She slept" / "She ate" / "She read" — which verb is intransitive?', options: [
                  { text: 'slept — you cannot "sleep something"', outcome: 'Correct — no object can attach to sleep.' },
                  { text: 'ate — eating finishes quickly', outcome: 'You can absolutely "eat something" — ate takes objects fine.', reveals: 'transitive-blind' },
                ] },
            ],
          } },
        { type: 'drill', nodeId: 'c7_gram_cbse_80_001', title: 'Phrase-or-clause speed round', drill: { kind: 'fill', count: 4, level: 3 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c7_gram_cbse_80_001', difficulty: 'foundation',
          question: '"Because she practised daily" — complete sentence?',
          options: [
              { text: 'No — "because" makes the clause lean on a missing main clause' },
              { text: 'Yes — it has a subject and verb', reveals: 'sv-only' },
              { text: 'Yes — clauses are sentences', reveals: 'clause-sentence' },
          ],
          answer: 'No — "because" makes the clause lean on a missing main clause',
          remediations: {
              'sv-only': { steps: ['A subject-verb pair is necessary but not sufficient — leaning words (because/when/if) make a clause dependent.', 'Complete: "She won because she practised daily."'] },
              'clause-sentence': { steps: ['Dependent clauses are parts, not wholes — they must attach to an independent clause.'] },
          },
          hint: 'Can it stand alone, or does it lean?',
          misconception: 'students think any subject-verb pair makes a complete sentence' },
        { type: 'mcq', nodeId: 'c7_gram_cbse_80_002', difficulty: 'standard',
          question: '"She was ill, but she attended the exam" vs "Although she was ill, she attended" — what separates them?',
          options: [
              { text: 'The joiner type — "but" coordinates (compound), "although" subordinates (complex)' },
              { text: 'Clause count — the second has fewer', reveals: 'count-only' },
              { text: 'Meaning — they mean different things', reveals: 'meaning-read' },
          ],
          answer: 'The joiner type — "but" coordinates (compound), "although" subordinates (complex)',
          remediations: {
              'count-only': { steps: ['Both have two clauses — the count is identical.', 'Coordinator (and/but/so) → compound. Subordinator (although/because/when) → complex.'] },
              'meaning-read': { steps: ['They mean nearly the same thing — the difference is grammatical structure, not content.'] },
          },
          hint: 'Look at the word doing the joining.',
          misconception: 'students classify by clause count — the JOINER type is the diagnostic' },
        { type: 'mcq', nodeId: 'c7_gram_cbse_80_003', difficulty: 'standard',
          question: '"She became a teacher." — is "a teacher" an object?',
          options: [
              { text: 'No — it is a complement; "became" is a being-verb and "a teacher" renames her' },
              { text: 'Yes — everything after the verb is the object', reveals: 'everything-object' },
          ],
          answer: 'No — it is a complement; "became" is a being-verb and "a teacher" renames her',
          remediations: {
              'everything-object': { steps: ['Objects receive actions; complements rename or describe the subject after being-verbs.', 'Test: "She became a teacher" = she IS a teacher — nothing was acted upon.'] },
          },
          hint: 'Was something done TO "a teacher", or does it rename her?',
          misconception: 'everything-after-verb-is-object habit — being-verbs take complements, not objects' },
        { type: 'sort', nodeId: 'c7_gram_cbse_80_001', difficulty: 'foundation',
          question: 'Sort: phrase, dependent clause, or independent clause?',
          sortItems: [
              { id: 'a', label: 'in the morning', emoji: '🌅', correctBin: 'phrase' },
              { id: 'b', label: 'when the bell rang', emoji: '🔔', correctBin: 'dep' },
              { id: 'c', label: 'the birds flew home', emoji: '🐦', correctBin: 'indep' },
              { id: 'd', label: 'because I was late', emoji: '⏰', correctBin: 'dep' },
              { id: 'e', label: 'a very long and winding road', emoji: '🛣️', correctBin: 'phrase' },
          ],
          bins: [
              { id: 'phrase', label: 'PHRASE', color: '#6b7280' },
              { id: 'dep', label: 'DEPENDENT CLAUSE', color: '#f59e0b' },
              { id: 'indep', label: 'INDEPENDENT CLAUSE', color: '#22c55e' },
          ],
          hint: 'No subject-verb pair → phrase. Pair + leaning word → dependent. Pair that stands → independent.',
          misconception: 'students classify by length — the subject-verb pair is the test' },
        { type: 'subpart', nodeId: 'c7_gram_cbse_80_002', difficulty: 'advanced',
          question: 'Fix: "It rained, we stayed home."',
          hint: 'A comma cannot join two independent clauses.',
          misconception: 'comma-power belief — the comma separates, it never joins',
          parts: [
              { id: 'a', prompt: 'What is this error called?',
                answer: 'a comma splice',
                options: ['a comma splice', 'a compound sentence', 'a complex sentence'],
                hint: 'Two independent clauses + only a comma = splice.',
                misconception: 'calls the splice a valid structure' },
              { id: 'b', prompt: 'Fix it as a compound sentence.',
                answer: 'It rained, so we stayed home.',
                options: ['It rained, so we stayed home.', 'It rained, we stayed home.', 'Because it rained, we stayed home.'],
                hint: 'Add a coordinator between equals.',
                misconception: 'cannot convert splice to compound' },
              { id: 'c', prompt: 'Fix it as a complex sentence.',
                answer: 'Because it rained, we stayed home.',
                options: ['Because it rained, we stayed home.', 'It rained because, we stayed home.', 'It rained, because we stayed home.'],
                hint: 'Subordinate the cause.',
                misconception: 'misplaces the subordinator or its comma' },
          ] },
    ],

    reflect: { prompts: ['Which test settles phrase-vs-clause instantly?', 'Why is a comma splice not a structure?'] },
    successLine: 'You see the engine pairs inside every sentence — clauses have no secrets left.',
    tryAgainLine: 'Subject-verb pair first, then ask: does it lean or stand?',
};
