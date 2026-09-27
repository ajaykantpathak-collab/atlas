import type { SimDef } from '../../engine/types';

/** v3 generated — c12_app_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_app_ch09_p1: SimDef = {
    id: 'v3_c12_app_ch09_p1',
    title: 'Financial Mathematics · Part 1/2',
    subtitle: 'This node covers perpetuity concepts: definition, present value formulas for immediate.',
    classLevel: 12, subject: 'app', topic: 'Financial Mathematics · Part 1/2',
    chapters: ['c12_app_ch09'],
    nodeIds: ['c12_app_cbse_09_001', 'c12_app_cbse_09_002', 'c12_app_cbse_09_003', 'c12_app_cbse_09_004', 'c12_app_cbse_09_005', 'c12_app_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start with a real question: "Your grandfather wants to set up a scholarship of ₹50,000 per year forever.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'What is the present value of a perpetuity of ₹1,000 payable at the end of each year forever, if the interest rate is 10% per annum compounded annually?',
        options: ['Correct answer: ₹10,000', 'present value = one payment', '"present value = one payment" and ignores discounting'],
        answer: 'Correct answer: ₹10,000',
        hook: 'Students treat the annual interest rate as the per-period rate i in the formula P = R/i, even when payments are.',
    },
    teaching: [
        { title: 'Financial Mathematics', text: 'A perpetuity is an annuity where equal periodic payments continue indefinitely.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_app_cbse_09_001', title: 'Financial Mathematics',
          scaffold: { problem: 'A charitable trust wants to establish a perpetuity to award a scholarship of ₹25,000 at the end of each year forever.',
            steps: [
            { text: 'Identify given: R = ₹25,000 (annual payment at year-end), i = 7.5% = 0.075 per annum.' },
            { text: 'Select formula: P = R / i for perpetuity immediate.' },
            { text: 'Substitute: P = 25000 / 0.075.' },
            { text: 'Compute: 25000 ÷ 0.075 = 25000 × (1000/75) = 25000 × (40/3) = 10,00,000 / 3 = ₹3,33,333.33.' },
            { text: 'Verify: Interest earned in year 1 = 3,33,333.33 × 0.075 = ₹25,000.', faded: true, blankAnswer: '₹3,33,333.33' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_09_002', title: 'LEARNING OUTCOMES',
          scaffold: { problem: 'A charitable trust wants to establish a perpetuity fund to award ₹25,000 annually to a meritorious student, starting one year from today.',
            steps: [
            { text: 'Identify given — R = ₹25,000 (annual payment), i = 7% = 0.07 per annum, payments at year-end (ordinary perpetuity).' },
            { text: 'Identify concept — present value of ordinary perpetuity P = R/i.' },
            { text: 'Apply formula — P = 25,000 / 0.07 = ₹3,57,142.86.' },
            { text: 'Verify — Interest earned annually = 3,57,142.86 × 0.07 = ₹25,000 exactly, matching the award amount.' },
            { text: 'Interpret — Trust must deposit ₹3,57,143 (round up) today to generate ₹25,000/year forever.', faded: true, blankAnswer: '₹3,57,143 (rounded up to nearest rupee).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_09_003', title: 'Perpetuity:',
          scaffold: { problem: 'A charitable trust wants to award a scholarship of ₹12,000 at the end of every year forever. The bank offers 5% p.a. compounded annually.',
            steps: [
            { text: 'Identify given: $R = 12,000$ (end of year), $i = 5\\% = 0.05$ per year.' },
            { text: 'Recognize this as an **Ordinary Perpetuity** (first payment at end of year 1). Formula: $P = \\frac{R}{i}$.' },
            { text: 'Substitute values: $P = \\frac{12000}{0.05}$.' },
            { text: 'Compute: $P = 2,40,000$.' },
            { text: 'Verify: Interest earned in year 1 = $2,40,000 \\times 0.05 = 12,000$ = scholarship amount. Corpus remains intact.', faded: true, blankAnswer: '₹2,40,000 must be deposited today.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_09_004', title: 'Sinking Fund:',
          scaffold: { problem: 'A housing society needs to replace a water tank in 4 years. Current cost ₹6,00,000. Tank prices increase 6% p.a.',
            steps: [
            { text: 'Calculate replacement cost after 4 years with 6% inflation: 6,00,000 × (1.06)⁴ = 6,00,000 × 1.262477 = ₹7,57,486.20' },
            { text: 'Determine target amount for sinking fund: A = Replacement cost - Scrap value = 7,57,486.20 - 50,000 = ₹7,07,486.20' },
            { text: 'Identify parameters: i = 10% = 0.10 per year, n = 4 years, end-of-year deposits → ordinary annuity formula' },
            { text: 'Apply formula R = A × i / [(1+i)ⁿ - 1] = 7,07,486.20 × 0.10 / [(1.10)⁴ - 1] = 70,748.62 / [1.4641 - 1] = 70,748.62.' },
            { text: 'Verify: FV of deposits = 1,52,442.62 × [(1.10)⁴ - 1]/0.10 = 1,52,442.62 × 4.641 = ₹7,07,486.20 ✓ Matches target.', faded: true, blankAnswer: 'Annual deposit = ₹1,52,442.62 (approx ₹1,52,443)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_09_005', title: 'Calculation of EMI or Amortization of Loans',
          scaffold: { problem: 'Ravi takes a home loan of ₹40,00,000 at 8.5% p.a. for 20 years. Calculate his monthly EMI.',
            steps: [
            { text: 'Convert given data to monthly terms. Annual rate = 8.5% → monthly rate i = 8.5%/12 = 0.085/12 = 0.0070833.' },
            { text: 'Compute (1+i)^n = (1.0070833)^240. Using calculator: (1.0070833)^240 ≈ 5.362.' },
            { text: 'Apply EMI formula: EMI = P × [i(1+i)^n] / [(1+i)^n - 1] = 40,00,000 × [0.0070833 × 5.362] / [5.362 - 1] = 40,00,000.' },
            { text: 'Interest in 1st EMI = P × i = 40,00,000 × 0.0070833 = ₹28,333.' },
            { text: 'For 12th EMI, need outstanding after 11 months. Outstanding after k payments = EMI × [1 - (1+i)^{-(n-k)}]/i.', faded: true, blankAnswer: 'EMI = ₹34,828; 1st EMI: Interest = ₹28,333, Principal.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_09_006', title: 'Methods of calculation of EMI or Instalment',
          scaffold: { problem: 'Ravi takes a home loan of ₹50,00,000 at 8.5% p.a. for 20 years. Calculate his EMI under both Flat Rate and Reducing Balance methods.',
            steps: [
            { text: 'Identify given values: P = 50,00,000; r = 8.5% = 0.085; t = 20 years.' },
            { text: 'Flat Rate Method — Compute total interest: I = P × r × t = 50,00,000 × 0.085 × 20 = 85,00,000.' },
            { text: 'Reducing Balance Method — Monthly rate i = r/12 = 0.085/12 ≈ 0.00708333. n = 240. Compute (1+i)^n = (1.00708333)^240.' },
            { text: 'Total interest Flat = ₹85,00,000. Total interest Reducing = (43,344 × 240) - 50,00,000 = 1,04,02,560 - 50,00,000.' },
            { text: 'Difference in total interest = 85,00,000 - 54,02,560 = ₹30,97,440. Reducing Balance saves over ₹30 lakh.', faded: true, blankAnswer: 'Flat Rate EMI = ₹56,250; Reducing Balance EMI = ₹43,344.' }
            ] } },
        { type: 'case', nodeId: 'c12_app_cbse_09_001', title: 'Financial Mathematics',
          caseStudy: { intro: 'Start with a real question: "Your grandfather wants to set up a scholarship of ₹50,000 per year forever. The bank offers 8% p.a.',
            decisions: [{ prompt: 'What is the present value of a perpetuity of ₹1,000 payable at the end of each year forever, if the interest rate is 10% per annum.', options: [
                { text: 'Correct answer: ₹10,000', outcome: 'Correct answer: ₹10,000. Formula: P = R/i = 1000/0.10 = 10,000.' },
                { text: 'present value = one payment', outcome: 'Not quite — Students treat the annual interest rate as the per-period rate i in the formula P = R/i, even when.', reveals: 'students-treat-the-annual-interest' },
                { text: '"present value = one payment" and ignores discounting', outcome: 'Not quite — Students treat the annual interest rate as the per-period rate i in the formula P = R/i, even when.', reveals: 'students-treat-the-annual-interest' }
            ] }] } },
        { type: 'case', nodeId: 'c12_app_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through Financial Mathematics like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? Financial Mathematics · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Financial Mathematics · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_app_cbse_09_001', difficulty: 'standard',
          question: 'A perpetuity is an annuity where equal periodic payments continue indefinitely.',
          hint: 'If stuck on infinite GP sum, revisit c11_app_cbse_05_010 (Sum of infinite GP).',
          misconception: 'Students treat the annual interest rate as the per-period rate i in the formula P = R/i, even when payments are.',
          parts: [
                { id: 'a', prompt: 'What is the present value of a perpetuity of ₹1,000 payable at the end of each year forever, if the interest rate is 10% per annum compounded annually?', answer: 'Correct answer: ₹10,000',
                  options: ['Correct answer: ₹10,000', 'present value = one payment', '"present value = one payment" and ignores discounting'],
                  hint: 'If stuck on infinite GP sum, revisit c11_app_cbse_05_010 (Sum of infinite GP).',
                  misconception: 'Students treat the annual interest rate as the per-period rate i in the formula P = R/i, even when payments are semi-annual or quarterly.' },
                { id: 'b', prompt: 'Explain in your own words why the present value of a perpetuity is finite even though payments continue forever. Use the concept of discounting.', answer: 'Correct explanation: Each future payment is worth less today',
                  options: ['Correct explanation: Each future payment is worth less today', 'because payments get smaller'],
                  hint: 'If stuck on infinite GP sum, revisit c11_app_cbse_05_010 (Sum of infinite GP).',
                  misconception: 'Students treat the annual interest rate as the per-period rate i in the formula P = R/i, even when payments are semi-annual or quarterly.' }
          ],
            remediations: { 'students-treat-the-annual-interest': { steps: ['Have the student write the infinite series explicitly: P = R(1+i)⁻¹ + R(1+i)⁻² + ... for 3-4 terms.', 'Ask "What is the common ratio?" → (1+i)⁻¹.', 'Ask "What must be true about i for this series to converge?" → i > 0.', 'Derive sum = R/i.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_09_002', difficulty: 'standard',
          question: 'A perpetuity is an annuity with infinite duration where equal periodic payments.',
          hint: 'Review c11_app_cbse_05_008 (GP sum) and c11_app_cbse_05_010 (GP general term) — practice.',
          misconception: 'Students mechanically apply P = R/i to *every* perpetuity problem, ignoring whether payments are at period end.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the present value of a perpetuity is finite even though payments continue forever, and why the "amount" (future value) of.', answer: 'Present value is finite',
                  options: ['Present value is finite', 'both are infinite', 'both are finite'],
                  hint: 'Review c11_app_cbse_05_008 (GP sum) and c11_app_cbse_05_010 (GP general term) — practice.',
                  misconception: 'Students mechanically apply P = R/i to *every* perpetuity problem, ignoring whether payments are at period end (ordinary) or beginning.' }
          ],
            remediations: { 'students-mechanically-apply-p-r': { steps: ['Draw a timeline for both types: mark t=0,1,2...', 'Derive P = R/i from geometric series sum a/(1-r) with a = R/(1+i), r = 1/(1+i).', 'Derive P_due = R + R/i by factoring out immediate R.', 'Re-attempt Diagnostic Questions 1, 3, 4.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_09_003', difficulty: 'standard',
          question: 'A perpetuity is an annuity in which equal periodic payments continue.',
          hint: 'If stuck, review **Class 11 Geometric Progression (c11_app_cbse_05_008, 05_009, 05_010)**.',
          misconception: '**"The formula $P = R/i$ works for all perpetuities regardless of when the first payment is made."** Students see $P.',
          parts: [
                { id: 'a', prompt: 'Find the present value of a perpetuity of ₹2,000 payable at the **beginning** of each year, if money is worth 6% per annum compounded annually.', answer: 'This is a **Perpetuity Due**',
                  options: ['This is a **Perpetuity Due**', 'beginning of period'],
                  hint: 'If stuck, review **Class 11 Geometric Progression (c11_app_cbse_05_008, 05_009, 05_010)**.',
                  misconception: '**"The formula $P = R/i$ works for all perpetuities regardless of when the first payment is made."** Students see $P = R/i$ in the textbook.' }
          ],
            remediations: { 'the-formula-p-r-i': { steps: ['If the student confuses Ordinary Perpetuity vs Perpetuity Due: 1.', '**Draw a timeline**: Mark "Time 0" (today), "End of Year 1", "End of Year 2", ...', 'Place the first payment at the correct point.', '**Re-derive**: For Ordinary: $P = \\frac{R}{1+i} + \\frac{R}{(1+i)^2} + \\dots = \\frac{R}{i}$.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_09_004', difficulty: 'standard',
          question: 'A sinking fund is a fund created by setting aside periodic payments (usually.',
          hint: 'If stuck, review the GP sum formula Sₙ = a(rⁿ - 1)/(r - 1) from c11_app_cbse_05_006 and.',
          misconception: 'Students treat the sinking fund formula as a new, independent formula to memorize: R = A × i / [(1+i)ⁿ - 1].',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A sinking fund is a fund created by setting aside periodic payments (usually equal) at',
                  options: ['A sinking fund is a fund created by setting aside periodic payments (usually equal) at', 'A perpetuity is an annuity where equal periodic payments continue indefinitely', 'A perpetuity is an annuity with infinite duration where equal periodic payments continue', 'A perpetuity is an annuity in'],
                  hint: 'If stuck, review the GP sum formula Sₙ = a(rⁿ - 1)/(r - 1) from c11_app_cbse_05_006 and map: a =.',
                  misconception: 'Students treat the sinking fund formula as a new, independent formula to memorize: R = A × i / [(1+i)ⁿ - 1].' }
          ],
            remediations: { 'students-treat-the-sinking-fund': { steps: ['Revisit Class 11 node c11_app_cbse_05_008 (Geometric Progression) and c11_app_cbse_11_001 (Financial Mathematics intro).', 'Practice rearranging this for R.', 'Do 3 problems from NCERT Exercise 7.1 (Q6, Q7, Q8) — first identifying ordinary vs annuity due, then solving.', 'Re-attempt Diagnostic Questions 2 and 3. If still stuck, the gap is in GP sum formula — go back to c11_app_cbse_05_006.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_09_005', difficulty: 'standard',
          question: 'EMI (Equated Monthly Instalment) is the fixed amount paid by a borrower to.',
          hint: 'If stuck on EMI formula derivation, review the GP sum derivation in c11_app_cbse_05_008.',
          misconception: 'Students often believe that the EMI formula EMI = (P + Total Interest)/n works for reducing-balance loans — this is the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'EMI (Equated Monthly Instalment) is the fixed amount paid by a borrower to a lender at a',
                  options: ['EMI (Equated Monthly Instalment) is the fixed amount paid by a borrower to a lender at a', 'A perpetuity is an annuity where equal periodic payments continue indefinitely', 'A perpetuity is an annuity with infinite duration where equal periodic payments continue', 'A perpetuity is an annuity in'],
                  hint: 'If stuck on EMI formula derivation, review the GP sum derivation in c11_app_cbse_05_008 and the.',
                  misconception: 'Students often believe that the EMI formula EMI = (P + Total Interest)/n works for reducing-balance loans — this is the **flat-rate.' }
          ],
            remediations: { 'the-emi-formula-emi-p': { steps: ['Revisit **c12_app_cbse_09_006** (Methods of calculation of EMI) to explicitly compare flat-rate vs reducing-balance.', 'Practice converting annual rate → monthly rate (divide by 12) and years → months (multiply by 12) with 5 different loan.', 'Build a 3-month amortization schedule by hand for a ₹1 lakh loan at 12% p.a.', 'for 2 years — calculate opening balance, interest, principal repaid, closing balance for each month.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_09_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the EMI formula EMI = (P + Total Interest)/n works for reducing-balance loans — this is the.',
          parts: [
                { id: 'a', prompt: 'A borrower claims: "If I prepay ₹1 lakh in the 13th month of a 20-year home loan, my EMI will automatically reduce." Evaluate this statement.', answer: 'The statement is **not automatically true**',
                  options: ['The statement is **not automatically true**', 'EMI always reduces'],
                  hint: 'If stuck on EMI formula derivation, review the GP sum derivation in c11_app_cbse_05_008 and the.',
                  misconception: 'Students often believe that the EMI formula EMI = (P + Total Interest)/n works for reducing-balance loans — this is the **flat-rate.' }
          ],
            remediations: { 'the-emi-formula-emi-p': { steps: ['Revisit **c12_app_cbse_09_006** (Methods of calculation of EMI) to explicitly compare flat-rate vs reducing-balance.', 'Practice converting annual rate → monthly rate (divide by 12) and years → months (multiply by 12) with 5 different loan.', 'Build a 3-month amortization schedule by hand for a ₹1 lakh loan at 12% p.a.', 'for 2 years — calculate opening balance, interest, principal repaid, closing balance for each month.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_09_006', difficulty: 'standard',
          question: 'EMI (Equated Monthly Instalment) is the fixed amount paid by a borrower to.',
          hint: 'If stuck, review the Present Value of Annuity derivation in c12_app_cbse_09_005 and.',
          misconception: 'Students treat the annual interest rate `r` as the periodic rate `i` in the Reducing Balance EMI formula `EMI = P ×.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'EMI (Equated Monthly Instalment) is the fixed amount paid by a borrower to a lender at a',
                  options: ['EMI (Equated Monthly Instalment) is the fixed amount paid by a borrower to a lender at a', 'A perpetuity is an annuity where equal periodic payments continue indefinitely', 'A perpetuity is an annuity with infinite duration where equal periodic payments continue', 'A perpetuity is an annuity in'],
                  hint: 'If stuck, review the Present Value of Annuity derivation in c12_app_cbse_09_005 and practice `i.',
                  misconception: 'Students treat the annual interest rate `r` as the periodic rate `i` in the Reducing Balance EMI formula `EMI = P × i × (1+i)^n / [(1+i)^n.' }
          ],
            remediations: { 'students-treat-the-annual-interest': { steps: ['Revisit **c11_app_cbse_01_007** (Logarithms) and **c11_app_cbse_01_008** (Laws of Logarithms) to comfortably handle.', 'Revisit **c12_app_cbse_09_005** (Calculation of EMI or Amortization of Loans) to re-derive the Reducing Balance EMI.', 'Practice 5 problems *only* on unit conversion: given annual rate and years, write down `i` and `n` correctly.', 'Re-attempt Diagnostic Question 3 with a checklist: "Did I divide rate by 12?'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
