import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hist_ch04_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hist_ch04_p2: SimDef = {
    id: 'v3_c10_hist_ch04_p2',
    title: 'The Age of Industrialisation · Part 2/2',
    subtitle: 'Watch production move from farmhouse loom to steam-powered mill',
    classLevel: 10, subject: 'history', topic: 'The Age of Industrialisation · Part 2/2',
    chapters: ['c10_hist_ch04'],
    nodeIds: ['c10_hist_cbse_04_007', 'c10_hist_cbse_04_008', 'c10_hist_cbse_04_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a merchant\'s agent turned industrial-age observer', intro: 'You supply yarn to cottage weavers across the countryside — until one day a smoky brick building with a steam engine outproduces a hundred villages. Industrialisation has arrived, and nothing stays the same.', goal: 'Explain proto-industrialisation, the rise of factories, and how industrialisation transformed both Britain and colonial India.' },
    discovery: {
        question: 'Decades before steam factories roared, European merchants were already organising mass production — in peasant cottages. Farm families wove cloth at home with merchant-supplied yarn between harvest seasons. Why did merchants choose cottages over factories?',
        options: ['It was proto-industrialisation: cheap rural labour with idle seasons let merchants produce for distant markets without building factories or fighting guilds', 'Peasants were legally forbidden from entering towns', 'Factories hadn\'t been invented anywhere in the world yet', 'Cottage cloth was always higher quality than machine cloth'],
        answer: 'It was proto-industrialisation: cheap rural labour with idle seasons let merchants produce for distant markets without building factories or fighting guilds',
        hook: 'Industrialisation didn\'t begin with the factory whistle — it began quietly in farmhouses, where a loom sat beside the kitchen and a merchant\'s cart collected the finished cloth.',
    },
    teaching: [
        { title: 'Market for Goods: Advertisements, Labels and Consumer Culture', text: 'The topic "Market for Goods: Advertisements, Labels and Consumer Culture" examines how British manufacturers and Indian entrepreneurs created demand for machine-made goods in colonial India (late.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hist_cbse_04_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Follow cloth through the industrial revolution: from peasant cottages under the putting-out system to Manchester\'s steam mills — and then to colonial India, where Indian weavers met machine competition.',
        labels: ['Market for Goods: Advertisements,', 'Workers\' Lives and', 'The Inter-war Years: Boom'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_hist_cbse_04_007', title: 'Market for Goods: Advertisements, Labels and Consumer Culture',
          caseStudy: { intro: 'Imagine walking through a bustling 1920s Bombay market and seeing a cloth bundle with a colorful label showing Goddess Lakshmi showering gold coins — why would.',
            decisions: [{ prompt: 'What was the primary purpose of using images of Hindu deities (like Lakshmi, Saraswati, Krishna) on cloth labels attached.', options: [
                { text: 'The primary purpose was to make foreign machine-made cloth appear culturally familiar,', outcome: 'The primary purpose was to make foreign machine-made cloth appear culturally familiar, auspicious.' },
                { text: 'to respect Indian religion', outcome: 'Not quite — Students think British advertisements in India were "culturally insensitive" or "ignorant of Indian.', reveals: 'british-advertisements-in-india-were' },
                { text: 'because British manufacturers were Hindu', outcome: 'Not quite — Students think British advertisements in India were "culturally insensitive" or "ignorant of Indian.', reveals: 'british-advertisements-in-india-were' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_04_008', title: 'Workers\' Lives and the Peculiarities of Industrial Labour',
          caseStudy: { intro: 'Imagine walking through the narrow lanes of Girangaon in Mumbai or the mill quarters of Ahmedabad — the crumbling chawls, the shared toilets, the sound of the.',
            decisions: [{ prompt: 'What was the primary role of a \'jobber\' (or *mistri*) in recruiting workers for early Indian factories?', options: [
                { text: 'The jobber was a trusted worker (often from the same region/caste) who recruited', outcome: 'The jobber was a trusted worker (often from the same region/caste) who recruited villagers.' },
                { text: 'jobber was a British manager', outcome: 'Not quite — Students believe Indian factory workers were \'just like British workers but poorer\' — they miss.', reveals: 'indian-factory-workers-were-just' },
                { text: 'jobber was a trade union leader', outcome: 'Not quite — Students believe Indian factory workers were \'just like British workers but poorer\' — they miss.', reveals: 'indian-factory-workers-were-just' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_04_009', title: 'The Inter-war Years: Boom and Bust in Industrial Production',
          caseStudy: { intro: 'Imagine your great-grandparents telling you how the price of cotton cloth in your village market suddenly crashed in the early 1930s, ruining weavers but.',
            decisions: [{ prompt: 'What was the immediate trigger for the Great Depression that began in 1929?', options: [
                { text: 'The immediate trigger was the Wall Street Crash of October 1929, when the US stock market', outcome: 'The immediate trigger was the Wall Street Crash of October 1929, when the US stock market collapsed.' },
                { text: 'the end of World War I', outcome: 'Not quite — Students often think the Great Depression affected India only through falling agricultural prices.', reveals: 'the-great-depression-affected-india' },
                { text: 'the Dust Bowl', outcome: 'Not quite — Students often think the Great Depression affected India only through falling agricultural prices.', reveals: 'the-great-depression-affected-india' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_04_007', title: 'A real-world call',
          caseStudy: { intro: 'Industrialisation brought factories, jobs and progress — and child labour, poisoned rivers, and workers losing their craft. It was both a miracle and a disaster, in the same decade.',
            decisions: [{ prompt: 'Was industrialisation progress?', options: [
                { text: 'Yes — the long-run gains outweigh the short-run pain', outcome: 'True in aggregate; but \'short-run pain\' was whole lifetimes — a worker crushed in 1850 didn\'t see the long run.' },
                { text: 'Yes, but the pain was a choice, not a necessity', outcome: 'The sharper answer — industrialisation could have come with protections; it chose speed over workers.' },
                { text: 'Progress is a question for each person it touched', outcome: 'The honest answer — progress measured in GDP looks different than progress measured in a weaver\'s hands.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'An aunt runs a small clothing business: she supplies cloth and designs to neighbourhood women who embroider at home around their other work, then collects the finished pieces and sells them in the city. A cousin scoffs, \'That\'s not real industry — there\'s no factory.\'',
            decisions: [{ prompt: 'What does the history of industrialisation say about the aunt\'s business?', options: [
                { text: 'It closely resembles the putting-out system that industrialised Europe before factories — a merchant supplies raw material and takes the finished product, workers keep flexible hours at home yet depend on the merchant\'s prices and orders. Industry did not begin with factory chimneys; this countryside network was proto-industrialisation, the stage before mechanised production.', outcome: 'The women hold real autonomy over their time but real dependence on the merchant — the same double character the putting-out weavers of England had, which is why the system expanded before factories existed.' },
                { text: 'The cousin is right — industry means machines and factory buildings, so home-based work was never industry.', outcome: 'Factories were the later chapter — for over a century before them, merchant-directed household production was Europe\'s growing industrial system.', reveals: 'industry-equals-factory' },
                { text: 'The aunt\'s workers are independent artisans, since working from home means they control their own production.', outcome: 'Home work hid the dependence — like the putting-out weavers, they did not own the material or choose the price, which made them workers for the merchant rather than free artisans.', reveals: 'home-work-equals-independence' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_04_009', title: 'You made it',
          caseStudy: { intro: 'The factory didn\'t invent industrial labour; it reorganised it. And when machines outproduced hands, entire artisan worlds — including India\'s — paid the price.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hist_cbse_04_007', difficulty: 'standard',
          question: 'The topic "Market for Goods: Advertisements, Labels and Consumer Culture".',
          hint: 'If stuck, revisit c10_hist_cbse_04_005 (especially "Manchester goods in Indian bazaars").',
          misconception: 'Students think British advertisements in India were "culturally insensitive" or "ignorant of Indian traditions" — when.',
          parts: [
                { id: 'a', prompt: 'Explain why British manufacturers chose to print labels showing Indian princes, Maharajas, and Nawabs on their cloth bundles, even though these rulers had lost.', answer: 'British manufacturers used images of Indian royalty on labels',
                  options: ['British manufacturers used images of Indian royalty on labels', 'to honor the princes', 'because the princes owned the factories', 'culturally insensitive'],
                  hint: 'If stuck, revisit c10_hist_cbse_04_005 (especially "Manchester goods in Indian bazaars") and.',
                  misconception: 'Students think British advertisements in India were "culturally insensitive" or "ignorant of Indian traditions" — when in fact, British.' }
          ],
            remediations: { 'british-advertisements-in-india-were': { steps: ['Show the student two actual 1890s cloth labels — one with Krishna playing flute (for Bengal), one with Minakshi (for.', 'Have them read a 1905 Manchester Chamber of Commerce report complaining that "Indian buyers reject cloth without proper.', 'Compare with a 1920s Swadeshi label using Bharat Mata — ask: "Who is using whose visual language now?" This sequence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think British advertisements in India were "culturally insensitive" or "ignorant of Indian traditions" — when.',
          parts: [
                { id: 'a', prompt: 'Evaluate the historian\'s claim: "Advertisements in colonial India did not merely reflect consumer preferences — they actively *created* new desires and.', answer: 'The claim is valid',
                  options: ['The claim is valid', 'ads just showed what people already wanted', 'culturally insensitive', 'ignorant of Indian traditions'],
                  hint: 'If stuck, revisit c10_hist_cbse_04_005 (especially "Manchester goods in Indian bazaars") and.',
                  misconception: 'Students think British advertisements in India were "culturally insensitive" or "ignorant of Indian traditions" — when in fact, British.' }
          ],
            remediations: { 'british-advertisements-in-india-were': { steps: ['Show the student two actual 1890s cloth labels — one with Krishna playing flute (for Bengal), one with Minakshi (for.', 'Have them read a 1905 Manchester Chamber of Commerce report complaining that "Indian buyers reject cloth without proper.', 'Compare with a 1920s Swadeshi label using Bharat Mata — ask: "Who is using whose visual language now?" This sequence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_04_008', difficulty: 'standard',
          question: 'This topic examines the living and working conditions of industrial workers.',
          hint: 'If stuck, revisit c8_hist_ch3_8 (British revenue exploitation) and c10_hist_cbse_04_005.',
          misconception: 'Students believe Indian factory workers were \'just like British workers but poorer\' — they miss that the *structure*.',
          parts: [
                { id: 'a', prompt: 'What was the primary role of a \'jobber\' (or *mistri*) in recruiting workers for early Indian factories?', answer: 'The jobber was a trusted worker (often from the same region/caste) who recruited',
                  options: ['The jobber was a trusted worker (often from the same region/caste) who recruited', 'jobber was a British manager', 'jobber was a trade union leader'],
                  hint: 'If stuck, revisit c8_hist_ch3_8 (British revenue exploitation) and c10_hist_cbse_04_005.',
                  misconception: 'Students believe Indian factory workers were \'just like British workers but poorer\' — they miss that the *structure* of labour was.' },
                { id: 'b', prompt: 'Why did industrial workers in colonial India maintain strong ties to their villages and return seasonally, unlike the permanent urban proletariat in Britain?', answer: 'Workers treated factory wages as supplementary income',
                  options: ['Workers treated factory wages as supplementary income', 'workers preferred village life', 'factories closed in monsoon'],
                  hint: 'If stuck, revisit c8_hist_ch3_8 (British revenue exploitation) and c10_hist_cbse_04_005.',
                  misconception: 'Students believe Indian factory workers were \'just like British workers but poorer\' — they miss that the *structure* of labour was.' },
                { id: 'c', prompt: 'Compare the \'peculiarities of industrial labour\' in India (c. 1900) with the factory labour experience in Britain (c.', answer: '**Recruitment**: India',
                  options: ['**Recruitment**: India', 'India was worse'],
                  hint: 'If stuck, revisit c8_hist_ch3_8 (British revenue exploitation) and c10_hist_cbse_04_005.',
                  misconception: 'Students believe Indian factory workers were \'just like British workers but poorer\' — they miss that the *structure* of labour was.' }
          ],
            remediations: { 'indian-factory-workers-were-just': { steps: ['Re-read the Factory Commission Reports (1890, 1907) excerpts in NCERT — note workers\' testimony about village land and.', 'Draw a two-column table: "Costs borne by worker\'s village household" vs "Costs borne by factory owner".', 'Explain orally: "If the worker\'s family in the village grows rice, the factory owner doesn\'t need to pay for that food.', 'Attempt Diagnostic Question 3 again with this framework.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_04_009', difficulty: 'standard',
          question: 'The Inter-war Years (1919–1939) refer to the period between the two World Wars.',
          hint: 'If stuck, revisit c10_hist_cbse_04_006 (Early Factories in India) and c8_hist_ch3_8.',
          misconception: 'Students often think the Great Depression affected India only through falling agricultural prices, ignoring how.',
          parts: [
                { id: 'a', prompt: 'A historian argues: "The Great Depression hurt Indian industry more than Indian agriculture." Using evidence from the inter-war period, evaluate this claim.', answer: 'The claim is largely incorrect',
                  options: ['The claim is largely incorrect', 'industry suffered more'],
                  hint: 'If stuck, revisit c10_hist_cbse_04_006 (Early Factories in India) and c8_hist_ch3_8 (British.',
                  misconception: 'Students often think the Great Depression affected India only through falling agricultural prices, ignoring how it simultaneously created.' }
          ],
            remediations: { 'the-great-depression-affected-india': { steps: ['Re-read the worked example on the rupee-sterling ratio (Worked Example 2) to see how currency policy transmitted the.', 'Use a two-column table: Column A = British policy action (e.g., "1931: left Gold Standard"), Column B = Indian.', 'Watch the 5-minute clip "India and the Great Depression" from the NCERT official YouTube channel (search.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
