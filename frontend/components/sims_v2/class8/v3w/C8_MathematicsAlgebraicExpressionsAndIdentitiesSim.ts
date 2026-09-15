import type { SimDef } from '../../engine/types';
import C8_MathematicsAlgebraicExpressionsAndIdentitiesSim from '../../../simulations/c6_12/C8_MathematicsAlgebraicExpressionsAndIdentitiesSim';

/** v3 wrapped master — C8_MathematicsAlgebraicExpressionsAndIdentitiesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_mathematicsalgebraicexpressionsandidentitiessim: SimDef = {
    id: 'v3w_c8_mathematicsalgebraicexpressionsandidentitiessim',
    title: 'Algebraic Expressions And Identities',
    subtitle: 'Covers simplification of algebraic expressions using the three standard binomial.',
    classLevel: 8, subject: 'mathematics', topic: 'Applications of Algebraic Identities in Simplifying Expressions',
    chapters: [],
    nodeIds: ['c8_math_ch6_11', 'c8_math_ch6_5', 'c8_math_ch6_6', 'c8_math_ch6_7', 'c8_math_ch6_8', 'c8_math_ch6_9', 'c8_math_ch6_10', 'c8_math_ch6_4', 'c8_math_ch6_1', 'c8_math_ch6_2', 'c8_math_ch1_6', 'c8_math_ch1_12', 'c8_math_ch1_3', 'c8_math_ch5_6', 'c8_math_ch5_7'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine you are tiling a square floor whose side length is (2x + 3) metres.', goal: 'Master Algebraic Expressions And Identities.' },
    discovery: {
        question: 'If we have two numbers where the first number is larger than the second (a > b), and we increase the first by 1 while decreasing the second by 1, will the.',
        options: ['The product will decrease', 'increase', '+1 and -1 cancel out'],
        answer: 'The product will decrease',
        hook: 'Students often think that increasing one factor by 1 and decreasing the other by 1 leaves the product unchanged because.',
    },
    teaching: [
        { title: 'Applications of algebraic identities involve.', text: 'Applications of algebraic identities involve recognizing algebraic expressions that match the patterns of standard identities — (a+b)² = a² + 2ab + b², (a-b)² = a² - 2ab + b², and (a+b)(a-b) = a² -.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_math_ch6_11', title: 'Applications of algebraic identities.',
          scaffold: { problem: 'A square garden has side length (2x + 5) metres. Find its area in simplified form.',
            steps: [
            { text: 'Write the expression for area of a square: Area = side × side = (2x + 5)².' },
            { text: 'Recognize the pattern (a + b)². Identify a = 2x and b = 5.' },
            { text: 'Apply the identity (a + b)² = a² + 2ab + b². Substitute: (2x)² + 2(2x)(5) + 5².' },
            { text: 'Compute each term: (2x)² = 4x²; 2(2x)(5) = 20x; 5² = 25. Combine: 4x² + 20x + 25.' },
            { text: 'Interpret the result: The area of the garden is (4x² + 20x + 25) square metres.', faded: true, blankAnswer: '4x² + 20x + 25 m²' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch6_5', title: 'When one factor in a product is.',
          scaffold: { problem: 'A shopkeeper sells pencils at ₹5 each and sells 20 pencils daily. His daily revenue is ₹100.',
            steps: [
            { text: 'Identify original factors: price a = 5, quantity b = 20. Original product = 5 × 20 = 100.' },
            { text: 'Write new factors: new price = a + 1 = 6, new quantity = b - 1 = 19. New product = (a+1)(b-1).' },
            { text: 'Apply the formula: new product = ab + (b - a) - 1. Substitute a=5, b=20: change = (20 - 5) - 1 = 14.' },
            { text: 'Verify by direct multiplication: 6 × 19 = 114. Change = 114 - 100 = 14.' },
            { text: 'Interpret: Revenue increases by ₹14 because the quantity (20) was much larger than the price (5), so the gain from.', faded: true, blankAnswer: 'New daily revenue is ₹114, an increase of ₹14.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch6_6', title: 'The distributive property of.',
          scaffold: { problem: 'A shopkeeper sells notebooks at a profit of ₹8 each and pens at a loss of ₹3 each. On Monday, he sold 12 notebooks and 15 pens.',
            steps: [
            { text: 'Identify the profit/loss per item: Notebook = +₹8 (profit), Pen = -₹3 (loss). Items sold: Mon (12, 15), Tue (10, 20).' },
            { text: 'Write expression for total profit/loss: \\(8(12 + 10) + (-3)(15 + 20)\\).' },
            { text: 'Distribute the profit/loss rates: \\(8 \\times 22 + (-3) \\times 35\\).' },
            { text: 'Compute each product: \\(8 \\times 22 = 176\\); \\((-3) \\times 35 = -105\\).' },
            { text: 'Add the results: \\(176 + (-105) = 176 - 105 = 71\\).', faded: true, blankAnswer: '₹71 profit' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch6_7', title: 'The algebraic identity \\((a + b)^2 =.',
          scaffold: { problem: 'A square courtyard has side length \\((4x + 3)\\) metres. Find the area of the courtyard in terms of \\(x\\).',
            steps: [
            { text: 'Identify that area of a square = side × side. Here side = \\((4x + 3)\\) m, so area = \\((4x + 3)^2\\) sq m.' },
            { text: 'Recognise the binomial square and apply the identity \\((a + b)^2 = a^2 + 2ab + b^2\\) with \\(a = 4x\\) and \\(b = 3\\).' },
            { text: 'Substitute into the identity: \\((4x)^2 + 2(4x)(3) + (3)^2\\).' },
            { text: 'Compute each term: \\((4x)^2 = 16x^2\\); \\(2(4x)(3) = 24x\\); \\((3)^2 = 9\\). Combine: \\(16x^2 + 24x + 9\\) sq m.' },
            { text: 'For \\(x = 2\\), substitute: \\(16(2)^2 + 24(2) + 9 = 16(4) + 48 + 9 = 64 + 48 + 9 = 121\\) sq m.', faded: true, blankAnswer: 'Area = \\(16x^2 + 24x + 9\\) sq m; when \\(x = 2\\) m, area =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch6_8', title: 'The algebraic identity \\((a + b)(a - b).',
          scaffold: { problem: 'A rectangular garden has length \\((x + 4)\\) metres and breadth \\((x - 4)\\) metres. Find the area of the garden in terms of \\(x\\).',
            steps: [
            { text: 'Identify the formula for area of a rectangle: Area = length × breadth = \\((x + 4)(x - 4)\\).' },
            { text: 'Recognise the pattern \\((a + b)(a - b)\\) with \\(a = x\\) and \\(b = 4\\).' },
            { text: 'Apply the identity: \\((x + 4)(x - 4) = x^2 - 4^2 = x^2 - 16\\).' },
            { text: 'Substitute \\(x = 10\\) into the simplified expression: Area = \\(10^2 - 16 = 100 - 16 = 84\\).' },
            { text: 'State the answer with units: The area is \\(x^2 - 16\\) square metres; when \\(x = 10\\) m, the area is 84 m².', faded: true, blankAnswer: 'Area = \\(x^2 - 16\\) m²; for \\(x = 10\\) m, Area = 84 m².' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch6_9', title: 'The algebraic identity \\((a - b)(a - b).',
          scaffold: { problem: 'A square plot of land has side length \\((4x - 7)\\) metres. Find the area of the plot in terms of \\(x\\).',
            steps: [
            { text: 'Identify that area of a square = side × side. Here side = \\((4x - 7)\\) m, so area = \\((4x - 7)^2\\).' },
            { text: 'Recognise the identity \\((a - b)^2 = a^2 - 2ab + b^2\\) with \\(a = 4x\\) and \\(b = 7\\).' },
            { text: 'Substitute into the formula: \\((4x)^2 - 2(4x)(7) + 7^2\\).' },
            { text: 'Compute each term: \\((4x)^2 = 16x^2\\), \\(-2(4x)(7) = -56x\\), \\(7^2 = 49\\). So area = \\(16x^2 - 56x + 49\\) sq m.' },
            { text: 'Substitute \\(x = 5\\): \\(16(25) - 56(5) + 49 = 400 - 280 + 49 = 169\\) sq m.', faded: true, blankAnswer: 'Area = \\(16x^2 - 56x + 49\\) sq m; when \\(x = 5\\) m, area =.' }
            ] } },
        { type: 'dissect', nodeId: 'c8_math_ch6_5', title: 'Identify each idea',
          dissect: { specimen: 'Algebraic Expressions And Identities', spots: [
            { id: 's1', label: 'Applications of algebraic identities involve', prompt: 'Which idea is this? — Applications of algebraic identities involve recognizing algebraic expressions that match.', answer: 'Applications of algebraic identities involve', options: ['Applications of algebraic identities involve', 'When one factor in a', 'The distributive property of multiplication', 'The algebraic identity a'] },
            { id: 's2', label: 'When one factor in a', prompt: 'Which idea is this? — When one factor in a product is increased by 1 and the other factor is decreased by 1,.', answer: 'When one factor in a', options: ['When one factor in a', 'Applications of algebraic identities involve', 'The distributive property of multiplication', 'The algebraic identity a'] },
            { id: 's3', label: 'The distributive property of multiplication', prompt: 'Which idea is this? — The distributive property of multiplication over addition (and subtraction) holds for all.', answer: 'The distributive property of multiplication', options: ['The distributive property of multiplication', 'Applications of algebraic identities involve', 'When one factor in a', 'The algebraic identity a'] },
            { id: 's4', label: 'The algebraic identity a', prompt: 'Which idea is this? — The algebraic identity \\((a + b)^2 = a^2 + 2ab + b^2\\) states that the square of the sum.', answer: 'The algebraic identity a', options: ['The algebraic identity a', 'Applications of algebraic identities involve', 'When one factor in a', 'The distributive property of multiplication'] },
            { id: 's5', label: 'The algebraic identity a -', prompt: 'Which idea is this? — The algebraic identity \\((a - b)(a - b) = a^2 - 2ab + b^2\\) states that the square of the.', answer: 'The algebraic identity a -', options: ['The algebraic identity a -', 'Applications of algebraic identities involve', 'When one factor in a', 'The distributive property of multiplication'] }
          ] } }
    ],
    explore: { component: C8_MathematicsAlgebraicExpressionsAndIdentitiesSim, prompt: 'Explore the interactive — Algebraic Expressions And Identities' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch6_11', difficulty: 'standard',
          question: 'Applications of algebraic identities involve recognizing algebraic expressions.',
          hint: 'Review the distributive property (c8_math_ch6_1) and the three standard identities.',
          misconception: 'Students often write (2x+3)² = 4x² + 9, completely omitting the middle term 12x.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Applications of algebraic identities involve recognizing algebraic expressions that match',
                  options: ['Applications of algebraic identities involve recognizing algebraic expressions that match', 'When one factor in a product is increased by 1 and the other factor is decreased by 1,', 'The distributive property of multiplication over addition (and subtraction) holds for all', 'The algebraic identity \\((a + b)^2 = a^2 + 2ab + b^2\\) states that the square of the sum'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write (2x+3)² = 4x² + 9, completely omitting the middle term 12x.' }
          ],
            remediations: { 'students-often-write-2x-3': { steps: ['Go back to the area model: draw a square of side (2x+3), partition it into four rectangles (2x×2x, 2x×3, 3×2x, 3×3).', 'Compute each area: 4x², 6x, 6x, 9.', 'Point out the two 6x rectangles are the missing middle term.', 'Practice with numerical binomials like (10+2)² = 100 + 40 + 4 = 144 to reinforce the pattern before returning to.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch6_5', difficulty: 'standard',
          question: 'When one factor in a product is increased by 1 and the other factor is.',
          hint: 'If stuck, revisit c8_math_ch6_4 (Expanding (a+1)(b+1)) and practice the four-term.',
          misconception: 'Students often think that increasing one factor by 1 and decreasing the other by 1 leaves the product unchanged because.',
          parts: [
                { id: 'a', prompt: 'What is the algebraic expansion of (x + 1)(y - 1) using the distributive property?', answer: '(x + 1)(y - 1) = xy - x + y - 1 = xy + (y - x) - 1',
                  options: ['(x + 1)(y - 1) = xy - x + y - 1 = xy + (y - x) - 1', '+1 and -1 cancel out'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that increasing one factor by 1 and decreasing the other by 1 leaves the product unchanged because "+1 and -1 cancel.' },
                { id: 'b', prompt: 'If we have two numbers where the first number is larger than the second (a > b), and we increase the first by 1 while decreasing the second by 1, will the.', answer: 'The product will decrease',
                  options: ['The product will decrease', 'increase', '+1 and -1 cancel out'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that increasing one factor by 1 and decreasing the other by 1 leaves the product unchanged because "+1 and -1 cancel.' },
                { id: 'c', prompt: 'The product of two numbers is 72. One number is 8 and the other is 9. If we increase 8 by 1 and decrease 9 by 1, what is the new product? Show your steps.', answer: 'Original: 8 × 9 = 72',
                  options: ['Original: 8 × 9 = 72', '+1 and -1 cancel out'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that increasing one factor by 1 and decreasing the other by 1 leaves the product unchanged because "+1 and -1 cancel.' }
          ],
            remediations: { 'increasing-one-factor-by-1': { steps: ['If a student shows this misconception, have them physically model with counters: make 3 rows of 7 counters (21).', 'Then rearrange to 4 rows of 6 counters (24).', 'Then guide them to expand (a+1)(b-1) step by step: (a+1)(b-1) = a(b-1) + 1(b-1) = ab - a + b - 1.', 'Circle the terms -a and +b and ask: "When do these cancel?'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch6_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that increasing one factor by 1 and decreasing the other by 1 leaves the product unchanged because.',
          parts: [
                { id: 'a', prompt: 'A student claims that (a+1)(b-1) is always less than ab because one factor goes up and the other goes down. Is this claim correct?', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', '+1 and -1 cancel out'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that increasing one factor by 1 and decreasing the other by 1 leaves the product unchanged because "+1 and -1 cancel.' },
                { id: 'b', prompt: 'Create a real-life word problem (using rupees, metres, or kilograms) where increasing one quantity by 1 and decreasing another by 1 results in the product.', answer: 'Example: A rectangle has length 7 m and breadth 6 m',
                  options: ['Example: A rectangle has length 7 m and breadth 6 m', '+1 and -1 cancel out'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that increasing one factor by 1 and decreasing the other by 1 leaves the product unchanged because "+1 and -1 cancel.' }
          ],
            remediations: { 'increasing-one-factor-by-1': { steps: ['If a student shows this misconception, have them physically model with counters: make 3 rows of 7 counters (21).', 'Then rearrange to 4 rows of 6 counters (24).', 'Then guide them to expand (a+1)(b-1) step by step: (a+1)(b-1) = a(b-1) + 1(b-1) = ab - a + b - 1.', 'Circle the terms -a and +b and ask: "When do these cancel?'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch6_6', difficulty: 'standard',
          question: 'The distributive property of multiplication over addition (and subtraction).',
          hint: 'Review integer multiplication sign rules (c7_math_ch10_004, c7_math_ch10_005) and the.',
          misconception: 'Students often forget to multiply the outside negative integer by the second term when it is subtracted (i.e., a.',
          parts: [
                { id: 'a', prompt: 'Explain why \\(-4 \\times (6 - 3)\\) equals \\((-4 \\times 6) - (-4 \\times 3)\\) using the concept of multiplication as repeated addition or a number line.', answer: '\\(6 - 3\\) means \\(6 + (-3)\\)',
                  options: ['\\(6 - 3\\) means \\(6 + (-3)\\)', 'the two minuses make a plus'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often forget to multiply the outside negative integer by the second term when it is subtracted (i.e., a negative term inside the.' }
          ],
            remediations: { 'students-often-forget-to-multiply': { steps: ['If a student makes this error, first have them rewrite the expression inside the bracket using only addition: \\(4 - 5 =.', 'Then apply the distributive property to \\(-3(4 + (-5))\\).', 'Explicitly multiply \\(-3\\) by each term: \\((-3 \\times 4) + (-3 \\times -5)\\).', 'Use a two-color pen or highlighter: one color for the multiplier outside, another for each term inside.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch6_7', difficulty: 'standard',
          question: 'The algebraic identity \\((a + b)^2 = a^2 + 2ab + b^2\\) states that the square.',
          hint: 'Review the distributive property with binomials (c8_math_ch6_2) and practice combining.',
          misconception: 'Students often write \\((a + b)^2 = a^2 + b^2\\), forgetting the middle term \\(2ab\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The algebraic identity \\((a + b)^2 = a^2 + 2ab + b^2\\) states that the square of the sum',
                  options: ['The algebraic identity \\((a + b)^2 = a^2 + 2ab + b^2\\) states that the square of the sum', 'Applications of algebraic identities involve recognizing algebraic expressions that match', 'When one factor in a product is increased by 1 and the other factor is decreased by 1,', 'The distributive property of multiplication over addition (and subtraction) holds for all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write \\((a + b)^2 = a^2 + b^2\\), forgetting the middle term \\(2ab\\).' }
          ],
            remediations: { 'students-often-write-a-b': { steps: ['Have the student go back to the distributive property: \\((a+b)(a+b) = a(a+b) + b(a+b)\\).', 'Make them expand \\(a(a+b)\\) and \\(b(a+b)\\) separately, then add.', 'Circle the two cross terms \\(ab\\) and \\(ba\\), emphasise they are like terms so \\(ab + ba = 2ab\\).', 'For negative \\(b\\), use a specific example: \\((x - 3)^2 = (x + (-3))^2\\).'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch6_8', difficulty: 'standard',
          question: 'The algebraic identity \\((a + b)(a - b) = a^2 - b^2\\) states that the product.',
          hint: 'Review the distributive property with negative integers (c8_math_ch6_6) and.',
          misconception: 'Students often treat \\(a\\) as only the variable part, ignoring the coefficient.',
          parts: [
                { id: 'a', prompt: 'Compare the expansions of \\((a + b)^2\\) and \\((a + b)(a - b)\\). What is the same and what is different? How does the sign between the terms affect the result?', answer: 'Both give \\(a^2\\) and \\(b^2\\) terms',
                  options: ['Both give \\(a^2\\) and \\(b^2\\) terms', 'both are the same except the sign'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat \\(a\\) as only the variable part, ignoring the coefficient.' }
          ],
            remediations: { 'students-often-treat-a-as': { steps: ['If a student makes the coefficient error, have them first expand \\((3x+5)(3x-5)\\) fully using the distributive.', 'Then ask: "What is \\(a\\) here?', 'What is \\(a^2\\)?" Guide them to see \\(a = 3x\\), so \\(a^2 = (3x)^2 = 9x^2\\).', 'Practice with \\((2y+7)(2y-7)\\), \\((5m+2)(5m-2)\\) until they consistently square the entire term.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch6_8', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat \\(a\\) as only the variable part, ignoring the coefficient.',
          parts: [
                { id: 'a', prompt: 'Compare the expansions of \\((a + b)^2\\) and \\((a + b)(a - b)\\). What is the same and what is different? How does the sign between the terms affect the result?', answer: 'Both give \\(a^2\\) and \\(b^2\\) terms',
                  options: ['Both give \\(a^2\\) and \\(b^2\\) terms', 'both are the same except the sign'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat \\(a\\) as only the variable part, ignoring the coefficient.' }
          ],
            remediations: { 'students-often-treat-a-as': { steps: ['If a student makes the coefficient error, have them first expand \\((3x+5)(3x-5)\\) fully using the distributive.', 'Then ask: "What is \\(a\\) here?', 'What is \\(a^2\\)?" Guide them to see \\(a = 3x\\), so \\(a^2 = (3x)^2 = 9x^2\\).', 'Practice with \\((2y+7)(2y-7)\\), \\((5m+2)(5m-2)\\) until they consistently square the entire term.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch6_9', difficulty: 'standard',
          question: 'The algebraic identity \\((a - b)(a - b) = a^2 - 2ab + b^2\\) states that the.',
          hint: 'Revisit the distributive property with negative terms (c8_math_ch6_6) and integer.',
          misconception: 'Students often write \\((a - b)^2 = a^2 - b^2\\), dropping the middle term \\(-2ab\\) entirely.',
          parts: [
                { id: 'a', prompt: 'Compare the expansions of \\((a - b)^2\\) and \\((b - a)^2\\). Are they equal?', answer: '\\((a - b)^2 = a^2 - 2ab + b^2\\)',
                  options: ['\\((a - b)^2 = a^2 - 2ab + b^2\\)', 'order matters in subtraction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write \\((a - b)^2 = a^2 - b^2\\), dropping the middle term \\(-2ab\\) entirely.' }
          ],
            remediations: { 'students-often-write-a-b': { steps: ['Ask the student to write \\((a - b)^2\\) as \\((a - b)(a - b)\\) and expand using the distributive property step by step:.', 'Have them circle the two middle terms \\(-ab\\) and \\(-ab\\) and add them to get \\(-2ab\\).', 'Then compare with \\((a + b)(a - b)\\) to highlight the structural difference.', 'Repeat with numerical examples like \\((5 - 2)^2\\) vs \\(5^2 - 2^2\\) to show the numerical discrepancy (9 vs 21).'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch6_9', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write \\((a - b)^2 = a^2 - b^2\\), dropping the middle term \\(-2ab\\) entirely.',
          parts: [
                { id: 'a', prompt: 'A student expanded \\((5 - 2x)^2\\) as \\(25 - 10x + 4x^2\\). Is this correct? If not, identify the exact error and give the correct expansion.', answer: 'The student\'s answer is incorrect',
                  options: ['The student\'s answer is incorrect', 'it\'s correct because \\(2 \\times 5 \\times x = 10x\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write \\((a - b)^2 = a^2 - b^2\\), dropping the middle term \\(-2ab\\) entirely.' },
                { id: 'b', prompt: 'Compare the expansions of \\((a - b)^2\\) and \\((b - a)^2\\). Are they equal?', answer: '\\((a - b)^2 = a^2 - 2ab + b^2\\)',
                  options: ['\\((a - b)^2 = a^2 - 2ab + b^2\\)', 'order matters in subtraction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write \\((a - b)^2 = a^2 - b^2\\), dropping the middle term \\(-2ab\\) entirely.' }
          ],
            remediations: { 'students-often-write-a-b': { steps: ['Ask the student to write \\((a - b)^2\\) as \\((a - b)(a - b)\\) and expand using the distributive property step by step:.', 'Have them circle the two middle terms \\(-ab\\) and \\(-ab\\) and add them to get \\(-2ab\\).', 'Then compare with \\((a + b)(a - b)\\) to highlight the structural difference.', 'Repeat with numerical examples like \\((5 - 2)^2\\) vs \\(5^2 - 2^2\\) to show the numerical discrepancy (9 vs 21).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
