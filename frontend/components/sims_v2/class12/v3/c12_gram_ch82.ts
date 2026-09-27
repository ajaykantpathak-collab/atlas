import type { SimDef } from '../../engine/types';

/** v3 generated — c12_gram_ch82 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_gram_ch82: SimDef = {
    id: 'v3_c12_gram_ch82',
    title: 'Senior reported speech handles the leftovers.',
    subtitle: 'Covers exclamations, embedded/indirect questions, and verb choice.',
    classLevel: 12, subject: 'gram', topic: 'Senior reported speech handles the leftovers.',
    chapters: ['c12_gram_ch82'],
    nodeIds: ['c12_gram_cbse_82_001', 'c12_gram_ch82_002', 'c12_gram_ch82_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Embedded questions are the trap: \'Do you know where does he live?\' is WRONG — inside the noun clause.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Senior reported speech handles the.', text: 'Senior reported speech handles the leftovers: exclamations → \'exclaimed that\' with the exclamation flattened (\'What a shot!\' → \'exclaimed that it was a great shot\'); questions embedded inside.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c12_gram_ch82_002', title: 'Identify each idea',
          dissect: { specimen: 'Senior reported speech handles the leftovers.', spots: [
            { id: 's1', label: 'Senior reported speech handles the', prompt: 'Which idea is this? — Senior reported speech handles the leftovers: exclamations → \'exclaimed that\' with the.', answer: 'Senior reported speech handles the', options: ['Senior reported speech handles the', 'Reporting exclamations wishes and optatives', 'Mixed and minor sentence-types report'] },
            { id: 's2', label: 'Reporting exclamations wishes and optatives', prompt: 'Which idea is this? — Reporting exclamations, wishes, and optatives converts them to statements: exclamations.', answer: 'Reporting exclamations wishes and optatives', options: ['Reporting exclamations wishes and optatives', 'Senior reported speech handles the', 'Mixed and minor sentence-types report'] },
            { id: 's3', label: 'Mixed and minor sentence-types report', prompt: 'Which idea is this? — Mixed and minor sentence-types report through their own frames: suggestions (\'Let\'s…\'.', answer: 'Mixed and minor sentence-types report', options: ['Mixed and minor sentence-types report', 'Senior reported speech handles the', 'Reporting exclamations wishes and optatives'] }
          ] } },
        { type: 'case', nodeId: 'c12_gram_ch82_003', title: 'You made it',
          caseStudy: { intro: 'You finished Senior reported speech handles the leftovers. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_gram_cbse_82_001', difficulty: 'standard',
          question: 'Senior reported speech handles the leftovers: exclamations → \'exclaimed that\'.',
          hint: 'Work step by step.',
          misconception: 'Students keep inversion inside embedded questions (\'I don\'t know where is he\') and report exclamations by quoting them.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Senior reported speech handles the leftovers: exclamations → \'exclaimed that\' with the',
                  options: ['Senior reported speech handles the leftovers: exclamations → \'exclaimed that\' with the', 'Reporting exclamations, wishes, and optatives converts them to statements: exclamations', 'Mixed and minor sentence-types report through their own frames: suggestions (\'Let\'s…\' /'],
                  hint: 'Recall the definition.',
                  misconception: 'Students keep inversion inside embedded questions (\'I don\'t know where is he\') and report exclamations by quoting them — both kill the.' }
          ],
            remediations: { 'students-keep-inversion-inside-embedded': { steps: ['Embedded question → the wh-word heads a noun clause; statement order inside.', 'Exclamation → exclaimed + that + flattened statement.', 'Reporting verb carries the force — asked/told/ordered/requested/warned/exclaimed.'] } } },
        { type: 'subpart', nodeId: 'c12_gram_ch82_002', difficulty: 'standard',
          question: 'Reporting exclamations, wishes, and optatives converts them to statements.',
          hint: 'Work step by step.',
          misconception: 'Students try to keep the exclamation inside the reported clause — \'exclaimed that what a lovely day\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Reporting exclamations, wishes, and optatives converts them to statements: exclamations',
                  options: ['Reporting exclamations, wishes, and optatives converts them to statements: exclamations', 'Senior reported speech handles the leftovers: exclamations → \'exclaimed that\' with the', 'Mixed and minor sentence-types report through their own frames: suggestions (\'Let\'s…\' /'],
                  hint: 'Recall the definition.',
                  misconception: 'Students try to keep the exclamation inside the reported clause — \'exclaimed that what a lovely day\'.' }
          ],
            remediations: { 'students-try-to-keep-the': { steps: ['Extract the emotion first (joy/sorrow/surprise) → choose \'exclaimed with…that\'.', 'Then write the clause as a plain statement with backshift — no \'what a\', no exclamation mark.'] } } },
        { type: 'subpart', nodeId: 'c12_gram_ch82_003', difficulty: 'standard',
          question: 'Mixed and minor sentence-types report through their own frames: suggestions.',
          hint: 'Work step by step.',
          misconception: 'Students force the standard frames onto minor types — \'asked that shall I open\' — because they only learned statements.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Mixed and minor sentence-types report through their own frames: suggestions (\'Let\'s…\' /',
                  options: ['Mixed and minor sentence-types report through their own frames: suggestions (\'Let\'s…\' /', 'Senior reported speech handles the leftovers: exclamations → \'exclaimed that\' with the', 'Reporting exclamations, wishes, and optatives converts them to statements: exclamations'],
                  hint: 'Recall the definition.',
                  misconception: 'Students force the standard frames onto minor types — \'asked that shall I open\' — because they only learned statements and questions.' }
          ],
            remediations: { 'students-force-the-standard-frames': { steps: ['Name the speech act first — suggestion, offer, proposal, greeting — then pick its frame: \'suggested that + should\'.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
