import type { SimDef } from '../../engine/types';
import C11_CommerceCooperativeOrganisationsMeaningSim from '../../../simulations/c6_12/C11_CommerceCooperativeOrganisationsMeaningSim';

/** v3 wrapped master — C11_CommerceCooperativeOrganisationsMeaningSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_commercecooperativeorganisationsmeaningsim: SimDef = {
    id: 'v3w_c11_commercecooperativeorganisationsmeaningsim',
    title: 'Cooperative Organisations Meaning',
    subtitle: 'This node covers the fundamental meaning, distinguishing features, and classification of.',
    classLevel: 11, subject: 'business_studies', topic: 'Private Sector and Public Sector: Meaning and Distinction',
    chapters: [],
    nodeIds: ['c11_bs_cbse_03_001', 'c11_bs_cbse_10_001', 'c11_bs_cbse_03_009', 'c11_bs_cbse_03_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are reading a news headline: "Government to sell 51% stake in BPCL to private players." You.', goal: 'Master Cooperative Organisations Meaning.' },
    discovery: {
        question: 'A farmer in Punjab sells wheat to a flour mill in Punjab. The flour mill sells flour to a wholesaler in Delhi. The wholesaler sells to a retailer in Mumbai.',
        options: ['All four transactions are internal trade', 'internal trade', 'local trade'],
        answer: 'All four transactions are internal trade',
        hook: 'Students believe "internal trade = local trade within a city/state" and "external trade = trade between states." They.',
    },
    teaching: [
        { title: 'The private sector comprises business.', text: 'The private sector comprises business enterprises owned, controlled, and managed by private individuals or groups (sole proprietorship, partnership, Joint Hindu Family, cooperative, company) with the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_bs_cbse_03_001', title: 'The private sector comprises business.',
          scaffold: { problem: 'An entrepreneur wants to start a business manufacturing solar panels.',
            steps: [
            { text: 'Identify the legal form for Option A – Private Limited Company under Companies Act, 2013 (minimum 2 members, no.' },
            { text: 'Identify the legal form for Option B – Government Company under Section 2(45) Companies Act, 2013 (requires government.' },
            { text: 'Compare Ease of Formation – Option A: Simple ROC registration (~15-30 days).' },
            { text: 'Compare Decision-making Autonomy – Option A: Board of Directors (promoter-controlled) has full operational freedom.' },
            { text: 'Compare Accountability Burden – Option A: Statutory audit, ROC filings, income tax.' },
            { text: 'Compare Access to Capital – Option A: Limited to promoter funds, bank loans, VC/PE (dilutes ownership).' },
            { text: 'Synthesise for profit-maximising entrepreneur valuing speed/control – Option A is superior: full control, fast setup,.', faded: true, blankAnswer: 'Option A (Private Limited Company) is recommended. While.' }
            ] } },
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
        { type: 'scaffold', nodeId: 'c11_bs_cbse_03_009', title: 'Multinational Corporations (MNCs) are.',
          scaffold: { problem: 'An American pharmaceutical MNC enters India through a joint venture with a local firm.',
            steps: [
            { text: 'Identify the MNC features involved — advanced technology (patented formulation), marketing strategies (global.' },
            { text: 'Map each feature to an impact channel: Technology → innovation capacity; Marketing/regulatory expertise → market.' },
            { text: 'Evaluate innovation capacity: Positive — technology transfer via JV raises local R&D capability, but risk of dependency.' },
            { text: 'Evaluate access to medicines: Positive — affordable generics improve access; MNC\'s global scale lowers production cost.' },
            { text: 'Evaluate trade balance: Positive — exports to Africa earn foreign exchange; but royalty/fee payments to MNC create.' },
            { text: 'Evaluate domestic competitiveness: Mixed — Indian partner gains capabilities but may become dependent; other domestic.' },
            { text: 'Synthesise: Net positive if JV includes mandatory technology absorption clauses and export obligations; net negative if.', faded: true, blankAnswer: 'Net positive impact conditional on policy safeguards.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_03_010', title: 'Private sector enterprises are.',
          scaffold: { problem: '"GreenEnergy Pvt. Ltd." is a private company installing solar panels.',
            steps: [
            { text: 'Identify the current legal form – GreenEnergy is a private limited company under Companies Act, 2013, owned by private.' },
            { text: 'Determine the target public sector form – Since the government wants a separate legal entity with operational autonomy,.' },
            { text: 'Execute acquisition – Government (state) purchases ≥51% of paid-up share capital from existing promoters via share.' },
            { text: 'Legal re-registration – File altered Memorandum/Articles of Association with Registrar of Companies reflecting new.' },
            { text: 'Governance restructuring – Appoint government-nominated directors; align objectives to include "supply of subsidised.', faded: true, blankAnswer: '5-step conversion via share acquisition (≥51%), RoC filing,.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_bs_cbse_10_001', title: 'Identify each idea',
          dissect: { specimen: 'Cooperative Organisations Meaning', spots: [
            { id: 's1', label: 'The private sector comprises business', prompt: 'Which idea is this? — The private sector comprises business enterprises owned, controlled, and managed by.', answer: 'The private sector comprises business', options: ['The private sector comprises business', 'Internal trade refers to the', 'Multinational Corporations MNCs are large', 'Private sector enterprises are businesses'] },
            { id: 's2', label: 'Internal trade refers to the', prompt: 'Which idea is this? — Internal trade refers to the buying and selling of goods and services within the.', answer: 'Internal trade refers to the', options: ['Internal trade refers to the', 'The private sector comprises business', 'Multinational Corporations MNCs are large', 'Private sector enterprises are businesses'] },
            { id: 's3', label: 'Multinational Corporations MNCs are large', prompt: 'Which idea is this? — Multinational Corporations (MNCs) are large industrial organisations headquartered in one.', answer: 'Multinational Corporations MNCs are large', options: ['Multinational Corporations MNCs are large', 'The private sector comprises business', 'Internal trade refers to the', 'Private sector enterprises are businesses'] },
            { id: 's4', label: 'Private sector enterprises are businesses', prompt: 'Which idea is this? — Private sector enterprises are businesses owned, controlled, and managed by private.', answer: 'Private sector enterprises are businesses', options: ['Private sector enterprises are businesses', 'The private sector comprises business', 'Internal trade refers to the', 'Multinational Corporations MNCs are large'] }
          ] } }
    ],
    explore: { component: C11_CommerceCooperativeOrganisationsMeaningSim, prompt: 'Explore the interactive — Cooperative Organisations Meaning' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_03_001', difficulty: 'standard',
          question: 'The private sector comprises business enterprises owned, controlled, and.',
          hint: 'If stuck, revisit Class 9 Economics Chapter 1 \'The Story of Village Palampur\' / \'People.',
          misconception: 'Students consistently confuse \'Public Sector Enterprise\' with \'Public Limited Company\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The private sector comprises business enterprises owned, controlled, and managed by',
                  options: ['The private sector comprises business enterprises owned, controlled, and managed by', 'Internal trade refers to the buying and selling of goods and services within the', 'Multinational Corporations (MNCs) are large industrial organisations headquartered in one', 'Private sector enterprises are businesses owned, controlled, and managed by private'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse \'Public Sector Enterprise\' with \'Public Limited Company\'.' }
          ],
            remediations: { 'students-consistently-confuse-public-sector': { steps: ['Ask the student to write the legal definition of \'Government Company\' (Sec 2(45) Companies Act, 2013) and \'Public.', 'Highlight the words "held by the Central Government/State Government" vs "minimum seven members".', 'Give a concrete example: "Indian Oil Corporation Ltd. (IOCL) – 51.5% govt holding → Public Sector Government Company.', 'Drill with 5 rapid-fire names (ONGC, TCS, FCI, SBI, Infosys) requiring the student to state: "Public/Private + Form +.'] } } },
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
        { type: 'subpart', nodeId: 'c11_bs_cbse_03_009', difficulty: 'standard',
          question: 'Multinational Corporations (MNCs) are large industrial organisations.',
          hint: 'Revisit c11_bs_cbse_03_008 and create a feature table: Feature | Textbook Description |.',
          misconception: 'Students often equate "MNC role in Indian economy" with "FDI inflows" and think the only metric is how many dollars.',
          parts: [
                { id: 'a', prompt: 'State the definition of a Multinational Corporation as per the NCERT Class 11 Business Studies textbook, highlighting the three distinguishing features that.', answer: 'A Multinational Corporation is a huge industrial organisation',
                  options: ['A Multinational Corporation is a huge industrial organisation', 'foreign company operating in India'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "MNC role in Indian economy" with "FDI inflows" and think the only metric is how many dollars enter.' }
          ],
            remediations: { 'students-often-equate-mnc-role': { steps: ['Ask the student to draw the MNC\'s value chain — where is R&D? Where is manufacturing? Where are profits booked?', 'For each stage, identify which textbook feature (huge capital, advanced tech, centralised control, etc.) drives the.', 'Trace the impact on India at each stage (employment, technology, forex, market structure).', 'Re-evaluate the net impact. This forces the student to move from aggregate "FDI = good" to feature-by-feature causal.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_03_010', difficulty: 'standard',
          question: 'Private sector enterprises are businesses owned, controlled, and managed by.',
          hint: 'Revisit the definitions in node c11_bs_cbse_03_001 and the comparative table of public.',
          misconception: 'Students frequently confuse a **public limited company** (e.g., Reliance Industries Ltd., listed on stock exchange,.',
          parts: [
                { id: 'a', prompt: 'Explain why the Indian economy is classified as a \'mixed economy\' and how this classification shapes the coexistence of private and public sectors.', answer: 'The Indian economy is a mixed economy',
                  options: ['The Indian economy is a mixed economy', 'both sectors exist'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse a **public limited company** (e.g., Reliance Industries Ltd., listed on stock exchange, shares held by public).' },
                { id: 'b', prompt: 'Compare the accountability mechanisms of a departmental undertaking and a government company.', answer: 'Departmental undertakings are directly accountable to the concerned ministry and',
                  options: ['Departmental undertakings are directly accountable to the concerned ministry and', 'both are equally accountable to Parliament'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse a **public limited company** (e.g., Reliance Industries Ltd., listed on stock exchange, shares held by public).' }
          ],
            remediations: { 'students-frequently-confuse-a-public': { steps: ['Draw a two-column table. Column A: "Public Limited Company (Private Sector)" – write: Owned by private promoters +.', 'Give 5 company names (TCS, ONGC, HDFC Bank, Coal India, Maruti Suzuki) and ask student to place each in correct column.', 'Explicitly state: "Public limited = shares sold to public; Public sector = owned by government." Repeat until the.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_03_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently confuse a **public limited company** (e.g., Reliance Industries Ltd., listed on stock exchange,.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Public sector enterprises are inherently less efficient than private sector enterprises." Use at least three distinct parameters from.', answer: 'The statement is an overgeneralisation',
                  options: ['The statement is an overgeneralisation', 'efficiency'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse a **public limited company** (e.g., Reliance Industries Ltd., listed on stock exchange, shares held by public).' },
                { id: 'b', prompt: 'Compare the accountability mechanisms of a departmental undertaking and a government company.', answer: 'Departmental undertakings are directly accountable to the concerned ministry and',
                  options: ['Departmental undertakings are directly accountable to the concerned ministry and', 'both are equally accountable to Parliament'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse a **public limited company** (e.g., Reliance Industries Ltd., listed on stock exchange, shares held by public).' }
          ],
            remediations: { 'students-frequently-confuse-a-public': { steps: ['Draw a two-column table. Column A: "Public Limited Company (Private Sector)" – write: Owned by private promoters +.', 'Give 5 company names (TCS, ONGC, HDFC Bank, Coal India, Maruti Suzuki) and ask student to place each in correct column.', 'Explicitly state: "Public limited = shares sold to public; Public sector = owned by government." Repeat until the.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
