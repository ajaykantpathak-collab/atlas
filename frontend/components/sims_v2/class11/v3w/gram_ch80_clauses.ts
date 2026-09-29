import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c11_gram_ch80 The Job Inside (clause types + relative clauses).
 * Nodes: c11_gram_cbse_80_001, 80_002. */
export const c11_gram_ch80: SimDef = {
    id: 'v3w_c11_gram_ch80',
    title: 'The Job Inside',
    subtitle: 'Noun, adjective, or adverb — a subordinate clause is named by the work it does, not the word it starts with',
    classLevel: 11, subject: 'english-grammar', topic: 'Subordinate clause types and relative clauses',
    chapters: ['c11_gram_ch80'],
    nodeIds: ['c11_gram_cbse_80_001', 'c11_gram_cbse_80_002'],
    emoji: '🧬', theme: { bg: 'from-slate-900 to-purple-950', accent: 'purple', scene: 'senior' },

    scenario: {
        role: 'a structural analyst who classifies clauses by the work they perform inside the main clause',
        intro: 'A "that"-clause can be a noun ("I know that he lied") or an adjective ("the book that I bought"). Same connector, different job — and the job is the name.',
        goal: 'Classify subordinate clauses by function with the substitution tests, and handle the defining/non-defining comma contrast in relatives.',
    },
    discovery: {
        question: '"The house that Jack built is old" — what is "that Jack built"?',
        options: [
            'Adjective clause — it answers "which house?" about a noun',
            'Noun clause — "that" always starts noun clauses',
            'Adverb clause — it modifies the verb',
            'Independent clause — it has a subject and verb',
        ],
        answer: 'Adjective clause — it answers "which house?" about a noun',
        hook: 'Connector-based classification fails — ask what JOB the clause does, not what word opens it.',
    },
    teaching: [
        { title: 'The substitution tests', text: 'Noun clause — swap it for "it/something" and the sentence survives. Adjective clause — answers "which one?". Adverb clause — answers when/why/how of the verb.', emoji: '🧪', bgColor: 'from-purple-500 to-gold-600' },
        { title: 'The comma contract', text: 'Defining (which-one) → no commas, "that" allowed. Non-defining (extra info) → commas, only who/which — never "that".', emoji: '📎', bgColor: 'from-gold-500 to-fuchsia-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c11_gram_cbse_80_001', title: 'Run the substitution',
          scaffold: {
            problem: '"What he promised was never delivered." — classify the clause.',
            steps: [
                { text: 'Locate the clause: "what he promised".' },
                { text: 'Swap test: "IT was never delivered" — survives → noun clause (subject of "was").' },
                { text: 'The job decides: subject-position = noun clause.', faded: true },
                { text: 'You: "I believe that she is right." — "that she is right" is a ___ clause', blankAnswer: 'noun (object of believe)' },
            ],
          } },
        { type: 'dissect', nodeId: 'c11_gram_cbse_80_002', title: 'The comma changes meaning',
          dissect: { specimen: 'defining vs non-defining relatives',
          spots: [
            { id: 's1', label: 'defining', prompt: '"Students who cheat fail." — commas or none, and what does it claim?', answer: 'no commas — defining; only cheating students fail', options: ['no commas — defining; only cheating students fail', 'commas needed', 'all students fail', 'who should be that'] },
            { id: 's2', label: 'non-defining', prompt: '"Students, who cheat, fail." — now what does it claim?', answer: 'all students cheat AND all fail — commas make it extra-info about ALL students', options: ['all students cheat AND all fail — commas make it extra-info about ALL students', 'same as before', 'only cheaters fail', 'the commas are decoration'] },
            { id: 's3', label: 'that-ban', prompt: '"My car, ___ is ten years old, still runs." — that or which?', answer: 'which — non-defining clauses after commas cannot take "that"', options: ['which — non-defining clauses after commas cannot take "that"', 'that — both work', 'who — cars are objects', 'whose — possession'] },
          ] } },
        { type: 'case', nodeId: 'c11_gram_cbse_80_001', title: 'Name the job',
          caseStudy: {
            intro: 'Three clauses, three jobs — classify by function, not connector.',
            decisions: [
              { prompt: '"She left because the meeting ended." — "because the meeting ended" is…', options: [
                  { text: 'adverb clause — answers "why did she leave?"', outcome: 'Correct — it modifies the main verb for reason.' },
                  { text: 'noun clause — it has a subject and verb', outcome: 'Having a subject-verb makes it a clause — the JOB is adverbial (reason).', reveals: 'connector-classify' },
                ] },
              { prompt: '"I know that he lied." — "that he lied" is…', options: [
                  { text: 'noun clause — object of "know" (swap: "I know IT")', outcome: 'Correct — the substitution test settles it.' },
                  { text: 'adjective clause — describes "know"', outcome: 'It does not describe a noun — it IS the thing known. Object = noun job.', reveals: 'connector-classify' },
                ] },
            ],
          } },
        { type: 'drill', nodeId: 'c11_gram_cbse_80_002', title: 'Relative-pronoun speed round', drill: { kind: 'fill', count: 4, level: 5 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c11_gram_cbse_80_001', difficulty: 'standard',
          question: '"What he promised was never delivered." — the clause type?',
          options: [
              { text: 'Noun clause — subject of the main verb; swap in "it" and the sentence survives' },
              { text: 'Adjective clause — "what" describes the promise', reveals: 'connector-classify' },
              { text: 'Adverb clause — explains why it failed', reveals: 'connector-classify' },
          ],
          answer: 'Noun clause — subject of the main verb; swap in "it" and the sentence survives',
          remediations: {
              'connector-classify': { steps: ['Never classify by the first word — classify by the JOB.', 'Substitution test: swap the clause for "it/something" — survives → noun clause.', 'Adjective clauses answer "which one?"; adverb clauses answer when/why/how of the verb.'] },
          },
          hint: 'Can you replace the whole clause with "it"?',
          misconception: 'students classify clauses by their connector instead of their grammatical job' },
        { type: 'mcq', nodeId: 'c11_gram_cbse_80_002', difficulty: 'standard',
          question: '"My car, ___ is ten years old, still runs well." that or which?',
          options: [
              { text: 'which — comma-wrapped non-defining clauses cannot take "that"' },
              { text: 'that — cars are things', reveals: 'that-after-comma' },
              { text: 'whose — it is my car', reveals: 'whose-misfire' },
          ],
          answer: 'which — comma-wrapped non-defining clauses cannot take "that"',
          remediations: {
              'that-after-comma': { steps: ['"that" is banned inside commas — non-defining relatives need who/which.', 'Defining: no commas, "that" welcome. Non-defining: commas, who/which only.'] },
              'whose-misfire': { steps: ['"whose" marks possession (whose engine) — here the clause is about the car itself.'] },
          },
          hint: 'Commas change which pronouns are legal.',
          misconception: '"that" used after commas — the non-defining ban' },
        { type: 'mcq', nodeId: 'c11_gram_cbse_80_002', difficulty: 'advanced',
          question: 'Meaning check: "Students who cheat fail" vs "Students, who cheat, fail."',
          options: [
              { text: 'Different — first says only cheaters fail; second says all students cheat and all fail' },
              { text: 'Same — commas never change meaning', reveals: 'comma-decor' },
              { text: 'First is wrong grammar', reveals: 'defining-blind' },
          ],
          answer: 'Different — first says only cheaters fail; second says all students cheat and all fail',
          remediations: {
              'comma-decor': { steps: ['Commas are meaning-machines in relatives — they split defining from non-defining.', 'Defining narrows the set (only cheaters); non-defining comments on the whole set (all students).'] },
              'defining-blind': { steps: ['The comma-less version is the more common, fully legal form — it defines WHICH students.'] },
          },
          hint: 'How many students does each version accuse?',
          misconception: 'students read commas as decoration — in relatives they flip the meaning' },
        { type: 'sort', nodeId: 'c11_gram_cbse_80_001', difficulty: 'standard',
          question: 'Sort each clause by its job:',
          sortItems: [
              { id: 'a', label: 'that she is right (I believe that…)', emoji: '💭', correctBin: 'noun' },
              { id: 'b', label: 'who lives next door (the girl who…)', emoji: '🏠', correctBin: 'adj' },
              { id: 'c', label: 'when the rain stopped', emoji: '🌧️', correctBin: 'adv' },
              { id: 'd', label: 'that Jack built (the house that…)', emoji: '🔨', correctBin: 'adj' },
              { id: 'e', label: 'what he said (…was true)', emoji: '💬', correctBin: 'noun' },
          ],
          bins: [
              { id: 'noun', label: 'NOUN CLAUSE', color: '#22c55e' },
              { id: 'adj', label: 'ADJECTIVE CLAUSE', color: '#f59e0b' },
              { id: 'adv', label: 'ADVERB CLAUSE', color: '#0ea5e9' },
          ],
          hint: 'Subject/object job → noun. Describes a noun → adjective. Modifies the verb → adverb.',
          misconception: 'connector-based classification — same "that", different jobs' },
        { type: 'subpart', nodeId: 'c11_gram_cbse_80_002', difficulty: 'advanced',
          question: '"The girl ___ won the prize is my sister." — pick and defend the pronoun.',
          hint: 'Person + defining clause.',
          misconception: 'assigns "which" to people — the person/thing boundary',
          parts: [
              { id: 'a', prompt: 'Legal pronouns here?',
                answer: 'who or that — person + defining clause',
                options: ['who or that — person + defining clause', 'which only', 'whose — the prize is hers'],
                hint: 'People take who/that; things take which/that.',
                misconception: 'person-thing boundary crossed' },
              { id: 'b', prompt: 'Is this clause defining or non-defining?',
                answer: 'defining — it picks WHICH girl; no commas',
                options: ['defining — it picks WHICH girl; no commas', 'non-defining — extra info', 'cannot tell'],
                hint: 'Which girl? The one who won — the clause selects her.',
                misconception: 'defining/non-defining unread' },
          ] },
    ],

    reflect: { prompts: ['Which substitution test settles clause type fastest for you?', 'How do commas flip the meaning in relatives?'] },
    successLine: 'You classify by job, not by connector — the clauses cannot disguise themselves anymore.',
    tryAgainLine: 'Ask what the clause DOES — subject? descriptor? modifier? — then name it.',
};
