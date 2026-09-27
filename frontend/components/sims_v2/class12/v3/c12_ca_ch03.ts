import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ca_ch03 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ca_ch03: SimDef = {
    id: 'v3_c12_ca_ch03',
    title: 'OVERVIEW OF',
    subtitle: '₹25,000 basic, 3 days absent — so why did the sheet pay full DA?',
    classLevel: 12, subject: 'computerised_accounting', topic: 'OVERVIEW OF',
    chapters: ['c12_ca_ch03'],
    nodeIds: ['c12_ca_cbse_03_001', 'c12_ca_cbse_03_002', 'c12_ca_cbse_03_003', 'c12_ca_cbse_03_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Payroll accountant', intro: 'Every salary slip is a chain of formulas — earnings up, deductions down, net pay out. Build the chain and it\'ll run forever.', goal: 'Design a payroll spreadsheet using BPE logic, nested IFs and absolute referencing.' },
    discovery: {
        question: 'An employee on ₹25,000 basic pay is absent 3 days. The payroll sheet still pays DA, HRA and PF on the full ₹25,000. What did the designer confuse?',
        options: ['Basic Pay with Basic Pay Earned — earnings and deductions must run on BP × days present / days in month, not the contractual figure', 'DA with HRA — they\'re the same allowance anyway', 'Nothing — allowances are always on full basic pay', 'PF with TDS — the wrong deduction column was used'],
        answer: 'Basic Pay with Basic Pay Earned — earnings and deductions must run on BP × days present / days in month, not the contractual figure',
        hook: 'BP is the contract; BPE is what was actually earned. Every downstream formula — DA, HRA, PF — hangs off BPE, so one wrong column reference overpays everyone with absences and quietly breaks the books.',
    },
    teaching: [
        { title: 'Payroll Accounting', text: 'Payroll Accounting is the systematic process of computing an employee\'s gross earnings (Basic Pay Earned, Dearness Allowance, House Rent Allowance, Transport Allowance) and statutory/voluntary.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ca_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Design a payroll template for a 10-person startup: columns from attendance to net salary, nested IFs for supervisor vs non-supervisor rates, absolute-referenced rate cells — then verify three payslips by hand.',
        labels: ['Payroll Accounting', 'Asset Accounting', 'Loan Repayment Schedule'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_ca_cbse_03_001', title: 'Payroll Accounting',
          scaffold: { problem: 'M/s ABC Ltd has 3 employees for March 2024 (31 days). Employee E001 (Supervisor): BP ₹40,000, LWP 1 day, Unauthorised Absence 0.',
            steps: [
            { text: 'Calculate NOEDP for each: E001: 31-1-0=30; E002: 31-0-2=29; E003: 31-3-1=27.' },
            { text: 'Calculate BPE = BP × NOEDP/31: E001: 40000×30/31=₹38,709.68; E002: 25000×29/31=₹23,387.10; E003: 15000×27/31=₹13,064.52.' },
            { text: 'Calculate DA = BPE × 42%: E001: 38709.68×0.42=₹16,258.06; E002: 23387.10×0.42=₹9,822.58; E003: 13064.52×0.42=₹5,487.10.' },
            { text: 'Calculate HRA using type-based rates: E001 (Sup): 38709.68×40%=₹15,483.87; E002 (Clerk): 23387.10×25%=₹5,846.77; E003.' },
            { text: 'TRA from type: E001 ₹2000, E002 ₹800, E003 ₹0.' },
            { text: 'Gross Salary (TE) = BPE+DA+HRA+TRA: E001: 38709.68+16258.06+15483.87+2000=₹72,451.61; E002.' },
            { text: 'PF = BPE × 12%: E001: 38709.68×0.12=₹4,645.16; E002: 23387.10×0.12=₹2,806.45; E003: 13064.52×0.12=₹1,567.74.' },
            { text: 'Total Deductions = PF+TDS+Loan: E001: 4645.16+5000+3000=₹12,645.16; E002: 2806.45+2000+0=₹4,806.45; E003.' },
            { text: 'Net Salary = TE - TD: E001: 72451.61-12645.16=₹59,806.45; E002: 39856.45-4806.45=₹35,050.00; E003.', faded: true, blankAnswer: 'E001 Net Salary ₹59,806.45; E002 Net Salary ₹35,050.00.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_ca_cbse_03_002', title: 'Asset Accounting',
          scaffold: { problem: 'M/s Precision Tools purchased a CNC Lathe on 20-July-2023 for ₹12,00,000.',
            steps: [
            { text: 'Calculate Acquisition Cost = Purchase Price + Transportation + Installation + Pre-operative = 12,00,000 + 40,000.' },
            { text: 'Calculate Depreciable Amount = Acquisition Cost - Salvage Value = 13,25,000 - 1,25,000 = ₹12,00,000.' },
            { text: 'Calculate Annual SLM Depreciation = Depreciable Amount / Useful Life = 12,00,000 / 10 = ₹1,20,000 per year.' },
            { text: 'Determine months of usage in FY 2023-24: Installed 20-Jul-2023 to 31-Mar-2024 = 8.5 months (Jul, Aug, Sep, Oct, Nov.' },
            { text: 'Compute Pro-rata Depreciation = Annual Depreciation × (Months Used / 12) = 1,20,000 × (9/12) = ₹90,000.', faded: true, blankAnswer: '₹90,000 depreciation for FY 2023-24.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_ca_cbse_03_003', title: 'Loan Repayment Schedule',
          scaffold: { problem: 'Ravi takes a loan of ₹3,00,000 from a bank at 9% annual interest for 4 years.',
            steps: [
            { text: 'Identify given values: Principal (PV) = ₹3,00,000, Annual Rate = 9% = 0.09, Tenure = 4 years.' },
            { text: 'Convert to monthly basis: Monthly Rate = 0.09/12 = 0.0075, Total Months (Nper) = 4 × 12 = 48.' },
            { text: 'Apply PMT with cash-flow sign convention: PV is negative (loan received), FV = 0, Type = 0 (end of month).' },
            { text: 'Compute: PMT = ₹7,465.49 (approx). This is the fixed monthly payment.' },
            { text: 'Verify: Total paid = 7,465.49 × 48 = ₹3,58,343.52. Total interest = ₹58,343.52.', faded: true, blankAnswer: '₹7,465.49 per month' }
            ] } },
        { type: 'case', nodeId: 'c12_ca_cbse_03_004', title: 'Statutory compliance in computerised.',
          caseStudy: { intro: '1. Record a sale of ₹10,000 with 18% GST — the software splits it into revenue ₹10,000 + GST payable ₹1,800 automatically. 2.',
            decisions: [{ prompt: 'A sale of ₹10,000 at 18% GST is recorded — what does the software do automatically?', options: [
                { text: 'Splits the entry into revenue ₹10,000 and GST payable ₹1,800, and tags it for the GST', outcome: 'Splits the entry into revenue ₹10,000 and GST payable ₹1,800, and tags it for the GST returns.' },
                { text: 'compliance reporting is a separate manual task done at year-end', outcome: 'Not quite — Students think compliance reporting is a separate manual task done at year-end.', reveals: 'compliance-reporting-is-a-separate' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ca_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Processing March payroll, a junior accountant computes DA, HRA and PF directly on contractual Basic Pay for an employee who had 4 leave-without-pay days. The numbers look neat and she submits the sheet.',
            decisions: [{ prompt: 'Where did the computation go wrong?', options: [
                { text: 'The allowances and PF must ride on Basic Pay Earned — BP × effective days present ÷ days in month — not on full contractual BP; using BP overstates every earning and deduction for absent days.', outcome: 'BP is the contract, BPE is what was actually earned that month — the whole payroll chain keys off BPE.' },
                { text: 'Nothing — Basic Pay is Basic Pay; days absent are handled separately, not inside salary formulas.', outcome: 'BPE exists precisely to fold attendance into pay; skipping it overpays DA, HRA and deducts excess PF for days never worked.', reveals: 'bp-equals-bpe' },
                { text: 'Nothing — and if a supervisor\'s HRA shows zero, the IF formula itself must be broken.', outcome: 'A zero HRA more often means the type cell reads \'Sup \' or \'sup\' — text matching is exact, so data entry, not the formula, is the culprit.', reveals: 'formula-blamed-for-typo' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ca_cbse_03_004', title: 'You made it',
          caseStudy: { intro: 'You\'ve built the spreadsheet every salary slip in the country is secretly running on. Attendance-to-net-pay logic is a guaranteed practical — and a real job skill.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ca_cbse_03_001', difficulty: 'standard',
          question: 'Payroll Accounting is the systematic process of computing an employee\'s gross.',
          hint: 'Revisit Class 8 Math percentage applications (c8_math_ch8_4) and Class 11 spreadsheet.',
          misconception: 'Students believe that "Basic Pay" (BP) and "Basic Pay Earned" (BPE) are the same and use BP directly in DA, HRA, and.',
          parts: [
                { id: 'a', prompt: 'What is the formula for Basic Pay Earned (BPE) in terms of Basic Pay (BP), Number of Effective Days Present (NOEDP), and Number of Days in Month (NODM)?', answer: 'BPE = BP × NOEDP / NODM',
                  options: ['BPE = BP × NOEDP / NODM', 'Basic Pay', 'Basic Pay Earned'],
                  hint: 'Revisit Class 8 Math percentage applications (c8_math_ch8_4) and Class 11 spreadsheet functions.',
                  misconception: 'Students believe that "Basic Pay" (BP) and "Basic Pay Earned" (BPE) are the same and use BP directly in DA, HRA, and PF formulas.' },
                { id: 'b', prompt: 'An employee has Basic Pay ₹25,000, NODM = 30, LWP = 2 days, Unauthorised Absence = 1 day.', answer: 'Step 1: NOEDP = 30 - 2 - 1 = 27',
                  options: ['Step 1: NOEDP = 30 - 2 - 1 = 27', 'Basic Pay', 'Basic Pay Earned'],
                  hint: 'Revisit Class 8 Math percentage applications (c8_math_ch8_4) and Class 11 spreadsheet functions.',
                  misconception: 'Students believe that "Basic Pay" (BP) and "Basic Pay Earned" (BPE) are the same and use BP directly in DA, HRA, and PF formulas.' },
                { id: 'c', prompt: 'Compare the HRA calculation for a Supervisory employee (HRA = 40% of BPE) and a Non-supervisory employee (HRA = 30% of BPE) in the nested IF formula.', answer: 'The formula returns 0',
                  options: ['The formula returns 0', 'Basic Pay', 'Basic Pay Earned'],
                  hint: 'Revisit Class 8 Math percentage applications (c8_math_ch8_4) and Class 11 spreadsheet functions.',
                  misconception: 'Students believe that "Basic Pay" (BP) and "Basic Pay Earned" (BPE) are the same and use BP directly in DA, HRA, and PF formulas.' }
          ],
            remediations: { 'basic-pay-bp-and-basic': { steps: ['If a student uses BP instead of BPE in DA/HRA/PF formulas: (1) Have them manually calculate for an employee with 5 LWP.', '(2) Point to the spreadsheet column headers: "Column E = BP (contractual), Column G = BPE (earned after attendance)".', '(3) Make them rewrite the DA formula as =G12*$G$4 and say aloud "DA is on earned pay, not contract pay".', '(4) Give a re-diagnostic: "Employee BP ₹30,000, NODM=31, LWP=3, DA=40%.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ca_cbse_03_002', difficulty: 'standard',
          question: 'Asset Accounting in computerised accounting refers to the systematic process.',
          hint: 'If stuck on the DB function\'s Period argument, revisit Class 11 node c11_acc_cbse_07_005.',
          misconception: 'Students believe the DB function\'s \'Period\' argument (column J in Figure 3.7) is simply the current year number (1, 2.',
          parts: [
                { id: 'a', prompt: 'A machine was purchased on 15-Oct-2022 for ₹8,00,000 with ₹50,000 installation. Salvage value is ₹50,000, useful life 8 years.', answer: 'Step 1: Acquisition Cost = 8,00,000 + 50,000 = ₹8,50,000',
                  options: ['Step 1: Acquisition Cost = 8,00,000 + 50,000 = ₹8,50,000', 'the DB function\'s \'Period\' argument (column J in Figure 3'],
                  hint: 'If stuck on the DB function\'s Period argument, revisit Class 11 node c11_acc_cbse_07_005 (WDV.',
                  misconception: 'Students believe the DB function\'s \'Period\' argument (column J in Figure 3.7) is simply the current year number (1, 2, 3...).' },
                { id: 'b', prompt: 'Compare the depreciation expense pattern over 5 years for an asset costing ₹10,00,000 (salvage ₹1,00,000, life 5 years) under SLM vs WDV.', answer: 'SLM: ₹1,80,000 each year (constant)',
                  options: ['SLM: ₹1,80,000 each year (constant)', 'the DB function\'s \'Period\' argument (column J in Figure 3'],
                  hint: 'If stuck on the DB function\'s Period argument, revisit Class 11 node c11_acc_cbse_07_005 (WDV.',
                  misconception: 'Students believe the DB function\'s \'Period\' argument (column J in Figure 3.7) is simply the current year number (1, 2, 3...).' }
          ],
            remediations: { 'the-db-function-s-period': { steps: ['Revisit Class 11 Depreciation nodes c11_acc_cbse_07_004 (SLM) and c11_acc_cbse_07_005 (WDV) — manually compute 3-year.', 'Open the NCERT Figure 3.7 spreadsheet logic — trace the \'Period\' column formula cell-by-cell for an asset installed.', 'Re-do Diagnostic Question 3 with two assets: one installed 10-Feb, one 10-Jun — verify the Period column auto-adjusts.', 'Build a mini-spreadsheet with 5 assets, mixed install dates, and confirm the DB function output matches your manual WDV.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ca_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the DB function\'s \'Period\' argument (column J in Figure 3.7) is simply the current year number (1, 2.',
          parts: [
                { id: 'a', prompt: 'A company\'s fixed asset schedule shows: Opening Gross Block ₹50,00,000, Additions ₹12,00,000, Deductions ₹3,00,000.', answer: 'Closing Gross Block = 50,00,000 + 12,00,000 - 3,00,000 = ₹59,00,000',
                  options: ['Closing Gross Block = 50,00,000 + 12,00,000 - 3,00,000 = ₹59,00,000', 'the DB function\'s \'Period\' argument (column J in Figure 3'],
                  hint: 'If stuck on the DB function\'s Period argument, revisit Class 11 node c11_acc_cbse_07_005 (WDV.',
                  misconception: 'Students believe the DB function\'s \'Period\' argument (column J in Figure 3.7) is simply the current year number (1, 2, 3...).' }
          ],
            remediations: { 'the-db-function-s-period': { steps: ['Revisit Class 11 Depreciation nodes c11_acc_cbse_07_004 (SLM) and c11_acc_cbse_07_005 (WDV) — manually compute 3-year.', 'Open the NCERT Figure 3.7 spreadsheet logic — trace the \'Period\' column formula cell-by-cell for an asset installed.', 'Re-do Diagnostic Question 3 with two assets: one installed 10-Feb, one 10-Jun — verify the Period column auto-adjusts.', 'Build a mini-spreadsheet with 5 assets, mixed install dates, and confirm the DB function output matches your manual WDV.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ca_cbse_03_003', difficulty: 'standard',
          question: 'A loan repayment schedule is a structured plan that breaks down a borrowed.',
          hint: 'If stuck, revisit the simple interest formula (c8_math_ch8_9) and practice calculating.',
          misconception: 'Students frequently use the annual interest rate directly with monthly periods (e.g., `=PMT(10%, 24, -100000)`).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A loan repayment schedule is a structured plan that breaks down a borrowed principal',
                  options: ['A loan repayment schedule is a structured plan that breaks down a borrowed principal', 'Payroll Accounting is the systematic process of computing an employee\'s gross earnings', 'Asset Accounting in computerised accounting refers to the systematic process of', 'Statutory compliance in computerised accounting refers to the system\'s built-in handling'],
                  hint: 'If stuck, revisit the simple interest formula (c8_math_ch8_9) and practice calculating interest for.',
                  misconception: 'Students frequently use the annual interest rate directly with monthly periods (e.g., `=PMT(10%, 24, -100000)`), forgetting to divide the.' }
          ],
            remediations: { 'students-frequently-use-the-annual': { steps: ['Revisit the concept of periodic vs annual interest rate using node c8_math_ch8_9 (Simple Interest) to reinforce that.', 'Practice the cash-flow sign convention: draw a simple timeline showing loan received (positive) and payments made.', 'Re-do the textbook Example 1 step-by-step in Excel, first with the textbook\'s yearly method, then with the correct.', 'Use the Evaluate Formula tool (Formulas tab) to see how PMT computes internally.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ca_cbse_03_004', difficulty: 'standard',
          question: 'Statutory compliance in computerised accounting refers to the system\'s built-in.',
          hint: 'Work step by step.',
          misconception: 'Students think compliance reporting is a separate manual task done at year-end.',
          parts: [
                { id: 'a', prompt: 'Name two statutory outputs a computerised accounting system can generate.', answer: 'GST invoices/returns (GSTR-1, GSTR-3B) and TDS deduction reports',
                  options: ['GST invoices/returns (GSTR-1, GSTR-3B) and TDS deduction reports', 'compliance reporting is a separate manual task done at year-end'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think compliance reporting is a separate manual task done at year-end.' },
                { id: 'b', prompt: 'What is TDS and when does accounting software apply it?', answer: 'Tax Deducted at Source',
                  options: ['Tax Deducted at Source', 'compliance reporting is a separate manual task done at year-end'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think compliance reporting is a separate manual task done at year-end.' }
          ],
            remediations: { 'compliance-reporting-is-a-separate': { steps: ['Trace one transaction end-to-end: record the sale → see the GST split → see the GSTR report pick it up.', 'Compliance in computerised accounting is automatic because the tax rides on the transaction.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
