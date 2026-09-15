import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch04_p1: SimDef = {
    id: 'v3_c9_math_ch04_p1',
    title: 'Algebraic Identities and Factorisation · Part 1/2',
    subtitle: 'The middle term everyone forgets',
    classLevel: 9, subject: 'mathematics', topic: 'Algebraic Identities and Factorisation · Part 1/2',
    chapters: ['c9_math_ch04'],
    nodeIds: ['c9_math_ch4_1', 'c9_math_ch4_10', 'c9_math_ch4_2', 'c9_math_ch4_3', 'c9_math_ch4_4', 'c9_math_ch4_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an algebra pattern-hunter', intro: 'Two identities unlock mental squaring and factorisation — but only if you never drop the sneaky middle term. Draw it, prove it, then use it to crush 102² without a calculator.', goal: 'Apply the identities (a+b)² = a² + 2ab + b² and (a−b)² = a² − 2ab + b² — expanding, factorising perfect squares, and computing numeric squares mentally.' },
    discovery: {
        question: 'Compute 103 × 97 in your head — instantly. Which identity does it?',
        options: ['(a+b)(a−b) = a² − b² → 100² − 9 = 9991', '(a+b)² → 10000 + 291', '103² − 97²', 'No shortcut exists'],
        answer: '(a+b)(a−b) = a² − b² → 100² − 9 = 9991',
        hook: 'Identities are not formulas to memorise — they are shortcuts disguised as algebra. 103×97 just took you 3 seconds.',
    },
    teaching: [
        { title: 'Algebraic Identities: (a+b)^2 and (a-b)^2', text: 'The identities \\((a+b)^2 = a^2 + 2ab + b^2\\) and \\((a-b)^2 = a^2 - 2ab + b^2\\) are algebraic statements that hold true for all real values of \\(a\\) and \\(b\\).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch4_1', title: 'Your mission',
          mission: { widget: 'fraction', validate: 'fraction:parts=4',
            instruction: 'On the lab: split into 4 parts — what fraction is each part?.',
        context: 'Draw the (a+b) square, label its four regions, and watch a² + 2ab + b² assemble itself — then use the identity to square 98 mentally and to spot why x² + 10x + 24 is NOT a perfect square while +25 is.',
            observePrompt: 'What did the fraction interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_math_ch4_1', title: 'Algebraic Identities: (a+b)^2 and (a-b)^2',
          scaffold: { problem: 'A square plot of land has side length \\((3x - 4)\\) metres. Find the area of the plot in terms of \\(x\\).',
            steps: [
            { text: 'Recognise that area of a square = side × side. Here side = \\((3x - 4)\\) m, so Area = \\((3x - 4)^2\\).' },
            { text: 'Identify the identity for square of a difference: \\((a-b)^2 = a^2 - 2ab + b^2\\). Here \\(a = 3x\\), \\(b = 4\\).' },
            { text: 'Substitute into the identity: \\((3x)^2 - 2(3x)(4) + (4)^2\\).' },
            { text: 'Compute each term: \\((3x)^2 = 9x^2\\), \\(-2(3x)(4) = -24x\\), \\((4)^2 = 16\\). So Area = \\(9x^2 - 24x + 16\\) sq. m.' },
            { text: 'Substitute \\(x = 5\\): \\(9(5)^2 - 24(5) + 16 = 9(25) - 120 + 16 = 225 - 120 + 16 = 121\\) sq. m.', faded: true, blankAnswer: 'Area = \\(9x^2 - 24x + 16\\) sq. m; for \\(x=5\\), Area = 121.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch4_10', title: 'Rational Expressions: Simplification',
          scaffold: { problem: 'Simplify (x² + 7x + 12)/(x + 3). State the restriction.',
            steps: [
            { text: 'Factorise the numerator. x² + 7x + 12 = (x+3)(x+4) (find two numbers that multiply to 12 and add to 7: 3 and 4).' },
            { text: 'Write the factored form. (x+3)(x+4)/(x+3).' },
            { text: 'Cancel the common factor (x+3). Result: x + 4.' },
            { text: 'State the restriction. x ≠ -3 (denominator of original expression is zero at x = -3).', faded: true, blankAnswer: '(x² + 7x + 12)/(x + 3) = (x+3)(x+4)/(x+3) = x + 4, for x ≠.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch4_2', title: 'Algebraic Identity: a^2 - b^2 = (a+b)(a-b)',
          scaffold: { problem: 'Compute 95² - 5² using the identity. Show the steps and verify by direct calculation.',
            steps: [
            { text: 'Identify a and b. a = 95, b = 5.' },
            { text: 'Apply identity. 95² - 5² = (95+5)(95-5) = (100)(90) = 9000.' },
            { text: 'Verify by direct calculation. 95² = 9025, 5² = 25, difference = 9025 - 25 = 9000. Confirmed.', faded: true, blankAnswer: '95² - 5² = (95+5)(95-5) = (100)(90) = 9000. Verified: 9025.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch4_3', title: 'Algebraic Identities: (a+b+c)^2 Expansion',
          scaffold: { problem: 'A square plot of land has side length \\((2x + 3y + 4)\\) metres. Find the area of the plot in expanded form.',
            steps: [
            { text: 'Identify that area of a square = (side)^2. Here side = \\(2x + 3y + 4\\). So we need to expand \\((2x + 3y + 4)^2\\).' },
            { text: 'Apply the identity \\((a+b+c)^2 = a^2 + b^2 + c^2 + 2ab + 2bc + 2ca\\) with \\(a = 2x\\), \\(b = 3y\\), \\(c = 4\\).' },
            { text: 'Compute each of the six terms: \\(a^2 = (2x)^2 = 4x^2\\); \\(b^2 = (3y)^2 = 9y^2\\); \\(c^2 = 4^2 = 16\\); \\(2ab = 2(2x)(3y).' },
            { text: 'Write the expanded algebraic expression: Area = \\(4x^2 + 9y^2 + 16 + 12xy + 24y + 16x\\) (arranged in descending powers.' },
            { text: 'Substitute \\(x = 10\\), \\(y = 5\\): \\(4(100) + 9(25) + 16 + 12(10)(5) + 24(5) + 16(10) = 400 + 225 + 16 + 600 + 120 + 160.', faded: true, blankAnswer: 'Algebraic area = \\(4x^2 + 9y^2 + 12xy + 16x + 24y + 16\\).' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch4_4', title: 'Geometrical Visualisation of Algebraic Identities',
          scaffold: { problem: 'A square park has side length (2x + 5) metres. It is divided into four rectangular zones by two straight paths of width 1 metre running.',
            steps: [
            { text: 'Identify the total side length of the square park as (2x + 5) m. Recognise that (2x+5) can be written as (x + (x+5)).' },
            { text: 'Draw a square of side (a+b). Partition it by drawing a vertical line at distance a = x from the left edge, and.' },
            { text: 'Label the areas of the four sub-regions using the geometric model of (a+b)² = a² + 2ab + b²: bottom-left square: a².' },
            { text: 'Compute each area algebraically: x², x(x+5) = x²+5x, (x+5)x = x²+5x, (x+5)² = x²+10x+25.' },
            { text: 'Verify by directly expanding the total area: (2x+5)² = (2x)² + 2(2x)(5) + 5² = 4x² + 20x + 25.', faded: true, blankAnswer: 'The four zones have areas: x² m², (x²+5x) m², (x²+5x) m².' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch4_5', title: 'Factorisation: Common Factor Method',
          scaffold: { problem: 'A school library has \\(18x^2y\\) Hindi books, \\(27xy^2\\) English books, and \\(9xy\\) Sanskrit books.',
            steps: [
            { text: 'Identify the algebraic expressions for each type: \\(18x^2y\\), \\(27xy^2\\), \\(9xy\\).' },
            { text: 'Find the GCF of the numerical coefficients: 18, 27, 9. Prime factorisation: \\(18=2\\times3^2\\), \\(27=3^3\\), \\(9=3^2\\).' },
            { text: 'Find the GCF of the variable parts: For \\(x\\): powers are \\(x^2, x^1, x^1\\) → lowest power is \\(x^1\\).' },
            { text: 'Combine: GCF = \\(9xy\\). This is the maximum number of shelves.' },
            { text: 'Divide each term by \\(9xy\\) to get books per shelf: \\(18x^2y ÷ 9xy = 2x\\); \\(27xy^2 ÷ 9xy = 3y\\); \\(9xy ÷ 9xy = 1\\).' },
            { text: 'Verify: \\(9xy(2x + 3y + 1) = 18x^2y + 27xy^2 + 9xy\\). Correct.', faded: true, blankAnswer: 'Maximum shelves = \\(9xy\\). Books per shelf: \\(2x\\) Hindi.' }
            ] } },
        { type: 'drill', nodeId: 'c9_math_ch4_5', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch4_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Computing (103)² mentally for a puzzle, Kavya writes \'square each part: 100² + 3² = 10,009.\' Her friend recomputes on paper and gets a different answer.',
            decisions: [{ prompt: 'Where did Kavya\'s shortcut slip?', options: [
                { text: 'Squaring a sum does not split: (a+b)² = a² + 2ab + b², so 103² = 10,000 + 600 + 9 = 10,609 — she dropped the middle term 2ab = 600, the piece the distributive expansion always produces.', outcome: 'This restores the missing cross-term that separates (a+b)² from a² + b² — checkable instantly: 5² = 25 but 2² + 3² = 13.' },
                { text: 'Kavya is right — the square of a sum is the sum of the squares; exponents distribute like multiplication.', outcome: 'Exponents do not distribute over addition: (2+3)² = 25 while 2² + 3² = 13; the cross-term 2ab is where the extra 12 went.', reveals: 'square-splits-sum' },
                { text: 'Both are wrong — (a+b)² equals a² − 2ab + b², so the answer should be 9,409.', outcome: 'That is the difference identity; for a sum the middle term is positive, giving 10,609.', reveals: 'wrong-sign-identity' }
            ] }] } },
        { type: 'case', nodeId: 'c9_math_ch4_5', title: 'The bigger picture',
          caseStudy: { intro: 'a²−b², (a±b)², (a±b)³ — patterns that make arithmetic collapse into instant answers.',
            decisions: [{ prompt: 'What comes next? Algebraic Identities and Factorisation · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Algebraic Identities and Factorisation · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'fraction', prompt: 'Explore the fraction interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'fraction', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch4_1', difficulty: 'standard',
          question: 'The identities \\((a+b)^2 = a^2 + 2ab + b^2\\) and \\((a-b)^2 = a^2 - 2ab + b^2\\).',
          hint: 'Revisit the distributive property with algebraic terms (c8_math_ch6_1) and practice.',
          misconception: 'Students often write \\((a+b)^2 = a^2 + b^2\\) (missing the middle term \\(2ab\\)) or \\((a-b)^2 = a^2 - b^2\\) (missing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The identities \\((a+b)^2 = a^2 + 2ab + b^2\\) and \\((a-b)^2 = a^2 - 2ab + b^2\\) are',
                  options: ['The identities \\((a+b)^2 = a^2 + 2ab + b^2\\) and \\((a-b)^2 = a^2 - 2ab + b^2\\) are', 'Rational expressions are fractions where both the numerator and denominator are', 'The algebraic identity a² - b² = (a+b)(a-b) states that the difference of two squares', 'The algebraic identity \\((a + b + c)^2\\) expands to the sum of squares of each term plus'],
                  hint: 'Revisit the distributive property with algebraic terms (c8_math_ch6_1) and practice multiplying.',
                  misconception: 'Students often write \\((a+b)^2 = a^2 + b^2\\) (missing the middle term \\(2ab\\)) or \\((a-b)^2 = a^2 - b^2\\) (missing \\(-2ab\\)).' }
          ],
            remediations: { 'students-often-write-a-b': { steps: ['Ask the student to compute \\((2+3)^2\\) and \\(2^2+3^2\\) numerically to see they are not equal.', 'Use the area model: draw a square of side \\((a+b)\\), divide into two rectangles and two smaller squares.', 'For \\((a-b)^2\\), draw a square of side \\(a\\), remove a strip of width \\(b\\) from two sides, and add back the.', 'Practice 5 expansions with simple numbers first, then algebraic terms, insisting on writing the middle term explicitly.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch4_10', difficulty: 'standard',
          question: 'Rational expressions are fractions where both the numerator and denominator are.',
          hint: 'Revisit c9_math_ch4_5 (Factorisation by Common Factor) and c9_math_ch4_2 (Difference.',
          misconception: 'Students cancel terms instead of factors. The exact error: they see (x² + 3x)/(x + 3) and cancel the x\'s, writing x²/x.',
          parts: [
                { id: 'a', prompt: 'Simplify: (x² - 16)/(x - 4). State any restriction on x.', answer: 'Factorise numerator: x² - 16 = (x+4)(x-4)',
                  options: ['Factorise numerator: x² - 16 = (x+4)(x-4)', 'omits the restriction misses a critical part of the simplification'],
                  hint: 'Revisit c9_math_ch4_5 (Factorisation by Common Factor) and c9_math_ch4_2 (Difference of Squares.',
                  misconception: 'Students cancel terms instead of factors. The exact error: they see (x² + 3x)/(x + 3) and cancel the x\'s, writing x²/x = x and 3x/3 =.' },
                { id: 'b', prompt: 'Simplify: (2x² + 4x)/(2x). State the restriction.', answer: 'Factorise numerator: 2x² + 4x = 2x(x + 2)',
                  options: ['Factorise numerator: 2x² + 4x = 2x(x + 2)', 'x + 2, no restriction'],
                  hint: 'Revisit c9_math_ch4_5 (Factorisation by Common Factor) and c9_math_ch4_2 (Difference of Squares.',
                  misconception: 'Students cancel terms instead of factors. The exact error: they see (x² + 3x)/(x + 3) and cancel the x\'s, writing x²/x = x and 3x/3 =.' },
                { id: 'c', prompt: 'Simplify: (x² + 5x + 6)/(x + 2). State the restriction.', answer: 'Factorise numerator: x² + 5x + 6 = (x+2)(x+3)',
                  options: ['Factorise numerator: x² + 5x + 6 = (x+2)(x+3)', 'cannot be simplified', 'fails to factorise the numerator (e'],
                  hint: 'Revisit c9_math_ch4_5 (Factorisation by Common Factor) and c9_math_ch4_2 (Difference of Squares.',
                  misconception: 'Students cancel terms instead of factors. The exact error: they see (x² + 3x)/(x + 3) and cancel the x\'s, writing x²/x = x and 3x/3 =.' }
          ],
            remediations: { 'students-cancel-terms-instead-of': { steps: ['Show the student a numerical analogy: 15/25.', 'Ask: "Can you cancel the 5\'s directly?" (No — you must factorise: 15 = 3×5, 25 = 5×5, then cancel the common factor 5.).', 'Apply the same to algebra: (x² + 3x)/(x + 3) = x(x+3)/(x+3) = x.', 'Emphasize: factorise first, then cancel common factors.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch4_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students cancel terms instead of factors. The exact error: they see (x² + 3x)/(x + 3) and cancel the x\'s, writing x²/x.',
          parts: [
                { id: 'a', prompt: 'Why must we state restrictions when simplifying rational expressions? Explain with an example.', answer: 'Restrictions must be stated',
                  options: ['Restrictions must be stated', 'restrictions are optional'],
                  hint: 'Revisit c9_math_ch4_5 (Factorisation by Common Factor) and c9_math_ch4_2 (Difference of Squares.',
                  misconception: 'Students cancel terms instead of factors. The exact error: they see (x² + 3x)/(x + 3) and cancel the x\'s, writing x²/x = x and 3x/3 =.' }
          ],
            remediations: { 'students-cancel-terms-instead-of': { steps: ['Show the student a numerical analogy: 15/25.', 'Ask: "Can you cancel the 5\'s directly?" (No — you must factorise: 15 = 3×5, 25 = 5×5, then cancel the common factor 5.).', 'Apply the same to algebra: (x² + 3x)/(x + 3) = x(x+3)/(x+3) = x.', 'Emphasize: factorise first, then cancel common factors.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch4_2', difficulty: 'standard',
          question: 'The algebraic identity a² - b² = (a+b)(a-b) states that the difference of two.',
          hint: 'Revisit c9_math_ch4_1 ((a+b)² and (a-b)² identities) to distinguish a² - b² from (a-b)².',
          misconception: 'Students confuse a² - b² (difference of squares) with (a-b)² (square of difference).',
          parts: [
                { id: 'a', prompt: 'State the identity a² - b² = (a+b)(a-b) and prove it by expanding the right side.', answer: 'Identity: a² - b² = (a+b)(a-b)',
                  options: ['Identity: a² - b² = (a+b)(a-b)', 'a² - b² = a² - b², so it\'s true'],
                  hint: 'Revisit c9_math_ch4_1 ((a+b)² and (a-b)² identities) to distinguish a² - b² from (a-b)².',
                  misconception: 'Students confuse a² - b² (difference of squares) with (a-b)² (square of difference).' }
          ],
            remediations: { 'students-confuse-a-b-difference': { steps: ['Write a² - b² and (a-b)² side by side.', 'Expand both: a² - b² = a² - b² (already simplified).', 'Point out the difference: (a-b)² has a -2ab term that a² - b² does not.', 'Give numerical examples: 5² - 3² = 16, (5-3)² = 4.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch4_3', difficulty: 'standard',
          question: 'The algebraic identity \\((a + b + c)^2\\) expands to the sum of squares of each.',
          hint: 'If stuck, revisit the expansion of \\((a+b)^2\\) using the area model (c8_math_ch6_10) and.',
          misconception: 'Students often write the cross terms as \\(ab + bc + ca\\) (missing the factor of 2) because they think "each pair.',
          parts: [
                { id: 'a', prompt: 'Write the expansion of \\((x + 2y + 3z)^2\\) using the identity. Do not multiply term-by-term; state the six terms directly from the formula.', answer: '\\(x^2 + 4y^2 + 9z^2 + 4xy + 12yz + 6zx\\)',
                  options: ['\\(x^2 + 4y^2 + 9z^2 + 4xy + 12yz + 6zx\\)', 'twice the product'],
                  hint: 'If stuck, revisit the expansion of \\((a+b)^2\\) using the area model (c8_math_ch6_10) and practice.',
                  misconception: 'Students often write the cross terms as \\(ab + bc + ca\\) (missing the factor of 2) because they think "each pair multiplies once" and.' }
          ],
            remediations: { 'students-often-write-the-cross': { steps: ['If a student misses the factor of 2 in cross terms, have them write \\((a+b+c)(a+b+c)\\) and multiply systematically.', 'They will see \\(ab\\) and \\(ba\\) as two separate boxes that sum to \\(2ab\\).', 'For coefficient errors, isolate the term: "What is \\((2x)^2\\)?', 'Write it as \\((2x)(2x)\\) and compute." For sign errors on squares, remind them: "What is \\((-3)^2\\)?'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch4_4', difficulty: 'standard',
          question: 'Geometrical visualisation of algebraic identities represents algebraic.',
          hint: 'If stuck, revisit the distributive property using area models from c8_math_ch6_10 and.',
          misconception: 'Students often draw the partition lines for (a+b)² at arbitrary positions instead of exactly at distance a from one.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Geometrical visualisation of algebraic identities represents algebraic expressions as',
                  options: ['Geometrical visualisation of algebraic identities represents algebraic expressions as', 'The identities \\((a+b)^2 = a^2 + 2ab + b^2\\) and \\((a-b)^2 = a^2 - 2ab + b^2\\) are', 'Rational expressions are fractions where both the numerator and denominator are', 'The algebraic identity a² - b² = (a+b)(a-b) states that the difference of two squares'],
                  hint: 'If stuck, revisit the distributive property using area models from c8_math_ch6_10 and practice.',
                  misconception: 'Students often draw the partition lines for (a+b)² at arbitrary positions instead of exactly at distance a from one side, leading.' }
          ],
            remediations: { 'students-often-draw-the-partition': { steps: ['If a student draws incorrect partitions: 1) Have them physically cut out a square of side (a+b) from graph paper (e.g.', '2) Ask them to cut along lines at distance a=4cm from left and bottom.', '3) Let them measure the four pieces: a 4×4 square, a 3×3 square, and two 4×3 rectangles.', '4) Have them compute areas and sum to verify (4+3)² = 49.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch4_5', difficulty: 'standard',
          question: 'Factorisation by the common factor method is the process of writing.',
          hint: 'If stuck, revisit c8_math_ch6_1 (distributive property) and c6_math_ch01_015 (prime.',
          misconception: 'Students often take the common factor as the product of common variables with the HIGHEST power (e.g., for \\(x^3.',
          parts: [
                { id: 'a', prompt: 'What is the greatest common factor (GCF) of the terms \\(12x^3y^2\\) and \\(18x^2y^4\\)?', answer: 'The GCF is \\(6x^2y^2\\)',
                  options: ['The GCF is \\(6x^2y^2\\)', 'greatest common factor', 'largest term'],
                  hint: 'If stuck, revisit c8_math_ch6_1 (distributive property) and c6_math_ch01_015 (prime factorisation.',
                  misconception: 'Students often take the common factor as the product of common variables with the HIGHEST power (e.g., for \\(x^3 + x^2\\), they write.' },
                { id: 'b', prompt: 'Explain why \\(3x(x+2)\\) is the fully factorised form of \\(3x^2 + 6x\\), but \\(x(3x+6)\\) is not considered fully factorised.', answer: '\\(3x(x+2)\\) is fully factorised',
                  options: ['\\(3x(x+2)\\) is fully factorised', 'both are correct', 'factorise completely', 'greatest common factor'],
                  hint: 'If stuck, revisit c8_math_ch6_1 (distributive property) and c6_math_ch01_015 (prime factorisation.',
                  misconception: 'Students often take the common factor as the product of common variables with the HIGHEST power (e.g., for \\(x^3 + x^2\\), they write.' },
                { id: 'c', prompt: 'Factorise completely: \\(14a^2b - 21ab^2 + 7ab\\).', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'greatest common factor', 'largest term'],
                  hint: 'If stuck, revisit c8_math_ch6_1 (distributive property) and c6_math_ch01_015 (prime factorisation.',
                  misconception: 'Students often take the common factor as the product of common variables with the HIGHEST power (e.g., for \\(x^3 + x^2\\), they write.' },
                { id: 'd', prompt: 'Compare the factorisation of \\(x^2 + 5x\\) and \\(x^2 + 5x + 6\\). Why does the common factor method work for the first but not the second?', answer: '\\(x^2 + 5x = x(x+5)\\)',
                  options: ['\\(x^2 + 5x = x(x+5)\\)', 'we can factorise both by taking \\(x\\) common', 'greatest common factor', 'largest term'],
                  hint: 'If stuck, revisit c8_math_ch6_1 (distributive property) and c6_math_ch01_015 (prime factorisation.',
                  misconception: 'Students often take the common factor as the product of common variables with the HIGHEST power (e.g., for \\(x^3 + x^2\\), they write.' }
          ],
            remediations: { 'students-often-take-the-common': { steps: ['Go back to numbers: Find HCF of 12, 18, 24 by prime factorisation (c6_math_ch01_015).', 'Show that HCF uses the LOWEST power of each prime.', 'Use algebra tiles or area model: Draw a rectangle of area \\(x^2 + x\\).', 'Show that the side length common to both \\(x^2\\) and \\(x\\) is \\(x\\) (not \\(x^2\\)).'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
