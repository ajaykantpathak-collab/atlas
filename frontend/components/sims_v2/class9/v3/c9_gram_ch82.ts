import type { SimDef } from '../../engine/types';

/** v3 generated — c9_gram_ch82 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_gram_ch82: SimDef = {
    id: 'v3_c9_gram_ch82',
    title: 'Class 9 concord adds the indefinite pronouns.',
    subtitle: 'Covers the board\'s full concord list. Does NOT cover notional agreement or advanced.',
    classLevel: 9, subject: 'gram', topic: 'Class 9 concord adds the indefinite pronouns.',
    chapters: ['c9_gram_ch82'],
    nodeIds: ['c9_gram_cbse_82_001', 'c9_gram_ch82_002', 'c9_gram_ch82_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'The three-box sort: ALWAYS SINGULAR (each, every, everyone, everybody, someone, nobody, either, neither.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Class 9 concord adds the indefinite.', text: 'Class 9 concord adds the indefinite pronouns to the head-noun rule: each/every/everyone/nobody are always singular; few/many/several always plural; some/all/most take their number from the of-phrase.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c9_gram_ch82_002', title: 'Identify each idea',
          dissect: { specimen: 'Class 9 concord adds the indefinite pronouns.', spots: [
            { id: 's1', label: 'Class 9 concord adds the', prompt: 'Which idea is this? — Class 9 concord adds the indefinite pronouns to the head-noun rule.', answer: 'Class 9 concord adds the', options: ['Class 9 concord adds the', 'Class 9 concord extends the', 'Measured quantities take singular verbs'] },
            { id: 's2', label: 'Class 9 concord extends the', prompt: 'Which idea is this? — Class 9 concord extends the head-noun rule to indefinite pronouns: each, every, everyone.', answer: 'Class 9 concord extends the', options: ['Class 9 concord extends the', 'Class 9 concord adds the', 'Measured quantities take singular verbs'] },
            { id: 's3', label: 'Measured quantities take singular verbs', prompt: 'Which idea is this? — Measured quantities take singular verbs when the amount is treated as one unit — \'Ten.', answer: 'Measured quantities take singular verbs', options: ['Measured quantities take singular verbs', 'Class 9 concord adds the', 'Class 9 concord extends the'] }
          ] } },
        { type: 'build', nodeId: 'c9_gram_cbse_82_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Neither-nor → nearer subject wins.', 'Some/all/most → agree with the noun after \'of\'.', 'Find the true subject, strip of-phrases and comma-inserts.'], answer: 'Find the true subject, strip of-phrases and comma-inserts. Some/all/most → agree with the noun after \'of\'. Neither-nor → nearer subject wins.' } },
        { type: 'case', nodeId: 'c9_gram_ch82_003', title: 'You made it',
          caseStudy: { intro: 'You finished Class 9 concord adds the indefinite pronouns. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c9_gram_cbse_82_001', difficulty: 'standard',
          question: 'Class 9 concord adds the indefinite pronouns to the head-noun rule.',
          hint: 'Work step by step.',
          misconception: 'Students pluralize \'everyone\' (it means all people → \'everyone are\'), sum neither-nor subjects to plural, and agree.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Class 9 concord adds the indefinite pronouns to the head-noun rule:',
                  options: ['Class 9 concord adds the indefinite pronouns to the head-noun rule:', 'Class 9 concord extends the head-noun rule to indefinite pronouns: each, every, everyone,', 'Measured quantities take singular verbs when the amount is treated as one unit'],
                  hint: 'Recall the definition.',
                  misconception: 'Students pluralize \'everyone\' (it means all people → \'everyone are\'), sum neither-nor subjects to plural, and agree with of-phrase decoys.' }
          ],
            remediations: { 'students-pluralize-everyone-it-means': { steps: ['Find the true subject, strip of-phrases and comma-inserts.', 'Indefinite? Check its box.', 'Some/all/most → agree with the noun after \'of\'.', 'Neither-nor → nearer subject wins.'] } } },
        { type: 'subpart', nodeId: 'c9_gram_ch82_002', difficulty: 'standard',
          question: 'Class 9 concord extends the head-noun rule to indefinite pronouns: each, every.',
          hint: 'Work step by step.',
          misconception: 'Students let the plural noun inside the of-phrase steal the verb.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Class 9 concord extends the head-noun rule to indefinite pronouns: each, every, everyone,',
                  options: ['Class 9 concord extends the head-noun rule to indefinite pronouns: each, every, everyone,', 'Class 9 concord adds the indefinite pronouns to the head-noun rule:', 'Measured quantities take singular verbs when the amount is treated as one unit'],
                  hint: 'Recall the definition.',
                  misconception: 'Students let the plural noun inside the of-phrase steal the verb.' }
          ],
            remediations: { 'students-let-the-plural-noun': { steps: ['Circle the pronoun (each/every/neither/both/many), ignore everything until the verb, and apply its fixed number.', 'With or/nor, check which subject is nearer the verb.'] } } },
        { type: 'subpart', nodeId: 'c9_gram_ch82_003', difficulty: 'standard',
          question: 'Measured quantities take singular verbs when the amount is treated as one unit.',
          hint: 'Work step by step.',
          misconception: 'Students match the verb to the nearest plural noun — \'rupees\' → \'are\' — and miss that quantity phrases can act as one.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Measured quantities take singular verbs when the amount is treated as one unit',
                  options: ['Measured quantities take singular verbs when the amount is treated as one unit', 'Class 9 concord adds the indefinite pronouns to the head-noun rule:', 'Class 9 concord extends the head-noun rule to indefinite pronouns: each, every, everyone,'],
                  hint: 'Recall the definition.',
                  misconception: 'Students match the verb to the nearest plural noun — \'rupees\' → \'are\' — and miss that quantity phrases can act as one unit.' }
          ],
            remediations: { 'students-match-the-verb-to': { steps: ['Ask \'one lump or many items?\' — a fee/distance/span is singular; separately-counted things are plural.', 'Memorise the reversal: \'a number of\' = plural, \'the number of\' = singular.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
