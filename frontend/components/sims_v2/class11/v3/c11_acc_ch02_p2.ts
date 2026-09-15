import type { SimDef } from '../../engine/types';

/** v3 generated — c11_acc_ch02_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_acc_ch02_p2: SimDef = {
    id: 'v3_c11_acc_ch02_p2',
    title: 'Theory Base of Accounting · Part 2/2',
    subtitle: 'Match real transactions to the concepts and conventions that govern them.',
    classLevel: 11, subject: 'accountancy', topic: 'Theory Base of Accounting · Part 2/2',
    chapters: ['c11_acc_ch02'],
    nodeIds: ['c11_acc_cbse_02_007', 'c11_acc_cbse_02_008', 'c11_acc_cbse_02_009', 'c11_acc_cbse_02_010', 'c11_acc_cbse_02_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an examiner checking whether a firm\'s accounts follow the rules of the game', intro: 'Every accountant plays by the same invisible rulebook. You\'re learning to spot when it\'s been bent.', goal: 'Apply accounting concepts (entity, money measurement, going concern, accrual, matching, conservatism) to real situations.' },
    discovery: {
        question: 'Two shopkeepers buy identical delivery scooters. One spreads the cost over five years; the other writes the whole thing off this year. Both claim their profit figure is \'correct\'. Who\'s right under accounting rules?',
        options: ['Both — but the first follows the matching concept, pairing cost with the years the scooter earns revenue', 'Only the second — expenses must be recorded when cash leaves', 'Only the first — the law forbids writing off assets in year one', 'Neither — scooters can never be treated as expenses'],
        answer: 'Both — but the first follows the matching concept, pairing cost with the years the scooter earns revenue',
        hook: 'Profit depends on which concept you apply — consistency is what keeps the numbers honest.',
    },
    teaching: [
        { title: 'Basic Accounting Concepts: Revenue Recognition and Matching Concept', text: 'Revenue Recognition Concept states that revenue is recognised when a legal right to receive it arises, i.e., when goods are sold or services are rendered, regardless of when cash is received.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_acc_cbse_02_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Stress-test a set of journal entries against GAAP concepts like matching, going concern and conservatism.',
        labels: ['Basic Accounting Concepts: Revenue', 'Basic Accounting Concepts: Full', 'Basic Accounting Concepts: Conservatism', 'Systems of Accounting: Cash', 'Accounting Standards: Need'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_acc_cbse_02_007', title: 'Basic Accounting Concepts: Revenue Recognition and Matching Concept',
          caseStudy: { intro: 'Imagine your uncle runs a furniture shop. He sold a sofa set on 28th March 2024 for ₹50,000 on credit, but the customer pays on 15th April 2024.',
            decisions: [{ prompt: 'State the exact point at which revenue is recognised for a credit sale of goods under the Revenue Recognition Concept.', options: [
                { text: 'Revenue is recognised when the goods are sold (i.e., ownership transfers to the buyer),', outcome: 'Revenue is recognised when the goods are sold (i.e., ownership transfers to the buyer), not when.' },
                { text: 'when cash is received', outcome: 'Not quite — Students often believe revenue is recognised only when cash is received and expenses only when cash.', reveals: 'revenue-is-recognised-only-when' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_02_008', title: 'Basic Accounting Concepts: Full Disclosure and Consistency',
          caseStudy: { intro: 'Imagine you are a bank manager reviewing a loan application from a company.',
            decisions: [{ prompt: 'Define the Full Disclosure Concept and state the legal requirement in India that enforces it for companies.', options: [
                { text: 'Correct answer: Full Disclosure Concept requires all material and relevant facts', outcome: 'Correct answer: Full Disclosure Concept requires all material and relevant facts concerning.' },
                { text: 'disclose everything', outcome: 'Not quite — Students often believe **Consistency means "never change accounting methods"** and **Full.', reveals: 'consistency-means-never-change-accounting' },
                { text: 'material and relevant', outcome: 'Not quite — Students often believe **Consistency means "never change accounting methods"** and **Full.', reveals: 'consistency-means-never-change-accounting' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_02_009', title: 'Basic Accounting Concepts: Conservatism and Materiality',
          caseStudy: { intro: 'Imagine you run a small bakery. At year-end, you have 50 unsold cakes costing ₹200 each, but due to a health scare, you can only sell them at ₹150 each.',
            decisions: [{ prompt: 'State the Conservatism Concept in one sentence and give one example of its application in inventory valuation.', options: [
                { text: 'Correct answer: Conservatism requires that anticipated losses be recognised immediately', outcome: 'Correct answer: Conservatism requires that anticipated losses be recognised immediately while.' },
                { text: 'conservatism means recording everything at the lowest possible value', outcome: 'Not quite — Students often think Conservatism means "always choose the lowest value" and Materiality means.', reveals: 'conservatism-means-always-choose-the' },
                { text: 'always choose the lowest value', outcome: 'Not quite — Students often think Conservatism means "always choose the lowest value" and Materiality means.', reveals: 'conservatism-means-always-choose-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_02_010', title: 'Systems of Accounting: Cash Basis vs Accrual Basis',
          caseStudy: { intro: 'Imagine you run a small online tutoring business in December. You taught 10 sessions at ₹2,000 each, but 3 students will pay you in January.',
            decisions: [{ prompt: 'State the fundamental difference between cash basis and accrual basis of accounting in one sentence.', options: [
                { text: 'Cash basis recognises transactions only when cash is received or paid, whereas accrual', outcome: 'Cash basis recognises transactions only when cash is received or paid, whereas accrual basis.' },
                { text: 'accrual basis means recording on credit', outcome: 'Not quite — Students often believe that "accrual basis means recording transactions when the invoice is raised.', reveals: 'accrual-basis-means-recording-transactions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_02_011', title: 'Accounting Standards: Need and Significance',
          caseStudy: { intro: 'Imagine two companies, A and B, both selling identical smartphones.',
            decisions: [{ prompt: 'What is the primary objective of Accounting Standards issued by ICAI?', options: [
                { text: 'The primary objective is to bring uniformity in accounting policies and practices to', outcome: 'The primary objective is to bring uniformity in accounting policies and practices to eliminate.' },
                { text: 'to replace the Companies Act', outcome: 'Not quite — Students often believe Accounting Standards are optional guidelines or "best practices" that.', reveals: 'accounting-standards-are-optional-guidelines' },
                { text: 'to calculate tax liability', outcome: 'Not quite — Students often believe Accounting Standards are optional guidelines or "best practices" that.', reveals: 'accounting-standards-are-optional-guidelines' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'During a school entrepreneurship project you must pick one of two neighbourhood juice carts to \'invest\' the club\'s ₹50,000 in. Cart A reports ₹80,000 profit — but counts only cash actually collected. Cart B reports ₹60,000 — counting all sales made, including ₹15,000 still owed by regulars. A teammate says: pick Cart A, the bigger profit wins.',
            decisions: [{ prompt: 'What is the right way to compare the two carts?', options: [
                { text: 'You cannot compare them yet — first restate both profits on the same basis (accrual, per GAAP). Cart A\'s cash-basis profit understates what it earned; only common rules make the numbers comparable.', outcome: 'GAAP exists precisely so that \'profit\' means the same thing for every business; comparisons across firms demand a shared framework, not the bigger raw number.' },
                { text: 'Pick Cart A — a business is free to keep books however it likes, and ₹80,000 is the better figure.', outcome: 'Without uniform principles each business speaks a private language; Cart A\'s cash-basis figure and Cart B\'s accrual figure answer different questions.', reveals: 'any-method-is-fine' },
                { text: 'Check which cart followed GAAP as laid down in the Companies Act — whichever broke the law is disqualified.', outcome: 'GAAP is not a statute; it is a professional framework of concepts, conventions and standards. Small carts are not \'illegal\' for lacking it — their figures are just not comparable.', reveals: 'gaap-is-a-law' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_02_011', title: 'You made it',
          caseStudy: { intro: 'Accounting concepts aren\'t decoration — they\'re the rules that make two different ledgers comparable.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_acc_cbse_02_007', difficulty: 'standard',
          question: 'Revenue Recognition Concept states that revenue is recognised when a legal.',
          hint: 'Revisit Accounting Period Concept (c11_acc_cbse_02_005) to understand the time boundary.',
          misconception: 'Students often believe revenue is recognised only when cash is received and expenses only when cash is paid (cash.',
          parts: [
                { id: 'a', prompt: 'Compare the treatment of revenue recognition for a construction contract (long-term) versus a normal sale of goods.', answer: 'For normal sales, revenue is recognised at point of sale',
                  options: ['For normal sales, revenue is recognised at point of sale', 'revenue is recognised only when the contract is fully completed'],
                  hint: 'Revisit Accounting Period Concept (c11_acc_cbse_02_005) to understand the time boundary, and Dual.',
                  misconception: 'Students often believe revenue is recognised only when cash is received and expenses only when cash is paid (cash basis).' }
          ],
            remediations: { 'revenue-is-recognised-only-when': { steps: ['Ask the student to list three transactions from a shop they visit (e.g., credit sale, advance rent, electricity bill).', 'For each, ask: "When did the economic activity happen?', 'Guide them to see that profit measurement requires recording the activity in the period it occurs, not when cash moves.', 'Use a T-account timeline to visually separate the accounting period from cash flow dates.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_02_008', difficulty: 'standard',
          question: 'The **Full Disclosure Concept** requires that all material and relevant.',
          hint: 'Revisit the "Users of Accounting Information" and "Qualitative Characteristics.',
          misconception: 'Students often believe **Consistency means "never change accounting methods"** and **Full Disclosure means "write.',
          parts: [
                { id: 'a', prompt: 'Define the Full Disclosure Concept and state the legal requirement in India that enforces it for companies.', answer: 'Correct answer: Full Disclosure Concept requires all material and relevant facts',
                  options: ['Correct answer: Full Disclosure Concept requires all material and relevant facts', 'disclose everything', 'material and relevant', 'never change accounting methods'],
                  hint: 'Revisit the "Users of Accounting Information" and "Qualitative Characteristics of Accounting.',
                  misconception: 'Students often believe **Consistency means "never change accounting methods"** and **Full Disclosure means "write everything in the main.' },
                { id: 'b', prompt: 'A company has valued closing stock at cost for five years. In the current year, it switches to "lower of cost or net realisable value" (NRV) without.', answer: 'Correct answer: The accountant is incorrect',
                  options: ['Correct answer: The accountant is incorrect', 'never change accounting methods', 'write everything in the main financial statements'],
                  hint: 'Revisit the "Users of Accounting Information" and "Qualitative Characteristics of Accounting.',
                  misconception: 'Students often believe **Consistency means "never change accounting methods"** and **Full Disclosure means "write everything in the main.' }
          ],
            remediations: { 'consistency-means-never-change-accounting': { steps: ['If the student holds the above misconception, do this 3-step remediation: 1.', '**Contrast "Prohibition" vs.', '"Disclosure":** Show the exact NCERT line: "Consistency does not prohibit change in accounting policies.', 'Necessary required changes are fully disclosed..." Have the student underline "does not prohibit" and "fully.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe **Consistency means "never change accounting methods"** and **Full Disclosure means "write.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "The Consistency Concept prohibits a company from ever changing its accounting policies." Provide a real-world scenario where a change.', answer: 'Correct answer: The statement is false',
                  options: ['Correct answer: The statement is false', 'consistency means never change', 'never change accounting methods', 'write everything in the main financial statements'],
                  hint: 'Revisit the "Users of Accounting Information" and "Qualitative Characteristics of Accounting.',
                  misconception: 'Students often believe **Consistency means "never change accounting methods"** and **Full Disclosure means "write everything in the main.' },
                { id: 'b', prompt: 'Create a short case (3-4 sentences) where a violation of BOTH Full Disclosure and Consistency occurs simultaneously.', answer: 'Expected answer: Case: "Alpha Ltd',
                  options: ['Expected answer: Case: "Alpha Ltd', 'never change accounting methods', 'write everything in the main financial statements'],
                  hint: 'Revisit the "Users of Accounting Information" and "Qualitative Characteristics of Accounting.',
                  misconception: 'Students often believe **Consistency means "never change accounting methods"** and **Full Disclosure means "write everything in the main.' }
          ],
            remediations: { 'consistency-means-never-change-accounting': { steps: ['If the student holds the above misconception, do this 3-step remediation: 1.', '**Contrast "Prohibition" vs.', '"Disclosure":** Show the exact NCERT line: "Consistency does not prohibit change in accounting policies.', 'Necessary required changes are fully disclosed..." Have the student underline "does not prohibit" and "fully.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_02_009', difficulty: 'standard',
          question: 'The **Conservatism (Prudence) Concept** requires that anticipated losses.',
          hint: 'Revisit c11_acc_cbse_02_001 (GAAP) to see how concepts fit into the hierarchy, and.',
          misconception: 'Students often think Conservatism means "always choose the lowest value" and Materiality means "anything under ₹5,000.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast Conservatism and Materiality: can they ever conflict? Give a concrete situation where applying one concept might seem to violate the other.', answer: 'Correct answer: They can appear to conflict',
                  options: ['Correct answer: They can appear to conflict', 'they never conflict', 'always choose the lowest value', 'anything under ₹5,000 can be ignored'],
                  hint: 'Revisit c11_acc_cbse_02_001 (GAAP) to see how concepts fit into the hierarchy, and.',
                  misconception: 'Students often think Conservatism means "always choose the lowest value" and Materiality means "anything under ₹5,000 can be ignored".' }
          ],
            remediations: { 'conservatism-means-always-choose-the': { steps: ['If a student exhibits this misconception: (1) Show the NCERT line: "deliberate attempt to underestimate the value.', '(3) Ask: "If we write down inventory below net realisable value, who benefits and who is harmed?" to reveal that.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_02_010', difficulty: 'standard',
          question: 'Cash basis of accounting records revenues only when cash is received and.',
          hint: 'Revisit c11_acc_cbse_02_007 (Revenue Recognition) and c11_acc_cbse_02_008 (Matching.',
          misconception: 'Students often believe that "accrual basis means recording transactions when the invoice is raised or bill.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Cash basis of accounting records revenues only when cash is received and expenses only',
                  options: ['Cash basis of accounting records revenues only when cash is received and expenses only', 'Generally Accepted Accounting Principles (GAAP) are the standardized rules, guidelines,', 'The Business Entity Concept states that a business is treated as a separate accounting', 'The Money Measurement Concept states that only those transactions and events'],
                  hint: 'Revisit c11_acc_cbse_02_007 (Revenue Recognition) and c11_acc_cbse_02_008 (Matching Concept).',
                  misconception: 'Students often believe that "accrual basis means recording transactions when the invoice is raised or bill is received." This is incorrect.' }
          ],
            remediations: { 'accrual-basis-means-recording-transactions': { steps: ['Ask the student: "If you eat at a restaurant on 31st March but pay by card on 2nd April, in which month did you incur.', 'Show a T-account for "Salary Expense" and "Outstanding Salary" – demonstrate that the expense is debited in March (when.', 'Give three transactions: (a) cash sale, (b) credit sale, (c) advance received for next month.', 'Have the student fill a table: "Revenue under Cash Basis" vs "Revenue under Accrual Basis" for the current month.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_02_011', difficulty: 'standard',
          question: 'Accounting Standards are authoritative written policy documents issued by the.',
          hint: 'Revisit node c11_acc_cbse_02_001 (GAAP) and c11_acc_cbse_02_002 to c11_acc_cbse_02_009.',
          misconception: 'Students often believe Accounting Standards are optional guidelines or "best practices" that companies can choose.',
          parts: [
                { id: 'a', prompt: 'A startup follows all Accounting Standards but chooses a valuation method for inventory that is permitted under AS-2 but not the one used by its competitor.', answer: 'The competitor is partially correct but misunderstands the standard',
                  options: ['The competitor is partially correct but misunderstands the standard', 'standards eliminate all alternatives', 'best practices'],
                  hint: 'Revisit node c11_acc_cbse_02_001 (GAAP) and c11_acc_cbse_02_002 to c11_acc_cbse_02_009 (Basic.',
                  misconception: 'Students often believe Accounting Standards are optional guidelines or "best practices" that companies can choose to follow.' },
                { id: 'b', prompt: 'Analyze the relationship between Accounting Standards and the Companies Act, 2013. Can an Accounting Standard override a provision of the Companies Act?', answer: 'No, Accounting Standards cannot override the Companies Act',
                  options: ['No, Accounting Standards cannot override the Companies Act', 'best practices'],
                  hint: 'Revisit node c11_acc_cbse_02_001 (GAAP) and c11_acc_cbse_02_002 to c11_acc_cbse_02_009 (Basic.',
                  misconception: 'Students often believe Accounting Standards are optional guidelines or "best practices" that companies can choose to follow.' }
          ],
            remediations: { 'accounting-standards-are-optional-guidelines': { steps: ['If a student thinks standards are optional, ask: "Can a listed company choose not to follow AS-1 (Disclosure.', 'If they think standards eliminate all alternatives, show them AS-2 paragraph 25: "The cost of inventories shall.', 'If they confuse AS with Ind AS, clarify: "Ind AS are for certain classes of companies (net worth ≥ ₹250 crore);.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
