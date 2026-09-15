import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bs_ch01_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bs_ch01_p2: SimDef = {
    id: 'v3_c11_bs_ch01_p2',
    title: 'Business, Trade and Commerce · Part 2/2',
    subtitle: 'Reopen the ledgers of a subcontinent that once held a third of the world\'s economy.',
    classLevel: 11, subject: 'business_studies', topic: 'Business, Trade and Commerce · Part 2/2',
    chapters: ['c11_bs_ch01'],
    nodeIds: ['c11_bs_cbse_01_007', 'c11_bs_cbse_01_008', 'c11_bs_cbse_01_009', 'c11_bs_cbse_01_010', 'c11_bs_cbse_01_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a historian auditing medieval India\'s commercial machinery', intro: 'The records show India was the world\'s sink for precious metals. Your task: find the machinery — routes, goods, and credit — that pulled them in.', goal: 'Explain ancient Indian trade routes, exports and imports, the Hundi system, and the shift in India\'s share of the world economy.' },
    discovery: {
        question: 'A 15th-century merchant in Surat needs to move a fortune to a partner in Cairo — but carrying chests of silver across the Indian Ocean invites pirates and thieves. How did Indian merchants transfer money without moving a single coin?',
        options: ['The Hundi — a written credit instrument the partner could present to a banker in Cairo for payment', 'Letters of credit issued by the British East India Company', 'Digital bank transfers via Indian Ocean trade guilds', 'Bartering spices directly for foreign goods at every port'],
        answer: 'The Hundi — a written credit instrument the partner could present to a banker in Cairo for payment',
        hook: 'India\'s early commercial dominance rested on financial engineering, not just spices — the Hundi solved long-distance payment centuries before wire transfers.',
    },
    teaching: [
        { title: 'Trade: Internal and External Trade', text: 'Trade is the branch of commerce concerned with the buying, selling, and exchange of goods and services.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bs_cbse_01_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Reconstruct why India held a giant share of the world economy: map its export commodities and trade routes, explain the Hundi\'s security logic, and trace the collapse of that share under colonial rule.',
        labels: ['Trade: Internal and External', 'Auxiliaries to Trade: Banking,', 'Objectives of Business: Economic', 'Business Risk: Nature', 'Role of Profit'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_bs_cbse_01_007', title: 'Trade: Internal and External Trade',
          caseStudy: { intro: 'Imagine you buy a smartphone from a local shop in Delhi. That shop bought it from a distributor in Mumbai, who imported it from a manufacturer in China.',
            decisions: [{ prompt: 'A trader in Kolkata purchases 500 kg of tea from a plantation in Assam and sells it to a retailer in Mumbai.', options: [
                { text: 'This is internal wholesale trade', outcome: 'This is internal wholesale trade. Criterion 1 (geographical): both buyer and seller are within.' },
                { text: 'wholesale trade means selling in large quantities', outcome: 'Not quite — Students often believe that "wholesale trade means selling in large quantities" and "retail trade.', reveals: 'wholesale-trade-means-selling-in' },
                { text: 'retail trade means selling in small quantities', outcome: 'Not quite — Students often believe that "wholesale trade means selling in large quantities" and "retail trade.', reveals: 'wholesale-trade-means-selling-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_01_008', title: 'Auxiliaries to Trade: Banking, Insurance, Transport and Warehousing',
          caseStudy: { intro: 'Imagine you are a mango farmer in Ratnagiri, Maharashtra. Your mangoes are ready in April, but your buyers are in Delhi, Mumbai, and Dubai.',
            decisions: [{ prompt: 'Name the auxiliary to trade that removes the hindrance of place and the auxiliary that removes the hindrance of time.', options: [
                { text: 'Transport removes the hindrance of place by moving goods from production centres to', outcome: 'Transport removes the hindrance of place by moving goods from production centres to markets.' },
                { text: 'services', outcome: 'Not quite — Students often think auxiliaries are only "services" like banking and insurance, and forget that.', reveals: 'auxiliaries-are-only-services-like' },
                { text: 'hindrance of person', outcome: 'Not quite — Students often think auxiliaries are only "services" like banking and insurance, and forget that.', reveals: 'auxiliaries-are-only-services-like' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_01_009', title: 'Objectives of Business: Economic and Social Objectives',
          caseStudy: { intro: 'Imagine you\'re starting a small cloud kitchen in Bengaluru serving healthy millet-based meals.',
            decisions: [{ prompt: 'State the six major objectives of business as classified in NCERT Class 11 Business Studies, and identify which one is explicitly.', options: [
                { text: 'The six objectives are: (1) Market standing, (2) Innovation, (3) Productivity, (4)', outcome: 'The six objectives are: (1) Market standing, (2) Innovation, (3) Productivity, (4) Physical and.' },
                { text: 'customer satisfaction', outcome: 'Not quite — Students treat "profit" and "social responsibility" as mutually exclusive opposites: either.', reveals: 'students-treat-profit-and-social' },
                { text: 'growth', outcome: 'Not quite — Students treat "profit" and "social responsibility" as mutually exclusive opposites: either.', reveals: 'students-treat-profit-and-social' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_01_010', title: 'Business Risk: Nature and Causes',
          caseStudy: { intro: 'Imagine you start a small cloud kitchen business selling biryani. You invest ₹2 lakh in equipment and ingredients.',
            decisions: [{ prompt: 'Define business risk as per NCERT Class 11. How does it differ from the general dictionary meaning of "risk"?', options: [
                { text: 'Business risk is the possibility of inadequate profits or losses due to', outcome: 'Business risk is the possibility of inadequate profits or losses due to uncertainties/unexpected.' },
                { text: 'risk of losing money in stock market', outcome: 'Not quite — Students often think "business risk = probability of loss" and try to calculate it mathematically.', reveals: 'business-risk-probability-of-loss' },
                { text: 'business risk = probability of loss', outcome: 'Not quite — Students often think "business risk = probability of loss" and try to calculate it mathematically.', reveals: 'business-risk-probability-of-loss' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_01_011', title: 'Role of Profit in Business and Profit Maximisation vs Service',
          caseStudy: { intro: 'Imagine you start a small cloud kitchen selling healthy tiffin boxes to office workers in Bengaluru.',
            decisions: [{ prompt: 'Define \'profit\' in the context of business studies and state its formula using the terms \'total revenue\' and \'total cost\'.', options: [
                { text: 'Profit = Total Revenue – Total Cost (including both explicit and implicit costs)', outcome: 'Profit = Total Revenue – Total Cost (including both explicit and implicit costs).' },
                { text: 'Profit = Selling Price – Cost Price', outcome: 'Not quite — Students believe "profit maximisation" means "earn as much money as possible by any means" and that.', reveals: 'profit-maximisation-means-earn-as' },
                { text: 'profit maximisation', outcome: 'Not quite — Students believe "profit maximisation" means "earn as much money as possible by any means" and that.', reveals: 'profit-maximisation-means-earn-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your commerce club is staging an exhibition on \'How Indian merchants paid each other in 1600\'. One exhibit shows a Surat merchant who needs to pay a Calicut spice supplier. A teammate scripts it as: \'He loads gold coins on a bullock cart and hopes they arrive — India ran on barter before the British brought banking.\'',
            decisions: [{ prompt: 'Fix the script so it\'s historically accurate.', options: [
                { text: 'Show him issuing a Hundi — a negotiable credit instrument: his banker in Surat takes the money and writes a Hundi payable to the Calicut supplier, who presents it to a local banker for payment; the two bankers settle later through offsetting trade flows. No coins cross the country.', outcome: 'India had indigenous credit networks and instruments centuries before colonial rule; barter-and-coins undersells a system that made India a top global economy.' },
                { text: 'Keep the barter script — without banks, long-distance payment meant physically moving valuables or swapping goods.', outcome: 'The Hundi system solved exactly this problem: community-trust credit transfer between merchant-bankers, documented since early medieval inscriptions.', reveals: 'ancient-india-barter-only' },
                { text: 'Have the merchant use a British-style bill of exchange — India\'s own instruments were too primitive for inter-city trade.', outcome: 'Hundi predates and parallels European bills; treating credit as a Western import erases a documented indigenous banking tradition.', reveals: 'credit-is-western-import' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_01_011', title: 'You made it',
          caseStudy: { intro: 'You saw that prosperity was a system — production, trade routes, and credit instruments working together — and systems can be dismantled.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_01_007', difficulty: 'standard',
          question: 'Trade is the branch of commerce concerned with the buying, selling, and.',
          hint: 'Revisit c11_bs_cbse_01_006 (Commerce: Trade and Auxiliaries to Trade) — specifically the.',
          misconception: 'Students often believe that "wholesale trade means selling in large quantities" and "retail trade means selling.',
          parts: [
                { id: 'a', prompt: 'A trader in Kolkata purchases 500 kg of tea from a plantation in Assam and sells it to a retailer in Mumbai.', answer: 'This is internal wholesale trade',
                  options: ['This is internal wholesale trade', 'wholesale trade means selling in large quantities', 'retail trade means selling in small quantities'],
                  hint: 'Revisit c11_bs_cbse_01_006 (Commerce: Trade and Auxiliaries to Trade) — specifically the section.',
                  misconception: 'Students often believe that "wholesale trade means selling in large quantities" and "retail trade means selling in small quantities,".' },
                { id: 'b', prompt: '"All trade is internal trade because goods ultimately reach consumers within a country." Evaluate this statement and explain the conceptual error it contains.', answer: 'The statement is false',
                  options: ['The statement is false', 'wholesale trade means selling in large quantities', 'retail trade means selling in small quantities'],
                  hint: 'Revisit c11_bs_cbse_01_006 (Commerce: Trade and Auxiliaries to Trade) — specifically the section.',
                  misconception: 'Students often believe that "wholesale trade means selling in large quantities" and "retail trade means selling in small quantities,".' },
                { id: 'c', prompt: 'An Indian company buys raw cotton from farmers in Gujarat, processes it into yarn, and sells the yarn to a textile mill in Bangladesh.', answer: 'Transaction 1 (farmers to company): Internal trade',
                  options: ['Transaction 1 (farmers to company): Internal trade', 'wholesale trade means selling in large quantities', 'retail trade means selling in small quantities'],
                  hint: 'Revisit c11_bs_cbse_01_006 (Commerce: Trade and Auxiliaries to Trade) — specifically the section.',
                  misconception: 'Students often believe that "wholesale trade means selling in large quantities" and "retail trade means selling in small quantities,".' },
                { id: 'd', prompt: 'Compare and contrast wholesale trade and entrepôt trade on three parameters: (a) geographical scope, (b) role in distribution chain, (c) direction of goods.', answer: 'geographical scope, (',
                  options: ['geographical scope, (', 'wholesale trade means selling in large quantities', 'retail trade means selling in small quantities'],
                  hint: 'Revisit c11_bs_cbse_01_006 (Commerce: Trade and Auxiliaries to Trade) — specifically the section.',
                  misconception: 'Students often believe that "wholesale trade means selling in large quantities" and "retail trade means selling in small quantities,".' }
          ],
            remediations: { 'wholesale-trade-means-selling-in': { steps: ['Ask the student to define "final consumer" vs "trader" in their own words.', 'Present two scenarios: (a) A bakery buys 50 kg flour from a mill; (b) A household buys 50 kg flour from a wholesale.', 'Guide them to see that (a) is wholesale because the bakery uses flour for business (resale as bread), while (b).', 'Have them re-state the definition using "intended use" not "quantity."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "wholesale trade means selling in large quantities" and "retail trade means selling.',
          parts: [
                { id: 'a', prompt: '"A country with a large entrepôt trade sector does not need a strong manufacturing base." Critically evaluate this claim with reference to the nature.', answer: 'The claim is flawed',
                  options: ['The claim is flawed', 'wholesale trade means selling in large quantities', 'retail trade means selling in small quantities'],
                  hint: 'Revisit c11_bs_cbse_01_006 (Commerce: Trade and Auxiliaries to Trade) — specifically the section.',
                  misconception: 'Students often believe that "wholesale trade means selling in large quantities" and "retail trade means selling in small quantities,".' },
                { id: 'b', prompt: 'Design a flowchart that traces a single product (e.g., coffee beans) from an Ethiopian farmer to a consumer in Jaipur, labeling each trade transaction.', answer: 'A valid flowchart: 1',
                  options: ['A valid flowchart: 1', 'wholesale trade means selling in large quantities', 'retail trade means selling in small quantities'],
                  hint: 'Revisit c11_bs_cbse_01_006 (Commerce: Trade and Auxiliaries to Trade) — specifically the section.',
                  misconception: 'Students often believe that "wholesale trade means selling in large quantities" and "retail trade means selling in small quantities,".' }
          ],
            remediations: { 'wholesale-trade-means-selling-in': { steps: ['Ask the student to define "final consumer" vs "trader" in their own words.', 'Present two scenarios: (a) A bakery buys 50 kg flour from a mill; (b) A household buys 50 kg flour from a wholesale.', 'Guide them to see that (a) is wholesale because the bakery uses flour for business (resale as bread), while (b).', 'Have them re-state the definition using "intended use" not "quantity."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_01_008', difficulty: 'standard',
          question: 'Auxiliaries to trade are support services that facilitate the smooth exchange.',
          hint: 'Revisit c11_bs_cbse_01_006 "Commerce: Trade and Auxiliaries to Trade" and identify the.',
          misconception: 'Students often think auxiliaries are only "services" like banking and insurance, and forget that transport and.',
          parts: [
                { id: 'a', prompt: 'A manufacturer in Surat produces synthetic fabric. He stores the fabric in a godown for three months until the festival season.', answer: 'Storing in godown → hindrance of time (warehousing)',
                  options: ['Storing in godown → hindrance of time (warehousing)', 'services', 'hindrance of person', 'hindrance of place'],
                  hint: 'Revisit c11_bs_cbse_01_006 "Commerce: Trade and Auxiliaries to Trade" and identify the six.',
                  misconception: 'Students often think auxiliaries are only "services" like banking and insurance, and forget that transport and warehousing are also.' }
          ],
            remediations: { 'auxiliaries-are-only-services-like': { steps: ['If a student confuses trade with transport, draw a two-column table: Column A "Trade" (transfer of ownership, e.g.', 'Give a concrete scenario: "Farmer sells wheat to miller — trade.', 'Wheat loaded on truck and driven to mill — transport." Ask the student to label each step.', 'Repeat with warehousing (storage) vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_01_009', difficulty: 'standard',
          question: 'Objectives of business are the specific, measurable goals that a business.',
          hint: 'If stuck, revisit c11_bs_cbse_01_003 "Business: Characteristics and Economic Activities".',
          misconception: 'Students treat "profit" and "social responsibility" as mutually exclusive opposites: either a business is ruthless and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Objectives of business are the specific, measurable goals that a business enterprise aims',
                  options: ['Objectives of business are the specific, measurable goals that a business enterprise aims', 'The history of trade and commerce in India traces the evolution of economic exchange from', 'Business, profession, and employment are three distinct categories of economic', 'Business is an economic activity involving the regular production, procurement, and'],
                  hint: 'If stuck, revisit c11_bs_cbse_01_003 "Business: Characteristics and Economic Activities".',
                  misconception: 'Students treat "profit" and "social responsibility" as mutually exclusive opposites: either a business is ruthless and profitable, or it\'s.' }
          ],
            remediations: { 'students-treat-profit-and-social': { steps: ['Ask the student to list three Indian companies they admire (e.g., Tata, Amul, Infosys).', 'For each, identify: (a) How they make profit, (b) One social responsibility practice *integrated into operations* (not.', 'Show NCERT lines: "Profit is the reward for risk taking" AND "Social responsibility refers to obligation...', 'Have them re-write their earlier answer replacing "CSR = charity" with "Social responsibility = sustainable business.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_01_010', difficulty: 'standard',
          question: 'Business risk refers to the possibility of inadequate profits or even losses.',
          hint: 'If stuck, revisit c11_bs_cbse_01_003 (Business Characteristics) — specifically the.',
          misconception: 'Students often think "business risk = probability of loss" and try to calculate it mathematically like a math.',
          parts: [
                { id: 'a', prompt: 'Define business risk as per NCERT Class 11. How does it differ from the general dictionary meaning of "risk"?', answer: 'Business risk is the possibility of inadequate profits or losses due to',
                  options: ['Business risk is the possibility of inadequate profits or losses due to', 'risk of losing money in stock market', 'business risk = probability of loss'],
                  hint: 'If stuck, revisit c11_bs_cbse_01_003 (Business Characteristics) — specifically the "Uncertainty.',
                  misconception: 'Students often think "business risk = probability of loss" and try to calculate it mathematically like a math probability problem.' },
                { id: 'b', prompt: 'A farmer grows wheat. Classify each event into the four cause categories: (a) Flood destroys crop, (b) Labourers go on strike during harvest, (c) Government.', answer: 'Flood destroys crop, (',
                  options: ['Flood destroys crop, (', 'business risk = probability of loss'],
                  hint: 'If stuck, revisit c11_bs_cbse_01_003 (Business Characteristics) — specifically the "Uncertainty.',
                  misconception: 'Students often think "business risk = probability of loss" and try to calculate it mathematically like a math probability problem.' }
          ],
            remediations: { 'business-risk-probability-of-loss': { steps: ['Ask the student to list 5 uncertainties in a tea stall business (weather, milk price, customer taste, power cut, staff.', 'Have them categorise each into natural/human/economic/other using the NCERT definitions.', 'Explicitly contrast: "In math, risk = P(loss) × Amount. In business, risk = the UNCERTAINTY ITSELF that creates the.', 'Give a case where probability is unknown (e.g., new government policy) — ask "What is the probability?" to show it\'s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_01_011', difficulty: 'standard',
          question: 'Profit in business is the financial surplus remaining after deducting all.',
          hint: 'Revisit c9_eco_ch1_3 (Choice and Opportunity Cost) to grasp implicit costs, and.',
          misconception: 'Students believe "profit maximisation" means "earn as much money as possible by any means" and that "service motive".',
          parts: [
                { id: 'a', prompt: 'Define \'profit\' in the context of business studies and state its formula using the terms \'total revenue\' and \'total cost\'.', answer: 'Profit = Total Revenue – Total Cost (including both explicit and implicit costs)',
                  options: ['Profit = Total Revenue – Total Cost (including both explicit and implicit costs)', 'Profit = Selling Price – Cost Price', 'profit maximisation', 'earn as much money as possible by any means'],
                  hint: 'Revisit c9_eco_ch1_3 (Choice and Opportunity Cost) to grasp implicit costs, and c8_math_ch8_7.',
                  misconception: 'Students believe "profit maximisation" means "earn as much money as possible by any means" and that "service motive" means "work for.' },
                { id: 'b', prompt: 'A student argues: "If profit is the reward for risk, then a business should always try to maximise profit because higher risk deserves higher reward." Explain.', answer: 'The reasoning is flawed',
                  options: ['The reasoning is flawed', 'profit maximisation', 'earn as much money as possible by any means', 'service motive'],
                  hint: 'Revisit c9_eco_ch1_3 (Choice and Opportunity Cost) to grasp implicit costs, and c8_math_ch8_7.',
                  misconception: 'Students believe "profit maximisation" means "earn as much money as possible by any means" and that "service motive" means "work for.' },
                { id: 'c', prompt: 'A cloud kitchen owner reduces ingredient quality to increase profit margin from 5% to 15%. Within three months, orders drop 40% and two delivery partners quit.', answer: 'Sacrificed objectives: (1) Market standing',
                  options: ['Sacrificed objectives: (1) Market standing', 'profit maximisation', 'earn as much money as possible by any means', 'service motive'],
                  hint: 'Revisit c9_eco_ch1_3 (Choice and Opportunity Cost) to grasp implicit costs, and c8_math_ch8_7.',
                  misconception: 'Students believe "profit maximisation" means "earn as much money as possible by any means" and that "service motive" means "work for.' }
          ],
            remediations: { 'profit-maximisation-means-earn-as': { steps: ['Ask the student to calculate how many months a business with ₹5 lakh monthly expenses can survive with zero profit and.', 'Show NCERT line: "Profit is the reward for risk taking" — connect to the 2-month survival: no profit = no reward =.', 'Contrast "maximising profit" (NCERT: "reasonable profit which is so important for its survival and growth") with.', 'Have student rewrite their answer using "reasonable profit" and "multiple objectives" terminology.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
