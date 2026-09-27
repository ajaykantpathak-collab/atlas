import type { SimDef } from '../../engine/types';

/** v3 generated — c11_gram_ch80 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_gram_ch80: SimDef = {
    id: 'v3_c11_gram_ch80',
    title: 'Subordinate clauses are classified by the JOB.',
    subtitle: 'Covers the three subordinate clause types and their tests. Does NOT cover reduced clauses.',
    classLevel: 11, subject: 'gram', topic: 'Subordinate clauses are classified by the JOB.',
    chapters: ['c11_gram_ch80'],
    nodeIds: ['c11_gram_cbse_80_001', 'c11_gram_cbse_80_002', 'c11_gram_ch80_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'The substitution tests: noun clause — replace it with \'something/it\' and the sentence survives (\'What.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Subordinate clauses are classified by.', text: 'Subordinate clauses are classified by the JOB they do in the main clause: a noun clause works as subject/object/complement (\'What he said was true\'), an adjective (relative) clause describes a noun.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c11_gram_cbse_80_002', title: 'Identify each idea',
          dissect: { specimen: 'Subordinate clauses are classified by the JOB.', spots: [
            { id: 's1', label: 'Subordinate clauses are classified by', prompt: 'Which idea is this? — Subordinate clauses are classified by the JOB they do in the main clause: a noun clause.', answer: 'Subordinate clauses are classified by', options: ['Subordinate clauses are classified by', 'Relative clauses join with whowhomwhosewhichthat'] },
            { id: 's2', label: 'Relative clauses join with whowhomwhosewhichthat', prompt: 'Which idea is this? — Relative clauses join with who/whom/whose/which/that — and the choice carries meaning.', answer: 'Relative clauses join with whowhomwhosewhichthat', options: ['Relative clauses join with whowhomwhosewhichthat', 'Subordinate clauses are classified by'] }
          ] } },
        { type: 'build', nodeId: 'c11_gram_cbse_80_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Apply the swap tests to confirm.', 'Ask what it does — subject/object of the main verb (noun).', 'Locate the subordinate clause boundaries.'], answer: 'Locate the subordinate clause boundaries. Ask what it does — subject/object of the main verb (noun). Apply the swap tests to confirm.' } },
        { type: 'case', nodeId: 'c11_gram_ch80_003', title: 'You made it',
          caseStudy: { intro: 'You finished Subordinate clauses are classified by the JOB. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_gram_cbse_80_001', difficulty: 'standard',
          question: 'Subordinate clauses are classified by the JOB they do in the main clause:.',
          hint: 'Work step by step.',
          misconception: 'Students classify clauses by their introductory word — assuming every \'that\'-clause is a noun clause and every.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Subordinate clauses are classified by the JOB they do in the main clause: a noun clause',
                  options: ['Subordinate clauses are classified by the JOB they do in the main clause: a noun clause', 'Relative clauses join with who/whom/whose/which/that', 'Subordinate clauses are classified by the grammatical job they do inside the main clause:'],
                  hint: 'Recall the definition.',
                  misconception: 'Students classify clauses by their introductory word — assuming every \'that\'-clause is a noun clause and every \'when\'-clause is adverbial.' }
          ],
            remediations: { 'students-classify-clauses-by-their': { steps: ['Locate the subordinate clause boundaries.', 'Ask what it does — subject/object of the main verb (noun), describes a noun (adjective), or modifies the verb\'s.', 'Apply the swap tests to confirm.'] } } },
        { type: 'subpart', nodeId: 'c11_gram_cbse_80_002', difficulty: 'standard',
          question: 'Relative clauses join with who/whom/whose/which/that — and the choice carries.',
          hint: 'Work step by step.',
          misconception: 'Students use \'that\' everywhere including after commas (\'My father, that is a doctor,…\'), drop \'whose\' for \'of which\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Relative clauses join with who/whom/whose/which/that',
                  options: ['Relative clauses join with who/whom/whose/which/that', 'Subordinate clauses are classified by the JOB they do in the main clause: a noun clause', 'Subordinate clauses are classified by the grammatical job they do inside the main clause:'],
                  hint: 'Recall the definition.',
                  misconception: 'Students use \'that\' everywhere including after commas (\'My father, that is a doctor,…\'), drop \'whose\' for \'of which\' clumsily, and ignore.' }
          ],
            remediations: { 'students-use-that-everywhere-including': { steps: ['People → who/whom; things → which/that; possession → whose.', 'Defining (which-one) → no commas, \'that\' allowed.', 'Non-defining (extra info) → commas, only who/which — never \'that\'.'] } } },
        { type: 'subpart', nodeId: 'c11_gram_ch80_003', difficulty: 'standard',
          question: 'Subordinate clauses are classified by the grammatical job they do inside the.',
          hint: 'Work step by step.',
          misconception: 'Students classify by the connector word — \'where\' must be adverbial, \'which\' adjective — but classification is by the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Subordinate clauses are classified by the grammatical job they do inside the main clause:',
                  options: ['Subordinate clauses are classified by the grammatical job they do inside the main clause:', 'Subordinate clauses are classified by the JOB they do in the main clause: a noun clause', 'Relative clauses join with who/whom/whose/which/that'],
                  hint: 'Recall the definition.',
                  misconception: 'Students classify by the connector word — \'where\' must be adverbial, \'which\' adjective — but classification is by the clause\'s JOB, not its.' }
          ],
            remediations: { 'students-classify-by-the-connector': { steps: ['Run the replacement test: swap the clause for \'something\' (noun), check if it describes the preceding noun (adjective).'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
