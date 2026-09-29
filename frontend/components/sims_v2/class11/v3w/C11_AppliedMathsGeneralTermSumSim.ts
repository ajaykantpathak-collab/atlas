import type { SimDef } from '../../engine/types';
import C11_AppliedMathsGeneralTermSumSim from '../../../simulations/c6_12/C11_AppliedMathsGeneralTermSumSim';

/** v3 wrapped master — C11_AppliedMathsGeneralTermSumSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_appliedmathsgeneraltermsumsim: SimDef = {
    id: 'v3w_c11_appliedmathsgeneraltermsumsim',
    title: 'Arithmetic Progression: General Term',
    subtitle: 'This node covers the derivation, application, and algebraic manipulation of the general.',
    classLevel: 11, subject: 'science', topic: 'Arithmetic Progression: General Term',
    chapters: [],
    nodeIds: ['c11_math_cbse_09_002', 'c11_math_cbse_09_005', 'c11_math_cbse_03_009', 'c11_math_cbse_08_001', 'c11_math_cbse_08_002', 'c11_math_cbse_08_003', 'c11_math_cbse_08_004', 'c11_math_cbse_08_009', 'c11_math_cbse_08_008', 'c11_math_cbse_09_001', 'c11_math_cbse_09_003', 'c11_math_cbse_09_006', 'c11_math_cbse_09_007', 'c11_math_cbse_09_010', 'c11_math_cbse_09_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you start a savings plan in January where you deposit ₹500 in the first month and decide to increase.', goal: 'Master Arithmetic Progression: General Term.' },
    discovery: {
        question: 'State the position(s) of the middle term(s) in the expansion of (2x - 3y)^9. Do not compute the term(s), only give the term number(s) T_k.',
        options: ['For n = 9 (odd), there are two middle terms at positions T_{(9+1)/2} = T_5 and', 'T_5 only', 'a single middle term for all n, confusing the even-n rule with the odd-n case'],
        answer: 'For n = 9 (odd), there are two middle terms at positions T_{(9+1)/2} = T_5 and',
        hook: 'Students consistently confuse the term index (k in T_k) with the r-value in the general term formula T_{r+1}.',
    },
    teaching: [
        { title: 'The general term (nth term) of an arithmetic.', text: 'The general term (nth term) of an arithmetic progression (AP) with first term \\(a\\) and common difference \\(d\\) is given by \\(a_n = a + (n-1)d\\), where \\(n \\in \\mathbb{N}\\).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_math_cbse_09_002', title: 'The general term (nth term) of an.',
          scaffold: { problem: 'A student saves ₹50 in the first week of the year and increases her weekly savings by ₹10 every week.',
            steps: [
            { text: 'Identify the given values. The savings form an AP with first term \\(a = 50\\) (week 1) and common difference \\(d = 10\\).' },
            { text: 'Recall the general term formula for an AP: \\(a_n = a + (n-1)d\\).' },
            { text: 'Substitute the known values: \\(a_{25} = 50 + (25-1) \\times 10\\).' },
            { text: 'Simplify step by step: \\(a_{25} = 50 + 24 \\times 10 = 50 + 240 = 290\\).' },
            { text: 'Interpret the result: In the 25th week, she saves ₹290. The unit is rupees.', faded: true, blankAnswer: '₹290' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_09_005', title: 'A Geometric Progression (GP) is a.',
          scaffold: { problem: 'A certain bacteria culture triples every hour. If the initial count is 200 bacteria, find the bacteria count at the end of the 6th hour.',
            steps: [
            { text: 'Identify the sequence type. The count triples each hour → multiplicative pattern → GP.' },
            { text: 'Define terms clearly. Let T_n = bacteria count after (n-1) hours. Then T_1 = 200 (initial), r = 3.' },
            { text: 'Find count at end of 6th hour. End of 6th hour means after 6 hours → n = 7.' },
            { text: 'Find when count exceeds 50,000. Solve 200 × 3^(n-1) > 50,000. 3^(n-1) > 250. 3^5 = 243, 3^6 = 729. So n-1 = 6 → n = 7.' },
            { text: 'Verify and state answer with units. At end of 6th hour: 1,45,800 bacteria. Exceeds 50,000 after 6 hours.', faded: true, blankAnswer: 'Bacteria count at end of 6th hour = 1,45,800. Count exceeds.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_009', title: 'The sum and difference formulas for.',
          scaffold: { problem: 'A surveyor measures the angle of elevation to the top of a temple tower from two points on the ground.',
            steps: [
            { text: 'Identify given values: tan α = 3/4, tan β = 4/3. Both angles are acute (positive tangent in QI), so α, β ∈ (0°, 90°).' },
            { text: 'Write the tangent sum formula: tan(α+β) = (tan α + tan β) / (1 - tan α tan β). Check domain: α, β, α+β ≠ 90° + n·180°.' },
            { text: 'Substitute values: tan(α+β) = (3/4 + 4/3) / (1 - (3/4)(4/3)) = (9/12 + 16/12) / (1 - 12/12) = (25/12) / (1 - 1) =.' },
            { text: 'Division by zero means tan(α+β) is undefined → α+β = 90° (or 270°, but α+β < 180°). So α+β = 90° exactly.' },
            { text: 'Interpretation: The lines of sight from A and B to the tower top are perpendicular (form a right angle).', faded: true, blankAnswer: 'tan(α+β) is undefined (approaches ∞); α+β = 90°. The lines.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_08_001', title: 'The Binomial Theorem for a positive.',
          scaffold: { problem: 'A student invests ₹5000 in a fixed deposit at 6% annual compound interest.',
            steps: [
            { text: 'Identify a = 5000, b = 300, n = 4. The amount after 4 years is (5000 + 300)^4 by compound interest formula A = P(1+r)^n.' },
            { text: 'Write the Binomial Theorem expansion: (a+b)^4 = ^4C_0 a^4 + ^4C_1 a^3 b + ^4C_2 a^2 b^2 + ^4C_3 a b^3 + ^4C_4 b^4.' },
            { text: 'Calculate each binomial coefficient: ^4C_0 = 1, ^4C_1 = 4, ^4C_2 = 6, ^4C_3 = 4, ^4C_4 = 1.' },
            { text: 'Compute each term: T0 = 1 × (5000)^4 = 1 × 6.25×10^14 = 6.25×10^14; T1 = 4 × (5000)^3 × 300 = 4 × 1.25×10^11 × 300 =.' },
            { text: 'Sum all terms: 6.25×10^14 + 1.5×10^14 + 0.135×10^14 + 0.0054×10^14 + 0.000081×10^14 ≈ 7.890481×10^14 =.', faded: true, blankAnswer: '₹7,89,04,81,000 (₹789.0481 crore)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_08_002', title: 'The general term (denoted as.',
          scaffold: { problem: 'Find the 7th term in the expansion of \\(\\left( \\frac{4}{x^3} + \\frac{x^2}{2} \\right)^9\\).',
            steps: [
            { text: 'Identify the binomial in the form \\((a+b)^n\\). Here \\(a = \\frac{4}{x^3} = 4x^{-3}\\), \\(b = \\frac{x^2}{2} =.' },
            { text: 'The 7th term corresponds to \\(r+1 = 7\\), so \\(r = 6\\). Write the general term formula: \\(T_{r+1} = \\binom{9}{r} a^{9-r}.' },
            { text: 'Substitute \\(r=6\\), \\(a=4x^{-3}\\), \\(b=\\frac{1}{2}x^2\\): \\(T_7 = \\binom{9}{6} (4x^{-3})^{9-6}.' },
            { text: 'Simplify each part: \\(\\binom{9}{6} = \\binom{9}{3} = \\frac{9 \\times 8 \\times 7}{3 \\times 2 \\times 1} = 84\\).' },
            { text: 'Multiply coefficients: \\(84 \\times 64 \\times \\frac{1}{64} = 84\\).', faded: true, blankAnswer: '\\(84 x^3\\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_08_003', title: 'In the binomial expansion of (a + b)^n,.',
          scaffold: { problem: 'Find the middle term(s) in the expansion of (2x - 3/x²)^10.',
            steps: [
            { text: 'Identify n = 10 (even). Since n is even, there is exactly one middle term at position (n/2)+1 = 6th term.' },
            { text: 'Write the general term formula: T_{r+1} = ^nC_r a^{n-r} b^r. Here a = 2x, b = -3/x², n = 10, r = 5.' },
            { text: 'Substitute values: T_6 = ^10C_5 (2x)^{10-5} (-3/x²)^5 = ^10C_5 (2x)^5 (-3/x²)^5.' },
            { text: 'Compute binomial coefficient: ^10C_5 = 10!/(5!5!) = (10×9×8×7×6)/(5×4×3×2×1) = 252.' },
            { text: 'Simplify powers: (2x)^5 = 2^5 x^5 = 32x^5. (-3/x²)^5 = (-3)^5 / (x²)^5 = -243 / x^10.' },
            { text: 'Combine all parts: T_6 = 252 × 32x^5 × (-243/x^10) = 252 × 32 × (-243) × x^{5-10} = -1959552 x^{-5} = -1959552 / x^5.', faded: true, blankAnswer: '-1959552 / x^5' }
            ] } },
        { type: 'dissect', nodeId: 'c11_math_cbse_09_005', title: 'Identify each idea',
          dissect: { specimen: 'Arithmetic Progression: General Term', spots: [
            { id: 's1', label: 'The general term nth term', prompt: 'Which idea is this? — The general term (nth term) of an arithmetic progression (AP) with first term \\(a\\) and.', answer: 'The general term nth term', options: ['The general term nth term', 'A Geometric Progression GP is', 'The sum and difference formulas', 'The Binomial Theorem for a'] },
            { id: 's2', label: 'A Geometric Progression GP is', prompt: 'Which idea is this? — A Geometric Progression (GP) is a sequence of non-zero numbers where each term after the.', answer: 'A Geometric Progression GP is', options: ['A Geometric Progression GP is', 'The general term nth term', 'The sum and difference formulas', 'The Binomial Theorem for a'] },
            { id: 's3', label: 'The sum and difference formulas', prompt: 'Which idea is this? — The sum and difference formulas for trigonometric functions express the sine, cosine,.', answer: 'The sum and difference formulas', options: ['The sum and difference formulas', 'The general term nth term', 'A Geometric Progression GP is', 'The Binomial Theorem for a'] },
            { id: 's4', label: 'The Binomial Theorem for a', prompt: 'Which idea is this? — The Binomial Theorem for a positive integer index n states that for any real numbers a.', answer: 'The Binomial Theorem for a', options: ['The Binomial Theorem for a', 'The general term nth term', 'A Geometric Progression GP is', 'The sum and difference formulas'] },
            { id: 's5', label: 'The general term denoted as', prompt: 'Which idea is this? — The general term (denoted as \\(T_{r+1}\\)) in the binomial expansion of \\((a+b)^n\\) for.', answer: 'The general term denoted as', options: ['The general term denoted as', 'The general term nth term', 'A Geometric Progression GP is', 'The sum and difference formulas'] },
            { id: 's6', label: 'In the binomial expansion of', prompt: 'Which idea is this? — In the binomial expansion of (a + b)^n, the middle term(s) refer to the term(s) at the.', answer: 'In the binomial expansion of', options: ['In the binomial expansion of', 'The general term nth term', 'A Geometric Progression GP is', 'The sum and difference formulas'] }
          ] } }
    ],
    explore: { component: C11_AppliedMathsGeneralTermSumSim, prompt: 'Explore the interactive — Arithmetic Progression: General Term' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_09_002', difficulty: 'standard',
          question: 'The general term (nth term) of an arithmetic progression (AP) with first term.',
          hint: 'Revisit the derivation of the nth term formula from Class 10 (c10_math_cbse_05_003) by.',
          misconception: 'Students consistently write the nth term as \\(a_n = a + nd\\) instead of \\(a + (n-1)d\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The general term (nth term) of an arithmetic progression (AP) with first term \\(a\\) and',
                  options: ['The general term (nth term) of an arithmetic progression (AP) with first term \\(a\\) and', 'A Geometric Progression (GP) is a sequence of non-zero numbers where each term after the', 'The sum and difference formulas for trigonometric functions express the sine, cosine,', 'The Binomial Theorem for a positive integer index n states that for any real numbers a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently write the nth term as \\(a_n = a + nd\\) instead of \\(a + (n-1)d\\). For example, in the AP 3, 7, 11, ...' }
          ],
            remediations: { 'students-consistently-write-the-nth': { steps: ['Ask the student to write the first 5 terms of an AP with \\(a=2, d=3\\) explicitly: 2, 5, 8, 11, 14.', 'Have them label each term with its term number \\(n\\) and the number of \\(d\\)\'s added: \\(n=1 \\rightarrow 2+0\\times3\\),.', 'Point out the pattern: number of \\(d\\)\'s = \\(n-1\\).', 'Practice 3-4 problems where they must first write the expanded form (e.g., \\(a_7 = a + 6d\\)) before using the formula,.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_09_005', difficulty: 'standard',
          question: 'A Geometric Progression (GP) is a sequence of non-zero numbers where each term.',
          hint: 'If stuck, revisit c8_math_ch2_7 (exponent laws) and c9_math_ch8_8 (GP definition) —.',
          misconception: 'Students write T_n = ar^n instead of ar^(n-1), especially when the first term is given as "term 1".',
          parts: [
                { id: 'a', prompt: 'Write the general term formula for a GP with first term 5 and common ratio -3. What is the 6th term?', answer: 'The general term is T_n = 5 × (-3)^(n-1)',
                  options: ['The general term is T_n = 5 × (-3)^(n-1)', 'GP grows linearly like AP'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write T_n = ar^n instead of ar^(n-1), especially when the first term is given as "term 1". For example, given GP: 3, 6, 12, 24...' }
          ],
            remediations: { 'students-write-t-n-ar': { steps: ['Write the first 4 terms explicitly with exponents: T_1 = a = ar^0, T_2 = ar = ar^1, T_3 = ar^2, T_4 = ar^3.', 'Ask "What is the exponent when n=1? When n=2?" Guide the student to see the pattern: exponent = n-1.', 'Have them verify with a known term: "If a=3, r=2, what is T_4 by listing? What does ar^(n-1) give? What does ar^n give?"', 'Practice 3 problems where they must write the exponent pattern before plugging into formula.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_009', difficulty: 'standard',
          question: 'The sum and difference formulas for trigonometric functions express the sine,.',
          hint: 'Revisit c11_math_cbse_03_006 (Signs in Quadrants) and c11_math_cbse_03_008 (Pythagorean.',
          misconception: 'Students incorrectly distribute trigonometric functions over addition: sin(x+y) = sin x + sin y, cos(x+y) = cos x + cos.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The sum and difference formulas for trigonometric functions express the sine, cosine,',
                  options: ['The sum and difference formulas for trigonometric functions express the sine, cosine,', 'The general term (nth term) of an arithmetic progression (AP) with first term \\(a\\) and', 'A Geometric Progression (GP) is a sequence of non-zero numbers where each term after the', 'The Binomial Theorem for a positive integer index n states that for any real numbers a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly distribute trigonometric functions over addition: sin(x+y) = sin x + sin y, cos(x+y) = cos x + cos y, tan(x+y) = tan x.' }
          ],
            remediations: { 'students-incorrectly-distribute-trigonometric-fu': { steps: ['Have the student compute sin(30°+60°) numerically using calculator (sin 90° = 1) and compare with sin 30° + sin 60°.', 'Use the unit circle diagram from NCERT Fig 3.14: show that rotating by x then y gives coordinates (cos(x+y), sin(x+y)),.', 'Practice the "target-oriented" proof method: write LHS and RHS separately, simplify LHS step-by-step to match RHS,.', 'Drill the sign pattern in tan(x±y): "plus in numerator, minus in denominator for sum; minus in numerator, plus in.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_08_001', difficulty: 'standard',
          question: 'The Binomial Theorem for a positive integer index n states that for any real.',
          hint: 'If stuck, revisit Class 8 exponent laws (c8_math_ch2_7, c8_math_ch2_9) and Class 9.',
          misconception: 'Students write the Binomial Theorem as (a+b)^n = ^nC_0 a^n + ^nC_1 a^{n-1}b + ^nC_2 a^{n-2}b^2 + ...',
          parts: [
                { id: 'a', prompt: 'Explain why the binomial coefficients in the expansion of (a + b)^n are symmetric, i.e., why ^nC_k = ^nC_{n-k} for all k = 0, 1, ..., n.', answer: 'Algebraically: ^nC_k = n!/(k!(n-k)!) and ^nC_{n-k} = n!/((n-k)!k!)',
                  options: ['Algebraically: ^nC_k = n!/(k!(n-k)!) and ^nC_{n-k} = n!/((n-k)!k!)', 'because Pascal\'s triangle is symmetric'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the Binomial Theorem as (a+b)^n = ^nC_0 a^n + ^nC_1 a^{n-1}b + ^nC_2 a^{n-2}b^2 + ...' }
          ],
            remediations: { 'students-write-the-binomial-theorem': { steps: ['If a student makes this error, do NOT just re-explain the proof.', 'Instead: (1) Have them write out the k=3 case explicitly: multiply (a+b)^3 expansion by (a+b) and show how terms with.', '(2) Point out that the first sum has terms a^4, a^3b, a^2b^2, ab^3 and the second has a^3b, a^2b^2, ab^3, b^4 — only.', '(3) Guide them to re-index the second sum by substituting r\' = r+1 so both sums run over same powers.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_08_002', difficulty: 'standard',
          question: 'The general term (denoted as \\(T_{r+1}\\)) in the binomial expansion of.',
          hint: 'If stuck, revisit "Binomial Theorem: Statement and Proof" (c11_math_cbse_08_001) to see.',
          misconception: 'Students often confuse the index \\(r\\) in \\(T_{r+1}\\) with the term number.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The general term (denoted as \\(T_{r+1}\\)) in the binomial expansion of \\((a+b)^n\\) for',
                  options: ['The general term (denoted as \\(T_{r+1}\\)) in the binomial expansion of \\((a+b)^n\\) for', 'The general term (nth term) of an arithmetic progression (AP) with first term \\(a\\) and', 'A Geometric Progression (GP) is a sequence of non-zero numbers where each term after the', 'The sum and difference formulas for trigonometric functions express the sine, cosine,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the index \\(r\\) in \\(T_{r+1}\\) with the term number.' }
          ],
            remediations: { 'students-often-confuse-the-index': { steps: ['If a student substitutes the wrong \\(r\\), have them write the first 3 terms explicitly for a small \\(n\\) (e.g.,.', 'For sign errors, isolate the sign factor: write \\(b = (-1) \\times |b|\\), then \\(b^r = (-1)^r |b|^r\\).', 'Practice with \\(r\\) even/odd separately.', 'For exponent errors, enforce the rule: \\(\\frac{1}{x^r} = x^{-r}\\) before combining powers.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_08_003', difficulty: 'standard',
          question: 'In the binomial expansion of (a + b)^n, the middle term(s) refer to the term(s).',
          hint: 'Review the general term formula derivation (node c11_math_cbse_08_002) and practice.',
          misconception: 'Students consistently confuse the term index (k in T_k) with the r-value in the general term formula T_{r+1}.',
          parts: [
                { id: 'a', prompt: 'State the position(s) of the middle term(s) in the expansion of (2x - 3y)^9. Do not compute the term(s), only give the term number(s) T_k.', answer: 'For n = 9 (odd), there are two middle terms at positions T_{(9+1)/2} = T_5 and',
                  options: ['For n = 9 (odd), there are two middle terms at positions T_{(9+1)/2} = T_5 and', 'T_5 only', 'a single middle term for all n, confusing the even-n rule with the odd-n case'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse the term index (k in T_k) with the r-value in the general term formula T_{r+1}.' }
          ],
            remediations: { 'students-consistently-confuse-the-term': { steps: ['Have the student write the total number of terms = n+1 for three expansions (n=5,6,7) and physically mark the middle.', 'For each, derive r from position: position k → r = k-1.', 'Practice the rule: "If n even → one middle at r=n/2; if n odd → two middles at r=(n-1)/2 and r=(n+1)/2".', 'Drill 5 problems where they only identify r-values before computing.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
