import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch10_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch10_p2: SimDef = {
    id: 'v3_c11_geo_ch10_p2',
    title: 'Climate, Vegetation and Wildlife · Part 2/2',
    subtitle: 'Break the \'latitude decides climate\' habit and meet the monsoon\'s real machinery.',
    classLevel: 11, subject: 'geography', topic: 'Climate, Vegetation and Wildlife · Part 2/2',
    chapters: ['c11_geo_ch10'],
    nodeIds: ['c11_geo_cbse_10_007', 'c11_geo_cbse_10_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a forecaster explaining why two cities share a latitude but not a summer', intro: 'Delhi scorches at 45°C while Shimla stays pleasant — same latitude band, 2,000 metres apart in the sky.', goal: 'Weigh latitude, altitude and distance-from-sea as climate controls and outline the monsoon mechanism.' },
    discovery: {
        question: 'Kanyakumari (8°N) and Bhopal (23°N) both sit in the \'tropical zone\' — so their climates should be similar?',
        options: ['No — coastal Kanyakumari\'s annual range is ~4°C while inland Bhopal\'s is ~18°C; distance-from-sea and altitude override latitude', 'Yes — latitude is the first control, so it decides everything', 'Yes — both get the same monsoon', 'No — only because Bhopal is farther north'],
        answer: 'No — coastal Kanyakumari\'s annual range is ~4°C while inland Bhopal\'s is ~18°C; distance-from-sea and altitude override latitude',
        hook: 'Textbooks list latitude first, so students crown it king — but Shimla\'s May cool and Mumbai\'s mild January are won by altitude and the sea.',
    },
    teaching: [
        { title: 'Wildlife of India: Distribution and Major Species', text: 'Wildlife of India refers to the diverse assemblage of native animal species (fauna) distributed across the country\'s varied bio-geographic zones, shaped by the interplay of climate, vegetation.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Use the 6.5°C/km lapse rate to price Shimla\'s coolness, then track the ITCZ\'s northward jump and the jet stream that gates the monsoon.',
        labels: ['Wildlife of India: Distribution', 'Impact of Climate'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_10_007', title: 'Wildlife of India: Distribution and Major Species',
          caseStudy: { intro: 'Begin by asking students to recall the vegetation map from the previous node (c11_geo_cbse_10_006) — notice how Tropical Evergreen forests of the Western Ghats.',
            decisions: [{ prompt: 'Name the bio-geographic zone that houses the only wild population of the Asiatic Lion (Panthera leo persica) and state the specific forest.', options: [
                { text: 'Correct answer: The Asiatic Lion is restricted to the **Gujarat-Rajputana bio-geographic', outcome: 'Correct answer: The Asiatic Lion is restricted to the **Gujarat-Rajputana bio-geographic zone**.' },
                { text: 'Western Ghats zone', outcome: 'Not quite — **Misconception:** "Wildlife distribution in India follows state boundaries or political maps.', reveals: 'misconception-wildlife-distribution-in-india' },
                { text: 'Tropical Evergreen forest', outcome: 'Not quite — **Misconception:** "Wildlife distribution in India follows state boundaries or political maps.', reveals: 'misconception-wildlife-distribution-in-india' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_10_008', title: 'Impact of Climate on Indian Agriculture and Economy',
          caseStudy: { intro: 'Observe your local mandi or grocery store in June-July: vegetable prices spike, tomato prices surge, and news headlines track "monsoon progress" daily.',
            decisions: [{ prompt: 'Define "rainfed agriculture" in the Indian context and state the approximate percentage of net sown area that is rainfed as per latest.', options: [
                { text: 'Rainfed agriculture refers to farming systems dependent entirely on rainfall for soil', outcome: 'Rainfed agriculture refers to farming systems dependent entirely on rainfall for soil moisture.' },
                { text: 'rainfed', outcome: 'Not quite — Students believe "good monsoon = good agriculture GDP everywhere" and "bad monsoon = bad.', reveals: 'good-monsoon-good-agriculture-gdp' },
                { text: 'dryland', outcome: 'Not quite — Students believe "good monsoon = good agriculture GDP everywhere" and "bad monsoon = bad.', reveals: 'good-monsoon-good-agriculture-gdp' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a weather-lab project, a classmate predicts: \'Kanyakumari and Bhopal are both tropical, so their climates must be similar. And the monsoon arrives when the ITCZ slowly drifts north with the sun — onset should be gradual.\'',
            decisions: [{ prompt: 'Why do both predictions fail?', options: [
                { text: 'Latitude isn\'t the boss everywhere: Bhopal (inland, elevated) swings ~18°C across the year while coastal Kanyakumari varies ~4°C — altitude and distance-from-sea override latitude. And monsoon onset is abrupt (June 1 ± 5 days in Kerala) because the subtropical westerly jet jumps north of the Himalayas like a gatekeeper — a coupled ocean-atmosphere response, not a smooth ITCZ drift.', outcome: 'Climate becomes a vector sum — latitude, altitude, continentality — and the monsoon a triggered switch, not a slow slide.' },
                { text: 'Back the latitude argument — textbooks list it first, so it\'s the primary control everywhere.', outcome: 'Listing order isn\'t a law: same-latitude pairs like Mumbai vs Nagpur diverge sharply on range because maritime moderation and continentality act simultaneously.', reveals: 'latitude-is-primary-everywhere' },
                { text: 'Keep the gradual-onset model — the ITCZ moves with the sun, and the sun moves gradually.', outcome: 'The westerly jet\'s sudden northward jump is the missing mechanism — that\'s why onset is a burst around June 1, not a creep.', reveals: 'monsoon-is-gradual-itcz-drift' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_10_008', title: 'You made it',
          caseStudy: { intro: 'Latitude, altitude, continentality — the climate you feel is a three-way negotiation, and latitude doesn\'t always win.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_10_007', difficulty: 'standard',
          question: 'Wildlife of India refers to the diverse assemblage of native animal species.',
          hint: 'If stuck, revisit **c11_geo_cbse_10_006 (Natural Vegetation)** for the vegetation-climate.',
          misconception: '**Misconception:** "Wildlife distribution in India follows state boundaries or political maps — e.g., \'Tigers are.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Wildlife of India refers to the diverse assemblage of native animal species (fauna)',
                  options: ['Wildlife of India refers to the diverse assemblage of native animal species (fauna)', 'India\'s climate is controlled by three primary physiographic factors: **latitude** (8°4\'N', 'The Indian monsoon is a seasonal reversal of wind systems driven by differential heating', 'The four seasons of India—Winter (December-February), Summer (March-May), Southwest'],
                  hint: 'If stuck, revisit **c11_geo_cbse_10_006 (Natural Vegetation)** for the vegetation-climate map, and.',
                  misconception: '**Misconception:** "Wildlife distribution in India follows state boundaries or political maps — e.g., \'Tigers are in Madhya Pradesh, Lions.' }
          ],
            remediations: { 'misconception-wildlife-distribution-in-india': { steps: ['**Map Overlay Exercise:** Give students a blank outline map of India.', 'Layer 1: Draw 10 Bio-geographic Zones (Rodgers & Panwar).', 'Layer 2: Plot Tiger Reserves (54 as of 2024) — observe clustering in zones (Central India, Western Ghats.', 'Layer 3: Draw *corridors* (not PA boundaries) using river valleys and forest contiguity — e.g., connect Kanha to Pench.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_10_008', difficulty: 'standard',
          question: 'The impact of climate on Indian agriculture and economy refers to the.',
          hint: 'If stuck, revisit c11_geo_cbse_10_004 (rainfall distribution) to master spatial CV and.',
          misconception: 'Students believe "good monsoon = good agriculture GDP everywhere" and "bad monsoon = bad agriculture GDP everywhere.".',
          parts: [
                { id: 'a', prompt: 'A district in Vidarbha (Maharashtra) receives 900 mm annual rainfall, 85% during June-September. Its dominant soil is Vertisol (black cotton soil).', answer: 'LGP = 123 days (June 15 to October 15 inclusive)',
                  options: ['LGP = 123 days (June 15 to October 15 inclusive)', 'good monsoon = good agriculture GDP everywhere', 'bad monsoon = bad agriculture GDP everywhere'],
                  hint: 'If stuck, revisit c11_geo_cbse_10_004 (rainfall distribution) to master spatial CV and rainy days.',
                  misconception: 'Students believe "good monsoon = good agriculture GDP everywhere" and "bad monsoon = bad agriculture GDP everywhere." In reality, the 2009.' },
                { id: 'b', prompt: 'Compare the climate-agriculture-economic transmission mechanism in two contrasting regions: (a) Punjab (irrigated, rice-wheat system) and (b) Rayalaseema.', answer: 'Punjab: 99% irrigated via canals/tubewells',
                  options: ['Punjab: 99% irrigated via canals/tubewells', 'good monsoon = good agriculture GDP everywhere', 'bad monsoon = bad agriculture GDP everywhere'],
                  hint: 'If stuck, revisit c11_geo_cbse_10_004 (rainfall distribution) to master spatial CV and rainy days.',
                  misconception: 'Students believe "good monsoon = good agriculture GDP everywhere" and "bad monsoon = bad agriculture GDP everywhere." In reality, the 2009.' }
          ],
            remediations: { 'good-monsoon-good-agriculture-gdp': { steps: ['Plot district-level rainfall anomaly map (IMD grid data) for a drought year (2002, 2009, 2014, 2015) and a flood year.', 'Overlay net irrigated area percentage (from Agricultural Census) on same map.', 'Identify 3 districts with "high rainfall deficit + low irrigation" (e.g., Anantapur, Jhabua, Kalahandi) and 3 with.', 'Compare their agricultural GDP growth rates (from State Statistical Abstracts) for those years.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
