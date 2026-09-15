import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch05_p1: SimDef = {
    id: 'v3_c10_math_ch05_p1',
    title: 'Arithmetic Progressions · Part 1/2',
    subtitle: 'Predict term 1000 of a pattern without counting past 5',
    classLevel: 10, subject: 'mathematics', topic: 'Arithmetic Progressions · Part 1/2',
    chapters: ['c10_math_ch05'],
    nodeIds: ['c10_math_cbse_05_001', 'c10_math_cbse_05_002', 'c10_math_cbse_05_003', 'c10_math_cbse_05_004', 'c10_math_cbse_05_005', 'c10_math_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a pattern hunter', intro: 'Your pocket money grows by a fixed amount, the cinema rows add fixed seats, your repayments shrink by a fixed sum. Somewhere in these lists is one magic number — d — that controls everything.', goal: 'Identify arithmetic progressions, apply the nth term and sum formulas, and model real situations with APs.' },
    discovery: {
        question: 'A salary starts at ₹20,000 and rises by ₹1,500 every year. A savings jar gets ₹10 more each week. A staircase adds one step per floor. What single test reveals all three follow the same hidden pattern?',
        options: ['Check if consecutive terms differ by the same fixed number — if yes, it\'s an arithmetic progression with a predictable nth term', 'Check if every term is a prime number', 'Check if each term doubles the previous one', 'Check if the digits of each term add to nine'],
        answer: 'Check if consecutive terms differ by the same fixed number — if yes, it\'s an arithmetic progression with a predictable nth term',
        hook: 'Fixed increments hide everywhere — EMIs, seating rows, savings plans. Spot the constant difference and the 100th term is a formula away, no counting needed.',
    },
    teaching: [
        { title: 'Arithmetic Progression: Definition and Common Difference', text: 'An Arithmetic Progression (AP) is a sequence of numbers in which each term after the first is obtained by adding a fixed number, called the common difference (denoted by *d*), to the preceding term.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_05_001', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Hunt the common difference in real-world lists, predict the 50th or 100th term without writing them all, and sum entire progressions with a two-line formula.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_05_001', title: 'Arithmetic Progression: Definition and Common Difference',
          scaffold: { problem: 'A taxi charges ₹25 for the first kilometre and ₹12 for each additional kilometre. Write the fare for the first 6 kilometres as a sequence.',
            steps: [
            { text: 'Identify the fare for each kilometre. 1st km = ₹25. 2nd km = ₹25 + ₹12 = ₹37. 3rd km = ₹37 + ₹12 = ₹49.' },
            { text: 'Write the sequence of fares: 25, 37, 49, 61, 73, 85.' },
            { text: 'Compute consecutive differences: 37 - 25 = 12, 49 - 37 = 12, 61 - 49 = 12, 73 - 61 = 12, 85 - 73 = 12.' },
            { text: 'Since all differences are equal to 12, the sequence is an AP.' },
            { text: 'First term *a* = 25, common difference *d* = 12.', faded: true, blankAnswer: 'Sequence: 25, 37, 49, 61, 73, 85. Yes, it is an AP with *a*.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_05_002', title: 'General Form of an AP: a, a+d, a+2d, ...',
          scaffold: { problem: 'A construction company stacks steel pipes in layers. The bottom layer has 25 pipes.',
            steps: [
            { text: 'Identify the first term \\(a\\) and common difference \\(d\\) from the situation.' },
            { text: 'Write the general form using the template \\(a, a+d, a+2d, a+3d, \\dots\\).' },
            { text: 'Simplify each term to list the first 6 terms: 1st = 25; 2nd = 25 - 3 = 22; 3rd = 25 - 6 = 19; 4th = 25 - 9 = 16; 5th.' },
            { text: 'To find the 8th layer, note that the 8th term corresponds to \\(n=8\\).' },
            { text: 'Compute: \\(25 + 7(-3) = 25 - 21 = 4\\). The 8th layer has 4 pipes.' },
            { text: 'Verify: The sequence decreases by 3 each time: 25, 22, 19, 16, 13, 10, 7, 4. The 8th term is indeed 4.', faded: true, blankAnswer: 'General form: \\(25, 25+(-3), 25+2(-3), 25+3(-3), \\dots\\).' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_05_003', title: 'nth Term of an AP: Formula and Derivation',
          scaffold: { problem: 'A school offers a scholarship where the amount increases by ₹500 every year. The first year\'s scholarship is ₹2000.',
            steps: [
            { text: 'Identify the given values. The scholarship amounts form an AP. First term \\(a = 2000\\) (amount in year 1).' },
            { text: 'Recall the nth term formula for an AP: \\(a_n = a + (n-1)d\\).' },
            { text: 'Substitute the known values into the formula: \\(a_{12} = 2000 + (12-1) \\times 500\\).' },
            { text: 'Compute step by step: \\(12-1 = 11\\); \\(11 \\times 500 = 5500\\); \\(2000 + 5500 = 7500\\).' },
            { text: 'Interpret the result with units: The scholarship amount in the 12th year will be ₹7500.', faded: true, blankAnswer: '₹7500' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_05_004', title: 'nth Term of an AP: Finding Unknown Terms',
          scaffold: { problem: 'A theatre has 30 seats in the first row, 34 seats in the second row, 38 seats in the third row, and so on.',
            steps: [
            { text: 'Identify the given information and what is asked. The seats per row form an AP.' },
            { text: 'Recall the nth term formula for an AP: \\(a_n = a + (n-1)d\\). This formula gives the value of the term at position \\(n\\).' },
            { text: 'Substitute the known values into the formula. Here \\(n = 15\\), \\(a = 30\\), \\(d = 4\\).' },
            { text: 'Simplify the expression step by step. First compute \\((15-1) = 14\\). Then \\(14 \\times 4 = 56\\). Then \\(30 + 56 = 86\\).' },
            { text: 'Interpret the result with units. The 15th row has 86 seats. Since the number of seats must be a positive integer and.' },
            { text: 'Verify by checking the pattern. Row 1: 30, Row 2: 34, Row 3: 38, Row 4: 42, Row 5: 46.', faded: true, blankAnswer: '86 seats' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_05_005', title: 'Finding the Number of Terms in a Given AP',
          scaffold: { problem: 'A school auditorium has rows of seats arranged such that the first row has 20 seats and each subsequent row has 2 more seats than the.',
            steps: [
            { text: 'Identify the given values. The number of seats in the first row is the first term \\(a = 20\\).' },
            { text: 'Choose the appropriate formula. Since we know \\(a\\), \\(d\\), and \\(a_n\\), we use the \\(n\\)th term formula \\(a_n =.' },
            { text: 'Substitute the known values into the formula: \\(50 = 20 + (n-1) \\times 2\\).' },
            { text: 'Solve the linear equation step by step. Subtract 20 from both sides: \\(30 = (n-1) \\times 2\\).' },
            { text: 'Interpret the result. \\(n = 16\\) is a positive integer, so there are 16 rows.', faded: true, blankAnswer: '16 rows' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_05_006', title: 'Finding the nth Term from the End of an AP',
          scaffold: { problem: 'A contractor pays a penalty for delay in construction: ₹200 for the first day, ₹250 for the second day, ₹300 for the third day, and so on.',
            steps: [
            { text: 'Identify the AP parameters. The penalty forms an AP with first term a = 200, common difference d = 50.' },
            { text: 'Find the last term l (penalty on 30th day) using l = a + (n - 1)d.' },
            { text: 'Apply the formula for kth term from the end: l - (k - 1)d. Here k = 5, so penalty = 1650 - (5 - 1) × 50 = 1650 - 4 × 50.' },
            { text: 'Verify using the alternative formula a + (n - k)d. Position from beginning = n - k + 1 = 30 - 5 + 1 = 26th term.' },
            { text: 'State the final answer with units. The penalty for the 5th day from the last day is ₹1450.', faded: true, blankAnswer: '₹1450' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_05_006', title: 'Rapid check',
          drill: { kind: 'exponent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student tracks her savings account: ₹5000, ₹5500, ₹6050, ₹6655 at the end of four years. She tells her brother, \'It goes up every year, so it\'s an arithmetic progression — I can predict any year by adding.\'',
            decisions: [{ prompt: 'Is she right that this is an AP?', options: [
                { text: 'No — an AP needs a constant common difference, but here the gaps are 500, 550 and 605: they grow each year because the balance increases by a percentage, not a fixed amount. It is actually a geometric pattern (each term is 1.1 times the last), so predicting requires multiplying, not adding.', outcome: 'Checking the differences — not just whether terms rise — is the test for an AP. Equal growth in amount is additive; equal growth in rate is multiplicative.' },
                { text: 'She is right — any sequence that keeps increasing is an arithmetic progression.', outcome: 'Increasing is not the test — the increase itself must be the same each time; here it changes from 500 to 550 to 605.', reveals: 'increasing-means-ap' },
                { text: 'It is an AP as long as the differences are positive — they do not need to be equal.', outcome: 'Equal differences are the definition of an AP; positive but unequal gaps make it some other progression entirely.', reveals: 'positive-gaps-make-ap' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'An AP is a straight line wearing a sequence\'s clothes. Find a and d, and every term — and every total — surrenders to one formula each.',
            decisions: [{ prompt: 'What comes next? Arithmetic Progressions · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Arithmetic Progressions · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_05_001', difficulty: 'standard',
          question: 'An Arithmetic Progression (AP) is a sequence of numbers in which each term.',
          hint: 'Revisit integer subtraction (c7_math_ch10_003) and fraction/decimal subtraction.',
          misconception: 'Students often confuse "common difference" with "difference between first and last term" or "difference between any two.',
          parts: [
                { id: 'a', prompt: 'Is the sequence 2, 5, 8, 11, 14 an arithmetic progression? If yes, state the first term and the common difference.', answer: 'Yes, it is an AP',
                  options: ['Yes, it is an AP', 'common difference', 'difference between first and last term', 'difference between any two non-consecutive terms'],
                  hint: 'Revisit integer subtraction (c7_math_ch10_003) and fraction/decimal subtraction (c7_math_ch03_009).',
                  misconception: 'Students often confuse "common difference" with "difference between first and last term" or "difference between any two non-consecutive.' },
                { id: 'b', prompt: 'Two APs have the same common difference. The first term of the first AP is 5 and the first term of the second AP is 12.', answer: 'The difference between their 10th terms is 12 - 5 = 7',
                  options: ['The difference between their 10th terms is 12 - 5 = 7', 'common difference', 'difference between first and last term', 'difference between any two non-consecutive terms'],
                  hint: 'Revisit integer subtraction (c7_math_ch10_003) and fraction/decimal subtraction (c7_math_ch03_009).',
                  misconception: 'Students often confuse "common difference" with "difference between first and last term" or "difference between any two non-consecutive.' }
          ],
            remediations: { 'students-often-confuse-common-difference': { steps: ['Ask the student to write the sequence with term positions labelled: 1st, 2nd, 3rd, 4th.', 'Have them compute *only* consecutive differences: 2nd - 1st, 3rd - 2nd, 4th - 3rd.', 'Ask: "Are all three results exactly the same number?" If yes, that number is *d*. If no, it is not an AP.', 'Practice with sequences containing negative numbers, fractions, and decimals (e.g., -2, -0.5, 1, 2.5) to reinforce that.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "common difference" with "difference between first and last term" or "difference between any two.',
          parts: [
                { id: 'a', prompt: 'A student claims the sequence 5, 10, 20, 40, 80 is an AP because "each term increases." Evaluate this claim and identify the exact misconception.', answer: 'The claim is false',
                  options: ['The claim is false', 'increasing sequence', 'arithmetic progression', 'common difference'],
                  hint: 'Revisit integer subtraction (c7_math_ch10_003) and fraction/decimal subtraction (c7_math_ch03_009).',
                  misconception: 'Students often confuse "common difference" with "difference between first and last term" or "difference between any two non-consecutive.' },
                { id: 'b', prompt: 'Create an AP with first term -3 and common difference 1/2. Write the first 6 terms.', answer: 'First AP: -3, -2.5, -2, -1.5, -1, -0.5 (4th term = -1.5)',
                  options: ['First AP: -3, -2.5, -2, -1.5, -1, -0.5 (4th term = -1.5)', 'common difference', 'difference between first and last term', 'difference between any two non-consecutive terms'],
                  hint: 'Revisit integer subtraction (c7_math_ch10_003) and fraction/decimal subtraction (c7_math_ch03_009).',
                  misconception: 'Students often confuse "common difference" with "difference between first and last term" or "difference between any two non-consecutive.' }
          ],
            remediations: { 'students-often-confuse-common-difference': { steps: ['Ask the student to write the sequence with term positions labelled: 1st, 2nd, 3rd, 4th.', 'Have them compute *only* consecutive differences: 2nd - 1st, 3rd - 2nd, 4th - 3rd.', 'Ask: "Are all three results exactly the same number?" If yes, that number is *d*. If no, it is not an AP.', 'Practice with sequences containing negative numbers, fractions, and decimals (e.g., -2, -0.5, 1, 2.5) to reinforce that.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_05_002', difficulty: 'standard',
          question: 'An Arithmetic Progression (AP) in its general form is an ordered sequence.',
          hint: 'Revisit Class 7 "Matchstick Patterns and Generalising with Variables" (c7_math_ch04_005).',
          misconception: '**Off-by-one error in the coefficient of \\(d\\):** Students write the \\(n\\)-th term in the general form as \\(a + nd\\).',
          parts: [
                { id: 'a', prompt: 'Two APs are given in general form: AP 1: \\(p, p+q, p+2q, p+3q, \\dots\\) AP 2: \\(2p, 2p+3q, 2p+6q, 2p+9q, \\dots\\) Compare the common differences and first terms.', answer: 'AP 1: first term \\(a_1 = p\\), common difference \\(d_1 = q\\)',
                  options: ['AP 1: first term \\(a_1 = p\\), common difference \\(d_1 = q\\)', 'AP 2 has larger first term so its 5th term is larger'],
                  hint: 'Revisit Class 7 "Matchstick Patterns and Generalising with Variables" (c7_math_ch04_005) and Class.',
                  misconception: '**Off-by-one error in the coefficient of \\(d\\):** Students write the \\(n\\)-th term in the general form as \\(a + nd\\) instead of \\(a.' }
          ],
            remediations: { 'off-by-one-error-in': { steps: ['Have the student write the first 5 terms of an AP with \\(a=10, d=4\\) as a list: 10, 14, 18, 22, 26.', 'Ask: "How many times did we add 4 to get the 1st term?" (0 times). "To get the 2nd term?" (1 time).', 'Make a two-column table: Term number \\(n\\) | Number of \\(d\\)\'s added. Fill: 1→0, 2→1, 3→2, 4→3, 5→4.', 'Ask the student to describe the pattern: "Number of \\(d\\)\'s added = \\(n-1\\)".'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_05_003', difficulty: 'standard',
          question: 'The nth term of an arithmetic progression (AP) is the general term that gives.',
          hint: 'If stuck, revisit the general form of an AP (node c10_math_cbse_05_002) and practice.',
          misconception: 'Students often write the nth term as \\(a + nd\\) instead of \\(a + (n-1)d\\). For example, for the AP 2, 5, 8,...',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The nth term of an arithmetic progression (AP) is the general term that gives the value',
                  options: ['The nth term of an arithmetic progression (AP) is the general term that gives the value', 'An Arithmetic Progression (AP) is a sequence of numbers in', 'An Arithmetic Progression (AP) in its general form is an ordered sequence of numbers', 'The nth term of an arithmetic progression (AP) is given by the formula \\(a_n = a +'],
                  hint: 'If stuck, revisit the general form of an AP (node c10_math_cbse_05_002) and practice writing terms.',
                  misconception: 'Students often write the nth term as \\(a + nd\\) instead of \\(a + (n-1)d\\). For example, for the AP 2, 5, 8,...' }
          ],
            remediations: { 'students-often-write-the-nth': { steps: ['If a student uses \\(a+nd\\), have them write out the first 5 terms explicitly: term1 = a, term2 = a+d, term3 = a+2d.', 'Ask: "For term number \\(n\\), what is the coefficient of \\(d\\)?" Guide them to see the pattern: coefficient = \\(n-1\\).', 'Then have them re-derive the formula from the general form \\(a, a+d, a+2d, \\dots\\) by asking "How many \\(d\\)\'s are.', 'Emphasize: "The first term is the starting point, before any addition of \\(d\\)."'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_05_004', difficulty: 'standard',
          question: 'The nth term of an arithmetic progression (AP) is given by the formula \\(a_n.',
          hint: 'Review solving linear equations with variables on both sides (Class 6 node.',
          misconception: 'Students consistently write \\(a_n = a + nd\\) instead of \\(a_n = a + (n-1)d\\), leading to off-by-one errors in term.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The nth term of an arithmetic progression (AP) is given by the formula \\(a_n = a +',
                  options: ['The nth term of an arithmetic progression (AP) is given by the formula \\(a_n = a +', 'An Arithmetic Progression (AP) is a sequence of numbers in', 'An Arithmetic Progression (AP) in its general form is an ordered sequence of numbers', 'The nth term of an arithmetic progression (AP) is the general term that gives the value'],
                  hint: 'Review solving linear equations with variables on both sides (Class 6 node c6_math_ch05_057) and.',
                  misconception: 'Students consistently write \\(a_n = a + nd\\) instead of \\(a_n = a + (n-1)d\\), leading to off-by-one errors in term position.' }
          ],
            remediations: { 'students-consistently-write-a-n': { steps: ['Have the student write out the first 5 terms of an AP with \\(a = 2, d = 3\\) explicitly: 2, 5, 8, 11, 14.', 'Ask "How many times did we add 3 to get the 1st term? (0) The 2nd term? (1) The 3rd term? (2)".', 'Make a table: Term number \\(n\\) | Times \\(d\\) added | Expression.', 'Guide them to see the pattern: times added = \\(n-1\\).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_05_005', difficulty: 'standard',
          question: 'Finding the number of terms in an AP means determining the value of \\(n\\) (a.',
          hint: 'If stuck, review the \\(n\\)th term formula \\(a_n = a + (n-1)d\\) from node.',
          misconception: 'Students often forget that \\(n\\) must be a positive integer. When using the \\(n\\)th term formula, they compute \\(n.',
          parts: [
                { id: 'a', prompt: 'In the AP 5, 9, 13, 17, ..., a student claims that 101 is the 25th term.', answer: 'All terms in this AP are odd',
                  options: ['All terms in this AP are odd', '101 is odd so it could be a term'],
                  hint: 'If stuck, review the \\(n\\)th term formula \\(a_n = a + (n-1)d\\) from node c10_math_cbse_05_003 and.',
                  misconception: 'Students often forget that \\(n\\) must be a positive integer. When using the \\(n\\)th term formula, they compute \\(n = \\frac{a_n - a}{d}\\).' }
          ],
            remediations: { 'students-often-forget-that-n': { steps: ['If a student makes the "forgot to add 1" error, have them list the terms of a simple AP (e.g., 2, 5, 8) and count.', 'Show that \\(\\frac{8-2}{3} = 2\\) which is \\(n-1\\), not \\(n\\).', 'Emphasize the pattern: number of terms = number of steps + 1.', 'For quadratic errors, give a problem where one root is negative and ask "Can the number of terms be negative?" Then.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_05_006', difficulty: 'standard',
          question: 'In an Arithmetic Progression with a finite number of terms, the kth term from.',
          hint: 'If stuck, revisit c10_math_cbse_05_003 (nth term formula derivation and application) and.',
          misconception: 'Students consistently use the formula a + (k - 1)d for the "kth term from the end," treating it exactly like the kth.',
          parts: [
                { id: 'a', prompt: 'Write the formula for the kth term from the end of an AP with n terms, first term a, common difference d, and last term l.', answer: 'The kth term from the end = l - (k - 1)d = a + (n - k)d',
                  options: ['The kth term from the end = l - (k - 1)d = a + (n - k)d', 'a + (k - 1)d', 'from the end', 'from the beginning'],
                  hint: 'If stuck, revisit c10_math_cbse_05_003 (nth term formula derivation and application) and.',
                  misconception: 'Students consistently use the formula a + (k - 1)d for the "kth term from the end," treating it exactly like the kth term from the.' }
          ],
            remediations: { 'students-consistently-use-the-formula': { steps: ['Make the student write the AP terms with indices from both ends: 1st term (a), 2nd (a+d), ..., nth term (l).', 'Ask: "What is the index from the beginning for the kth from end?" Guide them to see the pattern: k=1 → index n, k=2 →.', 'Have them practice 3 problems where they must explicitly write "Position from beginning = n - k + 1" before.', 'Give a problem where n is unknown — they must first find n using l = a + (n-1)d, reinforcing the two-step process.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
