import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c9_gram_ch82+83 The Agreement Court + The Report Machine (board pair).
 * Nodes: c9_gram_cbse_82_001, 83_001. */
export const c9_gram_ch8283: SimDef = {
    id: 'v3w_c9_gram_ch8283',
    title: 'The Agreement Court & The Report Machine',
    subtitle: 'Indefinites with fixed number, neither-nor proximity — then the full reported-speech frames for all three sentence types',
    classLevel: 9, subject: 'english-grammar', topic: 'Concord and reported speech — the board pair',
    chapters: ['c9_gram_ch82', 'c9_gram_ch83'],
    nodeIds: ['c9_gram_cbse_82_001', 'c9_gram_cbse_83_001'],
    emoji: '⚖️', theme: { bg: 'from-slate-900 to-teal-950', accent: 'teal', scene: 'senior' },

    scenario: {
        role: 'a court clerk who rules which word governs — and a stenographer who converts live speech into the record',
        intro: 'Two board favourites in one machine: indefinite pronouns with fixed number, and the three reported-speech frames that rebuild statements, questions, and commands.',
        goal: 'Sort every indefinite into its agreement box, run neither-nor proximity, and convert all three sentence types without frame errors.',
    },
    discovery: {
        question: '"Each of the students ___ submitted the form." — has or have?',
        options: [
            'has — "each" is always singular even though it distributes over many students',
            'have — students is plural',
            'have — each means all of them',
            'has or have — both accepted',
        ],
        answer: 'has — "each" is always singular even though it distributes over many students',
        hook: 'Semantic plurality is the trap — "each" singles them out grammatically, one at a time.',
    },
    teaching: [
        { title: 'The three boxes', text: 'ALWAYS SINGULAR: each/every/everyone/nobody/either/neither. ALWAYS PLURAL: few/many/several/both. DEPENDS: some/all/most — look at the of-phrase.', emoji: '📦', bgColor: 'from-teal-500 to-gold-600' },
        { title: 'The three frames', text: 'Statement → that + backshift. Yes/no Q → if/whether + statement order. Wh-Q → wh-word kept + statement order. Command → told + object + (not) to-infinitive.', emoji: '🖼️', bgColor: 'from-gold-500 to-gold-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c9_gram_cbse_82_001', title: 'Sort the indefinite',
          scaffold: {
            problem: '"Some of the water ___ (has/have) spilt."',
            steps: [
                { text: '"Some" lives in the DEPENDS box — it takes its number from the of-phrase.' },
                { text: 'water = uncountable → singular → "has".' },
                { text: 'But "some of the STUDENTS" → have — the of-phrase flips it.', faded: true },
                { text: 'You: "Most of the work ___ done." → ', blankAnswer: 'is' },
            ],
          } },
        { type: 'dissect', nodeId: 'c9_gram_cbse_83_001', title: 'Frame-check',
          dissect: { specimen: 'three sentence types, three report frames',
          spots: [
            { id: 's1', label: 'statement', prompt: '"I may go to Delhi tomorrow" → reported?', answer: 'He said (that) he might go to Delhi the next day — that + backshift + deictics', options: ['He said (that) he might go to Delhi the next day — that + backshift + deictics', 'He said he may go tomorrow', 'He asked if he may go', 'He told to go'] },
            { id: 's2', label: 'question', prompt: '"Where are you going?" she asked → reported?', answer: 'She asked me where I was going — wh-word kept, statement order restored', options: ['She asked me where I was going — wh-word kept, statement order restored', 'She asked where was I going', 'She asked that where I was going', 'She said where I was going'] },
            { id: 's3', label: 'command', prompt: '"Please wait here," the teacher said → reported?', answer: 'The teacher requested us to wait there — please dissolves into requested', options: ['The teacher requested us to wait there — please dissolves into requested', 'The teacher said that please wait here', 'The teacher told to wait there', 'The teacher asked we wait here'] },
          ] } },
        { type: 'case', nodeId: 'c9_gram_cbse_82_001', title: 'The nearer subject wins',
          caseStudy: {
            intro: 'Neither…nor and either…or do not sum — the verb agrees with the subject CLOSER to it.',
            decisions: [
              { prompt: '"Neither the teacher nor the students ___ (was/were) ready."', options: [
                  { text: 'were — the nearer subject "students" governs', outcome: 'Correct — proximity rules correlative pairs.' },
                  { text: 'was — neither is always singular', outcome: 'Alone, yes — but inside neither…nor the NEARER subject governs, and students is plural.', reveals: 'correlative-sum' },
                ] },
              { prompt: 'Swap the order: "Neither the students nor the teacher ___ ready."', options: [
                  { text: 'was — now "teacher" is nearer', outcome: 'Correct — the proximity rule follows position, not meaning.' },
                  { text: 'were — still plural', outcome: 'The subjects swapped positions — the verb follows the nearer one: teacher → was.', reveals: 'correlative-sum' },
                ] },
            ],
          } },
        { type: 'drill', nodeId: 'c9_gram_cbse_83_001', title: 'Backshift speed round', drill: { kind: 'fill', count: 4, level: 4 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c9_gram_cbse_82_001', difficulty: 'standard',
          question: '"Neither the teacher nor the students ___ ready."',
          options: [
              { text: 'were — nearer subject (students) governs the verb' },
              { text: 'was — neither is singular', reveals: 'correlative-sum' },
              { text: 'were — both together are plural', reveals: 'sum-not-proximity' },
          ],
          answer: 'were — nearer subject (students) governs the verb',
          remediations: {
              'correlative-sum': { steps: ['"neither" alone IS singular — but neither…nor is a correlative pair with its own rule.', 'The verb agrees with the subject CLOSER to it.'] },
              'sum-not-proximity': { steps: ['Right answer, wrong reason — it is proximity, not summing.', 'Swap test: "Neither the students nor the teacher ___" → was.'] },
          },
          hint: 'Which subject sits closer to the verb?',
          misconception: 'students sum correlative subjects to plural — proximity is the rule' },
        { type: 'mcq', nodeId: 'c9_gram_cbse_83_001', difficulty: 'standard',
          question: 'Report: "Where are you going?" she asked me.',
          options: [
              { text: 'She asked me where I was going.' },
              { text: 'She asked me where was I going.', reveals: 'question-order' },
              { text: 'She asked me that where I was going.', reveals: 'that-glue' },
          ],
          answer: 'She asked me where I was going.',
          remediations: {
              'question-order': { steps: ['Inside the report the question is dead — statement order returns.', 'wh-word kept as connector; are→was backshift; question mark gone.'] },
              'that-glue': { steps: ['"that" joins statements only — wh-questions keep their own wh-word.', '"asked that where" is a double-connector error.'] },
          },
          hint: 'Does the question order survive inside a report?',
          misconception: 'question order leaks into the reported frame' },
        { type: 'mcq', nodeId: 'c9_gram_cbse_83_001', difficulty: 'advanced',
          question: 'Report: "Please wait here," the teacher said to us.',
          options: [
              { text: 'The teacher requested us to wait there.' },
              { text: 'The teacher said that please wait here.', reveals: 'imperative-that' },
              { text: 'The teacher told to wait there.', reveals: 'object-missing' },
          ],
          answer: 'The teacher requested us to wait there.',
          remediations: {
              'imperative-that': { steps: ['"that" cannot glue an imperative — commands become to-infinitives.', '"please" dissolves into the reporting verb → requested.'] },
              'object-missing': { steps: ['Imperative reporting requires the commanded party — told WHOM?', 'Frame: verb + object + to-infinitive.'] },
          },
          hint: 'Imperatives convert to to-infinitive — and "please" converts to "requested".',
          misconception: 'students glue commands with "that" or drop the object' },
        { type: 'sort', nodeId: 'c9_gram_cbse_82_001', difficulty: 'foundation',
          question: 'File each indefinite into its agreement box:',
          sortItems: [
              { id: 'a', label: 'each', emoji: '1️⃣', correctBin: 'sing' },
              { id: 'b', label: 'everyone', emoji: '👤', correctBin: 'sing' },
              { id: 'c', label: 'several', emoji: '🔢', correctBin: 'plur' },
              { id: 'd', label: 'nobody', emoji: '🚫', correctBin: 'sing' },
              { id: 'e', label: 'most', emoji: '❓', correctBin: 'dep' },
              { id: 'f', label: 'both', emoji: '✌️', correctBin: 'plur' },
          ],
          bins: [
              { id: 'sing', label: 'ALWAYS SINGULAR', color: '#22c55e' },
              { id: 'plur', label: 'ALWAYS PLURAL', color: '#ef4444' },
              { id: 'dep', label: 'DEPENDS (of-phrase)', color: '#f59e0b' },
          ],
          hint: 'each/every/everyone/nobody → singular. few/many/several/both → plural. some/all/most → of-phrase.',
          misconception: 'students assign number by meaning instead of grammatical box' },
        { type: 'subpart', nodeId: 'c9_gram_cbse_83_001', difficulty: 'advanced',
          question: 'Report: "Do you like cricket?" he asked me.',
          hint: 'No wh-word exists — what connector covers yes/no?',
          misconception: 'reaches for "that" or keeps do-support inside the report',
          parts: [
              { id: 'a', prompt: 'Connector for a yes/no question?',
                answer: 'if / whether',
                options: ['if / whether', 'that', 'do'],
                hint: 'Yes/no needs if or whether.',
                misconception: 'that-glue on questions' },
              { id: 'b', prompt: 'What happens to "do"?',
                answer: 'deleted — do-support dies in reported questions',
                options: ['deleted — do-support dies in reported questions', 'becomes did', 'moves to the end'],
                hint: 'Question grammar cannot survive reporting.',
                misconception: 'do-support survives' },
              { id: 'c', prompt: 'Full sentence?',
                answer: 'He asked me if I liked cricket.',
                options: ['He asked me if I liked cricket.', 'He asked me that did I like cricket.', 'He asked me do I like cricket.'],
                hint: 'asked + object + if + statement order + backshift.',
                misconception: 'question order leaks' },
          ] },
    ],

    reflect: { prompts: ['Which box do you misfile — singulars or depends?', 'Which frame error is your habit — that-glue or question-order?'] },
    successLine: 'The court rules correctly and the record reads clean — boxes sorted, frames rebuilt.',
    tryAgainLine: 'Box the indefinite first; frame the sentence type before shifting anything.',
};
