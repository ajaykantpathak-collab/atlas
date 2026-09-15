import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hist_ch03_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hist_ch03_p2: SimDef = {
    id: 'v3_c10_hist_ch03_p2',
    title: 'Making of a Global World · Part 2/2',
    subtitle: 'Trace how trade, food and disease built one connected world',
    classLevel: 10, subject: 'history', topic: 'Making of a Global World · Part 2/2',
    chapters: ['c10_hist_ch03'],
    nodeIds: ['c10_hist_cbse_03_007', 'c10_hist_cbse_03_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a trader\'s apprentice crossing ancient routes', intro: 'Your caravan carries silk and spices, but the real cargo is invisible — ideas, faiths and microbes hitching a ride. You are travelling the network that made the world global centuries before the word existed.', goal: 'Understand the Silk Routes, the Columbian Exchange, and how trade, migration and disease forged the modern global world.' },
    discovery: {
        question: 'Long before airplanes or the internet, Chinese silk reached Rome, Buddhism walked into China, and the humble potato crossed an ocean to change Indian kitchens forever. What made all this movement possible centuries ago?',
        options: ['The Silk Routes — a shifting network of land and sea paths carrying goods, religions, technologies and even diseases across Afro-Eurasia', 'A single paved highway built by one empire from China to Rome', 'Viking longships that traded directly with India', 'Camel post offices that delivered parcels door to door'],
        answer: 'The Silk Routes — a shifting network of land and sea paths carrying goods, religions, technologies and even diseases across Afro-Eurasia',
        hook: 'The \'Silk Road\' was never one road and carried far more than silk — faiths, gunpowder, paper, plagues. Globalisation didn\'t start with the internet; it started with caravans and monsoon winds.',
    },
    teaching: [
        { title: 'Impact of Globalisation on Developing Countries', text: 'Globalisation\'s impact on developing countries refers to the uneven economic, social, and political consequences experienced by former colonies and low-income nations from the 1970s onward, as they.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hist_cbse_03_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Travel three thousand years of connection: ride the Silk Routes, sail with the monsoon winds, watch the Americas feed and plague the Old World, and see how indenture rebuilt empire\'s workforce.',
        labels: ['Impact of Globalisation', 'Migration and the Shaping'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_hist_cbse_03_007', title: 'Impact of Globalisation on Developing Countries',
          caseStudy: { intro: 'Imagine you buy a smartphone assembled in Vietnam with chips from Taiwan, designed in California, and sold in Mumbai — all coordinated by a company.',
            decisions: [{ prompt: 'What was the primary condition imposed by the IMF and World Bank on developing countries seeking loans during the 1980s debt crisis?', options: [
                { text: 'The primary condition was Structural Adjustment Programmes (SAPs) requiring', outcome: 'The primary condition was Structural Adjustment Programmes (SAPs) requiring privatisation, trade.' },
                { text: 'they required higher tariffs to protect local industries', outcome: 'Not quite — Students think "globalisation = free trade benefits everyone equally" and write that developing.', reveals: 'globalisation-free-trade-benefits-everyone' },
                { text: 'globalisation = free trade benefits everyone equally', outcome: 'Not quite — Students think "globalisation = free trade benefits everyone equally" and write that developing.', reveals: 'globalisation-free-trade-benefits-everyone' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_03_008', title: 'Migration and the Shaping of the Modern World',
          caseStudy: { intro: 'Imagine you\'re at a Diwali celebration in Trinidad or a Thaipusam festival in Malaysia — the vibrant Indian traditions you see there exist because 150 years.',
            decisions: [{ prompt: 'What was the primary legal mechanism that replaced slavery in British colonies after 1834, and what was the typical contract duration for.', options: [
                { text: 'The indentured labor system replaced slavery after 1834, with contracts typically lasting', outcome: 'The indentured labor system replaced slavery after 1834, with contracts typically lasting 5 years.' },
                { text: 'slavery continued', outcome: 'Not quite — Students believe indentured migration was primarily driven by "poverty in India" — a monocausal.', reveals: 'indentured-migration-was-primarily-driven' },
                { text: 'contracts were for 1 year', outcome: 'Not quite — Students believe indentured migration was primarily driven by "poverty in India" — a monocausal.', reveals: 'indentured-migration-was-primarily-driven' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At dinner, a child insists that aloo tikki and chilli paneer are \'purely Indian, they\'ve always been here.\' An uncle who teaches history smiles and asks where the potato and the chilli actually came from.',
            decisions: [{ prompt: 'What does the plate reveal about the making of a global world?', options: [
                { text: 'That global exchange shaped even \'traditional\' food — potatoes, chillies, tomatoes and maize all reached India from the Americas through trade routes after the Columbian exchange, and noodles and pasta themselves travelled along older routes. A dish can be authentically Indian today and still be built from global travellers.', outcome: 'The chapter\'s point lands on the dinner table: pre-modern routes like the Silk Routes and later ocean trade moved crops, foods and ideas as surely as silk and silver — globalisation has a long prehistory.' },
                { text: 'The child is right — if a food is traditional in a place, it must have originated there.', outcome: 'Tradition describes how long we\'ve cooked something, not where it began — the humble potato reached every Indian kitchen only after crossing an ocean.', reveals: 'traditional-means-native' },
                { text: 'Foods never really travelled before modern shipping — old trade routes carried only luxuries like silk and spices.', outcome: 'The routes carried far more than luxuries — crops, techniques, religions and even diseases moved along them, reshaping diets and societies at both ends.', reveals: 'old-routes-luxuries-only' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_03_008', title: 'You made it',
          caseStudy: { intro: 'The global world wasn\'t discovered in 1492 — it was stitched together by traders, monks, sailors and slaves long before. Columbus just changed the stitching.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hist_cbse_03_007', difficulty: 'standard',
          question: 'Globalisation\'s impact on developing countries refers to the uneven economic.',
          hint: 'Revisit c10_hist_cbse_03_005 (Bretton Woods) and c10_hist_cbse_03_006 (NIEO).',
          misconception: 'Students think "globalisation = free trade benefits everyone equally" and write that developing countries only needed.',
          parts: [
                { id: 'a', prompt: 'What was the primary condition imposed by the IMF and World Bank on developing countries seeking loans during the 1980s debt crisis?', answer: 'The primary condition was Structural Adjustment Programmes (SAPs) requiring',
                  options: ['The primary condition was Structural Adjustment Programmes (SAPs) requiring', 'they required higher tariffs to protect local industries', 'globalisation = free trade benefits everyone equally', 'open up'],
                  hint: 'Revisit c10_hist_cbse_03_005 (Bretton Woods) and c10_hist_cbse_03_006 (NIEO) — specifically the.',
                  misconception: 'Students think "globalisation = free trade benefits everyone equally" and write that developing countries only needed to "open up" to grow.' }
          ],
            remediations: { 'globalisation-free-trade-benefits-everyone': { steps: ['Re-read the worked example comparing South Korea (state-led, gradual) vs. Zambia (SAP-forced, rapid).', 'Create a two-column table: "Policies allowed for early industrialisers" vs.', 'Watch the 10-min clip "Commanding Heights: The Battle for the World Economy - Episode 2" on the 1982 Mexican debt.', 'Write one paragraph: "If I were Finance Minister of a debt-hit country in 1985, I would/could not follow IMF conditions.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_03_008', difficulty: 'standard',
          question: 'Migration and the Shaping of the Modern World refers to the large-scale.',
          hint: 'If stuck, revisit c10_hist_cbse_03_002 (Nineteenth Century Globalisation: Food and.',
          misconception: 'Students believe indentured migration was primarily driven by "poverty in India" — a monocausal push-factor.',
          parts: [
                { id: 'a', prompt: 'Why did British planters prefer Indian indentured laborers over newly freed African slaves in Caribbean plantations after 1838?', answer: 'Planters preferred Indian laborers',
                  options: ['Planters preferred Indian laborers', 'cheaper wages', 'poverty in India'],
                  hint: 'If stuck, revisit c10_hist_cbse_03_002 (Nineteenth Century Globalisation: Food and Migration).',
                  misconception: 'Students believe indentured migration was primarily driven by "poverty in India" — a monocausal push-factor explanation.' },
                { id: 'b', prompt: 'A historian finds a 1870s shipping register showing 40% women among Indian migrants to Fiji, but only 15% women among migrants to Trinidad in the same period.', answer: 'The difference reflects colonial policy: Fiji\'s government mandated a 40:100',
                  options: ['The difference reflects colonial policy: Fiji\'s government mandated a 40:100', 'cultural preferences', 'poverty in India'],
                  hint: 'If stuck, revisit c10_hist_cbse_03_002 (Nineteenth Century Globalisation: Food and Migration).',
                  misconception: 'Students believe indentured migration was primarily driven by "poverty in India" — a monocausal push-factor explanation.' }
          ],
            remediations: { 'indentured-migration-was-primarily-driven': { steps: ['Re-read the 1873 Indian Emigration Act provisions (in NCERT textbook) — note how it *regulated* rather than.', 'Compare two recruitment posters (primary sources) — one from 1850s Mauritius, one from 1900s Fiji — identifying how.', 'Map the *arkati* network using a diagram: village → district depot → port of embarkation → colonial agent → plantation.', 'Write one paragraph explaining how each node in this chain had financial incentives to *increase* migration — proving.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_03_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe indentured migration was primarily driven by "poverty in India" — a monocausal push-factor.',
          parts: [
                { id: 'a', prompt: 'Construct a historical argument explaining how 19th century Indian migration created the foundations of modern globalisation, using three specific mechanisms.', answer: 'A strong answer identifies: (1) Economic',
                  options: ['A strong answer identifies: (1) Economic', 'poverty in India'],
                  hint: 'If stuck, revisit c10_hist_cbse_03_002 (Nineteenth Century Globalisation: Food and Migration).',
                  misconception: 'Students believe indentured migration was primarily driven by "poverty in India" — a monocausal push-factor explanation.' }
          ],
            remediations: { 'indentured-migration-was-primarily-driven': { steps: ['Re-read the 1873 Indian Emigration Act provisions (in NCERT textbook) — note how it *regulated* rather than.', 'Compare two recruitment posters (primary sources) — one from 1850s Mauritius, one from 1900s Fiji — identifying how.', 'Map the *arkati* network using a diagram: village → district depot → port of embarkation → colonial agent → plantation.', 'Write one paragraph explaining how each node in this chain had financial incentives to *increase* migration — proving.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
