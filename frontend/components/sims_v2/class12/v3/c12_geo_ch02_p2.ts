import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch02_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch02_p2: SimDef = {
    id: 'v3_c12_geo_ch02_p2',
    title: 'The World Population · Part 2/2',
    subtitle: '90% of us live on 10% of the land — and the rest is dark',
    classLevel: 12, subject: 'geography', topic: 'The World Population · Part 2/2',
    chapters: ['c12_geo_ch02'],
    nodeIds: ['c12_geo_cbse_02_007', 'c12_geo_cbse_02_008', 'c12_geo_cbse_02_009', 'c12_geo_cbse_02_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Population geographer', intro: 'A satellite photo of Earth at night is the whole chapter: the light is where the rivers, plains and ports made living possible.', goal: 'Explain world population distribution, its three clusters and the factors separating ecumene from non-ecumene.' },
    discovery: {
        question: 'Ninety per cent of humanity lives on ten per cent of the land — yet Asia alone holds \'many places where people are few.\' Why does the emptiest continent also hold the fullest plains?',
        options: ['Habitability, not size, decides — ecumene plains fed by perennial rivers pack people in while tundra, desert and high plateau stay non-ecumene', 'Asia is just bigger', 'Statistics are wrong', 'People prefer crowds'],
        answer: 'Habitability, not size, decides — ecumene plains fed by perennial rivers pack people in while tundra, desert and high plateau stay non-ecumene',
        hook: 'Distribution ≠ density: the 90/10 figure is a pattern of where people are, not persons per square kilometre — and high density doesn\'t mean high total population (Singapore vs India). Six of the ten most populous countries are Asian, carrying ~60% of the world between them.',
    },
    teaching: [
        { title: 'Population Composition: Sex Ratio and Age Structure', text: 'Population composition refers to the structural characteristics of a population, specifically **sex ratio** (number of females per 1,000 males in the Indian context) and **age structure**.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read Earth by night-light: locate the three great population clusters, weigh physical enablement against economic magnetism, and test whether minerals now outrank rivers in drawing the crowds.',
        labels: ['Population Composition: Sex Ratio', 'Population Composition: Rural-Urban', 'Population Composition: Occupational Structure', 'Population Policy and Sustainable'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_02_007', title: 'Population Composition: Sex Ratio and Age Structure',
          scaffold: { problem: 'According to Census 2011, Kerala had 17,378,649 males and 18,282,492 females. Calculate Kerala\'s sex ratio.',
            steps: [
            { text: 'Write the Indian sex-ratio formula: Sex Ratio = (Females / Males) × 1,000.' },
            { text: 'Substitute Kerala\'s numbers: (18,282,492 / 17,378,649) × 1,000.' },
            { text: 'Perform division: 18,282,492 ÷ 17,378,649 = 1.0520 (approx).' },
            { text: 'Multiply by 1,000: 1.0520 × 1,000 = 1,052 females per 1,000 males.' },
            { text: 'Youth Dependency Ratio = (0-14 population / 15-59 population) × 100 = (5,500,000 / 22,000,000) × 100 = 0.25 × 100 = 25.' },
            { text: 'Interpret: Kerala\'s sex ratio > 1,000 indicates female majority; youth dependency ratio of 25 means 25 children per 100.', faded: true, blankAnswer: 'Sex Ratio = 1,052 females per 1,000 males; Youth Dependency.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_02_008', title: 'Population Composition: Rural-Urban and Literacy',
          scaffold: { problem: 'Using Census 2011 data, compare the rural-urban literacy gender gap for Rajasthan and Kerala.',
            steps: [
            { text: 'Recall GPI formula = Female Literacy Rate / Male Literacy Rate for each sector (rural/urban).' },
            { text: 'Compute Rajasthan Rural GPI = 45.8 / 76.2 = 0.601; Rajasthan Urban GPI = 70.7 / 87.9 = 0.804.' },
            { text: 'Compute Kerala Rural GPI = 91.5 / 95.8 = 0.955; Kerala Urban GPI = 94.2 / 96.8 = 0.973.' },
            { text: 'Compare: Rajasthan shows large rural-urban disparity in gender equity (0.60 vs 0.80) and overall low female literacy.' },
            { text: 'Interpret: Rajasthan\'s low rural GPI reflects patriarchal norms, early marriage, and poor girls\' school access.', faded: true, blankAnswer: 'Rajasthan Rural GPI=0.60, Urban GPI=0.80; Kerala Rural.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_02_009', title: 'Population Composition: Occupational Structure',
          scaffold: { problem: 'A district in Maharashtra has 2.4 lakh total workers. Census 2011 shows: Cultivators 72,000; Agricultural laborers 48,000; Household.',
            steps: [
            { text: 'Identify Census categories — Cultivators + Agricultural laborers = Primary (1,20,000).' },
            { text: 'Calculate percentages — Primary = (1,20,000/2,40,000)×100 = 50%. Secondary = (12,000/2,40,000)×100 = 5%.' },
            { text: 'Project SEZ impact — 15% of agricultural workers = 0.15 × 1,20,000 = 18,000 workers shift from Primary to Secondary.' },
            { text: 'New counts — Primary = 1,20,000 - 18,000 = 1,02,000. Secondary = 12,000 + 18,000 = 30,000.' },
            { text: 'New percentages — Primary = 42.5%. Secondary = 12.5%. Tertiary = 45%.', faded: true, blankAnswer: 'Current: Primary 50%, Secondary 5%, Tertiary 45%. Post-SEZ.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_02_010', title: 'Population Policy and Sustainable Development',
          caseStudy: { intro: 'Begin with a real-world observation: "Look at your own city — some wards have fertility rates below 1.5 while nearby slums show rates above 3.0.',
            decisions: [{ prompt: 'State the three core objectives of India\'s National Population Policy 2000 as per the Class 11 NCERT textbook.', options: [
                { text: 'The three core objectives are: (1) Address unmet needs for contraception, healthcare', outcome: 'The three core objectives are: (1) Address unmet needs for contraception, healthcare.' },
                { text: 'one-child norm', outcome: 'Not quite — Students often believe "population policy = family planning = reducing birth rates." They miss that.', reveals: 'population-policy-family-planning-reducing' },
                { text: 'sterilisation targets', outcome: 'Not quite — Students often believe "population policy = family planning = reducing birth rates." They miss that.', reveals: 'population-policy-family-planning-reducing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'An investment pitch for an agri-startup shows a region\'s crude density is only 90 persons per sq km and concludes \'land is plentiful — pressure on farmland is low.\' A glance at the map shows most of the region is desert and rocky upland.',
            decisions: [{ prompt: 'How do you check that claim before endorsing the pitch?', options: [
                { text: 'Compute physiological density — population divided by net cultivable area. Like Egypt, where crude density is low but nearly everyone crowds onto the Nile strip, the real pressure on farmland could be extreme once uncultivable land is removed from the denominator.', outcome: 'Crude density dilutes pressure by counting desert and mountain; physiological density is the honest measure of population-land stress, and the pitch\'s conclusion can flip completely.' },
                { text: 'Accept the pitch — 90 per sq km is objectively sparse, so farmland pressure must be low.', outcome: 'That\'s the crude-density trap the chapter warns about: total area includes land that can never grow a crop, so a \'sparse\' region can be one where every cultivable acre is overworked.', reveals: 'crude-density-tells-all' },
                { text: 'Use agricultural density instead — farmers per cultivable area tells you everything the pitch needs.', outcome: 'Agricultural density measures labour intensity, not population pressure on land; a region can have few farmers per hectare yet still carry a huge non-farming population that cultivable land must feed.', reveals: 'farm-density-measures-pressure' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_02_010', title: 'You made it',
          caseStudy: { intro: 'You can now separate where people are from how thickly they pack — and explain the Nile\'s ribbon versus the Ganga\'s sprawl. Population geography starts on this map.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_02_007', difficulty: 'standard',
          question: 'Population composition refers to the structural characteristics of.',
          hint: 'If stuck, review the CBR/CDR formulas and the Demographic Transition Model.',
          misconception: 'Students often believe **sex ratio is always expressed as females per 100 males** (the international demographic.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Population composition refers to the structural characteristics of a population,',
                  options: ['Population composition refers to the structural characteristics of a population,', 'World population distribution refers to the spatial arrangement of human populations', 'Population density is the ratio of human population to land area, expressed as persons', 'Geographical factors affecting population distribution refer to the natural environmental'],
                  hint: 'If stuck, review the CBR/CDR formulas and the Demographic Transition Model (c12_geo_cbse_02_006).',
                  misconception: 'Students often believe **sex ratio is always expressed as females per 100 males** (the international demographic convention) and apply.' }
          ],
            remediations: { 'sex-ratio-is-always-expressed': { steps: ['Revisit **c11_geo_cbse_16_003** (Population Composition: Age Structure, Sex Ratio and Literacy) — focus on the Indian.', 'Practice drawing **three population pyramids** from scratch: one expansive (Nigeria), one constrictive (Japan), one.', 'Use the **Census 2011 Primary Census Abstract** for your state: compute sex ratio for 5 districts, then compute youth.', 'Re-attempt Diagnostic Questions 3 and 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_02_008', difficulty: 'standard',
          question: 'Population composition by rural-urban residence classifies people based.',
          hint: 'If stuck on rural-urban classification, re-study c11_geo_cbse_16_004\'s "Census Town.',
          misconception: 'Students think "urbanization rate" and "urban growth rate" are the same.',
          parts: [
                { id: 'a', prompt: 'Define "urban area" as per the Census of India 2011. How does it differ from the UN definition used for global comparisons?', answer: 'Census of India 2011 defines urban area as: (a) all statutory towns with',
                  options: ['Census of India 2011 defines urban area as: (a) all statutory towns with', 'any place with >5,000 people is urban', 'urbanization rate', 'urban growth rate'],
                  hint: 'If stuck on rural-urban classification, re-study c11_geo_cbse_16_004\'s "Census Town vs Statutory.',
                  misconception: 'Students think "urbanization rate" and "urban growth rate" are the same.' },
                { id: 'b', prompt: 'Why does Kerala have a much narrower rural-urban literacy gap (rural 93%, urban 95%) compared to Bihar (rural 60%, urban 78%) despite both states having.', answer: 'Kerala\'s historical investment in universal primary education',
                  options: ['Kerala\'s historical investment in universal primary education', 'urbanization level', 'urbanization rate', 'urban growth rate'],
                  hint: 'If stuck on rural-urban classification, re-study c11_geo_cbse_16_004\'s "Census Town vs Statutory.',
                  misconception: 'Students think "urbanization rate" and "urban growth rate" are the same.' },
                { id: 'c', prompt: 'Compare the rural-urban literacy gender gap in two regions: Region A (Rural Male 80%, Rural Female 55%, Urban Male 90%, Urban Female 82%) and Region B (Rural.', answer: 'Region B shows stronger gender equity',
                  options: ['Region B shows stronger gender equity', 'urbanization rate', 'urban growth rate', 'more urbanized'],
                  hint: 'If stuck on rural-urban classification, re-study c11_geo_cbse_16_004\'s "Census Town vs Statutory.',
                  misconception: 'Students think "urbanization rate" and "urban growth rate" are the same.' }
          ],
            remediations: { 'urbanization-rate-and-urban-growth': { steps: ['Revisit c11_geo_cbse_16_004 (Rural-Urban Population in India) — re-read the definitions of "urbanization level".', 'Take Census 2011 data for 5 states — compute both urbanization rate and decadal urban growth rate; plot them on.', 'Practice calculating both from raw numbers until you can explain why a state with low urbanization can have high urban.', 'Re-attempt Diagnostic Question 3 with a new dataset to confirm you use correct denominators.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "urbanization rate" and "urban growth rate" are the same.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Rapid urbanization in developing countries automatically improves national literacy rates because cities have better schools." Use.', answer: 'The statement is false',
                  options: ['The statement is false', 'urbanization rate', 'urban growth rate', 'more urbanized'],
                  hint: 'If stuck on rural-urban classification, re-study c11_geo_cbse_16_004\'s "Census Town vs Statutory.',
                  misconception: 'Students think "urbanization rate" and "urban growth rate" are the same.' },
                { id: 'b', prompt: 'Design a choropleth map legend for showing "District-level Female Literacy Rate in India (Census 2011)" that effectively highlights both the national pattern.', answer: 'Legend design: 5 classes using natural breaks (Jenks) to reflect India\'s bimodal',
                  options: ['Legend design: 5 classes using natural breaks (Jenks) to reflect India\'s bimodal', 'urbanization rate', 'urban growth rate', 'more urbanized'],
                  hint: 'If stuck on rural-urban classification, re-study c11_geo_cbse_16_004\'s "Census Town vs Statutory.',
                  misconception: 'Students think "urbanization rate" and "urban growth rate" are the same.' }
          ],
            remediations: { 'urbanization-rate-and-urban-growth': { steps: ['Revisit c11_geo_cbse_16_004 (Rural-Urban Population in India) — re-read the definitions of "urbanization level".', 'Take Census 2011 data for 5 states — compute both urbanization rate and decadal urban growth rate; plot them on.', 'Practice calculating both from raw numbers until you can explain why a state with low urbanization can have high urban.', 'Re-attempt Diagnostic Question 3 with a new dataset to confirm you use correct denominators.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_02_009', difficulty: 'standard',
          question: 'Occupational structure refers to the distribution of the working population.',
          hint: 'If stuck on sectoral classification, revisit c11_geo_cbse_16_005 and NIC-2008 1-digit.',
          misconception: 'Students equate "tertiary sector growth" with "economic development" and assume any rise in services share indicates.',
          parts: [
                { id: 'a', prompt: 'Using the data below for Country X (2021 Census), calculate the percentage of workforce in each sector and identify which stage of the Clark-Fisher model.', answer: 'Step 1: Calculate percentages',
                  options: ['Step 1: Calculate percentages', 'Stage 3'],
                  hint: 'If stuck on sectoral classification, revisit c11_geo_cbse_16_005 and NIC-2008 1-digit codes;.',
                  misconception: 'Students equate "tertiary sector growth" with "economic development" and assume any rise in services share indicates progress.' },
                { id: 'b', prompt: 'Compare the occupational structure trajectories of India (1951: Primary 72%, Secondary 11%, Tertiary 17%; 2021: Primary 42%, Secondary 25%, Tertiary 33%) and.', answer: 'India\'s secondary sector peaked at ~26% (2012) then stagnated — premature',
                  options: ['India\'s secondary sector peaked at ~26% (2012) then stagnated — premature', 'lack of skills'],
                  hint: 'If stuck on sectoral classification, revisit c11_geo_cbse_16_005 and NIC-2008 1-digit codes;.',
                  misconception: 'Students equate "tertiary sector growth" with "economic development" and assume any rise in services share indicates progress.' }
          ],
            remediations: { 'students-equate-tertiary-sector-growth': { steps: ['Revisit c11_geo_cbse_16_005 (Occupational Structure of Population) — recreate the primary/secondary/tertiary.', 'Plot India\'s sectoral shares (1951, 1991, 2011, 2021) on a ternary diagram (triangular graph) — visualize the.', 'Compare with South Korea\'s ternary plot (same years) — note the "manufacturing bulge" India lacks.', 'Take PLFS 2022-23 unit-level data (available on MOSPI) — filter for "usual status workers" and cross-tabulate sector.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_02_010', difficulty: 'standard',
          question: 'Population policy refers to deliberate governmental measures (legislative.',
          hint: 'If stuck, revisit c12_geo_cbse_02_006 (Demographic Transition Theory) and practice.',
          misconception: 'Students often believe "population policy = family planning = reducing birth rates." They miss that policies also.',
          parts: [
                { id: 'a', prompt: 'Explain why a country in Stage 2 of the Demographic Transition (high birth rate, rapidly falling death rate) typically adopts anti-natalist policies, while.', answer: 'In Stage 2, the youth bulge strains education, health, and job-creation capacity',
                  options: ['In Stage 2, the youth bulge strains education, health, and job-creation capacity', 'population policy = family planning = reducing birth rates', 'ignores the economic mechanism (dividend vs', '"population policy = family planning = reducing birth rates'],
                  hint: 'If stuck, revisit c12_geo_cbse_02_006 (Demographic Transition Theory) and practice classifying 5.',
                  misconception: 'Students often believe "population policy = family planning = reducing birth rates." They miss that policies also address migration.' },
                { id: 'b', prompt: 'Calculate the approximate year India would reach replacement-level fertility (TFR = 2.1) if its TFR declined linearly from 3.4 in 2000 to 2.0 in 2020.', answer: 'Step 1: Total TFR decline = 3.4 - 2.0 = 1.4 over 20 years',
                  options: ['Step 1: Total TFR decline = 3.4 - 2.0 = 1.4 over 20 years', 'population policy = family planning = reducing birth rates', '"population policy = family planning = reducing birth rates'],
                  hint: 'If stuck, revisit c12_geo_cbse_02_006 (Demographic Transition Theory) and practice classifying 5.',
                  misconception: 'Students often believe "population policy = family planning = reducing birth rates." They miss that policies also address migration.' },
                { id: 'c', prompt: 'Compare China\'s One-Child Policy (1979-2015) and Iran\'s voluntary family planning programme (1989 onward) on three dimensions: (a) speed of fertility decline.', answer: 'speed of fertility decline, (',
                  options: ['speed of fertility decline, (', 'effectiveness', 'China controlled population', 'population policy = family planning = reducing birth rates'],
                  hint: 'If stuck, revisit c12_geo_cbse_02_006 (Demographic Transition Theory) and practice classifying 5.',
                  misconception: 'Students often believe "population policy = family planning = reducing birth rates." They miss that policies also address migration.' }
          ],
            remediations: { 'population-policy-family-planning-reducing': { steps: ['Revisit c12_geo_cbse_02_006 (Demographic Transition Theory) and map each stage to policy type (anti-natalist.', 'Study c11_geo_cbse_16_007 (India\'s NPP 2000) and c11_soc_cbse_08_008 (Brundtland Report) to link demographic goals.', 'Take a blank map of India, colour-code states by TFR (NFHS-5), female literacy, and groundwater status — identify 3.', 'Write a 150-word critique of China\'s policy using the "human rights vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
