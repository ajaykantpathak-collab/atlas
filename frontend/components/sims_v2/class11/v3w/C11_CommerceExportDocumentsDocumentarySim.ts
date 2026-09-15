import type { SimDef } from '../../engine/types';
import C11_CommerceExportDocumentsDocumentarySim from '../../../simulations/c6_12/C11_CommerceExportDocumentsDocumentarySim';

/** v3 wrapped master — C11_CommerceExportDocumentsDocumentarySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_commerceexportdocumentsdocumentarysim: SimDef = {
    id: 'v3w_c11_commerceexportdocumentsdocumentarysim',
    title: 'Export Documents Documentary',
    subtitle: 'This node covers all major documents used in Indian export-import transactions as per.',
    classLevel: 11, subject: 'business_studies', topic: 'Documents Required for Export-Import Transactions',
    chapters: [],
    nodeIds: ['c11_bs_cbse_11_008', 'c11_bs_cbse_11_001', 'c11_bs_cbse_11_002', 'c11_bs_cbse_11_003', 'c11_bs_cbse_11_004', 'c11_bs_cbse_01_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you\'re Mr. Manchanda\'s son from the textbook case, helping your father export automobile components.', goal: 'Master Export Documents Documentary.' },
    discovery: {
        question: 'Explain why a Bill of Lading is called a "document of title" while a Shipping Bill is not, even though both are issued during export.',
        options: ['A Bill of Lading is a document of title', 'Bill of Lading', 'used at customs'],
        answer: 'A Bill of Lading is a document of title',
        hook: 'Students believe **Bill of Entry is an export document** because it sounds like "Bill of Lading" and both have "Bill".',
    },
    teaching: [
        { title: 'Export-import documentation refers to the.', text: 'Export-import documentation refers to the systematic set of legally mandated commercial, regulatory, and financial documents that facilitate the cross-border movement of goods, transfer of title,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_bs_cbse_11_008', title: 'Export-import documentation refers to.',
          scaffold: { problem: 'M/s Rajasthan Crafts (Jaipur) receives an export order for 500 handcrafted wooden boxes from a US buyer.',
            steps: [
            { text: 'Identify the starting point — goods are ready at factory. The first document needed for physical movement is the.' },
            { text: 'For customs clearance at Indian port, the exporter (or C&F agent) files the **Shipping Bill** (issued by Customs after.' },
            { text: 'After customs clearance and loading on vessel, the ship\'s officer issues **Mate\'s Receipt** (issued by Ship\'s Captain).' },
            { text: 'Shipping line issues **Bill of Lading** (issued by Shipping Line) against Mate\'s Receipt — this is the document of.' },
            { text: 'Exporter presents full document set (B/L, Invoice, Packing List, Certificate of Origin, Insurance Policy, Bill of.' },
            { text: 'On L/C compliance, exporter\'s bank sends documents to importer\'s bank; importer pays (sight draft) and receives.' },
            { text: 'Exporter\'s bank issues **Bank Certificate of Payment** (issued by Exporter\'s Bank) confirming realisation of export.', faded: true, blankAnswer: '1. Commercial Invoice (Exporter), 2. Packing List.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_11_001', title: 'International Business refers to all.',
          scaffold: { problem: '"GreenLeaf Textiles", a partnership firm in Tirupur, Tamil Nadu, manufactures organic cotton T-shirts. Currently it sells only in India.',
            steps: [
            { text: 'Recall the six components of scope from NCERT 11.1.4: (i) Merchandise exports/imports, (ii) Service exports/imports,.' },
            { text: 'Analyse Option A: Physical T-shirts move from India to France.' },
            { text: 'Analyse Option B: Brand name and designs (intellectual property) are licensed to a Bangladeshi factory for a fee.' },
            { text: 'Analyse Option C: GreenLeaf invests its own capital to establish a fully controlled stitching unit in Vietnam.' },
            { text: 'Summarise in a table mapping each option to scope component and factor movements.', faded: true, blankAnswer: 'Option A → Merchandise exports (goods). Option B →.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_11_002', title: 'International business arises because.',
          scaffold: { problem: 'India is labour-abundant but capital-scarce. Germany is capital-abundant but labour-scarce.',
            steps: [
            { text: 'Identify the relative factor endowments: India has abundant labour (low wage), Germany has abundant capital (low rental.' },
            { text: 'Determine comparative advantage: India has lower opportunity cost in labour-intensive goods (e.g., garments, leather.' },
            { text: 'Predict trade pattern: India exports labour-intensive goods to Germany; Germany exports capital-intensive goods to.' },
            { text: 'Explain gains from trade: By specialising, each country produces more of its comparative-advantage good.' },
            { text: 'Link to textbook: This mirrors the example where developing countries export garments and import textile machinery from.', faded: true, blankAnswer: 'India exports labour-intensive goods (garments, leather).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_11_003', title: 'Modes of entry into international.',
          scaffold: { problem: '"GreenTech Solar", a medium-sized Indian firm (₹50 crore turnover), manufactures high-efficiency solar panels using patented photovoltaic.',
            steps: [
            { text: 'Identify key constraints from scenario: (a) High tariffs make Exporting uncompetitive (textbook: "transportation costs.' },
            { text: 'Evaluate Joint Venture: Advantage — "local partner\'s knowledge of host countries", "sharing costs/risks".' },
            { text: 'Evaluate Licensing: Advantage — "no or very little foreign investment", "licensee has greater market knowledge", "legal.' },
            { text: 'Compare Licensing vs. Joint Venture for IP protection: Licensing legally restricts IP use to licensee; JV shares.' },
            { text: 'Select **Licensing** as best mode. Justification: (1) Low capital requirement matches firm size.', faded: true, blankAnswer: 'Licensing is the best entry mode for GreenTech Solar.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_11_004', title: 'Exporting refers to the sale of goods.',
          scaffold: { problem: 'M/s Gujarat Textiles, a medium-sized manufacturer in Ahmedabad, receives an export inquiry for 5,000 metres of denim fabric from a buyer in.',
            steps: [
            { text: 'Identify all cost components for direct exporting for the first shipment: fixed costs (export licence ₹50,000 + export.' },
            { text: 'Calculate indirect exporting cost: export house commission = 5% of FOB value. FOB value = ₹500 × 5,000 = ₹25,00,000.' },
            { text: 'Compare total costs: Direct = ₹4,75,000; Indirect = ₹1,25,000. Difference = ₹3,50,000 lower for indirect.' },
            { text: 'Consider non-cost factors: Firm has no export experience, limited capital (₹30 lakh), and the export house provides.' },
            { text: 'Recommendation: Choose indirect exporting for the first shipment.', faded: true, blankAnswer: 'Indirect exporting costs ₹1,25,000 vs. direct exporting.' }
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
        { type: 'dissect', nodeId: 'c11_bs_cbse_11_001', title: 'Identify each idea',
          dissect: { specimen: 'Export Documents Documentary', spots: [
            { id: 's1', label: 'Export-import documentation refers to the', prompt: 'Which idea is this? — Export-import documentation refers to the systematic set of legally mandated commercial,.', answer: 'Export-import documentation refers to the', options: ['Export-import documentation refers to the', 'International Business refers to all', 'International business arises because countries', 'Modes of entry into international'] },
            { id: 's2', label: 'International Business refers to all', prompt: 'Which idea is this? — International Business refers to all commercial activities—including trade in goods and.', answer: 'International Business refers to all', options: ['International Business refers to all', 'Export-import documentation refers to the', 'International business arises because countries', 'Modes of entry into international'] },
            { id: 's3', label: 'International business arises because countries', prompt: 'Which idea is this? — International business arises because countries cannot produce all goods and services.', answer: 'International business arises because countries', options: ['International business arises because countries', 'Export-import documentation refers to the', 'International Business refers to all', 'Modes of entry into international'] },
            { id: 's4', label: 'Modes of entry into international', prompt: 'Which idea is this? — Modes of entry into international business refer to the various strategic pathways a firm.', answer: 'Modes of entry into international', options: ['Modes of entry into international', 'Export-import documentation refers to the', 'International Business refers to all', 'International business arises because countries'] },
            { id: 's5', label: 'Exporting refers to the sale', prompt: 'Which idea is this? — Exporting refers to the sale of goods and services from a home country to a foreign.', answer: 'Exporting refers to the sale', options: ['Exporting refers to the sale', 'Export-import documentation refers to the', 'International Business refers to all', 'International business arises because countries'] },
            { id: 's6', label: 'Trade is the branch of', prompt: 'Which idea is this? — Trade is the branch of commerce concerned with the buying, selling, and exchange of goods.', answer: 'Trade is the branch of', options: ['Trade is the branch of', 'Export-import documentation refers to the', 'International Business refers to all', 'International business arises because countries'] }
          ] } }
    ],
    explore: { component: C11_CommerceExportDocumentsDocumentarySim, prompt: 'Explore the interactive — Export Documents Documentary' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_11_008', difficulty: 'standard',
          question: 'Export-import documentation refers to the systematic set of legally mandated.',
          hint: 'Revisit c11_bs_cbse_11_001 Section 11.1.3 "International Business vs Domestic Business" —.',
          misconception: 'Students believe **Bill of Entry is an export document** because it sounds like "Bill of Lading" and both have "Bill".',
          parts: [
                { id: 'a', prompt: 'Explain why a Bill of Lading is called a "document of title" while a Shipping Bill is not, even though both are issued during export.', answer: 'A Bill of Lading is a document of title',
                  options: ['A Bill of Lading is a document of title', 'Bill of Lading', 'used at customs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **Bill of Entry is an export document** because it sounds like "Bill of Lading" and both have "Bill".' },
                { id: 'b', prompt: 'Compare the role of Certificate of Origin in export versus Import General Manifest in import. How does each interact with tariff concessions?', answer: 'Certificate of Origin (export) *proves* the goods\' country of manufacture so the',
                  options: ['Certificate of Origin (export) *proves* the goods\' country of manufacture so the', 'Bill of Lading', 'used at customs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **Bill of Entry is an export document** because it sounds like "Bill of Lading" and both have "Bill".' }
          ],
            remediations: { 'bill-of-entry-is-an': { steps: ['Create a two-column table: left column "Export Documents", right column "Import Documents".', 'Place **Bill of Entry** in the Import column only; **Shipping Bill** in Export column only.', 'Trace a physical shipment: Goods leave India → Shipping Bill filed at Indian customs → Bill of Lading issued → Goods.', 'For what purpose?" — Exporter files Shipping Bill at *exit* customs for *permission to ship*; Importer files Bill of.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_11_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **Bill of Entry is an export document** because it sounds like "Bill of Lading" and both have "Bill".',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "A Letter of Credit eliminates all risk for the exporter because the bank guarantees payment."', answer: 'The statement is **partially false**',
                  options: ['The statement is **partially false**', 'Bill of Lading', 'used at customs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **Bill of Entry is an export document** because it sounds like "Bill of Lading" and both have "Bill".' },
                { id: 'b', prompt: 'Compare the role of Certificate of Origin in export versus Import General Manifest in import. How does each interact with tariff concessions?', answer: 'Certificate of Origin (export) *proves* the goods\' country of manufacture so the',
                  options: ['Certificate of Origin (export) *proves* the goods\' country of manufacture so the', 'Bill of Lading', 'used at customs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **Bill of Entry is an export document** because it sounds like "Bill of Lading" and both have "Bill".' }
          ],
            remediations: { 'bill-of-entry-is-an': { steps: ['Create a two-column table: left column "Export Documents", right column "Import Documents".', 'Place **Bill of Entry** in the Import column only; **Shipping Bill** in Export column only.', 'Trace a physical shipment: Goods leave India → Shipping Bill filed at Indian customs → Bill of Lading issued → Goods.', 'For what purpose?" — Exporter files Shipping Bill at *exit* customs for *permission to ship*; Importer files Bill of.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_11_001', difficulty: 'standard',
          question: 'International Business refers to all commercial activities—including trade in.',
          hint: 'Revisit Class 10 Economics Chapter 4 "Globalisation and the Indian Economy" —.',
          misconception: 'Students frequently equate "International Business" with "International Trade" (exports + imports of goods only).',
          parts: [
                { id: 'a', prompt: 'Compare the mobility of labour and capital in domestic business versus international business.', answer: 'Within a country, labour and capital move relatively freely across states',
                  options: ['Within a country, labour and capital move relatively freely across states', 'mobility is lower internationally'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently equate "International Business" with "International Trade" (exports + imports of goods only).' }
          ],
            remediations: { 'students-frequently-equate-international-busines': { steps: ['Ask the student to re-read the first paragraph of NCERT section 11.1.1 and highlight every noun that moves across.', 'Have them create a two-column table: "International Trade (Merchandise)" vs.', '"International Business (Broader)" and place each highlighted item in the correct column.', 'Give three mini-cases: (a) Infosys billing a US client for consulting, (b) PepsiCo licensing its formula to a.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently equate "International Business" with "International Trade" (exports + imports of goods only).',
          parts: [
                { id: 'a', prompt: 'Compare the mobility of labour and capital in domestic business versus international business.', answer: 'Within a country, labour and capital move relatively freely across states',
                  options: ['Within a country, labour and capital move relatively freely across states', 'mobility is lower internationally'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently equate "International Business" with "International Trade" (exports + imports of goods only).' }
          ],
            remediations: { 'students-frequently-equate-international-busines': { steps: ['Ask the student to re-read the first paragraph of NCERT section 11.1.1 and highlight every noun that moves across.', 'Have them create a two-column table: "International Trade (Merchandise)" vs.', '"International Business (Broader)" and place each highlighted item in the correct column.', 'Give three mini-cases: (a) Infosys billing a US client for consulting, (b) PepsiCo licensing its formula to a.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_11_002', difficulty: 'standard',
          question: 'International business arises because countries cannot produce all goods and.',
          hint: 'Revisit Class 9 Economics Chapter 1 (The Story of Village Palampur / Factors of.',
          misconception: 'Students often equate international business solely with exporting physical goods, ignoring that it also includes trade.',
          parts: [
                { id: 'a', prompt: 'In your own words, explain why international business is based on the same principle of territorial division of labour that operates between states within a.', answer: 'Just as West Bengal specialises in jute and Maharashtra in cotton textiles',
                  options: ['Just as West Bengal specialises in jute and Maharashtra in cotton textiles', 'to earn money'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate international business solely with exporting physical goods, ignoring that it also includes trade in services.' }
          ],
            remediations: { 'students-often-equate-international-business': { steps: ['If a student conflates the two benefit lists, draw a two-column table on paper: left column "Nation (Macro)", right.', 'Ask the student to place each of the nine textbook benefits (four for nations, five for firms) into the correct column.', 'For each placement, require a one-sentence justification naming the actor (e.g., "Foreign exchange goes to Nation.', 'Then discuss why "higher standard of living" is a societal outcome, not a firm\'s balance-sheet item.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_11_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate international business solely with exporting physical goods, ignoring that it also includes trade.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "International business benefits only large multinational corporations; small domestic firms gain nothing from going global." Use at.', answer: 'The statement is false',
                  options: ['The statement is false', 'foreign exchange', 'way out to intense competition in domestic market'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate international business solely with exporting physical goods, ignoring that it also includes trade in services.' }
          ],
            remediations: { 'students-often-equate-international-business': { steps: ['If a student conflates the two benefit lists, draw a two-column table on paper: left column "Nation (Macro)", right.', 'Ask the student to place each of the nine textbook benefits (four for nations, five for firms) into the correct column.', 'For each placement, require a one-sentence justification naming the actor (e.g., "Foreign exchange goes to Nation.', 'Then discuss why "higher standard of living" is a societal outcome, not a firm\'s balance-sheet item.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_11_003', difficulty: 'standard',
          question: 'Modes of entry into international business refer to the various strategic.',
          hint: 'If stuck, revisit **c11_bs_cbse_11_001 (Section 11.1.1 and 11.1.2)** — specifically the.',
          misconception: 'Students often treat "Contract Manufacturing" and "Licensing" as interchangeable because both involve a foreign partner.',
          parts: [
                { id: 'a', prompt: 'Name the five modes of entry into international business as classified in the NCERT textbook, and state the defining feature that distinguishes "Contract.', answer: 'The five modes are: (1) Exporting and Importing, (2) Contract Manufacturing, (3)',
                  options: ['The five modes are: (1) Exporting and Importing, (2) Contract Manufacturing, (3)', 'giving technology to a local firm'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat "Contract Manufacturing" and "Licensing" as interchangeable because both involve a foreign partner producing/selling.' },
                { id: 'b', prompt: 'Explain in your own words why "Exporting is the most preferred way for business firms when they are getting initially involved with international business" (as.', answer: 'Exporting is preferred initially',
                  options: ['Exporting is preferred initially', 'it\'s easy', 'toe-in-the-water'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat "Contract Manufacturing" and "Licensing" as interchangeable because both involve a foreign partner producing/selling.' }
          ],
            remediations: { 'students-often-treat-contract-manufacturing': { steps: ['If the student conflates Contract Manufacturing and Licensing: 1.', '**Draw a two-column table** on paper: Left column "What the foreign partner DOES", Right column "What the Indian firm.', '**Fill for Contract Manufacturing**: Partner DOES = "Manufactures/assembles goods per our specs".', 'Firm GIVES = "Product designs, quality standards, raw materials (sometimes)".'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_11_004', difficulty: 'standard',
          question: 'Exporting refers to the sale of goods and services from a home country to a.',
          hint: 'Revisit c11_bs_cbse_11_002 (Reasons for International Business) to reinforce the economic.',
          misconception: 'Students often believe indirect exporting means "the export house buys the goods and resells them," confusing it with a.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Exporting refers to the sale of goods and services from a home country to a foreign',
                  options: ['Exporting refers to the sale of goods and services from a home country to a foreign', 'Export-import documentation refers to the systematic set of legally mandated commercial,', 'International Business refers to all commercial activities—including trade in goods and', 'International business arises'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe indirect exporting means "the export house buys the goods and resells them," confusing it with a domestic wholesale.' }
          ],
            remediations: { 'indirect-exporting-means-the-export': { steps: ['If a student confuses indirect exporting with merchant exporting (where the intermediary buys goods), use this 3-step.', 'Draw two side-by-side diagrams: Manufacturer → Export House (Agent) → Foreign Buyer vs.', 'Manufacturer → Merchant Exporter (Buyer) → Foreign Buyer.', 'Label ownership transfer points.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_11_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe indirect exporting means "the export house buys the goods and resells them," confusing it with a.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Indirect exporting is always the best choice for a firm entering international business for the first time." Defend or critique using.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'the export house buys the goods and resells them'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe indirect exporting means "the export house buys the goods and resells them," confusing it with a domestic wholesale.' },
                { id: 'b', prompt: 'Design a decision framework (as a flowchart or 4-question checklist) that a first-time exporter in India could use to choose between direct and indirect.', answer: 'A strong framework: 1',
                  options: ['A strong framework: 1', 'the export house buys the goods and resells them'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe indirect exporting means "the export house buys the goods and resells them," confusing it with a domestic wholesale.' }
          ],
            remediations: { 'indirect-exporting-means-the-export': { steps: ['If a student confuses indirect exporting with merchant exporting (where the intermediary buys goods), use this 3-step.', 'Draw two side-by-side diagrams: Manufacturer → Export House (Agent) → Foreign Buyer vs.', 'Manufacturer → Merchant Exporter (Buyer) → Foreign Buyer.', 'Label ownership transfer points.'] } } },
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
