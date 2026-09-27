import type { SimDef } from '../../engine/types';

/** v3 generated — c9_geo_ch03_p2 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_geo_ch03_p2: SimDef = {
    id: 'v3_c9_geo_ch03_p2',
    title: 'Oceans and Life · Part 2/2',
    subtitle: 'This node covers the maritime zones and rights established under UNCLOS relevant.',
    classLevel: 9, subject: 'geography', topic: 'Oceans and Life · Part 2/2',
    chapters: ['c9_geo_ch03'],
    nodeIds: ['c9_geo_ch3_7'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'Start by observing a map of India\'s coastline—notice how states like Gujarat have long coastlines while.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'International Maritime Rules and Conventions (UNCLOS)', text: 'International Maritime Rules and Conventions, primarily the United Nations Convention on the Law of the Sea (UNCLOS), is a global agreement that defines the rights and responsibilities of nations.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_geo_ch3_7', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['International Maritime Rules'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c9_geo_ch3_7', title: 'International Maritime Rules and Conventions (UNCLOS)',
          caseStudy: { intro: 'Start by observing a map of India\'s coastline—notice how states like Gujarat have long coastlines while others like Goa are small.',
            decisions: [{ prompt: 'What is the maximum breadth of the territorial sea as defined by UNCLOS?', options: [
                { text: 'The maximum breadth of the territorial sea is 12 nautical miles from the baseline', outcome: 'The maximum breadth of the territorial sea is 12 nautical miles from the baseline.' },
                { text: '200 nautical miles', outcome: 'Not quite — Students often believe that UNCLOS grants a coastal state like India full ownership and sovereignty.', reveals: 'unclos-grants-a-coastal-state' }
            ] }] } },
        { type: 'case', nodeId: 'c9_geo_ch3_7', title: 'You made it',
          caseStudy: { intro: 'You finished Oceans and Life — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_geo_ch3_7', difficulty: 'standard',
          question: 'International Maritime Rules and Conventions, primarily the United Nations.',
          hint: 'If stuck, review the continental shelf concept from c9_geo_ch3_1, focusing on its width.',
          misconception: 'Students often believe that UNCLOS grants a coastal state like India full ownership and sovereignty over its Exclusive.',
          parts: [
                { id: 'a', prompt: 'If the baseline of India\'s coast near Mumbai is drawn at the low-water line, and a fishing village is located 10 nautical miles offshore, in which UNCLOS.', answer: 'The village is located in the territorial sea (since 10 nm < 12 nm)',
                  options: ['The village is located in the territorial sea (since 10 nm < 12 nm)', 'contiguous zone'],
                  hint: 'If stuck, review the continental shelf concept from c9_geo_ch3_1, focusing on its width, depth, and.',
                  misconception: 'Students often believe that UNCLOS grants a coastal state like India full ownership and sovereignty over its Exclusive Economic Zone (EEZ).' }
          ],
            remediations: { 'unclos-grants-a-coastal-state': { steps: ['Use a map of India\'s EEZ showing the Andaman and Nicobar Islands.', 'Highlight that while India controls fishing and oil exploration within 200 nm, draw arrows showing foreign merchant.', 'Explain using the analogy: "Your EEZ is like a farm where you own the crops and minerals underground, but the road.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
