import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch17_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch17_p2: SimDef = {
    id: 'v3_c12_geo_ch17_p2',
    title: 'Geographical Perspective on Issues · Part 2/2',
    subtitle: 'The deadliest erosion is the kind you can\'t see',
    classLevel: 12, subject: 'geography', topic: 'Geographical Perspective on Issues · Part 2/2',
    chapters: ['c12_geo_ch17'],
    nodeIds: ['c12_geo_cbse_17_007', 'c12_geo_cbse_17_008', 'c12_geo_cbse_17_009', 'c12_geo_cbse_17_010', 'c12_geo_cbse_17_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Land-restoration planner', intro: 'Land can be wounded without being moved. Learn the difference between what\'s degraded and what\'s dead.', goal: 'Classify land degradation by cause and process, and evaluate conservation through the Jhabua model.' },
    discovery: {
        question: 'Gullies scar dramatically, sheet erosion strips invisibly — yet the quieter one is deadlier for farms. Why?',
        options: ['Sheet erosion lifts the fertile O and A horizons uniformly across whole fields — diffuse, invisible, and it takes the soil\'s best layer first', 'Gullies are deeper so they\'re worse', 'Sheet erosion is only surface dust', 'Visibility equals severity'],
        answer: 'Sheet erosion lifts the fertile O and A horizons uniformly across whole fields — diffuse, invisible, and it takes the soil\'s best layer first',
        hook: 'Degradation ≠ erosion alone — waterlogging in Punjab\'s canal country and salinisation degrade land without moving a gram of soil. And degraded ≠ wasteland: the first can be healed, the second is past economic repair. Jhabua\'s secret wasn\'t NGO money — it was social fencing that lowered the cost of conserving.',
    },
    teaching: [
        { title: 'Natural Disasters: Earthquakes, Floods, Droughts, Cyclones in India', text: 'Natural disasters in India are extreme geophysical or hydro-meteorological events — earthquakes, floods, droughts, and cyclones — that exceed local coping capacity, causing widespread loss of life.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_17_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Field-diagnose degraded land: sort sheet from gully, waterlogged from saline, then design a Bundelkhand restoration — trenches, stall-feeding rules and the indicators that prove it worked.',
        labels: ['Natural Disasters: Earthquakes, Floods,', 'Human-Made Disasters: Industrial Accidents', 'Disaster Management: Mitigation, Preparedness,', 'Sustainable Development: Concept', 'Geographical Perspective: Population-Environment-Development Linkages'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_geo_cbse_17_007', title: 'Natural Disasters: Earthquakes, Floods, Droughts, Cyclones in India',
          caseStudy: { intro: 'Start with a real observation: "Look at the news — every year we hear of Assam floods, Maharashtra droughts, Odisha cyclones, and Himalayan earthquakes.',
            decisions: [{ prompt: 'Name the four seismic zones of India (Zone II to V) in order of increasing hazard and state the primary tectonic feature responsible for.', options: [
                { text: 'Zone II (Low), Zone III (Moderate), Zone IV (High), Zone V (Very High)', outcome: 'Zone II (Low), Zone III (Moderate), Zone IV (High), Zone V (Very High).' },
                { text: 'drought = no rain', outcome: 'Not quite — Students think "drought = no rain" and "flood = too much rain", ignoring that drought is.', reveals: 'drought-no-rain-and-flood' },
                { text: 'flood = too much rain', outcome: 'Not quite — Students think "drought = no rain" and "flood = too much rain", ignoring that drought is.', reveals: 'drought-no-rain-and-flood' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_17_008', title: 'Human-Made Disasters: Industrial Accidents and Their Management',
          caseStudy: { intro: 'Begin with the Bhopal gas tragedy (1984) — a name every Indian student recognises — and ask: "Why did methyl isocyanate leak from a pesticide plant in the.',
            decisions: [{ prompt: 'Name the chemical that leaked in the Bhopal disaster (1984) and state its industrial use.', options: [
                { text: 'Methyl isocyanate (MIC), used as an intermediate in producing carbamate pesticides (e.g.,', outcome: 'Methyl isocyanate (MIC), used as an intermediate in producing carbamate pesticides (e.g.' },
                { text: 'chlorine', outcome: 'Not quite — Students conflate "industrial pollution" (chronic, diffuse, long-term degradation) with "industrial.', reveals: 'students-conflate-industrial-pollution-chronic' },
                { text: 'ammonia', outcome: 'Not quite — Students conflate "industrial pollution" (chronic, diffuse, long-term degradation) with "industrial.', reveals: 'students-conflate-industrial-pollution-chronic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_17_009', title: 'Disaster Management: Mitigation, Preparedness, Response, Recovery',
          caseStudy: { intro: 'Imagine you\'re in a village in Assam\'s Majuli island during the 2022 Brahmaputra floods — water rises rapidly, homes are submerged, and the only boat.',
            decisions: [{ prompt: 'Define "mitigation" in disaster management and give ONE structural and ONE non-structural measure for earthquake risk reduction in Delhi.', options: [
                { text: 'Mitigation refers to sustained actions taken BEFORE a disaster to reduce or eliminate', outcome: 'Mitigation refers to sustained actions taken BEFORE a disaster to reduce or eliminate long-term.' },
                { text: 'mitigation is evacuation during earthquake', outcome: 'Not quite — Students equate "disaster management" with "disaster response/relief distribution" — writing essays.', reveals: 'students-equate-disaster-management-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_17_010', title: 'Sustainable Development: Concept and Strategies for India',
          caseStudy: { intro: 'Look at the Yamuna river in Delhi – once a lifeline, now a foam-covered drain. Yet, the Namami Gange programme aims to restore it.',
            decisions: [{ prompt: 'What is the definition of sustainable development as per the Brundtland Report (1987)?', options: [
                { text: 'Correct: "Development that meets the needs of the present without compromising the', outcome: 'Correct: "Development that meets the needs of the present without compromising the ability.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students often think sustainable development means only environmental protection (e.g., planting.', reveals: 'sustainable-development-means-only-environmental' },
                { text: 'sustainable development means only environmental protection (e', outcome: 'Not quite — Students often think sustainable development means only environmental protection (e.g., planting.', reveals: 'sustainable-development-means-only-environmental' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_17_011', title: 'Geographical Perspective: Population-Environment-Development Linkages',
          scaffold: { problem: 'Delhi’s PM2.5 concentration averages 100 µg/m³ in winter. The city’s population is 20 million, per-capita vehicle ownership is 0.15.',
            steps: [
            { text: 'Identify the IPAT components for this sector: P = 20 million; A = vehicle ownership × distance = 0.15 × 10,000 = 1,500.' },
            { text: 'Calculate current total emissions: I = P × A × T = 20×10⁶ × 1,500 × 0.5 = 15×10⁹ g = 15,000 tonnes PM2.5/year.' },
            { text: 'For EV scenario, new T = 0.2 g/km (grid emissions). New I = 20×10⁶ × 1,500 × 0.2 = 6×10⁹ g = 6,000 tonnes/year.' },
            { text: 'Compute reduction: (15,000 - 6,000)/15,000 = 60% reduction. But note: this assumes same vehicle-km (A unchanged).' },
            { text: 'Geographical interpretation: The 60% reduction is significant but not zero; it shifts pollution from urban tailpipes.', faded: true, blankAnswer: 'Current car PM2.5 = 15,000 t/yr; EV scenario = 6,000 t/yr.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_17_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A developer diverting a patch of 50-year-old native forest shows the panchayat a \'compensation plan\': 20,000 fast-growing eucalyptus saplings on a revenue wasteland across the district. \'Two trees for every one lost — the ledger is green.\'',
            decisions: [{ prompt: 'How does this chapter assess that offset?', options: [
                { text: 'Reject the ledger — a monoculture plantation on non-forest land can\'t replace a complex native ecosystem\'s species, soil life and structure; compensatory planting fails ecological equivalence, lags decades behind the loss, and often bypasses the forest-dwellers\' consent.', outcome: 'The chapter\'s core distinction: tree cover is not a forest — fragmentation kills biodiversity through edge effects and genetic isolation that a sapling count cannot repay on human timescales.' },
                { text: 'Accept it — more trees planted than removed means net gain for the environment.', outcome: 'That counts stems and ignores ecosystems: eucalyptus rows register as \'forest cover\' in statistics while carrying a fraction of the biodiversity — exactly how plantations can mask net ecological loss.', reveals: 'tree-count-equals-forest' },
                { text: 'Accept it only if the plantation sits inside the same fenced boundary as the diverted forest.', outcome: 'Location fixes nothing: the failure is structural — plantation age, species mix and displaced community use don\'t change by moving the saplings next door.', reveals: 'same-site-fixes-offset' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_17_011', title: 'You made it',
          caseStudy: { intro: 'You can now read land\'s decline as a coupled human-environment process — and explain why the fix is social rules as much as engineering.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_17_007', difficulty: 'standard',
          question: 'Natural disasters in India are extreme geophysical or hydro-meteorological.',
          hint: 'If stuck on earthquake distribution, revisit c11_geo_cbse_04_010 (Plate Tectonics.',
          misconception: 'Students think "drought = no rain" and "flood = too much rain", ignoring that drought is a slow-onset deficit relative.',
          parts: [
                { id: 'a', prompt: 'Name the four seismic zones of India (Zone II to V) in order of increasing hazard and state the primary tectonic feature responsible for Zone V.', answer: 'Zone II (Low), Zone III (Moderate), Zone IV (High), Zone V (Very High)',
                  options: ['Zone II (Low), Zone III (Moderate), Zone IV (High), Zone V (Very High)', 'drought = no rain', 'flood = too much rain', 'zones alphabetically or citing the Deccan Traps for Zone V'],
                  hint: 'If stuck on earthquake distribution, revisit c11_geo_cbse_04_010 (Plate Tectonics: Distribution.',
                  misconception: 'Students think "drought = no rain" and "flood = too much rain", ignoring that drought is a slow-onset deficit relative to demand (soil.' },
                { id: 'b', prompt: 'A district receives 40% of its normal monsoon rainfall. Reservoir storage is at 30% of capacity. Kharif sowing is 60% of normal area.', answer: 'Meteorological drought (rainfall deficit > 25% of normal), hydrological drought',
                  options: ['Meteorological drought (rainfall deficit > 25% of normal), hydrological drought', 'drought = no rain', 'flood = too much rain'],
                  hint: 'If stuck on earthquake distribution, revisit c11_geo_cbse_04_010 (Plate Tectonics: Distribution.',
                  misconception: 'Students think "drought = no rain" and "flood = too much rain", ignoring that drought is a slow-onset deficit relative to demand (soil.' }
          ],
            remediations: { 'drought-no-rain-and-flood': { steps: ['Revisit c11_geo_cbse_11_004 (flood causes) and c11_geo_cbse_11_005 (drought types) — draw a 2x2 table: hazard vs.', 'On an outline map of India, shade seismic zones, flood-prone basins, drought-prone districts, and cyclone tracks.', 'For each shade, write one tectonic/climatic driver and one human factor amplifying risk.', 'Re-attempt DIAGNOSTIC_QUESTION_3 and DIAGNOSTIC_QUESTION_4 using the map as reference.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_17_008', difficulty: 'standard',
          question: 'Human-made industrial disasters are catastrophic events resulting from.',
          hint: 'If confused, revisit c11_geo_cbse_11_001 (hazard vs disaster) and create a Venn diagram.',
          misconception: 'Students conflate "industrial pollution" (chronic, diffuse, long-term degradation) with "industrial disaster" (acute.',
          parts: [
                { id: 'a', prompt: 'A chemical plant stores 50 tonnes of chlorine (Cl₂) in tonner containers.', answer: 'Step 1: Identify the chemical',
                  options: ['Step 1: Identify the chemical', 'not MAH because chlorine is common'],
                  hint: 'If confused, revisit c11_geo_cbse_11_001 (hazard vs disaster) and create a Venn diagram: left.',
                  misconception: 'Students conflate "industrial pollution" (chronic, diffuse, long-term degradation) with "industrial disaster" (acute, discrete.' }
          ],
            remediations: { 'students-conflate-industrial-pollution-chronic': { steps: ['Revisit c11_geo_cbse_11_001 (Natural Hazards vs Natural Disasters) to internalise the hazard-disaster distinction.', 'Create a two-column table: left column "Chronic Industrial Pollution" (examples: effluent discharge, stack emissions.', 'For each, note onset time (years vs minutes), spatial scale (watershed vs plume), and legal remedy (Water Act.', 'Practice writing a 30-word board answer distinguishing the two using Daurala (pollution) vs Bhopal (disaster).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_17_009', difficulty: 'standard',
          question: 'Disaster management is a continuous and integrated cycle of four interdependent.',
          hint: 'Revisit c11_geo_cbse_11_008 Section 3 (Disaster Management Cycle) and practice.',
          misconception: 'Students equate "disaster management" with "disaster response/relief distribution" — writing essays on NDRF boats and.',
          parts: [
                { id: 'a', prompt: 'Explain why community-based disaster preparedness (CBDP) is more effective than top-down government alerts alone for cyclone-prone Odisha coast.', answer: 'CBDP ensures last-mile connectivity',
                  options: ['CBDP ensures last-mile connectivity', 'government has better technology'],
                  hint: 'Revisit c11_geo_cbse_11_008 Section 3 (Disaster Management Cycle) and practice classifying 5 news.',
                  misconception: 'Students equate "disaster management" with "disaster response/relief distribution" — writing essays on NDRF boats and food packets for.' }
          ],
            remediations: { 'students-equate-disaster-management-with': { steps: ['Revisit c11_geo_cbse_11_008 (Class 11 Disaster Management) — re-read the mitigation/preparedness/response definitions.', 'Draw the disaster management cycle diagram (circular, not linear) labeling feedback loops: recovery → mitigation (build.', 'Take the 2018 Kerala floods case study — classify 10 reported actions (e.g., "Fisherfolk rescued 65,000 people".', 'Re-attempt Diagnostic Questions 1-3. If still stuck, map your village/ward\'s disaster management plan (ask local.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_17_010', difficulty: 'standard',
          question: 'Sustainable development is development that meets the needs of the present.',
          hint: 'If stuck, revisit the Jhabua watershed management case study (NCERT Class 12 Chapter 9).',
          misconception: 'Students often think sustainable development means only environmental protection (e.g., planting trees) and ignore the.',
          parts: [
                { id: 'a', prompt: 'Given the data: Jhabua district treated 20% of its total area under watershed management in five years, resulting in a 30% increase in groundwater recharge and.', answer: 'Area treated = 20% of 6,782 km² = 1,356.4 km²',
                  options: ['Area treated = 20% of 6,782 km² = 1,356.4 km²', 'sustainable development means only environmental protection (e'],
                  hint: 'If stuck, revisit the Jhabua watershed management case study (NCERT Class 12 Chapter 9) and the.',
                  misconception: 'Students often think sustainable development means only environmental protection (e.g., planting trees) and ignore the economic and social.' },
                { id: 'b', prompt: 'Compare the Namami Gange programme and the Jhabua watershed management approach in terms of scale, stakeholder involvement, and integration of the three.', answer: 'Namami Gange is a large-scale, top-down government programme focusing on sewage',
                  options: ['Namami Gange is a large-scale, top-down government programme focusing on sewage', 'treats them as identical misses the scale and governance difference', 'sustainable development means only environmental protection (e'],
                  hint: 'If stuck, revisit the Jhabua watershed management case study (NCERT Class 12 Chapter 9) and the.',
                  misconception: 'Students often think sustainable development means only environmental protection (e.g., planting trees) and ignore the economic and social.' }
          ],
            remediations: { 'sustainable-development-means-only-environmental': { steps: ['Revisit the Brundtland definition and the three-pillar diagram (economic, social, environmental).', 'Study the Jhabua case study (NCERT) and identify how each pillar is addressed.', 'Create a table for two Indian programmes (Namami Gange, Smart Cities) listing actions under each pillar.', 'Re-attempt Diagnostic Question 2 and 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_17_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think sustainable development means only environmental protection (e.g., planting trees) and ignore the.',
          parts: [
                { id: 'a', prompt: 'Design a sustainable development plan for a hypothetical drought-prone district in Maharashtra, incorporating water conservation, livelihood support, and.', answer: 'Good answer: 1) Watershed structures (check dams, contour trenches) to recharge',
                  options: ['Good answer: 1) Watershed structures (check dams, contour trenches) to recharge', 'sustainable development means only environmental protection (e'],
                  hint: 'If stuck, revisit the Jhabua watershed management case study (NCERT Class 12 Chapter 9) and the.',
                  misconception: 'Students often think sustainable development means only environmental protection (e.g., planting trees) and ignore the economic and social.' }
          ],
            remediations: { 'sustainable-development-means-only-environmental': { steps: ['Revisit the Brundtland definition and the three-pillar diagram (economic, social, environmental).', 'Study the Jhabua case study (NCERT) and identify how each pillar is addressed.', 'Create a table for two Indian programmes (Namami Gange, Smart Cities) listing actions under each pillar.', 'Re-attempt Diagnostic Question 2 and 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_17_011', difficulty: 'standard',
          question: 'Population-Environment-Development Linkages refer to the complex, bidirectional.',
          hint: 'If stuck, re-read the Jhabua and Daurala case studies in NCERT and draw the causal loop.',
          misconception: 'Students often believe “sustainable development means balancing population, environment, and development equally at all.',
          parts: [
                { id: 'a', prompt: 'Define the term “Population-Environment-Development Linkages” in one sentence and name the three interacting components.', answer: 'Correct answer: “Population-Environment-Development Linkages are the reciprocal',
                  options: ['Correct answer: “Population-Environment-Development Linkages are the reciprocal', 'population, environment, development'],
                  hint: 'If stuck, re-read the Jhabua and Daurala case studies in NCERT and draw the causal loop diagrams.',
                  misconception: 'Students often believe “sustainable development means balancing population, environment, and development equally at all times.” In reality.' }
          ],
            remediations: { 'sustainable-development-means-balancing-populati': { steps: ['Revisit the IPAT identity (c12_geo_cbse_17_010) and practice calculating I for two contrasting Indian states using.', 'Re-read the Jhabua (c12_geo_cbse_17_001) and Daurala (c12_geo_cbse_17_003) case studies; draw the feedback loops.', 'Watch a 10-minute video on “Planetary Boundaries” (Rockström et al.) to internalize the concept of hard environmental.', 'Re-attempt Diagnostic Question 5 after step 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
