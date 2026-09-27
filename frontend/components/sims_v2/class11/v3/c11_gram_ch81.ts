import type { SimDef } from '../../engine/types';

/** v3 generated — c11_gram_ch81 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_gram_ch81: SimDef = {
    id: 'v3_c11_gram_ch81',
    title: 'Transformation repackages one truth into.',
    subtitle: 'Covers the ICSE-style transformation inventory. Does NOT cover degree transformations.',
    classLevel: 11, subject: 'gram', topic: 'Transformation repackages one truth into.',
    chapters: ['c11_gram_ch81'],
    nodeIds: ['c11_gram_cbse_81_001', 'c11_gram_cbse_81_002', 'c11_gram_ch81_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'The too-so engine: \'too tired to work\' ↔ \'so tired that he could not work\' — \'too\' + adjective + \'to\' hides.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Transformation repackages one truth.', text: 'Transformation repackages one truth into different containers — simple (one finite verb), compound (coordinated equals), complex (subordinated).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c11_gram_cbse_81_002', title: 'Identify each idea',
          dissect: { specimen: 'Transformation repackages one truth into.', spots: [
            { id: 's1', label: 'Transformation repackages one truth into', prompt: 'Which idea is this? — Transformation repackages one truth into different containers — simple (one finite verb).', answer: 'Transformation repackages one truth into', options: ['Transformation repackages one truth into', 'Synthesis merges separate sentences into', 'Sentence transformation converts a sentence'] },
            { id: 's2', label: 'Synthesis merges separate sentences into', prompt: 'Which idea is this? — Synthesis merges separate sentences into one — using participles (\'Hearing the news, she.', answer: 'Synthesis merges separate sentences into', options: ['Synthesis merges separate sentences into', 'Transformation repackages one truth into', 'Sentence transformation converts a sentence'] },
            { id: 's3', label: 'Sentence transformation converts a sentence', prompt: 'Which idea is this? — Sentence transformation converts a sentence between structures while preserving meaning.', answer: 'Sentence transformation converts a sentence', options: ['Sentence transformation converts a sentence', 'Transformation repackages one truth into', 'Synthesis merges separate sentences into'] }
          ] } },
        { type: 'build', nodeId: 'c11_gram_cbse_81_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Rebuild preserving every logical piece — check that nothing.', 'Identify the hidden logic — cause-result, concession.', 'Pick the target container.'], answer: 'Identify the hidden logic — cause-result, concession. Pick the target container. Rebuild preserving every logical piece — check that nothing.' } },
        { type: 'case', nodeId: 'c11_gram_ch81_003', title: 'You made it',
          caseStudy: { intro: 'You finished Transformation repackages one truth into. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_gram_cbse_81_001', difficulty: 'standard',
          question: 'Transformation repackages one truth into different containers — simple (one.',
          hint: 'Work step by step.',
          misconception: 'Students transform the words but not the logic — \'He was too tired to work\' → \'He was so tired to work\' drops the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Transformation repackages one truth into different containers',
                  options: ['Transformation repackages one truth into different containers', 'Synthesis merges separate sentences into one', 'Sentence transformation converts a sentence between structures while preserving meaning:'],
                  hint: 'Recall the definition.',
                  misconception: 'Students transform the words but not the logic — \'He was too tired to work\' → \'He was so tired to work\' drops the result clause and breaks.' }
          ],
            remediations: { 'students-transform-the-words-but': { steps: ['Identify the hidden logic — cause-result, concession, condition.', 'Pick the target container.', 'Rebuild preserving every logical piece — check that nothing (negation, condition) was dropped.'] } } },
        { type: 'subpart', nodeId: 'c11_gram_cbse_81_002', difficulty: 'standard',
          question: 'Synthesis merges separate sentences into one — using participles (\'Hearing the.',
          hint: 'Work step by step.',
          misconception: 'Students simply stack sentences with \'and…and…and\' or create dangling participles — \'Walking down the road, the house.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Synthesis merges separate sentences into one',
                  options: ['Synthesis merges separate sentences into one', 'Transformation repackages one truth into different containers', 'Sentence transformation converts a sentence between structures while preserving meaning:'],
                  hint: 'Recall the definition.',
                  misconception: 'Students simply stack sentences with \'and…and…and\' or create dangling participles — \'Walking down the road, the house appeared\' (the house.' }
          ],
            remediations: { 'students-simply-stack-sentences-with': { steps: ['Find the relationship between the sentences — sequence, cause, identity, purpose, description.', 'Pick the matching merger device.', 'Check the participle\'s implied subject = main clause subject (no dangling).'] } } },
        { type: 'subpart', nodeId: 'c11_gram_ch81_003', difficulty: 'standard',
          question: 'Sentence transformation converts a sentence between structures while preserving.',
          hint: 'Work step by step.',
          misconception: 'Students paraphrase instead of transforming — they change the content while swapping the structure (\'too tired to work\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sentence transformation converts a sentence between structures while preserving meaning:',
                  options: ['Sentence transformation converts a sentence between structures while preserving meaning:', 'Transformation repackages one truth into different containers', 'Synthesis merges separate sentences into one'],
                  hint: 'Recall the definition.',
                  misconception: 'Students paraphrase instead of transforming — they change the content while swapping the structure (\'too tired to work\' → \'cannot do any.' }
          ],
            remediations: { 'students-paraphrase-instead-of-transforming': { steps: ['Verify the swap: read the original and the transform — do they assert the identical fact in all circumstances?', 'If the new one adds (\'any\', \'completely\') or loses anything, redo it.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
