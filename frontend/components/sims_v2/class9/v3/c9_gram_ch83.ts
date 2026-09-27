import type { SimDef } from '../../engine/types';

/** v3 generated — c9_gram_ch83 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_gram_ch83: SimDef = {
    id: 'v3_c9_gram_ch83',
    title: 'The full reported-speech machine at class 9.',
    subtitle: 'Covers the complete board-tested reported speech system. Does NOT cover reporting.',
    classLevel: 9, subject: 'gram', topic: 'The full reported-speech machine at class 9.',
    chapters: ['c9_gram_ch83'],
    nodeIds: ['c9_gram_cbse_83_001', 'c9_gram_ch83_002', 'c9_gram_ch83_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'Type-check first, transform second: (1) statement → said/told + that + backshifted clause; (2) yes/no.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'The full reported-speech machine at.', text: 'The full reported-speech machine at class 9: statements take \'that\' + backshift; questions take if/whether (yes/no) or the wh-word, with statement order restored and the question mark dropped.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c9_gram_ch83_002', title: 'Identify each idea',
          dissect: { specimen: 'The full reported-speech machine at class 9.', spots: [
            { id: 's1', label: 'The full reported-speech machine at', prompt: 'Which idea is this? — The full reported-speech machine at class 9: statements take \'that\' + backshift.', answer: 'The full reported-speech machine at', options: ['The full reported-speech machine at', 'Reported questions lose their interrogative', 'Reported imperatives use reporting verb'] },
            { id: 's2', label: 'Reported questions lose their interrogative', prompt: 'Which idea is this? — Reported questions lose their interrogative grammar: yes/no questions are introduced.', answer: 'Reported questions lose their interrogative', options: ['Reported questions lose their interrogative', 'The full reported-speech machine at', 'Reported imperatives use reporting verb'] },
            { id: 's3', label: 'Reported imperatives use reporting verb', prompt: 'Which idea is this? — Reported imperatives use \'reporting verb + object + to-infinitive\': commands take.', answer: 'Reported imperatives use reporting verb', options: ['Reported imperatives use reporting verb', 'The full reported-speech machine at', 'Reported questions lose their interrogative'] }
          ] } },
        { type: 'build', nodeId: 'c9_gram_cbse_83_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Pick the frame — that / if-whether / wh-word.', 'Rebuild inside the frame — statement order, backshift.', 'Reporting verb matches the original\'s force.', 'Identify the sentence type.'], answer: 'Identify the sentence type. Pick the frame — that / if-whether / wh-word. Rebuild inside the frame — statement order, backshift. Reporting verb matches the original\'s force.' } },
        { type: 'case', nodeId: 'c9_gram_ch83_003', title: 'You made it',
          caseStudy: { intro: 'You finished The full reported-speech machine at class 9. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c9_gram_cbse_83_001', difficulty: 'standard',
          question: 'The full reported-speech machine at class 9: statements take \'that\'.',
          hint: 'Work step by step.',
          misconception: 'Students memorize the statement rule and apply it to everything — \'He asked that where did I go\' mixes all three frame.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The full reported-speech machine at class 9: statements take \'that\' + backshift',
                  options: ['The full reported-speech machine at class 9: statements take \'that\' + backshift', 'Reported questions lose their interrogative grammar: yes/no questions are introduced by', 'Reported imperatives use \'reporting verb + object + to-infinitive\': commands take'],
                  hint: 'Recall the definition.',
                  misconception: 'Students memorize the statement rule and apply it to everything — \'He asked that where did I go\' mixes all three frame errors at once.' }
          ],
            remediations: { 'students-memorize-the-statement-rule': { steps: ['Identify the sentence type.', 'Pick the frame — that / if-whether / wh-word / to-infinitive.', 'Rebuild inside the frame — statement order, backshift, deictics.', 'Reporting verb matches the original\'s force (please→requested, don\'t→warned).'] } } },
        { type: 'subpart', nodeId: 'c9_gram_ch83_002', difficulty: 'standard',
          question: 'Reported questions lose their interrogative grammar: yes/no questions are.',
          hint: 'Work step by step.',
          misconception: 'Students glue \'that\' onto questions or keep the inversion — \'He asked that did I like tea\' / \'where did I live\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Reported questions lose their interrogative grammar: yes/no questions are introduced by',
                  options: ['Reported questions lose their interrogative grammar: yes/no questions are introduced by', 'The full reported-speech machine at class 9: statements take \'that\' + backshift', 'Reported imperatives use \'reporting verb + object + to-infinitive\': commands take'],
                  hint: 'Recall the definition.',
                  misconception: 'Students glue \'that\' onto questions or keep the inversion — \'He asked that did I like tea\' / \'where did I live\'.' }
          ],
            remediations: { 'students-glue-that-onto-questions': { steps: ['Decide the type first — yes/no or wh- — then rebuild as a statement: if/wh-word + subject + backshifted verb,.'] } } },
        { type: 'subpart', nodeId: 'c9_gram_ch83_003', difficulty: 'standard',
          question: 'Reported imperatives use \'reporting verb + object + to-infinitive\': commands.',
          hint: 'Work step by step.',
          misconception: 'Students use one verb for everything — \'said to sit down\' — and lose the force distinction the reporting verb must.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Reported imperatives use \'reporting verb + object + to-infinitive\': commands take',
                  options: ['Reported imperatives use \'reporting verb + object + to-infinitive\': commands take', 'The full reported-speech machine at class 9: statements take \'that\' + backshift', 'Reported questions lose their interrogative grammar: yes/no questions are introduced by'],
                  hint: 'Recall the definition.',
                  misconception: 'Students use one verb for everything — \'said to sit down\' — and lose the force distinction the reporting verb must carry.' }
          ],
            remediations: { 'students-use-one-verb-for': { steps: ['Name the force first — command, request, advice, warning — pick the matching reporting verb, then build \'verb + object.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
