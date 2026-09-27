import type { SimDef } from '../../engine/types';

/** v3 generated — c10_gram_ch92 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_gram_ch92: SimDef = {
    id: 'v3_c10_gram_ch92',
    title: 'Modals are function words — each encodes.',
    subtitle: 'Covers the nine core modals and their functions in declaratives, questions, negatives.',
    classLevel: 10, subject: 'gram', topic: 'Modals are function words — each encodes.',
    chapters: ['c10_gram_ch92'],
    nodeIds: ['c10_gram_cbse_92_001', 'c10_gram_cbse_92_002', 'c10_gram_ch92_003', 'c10_gram_ch92_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'Line up the obligation ladder: may (permission) < should (advice) < must (command).', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Modals are function words — each.', text: 'Modals are function words — each encodes a specific communicative job: ability (can/could), permission (may/can/could), obligation (must/should/ought to), possibility (may/might/could), request.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c10_gram_cbse_92_002', title: 'Identify each idea',
          dissect: { specimen: 'Modals are function words — each encodes.', spots: [
            { id: 's1', label: 'Modals are function words', prompt: 'Which idea is this? — Modals are function words — each encodes a specific communicative job: ability.', answer: 'Modals are function words', options: ['Modals are function words', 'Modal have past', 'Modals mark degrees of certainty', 'Obligation modals encode the SOURCE'] },
            { id: 's2', label: 'Modal have past', prompt: 'Which idea is this? — Modal + have + past participle talks about a past that didn\'t happen or a past we deduce.', answer: 'Modal have past', options: ['Modal have past', 'Modals are function words', 'Modals mark degrees of certainty', 'Obligation modals encode the SOURCE'] },
            { id: 's3', label: 'Modals mark degrees of certainty', prompt: 'Which idea is this? — Modals mark degrees of certainty about the present: \'must\' = strong deduction (the.', answer: 'Modals mark degrees of certainty', options: ['Modals mark degrees of certainty', 'Modals are function words', 'Modal have past', 'Obligation modals encode the SOURCE'] },
            { id: 's4', label: 'Obligation modals encode the SOURCE', prompt: 'Which idea is this? — Obligation modals encode the SOURCE of the duty: \'must\' = the speaker imposes (\'You must.', answer: 'Obligation modals encode the SOURCE', options: ['Obligation modals encode the SOURCE', 'Modals are function words', 'Modal have past', 'Modals mark degrees of certainty'] }
          ] } },
        { type: 'build', nodeId: 'c10_gram_cbse_92_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Ask what the sentence is DOING — advising? permitting?', 'Pick the modal whose function matches, not the first modal.', 'For near-pairs, name the strength difference out loud.'], answer: 'Ask what the sentence is DOING — advising? permitting? Pick the modal whose function matches, not the first modal. For near-pairs, name the strength difference out loud.' } },
        { type: 'case', nodeId: 'c10_gram_ch92_004', title: 'You made it',
          caseStudy: { intro: 'You finished Modals are function words — each encodes. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c10_gram_cbse_92_001', difficulty: 'standard',
          question: 'Modals are function words — each encodes a specific communicative job: ability.',
          hint: 'Work step by step.',
          misconception: 'Students treat modals as interchangeable politeness decorations, pick by \'sounds right\' — usually overusing \'can\' and.',
          parts: [
                { id: 'a', prompt: '\'___ I borrow your pen?\' — polite, formal permission. Which modal?', answer: '\'May\' (or \'Could\' for polite request)',
                  options: ['\'May\' (or \'Could\' for polite request)', 'modals differ only in meaning, not in formality level'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students treat modals as interchangeable politeness decorations, pick by \'sounds right\' — usually overusing \'can\' and \'should\' — and.' }
          ],
            remediations: { 'students-treat-modals-as-interchangeable': { steps: ['Ask what the sentence is DOING — advising? permitting? guessing? commanding?', 'Pick the modal whose function matches, not the first modal that fits grammatically.', 'For near-pairs, name the strength difference out loud before answering.'] } } },
        { type: 'subpart', nodeId: 'c10_gram_cbse_92_002', difficulty: 'standard',
          question: 'Modal + have + past participle talks about a past that didn\'t happen or a past.',
          hint: 'Work step by step.',
          misconception: 'Students write \'should had\'/\'must had\' (double-past) or \'should have went\' — and crucially, they use \'must have\' for.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Modal + have + past participle talks about a past that didn\'t happen or a past we deduce:',
                  options: ['Modal + have + past participle talks about a past that didn\'t happen or a past we deduce:', 'Modals are function words', 'Modals mark degrees of certainty about the present: \'must\' = strong deduction (the', 'Obligation modals encode the SOURCE of the duty: \'must\' = the speaker imposes (\'You must'],
                  hint: 'Recall the definition.',
                  misconception: 'Students write \'should had\'/\'must had\' (double-past) or \'should have went\' — and crucially, they use \'must have\' for obligation (\'you must.' }
          ],
            remediations: { 'students-write-should-had-must': { steps: ['Confirm the event is PAST — that forces \'have + V3\'.', 'Ask the stance — deduction (must), regret/advice-too-late (should), unrealized ability (could), weak guess (might).', 'Never write \'modal + had\' — \'had\' is for pluperfect clauses, not modal perfects.'] } } },
        { type: 'subpart', nodeId: 'c10_gram_ch92_003', difficulty: 'standard',
          question: 'Modals mark degrees of certainty about the present: \'must\' = strong deduction.',
          hint: 'Work step by step.',
          misconception: 'Students treat \'must\' as only obligation and \'can\'t\' as only inability, missing the deduction senses entirely.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Modals mark degrees of certainty about the present: \'must\' = strong deduction (the',
                  options: ['Modals mark degrees of certainty about the present: \'must\' = strong deduction (the', 'Modals are function words', 'Modal + have + past participle talks about a past that didn\'t happen or a past we deduce:', 'Obligation modals encode the SOURCE of the duty: \'must\' = the speaker imposes (\'You must'],
                  hint: 'Recall the definition.',
                  misconception: 'Students treat \'must\' as only obligation and \'can\'t\' as only inability, missing the deduction senses entirely.' }
          ],
            remediations: { 'students-treat-must-as-only': { steps: ['Ask what the sentence claims: a rule (obligation → must/mustn\'t), an ability (can/can\'t), or a judgement about truth.'] } } },
        { type: 'subpart', nodeId: 'c10_gram_ch92_004', difficulty: 'standard',
          question: 'Obligation modals encode the SOURCE of the duty: \'must\' = the speaker imposes.',
          hint: 'Work step by step.',
          misconception: 'Students treat \'must\' and \'have to\' as synonyms and \'mustn\'t\' as the negative of both.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Obligation modals encode the SOURCE of the duty: \'must\' = the speaker imposes (\'You must',
                  options: ['Obligation modals encode the SOURCE of the duty: \'must\' = the speaker imposes (\'You must', 'Modals are function words', 'Modal + have + past participle talks about a past that didn\'t happen or a past we deduce:', 'Modals mark degrees of certainty about the present: \'must\' = strong deduction (the'],
                  hint: 'Recall the definition.',
                  misconception: 'Students treat \'must\' and \'have to\' as synonyms and \'mustn\'t\' as the negative of both.' }
          ],
            remediations: { 'students-treat-must-and-have': { steps: ['Two questions: (1) who imposes — speaker (must), rule (have to), adviser (should), circumstance (need to)?', '(2) For negatives — forbidden (mustn\'t) or unnecessary (needn\'t)?'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
