import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bs_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bs_ch10_p1: SimDef = {
    id: 'v3_c11_bs_ch10_p1',
    title: 'Internal Trade · Part 1/2',
    subtitle: 'Follow one biscuit across three states and watch each trader earn his margin.',
    classLevel: 11, subject: 'business_studies', topic: 'Internal Trade · Part 1/2',
    chapters: ['c11_bs_ch10'],
    nodeIds: ['c11_bs_cbse_10_001', 'c11_bs_cbse_10_002', 'c11_bs_cbse_10_003', 'c11_bs_cbse_10_004', 'c11_bs_cbse_10_005', 'c11_bs_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a supply-chain analyst justifying each intermediary\'s cut', intro: 'A startup wants to \'cut out all middlemen\'. Before they delete the chain, make them name what each link actually does.', goal: 'Distinguish internal from external trade and wholesale from retail by quantity, purpose, and customer.' },
    discovery: {
        question: 'Punjab wheat becomes Delhi flour, passes a Mumbai wholesaler, then a kirana retailer, then you. A student claims the inter-state hops were \'external trade\' and the quantity alone separates wholesaler from retailer. Fix both errors in one stroke.',
        options: ['All of it is internal trade — borders were never crossed — and wholesale versus retail is set by purpose and customer, not just lot size', 'Only the last sale is internal; the rest crossed state lines', 'Quantity is indeed the sole test — big lots mean wholesale', 'The farmer\'s sale isn\'t trade because wheat is raw'],
        answer: 'All of it is internal trade — borders were never crossed — and wholesale versus retail is set by purpose and customer, not just lot size',
        hook: 'Internal means national borders, not state lines — and a wholesaler is defined by who buys and why, not merely how much.',
    },
    teaching: [
        { title: 'Internal Trade: Meaning, Types and Importance', text: 'Internal trade refers to the buying and selling of goods and services within the geographical boundaries of a nation, where no custom duty or import duty is levied because goods are part of domestic.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bs_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace a biscuit from a Gujarat factory to your hand, marking each intermediary\'s contribution — bulk-breaking, storage, transport, risk — and justify which transactions count as internal trade and why.',
        labels: ['Internal Trade: Meaning, Types', 'Wholesale Trade: Features', 'Retail Trade: Features', 'Types of Retail Trade', 'Departmental Stores: Features, Merits'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bs_cbse_10_001', title: 'Internal Trade: Meaning, Types and Importance',
          caseStudy: { intro: 'Imagine you walk into your neighbourhood kirana store to buy a packet of biscuits — that biscuit was manufactured in a factory in Gujarat, transported to.',
            decisions: [{ prompt: 'A farmer in Punjab sells wheat to a flour mill in Punjab. The flour mill sells flour to a wholesaler in Delhi.', options: [
                { text: 'All four transactions are internal trade', outcome: 'All four transactions are internal trade because each involves buying and selling within India\'s.' },
                { text: 'internal trade', outcome: 'Not quite — Students believe "internal trade = local trade within a city/state" and "external trade = trade.', reveals: 'internal-trade-local-trade-within' },
                { text: 'local trade', outcome: 'Not quite — Students believe "internal trade = local trade within a city/state" and "external trade = trade.', reveals: 'internal-trade-local-trade-within' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_10_002', title: 'Wholesale Trade: Features and Functions of Wholesalers',
          caseStudy: { intro: 'Imagine you run a small kirana store in a residential colony. You need 50 kg of wheat flour, 20 kg of rice, and 100 packets of biscuits every week.',
            decisions: [{ prompt: 'Define wholesale trade and state the primary distinction between a wholesaler and a retailer in terms of the end-user they serve.', options: [
                { text: 'Wholesale trade is the purchase and sale of goods in large quantities for resale or', outcome: 'Wholesale trade is the purchase and sale of goods in large quantities for resale or intermediate.' },
                { text: 'wholesalers sell to consumers', outcome: 'Not quite — Students often confuse **"breaking bulk"** with **"grading and packing"** as the same function.', reveals: 'students-often-confuse-breaking-bulk' },
                { text: 'intermediate use', outcome: 'Not quite — Students often confuse **"breaking bulk"** with **"grading and packing"** as the same function.', reveals: 'students-often-confuse-breaking-bulk' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_10_003', title: 'Retail Trade: Features and Functions of Retailers',
          caseStudy: { intro: 'Imagine you walk into your neighbourhood kirana store to buy a packet of biscuits — the shopkeeper sells you just one packet, not a whole carton, and you.',
            decisions: [{ prompt: 'State the precise NCERT definition of \'retail trade\' and identify the two key phrases that distinguish it from wholesale trade.', options: [
                { text: 'Correct answer: "Purchase and sale of goods in relatively small quantities, generally to', outcome: 'Correct answer: "Purchase and sale of goods in relatively small quantities, generally to the.' },
                { text: 'selling goods to customers', outcome: 'Not quite — Students incorrectly believe that "retailer = small shop" and "wholesaler = big shop/warehouse".', reveals: 'students-incorrectly-believe-that-retailer' },
                { text: 'selling in small shops', outcome: 'Not quite — Students incorrectly believe that "retailer = small shop" and "wholesaler = big shop/warehouse".', reveals: 'students-incorrectly-believe-that-retailer' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_10_004', title: 'Types of Retail Trade: Small-Scale Retailers (Itinerant and Fixed)',
          caseStudy: { intro: 'Imagine you\'re walking through a busy Indian market street - you see a vegetable vendor pushing a cart calling out prices, a weekly bazaar setting up.',
            decisions: [{ prompt: 'A student classifies a roadside fruit seller who operates from a fixed wooden cart parked at the same street corner every day for 10 years.', options: [
                { text: 'No, the classification is incorrect', outcome: 'No, the classification is incorrect. The defining characteristic of itinerant retailers is the.' },
                { text: 'informal/unlicensed location', outcome: 'Not quite — Students consistently confuse **street traders (pavement vendors)** with **street stall holders**.', reveals: 'students-consistently-confuse-street-traders' },
                { text: 'itinerant mobility', outcome: 'Not quite — Students consistently confuse **street traders (pavement vendors)** with **street stall holders**.', reveals: 'students-consistently-confuse-street-traders' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_10_005', title: 'Types of Retail Trade: Large-Scale Retailers',
          caseStudy: { intro: 'Imagine walking into a Big Bazaar in Mumbai, a Bata store in Delhi, and ordering from a catalogue-based business like Naaptol - all are large retailers but.',
            decisions: [{ prompt: 'Define "large-scale retailer" and list the six types classified in the NCERT textbook for Class 11 Business Studies Chapter 10.', options: [
                { text: 'A large-scale retailer is a fixed-shop retail business with substantial capital, large', outcome: 'A large-scale retailer is a fixed-shop retail business with substantial capital, large inventory.' },
                { text: 'super bazaars', outcome: 'Not quite — Students commonly believe **"large-scale retailer" means "big building with many products"** and.', reveals: 'students-commonly-believe-large-scale' },
                { text: 'hypermarkets', outcome: 'Not quite — Students commonly believe **"large-scale retailer" means "big building with many products"** and.', reveals: 'students-commonly-believe-large-scale' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_10_006', title: 'Departmental Stores: Features, Merits and Limitations',
          caseStudy: { intro: 'Imagine you need to buy a school uniform, a smartphone, groceries for the week, and a birthday gift — all in one trip. Where would you go?',
            decisions: [{ prompt: 'Define a departmental store in exactly two sentences using only terminology from the NCERT textbook (e.g., \'joint stock company\'.', options: [
                { text: 'A departmental store is a large retail establishment formed as a joint stock company', outcome: 'A departmental store is a large retail establishment formed as a joint stock company managed by.' },
                { text: 'departmental store', outcome: 'Not quite — Students confuse "departmental store" with "supermarket" or "chain store".', reveals: 'students-confuse-departmental-store-with' },
                { text: 'supermarket', outcome: 'Not quite — Students confuse "departmental store" with "supermarket" or "chain store".', reveals: 'students-confuse-departmental-store-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a business-studies quiz bowl you\'re asked to sort four trades: (a) a Punjab farmer sells wheat to a Punjab mill, (b) the mill sells flour to a Delhi wholesaler, (c) the wholesaler sells to a Kochi retailer, (d) a Surat firm ships spices to Dubai. A rival buzzes: \'(b) and (c) are external trade — they cross state borders.\'',
            decisions: [{ prompt: 'Which trades are internal, which external?', options: [
                { text: '(a), (b) and (c) are all internal trade — the border that matters is the national one, not state lines; no customs duty applies anywhere inside India. Only (d) is external/international because goods cross the national frontier into the UAE.', outcome: 'Internal trade means buyer and seller both within the country\'s boundaries — distance and state lines are irrelevant.' },
                { text: 'The rival is right — \'internal\' means within a state, so inter-state commerce is external.', outcome: 'That uses the everyday meaning of \'internal\'; the trade definition turns on national borders — inter-state sales remain domestic internal trade.', reveals: 'interstate-is-external' },
                { text: '(a) isn\'t trade at all — a village farmer selling at a mandi is informal, not \'trade\'.', outcome: 'Formality isn\'t the criterion either; a farmer\'s mandi sale is a genuine internal wholesale transaction feeding the distribution chain.', reveals: 'informal-sale-not-trade' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You saw the distribution chain as engineered value: every middleman exists because scattered producers and scattered consumers need bridging.',
            decisions: [{ prompt: 'What comes next? Internal Trade · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Internal Trade · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_10_001', difficulty: 'standard',
          question: 'Internal trade refers to the buying and selling of goods and services within.',
          hint: 'Revisit Class 6 Economics "What is a Market?" (c6_economics_ch12_001) and "Types.',
          misconception: 'Students believe "internal trade = local trade within a city/state" and "external trade = trade between states." They.',
          parts: [
                { id: 'a', prompt: 'A farmer in Punjab sells wheat to a flour mill in Punjab. The flour mill sells flour to a wholesaler in Delhi. The wholesaler sells to a retailer in Mumbai.', answer: 'All four transactions are internal trade',
                  options: ['All four transactions are internal trade', 'internal trade', 'local trade', 'internal trade = local trade within a city/state'],
                  hint: 'Revisit Class 6 Economics "What is a Market?" (c6_economics_ch12_001) and "Types of Markets".',
                  misconception: 'Students believe "internal trade = local trade within a city/state" and "external trade = trade between states." They confuse political.' },
                { id: 'b', prompt: '"Wholesale trade and retail trade are distinguished only by the quantity of goods sold." Evaluate this statement.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'partially correct', 'internal trade = local trade within a city/state', 'external trade = trade between states'],
                  hint: 'Revisit Class 6 Economics "What is a Market?" (c6_economics_ch12_001) and "Types of Markets".',
                  misconception: 'Students believe "internal trade = local trade within a city/state" and "external trade = trade between states." They confuse political.' },
                { id: 'c', prompt: 'A manufacturer of packaged spices in Tamil Nadu wants to reach consumers in Kerala, Karnataka, and Andhra Pradesh.', answer: 'Option B reduces transaction costs',
                  options: ['Option B reduces transaction costs', 'internal trade = local trade within a city/state', 'external trade = trade between states'],
                  hint: 'Revisit Class 6 Economics "What is a Market?" (c6_economics_ch12_001) and "Types of Markets".',
                  misconception: 'Students believe "internal trade = local trade within a city/state" and "external trade = trade between states." They confuse political.' }
          ],
            remediations: { 'internal-trade-local-trade-within': { steps: ['Draw a map of India. Mark a factory in Gujarat, wholesaler in Delhi, retailer in Kerala, consumer in Assam.', 'Contrast with a factory in Gujarat exporting to Dubai — that crosses national border → external trade.', 'Explicitly state the rule: "Internal trade = buyer and seller both within India\'s political boundaries, regardless.', 'Practice classifying 5 scenarios (inter-state, intra-state, local, online within India, import/export) until the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "internal trade = local trade within a city/state" and "external trade = trade between states." They.',
          parts: [
                { id: 'a', prompt: '"Eliminating wholesalers would reduce prices for consumers because it removes a layer of markup." Critique this argument using at least three services.', answer: 'The argument is flawed',
                  options: ['The argument is flawed', 'internal trade = local trade within a city/state', 'external trade = trade between states'],
                  hint: 'Revisit Class 6 Economics "What is a Market?" (c6_economics_ch12_001) and "Types of Markets".',
                  misconception: 'Students believe "internal trade = local trade within a city/state" and "external trade = trade between states." They confuse political.' },
                { id: 'b', prompt: 'Design a classification flowchart for internal trade that starts with "Internal Trade" and branches into all categories and sub-categories mentioned in NCERT.', answer: 'A correct flowchart shows: Internal Trade → (1) Wholesale Trade',
                  options: ['A correct flowchart shows: Internal Trade → (1) Wholesale Trade', 'internal trade = local trade within a city/state', 'external trade = trade between states'],
                  hint: 'Revisit Class 6 Economics "What is a Market?" (c6_economics_ch12_001) and "Types of Markets".',
                  misconception: 'Students believe "internal trade = local trade within a city/state" and "external trade = trade between states." They confuse political.' }
          ],
            remediations: { 'internal-trade-local-trade-within': { steps: ['Draw a map of India. Mark a factory in Gujarat, wholesaler in Delhi, retailer in Kerala, consumer in Assam.', 'Contrast with a factory in Gujarat exporting to Dubai — that crosses national border → external trade.', 'Explicitly state the rule: "Internal trade = buyer and seller both within India\'s political boundaries, regardless.', 'Practice classifying 5 scenarios (inter-state, intra-state, local, online within India, import/export) until the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_10_002', difficulty: 'standard',
          question: 'Wholesale trade refers to the purchase and sale of goods and services in large.',
          hint: 'Revisit the "functions of middlemen" concept from Class 10 Economics.',
          misconception: 'Students often confuse **"breaking bulk"** with **"grading and packing"** as the same function.',
          parts: [
                { id: 'a', prompt: 'A wholesaler purchases 5,000 units of a seasonal product (e.g., woolen blankets) from a manufacturer in August, stores them in a temperature-controlled.', answer: 'Functions: (1) **Storage/warehousing**',
                  options: ['Functions: (1) **Storage/warehousing**', 'breaking bulk', 'grading and packing'],
                  hint: 'Revisit the "functions of middlemen" concept from Class 10 Economics (c10_eco_cbse_03_003) and the.',
                  misconception: 'Students often confuse **"breaking bulk"** with **"grading and packing"** as the same function.' }
          ],
            remediations: { 'students-often-confuse-breaking-bulk': { steps: ['Draw a two-column table — left column: "Quantitative Handling" (breaking bulk, transportation, storage), right column.', 'Take a product (e.g., wheat). Walk through: Farmer → 50 kg gunny bags → Wholesaler godown.', 'Assign each action to a column.', 'Memorize NCERT phrasing: "purchase in bulk and sell in small lots" = breaking bulk; "grading of products, packing into.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_10_003', difficulty: 'standard',
          question: 'Retail trade refers to the business activity of purchasing goods in relatively.',
          hint: 'If stuck, revisit c11_bs_cbse_10_002 (Wholesale Trade) and explicitly list the three.',
          misconception: 'Students incorrectly believe that "retailer = small shop" and "wholesaler = big shop/warehouse".',
          parts: [
                { id: 'a', prompt: 'A manufacturer sells 500 units of a product to a trader who sells 50 units each to 10 different buyers.', answer: 'Correct answer: No, the second trader is NOT a retailer',
                  options: ['Correct answer: No, the second trader is NOT a retailer', 'yes, because they sold in small quantity'],
                  hint: 'If stuck, revisit c11_bs_cbse_10_002 (Wholesale Trade) and explicitly list the three contrasts.',
                  misconception: 'Students incorrectly believe that "retailer = small shop" and "wholesaler = big shop/warehouse".' }
          ],
            remediations: { 'students-incorrectly-believe-that-retailer': { steps: ['Give the student three transactions: (a) Big Bazaar sells 1 kg rice to a family; (b) A roadside vendor sells 50.', 'Ask them to classify each as retail/wholesale using ONLY the two NCERT criteria (quantity + buyer purpose).', 'When they misclassify (b) or (c) as retail due to small shop size, explicitly contrast: "The samosa maker buys for.', 'Have them re-write the definition highlighting "ultimate consumer" and "personal non-business use" in different colours.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_10_004', difficulty: 'standard',
          question: 'Small-scale retailers are retail business enterprises operating with limited.',
          hint: 'If stuck, revisit c11_bs_cbse_10_003 "Retail Trade: Features and Functions of Retailers".',
          misconception: 'Students consistently confuse **street traders (pavement vendors)** with **street stall holders** because both operate.',
          parts: [
                { id: 'a', prompt: 'A student classifies a roadside fruit seller who operates from a fixed wooden cart parked at the same street corner every day for 10 years as an "itinerant.', answer: 'No, the classification is incorrect',
                  options: ['No, the classification is incorrect', 'informal/unlicensed location', 'itinerant mobility', 'on the street'],
                  hint: 'If stuck, revisit c11_bs_cbse_10_003 "Retail Trade: Features and Functions of Retailers".',
                  misconception: 'Students consistently confuse **street traders (pavement vendors)** with **street stall holders** because both operate "on the street." The.' },
                { id: 'b', prompt: '"Cheap jacks are just hawkers who got lucky and found a slightly better spot." Evaluate this statement by comparing the operational characteristics of cheap.', answer: 'The statement is false',
                  options: ['The statement is false', 'on the street', 'do not change their place of business so frequently', 'stationery, eatables, newspapers'],
                  hint: 'If stuck, revisit c11_bs_cbse_10_003 "Retail Trade: Features and Functions of Retailers".',
                  misconception: 'Students consistently confuse **street traders (pavement vendors)** with **street stall holders** because both operate "on the street." The.' }
          ],
            remediations: { 'students-consistently-confuse-street-traders': { steps: ['If the student cannot distinguish street traders from street stall holders: Step 1 - Ask them to draw both: street.', 'Step 2 - Trace the supply chain: street trader buys daily from wholesale market (cash, small lots); street stall holder.', 'Step 3 - Apply the "monsoon test": street trader disappears in heavy rain (no shelter); street stall holder operates.', 'Step 4 - Have them classify 5 real examples from their neighbourhood using only these three observable tests (structure.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_10_005', difficulty: 'standard',
          question: 'Large-scale retailers are fixed-shop retail businesses operating with.',
          hint: 'Revisit c11_bs_cbse_10_003 (Retail Trade: Features and Functions) and c11_bs_cbse_10_004.',
          misconception: 'Students commonly believe **"large-scale retailer" means "big building with many products"** and therefore classify any.',
          parts: [
                { id: 'a', prompt: '"Bata India operates 1,500+ stores across India with identical layouts, centralised procurement from head office, fixed prices, cash-only sales, and branch.', answer: 'This represents **Chain Stores/Multiple Shops**',
                  options: ['This represents **Chain Stores/Multiple Shops**', 'departmental store'],
                  hint: 'Revisit c11_bs_cbse_10_003 (Retail Trade: Features and Functions) and c11_bs_cbse_10_004.',
                  misconception: 'Students commonly believe **"large-scale retailer" means "big building with many products"** and therefore classify any big store (like.' },
                { id: 'b', prompt: 'Compare and contrast the risk-bearing capacity of a departmental store versus a chain store organisation when consumer preferences shift suddenly (e.g.,.', answer: '**Chain stores handle sudden demand shifts better** due to risk diffusion',
                  options: ['**Chain stores handle sudden demand shifts better** due to risk diffusion', 'they have more variety'],
                  hint: 'Revisit c11_bs_cbse_10_003 (Retail Trade: Features and Functions) and c11_bs_cbse_10_004.',
                  misconception: 'Students commonly believe **"large-scale retailer" means "big building with many products"** and therefore classify any big store (like.' }
          ],
            remediations: { 'students-commonly-believe-large-scale': { steps: ['If a student conflates physical size with organisational type: **Step 1** - Show two photos: a large standalone general.', 'a small Bata outlet (300 sq ft, company-managed, centralised systems).', 'Ask: "Which is large-scale?" **Step 2** - Walk through the NCERT criteria checklist: (a) Centralised procurement?', '(b) Professional management hierarchy?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_10_006', difficulty: 'standard',
          question: 'A departmental store is a large-scale retail establishment organised as a joint.',
          hint: 'Revisit c11_bs_cbse_10_005 (Types of Retail Trade: Large-Scale Retailers) — focus on the.',
          misconception: 'Students confuse "departmental store" with "supermarket" or "chain store".',
          parts: [
                { id: 'a', prompt: 'A departmental store in Delhi has annual sales of ₹50 crore. Its operating cost is 22% of sales.', answer: 'Departmental store operating cost = 22% × ₹50 crore = ₹11 crore',
                  options: ['Departmental store operating cost = 22% × ₹50 crore = ₹11 crore', 'departmental store', 'supermarket', 'chain store'],
                  hint: 'Revisit c11_bs_cbse_10_005 (Types of Retail Trade: Large-Scale Retailers) — focus on the.',
                  misconception: 'Students confuse "departmental store" with "supermarket" or "chain store".' },
                { id: 'b', prompt: 'Compare departmental stores and chain stores on \'pricing policy\' and \'credit facilities\'.', answer: 'Pricing: Departmental stores',
                  options: ['Pricing: Departmental stores', 'chain stores are bigger', 'departmental store', 'supermarket'],
                  hint: 'Revisit c11_bs_cbse_10_005 (Types of Retail Trade: Large-Scale Retailers) — focus on the.',
                  misconception: 'Students confuse "departmental store" with "supermarket" or "chain store".' }
          ],
            remediations: { 'students-confuse-departmental-store-with': { steps: ['Make a 3-column table: Feature | Departmental Store | Supermarket | Chain Store. Fill from textbook.', 'For each feature, write the CAUSE (why it exists) and EFFECT (what it leads to).', 'Practice the 7-point distinction table (Location, Range, Services, Pricing, Customers, Credit, Flexibility) from memory.', 'Solve one case study: "A store in your city has 10 departments, offers credit, has a restaurant, buys centrally, sells.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
