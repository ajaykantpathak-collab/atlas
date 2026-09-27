import type { SimDef } from '../../engine/types';

/** v3 generated — c6_history_ch13 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_history_ch13: SimDef = {
    id: 'v3_c6_history_ch13',
    title: 'India, That Is Bharat',
    subtitle: 'This node covers the ancient names of India and how the word \'India\' evolved from.',
    classLevel: 6, subject: 'history', topic: 'India, That Is Bharat',
    chapters: ['c6_history_ch13'],
    nodeIds: ['c6_history_ch13_001', 'c6_history_ch13_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine tracing a name back through time the way you\'d trace a river upstream.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Why is \'Hindu\' described as a purely geographical term in this context?',
        options: ['Because it was the Persian way of saying \'Sindhu\'', '\'Indian\' does today', '\'Hindu\' in this chapter refers to the Hindu religion'],
        answer: 'Because it was the Persian way of saying \'Sindhu\'',
        hook: 'Students often think \'Hindu\' in this chapter refers to the Hindu religion.',
    },
    teaching: [
        { title: 'Ancient names of India — Bharatavarsha, Jambudvipa, Sindhu to India', text: 'India has been known by several names across history. Ancient Indian texts called the land Bharatavarsha (the land of the Bharatas) and Jambudvipa (the island of the jamun tree).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_history_ch13_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        labels: ['Ancient names of India', 'Sources of the past'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c6_history_ch13_001', title: 'Ancient names of India — Bharatavarsha, Jambudvipa, Sindhu to India',
          caseStudy: { intro: 'Imagine tracing a name back through time the way you\'d trace a river upstream. Start at the end — the word \'India\'. Where did it come from?',
            decisions: [{ prompt: 'What were the ancient Indian names for the land we call India?', options: [
                { text: 'Ancient texts called it Bharatavarsha', outcome: 'Ancient texts called it Bharatavarsha — \'the land of the Bharatas\' — and Jambudvipa — \'the island.' },
                { text: '\'Hindu\' in this chapter refers to the Hindu religion', outcome: 'Not quite — Students often think \'Hindu\' in this chapter refers to the Hindu religion.', reveals: 'hindu-in-this-chapter-refers' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch13_002', title: 'You made it',
          caseStudy: { intro: 'You finished India, That Is Bharat — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_history_ch13_001', difficulty: 'standard',
          question: 'India has been known by several names across history. Ancient Indian texts.',
          hint: 'If stuck, revisit "Beginnings of Indian Civilisation" — the land and its rivers.',
          misconception: 'Students often think \'Hindu\' in this chapter refers to the Hindu religion.',
          parts: [
                { id: 'a', prompt: 'What were the ancient Indian names for the land we call India?', answer: 'Ancient texts called it Bharatavarsha',
                  options: ['Ancient texts called it Bharatavarsha', '\'Hindu\' in this chapter refers to the Hindu religion'],
                  hint: 'If stuck, revisit "Beginnings of Indian Civilisation" — the land and its rivers.',
                  misconception: 'Students often think \'Hindu\' in this chapter refers to the Hindu religion.' },
                { id: 'b', prompt: 'Why is \'Hindu\' described as a purely geographical term in this context?', answer: 'Because it was the Persian way of saying \'Sindhu\'',
                  options: ['Because it was the Persian way of saying \'Sindhu\'', '\'Indian\' does today', '\'Hindu\' in this chapter refers to the Hindu religion'],
                  hint: 'If stuck, revisit "Beginnings of Indian Civilisation" — the land and its rivers.',
                  misconception: 'Students often think \'Hindu\' in this chapter refers to the Hindu religion.' },
                { id: 'c', prompt: 'What does \'Bharatavarsha\' literally mean?', answer: 'It means \'the land of the Bharatas\'',
                  options: ['It means \'the land of the Bharatas\'', '\'Hindu\' in this chapter refers to the Hindu religion'],
                  hint: 'If stuck, revisit "Beginnings of Indian Civilisation" — the land and its rivers.',
                  misconception: 'Students often think \'Hindu\' in this chapter refers to the Hindu religion.' }
          ],
            remediations: { 'hindu-in-this-chapter-refers': { steps: ['If the student jumbles the chain, write it as arrows on paper — Sindhu → Hind/Hindu (Persian) → Indoi/Indike (Greek) →.', 'Then separate the two name families: self-given (Bharatavarsha, Jambudvipa) versus outsider-given (Sindhu→India).', 'Finish by asking why the Constitution joins both names.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch13_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think \'Hindu\' in this chapter refers to the Hindu religion.',
          parts: [
                { id: 'a', prompt: 'What does \'Jambudvipa\' refer to?', answer: 'It means \'the island of the jamun (jambu) tree\'',
                  options: ['It means \'the island of the jamun (jambu) tree\'', '\'Hindu\' in this chapter refers to the Hindu religion'],
                  hint: 'If stuck, revisit "Beginnings of Indian Civilisation" — the land and its rivers.',
                  misconception: 'Students often think \'Hindu\' in this chapter refers to the Hindu religion.' }
          ],
            remediations: { 'hindu-in-this-chapter-refers': { steps: ['If the student jumbles the chain, write it as arrows on paper — Sindhu → Hind/Hindu (Persian) → Indoi/Indike (Greek) →.', 'Then separate the two name families: self-given (Bharatavarsha, Jambudvipa) versus outsider-given (Sindhu→India).', 'Finish by asking why the Constitution joins both names.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
