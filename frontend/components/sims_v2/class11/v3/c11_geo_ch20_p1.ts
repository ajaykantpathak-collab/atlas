import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch20_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch20_p1: SimDef = {
    id: 'v3_c11_geo_ch20_p1',
    title: 'Manufacturing Industries · Part 1/2',
    subtitle: 'Work out why some industries chase ore, some chase power, and some chase nothing but a market.',
    classLevel: 11, subject: 'geography', topic: 'Manufacturing Industries · Part 1/2',
    chapters: ['c11_geo_ch20'],
    nodeIds: ['c11_geo_cbse_20_001', 'c11_geo_cbse_20_002', 'c11_geo_cbse_20_003', 'c11_geo_cbse_20_004', 'c11_geo_cbse_20_005', 'c11_geo_cbse_20_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an industrial geographer placing a factory on the map', intro: 'A T-shirt\'s cotton was ginned in Vidarbha, woven in Bhiwandi, stitched in Tiruppur — each stage obeyed a different pull.', goal: 'Apply locational factors — weight-loss, power, market, policy — to Indian industries.' },
    discovery: {
        question: 'An aluminium smelter needs 15,000 kWh per tonne. Bauxite sits in Odisha, cheap hydro power in Himachal — where does the smelter go?',
        options: ['Near the power — smelting loses no weight but devours electricity, while the alumina refinery belongs near the bauxite', 'Near the bauxite — factories always sit by raw material', 'At the port — exports decide location', 'Midway — to split transport costs evenly'],
        answer: 'Near the power — smelting loses no weight but devours electricity, while the alumina refinery belongs near the bauxite',
        hook: '\'Industries sit near raw materials\' only holds for weight-losing inputs — ginning hugs the cotton belt, but spinning and smelting follow power and markets.',
    },
    teaching: [
        { title: 'Manufacturing: Importance and Factors Influencing Industrial Location', text: 'Manufacturing is the large-scale transformation of raw materials into finished goods through the application of machinery, labor, capital, and technology, adding value at each stage.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_20_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run material-index logic on aluminium\'s two stages, then test whether policy alone can plant a factory — Nano\'s Sanand versus POSCO\'s stalled Odisha dream.',
        labels: ['Manufacturing: Importance and Factors', 'Agro-Based Industries: Cotton Textile,', 'Mineral-Based Industries: Iron', 'Mineral-Based Industries: Aluminium, Cement', 'Industrial Regions of India', 'Industrial Pollution: Types (Air,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_20_001', title: 'Manufacturing: Importance and Factors Influencing Industrial Location',
          scaffold: { problem: '** Why is the sugar industry concentrated in the sugarcane-growing belts of Uttar Pradesh (western UP) and Maharashtra (Ahmednagar, Pune).',
            steps: [
            { text: 'Calculate material index for sugar: 10 tonnes cane → 1 tonne sugar → MI = 10/1 = 10 (strongly weight-losing).' },
            { text: 'Recall that sugarcane is **perishable** (sucrose content drops 1-2% per day after harvest) and **bulky** (high.' },
            { text: 'Identify the **time constraint**: Cane must be crushed within 24-48 hours → mill must be within 20-30 km radius.' },
            { text: 'Analyze why mills are not *inside* every village: Economies of scale require minimum 2,500-5,000 TCD (tonnes crushed.' },
            { text: 'Explain the UP vs. Maharashtra difference: UP has smaller farms, higher density → more mills per km²; Maharashtra has.' },
            { text: 'Conclude: Location is **raw material oriented** but modulated by **perishability**, **scale economies**, and.', faded: true, blankAnswer: '** Sugar mills locate in cane belts because MI=10 demands.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_20_002', title: 'Agro-Based Industries: Cotton Textile, Jute and Sugar Industry',
          scaffold: { problem: 'A cotton textile entrepreneur wants to set up an integrated mill (ginning + spinning + weaving) in 2024.',
            steps: [
            { text: 'Identify raw material flow — seed cotton from Vidarbha (A) or Gujarat (C) or imported/Telangana (B).' },
            { text: 'Assess power — Nagpur: coal-based thermal (Koradi) + grid; Coimbatore: wind/solar + hydro (Mettur) + grid — lowest.' },
            { text: 'Assess labour — Nagpur: moderate supply, lower skill; Coimbatore: high skill (generational textile workforce), higher.' },
            { text: 'Assess market/export — Nagpur: domestic market access (central India); Coimbatore: strong domestic + garment export.' },
            { text: 'Assess policy — Maharashtra: Textile Policy 2018 (capital subsidy 10-15%); Tamil Nadu: Textile Policy 2019 (power.' },
            { text: 'Synthesise — For export-oriented yarn: Mundra (port + SEZ + raw material from Gujarat/Telangana).', faded: true, blankAnswer: 'Coimbatore is optimal for integrated mill targeting.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_20_003', title: 'Mineral-Based Industries: Iron and Steel Industry in India',
          scaffold: { problem: 'A new integrated steel plant is proposed at Bellary (Karnataka) using local haematite ore from Hospet-Bellary belt.',
            steps: [
            { text: 'Identify the conversion ratios: 1 tonne crude steel requires 1.6 t iron ore + 0.7 t coking coal + 0.25 t limestone.' },
            { text: 'Calculate crude steel needed for 5 MTPA finished steel: 5 / 0.92 = 5.435 MTPA crude steel.' },
            { text: 'Calculate annual raw material inflow: 5.435 × 2.55 = 13.86 MTPA.' },
            { text: 'Calculate finished steel outflow: 5 MTPA.' },
            { text: 'Compare: Inflow (13.86 MTPA) > Outflow (5 MTPA) by a factor of 2.77.', faded: true, blankAnswer: 'Annual raw material inflow = 13.86 million tonnes; finished.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_20_004', title: 'Mineral-Based Industries: Aluminium, Cement and Chemical Industries',
          caseStudy: { intro: 'Observe a cement bag at a construction site near you — the fine grey powder originated as limestone in a quarry, perhaps in Satna or Chanderia, was heated.',
            decisions: [{ prompt: 'State the weight-loss ratio for aluminium production from bauxite to finished metal and explain why this makes bauxite proximity less.', options: [
                { text: 'Bauxite to alumina loses ~50% weight (4-5t bauxite → 2t alumina)', outcome: 'Bauxite to alumina loses ~50% weight (4-5t bauxite → 2t alumina); alumina to aluminium loses ~50%.' },
                { text: 'raw material orientation', outcome: 'Not quite — Students believe aluminium smelters locate near bauxite mines (like Koraput) because "raw material.', reveals: 'aluminium-smelters-locate-near-bauxite' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_20_006', title: 'Industrial Pollution: Types (Air, Water, Soil, Noise) and Control',
          caseStudy: { intro: 'Observe the chimney stack of a nearby thermal power plant or brick kiln — the visible plume contains invisible PM₂.₅ and SO₂ that settle on crop leaves and.',
            decisions: [{ prompt: 'Name the four major types of industrial pollution and give one specific pollutant example for each type with its primary industrial source.', options: [
                { text: 'Air pollution: Sulphur dioxide (SO₂) from thermal power plants burning coal', outcome: 'Air pollution: Sulphur dioxide (SO₂) from thermal power plants burning coal.' },
                { text: 'pollution control = installing one device at the chimney/pipe end', outcome: 'Not quite — Students believe "pollution control = installing one device at the chimney/pipe end" (end-of-pipe.', reveals: 'pollution-control-installing-one-device' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_20_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a case-study on \'why industries locate where they do\', a student generalises from iron and steel: \'Every factory sits next to its raw material — a soda-ash plant should be built beside a salt mine, and cotton mills belong in the cotton fields.\'',
            decisions: [{ prompt: 'Where does the raw-material rule fail?', options: [
                { text: 'Introduce the weight-losing vs weight-gaining/footloose split: only weight-losing inputs pull a plant to the source — and even in cotton, just ginning (65% weight loss) is material-bound while spinning and weaving chase power, labour and markets. Soda ash gains weight and needs ammonia and CO₂ too, so it locates near glass and chemical consumers. Jute retting is the extreme case — absolute site fixation on water of the right pH, temperature and slow flow.', outcome: 'The rule gets its real form: industries locate where total input-plus-distribution cost is lowest — which can be the source, the market, or neither.' },
                { text: 'Defend the rule — agro-based industries are weight-losing, so the factory goes to the field.', outcome: 'Only some stages are weight-losing: cotton spinning/weaving are footloose and migrated to power and port access — mills aren\'t married to the field.', reveals: 'all-agro-industry-material-bound' },
                { text: 'Split the difference — locate the soda-ash plant midway between the salt mine and the market.', outcome: 'Midway maximises neither advantage: with a weight-gaining product and multiple critical inputs, the optimum is the market, not a compromise point.', reveals: 'halfway-location-is-optimal' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_20_006', title: 'The bigger picture',
          caseStudy: { intro: 'A factory locates where the whole input-output bill is cheapest — and government can sweeten that bill but can\'t write it.',
            decisions: [{ prompt: 'What comes next? Manufacturing Industries · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Manufacturing Industries · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_20_001', difficulty: 'standard',
          question: 'Manufacturing is the large-scale transformation of raw materials into finished.',
          hint: 'If stuck, revisit **c10_geo_cbse_06_007 (Industrial Location Factors)** and.',
          misconception: 'Students believe **"industries always locate near raw materials"** because textbook examples (iron & steel, cement.',
          parts: [
                { id: 'a', prompt: 'Define manufacturing in a geographical context and state its primary distinction from primary and tertiary activities.', answer: 'Manufacturing is the secondary economic activity involving mechanical/chemical',
                  options: ['Manufacturing is the secondary economic activity involving mechanical/chemical', 'any production', 'value addition', 'industries always locate near raw materials'],
                  hint: 'If stuck, revisit **c10_geo_cbse_06_007 (Industrial Location Factors)** and **c10_geo_cbse_05_009.',
                  misconception: 'Students believe **"industries always locate near raw materials"** because textbook examples (iron & steel, cement, aluminium) are.' },
                { id: 'b', prompt: 'Compare the locational factors for the traditional cotton textile industry in Mumbai (historical) and the modern automotive industry in Pune.', answer: '**Constant factors:** (1) **Market access**',
                  options: ['**Constant factors:** (1) **Market access**', 'industries always locate near raw materials', 'Why is industry X located at Y?'],
                  hint: 'If stuck, revisit **c10_geo_cbse_06_007 (Industrial Location Factors)** and **c10_geo_cbse_05_009.',
                  misconception: 'Students believe **"industries always locate near raw materials"** because textbook examples (iron & steel, cement, aluminium) are.' }
          ],
            remediations: { 'industries-always-locate-near-raw': { steps: ['** Draw a two-column table: "Weight-Losing Industries (Material Index >1)" vs.', '** For each industry on the right, identify the **dominant locational factor** replacing raw material: Cotton →.', '** Practice a map exercise: Given an outline map of India with markers for iron ore, coal, cotton, ports, metros — ask.', '** Use the **"Locational Triangle" diagram** (Raw Material — Market — Labor) to visually show how the optimal point.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_20_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **"industries always locate near raw materials"** because textbook examples (iron & steel, cement.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Government policy is the most decisive factor for industrial location in post-1991 India." Use the examples of the Tata Nano plant.', answer: '**Judgment:** Government policy is a **necessary but not sufficient** condition',
                  options: ['**Judgment:** Government policy is a **necessary but not sufficient** condition', 'industries always locate near raw materials', 'Why is industry X located at Y?'],
                  hint: 'If stuck, revisit **c10_geo_cbse_06_007 (Industrial Location Factors)** and **c10_geo_cbse_05_009.',
                  misconception: 'Students believe **"industries always locate near raw materials"** because textbook examples (iron & steel, cement, aluminium) are.' },
                { id: 'b', prompt: 'Design a locational decision framework for a new lithium-ion battery gigafactory in India.', answer: '**Framework (weights sum to 100):** 1',
                  options: ['**Framework (weights sum to 100):** 1', 'industries always locate near raw materials', 'Why is industry X located at Y?'],
                  hint: 'If stuck, revisit **c10_geo_cbse_06_007 (Industrial Location Factors)** and **c10_geo_cbse_05_009.',
                  misconception: 'Students believe **"industries always locate near raw materials"** because textbook examples (iron & steel, cement, aluminium) are.' }
          ],
            remediations: { 'industries-always-locate-near-raw': { steps: ['** Draw a two-column table: "Weight-Losing Industries (Material Index >1)" vs.', '** For each industry on the right, identify the **dominant locational factor** replacing raw material: Cotton →.', '** Practice a map exercise: Given an outline map of India with markers for iron ore, coal, cotton, ports, metros — ask.', '** Use the **"Locational Triangle" diagram** (Raw Material — Market — Labor) to visually show how the optimal point.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_20_002', difficulty: 'standard',
          question: 'Agro-based industries are manufacturing units that use agricultural raw.',
          hint: 'If stuck on locational shifts, revisit c11_geo_cbse_20_001 (Weber\'s theory) and.',
          misconception: 'Students believe "agro-based industries locate near raw material because they are weight-losing" as a blanket rule.',
          parts: [
                { id: 'a', prompt: 'Name the three distinct processing stages of cotton textile industry where weight loss occurs, and state the approximate percentage weight loss at each stage.', answer: 'The three stages: (1) Ginning',
                  options: ['The three stages: (1) Ginning', 'spinning loses most weight', 'agro-based industries locate near raw material', 'cotton textile centres'],
                  hint: 'If stuck on locational shifts, revisit c11_geo_cbse_20_001 (Weber\'s theory) and c10_geo_cbse_04_006.',
                  misconception: 'Students believe "agro-based industries locate near raw material because they are weight-losing" as a blanket rule.' },
                { id: 'b', prompt: 'A sugar mill in Maharashtra crushes 5,000 tonnes of cane per day (TCD) at 11% recovery. Another in Uttar Pradesh crushes 4,000 TCD at 10.5% recovery.', answer: 'Maharashtra: 5,000 × 0.11 × 150 = 82,500 tonnes sugar/year',
                  options: ['Maharashtra: 5,000 × 0.11 × 150 = 82,500 tonnes sugar/year', 'agro-based industries locate near raw material', 'cotton textile centres', 'cotton growing areas'],
                  hint: 'If stuck on locational shifts, revisit c11_geo_cbse_20_001 (Weber\'s theory) and c10_geo_cbse_04_006.',
                  misconception: 'Students believe "agro-based industries locate near raw material because they are weight-losing" as a blanket rule.' },
                { id: 'c', prompt: 'Compare the \'weight-losing\' character of raw materials in cotton, jute, and sugar industries.', answer: 'Rank (highest to lowest weight loss): Sugar (sugarcane: 90-92% weight loss',
                  options: ['Rank (highest to lowest weight loss): Sugar (sugarcane: 90-92% weight loss', 'agro-based industries locate near raw material', 'cotton textile centres', 'cotton growing areas'],
                  hint: 'If stuck on locational shifts, revisit c11_geo_cbse_20_001 (Weber\'s theory) and c10_geo_cbse_04_006.',
                  misconception: 'Students believe "agro-based industries locate near raw material because they are weight-losing" as a blanket rule.' }
          ],
            remediations: { 'agro-based-industries-locate-near': { steps: ['On India outline map, plot three layers — (a) cotton growing districts (black soil), (b) major cotton mill centres.', 'For jute, mark Hooghly 50km stretch — list 5 site factors (water, humidity, labour, port, coal historically) — ask.', 'For sugar, compare Maharashtra vs U.P. using a table: cane yield (t/ha), recovery (%), crushing days, number of mills.', 'Re-read diagnostic Q4 answer — internalise that weight loss % ≠ locational pull strength; process-specific constraints.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_20_003', difficulty: 'standard',
          question: 'The iron and steel industry is a heavy, weight-losing mineral-based industry.',
          hint: 'Revisit c10_geo_cbse_05_005 (Conventional Energy Sources) to re-learn the coking vs.',
          misconception: 'Students believe all Indian steel plants are located near coal mines because "coal is the heaviest input." In reality.',
          parts: [
                { id: 'a', prompt: 'Explain why the Chotanagpur plateau region hosts the maximum concentration of integrated iron and steel plants in India, referring to at least three specific.', answer: 'The Chotanagpur plateau (Jharkhand, Odisha, West Bengal) hosts TISCO-Jamshedpur,',
                  options: ['The Chotanagpur plateau (Jharkhand, Odisha, West Bengal) hosts TISCO-Jamshedpur,', 'raw materials', 'coal is the heaviest input', 'all Indian steel plants are located near coal mines'],
                  hint: 'Revisit c10_geo_cbse_05_005 (Conventional Energy Sources) to re-learn the coking vs.',
                  misconception: 'Students believe all Indian steel plants are located near coal mines because "coal is the heaviest input." In reality, coking coal (not.' },
                { id: 'b', prompt: 'Using the concept of weight-losing industry, calculate the approximate total weight of raw materials (iron ore + coking coal + limestone) required to produce.', answer: 'Step 1: Finished steel target = 10,000 tonnes',
                  options: ['Step 1: Finished steel target = 10,000 tonnes', 'coal is the heaviest input', 'all Indian steel plants are located near coal mines'],
                  hint: 'Revisit c10_geo_cbse_05_005 (Conventional Energy Sources) to re-learn the coking vs.',
                  misconception: 'Students believe all Indian steel plants are located near coal mines because "coal is the heaviest input." In reality, coking coal (not.' }
          ],
            remediations: { 'all-indian-steel-plants-are': { steps: ['On an outline map of India, mark only the coking coal fields (Jharia, Bokaro, Raniganh) and high-grade iron ore belts.', 'Overlay the six major public sector plants (Bhilai, Rourkela, Durgapur, Bokaro, Burnpur, Bhadravati) and two coastal.', 'Trace the dedicated slurry pipeline (Kirandul-Visakhapatnam) and railway freight corridors.', 'Ask the student to explain each plant\'s coking coal source—this forces confrontation with the import dependency.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_20_004', difficulty: 'standard',
          question: 'Mineral-based industries are manufacturing sectors that use non-metallic and.',
          hint: 'Review c11_geo_cbse_20_001 (locational factors) and c11_geo_cbse_20_003 (iron and steel.',
          misconception: 'Students believe aluminium smelters locate near bauxite mines (like Koraput) because "raw material orientation" applies.',
          parts: [
                { id: 'a', prompt: 'State the weight-loss ratio for aluminium production from bauxite to finished metal and explain why this makes bauxite proximity less critical than electricity.', answer: 'Bauxite to alumina loses ~50% weight (4-5t bauxite → 2t alumina)',
                  options: ['Bauxite to alumina loses ~50% weight (4-5t bauxite → 2t alumina)', 'raw material orientation'],
                  hint: 'Review c11_geo_cbse_20_001 (locational factors) and c11_geo_cbse_20_003 (iron and steel case study).',
                  misconception: 'Students believe aluminium smelters locate near bauxite mines (like Koraput) because "raw material orientation" applies uniformly.' },
                { id: 'b', prompt: 'An aluminium smelter requires 14,500 kWh per tonne of aluminium.', answer: 'Annual power consumption = 300,000 × 14,500 = 4.35 × 10⁹ kWh',
                  options: ['Annual power consumption = 300,000 × 14,500 = 4.35 × 10⁹ kWh', 'raw material orientation'],
                  hint: 'Review c11_geo_cbse_20_001 (locational factors) and c11_geo_cbse_20_003 (iron and steel case study).',
                  misconception: 'Students believe aluminium smelters locate near bauxite mines (like Koraput) because "raw material orientation" applies uniformly.' },
                { id: 'c', prompt: 'Compare the locational determinants of the fertiliser industry (urea) with those of the cement industry.', answer: 'Urea synthesis: CH₄ (natural gas) + N₂ → NH₃ → CO(NH₂)₂',
                  options: ['Urea synthesis: CH₄ (natural gas) + N₂ → NH₃ → CO(NH₂)₂', 'raw material orientation'],
                  hint: 'Review c11_geo_cbse_20_001 (locational factors) and c11_geo_cbse_20_003 (iron and steel case study).',
                  misconception: 'Students believe aluminium smelters locate near bauxite mines (like Koraput) because "raw material orientation" applies uniformly.' }
          ],
            remediations: { 'aluminium-smelters-locate-near-bauxite': { steps: ['On India\'s mineral map, mark bauxite deposits (Koraput, Kalahandi, Amarkantak, Belgaum, Jamnagar).', 'Mark aluminium smelters (Hirakud, Angul, Renukoot, Mettur, Ratnagiri, Belgaum).', 'Overlay power plants — note Hirakud (hydro), Renukoot (Rihand thermal), Mettur (hydro), Ratnagiri (gas).', 'Calculate distance mine-to-refinery vs refinery-to-smelter.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_20_005', difficulty: 'standard',
          question: 'Industrial regions are spatially concentrated clusters of manufacturing units.',
          hint: 'Revisit c11_geo_cbse_20_001 (location factors) and c10_geo_cbse_06_007 (Weber\'s theory).',
          misconception: 'Students treat industrial regions as *static labels* on a map, believing each region specialises in only *one* industry.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Industrial regions are spatially concentrated clusters of manufacturing units that share',
                  options: ['Industrial regions are spatially concentrated clusters of manufacturing units that share', 'Manufacturing is the large-scale transformation of raw materials into finished goods', 'Agro-based industries are manufacturing units that use agricultural raw materials', 'The iron and steel industry is a heavy, weight-losing mineral-based industry that'],
                  hint: 'Revisit c11_geo_cbse_20_001 (location factors) and c10_geo_cbse_06_007 (Weber\'s theory).',
                  misconception: 'Students treat industrial regions as *static labels* on a map, believing each region specialises in only *one* industry (e.g., "Mumbai.' }
          ],
            remediations: { 'students-treat-industrial-regions-as': { steps: ['Take a blank outline map of India. Plot the eight regions with *different colours*.', 'For each region, draw *three arrows* pointing inward labelled with the *top three locational factors* (e.g.', 'Draw *two arrows outward* showing *what the region supplies to others* (e.g., Chotanagpur → steel to Mumbai, → coal.', 'Write one sentence per region describing its *current dominant sector* vs. *historical sector* using NCERT Table 20.3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_20_006', difficulty: 'standard',
          question: 'Industrial pollution refers to the contamination of air, water, soil, and.',
          hint: 'Revisit "mass balance thinking" using a simple flowsheet: draw inputs/outputs for a brick.',
          misconception: 'Students believe "pollution control = installing one device at the chimney/pipe end" (end-of-pipe mindset).',
          parts: [
                { id: 'a', prompt: 'Name the four major types of industrial pollution and give one specific pollutant example for each type with its primary industrial source in India.', answer: 'Air pollution: Sulphur dioxide (SO₂) from thermal power plants burning coal',
                  options: ['Air pollution: Sulphur dioxide (SO₂) from thermal power plants burning coal', 'pollution control = installing one device at the chimney/pipe end'],
                  hint: 'Revisit "mass balance thinking" using a simple flowsheet: draw inputs/outputs for a brick kiln.',
                  misconception: 'Students believe "pollution control = installing one device at the chimney/pipe end" (end-of-pipe mindset).' },
                { id: 'b', prompt: 'Compare the pollution load (kg/day) of Suspended Particulate Matter (SPM) from two cement plants: Plant A produces 3000 tonnes clinker/day with ESP outlet.', answer: 'Step 1: Calculate daily gas volume: Plant A = 500,000 × 24 = 12,000,000 Nm³/day',
                  options: ['Step 1: Calculate daily gas volume: Plant A = 500,000 × 24 = 12,000,000 Nm³/day', 'pollution control = installing one device at the chimney/pipe end'],
                  hint: 'Revisit "mass balance thinking" using a simple flowsheet: draw inputs/outputs for a brick kiln.',
                  misconception: 'Students believe "pollution control = installing one device at the chimney/pipe end" (end-of-pipe mindset).' }
          ],
            remediations: { 'pollution-control-installing-one-device': { steps: ['Draw a *material balance flow diagram* for a simple industry (e.g., sugar mill) — show inputs (cane, water, energy).', 'Mark each output with *pollution type* (air/water/soil/noise).', 'For each, ask: "Can I reduce generation *inside* the process?" (e.g., bagasse → cogeneration reduces coal burning →.', 'Only then assign *control device* to residual stream.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
