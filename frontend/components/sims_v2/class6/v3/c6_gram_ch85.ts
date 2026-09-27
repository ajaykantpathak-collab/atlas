import type { SimDef } from '../../engine/types';

/** v3 generated — c6_gram_ch85 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_gram_ch85: SimDef = {
    id: 'v3_c6_gram_ch85',
    title: 'A paragraph is a group of sentences built.',
    subtitle: 'This node covers single-paragraph structure only: topic sentence, supporting sentences.',
    classLevel: 6, subject: 'gram', topic: 'A paragraph is a group of sentences built.',
    chapters: ['c6_gram_ch85'],
    nodeIds: ['c6_gram_cbse_85_001', 'c6_gram_cbse_85_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: '1. Read a model paragraph aloud — for example, one about \'My school library\'.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'A paragraph is a group of sentences.', text: 'A paragraph is a group of sentences built around a single main idea.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c6_gram_cbse_85_002', title: 'An informal letter is a personal letter.',
          caseStudy: { intro: '1. Look at a real informal letter. At the top right: the writer\'s address and the date.',
            decisions: [{ prompt: 'List the blocks of an informal letter in order.', options: [
                { text: 'Writer\'s address, date, warm salutation (\'Dear ___\'), friendly body, warm closing (\'Yours', outcome: 'Writer\'s address, date, warm salutation (\'Dear ___\'), friendly body, warm closing (\'Yours lovingly\'.' },
                { text: '\'informal\' means \'no format at all\', so they drop the address, date, and closing', outcome: 'Not quite — Students think \'informal\' means \'no format at all\', so they drop the address, date, and closing.', reveals: 'informal-means-no-format-at' }
            ] }] } },
        { type: 'dissect', nodeId: 'c6_gram_cbse_85_002', title: 'Identify each idea',
          dissect: { specimen: 'A paragraph is a group of sentences built.', spots: [
            { id: 's1', label: 'A paragraph is a group', prompt: 'Which idea is this? — A paragraph is a group of sentences built around a single main idea.', answer: 'A paragraph is a group', options: ['A paragraph is a group', 'An informal letter is a'] },
            { id: 's2', label: 'An informal letter is a', prompt: 'Which idea is this? — An informal letter is a personal letter written to a friend or relative.', answer: 'An informal letter is a', options: ['An informal letter is a', 'A paragraph is a group'] }
          ] } },
        { type: 'case', nodeId: 'c6_gram_cbse_85_002', title: 'You made it',
          caseStudy: { intro: 'You finished A paragraph is a group of sentences built. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c6_gram_cbse_85_002', difficulty: 'standard',
          question: 'An informal letter is a personal letter written to a friend or relative.',
          hint: 'Work step by step.',
          misconception: 'Students think \'informal\' means \'no format at all\', so they drop the address, date, and closing.',
          parts: [
                { id: 'a', prompt: 'Does an informal letter need a subject line? Why?', answer: 'No — a subject line belongs to formal letters',
                  options: ['No — a subject line belongs to formal letters', '\'informal\' means \'no format at all\', so they drop the address, date, and closing'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think \'informal\' means \'no format at all\', so they drop the address, date, and closing.' },
                { id: 'b', prompt: 'Which sign-off fits a letter to your grandmother: \'Yours faithfully\' or \'Yours lovingly\'?', answer: '\'Yours lovingly\'',
                  options: ['\'Yours lovingly\'', '\'informal\' means \'no format at all\', so they drop the address, date, and closing'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think \'informal\' means \'no format at all\', so they drop the address, date, and closing.' },
                { id: 'c', prompt: 'Fix this opening for a letter to a cousin: \'I am writing to apprise you of my recent achievement.\'', answer: 'Make it warm and chatty, e.g., \'Guess what, Rahul',
                  options: ['Make it warm and chatty, e.g., \'Guess what, Rahul', '\'informal\' means \'no format at all\', so they drop the address, date, and closing'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think \'informal\' means \'no format at all\', so they drop the address, date, and closing.' }
          ],
            remediations: { 'informal-means-no-format-at': { steps: ['Check the skeleton first: address, date, \'Dear ___\', body, warm close, name.', 'Then check the voice — does it sound like talking to a friend?', 'If it reads like a report, warm it up.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
