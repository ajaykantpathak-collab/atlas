import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c8_gram_ch83+84 Head Games & Verb-Shapes (concord + non-finites).
 * Nodes: c8_gram_cbse_83_001, 84_001, 84_002. */
export const c8_gram_ch8384: SimDef = {
    id: 'v3w_c8_gram_ch8384',
    title: 'Head Games & Verb-Shapes',
    subtitle: 'The verb obeys the head noun — and some verb-forms quit being verbs to become nouns and adjectives',
    classLevel: 8, subject: 'english-grammar', topic: 'Subject-verb concord and non-finite verbs',
    chapters: ['c8_gram_ch83', 'c8_gram_ch84'],
    nodeIds: ['c8_gram_cbse_83_001', 'c8_gram_cbse_84_001', 'c8_gram_cbse_84_002'],
    emoji: '🎭', theme: { bg: 'from-slate-900 to-emerald-950', accent: 'emerald', scene: 'junior' },

    scenario: {
        role: 'a referee ruling which noun governs the verb — and which verb-forms are secretly nouns in costume',
        intro: 'Two puzzles: decoy phrases try to steal the verb\'s agreement from the head noun, and verb-forms slip into noun and adjective jobs wearing the same -ing shape.',
        goal: 'Find the head noun through decoys, and classify infinitive/gerund/participle by the JOB each is doing.',
    },
    discovery: {
        question: '"The colour of the walls ___ fading." — is or are?',
        options: [
            'is — the head is "colour"; "of the walls" is camouflage',
            'are — walls is plural and closest',
            'are — the sentence is about walls',
            'is or are — both accepted',
        ],
        answer: 'is — the head is "colour"; "of the walls" is camouflage',
        hook: 'Of-phrases exist to fool you — the verb ignores everything inside them.',
    },
    teaching: [
        { title: 'Strip surgery', text: 'Delete of-phrases and comma-inserts (along with, as well as) — agree with the surviving head. "There is/are" inverts: the subject follows the verb.', emoji: '✂️', bgColor: 'from-emerald-500 to-teal-600' },
        { title: 'Same shape, different job', text: '"Swimming is fun" — gerund (noun-job). "The swimming champion" — participle (adjective-job). The job names the form.', emoji: '🎭', bgColor: 'from-teal-500 to-cyan-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c8_gram_cbse_83_001', title: 'Strip the decoy',
          scaffold: {
            problem: '"The box of apples ___ (is/are) on the shelf."',
            steps: [
                { text: 'Find the verb slot: is/are.' },
                { text: 'Ask "what is on the shelf?" → "the box" — that is the head.' },
                { text: 'Cross out "of apples" — decoy phrase.', faded: true },
                { text: 'Agree with the head: "the box IS on the shelf".', faded: true },
                { text: 'You: "The quality of these mangoes ___ poor." → ', blankAnswer: 'was' },
            ],
          } },
        { type: 'dissect', nodeId: 'c8_gram_cbse_84_001', title: 'Same word, three jobs',
          dissect: { specimen: 'the -ing identity parade',
          spots: [
            { id: 's1', label: 'gerund', prompt: '"Walking is good exercise." — what is "walking" doing?', answer: 'gerund — it is the subject, naming the activity as a thing', options: ['gerund — it is the subject, naming the activity as a thing', 'participle — -ing word', 'verb — it is an action', 'infinitive'] },
            { id: 's2', label: 'participle', prompt: '"The running water was cold." — and here?', answer: 'participle — it describes the noun "water" like an adjective', options: ['participle — it describes the noun "water" like an adjective', 'gerund — it names the activity', 'verb — water runs', 'infinitive'] },
            { id: 's3', label: 'infinitive', prompt: '"She wants to learn French." — what job does "to learn" do?', answer: 'infinitive as object — what she wants IS to-learn-French', options: ['infinitive as object — what she wants IS to-learn-French', 'helping verb of wants', 'participle', 'a clause'] },
          ] } },
        { type: 'case', nodeId: 'c8_gram_cbse_84_002', title: 'Gerund or infinitive?',
          caseStudy: {
            intro: 'Verbs have preferences — enjoy demands gerunds, want demands infinitives, and stop flips meaning entirely.',
            decisions: [
              { prompt: '"I enjoy ___ (swim) in the morning."', options: [
                  { text: 'swimming — enjoy takes gerunds only', outcome: 'Correct — enjoy/avoid/finish/mind/suggest + gerund.' },
                  { text: 'to swim — infinitives fit everywhere', outcome: 'Not here — enjoy refuses the infinitive. The preference lists are fixed.', reveals: 'infinitive-everywhere' },
                ] },
              { prompt: '"He stopped smoking" vs "He stopped to smoke" — what flips?', options: [
                  { text: 'Meaning entirely — first = quit the habit; second = paused IN ORDER to smoke', outcome: 'Correct — gerund looks back at the act; infinitive looks forward to purpose.' },
                  { text: 'Same meaning, different grammar', outcome: 'They are opposite actions — one ends smoking, the other starts it.', reveals: 'flip-blind' },
                ] },
            ],
          } },
        { type: 'drill', nodeId: 'c8_gram_cbse_83_001', title: 'Head-noun speed round', drill: { kind: 'fill', count: 4, level: 3 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c8_gram_cbse_83_001', difficulty: 'standard',
          question: '"Ravi, along with his friends, ___ (was/were) invited."',
          options: [
              { text: 'was — "along with" is a comma-insert; it does not pluralize the subject' },
              { text: 'were — friends makes it plural', reveals: 'proximity-agreement' },
              { text: 'were — along with = and', reveals: 'aswellas-and' },
          ],
          answer: 'was — "along with" is a comma-insert; it does not pluralize the subject',
          remediations: {
              'proximity-agreement': { steps: ['The verb ignores the nearest noun — find the head.', 'Comma-inserts (along with, as well as, together with) are passengers, not subjects.'] },
              'aswellas-and': { steps: ['"along with" LOOKS like "and" but is grammatically a parenthetical — the subject stays singular.', 'Only "and" creates a plural compound subject.'] },
          },
          hint: 'Is "along with his friends" part of the subject, or a passenger?',
          misconception: 'students treat "as well as / along with" like "and" — wrongly pluralizing' },
        { type: 'mcq', nodeId: 'c8_gram_cbse_84_001', difficulty: 'standard',
          question: '"Walking is good exercise." — gerund or participle?',
          options: [
              { text: 'Gerund — "walking" is the subject; it names the activity as a thing' },
              { text: 'Participle — every -ing word is one', reveals: 'shape-classify' },
              { text: 'Verb — walking is an action', reveals: 'verb-reflex' },
          ],
          answer: 'Gerund — "walking" is the subject; it names the activity as a thing',
          remediations: {
              'shape-classify': { steps: ['Gerund vs participle is decided by JOB, not shape.', 'Doing a noun-job (subject/object) → gerund. Doing an adjective-job (describing) → participle.'] },
              'verb-reflex': { steps: ['"is" is the verb here — "walking" cannot drive the sentence AND be its subject.', 'Test: what IS good exercise? → walking. It answers as a thing.'] },
          },
          hint: 'Is it doing a noun-job or an adjective-job?',
          misconception: 'students classify by word-shape — every -ing becomes "participle"' },
        { type: 'mcq', nodeId: 'c8_gram_cbse_84_002', difficulty: 'advanced',
          question: '"Please remember ___ (lock) the door."',
          options: [
              { text: 'to lock — a future task needs the infinitive' },
              { text: 'locking — remember + gerund', reveals: 'flip-blind' },
              { text: 'lock — bare infinitive', reveals: 'form-blind' },
          ],
          answer: 'to lock — a future task needs the infinitive',
          remediations: {
              'flip-blind': { steps: ['remember + gerund = recall a past act; remember + infinitive = don\'t forget a future task.', 'The non-finite is a time-direction switch — lock is in the future → to lock.'] },
              'form-blind': { steps: ['After "remember", English needs the full infinitive marker — bare "lock" is not grammatical here.'] },
          },
          hint: 'Is the locking in the past or the future?',
          misconception: 'students miss the gerund/infinitive time-direction switch on flip-verbs' },
        { type: 'sort', nodeId: 'c8_gram_cbse_84_001', difficulty: 'foundation',
          question: 'Sort the -ing words by their job:',
          sortItems: [
              { id: 'a', label: 'Swimming (in "Swimming is fun")', emoji: '🏊', correctBin: 'gerund' },
              { id: 'b', label: 'swimming (in "the swimming champion")', emoji: '🏆', correctBin: 'participle' },
              { id: 'c', label: 'Reading (in "Reading books is her hobby")', emoji: '📚', correctBin: 'gerund' },
              { id: 'd', label: 'broken (in "the broken window")', emoji: '🪟', correctBin: 'participle' },
          ],
          bins: [
              { id: 'gerund', label: 'GERUND (noun-job)', color: '#22c55e' },
              { id: 'participle', label: 'PARTICIPLE (adjective-job)', color: '#f59e0b' },
          ],
          hint: 'Names the activity → gerund. Describes a noun → participle.',
          misconception: 'shape-based classification instead of job-based' },
        { type: 'subpart', nodeId: 'c8_gram_cbse_83_001', difficulty: 'advanced',
          question: '"There ___ a dog and two cats in the yard." — settle the there-trap.',
          hint: '"There" is a dummy — the real subject follows the verb.',
          misconception: 'agrees with "there" or the nearest noun instead of the compound subject after the verb',
          parts: [
              { id: 'a', prompt: 'What is the real subject here?',
                answer: 'a dog and two cats — it sits after the verb',
                options: ['a dog and two cats — it sits after the verb', 'there', 'the yard'],
                hint: '"There" is a dummy word — look past it.',
                misconception: 'treats "there" as the subject' },
              { id: 'b', prompt: 'So the verb is…',
                answer: 'are — compound subject takes plural',
                options: ['are — compound subject takes plural', 'is — "a dog" is nearest and singular', 'is — there is always singular'],
                hint: 'Sum the compound — boards expect plural.',
                misconception: 'proximity rule applied where summing is required' },
          ] },
    ],

    reflect: { prompts: ['Which decoy fooled you — of-phrases or comma-inserts?', 'Explain gerund vs participle in one line to a friend.'] },
    successLine: 'Heads found, jobs classified — the disguised verbs cannot fool you now.',
    tryAgainLine: 'Strip the phrase, find the head; ask the job, name the form.',
};
