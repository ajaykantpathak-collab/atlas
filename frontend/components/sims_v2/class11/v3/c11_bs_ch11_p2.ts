import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bs_ch11_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bs_ch11_p2: SimDef = {
    id: 'v3_c11_bs_ch11_p2',
    title: 'International Business · Part 2/2',
    subtitle: 'The moment a parcel crosses a frontier, every rule of business gets a second copy.',
    classLevel: 11, subject: 'business_studies', topic: 'International Business · Part 2/2',
    chapters: ['c11_bs_ch11'],
    nodeIds: ['c11_bs_cbse_11_007', 'c11_bs_cbse_11_008', 'c11_bs_cbse_11_009', 'c11_bs_cbse_11_010', 'c11_bs_cbse_11_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an export consultant briefing a first-time exporter', intro: 'Your client\'s Dubai order looks like easy money. Walk her through everything that changes the moment the goods cross a frontier.', goal: 'Define international business, contrast it with domestic business, and classify activities within its scope.' },
    discovery: {
        question: 'A Kerala spice blender gets a standing order from Dubai. Overnight she must pick an invoice currency, chase DGFT licensing, and meet UAE labelling law. Which truth about international business did her domestic years never teach her?',
        options: ['Crossing a frontier adds currency risk, foreign legal systems, and cultural difference — it\'s a different game, not just a farther customer', 'International trade is just domestic trade with longer shipping times', 'Only the product price changes; everything else stays the same', 'Exports are simple because the buyer bears all risk'],
        answer: 'Crossing a frontier adds currency risk, foreign legal systems, and cultural difference — it\'s a different game, not just a farther customer',
        hook: 'International business isn\'t exports-plus-imports — it\'s capital, people, technology, and IP moving between sovereign rulebooks.',
    },
    teaching: [
        { title: 'Joint Ventures and Wholly Owned Subsidiaries: Features', text: 'A Joint Venture is a strategic alliance where two or more independent firms create a jointly owned enterprise by combining equity capital, technology, and managerial expertise, sharing both control.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bs_cbse_11_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Take the spice unit global: sort a Japanese firm\'s Indian plant, an Indian IT firm\'s US clients, and a French brand licensed to a Bangladeshi maker into the real scope of international business — then list what a border actually adds.',
        labels: ['Joint Ventures and Wholly', 'Documents Required for Export-Import', 'World Trade Organisation (WTO)', 'India\'s Involvement in International', 'Distinction between Internal'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bs_cbse_11_007', title: 'Joint Ventures and Wholly Owned Subsidiaries: Features',
          caseStudy: { intro: 'Imagine you run a successful Indian spice brand "Masala Magic" with ₹50 crore annual turnover.',
            decisions: [{ prompt: 'Define "Joint Venture" and "Wholly Owned Subsidiary" as modes of entry into international business, and state one key difference.', options: [
                { text: 'Joint Venture: An enterprise jointly owned by two or more independent firms (e.g.,', outcome: 'Joint Venture: An enterprise jointly owned by two or more independent firms (e.g., foreign investor.' },
                { text: 'JV means licensing technology to a foreign firm', outcome: 'Not quite — Students often believe "Joint Venture means 50:50 ownership split" and "Wholly Owned Subsidiary.', reveals: 'joint-venture-means-50-50' },
                { text: 'Joint Venture means 50:50 ownership split', outcome: 'Not quite — Students often believe "Joint Venture means 50:50 ownership split" and "Wholly Owned Subsidiary.', reveals: 'joint-venture-means-50-50' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_11_008', title: 'Documents Required for Export-Import Transactions',
          caseStudy: { intro: 'Imagine you\'re Mr. Manchanda\'s son from the textbook case, helping your father export automobile components to Bangkok.',
            decisions: [{ prompt: 'List the three documents that must be submitted to the Customs Appraiser along with the shipping bill for customs clearance of export goods.', options: [
                { text: 'The three mandatory documents are: (1) Export Contract or Export Order, (2) Letter of', outcome: 'The three mandatory documents are: (1) Export Contract or Export Order, (2) Letter of Credit, and.' },
                { text: 'Bill of Lading', outcome: 'Not quite — Students believe **Bill of Entry is an export document** because it sounds like "Bill of Lading".', reveals: 'bill-of-entry-is-an' },
                { text: 'used at customs', outcome: 'Not quite — Students believe **Bill of Entry is an export document** because it sounds like "Bill of Lading".', reveals: 'bill-of-entry-is-an' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_11_009', title: 'World Trade Organisation (WTO): Objectives and Functions',
          caseStudy: { intro: 'Imagine you\'re Mr. Manchanda from our chapter opener - your automobile components factory in Gurgaon wants to export to Southeast Asia, but you\'re worried.',
            decisions: [{ prompt: 'What is the fundamental difference between GATT (1947) and WTO (1995) in terms of their legal and institutional nature?', options: [
                { text: 'GATT was a provisional multilateral treaty with no institutional structure, applied', outcome: 'GATT was a provisional multilateral treaty with no institutional structure, applied provisionally.' },
                { text: 'GATT was for goods only, WTO includes services', outcome: 'Not quite — Students often confuse WTO with a "world trade government" that can force countries to change laws.', reveals: 'students-often-confuse-wto-with' },
                { text: 'world trade government', outcome: 'Not quite — Students often confuse WTO with a "world trade government" that can force countries to change laws.', reveals: 'students-often-confuse-wto-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_11_010', title: 'India\'s Involvement in International Business: Export-Import Trends',
          caseStudy: { intro: 'Imagine you are advising Mr. Manchanda from the textbook case study who wants to export automobile components to South-East Asia.',
            decisions: [{ prompt: 'What are the top three merchandise export commodities from India by value (HS 2-digit level) as per the latest Annual Report of the.', options: [
                { text: 'The top three are typically Mineral fuels (HS 27), Pearls/precious stones (HS 71), and', outcome: 'The top three are typically Mineral fuels (HS 27), Pearls/precious stones (HS 71), and Electrical.' },
                { text: 'textiles, tea, jute', outcome: 'Not quite — Students equate "trade deficit" with "economic weakness" and "trade surplus" with "strength".', reveals: 'students-equate-trade-deficit-with' },
                { text: 'subsidies', outcome: 'Not quite — Students equate "trade deficit" with "economic weakness" and "trade surplus" with "strength".', reveals: 'students-equate-trade-deficit-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_11_011', title: 'Distinction between Internal and International Business',
          caseStudy: { intro: 'Imagine you run a successful dhaba (roadside restaurant) in Ludhiana serving parathas to local truck drivers.',
            decisions: [{ prompt: 'State the fundamental difference in the nationality of buyers and sellers between internal and international business.', options: [
                { text: 'In internal business, both buyers and sellers are from the same country', outcome: 'In internal business, both buyers and sellers are from the same country; in international business.' },
                { text: 'buyers are always foreign in international business', outcome: 'Not quite — Students often equate "international business" solely with "exporting goods" and therefore think.', reveals: 'students-often-equate-international-business' },
                { text: 'international business', outcome: 'Not quite — Students often equate "international business" solely with "exporting goods" and therefore think.', reveals: 'students-often-equate-international-business' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a career talk, a student claims: \'International business is only for firms that ship physical goods abroad — Infosys writing software for American banks, Pepsi licensing its syrup formula to a Thai bottler, and Tata buying a stake in a Kenyan tea estate don\'t count, because nothing crosses a border in a container.\'',
            decisions: [{ prompt: 'Is he right?', options: [
                { text: 'No — international business includes every commercial activity across national frontiers: services exports (Infosys), licensing/franchising of intellectual property (Pepsi), foreign investment (Tata\'s stake), contract manufacturing, and movement of capital, personnel and technology — not just merchandise in containers.', outcome: 'Trade in goods is only one component; the invisible flows of services, IP and capital are equally international business.' },
                { text: 'Yes — \'business across borders\' requires goods to physically cross; services and licences are domestic knowledge work.', outcome: 'That confuses international trade (merchandise) with the broader international business, which the definition extends to services, capital, technology and IP.', reveals: 'intl-biz-equals-goods-trade' },
                { text: 'Half right — services count as international business only if the worker physically travels abroad.', outcome: 'Personnel movement is one component, but cross-border service delivery happens electronically too — an Indian firm billing a US client from Bengaluru is international business.', reveals: 'services-need-travel' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_11_011', title: 'You made it',
          caseStudy: { intro: 'You can now name the five fault lines — nationality, mobility, heterogeneity, politics, currency — that make a border a business event.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_11_007', difficulty: 'standard',
          question: 'A Joint Venture is a strategic alliance where two or more independent firms.',
          hint: 'Revisit c11_bs_cbse_11_003 (Modes of Entry Overview) and c11_bs_cbse_11_006 (Licensing.',
          misconception: 'Students often believe "Joint Venture means 50:50 ownership split" and "Wholly Owned Subsidiary means only greenfield.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Joint Ventures are always better than Wholly Owned Subsidiaries because they reduce financial burden and risk." Explain why this statement.', answer: 'The statement oversimplifies',
                  options: ['The statement oversimplifies', 'WOS is better when you have more money', 'Joint Venture means 50:50 ownership split', 'Wholly Owned Subsidiary means only greenfield (building new factory)'],
                  hint: 'Revisit c11_bs_cbse_11_003 (Modes of Entry Overview) and c11_bs_cbse_11_006 (Licensing and.',
                  misconception: 'Students often believe "Joint Venture means 50:50 ownership split" and "Wholly Owned Subsidiary means only greenfield (building new.' },
                { id: 'b', prompt: '"AutoTech India Ltd." (auto components manufacturer, ₹200 cr turnover) wants to enter Brazil.', answer: 'WOS is more suitable',
                  options: ['WOS is more suitable', 'Brazil has complex labour laws', 'Joint Venture means 50:50 ownership split', 'Wholly Owned Subsidiary means only greenfield (building new factory)'],
                  hint: 'Revisit c11_bs_cbse_11_003 (Modes of Entry Overview) and c11_bs_cbse_11_006 (Licensing and.',
                  misconception: 'Students often believe "Joint Venture means 50:50 ownership split" and "Wholly Owned Subsidiary means only greenfield (building new.' },
                { id: 'c', prompt: 'Compare the "Greenfield Venture" and "Acquisition" routes to establishing a Wholly Owned Subsidiary.', answer: 'Greenfield: (a) Slow',
                  options: ['Greenfield: (a) Slow', 'Acquisition is always faster and better', 'Joint Venture means 50:50 ownership split', 'Wholly Owned Subsidiary means only greenfield (building new factory)'],
                  hint: 'Revisit c11_bs_cbse_11_003 (Modes of Entry Overview) and c11_bs_cbse_11_006 (Licensing and.',
                  misconception: 'Students often believe "Joint Venture means 50:50 ownership split" and "Wholly Owned Subsidiary means only greenfield (building new.' }
          ],
            remediations: { 'joint-venture-means-50-50': { steps: ['If a student exhibits this misconception: Step 1 — Show real-world JV equity structures: Maruti Suzuki (56.2% Suzuki.', 'Ask: "Which is the \'true\' JV?" Step 2 — Show WOS via acquisition: Tata Motors acquiring Jaguar Land Rover (100%).', 'Ask: "Did Tata build JLR factories from scratch?" Step 3 — Have student redefine both terms in their own words.', 'Step 4 — Give a mini-case: "Firm A buys 74% of Firm B.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_11_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "Joint Venture means 50:50 ownership split" and "Wholly Owned Subsidiary means only greenfield.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "In countries with political instability, Joint Ventures are always safer than Wholly Owned Subsidiaries because the local partner absorbs.', answer: 'Judgment: The claim is partially valid but not universally true',
                  options: ['Judgment: The claim is partially valid but not universally true', 'JV always safer', 'Joint Venture means 50:50 ownership split', 'Wholly Owned Subsidiary means only greenfield (building new factory)'],
                  hint: 'Revisit c11_bs_cbse_11_003 (Modes of Entry Overview) and c11_bs_cbse_11_006 (Licensing and.',
                  misconception: 'Students often believe "Joint Venture means 50:50 ownership split" and "Wholly Owned Subsidiary means only greenfield (building new.' },
                { id: 'b', prompt: 'Create a decision framework (flowchart or checklist) that a mid-sized Indian pharmaceutical company (₹500 cr turnover, patented drug delivery technology, ₹150.', answer: 'Framework: Step 1',
                  options: ['Framework: Step 1', 'Joint Venture means 50:50 ownership split', 'Wholly Owned Subsidiary means only greenfield (building new factory)'],
                  hint: 'Revisit c11_bs_cbse_11_003 (Modes of Entry Overview) and c11_bs_cbse_11_006 (Licensing and.',
                  misconception: 'Students often believe "Joint Venture means 50:50 ownership split" and "Wholly Owned Subsidiary means only greenfield (building new.' }
          ],
            remediations: { 'joint-venture-means-50-50': { steps: ['If a student exhibits this misconception: Step 1 — Show real-world JV equity structures: Maruti Suzuki (56.2% Suzuki.', 'Ask: "Which is the \'true\' JV?" Step 2 — Show WOS via acquisition: Tata Motors acquiring Jaguar Land Rover (100%).', 'Ask: "Did Tata build JLR factories from scratch?" Step 3 — Have student redefine both terms in their own words.', 'Step 4 — Give a mini-case: "Firm A buys 74% of Firm B.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_11_008', difficulty: 'standard',
          question: 'Export-import documentation refers to the systematic set of legally mandated.',
          hint: 'Revisit c11_bs_cbse_11_001 Section 11.1.3 "International Business vs Domestic Business".',
          misconception: 'Students believe **Bill of Entry is an export document** because it sounds like "Bill of Lading" and both have "Bill".',
          parts: [
                { id: 'a', prompt: 'Explain why a Bill of Lading is called a "document of title" while a Shipping Bill is not, even though both are issued during export.', answer: 'A Bill of Lading is a document of title',
                  options: ['A Bill of Lading is a document of title', 'Bill of Lading', 'used at customs'],
                  hint: 'Revisit c11_bs_cbse_11_001 Section 11.1.3 "International Business vs Domestic Business" — focus.',
                  misconception: 'Students believe **Bill of Entry is an export document** because it sounds like "Bill of Lading" and both have "Bill".' },
                { id: 'b', prompt: 'Compare the role of Certificate of Origin in export versus Import General Manifest in import. How does each interact with tariff concessions?', answer: 'Certificate of Origin (export) *proves* the goods\' country of manufacture so the',
                  options: ['Certificate of Origin (export) *proves* the goods\' country of manufacture so the', 'Bill of Lading', 'used at customs'],
                  hint: 'Revisit c11_bs_cbse_11_001 Section 11.1.3 "International Business vs Domestic Business" — focus.',
                  misconception: 'Students believe **Bill of Entry is an export document** because it sounds like "Bill of Lading" and both have "Bill".' }
          ],
            remediations: { 'bill-of-entry-is-an': { steps: ['Create a two-column table: left column "Export Documents", right column "Import Documents".', 'Place **Bill of Entry** in the Import column only; **Shipping Bill** in Export column only.', 'Trace a physical shipment: Goods leave India → Shipping Bill filed at Indian customs → Bill of Lading issued → Goods.', 'For what purpose?" — Exporter files Shipping Bill at *exit* customs for *permission to ship*; Importer files Bill.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_11_009', difficulty: 'standard',
          question: 'The World Trade Organisation (WTO) is a permanent intergovernmental.',
          hint: 'If stuck, revisit c11_bs_cbse_11_002 (Reasons for International Business) to recall.',
          misconception: 'Students often confuse WTO with a "world trade government" that can force countries to change laws.',
          parts: [
                { id: 'a', prompt: 'A student says: "WTO\'s objective of \'raising standards of living\' means WTO directly gives money to poor countries to improve their living standards." Explain.', answer: 'WTO has no fund or aid mechanism',
                  options: ['WTO has no fund or aid mechanism', 'creating enabling conditions', 'direct resource transfer', 'world trade government'],
                  hint: 'If stuck, revisit c11_bs_cbse_11_002 (Reasons for International Business) to recall comparative.',
                  misconception: 'Students often confuse WTO with a "world trade government" that can force countries to change laws.' },
                { id: 'b', prompt: 'Mr. Manchanda\'s competitor in Thailand complains that India imposes 30% tariff on imported auto components while India\'s bound tariff rate at WTO for that.', answer: 'Step 1: Thailand government requests consultations with India under WTO Dispute',
                  options: ['Step 1: Thailand government requests consultations with India under WTO Dispute', 'automatic adoption', 'retaliation authorisation', 'crown jewel'],
                  hint: 'If stuck, revisit c11_bs_cbse_11_002 (Reasons for International Business) to recall comparative.',
                  misconception: 'Students often confuse WTO with a "world trade government" that can force countries to change laws.' }
          ],
            remediations: { 'students-often-confuse-wto-with': { steps: ['If the student holds this misconception: (1) Ask them to read Article 22 DSU on "Compensation and Suspension.', '(2) Walk through the Boeing-Airbus disputes (DS316/DS353) where EU and US imposed retaliatory tariffs on each other\'s.', '(3) Contrast with domestic courts: if you lose in Indian Supreme Court, bailiffs seize assets; at WTO, the "bailiff".', '(4) Have them explain in their own words: "WTO provides the legal authorisation for self-help retaliation, not.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_11_010', difficulty: 'standard',
          question: 'India\'s involvement in international business refers to the pattern.',
          hint: 'Revisit c11_bs_cbse_11_004 (exporting/importing procedures) to understand how HS codes.',
          misconception: 'Students equate "trade deficit" with "economic weakness" and "trade surplus" with "strength", ignoring that India\'s.',
          parts: [
                { id: 'a', prompt: 'A Gujarat-based SME exports ceramic tiles (HS 6907) to the UAE.', answer: 'RoDTEP benefit = 2.5% × ₹45 lakh = ₹1.125 lakh',
                  options: ['RoDTEP benefit = 2.5% × ₹45 lakh = ₹1.125 lakh', 'subsidies'],
                  hint: 'Revisit c11_bs_cbse_11_004 (exporting/importing procedures) to understand how HS codes are assigned.',
                  misconception: 'Students equate "trade deficit" with "economic weakness" and "trade surplus" with "strength", ignoring that India\'s deficit is driven.' }
          ],
            remediations: { 'students-equate-trade-deficit-with': { steps: ['Have the student pull the latest DGCI&S monthly bulletin and highlight *only* the top 5 import *and* export items.', 'Classify each top import as "consumption" (gold, pearls), "energy" (crude, coal), or "production" (machinery.', 'Calculate the % of total imports that are production inputs.', 'Explain why taxing these inputs (via customs duty) hurts export competitiveness — this connects to the *duty.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_11_011', difficulty: 'standard',
          question: 'Internal business refers to commercial activities where both buyers and sellers.',
          hint: 'Revisit c11_bs_cbse_11_001 (Meaning, Nature and Scope of International Business).',
          misconception: 'Students often equate "international business" solely with "exporting goods" and therefore think the distinction.',
          parts: [
                { id: 'a', prompt: 'State the fundamental difference in the nationality of buyers and sellers between internal and international business.', answer: 'In internal business, both buyers and sellers are from the same country',
                  options: ['In internal business, both buyers and sellers are from the same country', 'buyers are always foreign in international business', 'international business', 'exporting only'],
                  hint: 'Revisit c11_bs_cbse_11_001 (Meaning, Nature and Scope of International Business) to clarify the.',
                  misconception: 'Students often equate "international business" solely with "exporting goods" and therefore think the distinction is only about customs.' },
                { id: 'b', prompt: 'Explain why customer heterogeneity is higher in international markets than in domestic markets, using the example of automobile steering preferences mentioned.', answer: 'Customer heterogeneity arises from socio-cultural differences across nations',
                  options: ['Customer heterogeneity arises from socio-cultural differences across nations', 'rich vs poor'],
                  hint: 'Revisit c11_bs_cbse_11_001 (Meaning, Nature and Scope of International Business) to clarify the.',
                  misconception: 'Students often equate "international business" solely with "exporting goods" and therefore think the distinction is only about customs.' }
          ],
            remediations: { 'students-often-equate-international-business': { steps: ['Ask the student to list every party their imaginary dhaba interacts with (suppliers, staff, landlord, bank.', 'For each party, ask: "If you open in Dubai, does this party change? Does the rule governing this interaction change?"', 'Map each "yes" to one of the eight bases in Table 11.1.', 'Have them write one sentence per base: "Because [base] differs, I must [specific action]." This forces concrete mapping.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
