import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch12_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch12_p2: SimDef = {
    id: 'v3_c11_geo_ch12_p2',
    title: 'Soils · Part 2/2',
    subtitle: 'Dig a metre down and read the horizons as history.',
    classLevel: 11, subject: 'geography', topic: 'Soils · Part 2/2',
    chapters: ['c11_geo_ch12'],
    nodeIds: ['c11_geo_cbse_12_007', 'c11_geo_cbse_12_008', 'c11_geo_cbse_12_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a pedologist reading a soil pit after monsoon', intro: 'Dark crumbly top, red clayey middle, pale weathered gneiss below — each layer is a process caught mid-act.', goal: 'Explain pedogenesis and read soil horizons as records of climate-driven processes.' },
    discovery: {
        question: 'Soil is just rock weathered into small particles — right?',
        options: ['No — weathering only makes regolith; soil needs humification, horizon-building translocation and living organisms on top', 'Yes — crushing rock long enough produces soil', 'Yes — sand and clay are just small rock', 'No — because soil only forms in forests'],
        answer: 'No — weathering only makes regolith; soil needs humification, horizon-building translocation and living organisms on top',
        hook: 'Soil is built by opposing processes at once — clay washes out of one horizon and into another, humus forms while microbes mineralise it.',
    },
    teaching: [
        { title: 'Laterite Soils: Characteristics and Leaching Process', text: 'Laterite soil is a highly leached, iron and aluminium oxide-rich soil formed under conditions of high temperature and heavy rainfall with alternating wet and dry seasons, where intense chemical.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_12_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read a soil pit from O to C like a record of climate and time, and explain why textbook \'cake layers\' mislead.',
        labels: ['Laterite Soils: Characteristics', 'Arid Soils and Forest/Mountain', 'Soil Erosion: Types (Sheet,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_12_007', title: 'Laterite Soils: Characteristics and Leaching Process',
          scaffold: { problem: 'A soil profile in Wayanad (Kerala) shows: O horizon (5 cm), A horizon (15 cm, pH 4.8), B horizon (120 cm, mottled red-yellow, hard nodules.',
            steps: [
            { text: 'Identify climatic criteria — rainfall >2500 mm, temp >22°C, distinct dry season (Dec-Mar) — matches laterisation.' },
            { text: 'Analyze profile morphology — deep B horizon with mottling and hard nodules (ironstone concretions) indicates advanced.' },
            { text: 'Recognize absent E horizon — intense leaching removed silica completely, no eluvial horizon remains; this is diagnostic.' },
            { text: 'Predict base saturation — in mature laterites under high rainfall, base saturation typically <20% (often 5-15%) due.' },
            { text: 'Classify — Soil order: Oxisol (USDA) / Laterite (Indian/ICAR); Great group: Plinthic Hapludox or similar.', faded: true, blankAnswer: 'Laterite soil (Oxisol); nodules are plinthite hardened.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_12_008', title: 'Arid Soils and Forest/Mountain Soils: Properties',
          caseStudy: { intro: 'Imagine standing barefoot on the hot sand dunes near Jaisalmer in May — the sand burns your feet, there is no moisture, and nothing grows without canal water.',
            decisions: [{ prompt: 'Name the two dominant salt compounds that accumulate in the sub-surface horizon (Bk) of Arid soils in the Thar Desert and state the process.', options: [
                { text: 'Calcium carbonate (CaCO₃) and gypsum (CaSO₄·2H₂O) accumulate in the Bk horizon due to', outcome: 'Calcium carbonate (CaCO₃) and gypsum (CaSO₄·2H₂O) accumulate in the Bk horizon due to **capillary.' },
                { text: 'sodium chloride from sea spray', outcome: 'Not quite — Students think **Arid soils are "just sand" and Forest/Mountain soils are "just rich forest.', reveals: 'arid-soils-are-just-sand' },
                { text: 'leaching', outcome: 'Not quite — Students think **Arid soils are "just sand" and Forest/Mountain soils are "just rich forest.', reveals: 'arid-soils-are-just-sand' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_12_009', title: 'Soil Erosion: Types (Sheet, Rill, Gully) and Conservation Methods',
          scaffold: { problem: 'In a watershed in the Western Ghats, a 10-ha plot on a 12% slope under tea plantation shows rill erosion after monsoon.',
            steps: [
            { text: 'Identify erosion type as rill erosion (intermediate stage between sheet and gully).' },
            { text: 'Recall formula for volume of eroded soil: Volume = cross-sectional area × total length.' },
            { text: 'Calculate volume = 0.05 m² × 2000 m = 100 m³.' },
            { text: 'Convert bulk density to kg/m³: 1.2 g/cm³ = 1200 kg/m³.' },
            { text: 'Mass loss = 100 m³ × 1200 kg/m³ = 120,000 kg = 120 tonnes.' },
            { text: 'Express per hectare: 120 tonnes / 10 ha = 12 tonnes/ha.', faded: true, blankAnswer: 'Total soil loss = 120 tonnes (12 tonnes/ha). This.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'On a field exercise, your team digs a soil pit. One student reports: \'Soil is just rock slowly crumbling into powder over time — a one-way process. And every profile should show neat horizontal O-A-E-B-C layers like the textbook cake diagram.\'',
            decisions: [{ prompt: 'How do you correct the picture of soil formation?', options: [
                { text: 'Explain pedogenesis as many simultaneous, even opposing processes — eluviation washes clay out of A while illuviation deposits it in B; humification builds organic matter while mineralisation destroys it. And real boundaries are often wavy or tongued; young soils may show only A-C, and an arid Thar profile shows a carbonate Bk with no E at all — horizons record what processes operated, not a fixed template.', outcome: 'The pit becomes readable: soil is a living, evolving body where climate, organisms and time push materials up and down — not rock slowly dissolving.' },
                { text: 'Accept the linear model — weathering breaks rock down and that\'s the essence of soil-making.', outcome: 'Breakdown is only half the story: translocation, humification and accumulation actively build horizons, and soil can even be buried and restart formation.', reveals: 'soil-is-rock-crumbling' },
                { text: 'Insist the pit must show all horizons — if one is missing, the team dug badly.', outcome: 'Horizon assemblages vary by environment: Entisols lack developed B, Oxisols lack E — absence is information about the process, not digging failure.', reveals: 'every-profile-has-all-horizons' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_12_009', title: 'You made it',
          caseStudy: { intro: 'A soil profile is a diary written in horizons — colour, clay and chemistry recording centuries of weather and life.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_12_007', difficulty: 'standard',
          question: 'Laterite soil is a highly leached, iron and aluminium oxide-rich soil formed.',
          hint: 'Review Class 9 chemical weathering types (c9_geo_ch1_7) and Class 11 soil profile.',
          misconception: 'Students believe laterite soils are "red because of iron oxide" like red soils, but miss the critical distinction.',
          parts: [
                { id: 'a', prompt: 'Define laterisation and state the specific climatic conditions (temperature and rainfall range) required for laterite soil formation in India.', answer: 'Laterisation is the pedogenic process of intense chemical weathering under high',
                  options: ['Laterisation is the pedogenic process of intense chemical weathering under high', 'forms in low rainfall', 'accumulates humus', 'red because of iron oxide'],
                  hint: 'Review Class 9 chemical weathering types (c9_geo_ch1_7) and Class 11 soil profile horizons.',
                  misconception: 'Students believe laterite soils are "red because of iron oxide" like red soils, but miss the critical distinction: laterites form.' },
                { id: 'b', prompt: 'Explain why laterite soils are acidic and nutrient-poor despite forming in regions with dense vegetation and high organic matter input.', answer: 'High rainfall causes rapid decomposition and leaching of organic acids and bases',
                  options: ['High rainfall causes rapid decomposition and leaching of organic acids and bases', 'vegetation makes soil fertile', 'red because of iron oxide'],
                  hint: 'Review Class 9 chemical weathering types (c9_geo_ch1_7) and Class 11 soil profile horizons.',
                  misconception: 'Students believe laterite soils are "red because of iron oxide" like red soils, but miss the critical distinction: laterites form.' },
                { id: 'c', prompt: 'A soil sample from the Western Ghats shows: pH 5.0, 65% Fe₂O₃+Al₂O₃, 12% SiO₂, CEC 8 cmol(+)/kg, base saturation 15%.', answer: 'Step 1: Calculate silica-sesquioxide ratio = 12 / 65 = 0.185',
                  options: ['Step 1: Calculate silica-sesquioxide ratio = 12 / 65 = 0.185', 'red because of iron oxide'],
                  hint: 'Review Class 9 chemical weathering types (c9_geo_ch1_7) and Class 11 soil profile horizons.',
                  misconception: 'Students believe laterite soils are "red because of iron oxide" like red soils, but miss the critical distinction: laterites form.' }
          ],
            remediations: { 'laterite-soils-are-red-because': { steps: ['Use a hand specimen — compare a friable red soil (crushes easily) with a laterite nodule (requires hammer).', 'Draw the laterisation flowchart: Parent rock → Hydrolysis/Carbonation → Silica leached downward → Fe/Al oxides.', 'Map exercise — overlay 2000 mm isohyet, 22°C isotherm, and Western Ghats/Eastern Ghats to predict laterite zones.', 'Calculate SiO₂/R₂O₃ ratio for 3 samples to classify.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_12_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe laterite soils are "red because of iron oxide" like red soils, but miss the critical distinction.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Laterite soils are agriculturally useless without heavy chemical inputs." Consider crop suitability, indigenous management, and.', answer: 'The statement is partially true but incomplete',
                  options: ['The statement is partially true but incomplete', 'red because of iron oxide'],
                  hint: 'Review Class 9 chemical weathering types (c9_geo_ch1_7) and Class 11 soil profile horizons.',
                  misconception: 'Students believe laterite soils are "red because of iron oxide" like red soils, but miss the critical distinction: laterites form.' }
          ],
            remediations: { 'laterite-soils-are-red-because': { steps: ['Use a hand specimen — compare a friable red soil (crushes easily) with a laterite nodule (requires hammer).', 'Draw the laterisation flowchart: Parent rock → Hydrolysis/Carbonation → Silica leached downward → Fe/Al oxides.', 'Map exercise — overlay 2000 mm isohyet, 22°C isotherm, and Western Ghats/Eastern Ghats to predict laterite zones.', 'Calculate SiO₂/R₂O₃ ratio for 3 samples to classify.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_12_008', difficulty: 'standard',
          question: 'Arid soils are sandy, saline/alkaline soils with low humus and moisture, found.',
          hint: 'Revisit c11_geo_cbse_12_001 "Soil: Definition and Formation" and make a CLORPT table for.',
          misconception: 'Students think **Arid soils are "just sand" and Forest/Mountain soils are "just rich forest soil"**.',
          parts: [
                { id: 'a', prompt: 'A soil sample from a field in western Rajasthan has pH 8.5, EC 4.2 dS/m, and visible white concretions at 40 cm depth.', answer: '**Classification:** Arid soil (Typic Haplocalcids / Aridisol equivalent)',
                  options: ['**Classification:** Arid soil (Typic Haplocalcids / Aridisol equivalent)', 'just sand', 'just rich forest soil'],
                  hint: 'Revisit c11_geo_cbse_12_001 "Soil: Definition and Formation" and make a CLORPT table for Arid vs.',
                  misconception: 'Students think **Arid soils are "just sand" and Forest/Mountain soils are "just rich forest soil"**.' }
          ],
            remediations: { 'arid-soils-are-just-sand': { steps: ['**For Arid soils:** Draw a labelled profile diagram (A–Bk–C) showing capillary rise arrows and kankar layer; visit.', '**For Forest/Mountain soils:** Use a soil pH kit to test samples from a local hill slope (or simulate with.', '**Comparison:** Make a two-column table with rows: Climate, Parent Material, Relief, Vegetation, Profile, pH, CEC, Base.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_12_009', difficulty: 'standard',
          question: 'Soil erosion is the detachment, transportation, and deposition of topsoil.',
          hint: 'Revisit c11_geo_cbse_12_002 (Soil Profile) to recall horizon properties, and.',
          misconception: 'Students often treat sheet, rill, and gully erosion as three independent types rather than a progressive sequence where.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Soil erosion is the detachment, transportation, and deposition of topsoil particles by',
                  options: ['Soil erosion is the detachment, transportation, and deposition of topsoil particles by', 'Soil is a dynamic natural body composed of mineral particles, organic matter, water, air,', 'A soil profile is a vertical cross-section of soil extending from the surface down to the', 'The ICAR (Indian Council of Agricultural Research) classification categorizes Indian'],
                  hint: 'Revisit c11_geo_cbse_12_002 (Soil Profile) to recall horizon properties, and c10_geo_cbse_01_008.',
                  misconception: 'Students often treat sheet, rill, and gully erosion as three independent types rather than a progressive sequence where sheet erosion.' }
          ],
            remediations: { 'students-often-treat-sheet': { steps: ['Use a sequence of three photographs from the same Shivalik watershed showing (a) muddy sheet flow, (b) rill network.', 'Conduct a sand-tray experiment: simulate rainfall on a 5°, 15°, and 25° slope with bare soil; observe and measure.', 'Provide a decision matrix table matching slope gradient, erosion stage, and recommended conservation measure; have.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
