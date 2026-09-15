import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hist_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hist_ch04_p1: SimDef = {
    id: 'v3_c10_hist_ch04_p1',
    title: 'The Age of Industrialisation · Part 1/2',
    subtitle: 'Watch production move from farmhouse loom to steam-powered mill',
    classLevel: 10, subject: 'history', topic: 'The Age of Industrialisation · Part 1/2',
    chapters: ['c10_hist_ch04'],
    nodeIds: ['c10_hist_cbse_04_001', 'c10_hist_cbse_04_002', 'c10_hist_cbse_04_003', 'c10_hist_cbse_04_004', 'c10_hist_cbse_04_005', 'c10_hist_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a merchant\'s agent turned industrial-age observer', intro: 'You supply yarn to cottage weavers across the countryside — until one day a smoky brick building with a steam engine outproduces a hundred villages. Industrialisation has arrived, and nothing stays the same.', goal: 'Explain proto-industrialisation, the rise of factories, and how industrialisation transformed both Britain and colonial India.' },
    discovery: {
        question: 'Decades before steam factories roared, European merchants were already organising mass production — in peasant cottages. Farm families wove cloth at home with merchant-supplied yarn between harvest seasons. Why did merchants choose cottages over factories?',
        options: ['It was proto-industrialisation: cheap rural labour with idle seasons let merchants produce for distant markets without building factories or fighting guilds', 'Peasants were legally forbidden from entering towns', 'Factories hadn\'t been invented anywhere in the world yet', 'Cottage cloth was always higher quality than machine cloth'],
        answer: 'It was proto-industrialisation: cheap rural labour with idle seasons let merchants produce for distant markets without building factories or fighting guilds',
        hook: 'Industrialisation didn\'t begin with the factory whistle — it began quietly in farmhouses, where a loom sat beside the kitchen and a merchant\'s cart collected the finished cloth.',
    },
    teaching: [
        { title: 'Industrialisation Before the Factory: Proto-Industrialisation', text: 'Proto-industrialisation refers to the phase of industrial production in Europe (c.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hist_cbse_04_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Follow cloth through the industrial revolution: from peasant cottages under the putting-out system to Manchester\'s steam mills — and then to colonial India, where Indian weavers met machine competition.',
        labels: ['Industrialisation Before the Factory', 'The Coming of', 'The Pace of Industrial', 'Demand for Workers: Labour', 'Industrialisation in the Colonies', 'Industrial Production in India'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_hist_cbse_04_001', title: 'Industrialisation Before the Factory: Proto-Industrialisation',
          caseStudy: { intro: 'Imagine you visit a weaving village in Gujarat today — families work on looms at home, a trader gives them yarn and picks up finished cloth.',
            decisions: [{ prompt: 'What was the \'putting-out system\' in proto-industrialisation, and who controlled the production process — the peasant or the merchant?', options: [
                { text: 'The putting-out system was a production arrangement where merchants gave raw materials', outcome: 'The putting-out system was a production arrangement where merchants gave raw materials (e.g.' },
                { text: 'peasants controlled production', outcome: 'Not quite — Students often think proto-industrialisation means "early factories in villages" — they imagine.', reveals: 'proto-industrialisation-means-early-factories' },
                { text: 'work happened in factories', outcome: 'Not quite — Students often think proto-industrialisation means "early factories in villages" — they imagine.', reveals: 'proto-industrialisation-means-early-factories' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_04_002', title: 'The Coming of the Factory System in Britain',
          caseStudy: { intro: 'Imagine you visit a textile mill in Ahmedabad today — hundreds of power looms clattering under one roof, workers arriving at fixed shifts, supervisors.',
            decisions: [{ prompt: 'What was Richard Arkwright\'s specific contribution to the factory system, and in which year did he establish his first mill at Cromford?', options: [
                { text: 'Richard Arkwright patented the Water Frame (1769), a water-powered spinning machine that', outcome: 'Richard Arkwright patented the Water Frame (1769), a water-powered spinning machine that produced.' },
                { text: 'machine', outcome: 'Not quite — Students believe the Spinning Jenny (1764) started the factory system because it was a "machine.".', reveals: 'the-spinning-jenny-1764-started' },
                { text: 'James Hargreaves or Samuel Crompton, or giving a date like 1764 or 1785', outcome: 'Not quite — Students believe the Spinning Jenny (1764) started the factory system because it was a "machine.".', reveals: 'the-spinning-jenny-1764-started' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_04_003', title: 'The Pace of Industrial Change in Britain: Hand vs Machine',
          caseStudy: { intro: 'Imagine you visit a weaving cluster in Panipat today — some looms are power-driven, others are hand-operated, and both coexist because power cuts are frequent.',
            decisions: [{ prompt: 'In which industry did machine production first clearly outpace hand production in Britain, and by approximately what decade had this shift.', options: [
                { text: 'Cotton textiles; by the 1830s machine-spun yarn and power-loom weaving dominated', outcome: 'Cotton textiles; by the 1830s machine-spun yarn and power-loom weaving dominated.' },
                { text: 'iron industry in the 1760s', outcome: 'Not quite — Students believe the Industrial Revolution was a rapid, economy-wide switch from hand to machine.', reveals: 'the-industrial-revolution-was-a' },
                { text: 'wool industry in the 1780s', outcome: 'Not quite — Students believe the Industrial Revolution was a rapid, economy-wide switch from hand to machine.', reveals: 'the-industrial-revolution-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_04_004', title: 'Demand for Workers: Labour Life and Women Workers',
          caseStudy: { intro: 'Imagine you are a teenager in 1830s Manchester leaving your village for a cotton mill — what would you need to know to survive?',
            decisions: [{ prompt: 'Name the system through which industrial workers were recruited in early 19th-century British factories and identify who controlled it.', options: [
                { text: 'The jobber system: jobbers (often old trusted workers) recruited villagers, gave loans,', outcome: 'The jobber system: jobbers (often old trusted workers) recruited villagers, gave loans, and.' },
                { text: 'factory managers directly hired', outcome: 'Not quite — Students often think women entered factories because industrialisation \'liberated\' them from.', reveals: 'women-entered-factories-because-industrialisatio' },
                { text: 'women entered factories', outcome: 'Not quite — Students often think women entered factories because industrialisation \'liberated\' them from.', reveals: 'women-entered-factories-because-industrialisatio' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_04_005', title: 'Industrialisation in the Colonies: India Before and After British Rule',
          caseStudy: { intro: 'Before the British arrived, India was known globally for its fine textiles (Dacca muslin, Coromandel chintz) and metalwork.',
            decisions: [{ prompt: 'What were the main features of Indian manufacturing before British rule?', options: [
                { text: 'India had a prosperous pre-industrial economy with handloom weaving (fine muslin, silk,', outcome: 'India had a prosperous pre-industrial economy with handloom weaving (fine muslin, silk, cotton).' },
                { text: 'India had no industry before the British', outcome: 'Not quite — Students often believe that India had no industry before British rule, reflecting colonial-era.', reveals: 'india-had-no-industry-before' },
                { text: 'India had no industry before British rule, reflecting colonial-era propaganda', outcome: 'Not quite — Students often believe that India had no industry before British rule, reflecting colonial-era.', reveals: 'india-had-no-industry-before' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_04_006', title: 'Industrial Production in India: Early Factories and Their Location',
          caseStudy: { intro: 'Imagine you are standing at Mumbai\'s Girangaon — once called the "Manchester of India" — where over 100 cotton mills once hummed; why did they cluster here and.',
            decisions: [{ prompt: 'In which year and city was the first successful modern cotton textile mill established in India?', options: [
                { text: 'The first successful modern cotton textile mill was established in Bombay in 1854 by', outcome: 'The first successful modern cotton textile mill was established in Bombay in 1854 by Cowasjee.' },
                { text: 'Ahmedabad 1861', outcome: 'Not quite — Students believe early Indian factories were set up by British capital in British-chosen locations.', reveals: 'early-indian-factories-were-set' },
                { text: 'Calcutta 1850s', outcome: 'Not quite — Students believe early Indian factories were set up by British capital in British-chosen locations.', reveals: 'early-indian-factories-were-set' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_04_001', title: 'A real-world call',
          caseStudy: { intro: 'Industrialisation brought factories, jobs and progress — and child labour, poisoned rivers, and workers losing their craft. It was both a miracle and a disaster, in the same decade.',
            decisions: [{ prompt: 'Was industrialisation progress?', options: [
                { text: 'Yes — the long-run gains outweigh the short-run pain', outcome: 'True in aggregate; but \'short-run pain\' was whole lifetimes — a worker crushed in 1850 didn\'t see the long run.' },
                { text: 'Yes, but the pain was a choice, not a necessity', outcome: 'The sharper answer — industrialisation could have come with protections; it chose speed over workers.' },
                { text: 'Progress is a question for each person it touched', outcome: 'The honest answer — progress measured in GDP looks different than progress measured in a weaver\'s hands.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'An aunt runs a small clothing business: she supplies cloth and designs to neighbourhood women who embroider at home around their other work, then collects the finished pieces and sells them in the city. A cousin scoffs, \'That\'s not real industry — there\'s no factory.\'',
            decisions: [{ prompt: 'What does the history of industrialisation say about the aunt\'s business?', options: [
                { text: 'It closely resembles the putting-out system that industrialised Europe before factories — a merchant supplies raw material and takes the finished product, workers keep flexible hours at home yet depend on the merchant\'s prices and orders. Industry did not begin with factory chimneys; this countryside network was proto-industrialisation, the stage before mechanised production.', outcome: 'The women hold real autonomy over their time but real dependence on the merchant — the same double character the putting-out weavers of England had, which is why the system expanded before factories existed.' },
                { text: 'The cousin is right — industry means machines and factory buildings, so home-based work was never industry.', outcome: 'Factories were the later chapter — for over a century before them, merchant-directed household production was Europe\'s growing industrial system.', reveals: 'industry-equals-factory' },
                { text: 'The aunt\'s workers are independent artisans, since working from home means they control their own production.', outcome: 'Home work hid the dependence — like the putting-out weavers, they did not own the material or choose the price, which made them workers for the merchant rather than free artisans.', reveals: 'home-work-equals-independence' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'The factory didn\'t invent industrial labour; it reorganised it. And when machines outproduced hands, entire artisan worlds — including India\'s — paid the price.',
            decisions: [{ prompt: 'What comes next? The Age of Industrialisation · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Age of Industrialisation · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hist_cbse_04_001', difficulty: 'standard',
          question: 'Proto-industrialisation refers to the phase of industrial production in Europe.',
          hint: 'Revisit c8_hist_ch3_8 (British Economic Exploitation) and c8_hist_ch3_5 (English East.',
          misconception: 'Students often think proto-industrialisation means "early factories in villages" — they imagine small workshops with.',
          parts: [
                { id: 'a', prompt: 'Why did merchants in 17th-century England prefer rural peasant households over urban guild craftsmen for producing goods for export markets?', answer: 'Urban guilds regulated production strictly',
                  options: ['Urban guilds regulated production strictly', 'peasants had better skills', 'factories didn\'t exist yet', 'early factories in villages'],
                  hint: 'Revisit c8_hist_ch3_8 (British Economic Exploitation) and c8_hist_ch3_5 (English East India.',
                  misconception: 'Students often think proto-industrialisation means "early factories in villages" — they imagine small workshops with machines.' },
                { id: 'b', prompt: 'Compare proto-industrial production and early factory production on these four parameters: (a) location of work, (b) ownership of tools, (c) labour discipline.', answer: '| Parameter | Proto-Industrial (Putting-Out) | Early Factory System |',
                  options: ['| Parameter | Proto-Industrial (Putting-Out) | Early Factory System |', 'early factories in villages', 'factories used hand tools or proto-industry had strict clocks'],
                  hint: 'Revisit c8_hist_ch3_8 (British Economic Exploitation) and c8_hist_ch3_5 (English East India.',
                  misconception: 'Students often think proto-industrialisation means "early factories in villages" — they imagine small workshops with machines.' }
          ],
            remediations: { 'proto-industrialisation-means-early-factories': { steps: ['Re-read the definition — underline "rural households", "hand tools", "merchant capitalists", "colonial markets".', 'Draw a two-column table: "Proto-Industry" vs "Factory System" — fill in location, tools, labour, control.', 'Watch a 5-min video on "Putting-out system in England" (search NCERT Class 10 History Chapter 4).', 'Explain to a peer: "Why did merchants go to villages instead of cities?" — if you can\'t answer in 3 sentences, review.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think proto-industrialisation means "early factories in villages" — they imagine small workshops with.',
          parts: [
                { id: 'a', prompt: '"Proto-industrialisation was a necessary precursor to the Industrial Revolution." Evaluate this statement with THREE pieces of evidence from 18th-century.', answer: 'The statement is largely valid',
                  options: ['The statement is largely valid', 'early factories in villages'],
                  hint: 'Revisit c8_hist_ch3_8 (British Economic Exploitation) and c8_hist_ch3_5 (English East India.',
                  misconception: 'Students often think proto-industrialisation means "early factories in villages" — they imagine small workshops with machines.' },
                { id: 'b', prompt: 'Construct a 5-event timeline (with years) showing the transition from proto-industrialisation to early factory industrialisation in Britain.', answer: 'A strong timeline (sample): 1',
                  options: ['A strong timeline (sample): 1', 'early factories in villages'],
                  hint: 'Revisit c8_hist_ch3_8 (British Economic Exploitation) and c8_hist_ch3_5 (English East India.',
                  misconception: 'Students often think proto-industrialisation means "early factories in villages" — they imagine small workshops with machines.' }
          ],
            remediations: { 'proto-industrialisation-means-early-factories': { steps: ['Re-read the definition — underline "rural households", "hand tools", "merchant capitalists", "colonial markets".', 'Draw a two-column table: "Proto-Industry" vs "Factory System" — fill in location, tools, labour, control.', 'Watch a 5-min video on "Putting-out system in England" (search NCERT Class 10 History Chapter 4).', 'Explain to a peer: "Why did merchants go to villages instead of cities?" — if you can\'t answer in 3 sentences, review.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_04_002', difficulty: 'standard',
          question: 'The Coming of the Factory System in Britain refers to the late 18th to early.',
          hint: 'Revisit c10_hist_cbse_04_001: focus on the "bottleneck" section — the gap between Kay\'s.',
          misconception: 'Students believe the Spinning Jenny (1764) started the factory system because it was a "machine." In reality, the Jenny.',
          parts: [
                { id: 'a', prompt: 'Compare the Spinning Jenny (1764) and the Water Frame (1769) in terms of: (a) power source, (b) quality of yarn produced, and (c) suitability for factory use.', answer: 'power source, (',
                  options: ['power source, (', 'which invention made factories necessary?', 'machine', 'the Spinning Jenny (1764) started the factory system'],
                  hint: 'Revisit c10_hist_cbse_04_001: focus on the "bottleneck" section — the gap between Kay\'s Flying.',
                  misconception: 'Students believe the Spinning Jenny (1764) started the factory system because it was a "machine." In reality, the Jenny was hand-operated.' }
          ],
            remediations: { 'the-spinning-jenny-1764-started': { steps: ['If the student confuses the Jenny and Water Frame, have them draw a two-column table: Column A — Spinning Jenny.', 'Column B — Water Frame: water-powered, hundreds of spindles, factory-only, warp yarn.', 'Then ask: "Which one needs a river and a building?" Use NCERT Fig.', '5 (Cromford Mill) to visualise scale.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_04_003', difficulty: 'standard',
          question: 'The Pace of Industrial Change in Britain (c. 1750–1850) refers to the gradual.',
          hint: 'Revisit node 001: focus on the merchant\'s role in distributing raw cotton to peasant.',
          misconception: 'Students believe the Industrial Revolution was a rapid, economy-wide switch from hand to machine around 1760–1780.',
          parts: [
                { id: 'a', prompt: 'In which industry did machine production first clearly outpace hand production in Britain, and by approximately what decade had this shift become dominant?', answer: 'Cotton textiles; by the 1830s machine-spun yarn and power-loom weaving dominated',
                  options: ['Cotton textiles; by the 1830s machine-spun yarn and power-loom weaving dominated', 'iron industry in the 1760s', 'wool industry in the 1780s'],
                  hint: 'Revisit node 001: focus on the merchant\'s role in distributing raw cotton to peasant households and.',
                  misconception: 'Students believe the Industrial Revolution was a rapid, economy-wide switch from hand to machine around 1760–1780 because textbooks.' },
                { id: 'b', prompt: 'A historian finds a 1790 merchant\'s ledger showing payments to 200 handloom weavers and only 5 power looms in the same region.', answer: 'In winter, agricultural workers sought weaving work, expanding labour supply and',
                  options: ['In winter, agricultural workers sought weaving work, expanding labour supply and', 'machines were new'],
                  hint: 'Revisit node 001: focus on the merchant\'s role in distributing raw cotton to peasant households and.',
                  misconception: 'Students believe the Industrial Revolution was a rapid, economy-wide switch from hand to machine around 1760–1780 because textbooks.' }
          ],
            remediations: { 'the-industrial-revolution-was-a': { steps: ['Re-read the \'Hand Labour and Steam Power\' section in NCERT (Ch. 4, pp.', 'Draw a T-chart: left column = situations where hand labour won (custom orders, seasonal peaks, intricate designs).', 'Explain aloud to a peer why a 1790 Manchester merchant would rationally choose handlooms for muslin but power looms for.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_04_004', difficulty: 'standard',
          question: 'The demand for workers in industrialising Britain (late 18th–19th century).',
          hint: 'Revisit the "Hand Labour and Steam Power" section in NCERT Chapter 4 — focus on the gas.',
          misconception: 'Students often think women entered factories because industrialisation \'liberated\' them from domestic drudgery.',
          parts: [
                { id: 'a', prompt: 'Explain why factory owners in seasonal industries (like gas works or breweries) preferred hand labour over machines even after steam power was available.', answer: 'Machines required high fixed capital and could not be idled cheaply',
                  options: ['Machines required high fixed capital and could not be idled cheaply', 'machines were not invented yet', 'women entered factories'],
                  hint: 'Revisit the "Hand Labour and Steam Power" section in NCERT Chapter 4 — focus on the gas works and.',
                  misconception: 'Students often think women entered factories because industrialisation \'liberated\' them from domestic drudgery.' },
                { id: 'b', prompt: 'A cotton mill in 1840s Lancashire employs 200 women and 100 men for the same spinning task. Women are paid 6 shillings/week, men 10 shillings.', answer: 'Women were seen as secondary earners',
                  options: ['Women were seen as secondary earners', 'women were less skilled', 'women entered factories'],
                  hint: 'Revisit the "Hand Labour and Steam Power" section in NCERT Chapter 4 — focus on the gas works and.',
                  misconception: 'Students often think women entered factories because industrialisation \'liberated\' them from domestic drudgery.' }
          ],
            remediations: { 'women-entered-factories-because-industrialisatio': { steps: ['Re-read the NCERT extract on "Women Workers" (Class 10, Ch. 4).', 'Create a two-column table: "Myth" vs "Evidence from Text" — e.g., Myth: Women gained independence; Evidence: Wages were.', 'Discuss with a peer why the jobber system made women more vulnerable than men.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_04_005', difficulty: 'standard',
          question: 'Industrialisation in the colonies, particularly India, followed a different.',
          hint: 'Review the British Industrial Revolution (c10_hist_cbse_04_001) and Class 9.',
          misconception: 'Students often believe that India had no industry before British rule, reflecting colonial-era propaganda.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Industrialisation in the colonies, particularly India, followed a different trajectory',
                  options: ['Industrialisation in the colonies, particularly India, followed a different trajectory', 'Proto-industrialisation refers to the phase of industrial production in Europe (c', 'The Coming of the Factory System in Britain refers to the late 18th to early 19th century', 'The Pace of Industrial Change in Britain (c'],
                  hint: 'Review the British Industrial Revolution (c10_hist_cbse_04_001) and Class 9 industrialisation ().',
                  misconception: 'Students often believe that India had no industry before British rule, reflecting colonial-era propaganda.' }
          ],
            remediations: { 'india-had-no-industry-before': { steps: ['Study the timeline: pre-colonial artisanal production → colonial deindustrialisation → limited modern factory.', 'Compare the ownership: jute mills (European) vs cotton mills (Indian) vs steel (Tata, Indian).', 'Analyse primary sources: tariff data showing the asymmetry, accounts of weavers losing independence.', 'Connect to the broader colonial economy: raw material supplier + market for British goods.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_04_006', difficulty: 'standard',
          question: 'Industrial Production in India: Early Factories and Their Location refers.',
          hint: 'If stuck, revisit the "opium-cotton-merchant capital" triangle in c10_hist_cbse_04_005.',
          misconception: 'Students believe early Indian factories were set up by British capital in British-chosen locations (like British.',
          parts: [
                { id: 'a', prompt: 'A jute mill owner in 1880s Bengal wants to set up a new mill. Based on the locational factors of early Indian factories, which site would be most advantageous.', answer: 'on the Hooghly River near Calcutta, or (',
                  options: ['on the Hooghly River near Calcutta, or (', 'who industrialised India', 'why factories located where they did'],
                  hint: 'If stuck, revisit the "opium-cotton-merchant capital" triangle in c10_hist_cbse_04_005 and the.',
                  misconception: 'Students believe early Indian factories were set up by British capital in British-chosen locations (like British factories in India).' },
                { id: 'b', prompt: 'Compare the locational logic of early British cotton factories (Lancashire) with early Indian cotton factories (Bombay).', answer: 'Similarities: both needed water power/steam coal and labour concentrations',
                  options: ['Similarities: both needed water power/steam coal and labour concentrations', 'both located near raw cotton', 'who industrialised India', 'why factories located where they did'],
                  hint: 'If stuck, revisit the "opium-cotton-merchant capital" triangle in c10_hist_cbse_04_005 and the.',
                  misconception: 'Students believe early Indian factories were set up by British capital in British-chosen locations (like British factories in India).' }
          ],
            remediations: { 'early-indian-factories-were-set': { steps: ['Re-read c10_hist_cbse_04_005 (Industrialisation in Colonies: India Before and After) to recall how Indian merchants.', 'Map the first five cotton mills (Bombay 1854, 1856, 1857; Ahmedabad 1861; Kanpur 1862) and first three jute mills.', 'For each mill, write one sentence: "Located here because ____" using the factors: port access, rail link, capital.', 'Compare with Lancashire map from c10_hist_cbse_04_002 — note coal vs. port logic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
