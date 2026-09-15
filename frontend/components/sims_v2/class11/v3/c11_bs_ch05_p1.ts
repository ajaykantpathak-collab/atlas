import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bs_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bs_ch05_p1: SimDef = {
    id: 'v3_c11_bs_ch05_p1',
    title: 'Emerging Modes of Business · Part 1/2',
    subtitle: 'Buying online is the smallest part of what networks do to a business.',
    classLevel: 11, subject: 'business_studies', topic: 'Emerging Modes of Business · Part 1/2',
    chapters: ['c11_bs_ch05'],
    nodeIds: ['c11_bs_cbse_05_001', 'c11_bs_cbse_05_002', 'c11_bs_cbse_05_003', 'c11_bs_cbse_05_004', 'c11_bs_cbse_05_005', 'c11_bs_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a digital-strategy intern mapping a firm\'s electronic transactions', intro: 'Your manager wants every electronic activity tagged by category. Half of them never touch a customer — that\'s the part everyone gets wrong.', goal: 'Define e-business versus e-commerce and classify transactions as B2B, B2C, Intra-B, or C2C.' },
    discovery: {
        question: 'A firm\'s production team adjusts output live as sales data flows in over the company intranet — no customer ever sees it and nothing is sold online. Is this e-commerce, e-business, or neither?',
        options: ['E-business but not e-commerce — it digitises an internal function, while e-commerce covers only buyer-seller interactions over the internet', 'E-commerce, because computers are involved', 'Neither — nothing was bought or sold', 'Both — every electronic activity counts as both'],
        answer: 'E-business but not e-commerce — it digitises an internal function, while e-commerce covers only buyer-seller interactions over the internet',
        hook: 'E-commerce is the online storefront; e-business is the entire digital nervous system — inventory, production, HR, and accounting included.',
    },
    teaching: [
        { title: 'E-business: Meaning, Scope and Concept', text: 'E-business is the conduct of industry, trade, and commerce using computer networks (primarily the internet for external transactions and intranet for internal processes), encompassing all.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bs_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Classify a day\'s worth of digital activity — a midnight textbook purchase, the app paying its payment gateway, marketing syncing with tech on the intranet, one user selling to another — into B2C, B2B, Intra-B, and C2C.',
        labels: ['E-business: Meaning, Scope', 'Benefits and Limitations', 'Scope of E-business: B2B,', 'E-business vs Traditional Business', 'Online Transactions: Payment Mechanisms', 'Outsourcing: Concept, Scope'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bs_cbse_05_001', title: 'E-business: Meaning, Scope and Concept',
          caseStudy: { intro: 'Imagine it is 11:30 PM and you want to buy a textbook for tomorrow\'s test — physical shops are closed, but you open an app, search, pay via UPI, and get.',
            decisions: [{ prompt: 'Define e-business as per the NCERT Class 11 Business Studies textbook.', options: [
                { text: 'E-business is the conduct of industry, trade, and commerce using computer networks', outcome: 'E-business is the conduct of industry, trade, and commerce using computer networks.' },
                { text: 'buying and selling online', outcome: 'Not quite — Students equate e-business with "having a website for online shopping" (B2C e-commerce only).', reveals: 'students-equate-e-business-with' },
                { text: 'omits any of the three components (e', outcome: 'Not quite — Students equate e-business with "having a website for online shopping" (B2C e-commerce only).', reveals: 'students-equate-e-business-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_05_002', title: 'Benefits and Limitations of E-business',
          caseStudy: { intro: 'Imagine you want to start a small business selling handmade candles.',
            decisions: [{ prompt: 'State any two benefits of e-business for a business organisation as per NCERT.', options: [
                { text: 'Correct answer: (1) Expands marketplace to national and international markets', outcome: 'Correct answer: (1) Expands marketplace to national and international markets; (2) Gradual decline.' },
                { text: 'e-business eliminates all risks', outcome: 'Not quite — Students often think "e-business benefits only big companies" because they see Amazon/Flipkart.', reveals: 'e-business-benefits-only-big' },
                { text: 'guarantees profit', outcome: 'Not quite — Students often think "e-business benefits only big companies" because they see Amazon/Flipkart.', reveals: 'e-business-benefits-only-big' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_05_004', title: 'E-business vs Traditional Business: Comparison',
          caseStudy: { intro: 'Imagine you want to start a business selling handmade candles.',
            decisions: [{ prompt: 'State any three bases of distinction between traditional business and e-business from NCERT Table 5.1.', options: [
                { text: 'Correct answer: Any three from: Ease of formation, Physical presence, Locational', outcome: 'Correct answer: Any three from: Ease of formation, Physical presence, Locational requirements, Cost.' },
                { text: 'profit margin', outcome: 'Not quite — Students believe "e-business has no physical presence" means zero physical infrastructure.', reveals: 'e-business-has-no-physical' },
                { text: 'number of employees', outcome: 'Not quite — Students believe "e-business has no physical presence" means zero physical infrastructure.', reveals: 'e-business-has-no-physical' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_05_005', title: 'Online Transactions: Payment Mechanisms and Security',
          caseStudy: { intro: 'Imagine you want to buy a smartphone online at midnight. You visit an e-commerce site, create an account (registration), add the phone to your cart (placing.',
            decisions: [{ prompt: 'List the three operational stages of an online transaction in their correct sequence as per NCERT.', options: [
                { text: 'The three stages in sequence are: (1) Pre-purchase/sale stage (advertising and', outcome: 'The three stages in sequence are: (1) Pre-purchase/sale stage (advertising and.' },
                { text: 'Digital Cash', outcome: 'Not quite — Students often believe "Digital Cash" and "Net-banking" are the same because both use the internet.', reveals: 'digital-cash-and-net-banking' },
                { text: 'Net-banking', outcome: 'Not quite — Students often believe "Digital Cash" and "Net-banking" are the same because both use the internet.', reveals: 'digital-cash-and-net-banking' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_05_006', title: 'Outsourcing: Concept, Scope and Basis',
          caseStudy: { intro: 'Imagine you run a small but growing cloud-kitchen startup in Bengaluru.',
            decisions: [{ prompt: 'Define outsourcing in one sentence using the terms "non-core activity," "external agency," and "core competency."', options: [
                { text: 'Outsourcing is the delegation of non-core activities to an external agency so the firm', outcome: 'Outsourcing is the delegation of non-core activities to an external agency so the firm can.' },
                { text: 'outsourcing means sending jobs to another country', outcome: 'Not quite — Students equate outsourcing exclusively with *offshoring* (sending work overseas) or *IT/BPO* (call.', reveals: 'students-equate-outsourcing-exclusively-with' },
                { text: 'core competency', outcome: 'Not quite — Students equate outsourcing exclusively with *offshoring* (sending work overseas) or *IT/BPO* (call.', reveals: 'students-equate-outsourcing-exclusively-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Two neighbourhood bakeries compete in your school\'s \'digitisation challenge\'. Bakery A builds a glossy website for online orders but keeps kitchen, stock and accounts on paper registers. Bakery B has no online shop at all, but its billing, inventory, production schedule and supplier ordering all run on one internal network. The judge asks which is the bigger e-business.',
            decisions: [{ prompt: 'Which bakery is more of an e-business?', options: [
                { text: 'Bakery B — e-business covers every networked business function: intra-B coordination between sales, kitchen, inventory and accounts, plus B2B supplier ordering. A customer-facing website is only the B2C slice of e-commerce; Bakery A is a manual business with a digital brochure.', outcome: 'E-business is the firm\'s whole digital nervous system — internal networked processes count even with zero online sales.' },
                { text: 'Bakery A — e-business means selling online, and it has a storefront website while B doesn\'t sell to customers digitally at all.', outcome: 'That collapses e-business into B2C e-commerce; the NCERT definition covers industry, trade AND commerce over networks — including invisible internal processes.', reveals: 'ebusiness-equals-online-shop' },
                { text: 'Neither — e-business requires both online sales and internal networking, so both fail.', outcome: 'There\'s no such combined requirement; even a firm with no customer website can be an e-business if its internal functions run on networks (Intra-B).', reveals: 'ebusiness-needs-both' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now draw the real boundary: e-commerce is a subset of e-business, and \'Intra-B\' is the category everyone forgets exists.',
            decisions: [{ prompt: 'What comes next? Emerging Modes of Business · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Emerging Modes of Business · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_001', difficulty: 'standard',
          question: 'E-business is the conduct of industry, trade, and commerce using computer.',
          hint: 'If stuck, revisit Class 10 Economics Chapter 3 "Money and Credit" — specifically the.',
          misconception: 'Students equate e-business with "having a website for online shopping" (B2C e-commerce only).',
          parts: [
                { id: 'a', prompt: 'Compare traditional business and e-business on the basis of: (i) nature of internal communication, (ii) business process cycle length, (iii) opportunity for.', answer: '(i) Traditional: hierarchical (top-down); e-business: non-hierarchical (direct',
                  options: ['(i) Traditional: hierarchical (top-down); e-business: non-hierarchical (direct', 'because'],
                  hint: 'If stuck, revisit Class 10 Economics Chapter 3 "Money and Credit" — specifically the evolution from.',
                  misconception: 'Students equate e-business with "having a website for online shopping" (B2C e-commerce only).' }
          ],
            remediations: { 'students-equate-e-business-with': { steps: ['Ask the student to list *all* activities in a bakery from flour arrival to cake delivery.', 'For each activity, ask: "Can this be done via computer network connecting two parties?"', 'Identify the *parties* for each networked activity — are they both businesses (B2B)? Business and customer (B2C)?', 'Show that even without a customer-facing website, if the bakery\'s purchase, production, and accounts are on a shared.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_002', difficulty: 'standard',
          question: 'E-business refers to the conduct of industry, trade, and commerce using.',
          hint: 'Revisit c11_bs_cbse_05_001: Focus on the definition of e-business vs e-commerce, and the.',
          misconception: 'Students often think "e-business benefits only big companies" because they see Amazon/Flipkart dominating.',
          parts: [
                { id: 'a', prompt: 'State any two benefits of e-business for a business organisation as per NCERT.', answer: 'Correct answer: (1) Expands marketplace to national and international markets',
                  options: ['Correct answer: (1) Expands marketplace to national and international markets', 'e-business eliminates all risks', 'guarantees profit', 'online payment'],
                  hint: 'Revisit c11_bs_cbse_05_001: Focus on the definition of e-business vs e-commerce, and the four scope.',
                  misconception: 'Students often think "e-business benefits only big companies" because they see Amazon/Flipkart dominating.' },
                { id: 'b', prompt: 'A small bakery in Jaipur wants to start selling its specialised gluten-free cakes online across India.', answer: 'Benefits: (1) Global reach',
                  options: ['Benefits: (1) Global reach', 'fast delivery solves incongruence', 'e-business benefits only big companies', '"e-business benefits only big companies"'],
                  hint: 'Revisit c11_bs_cbse_05_001: Focus on the definition of e-business vs e-commerce, and the four scope.',
                  misconception: 'Students often think "e-business benefits only big companies" because they see Amazon/Flipkart dominating.' }
          ],
            remediations: { 'e-business-benefits-only-big': { steps: ['Ask the student to name three small businesses in their neighbourhood that started during COVID using only.', 'Have them list what each gained (benefit) and what they struggled with (limitation).', 'Map each struggle to the textbook\'s six limitations — e.g., "customers wanted to touch fabric" → low personal touch.', 'Ask: "Which limitation made the tailor lose a customer permanently?" This forces discrimination between fixable.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "e-business benefits only big companies" because they see Amazon/Flipkart dominating.',
          parts: [
                { id: 'a', prompt: '"Most limitations of e-business are in the process of being overcome." Evaluate this statement from the textbook by analysing two limitations that have.', answer: 'Reduced limitations: (1) Low personal touch',
                  options: ['Reduced limitations: (1) Low personal touch', 'delivery speed', 'e-business benefits only big companies', '"e-business benefits only big companies"'],
                  hint: 'Revisit c11_bs_cbse_05_001: Focus on the definition of e-business vs e-commerce, and the four scope.',
                  misconception: 'Students often think "e-business benefits only big companies" because they see Amazon/Flipkart dominating.' },
                { id: 'b', prompt: 'Design a 3-column table for a Class 11 student revising this topic: Column 1 = Benefit/Limitation, Column 2 = Key Keyword/Phrase (for memory), Column 3.', answer: 'A good answer will produce a table with 11 rows',
                  options: ['A good answer will produce a table with 11 rows', 'e-business benefits only big companies', '"e-business benefits only big companies"'],
                  hint: 'Revisit c11_bs_cbse_05_001: Focus on the definition of e-business vs e-commerce, and the four scope.',
                  misconception: 'Students often think "e-business benefits only big companies" because they see Amazon/Flipkart dominating.' }
          ],
            remediations: { 'e-business-benefits-only-big': { steps: ['Ask the student to name three small businesses in their neighbourhood that started during COVID using only.', 'Have them list what each gained (benefit) and what they struggled with (limitation).', 'Map each struggle to the textbook\'s six limitations — e.g., "customers wanted to touch fabric" → low personal touch.', 'Ask: "Which limitation made the tailor lose a customer permanently?" This forces discrimination between fixable.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_003', difficulty: 'standard',
          question: 'The scope of e-business is classified by the nature of transacting parties into.',
          hint: 'If stuck, revisit Class 6 Economics "What is a Market?" (c6_economics_ch12_001).',
          misconception: 'Students consistently confuse the *firm\'s identity* with the *transaction\'s model*.',
          parts: [
                { id: 'a', prompt: 'A manufacturing firm uses its intranet to let the marketing department send customised order specifications directly to the production floor, and the.', answer: 'These are Intra-B commerce activities',
                  options: ['These are Intra-B commerce activities', 'e-commerce'],
                  hint: 'If stuck, revisit Class 6 Economics "What is a Market?" (c6_economics_ch12_001) to practice.',
                  misconception: 'Students consistently confuse the *firm\'s identity* with the *transaction\'s model*.' },
                { id: 'b', prompt: 'Rahul sells his used smartphone to Priya on OLX. They use OLX\'s chat to negotiate, but Rahul insists on cash payment at pickup while Priya prefers UPI.', answer: 'This is C2C commerce',
                  options: ['This is C2C commerce', 'only names "C2C" without mechanisms shows superficial recall'],
                  hint: 'If stuck, revisit Class 6 Economics "What is a Market?" (c6_economics_ch12_001) to practice.',
                  misconception: 'Students consistently confuse the *firm\'s identity* with the *transaction\'s model*.' }
          ],
            remediations: { 'students-consistently-confuse-the-firm': { steps: ['Give the student a single familiar company (e.g., Apple) and ask them to list ONE transaction for each model: B2B.', 'Have them identify the two parties and network for each.', 'Explicitly contrast: "The model name describes the transaction\'s parties, not the company."', 'Practice with 3 more companies (Amazon, Tata Motors, a local bakery with Instagram orders) until they can fluidly.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_004', difficulty: 'standard',
          question: 'E-business vs Traditional Business comparison is the systematic analysis of how.',
          hint: 'Revisit c11_bs_cbse_05_001 (E-business Meaning, Scope) and c6_economics_ch12_001 (What.',
          misconception: 'Students believe "e-business has no physical presence" means zero physical infrastructure.',
          parts: [
                { id: 'a', prompt: 'State any three bases of distinction between traditional business and e-business from NCERT Table 5.1.', answer: 'Correct answer: Any three from: Ease of formation, Physical presence, Locational',
                  options: ['Correct answer: Any three from: Ease of formation, Physical presence, Locational', 'profit margin', 'number of employees', 'e-business has no physical presence'],
                  hint: 'Revisit c11_bs_cbse_05_001 (E-business Meaning, Scope) and c6_economics_ch12_001 (What is.',
                  misconception: 'Students believe "e-business has no physical presence" means zero physical infrastructure.' },
                { id: 'b', prompt: 'Explain in your own words why the "shape of organisational structure" differs between traditional business (vertical/tall) and e-business (horizontal/flat).', answer: 'Correct answer: Traditional business relies on hierarchical chain of command',
                  options: ['Correct answer: Traditional business relies on hierarchical chain of command', 'less managers', 'technology makes it flat', 'e-business has no physical presence'],
                  hint: 'Revisit c11_bs_cbse_05_001 (E-business Meaning, Scope) and c6_economics_ch12_001 (What is.',
                  misconception: 'Students believe "e-business has no physical presence" means zero physical infrastructure.' },
                { id: 'c', prompt: 'A traditional bookstore owner wants to start selling online. Using the "Business processes and length of the cycle" basis, explain how the order-to-delivery.', answer: 'Correct answer: Traditional: Sequential cycle',
                  options: ['Correct answer: Traditional: Sequential cycle', 'faster delivery', 'e-business has no physical presence', '"e-business has no physical presence" means zero physical infrastructure'],
                  hint: 'Revisit c11_bs_cbse_05_001 (E-business Meaning, Scope) and c6_economics_ch12_001 (What is.',
                  misconception: 'Students believe "e-business has no physical presence" means zero physical infrastructure.' }
          ],
            remediations: { 'e-business-has-no-physical': { steps: ['Ask student to draw the value chain for a traditional bookstore (procure → store → display → sell → deliver) and.', 'Have them circle every physical element in both chains (warehouse, delivery van, server room, packaging).', 'Explain: "Physical presence is not required *for the customer to browse and order*, but fulfilment remains physical for.', 'Practice writing qualified answers: "Physical storefront not required; however, warehousing and logistics.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_005', difficulty: 'standard',
          question: 'Online transactions in e-business refer to the end-to-end digital process.',
          hint: 'If stuck, revisit c11_bs_cbse_05_001 (e-business meaning) and c10_eco_cbse_03_002 (modern.',
          misconception: 'Students often believe "Digital Cash" and "Net-banking" are the same because both use the internet and banks.',
          parts: [
                { id: 'a', prompt: 'List the three operational stages of an online transaction in their correct sequence as per NCERT.', answer: 'The three stages in sequence are: (1) Pre-purchase/sale stage (advertising and',
                  options: ['The three stages in sequence are: (1) Pre-purchase/sale stage (advertising and', 'Digital Cash', 'Net-banking', 'Digital cash is when you pay via PhonePe/UPI'],
                  hint: 'If stuck, revisit c11_bs_cbse_05_001 (e-business meaning) and c10_eco_cbse_03_002 (modern forms.',
                  misconception: 'Students often believe "Digital Cash" and "Net-banking" are the same because both use the internet and banks.' },
                { id: 'b', prompt: 'A small business owner wants to sell handmade crafts online. She has no technical staff, limited capital, and her target customers are in remote areas with.', answer: 'Cash on Delivery (CoD) is most suitable',
                  options: ['Cash on Delivery (CoD) is most suitable', 'Digital Cash', 'Net-banking', 'Digital cash is when you pay via PhonePe/UPI'],
                  hint: 'If stuck, revisit c11_bs_cbse_05_001 (e-business meaning) and c10_eco_cbse_03_002 (modern forms.',
                  misconception: 'Students often believe "Digital Cash" and "Net-banking" are the same because both use the internet and banks.' },
                { id: 'c', prompt: 'Compare "Net-banking Transfer (NEFT/RTGS/IMPS)" and "Digital Cash" on the following dimensions: (a) need for pre-loading funds, (b) role of bank during.', answer: '| Dimension | Net-banking Transfer | Digital Cash |',
                  options: ['| Dimension | Net-banking Transfer | Digital Cash |', 'Digital Cash', 'Net-banking', 'Digital cash is when you pay via PhonePe/UPI'],
                  hint: 'If stuck, revisit c11_bs_cbse_05_001 (e-business meaning) and c10_eco_cbse_03_002 (modern forms.',
                  misconception: 'Students often believe "Digital Cash" and "Net-banking" are the same because both use the internet and banks.' }
          ],
            remediations: { 'digital-cash-and-net-banking': { steps: ['**Create a two-column comparison table** with the student: left column "Net-banking (IMPS/NEFT/RTGS)", right column.', 'Row headers: "When does money leave buyer\'s account?", "Is bank involved at moment of purchase?", "Where is value.', '**Walk through a concrete scenario**: "You buy ₹500 digital cash from HDFC Bank on Monday (software downloaded).', 'On Wednesday, you use ₹300 of it to buy a game on a website.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_006', difficulty: 'standard',
          question: 'Outsourcing is the strategic business practice of contracting out non-core.',
          hint: 'Revisit Class 8 Economics "Entrepreneurship: Organising Factors of Production".',
          misconception: 'Students equate outsourcing exclusively with *offshoring* (sending work overseas) or *IT/BPO* (call centres, coding).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Outsourcing is the strategic business practice of contracting out non-core or routine',
                  options: ['Outsourcing is the strategic business practice of contracting out non-core or routine', 'E-business is the conduct of industry, trade, and commerce using computer networks', 'E-business refers to the conduct of industry, trade, and commerce using computer networks', 'The scope of e-business is classified by the nature of transacting parties into four'],
                  hint: 'Revisit Class 8 Economics "Entrepreneurship: Organising Factors of Production" (c8_eco_ch1_6).',
                  misconception: 'Students equate outsourcing exclusively with *offshoring* (sending work overseas) or *IT/BPO* (call centres, coding).' }
          ],
            remediations: { 'students-equate-outsourcing-exclusively-with': { steps: ['Show the hospital-laundry example and ask "Is this outsourcing?" — student says no.', 'Re-read the definition together highlighting three words: "non-core," "external," "agency" — no mention of country.', 'Have the student list 5 services a neighbourhood café could outsource locally (pest control, accounting, waste.', 'Ask them to redefine outsourcing in their own words without using "foreign" or "IT."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
