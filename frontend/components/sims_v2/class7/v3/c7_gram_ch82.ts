import type { SimDef } from '../../engine/types';

/** v3 generated — c7_gram_ch82 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_gram_ch82: SimDef = {
    id: 'v3_c7_gram_ch82',
    title: 'Beyond a/an/the sits the determiner family.',
    subtitle: 'Covers demonstratives, possessives, and core quantifiers. Does NOT cover the few/little.',
    classLevel: 7, subject: 'gram', topic: 'Beyond a/an/the sits the determiner family.',
    chapters: ['c7_gram_ch82'],
    nodeIds: ['c7_gram_cbse_82_001', 'c7_gram_cbse_82_002', 'c7_gram_cbse_82_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Two axes run the whole family. Axis 1 — pointing: this/these = near (singular/plural), that/those = far.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Beyond a/an/the sits the determiner.', text: 'Beyond a/an/the sits the determiner family: this/that/these/those (pointing), my/your/our (possession), some/any/many/much/few/little (quantity).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c7_gram_cbse_82_002', title: 'Identify each idea',
          dissect: { specimen: 'Beyond a/an/the sits the determiner family.', spots: [
            { id: 's1', label: 'Beyond aanthe sits the determiner', prompt: 'Which idea is this? — Beyond a/an/the sits the determiner family: this/that/these/those (pointing), my/your/our.', answer: 'Beyond aanthe sits the determiner', options: ['Beyond aanthe sits the determiner', 'Subordinating conjunctions because although', 'Adjectives describe nouns a TALL'] },
            { id: 's2', label: 'Subordinating conjunctions because although', prompt: 'Which idea is this? — Subordinating conjunctions — because, although, when, while, if, since, unless, until.', answer: 'Subordinating conjunctions because although', options: ['Subordinating conjunctions because although', 'Beyond aanthe sits the determiner', 'Adjectives describe nouns a TALL'] },
            { id: 's3', label: 'Adjectives describe nouns a TALL', prompt: 'Which idea is this? — Adjectives describe nouns (a TALL building), adverbs describe verbs, adjectives, or other.', answer: 'Adjectives describe nouns a TALL', options: ['Adjectives describe nouns a TALL', 'Beyond aanthe sits the determiner', 'Subordinating conjunctions because although'] }
          ] } },
        { type: 'build', nodeId: 'c7_gram_cbse_82_002', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Name the logic between the clauses — reason, contrast.', 'Clause first → comma; clause second → usually no comma.', 'Pick the subordinator whose job is that logic.'], answer: 'Name the logic between the clauses — reason, contrast. Pick the subordinator whose job is that logic. Clause first → comma; clause second → usually no comma.' } },
        { type: 'case', nodeId: 'c7_gram_cbse_82_003', title: 'You made it',
          caseStudy: { intro: 'You finished Beyond a/an/the sits the determiner family. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c7_gram_cbse_82_001', difficulty: 'standard',
          question: 'Beyond a/an/the sits the determiner family: this/that/these/those (pointing).',
          hint: 'Work step by step.',
          misconception: 'Students use \'much\' with countables (\'much students\'), \'some\' in negatives (\'I don\'t have some money\'), and mix.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Beyond a/an/the sits the determiner family: this/that/these/those (pointing), my/your/our',
                  options: ['Beyond a/an/the sits the determiner family: this/that/these/those (pointing), my/your/our', 'Subordinating conjunctions', 'Adjectives describe nouns (a TALL building), adverbs describe verbs, adjectives, or other'],
                  hint: 'Recall the definition.',
                  misconception: 'Students use \'much\' with countables (\'much students\'), \'some\' in negatives (\'I don\'t have some money\'), and mix this/these by number.' }
          ],
            remediations: { 'students-use-much-with-countables': { steps: ['Pointing? → near or far, one or many.', 'Quantity? → countable (many/few) or mass (much/little).', 'Polarity → some in +/offers, any in −/?.'] } } },
        { type: 'subpart', nodeId: 'c7_gram_cbse_82_002', difficulty: 'standard',
          question: 'Subordinating conjunctions — because, although, when, while, if, since, unless.',
          hint: 'Work step by step.',
          misconception: 'Students use \'because\' for every logic (\'because it rained, we stayed home\' is right; but \'because it rained, we still.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Subordinating conjunctions',
                  options: ['Subordinating conjunctions', 'Beyond a/an/the sits the determiner family: this/that/these/those (pointing), my/your/our', 'Adjectives describe nouns (a TALL building), adverbs describe verbs, adjectives, or other'],
                  hint: 'Recall the definition.',
                  misconception: 'Students use \'because\' for every logic (\'because it rained, we stayed home\' is right; but \'because it rained, we still played\' is.' }
          ],
            remediations: { 'students-use-because-for-every': { steps: ['Name the logic between the clauses — reason, contrast, time, condition.', 'Pick the subordinator whose job is that logic.', 'Clause first → comma; clause second → usually no comma.'] } } },
        { type: 'subpart', nodeId: 'c7_gram_cbse_82_003', difficulty: 'standard',
          question: 'Adjectives describe nouns (a TALL building), adverbs describe verbs.',
          hint: 'Work step by step.',
          misconception: 'Students use adjectives as adverbs (\'She sings beautiful\'), trust the -ly test blindly (\'friendly\' is an adjective).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Adjectives describe nouns (a TALL building), adverbs describe verbs, adjectives, or other',
                  options: ['Adjectives describe nouns (a TALL building), adverbs describe verbs, adjectives, or other', 'Beyond a/an/the sits the determiner family: this/that/these/those (pointing), my/your/our', 'Subordinating conjunctions'],
                  hint: 'Recall the definition.',
                  misconception: 'Students use adjectives as adverbs (\'She sings beautiful\'), trust the -ly test blindly (\'friendly\' is an adjective), and miss that \'hardly\'.' }
          ],
            remediations: { 'students-use-adjectives-as-adverbs': { steps: ['Find what the word modifies — noun → adjective; verb/adjective/adverb → adverb.', 'Form adverbs: +ly; y→ily (easy→easily).', 'Learn the rebel pairs: good/well, hard/hardly, fast/fast, late/lately.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
