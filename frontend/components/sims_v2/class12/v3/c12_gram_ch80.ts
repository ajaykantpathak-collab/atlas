import type { SimDef } from '../../engine/types';

/** v3 generated — c12_gram_ch80 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_gram_ch80: SimDef = {
    id: 'v3_c12_gram_ch80',
    title: 'Punctuation is traffic control: commas separate.',
    subtitle: 'Covers the board-tested punctuation set. Does NOT cover quotation punctuation in depth.',
    classLevel: 12, subject: 'gram', topic: 'Punctuation is traffic control: commas separate.',
    chapters: ['c12_gram_ch80'],
    nodeIds: ['c12_gram_cbse_80_001', 'c12_gram_cbse_80_002', 'c12_gram_ch80_003', 'c12_gram_ch80_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'The comma\'s limits: \'It rained, we stayed home\' is a splice — the comma cannot do a conjunction\'s job.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Punctuation is traffic control: commas.', text: 'Punctuation is traffic control: commas separate but never join clauses; semicolons join related independent clauses without a conjunction; colons introduce lists/explanations; apostrophes mark.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c12_gram_cbse_80_002', title: 'Identify each idea',
          dissect: { specimen: 'Punctuation is traffic control: commas separate.', spots: [
            { id: 's1', label: 'Punctuation is traffic control commas', prompt: 'Which idea is this? — Punctuation is traffic control: commas separate but never join clauses; semicolons join.', answer: 'Punctuation is traffic control commas', options: ['Punctuation is traffic control commas', 'Editing tasks at class 12', 'The apostrophe marks possession the', 'The boards editing task runs'] },
            { id: 's2', label: 'Editing tasks at class 12', prompt: 'Which idea is this? — Editing tasks at class 12 run a four-error inventory per passage: tense/form errors.', answer: 'Editing tasks at class 12', options: ['Editing tasks at class 12', 'Punctuation is traffic control commas', 'The apostrophe marks possession the', 'The boards editing task runs'] },
            { id: 's3', label: 'The apostrophe marks possession the', prompt: 'Which idea is this? — The apostrophe marks possession (\'the student\'s bag\', plural possessive \'the students\'.', answer: 'The apostrophe marks possession the', options: ['The apostrophe marks possession the', 'Punctuation is traffic control commas', 'Editing tasks at class 12', 'The boards editing task runs'] },
            { id: 's4', label: 'The boards editing task runs', prompt: 'Which idea is this? — The board\'s editing task runs a fixed error inventory across a passage — typically one.', answer: 'The boards editing task runs', options: ['The boards editing task runs', 'Punctuation is traffic control commas', 'Editing tasks at class 12', 'The apostrophe marks possession the'] }
          ] } },
        { type: 'build', nodeId: 'c12_gram_cbse_80_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Check each clause-join — comma alone = splice; add.', 'Colon only when what follows explains/lists what precedes.', 'Apostrophe = possession or contraction; test \'its\'.'], answer: 'Check each clause-join — comma alone = splice; add. Colon only when what follows explains/lists what precedes. Apostrophe = possession or contraction; test \'its\'.' } },
        { type: 'case', nodeId: 'c12_gram_ch80_004', title: 'You made it',
          caseStudy: { intro: 'You finished Punctuation is traffic control: commas separate. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_gram_cbse_80_001', difficulty: 'standard',
          question: 'Punctuation is traffic control: commas separate but never join clauses.',
          hint: 'Work step by step.',
          misconception: 'Students sprinkle commas as pauses (\'wherever a breath fits\'), use semicolons as super-commas, and apostrophize plurals.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Punctuation is traffic control: commas separate but never join clauses; semicolons join',
                  options: ['Punctuation is traffic control: commas separate but never join clauses; semicolons join', 'Editing tasks at class 12 run a four-error inventory per passage: tense/form errors,', 'The apostrophe marks possession (\'the student\'s bag\', plural possessive \'the students\'', 'The board\'s editing task runs a fixed error inventory across a passage'],
                  hint: 'Recall the definition.',
                  misconception: 'Students sprinkle commas as pauses (\'wherever a breath fits\'), use semicolons as super-commas, and apostrophize plurals (\'apple\'s for.' }
          ],
            remediations: { 'students-sprinkle-commas-as-pauses': { steps: ['Check each clause-join — comma alone = splice; add a conjunction or upgrade to semicolon.', 'Colon only when what follows explains/lists what precedes.', 'Apostrophe = possession or contraction; test \'its\' by expanding to \'it is\'.'] } } },
        { type: 'subpart', nodeId: 'c12_gram_cbse_80_002', difficulty: 'standard',
          question: 'Editing tasks at class 12 run a four-error inventory per passage: tense/form.',
          hint: 'Work step by step.',
          misconception: 'Students proofread for meaning instead of grammar — the passage reads fine, so they find nothing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Editing tasks at class 12 run a four-error inventory per passage: tense/form errors,',
                  options: ['Editing tasks at class 12 run a four-error inventory per passage: tense/form errors,', 'Punctuation is traffic control: commas separate but never join clauses; semicolons join', 'The apostrophe marks possession (\'the student\'s bag\', plural possessive \'the students\'', 'The board\'s editing task runs a fixed error inventory across a passage'],
                  hint: 'Recall the definition.',
                  misconception: 'Students proofread for meaning instead of grammar — the passage reads fine, so they find nothing.' }
          ],
            remediations: { 'students-proofread-for-meaning-instead': { steps: ['Read for sense once.', 'Re-audit each line against the four categories.', 'The common traps — \'didn\'t went\', proximity agreement, \'less students\', \'discuss about\', \'comprise of\'.'] } } },
        { type: 'subpart', nodeId: 'c12_gram_ch80_003', difficulty: 'standard',
          question: 'The apostrophe marks possession (\'the student\'s bag\', plural possessive \'the.',
          hint: 'Work step by step.',
          misconception: 'Students scatter apostrophes onto any word ending in s — \'the 1990\'s\', \'apple\'s\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The apostrophe marks possession (\'the student\'s bag\', plural possessive \'the students\'',
                  options: ['The apostrophe marks possession (\'the student\'s bag\', plural possessive \'the students\'', 'Punctuation is traffic control: commas separate but never join clauses; semicolons join', 'Editing tasks at class 12 run a four-error inventory per passage: tense/form errors,', 'The board\'s editing task runs a fixed error inventory across a passage'],
                  hint: 'Recall the definition.',
                  misconception: 'Students scatter apostrophes onto any word ending in s — \'the 1990\'s\', \'apple\'s\'.' }
          ],
            remediations: { 'students-scatter-apostrophes-onto-any': { steps: ['Run the expansion test: read \'it\'s\' as \'it is\' — nonsense → use \'its\'.', 'For plurals, ask \'whose?\' — no owner → no apostrophe.'] } } },
        { type: 'subpart', nodeId: 'c12_gram_ch80_004', difficulty: 'standard',
          question: 'The board\'s editing task runs a fixed error inventory across a passage.',
          hint: 'Work step by step.',
          misconception: 'Students proofread by feel — \'this sounds off\' — and miss systematic errors.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The board\'s editing task runs a fixed error inventory across a passage',
                  options: ['The board\'s editing task runs a fixed error inventory across a passage', 'Punctuation is traffic control: commas separate but never join clauses; semicolons join', 'Editing tasks at class 12 run a four-error inventory per passage: tense/form errors,', 'The apostrophe marks possession (\'the student\'s bag\', plural possessive \'the students\''],
                  hint: 'Recall the definition.',
                  misconception: 'Students proofread by feel — \'this sounds off\' — and miss systematic errors.' }
          ],
            remediations: { 'students-proofread-by-feel-this': { steps: ['Cover the passage\'s anchor tense, then scan each line for the five sins in order.', 'If you can\'t find one, the error is probably a preposition or word-form — check \'about/of/to/for\' and -s endings.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
