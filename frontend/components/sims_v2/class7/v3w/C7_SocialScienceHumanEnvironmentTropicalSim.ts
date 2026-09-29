import type { SimDef } from '../../engine/types';
import C7_SocialScienceHumanEnvironmentTropicalSim from '../../../simulations/c6_12/C7_SocialScienceHumanEnvironmentTropicalSim';

/** v3 wrapped master — C7_SocialScienceHumanEnvironmentTropicalSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_socialsciencehumanenvironmenttropicalsim: SimDef = {
    id: 'v3w_c7_socialsciencehumanenvironmenttropicalsim',
    title: 'Challenges Faced by Indian Farmers',
    subtitle: 'Covers the socio-economic and environmental challenges faced by Indian farmers and their.',
    classLevel: 7, subject: 'science', topic: 'Challenges Faced by Indian Farmers',
    chapters: [],
    nodeIds: ['c7_geo_ch04_010', 'c7_geo_ch03_010', 'c7_geo_ch04_004', 'c7_geo_ch04_002', 'c7_geo_ch04_001', 'c7_geo_ch04_011', 'c7_geo_ch03_006', 'c7_geo_ch03_007', 'c7_geo_ch03_008', 'c7_geo_ch03_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'When you look at fields in your nearest village or read about farmers in the news, you might notice that.', goal: 'Master Challenges Faced by Indian Farmers.' },
    discovery: {
        question: 'What term describes a farming plot that has been divided into very small, scattered pieces across generations among family members?',
        options: ['The correct term is a fragmented or marginal landholding', 'commercial farm', 'large estate'],
        answer: 'The correct term is a fragmented or marginal landholding',
        hook: 'Students often believe that Indian farmers are poor simply because they are lazy or do not know modern farming.',
    },
    teaching: [
        { title: 'Challenges faced by Indian farmers refer to.', text: 'Challenges faced by Indian farmers refer to the severe economic, environmental, and structural obstacles—such as erratic monsoon rainfall, fragmented landholdings, high debt burdens, and inadequate.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_geo_ch04_010', title: 'Challenges faced by Indian farmers.',
          scaffold: { problem: 'A cotton-farming family in the Vidarbha region of Maharashtra has experienced two consecutive years of poor rainfall.',
            steps: [
            { text: 'Identify physical and environmental constraints: Two consecutive years of poor rainfall led to a 60% drop in cotton.' },
            { text: 'Calculate total crop revenue: Multiply actual yield by the market price ($4 \\text{ quintals} \\times.' },
            { text: 'Calculate debt obligation with high interest: The principal loan is ₹40,000 at 36% annual interest, making the total.' },
            { text: 'Compare revenue against debt: The family earned ₹20,000 from their harvest, but owes ₹54,400, leaving a deficit of.' },
            { text: 'Verify and interpret: Explain that because informal moneylenders charge exorbitant interest rates and crop failures are.', faded: true, blankAnswer: 'The family faces a net deficit of ₹34,400 on debt alone,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_geo_ch03_010', title: 'Climate change refers to long-term.',
          scaffold: { problem: 'A farming village in Maharashtra experienced a normal monsoon average of 800 mm of rainfall 30 years ago, but in recent years receives the.',
            steps: [
            { text: 'Identify the change in rainfall distribution from steady seasonal precipitation to intense, short-duration downpours.' },
            { text: 'Recall that soil infiltration capacity has a maximum rate; water arriving faster than this rate cannot be absorbed.' },
            { text: 'Apply this to the local topography of Maharashtra\'s plateau, where rapid runoff causes severe soil erosion and flash.' },
            { text: 'Conclude that despite receiving the same total annual rainfall volume, crops suffer from prolonged dry spells between.' },
            { text: 'Verify the conclusion by linking concentrated precipitation events to reduced groundwater recharge and increased.', faded: true, blankAnswer: 'The shift to compressed, intense rainfall causes severe.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_geo_ch04_004', title: 'This topic explores the geographical.',
          scaffold: { problem: 'A farmer in Punjab wants to maximize yield between wheat and rice.',
            steps: [
            { text: 'Identify the season and temperature conditions described (winter temperature 10°C, bright sunshine, cool weather).' },
            { text: 'Match the season to the cropping calendar (winter corresponds to the Rabi season).' },
            { text: 'Evaluate crop suitability for Rabi in northern plains (wheat thrives in cool winters with 50-75 cm of rainfall and.' },
            { text: 'Conclude that wheat is the ideal crop for the winter season in this region.' },
            { text: 'Verify that winter temperature and moderate moisture align perfectly with wheat physiology.', faded: true, blankAnswer: 'Wheat should be planted in winter because its physiological.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_geo_ch04_002', title: 'Types of farming in India refer to the.',
          scaffold: { problem: 'Farmer Ramesh owns 1.5 hectares of land in the interior of the Chota Nagpur Plateau (Jharkhand).',
            steps: [
            { text: 'Identify the input scale and technology used (bullocks, saved seeds, manual labour).' },
            { text: 'Identify the water source (monsoon dependence without artificial canal or tubewell irrigation).' },
            { text: 'Classify the farming system based on these inputs (Traditional Subsistence Farming).' },
            { text: 'Analyze geographic constraints (undulating plateau terrain limits large machinery use, and erratic monsoon rainfall.' },
            { text: 'Verify consistency between land size, input level, and regional geography.', faded: true, blankAnswer: 'Ramesh practices Traditional Subsistence Farming. His two.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_geo_ch04_001', title: 'Agriculture in India is the cultivation.',
          scaffold: { problem: 'A farming community in central India experiences a delayed monsoon.',
            steps: [
            { text: 'Identify the primary climate factor affecting the region (monsoon rainfall arrival).' },
            { text: 'Determine the agricultural impact of a 3-week delay (soil dries out, seeds cannot germinate without moisture).' },
            { text: 'Analyze available alternatives (activate tube-well irrigation if groundwater exists, or switch to shorter-duration.' },
            { text: 'Evaluate the human response (coordinating with local farming cooperatives to manage shared water resources).' },
            { text: 'Conclude that Indian farming requires constant adaptation to climatic irregularities through water management and crop.', faded: true, blankAnswer: 'Farmers must utilize supplemental groundwater irrigation or.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_geo_ch04_011', title: 'Sustainable farming integrates.',
          scaffold: { problem: 'A farmer in Maharashtra\'s drought-prone Marathwada region wants to grow cotton sustainably.',
            steps: [
            { text: 'Identify the primary environmental constraints—erratic monsoon rainfall and high soil moisture evaporation.' },
            { text: 'Select a traditional soil moisture conservation method, such as applying farmyard manure and organic mulch to improve.' },
            { text: 'Select a contemporary water-saving technology, such as installing a solar-powered drip irrigation system to deliver.' },
            { text: 'Integrate both methods into a seasonal plan where organic mulch reduces surface evaporation while solar drip irrigation.' },
            { text: 'Verify that the combined approach reduces groundwater extraction while maintaining crop yield.', faded: true, blankAnswer: 'The integrated plan uses organic mulch to trap existing.' }
            ] } },
        { type: 'dissect', nodeId: 'c7_geo_ch03_010', title: 'Identify each idea',
          dissect: { specimen: 'Challenges Faced by Indian Farmers', spots: [
            { id: 's1', label: 'Challenges faced by Indian farmers', prompt: 'Which idea is this? — Challenges faced by Indian farmers refer to the severe economic, environmental, and.', answer: 'Challenges faced by Indian farmers', options: ['Challenges faced by Indian farmers', 'Climate change refers to long-term', 'This topic explores the geographical', 'Types of farming in India'] },
            { id: 's2', label: 'Climate change refers to long-term', prompt: 'Which idea is this? — Climate change refers to long-term shifts in temperature, precipitation patterns, and.', answer: 'Climate change refers to long-term', options: ['Climate change refers to long-term', 'Challenges faced by Indian farmers', 'This topic explores the geographical', 'Types of farming in India'] },
            { id: 's3', label: 'This topic explores the geographical', prompt: 'Which idea is this? — This topic explores the geographical requirements, regional distribution, and.', answer: 'This topic explores the geographical', options: ['This topic explores the geographical', 'Challenges faced by Indian farmers', 'Climate change refers to long-term', 'Types of farming in India'] },
            { id: 's4', label: 'Types of farming in India', prompt: 'Which idea is this? — Types of farming in India refer to the distinct methods and systems by which land is.', answer: 'Types of farming in India', options: ['Types of farming in India', 'Challenges faced by Indian farmers', 'Climate change refers to long-term', 'This topic explores the geographical'] },
            { id: 's5', label: 'Agriculture in India is the', prompt: 'Which idea is this? — Agriculture in India is the cultivation of crops, raising of livestock, and management of.', answer: 'Agriculture in India is the', options: ['Agriculture in India is the', 'Challenges faced by Indian farmers', 'Climate change refers to long-term', 'This topic explores the geographical'] },
            { id: 's6', label: 'Sustainable farming integrates traditional ecological', prompt: 'Which idea is this? — Sustainable farming integrates traditional ecological knowledge with contemporary.', answer: 'Sustainable farming integrates traditional ecological', options: ['Sustainable farming integrates traditional ecological', 'Challenges faced by Indian farmers', 'Climate change refers to long-term', 'This topic explores the geographical'] }
          ] } }
    ],
    explore: { component: C7_SocialScienceHumanEnvironmentTropicalSim, prompt: 'Explore the interactive — Challenges Faced by Indian Farmers' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_geo_ch04_010', difficulty: 'standard',
          question: 'Challenges faced by Indian farmers refer to the severe economic, environmental,.',
          hint: 'Review c7_geo_ch04_006 to understand the direct relationship between farming, climate,.',
          misconception: 'Students often believe that Indian farmers are poor simply because they are lazy or do not know modern farming.',
          parts: [
                { id: 'a', prompt: 'What term describes a farming plot that has been divided into very small, scattered pieces across generations among family members?', answer: 'The correct term is a fragmented or marginal landholding',
                  options: ['The correct term is a fragmented or marginal landholding', 'commercial farm', 'large estate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that Indian farmers are poor simply because they are lazy or do not know modern farming techniques.' }
          ],
            remediations: { 'indian-farmers-are-poor-simply': { steps: ['To fix this misconception, use a step-by-step geographical breakdown: 1.', 'Look at a map of average landholding sizes across Indian states to show that over 85% of farmers are small and marginal.', 'Examine rainfall variability maps to show that nearly half of India\'s net sown area lacks reliable irrigation and.', 'Discuss how middlemen buy crops at very low prices before the farmer can reach regulated wholesale markets (mandis).'] } } },
        { type: 'subpart', nodeId: 'c7_geo_ch03_010', difficulty: 'standard',
          question: 'Climate change refers to long-term shifts in temperature, precipitation.',
          hint: 'Review c7_geo_ch03_003 to reinforce how thermal low pressure over the Indian subcontinent.',
          misconception: 'Students often think climate change only means that summers become slightly hotter everywhere, failing to realize it.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Climate change refers to long-term shifts in temperature, precipitation patterns, and',
                  options: ['Climate change refers to long-term shifts in temperature, precipitation patterns, and', 'Challenges faced by Indian farmers refer to the severe economic, environmental, and', 'This topic explores the geographical requirements, regional distribution, and', 'Types of farming in India refer to the distinct methods and systems by'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think climate change only means that summers become slightly hotter everywhere, failing to realize it fundamentally disrupts.' }
          ],
            remediations: { 'climate-change-only-means-that': { steps: ['To correct this, take out a physical rainfall distribution map of India and compare historical monsoon patterns with.', 'Trace how a warmer Arabian Sea and Bay of Bengal inject more moisture into the atmosphere, leading to intense,.'] } } },
        { type: 'subpart', nodeId: 'c7_geo_ch04_004', difficulty: 'standard',
          question: 'This topic explores the geographical requirements, regional distribution, and.',
          hint: 'Review c7_geo_ch04_003 to master the timing of Kharif and Rabi seasons before learning.',
          misconception: 'Students often believe that rice and wheat can be grown anywhere in India as long as farmers turn on irrigation pumps,.',
          parts: [
                { id: 'a', prompt: 'Which cropping season does rice belong to, and why does it require standing water during its early growth stage?', answer: 'Rice is a Kharif crop grown during the monsoon season',
                  options: ['Rice is a Kharif crop grown during the monsoon season', 'wheat can grow during the humid monsoon months simply'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that rice and wheat can be grown anywhere in India as long as farmers turn on irrigation pumps, ignoring the strict.' },
                { id: 'b', prompt: 'If a state has alluvial soil, an average annual rainfall above 100 cm, and high summer temperatures, which major crop is most suitable for cultivation without.', answer: 'Rice is the most suitable crop',
                  options: ['Rice is the most suitable crop', 'wheat can grow during the humid monsoon months simply'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that rice and wheat can be grown anywhere in India as long as farmers turn on irrigation pumps, ignoring the strict.' }
          ],
            remediations: { 'rice-and-wheat-can-be': { steps: ['Review temperature and seasonal charts from Class 6 climate studies.', 'Use a comparative map overlay showing northern winter temperatures versus monsoon rainfall zones to demonstrate why.', 'Emphasize that water is only one part of the equation; temperature and soil type are equally vital.'] } } },
        { type: 'subpart', nodeId: 'c7_geo_ch04_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that rice and wheat can be grown anywhere in India as long as farmers turn on irrigation pumps,.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether it is sustainable to grow water-intensive crops like rice and sugarcane in semi-arid regions of Punjab and interior Maharashtra using deep.', answer: 'It is unsustainable in the long term',
                  options: ['It is unsustainable in the long term', 'wheat can grow during the humid monsoon months simply'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that rice and wheat can be grown anywhere in India as long as farmers turn on irrigation pumps, ignoring the strict.' }
          ],
            remediations: { 'rice-and-wheat-can-be': { steps: ['Review temperature and seasonal charts from Class 6 climate studies.', 'Use a comparative map overlay showing northern winter temperatures versus monsoon rainfall zones to demonstrate why.', 'Emphasize that water is only one part of the equation; temperature and soil type are equally vital.'] } } },
        { type: 'subpart', nodeId: 'c7_geo_ch04_002', difficulty: 'standard',
          question: 'Types of farming in India refer to the distinct methods and systems by which.',
          hint: 'Review c6_geography_ch03_018 (Climate and Agriculture) and c6_geography_ch04_021 (Types.',
          misconception: 'Students often believe that "modern farming" simply means using any machine, and that "traditional farming" is entirely.',
          parts: [
                { id: 'a', prompt: 'Which of the following is a primary characteristic of traditional farming in India?', answer: 'Dependence on natural rainfall and family labour',
                  options: ['Dependence on natural rainfall and family labour', 'modern farming', 'traditional farming'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "modern farming" simply means using any machine, and that "traditional farming" is entirely useless and.' },
                { id: 'b', prompt: 'Why do farmers in arid regions like western Rajasthan face greater challenges in adopting modern irrigation-based farming compared to farmers in the Northern.', answer: 'The correct answer is B',
                  options: ['The correct answer is B', 'modern farming', 'traditional farming'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "modern farming" simply means using any machine, and that "traditional farming" is entirely useless and.' },
                { id: 'c', prompt: 'A small landholder in a peninsular plateau region with a 2-hectare farm wants to maximize output.', answer: 'The correct answer is B',
                  options: ['The correct answer is B', 'modern farming', 'traditional farming'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "modern farming" simply means using any machine, and that "traditional farming" is entirely useless and.' }
          ],
            remediations: { 'modern-farming-simply-means-using': { steps: ['To correct this, guide the student to examine two specific case studies: a traditional farmer using mixed cropping in.', 'Have them list the inputs, energy sources, and water usage for both.', 'Emphasize that traditional methods are adapted to ecological limits, whereas modern methods maximize output but require.'] } } },
        { type: 'subpart', nodeId: 'c7_geo_ch04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "modern farming" simply means using any machine, and that "traditional farming" is entirely.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Modern farming techniques have completely eliminated India\'s dependence on the monsoon." Is this statement accurate, and why?', answer: 'The correct answer is B',
                  options: ['The correct answer is B', 'modern farming', 'traditional farming'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "modern farming" simply means using any machine, and that "traditional farming" is entirely useless and.' }
          ],
            remediations: { 'modern-farming-simply-means-using': { steps: ['To correct this, guide the student to examine two specific case studies: a traditional farmer using mixed cropping in.', 'Have them list the inputs, energy sources, and water usage for both.', 'Emphasize that traditional methods are adapted to ecological limits, whereas modern methods maximize output but require.'] } } },
        { type: 'subpart', nodeId: 'c7_geo_ch04_001', difficulty: 'standard',
          question: 'Agriculture in India is the cultivation of crops, raising of livestock, and.',
          hint: 'Review the monsoon precipitation patterns and river basin fertility maps from Class 6.',
          misconception: 'Students often think that Indian agriculture is uniform across the entire country, assuming that every region grows the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Agriculture in India is the cultivation of crops, raising of livestock, and management of',
                  options: ['Agriculture in India is the cultivation of crops, raising of livestock, and management of', 'Challenges faced by Indian farmers refer to the severe economic, environmental, and', 'Climate change refers to long-term shifts in temperature, precipitation patterns, and', 'This topic explores the geographical requirements, regional distribution, and'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that Indian agriculture is uniform across the entire country, assuming that every region grows the same crops using.' }
          ],
            remediations: { 'indian-agriculture-is-uniform-across': { steps: ['To fix this, guide the student to examine an atlas map comparing physical landforms, rainfall zones, and agricultural.', 'Point out how the Thar Desert\'s arid climate restricts farming compared to the water-rich Northern Plains, proving that.'] } } },
        { type: 'subpart', nodeId: 'c7_geo_ch04_011', difficulty: 'standard',
          question: 'Sustainable farming integrates traditional ecological knowledge with.',
          hint: 'Review c7_geo_ch04_007 for traditional practices and c7_geo_ch04_008 for modern.',
          misconception: 'Students often think that "sustainable farming" simply means going back entirely to ancient farming methods and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sustainable farming integrates traditional ecological knowledge with contemporary',
                  options: ['Sustainable farming integrates traditional ecological knowledge with contemporary', 'Challenges faced by Indian farmers refer to the severe economic, environmental, and', 'Climate change refers to long-term shifts in temperature, precipitation patterns, and', 'This topic explores the geographical requirements, regional distribution, and'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "sustainable farming" simply means going back entirely to ancient farming methods and rejecting all modern.' }
          ],
            remediations: { 'sustainable-farming-simply-means-going': { steps: ['To fix this, guide the student to examine a case study of an Indian farmer who uses a tractor (contemporary machine) to.', 'Explain that sustainability is about balance and resource conservation, not rejecting progress; modern tools can help.'] } } },
        { type: 'subpart', nodeId: 'c7_geo_ch04_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that "sustainable farming" simply means going back entirely to ancient farming methods and.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Traditional farming methods are outdated and should be completely replaced by modern technology to achieve maximum agricultural.', answer: 'The statement is not sound',
                  options: ['The statement is not sound', 'sustainable farming'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "sustainable farming" simply means going back entirely to ancient farming methods and rejecting all modern.' }
          ],
            remediations: { 'sustainable-farming-simply-means-going': { steps: ['To fix this, guide the student to examine a case study of an Indian farmer who uses a tractor (contemporary machine) to.', 'Explain that sustainability is about balance and resource conservation, not rejecting progress; modern tools can help.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
