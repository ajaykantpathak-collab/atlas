import type { SimDef } from '../../engine/types';

/** v3 generated — c8_math_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_math_ch06_p1: SimDef = {
    id: 'v3_c8_math_ch06_p1',
    title: 'We Distribute, Yet Things Multiply · Part 1/2',
    subtitle: 'One multiplier, every term gets a share',
    classLevel: 8, subject: 'mathematics', topic: 'We Distribute, Yet Things Multiply · Part 1/2',
    chapters: ['c8_math_ch06'],
    nodeIds: ['c8_math_ch6_1', 'c8_math_ch6_10', 'c8_math_ch6_11', 'c8_math_ch6_2', 'c8_math_ch6_3', 'c8_math_ch6_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a bill-splitting accountant', intro: 'Buying for a class, scaling a recipe, speeding through 12 × 19 in your head — they all run on one law: whatever stands outside the bracket must multiply everything inside it.', goal: 'Understand and apply the distributive property a(b + c) = ab + ac across integers, fractions, decimals and algebraic terms — including the classic incomplete-distribution error.' },
    discovery: {
        question: 'Each of 5 students needs a ₹12 notebook and an ₹8 pen. Two ways to get the bill: 5 × (12 + 8) or 5×12 + 5×8. Both give ₹100 — coincidence?',
        options: ['No — that\'s the distributive property: the outside multiplier must visit EVERY term inside the bracket', 'Yes — it only works for these exact numbers', 'Only the first method is actually correct', 'The second method works because 5 is a small number'],
        answer: 'No — that\'s the distributive property: the outside multiplier must visit EVERY term inside the bracket',
        hook: 'The classic trap: 5(x + 3) becoming 5x + 3 — the 5 shook hands with x and ignored the 3. Distribution means the multiplier reaches every single term, which is also why 12 × 19 is secretly 12×20 − 12×1.',
    },
    teaching: [
        { title: 'Distributive Property of Multiplication Over Addition', text: 'The distributive property of multiplication over addition states that for any three numbers \\(a\\), \\(b\\), and \\(c\\) (integers, fractions, decimals, or algebraic terms), multiplying \\(a\\) by the sum.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_math_ch6_1', title: 'Distributive Property of Multiplication Over Addition',
          scaffold: { problem: 'A school orders 15 boxes of pencils. Each box contains 12 red pencils and 8 blue pencils.',
            steps: [
            { text: 'Identify the multiplier (number of boxes = 15) and the addends inside the bracket (red pencils per box = 12, blue.' },
            { text: 'Write the expression for total pencils using the sum first: \\(15 \\times (12 + 8)\\).' },
            { text: 'Apply distributive property: \\(15 \\times 12 + 15 \\times 8\\).' },
            { text: 'Compute each product: \\(15 \\times 12 = 180\\) (since \\(10 \\times 12 = 120\\) and \\(5 \\times 12 = 60\\), sum = 180).' },
            { text: 'Add the partial products: \\(180 + 120 = 300\\). Verify with sum-first method: \\(12+8=20\\), \\(15 \\times 20 = 300\\).', faded: true, blankAnswer: '300 pencils' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch6_10', title: 'Visualising Distributive Properties Using Area Models',
          scaffold: { problem: 'A school garden has a rectangular plot. The length is (x + 4) metres and the breadth is (x + 6) metres.',
            steps: [
            { text: 'Identify the given dimensions: length = (x + 4) m, breadth = (x + 6) m. We need the area = length × breadth.' },
            { text: 'Draw a rectangle. Split the length into two segments: x and 4. Split the breadth into two segments: x and 6.' },
            { text: 'Label each sub-rectangle with its dimensions and compute its area:' },
            { text: 'Add the areas of all four sub-rectangles: x² + 6x + 4x + 24 = x² + 10x + 24.' },
            { text: 'Interpret the result: The total area of the garden is (x² + 10x + 24) square metres.', faded: true, blankAnswer: 'x² + 10x + 24 m²' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch6_11', title: 'Applications of Algebraic Identities in Simplifying Expressions',
          scaffold: { problem: 'A square garden has side length (2x + 5) metres. Find its area in simplified form.',
            steps: [
            { text: 'Write the expression for area of a square: Area = side × side = (2x + 5)².' },
            { text: 'Recognize the pattern (a + b)². Identify a = 2x and b = 5.' },
            { text: 'Apply the identity (a + b)² = a² + 2ab + b². Substitute: (2x)² + 2(2x)(5) + 5².' },
            { text: 'Compute each term: (2x)² = 4x²; 2(2x)(5) = 20x; 5² = 25. Combine: 4x² + 20x + 25.' },
            { text: 'Interpret the result: The area of the garden is (4x² + 20x + 25) square metres.', faded: true, blankAnswer: '4x² + 20x + 25 m²' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch6_2', title: 'Expanding (a + b) c Using Distributivity',
          scaffold: { problem: 'A school orders uniform cloth for Class 8. Each student needs \\(2.5\\) metres of shirt cloth (cost ₹\\(x\\) per metre) and \\(1.2\\) metres.',
            steps: [
            { text: 'Identify the cost per student: Shirt cloth cost = \\(2.5 \\times x = 2.5x\\), Trouser cloth cost = \\(1.2 \\times.' },
            { text: 'Identify the multiplier: Number of students \\(c = 40\\). Total cost expression = \\(40 \\times (2.5x + 1.2y)\\).' },
            { text: 'Apply distributive property: Multiply \\(40\\) by each term inside the bracket: \\(40 \\times 2.5x + 40 \\times 1.2y\\).' },
            { text: 'Compute the coefficients: \\(40 \\times 2.5 = 100\\), so first term is \\(100x\\).' },
            { text: 'Write final expanded expression: \\(100x + 48y\\) rupees. Verify: If \\(x=100, y=150\\), per student = \\(250+180=430\\).', faded: true, blankAnswer: '\\(100x + 48y\\) rupees' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch6_3', title: 'Increment in Products: Effect of Increasing One Factor by 1',
          scaffold: { problem: 'A school orders 25 boxes of pencils. Each box contains 12 pencils. The clerk calculates the total as 300 pencils.',
            steps: [
            { text: 'Identify the original product: 25 boxes × 12 pencils/box = 300 pencils.' },
            { text: 'Identify the change: number of boxes increases by 1 (from 25 to 26). The other factor (pencils per box) is 12.' },
            { text: 'Apply the increment rule: new total = original total + other factor = 300 + 12.' },
            { text: 'Compute: 300 + 12 = 312.' },
            { text: 'Verify: 26 × 12 = (20+6)×12 = 240+72 = 312. The answer is 312 pencils.', faded: true, blankAnswer: '312 pencils' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch6_4', title: 'Expanding (a + 1)(b + 1) Using Distributivity',
          scaffold: { problem: 'A rectangular plot has length (x + 1) metres and breadth (y + 1) metres.',
            steps: [
            { text: 'Identify the given expressions: length = (x + 1) m, breadth = (y + 1) m. Area = length × breadth = (x + 1)(y + 1).' },
            { text: 'Apply distributive property: (x + 1)(y + 1) = x(y + 1) + 1(y + 1).' },
            { text: 'Distribute each term: x(y + 1) = xy + x; 1(y + 1) = y + 1.' },
            { text: 'Combine all terms: xy + x + y + 1. This is the expanded algebraic expression for area.' },
            { text: 'Substitute x = 10, y = 5 into expanded form: (10)(5) + 10 + 5 + 1 = 50 + 10 + 5 + 1 = 66 sq m.', faded: true, blankAnswer: 'Area = xy + x + y + 1 sq m; for x=10, y=5, area = 66 sq m.' }
            ] } },
        { type: 'drill', nodeId: 'c8_math_ch6_4', title: 'Rapid check',
          drill: { kind: 'linear2', count: 4, level: 3 } },
        { type: 'case', nodeId: 'c8_math_ch6_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Pricing 5 class kits where each kit needs a ₹12 notebook and an ₹8 pen, a student computes 5 × (12 + 8) but expands it as \'5 × 12 + 8 = 68.\' The bill looks suspiciously cheap to the treasurer.',
            decisions: [{ prompt: 'Where did the arithmetic go wrong?', options: [
                { text: 'The 5 must reach both terms inside the bracket: 5 × 12 + 5 × 8 = 60 + 40 = ₹100. He multiplied only the first item — the classic incomplete distribution — leaving the pens almost free.', outcome: 'This applies a(b+c) = ab+ac correctly: the outside multiplier hits every term inside, which is why both methods of pricing the kits must agree.' },
                { text: 'The calculation is right — brackets mean multiply by the first term and then add the rest.', outcome: 'Brackets mean the outside factor multiplies the whole sum; touching only the 12 undercounts every kit by ₹32 across five kits.', reveals: 'multiply-first-only' },
                { text: 'It should be 5 + 12 + 8 = 25, since expanding a bracket means adding all the numbers together.', outcome: 'That drops the multiplication entirely — the total must scale with 5 kits, so a sum of the prices cannot describe the bill.', reveals: 'expand-means-add' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch6_4', title: 'The bigger picture',
          caseStudy: { intro: 'Multiply the bundle or multiply each item — same total, different path. a(b + c) = ab + ac is the rule that lets you slice hard multiplication into easy pieces.',
            decisions: [{ prompt: 'What comes next? We Distribute, Yet Things Multiply · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — We Distribute, Yet Things Multiply · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch6_1', difficulty: 'standard',
          question: 'The distributive property of multiplication over addition states that for any.',
          hint: 'Revisit Class 7 distributive property in arithmetic expressions (c7_math_ch02_006) using.',
          misconception: 'Students frequently write \\(a(b + c) = ab + c\\) (forgetting to multiply the outside term by the second inside term).',
          parts: [
                { id: 'a', prompt: 'State the distributive property of multiplication over addition using the variables \\(a\\), \\(b\\), and \\(c\\).', answer: 'The property is \\(a(b + c) = ab + ac\\)',
                  options: ['The property is \\(a(b + c) = ab + ac\\)', 'incomplete distribution'],
                  hint: 'Revisit Class 7 distributive property in arithmetic expressions (c7_math_ch02_006) using area.',
                  misconception: 'Students frequently write \\(a(b + c) = ab + c\\) (forgetting to multiply the outside term by the second inside term) or \\(a(b + c) =.' }
          ],
            remediations: { 'students-frequently-write-a-b': { steps: ['Return to the area model: draw a rectangle with sides \\(a\\) and \\((b+c)\\).', 'Divide it into two rectangles \\(a \\times b\\) and \\(a \\times c\\).', 'Show total area = sum of parts.', 'Use a numerical example with coloured counters: 3 groups of (2 red + 4 blue) counters.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch6_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently write \\(a(b + c) = ab + c\\) (forgetting to multiply the outside term by the second inside term).',
          parts: [
                { id: 'a', prompt: 'A student wrote: \\(5(x + 3) = 5x + 3\\). Is this correct? If not, identify the error and give the correct expansion.', answer: 'Incorrect',
                  options: ['Incorrect', 'it\'s correct because 5 times x is 5x and you just bring down the 3'],
                  hint: 'Revisit Class 7 distributive property in arithmetic expressions (c7_math_ch02_006) using area.',
                  misconception: 'Students frequently write \\(a(b + c) = ab + c\\) (forgetting to multiply the outside term by the second inside term) or \\(a(b + c) =.' }
          ],
            remediations: { 'students-frequently-write-a-b': { steps: ['Return to the area model: draw a rectangle with sides \\(a\\) and \\((b+c)\\).', 'Divide it into two rectangles \\(a \\times b\\) and \\(a \\times c\\).', 'Show total area = sum of parts.', 'Use a numerical example with coloured counters: 3 groups of (2 red + 4 blue) counters.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch6_10', difficulty: 'standard',
          question: 'The distributive property states that multiplying a sum by a number gives the.',
          hint: 'Review the area of rectangles (c6_math_ch08_087) and the distributive property with.',
          misconception: 'Students often treat the negative term in a binomial (e.g., x - 3) as a positive length in the area model, drawing.',
          parts: [
                { id: 'a', prompt: 'What is the algebraic expression for the total area of a rectangle divided into four smaller rectangles with dimensions a × c, a × d, b × c, and b × d?', answer: 'The total area is ac + ad + bc + bd',
                  options: ['The total area is ac + ad + bc + bd', 'ac + bd', 'only the diagonal rectangles matter, missing the cross terms ad and bc'],
                  hint: 'Review the area of rectangles (c6_math_ch08_087) and the distributive property with variables.',
                  misconception: 'Students often treat the negative term in a binomial (e.g., x - 3) as a positive length in the area model, drawing a rectangle of width 3.' }
          ],
            remediations: { 'students-often-treat-the-negative': { steps: ['Have the student first model (x+3)(x+2) with paper strips: cut a rectangle of length x+3 and breadth x+2, then.', 'Next, for (x-3)(x+2), start with an (x+3)(x+2) model, then cut off a 3-by-(x+2) strip and discuss what remains.', 'Guide them to label the removed strip as -3(x+2) = -3x -6.', 'Finally, have them write the expression for the remaining area: (x+3)(x+2) - 3(x+2) = x²+5x+6 -3x-6 = x²+2x.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch6_11', difficulty: 'standard',
          question: 'Applications of algebraic identities involve recognizing algebraic expressions.',
          hint: 'Review the distributive property (c8_math_ch6_1) and the three standard identities.',
          misconception: 'Students often write (2x+3)² = 4x² + 9, completely omitting the middle term 12x.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Applications of algebraic identities involve recognizing algebraic expressions that match',
                  options: ['Applications of algebraic identities involve recognizing algebraic expressions that match', 'The distributive property of multiplication over addition states that for any three', 'The distributive property states that multiplying a sum by a number gives the same result', 'The distributive property of multiplication over addition states that multiplying a sum'],
                  hint: 'Review the distributive property (c8_math_ch6_1) and the three standard identities (c8_math_ch6_7.',
                  misconception: 'Students often write (2x+3)² = 4x² + 9, completely omitting the middle term 12x.' }
          ],
            remediations: { 'students-often-write-2x-3': { steps: ['Go back to the area model: draw a square of side (2x+3), partition it into four rectangles (2x×2x, 2x×3, 3×2x, 3×3).', 'Compute each area: 4x², 6x, 6x, 9.', 'Point out the two 6x rectangles are the missing middle term.', 'Practice with numerical binomials like (10+2)² = 100 + 40 + 4 = 144 to reinforce the pattern before returning.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch6_2', difficulty: 'standard',
          question: 'The distributive property of multiplication over addition states that.',
          hint: 'Revisit c7_math_ch02_006 (Distributive Property in Arithmetic Expressions) for the.',
          misconception: '**Incomplete Distribution with Negative Terms:** Students correctly distribute a positive multiplier (e.g.',
          parts: [
                { id: 'a', prompt: 'State the algebraic rule for expanding \\((x + y) \\times z\\). Write the expanded form without using brackets.', answer: 'The expanded form is \\(xz + yz\\) (or \\(zx + zy\\))',
                  options: ['The expanded form is \\(xz + yz\\) (or \\(zx + zy\\))', 'incomplete distribution'],
                  hint: 'Revisit c7_math_ch02_006 (Distributive Property in Arithmetic Expressions) for the arithmetic.',
                  misconception: '**Incomplete Distribution with Negative Terms:** Students correctly distribute a positive multiplier (e.g., \\(3(x+2)=3x+6\\)) but fail when.' }
          ],
            remediations: { 'incomplete-distribution-with-negative-terms': { steps: ['Revert to arithmetic: Ask the student to compute \\(-2 \\times (3 - 5)\\) numerically.', 'First do bracket: \\(3-5=-2\\), then \\(-2 \\times -2 = 4\\).', 'Now distribute: \\(-2 \\times 3 + (-2) \\times (-5) = -6 + 10 = 4\\).', 'Use the "area model" (rectangle): Draw a rectangle with sides \\(-2\\) and \\((x-5)\\).'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch6_3', difficulty: 'standard',
          question: 'When one factor in a multiplication is increased by 1, the product increases.',
          hint: 'Revisit the distributive property (c8_math_ch6_1 or c7_math_ch02_006) and practice.',
          misconception: 'Students often think increasing a factor by 1 increases the product by 1 (e.g., \\(12 \\times 15 = 180\\), so \\(13 \\times.',
          parts: [
                { id: 'a', prompt: 'State the rule: If we have a product \\(a \\times b\\) and we increase \\(a\\) by 1, by how much does the product increase?', answer: 'The product increases by \\(b\\)',
                  options: ['The product increases by \\(b\\)', 'increases by 1', 'increases by \\(a\\)', 'the increment transfers directly to the product or confuses'],
                  hint: 'Revisit the distributive property (c8_math_ch6_1 or c7_math_ch02_006) and practice expanding.',
                  misconception: 'Students often think increasing a factor by 1 increases the product by 1 (e.g., \\(12 \\times 15 = 180\\), so \\(13 \\times 15 = 181\\)).' },
                { id: 'b', prompt: 'Compare the increase in product when you increase the first factor by 1 versus increasing the second factor by 1 for the product \\(15 \\times 8\\).', answer: 'Increasing 15 by 1: new product = \\(16 \\times 8 = 120 + 8 = 128\\), increase = 8',
                  options: ['Increasing 15 by 1: new product = \\(16 \\times 8 = 120 + 8 = 128\\), increase = 8', 'increasing a factor by 1 increases the product by 1 (e'],
                  hint: 'Revisit the distributive property (c8_math_ch6_1 or c7_math_ch02_006) and practice expanding.',
                  misconception: 'Students often think increasing a factor by 1 increases the product by 1 (e.g., \\(12 \\times 15 = 180\\), so \\(13 \\times 15 = 181\\)).' }
          ],
            remediations: { 'increasing-a-factor-by-1': { steps: ['Draw an area model: a rectangle of length \\(a\\) and breadth \\(b\\) (area \\(ab\\)).', 'Extend the length by 1 unit.', 'The new area is the original rectangle plus a thin strip of dimensions \\(1 \\times b\\).', 'The strip\'s area is \\(b\\).'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch6_4', difficulty: 'standard',
          question: 'Expanding (a + 1)(b + 1) means applying the distributive property twice: each.',
          hint: 'Revisit c8_math_ch6_1 (distributive property) and c7_math_ch04_006 (combining like terms).',
          misconception: 'Students often write (a+1)(b+1) = ab + 1, treating it like (a)(b) + (1)(1) — they multiply the first terms and the last.',
          parts: [
                { id: 'a', prompt: 'Write the expansion of (x + 1)(y + 1) using the distributive property. Do not simplify.', answer: '(x + 1)(y + 1) = x(y + 1) + 1(y + 1) = xy + x + y + 1',
                  options: ['(x + 1)(y + 1) = x(y + 1) + 1(y + 1) = xy + x + y + 1', 'only the first terms multiply and the 1\'s multiply, missing the cross terms'],
                  hint: 'Revisit c8_math_ch6_1 (distributive property) and c7_math_ch04_006 (combining like terms) with.',
                  misconception: 'Students often write (a+1)(b+1) = ab + 1, treating it like (a)(b) + (1)(1) — they multiply the first terms and the last terms but.' }
          ],
            remediations: { 'students-often-write-a-1': { steps: ['If a student writes ab+1, stop and ask: "What does (a+1)(b+1) mean?', 'It means (a+1) multiplied by the WHOLE of (b+1)." Write it as (a+1) × (b+1).', 'Now say: "First, multiply a by the whole (b+1) — what do you get?" (ab + a).', '"Now multiply 1 by the whole (b+1) — what do you get?" (b + 1).'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
