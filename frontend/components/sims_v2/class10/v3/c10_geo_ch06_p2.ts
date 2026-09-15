import type { SimDef } from '../../engine/types';

/** v3 generated — c10_geo_ch06_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_geo_ch06_p2: SimDef = {
    id: 'v3_c10_geo_ch06_p2',
    title: 'Manufacturing Industries · Part 2/2',
    subtitle: 'Pick the perfect spot for a factory — then pay the true price',
    classLevel: 10, subject: 'geography', topic: 'Manufacturing Industries · Part 2/2',
    chapters: ['c10_geo_ch06'],
    nodeIds: ['c10_geo_cbse_06_007', 'c10_geo_cbse_06_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an industrial location analyst', intro: 'A company hands you a map of India and asks: where do we build? The honest answer involves cotton fields, coal seams, railway lines, crowded markets — and the smoke that follows.', goal: 'Explain manufacturing\'s role in the economy, apply the seven industrial location factors to real cases, and confront industry\'s environmental costs.' },
    discovery: {
        question: 'Early cotton textile mills clustered almost entirely around Mumbai and Ahmedabad — not near India\'s biggest cities or cotton\'s fanciest markets. What pulled an entire industry to that one coastal belt?',
        options: ['A convergence of location factors: nearby raw cotton, moist coastal air for spinning, ports, cheap labour, capital and a big market', 'The British legally banned textile mills everywhere else', 'Cotton only grows within 100 km of the sea', 'Mumbai had the country\'s only electricity supply then'],
        answer: 'A convergence of location factors: nearby raw cotton, moist coastal air for spinning, ports, cheap labour, capital and a big market',
        hook: 'Industries aren\'t planted randomly — they migrate to wherever raw material, labour, power, transport and markets add up to the lowest cost. Geography is arithmetic with a map.',
    },
    teaching: [
        { title: 'Industrial Location: Factors Influencing the Siting of Industries', text: 'Industrial location refers to the geographical siting of manufacturing units based on a comparative analysis of locational factors such as availability of raw materials, labour, capital, power.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_geo_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Site a new factory from scratch: weigh raw material, labour, power, capital, transport, market and government policy for competing locations, then defend why industry also means pollution.',
        labels: ['Industrial Location: Factors Influencing', 'Key Industries in India'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_06_007', title: 'Industrial Location: Factors Influencing the Siting of Industries',
          scaffold: { problem: 'A sugar mill must be located in Uttar Pradesh. Sugarcane loses 10-15% sucrose content within 24 hours of harvest.',
            steps: [
            { text: 'Identify the critical locational constraint — sugarcane is a perishable, weight-losing raw material (sucrose loss + 70%.' },
            { text: 'Apply the principle — sugar mills must be within 15-20 km of cane fields to minimize sucrose loss and transport cost.' },
            { text: 'Evaluate Zone A — high yield ensures steady supply; good roads enable quick transport; proximity to Delhi market aids.' },
            { text: 'Evaluate Zone B — poor roads increase transport time, raising sucrose loss; moderate yield risks supply gaps. Rejected.' },
            { text: 'Evaluate Zone C — high yield but poor connectivity delays crushing; distant market increases finished sugar transport.' },
            { text: 'Conclude Zone A (Western UP) is optimal — this matches actual concentration of sugar mills in Meerut, Muzaffarnagar.', faded: true, blankAnswer: 'Western UP (Zone A) — high cane yield + good road network.' }
            ] } },
        { type: 'case', nodeId: 'c10_geo_cbse_06_008', title: 'Key Industries in India: Distribution and Major Centres',
          caseStudy: { intro: 'Begin by asking students to observe a political map of India and note where they see clusters of factories in their own state or region — for example, the.',
            decisions: [{ prompt: 'Name the major centre of the iron and steel industry located in Jharkhand and the raw material advantage it enjoys.', options: [
                { text: 'Jamshedpur (Tata Steel) is the major centre', outcome: 'Jamshedpur (Tata Steel) is the major centre; it benefits from proximity to high-grade iron ore from.' },
                { text: 'cotton textile must be in cotton fields, jute must be in jute fields', outcome: 'Not quite — Students often believe that every industry locates strictly at the source of its raw material.', reveals: 'every-industry-locates-strictly-at' },
                { text: 'Bhilai or Rourkela', outcome: 'Not quite — Students often believe that every industry locates strictly at the source of its raw material.', reveals: 'every-industry-locates-strictly-at' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_06_007', title: 'A real-world call',
          caseStudy: { intro: 'A textile factory pollutes a river its workers\' families drink from. Closing it poisons nobody; it also pays nobody. Regulating it costs money that may move the factory elsewhere.',
            decisions: [{ prompt: 'Whose job is it to make the factory clean?', options: [
                { text: 'The factory\'s — pollution is a cost of doing business', outcome: 'The polluter-pays principle; the factory can also simply leave, taking the jobs and keeping the practice elsewhere.' },
                { text: 'The government\'s — public health is a public duty', outcome: 'The regulatory answer; only works where the regulator is stronger than the industry it regulates.' },
                { text: 'Shared — cleaner tech funded jointly, jobs kept', outcome: 'The cooperative answer; requires the factory to stay, which means the clean-up must be cheaper than leaving.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a class project, students propose relocating the district\'s sugar mill from the cane belt to a plot beside the city\'s biggest mall \'so more customers can reach it.\' Their economics teacher asks them to reconsider what a sugar mill really needs to be near.',
            decisions: [{ prompt: 'Why do sugar mills sit next to cane fields rather than next to customers?', options: [
                { text: 'Sugarcane is a weight-losing, perishable raw material — only a small fraction of its weight becomes sugar, and it must be crushed quickly after harvest. Hauling heavy cane to a city mill would cost more than the sugar is worth and let the cane go stale, so the mill stays near the fields and only the light, shippable sugar travels to market.', outcome: 'This is the classic raw-material location rule: when inputs are bulky, perishable and lose weight in processing, the industry is pulled to the input, not the consumer.' },
                { text: 'The students are right — being next to the biggest market always matters most, so the city site wins.', outcome: 'Market pull wins only when transport of the finished product is the costly or risky leg; here the costly leg is moving heavy perishable cane, so raw material wins.', reveals: 'market-always-wins' },
                { text: 'Mills locate near fields only because city land is expensive — raw material has nothing to do with it.', outcome: 'Land cost helps, but the decisive factor is the cane itself — its weight, bulk and perishability make long haulage ruinous regardless of land prices.', reveals: 'location-is-just-land-price' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_06_008', title: 'You made it',
          caseStudy: { intro: 'Manufacturing turns harvests into incomes and ores into machines — the sector that decides whether India stays a supplier of raw stuff or becomes a maker.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_geo_cbse_06_007', difficulty: 'standard',
          question: 'Industrial location refers to the geographical siting of manufacturing units.',
          hint: 'Revisit the concept of "material index" and practice classifying raw materials for 5.',
          misconception: 'Students believe "nearness to raw material" is always the #1 factor for all industries.',
          parts: [
                { id: 'a', prompt: 'Explain why the iron and steel industry is typically located near coal fields or iron ore mines, whereas the cotton textile industry historically concentrated.', answer: 'Iron and steel uses weight-losing raw materials (iron ore, coal, limestone)',
                  options: ['Iron and steel uses weight-losing raw materials (iron ore, coal, limestone)', 'nearness to raw material', '"nearness to raw material" is always the #1 factor for all industries'],
                  hint: 'Revisit the concept of "material index" and practice classifying raw materials for 5 industries.',
                  misconception: 'Students believe "nearness to raw material" is always the #1 factor for all industries.' },
                { id: 'b', prompt: 'Compare the locational factors for the traditional cotton textile industry in Maharashtra-Gujarat with the modern IT industry in Bengaluru-Hyderabad.', answer: 'Reversed factors: 1) Climate',
                  options: ['Reversed factors: 1) Climate', 'nearness to raw material', '"nearness to raw material" is always the #1 factor for all industries'],
                  hint: 'Revisit the concept of "material index" and practice classifying raw materials for 5 industries.',
                  misconception: 'Students believe "nearness to raw material" is always the #1 factor for all industries.' }
          ],
            remediations: { 'nearness-to-raw-material-is': { steps: ['Draw a two-column table — "Weight-losing raw material industries" (iron & steel, sugar, cement) vs.', 'For each, list the actual locating factor (raw material source vs. labour/market/policy).', 'Locate one example of each on an outline map of India (e.g., Bhilai vs. Bengaluru).', 'Write one sentence explaining why the factor differs using the concept of "material index" (weight of raw material.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "nearness to raw material" is always the #1 factor for all industries.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Government policy is the most important factor for industrial location in modern India." Use examples of successful and failed.', answer: 'Policy can catalyze but cannot override geography',
                  options: ['Policy can catalyze but cannot override geography', 'nearness to raw material', '"nearness to raw material" is always the #1 factor for all industries'],
                  hint: 'Revisit the concept of "material index" and practice classifying raw materials for 5 industries.',
                  misconception: 'Students believe "nearness to raw material" is always the #1 factor for all industries.' },
                { id: 'b', prompt: 'Design a location decision matrix for a proposed integrated steel plant in India.', answer: 'Weights: Raw material 30% (weight-losing, high transport cost), Power 25%',
                  options: ['Weights: Raw material 30% (weight-losing, high transport cost), Power 25%', 'nearness to raw material', '"nearness to raw material" is always the #1 factor for all industries'],
                  hint: 'Revisit the concept of "material index" and practice classifying raw materials for 5 industries.',
                  misconception: 'Students believe "nearness to raw material" is always the #1 factor for all industries.' }
          ],
            remediations: { 'nearness-to-raw-material-is': { steps: ['Draw a two-column table — "Weight-losing raw material industries" (iron & steel, sugar, cement) vs.', 'For each, list the actual locating factor (raw material source vs. labour/market/policy).', 'Locate one example of each on an outline map of India (e.g., Bhilai vs. Bengaluru).', 'Write one sentence explaining why the factor differs using the concept of "material index" (weight of raw material.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_06_008', difficulty: 'standard',
          question: 'Key Industries in India refer to the major manufacturing sectors (iron and.',
          hint: 'Revisit node c10_geo_cbse_06_007 (Industrial Location Factors) and the industry-specific.',
          misconception: 'Students often believe that every industry locates strictly at the source of its raw material (e.g., "cotton textile.',
          parts: [
                { id: 'a', prompt: 'Name the major centre of the iron and steel industry located in Jharkhand and the raw material advantage it enjoys.', answer: 'Jamshedpur (Tata Steel) is the major centre',
                  options: ['Jamshedpur (Tata Steel) is the major centre', 'cotton textile must be in cotton fields, jute must be in jute fields', 'Bhilai or Rourkela', 'every industry locates strictly at the source of its raw material (e'],
                  hint: 'Revisit node c10_geo_cbse_06_007 (Industrial Location Factors) and the industry-specific nodes.',
                  misconception: 'Students often believe that every industry locates strictly at the source of its raw material (e.g., "cotton textile must be in cotton.' },
                { id: 'b', prompt: 'On an outline map of India, mark and label the following: (a) a major jute mill centre in West Bengal, (b) an aluminium plant in Odisha, (c) a cement plant.', answer: 'a major jute mill centre in West Bengal, (',
                  options: ['a major jute mill centre in West Bengal, (', 'cotton textile must be in cotton fields, jute must be in jute fields', 'misplaces any centre (e', 'every industry locates strictly at the source of its raw material (e'],
                  hint: 'Revisit node c10_geo_cbse_06_007 (Industrial Location Factors) and the industry-specific nodes.',
                  misconception: 'Students often believe that every industry locates strictly at the source of its raw material (e.g., "cotton textile must be in cotton.' }
          ],
            remediations: { 'every-industry-locates-strictly-at': { steps: ['Have the student draw a two-column table — "Raw Material Site" vs.', 'For every mismatch (e.g., cotton grown in Maharashtra but mills in Ahmedabad), ask them to list the non-raw-material.', 'Use the "Industrial Location Factors" flowchart from node c10_geo_cbse_06_007 to classify each industry.', 'Practice a past board map question where they must justify the location of a given centre in three bullet points — this.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
