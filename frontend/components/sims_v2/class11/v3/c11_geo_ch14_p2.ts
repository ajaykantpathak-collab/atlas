import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch14_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch14_p2: SimDef = {
    id: 'v3_c11_geo_ch14_p2',
    title: 'Natural Vegetation · Part 2/2',
    subtitle: 'Read India\'s forests as a rainfall-and-temperature map come alive.',
    classLevel: 11, subject: 'geography', topic: 'Natural Vegetation · Part 2/2',
    chapters: ['c11_geo_ch14'],
    nodeIds: ['c11_geo_cbse_14_007', 'c11_geo_cbse_14_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a botanist keying out forests from climate data', intro: 'The Western Ghats drip in dimness while Pune bakes a hundred kilometres east — the mountains decide who gets the monsoon.', goal: 'Classify India\'s natural vegetation types by climatic thresholds and explain the rain-shadow effect.' },
    discovery: {
        question: 'Mahabaleshwar and Pune sit 100 km apart at the same latitude — one wrapped in evergreen forest, the other in thorn scrub. What separates them?',
        options: ['The Western Ghats\' rain shadow — the windward crest takes over 200 cm while leeward Pune gets about 70', 'Latitude — Pune is marginally farther north', 'Soil — Pune\'s ground can\'t hold roots', 'History — Pune\'s forests were all cleared'],
        answer: 'The Western Ghats\' rain shadow — the windward crest takes over 200 cm while leeward Pune gets about 70',
        hook: 'Evergreen needs >200 cm with no dry month — same latitude means nothing when a mountain range stands between you and the monsoon.',
    },
    teaching: [
        { title: 'Forest Cover in India: Distribution and State-wise Pattern', text: 'Forest cover in India refers to all lands more than one hectare in area with a tree canopy density of more than 10%, irrespective of ownership and legal status.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_14_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Classify three stations by rainfall total and driest-month values, then defend semi-evergreen forest as a climax community, not a degraded one.',
        labels: ['Forest Cover in India', 'Importance of Forests: Ecological'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_14_007', title: 'Forest Cover in India: Distribution and State-wise Pattern',
          scaffold: { problem: 'Using ISFR 2021 data, the forest cover of Chhattisgarh is 55,611 sq km and its geographical area is 135,192 sq km.',
            steps: [
            { text: 'Identify the formula: Forest Cover % = (Forest Cover Area / Geographical Area) × 100.' },
            { text: 'Plug in values: (55,611 / 135,192) × 100 = 41.13%.' },
            { text: 'Compare with Madhya Pradesh: MP has larger absolute forest cover (77,482 sq km) but much larger geographical area.' },
            { text: 'Analyze reasons: Chhattisgarh is part of the Deccan Plateau with tropical deciduous forests, lower population density.' },
            { text: 'Interpret: Percentage reflects the proportion of land under forest, not total forest resources.', faded: true, blankAnswer: 'Chhattisgarh\'s forest cover percentage is 41.13%. It.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_14_008', title: 'Importance of Forests: Ecological and Economic Value',
          caseStudy: { intro: 'Observe the nearest forested hill or urban park near your city — notice how the air feels cooler, the soil stays moist after rain, and you hear birds/insects.',
            decisions: [{ prompt: 'Name any three ecological services provided by the Western Ghats\' tropical evergreen forests that directly support agriculture in the.', options: [
                { text: 'Correct answer: (1) Watershed regulation', outcome: 'Correct answer: (1) Watershed regulation — forests intercept monsoon rainfall, reduce runoff, and.' },
                { text: 'timber, honey, tourism', outcome: 'Not quite — Students think "economic value of forests = timber + marketable NTFPs" and treat ecological.', reveals: 'economic-value-of-forests-timber' },
                { text: 'economic value of forests = timber + marketable NTFPs', outcome: 'Not quite — Students think "economic value of forests = timber + marketable NTFPs" and treat ecological.', reveals: 'economic-value-of-forests-timber' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_14_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Planning a \'Western Ghats transect\' poster, a student draws tropical evergreen forest across the entire range from Gujarat to Kerala, reasoning: \'The Ghats get heavy rain, and rain decides the forest type.\'',
            decisions: [{ prompt: 'What\'s missing from that vegetation logic?', options: [
                { text: 'Add the other controls: vegetation responds to moisture, temperature AND relief together. Rain shadow splits the Ghats — windward Mahabaleshwar gets 600+ cm and evergreen forest while leeward Pune, 100 km away at the same latitude, gets ~70 cm and thorn scrub. And temperature matters too: Himalayan foothills with high rainfall carry subtropical moist deciduous sal, not evergreen, because winters drop to 5–10°C.', outcome: 'The poster gets redrawn as a mosaic: forests sit in climatic envelopes defined by rainfall, temperature and substrate — not on a rainfall axis alone.' },
                { text: 'Keep the evergreen band — >200 cm rainfall means evergreen, and the Ghats qualify.', outcome: 'Only the windward side qualifies: the leeward rain shadow drops below 100 cm, and drought-deciduousness appears wherever a moisture deficit exists.', reveals: 'rainfall-alone-decides-forest' },
                { text: 'Widen the rule instead — any lush green cover, including city parks and orchards, counts as natural vegetation.', outcome: 'Natural vegetation means self-grown, long-undisturbed communities adapted to the site; planted parks and orchards are neither natural nor climax vegetation.', reveals: 'green-cover-is-natural-vegetation' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_14_008', title: 'You made it',
          caseStudy: { intro: 'Vegetation is climate made visible — give a place 200 rain-free centimetres and it will tell you which biome it is.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_14_007', difficulty: 'standard',
          question: 'Forest cover in India refers to all lands more than one hectare in area with.',
          hint: 'If stuck, revisit the climatic requirements of each forest type (evergreen, deciduous.',
          misconception: 'Students often confuse \'forest cover\' (satellite-based canopy density >10%) with \'recorded forest area\' (legally.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Forest cover in India refers to all lands more than one hectare in area with a tree',
                  options: ['Forest cover in India refers to all lands more than one hectare in area with a tree', 'Natural vegetation refers to plant communities that have grown naturally without human', 'Tropical Evergreen Forests are dense, multi-layered forests occurring in regions', 'Tropical Deciduous Forests are the most widespread forest type in India, occurring in'],
                  hint: 'If stuck, revisit the climatic requirements of each forest type (evergreen, deciduous, thorn.',
                  misconception: 'Students often confuse \'forest cover\' (satellite-based canopy density >10%) with \'recorded forest area\' (legally notified forest land).' }
          ],
            remediations: { 'students-often-confuse-forest-cover': { steps: ['Show the ISFR 2021 table of \'Recorded Forest Area\' vs \'Forest Cover\' for a few states (e.g., Madhya Pradesh, Arunachal.', 'Have students calculate the difference and discuss why recorded forest area can be larger than forest cover.', 'Use a map overlay of population density and forest cover to visualize the inverse relationship.', 'Assign a short writing task: "Explain why a state with 90% recorded forest area might have only 60% forest cover."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_14_008', difficulty: 'standard',
          question: 'Forests are complex ecosystems comprising diverse biotic communities (trees.',
          hint: 'Revisit c11_geo_cbse_14_007 (Forest Cover Distribution) and map each forest type to its.',
          misconception: 'Students think "economic value of forests = timber + marketable NTFPs" and treat ecological services as "free bonuses".',
          parts: [
                { id: 'a', prompt: 'Name any three ecological services provided by the Western Ghats\' tropical evergreen forests that directly support agriculture in the Peninsular plains.', answer: 'Correct answer: (1) Watershed regulation',
                  options: ['Correct answer: (1) Watershed regulation', 'timber, honey, tourism', 'economic value of forests = timber + marketable NTFPs', 'free bonuses'],
                  hint: 'Revisit c11_geo_cbse_14_007 (Forest Cover Distribution) and map each forest type to its dominant.',
                  misconception: 'Students think "economic value of forests = timber + marketable NTFPs" and treat ecological services as "free bonuses".' },
                { id: 'b', prompt: 'A 500 ha patch of tropical moist deciduous forest in Chhattisgarh is proposed for conversion to teak plantation.', answer: 'Step 1: Convert carbon to CO₂e: 5 tC × 44/12 = 18.33 tCO₂e/ha/yr',
                  options: ['Step 1: Convert carbon to CO₂e: 5 tC × 44/12 = 18.33 tCO₂e/ha/yr', 'economic value of forests = timber + marketable NTFPs', 'free bonuses'],
                  hint: 'Revisit c11_geo_cbse_14_007 (Forest Cover Distribution) and map each forest type to its dominant.',
                  misconception: 'Students think "economic value of forests = timber + marketable NTFPs" and treat ecological services as "free bonuses".' },
                { id: 'c', prompt: 'Compare the ecological-economics trade-off in two scenarios: (A) Selective logging in Arunachal Pradesh\'s subtropical forests vs (B) Clear-felling for tea.', answer: 'Scenario B causes irreversible option value loss',
                  options: ['Scenario B causes irreversible option value loss', 'economic value of forests = timber + marketable NTFPs', 'free bonuses'],
                  hint: 'Revisit c11_geo_cbse_14_007 (Forest Cover Distribution) and map each forest type to its dominant.',
                  misconception: 'Students think "economic value of forests = timber + marketable NTFPs" and treat ecological services as "free bonuses".' }
          ],
            remediations: { 'economic-value-of-forests-timber': { steps: ['Take a toposheet of a forested watershed (e.g., Survey of India 1:50,000 sheet of a Western Ghats catchment).', 'Use ISFR data to find forest cover change in that catchment over 10 years.', 'Correlate with city\'s water supply records (summer shortage days, siltation in reservoir).', 'Calculate avoided cost: if forest loss caused 20% reservoir capacity reduction, estimate dredging cost = ecological.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_14_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "economic value of forests = timber + marketable NTFPs" and treat ecological services as "free bonuses".',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "India\'s forest cover has increased from 21.3% (2013) to 24.6% (2023) per ISFR, so the ecological and economic value of forests has.', answer: 'Flaw 1: **Plantations ≠ natural forests**',
                  options: ['Flaw 1: **Plantations ≠ natural forests**', 'economic value of forests = timber + marketable NTFPs', 'free bonuses'],
                  hint: 'Revisit c11_geo_cbse_14_007 (Forest Cover Distribution) and map each forest type to its dominant.',
                  misconception: 'Students think "economic value of forests = timber + marketable NTFPs" and treat ecological services as "free bonuses".' },
                { id: 'b', prompt: 'Design a **payment for ecosystem services (PES)** scheme for a 200 ha community-managed forest in Uttarakhand\'s middle Himalaya that supplies drinking water.', answer: 'which ecological service is monetized, (',
                  options: ['which ecological service is monetized, (', 'government pays villagers to plant trees', 'economic value of forests = timber + marketable NTFPs', 'free bonuses'],
                  hint: 'Revisit c11_geo_cbse_14_007 (Forest Cover Distribution) and map each forest type to its dominant.',
                  misconception: 'Students think "economic value of forests = timber + marketable NTFPs" and treat ecological services as "free bonuses".' }
          ],
            remediations: { 'economic-value-of-forests-timber': { steps: ['Take a toposheet of a forested watershed (e.g., Survey of India 1:50,000 sheet of a Western Ghats catchment).', 'Use ISFR data to find forest cover change in that catchment over 10 years.', 'Correlate with city\'s water supply records (summer shortage days, siltation in reservoir).', 'Calculate avoided cost: if forest loss caused 20% reservoir capacity reduction, estimate dredging cost = ecological.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
