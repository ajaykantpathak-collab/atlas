import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch90 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch90: SimDef = {
    id: 'v3_c10_engl_ch90',
    title: 'The Class 10 formal letter carries a fixed.',
    subtitle: 'This node covers the board-level formal letter skeleton. Register upgrades and the body\'s.',
    classLevel: 10, subject: 'engl', topic: 'The Class 10 formal letter carries a fixed.',
    chapters: ['c10_engl_ch90'],
    nodeIds: ['c10_engl_cbse_90_001', 'c10_engl_cbse_90_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '1. The top block tells the receiver who is writing and how to reply — your address, then the date. 2.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'The Class 10 formal letter carries a.', text: 'The Class 10 formal letter carries a fixed eight-element skeleton worth dedicated format marks: sender\'s address → date → receiver\'s address → salutation → subject line → body → subscription (\'Yours.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_90_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_90_001', title: 'The Class 10 formal letter carries a.',
          caseStudy: { intro: '1. The top block tells the receiver who is writing and how to reply — your address, then the date. 2.',
            decisions: [{ prompt: 'Write the subject line for a complaint to the MCD about garbage not collected for two weeks.', options: [
                { text: 'Something like \'Subject: Non-collection of garbage in Ward 12\'', outcome: 'Something like \'Subject: Non-collection of garbage in Ward 12\' — one line naming the exact purpose.' },
                { text: 'content rescues a broken skeleton', outcome: 'Not quite — Students believe content rescues a broken skeleton — \'the letter was good, so format can\'t matter\'.', reveals: 'content-rescues-a-broken-skeleton' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_90_002', title: 'Formal register at board level bans.',
          caseStudy: { intro: '1. Contrast two openings: \'I wanna complain about the garbage — it\'s really bad and smells gross!!\' vs \'Through this letter, I wish to draw your attention.',
            decisions: [{ prompt: 'Fix the register: \'I\'m writing coz the streetlight near my house hasn\'t worked for like two weeks and it\'s super annoying.\'', options: [
                { text: '\'I am writing to report that the streetlight near my residence has been non-functional', outcome: '\'I am writing to report that the streetlight near my residence has been non-functional for two.' },
                { text: 'feeling strengthens a complaint', outcome: 'Not quite — Students think feeling strengthens a complaint — exclamation marks, \'super annoying\', \'insane\'.', reveals: 'feeling-strengthens-a-complaint-exclamation' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_90_002', title: 'You made it',
          caseStudy: { intro: 'You finished The Class 10 formal letter carries a fixed. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_90_001', difficulty: 'standard',
          question: 'The Class 10 formal letter carries a fixed eight-element skeleton worth.',
          hint: 'Work step by step.',
          misconception: 'Students believe content rescues a broken skeleton — \'the letter was good, so format can\'t matter\'.',
          parts: [
                { id: 'a', prompt: 'Write the subject line for a complaint to the MCD about garbage not collected for two weeks.', answer: 'Something like \'Subject: Non-collection of garbage in Ward 12\'',
                  options: ['Something like \'Subject: Non-collection of garbage in Ward 12\'', 'content rescues a broken skeleton'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students believe content rescues a broken skeleton — \'the letter was good, so format can\'t matter\'.' },
                { id: 'b', prompt: 'What is missing: [letter with sender\'s address, date, salutation \'Dear Sir\', body, \'Yours sincerely\', name]?', answer: 'The receiver\'s address and the subject line',
                  options: ['The receiver\'s address and the subject line', 'content rescues a broken skeleton'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students believe content rescues a broken skeleton — \'the letter was good, so format can\'t matter\'.' }
          ],
            remediations: { 'content-rescues-a-broken-skeleton': { steps: ['List the eight elements and tick each off in order.', 'Most losses are mechanical — a skipped subject, a misplaced date.', 'The body can be excellent; the marks leak through the skeleton.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_90_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe content rescues a broken skeleton — \'the letter was good, so format can\'t matter\'.',
          parts: [
                { id: 'a', prompt: 'True or False: Every missing element is a mark thrown away before content is even read.', answer: 'True — the marking scheme awards format marks per element',
                  options: ['True — the marking scheme awards format marks per element', 'content rescues a broken skeleton'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students believe content rescues a broken skeleton — \'the letter was good, so format can\'t matter\'.' }
          ],
            remediations: { 'content-rescues-a-broken-skeleton': { steps: ['List the eight elements and tick each off in order.', 'Most losses are mechanical — a skipped subject, a misplaced date.', 'The body can be excellent; the marks leak through the skeleton.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_90_002', difficulty: 'standard',
          question: 'Formal register at board level bans contractions, slang, exclamation marks.',
          hint: 'Work step by step.',
          misconception: 'Students think feeling strengthens a complaint — exclamation marks, \'super annoying\', \'insane\'.',
          parts: [
                { id: 'a', prompt: 'Is \'I would be grateful if you could look into this\' appropriate as a request line?', answer: 'Yes — it is the polite conditional construction formal register expects',
                  options: ['Yes — it is the polite conditional construction formal register expects', 'feeling strengthens a complaint'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think feeling strengthens a complaint — exclamation marks, \'super annoying\', \'insane\'.' }
          ],
            remediations: { 'feeling-strengthens-a-complaint-exclamation': { steps: ['Sweep for the banned list: contractions, slang, exclamation marks, vague intensifiers, emotive asides.', 'Rewrite each flagged phrase plainly and turn demands into polite conditionals.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
