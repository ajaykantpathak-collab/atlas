import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch18_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch18_p1: SimDef = {
    id: 'v3_c11_geo_ch18_p1',
    title: 'Land Resources and Agriculture · Part 1/2',
    subtitle: 'Tell resting land from abandoned land — and read nine categories of use as one ledger.',
    classLevel: 11, subject: 'geography', topic: 'Land Resources and Agriculture · Part 1/2',
    chapters: ['c11_geo_ch18'],
    nodeIds: ['c11_geo_cbse_18_001', 'c11_geo_cbse_18_002', 'c11_geo_cbse_18_003', 'c11_geo_cbse_18_004', 'c11_geo_cbse_18_005', 'c11_geo_cbse_18_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a land-use auditor reading a district\'s fields', intro: 'Your district\'s scrub became a housing colony in ten years — the nine-fold classification is how India keeps score of that swap.', goal: 'Distinguish land-use categories and evaluate the limits of expanding cultivation.' },
    discovery: {
        question: 'A brown, empty field after harvest looks like wasted land. Should every fallow be ploughed immediately?',
        options: ['No — current fallow is deliberate moisture-saving for the next crop; forcing it into use degrades rainfed soils', 'Yes — idle land produces nothing', 'Yes — food demand leaves no room for rest', 'No — because fallow land is legally forest'],
        answer: 'No — current fallow is deliberate moisture-saving for the next crop; forcing it into use degrades rainfed soils',
        hook: 'Fallow isn\'t the same as culturable waste either — one year of rest versus five-plus years abandoned are two different categories with different stories.',
    },
    teaching: [
        { title: 'Land Resources: Utilisation Pattern in India (Net Sown Area, Fallow)', text: 'Land utilisation pattern in India refers to the classification of the total geographical area into nine distinct categories based on current human use and cover, with Net Sown Area (NSA) representing.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_18_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compute cropping intensity and irrigated share for a state, then test whether 25 million hectares of \'fallow\' is really a food-security reserve.',
        labels: ['Land Resources: Utilisation Pattern', 'Land Use Categories', 'Agriculture: Importance in Indian', 'Cropping Patterns: Kharif, Rabi', 'Major Crops: Rice, Wheat', 'Major Crops: Sugarcane, Cotton,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_18_001', title: 'Land Resources: Utilisation Pattern in India (Net Sown Area, Fallow)',
          scaffold: { problem: 'Maharashtra\'s Marathwada region has NSA = 7.2 Mha, GCA = 8.6 Mha, Net Irrigated Area = 1.8 Mha.',
            steps: [
            { text: 'Identify given values - NSA=7.2 Mha, GCA=8.6 Mha, NIA=1.8 Mha' },
            { text: 'Calculate CI = (GCA/NSA)×100 = (8.6/7.2)×100 = 119.4%' },
            { text: 'Calculate % NSA irrigated = (NIA/NSA)×100 = (1.8/7.2)×100 = 25%' },
            { text: 'Analyse cotton\'s role - cotton occupies field for 180-200 days (Kharif + early Rabi), preventing Rabi sowing on that.' },
            { text: 'Synthesise - Low irrigation (25%) + long-duration Kharif crop (cotton) + high rainfall variability = farmers cannot.', faded: true, blankAnswer: 'CI = 119.4%; % NSA irrigated = 25%. Low CI driven by 25%.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_18_002', title: 'Land Use Categories in India and Their Changes',
          scaffold: { problem: 'In State X (Geographical Area: 300,000 km²), the 2010-11 Land Use Statistics show: Forests 60,000 km², Barren 25,000 km², Non-Ag Uses.',
            steps: [
            { text: 'Verify 2010-11 totals sum to 300,000 km² (60+25+20+10+5+30+15+10+125 = 300). Confirm baseline.' },
            { text: 'Apply each change to the 2010-11 figures, ensuring zero-sum (total remains 300,000): NSA: +8,000 (from CW) +5,000 (from.' },
            { text: 'Verify new sum: 60+25+25+8+5+22+10+10+135 = 300. Balanced.' },
            { text: 'Calculate 2020-21 % shares: NSA = (135/300)×100 = 45.0%; CW = (22/300)×100 = 7.33%; Non-Ag = 8.33%; Forests = 20.0%.' },
            { text: 'Calculate 2010-11 % shares for comparison: NSA = (125/300)×100 = 41.67%; CW = (30/300)×100 = 10.0%.' },
            { text: 'Percentage point change: NSA = +3.33 pp; CW = -2.67 pp. Interpret: NSA expanded but 30% of its gross gain.', faded: true, blankAnswer: '2020-21 Shares: Forests 20.0%, Barren 8.33%, Non-Ag Uses.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_18_003', title: 'Agriculture: Importance in Indian Economy and Employment',
          scaffold: { problem: 'In 2011-12, agriculture GVA was ₹15.0 lakh crore (constant prices) with 263 million workers.',
            steps: [
            { text: 'Calculate 2011-12 agri productivity = 15.0 / 263 = 0.0570 ₹ lakh crore per million workers' },
            { text: 'Calculate 2011-12 non-agri productivity = 52.4 / 168 = 0.3119 ₹ lakh crore per million workers' },
            { text: '2011-12 ratio = 0.0570 / 0.3119 = 0.1827' },
            { text: 'Calculate 2022-23 agri productivity = 22.3 / 238 = 0.0937 ₹ lakh crore per million workers' },
            { text: 'Calculate 2022-23 non-agri productivity = 99.1 / 315 = 0.3146 ₹ lakh crore per million workers' },
            { text: '2022-23 ratio = 0.0937 / 0.3146 = 0.2978' },
            { text: 'Change = 0.2978 - 0.1827 = +0.1151 (ratio improved by 63%)', faded: true, blankAnswer: 'The agricultural labour productivity ratio improved from.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_18_004', title: 'Cropping Patterns: Kharif, Rabi and Zaid Crops',
          scaffold: { problem: 'A district in eastern Uttar Pradesh has net sown area 150,000 ha.',
            steps: [
            { text: 'Identify Gross Cropped Area = sum of seasonal areas = 140,000 + 130,000 + 20,000 = 290,000 ha.' },
            { text: 'Apply formula: Cropping Intensity = (290,000 / 150,000) × 100 = 193.3%.' },
            { text: 'Assess water balance: Kharif rice needs ~1200 mm (rain 800 mm + irrigation 400 mm).' },
            { text: 'Rabi wheat needs ~350 mm (mostly irrigation). Canal can cover 60,000 ha → wheat area 130,000 ha implies 70,000 ha use.' },
            { text: 'Conclusion: Intensity high but relies on groundwater mining; not sustainable without recharge management.', faded: true, blankAnswer: 'Cropping intensity = 193%. Interpretation: High intensity.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_18_005', title: 'Major Crops: Rice, Wheat and Pulses (Distribution and Conditions)',
          caseStudy: { intro: 'Begin by showing students a plate of typical Indian meals: rice-dominated (South/East), wheat-dominated (North/West), and dal (pulses) common everywhere.',
            decisions: [{ prompt: 'Name the three major geographical conditions required for rice cultivation in India and state the primary season in which it is grown.', options: [
                { text: 'Rice requires: (1) High mean monthly temperature of ~24°C with no frost, (2) Annual', outcome: 'Rice requires: (1) High mean monthly temperature of ~24°C with no frost, (2) Annual rainfall.' },
                { text: 'rice needs 200 cm rain', outcome: 'Not quite — Students believe rice grows *only* in high-rainfall areas (e.g., "rice needs 200 cm rain") and.', reveals: 'rice-grows-only-in-high' },
                { text: 'wheat-like cool temperatures or rabi season', outcome: 'Not quite — Students believe rice grows *only* in high-rainfall areas (e.g., "rice needs 200 cm rain") and.', reveals: 'rice-grows-only-in-high' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_18_006', title: 'Major Crops: Sugarcane, Cotton, Jute and Oilseeds',
          caseStudy: { intro: 'Observe a sugar mill in Uttar Pradesh, a cotton ginning factory in Gujarat, a jute mill in West Bengal, and an oilseed expeller in Madhya Pradesh — all.',
            decisions: [{ prompt: 'Name the four major geographical factors that determine the cultivation of sugarcane, cotton, jute, and oilseeds in India, and state the.', options: [
                { text: 'The four factors are temperature, rainfall, soil type, and season (Kharif/Rabi)', outcome: 'The four factors are temperature, rainfall, soil type, and season (Kharif/Rabi).' },
                { text: 'market demand', outcome: 'Not quite — Students believe cotton grows well in the alluvial soils of the Indo-Gangetic plain because it is.', reveals: 'cotton-grows-well-in-the' },
                { text: 'government policy', outcome: 'Not quite — Students believe cotton grows well in the alluvial soils of the Indo-Gangetic plain because it is.', reveals: 'cotton-grows-well-in-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_18_001', title: 'Use it in the wild',
          caseStudy: { intro: 'On a village development project, a volunteer proposes: \'That uncultivated field is wasted land — get it ploughed this season.\' A teammate\'s report also lumps \'fallow\' and \'culturable waste\' together as \'unused farmland.\'',
            decisions: [{ prompt: 'What do the land-use categories actually mean?', options: [
                { text: 'Distinguish them: current fallow is a deliberate rest — one agricultural year uncultivated to conserve moisture, standard practice in rainfed farming. Culturable waste is land idle 5+ years due to constraints like salinity or waterlogging. Forcing all fallow into continuous cropping without irrigation caused yield collapse in Vidarbha and Bundelkhand within years.', outcome: 'The project pivots: fallow is management, not waste — and falling culturable waste can mean healthy reclamation or harmful diversion, depending on where the land went.' },
                { text: 'Back the ploughing plan — idle farmland is wasted potential in a hungry country.', outcome: 'Fallow is how rainfed soil recovers moisture and organic matter; removing it without assured irrigation degrades the very soil you\'re trying to use.', reveals: 'fallow-is-wasted-land' },
                { text: 'Keep the merged category — fallow and culturable waste are both just unused fields.', outcome: 'The statistics distinguish them for a reason: one year of rest is strategy; five-plus idle years signals constraint — the trends mean opposite things.', reveals: 'fallow-equals-culturable-waste' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_18_006', title: 'The bigger picture',
          caseStudy: { intro: 'Land is a zero-sum ledger — every hectare that becomes a colony or solar park was once fallow, grazing or sown.',
            decisions: [{ prompt: 'What comes next? Land Resources and Agriculture · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Land Resources and Agriculture · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_18_001', difficulty: 'standard',
          question: 'Land utilisation pattern in India refers to the classification of the total.',
          hint: 'If stuck on NSA vs GCA, revisit Class 6/7 cropping seasons (Kharif/Rabi) and draw.',
          misconception: 'Students believe "Fallow land is wasted land that should be brought under cultivation immediately." In reality, fallow.',
          parts: [
                { id: 'a', prompt: 'Using the data below for State X (2020-21), calculate Cropping Intensity and the percentage of Net Sown Area that is irrigated.', answer: 'Step 1: CI = (GCA/NSA) × 100 = (135/90) × 100 = 150%',
                  options: ['Step 1: CI = (GCA/NSA) × 100 = (135/90) × 100 = 150%', 'Fallow land is wasted land that should be brought under cultivation immediately', '"Fallow land is wasted land that should be brought under cultivation immediately'],
                  hint: 'If stuck on NSA vs GCA, revisit Class 6/7 cropping seasons (Kharif/Rabi) and draw a timeline.',
                  misconception: 'Students believe "Fallow land is wasted land that should be brought under cultivation immediately." In reality, fallow is a deliberate soil.' }
          ],
            remediations: { 'fallow-land-is-wasted-land': { steps: ['Show students the moisture conservation cycle - have them compare soil moisture in a fallow plot vs continuously.', 'Use district-level data (from DES Agriculture Statistics) to plot "Fallow % vs Rainfall variability (CV)" - they\'ll see.', 'Visit a nearby rainfed farm; ask the farmer why they keep land fallow in rabi - record their reasoning about "saving.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_18_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Fallow land is wasted land that should be brought under cultivation immediately." In reality, fallow.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "India\'s fallow land (current + other) at ~25 million hectares represents a massive reserve for agricultural expansion to meet future.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'Fallow land is wasted land that should be brought under cultivation immediately', '"Fallow land is wasted land that should be brought under cultivation immediately'],
                  hint: 'If stuck on NSA vs GCA, revisit Class 6/7 cropping seasons (Kharif/Rabi) and draw a timeline.',
                  misconception: 'Students believe "Fallow land is wasted land that should be brought under cultivation immediately." In reality, fallow is a deliberate soil.' }
          ],
            remediations: { 'fallow-land-is-wasted-land': { steps: ['Show students the moisture conservation cycle - have them compare soil moisture in a fallow plot vs continuously.', 'Use district-level data (from DES Agriculture Statistics) to plot "Fallow % vs Rainfall variability (CV)" - they\'ll see.', 'Visit a nearby rainfed farm; ask the farmer why they keep land fallow in rabi - record their reasoning about "saving.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_18_002', difficulty: 'standard',
          question: 'Land use categories in India refer to the systematic classification of the.',
          hint: 'Revisit c10_geo_cbse_01_009 (Land Use Pattern in India) and practice calculating.',
          misconception: 'Students believe "Fallow Land" and "Culturable Waste Land" are synonymous — both meaning "unused agricultural land.".',
          parts: [
                { id: 'a', prompt: 'Using the data below (hypothetical but realistic), calculate the percentage point change in Net Sown Area and Culturable Waste Land between 1990-91 and.', answer: 'Step 1: Calculate % for 1990-91: NSA = (143/328.73)×100 = 43.5%',
                  options: ['Step 1: Calculate % for 1990-91: NSA = (143/328.73)×100 = 43.5%', 'Fallow Land', 'Culturable Waste Land', 'unused agricultural land'],
                  hint: 'Revisit c10_geo_cbse_01_009 (Land Use Pattern in India) and practice calculating percentage shares.',
                  misconception: 'Students believe "Fallow Land" and "Culturable Waste Land" are synonymous — both meaning "unused agricultural land." In reality, *Current.' }
          ],
            remediations: { 'fallow-land-and-culturable-waste': { steps: ['Draw a two-column table on paper. Left column: "Current Fallow" — define as "1-year rest, farmer\'s choice, reversible.', 'Take the latest Land Use Statistics table (from NCERT Appendix or India Stat) and highlight the two rows in different.', 'For your state, find the decadal change: if Current Fallow ↓ and NSA ↑ → intensification; if Culturable Waste ↓ and.', 'Practice writing a 3-sentence explanation: "Current Fallow declined from X to Y ha, indicating reduced voluntary.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_18_003', difficulty: 'standard',
          question: 'Agriculture in the Indian economy refers to the primary sector activity.',
          hint: 'Revisit Class 10 Geography node c10_geo_cbse_04_010 "Contribution of Agriculture.',
          misconception: 'Students believe "agriculture\'s declining GVA share means it is becoming unimportant" — they confuse *relative share*.',
          parts: [
                { id: 'a', prompt: 'Explain why agriculture\'s share in GVA has declined from 35% (1990-91) to 18.3% (2022-23) while its employment share fell only from 61% to 43% over the same.', answer: 'GVA share declined faster',
                  options: ['GVA share declined faster', 'population growth', 'land fragmentation', 'agriculture\'s declining GVA share means it is becoming unimportant'],
                  hint: 'Revisit Class 10 Geography node c10_geo_cbse_04_010 "Contribution of Agriculture to National.',
                  misconception: 'Students believe "agriculture\'s declining GVA share means it is becoming unimportant" — they confuse *relative share* with *absolute.' },
                { id: 'b', prompt: 'Using the data below, calculate the agricultural labour productivity ratio (agriculture GVA per worker / non-agriculture GVA per worker) for 2022-23 and.', answer: 'Step 1: Assume total GVA = 100 units, total workers = 100 for ratio calculation',
                  options: ['Step 1: Assume total GVA = 100 units, total workers = 100 for ratio calculation', 'agriculture\'s declining GVA share means it is becoming unimportant'],
                  hint: 'Revisit Class 10 Geography node c10_geo_cbse_04_010 "Contribution of Agriculture to National.',
                  misconception: 'Students believe "agriculture\'s declining GVA share means it is becoming unimportant" — they confuse *relative share* with *absolute.' }
          ],
            remediations: { 'agriculture-s-declining-gva-share': { steps: ['Plot absolute agriculture GVA (constant prices) 1990-2023 — observe upward trend despite falling share.', 'Cross-plot with poverty headcount ratio — note inverse correlation during high agri-growth periods (2004-11).', 'Read NITI Aayog\'s "Doubling Farmers\' Income" report (Ch. 2) on agriculture\'s poverty elasticity.', 'Rewrite the answer framing agriculture as "foundational" not "declining" — use the phrase "declining share, rising.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_18_004', difficulty: 'standard',
          question: 'Cropping pattern refers to the yearly sequence and spatial arrangement of crops.',
          hint: 'Review Class 9 Climate chapter (monsoon mechanism) and Class 10 Agriculture chapter.',
          misconception: 'Students think Kharif = "rainy season crops" and Rabi = "winter crops" as fixed calendar dates (e.g., Kharif always.',
          parts: [
                { id: 'a', prompt: 'A farmer in coastal Andhra Pradesh has irrigation. He wants to grow three crops/year.', answer: 'Kharif: Rice (June–Oct, high rain, 25–30°C)',
                  options: ['Kharif: Rice (June–Oct, high rain, 25–30°C)', 'rainy season crops', 'winter crops'],
                  hint: 'Review Class 9 Climate chapter (monsoon mechanism) and Class 10 Agriculture chapter (cropping.',
                  misconception: 'Students think Kharif = "rainy season crops" and Rabi = "winter crops" as fixed calendar dates (e.g., Kharif always June–October).' },
                { id: 'b', prompt: 'Compare the cropping intensity of Punjab (irrigated, 190%) with Rajasthan (rainfed, 110%).', answer: 'Punjab\'s assured irrigation makes Rabi wheat reliable every year',
                  options: ['Punjab\'s assured irrigation makes Rabi wheat reliable every year', 'rainfall amount', 'rainy season crops', 'winter crops'],
                  hint: 'Review Class 9 Climate chapter (monsoon mechanism) and Class 10 Agriculture chapter (cropping.',
                  misconception: 'Students think Kharif = "rainy season crops" and Rabi = "winter crops" as fixed calendar dates (e.g., Kharif always June–October).' }
          ],
            remediations: { 'kharif-rainy-season-crops-and': { steps: ['Show India Meteorological Department (IMD) monsoon onset map – note 30-day spread across India.', 'Use a table: Crop | Region | Season | Reason (temp/rain/photoperiod).', 'Calculate growing degree days (GDD) for wheat in Punjab vs. Madhya Pradesh to prove thermal window shifts.', 'Conclude: Season is a *climate window*, not a calendar date.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_18_005', difficulty: 'standard',
          question: 'Rice, wheat, and pulses are India\'s three most critical food grain crops, each.',
          hint: 'If stuck, revisit c11_geo_cbse_18_004 for seasonal definitions and c10_geo_cbse_04_004.',
          misconception: 'Students believe rice grows *only* in high-rainfall areas (e.g., "rice needs 200 cm rain") and cannot understand its.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rice, wheat, and pulses are India\'s three most critical food grain crops, each requiring',
                  options: ['Rice, wheat, and pulses are India\'s three most critical food grain crops, each requiring', 'Land utilisation pattern in India refers to the classification of the total geographical', 'Land use categories in India refer to the systematic classification of the country\'s', 'Agriculture in the Indian economy refers to the primary sector activity encompassing crop'],
                  hint: 'If stuck, revisit c11_geo_cbse_18_004 for seasonal definitions and c10_geo_cbse_04_004 for crop.',
                  misconception: 'Students believe rice grows *only* in high-rainfall areas (e.g., "rice needs 200 cm rain") and cannot understand its expansion into Punjab.' }
          ],
            remediations: { 'rice-grows-only-in-high': { steps: ['Give students a table with two columns: "Physical Requirement" and "Human Substitution".', 'Use India rainfall map (Class 9) and irrigation map (Class 10) side-by-side.', 'Calculate the "irrigation intensity" (irrigated area/net sown area) for top rice and wheat states from Agricultural.', 'Discuss the groundwater consequence: Punjab rice uses 3-4 times more water per kg than traditional eastern rice.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_18_006', difficulty: 'standard',
          question: 'Sugarcane, cotton, jute, and oilseeds are major commercial crops of India with.',
          hint: 'Revisit c11_geo_cbse_18_004 (cropping seasons) and c10_geo_cbse_01_007 (soil types).',
          misconception: 'Students believe cotton grows well in the alluvial soils of the Indo-Gangetic plain because it is a "major crop.',
          parts: [
                { id: 'a', prompt: 'Name the four major geographical factors that determine the cultivation of sugarcane, cotton, jute, and oilseeds in India, and state the ideal temperature.', answer: 'The four factors are temperature, rainfall, soil type, and season (Kharif/Rabi)',
                  options: ['The four factors are temperature, rainfall, soil type, and season (Kharif/Rabi)', 'market demand', 'government policy', 'major crop of India'],
                  hint: 'Revisit c11_geo_cbse_18_004 (cropping seasons) and c10_geo_cbse_01_007 (soil types) — draw a table.',
                  misconception: 'Students believe cotton grows well in the alluvial soils of the Indo-Gangetic plain because it is a "major crop of India" and they see.' },
                { id: 'b', prompt: 'A farmer in western Uttar Pradesh (29°N, 77°E) wants to switch from sugarcane to oilseeds.', answer: 'Step 1: Identify season',
                  options: ['Step 1: Identify season', 'major crop of India'],
                  hint: 'Revisit c11_geo_cbse_18_004 (cropping seasons) and c10_geo_cbse_01_007 (soil types) — draw a table.',
                  misconception: 'Students believe cotton grows well in the alluvial soils of the Indo-Gangetic plain because it is a "major crop of India" and they see.' },
                { id: 'c', prompt: 'Compare the impact of irrigation on the geographical spread of sugarcane versus cotton in India.', answer: 'Sugarcane is water-intensive (150-200 cm water need)',
                  options: ['Sugarcane is water-intensive (150-200 cm water need)', 'water availability', 'major crop of India'],
                  hint: 'Revisit c11_geo_cbse_18_004 (cropping seasons) and c10_geo_cbse_01_007 (soil types) — draw a table.',
                  misconception: 'Students believe cotton grows well in the alluvial soils of the Indo-Gangetic plain because it is a "major crop of India" and they see.' }
          ],
            remediations: { 'cotton-grows-well-in-the': { steps: ['On an outline map, shade the Deccan trap (black soil) and the Ganga-Brahmaputra delta (alluvial).', 'Overlay cotton and jute distribution maps from the textbook.', 'Compare soil maps (c10_geo_cbse_01_007) with crop maps — note the tight correlation.', 'Read the case study of cotton in Punjab (yield high but sustainability issues) vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
