import type { SimDef } from '../../engine/types';

/** v3 generated — c6_geography_ch07 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_geography_ch07: SimDef = {
    id: 'v3_c6_geography_ch07',
    title: 'Oceans and Continents',
    subtitle: 'This node covers the names, count, and relative sizes of the oceans and continents and.',
    classLevel: 6, subject: 'geography', topic: 'Oceans and Continents',
    chapters: ['c6_geography_ch07'],
    nodeIds: ['c6_geography_ch07_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Look at a globe and the first thing you notice is the blue — most of the Earth\'s surface is ocean, about.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'The five oceans and seven continents', text: 'Oceans are the vast connected bodies of salt water covering about two-thirds of the Earth\'s surface — the five oceans are the Pacific, Atlantic, Indian, Arctic, and Southern.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_geography_ch07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['The five oceans'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_geography_ch07_001', title: 'The five oceans and seven continents',
          caseStudy: { intro: 'Look at a globe and the first thing you notice is the blue — most of the Earth\'s surface is ocean, about two-thirds of it; only about one-third is land.',
            decisions: [{ prompt: 'Name the five oceans of the Earth.', options: [
                { text: 'Pacific, Atlantic, Indian, Arctic, Southern', outcome: 'Pacific, Atlantic, Indian, Arctic, Southern. The Pacific, Atlantic, Indian, Arctic, and Southern.' },
                { text: 'Antarctica is not a real continent', outcome: 'Not quite — Students often think there are only four oceans, forgetting the Southern Ocean, and they believe.', reveals: 'there-are-only-four-oceans' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch07_001', title: 'You made it',
          caseStudy: { intro: 'You finished Oceans and Continents — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_geography_ch07_001', difficulty: 'standard',
          question: 'Oceans are the vast connected bodies of salt water covering about two-thirds.',
          hint: 'If stuck, revisit "Globe, Latitude and Longitude" — the frame the features sit on.',
          misconception: 'Students often think there are only four oceans, forgetting the Southern Ocean, and they believe Antarctica is not.',
          parts: [
                { id: 'a', prompt: 'Name the five oceans of the Earth.', answer: 'Pacific, Atlantic, Indian, Arctic, Southern',
                  options: ['Pacific, Atlantic, Indian, Arctic, Southern', 'Antarctica is not a real continent'],
                  hint: 'If stuck, revisit "Globe, Latitude and Longitude" — the frame the features sit on.',
                  misconception: 'Students often think there are only four oceans, forgetting the Southern Ocean, and they believe Antarctica is not a real continent.' },
                { id: 'b', prompt: 'Name the seven continents.', answer: 'Asia, Africa, North America, South America, Antarctica, Europe, Australia',
                  options: ['Asia, Africa, North America, South America, Antarctica, Europe, Australia', 'Antarctica is not a real continent'],
                  hint: 'If stuck, revisit "Globe, Latitude and Longitude" — the frame the features sit on.',
                  misconception: 'Students often think there are only four oceans, forgetting the Southern Ocean, and they believe Antarctica is not a real continent.' },
                { id: 'c', prompt: 'Which is the largest ocean and which is the largest continent?', answer: 'Pacific ocean; Asia continent',
                  options: ['Pacific ocean; Asia continent', 'Antarctica is not a real continent'],
                  hint: 'If stuck, revisit "Globe, Latitude and Longitude" — the frame the features sit on.',
                  misconception: 'Students often think there are only four oceans, forgetting the Southern Ocean, and they believe Antarctica is not a real continent.' },
                { id: 'd', prompt: 'How much of the Earth\'s surface does the ocean cover?', answer: 'About two-thirds',
                  options: ['About two-thirds', 'Antarctica is not a real continent'],
                  hint: 'If stuck, revisit "Globe, Latitude and Longitude" — the frame the features sit on.',
                  misconception: 'Students often think there are only four oceans, forgetting the Southern Ocean, and they believe Antarctica is not a real continent.' }
          ],
            remediations: { 'there-are-only-four-oceans': { steps: ['If the student forgets the lists, teach a memory line for the oceans — "Pacific, Atlantic, Indian, Arctic, Southern".', 'For continents, count them on a map while saying them aloud — the visual names stick faster than a list.', 'Finish by having them find Asia and the Indian Ocean — our home pair — without help.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think there are only four oceans, forgetting the Southern Ocean, and they believe Antarctica is not.',
          parts: [
                { id: 'a', prompt: 'Why are oceans important for people?', answer: 'They give rain, climate balance, and most of Earth\'s water',
                  options: ['They give rain, climate balance, and most of Earth\'s water', 'Antarctica is not a real continent'],
                  hint: 'If stuck, revisit "Globe, Latitude and Longitude" — the frame the features sit on.',
                  misconception: 'Students often think there are only four oceans, forgetting the Southern Ocean, and they believe Antarctica is not a real continent.' },
                { id: 'b', prompt: 'On which continent and beside which ocean does India sit?', answer: 'Asia and the Indian Ocean',
                  options: ['Asia and the Indian Ocean', 'Antarctica is not a real continent'],
                  hint: 'If stuck, revisit "Globe, Latitude and Longitude" — the frame the features sit on.',
                  misconception: 'Students often think there are only four oceans, forgetting the Southern Ocean, and they believe Antarctica is not a real continent.' }
          ],
            remediations: { 'there-are-only-four-oceans': { steps: ['If the student forgets the lists, teach a memory line for the oceans — "Pacific, Atlantic, Indian, Arctic, Southern".', 'For continents, count them on a map while saying them aloud — the visual names stick faster than a list.', 'Finish by having them find Asia and the Indian Ocean — our home pair — without help.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
