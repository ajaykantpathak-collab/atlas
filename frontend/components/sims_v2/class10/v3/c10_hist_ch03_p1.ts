import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hist_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hist_ch03_p1: SimDef = {
    id: 'v3_c10_hist_ch03_p1',
    title: 'Making of a Global World · Part 1/2',
    subtitle: 'Trace how trade, food and disease built one connected world',
    classLevel: 10, subject: 'history', topic: 'Making of a Global World · Part 1/2',
    chapters: ['c10_hist_ch03'],
    nodeIds: ['c10_hist_cbse_03_001', 'c10_hist_cbse_03_002', 'c10_hist_cbse_03_003', 'c10_hist_cbse_03_004', 'c10_hist_cbse_03_005', 'c10_hist_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a trader\'s apprentice crossing ancient routes', intro: 'Your caravan carries silk and spices, but the real cargo is invisible — ideas, faiths and microbes hitching a ride. You are travelling the network that made the world global centuries before the word existed.', goal: 'Understand the Silk Routes, the Columbian Exchange, and how trade, migration and disease forged the modern global world.' },
    discovery: {
        question: 'Long before airplanes or the internet, Chinese silk reached Rome, Buddhism walked into China, and the humble potato crossed an ocean to change Indian kitchens forever. What made all this movement possible centuries ago?',
        options: ['The Silk Routes — a shifting network of land and sea paths carrying goods, religions, technologies and even diseases across Afro-Eurasia', 'A single paved highway built by one empire from China to Rome', 'Viking longships that traded directly with India', 'Camel post offices that delivered parcels door to door'],
        answer: 'The Silk Routes — a shifting network of land and sea paths carrying goods, religions, technologies and even diseases across Afro-Eurasia',
        hook: 'The \'Silk Road\' was never one road and carried far more than silk — faiths, gunpowder, paper, plagues. Globalisation didn\'t start with the internet; it started with caravans and monsoon winds.',
    },
    teaching: [
        { title: 'The Pre-Modern World: Silk Routes, Trade and Cultural Exchange', text: 'The Pre-Modern World refers to the period from roughly 300 BCE to 1500 CE when the Silk Routes — a vast network of interconnected land and maritime trade routes linking China, India, Central Asia.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hist_cbse_03_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Travel three thousand years of connection: ride the Silk Routes, sail with the monsoon winds, watch the Americas feed and plague the Old World, and see how indenture rebuilt empire\'s workforce.',
        labels: ['The Pre-Modern World: Silk', 'Nineteenth Century Globalisation: Food', 'Late Nineteenth Century: Trade,', 'The Inter-war Economy', 'Rebuilding the World Economy', 'Globalisation and the New'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_hist_cbse_03_001', title: 'The Pre-Modern World: Silk Routes, Trade and Cultural Exchange',
          caseStudy: { intro: 'Imagine you are standing at the Sanchi Stupa in Madhya Pradesh — the stone railings depict Greek-style floral patterns, the Buddha wears a toga-like robe.',
            decisions: [{ prompt: 'Name the two major mountain passes in the Hindu Kush that connected the Indian subcontinent to the Central Asian Silk Routes, and identify.', options: [
                { text: 'The Khyber Pass and Bolan Pass were the two major Himalayan gateways', outcome: 'The Khyber Pass and Bolan Pass were the two major Himalayan gateways; Taxila (Takshashila).' },
                { text: 'Silk Route', outcome: 'Not quite — Students believe the "Silk Route" was a single, well-marked road stretching from China to Rome.', reveals: 'the-silk-route-was-a' },
                { text: 'the Nathu La or Shipki La passes, or identifying Pataliputra as the gateway', outcome: 'Not quite — Students believe the "Silk Route" was a single, well-marked road stretching from China to Rome.', reveals: 'the-silk-route-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_03_002', title: 'Nineteenth Century Globalisation: Food and Migration Patterns',
          caseStudy: { intro: 'Imagine you are eating a roti made from wheat that may have been grown in Punjab, shipped on a British steamer, and priced by a London market in 1880 — how did.',
            decisions: [{ prompt: 'Name the technological innovation that made it possible to transport perishable food (like meat and butter) across oceans in the late 19th.', options: [
                { text: 'Refrigerated ships (or "reefers")', outcome: 'Refrigerated ships (or "reefers") — first successfully used for meat from America and Australia.' },
                { text: 'steamships', outcome: 'Not quite — Students often think indentured labourers were "voluntary migrants" who freely chose to go abroad.', reveals: 'indentured-labourers-were-voluntary-migrants' },
                { text: 'railways', outcome: 'Not quite — Students often think indentured labourers were "voluntary migrants" who freely chose to go abroad.', reveals: 'indentured-labourers-were-voluntary-migrants' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_03_003', title: 'Late Nineteenth Century: Trade, Conquest and Colonisation',
          caseStudy: { intro: 'Imagine you are visiting the Victoria Memorial in Kolkata or the Gateway of India in Mumbai — both built in the early 1900s to celebrate British imperial.',
            decisions: [{ prompt: 'What was the primary economic motive driving the "Scramble for Africa" among European powers in the 1880s and 1890s?', options: [
                { text: 'The primary motive was the need for raw materials (rubber, palm oil, minerals) and', outcome: 'The primary motive was the need for raw materials (rubber, palm oil, minerals) and guaranteed.' },
                { text: 'spreading Christianity', outcome: 'Not quite — Students believe "colonialism brought modern infrastructure (railways, canals, ports) which.', reveals: 'colonialism-brought-modern-infrastructure-railwa' },
                { text: 'ending slavery', outcome: 'Not quite — Students believe "colonialism brought modern infrastructure (railways, canals, ports) which.', reveals: 'colonialism-brought-modern-infrastructure-railwa' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_03_004', title: 'The Inter-war Economy: The Great Depression of 1929',
          caseStudy: { intro: 'Imagine your great-grandparents telling you how a bumper wheat harvest in Punjab in 1931 fetched half the price of 1928, yet land revenue had to be paid.',
            decisions: [{ prompt: 'In which month and year did the US stock market crash that triggered the Great Depression occur?', options: [
                { text: 'October 1929 (specifically 24 October "Black Thursday" and 29 October "Black Tuesday")', outcome: 'October 1929 (specifically 24 October "Black Thursday" and 29 October "Black Tuesday").' },
                { text: 'after WWI', outcome: 'Not quite — Students believe the Great Depression hurt India only because "trade declined." They miss the.', reveals: 'the-great-depression-hurt-india' },
                { text: 'trade declined', outcome: 'Not quite — Students believe the Great Depression hurt India only because "trade declined." They miss the.', reveals: 'the-great-depression-hurt-india' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_03_005', title: 'Rebuilding the World Economy: The Bretton Woods Institutions',
          caseStudy: { intro: 'Imagine you are an Indian farmer in 1947 — your cotton must be sold abroad, but every country has a different currency value that keeps changing unpredictably.',
            decisions: [{ prompt: 'In which year and location was the Bretton Woods Conference held, and which two major institutions were created there?', options: [
                { text: 'The Bretton Woods Conference was held in July 1944 at Bretton Woods, New Hampshire, USA,', outcome: 'The Bretton Woods Conference was held in July 1944 at Bretton Woods, New Hampshire, USA, and.' },
                { text: '1945 at Geneva', outcome: 'Not quite — Students often believe the Bretton Woods system was a "gold standard" where all currencies were.', reveals: 'the-bretton-woods-system-was' },
                { text: 'created the WTO', outcome: 'Not quite — Students often believe the Bretton Woods system was a "gold standard" where all currencies were.', reveals: 'the-bretton-woods-system-was' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_03_006', title: 'Globalisation and the New International Economic Order',
          caseStudy: { intro: 'Imagine you are buying a smartphone assembled in China, with chips from Taiwan, software from the USA, and rare earth minerals from Africa — all coordinated.',
            decisions: [{ prompt: 'What event in 1971 marked the definitive end of the Bretton Woods system of fixed exchange rates?', options: [
                { text: ': US President Richard Nixon\'s unilateral suspension of the dollar\'s convertibility into', outcome: 'The correct answer is: US President Richard Nixon\'s unilateral suspension of the dollar\'s.' },
                { text: 'the 1973 oil crisis', outcome: 'Not quite — Students often think "globalisation started in the 1990s with the internet and WTO" and miss that.', reveals: 'globalisation-started-in-the-1990s' },
                { text: 'the formation of the WTO', outcome: 'Not quite — Students often think "globalisation started in the 1990s with the internet and WTO" and miss that.', reveals: 'globalisation-started-in-the-1990s' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At dinner, a child insists that aloo tikki and chilli paneer are \'purely Indian, they\'ve always been here.\' An uncle who teaches history smiles and asks where the potato and the chilli actually came from.',
            decisions: [{ prompt: 'What does the plate reveal about the making of a global world?', options: [
                { text: 'That global exchange shaped even \'traditional\' food — potatoes, chillies, tomatoes and maize all reached India from the Americas through trade routes after the Columbian exchange, and noodles and pasta themselves travelled along older routes. A dish can be authentically Indian today and still be built from global travellers.', outcome: 'The chapter\'s point lands on the dinner table: pre-modern routes like the Silk Routes and later ocean trade moved crops, foods and ideas as surely as silk and silver — globalisation has a long prehistory.' },
                { text: 'The child is right — if a food is traditional in a place, it must have originated there.', outcome: 'Tradition describes how long we\'ve cooked something, not where it began — the humble potato reached every Indian kitchen only after crossing an ocean.', reveals: 'traditional-means-native' },
                { text: 'Foods never really travelled before modern shipping — old trade routes carried only luxuries like silk and spices.', outcome: 'The routes carried far more than luxuries — crops, techniques, religions and even diseases moved along them, reshaping diets and societies at both ends.', reveals: 'old-routes-luxuries-only' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'The global world wasn\'t discovered in 1492 — it was stitched together by traders, monks, sailors and slaves long before. Columbus just changed the stitching.',
            decisions: [{ prompt: 'What comes next? Making of a Global World · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Making of a Global World · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hist_cbse_03_001', difficulty: 'standard',
          question: 'The Pre-Modern World refers to the period from roughly 300 BCE to 1500 CE when.',
          hint: 'Revisit c7_hist_ch03_007 (Trade Routes: Silk Route and Indian Connections) and identify.',
          misconception: 'Students believe the "Silk Route" was a single, well-marked road stretching from China to Rome, used mainly for silk.',
          parts: [
                { id: 'a', prompt: 'Name the two major mountain passes in the Hindu Kush that connected the Indian subcontinent to the Central Asian Silk Routes, and identify which major Indian.', answer: 'The Khyber Pass and Bolan Pass were the two major Himalayan gateways',
                  options: ['The Khyber Pass and Bolan Pass were the two major Himalayan gateways', 'Silk Route', 'the Nathu La or Shipki La passes, or identifying Pataliputra as the gateway'],
                  hint: 'Revisit c7_hist_ch03_007 (Trade Routes: Silk Route and Indian Connections) and identify the three.',
                  misconception: 'Students believe the "Silk Route" was a single, well-marked road stretching from China to Rome, used mainly for silk trade by Chinese and.' },
                { id: 'b', prompt: 'Explain why Roman gold coins have been found in large numbers at Arikamedu (near Puducherry) and Muziris (Kerala) but are extremely rare in North Indian.', answer: 'Roman trade with India was overwhelmingly maritime',
                  options: ['Roman trade with India was overwhelmingly maritime', 'Romans preferred sea travel', 'North India was not part of the Roman trade', 'Silk Route'],
                  hint: 'Revisit c7_hist_ch03_007 (Trade Routes: Silk Route and Indian Connections) and identify the three.',
                  misconception: 'Students believe the "Silk Route" was a single, well-marked road stretching from China to Rome, used mainly for silk trade by Chinese and.' },
                { id: 'c', prompt: 'A historian argues: "The Silk Routes should be renamed the \'Buddhist Routes\' because Buddhism was the most significant commodity that travelled along them.".', answer: 'The claim overstates Buddhism\'s exclusivity',
                  options: ['The claim overstates Buddhism\'s exclusivity', 'spices', 'globalisation', 'Silk Route'],
                  hint: 'Revisit c7_hist_ch03_007 (Trade Routes: Silk Route and Indian Connections) and identify the three.',
                  misconception: 'Students believe the "Silk Route" was a single, well-marked road stretching from China to Rome, used mainly for silk trade by Chinese and.' }
          ],
            remediations: { 'the-silk-route-was-a': { steps: ['On a blank outline map of Afro-Eurasia, draw the two land corridors (northern steppe route via Kashgar; southern oasis.', 'Mark five key entrepôts: Taxila, Kashgar, Bharuch, Sri Vijaya (Palembang), Quanzhou.', 'For each entrepôt, write one good that entered, one good that left, and one idea/religion that passed through.', 'Compare your map with the textbook map (NCERT Class 10, Chapter 3, Fig. 3.1) — note every route and node you missed.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the "Silk Route" was a single, well-marked road stretching from China to Rome, used mainly for silk.',
          parts: [
                { id: 'a', prompt: 'Assess the statement: "The Silk Routes declined after the 5th century CE because the Roman Empire fell." Provide two counter-evidences showing continuity.', answer: 'The statement is false',
                  options: ['The statement is false', 'Silk Routes', 'Silk Route'],
                  hint: 'Revisit c7_hist_ch03_007 (Trade Routes: Silk Route and Indian Connections) and identify the three.',
                  misconception: 'Students believe the "Silk Route" was a single, well-marked road stretching from China to Rome, used mainly for silk trade by Chinese and.' },
                { id: 'b', prompt: 'Construct a 5-event annotated timeline (with dates) showing how a single commodity — cotton textiles — moved from production in Gujarat to consumption in Cairo.', answer: 'Expected timeline: (1) c',
                  options: ['Expected timeline: (1) c', 'Silk Route'],
                  hint: 'Revisit c7_hist_ch03_007 (Trade Routes: Silk Route and Indian Connections) and identify the three.',
                  misconception: 'Students believe the "Silk Route" was a single, well-marked road stretching from China to Rome, used mainly for silk trade by Chinese and.' }
          ],
            remediations: { 'the-silk-route-was-a': { steps: ['On a blank outline map of Afro-Eurasia, draw the two land corridors (northern steppe route via Kashgar; southern oasis.', 'Mark five key entrepôts: Taxila, Kashgar, Bharuch, Sri Vijaya (Palembang), Quanzhou.', 'For each entrepôt, write one good that entered, one good that left, and one idea/religion that passed through.', 'Compare your map with the textbook map (NCERT Class 10, Chapter 3, Fig. 3.1) — note every route and node you missed.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_03_002', difficulty: 'standard',
          question: 'Nineteenth Century Globalisation: Food and Migration Patterns refers to the.',
          hint: 'If stuck, revisit c10_hist_cbse_03_001 (Silk Routes) and c8_hist_ch3_8 (British Economic.',
          misconception: 'Students often think indentured labourers were "voluntary migrants" who freely chose to go abroad for better wages.',
          parts: [
                { id: 'a', prompt: 'Name the technological innovation that made it possible to transport perishable food (like meat and butter) across oceans in the late 19th century.', answer: 'Refrigerated ships (or "reefers")',
                  options: ['Refrigerated ships (or "reefers")', 'steamships', 'railways', 'voluntary migrants'],
                  hint: 'If stuck, revisit c10_hist_cbse_03_001 (Silk Routes) and c8_hist_ch3_8 (British Economic.',
                  misconception: 'Students often think indentured labourers were "voluntary migrants" who freely chose to go abroad for better wages, ignoring the structural.' },
                { id: 'b', prompt: 'A plantation owner in Trinidad in 1850 needs labour after slavery abolition. He recruits workers from India under a five-year contract.', answer: 'System: Indentured labour',
                  options: ['System: Indentured labour', 'it was voluntary migration', 'new system of slavery', 'voluntary migrants'],
                  hint: 'If stuck, revisit c10_hist_cbse_03_001 (Silk Routes) and c8_hist_ch3_8 (British Economic.',
                  misconception: 'Students often think indentured labourers were "voluntary migrants" who freely chose to go abroad for better wages, ignoring the structural.' },
                { id: 'c', prompt: 'Compare the causes of Irish migration (1845–1855) and Indian indentured migration (1830s–1917).', answer: 'Similarity: Both driven by colonial/imperial economic policies that prioritised',
                  options: ['Similarity: Both driven by colonial/imperial economic policies that prioritised', 'both were voluntary', 'voluntary migrants'],
                  hint: 'If stuck, revisit c10_hist_cbse_03_001 (Silk Routes) and c8_hist_ch3_8 (British Economic.',
                  misconception: 'Students often think indentured labourers were "voluntary migrants" who freely chose to go abroad for better wages, ignoring the structural.' }
          ],
            remediations: { 'indentured-labourers-were-voluntary-migrants': { steps: ['Re-read the NCERT section "Indentured Labour Migration from India" and list the specific clauses in the indenture.', 'Compare with the Irish Famine — use a two-column table: "Cause: Colonial Policy" vs "Cause: Natural Factor" to see how.', 'Watch a 10-minute documentary clip on indentured labour (e.g., BBC "Coolies: How Britain Reinvented Slavery") and note.', 'Write a 100-word paragraph explaining why "voluntary" is a misleading label, using the evidence gathered.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_03_003', difficulty: 'standard',
          question: 'The late nineteenth century (c. 1870–1900) witnessed a dramatic intensification.',
          hint: 'Revisit c8_hist_ch3_8 (British Economic Exploitation) and c10_hist_cbse_03_002.',
          misconception: 'Students believe "colonialism brought modern infrastructure (railways, canals, ports) which developed India." They cite.',
          parts: [
                { id: 'a', prompt: 'A British official in 1890 argues: "Indian railways benefit India by modernising transport." Using evidence from the late 19th century, evaluate this claim.', answer: 'Railways were built to serve British economic interests: they connected',
                  options: ['Railways were built to serve British economic interests: they connected', 'employment', 'travel', '"colonialism brought modern infrastructure (railways, canals, ports)'],
                  hint: 'Revisit c8_hist_ch3_8 (British Economic Exploitation) and c10_hist_cbse_03_002 (food/migration.',
                  misconception: 'Students believe "colonialism brought modern infrastructure (railways, canals, ports) which developed India." They cite railways as proof.' },
                { id: 'b', prompt: 'Compare the economic impact of British rule on India\'s textile industry in the late 18th century (post-Plassey) versus the late 19th century (post-1857).', answer: '*Same:* India remained a supplier of raw cotton and a market for British cloth',
                  options: ['*Same:* India remained a supplier of raw cotton and a market for British cloth', 'it got worse', '"colonialism brought modern infrastructure (railways, canals, ports)'],
                  hint: 'Revisit c8_hist_ch3_8 (British Economic Exploitation) and c10_hist_cbse_03_002 (food/migration.',
                  misconception: 'Students believe "colonialism brought modern infrastructure (railways, canals, ports) which developed India." They cite railways as proof.' }
          ],
            remediations: { 'colonialism-brought-modern-infrastructure-railwa': { steps: ['Show a map of Indian railways in 1900 — note the radial pattern (ports to hinterland) vs.', 'Compare freight rates: raw cotton shipped *to* ports at low rates; finished cloth shipped *from* ports at high rates.', 'Read Dadabhai Naoroji\'s "Drain of Wealth" data (1870s) showing export surplus *without* capital return.', 'Contrast with Japan (Meiji Restoration) — same technology, sovereign control, different outcome.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_03_004', difficulty: 'standard',
          question: 'The Great Depression (1929–1934) was a catastrophic global economic crisis.',
          hint: 'Revisit c10_hist_cbse_03_003 "Late Nineteenth Century: Trade, Conquest and Colon".',
          misconception: 'Students believe the Great Depression hurt India only because "trade declined." They miss the specific mechanism: the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Great Depression (1929–1934) was a catastrophic global economic crisis triggered by',
                  options: ['The Great Depression (1929–1934) was a catastrophic global economic crisis triggered by', 'The Pre-Modern World refers to the period from roughly 300 BCE to 1500 CE when the Silk', 'Nineteenth Century Globalisation: Food and Migration Patterns refers to the period (c', 'The late nineteenth century (c'],
                  hint: 'Revisit c10_hist_cbse_03_003 "Late Nineteenth Century: Trade, Conquest and Colon" — specifically.',
                  misconception: 'Students believe the Great Depression hurt India only because "trade declined." They miss the specific mechanism: the *overvalued.' }
          ],
            remediations: { 'the-great-depression-hurt-india': { steps: ['Re-read the "India and the Great Depression" subsection in NCERT Class 10 Ch.3, highlighting every sentence with.', 'Draw a two-column table: "What happened to world prices" vs "What happened to Indian peasant\'s cash obligation".', 'Watch the 5-minute CBSE video "Gold exports from India 1931-34" (search on Diksha portal).', 'Explain aloud to a peer: "Why did the British government refuse to devalue the rupee until 1939?" — the answer reveals.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_03_005', difficulty: 'standard',
          question: 'The Bretton Woods Conference (July 1944) was a meeting of 44 Allied nations.',
          hint: 'If stuck, revisit c10_hist_cbse_03_004 (The Inter-war Economy: The Great Depression) and.',
          misconception: 'Students often believe the Bretton Woods system was a "gold standard" where all currencies were directly backed by gold.',
          parts: [
                { id: 'a', prompt: 'Why did the Bretton Woods system choose the US dollar — not the British pound or gold directly — as the anchor currency for fixed exchange rates?', answer: 'The US dollar was chosen',
                  options: ['The US dollar was chosen', 'as good as gold', 'because the US was the most powerful country', 'gold standard'],
                  hint: 'If stuck, revisit c10_hist_cbse_03_004 (The Inter-war Economy: The Great Depression) and focus.',
                  misconception: 'Students often believe the Bretton Woods system was a "gold standard" where all currencies were directly backed by gold — they write.' },
                { id: 'b', prompt: 'Compare the Bretton Woods fixed exchange rate system with the pre-1914 classical gold standard on two dimensions: (a) the role of gold, and (b) the adjustment.', answer: 'the role of gold, and (',
                  options: ['the role of gold, and (', 'both used gold directly', 'both adjusted automatically', 'gold standard'],
                  hint: 'If stuck, revisit c10_hist_cbse_03_004 (The Inter-war Economy: The Great Depression) and focus.',
                  misconception: 'Students often believe the Bretton Woods system was a "gold standard" where all currencies were directly backed by gold — they write.' }
          ],
            remediations: { 'the-bretton-woods-system-was': { steps: ['Draw a two-column table — left column "Classical Gold Standard (pre-1914)", right column "Bretton Woods (1944–1971)".', 'Fill rows: "Gold role", "Currency convertibility", "Adjustment mechanism", "Anchor currency".', 'Use the NCERT Class 10 textbook (Chapter 3, pages 68–70) to verify each cell — you will see the textbook explicitly.', 'Write one paragraph explaining why this difference mattered when US gold reserves fell in the 1960s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_03_006', difficulty: 'standard',
          question: 'Globalisation and the New International Economic Order (NIEO) refers to the.',
          hint: 'Review node c10_hist_cbse_03_005 (Rebuilding the World Economy: The Bretton Woods.',
          misconception: 'Students often think "globalisation started in the 1990s with the internet and WTO" and miss that the critical.',
          parts: [
                { id: 'a', prompt: 'Why did developing countries (Group of 77) demand a New International Economic Order (NIEO) in the 1970s? Explain two core demands.', answer: 'Developing countries demanded NIEO',
                  options: ['Developing countries demanded NIEO', 'more aid', 'lower tariffs', 'globalisation started in the 1990s with the internet and WTO'],
                  hint: 'Review node c10_hist_cbse_03_005 (Rebuilding the World Economy: The Bretton Woods Institutions).',
                  misconception: 'Students often think "globalisation started in the 1990s with the internet and WTO" and miss that the critical structural shifts — floating.' }
          ],
            remediations: { 'globalisation-started-in-the-1990s': { steps: ['If the student holds this misconception, have them: (1) Create a two-column table: "1970s–80s: Drivers.', '(2) Read the 1974 UN Declaration on NIEO and the 1989 Washington Consensus side-by-side; highlight opposing principles.', '(3) Trace one commodity (e.g., copper) from 1970s nationalisation attempts to 1990s privatisation under SAPs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
