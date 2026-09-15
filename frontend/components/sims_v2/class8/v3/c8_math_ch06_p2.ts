import type { SimDef } from '../../engine/types';

/** v3 generated — c8_math_ch06_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_math_ch06_p2: SimDef = {
    id: 'v3_c8_math_ch06_p2',
    title: 'We Distribute, Yet Things Multiply · Part 2/2',
    subtitle: 'One multiplier, every term gets a share',
    classLevel: 8, subject: 'mathematics', topic: 'We Distribute, Yet Things Multiply · Part 2/2',
    chapters: ['c8_math_ch06'],
    nodeIds: ['c8_math_ch6_5', 'c8_math_ch6_6', 'c8_math_ch6_7', 'c8_math_ch6_8', 'c8_math_ch6_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a bill-splitting accountant', intro: 'Buying for a class, scaling a recipe, speeding through 12 × 19 in your head — they all run on one law: whatever stands outside the bracket must multiply everything inside it.', goal: 'Understand and apply the distributive property a(b + c) = ab + ac across integers, fractions, decimals and algebraic terms — including the classic incomplete-distribution error.' },
    discovery: {
        question: 'Each of 5 students needs a ₹12 notebook and an ₹8 pen. Two ways to get the bill: 5 × (12 + 8) or 5×12 + 5×8. Both give ₹100 — coincidence?',
        options: ['No — that\'s the distributive property: the outside multiplier must visit EVERY term inside the bracket', 'Yes — it only works for these exact numbers', 'Only the first method is actually correct', 'The second method works because 5 is a small number'],
        answer: 'No — that\'s the distributive property: the outside multiplier must visit EVERY term inside the bracket',
        hook: 'The classic trap: 5(x + 3) becoming 5x + 3 — the 5 shook hands with x and ignored the 3. Distribution means the multiplier reaches every single term, which is also why 12 × 19 is secretly 12×20 − 12×1.',
    },
    teaching: [
        { title: 'Effect of Increasing One and Decreasing the Other Factor by 1', text: 'When one factor in a product is increased by 1 and the other factor is decreased by 1, the new product equals the original product plus the difference between the original factors minus 1.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_math_ch6_5', title: 'Effect of Increasing One and Decreasing the Other Factor by 1',
          scaffold: { problem: 'A shopkeeper sells pencils at ₹5 each and sells 20 pencils daily. His daily revenue is ₹100.',
            steps: [
            { text: 'Identify original factors: price a = 5, quantity b = 20. Original product = 5 × 20 = 100.' },
            { text: 'Write new factors: new price = a + 1 = 6, new quantity = b - 1 = 19. New product = (a+1)(b-1).' },
            { text: 'Apply the formula: new product = ab + (b - a) - 1. Substitute a=5, b=20: change = (20 - 5) - 1 = 14.' },
            { text: 'Verify by direct multiplication: 6 × 19 = 114. Change = 114 - 100 = 14.' },
            { text: 'Interpret: Revenue increases by ₹14 because the quantity (20) was much larger than the price (5), so the gain from.', faded: true, blankAnswer: 'New daily revenue is ₹114, an increase of ₹14.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch6_6', title: 'Distributive Property with Negative Integers',
          scaffold: { problem: 'A shopkeeper sells notebooks at a profit of ₹8 each and pens at a loss of ₹3 each. On Monday, he sold 12 notebooks and 15 pens.',
            steps: [
            { text: 'Identify the profit/loss per item: Notebook = +₹8 (profit), Pen = -₹3 (loss). Items sold: Mon (12, 15), Tue (10, 20).' },
            { text: 'Write expression for total profit/loss: \\(8(12 + 10) + (-3)(15 + 20)\\).' },
            { text: 'Distribute the profit/loss rates: \\(8 \\times 22 + (-3) \\times 35\\).' },
            { text: 'Compute each product: \\(8 \\times 22 = 176\\); \\((-3) \\times 35 = -105\\).' },
            { text: 'Add the results: \\(176 + (-105) = 176 - 105 = 71\\).', faded: true, blankAnswer: '₹71 profit' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch6_7', title: 'Algebraic Identities: (a + b)(a + b) = a-squared + 2ab + b-squared',
          scaffold: { problem: 'A square courtyard has side length \\((4x + 3)\\) metres. Find the area of the courtyard in terms of \\(x\\).',
            steps: [
            { text: 'Identify that area of a square = side × side. Here side = \\((4x + 3)\\) m, so area = \\((4x + 3)^2\\) sq m.' },
            { text: 'Recognise the binomial square and apply the identity \\((a + b)^2 = a^2 + 2ab + b^2\\) with \\(a = 4x\\) and \\(b = 3\\).' },
            { text: 'Substitute into the identity: \\((4x)^2 + 2(4x)(3) + (3)^2\\).' },
            { text: 'Compute each term: \\((4x)^2 = 16x^2\\); \\(2(4x)(3) = 24x\\); \\((3)^2 = 9\\). Combine: \\(16x^2 + 24x + 9\\) sq m.' },
            { text: 'For \\(x = 2\\), substitute: \\(16(2)^2 + 24(2) + 9 = 16(4) + 48 + 9 = 64 + 48 + 9 = 121\\) sq m.', faded: true, blankAnswer: 'Area = \\(16x^2 + 24x + 9\\) sq m; when \\(x = 2\\) m, area.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch6_8', title: 'Algebraic Identity: (a + b)(a - b) = a-squared - b-squared',
          scaffold: { problem: 'A rectangular garden has length \\((x + 4)\\) metres and breadth \\((x - 4)\\) metres. Find the area of the garden in terms of \\(x\\).',
            steps: [
            { text: 'Identify the formula for area of a rectangle: Area = length × breadth = \\((x + 4)(x - 4)\\).' },
            { text: 'Recognise the pattern \\((a + b)(a - b)\\) with \\(a = x\\) and \\(b = 4\\).' },
            { text: 'Apply the identity: \\((x + 4)(x - 4) = x^2 - 4^2 = x^2 - 16\\).' },
            { text: 'Substitute \\(x = 10\\) into the simplified expression: Area = \\(10^2 - 16 = 100 - 16 = 84\\).' },
            { text: 'State the answer with units: The area is \\(x^2 - 16\\) square metres; when \\(x = 10\\) m, the area is 84 m².', faded: true, blankAnswer: 'Area = \\(x^2 - 16\\) m²; for \\(x = 10\\) m, Area = 84 m².' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch6_9', title: 'Algebraic Identity: (a - b)(a - b) = a-squared - 2ab + b-squared',
          scaffold: { problem: 'A square plot of land has side length \\((4x - 7)\\) metres. Find the area of the plot in terms of \\(x\\).',
            steps: [
            { text: 'Identify that area of a square = side × side. Here side = \\((4x - 7)\\) m, so area = \\((4x - 7)^2\\).' },
            { text: 'Recognise the identity \\((a - b)^2 = a^2 - 2ab + b^2\\) with \\(a = 4x\\) and \\(b = 7\\).' },
            { text: 'Substitute into the formula: \\((4x)^2 - 2(4x)(7) + 7^2\\).' },
            { text: 'Compute each term: \\((4x)^2 = 16x^2\\), \\(-2(4x)(7) = -56x\\), \\(7^2 = 49\\). So area = \\(16x^2 - 56x + 49\\) sq m.' },
            { text: 'Substitute \\(x = 5\\): \\(16(25) - 56(5) + 49 = 400 - 280 + 49 = 169\\) sq m.', faded: true, blankAnswer: 'Area = \\(16x^2 - 56x + 49\\) sq m; when \\(x = 5\\) m, area.' }
            ] } },
        { type: 'drill', nodeId: 'c8_math_ch6_9', title: 'Rapid check',
          drill: { kind: 'linear2', count: 4, level: 3 } },
        { type: 'case', nodeId: 'c8_math_ch6_5', title: 'Use it in the wild',
          caseStudy: { intro: 'Pricing 5 class kits where each kit needs a ₹12 notebook and an ₹8 pen, a student computes 5 × (12 + 8) but expands it as \'5 × 12 + 8 = 68.\' The bill looks suspiciously cheap to the treasurer.',
            decisions: [{ prompt: 'Where did the arithmetic go wrong?', options: [
                { text: 'The 5 must reach both terms inside the bracket: 5 × 12 + 5 × 8 = 60 + 40 = ₹100. He multiplied only the first item — the classic incomplete distribution — leaving the pens almost free.', outcome: 'This applies a(b+c) = ab+ac correctly: the outside multiplier hits every term inside, which is why both methods of pricing the kits must agree.' },
                { text: 'The calculation is right — brackets mean multiply by the first term and then add the rest.', outcome: 'Brackets mean the outside factor multiplies the whole sum; touching only the 12 undercounts every kit by ₹32 across five kits.', reveals: 'multiply-first-only' },
                { text: 'It should be 5 + 12 + 8 = 25, since expanding a bracket means adding all the numbers together.', outcome: 'That drops the multiplication entirely — the total must scale with 5 kits, so a sum of the prices cannot describe the bill.', reveals: 'expand-means-add' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch6_9', title: 'You made it',
          caseStudy: { intro: 'Multiply the bundle or multiply each item — same total, different path. a(b + c) = ab + ac is the rule that lets you slice hard multiplication into easy pieces.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch6_5', difficulty: 'standard',
          question: 'When one factor in a product is increased by 1 and the other factor.',
          hint: 'If stuck, revisit c8_math_ch6_4 (Expanding (a+1)(b+1)) and practice the four-term.',
          misconception: 'Students often think that increasing one factor by 1 and decreasing the other by 1 leaves the product unchanged because.',
          parts: [
                { id: 'a', prompt: 'What is the algebraic expansion of (x + 1)(y - 1) using the distributive property?', answer: '(x + 1)(y - 1) = xy - x + y - 1 = xy + (y - x) - 1',
                  options: ['(x + 1)(y - 1) = xy - x + y - 1 = xy + (y - x) - 1', '+1 and -1 cancel out'],
                  hint: 'If stuck, revisit c8_math_ch6_4 (Expanding (a+1)(b+1)) and practice the four-term expansion until.',
                  misconception: 'Students often think that increasing one factor by 1 and decreasing the other by 1 leaves the product unchanged because "+1 and -1 cancel.' },
                { id: 'b', prompt: 'If we have two numbers where the first number is larger than the second (a > b), and we increase the first by 1 while decreasing the second by 1, will the.', answer: 'The product will decrease',
                  options: ['The product will decrease', 'increase', '+1 and -1 cancel out'],
                  hint: 'If stuck, revisit c8_math_ch6_4 (Expanding (a+1)(b+1)) and practice the four-term expansion until.',
                  misconception: 'Students often think that increasing one factor by 1 and decreasing the other by 1 leaves the product unchanged because "+1 and -1 cancel.' },
                { id: 'c', prompt: 'The product of two numbers is 72. One number is 8 and the other is 9. If we increase 8 by 1 and decrease 9 by 1, what is the new product? Show your steps.', answer: 'Original: 8 × 9 = 72',
                  options: ['Original: 8 × 9 = 72', '+1 and -1 cancel out'],
                  hint: 'If stuck, revisit c8_math_ch6_4 (Expanding (a+1)(b+1)) and practice the four-term expansion until.',
                  misconception: 'Students often think that increasing one factor by 1 and decreasing the other by 1 leaves the product unchanged because "+1 and -1 cancel.' },
                { id: 'd', prompt: 'Compare the effect on the product when (i) we increase the larger factor by 1 and decrease the smaller by 1, versus (ii) we increase the smaller factor by 1.', answer: 'Case (i): larger is 10, smaller is 6',
                  options: ['Case (i): larger is 10, smaller is 6', '+1 and -1 cancel out'],
                  hint: 'If stuck, revisit c8_math_ch6_4 (Expanding (a+1)(b+1)) and practice the four-term expansion until.',
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
                  hint: 'If stuck, revisit c8_math_ch6_4 (Expanding (a+1)(b+1)) and practice the four-term expansion until.',
                  misconception: 'Students often think that increasing one factor by 1 and decreasing the other by 1 leaves the product unchanged because "+1 and -1 cancel.' },
                { id: 'b', prompt: 'Create a real-life word problem (using rupees, metres, or kilograms) where increasing one quantity by 1 and decreasing another by 1 results in the product.', answer: 'Example: A rectangle has length 7 m and breadth 6 m',
                  options: ['Example: A rectangle has length 7 m and breadth 6 m', '+1 and -1 cancel out'],
                  hint: 'If stuck, revisit c8_math_ch6_4 (Expanding (a+1)(b+1)) and practice the four-term expansion until.',
                  misconception: 'Students often think that increasing one factor by 1 and decreasing the other by 1 leaves the product unchanged because "+1 and -1 cancel.' }
          ],
            remediations: { 'increasing-one-factor-by-1': { steps: ['If a student shows this misconception, have them physically model with counters: make 3 rows of 7 counters (21).', 'Then rearrange to 4 rows of 6 counters (24).', 'Then guide them to expand (a+1)(b-1) step by step: (a+1)(b-1) = a(b-1) + 1(b-1) = ab - a + b - 1.', 'Circle the terms -a and +b and ask: "When do these cancel?'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch6_6', difficulty: 'standard',
          question: 'The distributive property of multiplication over addition (and subtraction).',
          hint: 'Review integer multiplication sign rules (c7_math_ch10_004, c7_math_ch10_005) and the.',
          misconception: 'Students often forget to multiply the outside negative integer by the second term when it is subtracted (i.e.,.',
          parts: [
                { id: 'a', prompt: 'Explain why \\(-4 \\times (6 - 3)\\) equals \\((-4 \\times 6) - (-4 \\times 3)\\) using the concept of multiplication as repeated addition or a number line.', answer: '\\(6 - 3\\) means \\(6 + (-3)\\)',
                  options: ['\\(6 - 3\\) means \\(6 + (-3)\\)', 'the two minuses make a plus'],
                  hint: 'Review integer multiplication sign rules (c7_math_ch10_004, c7_math_ch10_005) and the concept.',
                  misconception: 'Students often forget to multiply the outside negative integer by the second term when it is subtracted (i.e., a negative term inside the.' }
          ],
            remediations: { 'students-often-forget-to-multiply': { steps: ['If a student makes this error, first have them rewrite the expression inside the bracket using only addition: \\(4 - 5.', 'Then apply the distributive property to \\(-3(4 + (-5))\\).', 'Explicitly multiply \\(-3\\) by each term: \\((-3 \\times 4) + (-3 \\times -5)\\).', 'Use a two-color pen or highlighter: one color for the multiplier outside, another for each term inside.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch6_7', difficulty: 'standard',
          question: 'The algebraic identity \\((a + b)^2 = a^2 + 2ab + b^2\\) states that the square.',
          hint: 'Review the distributive property with binomials (c8_math_ch6_2) and practice combining.',
          misconception: 'Students often write \\((a + b)^2 = a^2 + b^2\\), forgetting the middle term \\(2ab\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The algebraic identity \\((a + b)^2 = a^2 + 2ab + b^2\\) states that the square of the sum',
                  options: ['The algebraic identity \\((a + b)^2 = a^2 + 2ab + b^2\\) states that the square of the sum', 'The distributive property of multiplication over addition states that for any three', 'The distributive property states that multiplying a sum by a number gives the same result', 'Applications of algebraic identities involve recognizing algebraic expressions that match'],
                  hint: 'Review the distributive property with binomials (c8_math_ch6_2) and practice combining like terms.',
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
                  hint: 'Review the distributive property with negative integers (c8_math_ch6_6) and simplification.',
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
                  hint: 'Revisit the distributive property with negative terms (c8_math_ch6_6) and integer multiplication.',
                  misconception: 'Students often write \\((a - b)^2 = a^2 - b^2\\), dropping the middle term \\(-2ab\\) entirely.' }
          ],
            remediations: { 'students-often-write-a-b': { steps: ['Ask the student to write \\((a - b)^2\\) as \\((a - b)(a - b)\\) and expand using the distributive property step by step.', 'Have them circle the two middle terms \\(-ab\\) and \\(-ab\\) and add them to get \\(-2ab\\).', 'Then compare with \\((a + b)(a - b)\\) to highlight the structural difference.', 'Repeat with numerical examples like \\((5 - 2)^2\\) vs \\(5^2 - 2^2\\) to show the numerical discrepancy (9 vs 21).'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
