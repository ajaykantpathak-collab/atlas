import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch05_p2: SimDef = {
    id: 'v3_c10_math_ch05_p2',
    title: 'Arithmetic Progressions · Part 2/2',
    subtitle: 'Predict term 1000 of a pattern without counting past 5',
    classLevel: 10, subject: 'mathematics', topic: 'Arithmetic Progressions · Part 2/2',
    chapters: ['c10_math_ch05'],
    nodeIds: ['c10_math_cbse_05_007', 'c10_math_cbse_05_008', 'c10_math_cbse_05_009', 'c10_math_cbse_05_010', 'c10_math_cbse_05_011', 'c10_math_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a pattern hunter', intro: 'Your pocket money grows by a fixed amount, the cinema rows add fixed seats, your repayments shrink by a fixed sum. Somewhere in these lists is one magic number — d — that controls everything.', goal: 'Identify arithmetic progressions, apply the nth term and sum formulas, and model real situations with APs.' },
    discovery: {
        question: 'A salary starts at ₹20,000 and rises by ₹1,500 every year. A savings jar gets ₹10 more each week. A staircase adds one step per floor. What single test reveals all three follow the same hidden pattern?',
        options: ['Check if consecutive terms differ by the same fixed number — if yes, it\'s an arithmetic progression with a predictable nth term', 'Check if every term is a prime number', 'Check if each term doubles the previous one', 'Check if the digits of each term add to nine'],
        answer: 'Check if consecutive terms differ by the same fixed number — if yes, it\'s an arithmetic progression with a predictable nth term',
        hook: 'Fixed increments hide everywhere — EMIs, seating rows, savings plans. Spot the constant difference and the 100th term is a formula away, no counting needed.',
    },
    teaching: [
        { title: 'Sum of First n Terms of an AP: Formula', text: 'The sum of the first \\(n\\) terms of an arithmetic progression (AP) with first term \\(a\\) and common difference \\(d\\) is given by the formula \\(S_n = \\frac{n}{2} [2a + (n-1)d]\\).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_05_007', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Hunt the common difference in real-world lists, predict the 50th or 100th term without writing them all, and sum entire progressions with a two-line formula.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_05_007', title: 'Sum of First n Terms of an AP: Formula',
          scaffold: { problem: 'A contractor pays a penalty for delay: ₹2000 for the first day, ₹2500 for the second day, ₹3000 for the third day, and so on.',
            steps: [
            { text: 'Identify the AP parameters from the problem. The penalties form an AP: first term \\(a = 2000\\), common difference \\(d.' },
            { text: 'Choose the sum formula. Since \\(a, d, n\\) are known, use \\(S_n = \\frac{n}{2}[2a + (n-1)d]\\).' },
            { text: 'Substitute the values into the formula: \\(S_{12} = \\frac{12}{2}[2(2000) + (12-1)500]\\).' },
            { text: 'Simplify step by step. First, \\(\\frac{12}{2} = 6\\). Inside the bracket: \\(2(2000) = 4000\\).' },
            { text: 'Multiply: \\(S_{12} = 6 \\times 9500 = 57000\\). State the answer with units: Total penalty = ₹57,000.', faded: true, blankAnswer: '₹57,000' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_05_008', title: 'Sum of First n Terms of an AP: Derivation',
          scaffold: { problem: 'A student saves ₹10 on the first day, ₹15 on the second day, ₹20 on the third day, and continues this pattern for 12 days.',
            steps: [
            { text: 'Identify the AP parameters: first term a = 10, common difference d = 5, number of terms n = 12.' },
            { text: 'Write the sum forward: S_12 = 10 + 15 + 20 + ... + [10 + 11×5]. Calculate the last term: 10 + 55 = 65.' },
            { text: 'Write the sum in reverse: S_12 = 65 + 60 + 55 + ... + 10.' },
            { text: 'Add the two equations term by term: 2S_12 = (10+65) + (15+60) + (20+55) + ... + (65+10). Each pair sums to 75.' },
            { text: 'There are 12 pairs, so 2S_12 = 12 × 75 = 900. Therefore S_12 = 900/2 = 450.', faded: true, blankAnswer: 'Total savings = ₹450.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_05_009', title: 'Sum of AP Given First Term, Last Term and Number of Terms',
          scaffold: { problem: 'A school auditorium has rows of seats arranged such that the first row has 18 seats and each subsequent row has 2 more seats than the.',
            steps: [
            { text: 'Identify the given values. The seats form an AP. First term a = 18. Last term l = 56.' },
            { text: 'Find n using the nth term formula l = a + (n-1)d. Substitute: 56 = 18 + (n-1) × 2.' },
            { text: 'Solve for n. 56 - 18 = (n-1) × 2 → 38 = 2(n-1) → n-1 = 19 → n = 20. So there are 20 rows.' },
            { text: 'Now use the sum formula Sₙ = n/2 (a + l). Substitute n = 20, a = 18, l = 56: S₂₀ = 20/2 × (18 + 56) = 10 × 74 = 740.' },
            { text: 'Interpret the result. Total seats = 740. Verify: The sequence is 18, 20, 22, ..., 56.', faded: true, blankAnswer: '740 seats' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_05_010', title: 'Relationship Between nth Term and Sum of First n Terms',
          scaffold: { problem: 'The sum of first n terms of an AP is given by S_n = 4n^2 - n. Find the AP (i.e., find the first term a and common difference d), and hence.',
            steps: [
            { text: 'Identify what is given — S_n = 4n^2 - n. We need to find a, d, and a_15.' },
            { text: 'Find the first term a = a_1 = S_1. Substitute n=1: S_1 = 4(1)^2 - 1 = 4 - 1 = 3. So a = 3.' },
            { text: 'Find a general expression for a_n using a_n = S_n - S_{n-1}. First compute S_{n-1} = 4(n-1)^2 - (n-1) = 4(n^2 - 2n + 1).' },
            { text: 'Subtract: a_n = S_n - S_{n-1} = (4n^2 - n) - (4n^2 - 9n + 5) = 4n^2 - n - 4n^2 + 9n - 5 = 8n - 5.' },
            { text: 'Identify the common difference d. Since a_n = 8n - 5 is linear in n, the coefficient of n is d = 8.' },
            { text: 'Find the 15th term: a_15 = 8(15) - 5 = 120 - 5 = 115. Alternatively, a_15 = a + 14d = 3 + 14(8) = 3 + 112 = 115.', faded: true, blankAnswer: 'The AP is 3, 11, 19, 27, ... with a = 3, d = 8. The 15th.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_05_011', title: 'Word Problems: AP in Real-Life Situations',
          scaffold: { problem: 'A school awards cash prizes to the top 5 students in a competition.',
            steps: [
            { text: 'Identify the pattern. Prizes: 1st = 5000, 2nd = 4500, 3rd = 4000... Difference = -500 (constant).' },
            { text: 'Find each prize (terms 1 to 5) using nth term formula \\(a_n = a + (n-1)d\\).' },
            { text: 'Find total amount awarded using sum formula \\(S_n = \\frac{n}{2}(a + l)\\) where l = last term = 3000.' },
            { text: 'Verify using the other sum formula: \\(S_5 = \\frac{5}{2}[2(5000) + 4(-500)] = 2.5[10000 - 2000] = 2.5 \\times 8000.' },
            { text: 'State answer with units. Prizes: ₹5000, ₹4500, ₹4000, ₹3500, ₹3000. Total = ₹20,000.', faded: true, blankAnswer: 'Prizes: ₹5000, ₹4500, ₹4000, ₹3500, ₹3000. Total amount.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_05_012', title: 'Word Problems: Instalments and Savings in AP',
          scaffold: { problem: 'Mrs. Sharma buys a refrigerator for ₹24,000. She pays ₹6,000 cash down payment and agrees to pay the balance in 12 monthly instalments.',
            steps: [
            { text: 'Identify the two components — down payment (fixed) and instalments (AP). Down payment = ₹6,000.' },
            { text: 'Calculate sum of 12 instalments using Sₙ = n/2[2a + (n-1)d]. Substitute: S₁₂ = 12/2[2×1200 + (12-1)×100].' },
            { text: 'Simplify inside brackets: 2×1200 = 2400. (12-1)×100 = 11×100 = 1100. Sum = 2400 + 1100 = 3500.' },
            { text: 'Multiply: S₁₂ = 6 × 3500 = ₹21,000. This is the total of all 12 instalments.' },
            { text: 'Total cost under instalment plan = Down payment + Sum of instalments = 6000 + 21000 = ₹27,000.' },
            { text: 'Extra amount paid = Instalment total - Cash price = 27000 - 24000 = ₹3,000.', faded: true, blankAnswer: 'Total instalment cost = ₹27,000; Extra paid = ₹3,000.' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_05_012', title: 'Rapid check',
          drill: { kind: 'exponent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A student tracks her savings account: ₹5000, ₹5500, ₹6050, ₹6655 at the end of four years. She tells her brother, \'It goes up every year, so it\'s an arithmetic progression — I can predict any year by adding.\'',
            decisions: [{ prompt: 'Is she right that this is an AP?', options: [
                { text: 'No — an AP needs a constant common difference, but here the gaps are 500, 550 and 605: they grow each year because the balance increases by a percentage, not a fixed amount. It is actually a geometric pattern (each term is 1.1 times the last), so predicting requires multiplying, not adding.', outcome: 'Checking the differences — not just whether terms rise — is the test for an AP. Equal growth in amount is additive; equal growth in rate is multiplicative.' },
                { text: 'She is right — any sequence that keeps increasing is an arithmetic progression.', outcome: 'Increasing is not the test — the increase itself must be the same each time; here it changes from 500 to 550 to 605.', reveals: 'increasing-means-ap' },
                { text: 'It is an AP as long as the differences are positive — they do not need to be equal.', outcome: 'Equal differences are the definition of an AP; positive but unequal gaps make it some other progression entirely.', reveals: 'positive-gaps-make-ap' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_05_012', title: 'You made it',
          caseStudy: { intro: 'An AP is a straight line wearing a sequence\'s clothes. Find a and d, and every term — and every total — surrenders to one formula each.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_05_007', difficulty: 'standard',
          question: 'The sum of the first \\(n\\) terms of an arithmetic progression (AP) with first.',
          hint: 'If stuck, revisit the nth term formula (node c10_math_cbse_05_003) and practice finding.',
          misconception: 'Students often write the sum formula as \\(S_n = n[2a + (n-1)d]\\) (missing the division by 2) because they forget that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The sum of the first \\(n\\) terms of an arithmetic progression (AP) with first term \\(a\\)',
                  options: ['The sum of the first \\(n\\) terms of an arithmetic progression (AP) with first term \\(a\\)', 'An Arithmetic Progression (AP) is a sequence of numbers in', 'An Arithmetic Progression (AP) in its general form is an ordered sequence of numbers', 'The nth term of an arithmetic progression (AP) is the general term that gives the value'],
                  hint: 'If stuck, revisit the nth term formula (node c10_math_cbse_05_003) and practice finding the last.',
                  misconception: 'Students often write the sum formula as \\(S_n = n[2a + (n-1)d]\\) (missing the division by 2) because they forget that the pairing method.' }
          ],
            remediations: { 'students-often-write-the-sum': { steps: ['If the student misses the factor \\(\\frac{1}{2}\\), ask them to write the sum forwards and backwards for a small.', 'Show that each column sums to \\(a+l = 13\\) and there are \\(n=4\\) columns, so total sum is \\(4 \\times 13 = 52\\), but.', 'For the off-by-one error in \\(l\\), have them list the terms for \\(n=3\\): \\(a, a+d, a+2d\\).', 'The last term is \\(a+2d = a+(3-1)d\\).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_05_008', difficulty: 'standard',
          question: 'The sum of the first n terms of an arithmetic progression (AP) is derived.',
          hint: 'If stuck, revisit the nth term formula (c10_math_cbse_05_003) and practice writing the.',
          misconception: 'Students often write the last term as a + nd instead of a + (n-1)d, leading to the pair sum 2a + nd and the incorrect.',
          parts: [
                { id: 'a', prompt: 'When adding the forward and reverse sums term by term, why does each pair sum to the same value 2a + (n-1)d? Explain using the terms from the two expansions.', answer: 'The kth term from the forward sum is a+(k-1)d',
                  options: ['The kth term from the forward sum is a+(k-1)d', 'it sums to 2a+nd or depending on k'],
                  hint: 'If stuck, revisit the nth term formula (c10_math_cbse_05_003) and practice writing the first 5.',
                  misconception: 'Students often write the last term as a + nd instead of a + (n-1)d, leading to the pair sum 2a + nd and the incorrect formula S_n = n/2[2a.' },
                { id: 'b', prompt: 'A student writes the sum of an AP as S_n = n/2[2a + nd]. Identify the error by comparing with the correct derivation and give the correct formula.', answer: 'The error is using nd instead of (n-1)d',
                  options: ['The error is using nd instead of (n-1)d', 'the formula is correct or pointing to a different error'],
                  hint: 'If stuck, revisit the nth term formula (c10_math_cbse_05_003) and practice writing the first 5.',
                  misconception: 'Students often write the last term as a + nd instead of a + (n-1)d, leading to the pair sum 2a + nd and the incorrect formula S_n = n/2[2a.' }
          ],
            remediations: { 'students-often-write-the-last': { steps: ['If a student uses a+nd as the last term, ask: "Write the first 4 terms of an AP with a=2, d=3.', 'Is it 2+4×3 or 2+3×3?" Guide them to see the pattern: 1st term: a+0d, 2nd: a+1d, 3rd: a+2d, so nth term: a+(n-1)d.', 'Then redo the pairing with the correct last term to get the correct sum.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_05_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the last term as a + nd instead of a + (n-1)d, leading to the pair sum 2a + nd and the incorrect.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether the following derivation step is valid: "2S_n = n × [a + (a+(n-1)d)] because there are n terms each summing to a + l." Justify your answer.', answer: 'Yes, it is valid',
                  options: ['Yes, it is valid', 'there are n-1 pairs or the sum is a + (a+nd'],
                  hint: 'If stuck, revisit the nth term formula (c10_math_cbse_05_003) and practice writing the first 5.',
                  misconception: 'Students often write the last term as a + nd instead of a + (n-1)d, leading to the pair sum 2a + nd and the incorrect formula S_n = n/2[2a.' }
          ],
            remediations: { 'students-often-write-the-last': { steps: ['If a student uses a+nd as the last term, ask: "Write the first 4 terms of an AP with a=2, d=3.', 'Is it 2+4×3 or 2+3×3?" Guide them to see the pattern: 1st term: a+0d, 2nd: a+1d, 3rd: a+2d, so nth term: a+(n-1)d.', 'Then redo the pairing with the correct last term to get the correct sum.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_05_009', difficulty: 'standard',
          question: 'The sum of the first n terms of an arithmetic progression when the first term.',
          hint: 'If stuck, revisit the pairing derivation in c10_math_cbse_05_008 and practice writing the.',
          misconception: 'Students often confuse the two sum formulas and use Sₙ = n/2 [2a + (n-1)d] even when the last term l is given, leading.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The sum of the first n terms of an arithmetic progression when the first term (a), the',
                  options: ['The sum of the first n terms of an arithmetic progression when the first term (a), the', 'An Arithmetic Progression (AP) is a sequence of numbers in', 'An Arithmetic Progression (AP) in its general form is an ordered sequence of numbers', 'The nth term of an arithmetic progression (AP) is the general term that gives the value'],
                  hint: 'If stuck, revisit the pairing derivation in c10_math_cbse_05_008 and practice writing the sequence.',
                  misconception: 'Students often confuse the two sum formulas and use Sₙ = n/2 [2a + (n-1)d] even when the last term l is given, leading to unnecessary.' }
          ],
            remediations: { 'students-often-confuse-the-two': { steps: ['If a student forgets the division by 2, have them derive the formula again using the pairing method: write the.', 'Emphasise: "Two sums give n pairs, so one sum is half of that." For algebraic errors in distribution, practice the.', 'Do NOT distribute n into the bracket until the last step.', 'Drill 5 problems where n is even (so n/2 is integer) and 5 where n is odd (so compute (a+l) first, then multiply by.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_05_010', difficulty: 'standard',
          question: 'In an Arithmetic Progression (AP), the nth term a_n and the sum of the first.',
          hint: 'Revisit c10_math_cbse_05_003 (nth term formula derivation) and c10_math_cbse_05_007 (sum.',
          misconception: 'Students often write a_n = S_n - S_{n-1} correctly but then substitute n=1 to get a_1 = S_1 - S_0, treating S_0 as 0.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In an Arithmetic Progression (AP), the nth term a_n and the sum of the first n terms S_n',
                  options: ['In an Arithmetic Progression (AP), the nth term a_n and the sum of the first n terms S_n', 'An Arithmetic Progression (AP) is a sequence of numbers in', 'An Arithmetic Progression (AP) in its general form is an ordered sequence of numbers', 'The nth term of an arithmetic progression (AP) is the general term that gives the value'],
                  hint: 'Revisit c10_math_cbse_05_003 (nth term formula derivation) and c10_math_cbse_05_007 (sum formula).',
                  misconception: 'Students often write a_n = S_n - S_{n-1} correctly but then substitute n=1 to get a_1 = S_1 - S_0, treating S_0 as 0.' }
          ],
            remediations: { 'students-often-write-a-n': { steps: ['If a student uses S_0, ask: "What does S_0 mean?', 'Can you write the sum formula for n=0?" Show that S_n = n/2[2a+(n-1)d] gives 0/2 × [...] = 0 for n=0, but the formula.', 'So S_0 = 0 is a convention, not from the formula.', 'Then say: "For n=1, the formula a_n = S_n - S_{n-1} would need S_0.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_05_011', difficulty: 'standard',
          question: 'Word problems on Arithmetic Progressions involve translating a real-life.',
          hint: 'If stuck, revisit **c10_math_cbse_05_003** (nth term formula) and.',
          misconception: '**Misidentifying \'n\' in "find the number of terms" problems**: Students often treat the term number (e.g., "10th term").',
          parts: [
                { id: 'a', prompt: 'A student says: "The heights of students in a class form an AP because they increase." Explain why this reasoning is incorrect and state the precise condition.', answer: 'Heights of students do not necessarily increase by a constant difference',
                  options: ['Heights of students do not necessarily increase by a constant difference', 'increasing', 'constant difference'],
                  hint: 'If stuck, revisit **c10_math_cbse_05_003** (nth term formula) and **c10_math_cbse_05_007** (sum.',
                  misconception: '**Misidentifying \'n\' in "find the number of terms" problems**: Students often treat the term number (e.g., "10th term") as the number.' },
                { id: 'b', prompt: 'A contractor pays a penalty for delay: ₹200 for the first day, ₹250 for the second day, ₹300 for the third day, and so on.', answer: 'Given: a = 200, d = 50, n = 30',
                  options: ['Given: a = 200, d = 50, n = 30', 'first day = first term', 'increase per day = common difference'],
                  hint: 'If stuck, revisit **c10_math_cbse_05_003** (nth term formula) and **c10_math_cbse_05_007** (sum.',
                  misconception: '**Misidentifying \'n\' in "find the number of terms" problems**: Students often treat the term number (e.g., "10th term") as the number.' }
          ],
            remediations: { 'misidentifying-n-in-find-the': { steps: ['**Highlight keywords**: Circle "total", "sum", "cumulative", "altogether" → use SUM formula.', 'Circle "nth term", "amount in nth month", "value of nth item" → use TERM formula.', '**Draw a timeline**: Write Month 1, Month 2, Month 3 with amounts.', 'Ask: "Does the question ask for the Month 3 box (term) or the sum of all boxes up to Month 3 (sum)?" 3.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_05_012', difficulty: 'standard',
          question: 'Word problems on instalments and savings in Arithmetic Progressions involve.',
          hint: 'If stuck, revisit c10_math_cbse_05_007 (Sum formula) and c10_math_cbse_05_005 (Finding n).',
          misconception: 'Students treat the down payment / initial deposit as the first term of the AP instalment sequence.',
          parts: [
                { id: 'a', prompt: 'State the formula for the sum of first n terms of an AP when the first term is \'a\' and common difference is \'d\'.', answer: 'Sₙ = n/2[2a + (n-1)d]',
                  options: ['Sₙ = n/2[2a + (n-1)d]', 'total increase', 'monthly increase'],
                  hint: 'If stuck, revisit c10_math_cbse_05_007 (Sum formula) and c10_math_cbse_05_005 (Finding n).',
                  misconception: 'Students treat the down payment / initial deposit as the first term of the AP instalment sequence.' },
                { id: 'b', prompt: 'A student saves ₹200 in January and increases savings by ₹20 each month.', answer: 'Incorrect',
                  options: ['Incorrect', 'total = number of terms × (a + d)', '"total = number of terms × (a + d)" confusing d with the last term'],
                  hint: 'If stuck, revisit c10_math_cbse_05_007 (Sum formula) and c10_math_cbse_05_005 (Finding n).',
                  misconception: 'Students treat the down payment / initial deposit as the first term of the AP instalment sequence.' },
                { id: 'c', prompt: 'Ravi repays a loan in 10 instalments forming an AP. First instalment is ₹1,500 and last is ₹3,300.', answer: 'Given: n=10, a=1500, l=3300',
                  options: ['Given: n=10, a=1500, l=3300', 'n vs n-1'],
                  hint: 'If stuck, revisit c10_math_cbse_05_007 (Sum formula) and c10_math_cbse_05_005 (Finding n).',
                  misconception: 'Students treat the down payment / initial deposit as the first term of the AP instalment sequence.' }
          ],
            remediations: { 'students-treat-the-down-payment': { steps: ['Draw a timeline showing time 0 (down payment) and months 1,2,3... (instalments).', 'Ask: "Does the down payment increase next month?" No → not part of AP.', 'Circle only the instalment amounts — these form the AP.', 'Write separate statements: "Down payment = ₹X" and "Instalments form AP with a=..., d=..., n=...".'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
