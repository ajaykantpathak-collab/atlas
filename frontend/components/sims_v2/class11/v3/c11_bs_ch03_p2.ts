import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bs_ch03_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bs_ch03_p2: SimDef = {
    id: 'v3_c11_bs_ch03_p2',
    title: 'Private, Public and Global Enterprises · Part 2/2',
    subtitle: 'Separate \'owned by the public\' from \'sold to the public\' — the exam\'s favourite trap.',
    classLevel: 11, subject: 'business_studies', topic: 'Private, Public and Global Enterprises · Part 2/2',
    chapters: ['c11_bs_ch03'],
    nodeIds: ['c11_bs_cbse_03_007', 'c11_bs_cbse_03_008', 'c11_bs_cbse_03_009', 'c11_bs_cbse_03_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a policy analyst explaining a disinvestment headline', intro: 'The news says government will sell 51% of a PSU. Before you can say what changes, you need the real definition of public sector.', goal: 'Distinguish private from public sector enterprises and classify the three public sector forms by ownership, control, and legal basis.' },
    discovery: {
        question: 'A student calls LIC \'a public sector company because it sells insurance to the public\' — and calls Reliance \'private\' for the opposite reason. Both labels are wrong for the same reason. What\'s the actual test?',
        options: ['Ownership and legal origin — LIC is government-owned under its own Act; a \'public limited company\' like Reliance sells shares publicly but stays privately controlled', 'Size — only large firms count as public sector', 'Who buys the product — serving citizens makes it public', 'Stock exchange listing — listed firms are public sector'],
        answer: 'Ownership and legal origin — LIC is government-owned under its own Act; a \'public limited company\' like Reliance sells shares publicly but stays privately controlled',
        hook: '\'Public sector\' means owned BY the public through government; \'public limited\' means shares sold TO the public — same word, opposite classifications.',
    },
    teaching: [
        { title: 'Joint Ventures: Meaning, Benefits and Limitations', text: 'A joint venture is a strategic alliance where two or more independent business entities pool their resources, expertise, and capital to achieve a specific, mutually beneficial goal while sharing.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bs_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Classify a lineup — Indian Railways, Reliance, LIC, BHEL, your local kirana — into private sector versus departmental undertaking, statutory corporation, or government company, citing ownership and the law that created each.',
        labels: ['Joint Ventures: Meaning, Benefits', 'Multinational Corporations: Features, Merits', 'Role of Multinational Corporations', 'Distinction between Private'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bs_cbse_03_007', title: 'Joint Ventures: Meaning, Benefits and Limitations',
          caseStudy: { intro: 'Imagine an Indian electric two-wheeler startup, "Volt Motors," has a revolutionary battery-swapping technology but lacks the capital to build a nationwide.',
            decisions: [{ prompt: 'Define a Joint Venture and state the one fundamental characteristic that distinguishes it from a simple buyer-seller transaction or.', options: [
                { text: 'A Joint Venture is the pooling of resources and expertise by two or more businesses to', outcome: 'A Joint Venture is the pooling of resources and expertise by two or more businesses to achieve.' },
                { text: 'any agreement between two companies', outcome: 'Not quite — Students frequently confuse **Joint Venture (JV)** with **Partnership Firm**.', reveals: 'students-frequently-confuse-joint-venture' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_03_008', title: 'Multinational Corporations: Features, Merits and Limitations',
          caseStudy: { intro: 'Imagine you walk into a shopping mall and see a Samsung smartphone, a Nike shoe, and a Coca-Cola bottle.',
            decisions: [{ prompt: 'List the seven features of Multinational Corporations as described in the NCERT Class 11 Business Studies textbook.', options: [
                { text: 'The seven features are: (i) Huge capital resources, (ii) Foreign collaboration, (iii)', outcome: 'The seven features are: (i) Huge capital resources, (ii) Foreign collaboration, (iii) Advanced.' },
                { text: 'shared ownership', outcome: 'Not quite — Students often believe that any foreign company selling in India is an MNC.', reveals: 'any-foreign-company-selling-in' },
                { text: 'any foreign company selling in India is an MNC', outcome: 'Not quite — Students often believe that any foreign company selling in India is an MNC.', reveals: 'any-foreign-company-selling-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_03_009', title: 'Role of Multinational Corporations in Indian Economy',
          caseStudy: { intro: 'Imagine you walk into a shopping mall and see Samsung, Hyundai, Nestlé, and Amazon all operating alongside Indian brands like Tata, Reliance, and Amul.',
            decisions: [{ prompt: 'State the definition of a Multinational Corporation as per the NCERT Class 11 Business Studies textbook, highlighting the three.', options: [
                { text: 'A Multinational Corporation is a huge industrial organisation', outcome: 'A Multinational Corporation is a huge industrial organisation which extends its industrial and.' },
                { text: 'foreign company operating in India', outcome: 'Not quite — Students often equate "MNC role in Indian economy" with "FDI inflows" and think the only metric.', reveals: 'students-often-equate-mnc-role' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_03_010', title: 'Distinction between Private and Public Sector Enterprises',
          caseStudy: { intro: 'Imagine you are reading a newspaper headline: "Government to sell stake in Air India" and another: "Tata Group acquires Air India." You wonder: what changes.',
            decisions: [{ prompt: 'Define \'public sector enterprise\' as per the Companies Act, 2013, specifying the minimum government shareholding threshold.', options: [
                { text: 'A public sector enterprise (government company) is defined under Section 2(45) of the', outcome: 'A public sector enterprise (government company) is defined under Section 2(45) of the Companies.' },
                { text: 'any company with government shares', outcome: 'Not quite — Students frequently confuse a **public limited company** (e.g., Reliance Industries Ltd., listed.', reveals: 'students-frequently-confuse-a-public' },
                { text: '50% threshold', outcome: 'Not quite — Students frequently confuse a **public limited company** (e.g., Reliance Industries Ltd., listed.', reveals: 'students-frequently-confuse-a-public' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'During a stock-market club session you\'re sorting enterprises for a mock ESG portfolio. Members argue over SAIL and BHEL: \'They say Ltd. and are Public Limited Companies whose shares trade on NSE — so they must be private sector. Public sector means something the public can\'t buy shares in, like the Railways.\'',
            decisions: [{ prompt: 'Which sector do SAIL and BHEL actually belong to?', options: [
                { text: 'Public sector — the test is ownership: government holds ≥51% of paid-up capital, making them Government Companies. \'Public Limited\' only describes share transferability under the Companies Act; \'public sector\' describes who owns it. SAIL is public limited by form and public sector by ownership.', outcome: 'Two different axes — legal form (public/private limited) and ownership (private individuals vs government ≥51%) — must not be conflated.' },
                { text: 'Private sector — anything listed on a stock exchange with \'Ltd.\' in its name is a private company.', outcome: 'Exchange listing and \'Ltd.\' are about form, not ownership; a company can be publicly traded AND government-owned.', reveals: 'ltd-means-private-sector' },
                { text: 'Neither — if shares trade publicly it can\'t be \'public sector\' because that term means closed to public participation.', outcome: '\'Public\' in public sector means owned by the public through government — the opposite of closed; citizens hold it via the state\'s majority stake.', reveals: 'public-sector-means-not-listed' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_03_010', title: 'You made it',
          caseStudy: { intro: 'You now sort enterprises by who owns them and what statute birthed them — not by what they sell or how big they are.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_03_007', difficulty: 'standard',
          question: 'A joint venture is a strategic alliance where two or more independent business.',
          hint: 'If stuck, revisit **c11_bs_cbse_03_001** (Private/Public/Global classification).',
          misconception: 'Students frequently confuse **Joint Venture (JV)** with **Partnership Firm** or **Merger/Amalgamation**. 1.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the risk exposure of the partners in a Contractual JV (CJV) vs. an Equity JV (EJV) when the venture incurs massive unexpected losses.', answer: 'In an EJV, a new separate legal entity (company/LLP) is formed',
                  options: ['In an EJV, a new separate legal entity (company/LLP) is formed', 'both have limited liability', 'CJV has less risk'],
                  hint: 'If stuck, revisit **c11_bs_cbse_03_001** (Private/Public/Global classification) to identify partner.',
                  misconception: 'Students frequently confuse **Joint Venture (JV)** with **Partnership Firm** or **Merger/Amalgamation**. 1.' }
          ],
            remediations: { 'students-frequently-confuse-joint-venture': { steps: ['** Draw a 2x2 matrix on paper: Rows = "New Entity Created?" (Yes/No), Columns = "Shared Ownership?" (Yes/No).', '** For each quadrant, write *one* Indian example (e.g., EJV: Maruti Suzuki (historical); CJV: Franchise like McDonald\'s.', '** Re-read NCERT 3.6.1 key phrases: "new jointly-owned entity is *not* created" (CJV) vs "separate business entity...', '** Verbally explain to a peer: "In a CJV, if the venture fails, my main company isn\'t automatically liable for the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_03_008', difficulty: 'standard',
          question: 'A Multinational Corporation (MNC) is a large industrial organisation that.',
          hint: 'Revisit c11_bs_cbse_03_001 (Private and Public Sector) for sector classification, and.',
          misconception: 'Students often believe that any foreign company selling in India is an MNC.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Multinational Corporation (MNC) is a large industrial organisation that extends its',
                  options: ['A Multinational Corporation (MNC) is a large industrial organisation that extends its', 'The private sector comprises business enterprises owned, controlled, and managed by', 'A departmental undertaking is the oldest and most traditional form of public sector', 'A statutory corporation is a public enterprise created by a Special Act of Parliament or'],
                  hint: 'Revisit c11_bs_cbse_03_001 (Private and Public Sector) for sector classification, and.',
                  misconception: 'Students often believe that any foreign company selling in India is an MNC.' }
          ],
            remediations: { 'any-foreign-company-selling-in': { steps: ['Ask the student to draw a diagram: Home Country HQ → Subsidiary A (Country X), Subsidiary B (Country Y), showing flow.', 'Have them classify 5 real companies (e.g., Apple, Infosys, Tata Motors, Suzuki India, a local exporter) as MNC or not.', 'Discuss why Infosys (Indian HQ, global delivery centres) is an MNC while a local exporter is not, reinforcing that MNC.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_03_009', difficulty: 'standard',
          question: 'Multinational Corporations (MNCs) are large industrial organisations.',
          hint: 'Revisit c11_bs_cbse_03_008 and create a feature table: Feature | Textbook Description |.',
          misconception: 'Students often equate "MNC role in Indian economy" with "FDI inflows" and think the only metric is how many dollars.',
          parts: [
                { id: 'a', prompt: 'State the definition of a Multinational Corporation as per the NCERT Class 11 Business Studies textbook, highlighting the three distinguishing features that.', answer: 'A Multinational Corporation is a huge industrial organisation',
                  options: ['A Multinational Corporation is a huge industrial organisation', 'foreign company operating in India'],
                  hint: 'Revisit c11_bs_cbse_03_008 and create a feature table: Feature | Textbook Description | Example.',
                  misconception: 'Students often equate "MNC role in Indian economy" with "FDI inflows" and think the only metric is how many dollars enter.' }
          ],
            remediations: { 'students-often-equate-mnc-role': { steps: ['Ask the student to draw the MNC\'s value chain — where is R&D? Where is manufacturing? Where are profits booked?', 'For each stage, identify which textbook feature (huge capital, advanced tech, centralised control, etc.) drives the.', 'Trace the impact on India at each stage (employment, technology, forex, market structure).', 'Re-evaluate the net impact. This forces the student to move from aggregate "FDI = good" to feature-by-feature causal.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_03_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate "MNC role in Indian economy" with "FDI inflows" and think the only metric is how many dollars.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "MNCs are harmful to the Indian economy because they repatriate profits and dominate domestic markets." Use at least three textbook.', answer: 'The statement is partially valid but incomplete',
                  options: ['The statement is partially valid but incomplete', 'agrees wholly or disagrees wholly shows inability to evaluate trade-offs'],
                  hint: 'Revisit c11_bs_cbse_03_008 and create a feature table: Feature | Textbook Description | Example.',
                  misconception: 'Students often equate "MNC role in Indian economy" with "FDI inflows" and think the only metric is how many dollars enter.' }
          ],
            remediations: { 'students-often-equate-mnc-role': { steps: ['Ask the student to draw the MNC\'s value chain — where is R&D? Where is manufacturing? Where are profits booked?', 'For each stage, identify which textbook feature (huge capital, advanced tech, centralised control, etc.) drives the.', 'Trace the impact on India at each stage (employment, technology, forex, market structure).', 'Re-evaluate the net impact. This forces the student to move from aggregate "FDI = good" to feature-by-feature causal.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_03_010', difficulty: 'standard',
          question: 'Private sector enterprises are businesses owned, controlled, and managed.',
          hint: 'Revisit the definitions in node c11_bs_cbse_03_001 and the comparative table of public.',
          misconception: 'Students frequently confuse a **public limited company** (e.g., Reliance Industries Ltd., listed on stock exchange.',
          parts: [
                { id: 'a', prompt: 'Explain why the Indian economy is classified as a \'mixed economy\' and how this classification shapes the coexistence of private and public sectors.', answer: 'The Indian economy is a mixed economy',
                  options: ['The Indian economy is a mixed economy', 'both sectors exist'],
                  hint: 'Revisit the definitions in node c11_bs_cbse_03_001 and the comparative table of public sector forms.',
                  misconception: 'Students frequently confuse a **public limited company** (e.g., Reliance Industries Ltd., listed on stock exchange, shares held by public).' },
                { id: 'b', prompt: 'Compare the accountability mechanisms of a departmental undertaking and a government company.', answer: 'Departmental undertakings are directly accountable to the concerned ministry and',
                  options: ['Departmental undertakings are directly accountable to the concerned ministry and', 'both are equally accountable to Parliament'],
                  hint: 'Revisit the definitions in node c11_bs_cbse_03_001 and the comparative table of public sector forms.',
                  misconception: 'Students frequently confuse a **public limited company** (e.g., Reliance Industries Ltd., listed on stock exchange, shares held by public).' }
          ],
            remediations: { 'students-frequently-confuse-a-public': { steps: ['Draw a two-column table. Column A: "Public Limited Company (Private Sector)" – write: Owned by private promoters.', 'Give 5 company names (TCS, ONGC, HDFC Bank, Coal India, Maruti Suzuki) and ask student to place each in correct column.', 'Explicitly state: "Public limited = shares sold to public; Public sector = owned by government." Repeat until the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
