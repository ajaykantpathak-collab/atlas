import type { SimDef } from '../../engine/types';
import C11_MathematicsGeneralMiddleTermSim from '../../../simulations/c6_12/C11_MathematicsGeneralMiddleTermSim';

/** v3 wrapped master — C11_MathematicsGeneralMiddleTermSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_mathematicsgeneralmiddletermsim: SimDef = {
    id: 'v3w_c11_mathematicsgeneralmiddletermsim',
    title: 'Binomial Theorem: Statement and Proof',
    subtitle: 'This node covers the statement and proof of the Binomial Theorem for positive integer.',
    classLevel: 11, subject: 'mathematics', topic: 'Binomial Theorem: Statement and Proof',
    chapters: [],
    nodeIds: ['c11_math_cbse_08_001', 'c11_math_cbse_08_003', 'c11_math_cbse_08_002', 'c11_math_cbse_08_004', 'c11_math_cbse_08_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you need to calculate (102)^5 for a compound interest problem where principal is ₹100 and rate is 2%.', goal: 'Master Binomial Theorem: Statement and Proof.' },
    discovery: {
        question: 'State the position(s) of the middle term(s) in the expansion of (2x - 3y)^9. Do not compute the term(s), only give the term number(s) T_k.',
        options: ['For n = 9 (odd), there are two middle terms at positions T_{(9+1)/2} = T_5 and', 'T_5 only', 'a single middle term for all n, confusing the even-n rule with the odd-n case'],
        answer: 'For n = 9 (odd), there are two middle terms at positions T_{(9+1)/2} = T_5 and',
        hook: 'Students consistently confuse the term index (k in T_k) with the r-value in the general term formula T_{r+1}.',
    },
    teaching: [
        { title: 'The Binomial Theorem for a positive integer.', text: 'The Binomial Theorem for a positive integer index n states that for any real numbers a and b, the expansion of (a + b)^n is given by (a + b)^n = Σ_{k=0}^{n} ^nC_k a^{n-k} b^k, where ^nC_k =.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_math_cbse_08_001', title: 'The Binomial Theorem for a positive.',
          scaffold: { problem: 'A student invests ₹5000 in a fixed deposit at 6% annual compound interest.',
            steps: [
            { text: 'Identify a = 5000, b = 300, n = 4. The amount after 4 years is (5000 + 300)^4 by compound interest formula A = P(1+r)^n.' },
            { text: 'Write the Binomial Theorem expansion: (a+b)^4 = ^4C_0 a^4 + ^4C_1 a^3 b + ^4C_2 a^2 b^2 + ^4C_3 a b^3 + ^4C_4 b^4.' },
            { text: 'Calculate each binomial coefficient: ^4C_0 = 1, ^4C_1 = 4, ^4C_2 = 6, ^4C_3 = 4, ^4C_4 = 1.' },
            { text: 'Compute each term: T0 = 1 × (5000)^4 = 1 × 6.25×10^14 = 6.25×10^14; T1 = 4 × (5000)^3 × 300 = 4 × 1.25×10^11 × 300 =.' },
            { text: 'Sum all terms: 6.25×10^14 + 1.5×10^14 + 0.135×10^14 + 0.0054×10^14 + 0.000081×10^14 ≈ 7.890481×10^14 =.', faded: true, blankAnswer: '₹7,89,04,81,000 (₹789.0481 crore)' }
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
        { type: 'scaffold', nodeId: 'c11_math_cbse_08_002', title: 'The general term (denoted as.',
          scaffold: { problem: 'Find the 7th term in the expansion of \\(\\left( \\frac{4}{x^3} + \\frac{x^2}{2} \\right)^9\\).',
            steps: [
            { text: 'Identify the binomial in the form \\((a+b)^n\\). Here \\(a = \\frac{4}{x^3} = 4x^{-3}\\), \\(b = \\frac{x^2}{2} =.' },
            { text: 'The 7th term corresponds to \\(r+1 = 7\\), so \\(r = 6\\). Write the general term formula: \\(T_{r+1} = \\binom{9}{r} a^{9-r}.' },
            { text: 'Substitute \\(r=6\\), \\(a=4x^{-3}\\), \\(b=\\frac{1}{2}x^2\\): \\(T_7 = \\binom{9}{6} (4x^{-3})^{9-6}.' },
            { text: 'Simplify each part: \\(\\binom{9}{6} = \\binom{9}{3} = \\frac{9 \\times 8 \\times 7}{3 \\times 2 \\times 1} = 84\\).' },
            { text: 'Multiply coefficients: \\(84 \\times 64 \\times \\frac{1}{64} = 84\\).', faded: true, blankAnswer: '\\(84 x^3\\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_08_004', title: 'In the binomial expansion of \\((a +.',
          scaffold: { problem: 'Find the term independent of \\(x\\) in the expansion of \\(\\left( \\frac{3}{2}x^2 - \\frac{1}{3x} \\right)^9\\).',
            steps: [
            { text: 'Identify the binomial: \\(a = \\frac{3}{2}x^2\\), \\(b = -\\frac{1}{3x}\\), \\(n = 9\\).' },
            { text: 'Substitute \\(a\\) and \\(b\\): \\(T_{r+1} = \\binom{9}{r} \\left(\\frac{3}{2}x^2\\right)^{9-r} \\left(-\\frac{1}{3x}\\right)^r\\).' },
            { text: 'Simplify the powers of \\(x\\): \\(x^{2(9-r)} \\cdot x^{-r} = x^{18 - 3r}\\).' },
            { text: 'For the term independent of \\(x\\), set the exponent of \\(x\\) to zero: \\(18 - 3r = 0 \\Rightarrow r = 6\\).' },
            { text: 'Substitute \\(r=6\\) into the coefficient: \\(T_7 = \\binom{9}{6} \\left(\\frac{3}{2}\\right)^3 \\left(-\\frac{1}{3}\\right)^6 =.', faded: true, blankAnswer: '\\(\\frac{7}{18}\\) (the 7th term)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_08_009', title: 'The Binomial Theorem for Any Index.',
          scaffold: { problem: 'Expand \\( (1 - 3x)^{-2} \\) up to the term in \\( x^3 \\) and state the range of values of \\( x \\) for which the expansion is valid.',
            steps: [
            { text: 'Identify the index \\( n = -2 \\) and the variable part \\( x \\) replaced by \\( -3x \\).' },
            { text: 'Write the general binomial expansion for any index: \\( (1+y)^n = 1 + ny + \\frac{n(n-1)}{2!}y^2 +.' },
            { text: 'Substitute \\( n = -2 \\) and \\( y = -3x \\) into the formula:' },
            { text: 'Combine terms: \\( (1 - 3x)^{-2} = 1 + 6x + 27x^2 + 108x^3 + \\cdots \\)' },
            { text: 'State validity condition: \\( |y| < 1 \\Rightarrow |-3x| < 1 \\Rightarrow |x| < \\frac{1}{3} \\).', faded: true, blankAnswer: '\\( 1 + 6x + 27x^2 + 108x^3 + \\cdots \\), valid for \\( |x| <.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_math_cbse_08_003', title: 'Identify each idea',
          dissect: { specimen: 'Binomial Theorem: Statement and Proof', spots: [
            { id: 's1', label: 'The Binomial Theorem for a', prompt: 'Which idea is this? — The Binomial Theorem for a positive integer index n states that for any real numbers a.', answer: 'The Binomial Theorem for a', options: ['The Binomial Theorem for a', 'In the binomial expansion of', 'The general term denoted as', 'The Binomial Theorem for Any'] },
            { id: 's2', label: 'In the binomial expansion of', prompt: 'Which idea is this? — In the binomial expansion of (a + b)^n, the middle term(s) refer to the term(s) at the.', answer: 'In the binomial expansion of', options: ['In the binomial expansion of', 'The Binomial Theorem for a', 'The general term denoted as', 'The Binomial Theorem for Any'] },
            { id: 's3', label: 'The general term denoted as', prompt: 'Which idea is this? — The general term (denoted as \\(T_{r+1}\\)) in the binomial expansion of \\((a+b)^n\\) for.', answer: 'The general term denoted as', options: ['The general term denoted as', 'The Binomial Theorem for a', 'In the binomial expansion of', 'The Binomial Theorem for Any'] },
            { id: 's4', label: 'The Binomial Theorem for Any', prompt: 'Which idea is this? — The Binomial Theorem for Any Index states that for any real number \\( n \\) (positive,.', answer: 'The Binomial Theorem for Any', options: ['The Binomial Theorem for Any', 'The Binomial Theorem for a', 'In the binomial expansion of', 'The general term denoted as'] }
          ] } }
    ],
    explore: { component: C11_MathematicsGeneralMiddleTermSim, prompt: 'Explore the interactive — Binomial Theorem: Statement and Proof' },
    challenges: [
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
            remediations: { 'students-consistently-confuse-the-term': { steps: ['Have the student write the total number of terms = n+1 for three expansions (n=5,6,7) and physically mark the middle.', 'For each, derive r from position: position k → r = k-1.', 'Practice the rule: "If n even → one middle at r=n/2; if n odd → two middles at r=(n-1)/2 and r=(n+1)/2".', 'Drill 5 problems where they only identify r-values before computing.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_08_002', difficulty: 'standard',
          question: 'The general term (denoted as \\(T_{r+1}\\)) in the binomial expansion of.',
          hint: 'If stuck, revisit "Binomial Theorem: Statement and Proof" (c11_math_cbse_08_001) to see.',
          misconception: 'Students often confuse the index \\(r\\) in \\(T_{r+1}\\) with the term number.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The general term (denoted as \\(T_{r+1}\\)) in the binomial expansion of \\((a+b)^n\\) for',
                  options: ['The general term (denoted as \\(T_{r+1}\\)) in the binomial expansion of \\((a+b)^n\\) for', 'The Binomial Theorem for a positive integer index n states that for any real numbers a', 'In the binomial expansion of (a + b)^n, the middle term(s) refer to the term(s) at the', 'In the binomial expansion of \\((a + b)^n\\) where \\(n\\) is a positive integer, the general'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the index \\(r\\) in \\(T_{r+1}\\) with the term number.' }
          ],
            remediations: { 'students-often-confuse-the-index': { steps: ['If a student substitutes the wrong \\(r\\), have them write the first 3 terms explicitly for a small \\(n\\) (e.g.,.', 'For sign errors, isolate the sign factor: write \\(b = (-1) \\times |b|\\), then \\(b^r = (-1)^r |b|^r\\).', 'Practice with \\(r\\) even/odd separately.', 'For exponent errors, enforce the rule: \\(\\frac{1}{x^r} = x^{-r}\\) before combining powers.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_08_004', difficulty: 'standard',
          question: 'In the binomial expansion of \\((a + b)^n\\) where \\(n\\) is a positive integer,.',
          hint: 'If stuck, revisit the derivation of the general term in node c11_math_cbse_08_002 and.',
          misconception: 'Students often treat the index \\(r\\) in the general term \\(T_{r+1}\\) as the term number (i.e., they think \\(T_r\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In the binomial expansion of \\((a + b)^n\\) where \\(n\\) is a positive integer, the general',
                  options: ['In the binomial expansion of \\((a + b)^n\\) where \\(n\\) is a positive integer, the general', 'The Binomial Theorem for a positive integer index n states that for any real numbers a', 'In the binomial expansion of (a + b)^n, the middle term(s) refer to the term(s) at the', 'The general term (denoted as \\(T_{r+1}\\)) in the binomial expansion of \\((a+b)^n\\) for'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the index \\(r\\) in the general term \\(T_{r+1}\\) as the term number (i.e., they think \\(T_r\\) corresponds to.' }
          ],
            remediations: { 'students-often-treat-the-index': { steps: ['If a student substitutes the wrong \\(r\\) (off-by-one), ask: "Write the first three terms of \\((a+b)^n\\) using the.', 'Which term number does \\(r=0\\) give?" This reinforces \\(T_{r+1}\\) indexing.', 'If they forget the integer check, give an example where \\(r\\) comes out fractional (like \\(x^5\\) in \\((2x^3 -.', 'What does \\(\\binom{7}{3.2}\\) mean?" Then guide them to state: "Since \\(r\\) must be an integer between 0 and \\(n\\), no.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_08_009', difficulty: 'standard',
          question: 'The Binomial Theorem for Any Index states that for any real number \\( n \\).',
          hint: 'If stuck, review the general term formula from node c11_math_cbse_08_002 and the.',
          misconception: 'Students often treat the binomial coefficient \\( \\binom{n}{r} \\) for non-integer \\( n \\) as \\( \\frac{n!}{r!(n-r)!} \\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Binomial Theorem for Any Index states that for any real number \\( n \\) (positive,',
                  options: ['The Binomial Theorem for Any Index states that for any real number \\( n \\) (positive,', 'The Binomial Theorem for a positive integer index n states that for any real numbers a', 'In the binomial expansion of (a + b)^n, the middle term(s) refer to the term(s) at the', 'The general term (denoted as \\(T_{r+1}\\)) in the binomial expansion of \\((a+b)^n\\) for'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the binomial coefficient \\( \\binom{n}{r} \\) for non-integer \\( n \\) as \\( \\frac{n!}{r!(n-r)!} \\) using factorial.' }
          ],
            remediations: { 'students-often-treat-the-binomial': { steps: ['Remind the student that factorial is defined only for non-negative integers.', 'Show the correct product form: \\( \\binom{n}{r} = \\frac{n(n-1)\\cdots(n-r+1)}{r!} \\) for any real \\( n \\).', 'Practice computing \\( \\binom{-3}{2} \\), \\( \\binom{1/2}{3} \\), \\( \\binom{-1/2}{4} \\) step by step.', 'Emphasize that the number of factors in the numerator equals \\( r \\), and the denominator is \\( r!'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
