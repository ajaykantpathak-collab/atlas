import type { SimDef } from '../../engine/types';

/** v3 generated — c12_gram_ch83 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_gram_ch83: SimDef = {
    id: 'v3_c12_gram_ch83',
    title: 'Sentence-reordering items test cohesion logic.',
    subtitle: 'Covers paragraph reordering strategy. Does NOT cover within-sentence jumbled words (class.',
    classLevel: 12, subject: 'gram', topic: 'Sentence-reordering items test cohesion logic.',
    chapters: ['c12_gram_ch83'],
    nodeIds: ['c12_gram_cbse_83_001', 'c12_gram_ch83_002', 'c12_gram_ch83_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'The chain rules: (1) the opener introduces new entities with \'a\' and contains no pronouns pointing backward.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Sentence-reordering items test cohesion.', text: 'Sentence-reordering items test cohesion logic: sentences link through pronoun references, article flow (a→the on second mention), time/logic sequence, and connector chains (first, then, however.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c12_gram_ch83_002', title: 'Identify each idea',
          dissect: { specimen: 'Sentence-reordering items test cohesion logic.', spots: [
            { id: 's1', label: 'Sentence-reordering items test cohesion logic', prompt: 'Which idea is this? — Sentence-reordering items test cohesion logic: sentences link through pronoun references.', answer: 'Sentence-reordering items test cohesion logic', options: ['Sentence-reordering items test cohesion logic', 'Sentence-reordering is cohesion logic an', 'Beyond referential cohesion sentence order'] },
            { id: 's2', label: 'Sentence-reordering is cohesion logic an', prompt: 'Which idea is this? — Sentence-reordering is cohesion logic: an opening sentence introduces entities with.', answer: 'Sentence-reordering is cohesion logic an', options: ['Sentence-reordering is cohesion logic an', 'Sentence-reordering items test cohesion logic', 'Beyond referential cohesion sentence order'] },
            { id: 's3', label: 'Beyond referential cohesion sentence order', prompt: 'Which idea is this? — Beyond referential cohesion, sentence order follows temporal and causal structure: events.', answer: 'Beyond referential cohesion sentence order', options: ['Beyond referential cohesion sentence order', 'Sentence-reordering items test cohesion logic', 'Sentence-reordering is cohesion logic an'] }
          ] } },
        { type: 'build', nodeId: 'c12_gram_cbse_83_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['\'He donated it\' — pronouns need antecedents — last.', '\'The prize had been awarded\' refers back to the prize.', 'Find the opener — \'Ravi won the first prize\' introduces.'], answer: 'Find the opener — \'Ravi won the first prize\' introduces. \'The prize had been awarded\' refers back to the prize. \'He donated it\' — pronouns need antecedents — last.' } },
        { type: 'case', nodeId: 'c12_gram_ch83_003', title: 'You made it',
          caseStudy: { intro: 'You finished Sentence-reordering items test cohesion logic. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_gram_cbse_83_001', difficulty: 'standard',
          question: 'Sentence-reordering items test cohesion logic: sentences link through pronoun.',
          hint: 'Work step by step.',
          misconception: 'Students order by topic-feel instead of reference-chains, and place \'the X\' sentences before \'a X\' introductions.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sentence-reordering items test cohesion logic: sentences link through pronoun references,',
                  options: ['Sentence-reordering items test cohesion logic: sentences link through pronoun references,', 'Sentence-reordering is cohesion logic: an opening sentence introduces entities with', 'Beyond referential cohesion, sentence order follows temporal and causal structure: events'],
                  hint: 'Recall the definition.',
                  misconception: 'Students order by topic-feel instead of reference-chains, and place \'the X\' sentences before \'a X\' introductions — breaking the article.' }
          ],
            remediations: { 'students-order-by-topic-feel': { steps: ['Find the opener — new entities, no backward pronouns, \'a\' articles.', 'Chain the references — each \'the/he/this\' must land after its introducer.', 'Check connector logic.', 'Read the assembled paragraph — every link must point backward cleanly.'] } } },
        { type: 'subpart', nodeId: 'c12_gram_ch83_002', difficulty: 'standard',
          question: 'Sentence-reordering is cohesion logic: an opening sentence introduces entities.',
          hint: 'Work step by step.',
          misconception: 'Students reorder by \'what feels right\' — semantic guesswork. The links are mechanical: \'he\' needs a man, \'the\' needs.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sentence-reordering is cohesion logic: an opening sentence introduces entities with',
                  options: ['Sentence-reordering is cohesion logic: an opening sentence introduces entities with', 'Sentence-reordering items test cohesion logic: sentences link through pronoun references,', 'Beyond referential cohesion, sentence order follows temporal and causal structure: events'],
                  hint: 'Recall the definition.',
                  misconception: 'Students reorder by \'what feels right\' — semantic guesswork. The links are mechanical: \'he\' needs a man, \'the\' needs an \'a\', \'however\'.' }
          ],
            remediations: { 'students-reorder-by-what-feels': { steps: ['Mark every pronoun, \'the\', and connective.', 'Find the one sentence that introduces and depends on nothing — that\'s the anchor — then chain out from it by reference.'] } } },
        { type: 'subpart', nodeId: 'c12_gram_ch83_003', difficulty: 'standard',
          question: 'Beyond referential cohesion, sentence order follows temporal and causal.',
          hint: 'Work step by step.',
          misconception: 'Students reorder purely by pronoun-chasing and miss the bigger frame — a paragraph about a process must follow the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Beyond referential cohesion, sentence order follows temporal and causal structure: events',
                  options: ['Beyond referential cohesion, sentence order follows temporal and causal structure: events', 'Sentence-reordering items test cohesion logic: sentences link through pronoun references,', 'Sentence-reordering is cohesion logic: an opening sentence introduces entities with'],
                  hint: 'Recall the definition.',
                  misconception: 'Students reorder purely by pronoun-chasing and miss the bigger frame — a paragraph about a process must follow the process\'s real order.' }
          ],
            remediations: { 'students-reorder-purely-by-pronoun': { steps: ['Look for time markers (\'first/then/finally\', dates) and causal words (\'because/so/therefore\').', 'Build the real-world or logical sequence first, then let pronouns confirm it.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
