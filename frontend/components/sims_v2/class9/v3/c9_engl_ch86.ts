import type { SimDef } from '../../engine/types';

/** v3 generated — c9_engl_ch86 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_engl_ch86: SimDef = {
    id: 'v3_c9_engl_ch86',
    title: 'A formal letter follows a fixed eight-element.',
    subtitle: 'This node covers the formal letter\'s format and block order only.',
    classLevel: 9, subject: 'engl', topic: 'A formal letter follows a fixed eight-element.',
    chapters: ['c9_engl_ch86'],
    nodeIds: ['c9_engl_cbse_86_001', 'c9_engl_cbse_86_002', 'c9_engl_cbse_86_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: '1. Think like the receiver: they need to know who is writing (sender\'s address), when (date), who they are.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'A formal letter follows a fixed.', text: 'A formal letter follows a fixed eight-element skeleton in strict order: sender\'s address, date, receiver\'s address, salutation, subject line, body, subscription (\'Yours faithfully\'), and signature.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_engl_cbse_86_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_engl_cbse_86_002', title: 'Identify each idea',
          dissect: { specimen: 'A formal letter follows a fixed eight-element.', spots: [
            { id: 's1', label: 'A formal letter follows a', prompt: 'Which idea is this? — A formal letter follows a fixed eight-element skeleton in strict order: sender\'s address.', answer: 'A formal letter follows a', options: ['A formal letter follows a', 'Formal register is the controlled', 'A notice is a boxed'] },
            { id: 's2', label: 'Formal register is the controlled', prompt: 'Which idea is this? — Formal register is the controlled language style required in official letters:.', answer: 'Formal register is the controlled', options: ['Formal register is the controlled', 'A formal letter follows a', 'A notice is a boxed'] },
            { id: 's3', label: 'A notice is a boxed', prompt: 'Which idea is this? — A notice is a boxed public announcement of about 50 words. The header stack is fixed.', answer: 'A notice is a boxed', options: ['A notice is a boxed', 'A formal letter follows a', 'Formal register is the controlled'] }
          ] } },
        { type: 'case', nodeId: 'c9_engl_cbse_86_003', title: 'You made it',
          caseStudy: { intro: 'You finished A formal letter follows a fixed eight-element. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_engl_cbse_86_001', difficulty: 'standard',
          question: 'A formal letter follows a fixed eight-element skeleton in strict order.',
          hint: 'Work step by step.',
          misconception: 'Students know the blocks but treat order as a suggestion — subject above salutation, date wherever it fits.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A formal letter follows a fixed eight-element skeleton in strict order: sender\'s address,',
                  options: ['A formal letter follows a fixed eight-element skeleton in strict order: sender\'s address,', 'Formal register is the controlled language style required in official letters: no', 'A notice is a boxed public announcement of about 50 words'],
                  hint: 'Recall the definition.',
                  misconception: 'Students know the blocks but treat order as a suggestion — subject above salutation, date wherever it fits.' }
          ],
            remediations: { 'students-know-the-blocks-but': { steps: ['Draw the skeleton as a diagram first: sender → date → receiver → salutation → subject → body → subscription → signature.', 'Then pour your content into the body slot only.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_cbse_86_002', difficulty: 'standard',
          question: 'Formal register is the controlled language style required in official letters.',
          hint: 'Work step by step.',
          misconception: 'Students think \'formal\' means \'fancy\', so they stuff in big words while keeping contractions and exclamations.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Formal register is the controlled language style required in official letters: no',
                  options: ['Formal register is the controlled language style required in official letters: no', 'A formal letter follows a fixed eight-element skeleton in strict order: sender\'s address,', 'A notice is a boxed public announcement of about 50 words'],
                  hint: 'Recall the definition.',
                  misconception: 'Students think \'formal\' means \'fancy\', so they stuff in big words while keeping contractions and exclamations.' }
          ],
            remediations: { 'formal-means-fancy': { steps: ['Run the banned-list check: find every contraction, slang word, exclamation mark, and vague filler.', 'Expand or replace each one, then make the request a polite conditional.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_cbse_86_003', difficulty: 'standard',
          question: 'A notice is a boxed public announcement of about 50 words. The header stack.',
          hint: 'Work step by step.',
          misconception: 'Students treat the word limit as decorative and the tone as friendly.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A notice is a boxed public announcement of about 50 words',
                  options: ['A notice is a boxed public announcement of about 50 words', 'A formal letter follows a fixed eight-element skeleton in strict order: sender\'s address,', 'Formal register is the controlled language style required in official letters: no'],
                  hint: 'Recall the definition.',
                  misconception: 'Students treat the word limit as decorative and the tone as friendly.' }
          ],
            remediations: { 'students-treat-the-word-limit': { steps: ['Rebuild mechanically: box, four-line header, clipped third-person body with What-When-Where-Who, name + designation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
