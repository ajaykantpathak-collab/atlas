import type { SimDef } from '../../engine/types';

/** v3 generated — c9_gram_ch84 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_gram_ch84: SimDef = {
    id: 'v3_c9_gram_ch84',
    title: 'Determiners: A, An, The and Zero Article',
    subtitle: 'Covers the class 9 determiner list. Does NOT cover advanced determiner stacking.',
    classLevel: 9, subject: 'gram', topic: 'Determiners: A, An, The and Zero Article',
    chapters: ['c9_gram_ch84'],
    nodeIds: ['c9_gram_cbse_84_001', 'c9_gram_ch84_002', 'c9_gram_ch84_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'The algorithm: (1) specific/shared → the; (2) new + singular countable → a/an by sound; (3).', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'The board determiner set: a/an/the/zero.', text: 'The board determiner set: a/an/the/zero by the specificity algorithm; a-vs-an by SOUND; the few/little attitude pair (few=almost none, a few=some); count-mass pairing (few/many vs little/much, fewer.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c9_gram_ch84_002', title: 'Identify each idea',
          dissect: { specimen: 'The board determiner set: a/an/the/zero by the.', spots: [
            { id: 's1', label: 'The board determiner set aanthezero', prompt: 'Which idea is this? — The board determiner set: a/an/the/zero by the specificity algorithm; a-vs-an by SOUND.', answer: 'The board determiner set aanthezero', options: ['The board determiner set aanthezero', 'Quantifier choice is governed by', 'Article selection follows the specificity'] },
            { id: 's2', label: 'Quantifier choice is governed by', prompt: 'Which idea is this? — Quantifier choice is governed by countability and attitude: countables take many/few/a.', answer: 'Quantifier choice is governed by', options: ['Quantifier choice is governed by', 'The board determiner set aanthezero', 'Article selection follows the specificity'] },
            { id: 's3', label: 'Article selection follows the specificity', prompt: 'Which idea is this? — Article selection follows the specificity algorithm: use \'the\' when the noun is definite.', answer: 'Article selection follows the specificity', options: ['Article selection follows the specificity', 'The board determiner set aanthezero', 'Quantifier choice is governed by'] }
          ] } },
        { type: 'build', nodeId: 'c9_gram_cbse_84_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Run the specificity algorithm for articles.', 'For quantifiers — count or mass first, then attitude (a.', 'Check the fixed traps — an-before-vowel-SOUND.'], answer: 'Run the specificity algorithm for articles. For quantifiers — count or mass first, then attitude (a. Check the fixed traps — an-before-vowel-SOUND.' } },
        { type: 'case', nodeId: 'c9_gram_ch84_003', title: 'You made it',
          caseStudy: { intro: 'You finished The board determiner set: a/an/the/zero by the. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c9_gram_cbse_84_001', difficulty: 'standard',
          question: 'The board determiner set: a/an/the/zero by the specificity algorithm; a-vs-an.',
          hint: 'Work step by step.',
          misconception: 'Students apply a/an to spelling, use \'less\' with countables, and treat few/a few as spelling variants rather than.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The board determiner set: a/an/the/zero by the specificity algorithm',
                  options: ['The board determiner set: a/an/the/zero by the specificity algorithm', 'Quantifier choice is governed by countability and attitude: countables take many/few/a', 'Article selection follows the specificity algorithm: use \'the\' when the noun is definite'],
                  hint: 'Recall the definition.',
                  misconception: 'Students apply a/an to spelling, use \'less\' with countables, and treat few/a few as spelling variants rather than opposite attitudes.' }
          ],
            remediations: { 'students-apply-a-an-to': { steps: ['Run the specificity algorithm for articles.', 'For quantifiers — count or mass first, then attitude (a- = positive).', 'Check the fixed traps — an-before-vowel-SOUND, fewer-for-countables.'] } } },
        { type: 'subpart', nodeId: 'c9_gram_ch84_002', difficulty: 'standard',
          question: 'Quantifier choice is governed by countability and attitude: countables take.',
          hint: 'Work step by step.',
          misconception: 'Students treat \'a few\' and \'few\' as the same quantity — but the article flips the meaning: \'a few friends\' is.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Quantifier choice is governed by countability and attitude: countables take many/few/a',
                  options: ['Quantifier choice is governed by countability and attitude: countables take many/few/a', 'The board determiner set: a/an/the/zero by the specificity algorithm', 'Article selection follows the specificity algorithm: use \'the\' when the noun is definite'],
                  hint: 'Recall the definition.',
                  misconception: 'Students treat \'a few\' and \'few\' as the same quantity — but the article flips the meaning: \'a few friends\' is a comfort; \'few friends\' is.' }
          ],
            remediations: { 'students-treat-a-few-and': { steps: ['Countability first — can you put a number on it (many/few) or not (much/little)?', 'Then attitude — \'a\' before few/little makes it positive; bare makes it scarce.'] } } },
        { type: 'subpart', nodeId: 'c9_gram_ch84_003', difficulty: 'standard',
          question: 'Article selection follows the specificity algorithm: use \'the\' when the noun.',
          hint: 'Work step by step.',
          misconception: 'Students sprinkle \'the\' on everything definite-sounding or drop it randomly.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Article selection follows the specificity algorithm: use \'the\' when the noun is definite',
                  options: ['Article selection follows the specificity algorithm: use \'the\' when the noun is definite', 'The board determiner set: a/an/the/zero by the specificity algorithm', 'Quantifier choice is governed by countability and attitude: countables take many/few/a'],
                  hint: 'Recall the definition.',
                  misconception: 'Students sprinkle \'the\' on everything definite-sounding or drop it randomly.' }
          ],
            remediations: { 'students-sprinkle-the-on-everything': { steps: ['Run the two questions in order — specific?', '— then check the a/an by SOUND.', 'Memorise the convention exceptions (rivers/instruments take the, peaks don\'t).'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
