import type { SimDef } from '../../engine/types';

/** v3 generated — c7_geo_ch05_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_geo_ch05_p2: SimDef = {
    id: 'v3_c7_geo_ch05_p2',
    title: 'India and Her Neighbours · Part 2/2',
    subtitle: 'Covers trans-boundary river systems, shared river basins, deltaic geography, and.',
    classLevel: 7, subject: 'geography', topic: 'India and Her Neighbours · Part 2/2',
    chapters: ['c7_geo_ch05'],
    nodeIds: ['c7_geo_ch05_007', 'c7_geo_ch05_008', 'c7_geo_ch05_009', 'c7_geo_ch05_010', 'c7_geo_ch05_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'When you look at a map of eastern India and Bangladesh, you notice that major rivers like the Ganga and.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Sri Lanka shares not a single kilometre of land border with India — the sea lies between them. So why do geographers still count it among the neighbours of India?',
        options: ['Because it sits just across the narrow Palk Strait — maritime proximity and a shared ocean zone make it a neighbour without a land border', 'They do not — only land borders make neighbours', 'Because it was once joined by a bridge, so it counts forever', 'Because maps are drawn too small to show the gap'],
        answer: 'Because it sits just across the narrow Palk Strait — maritime proximity and a shared ocean zone make it a neighbour without a land border',
        hook: 'Borders are not random ruler lines — many follow nature itself, like the Himalayan crest separating India from China. And neighbourship does not end at the shoreline: rivers and oceans connect countries as much as they divide them.',
    },
    teaching: [
        { title: 'India and Bangladesh: Rivers and Shared Resources', text: 'The hydro-geographical relationship between India and Bangladesh, centered on the trans-boundary flow of major river systems like the Ganga-Brahmaputra-Meghna basin and the cooperative management.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_geo_ch05_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sort the neighbours of India into two teams — those sharing a land border and those across the water — then trace which natural feature forms each land boundary.',
        labels: ['India and Bangladesh: Rivers', 'India and Myanmar: Eastern', 'India and Bhutan: Mountain', 'Regional Cooperation: SAARC', 'Interconnectedness of India'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_geo_ch05_007', title: 'India and Bangladesh: Rivers and Shared Resources',
          caseStudy: { intro: 'When you look at a map of eastern India and Bangladesh, you notice that major rivers like the Ganga and Brahmaputra do not stop at national borders; they flow.',
            decisions: [{ prompt: 'What is the name given to the main stream of the Ganga river after it enters Bangladesh from India?', options: [
                { text: 'The main stream of the Ganga after entering Bangladesh is called the Padma', outcome: 'The main stream of the Ganga after entering Bangladesh is called the Padma.' },
                { text: 'Yamuna', outcome: 'Not quite — Students often think that rivers flow independently within isolated national borders and that water.', reveals: 'rivers-flow-independently-within-isolated' },
                { text: 'Meghna', outcome: 'Not quite — Students often think that rivers flow independently within isolated national borders and that water.', reveals: 'rivers-flow-independently-within-isolated' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch05_010', title: 'Regional Cooperation: SAARC and Connectivity',
          caseStudy: { intro: 'When you travel across different states in India, you notice how highways, railways, and rivers connect cities and make the movement of goods and people.',
            decisions: [{ prompt: 'What does the acronym SAARC stand for, and when was it established?', options: [
                { text: 'SAARC stands for the South Asian Association for Regional Cooperation, and it was', outcome: 'SAARC stands for the South Asian Association for Regional Cooperation, and it was established.' },
                { text: 'regional cooperation', outcome: 'Not quite — Students often believe that "regional cooperation" only means political meetings between prime.', reveals: 'regional-cooperation-only-means-political' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a map quiz, Sohail argues that Sri Lanka and the Maldives are \'not really neighbours\' of India because a person cannot walk across to them — only countries sharing a land border count.',
            decisions: [{ prompt: 'How should the class judge his claim?', options: [
                { text: 'Reject it: neighbours include maritime ones — Sri Lanka lies just across the narrow Palk Strait and shares India\'s oceanic space, monsoon systems and sea routes, so proximity across water still makes a neighbour.', outcome: 'This uses the full geographical definition: regional proximity and shared physical systems, not only shared land, define a neighbour.' },
                { text: 'Accept it — a border you cannot walk across is not a real boundary, so island nations are foreigners in every sense.', outcome: 'This ignores maritime geography; the Indian Ocean connects rather than isolates, and Sri Lanka and the Maldives share climate and waters with India.', reveals: 'neighbour-needs-land-border' },
                { text: 'Accept it, because political borders are arbitrary lines anyway and physical features like seas and mountains do not decide them.', outcome: 'Most of India\'s borders follow real landforms — Himalayan crests, river courses — and seas define maritime neighbours, so physical geography is central, not arbitrary.', reveals: 'borders-are-arbitrary' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch05_011', title: 'You made it',
          caseStudy: { intro: 'A neighbour is not just who shares your wall — it is who shares your mountains, rivers, and seas. Water separates the land but not the neighbourhood.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_geo_ch05_007', difficulty: 'standard',
          question: 'The hydro-geographical relationship between India and Bangladesh, centered.',
          hint: 'Review Class 6 Northern Plains and river basin concepts before analyzing international.',
          misconception: 'Students often think that rivers flow independently within isolated national borders and that water management.',
          parts: [
                { id: 'a', prompt: 'What is the name given to the main stream of the Ganga river after it enters Bangladesh from India?', answer: 'The main stream of the Ganga after entering Bangladesh is called the Padma',
                  options: ['The main stream of the Ganga after entering Bangladesh is called the Padma', 'Yamuna', 'Meghna'],
                  hint: 'Review Class 6 Northern Plains and river basin concepts before analyzing international water.',
                  misconception: 'Students often think that rivers flow independently within isolated national borders and that water management decisions made by one.' }
          ],
            remediations: { 'rivers-flow-independently-within-isolated': { steps: ['To fix this, use a physical basin model or topographic map to trace a single drop of water from the Himalayas through.', 'Point out how a dam or diversion built upstream in India alters the water volume and silt load arriving at the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch05_008', difficulty: 'standard',
          question: 'India and Myanmar: Eastern Neighbour explores the shared land and maritime.',
          hint: 'Review Class 6 Geography on the Himalayan mountain region and river valleys to see how.',
          misconception: 'Students often view Myanmar as entirely separate from India\'s cultural and economic sphere, assuming that the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'India and Myanmar: Eastern Neighbour explores the shared land and maritime boundaries,',
                  options: ['India and Myanmar: Eastern Neighbour explores the shared land and maritime boundaries,', 'Defining a neighbour in geography involves understanding both immediate land borders and', 'India\'s land boundary refers to the continuous international frontier of approximately', 'Sri Lanka and the Maldives are India\'s two key maritime neighbours, separated from the'],
                  hint: 'Review Class 6 Geography on the Himalayan mountain region and river valleys to see how mountains.',
                  misconception: 'Students often view Myanmar as entirely separate from India\'s cultural and economic sphere, assuming that the international border acts.' }
          ],
            remediations: { 'students-often-view-myanmar-as': { steps: ['Have the student trace the India-Myanmar border on an outline political-physical map of India.', 'Ask them to place their finger on Mizoram and slide it east into Myanmar, noting the physical name of the hills.', 'Draw a cross-section showing north-south folded ridges and valleys to demonstrate why roads must wind through valleys.', 'Review the concept of orographic rainfall from Class 6 to connect mountain barriers with weather patterns.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch05_009', difficulty: 'standard',
          question: 'Bhutan is a landlocked mountain kingdom situated in the Eastern Himalayas.',
          hint: 'Review c6_geography_ch01_002 to understand Himalayan landforms and river origins before.',
          misconception: 'Students often think Bhutan is part of the Indian territory because of its close economic ties and open border.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Bhutan is a landlocked mountain kingdom situated in the Eastern Himalayas, bordered by',
                  options: ['Bhutan is a landlocked mountain kingdom situated in the Eastern Himalayas, bordered by', 'Defining a neighbour in geography involves understanding both immediate land borders and', 'India\'s land boundary refers to the continuous international frontier of approximately', 'Sri Lanka and the Maldives are India\'s two key maritime neighbours, separated from the'],
                  hint: 'Review c6_geography_ch01_002 to understand Himalayan landforms and river origins before studying.',
                  misconception: 'Students often think Bhutan is part of the Indian territory because of its close economic ties and open border agreements, failing.' }
          ],
            remediations: { 'bhutan-is-part-of-the': { steps: ['Show students a political map of South Asia alongside a physical relief map.', 'Point out the international border lines that separate India and Bhutan, then highlight how Bhutan\'s capital, Thimphu.', 'Emphasize that while India and Bhutan share deep friendly relations and trade treaties, Bhutan is an independent.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch05_010', difficulty: 'standard',
          question: 'Regional cooperation refers to the collaborative efforts of neighbouring.',
          hint: 'Review c6_geography_ch05_029 to understand how nations exchange goods across borders.',
          misconception: 'Students often believe that "regional cooperation" only means political meetings between prime ministers, failing.',
          parts: [
                { id: 'a', prompt: 'Why is physical connectivity (such as roads, railways, and inland waterways) considered crucial for the success of regional cooperation in South Asia, given.', answer: 'Physical connectivity is crucial',
                  options: ['Physical connectivity is crucial', 'regional cooperation'],
                  hint: 'Review c6_geography_ch05_029 to understand how nations exchange goods across borders.',
                  misconception: 'Students often believe that "regional cooperation" only means political meetings between prime ministers, failing to understand that.' },
                { id: 'b', prompt: 'If a freight train travels from New Delhi, India, through transit routes to reach Dhaka, Bangladesh, a distance of approximately 1,600 km at an average speed.', answer: 'Identify travel distance (1,600 km) and speed (40 km/h)',
                  options: ['Identify travel distance (1,600 km) and speed (40 km/h)', 'regional cooperation'],
                  hint: 'Review c6_geography_ch05_029 to understand how nations exchange goods across borders.',
                  misconception: 'Students often believe that "regional cooperation" only means political meetings between prime ministers, failing to understand that.' }
          ],
            remediations: { 'regional-cooperation-only-means-political': { steps: ['To fix this, guide the student to trace a map of South Asia using a highlighter to connect capital cities (like New.', 'Ask them to identify physical obstacles—such as the Himalayan foothills or major rivers like the Brahmaputra—that.', 'Explain that regional cooperation is the practical agreement required to build physical bridges and lay rails across.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch05_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "regional cooperation" only means political meetings between prime ministers, failing.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Regional cooperation through SAARC is unnecessary because each South Asian country has enough resources to develop independently.".', answer: 'This claim is not sound',
                  options: ['This claim is not sound', 'regional cooperation'],
                  hint: 'Review c6_geography_ch05_029 to understand how nations exchange goods across borders.',
                  misconception: 'Students often believe that "regional cooperation" only means political meetings between prime ministers, failing to understand that.' }
          ],
            remediations: { 'regional-cooperation-only-means-political': { steps: ['To fix this, guide the student to trace a map of South Asia using a highlighter to connect capital cities (like New.', 'Ask them to identify physical obstacles—such as the Himalayan foothills or major rivers like the Brahmaputra—that.', 'Explain that regional cooperation is the practical agreement required to build physical bridges and lay rails across.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch05_011', difficulty: 'standard',
          question: 'The multi-dimensional economic, cultural, technological, and infrastructural.',
          hint: 'Review c7_geo_ch05_010 for regional cooperation concepts and c7_geo_ch05_007 for shared.',
          misconception: 'Students often think that international borders are absolute walls that completely separate countries economically and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The multi-dimensional economic, cultural, technological, and infrastructural ties that',
                  options: ['The multi-dimensional economic, cultural, technological, and infrastructural ties that', 'Defining a neighbour in geography involves understanding both immediate land borders and', 'India\'s land boundary refers to the continuous international frontier of approximately', 'Sri Lanka and the Maldives are India\'s two key maritime neighbours, separated from the'],
                  hint: 'Review c7_geo_ch05_010 for regional cooperation concepts and c7_geo_ch05_007 for shared river.',
                  misconception: 'Students often think that international borders are absolute walls that completely separate countries economically and ecologically.' }
          ],
            remediations: { 'international-borders-are-absolute-walls': { steps: ['To fix this, look at a map of river basins (like the Ganga-Brahmaputra-Meghna basin) and trace how a single raindrop.', 'Then examine how electricity generated in Bhutan lights homes in Indian states, proving that physical and economic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
