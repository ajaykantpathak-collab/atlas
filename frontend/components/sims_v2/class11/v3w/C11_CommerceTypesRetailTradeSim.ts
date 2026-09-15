import type { SimDef } from '../../engine/types';
import C11_CommerceTypesRetailTradeSim from '../../../simulations/c6_12/C11_CommerceTypesRetailTradeSim';

/** v3 wrapped master — C11_CommerceTypesRetailTradeSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_commercetypesretailtradesim: SimDef = {
    id: 'v3w_c11_commercetypesretailtradesim',
    title: 'Types Retail Trade',
    subtitle: 'This node covers the meaning, classification (wholesale vs retail), and economic.',
    classLevel: 11, subject: 'business_studies', topic: 'Internal Trade: Meaning, Types and Importance',
    chapters: [],
    nodeIds: ['c11_bs_cbse_10_001', 'c11_bs_cbse_10_002', 'c11_bs_cbse_10_003', 'c11_bs_cbse_10_008', 'c11_bs_cbse_10_011', 'c11_bs_cbse_01_007', 'c11_bs_cbse_10_006', 'c11_bs_cbse_10_009', 'c11_bs_cbse_10_004', 'c11_bs_cbse_10_005', 'c11_bs_cbse_10_007', 'c11_bs_cbse_01_004', 'c11_bs_cbse_01_005', 'c11_bs_cbse_01_006', 'c11_bs_cbse_01_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you walk into your neighbourhood kirana store to buy a packet of biscuits — that biscuit was.', goal: 'Master Types Retail Trade.' },
    discovery: {
        question: 'A farmer in Punjab sells wheat to a flour mill in Punjab. The flour mill sells flour to a wholesaler in Delhi. The wholesaler sells to a retailer in Mumbai.',
        options: ['All four transactions are internal trade', 'internal trade', 'local trade'],
        answer: 'All four transactions are internal trade',
        hook: 'Students believe "internal trade = local trade within a city/state" and "external trade = trade between states." They.',
    },
    teaching: [
        { title: 'Internal trade refers to the buying and.', text: 'Internal trade refers to the buying and selling of goods and services within the geographical boundaries of a nation, where no custom duty or import duty is levied because goods are part of domestic.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_bs_cbse_10_001', title: 'Internal trade refers to the buying and.',
          scaffold: { problem: 'A cotton farmer in Maharashtra sells 500 quintals of raw cotton to a ginning factory in Maharashtra.',
            steps: [
            { text: 'Identify the five transactions in the chain: (1) Farmer → Ginning factory, (2) Ginning factory → Spinning mill, (3).' },
            { text: 'Recall NCERT definitions: Wholesale trade = purchase/sale in large quantities for resale or intermediate use.' },
            { text: 'Analyze Transaction 1: Farmer sells raw cotton (agricultural produce) to factory for processing.' },
            { text: 'Analyze Transaction 2: Ginning factory sells ginned cotton to spinning mill for further production (intermediate use).' },
            { text: 'Analyze Transaction 3: Spinning mill sells yarn to wholesale merchant for resale.' },
            { text: 'Analyze Transaction 4: Wholesale merchant sells cloth to retailer for resale.' },
            { text: 'Analyze Transaction 5: Retailer sells 50 meters to consumer for final use. Small quantity, buyer is ultimate consumer.', faded: true, blankAnswer: 'Transaction 1: Neither (primary produce sale). Transaction.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_10_002', title: 'Wholesale trade refers to the purchase.',
          scaffold: { problem: 'M/s Gupta Wholesalers purchases 10,000 kg of Basmati rice from a mill in Haryana at ₹40/kg.',
            steps: [
            { text: 'Calculate purchase cost = 10,000 kg × ₹40/kg = ₹4,00,000.' },
            { text: 'Sum all operational costs: Transportation ₹50,000 + Warehousing ₹30,000 + Grading/Packing ₹20,000 = ₹1,00,000.' },
            { text: 'Total cost = Purchase cost + Operational costs = ₹4,00,000 + ₹1,00,000 = ₹5,00,000.' },
            { text: 'Total revenue = 1,800 bags × ₹250/bag = ₹4,50,000. (Note: 1,800 bags × 5 kg = 9,000 kg sold; 1,000 kg may be.' },
            { text: 'Gross profit = Revenue - Total cost = ₹4,50,000 - ₹5,00,000 = -₹50,000 (loss).' },
            { text: 'Map costs to functions: Transportation → transportation function; Warehousing → storage function; Grading/Packing →.', faded: true, blankAnswer: '(a) ₹5,00,000 (b) ₹4,50,000 (c) -₹50,000 (loss) (d).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_10_003', title: 'Retail trade refers to the business.',
          scaffold: { problem: 'A consumer cooperative store purchases 500 kg of wheat flour from a miller at Rs 28/kg and sells it to 200 member-families in 1 kg packs at.',
            steps: [
            { text: 'Identify the retailer type — consumer cooperative store (fixed-shop large retailer, owned by consumers).' },
            { text: 'Calculate total revenue — 200 families × 1 kg × Rs 32/kg = Rs 6,400.' },
            { text: 'Calculate cost of goods sold — 500 kg × Rs 28/kg = Rs 14,000. Wait, only 200 kg sold!' },
            { text: 'Calculate total expenses — Packaging Rs 1,500 + Transport Rs 2,000 + Rent Rs 3,000 = Rs 6,500.' },
            { text: 'Calculate profit/loss — Revenue Rs 6,400 - COGS Rs 5,600 - Expenses Rs 6,500 = Loss of Rs 5,700.' },
            { text: 'Identify services demonstrated — (i) Regular availability (members get flour monthly), (ii) Lower prices (Rs 32 vs.', faded: true, blankAnswer: 'Monthly loss of Rs 5,700. Services demonstrated: regular.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_10_008', title: 'Mail order houses are retail trading.',
          scaffold: { problem: 'A manufacturer of Ayurvedic hair oil (standardised, non-perishable, 200ml bottles, MRP ₹180, weight 250g per bottle) wants to launch a mail.',
            steps: [
            { text: 'Identify all variable costs per order. Product cost = ₹90 per bottle.' },
            { text: 'Express total variable cost for an order of \'n\' bottles. TVC = 90n + 50 (for 1-2 bottles) + 0.05 × 180n + 500 = 90n +.' },
            { text: 'Revenue per order = MRP × n = 180n.' },
            { text: 'Set Revenue ≥ TVC for break-even: 180n ≥ 99n + 550 → 81n ≥ 550 → n ≥ 6.79.' },
            { text: 'Since bottles are discrete, minimum n = 7 bottles per order. But parcel post covers only 2 bottles (500g); for 7.' },
            { text: 'Minimum viable order size = 10 bottles.', faded: true, blankAnswer: 'Minimum 10 bottles per order to cover variable costs.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_10_011', title: 'Wholesale trade refers to the purchase.',
          scaffold: { problem: 'A manufacturer produces 50,000 units of a toy at a cost of ₹80/unit.',
            steps: [
            { text: 'Identify cost price and selling price for each entity. Manufacturer\'s cost = ₹80.' },
            { text: 'Calculate absolute margin per unit for each. Manufacturer (on A) = 120-80 = ₹40. Manufacturer (on B) = 115-80 = ₹35.' },
            { text: 'Calculate percentage margin on cost for each. Manufacturer (on A) = (40/80)*100 = 50%.' },
            { text: 'Compare absolute margins: Retailer (₹50-55) > Manufacturer (₹35-40) > Wholesalers (₹30).' },
            { text: 'Compare percentage margins: Manufacturer (43-50%) > Retailer (33-38%) > Wholesalers (25-26%).' },
            { text: 'Interpret: Retailers earn highest absolute margin per unit due to value addition (shop rent, display, credit, personal.', faded: true, blankAnswer: 'Highest absolute margin per unit: Retailer (₹50-55)..' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_01_007', title: 'Trade is the branch of commerce.',
          scaffold: { problem: 'A business firm \'Alpha Traders\' in Chennai purchases 2000 units of readymade garments from a manufacturer in Tiruppur (Tamil Nadu) and.',
            steps: [
            { text: 'Identify the parties and their locations for each transaction.' },
            { text: 'Determine the role of the buyer in each transaction to classify as wholesale or retail.' },
            { text: 'Note that "wholesale" does not depend on quantity but on buyer\'s intent.' },
            { text: 'Compile final classification. Transaction 1: Internal wholesale trade. Transaction 2: Internal wholesale trade.' },
            { text: 'Verify against definition: Trade = transfer of ownership; Internal = within national boundaries; Wholesale = to.', faded: true, blankAnswer: 'Transaction 1: Internal wholesale trade. Transaction 2:.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_bs_cbse_10_002', title: 'Identify each idea',
          dissect: { specimen: 'Types Retail Trade', spots: [
            { id: 's1', label: 'Internal trade refers to the', prompt: 'Which idea is this? — Internal trade refers to the buying and selling of goods and services within the.', answer: 'Internal trade refers to the', options: ['Internal trade refers to the', 'Wholesale trade refers to the', 'Retail trade refers to the', 'Mail order houses are retail'] },
            { id: 's2', label: 'Wholesale trade refers to the', prompt: 'Which idea is this? — Wholesale trade refers to the purchase and sale of goods and services in large quantities.', answer: 'Wholesale trade refers to the', options: ['Wholesale trade refers to the', 'Internal trade refers to the', 'Retail trade refers to the', 'Mail order houses are retail'] },
            { id: 's3', label: 'Retail trade refers to the', prompt: 'Which idea is this? — Retail trade refers to the business activity of purchasing goods in relatively large.', answer: 'Retail trade refers to the', options: ['Retail trade refers to the', 'Internal trade refers to the', 'Wholesale trade refers to the', 'Mail order houses are retail'] },
            { id: 's4', label: 'Mail order houses are retail', prompt: 'Which idea is this? — Mail order houses are retail trading establishments that sell goods exclusively through.', answer: 'Mail order houses are retail', options: ['Mail order houses are retail', 'Internal trade refers to the', 'Wholesale trade refers to the', 'Retail trade refers to the'] },
            { id: 's5', label: 'Trade is the branch of', prompt: 'Which idea is this? — Trade is the branch of commerce concerned with the buying, selling, and exchange of goods.', answer: 'Trade is the branch of', options: ['Trade is the branch of', 'Internal trade refers to the', 'Wholesale trade refers to the', 'Retail trade refers to the'] }
          ] } }
    ],
    explore: { component: C11_CommerceTypesRetailTradeSim, prompt: 'Explore the interactive — Types Retail Trade' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_10_001', difficulty: 'standard',
          question: 'Internal trade refers to the buying and selling of goods and services within.',
          hint: 'Revisit Class 6 Economics "What is a Market?" (c6_economics_ch12_001) and "Types of.',
          misconception: 'Students believe "internal trade = local trade within a city/state" and "external trade = trade between states." They.',
          parts: [
                { id: 'a', prompt: 'A farmer in Punjab sells wheat to a flour mill in Punjab. The flour mill sells flour to a wholesaler in Delhi. The wholesaler sells to a retailer in Mumbai.', answer: 'All four transactions are internal trade',
                  options: ['All four transactions are internal trade', 'internal trade', 'local trade'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "internal trade = local trade within a city/state" and "external trade = trade between states." They confuse political.' },
                { id: 'b', prompt: '"Wholesale trade and retail trade are distinguished only by the quantity of goods sold." Evaluate this statement.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'partially correct', 'internal trade = local trade within a city/state'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "internal trade = local trade within a city/state" and "external trade = trade between states." They confuse political.' },
                { id: 'c', prompt: 'A manufacturer of packaged spices in Tamil Nadu wants to reach consumers in Kerala, Karnataka, and Andhra Pradesh.', answer: 'Option B reduces transaction costs',
                  options: ['Option B reduces transaction costs', 'internal trade = local trade within a city/state', 'external trade = trade between states'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "internal trade = local trade within a city/state" and "external trade = trade between states." They confuse political.' }
          ],
            remediations: { 'internal-trade-local-trade-within': { steps: ['Draw a map of India. Mark a factory in Gujarat, wholesaler in Delhi, retailer in Kerala, consumer in Assam.', 'Contrast with a factory in Gujarat exporting to Dubai — that crosses national border → external trade.', 'Explicitly state the rule: "Internal trade = buyer and seller both within India\'s political boundaries, regardless of.', 'Practice classifying 5 scenarios (inter-state, intra-state, local, online within India, import/export) until the.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "internal trade = local trade within a city/state" and "external trade = trade between states." They.',
          parts: [
                { id: 'a', prompt: '"Eliminating wholesalers would reduce prices for consumers because it removes a layer of markup." Critique this argument using at least three services.', answer: 'The argument is flawed',
                  options: ['The argument is flawed', 'internal trade = local trade within a city/state', 'external trade = trade between states'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "internal trade = local trade within a city/state" and "external trade = trade between states." They confuse political.' },
                { id: 'b', prompt: 'Design a classification flowchart for internal trade that starts with "Internal Trade" and branches into all categories and sub-categories mentioned in NCERT.', answer: 'A correct flowchart shows: Internal Trade → (1) Wholesale Trade',
                  options: ['A correct flowchart shows: Internal Trade → (1) Wholesale Trade', 'internal trade = local trade within a city/state', 'external trade = trade between states'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "internal trade = local trade within a city/state" and "external trade = trade between states." They confuse political.' }
          ],
            remediations: { 'internal-trade-local-trade-within': { steps: ['Draw a map of India. Mark a factory in Gujarat, wholesaler in Delhi, retailer in Kerala, consumer in Assam.', 'Contrast with a factory in Gujarat exporting to Dubai — that crosses national border → external trade.', 'Explicitly state the rule: "Internal trade = buyer and seller both within India\'s political boundaries, regardless of.', 'Practice classifying 5 scenarios (inter-state, intra-state, local, online within India, import/export) until the.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_10_002', difficulty: 'standard',
          question: 'Wholesale trade refers to the purchase and sale of goods and services in large.',
          hint: 'Revisit the "functions of middlemen" concept from Class 10 Economics.',
          misconception: 'Students often confuse **"breaking bulk"** with **"grading and packing"** as the same function.',
          parts: [
                { id: 'a', prompt: 'A wholesaler purchases 5,000 units of a seasonal product (e.g., woolen blankets) from a manufacturer in August, stores them in a temperature-controlled.', answer: 'Functions: (1) **Storage/warehousing**',
                  options: ['Functions: (1) **Storage/warehousing**', 'breaking bulk', 'grading and packing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse **"breaking bulk"** with **"grading and packing"** as the same function.' }
          ],
            remediations: { 'students-often-confuse-breaking-bulk': { steps: ['Draw a two-column table — left column: "Quantitative Handling" (breaking bulk, transportation, storage), right column:.', 'Take a product (e.g., wheat). Walk through: Farmer → 50 kg gunny bags → Wholesaler godown.', 'Assign each action to a column.', 'Memorize NCERT phrasing: "purchase in bulk and sell in small lots" = breaking bulk; "grading of products, packing into.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_10_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse **"breaking bulk"** with **"grading and packing"** as the same function.',
          parts: [
                { id: 'a', prompt: '"Wholesalers are unnecessary middlemen who only increase prices; manufacturers should sell directly to retailers." Evaluate this statement using at least four.', answer: 'The statement is **largely incorrect** for most small/medium manufacturers',
                  options: ['The statement is **largely incorrect** for most small/medium manufacturers', 'breaking bulk', 'grading and packing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse **"breaking bulk"** with **"grading and packing"** as the same function.' },
                { id: 'b', prompt: 'Design a hypothetical wholesale business model for distributing **artisanal organic spices** from 50 small farmers in Kerala to 200 boutique retailers across.', answer: 'Prioritized functions: (1) **Grading & standardisation**',
                  options: ['Prioritized functions: (1) **Grading & standardisation**', 'breaking bulk', 'grading and packing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse **"breaking bulk"** with **"grading and packing"** as the same function.' }
          ],
            remediations: { 'students-often-confuse-breaking-bulk': { steps: ['Draw a two-column table — left column: "Quantitative Handling" (breaking bulk, transportation, storage), right column:.', 'Take a product (e.g., wheat). Walk through: Farmer → 50 kg gunny bags → Wholesaler godown.', 'Assign each action to a column.', 'Memorize NCERT phrasing: "purchase in bulk and sell in small lots" = breaking bulk; "grading of products, packing into.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_10_003', difficulty: 'standard',
          question: 'Retail trade refers to the business activity of purchasing goods in relatively.',
          hint: 'If stuck, revisit c11_bs_cbse_10_002 (Wholesale Trade) and explicitly list the three.',
          misconception: 'Students incorrectly believe that "retailer = small shop" and "wholesaler = big shop/warehouse".',
          parts: [
                { id: 'a', prompt: 'A manufacturer sells 500 units of a product to a trader who sells 50 units each to 10 different buyers.', answer: 'Correct answer: No, the second trader is NOT a retailer',
                  options: ['Correct answer: No, the second trader is NOT a retailer', 'yes, because they sold in small quantity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly believe that "retailer = small shop" and "wholesaler = big shop/warehouse".' }
          ],
            remediations: { 'students-incorrectly-believe-that-retailer': { steps: ['Give the student three transactions: (a) Big Bazaar sells 1 kg rice to a family; (b) A roadside vendor sells 50 kg.', 'Ask them to classify each as retail/wholesale using ONLY the two NCERT criteria (quantity + buyer purpose).', 'When they misclassify (b) or (c) as retail due to small shop size, explicitly contrast: "The samosa maker buys for.', 'Have them re-write the definition highlighting "ultimate consumer" and "personal non-business use" in different colours.', 'Practice 5 more mixed scenarios until they consistently apply buyer-purpose over shop-size.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_10_008', difficulty: 'standard',
          question: 'Mail order houses are retail trading establishments that sell goods exclusively.',
          hint: 'Revisit c11_bs_cbse_10_005 (Types of Retail Trade: Large-Scale Retailers) to review the.',
          misconception: 'Students often confuse mail order houses with e-commerce (online shopping), assuming they are the same because both.',
          parts: [
                { id: 'a', prompt: 'A company wants to sell handmade artisanal pottery (fragile, unique designs, made-to-order) via mail order.', answer: 'Not suitable',
                  options: ['Not suitable', 'yes, because pictures can show design', 'ordering from home'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse mail order houses with e-commerce (online shopping), assuming they are the same because both involve "ordering from.' }
          ],
            remediations: { 'students-often-confuse-mail-order': { steps: ['If a student conflates mail order with e-commerce: (1) Ask them to list the *exact* steps from seeing an ad to.', '(2) Contrast with e-commerce steps (app → cart → UPI → courier tracking → OTP delivery).', '(3) Highlight three non-negotiable differences: *medium of order* (post vs internet), *payment trigger* (cash on.', '(4) Give a practice question: "Why can\'t a mail order house offer \'7-day easy return\'?" — force them to reason through.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_10_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse mail order houses with e-commerce (online shopping), assuming they are the same because both.',
          parts: [
                { id: 'a', prompt: '"Mail order houses provide convenience to customers." Critique this statement by analysing two scenarios where this convenience is illusory for the buyer.', answer: 'Convenience is illusory when: (1) The buyer is illiterate or semi-literate',
                  options: ['Convenience is illusory when: (1) The buyer is illiterate or semi-literate', 'doorstep delivery', 'ordering from home', 'instant order confirmation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse mail order houses with e-commerce (online shopping), assuming they are the same because both involve "ordering from.' },
                { id: 'b', prompt: 'Design a mail order business model for selling certified organic spices to urban households across India.', answer: 'how you will overcome the "high promotion cost" limitation, (',
                  options: ['how you will overcome the "high promotion cost" limitation, (', 'ordering from home', 'instant order confirmation', 'digital payment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse mail order houses with e-commerce (online shopping), assuming they are the same because both involve "ordering from.' }
          ],
            remediations: { 'students-often-confuse-mail-order': { steps: ['If a student conflates mail order with e-commerce: (1) Ask them to list the *exact* steps from seeing an ad to.', '(2) Contrast with e-commerce steps (app → cart → UPI → courier tracking → OTP delivery).', '(3) Highlight three non-negotiable differences: *medium of order* (post vs internet), *payment trigger* (cash on.', '(4) Give a practice question: "Why can\'t a mail order house offer \'7-day easy return\'?" — force them to reason through.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_10_011', difficulty: 'standard',
          question: 'Wholesale trade refers to the purchase and sale of goods in large quantities.',
          hint: 'Re-read the \'Services of Wholesalers\' (10.3.1, 10.3.2) and \'Services of Retailers\'.',
          misconception: 'Students often believe "Wholesalers sell cheap, retailers sell expensive" is the only difference, confusing *price.',
          parts: [
                { id: 'a', prompt: 'Ramesh runs a shop buying 100 kg of sugar weekly from a wholesale market and selling it in 1 kg packets to households.', answer: 'Ramesh is primarily a retailer',
                  options: ['Ramesh is primarily a retailer', 'buys 100 kg', 'Wholesalers sell cheap, retailers sell expensive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Wholesalers sell cheap, retailers sell expensive" is the only difference, confusing *price level* with *pricing.' }
          ],
            remediations: { 'wholesalers-sell-cheap': { steps: ['Draw a 3-box flowchart: Manufacturer → [Box A] → [Box B] → Consumer.', 'Ask: "Who is the buyer of Box A? (Retailer) Who is the buyer of Box B? (Consumer)".', 'Write the rule: "Wholesaler = Sells to Reseller. Retailer = Sells to Consumer."', 'Give 5 rapid-fire scenarios (e.g., "Farmer sells 50kg apples to jam factory", "Apparel store sells 1 shirt to you") and.', 'Introduce lot size and price as *consequences* of the buyer type, not definitions.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_10_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "Wholesalers sell cheap, retailers sell expensive" is the only difference, confusing *price.',
          parts: [
                { id: 'a', prompt: '"Eliminating wholesalers will reduce prices for consumers because it removes one layer of profit margin." Evaluate this statement by analyzing three services.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'Wholesalers sell cheap, retailers sell expensive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Wholesalers sell cheap, retailers sell expensive" is the only difference, confusing *price level* with *pricing.' },
                { id: 'b', prompt: 'Design a hypothetical business scenario involving a product of your choice (e.g., smartphones, vegetables, textbooks) that clearly illustrates the complete.', answer: 'Example: Textbooks',
                  options: ['Example: Textbooks', 'Wholesalers sell cheap, retailers sell expensive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Wholesalers sell cheap, retailers sell expensive" is the only difference, confusing *price level* with *pricing.' }
          ],
            remediations: { 'wholesalers-sell-cheap': { steps: ['Draw a 3-box flowchart: Manufacturer → [Box A] → [Box B] → Consumer.', 'Ask: "Who is the buyer of Box A? (Retailer) Who is the buyer of Box B? (Consumer)".', 'Write the rule: "Wholesaler = Sells to Reseller. Retailer = Sells to Consumer."', 'Give 5 rapid-fire scenarios (e.g., "Farmer sells 50kg apples to jam factory", "Apparel store sells 1 shirt to you") and.', 'Introduce lot size and price as *consequences* of the buyer type, not definitions.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_01_007', difficulty: 'standard',
          question: 'Trade is the branch of commerce concerned with the buying, selling, and.',
          hint: 'Revisit c11_bs_cbse_01_006 (Commerce: Trade and Auxiliaries to Trade) — specifically the.',
          misconception: 'Students often believe that "wholesale trade means selling in large quantities" and "retail trade means selling in.',
          parts: [
                { id: 'a', prompt: 'A trader in Kolkata purchases 500 kg of tea from a plantation in Assam and sells it to a retailer in Mumbai.', answer: 'This is internal wholesale trade',
                  options: ['This is internal wholesale trade', 'wholesale trade means selling in large quantities', 'retail trade means selling in small quantities'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "wholesale trade means selling in large quantities" and "retail trade means selling in small quantities,".' },
                { id: 'b', prompt: '"All trade is internal trade because goods ultimately reach consumers within a country." Evaluate this statement and explain the conceptual error it contains.', answer: 'The statement is false',
                  options: ['The statement is false', 'wholesale trade means selling in large quantities', 'retail trade means selling in small quantities'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "wholesale trade means selling in large quantities" and "retail trade means selling in small quantities,".' },
                { id: 'c', prompt: 'An Indian company buys raw cotton from farmers in Gujarat, processes it into yarn, and sells the yarn to a textile mill in Bangladesh.', answer: 'Transaction 1 (farmers to company): Internal trade',
                  options: ['Transaction 1 (farmers to company): Internal trade', 'wholesale trade means selling in large quantities', 'retail trade means selling in small quantities'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "wholesale trade means selling in large quantities" and "retail trade means selling in small quantities,".' }
          ],
            remediations: { 'wholesale-trade-means-selling-in': { steps: ['Ask the student to define "final consumer" vs "trader" in their own words.', 'Present two scenarios: (a) A bakery buys 50 kg flour from a mill; (b) A household buys 50 kg flour from a wholesale.', 'Guide them to see that (a) is wholesale because the bakery uses flour for business (resale as bread), while (b) is.', 'Have them re-state the definition using "intended use" not "quantity."'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "wholesale trade means selling in large quantities" and "retail trade means selling in.',
          parts: [
                { id: 'a', prompt: '"A country with a large entrepôt trade sector does not need a strong manufacturing base." Critically evaluate this claim with reference to the nature of.', answer: 'The claim is flawed',
                  options: ['The claim is flawed', 'wholesale trade means selling in large quantities', 'retail trade means selling in small quantities'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "wholesale trade means selling in large quantities" and "retail trade means selling in small quantities,".' },
                { id: 'b', prompt: 'Design a flowchart that traces a single product (e.g., coffee beans) from an Ethiopian farmer to a consumer in Jaipur, labeling each trade transaction as.', answer: 'A valid flowchart: 1',
                  options: ['A valid flowchart: 1', 'wholesale trade means selling in large quantities', 'retail trade means selling in small quantities'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "wholesale trade means selling in large quantities" and "retail trade means selling in small quantities,".' }
          ],
            remediations: { 'wholesale-trade-means-selling-in': { steps: ['Ask the student to define "final consumer" vs "trader" in their own words.', 'Present two scenarios: (a) A bakery buys 50 kg flour from a mill; (b) A household buys 50 kg flour from a wholesale.', 'Guide them to see that (a) is wholesale because the bakery uses flour for business (resale as bread), while (b) is.', 'Have them re-state the definition using "intended use" not "quantity."'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
