import type { SimDef } from '../../engine/types';
import C9_EconApplicationsInterdependenceSectorsPrimarySim from '../../../simulations/c6_12/C9_EconApplicationsInterdependenceSectorsPrimarySim';

/** v3 wrapped master — C9_EconApplicationsInterdependenceSectorsPrimarySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_econapplicationsinterdependencesectorsprimarysim: SimDef = {
    id: 'v3w_c9_econapplicationsinterdependencesectorsprimarysim',
    title: 'n Applications Interdependence Sectors Primary',
    subtitle: 'Covers the definition, characteristics, rewards, and interdependence of the four factors.',
    classLevel: 9, subject: 'economics', topic: 'Factors of Production: Land, Labour, Capital, Entrepreneurship',
    chapters: [],
    nodeIds: ['c9_eco_ch1_7', 'c9_eco_ch1_11', 'c9_eco_ch1_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine you are visiting a **small garment factory in Tirupur, Tamil Nadu**, that exports cotton T-shirts.', goal: 'Master n Applications Interdependence Sectors Primary.' },
    discovery: {
        question: 'Compare the pre-1991 FDI policy (maximum 40% equity cap, case-by-case approval via FIPB/FERA) with the post-1991 automatic approval route for 51% equity in 34.',
        options: ['Pre-1991, foreign capital was viewed with suspicion', 'FDI allowed', 'liberalisation meant the government stopped all regulation'],
        answer: 'Pre-1991, foreign capital was viewed with suspicion',
        hook: 'Students often believe "liberalisation meant the government stopped all regulation" — confusing liberalisation.',
    },
    teaching: [
        { title: 'Factors of production are the scarce.', text: 'Factors of production are the scarce economic resources used to create goods and services, classified into four categories: **Land** (all natural resources, reward: rent), **Labour** (human physical.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_eco_ch1_7', title: 'Factors of production are the scarce.',
          scaffold: { problem: 'A small **organic vegetable farm** near Bengaluru operates on 2 acres of leased land.',
            steps: [
            { text: 'Identify all physical inputs and classify them into the four factors. Land = 2 acres (leased).' },
            { text: 'Calculate explicit costs: Land Rent = ₹60,000 (explicit). Labour Wages = 3 × ₹12,000 × 12 = ₹4,32,000 (explicit).' },
            { text: 'Calculate implicit costs (opportunity costs): Farmer\'s own labour – assume he could earn ₹15,000/month elsewhere →.' },
            { text: 'Entrepreneurship (Profit) is a *residual* – not a cost in the same sense, but the *target* return.' },
            { text: 'Summarise Annual Factor Costs: Land = ₹60,000; Labour = ₹4,32,000 (explicit) + ₹1,80,000 (implicit) = ₹6,12,000;.', faded: true, blankAnswer: 'Land: ₹60,000; Labour: ₹6,12,000; Capital: ₹95,000;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_eco_ch1_11', title: 'India\'s Post-1991 Economic Reforms.',
          scaffold: { problem: 'A textile firm in 1990 wanted to expand capacity from 10,000 to 25,000 spindles. Under IDRA 1951, it needed an industrial licence.',
            steps: [
            { text: 'Identify the constraint — industrial licensing required government permission for capacity expansion, with bureaucratic.' },
            { text: 'Quantify time cost — 18 months delay (1.5 years) vs. 6 months (0.5 years) = 1 year saved per expansion decision.' },
            { text: 'Calculate output loss during delay — at 10,000 spindles producing 500 kg yarn/spindle/year, 1 year delay = 5 million kg.' },
            { text: 'Value the loss — at 1990 price ₹80/kg, forgone revenue = ₹400 million; at 20% profit margin, forgone profit = ₹80.' },
            { text: 'Interpret economically — licensing created deadweight loss by preventing profitable expansion; delicensing allowed.', faded: true, blankAnswer: 'Time saving = 1 year (12 months); Forgone output = 5.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_eco_ch1_9', title: 'A mixed economy is an economic system.',
          scaffold: { problem: 'The Government of India wants to ensure affordable electricity for all households.',
            steps: [
            { text: 'Identify the market failure: Private firms ignore rural areas because low density makes distribution unprofitable (high.' },
            { text: 'Identify the mixed economy tool: Direct public provision (public sector generation + distribution) to serve.' },
            { text: 'Analyze pricing: Government sets a lifeline tariff of ₹3/unit for first 100 units (merit good pricing) while charging.' },
            { text: 'Evaluate efficiency: Public sector may have higher operational losses (₹0.50/unit) due to lack of profit incentive, but.' },
            { text: 'Synthesize: The mixed economy uses public sector for *access/equity* (rural electrification) and price regulation for.', faded: true, blankAnswer: 'The government correctly uses public provision to correct a.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_eco_ch1_11', title: 'Identify each idea',
          dissect: { specimen: 'n Applications Interdependence Sectors Primary', spots: [
            { id: 's1', label: 'Factors of production are the', prompt: 'Which idea is this? — Factors of production are the scarce economic resources used to create goods and.', answer: 'Factors of production are the', options: ['Factors of production are the', 'Indias Post-1991 Economic Reforms refer', 'A mixed economy is an'] },
            { id: 's2', label: 'Indias Post-1991 Economic Reforms refer', prompt: 'Which idea is this? — India\'s Post-1991 Economic Reforms refer to the structural adjustment programme initiated.', answer: 'Indias Post-1991 Economic Reforms refer', options: ['Indias Post-1991 Economic Reforms refer', 'Factors of production are the', 'A mixed economy is an'] },
            { id: 's3', label: 'A mixed economy is an', prompt: 'Which idea is this? — A mixed economy is an economic system that combines elements of both market economies and.', answer: 'A mixed economy is an', options: ['A mixed economy is an', 'Factors of production are the', 'Indias Post-1991 Economic Reforms refer'] }
          ] } }
    ],
    explore: { component: C9_EconApplicationsInterdependenceSectorsPrimarySim, prompt: 'Explore the interactive — n Applications Interdependence Sectors Primary' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_eco_ch1_7', difficulty: 'standard',
          question: 'Factors of production are the scarce economic resources used to create goods.',
          hint: 'Revisit **c9_eco_ch1_3 (Choice and Opportunity Cost)** and **c9_eco_ch1_5 (How to.',
          misconception: '**Money is Capital.** Students consistently treat "capital" as "money in the bank" or "financial investment".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Factors of production are the scarce economic resources used to create goods and',
                  options: ['Factors of production are the scarce economic resources used to create goods and', 'India\'s Post-1991 Economic Reforms refer to the structural adjustment programme initiated', 'A mixed economy is an economic system that combines elements of both market economies and'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Money is Capital.** Students consistently treat "capital" as "money in the bank" or "financial investment".' }
          ],
            remediations: { 'money-is-capital': { steps: ['** Take a **bakery example**. Ask: "The owner borrows ₹5 lakh from a bank.', '** "The owner buys an oven (₹3 lakh) and a delivery van (₹2 lakh).', '** Show the **production function**: Q = f(Land, Labour, **Oven, Van**, Entrepreneurship). Money does not appear. **', '** Practice classification drills: "Classify: (a) ₹10,000 cash, (b) Delivery truck, (c) Factory building, (d) Shares in.', '** Link to **Interest** – interest is paid for the *use of money* to *acquire* capital; the factor reward for capital.'] } } },
        { type: 'subpart', nodeId: 'c9_eco_ch1_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Money is Capital.** Students consistently treat "capital" as "money in the bank" or "financial investment".',
          parts: [
                { id: 'a', prompt: '"India has abundant labour but scarce capital. Therefore, the government should *always* promote labour-intensive techniques (like handlooms, MGNREGA) and.', answer: 'The statement is **partially correct but economically incomplete**',
                  options: ['The statement is **partially correct but economically incomplete**', 'How to Produce'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Money is Capital.** Students consistently treat "capital" as "money in the bank" or "financial investment".' }
          ],
            remediations: { 'money-is-capital': { steps: ['** Take a **bakery example**. Ask: "The owner borrows ₹5 lakh from a bank.', '** "The owner buys an oven (₹3 lakh) and a delivery van (₹2 lakh).', '** Show the **production function**: Q = f(Land, Labour, **Oven, Van**, Entrepreneurship). Money does not appear. **', '** Practice classification drills: "Classify: (a) ₹10,000 cash, (b) Delivery truck, (c) Factory building, (d) Shares in.', '** Link to **Interest** – interest is paid for the *use of money* to *acquire* capital; the factor reward for capital.'] } } },
        { type: 'subpart', nodeId: 'c9_eco_ch1_11', difficulty: 'standard',
          question: 'India\'s Post-1991 Economic Reforms refer to the structural adjustment programme.',
          hint: 'If stuck, revisit c9_eco_ch1_8 (Planned vs Market Economy) and c9_eco_ch1_9 (Mixed.',
          misconception: 'Students often believe "liberalisation meant the government stopped all regulation" — confusing liberalisation.',
          parts: [
                { id: 'a', prompt: 'Compare the pre-1991 FDI policy (maximum 40% equity cap, case-by-case approval via FIPB/FERA) with the post-1991 automatic approval route for 51% equity in 34.', answer: 'Pre-1991, foreign capital was viewed with suspicion',
                  options: ['Pre-1991, foreign capital was viewed with suspicion', 'FDI allowed', 'liberalisation meant the government stopped all regulation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "liberalisation meant the government stopped all regulation" — confusing liberalisation (removing entry/production.' }
          ],
            remediations: { 'liberalisation-meant-the-government-stopped': { steps: ['If the student holds this misconception, conduct a three-step remediation: (1) Create a two-column table: Pre-1991.', 'Post-1991 Regulations (Environmental Clearance, SEBI ICDR norms, Competition Act, RBI prudential norms, FEMA 1999.', '(2) Use the Maruti Suzuki case: pre-1991 required licence + MRTP + FERA (for Suzuki JV); post-1991 second plant needed.', '(3) Ask student to identify which controls were *removed* (licensing, MRTP asset threshold, CCI pricing, FERA criminal.'] } } },
        { type: 'subpart', nodeId: 'c9_eco_ch1_11', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "liberalisation meant the government stopped all regulation" — confusing liberalisation.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The 1991 financial sector reforms (interest rate deregulation, CRR/SLR reduction, entry of private banks) were less important than.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'liberalisation meant the government stopped all regulation', 'liberalisation caused unchecked pollution'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "liberalisation meant the government stopped all regulation" — confusing liberalisation (removing entry/production.' },
                { id: 'b', prompt: 'Construct a policy brief (150 words) for a state government in 1995 arguing why it should align its state-level industrial policies with the central.', answer: 'A strong brief cites: (1) Industrial delicensing',
                  options: ['A strong brief cites: (1) Industrial delicensing', 'liberalisation meant the government stopped all regulation', 'liberalisation caused unchecked pollution'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "liberalisation meant the government stopped all regulation" — confusing liberalisation (removing entry/production.' },
                { id: 'c', prompt: 'Compare the pre-1991 FDI policy (maximum 40% equity cap, case-by-case approval via FIPB/FERA) with the post-1991 automatic approval route for 51% equity in 34.', answer: 'Pre-1991, foreign capital was viewed with suspicion',
                  options: ['Pre-1991, foreign capital was viewed with suspicion', 'FDI allowed', 'liberalisation meant the government stopped all regulation', 'liberalisation caused unchecked pollution'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "liberalisation meant the government stopped all regulation" — confusing liberalisation (removing entry/production.' }
          ],
            remediations: { 'liberalisation-meant-the-government-stopped': { steps: ['If the student holds this misconception, conduct a three-step remediation: (1) Create a two-column table: Pre-1991.', 'Post-1991 Regulations (Environmental Clearance, SEBI ICDR norms, Competition Act, RBI prudential norms, FEMA 1999.', '(2) Use the Maruti Suzuki case: pre-1991 required licence + MRTP + FERA (for Suzuki JV); post-1991 second plant needed.', '(3) Ask student to identify which controls were *removed* (licensing, MRTP asset threshold, CCI pricing, FERA criminal.'] } } },
        { type: 'subpart', nodeId: 'c9_eco_ch1_9', difficulty: 'standard',
          question: 'A mixed economy is an economic system that combines elements of both market.',
          hint: 'Revisit c9_eco_ch1_8 (Planned vs Market Economy) and create a two-column table listing.',
          misconception: 'Students believe a mixed economy means a fixed 50-50 split between government and private sectors, or that any.',
          parts: [
                { id: 'a', prompt: 'Why does a mixed economy retain the price mechanism for most goods instead of having the government set all prices like in a planned economy?', answer: 'The price mechanism efficiently conveys information about scarcity and consumer',
                  options: ['The price mechanism efficiently conveys information about scarcity and consumer', 'because the government cannot control everything', 'to make profits for private companies'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe a mixed economy means a fixed 50-50 split between government and private sectors, or that any government regulation makes.' }
          ],
            remediations: { 'a-mixed-economy-means-a': { steps: ['List 10 goods/services you used yesterday (electricity, school, phone, bus, food, etc.).', 'Classify each provider as Public Sector (govt owned), Private Sector (private owned), or PPP (partnership).', 'For each public sector item, ask: "Would a private firm provide this to a poor person in a remote village at an.', 'For each private sector item, ask: "Does the government set safety/quality rules for this?" If yes, that\'s regulation.', 'Realize mixed economy = ownership mix + regulatory framework + social objectives, not a mathematical split.'] } } },
        { type: 'subpart', nodeId: 'c9_eco_ch1_9', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe a mixed economy means a fixed 50-50 split between government and private sectors, or that any.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "India\'s mixed economy has failed because the government still runs loss-making enterprises like Air India (before privatization) and.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'profit-only'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe a mixed economy means a fixed 50-50 split between government and private sectors, or that any government regulation makes.' }
          ],
            remediations: { 'a-mixed-economy-means-a': { steps: ['List 10 goods/services you used yesterday (electricity, school, phone, bus, food, etc.).', 'Classify each provider as Public Sector (govt owned), Private Sector (private owned), or PPP (partnership).', 'For each public sector item, ask: "Would a private firm provide this to a poor person in a remote village at an.', 'For each private sector item, ask: "Does the government set safety/quality rules for this?" If yes, that\'s regulation.', 'Realize mixed economy = ownership mix + regulatory framework + social objectives, not a mathematical split.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
