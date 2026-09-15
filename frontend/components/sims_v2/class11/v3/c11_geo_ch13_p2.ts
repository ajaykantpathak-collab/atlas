import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch13_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch13_p2: SimDef = {
    id: 'v3_c11_geo_ch13_p2',
    title: 'Water Resources · Part 2/2',
    subtitle: 'Reckon usable water versus total water — and the policy that emptied Punjab\'s aquifers.',
    classLevel: 11, subject: 'geography', topic: 'Water Resources · Part 2/2',
    chapters: ['c11_geo_ch13'],
    nodeIds: ['c11_geo_cbse_13_007', 'c11_geo_cbse_13_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a hydrologist auditing a water-rich state\'s empty wells', intro: 'A tap in Delhi might draw from Bhakra reservoir or a neighbourhood tubewell — two linked systems feeding one glass.', goal: 'Analyse surface water and groundwater availability, constraints and the drivers of over-extraction.' },
    discovery: {
        question: 'Punjab sits on rich alluvial aquifers yet faces groundwater collapse — is low rainfall to blame?',
        options: ['No — free farm electricity since 1997 made water-intensive paddy profitable, driving pumping far past recharge', 'Yes — 600 mm of rain can\'t support agriculture', 'Yes — the monsoon simply fails Punjab', 'No — the rivers secretly diverted underground'],
        answer: 'No — free farm electricity since 1997 made water-intensive paddy profitable, driving pumping far past recharge',
        hook: 'The aquifer had decent recharge; the policy made pumping it free — a man-made drought in a water-rich land.',
    },
    teaching: [
        { title: 'Water Scarcity: Causes and Inter-State Water Conflicts', text: 'Water scarcity is the condition where the demand for freshwater exceeds the available sustainable supply in a region over a specific period, driven by physical deficit (aridity, drought) and/or.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_13_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compute why only about 37% of India\'s surface water is usable, then weigh the Ken-Betwa link\'s promise against the Panna Tiger Reserve it would drown.',
        labels: ['Water Scarcity: Causes', 'Dams: Benefits and Environmental/Social'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_13_007', title: 'Water Scarcity: Causes and Inter-State Water Conflicts',
          scaffold: { problem: 'The Godavari basin has an annual renewable freshwater resource of 110.5 km³. The basin population (2021) is 65 million.',
            steps: [
            { text: 'Calculate per capita availability at mean flow = (110.5 × 10⁹) / (65 × 10⁶) = 1,692 m³/capita/year → **Water Stress**.' },
            { text: 'Calculate per capita availability at 75% dependable yield = (76.3 × 10⁹) / (65 × 10⁶) = 1,174 m³/capita/year → **Water.' },
            { text: 'Current irrigated area in Godavari basin ≈ 6.5 Mha (from CWC data). 20% expansion = 1.3 Mha additional.' },
            { text: 'Gross water requirement for new area = 1.3 × 10⁶ ha × 1.2 m = 1.56 km³.' },
            { text: 'Compare additional demand (4.11 km³) with the gap between mean and dependable yield (110.5 – 76.3 = 34.2 km³).', faded: true, blankAnswer: '(a) 1,692 m³/capita/year (Stress); (b) 1,174 m³/capita/year.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_13_008', title: 'Dams: Benefits and Environmental/Social Concerns',
          scaffold: { problem: 'The Koyna Dam (Maharashtra) receives an average annual sediment inflow of 4.2 million tonnes.',
            steps: [
            { text: 'Identify given values — Sediment Inflow = 4.2 Mt/yr, Sediment Outflow = 0.63 Mt/yr.' },
            { text: 'Apply trap efficiency formula: [(4.2 - 0.63) / 4.2] × 100 = 85%.' },
            { text: 'Calculate trapped sediment mass = 4.2 - 0.63 = 3.57 Mt/yr.' },
            { text: 'Convert mass to volume using density: 3.57 × 10⁶ tonnes / 1.4 t/m³ = 2.55 million m³/yr.' },
            { text: 'Estimate years to lose 10% storage (dead storage threshold): 0.10 × 2,780 Mm³ / 2.55 Mm³/yr ≈ 109 years.', faded: true, blankAnswer: 'Trap efficiency = 85%; annual sediment accumulation = 2.55.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_13_007', title: 'A real-world call',
          caseStudy: { intro: 'A mountain region needs a hydropower dam for electricity and a growing economy — but the mountains are geologically young, landslide-prone, and home to communities who live downstream of the proposed site.',
            decisions: [{ prompt: 'How much risk is acceptable for power?', options: [
                { text: 'Build with the best engineering available', outcome: 'The development answer — risk managed, not zero; the communities downstream carry the remainder.' },
                { text: 'Don\'t build in fragile geology — find power another way', outcome: 'The precautionary answer; power has to come from somewhere, and the alternatives have their own costs.' },
                { text: 'Build only if the people downstream decide, not just the ones who benefit', outcome: 'The consent answer — risk-bearers should have the vote, not just the benefit-receivers.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_13_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a water-conservation workshop for drought-hit Bundelkhand, a volunteer proposes: \'Just drill deeper borewells — groundwater is a vast underground river, and the deeper you go the more you get.\' Someone else claims the Ganga is India\'s largest basin by area.',
            decisions: [{ prompt: 'Which hydrological facts need correcting?', options: [
                { text: 'Groundwater lives in pore spaces and fractures of aquifers, not underground rivers — in Bundelkhand\'s crystalline basement, water below ~100 m is negligible, so deeper drilling fails. And \'largest basin\' needs a boundary check: the Godavari\'s ~3.12 lakh km² inside India exceeds the Ganga\'s Indian portion (~2.5 lakh km²) — the Ganga\'s total is larger only when you count Nepal, China and Bangladesh.', outcome: 'Both claims get fixed by the same lesson: surface water and groundwater are connected, geology-bounded systems — and basin size depends on where you draw the border.' },
                { text: 'Support the borewell plan — groundwater is stored like an underground lake, so depth finds it.', outcome: 'Aquifers are porous rock, not caverns; in hard-rock terrain the saturated zone is shallow and finite — deeper drilling just costs more for the same dry rock.', reveals: 'groundwater-is-underground-river' },
                { text: 'Confirm Ganga is India\'s largest basin — it has the biggest total catchment on the map.', outcome: 'The total basin crosses four countries; within India the Godavari basin is larger — confusing national with total extent produces the wrong ranking.', reveals: 'ganga-largest-basin-in-india' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_13_008', title: 'You made it',
          caseStudy: { intro: 'India\'s water problem isn\'t scarcity on paper — it\'s 80% of the rain arriving in four months and incentives that pump the rest away.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_13_007', difficulty: 'standard',
          question: 'Water scarcity is the condition where the demand for freshwater exceeds the.',
          hint: 'If stuck on basin boundaries or dependable yield, revisit c11_geo_cbse_13_002 (drainage.',
          misconception: 'Students believe inter-state water conflicts are primarily caused by "upstream states stealing water" —.',
          parts: [
                { id: 'a', prompt: 'Compare the constitutional position of water in the Indian federal system with the mechanism for resolving inter-state disputes.', answer: 'Water is a State subject (Entry 17, List II)',
                  options: ['Water is a State subject (Entry 17, List II)', 'water is a Central subject', 'Supreme Court directly decides', 'upstream states stealing water'],
                  hint: 'If stuck on basin boundaries or dependable yield, revisit c11_geo_cbse_13_002 (drainage systems).',
                  misconception: 'Students believe inter-state water conflicts are primarily caused by "upstream states stealing water" — a moral/geopolitical narrative.' }
          ],
            remediations: { 'inter-state-water-conflicts-are': { steps: ['Plot the Cauvery basin on an outline map — mark major dams (Krishnaraja Sagar, Mettur), command areas, and state.', 'Calculate the 50% and 75% dependable yields from CWC data (approx. 740 TMC and 560 TMC).', 'Compare with the Tribunal’s total allocation (740 TMC) and actual utilisation (often >900 TMC in good years).', 'Overlay cropping pattern maps (paddy/sugarcane area growth 1990–2020).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_13_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe inter-state water conflicts are primarily caused by "upstream states stealing water" —.',
          parts: [
                { id: 'a', prompt: 'Design a demand-management framework for the Krishna basin that reduces inter-state conflict between Maharashtra, Karnataka, and Telangana/Andhra Pradesh.', answer: 'A strong framework includes: 1',
                  options: ['A strong framework includes: 1', 'upstream states stealing water'],
                  hint: 'If stuck on basin boundaries or dependable yield, revisit c11_geo_cbse_13_002 (drainage systems).',
                  misconception: 'Students believe inter-state water conflicts are primarily caused by "upstream states stealing water" — a moral/geopolitical narrative.' }
          ],
            remediations: { 'inter-state-water-conflicts-are': { steps: ['Plot the Cauvery basin on an outline map — mark major dams (Krishnaraja Sagar, Mettur), command areas, and state.', 'Calculate the 50% and 75% dependable yields from CWC data (approx. 740 TMC and 560 TMC).', 'Compare with the Tribunal’s total allocation (740 TMC) and actual utilisation (often >900 TMC in good years).', 'Overlay cropping pattern maps (paddy/sugarcane area growth 1990–2020).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_13_008', difficulty: 'standard',
          question: 'Dams are hydraulic structures built across rivers to impound water, creating.',
          hint: 'Revisit the Bhakra-Nangal (c11_geo_cbse_13_003) and Damodar Valley (c11_geo_cbse_13_004).',
          misconception: 'Students believe that "run-of-the-river" dams have negligible environmental impact because they store little water.',
          parts: [
                { id: 'a', prompt: 'List three major benefits of large multipurpose dams in India and name one iconic dam associated with each benefit.', answer: 'Correct answer: (1) Irrigation',
                  options: ['Correct answer: (1) Irrigation', 'run-of-the-river', 'only power benefits or confusing dams with barrages'],
                  hint: 'Revisit the Bhakra-Nangal (c11_geo_cbse_13_003) and Damodar Valley (c11_geo_cbse_13_004) case.',
                  misconception: 'Students believe that "run-of-the-river" dams have negligible environmental impact because they store little water.' },
                { id: 'b', prompt: 'Given a river with annual sediment load of 120 million tonnes and a dam that traps 85% of incoming sediment, calculate the annual sediment outflow downstream.', answer: 'Step 1: Sediment trapped = 120 × 0.85 = 102 million tonnes/year',
                  options: ['Step 1: Sediment trapped = 120 × 0.85 = 102 million tonnes/year', 'run-of-the-river'],
                  hint: 'Revisit the Bhakra-Nangal (c11_geo_cbse_13_003) and Damodar Valley (c11_geo_cbse_13_004) case.',
                  misconception: 'Students believe that "run-of-the-river" dams have negligible environmental impact because they store little water.' }
          ],
            remediations: { 'run-of-the-river-dams': { steps: ['On a map of Uttarakhand, trace the Alaknanda-Bhagirathi confluence at Devprayag and mark all.', 'For each project, note the "dewatered stretch length" from EIA reports.', 'Overlay fish migration routes (mahseer, snow trout) and seismic zones.', 'Calculate cumulative dewatered length as percentage of total river length.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
