import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eco_ch05_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eco_ch05_p2: SimDef = {
    id: 'v3_c11_eco_ch05_p2',
    title: 'Rural Development · Part 2/2',
    subtitle: 'Diagnose why villages lag a booming GDP — credit, productivity and missing non-farm links.',
    classLevel: 11, subject: 'economics', topic: 'Rural Development · Part 2/2',
    chapters: ['c11_eco_ch05'],
    nodeIds: ['c11_eco_cbse_05_007', 'c11_eco_cbse_05_008', 'c11_eco_cbse_05_009', 'c11_eco_cbse_05_010', 'c11_eco_cbse_05_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a rural development officer auditing a district', intro: 'The sowing is in June, the payment in October — four months of costs, and the moneylender charges 5% a month.', goal: 'Explain rural development as structural correction and analyse the rural credit gap.' },
    discovery: {
        question: 'A Maharashtra village: 70% of households farm, 15% have institutional credit, the nearest cold storage is 40 km away — while India\'s GDP grows 7%. Why is the village stuck?',
        options: ['A structural mismatch — about 42% of the workforce produces only 15% of GDP', 'Villagers refuse to adopt new farming techniques', 'Rural poverty is just what happens before cities develop', 'Credit is available; farmers simply choose not to borrow'],
        answer: 'A structural mismatch — about 42% of the workforce produces only 15% of GDP',
        hook: 'Rural development isn\'t charity or more roads — it\'s fixing a workforce trapped where productivity is lowest.',
    },
    teaching: [
        { title: 'Animal Husbandry and Allied Activities in Rural Economy', text: 'Animal husbandry is the systematic branch of agriculture concerned with the breeding, feeding, management, and healthcare of domesticated livestock (cattle, buffaloes, sheep, goats, pigs, poultry).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eco_cbse_05_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Compute farm versus non-farm output per worker, then test whether more bank branches or Jan-Dhan accounts equal real credit access.',
        labels: ['Animal Husbandry and Allied', 'Rural Development: Organic Farming', 'Rural Development: Operation Flood', 'Rural Development: Critical Appraisal', 'Rural Development: Golden Revolution'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_05_007', title: 'Animal Husbandry and Allied Activities in Rural Economy',
          scaffold: { problem: 'A marginal farmer in Karnataka owns 1.2 hectares of rainfed land. He grows ragi (kharif) and horse gram (rabi).',
            steps: [
            { text: 'Calculate net crop income. Revenue = ₹25,000 + ₹15,000 = ₹40,000. Explicit costs = ₹4,000 + ₹6,000 + ₹10,000 = ₹20,000.' },
            { text: 'Calculate dairy revenue. Milk per cow = 10 L/day × 300 days = 3,000 L/year. Two cows = 6,000 L/year.' },
            { text: 'Calculate dairy variable costs. Feed per cow = 12 kg/day × 300 days = 3,600 kg/year. Two cows = 7,200 kg.' },
            { text: 'Calculate dairy fixed costs. Interest on loan = 2 × ₹60,000 × 7% = ₹8,400. Shed depreciation = ₹5,000.' },
            { text: 'Net dairy income = Revenue - (Variable + Fixed) = ₹2,28,000 - (₹1,80,000 + ₹6,000 + ₹13,400) = ₹2,28,000 - ₹1,99,400.' },
            { text: 'Total farm income = ₹20,000 + ₹28,600 = ₹48,600. Livestock share = 58.8%.' },
            { text: 'LISI = (₹28,600 / ₹20,000) × (0.35 / 0.12) = 1.43 × 2.917 = 4.17. Since LISI > 1, livestock strongly stabilizes income.', faded: true, blankAnswer: '(a) Net crop income = ₹20,000; (b) Net dairy income.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_05_008', title: 'Rural Development: Organic Farming and Sustainable Agriculture',
          scaffold: { problem: 'A farmer cooperative in Sikkim (India\'s first fully organic state) has 50 farmers each with 1.5 hectares.',
            steps: [
            { text: 'Calculate conventional per hectare profit: Revenue = 15,000 kg × ₹80 = ₹12,00,000; Cost = ₹1,20,000; Profit.' },
            { text: 'Calculate organic per hectare profit: Revenue = 12,000 kg × ₹120 = ₹14,40,000; Cost = ₹70,000; Profit = ₹14,33,000/ha' },
            { text: 'Per hectare annual gain from organic = ₹14,33,000 - ₹10,80,000 = ₹3,53,000/ha' },
            { text: 'Per farmer gain (1.5 ha) = ₹3,53,000 × 1.5 = ₹5,29,500/year' },
            { text: 'Certification cost per farmer = ₹3,00,000 / 50 = ₹6,000' },
            { text: 'Payback period = ₹6,000 / ₹5,29,500 = 0.011 years ≈ 4 days' },
            { text: 'Interpret: Certification cost is negligible compared to annual gains; group certification makes organic transition.', faded: true, blankAnswer: 'Per farmer annual net income increase = ₹5,29,500.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_05_009', title: 'Rural Development: Operation Flood and White Revolution',
          scaffold: { problem: 'A village dairy cooperative society (VDCS) in Anand district has 350 member-farmers.',
            steps: [
            { text: 'Identify the pricing formula variables — Fat% = 4.5, SNF% = 8.5, base rates given in formula.' },
            { text: 'Calculate procurement price: = 6.5 × (4.5/4.0) + 4.0 × (8.5/8.0) = 6.5 × 1.125 + 4.0 × 1.0625 = 7.3125 + 4.25.' },
            { text: 'Calculate society\'s net surplus per litre = Procurement price received from union - Operational cost.' },
            { text: 'Farmer\'s share of consumer price = (₹11.56 / ₹52) × 100 = 22.23%. Wait — this seems low.' },
            { text: 'Total daily income to farmers = 4,200 litres × ₹10.50/litre = ₹44,100.', faded: true, blankAnswer: '(a) ₹11.56/litre (union to society); farmer receives.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_05_011', title: 'Rural Development: Golden Revolution (Horticulture and Honey)',
          scaffold: { problem: 'In a district of Karnataka, 500 hectares shift from maize (yield: 5.2 t/ha, price: ₹1,800/t, variable cost: ₹22,000/ha) to tomato (yield.',
            steps: [
            { text: 'Identify the economic concept — comparative net returns and employment generation in crop diversification from cereals.' },
            { text: 'Recall the formula — Net Return = (Yield × Price) - Variable Cost; Employment = person-days/ha; Break-even Price.' },
            { text: 'Compute maize net return: (5.2 t × ₹1,800/t) - ₹22,000 = ₹9,360 - ₹22,000 = -₹12,640/ha (loss).' },
            { text: '(a) Incremental net return = ₹3,55,000 - (-₹12,640) = ₹3,67,640/ha.' },
            { text: 'Interpret economically — even at ₹5.14/kg (57% price crash), tomato covers variable costs; maize is unviable at current.', faded: true, blankAnswer: '(a) ₹3,67,640/ha incremental net return; (b) 82,500.' }
            ] } },
        { type: 'case', nodeId: 'c11_eco_cbse_05_007', title: 'A real-world call',
          caseStudy: { intro: 'A village can develop faster if young people leave for city jobs and send money home — or slower if they stay and build local work. Both paths help the village; neither helps it the same way.',
            decisions: [{ prompt: 'Is migration progress or a slow emptying?', options: [
                { text: 'Progress — remittances fund what the village can\'t', outcome: 'Remittances genuinely build schools and houses; the cost is paid in missing sons and daughters.' },
                { text: 'Emptying — the village loses its builders', outcome: 'Also true — the people who could create local opportunity are precisely the ones who leave.' },
                { text: 'The real failure is making them choose', outcome: 'Rural development\'s actual goal: a village where staying is a real option, not a sacrifice.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For an NSS field project your team must draft a development plan for a village where nearly everyone farms, yields are low, the nearest cold storage is 40 km away, and most loans come from the moneylender. A teammate\'s draft says: \'Rural development = better seeds + one new road. Done.\'',
            decisions: [{ prompt: 'What does the plan miss?', options: [
                { text: 'Rural development is a structural fix, not a farming upgrade: the village mirrors India\'s mismatch — ~42% of the workforce producing ~15% of GVA. The plan needs credit access (institutional loans, not just KCC cards on paper), infrastructure (cold storage, roads), human capital (health, schools) and diversification into allied/non-farm work (dairy, poultry, processing) — because Rabi-season underemployment and disguised unemployment won\'t be solved by seeds alone.', outcome: 'Agricultural development ⊂ rural development; ignoring non-farm linkages and credit adequacy leaves the productivity gap untouched.' },
                { text: 'The draft is sufficient — rural development is essentially agricultural development: better inputs and a road cover it.', outcome: 'That reduces a structural problem to farm inputs; with 42% of workers trapped in low-productivity agriculture, diversification and credit are the point, not extras.', reveals: 'rural-equals-agriculture' },
                { text: 'Add one more scheme — issue Kisan Credit Cards to every household and credit problems disappear.', outcome: 'Access isn\'t adequacy: collateral rules, consumption-loan diversion and default cycles persist; cards without viable non-farm income just deepen debt.', reveals: 'credit-access-equals-adequacy' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_05_011', title: 'You made it',
          caseStudy: { intro: 'Access isn\'t adequacy — an account that can\'t lend and a bank that demands land as collateral both leave the moneylender in business.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_05_007', difficulty: 'standard',
          question: 'Animal husbandry is the systematic branch of agriculture concerned with the.',
          hint: 'Revisit c11_eco_cbse_05_006 (diversification need) and c11_eco_cbse_05_002 (credit for.',
          misconception: 'Students believe "animal husbandry is a separate, standalone activity from crop farming" and that "more animals always.',
          parts: [
                { id: 'a', prompt: 'If India has 150 million rural households and livestock provides livelihood to 70 million small/marginal farmers and landless laborers (NCERT data), calculate.', answer: 'Step 1: % dependent = (70 million / 150 million) × 100 = 46.67%',
                  options: ['Step 1: % dependent = (70 million / 150 million) × 100 = 46.67%', 'animal husbandry is a separate, standalone activity from crop farming', 'more animals always mean more income'],
                  hint: 'Revisit c11_eco_cbse_05_006 (diversification need) and c11_eco_cbse_05_002 (credit for asset.',
                  misconception: 'Students believe "animal husbandry is a separate, standalone activity from crop farming" and that "more animals always mean more income.".' },
                { id: 'b', prompt: 'Compare the Operation Flood cooperative model with traditional dairy marketing (trader/middleman) on four dimensions: price realization for farmer, risk.', answer: 'Operation Flood: (1) Price',
                  options: ['Operation Flood: (1) Price', 'cooperatives give higher price', 'animal husbandry is a separate, standalone activity from crop farming', 'more animals always mean more income'],
                  hint: 'Revisit c11_eco_cbse_05_006 (diversification need) and c11_eco_cbse_05_002 (credit for asset.',
                  misconception: 'Students believe "animal husbandry is a separate, standalone activity from crop farming" and that "more animals always mean more income.".' }
          ],
            remediations: { 'animal-husbandry-is-a-separate': { steps: ['Draw the mixed farming cycle diagram — crops → residues → livestock → manure → crops.', 'Calculate a simple feed budget: 1 hectare paddy yields 5 tonnes straw; 1 crossbred cow needs 10 kg dry matter/day.', 'Show that buying concentrate feed at ₹25/kg makes the 2nd cow unprofitable if milk price is ₹40/litre.', 'Conclude that livestock expansion requires either more land (for fodder) or purchased feed — linking to credit (node.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "animal husbandry is a separate, standalone activity from crop farming" and that "more animals always.',
          parts: [
                { id: 'a', prompt: 'Design a one-hectare integrated farming system for a small farmer in Tamil Nadu combining: paddy (kharif), pulses (rabi), 2 crossbred cows, 50 layer poultry.', answer: 'A good answer maps: Paddy straw → cattle fodder',
                  options: ['A good answer maps: Paddy straw → cattle fodder', 'animal husbandry is a separate, standalone activity from crop farming', 'more animals always mean more income'],
                  hint: 'Revisit c11_eco_cbse_05_006 (diversification need) and c11_eco_cbse_05_002 (credit for asset.',
                  misconception: 'Students believe "animal husbandry is a separate, standalone activity from crop farming" and that "more animals always mean more income.".' }
          ],
            remediations: { 'animal-husbandry-is-a-separate': { steps: ['Draw the mixed farming cycle diagram — crops → residues → livestock → manure → crops.', 'Calculate a simple feed budget: 1 hectare paddy yields 5 tonnes straw; 1 crossbred cow needs 10 kg dry matter/day.', 'Show that buying concentrate feed at ₹25/kg makes the 2nd cow unprofitable if milk price is ₹40/litre.', 'Conclude that livestock expansion requires either more land (for fodder) or purchased feed — linking to credit (node.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_05_008', difficulty: 'standard',
          question: 'Organic farming is a holistic agricultural production system that avoids.',
          hint: 'If stuck, review c8_eco_ch1_12 (Sustainable Production) and c11_eco_cbse_05_001 (Rural.',
          misconception: 'Students believe organic farming is simply "farming without chemicals" or a return to "traditional/ancient farming.".',
          parts: [
                { id: 'a', prompt: 'A farmer in Punjab currently grows wheat using conventional methods on 4 hectares.', answer: '**Year 1 (Conversion):** - Conventional: Revenue = 5 × 2,200 = ₹11,000',
                  options: ['**Year 1 (Conversion):** - Conventional: Revenue = 5 × 2,200 = ₹11,000', 'farming without chemicals', 'traditional/ancient farming'],
                  hint: 'If stuck, review c8_eco_ch1_12 (Sustainable Production) and c11_eco_cbse_05_001 (Rural Development.',
                  misconception: 'Students believe organic farming is simply "farming without chemicals" or a return to "traditional/ancient farming." This leads to three.' }
          ],
            remediations: { 'organic-farming-is-simply-farming': { steps: ['If a student holds this misconception: Step 1 - Show the IFOAM (International Federation of Organic Agriculture.', 'a certified organic farm with 4-course rotation, green manure, and compost - calculate soil organic carbon change over.', 'Step 3 - Use the NCERT Box 5.5 (Maharashtra organic cotton) case: 130 farmers, 1,200 hectares, yields initially dropped.', 'Step 4 - Have the student design a 3-year crop rotation for a 1-ha farm that maintains nitrogen balance without.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_05_009', difficulty: 'standard',
          question: 'Operation Flood (1970-1996) was a national dairy development programme that.',
          hint: 'If stuck, revisit c11_eco_cbse_05_003 (cooperative credit societies) and identify the.',
          misconception: 'Students believe Operation Flood was primarily about importing crossbred cattle (Jersey/Holstein) and that the White.',
          parts: [
                { id: 'a', prompt: 'Define the three-tier cooperative structure (Anand Pattern) established under Operation Flood and state the function of each tier.', answer: 'The three tiers are: (1) Village Dairy Cooperative Society (VDCS)',
                  options: ['The three tiers are: (1) Village Dairy Cooperative Society (VDCS)', 'better cows give more milk'],
                  hint: 'If stuck, revisit c11_eco_cbse_05_003 (cooperative credit societies) and identify the three.',
                  misconception: 'Students believe Operation Flood was primarily about importing crossbred cattle (Jersey/Holstein) and that the White Revolution succeeded.' },
                { id: 'b', prompt: 'Compare the institutional design of Operation Flood\'s dairy cooperatives with the Primary Agricultural Credit Societies (PACS) studied in c11_eco_cbse_05_003.', answer: 'Key differences: (1) Business model',
                  options: ['Key differences: (1) Business model', 'good leadership', 'better cows give more milk'],
                  hint: 'If stuck, revisit c11_eco_cbse_05_003 (cooperative credit societies) and identify the three.',
                  misconception: 'Students believe Operation Flood was primarily about importing crossbred cattle (Jersey/Holstein) and that the White Revolution succeeded.' }
          ],
            remediations: { 'operation-flood-was-primarily-about': { steps: ['Revisit c11_eco_cbse_05_003 (cooperative credit societies) and c11_eco_cbse_05_004 (rural banking) to understand how.', 'Create a two-column table: "Traditional Channel" vs "Cooperative Channel" for milk.', 'Watch the 10-minute NDDB documentary "The Amul Story" (available on YouTube) focusing on the 1965-75 period — note how.', 'Calculate the procurement price share for a farmer selling 10 litres/day at ₹40/litre consumer price under both.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_05_010', difficulty: 'standard',
          question: 'Critical appraisal of rural development programmes is the systematic evaluation.',
          hint: 'If stuck, revisit c11_eco_cbse_05_004 (rural banking structure) and c11_eco_cbse_05_006.',
          misconception: 'Students believe that if a rural programme has a large budget and many beneficiaries, it is \'successful\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical appraisal of rural development programmes is the systematic evaluation of the',
                  options: ['Critical appraisal of rural development programmes is the systematic evaluation of the', 'Rural development is a comprehensive strategy aimed at improving the economic and social', 'Rural credit refers to the financial capital advanced to households and enterprises in', 'Cooperative Credit Societies are member-owned, democratically controlled financial'],
                  hint: 'If stuck, revisit c11_eco_cbse_05_004 (rural banking structure) and c11_eco_cbse_05_006.',
                  misconception: 'Students believe that if a rural programme has a large budget and many beneficiaries, it is \'successful\'.' }
          ],
            remediations: { 'if-a-rural-programme-has': { steps: ['If a student equates budget size with success, do this 3-step remediation: (1) Pick one scheme (e.g., PM-KISAN).', 'Get the budget (₹60,000 cr) and the exclusion error (tenant farmers, sharecroppers left out).', 'Calculate: effective transfer per *eligible* household vs.', '(2) Trace one rupee: draw a flow chart from budget → state → district → bank → farmer.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_05_011', difficulty: 'standard',
          question: 'Golden Revolution refers to the period of rapid growth and diversification.',
          hint: 'If stuck, revisit c11_eco_cbse_05_006 "Diversification: Need and Benefits" — specifically.',
          misconception: 'Students think Golden Revolution is "just growing more fruits" like Green Revolution was "growing more wheat." They.',
          parts: [
                { id: 'a', prompt: 'Explain why horticulture generates higher per-hectare returns and more female employment per hectare than food-grain cultivation, using the concept.', answer: 'Horticulture crops (e.g., grapes, pomegranates, flowers) have high value-per-kg',
                  options: ['Horticulture crops (e.g., grapes, pomegranates, flowers) have high value-per-kg', 'higher prices', 'just growing more fruits', 'growing more wheat'],
                  hint: 'If stuck, revisit c11_eco_cbse_05_006 "Diversification: Need and Benefits" — specifically the.',
                  misconception: 'Students think Golden Revolution is "just growing more fruits" like Green Revolution was "growing more wheat." They miss that horticulture.' },
                { id: 'b', prompt: 'A farmer in Nashik shifts 2 hectares from wheat (yield: 3.5 tonnes/ha, price: ₹2,200/tonne) to export-grade grapes (yield: 25 tonnes/ha, price: ₹45/kg).', answer: 'Step 1: Wheat revenue/ha = 3.5 tonnes × ₹2,200 = ₹7,700',
                  options: ['Step 1: Wheat revenue/ha = 3.5 tonnes × ₹2,200 = ₹7,700', 'just growing more fruits', 'growing more wheat'],
                  hint: 'If stuck, revisit c11_eco_cbse_05_006 "Diversification: Need and Benefits" — specifically the.',
                  misconception: 'Students think Golden Revolution is "just growing more fruits" like Green Revolution was "growing more wheat." They miss that horticulture.' },
                { id: 'c', prompt: 'Compare Green Revolution and Golden Revolution on: (a) primary crops, (b) infrastructure needs, (c) employment pattern, (d) market orientation.', answer: 'primary crops, (',
                  options: ['primary crops, (', 'better seeds', 'just growing more fruits', 'growing more wheat'],
                  hint: 'If stuck, revisit c11_eco_cbse_05_006 "Diversification: Need and Benefits" — specifically the.',
                  misconception: 'Students think Golden Revolution is "just growing more fruits" like Green Revolution was "growing more wheat." They miss that horticulture.' }
          ],
            remediations: { 'golden-revolution-is-just-growing': { steps: ['Revisit c11_eco_cbse_05_006 (Diversification) — list 5 differences between cereal and horticulture value chains using.', 'Visit a nearby fruit mandi or cold storage; observe grading, packing, temperature zones, and who does the work (gender).', 'Calculate revenue/ha for 3 local crops (cereal, vegetable, fruit) using current mandi prices and district yield data.', 'Read NCERT Box 5.5 (organic cotton) and Fig 5.5 (beekeeping) — note how both show non-grain, high-value.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
