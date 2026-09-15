import type { SimDef } from '../../engine/types';

/** v3 generated — c6_geography_ch01_p2 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_geography_ch01_p2: SimDef = {
    id: 'v3_c6_geography_ch01_p2',
    title: 'Geographical Diversity of India · Part 2/2',
    subtitle: 'This node covers the climate, geography, and human adaptation in the Thar Desert.',
    classLevel: 6, subject: 'geography', topic: 'Geographical Diversity of India · Part 2/2',
    chapters: ['c6_geography_ch01'],
    nodeIds: ['c6_geography_ch01_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever noticed how your house stays cool on a very hot summer afternoon?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'In the same December week, a cousin in Kerala sends a beach selfie while a friend in Kashmir sends a photo of deep snow — both swear they are in India. Is one of them lying?',
        options: ['No — India is so vast it holds snowy mountains, deserts, beaches, and rainforests all at once', 'Yes — one country can only have one kind of landscape', 'Only if they live in different states — state borders decide the land', 'Yes — snow and beaches cannot exist in the same season'],
        answer: 'No — India is so vast it holds snowy mountains, deserts, beaches, and rainforests all at once',
        hook: 'Geographical diversity is about the land itself — mountains, deserts, coasts, forests — not the state lines drawn on a political map. The size and location of India make the variety possible.',
    },
    teaching: [
        { title: 'The Desert Region: Thar and Beyond', text: 'The Thar Desert, or the Great Indian Desert, is a hot, arid region primarily located in western Rajasthan characterized by sand dunes, sparse vegetation, and extreme temperature fluctuations.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_geography_ch01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Plan a road trip from the Himalayas to Kerala and mark the four totally different landscapes you cross — then explain why one country can hold them all.',
        labels: ['The Desert Region: Thar'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_geography_ch01_007', title: 'The Desert Region: Thar and Beyond',
          caseStudy: { intro: 'Have you ever noticed how your house stays cool on a very hot summer afternoon?',
            decisions: [{ prompt: 'What is the average annual rainfall in the Thar Desert region?', options: [
                { text: 'The rainfall is usually less than 25 centimetres per year', outcome: 'The rainfall is usually less than 25 centimetres per year. A wrong answer suggests the student.' },
                { text: 'deserts are just "hot sand" and that no one lives there', outcome: 'Not quite — Students often believe deserts are just "hot sand" and that no one lives there.', reveals: 'deserts-are-just-hot-sand' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A cousin visiting from abroad wants to see snow AND a desert on the same India trip, and laughs when told both are possible. \'One country can\'t have everything,\' she says.',
            decisions: [{ prompt: 'Can one trip really include snow and desert?', options: [
                { text: 'Yes — India\'s sheer size packs many worlds into one country: the Himalayas in the north hold snow, the Thar in the west holds desert, and coasts, plateaus and rainy forests lie between them. That range is exactly why \'diversity\' is the right word for India\'s geography — and it exists because the country is huge.', outcome: 'Shrink India to a small island and most of that variety would vanish — it is the vastness that lets snow, sand dunes and sea beaches share one flag.' },
                { text: 'She is right — a single country has a single landscape, so snow and desert cannot both be in India.', outcome: 'Countries are not uniform — a large one can span mountains, deserts and coasts; India is the textbook example.', reveals: 'one-country-one-landscape' },
                { text: 'Both exist but only barely — the snow is on a few peaks and the desert is just a sandy patch.', outcome: 'These are full regions, not curiosities — the Thar is a vast desert and the Himalayan snow fields stretch for thousands of kilometres.', reveals: 'diversity-is-a-gimmick' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch01_007', title: 'You made it',
          caseStudy: { intro: 'India is not one landscape but a collection of many, stitched together by size and location. One ticket, many worlds.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_geography_ch01_007', difficulty: 'standard',
          question: 'The Thar Desert, or the Great Indian Desert, is a hot, arid region primarily.',
          hint: 'Review the definition of rainfall and temperature in the chapter\'s intro.',
          misconception: 'Students often believe deserts are just "hot sand" and that no one lives there.',
          parts: [
                { id: 'a', prompt: 'What is the average annual rainfall in the Thar Desert region?', answer: 'The rainfall is usually less than 25 centimetres per year',
                  options: ['The rainfall is usually less than 25 centimetres per year', 'deserts are just "hot sand" and that no one lives there'],
                  hint: 'Review the definition of rainfall and temperature in the chapter\'s intro.',
                  misconception: 'Students often believe deserts are just "hot sand" and that no one lives there.' },
                { id: 'b', prompt: 'Compare the daytime and nighttime temperatures in the Thar Desert. How does this affect people living there?', answer: 'Days are extremely hot, while nights can be quite cold',
                  options: ['Days are extremely hot, while nights can be quite cold', 'always hot', 'hot sand', 'deserts are "always hot" 24/7'],
                  hint: 'Review the definition of rainfall and temperature in the chapter\'s intro.',
                  misconception: 'Students often believe deserts are just "hot sand" and that no one lives there.' }
          ],
            remediations: { 'deserts-are-just-hot-sand': { steps: ['First, ask the student to draw a picture of a typical desert scene, then ask them to add a person living there.', 'Ask, "What are they wearing to protect themselves from the sun?" Then, show a picture of a thick-walled mud house and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe deserts are just "hot sand" and that no one lives there.',
          parts: [
                { id: 'a', prompt: 'Is the Thar Desert completely uninhabitable? Explain your reasoning based on the provided text.', answer: 'No, it is not uninhabitable',
                  options: ['No, it is not uninhabitable', 'hot sand', 'deserts are just "hot sand" and that no one lives there'],
                  hint: 'Review the definition of rainfall and temperature in the chapter\'s intro.',
                  misconception: 'Students often believe deserts are just "hot sand" and that no one lives there.' }
          ],
            remediations: { 'deserts-are-just-hot-sand': { steps: ['First, ask the student to draw a picture of a typical desert scene, then ask them to add a person living there.', 'Ask, "What are they wearing to protect themselves from the sun?" Then, show a picture of a thick-walled mud house and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
