import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bs_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bs_ch11_p1: SimDef = {
    id: 'v3_c11_bs_ch11_p1',
    title: 'International Business · Part 1/2',
    subtitle: 'The moment a parcel crosses a frontier, every rule of business gets a second copy.',
    classLevel: 11, subject: 'business_studies', topic: 'International Business · Part 1/2',
    chapters: ['c11_bs_ch11'],
    nodeIds: ['c11_bs_cbse_11_001', 'c11_bs_cbse_11_002', 'c11_bs_cbse_11_003', 'c11_bs_cbse_11_004', 'c11_bs_cbse_11_005', 'c11_bs_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an export consultant briefing a first-time exporter', intro: 'Your client\'s Dubai order looks like easy money. Walk her through everything that changes the moment the goods cross a frontier.', goal: 'Define international business, contrast it with domestic business, and classify activities within its scope.' },
    discovery: {
        question: 'A Kerala spice blender gets a standing order from Dubai. Overnight she must pick an invoice currency, chase DGFT licensing, and meet UAE labelling law. Which truth about international business did her domestic years never teach her?',
        options: ['Crossing a frontier adds currency risk, foreign legal systems, and cultural difference — it\'s a different game, not just a farther customer', 'International trade is just domestic trade with longer shipping times', 'Only the product price changes; everything else stays the same', 'Exports are simple because the buyer bears all risk'],
        answer: 'Crossing a frontier adds currency risk, foreign legal systems, and cultural difference — it\'s a different game, not just a farther customer',
        hook: 'International business isn\'t exports-plus-imports — it\'s capital, people, technology, and IP moving between sovereign rulebooks.',
    },
    teaching: [
        { title: 'International Business: Meaning, Nature and Scope', text: 'International Business refers to all commercial activities—including trade in goods and services, licensing, franchising, foreign direct investment, portfolio investment, and contract.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bs_cbse_11_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Take the spice unit global: sort a Japanese firm\'s Indian plant, an Indian IT firm\'s US clients, and a French brand licensed to a Bangladeshi maker into the real scope of international business — then list what a border actually adds.',
        labels: ['International Business: Meaning, Nature', 'Reasons for International Business', 'Modes of Entry into', 'Exporting and Importing: Direct', 'Contract Manufacturing: Meaning, Advantages', 'Licensing and Franchising: Meaning,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bs_cbse_11_001', title: 'International Business: Meaning, Nature and Scope',
          caseStudy: { intro: 'Imagine you run a small spice-blending unit in Kerala that sells only within India.',
            decisions: [{ prompt: 'State the NCERT definition of International Business in one sentence.', options: [
                { text: 'International Business refers to business activities that take place across national', outcome: 'International Business refers to business activities that take place across national frontiers.' },
                { text: 'export and import of goods', outcome: 'Not quite — Students frequently equate "International Business" with "International Trade" (exports + imports.', reveals: 'students-frequently-equate-international-busines' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_11_002', title: 'Reasons for International Business: Benefits to Firms and Nations',
          caseStudy: { intro: 'Imagine you own a small workshop in Ludhiana producing bicycle parts. You have skilled labour but outdated machines.',
            decisions: [{ prompt: 'State the two fundamental reasons why countries cannot produce all goods equally well or cheaply, as given in the textbook.', options: [
                { text: 'The two reasons are: (1) unequal distribution of natural resources among nations, and (2)', outcome: 'The two reasons are: (1) unequal distribution of natural resources among nations, and (2).' },
                { text: 'different costs', outcome: 'Not quite — Students often equate international business solely with exporting physical goods, ignoring that.', reveals: 'students-often-equate-international-business' },
                { text: 'different currencies', outcome: 'Not quite — Students often equate international business solely with exporting physical goods, ignoring that.', reveals: 'students-often-equate-international-business' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_11_003', title: 'Modes of Entry into International Business: Overview',
          caseStudy: { intro: 'Imagine Mr. Manchanda from the textbook case: he makes auto parts in Gurgaon and wants to sell in Southeast Asia.',
            decisions: [{ prompt: 'Name the five modes of entry into international business as classified in the NCERT textbook, and state the defining feature that.', options: [
                { text: 'The five modes are: (1) Exporting and Importing, (2) Contract Manufacturing, (3)', outcome: 'The five modes are: (1) Exporting and Importing, (2) Contract Manufacturing, (3) Licensing and.' },
                { text: 'giving technology to a local firm', outcome: 'Not quite — Students often treat "Contract Manufacturing" and "Licensing" as interchangeable because both.', reveals: 'students-often-treat-contract-manufacturing' },
                { text: 'both involve "giving technology to a local firm', outcome: 'Not quite — Students often treat "Contract Manufacturing" and "Licensing" as interchangeable because both.', reveals: 'students-often-treat-contract-manufacturing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_11_004', title: 'Exporting and Importing: Direct and Indirect Methods',
          caseStudy: { intro: 'Imagine you own a small textile manufacturing unit in Surat producing high-quality cotton fabrics.',
            decisions: [{ prompt: 'Define direct exporting and state ONE key characteristic that distinguishes it from indirect exporting.', options: [
                { text: 'Direct exporting is when the manufacturing firm itself undertakes all export activities', outcome: 'Direct exporting is when the manufacturing firm itself undertakes all export activities including.' },
                { text: 'using export houses', outcome: 'Not quite — Students often believe indirect exporting means "the export house buys the goods and resells them,".', reveals: 'indirect-exporting-means-the-export' },
                { text: 'appointing agents', outcome: 'Not quite — Students often believe indirect exporting means "the export house buys the goods and resells them,".', reveals: 'indirect-exporting-means-the-export' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_11_005', title: 'Contract Manufacturing: Meaning, Advantages and Limitations',
          caseStudy: { intro: 'Imagine you own a growing Indian sportswear brand "FitIndia" that designs shoes but has no factory.',
            decisions: [{ prompt: 'A student reads: "Contract manufacturing is the same as outsourcing." Is this statement fully accurate?', options: [
                { text: 'The statement is partially correct but incomplete', outcome: 'The statement is partially correct but incomplete. Contract manufacturing is a form of outsourcing.' },
                { text: 'outsourcing', outcome: 'Not quite — Students often think contract manufacturing means the international firm "lends" its brand to the.', reveals: 'contract-manufacturing-means-the-international' },
                { text: 'contract manufacturing', outcome: 'Not quite — Students often think contract manufacturing means the international firm "lends" its brand to the.', reveals: 'contract-manufacturing-means-the-international' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_11_006', title: 'Licensing and Franchising: Meaning, Merits and Limitations',
          caseStudy: { intro: 'Imagine you own a successful Indian spice blend brand "Masala Magic" with a secret recipe. A distributor in Dubai wants to sell your product there.',
            decisions: [{ prompt: 'Define licensing and state the term used for the fee paid by the licensee to the licensor.', options: [
                { text: 'Licensing is a contractual arrangement where the licensor grants the licensee the right', outcome: 'Licensing is a contractual arrangement where the licensor grants the licensee the right to use its.' },
                { text: 'fee is called dividend', outcome: 'Not quite — Students often confuse **licensing with contract manufacturing** because both involve a foreign.', reveals: 'students-often-confuse-licensing-with' },
                { text: 'licensing means selling the IP outright', outcome: 'Not quite — Students often confuse **licensing with contract manufacturing** because both involve a foreign.', reveals: 'students-often-confuse-licensing-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a career talk, a student claims: \'International business is only for firms that ship physical goods abroad — Infosys writing software for American banks, Pepsi licensing its syrup formula to a Thai bottler, and Tata buying a stake in a Kenyan tea estate don\'t count, because nothing crosses a border in a container.\'',
            decisions: [{ prompt: 'Is he right?', options: [
                { text: 'No — international business includes every commercial activity across national frontiers: services exports (Infosys), licensing/franchising of intellectual property (Pepsi), foreign investment (Tata\'s stake), contract manufacturing, and movement of capital, personnel and technology — not just merchandise in containers.', outcome: 'Trade in goods is only one component; the invisible flows of services, IP and capital are equally international business.' },
                { text: 'Yes — \'business across borders\' requires goods to physically cross; services and licences are domestic knowledge work.', outcome: 'That confuses international trade (merchandise) with the broader international business, which the definition extends to services, capital, technology and IP.', reveals: 'intl-biz-equals-goods-trade' },
                { text: 'Half right — services count as international business only if the worker physically travels abroad.', outcome: 'Personnel movement is one component, but cross-border service delivery happens electronically too — an Indian firm billing a US client from Bengaluru is international business.', reveals: 'services-need-travel' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now name the five fault lines — nationality, mobility, heterogeneity, politics, currency — that make a border a business event.',
            decisions: [{ prompt: 'What comes next? International Business · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — International Business · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_11_001', difficulty: 'standard',
          question: 'International Business refers to all commercial activities—including trade.',
          hint: 'Revisit Class 10 Economics Chapter 4 "Globalisation and the Indian Economy".',
          misconception: 'Students frequently equate "International Business" with "International Trade" (exports + imports of goods only).',
          parts: [
                { id: 'a', prompt: 'Compare the mobility of labour and capital in domestic business versus international business.', answer: 'Within a country, labour and capital move relatively freely across states',
                  options: ['Within a country, labour and capital move relatively freely across states', 'mobility is lower internationally'],
                  hint: 'Revisit Class 10 Economics Chapter 4 "Globalisation and the Indian Economy" — specifically the.',
                  misconception: 'Students frequently equate "International Business" with "International Trade" (exports + imports of goods only).' }
          ],
            remediations: { 'students-frequently-equate-international-busines': { steps: ['Ask the student to re-read the first paragraph of NCERT section 11.1.1 and highlight every noun that moves across.', 'Have them create a two-column table: "International Trade (Merchandise)" vs.', '"International Business (Broader)" and place each highlighted item in the correct column.', 'Give three mini-cases: (a) Infosys billing a US client for consulting, (b) PepsiCo licensing its formula to.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_11_002', difficulty: 'standard',
          question: 'International business arises because countries cannot produce all goods and.',
          hint: 'Revisit Class 9 Economics Chapter 1 (The Story of Village Palampur / Factors.',
          misconception: 'Students often equate international business solely with exporting physical goods, ignoring that it also includes trade.',
          parts: [
                { id: 'a', prompt: 'In your own words, explain why international business is based on the same principle of territorial division of labour that operates between states within.', answer: 'Just as West Bengal specialises in jute and Maharashtra in cotton textiles',
                  options: ['Just as West Bengal specialises in jute and Maharashtra in cotton textiles', 'to earn money'],
                  hint: 'Revisit Class 9 Economics Chapter 1 (The Story of Village Palampur / Factors of Production) and.',
                  misconception: 'Students often equate international business solely with exporting physical goods, ignoring that it also includes trade in services.' }
          ],
            remediations: { 'students-often-equate-international-business': { steps: ['If a student conflates the two benefit lists, draw a two-column table on paper: left column "Nation (Macro)", right.', 'Ask the student to place each of the nine textbook benefits (four for nations, five for firms) into the correct column.', 'For each placement, require a one-sentence justification naming the actor (e.g., "Foreign exchange goes to Nation.', 'Then discuss why "higher standard of living" is a societal outcome, not a firm\'s balance-sheet item.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_11_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate international business solely with exporting physical goods, ignoring that it also includes trade.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "International business benefits only large multinational corporations; small domestic firms gain nothing from going global." Use.', answer: 'The statement is false',
                  options: ['The statement is false', 'foreign exchange', 'way out to intense competition in domestic market'],
                  hint: 'Revisit Class 9 Economics Chapter 1 (The Story of Village Palampur / Factors of Production) and.',
                  misconception: 'Students often equate international business solely with exporting physical goods, ignoring that it also includes trade in services.' }
          ],
            remediations: { 'students-often-equate-international-business': { steps: ['If a student conflates the two benefit lists, draw a two-column table on paper: left column "Nation (Macro)", right.', 'Ask the student to place each of the nine textbook benefits (four for nations, five for firms) into the correct column.', 'For each placement, require a one-sentence justification naming the actor (e.g., "Foreign exchange goes to Nation.', 'Then discuss why "higher standard of living" is a societal outcome, not a firm\'s balance-sheet item.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_11_003', difficulty: 'standard',
          question: 'Modes of entry into international business refer to the various strategic.',
          hint: 'If stuck, revisit **c11_bs_cbse_11_001 (Section 11.1.1 and 11.1.2)** — specifically the.',
          misconception: 'Students often treat "Contract Manufacturing" and "Licensing" as interchangeable because both involve a foreign partner.',
          parts: [
                { id: 'a', prompt: 'Name the five modes of entry into international business as classified in the NCERT textbook, and state the defining feature that distinguishes "Contract.', answer: 'The five modes are: (1) Exporting and Importing, (2) Contract Manufacturing, (3)',
                  options: ['The five modes are: (1) Exporting and Importing, (2) Contract Manufacturing, (3)', 'giving technology to a local firm', 'both involve "giving technology to a local firm', 'conflates the two (e'],
                  hint: 'If stuck, revisit **c11_bs_cbse_11_001 (Section 11.1.1 and 11.1.2)** — specifically the distinction.',
                  misconception: 'Students often treat "Contract Manufacturing" and "Licensing" as interchangeable because both involve a foreign partner producing/selling.' },
                { id: 'b', prompt: 'Explain in your own words why "Exporting is the most preferred way for business firms when they are getting initially involved with international business" (as.', answer: 'Exporting is preferred initially',
                  options: ['Exporting is preferred initially', 'it\'s easy', 'toe-in-the-water'],
                  hint: 'If stuck, revisit **c11_bs_cbse_11_001 (Section 11.1.1 and 11.1.2)** — specifically the distinction.',
                  misconception: 'Students often treat "Contract Manufacturing" and "Licensing" as interchangeable because both involve a foreign partner producing/selling.' }
          ],
            remediations: { 'students-often-treat-contract-manufacturing': { steps: ['If the student conflates Contract Manufacturing and Licensing: 1.', '**Draw a two-column table** on paper: Left column "What the foreign partner DOES", Right column "What the Indian firm.', '**Fill for Contract Manufacturing**: Partner DOES = "Manufactures/assembles goods per our specs".', 'Firm GIVES = "Product designs, quality standards, raw materials (sometimes)".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_11_004', difficulty: 'standard',
          question: 'Exporting refers to the sale of goods and services from a home country to.',
          hint: 'Revisit c11_bs_cbse_11_002 (Reasons for International Business) to reinforce the economic.',
          misconception: 'Students often believe indirect exporting means "the export house buys the goods and resells them," confusing it with.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Exporting refers to the sale of goods and services from a home country to a foreign',
                  options: ['Exporting refers to the sale of goods and services from a home country to a foreign', 'International Business refers to all commercial activities—including trade in goods and', 'International business arises', 'Modes of entry into international business refer to the various strategic pathways a firm'],
                  hint: 'Revisit c11_bs_cbse_11_002 (Reasons for International Business) to reinforce the economic basis.',
                  misconception: 'Students often believe indirect exporting means "the export house buys the goods and resells them," confusing it with a domestic wholesale.' }
          ],
            remediations: { 'indirect-exporting-means-the-export': { steps: ['If a student confuses indirect exporting with merchant exporting (where the intermediary buys goods), use this 3-step.', 'Draw two side-by-side diagrams: Manufacturer → Export House (Agent) → Foreign Buyer vs.', 'Manufacturer → Merchant Exporter (Buyer) → Foreign Buyer.', 'Label ownership transfer points.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_11_005', difficulty: 'standard',
          question: 'Contract manufacturing is a mode of entry into international business where.',
          hint: 'If stuck, revisit c11_bs_cbse_11_003 (Modes of Entry Overview) and create a comparison.',
          misconception: 'Students often think contract manufacturing means the international firm "lends" its brand to the local manufacturer.',
          parts: [
                { id: 'a', prompt: 'A student reads: "Contract manufacturing is the same as outsourcing." Is this statement fully accurate?', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'outsourcing', 'contract manufacturing'],
                  hint: 'If stuck, revisit c11_bs_cbse_11_003 (Modes of Entry Overview) and create a comparison table with.',
                  misconception: 'Students often think contract manufacturing means the international firm "lends" its brand to the local manufacturer who then sells in the.' },
                { id: 'b', prompt: 'FitIndia (Indian sportswear firm) contracts a Vietnamese factory to produce 50,000 pairs of shoes per month.', answer: 'Capacity used = 50,000 pairs',
                  options: ['Capacity used = 50,000 pairs', 'uses 20% of its capacity'],
                  hint: 'If stuck, revisit c11_bs_cbse_11_003 (Modes of Entry Overview) and create a comparison table with.',
                  misconception: 'Students often think contract manufacturing means the international firm "lends" its brand to the local manufacturer who then sells in the.' },
                { id: 'c', prompt: 'Compare contract manufacturing and joint venture on these three dimensions: (a) equity investment by international firm, (b) control over manufacturing.', answer: '| Dimension | Contract Manufacturing | Joint Venture |',
                  options: ['| Dimension | Contract Manufacturing | Joint Venture |', 'low control', 'high equity investment', 'says contract manufacturing has "low control" confuses it with licensing'],
                  hint: 'If stuck, revisit c11_bs_cbse_11_003 (Modes of Entry Overview) and create a comparison table with.',
                  misconception: 'Students often think contract manufacturing means the international firm "lends" its brand to the local manufacturer who then sells in the.' }
          ],
            remediations: { 'contract-manufacturing-means-the-international': { steps: ['If a student makes this error: (1) Ask them to reread the NCERT line: "The goods so manufactured...', 'are delivered to the international firm for use in its final products or outrightly sold as finished products by the.', '(3) Contrast with licensing flow: Licensor → (brand, technology) → License → Licensee → (production + sales) → Licensee.', '(4) Give a 2-minute oral quiz: "Who sells the final product to the end customer in contract manufacturing?" until they.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_11_006', difficulty: 'standard',
          question: 'Licensing is a contractual arrangement where a firm (licensor) grants a foreign.',
          hint: 'Revisit c11_bs_cbse_11_003 (Modes of Entry Overview) and create a comparison table: Mode.',
          misconception: 'Students often confuse **licensing with contract manufacturing** because both involve a foreign partner producing.',
          parts: [
                { id: 'a', prompt: 'Compare the risk of "creating a future competitor" in licensing versus franchising. Which mode carries higher risk and why?', answer: '**Licensing carries higher risk** of creating a future competitor',
                  options: ['**Licensing carries higher risk** of creating a future competitor', 'more outlets'],
                  hint: 'Revisit c11_bs_cbse_11_003 (Modes of Entry Overview) and create a comparison table: Mode |.',
                  misconception: 'Students often confuse **licensing with contract manufacturing** because both involve a foreign partner producing locally.' }
          ],
            remediations: { 'students-often-confuse-licensing-with': { steps: ['Ask the student to identify **who bears the market risk** — if the local partner sells and keeps profit/loss, it\'s.', 'Have them trace the **flow of brand ownership** — in licensing, the brand travels with the product to the end customer.', 'Use the "Pepsi vs Nike" comparison: Pepsi\'s Mexican bottler decides pricing, promotion, distribution in Mexico.', 'Practice classifying 5 scenarios (e.g., "Tata Motors gets Fiat engines made in India" vs "Domino\'s lets an Indian.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
