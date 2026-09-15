import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ca_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ca_ch01_p1: SimDef = {
    id: 'v3_c12_ca_ch01_p1',
    title: 'OVERVIEW OF · Part 1/2',
    subtitle: 'One entry, every ledger updated — what a computerised accounting system really is',
    classLevel: 12, subject: 'computerised_accounting', topic: 'OVERVIEW OF · Part 1/2',
    chapters: ['c12_ca_ch01'],
    nodeIds: ['c12_ca_cbse_01_001', 'c12_ca_cbse_01_002', 'c12_ca_cbse_01_003', 'c12_ca_cbse_01_004', 'c12_ca_cbse_01_005', 'c12_ca_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Systems accountant', intro: 'Manual bookkeeping copies the same number into five books. A CAS writes it once and updates everything — here\'s how that magic actually works.', goal: 'Explain the five components of a computerised accounting system and trace how integrated processing replaces manual posting.' },
    discovery: {
        question: 'A kirana store owner buys Tally and declares, \'Our computerised accounting system is now installed.\' What\'s missing from that claim?',
        options: ['Software is only one of five components — a CAS also needs procedures, data, people and hardware working together', 'Nothing — buying accounting software IS installing a computerised accounting system', 'Only a faster printer is missing', 'The system isn\'t real until a CA certifies it'],
        answer: 'Software is only one of five components — a CAS also needs procedures, data, people and hardware working together',
        hook: 'Students write \'Tally is CAS\' and lose marks — the software is the visible tip. The system is five pillars, and it\'s the procedure-plus-people layer that turns one voucher entry into instant ledgers, trial balance and P&L.',
    },
    teaching: [
        { title: 'Computerised Accounting System', text: 'A Computerised Accounting System (CAS) is an integrated system that processes accounting transactions through computer hardware and accounting software to generate accounting records (journals.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ca_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Computerise a 200-transaction retail shop: trace one credit sale from voucher entry through every ledger and report it updates automatically, then design the account code structure that lets the system group accounts on its own.',
        labels: ['Computerised Accounting System', 'Components Of Cas', 'Salient Features Of Cas', 'Grouping Of Accounts', 'Using Software Of Cas', 'Advantages Of Cas'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_ca_cbse_01_001', title: 'Computerised Accounting System',
          caseStudy: { intro: 'Imagine you run a small retail shop with 200 daily transactions.',
            decisions: [{ prompt: 'List the five components of a Computerised Accounting System as per the NCERT framework.', options: [
                { text: 'The five components are: Procedure, Data, People, Hardware, and Software', outcome: 'The five components are: Procedure, Data, People, Hardware, and Software.' },
                { text: 'Ledger', outcome: 'Not quite — Students think CAS is just "accounting software like Tally" and miss that **CAS = Hardware.', reveals: 'cas-is-just-accounting-software' },
                { text: 'Trial Balance', outcome: 'Not quite — Students think CAS is just "accounting software like Tally" and miss that **CAS = Hardware.', reveals: 'cas-is-just-accounting-software' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ca_cbse_01_002', title: 'Components Of Cas',
          caseStudy: { intro: 'Imagine you run a small online store. A customer places an order and pays via UPI. Where does that ₹500 transaction live?',
            decisions: [{ prompt: 'List the five components of a Computerised Accounting System as per NCERT Class 12.', options: [
                { text: 'Correct answer: Procedure, Data, People, Hardware, Software', outcome: 'Correct answer: Procedure, Data, People, Hardware, Software. A wrong answer (e.g., listing.' },
                { text: 'Reports', outcome: 'Not quite — Students often treat "Software" and "Procedure" as the same thing because both involve "steps".', reveals: 'students-often-treat-software-and' },
                { text: 'Ledger', outcome: 'Not quite — Students often treat "Software" and "Procedure" as the same thing because both involve "steps".', reveals: 'students-often-treat-software-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ca_cbse_01_003', title: 'Salient Features Of Cas',
          caseStudy: { intro: 'Imagine you run a growing retail business in Mumbai with 500 daily transactions — sales, purchases, expenses, payroll.',
            decisions: [{ prompt: 'A student writes: "Simple and Integrated means the software is easy to use and has a simple interface." What specific NCERT-defined.', options: [
                { text: 'The answer misses the core NCERT requirement: "automate and integrate all business', outcome: 'The answer misses the core NCERT requirement: "automate and integrate all business operations such.' },
                { text: 'integrated with enhanced MIS, Multi-lingual and Data Organisation capabilities', outcome: 'Not quite — Students conflate "Advantages of CAS" (c12_ca_cbse_01_006) with "Salient Features of CAS" (this.', reveals: 'students-conflate-advantages-of-cas' },
                { text: 'simple', outcome: 'Not quite — Students conflate "Advantages of CAS" (c12_ca_cbse_01_006) with "Salient Features of CAS" (this.', reveals: 'students-conflate-advantages-of-cas' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ca_cbse_01_004', title: 'Grouping Of Accounts',
          caseStudy: { intro: 'Imagine you are the accountant for a growing Delhi-based startup that just received Series-A funding.',
            decisions: [{ prompt: 'State the four primary groups of accounts in the NCERT grouping hierarchy and give one example account for each group.', options: [
                { text: 'Correct answer: (1) Equity & Liabilities', outcome: 'Correct answer: (1) Equity & Liabilities — e.g., Share Capital; (2) Assets — e.g., Plant &.' },
                { text: 'Debtors', outcome: 'Not quite — Students often treat "Grouping of Accounts" and "Codification of Accounts" as two separate.', reveals: 'students-often-treat-grouping-of' },
                { text: 'Debtors" as a primary group', outcome: 'Not quite — Students often treat "Grouping of Accounts" and "Codification of Accounts" as two separate.', reveals: 'students-often-treat-grouping-of' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ca_cbse_01_005', title: 'Using Software Of Cas',
          caseStudy: { intro: 'Imagine you are hired as an intern at a small retail business that has just purchased accounting software.',
            decisions: [{ prompt: 'What are the two broad categories of activities performed when using CAS software, and give one example of each?', options: [
                { text: 'The two categories are one-time activities (e.g., creating organisation details,', outcome: 'The two categories are one-time activities (e.g., creating organisation details, accounting year.' },
                { text: 'installing software', outcome: 'Not quite — Students often believe that "using CAS software" means only learning which buttons to click.', reveals: 'using-cas-software-means-only' },
                { text: 'backup', outcome: 'Not quite — Students often believe that "using CAS software" means only learning which buttons to click.', reveals: 'using-cas-software-means-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ca_cbse_01_006', title: 'Advantages Of Cas',
          caseStudy: { intro: 'Imagine you run a small Delhi-based wholesale garment business.',
            decisions: [{ prompt: 'State the five advantages of Computerised Accounting System as per NCERT Class 12, in the exact order they appear in the textbook.', options: [
                { text: 'Correct answer: (1) Timely generation of reports and information in desired format, (2)', outcome: 'Correct answer: (1) Timely generation of reports and information in desired format, (2) Efficient.' },
                { text: 'accuracy', outcome: 'Not quite — Students treat “Advantages” (Section 1.6) and “Salient Features” (Section 1.3) as interchangeable.', reveals: 'students-treat-advantages-section-1' },
                { text: 'scalability', outcome: 'Not quite — Students treat “Advantages” (Section 1.6) and “Salient Features” (Section 1.3) as interchangeable.', reveals: 'students-treat-advantages-section-1' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ca_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A trader installs accounting software and proudly declares: \'We have a computerised accounting system now — the computer posts everything, so the staff don\'t even need to know debit and credit.\'',
            decisions: [{ prompt: 'Is the system complete, and is the debit/credit knowledge really redundant?', options: [
                { text: 'Neither — CAS is five components (procedure, data, people, hardware, software), and the software only automates posting: staff still choose voucher types and pass journal adjustments like depreciation, which need debit/credit logic.', outcome: 'Automation replaces the ledger-posting step, not accounting judgement — a wrong voucher choice propagates the error everywhere instantly.' },
                { text: 'Yes — the software is the system, and auto-posting means no human accounting knowledge is needed.', outcome: 'Software is one pillar of five; and every voucher type has hard-coded debit/credit logic the user must trigger correctly.', reveals: 'cas-is-just-software' },
                { text: 'Yes — since ledgers and trial balance update automatically, debit and credit have become obsolete concepts.', outcome: 'Rectification and year-end entries go through journal vouchers with no preset logic — debit/credit fluency is still required there.', reveals: 'automation-kills-debit-credit' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ca_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now explain why CAS is a system, not a download — and why one entry replaces the whole posting phase. Boards love the \'five components\' question; businesses live by it.',
            decisions: [{ prompt: 'What comes next? OVERVIEW OF · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — OVERVIEW OF · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ca_cbse_01_001', difficulty: 'standard',
          question: 'A Computerised Accounting System (CAS) is an integrated system that processes.',
          hint: 'Revisit Class 11 node c11_acc_cbse_03_010 (Posting from Journal to Ledger) and.',
          misconception: 'Students think CAS is just "accounting software like Tally" and miss that **CAS = Hardware + Software + People.',
          parts: [
                { id: 'a', prompt: 'List the five components of a Computerised Accounting System as per the NCERT framework.', answer: 'The five components are: Procedure, Data, People, Hardware, and Software',
                  options: ['The five components are: Procedure, Data, People, Hardware, and Software', 'Ledger', 'Trial Balance', 'Reports'],
                  hint: 'Revisit Class 11 node c11_acc_cbse_03_010 (Posting from Journal to Ledger) and c11_acc_cbse_06_001.',
                  misconception: 'Students think CAS is just "accounting software like Tally" and miss that **CAS = Hardware + Software + People + Procedure + Data** as.' },
                { id: 'b', prompt: 'Explain why "Data" and "Information" are not the same in CAS, using the example of "days worked × rate per day = amount to pay" from the textbook.', answer: 'Data are raw facts (days worked = 25, rate = ₹300/day)',
                  options: ['Data are raw facts (days worked = 25, rate = ₹300/day)', 'data and information are the same', 'information is just more data', 'accounting software like Tally'],
                  hint: 'Revisit Class 11 node c11_acc_cbse_03_010 (Posting from Journal to Ledger) and c11_acc_cbse_06_001.',
                  misconception: 'Students think CAS is just "accounting software like Tally" and miss that **CAS = Hardware + Software + People + Procedure + Data** as.' },
                { id: 'c', prompt: 'Compare the grouping of accounts in CAS (Assets = Liabilities + Capital + Revenues – Expenses) with the traditional accounting equation.', answer: 'Traditional equation: A = L + C',
                  options: ['Traditional equation: A = L + C', 'it\'s the same equation', 'accounting software like Tally'],
                  hint: 'Revisit Class 11 node c11_acc_cbse_03_010 (Posting from Journal to Ledger) and c11_acc_cbse_06_001.',
                  misconception: 'Students think CAS is just "accounting software like Tally" and miss that **CAS = Hardware + Software + People + Procedure + Data** as.' }
          ],
            remediations: { 'cas-is-just-accounting-software': { steps: ['If a student equates CAS with software only: (1) Show Figure 1.1 from NCERT — ask "What happens if you have Tally but.', '(2) Give a scenario: "Company buys Tally but doesn\'t define voucher types or user rights." Ask what fails.', '(3) Have them re-write the definition including all five components.', '(4) Re-test with Diagnostic Question 1 after 24 hours.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ca_cbse_01_002', difficulty: 'standard',
          question: 'A Computerised Accounting System (CAS) rests on five interdependent components.',
          hint: 'Revisit Class 11 nodes c11_acc_cbse_03_001 (Business Transactions and Source Documents).',
          misconception: 'Students often treat "Software" and "Procedure" as the same thing because both involve "steps".',
          parts: [
                { id: 'a', prompt: 'List the five components of a Computerised Accounting System as per NCERT Class 12.', answer: 'Correct answer: Procedure, Data, People, Hardware, Software',
                  options: ['Correct answer: Procedure, Data, People, Hardware, Software', 'Reports', 'Ledger', 'Trial Balance'],
                  hint: 'Revisit Class 11 nodes c11_acc_cbse_03_001 (Business Transactions and Source Documents) and.',
                  misconception: 'Students often treat "Software" and "Procedure" as the same thing because both involve "steps".' },
                { id: 'b', prompt: 'A retail shop uses Tally on a desktop. The accountant enters a credit sale of ₹12,000 to M/s Sharma Traders.', answer: 'the voucher entry screen, (',
                  options: ['the voucher entry screen, (', 'Procedure'],
                  hint: 'Revisit Class 11 nodes c11_acc_cbse_03_001 (Business Transactions and Source Documents) and.',
                  misconception: 'Students often treat "Software" and "Procedure" as the same thing because both involve "steps".' }
          ],
            remediations: { 'students-often-treat-software-and': { steps: ['If a student conflates Software and Procedure: 1.', 'Give a concrete counterexample: "GST rate changes from 18% to 12%.', 'Does the software code change?', 'Only if you update the tax master — that\'s a software *configuration*, not the procedure itself." 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ca_cbse_01_003', difficulty: 'standard',
          question: 'Salient Features of CAS are the five essential characteristics that define.',
          hint: 'Revisit c11_acc_cbse_03_001 through c11_acc_cbse_08_006 — specifically the manual posting.',
          misconception: 'Students conflate "Advantages of CAS" (c12_ca_cbse_01_006) with "Salient Features of CAS" (this node).',
          parts: [
                { id: 'a', prompt: 'In a manual system, a purchase invoice is entered in the Purchase Book, then posted to the supplier\'s ledger, then to the Purchase Ledger, then to the Control.', answer: 'This demonstrates "Simple and Integrated"',
                  options: ['This demonstrates "Simple and Integrated"', 'Accuracy and Speed'],
                  hint: 'Revisit c11_acc_cbse_03_001 through c11_acc_cbse_08_006 — specifically the manual posting process.',
                  misconception: 'Students conflate "Advantages of CAS" (c12_ca_cbse_01_006) with "Salient Features of CAS" (this node).' },
                { id: 'b', prompt: 'A mid-sized manufacturing firm using CAS experiences a sudden 300% order surge during festival season.', answer: 'The feature is Scalability',
                  options: ['The feature is Scalability', 'A wrong answer (e.g'],
                  hint: 'Revisit c11_acc_cbse_03_001 through c11_acc_cbse_08_006 — specifically the manual posting process.',
                  misconception: 'Students conflate "Advantages of CAS" (c12_ca_cbse_01_006) with "Salient Features of CAS" (this node).' }
          ],
            remediations: { 'students-conflate-advantages-of-cas': { steps: ['Have the student create a two-column table — left column: "Feature (NCERT 1.3)", right column: "Advantage (NCERT 1.6)".', 'For each of the 5 features, ask: "What specific advantage does this feature produce?" (e.g., Scalability → Economy.', 'Give a 3-mark board question: "Distinguish between Features and Advantages of CAS with two examples each."', 'Re-diagnose using Diagnostic Question 5 — if the student now includes "planning enablement" and "vital information.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ca_cbse_01_004', difficulty: 'standard',
          question: 'Grouping of Accounts is the systematic hierarchical classification of all.',
          hint: 'Revisit Class 11 node c11_acc_cbse_01_011 (Accounting Equation) and.',
          misconception: 'Students often treat "Grouping of Accounts" and "Codification of Accounts" as two separate, unrelated topics.',
          parts: [
                { id: 'a', prompt: 'State the four primary groups of accounts in the NCERT grouping hierarchy and give one example account for each group.', answer: 'Correct answer: (1) Equity & Liabilities',
                  options: ['Correct answer: (1) Equity & Liabilities', 'Debtors', 'Debtors" as a primary group'],
                  hint: 'Revisit Class 11 node c11_acc_cbse_01_011 (Accounting Equation) and c11_acc_cbse_08_007/008.',
                  misconception: 'Students often treat "Grouping of Accounts" and "Codification of Accounts" as two separate, unrelated topics.' }
          ],
            remediations: { 'students-often-treat-grouping-of': { steps: ['Have the student write the Accounting Equation (A = L + C + R – E) and circle the four terms.', 'Map each term to the NCERT primary group (1, 2, 3, 4).', 'Give 10 account names (e.g., Debtors, Creditors, Sales, Rent, Machinery, Capital) and ask the student to assign only.', 'Only after 100% accuracy on first digit, introduce second-digit sub-groups (11, 13, 14, 21, 23).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ca_cbse_01_005', difficulty: 'standard',
          question: 'Using Software of CAS refers to the operational procedures for running.',
          hint: 'Revisit Class 11 Accountancy nodes c11_acc_cbse_03_001 (source documents) and.',
          misconception: 'Students often believe that "using CAS software" means only learning which buttons to click in Tally or similar.',
          parts: [
                { id: 'a', prompt: 'What are the two broad categories of activities performed when using CAS software, and give one example of each?', answer: 'The two categories are one-time activities (e.g., creating organisation details,',
                  options: ['The two categories are one-time activities (e.g., creating organisation details,', 'installing software', 'backup', 'using CAS software'],
                  hint: 'Revisit Class 11 Accountancy nodes c11_acc_cbse_03_001 (source documents) and c11_acc_cbse_04_001.',
                  misconception: 'Students often believe that "using CAS software" means only learning which buttons to click in Tally or similar packages.' },
                { id: 'b', prompt: 'A student says: "In CAS, once I create the ledger masters, I can directly print the Balance Sheet without entering any vouchers." Explain why this statement.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'using CAS software'],
                  hint: 'Revisit Class 11 Accountancy nodes c11_acc_cbse_03_001 (source documents) and c11_acc_cbse_04_001.',
                  misconception: 'Students often believe that "using CAS software" means only learning which buttons to click in Tally or similar packages.' },
                { id: 'c', prompt: 'A business receives a cheque of ₹50,000 from a customer against a credit sale made last week.', answer: 'A Bank Receipt Voucher (or Bank Voucher) should be used',
                  options: ['A Bank Receipt Voucher (or Bank Voucher) should be used', 'using CAS software'],
                  hint: 'Revisit Class 11 Accountancy nodes c11_acc_cbse_03_001 (source documents) and c11_acc_cbse_04_001.',
                  misconception: 'Students often believe that "using CAS software" means only learning which buttons to click in Tally or similar packages.' }
          ],
            remediations: { 'using-cas-software-means-only': { steps: ['If the student cannot distinguish one-time vs recurring activities or picks wrong voucher types: (1) Revisit.', '(2) Revisit c11_acc_cbse_03_001 (Business Transactions and Source Documents) and c11_acc_cbse_03_007 (Journal) to match.', '(3) Do a paper exercise: list 10 transactions, write the source document, then map to CAS voucher type.', '(4) Re-attempt Diagnostic Question 3 and 6.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ca_cbse_01_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "using CAS software" means only learning which buttons to click in Tally or similar.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Password security in CAS is sufficient to ensure data integrity; Data Audit and Data Vault are unnecessary extras." Provide two.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'using CAS software'],
                  hint: 'Revisit Class 11 Accountancy nodes c11_acc_cbse_03_001 (source documents) and c11_acc_cbse_04_001.',
                  misconception: 'Students often believe that "using CAS software" means only learning which buttons to click in Tally or similar packages.' },
                { id: 'b', prompt: 'Design a one-time setup checklist for a new CAS implementation for a partnership firm starting on 1st July 2024.', answer: 'Checklist: (1) Organisation Master',
                  options: ['Checklist: (1) Organisation Master', 'using CAS software'],
                  hint: 'Revisit Class 11 Accountancy nodes c11_acc_cbse_03_001 (source documents) and c11_acc_cbse_04_001.',
                  misconception: 'Students often believe that "using CAS software" means only learning which buttons to click in Tally or similar packages.' }
          ],
            remediations: { 'using-cas-software-means-only': { steps: ['If the student cannot distinguish one-time vs recurring activities or picks wrong voucher types: (1) Revisit.', '(2) Revisit c11_acc_cbse_03_001 (Business Transactions and Source Documents) and c11_acc_cbse_03_007 (Journal) to match.', '(3) Do a paper exercise: list 10 transactions, write the source document, then map to CAS voucher type.', '(4) Re-attempt Diagnostic Question 3 and 6.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ca_cbse_01_006', difficulty: 'standard',
          question: 'Advantages of Computerised Accounting System (CAS) refer to the five core.',
          hint: 'Revisit Class 11 node c11_acc_cbse_08_001 (Financial Statements: Meaning and Objectives).',
          misconception: 'Students treat “Advantages” (Section 1.6) and “Salient Features” (Section 1.3) as interchangeable lists.',
          parts: [
                { id: 'a', prompt: 'A mid-sized firm processes 15,000 transactions/month. Under manual accounting, 4 clerks take 12 days to close monthly books at ₹18,000/month labour cost.', answer: 'Steps: (1) Manual cost = ₹18,000',
                  options: ['Steps: (1) Manual cost = ₹18,000', 'economy … of accounting *data*'],
                  hint: 'Revisit Class 11 node c11_acc_cbse_08_001 (Financial Statements: Meaning and Objectives) and trace.',
                  misconception: 'Students treat “Advantages” (Section 1.6) and “Salient Features” (Section 1.3) as interchangeable lists.' }
          ],
            remediations: { 'students-treat-advantages-section-1': { steps: ['Make two flashcards — Title: “Features (Sec 1.3)” vs “Advantages (Sec 1.6)”.', 'For each advantage, write the *one enabling feature* from 1.3/1.5 (e.g., Advantage “Confidentiality” ← Feature.', 'Re-attempt Diagnostic Questions 1, 2, 4. If any answer still mixes the lists, repeat Step 1 with colour-coding.', 'Ask a peer to quiz you using the exact board question wordings (Q4 vs Q11) until you auto-associate the correct list.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
