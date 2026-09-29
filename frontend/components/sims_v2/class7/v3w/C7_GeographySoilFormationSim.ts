import type { SimDef } from '../../engine/types';
import C7_GeographySoilFormationSim from '../../../simulations/c6_12/C7_GeographySoilFormationSim';

/** v3 wrapped master — C7_GeographySoilFormationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_geographysoilformationsim: SimDef = {
    id: 'v3w_c7_geographysoilformationsim',
    title: 'Agriculture in India: Importance and Characteristics',
    subtitle: 'Covers the fundamental importance and general physical/human characteristics of farming.',
    classLevel: 7, subject: 'geography', topic: 'Agriculture in India: Importance and Characteristics',
    chapters: [],
    nodeIds: ['c7_geo_ch04_001', 'c7_geo_ch04_005', 'c7_geo_ch01_003', 'c7_geo_ch01_005', 'c7_geo_ch04_003', 'c7_geo_ch04_004', 'c7_geo_ch04_006', 'c7_geo_ch04_007', 'c7_geo_ch04_009', 'c7_geo_ch04_011', 'c7_geo_ch01_004', 'c7_geo_ch01_006', 'c7_geo_ch01_007', 'c7_geo_ch01_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Look out of your classroom window or recall a journey through your state; you likely see green fields,.', goal: 'Master Agriculture in India: Importance and Characteristics.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Agriculture in India is the cultivation of.', text: 'Agriculture in India is the cultivation of crops, raising of livestock, and management of natural resources that forms the primary economic backbone of the country, deeply influenced by monsoonal.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_geo_ch04_001', title: 'Agriculture in India is the cultivation.',
          scaffold: { problem: 'A farming community in central India experiences a delayed monsoon.',
            steps: [
            { text: 'Identify the primary climate factor affecting the region (monsoon rainfall arrival).' },
            { text: 'Determine the agricultural impact of a 3-week delay (soil dries out, seeds cannot germinate without moisture).' },
            { text: 'Analyze available alternatives (activate tube-well irrigation if groundwater exists, or switch to shorter-duration.' },
            { text: 'Evaluate the human response (coordinating with local farming cooperatives to manage shared water resources).' },
            { text: 'Conclude that Indian farming requires constant adaptation to climatic irregularities through water management and crop.', faded: true, blankAnswer: 'Farmers must utilize supplemental groundwater irrigation or.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_geo_ch04_005', title: 'Cash crops are agricultural products.',
          scaffold: { problem: 'A agricultural cooperative in Gujarat wants to evaluate whether a 50-hectare plot of land with black soil receiving 70 cm of annual.',
            steps: [
            { text: 'Identify the target crop (cotton) and its primary physical requirements (black soil, temperature of 21-30°C, and.' },
            { text: 'Examine the given plot characteristics: black soil, 70 cm of annual rainfall.' },
            { text: 'Compare plot characteristics with crop requirements: 70 cm rainfall falls within the ideal 50-100 cm range; black soil.' },
            { text: 'Check potential limiting factors: ensure the region has frost-free days and adequate sunshine during the harvesting.' },
            { text: 'Conclude that the plot is highly suitable for commercial cotton farming.', faded: true, blankAnswer: 'The plot is fully suitable because black soil and 70 cm of.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_geo_ch01_003', title: 'The physical divisions of India refer.',
          scaffold: { problem: 'A geography student in Pune wishes to classify the local landform and determine whether it belongs to the Northern Plains or the Peninsular.',
            steps: [
            { text: 'Identify the geographical location (Pune, Maharashtra, in western peninsular India).' },
            { text: 'Examine the underlying rock structure and elevation (basaltic lava flows, elevated tableland well above sea level, far.' },
            { text: 'Compare characteristics against physical division definitions (Northern Plains are low-lying alluvial river basins;.' },
            { text: 'Conclude that the terrain is part of the Peninsular Plateau (specifically the Deccan Trap region).' },
            { text: 'Verify the classification by checking its position relative to the Vindhya and Satpura ranges and the absence of.', faded: true, blankAnswer: 'Pune is located in the Peninsular Plateau region,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_geo_ch01_005', title: 'The Northern Plains of India are a.',
          scaffold: { problem: 'A farmer in Uttar Pradesh notices that every monsoon season, the river nearby overflows and deposits a fresh, thin layer of fertile silt.',
            steps: [
            { text: 'Identify the geographical location as part of the Ganga plain section of the Northern Plains.' },
            { text: 'Recognize the difference between active floodplains (khadar) which are regularly flooded and replenished with new silt,.' },
            { text: 'Apply the process of river meandering and seasonal flooding during the monsoon to silt deposition.' },
            { text: 'Analyze how annual flooding physically renews soil nutrients in khadar lands, reducing the need for chemical.' },
            { text: 'Conclude that river dynamics directly create two distinct types of agricultural soil within the same plain.', faded: true, blankAnswer: 'Khadar soil is renewed annually by fresh river silt during.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_geo_ch04_003', title: 'Rabi and Kharif are the two primary.',
          scaffold: { problem: 'A farmer in Uttar Pradesh harvests his paddy (rice) crop in October.',
            steps: [
            { text: 'Identify the harvested crop as paddy (rice), which requires high water and warmth.' },
            { text: 'Note the harvest month of October, which marks the end of the southwest monsoon season.' },
            { text: 'Determine the sowing period by counting backward by 3 to 4 months, landing in June-July.' },
            { text: 'Associate this June-October window with the southwest monsoon rains.' },
            { text: 'Conclude that this is a Kharif crop supported by monsoon precipitation.', faded: true, blankAnswer: 'Kharif season; sown in June-July; supported by the.' }
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
        { type: 'dissect', nodeId: 'c7_geo_ch04_005', title: 'Identify each idea',
          dissect: { specimen: 'Agriculture in India: Importance and Characteristics', spots: [
            { id: 's1', label: 'Agriculture in India is the', prompt: 'Which idea is this? — Agriculture in India is the cultivation of crops, raising of livestock, and management of.', answer: 'Agriculture in India is the', options: ['Agriculture in India is the', 'Cash crops are agricultural products', 'The physical divisions of India', 'The Northern Plains of India'] },
            { id: 's2', label: 'Cash crops are agricultural products', prompt: 'Which idea is this? — Cash crops are agricultural products grown specifically for commercial sale in domestic.', answer: 'Cash crops are agricultural products', options: ['Cash crops are agricultural products', 'Agriculture in India is the', 'The physical divisions of India', 'The Northern Plains of India'] },
            { id: 's3', label: 'The physical divisions of India', prompt: 'Which idea is this? — The physical divisions of India refer to the broad structural landform units—namely the.', answer: 'The physical divisions of India', options: ['The physical divisions of India', 'Agriculture in India is the', 'Cash crops are agricultural products', 'The Northern Plains of India'] },
            { id: 's4', label: 'The Northern Plains of India', prompt: 'Which idea is this? — The Northern Plains of India are a vast, flat, and extremely fertile alluvial tract.', answer: 'The Northern Plains of India', options: ['The Northern Plains of India', 'Agriculture in India is the', 'Cash crops are agricultural products', 'The physical divisions of India'] },
            { id: 's5', label: 'Rabi and Kharif are the', prompt: 'Which idea is this? — Rabi and Kharif are the two primary cropping seasons in India, determined by the monsoon.', answer: 'Rabi and Kharif are the', options: ['Rabi and Kharif are the', 'Agriculture in India is the', 'Cash crops are agricultural products', 'The physical divisions of India'] },
            { id: 's6', label: 'This topic explores the geographical', prompt: 'Which idea is this? — This topic explores the geographical requirements, regional distribution, and.', answer: 'This topic explores the geographical', options: ['This topic explores the geographical', 'Agriculture in India is the', 'Cash crops are agricultural products', 'The physical divisions of India'] }
          ] } }
    ],
    explore: { component: C7_GeographySoilFormationSim, prompt: 'Explore the interactive — Agriculture in India: Importance and Characteristics' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_geo_ch04_001', difficulty: 'standard',
          question: 'Agriculture in India is the cultivation of crops, raising of livestock, and.',
          hint: 'Review the monsoon precipitation patterns and river basin fertility maps from Class 6.',
          misconception: 'Students often think that Indian agriculture is uniform across the entire country, assuming that every region grows the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Agriculture in India is the cultivation of crops, raising of livestock, and management of',
                  options: ['Agriculture in India is the cultivation of crops, raising of livestock, and management of', 'Cash crops are agricultural products grown specifically for commercial sale in domestic', 'The physical divisions of India refer to the broad structural landform units—namely the', 'The Northern Plains of India are a vast, flat, and extremely fertile alluvial tract'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that Indian agriculture is uniform across the entire country, assuming that every region grows the same crops using.' }
          ],
            remediations: { 'indian-agriculture-is-uniform-across': { steps: ['To fix this, guide the student to examine an atlas map comparing physical landforms, rainfall zones, and agricultural.', 'Point out how the Thar Desert\'s arid climate restricts farming compared to the water-rich Northern Plains, proving that.'] } } },
        { type: 'subpart', nodeId: 'c7_geo_ch04_005', difficulty: 'standard',
          question: 'Cash crops are agricultural products grown specifically for commercial sale in.',
          hint: 'Review the physical divisions of India and monsoon rainfall distribution maps from Class.',
          misconception: 'Students often confuse the geographical requirements of cotton and jute, mistakenly believing both are fiber crops.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Cash crops are agricultural products grown specifically for commercial sale in domestic',
                  options: ['Cash crops are agricultural products grown specifically for commercial sale in domestic', 'Agriculture in India is the cultivation of crops, raising of livestock, and management of', 'The physical divisions of India refer to the broad structural landform units—namely the', 'The Northern Plains of India are a vast, flat, and extremely fertile alluvial tract'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the geographical requirements of cotton and jute, mistakenly believing both are fiber crops grown in the same wet,.' }
          ],
            remediations: { 'students-often-confuse-the-geographical': { steps: ['Look at a physical map of India and locate the dry Deccan Plateau (Maharashtra, Gujarat) for cotton and the wet.', 'Write down the rainfall numbers for each (Cotton: 50-100 cm; Jute: 150-250 cm).', 'Explain that cotton bolls need dry sunshine to open properly, while jute stalks need water to rot and yield soft fibers.'] } } },
        { type: 'subpart', nodeId: 'c7_geo_ch01_003', difficulty: 'standard',
          question: 'The physical divisions of India refer to the broad structural landform.',
          hint: 'Review the physical map of India in the atlas, focusing on the color-coded elevation.',
          misconception: 'Students often think that all flat land in India belongs to the Northern Plains, failing to distinguish between the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The physical divisions of India refer to the broad structural landform units—namely the',
                  options: ['The physical divisions of India refer to the broad structural landform units—namely the', 'Agriculture in India is the cultivation of crops, raising of livestock, and management of', 'Cash crops are agricultural products grown specifically for commercial sale in domestic', 'The Northern Plains of India are a vast, flat, and extremely fertile alluvial tract'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that all flat land in India belongs to the Northern Plains, failing to distinguish between the alluvial Northern.' }
          ],
            remediations: { 'all-flat-land-in-india': { steps: ['To correct this misconception, guide the student to examine cross-sectional relief diagrams and contour maps of India.', 'Have them check two things: elevation above sea level (plateaus are elevated tablelands, plains are low-lying river.', 'Use a side-profile drawing to show that high-altitude flat areas are plateaus, while low-altitude flat areas near river.'] } } },
        { type: 'subpart', nodeId: 'c7_geo_ch01_005', difficulty: 'standard',
          question: 'The Northern Plains of India are a vast, flat, and extremely fertile alluvial.',
          hint: 'Review node c7_geo_ch01_004 to understand how Himalayan river systems originate and flow.',
          misconception: 'Students often believe that the Northern Plains were formed in a single massive flood event in ancient times rather.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Northern Plains of India are a vast, flat, and extremely fertile alluvial tract',
                  options: ['The Northern Plains of India are a vast, flat, and extremely fertile alluvial tract', 'Agriculture in India is the cultivation of crops, raising of livestock, and management of', 'Cash crops are agricultural products grown specifically for commercial sale in domestic', 'The physical divisions of India refer to the broad structural landform units—namely the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the Northern Plains were formed in a single massive flood event in ancient times rather than through millions.' }
          ],
            remediations: { 'the-northern-plains-were-formed': { steps: ['To correct this, have the student trace the journey of a river from an ice glacier in the Himalayas down to the sea.', 'Point out how sediment is deposited gradually in stages (bhabar, terai, bhangar, khadar) rather than all at once.', 'Compare pictures of the dry, sandy western plains of Punjab with the lush, wet deltaic plains of West Bengal to show.'] } } },
        { type: 'subpart', nodeId: 'c7_geo_ch04_003', difficulty: 'standard',
          question: 'Rabi and Kharif are the two primary cropping seasons in India, determined by.',
          hint: 'Review the monsoon and seasonal climate patterns from Class 6 Geography before attempting.',
          misconception: 'Students often think that crops are grown randomly whenever farmers feel like planting them, or they confuse the sowing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rabi and Kharif are the two primary cropping seasons in India, determined by the monsoon',
                  options: ['Rabi and Kharif are the two primary cropping seasons in India, determined by the monsoon', 'Agriculture in India is the cultivation of crops, raising of livestock, and management of', 'Cash crops are agricultural products grown specifically for commercial sale in domestic', 'The physical divisions of India refer to the broad structural landform units—namely the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that crops are grown randomly whenever farmers feel like planting them, or they confuse the sowing and harvesting.' }
          ],
            remediations: { 'crops-are-grown-randomly-whenever': { steps: ['Draw a simple timeline of the Indian calendar year divided into 12 months.', 'Shade June to October as the \'Rain/Monsoon\' block and write \'Kharif\' over it with a drawing of a rice plant.', 'Shade November to March as the \'Cool/Dry\' block and write \'Rabi\' over it with a drawing of a wheat stalk.', 'Explain that nature dictates the calendar because plants need specific weather to sprout and grow.'] } } },
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
            remediations: { 'rice-and-wheat-can-be': { steps: ['Review temperature and seasonal charts from Class 6 climate studies.', 'Use a comparative map overlay showing northern winter temperatures versus monsoon rainfall zones to demonstrate why.', 'Emphasize that water is only one part of the equation; temperature and soil type are equally vital.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
