import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch09_p1: SimDef = {
    id: 'v3_c12_geo_ch09_p1',
    title: 'Population: Distribution, Density, Growth · Part 1/2',
    subtitle: 'The biggest state isn\'t the most crowded — the map\'s favourite trap',
    classLevel: 12, subject: 'geography', topic: 'Population: Distribution, Density, Growth · Part 1/2',
    chapters: ['c12_geo_ch09'],
    nodeIds: ['c12_geo_cbse_09_001', 'c12_geo_cbse_09_002', 'c12_geo_cbse_09_003', 'c12_geo_cbse_09_004', 'c12_geo_cbse_09_005', 'c12_geo_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Population analyst', intro: 'One in six Indians lives in UP. One in nine hundred in Arunachal. The map of where we live is a story of rivers, canals and mines.', goal: 'Explain India\'s population distribution — its physical template and socio-economic rewrites — and separate distribution from density.' },
    discovery: {
        question: 'UP holds 16.5% of India\'s people — but on density it trails Bihar, West Bengal and Kerala. How can the \'most populated\' state not be the most crowded?',
        options: ['Distribution ≠ density — UP\'s share is absolute numbers over area; density is the ratio, and smaller states can pack tighter', 'Data error', 'UP is actually densest', 'Area cancels out'],
        answer: 'Distribution ≠ density — UP\'s share is absolute numbers over area; density is the ratio, and smaller states can pack tighter',
        hook: 'India\'s dark patches sit on alluvium and water — the Indo-Gangetic template — but human intervention redrafts the map: the Indira Gandhi Canal lights up the Thar, Jharkhand\'s minerals pull workers to rock. Physical factors set the board; history and development move the pieces.',
    },
    teaching: [
        { title: 'India\'s Population: Distribution and Spatial Patterns', text: 'Population distribution refers to the spatial pattern of where people live across a geographic area, expressed as the arrangement or spread of population across the territory of India.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_09_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read India\'s population map like a demographer: explain why four states carry ~42% of the nation, why Rajasthan\'s clusters are \'induced\' while Kerala\'s are natural, and when socio-economics overrules terrain.',
        labels: ['India\'s Population: Distribution', 'Population Density in India', 'Factors Affecting Population Distribution', 'Population Growth in India', 'Demographic Transition in India', 'Population Composition: Age Structure'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_09_002', title: 'Population Density in India: Variations Across States',
          scaffold: { problem: 'Using 2011 Census data, calculate the arithmetic density for Bihar (population 104 million, area 94,163 km²) and compare it with India\'s.',
            steps: [
            { text: 'Identify the formula for arithmetic density: Density = Population / Area.' },
            { text: 'Insert Bihar\'s values: Population = 104,000,000; Area = 94,163 km².' },
            { text: 'Perform division: 104,000,000 / 94,163 ≈ 1,104 persons/km² (matches Census 1,102 closely; rounding differences).' },
            { text: 'Compare with national density (382): Bihar\'s density is nearly 2.9 times the national average.' },
            { text: 'Interpret: Such high density in a predominantly agrarian state (Bihar has low urbanisation) implies extreme pressure.', faded: true, blankAnswer: 'Bihar\'s arithmetic density ≈ 1,104 persons/km² (2.9.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_09_003', title: 'Factors Affecting Population Distribution in India',
          caseStudy: { intro: 'Begin by showing the student Figure 1.1 (India – Distribution of Population) from the NCERT textbook.',
            decisions: [{ prompt: 'Name the three broad categories of factors that determine the uneven spatial distribution of population in India as per the NCERT textbook.', options: [
                { text: 'The three broad categories are: (1) Physical factors (climate, terrain, availability of', outcome: 'The three broad categories are: (1) Physical factors (climate, terrain, availability of water), (2).' },
                { text: 'rainfall and soil', outcome: 'Not quite — Students often believe that "high population density = high rainfall area" and "low population.', reveals: 'high-population-density-high-rainfall' },
                { text: 'government policy', outcome: 'Not quite — Students often believe that "high population density = high rainfall area" and "low population.', reveals: 'high-population-density-high-rainfall' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_09_004', title: 'Population Growth in India: Trends Since 1901',
          scaffold: { problem: 'The 1941 census recorded India\'s population as 318,660,580. The 1951 census recorded 361,088,090.',
            steps: [
            { text: 'Identify P1 = 318,660,580 (1941), P2 = 361,088,090 (1951).' },
            { text: 'Compute absolute increase = P2 - P1 = 42,427,510.' },
            { text: 'Divide by P1: 42,427,510 / 318,660,580 = 0.1331.' },
            { text: 'Multiply by 100 = 13.31% (matches Table 1.1).' },
            { text: 'Compare with phase thresholds: Phase II (1921-1951) shows 11-14% growth. This decade falls in Phase II.' },
            { text: 'Context: Post-WWII, early planning, mortality declining due to disease control (malaria, smallpox), birth rate still.', faded: true, blankAnswer: '13.31%, Phase II (steady growth), driven by falling death.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_09_005', title: 'Demographic Transition in India: Phases and Characteristics',
          scaffold: { problem: 'The 2011 Census reports India\'s CBR = 21.8 and CDR = 7.1. Calculate the natural annual growth rate and estimate the population doubling.',
            steps: [
            { text: 'Recall natural growth rate formula = CBR - CDR (both per 1000)' },
            { text: 'Compute natural growth rate = 21.8 - 7.1 = 14.7 per 1000 = 1.47% per annum' },
            { text: 'Apply doubling time approximation = 70 / 1.47 ≈ 47.6 years' },
            { text: 'Compute implied decadal growth from annual rate = (1.0147)^10 - 1 = 1.157 - 1 = 15.7%' },
            { text: 'Compare with actual 17.64% — difference = 1.94 percentage points' },
            { text: 'Explain difference: Natural growth excludes net migration; India had positive net migration (Tibetans, Bangladeshis.', faded: true, blankAnswer: 'Natural annual growth rate = 1.47%; Doubling time ≈ 48.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_09_006', title: 'Population Composition: Age Structure and Sex Ratio in India',
          scaffold: { problem: '** Using Census 2011 data, Kerala’s population: 0–14 = 5.7 million, 15–59 = 22.1 million, 60+ = 5.2 million.',
            steps: [
            { text: 'Identify working-age denominator (15–59) for each state from given data.' },
            { text: 'Apply total dependency formula: (0–14 + 60+) / (15–59) × 100.' },
            { text: 'Kerala: (5.7 + 5.2) / 22.1 × 100 = 10.9 / 22.1 × 100 = **49.3**.' },
            { text: 'Compare — Kerala’s dependency is 40% lower; its workforce supports fewer dependents, freeing resources for.' },
            { text: 'Verify — Kerala’s low fertility (TFR 1.8) shrinks base; Bihar’s high fertility (TFR 3.4) widens base.', faded: true, blankAnswer: '** Kerala total dependency = 49.3; Bihar = 82.1 dependents.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate\'s infographic on Indian population density declares Uttar Pradesh \'the most crowded state because it has India\'s biggest population\', and uses five equal-width colour classes from 17 to 11,297 persons per sq km — leaving almost every state the same colour.',
            decisions: [{ prompt: 'What corrections does this chapter demand?', options: [
                { text: 'Two fixes — density is persons per unit area, not total population, so Bihar, West Bengal and Kerala outrank UP and Delhi (11,297) dwarfs all states; and an outlier like Delhi needs its own class or inset, or equal intervals flatten every real difference.', outcome: 'The chapter separates arithmetic density from population size and warns that classification schemes decide whether a map informs or misleads — an extreme value can\'t share a linear scale.' },
                { text: 'Keep it — biggest population does mean most crowded; density is just population restated.', outcome: 'That\'s the exact misconception the chapter names: UP\'s 828/km² sits below Bihar\'s 1,102 and far below Delhi; size and crowding measure different things.', reveals: 'size-equals-crowding' },
                { text: 'Report physiological density instead so farmland pressure is captured accurately for every state.', outcome: 'Physiological density answers a different question — pressure on cultivated land — and needs net-cultivated-area data the map doesn\'t have; the fix for this graphic is better classes and outlier handling, not a different indicator.', reveals: 'physiological-fixes-mapping' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now argue India\'s population pattern with both physical and human causes — and never confuse share with density again.',
            decisions: [{ prompt: 'What comes next? Population: Distribution, Density, Growth · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Population: Distribution, Density, Growth · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_09_001', difficulty: 'standard',
          question: 'Population distribution refers to the spatial pattern of where people live.',
          hint: 'If unable to link physical features to population patterns, revisit c11_geo_cbse_09_003.',
          misconception: 'Students conflate "population distribution" (WHERE people live — spatial pattern) with "population density" (HOW MANY.',
          parts: [
                { id: 'a', prompt: 'Compare the population distribution pattern of Rajasthan and Kerala.', answer: 'Correct answer: Rajasthan',
                  options: ['Correct answer: Rajasthan', 'high rainfall areas', 'developed states'],
                  hint: 'If unable to link physical features to population patterns, revisit c11_geo_cbse_09_003 (Northern.',
                  misconception: 'Students conflate "population distribution" (WHERE people live — spatial pattern) with "population density" (HOW MANY people per sq.' }
          ],
            remediations: { 'students-conflate-population-distribution-where': { steps: ['Revisit c11_geo_cbse_16_001 (Class 11 Population Distribution and Density) — specifically the distinction between.', 'Take a blank outline map of India. Shade the top 5 states by TOTAL POPULATION (absolute numbers) in RED.', 'Write one sentence explaining why UP is red but not blue, and why Delhi is blue but not red.', 'Re-attempt Diagnostic Questions 1 and 3. If still confused, create a 2-column table: Column A = Distribution indicators.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate "population distribution" (WHERE people live — spatial pattern) with "population density" (HOW MANY.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Uneven population distribution in India is primarily a result of physical factors; socio-economic factors play only a minor modifying.', answer: 'Correct evaluation: The statement is PARTIALLY CORRECT but incomplete',
                  options: ['Correct evaluation: The statement is PARTIALLY CORRECT but incomplete', 'physical factors are everything', 'socio-economic factors dominate'],
                  hint: 'If unable to link physical features to population patterns, revisit c11_geo_cbse_09_003 (Northern.',
                  misconception: 'Students conflate "population distribution" (WHERE people live — spatial pattern) with "population density" (HOW MANY people per sq.' }
          ],
            remediations: { 'students-conflate-population-distribution-where': { steps: ['Revisit c11_geo_cbse_16_001 (Class 11 Population Distribution and Density) — specifically the distinction between.', 'Take a blank outline map of India. Shade the top 5 states by TOTAL POPULATION (absolute numbers) in RED.', 'Write one sentence explaining why UP is red but not blue, and why Delhi is blue but not red.', 'Re-attempt Diagnostic Questions 1 and 3. If still confused, create a 2-column table: Column A = Distribution indicators.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_09_002', difficulty: 'standard',
          question: 'Population density is the number of persons living per unit area (usually per.',
          hint: 'If stuck, review the "Density of Population" section in Class 11 NCERT (Chapter 16) and.',
          misconception: 'Students often equate "high population density" with "high total population" and think Uttar Pradesh (largest.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Population density is the number of persons living per unit area (usually per square',
                  options: ['Population density is the number of persons living per unit area (usually per square', 'Population distribution refers to the spatial pattern of where people live across a', 'Factors affecting population distribution in India refer to the physical (climate,', 'Population growth in India'],
                  hint: 'If stuck, review the "Density of Population" section in Class 11 NCERT (Chapter 16) and practise.',
                  misconception: 'Students often equate "high population density" with "high total population" and think Uttar Pradesh (largest population) must have the.' }
          ],
            remediations: { 'students-often-equate-high-population': { steps: ['Revisit c11_geo_cbse_16_001 (Population: Distribution and Density in India) to reinforce the definition and formula.', 'On a physical map of India, shade the Northern Plains, Coastal Plains, and Thar Desert; annotate each with density.', 'Calculate physiological density for your own state using net sown area data from the Agricultural Census.', 'Re-attempt Diagnostic Question 3 with your state\'s data to internalise the difference.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_09_003', difficulty: 'standard',
          question: 'Factors affecting population distribution in India refer to the physical.',
          hint: 'If stuck, revisit Class 11 nodes on India\'s physical geography (c11_geo_cbse_09_001.',
          misconception: 'Students often believe that "high population density = high rainfall area" and "low population density = low rainfall.',
          parts: [
                { id: 'a', prompt: 'Explain why the North Indian Plains have a higher proportion of population than the interior districts of the Deccan Plateau, even though both regions have.', answer: 'The North Indian Plains offer a combination of flat terrain (easy settlement and',
                  options: ['The North Indian Plains offer a combination of flat terrain (easy settlement and', 'better soil in the plains', 'high population density = high rainfall area', 'low population density = low rainfall area'],
                  hint: 'If stuck, revisit Class 11 nodes on India\'s physical geography (c11_geo_cbse_09_001.',
                  misconception: 'Students often believe that "high population density = high rainfall area" and "low population density = low rainfall area" as a universal.' },
                { id: 'b', prompt: 'Using the concept of "resource development altering population distribution," explain the change in population density in Rajasthan and Jharkhand over the last.', answer: 'Step 1: Identify the original physical constraint',
                  options: ['Step 1: Identify the original physical constraint', 'Rajasthan\'s density increased', 'Jharkhand\'s density increased due to fertile soil', 'high population density = high rainfall area'],
                  hint: 'If stuck, revisit Class 11 nodes on India\'s physical geography (c11_geo_cbse_09_001.',
                  misconception: 'Students often believe that "high population density = high rainfall area" and "low population density = low rainfall area" as a universal.' }
          ],
            remediations: { 'high-population-density-high-rainfall': { steps: ['Revisit Class 11 nodes on India\'s physical geography: c11_geo_cbse_09_001 (Physiographic Divisions).', 'Revisit Class 11 climate nodes: c11_geo_cbse_10_001 (Factors affecting climate), c11_geo_cbse_10_004 (Rainfall.', 'Do a map overlay exercise: Place a transparency of "Population Distribution (Fig 1.1)" over "Physical Map of India" and.', 'Identify 3 matches and 3 mismatches.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_09_004', difficulty: 'standard',
          question: 'Population growth in India since 1901 refers to the change in the total number.',
          hint: 'Review Class 11 node c11_geo_cbse_16_002 for definitions of birth rate, death rate, and.',
          misconception: 'Students often think "declining growth rate" means "population is decreasing." They confuse rate of growth with.',
          parts: [
                { id: 'a', prompt: 'What was the decadal growth rate of India\'s population during 1911-1921, and what does a negative value indicate about births and deaths in that decade?', answer: 'The decadal growth rate was -0.31%',
                  options: ['The decadal growth rate was -0.31%', 'growth was low but positive', 'declining growth rate', 'population is decreasing'],
                  hint: 'Review Class 11 node c11_geo_cbse_16_002 for definitions of birth rate, death rate, and natural.',
                  misconception: 'Students often think "declining growth rate" means "population is decreasing." They confuse rate of growth with absolute growth.' },
                { id: 'b', prompt: 'Using the formula \\( g = \\frac{P_2 - P_1}{P_1} \\times 100 \\), calculate the decadal growth rate for 1951-1961 from the census data: 1951 population.', answer: 'Step 1: Identify P1 = 361,088,090',
                  options: ['Step 1: Identify P1 = 361,088,090', 'declining growth rate', 'population is decreasing', '"declining growth rate" means "population is decreasing'],
                  hint: 'Review Class 11 node c11_geo_cbse_16_002 for definitions of birth rate, death rate, and natural.',
                  misconception: 'Students often think "declining growth rate" means "population is decreasing." They confuse rate of growth with absolute growth.' }
          ],
            remediations: { 'declining-growth-rate-means-population': { steps: ['Revisit c11_geo_cbse_16_002 (Class 11 Population Growth) to recompute absolute increases for each decade from Table 1.1.', 'Plot absolute increase vs. decadal growth rate on dual-axis graph — observe they diverge after 1981.', 'Explain in own words: "Rate fell but base grew, so absolute addition stayed high."', 'Re-attempt Diagnostic Question 5 with this visualization.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_09_005', difficulty: 'standard',
          question: 'Demographic Transition in India refers to the historical shift in population.',
          hint: 'If stuck on rate definitions, review Class 11 Geography Chapter 16 (c11_geo_cbse_16_002.',
          misconception: '**Specific Error:** Students believe "Demographic Transition Phase IV means India\'s population will soon stop growing".',
          parts: [
                { id: 'a', prompt: 'State the four phases of India\'s demographic transition with their respective time periods and the defining characteristic of each phase in terms of birth rate.', answer: '**Correct Answer:** Phase I (1901-1921): Stagnant growth',
                  options: ['**Correct Answer:** Phase I (1901-1921): Stagnant growth', 'Demographic Transition Phase IV means India\'s population will soon stop growing'],
                  hint: 'If stuck on rate definitions, review Class 11 Geography Chapter 16 (c11_geo_cbse_16_002 and.',
                  misconception: '**Specific Error:** Students believe "Demographic Transition Phase IV means India\'s population will soon stop growing" — they conflate.' },
                { id: 'b', prompt: 'Explain why the year 1921 is called the "Great Divide" in India\'s demographic history, and why the growth rate was negative during 1911-1921 despite high birth.', answer: '**Correct Answer:** 1921 is the "Great Divide"',
                  options: ['**Correct Answer:** 1921 is the "Great Divide"', '1921 is when birth rates started falling', 'Demographic Transition Phase IV means India\'s population will soon stop growing'],
                  hint: 'If stuck on rate definitions, review Class 11 Geography Chapter 16 (c11_geo_cbse_16_002 and.',
                  misconception: '**Specific Error:** Students believe "Demographic Transition Phase IV means India\'s population will soon stop growing" — they conflate.' }
          ],
            remediations: { 'specific-error-students-believe-demographic': { steps: ['**Step-by-Step Remediation:** 1.', '**Revisit Node c11_geo_cbse_16_006** (Class 11 Demographic Transition Theory) — specifically the 4-stage model diagram.', 'Draw it from memory, label CBR/CDR curves, then check against textbook.', '**Re-read NCERT Phase IV paragraph** (page 7): underline "growth rate...'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_09_006', difficulty: 'standard',
          question: 'Age structure refers to the proportional distribution of a population across.',
          hint: 'If pyramids or ratios feel shaky, re-do Class 11 Activity 3.2 (NCERT p.',
          misconception: 'Students frequently confuse **sex ratio** (females per 1,000 males) with **gender ratio** (a social-science term for.',
          parts: [
                { id: 'a', prompt: '**REMEMBER:** State the Census of India definition of sex ratio and give the all-India sex ratio figure as per Census 2011.', answer: '**Correct answer:** Sex ratio = (Number of females / Number of males) × 1,000',
                  options: ['**Correct answer:** Sex ratio = (Number of females / Number of males) × 1,000', 'males per 1,000 females', 'a declining child sex ratio is caused *only* by female infanticide'],
                  hint: 'If pyramids or ratios feel shaky, re-do Class 11 Activity 3.2 (NCERT p.',
                  misconception: 'Students frequently confuse **sex ratio** (females per 1,000 males) with **gender ratio** (a social-science term for power relations) and.' }
          ],
            remediations: { 'students-frequently-confuse-sex-ratio': { steps: ['Revisit **c11_geo_cbse_16_003** (Class 11 Population Composition) — re-plot the three age pyramids (expanding.', '3.3 and label dependency ratios.', 'Download Census 2011 C-13 table (single-year age data) for your state; compute youth/old-age dependency in Excel.', 'Watch the 12-min NCERT Official video "Population Composition – Age Structure & Sex Ratio" (YouTube: ncertofficial).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
