import type { SimDef } from '../../engine/types';

/** v3 generated — c12_app_ch09_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_app_ch09_p2: SimDef = {
    id: 'v3_c12_app_ch09_p2',
    title: 'Financial Mathematics · Part 2/2',
    subtitle: 'This node covers the definitions, derivation, and conversion between nominal and.',
    classLevel: 12, subject: 'app', topic: 'Financial Mathematics · Part 2/2',
    chapters: ['c12_app_ch09'],
    nodeIds: ['c12_app_cbse_09_007', 'c12_app_cbse_09_008', 'c12_app_cbse_09_009', 'c12_app_cbse_09_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start with a relatable scenario: "You see two Fixed Deposit ads: Bank X offers 7% p.a. compounded quarterly.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'State the formula for the effective annual rate of interest ($r_{\\text{eff}}$) when the nominal rate is $r$ compounded $m$ times per year.',
        options: ['$r_{\\text{eff}} = (1 + \\frac{r}{m})^m - 1$ for discrete compounding', 'Effective rate = Nominal rate × $m$', 'effective rate is just the nominal rate multiplied by frequency'],
        answer: '$r_{\\text{eff}} = (1 + \\frac{r}{m})^m - 1$ for discrete compounding',
        hook: '**Misconception:** "The nominal rate divided by the number of compounding periods ($r/m$) is the effective rate.".',
    },
    teaching: [
        { title: 'Nominal and Effective Rate of Interest:', text: 'The **Nominal Rate of Interest ($r$)** is the stated annual interest rate before adjusting for compounding frequency.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_app_cbse_09_007', title: 'Nominal and Effective Rate of Interest:',
          scaffold: { problem: 'A corporate FD offers 7.5% p.a. nominal rate compounded quarterly. A rival bank offers 7.6% p.a. compounded semi-annually.',
            steps: [
            { text: 'Identify given data. Option A: $r_A = 0.075$, $m_A = 4$. Option B: $r_B = 0.076$, $m_B = 2$. Principal $P = 10,00,000$.' },
            { text: 'Recall that to compare, we must convert both to effective annual rates $r_{\\text{eff}}$ using $r_{\\text{eff}} = (1.' },
            { text: 'Compute Option A effective rate: $r_{\\text{eff},A} = (1 + 0.075/4)^4 - 1 = (1.01875)^4 - 1$.' },
            { text: 'Compute Option B effective rate: $r_{\\text{eff},B} = (1 + 0.076/2)^2 - 1 = (1.038)^2 - 1 = 1.077444 - 1 = 0.077444.' },
            { text: 'Compare: Option B (7.7444%) > Option A (7.7135%). Maturity A = $10,00,000 \\times 1.077135 = ₹10,77,135$.', faded: true, blankAnswer: 'Option B (7.6% semi-annually) is better. Maturity amounts.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_09_008', title: 'Compound Annual Growth Rate',
          scaffold: { problem: 'An investor bought units of a mutual fund at ₹25 per unit on 1st April 2019. On 31st March 2023, the NAV is ₹42 per unit.',
            steps: [
            { text: 'Identify given values: SV = ₹25, EV = ₹42. Determine n: from 1 Apr 2019 to 31 Mar 2023 is exactly 4 years (2019→20.' },
            { text: 'Recall CAGR formula: CAGR = (EV/SV)^(1/n) - 1. This comes from compound interest EV = SV(1+CAGR)^n.' },
            { text: 'Substitute: CAGR = (42/25)^(1/4) - 1 = (1.68)^(0.25) - 1. Compute 1.68^0.25: use log → 0.25 × log(1.68) = 0.25 × 0.2253.' },
            { text: 'CAGR = 1.1386 - 1 = 0.1386 = 13.86% per annum.' },
            { text: 'Evaluate investor’s claim: "25% per year" would give EV = 25 × (1.25)^4 = 25 × 2.4414 = ₹61.04, not ₹42.', faded: true, blankAnswer: 'CAGR = 13.86% p.a. The investor is incorrect — the true.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_09_009', title: 'Stock, shares and Debentures:',
          scaffold: { problem: 'Mrs. Sharma buys 500 shares of face value ₹10 each at a premium of ₹2 per share. Brokerage is 0.25%.',
            steps: [
            { text: 'Identify givens — No. of shares = 500, Face Value (FV) = ₹10, Premium = ₹2, so Market Value (MV) = ₹12.' },
            { text: 'Calculate cost per share including brokerage. Brokerage per share = 0.25% of ₹12 = ₹0.03.' },
            { text: 'Total investment = 500 × ₹12.03 = ₹6,015.' },
            { text: 'Annual dividend income = 18% of (500 × ₹10) = 0.18 × ₹5,000 = ₹900. (Note: Dividend on FV, not MV!)' },
            { text: 'Return on investment = (₹900 ÷ ₹6,015) × 100 = 14.96%.', faded: true, blankAnswer: '(i) ₹6,015, (ii) ₹900, (iii) 14.96%' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_09_010', title: 'Depreciation',
          scaffold: { problem: 'M/s Sharma Enterprises purchased a Machine on 1st April 2022 for ₹4,50,000. Installation charges were ₹50,000.',
            steps: [
            { text: 'Determine Capitalized Cost (C). C = Purchase Price + Installation = 4,50,000 + 50,000 = ₹5,00,000.' },
            { text: 'Calculate Depreciable Amount. Depreciable Amount = C - S = 5,00,000 - 50,000 = ₹4,50,000.' },
            { text: '(a) SLM Annual Depreciation (D). D = Depreciable Amount / n = 4,50,000 / 5 = ₹90,000 per year.' },
            { text: '(b) Book Value at end of Year 3 (BV_3). Accumulated Depreciation for 3 years = 3 × 90,000 = ₹2,70,000.' },
            { text: '(c) SYD Year 4 Depreciation. Sum of Digits (1 to 5) = 15. Year 4 digit (reverse order) = 2 (Y1:5, Y2:4, Y3:3, Y4:2.', faded: true, blankAnswer: '(a) ₹90,000 p.a. (b) ₹2,30,000 (c) ₹60,000' }
            ] } },
        { type: 'case', nodeId: 'c12_app_cbse_09_010', title: 'Depreciation',
          caseStudy: { intro: 'Start with a relatable scenario: "You buy a delivery van for your startup for ₹8,00,000 plus ₹50,000 registration/painting.',
            decisions: [{ prompt: 'Define \'Depreciable Amount\' and state its formula using Original Cost (C) and Scrap Value (S).', options: [
                { text: 'Depreciable Amount = Original Cost (C) - Scrap Value (S)', outcome: 'Depreciable Amount = Original Cost (C) - Scrap Value (S). It is the total value to be written off.' },
                { text: 'percentage given', outcome: 'Not quite — **Misconception:** "In Written Down Value method, the depreciation *rate* (r) is given in the.', reveals: 'misconception-in-written-down-value' }
            ] }] } },
        { type: 'case', nodeId: 'c12_app_cbse_09_010', title: 'You made it',
          caseStudy: { intro: 'You finished Financial Mathematics — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_app_cbse_09_007', difficulty: 'standard',
          question: 'The **Nominal Rate of Interest ($r$)** is the stated annual interest rate.',
          hint: 'If stuck, review Class 11 Indices and Logarithms (c11_app_cbse_01_006.',
          misconception: '**Misconception:** "The nominal rate divided by the number of compounding periods ($r/m$) is the effective rate.".',
          parts: [
                { id: 'a', prompt: 'State the formula for the effective annual rate of interest ($r_{\\text{eff}}$) when the nominal rate is $r$ compounded $m$ times per year.', answer: '$r_{\\text{eff}} = (1 + \\frac{r}{m})^m - 1$ for discrete compounding',
                  options: ['$r_{\\text{eff}} = (1 + \\frac{r}{m})^m - 1$ for discrete compounding', 'Effective rate = Nominal rate × $m$', 'effective rate is just the nominal rate multiplied by frequency'],
                  hint: 'If stuck, review Class 11 Indices and Logarithms (c11_app_cbse_01_006, c11_app_cbse_01_007).',
                  misconception: '**Misconception:** "The nominal rate divided by the number of compounding periods ($r/m$) is the effective rate." OR "Effective rate.' },
                { id: 'b', prompt: 'The effective annual rate for a certain nominal rate compounded quarterly is 8.24%. Find the nominal rate. (Hint: Reverse the formula).', answer: 'Given $r_{\\text{eff}} = 0.0824$, $m = 4$',
                  options: ['Given $r_{\\text{eff}} = 0.0824$, $m = 4$', 'Effective rate = Nominal rate × $m$'],
                  hint: 'If stuck, review Class 11 Indices and Logarithms (c11_app_cbse_01_006, c11_app_cbse_01_007).',
                  misconception: '**Misconception:** "The nominal rate divided by the number of compounding periods ($r/m$) is the effective rate." OR "Effective rate.' }
          ],
            remediations: { 'misconception-the-nominal-rate-divided': { steps: ['**Revisit Periodic Rate:** Go back to Class 11 Indices/Logarithms (c11_app_cbse_01_006, c11_app_cbse_01_007).', 'compounded monthly, what is the rate *per month*?', 'What is the growth factor *per month*?', 'What is the growth factor *per year*?'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_09_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "The nominal rate divided by the number of compounding periods ($r/m$) is the effective rate.".',
          parts: [
                { id: 'a', prompt: 'Create a real-world scenario (Indian context) where a borrower is misled by a lender quoting only the nominal rate on a loan with monthly compounding, while.', answer: 'Scenario: A fintech app offers a personal loan at "18% p.a',
                  options: ['Scenario: A fintech app offers a personal loan at "18% p.a', 'Effective rate = Nominal rate × $m$'],
                  hint: 'If stuck, review Class 11 Indices and Logarithms (c11_app_cbse_01_006, c11_app_cbse_01_007).',
                  misconception: '**Misconception:** "The nominal rate divided by the number of compounding periods ($r/m$) is the effective rate." OR "Effective rate.' }
          ],
            remediations: { 'misconception-the-nominal-rate-divided': { steps: ['**Revisit Periodic Rate:** Go back to Class 11 Indices/Logarithms (c11_app_cbse_01_006, c11_app_cbse_01_007).', 'compounded monthly, what is the rate *per month*?', 'What is the growth factor *per month*?', 'What is the growth factor *per year*?'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_09_008', difficulty: 'standard',
          question: 'Compound Annual Growth Rate (CAGR) is the geometric mean annual growth rate.',
          hint: 'If stuck on solving for n: Review `c11_app_cbse_01_008` (Laws and Properties.',
          misconception: '**Exact error:** Students treat CAGR as the arithmetic mean of yearly percentage changes: CAGR ≠ (Σ yearly growth.',
          parts: [
                { id: 'a', prompt: 'Two investments A and B both start at ₹10,000 and end at ₹20,000 after 5 years. Investment A grows steadily at 14.87% every year.', answer: '**Correct answer:** Both have the **same CAGR** (≈14.87%)',
                  options: ['**Correct answer:** Both have the **same CAGR** (≈14.87%)', 'A has higher CAGR', 'B has higher CAGR'],
                  hint: 'If stuck on solving for n: Review `c11_app_cbse_01_008` (Laws and Properties of Logarithms).',
                  misconception: '**Exact error:** Students treat CAGR as the arithmetic mean of yearly percentage changes: CAGR ≠ (Σ yearly growth rates)/n.' }
          ],
            remediations: { 'exact-error-students-treat-cagr': { steps: ['**Revisit compound interest formula:** Go to Class 11 node `c11_app_cbse_08_008` (Instantaneous rate of change and.', 'Correct prerequisite: **Class 11 Financial Mathematics `c11_app_cbse_11_001`** — review compound interest A = P(1+r)^n.', 'Derive CAGR formula by solving for r: r = (A/P)^(1/n) - 1.', '**Relearn geometric vs arithmetic mean:** Use `c11_app_cbse_05_008` (Geometric Progression) — the nth root of a product.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_09_009', difficulty: 'standard',
          question: 'Stocks/shares represent fractional ownership in a company, entitling holders.',
          hint: 'If stuck, review "percentage change" and "profit/loss percentage" from Class 8/9 math.',
          misconception: 'Students consistently calculate dividend/interest on market value instead of face value.',
          parts: [
                { id: 'a', prompt: 'Define "face value" and "market value" of a share. If a share with face value ₹10 is trading at ₹15, what term describes this and what does it imply about the.', answer: 'Face value is the nominal value printed on the share certificate (₹10)',
                  options: ['Face value is the nominal value printed on the share certificate (₹10)', 'dividend is paid on market value or confusing premium/discount'],
                  hint: 'If stuck, review "percentage change" and "profit/loss percentage" from Class 8/9 math — the exact.',
                  misconception: 'Students consistently calculate dividend/interest on market value instead of face value.' }
          ],
            remediations: { 'students-consistently-calculate-dividend-interes': { steps: ['Revisit the rule — "Dividend/Interest is ALWAYS on Face Value. Period." Write it on a sticky note.', 'Draw a cash-flow diagram for one buy-hold-sell cycle: Money out (MV + brokerage) → Money in (dividends on FV) → Money.', 'Redo Diagnostic Q3 and Q4 from scratch, verbalizing each step: "I pay ₹X, I get ₹Y, so yield = Y/X."', 'If still stuck, review c12_app_cbse_09_001 (Financial Mathematics intro) for cash-flow thinking and c11_app_cbse_11_001.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_09_010', difficulty: 'standard',
          question: 'Depreciation is the systematic allocation of the depreciable amount (Original.',
          hint: 'If stuck on WDV formula derivation or finding `r`, immediately revisit **Class 11.',
          misconception: '**Misconception:** "In Written Down Value method, the depreciation *rate* (r) is given in the problem (e.g., \'10%.',
          parts: [
                { id: 'a', prompt: 'Define \'Depreciable Amount\' and state its formula using Original Cost (C) and Scrap Value (S).', answer: 'Depreciable Amount = Original Cost (C) - Scrap Value (S)',
                  options: ['Depreciable Amount = Original Cost (C) - Scrap Value (S)', 'percentage given'],
                  hint: 'If stuck on WDV formula derivation or finding `r`, immediately revisit **Class 11.',
                  misconception: '**Misconception:** "In Written Down Value method, the depreciation *rate* (r) is given in the problem (e.g., \'10% p.a.\'), so I just.' },
                { id: 'b', prompt: 'An asset costs ₹50,000. Its scrap value after 5 years is ₹5,000. Calculate the depreciation for Year 3 using the Sum of Years Digits method.', answer: 'Step 1: Depreciable Amount = 50,000 - 5,000 = 45,000',
                  options: ['Step 1: Depreciable Amount = 50,000 - 5,000 = 45,000', 'percentage given'],
                  hint: 'If stuck on WDV formula derivation or finding `r`, immediately revisit **Class 11.',
                  misconception: '**Misconception:** "In Written Down Value method, the depreciation *rate* (r) is given in the problem (e.g., \'10% p.a.\'), so I just.' },
                { id: 'c', prompt: 'Compare the Book Value at the end of Year 2 for an asset (C=₹1,00,000, S=₹0, n=4, Rate=20% p.a.) under Straight Line vs. Written Down Value.', answer: 'SLM: Annual Dep = 25,000',
                  options: ['SLM: Annual Dep = 25,000', 'percentage given'],
                  hint: 'If stuck on WDV formula derivation or finding `r`, immediately revisit **Class 11.',
                  misconception: '**Misconception:** "In Written Down Value method, the depreciation *rate* (r) is given in the problem (e.g., \'10% p.a.\'), so I just.' }
          ],
            remediations: { 'misconception-in-written-down-value': { steps: ['**Revisit Definition:** Have the student write the NCERT definition of WDV: "annual depreciation is a constant.', 'at the end of the preceding year." Highlight "book value" and "preceding year".', '**Contrast Drill:** Create a 3-year mini-schedule (C=100, r=20%) side-by-side: Column A (Wrong: 20% of 100 every year).', 'Calculate Final BV for both.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
