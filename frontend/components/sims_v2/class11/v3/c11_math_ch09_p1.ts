import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch09_p1: SimDef = {
    id: 'v3_c11_math_ch09_p1',
    title: 'Sequences and Series · Part 1/2',
    subtitle: 'Test the pattern before trusting it — and add d exactly n − 1 times.',
    classLevel: 11, subject: 'mathematics', topic: 'Sequences and Series · Part 1/2',
    chapters: ['c11_math_ch09'],
    nodeIds: ['c11_math_cbse_09_001', 'c11_math_cbse_09_002', 'c11_math_cbse_09_003', 'c11_math_cbse_09_004', 'c11_math_cbse_09_005', 'c11_math_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a saver tracking deposits that grow by rule', intro: '₹500 this month, ₹600 next, ₹700 after — the formula that predicts December without adding eleven times is the point.', goal: 'Classify sequences by difference and ratio, and apply aₙ = a + (n − 1)d precisely.' },
    discovery: {
        question: '1, 4, 9, 16, 25 — the differences 3, 5, 7, 9 form a pattern, so the sequence is arithmetic?',
        options: ['No — arithmetic demands a constant difference; patterned differences mean this is the sequence of squares', 'Yes — any patterned difference makes it arithmetic', 'Yes — it increases steadily', 'No — it\'s geometric with ratio 3'],
        answer: 'No — arithmetic demands a constant difference; patterned differences mean this is the sequence of squares',
        hook: 'And the nth term of an AP is a + (n − 1)d — the first term has had zero additions of d, which is why \'a + nd\' overshoots by exactly one.',
    },
    teaching: [
        { title: 'Sequences: Definition and Types', text: 'A sequence is a function whose domain is the set of natural numbers ℕ (or a subset {1, 2, ..., n} for finite sequences) and whose codomain is typically ℝ or ℂ; each element of the domain maps to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_09_001', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Check ratios on 3, 6, 12, 24 to name it geometric, then recover a and d from \'5th term 22, 9th term 38\' without the off-by-one.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'case', nodeId: 'c11_math_cbse_09_001', title: 'Sequences: Definition and Types',
          caseStudy: { intro: 'Imagine you are saving ₹500 every month in a piggy bank. After 1 month you have ₹500, after 2 months ₹1000, after 3 months ₹1500, and so on.',
            decisions: [{ prompt: 'Write the first four terms of the sequence defined by aₙ = 2n² − 3n + 1 for n ∈ ℕ.', options: [
                { text: 'The first four terms are 0, 3, 10, 21', outcome: 'The first four terms are 0, 3, 10, 21. Substitute n = 1, 2, 3, 4 into the formula: a₁ = 2(1)².' },
                { text: 'Differences are 3, 5, 7, 9', outcome: 'Not quite — Students often believe that if the differences between terms form a pattern (e.g., 3, 5, 7, 9), the.', reveals: 'if-the-differences-between-terms' },
                { text: 'constant difference', outcome: 'Not quite — Students often believe that if the differences between terms form a pattern (e.g., 3, 5, 7, 9), the.', reveals: 'if-the-differences-between-terms' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_09_002', title: 'Arithmetic Progression: General Term',
          scaffold: { problem: 'A student saves ₹50 in the first week of the year and increases her weekly savings by ₹10 every week.',
            steps: [
            { text: 'Identify the given values. The savings form an AP with first term \\(a = 50\\) (week 1) and common difference \\(d = 10\\).' },
            { text: 'Recall the general term formula for an AP: \\(a_n = a + (n-1)d\\).' },
            { text: 'Substitute the known values: \\(a_{25} = 50 + (25-1) \\times 10\\).' },
            { text: 'Simplify step by step: \\(a_{25} = 50 + 24 \\times 10 = 50 + 240 = 290\\).' },
            { text: 'Interpret the result: In the 25th week, she saves ₹290. The unit is rupees.', faded: true, blankAnswer: '₹290' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_09_003', title: 'Sum of n Terms of an AP',
          scaffold: { problem: 'A construction company pays a penalty for delay: ₹200 for the first day, ₹250 for the second day, ₹300 for the third day, and so.',
            steps: [
            { text: 'Identify the AP parameters: first term a = 200, common difference d = 50, sum S_n = 27000. Unknown: n (number of days).' },
            { text: 'Choose the appropriate sum formula. Since a and d are known, use S_n = n/2 [2a + (n-1)d].' },
            { text: 'Substitute values: 27000 = n/2 [2(200) + (n-1)50] = n/2 [400 + 50n - 50] = n/2 [50n + 350].' },
            { text: 'Simplify and solve the quadratic: 27000 = n(25n + 175) → 25n² + 175n - 27000 = 0 → Divide by 25: n² + 7n - 1080 = 0 →.' },
            { text: 'Interpret: n must be a positive integer, so n = 30 days. Verify: S_30 = 30/2[400 + 29×50] = 15[400 + 1450] = 15 × 1850.', faded: true, blankAnswer: '30 days (with corrected total penalty of ₹27,750)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_09_004', title: 'Arithmetic Mean: Definition and Formula',
          scaffold: { problem: 'A construction company plans to build a flyover in 7 phases. The cost of the first phase is ₹2.5 crore and the final phase costs ₹6.5.',
            steps: [
            { text: 'Identify given values: a = 2.5 (first phase cost in crores), b = 6.5 (last phase cost in crores), number.' },
            { text: 'Calculate common difference: d = (b - a)/(n + 1) = (6.5 - 2.5)/(5 + 1) = 4/6 = 2/3 ≈ 0.6667 crore.' },
            { text: 'Find each mean using Aₖ = a + k·d for k = 1 to 5: A₁ = 2.5 + 1×(2/3) = 2.5 + 0.6667 = 3.1667 crore; A₂ = 2.5 + 2×(2/3).' },
            { text: 'Verify: Sequence is 2.5, 3.1667, 3.8333, 4.5, 5.1667, 5.8333, 6.5. Differences: 0.6667 each. Last term matches b = 6.5.' },
            { text: 'Interpret: Phase 1: ₹2.5 cr, Phase 2: ₹3.17 cr, Phase 3: ₹3.83 cr, Phase 4: ₹4.5 cr, Phase 5: ₹5.17 cr, Phase 6: ₹5.83.', faded: true, blankAnswer: 'Phase 2: ₹3.17 crore, Phase 3: ₹3.83 crore, Phase 4: ₹4.50.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_09_005', title: 'Geometric Progression: General Term',
          scaffold: { problem: 'A certain bacteria culture triples every hour. If the initial count is 200 bacteria, find the bacteria count at the end of the 6th hour.',
            steps: [
            { text: 'Identify the sequence type. The count triples each hour → multiplicative pattern → GP.' },
            { text: 'Define terms clearly. Let T_n = bacteria count after (n-1) hours. Then T_1 = 200 (initial), r = 3.' },
            { text: 'Find count at end of 6th hour. End of 6th hour means after 6 hours → n = 7.' },
            { text: 'Find when count exceeds 50,000. Solve 200 × 3^(n-1) > 50,000. 3^(n-1) > 250. 3^5 = 243, 3^6 = 729. So n-1 = 6 → n = 7.' },
            { text: 'Verify and state answer with units. At end of 6th hour: 1,45,800 bacteria. Exceeds 50,000 after 6 hours.', faded: true, blankAnswer: 'Bacteria count at end of 6th hour = 1,45,800. Count exceeds.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_09_006', title: 'Sum of n Terms of a GP',
          scaffold: { problem: 'A person saves ₹100 in the first month and increases his savings by 20% each subsequent month.',
            steps: [
            { text: 'Identify the pattern. Savings: Month 1 = 100, Month 2 = 100 × 1.2 = 120, Month 3 = 120 × 1.2 = 144.' },
            { text: 'Determine n. End of 12 months means n = 12 terms.' },
            { text: 'Select formula. Since r = 1.2 > 1, use \\(S_n = a\\frac{r^n-1}{r-1}\\).' },
            { text: 'Substitute values: \\(S_{12} = 100 \\times \\frac{1.2^{12} - 1}{1.2 - 1} = 100 \\times \\frac{1.2^{12} - 1}{0.2}\\).' },
            { text: 'Compute \\(1.2^{12}\\). \\(1.2^2 = 1.44\\), \\(1.2^4 = 1.44^2 = 2.0736\\), \\(1.2^8 = 2.0736^2 = 4.2998\\), \\(1.2^{12} = 4.2998.' },
            { text: 'Interpret. Total savings = ₹3958 (approx). Verify: The sum grows rapidly due to compounding effect of 20% monthly.', faded: true, blankAnswer: '₹3958 (approximately)' }
            ] } },
        { type: 'drill', nodeId: 'c11_math_cbse_09_006', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Analysing the savings sequence 1, 4, 9, 16 … a classmate declares it arithmetic: \'differences 3, 5, 7 increase by 2 — clear pattern.\' For the AP 3, 7, 11, … he writes the nth term as a + nd and gets the 4th term as 19.',
            decisions: [{ prompt: 'What do sequence tests and the AP formula actually say?', options: [
                { text: 'Apply the right tests: arithmetic requires a CONSTANT difference — patterned differences (3, 5, 7) signal a quadratic sequence, not AP; 1, 4, 9, 16 is squares. And the nth term is a + (n−1)d, because the first term already sits at n = 1 with zero additions of d — so the 4th term is 3 + 3·4 = 15, not 19.', outcome: 'Both fixes stem from counting correctly: test whether a_{n+1} − a_n is literally constant, and remember n counts positions, not the number of d\'s added.' },
                { text: 'Accept \'arithmetic\' — differences forming their own pattern is close enough.', outcome: 'Patterned differences are the signature of a quadratic (squares), not an AP — the AP test is identical differences, not interesting ones.', reveals: 'patterned-differences-are-ap' },
                { text: 'Keep a + nd — the nth term means d added n times.', outcome: 'At n = 1 the term is a itself — d has been added zero times; the coefficient is n−1, so a+nd overshoots every term by one d.', reveals: 'nth-term-is-a-plus-nd' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'Constant difference → AP, constant ratio → GP, patterned difference → look again; the test must match the definition.',
            decisions: [{ prompt: 'What comes next? Sequences and Series · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Sequences and Series · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_09_001', difficulty: 'standard',
          question: 'A sequence is a function whose domain is the set of natural numbers ℕ (or.',
          hint: 'If stuck, revisit Class 9 "Explicit Rule for a Sequence" (c9_math_ch8_2) and Class 10.',
          misconception: 'Students often believe that if the differences between terms form a pattern (e.g., 3, 5, 7, 9), the original sequence.',
          parts: [
                { id: 'a', prompt: 'Write the first four terms of the sequence defined by aₙ = 2n² − 3n + 1 for n ∈ ℕ.', answer: 'The first four terms are 0, 3, 10, 21',
                  options: ['The first four terms are 0, 3, 10, 21', 'Differences are 3, 5, 7, 9', 'constant difference', 'patterned differences'],
                  hint: 'If stuck, revisit Class 9 "Explicit Rule for a Sequence" (c9_math_ch8_2) and Class 10 "General Form.',
                  misconception: 'Students often believe that if the differences between terms form a pattern (e.g., 3, 5, 7, 9), the original sequence is arithmetic.' },
                { id: 'b', prompt: 'A sequence is defined recursively by a₁ = 5 and aₙ = aₙ₋₁ + 4 for n ≥ 2.', answer: 'The sequence is arithmetic',
                  options: ['The sequence is arithmetic', 'Differences are 3, 5, 7, 9', 'constant difference', 'patterned differences'],
                  hint: 'If stuck, revisit Class 9 "Explicit Rule for a Sequence" (c9_math_ch8_2) and Class 10 "General Form.',
                  misconception: 'Students often believe that if the differences between terms form a pattern (e.g., 3, 5, 7, 9), the original sequence is arithmetic.' },
                { id: 'c', prompt: 'Determine whether the sequence 3, 6, 12, 24, 48, ... is arithmetic, geometric, or neither.', answer: 'The sequence is geometric',
                  options: ['The sequence is geometric', 'numbers are increasing', 'Differences are 3, 5, 7, 9', 'constant difference'],
                  hint: 'If stuck, revisit Class 9 "Explicit Rule for a Sequence" (c9_math_ch8_2) and Class 10 "General Form.',
                  misconception: 'Students often believe that if the differences between terms form a pattern (e.g., 3, 5, 7, 9), the original sequence is arithmetic.' },
                { id: 'd', prompt: 'Compare the sequences S₁: aₙ = 5n − 2 and S₂: bₙ = 3 × 2ⁿ⁻¹. For n = 1 to 5, which sequence grows faster?', answer: 'S₂ grows faster',
                  options: ['S₂ grows faster', 'S₁ grows faster because 5n is linear and 2ⁿ is exponential but n is small', 'Differences are 3, 5, 7, 9', 'constant difference'],
                  hint: 'If stuck, revisit Class 9 "Explicit Rule for a Sequence" (c9_math_ch8_2) and Class 10 "General Form.',
                  misconception: 'Students often believe that if the differences between terms form a pattern (e.g., 3, 5, 7, 9), the original sequence is arithmetic.' }
          ],
            remediations: { 'if-the-differences-between-terms': { steps: ['If a student makes this error, do the following: (1) Write the definition of arithmetic sequence: "aₙ₊₁ − aₙ =.', 'Is 5 = 7?" (3) Show that constant difference means the same number every time, not a pattern.', '(4) Give a true arithmetic sequence 2, 5, 8, 11 and compute differences: 3, 3, 3.', '(5) Have them test 3, 6, 12, 24 by both difference and ratio to reinforce the distinction.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if the differences between terms form a pattern (e.g., 3, 5, 7, 9), the original sequence.',
          parts: [
                { id: 'a', prompt: 'A student writes: "The sequence 1, 4, 9, 16, 25, ... is arithmetic because the differences are 3, 5, 7, 9 which form a pattern." Evaluate this claim and.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'any pattern in differences makes it arithmetic', 'Differences are 3, 5, 7, 9', 'constant difference'],
                  hint: 'If stuck, revisit Class 9 "Explicit Rule for a Sequence" (c9_math_ch8_2) and Class 10 "General Form.',
                  misconception: 'Students often believe that if the differences between terms form a pattern (e.g., 3, 5, 7, 9), the original sequence is arithmetic.' },
                { id: 'b', prompt: 'Construct a sequence that is neither arithmetic nor geometric but has a simple explicit formula. Write its first five terms and explain why it fails both tests.', answer: 'Example: aₙ = n² + n',
                  options: ['Example: aₙ = n² + n', 'Differences are 3, 5, 7, 9', 'constant difference', 'patterned differences'],
                  hint: 'If stuck, revisit Class 9 "Explicit Rule for a Sequence" (c9_math_ch8_2) and Class 10 "General Form.',
                  misconception: 'Students often believe that if the differences between terms form a pattern (e.g., 3, 5, 7, 9), the original sequence is arithmetic.' }
          ],
            remediations: { 'if-the-differences-between-terms': { steps: ['If a student makes this error, do the following: (1) Write the definition of arithmetic sequence: "aₙ₊₁ − aₙ =.', 'Is 5 = 7?" (3) Show that constant difference means the same number every time, not a pattern.', '(4) Give a true arithmetic sequence 2, 5, 8, 11 and compute differences: 3, 3, 3.', '(5) Have them test 3, 6, 12, 24 by both difference and ratio to reinforce the distinction.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_09_002', difficulty: 'standard',
          question: 'The general term (nth term) of an arithmetic progression (AP) with first term.',
          hint: 'Revisit the derivation of the nth term formula from Class 10 (c10_math_cbse_05_003).',
          misconception: 'Students consistently write the nth term as \\(a_n = a + nd\\) instead of \\(a + (n-1)d\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The general term (nth term) of an arithmetic progression (AP) with first term \\(a\\) and',
                  options: ['The general term (nth term) of an arithmetic progression (AP) with first term \\(a\\) and', 'A sequence is a function whose domain is the set of natural numbers ℕ (or a subset {1, 2,', 'The sum of the first n terms of an Arithmetic Progression (AP) with first term a and', 'The arithmetic mean (A.M.) of two numbers a and b is the number A such that a, A, b form'],
                  hint: 'Revisit the derivation of the nth term formula from Class 10 (c10_math_cbse_05_003) by writing the.',
                  misconception: 'Students consistently write the nth term as \\(a_n = a + nd\\) instead of \\(a + (n-1)d\\). For example, in the AP 3, 7, 11, ...' }
          ],
            remediations: { 'students-consistently-write-the-nth': { steps: ['Ask the student to write the first 5 terms of an AP with \\(a=2, d=3\\) explicitly: 2, 5, 8, 11, 14.', 'Have them label each term with its term number \\(n\\) and the number of \\(d\\)\'s added: \\(n=1 \\rightarrow 2+0\\times3\\).', 'Point out the pattern: number of \\(d\\)\'s = \\(n-1\\).', 'Practice 3-4 problems where they must first write the expanded form (e.g., \\(a_7 = a + 6d\\)) before using the formula.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_09_003', difficulty: 'standard',
          question: 'The sum of the first n terms of an Arithmetic Progression (AP) with first term.',
          hint: 'If stuck, revisit solving quadratic equations (Class 10 Chapter 4) and the derivation.',
          misconception: 'Students confuse S_n (sum of first n terms) with a_n (nth term).',
          parts: [
                { id: 'a', prompt: 'The sum of first n terms of an AP is given by S_n = 3n² + 5n. Find the 10th term of this AP. Explain why you cannot simply substitute n=10 into S_n.', answer: 'The 10th term a_10 = S_10 - S_9',
                  options: ['The 10th term a_10 = S_10 - S_9', 'sum of first n terms', 'nth term'],
                  hint: 'If stuck, revisit solving quadratic equations (Class 10 Chapter 4) and the derivation of AP sum.',
                  misconception: 'Students confuse S_n (sum of first n terms) with a_n (nth term).' }
          ],
            remediations: { 'students-confuse-s-n-sum': { steps: ['If a student substitutes n into S_n to find the nth term, ask: "If S_5 = 50 and S_4 = 30, what is the 5th term?" Guide.', 'Then generalise: a_n = S_n - S_{n-1}.', 'For the formula error, have them expand S_n = n/2 [2a + (n-1)d] step by step: = n/2 × 2a + n/2 × (n-1)d =.', 'Emphasise that BOTH terms inside the bracket are multiplied by n/2.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_09_004', difficulty: 'standard',
          question: 'The arithmetic mean (A.M.) of two numbers a and b is the number A such that.',
          hint: 'If stuck, revisit c11_math_cbse_09_002 (Arithmetic Progression: General Term) and.',
          misconception: 'Students consistently use n (number of means) instead of n+1 (number of intervals) when calculating the common.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The arithmetic mean (A.M.) of two numbers a and b is the number A such that a, A, b form',
                  options: ['The arithmetic mean (A.M.) of two numbers a and b is the number A such that a, A, b form', 'A sequence is a function whose domain is the set of natural numbers ℕ (or a subset {1, 2,', 'The general term (nth term) of an arithmetic progression (AP) with first term \\(a\\) and', 'The sum of the first n terms of an Arithmetic Progression (AP) with first term a and'],
                  hint: 'If stuck, revisit c11_math_cbse_09_002 (Arithmetic Progression: General Term) and practice finding.',
                  misconception: 'Students consistently use n (number of means) instead of n+1 (number of intervals) when calculating the common difference for inserted.' }
          ],
            remediations: { 'students-consistently-use-n-number': { steps: ['Have the student physically draw the number line with endpoints a and b.', 'Mark the n means as dots between them.', 'Count the gaps: there are n+1 gaps (intervals).', 'Write the total distance (b-a) above the whole line.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_09_005', difficulty: 'standard',
          question: 'A Geometric Progression (GP) is a sequence of non-zero numbers where each term.',
          hint: 'If stuck, revisit c8_math_ch2_7 (exponent laws) and c9_math_ch8_8 (GP definition).',
          misconception: 'Students write T_n = ar^n instead of ar^(n-1), especially when the first term is given as "term 1".',
          parts: [
                { id: 'a', prompt: 'Write the general term formula for a GP with first term 5 and common ratio -3. What is the 6th term?', answer: 'The general term is T_n = 5 × (-3)^(n-1)',
                  options: ['The general term is T_n = 5 × (-3)^(n-1)', 'GP grows linearly like AP'],
                  hint: 'If stuck, revisit c8_math_ch2_7 (exponent laws) and c9_math_ch8_8 (GP definition) — practice.',
                  misconception: 'Students write T_n = ar^n instead of ar^(n-1), especially when the first term is given as "term 1". For example, given GP: 3, 6, 12, 24...' }
          ],
            remediations: { 'students-write-t-n-ar': { steps: ['Write the first 4 terms explicitly with exponents: T_1 = a = ar^0, T_2 = ar = ar^1, T_3 = ar^2, T_4 = ar^3.', 'Ask "What is the exponent when n=1? When n=2?" Guide the student to see the pattern: exponent = n-1.', 'Have them verify with a known term: "If a=3, r=2, what is T_4 by listing? What does ar^(n-1) give? What does ar^n give?"', 'Practice 3 problems where they must write the exponent pattern before plugging into formula.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_09_006', difficulty: 'standard',
          question: 'The sum of the first n terms of a Geometric Progression (GP) with first term.',
          hint: 'If stuck, revisit c11_math_cbse_09_005 (GP General Term) to practice identifying a and.',
          misconception: 'Students often confuse the exponent in the sum formula: they use \\(r^n\\) in the numerator when the last term.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The sum of the first n terms of a Geometric Progression (GP) with first term \\(a\\) and',
                  options: ['The sum of the first n terms of a Geometric Progression (GP) with first term \\(a\\) and', 'A sequence is a function whose domain is the set of natural numbers ℕ (or a subset {1, 2,', 'The general term (nth term) of an arithmetic progression (AP) with first term \\(a\\) and', 'The sum of the first n terms of an Arithmetic Progression (AP) with first term a and'],
                  hint: 'If stuck, revisit c11_math_cbse_09_005 (GP General Term) to practice identifying a and r, and.',
                  misconception: 'Students often confuse the exponent in the sum formula: they use \\(r^n\\) in the numerator when the last term is \\(ar^{n-1}\\), but then.' }
          ],
            remediations: { 'students-often-confuse-the-exponent': { steps: ['If a student makes this exponent error, have them write out the series explicitly for n=3: \\(S_3 = a + ar + ar^2\\).', 'Multiply by r: \\(rS_3 = ar + ar^2 + ar^3\\).', 'Subtract: \\(S_3 - rS_3 = a - ar^3\\).', 'Show that the cancelled terms leave \\(ar^3\\) (which is \\(ar^n\\)), not \\(ar^2\\).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
