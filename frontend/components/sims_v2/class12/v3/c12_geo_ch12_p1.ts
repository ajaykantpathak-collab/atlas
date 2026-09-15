import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch12_p1: SimDef = {
    id: 'v3_c12_geo_ch12_p1',
    title: 'Water Resources · Part 1/2',
    subtitle: 'It rains plenty — the crisis is in the plumbing',
    classLevel: 12, subject: 'geography', topic: 'Water Resources · Part 1/2',
    chapters: ['c12_geo_ch12'],
    nodeIds: ['c12_geo_cbse_12_001', 'c12_geo_cbse_12_002', 'c12_geo_cbse_12_003', 'c12_geo_cbse_12_004', 'c12_geo_cbse_12_005', 'c12_geo_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Water-resource analyst', intro: 'The Yamuna trickles in summer and floods in monsoon while Punjab\'s tubewells run twelve hours a day. Two symptoms, one diagnosis.', goal: 'Analyse India\'s water budget — availability versus utilizability — and the agricultural demand driving groundwater depletion.' },
    discovery: {
        question: 'Kerala drenched in rain barely touches its groundwater; semi-arid Punjab pumps past 100% of recharge. Why do the dry states run out first?',
        options: ['Demand, not rainfall — rice-wheat cropping on subsidised tubewell power drives extraction; rain-rich states with less irrigation need barely pump', 'Punjab gets no rain at all', 'Kerala\'s water is polluted', 'Punjab\'s aquifers are bigger'],
        answer: 'Demand, not rainfall — rice-wheat cropping on subsidised tubewell power drives extraction; rain-rich states with less irrigation need barely pump',
        hook: 'India\'s \'water crisis\' isn\'t a rainfall shortage: 4,000 km³ falls annually, but only 1,122 km³ is utilizable — and 89–92% of that goes to agriculture. The crisis is a mismatch — of season, of place, of crop choice — plus pollution making what remains unusable.',
    },
    teaching: [
        { title: 'Water Resources in India: Surface and Groundwater', text: 'Water resources in India refer to the total volume of freshwater available from precipitation, surface water bodies (rivers, lakes, ponds, tanks), and replenishable groundwater aquifers that can.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_12_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run India\'s water budget end to end: trace 4,000 km³ of rain down to the 1,122 we can actually use, split it by sector, and diagnose which states are mining their aquifers dry.',
        labels: ['Water Resources in India', 'India\'s Drainage Systems: Major', 'Variability of Rainfall', 'Multipurpose River Projects: Concept', 'Major Multipurpose Projects: Bhakra-Nangal,', 'Major Multipurpose Projects: Indira'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_12_001', title: 'Water Resources in India: Surface and Groundwater',
          scaffold: { problem: 'The total replenishable groundwater in India is 432 cubic km. If the overall groundwater utilization rate is 60% (same as surface water).',
            steps: [
            { text: 'Identify total replenishable groundwater = 432 cubic km (from NCERT).' },
            { text: 'Apply national utilizability factor: utilizable groundwater = 60% of 432 = 259.2 cubic km.' },
            { text: 'Calculate agricultural groundwater use = 92% of 259.2 = 238.46 cubic km.' },
            { text: 'Explain depletion: National average masks regional extremes. Punjab\'s groundwater development exceeds 100% (utilization.' },
            { text: 'Verify: 238.46 cubic km is the national agricultural groundwater draft; Punjab alone contributes a disproportionate.', faded: true, blankAnswer: '238.46 cubic km of groundwater used nationally for.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_12_002', title: 'India\'s Drainage Systems: Major River Basins and Catchments',
          scaffold: { problem: 'Using NCERT data (Ganga-Brahmaputra-Barak: 60% of 1869 km³ = 1121 km³ from ~33% of India\'s 3.28 million km²), calculate the specific yield.',
            steps: [
            { text: 'Calculate Himalayan basin catchment area = 0.33 × 3,280,000 km² = 1,082,400 km²' },
            { text: 'Calculate Himalayan specific yield = 1121 km³ / 1,082,400 km² = 1.036 km³/km² = 1,036 MCM/km² = 1036 mm/yr' },
            { text: 'Calculate Peninsular basin catchment area = 0.67 × 3,280,000 km² = 2,197,600 km²' },
            { text: 'Calculate Peninsular specific yield = 748 km³ / 2,197,600 km² = 0.340 km³/km² = 340 MCM/km² = 340 mm/yr' },
            { text: 'Ratio = 1036 / 340 ≈ 3.05 — Himalayan basins yield ~3× more water per unit area' },
            { text: 'Interpret: Difference driven by orographic rainfall (2000-5000 mm vs 600-1500 mm), lower evaporation (cloud cover.', faded: true, blankAnswer: 'Himalayan basins: ~1036 mm/yr; Peninsular basins: ~340.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_12_003', title: 'Variability of Rainfall and Water Scarcity in India',
          scaffold: { problem: 'A farmer in Anantapur district (Andhra Pradesh) receives mean annual rainfall of 550 mm with a standard deviation of 190 mm.',
            steps: [
            { text: 'Calculate CV for Anantapur: CV = (190/550) × 100 = 34.5% — high variability.' },
            { text: 'Interpret CV: High CV means rainfall is unreliable; 34.5% CV implies frequent deviations from mean.' },
            { text: 'Probability of monsoon failure given: 3/10 = 30% chance of rainfall < 400 mm.' },
            { text: 'Groundnut needs 500 mm; with 400 mm rainfall, deficit = 100 mm.' },
            { text: 'For Ludhiana: CV = (140/700) × 100 = 20% — moderate variability.' },
            { text: 'Conclusion: Variability alone doesn\'t determine scarcity; infrastructure and aquifer properties mediate the impact.', faded: true, blankAnswer: 'Anantapur CV = 34.5% (high); crop failure probability ≥30%.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_12_004', title: 'Multipurpose River Projects: Concept and Objectives',
          caseStudy: { intro: 'Observe how your city/town gets electricity and water during summer — often from a distant dam like Bhakra or Hirakud.',
            decisions: [{ prompt: 'Define a multipurpose river project and name any three objectives it typically serves in the Indian context.', options: [
                { text: 'A multipurpose river project is a single integrated scheme that harnesses a river\'s water', outcome: 'A multipurpose river project is a single integrated scheme that harnesses a river\'s water through.' },
                { text: 'it\'s a dam for irrigation', outcome: 'Not quite — Students often think "multipurpose project" is just a synonym for "big dam" and that all such.', reveals: 'multipurpose-project-is-just-a' },
                { text: 'multi-purpose', outcome: 'Not quite — Students often think "multipurpose project" is just a synonym for "big dam" and that all such.', reveals: 'multipurpose-project-is-just-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_12_005', title: 'Major Multipurpose Projects: Bhakra-Nangal, Damodar Valley',
          caseStudy: { intro: 'Observe the electricity powering your home and the wheat/rice on your plate — much of northern India\'s grid stability and Punjab-Haryana\'s agricultural surplus.',
            decisions: [{ prompt: 'Name the river on which Bhakra Dam is built and the reservoir it creates.', options: [
                { text: 'Bhakra Dam is on the **Sutlej River** creating **Gobind Sagar Reservoir**', outcome: 'Bhakra Dam is on the **Sutlej River** creating **Gobind Sagar Reservoir**.' },
                { text: 'big dams', outcome: 'Not quite — Students often think **Bhakra-Nangal and Damodar Valley are similar "big dams" differing only.', reveals: 'bhakra-nangal-and-damodar-valley' },
                { text: 'Beas or Ravi', outcome: 'Not quite — Students often think **Bhakra-Nangal and Damodar Valley are similar "big dams" differing only.', reveals: 'bhakra-nangal-and-damodar-valley' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_12_006', title: 'Major Multipurpose Projects: Indira Gandhi Canal and Others',
          caseStudy: { intro: 'Imagine standing at the edge of the Thar Desert near Jaisalmer where sand dunes stretch endlessly — then picture a 100-meter-wide ribbon of blue water cutting.',
            decisions: [{ prompt: 'Name the barrage that serves as the headworks of the Indira Gandhi Canal and the two rivers whose confluence it regulates.', options: [
                { text: 'Harike Barrage, at the confluence of the Sutlej and Beas rivers in Punjab', outcome: 'Harike Barrage, at the confluence of the Sutlej and Beas rivers in Punjab.' },
                { text: 'Bhakra Dam', outcome: 'Not quite — Students often think the Indira Gandhi Canal **originates at Bhakra Dam** because both are on the.', reveals: 'the-indira-gandhi-canal-originates' },
                { text: 'Sutlej alone', outcome: 'Not quite — Students often think the Indira Gandhi Canal **originates at Bhakra Dam** because both are on the.', reveals: 'the-indira-gandhi-canal-originates' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a school water-policy debate, a teammate argues: \'Just dam the Brahmaputra and the Ganga — they carry most of India\'s surface water, so our scarcity problem is engineering laziness, not geography.\'',
            decisions: [{ prompt: 'What\'s the strongest counter from the water-resources chapter?', options: [
                { text: 'Availability isn\'t harnessability — the Ganga-Brahmaputra-Barak basins hold ~60% of surface water on a third of the land, but Himalayan rivers carry huge sediment loads, run through seismic zones, braid in the plains and cross international boundaries; the fully-dammed basins are the seasonal Peninsular ones where storage was technically easy.', outcome: 'The chapter\'s paradox is that the biggest rivers are the least harnessed precisely because geology and geopolitics constrain them — scarcity policy must work around that, not pretend it\'s laziness.' },
                { text: 'Concede — whichever basin holds the most water is the obvious first place to build.', outcome: 'That reads the flow table and skips the constraints: sediment chokes reservoirs, seismicity threatens dams, braided channels defy storage, and the Brahmaputra involves China and Bangladesh — big water, hard walls.', reveals: 'most-water-means-easiest-dam' },
                { text: 'Counter that all Himalayan rivers are snow-fed and all Peninsular rivers are seasonal, so the comparison is meaningless.', outcome: 'The binary breaks at sub-basin scale — the chapter notes the Narmada\'s perennial upper reaches and the Kaveri\'s near-perennial Western Ghats catchment; regimes are hybrid, which actually strengthens the site-by-site analysis the debate needs.', reveals: 'himalayan-perennial-binary' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now argue water scarcity as a demand-and-quality problem, not a rainfall problem — the reframe every policy debate needs.',
            decisions: [{ prompt: 'What comes next? Water Resources · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Water Resources · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_001', difficulty: 'standard',
          question: 'Water resources in India refer to the total volume of freshwater available from.',
          hint: 'If stuck on spatial distribution, revisit Class 11 nodes c11_geo_cbse_09_009 (Drainage.',
          misconception: 'Students believe that states with high rainfall (e.g., Kerala, Northeast) automatically have high groundwater.',
          parts: [
                { id: 'a', prompt: 'What is the total utilizable water resource of India in cubic km, and what percentage of the available surface water and replenishable groundwater does.', answer: 'The total utilizable water resource is 1,122 cubic km',
                  options: ['The total utilizable water resource is 1,122 cubic km', 'states with high rainfall (e'],
                  hint: 'If stuck on spatial distribution, revisit Class 11 nodes c11_geo_cbse_09_009 (Drainage Systems) and.',
                  misconception: 'Students believe that states with high rainfall (e.g., Kerala, Northeast) automatically have high groundwater utilization, while states.' },
                { id: 'b', prompt: 'Using the data that agriculture accounts for 89% of surface water and 92% of groundwater utilization, calculate the approximate volume of groundwater used for.', answer: 'Step 1: Total replenishable groundwater = 432 cubic km',
                  options: ['Step 1: Total replenishable groundwater = 432 cubic km', 'states with high rainfall (e'],
                  hint: 'If stuck on spatial distribution, revisit Class 11 nodes c11_geo_cbse_09_009 (Drainage Systems) and.',
                  misconception: 'Students believe that states with high rainfall (e.g., Kerala, Northeast) automatically have high groundwater utilization, while states.' },
                { id: 'c', prompt: 'Compare the groundwater utilization patterns of Punjab/Haryana/Tamil Nadu (high utilization) with Chhattisgarh/Odisha/Kerala (low utilization).', answer: 'High-utilization states have intensive agriculture (rice-wheat cropping in',
                  options: ['High-utilization states have intensive agriculture (rice-wheat cropping in', 'low rainfall', 'states with high rainfall (e'],
                  hint: 'If stuck on spatial distribution, revisit Class 11 nodes c11_geo_cbse_09_009 (Drainage Systems) and.',
                  misconception: 'Students believe that states with high rainfall (e.g., Kerala, Northeast) automatically have high groundwater utilization, while states.' }
          ],
            remediations: { 'states-with-high-rainfall-e': { steps: ['Revisit the groundwater utilization map in NCERT Class 12 (Fig.', 'Overlay cropping pattern maps (rice-wheat vs. plantation vs. rainfed) from Class 11 Agriculture chapter.', 'For each high-utilization state, write one sentence linking a specific crop (e.g., paddy in Punjab) to its water.', 'Re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that states with high rainfall (e.g., Kerala, Northeast) automatically have high groundwater.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "India\'s water crisis is primarily due to insufficient rainfall." Use data on utilizable water, sectoral demand, and pollution.', answer: 'The statement is false',
                  options: ['The statement is false', 'states with high rainfall (e'],
                  hint: 'If stuck on spatial distribution, revisit Class 11 nodes c11_geo_cbse_09_009 (Drainage Systems) and.',
                  misconception: 'Students believe that states with high rainfall (e.g., Kerala, Northeast) automatically have high groundwater utilization, while states.' }
          ],
            remediations: { 'states-with-high-rainfall-e': { steps: ['Revisit the groundwater utilization map in NCERT Class 12 (Fig.', 'Overlay cropping pattern maps (rice-wheat vs. plantation vs. rainfed) from Class 11 Agriculture chapter.', 'For each high-utilization state, write one sentence linking a specific crop (e.g., paddy in Punjab) to its water.', 'Re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_002', difficulty: 'standard',
          question: 'India\'s drainage system comprises two distinct categories: Himalayan rivers.',
          hint: 'If stuck on basin boundaries, revisit c11_geo_cbse_24_005 (Drainage Patterns.',
          misconception: 'Students believe "all Himalayan rivers are perennial and all Peninsular rivers are seasonal" — but the Brahmaputra\'s.',
          parts: [
                { id: 'a', prompt: 'On an outline map of India, the Ambala-Saharanpur water divide separates the Indus and Ganga drainage basins.', answer: 'Correct trace: Raindrop → surface runoff → seasonal stream → Ghaggar river (or',
                  options: ['Correct trace: Raindrop → surface runoff → seasonal stream → Ghaggar river (or', 'all Himalayan rivers are perennial and all Peninsular rivers are seasonal'],
                  hint: 'If stuck on basin boundaries, revisit c11_geo_cbse_24_005 (Drainage Patterns on Topographical Maps).',
                  misconception: 'Students believe "all Himalayan rivers are perennial and all Peninsular rivers are seasonal" — but the Brahmaputra\'s Tibetan stretch.' },
                { id: 'b', prompt: 'Compare the catchment characteristics of the Narmada and Tapi rivers with those of the Mahanadi and Godavari.', answer: 'Correct analysis: Narmada and Tapi originate on the western flanks of the',
                  options: ['Correct analysis: Narmada and Tapi originate on the western flanks of the', 'all Himalayan rivers are perennial and all Peninsular rivers are seasonal'],
                  hint: 'If stuck on basin boundaries, revisit c11_geo_cbse_24_005 (Drainage Patterns on Topographical Maps).',
                  misconception: 'Students believe "all Himalayan rivers are perennial and all Peninsular rivers are seasonal" — but the Brahmaputra\'s Tibetan stretch.' }
          ],
            remediations: { 'all-himalayan-rivers-are-perennial': { steps: ['Revisit c11_geo_cbse_09_009 (Himalayan vs Peninsular Rivers) — draw a two-column table comparing 5 parameters: source.', 'On a physical map, trace the 16°N latitude line — mark every river crossing it and classify its flow direction.', 'Use the "River Basin Atlas of India" (CWC website) to compare specific yield (MCM/km²) for Narmada vs Krishna — note.', 'Re-attempt Diagnostic Question 4 with the new data.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_003', difficulty: 'standard',
          question: 'Variability of rainfall refers to the spatial and temporal fluctuations.',
          hint: 'If stuck, revisit c11_geo_cbse_10_004 (rainfall distribution) and c11_geo_cbse_11_005.',
          misconception: 'Students often think "water scarcity = low rainfall" and equate Rajasthan\'s scarcity solely to its aridity.',
          parts: [
                { id: 'a', prompt: 'Using the formula CV = (Standard Deviation / Mean) × 100, calculate the coefficient of variation for a station with 30-year mean annual rainfall of 800 mm and.', answer: 'CV = (240/800) × 100 = 30%',
                  options: ['CV = (240/800) × 100 = 30%', 'water scarcity = low rainfall'],
                  hint: 'If stuck, revisit c11_geo_cbse_10_004 (rainfall distribution) and c11_geo_cbse_11_005 (drought.',
                  misconception: 'Students often think "water scarcity = low rainfall" and equate Rajasthan\'s scarcity solely to its aridity.' }
          ],
            remediations: { 'water-scarcity-low-rainfall-and': { steps: ['Revisit c11_geo_cbse_10_004 (Distribution of Rainfall in India) to relearn spatial patterns — draw a map marking 5.', 'Revisit c11_geo_cbse_11_005 (Droughts: Types) to distinguish meteorological vs hydrological vs agricultural drought.', 'Revisit c11_geo_cbse_13_007 (Water Scarcity: Causes) to separate physical vs economic scarcity drivers.', 'Take a diagnostic: given a district\'s rainfall data (mean, CV, monthly distribution), classify its scarcity type and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_004', difficulty: 'standard',
          question: 'A multipurpose river project is a large-scale hydraulic engineering scheme that.',
          hint: 'If unclear on rainfall variability, revisit c12_geo_cbse_12_003 and Class 11 node.',
          misconception: 'Students often think "multipurpose project" is just a synonym for "big dam" and that all such projects have identical.',
          parts: [
                { id: 'a', prompt: 'The Bhakra-Nangal project on the Sutlej river provides irrigation to 1.5 million hectares and generates 1,325 MW of power.', answer: 'Step 1: Identify consumptive use (irrigation) = 5.5 BCM',
                  options: ['Step 1: Identify consumptive use (irrigation) = 5.5 BCM', 'multipurpose project', 'big dam'],
                  hint: 'If unclear on rainfall variability, revisit c12_geo_cbse_12_003 and Class 11 node.',
                  misconception: 'Students often think "multipurpose project" is just a synonym for "big dam" and that all such projects have identical objectives.' },
                { id: 'b', prompt: 'Compare the objectives of the Damodar Valley Corporation (DVC) and the Indira Gandhi Canal Project.', answer: 'DVC (Damodar basin, Jharkhand/West Bengal): Primary objectives',
                  options: ['DVC (Damodar basin, Jharkhand/West Bengal): Primary objectives', 'multipurpose project', 'big dam'],
                  hint: 'If unclear on rainfall variability, revisit c12_geo_cbse_12_003 and Class 11 node.',
                  misconception: 'Students often think "multipurpose project" is just a synonym for "big dam" and that all such projects have identical objectives.' }
          ],
            remediations: { 'multipurpose-project-is-just-a': { steps: ['If the student cannot differentiate project objectives by region: (1) Revisit c12_geo_cbse_12_002 (river basins) and.', '(2) Create a 3-column table: Project | Basin Geography (rainfall, terrain, water problem) | Primary Objectives.', 'Fill for Bhakra (Sutlej, Himalayan, seasonal flow → irrigation+power), Damodar (Chotanagpur plateau, flash floods →.', '(3) Re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_005', difficulty: 'standard',
          question: 'Major multipurpose river valley projects are large-scale dams and associated.',
          hint: 'If stuck, revisit c12_geo_cbse_12_004 (project classification) and c11_geo_cbse_09_009.',
          misconception: 'Students often think **Bhakra-Nangal and Damodar Valley are similar "big dams" differing only in location**.',
          parts: [
                { id: 'a', prompt: 'Name the river on which Bhakra Dam is built and the reservoir it creates. Which three states are the primary beneficiaries of its irrigation and power?', answer: 'Bhakra Dam is on the **Sutlej River** creating **Gobind Sagar Reservoir**',
                  options: ['Bhakra Dam is on the **Sutlej River** creating **Gobind Sagar Reservoir**', 'big dams', 'Beas or Ravi'],
                  hint: 'If stuck, revisit c12_geo_cbse_12_004 (project classification) and c11_geo_cbse_09_009 (Himalayan.',
                  misconception: 'Students often think **Bhakra-Nangal and Damodar Valley are similar "big dams" differing only in location**.' },
                { id: 'b', prompt: 'Using the data: Bhakra Dam height = 226 m, Gobind Sagar live storage = 7.19 billion cubic meters (BCM).', answer: '**Bhakra:** 7.19 BCM / 226 m ≈ **0.0318 BCM/m**',
                  options: ['**Bhakra:** 7.19 BCM / 226 m ≈ **0.0318 BCM/m**', 'big dams'],
                  hint: 'If stuck, revisit c12_geo_cbse_12_004 (project classification) and c11_geo_cbse_09_009 (Himalayan.',
                  misconception: 'Students often think **Bhakra-Nangal and Damodar Valley are similar "big dams" differing only in location**.' }
          ],
            remediations: { 'bhakra-nangal-and-damodar-valley': { steps: ['**Revisit c12_geo_cbse_12_004** (Multipurpose Projects: Concept) — specifically the table linking *river regime* →.', '**Review Class 11 nodes c11_geo_cbse_13_003 (Bhakra-Nangal) and c11_geo_cbse_13_004 (Damodar Valley)** — make.', 'Monsoon), Regime (Perennial vs.', 'Flashy), Dam Height (High vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_006', difficulty: 'standard',
          question: 'The Indira Gandhi Canal (formerly Rajasthan Canal) is India\'s longest canal.',
          hint: 'If stuck on "why this canal here?", revisit **c12_geo_cbse_12_003** (Variability.',
          misconception: 'Students often think the Indira Gandhi Canal **originates at Bhakra Dam** because both are on the Sutlej and Bhakra.',
          parts: [
                { id: 'a', prompt: 'Name the barrage that serves as the headworks of the Indira Gandhi Canal and the two rivers whose confluence it regulates.', answer: 'Harike Barrage, at the confluence of the Sutlej and Beas rivers in Punjab',
                  options: ['Harike Barrage, at the confluence of the Sutlej and Beas rivers in Punjab', 'Bhakra Dam', 'Sutlej alone'],
                  hint: 'If stuck on "why this canal here?", revisit **c12_geo_cbse_12_003** (Variability of Rainfall and.',
                  misconception: 'Students often think the Indira Gandhi Canal **originates at Bhakra Dam** because both are on the Sutlej and Bhakra is more famous.' }
          ],
            remediations: { 'the-indira-gandhi-canal-originates': { steps: ['Open an outline map of India.', 'Mark: (a) Bhakra Dam (Himachal Pradesh), (b) Harike Barrage (Punjab), (c) Indira Gandhi Canal route through Hanumangarh.', 'Read the NCERT Class 12 text (Chapter 4, "Multipurpose River Projects") and underline the sentence: *"The Indira Gandhi.', 'takes off from Harike Barrage."* 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
