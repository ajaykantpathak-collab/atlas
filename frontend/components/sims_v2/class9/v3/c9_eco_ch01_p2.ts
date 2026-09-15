import type { SimDef } from '../../engine/types';

/** v3 generated — c9_eco_ch01_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_eco_ch01_p2: SimDef = {
    id: 'v3_c9_eco_ch01_p2',
    title: 'Understanding Economics: Scarcity and Choice · Part 2/2',
    subtitle: 'Why you can never have it all',
    classLevel: 9, subject: 'economics', topic: 'Understanding Economics: Scarcity and Choice · Part 2/2',
    chapters: ['c9_eco_ch01'],
    nodeIds: ['c9_eco_ch1_5', 'c9_eco_ch1_6', 'c9_eco_ch1_7', 'c9_eco_ch1_8', 'c9_eco_ch1_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a budget-stretched planner', intro: '₹500, five wishes, one week — your pocket-money crisis is the whole economy in miniature. Find out why \'just produce more\' never ends the problem.', goal: 'Understand scarcity as unlimited wants versus limited resources — the root of every economy — and the three central questions (what, how, for whom) it forces on every society.' },
    discovery: {
        question: 'Clean air is free in a mountain village but \'scarce\' in Delhi — nobody sells it in either place, so how can air be scarce?',
        options: ['Scarcity = wants exceeding supply, not price tags: in Delhi, demand for clean air outruns its shrinking supply', 'It can\'t — only things with prices can be scarce', 'Delhi\'s air is scarce because it\'s dirty', 'Village air is different air'],
        answer: 'Scarcity = wants exceeding supply, not price tags: in Delhi, demand for clean air outruns its shrinking supply',
        hook: 'Scarcity isn\'t shortage or poverty — even a billionaire faces it, because wants are unlimited while land, time and resources aren\'t. Rich or poor, every society must still answer what to produce, how, and for whom.',
    },
    teaching: [
        { title: 'How to Produce: Choice of Production Methods', text: 'The choice of production method refers to the economic decision of selecting the optimal combination of factors of production (primarily labour and capital) to produce a given quantity of output.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_eco_ch1_5', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Take a ₹500 pocket-money dilemma and a 10-hectare farm and find the three questions hiding inside every choice — what to make, how to make it, who gets it — then test whether getting richer ever makes scarcity disappear.',
        labels: ['How to Produce: Choice', 'For Whom to Produce', 'Factors of Production: Land,', 'Planned Economy vs Market', 'Mixed Economy: Features'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_eco_ch1_5', title: 'How to Produce: Choice of Production Methods',
          scaffold: { problem: 'A dairy cooperative in Anand, Gujarat, processes 1,000 litres of milk daily into pasteurised pouches.',
            steps: [
            { text: 'Identify the economic concept — this is a "How to Produce" decision between two techniques for the same output (1,000.' },
            { text: 'Recall the cost-minimisation principle — choose the technique with the lower total factor cost (TFC = Σ factor quantity.' },
            { text: 'Compute Technique M cost: Labour cost = 8 × ₹350 = ₹2,800. Capital cost = 2 × ₹600 = ₹1,200. Total = ₹4,000.' },
            { text: 'Compute Technique A cost: Labour cost = 2 × ₹500 = ₹1,000. Capital cost = 1 × ₹3,500 = ₹3,500. Total = ₹4,500.' },
            { text: 'Compare and interpret: ₹4,000 (M) < ₹4,500 (A). The labour-intensive Technique M is cheaper by ₹500/day.', faded: true, blankAnswer: 'Technique M (manual) with a daily cost of ₹4,000 is the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_eco_ch1_6', title: 'For Whom to Produce: Distribution of Goods',
          scaffold: { problem: 'In a small Indian town, three households earn income only from factors they own: Household A owns a shop (capital) earning ₹20,000/month.',
            steps: [
            { text: 'Identify factor incomes: A = ₹20,000 (interest), B = ₹15,000 (wages), C = ₹25,000 (rent).' },
            { text: 'Calculate expenditure on wheat (80% of income): A = 0.8 × 20,000 = ₹16,000; B = 0.8 × 15,000 = ₹12,000; C = 0.8.' },
            { text: 'Convert expenditure to quantity using price ₹25/kg: A = 16,000/25 = 640 kg; B = 12,000/25 = 480 kg; C = 20,000/25 = 800.' },
            { text: 'Total wheat demanded = 640 + 480 + 800 = 1,920 kg.' },
            { text: 'Compare with supply 2,000 kg: Supply > Demand by 80 kg → excess supply (surplus).', faded: true, blankAnswer: '(a) A: 640 kg, B: 480 kg, C: 800 kg. (b) 1,920 kg. (c).' }
            ] } },
        { type: 'case', nodeId: 'c9_eco_ch1_7', title: 'Factors of Production: Land, Labour, Capital, Entrepreneurship',
          caseStudy: { intro: 'Imagine you are visiting a **small garment factory in Tirupur, Tamil Nadu**, that exports cotton T-shirts.',
            decisions: [{ prompt: 'List the four factors of production and their corresponding factor rewards (income earned by the factor owner).', options: [
                { text: 'The four factors and rewards are: 1) Land → Rent, 2) Labour → Wages, 3) Capital →', outcome: 'The four factors and rewards are: 1) Land → Rent, 2) Labour → Wages, 3) Capital → Interest, 4).' },
                { text: 'Capital → Profit', outcome: 'Not quite — **Money is Capital.** Students consistently treat "capital" as "money in the bank" or "financial.', reveals: 'money-is-capital' },
                { text: 'Entrepreneurship → Wages', outcome: 'Not quite — **Money is Capital.** Students consistently treat "capital" as "money in the bank" or "financial.', reveals: 'money-is-capital' }
            ] }] } },
        { type: 'case', nodeId: 'c9_eco_ch1_8', title: 'Planned Economy vs Market Economy',
          caseStudy: { intro: 'Imagine you walk into a vegetable market in Delhi: prices change every hour based on what farmers brought, what buyers want, and the weather - no one tells the.',
            decisions: [{ prompt: 'What is the fundamental difference in how a planned economy and a market economy decide WHAT goods to produce?', options: [
                { text: 'In a planned economy, a central planning authority decides what to produce based on', outcome: 'In a planned economy, a central planning authority decides what to produce based on national.' },
                { text: 'both use prices', outcome: 'Not quite — Students believe a planned economy "solves" scarcity by eliminating competition and waste, while.', reveals: 'a-planned-economy-solves-scarcity' },
                { text: 'both let consumers decide', outcome: 'Not quite — Students believe a planned economy "solves" scarcity by eliminating competition and waste, while.', reveals: 'a-planned-economy-solves-scarcity' }
            ] }] } },
        { type: 'case', nodeId: 'c9_eco_ch1_9', title: 'Mixed Economy: Features and Examples',
          caseStudy: { intro: 'Imagine you are buying a train ticket from Indian Railways (government-owned) to travel to a private hospital for a check-up, and on the way you stop at.',
            decisions: [{ prompt: 'Define a mixed economy in one sentence using the terms \'private sector\', \'public sector\', and \'central economic problems\'.', options: [
                { text: 'A mixed economy is an economic system where both the private sector and public sector', outcome: 'A mixed economy is an economic system where both the private sector and public sector participate.' },
                { text: 'government and private companies exist together', outcome: 'Not quite — Students believe a mixed economy means a fixed 50-50 split between government and private sectors.', reveals: 'a-mixed-economy-means-a' },
                { text: 'government controls some prices', outcome: 'Not quite — Students believe a mixed economy means a fixed 50-50 split between government and private sectors.', reveals: 'a-mixed-economy-means-a' }
            ] }] } },
        { type: 'case', nodeId: 'c9_eco_ch1_5', title: 'A real-world call',
          caseStudy: { intro: 'A vaccine exists for a disease that mainly kills in poor countries. Developing it cost billions; the countries that need it can least afford it.',
            decisions: [{ prompt: 'Should medicine be priced by what it cost or by who needs it?', options: [
                { text: 'By cost — unfunded research doesn\'t happen', outcome: 'The innovation answer; honest that it means the poorest wait longest for the medicine they need most.' },
                { text: 'By need — a medicine that doesn\'t reach the sick failed', outcome: 'The access answer; without the pipeline of profitable drugs, the next vaccine never gets funded.' },
                { text: 'Tier it — rich countries pay full price, poor ones pay cost', outcome: 'The differential-pricing answer — actually used for HIV drugs; works only if wealthier markets accept subsidizing the rest.' }
            ] }] } },
        { type: 'case', nodeId: 'c9_eco_ch1_5', title: 'Use it in the wild',
          caseStudy: { intro: 'Scrolling a rich celebrity\'s interview, Rohan scoffs: \'Scarcity is a poor family\'s problem — a billionaire faces none.\' Yet the same billionaire must choose which of three rival projects to fund, and still has only 24 hours a day.',
            decisions: [{ prompt: 'Who is right about scarcity?', options: [
                { text: 'Scarcity is universal, not a poverty symptom — it exists whenever wants outrun resources, and every budget, from ₹500 of pocket money to a ₹45 lakh crore national budget, must still answer what to produce, how, and for whom.', outcome: 'This keeps the two-sided definition — unlimited wants against limited means — which holds at every income level.' },
                { text: 'Rohan is right — once you can afford everything you want, scarcity disappears.', outcome: 'Wants expand with means, and some resources — time, land, attention — stay fixed for everyone; even a billionaire\'s choices sacrifice alternatives.', reveals: 'rich-means-no-scarcity' },
                { text: 'Both miss it — scarcity is just a shortage, solved whenever shops restock the shelves.', outcome: 'A shortage is a temporary gap at a price; scarcity is the permanent condition that wants exceed resources — restocking never ends it.', reveals: 'scarcity-is-shortage' }
            ] }] } },
        { type: 'case', nodeId: 'c9_eco_ch1_9', title: 'You made it',
          caseStudy: { intro: 'Unlimited wants + limited resources = the permanent itch called scarcity. It forces every household and every government to choose — and choosing anything always costs the alternative you gave up.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_eco_ch1_5', difficulty: 'standard',
          question: 'The choice of production method refers to the economic decision of selecting.',
          hint: 'If stuck, revisit Class 8 "Factors of Production: Definition and Types" (c8_eco_ch1_2).',
          misconception: 'Students believe "capital-intensive = more efficient = always better" because machines are faster.',
          parts: [
                { id: 'a', prompt: 'A farmer in Punjab can harvest 1 hectare of wheat using either: - Technique A (Labour-intensive): 10 labourers × 8 hours @ ₹200 per labourer-day - Technique.', answer: '**Technique A Cost** = 10 labourers × ₹200 = ₹2,000',
                  options: ['**Technique A Cost** = 10 labourers × ₹200 = ₹2,000', 'modern machine = always cheaper', 'capital-intensive = more efficient = always better', '"capital-intensive = more efficient = always better"'],
                  hint: 'If stuck, revisit Class 8 "Factors of Production: Definition and Types" (c8_eco_ch1_2) and "Role.',
                  misconception: 'Students believe "capital-intensive = more efficient = always better" because machines are faster.' },
                { id: 'b', prompt: 'Analyse how the choice in Diagnostic Question 3 would change if: (a) The daily wage rate rises to ₹500 per labourer due to a new minimum wage law.', answer: '**(a) Wage rise to ₹500**: Technique A Cost = 10 × ₹500 = ₹5,000',
                  options: ['**(a) Wage rise to ₹500**: Technique A Cost = 10 × ₹500 = ₹5,000', 'Technique B becomes cheaper in both cases', 'How to Produce', 'capital-intensive = more efficient = always better'],
                  hint: 'If stuck, revisit Class 8 "Factors of Production: Definition and Types" (c8_eco_ch1_2) and "Role.',
                  misconception: 'Students believe "capital-intensive = more efficient = always better" because machines are faster.' }
          ],
            remediations: { 'capital-intensive-more-efficient-always': { steps: ['**Step 1**: Present the excavation example above with exact numbers.', '**Step 2**: Ask the student to compute total cost for both methods.', '**Step 3**: Ask "Which method is *economically* efficient?" Guide them to see the lower-cost method is the efficient.', '**Step 4**: Change the wage to ₹600 and excavator rental to ₹20,000; have them recompute and observe the switch.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch1_6', difficulty: 'standard',
          question: 'The "For Whom to Produce" problem refers to the allocation of final goods and.',
          hint: 'If stuck, revisit c9_eco_ch1_7 (Factors of Production) and c8_eco_ch1_3 to c8_eco_ch1_6.',
          misconception: 'Students believe "For Whom to Produce" is primarily about moral fairness or government charity, and that market.',
          parts: [
                { id: 'a', prompt: 'In a simplified economy, total output is 1,000 units of grain. Factor payments are: Rent = ₹20,000, Wages = ₹50,000, Interest = ₹10,000, Profit = ₹20,000.', answer: 'Step 1: Total income = 20,000 + 50,000 + 10,000 + 20,000 = ₹1,00,000',
                  options: ['Step 1: Total income = 20,000 + 50,000 + 10,000 + 20,000 = ₹1,00,000', 'For Whom to Produce'],
                  hint: 'If stuck, revisit c9_eco_ch1_7 (Factors of Production) and c8_eco_ch1_3 to c8_eco_ch1_6 to solidify.',
                  misconception: 'Students believe "For Whom to Produce" is primarily about moral fairness or government charity, and that market distribution is \'unfair\'.' },
                { id: 'b', prompt: 'Compare the distribution outcome in two scenarios: (A) Market economy with no government intervention.', answer: 'Scenario A: Landlords 200, Workers 500, Capitalists 100, Entrepreneurs 200 units',
                  options: ['Scenario A: Landlords 200, Workers 500, Capitalists 100, Entrepreneurs 200 units', 'For Whom to Produce'],
                  hint: 'If stuck, revisit c9_eco_ch1_7 (Factors of Production) and c8_eco_ch1_3 to c8_eco_ch1_6 to solidify.',
                  misconception: 'Students believe "For Whom to Produce" is primarily about moral fairness or government charity, and that market distribution is \'unfair\'.' }
          ],
            remediations: { 'for-whom-to-produce-is': { steps: ['Revisit c9_eco_ch1_7 (Factors of Production) to relink factor ownership → factor payment → income → purchasing power.', 'Use a 2×2 table: Rows = Factor (Land, Labour, Capital, Entrepreneurship); Columns = Payment (Rent, Wages, Interest.', 'Fill with Indian examples (e.g., agricultural land rent in Punjab, software engineer wages in Bengaluru).', 'Calculate purchasing power for each factor owner at current prices (e.g., wheat ₹25/kg).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch1_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "For Whom to Produce" is primarily about moral fairness or government charity, and that market.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "India\'s Public Distribution System (PDS) solves the \'For Whom\' problem by ensuring food reaches the poor, so market distribution is.', answer: 'The statement is partially true but overstated',
                  options: ['The statement is partially true but overstated', 'For Whom to Produce'],
                  hint: 'If stuck, revisit c9_eco_ch1_7 (Factors of Production) and c8_eco_ch1_3 to c8_eco_ch1_6 to solidify.',
                  misconception: 'Students believe "For Whom to Produce" is primarily about moral fairness or government charity, and that market distribution is \'unfair\'.' },
                { id: 'b', prompt: 'Design a simple redistribution scheme for a village economy of 100 families: 20 landless (income ₹60,000/yr), 50 small farmers (₹1,20,000/yr), 30 large farmers.', answer: 'Total transfer needed = 20 × 12,000 = ₹2,40,000',
                  options: ['Total transfer needed = 20 × 12,000 = ₹2,40,000', 'For Whom to Produce'],
                  hint: 'If stuck, revisit c9_eco_ch1_7 (Factors of Production) and c8_eco_ch1_3 to c8_eco_ch1_6 to solidify.',
                  misconception: 'Students believe "For Whom to Produce" is primarily about moral fairness or government charity, and that market distribution is \'unfair\'.' }
          ],
            remediations: { 'for-whom-to-produce-is': { steps: ['Revisit c9_eco_ch1_7 (Factors of Production) to relink factor ownership → factor payment → income → purchasing power.', 'Use a 2×2 table: Rows = Factor (Land, Labour, Capital, Entrepreneurship); Columns = Payment (Rent, Wages, Interest.', 'Fill with Indian examples (e.g., agricultural land rent in Punjab, software engineer wages in Bengaluru).', 'Calculate purchasing power for each factor owner at current prices (e.g., wheat ₹25/kg).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch1_7', difficulty: 'standard',
          question: 'Factors of production are the scarce economic resources used to create goods.',
          hint: 'Revisit **c9_eco_ch1_3 (Choice and Opportunity Cost)** and **c9_eco_ch1_5 (How.',
          misconception: '**Money is Capital.** Students consistently treat "capital" as "money in the bank" or "financial investment".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Factors of production are the scarce economic resources used to create goods and',
                  options: ['Factors of production are the scarce economic resources used to create goods and', 'Scarcity is the fundamental economic problem arising', 'Public goods are goods characterized by **non-excludability** (impossible or extremely', 'India\'s Post-1991 Economic Reforms refer to the structural adjustment programme initiated'],
                  hint: 'Revisit **c9_eco_ch1_3 (Choice and Opportunity Cost)** and **c9_eco_ch1_5 (How to Produce)**.',
                  misconception: '**Money is Capital.** Students consistently treat "capital" as "money in the bank" or "financial investment".' }
          ],
            remediations: { 'money-is-capital': { steps: ['** Take a **bakery example**. Ask: "The owner borrows ₹5 lakh from a bank.', '** "The owner buys an oven (₹3 lakh) and a delivery van (₹2 lakh).', '** Show the **production function**: Q = f(Land, Labour, **Oven, Van**, Entrepreneurship). Money does not appear. **', '** Practice classification drills: "Classify: (a) ₹10,000 cash, (b) Delivery truck, (c) Factory building, (d) Shares.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch1_8', difficulty: 'standard',
          question: 'A planned economy is an economic system where a central authority (government).',
          hint: 'Revisit nodes c9_eco_ch1_4, c9_eco_ch1_5, c9_eco_ch1_6 (three fundamental questions) and.',
          misconception: 'Students believe a planned economy "solves" scarcity by eliminating competition and waste, while a market economy.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A planned economy is an economic system where a central authority (government) makes all',
                  options: ['A planned economy is an economic system where a central authority (government) makes all', 'Scarcity is the fundamental economic problem arising', 'Public goods are goods characterized by **non-excludability** (impossible or extremely', 'India\'s Post-1991 Economic Reforms refer to the structural adjustment programme initiated'],
                  hint: 'Revisit nodes c9_eco_ch1_4, c9_eco_ch1_5, c9_eco_ch1_6 (three fundamental questions) and.',
                  misconception: 'Students believe a planned economy "solves" scarcity by eliminating competition and waste, while a market economy "causes" scarcity through.' }
          ],
            remediations: { 'a-planned-economy-solves-scarcity': { steps: ['Show a 2-minute video comparing 1980s Indian ration shop queues (planned allocation) vs.', 'Give a data table: India\'s telephone density 1980 (0.6 per 100) vs.', 'Run a classroom activity: 5 students need pens, only 3 pens available. Version 1: Auction pens (market).', 'Connect to the definition: scarcity persists in both; the difference is the rationing mechanism - price vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch1_9', difficulty: 'standard',
          question: 'A mixed economy is an economic system that combines elements of both market.',
          hint: 'Revisit c9_eco_ch1_8 (Planned vs Market Economy) and create a two-column table listing.',
          misconception: 'Students believe a mixed economy means a fixed 50-50 split between government and private sectors, or that any.',
          parts: [
                { id: 'a', prompt: 'Why does a mixed economy retain the price mechanism for most goods instead of having the government set all prices like in a planned economy?', answer: 'The price mechanism efficiently conveys information about scarcity and consumer',
                  options: ['The price mechanism efficiently conveys information about scarcity and consumer', 'because the government cannot control everything', 'to make profits for private companies'],
                  hint: 'Revisit c9_eco_ch1_8 (Planned vs Market Economy) and create a two-column table listing one failure.',
                  misconception: 'Students believe a mixed economy means a fixed 50-50 split between government and private sectors, or that any government regulation makes.' }
          ],
            remediations: { 'a-mixed-economy-means-a': { steps: ['List 10 goods/services you used yesterday (electricity, school, phone, bus, food, etc.).', 'Classify each provider as Public Sector (govt owned), Private Sector (private owned), or PPP (partnership).', 'For each public sector item, ask: "Would a private firm provide this to a poor person in a remote village at.', 'For each private sector item, ask: "Does the government set safety/quality rules for this?" If yes, that\'s regulation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
