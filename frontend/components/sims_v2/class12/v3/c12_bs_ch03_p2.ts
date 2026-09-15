import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bs_ch03_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bs_ch03_p2: SimDef = {
    id: 'v3_c12_bs_ch03_p2',
    title: 'Business Environment · Part 2/2',
    subtitle: 'Four shocks in one morning, none of them yours — welcome to the business environment.',
    classLevel: 12, subject: 'business_studies', topic: 'Business Environment · Part 2/2',
    chapters: ['c12_bs_ch03'],
    nodeIds: ['c12_bs_cbse_03_007', 'c12_bs_cbse_03_008', 'c12_bs_cbse_03_009', 'c12_bs_cbse_03_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Strategy analyst', intro: 'No business operates in a vacuum — the environment writes half your strategy before you enter the room.', goal: 'Define the business environment and classify its economic, social, technological, political and legal dimensions.' },
    discovery: {
        question: 'Overnight: a new food-labelling law passes, consumers shift to millets, RBI cuts rates, and a rival launches 20% cheaper. Your cloud kitchen controlled none of it — what is this force called?',
        options: ['The business environment — external economic, social, legal, technological and political forces that shape performance but lie beyond the firm\'s control', 'Bad luck — random events with no systematic pattern', 'Internal weakness — the firm should have prevented these changes', 'Market demand — all four events are forms of consumer preference'],
        answer: 'The business environment — external economic, social, legal, technological and political forces that shape performance but lie beyond the firm\'s control',
        hook: 'Students confuse \'environment\' with \'competition\' — but the concept covers every external force: legal, social, economic, technological, political. You can\'t control it; you can only read it early.',
    },
    teaching: [
        { title: 'Economic Liberalisation: New Industrial Policy 1991 and its Impact', text: 'Economic Liberalisation refers to the process of reducing government controls and restrictions on industries, trade, and investment to promote competition, efficiency, and integration with the global.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bs_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run an environmental scan for a packaged-food company: sort five overnight shocks into economic, social, technological, political and legal dimensions, and decide which demand a strategy response.',
        labels: ['Economic Liberalisation: New Industrial', 'Demonetisation and its Impact', 'Goods and Services Tax', 'Business Environment: Opportunities'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_bs_cbse_03_007', title: 'Economic Liberalisation: New Industrial Policy 1991 and its Impact',
          caseStudy: { intro: 'Imagine you are the CEO of an Indian car manufacturer in 1990: you need a licence to expand capacity, you cannot import the latest engine technology without.',
            decisions: [{ prompt: 'What were the three immediate crisis indicators in 1991 that forced the Government of India to announce the New Industrial Policy?', options: [
                { text: 'Correct answer: Any three of: (1) Fiscal deficit reached 6.6% of GDP, (2) Foreign', outcome: 'Correct answer: Any three of: (1) Fiscal deficit reached 6.6% of GDP, (2) Foreign exchange reserves.' },
                { text: 'high inflation', outcome: 'Not quite — Students often conflate "liberalisation" with "privatisation" and "globalisation," using the terms.', reveals: 'students-often-conflate-liberalisation-with' },
                { text: 'low growth', outcome: 'Not quite — Students often conflate "liberalisation" with "privatisation" and "globalisation," using the terms.', reveals: 'students-often-conflate-liberalisation-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_03_008', title: 'Demonetisation and its Impact on Indian Business',
          caseStudy: { intro: 'Imagine you are a small kirana store owner in Delhi on November 9, 2016.',
            decisions: [{ prompt: 'What were the two specific denominations demonetised on November 8, 2016, and what percentage of currency in circulation by value did they.', options: [
                { text: 'The demonetised denominations were ₹500 and ₹1,000 notes', outcome: 'The demonetised denominations were ₹500 and ₹1,000 notes, which together constituted 86% of the.' },
                { text: 'removed 86% of money supply', outcome: 'Not quite — Students often believe demonetisation "removed 86% of money supply" permanently.', reveals: 'demonetisation-removed-86-of-money' },
                { text: 'currency', outcome: 'Not quite — Students often believe demonetisation "removed 86% of money supply" permanently.', reveals: 'demonetisation-removed-86-of-money' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_03_009', title: 'Goods and Services Tax (GST): Impact on Business Environment',
          caseStudy: { intro: 'Imagine you run a small furniture workshop in Tamil Nadu selling a dining table to a retailer in Kerala.',
            decisions: [{ prompt: 'Define GST in one sentence and name the constitutional amendment that enabled it.', options: [
                { text: 'GST is a comprehensive, destination-based, multi-stage indirect tax on supply of goods', outcome: 'GST is a comprehensive, destination-based, multi-stage indirect tax on supply of goods and.' },
                { text: 'GST is a direct tax', outcome: 'Not quite — Students often believe GST is a single uniform tax rate for all goods/services.', reveals: 'gst-is-a-single-uniform' },
                { text: 'enabled by 99th Amendment', outcome: 'Not quite — Students often believe GST is a single uniform tax rate for all goods/services.', reveals: 'gst-is-a-single-uniform' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_03_010', title: 'Business Environment: Opportunities and Threats Analysis',
          caseStudy: { intro: 'Imagine you run a small packaged-snack business in India. Suddenly, the government announces a new health regulation limiting salt content, while a fitness.',
            decisions: [{ prompt: 'Define \'opportunity\' and \'threat\' in the context of business environment as per NCERT.', options: [
                { text: 'Opportunity: A positive external trend or change that helps a firm improve its', outcome: 'Opportunity: A positive external trend or change that helps a firm improve its performance (e.g.' },
                { text: 'our skilled workforce', outcome: 'Not quite — Students often treat opportunities and threats as absolute (e.g., "GST is a threat") rather than.', reveals: 'students-often-treat-opportunities-and' },
                { text: 'our strong brand is an opportunity', outcome: 'Not quite — Students often treat opportunities and threats as absolute (e.g., "GST is a threat") rather than.', reveals: 'students-often-treat-opportunities-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'An intern briefing a kirana-store owner says: \'A new competitor next door is a general force that affects all firms equally, while the new digital-billing mandate is a specific force aimed only at your shop.\'',
            decisions: [{ prompt: 'Did she classify the forces correctly?', options: [
                { text: 'She has it backwards — a new competitor is a specific force hitting this firm directly, while a billing mandate is a general (legal) force applying to all enterprises indirectly.', outcome: 'Specific forces (customers, competitors, suppliers, investors) act on one firm directly; general forces (social, political, legal, technological) press on every firm at once.' },
                { text: 'Yes — whatever affects many firms is \'specific\' to the industry, and a government rule naming a threshold targets only some firms.', outcome: 'Scope, not personal naming, decides the class: the mandate applies economy-wide even though it bites each firm differently.', reveals: 'specific-general-swapped' },
                { text: 'Yes — and since both are external forces, the distinction doesn\'t matter for planning.', outcome: 'It matters a lot: specific forces get firm-level responses (differentiate from the rival); general forces get compliance and positioning responses.', reveals: 'force-type-irrelevant' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_03_010', title: 'You made it',
          caseStudy: { intro: 'You now read the world as a manager does — five dimensions of forces you can\'t control but must anticipate. Environment dimensions are classic board content and the first skill of strategy.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_007', difficulty: 'standard',
          question: 'Economic Liberalisation refers to the process of reducing government controls.',
          hint: 'If stuck, revisit c12_bs_cbse_03_003 (Economic Environment in India) and.',
          misconception: 'Students often conflate "liberalisation" with "privatisation" and "globalisation," using the terms interchangeably.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Economic Liberalisation refers to the process of reducing government controls and',
                  options: ['Economic Liberalisation refers to the process of reducing government controls and', 'Business environment refers to the sum total of all external individuals, institutions,', 'The elements of business environment refer to the five broad external', 'The economic environment in India refers to the aggregate of macro-level factors'],
                  hint: 'If stuck, revisit c12_bs_cbse_03_003 (Economic Environment in India) and c11_eco_cbse_03_001.',
                  misconception: 'Students often conflate "liberalisation" with "privatisation" and "globalisation," using the terms interchangeably.' }
          ],
            remediations: { 'students-often-conflate-liberalisation-with': { steps: ['If the student cannot distinguish the three pillars, do this 3-step remediation: (1) Create a three-column concept map.', '(2) From the NCERT text, extract each policy measure (e.g., "industrial licensing reduced to six industries".', '(3) For each column, write one impact on business that is unique to that pillar (e.g., liberalisation → freedom to fix.', 'Re-test by asking the student to classify five new measures (e.g., "automatic technology agreements", "convertibility.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_008', difficulty: 'standard',
          question: 'Demonetisation is a monetary policy measure where a government strips specific.',
          hint: 'Revisit Class 10 Economics Chapter 3 (Money and Credit) nodes c10_eco_cbse_03_001 and.',
          misconception: 'Students often believe demonetisation "removed 86% of money supply" permanently.',
          parts: [
                { id: 'a', prompt: 'What were the two specific denominations demonetised on November 8, 2016, and what percentage of currency in circulation by value did they constitute?', answer: 'The demonetised denominations were ₹500 and ₹1,000 notes',
                  options: ['The demonetised denominations were ₹500 and ₹1,000 notes', 'removed 86% of money supply', 'currency', 'money supply'],
                  hint: 'Revisit Class 10 Economics Chapter 3 (Money and Credit) nodes c10_eco_cbse_03_001 and.',
                  misconception: 'Students often believe demonetisation "removed 86% of money supply" permanently.' },
                { id: 'b', prompt: 'A small manufacturing firm used to pay daily wages in cash. After demonetisation, it opened bank accounts for all workers and switched to NEFT transfers.', answer: 'The change illustrates (1) Digitisation',
                  options: ['The change illustrates (1) Digitisation', 'Private wealth', 'Real estate', 'removed 86% of money supply'],
                  hint: 'Revisit Class 10 Economics Chapter 3 (Money and Credit) nodes c10_eco_cbse_03_001 and.',
                  misconception: 'Students often believe demonetisation "removed 86% of money supply" permanently.' },
                { id: 'c', prompt: 'Compare the impact of demonetisation on "Private wealth" versus "Public sector wealth" as per the Economic Survey 2016–17 summary. Why did they diverge?', answer: 'Private wealth declined',
                  options: ['Private wealth declined', 'public sector wealth increased', 'removed 86% of money supply', 'currency'],
                  hint: 'Revisit Class 10 Economics Chapter 3 (Money and Credit) nodes c10_eco_cbse_03_001 and.',
                  misconception: 'Students often believe demonetisation "removed 86% of money supply" permanently.' }
          ],
            remediations: { 'demonetisation-removed-86-of-money': { steps: ['If a student conflates currency with money supply, walk them through the RBI balance sheet step-by-step: (1).', '(2) Deposit window: Liability shifts to "Deposits with RBI" (bank reserves).', '(3) New notes issued: Liability shifts to "New ₹500/₹2000 notes".', '(4) Unreturned notes: Liability extinguished → RBI gains seigniorage → transferred to government.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe demonetisation "removed 86% of money supply" permanently.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Demonetisation successfully eliminated black money in India." Use at least two NCERT impact dimensions to support your evaluation.', answer: 'The statement is overstated',
                  options: ['The statement is overstated', 'removed 86% of money supply', 'currency', 'money supply'],
                  hint: 'Revisit Class 10 Economics Chapter 3 (Money and Credit) nodes c10_eco_cbse_03_001 and.',
                  misconception: 'Students often believe demonetisation "removed 86% of money supply" permanently.' },
                { id: 'b', prompt: 'Design a hypothetical 5-question survey for a local market association to assess the *lasting* behavioural changes in digital payment adoption three years.', answer: 'Example mapping: (1) Money/Interest rates',
                  options: ['Example mapping: (1) Money/Interest rates', 'removed 86% of money supply', 'currency', 'money supply'],
                  hint: 'Revisit Class 10 Economics Chapter 3 (Money and Credit) nodes c10_eco_cbse_03_001 and.',
                  misconception: 'Students often believe demonetisation "removed 86% of money supply" permanently.' }
          ],
            remediations: { 'demonetisation-removed-86-of-money': { steps: ['If a student conflates currency with money supply, walk them through the RBI balance sheet step-by-step: (1).', '(2) Deposit window: Liability shifts to "Deposits with RBI" (bank reserves).', '(3) New notes issued: Liability shifts to "New ₹500/₹2000 notes".', '(4) Unreturned notes: Liability extinguished → RBI gains seigniorage → transferred to government.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_009', difficulty: 'standard',
          question: 'Goods and Services Tax (GST) is a comprehensive, destination-based, multi-stage.',
          hint: 'If stuck, revisit the concept of cascading effect of taxes (Class 11 Economics.',
          misconception: 'Students often believe GST is a single uniform tax rate for all goods/services.',
          parts: [
                { id: 'a', prompt: 'Why is GST called a "destination-based tax"? Explain with a simple intra-state vs inter-state example.', answer: 'GST is destination-based',
                  options: ['GST is destination-based', 'tax collected at destination', 'GST is a single uniform tax rate for all goods/services'],
                  hint: 'If stuck, revisit the concept of cascading effect of taxes (Class 11 Economics, Liberalisation: Tax.',
                  misconception: 'Students often believe GST is a single uniform tax rate for all goods/services.' },
                { id: 'b', prompt: 'A manufacturer in Gujarat buys raw materials worth ₹5,00,000 (plus GST @18%) and sells finished goods worth ₹8,00,000 (plus GST @18%) within Gujarat.', answer: 'Step 1: Input CGST = Input SGST = 9% of ₹5,00,000 = ₹45,000 each',
                  options: ['Step 1: Input CGST = Input SGST = 9% of ₹5,00,000 = ₹45,000 each', 'GST is a single uniform tax rate for all goods/services'],
                  hint: 'If stuck, revisit the concept of cascading effect of taxes (Class 11 Economics, Liberalisation: Tax.',
                  misconception: 'Students often believe GST is a single uniform tax rate for all goods/services.' }
          ],
            remediations: { 'gst-is-a-single-uniform': { steps: ['If the student holds the above misconception: (1) Give them the GST rate schedule (CBSE provided appendix) and ask them.', '(2) Show a sample purchase invoice with mixed items (some eligible, some blocked for ITC) and walk through the credit.', 'Is it blocked under Section 17(5)?" (3) Revisit the difference between direct tax (on income) and indirect tax (on.', '(4) Re-diagnose with a fresh question: "A car dealer buys a demo car for showroom.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_010', difficulty: 'standard',
          question: 'Opportunities and Threats Analysis is the systematic process of scanning the.',
          hint: 'If stuck, re-read the "Dimensions of Business Environment" section in NCERT Chapter 3 and.',
          misconception: 'Students often treat opportunities and threats as absolute (e.g., "GST is a threat") rather than relative to the firm’s.',
          parts: [
                { id: 'a', prompt: 'Define \'opportunity\' and \'threat\' in the context of business environment as per NCERT.', answer: 'Opportunity: A positive external trend or change that helps a firm improve its',
                  options: ['Opportunity: A positive external trend or change that helps a firm improve its', 'our skilled workforce', 'our strong brand is an opportunity', 'high employee turnover is a threat'],
                  hint: 'If stuck, re-read the "Dimensions of Business Environment" section in NCERT Chapter 3 and the.',
                  misconception: 'Students often treat opportunities and threats as absolute (e.g., "GST is a threat") rather than relative to the firm’s specific situation.' },
                { id: 'b', prompt: 'A student writes: "The introduction of GST is a threat to all businesses because it increases compliance costs." Explain why this statement is.', answer: 'GST is a legal/political environment change',
                  options: ['GST is a legal/political environment change', 'our strong brand is an opportunity', 'high employee turnover is a threat'],
                  hint: 'If stuck, re-read the "Dimensions of Business Environment" section in NCERT Chapter 3 and the.',
                  misconception: 'Students often treat opportunities and threats as absolute (e.g., "GST is a threat") rather than relative to the firm’s specific situation.' },
                { id: 'c', prompt: 'A traditional bookstore notices declining footfall due to e-commerce growth but sees rising demand for curated reading experiences and coffee-shop ambience.', answer: 'Threats: (1) Technological',
                  options: ['Threats: (1) Technological', 'increase marketing', 'our strong brand is an opportunity', 'high employee turnover is a threat'],
                  hint: 'If stuck, re-read the "Dimensions of Business Environment" section in NCERT Chapter 3 and the.',
                  misconception: 'Students often treat opportunities and threats as absolute (e.g., "GST is a threat") rather than relative to the firm’s specific situation.' }
          ],
            remediations: { 'students-often-treat-opportunities-and': { steps: ['Revisit c12_bs_cbse_03_002 (Elements of Business Environment) and c12_bs_cbse_03_001 (Meaning/Features) to relearn the.', 'Take the NCERT Maruti Udyog example and explicitly map each factor (rising petrol prices, middle-class growth).', 'Pick a local business (e.g., a neighbourhood bakery) and write three recent external changes; classify each.', 'Verify with a peer/teacher that your classification changes if the business were a cloud kitchen instead.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
