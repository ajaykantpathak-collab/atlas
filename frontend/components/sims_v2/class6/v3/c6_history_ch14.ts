import type { SimDef } from '../../engine/types';

/** v3 generated — c6_history_ch14 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_history_ch14: SimDef = {
    id: 'v3_c6_history_ch14',
    title: 'India\'s Cultural Roots',
    subtitle: 'This node covers the Vedas, the 1st-millennium-BCE schools of thought (Upanishads.',
    classLevel: 6, subject: 'history', topic: 'India\'s Cultural Roots',
    chapters: ['c6_history_ch14'],
    nodeIds: ['c6_history_ch14_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Picture Indian culture as a great tree — and this chapter digs down to its roots.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Vedas, new schools of thought, folk and tribal traditions', text: 'India\'s cultural roots rest on three streams. First, the Vedas — the four most ancient texts (Rig Veda, Yajur Veda, Sama Veda, Atharva Veda) — collections of hymns and prayers that shaped early Vedic.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_history_ch14_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        labels: ['Vedas, new schools'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c6_history_ch14_001', title: 'Vedas, new schools of thought, folk and tribal traditions',
          caseStudy: { intro: 'Picture Indian culture as a great tree — and this chapter digs down to its roots.',
            decisions: [{ prompt: 'What are the four Vedas?', options: [
                { text: 'The four Vedas are the Rig Veda, Yajur Veda, Sama Veda, and Atharva Veda', outcome: 'The four Vedas are the Rig Veda, Yajur Veda, Sama Veda, and Atharva Veda — ancient collections.' },
                { text: 'Indian culture was built only by the Vedas and great texts', outcome: 'Not quite — Students often think Indian culture was built only by the Vedas and great texts.', reveals: 'indian-culture-was-built-only' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch14_001', title: 'You made it',
          caseStudy: { intro: 'You finished India\'s Cultural Roots — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_history_ch14_001', difficulty: 'standard',
          question: 'India\'s cultural roots rest on three streams. First, the Vedas — the four most.',
          hint: 'If stuck, revisit "India, That Is Bharat" — the land these roots grew in.',
          misconception: 'Students often think Indian culture was built only by the Vedas and great texts.',
          parts: [
                { id: 'a', prompt: 'What are the four Vedas?', answer: 'The four Vedas are the Rig Veda, Yajur Veda, Sama Veda, and Atharva Veda',
                  options: ['The four Vedas are the Rig Veda, Yajur Veda, Sama Veda, and Atharva Veda', 'Indian culture was built only by the Vedas and great texts'],
                  hint: 'If stuck, revisit "India, That Is Bharat" — the land these roots grew in.',
                  misconception: 'Students often think Indian culture was built only by the Vedas and great texts.' },
                { id: 'b', prompt: 'What does the word \'Veda\' mean and what do the Vedas contain?', answer: '\'Veda\' comes from the Sanskrit \'vid\'',
                  options: ['\'Veda\' comes from the Sanskrit \'vid\'', 'Indian culture was built only by the Vedas and great texts'],
                  hint: 'If stuck, revisit "India, That Is Bharat" — the land these roots grew in.',
                  misconception: 'Students often think Indian culture was built only by the Vedas and great texts.' },
                { id: 'c', prompt: 'What new schools of thought arose in the 1st millennium BCE and what did they question?', answer: 'The Upanishads, Buddhism, and Jainism arose',
                  options: ['The Upanishads, Buddhism, and Jainism arose', 'Indian culture was built only by the Vedas and great texts'],
                  hint: 'If stuck, revisit "India, That Is Bharat" — the land these roots grew in.',
                  misconception: 'Students often think Indian culture was built only by the Vedas and great texts.' },
                { id: 'd', prompt: 'What is \'brahman\' in the Upanishads?', answer: 'Brahman is the one divine essence that the Upanishads (the Vedanta teaching) say',
                  options: ['Brahman is the one divine essence that the Upanishads (the Vedanta teaching) say', 'Indian culture was built only by the Vedas and great texts'],
                  hint: 'If stuck, revisit "India, That Is Bharat" — the land these roots grew in.',
                  misconception: 'Students often think Indian culture was built only by the Vedas and great texts.' }
          ],
            remediations: { 'indian-culture-was-built-only': { steps: ['If the three streams blur together, draw three roots under a tree labelled \'Indian culture\' — \'Vedas (hymns &.', 'Then fill each root with one detail until the student can retell all three.', 'Finish by asking which root a harvest song belongs to — and why that answer matters.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
