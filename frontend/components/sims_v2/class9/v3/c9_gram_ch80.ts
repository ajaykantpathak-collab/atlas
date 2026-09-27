import type { SimDef } from '../../engine/types';

/** v3 generated — c9_gram_ch80 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_gram_ch80: SimDef = {
    id: 'v3_c9_gram_ch80',
    title: 'CBSE class 9 tests tense through gap-fills and.',
    subtitle: 'Covers the board-tested tense applications. Does NOT cover the full 12-cell theory (class.',
    classLevel: 9, subject: 'gram', topic: 'CBSE class 9 tests tense through gap-fills and.',
    chapters: ['c9_gram_ch80'],
    nodeIds: ['c9_gram_cbse_80_001', 'c9_gram_cbse_80_002', 'c9_gram_ch80_003', 'c9_gram_ch80_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'The exam pattern: every tense item hides a marker. \'I ___ here since 2019\' — \'since\' demands perfect.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'CBSE class 9 tests tense through.', text: 'CBSE class 9 tests tense through gap-fills and editing, not definitions: the examiners\' tools are time-markers (since, for, by the time, while, already, yet), stative verbs (know, believe, own —.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c9_gram_ch80_003', title: 'Narrative tense consistency is the rule.',
          caseStudy: { intro: '1. Find the anchor: \'Last Sunday, we decided…\' — the whole narrative lives in past. 2. Track every verb: \'we decided, packed, left\' — all past.',
            decisions: [{ prompt: '\'She walked into the room and sits down\' — what\'s wrong?', options: [
                { text: 'Anchor is past (\'walked\')', outcome: 'Anchor is past (\'walked\') — \'sits\' broke the contract; fix to \'sat\'.' },
                { text: 'consistency means \'same verb form everywhere\' and flag licensed shifts as errors', outcome: 'Not quite — Students think consistency means \'same verb form everywhere\' and flag licensed shifts as errors.', reveals: 'consistency-means-same-verb-form' }
            ] }] } },
        { type: 'case', nodeId: 'c9_gram_ch80_003', title: 'Narrative tense consistency is the rule.',
          caseStudy: { intro: '1. Find the anchor: \'Last Sunday, we decided…\' — the whole narrative lives in past. 2. Track every verb: \'we decided, packed, left\' — all past.',
            decisions: [{ prompt: '\'She walked into the room and sits down\' — what\'s wrong?', options: [
                { text: 'Anchor is past (\'walked\')', outcome: 'Anchor is past (\'walked\') — \'sits\' broke the contract; fix to \'sat\'.' },
                { text: 'consistency means \'same verb form everywhere\' and flag licensed shifts as errors', outcome: 'Not quite — Students think consistency means \'same verb form everywhere\' and flag licensed shifts as errors.', reveals: 'consistency-means-same-verb-form' }
            ] }] } },
        { type: 'dissect', nodeId: 'c9_gram_cbse_80_002', title: 'Identify each idea',
          dissect: { specimen: 'CBSE class 9 tests tense through gap-fills and.', spots: [
            { id: 's1', label: 'CBSE class 9 tests tense', prompt: 'Which idea is this? — CBSE class 9 tests tense through gap-fills and editing, not definitions: the examiners\'.', answer: 'CBSE class 9 tests tense', options: ['CBSE class 9 tests tense', 'Editing tasks test the same', 'Narrative tense consistency is the', 'Do-support is the auxiliary system'] },
            { id: 's2', label: 'Editing tasks test the same', prompt: 'Which idea is this? — Editing tasks test the same tense sins in disguise: wrong form for the marker, double.', answer: 'Editing tasks test the same', options: ['Editing tasks test the same', 'CBSE class 9 tests tense', 'Narrative tense consistency is the', 'Do-support is the auxiliary system'] },
            { id: 's3', label: 'Narrative tense consistency is the', prompt: 'Which idea is this? — Narrative tense consistency is the rule that a passage anchored in a time must keep its.', answer: 'Narrative tense consistency is the', options: ['Narrative tense consistency is the', 'CBSE class 9 tests tense', 'Editing tasks test the same', 'Do-support is the auxiliary system'] },
            { id: 's4', label: 'Do-support is the auxiliary system', prompt: 'Which idea is this? — Do-support is the auxiliary system English uses for questions and negatives in simple.', answer: 'Do-support is the auxiliary system', options: ['Do-support is the auxiliary system', 'CBSE class 9 tests tense', 'Editing tasks test the same', 'Narrative tense consistency is the'] }
          ] } },
        { type: 'case', nodeId: 'c9_gram_ch80_004', title: 'You made it',
          caseStudy: { intro: 'You finished CBSE class 9 tests tense through gap-fills and. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c9_gram_cbse_80_001', difficulty: 'standard',
          question: 'CBSE class 9 tests tense through gap-fills and editing, not definitions: the.',
          hint: 'Work step by step.',
          misconception: 'Students choose tense by translating from Hindi — \'main 2019 se yahan hoon\' produces \'I am here since 2019\' — and miss.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'CBSE class 9 tests tense through gap-fills and editing, not definitions: the examiners\'',
                  options: ['CBSE class 9 tests tense through gap-fills and editing, not definitions: the examiners\'', 'Editing tasks test the same tense sins in disguise: wrong form for the marker, double', 'Narrative tense consistency is the rule that a passage anchored in a time must keep its', 'Do-support is the auxiliary system English uses for questions and negatives in simple'],
                  hint: 'Recall the definition.',
                  misconception: 'Students choose tense by translating from Hindi — \'main 2019 se yahan hoon\' produces \'I am here since 2019\' — and miss that English encodes.' }
          ],
            remediations: { 'students-choose-tense-by-translating': { steps: ['Underline every time expression before choosing.', 'Match marker → licensed form (since/for → perfect family; while → continuous; by the time/before → past perfect.', 'Check the verb can take the form (statives refuse -ing).'] } } },
        { type: 'subpart', nodeId: 'c9_gram_cbse_80_002', difficulty: 'standard',
          question: 'Editing tasks test the same tense sins in disguise: wrong form for the marker.',
          hint: 'Work step by step.',
          misconception: 'Students hunt for spelling errors in editing tasks and miss tense errors entirely — they don\'t know what pattern.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Editing tasks test the same tense sins in disguise: wrong form for the marker, double',
                  options: ['Editing tasks test the same tense sins in disguise: wrong form for the marker, double', 'CBSE class 9 tests tense through gap-fills and editing, not definitions: the examiners\'', 'Narrative tense consistency is the rule that a passage anchored in a time must keep its', 'Do-support is the auxiliary system English uses for questions and negatives in simple'],
                  hint: 'Recall the definition.',
                  misconception: 'Students hunt for spelling errors in editing tasks and miss tense errors entirely — they don\'t know what pattern to look for.' }
          ],
            remediations: { 'students-hunt-for-spelling-errors': { steps: ['Read the line for its time-zone and markers.', 'Audit the verb — correct form for the marker? auxiliary present?', 'After did/didn\'t/does — verb back to base form.', 'Same time-zone = same tense family.'] } } },
        { type: 'subpart', nodeId: 'c9_gram_ch80_003', difficulty: 'standard',
          question: 'Narrative tense consistency is the rule that a passage anchored in a time must.',
          hint: 'Work step by step.',
          misconception: 'Students think consistency means \'same verb form everywhere\' and flag licensed shifts as errors.',
          parts: [
                { id: 'a', prompt: '\'She walked into the room and sits down\' — what\'s wrong?', answer: 'Anchor is past (\'walked\')',
                  options: ['Anchor is past (\'walked\')', 'consistency means \'same verb form everywhere\' and flag licensed shifts as errors'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think consistency means \'same verb form everywhere\' and flag licensed shifts as errors.' },
                { id: 'b', prompt: 'In \'He told me that the sun rises in the east\', why is \'rises\' not an error?', answer: 'Universal truths keep the present tense even inside past narration',
                  options: ['Universal truths keep the present tense even inside past narration', 'consistency means \'same verb form everywhere\' and flag licensed shifts as errors'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think consistency means \'same verb form everywhere\' and flag licensed shifts as errors.' },
                { id: 'c', prompt: '\'We went to the fair and eat ice cream\' — fix it.', answer: '\'ate\' — the past anchor governs all narrative verbs',
                  options: ['\'ate\' — the past anchor governs all narrative verbs', 'consistency means \'same verb form everywhere\' and flag licensed shifts as errors'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think consistency means \'same verb form everywhere\' and flag licensed shifts as errors.' },
                { id: 'd', prompt: 'How do you find the error in a tense-consistency editing task?', answer: 'Locate the anchor tense, then check each verb against it',
                  options: ['Locate the anchor tense, then check each verb against it', 'consistency means \'same verb form everywhere\' and flag licensed shifts as errors'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think consistency means \'same verb form everywhere\' and flag licensed shifts as errors.' }
          ],
            remediations: { 'consistency-means-same-verb-form': { steps: ['Mark the anchor first, then scan verbs one by one.', 'For each odd one, ask: is it a flashback or a timeless truth?', 'If neither, it broke the contract — fix it to the anchor tense.'] } } },
        { type: 'subpart', nodeId: 'c9_gram_ch80_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think consistency means \'same verb form everywhere\' and flag licensed shifts as errors.',
          parts: [
                { id: 'a', prompt: 'True or False: Every verb in a past-tense story must be past tense.', answer: 'False — flashbacks (had done) and timeless truths (present) are licensed shifts',
                  options: ['False — flashbacks (had done) and timeless truths (present) are licensed shifts', 'consistency means \'same verb form everywhere\' and flag licensed shifts as errors'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think consistency means \'same verb form everywhere\' and flag licensed shifts as errors.' }
          ],
            remediations: { 'consistency-means-same-verb-form': { steps: ['Mark the anchor first, then scan verbs one by one.', 'For each odd one, ask: is it a flashback or a timeless truth?', 'If neither, it broke the contract — fix it to the anchor tense.'] } } },
        { type: 'subpart', nodeId: 'c9_gram_ch80_004', difficulty: 'standard',
          question: 'Do-support is the auxiliary system English uses for questions and negatives.',
          hint: 'Work step by step.',
          misconception: 'Students keep the main verb\'s inflection — \'Does she plays\', \'Did you went\' — treating do as decoration.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Do-support is the auxiliary system English uses for questions and negatives in simple',
                  options: ['Do-support is the auxiliary system English uses for questions and negatives in simple', 'CBSE class 9 tests tense through gap-fills and editing, not definitions: the examiners\'', 'Editing tasks test the same tense sins in disguise: wrong form for the marker, double', 'Narrative tense consistency is the rule that a passage anchored in a time must keep its'],
                  hint: 'Recall the definition.',
                  misconception: 'Students keep the main verb\'s inflection — \'Does she plays\', \'Did you went\' — treating do as decoration.' }
          ],
            remediations: { 'students-keep-the-main-verb': { steps: ['Ask: who carries the tense?', 'If do/does/did is present, strip the main verb to its base form — the helper already owns tense and agreement.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
