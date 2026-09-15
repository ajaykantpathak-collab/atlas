import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch02_p1: SimDef = {
    id: 'v3_c12_geo_ch02_p1',
    title: 'The World Population · Part 1/2',
    subtitle: '90% of us live on 10% of the land — and the rest is dark',
    classLevel: 12, subject: 'geography', topic: 'The World Population · Part 1/2',
    chapters: ['c12_geo_ch02'],
    nodeIds: ['c12_geo_cbse_02_001', 'c12_geo_cbse_02_002', 'c12_geo_cbse_02_003', 'c12_geo_cbse_02_004', 'c12_geo_cbse_02_005', 'c12_geo_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Population geographer', intro: 'A satellite photo of Earth at night is the whole chapter: the light is where the rivers, plains and ports made living possible.', goal: 'Explain world population distribution, its three clusters and the factors separating ecumene from non-ecumene.' },
    discovery: {
        question: 'Ninety per cent of humanity lives on ten per cent of the land — yet Asia alone holds \'many places where people are few.\' Why does the emptiest continent also hold the fullest plains?',
        options: ['Habitability, not size, decides — ecumene plains fed by perennial rivers pack people in while tundra, desert and high plateau stay non-ecumene', 'Asia is just bigger', 'Statistics are wrong', 'People prefer crowds'],
        answer: 'Habitability, not size, decides — ecumene plains fed by perennial rivers pack people in while tundra, desert and high plateau stay non-ecumene',
        hook: 'Distribution ≠ density: the 90/10 figure is a pattern of where people are, not persons per square kilometre — and high density doesn\'t mean high total population (Singapore vs India). Six of the ten most populous countries are Asian, carrying ~60% of the world between them.',
    },
    teaching: [
        { title: 'World Population Distribution: Patterns and Factors', text: 'World population distribution refers to the spatial arrangement of human populations across Earth\'s surface, characterized by extreme unevenness where approximately 90% of the global population.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read Earth by night-light: locate the three great population clusters, weigh physical enablement against economic magnetism, and test whether minerals now outrank rivers in drawing the crowds.',
        labels: ['World Population Distribution: Patterns', 'Population Density: Types (Crude,', 'Factors Affecting Population Distribution', 'Population Growth: Natural Increase', 'Demographic Transition Theory: Stages'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_02_001', title: 'World Population Distribution: Patterns and Factors',
          scaffold: { problem: 'Using the NCERT statement that "90% of world population lives in 10% of land area," estimate the average population density of the.',
            steps: [
            { text: 'Calculate total world land area = 148 million sq km. Inhabited area (10%) = 14.8 million sq km.' },
            { text: 'Calculate population in inhabited area = 90% of 8 billion = 7.2 billion.' },
            { text: 'Density of inhabited 10% = 7.2 billion / 14.8 million sq km ≈ 486 persons/sq km.' },
            { text: 'Compare: Inhabited zone density is ~80 times higher than uninhabited zone. This quantifies the extreme unevenness.' },
            { text: 'Geographical interpretation: The 10% corresponds to ecumene — river plains (Ganga, Yangtze, Nile, Mississippi), coastal.', faded: true, blankAnswer: 'Inhabited 10% density ≈ 486 persons/sq km; Uninhabited 90%.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_02_002', title: 'Population Density: Types (Crude, Physiological, Agricultural)',
          scaffold: { problem: 'Using Census 2011 data, State A has total population 72 million, total area 192,000 sq km, net cultivable area 96,000 sq km, and.',
            steps: [
            { text: 'Identify given values: P_total = 72,000,000; A_total = 192,000 sq km; A_cultivable = 96,000 sq km; P_agri = 24,000,000.' },
            { text: 'Compute crude density = 72,000,000 / 192,000 = 375 persons/sq km.' },
            { text: 'Compute physiological density = 72,000,000 / 96,000 = 750 persons/sq km.' },
            { text: 'Compute agricultural density = 24,000,000 / 96,000 = 250 farmers/sq km.' },
            { text: 'Compare: Physiological density (750) is double crude density, showing high pressure on farmland.', faded: true, blankAnswer: 'Crude = 375 persons/sq km; Physiological = 750 persons/sq.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_02_003', title: 'Factors Affecting Population Distribution: Geographical Factors',
          caseStudy: { intro: 'Look at a physical map of India: notice how the Indo-Gangetic plain is crowded with cities and villages while the Thar Desert and Himalayan slopes are empty.',
            decisions: [{ prompt: 'Name the four geographical factors that influence population distribution according to NCERT Class 12 Geography.', options: [
                { text: 'The four factors are: (1) Availability of water, (2) Landforms, (3) Climate, (4) Soils', outcome: 'The four factors are: (1) Availability of water, (2) Landforms, (3) Climate, (4) Soils.' },
                { text: 'flat land = high population', outcome: 'Not quite — Students think "flat land = high population" universally. They cite the Indo-Gangetic plain but.', reveals: 'flat-land-high-population-universally' },
                { text: 'minerals or urbanisation', outcome: 'Not quite — Students think "flat land = high population" universally. They cite the Indo-Gangetic plain but.', reveals: 'flat-land-high-population-universally' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_02_004', title: 'Factors Affecting Population Distribution: Economic and Social Factors',
          caseStudy: { intro: 'Look at a night-time satellite image of India: the bright clusters are not just on flat plains with water — they blaze in the Chota Nagpur plateau (minerals).',
            decisions: [{ prompt: 'Name two economic factors and two social-cultural factors that influence population distribution, giving one global example for each.', options: [
                { text: 'Economic: (1) Mineral deposits', outcome: 'Economic: (1) Mineral deposits — Katanga-Zambia copper belt; (2) Industrialization — Kobe-Osaka.' },
                { text: 'industries give jobs', outcome: 'Not quite — Students think economic factors only mean "industries give jobs" and social factors only mean.', reveals: 'economic-factors-only-mean-industries' },
                { text: 'religion', outcome: 'Not quite — Students think economic factors only mean "industries give jobs" and social factors only mean.', reveals: 'economic-factors-only-mean-industries' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_02_005', title: 'Population Growth: Natural Increase and Migration',
          scaffold: { problem: 'According to Census 2011, Kerala\'s population was 3.34 crore. In a particular year, it recorded 5.2 lakh live births and 2.1 lakh deaths.',
            steps: [
            { text: 'Convert population to same units: 3.34 crore = 33,400,000; births = 520,000; deaths = 210,000.' },
            { text: 'Apply CBR formula: CBR = (520,000 / 33,400,000) × 1000 = 15.57 ≈ 15.6 per 1000.' },
            { text: 'Apply CDR formula: CDR = (210,000 / 33,400,000) × 1000 = 6.29 ≈ 6.3 per 1000.' },
            { text: 'Natural Growth Rate = CBR – CDR = 15.6 – 6.3 = 9.3 per 1000.' },
            { text: 'Interpret: Low CBR and CDR indicate Kerala is in Stage 3 of Demographic Transition (low birth, low death), with growth.', faded: true, blankAnswer: 'CBR = 15.6 per 1000, CDR = 6.3 per 1000, Natural Growth.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_02_006', title: 'Demographic Transition Theory: Stages and Characteristics',
          caseStudy: { intro: 'Begin by asking the student to observe a local hospital or clinic: in their grandparents\' generation, many children were born but few survived; today, fewer.',
            decisions: [{ prompt: '**REMEMBER:** List the three stages of the Classical Demographic Transition Model in correct sequential order and state the characteristic.', options: [
                { text: '**Correct Answer:** Stage I: High Fluctuating', outcome: '**Correct Answer:** Stage I: High Fluctuating — CBR high, CDR high (both ~35-45 per 1000).' },
                { text: 'population explosion', outcome: 'Not quite — **Students believe the "population explosion" happens because birth rates *increase* in Stage II.**.', reveals: 'students-believe-the-population-explosion' },
                { text: 'fertility must be rising', outcome: 'Not quite — **Students believe the "population explosion" happens because birth rates *increase* in Stage II.**.', reveals: 'students-believe-the-population-explosion' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'An investment pitch for an agri-startup shows a region\'s crude density is only 90 persons per sq km and concludes \'land is plentiful — pressure on farmland is low.\' A glance at the map shows most of the region is desert and rocky upland.',
            decisions: [{ prompt: 'How do you check that claim before endorsing the pitch?', options: [
                { text: 'Compute physiological density — population divided by net cultivable area. Like Egypt, where crude density is low but nearly everyone crowds onto the Nile strip, the real pressure on farmland could be extreme once uncultivable land is removed from the denominator.', outcome: 'Crude density dilutes pressure by counting desert and mountain; physiological density is the honest measure of population-land stress, and the pitch\'s conclusion can flip completely.' },
                { text: 'Accept the pitch — 90 per sq km is objectively sparse, so farmland pressure must be low.', outcome: 'That\'s the crude-density trap the chapter warns about: total area includes land that can never grow a crop, so a \'sparse\' region can be one where every cultivable acre is overworked.', reveals: 'crude-density-tells-all' },
                { text: 'Use agricultural density instead — farmers per cultivable area tells you everything the pitch needs.', outcome: 'Agricultural density measures labour intensity, not population pressure on land; a region can have few farmers per hectare yet still carry a huge non-farming population that cultivable land must feed.', reveals: 'farm-density-measures-pressure' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now separate where people are from how thickly they pack — and explain the Nile\'s ribbon versus the Ganga\'s sprawl. Population geography starts on this map.',
            decisions: [{ prompt: 'What comes next? The World Population · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The World Population · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_02_001', difficulty: 'standard',
          question: 'World population distribution refers to the spatial arrangement of human.',
          hint: 'If unable to visualize global patterns, revisit c11_geo_cbse_09_001 (Physiographic.',
          misconception: 'Students conflate "population distribution" (the spatial pattern — where people live) with "population density" (the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'World population distribution refers to the spatial arrangement of human populations',
                  options: ['World population distribution refers to the spatial arrangement of human populations', 'Population density is the ratio of human population to land area, expressed as persons', 'Geographical factors affecting population distribution refer to the natural environmental', 'Economic factors (mineral deposits, industrialization, urbanization) and social-cultural'],
                  hint: 'If unable to visualize global patterns, revisit c11_geo_cbse_09_001 (Physiographic divisions.',
                  misconception: 'Students conflate "population distribution" (the spatial pattern — where people live) with "population density" (the ratio — people per.' }
          ],
            remediations: { 'students-conflate-population-distribution-the': { steps: ['Revisit c11_geo_cbse_16_001 (India\'s population distribution) and explicitly map the terms "distribution" (pattern.', 'Use a world population cartogram (area rescaled by population) alongside a standard map to visually grasp the 90/10.', 'Practice calculating density for two Indian states (e.g., Bihar vs.', 'Update the "top ten populous countries" list using latest UN data (2023/2024) to correct the static textbook list.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_02_002', difficulty: 'standard',
          question: 'Population density is the ratio of human population to land area, expressed.',
          hint: 'If stuck, review c11_geo_cbse_16_001 (basic density) and c11_geo_cbse_18_001 (land‑use.',
          misconception: 'Students often think "high crude density = high population pressure everywhere." They forget that crude density.',
          parts: [
                { id: 'a', prompt: 'Define crude population density and give its formula with units.', answer: 'Crude population density = Total population / Total land area',
                  options: ['Crude population density = Total population / Total land area', 'high crude density = high population pressure everywhere', '"high crude density = high population pressure everywhere'],
                  hint: 'If stuck, review c11_geo_cbse_16_001 (basic density) and c11_geo_cbse_18_001 (land‑use categories).',
                  misconception: 'Students often think "high crude density = high population pressure everywhere." They forget that crude density includes mountains.' },
                { id: 'b', prompt: 'Calculate the crude, physiological, and agricultural densities for a hypothetical region with: total population 12 million, total area 40,000 sq km, net.', answer: 'Step 1: Crude density = 12,000,000 / 40,000 = 300 persons/sq km',
                  options: ['Step 1: Crude density = 12,000,000 / 40,000 = 300 persons/sq km', 'high crude density = high population pressure everywhere', '"high crude density = high population pressure everywhere'],
                  hint: 'If stuck, review c11_geo_cbse_16_001 (basic density) and c11_geo_cbse_18_001 (land‑use categories).',
                  misconception: 'Students often think "high crude density = high population pressure everywhere." They forget that crude density includes mountains.' }
          ],
            remediations: { 'high-crude-density-high-population': { steps: ['Revisit c11_geo_cbse_16_001 (Population: Distribution and Density in India) to recall how density was introduced.', 'Draw a simple map of India shading only cultivable land; calculate physiological density for two contrasting states.', 'Rajasthan) using Census data.', 'Re‑attempt Diagnostic Question 3 with the new numbers to verify understanding.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "high crude density = high population pressure everywhere." They forget that crude density.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "A country with high agricultural density always has low agricultural productivity." Provide a reasoned judgment.', answer: 'Not necessarily',
                  options: ['Not necessarily', 'high crude density = high population pressure everywhere', '"high crude density = high population pressure everywhere'],
                  hint: 'If stuck, review c11_geo_cbse_16_001 (basic density) and c11_geo_cbse_18_001 (land‑use categories).',
                  misconception: 'Students often think "high crude density = high population pressure everywhere." They forget that crude density includes mountains.' }
          ],
            remediations: { 'high-crude-density-high-population': { steps: ['Revisit c11_geo_cbse_16_001 (Population: Distribution and Density in India) to recall how density was introduced.', 'Draw a simple map of India shading only cultivable land; calculate physiological density for two contrasting states.', 'Rajasthan) using Census data.', 'Re‑attempt Diagnostic Question 3 with the new numbers to verify understanding.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_02_003', difficulty: 'standard',
          question: 'Geographical factors affecting population distribution refer to the natural.',
          hint: 'If stuck, revisit c11_geo_cbse_09_003 (Northern Plains formation) and c11_geo_cbse_12_004.',
          misconception: 'Students think "flat land = high population" universally. They cite the Indo-Gangetic plain but miss counterexamples.',
          parts: [
                { id: 'a', prompt: 'Given: Region A has 500 mm annual rainfall, sandy soil, summer temperatures of 45°C, and flat terrain.', answer: 'Region B',
                  options: ['Region B', 'flat land = high population', '"flat land = high population" universally'],
                  hint: 'If stuck, revisit c11_geo_cbse_09_003 (Northern Plains formation) and c11_geo_cbse_12_004 (Alluvial.',
                  misconception: 'Students think "flat land = high population" universally. They cite the Indo-Gangetic plain but miss counterexamples: (1) Siberian plains.' }
          ],
            remediations: { 'flat-land-high-population-universally': { steps: ['Revisit c11_geo_cbse_16_001 (Population Distribution and Density in India) — identify how water, landform, climate.', 'Use a physical map of India + population density map side-by-side; trace 5 high-density and 5 low-density areas.', 'Re-attempt Diagnostic Question 3 — if still wrong, watch a 10-min video on "Factors Affecting Population Distribution".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_02_004', difficulty: 'standard',
          question: 'Economic factors (mineral deposits, industrialization, urbanization) and.',
          hint: 'If stuck on why industries cluster despite poor geography, revisit c10_geo_cbse_06_007.',
          misconception: 'Students think economic factors only mean "industries give jobs" and social factors only mean "religion." They miss.',
          parts: [
                { id: 'a', prompt: 'Name two economic factors and two social-cultural factors that influence population distribution, giving one global example for each.', answer: 'Economic: (1) Mineral deposits',
                  options: ['Economic: (1) Mineral deposits', 'industries give jobs', 'religion'],
                  hint: 'If stuck on why industries cluster despite poor geography, revisit c10_geo_cbse_06_007 (Industrial.',
                  misconception: 'Students think economic factors only mean "industries give jobs" and social factors only mean "religion." They miss that urbanization pulls.' },
                { id: 'b', prompt: 'Calculate the crude population density of Dhanbad district (area 2,052 sq km, population 2.68 million, 2011 Census).', answer: 'Density = 2,680,000 / 2,052 ≈ 1,306 persons/sq km',
                  options: ['Density = 2,680,000 / 2,052 ≈ 1,306 persons/sq km', 'industries give jobs', 'religion'],
                  hint: 'If stuck on why industries cluster despite poor geography, revisit c10_geo_cbse_06_007 (Industrial.',
                  misconception: 'Students think economic factors only mean "industries give jobs" and social factors only mean "religion." They miss that urbanization pulls.' }
          ],
            remediations: { 'economic-factors-only-mean-industries': { steps: ['Revisit c10_geo_cbse_06_007 (Industrial Location Factors) to recall how raw material, labor, market, transport, and.', 'Re-read NCERT Chapter 2 "Economic Factors" and "Social and Cultural Factors" paragraphs — underline each distinct.', 'Draw a two-column table: Column A = Factor, Column B = Indian Example, Column C = Global Example.', 'Re-attempt Diagnostic Q2 and Q4 — they test the exact linkage.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_02_005', difficulty: 'standard',
          question: 'Population growth refers to the change in the number of inhabitants of.',
          hint: 'If stuck on rate calculations, review Class 11 "Population Growth: Trends Since 1901".',
          misconception: 'Students often think "natural increase" and "population growth" are synonyms, and they forget to add net migration.',
          parts: [
                { id: 'a', prompt: 'Define Crude Birth Rate (CBR) and state its formula with all variables.', answer: 'CBR = (Number of live births in a year / Estimated mid-year population) × 1000',
                  options: ['CBR = (Number of live births in a year / Estimated mid-year population) × 1000', 'natural increase', 'population growth', 'emigrant'],
                  hint: 'If stuck on rate calculations, review Class 11 "Population Growth: Trends Since 1901".',
                  misconception: 'Students often think "natural increase" and "population growth" are synonyms, and they forget to add net migration to get actual growth.' },
                { id: 'b', prompt: 'Explain why the actual growth rate of a city can be higher than its natural growth rate even when birth rates are falling.', answer: 'Actual growth = Natural growth (Births – Deaths) + Net Migration (In-migration –',
                  options: ['Actual growth = Natural growth (Births – Deaths) + Net Migration (In-migration –', 'because birth rate is high', 'natural increase', 'population growth'],
                  hint: 'If stuck on rate calculations, review Class 11 "Population Growth: Trends Since 1901".',
                  misconception: 'Students often think "natural increase" and "population growth" are synonyms, and they forget to add net migration to get actual growth.' },
                { id: 'c', prompt: 'A district has a mid-year population of 2,50,000. During the year, 4,500 live births and 2,000 deaths were registered. Net in-migration was 1,200.', answer: 'CBR = (4500/250000)×1000 = 18 per 1000',
                  options: ['CBR = (4500/250000)×1000 = 18 per 1000', 'natural increase', 'population growth', 'emigrant'],
                  hint: 'If stuck on rate calculations, review Class 11 "Population Growth: Trends Since 1901".',
                  misconception: 'Students often think "natural increase" and "population growth" are synonyms, and they forget to add net migration to get actual growth.' }
          ],
            remediations: { 'natural-increase-and-population-growth': { steps: ['Revisit the definitions of CBR, CDR, Natural Growth, and Actual Growth in the NCERT box "Some Basic Concepts.', 'Create a flashcard with the two formulas side by side: Natural Growth = B – D; Actual Growth = B – D + I – O.', 'Practice 3 numerical problems from past board papers (e.g., CBSE 2019, 2022) where migration data is given.', 'Draw a simple diagram: Origin → (Push) → Migrant → (Pull) → Destination, labeling emigrant/immigrant at each end.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_02_006', difficulty: 'standard',
          question: 'Demographic Transition Theory describes the historical shift in a population.',
          hint: 'If unable to calculate or interpret Natural Increase Rate, revisit c12_geo_cbse_02_005.',
          misconception: '**Students believe the "population explosion" happens because birth rates *increase* in Stage II.** They see the.',
          parts: [
                { id: 'a', prompt: '**REMEMBER:** List the three stages of the Classical Demographic Transition Model in correct sequential order and state the characteristic trend of Crude Birth.', answer: '**Correct Answer:** Stage I: High Fluctuating',
                  options: ['**Correct Answer:** Stage I: High Fluctuating', 'population explosion', 'fertility must be rising', 'the "population explosion" happens'],
                  hint: 'If unable to calculate or interpret Natural Increase Rate, revisit c12_geo_cbse_02_005 worked.',
                  misconception: '**Students believe the "population explosion" happens because birth rates *increase* in Stage II.** They see the population curve shooting.' },
                { id: 'b', prompt: '**UNDERSTAND:** The NCERT text states: "Fertility remains high in the beginning of second stage but it declines with time.', answer: '**Correct Answer:** In Stage I, both rates are high and roughly equal (gap ≈ 0)',
                  options: ['**Correct Answer:** In Stage I, both rates are high and roughly equal (gap ≈ 0)', 'population explosion', 'fertility must be rising', 'the "population explosion" happens'],
                  hint: 'If unable to calculate or interpret Natural Increase Rate, revisit c12_geo_cbse_02_005 worked.',
                  misconception: '**Students believe the "population explosion" happens because birth rates *increase* in Stage II.** They see the population curve shooting.' },
                { id: 'c', prompt: '**ANALYZE:** Compare the demographic transition trajectories of **Japan** (NCERT Stage III example) and **Kenya** (NCERT Stage II example).', answer: '**Correct Answer:** 1',
                  options: ['**Correct Answer:** 1', 'population explosion', 'fertility must be rising', 'the "population explosion" happens'],
                  hint: 'If unable to calculate or interpret Natural Increase Rate, revisit c12_geo_cbse_02_005 worked.',
                  misconception: '**Students believe the "population explosion" happens because birth rates *increase* in Stage II.** They see the population curve shooting.' }
          ],
            remediations: { 'students-believe-the-population-explosion': { steps: ['**Re-visit c12_geo_cbse_02_005 (Population Growth: Natural Increase and Migration)** — re-learn the definition.', '**Draw the CBR-CDR diagram (Fig 2.2) from memory** three times, labeling each stage, the gap, and the *direction.', '**Complete this re-diagnostic:** "If a country has CBR=40, CDR=38 (Year 1) and CBR=38, CDR=12 (Year 20), calculate the.', 'Explain why the population growth *accelerated* even though CBR *fell*." 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
