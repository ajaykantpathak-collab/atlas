import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch12_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch12_p2: SimDef = {
    id: 'v3_c12_geo_ch12_p2',
    title: 'Water Resources · Part 2/2',
    subtitle: 'It rains plenty — the crisis is in the plumbing',
    classLevel: 12, subject: 'geography', topic: 'Water Resources · Part 2/2',
    chapters: ['c12_geo_ch12'],
    nodeIds: ['c12_geo_cbse_12_007', 'c12_geo_cbse_12_008', 'c12_geo_cbse_12_009', 'c12_geo_cbse_12_010', 'c12_geo_cbse_12_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Water-resource analyst', intro: 'The Yamuna trickles in summer and floods in monsoon while Punjab\'s tubewells run twelve hours a day. Two symptoms, one diagnosis.', goal: 'Analyse India\'s water budget — availability versus utilizability — and the agricultural demand driving groundwater depletion.' },
    discovery: {
        question: 'Kerala drenched in rain barely touches its groundwater; semi-arid Punjab pumps past 100% of recharge. Why do the dry states run out first?',
        options: ['Demand, not rainfall — rice-wheat cropping on subsidised tubewell power drives extraction; rain-rich states with less irrigation need barely pump', 'Punjab gets no rain at all', 'Kerala\'s water is polluted', 'Punjab\'s aquifers are bigger'],
        answer: 'Demand, not rainfall — rice-wheat cropping on subsidised tubewell power drives extraction; rain-rich states with less irrigation need barely pump',
        hook: 'India\'s \'water crisis\' isn\'t a rainfall shortage: 4,000 km³ falls annually, but only 1,122 km³ is utilizable — and 89–92% of that goes to agriculture. The crisis is a mismatch — of season, of place, of crop choice — plus pollution making what remains unusable.',
    },
    teaching: [
        { title: 'Rainwater Harvesting: Traditional Methods (Khadins, Tankas, Johads)', text: 'Traditional rainwater harvesting methods in India are indigenous, community-managed systems that capture and store monsoon runoff using locally available materials and terrain-specific designs.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_12_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run India\'s water budget end to end: trace 4,000 km³ of rain down to the 1,122 we can actually use, split it by sector, and diagnose which states are mining their aquifers dry.',
        labels: ['Rainwater Harvesting: Traditional Methods', 'Rainwater Harvesting: Modern Methods', 'Water Conservation: Need', 'Inter-State Water Disputes: Causes', 'Dams: Benefits and Environmental'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_geo_cbse_12_007', title: 'Rainwater Harvesting: Traditional Methods (Khadins, Tankas, Johads)',
          caseStudy: { intro: 'Imagine you are visiting a village in Jaisalmer during the monsoon: you see a long earthen bund (embankment) across a gentle slope, and behind it the water.',
            decisions: [{ prompt: 'Name the traditional rainwater harvesting structure that is a covered underground tank used primarily for drinking water in western.', options: [
                { text: 'Correct answer: Tanka (or Kund), lined with lime plaster (chuna)', outcome: 'Correct answer: Tanka (or Kund), lined with lime plaster (chuna).' },
                { text: 'khadin', outcome: 'Not quite — Students often think "khadin, tanka, johad" are just synonyms for "pond" and can be used.', reveals: 'khadin' },
                { text: 'khadin, tanka, johad', outcome: 'Not quite — Students often think "khadin, tanka, johad" are just synonyms for "pond" and can be used.', reveals: 'khadin' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_12_008', title: 'Rainwater Harvesting: Modern Methods and Watershed Management',
          scaffold: { problem: 'A primary school in a village in Tamil Nadu has a roof area of 250 m².',
            steps: [
            { text: 'Calculate annual harvestable volume = 250 × 900 × 0.85 × 0.001 = 191,250 litres.' },
            { text: 'Determine storage requirement for 60 days = 200 × 60 = 12,000 litres.' },
            { text: 'Since annual harvest (191,250 L) >> storage need (12,000 L), a 12,000 L tank is sufficient; excess can be directed to.' },
            { text: 'Design recharge well: diameter 1.5 m, depth 10 m, filled with filter media (boulders, gravel, sand) to recharge the.' },
            { text: 'Include first-flush diverter (to discard initial 2 mm of rain carrying dust/bird droppings) and mesh filter at tank.', faded: true, blankAnswer: '12,000 L storage tank + 1.5 m dia × 10 m deep recharge well.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_12_010', title: 'Inter-State Water Disputes: Causes and Examples',
          caseStudy: { intro: 'Observe how the Cauvery river, originating in Karnataka\'s Kodagu district, flows through Tamil Nadu\'s delta region — the same water that grows coffee in Coorg.',
            decisions: [{ prompt: 'Name the constitutional article that provides for the adjudication of inter-state water disputes and the specific Act enacted under it.', options: [
                { text: 'Article 262 of the Constitution provides for adjudication of inter-state water disputes,', outcome: 'Article 262 of the Constitution provides for adjudication of inter-state water disputes, and the.' },
                { text: 'upstream state stealing water from downstream state', outcome: 'Not quite — Students believe inter-state water disputes are simply "upstream state stealing water from.', reveals: 'inter-state-water-disputes-are' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_12_011', title: 'Dams: Benefits and Environmental and Social Concerns',
          caseStudy: { intro: 'Imagine standing near the Bhakra-Nangal Dam on the Sutlej River: you see a massive concrete wall holding back a vast reservoir that irrigates Punjab and.',
            decisions: [{ prompt: 'List three multipurpose benefits of large dams in India as per the National Water Policy framework.', options: [
                { text: 'Correct answer: 1) Irrigation for agriculture (e.g., Bhakra-Nangal irrigates 1.4 million', outcome: 'Correct answer: 1) Irrigation for agriculture (e.g., Bhakra-Nangal irrigates 1.4 million hectares).' },
                { text: 'electricity', outcome: 'Not quite — Students often believe that environmental concerns of dams are limited to the submergence area.', reveals: 'environmental-concerns-of-dams-are' },
                { text: 'water storage', outcome: 'Not quite — Students often believe that environmental concerns of dams are limited to the submergence area.', reveals: 'environmental-concerns-of-dams-are' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a school water-policy debate, a teammate argues: \'Just dam the Brahmaputra and the Ganga — they carry most of India\'s surface water, so our scarcity problem is engineering laziness, not geography.\'',
            decisions: [{ prompt: 'What\'s the strongest counter from the water-resources chapter?', options: [
                { text: 'Availability isn\'t harnessability — the Ganga-Brahmaputra-Barak basins hold ~60% of surface water on a third of the land, but Himalayan rivers carry huge sediment loads, run through seismic zones, braid in the plains and cross international boundaries; the fully-dammed basins are the seasonal Peninsular ones where storage was technically easy.', outcome: 'The chapter\'s paradox is that the biggest rivers are the least harnessed precisely because geology and geopolitics constrain them — scarcity policy must work around that, not pretend it\'s laziness.' },
                { text: 'Concede — whichever basin holds the most water is the obvious first place to build.', outcome: 'That reads the flow table and skips the constraints: sediment chokes reservoirs, seismicity threatens dams, braided channels defy storage, and the Brahmaputra involves China and Bangladesh — big water, hard walls.', reveals: 'most-water-means-easiest-dam' },
                { text: 'Counter that all Himalayan rivers are snow-fed and all Peninsular rivers are seasonal, so the comparison is meaningless.', outcome: 'The binary breaks at sub-basin scale — the chapter notes the Narmada\'s perennial upper reaches and the Kaveri\'s near-perennial Western Ghats catchment; regimes are hybrid, which actually strengthens the site-by-site analysis the debate needs.', reveals: 'himalayan-perennial-binary' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_12_011', title: 'You made it',
          caseStudy: { intro: 'You can now argue water scarcity as a demand-and-quality problem, not a rainfall problem — the reframe every policy debate needs.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_007', difficulty: 'standard',
          question: 'Traditional rainwater harvesting methods in India are indigenous.',
          hint: 'If stuck, revisit "Variability of Rainfall and Water Scarcity in India".',
          misconception: 'Students often think "khadin, tanka, johad" are just synonyms for "pond" and can be used interchangeably.',
          parts: [
                { id: 'a', prompt: 'Name the traditional rainwater harvesting structure that is a covered underground tank used primarily for drinking water in western Rajasthan, and state the.', answer: 'Correct answer: Tanka (or Kund), lined with lime plaster (chuna)',
                  options: ['Correct answer: Tanka (or Kund), lined with lime plaster (chuna)', 'khadin', 'khadin, tanka, johad'],
                  hint: 'If stuck, revisit "Variability of Rainfall and Water Scarcity in India" (c12_geo_cbse_12_003) and.',
                  misconception: 'Students often think "khadin, tanka, johad" are just synonyms for "pond" and can be used interchangeably.' },
                { id: 'b', prompt: 'Explain why khadins are built on gently sloping agricultural land with impermeable sub-soil, whereas johads are constructed across seasonal drainage lines.', answer: 'Khadins require a large catchment area on gentle slopes to collect sheet runoff',
                  options: ['Khadins require a large catchment area on gentle slopes to collect sheet runoff', 'khadin, tanka, johad'],
                  hint: 'If stuck, revisit "Variability of Rainfall and Water Scarcity in India" (c12_geo_cbse_12_003) and.',
                  misconception: 'Students often think "khadin, tanka, johad" are just synonyms for "pond" and can be used interchangeably.' },
                { id: 'c', prompt: 'A village in Barmer district (average annual rainfall 250 mm, high intensity storms, sandy soil with underlying clay layer at 3 m depth) wants to build.', answer: 'Step 1: Convert tanka capacity to m³: 20,000 L = 20 m³',
                  options: ['Step 1: Convert tanka capacity to m³: 20,000 L = 20 m³', 'khadin, tanka, johad'],
                  hint: 'If stuck, revisit "Variability of Rainfall and Water Scarcity in India" (c12_geo_cbse_12_003) and.',
                  misconception: 'Students often think "khadin, tanka, johad" are just synonyms for "pond" and can be used interchangeably.' },
                { id: 'd', prompt: 'Compare the evaporation loss per unit stored water in a khadin (shallow, large surface area) versus a tanka (deep, small surface area).', answer: 'Khadin daily evaporation loss = 20,000 m² × 0.008 m = 160 m³/day → % loss =',
                  options: ['Khadin daily evaporation loss = 20,000 m² × 0.008 m = 160 m³/day → % loss =', 'khadin, tanka, johad'],
                  hint: 'If stuck, revisit "Variability of Rainfall and Water Scarcity in India" (c12_geo_cbse_12_003) and.',
                  misconception: 'Students often think "khadin, tanka, johad" are just synonyms for "pond" and can be used interchangeably.' }
          ],
            remediations: { 'khadin': { steps: ['Re-read the NCERT paragraph on "Rainwater Harvesting" (page 50-51) and label Figure 4.3 mentally: identify which sketch.', 'Watch a 5-min video of johad construction in Alwar (search "Tarun Bharat Sangh johad") — note the community labour and.', 'Do a quick water-balance calc: your roof area = 100 m², rainfall = 600 mm, runoff coeff.', '= 0.8, efficiency = 0.9 → how many litres can you store?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "khadin, tanka, johad" are just synonyms for "pond" and can be used interchangeably.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Revival of johads in Alwar district (by Tarun Bharat Sangh) succeeded because the structures are technically simple; social.', answer: 'The statement is false',
                  options: ['The statement is false', 'khadin, tanka, johad'],
                  hint: 'If stuck, revisit "Variability of Rainfall and Water Scarcity in India" (c12_geo_cbse_12_003) and.',
                  misconception: 'Students often think "khadin, tanka, johad" are just synonyms for "pond" and can be used interchangeably.' },
                { id: 'b', prompt: 'Design a combined traditional harvesting plan for a 500-ha micro-watershed in a semi-arid region (rainfall 400 mm, undulating terrain with seasonal streams.', answer: 'A good answer: (a) 3-4 johads on 1st/2nd order streams for groundwater recharge',
                  options: ['A good answer: (a) 3-4 johads on 1st/2nd order streams for groundwater recharge', 'khadin, tanka, johad'],
                  hint: 'If stuck, revisit "Variability of Rainfall and Water Scarcity in India" (c12_geo_cbse_12_003) and.',
                  misconception: 'Students often think "khadin, tanka, johad" are just synonyms for "pond" and can be used interchangeably.' }
          ],
            remediations: { 'khadin': { steps: ['Re-read the NCERT paragraph on "Rainwater Harvesting" (page 50-51) and label Figure 4.3 mentally: identify which sketch.', 'Watch a 5-min video of johad construction in Alwar (search "Tarun Bharat Sangh johad") — note the community labour and.', 'Do a quick water-balance calc: your roof area = 100 m², rainfall = 600 mm, runoff coeff.', '= 0.8, efficiency = 0.9 → how many litres can you store?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_008', difficulty: 'standard',
          question: 'Modern rainwater harvesting refers to engineered techniques for capturing.',
          hint: 'If stuck on watershed delineation, revisit Class 11 topo-sheet interpretation.',
          misconception: 'Students think "rainwater harvesting" and "watershed management" are synonymous or that watershed management only means.',
          parts: [
                { id: 'a', prompt: 'Define "watershed management" as described in the NCERT Class 12 textbook, and name two government programmes that implement it in India.', answer: 'Watershed management is the efficient management and conservation of surface and',
                  options: ['Watershed management is the efficient management and conservation of surface and', 'building check dams', 'Namami Gange', 'Jal Jeevan Mission'],
                  hint: 'If stuck on watershed delineation, revisit Class 11 topo-sheet interpretation (c11_geo_cbse_24_004.',
                  misconception: 'Students think "rainwater harvesting" and "watershed management" are synonymous or that watershed management only means building check.' },
                { id: 'b', prompt: 'A house in Delhi has a flat roof of 12 m × 10 m. The average annual rainfall is 700 mm. The runoff coefficient for concrete roof is 0.85.', answer: 'Step 1: Roof area = 12 × 10 = 120 m²',
                  options: ['Step 1: Roof area = 12 × 10 = 120 m²', 'rainwater harvesting', 'watershed management', 'watershed management is rooftop harvesting in villages'],
                  hint: 'If stuck on watershed delineation, revisit Class 11 topo-sheet interpretation (c11_geo_cbse_24_004.',
                  misconception: 'Students think "rainwater harvesting" and "watershed management" are synonymous or that watershed management only means building check.' }
          ],
            remediations: { 'rainwater-harvesting-and-watershed-management': { steps: ['Draw a watershed boundary on a topo-sheet (use contour lines) — show it covers multiple villages, streams, ridges.', 'Mark a single house roof — that\'s rainwater harvesting scale.', 'List all structures in the NCERT text (Fig 4.3) and classify each as "point-scale harvesting" (rooftop tank, recharge.', 'Re-read the Ralegan Siddhi case study and identify which interventions were point-scale vs watershed-scale.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_009', difficulty: 'standard',
          question: 'Water conservation in India refers to the systematic management, protection.',
          hint: 'Revisit c12_geo_cbse_12_003 (Variability of Rainfall and Water Scarcity) and.',
          misconception: 'Students often think \'water conservation\' means only building structures like dams, tanks, or rooftop harvesting.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Water conservation in India refers to the systematic management, protection, and',
                  options: ['Water conservation in India refers to the systematic management, protection, and', 'Water resources in India refer to the total volume of freshwater available from', 'India\'s drainage system comprises two distinct categories: Himalayan rivers (Indus,', 'Variability of rainfall refers to the spatial and temporal fluctuations in precipitation'],
                  hint: 'Revisit c12_geo_cbse_12_003 (Variability of Rainfall and Water Scarcity) and c12_geo_cbse_12_007.',
                  misconception: 'Students often think \'water conservation\' means only building structures like dams, tanks, or rooftop harvesting.' }
          ],
            remediations: { 'water-conservation-means-only-building': { steps: ['If the student holds the supply-side-only view, assign this 3-step remediation: (1) Re-read the NCERT sections.', '(2) Compare the Ralegan Siddhi case study: list the non-structural interventions (liquor ban, crop ban, stall-feeding.', '(3) Attempt Diagnostic Question 5 again, now explicitly incorporating demand management and equity.', 'Re-diagnose with a new scenario: \'A city plans to build a new dam vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_010', difficulty: 'standard',
          question: 'Inter-state water disputes are conflicts between two or more Indian states over.',
          hint: 'If unable to locate basins or riparian states, return to c11_geo_cbse_09_009 and practice.',
          misconception: 'Students believe inter-state water disputes are simply "upstream state stealing water from downstream state" —.',
          parts: [
                { id: 'a', prompt: 'The Cauvery basin covers ~81,000 km² with Karnataka (upstream) and Tamil Nadu (downstream) as major riparian states.', answer: 'Percentage reduction = (50/400) × 100 = 12.5% reduction',
                  options: ['Percentage reduction = (50/400) × 100 = 12.5% reduction', 'upstream state stealing water from downstream state'],
                  hint: 'If unable to locate basins or riparian states, return to c11_geo_cbse_09_009 and practice drawing.',
                  misconception: 'Students believe inter-state water disputes are simply "upstream state stealing water from downstream state" — a zero-sum theft narrative.' },
                { id: 'b', prompt: 'Compare the Cauvery dispute (Karnataka vs Tamil Nadu) and the Ravi-Beas dispute (Punjab vs Haryana) in terms of: (a) river type (peninsular vs Himalayan), (b).', answer: 'in terms of: (',
                  options: ['in terms of: (', 'both are about irrigation', 'upstream state stealing water from downstream state'],
                  hint: 'If unable to locate basins or riparian states, return to c11_geo_cbse_09_009 and practice drawing.',
                  misconception: 'Students believe inter-state water disputes are simply "upstream state stealing water from downstream state" — a zero-sum theft narrative.' }
          ],
            remediations: { 'inter-state-water-disputes-are': { steps: ['Revisit **c11_geo_cbse_09_009** (Drainage Systems of India) to re-map the Cauvery, Krishna, Godavari, Narmada.', 'Revisit **c11_geo_cbse_13_007** (Water Scarcity: Causes and Inter-State Water Conflicts) to distinguish between.', 'Complete a map exercise: On an outline map of India, draw the 6 major disputed basins, mark the riparian states, and.', 'Re-attempt Diagnostic Questions 2 and 4 — they test the structural understanding that memorisation cannot provide.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_011', difficulty: 'standard',
          question: 'Dams are large barriers constructed across rivers to store water in reservoirs.',
          hint: 'If stuck, revisit the Bhakra-Nangal and Damodar Valley case studies.',
          misconception: 'Students often believe that environmental concerns of dams are limited to the submergence area (reservoir), ignoring.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Dams are large barriers constructed across rivers to store water in reservoirs, serving',
                  options: ['Dams are large barriers constructed across rivers to store water in reservoirs, serving', 'Water resources in India refer to the total volume of freshwater available from', 'India\'s drainage system comprises two distinct categories: Himalayan rivers (Indus,', 'Variability of rainfall refers to the spatial and temporal fluctuations in precipitation'],
                  hint: 'If stuck, revisit the Bhakra-Nangal and Damodar Valley case studies in c12_geo_cbse_12_005 and the.',
                  misconception: 'Students often believe that environmental concerns of dams are limited to the submergence area (reservoir), ignoring downstream impacts.' }
          ],
            remediations: { 'environmental-concerns-of-dams-are': { steps: ['1) Revisit c11_geo_cbse_13_008 (Class 11 Dams: Benefits and Environmental/Social Concerns) and c10_geo_cbse_03_003.', '2) Create a two-column table: "Upstream/Reservoir Impacts" vs "Downstream Impacts" for Tehri Dam using NCERT Fig 4.1.', '3) Watch the 10-minute documentary "Narmada: A Valley Rises" (available on YouTube) to visualize displacement and.', '4) Re-attempt Diagnostic Questions 2, 4, and 6 after this review.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
