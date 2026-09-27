import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch91 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch91: SimDef = {
    id: 'v3_c10_engl_ch91',
    title: 'An informal letter at board level drops two.',
    subtitle: 'This node covers the informal letter\'s skeleton and register pairing.',
    classLevel: 10, subject: 'engl', topic: 'An informal letter at board level drops two.',
    chapters: ['c10_engl_ch91'],
    nodeIds: ['c10_engl_cbse_91_001', 'c10_engl_cbse_91_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '1. Same diagram, fewer blocks: sender\'s address, date — then straight to \'Dear Neha,\'.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'An informal letter at board level drops.', text: 'An informal letter at board level drops two formal blocks — receiver\'s address and subject line — but keeps the rest: writer\'s address, date, warm salutation, conversational body, warm subscription.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_91_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_91_001', title: 'An informal letter at board level drops.',
          caseStudy: { intro: '1. Same diagram, fewer blocks: sender\'s address, date — then straight to \'Dear Neha,\'. No receiver\'s address, no subject. 2.',
            decisions: [{ prompt: 'Which two formal blocks does an informal letter drop?', options: [
                { text: 'The receiver\'s address and the subject line', outcome: 'The receiver\'s address and the subject line.' },
                { text: 'informal means format-free', outcome: 'Not quite — Students assume informal means format-free — no date, no closing, just chat.', reveals: 'informal-means-format-free-no' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_91_002', title: 'You made it',
          caseStudy: { intro: 'You finished An informal letter at board level drops two. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_91_001', difficulty: 'standard',
          question: 'An informal letter at board level drops two formal blocks — receiver\'s address.',
          hint: 'Work step by step.',
          misconception: 'Students assume informal means format-free — no date, no closing, just chat.',
          parts: [
                { id: 'a', prompt: 'Which two formal blocks does an informal letter drop?', answer: 'The receiver\'s address and the subject line',
                  options: ['The receiver\'s address and the subject line', 'informal means format-free'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students assume informal means format-free — no date, no closing, just chat.' },
                { id: 'b', prompt: 'Pick the right sign-off for a letter to your cousin: \'Yours faithfully\', \'Yours lovingly\', or \'Yours sincerely\'.', answer: '\'Yours lovingly\'',
                  options: ['\'Yours lovingly\'', 'informal means format-free'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students assume informal means format-free — no date, no closing, just chat.' },
                { id: 'c', prompt: 'Fix this informal opener: \'I am writing to apprise you of my recent academic achievement.\'', answer: 'Make it talk like a person: \'Guess what',
                  options: ['Make it talk like a person: \'Guess what', 'informal means format-free'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students assume informal means format-free — no date, no closing, just chat.' },
                { id: 'd', prompt: 'Does an informal letter need a subject line?', answer: 'No — subject lines belong to formal letters',
                  options: ['No — subject lines belong to formal letters', 'informal means format-free'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students assume informal means format-free — no date, no closing, just chat.' }
          ],
            remediations: { 'informal-means-format-free-no': { steps: ['Check the light skeleton first — address, date, \'Dear ___\', body, warm close, name — then check the voice.', 'If a sentence sounds like a report, warm it until it sounds like you.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_91_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students assume informal means format-free — no date, no closing, just chat.',
          parts: [
                { id: 'a', prompt: 'True or False: The register is friendly, but the skeleton is still marked.', answer: 'True — lighter is not absent',
                  options: ['True — lighter is not absent', 'informal means format-free'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students assume informal means format-free — no date, no closing, just chat.' },
                { id: 'b', prompt: 'What must you be able to do to master this topic?', answer: 'Write a complete informal letter with the correct light skeleton, a genuinely',
                  options: ['Write a complete informal letter with the correct light skeleton, a genuinely', 'informal means format-free'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students assume informal means format-free — no date, no closing, just chat.' }
          ],
            remediations: { 'informal-means-format-free-no': { steps: ['Check the light skeleton first — address, date, \'Dear ___\', body, warm close, name — then check the voice.', 'If a sentence sounds like a report, warm it until it sounds like you.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
