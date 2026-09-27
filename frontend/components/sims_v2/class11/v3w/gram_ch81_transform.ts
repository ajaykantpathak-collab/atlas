import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c11_gram_ch81 The Repackager (transformation + synthesis).
 * Nodes: c11_gram_cbse_81_001, 81_002. */
export const c11_gram_ch81: SimDef = {
    id: 'v3w_c11_gram_ch81',
    title: 'The Repackager',
    subtitle: 'One truth, three containers — too…to becomes so…that, clauses shrink to phrases, and sentences merge without losing an idea',
    classLevel: 11, subject: 'english-grammar', topic: 'Sentence transformation and synthesis',
    chapters: ['c11_gram_ch81'],
    nodeIds: ['c11_gram_cbse_81_001', 'c11_gram_cbse_81_002'],
    emoji: '🔀', theme: { bg: 'from-slate-900 to-violet-950', accent: 'violet', scene: 'senior' },

    scenario: {
        role: 'a legal translator who must repackage meaning into different structures without altering a single fact',
        intro: 'Transformation is the purest grammar test — the meaning is fixed, so every mark goes to structural control. Drop a negation or merge wrongly and the equivalence collapses.',
        goal: 'Transform among simple/compound/complex preserving truth conditions, and merge sentences with participles, appositives, and infinitives.',
    },
    discovery: {
        question: '"He was too tired to work" → "He was so tired ___ work." — what fills the gap?',
        options: [
            'that he could not — "too…to" hides a negative result that "so…that" makes explicit',
            'to — just swap the words',
            'that he could — same meaning',
            'and could not — compound it',
        ],
        answer: 'that he could not — "too…to" hides a negative result that "so…that" makes explicit',
        hook: '"Too tired to work" secretly means "so tired that he could NOT work" — the negation is hiding inside the infinitive.',
    },
    teaching: [
        { title: 'The hidden logic', text: 'too…to = so…that + cannot. Although-clause = in spite of/despite + noun/-ing. Unless = if + not. Every transform is a logic-preservation puzzle.', emoji: '🧩', bgColor: 'from-violet-500 to-purple-600' },
        { title: 'The merger menu', text: 'Shared subject → participle ("Hearing the news, she fainted"). Identity → appositive. Purpose → infinitive. Description → relative clause.', emoji: '🫗', bgColor: 'from-purple-500 to-fuchsia-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c11_gram_cbse_81_001', title: 'The too-so engine',
          scaffold: {
            problem: 'Complex → "He was too tired to work."',
            steps: [
                { text: 'Find the hidden logic: tiredness caused a NOT-working — cause + negative result.' },
                { text: '"so + adjective + that + could not + base" makes it explicit.' },
                { text: '"He was so tired that he could not work."', faded: true },
                { text: 'You: "She is too weak to stand." → ', blankAnswer: 'She is so weak that she cannot stand' },
            ],
          } },
        { type: 'dissect', nodeId: 'c11_gram_cbse_81_001', title: 'The meaning-preservation audit',
          dissect: { specimen: 'transformations that broke the fact',
          spots: [
            { id: 's1', label: 'dropped-negation', prompt: '"He was too tired to work" → "He was so tired to work." — what broke?', answer: 'the "that he could not" clause vanished — the negative result was dropped', options: ['the "that he could not" clause vanished — the negative result was dropped', 'nothing — both are correct', 'so should be very', 'work needs working'] },
            { id: 's2', label: 'double-negation', prompt: '"If you do not study, you will fail" → "Unless you do not study, you will fail." — legal?', answer: 'no — "unless" already contains the not; double negation reverses the meaning', options: ['no — "unless" already contains the not; double negation reverses the meaning', 'yes — correct transformation', 'unless needs a comma', 'if-not should be if-not-only'] },
            { id: 's3', label: 'rename-vs-restructure', prompt: '"Although he was ill, he attended" → "Although ill, he attended." — is this simple-form?', answer: 'no — it is still subordinate; true simple = "In spite of his illness, he attended"', options: ['no — it is still subordinate; true simple = "In spite of his illness, he attended"', 'yes — clause shortened', 'yes — although was removed', 'it is compound'] },
          ] } },
        { type: 'case', nodeId: 'c11_gram_cbse_81_002', title: 'Choose the merger',
          caseStudy: {
            intro: 'Four merger devices for four relationships — pick by what links the sentences.',
            decisions: [
              { prompt: '"She heard the news. She fainted." — best merge?', options: [
                  { text: 'Hearing the news, she fainted — participle on shared subject', outcome: 'Correct — the merge compresses sequence into one motion.' },
                  { text: 'She heard the news and she fainted.', outcome: 'Legal but low-scoring — the and-merge misses the tested device.', reveals: 'and-stack' },
                ] },
              { prompt: '"Walking down the road, a snake appeared." — legal?', options: [
                  { text: 'No — dangling participle; the snake was not walking', outcome: 'Correct — the participle\'s implied subject must match the main clause subject.' },
                  { text: 'Yes — it describes the scene', outcome: 'The grammar says the snake walked — the implied subject rule is violated.', reveals: 'dangling' },
                ] },
            ],
          } },
        { type: 'drill', nodeId: 'c11_gram_cbse_81_001', title: 'Transformation speed round', drill: { kind: 'fill', count: 4, level: 5 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c11_gram_cbse_81_001', difficulty: 'standard',
          question: 'Transform to complex: "He was too tired to work."',
          options: [
              { text: 'He was so tired that he could not work.' },
              { text: 'He was so tired to work.', reveals: 'dropped-negation' },
              { text: 'He was too tired that he worked.', reveals: 'logic-scramble' },
          ],
          answer: 'He was so tired that he could not work.',
          remediations: {
              'dropped-negation': { steps: ['"too…to" secretly = "so…that + cannot" — the negative lives inside the infinitive.', 'Preserve every logical piece — the NOT is part of the fact.'] },
              'logic-scramble': { steps: ['"too tired that he worked" reverses the result — tiredness prevented work, not caused it.'] },
          },
          hint: 'Where does the "not" hide in "too…to"?',
          misconception: 'students drop the hidden negation — the too→so transform is a meaning-preservation test' },
        { type: 'mcq', nodeId: 'c11_gram_cbse_81_001', difficulty: 'advanced',
          question: 'Transform: "If you do not study, you will fail" → using "unless".',
          options: [
              { text: 'Unless you study, you will fail.' },
              { text: 'Unless you do not study, you will fail.', reveals: 'double-negation' },
              { text: 'Unless you will fail, you study.', reveals: 'clause-swap' },
          ],
          answer: 'Unless you study, you will fail.',
          remediations: {
              'double-negation': { steps: ['"unless" = "if not" — the negation is INSIDE the connector.', 'Adding "not" again flips the condition to its opposite.'] },
              'clause-swap': { steps: ['The if-clause (condition) stays subordinate; the result clause stays main.', 'Swapping them scrambles the logic entirely.'] },
          },
          hint: '"Unless" already carries "not" inside it.',
          misconception: 'double negation — "unless you do not study" reverses the condition' },
        { type: 'mcq', nodeId: 'c11_gram_cbse_81_002', difficulty: 'advanced',
          question: 'Fix: "Walking down the road, a snake appeared."',
          options: [
              { text: 'Dangling participle — "Walking down the road, I saw a snake" or recast the clause' },
              { text: 'Correct as written — the scene is clear', reveals: 'dangling' },
              { text: 'A snake appeared walking down the road — move it', reveals: 'dangling' },
          ],
          answer: 'Dangling participle — "Walking down the road, I saw a snake" or recast the clause',
          remediations: {
              'dangling': { steps: ['A fronted participle borrows the main clause\'s subject — here that makes the snake the walker.', 'Fix by giving the participle its true subject: "As I walked…" or "Walking…, I saw".'] },
          },
          hint: 'Who was walking — the snake or the narrator?',
          misconception: 'dangling participles — the participle\'s implied subject must equal the main clause subject' },
        { type: 'sort', nodeId: 'c11_gram_cbse_81_002', difficulty: 'standard',
          question: 'Match the relationship to its merger device:',
          sortItems: [
              { id: 'a', label: 'shared subject + sequence', emoji: '🔗', correctBin: 'participle' },
              { id: 'b', label: 'identity ("Mr Rao is our principal")', emoji: '🪪', correctBin: 'appositive' },
              { id: 'c', label: 'purpose ("saved money to buy…")', emoji: '🎯', correctBin: 'infinitive' },
              { id: 'd', label: 'description ("the girl who won")', emoji: '📝', correctBin: 'relative' },
          ],
          bins: [
              { id: 'participle', label: 'PARTICIPLE', color: '#22c55e' },
              { id: 'appositive', label: 'APPOSITIVE', color: '#f59e0b' },
              { id: 'infinitive', label: 'INFINITIVE', color: '#0ea5e9' },
              { id: 'relative', label: 'RELATIVE CLAUSE', color: '#8b5cf6' },
          ],
          hint: 'Each relationship has its compression device.',
          misconception: 'students default to "and…and" stacking instead of the right merger' },
        { type: 'subpart', nodeId: 'c11_gram_cbse_81_001', difficulty: 'advanced',
          question: 'Make simple: "Although he was ill, he attended the meeting."',
          hint: 'The clause must shrink to a phrase — one finite verb survives.',
          misconception: 'renames the connector instead of restructuring — clause never reduces',
          parts: [
              { id: 'a', prompt: 'The subordinate idea "although he was ill" becomes…',
                answer: 'a phrase — "In spite of / Despite his illness"',
                options: ['a phrase — "In spite of / Despite his illness"', 'a shorter clause — "although ill"', 'a compound — "but he attended"'],
                hint: 'Simple = one finite verb — the clause must collapse to a phrase.',
                misconception: 'clause shrunk but not eliminated' },
              { id: 'b', prompt: 'The finished sentence?',
                answer: 'In spite of his illness, he attended the meeting.',
                options: ['In spite of his illness, he attended the meeting.', 'Although ill, he attended the meeting.', 'He was ill, but he attended the meeting.'],
                hint: 'Despite/In spite of + noun-phrase.',
                misconception: 'still a clause or compound' },
          ] },
    ],

    reflect: { prompts: ['Where does the negation hide in "too…to"?', 'Which merger do you overuse — and-stacking or participle?'] },
    successLine: 'Meaning survives every repackaging — the logic is intact in all three containers.',
    tryAgainLine: 'Find the hidden logic first — cause, concession, condition — then rebuild.',
};
