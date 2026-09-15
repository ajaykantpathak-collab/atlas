import type { SimDef } from '../../engine/types';

/** v3 generated — c11_acc_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_acc_ch02_p1: SimDef = {
    id: 'v3_c11_acc_ch02_p1',
    title: 'Theory Base of Accounting · Part 1/2',
    subtitle: 'Match real transactions to the concepts and conventions that govern them.',
    classLevel: 11, subject: 'accountancy', topic: 'Theory Base of Accounting · Part 1/2',
    chapters: ['c11_acc_ch02'],
    nodeIds: ['c11_acc_cbse_02_001', 'c11_acc_cbse_02_002', 'c11_acc_cbse_02_003', 'c11_acc_cbse_02_004', 'c11_acc_cbse_02_005', 'c11_acc_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an examiner checking whether a firm\'s accounts follow the rules of the game', intro: 'Every accountant plays by the same invisible rulebook. You\'re learning to spot when it\'s been bent.', goal: 'Apply accounting concepts (entity, money measurement, going concern, accrual, matching, conservatism) to real situations.' },
    discovery: {
        question: 'Two shopkeepers buy identical delivery scooters. One spreads the cost over five years; the other writes the whole thing off this year. Both claim their profit figure is \'correct\'. Who\'s right under accounting rules?',
        options: ['Both — but the first follows the matching concept, pairing cost with the years the scooter earns revenue', 'Only the second — expenses must be recorded when cash leaves', 'Only the first — the law forbids writing off assets in year one', 'Neither — scooters can never be treated as expenses'],
        answer: 'Both — but the first follows the matching concept, pairing cost with the years the scooter earns revenue',
        hook: 'Profit depends on which concept you apply — consistency is what keeps the numbers honest.',
    },
    teaching: [
        { title: 'Generally Accepted Accounting Principles (GAAP): Need', text: 'Generally Accepted Accounting Principles (GAAP) are the standardized rules, guidelines, and procedures that govern the recording, measurement, and reporting of financial transactions to ensure.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_acc_cbse_02_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Stress-test a set of journal entries against GAAP concepts like matching, going concern and conservatism.',
        labels: ['Generally Accepted Accounting Principles', 'Basic Accounting Concepts: Business', 'Basic Accounting Concepts: Money', 'Basic Accounting Concepts: Going', 'Basic Accounting Concepts: Accounting', 'Basic Accounting Concepts: Cost'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_acc_cbse_02_001', title: 'Generally Accepted Accounting Principles (GAAP): Need',
          caseStudy: { intro: 'Imagine two Class 11 students, Arjun and Priya, start identical tuition businesses.',
            decisions: [{ prompt: 'What does GAAP stand for, and what is its primary purpose in accounting?', options: [
                { text: 'GAAP stands for Generally Accepted Accounting Principles', outcome: 'GAAP stands for Generally Accepted Accounting Principles. Its primary purpose is to bring.' },
                { text: 'GAAP is a law passed by Parliament', outcome: 'Not quite — Students think GAAP is a single written document (like a law) that lists all rules.', reveals: 'gaap-is-a-single-written' },
                { text: 'GAAP is only for big companies', outcome: 'Not quite — Students think GAAP is a single written document (like a law) that lists all rules.', reveals: 'gaap-is-a-single-written' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_02_002', title: 'Basic Accounting Concepts: Business Entity Concept',
          caseStudy: { intro: 'Imagine your uncle runs a small grocery shop from the ground floor of his house.',
            decisions: [{ prompt: 'State the Business Entity Concept in one sentence and explain why the owner\'s capital is shown as a liability on the business\'s Balance.', options: [
                { text: '**Correct Answer:** The Business Entity Concept states that a business is a separate', outcome: '**Correct Answer:** The Business Entity Concept states that a business is a separate accounting.' },
                { text: 'Debit Rent Expense (Business), Credit Cash', outcome: 'Not quite — **Misconception:** "The Business Entity Concept only applies to companies (LLP/Pvt Ltd) because.', reveals: 'misconception-the-business-entity-concept' },
                { text: 'it\'s his money anyway', outcome: 'Not quite — **Misconception:** "The Business Entity Concept only applies to companies (LLP/Pvt Ltd) because.', reveals: 'misconception-the-business-entity-concept' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_02_003', title: 'Basic Accounting Concepts: Money Measurement Concept',
          caseStudy: { intro: 'Imagine you are the accountant for a startup that owns a factory worth ₹2 crore, 50 skilled engineers, a loyal customer base of 10,000 people, and ₹50 lakh.',
            decisions: [{ prompt: 'State the Money Measurement Concept in your own words and give one example of a business transaction that would be recorded and one that.', options: [
                { text: 'Correct answer: The Money Measurement Concept states that only transactions expressible', outcome: 'Correct answer: The Money Measurement Concept states that only transactions expressible in monetary.' },
                { text: 'all business events are recorded', outcome: 'Not quite — Students believe the Money Measurement Concept means "money is the only thing that matters.', reveals: 'the-money-measurement-concept-means' },
                { text: 'employee skills are recorded at estimated value', outcome: 'Not quite — Students believe the Money Measurement Concept means "money is the only thing that matters.', reveals: 'the-money-measurement-concept-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_02_004', title: 'Basic Accounting Concepts: Going Concern Concept',
          caseStudy: { intro: 'Imagine you buy a delivery van for ₹8,00,000 for your online grocery business. The van will last 8 years.',
            decisions: [{ prompt: 'State the Going Concern Concept in your own words as you would write it in a Class 11 board exam answer (2-3 sentences maximum).', options: [
                { text: 'The Going Concern Concept assumes that a business enterprise will continue operating for', outcome: 'The Going Concern Concept assumes that a business enterprise will continue operating for the.' },
                { text: 'business will never close', outcome: 'Not quite — Students confuse "going concern" with "perpetual existence" — believing the concept means the.', reveals: 'students-confuse-going-concern-with' },
                { text: 'assets are valued at market price', outcome: 'Not quite — Students confuse "going concern" with "perpetual existence" — believing the concept means the.', reveals: 'students-confuse-going-concern-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_02_005', title: 'Basic Accounting Concepts: Accounting Period Concept',
          caseStudy: { intro: 'Imagine you run a small bakery in Delhi. You sell cakes daily, buy flour weekly, pay rent monthly, and repay a loan yearly.',
            decisions: [{ prompt: 'State the standard duration of an accounting period as per the Companies Act 2013 and Income Tax Act in India, and name the typical.', options: [
                { text: 'The standard duration is 12 months (one year)', outcome: 'The standard duration is 12 months (one year). The typical financial year in India runs from April.' },
                { text: 'calendar year January–December', outcome: 'Not quite — Students often believe the Accounting Period Concept *causes* the accrual basis of accounting,.', reveals: 'the-accounting-period-concept-causes' },
                { text: '6 months', outcome: 'Not quite — Students often believe the Accounting Period Concept *causes* the accrual basis of accounting,.', reveals: 'the-accounting-period-concept-causes' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_02_006', title: 'Basic Accounting Concepts: Cost Concept and Dual Aspect Concept',
          scaffold: { problem: 'M/s Sharma Traders purchased a second-hand printing machine for ₹2,50,000 on 1st April 2023.',
            steps: [
            { text: 'Identify the purchase price of the asset: ₹2,50,000 (historical cost base).' },
            { text: 'List all expenditures incurred to bring the asset to its present location and condition for intended use.' },
            { text: 'Identify expenditures that are NOT part of asset cost: technician training ₹8,000 is a revenue expense (staff.' },
            { text: 'Compute total recorded cost = Purchase price + Capital expenditures = ₹2,50,000 + ₹10,000 + ₹15,000 + ₹5,000 + ₹20,000.' },
            { text: 'Verify against Cost Concept: All included costs are objectively verifiable from invoices/receipts; excluded item.', faded: true, blankAnswer: 'The printing machine will be recorded at ₹3,00,000. The.' }
            ] } },
        { type: 'case', nodeId: 'c11_acc_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'During a school entrepreneurship project you must pick one of two neighbourhood juice carts to \'invest\' the club\'s ₹50,000 in. Cart A reports ₹80,000 profit — but counts only cash actually collected. Cart B reports ₹60,000 — counting all sales made, including ₹15,000 still owed by regulars. A teammate says: pick Cart A, the bigger profit wins.',
            decisions: [{ prompt: 'What is the right way to compare the two carts?', options: [
                { text: 'You cannot compare them yet — first restate both profits on the same basis (accrual, per GAAP). Cart A\'s cash-basis profit understates what it earned; only common rules make the numbers comparable.', outcome: 'GAAP exists precisely so that \'profit\' means the same thing for every business; comparisons across firms demand a shared framework, not the bigger raw number.' },
                { text: 'Pick Cart A — a business is free to keep books however it likes, and ₹80,000 is the better figure.', outcome: 'Without uniform principles each business speaks a private language; Cart A\'s cash-basis figure and Cart B\'s accrual figure answer different questions.', reveals: 'any-method-is-fine' },
                { text: 'Check which cart followed GAAP as laid down in the Companies Act — whichever broke the law is disqualified.', outcome: 'GAAP is not a statute; it is a professional framework of concepts, conventions and standards. Small carts are not \'illegal\' for lacking it — their figures are just not comparable.', reveals: 'gaap-is-a-law' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'Accounting concepts aren\'t decoration — they\'re the rules that make two different ledgers comparable.',
            decisions: [{ prompt: 'What comes next? Theory Base of Accounting · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Theory Base of Accounting · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_acc_cbse_02_001', difficulty: 'standard',
          question: 'Generally Accepted Accounting Principles (GAAP) are the standardized rules.',
          hint: 'Revisit the function of money as a measure of value (c6_economics_ch11_004) and the.',
          misconception: 'Students think GAAP is a single written document (like a law) that lists all rules.',
          parts: [
                { id: 'a', prompt: 'What does GAAP stand for, and what is its primary purpose in accounting?', answer: 'GAAP stands for Generally Accepted Accounting Principles',
                  options: ['GAAP stands for Generally Accepted Accounting Principles', 'GAAP is a law passed by Parliament', 'GAAP is only for big companies', 'GAAP is a single written document (like a law) that lists all rules'],
                  hint: 'Revisit the function of money as a measure of value (c6_economics_ch11_004) and the concept.',
                  misconception: 'Students think GAAP is a single written document (like a law) that lists all rules.' },
                { id: 'b', prompt: 'Why can\'t accounting information be reliable and comparable if each business follows its own accounting methods? Give a concrete example with numbers.', answer: 'Without common methods, the same economic event yields different numbers',
                  options: ['Without common methods, the same economic event yields different numbers', 'It\'s fine, users can adjust', 'GAAP is a single written document (like a law) that lists all rules'],
                  hint: 'Revisit the function of money as a measure of value (c6_economics_ch11_004) and the concept.',
                  misconception: 'Students think GAAP is a single written document (like a law) that lists all rules.' },
                { id: 'c', prompt: 'A startup founder says: "GAAP is outdated. My investors only care about cash in the bank.', answer: 'Bank statements show cash flows, not financial performance or position',
                  options: ['Bank statements show cash flows, not financial performance or position', 'Bank statements are enough for small business', 'GAAP is a single written document (like a law) that lists all rules'],
                  hint: 'Revisit the function of money as a measure of value (c6_economics_ch11_004) and the concept.',
                  misconception: 'Students think GAAP is a single written document (like a law) that lists all rules.' },
                { id: 'd', prompt: 'Compare the terms "principle," "concept," "convention," and "postulate" as used in GAAP. Why does NCERT say they are used interchangeably in practice?', answer: 'Technically: Principle = general rule for action',
                  options: ['Technically: Principle = general rule for action', 'They are completely different', 'GAAP is a single written document (like a law) that lists all rules'],
                  hint: 'Revisit the function of money as a measure of value (c6_economics_ch11_004) and the concept.',
                  misconception: 'Students think GAAP is a single written document (like a law) that lists all rules.' }
          ],
            remediations: { 'gaap-is-a-single-written': { steps: ['Ask the student to list three sources of GAAP (past customs, professional bodies, government regulations).', 'Show a timeline: 1494 Pacioli\'s double-entry → 1930s US SEC formation → 1977 ICAI formation → 2015 Ind-AS convergence.', 'Give two identical transactions (e.g., credit sale of ₹50,000) and ask: "If Firm A records revenue on cash receipt.', 'Have them write one sentence defining GAAP in their own words without using the word "rules."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think GAAP is a single written document (like a law) that lists all rules.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "GAAP is rigid and prevents innovation in accounting.', answer: 'Critique',
                  options: ['Critique', 'GAAP should be flexible for startups', 'GAAP is a single written document (like a law) that lists all rules'],
                  hint: 'Revisit the function of money as a measure of value (c6_economics_ch11_004) and the concept.',
                  misconception: 'Students think GAAP is a single written document (like a law) that lists all rules.' },
                { id: 'b', prompt: 'Create a real-world scenario where the absence of GAAP would mislead a specific user (banker, investor, tax authority, supplier).', answer: 'Scenario: A construction company signs a 3-year ₹30 crore contract',
                  options: ['Scenario: A construction company signs a 3-year ₹30 crore contract', 'GAAP is a single written document (like a law) that lists all rules'],
                  hint: 'Revisit the function of money as a measure of value (c6_economics_ch11_004) and the concept.',
                  misconception: 'Students think GAAP is a single written document (like a law) that lists all rules.' }
          ],
            remediations: { 'gaap-is-a-single-written': { steps: ['Ask the student to list three sources of GAAP (past customs, professional bodies, government regulations).', 'Show a timeline: 1494 Pacioli\'s double-entry → 1930s US SEC formation → 1977 ICAI formation → 2015 Ind-AS convergence.', 'Give two identical transactions (e.g., credit sale of ₹50,000) and ask: "If Firm A records revenue on cash receipt.', 'Have them write one sentence defining GAAP in their own words without using the word "rules."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_02_002', difficulty: 'standard',
          question: 'The Business Entity Concept states that a business is treated as a separate.',
          hint: 'If stuck, revisit the definition of "Accounting Entity" in GAAP (c11_acc_cbse_02_001) and.',
          misconception: '**Misconception:** "The Business Entity Concept only applies to companies (LLP/Pvt Ltd) because they are legally.',
          parts: [
                { id: 'a', prompt: 'Scenario: Riya starts a bakery. She invests ₹10,00,000 from her savings. She buys an oven for ₹4,00,000 (paid by cheque from business account).', answer: '**Correct Answer:** 1',
                  options: ['**Correct Answer:** 1', 'Debit Rent Expense (Business), Credit Cash', 'it\'s his money anyway'],
                  hint: 'If stuck, revisit the definition of "Accounting Entity" in GAAP (c11_acc_cbse_02_001) and the.',
                  misconception: '**Misconception:** "The Business Entity Concept only applies to companies (LLP/Pvt Ltd) because they are legally separate.' },
                { id: 'b', prompt: 'Compare the accounting treatment of a sole proprietor\'s personal car used 30% for business deliveries under the Business Entity Concept vs.', answer: '**Correct Answer:** Legal ownership: Car belongs to owner',
                  options: ['**Correct Answer:** Legal ownership: Car belongs to owner', 'Debit Rent Expense (Business), Credit Cash', 'it\'s his money anyway'],
                  hint: 'If stuck, revisit the definition of "Accounting Entity" in GAAP (c11_acc_cbse_02_001) and the.',
                  misconception: '**Misconception:** "The Business Entity Concept only applies to companies (LLP/Pvt Ltd) because they are legally separate.' }
          ],
            remediations: { 'misconception-the-business-entity-concept': { steps: ['**Step-by-Step Remediation:** 1.', '**Visual Separation:** Draw two distinct boxes on paper: "BUSINESS" and "OWNER".', 'Give each a name (e.g., "M/s Sharma Stores" vs "Mr.', '**Role-Play:** Ask the student to act as the *Business\'s Accountant*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_02_003', difficulty: 'standard',
          question: 'The Money Measurement Concept states that only those transactions and events.',
          hint: 'If stuck, revisit Class 6 Economics "Functions of Money: Medium, Measure, Store.',
          misconception: 'Students believe the Money Measurement Concept means "money is the only thing that matters in business" or "if it\'s.',
          parts: [
                { id: 'a', prompt: 'A business owns the following: (i) Land 5 acres purchased at ₹50 lakh, (ii) 20 experienced workers, (iii) Brand reputation built over 10 years, (iv) Bank.', answer: 'Correct answer: Items (i), (iv), and (v) appear',
                  options: ['Correct answer: Items (i), (iv), and (v) appear', 'money is the only thing that matters in business'],
                  hint: 'If stuck, revisit Class 6 Economics "Functions of Money: Medium, Measure, Store, Standard".',
                  misconception: 'Students believe the Money Measurement Concept means "money is the only thing that matters in business" or "if it\'s valuable, we must find.' },
                { id: 'b', prompt: 'A company purchased a building in 2010 for ₹2 crore. In 2024, its market value is ₹10 crore.', answer: 'Correct answer: The error is revaluing the building to current market value',
                  options: ['Correct answer: The error is revaluing the building to current market value', 'this is correct because it shows true value', 'money is the only thing that matters in business'],
                  hint: 'If stuck, revisit Class 6 Economics "Functions of Money: Medium, Measure, Store, Standard".',
                  misconception: 'Students believe the Money Measurement Concept means "money is the only thing that matters in business" or "if it\'s valuable, we must find.' }
          ],
            remediations: { 'the-money-measurement-concept-means': { steps: ['Ask the student to list 5 things a business owns that have no purchase invoice (e.g., employee morale, customer.', 'For each, ask: "What document proves its rupee value?" When they cannot produce one, state: "Without a verifiable.', 'Show the NCERT example (factory land 2 acres, 30 computers, etc.) and demonstrate how money converts heterogeneous.', 'Clarify: The concept doesn\'t say non-monetary items are unimportant; it says accounting *cannot objectively measure.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_02_004', difficulty: 'standard',
          question: 'The Going Concern Concept assumes that a business entity will continue its.',
          hint: 'Revisit Business Entity Concept (c11_acc_cbse_02_002) — focus on the separation between.',
          misconception: 'Students confuse "going concern" with "perpetual existence" — believing the concept means the business will never end.',
          parts: [
                { id: 'a', prompt: 'A student argues: "If a company is making losses for three consecutive years, the going concern concept no longer applies and we should value assets.', answer: 'The going concern concept applies unless there is evidence the entity will cease',
                  options: ['The going concern concept applies unless there is evidence the entity will cease', 'going concern', 'perpetual existence'],
                  hint: 'Revisit Business Entity Concept (c11_acc_cbse_02_002) — focus on the separation between owner and.',
                  misconception: 'Students confuse "going concern" with "perpetual existence" — believing the concept means the business will never end.' },
                { id: 'b', prompt: 'A firm purchases machinery for ₹12,00,000 on 1st April 2023. The machinery has an estimated useful life of 6 years and zero residual value.', answer: 'Depreciation = ₹12,00,000 / 6 = ₹2,00,000 for 2023-24',
                  options: ['Depreciation = ₹12,00,000 / 6 = ₹2,00,000 for 2023-24', 'going concern', 'perpetual existence'],
                  hint: 'Revisit Business Entity Concept (c11_acc_cbse_02_002) — focus on the separation between owner and.',
                  misconception: 'Students confuse "going concern" with "perpetual existence" — believing the concept means the business will never end.' }
          ],
            remediations: { 'students-confuse-going-concern-with': { steps: ['Ask the student to define "foreseeable future" in accounting terms (12 months from balance sheet date per Ind AS 1).', 'Present two cases — a loss-making startup with committed investor funding vs.', 'Explicitly contrast "historical cost + depreciation" (going concern) vs.', 'Require the student to write a 3-sentence board-style definition emphasizing "foreseeable future," "no.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_02_005', difficulty: 'standard',
          question: 'The Accounting Period Concept states that the indefinite life of a business.',
          hint: 'Revisit the Going Concern Concept (c11_acc_cbse_02_004) — specifically the computer.',
          misconception: 'Students often believe the Accounting Period Concept *causes* the accrual basis of accounting, or that the two are the.',
          parts: [
                { id: 'a', prompt: 'State the standard duration of an accounting period as per the Companies Act 2013 and Income Tax Act in India, and name the typical financial year period.', answer: 'The standard duration is 12 months (one year)',
                  options: ['The standard duration is 12 months (one year)', 'calendar year January–December', '6 months'],
                  hint: 'Revisit the Going Concern Concept (c11_acc_cbse_02_004) — specifically the computer depreciation.',
                  misconception: 'Students often believe the Accounting Period Concept *causes* the accrual basis of accounting, or that the two are the same thing.' }
          ],
            remediations: { 'the-accounting-period-concept-causes': { steps: ['If the student confuses Accounting Period with Accrual Basis: (1) Draw a timeline on paper: mark "Business Start" and.', 'Accrual Basis (follow the economic event).', '(5) Show that Matching *only works* with Accrual Basis.', '(6) Conclude: Accounting Period = the time slices; Accrual Basis = the rule for filling those slices.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_02_006', difficulty: 'standard',
          question: 'The Cost Concept requires assets to be recorded at their historical acquisition.',
          hint: 'Revisit the Balance Model of Equations (c6_math_ch05_059) to internalize how equality.',
          misconception: 'Students often believe the Cost Concept means "we never change the recorded value of an asset" and that Dual Aspect.',
          parts: [
                { id: 'a', prompt: 'A student argues: "If I buy machinery for ₹5,00,000 and its market value rises to ₹6,00,000 after a year, I should record it at ₹6,00,000 because that\'s what.', answer: 'The Cost Concept requires recording at historical cost (₹5,00,000)',
                  options: ['The Cost Concept requires recording at historical cost (₹5,00,000)', 'It violates Conservatism', 'It ensures comparability', 'we never change the recorded value of an asset'],
                  hint: 'Revisit the Balance Model of Equations (c6_math_ch05_059) to internalize how equality is preserved.',
                  misconception: 'Students often believe the Cost Concept means "we never change the recorded value of an asset" and that Dual Aspect means "every.' },
                { id: 'b', prompt: 'A firm purchases a computer for ₹60,000, pays ₹2,000 freight, ₹3,000 installation, and ₹1,000 for software pre-installed (essential for operation).', answer: 'Recorded cost = ₹60,000 + ₹2,000 + ₹3,000 + ₹1,000 = ₹66,000',
                  options: ['Recorded cost = ₹60,000 + ₹2,000 + ₹3,000 + ₹1,000 = ₹66,000', 'we never change the recorded value of an asset', 'every transaction touches exactly two accounts'],
                  hint: 'Revisit the Balance Model of Equations (c6_math_ch05_059) to internalize how equality is preserved.',
                  misconception: 'Students often believe the Cost Concept means "we never change the recorded value of an asset" and that Dual Aspect means "every.' },
                { id: 'c', prompt: 'Transaction: "Started business with cash ₹10,00,000 and building ₹20,00,000." Show the dual effect on the accounting equation.', answer: 'Step 1: Assets (Cash ₹10L + Building ₹20L) = ₹30L',
                  options: ['Step 1: Assets (Cash ₹10L + Building ₹20L) = ₹30L', 'we never change the recorded value of an asset', 'every transaction touches exactly two accounts'],
                  hint: 'Revisit the Balance Model of Equations (c6_math_ch05_059) to internalize how equality is preserved.',
                  misconception: 'Students often believe the Cost Concept means "we never change the recorded value of an asset" and that Dual Aspect means "every.' }
          ],
            remediations: { 'the-cost-concept-means-we': { steps: ['If the student exhibits this misconception: (1) Show a compound journal entry (e.g., purchase machine ₹1,00,000: pay.', '(2) Contrast "initial measurement" (Cost Concept) with "subsequent measurement" (depreciation) using a timeline: Year 0.', 'Emphasize: Cost Concept fixes the starting point, not the ending point.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
