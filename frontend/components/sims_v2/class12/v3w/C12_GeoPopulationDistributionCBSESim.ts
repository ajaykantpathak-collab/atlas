import type { SimDef } from '../../engine/types';
import C12_GeoPopulationDistributionCBSESim from '../../../simulations/c6_12_new/C12_GeoPopulationDistributionCBSESim';

/** v3 wrapped master — C12_GeoPopulationDistributionCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_geopopulationdistributioncbsesim: SimDef = {
    id: 'v3w_c12_geopopulationdistributioncbsesim',
    title: 'World Population Distribution: Patterns and Factors',
    subtitle: 'Covers global patterns of population distribution, the 10 most populous countries (6 in.',
    classLevel: 12, subject: 'science', topic: 'World Population Distribution: Patterns and Factors',
    chapters: [],
    nodeIds: ['c12_geo_cbse_02_001', 'c12_geo_cbse_02_002', 'c12_geo_cbse_02_003', 'c12_geo_cbse_02_004', 'c12_geo_cbse_02_007', 'c12_geo_cbse_02_009', 'c12_geo_cbse_02_010', 'c12_geo_cbse_09_001', 'c12_geo_cbse_09_002', 'c12_geo_cbse_09_003', 'c12_geo_cbse_09_006', 'c12_geo_cbse_09_007', 'c12_geo_cbse_09_008', 'c12_geo_cbse_09_011', 'c12_geo_cbse_05_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Begin by asking students to observe a night-time satellite image of Earth — bright clusters reveal where.', goal: 'Master World Population Distribution: Patterns and Factors.' },
    discovery: {
        question: 'Define crude population density and give its formula with units.',
        options: ['Crude population density = Total population / Total land area', 'high crude density = high population pressure everywhere', '"high crude density = high population pressure everywhere'],
        answer: 'Crude population density = Total population / Total land area',
        hook: 'Students often think "high crude density = high population pressure everywhere." They forget that crude density.',
    },
    teaching: [
        { title: 'World population distribution refers to the.', text: 'World population distribution refers to the spatial arrangement of human populations across Earth\'s surface, characterized by extreme unevenness where approximately 90% of the global population.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_geo_cbse_02_001', title: 'World population distribution refers to.',
          scaffold: { problem: 'Using the NCERT statement that "90% of world population lives in 10% of land area," estimate the average population density of the.',
            steps: [
            { text: 'Calculate total world land area = 148 million sq km. Inhabited area (10%) = 14.8 million sq km.' },
            { text: 'Calculate population in inhabited area = 90% of 8 billion = 7.2 billion.' },
            { text: 'Density of inhabited 10% = 7.2 billion / 14.8 million sq km ≈ 486 persons/sq km.' },
            { text: 'Compare: Inhabited zone density is ~80 times higher than uninhabited zone. This quantifies the extreme unevenness.' },
            { text: 'Geographical interpretation: The 10% corresponds to ecumene — river plains (Ganga, Yangtze, Nile, Mississippi), coastal.', faded: true, blankAnswer: 'Inhabited 10% density ≈ 486 persons/sq km; Uninhabited 90%.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_02_002', title: 'Population density is the ratio of.',
          scaffold: { problem: 'Using Census 2011 data, State A has total population 72 million, total area 192,000 sq km, net cultivable area 96,000 sq km, and.',
            steps: [
            { text: 'Identify given values: P_total = 72,000,000; A_total = 192,000 sq km; A_cultivable = 96,000 sq km; P_agri = 24,000,000.' },
            { text: 'Compute crude density = 72,000,000 / 192,000 = 375 persons/sq km.' },
            { text: 'Compute physiological density = 72,000,000 / 96,000 = 750 persons/sq km.' },
            { text: 'Compute agricultural density = 24,000,000 / 96,000 = 250 farmers/sq km.' },
            { text: 'Compare: Physiological density (750) is double crude density, showing high pressure on farmland.', faded: true, blankAnswer: 'Crude = 375 persons/sq km; Physiological = 750 persons/sq.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_02_003', title: 'Geographical factors affecting.',
          scaffold: { problem: 'A student claims "The Thar Desert has flat land, so it should be densely populated like the Ganga Plains." Using geographical factors,.',
            steps: [
            { text: 'Identify the student\'s claim — focuses only on landform (flat = good for settlement).' },
            { text: 'Recall the four geographical factors: water, landform, climate, soil.' },
            { text: 'Analyze Thar Desert using each factor: (a) Water: <250 mm rainfall, no perennial rivers, deep saline groundwater —.' },
            { text: 'Compare with Ganga Plains: (a) Water: 1000–2000 mm + perennial rivers + shallow groundwater. (b) Landform: flat.' },
            { text: 'Conclude: Landform is necessary but not sufficient; water is the limiting factor in Thar.', faded: true, blankAnswer: 'The claim is flawed because it ignores water, climate, and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_02_004', title: 'Economic factors (mineral deposits,.',
          scaffold: { problem: 'Singrauli (Madhya Pradesh/Uttar Pradesh border) was a forested, sparsely populated region until the 1960s.',
            steps: [
            { text: 'Identify the initial economic trigger — discovery of large coal reserves (Mahan, Singrauli, Moher basins) in a region.' },
            { text: 'Link to industrialization — coal attracted pithead thermal power plants (NTPC: Singrauli, Rihand, Vindhyachal) because.' },
            { text: 'Trace urbanization — each plant created a township (Shaktinagar, Bijpur, Renukoot) with housing, schools, hospitals,.' },
            { text: 'Map migrant flows — skilled workers from across India (engineers, technicians), semi-skilled from nearby states (Bihar,.' },
            { text: 'Note social infrastructure feedback — townships developed better education/health than surrounding villages, becoming.' },
            { text: 'Contrast with surroundings — 20 km away, villages remain sparse with subsistence agriculture; the sharp boundary proves.', faded: true, blankAnswer: 'Singrauli\'s density is an economic artifact: coal → pithead.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_02_007', title: 'Population composition refers to the.',
          scaffold: { problem: 'According to Census 2011, Kerala had 17,378,649 males and 18,282,492 females. Calculate Kerala\'s sex ratio.',
            steps: [
            { text: 'Write the Indian sex-ratio formula: Sex Ratio = (Females / Males) × 1,000.' },
            { text: 'Substitute Kerala\'s numbers: (18,282,492 / 17,378,649) × 1,000.' },
            { text: 'Perform division: 18,282,492 ÷ 17,378,649 = 1.0520 (approx).' },
            { text: 'Multiply by 1,000: 1.0520 × 1,000 = 1,052 females per 1,000 males.' },
            { text: 'Youth Dependency Ratio = (0-14 population / 15-59 population) × 100 = (5,500,000 / 22,000,000) × 100 = 0.25 × 100 = 25.' },
            { text: 'Interpret: Kerala\'s sex ratio > 1,000 indicates female majority; youth dependency ratio of 25 means 25 children per 100.', faded: true, blankAnswer: 'Sex Ratio = 1,052 females per 1,000 males; Youth Dependency.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_02_009', title: 'Occupational structure refers to the.',
          scaffold: { problem: 'A district in Maharashtra has 2.4 lakh total workers. Census 2011 shows: Cultivators 72,000; Agricultural laborers 48,000; Household.',
            steps: [
            { text: 'Identify Census categories — Cultivators + Agricultural laborers = Primary (1,20,000).' },
            { text: 'Calculate percentages — Primary = (1,20,000/2,40,000)×100 = 50%. Secondary = (12,000/2,40,000)×100 = 5%.' },
            { text: 'Project SEZ impact — 15% of agricultural workers = 0.15 × 1,20,000 = 18,000 workers shift from Primary to Secondary.' },
            { text: 'New counts — Primary = 1,20,000 - 18,000 = 1,02,000. Secondary = 12,000 + 18,000 = 30,000.' },
            { text: 'New percentages — Primary = 42.5%. Secondary = 12.5%. Tertiary = 45%.', faded: true, blankAnswer: 'Current: Primary 50%, Secondary 5%, Tertiary 45%. Post-SEZ.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_geo_cbse_02_002', title: 'Identify each idea',
          dissect: { specimen: 'World Population Distribution: Patterns and Factors', spots: [
            { id: 's1', label: 'World population distribution refers to', prompt: 'Which idea is this? — World population distribution refers to the spatial arrangement of human populations.', answer: 'World population distribution refers to', options: ['World population distribution refers to', 'Population density is the ratio', 'Geographical factors affecting population distribution', 'Economic factors mineral deposits industrialization'] },
            { id: 's2', label: 'Population density is the ratio', prompt: 'Which idea is this? — Population density is the ratio of human population to land area, expressed as persons.', answer: 'Population density is the ratio', options: ['Population density is the ratio', 'World population distribution refers to', 'Geographical factors affecting population distribution', 'Economic factors mineral deposits industrialization'] },
            { id: 's3', label: 'Geographical factors affecting population distribution', prompt: 'Which idea is this? — Geographical factors affecting population distribution refer to the natural environmental.', answer: 'Geographical factors affecting population distribution', options: ['Geographical factors affecting population distribution', 'World population distribution refers to', 'Population density is the ratio', 'Economic factors mineral deposits industrialization'] },
            { id: 's4', label: 'Economic factors mineral deposits industrialization', prompt: 'Which idea is this? — Economic factors (mineral deposits, industrialization, urbanization) and social-cultural.', answer: 'Economic factors mineral deposits industrialization', options: ['Economic factors mineral deposits industrialization', 'World population distribution refers to', 'Population density is the ratio', 'Geographical factors affecting population distribution'] },
            { id: 's5', label: 'Population composition refers to the', prompt: 'Which idea is this? — Population composition refers to the structural characteristics of a population,.', answer: 'Population composition refers to the', options: ['Population composition refers to the', 'World population distribution refers to', 'Population density is the ratio', 'Geographical factors affecting population distribution'] },
            { id: 's6', label: 'Occupational structure refers to the', prompt: 'Which idea is this? — Occupational structure refers to the distribution of the working population across.', answer: 'Occupational structure refers to the', options: ['Occupational structure refers to the', 'World population distribution refers to', 'Population density is the ratio', 'Geographical factors affecting population distribution'] }
          ] } }
    ],
    explore: { component: C12_GeoPopulationDistributionCBSESim, prompt: 'Explore the interactive — World Population Distribution: Patterns and Factors' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_02_001', difficulty: 'standard',
          question: 'World population distribution refers to the spatial arrangement of human.',
          hint: 'If unable to visualize global patterns, revisit c11_geo_cbse_09_001 (Physiographic.',
          misconception: 'Students conflate "population distribution" (the spatial pattern — where people live) with "population density" (the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'World population distribution refers to the spatial arrangement of human populations',
                  options: ['World population distribution refers to the spatial arrangement of human populations', 'Population density is the ratio of human population to land area, expressed as persons', 'Geographical factors affecting population distribution refer to the natural environmental', 'Economic factors (mineral deposits, industrialization, urbanization) and social-cultural'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate "population distribution" (the spatial pattern — where people live) with "population density" (the ratio — people per sq.' }
          ],
            remediations: { 'students-conflate-population-distribution-the': { steps: ['Revisit c11_geo_cbse_16_001 (India\'s population distribution) and explicitly map the terms "distribution" (pattern on.', 'Use a world population cartogram (area rescaled by population) alongside a standard map to visually grasp the 90/10.', 'Practice calculating density for two Indian states (e.g., Bihar vs.', 'Update the "top ten populous countries" list using latest UN data (2023/2024) to correct the static textbook list.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_02_002', difficulty: 'standard',
          question: 'Population density is the ratio of human population to land area, expressed as.',
          hint: 'If stuck, review c11_geo_cbse_16_001 (basic density) and c11_geo_cbse_18_001 (land‑use.',
          misconception: 'Students often think "high crude density = high population pressure everywhere." They forget that crude density.',
          parts: [
                { id: 'a', prompt: 'Define crude population density and give its formula with units.', answer: 'Crude population density = Total population / Total land area',
                  options: ['Crude population density = Total population / Total land area', 'high crude density = high population pressure everywhere', '"high crude density = high population pressure everywhere'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "high crude density = high population pressure everywhere." They forget that crude density includes mountains,.' },
                { id: 'b', prompt: 'Calculate the crude, physiological, and agricultural densities for a hypothetical region with: total population 12 million, total area 40,000 sq km, net.', answer: 'Step 1: Crude density = 12,000,000 / 40,000 = 300 persons/sq km',
                  options: ['Step 1: Crude density = 12,000,000 / 40,000 = 300 persons/sq km', 'high crude density = high population pressure everywhere', '"high crude density = high population pressure everywhere'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "high crude density = high population pressure everywhere." They forget that crude density includes mountains,.' }
          ],
            remediations: { 'high-crude-density-high-population': { steps: ['Revisit c11_geo_cbse_16_001 (Population: Distribution and Density in India) to recall how density was introduced.', 'Draw a simple map of India shading only cultivable land; calculate physiological density for two contrasting states.', 'Rajasthan) using Census data.', 'Re‑attempt Diagnostic Question 3 with the new numbers to verify understanding.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "high crude density = high population pressure everywhere." They forget that crude density.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "A country with high agricultural density always has low agricultural productivity." Provide a reasoned judgment.', answer: 'Not necessarily',
                  options: ['Not necessarily', 'high crude density = high population pressure everywhere', '"high crude density = high population pressure everywhere'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "high crude density = high population pressure everywhere." They forget that crude density includes mountains,.' }
          ],
            remediations: { 'high-crude-density-high-population': { steps: ['Revisit c11_geo_cbse_16_001 (Population: Distribution and Density in India) to recall how density was introduced.', 'Draw a simple map of India shading only cultivable land; calculate physiological density for two contrasting states.', 'Rajasthan) using Census data.', 'Re‑attempt Diagnostic Question 3 with the new numbers to verify understanding.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_02_003', difficulty: 'standard',
          question: 'Geographical factors affecting population distribution refer to the natural.',
          hint: 'If stuck, revisit c11_geo_cbse_09_003 (Northern Plains formation) and c11_geo_cbse_12_004.',
          misconception: 'Students think "flat land = high population" universally. They cite the Indo-Gangetic plain but miss counterexamples:.',
          parts: [
                { id: 'a', prompt: 'Given: Region A has 500 mm annual rainfall, sandy soil, summer temperatures of 45°C, and flat terrain.', answer: 'Region B',
                  options: ['Region B', 'flat land = high population', '"flat land = high population" universally'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "flat land = high population" universally. They cite the Indo-Gangetic plain but miss counterexamples: (1) Siberian plains.' }
          ],
            remediations: { 'flat-land-high-population-universally': { steps: ['Revisit c11_geo_cbse_16_001 (Population Distribution and Density in India) — identify how water, landform, climate,.', 'Use a physical map of India + population density map side-by-side; trace 5 high-density and 5 low-density areas,.', 'Re-attempt Diagnostic Question 3 — if still wrong, watch a 10-min video on "Factors Affecting Population Distribution".'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_02_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "flat land = high population" universally. They cite the Indo-Gangetic plain but miss counterexamples:.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Technological advancements (e.g., desalination, air conditioning, greenhouses) have made geographical factors irrelevant for modern.', answer: 'Statement is false',
                  options: ['Statement is false', 'flat land = high population', '"flat land = high population" universally'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "flat land = high population" universally. They cite the Indo-Gangetic plain but miss counterexamples: (1) Siberian plains.' }
          ],
            remediations: { 'flat-land-high-population-universally': { steps: ['Revisit c11_geo_cbse_16_001 (Population Distribution and Density in India) — identify how water, landform, climate,.', 'Use a physical map of India + population density map side-by-side; trace 5 high-density and 5 low-density areas,.', 'Re-attempt Diagnostic Question 3 — if still wrong, watch a 10-min video on "Factors Affecting Population Distribution".'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_02_004', difficulty: 'standard',
          question: 'Economic factors (mineral deposits, industrialization, urbanization) and.',
          hint: 'If stuck on why industries cluster despite poor geography, revisit c10_geo_cbse_06_007.',
          misconception: 'Students think economic factors only mean "industries give jobs" and social factors only mean "religion." They miss.',
          parts: [
                { id: 'a', prompt: 'Name two economic factors and two social-cultural factors that influence population distribution, giving one global example for each.', answer: 'Economic: (1) Mineral deposits',
                  options: ['Economic: (1) Mineral deposits', 'industries give jobs', 'religion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think economic factors only mean "industries give jobs" and social factors only mean "religion." They miss that urbanization pulls.' },
                { id: 'b', prompt: 'Calculate the crude population density of Dhanbad district (area 2,052 sq km, population 2.68 million, 2011 Census).', answer: 'Density = 2,680,000 / 2,052 ≈ 1,306 persons/sq km',
                  options: ['Density = 2,680,000 / 2,052 ≈ 1,306 persons/sq km', 'industries give jobs', 'religion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think economic factors only mean "industries give jobs" and social factors only mean "religion." They miss that urbanization pulls.' }
          ],
            remediations: { 'economic-factors-only-mean-industries': { steps: ['Revisit c10_geo_cbse_06_007 (Industrial Location Factors) to recall how raw material, labor, market, transport, and.', 'Re-read NCERT Chapter 2 "Economic Factors" and "Social and Cultural Factors" paragraphs — underline each distinct.', 'Draw a two-column table: Column A = Factor, Column B = Indian Example, Column C = Global Example.', 'Re-attempt Diagnostic Q2 and Q4 — they test the exact linkage.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_02_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think economic factors only mean "industries give jobs" and social factors only mean "religion." They miss.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Government incentives to settle sparsely populated areas (e.g., India\'s North-East, Brazil\'s Amazon) have successfully redistributed.', answer: 'Largely unsuccessful',
                  options: ['Largely unsuccessful', 'industries give jobs', 'religion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think economic factors only mean "industries give jobs" and social factors only mean "religion." They miss that urbanization pulls.' },
                { id: 'b', prompt: 'Design a annotated sketch map (mental or paper) showing how economic and social factors create a "population island" in an otherwise sparse region.', answer: 'A good sketch shows: (1) Mineral belt as linear/clustered nodes',
                  options: ['A good sketch shows: (1) Mineral belt as linear/clustered nodes', 'industries give jobs', 'religion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think economic factors only mean "industries give jobs" and social factors only mean "religion." They miss that urbanization pulls.' }
          ],
            remediations: { 'economic-factors-only-mean-industries': { steps: ['Revisit c10_geo_cbse_06_007 (Industrial Location Factors) to recall how raw material, labor, market, transport, and.', 'Re-read NCERT Chapter 2 "Economic Factors" and "Social and Cultural Factors" paragraphs — underline each distinct.', 'Draw a two-column table: Column A = Factor, Column B = Indian Example, Column C = Global Example.', 'Re-attempt Diagnostic Q2 and Q4 — they test the exact linkage.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_02_007', difficulty: 'standard',
          question: 'Population composition refers to the structural characteristics of a.',
          hint: 'If stuck, review the CBR/CDR formulas and the Demographic Transition Model.',
          misconception: 'Students often believe **sex ratio is always expressed as females per 100 males** (the international demographic.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Population composition refers to the structural characteristics of a population,',
                  options: ['Population composition refers to the structural characteristics of a population,', 'World population distribution refers to the spatial arrangement of human populations', 'Population density is the ratio of human population to land area, expressed as persons', 'Geographical factors affecting population distribution refer to the natural environmental'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe **sex ratio is always expressed as females per 100 males** (the international demographic convention) and apply it.' }
          ],
            remediations: { 'sex-ratio-is-always-expressed': { steps: ['Revisit **c11_geo_cbse_16_003** (Population Composition: Age Structure, Sex Ratio and Literacy) — focus on the Indian.', 'Practice drawing **three population pyramids** from scratch: one expansive (Nigeria), one constrictive (Japan), one.', 'Use the **Census 2011 Primary Census Abstract** for your state: compute sex ratio for 5 districts, then compute youth.', 'Re-attempt Diagnostic Questions 3 and 4.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_02_009', difficulty: 'standard',
          question: 'Occupational structure refers to the distribution of the working population.',
          hint: 'If stuck on sectoral classification, revisit c11_geo_cbse_16_005 and NIC-2008 1-digit.',
          misconception: 'Students equate "tertiary sector growth" with "economic development" and assume any rise in services share indicates.',
          parts: [
                { id: 'a', prompt: 'Using the data below for Country X (2021 Census), calculate the percentage of workforce in each sector and identify which stage of the Clark-Fisher model it.', answer: 'Step 1: Calculate percentages',
                  options: ['Step 1: Calculate percentages', 'Stage 3'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "tertiary sector growth" with "economic development" and assume any rise in services share indicates progress.' },
                { id: 'b', prompt: 'Compare the occupational structure trajectories of India (1951: Primary 72%, Secondary 11%, Tertiary 17%; 2021: Primary 42%, Secondary 25%, Tertiary 33%) and.', answer: 'India\'s secondary sector peaked at ~26% (2012) then stagnated — premature',
                  options: ['India\'s secondary sector peaked at ~26% (2012) then stagnated — premature', 'lack of skills'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "tertiary sector growth" with "economic development" and assume any rise in services share indicates progress.' }
          ],
            remediations: { 'students-equate-tertiary-sector-growth': { steps: ['Revisit c11_geo_cbse_16_005 (Occupational Structure of Population) — recreate the primary/secondary/tertiary.', 'Plot India\'s sectoral shares (1951, 1991, 2011, 2021) on a ternary diagram (triangular graph) — visualize the.', 'Compare with South Korea\'s ternary plot (same years) — note the "manufacturing bulge" India lacks.', 'Take PLFS 2022-23 unit-level data (available on MOSPI) — filter for "usual status workers" and cross-tabulate sector.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_02_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "tertiary sector growth" with "economic development" and assume any rise in services share indicates.',
          parts: [
                { id: 'a', prompt: 'Compare the occupational structure trajectories of India (1951: Primary 72%, Secondary 11%, Tertiary 17%; 2021: Primary 42%, Secondary 25%, Tertiary 33%) and.', answer: 'India\'s secondary sector peaked at ~26% (2012) then stagnated — premature',
                  options: ['India\'s secondary sector peaked at ~26% (2012) then stagnated — premature', 'lack of skills'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "tertiary sector growth" with "economic development" and assume any rise in services share indicates progress.' }
          ],
            remediations: { 'students-equate-tertiary-sector-growth': { steps: ['Revisit c11_geo_cbse_16_005 (Occupational Structure of Population) — recreate the primary/secondary/tertiary.', 'Plot India\'s sectoral shares (1951, 1991, 2011, 2021) on a ternary diagram (triangular graph) — visualize the.', 'Compare with South Korea\'s ternary plot (same years) — note the "manufacturing bulge" India lacks.', 'Take PLFS 2022-23 unit-level data (available on MOSPI) — filter for "usual status workers" and cross-tabulate sector.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
