import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch12_p1: SimDef = {
    id: 'v3_c11_geo_ch12_p1',
    title: 'Soils · Part 1/2',
    subtitle: 'Dig a metre down and read the horizons as history.',
    classLevel: 11, subject: 'geography', topic: 'Soils · Part 1/2',
    chapters: ['c11_geo_ch12'],
    nodeIds: ['c11_geo_cbse_12_001', 'c11_geo_cbse_12_002', 'c11_geo_cbse_12_003', 'c11_geo_cbse_12_004', 'c11_geo_cbse_12_005', 'c11_geo_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a pedologist reading a soil pit after monsoon', intro: 'Dark crumbly top, red clayey middle, pale weathered gneiss below — each layer is a process caught mid-act.', goal: 'Explain pedogenesis and read soil horizons as records of climate-driven processes.' },
    discovery: {
        question: 'Soil is just rock weathered into small particles — right?',
        options: ['No — weathering only makes regolith; soil needs humification, horizon-building translocation and living organisms on top', 'Yes — crushing rock long enough produces soil', 'Yes — sand and clay are just small rock', 'No — because soil only forms in forests'],
        answer: 'No — weathering only makes regolith; soil needs humification, horizon-building translocation and living organisms on top',
        hook: 'Soil is built by opposing processes at once — clay washes out of one horizon and into another, humus forms while microbes mineralise it.',
    },
    teaching: [
        { title: 'Soil: Definition and Formation (Pedogenesis Process)', text: 'Soil is a dynamic natural body composed of mineral particles, organic matter, water, air, and living organisms that forms on the earth\'s surface through the process of pedogenesis, where weathered.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_12_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read a soil pit from O to C like a record of climate and time, and explain why textbook \'cake layers\' mislead.',
        labels: ['Soil: Definition and Formation', 'Soil Profile: O, A,', 'Classification of Indian Soils', 'Alluvial Soils: Characteristics, Types', 'Black Soils (Regur): Properties,', 'Red and Yellow Soils'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_12_001', title: 'Soil: Definition and Formation (Pedogenesis Process)',
          caseStudy: { intro: 'Begin by asking students to observe a soil sample from their school garden or a nearby construction site — notice the colour, texture, and any visible layers.',
            decisions: [{ prompt: 'Define pedogenesis and state the five factors of soil formation using the CLORPT acronym.', options: [
                { text: 'Pedogenesis is the process of soil formation from parent material through the interaction', outcome: 'Pedogenesis is the process of soil formation from parent material through the interaction of five.' },
                { text: 'only climate and parent material', outcome: 'Not quite — Students believe soil formation is a one-way, linear process where parent rock simply breaks down.', reveals: 'soil-formation-is-a-one' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_12_004', title: 'Alluvial Soils: Characteristics, Types (Bangar vs Khadar) and Distribution',
          caseStudy: { intro: 'Observe the wheat field near your village in Punjab or the rice paddies in West Bengal — both thrive on soils that look different but share a river-borne.',
            decisions: [{ prompt: 'A farmer in the Ganga-Yamuna Doab finds white calcareous nodules (kankar) at 1-2 metres depth in his field.', options: [
                { text: 'The soil is Bangar (old alluvium)', outcome: 'The soil is Bangar (old alluvium). The presence of kankar (calcium carbonate nodules) at depth.' },
                { text: 'all alluvial soil is uniformly fertile and annually renewed by floods', outcome: 'Not quite — Students believe all alluvial soil is uniformly fertile and annually renewed by floods.', reveals: 'all-alluvial-soil-is-uniformly' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_12_005', title: 'Black Soils (Regur): Properties, Formation and Suitable Crops',
          scaffold: { problem: 'A soil survey in Jalgaon district (Maharashtra) reports: montmorillonite 60%, CEC 45 cmol(+)/kg, pH 8.2, EC 0.8 dS/m, ESP 8%, organic.',
            steps: [
            { text: 'Identify given values — ESP_initial = 8%, ESP_target = 4%, CEC = 45 cmol(+)/kg, Depth = 0.30 m, BD = 1.35 g/cm³.' },
            { text: 'Convert depth to cm for consistency with BD units — 0.30 m = 30 cm.' },
            { text: 'Apply formula — GR = (8 - 4) × 45 × 30 × 1.35 / 1000 = 4 × 45 × 30 × 1.35 / 1000.' },
            { text: 'Calculate stepwise — 4 × 45 = 180; 180 × 30 = 5400; 5400 × 1.35 = 7290; 7290 / 1000 = 7.29 t/ha.' },
            { text: 'Interpret — 7.3 t/ha gypsum needed for 30 cm layer. For full root zone (1 m), multiply by 3.3 ≈ 24 t/ha.', faded: true, blankAnswer: '7.3 t/ha for 30 cm depth; ~24 t/ha for 1 m root zone. Apply.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_12_006', title: 'Red and Yellow Soils: Formation and Distribution',
          caseStudy: { intro: 'Observe the reddish-brown soil exposed in road cuts along the Bengaluru-Chennai highway or in the Chotanagpur plateau region — this is not "mud" but a mature.',
            decisions: [{ prompt: 'State the primary parent rock types and the specific iron oxide minerals responsible for the red and yellow colours in these soils.', options: [
                { text: 'Primary parent rocks: granite, gneiss, schist (crystalline and metamorphic)', outcome: 'Primary parent rocks: granite, gneiss, schist (crystalline and metamorphic).' },
                { text: 'basalt parent rock', outcome: 'Not quite — Students conflate **red soils** with **laterite soils** because both appear reddish.', reveals: 'students-conflate-red-soils-with' },
                { text: 'red from laterite', outcome: 'Not quite — Students conflate **red soils** with **laterite soils** because both appear reddish.', reveals: 'students-conflate-red-soils-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'On a field exercise, your team digs a soil pit. One student reports: \'Soil is just rock slowly crumbling into powder over time — a one-way process. And every profile should show neat horizontal O-A-E-B-C layers like the textbook cake diagram.\'',
            decisions: [{ prompt: 'How do you correct the picture of soil formation?', options: [
                { text: 'Explain pedogenesis as many simultaneous, even opposing processes — eluviation washes clay out of A while illuviation deposits it in B; humification builds organic matter while mineralisation destroys it. And real boundaries are often wavy or tongued; young soils may show only A-C, and an arid Thar profile shows a carbonate Bk with no E at all — horizons record what processes operated, not a fixed template.', outcome: 'The pit becomes readable: soil is a living, evolving body where climate, organisms and time push materials up and down — not rock slowly dissolving.' },
                { text: 'Accept the linear model — weathering breaks rock down and that\'s the essence of soil-making.', outcome: 'Breakdown is only half the story: translocation, humification and accumulation actively build horizons, and soil can even be buried and restart formation.', reveals: 'soil-is-rock-crumbling' },
                { text: 'Insist the pit must show all horizons — if one is missing, the team dug badly.', outcome: 'Horizon assemblages vary by environment: Entisols lack developed B, Oxisols lack E — absence is information about the process, not digging failure.', reveals: 'every-profile-has-all-horizons' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'A soil profile is a diary written in horizons — colour, clay and chemistry recording centuries of weather and life.',
            decisions: [{ prompt: 'What comes next? Soils · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Soils · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_12_001', difficulty: 'standard',
          question: 'Soil is a dynamic natural body composed of mineral particles, organic matter.',
          hint: 'Revisit Class 9 Geography Chapter 1 "Weathering: Physical, Chemical and Biological" (node.',
          misconception: 'Students believe soil formation is a one-way, linear process where parent rock simply breaks down into smaller.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Soil is a dynamic natural body composed of mineral particles, organic matter, water, air,',
                  options: ['Soil is a dynamic natural body composed of mineral particles, organic matter, water, air,', 'A soil profile is a vertical cross-section of soil extending from the surface down to the', 'The ICAR (Indian Council of Agricultural Research) classification categorizes Indian', 'Alluvial soils are depositional soils formed by the accumulation of sediments (silt,'],
                  hint: 'Revisit Class 9 Geography Chapter 1 "Weathering: Physical, Chemical and Biological" (node.',
                  misconception: 'Students believe soil formation is a one-way, linear process where parent rock simply breaks down into smaller particles over time.' }
          ],
            remediations: { 'soil-formation-is-a-one': { steps: ['Use a soil monolith or diagram showing a complete profile (O-A-E-B-C-R).', 'Show a time-lapse video of leaf litter decomposition (humification) and earthworm activity (bioturbation).', 'Contrast a 10,000-year-old terrace soil (deep, red, kaolinitic) with a 100-year-old floodplain soil (stratified, no.', 'Have them write the CLORPT equation for each, highlighting which factor dominates the difference.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_12_002', difficulty: 'standard',
          question: 'A soil profile is a vertical cross-section of soil extending from the surface.',
          hint: 'Revisit c11_geo_cbse_12_001 (pedogenesis processes) and c9_geo_ch1_7 (weathering) — focus.',
          misconception: 'Students believe **horizon boundaries are always sharp and horizontal** like cake layers, because textbook diagrams.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A soil profile is a vertical cross-section of soil extending from the surface down to the',
                  options: ['A soil profile is a vertical cross-section of soil extending from the surface down to the', 'Soil is a dynamic natural body composed of mineral particles, organic matter, water, air,', 'The ICAR (Indian Council of Agricultural Research) classification categorizes Indian', 'Alluvial soils are depositional soils formed by the accumulation of sediments (silt,'],
                  hint: 'Revisit c11_geo_cbse_12_001 (pedogenesis processes) and c9_geo_ch1_7 (weathering) — focus.',
                  misconception: 'Students believe **horizon boundaries are always sharp and horizontal** like cake layers, because textbook diagrams show clean lines.' }
          ],
            remediations: { 'horizon-boundaries-are-always-sharp': { steps: ['**Step 1**: Take the student to a road cut or construction pit (even 50 cm deep).', 'Have them **draw the actual boundary shapes** — wavy, broken, tongued — not straight lines.', '**Step 2**: Use a **Munsell colour chart** to quantify colour change across boundaries — show that hue/value/chroma.', '**Step 3**: Compare two pits 10 m apart — horizons differ in thickness/presence due to **micro-topography** (e.g.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_12_003', difficulty: 'standard',
          question: 'The ICAR (Indian Council of Agricultural Research) classification categorizes.',
          hint: 'Review c11_geo_cbse_12_001 (Pedogenesis) focusing on the \'climate\' and \'parent material\'.',
          misconception: 'Students believe "Red soil is red because of iron oxide, so Laterite soil (also red) is just a wetter version of Red.',
          parts: [
                { id: 'a', prompt: 'Explain why the ICAR classification uses \'genesis\' (mode of formation) as a primary criterion instead of just colour or texture, using the example of Alluvial.', answer: 'Genesis reflects the fundamental processes (fluvial deposition vs',
                  options: ['Genesis reflects the fundamental processes (fluvial deposition vs', 'colour is enough'],
                  hint: 'Review c11_geo_cbse_12_001 (Pedogenesis) focusing on the \'climate\' and \'parent material\' factor.',
                  misconception: 'Students believe "Red soil is red because of iron oxide, so Laterite soil (also red) is just a wetter version of Red soil." This.' }
          ],
            remediations: { 'red-soil-is-red-because': { steps: ['Revisit c11_geo_cbse_12_001 (Pedogenesis) – specifically the \'climate\' and \'parent material\' factors.', 'On an outline map, plot rainfall isohyets (80 cm, 200 cm) and major rock types (granite, basalt).', 'Overlay ICAR soil map.', 'Trace the logic: High rain + basalt/gneiss → intense leaching → Laterite.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_12_004', difficulty: 'standard',
          question: 'Alluvial soils are depositional soils formed by the accumulation of sediments.',
          hint: 'Revisit c9_geo_ch1_8 (Erosion and Deposition by Rivers) and c10_geo_cbse_01_007 (Soil.',
          misconception: 'Students believe all alluvial soil is uniformly fertile and annually renewed by floods.',
          parts: [
                { id: 'a', prompt: 'A farmer in the Ganga-Yamuna Doab finds white calcareous nodules (kankar) at 1-2 metres depth in his field.', answer: 'The soil is Bangar (old alluvium)',
                  options: ['The soil is Bangar (old alluvium)', 'all alluvial soil is uniformly fertile and annually renewed by floods'],
                  hint: 'Revisit c9_geo_ch1_8 (Erosion and Deposition by Rivers) and c10_geo_cbse_01_007 (Soil as.',
                  misconception: 'Students believe all alluvial soil is uniformly fertile and annually renewed by floods.' },
                { id: 'b', prompt: 'Given a soil sample from a coastal delta with the following properties: pH 6.5, texture silty clay, organic carbon 0.8%, available nitrogen low, available.', answer: 'Step 1: Note the absence of kankar',
                  options: ['Step 1: Note the absence of kankar', 'all alluvial soil is uniformly fertile and annually renewed by floods'],
                  hint: 'Revisit c9_geo_ch1_8 (Erosion and Deposition by Rivers) and c10_geo_cbse_01_007 (Soil as.',
                  misconception: 'Students believe all alluvial soil is uniformly fertile and annually renewed by floods.' }
          ],
            remediations: { 'all-alluvial-soil-is-uniformly': { steps: ['Draw a cross-section of a river valley showing active channel, levee, active floodplain (Khadar), and higher terrace.', 'Mark flood extent for 2-year, 10-year, and 50-year return periods — only Khadar floods regularly.', 'Use a soil auger photo or diagram showing kankar layer at 1.5 m in Bangar vs. no kankar in Khadar.', 'Compare two soil health cards from Punjab (Bangar) and Nadia, West Bengal (Khadar) — note N-P-K differences.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_12_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe all alluvial soil is uniformly fertile and annually renewed by floods.',
          parts: [
                { id: 'a', prompt: 'Evaluate the sustainability of current intensive rice-wheat cropping on Khadar soils of the Indo-Gangetic Plain considering soil health indicators: declining.', answer: 'Current practice is unsustainable',
                  options: ['Current practice is unsustainable', 'all alluvial soil is uniformly fertile and annually renewed by floods'],
                  hint: 'Revisit c9_geo_ch1_8 (Erosion and Deposition by Rivers) and c10_geo_cbse_01_007 (Soil as.',
                  misconception: 'Students believe all alluvial soil is uniformly fertile and annually renewed by floods.' },
                { id: 'b', prompt: 'Design a soil survey transect across the Ganga floodplain from the active channel to the upland terrace to map the Bangar-Khadar transition.', answer: 'Transect: Perpendicular to river, 5 km total length',
                  options: ['Transect: Perpendicular to river, 5 km total length', 'all alluvial soil is uniformly fertile and annually renewed by floods'],
                  hint: 'Revisit c9_geo_ch1_8 (Erosion and Deposition by Rivers) and c10_geo_cbse_01_007 (Soil as.',
                  misconception: 'Students believe all alluvial soil is uniformly fertile and annually renewed by floods.' }
          ],
            remediations: { 'all-alluvial-soil-is-uniformly': { steps: ['Draw a cross-section of a river valley showing active channel, levee, active floodplain (Khadar), and higher terrace.', 'Mark flood extent for 2-year, 10-year, and 50-year return periods — only Khadar floods regularly.', 'Use a soil auger photo or diagram showing kankar layer at 1.5 m in Bangar vs. no kankar in Khadar.', 'Compare two soil health cards from Punjab (Bangar) and Nadia, West Bengal (Khadar) — note N-P-K differences.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_12_005', difficulty: 'standard',
          question: 'Black Soil (Regur) is a clay-rich, dark-coloured soil formed *in situ* from the.',
          hint: 'Revisit c9_geo_ch1_7 (chemical weathering) and c11_chem_ch04_002 (clay mineral structure).',
          misconception: 'Students believe Black Soil is "fertile" because it is dark and grows cotton well.',
          parts: [
                { id: 'a', prompt: 'Name the parent rock of Black Soil and the specific clay mineral responsible for its swell-shrink behaviour.', answer: 'Parent rock: Deccan Trap basalt',
                  options: ['Parent rock: Deccan Trap basalt', 'granite', 'kaolinite', 'fertile'],
                  hint: 'Revisit c9_geo_ch1_7 (chemical weathering) and c11_chem_ch04_002 (clay mineral structure) — draw.',
                  misconception: 'Students believe Black Soil is "fertile" because it is dark and grows cotton well.' },
                { id: 'b', prompt: 'A farmer in Nanded district (Maharashtra) wants to shift from rainfed cotton to irrigated sugarcane on Black Soil.', answer: 'Constraints: (1) Poor drainage due to low hydraulic conductivity of swollen',
                  options: ['Constraints: (1) Poor drainage due to low hydraulic conductivity of swollen', 'nutrient deficiency', 'fertile', 'Black Soil is "fertile"'],
                  hint: 'Revisit c9_geo_ch1_7 (chemical weathering) and c11_chem_ch04_002 (clay mineral structure) — draw.',
                  misconception: 'Students believe Black Soil is "fertile" because it is dark and grows cotton well.' },
                { id: 'c', prompt: 'Compare the nutrient profile of Black Soil with Alluvial Soil (Bangar) and explain why nitrogen and phosphorus fertilisation strategies differ between them.', answer: 'Black Soil: high Ca²⁺, Mg²⁺, K⁺ (from basalt), low N, P, organic matter',
                  options: ['Black Soil: high Ca²⁺, Mg²⁺, K⁺ (from basalt), low N, P, organic matter', 'fertile', 'Black Soil is "fertile"'],
                  hint: 'Revisit c9_geo_ch1_7 (chemical weathering) and c11_chem_ch04_002 (clay mineral structure) — draw.',
                  misconception: 'Students believe Black Soil is "fertile" because it is dark and grows cotton well.' }
          ],
            remediations: { 'black-soil-is-fertile-because': { steps: ['Show a side-by-side lab report of Black Soil vs Alluvial Soil (N: 0.03% vs 0.08%, P: 5 ppm vs 15 ppm, OC: 0.4% vs 0.7%).', 'Demonstrate swell-shrink with a montmorillonite sample in a beaker — add water, observe swelling; dry, observe cracks.', 'Map the Deccan Trap extent (c7_geo_ch01_006) over black soil distribution to prove *in situ* origin.', 'Re-read the nutrient profile section and rewrite the "fertility" statement as "moisture-retentive but.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_12_006', difficulty: 'standard',
          question: 'Red and yellow soils are zonal soil groups developed primarily through the.',
          hint: 'Revisit Class 9 Weathering (c9_geo_ch1_7) for mineral breakdown, and Class 6 Peninsular.',
          misconception: 'Students conflate **red soils** with **laterite soils** because both appear reddish.',
          parts: [
                { id: 'a', prompt: 'State the primary parent rock types and the specific iron oxide minerals responsible for the red and yellow colours in these soils.', answer: 'Primary parent rocks: granite, gneiss, schist (crystalline and metamorphic)',
                  options: ['Primary parent rocks: granite, gneiss, schist (crystalline and metamorphic)', 'basalt parent rock', 'red from laterite', 'fertile red earth'],
                  hint: 'Revisit Class 9 Weathering (c9_geo_ch1_7) for mineral breakdown, and Class 6 Peninsular Plateau.',
                  misconception: 'Students conflate **red soils** with **laterite soils** because both appear reddish.' },
                { id: 'b', prompt: 'Given a topographic cross-section of the Peninsular Plateau showing a hilltop (well-drained), a mid-slope, and a valley bottom (poorly drained), predict the.', answer: 'Sequence: Hilltop → Red (haematite, Fe³⁺, well-drained, aerobic) → Mid-slope →',
                  options: ['Sequence: Hilltop → Red (haematite, Fe³⁺, well-drained, aerobic) → Mid-slope →', 'fertile red earth'],
                  hint: 'Revisit Class 9 Weathering (c9_geo_ch1_7) for mineral breakdown, and Class 6 Peninsular Plateau.',
                  misconception: 'Students conflate **red soils** with **laterite soils** because both appear reddish.' }
          ],
            remediations: { 'students-conflate-red-soils-with': { steps: ['**Map diagnosis**: Give student a blank outline map of India with rainfall isohyets (50, 100, 200 cm).', 'Ask them to shade: (a) Red soil zone (50-100 cm), (b) Laterite zone (>200 cm).', '**Process diagram**: Draw a 3-panel flowchart: Parent rock (granite) → Weathering releases Fe²⁺ → Oxidation.', '**Lab demo**: Show two soil samples — red soil (sandy, non-sticky) vs laterite (clayey, hardens on drying).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
