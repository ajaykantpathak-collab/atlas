import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch09_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch09_p2: SimDef = {
    id: 'v3_c11_math_ch09_p2',
    title: 'Sequences and Series · Part 2/2',
    subtitle: 'Test the pattern before trusting it — and add d exactly n − 1 times.',
    classLevel: 11, subject: 'mathematics', topic: 'Sequences and Series · Part 2/2',
    chapters: ['c11_math_ch09'],
    nodeIds: ['c11_math_cbse_09_007', 'c11_math_cbse_09_008', 'c11_math_cbse_09_009', 'c11_math_cbse_09_010', 'c11_math_cbse_09_011', 'c11_math_cbse_09_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a saver tracking deposits that grow by rule', intro: '₹500 this month, ₹600 next, ₹700 after — the formula that predicts December without adding eleven times is the point.', goal: 'Classify sequences by difference and ratio, and apply aₙ = a + (n − 1)d precisely.' },
    discovery: {
        question: '1, 4, 9, 16, 25 — the differences 3, 5, 7, 9 form a pattern, so the sequence is arithmetic?',
        options: ['No — arithmetic demands a constant difference; patterned differences mean this is the sequence of squares', 'Yes — any patterned difference makes it arithmetic', 'Yes — it increases steadily', 'No — it\'s geometric with ratio 3'],
        answer: 'No — arithmetic demands a constant difference; patterned differences mean this is the sequence of squares',
        hook: 'And the nth term of an AP is a + (n − 1)d — the first term has had zero additions of d, which is why \'a + nd\' overshoots by exactly one.',
    },
    teaching: [
        { title: 'Sum of Infinite GP', text: 'The sum of an infinite geometric progression (GP) is the limiting value of the sum of its first n terms as n approaches infinity, defined only when the common ratio r satisfies |r| < 1, and given.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_09_007', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Check ratios on 3, 6, 12, 24 to name it geometric, then recover a and d from \'5th term 22, 9th term 38\' without the off-by-one.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_09_007', title: 'Sum of Infinite GP',
          scaffold: { problem: 'A ball is dropped from a height of 20 metres. After each bounce, it rebounds to 60% of its previous height.',
            steps: [
            { text: 'Identify the motion pattern — ball falls 20 m (down), rebounds 12 m (up), falls 12 m (down), rebounds 7.2 m (up), falls.' },
            { text: 'Separate into two infinite GPs: downward distances: 20, 12, 7.2, ...' },
            { text: 'Verify convergence condition: |r| = 0.6 < 1 ✓ for both series.' },
            { text: 'Apply S∞ = a/(1−r) to each: S_down = 20/(1−0.6) = 20/0.4 = 50 m; S_up = 12/(1−0.6) = 12/0.4 = 30 m.' },
            { text: 'Total distance = S_down + S_up = 50 + 30 = 80 metres.' },
            { text: 'Verify reasonableness — first few terms: 20+12+12+7.2+7.2 = 58.4, approaching 80.', faded: true, blankAnswer: '80 metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_09_008', title: 'Geometric Mean: Definition and Formula',
          scaffold: { problem: 'A rectangular garden has length 12 metres and breadth 27 metres. The owner wants to redesign it as a square garden with the same area.',
            steps: [
            { text: 'Compute the area of the rectangular garden: \\(A = 12 \\times 27 = 324\\) sq. m.' },
            { text: 'The side of the square garden with same area is the geometric mean of 12 and 27: \\(G = \\sqrt{12 \\times 27} = \\sqrt{324}.' },
            { text: 'For the three square gardens in GP, we have areas: \\(A_1 = 324\\) (first), \\(A_4 = 18^2 = 324\\)?' },
            { text: 'The three areas are in GP with first term \\(a = 324\\) and fourth term?', faded: true, blankAnswer: 'Side of square garden = 18 m. The two intermediate square.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_09_009', title: 'Relationship Between AM and GM',
          scaffold: { problem: 'A farmer has 100 metres of fencing wire to make a rectangular enclosure.',
            steps: [
            { text: 'Let the length and breadth of the rectangle be \\(x\\) and \\(y\\) metres.' },
            { text: 'We want to maximise \\(A = xy\\) given \\(x+y = 50\\), with \\(x>0, y>0\\).' },
            { text: 'Substitute \\(x+y = 50\\): \\(\\frac{50}{2} \\ge \\sqrt{xy} \\Rightarrow 25 \\ge \\sqrt{xy} \\Rightarrow xy \\le 625\\).' },
            { text: 'Equality holds when \\(x = y\\). Since \\(x+y=50\\), we get \\(x=y=25\\). So the rectangle should be a square of side 25 m.' },
            { text: 'Verify: Perimeter = \\(2(25+25)=100\\) m, Area = \\(25 \\times 25 = 625\\) m².', faded: true, blankAnswer: 'Dimensions: 25 m by 25 m (square). Maximum area: 625 m².' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_09_010', title: 'Sum of Special Series: n, n^2, n^3',
          scaffold: { problem: 'A school is constructing a triangular seating arrangement for an assembly.',
            steps: [
            { text: 'Identify the pattern: Row k has k seats, for k = 1 to 25. Total seats = Σₖ₌₁²⁵ k.' },
            { text: 'Recall the formula for sum of first n natural numbers: Σₖ₌₁ⁿ k = n(n+1)/2.' },
            { text: 'Substitute n = 25: Total seats = 25 × 26 / 2 = 325 seats.' },
            { text: 'Calculate total cost: Cost per seat = ₹120. Total cost = 325 × 120.' },
            { text: 'Compute: 325 × 120 = 325 × 12 × 10 = 3900 × 10 = ₹39,000.' },
            { text: 'Verify: Average seats per row = (1+25)/2 = 13. Total seats = 13 × 25 = 325. Matches.', faded: true, blankAnswer: '₹39,000' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_09_011', title: 'Arithmetic-Geometric Progression',
          scaffold: { problem: 'A machinery worth ₹50,000 depreciates by 10% each year. Additionally, maintenance cost increases by ₹2000 annually starting from ₹5000.',
            steps: [
            { text: 'Identify the two components: Depreciation forms GP (value each year), Maintenance forms AP (cost each year).' },
            { text: 'AP: a=10, d=2 (in lakhs). GP: r=0.8. AGP terms: Year 1: 10×1 = 10; Year 2: 12×0.8 = 9.6; Year 3: 14×0.8² = 8.96; Year.' },
            { text: 'Write S₄ = 10 + 12(0.8) + 14(0.8)² + 16(0.8)³.' },
            { text: 'Use formula Sₙ = a/(1-r) + dr(1-rⁿ⁻¹)/(1-r)² - [a+(n-1)d]rⁿ/(1-r) with a=10, d=2, r=0.8, n=4.' },
            { text: 'Compute: 1-r=0.2, (1-r)²=0.04, r⁴=0.4096, r³=0.512. S₄ = 10/0.2 + 2×0.8(1-0.8³)/0.04 - [10+6]×0.4096/0.2 = 50.' },
            { text: 'Verify by direct addition: 10 + 9.6 + 8.96 + 8.192 = 36.752 lakhs. Matches.', faded: true, blankAnswer: '₹36.752 lakhs' }
            ] } },
        { type: 'case', nodeId: 'c11_math_cbse_09_012', title: 'Word Problems: Applications of AP and GP',
          caseStudy: { intro: 'Start with a savings problem: "A worker saves Rs 1000 in the first month, Rs 1100 in the second, Rs 1200 in the third, and so on.',
            decisions: [{ prompt: 'A student saves Rs 50 in week 1, Rs 55 in week 2, Rs 60 in week 3, and continues this pattern.', options: [
                { text: 'Arithmetic progression', outcome: 'Arithmetic progression because the weekly increase is constant: 55 - 50 = 5, 60 - 55 = 5.' },
                { text: 'geometric because it increases', outcome: 'Not quite — Students confuse percentage growth (multiplicative, GP) with absolute growth (additive, AP).', reveals: 'students-confuse-percentage-growth-multiplicativ' }
            ] }] } },
        { type: 'drill', nodeId: 'c11_math_cbse_09_012', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Analysing the savings sequence 1, 4, 9, 16 … a classmate declares it arithmetic: \'differences 3, 5, 7 increase by 2 — clear pattern.\' For the AP 3, 7, 11, … he writes the nth term as a + nd and gets the 4th term as 19.',
            decisions: [{ prompt: 'What do sequence tests and the AP formula actually say?', options: [
                { text: 'Apply the right tests: arithmetic requires a CONSTANT difference — patterned differences (3, 5, 7) signal a quadratic sequence, not AP; 1, 4, 9, 16 is squares. And the nth term is a + (n−1)d, because the first term already sits at n = 1 with zero additions of d — so the 4th term is 3 + 3·4 = 15, not 19.', outcome: 'Both fixes stem from counting correctly: test whether a_{n+1} − a_n is literally constant, and remember n counts positions, not the number of d\'s added.' },
                { text: 'Accept \'arithmetic\' — differences forming their own pattern is close enough.', outcome: 'Patterned differences are the signature of a quadratic (squares), not an AP — the AP test is identical differences, not interesting ones.', reveals: 'patterned-differences-are-ap' },
                { text: 'Keep a + nd — the nth term means d added n times.', outcome: 'At n = 1 the term is a itself — d has been added zero times; the coefficient is n−1, so a+nd overshoots every term by one d.', reveals: 'nth-term-is-a-plus-nd' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_09_012', title: 'You made it',
          caseStudy: { intro: 'Constant difference → AP, constant ratio → GP, patterned difference → look again; the test must match the definition.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_09_007', difficulty: 'standard',
          question: 'The sum of an infinite geometric progression (GP) is the limiting value of the.',
          hint: 'If stuck, revisit c11_math_cbse_09_006 (Sum of n Terms of a GP) and practice finding.',
          misconception: 'Students often blindly apply S∞ = a/(1−r) without checking |r| < 1, especially when r is negative or given as.',
          parts: [
                { id: 'a', prompt: 'State the formula for the sum of an infinite GP and the necessary and sufficient condition for its existence.', answer: 'The sum is S∞ = a/(1−r) provided |r| < 1',
                  options: ['The sum is S∞ = a/(1−r) provided |r| < 1', 'S∞ = a/(r−1)'],
                  hint: 'If stuck, revisit c11_math_cbse_09_006 (Sum of n Terms of a GP) and practice finding limits of rⁿ.',
                  misconception: 'Students often blindly apply S∞ = a/(1−r) without checking |r| < 1, especially when r is negative or given as a fraction like −3/2 where.' },
                { id: 'b', prompt: 'Find the sum of the infinite GP: 18, 6, 2, 2/3, ...', answer: 'Given: a = 18, r = 6/18 = 1/3',
                  options: ['Given: a = 18, r = 6/18 = 1/3', 'no sum'],
                  hint: 'If stuck, revisit c11_math_cbse_09_006 (Sum of n Terms of a GP) and practice finding limits of rⁿ.',
                  misconception: 'Students often blindly apply S∞ = a/(1−r) without checking |r| < 1, especially when r is negative or given as a fraction like −3/2 where.' }
          ],
            remediations: { 'students-often-blindly-apply-s': { steps: ['Have the student write the condition |r| < 1 prominently at the top of every problem.', 'Make them compute |r| explicitly and compare to 1 before touching the sum formula.', 'Show the partial sums S₁, S₂, S₃, S₄ for a divergent example (e.g. 8, −12, 18, ...) so they see the oscillation/growth.', 'Derive S∞ = a/(1−r) from Sₙ = a(1−rⁿ)/(1−r) together, highlighting where rⁿ → 0 is used.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_09_008', difficulty: 'standard',
          question: 'The geometric mean (G.M.) of two positive numbers \\(a\\) and \\(b\\) is the.',
          hint: 'Revisit the definition of GP (c11_math_cbse_09_005) and practice computing square roots.',
          misconception: 'Students often confuse the exponent when inserting geometric means: they use \\(k\\) (number of means) instead of \\(k+1\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The geometric mean (G.M.) of two positive numbers \\(a\\) and \\(b\\) is the positive number',
                  options: ['The geometric mean (G.M.) of two positive numbers \\(a\\) and \\(b\\) is the positive number', 'A sequence is a function whose domain is the set of natural numbers ℕ (or a subset {1, 2,', 'The general term (nth term) of an arithmetic progression (AP) with first term \\(a\\) and', 'The sum of the first n terms of an Arithmetic Progression (AP) with first term a and'],
                  hint: 'Revisit the definition of GP (c11_math_cbse_09_005) and practice computing square roots and cube.',
                  misconception: 'Students often confuse the exponent when inserting geometric means: they use \\(k\\) (number of means) instead of \\(k+1\\) (number.' }
          ],
            remediations: { 'students-often-confuse-the-exponent': { steps: ['If a student uses the wrong exponent, draw the sequence explicitly: \\(a, G_1, G_2, \\dots, G_k, b\\).', 'Count the arrows (multiplications by \\(r\\)) from \\(a\\) to \\(b\\): there are \\(k+1\\) arrows.', 'Write \\(a \\cdot r^{k+1} = b\\).', 'For the sign error, remind them that the NCERT definition says "positive numbers" and the geometric mean is the.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_09_009', difficulty: 'standard',
          question: 'For any set of n positive real numbers \\(a_1, a_2, \\dots, a_n\\), the Arithmetic.',
          hint: 'Revisit the definitions of AM and GM in nodes c11_math_cbse_09_004 and.',
          misconception: 'Students often forget that AM-GM applies **only to positive numbers**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'For any set of n positive real numbers \\(a_1, a_2, \\dots, a_n\\), the Arithmetic Mean (AM)',
                  options: ['For any set of n positive real numbers \\(a_1, a_2, \\dots, a_n\\), the Arithmetic Mean (AM)', 'A sequence is a function whose domain is the set of natural numbers ℕ (or a subset {1, 2,', 'The general term (nth term) of an arithmetic progression (AP) with first term \\(a\\) and', 'The sum of the first n terms of an Arithmetic Progression (AP) with first term a and'],
                  hint: 'Revisit the definitions of AM and GM in nodes c11_math_cbse_09_004 and c11_math_cbse_09_008, and.',
                  misconception: 'Students often forget that AM-GM applies **only to positive numbers**.' }
          ],
            remediations: { 'students-often-forget-that-am': { steps: ['If a student applies AM-GM without checking positivity, guide them to test with a negative number: e.g., \\(a = -1,.', 'The inequality \\(-2.5 \\ge 2\\) is false.', 'Emphasise that the proof uses \\(\\sqrt{a}\\) and \\(\\sqrt{b}\\), which require non-negative numbers, and the inequality.', 'Have them re-read the theorem statement and highlight "positive numbers".'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_09_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often forget that AM-GM applies **only to positive numbers**.',
          parts: [
                { id: 'a', prompt: 'A student claims that for any two positive numbers, the arithmetic mean is always *strictly* greater than the geometric mean. Is this claim correct?', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'the inequality is always strict'],
                  hint: 'Revisit the definitions of AM and GM in nodes c11_math_cbse_09_004 and c11_math_cbse_09_008, and.',
                  misconception: 'Students often forget that AM-GM applies **only to positive numbers**.' }
          ],
            remediations: { 'students-often-forget-that-am': { steps: ['If a student applies AM-GM without checking positivity, guide them to test with a negative number: e.g., \\(a = -1,.', 'The inequality \\(-2.5 \\ge 2\\) is false.', 'Emphasise that the proof uses \\(\\sqrt{a}\\) and \\(\\sqrt{b}\\), which require non-negative numbers, and the inequality.', 'Have them re-read the theorem statement and highlight "positive numbers".'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_09_010', difficulty: 'standard',
          question: 'The sum of special series refers to closed-form formulas for the summation.',
          hint: 'If stuck, revisit binomial expansion (Class 11 Binomial Theorem chapter) and the.',
          misconception: 'Students write Σ(k²) = (Σk)², i.e., they believe the sum of squares equals the square of the sum.',
          parts: [
                { id: 'a', prompt: 'Explain why the formula for Σk³ equals the square of the formula for Σk. Is this a coincidence or is there a structural reason?', answer: 'It is not a coincidence',
                  options: ['It is not a coincidence', 'it\'s just a pattern'],
                  hint: 'If stuck, revisit binomial expansion (Class 11 Binomial Theorem chapter) and the telescoping sum.',
                  misconception: 'Students write Σ(k²) = (Σk)², i.e., they believe the sum of squares equals the square of the sum.' },
                { id: 'b', prompt: 'Compare the growth rates of Σk, Σk², and Σk³ as n → ∞. Which dominates and by what factor asymptotically?', answer: 'Σk ~ n²/2, Σk² ~ n³/3, Σk³ ~ n⁴/4',
                  options: ['Σk ~ n²/2, Σk² ~ n³/3, Σk³ ~ n⁴/4', 'they all grow at the same rate'],
                  hint: 'If stuck, revisit binomial expansion (Class 11 Binomial Theorem chapter) and the telescoping sum.',
                  misconception: 'Students write Σ(k²) = (Σk)², i.e., they believe the sum of squares equals the square of the sum.' }
          ],
            remediations: { 'students-write-k-k': { steps: ['Have the student compute both sides for n=3 explicitly: 1²+2²+3² = 14 vs (1+2+3)² = 36.', 'Show the algebraic expansion (1+2+3)² = 1²+2²+3² + 2(1·2+1·3+2·3) to prove cross-terms are missing.', 'For the constant term error, make them write Σₖ₌₁ⁿ 5 as 5+5+...+5 (n times) = 5n, not 5.', 'Create a 3×3 table: Column 1: k, Column 2: k², Column 3: Σk² so far.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_09_011', difficulty: 'standard',
          question: 'An Arithmetic-Geometric Progression (AGP) is a sequence where each term is the.',
          hint: 'If stuck, revisit c11_math_cbse_09_006 (Sum of n Terms of a GP) and practice the.',
          misconception: 'Students incorrectly apply the GP sum formula directly to AGP by treating the AP coefficient as constant.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An Arithmetic-Geometric Progression (AGP) is a sequence where each term is the product of',
                  options: ['An Arithmetic-Geometric Progression (AGP) is a sequence where each term is the product of', 'A sequence is a function whose domain is the set of natural numbers ℕ (or a subset {1, 2,', 'The general term (nth term) of an arithmetic progression (AP) with first term \\(a\\) and', 'The sum of the first n terms of an Arithmetic Progression (AP) with first term a and'],
                  hint: 'If stuck, revisit c11_math_cbse_09_006 (Sum of n Terms of a GP) and practice the.',
                  misconception: 'Students incorrectly apply the GP sum formula directly to AGP by treating the AP coefficient as constant.' }
          ],
            remediations: { 'students-incorrectly-apply-the-gp': { steps: ['Write the series explicitly: S = a + (a+d)r + (a+2d)r² + ... + [a+(n-1)d]rⁿ⁻¹.', 'Multiply by r: rS = ar + (a+d)r² + ... + [a+(n-2)d]rⁿ⁻¹ + [a+(n-1)d]rⁿ.', 'Subtract: S - rS = a + dr + dr² + ... + drⁿ⁻¹ - [a+(n-1)d]rⁿ.', 'Recognize the middle terms as GP with first term dr, ratio r, n-1 terms.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_09_012', difficulty: 'standard',
          question: 'Word problems involving arithmetic progressions (AP) and geometric progressions.',
          hint: 'Review c10_math_cbse_05_001 and c10_math_cbse_05_002 for Class 10 AP and GP basics, then.',
          misconception: 'Students confuse percentage growth (multiplicative, GP) with absolute growth (additive, AP).',
          parts: [
                { id: 'a', prompt: 'A student saves Rs 50 in week 1, Rs 55 in week 2, Rs 60 in week 3, and continues this pattern.', answer: 'Arithmetic progression',
                  options: ['Arithmetic progression', 'geometric because it increases'],
                  hint: 'Review c10_math_cbse_05_001 and c10_math_cbse_05_002 for Class 10 AP and GP basics, then practice.',
                  misconception: 'Students confuse percentage growth (multiplicative, GP) with absolute growth (additive, AP).' }
          ],
            remediations: { 'students-confuse-percentage-growth-multiplicativ': { steps: ['Present two problems side by side: "Salary increases by Rs 5000 each year" (AP, d = 5000) vs "Salary increases by 10%.', 'Calculate year 1, 2, and 3 for both to show the divergence.', 'Ask: "In which case is the increase the same each year? In which case does the increase grow?"', 'Have the student write: "Constant absolute increase = AP. Constant percentage increase = GP."'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
