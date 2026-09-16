import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c10_gram_ch93 The Messenger (reported speech).
 * Nodes: c10_gram_cbse_93_001 (backshift), 93_002 (questions), 93_003 (commands). */
export const c10_gram_ch93: SimDef = {
    id: 'v3_c10_gram_ch93',
    title: 'The Messenger',
    subtitle: 'Report what was said — shift the tense, re-anchor the pointing words, kill the question mark',
    classLevel: 10, subject: 'english-grammar', topic: 'Direct and indirect speech',
    chapters: ['c10_gram_ch93'],
    nodeIds: ['c10_gram_cbse_93_001', 'c10_gram_cbse_93_002', 'c10_gram_cbse_93_003'],
    emoji: '📨', theme: { bg: 'from-slate-900 to-sky-950', accent: 'sky', scene: 'senior' },

    scenario: {
        role: 'a court reporter converting live testimony into the official record',
        intro: 'The reporter stands in a later "now" — so every tense steps back, every pointing word re-anchors, and every question mark dies. One wrong word and the record misquotes the witness.',
        goal: 'Convert statements, questions, and commands between direct and indirect speech — backshift, pronouns, deictics, all of it.',
    },
    discovery: {
        question: '"The teacher said the earth ___ round." — is or was?',
        options: [
            'is — universal truths resist backshift',
            'was — reported speech always backshifts',
            'was — the teacher spoke in the past',
            'either works the same',
        ],
        answer: 'is — universal truths resist backshift',
        hook: 'The backshift machine has one exemption: facts that are still true refuse to move.',
    },
    teaching: [
        { title: 'The backshift engine', text: 'present→past, past→past perfect, will→would, can→could — plus pronouns and deictics re-anchor to the reporter.', emoji: '⚙️', bgColor: 'from-sky-500 to-blue-600' },
        { title: 'Three sentence types, three rules', text: 'Statements take "that"; questions lose question-order and take if/whether or keep the wh-word; commands become told + object + to-infinitive.', emoji: '🧭', bgColor: 'from-blue-500 to-indigo-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c10_gram_cbse_93_001', title: 'Run the backshift',
          scaffold: {
            problem: 'Report: She said, "I will finish the project tomorrow."',
            steps: [
                { text: 'Identify speaker (she), content (will finish the project tomorrow).' },
                { text: 'Re-anchor pronouns: I → she (from the reporter\'s view).' },
                { text: 'Backshift: will → would.' },
                { text: 'Swap deictics: tomorrow → the next day.', faded: true },
                { text: 'Result: She said she would finish the project the next day.', faded: true },
                { text: 'You: He said, "I saw this film here yesterday." → He said he ___ ', blankAnswer: 'had seen that film there the day before' },
            ],
          } },
        { type: 'dissect', nodeId: 'c10_gram_cbse_93_002', title: 'De-interrogate the question',
          dissect: { specimen: 'reported questions',
          spots: [
            { id: 's1', label: 'do-support', prompt: '"Did you see it?" → "He asked if I had seen it." What happened to "did"?', answer: 'deleted — reported questions lose do-support and restore statement order', options: ['deleted — reported questions lose do-support and restore statement order', 'it became "had"', 'it moved to the end', 'it stays inside the if-clause'] },
            { id: 's2', label: 'if/whether', prompt: 'When does "if/whether" appear?', answer: 'for yes/no questions — wh-questions keep their wh-word as connector instead', options: ['for yes/no questions — wh-questions keep their wh-word as connector instead', 'for all reported questions', 'only for wh-questions', 'when the answer is unknown'] },
            { id: 's3', label: 'question mark', prompt: '"She asked where I was going?" — what is wrong?', answer: 'the question mark must go — a reported question is a statement', options: ['the question mark must go — a reported question is a statement', 'nothing is wrong', 'where should be that', 'asked should be said'] },
          ] } },
        { type: 'case', nodeId: 'c10_gram_cbse_93_003', title: 'Command force',
          caseStudy: {
            intro: 'The frame is fixed: reporting verb + object + to-infinitive. The only real choice is WHICH verb carries the original\'s force.',
            decisions: [
              { prompt: '"Do not pluck the flowers," the gardener said to the children. Report it.', options: [
                  { text: 'The gardener ordered the children not to pluck the flowers.', outcome: 'Correct — authority → ordered; not + to-infinitive; object filled.' },
                  { text: 'The gardener said that do not pluck the flowers.', outcome: 'English forbids "that" + imperative — commands need the told + object + to-infinitive frame.', reveals: 'imperative-that' },
                  { text: 'The gardener ordered to not pluck the flowers.', outcome: 'Missing the object — who is being commanded? English demands the slot be filled.', reveals: 'object-missing' },
                ] },
              { prompt: '"Please help me carry this," she said. Report it.', options: [
                  { text: 'She requested me to help her carry that.', outcome: 'Correct — "please" dissolves into "requested"; me→her; this→that.' },
                  { text: 'She asked me to please help her carry this.', outcome: '"Please" is a live-performance word — it cannot survive reporting. It converts into the reporting verb.', reveals: 'please-survives' },
                ] },
            ],
          } },
        { type: 'build', nodeId: 'c10_gram_cbse_93_002', title: 'Assemble the reported question',
          build: {
            prompt: 'Order the blocks: "asked / where / she / me / had gone / I"',
            blocks: ['asked', 'where', 'she', 'me', 'had gone', 'I'],
            answer: 'she asked me where I had gone',
          } },
        { type: 'drill', nodeId: 'c10_gram_cbse_93_001', title: 'Backshift speed round', drill: { kind: 'fill', count: 4, level: 4 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c10_gram_cbse_93_001', difficulty: 'standard',
          question: 'Report: She said, "I will finish the project tomorrow."',
          options: [
              { text: 'She said she would finish the project the next day.' },
              { text: 'She said she will finish the project tomorrow.', reveals: 'partial-shift' },
              { text: 'She said she would finish the project tomorrow.', reveals: 'deictic-blind' },
          ],
          answer: 'She said she would finish the project the next day.',
          remediations: {
              'partial-shift': { steps: ['Reporting re-anchors EVERYTHING — not just the verb.', 'Checklist: pronouns, tense, deictics (now→then, today→that day, tomorrow→the next day).', 'Read the result as the reporter would hear it — "tomorrow" from a later now is wrong.'] },
              'deictic-blind': { steps: ['You shifted the verb but left the pointing word.', 'tomorrow→the next day, today→that day, here→there, this→that — the full swap list.'] },
          },
          hint: 'Three things shift: verb, pronouns, pointing words. Check all three.',
          misconception: 'partial transforms — backshifting the verb but leaving deictics anchored to the original speaker' },
        { type: 'mcq', nodeId: 'c10_gram_cbse_93_002', difficulty: 'standard',
          question: 'Report: "Where did you go?" she asked me.',
          options: [
              { text: 'She asked me where I had gone.' },
              { text: 'She asked me where did I go.', reveals: 'question-order' },
              { text: 'She asked me that where I had gone.', reveals: 'that-glue' },
          ],
          answer: 'She asked me where I had gone.',
          remediations: {
              'question-order': { steps: ['Reported questions are statements inside — question order dies.', 'Delete do/does/did, restore subject-verb order, backshift: did you go → you had gone.', 'The wh-word survives as connector; the question grammar does not.'] },
              'that-glue': { steps: ['"that" joins statements only — wh-questions keep their own wh-word as connector.', 'No "that" + wh-word: "asked where", never "asked that where".'] },
          },
          hint: 'Inside the report, is it still a question?',
          misconception: 'students quote the question verbatim — question order and do-support survive into reporting' },
        { type: 'mcq', nodeId: 'c10_gram_cbse_93_001', difficulty: 'advanced',
          question: 'Report: "The earth revolves around the sun," the teacher said.',
          options: [
              { text: 'The teacher said the earth revolves around the sun.' },
              { text: 'The teacher said the earth revolved around the sun.', reveals: 'over-shift' },
          ],
          answer: 'The teacher said the earth revolves around the sun.',
          remediations: {
              'over-shift': { steps: ['Universal truths and permanent facts resist backshift — the earth still revolves.', 'Ask: is it still true? If yes, the tense may stay present.', 'Backshift describes what was said THEN; truths live outside then.'] },
          },
          hint: 'Is it still true today?',
          misconception: 'mechanical over-shifting — applying the table without the universal-truth exemption' },
        { type: 'mcq', nodeId: 'c10_gram_cbse_93_003', difficulty: 'advanced',
          question: 'Report: "Never swim alone," the coach said to the boys.',
          options: [
              { text: 'The coach warned the boys never to swim alone.' },
              { text: 'The coach warned never to swim alone.', reveals: 'object-missing' },
              { text: 'The coach said that never swim alone.', reveals: 'imperative-that' },
          ],
          answer: 'The coach warned the boys never to swim alone.',
          remediations: {
              'object-missing': { steps: ['Imperative reporting requires a commanded party — told/ordered/warned WHOM?', 'The object slot is mandatory: verb + object + to-infinitive.'] },
              'imperative-that': { steps: ['"that" cannot glue an imperative — commands convert to to-infinitive.', 'Frame: reporting verb + object + (not) to + base verb.'] },
          },
          hint: 'Who is being commanded? That slot cannot be empty.',
          misconception: 'students drop the object or glue imperatives with "that" — the two fatal frame errors' },
        { type: 'order', nodeId: 'c10_gram_cbse_93_002', difficulty: 'standard',
          question: 'Order the conversion steps for reporting a question:',
          sortItems: [
              { id: 's1', label: 'Pick the connector — if/whether (yes/no) or the wh-word', emoji: '🔗', correctBin: 'p1' },
              { id: 's2', label: 'Delete do/does/did, restore statement order', emoji: '🧹', correctBin: 'p2' },
              { id: 's3', label: 'Backshift the tense', emoji: '⏪', correctBin: 'p3' },
              { id: 's4', label: 'Drop the question mark', emoji: '❌', correctBin: 'p4' },
          ],
          bins: [
              { id: 'p1', label: '1', color: '#0ea5e9' },
              { id: 'p2', label: '2', color: '#6366f1' },
              { id: 'p3', label: '3', color: '#8b5cf6' },
              { id: 'p4', label: '4', color: '#22c55e' },
          ],
          hint: 'Connector first, then de-interrogate, then shift, then punctuate.',
          misconception: 'students backshift before de-interrogating — question order survives' },
        { type: 'subpart', nodeId: 'c10_gram_cbse_93_003', difficulty: 'advanced',
          question: '"Please do not touch the wet paint," the caretaker said to the visitors.',
      hint: 'Work the parts in order — each answer feeds the next.',
      misconception: 'rushes to the final answer without building the chain',
          parts: [
              { id: 'a', prompt: 'Which reporting verb matches the force?',
                answer: 'warned/requested',
                options: ['warned/requested', 'said', 'asked that'],
                hint: 'A caution about danger → warned; "please" tilts it toward requested — either defensible.',
                misconception: 'neutral-verbs everything, losing the original\'s force' },
              { id: 'b', prompt: 'Where does "not" sit in the frame?',
                answer: 'before "to" — not to touch',
                options: ['before "to" — not to touch', 'after "to" — to not touch'],
                hint: 'Boards prefer the unsplit form: not + to-infinitive.',
                misconception: 'splits the infinitive with not' },
              { id: 'c', prompt: 'Write the full reported sentence.',
                answer: 'The caretaker warned/requested the visitors not to touch the wet paint.',
                options: ['The caretaker warned/requested the visitors not to touch the wet paint.', 'The caretaker said the visitors that do not touch the wet paint.', 'The caretaker told to not touch the wet paint.'],
                hint: 'Frame: warned + the visitors + not to touch.',
                misconception: 'frame incomplete — object or not-placement wrong' },
          ] },
    ],

    reflect: { prompts: ['What dies when a question gets reported — and what survives as connector?', 'When does backshift get an exemption?'] },
    successLine: 'Your reported speech reads like a court record — every tense, pronoun, and pointing word correctly re-anchored.',
    tryAgainLine: 'Partial shifts again — verb AND pronouns AND pointing words, all three move.',
};
