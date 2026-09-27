import type { SimDef } from '../../engine/types';

/** v3 generated — c6_gram_ch83 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_gram_ch83: SimDef = {
    id: 'v3_c6_gram_ch83',
    title: '\'a\' and \'an\' introduce something new and.',
    subtitle: 'Covers the basic article algorithm. Does NOT cover zero-article rules or quantifiers.',
    classLevel: 6, subject: 'gram', topic: '\'a\' and \'an\' introduce something new and.',
    chapters: ['c6_gram_ch83'],
    nodeIds: ['c6_gram_cbse_83_001', 'c6_gram_cbse_83_002', 'c6_gram_cbse_83_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'The story rule: \'I saw a bird. The bird sat on a branch. The branch broke.\' First mention = a (new to the.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: '\'a\' and \'an\' introduce something new.', text: '\'a\' and \'an\' introduce something new and non-specific; \'the\' points at something specific that both people know.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c6_gram_cbse_83_002', title: 'Identify each idea',
          dissect: { specimen: '\'a\' and \'an\' introduce something new and.', spots: [
            { id: 's1', label: 'a and an introduce something', prompt: 'Which idea is this? — \'a\' and \'an\' introduce something new and non-specific; \'the\' points at something specific.', answer: 'a and an introduce something', options: ['a and an introduce something', 'Prepositions are position words', 'Conjunctions are joining words'] },
            { id: 's2', label: 'Prepositions are position words', prompt: 'Which idea is this? — Prepositions are position words — they place things in space (in, on, under, behind.', answer: 'Prepositions are position words', options: ['Prepositions are position words', 'a and an introduce something', 'Conjunctions are joining words'] },
            { id: 's3', label: 'Conjunctions are joining words', prompt: 'Which idea is this? — Conjunctions are joining words — and/but/or join equals, because/so joins reason and.', answer: 'Conjunctions are joining words', options: ['Conjunctions are joining words', 'a and an introduce something', 'Prepositions are position words'] }
          ] } },
        { type: 'build', nodeId: 'c6_gram_cbse_83_003', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Name the logic between the halves — add, contrast, choice.', 'Pick the joiner that names that logic.', 'Because goes before the CAUSE; so goes before the RESULT.'], answer: 'Name the logic between the halves — add, contrast, choice. Pick the joiner that names that logic. Because goes before the CAUSE; so goes before the RESULT.' } },
        { type: 'case', nodeId: 'c6_gram_cbse_83_003', title: 'You made it',
          caseStudy: { intro: 'You finished \'a\' and \'an\' introduce something new and. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c6_gram_cbse_83_001', difficulty: 'standard',
          question: '\'a\' and \'an\' introduce something new and non-specific; \'the\' points.',
          hint: 'Work step by step.',
          misconception: 'Students pick \'an\' by looking at the first letter → \'an university\', \'a hour\' — and use \'the\' for general categories.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'a\' and \'an\' introduce something new and non-specific',
                  options: ['\'a\' and \'an\' introduce something new and non-specific', 'Prepositions are position words', 'Conjunctions are joining words'],
                  hint: 'Recall the definition.',
                  misconception: 'Students pick \'an\' by looking at the first letter → \'an university\', \'a hour\' — and use \'the\' for general categories (\'The dogs are.' }
          ],
            remediations: { 'students-pick-an-by-looking': { steps: ['First mention and non-specific → a/an. Known/specific → the.', 'a vs an — say the word; vowel SOUND → an.', 'General categories (all dogs, honesty) → usually no \'the\'.'] } } },
        { type: 'subpart', nodeId: 'c6_gram_cbse_83_002', difficulty: 'standard',
          question: 'Prepositions are position words — they place things in space (in, on, under.',
          hint: 'Work step by step.',
          misconception: 'Students translate from Hindi — \'in the bus\' feels like \'inside\' so they write \'in the bus\' where English says \'on the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Prepositions are position words',
                  options: ['Prepositions are position words', '\'a\' and \'an\' introduce something new and non-specific', 'Conjunctions are joining words'],
                  hint: 'Recall the definition.',
                  misconception: 'Students translate from Hindi — \'in the bus\' feels like \'inside\' so they write \'in the bus\' where English says \'on the bus\' (public.' }
          ],
            remediations: { 'students-translate-from-hindi-in': { steps: ['Time? Apply the calendar: at-clock, on-day, in-month.', 'Space? Picture it — inside=in, surface=on, surrounded=middle words.', 'Public transport (bus/train/plane) = \'on\', cars = \'in\'.'] } } },
        { type: 'subpart', nodeId: 'c6_gram_cbse_83_003', difficulty: 'standard',
          question: 'Conjunctions are joining words — and/but/or join equals, because/so joins.',
          hint: 'Work step by step.',
          misconception: 'Students default to \'and\' for everything, and swap because/so — writing \'He passed, so he studied hard\' which reverses.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Conjunctions are joining words',
                  options: ['Conjunctions are joining words', '\'a\' and \'an\' introduce something new and non-specific', 'Prepositions are position words'],
                  hint: 'Recall the definition.',
                  misconception: 'Students default to \'and\' for everything, and swap because/so — writing \'He passed, so he studied hard\' which reverses cause and effect.' }
          ],
            remediations: { 'students-default-to-and-for': { steps: ['Name the logic between the halves — add, contrast, choice, cause, result.', 'Pick the joiner that names that logic.', 'Because goes before the CAUSE; so goes before the RESULT — never swap.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
