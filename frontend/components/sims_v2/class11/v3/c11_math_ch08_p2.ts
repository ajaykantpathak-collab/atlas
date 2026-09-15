import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch08_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch08_p2: SimDef = {
    id: 'v3_c11_math_ch08_p2',
    title: 'Binomial Theorem · Part 2/2',
    subtitle: 'Read a binomial expansion by its address, not by multiplying it out.',
    classLevel: 11, subject: 'mathematics', topic: 'Binomial Theorem · Part 2/2',
    chapters: ['c11_math_ch08'],
    nodeIds: ['c11_math_cbse_08_007', 'c11_math_cbse_08_008', 'c11_math_cbse_08_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an accountant shortcutting (100 + 2)⁵ for compound interest', intro: '(a + b)¹⁵ has sixteen terms — but the formula hands you the eighth alone, no multiplication marathon required.', goal: 'Use the general term T_{r+1} with correct indexing, signs and exponents.' },
    discovery: {
        question: 'In (x² + 1/x)¹², a student says the x-free term sits at r = 4. Check the exponent.',
        options: ['Wrong — the term\'s power is 24 − 3r, so the constant needs r = 8', 'Right — r = 4 balances the powers', 'Right — 12/3 = 4 always gives the middle', 'Wrong — no constant term exists in this expansion'],
        answer: 'Wrong — the term\'s power is 24 − 3r, so the constant needs r = 8',
        hook: 'And the fifth term uses r = 4, not r = 5 — T_{r+1} is off-by-one by design, and the minus sign in (−2/x) is raised to r too.',
    },
    teaching: [
        { title: 'Greatest Term in Binomial Expansion', text: 'In the binomial expansion of \\((a + b)^n\\) where \\(n \\in \\mathbb{N}\\), the greatest term(s) are the term(s) with the maximum numerical value (magnitude) among all terms \\(T_1, T_2, \\dots, T_{n+1}\\).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_08_007', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Expand (2x − 3y)⁴ coefficient by coefficient, then extract exactly the fifth term of (3x² − 2/x)⁷ without writing the rest.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_08_007', title: 'Greatest Term in Binomial Expansion',
          scaffold: { problem: 'Find the greatest term in the expansion of \\((2 + 3x)^9\\) when \\(x = \\frac{3}{2}\\).',
            steps: [
            { text: 'Identify \\(a = 2\\), \\(b = 3x = 3 \\times \\frac{3}{2} = \\frac{9}{2}\\), \\(n = 9\\).' },
            { text: 'Write general term \\(T_{r+1} = \\binom{9}{r} 2^{9-r} \\left(\\frac{9}{2}\\right)^r\\).' },
            { text: 'Set ratio \\(\\geq 1\\) to find where terms stop increasing: \\(\\frac{10-r}{r} \\cdot \\frac{9}{4} \\geq 1 \\Rightarrow 9(10-r).' },
            { text: 'Largest integer \\(r\\) satisfying is \\(r = 6\\). Check: for \\(r=6\\), ratio = \\(\\frac{4}{6} \\cdot \\frac{9}{4} = 1.5 \\geq.' },
            { text: 'Compute \\(T_7 = \\binom{9}{6} 2^{3} \\left(\\frac{9}{2}\\right)^6 = 84 \\times 8 \\times \\frac{9^6}{2^6} = 84 \\times 8 \\times.', faded: true, blankAnswer: 'The 7th term (\\(T_7\\)) is the greatest term, with value.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_08_008', title: 'Applications of Binomial Theorem',
          scaffold: { problem: 'Using binomial theorem, approximate $(0.99)^5$ correct to 4 decimal places. Show the error bound for your approximation.',
            steps: [
            { text: 'Identify the binomial form. $0.99 = 1 - 0.01$, so $(0.99)^5 = (1 - 0.01)^5$. Here $x = -0.01$, $n = 5$.' },
            { text: 'Write the full binomial expansion. $(1 + x)^5 = \\sum_{k=0}^{5} \\binom{5}{k} x^k = 1 + 5x + 10x^2 + 10x^3 + 5x^4 + x^5$.' },
            { text: 'Substitute $x = -0.01$ and compute terms sequentially.' },
            { text: 'Determine required terms for 4-decimal accuracy. The 4th decimal place is $10^{-4}$.' },
            { text: 'Verify error bound. The next term $T_3 = -0.00001$, and since it\'s an alternating series with decreasing magnitude.', faded: true, blankAnswer: '$(0.99)^5 \\approx 0.9510$ (error $< 0.00001$)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_08_009', title: 'Binomial Theorem for Any Index (Infinite Series)',
          scaffold: { problem: 'Expand \\( (1 - 3x)^{-2} \\) up to the term in \\( x^3 \\) and state the range of values of \\( x \\) for which the expansion is valid.',
            steps: [
            { text: 'Identify the index \\( n = -2 \\) and the variable part \\( x \\) replaced by \\( -3x \\).' },
            { text: 'Write the general binomial expansion for any index: \\( (1+y)^n = 1 + ny + \\frac{n(n-1)}{2!}y^2.' },
            { text: 'Substitute \\( n = -2 \\) and \\( y = -3x \\) into the formula:' },
            { text: 'Combine terms: \\( (1 - 3x)^{-2} = 1 + 6x + 27x^2 + 108x^3 + \\cdots \\)' },
            { text: 'State validity condition: \\( |y| < 1 \\Rightarrow |-3x| < 1 \\Rightarrow |x| < \\frac{1}{3} \\).', faded: true, blankAnswer: '\\( 1 + 6x + 27x^2 + 108x^3 + \\cdots \\), valid for \\( |x| <.' }
            ] } },
        { type: 'drill', nodeId: 'c11_math_cbse_08_009', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Expanding (x² − 2/x)¹⁵ for a term-hunt, a teammate needs the 4th term and substitutes r = 4 into T_{r+1}; he also writes (−2/x)^r = −2^r/x^r and simplifies the x-power to 2n − r.',
            decisions: [{ prompt: 'Which three index slips must he fix?', options: [
                { text: 'Align the index, the sign and the exponent: the 4th term uses r = 3, since T_{r+1} numbers terms from r = 0. The negative sign is inside the power: (−2/x)^r = (−1)^r · 2^r/x^r — alternating signs, not a fixed minus. And (x²)^(n−r)·(1/x)^r = x^{2n−2r}·x^{−r} = x^{2n−3r} — the denominator\'s exponent subtracts.', outcome: 'The term comes out right: r counts from zero, signs alternate, and powers of a and b always sum to n.' },
                { text: 'Keep r = 4 for the 4th term — the subscript matches the term number.', outcome: 'The formula is T_{r+1}: term number is r+1, so the 4th term is r = 3 — off-by-one shifts the whole answer.', reveals: 'r-equals-term-number' },
                { text: 'Keep −2^r/x^r — the minus sign in b just carries down.', outcome: 'The sign is part of b and gets raised to r: even r gives positive, odd r negative — a fixed minus breaks half the terms.', reveals: 'negative-sign-not-powered' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_08_009', title: 'You made it',
          caseStudy: { intro: 'Powers of a fall while powers of b climb, always summing to n — the general term is a slot machine you can read directly.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_08_007', difficulty: 'standard',
          question: 'In the binomial expansion of \\((a + b)^n\\) where \\(n \\in \\mathbb{N}\\), the.',
          hint: 'Revisit c11_math_cbse_08_002 (General Term) to practice writing \\(T_{r+1}\\) and.',
          misconception: 'Students often set the ratio \\(\\frac{T_{r+1}}{T_r} = 1\\) and solve for \\(r\\), then round to the nearest integer.',
          parts: [
                { id: 'a', prompt: 'In the expansion of \\((2 + 3x)^9\\), a student claims the greatest term is the 5th term because \\(\\frac{T_5}{T_4} > 1\\) and \\(\\frac{T_6}{T_5} > 1\\).', answer: 'The student\'s reasoning is flawed',
                  options: ['The student\'s reasoning is flawed', 'ratio > 1 means increasing', 'greatest term occurs when ratio crosses from ≥1 to <1'],
                  hint: 'Revisit c11_math_cbse_08_002 (General Term) to practice writing \\(T_{r+1}\\) and simplifying.',
                  misconception: 'Students often set the ratio \\(\\frac{T_{r+1}}{T_r} = 1\\) and solve for \\(r\\), then round to the nearest integer.' },
                { id: 'b', prompt: 'Compare the greatest term in \\((1+x)^n\\) and \\((1-x)^n\\) for \\(x>0\\). Are they always the same term index? Justify.', answer: 'For \\((1+x)^n\\) with \\(x>0\\), all terms are positive',
                  options: ['For \\((1+x)^n\\) with \\(x>0\\), all terms are positive', 'they are different'],
                  hint: 'Revisit c11_math_cbse_08_002 (General Term) to practice writing \\(T_{r+1}\\) and simplifying.',
                  misconception: 'Students often set the ratio \\(\\frac{T_{r+1}}{T_r} = 1\\) and solve for \\(r\\), then round to the nearest integer.' }
          ],
            remediations: { 'students-often-set-the-ratio': { steps: ['Remediation: Have the student list the first few term ratios numerically for a concrete example like \\((1+0.5)^6\\).', 'Compute \\(T_1, T_2, T_3, T_4\\) and their ratios.', 'Show that \\(T_2/T_1 = 1.5 > 1\\), \\(T_3/T_2 = 1.0 > 1\\), \\(T_4/T_3 = 0.6 < 1\\).', 'The greatest term is \\(T_3\\) (ratio crosses 1 between \\(r=2\\) and \\(r=3\\)).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_08_008', difficulty: 'standard',
          question: 'Applications of the Binomial Theorem refer to the practical use of the.',
          hint: 'Revisit c11_math_cbse_08_002 (General Term) and c11_math_cbse_08_006 (Properties.',
          misconception: 'Students incorrectly apply binomial approximation by truncating after a fixed number of terms (e.g., "always use 3.',
          parts: [
                { id: 'a', prompt: 'A student claims: "To find the remainder when $5^{103}$ is divided by 13, I can write $5^{103} = (13-8)^{103}$ and expand using binomial theorem.', answer: 'The flaw: $(13-8)^{103}$ expands to $\\sum \\binom{103}{k} 13^{103-k}(-8)^k$',
                  options: ['The flaw: $(13-8)^{103}$ expands to $\\sum \\binom{103}{k} 13^{103-k}(-8)^k$', 'terms divisible by divisor', 'final remainder computation'],
                  hint: 'Revisit c11_math_cbse_08_002 (General Term) and c11_math_cbse_08_006 (Properties of Binomial.',
                  misconception: 'Students incorrectly apply binomial approximation by truncating after a fixed number of terms (e.g., "always use 3 terms") without.' }
          ],
            remediations: { 'students-incorrectly-apply-binomial-approximatio': { steps: ['Have the student compute the ratio of consecutive terms $T_{k+1}/T_k = \\frac{n-k}{k+1} \\cdot x$ for their specific.', 'For approximation, require them to write the general term $T_k = \\binom{n}{k}x^k$ and find the smallest $k$ where.', 'For divisibility, make them explicitly factor out the divisor from each term: e.g., $8^k = 64 \\cdot 8^{k-2}$ for $k.', 'Practice 3 problems where the "obvious" number of terms is wrong (e.g., $(1.001)^{1000}$ needs many terms, $(0.9)^{10}$.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_08_009', difficulty: 'standard',
          question: 'The Binomial Theorem for Any Index states that for any real number \\( n \\).',
          hint: 'If stuck, review the general term formula from node c11_math_cbse_08_002 and the.',
          misconception: 'Students often treat the binomial coefficient \\( \\binom{n}{r} \\) for non-integer \\( n \\) as \\( \\frac{n!}{r!(n-r)!} \\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Binomial Theorem for Any Index states that for any real number \\( n \\) (positive,',
                  options: ['The Binomial Theorem for Any Index states that for any real number \\( n \\) (positive,', 'The Binomial Theorem for a positive integer index n states that for any real numbers a', 'The general term (denoted as \\(T_{r+1}\\)) in the binomial expansion of \\((a+b)^n\\) for', 'In the binomial expansion of (a + b)^n, the middle term(s) refer to the term(s) at the'],
                  hint: 'If stuck, review the general term formula from node c11_math_cbse_08_002 and the condition for.',
                  misconception: 'Students often treat the binomial coefficient \\( \\binom{n}{r} \\) for non-integer \\( n \\) as \\( \\frac{n!}{r!(n-r)!} \\) using factorial.' }
          ],
            remediations: { 'students-often-treat-the-binomial': { steps: ['Remind the student that factorial is defined only for non-negative integers.', 'Show the correct product form: \\( \\binom{n}{r} = \\frac{n(n-1)\\cdots(n-r+1)}{r!} \\) for any real \\( n \\).', 'Practice computing \\( \\binom{-3}{2} \\), \\( \\binom{1/2}{3} \\), \\( \\binom{-1/2}{4} \\) step by step.', 'Emphasize that the number of factors in the numerator equals \\( r \\), and the denominator is \\( r!'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
