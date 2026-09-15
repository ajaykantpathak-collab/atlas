import type { SimDef } from '../../engine/types';

/** v3 generated — c6_geography_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_geography_ch01_p1: SimDef = {
    id: 'v3_c6_geography_ch01_p1',
    title: 'Geographical Diversity of India · Part 1/2',
    subtitle: 'This node covers the physical features of India (mountains, deserts, coasts, forests) and.',
    classLevel: 6, subject: 'geography', topic: 'Geographical Diversity of India · Part 1/2',
    chapters: ['c6_geography_ch01'],
    nodeIds: ['c6_geography_ch01_001', 'c6_geography_ch01_002', 'c6_geography_ch01_003', 'c6_geography_ch01_004', 'c6_geography_ch01_005', 'c6_geography_ch01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever wondered why your friends in the north wear heavy woolens in December, while your cousins.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'In the same December week, a cousin in Kerala sends a beach selfie while a friend in Kashmir sends a photo of deep snow — both swear they are in India. Is one of them lying?',
        options: ['No — India is so vast it holds snowy mountains, deserts, beaches, and rainforests all at once', 'Yes — one country can only have one kind of landscape', 'Only if they live in different states — state borders decide the land', 'Yes — snow and beaches cannot exist in the same season'],
        answer: 'No — India is so vast it holds snowy mountains, deserts, beaches, and rainforests all at once',
        hook: 'Geographical diversity is about the land itself — mountains, deserts, coasts, forests — not the state lines drawn on a political map. The size and location of India make the variety possible.',
    },
    teaching: [
        { title: 'What Makes India Geographically Diverse', text: 'Geographical diversity refers to the existence of varied physical features, such as mountains, deserts, coastlines, and forests, within a single country\'s borders.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_geography_ch01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Plan a road trip from the Himalayas to Kerala and mark the four totally different landscapes you cross — then explain why one country can hold them all.',
        labels: ['What Makes India Geographically', 'The Himalayan Region: Mountains', 'The Northern Plains: Fertile', 'The Peninsular Plateau: Ancient', 'Coastal Plains: Eastern', 'Islands of India: Andaman,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_geography_ch01_001', title: 'What Makes India Geographically Diverse',
          caseStudy: { intro: 'Have you ever wondered why your friends in the north wear heavy woolens in December, while your cousins in the south are comfortably wearing cotton shirts.',
            decisions: [{ prompt: 'Name two different types of geographical landscapes found in India mentioned in the text.', options: [
                { text: 'The two landscapes are the snow-capped Himalayas and the Thar Desert', outcome: 'The two landscapes are the snow-capped Himalayas and the Thar Desert.' },
                { text: 'geographical diversity', outcome: 'Not quite — Students often confuse "geographical diversity" with "political diversity" (like different states.', reveals: 'students-often-confuse-geographical-diversity' },
                { text: 'political diversity', outcome: 'Not quite — Students often confuse "geographical diversity" with "political diversity" (like different states.', reveals: 'students-often-confuse-geographical-diversity' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch01_002', title: 'The Himalayan Region: Mountains and Valleys',
          caseStudy: { intro: 'Have you ever seen a rug bunch up when you push it against a wall?',
            decisions: [{ prompt: 'What is the process that caused the formation of the Himalayan mountain range?', options: [
                { text: 'The Himalayas formed when the Indian tectonic plate collided with the Eurasian plate', outcome: 'The Himalayas formed when the Indian tectonic plate collided with the Eurasian plate.' },
                { text: 'appeared', outcome: 'Not quite — Students often believe the Himalayas were formed by a single massive explosion or volcanic event.', reveals: 'the-himalayas-were-formed-by' },
                { text: 'the Himalayas were formed by a single massive explosion or volcanic event', outcome: 'Not quite — Students often believe the Himalayas were formed by a single massive explosion or volcanic event.', reveals: 'the-himalayas-were-formed-by' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch01_003', title: 'The Northern Plains: Fertile River Basins',
          caseStudy: { intro: 'Have you ever wondered why so many people live in northern India and why the vegetables we eat often come from there?',
            decisions: [{ prompt: 'What is the name of the fertile soil deposited by rivers that forms the Northern Plains?', options: [
                { text: 'The soil is called alluvium', outcome: 'The soil is called alluvium. A wrong answer here suggests the student has not grasped the core.' },
                { text: 'alluvium', outcome: 'Not quite — Students often think the Northern Plains were "always there" as a flat surface, rather than being.', reveals: 'the-northern-plains-were-always' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch01_004', title: 'The Peninsular Plateau: Ancient Landmass',
          caseStudy: { intro: 'Have you ever noticed that while the mountains in the north look jagged and sharp, the land in the south of India feels like a flat, solid table?',
            decisions: [{ prompt: 'Name two mountain ranges that act as northern boundaries for the Peninsular Plateau.', options: [
                { text: 'The Vindhya and Satpura ranges', outcome: 'The Vindhya and Satpura ranges. A wrong answer suggests the student is confusing northern mountain.' },
                { text: 'mountain', outcome: 'Not quite — Students often confuse the Peninsular Plateau with the Himalayas, assuming all high land in India.', reveals: 'students-often-confuse-the-peninsular' },
                { text: 'high altitude', outcome: 'Not quite — Students often confuse the Peninsular Plateau with the Himalayas, assuming all high land in India.', reveals: 'students-often-confuse-the-peninsular' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch01_005', title: 'Coastal Plains: Eastern and Western Seaboards',
          caseStudy: { intro: 'Have you ever visited a beach like Marina Beach in Chennai or Juhu Beach in Mumbai?',
            decisions: [{ prompt: 'Name the mountain range that acts as a boundary for the Western Coastal Plain.', options: [
                { text: 'The Western Ghats', outcome: 'The Western Ghats. A wrong answer suggests the student is confusing the mountain ranges, likely.' },
                { text: 'the entire Indian coastline is one uniform strip of land', outcome: 'Not quite — Students often think the entire Indian coastline is one uniform strip of land.', reveals: 'the-entire-indian-coastline-is' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A cousin visiting from abroad wants to see snow AND a desert on the same India trip, and laughs when told both are possible. \'One country can\'t have everything,\' she says.',
            decisions: [{ prompt: 'Can one trip really include snow and desert?', options: [
                { text: 'Yes — India\'s sheer size packs many worlds into one country: the Himalayas in the north hold snow, the Thar in the west holds desert, and coasts, plateaus and rainy forests lie between them. That range is exactly why \'diversity\' is the right word for India\'s geography — and it exists because the country is huge.', outcome: 'Shrink India to a small island and most of that variety would vanish — it is the vastness that lets snow, sand dunes and sea beaches share one flag.' },
                { text: 'She is right — a single country has a single landscape, so snow and desert cannot both be in India.', outcome: 'Countries are not uniform — a large one can span mountains, deserts and coasts; India is the textbook example.', reveals: 'one-country-one-landscape' },
                { text: 'Both exist but only barely — the snow is on a few peaks and the desert is just a sandy patch.', outcome: 'These are full regions, not curiosities — the Thar is a vast desert and the Himalayan snow fields stretch for thousands of kilometres.', reveals: 'diversity-is-a-gimmick' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch01_006', title: 'The bigger picture',
          caseStudy: { intro: 'India is not one landscape but a collection of many, stitched together by size and location. One ticket, many worlds.',
            decisions: [{ prompt: 'What comes next? Geographical Diversity of India · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Geographical Diversity of India · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_geography_ch01_001', difficulty: 'standard',
          question: 'Geographical diversity refers to the existence of varied physical features.',
          hint: 'Review basic map symbols for mountains, water, and forests.',
          misconception: 'Students often confuse "geographical diversity" with "political diversity" (like different states or languages).',
          parts: [
                { id: 'a', prompt: 'Name two different types of geographical landscapes found in India mentioned in the text.', answer: 'The two landscapes are the snow-capped Himalayas and the Thar Desert',
                  options: ['The two landscapes are the snow-capped Himalayas and the Thar Desert', 'geographical diversity', 'political diversity'],
                  hint: 'Review basic map symbols for mountains, water, and forests.',
                  misconception: 'Students often confuse "geographical diversity" with "political diversity" (like different states or languages).' },
                { id: 'b', prompt: 'Why can we say that India\'s geography is not "random"?', answer: 'It is not random',
                  options: ['It is not random', 'geographical diversity', 'political diversity'],
                  hint: 'Review basic map symbols for mountains, water, and forests.',
                  misconception: 'Students often confuse "geographical diversity" with "political diversity" (like different states or languages).' }
          ],
            remediations: { 'students-often-confuse-geographical-diversity': { steps: ['Ask the student to draw a simple shape of India.', 'Then, tell them to draw a line across the top for mountains and a wave at the bottom for the sea.', 'Ask them to label these as "Landforms." Explain that these are the physical features, not the state lines, and that.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "geographical diversity" with "political diversity" (like different states or languages).',
          parts: [
                { id: 'a', prompt: 'Is it possible for a small country to have as much geographical diversity as India? Why or why not?', answer: 'It is much less likely',
                  options: ['It is much less likely', 'geographical diversity', 'political diversity'],
                  hint: 'Review basic map symbols for mountains, water, and forests.',
                  misconception: 'Students often confuse "geographical diversity" with "political diversity" (like different states or languages).' }
          ],
            remediations: { 'students-often-confuse-geographical-diversity': { steps: ['Ask the student to draw a simple shape of India.', 'Then, tell them to draw a line across the top for mountains and a wave at the bottom for the sea.', 'Ask them to label these as "Landforms." Explain that these are the physical features, not the state lines, and that.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch01_002', difficulty: 'standard',
          question: 'The Himalayas are the world\'s tallest, youngest mountain range, forming.',
          hint: 'Review the world map showing where India is located relative to the rest of Asia.',
          misconception: 'Students often believe the Himalayas were formed by a single massive explosion or volcanic event.',
          parts: [
                { id: 'a', prompt: 'Why do we describe the Himalayas as the "youngest" mountain range in the world?', answer: 'They are called "youngest"',
                  options: ['They are called "youngest"', 'youngest', 'the Himalayas were formed by a single massive explosion or volcanic event'],
                  hint: 'Review the world map showing where India is located relative to the rest of Asia.',
                  misconception: 'Students often believe the Himalayas were formed by a single massive explosion or volcanic event.' },
                { id: 'b', prompt: 'If you were travelling from the northernmost point of India towards the plains, which of the three parallel ranges would you encounter first?', answer: 'You would encounter the Greater Himalayas (Himadri) first',
                  options: ['You would encounter the Greater Himalayas (Himadri) first', 'the Himalayas were formed by a single massive explosion or volcanic event'],
                  hint: 'Review the world map showing where India is located relative to the rest of Asia.',
                  misconception: 'Students often believe the Himalayas were formed by a single massive explosion or volcanic event.' }
          ],
            remediations: { 'the-himalayas-were-formed-by': { steps: ['First, use your hands to demonstrate two pieces of cardboard pushing together to form a ridge.', 'Explain that this is "folding," not "exploding." Ask the student to draw the "pushing" motion and label the two plates.', 'Remind them that mountains take millions of years to rise, not a single day.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch01_003', difficulty: 'standard',
          question: 'The Northern Plains are a vast, flat, and extremely fertile region of northern.',
          hint: 'Review the water cycle and how rivers move sediment from high to low areas.',
          misconception: 'Students often think the Northern Plains were "always there" as a flat surface, rather than being built up by rivers.',
          parts: [
                { id: 'a', prompt: 'What is the name of the fertile soil deposited by rivers that forms the Northern Plains?', answer: 'The soil is called alluvium',
                  options: ['The soil is called alluvium', 'alluvium'],
                  hint: 'Review the water cycle and how rivers move sediment from high to low areas.',
                  misconception: 'Students often think the Northern Plains were "always there" as a flat surface, rather than being built up by rivers over millions.' },
                { id: 'b', prompt: 'Why does the flat nature of the Northern Plains make them better for agriculture than steep, mountainous areas?', answer: 'Flat land is easier to plow, plant, and irrigate',
                  options: ['Flat land is easier to plow, plant, and irrigate', 'always there'],
                  hint: 'Review the water cycle and how rivers move sediment from high to low areas.',
                  misconception: 'Students often think the Northern Plains were "always there" as a flat surface, rather than being built up by rivers over millions.' },
                { id: 'c', prompt: 'Compare the movement of sediment in a fast mountain river to the movement of sediment in a slow, flat plain river.', answer: 'In mountains, the river carries sediment quickly',
                  options: ['In mountains, the river carries sediment quickly', 'always there'],
                  hint: 'Review the water cycle and how rivers move sediment from high to low areas.',
                  misconception: 'Students often think the Northern Plains were "always there" as a flat surface, rather than being built up by rivers over millions.' }
          ],
            remediations: { 'the-northern-plains-were-always': { steps: ['Direct the student to look at a map of the Ganga and Yamuna river systems.', 'Ask them to trace the path from the Himalayas to the Bay of Bengal.', 'Explain that as the river journey gets longer, it leaves behind "presents" (sediment) everywhere it goes, which slowly.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch01_004', difficulty: 'standard',
          question: 'The Peninsular Plateau is a massive, triangular-shaped tableland in southern.',
          hint: 'Review the definitions of mountains vs. plateaus in Chapter 1.',
          misconception: 'Students often confuse the Peninsular Plateau with the Himalayas, assuming all high land in India is a "mountain." This.',
          parts: [
                { id: 'a', prompt: 'Name two mountain ranges that act as northern boundaries for the Peninsular Plateau.', answer: 'The Vindhya and Satpura ranges',
                  options: ['The Vindhya and Satpura ranges', 'mountain', 'high altitude', 'mountains'],
                  hint: 'Review the definitions of mountains vs. plateaus in Chapter 1.',
                  misconception: 'Students often confuse the Peninsular Plateau with the Himalayas, assuming all high land in India is a "mountain." This happens because.' }
          ],
            remediations: { 'students-often-confuse-the-peninsular': { steps: ['Ask the student to draw a side-profile sketch of a mountain (a sharp peak) versus a plateau (a flat, high top).', 'Have them label the peak of the Himalayas and the broad top of the Deccan region.', 'Explain that the plateau is like a table, while the mountain is like a tent.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch01_005', difficulty: 'standard',
          question: 'The coastal plains are narrow, flat stretches of land lying between the edge.',
          hint: 'Review the cardinal directions and the map of India.',
          misconception: 'Students often think the entire Indian coastline is one uniform strip of land.',
          parts: [
                { id: 'a', prompt: 'Name the mountain range that acts as a boundary for the Western Coastal Plain.', answer: 'The Western Ghats',
                  options: ['The Western Ghats', 'the entire Indian coastline is one uniform strip of land'],
                  hint: 'Review the cardinal directions and the map of India.',
                  misconception: 'Students often think the entire Indian coastline is one uniform strip of land.' },
                { id: 'b', prompt: 'If you were a farmer living on the Malabar coast, which crop would you likely grow, and why is the climate suitable?', answer: 'You would grow coconuts and spices',
                  options: ['You would grow coconuts and spices', 'the entire Indian coastline is one uniform strip of land'],
                  hint: 'Review the cardinal directions and the map of India.',
                  misconception: 'Students often think the entire Indian coastline is one uniform strip of land.' }
          ],
            remediations: { 'the-entire-indian-coastline-is': { steps: ['First, show the student a physical map of India and ask them to trace the coastline with their finger.', 'Then, have them use a second color to trace the Western Ghats and the Eastern Ghats.', 'Point out how the "gap" between the blue sea and the brown mountains is much smaller on the West.', 'Ask them to describe the difference in their own words before proceeding.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch01_006', difficulty: 'standard',
          question: 'An island is a piece of land that is smaller than a continent and is completely.',
          hint: 'Review the map of India in the textbook and identify the water bodies on either side.',
          misconception: 'Students often confuse the location of the two island groups, frequently swapping the Arabian Sea for the Bay.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An island is a piece of land that is smaller than a continent and is completely',
                  options: ['An island is a piece of land that is smaller than a continent and is completely', 'Geographical diversity refers to the existence of varied physical features, such as', 'The Himalayas are the world\'s tallest, youngest mountain range, forming a natural wall', 'The Northern Plains are a vast, flat, and extremely fertile region of northern India,'],
                  hint: 'Review the map of India in the textbook and identify the water bodies on either side of the.',
                  misconception: 'Students often confuse the location of the two island groups, frequently swapping the Arabian Sea for the Bay of Bengal.' }
          ],
            remediations: { 'students-often-confuse-the-location': { steps: ['First, ask the student to draw a simple triangle for India.', 'Then, have them label "Left/West = Arabian Sea" and "Right/East = Bay of Bengal." Finally, have them mark a small dot.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
