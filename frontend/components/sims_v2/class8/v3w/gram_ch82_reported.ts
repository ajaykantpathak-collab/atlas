import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c8_gram_ch82 The Reporter's Camera (reported speech intro).
 * Nodes: c8_gram_cbse_82_001, 82_002. */
export const c8_gram_ch82: SimDef = {
    id: 'v3_c8_gram_ch82',
    title: "The Reporter's Camera",
    subtitle: 'Retell what was said — the tense steps back, the pronouns re-anchor, and the pointing words move',
    classLevel: 8, subject: 'english-grammar', topic: 'Direct and indirect speech — statements, questions, commands',
    chapters: ['c8_gram_ch82'],
    nodeIds: ['c8_gram_cbse_82_001', 'c8_gram_cbse_82_002'],
    emoji: '🎥', theme: { bg: 'from-slate-900 to-sky-950', accent: 'sky', scene: 'junior' },

    scenario: {
        role: 'a reporter who must retell quotes without quoting them',
        intro: 'When you report speech, the camera moves — from the speaker\'s "now" to your "now". Every tense, pronoun, and pointing word must re-anchor, or the record misquotes.',
        goal: 'Convert statements, questions, and commands direct→indirect with the full three-part shift — and choose said/told correctly.',
    },
    discovery: {
        question: '"I will come tomorrow," he said → reported, it becomes…?',
        options: [
            'He said he would come the next day — verb, pronoun, AND time-word all shift',
            'He said he will come tomorrow — just remove the quotes',
            'He said that I will come the next day',
            'He told that he would come tomorrow',
        ],
        answer: 'He said he would come the next day — verb, pronoun, AND time-word all shift',
        hook: 'Half-shifts are the classic error: the verb moved but tomorrow stayed glued to the speaker\'s "now".',
    },
    teaching: [
        { title: 'The three-part shift', text: 'Tense steps back (will→would), pronouns re-anchor (I→he/she), pointing words move (now→then, today→that day, here→there).', emoji: '🔄', bgColor: 'from-sky-500 to-blue-600' },
        { title: 'Three frames, three fates', text: 'Statement → that. Yes/no question → if/whether + statement order. Command → told + object + to-infinitive.', emoji: '🖼️', bgColor: 'from-blue-500 to-indigo-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c8_gram_cbse_82_001', title: 'Run the full shift',
          scaffold: {
            problem: 'Report: "I have finished my work today," Ravi said to his mother.',
            steps: [
                { text: 'Pronouns re-anchor: I → he, my → his.' },
                { text: 'Tense backshift: have finished → had finished.' },
                { text: 'Deictics: today → that day.', faded: true },
                { text: 'Result: Ravi told his mother that he had finished his work that day.', faded: true },
                { text: 'You: "I will come tomorrow," she said → she said ___', blankAnswer: 'she would come the next day' },
            ],
          } },
        { type: 'dissect', nodeId: 'c8_gram_cbse_82_002', title: 'The question dies',
          dissect: { specimen: 'reported questions and commands',
          spots: [
            { id: 's1', label: 'de-interrogate', prompt: '"Did she come?" → "He asked if she had come." What died?', answer: 'the question grammar — did-support deleted, statement order returned, question mark gone', options: ['the question grammar — did-support deleted, statement order returned, question mark gone', 'only the question mark', 'the tense only', 'nothing changed'] },
            { id: 's2', label: 'if-glue', prompt: 'When does "if/whether" appear?', answer: 'for yes/no questions — wh-questions keep their own wh-word', options: ['for yes/no questions — wh-questions keep their own wh-word', 'for all questions', 'for commands', 'when unsure'] },
            { id: 's3', label: 'object', prompt: '"He told to sit down." — what is missing?', answer: 'the object — told WHOM? Commands need told + object + to-infinitive', options: ['the object — told WHOM? Commands need told + object + to-infinitive', 'that — told that', 'please', 'nothing'] },
          ] } },
        { type: 'case', nodeId: 'c8_gram_cbse_82_001', title: 'Said or told?',
          caseStudy: {
            intro: '"said" and "told" are not interchangeable — "told" demands a listener object.',
            decisions: [
              { prompt: '"She ___ me that she was leaving." said or told?', options: [
                  { text: 'told — "told me" needs the object; "said me" is illegal', outcome: 'Correct — told + object; said cannot take "me" directly.' },
                  { text: 'said — said and told are the same', outcome: '"said me" is a classic Indian-English slip — told carries the listener.', reveals: 'said-told' },
                ] },
              { prompt: '"Please wait here," the teacher said. Report it.', options: [
                  { text: 'The teacher requested us to wait there.', outcome: 'Correct — "please" dissolves into "requested"; here→there.' },
                  { text: 'The teacher said that please wait here.', outcome: '"that" cannot glue an imperative — and "please" cannot survive reporting.', reveals: 'imperative-that' },
                ] },
            ],
          } },
        { type: 'drill', nodeId: 'c8_gram_cbse_82_001', title: 'Backshift speed round', drill: { kind: 'fill', count: 4, level: 3 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c8_gram_cbse_82_001', difficulty: 'standard',
          question: 'Report: "I will come tomorrow," he said.',
          options: [
              { text: 'He said he would come the next day.' },
              { text: 'He said he will come tomorrow.', reveals: 'no-shift' },
              { text: 'He said he would come tomorrow.', reveals: 'deictic-left' },
          ],
          answer: 'He said he would come the next day.',
          remediations: {
              'no-shift': { steps: ['Reporting re-anchors EVERYTHING — verb, pronouns, and pointing words.', 'Checklist: will→would, I→he, tomorrow→the next day.'] },
              'deictic-left': { steps: ['You shifted the verb but left the pointing word — "tomorrow" belongs to the speaker\'s now.', 'Deictic list: now→then, today→that day, tomorrow→the next day, here→there, this→that.'] },
          },
          hint: 'Three things move: verb, pronouns, pointing words. Count them.',
          misconception: 'partial shifts — verb moves but deictics stay anchored to the speaker' },
        { type: 'mcq', nodeId: 'c8_gram_cbse_82_002', difficulty: 'standard',
          question: 'Report: "Where have you been?" mother asked.',
          options: [
              { text: 'Mother asked where I had been.' },
              { text: 'Mother asked where had I been.', reveals: 'question-order' },
              { text: 'Mother asked that where I had been.', reveals: 'that-glue' },
          ],
          answer: 'Mother asked where I had been.',
          remediations: {
              'question-order': { steps: ['Inside the report, the question is dead — statement order returns.', 'wh-word kept as connector; "have I" flattens to "I had".'] },
              'that-glue': { steps: ['"that" joins statements only — wh-questions use their own wh-word as connector.', 'Never "asked that where".'] },
          },
          hint: 'Does question order survive reporting?',
          misconception: 'students quote the question verbatim inside the report frame' },
        { type: 'mcq', nodeId: 'c8_gram_cbse_82_002', difficulty: 'advanced',
          question: 'Report: "Don\'t touch the fence," the guard said to us.',
          options: [
              { text: 'The guard told/ordered us not to touch the fence.' },
              { text: 'The guard told to not touch the fence.', reveals: 'object-missing' },
              { text: 'The guard said that don\'t touch the fence.', reveals: 'imperative-that' },
          ],
          answer: 'The guard told/ordered us not to touch the fence.',
          remediations: {
              'object-missing': { steps: ['Imperative reporting requires the commanded party — told WHOM?', 'Frame: reporting verb + object + (not) to-infinitive.'] },
              'imperative-that': { steps: ['"that" cannot glue an imperative — commands become to-infinitives.', '"Don\'t touch" → "not to touch" — the negative sits before "to".'] },
          },
          hint: 'Who is being commanded? The object slot cannot be empty.',
          misconception: 'students glue imperatives with "that" or drop the object — the two fatal frame errors' },
        { type: 'order', nodeId: 'c8_gram_cbse_82_001', difficulty: 'standard',
          question: 'Order the conversion steps for a statement:',
          sortItems: [
              { id: 's1', label: 'Re-anchor pronouns to the reporter', emoji: '👤', correctBin: 'p1' },
              { id: 's2', label: 'Backshift the tense one step', emoji: '⏪', correctBin: 'p2' },
              { id: 's3', label: 'Swap the pointing words', emoji: '🧭', correctBin: 'p3' },
              { id: 's4', label: 'Read it as the reporter would hear it', emoji: '👂', correctBin: 'p4' },
          ],
          bins: [
              { id: 'p1', label: '1', color: '#0ea5e9' },
              { id: 'p2', label: '2', color: '#6366f1' },
              { id: 'p3', label: '3', color: '#8b5cf6' },
              { id: 'p4', label: '4', color: '#22c55e' },
          ],
          hint: 'Pronouns, tense, deictics — then sanity-check.',
          misconception: 'students backshift the verb first and forget pronouns and deictics entirely' },
        { type: 'subpart', nodeId: 'c8_gram_cbse_82_002', difficulty: 'advanced',
          question: 'Report: "Do you like cricket?" he asked me.',
          hint: 'Yes/no questions take a special connector.',
          misconception: 'keeps do-support inside the reported frame',
          parts: [
              { id: 'a', prompt: 'Yes/no questions take which connector?',
                answer: 'if / whether',
                options: ['if / whether', 'that', 'the wh-word'],
                hint: 'No wh-word exists — yes/no needs if or whether.',
                misconception: 'glues with that' },
              { id: 'b', prompt: 'What happens to "do"?',
                answer: 'deleted — do-support dies in reported questions',
                options: ['deleted — do-support dies in reported questions', 'it becomes "did"', 'it moves to the end'],
                hint: 'Question grammar cannot survive reporting.',
                misconception: 'do-support survives' },
              { id: 'c', prompt: 'Write the full reported sentence.',
                answer: 'He asked me if I liked cricket.',
                options: ['He asked me if I liked cricket.', 'He asked me that did I like cricket.', 'He asked me do I like cricket.'],
                hint: 'asked + object + if + statement order + backshift.',
                misconception: 'question order or do-support leaks through' },
          ] },
    ],

    reflect: { prompts: ['Which shift do you forget — pronouns or pointing words?', 'Why does "please" die in reporting?'] },
    successLine: 'Your reports re-anchor everything — the camera moved and nothing was left behind.',
    tryAgainLine: 'Three moves, every time: pronouns, tense, pointing words.',
};
