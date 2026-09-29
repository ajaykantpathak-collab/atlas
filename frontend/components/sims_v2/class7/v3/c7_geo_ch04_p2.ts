import type { SimDef } from '../../engine/types';

/** v3 generated — c7_geo_ch04_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_geo_ch04_p2: SimDef = {
    id: 'v3_c7_geo_ch04_p2',
    title: 'The Story of Indian Farming · Part 2/2',
    subtitle: 'Covers indigenous and traditional farming methods, ecological adaptations, and organic.',
    classLevel: 7, subject: 'geography', topic: 'The Story of Indian Farming · Part 2/2',
    chapters: ['c7_geo_ch04'],
    nodeIds: ['c7_geo_ch04_007', 'c7_geo_ch04_008', 'c7_geo_ch04_009', 'c7_geo_ch04_010', 'c7_geo_ch04_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine walking past a village farm where a farmer uses a wooden plow pulled by a pair of bullocks, sowing.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'India has tractors, tube wells, and fertilizer factories — yet farmers still scan the June sky with worry. Why is Indian farming still called a gamble with the monsoon?',
        options: ['Most fields still depend on the timing and volume of seasonal rain — technology helps but cannot replace the water cycle', 'Because farmers refuse to use machines', 'Because monsoons are a myth invented by the news', 'Because tractors break down in rain'],
        answer: 'Most fields still depend on the timing and volume of seasonal rain — technology helps but cannot replace the water cycle',
        hook: 'Indian farming is not one uniform system. The flat, silt-rich Northern Plains allow big irrigated fields, while the rocky Peninsular Plateau and arid Rajasthan farm under totally different rules — geography writes the farming manual.',
    },
    teaching: [
        { title: 'Traditional Farming Practices in India', text: 'Traditional farming practices in India refer to indigenous agricultural methods passed down through generations that rely on local ecological knowledge, manual labor, animal power, organic manures.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_geo_ch04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compare two farms — one on the fertile Ganga plain, one on the dry plateau edge — and decide which physical gift and which human effort each one needs to succeed.',
        labels: ['Traditional Farming Practices', 'Modern Farming Techniques: Tractors,', 'Agricultural Landscape: Patterns Across', 'Challenges Faced by Indian', 'Sustainable Farming: Complementing Traditional'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c7_geo_ch04_007', title: 'Traditional Farming Practices in India',
          caseStudy: { intro: 'Imagine walking past a village farm where a farmer uses a wooden plow pulled by a pair of bullocks, sowing two different crops like mustard and chickpea.',
            decisions: [{ prompt: 'What is the primary power source traditionally used for plowing agricultural fields in most parts of rural India before modern.', options: [
                { text: 'Bullock or oxen power (cattle)', outcome: 'Bullock or oxen power (cattle). A student who answers "tractors" or "electricity" is confusing.' },
                { text: 'tractors', outcome: 'Not quite — Students often believe that "traditional farming" simply means primitive, unproductive backwardness.', reveals: 'traditional-farming-simply-means-primitive' },
                { text: 'electricity', outcome: 'Not quite — Students often believe that "traditional farming" simply means primitive, unproductive backwardness.', reveals: 'traditional-farming-simply-means-primitive' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch04_009', title: 'Agricultural Landscape: Patterns Across Regions',
          caseStudy: { intro: 'When you travel by train from the fertile Northern Plains down to the rocky Peninsular Plateau, you notice the fields change from vast, flat expanses of wheat.',
            decisions: [{ prompt: 'What physical feature primarily dictates why terrace farming is practiced in the Himalayan region rather than large, continuous flat-field.', options: [
                { text: 'The steep, mountainous terrain prevents large-scale flat plowing, requiring steps cut', outcome: 'The steep, mountainous terrain prevents large-scale flat plowing, requiring steps cut into slopes.' },
                { text: 'farming is just growing crops', outcome: 'Not quite — Students often think that all agricultural landscapes in India look the same because "farming.', reveals: 'all-agricultural-landscapes-in-india' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch04_010', title: 'Challenges Faced by Indian Farmers',
          caseStudy: { intro: 'When you look at fields in your nearest village or read about farmers in the news, you might notice that despite hard work, many families struggle to earn.',
            decisions: [{ prompt: 'What term describes a farming plot that has been divided into very small, scattered pieces across generations among family members?', options: [
                { text: 'The correct term is a fragmented or marginal landholding', outcome: 'The correct term is a fragmented or marginal landholding. A student who answers "commercial farm".' },
                { text: 'commercial farm', outcome: 'Not quite — Students often believe that Indian farmers are poor simply because they are lazy or do not know.', reveals: 'indian-farmers-are-poor-simply' },
                { text: 'large estate', outcome: 'Not quite — Students often believe that Indian farmers are poor simply because they are lazy or do not know.', reveals: 'indian-farmers-are-poor-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch04_011', title: 'Sustainable Farming: Complementing Traditional and Contemporary',
          caseStudy: { intro: 'When walking through your local agricultural fields or community vegetable gardens, you might notice farmers using modern drip irrigation pipes alongside.',
            decisions: [{ prompt: 'What is the primary goal of combining traditional and contemporary farming practices in sustainable agriculture?', options: [
                { text: 'to maintain long-term soil health, conserve water, and ensure food security without', outcome: 'The correct answer is to maintain long-term soil health, conserve water, and ensure food security.' },
                { text: 'sustainable farming', outcome: 'Not quite — Students often think that "sustainable farming" simply means going back entirely to ancient farming.', reveals: 'sustainable-farming-simply-means-going' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A family in the dry rain-shadow part of the Deccan plateau visits relatives in Punjab and returns inspired. They announce they will flood their fields and grow the same water-hungry paddy, because \'farming is farming anywhere in India.\'',
            decisions: [{ prompt: 'What is wrong with their plan, and what would suit their land better?', options: [
                { text: 'Their farm sits where hills block monsoon winds, so rainfall is low and water is scarce; agriculture there suits tank irrigation and drought-resistant crops, not paddy. Farming choices must match local soil, terrain and water, not copy another region.', outcome: 'This respects the core principle: Indian agriculture is shaped by physical geography — relief, soil and water — so practices cannot be transplanted unchanged.' },
                { text: 'The plan is fine — with enough tractors and chemical fertiliser, climate and rainfall no longer matter to farming.', outcome: 'Machinery and fertiliser cannot manufacture water; groundwater recharge and soil moisture still depend on the monsoon, so paddy would fail or exhaust the water table.', reveals: 'technology-beats-climate' },
                { text: 'They should simply work harder — differences between Indian farms come down to effort, not geography.', outcome: 'Effort cannot replace physical conditions: a rain-shadow field and a Punjab alluvial plain differ in water and soil no matter how hard anyone works.', reveals: 'farming-is-uniform' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch04_011', title: 'You made it',
          caseStudy: { intro: 'Farming is a partnership: the land offers soil and water, the farmer offers labour and timing. The monsoon still holds the deciding vote.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_geo_ch04_007', difficulty: 'standard',
          question: 'Traditional farming practices in India refer to indigenous agricultural methods.',
          hint: 'Review c6_geography_ch03_018 to understand how climate dictates farming seasons before.',
          misconception: 'Students often believe that "traditional farming" simply means primitive, unproductive backwardness that has.',
          parts: [
                { id: 'a', prompt: 'What is the primary power source traditionally used for plowing agricultural fields in most parts of rural India before modern mechanization?', answer: 'Bullock or oxen power (cattle)',
                  options: ['Bullock or oxen power (cattle)', 'tractors', 'electricity', 'hand tools only'],
                  hint: 'Review c6_geography_ch03_018 to understand how climate dictates farming seasons before studying.',
                  misconception: 'Students often believe that "traditional farming" simply means primitive, unproductive backwardness that has no scientific basis.' }
          ],
            remediations: { 'traditional-farming-simply-means-primitive': { steps: ['To fix this, guide the student to examine a specific traditional method like crop rotation with leguminous plants.', 'Explain step-by-step: (1) Cereal crops take up nitrogen from the soil; (2) Legumes host bacteria in their roots that.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "traditional farming" simply means primitive, unproductive backwardness that has.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Traditional farming practices are entirely unscientific and should be completely replaced by modern chemical-based farming to feed India\'s.', answer: 'The statement is only partially accurate',
                  options: ['The statement is only partially accurate', 'traditional farming'],
                  hint: 'Review c6_geography_ch03_018 to understand how climate dictates farming seasons before studying.',
                  misconception: 'Students often believe that "traditional farming" simply means primitive, unproductive backwardness that has no scientific basis.' }
          ],
            remediations: { 'traditional-farming-simply-means-primitive': { steps: ['To fix this, guide the student to examine a specific traditional method like crop rotation with leguminous plants.', 'Explain step-by-step: (1) Cereal crops take up nitrogen from the soil; (2) Legumes host bacteria in their roots that.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch04_008', difficulty: 'standard',
          question: 'Modern farming techniques refer to the application of advanced technological.',
          hint: 'Review c7_geo_ch04_007 to contrast hand tools and bullock ploughs with modern mechanical.',
          misconception: 'Students often believe that modern farming techniques like tractors and hybrid seeds completely eliminate the influence.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Modern farming techniques refer to the application of advanced technological inputs—such',
                  options: ['Modern farming techniques refer to the application of advanced technological inputs—such', 'Agriculture in India is the cultivation of crops, raising of livestock, and management of', 'Types of farming in India refer to the distinct methods and systems by', 'Rabi and Kharif are the two primary cropping seasons in India, determined by the monsoon'],
                  hint: 'Review c7_geo_ch04_007 to contrast hand tools and bullock ploughs with modern mechanical tractors.',
                  misconception: 'Students often believe that modern farming techniques like tractors and hybrid seeds completely eliminate the influence of natural.' }
          ],
            remediations: { 'modern-farming-techniques-like-tractors': { steps: ['To correct this, guide the student back to physical maps of India\'s river basins and climate zones.', 'Show them that tractors only speed up soil preparation and hybrid seeds only perform well when specific soil nutrient.', 'Use the local example of canal networks in Rajasthan (like the Indira Gandhi Canal) to prove that even with advanced.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch04_009', difficulty: 'standard',
          question: 'The agricultural landscape refers to the spatial pattern and visual arrangement.',
          hint: 'Review c7_geo_ch04_006 to reconnect how water and soil dictate crop choices before.',
          misconception: 'Students often think that all agricultural landscapes in India look the same because "farming is just growing crops,".',
          parts: [
                { id: 'a', prompt: 'A region in Punjab receives reliable canal irrigation and has flat, alluvial soil.', answer: 'Identify flat alluvial soil and canal water availability',
                  options: ['Identify flat alluvial soil and canal water availability', 'farming is just growing crops'],
                  hint: 'Review c7_geo_ch04_006 to reconnect how water and soil dictate crop choices before studying overall.',
                  misconception: 'Students often think that all agricultural landscapes in India look the same because "farming is just growing crops," ignoring how physical.' }
          ],
            remediations: { 'all-agricultural-landscapes-in-india': { steps: ['To fix this misconception, take a blank outline map of India and overlay physical regions (mountains, plains, plateaus.', 'Step-by-step, match each physical region to its corresponding crop type and field shape using photographic examples.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch04_010', difficulty: 'standard',
          question: 'Challenges faced by Indian farmers refer to the severe economic, environmental.',
          hint: 'Review c7_geo_ch04_006 to understand the direct relationship between farming, climate.',
          misconception: 'Students often believe that Indian farmers are poor simply because they are lazy or do not know modern farming.',
          parts: [
                { id: 'a', prompt: 'What term describes a farming plot that has been divided into very small, scattered pieces across generations among family members?', answer: 'The correct term is a fragmented or marginal landholding',
                  options: ['The correct term is a fragmented or marginal landholding', 'commercial farm', 'large estate'],
                  hint: 'Review c7_geo_ch04_006 to understand the direct relationship between farming, climate, and water.',
                  misconception: 'Students often believe that Indian farmers are poor simply because they are lazy or do not know modern farming techniques.' }
          ],
            remediations: { 'indian-farmers-are-poor-simply': { steps: ['To fix this misconception, use a step-by-step geographical breakdown: 1.', 'Look at a map of average landholding sizes across Indian states to show that over 85% of farmers are small and marginal.', 'Examine rainfall variability maps to show that nearly half of India\'s net sown area lacks reliable irrigation and.', 'Discuss how middlemen buy crops at very low prices before the farmer can reach regulated wholesale markets (mandis).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch04_011', difficulty: 'standard',
          question: 'Sustainable farming integrates traditional ecological knowledge with.',
          hint: 'Review c7_geo_ch04_007 for traditional practices and c7_geo_ch04_008 for modern.',
          misconception: 'Students often think that "sustainable farming" simply means going back entirely to ancient farming methods and.',
          parts: [
                { id: 'a', prompt: 'A farmer in Punjab notices declining soil fertility and rising groundwater salinity due to intensive chemical use and excessive tube-well pumping.', answer: 'Identify problems: Chemical overuse depletes soil nutrients',
                  options: ['Identify problems: Chemical overuse depletes soil nutrients', 'sustainable farming'],
                  hint: 'Review c7_geo_ch04_007 for traditional practices and c7_geo_ch04_008 for modern techniques to see.',
                  misconception: 'Students often think that "sustainable farming" simply means going back entirely to ancient farming methods and rejecting all modern.' }
          ],
            remediations: { 'sustainable-farming-simply-means-going': { steps: ['To fix this, guide the student to examine a case study of an Indian farmer who uses a tractor (contemporary machine).', 'Explain that sustainability is about balance and resource conservation, not rejecting progress; modern tools can help.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
