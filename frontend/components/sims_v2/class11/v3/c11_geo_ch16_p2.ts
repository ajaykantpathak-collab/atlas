import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch16_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch16_p2: SimDef = {
    id: 'v3_c11_geo_ch16_p2',
    title: 'Population · Part 2/2',
    subtitle: 'Read growth rates that fall while the population climbs — and density measured the honest way.',
    classLevel: 11, subject: 'geography', topic: 'Population · Part 2/2',
    chapters: ['c11_geo_ch16'],
    nodeIds: ['c11_geo_cbse_16_007', 'c11_geo_cbse_16_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a demographer reading a night-time satellite image', intro: 'The Gangetic plain glows; the Thar stays dark. Physical geography set the stage — but the numbers still need careful reading.', goal: 'Calculate density and decadal growth correctly and explain India\'s four growth phases.' },
    discovery: {
        question: 'India\'s decadal growth slid from 23.9% to 17.7% — so the population is finally shrinking?',
        options: ['No — a slower percentage on a larger base still adds crores; the growth rate fell, the population didn\'t', 'Yes — a falling rate means falling numbers', 'Yes — 17.7% is below replacement', 'No — but only because the census missed people'],
        answer: 'No — a slower percentage on a larger base still adds crores; the growth rate fell, the population didn\'t',
        hook: '1921\'s \'year of the great divide\' wasn\'t a birth-rate story either — it was deaths finally retreating that changed the curve.',
    },
    teaching: [
        { title: 'National Population Policy of India (2000): Objectives', text: 'The National Population Policy (NPP) 2000 is a government of India policy framework that sets immediate, medium-term, and long-term goals to address population stabilization through voluntary and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_16_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Compute decadal growth from 1951-61 census figures, place it in the right phase, then measure a district\'s physiological density against the national 450.',
        labels: ['National Population Policy', 'Population Composition: Religion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_16_007', title: 'National Population Policy of India (2000): Objectives',
          caseStudy: { intro: 'Observe a newspaper headline about India\'s population surpassing China in 2023.',
            decisions: [{ prompt: 'State the long-term objective of the National Population Policy 2000 and the target year set for its achievement.', options: [
                { text: 'The long-term objective is to achieve a stable population by 2045, consistent with the', outcome: 'The long-term objective is to achieve a stable population by 2045, consistent with the requirements.' },
                { text: 'stabilization by 2010', outcome: 'Not quite — Students often think NPP 2000 set a two-child norm for the entire country.', reveals: 'npp-2000-set-a-two' },
                { text: 'NPP 2000 set a two-child norm for the entire country', outcome: 'Not quite — Students often think NPP 2000 set a two-child norm for the entire country.', reveals: 'npp-2000-set-a-two' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_16_008', title: 'Population Composition: Religion and Language in India',
          scaffold: { problem: 'A student is given the 2011 Census data for Kerala: Total population = 33,406,061; Hindu = 18,282,492; Muslim = 8,873,472; Christian.',
            steps: [
            { text: 'Identify the total population and the population of each religious group from the given data.' },
            { text: 'Apply the percentage formula for each group: (Group population / Total population) × 100.' },
            { text: 'Calculate Hindu% = (18,282,492 / 33,406,061) × 100 = 54.7%; Muslim% = (8,873,472 / 33,406,061) × 100 = 26.6%.' },
            { text: 'Compare with national averages (Hindu 79.8%, Muslim 14.2%, Christian 2.3%).' },
            { text: 'Interpret: Kerala has a much higher share of Muslims and Christians due to historical trade contacts (Arab traders.', faded: true, blankAnswer: 'Hindu 54.7%, Muslim 26.6%, Christian 18.4%. Kerala\'s.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_16_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a data-lab class, a teammate looks at India\'s population graph and announces two findings: \'Cherrapunji gets record rainfall but few people — floods must keep them away. And India\'s growth rate fell from 23.9% to 17.7%, so the population is finally shrinking.\'',
            decisions: [{ prompt: 'What corrections does the analysis need?', options: [
                { text: 'Fix both readings: Cherrapunji\'s low density comes from steep, dissected limestone terrain with thin soils that limit farming and infrastructure — not rainfall volume. And a falling growth RATE still means a growing population — we\'re adding more slowly, not shrinking. Also note the 1921 \'great divide\' was driven by mortality (influenza, famine), not a birth-rate drop.', outcome: 'The graph now reads correctly: physical factors set potential carrying capacity, human factors realise it — and rate-decline ≠ absolute decline.' },
                { text: 'Accept the flood explanation — too much rain makes a place unliveable, that\'s why it\'s empty.', outcome: 'Rain itself isn\'t the deterrent: high-rainfall Kerala is dense; it\'s Cherrapunji\'s rugged relief and thin soil that cap settlement.', reveals: 'high-rain-means-low-density' },
                { text: 'Confirm the shrinking claim — a lower percentage growth means the total is going down.', outcome: 'A classic board-exam error: declining growth rate means the increase is slowing; the absolute population still rises every decade.', reveals: 'growth-rate-decline-means-shrinking' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_16_008', title: 'You made it',
          caseStudy: { intro: 'Sixty percent of Indians crowd onto a quarter of the land — distribution is written by water, soil and flatness long before policy.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_16_007', difficulty: 'standard',
          question: 'The National Population Policy (NPP) 2000 is a government of India policy.',
          hint: 'Review the demographic indicators (TFR, IMR, MMR) from c11_geo_cbse_16_003 and the Stage.',
          misconception: 'Students often think NPP 2000 set a two-child norm for the entire country.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The National Population Policy (NPP) 2000 is a government of India policy framework that',
                  options: ['The National Population Policy (NPP) 2000 is a government of India policy framework that', 'Population distribution refers to the spatial pattern of where people live across India\'s', 'Population growth trends', 'Population composition refers to the structural characteristics of a population including'],
                  hint: 'Review the demographic indicators (TFR, IMR, MMR) from c11_geo_cbse_16_003 and the Stage 3 features.',
                  misconception: 'Students often think NPP 2000 set a two-child norm for the entire country.' }
          ],
            remediations: { 'npp-2000-set-a-two': { steps: ['Use a two-column table: Column A lists NPP 2000\'s immediate objectives (unmet need, healthcare, personnel); Column.', 'Have students match each Indian objective to the Chinese measure it deliberately avoids.', 'Then ask: "Which column respects reproductive rights?" This contrast clarifies the voluntary nature of NPP 2000.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_16_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think NPP 2000 set a two-child norm for the entire country.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The National Population Policy 2000 failed because India\'s population continued to grow after 2000."', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'NPP 2000 set a two-child norm for the entire country'],
                  hint: 'Review the demographic indicators (TFR, IMR, MMR) from c11_geo_cbse_16_003 and the Stage 3 features.',
                  misconception: 'Students often think NPP 2000 set a two-child norm for the entire country.' }
          ],
            remediations: { 'npp-2000-set-a-two': { steps: ['Use a two-column table: Column A lists NPP 2000\'s immediate objectives (unmet need, healthcare, personnel); Column.', 'Have students match each Indian objective to the Chinese measure it deliberately avoids.', 'Then ask: "Which column respects reproductive rights?" This contrast clarifies the voluntary nature of NPP 2000.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_16_008', difficulty: 'standard',
          question: 'Population composition by religion and language refers to the spatial and.',
          hint: 'If stuck, review the Census of India 2011 primary census abstract for religion and.',
          misconception: 'Students often think that "Hindi is the national language of India" and that most Indians speak Hindi as their mother.',
          parts: [
                { id: 'a', prompt: 'Using the 2011 Census data, calculate the approximate number of Muslims in India if the total population was 1.21 billion. Show your working.', answer: 'Step 1: Total population = 1.21 billion (1,210,000,000)',
                  options: ['Step 1: Total population = 1.21 billion (1,210,000,000)', 'Hindi is the national language of India'],
                  hint: 'If stuck, review the Census of India 2011 primary census abstract for religion and language.',
                  misconception: 'Students often think that "Hindi is the national language of India" and that most Indians speak Hindi as their mother tongue.' }
          ],
            remediations: { 'hindi-is-the-national-language': { steps: ['Show the student the 2011 Census language data table (mother tongue vs. language grouping).', 'Have them map the top 5 languages by percentage on an outline map of India.', 'Overlay the Eighth Schedule languages and discuss why some widely spoken languages (e.g., Bhojpuri, Rajasthani) are not.', 'Use the religious composition map to identify districts where Muslims > 50% and correlate with historical.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
