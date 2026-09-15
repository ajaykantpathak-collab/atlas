import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch16_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch16_p1: SimDef = {
    id: 'v3_c11_geo_ch16_p1',
    title: 'Population · Part 1/2',
    subtitle: 'Read growth rates that fall while the population climbs — and density measured the honest way.',
    classLevel: 11, subject: 'geography', topic: 'Population · Part 1/2',
    chapters: ['c11_geo_ch16'],
    nodeIds: ['c11_geo_cbse_16_001', 'c11_geo_cbse_16_002', 'c11_geo_cbse_16_003', 'c11_geo_cbse_16_004', 'c11_geo_cbse_16_005', 'c11_geo_cbse_16_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a demographer reading a night-time satellite image', intro: 'The Gangetic plain glows; the Thar stays dark. Physical geography set the stage — but the numbers still need careful reading.', goal: 'Calculate density and decadal growth correctly and explain India\'s four growth phases.' },
    discovery: {
        question: 'India\'s decadal growth slid from 23.9% to 17.7% — so the population is finally shrinking?',
        options: ['No — a slower percentage on a larger base still adds crores; the growth rate fell, the population didn\'t', 'Yes — a falling rate means falling numbers', 'Yes — 17.7% is below replacement', 'No — but only because the census missed people'],
        answer: 'No — a slower percentage on a larger base still adds crores; the growth rate fell, the population didn\'t',
        hook: '1921\'s \'year of the great divide\' wasn\'t a birth-rate story either — it was deaths finally retreating that changed the curve.',
    },
    teaching: [
        { title: 'Population: Distribution and Density in India (Factors Affecting)', text: 'Population distribution refers to the spatial pattern of where people live across India\'s territory, while population density is the quantitative measure of population per unit area (typically.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_16_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Compute decadal growth from 1951-61 census figures, place it in the right phase, then measure a district\'s physiological density against the national 450.',
        labels: ['Population: Distribution and Density', 'Population Growth: Trends Since', 'Population Composition: Age Structure,', 'Rural-Urban Population in India', 'Occupational Structure of Population', 'Demographic Transition Theory: Stages'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_16_001', title: 'Population: Distribution and Density in India (Factors Affecting)',
          scaffold: { problem: 'Using Census 2011 data, Bihar has population 104 million, area 94,163 km², net sown area 56,000 km², agricultural workers 25 million.',
            steps: [
            { text: 'Identify the three formulas and plug in Bihar\'s numbers.' },
            { text: 'Arithmetic density = 104,000,000 / 94,163 = 1,104 persons/km².' },
            { text: 'Physiological density = 104,000,000 / 56,000 = 1,857 persons/km².' },
            { text: 'Agricultural density = 25,000,000 / 56,000 = 446 workers/km².' },
            { text: 'Interpret: High physiological density means each hectare of cultivated land supports 18.6 people — implying extreme.', faded: true, blankAnswer: 'Arithmetic = 1,104 persons/km²; Physiological = 1,857.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_16_002', title: 'Population Growth: Trends Since 1901 and Census Data',
          scaffold: { problem: 'The Census of India recorded India\'s population as 846.4 million in 1991 and 1028.7 million in 2001.',
            steps: [
            { text: 'Identify the formula: Decadal Growth Rate = [(P_end - P_start) / P_start] × 100.' },
            { text: 'Substitute values: P_start = 846.4 million, P_end = 1028.7 million.' },
            { text: 'Calculate absolute increase: 1028.7 - 846.4 = 182.3 million.' },
            { text: 'Divide by base: 182.3 / 846.4 = 0.2154.' },
            { text: 'Convert to percentage: 0.2154 × 100 = 21.54% ≈ 21.5%.' },
            { text: 'Compare with phase thresholds: >20% indicates rapid growth phase (1951-1981) but this decade (1991-2001) shows early.', faded: true, blankAnswer: 'Decadal growth rate = 21.5%; phase = high growth with.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_16_003', title: 'Population Composition: Age Structure, Sex Ratio and Literacy',
          scaffold: { problem: 'Using Census 2011 data, State X has: Total population = 7.2 crore, Males = 3.7 crore, Females = 3.5 crore, Population 0-6 years = 0.9.',
            steps: [
            { text: 'Identify formula for sex ratio: (Females / Males) × 1000 = (3.5 / 3.7) × 1000 = 946 females per 1000 males.' },
            { text: 'Identify population aged 7+ = Total - 0-6 = 7.2 - 0.9 = 6.3 crore.' },
            { text: 'Calculate child sex ratio (0-6 years): (0.43 / 0.47) × 1000 = 915 females per 1000 males.' },
            { text: 'Compare overall sex ratio (946) with child sex ratio (915). The lower child ratio indicates recent sex-selective.' },
            { text: 'Interpret: State X has near-national average overall sex ratio but concerning child sex ratio, suggesting emerging.', faded: true, blankAnswer: '(a) 946, (b) 76.2%, (c) 915. Child sex ratio < overall sex.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_16_004', title: 'Rural-Urban Population in India: Trends and Patterns',
          scaffold: { problem: 'The 2011 Census shows India\'s urban population as 377.1 million out of 1210.9 million total.',
            steps: [
            { text: 'Calculate UR_2001 = (286.1 / 1028.7) × 100 = 27.81%.' },
            { text: 'Calculate UR_2011 = (377.1 / 1210.9) × 100 = 31.14%.' },
            { text: 'Absolute increase = 31.14 - 27.81 = 3.33 percentage points.' },
            { text: 'Tempo = (3.33 / 27.81) × 100 = 11.97% per decade.' },
            { text: 'Compare with 1991-2001: UR_1991 = 25.71%, UR_2001 = 27.81%, increase = 2.1 pp, Tempo = 8.17%.', faded: true, blankAnswer: 'UR_2001=27.81%, UR_2011=31.14%, Absolute increase=3.33.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_16_005', title: 'Occupational Structure of Population (Primary, Secondary, Tertiary)',
          scaffold: { problem: 'A district in Maharashtra has 12.4 lakh total workers (Census 2011).',
            steps: [
            { text: 'Calculate sectoral shares: Primary = (7.2/12.4)×100 = 58.1%; Secondary = (2.1/12.4)×100 = 16.9%; Tertiary.' },
            { text: 'Recall Clark-Fisher benchmarks for per capita income ~₹1.8 lakh (lower-middle income): Expected Primary ~40-45%.' },
            { text: 'Compare actual vs expected: Primary is 13-18 pp HIGHER than expected; Secondary is 8-13 pp LOWER; Tertiary is 5-10.' },
            { text: 'Interpret: High primary + low secondary = "missing manufacturing" — workers trapped in agriculture due to insufficient.' },
            { text: 'Check for distress signals: If marginal workers >30% in primary, indicates underemployment.' },
            { text: 'Classify: "Distressed" — not just lagging (which would be low income + high primary), but high primary DESPITE moderate.', faded: true, blankAnswer: 'Distressed. Primary 58% vs expected 40-45%; Secondary 17%.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_16_006', title: 'Demographic Transition Theory: Stages and India\'s Position',
          scaffold: { problem: 'Using SRS 2019 data, State X has CBR = 22.5, CDR = 6.2, and 32% population aged 0–14.',
            steps: [
            { text: 'Compute NIR = CBR – CDR = 22.5 – 6.2 = 16.3 per 1000 (1.63% annual growth).' },
            { text: 'Compare CBR/CDR to DTT benchmarks: CBR 22.5 (Stage 3 range 15–30), CDR 6.2 (Stage 3/4 range <10) → Stage 3 (Late.' },
            { text: 'Note 32% youth share (0–14) indicates strong demographic momentum—large cohort entering reproductive age.' },
            { text: 'Even if TFR instantly drops to replacement (2.1), the 0–14 cohort will produce births for 20+ years → population grows.' },
            { text: 'Quantify momentum: with NIR 1.63%, population doubles in ~43 years (Rule of 70: 70/1.63); in 20 years it grows ~38%.' },
            { text: 'Conclude: Stage 3, NIR 16.3/1000, population will grow substantially due to age-structure momentum.', faded: true, blankAnswer: 'Stage 3 (Late Expanding), NIR = 16.3 per 1000; population.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_16_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a data-lab class, a teammate looks at India\'s population graph and announces two findings: \'Cherrapunji gets record rainfall but few people — floods must keep them away. And India\'s growth rate fell from 23.9% to 17.7%, so the population is finally shrinking.\'',
            decisions: [{ prompt: 'What corrections does the analysis need?', options: [
                { text: 'Fix both readings: Cherrapunji\'s low density comes from steep, dissected limestone terrain with thin soils that limit farming and infrastructure — not rainfall volume. And a falling growth RATE still means a growing population — we\'re adding more slowly, not shrinking. Also note the 1921 \'great divide\' was driven by mortality (influenza, famine), not a birth-rate drop.', outcome: 'The graph now reads correctly: physical factors set potential carrying capacity, human factors realise it — and rate-decline ≠ absolute decline.' },
                { text: 'Accept the flood explanation — too much rain makes a place unliveable, that\'s why it\'s empty.', outcome: 'Rain itself isn\'t the deterrent: high-rainfall Kerala is dense; it\'s Cherrapunji\'s rugged relief and thin soil that cap settlement.', reveals: 'high-rain-means-low-density' },
                { text: 'Confirm the shrinking claim — a lower percentage growth means the total is going down.', outcome: 'A classic board-exam error: declining growth rate means the increase is slowing; the absolute population still rises every decade.', reveals: 'growth-rate-decline-means-shrinking' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_16_006', title: 'The bigger picture',
          caseStudy: { intro: 'Sixty percent of Indians crowd onto a quarter of the land — distribution is written by water, soil and flatness long before policy.',
            decisions: [{ prompt: 'What comes next? Population · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Population · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_16_001', difficulty: 'standard',
          question: 'Population distribution refers to the spatial pattern of where people live.',
          hint: 'If stuck, revisit Class 7 "Physical Divisions of India" (c7_geo_ch01_003) and Class 10.',
          misconception: 'Students believe "high rainfall always means high population density" and cite Cherrapunji (Meghalaya) as.',
          parts: [
                { id: 'a', prompt: 'Define arithmetic population density and state its formula with correct units.', answer: 'Arithmetic density = Total Population / Total Area (persons/km²)',
                  options: ['Arithmetic density = Total Population / Total Area (persons/km²)', 'both states have similar arithmetic density so pressure is similar', 'high rainfall always means high population density', 'too much rain causing floods'],
                  hint: 'If stuck, revisit Class 7 "Physical Divisions of India" (c7_geo_ch01_003) and Class 10 "Land Use.',
                  misconception: 'Students believe "high rainfall always means high population density" and cite Cherrapunji (Meghalaya) as a counter-example but.' }
          ],
            remediations: { 'high-rainfall-always-means-high': { steps: ['Take a physical map of India and a population density map (Census 2011).', 'Trace the 500 persons/km² contour on the density map.', 'Overlay it on the physical map: observe how it hugs the 200m contour line (plains) and avoids >500m elevation.', 'Now check anomalies: Kerala (high density despite hills) and Assam (moderate despite plains).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_16_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "high rainfall always means high population density" and cite Cherrapunji (Meghalaya) as.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The proposed Ken-Betwa river interlinking project will automatically increase population density in Bundelkhand by improving water.', answer: 'The statement overestimates deterministic water-population linkage',
                  options: ['The statement overestimates deterministic water-population linkage', 'high rainfall always means high population density', 'too much rain causing floods'],
                  hint: 'If stuck, revisit Class 7 "Physical Divisions of India" (c7_geo_ch01_003) and Class 10 "Land Use.',
                  misconception: 'Students believe "high rainfall always means high population density" and cite Cherrapunji (Meghalaya) as a counter-example but.' }
          ],
            remediations: { 'high-rainfall-always-means-high': { steps: ['Take a physical map of India and a population density map (Census 2011).', 'Trace the 500 persons/km² contour on the density map.', 'Overlay it on the physical map: observe how it hugs the 200m contour line (plains) and avoids >500m elevation.', 'Now check anomalies: Kerala (high density despite hills) and Assam (moderate despite plains).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_16_002', difficulty: 'standard',
          question: 'Population growth trends since 1901 refer to the decadal changes in India\'s.',
          hint: 'Review percentage change calculation and line graph interpretation from Class 9.',
          misconception: 'Students often think "population growth rate decline means the population is shrinking" and cite the falling decadal.',
          parts: [
                { id: 'a', prompt: 'Using the census data below, calculate the decadal growth rate for 1951-1961 and determine which phase it belongs to.', answer: 'Step 1: Absolute increase = 439.2 - 361.1 = 78.1 million',
                  options: ['Step 1: Absolute increase = 439.2 - 361.1 = 78.1 million', 'population growth rate decline means the population is shrinking', 'India\'s population started decreasing after 1981'],
                  hint: 'Review percentage change calculation and line graph interpretation from Class 9 Mathematics.',
                  misconception: 'Students often think "population growth rate decline means the population is shrinking" and cite the falling decadal growth rate (23.9% →.' }
          ],
            remediations: { 'population-growth-rate-decline-means': { steps: ['Have the student calculate absolute increase for each decade from 1951-2011 using census data (provided in a table).', 'Plot both absolute increase and growth rate on dual-axis graph.', 'Ask: "When did absolute increase peak? When did growth rate peak?"', 'Explain that growth rate peaked in 1981-1991 (23.9%) but absolute increase peaked in 1991-2001 (182 million) due.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_16_003', difficulty: 'standard',
          question: 'Population composition refers to the structural characteristics of a population.',
          hint: 'Revisit Census 2011 primary census abstract for your state - locate the age-group table.',
          misconception: 'Students believe "literacy rate = percentage of total population that is literate" but Census defines it as percentage.',
          parts: [
                { id: 'a', prompt: 'Define sex ratio as used in the Indian Census and state the all-India sex ratio according to Census 2011.', answer: 'Sex ratio in Indian Census = (Number of females / Number of males) × 1000',
                  options: ['Sex ratio in Indian Census = (Number of females / Number of males) × 1000', '943 males per 1000 females', 'percentage of females', 'literacy rate = percentage of total population that is literate'],
                  hint: 'Revisit Census 2011 primary census abstract for your state - locate the age-group table, sex ratio.',
                  misconception: 'Students believe "literacy rate = percentage of total population that is literate" but Census defines it as percentage of population AGED 7.' },
                { id: 'b', prompt: 'Explain why Kerala (1084) and Puducherry (1037) have sex ratios above 1000 while Haryana (879) and NCT Delhi (868) have ratios below 900, despite all being.', answer: 'Kerala/Puducherry: historical matrilineal traditions, high female literacy, low',
                  options: ['Kerala/Puducherry: historical matrilineal traditions, high female literacy, low', 'development level', 'poverty', 'literacy rate = percentage of total population that is literate'],
                  hint: 'Revisit Census 2011 primary census abstract for your state - locate the age-group table, sex ratio.',
                  misconception: 'Students believe "literacy rate = percentage of total population that is literate" but Census defines it as percentage of population AGED 7.' },
                { id: 'c', prompt: 'A hypothetical state has population: 0-14 years = 32%, 15-59 years = 60%, 60+ = 8%.', answer: 'Working population (15-59) = 60%',
                  options: ['Working population (15-59) = 60%', 'literacy rate = percentage of total population that is literate', 'sex ratio', 'gender ratio'],
                  hint: 'Revisit Census 2011 primary census abstract for your state - locate the age-group table, sex ratio.',
                  misconception: 'Students believe "literacy rate = percentage of total population that is literate" but Census defines it as percentage of population AGED 7.' },
                { id: 'd', prompt: 'Compare the population pyramids of India (2011) and Japan (2020).', answer: '1) India: broad base (high 0-14%) → need for schools, vaccines, child nutrition',
                  options: ['1) India: broad base (high 0-14%) → need for schools, vaccines, child nutrition', 'literacy rate = percentage of total population that is literate', 'sex ratio', 'gender ratio'],
                  hint: 'Revisit Census 2011 primary census abstract for your state - locate the age-group table, sex ratio.',
                  misconception: 'Students believe "literacy rate = percentage of total population that is literate" but Census defines it as percentage of population AGED 7.' }
          ],
            remediations: { 'literacy-rate-percentage-of-total': { steps: ['Write both definitions side-by-side: "Literacy rate = (Literates aged 7+ / Population aged 7+) × 100" vs "Crude.', 'Calculate both for a village with 1000 people, 200 children 0-6, 600 literates.', 'Map sex ratio expressions: India (females/1000 males) vs World (males/100 females).', 'Practice converting: India\'s 943 = World\'s 106.0 males/100 females.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_16_004', difficulty: 'standard',
          question: 'Rural-urban population distribution refers to the proportional division of.',
          hint: 'Revisit the Census 2011 Rural-Urban Definition handout (available on censusindia.gov.in).',
          misconception: 'Students believe \'urbanization\' means only growth of big cities (million-plus cities) and equate it with rural-to-urban.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rural-urban population distribution refers to the proportional division of a country\'s',
                  options: ['Rural-urban population distribution refers to the proportional division of a country\'s', 'Population distribution refers to the spatial pattern of where people live across India\'s', 'Population growth trends', 'Population composition refers to the structural characteristics of a population including'],
                  hint: 'Revisit the Census 2011 Rural-Urban Definition handout (available on censusindia.gov.in) and.',
                  misconception: 'Students believe \'urbanization\' means only growth of big cities (million-plus cities) and equate it with rural-to-urban migration.' }
          ],
            remediations: { 'urbanization-means-only-growth-of': { steps: ['Take the 2011 Census PCA (Primary Census Abstract) for your district.', 'Calculate the % of urban population growth contributed by new CTs vs growth in existing statutory towns.', 'Map the workforce shift: use Census \'Main Workers\' data to show the % male workforce in non-agriculture crossing 75%.', 'Discuss with a local panchayat member how the \'village\' changed economically (e.g., new factories, services) without.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_16_005', difficulty: 'standard',
          question: 'Occupational structure refers to the distribution of a country\'s working.',
          hint: 'Review Class 10 Economics Ch2 (Sectors of the Indian Economy) for sector definitions and.',
          misconception: 'Students equate "tertiary sector growth" with "development" and assume all service jobs are high-productivity.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Occupational structure refers to the distribution of a country\'s working population',
                  options: ['Occupational structure refers to the distribution of a country\'s working population', 'Population distribution refers to the spatial pattern of where people live across India\'s', 'Population growth trends', 'Population composition refers to the structural characteristics of a population including'],
                  hint: 'Review Class 10 Economics Ch2 (Sectors of the Indian Economy) for sector definitions and Class 11.',
                  misconception: 'Students equate "tertiary sector growth" with "development" and assume all service jobs are high-productivity.' }
          ],
            remediations: { 'students-equate-tertiary-sector-growth': { steps: ['Plot state-wise scatter of % workforce in primary vs per capita NSDP (2011 Census + State GDP) — observe the outlier.', 'Overlay NSSO 68th Round (2011-12) usual status workforce data on the same graph — note the "hump" in primary sector for.', 'Read the "Economic Survey 2019-20, Chapter 4" box on "The Missing Middle" — it explains why manufacturing employment.', 'Re-attempt Diagnostic Q2 and Q5 with this evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_16_006', difficulty: 'standard',
          question: 'Demographic Transition Theory (DTT) is a model describing the historical shift.',
          hint: 'Revisit c11_geo_cbse_16_002 worked examples on calculating decadal growth rates and.',
          misconception: 'Students believe demographic transition is automatic and uniform—once a country reaches a certain GDP per capita, birth.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Demographic Transition Theory (DTT) is a model describing the historical shift in a',
                  options: ['Demographic Transition Theory (DTT) is a model describing the historical shift in a', 'Population distribution refers to the spatial pattern of where people live across India\'s', 'Population growth trends', 'Population composition refers to the structural characteristics of a population including'],
                  hint: 'Revisit c11_geo_cbse_16_002 worked examples on calculating decadal growth rates and CBR/CDR from.',
                  misconception: 'Students believe demographic transition is automatic and uniform—once a country reaches a certain GDP per capita, birth rates inevitably.' }
          ],
            remediations: { 'demographic-transition-is-automatic-and': { steps: ['Plot CBR, CDR, NIR for 5 Indian states (Kerala, Tamil Nadu, Gujarat, Bihar, UP) from SRS 2019 on a single.', 'Overlay female literacy and urbanization %—identify which correlate tighter with CBR decline.', 'Read NFHS-5 state factsheets for "unmet need for family planning" and "median age at first marriage"—connect unmet need.', 'Re-attempt Diagnostic Q4 with this evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
