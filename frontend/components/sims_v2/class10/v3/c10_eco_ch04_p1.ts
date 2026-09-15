import type { SimDef } from '../../engine/types';

/** v3 generated — c10_eco_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_eco_ch04_p1: SimDef = {
    id: 'v3_c10_eco_ch04_p1',
    title: 'Globalisation and the Indian Economy · Part 1/2',
    subtitle: 'Unpick the global journey of the products in your pocket',
    classLevel: 10, subject: 'economics', topic: 'Globalisation and the Indian Economy · Part 1/2',
    chapters: ['c10_eco_ch04'],
    nodeIds: ['c10_eco_cbse_04_001', 'c10_eco_cbse_04_002', 'c10_eco_cbse_04_003', 'c10_eco_cbse_04_004', 'c10_eco_cbse_04_005', 'c10_eco_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a trade analyst mapping where products really come from', intro: 'Samsung, Apple, Xiaomi and Lava all fight for space on one Indian shelf — a sight impossible when import duties topped 100% and two car models ruled the roads.', goal: 'Explain global production chains and market integration, including why prices converge but never fully equalise.' },
    discovery: {
        question: 'Your phone was \'assembled in India\' — yet its processor was designed in the USA, chips came from Korea, the screen from China. So which country actually made your phone?',
        options: ['No single country — a global production chain splits each stage wherever it\'s cheapest or most skilled', 'China — because most parts shipped from there', 'India — because final assembly is where a product is \'made\'', 'The USA — because the company that designed it is American'],
        answer: 'No single country — a global production chain splits each stage wherever it\'s cheapest or most skilled',
        hook: 'Globalisation isn\'t about importing finished goods — it\'s about slicing one product across the planet so each piece is made where it makes most sense.',
    },
    teaching: [
        { title: 'Production Across Countries: MNCs and Global Production Chains', text: 'A Multinational Corporation (MNC) is a company that owns or controls production of goods or services in at least one country other than its home country.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_eco_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Follow an electric scooter\'s battery, body and assembly across three countries, compute the landed cost of imported wheat, and judge who wins when markets integrate.',
        labels: ['Production Across Countries: MNCs', 'Foreign Trade and Integration', 'Globalisation: Definition and Factors', 'Liberalisation of Foreign Trade', 'World Trade Organisation (WTO)', 'Impact of Globalisation'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_eco_cbse_04_001', title: 'Production Across Countries: MNCs and Global Production Chains',
          caseStudy: { intro: 'Imagine you hold a smartphone assembled in India. Its processor was designed in the USA, the memory chips come from South Korea, the screen from China, and the.',
            decisions: [{ prompt: 'Define a Multinational Corporation (MNC) and give one example of an Indian MNC.', options: [
                { text: 'An MNC is a company that owns or controls production in two or more countries', outcome: 'An MNC is a company that owns or controls production in two or more countries.' },
                { text: 'a company that exports to other countries', outcome: 'Not quite — Students often think "global production chain" means the final product is simply imported from one.', reveals: 'global-production-chain-means-the' },
                { text: 'global production chain', outcome: 'Not quite — Students often think "global production chain" means the final product is simply imported from one.', reveals: 'global-production-chain-means-the' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_04_002', title: 'Foreign Trade and Integration of Markets Across Countries',
          scaffold: { problem: 'The world price of wheat is $250 per metric tonne. The exchange rate is ₹82/$. Shipping and insurance cost ₹1,200 per tonne.',
            steps: [
            { text: 'Convert world price to rupees: $250 × ₹82 = ₹20,500 per tonne.' },
            { text: 'Add shipping and insurance: ₹20,500 + ₹1,200 = ₹21,700 (CIF value).' },
            { text: 'Calculate import duty: 5% of ₹21,700 = ₹1,085.' },
            { text: 'Landed cost = ₹21,700 + ₹1,085 = ₹22,785 per tonne.' },
            { text: 'Compare with MSP: ₹22,785 (landed) > ₹21,500 (MSP). Difference = ₹1,285 per tonne.' },
            { text: 'Interpretation: Since landed cost exceeds MSP, private traders will not import wheat at current prices; the domestic.', faded: true, blankAnswer: 'Landed cost = ₹22,785/tonne; it is ₹1,285 higher than MSP.' }
            ] } },
        { type: 'case', nodeId: 'c10_eco_cbse_04_003', title: 'Globalisation: Definition and Factors Enabling It (Technology, Trade)',
          caseStudy: { intro: 'Imagine you are buying a smartphone in India: its design may be from the USA, processor from Taiwan, screen from South Korea, assembled in China, and sold via.',
            decisions: [{ prompt: 'Define globalisation in one sentence, mentioning the four key cross-border flows.', options: [
                { text: 'Globalisation is the integration of national economies into a global economy through the', outcome: 'Globalisation is the integration of national economies into a global economy through the free flow.' },
                { text: 'foreign companies selling in India', outcome: 'Not quite — Students often think globalisation is only about "foreign companies selling in India" (imports).', reveals: 'globalisation-is-only-about-foreign' },
                { text: 'Indian companies selling abroad', outcome: 'Not quite — Students often think globalisation is only about "foreign companies selling in India" (imports).', reveals: 'globalisation-is-only-about-foreign' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_04_004', title: 'Liberalisation of Foreign Trade and Foreign Investment Policy',
          caseStudy: { intro: 'Imagine you walk into a Mumbai electronics store in 1985 versus 2025: in 1985, you find only Indian brands like HCL or Wipro because importing foreign.',
            decisions: [{ prompt: 'What was the primary difference between India\'s pre-1991 import policy and the post-1991 EXIM policy regarding quantitative restrictions.', options: [
                { text: 'Pre-1991, imports were governed by a positive list (only items explicitly permitted could', outcome: 'Pre-1991, imports were governed by a positive list (only items explicitly permitted could.' },
                { text: 'QRs were increased after 1991', outcome: 'Not quite — Students often equate "liberalisation" with "free trade" and assume all barriers were removed.', reveals: 'students-often-equate-liberalisation-with' },
                { text: 'QRs were removed only on consumer goods', outcome: 'Not quite — Students often equate "liberalisation" with "free trade" and assume all barriers were removed.', reveals: 'students-often-equate-liberalisation-with' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_04_005', title: 'World Trade Organisation (WTO): Role, Functions and Impact',
          caseStudy: { intro: 'Imagine you are an Indian mango farmer in Maharashtra exporting Alphonso mangoes to the European Union.',
            decisions: [{ prompt: 'What is the full form of WTO and in which year was it established as a successor to GATT?', options: [
                { text: 'The World Trade Organisation (WTO) was established on 1 January 1995, replacing the', outcome: 'The World Trade Organisation (WTO) was established on 1 January 1995, replacing the General.' },
                { text: 'World Trade Organisation, 1948', outcome: 'Not quite — Students believe the WTO forces developing countries to eliminate all tariffs and subsidies.', reveals: 'the-wto-forces-developing-countries' },
                { text: 'World Tariff Organisation', outcome: 'Not quite — Students believe the WTO forces developing countries to eliminate all tariffs and subsidies.', reveals: 'the-wto-forces-developing-countries' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_04_006', title: 'Impact of Globalisation in India: Positive Effects on Consumers and Producers',
          caseStudy: { intro: 'Imagine you walk into an electronics store in 2024 to buy a smartphone.',
            decisions: [{ prompt: 'State two specific benefits that Indian consumers have experienced due to globalisation since the 1991 reforms.', options: [
                { text: 'Correct answer: (1) Greater variety and choice of goods (e.g., multiple brands of', outcome: 'Correct answer: (1) Greater variety and choice of goods (e.g., multiple brands of smartphones.' },
                { text: 'consumers got cheaper goods', outcome: 'Not quite — Students believe globalisation benefits consumers ONLY through cheaper imported goods.', reveals: 'globalisation-benefits-consumers-only-through' },
                { text: 'consumers got foreign goods', outcome: 'Not quite — Students believe globalisation benefits consumers ONLY through cheaper imported goods.', reveals: 'globalisation-benefits-consumers-only-through' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_04_001', title: 'A real-world call',
          caseStudy: { intro: 'A multinational brings jobs to an Indian town but pays less than it would abroad and ships profits home. A local company pays fairly but can\'t compete on price and is closing.',
            decisions: [{ prompt: 'Is globalisation good when it saves jobs but squeezes them?', options: [
                { text: 'Take the jobs — some income beats none', outcome: 'True for the worker today; the question is whether \'today\' becomes a permanent arrangement.' },
                { text: 'Protect the local company', outcome: 'Keeps value and dignity local, but protection can hide inefficiency until the protection itself fails.' },
                { text: 'Take the jobs AND fight for better terms', outcome: 'The hard middle — requires worker organizing and regulation, which is exactly what globalisation pressures governments to skip.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student unboxes a new smartphone and reads the fine print: designed in California, processor from one country, display from another, assembled in India, sold worldwide. Her brother asks why the company doesn\'t just make the whole phone in one factory.',
            decisions: [{ prompt: 'What explains the phone\'s multi-country production?', options: [
                { text: 'The company is an MNC spreading production across a global chain — each stage goes where it is most advantageous: advanced components where the technology and skilled engineers are, assembly where costs and skills balance, sales where the markets are. Interlinked production across borders is exactly what globalisation means.', outcome: 'No single location is best at everything, so the firm coordinates factories in several countries — cheaper labour, better technology and market access at different stages lower total cost.' },
                { text: 'It is mostly for the label — companies scatter production across countries so the box looks impressive, but one factory could do it all just as cheaply.', outcome: 'The spread is economic, not decorative — each stage really does cost less or perform better in its chosen location, which is why assembly plants, chip fabs and display makers sit in different countries.', reveals: 'global-spread-is-marketing' },
                { text: 'Phones are made in many countries only because trade rules force companies to share production between nations.', outcome: 'Firms choose multi-country production to cut costs and access skills and markets — trade rules shape where they can go, but no rule forces them to split production.', reveals: 'rules-force-global-production' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'One product, many passports. MNCs stitch the world into a single factory — and the fight is over who captures the value and who gets just the wages.',
            decisions: [{ prompt: 'What comes next? Globalisation and the Indian Economy · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Globalisation and the Indian Economy · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_eco_cbse_04_001', difficulty: 'standard',
          question: 'A Multinational Corporation (MNC) is a company that owns or controls production.',
          hint: 'If stuck, revisit Factors of Production (c8_eco_ch1_2) and Types of Markets: Local.',
          misconception: 'Students often think "global production chain" means the final product is simply imported from one foreign country.',
          parts: [
                { id: 'a', prompt: 'Define a Multinational Corporation (MNC) and give one example of an Indian MNC.', answer: 'An MNC is a company that owns or controls production in two or more countries',
                  options: ['An MNC is a company that owns or controls production in two or more countries', 'a company that exports to other countries', 'global production chain', 'foreign trade'],
                  hint: 'If stuck, revisit Factors of Production (c8_eco_ch1_2) and Types of Markets: Local, National, and.',
                  misconception: 'Students often think "global production chain" means the final product is simply imported from one foreign country.' },
                { id: 'b', prompt: 'An MNC produces sports shoes. The design stage needs 100 hours of skilled labour at $30/hour in the USA.', answer: 'Step 1: Design cost = 100 hrs × $30 = $3,000',
                  options: ['Step 1: Design cost = 100 hrs × $30 = $3,000', 'global production chain', 'foreign trade', 'global production sharing'],
                  hint: 'If stuck, revisit Factors of Production (c8_eco_ch1_2) and Types of Markets: Local, National, and.',
                  misconception: 'Students often think "global production chain" means the final product is simply imported from one foreign country.' }
          ],
            remediations: { 'global-production-chain-means-the': { steps: ['If a student holds this misconception, do this 3-step remediation: (1) Show a real iPhone component map (Apple\'s.', '(2) Give a fill-in-the-blank diagram of a car\'s global production chain with stages (engine, tyres, electronics.', '(3) Ask the student to explain in one sentence why the same MNC does not make engines and tyres in the same country.', 'This forces them to articulate factor-specific location logic.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_04_002', difficulty: 'standard',
          question: 'Foreign trade refers to the exchange of goods, services, and capital across.',
          hint: 'If stuck, review c9_eco_ch2_10 (Market Equilibrium) to see how an increase in supply.',
          misconception: 'Students often believe that market integration through foreign trade means "all prices become the same everywhere.".',
          parts: [
                { id: 'a', prompt: 'Define foreign trade and state one way it leads to integration of markets across countries.', answer: 'Foreign trade is the exchange of goods, services, and capital between countries',
                  options: ['Foreign trade is the exchange of goods, services, and capital between countries', 'buying and selling between countries', 'all prices become the same everywhere', 'perfect price equalization'],
                  hint: 'If stuck, review c9_eco_ch2_10 (Market Equilibrium) to see how an increase in supply (from imports).',
                  misconception: 'Students often believe that market integration through foreign trade means "all prices become the same everywhere." In reality, prices.' },
                { id: 'b', prompt: 'India imports crude oil at $80 per barrel. The exchange rate is ₹83 per dollar. Transport and refining costs add ₹1,500 per barrel.', answer: 'Step 1: Convert international price to rupees: $80 × ₹83 = ₹6,640',
                  options: ['Step 1: Convert international price to rupees: $80 × ₹83 = ₹6,640', 'landed cost', 'all prices become the same everywhere', 'perfect price equalization'],
                  hint: 'If stuck, review c9_eco_ch2_10 (Market Equilibrium) to see how an increase in supply (from imports).',
                  misconception: 'Students often believe that market integration through foreign trade means "all prices become the same everywhere." In reality, prices.' },
                { id: 'c', prompt: 'Compare the effect of foreign trade on two markets: (a) Indian mangoes exported to the UAE, and (b) solar panels imported from China.', answer: 'For mango exports: Indian mango producers gain access to a larger market (UAE),',
                  options: ['For mango exports: Indian mango producers gain access to a larger market (UAE),', 'both consumers benefit', 'both producers lose', 'all prices become the same everywhere'],
                  hint: 'If stuck, review c9_eco_ch2_10 (Market Equilibrium) to see how an increase in supply (from imports).',
                  misconception: 'Students often believe that market integration through foreign trade means "all prices become the same everywhere." In reality, prices.' }
          ],
            remediations: { 'market-integration-through-foreign-trade': { steps: ['Revisit the worked example on landed cost calculation (Diagnostic Q3) to see how transport, insurance, and duties.', 'Draw a simple supply-demand diagram for a good in India and the world market.', 'List 5 goods you consume daily and classify each as tradable (can be imported/exported) or non-tradable.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that market integration through foreign trade means "all prices become the same everywhere.".',
          parts: [
                { id: 'a', prompt: 'Design a simple survey for 10 households in your neighborhood to investigate how foreign trade has affected their consumption choices over the last 5 years.', answer: 'Good answer: 1',
                  options: ['Good answer: 1', 'all prices become the same everywhere', 'perfect price equalization'],
                  hint: 'If stuck, review c9_eco_ch2_10 (Market Equilibrium) to see how an increase in supply (from imports).',
                  misconception: 'Students often believe that market integration through foreign trade means "all prices become the same everywhere." In reality, prices.' }
          ],
            remediations: { 'market-integration-through-foreign-trade': { steps: ['Revisit the worked example on landed cost calculation (Diagnostic Q3) to see how transport, insurance, and duties.', 'Draw a simple supply-demand diagram for a good in India and the world market.', 'List 5 goods you consume daily and classify each as tradable (can be imported/exported) or non-tradable.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_04_003', difficulty: 'standard',
          question: 'Globalisation is the process of increasing interconnectedness and integration.',
          hint: 'If stuck, revisit Class 6 "Types of Markets: Local, National, and Global".',
          misconception: 'Students often think globalisation is only about "foreign companies selling in India" (imports) or "Indian companies.',
          parts: [
                { id: 'a', prompt: 'A Indian garment manufacturer exports shirts to the USA. The cost of shipping a container from Mumbai to New York dropped from $5,000 in 1990 to $1,500 in 2020.', answer: 'Step 1: Identify the cost reduction per container = $5,000 - $1,500 = $3,500',
                  options: ['Step 1: Identify the cost reduction per container = $5,000 - $1,500 = $3,500', 'foreign companies selling in India', 'Indian companies selling abroad'],
                  hint: 'If stuck, revisit Class 6 "Types of Markets: Local, National, and Global" (c6_economics_ch12_002).',
                  misconception: 'Students often think globalisation is only about "foreign companies selling in India" (imports) or "Indian companies selling abroad".' }
          ],
            remediations: { 'globalisation-is-only-about-foreign': { steps: ['If the student holds this misconception, do this 3-step remediation: (1) Take a familiar product (e.g., a packet.', '(2) Use a simple table: Columns = Goods, Services, Capital, Technology; Rows = Inflows to India, Outflows from India.', 'Fill with Indian examples.', '(3) Ask the student to explain how a reduction in import duty on capital goods (trade policy) and faster internet.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_04_004', difficulty: 'standard',
          question: 'Liberalisation of foreign trade and foreign investment policy refers to the.',
          hint: 'If stuck, revisit c9_eco_ch1_11 (India\'s Post-1991 Economic Reforms: Liberalisation) and.',
          misconception: 'Students often equate "liberalisation" with "free trade" and assume all barriers were removed at once in 1991.',
          parts: [
                { id: 'a', prompt: 'Suppose the peak customs duty on a product was 150% in 1990-91. The 1992-93 budget announced a phased reduction to 65% by 1994-95 and 30% by 1997-98.', answer: 'Step 1: Total reduction = 150% - 30% = 120 percentage points over 7 years',
                  options: ['Step 1: Total reduction = 150% - 30% = 120 percentage points over 7 years', 'foreign investment'],
                  hint: 'If stuck, revisit c9_eco_ch1_11 (India\'s Post-1991 Economic Reforms: Liberalisation) and.',
                  misconception: 'Students often equate "liberalisation" with "free trade" and assume all barriers were removed at once in 1991.' },
                { id: 'b', prompt: 'Compare the impact of removing quantitative restrictions (QRs) versus reducing tariffs on domestic producers.', answer: 'Removing QRs creates more immediate competitive pressure',
                  options: ['Removing QRs creates more immediate competitive pressure', 'Tariff reduction is more immediate', 'foreign investment'],
                  hint: 'If stuck, revisit c9_eco_ch1_11 (India\'s Post-1991 Economic Reforms: Liberalisation) and.',
                  misconception: 'Students often equate "liberalisation" with "free trade" and assume all barriers were removed at once in 1991.' }
          ],
            remediations: { 'students-often-equate-liberalisation-with': { steps: ['If a student conflates liberalisation with instant free trade, have them construct a timeline: 1991 (QRs removed.', 'Ask: "If it was instant free trade, why did consumer goods QRs last till 2001?" For FDI/FPI confusion, give a table.', '— e.g., Defence: 74% FDI (automatic up to 49%), FPI allowed in listed defence PSUs; Multi-brand retail: 51% FDI (with.', 'Have them explain why the caps differ — linking to strategic control vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_04_005', difficulty: 'standard',
          question: 'The World Trade Organisation (WTO) is an intergovernmental organisation that.',
          hint: 'If stuck, revisit c10_eco_cbse_04_004 (Liberalisation) to see India\'s 1991 tariff cuts.',
          misconception: 'Students believe the WTO forces developing countries to eliminate all tariffs and subsidies immediately, while.',
          parts: [
                { id: 'a', prompt: 'India\'s average bound tariff rate for agricultural products is 113% (as per WTO tariff profiles), while its applied MFN tariff is around 39%.', answer: 'Step 1: Identify the bound rate (ceiling) = 113%',
                  options: ['Step 1: Identify the bound rate (ceiling) = 113%', '39% + 30% = 69%'],
                  hint: 'If stuck, revisit c10_eco_cbse_04_004 (Liberalisation) to see India\'s 1991 tariff cuts, and.',
                  misconception: 'Students believe the WTO forces developing countries to eliminate all tariffs and subsidies immediately, while developed countries keep.' },
                { id: 'b', prompt: 'Compare the impact of the WTO\'s Agreement on Agriculture (AoA) on Indian farmers versus farmers in the USA/EU.', answer: 'The AoA classifies subsidies into boxes: Amber Box (trade-distorting, subject to',
                  options: ['The AoA classifies subsidies into boxes: Amber Box (trade-distorting, subject to', 'India gives more subsidies than USA', 'analyse'],
                  hint: 'If stuck, revisit c10_eco_cbse_04_004 (Liberalisation) to see India\'s 1991 tariff cuts, and.',
                  misconception: 'Students believe the WTO forces developing countries to eliminate all tariffs and subsidies immediately, while developed countries keep.' }
          ],
            remediations: { 'the-wto-forces-developing-countries': { steps: ['Re-read the WTO\'s "Special and Differential Treatment" provisions in the NCERT box (Chapter 4).', 'Create a two-column table: Column A = WTO Rule (e.g., "Tariff Reduction"), Column B = S&DT for Developing Countries.', 'Find one real example where India used S&DT — e.g., India invoked the "Peace Clause" (Bali 2013) for its food.', 'Practice writing a 3-sentence answer: "The WTO provides S&DT under Article XVIII of GATT and Part IV.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_04_006', difficulty: 'standard',
          question: 'The positive impact of globalisation on Indian consumers refers to increased.',
          hint: 'If stuck, revisit "Competition in Markets: Many Sellers, Many Buyers".',
          misconception: 'Students believe globalisation benefits consumers ONLY through cheaper imported goods.',
          parts: [
                { id: 'a', prompt: 'Compare the impact of globalisation on a large Indian IT services firm (e.g., TCS) versus a small traditional handloom weaver in Varanasi.', answer: 'Correct answer: The IT firm benefits more',
                  options: ['Correct answer: The IT firm benefits more', 'IT firms are bigger so they win', 'globalisation benefits consumers ONLY through cheaper imported goods'],
                  hint: 'If stuck, revisit "Competition in Markets: Many Sellers, Many Buyers" (c6_economics_ch12_004) and.',
                  misconception: 'Students believe globalisation benefits consumers ONLY through cheaper imported goods.' }
          ],
            remediations: { 'globalisation-benefits-consumers-only-through': { steps: ['Revisit node c10_eco_cbse_04_001 (MNCs and Global Production) to see how MNCs set up production IN India, not just.', 'Use the "Maruti vs Hyundai" case: In 1998, Hyundai entered with Santro — modern engine, better mileage.', 'Apply same logic to consumers: The benefit is not just buying a Hyundai, but buying a BETTER Maruti at a LOWER price.', 'Practice writing: "Globalisation disciplined domestic producers through contestable markets, raising quality floor for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
