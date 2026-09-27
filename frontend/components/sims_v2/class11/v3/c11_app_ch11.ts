import type { SimDef } from '../../engine/types';

/** v3 generated — c11_app_ch11 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_app_ch11: SimDef = {
    id: 'v3_c11_app_ch11',
    title: 'Financial Mathematics',
    subtitle: 'This node covers the foundational concepts of interest calculation (simple and compound).',
    classLevel: 11, subject: 'app', topic: 'Financial Mathematics',
    chapters: ['c11_app_ch11'],
    nodeIds: ['c11_app_cbse_11_001', 'c11_app_cbse_11_002', 'c11_app_cbse_11_003', 'c11_app_cbse_11_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start by asking: "If a bank offers 12% per annum compounded quarterly, is your actual return 12%?" Most.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Explain in your own words why the effective annual rate is always greater than the nominal rate when compounding occurs more than once a year.',
        options: ['Because interest is added to the principal within the year, subsequent interest', 'the rate is divided by m so it\'s smaller', '10% per annum compounded quarterly'],
        answer: 'Because interest is added to the principal within the year, subsequent interest',
        hook: 'Students believe that "10% per annum compounded quarterly" means they earn 10% per year, not realizing the effective.',
    },
    teaching: [
        { title: 'Financial Mathematics', text: 'Financial Mathematics is the branch of applied mathematics that deals with the valuation of money over time, using concepts of interest (simple and compound), discounting, present and future value.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_app_cbse_11_001', title: 'Financial Mathematics',
          scaffold: { problem: 'Mr. Sharma deposits ₹25,000 in a fixed deposit at 9% per annum compounded quarterly for 2 years.',
            steps: [
            { text: 'Identify given values: Principal P = ₹25,000; nominal rate r = 9% p.a.; compounding frequency m = 4 (quarterly); time.' },
            { text: 'Compute quarterly rate = r/m = 9%/4 = 2.25% per quarter. Number of quarters n = m × t = 4 × 2 = 8.' },
            { text: 'Calculate effective annual rate (AER) = (1 + 0.09/4)^4 - 1 = (1.0225)^4 - 1 = 1.093083 - 1 = 0.093083 = 9.3083% p.a.' },
            { text: 'Compute maturity amount A = P(1 + r/(100m))^n = 25000 × (1.0225)^8 = 25000 × 1.194831 = ₹29,870.78.' },
            { text: 'Compound interest = A - P = 29870.78 - 25000 = ₹4,870.78. Verify: Simple interest would be 25000 × 0.09 × 2 = ₹4,500.', faded: true, blankAnswer: '(a) 2.25% per quarter, (b) 9.3083% p.a., (c) ₹29,870.78.' }
            ] } },
        { type: 'case', nodeId: 'c11_app_cbse_11_003', title: 'An Equated Monthly Instalment is a.',
          caseStudy: { intro: '1. A ₹100,000 loan at 12%/year (1%/month) for 12 months: EMI = 100,000 × 0.01 × (1.01)¹² ÷ [(1.01)¹² − 1] ≈ ₹8,885. 2.',
            decisions: [{ prompt: 'What does an EMI payment split into?', options: [
                { text: 'The month\'s interest on the outstanding balance plus a principal-reduction component', outcome: 'The month\'s interest on the outstanding balance plus a principal-reduction component — fixed total.' },
                { text: 'the EMI is split evenly between interest and principal every month', outcome: 'Not quite — Students think the EMI is split evenly between interest and principal every month.', reveals: 'the-emi-is-split-evenly' }
            ] }] } },
        { type: 'case', nodeId: 'c11_app_cbse_11_004', title: 'You made it',
          caseStudy: { intro: 'You finished Financial Mathematics — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_app_cbse_11_001', difficulty: 'standard',
          question: 'Financial Mathematics is the branch of applied mathematics that deals with the.',
          hint: 'If stuck, review percentage increase/decrease, laws of exponents, and solving exponential.',
          misconception: 'Students believe that "10% per annum compounded quarterly" means they earn 10% per year, not realizing the effective.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the effective annual rate is always greater than the nominal rate when compounding occurs more than once a year.', answer: 'Because interest is added to the principal within the year, subsequent interest',
                  options: ['Because interest is added to the principal within the year, subsequent interest', 'the rate is divided by m so it\'s smaller', '10% per annum compounded quarterly'],
                  hint: 'If stuck, review percentage increase/decrease, laws of exponents, and solving exponential equations.',
                  misconception: 'Students believe that "10% per annum compounded quarterly" means they earn 10% per year, not realizing the effective rate is (1 + 0.10/4)^4.' },
                { id: 'b', prompt: 'A bank offers 8% per annum compounded quarterly. Calculate the effective annual rate. If you deposit ₹50,000, what will be the amount after 1 year?', answer: 'Quarterly rate = 8%/4 = 2% per quarter',
                  options: ['Quarterly rate = 8%/4 = 2% per quarter', '10% per annum compounded quarterly'],
                  hint: 'If stuck, review percentage increase/decrease, laws of exponents, and solving exponential equations.',
                  misconception: 'Students believe that "10% per annum compounded quarterly" means they earn 10% per year, not realizing the effective rate is (1 + 0.10/4)^4.' },
                { id: 'c', prompt: 'Compare the future value of ₹1,00,000 invested for 3 years at 10% per annum under: (a) simple interest, (b) compound interest annually, (c) compound interest.', answer: 'simple interest, (',
                  options: ['simple interest, (', '10% per annum compounded quarterly'],
                  hint: 'If stuck, review percentage increase/decrease, laws of exponents, and solving exponential equations.',
                  misconception: 'Students believe that "10% per annum compounded quarterly" means they earn 10% per year, not realizing the effective rate is (1 + 0.10/4)^4.' }
          ],
            remediations: { '10-per-annum-compounded-quarterly': { steps: ['Have the student compute the amount after 1 year on ₹100 at 12% compounded monthly manually for 12 months using a table.', 'Compare final amount to ₹112 (simple interest) and ₹112.68 (compound).', 'Derive AER formula from the pattern: (1 + 0.01)^12 - 1.', 'Practice 3 similar problems with different compounding frequencies until they can explain why AER > nominal rate.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "10% per annum compounded quarterly" means they earn 10% per year, not realizing the effective.',
          parts: [
                { id: 'a', prompt: 'Design a monthly savings plan (annuity) for a student who wants to accumulate ₹5,00,000 in 5 years for higher education.', answer: 'Monthly rate = 0.5%, n = 60 months',
                  options: ['Monthly rate = 0.5%, n = 60 months', '10% per annum compounded quarterly'],
                  hint: 'If stuck, review percentage increase/decrease, laws of exponents, and solving exponential equations.',
                  misconception: 'Students believe that "10% per annum compounded quarterly" means they earn 10% per year, not realizing the effective rate is (1 + 0.10/4)^4.' }
          ],
            remediations: { '10-per-annum-compounded-quarterly': { steps: ['Have the student compute the amount after 1 year on ₹100 at 12% compounded monthly manually for 12 months using a table.', 'Compare final amount to ₹112 (simple interest) and ₹112.68 (compound).', 'Derive AER formula from the pattern: (1 + 0.01)^12 - 1.', 'Practice 3 similar problems with different compounding frequencies until they can explain why AER > nominal rate.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_11_002', difficulty: 'standard',
          question: 'Simple interest accrues only on the principal: SI = P·r·t/100, so the amount.',
          hint: 'Work step by step.',
          misconception: 'Students think CI is just SI with extra steps — they compute per-year interest on the original principal under CI too.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Simple interest accrues only on the principal: SI = P·r·t/100, so the amount is A = P(1 +',
                  options: ['Simple interest accrues only on the principal: SI = P·r·t/100, so the amount is A = P(1 +', 'Financial Mathematics is the branch of applied mathematics that deals with the valuation', 'An Equated Monthly Instalment is a fixed payment that retires a loan in equal monthly', 'An annuity is a series of equal payments at equal intervals'],
                  hint: 'Recall the definition.',
                  misconception: 'Students think CI is just SI with extra steps — they compute per-year interest on the original principal under CI too.' }
          ],
            remediations: { 'ci-is-just-si-with': { steps: ['Lay out year-by-year balances for CI — write the new principal each year.', 'The moment you see \'interest on last year\'s interest\', the formula P(1+r)ⁿ makes sense.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_11_003', difficulty: 'standard',
          question: 'An Equated Monthly Instalment is a fixed payment that retires a loan in equal.',
          hint: 'Work step by step.',
          misconception: 'Students think the EMI is split evenly between interest and principal every month.',
          parts: [
                { id: 'a', prompt: 'Why do early EMIs barely reduce the balance?', answer: 'The balance is still large, so interest is large and eats most of the EMI',
                  options: ['The balance is still large, so interest is large and eats most of the EMI', 'the EMI is split evenly between interest and principal every month'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think the EMI is split evenly between interest and principal every month.' },
                { id: 'b', prompt: 'As the loan ages, what happens inside each EMI?', answer: 'Interest shrinks (smaller balance) so the principal component grows',
                  options: ['Interest shrinks (smaller balance) so the principal component grows', 'the EMI is split evenly between interest and principal every month'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think the EMI is split evenly between interest and principal every month.' }
          ],
            remediations: { 'the-emi-is-split-evenly': { steps: ['Track one month by hand: interest = rate × balance; principal = EMI − interest; new balance = old − principal.', 'Repeat for month 2 and the amortisation pattern reveals itself.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_11_004', difficulty: 'standard',
          question: 'An annuity is a series of equal payments at equal intervals — recurring.',
          hint: 'Work step by step.',
          misconception: 'Students treat the annuity\'s worth as n × PMT — \'12 payments of ₹1,000 = ₹12,000\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An annuity is a series of equal payments at equal intervals',
                  options: ['An annuity is a series of equal payments at equal intervals', 'Financial Mathematics is the branch of applied mathematics that deals with the valuation', 'Simple interest accrues only on the principal: SI = P·r·t/100, so the amount is A = P(1 +', 'An Equated Monthly Instalment is a fixed payment that retires a loan in equal monthly'],
                  hint: 'Recall the definition.',
                  misconception: 'Students treat the annuity\'s worth as n × PMT — \'12 payments of ₹1,000 = ₹12,000\'.' }
          ],
            remediations: { 'students-treat-the-annuity-s': { steps: ['Timeline the payments: mark each deposit and count the compounding periods it enjoys.', 'Then apply FV = PMT × [((1+r)ⁿ − 1) ÷ r] — the formula is just the timeline summed.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
