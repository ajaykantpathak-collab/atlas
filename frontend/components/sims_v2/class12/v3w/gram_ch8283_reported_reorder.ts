import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c12_gram_ch82+83 The Archive & The Chain (reported adv. + reordering).
 * Nodes: c12_gram_cbse_82_001, 83_001. */
export const c12_gram_ch8283: SimDef = {
    id: 'v3w_c12_gram_ch8283',
    title: 'The Archive & The Chain',
    subtitle: 'Exclamations flatten, embedded questions keep statement order — and paragraphs reassemble through reference-chains, not vibes',
    classLevel: 12, subject: 'english-grammar', topic: 'Advanced reported speech and sentence reordering',
    chapters: ['c12_gram_ch82', 'c12_gram_ch83'],
    nodeIds: ['c12_gram_cbse_82_001', 'c12_gram_cbse_83_001'],
    emoji: '🔗', theme: { bg: 'from-slate-900 to-gold-950', accent: 'sky', scene: 'senior' },

    scenario: {
        role: 'an archivist who converts live exclamations and questions into the record — and reconstructs scrambled paragraphs',
        intro: 'Two senior skills: the leftovers of reported speech (exclamations, embedded questions, force-verbs) and the cohesion logic that reassembles shuffled paragraphs through pronouns and article-chains.',
        goal: 'Report exclamations and embedded questions without frame errors, and rebuild paragraphs by tracing the a→the chain and connector logic.',
    },
    discovery: {
        question: '"Do you know where does he live?" — legal?',
        options: [
            'No — inside the noun clause, question order dies: "where he lives"',
            'Yes — the sentence asks a question',
            'Yes — inversion is required after wh-words',
            'No — needs "if" instead of "where"',
        ],
        answer: 'No — inside the noun clause, question order dies: "where he lives"',
        hook: 'The sentence asks a question — but "where he lives" is a noun clause inside it, and noun clauses keep statement order. The most-tested senior structure.',
    },
    teaching: [
        { title: 'The leftover frames', text: 'Exclamation → exclaimed + that + flattened statement. Embedded Q → wh-word heads a noun clause, statement order inside. Reporting verb carries the force.', emoji: '🗃️', bgColor: 'from-gold-500 to-gold-600' },
        { title: 'The chain rules', text: 'Opener introduces with "a" and no backward pronouns. "the/he/this" refer backward. Connectors demand their logic-predecessor.', emoji: '⛓️', bgColor: 'from-gold-500 to-gold-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c12_gram_cbse_82_001', title: 'Flatten the exclamation',
          scaffold: {
            problem: 'Report: "What a wonderful performance!" she said.',
            steps: [
                { text: 'Exclamations cannot survive inside a report — the emotion converts to the reporting verb.' },
                { text: 'exclaimed + that + flattened statement.' },
                { text: '"She exclaimed that it was a wonderful performance."', faded: true },
                { text: 'You: "How beautiful!" → "he exclaimed ___"', blankAnswer: 'that it was beautiful' },
            ],
          } },
        { type: 'dissect', nodeId: 'c12_gram_cbse_83_001', title: 'Chain the paragraph',
          dissect: { specimen: 'a shuffled paragraph',
          spots: [
            { id: 's1', label: 'opener', prompt: 'Which opens: "The machine then stopped" or "A small factory bought a new machine"?', answer: 'the second — "a machine" introduces the entity; "the machine" needs it to exist already', options: ['the second — "a machine" introduces the entity; "the machine" needs it to exist already', 'the first — stopped is the climax', 'either works', 'neither — need a title'] },
            { id: 's2', label: 'pronoun', prompt: '"He failed the test" / "Ravi never studied" — which comes first?', answer: 'Ravi first — "He" needs its antecedent established', options: ['Ravi first — "He" needs its antecedent established', 'He first — pronouns open', 'either order', 'the test sentence first'] },
            { id: 's3', label: 'connector', prompt: '"Therefore, the project was cancelled" — what must precede it?', answer: 'its cause — "therefore" demands the logic-predecessor (funds ran out)', options: ['its cause — "therefore" demands the logic-predecessor (funds ran out)', 'nothing — therefore opens', 'the conclusion', 'a question'] },
          ] } },
        { type: 'case', nodeId: 'c12_gram_cbse_82_001', title: 'The force-verb',
          caseStudy: {
            intro: 'The reporting verb carries the original\'s force — choose it precisely.',
            decisions: [
              { prompt: '"Please help me," she said. Best reporting verb?', options: [
                  { text: 'requested — "please" dissolves into the request verb', outcome: 'Correct — force-verbs absorb the original\'s manner.' },
                  { text: 'said — safest default', outcome: 'Legal but weak — "please" marks a request and the verb should carry it.', reveals: 'said-default' },
                ] },
              { prompt: '"Stay away from the gate!" the guard said. Best verb?', options: [
                  { text: 'warned — the sentence carries a warning\'s force', outcome: 'Correct — the force matches the content.' },
                  { text: 'told — commands take told', outcome: 'Told works, but warned captures the danger-force — the sharper choice earns more.', reveals: 'force-flat' },
                ] },
            ],
          } },
        { type: 'drill', nodeId: 'c12_gram_cbse_82_001', title: 'Report-frame speed round', drill: { kind: 'fill', count: 4, level: 5 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c12_gram_cbse_82_001', difficulty: 'advanced',
          question: 'Fix: "I don\'t know where is he."',
          options: [
              { text: 'I don\'t know where he is — embedded wh-questions keep statement order' },
              { text: 'Correct — it asks a question', reveals: 'embed-invert' },
              { text: 'I don\'t know if he is — needs if', reveals: 'if-misfire' },
          ],
          answer: 'I don\'t know where he is — embedded wh-questions keep statement order',
          remediations: {
              'embed-invert': { steps: ['The sentence is a statement — "where he is" is a noun clause inside it.', 'Question order is banned inside embedded clauses: "where he is", "what she said", "when they left".'] },
              'if-misfire': { steps: ['"if" covers yes/no embeds — wh-embeds keep their own wh-word.'] },
          },
          hint: 'Is the wh-part a question or a noun clause?',
          misconception: 'question order leaks into embedded noun clauses — THE senior trap' },
        { type: 'mcq', nodeId: 'c12_gram_cbse_82_001', difficulty: 'standard',
          question: 'Report: "What a wonderful performance!" she said.',
          options: [
              { text: 'She exclaimed that it was a wonderful performance.' },
              { text: 'She said "what a wonderful performance."', reveals: 'quote-leak' },
              { text: 'She exclaimed what a wonderful performance.', reveals: 'frame-missing' },
          ],
          answer: 'She exclaimed that it was a wonderful performance.',
          remediations: {
              'quote-leak': { steps: ['Reports never quote — the exclamation must flatten into a that-clause.', 'The emotion moves into the reporting verb: exclaimed.'] },
              'frame-missing': { steps: ['"exclaimed" needs its that-clause — "exclaimed what a…" keeps the exclamation frame inside the report.'] },
          },
          hint: 'The exclamation mark cannot survive reporting.',
          misconception: 'students report exclamations by quoting them — the flattening step is unknown' },
        { type: 'mcq', nodeId: 'c12_gram_cbse_83_001', difficulty: 'standard',
          question: 'Order: "Therefore, the project was cancelled" / "Funds ran out midway" / "The project began in 2020".',
          options: [
              { text: 'began → ran out → therefore cancelled — connector logic fixes the tail' },
              { text: 'therefore → began → ran out', reveals: 'connector-first' },
              { text: 'ran out → therefore → began', reveals: 'chain-scramble' },
          ],
          answer: 'began → ran out → therefore cancelled — connector logic fixes the tail',
          remediations: {
              'connector-first': { steps: ['"Therefore" cannot open — it demands its cause first.', 'Connectors are directional: however needs a contrast, therefore needs a cause, then needs a sequence.'] },
              'chain-scramble': { steps: ['The setup must precede the problem — "began in 2020" establishes the project before it can fail.'] },
          },
          hint: 'What must exist before "therefore" can fire?',
          misconception: 'students order by topic-feel instead of connector dependencies' },
        { type: 'order', nodeId: 'c12_gram_cbse_83_001', difficulty: 'advanced',
          question: 'Order the paragraph-reconstruction strategy:',
          sortItems: [
              { id: 's1', label: 'Find the opener — "a" articles, no backward pronouns', emoji: '🚪', correctBin: 'p1' },
              { id: 's2', label: 'Chain references — each the/he/this lands after its introducer', emoji: '🔗', correctBin: 'p2' },
              { id: 's3', label: 'Check connector logic — therefore/however/then need predecessors', emoji: '🧭', correctBin: 'p3' },
              { id: 's4', label: 'Read assembled — every link must point backward cleanly', emoji: '✅', correctBin: 'p4' },
          ],
          bins: [
              { id: 'p1', label: '1', color: '#0ea5e9' },
              { id: 'p2', label: '2', color: '#6366f1' },
              { id: 'p3', label: '3', color: '#8b5cf6' },
              { id: 'p4', label: '4', color: '#22c55e' },
          ],
          hint: 'Opener → chains → connectors → full read.',
          misconception: 'students reassemble by feel — the reference-chain is the reliable mechanism' },
        { type: 'subpart', nodeId: 'c12_gram_cbse_82_001', difficulty: 'advanced',
          question: 'Report: "Don\'t touch the fence," the guard said to us.',
          hint: 'Negative imperatives put "not" before "to".',
          misconception: 'misplaces the negative or keeps imperative grammar inside the report',
          parts: [
              { id: 'a', prompt: 'The reporting verb for a prohibition?',
                answer: 'warned / told — the force of "don\'t touch" is a warning',
                options: ['warned / told — the force of "don\'t touch" is a warning', 'said — neutral is safest', 'asked — it is a request'],
                hint: 'Prohibitions carry warning-force.',
                misconception: 'force-verb flattened to "said"' },
              { id: 'b', prompt: 'The reported clause?',
                answer: 'us not to touch the fence — "not" sits before "to"',
                options: ['us not to touch the fence — "not" sits before "to"', 'us to not touch the fence', 'that we should not touch the fence — acceptable but the infinitive frame is the standard'],
                hint: 'not + to-infinitive, object included.',
                misconception: '"not" misplaced or object dropped' },
          ] },
    ],

    reflect: { prompts: ['Why does question order die inside a noun clause?', 'Which chain-link is the most reliable opener-signal?'] },
    successLine: 'The archive is clean and every paragraph reassembles — references chain backward without a single break.',
    tryAgainLine: 'Exclamations flatten, embeds keep statement order; openers carry "a" and no backward links.',
};
