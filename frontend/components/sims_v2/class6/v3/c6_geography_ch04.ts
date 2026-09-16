import type { SimDef } from '../../engine/types';

/** v3 generated — c6_geography_ch04 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_geography_ch04: SimDef = {
    id: 'v3_c6_geography_ch04',
    title: 'The Story of Indian Farming',
    subtitle: 'This node covers the transition from basic food production to organized agriculture.',
    classLevel: 6, subject: 'geography', topic: 'The Story of Indian Farming',
    chapters: ['c6_geography_ch04'],
    nodeIds: ['c6_geography_ch04_020', 'c6_geography_ch04_021', 'c6_geography_ch04_023', 'c6_geography_ch04_025'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Think about your favorite meal—where do you think the rice or wheat on your plate actually comes from?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'For thousands of years people wandered to find food — then around 7000 BCE near the Indus, someone planted wheat and barley and everything changed. How did a seed end the wandering and eventually build cities?',
        options: ['Farming near rivers gave a steady food supply, so people settled, stored surplus, and villages grew into cities', 'People got tired of walking and simply stopped', 'Rivers pushed people into cities by flooding the forests', 'Cities appeared first, and farming was invented inside them'],
        answer: 'Farming near rivers gave a steady food supply, so people settled, stored surplus, and villages grew into cities',
        hook: 'Farming did not begin everywhere at once. Wheat and barley started in the northwest around 7000 BCE; rice in the Ganga region came later, around 5000 BCE — agriculture spread in stages.',
    },
    teaching: [
        { title: 'Early Beginnings of Farming in India', text: 'The beginning of farming in India refers to the period around 7000 BCE when early human societies in the northwest region transitioned from food-gathering to cultivating crops like wheat and barley.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_geography_ch04_020', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Follow a seed from a riverbank in the northwest to a stored surplus, and trace how that surplus frees some people to build, craft, and run a city.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c6_geography_ch04_020', title: 'Early Beginnings of Farming in India',
          caseStudy: { intro: 'Think about your favorite meal—where do you think the rice or wheat on your plate actually comes from?',
            decisions: [{ prompt: 'Around what year did agriculture begin in the northwest region of the Indian subcontinent?', options: [
                { text: 'Agriculture began around 7000 BCE', outcome: 'Agriculture began around 7000 BCE. If a student says "2600 BCE," they are confusing the start.' },
                { text: '2600 BCE', outcome: 'Not quite — Students often think agriculture appeared everywhere in India at the exact same time.', reveals: 'agriculture-appeared-everywhere-in-india' },
                { text: 'agriculture appeared everywhere in India at the exact same time', outcome: 'Not quite — Students often think agriculture appeared everywhere in India at the exact same time.', reveals: 'agriculture-appeared-everywhere-in-india' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch04_021', title: 'Types of Farming: Subsistence vs Commercial',
          caseStudy: { intro: 'Have you ever wondered why some farmers in your village have a small patch of land with many different vegetables, while others have huge fields filled with.',
            decisions: [{ prompt: 'What is the primary goal of a farmer practicing subsistence farming?', options: [
                { text: 'The primary goal is to produce enough food to meet the needs of the farmer\'s own family', outcome: 'The primary goal is to produce enough food to meet the needs of the farmer\'s own family.' },
                { text: 'self-sufficiency', outcome: 'Not quite — Students often believe that commercial farming only exists in Western countries or that it must.', reveals: 'commercial-farming-only-exists-in' },
                { text: 'profit-making', outcome: 'Not quite — Students often believe that commercial farming only exists in Western countries or that it must.', reveals: 'commercial-farming-only-exists-in' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch04_022', title: 'Major Crops of India: Wheat, Rice, Pulses, and More',
          caseStudy: { intro: 'Have you ever wondered why your lunch in Chennai might be rice-based while your breakfast in Delhi is often wheat-based?',
            decisions: [{ prompt: 'Which of these crops is considered a \'Kharif\' crop, usually sown in June-July?', options: [
                { text: 'Rice', outcome: 'Rice. A wrong answer suggests the student is confusing the seasonal cycles of crops; they need.' },
                { text: 'all crops grow year-round regardless of rainfall or temperature', outcome: 'Not quite — Students often think all crops grow year-round regardless of rainfall or temperature.', reveals: 'all-crops-grow-year-round' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch04_023', title: 'Farming Seasons: Kharif and Rabi Explained',
          caseStudy: { intro: 'Have you ever noticed why your favorite mangoes are available only in summer, or why certain vegetables appear in the market only when it starts getting cold?',
            decisions: [{ prompt: 'What is the primary factor that determines when Kharif crops are sown?', options: [
                { text: 'Kharif crops are sown at the beginning of the monsoon (June-July)', outcome: 'Kharif crops are sown at the beginning of the monsoon (June-July).' },
                { text: 'all crops grow year-round if given enough water', outcome: 'Not quite — Students often think all crops grow year-round if given enough water.', reveals: 'all-crops-grow-year-round' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch04_024', title: 'Modern Farming: Irrigation, Fertilizers, Machinery',
          caseStudy: { intro: 'Imagine you are a farmer whose entire crop depends on whether or not it rains this month. What happens if the rain doesn\'t come? You might lose everything.',
            decisions: [{ prompt: 'What is the main difference between traditional farming and modern farming regarding water?', options: [
                { text: 'Traditional farming depends entirely on unpredictable rainfall, while modern farming uses', outcome: 'Traditional farming depends entirely on unpredictable rainfall, while modern farming uses managed.' },
                { text: 'waiting for nature', outcome: 'Not quite — Students often think "Modern Farming" is just about tractors. They overlook that without irrigation.', reveals: 'modern-farming-is-just-about' },
                { text: 'controlling resources', outcome: 'Not quite — Students often think "Modern Farming" is just about tractors. They overlook that without irrigation.', reveals: 'modern-farming-is-just-about' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch04_025', title: 'Challenges in Indian Farming and Sustainable Solutions',
          caseStudy: { intro: 'Have you ever wondered why your parents worry when the rains are late, even though we have shops full of food?',
            decisions: [{ prompt: 'What are two natural or human-made reasons why Indian farming faces challenges today?', options: [
                { text: 'Two main reasons are water scarcity caused by the over-pumping of groundwater and soil', outcome: 'Two main reasons are water scarcity caused by the over-pumping of groundwater and soil degradation.' },
                { text: 'more chemicals = more food', outcome: 'Not quite — Students often believe that "more chemicals = more food," assuming that chemical fertilizers are.', reveals: 'more-chemicals-more-food' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch04_020', title: 'Use it in the wild',
          caseStudy: { intro: 'In a history strategy game, a player must place a farming village on the map. The options: dry upland, dense forest, or a riverbank. \'Any flat spot works,\' the player shrugs, and picks the upland.',
            decisions: [{ prompt: 'What did early farmers actually look for, and why?', options: [
                { text: 'The riverbank — farming needs reliable water and fertile soil, and rivers supply both: they water crops and renew the floodplain\'s soil every year. A well-placed field grows more than the village eats, and that surplus is what later lets some people stop farming and become potters, weavers and rulers — the seed of a city.', outcome: 'The first farming villages clustered along rivers for exactly this reason — water and fertile flood soil came first, and surplus food came from them.' },
                { text: 'The player is right — any flat land can grow crops, so location is a detail.', outcome: 'Flatness is not fertility — dry upland starves crops without irrigation, and the river\'s yearly silt is what kept early fields productive.', reveals: 'flat-land-is-enough' },
                { text: 'The forest was the best pick — trees provide all the food a village needs.', outcome: 'Wild food feeds foragers, not farmers — a farming village needs cleared, watered, fertile land, which the riverbank offers and dense forest does not.', reveals: 'forest-feeds-farmers' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch04_025', title: 'You made it',
          caseStudy: { intro: 'A city is built on stored grain. Once food could stay in one place, so could people — and villages grew into civilisation.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_geography_ch04_020', difficulty: 'standard',
          question: 'The beginning of farming in India refers to the period around 7000 BCE when.',
          hint: 'Review the concept of "settlement" vs "nomadic life."',
          misconception: 'Students often think agriculture appeared everywhere in India at the exact same time.',
          parts: [
                { id: 'a', prompt: 'Around what year did agriculture begin in the northwest region of the Indian subcontinent?', answer: 'Agriculture began around 7000 BCE',
                  options: ['Agriculture began around 7000 BCE', '2600 BCE', 'agriculture appeared everywhere in India at the exact same time'],
                  hint: 'Review the concept of "settlement" vs "nomadic life."',
                  misconception: 'Students often think agriculture appeared everywhere in India at the exact same time.' },
                { id: 'b', prompt: 'Why did early farmers prefer to settle near rivers like the Indus, Sarasvatī, and Ganga?', answer: 'They settled there',
                  options: ['They settled there', 'to use boats for travel', 'agriculture appeared everywhere in India at the exact same time'],
                  hint: 'Review the concept of "settlement" vs "nomadic life."',
                  misconception: 'Students often think agriculture appeared everywhere in India at the exact same time.' },
                { id: 'c', prompt: 'If you were a farmer in the northwest region around 6000 BCE, what animals would you likely have kept?', answer: 'You would have kept cattle, sheep, and goats',
                  options: ['You would have kept cattle, sheep, and goats', 'agriculture appeared everywhere in India at the exact same time'],
                  hint: 'Review the concept of "settlement" vs "nomadic life."',
                  misconception: 'Students often think agriculture appeared everywhere in India at the exact same time.' }
          ],
            remediations: { 'agriculture-appeared-everywhere-in-india': { steps: ['Ask the student to look at a timeline and point to 7000 BCE vs 2600 BCE.', 'Explain that the 7000 BCE date is the "seed" (the beginning of farming) while the 2600 BCE date is the "tree" (the.', 'Have them draw a simple sequence: "Farming starts in NW -> Villages grow -> Cities emerge."'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch04_021', difficulty: 'standard',
          question: 'Subsistence farming is an agricultural method where families grow food.',
          hint: 'Review the definition of \'productive agriculture\' from Chapter 6.',
          misconception: 'Students often believe that commercial farming only exists in Western countries or that it must involve modern.',
          parts: [
                { id: 'a', prompt: 'If a farmer sells their small "surplus" of wheat at the local market, does this change their farming type to commercial? Why or why not?', answer: 'No, it remains subsistence farming',
                  options: ['No, it remains subsistence farming', 'commercial'],
                  hint: 'Review the definition of \'productive agriculture\' from Chapter 6.',
                  misconception: 'Students often believe that commercial farming only exists in Western countries or that it must involve modern machinery.' }
          ],
            remediations: { 'commercial-farming-only-exists-in': { steps: ['First, ask the student to define "profit." Then, show them two photos: a small kitchen garden and a vast, single-crop.', 'Ask them to point to the one that would be "risky" if the market price dropped, and explain that commercial farming.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch04_022', difficulty: 'standard',
          question: 'Major crops in India are agricultural plants grown on a large scale to provide.',
          hint: 'Review the section on the \'Sarasvati River\' and early agriculture in Chapter 4.',
          misconception: 'Students often think all crops grow year-round regardless of rainfall or temperature.',
          parts: [
                { id: 'a', prompt: 'Which of these crops is considered a \'Kharif\' crop, usually sown in June-July?', answer: 'Rice',
                  options: ['Rice', 'all crops grow year-round regardless of rainfall or temperature'],
                  hint: 'Review the section on the \'Sarasvati River\' and early agriculture in Chapter 4.',
                  misconception: 'Students often think all crops grow year-round regardless of rainfall or temperature.' },
                { id: 'b', prompt: 'Why is Rice more common in West Bengal and Andhra Pradesh than in the dry parts of Rajasthan?', answer: 'Rice requires heavy rainfall (over 100 cm) and warm temperatures',
                  options: ['Rice requires heavy rainfall (over 100 cm) and warm temperatures', 'all crops grow year-round regardless of rainfall or temperature'],
                  hint: 'Review the section on the \'Sarasvati River\' and early agriculture in Chapter 4.',
                  misconception: 'Students often think all crops grow year-round regardless of rainfall or temperature.' },
                { id: 'c', prompt: 'If you were a farmer in Punjab and you wanted to grow a crop that needs moderate rainfall (50-75 cm) and cool weather, which crop would you choose?', answer: 'Wheat',
                  options: ['Wheat', 'all crops grow year-round regardless of rainfall or temperature'],
                  hint: 'Review the section on the \'Sarasvati River\' and early agriculture in Chapter 4.',
                  misconception: 'Students often think all crops grow year-round regardless of rainfall or temperature.' },
                { id: 'd', prompt: 'How do Pulses differ from staple grains like Rice and Wheat in terms of their role in an Indian diet?', answer: 'Pulses are a category of protein-rich crops including lentils and beans (dal)',
                  options: ['Pulses are a category of protein-rich crops including lentils and beans (dal)', 'all crops grow year-round regardless of rainfall or temperature'],
                  hint: 'Review the section on the \'Sarasvati River\' and early agriculture in Chapter 4.',
                  misconception: 'Students often think all crops grow year-round regardless of rainfall or temperature.' }
          ],
            remediations: { 'all-crops-grow-year-round': { steps: ['Ask the student to look at a rainfall map of India.', 'Ask them to overlay the rice-growing regions on the map.', 'Point out that the dark blue areas (high rain) match the rice regions.', 'Explain that crops, like us, have "needs" (water/temperature) they cannot live without.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch04_022', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think all crops grow year-round regardless of rainfall or temperature.',
          parts: [
                { id: 'a', prompt: 'Evaluate why the Harappan civilization, as discussed in your history chapter, relied on the rivers for their agriculture.', answer: 'Rivers provide consistent water and enrich the soil',
                  options: ['Rivers provide consistent water and enrich the soil', 'all crops grow year-round regardless of rainfall or temperature'],
                  hint: 'Review the section on the \'Sarasvati River\' and early agriculture in Chapter 4.',
                  misconception: 'Students often think all crops grow year-round regardless of rainfall or temperature.' }
          ],
            remediations: { 'all-crops-grow-year-round': { steps: ['Ask the student to look at a rainfall map of India.', 'Ask them to overlay the rice-growing regions on the map.', 'Point out that the dark blue areas (high rain) match the rice regions.', 'Explain that crops, like us, have "needs" (water/temperature) they cannot live without.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch04_023', difficulty: 'standard',
          question: 'Farming seasons in India are distinct periods for growing crops, categorized.',
          hint: 'Review the "Climate of India" chapter to understand the timing of the rainy season.',
          misconception: 'Students often think all crops grow year-round if given enough water.',
          parts: [
                { id: 'a', prompt: 'What is the primary factor that determines when Kharif crops are sown?', answer: 'Kharif crops are sown at the beginning of the monsoon (June-July)',
                  options: ['Kharif crops are sown at the beginning of the monsoon (June-July)', 'all crops grow year-round if given enough water'],
                  hint: 'Review the "Climate of India" chapter to understand the timing of the rainy season.',
                  misconception: 'Students often think all crops grow year-round if given enough water.' },
                { id: 'b', prompt: 'If a farmer needs a crop that requires a lot of water and warm weather, which season should they choose?', answer: 'They should choose the Kharif season',
                  options: ['They should choose the Kharif season', 'all crops grow year-round if given enough water'],
                  hint: 'Review the "Climate of India" chapter to understand the timing of the rainy season.',
                  misconception: 'Students often think all crops grow year-round if given enough water.' },
                { id: 'c', prompt: 'A farmer in Haryana harvests wheat in the spring. Based on this, when was the wheat likely sown?', answer: 'It was sown in autumn (October-November)',
                  options: ['It was sown in autumn (October-November)', 'all crops grow year-round if given enough water'],
                  hint: 'Review the "Climate of India" chapter to understand the timing of the rainy season.',
                  misconception: 'Students often think all crops grow year-round if given enough water.' }
          ],
            remediations: { 'all-crops-grow-year-round': { steps: ['Ask the student to imagine wearing a heavy wool sweater in the middle of a hot, humid June day.', 'Then, ask them to imagine standing outside in the freezing wind in a light cotton shirt.', 'Explain that plants are like us—they have "outfits" (climatic preferences) that only suit specific times of the year.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch04_024', difficulty: 'standard',
          question: 'Modern farming is a scientifically advanced approach to agriculture that uses.',
          hint: 'Review basic plant needs: What do you need to keep a houseplant alive?',
          misconception: 'Students often think "Modern Farming" is just about tractors. They overlook that without irrigation and fertilizers,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Modern farming is a scientifically advanced approach to agriculture that uses controlled',
                  options: ['Modern farming is a scientifically advanced approach to agriculture that uses controlled', 'The beginning of farming in India refers to the period around 7000 BCE when early human', 'Subsistence farming is an agricultural method where families grow food primarily to feed', 'Major crops in India are agricultural plants grown on a large scale to provide food for'],
                  hint: 'Review basic plant needs: What do you need to keep a houseplant alive? (Water, sunlight, soil).',
                  misconception: 'Students often think "Modern Farming" is just about tractors. They overlook that without irrigation and fertilizers, a tractor alone cannot.' }
          ],
            remediations: { 'modern-farming-is-just-about': { steps: ['Ask the student: "If you have a fast tractor but no water, will the seeds grow?" Then ask: "If you have water but the.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch04_025', difficulty: 'standard',
          question: 'Indian farming faces significant hurdles today, including the depletion.',
          hint: 'Review the section on Harappan agriculture to see how they used rivers and land.',
          misconception: 'Students often believe that "more chemicals = more food," assuming that chemical fertilizers are always better than.',
          parts: [
                { id: 'a', prompt: 'Why is the "monsoon" considered a challenge for Indian farmers?', answer: 'The monsoon is a challenge',
                  options: ['The monsoon is a challenge', 'more chemicals = more food', 'the monsoon is always helpful, ignoring the risk of floods or droughts'],
                  hint: 'Review the section on Harappan agriculture to see how they used rivers and land.',
                  misconception: 'Students often believe that "more chemicals = more food," assuming that chemical fertilizers are always better than natural methods.' },
                { id: 'b', prompt: 'If a farmer in Punjab notices their tube well is pumping less water than it did five years ago, what is the most likely cause?', answer: 'The groundwater level has dropped',
                  options: ['The groundwater level has dropped', 'more chemicals = more food'],
                  hint: 'Review the section on Harappan agriculture to see how they used rivers and land.',
                  misconception: 'Students often believe that "more chemicals = more food," assuming that chemical fertilizers are always better than natural methods.' }
          ],
            remediations: { 'more-chemicals-more-food': { steps: ['First, ask the student to describe what happens to soil when we keep adding chemicals (it becomes like a "dead" sponge).', 'Second, show them a picture of organic compost vs.', 'artificial powder and explain that nature needs "living" soil.', 'Third, ask them to list two ways to make soil healthy without chemicals (e.g., crop rotation, adding cow dung).'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
