import type { SimDef } from '../../engine/types';
import C10_GeographyEnergyResourcesConventionalSim from '../../../simulations/c6_12/C10_GeographyEnergyResourcesConventionalSim';

/** v3 wrapped master — C10_GeographyEnergyResourcesConventionalSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_geographyenergyresourcesconventionalsim: SimDef = {
    id: 'v3w_c10_geographyenergyresourcesconventionalsim',
    title: 'Non-Conventional Energy: Solar, Wind and Tidal Energy',
    subtitle: 'This node covers only solar, wind, and tidal energy in India — their geographical.',
    classLevel: 10, subject: 'geography', topic: 'Non-Conventional Energy: Solar, Wind and Tidal Energy',
    chapters: [],
    nodeIds: ['c10_geo_cbse_05_006', 'c10_geo_cbse_05_008', 'c10_geo_cbse_05_005', 'c10_geo_cbse_05_007', 'c10_geo_cbse_05_001', 'c10_geo_cbse_01_001', 'c10_geo_cbse_01_002', 'c10_geo_cbse_03_008', 'c10_geo_cbse_06_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Look at your own rooftop or a neighbour\'s house — you have likely seen blue-black rectangular panels angled.', goal: 'Master Non-Conventional Energy: Solar, Wind and Tidal Energy.' },
    discovery: {
        question: 'On an outline map of India, mark and label: (a) the state with the highest installed wind power capacity, (b) the mountain pass enabling wind funneling in that.',
        options: ['the state with the highest installed wind power capacity, (', 'interior Madhya Pradesh', 'Sunderbans'],
        answer: 'the state with the highest installed wind power capacity, (',
        hook: 'Students believe that "India has huge tidal energy potential because it has a 7,500 km coastline" — they confuse.',
    },
    teaching: [
        { title: 'Non-conventional energy sources are.', text: 'Non-conventional energy sources are renewable, inexhaustible energy resources that do not deplete with use and cause minimal environmental pollution; in the Indian context, solar energy (harnessed.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_geo_cbse_05_006', title: 'Non-conventional energy sources are.',
          scaffold: { problem: 'A company wants to set up a 500 MW solar photovoltaic plant in India.',
            steps: [
            { text: 'Identify the geographical parameter that dominates solar PV viability — Global Horizontal Irradiance (GHI) measured in.' },
            { text: 'Recall/estimate GHI for each site: Jaisalmer (Thar Desert) ~6.5 kWh/m²/day, 325+ clear days; Kanyakumari (coastal tip).' },
            { text: 'Assess land availability: Jaisalmer has vast contiguous government wasteland (low opportunity cost); Kanyakumari has.' },
            { text: 'Evaluate grid connectivity: Jaisalmer connected to Green Energy Corridor (765 kV lines to national grid); Kanyakumari.' },
            { text: 'Water for cleaning: Jaisalmer has scarce groundwater but robotic dry-cleaning tech deployed; Kanyakumari has water but.' },
            { text: 'Rank and justify: 1st Jaisalmer (best balance of high GHI, land, grid, proven tech); 2nd Leh (highest GHI but.', faded: true, blankAnswer: 'Jaisalmer (Rajasthan) is the optimal site — it combines the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_05_008', title: 'Conservation of minerals and energy.',
          scaffold: { problem: 'A steel plant in Bhilai uses 2 million tonnes of haematite ore (Fe₂O₃) annually with 60% Fe content.',
            steps: [
            { text: 'Calculate current iron output: 2,000,000 tonnes ore × 0.60 Fe content = 1,200,000 tonnes Fe contained.' },
            { text: 'Calculate current iron recovered: 1,200,000 × (1 - 0.15) = 1,020,000 tonnes Fe.' },
            { text: 'Calculate required ore with new tech for same output: Let X = new ore needed.' },
            { text: 'Annual ore saved = 2,000,000 - 1,789,474 = 210,526 tonnes haematite.' },
            { text: 'Interpret: Saving 210,526 tonnes ore/year reduces mining excavation, transport fuel, and crushing energy — conserving.', faded: true, blankAnswer: '210,526 tonnes of haematite ore saved annually; conserves.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_05_005', title: 'Conventional energy sources are.',
          scaffold: { problem: 'A student is given an outline map of India with four locations marked: A (Jharia), B (Mumbai High), C (Digboi), D (Singrauli).',
            steps: [
            { text: 'Recall that Jharia and Singrauli are in the Damodar Valley and Son Valley respectively — both are Gondwana rift basins.' },
            { text: 'Recall that Mumbai High is offshore in the Arabian Sea, and Digboi is in Assam — both are sedimentary basins formed.' },
            { text: 'Assign geological periods: Jharia and Singrauli = Gondwana (Permian, ~250 Ma); Mumbai High = Tertiary (Miocene, ~20.' },
            { text: 'Explain distribution: Gondwana coalfields occur where ancient rivers deposited plant matter in subsiding basins on the.' },
            { text: 'Verify with map: Jharia (Jharkhand), Singrauli (MP/UP) — both on plateau; Mumbai High (offshore Maharashtra); Digboi.', faded: true, blankAnswer: 'A (Jharia) = Coalfield, Gondwana; B (Mumbai High) = Oil.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_05_007', title: 'Non-conventional energy sources are.',
          scaffold: { problem: 'A farmer in Punjab has 30 buffaloes. Each produces 12 kg dung daily. The village plans a community biogas plant.',
            steps: [
            { text: 'Calculate daily dung production = 30 × 12 = 360 kg/day' },
            { text: 'Calculate daily biogas yield = 360 × 0.035 = 12.6 m³/day' },
            { text: 'Households served = 12.6 ÷ 1.5 = 8.4 → 8 households (integer)' },
            { text: 'Daily slurry mass = 360 × 0.80 = 288 kg/day; Annual slurry = 288 × 365 = 105,120 kg/year' },
            { text: 'Nitrogen in slurry = 105,120 × 0.015 = 1,576.8 kg N/year' },
            { text: 'Wheat N requirement = 5 ha × 120 kg/ha = 600 kg N/year; 1,576.8 > 600 → sufficient', faded: true, blankAnswer: '8 households can be served; yes, slurry provides 1,577 kg.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_05_001', title: 'A mineral is a naturally occurring,.',
          scaffold: { problem: 'A geological survey team discovers a mineral deposit in the Singhbhum district of Jharkhand.',
            steps: [
            { text: 'Observe the clues — "narrow vertical fractures in metamorphic rocks" indicates veins/lodes mode of occurrence.' },
            { text: '"Metallic lustre and excellent conductor" identifies it as a metallic mineral, specifically a non-ferrous metal.' },
            { text: 'Recall that Singhbhum (Khetri belt) is famous for copper deposits in veins/lodes within shear zones of Precambrian.' },
            { text: 'Classify: Metallic → Non-ferrous (copper). Mode: Veins and lodes.' },
            { text: 'Verify: Copper is non-ferrous (no iron), occurs in veins/lodes, and Khetri-Singhbhum is a classic Indian example.', faded: true, blankAnswer: 'Mineral: Copper. Classification: Metallic, Non-ferrous..' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_01_001', title: 'A resource is any naturally occurring.',
          scaffold: { problem: 'A Class 10 student lists "petroleum" as a biotic resource in a board exam because "it comes from dead organisms." The examiner marks it.',
            steps: [
            { text: 'Recall the CBSE definition of biotic resources — resources obtained directly from the biosphere (living or recently.' },
            { text: 'Recall the CBSE definition of abiotic resources — resources composed of non-living inorganic matter, extracted from the.' },
            { text: 'Identify the current state and mode of extraction of petroleum — it exists as a fluid in sedimentary rock pores and is.' },
            { text: 'Classify based on extraction category — since petroleum is mined like a mineral from the lithosphere, it falls under.' },
            { text: 'Verify with CBSE textbook examples — coal, petroleum, natural gas are consistently listed under abiotic/mineral.', faded: true, blankAnswer: 'Petroleum is abiotic because it is extracted as a mineral.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_geo_cbse_05_008', title: 'Identify each idea',
          dissect: { specimen: 'Non-Conventional Energy: Solar, Wind and Tidal Energy', spots: [
            { id: 's1', label: 'Non-conventional energy sources are renewable', prompt: 'Which idea is this? — Non-conventional energy sources are renewable, inexhaustible energy resources that do not.', answer: 'Non-conventional energy sources are renewable', options: ['Non-conventional energy sources are renewable', 'Conservation of minerals and energy', 'Conventional energy sources are non-renewable', 'A mineral is a naturally'] },
            { id: 's2', label: 'Conservation of minerals and energy', prompt: 'Which idea is this? — Conservation of minerals and energy resources refers to the planned and sustainable.', answer: 'Conservation of minerals and energy', options: ['Conservation of minerals and energy', 'Non-conventional energy sources are renewable', 'Conventional energy sources are non-renewable', 'A mineral is a naturally'] },
            { id: 's3', label: 'Conventional energy sources are non-renewable', prompt: 'Which idea is this? — Conventional energy sources are non-renewable fossil fuels — coal, petroleum, and natural.', answer: 'Conventional energy sources are non-renewable', options: ['Conventional energy sources are non-renewable', 'Non-conventional energy sources are renewable', 'Conservation of minerals and energy', 'A mineral is a naturally'] },
            { id: 's4', label: 'A mineral is a naturally', prompt: 'Which idea is this? — A mineral is a naturally occurring, inorganic solid with a definite chemical composition.', answer: 'A mineral is a naturally', options: ['A mineral is a naturally', 'Non-conventional energy sources are renewable', 'Conservation of minerals and energy', 'Conventional energy sources are non-renewable'] },
            { id: 's5', label: 'A resource is any naturally', prompt: 'Which idea is this? — A resource is any naturally occurring substance or feature that satisfies human needs, is.', answer: 'A resource is any naturally', options: ['A resource is any naturally', 'Non-conventional energy sources are renewable', 'Conservation of minerals and energy', 'Conventional energy sources are non-renewable'] }
          ] } }
    ],
    explore: { component: C10_GeographyEnergyResourcesConventionalSim, prompt: 'Explore the interactive — Non-Conventional Energy: Solar, Wind and Tidal Energy' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_geo_cbse_05_006', difficulty: 'standard',
          question: 'Non-conventional energy sources are renewable, inexhaustible energy resources.',
          hint: 'If stuck, revisit Class 9 Atmosphere chapter (c9_geo_ch2_3, c9_geo_ch2_4) for pressure.',
          misconception: 'Students believe that "India has huge tidal energy potential because it has a 7,500 km coastline" — they confuse.',
          parts: [
                { id: 'a', prompt: 'On an outline map of India, mark and label: (a) the state with the highest installed wind power capacity, (b) the mountain pass enabling wind funneling in that.', answer: 'the state with the highest installed wind power capacity, (',
                  options: ['the state with the highest installed wind power capacity, (', 'interior Madhya Pradesh', 'Sunderbans'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "India has huge tidal energy potential because it has a 7,500 km coastline" — they confuse coastline length with.' }
          ],
            remediations: { 'india-has-huge-tidal-energy': { steps: ['Show the student a tidal range map of India (from NCERT Class 10 Fig 5.12 or MNRE atlas) — highlight that only Gujarat.', 'Use a simple funnel diagram — pour water into a wide tray vs a narrow-necked bottle — to demonstrate how constriction.', 'Have them calculate theoretical power: P = 0.5 × ρ × A × v³ — show that at v = 1 m/s (typical open coast), power is.', 'Assign a 3-mark board-style question: "Why is tidal energy restricted to Gujarat?" — require the three keywords:.'] } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_05_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "India has huge tidal energy potential because it has a 7,500 km coastline" — they confuse.',
          parts: [
                { id: 'a', prompt: 'Design a state-level renewable energy transition plan for a hypothetical state "X" that has: (i) 280 clear-sky days/year, (ii) a 200 km coastline with average.', answer: 'Priority 1: Solar',
                  options: ['Priority 1: Solar', 'India has huge tidal energy potential'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "India has huge tidal energy potential because it has a 7,500 km coastline" — they confuse coastline length with.' }
          ],
            remediations: { 'india-has-huge-tidal-energy': { steps: ['Show the student a tidal range map of India (from NCERT Class 10 Fig 5.12 or MNRE atlas) — highlight that only Gujarat.', 'Use a simple funnel diagram — pour water into a wide tray vs a narrow-necked bottle — to demonstrate how constriction.', 'Have them calculate theoretical power: P = 0.5 × ρ × A × v³ — show that at v = 1 m/s (typical open coast), power is.', 'Assign a 3-mark board-style question: "Why is tidal energy restricted to Gujarat?" — require the three keywords:.'] } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_05_008', difficulty: 'standard',
          question: 'Conservation of minerals and energy resources refers to the planned and.',
          hint: 'If stuck, revisit c8_geo_ch1_3 (renewable vs non-renewable classification) and.',
          misconception: 'Students think "conservation of minerals" means only "do not use them" or "recycle paper/plastic", missing that mineral.',
          parts: [
                { id: 'a', prompt: 'State the primary geological reason why minerals like haematite and bauxite are considered non-renewable resources.', answer: 'Minerals like haematite and bauxite form through extremely slow',
                  options: ['Correct answer: Minerals like haematite and bauxite form through extremely slow', 'they are deep underground', 'we use them fast'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "conservation of minerals" means only "do not use them" or "recycle paper/plastic", missing that mineral conservation.' }
          ],
            remediations: { 'conservation-of-minerals-means-only': { steps: ['Revisit c8_geo_ch1_3 (renewable vs non-renewable) and c8_geo_ch1_11 (conservation principles) to rebuild the.', 'Create a two-column table: "Mineral Conservation Method" vs "Energy Conservation Method" with 3 rows each, using NCERT.', 'Practice one case-based question on "How does improving thermal power plant efficiency conserve both coal and.'] } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_05_005', difficulty: 'standard',
          question: 'Conventional energy sources are non-renewable fossil fuels — coal, petroleum,.',
          hint: 'If stuck, revisit c8_geo_ch1_10 (Non-Renewable Resources) and c6_geography_ch01_004.',
          misconception: 'Students believe "coal, petroleum, and natural gas are found together in the same places" because they are all \'fossil.',
          parts: [
                { id: 'a', prompt: 'A thermal power plant in Jharkhand burns bituminous coal with 75% carbon content.', answer: 'Step 1: Convert tonnes to kg: 5,000 tonnes = 5,000 × 1,000 = 5,000,000 kg',
                  options: ['Step 1: Convert tonnes to kg: 5,000 tonnes = 5,000 × 1,000 = 5,000,000 kg', 'coal, petroleum, and natural gas are found together in the same places'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "coal, petroleum, and natural gas are found together in the same places" because they are all \'fossil fuels\'.' }
          ],
            remediations: { 'coal': { steps: ['On an outline map of India, mark all Gondwana coalfields (Jharia, Bokaro, Raniganj, Singrauli, Talcher) in black and.', 'Overlay the geological map — notice coalfields align with Damodar/Mahanadi/Godavari rift valleys (continental.', 'Write one sentence for each: "Coal = land plants in river deltas" and "Petroleum = marine plankton in shallow seas".', 'Memorise the mnemonic: "Gondwana = Coal on Land; Tertiary/Offshore = Oil in Sea".'] } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_05_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "coal, petroleum, and natural gas are found together in the same places" because they are all \'fossil.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "India should stop all coal mining immediately to meet its net-zero by 2070 target." Consider energy security, employment, and.', answer: 'The statement is not feasible',
                  options: ['The statement is not feasible', 'yes, stop immediately for climate', 'coal, petroleum, and natural gas are found together in the same places'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "coal, petroleum, and natural gas are found together in the same places" because they are all \'fossil fuels\'.' },
                { id: 'b', prompt: 'Design a conservation strategy for a district heavily dependent on coal mining (e.g., Dhanbad) that addresses: (a) reducing wastage in mining and transport,.', answer: 'reducing wastage in mining and transport, (',
                  options: ['reducing wastage in mining and transport, (', 'coal, petroleum, and natural gas are found together in the same places'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "coal, petroleum, and natural gas are found together in the same places" because they are all \'fossil fuels\'.' }
          ],
            remediations: { 'coal': { steps: ['On an outline map of India, mark all Gondwana coalfields (Jharia, Bokaro, Raniganj, Singrauli, Talcher) in black and.', 'Overlay the geological map — notice coalfields align with Damodar/Mahanadi/Godavari rift valleys (continental.', 'Write one sentence for each: "Coal = land plants in river deltas" and "Petroleum = marine plankton in shallow seas".', 'Memorise the mnemonic: "Gondwana = Coal on Land; Tertiary/Offshore = Oil in Sea".'] } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_05_007', difficulty: 'standard',
          question: 'Non-conventional energy sources are renewable or inexhaustible energy.',
          hint: 'If stuck on geothermal distribution, revisit c9_geo_ch1_5 (volcanoes) and c9_geo_ch1_2.',
          misconception: 'Students think "non-conventional = renewable" and therefore classify nuclear energy as renewable because it\'s in this.',
          parts: [
                { id: 'a', prompt: 'Name the two experimental geothermal energy projects in India and the states where they are located.', answer: 'Correct: Manikaran (Himachal Pradesh) and Puga Valley (Ladakh)',
                  options: ['Correct: Manikaran (Himachal Pradesh) and Puga Valley (Ladakh)', 'Manikaran in Uttarakhand', 'Tattapani in Chhattisgarh'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "non-conventional = renewable" and therefore classify nuclear energy as renewable because it\'s in this chapter.' },
                { id: 'b', prompt: 'A village has 50 cattle. Each cow produces 10 kg dung/day. If 1 kg dung yields 0.04 m³ biogas, calculate the daily biogas potential.', answer: 'Step 1: Total dung = 50 × 10 = 500 kg/day',
                  options: ['Step 1: Total dung = 50 × 10 = 500 kg/day', 'non-conventional = renewable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "non-conventional = renewable" and therefore classify nuclear energy as renewable because it\'s in this chapter.' }
          ],
            remediations: { 'non-conventional-renewable-and-therefore': { steps: ['Re-read NCERT page 54-55 (energy resources table) and highlight the column "Renewable/Non-renewable" vs.', 'Make a 2×2 matrix: Conventional-Renewable (none), Conventional-Non-renewable (coal, petroleum),.', 'Practise writing: "Nuclear is non-conventional because it uses advanced fission technology and has low carbon.'] } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "non-conventional = renewable" and therefore classify nuclear energy as renewable because it\'s in this.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Nuclear energy is non-conventional because it does not emit CO₂ during electricity generation." Is this justification sufficient for.', answer: 'Insufficient',
                  options: ['Insufficient', 'non-conventional = renewable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "non-conventional = renewable" and therefore classify nuclear energy as renewable because it\'s in this chapter.' }
          ],
            remediations: { 'non-conventional-renewable-and-therefore': { steps: ['Re-read NCERT page 54-55 (energy resources table) and highlight the column "Renewable/Non-renewable" vs.', 'Make a 2×2 matrix: Conventional-Renewable (none), Conventional-Non-renewable (coal, petroleum),.', 'Practise writing: "Nuclear is non-conventional because it uses advanced fission technology and has low carbon.'] } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_05_001', difficulty: 'standard',
          question: 'A mineral is a naturally occurring, inorganic solid with a definite chemical.',
          hint: 'If stuck, revisit Class 8 "Classification by Exhaustibility: Renewable and Non-Renewable".',
          misconception: 'Students believe "mode of occurrence" and "distribution" are the same — they list states where a mineral is found.',
          parts: [
                { id: 'a', prompt: 'Bauxite in the Amarkantak plateau (Madhya Pradesh) is found as a residual mass in laterite soil.', answer: 'Mode: Residual mass (formed by weathering)',
                  options: ['Mode: Residual mass (formed by weathering)', 'alluvial deposit', 'reveals confusion between transported vs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "mode of occurrence" and "distribution" are the same — they list states where a mineral is found (e.g., "iron ore in.' },
                { id: 'b', prompt: 'Compare the mode of occurrence of mica in Jharkhand (Koderma) with that of coal in the Damodar Valley. How does the difference affect the mining technique used?', answer: 'Mica occurs in veins/lodes within pegmatite intrusions (igneous)',
                  options: ['Mica occurs in veins/lodes within pegmatite intrusions (igneous)', 'mode of occurrence', 'distribution'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "mode of occurrence" and "distribution" are the same — they list states where a mineral is found (e.g., "iron ore in.' }
          ],
            remediations: { 'mode-of-occurrence-and-distribution': { steps: ['Draw a cross-section diagram showing the five modes labelled with geological agents (magmatic, sedimentary, weathering,.', 'On an outline map of India, mark one location for each mode (e.g., Khetri for veins, Bailadila for beds, Panchpatmali.', 'Write a one-sentence definition for each mode linking process to form.', 'Practice converting a distribution statement ("Mica in Jharkhand") into a mode statement ("Mica in veins/lodes in.'] } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "mode of occurrence" and "distribution" are the same — they list states where a mineral is found.',
          parts: [
                { id: 'a', prompt: '"Ocean water contains vast quantities of dissolved minerals like magnesium and bromine, yet commercial extraction is limited." Evaluate this statement.', answer: 'The statement is valid',
                  options: ['The statement is valid', 'it\'s easy because ocean is big', 'mode of occurrence', 'distribution'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "mode of occurrence" and "distribution" are the same — they list states where a mineral is found (e.g., "iron ore in.' },
                { id: 'b', prompt: 'Compare the mode of occurrence of mica in Jharkhand (Koderma) with that of coal in the Damodar Valley. How does the difference affect the mining technique used?', answer: 'Mica occurs in veins/lodes within pegmatite intrusions (igneous)',
                  options: ['Mica occurs in veins/lodes within pegmatite intrusions (igneous)', 'mode of occurrence', 'distribution', 'iron ore in Odisha'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "mode of occurrence" and "distribution" are the same — they list states where a mineral is found (e.g., "iron ore in.' }
          ],
            remediations: { 'mode-of-occurrence-and-distribution': { steps: ['Draw a cross-section diagram showing the five modes labelled with geological agents (magmatic, sedimentary, weathering,.', 'On an outline map of India, mark one location for each mode (e.g., Khetri for veins, Bailadila for beds, Panchpatmali.', 'Write a one-sentence definition for each mode linking process to form.', 'Practice converting a distribution statement ("Mica in Jharkhand") into a mode statement ("Mica in veins/lodes in.'] } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_01_001', difficulty: 'standard',
          question: 'A resource is any naturally occurring substance or feature that satisfies human.',
          hint: 'Revisit c8_geo_ch1_1 "When Does Nature Become a Resource" and re-learn the four criteria.',
          misconception: 'Students believe **any substance derived from living things, even millions of years ago, is biotic**.',
          parts: [
                { id: 'a', prompt: 'Coal is formed from fossilized plants. Why does CBSE classify coal as an **abiotic** resource and not a biotic one?', answer: 'CBSE classifies resources based on **current state and source category**, not',
                  options: ['CBSE classifies resources based on **current state and source category**, not', 'coal comes from plants so it\'s biotic'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **any substance derived from living things, even millions of years ago, is biotic**.' }
          ],
            remediations: { 'any-substance-derived-from-living': { steps: ['Draw a two-column table — "Biotic: Direct from Biosphere" vs "Abiotic: From Lithosphere/Atmosphere/Hydrosphere".', 'Place **coal, petroleum, natural gas** in the abiotic column with the label "Fossil fuels → mined like minerals".', 'Contrast with **biomass (firewood, biogas, crop residue)** in the biotic column — these are recently living, renewable,.', 'Use the mnemonic: **"If you mine it, it\'s abiotic; if you grow/harvest it, it\'s biotic."** Practice with 5 Indian.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
