import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c8_gram_ch81 The Spotlight Flip (active ↔ passive).
 * Nodes: c8_gram_cbse_81_001, 81_002. */
export const c8_gram_ch81: SimDef = {
    id: 'v3_c8_gram_ch81',
    title: 'The Spotlight Flip',
    subtitle: 'Move the receiver into the spotlight — object to subject, verb to be+V3, and the doer demoted or deleted',
    classLevel: 8, subject: 'english-grammar', topic: 'Active and passive voice',
    chapters: ['c8_gram_ch81'],
    nodeIds: ['c8_gram_cbse_81_001', 'c8_gram_cbse_81_002'],
    emoji: '🔦', theme: { bg: 'from-slate-900 to-amber-950', accent: 'amber', scene: 'junior' },

    scenario: {
        role: 'a news editor deciding who stands in the spotlight — the doer or the receiver',
        intro: '"The gardener planted the roses" vs "The roses were planted." The same event, different spotlight. Headlines, reports, and science all prefer the receiver — if you can flip cleanly.',
        goal: 'Convert active↔passive in all tenses, keep the tense inside the be-auxiliary, delete vague agents, and refuse illegal passives on intransitives.',
    },
    discovery: {
        question: '"Someone has stolen my watch" → what is the correct passive?',
        options: [
            'My watch has been stolen — the vague agent "someone" deletes',
            'My watch has stolen — the object moves up',
            'My watch is stolen by someone',
            'Someone has been stolen my watch',
        ],
        answer: 'My watch has been stolen — the vague agent "someone" deletes',
        hook: 'Two traps at once: "be" must carry the tense (has BEEN stolen), and junk agents like "someone" get deleted, not "by someone".',
    },
    teaching: [
        { title: 'The three-cut surgery', text: 'Object → subject. Verb → be(tense) + V3. Doer → by-phrase or deleted. The "be" carries both the original tense and the new subject\'s number.', emoji: '🔪', bgColor: 'from-amber-500 to-orange-600' },
        { title: 'When the flip is legal AND wise', text: 'Intransitives cannot flip (no object to promote). And keep active when the doer IS the point — "My grandmother knitted this."', emoji: '⚖️', bgColor: 'from-orange-500 to-rose-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c8_gram_cbse_81_001', title: 'Run the surgery',
          scaffold: {
            problem: 'Passive: "The students clean the classroom every day."',
            steps: [
                { text: 'Object to the front: "the classroom" becomes subject.' },
                { text: 'Verb → be + V3; "be" keeps present tense + new number: is cleaned.' },
                { text: 'Doer → "by the students" (or drop it if vague).', faded: true },
                { text: 'Result: The classroom is cleaned by the students every day.', faded: true },
                { text: 'You: "The teacher praised the boy." → The boy ___', blankAnswer: 'was praised (by the teacher)' },
            ],
          } },
        { type: 'dissect', nodeId: 'c8_gram_cbse_81_001', title: 'The broken passives',
          dissect: { specimen: 'three wounds in three attempts',
          spots: [
            { id: 's1', label: 'be-dropped', prompt: '"The letter written by her." — what is missing?', answer: 'the be-auxiliary — "was written"; the participle alone cannot carry voice', options: ['the be-auxiliary — "was written"; the participle alone cannot carry voice', 'by should be from', 'letter needs the', 'written should be wrote'] },
            { id: 's2', label: 'tense-drift', prompt: '"The boy is praised" for a past event — the fault?', answer: 'tense drifted — "be" must carry the original tense: "was praised"', options: ['tense drifted — "be" must carry the original tense: "was praised"', 'is is correct', 'praised should be praise', 'boy needs an article'] },
            { id: 's3', label: 'junk-agent', prompt: '"My window was broken by someone." — the fault?', answer: 'vague agent kept — "someone" should delete, not survive as "by someone"', options: ['vague agent kept — "someone" should delete, not survive as "by someone"', 'window needs an article', 'broken should be broke', 'was should be is'] },
          ] } },
        { type: 'case', nodeId: 'c8_gram_cbse_81_002', title: 'Flip or keep?',
          caseStudy: {
            intro: 'Passive is a choice, not a reflex — the receiver must deserve the spotlight.',
            decisions: [
              { prompt: '"The accident happened at dawn." — legal passive?', options: [
                  { text: 'No — "happen" is intransitive; there is no object to promote', outcome: 'Correct — "was happened" is always wrong.' },
                  { text: 'Yes — "Dawn was happened by the accident"', outcome: 'Intransitives have no object — there is nothing to move to subject position.', reveals: 'intransitive-flip' },
                ] },
              { prompt: '"My grandmother knitted this sweater for me." — flip it?', options: [
                  { text: 'Keep active — the doer (grandmother) IS the point of the sentence', outcome: 'Correct — passivizing buries the person who matters.' },
                  { text: 'Flip — "This sweater was knitted for me by my grandmother"', outcome: 'Grammatically legal but rhetorically wrong — the grandmother is the heart, not a by-phrase.', reveals: 'mechanical-flip' },
                ] },
            ],
          } },
        { type: 'drill', nodeId: 'c8_gram_cbse_81_001', title: 'Flip speed round', drill: { kind: 'fill', count: 4, level: 3 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c8_gram_cbse_81_001', difficulty: 'standard',
          question: 'Passive: "Someone has stolen my watch."',
          options: [
              { text: 'My watch has been stolen.' },
              { text: 'My watch has stolen.', reveals: 'be-dropped' },
              { text: 'My watch is stolen by someone.', reveals: 'junk-agent' },
          ],
          answer: 'My watch has been stolen.',
          remediations: {
              'be-dropped': { steps: ['Passive = be + V3 — "stolen" alone cannot carry voice.', '"be" takes the tense AND the new subject\'s number: has been.'] },
              'junk-agent': { steps: ['Vague agents (someone, people, they) delete — "by someone" adds nothing.', 'Keep the agent only when it carries real information.'] },
          },
          hint: 'Two jobs: keep the tense in "be", drop the vague doer.',
          misconception: 'students drop the be-auxiliary and keep junk agents — the double wound' },
        { type: 'mcq', nodeId: 'c8_gram_cbse_81_002', difficulty: 'standard',
          question: 'Can "The sun rises in the east" go passive?',
          options: [
              { text: 'No — "rises" is intransitive; nothing receives the action' },
              { text: 'Yes — "The east is risen by the sun"', reveals: 'intransitive-flip' },
              { text: 'Yes — every active has a passive', reveals: 'intransitive-flip' },
          ],
          answer: 'No — "rises" is intransitive; nothing receives the action',
          remediations: {
              'intransitive-flip': { steps: ['Passive needs an object to promote — no object, no passive.', 'Intransitive verbs (rise, sleep, happen, arrive) never take objects.', 'The test: verb + "what/whom?" — no answer → intransitive → illegal passive.'] },
          },
          hint: 'The sun rises — what? Nothing. So what could become the subject?',
          misconception: 'students move words without checking transitivity — "was happened" territory' },
        { type: 'mcq', nodeId: 'c8_gram_cbse_81_002', difficulty: 'advanced',
          question: 'Better choice for a report: "The storm destroyed the crops" or "The crops were destroyed by the storm"?',
          options: [
              { text: 'Passive — the damage is the news; the storm is already understood' },
              { text: 'Active — active is always better', reveals: 'active-reflex' },
              { text: 'Active — passive is weak writing', reveals: 'passive-taboo' },
          ],
          answer: 'Passive — the damage is the news; the storm is already understood',
          remediations: {
              'active-reflex': { steps: ['Active-first is a guideline, not a law — reports and science prefer receiver-focus.', 'Ask: what does the reader care about — the doer or the result?'] },
              'passive-taboo': { steps: ['"Passive is weak" is a myth — passive exists because the receiver often IS the story.', 'Headlines prove it: "Three injured in accident" — nobody asks by whom.'] },
          },
          hint: 'What is the sentence ABOUT — the storm or the damage?',
          misconception: 'students treat passive as a grammar-trick or a weakness, not a meaning-choice' },
        { type: 'sort', nodeId: 'c8_gram_cbse_81_001', difficulty: 'foundation',
          question: 'Sort: legal passive or impossible?',
          sortItems: [
              { id: 'a', label: 'She ate the cake → The cake was eaten', emoji: '🍰', correctBin: 'legal' },
              { id: 'b', label: 'The baby slept → The baby was slept', emoji: '😴', correctBin: 'illegal' },
              { id: 'c', label: 'They built a bridge → A bridge was built', emoji: '🌉', correctBin: 'legal' },
              { id: 'd', label: 'The train arrived → The station was arrived', emoji: '🚉', correctBin: 'illegal' },
          ],
          bins: [
              { id: 'legal', label: 'LEGAL PASSIVE', color: '#22c55e' },
              { id: 'illegal', label: 'IMPOSSIBLE (intransitive)', color: '#ef4444' },
          ],
          hint: 'No object → no passive.',
          misconception: 'students attempt passive on intransitives — the object-promotion check was skipped' },
        { type: 'subpart', nodeId: 'c8_gram_cbse_81_001', difficulty: 'advanced',
          question: 'Convert: "The police caught the thief." — build the passive step by step.',
          hint: 'Object first, then be+V3, then decide the agent\'s fate.',
          misconception: 'converts surface order without the be+V3 compound',
          parts: [
              { id: 'a', prompt: 'New subject?',
                answer: 'the thief',
                options: ['the thief', 'the police', 'caught'],
                hint: 'The object walks to the front.',
                misconception: 'keeps doer as subject' },
              { id: 'b', prompt: 'Verb form?',
                answer: 'was caught',
                options: ['was caught', 'is caught', 'caught'],
                hint: 'be carries the ORIGINAL tense (past) + V3.',
                misconception: 'tense drifts or be drops' },
              { id: 'c', prompt: 'And "the police"?',
                answer: 'by the police — keep it; the catcher is real information',
                options: ['by the police — keep it; the catcher is real information', 'delete it — all agents delete', 'by someone'],
                hint: 'Real agents may stay; only vague ones delete.',
                misconception: 'deletes informative agents or keeps vague ones' },
          ] },
    ],

    reflect: { prompts: ['When is the receiver more important than the doer?', 'What two jobs does "be" carry in every passive?'] },
    successLine: 'Clean surgery — tense intact, agents handled, and no illegal flips.',
    tryAgainLine: 'Object → be+V3 → agent decision. And check the verb CAN flip first.',
};
