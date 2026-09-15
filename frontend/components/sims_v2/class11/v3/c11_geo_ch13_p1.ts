import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch13_p1: SimDef = {
    id: 'v3_c11_geo_ch13_p1',
    title: 'Water Resources · Part 1/2',
    subtitle: 'Reckon usable water versus total water — and the policy that emptied Punjab\'s aquifers.',
    classLevel: 11, subject: 'geography', topic: 'Water Resources · Part 1/2',
    chapters: ['c11_geo_ch13'],
    nodeIds: ['c11_geo_cbse_13_001', 'c11_geo_cbse_13_002', 'c11_geo_cbse_13_003', 'c11_geo_cbse_13_004', 'c11_geo_cbse_13_005', 'c11_geo_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a hydrologist auditing a water-rich state\'s empty wells', intro: 'A tap in Delhi might draw from Bhakra reservoir or a neighbourhood tubewell — two linked systems feeding one glass.', goal: 'Analyse surface water and groundwater availability, constraints and the drivers of over-extraction.' },
    discovery: {
        question: 'Punjab sits on rich alluvial aquifers yet faces groundwater collapse — is low rainfall to blame?',
        options: ['No — free farm electricity since 1997 made water-intensive paddy profitable, driving pumping far past recharge', 'Yes — 600 mm of rain can\'t support agriculture', 'Yes — the monsoon simply fails Punjab', 'No — the rivers secretly diverted underground'],
        answer: 'No — free farm electricity since 1997 made water-intensive paddy profitable, driving pumping far past recharge',
        hook: 'The aquifer had decent recharge; the policy made pumping it free — a man-made drought in a water-rich land.',
    },
    teaching: [
        { title: 'Water Resources: Surface Water and Groundwater in India', text: 'Surface water in India comprises water flowing in rivers, stored in lakes, reservoirs, tanks, and wetlands, primarily sourced from monsoon rainfall and Himalayan snowmelt.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_13_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compute why only about 37% of India\'s surface water is usable, then weigh the Ken-Betwa link\'s promise against the Panna Tiger Reserve it would drown.',
        labels: ['Water Resources: Surface Water', 'India\'s Drainage Systems: Major', 'Multipurpose River Projects: Bhakra-Nangal', 'Multipurpose River Projects: Damodar', 'Rainwater Harvesting: Traditional Methods', 'Water Conservation: Need'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_13_001', title: 'Water Resources: Surface Water and Groundwater in India',
          caseStudy: { intro: 'Begin with a relatable observation: when you turn on a tap in Delhi, the water may come from the Bhakra reservoir (surface water) or a deep tubewell in the.',
            decisions: [{ prompt: 'List the four major sources of surface water in India and name the two primary sources of groundwater recharge.', options: [
                { text: 'Major surface water sources: (1) Himalayan rivers (perennial, snow-fed), (2) Peninsular', outcome: 'Major surface water sources: (1) Himalayan rivers (perennial, snow-fed), (2) Peninsular rivers.' },
                { text: 'glaciers', outcome: 'Not quite — Students believe groundwater exists as vast underground rivers or lakes that are uniformly.', reveals: 'groundwater-exists-as-vast-underground' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_13_002', title: 'India\'s Drainage Systems: Major River Basins and Their Catchments',
          scaffold: { problem: 'The catchment area of the Upper Krishna sub-basin (up to Almatti Dam) is 51,000 km².',
            steps: [
            { text: 'Identify the formula: Drainage Density (D_d) = Total Stream Length (L) / Basin Area (A).' },
            { text: 'Substitute given values: L = 12,750 km, A = 51,000 km².' },
            { text: 'Compute D_d = 12,750 / 51,000 = 0.25 km/km².' },
            { text: 'Compare with typical values: Himalayan basins (0.5–1.5 km/km²), Peninsular shield basins (0.1–0.3 km/km²).' },
            { text: 'Interpret: Low drainage density indicates fewer streams per unit area → longer overland flow paths → slower flood.' },
            { text: 'Conclude: Flood forecasting models for this sub-basin must use longer time-to-peak parameters; watershed interventions.', faded: true, blankAnswer: 'Drainage density = 0.25 km/km². Implication: Slow flood.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_13_003', title: 'Multipurpose River Projects: Bhakra-Nangal Project',
          caseStudy: { intro: 'Imagine standing at the Bhakra Dam viewpoint in November: the Gobind Sagar stretches 90 km upstream, its water level 30 m below the full reservoir level.',
            decisions: [{ prompt: 'Name the river, the two dams, the reservoir, and the four beneficiary states (plus one union territory) of the Bhakra-Nangal Project.', options: [
                { text: 'River: Sutlej (Indus tributary)', outcome: 'River: Sutlej (Indus tributary). Dams: Bhakra Dam (Himachal Pradesh) and Nangal Dam (Punjab).' },
                { text: 'Beas or Ravi, missing Rajasthan or Delhi', outcome: 'Not quite — Students conflate Bhakra-Nangal with the Beas-Sutlej Link Project (BSL) and assume the Bhakra Dam.', reveals: 'students-conflate-bhakra-nangal-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_13_004', title: 'Multipurpose River Projects: Damodar Valley Corporation',
          caseStudy: { intro: 'Observe how the Damodar River, once called the "Sorrow of Bengal" for its devastating annual floods that destroyed crops and settlements in the Burdwan and.',
            decisions: [{ prompt: 'Name the river on which the Damodar Valley Corporation project is built and state the two Indian states through which this river flows.', options: [
                { text: 'The Damodar Valley Corporation project is built on the Damodar River', outcome: 'The Damodar Valley Corporation project is built on the Damodar River, which flows through Jharkhand.' },
                { text: 'the Barakar or Konar as the main river, or stating Bihar instead of Jharkhand', outcome: 'Not quite — Students often believe DVC is **only a hydroelectric project** like Bhakra-Nangal, overlooking its.', reveals: 'dvc-is-only-a-hydroelectric' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_13_005', title: 'Rainwater Harvesting: Traditional Methods (Khadins, Tankas)',
          scaffold: { problem: 'A Khadin in Jaisalmer has a 50-hectare catchment (sandy loam, runoff coefficient 0.25). Monsoon rainfall = 200 mm.',
            steps: [
            { text: 'Convert units — Catchment = 50 ha = 500,000 m²; Rainfall = 0.200 m; Cultivated area = 10 ha = 100,000 m².' },
            { text: 'Total runoff = 500,000 m² × 0.200 m × 0.25 = 25,000 m³ = 25 million litres.' },
            { text: 'Uniform depth over cultivated area = 25,000 m³ / 100,000 m² = 0.25 m = 25 cm.' },
            { text: 'Actual moisture depth > 25 cm because water ponds behind bund, infiltrates vertically, and is held by capillary forces.' },
            { text: 'Verify — 25 cm runoff equivalent matches literature (Khadins yield 1–2 crops on 25–30 cm moisture).', faded: true, blankAnswer: '(a) 25,000 m³ (25 ML), (b) 25 cm, (c) Actual moisture.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_13_006', title: 'Water Conservation: Need and Modern Methods (Watershed Management)',
          scaffold: { problem: 'A micro-watershed in Rajasthan has an area of 800 hectares. The average annual rainfall is 450 mm.',
            steps: [
            { text: 'Convert area to square meters: 800 ha = 8,000,000 m².' },
            { text: 'Calculate weighted runoff coefficient: (0.4×0.35) + (0.3×0.25) + (0.3×0.15) = 0.14 + 0.075 + 0.045 = 0.26.' },
            { text: 'Convert rainfall to meters: 450 mm = 0.45 m.' },
            { text: 'Total runoff volume = Rainfall × Area × Weighted Runoff Coefficient = 0.45 × 8,000,000 × 0.26 = 936,000 m³.' },
            { text: 'Harvestable volume = 60% of total runoff = 0.6 × 936,000 = 561,600 m³ = 0.5616 MCM.' },
            { text: 'Interpret: This harvested water can support supplemental irrigation for about 100 hectares of rabi crops (assuming 5000.', faded: true, blankAnswer: '0.5616 MCM (or 561,600 m³) per year.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_13_001', title: 'A real-world call',
          caseStudy: { intro: 'A mountain region needs a hydropower dam for electricity and a growing economy — but the mountains are geologically young, landslide-prone, and home to communities who live downstream of the proposed site.',
            decisions: [{ prompt: 'How much risk is acceptable for power?', options: [
                { text: 'Build with the best engineering available', outcome: 'The development answer — risk managed, not zero; the communities downstream carry the remainder.' },
                { text: 'Don\'t build in fragile geology — find power another way', outcome: 'The precautionary answer; power has to come from somewhere, and the alternatives have their own costs.' },
                { text: 'Build only if the people downstream decide, not just the ones who benefit', outcome: 'The consent answer — risk-bearers should have the vote, not just the benefit-receivers.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_13_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a water-conservation workshop for drought-hit Bundelkhand, a volunteer proposes: \'Just drill deeper borewells — groundwater is a vast underground river, and the deeper you go the more you get.\' Someone else claims the Ganga is India\'s largest basin by area.',
            decisions: [{ prompt: 'Which hydrological facts need correcting?', options: [
                { text: 'Groundwater lives in pore spaces and fractures of aquifers, not underground rivers — in Bundelkhand\'s crystalline basement, water below ~100 m is negligible, so deeper drilling fails. And \'largest basin\' needs a boundary check: the Godavari\'s ~3.12 lakh km² inside India exceeds the Ganga\'s Indian portion (~2.5 lakh km²) — the Ganga\'s total is larger only when you count Nepal, China and Bangladesh.', outcome: 'Both claims get fixed by the same lesson: surface water and groundwater are connected, geology-bounded systems — and basin size depends on where you draw the border.' },
                { text: 'Support the borewell plan — groundwater is stored like an underground lake, so depth finds it.', outcome: 'Aquifers are porous rock, not caverns; in hard-rock terrain the saturated zone is shallow and finite — deeper drilling just costs more for the same dry rock.', reveals: 'groundwater-is-underground-river' },
                { text: 'Confirm Ganga is India\'s largest basin — it has the biggest total catchment on the map.', outcome: 'The total basin crosses four countries; within India the Godavari basin is larger — confusing national with total extent produces the wrong ranking.', reveals: 'ganga-largest-basin-in-india' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'India\'s water problem isn\'t scarcity on paper — it\'s 80% of the rain arriving in four months and incentives that pump the rest away.',
            decisions: [{ prompt: 'What comes next? Water Resources · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Water Resources · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_13_001', difficulty: 'standard',
          question: 'Surface water in India comprises water flowing in rivers, stored in lakes.',
          hint: 'Review the monsoon onset/withdrawal maps and river basin maps from Class 9 (Chapter 4.',
          misconception: 'Students believe groundwater exists as vast underground rivers or lakes that are uniformly available everywhere, and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Surface water in India comprises water flowing in rivers, stored in lakes, reservoirs,',
                  options: ['Surface water in India comprises water flowing in rivers, stored in lakes, reservoirs,', 'A drainage basin (or catchment) is the total land area drained by a river and its', 'The Bhakra-Nangal Project is a multipurpose river valley project on the Sutlej River (a', 'The Damodar Valley Corporation (DVC) is India\'s first multipurpose river valley project,'],
                  hint: 'Review the monsoon onset/withdrawal maps and river basin maps from Class 9 (Chapter 4: Climate) and.',
                  misconception: 'Students believe groundwater exists as vast underground rivers or lakes that are uniformly available everywhere, and that deeper drilling.' }
          ],
            remediations: { 'groundwater-exists-as-vast-underground': { steps: ['Remediation: 1) Use a cross-section diagram showing unconfined alluvial aquifer (Indo-Gangetic) vs.', 'fractured hard rock aquifer (Deccan) with water table contours.', '2) Conduct a simple water balance exercise: give rainfall, area, runoff coefficient, recharge coefficient — have.', 'groundwater recharge for two contrasting regions.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_13_002', difficulty: 'standard',
          question: 'A drainage basin (or catchment) is the total land area drained by a river and.',
          hint: 'If unable to delineate a basin boundary, revisit topographic map interpretation (Class 11.',
          misconception: 'Students often think the *Ganga basin* is the largest in India by catchment area *within the country*, but the.',
          parts: [
                { id: 'a', prompt: 'Name the three Himalayan river basins that together account for approximately 60% of India\'s total surface water potential, and state the primary source.', answer: 'The Indus, Ganga, and Brahmaputra basins',
                  options: ['The Indus, Ganga, and Brahmaputra basins', 'Peninsular rivers or attributing flow solely to rainfall'],
                  hint: 'If unable to delineate a basin boundary, revisit topographic map interpretation (Class 11 Practical.',
                  misconception: 'Students often think the *Ganga basin* is the largest in India by catchment area *within the country*, but the *Godavari basin* (≈3.12 lakh.' }
          ],
            remediations: { 'the-ganga-basin-is-the': { steps: ['On the political map of India, shade the *Indian portion* of each major basin using CWC data (Indus: 3.2L, Ganga: 2.5L.', 'Calculate percentages of total Indian basin area for each.', 'Write a one-sentence rule: "For inter-state water disputes, only the Indian catchment area matters; for total.', 'Practise a past board question: "Compare the catchment areas of the Godavari and Ganga basins *within India* and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_13_003', difficulty: 'standard',
          question: 'The Bhakra-Nangal Project is a multipurpose river valley project on the Sutlej.',
          hint: 'If stuck, revisit c11_geo_cbse_13_001 (water budgeting: inflow, storage, release, losses).',
          misconception: 'Students conflate Bhakra-Nangal with the Beas-Sutlej Link Project (BSL) and assume the Bhakra Dam diverts Beas water.',
          parts: [
                { id: 'a', prompt: 'Name the river, the two dams, the reservoir, and the four beneficiary states (plus one union territory) of the Bhakra-Nangal Project.', answer: 'River: Sutlej (Indus tributary)',
                  options: ['River: Sutlej (Indus tributary)', 'Beas or Ravi, missing Rajasthan or Delhi'],
                  hint: 'If stuck, revisit c11_geo_cbse_13_001 (water budgeting: inflow, storage, release, losses) and.',
                  misconception: 'Students conflate Bhakra-Nangal with the Beas-Sutlej Link Project (BSL) and assume the Bhakra Dam diverts Beas water into the Sutlej.' }
          ],
            remediations: { 'students-conflate-bhakra-nangal-with': { steps: ['On a political map of the Indus basin, trace the Sutlej from its Tibetan source (Langqen Zangbo) through Himachal.', 'Compare the commissioning years: Bhakra Dam 1963, Nangal Dam 1954, Pandoh Dam 1977.', 'Read the BBMB notification—Himachal\'s 7.19% share is explicitly for "Sutlej and Beas waters" because the integrated.', 'Re-answer Diagnostic Q1 and Q4 distinguishing the two projects\' infrastructure and institutional integration.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_13_004', difficulty: 'standard',
          question: 'The Damodar Valley Corporation (DVC) is India\'s first multipurpose river valley.',
          hint: 'If stuck, revisit the Damodar basin map (c11_geo_cbse_13_002) and the Bhakra-Nangal case.',
          misconception: 'Students often believe DVC is **only a hydroelectric project** like Bhakra-Nangal, overlooking its pioneering.',
          parts: [
                { id: 'a', prompt: 'Name the river on which the Damodar Valley Corporation project is built and state the two Indian states through which this river flows.', answer: 'The Damodar Valley Corporation project is built on the Damodar River',
                  options: ['The Damodar Valley Corporation project is built on the Damodar River', 'the Barakar or Konar as the main river, or stating Bihar instead of Jharkhand'],
                  hint: 'If stuck, revisit the Damodar basin map (c11_geo_cbse_13_002) and the Bhakra-Nangal case study.',
                  misconception: 'Students often believe DVC is **only a hydroelectric project** like Bhakra-Nangal, overlooking its pioneering **thermal-hydel integration**.' },
                { id: 'b', prompt: 'Explain why the Damodar River was historically called the "Sorrow of Bengal" and how the cascade of dams (Tilaiya, Konar, Maithon, Panchet) specifically.', answer: 'The Damodar earned the name "Sorrow of Bengal"',
                  options: ['The Damodar earned the name "Sorrow of Bengal"', 'dams stop floods'],
                  hint: 'If stuck, revisit the Damodar basin map (c11_geo_cbse_13_002) and the Bhakra-Nangal case study.',
                  misconception: 'Students often believe DVC is **only a hydroelectric project** like Bhakra-Nangal, overlooking its pioneering **thermal-hydel integration**.' }
          ],
            remediations: { 'dvc-is-only-a-hydroelectric': { steps: ['**Map Exercise:** On a blank outline map of Jharkhand-West Bengal, draw the Damodar basin boundary.', 'Plot and label: Damodar source (Khamarpat hills), Barakar & Konar tributaries, four dams (Tilaiya on Barakar, Konar.', '**Table Comparison:** Create a 4×4 table: Project (DVC vs Bhakra) × Parameters (River Regime, Geological Setting, Power.', '**Flood Hydrograph Analysis:** Sketch a pre-DVC vs post-DVC flood hydrograph for the Damodar at Durgapur.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_13_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe DVC is **only a hydroelectric project** like Bhakra-Nangal, overlooking its pioneering.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "The Damodar Valley Corporation has completely eliminated floods in the lower Damodar basin." Use evidence from post-1978 flood events.', answer: '**Evaluation: The statement is FALSE.** **Justification:** 1',
                  options: ['**Evaluation: The statement is FALSE.** **Justification:** 1', 'complete elimination'],
                  hint: 'If stuck, revisit the Damodar basin map (c11_geo_cbse_13_002) and the Bhakra-Nangal case study.',
                  misconception: 'Students often believe DVC is **only a hydroelectric project** like Bhakra-Nangal, overlooking its pioneering **thermal-hydel integration**.' }
          ],
            remediations: { 'dvc-is-only-a-hydroelectric': { steps: ['**Map Exercise:** On a blank outline map of Jharkhand-West Bengal, draw the Damodar basin boundary.', 'Plot and label: Damodar source (Khamarpat hills), Barakar & Konar tributaries, four dams (Tilaiya on Barakar, Konar.', '**Table Comparison:** Create a 4×4 table: Project (DVC vs Bhakra) × Parameters (River Regime, Geological Setting, Power.', '**Flood Hydrograph Analysis:** Sketch a pre-DVC vs post-DVC flood hydrograph for the Damodar at Durgapur.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_13_005', difficulty: 'standard',
          question: 'Khadins are earthen embankments built across sloping plains in the Thar Desert.',
          hint: 'If stuck, review Class 10 node c10_geo_cbse_03_004 (traditional methods list) and Class.',
          misconception: 'Students think Khadins and Tankas are "just old wells" or "small dams".',
          parts: [
                { id: 'a', prompt: 'A household in Phalodi has a 100 m² roof catchment. Annual rainfall is 150 mm. Runoff coefficient for lime-plastered roof = 0.8.', answer: 'Step 1: Rainfall volume = 100 m² × 0.150 m = 15 m³ = 15,000 L',
                  options: ['Step 1: Rainfall volume = 100 m² × 0.150 m = 15 m³ = 15,000 L', 'just old wells', 'small dams', 'Khadins and Tankas are "just old wells" or "small dams"'],
                  hint: 'If stuck, review Class 10 node c10_geo_cbse_03_004 (traditional methods list) and Class 11 node.',
                  misconception: 'Students think Khadins and Tankas are "just old wells" or "small dams".' },
                { id: 'b', prompt: 'Compare Khadin and Tanka on three dimensions: (a) hydrological function (runoff vs rainwater), (b) social management (community vs household), (c) climate.', answer: 'hydrological function (runoff vs rainwater), (',
                  options: ['hydrological function (runoff vs rainwater), (', 'rainwater harvesting', 'just old wells', 'small dams'],
                  hint: 'If stuck, review Class 10 node c10_geo_cbse_03_004 (traditional methods list) and Class 11 node.',
                  misconception: 'Students think Khadins and Tankas are "just old wells" or "small dams".' }
          ],
            remediations: { 'khadins-and-tankas-are-just': { steps: ['Revisit Class 10 node c10_geo_cbse_03_004 — list all traditional methods and their regions.', 'On India physical map, mark Thar Desert, note slope direction (NE to SW), soil types (sandy vs alluvial).', 'Watch 5-min video "Khadin construction in Jaisalmer" (search YouTube) — observe bund shape, spillway, crop pattern.', 'Build a table: Column A = Hydro-geomorphic condition, Column B = Structure feature, Column C = Social rule.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_13_006', difficulty: 'standard',
          question: 'Water conservation refers to the strategies, policies, and practices aimed.',
          hint: 'If stuck, revisit the water budget equation and the difference between surface runoff and.',
          misconception: 'Students often think watershed management is just about building check dams or ponds.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Water conservation refers to the strategies, policies, and practices aimed at sustainably',
                  options: ['Water conservation refers to the strategies, policies, and practices aimed at sustainably', 'Surface water in India comprises water flowing in rivers, stored in lakes, reservoirs,', 'A drainage basin (or catchment) is the total land area drained by a river and its', 'The Bhakra-Nangal Project is a multipurpose river valley project on the Sutlej River (a'],
                  hint: 'If stuck, revisit the water budget equation and the difference between surface runoff and.',
                  misconception: 'Students often think watershed management is just about building check dams or ponds.' }
          ],
            remediations: { 'watershed-management-is-just-about': { steps: ['Draw a cross-section of a watershed on paper labeling ridge, middle slope, valley.', 'Place structure symbols (CCT, SCT, LBCD, pond) in correct order.', 'Trace the path of a raindrop from ridge to valley, explaining how each structure modifies its journey (infiltration ->.', 'Watch a 5-minute video of a successful watershed project (e.g., Haryali in Haryana) and note the institutional setup.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
