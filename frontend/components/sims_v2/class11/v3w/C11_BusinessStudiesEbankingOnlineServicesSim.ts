import type { SimDef } from '../../engine/types';
import C11_BusinessStudiesEbankingOnlineServicesSim from '../../../simulations/c6_12/C11_BusinessStudiesEbankingOnlineServicesSim';

/** v3 wrapped master — C11_BusinessStudiesEbankingOnlineServicesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_businessstudiesebankingonlineservicessim: SimDef = {
    id: 'v3w_c11_businessstudiesebankingonlineservicessim',
    title: 'Ebanking Online Services',
    subtitle: 'This node covers the NCERT Class 11 Chapter 5 content on online transaction stages,.',
    classLevel: 11, subject: 'business_studies', topic: 'Online Transactions: Payment Mechanisms and Security',
    chapters: [],
    nodeIds: ['c11_bs_cbse_05_005', 'c11_bs_cbse_05_001', 'c11_bs_cbse_05_002', 'c11_bs_cbse_05_004', 'c11_bs_cbse_05_009', 'c11_bs_cbse_05_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you want to buy a smartphone online at midnight. You visit an e-commerce site, create an account.', goal: 'Master Ebanking Online Services.' },
    discovery: {
        question: 'List the three operational stages of an online transaction in their correct sequence as per NCERT.',
        options: ['The three stages in sequence are: (1) Pre-purchase/sale stage (advertising and', 'Digital Cash', 'Net-banking'],
        answer: 'The three stages in sequence are: (1) Pre-purchase/sale stage (advertising and',
        hook: 'Students often believe "Digital Cash" and "Net-banking" are the same because both use the internet and banks.',
    },
    teaching: [
        { title: 'Online transactions in e-business refer to.', text: 'Online transactions in e-business refer to the end-to-end digital process of purchasing goods or services over the internet, encompassing three operational stages: pre-purchase/sale (advertising,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_bs_cbse_05_005', title: 'Online transactions in e-business refer.',
          scaffold: { problem: 'A B2C e-commerce startup "KraftKart" sells handmade furniture (average order value ₹15,000) to customers across India.',
            steps: [
            { text: 'Identify the problem constraints: high-value goods (₹15k), geographically dispersed customers including.' },
            { text: 'List all five NCERT payment mechanisms and eliminate unsuitable ones: (a) Cheque – requires physical pickup, slow.' },
            { text: 'Evaluate CoD against constraints: Settlement timing – payment at delivery eliminates customer\'s advance payment fear.' },
            { text: 'Check for downsides: CoD has higher return rates (RTO) and cash handling risk for courier.' },
            { text: 'Conclude: CoD is the single best addition. It addresses the trust gap for new customers in semi-urban areas, requires.', faded: true, blankAnswer: 'Cash on Delivery (CoD) – because (1) payment at physical.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_05_001', title: 'E-business is the conduct of industry,.',
          scaffold: { problem: 'A furniture manufacturer "WoodCraft" receives an online order from a retail chain "HomeStyle" for 500 chairs.',
            steps: [
            { text: 'Identify the transacting parties for each action — WoodCraft (manufacturer) is the central firm.' },
            { text: 'Action 1: WoodCraft → GreenWood. Both are business firms. This is procurement of inputs. Classification: B2B.' },
            { text: 'Action 2: Production scheduling involves WoodCraft\'s sales order data flowing to production department via intranet.' },
            { text: 'Action 3: Inventory allocation involves warehouse system (internal) updating stock levels. Internal parties.' },
            { text: 'Action 4: Invoicing to HomeStyle. WoodCraft (business) to HomeStyle (business). Classification: B2B.' },
            { text: 'Action 5: Dispatch coordination with FastMove. WoodCraft (business) to logistics partner (business).', faded: true, blankAnswer: 'Action 1: B2B; Action 2: Intra-B; Action 3: Intra-B; Action.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_05_002', title: 'E-business refers to the conduct of.',
          scaffold: { problem: '"GreenLeaf Organics" is a 3-person startup in Coimbatore selling cold-pressed oils. They currently sell at a weekly organic market.',
            steps: [
            { text: 'Identify the business context — small scale, perishable/quality-sensitive product, local to national transition.' },
            { text: 'Map benefits: (a) Ease of formation/lower investment (NCERT 5.3(i)) — no physical shop rent, just website + courier.' },
            { text: 'Map limitations: (a) Incongruence order vs fulfilment (NCERT 5.4(ii)) — order instant, but oil bottles fragile, need.' },
            { text: 'Evaluate net impact — benefits likely outweigh limitations because product is non-perishable enough for 3-day transit,.' },
            { text: 'Conclude with strategic advice — invest in tamper-proof packaging, tie up with reliable cold-chain logistics, use video.', faded: true, blankAnswer: 'Benefits: 1) Low investment entry (no shop rent), 2).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_05_004', title: 'E-business vs Traditional Business.',
          scaffold: { problem: '"GreenLeaf Organics" sells fresh vegetables. Traditional: Owns a 500 sq.ft shop in a local market, 3 staff, opens 9 AM–9 PM, serves 2 km.',
            steps: [
            { text: 'Identify the two models: Traditional (physical shop) vs E-business (online platform with farm tie-ups).' },
            { text: 'For each basis, extract relevant details from the case. (a) Setting up: Shop rent, interior, licenses vs website.' },
            { text: 'Map each to Table 5.1 language: (a) High vs Low, (b) High fixed charges vs Low (network relationships), (c) Indirect.' },
            { text: 'Synthesize: Traditional better for trust-building via touch; E-business better for reach, convenience, lower fixed cost.' },
            { text: 'Verify: Does each comparison align with NCERT basis definitions? Yes.', faded: true, blankAnswer: '(a) Traditional: High (rent, interior); E-business: Low.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_05_009', title: 'E-business applications are specific.',
          scaffold: { problem: 'A Mumbai-based auto component manufacturer needs to procure 10,000 units of precision bearings quarterly.',
            steps: [
            { text: 'Identify the current manual process steps and total cycle time (14 days given).' },
            { text: 'List the e-Procurement reverse auction steps with their digital durations as provided.' },
            { text: 'Sum the digital step durations: 0.5 + 1 + 3 + 0.5 + 0.25 = 5.25 days.' },
            { text: 'Compute cycle time reduction: 14 - 5.25 = 8.75 days saved per quarterly order.' },
            { text: 'Interpret the result: 62.5% reduction enables faster inventory turnover and just-in-time production scheduling.', faded: true, blankAnswer: '8.75 days reduction per order (62.5% faster); 35 days.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_05_010', title: 'Resources required for e-business refer.',
          scaffold: { problem: 'A Mumbai-based startup plans to launch a B2C website selling organic spices.',
            steps: [
            { text: 'Identify core requirements from the scenario: B2C model (public-facing), high concurrency (500 users), transaction.' },
            { text: 'Allocate Hardware: Cloud VPS (4 vCPU, 8GB RAM, 200GB SSD) ~₹8,000/month on AWS/Azure Indian region — chosen over.' },
            { text: 'Allocate Software: Open-source stack (Linux, Nginx, PostgreSQL, Django/WordPress+WooCommerce) — zero licence cost.' },
            { text: 'Allocate Data: Product catalogue (SKU, name, weight, price, GST rate, stock, images) — 500 SKUs.' },
            { text: 'Verify budget fit: Month 1 hardware ₹8,000 + scanner ₹3,000 + GST SaaS ₹500 = ₹11,500 < ₹5L.', faded: true, blankAnswer: 'Hardware: Cloud VPS (₹8k/mo), CDN (free), barcode scanner.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_bs_cbse_05_001', title: 'Identify each idea',
          dissect: { specimen: 'Ebanking Online Services', spots: [
            { id: 's1', label: 'Online transactions in e-business refer', prompt: 'Which idea is this? — Online transactions in e-business refer to the end-to-end digital process of purchasing.', answer: 'Online transactions in e-business refer', options: ['Online transactions in e-business refer', 'E-business is the conduct of', 'E-business refers to the conduct', 'E-business vs Traditional Business comparison'] },
            { id: 's2', label: 'E-business is the conduct of', prompt: 'Which idea is this? — E-business is the conduct of industry, trade, and commerce using computer networks.', answer: 'E-business is the conduct of', options: ['E-business is the conduct of', 'Online transactions in e-business refer', 'E-business refers to the conduct', 'E-business vs Traditional Business comparison'] },
            { id: 's3', label: 'E-business refers to the conduct', prompt: 'Which idea is this? — E-business refers to the conduct of industry, trade, and commerce using computer networks.', answer: 'E-business refers to the conduct', options: ['E-business refers to the conduct', 'Online transactions in e-business refer', 'E-business is the conduct of', 'E-business vs Traditional Business comparison'] },
            { id: 's4', label: 'E-business vs Traditional Business comparison', prompt: 'Which idea is this? — E-business vs Traditional Business comparison is the systematic analysis of how business.', answer: 'E-business vs Traditional Business comparison', options: ['E-business vs Traditional Business comparison', 'Online transactions in e-business refer', 'E-business is the conduct of', 'E-business refers to the conduct'] },
            { id: 's5', label: 'E-business applications are specific internet-enabled', prompt: 'Which idea is this? — E-business applications are specific internet-enabled tools and processes that.', answer: 'E-business applications are specific internet-enabled', options: ['E-business applications are specific internet-enabled', 'Online transactions in e-business refer', 'E-business is the conduct of', 'E-business refers to the conduct'] },
            { id: 's6', label: 'Resources required for e-business refer', prompt: 'Which idea is this? — Resources required for e-business refer to the essential technological infrastructure.', answer: 'Resources required for e-business refer', options: ['Resources required for e-business refer', 'Online transactions in e-business refer', 'E-business is the conduct of', 'E-business refers to the conduct'] }
          ] } }
    ],
    explore: { component: C11_BusinessStudiesEbankingOnlineServicesSim, prompt: 'Explore the interactive — Ebanking Online Services' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_005', difficulty: 'standard',
          question: 'Online transactions in e-business refer to the end-to-end digital process of.',
          hint: 'If stuck, revisit c11_bs_cbse_05_001 (e-business meaning) and c10_eco_cbse_03_002 (modern.',
          misconception: 'Students often believe "Digital Cash" and "Net-banking" are the same because both use the internet and banks.',
          parts: [
                { id: 'a', prompt: 'List the three operational stages of an online transaction in their correct sequence as per NCERT.', answer: 'The three stages in sequence are: (1) Pre-purchase/sale stage (advertising and',
                  options: ['The three stages in sequence are: (1) Pre-purchase/sale stage (advertising and', 'Digital Cash', 'Net-banking'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Digital Cash" and "Net-banking" are the same because both use the internet and banks.' },
                { id: 'b', prompt: 'A small business owner wants to sell handmade crafts online. She has no technical staff, limited capital, and her target customers are in remote areas with.', answer: 'Cash on Delivery (CoD) is most suitable',
                  options: ['Cash on Delivery (CoD) is most suitable', 'Digital Cash', 'Net-banking'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Digital Cash" and "Net-banking" are the same because both use the internet and banks.' },
                { id: 'c', prompt: 'Compare "Net-banking Transfer (NEFT/RTGS/IMPS)" and "Digital Cash" on the following dimensions: (a) need for pre-loading funds, (b) role of bank during.', answer: '| Dimension | Net-banking Transfer | Digital Cash |',
                  options: ['| Dimension | Net-banking Transfer | Digital Cash |', 'Digital Cash', 'Net-banking'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Digital Cash" and "Net-banking" are the same because both use the internet and banks.' }
          ],
            remediations: { 'digital-cash-and-net-banking': { steps: ['**Create a two-column comparison table** with the student: left column "Net-banking (IMPS/NEFT/RTGS)", right column.', 'Row headers: "When does money leave buyer\'s account?", "Is bank involved at moment of purchase?", "Where is value.', '**Walk through a concrete scenario**: "You buy ₹500 digital cash from HDFC Bank on Monday (software downloaded).', 'On Wednesday, you use ₹300 of it to buy a game on a website.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "Digital Cash" and "Net-banking" are the same because both use the internet and banks.',
          parts: [
                { id: 'a', prompt: '"SSL (Secure Sockets Layer) encryption is the only security measure needed for safe online transactions." Evaluate this statement using NCERT\'s three risk.', answer: 'The statement is false',
                  options: ['The statement is false', 'Digital Cash', 'Net-banking', 'Digital cash is when you pay via PhonePe/UPI'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Digital Cash" and "Net-banking" are the same because both use the internet and banks.' },
                { id: 'b', prompt: 'Design a 4-step security protocol for a new B2C e-commerce startup that sells downloadable software.', answer: 'Example protocol: 1',
                  options: ['Example protocol: 1', 'Digital Cash', 'Net-banking', 'Digital cash is when you pay via PhonePe/UPI'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Digital Cash" and "Net-banking" are the same because both use the internet and banks.' }
          ],
            remediations: { 'digital-cash-and-net-banking': { steps: ['**Create a two-column comparison table** with the student: left column "Net-banking (IMPS/NEFT/RTGS)", right column.', 'Row headers: "When does money leave buyer\'s account?", "Is bank involved at moment of purchase?", "Where is value.', '**Walk through a concrete scenario**: "You buy ₹500 digital cash from HDFC Bank on Monday (software downloaded).', 'On Wednesday, you use ₹300 of it to buy a game on a website.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_001', difficulty: 'standard',
          question: 'E-business is the conduct of industry, trade, and commerce using computer.',
          hint: 'If stuck, revisit Class 10 Economics Chapter 3 "Money and Credit" — specifically the.',
          misconception: 'Students equate e-business with "having a website for online shopping" (B2C e-commerce only).',
          parts: [
                { id: 'a', prompt: 'Compare traditional business and e-business on the basis of: (i) nature of internal communication, (ii) business process cycle length, (iii) opportunity for.', answer: '(i) Traditional: hierarchical (top-down); e-business: non-hierarchical (direct',
                  options: ['(i) Traditional: hierarchical (top-down); e-business: non-hierarchical (direct', 'because'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate e-business with "having a website for online shopping" (B2C e-commerce only).' }
          ],
            remediations: { 'students-equate-e-business-with': { steps: ['Ask the student to list *all* activities in a bakery from flour arrival to cake delivery.', 'For each activity, ask: "Can this be done via computer network connecting two parties?"', 'Identify the *parties* for each networked activity — are they both businesses (B2B)? Business and customer (B2C)?', 'Show that even without a customer-facing website, if the bakery\'s purchase, production, and accounts are on a shared.', 'Contrast with "website only" — a bakery with a pretty website but manual paper-based kitchen-inventory-accounting is.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate e-business with "having a website for online shopping" (B2C e-commerce only).',
          parts: [
                { id: 'a', prompt: 'Compare traditional business and e-business on the basis of: (i) nature of internal communication, (ii) business process cycle length, (iii) opportunity for.', answer: '(i) Traditional: hierarchical (top-down); e-business: non-hierarchical (direct',
                  options: ['(i) Traditional: hierarchical (top-down); e-business: non-hierarchical (direct', 'because'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate e-business with "having a website for online shopping" (B2C e-commerce only).' }
          ],
            remediations: { 'students-equate-e-business-with': { steps: ['Ask the student to list *all* activities in a bakery from flour arrival to cake delivery.', 'For each activity, ask: "Can this be done via computer network connecting two parties?"', 'Identify the *parties* for each networked activity — are they both businesses (B2B)? Business and customer (B2C)?', 'Show that even without a customer-facing website, if the bakery\'s purchase, production, and accounts are on a shared.', 'Contrast with "website only" — a bakery with a pretty website but manual paper-based kitchen-inventory-accounting is.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_002', difficulty: 'standard',
          question: 'E-business refers to the conduct of industry, trade, and commerce using.',
          hint: 'Revisit c11_bs_cbse_05_001: Focus on the definition of e-business vs e-commerce, and the.',
          misconception: 'Students often think "e-business benefits only big companies" because they see Amazon/Flipkart dominating.',
          parts: [
                { id: 'a', prompt: 'State any two benefits of e-business for a business organisation as per NCERT.', answer: 'Correct answer: (1) Expands marketplace to national and international markets',
                  options: ['Correct answer: (1) Expands marketplace to national and international markets', 'e-business eliminates all risks', 'guarantees profit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "e-business benefits only big companies" because they see Amazon/Flipkart dominating.' },
                { id: 'b', prompt: 'A small bakery in Jaipur wants to start selling its specialised gluten-free cakes online across India.', answer: 'Benefits: (1) Global reach',
                  options: ['Benefits: (1) Global reach', 'fast delivery solves incongruence', 'e-business benefits only big companies'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "e-business benefits only big companies" because they see Amazon/Flipkart dominating.' }
          ],
            remediations: { 'e-business-benefits-only-big': { steps: ['Ask the student to name three small businesses in their neighbourhood that started during COVID using only.', 'Have them list what each gained (benefit) and what they struggled with (limitation).', 'Map each struggle to the textbook\'s six limitations — e.g., "customers wanted to touch fabric" → low personal touch;.', 'Ask: "Which limitation made the tailor lose a customer permanently?" This forces discrimination between fixable.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "e-business benefits only big companies" because they see Amazon/Flipkart dominating.',
          parts: [
                { id: 'a', prompt: '"Most limitations of e-business are in the process of being overcome." Evaluate this statement from the textbook by analysing two limitations that have.', answer: 'Reduced limitations: (1) Low personal touch',
                  options: ['Reduced limitations: (1) Low personal touch', 'delivery speed', 'e-business benefits only big companies', '"e-business benefits only big companies"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "e-business benefits only big companies" because they see Amazon/Flipkart dominating.' },
                { id: 'b', prompt: 'Design a 3-column table for a Class 11 student revising this topic: Column 1 = Benefit/Limitation, Column 2 = Key Keyword/Phrase (for memory), Column 3 =.', answer: 'A good answer will produce a table with 11 rows',
                  options: ['A good answer will produce a table with 11 rows', 'e-business benefits only big companies', '"e-business benefits only big companies"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "e-business benefits only big companies" because they see Amazon/Flipkart dominating.' }
          ],
            remediations: { 'e-business-benefits-only-big': { steps: ['Ask the student to name three small businesses in their neighbourhood that started during COVID using only.', 'Have them list what each gained (benefit) and what they struggled with (limitation).', 'Map each struggle to the textbook\'s six limitations — e.g., "customers wanted to touch fabric" → low personal touch;.', 'Ask: "Which limitation made the tailor lose a customer permanently?" This forces discrimination between fixable.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_004', difficulty: 'standard',
          question: 'E-business vs Traditional Business comparison is the systematic analysis of how.',
          hint: 'Revisit c11_bs_cbse_05_001 (E-business Meaning, Scope) and c6_economics_ch12_001 (What is.',
          misconception: 'Students believe "e-business has no physical presence" means zero physical infrastructure.',
          parts: [
                { id: 'a', prompt: 'State any three bases of distinction between traditional business and e-business from NCERT Table 5.1.', answer: 'Correct answer: Any three from: Ease of formation, Physical presence, Locational',
                  options: ['Correct answer: Any three from: Ease of formation, Physical presence, Locational', 'profit margin', 'number of employees'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "e-business has no physical presence" means zero physical infrastructure.' },
                { id: 'b', prompt: 'Explain in your own words why the "shape of organisational structure" differs between traditional business (vertical/tall) and e-business (horizontal/flat).', answer: 'Correct answer: Traditional business relies on hierarchical chain of command',
                  options: ['Correct answer: Traditional business relies on hierarchical chain of command', 'less managers', 'technology makes it flat'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "e-business has no physical presence" means zero physical infrastructure.' },
                { id: 'c', prompt: 'A traditional bookstore owner wants to start selling online. Using the "Business processes and length of the cycle" basis, explain how the order-to-delivery.', answer: 'Correct answer: Traditional: Sequential cycle',
                  options: ['Correct answer: Traditional: Sequential cycle', 'faster delivery', 'e-business has no physical presence'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "e-business has no physical presence" means zero physical infrastructure.' }
          ],
            remediations: { 'e-business-has-no-physical': { steps: ['Ask student to draw the value chain for a traditional bookstore (procure → store → display → sell → deliver) and an.', 'Have them circle every physical element in both chains (warehouse, delivery van, server room, packaging).', 'Explain: "Physical presence is not required *for the customer to browse and order*, but fulfilment remains physical for.', 'Practice writing qualified answers: "Physical storefront not required; however, warehousing and logistics.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "e-business has no physical presence" means zero physical infrastructure.',
          parts: [
                { id: 'a', prompt: 'Evaluate: "E-business completely eliminates the need for physical infrastructure." Defend or refute using at least three bases from Table 5.1.', answer: 'Correct answer: Refute',
                  options: ['Correct answer: Refute', 'virtual', 'zero physical assets', 'e-business has no physical presence'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "e-business has no physical presence" means zero physical infrastructure.' }
          ],
            remediations: { 'e-business-has-no-physical': { steps: ['Ask student to draw the value chain for a traditional bookstore (procure → store → display → sell → deliver) and an.', 'Have them circle every physical element in both chains (warehouse, delivery van, server room, packaging).', 'Explain: "Physical presence is not required *for the customer to browse and order*, but fulfilment remains physical for.', 'Practice writing qualified answers: "Physical storefront not required; however, warehousing and logistics.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_009', difficulty: 'standard',
          question: 'E-business applications are specific internet-enabled tools and processes that.',
          hint: 'Revisit c11_bs_cbse_05_003 and create a 2x2 matrix: rows = scope (B2B, B2C, Intra-B,.',
          misconception: 'Students often treat e-Procurement, e-Commerce, and e-Trading as interchangeable "online buying-selling" because all.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'E-business applications are specific internet-enabled tools and processes that',
                  options: ['E-business applications are specific internet-enabled tools and processes that', 'Online transactions in e-business refer to the end-to-end digital process of purchasing', 'E-business is the conduct of industry, trade, and commerce using computer networks', 'E-business refers to the conduct of industry, trade, and commerce using computer networks'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat e-Procurement, e-Commerce, and e-Trading as interchangeable "online buying-selling" because all involve websites and.' }
          ],
            remediations: { 'students-often-treat-e-procurement': { steps: ['Ask the student to list the two parties in each transaction type (e.g., "Who buys and who sells in e-Procurement?").', 'Have them draw a 3-column table: Application | Parties | Price Discovery Mechanism.', 'Give three scenarios (government tender, buying a book, buying shares) and ask them to map each to the correct column.', 'Explicitly contrast "reverse auction" (sellers compete for one buyer) vs.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_010', difficulty: 'standard',
          question: 'Resources required for e-business refer to the essential technological.',
          hint: 'Revisit the distinction between "accessing the internet" (client role) and "hosting a.',
          misconception: 'Students believe "data" only means the product catalogue, ignoring that transaction logs, customer behaviour analytics,.',
          parts: [
                { id: 'a', prompt: 'Explain why a simple broadband connection and a laptop are insufficient for running a professional B2C e-commerce website, even though they can access the.', answer: 'A laptop and broadband are client-side resources',
                  options: ['A laptop and broadband are client-side resources', 'storage'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "data" only means the product catalogue, ignoring that transaction logs, customer behaviour analytics, session cookies,.' },
                { id: 'b', prompt: 'A small artisan wants to sell customised jewellery via Instagram and WhatsApp, accepting UPI payments.', answer: 'Smartphone, (',
                  options: ['Smartphone, (', 'payment gateway is a physical device rather than a software interface/API'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "data" only means the product catalogue, ignoring that transaction logs, customer behaviour analytics, session cookies,.' }
          ],
            remediations: { 'data-only-means-the-product': { steps: ['Ask the student to trace a single online order from click to delivery, listing every piece of information.', 'Have them classify each information piece as "catalogue data" or "transactional/operational data."', 'Show how missing operational data (e.g., no courier API pincode data) breaks the process.', 'Revisit the NCERT phrase "online embodiment of all content" and expand "content" to include process data, not just.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "data" only means the product catalogue, ignoring that transaction logs, customer behaviour analytics,.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "For a startup, using a SaaS e-commerce platform (like Shopify) eliminates the need for hardware and software resources." Defend your.', answer: 'The statement is false',
                  options: ['The statement is false', 'cloud = no infrastructure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "data" only means the product catalogue, ignoring that transaction logs, customer behaviour analytics, session cookies,.' }
          ],
            remediations: { 'data-only-means-the-product': { steps: ['Ask the student to trace a single online order from click to delivery, listing every piece of information.', 'Have them classify each information piece as "catalogue data" or "transactional/operational data."', 'Show how missing operational data (e.g., no courier API pincode data) breaks the process.', 'Revisit the NCERT phrase "online embodiment of all content" and expand "content" to include process data, not just.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
