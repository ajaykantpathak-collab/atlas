import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch04_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch04_p2: SimDef = {
    id: 'v3_c9_math_ch04_p2',
    title: 'Algebraic Identities and Factorisation · Part 2/2',
    subtitle: 'The middle term everyone forgets',
    classLevel: 9, subject: 'mathematics', topic: 'Algebraic Identities and Factorisation · Part 2/2',
    chapters: ['c9_math_ch04'],
    nodeIds: ['c9_math_ch4_6', 'c9_math_ch4_7', 'c9_math_ch4_8', 'c9_math_ch4_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an algebra pattern-hunter', intro: 'Two identities unlock mental squaring and factorisation — but only if you never drop the sneaky middle term. Draw it, prove it, then use it to crush 102² without a calculator.', goal: 'Apply the identities (a+b)² = a² + 2ab + b² and (a−b)² = a² − 2ab + b² — expanding, factorising perfect squares, and computing numeric squares mentally.' },
    discovery: {
        question: 'Compute 103 × 97 in your head — instantly. Which identity does it?',
        options: ['(a+b)(a−b) = a² − b² → 100² − 9 = 9991', '(a+b)² → 10000 + 291', '103² − 97²', 'No shortcut exists'],
        answer: '(a+b)(a−b) = a² − b² → 100² − 9 = 9991',
        hook: 'Identities are not formulas to memorise — they are shortcuts disguised as algebra. 103×97 just took you 3 seconds.',
    },
    teaching: [
        { title: 'Factorisation by Grouping Terms', text: 'Factorisation by grouping terms is a method used to factorise algebraic expressions with four or more terms by arranging them into groups such that each group has a common factor, then factoring out.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch4_6', title: 'Your mission',
          mission: { widget: 'fraction', validate: 'fraction:parts=4',
            instruction: 'On the lab: split into 4 parts — what fraction is each part?.',
        context: 'Draw the (a+b) square, label its four regions, and watch a² + 2ab + b² assemble itself — then use the identity to square 98 mentally and to spot why x² + 10x + 24 is NOT a perfect square while +25 is.',
            observePrompt: 'What did the fraction interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_math_ch4_6', title: 'Factorisation by Grouping Terms',
          scaffold: { problem: 'The area of a rectangular plot is given by the expression `12x² + 16x + 9x + 12` square metres.',
            steps: [
            { text: 'Identify that the expression has 4 terms with no single common factor across all terms.' },
            { text: 'Factor out the greatest common factor from the first group: `4x(3x + 4)`.' },
            { text: 'Rewrite the expression using these factorised groups: `4x(3x + 4) + 3(3x + 4)`.' },
            { text: 'Observe that both terms now have a common binomial factor `(3x + 4)`. Factor this out: `(3x + 4)(4x + 3)`.' },
            { text: 'Verify by expanding: `(3x + 4)(4x + 3) = 12x² + 9x + 16x + 12 = 12x² + 25x + 12`.', faded: true, blankAnswer: 'Length = `(3x + 4)` metres, Breadth = `(4x + 3)` metres (or.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch4_7', title: 'Factorisation Using Algebraic Identities',
          scaffold: { problem: 'The area of a square garden plot is given by the expression 9x² + 30x + 25 square metres, where x is a positive number.',
            steps: [
            { text: 'Identify that the area of a square is (side)², so we need to factorise 9x² + 30x + 25 as a perfect square.' },
            { text: 'Check if first and last terms are perfect squares: 9x² = (3x)² and 25 = 5². So a = 3x, b = 5.' },
            { text: 'Verify the middle term: 2ab = 2 × (3x) × 5 = 30x. This matches the given middle term exactly.' },
            { text: 'Apply the identity a² + 2ab + b² = (a + b)²: (3x)² + 2(3x)(5) + 5² = (3x + 5)².' },
            { text: 'Since area = (side)² = (3x + 5)², the side length = 3x + 5 metres. Verify: (3x + 5)² = 9x² + 30x + 25 ✓.', faded: true, blankAnswer: 'Side length = (3x + 5) metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch4_8', title: 'Factorisation of Quadratic Expressions: Splitting the Middle Term',
          scaffold: { problem: 'The area of a rectangular plot is given by \\(12x^2 - 7x - 12\\) square metres.',
            steps: [
            { text: 'Identify \\(a = 12\\), \\(b = -7\\), \\(c = -12\\). Check for common factor: none.' },
            { text: 'Compute product \\(ac = 12 \\times (-12) = -144\\). Since \\(ac < 0\\), the two numbers have opposite signs.' },
            { text: 'List factor pairs of 144 with opposite signs, looking for sum -7: (1, -144) sum -143; (2, -72) sum -70; (3, -48) sum.' },
            { text: 'Split the middle term: \\(12x^2 + 9x - 16x - 12\\).' },
            { text: 'Group terms: \\((12x^2 + 9x) + (-16x - 12)\\). Factor each group: \\(3x(4x + 3) - 4(4x + 3)\\).' },
            { text: 'Factor out common binomial \\((4x + 3)\\): \\((3x - 4)(4x + 3)\\).' },
            { text: 'Verify by expanding: \\((3x-4)(4x+3) = 12x^2 + 9x - 16x - 12 = 12x^2 - 7x - 12\\). Correct.' },
            { text: 'Interpret: Length = \\((4x + 3)\\) m, Breadth = \\((3x - 4)\\) m (or vice versa), with the condition \\(x > 4/3\\) for.', faded: true, blankAnswer: 'Length = \\((4x + 3)\\) metres, Breadth = \\((3x - 4)\\) metres.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch4_9', title: 'Algebra Tiles for Visualising Identities and Factorisation',
          scaffold: { problem: 'Factorise \\(x^2+7x+12\\) using algebra tiles. List the tiles, describe the arrangement steps, and write the factors.',
            steps: [
            { text: 'Identify the tiles needed for \\(x^2+7x+12\\): one \\(x^2\\) tile (large blue square), seven \\(x\\) tiles (blue rectangles).' },
            { text: 'Place the \\(x^2\\) tile in the top-left corner. This anchors the rectangle.' },
            { text: 'Arrange the seven \\(x\\) tiles along the right and bottom edges of the \\(x^2\\) tile.' },
            { text: 'Fill the bottom-right corner gap with the twelve unit tiles. They must form a rectangle of dimensions 3 (width from.' },
            { text: 'Read the side lengths of the complete rectangle. The top side is \\(x+3\\) (from \\(x^2\\) width \\(x\\) plus three \\(x\\).', faded: true, blankAnswer: '\\((x+3)(x+4)\\)' }
            ] } },
        { type: 'drill', nodeId: 'c9_math_ch4_9', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch4_6', title: 'Use it in the wild',
          caseStudy: { intro: 'Computing (103)² mentally for a puzzle, Kavya writes \'square each part: 100² + 3² = 10,009.\' Her friend recomputes on paper and gets a different answer.',
            decisions: [{ prompt: 'Where did Kavya\'s shortcut slip?', options: [
                { text: 'Squaring a sum does not split: (a+b)² = a² + 2ab + b², so 103² = 10,000 + 600 + 9 = 10,609 — she dropped the middle term 2ab = 600, the piece the distributive expansion always produces.', outcome: 'This restores the missing cross-term that separates (a+b)² from a² + b² — checkable instantly: 5² = 25 but 2² + 3² = 13.' },
                { text: 'Kavya is right — the square of a sum is the sum of the squares; exponents distribute like multiplication.', outcome: 'Exponents do not distribute over addition: (2+3)² = 25 while 2² + 3² = 13; the cross-term 2ab is where the extra 12 went.', reveals: 'square-splits-sum' },
                { text: 'Both are wrong — (a+b)² equals a² − 2ab + b², so the answer should be 9,409.', outcome: 'That is the difference identity; for a sum the middle term is positive, giving 10,609.', reveals: 'wrong-sign-identity' }
            ] }] } },
        { type: 'case', nodeId: 'c9_math_ch4_9', title: 'You made it',
          caseStudy: { intro: 'a²−b², (a±b)², (a±b)³ — patterns that make arithmetic collapse into instant answers.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'fraction', prompt: 'Explore the fraction interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'fraction', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch4_6', difficulty: 'standard',
          question: 'Factorisation by grouping terms is a method used to factorise algebraic.',
          hint: 'Review c9_math_ch4_5 (Common Factor Method) and c8_math_ch6_1 (Distributive Property).',
          misconception: 'Students often incorrectly factor out a negative sign from the second group.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Factorisation by grouping terms is a method used to factorise algebraic expressions with',
                  options: ['Factorisation by grouping terms is a method used to factorise algebraic expressions with', 'The identities \\((a+b)^2 = a^2 + 2ab + b^2\\) and \\((a-b)^2 = a^2 - 2ab + b^2\\) are', 'Rational expressions are fractions where both the numerator and denominator are', 'The algebraic identity a² - b² = (a+b)(a-b) states that the difference of two squares'],
                  hint: 'Review c9_math_ch4_5 (Common Factor Method) and c8_math_ch6_1 (Distributive Property) with focus.',
                  misconception: 'Students often incorrectly factor out a negative sign from the second group.' }
          ],
            remediations: { 'students-often-incorrectly-factor-out': { steps: ['If a student makes this sign error, have them rewrite the expression with explicit plus signs: `6x² + (-9x) + (-4x).', 'Then group as `[6x² + (-9x)] + [(-4x) + 6]`.', 'Factor each bracket: `3x(2x - 3) + (-2)(2x - 3)`.', 'Emphasise that the second group\'s common factor is `-2`, not `2`, and the binomial inside must match the first group.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch4_7', difficulty: 'standard',
          question: 'Factorisation using algebraic identities is the process of expressing a given.',
          hint: 'If stuck, revisit c9_math_ch4_1 and c9_math_ch4_2 to practice expanding identities.',
          misconception: 'Students incorrectly factorise expressions like 4x² + 9y² as (2x + 3y)² because they see the first and last terms.',
          parts: [
                { id: 'a', prompt: 'A student factorises 4x² - 12x + 9 as (2x - 3)(2x - 3). Another student says it should be (2x - 3)². Are both answers correct?', answer: 'Yes, both answers are correct',
                  options: ['Yes, both answers are correct', 'multiply by itself'],
                  hint: 'If stuck, revisit c9_math_ch4_1 and c9_math_ch4_2 to practice expanding identities forward, then.',
                  misconception: 'Students incorrectly factorise expressions like 4x² + 9y² as (2x + 3y)² because they see the first and last terms as perfect squares and.' }
          ],
            remediations: { 'students-incorrectly-factorise-expressions-like': { steps: ['When a student makes this error, do NOT just say "check the middle term".', 'Instead, make them expand their proposed answer: "Expand (2x + 3y)² step by step using the distributive property: (2x.', 'Now compare term-by-term with 4x² + 9y².', 'Since the original has no xy term, (2x + 3y)² cannot be correct.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch4_8', difficulty: 'standard',
          question: 'Splitting the middle term is a factorisation method for quadratic expressions.',
          hint: 'Review c6_math_ch01_013 (Factors and Multiples) and c7_math_ch11_004 (Prime Factorisation.',
          misconception: 'Students often incorrectly choose the factor pair of \\(ac\\) by only considering the magnitude and ignoring the signs.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Splitting the middle term is a factorisation method for quadratic expressions of the form',
                  options: ['Splitting the middle term is a factorisation method for quadratic expressions of the form', 'The identities \\((a+b)^2 = a^2 + 2ab + b^2\\) and \\((a-b)^2 = a^2 - 2ab + b^2\\) are', 'Rational expressions are fractions where both the numerator and denominator are', 'The algebraic identity a² - b² = (a+b)(a-b) states that the difference of two squares'],
                  hint: 'Review c6_math_ch01_013 (Factors and Multiples) and c7_math_ch11_004 (Prime Factorisation Method).',
                  misconception: 'Students often incorrectly choose the factor pair of \\(ac\\) by only considering the magnitude and ignoring the signs of \\(b\\) and \\(c\\).' }
          ],
            remediations: { 'students-often-incorrectly-choose-the': { steps: ['Have the student write the sign rules explicitly: "If \\(ac > 0\\) and \\(b > 0\\), both numbers positive.', 'If \\(ac > 0\\) and \\(b < 0\\), both negative.', 'If \\(ac < 0\\), numbers have opposite signs; the number with larger absolute value has the sign of \\(b\\)." 2.', 'Practice with a table: list all factor pairs of \\(|ac|\\) with signs applied according to the rule, then compute sums.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch4_8', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often incorrectly choose the factor pair of \\(ac\\) by only considering the magnitude and ignoring the signs.',
          parts: [
                { id: 'a', prompt: 'A student factorised \\(3x^2 - 10x - 8\\) as follows: \\(ac = -24\\), numbers \\(-12\\) and \\(2\\) (sum \\(-10\\)).', answer: 'The factorisation is incorrect',
                  options: ['The factorisation is incorrect', 'the numbers should be positive'],
                  hint: 'Review c6_math_ch01_013 (Factors and Multiples) and c7_math_ch11_004 (Prime Factorisation Method).',
                  misconception: 'Students often incorrectly choose the factor pair of \\(ac\\) by only considering the magnitude and ignoring the signs of \\(b\\) and \\(c\\).' }
          ],
            remediations: { 'students-often-incorrectly-choose-the': { steps: ['Have the student write the sign rules explicitly: "If \\(ac > 0\\) and \\(b > 0\\), both numbers positive.', 'If \\(ac > 0\\) and \\(b < 0\\), both negative.', 'If \\(ac < 0\\), numbers have opposite signs; the number with larger absolute value has the sign of \\(b\\)." 2.', 'Practice with a table: list all factor pairs of \\(|ac|\\) with signs applied according to the rule, then compute sums.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch4_9', difficulty: 'standard',
          question: 'Algebra tiles are concrete manipulatives (physical or virtual) that represent.',
          hint: 'Revisit c8_math_ch6_10 (Visualising Distributive Properties Using Area Models) and.',
          misconception: 'Students treat negative tiles (e.g., \\(-x\\), \\(-1\\)) as "removing" tiles rather than as distinct coloured tiles (often.',
          parts: [
                { id: 'a', prompt: 'Identify the three standard algebra tiles and the algebraic term each represents.', answer: 'The three standard tiles are: (1) a large square with side \\(x\\), area \\(x^2\\)',
                  options: ['The three standard tiles are: (1) a large square with side \\(x\\), area \\(x^2\\)', 'the rectangle represents \\(x^2\\'],
                  hint: 'Revisit c8_math_ch6_10 (Visualising Distributive Properties Using Area Models) and c6_math_ch05_053.',
                  misconception: 'Students treat negative tiles (e.g., \\(-x\\), \\(-1\\)) as "removing" tiles rather than as distinct coloured tiles (often red) that occupy.' }
          ],
            remediations: { 'students-treat-negative-tiles-e': { steps: ['Give the student a two-colour tile set (e.g., blue for positive, red for negative).', 'Have them build \\((x+2)(x+3)\\) first with all blue tiles.', 'Then, to build \\((x-2)(x-3)\\), start with a blue \\(x^2\\).', 'Add red \\(-x\\) tiles: three along the top, two along the side.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
