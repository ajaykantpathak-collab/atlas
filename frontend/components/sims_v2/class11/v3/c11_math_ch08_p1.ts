import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch08_p1: SimDef = {
    id: 'v3_c11_math_ch08_p1',
    title: 'Binomial Theorem · Part 1/2',
    subtitle: 'Read a binomial expansion by its address, not by multiplying it out.',
    classLevel: 11, subject: 'mathematics', topic: 'Binomial Theorem · Part 1/2',
    chapters: ['c11_math_ch08'],
    nodeIds: ['c11_math_cbse_08_001', 'c11_math_cbse_08_002', 'c11_math_cbse_08_003', 'c11_math_cbse_08_004', 'c11_math_cbse_08_005', 'c11_math_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an accountant shortcutting (100 + 2)⁵ for compound interest', intro: '(a + b)¹⁵ has sixteen terms — but the formula hands you the eighth alone, no multiplication marathon required.', goal: 'Use the general term T_{r+1} with correct indexing, signs and exponents.' },
    discovery: {
        question: 'In (x² + 1/x)¹², a student says the x-free term sits at r = 4. Check the exponent.',
        options: ['Wrong — the term\'s power is 24 − 3r, so the constant needs r = 8', 'Right — r = 4 balances the powers', 'Right — 12/3 = 4 always gives the middle', 'Wrong — no constant term exists in this expansion'],
        answer: 'Wrong — the term\'s power is 24 − 3r, so the constant needs r = 8',
        hook: 'And the fifth term uses r = 4, not r = 5 — T_{r+1} is off-by-one by design, and the minus sign in (−2/x) is raised to r too.',
    },
    teaching: [
        { title: 'Binomial Theorem: Statement and Proof', text: 'The Binomial Theorem for a positive integer index n states that for any real numbers a and b, the expansion of (a + b)^n is given by (a + b)^n = Σ_{k=0}^{n} ^nC_k a^{n-k} b^k, where ^nC_k.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_08_001', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Expand (2x − 3y)⁴ coefficient by coefficient, then extract exactly the fifth term of (3x² − 2/x)⁷ without writing the rest.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_08_001', title: 'Binomial Theorem: Statement and Proof',
          scaffold: { problem: 'A student invests ₹5000 in a fixed deposit at 6% annual compound interest.',
            steps: [
            { text: 'Identify a = 5000, b = 300, n = 4. The amount after 4 years is (5000 + 300)^4 by compound interest formula A = P(1+r)^n.' },
            { text: 'Write the Binomial Theorem expansion: (a+b)^4 = ^4C_0 a^4 + ^4C_1 a^3 b + ^4C_2 a^2 b^2 + ^4C_3 a b^3 + ^4C_4 b^4.' },
            { text: 'Calculate each binomial coefficient: ^4C_0 = 1, ^4C_1 = 4, ^4C_2 = 6, ^4C_3 = 4, ^4C_4 = 1.' },
            { text: 'Compute each term: T0 = 1 × (5000)^4 = 1 × 6.25×10^14 = 6.25×10^14; T1 = 4 × (5000)^3 × 300 = 4 × 1.25×10^11 × 300.' },
            { text: 'Sum all terms: 6.25×10^14 + 1.5×10^14 + 0.135×10^14 + 0.0054×10^14 + 0.000081×10^14 ≈ 7.890481×10^14.', faded: true, blankAnswer: '₹7,89,04,81,000 (₹789.0481 crore)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_08_002', title: 'General Term in Binomial Expansion',
          scaffold: { problem: 'Find the 7th term in the expansion of \\(\\left( \\frac{4}{x^3} + \\frac{x^2}{2} \\right)^9\\).',
            steps: [
            { text: 'Identify the binomial in the form \\((a+b)^n\\). Here \\(a = \\frac{4}{x^3} = 4x^{-3}\\), \\(b = \\frac{x^2}{2}.' },
            { text: 'The 7th term corresponds to \\(r+1 = 7\\), so \\(r = 6\\). Write the general term formula: \\(T_{r+1} = \\binom{9}{r} a^{9-r}.' },
            { text: 'Substitute \\(r=6\\), \\(a=4x^{-3}\\), \\(b=\\frac{1}{2}x^2\\): \\(T_7 = \\binom{9}{6} (4x^{-3})^{9-6}.' },
            { text: 'Simplify each part: \\(\\binom{9}{6} = \\binom{9}{3} = \\frac{9 \\times 8 \\times 7}{3 \\times 2 \\times 1} = 84\\).' },
            { text: 'Multiply coefficients: \\(84 \\times 64 \\times \\frac{1}{64} = 84\\).', faded: true, blankAnswer: '\\(84 x^3\\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_08_003', title: 'Middle Term in Binomial Expansion',
          scaffold: { problem: 'Find the middle term(s) in the expansion of (2x - 3/x²)^10.',
            steps: [
            { text: 'Identify n = 10 (even). Since n is even, there is exactly one middle term at position (n/2)+1 = 6th term.' },
            { text: 'Write the general term formula: T_{r+1} = ^nC_r a^{n-r} b^r. Here a = 2x, b = -3/x², n = 10, r = 5.' },
            { text: 'Substitute values: T_6 = ^10C_5 (2x)^{10-5} (-3/x²)^5 = ^10C_5 (2x)^5 (-3/x²)^5.' },
            { text: 'Compute binomial coefficient: ^10C_5 = 10!/(5!5!) = (10×9×8×7×6)/(5×4×3×2×1) = 252.' },
            { text: 'Simplify powers: (2x)^5 = 2^5 x^5 = 32x^5. (-3/x²)^5 = (-3)^5 / (x²)^5 = -243 / x^10.' },
            { text: 'Combine all parts: T_6 = 252 × 32x^5 × (-243/x^10) = 252 × 32 × (-243) × x^{5-10} = -1959552 x^{-5} = -1959552 / x^5.', faded: true, blankAnswer: '-1959552 / x^5' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_08_004', title: 'Finding Specific Terms Using General Term',
          scaffold: { problem: 'Find the term independent of \\(x\\) in the expansion of \\(\\left( \\frac{3}{2}x^2 - \\frac{1}{3x} \\right)^9\\).',
            steps: [
            { text: 'Identify the binomial: \\(a = \\frac{3}{2}x^2\\), \\(b = -\\frac{1}{3x}\\), \\(n = 9\\).' },
            { text: 'Substitute \\(a\\) and \\(b\\): \\(T_{r+1} = \\binom{9}{r} \\left(\\frac{3}{2}x^2\\right)^{9-r} \\left(-\\frac{1}{3x}\\right)^r\\).' },
            { text: 'Simplify the powers of \\(x\\): \\(x^{2(9-r)} \\cdot x^{-r} = x^{18 - 3r}\\).' },
            { text: 'For the term independent of \\(x\\), set the exponent of \\(x\\) to zero: \\(18 - 3r = 0 \\Rightarrow r = 6\\).' },
            { text: 'Substitute \\(r=6\\) into the coefficient: \\(T_7 = \\binom{9}{6} \\left(\\frac{3}{2}\\right)^3 \\left(-\\frac{1}{3}\\right)^6.', faded: true, blankAnswer: '\\(\\frac{7}{18}\\) (the 7th term)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_08_005', title: 'Coefficient of x^n in Binomial Expansion',
          scaffold: { problem: 'Find the coefficient of \\(x^7\\) in the expansion of \\((2x^2 - \\frac{3}{x})^8\\).',
            steps: [
            { text: 'Identify the binomial: \\(a = 2x^2\\), \\(b = -\\frac{3}{x}\\), \\(m = 8\\).' },
            { text: 'Write the general term \\(T_{r+1} = \\binom{8}{r} (2x^2)^{8-r} \\left(-\\frac{3}{x}\\right)^r\\).' },
            { text: 'Simplify the powers of \\(x\\): \\((x^2)^{8-r} = x^{16-2r}\\), \\((x^{-1})^r = x^{-r}\\).' },
            { text: 'Set the exponent equal to 7: \\(16 - 3r = 7 \\Rightarrow 3r = 9 \\Rightarrow r = 3\\).' },
            { text: 'Substitute \\(r=3\\) into the coefficient part: \\(\\binom{8}{3} (2)^{5} (-3)^3 = 56 \\times 32 \\times (-27) = -48384\\).', faded: true, blankAnswer: '\\(-48384\\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_08_006', title: 'Properties of Binomial Coefficients',
          scaffold: { problem: 'A school club has 12 members. In how many ways can they form a committee with an even number of members?',
            steps: [
            { text: 'Recognise that the number of ways to choose a committee of size \\( r \\) from 12 members is \\( \\binom{12}{r} \\).' },
            { text: 'Recall the two key sums from binomial theorem: \\( (1+1)^{12} = \\sum_{r=0}^{12} \\binom{12}{r} = 2^{12} \\) and \\.' },
            { text: 'Add the two equations: \\( \\sum \\binom{12}{r} + \\sum (-1)^r \\binom{12}{r} = 2^{12} + 0 \\).' },
            { text: 'Divide by 2: \\( \\sum_{\\text{even } r} \\binom{12}{r} = 2^{11} = 2048 \\).' },
            { text: 'Verify: total subsets of a 12-element set is \\( 2^{12} = 4096 \\); exactly half have even size, half odd size.', faded: true, blankAnswer: '2048 ways' }
            ] } },
        { type: 'drill', nodeId: 'c11_math_cbse_08_006', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Expanding (x² − 2/x)¹⁵ for a term-hunt, a teammate needs the 4th term and substitutes r = 4 into T_{r+1}; he also writes (−2/x)^r = −2^r/x^r and simplifies the x-power to 2n − r.',
            decisions: [{ prompt: 'Which three index slips must he fix?', options: [
                { text: 'Align the index, the sign and the exponent: the 4th term uses r = 3, since T_{r+1} numbers terms from r = 0. The negative sign is inside the power: (−2/x)^r = (−1)^r · 2^r/x^r — alternating signs, not a fixed minus. And (x²)^(n−r)·(1/x)^r = x^{2n−2r}·x^{−r} = x^{2n−3r} — the denominator\'s exponent subtracts.', outcome: 'The term comes out right: r counts from zero, signs alternate, and powers of a and b always sum to n.' },
                { text: 'Keep r = 4 for the 4th term — the subscript matches the term number.', outcome: 'The formula is T_{r+1}: term number is r+1, so the 4th term is r = 3 — off-by-one shifts the whole answer.', reveals: 'r-equals-term-number' },
                { text: 'Keep −2^r/x^r — the minus sign in b just carries down.', outcome: 'The sign is part of b and gets raised to r: even r gives positive, odd r negative — a fixed minus breaks half the terms.', reveals: 'negative-sign-not-powered' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'Powers of a fall while powers of b climb, always summing to n — the general term is a slot machine you can read directly.',
            decisions: [{ prompt: 'What comes next? Binomial Theorem · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Binomial Theorem · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_08_001', difficulty: 'standard',
          question: 'The Binomial Theorem for a positive integer index n states that for any real.',
          hint: 'If stuck, revisit Class 8 exponent laws (c8_math_ch2_7, c8_math_ch2_9) and Class 9.',
          misconception: 'Students write the Binomial Theorem as (a+b)^n = ^nC_0 a^n + ^nC_1 a^{n-1}b + ^nC_2 a^{n-2}b^2 + ...',
          parts: [
                { id: 'a', prompt: 'Explain why the binomial coefficients in the expansion of (a + b)^n are symmetric, i.e., why ^nC_k = ^nC_{n-k} for all k = 0, 1, ..., n.', answer: 'Algebraically: ^nC_k = n!/(k!(n-k)!) and ^nC_{n-k} = n!/((n-k)!k!)',
                  options: ['Algebraically: ^nC_k = n!/(k!(n-k)!) and ^nC_{n-k} = n!/((n-k)!k!)', 'because Pascal\'s triangle is symmetric'],
                  hint: 'If stuck, revisit Class 8 exponent laws (c8_math_ch2_7, c8_math_ch2_9) and Class 9 algebraic.',
                  misconception: 'Students write the Binomial Theorem as (a+b)^n = ^nC_0 a^n + ^nC_1 a^{n-1}b + ^nC_2 a^{n-2}b^2 + ...' }
          ],
            remediations: { 'students-write-the-binomial-theorem': { steps: ['If a student makes this error, do NOT just re-explain the proof.', 'Instead: (1) Have them write out the k=3 case explicitly: multiply (a+b)^3 expansion by (a+b) and show how terms with.', '(2) Point out that the first sum has terms a^4, a^3b, a^2b^2, ab^3 and the second has a^3b, a^2b^2, ab^3, b^4 — only.', '(3) Guide them to re-index the second sum by substituting r\' = r+1 so both sums run over same powers.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_08_002', difficulty: 'standard',
          question: 'The general term (denoted as \\(T_{r+1}\\)) in the binomial expansion.',
          hint: 'If stuck, revisit "Binomial Theorem: Statement and Proof" (c11_math_cbse_08_001) to see.',
          misconception: 'Students often confuse the index \\(r\\) in \\(T_{r+1}\\) with the term number.',
          parts: [
                { id: 'a', prompt: 'In the expansion of \\((2x - \\frac{1}{x})^6\\), a student writes the general term as \\(T_{r+1} = \\binom{6}{r} (2x)^{6-r} \\left(-\\frac{1}{x}\\right)^r\\).', answer: 'Yes, the simplification is correct',
                  options: ['Yes, the simplification is correct', 'the power is \\(x^{6-r}\\'],
                  hint: 'If stuck, revisit "Binomial Theorem: Statement and Proof" (c11_math_cbse_08_001) to see the.',
                  misconception: 'Students often confuse the index \\(r\\) in \\(T_{r+1}\\) with the term number.' },
                { id: 'b', prompt: 'Compare the general term of \\((x+y)^n\\) and \\((x-y)^n\\). How does the sign pattern differ?', answer: 'For \\((x+y)^n\\), \\(T_{r+1} = \\binom{n}{r} x^{n-r} y^r\\) (all positive)',
                  options: ['For \\((x+y)^n\\), \\(T_{r+1} = \\binom{n}{r} x^{n-r} y^r\\) (all positive)', 'signs are same for all terms, or that \\((y-x'],
                  hint: 'If stuck, revisit "Binomial Theorem: Statement and Proof" (c11_math_cbse_08_001) to see the.',
                  misconception: 'Students often confuse the index \\(r\\) in \\(T_{r+1}\\) with the term number.' }
          ],
            remediations: { 'students-often-confuse-the-index': { steps: ['If a student substitutes the wrong \\(r\\), have them write the first 3 terms explicitly for a small \\(n\\) (e.g.', 'For sign errors, isolate the sign factor: write \\(b = (-1) \\times |b|\\), then \\(b^r = (-1)^r |b|^r\\).', 'Practice with \\(r\\) even/odd separately.', 'For exponent errors, enforce the rule: \\(\\frac{1}{x^r} = x^{-r}\\) before combining powers.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_08_003', difficulty: 'standard',
          question: 'In the binomial expansion of (a + b)^n, the middle term(s) refer to the term(s).',
          hint: 'Review the general term formula derivation (node c11_math_cbse_08_002) and practice.',
          misconception: 'Students consistently confuse the term index (k in T_k) with the r-value in the general term formula T_{r+1}.',
          parts: [
                { id: 'a', prompt: 'State the position(s) of the middle term(s) in the expansion of (2x - 3y)^9. Do not compute the term(s), only give the term number(s) T_k.', answer: 'For n = 9 (odd), there are two middle terms at positions T_{(9+1)/2} = T_5 and',
                  options: ['For n = 9 (odd), there are two middle terms at positions T_{(9+1)/2} = T_5 and', 'T_5 only', 'a single middle term for all n, confusing the even-n rule with the odd-n case'],
                  hint: 'Review the general term formula derivation (node c11_math_cbse_08_002) and practice computing ^nC_r.',
                  misconception: 'Students consistently confuse the term index (k in T_k) with the r-value in the general term formula T_{r+1}.' }
          ],
            remediations: { 'students-consistently-confuse-the-term': { steps: ['Have the student write the total number of terms = n+1 for three expansions (n=5,6,7) and physically mark the middle.', 'For each, derive r from position: position k → r = k-1.', 'Practice the rule: "If n even → one middle at r=n/2; if n odd → two middles at r=(n-1)/2 and r=(n+1)/2".', 'Drill 5 problems where they only identify r-values before computing.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_08_004', difficulty: 'standard',
          question: 'In the binomial expansion of \\((a + b)^n\\) where \\(n\\) is a positive integer.',
          hint: 'If stuck, revisit the derivation of the general term in node c11_math_cbse_08_002 and.',
          misconception: 'Students often treat the index \\(r\\) in the general term \\(T_{r+1}\\) as the term number (i.e., they think \\(T_r\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In the binomial expansion of \\((a + b)^n\\) where \\(n\\) is a positive integer, the general',
                  options: ['In the binomial expansion of \\((a + b)^n\\) where \\(n\\) is a positive integer, the general', 'The Binomial Theorem for a positive integer index n states that for any real numbers a', 'The general term (denoted as \\(T_{r+1}\\)) in the binomial expansion of \\((a+b)^n\\) for', 'In the binomial expansion of (a + b)^n, the middle term(s) refer to the term(s) at the'],
                  hint: 'If stuck, revisit the derivation of the general term in node c11_math_cbse_08_002 and practice.',
                  misconception: 'Students often treat the index \\(r\\) in the general term \\(T_{r+1}\\) as the term number (i.e., they think \\(T_r\\) corresponds.' }
          ],
            remediations: { 'students-often-treat-the-index': { steps: ['If a student substitutes the wrong \\(r\\) (off-by-one), ask: "Write the first three terms of \\((a+b)^n\\) using the.', 'Which term number does \\(r=0\\) give?" This reinforces \\(T_{r+1}\\) indexing.', 'If they forget the integer check, give an example where \\(r\\) comes out fractional (like \\(x^5\\) in \\((2x^3.', 'What does \\(\\binom{7}{3.2}\\) mean?" Then guide them to state: "Since \\(r\\) must be an integer between 0 and \\(n\\),.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_08_005', difficulty: 'standard',
          question: 'The coefficient of \\(x^n\\) in the binomial expansion of \\((a + b)^m\\) (where.',
          hint: 'If stuck, revisit the general term formula in node c11_math_cbse_08_002 and practise.',
          misconception: 'Students frequently set the exponent of \\(x\\) in the general term equal to the desired power but forget that the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The coefficient of \\(x^n\\) in the binomial expansion of \\((a + b)^m\\) (where \\(m\\) is a',
                  options: ['The coefficient of \\(x^n\\) in the binomial expansion of \\((a + b)^m\\) (where \\(m\\) is a', 'The Binomial Theorem for a positive integer index n states that for any real numbers a', 'The general term (denoted as \\(T_{r+1}\\)) in the binomial expansion of \\((a+b)^n\\) for', 'In the binomial expansion of (a + b)^n, the middle term(s) refer to the term(s) at the'],
                  hint: 'If stuck, revisit the general term formula in node c11_math_cbse_08_002 and practise simplifying.',
                  misconception: 'Students frequently set the exponent of \\(x\\) in the general term equal to the desired power but forget that the binomial may contain \\(x\\).' }
          ],
            remediations: { 'students-frequently-set-the-exponent': { steps: ['**Re‑teach exponent combination**: Write the general term step by step: \\(T_{r+1} = \\binom{m}{r} (A x^p)^{m-r} (B.', 'Emphasise that the exponent is the sum \\(p(m-r) + qr\\).', '**Drill with mixed powers**: Give 5 binomials where both terms contain \\(x\\) (e.g., \\((x^3+2x)^4\\).', 'Check each student’s exponent formula before they solve for \\(r\\).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_08_006', difficulty: 'standard',
          question: 'Properties of binomial coefficients are algebraic identities satisfied by the.',
          hint: 'If stuck, revisit c11_math_cbse_08_001 (binomial theorem statement) and.',
          misconception: 'Students incorrectly apply the symmetry property to weighted sums, e.g., claiming \\( \\sum_{r=0}^{n} r\\binom{n}{r}.',
          parts: [
                { id: 'a', prompt: 'Explain why substituting \\( x=-1 \\) in \\( (1+x)^n = \\sum_{r=0}^{n} \\binom{n}{r}x^r \\) gives \\( \\sum_{r=0}^{n} (-1)^r \\binom{n}{r} = 0 \\) for \\( n \\ge 1 \\), but.', answer: 'Substituting \\( x=-1 \\) gives \\( (1-1)^n = 0^n = 0 \\) for \\( n \\ge 1 \\), so \\(',
                  options: ['Substituting \\( x=-1 \\) gives \\( (1-1)^n = 0^n = 0 \\) for \\( n \\ge 1 \\), so \\(', 'it works for all n'],
                  hint: 'If stuck, revisit c11_math_cbse_08_001 (binomial theorem statement) and c11_math_cbse_08_002.',
                  misconception: 'Students incorrectly apply the symmetry property to weighted sums, e.g., claiming \\( \\sum_{r=0}^{n} r\\binom{n}{r} = \\sum_{r=0}^{n}.' }
          ],
            remediations: { 'students-incorrectly-apply-the-symmetry': { steps: ['If a student makes this error: (1) Ask them to write out the terms for \\( n=4 \\): \\( \\sum r\\binom{4}{r} = 0\\cdot1.', 'Verify both equal 32, so symmetry works for \\( f(r)=r \\) because \\( f(r)+f(n-r)=n \\).', '(2) Then test \\( f(r)=r^2 \\): \\( \\sum r^2\\binom{4}{r} = 0+4+24+36+16=80 \\), \\( \\sum (4-r)^2\\binom{4}{r}.', 'But adding gives \\( 2\\sum r^2\\binom{4}{r} = \\sum [r^2+(4-r)^2]\\binom{4}{r} = \\sum (2r^2 - 8r + 16)\\binom{4}{r} \\).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
