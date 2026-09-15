import type { SimDef } from '../../engine/types';
import C12_GeographyWaterResourcesIrrigationSim from '../../../simulations/c6_12/C12_GeographyWaterResourcesIrrigationSim';

/** v3 wrapped master — C12_GeographyWaterResourcesIrrigationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_geographywaterresourcesirrigationsim: SimDef = {
    id: 'v3w_c12_geographywaterresourcesirrigationsim',
    title: 'Water Resources Irrigation',
    subtitle: 'This node covers the conceptual definition, primary objectives, and rationale for.',
    classLevel: 12, subject: 'geography', topic: 'Multipurpose River Projects: Concept and Objectives',
    chapters: [],
    nodeIds: ['c12_geo_cbse_12_004', 'c12_geo_cbse_12_008', 'c12_geo_cbse_12_010', 'c12_geo_cbse_12_005', 'c12_geo_cbse_12_006', 'c12_geo_cbse_12_007', 'c12_geo_cbse_12_011', 'c12_geo_cbse_12_001', 'c12_geo_cbse_12_002', 'c12_geo_cbse_12_009', 'c12_geo_cbse_11_008', 'c12_geo_cbse_09_001', 'c12_geo_cbse_12_003', 'c12_geo_cbse_09_011', 'c12_geo_cbse_01_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe how your city/town gets electricity and water during summer — often from a distant dam like Bhakra or.', goal: 'Master Water Resources Irrigation.' },
    discovery: {
        question: 'The Bhakra-Nangal project on the Sutlej river provides irrigation to 1.5 million hectares and generates 1,325 MW of power.',
        options: ['Step 1: Identify consumptive use (irrigation) = 5.5 BCM', 'multipurpose project', 'big dam'],
        answer: 'Step 1: Identify consumptive use (irrigation) = 5.5 BCM',
        hook: 'Students often think "multipurpose project" is just a synonym for "big dam" and that all such projects have identical.',
    },
    teaching: [
        { title: 'A multipurpose river project is a.', text: 'A multipurpose river project is a large-scale hydraulic engineering scheme that integrates a dam, reservoir, and associated infrastructure to simultaneously serve multiple objectives — primarily.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_geo_cbse_12_004', title: 'A multipurpose river project is a.',
          scaffold: { problem: 'A central Indian river basin receives 1,200 mm annual rainfall, 85% concentrated in June-September. The basin area is 25,000 km².',
            steps: [
            { text: 'Convert rainfall to meters: 1,200 mm = 1.2 m.' },
            { text: 'Calculate total annual precipitation volume = Basin area × Rainfall = 25,000 km² × 1.2 m = 25,000 × 10⁶ m² × 1.2 m =.' },
            { text: 'Calculate annual runoff volume = Precipitation volume × Runoff coefficient = 30 BCM × 0.35 = 10.5 BCM.' },
            { text: 'Reservoir live storage = 3.5 BCM. Percentage of runoff stored = (3.5 / 10.5) × 100 = 33.3%.' },
            { text: 'Interpretation: The reservoir captures one-third of annual runoff.', faded: true, blankAnswer: 'Annual runoff = 10.5 BCM. Reservoir stores 33.3% of annual.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_12_008', title: 'Modern rainwater harvesting refers to.',
          scaffold: { problem: 'A primary school in a village in Tamil Nadu has a roof area of 250 m².',
            steps: [
            { text: 'Calculate annual harvestable volume = 250 × 900 × 0.85 × 0.001 = 191,250 litres.' },
            { text: 'Determine storage requirement for 60 days = 200 × 60 = 12,000 litres.' },
            { text: 'Since annual harvest (191,250 L) >> storage need (12,000 L), a 12,000 L tank is sufficient; excess can be directed to a.' },
            { text: 'Design recharge well: diameter 1.5 m, depth 10 m, filled with filter media (boulders, gravel, sand) to recharge the.' },
            { text: 'Include first-flush diverter (to discard initial 2 mm of rain carrying dust/bird droppings) and mesh filter at tank.', faded: true, blankAnswer: '12,000 L storage tank + 1.5 m dia × 10 m deep recharge well.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_12_010', title: 'Inter-state water disputes are.',
          scaffold: { problem: 'The Krishna river basin spans Maharashtra, Karnataka, and Andhra Pradesh (now Andhra + Telangana).',
            steps: [
            { text: 'Identify the total allocated amount = 560 + 700 + 800 = 2060 TMC (matches 75% dependable flow)' },
            { text: 'Calculate the deficit ratio = Actual flow / Allocated total = 1400 / 2060 ≈ 0.68 (68% of allocation available)' },
            { text: 'Apply proportional reduction: Maharashtra gets 560 × 0.68 ≈ 381 TMC; Karnataka gets 700 × 0.68 ≈ 476 TMC; Andhra gets.' },
            { text: 'Calculate absolute reductions: Maharashtra loses 179 TMC; Karnataka loses 224 TMC; Andhra loses 256 TMC' },
            { text: 'Analyze conflict potential: Andhra (downstream, delta agriculture) loses the largest absolute volume (256 TMC) during.', faded: true, blankAnswer: 'Proportional allocations: Maharashtra ~381 TMC, Karnataka.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_12_005', title: 'Major multipurpose river valley.',
          scaffold: { problem: 'A student is asked to explain why Bhakra Dam is a gravity dam while Maithon Dam (DVC) is a combination of concrete and earthen dam.',
            steps: [
            { text: 'Identify the river valley cross-section. Bhakra: Sutlej flows through a **deep, narrow gorge in the Himalayan.' },
            { text: 'Recall dam type selection criteria. **Gravity dams** require **strong rock foundations** to resist overturning by water.' },
            { text: 'Apply to Bhakra. Narrow gorge (width ~100 m at top) + strong rock → **226 m high concrete gravity dam** is optimal.' },
            { text: 'Apply to Maithon. Wide valley (width > 500 m) + weak laterite → **Composite dam**: central concrete.' },
            { text: 'Verify with function. Bhakra\'s height creates **high hydraulic head (200+ m)** for efficient power generation *and*.', faded: true, blankAnswer: 'Bhakra uses gravity dam due to narrow gorge and strong.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_12_006', title: 'The Indira Gandhi Canal (formerly.',
          scaffold: { problem: 'A farmer in Sri Ganganagar (Stage I command area) has 5 hectares.',
            steps: [
            { text: 'Identify current water use. Wheat (flood) = 600 mm/ha; Cotton (flood) = 800 mm/ha.' },
            { text: 'Select alternative crops. Replace wheat with mustard (350 mm, drip) and cotton with cluster bean (guar, 300 mm,.' },
            { text: 'Calculate new water use. Mustard (drip, 60% efficiency) = 350/0.6 = 583 mm; Guar (sprinkler, 75% efficiency) = 300/0.75.' },
            { text: 'Compute savings. Reduction = (35,000 - 4,915) = 30,085 m³/year (86% less).' },
            { text: 'Add soil amendment. Apply gypsum 5 t/ha in Year 1, green manure (dhaincha) pre-Kharif Years 2-3.', faded: true, blankAnswer: 'Transition to mustard-guar rotation with drip/sprinkler.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_12_007', title: 'Traditional rainwater harvesting.',
          scaffold: { problem: 'A farmer in Jaisalmer owns 2 ha of land with a gentle slope (1.5%) and a clay layer at 2 m depth.',
            steps: [
            { text: 'Calculate total catchment area = 2 ha (own) + 1 ha (upstream) = 3 ha = 30,000 m².' },
            { text: 'Compute total rainfall volume on catchment = 30,000 m² × 0.300 m = 9,000 m³.' },
            { text: 'Compute runoff volume = 9,000 m³ × 0.4 = 3,600 m³.' },
            { text: 'Account for seepage loss (20%) → net stored volume = 3,600 × 0.8 = 2,880 m³.' },
            { text: 'Wheat water requirement for 2 ha = 20,000 m² × 0.450 m = 9,000 m³.' },
            { text: 'Bund design: to store 2,880 m³ on 2 ha (20,000 m²), average water depth = 2,880 / 20,000 = 0.144 m.', faded: true, blankAnswer: 'Khadin bund ~1.5 m high, 200 m long, storing ~1,500 m³.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_geo_cbse_12_008', title: 'Identify each idea',
          dissect: { specimen: 'Water Resources Irrigation', spots: [
            { id: 's1', label: 'A multipurpose river project is', prompt: 'Which idea is this? — A multipurpose river project is a large-scale hydraulic engineering scheme that.', answer: 'A multipurpose river project is', options: ['A multipurpose river project is', 'Modern rainwater harvesting refers to', 'Inter-state water disputes are conflicts', 'Major multipurpose river valley projects'] },
            { id: 's2', label: 'Modern rainwater harvesting refers to', prompt: 'Which idea is this? — Modern rainwater harvesting refers to engineered techniques for capturing, storing, and.', answer: 'Modern rainwater harvesting refers to', options: ['Modern rainwater harvesting refers to', 'A multipurpose river project is', 'Inter-state water disputes are conflicts', 'Major multipurpose river valley projects'] },
            { id: 's3', label: 'Inter-state water disputes are conflicts', prompt: 'Which idea is this? — Inter-state water disputes are conflicts between two or more Indian states over the.', answer: 'Inter-state water disputes are conflicts', options: ['Inter-state water disputes are conflicts', 'A multipurpose river project is', 'Modern rainwater harvesting refers to', 'Major multipurpose river valley projects'] },
            { id: 's4', label: 'Major multipurpose river valley projects', prompt: 'Which idea is this? — Major multipurpose river valley projects are large-scale dams and associated.', answer: 'Major multipurpose river valley projects', options: ['Major multipurpose river valley projects', 'A multipurpose river project is', 'Modern rainwater harvesting refers to', 'Inter-state water disputes are conflicts'] },
            { id: 's5', label: 'The Indira Gandhi Canal formerly', prompt: 'Which idea is this? — The Indira Gandhi Canal (formerly Rajasthan Canal) is India\'s longest canal system.', answer: 'The Indira Gandhi Canal formerly', options: ['The Indira Gandhi Canal formerly', 'A multipurpose river project is', 'Modern rainwater harvesting refers to', 'Inter-state water disputes are conflicts'] },
            { id: 's6', label: 'Traditional rainwater harvesting methods in', prompt: 'Which idea is this? — Traditional rainwater harvesting methods in India are indigenous, community-managed.', answer: 'Traditional rainwater harvesting methods in', options: ['Traditional rainwater harvesting methods in', 'A multipurpose river project is', 'Modern rainwater harvesting refers to', 'Inter-state water disputes are conflicts'] }
          ] } }
    ],
    explore: { component: C12_GeographyWaterResourcesIrrigationSim, prompt: 'Explore the interactive — Water Resources Irrigation' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_004', difficulty: 'standard',
          question: 'A multipurpose river project is a large-scale hydraulic engineering scheme that.',
          hint: 'If unclear on rainfall variability, revisit c12_geo_cbse_12_003 and Class 11 node.',
          misconception: 'Students often think "multipurpose project" is just a synonym for "big dam" and that all such projects have identical.',
          parts: [
                { id: 'a', prompt: 'The Bhakra-Nangal project on the Sutlej river provides irrigation to 1.5 million hectares and generates 1,325 MW of power.', answer: 'Step 1: Identify consumptive use (irrigation) = 5.5 BCM',
                  options: ['Step 1: Identify consumptive use (irrigation) = 5.5 BCM', 'multipurpose project', 'big dam'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "multipurpose project" is just a synonym for "big dam" and that all such projects have identical objectives.' },
                { id: 'b', prompt: 'Compare the objectives of the Damodar Valley Corporation (DVC) and the Indira Gandhi Canal Project.', answer: 'DVC (Damodar basin, Jharkhand/West Bengal): Primary objectives',
                  options: ['DVC (Damodar basin, Jharkhand/West Bengal): Primary objectives', 'multipurpose project', 'big dam'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "multipurpose project" is just a synonym for "big dam" and that all such projects have identical objectives.' }
          ],
            remediations: { 'multipurpose-project-is-just-a': { steps: ['If the student cannot differentiate project objectives by region: (1) Revisit c12_geo_cbse_12_002 (river basins) and.', '(2) Create a 3-column table: Project | Basin Geography (rainfall, terrain, water problem) | Primary Objectives.', 'Fill for Bhakra (Sutlej, Himalayan, seasonal flow → irrigation+power), Damodar (Chotanagpur plateau, flash floods →.', '(3) Re-attempt Diagnostic Question 4.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "multipurpose project" is just a synonym for "big dam" and that all such projects have identical.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Multipurpose river projects are the most sustainable solution to India\'s water scarcity." Consider environmental, social, and economic.', answer: 'Not fully sustainable',
                  options: ['Not fully sustainable', 'yes, they solve everything', 'no, they are destructive', 'multipurpose project'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "multipurpose project" is just a synonym for "big dam" and that all such projects have identical objectives.' },
                { id: 'b', prompt: 'Compare the objectives of the Damodar Valley Corporation (DVC) and the Indira Gandhi Canal Project.', answer: 'DVC (Damodar basin, Jharkhand/West Bengal): Primary objectives',
                  options: ['DVC (Damodar basin, Jharkhand/West Bengal): Primary objectives', 'multipurpose project', 'big dam'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "multipurpose project" is just a synonym for "big dam" and that all such projects have identical objectives.' }
          ],
            remediations: { 'multipurpose-project-is-just-a': { steps: ['If the student cannot differentiate project objectives by region: (1) Revisit c12_geo_cbse_12_002 (river basins) and.', '(2) Create a 3-column table: Project | Basin Geography (rainfall, terrain, water problem) | Primary Objectives.', 'Fill for Bhakra (Sutlej, Himalayan, seasonal flow → irrigation+power), Damodar (Chotanagpur plateau, flash floods →.', '(3) Re-attempt Diagnostic Question 4.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_008', difficulty: 'standard',
          question: 'Modern rainwater harvesting refers to engineered techniques for capturing,.',
          hint: 'If stuck on watershed delineation, revisit Class 11 topo-sheet interpretation.',
          misconception: 'Students think "rainwater harvesting" and "watershed management" are synonymous or that watershed management only means.',
          parts: [
                { id: 'a', prompt: 'Define "watershed management" as described in the NCERT Class 12 textbook, and name two government programmes that implement it in India.', answer: 'Watershed management is the efficient management and conservation of surface and',
                  options: ['Watershed management is the efficient management and conservation of surface and', 'building check dams', 'Namami Gange'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "rainwater harvesting" and "watershed management" are synonymous or that watershed management only means building check.' },
                { id: 'b', prompt: 'A house in Delhi has a flat roof of 12 m × 10 m. The average annual rainfall is 700 mm. The runoff coefficient for concrete roof is 0.85.', answer: 'Step 1: Roof area = 12 × 10 = 120 m²',
                  options: ['Step 1: Roof area = 12 × 10 = 120 m²', 'rainwater harvesting', 'watershed management'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "rainwater harvesting" and "watershed management" are synonymous or that watershed management only means building check.' }
          ],
            remediations: { 'rainwater-harvesting-and-watershed-management': { steps: ['Draw a watershed boundary on a topo-sheet (use contour lines) — show it covers multiple villages, streams, ridges.', 'Mark a single house roof — that\'s rainwater harvesting scale.', 'List all structures in the NCERT text (Fig 4.3) and classify each as "point-scale harvesting" (rooftop tank, recharge.', 'Re-read the Ralegan Siddhi case study and identify which interventions were point-scale vs watershed-scale.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "rainwater harvesting" and "watershed management" are synonymous or that watershed management only means.',
          parts: [
                { id: 'a', prompt: 'Critically evaluate the statement: "Watershed management alone can solve India\'s water scarcity problem." Use evidence from the Ralegan Siddhi case study and.', answer: 'Watershed management is necessary but not sufficient',
                  options: ['Watershed management is necessary but not sufficient', 'rainwater harvesting', 'watershed management', 'watershed management is rooftop harvesting in villages'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "rainwater harvesting" and "watershed management" are synonymous or that watershed management only means building check.' },
                { id: 'b', prompt: 'Design a rainwater harvesting and watershed management plan for a 50-hectare village in semi-arid Maharashtra (annual rainfall 600 mm, black cotton soil,.', answer: 'two rooftop structures for public buildings, (',
                  options: ['two rooftop structures for public buildings, (', 'rainwater harvesting', 'watershed management', 'watershed management is rooftop harvesting in villages'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "rainwater harvesting" and "watershed management" are synonymous or that watershed management only means building check.' }
          ],
            remediations: { 'rainwater-harvesting-and-watershed-management': { steps: ['Draw a watershed boundary on a topo-sheet (use contour lines) — show it covers multiple villages, streams, ridges.', 'Mark a single house roof — that\'s rainwater harvesting scale.', 'List all structures in the NCERT text (Fig 4.3) and classify each as "point-scale harvesting" (rooftop tank, recharge.', 'Re-read the Ralegan Siddhi case study and identify which interventions were point-scale vs watershed-scale.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_010', difficulty: 'standard',
          question: 'Inter-state water disputes are conflicts between two or more Indian states over.',
          hint: 'If unable to locate basins or riparian states, return to c11_geo_cbse_09_009 and practice.',
          misconception: 'Students believe inter-state water disputes are simply "upstream state stealing water from downstream state" — a.',
          parts: [
                { id: 'a', prompt: 'The Cauvery basin covers ~81,000 km² with Karnataka (upstream) and Tamil Nadu (downstream) as major riparian states.', answer: 'Percentage reduction = (50/400) × 100 = 12.5% reduction',
                  options: ['Percentage reduction = (50/400) × 100 = 12.5% reduction', 'upstream state stealing water from downstream state'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe inter-state water disputes are simply "upstream state stealing water from downstream state" — a zero-sum theft narrative.' },
                { id: 'b', prompt: 'Compare the Cauvery dispute (Karnataka vs Tamil Nadu) and the Ravi-Beas dispute (Punjab vs Haryana) in terms of: (a) river type (peninsular vs Himalayan), (b).', answer: 'in terms of: (',
                  options: ['in terms of: (', 'both are about irrigation', 'upstream state stealing water from downstream state'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe inter-state water disputes are simply "upstream state stealing water from downstream state" — a zero-sum theft narrative.' }
          ],
            remediations: { 'inter-state-water-disputes-are': { steps: ['Revisit **c11_geo_cbse_09_009** (Drainage Systems of India) to re-map the Cauvery, Krishna, Godavari, Narmada,.', 'Revisit **c11_geo_cbse_13_007** (Water Scarcity: Causes and Inter-State Water Conflicts) to distinguish between.', 'Complete a map exercise: On an outline map of India, draw the 6 major disputed basins, mark the riparian states, and.', 'Re-attempt Diagnostic Questions 2 and 4 — they test the structural understanding that memorisation cannot provide.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe inter-state water disputes are simply "upstream state stealing water from downstream state" — a.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of tribunal-based adjudication (e.g., Cauvery Water Disputes Tribunal, 1990-2007; final award 2007, notified 2013) in resolving.', answer: 'Tribunals provide legally binding awards but suffer from: (1) Excessive duration',
                  options: ['Tribunals provide legally binding awards but suffer from: (1) Excessive duration', 'tribunals solve disputes', 'upstream state stealing water from downstream state'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe inter-state water disputes are simply "upstream state stealing water from downstream state" — a zero-sum theft narrative.' },
                { id: 'b', prompt: 'Compare the Cauvery dispute (Karnataka vs Tamil Nadu) and the Ravi-Beas dispute (Punjab vs Haryana) in terms of: (a) river type (peninsular vs Himalayan), (b).', answer: 'in terms of: (',
                  options: ['in terms of: (', 'both are about irrigation', 'upstream state stealing water from downstream state'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe inter-state water disputes are simply "upstream state stealing water from downstream state" — a zero-sum theft narrative.' }
          ],
            remediations: { 'inter-state-water-disputes-are': { steps: ['Revisit **c11_geo_cbse_09_009** (Drainage Systems of India) to re-map the Cauvery, Krishna, Godavari, Narmada,.', 'Revisit **c11_geo_cbse_13_007** (Water Scarcity: Causes and Inter-State Water Conflicts) to distinguish between.', 'Complete a map exercise: On an outline map of India, draw the 6 major disputed basins, mark the riparian states, and.', 'Re-attempt Diagnostic Questions 2 and 4 — they test the structural understanding that memorisation cannot provide.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_005', difficulty: 'standard',
          question: 'Major multipurpose river valley projects are large-scale dams and associated.',
          hint: 'If stuck, revisit c12_geo_cbse_12_004 (project classification) and c11_geo_cbse_09_009.',
          misconception: 'Students often think **Bhakra-Nangal and Damodar Valley are similar "big dams" differing only in location**.',
          parts: [
                { id: 'a', prompt: 'Name the river on which Bhakra Dam is built and the reservoir it creates. Which three states are the primary beneficiaries of its irrigation and power?', answer: 'Bhakra Dam is on the **Sutlej River** creating **Gobind Sagar Reservoir**',
                  options: ['Bhakra Dam is on the **Sutlej River** creating **Gobind Sagar Reservoir**', 'big dams'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **Bhakra-Nangal and Damodar Valley are similar "big dams" differing only in location**.' },
                { id: 'b', prompt: 'Using the data: Bhakra Dam height = 226 m, Gobind Sagar live storage = 7.19 billion cubic meters (BCM).', answer: '**Bhakra:** 7.19 BCM / 226 m ≈ **0.0318 BCM/m**',
                  options: ['**Bhakra:** 7.19 BCM / 226 m ≈ **0.0318 BCM/m**', 'big dams'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **Bhakra-Nangal and Damodar Valley are similar "big dams" differing only in location**.' }
          ],
            remediations: { 'bhakra-nangal-and-damodar-valley': { steps: ['**Revisit c12_geo_cbse_12_004** (Multipurpose Projects: Concept) — specifically the table linking *river regime* →.', '**Review Class 11 nodes c11_geo_cbse_13_003 (Bhakra-Nangal) and c11_geo_cbse_13_004 (Damodar Valley)** — make a.', 'Monsoon), Regime (Perennial vs.', 'Flashy), Dam Height (High vs.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think **Bhakra-Nangal and Damodar Valley are similar "big dams" differing only in location**.',
          parts: [
                { id: 'a', prompt: 'Design a 3-point "Sustainability Audit" checklist for a *new* multipurpose project on a Himalayan river (like Bhakra) vs. a Peninsular river (like Damodar).', answer: '**Himalayan River (Bhakra-type) Audit:** 1',
                  options: ['**Himalayan River (Bhakra-type) Audit:** 1', 'big dams'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **Bhakra-Nangal and Damodar Valley are similar "big dams" differing only in location**.' }
          ],
            remediations: { 'bhakra-nangal-and-damodar-valley': { steps: ['**Revisit c12_geo_cbse_12_004** (Multipurpose Projects: Concept) — specifically the table linking *river regime* →.', '**Review Class 11 nodes c11_geo_cbse_13_003 (Bhakra-Nangal) and c11_geo_cbse_13_004 (Damodar Valley)** — make a.', 'Monsoon), Regime (Perennial vs.', 'Flashy), Dam Height (High vs.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_006', difficulty: 'standard',
          question: 'The Indira Gandhi Canal (formerly Rajasthan Canal) is India\'s longest canal.',
          hint: 'If stuck on "why this canal here?", revisit **c12_geo_cbse_12_003** (Variability of.',
          misconception: 'Students often think the Indira Gandhi Canal **originates at Bhakra Dam** because both are on the Sutlej and Bhakra is.',
          parts: [
                { id: 'a', prompt: 'Name the barrage that serves as the headworks of the Indira Gandhi Canal and the two rivers whose confluence it regulates.', answer: 'Harike Barrage, at the confluence of the Sutlej and Beas rivers in Punjab',
                  options: ['Harike Barrage, at the confluence of the Sutlej and Beas rivers in Punjab', 'Bhakra Dam', 'Sutlej alone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Indira Gandhi Canal **originates at Bhakra Dam** because both are on the Sutlej and Bhakra is more famous.' }
          ],
            remediations: { 'the-indira-gandhi-canal-originates': { steps: ['Open an outline map of India.', 'Mark: (a) Bhakra Dam (Himachal Pradesh), (b) Harike Barrage (Punjab), (c) Indira Gandhi Canal route through Hanumangarh.', 'Read the NCERT Class 12 text (Chapter 4, "Multipurpose River Projects") and underline the sentence: *"The Indira Gandhi.', 'takes off from Harike Barrage."* 3.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_007', difficulty: 'standard',
          question: 'Traditional rainwater harvesting methods in India are indigenous,.',
          hint: 'If stuck, revisit "Variability of Rainfall and Water Scarcity in India".',
          misconception: 'Students often think "khadin, tanka, johad" are just synonyms for "pond" and can be used interchangeably.',
          parts: [
                { id: 'a', prompt: 'Name the traditional rainwater harvesting structure that is a covered underground tank used primarily for drinking water in western Rajasthan, and state the.', answer: 'Correct answer: Tanka (or Kund), lined with lime plaster (chuna)',
                  options: ['Correct answer: Tanka (or Kund), lined with lime plaster (chuna)', 'khadin', 'khadin, tanka, johad'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "khadin, tanka, johad" are just synonyms for "pond" and can be used interchangeably.' },
                { id: 'b', prompt: 'Explain why khadins are built on gently sloping agricultural land with impermeable sub-soil, whereas johads are constructed across seasonal drainage lines in.', answer: 'Khadins require a large catchment area on gentle slopes to collect sheet runoff',
                  options: ['Khadins require a large catchment area on gentle slopes to collect sheet runoff', 'khadin, tanka, johad'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "khadin, tanka, johad" are just synonyms for "pond" and can be used interchangeably.' },
                { id: 'c', prompt: 'A village in Barmer district (average annual rainfall 250 mm, high intensity storms, sandy soil with underlying clay layer at 3 m depth) wants to build a.', answer: 'Step 1: Convert tanka capacity to m³: 20,000 L = 20 m³',
                  options: ['Step 1: Convert tanka capacity to m³: 20,000 L = 20 m³', 'khadin, tanka, johad'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "khadin, tanka, johad" are just synonyms for "pond" and can be used interchangeably.' }
          ],
            remediations: { 'khadin': { steps: ['Re-read the NCERT paragraph on "Rainwater Harvesting" (page 50-51) and label Figure 4.3 mentally: identify which sketch.', 'Watch a 5-min video of johad construction in Alwar (search "Tarun Bharat Sangh johad") — note the community labour and.', 'Do a quick water-balance calc: your roof area = 100 m², rainfall = 600 mm, runoff coeff.', '= 0.8, efficiency = 0.9 → how many litres can you store?'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "khadin, tanka, johad" are just synonyms for "pond" and can be used interchangeably.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Revival of johads in Alwar district (by Tarun Bharat Sangh) succeeded because the structures are technically simple; social.', answer: 'The statement is false',
                  options: ['The statement is false', 'khadin, tanka, johad'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "khadin, tanka, johad" are just synonyms for "pond" and can be used interchangeably.' },
                { id: 'b', prompt: 'Design a combined traditional harvesting plan for a 500-ha micro-watershed in a semi-arid region (rainfall 400 mm, undulating terrain with seasonal streams,.', answer: 'A good answer: (a) 3-4 johads on 1st/2nd order streams for groundwater recharge',
                  options: ['A good answer: (a) 3-4 johads on 1st/2nd order streams for groundwater recharge', 'khadin, tanka, johad'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "khadin, tanka, johad" are just synonyms for "pond" and can be used interchangeably.' }
          ],
            remediations: { 'khadin': { steps: ['Re-read the NCERT paragraph on "Rainwater Harvesting" (page 50-51) and label Figure 4.3 mentally: identify which sketch.', 'Watch a 5-min video of johad construction in Alwar (search "Tarun Bharat Sangh johad") — note the community labour and.', 'Do a quick water-balance calc: your roof area = 100 m², rainfall = 600 mm, runoff coeff.', '= 0.8, efficiency = 0.9 → how many litres can you store?'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
