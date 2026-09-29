import type { SimDef } from '../../engine/types';

/** v3 generated — c12_gram_ch81 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_gram_ch81: SimDef = {
    id: 'v3_c12_gram_ch81',
    title: 'Phrasal verbs fuse verb + particle into a new.',
    subtitle: 'Covers ~30 high-frequency phrasal verbs and the separability rule.',
    classLevel: 12, subject: 'gram', topic: 'Phrasal verbs fuse verb + particle into a new.',
    chapters: ['c12_gram_ch81'],
    nodeIds: ['c12_gram_cbse_81_001', 'c12_gram_cbse_81_002', 'c12_gram_ch81_003', 'c12_gram_ch81_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'The pronoun rule is the testable core: separable phrasal verbs MUST split around pronouns — \'turn it down\'.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Phrasal verbs fuse verb + particle into.', text: 'Phrasal verbs fuse verb + particle into a new meaning the parts don\'t predict: \'put off\' = postpone, \'give in\' = yield, \'look after\' = care for.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c12_gram_cbse_81_002', title: 'Identify each idea',
          dissect: { specimen: 'Phrasal verbs fuse verb + particle into a new.', spots: [
            { id: 's1', label: 'Phrasal verbs fuse verb', prompt: 'Which idea is this? — Phrasal verbs fuse verb + particle into a new meaning the parts don\'t predict: \'put off\'.', answer: 'Phrasal verbs fuse verb', options: ['Phrasal verbs fuse verb', 'Preposition collocation is memorized territory', 'Separable phrasal verbs allow the', 'Collocations are conventional word partnerships'] },
            { id: 's2', label: 'Preposition collocation is memorized territory', prompt: 'Which idea is this? — Preposition collocation is memorized territory: verbs, adjectives, and nouns each demand.', answer: 'Preposition collocation is memorized territory', options: ['Preposition collocation is memorized territory', 'Phrasal verbs fuse verb', 'Separable phrasal verbs allow the', 'Collocations are conventional word partnerships'] },
            { id: 's3', label: 'Separable phrasal verbs allow the', prompt: 'Which idea is this? — Separable phrasal verbs allow the object between verb and particle (\'put the meeting off\'.', answer: 'Separable phrasal verbs allow the', options: ['Separable phrasal verbs allow the', 'Phrasal verbs fuse verb', 'Preposition collocation is memorized territory', 'Collocations are conventional word partnerships'] },
            { id: 's4', label: 'Collocations are conventional word partnerships', prompt: 'Which idea is this? — Collocations are conventional word partnerships that resist substitution by synonyms.', answer: 'Collocations are conventional word partnerships', options: ['Collocations are conventional word partnerships', 'Phrasal verbs fuse verb', 'Preposition collocation is memorized territory', 'Separable phrasal verbs allow the'] }
          ] } },
        { type: 'build', nodeId: 'c12_gram_cbse_81_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Pronoun object → must split (verb + pronoun + particle).', 'Inseparables (look after, run into, get over) never split.', 'Learn phrasal verbs as single vocabulary items, not.'], answer: 'Learn phrasal verbs as single vocabulary items, not. Pronoun object → must split (verb + pronoun + particle). Inseparables (look after, run into, get over) never split.' } },
        { type: 'case', nodeId: 'c12_gram_ch81_004', title: 'You made it',
          caseStudy: { intro: 'You finished Phrasal verbs fuse verb + particle into a new. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_gram_cbse_81_001', difficulty: 'standard',
          question: 'Phrasal verbs fuse verb + particle into a new meaning the parts don\'t predict.',
          hint: 'Work step by step.',
          misconception: 'Students interpret particles literally (\'put off\' = put off a surface), split inseparables, and place pronouns after.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Phrasal verbs fuse verb + particle into a new meaning the parts don\'t predict: \'put off\'',
                  options: ['Phrasal verbs fuse verb + particle into a new meaning the parts don\'t predict: \'put off\'', 'Preposition collocation is memorized territory: verbs, adjectives, and nouns each demand', 'Separable phrasal verbs allow the object between verb and particle (\'put the meeting off\'', 'Collocations are conventional word partnerships that resist substitution by synonyms:'],
                  hint: 'Recall the definition.',
                  misconception: 'Students interpret particles literally (\'put off\' = put off a surface), split inseparables, and place pronouns after particles (\'turn down.' }
          ],
            remediations: { 'students-interpret-particles-literally-put': { steps: ['Learn phrasal verbs as single vocabulary items, not verb+particle sums.', 'Pronoun object → must split (verb + pronoun + particle).', 'Inseparables (look after, run into, get over) never split.'] } } },
        { type: 'subpart', nodeId: 'c12_gram_cbse_81_002', difficulty: 'standard',
          question: 'Preposition collocation is memorized territory: verbs, adjectives, and nouns.',
          hint: 'Work step by step.',
          misconception: 'Students translate Hindi postpositions into English prepositions — \'married with\', \'angry on\' — and add redundant.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Preposition collocation is memorized territory: verbs, adjectives, and nouns each demand',
                  options: ['Preposition collocation is memorized territory: verbs, adjectives, and nouns each demand', 'Phrasal verbs fuse verb + particle into a new meaning the parts don\'t predict: \'put off\'', 'Separable phrasal verbs allow the object between verb and particle (\'put the meeting off\'', 'Collocations are conventional word partnerships that resist substitution by synonyms:'],
                  hint: 'Recall the definition.',
                  misconception: 'Students translate Hindi postpositions into English prepositions — \'married with\', \'angry on\' — and add redundant partners to complete.' }
          ],
            remediations: { 'students-translate-hindi-postpositions-into': { steps: ['Learn collocations as units — \'afraid of\', not \'afraid + some preposition\'.', 'Redundancy hunt — about/back/again after complete verbs is suspect.', 'different FROM, similar TO, prefer X TO Y.'] } } },
        { type: 'subpart', nodeId: 'c12_gram_ch81_003', difficulty: 'standard',
          question: 'Separable phrasal verbs allow the object between verb and particle (\'put the.',
          hint: 'Work step by step.',
          misconception: 'Students think all phrasal verbs split the same way or treat \'put off it\' as legal because \'put off the meeting\' is.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Separable phrasal verbs allow the object between verb and particle (\'put the meeting off\'',
                  options: ['Separable phrasal verbs allow the object between verb and particle (\'put the meeting off\'', 'Phrasal verbs fuse verb + particle into a new meaning the parts don\'t predict: \'put off\'', 'Preposition collocation is memorized territory: verbs, adjectives, and nouns each demand', 'Collocations are conventional word partnerships that resist substitution by synonyms:'],
                  hint: 'Recall the definition.',
                  misconception: 'Students think all phrasal verbs split the same way or treat \'put off it\' as legal because \'put off the meeting\' is.' }
          ],
            remediations: { 'all-phrasal-verbs-split-the': { steps: ['Two tests: (1) is the object a pronoun?', 'then it MUST sit between verb and particle; (2) is the verb on the inseparable list (look after/run into/get over)?'] } } },
        { type: 'subpart', nodeId: 'c12_gram_ch81_004', difficulty: 'standard',
          question: 'Collocations are conventional word partnerships that resist substitution.',
          hint: 'Work step by step.',
          misconception: 'Students pick the logical synonym — \'strong rain\', \'do a decision\' — assuming meaning-equivalent words swap freely.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Collocations are conventional word partnerships that resist substitution by synonyms:',
                  options: ['Collocations are conventional word partnerships that resist substitution by synonyms:', 'Phrasal verbs fuse verb + particle into a new meaning the parts don\'t predict: \'put off\'', 'Preposition collocation is memorized territory: verbs, adjectives, and nouns each demand', 'Separable phrasal verbs allow the object between verb and particle (\'put the meeting off\''],
                  hint: 'Recall the definition.',
                  misconception: 'Students pick the logical synonym — \'strong rain\', \'do a decision\' — assuming meaning-equivalent words swap freely.' }
          ],
            remediations: { 'students-pick-the-logical-synonym': { steps: ['There\'s no derivation — check the phrase against the memorized partner: \'make/do\' by category (create vs perform).', 'When unsure, \'heavy/strong/fast/quick\' and \'say/tell\' are the traps.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
