import type { SimDef } from '../../engine/types';

/** v3 generated — c11_acc_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_acc_ch01_p1: SimDef = {
    id: 'v3_c11_acc_ch01_p1',
    title: 'Introduction to Accounting · Part 1/2',
    subtitle: 'Decide what counts as a transaction, who accounting serves, and why cash isn\'t profit.',
    classLevel: 11, subject: 'accountancy', topic: 'Introduction to Accounting · Part 1/2',
    chapters: ['c11_acc_ch01'],
    nodeIds: ['c11_acc_cbse_01_001', 'c11_acc_cbse_01_002', 'c11_acc_cbse_01_003', 'c11_acc_cbse_01_004', 'c11_acc_cbse_01_005', 'c11_acc_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a trainee accountant auditing a neighbourhood shop', intro: 'A busy shopkeeper insists her memory is better than any ledger. You\'re here to show her what slips through.', goal: 'Distinguish accounting from bookkeeping, identify users of accounting information, and classify transactions correctly.' },
    discovery: {
        question: 'A kirana shop owner sells ₹40,000 of goods this month but only ₹28,000 reaches her bank account — the rest is on credit and expenses. Her ledger says she\'s \'doing fine\'. Which single idea explains why her books can say one thing while her cash says another?',
        options: ['Profit is measured on what is earned, not what is collected in cash', 'Cash in hand is always equal to profit for the month', 'Credit sales are ignored until the money actually arrives', 'Only cash expenses reduce profit, never credit purchases'],
        answer: 'Profit is measured on what is earned, not what is collected in cash',
        hook: 'Accounting separates earning from collecting — that\'s the leap from a cash diary to real accounts.',
    },
    teaching: [
        { title: 'Accounting: Meaning and Definition', text: 'Accounting is the systematic process of identifying, measuring, recording, and communicating financial information about an organisation\'s economic events to interested users for decision-making.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_acc_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace a week of transactions in a small business and decide which ones actually belong in the books of accounts.',
        labels: ['Accounting: Meaning and Definition', 'Book-keeping vs Accounting: Distinction', 'Evolution of Accounting: Historical', 'Users of Accounting Information', 'Qualitative Characteristics of Accounting', 'Branches of Accounting: Financial,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_acc_cbse_01_001', title: 'Accounting: Meaning and Definition',
          caseStudy: { intro: 'Imagine you run a small neighbourhood bakery. Every day you buy flour, sell cakes, pay wages, and take cash from the register.',
            decisions: [{ prompt: 'Define accounting in one sentence using the four key verbs from the standard definition (identify, measure, record, communicate).', options: [
                { text: 'Accounting is the process of identifying, measuring, recording, and communicating', outcome: 'Accounting is the process of identifying, measuring, recording, and communicating financial.' },
                { text: 'accounting is recording transactions', outcome: 'Not quite — Students equate "accounting" with "book-keeping" and think every business activity is recorded.', reveals: 'students-equate-accounting-with-book' },
                { text: 'omits any of the four verbs (e', outcome: 'Not quite — Students equate "accounting" with "book-keeping" and think every business activity is recorded.', reveals: 'students-equate-accounting-with-book' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_01_002', title: 'Book-keeping vs Accounting: Distinction',
          caseStudy: { intro: 'Imagine you run a small kirana store. Every day you note down cash sales, credit sales to regular customers, and purchases from wholesalers in a rough.',
            decisions: [{ prompt: 'State the primary function of book-keeping in one sentence.', options: [
                { text: 'The primary function of book-keeping is the systematic identification, measurement, and', outcome: 'The primary function of book-keeping is the systematic identification, measurement, and.' },
                { text: 'preparing financial statements', outcome: 'Not quite — Students often believe book-keeping and accounting are synonymous or that book-keeping is "simple.', reveals: 'book-keeping-and-accounting-are' },
                { text: 'analysing profits', outcome: 'Not quite — Students often believe book-keeping and accounting are synonymous or that book-keeping is "simple.', reveals: 'book-keeping-and-accounting-are' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_01_003', title: 'Evolution of Accounting: Historical Development',
          caseStudy: { intro: 'Imagine you are a merchant in 15th century Venice managing multiple ships, goods, and creditors across the Mediterranean — how would you know if you made.',
            decisions: [{ prompt: 'Name any three ancient civilisations that developed early accounting systems and state the primary economic purpose (taxation, trade,.', options: [
                { text: 'Correct answer: Babylonia (trade/fraud detection), Egypt (treasury management/tax', outcome: 'Correct answer: Babylonia (trade/fraud detection), Egypt (treasury management/tax collection).' },
                { text: 'better', outcome: 'Not quite — Students often believe accounting history is a linear progression of "better" techniques where each.', reveals: 'accounting-history-is-a-linear' },
                { text: 'Egypt used accounting for trade rather than treasury', outcome: 'Not quite — Students often believe accounting history is a linear progression of "better" techniques where each.', reveals: 'accounting-history-is-a-linear' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_01_004', title: 'Users of Accounting Information: Internal and External',
          caseStudy: { intro: 'Imagine you run a small bakery in Delhi. Your baker (employee) needs to know daily sales to plan ingredient purchases, your bank manager needs to know if you.',
            decisions: [{ prompt: 'Name any four internal users of accounting information as identified in the NCERT Class 11 textbook, and state the primary decision-making.', options: [
                { text: 'Correct answer: (1) Chief Executive Officer', outcome: 'Correct answer: (1) Chief Executive Officer — strategic direction and overall performance; (2).' },
                { text: 'shareholders', outcome: 'Not quite — Students consistently classify "Government" as a single external user with uniform needs, but NCERT.', reveals: 'students-consistently-classify-government-as' },
                { text: 'managers', outcome: 'Not quite — Students consistently classify "Government" as a single external user with uniform needs, but NCERT.', reveals: 'students-consistently-classify-government-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_01_005', title: 'Qualitative Characteristics of Accounting Information',
          caseStudy: { intro: 'Imagine you are a bank manager deciding whether to approve a ₹50 lakh loan to a small manufacturing firm.',
            decisions: [{ prompt: 'State the four qualitative characteristics of accounting information as per the NCERT Class 11 framework.', options: [
                { text: 'The four qualitative characteristics are: (1) Reliability, (2) Relevance, (3)', outcome: 'The four qualitative characteristics are: (1) Reliability, (2) Relevance, (3) Understandability.' },
                { text: 'accuracy', outcome: 'Not quite — Students believe "comparability" means all companies must use identical accounting policies for all.', reveals: 'comparability-means-all-companies-must' },
                { text: 'completeness', outcome: 'Not quite — Students believe "comparability" means all companies must use identical accounting policies for all.', reveals: 'comparability-means-all-companies-must' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_01_006', title: 'Branches of Accounting: Financial, Cost, Management',
          caseStudy: { intro: 'Imagine you\'re the owner of a growing furniture manufacturing business in Delhi.',
            decisions: [{ prompt: 'State the primary objective of Financial Accounting as defined in the NCERT textbook for Class 11.', options: [
                { text: 'The primary objective of Financial Accounting is to keep a systematic record of financial', outcome: 'The primary objective of Financial Accounting is to keep a systematic record of financial.' },
                { text: 'to control costs', outcome: 'Not quite — Students often believe **Cost Accounting and Management Accounting are the same** because both.', reveals: 'cost-accounting-and-management-accounting' },
                { text: 'to help managers make decisions', outcome: 'Not quite — Students often believe **Cost Accounting and Management Accounting are the same** because both.', reveals: 'cost-accounting-and-management-accounting' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'You volunteer as treasurer for your school\'s two-day cultural fest. On day one: a sponsor pays ₹20,000, you hire a popular band for day two, the principal announces a donation, and a stall\'s fridge breaks down (₹8,000 repair estimate). Back in the accounts room, a teammate says every announcement should go in the books because they are all important.',
            decisions: [{ prompt: 'Which events actually enter the fest\'s accounts?', options: [
                { text: 'Record the sponsor\'s ₹20,000 and the fridge loss estimate — both are economic events measurable in money. The band hiring becomes a transaction only when the service/payment is made, and the principal\'s announcement is not measurable until the money is promised in writing and received.', outcome: 'Accounting filters events through monetary measurability: only what can be expressed in rupees is recorded, however \'important\' the rest feels.' },
                { text: 'Record all four — the band booking and the announced donation are significant events for the fest.', outcome: 'Significance is not the test; without a monetary amount attached to an exchange, the event stays outside the books.', reveals: 'importance-equals-recordable' },
                { text: 'Just write down whatever cash physically moved today — accounting is only cash in and cash out.', outcome: 'That reduces accounting to book-keeping of cash; accounting records all measurable economic events (including credit and losses) and then analyses them for decisions.', reveals: 'accounting-is-cash-bookkeeping' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Accounting is the language that turns scattered transactions into a story a business can act on.',
            decisions: [{ prompt: 'What comes next? Introduction to Accounting · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Introduction to Accounting · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_acc_cbse_01_001', difficulty: 'standard',
          question: 'Accounting is the systematic process of identifying, measuring, recording, and.',
          hint: 'Revisit Class 7 Economics "Functions of Money: Medium of Exchange, Store of Value".',
          misconception: 'Students equate "accounting" with "book-keeping" and think every business activity is recorded.',
          parts: [
                { id: 'a', prompt: '"Accounting information must be comparable." A company changes its depreciation method from straight-line to written-down-value in Year 3 without disclosure.', answer: 'Changing method without disclosure breaks inter-period comparability (Year 3 vs',
                  options: ['Changing method without disclosure breaks inter-period comparability (Year 3 vs', 'comparability'],
                  hint: 'Revisit Class 7 Economics "Functions of Money: Medium of Exchange, Store of Value".',
                  misconception: 'Students equate "accounting" with "book-keeping" and think every business activity is recorded.' }
          ],
            remediations: { 'students-equate-accounting-with-book': { steps: ['Ask the student to list five things that happened in a shop today.', 'For each, ask "Can you put a ₹ amount on it right now?"', 'Cross out those without a measurable amount.', 'Explain: "Accounting is a filter — only monetary events pass through."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "accounting" with "book-keeping" and think every business activity is recorded.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Since accounting only records past transactions, it has no value for future planning." Defend your position with two arguments from.', answer: 'The statement is false',
                  options: ['The statement is false', 'past-oriented recording', 'past-only utility'],
                  hint: 'Revisit Class 7 Economics "Functions of Money: Medium of Exchange, Store of Value".',
                  misconception: 'Students equate "accounting" with "book-keeping" and think every business activity is recorded.' }
          ],
            remediations: { 'students-equate-accounting-with-book': { steps: ['Ask the student to list five things that happened in a shop today.', 'For each, ask "Can you put a ₹ amount on it right now?"', 'Cross out those without a measurable amount.', 'Explain: "Accounting is a filter — only monetary events pass through."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_01_002', difficulty: 'standard',
          question: 'Book-keeping is the systematic process of identifying, measuring, and recording.',
          hint: 'Revisit c11_acc_cbse_01_001 and create a flowchart of the accounting process; highlight.',
          misconception: 'Students often believe book-keeping and accounting are synonymous or that book-keeping is "simple accounting" while.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Book-keeping is the systematic process of identifying, measuring, and recording financial',
                  options: ['Book-keeping is the systematic process of identifying, measuring, and recording financial', 'Accounting is the systematic process of identifying, measuring, recording, and', 'The evolution of accounting refers to the chronological development of accounting', 'Users of accounting information are individuals or groups who rely on financial reports'],
                  hint: 'Revisit c11_acc_cbse_01_001 and create a flowchart of the accounting process; highlight the first.',
                  misconception: 'Students often believe book-keeping and accounting are synonymous or that book-keeping is "simple accounting" while accounting is "advanced.' }
          ],
            remediations: { 'book-keeping-and-accounting-are': { steps: ['Ask the student to list every activity involved in "maintaining books" vs. "preparing final accounts."', 'Use a two-column table on board: left column = book-keeping (identify, measure, record, classify, post), right column.', 'Give 5 specific tasks (e.g., "recording a sales invoice," "calculating depreciation," "preparing cash flow statement,".', 'Emphasise the verb test — if the verb is record/post/classify → book-keeping; if analyse/interpret/advise/communicate →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_01_003', difficulty: 'standard',
          question: 'The evolution of accounting refers to the chronological development.',
          hint: 'Revisit Class 6 Economics nodes on barter system (c6_economics_ch11_001) and evolution.',
          misconception: 'Students often believe accounting history is a linear progression of "better" techniques where each civilisation.',
          parts: [
                { id: 'a', prompt: 'A 14th century Italian merchant records a credit sale of 500 florins to a buyer in his daybook as "Sold goods to Giovanni, 500 florins." Using Pacioli\'s.', answer: 'Correct answer: Debit Giovanni (Debtor/Asset) 500 florins',
                  options: ['Correct answer: Debit Giovanni (Debtor/Asset) 500 florins', 'Giovanni owes 500', 'owed to proprietor', 'owed by proprietor'],
                  hint: 'Revisit Class 6 Economics nodes on barter system (c6_economics_ch11_001) and evolution of money.',
                  misconception: 'Students often believe accounting history is a linear progression of "better" techniques where each civilisation improved on the previous.' },
                { id: 'b', prompt: 'Compare Kautilya\'s Arthashastra prescriptions for government accounting (23 centuries ago) with the Egyptian treasury system described in your textbook.', answer: 'Correct answer: Similarities',
                  options: ['Correct answer: Similarities', 'better'],
                  hint: 'Revisit Class 6 Economics nodes on barter system (c6_economics_ch11_001) and evolution of money.',
                  misconception: 'Students often believe accounting history is a linear progression of "better" techniques where each civilisation improved on the previous.' }
          ],
            remediations: { 'accounting-history-is-a-linear': { steps: ['If a student shows this linear-progression misconception, use a three-step remediation: (1) Create a comparison table.', '(2) Ask: "Could Egyptian daily reporting to Wazirs work for a Venetian merchant with ships in Alexandria and.', 'Why or why not?" — forcing recognition of context-dependence.', '(3) Show how Pacioli\'s "Debit = owed to proprietor, Credit = owed by proprietor" works for both a state treasury and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_01_004', difficulty: 'standard',
          question: 'Users of accounting information are individuals or groups who rely on financial.',
          hint: 'Revisit node c11_acc_cbse_01_001 — specifically the AAA 1966 definition: "process.',
          misconception: 'Students consistently classify "Government" as a single external user with uniform needs, but NCERT distinguishes.',
          parts: [
                { id: 'a', prompt: 'Name any four internal users of accounting information as identified in the NCERT Class 11 textbook, and state the primary decision-making role of each.', answer: 'Correct answer: (1) Chief Executive Officer',
                  options: ['Correct answer: (1) Chief Executive Officer', 'shareholders', 'managers'],
                  hint: 'Revisit node c11_acc_cbse_01_001 — specifically the AAA 1966 definition: "process of identifying.',
                  misconception: 'Students consistently classify "Government" as a single external user with uniform needs, but NCERT distinguishes at least three distinct.' },
                { id: 'b', prompt: 'A student argues: "Customers are internal users because they interact with the business daily and need information about product availability." Explain why.', answer: 'Correct answer: Customers are external users',
                  options: ['Correct answer: Customers are external users', 'regular contact = internal user'],
                  hint: 'Revisit node c11_acc_cbse_01_001 — specifically the AAA 1966 definition: "process of identifying.',
                  misconception: 'Students consistently classify "Government" as a single external user with uniform needs, but NCERT distinguishes at least three distinct.' }
          ],
            remediations: { 'students-consistently-classify-government-as': { steps: ['If a student conflates government agencies, conduct this 3-step remediation: (1) Create a three-column table: Agency |.', '(2) Fill Row 1: Income Tax Department | Income Tax Act 1961 | Taxable profit, depreciation under IT Act, TDS compliance.', 'Row 2: Registrar of Companies | Companies Act 2013 | Financial statements in Schedule III format, auditor\'s report, AGM.', 'Row 3: GST Department | CGST Act 2017 | Output/input tax liability, ITC reconciliation, turnover for composition scheme.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_01_005', difficulty: 'standard',
          question: 'Qualitative characteristics are the attributes that make accounting information.',
          hint: 'If stuck, revisit c11_acc_cbse_01_001 (meaning of accounting) to recall the 4-step.',
          misconception: 'Students believe "comparability" means all companies must use identical accounting policies for all transactions.',
          parts: [
                { id: 'a', prompt: 'State the four qualitative characteristics of accounting information as per the NCERT Class 11 framework.', answer: 'The four qualitative characteristics are: (1) Reliability, (2) Relevance, (3)',
                  options: ['The four qualitative characteristics are: (1) Reliability, (2) Relevance, (3)', 'accuracy', 'completeness', 'materiality'],
                  hint: 'If stuck, revisit c11_acc_cbse_01_001 (meaning of accounting) to recall the 4-step process, and.',
                  misconception: 'Students believe "comparability" means all companies must use identical accounting policies for all transactions.' },
                { id: 'b', prompt: 'A company changes its depreciation method from straight-line to written-down value in the current year without disclosing the change or its effect on profit.', answer: 'Comparability is primarily violated',
                  options: ['Comparability is primarily violated', 'reliability', 'relevance', 'comparability'],
                  hint: 'If stuck, revisit c11_acc_cbse_01_001 (meaning of accounting) to recall the 4-step process, and.',
                  misconception: 'Students believe "comparability" means all companies must use identical accounting policies for all transactions.' },
                { id: 'c', prompt: 'XYZ Ltd. values its closing inventory at the higher of cost and net realisable value, as required by accounting standards.', answer: '(1) Reliability — specifically **faithfulness** (faithful representation) and',
                  options: ['(1) Reliability — specifically **faithfulness** (faithful representation) and', 'reliability', 'timely', 'comparability'],
                  hint: 'If stuck, revisit c11_acc_cbse_01_001 (meaning of accounting) to recall the 4-step process, and.',
                  misconception: 'Students believe "comparability" means all companies must use identical accounting policies for all transactions.' }
          ],
            remediations: { 'comparability-means-all-companies-must': { steps: ['Ask the student to write the NCERT definition of comparability verbatim: "To be comparable, accounting reports must.', 'Highlight "format of reporting" ≠ "accounting policies."', 'Give a mini-case: Two firms, one using straight-line depreciation, another using diminishing balance.', 'Contrast with *non-comparability*: same firm switches methods yearly without disclosure. That violates comparability.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_01_006', difficulty: 'standard',
          question: 'Accounting has evolved into three specialised branches—Financial Accounting.',
          hint: 'If stuck, revisit c11_acc_cbse_01_004 (Users of Accounting Information) and create.',
          misconception: 'Students often believe **Cost Accounting and Management Accounting are the same** because both serve internal.',
          parts: [
                { id: 'a', prompt: 'A factory manager asks the accountant: "What was the per-unit cost of the chairs we produced last month, and where did we overspend?" Which branch.', answer: 'Cost Accounting answers this',
                  options: ['Cost Accounting answers this', 'Management Accounting', 'What did it cost?', 'What should we do?'],
                  hint: 'If stuck, revisit c11_acc_cbse_01_004 (Users of Accounting Information) and create a two-column.',
                  misconception: 'Students often believe **Cost Accounting and Management Accounting are the same** because both serve internal management.' },
                { id: 'b', prompt: 'XYZ Ltd. is planning to launch a new product. The CEO needs a report showing projected sales, cash flows, manpower needs, and environmental impact for the next.', answer: 'Management Accounting prepares this report',
                  options: ['Management Accounting prepares this report', 'Financial Accounting with estimates', 'What did it cost?', 'What should we do?'],
                  hint: 'If stuck, revisit c11_acc_cbse_01_004 (Users of Accounting Information) and create a two-column.',
                  misconception: 'Students often believe **Cost Accounting and Management Accounting are the same** because both serve internal management.' },
                { id: 'c', prompt: 'Compare the three branches on these four dimensions: (a) Primary user group, (b) Time orientation, (c) Data nature, (d) Regulatory framework.', answer: '| Dimension | Financial Accounting | Cost Accounting | Management Accounting |',
                  options: ['| Dimension | Financial Accounting | Cost Accounting | Management Accounting |', 'future', 'What did it cost?', 'What should we do?'],
                  hint: 'If stuck, revisit c11_acc_cbse_01_004 (Users of Accounting Information) and create a two-column.',
                  misconception: 'Students often believe **Cost Accounting and Management Accounting are the same** because both serve internal management.' }
          ],
            remediations: { 'cost-accounting-and-management-accounting': { steps: ['If a student conflates Cost and Management Accounting: (1) Ask them to list the *output* of each: Cost Accounting →.', '(2) Give a specific transaction: "Factory rent ₹2 lakh paid." Ask: How does Cost Accounting treat it?', '(Allocate to products via overhead absorption rate).', 'How does Management Accounting use it?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
