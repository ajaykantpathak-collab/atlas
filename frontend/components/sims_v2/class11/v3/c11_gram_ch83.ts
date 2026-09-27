import type { SimDef } from '../../engine/types';

/** v3 generated — c11_gram_ch83 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_gram_ch83: SimDef = {
    id: 'v3_c11_gram_ch83',
    title: 'In complex sentences the subordinate tense must.',
    subtitle: 'Covers systematic tense harmony beyond reported speech. Does NOT cover conditional.',
    classLevel: 11, subject: 'gram', topic: 'In complex sentences the subordinate tense must.',
    chapters: ['c11_gram_ch83'],
    nodeIds: ['c11_gram_cbse_83_001', 'c11_gram_ch83_002', 'c11_gram_ch83_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'The purpose-clause rule: \'He studies so that he may pass\' (present main) vs \'He studied so that he might.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'In complex sentences the subordinate.', text: 'In complex sentences the subordinate tense must harmonize with the main: past main → past-family subordinates (\'He worked hard so that he might pass\'); present/future main → free subordinates.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c11_gram_ch83_002', title: 'Identify each idea',
          dissect: { specimen: 'In complex sentences the subordinate tense must.', spots: [
            { id: 's1', label: 'In complex sentences the subordinate', prompt: 'Which idea is this? — In complex sentences the subordinate tense must harmonize with the main: past main →.', answer: 'In complex sentences the subordinate', options: ['In complex sentences the subordinate', 'Sequence of tenses is the', 'Clause-type constraints override sequence of'] },
            { id: 's2', label: 'Sequence of tenses is the', prompt: 'Which idea is this? — Sequence of tenses is the constraint that a subordinate clause\'s verb harmonizes with the.', answer: 'Sequence of tenses is the', options: ['Sequence of tenses is the', 'In complex sentences the subordinate', 'Clause-type constraints override sequence of'] },
            { id: 's3', label: 'Clause-type constraints override sequence of', prompt: 'Which idea is this? — Clause-type constraints override sequence of tenses: adverbial clauses of reason.', answer: 'Clause-type constraints override sequence of', options: ['Clause-type constraints override sequence of', 'In complex sentences the subordinate', 'Sequence of tenses is the'] }
          ] } },
        { type: 'build', nodeId: 'c11_gram_cbse_83_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Purpose — may (present zone) / might (past zone).', 'Time clauses for the future use present form — \'when.', 'Fix the main clause\'s zone.'], answer: 'Fix the main clause\'s zone. Purpose — may (present zone) / might (past zone). Time clauses for the future use present form — \'when.' } },
        { type: 'case', nodeId: 'c11_gram_ch83_003', title: 'You made it',
          caseStudy: { intro: 'You finished In complex sentences the subordinate tense must. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_gram_cbse_83_001', difficulty: 'standard',
          question: 'In complex sentences the subordinate tense must harmonize with the main: past.',
          hint: 'Work step by step.',
          misconception: 'Students put \'will\' inside future time-clauses (\'when I will arrive\') — a direct Hindi-transfer — and keep \'may\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In complex sentences the subordinate tense must harmonize with the main: past main →',
                  options: ['In complex sentences the subordinate tense must harmonize with the main: past main →', 'Sequence of tenses is the constraint that a subordinate clause\'s verb harmonizes with the', 'Clause-type constraints override sequence of tenses: adverbial clauses of reason,'],
                  hint: 'Recall the definition.',
                  misconception: 'Students put \'will\' inside future time-clauses (\'when I will arrive\') — a direct Hindi-transfer — and keep \'may\' in past purpose clauses.' }
          ],
            remediations: { 'students-put-will-inside-future': { steps: ['Fix the main clause\'s zone.', 'Purpose — may (present zone) / might (past zone).', 'Time clauses for the future use present form — \'when I arrive\', never \'when I will arrive\'.'] } } },
        { type: 'subpart', nodeId: 'c11_gram_ch83_002', difficulty: 'standard',
          question: 'Sequence of tenses is the constraint that a subordinate clause\'s verb.',
          hint: 'Work step by step.',
          misconception: 'Students either backshift everything (breaking universal truths) or nothing (breaking real sequence).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sequence of tenses is the constraint that a subordinate clause\'s verb harmonizes with the',
                  options: ['Sequence of tenses is the constraint that a subordinate clause\'s verb harmonizes with the', 'In complex sentences the subordinate tense must harmonize with the main: past main →', 'Clause-type constraints override sequence of tenses: adverbial clauses of reason,'],
                  hint: 'Recall the definition.',
                  misconception: 'Students either backshift everything (breaking universal truths) or nothing (breaking real sequence).' }
          ],
            remediations: { 'students-either-backshift-everything-breaking': { steps: ['Check the main verb\'s tense first — present leaves the subordinate free, past steps it back.', 'Then ask whether the subordinate clause is a timeless truth — if so, hold it present.'] } } },
        { type: 'subpart', nodeId: 'c11_gram_ch83_003', difficulty: 'standard',
          question: 'Clause-type constraints override sequence of tenses: adverbial clauses.',
          hint: 'Work step by step.',
          misconception: 'Students backshift or front-shift every subordinate clause by the main verb — but reason, condition, and comparison.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Clause-type constraints override sequence of tenses: adverbial clauses of reason,',
                  options: ['Clause-type constraints override sequence of tenses: adverbial clauses of reason,', 'In complex sentences the subordinate tense must harmonize with the main: past main →', 'Sequence of tenses is the constraint that a subordinate clause\'s verb harmonizes with the'],
                  hint: 'Recall the definition.',
                  misconception: 'Students backshift or front-shift every subordinate clause by the main verb — but reason, condition, and comparison clauses anchor to their.' }
          ],
            remediations: { 'students-backshift-or-front-shift': { steps: ['Identify the clause type first: time clauses → present-for-future; conditionals → their type\'s fixed shape.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
