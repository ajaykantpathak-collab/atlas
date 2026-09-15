import type { SimDef } from '../../engine/types';

/** v3 generated — c10_geo_ch03_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_geo_ch03_p2: SimDef = {
    id: 'v3_c10_geo_ch03_p2',
    title: 'Water Resources · Part 2/2',
    subtitle: 'Solve why a wet city still runs dry',
    classLevel: 10, subject: 'geography', topic: 'Water Resources · Part 2/2',
    chapters: ['c10_geo_ch03'],
    nodeIds: ['c10_geo_cbse_03_007', 'c10_geo_cbse_03_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a water resources investigator', intro: 'Three-fourths of Earth\'s surface is water, yet your city\'s taps run at fixed hours. Your task is to find where the water actually goes — and why \'enough\' on paper means scarcity in pipes.', goal: 'Separate physical from economic scarcity, weigh the promises and costs of multipurpose dams, and make the case for rainwater harvesting.' },
    discovery: {
        question: 'Bengaluru gets decent monsoon rain and sits near rivers, yet apartment blocks there queue for water tankers. Meanwhile some genuinely dry regions manage fine. How can a water-rich place run out of water?',
        options: ['Scarcity can be economic, not just physical — poor infrastructure, pollution and over-extraction can make available water unusable or unreachable', 'Tanker mafias secretly export the city\'s water at night', 'Rain in cities instantly evaporates before touching the ground', 'Rivers legally belong only to the states they originate in'],
        answer: 'Scarcity can be economic, not just physical — poor infrastructure, pollution and over-extraction can make available water unusable or unreachable',
        hook: 'Running out of water isn\'t only about rain — a city can stand beside a river and still thirst if the water is polluted, over-pumped or never harvested.',
    },
    teaching: [
        { title: 'Inter-State Water Disputes: Causes and Examples in India', text: 'Inter-state water disputes arise when two or more states disagree over the sharing, allocation, or control of water from a common river basin or water resource, often due to competing demands for.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_geo_cbse_03_007', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Investigate why a rain-blessed city still buys tanker water: trace over-exploited aquifers, polluted rivers and missing storage, then design a fix using dams and rooftop harvesting wisely.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c10_geo_cbse_03_007', title: 'Inter-State Water Disputes: Causes and Examples in India',
          caseStudy: { intro: 'Imagine you see a news report about farmers in Tamil Nadu protesting because the Cauvery water release from Karnataka\'s dams has been delayed.',
            decisions: [{ prompt: 'Name any two major inter-state water disputes in India and the rivers involved.', options: [
                { text: 'Correct answer: Cauvery dispute (Cauvery river) between Karnataka and Tamil Nadu', outcome: 'Correct answer: Cauvery dispute (Cauvery river) between Karnataka and Tamil Nadu; Krishna dispute.' },
                { text: 'Ganga dispute', outcome: 'Not quite — Students often think inter-state water disputes are only about the total volume of water, ignoring.', reveals: 'inter-state-water-disputes-are' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_03_008', title: 'Sustainable Water Management: Drip and Sprinkler Irrigation',
          scaffold: { problem: 'A farmer in Gujarat uses flood irrigation for cotton with an efficiency of 35%. He switches to drip irrigation with 90% efficiency.',
            steps: [
            { text: 'Identify the crop water requirement (CWR) = 700 mm = 0.7 m per season.' },
            { text: 'Calculate water supplied under flood irrigation: IWR_flood = CWR / E_flood = 0.7 / 0.35 = 2.0 m depth.' },
            { text: 'Calculate water supplied under drip irrigation: IWR_drip = CWR / E_drip = 0.7 / 0.90 = 0.778 m depth.' },
            { text: 'Water saving depth = IWR_flood - IWR_drip = 2.0 - 0.778 = 1.222 m.' },
            { text: 'Convert to volume per hectare: 1 ha = 10,000 m², so saving = 1.222 × 10,000 = 12,220 m³ per hectare per season.', faded: true, blankAnswer: '12,220 m³ per hectare per season saved.' }
            ] } },
        { type: 'case', nodeId: 'c10_geo_cbse_03_007', title: 'A real-world call',
          caseStudy: { intro: 'A dam will irrigate 200 villages downstream but submerge 30 upstream. The math is clear; the homes are not.',
            decisions: [{ prompt: 'How should the decision be made?', options: [
                { text: 'Build it — 200 villages outweigh 30', outcome: 'The utilitarian answer; it treats \'villages\' as interchangeable units and ignores that the 30 lose everything while the 200 gain somewhat.' },
                { text: 'Don\'t build — displacement is a wrong no benefit erases', outcome: 'The rights-first answer; principled, but the 200 downstream villages\' water shortage is also a harm, just a quieter one.' },
                { text: 'Build only if the displaced get a real share', outcome: 'The just-compensation answer — land for land, a stake in the dam\'s benefits — rarely offered fully, which is why this question keeps returning.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A family in a hill city that gets generous monsoon rain faces strict water rationing every May and June. A visiting cousin laughs: \'You people get more rain than we do — how can you have a water shortage?\'',
            decisions: [{ prompt: 'How can heavy annual rainfall and real water scarcity coexist?', options: [
                { text: 'Rainfall volume is not the same as usable supply — the rain arrives in a few months while demand runs all year, and if the city depends on springs and has too little storage, the water simply isn\'t there in summer. Scarcity can be seasonal, infrastructural or caused by polluted sources, not just by low rain — the same reason a humid coastal district can suffer shortage if its groundwater is contaminated.', outcome: 'This is the chapter\'s core distinction: scarcity is about water being available, storable and safe when needed — not just how much falls from the sky.' },
                { text: 'The cousin is right — shortage in a high-rainfall city is impossible, so the rationing must be a billing error.', outcome: 'High rainfall with poor storage and seasonal sources is a textbook scarcity pattern — cities like Shimla face exactly this every summer.', reveals: 'scarcity-needs-drought' },
                { text: 'The only real cause is people wasting water — rain amount is irrelevant either way.', outcome: 'Overuse worsens scarcity but is not the only cause — seasonal timing, storage gaps and water quality create scarcity even where rain is abundant.', reveals: 'only-waste-causes-scarcity' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_03_008', title: 'You made it',
          caseStudy: { intro: 'Freshwater is renewable but not infinite. The crisis isn\'t that the sky forgot us — it\'s that we paved the catchments, poisoned the rivers and pumped the aquifers dry.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_geo_cbse_03_007', difficulty: 'standard',
          question: 'Inter-state water disputes arise when two or more states disagree over the.',
          hint: 'Revisit the map of peninsular rivers (Class 7, c7_geo_ch01_009) and the water scarcity.',
          misconception: 'Students often think inter-state water disputes are only about the total volume of water, ignoring the timing.',
          parts: [
                { id: 'a', prompt: 'Name any two major inter-state water disputes in India and the rivers involved.', answer: 'Correct answer: Cauvery dispute (Cauvery river) between Karnataka and Tamil Nadu',
                  options: ['Correct answer: Cauvery dispute (Cauvery river) between Karnataka and Tamil Nadu', 'Ganga dispute'],
                  hint: 'Revisit the map of peninsular rivers (Class 7, c7_geo_ch01_009) and the water scarcity node.',
                  misconception: 'Students often think inter-state water disputes are only about the total volume of water, ignoring the timing of release (seasonal.' }
          ],
            remediations: { 'inter-state-water-disputes-are': { steps: ['If stuck, guide the student to: (1) Draw a simple map of the Cauvery basin showing Karnataka (upstream) and Tamil Nadu.', '(2) Mark the monsoon months and crop seasons for both states.', '(3) Use a timeline to see how the dispute escalates when Karnataka\'s reservoirs fill late.', '(4) Review the Inter-State River Water Disputes Act, 1956 and the role of tribunals.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think inter-state water disputes are only about the total volume of water, ignoring the timing.',
          parts: [
                { id: 'a', prompt: 'Assess the effectiveness of the Inter-State River Water Disputes Act, 1956 in resolving water conflicts. Provide two strengths and two limitations.', answer: 'Correct answer: Strengths: provides legal framework, establishes tribunals for',
                  options: ['Correct answer: Strengths: provides legal framework, establishes tribunals for', 'says it is fully effective ignores ongoing disputes like Cauvery'],
                  hint: 'Revisit the map of peninsular rivers (Class 7, c7_geo_ch01_009) and the water scarcity node.',
                  misconception: 'Students often think inter-state water disputes are only about the total volume of water, ignoring the timing of release (seasonal.' }
          ],
            remediations: { 'inter-state-water-disputes-are': { steps: ['If stuck, guide the student to: (1) Draw a simple map of the Cauvery basin showing Karnataka (upstream) and Tamil Nadu.', '(2) Mark the monsoon months and crop seasons for both states.', '(3) Use a timeline to see how the dispute escalates when Karnataka\'s reservoirs fill late.', '(4) Review the Inter-State River Water Disputes Act, 1956 and the role of tribunals.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_03_008', difficulty: 'standard',
          question: 'Drip irrigation is a micro-irrigation system that delivers water directly.',
          hint: 'If stuck, review the concept of "crop water requirement" and "irrigation efficiency" from.',
          misconception: 'Students think drip irrigation is always better than sprinkler irrigation for all crops and terrains.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Drip irrigation is a micro-irrigation system that delivers water directly to the root',
                  options: ['Drip irrigation is a micro-irrigation system that delivers water directly to the root', 'Water scarcity is the condition where the available freshwater resources in a region are', 'A multipurpose river project is a large-scale hydraulic engineering structure (typically', 'Large dams are massive barriers built across rivers to store water for irrigation,'],
                  hint: 'If stuck, review the concept of "crop water requirement" and "irrigation efficiency" from Class 9.',
                  misconception: 'Students think drip irrigation is always better than sprinkler irrigation for all crops and terrains.' }
          ],
            remediations: { 'drip-irrigation-is-always-better': { steps: ['Show a table comparing crop types (closely spaced vs widely spaced), soil types (clay vs sandy), and terrain (flat.', 'Use a local example — visit a nearby farm or watch a video of wheat sprinkler irrigation in Punjab and drip.', 'Have students classify 5 crops from their region into drip/sprinkler/flood with justification.', 'Re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
