import type { SimDef } from '../../engine/types';

/** v3 generated — c10_geo_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_geo_ch06_p1: SimDef = {
    id: 'v3_c10_geo_ch06_p1',
    title: 'Manufacturing Industries · Part 1/2',
    subtitle: 'Pick the perfect spot for a factory — then pay the true price',
    classLevel: 10, subject: 'geography', topic: 'Manufacturing Industries · Part 1/2',
    chapters: ['c10_geo_ch06'],
    nodeIds: ['c10_geo_cbse_06_001', 'c10_geo_cbse_06_002', 'c10_geo_cbse_06_003', 'c10_geo_cbse_06_004', 'c10_geo_cbse_06_005', 'c10_geo_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an industrial location analyst', intro: 'A company hands you a map of India and asks: where do we build? The honest answer involves cotton fields, coal seams, railway lines, crowded markets — and the smoke that follows.', goal: 'Explain manufacturing\'s role in the economy, apply the seven industrial location factors to real cases, and confront industry\'s environmental costs.' },
    discovery: {
        question: 'Early cotton textile mills clustered almost entirely around Mumbai and Ahmedabad — not near India\'s biggest cities or cotton\'s fanciest markets. What pulled an entire industry to that one coastal belt?',
        options: ['A convergence of location factors: nearby raw cotton, moist coastal air for spinning, ports, cheap labour, capital and a big market', 'The British legally banned textile mills everywhere else', 'Cotton only grows within 100 km of the sea', 'Mumbai had the country\'s only electricity supply then'],
        answer: 'A convergence of location factors: nearby raw cotton, moist coastal air for spinning, ports, cheap labour, capital and a big market',
        hook: 'Industries aren\'t planted randomly — they migrate to wherever raw material, labour, power, transport and markets add up to the lowest cost. Geography is arithmetic with a map.',
    },
    teaching: [
        { title: 'Manufacturing: Importance and Industrial Location Factors', text: 'Manufacturing is the process of transforming raw materials into finished goods on a large scale using machinery, labour, and capital; industrial location factors are the geographical and economic.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_geo_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Site a new factory from scratch: weigh raw material, labour, power, capital, transport, market and government policy for competing locations, then defend why industry also means pollution.',
        labels: ['Manufacturing: Importance and Industrial', 'Agro-Based Industries: Textile (Cotton,', 'Mineral-Based Industries: Iron', 'Mineral-Based Industries: Aluminium, Cement', 'Industrial Pollution: Air, Water,', 'Control of Environmental Degradation'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_06_001', title: 'Manufacturing: Importance and Industrial Location Factors',
          scaffold: { problem: 'A sugar mill in Muzaffarnagar (western UP) processes 5,000 tonnes of sugarcane daily during the 180-day crushing season.',
            steps: [
            { text: 'Identify the raw material and its key property — sugarcane is perishable and weight-losing (only 12% becomes sugar; 88%.' },
            { text: 'Calculate daily sugar output — 5,000 tonnes cane × 12% = 600 tonnes sugar per day.' },
            { text: 'Compute material index — input weight (cane) = 5,000 tonnes; output weight (sugar) = 600 tonnes; MI = 5000/600 ≈ 8.33.' },
            { text: 'Analyse transport cost implication — moving 5,000 tonnes of bulky, perishable cane 120 km daily requires ~250 truck.' },
            { text: 'Compare with moving sugar — 600 tonnes sugar needs only 30 trucks; lower freight, no perishability.', faded: true, blankAnswer: 'Daily sugar output = 600 tonnes. Relocation to Delhi.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_06_002', title: 'Agro-Based Industries: Textile (Cotton, Jute) and Sugar Industry',
          scaffold: { problem: 'A sugar mill in Uttar Pradesh crushes 5,000 tonnes of sugarcane per day during a 150-day season. The average sucrose recovery is 10.5%.',
            steps: [
            { text: 'Calculate annual cane crushed in UP = Daily capacity × Season days = 5,000 tonnes/day × 150 days = 7,50,000 tonnes.' },
            { text: 'Calculate UP sugar production = Annual cane crushed × Recovery % = 7,50,000 × (10.5/100) = 78,750 tonnes.' },
            { text: 'Calculate annual cane crushed in Maharashtra = 5,000 tonnes/day × 210 days = 10,50,000 tonnes.' },
            { text: 'Calculate Maharashtra sugar production = 10,50,000 × (12.5/100) = 1,31,250 tonnes.' },
            { text: 'Calculate percentage increase = [(New - Old) / Old] × 100 = [(1,31,250 - 78,750) / 78,750] × 100 = (52,500 / 78,750).', faded: true, blankAnswer: 'UP production = 78,750 tonnes/year. Maharashtra production.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_06_003', title: 'Mineral-Based Industries: Iron and Steel Industry in India',
          scaffold: { problem: 'A student is asked in the board exam: "Explain why the iron and steel industry is concentrated in the Chotanagpur plateau region.',
            steps: [
            { text: 'Identify the core geographical principle — iron and steel is a weight-losing industry (RMI > 2), so transport cost.' },
            { text: 'Name the specific raw materials — high-grade hematite iron ore and coking coal — and state they occur in close.' },
            { text: 'Give concrete examples — Iron ore: Noamundi, Gua, Kiriburu (Jharkhand), Badampahar (Odisha); Coking coal: Jharia.' },
            { text: 'Add two more locational advantages — (a) Good railway network (Bengal-Nagpur Railway, now South Eastern Railway) built.' },
            { text: 'Conclude with the result — this cluster hosts 5 SAIL plants (Bhilai, Rourkela, Durgapur, Bokaro, Burnpur) + TISCO.' },
            { text: 'Check against marking scheme — 1 mark for weight-losing principle, 1 mark for specific ore/coal names, 1 mark for.', faded: true, blankAnswer: 'The iron and steel industry concentrates in the Chotanagpur.' }
            ] } },
        { type: 'case', nodeId: 'c10_geo_cbse_06_004', title: 'Mineral-Based Industries: Aluminium, Cement and Chemical Industries',
          caseStudy: { intro: 'Observe a cement bag at a construction site near your home — it likely bears a brand like UltraTech, Ambuja, or ACC.',
            decisions: [{ prompt: 'Name the primary ore of aluminium and the key energy requirement for its extraction.', options: [
                { text: 'The primary ore of aluminium is bauxite', outcome: 'The primary ore of aluminium is bauxite. The extraction of aluminium from alumina (obtained from.' },
                { text: 'haematite or saying coal is the main energy need', outcome: 'Not quite — Students often think the chemical industry is a single homogeneous industry located only near.', reveals: 'the-chemical-industry-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_06_005', title: 'Industrial Pollution: Air, Water, Soil and Noise Pollution',
          caseStudy: { intro: 'Observe the yellowish haze over Delhi in winter or the froth on the Yamuna river near industrial drains — these are visible signatures of industrial pollution.',
            decisions: [{ prompt: 'Name the four categories of industrial pollution and give one specific industrial source for each category from the Indian context.', options: [
                { text: 'Correct answer: (1) Air pollution', outcome: 'Correct answer: (1) Air pollution — e.g., sulphur dioxide from thermal power plants burning coal.' },
                { text: 'dirty water', outcome: 'Not quite — Students believe "industrial pollution" means only visible smoke from chimneys or coloured water.', reveals: 'industrial-pollution-means-only-visible' },
                { text: 'industrial pollution', outcome: 'Not quite — Students believe "industrial pollution" means only visible smoke from chimneys or coloured water.', reveals: 'industrial-pollution-means-only-visible' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_06_006', title: 'Control of Environmental Degradation from Industries',
          caseStudy: { intro: 'Observe the chimney of a thermal power plant near your city — on a clear day you see a white plume, but on bad days it turns dark grey, and nearby residents.',
            decisions: [{ prompt: 'Name the specific air pollution control device commonly installed in Indian thermal power plants to remove fly ash from flue gases before.', options: [
                { text: '**Electrostatic Precipitator (ESP)**', outcome: 'The correct answer is **Electrostatic Precipitator (ESP)**. A wrong answer like "scrubber".' },
                { text: 'scrubber', outcome: 'Not quite — Students believe that **installing pollution control equipment (like ETP or ESP) automatically.', reveals: 'installing-pollution-control-equipment-like' },
                { text: 'cyclone separator', outcome: 'Not quite — Students believe that **installing pollution control equipment (like ETP or ESP) automatically.', reveals: 'installing-pollution-control-equipment-like' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_06_001', title: 'A real-world call',
          caseStudy: { intro: 'A textile factory pollutes a river its workers\' families drink from. Closing it poisons nobody; it also pays nobody. Regulating it costs money that may move the factory elsewhere.',
            decisions: [{ prompt: 'Whose job is it to make the factory clean?', options: [
                { text: 'The factory\'s — pollution is a cost of doing business', outcome: 'The polluter-pays principle; the factory can also simply leave, taking the jobs and keeping the practice elsewhere.' },
                { text: 'The government\'s — public health is a public duty', outcome: 'The regulatory answer; only works where the regulator is stronger than the industry it regulates.' },
                { text: 'Shared — cleaner tech funded jointly, jobs kept', outcome: 'The cooperative answer; requires the factory to stay, which means the clean-up must be cheaper than leaving.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a class project, students propose relocating the district\'s sugar mill from the cane belt to a plot beside the city\'s biggest mall \'so more customers can reach it.\' Their economics teacher asks them to reconsider what a sugar mill really needs to be near.',
            decisions: [{ prompt: 'Why do sugar mills sit next to cane fields rather than next to customers?', options: [
                { text: 'Sugarcane is a weight-losing, perishable raw material — only a small fraction of its weight becomes sugar, and it must be crushed quickly after harvest. Hauling heavy cane to a city mill would cost more than the sugar is worth and let the cane go stale, so the mill stays near the fields and only the light, shippable sugar travels to market.', outcome: 'This is the classic raw-material location rule: when inputs are bulky, perishable and lose weight in processing, the industry is pulled to the input, not the consumer.' },
                { text: 'The students are right — being next to the biggest market always matters most, so the city site wins.', outcome: 'Market pull wins only when transport of the finished product is the costly or risky leg; here the costly leg is moving heavy perishable cane, so raw material wins.', reveals: 'market-always-wins' },
                { text: 'Mills locate near fields only because city land is expensive — raw material has nothing to do with it.', outcome: 'Land cost helps, but the decisive factor is the cane itself — its weight, bulk and perishability make long haulage ruinous regardless of land prices.', reveals: 'location-is-just-land-price' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'Manufacturing turns harvests into incomes and ores into machines — the sector that decides whether India stays a supplier of raw stuff or becomes a maker.',
            decisions: [{ prompt: 'What comes next? Manufacturing Industries · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Manufacturing Industries · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_geo_cbse_06_001', difficulty: 'standard',
          question: 'Manufacturing is the process of transforming raw materials into finished goods.',
          hint: 'Revisit Class 8 "Classification by Exhaustibility" (c8_geo_ch1_3) and Class 6 "Major.',
          misconception: 'Students believe "industries locate where raw materials are found" as a universal rule.',
          parts: [
                { id: 'a', prompt: 'Why do sugar mills in India concentrate in the sugarcane-growing belts of Uttar Pradesh, Maharashtra, and Karnataka, even though sugar can be transported.', answer: 'Sugarcane is a weight-losing, perishable raw material',
                  options: ['Sugarcane is a weight-losing, perishable raw material', 'raw material availability', 'weight-losing', 'perishable'],
                  hint: 'Revisit Class 8 "Classification by Exhaustibility" (c8_geo_ch1_3) and Class 6 "Major Crops.',
                  misconception: 'Students believe "industries locate where raw materials are found" as a universal rule.' },
                { id: 'b', prompt: 'A new integrated steel plant is proposed in Jharkhand. Using the concept of \'weight-losing raw material\', explain why proximity to iron ore and coal mines.', answer: 'Step 1: Identify raw materials',
                  options: ['Step 1: Identify raw materials', 'market is important', 'industries locate where raw materials are found', '"industries locate where raw materials are found" as a universal rule'],
                  hint: 'Revisit Class 8 "Classification by Exhaustibility" (c8_geo_ch1_3) and Class 6 "Major Crops.',
                  misconception: 'Students believe "industries locate where raw materials are found" as a universal rule.' }
          ],
            remediations: { 'industries-locate-where-raw-materials': { steps: ['Draw a two-column table on paper — Column A: "Weight-losing raw material industries" (iron & steel, sugar, cement).', 'For each industry in your textbook (c10_geo_cbse_06_002 to 004), place it in the correct column and write the *material.', 'On an outline map of India, mark one cluster for each column (e.g., Jamshedpur for A, Bengaluru for B) and annotate the.', 'Re-attempt Diagnostic Questions 2, 3, 4 using this table — you will see the pattern.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "industries locate where raw materials are found" as a universal rule.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Government policy is the most decisive factor for industrial location in modern India." Support your judgment with two contrasting.', answer: 'Judgment: Partially true',
                  options: ['Judgment: Partially true', 'policy is always decisive', 'industries locate where raw materials are found', '"industries locate where raw materials are found" as a universal rule'],
                  hint: 'Revisit Class 8 "Classification by Exhaustibility" (c8_geo_ch1_3) and Class 6 "Major Crops.',
                  misconception: 'Students believe "industries locate where raw materials are found" as a universal rule.' },
                { id: 'b', prompt: 'Design a location decision matrix for a hypothetical agro-based food processing unit (tomato ketchup) in Maharashtra.', answer: 'Matrix: (1) Raw material proximity (tomato farms)',
                  options: ['Matrix: (1) Raw material proximity (tomato farms)', 'industries locate where raw materials are found', '"industries locate where raw materials are found" as a universal rule'],
                  hint: 'Revisit Class 8 "Classification by Exhaustibility" (c8_geo_ch1_3) and Class 6 "Major Crops.',
                  misconception: 'Students believe "industries locate where raw materials are found" as a universal rule.' }
          ],
            remediations: { 'industries-locate-where-raw-materials': { steps: ['Draw a two-column table on paper — Column A: "Weight-losing raw material industries" (iron & steel, sugar, cement).', 'For each industry in your textbook (c10_geo_cbse_06_002 to 004), place it in the correct column and write the *material.', 'On an outline map of India, mark one cluster for each column (e.g., Jamshedpur for A, Bengaluru for B) and annotate the.', 'Re-attempt Diagnostic Questions 2, 3, 4 using this table — you will see the pattern.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_06_002', difficulty: 'standard',
          question: 'Agro-based industries are manufacturing industries that use agricultural.',
          hint: 'If stuck, revisit c10_geo_cbse_06_001 (industrial location factors) and.',
          misconception: 'Students believe the sugar industry is shifting south ONLY because "sugarcane grows better in Maharashtra." They miss.',
          parts: [
                { id: 'a', prompt: 'Name the three major agro-based industries covered in this chapter and state the primary raw material for each.', answer: 'The three major agro-based industries are: (1) Cotton textile industry',
                  options: ['The three major agro-based industries are: (1) Cotton textile industry', 'or missing', 'sugarcane grows better in Maharashtra', 'jute growing area'],
                  hint: 'If stuck, revisit c10_geo_cbse_06_001 (industrial location factors) and c6_geography_ch04_022.',
                  misconception: 'Students believe the sugar industry is shifting south ONLY because "sugarcane grows better in Maharashtra." They miss the crucial.' },
                { id: 'b', prompt: 'On an outline map of India, mark and label the following: (a) Two major cotton textile centres in Gujarat, (b) The region of maximum jute mill concentration.', answer: 'Two major cotton textile centres in Gujarat, (',
                  options: ['Two major cotton textile centres in Gujarat, (', 'sugarcane grows better in Maharashtra', 'jute growing area', 'jute mill location'],
                  hint: 'If stuck, revisit c10_geo_cbse_06_001 (industrial location factors) and c6_geography_ch04_022.',
                  misconception: 'Students believe the sugar industry is shifting south ONLY because "sugarcane grows better in Maharashtra." They miss the crucial.' },
                { id: 'c', prompt: 'Compare the locational advantages of the sugar industry in Uttar Pradesh (traditional) versus Maharashtra (modern) using the factors: sucrose content, crushing.', answer: '| Factor | Uttar Pradesh (Traditional) | Maharashtra (Modern) |',
                  options: ['| Factor | Uttar Pradesh (Traditional) | Maharashtra (Modern) |', 'UP has more sugar mills so it\'s better', 'sugarcane grows better in Maharashtra', 'jute growing area'],
                  hint: 'If stuck, revisit c10_geo_cbse_06_001 (industrial location factors) and c6_geography_ch04_022.',
                  misconception: 'Students believe the sugar industry is shifting south ONLY because "sugarcane grows better in Maharashtra." They miss the crucial.' }
          ],
            remediations: { 'the-sugar-industry-is-shifting': { steps: ['Draw a 2-column table on paper — left column "Traditional North Indian Sugar (UP/Bihar)", right column "Modern.', 'Fill rows: Climate type, Sucrose %, Crushing months, Mill size, Ownership, Farmer income.', 'Use NCERT Figure 6.6 (sugar mill distribution map) — trace the shift arrow from Ganga plain to Deccan.', 'For jute, take an outline map — shade jute-growing states (WB, Bihar, Assam, Meghalaya) in green, then mark ONLY the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_06_003', difficulty: 'standard',
          question: 'The iron and steel industry is a mineral-based heavy industry that uses iron.',
          hint: 'Revisit c10_geo_cbse_06_007 (Industrial Location Factors) and c7_geo_ch01_006 (Peninsular.',
          misconception: 'Students think **all** Indian steel plants are located in the Chotanagpur plateau (Jharkhand-Odisha-West Bengal).',
          parts: [
                { id: 'a', prompt: 'Why is the iron and steel industry called a "weight-losing industry" and how does this determine its location in India?', answer: 'It is a weight-losing industry',
                  options: ['It is a weight-losing industry', 'near iron ore', 'mini steel plants', 'integrated steel plants'],
                  hint: 'Revisit c10_geo_cbse_06_007 (Industrial Location Factors) and c7_geo_ch01_006 (Peninsular Plateau.',
                  misconception: 'Students think **all** Indian steel plants are located in the Chotanagpur plateau (Jharkhand-Odisha-West Bengal).' },
                { id: 'b', prompt: 'Given: A proposed integrated steel plant needs 10 million tonnes per annum (MTPA) of crude steel.', answer: 'Step 1: Crude steel target = 10 MTPA',
                  options: ['Step 1: Crude steel target = 10 MTPA', 'mini steel plants', 'integrated steel plants'],
                  hint: 'Revisit c10_geo_cbse_06_007 (Industrial Location Factors) and c7_geo_ch01_006 (Peninsular Plateau.',
                  misconception: 'Students think **all** Indian steel plants are located in the Chotanagpur plateau (Jharkhand-Odisha-West Bengal).' },
                { id: 'c', prompt: 'Compare the locational advantages of Bhilai (Chhattisgarh) and Visakhapatnam (Andhra Pradesh) steel plants.', answer: 'Bhilai: Located in the Chotanagpur plateau fringe',
                  options: ['Bhilai: Located in the Chotanagpur plateau fringe', 'both are near iron ore', 'mini steel plants', 'integrated steel plants'],
                  hint: 'Revisit c10_geo_cbse_06_007 (Industrial Location Factors) and c7_geo_ch01_006 (Peninsular Plateau.',
                  misconception: 'Students think **all** Indian steel plants are located in the Chotanagpur plateau (Jharkhand-Odisha-West Bengal).' }
          ],
            remediations: { 'all-indian-steel-plants-are': { steps: ['On an outline map of India, mark all 10+ major integrated steel plants (SAIL, RINL, TISCO, JSW, etc.) using different.', 'Draw arrows showing iron ore sources (Bailadila, Kiriburu, Kudremukh, Bellary) and coal sources (Jharia, Raniganj.', 'Identify which plants use domestic coal vs. imported coal.', 'Write one-line location logic for each plant (e.g., "Salem: uses local iron ore (Kanthmalai) + imported coal via.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_06_004', difficulty: 'standard',
          question: 'Mineral-based industries are those that use minerals (ores) as their primary.',
          hint: 'Review c10_geo_cbse_06_001 — specifically the section on "Factors Influencing Industrial.',
          misconception: 'Students often think the chemical industry is a single homogeneous industry located only near petroleum refineries.',
          parts: [
                { id: 'a', prompt: 'Name the primary ore of aluminium and the key energy requirement for its extraction.', answer: 'The primary ore of aluminium is bauxite',
                  options: ['The primary ore of aluminium is bauxite', 'haematite or saying coal is the main energy need'],
                  hint: 'Review c10_geo_cbse_06_001 — specifically the section on "Factors Influencing Industrial Location".',
                  misconception: 'Students often think the chemical industry is a single homogeneous industry located only near petroleum refineries.' }
          ],
            remediations: { 'the-chemical-industry-is-a': { steps: ['Revisit the raw material table for each industry from the NCERT textbook (page 68-70).', 'On an outline map of India, mark bauxite deposits (Odisha, Jharkhand, Gujarat, Maharashtra), limestone belts (Satna.', 'Overlay thermal/hydro power stations and railway network.', 'For each industry, draw arrows from raw material source to plant location and write one-line justification (e.g.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_06_005', difficulty: 'standard',
          question: 'Industrial pollution refers to the contamination of air, water, soil, and the.',
          hint: 'If stuck, re-read the "Process" subsection in c10_geo_cbse_06_003 (Iron & Steel) and.',
          misconception: 'Students believe "industrial pollution" means only visible smoke from chimneys or coloured water in drains.',
          parts: [
                { id: 'a', prompt: 'Name the four categories of industrial pollution and give one specific industrial source for each category from the Indian context.', answer: 'Correct answer: (1) Air pollution',
                  options: ['Correct answer: (1) Air pollution', 'dirty water', 'industrial pollution'],
                  hint: 'If stuck, re-read the "Process" subsection in c10_geo_cbse_06_003 (Iron & Steel) and.',
                  misconception: 'Students believe "industrial pollution" means only visible smoke from chimneys or coloured water in drains.' },
                { id: 'b', prompt: 'A factory in Durgapur (West Bengal) releases hot water (thermal effluent) and fly ash into the Damodar river.', answer: 'Correct answer: (1) Thermal pollution (a subset of water pollution)',
                  options: ['Correct answer: (1) Thermal pollution (a subset of water pollution)', 'air pollution only', 'industrial pollution'],
                  hint: 'If stuck, re-read the "Process" subsection in c10_geo_cbse_06_003 (Iron & Steel) and.',
                  misconception: 'Students believe "industrial pollution" means only visible smoke from chimneys or coloured water in drains.' }
          ],
            remediations: { 'industrial-pollution-means-only-visible': { steps: ['Revisit the process flow diagrams in c10_geo_cbse_06_003 (Iron & Steel) and c10_geo_cbse_06_004 (Cement) — trace every.', 'Use the CPCB "Red/Orange/Green" industry classification list (NCERT Table 6.4) to match 10 industries to their dominant.', 'Draw a simple "source-pathway-sink-receptor" diagram for each of the four pollution types using a local example (e.g.', 'Practice writing 3-point answers: Pollutant name → Industrial process releasing it → Environmental medium affected.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_06_006', difficulty: 'standard',
          question: 'Control of environmental degradation from industries refers to the systematic.',
          hint: 'Review c10_geo_cbse_06_005 — make a table: Industry Type | Air Pollutant | Water.',
          misconception: 'Students believe that **installing pollution control equipment (like ETP or ESP) automatically ensures "zero pollution".',
          parts: [
                { id: 'a', prompt: 'Name the specific air pollution control device commonly installed in Indian thermal power plants to remove fly ash from flue gases before they exit the chimney.', answer: '**Electrostatic Precipitator (ESP)**',
                  options: ['**Electrostatic Precipitator (ESP)**', 'scrubber', 'cyclone separator', 'zero pollution'],
                  hint: 'Review c10_geo_cbse_06_005 — make a table: Industry Type | Air Pollutant | Water Pollutant | Solid.',
                  misconception: 'Students believe that **installing pollution control equipment (like ETP or ESP) automatically ensures "zero pollution" and compliance**.' },
                { id: 'b', prompt: 'A sugar mill in Uttar Pradesh generates bagasse (fibrous residue) and press mud (filter cake) as solid wastes.', answer: 'This is **waste minimization / resource recovery / circular economy approach**',
                  options: ['This is **waste minimization / resource recovery / circular economy approach**', 'recycling', 'zero pollution'],
                  hint: 'Review c10_geo_cbse_06_005 — make a table: Industry Type | Air Pollutant | Water Pollutant | Solid.',
                  misconception: 'Students believe that **installing pollution control equipment (like ETP or ESP) automatically ensures "zero pollution" and compliance**.' }
          ],
            remediations: { 'installing-pollution-control-equipment-like': { steps: ['Revisit **c10_geo_cbse_06_005 (Industrial Pollution)** — list the specific pollutants for each industry type (thermal.', 'Draw a **2-column table**: Column A = Pollutant, Column B = *Specific* Control Technology (not generic "treatment").', 'Use the **Damodar River basin case** (Class 10 NCERT) — map the concentration of industries (coal, steel, thermal) and.', 'Practice one CBSE 3-mark question: "Explain why pollution control equipment alone is not enough" — structure answer.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
