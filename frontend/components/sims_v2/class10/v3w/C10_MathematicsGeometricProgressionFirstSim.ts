import type { SimDef } from '../../engine/types';
import C10_MathematicsGeometricProgressionFirstSim from '../../../simulations/c6_12/C10_MathematicsGeometricProgressionFirstSim';

/** v3 wrapped master — C10_MathematicsGeometricProgressionFirstSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_mathematicsgeometricprogressionfirstsim: SimDef = {
    id: 'v3w_c10_mathematicsgeometricprogressionfirstsim',
    title: 'Sum of AP Given First Term, Last Term and Number of Terms',
    subtitle: 'This node covers the derivation, application, and problem-solving using Sₙ = n/2 (a + l).',
    classLevel: 10, subject: 'mathematics', topic: 'Sum of AP Given First Term, Last Term and Number of Terms',
    chapters: [],
    nodeIds: ['c10_math_cbse_05_009', 'c10_math_cbse_05_010', 'c10_math_cbse_05_011', 'c10_math_cbse_05_012', 'c10_math_cbse_05_001', 'c10_math_cbse_05_002', 'c10_math_cbse_05_003', 'c10_math_cbse_05_004', 'c10_math_cbse_05_006', 'c10_math_cbse_05_007', 'c10_math_cbse_05_008', 'c10_math_cbse_05_005', 'c10_math_cbse_06_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine you are saving money in a piggy bank: you put ₹10 on day 1, ₹15 on day 2, ₹20 on day 3, and so on,.', goal: 'Master Sum of AP Given First Term, Last Term and Number of Terms.' },
    discovery: {
        question: 'A student says: "The heights of students in a class form an AP because they increase." Explain why this reasoning is incorrect and state the precise condition.',
        options: ['Heights of students do not necessarily increase by a constant difference', 'increasing', 'constant difference'],
        answer: 'Heights of students do not necessarily increase by a constant difference',
        hook: '**Misidentifying \'n\' in "find the number of terms" problems**: Students often treat the term number (e.g., "10th term").',
    },
    teaching: [
        { title: 'The sum of the first n terms of an.', text: 'The sum of the first n terms of an arithmetic progression when the first term (a), the last term (l), and the number of terms (n) are known is given by the formula Sₙ = n/2 (a + l).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_math_cbse_05_009', title: 'The sum of the first n terms of an.',
          scaffold: { problem: 'A school auditorium has rows of seats arranged such that the first row has 18 seats and each subsequent row has 2 more seats than the.',
            steps: [
            { text: 'Identify the given values. The seats form an AP. First term a = 18. Last term l = 56.' },
            { text: 'Find n using the nth term formula l = a + (n-1)d. Substitute: 56 = 18 + (n-1) × 2.' },
            { text: 'Solve for n. 56 - 18 = (n-1) × 2 → 38 = 2(n-1) → n-1 = 19 → n = 20. So there are 20 rows.' },
            { text: 'Now use the sum formula Sₙ = n/2 (a + l). Substitute n = 20, a = 18, l = 56: S₂₀ = 20/2 × (18 + 56) = 10 × 74 = 740.' },
            { text: 'Interpret the result. Total seats = 740. Verify: The sequence is 18, 20, 22, ..., 56.', faded: true, blankAnswer: '740 seats' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_05_010', title: 'In an Arithmetic Progression (AP), the.',
          scaffold: { problem: 'The sum of first n terms of an AP is given by S_n = 4n^2 - n. Find the AP (i.e., find the first term a and common difference d), and hence.',
            steps: [
            { text: 'Identify what is given — S_n = 4n^2 - n. We need to find a, d, and a_15.' },
            { text: 'Find the first term a = a_1 = S_1. Substitute n=1: S_1 = 4(1)^2 - 1 = 4 - 1 = 3. So a = 3.' },
            { text: 'Find a general expression for a_n using a_n = S_n - S_{n-1}. First compute S_{n-1} = 4(n-1)^2 - (n-1) = 4(n^2 - 2n + 1).' },
            { text: 'Subtract: a_n = S_n - S_{n-1} = (4n^2 - n) - (4n^2 - 9n + 5) = 4n^2 - n - 4n^2 + 9n - 5 = 8n - 5.' },
            { text: 'Identify the common difference d. Since a_n = 8n - 5 is linear in n, the coefficient of n is d = 8.' },
            { text: 'Find the 15th term: a_15 = 8(15) - 5 = 120 - 5 = 115. Alternatively, a_15 = a + 14d = 3 + 14(8) = 3 + 112 = 115.', faded: true, blankAnswer: 'The AP is 3, 11, 19, 27, ... with a = 3, d = 8. The 15th.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_05_011', title: 'Word problems on Arithmetic.',
          scaffold: { problem: 'A school awards cash prizes to the top 5 students in a competition.',
            steps: [
            { text: 'Identify the pattern. Prizes: 1st = 5000, 2nd = 4500, 3rd = 4000... Difference = -500 (constant).' },
            { text: 'Find each prize (terms 1 to 5) using nth term formula \\(a_n = a + (n-1)d\\).' },
            { text: 'Find total amount awarded using sum formula \\(S_n = \\frac{n}{2}(a + l)\\) where l = last term = 3000.' },
            { text: 'Verify using the other sum formula: \\(S_5 = \\frac{5}{2}[2(5000) + 4(-500)] = 2.5[10000 - 2000] = 2.5 \\times 8000 =.' },
            { text: 'State answer with units. Prizes: ₹5000, ₹4500, ₹4000, ₹3500, ₹3000. Total = ₹20,000.', faded: true, blankAnswer: 'Prizes: ₹5000, ₹4500, ₹4000, ₹3500, ₹3000. Total amount.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_05_012', title: 'Word problems on instalments and.',
          scaffold: { problem: 'Mrs. Sharma buys a refrigerator for ₹24,000. She pays ₹6,000 cash down payment and agrees to pay the balance in 12 monthly instalments.',
            steps: [
            { text: 'Identify the two components — down payment (fixed) and instalments (AP). Down payment = ₹6,000.' },
            { text: 'Calculate sum of 12 instalments using Sₙ = n/2[2a + (n-1)d]. Substitute: S₁₂ = 12/2[2×1200 + (12-1)×100].' },
            { text: 'Simplify inside brackets: 2×1200 = 2400. (12-1)×100 = 11×100 = 1100. Sum = 2400 + 1100 = 3500.' },
            { text: 'Multiply: S₁₂ = 6 × 3500 = ₹21,000. This is the total of all 12 instalments.' },
            { text: 'Total cost under instalment plan = Down payment + Sum of instalments = 6000 + 21000 = ₹27,000.' },
            { text: 'Extra amount paid = Instalment total - Cash price = 27000 - 24000 = ₹3,000.', faded: true, blankAnswer: 'Total instalment cost = ₹27,000; Extra paid = ₹3,000.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_05_001', title: 'An Arithmetic Progression (AP) is a.',
          scaffold: { problem: 'A taxi charges ₹25 for the first kilometre and ₹12 for each additional kilometre. Write the fare for the first 6 kilometres as a sequence.',
            steps: [
            { text: 'Identify the fare for each kilometre. 1st km = ₹25. 2nd km = ₹25 + ₹12 = ₹37. 3rd km = ₹37 + ₹12 = ₹49.' },
            { text: 'Write the sequence of fares: 25, 37, 49, 61, 73, 85.' },
            { text: 'Compute consecutive differences: 37 - 25 = 12, 49 - 37 = 12, 61 - 49 = 12, 73 - 61 = 12, 85 - 73 = 12.' },
            { text: 'Since all differences are equal to 12, the sequence is an AP.' },
            { text: 'First term *a* = 25, common difference *d* = 12.', faded: true, blankAnswer: 'Sequence: 25, 37, 49, 61, 73, 85. Yes, it is an AP with *a*.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_05_002', title: 'An Arithmetic Progression (AP) in its.',
          scaffold: { problem: 'A construction company stacks steel pipes in layers. The bottom layer has 25 pipes.',
            steps: [
            { text: 'Identify the first term \\(a\\) and common difference \\(d\\) from the situation.' },
            { text: 'Write the general form using the template \\(a, a+d, a+2d, a+3d, \\dots\\).' },
            { text: 'Simplify each term to list the first 6 terms: 1st = 25; 2nd = 25 - 3 = 22; 3rd = 25 - 6 = 19; 4th = 25 - 9 = 16; 5th =.' },
            { text: 'To find the 8th layer, note that the 8th term corresponds to \\(n=8\\).' },
            { text: 'Compute: \\(25 + 7(-3) = 25 - 21 = 4\\). The 8th layer has 4 pipes.' },
            { text: 'Verify: The sequence decreases by 3 each time: 25, 22, 19, 16, 13, 10, 7, 4. The 8th term is indeed 4.', faded: true, blankAnswer: 'General form: \\(25, 25+(-3), 25+2(-3), 25+3(-3), \\dots\\) or.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_math_cbse_05_010', title: 'Identify each idea',
          dissect: { specimen: 'Sum of AP Given First Term, Last Term and Number of Terms', spots: [
            { id: 's1', label: 'The sum of the first', prompt: 'Which idea is this? — The sum of the first n terms of an arithmetic progression when the first term (a), the.', answer: 'The sum of the first', options: ['The sum of the first', 'In an Arithmetic Progression AP', 'Word problems on Arithmetic Progressions', 'Word problems on instalments and'] },
            { id: 's2', label: 'In an Arithmetic Progression AP', prompt: 'Which idea is this? — In an Arithmetic Progression (AP), the nth term a_n and the sum of the first n terms S_n.', answer: 'In an Arithmetic Progression AP', options: ['In an Arithmetic Progression AP', 'The sum of the first', 'Word problems on Arithmetic Progressions', 'Word problems on instalments and'] },
            { id: 's3', label: 'Word problems on Arithmetic Progressions', prompt: 'Which idea is this? — Word problems on Arithmetic Progressions involve translating a real-life situation where.', answer: 'Word problems on Arithmetic Progressions', options: ['Word problems on Arithmetic Progressions', 'The sum of the first', 'In an Arithmetic Progression AP', 'Word problems on instalments and'] },
            { id: 's4', label: 'Word problems on instalments and', prompt: 'Which idea is this? — Word problems on instalments and savings in Arithmetic Progressions involve real-life.', answer: 'Word problems on instalments and', options: ['Word problems on instalments and', 'The sum of the first', 'In an Arithmetic Progression AP', 'Word problems on Arithmetic Progressions'] },
            { id: 's5', label: 'An Arithmetic Progression AP is', prompt: 'Which idea is this? — An Arithmetic Progression (AP) is a sequence of numbers in which each term after the.', answer: 'An Arithmetic Progression AP is', options: ['An Arithmetic Progression AP is', 'The sum of the first', 'In an Arithmetic Progression AP', 'Word problems on Arithmetic Progressions'] },
            { id: 's6', label: 'An Arithmetic Progression AP in', prompt: 'Which idea is this? — An Arithmetic Progression (AP) in its general form is an ordered sequence of numbers.', answer: 'An Arithmetic Progression AP in', options: ['An Arithmetic Progression AP in', 'The sum of the first', 'In an Arithmetic Progression AP', 'Word problems on Arithmetic Progressions'] }
          ] } }
    ],
    explore: { component: C10_MathematicsGeometricProgressionFirstSim, prompt: 'Explore the interactive — Sum of AP Given First Term, Last Term and Number of Terms' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_05_009', difficulty: 'standard',
          question: 'The sum of the first n terms of an arithmetic progression when the first term.',
          hint: 'If stuck, revisit the pairing derivation in c10_math_cbse_05_008 and practice writing the.',
          misconception: 'Students often confuse the two sum formulas and use Sₙ = n/2 [2a + (n-1)d] even when the last term l is given, leading.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The sum of the first n terms of an arithmetic progression when the first term (a), the',
                  options: ['The sum of the first n terms of an arithmetic progression when the first term (a), the', 'In an Arithmetic Progression (AP), the nth term a_n and the sum of the first n terms S_n', 'Word problems on Arithmetic Progressions involve translating a real-life situation where', 'Word problems on instalments and savings in Arithmetic Progressions involve real-life'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the two sum formulas and use Sₙ = n/2 [2a + (n-1)d] even when the last term l is given, leading to unnecessary.' }
          ],
            remediations: { 'students-often-confuse-the-two': { steps: ['If a student forgets the division by 2, have them derive the formula again using the pairing method: write the AP.', 'Emphasise: "Two sums give n pairs, so one sum is half of that." For algebraic errors in distribution, practice the.', 'Do NOT distribute n into the bracket until the last step.', 'Drill 5 problems where n is even (so n/2 is integer) and 5 where n is odd (so compute (a+l) first, then multiply by n,.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_05_010', difficulty: 'standard',
          question: 'In an Arithmetic Progression (AP), the nth term a_n and the sum of the first n.',
          hint: 'Revisit c10_math_cbse_05_003 (nth term formula derivation) and c10_math_cbse_05_007 (sum.',
          misconception: 'Students often write a_n = S_n - S_{n-1} correctly but then substitute n=1 to get a_1 = S_1 - S_0, treating S_0 as 0.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In an Arithmetic Progression (AP), the nth term a_n and the sum of the first n terms S_n',
                  options: ['In an Arithmetic Progression (AP), the nth term a_n and the sum of the first n terms S_n', 'The sum of the first n terms of an arithmetic progression when the first term (a), the', 'Word problems on Arithmetic Progressions involve translating a real-life situation where', 'Word problems on instalments and savings in Arithmetic Progressions involve real-life'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write a_n = S_n - S_{n-1} correctly but then substitute n=1 to get a_1 = S_1 - S_0, treating S_0 as 0.' }
          ],
            remediations: { 'students-often-write-a-n': { steps: ['If a student uses S_0, ask: "What does S_0 mean?', 'Can you write the sum formula for n=0?" Show that S_n = n/2[2a+(n-1)d] gives 0/2 × [...] = 0 for n=0, but the formula.', 'So S_0 = 0 is a convention, not from the formula.', 'Then say: "For n=1, the formula a_n = S_n - S_{n-1} would need S_0.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_05_011', difficulty: 'standard',
          question: 'Word problems on Arithmetic Progressions involve translating a real-life.',
          hint: 'If stuck, revisit **c10_math_cbse_05_003** (nth term formula) and.',
          misconception: '**Misidentifying \'n\' in "find the number of terms" problems**: Students often treat the term number (e.g., "10th term").',
          parts: [
                { id: 'a', prompt: 'A student says: "The heights of students in a class form an AP because they increase." Explain why this reasoning is incorrect and state the precise condition.', answer: 'Heights of students do not necessarily increase by a constant difference',
                  options: ['Heights of students do not necessarily increase by a constant difference', 'increasing', 'constant difference'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misidentifying \'n\' in "find the number of terms" problems**: Students often treat the term number (e.g., "10th term") as the number of.' },
                { id: 'b', prompt: 'A contractor pays a penalty for delay: ₹200 for the first day, ₹250 for the second day, ₹300 for the third day, and so on.', answer: 'Given: a = 200, d = 50, n = 30',
                  options: ['Given: a = 200, d = 50, n = 30', 'first day = first term', 'increase per day = common difference'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misidentifying \'n\' in "find the number of terms" problems**: Students often treat the term number (e.g., "10th term") as the number of.' }
          ],
            remediations: { 'misidentifying-n-in-find-the': { steps: ['**Highlight keywords**: Circle "total", "sum", "cumulative", "altogether" → use SUM formula.', 'Circle "nth term", "amount in nth month", "value of nth item" → use TERM formula.', '**Draw a timeline**: Write Month 1, Month 2, Month 3 with amounts.', 'Ask: "Does the question ask for the Month 3 box (term) or the sum of all boxes up to Month 3 (sum)?" 3.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_05_012', difficulty: 'standard',
          question: 'Word problems on instalments and savings in Arithmetic Progressions involve.',
          hint: 'If stuck, revisit c10_math_cbse_05_007 (Sum formula) and c10_math_cbse_05_005 (Finding n).',
          misconception: 'Students treat the down payment / initial deposit as the first term of the AP instalment sequence.',
          parts: [
                { id: 'a', prompt: 'State the formula for the sum of first n terms of an AP when the first term is \'a\' and common difference is \'d\'.', answer: 'Sₙ = n/2[2a + (n-1)d]',
                  options: ['Sₙ = n/2[2a + (n-1)d]', 'total increase', 'monthly increase'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the down payment / initial deposit as the first term of the AP instalment sequence.' },
                { id: 'b', prompt: 'A student saves ₹200 in January and increases savings by ₹20 each month.', answer: 'Incorrect',
                  options: ['Incorrect', 'total = number of terms × (a + d)', '"total = number of terms × (a + d)" confusing d with the last term'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the down payment / initial deposit as the first term of the AP instalment sequence.' },
                { id: 'c', prompt: 'Ravi repays a loan in 10 instalments forming an AP. First instalment is ₹1,500 and last is ₹3,300.', answer: 'Given: n=10, a=1500, l=3300',
                  options: ['Given: n=10, a=1500, l=3300', 'n vs n-1'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the down payment / initial deposit as the first term of the AP instalment sequence.' }
          ],
            remediations: { 'students-treat-the-down-payment': { steps: ['Draw a timeline showing time 0 (down payment) and months 1,2,3... (instalments).', 'Ask: "Does the down payment increase next month?" No → not part of AP.', 'Circle only the instalment amounts — these form the AP.', 'Write separate statements: "Down payment = ₹X" and "Instalments form AP with a=..., d=..., n=...".', 'Compute Total = Down payment + Sₙ(instalments). Practice 5 problems where down payment exists and 5 where it doesn\'t,.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_05_001', difficulty: 'standard',
          question: 'An Arithmetic Progression (AP) is a sequence of numbers in which each term.',
          hint: 'Revisit integer subtraction (c7_math_ch10_003) and fraction/decimal subtraction.',
          misconception: 'Students often confuse "common difference" with "difference between first and last term" or "difference between any two.',
          parts: [
                { id: 'a', prompt: 'Is the sequence 2, 5, 8, 11, 14 an arithmetic progression? If yes, state the first term and the common difference.', answer: 'Yes, it is an AP',
                  options: ['Yes, it is an AP', 'common difference', 'difference between first and last term'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "common difference" with "difference between first and last term" or "difference between any two non-consecutive.' },
                { id: 'b', prompt: 'Two APs have the same common difference. The first term of the first AP is 5 and the first term of the second AP is 12.', answer: 'The difference between their 10th terms is 12 - 5 = 7',
                  options: ['The difference between their 10th terms is 12 - 5 = 7', 'common difference', 'difference between first and last term'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "common difference" with "difference between first and last term" or "difference between any two non-consecutive.' }
          ],
            remediations: { 'students-often-confuse-common-difference': { steps: ['Ask the student to write the sequence with term positions labelled: 1st, 2nd, 3rd, 4th.', 'Have them compute *only* consecutive differences: 2nd - 1st, 3rd - 2nd, 4th - 3rd.', 'Ask: "Are all three results exactly the same number?" If yes, that number is *d*. If no, it is not an AP.', 'Practice with sequences containing negative numbers, fractions, and decimals (e.g., -2, -0.5, 1, 2.5) to reinforce that.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "common difference" with "difference between first and last term" or "difference between any two.',
          parts: [
                { id: 'a', prompt: 'A student claims the sequence 5, 10, 20, 40, 80 is an AP because "each term increases." Evaluate this claim and identify the exact misconception.', answer: 'The claim is false',
                  options: ['The claim is false', 'increasing sequence', 'arithmetic progression', 'common difference'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "common difference" with "difference between first and last term" or "difference between any two non-consecutive.' },
                { id: 'b', prompt: 'Create an AP with first term -3 and common difference 1/2. Write the first 6 terms.', answer: 'First AP: -3, -2.5, -2, -1.5, -1, -0.5 (4th term = -1.5)',
                  options: ['First AP: -3, -2.5, -2, -1.5, -1, -0.5 (4th term = -1.5)', 'common difference', 'difference between first and last term', 'difference between any two non-consecutive terms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "common difference" with "difference between first and last term" or "difference between any two non-consecutive.' },
                { id: 'c', prompt: 'Two APs have the same common difference. The first term of the first AP is 5 and the first term of the second AP is 12.', answer: 'The difference between their 10th terms is 12 - 5 = 7',
                  options: ['The difference between their 10th terms is 12 - 5 = 7', 'common difference', 'difference between first and last term', 'difference between any two non-consecutive terms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "common difference" with "difference between first and last term" or "difference between any two non-consecutive.' }
          ],
            remediations: { 'students-often-confuse-common-difference': { steps: ['Ask the student to write the sequence with term positions labelled: 1st, 2nd, 3rd, 4th.', 'Have them compute *only* consecutive differences: 2nd - 1st, 3rd - 2nd, 4th - 3rd.', 'Ask: "Are all three results exactly the same number?" If yes, that number is *d*. If no, it is not an AP.', 'Practice with sequences containing negative numbers, fractions, and decimals (e.g., -2, -0.5, 1, 2.5) to reinforce that.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_05_002', difficulty: 'standard',
          question: 'An Arithmetic Progression (AP) in its general form is an ordered sequence of.',
          hint: 'Revisit Class 7 "Matchstick Patterns and Generalising with Variables" (c7_math_ch04_005).',
          misconception: '**Off-by-one error in the coefficient of \\(d\\):** Students write the \\(n\\)-th term in the general form as \\(a + nd\\).',
          parts: [
                { id: 'a', prompt: 'Two APs are given in general form: AP 1: \\(p, p+q, p+2q, p+3q, \\dots\\) AP 2: \\(2p, 2p+3q, 2p+6q, 2p+9q, \\dots\\) Compare the common differences and first terms.', answer: 'AP 1: first term \\(a_1 = p\\), common difference \\(d_1 = q\\)',
                  options: ['AP 1: first term \\(a_1 = p\\), common difference \\(d_1 = q\\)', 'AP 2 has larger first term so its 5th term is larger'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Off-by-one error in the coefficient of \\(d\\):** Students write the \\(n\\)-th term in the general form as \\(a + nd\\) instead of \\(a +.' }
          ],
            remediations: { 'off-by-one-error-in': { steps: ['Have the student write the first 5 terms of an AP with \\(a=10, d=4\\) as a list: 10, 14, 18, 22, 26.', 'Ask: "How many times did we add 4 to get the 1st term?" (0 times). "To get the 2nd term?" (1 time).', 'Make a two-column table: Term number \\(n\\) | Number of \\(d\\)\'s added. Fill: 1→0, 2→1, 3→2, 4→3, 5→4.', 'Ask the student to describe the pattern: "Number of \\(d\\)\'s added = \\(n-1\\)".', 'Now write the general form using this: \\(a, a+d, a+2d, a+3d, a+4d, \\dots\\) and explicitly state: "The coefficient of.', 'Practice with 3 examples where the student must write the \\(n\\)-th term in general form notation (e.g., "Write the 7th.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Off-by-one error in the coefficient of \\(d\\):** Students write the \\(n\\)-th term in the general form as \\(a + nd\\).',
          parts: [
                { id: 'a', prompt: 'Two APs are given in general form: AP 1: \\(p, p+q, p+2q, p+3q, \\dots\\) AP 2: \\(2p, 2p+3q, 2p+6q, 2p+9q, \\dots\\) Compare the common differences and first terms.', answer: 'AP 1: first term \\(a_1 = p\\), common difference \\(d_1 = q\\)',
                  options: ['AP 1: first term \\(a_1 = p\\), common difference \\(d_1 = q\\)', 'AP 2 has larger first term so its 5th term is larger'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Off-by-one error in the coefficient of \\(d\\):** Students write the \\(n\\)-th term in the general form as \\(a + nd\\) instead of \\(a +.' }
          ],
            remediations: { 'off-by-one-error-in': { steps: ['Have the student write the first 5 terms of an AP with \\(a=10, d=4\\) as a list: 10, 14, 18, 22, 26.', 'Ask: "How many times did we add 4 to get the 1st term?" (0 times). "To get the 2nd term?" (1 time).', 'Make a two-column table: Term number \\(n\\) | Number of \\(d\\)\'s added. Fill: 1→0, 2→1, 3→2, 4→3, 5→4.', 'Ask the student to describe the pattern: "Number of \\(d\\)\'s added = \\(n-1\\)".', 'Now write the general form using this: \\(a, a+d, a+2d, a+3d, a+4d, \\dots\\) and explicitly state: "The coefficient of.', 'Practice with 3 examples where the student must write the \\(n\\)-th term in general form notation (e.g., "Write the 7th.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
