import type { SimDef } from '../../engine/types';

/** v3 generated — c7_geo_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_geo_ch04_p1: SimDef = {
    id: 'v3_c7_geo_ch04_p1',
    title: 'The Story of Indian Farming · Part 1/2',
    subtitle: 'Covers the fundamental importance and general physical/human characteristics of farming.',
    classLevel: 7, subject: 'geography', topic: 'The Story of Indian Farming · Part 1/2',
    chapters: ['c7_geo_ch04'],
    nodeIds: ['c7_geo_ch04_001', 'c7_geo_ch04_002', 'c7_geo_ch04_003', 'c7_geo_ch04_004', 'c7_geo_ch04_005', 'c7_geo_ch04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Look out of your classroom window or recall a journey through your state; you likely see green fields.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'India has tractors, tube wells, and fertilizer factories — yet farmers still scan the June sky with worry. Why is Indian farming still called a gamble with the monsoon?',
        options: ['Most fields still depend on the timing and volume of seasonal rain — technology helps but cannot replace the water cycle', 'Because farmers refuse to use machines', 'Because monsoons are a myth invented by the news', 'Because tractors break down in rain'],
        answer: 'Most fields still depend on the timing and volume of seasonal rain — technology helps but cannot replace the water cycle',
        hook: 'Indian farming is not one uniform system. The flat, silt-rich Northern Plains allow big irrigated fields, while the rocky Peninsular Plateau and arid Rajasthan farm under totally different rules — geography writes the farming manual.',
    },
    teaching: [
        { title: 'Agriculture in India: Importance and Characteristics', text: 'Agriculture in India is the cultivation of crops, raising of livestock, and management of natural resources that forms the primary economic backbone of the country, deeply influenced by monsoonal.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_geo_ch04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compare two farms — one on the fertile Ganga plain, one on the dry plateau edge — and decide which physical gift and which human effort each one needs to succeed.',
        labels: ['Agriculture in India: Importance', 'Types of Farming', 'Rabi and Kharif Crops', 'Major Crops of India', 'Cash Crops: Cotton, Jute,', 'Relationship Between Farming, Climate,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c7_geo_ch04_002', title: 'Types of Farming in India: Traditional and Modern',
          caseStudy: { intro: 'Imagine walking past a small family farm in rural Bihar where an ox pulls a wooden plough through the mud, relying entirely on the monsoon rains.',
            decisions: [{ prompt: 'Which of the following is a primary characteristic of traditional farming in India?', options: [
                { text: 'C', outcome: 'The correct answer is C. Traditional farming relies heavily on natural weather patterns like the.' },
                { text: 'modern farming', outcome: 'Not quite — Students often believe that "modern farming" simply means using any machine, and that "traditional.', reveals: 'modern-farming-simply-means-using' },
                { text: 'traditional farming', outcome: 'Not quite — Students often believe that "modern farming" simply means using any machine, and that "traditional.', reveals: 'modern-farming-simply-means-using' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch04_004', title: 'Major Crops of India: Rice, Wheat, Sugarcane',
          caseStudy: { intro: 'Every time you eat a roti, a bowl of rice, or drink sugarcane juice, you are consuming the direct result of India\'s diverse climate and soil conditions.',
            decisions: [{ prompt: 'Which cropping season does rice belong to, and why does it require standing water during its early growth stage?', options: [
                { text: 'Rice is a Kharif crop grown during the monsoon season', outcome: 'Rice is a Kharif crop grown during the monsoon season because it requires high humidity, heavy.' },
                { text: 'wheat can grow during the humid monsoon months simply', outcome: 'Not quite — Students often believe that rice and wheat can be grown anywhere in India as long as farmers turn.', reveals: 'rice-and-wheat-can-be' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch04_005', title: 'Cash Crops: Cotton, Jute, Tea, Coffee',
          caseStudy: { intro: 'When you wear a 100% cotton school uniform, drink a cup of hot tea in the morning, or write in a notebook tied with a jute twine, you are interacting with.',
            decisions: [{ prompt: 'Which soil type is most ideal for growing cotton in the Peninsular Plateau region of India?', options: [
                { text: 'Black soil (also known as Regur soil) is the most ideal for cotton cultivation', outcome: 'Black soil (also known as Regur soil) is the most ideal for cotton cultivation because it retains.' },
                { text: 'alluvial soil or laterite soil', outcome: 'Not quite — Students often confuse the geographical requirements of cotton and jute, mistakenly believing both.', reveals: 'students-often-confuse-the-geographical' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch04_006', title: 'Relationship Between Farming, Climate, Soil and Water',
          caseStudy: { intro: 'When you look at a lush green paddy field in West Bengal or a dry, thorny cotton field in parts of Maharashtra, you are seeing the result of a complex.',
            decisions: [{ prompt: 'What are the four primary environmental pillars that determine agricultural patterns in any region of India?', options: [
                { text: 'The four pillars are climate, soil, water, and farming', outcome: 'The four pillars are climate, soil, water, and farming. A wrong answer—such as naming specific.' },
                { text: 'specific crops like wheat and rice', outcome: 'Not quite — Students often think that if a region has fertile soil, it can grow any crop regardless of the.', reveals: 'if-a-region-has-fertile' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A family in the dry rain-shadow part of the Deccan plateau visits relatives in Punjab and returns inspired. They announce they will flood their fields and grow the same water-hungry paddy, because \'farming is farming anywhere in India.\'',
            decisions: [{ prompt: 'What is wrong with their plan, and what would suit their land better?', options: [
                { text: 'Their farm sits where hills block monsoon winds, so rainfall is low and water is scarce; agriculture there suits tank irrigation and drought-resistant crops, not paddy. Farming choices must match local soil, terrain and water, not copy another region.', outcome: 'This respects the core principle: Indian agriculture is shaped by physical geography — relief, soil and water — so practices cannot be transplanted unchanged.' },
                { text: 'The plan is fine — with enough tractors and chemical fertiliser, climate and rainfall no longer matter to farming.', outcome: 'Machinery and fertiliser cannot manufacture water; groundwater recharge and soil moisture still depend on the monsoon, so paddy would fail or exhaust the water table.', reveals: 'technology-beats-climate' },
                { text: 'They should simply work harder — differences between Indian farms come down to effort, not geography.', outcome: 'Effort cannot replace physical conditions: a rain-shadow field and a Punjab alluvial plain differ in water and soil no matter how hard anyone works.', reveals: 'farming-is-uniform' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Farming is a partnership: the land offers soil and water, the farmer offers labour and timing. The monsoon still holds the deciding vote.',
            decisions: [{ prompt: 'What comes next? The Story of Indian Farming · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Story of Indian Farming · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_geo_ch04_001', difficulty: 'standard',
          question: 'Agriculture in India is the cultivation of crops, raising of livestock, and.',
          hint: 'Review the monsoon precipitation patterns and river basin fertility maps from Class 6.',
          misconception: 'Students often think that Indian agriculture is uniform across the entire country, assuming that every region grows the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Agriculture in India is the cultivation of crops, raising of livestock, and management of',
                  options: ['Agriculture in India is the cultivation of crops, raising of livestock, and management of', 'Types of farming in India refer to the distinct methods and systems by', 'Rabi and Kharif are the two primary cropping seasons in India, determined by the monsoon', 'This topic explores the geographical requirements, regional distribution, and'],
                  hint: 'Review the monsoon precipitation patterns and river basin fertility maps from Class 6 Geography.',
                  misconception: 'Students often think that Indian agriculture is uniform across the entire country, assuming that every region grows the same crops using.' }
          ],
            remediations: { 'indian-agriculture-is-uniform-across': { steps: ['To fix this, guide the student to examine an atlas map comparing physical landforms, rainfall zones, and agricultural.', 'Point out how the Thar Desert\'s arid climate restricts farming compared to the water-rich Northern Plains, proving that.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch04_002', difficulty: 'standard',
          question: 'Types of farming in India refer to the distinct methods and systems by which.',
          hint: 'Review c6_geography_ch03_018 (Climate and Agriculture) and c6_geography_ch04_021 (Types.',
          misconception: 'Students often believe that "modern farming" simply means using any machine, and that "traditional farming" is entirely.',
          parts: [
                { id: 'a', prompt: 'Which of the following is a primary characteristic of traditional farming in India?', answer: 'Dependence on natural rainfall and family labour',
                  options: ['Dependence on natural rainfall and family labour', 'modern farming', 'traditional farming'],
                  hint: 'Review c6_geography_ch03_018 (Climate and Agriculture) and c6_geography_ch04_021 (Types of Farming).',
                  misconception: 'Students often believe that "modern farming" simply means using any machine, and that "traditional farming" is entirely useless and.' }
          ],
            remediations: { 'modern-farming-simply-means-using': { steps: ['To correct this, guide the student to examine two specific case studies: a traditional farmer using mixed cropping.', 'Have them list the inputs, energy sources, and water usage for both.', 'Emphasize that traditional methods are adapted to ecological limits, whereas modern methods maximize output but require.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch04_003', difficulty: 'standard',
          question: 'Rabi and Kharif are the two primary cropping seasons in India, determined.',
          hint: 'Review the monsoon and seasonal climate patterns from Class 6 Geography before attempting.',
          misconception: 'Students often think that crops are grown randomly whenever farmers feel like planting them, or they confuse the sowing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rabi and Kharif are the two primary cropping seasons in India, determined by the monsoon',
                  options: ['Rabi and Kharif are the two primary cropping seasons in India, determined by the monsoon', 'Agriculture in India is the cultivation of crops, raising of livestock, and management of', 'Types of farming in India refer to the distinct methods and systems by', 'This topic explores the geographical requirements, regional distribution, and'],
                  hint: 'Review the monsoon and seasonal climate patterns from Class 6 Geography before attempting seasonal.',
                  misconception: 'Students often think that crops are grown randomly whenever farmers feel like planting them, or they confuse the sowing and harvesting.' }
          ],
            remediations: { 'crops-are-grown-randomly-whenever': { steps: ['Draw a simple timeline of the Indian calendar year divided into 12 months.', 'Shade June to October as the \'Rain/Monsoon\' block and write \'Kharif\' over it with a drawing of a rice plant.', 'Shade November to March as the \'Cool/Dry\' block and write \'Rabi\' over it with a drawing of a wheat stalk.', 'Explain that nature dictates the calendar because plants need specific weather to sprout and grow.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch04_004', difficulty: 'standard',
          question: 'This topic explores the geographical requirements, regional distribution, and.',
          hint: 'Review c7_geo_ch04_003 to master the timing of Kharif and Rabi seasons before learning.',
          misconception: 'Students often believe that rice and wheat can be grown anywhere in India as long as farmers turn on irrigation pumps.',
          parts: [
                { id: 'a', prompt: 'Which cropping season does rice belong to, and why does it require standing water during its early growth stage?', answer: 'Rice is a Kharif crop grown during the monsoon season',
                  options: ['Rice is a Kharif crop grown during the monsoon season', 'wheat can grow during the humid monsoon months simply'],
                  hint: 'Review c7_geo_ch04_003 to master the timing of Kharif and Rabi seasons before learning specific.',
                  misconception: 'Students often believe that rice and wheat can be grown anywhere in India as long as farmers turn on irrigation pumps, ignoring the strict.' },
                { id: 'b', prompt: 'If a state has alluvial soil, an average annual rainfall above 100 cm, and high summer temperatures, which major crop is most suitable for cultivation without.', answer: 'Rice is the most suitable crop',
                  options: ['Rice is the most suitable crop', 'wheat can grow during the humid monsoon months simply'],
                  hint: 'Review c7_geo_ch04_003 to master the timing of Kharif and Rabi seasons before learning specific.',
                  misconception: 'Students often believe that rice and wheat can be grown anywhere in India as long as farmers turn on irrigation pumps, ignoring the strict.' }
          ],
            remediations: { 'rice-and-wheat-can-be': { steps: ['Review temperature and seasonal charts from Class 6 climate studies.', 'Use a comparative map overlay showing northern winter temperatures versus monsoon rainfall zones to demonstrate why.', 'Emphasize that water is only one part of the equation; temperature and soil type are equally vital.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch04_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that rice and wheat can be grown anywhere in India as long as farmers turn on irrigation pumps.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether it is sustainable to grow water-intensive crops like rice and sugarcane in semi-arid regions of Punjab and interior Maharashtra using deep.', answer: 'It is unsustainable in the long term',
                  options: ['It is unsustainable in the long term', 'wheat can grow during the humid monsoon months simply'],
                  hint: 'Review c7_geo_ch04_003 to master the timing of Kharif and Rabi seasons before learning specific.',
                  misconception: 'Students often believe that rice and wheat can be grown anywhere in India as long as farmers turn on irrigation pumps, ignoring the strict.' }
          ],
            remediations: { 'rice-and-wheat-can-be': { steps: ['Review temperature and seasonal charts from Class 6 climate studies.', 'Use a comparative map overlay showing northern winter temperatures versus monsoon rainfall zones to demonstrate why.', 'Emphasize that water is only one part of the equation; temperature and soil type are equally vital.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch04_005', difficulty: 'standard',
          question: 'Cash crops are agricultural products grown specifically for commercial sale.',
          hint: 'Review the physical divisions of India and monsoon rainfall distribution maps from Class.',
          misconception: 'Students often confuse the geographical requirements of cotton and jute, mistakenly believing both are fiber crops.',
          parts: [
                { id: 'a', prompt: 'Which soil type is most ideal for growing cotton in the Peninsular Plateau region of India?', answer: 'Black soil (also known as Regur soil) is the most ideal for cotton cultivation',
                  options: ['Black soil (also known as Regur soil) is the most ideal for cotton cultivation', 'alluvial soil or laterite soil'],
                  hint: 'Review the physical divisions of India and monsoon rainfall distribution maps from Class 6.',
                  misconception: 'Students often confuse the geographical requirements of cotton and jute, mistakenly believing both are fiber crops grown in the same wet.' }
          ],
            remediations: { 'students-often-confuse-the-geographical': { steps: ['Look at a physical map of India and locate the dry Deccan Plateau (Maharashtra, Gujarat) for cotton and the wet.', 'Write down the rainfall numbers for each (Cotton: 50-100 cm; Jute: 150-250 cm).', 'Explain that cotton bolls need dry sunshine to open properly, while jute stalks need water to rot and yield soft fibers.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch04_006', difficulty: 'standard',
          question: 'The relationship between farming, climate, soil, and water describes how.',
          hint: 'Review c6_geography_ch03_018 (Climate and Agriculture) and c6_geography_ch01_003 (The.',
          misconception: 'Students often think that if a region has fertile soil, it can grow any crop regardless of the local climate or water.',
          parts: [
                { id: 'a', prompt: 'What are the four primary environmental pillars that determine agricultural patterns in any region of India?', answer: 'The four pillars are climate, soil, water, and farming',
                  options: ['The four pillars are climate, soil, water, and farming', 'specific crops like wheat and rice'],
                  hint: 'Review c6_geography_ch03_018 (Climate and Agriculture) and c6_geography_ch01_003 (The Northern.',
                  misconception: 'Students often think that if a region has fertile soil, it can grow any crop regardless of the local climate or water availability.' }
          ],
            remediations: { 'if-a-region-has-fertile': { steps: ['To fix this misconception, use a comparative map exercise: look at a map of Western Rajasthan and Assam side by side.', 'Point out that while Rajasthan has sandy soil that could theoretically hold nutrients if watered, the lack of rainfall.', 'Emphasize that soil is only one piece of the four-part puzzle.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
