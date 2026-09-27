import type { SimDef } from '../../engine/types';

/** v3 generated — c8_gram_ch80 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_gram_ch80: SimDef = {
    id: 'v3_c8_gram_ch80',
    title: 'By class 8 the tense system has nine working.',
    subtitle: 'Covers the full tense grid at identification and production level.',
    classLevel: 8, subject: 'gram', topic: 'By class 8 the tense system has nine working.',
    chapters: ['c8_gram_ch80'],
    nodeIds: ['c8_gram_cbse_80_001', 'c8_gram_cbse_80_002', 'c8_gram_ch80_003', 'c8_gram_ch80_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'The duration test separates the perfects: \'I have waited an hour\' (state, completed feel) vs \'I have been.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'By class 8 the tense system has nine.', text: 'By class 8 the tense system has nine working cells: three times × three aspects (simple, continuous, perfect).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c8_gram_ch80_003', title: 'The present perfect vs simple past.',
          caseStudy: { intro: '1. Test the sentence for a finished-time word — yesterday, last week, in 2019, ago. If present, only simple past is legal: \'I ate yesterday.\' 2.',
            decisions: [{ prompt: 'Correct or not: \'I have eaten my lunch at 1 pm today.\'', options: [
                { text: 'Not correct — \'at 1 pm\' is a finished-time marker, so only simple past works: \'I ate my', outcome: 'Not correct — \'at 1 pm\' is a finished-time marker, so only simple past works: \'I ate my lunch at 1.' },
                { text: '\'have + V3\' always sounds more correct and tag it onto any past action', outcome: 'Not quite — Students think \'have + V3\' always sounds more correct and tag it onto any past action.', reveals: 'have-v3-always-sounds-more' }
            ] }] } },
        { type: 'dissect', nodeId: 'c8_gram_cbse_80_002', title: 'Identify each idea',
          dissect: { specimen: 'By class 8 the tense system has nine working.', spots: [
            { id: 's1', label: 'By class 8 the tense', prompt: 'Which idea is this? — By class 8 the tense system has nine working cells: three times × three aspects (simple.', answer: 'By class 8 the tense', options: ['By class 8 the tense', 'Sequence of tenses when a', 'The present perfect vs simple', 'Future reference in English splits'] },
            { id: 's2', label: 'Sequence of tenses when a', prompt: 'Which idea is this? — Sequence of tenses: when a sentence has two clauses, the tense of the second.', answer: 'Sequence of tenses when a', options: ['Sequence of tenses when a', 'By class 8 the tense', 'The present perfect vs simple', 'Future reference in English splits'] },
            { id: 's3', label: 'The present perfect vs simple', prompt: 'Which idea is this? — The present perfect vs simple past distinction is the classic Class 8 tense fork: simple.', answer: 'The present perfect vs simple', options: ['The present perfect vs simple', 'By class 8 the tense', 'Sequence of tenses when a', 'Future reference in English splits'] },
            { id: 's4', label: 'Future reference in English splits', prompt: 'Which idea is this? — Future reference in English splits by intention: \'will + base verb\' expresses spontaneous.', answer: 'Future reference in English splits', options: ['Future reference in English splits', 'By class 8 the tense', 'Sequence of tenses when a', 'The present perfect vs simple'] }
          ] } },
        { type: 'case', nodeId: 'c8_gram_ch80_004', title: 'You made it',
          caseStudy: { intro: 'You finished By class 8 the tense system has nine working. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c8_gram_cbse_80_001', difficulty: 'standard',
          question: 'By class 8 the tense system has nine working cells: three times × three aspects.',
          hint: 'Work step by step.',
          misconception: 'Students reach for the continuous whenever they see duration, producing \'I am waiting since morning\' — the since-marker.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'By class 8 the tense system has nine working cells: three times × three aspects (simple,',
                  options: ['By class 8 the tense system has nine working cells: three times × three aspects (simple,', 'Sequence of tenses: when a sentence has two clauses, the tense of the second is', 'The present perfect vs simple past distinction is the classic Class 8 tense fork: simple', 'Future reference in English splits by intention: \'will + base verb\' expresses spontaneous'],
                  hint: 'Recall the definition.',
                  misconception: 'Students reach for the continuous whenever they see duration, producing \'I am waiting since morning\' — the since-marker demands.' }
          ],
            remediations: { 'students-reach-for-the-continuous': { steps: ['Underline markers — since/for/yet/already/by the time.', 'Since/for + still-going → perfect-continuous.', 'Two ordered past events → earlier takes past perfect.', 'Build the verb phrase from the cell, not by feel.'] } } },
        { type: 'subpart', nodeId: 'c8_gram_cbse_80_002', difficulty: 'standard',
          question: 'Sequence of tenses: when a sentence has two clauses, the tense of the second.',
          hint: 'Work step by step.',
          misconception: 'Students shift every verb blindly after a past main clause — including facts that are still true — or fail to shift.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sequence of tenses: when a sentence has two clauses, the tense of the second is',
                  options: ['Sequence of tenses: when a sentence has two clauses, the tense of the second is', 'By class 8 the tense system has nine working cells: three times × three aspects (simple,', 'The present perfect vs simple past distinction is the classic Class 8 tense fork: simple', 'Future reference in English splits by intention: \'will + base verb\' expresses spontaneous'],
                  hint: 'Recall the definition.',
                  misconception: 'Students shift every verb blindly after a past main clause — including facts that are still true — or fail to shift at all, writing \'He.' }
          ],
            remediations: { 'students-shift-every-verb-blindly': { steps: ['Fix the main clause\'s time-zone.', 'Past zone → subordinate verbs step back one tense.', 'Apply the exemption — still-true facts may keep present tense.'] } } },
        { type: 'subpart', nodeId: 'c8_gram_ch80_003', difficulty: 'standard',
          question: 'The present perfect vs simple past distinction is the classic Class 8 tense.',
          hint: 'Work step by step.',
          misconception: 'Students think \'have + V3\' always sounds more correct and tag it onto any past action.',
          parts: [
                { id: 'a', prompt: '\'She ___ (finish) her homework just now\' — which verb form?', answer: '\'has just finished\'',
                  options: ['\'has just finished\'', '\'have + V3\' always sounds more correct and tag it onto any past action'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think \'have + V3\' always sounds more correct and tag it onto any past action.' },
                { id: 'b', prompt: 'Choose: \'I (see/have seen) that film last Sunday.\'', answer: '\'saw\' — \'last Sunday\' is a finished past time, so simple past is forced',
                  options: ['\'saw\' — \'last Sunday\' is a finished past time, so simple past is forced', '\'have + V3\' always sounds more correct and tag it onto any past action'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think \'have + V3\' always sounds more correct and tag it onto any past action.' },
                { id: 'c', prompt: 'Why is \'I have met him yesterday\' wrong?', answer: 'Present perfect forbids a finished-time marker',
                  options: ['Present perfect forbids a finished-time marker', '\'have + V3\' always sounds more correct and tag it onto any past action'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think \'have + V3\' always sounds more correct and tag it onto any past action.' }
          ],
            remediations: { 'have-v3-always-sounds-more': { steps: ['If it names a finished period (yesterday, last week, in 2019), the verb must be simple past — no exceptions.'] } } },
        { type: 'subpart', nodeId: 'c8_gram_ch80_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think \'have + V3\' always sounds more correct and tag it onto any past action.',
          parts: [
                { id: 'a', prompt: 'Which markers signal present perfect: ago/last or just/already/yet?', answer: 'just, already, yet, ever, never',
                  options: ['just, already, yet, ever, never', '\'have + V3\' always sounds more correct and tag it onto any past action'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think \'have + V3\' always sounds more correct and tag it onto any past action.' }
          ],
            remediations: { 'have-v3-always-sounds-more': { steps: ['If it names a finished period (yesterday, last week, in 2019), the verb must be simple past — no exceptions.'] } } },
        { type: 'subpart', nodeId: 'c8_gram_ch80_004', difficulty: 'standard',
          question: 'Future reference in English splits by intention: \'will + base verb\' expresses.',
          hint: 'Work step by step.',
          misconception: 'Students treat \'will\' and \'going to\' as synonyms and pick at random.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Future reference in English splits by intention: \'will + base verb\' expresses spontaneous',
                  options: ['Future reference in English splits by intention: \'will + base verb\' expresses spontaneous', 'By class 8 the tense system has nine working cells: three times × three aspects (simple,', 'Sequence of tenses: when a sentence has two clauses, the tense of the second is', 'The present perfect vs simple past distinction is the classic Class 8 tense fork: simple'],
                  hint: 'Recall the definition.',
                  misconception: 'Students treat \'will\' and \'going to\' as synonyms and pick at random.' }
          ],
            remediations: { 'students-treat-will-and-going': { steps: ['Ask one question: was this decided before the sentence or during it?', 'Before → going to; during → will.', 'For predictions, look for visible evidence → going to.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
