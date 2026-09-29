import type { SimDef } from '../../engine/types';
import C8_MathematicsWeDistributeYetThingsMultiplySim from '../../../simulations/c6_12/C8_MathematicsWeDistributeYetThingsMultiplySim';

/** v3 wrapped master — C8_MathematicsWeDistributeYetThingsMultiplySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_mathematicswedistributeyetthingsmultiplysim: SimDef = {
    id: 'v3w_c8_mathematicswedistributeyetthingsmultiplysim',
    title: 'Distributive Property of Multiplication Over Addition',
    subtitle: 'This node covers the distributive property in the form \\(a(b + c) = ab + ac\\) for all.',
    classLevel: 8, subject: 'mathematics', topic: 'Distributive Property of Multiplication Over Addition',
    chapters: [],
    nodeIds: ['c8_math_ch6_1', 'c8_math_ch6_10', 'c8_math_ch6_2', 'c8_math_ch6_4', 'c8_math_ch6_6'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine you are buying supplies for your classroom: each student needs 1 notebook (₹12) and 1 pen (₹8).', goal: 'Master Distributive Property of Multiplication Over Addition.' },
    discovery: {
        question: 'What is the algebraic expression for the total area of a rectangle divided into four smaller rectangles with dimensions a × c, a × d, b × c, and b × d?',
        options: ['The total area is ac + ad + bc + bd', 'ac + bd', 'only the diagonal rectangles matter, missing the cross terms ad and bc'],
        answer: 'The total area is ac + ad + bc + bd',
        hook: 'Students often treat the negative term in a binomial (e.g., x - 3) as a positive length in the area model, drawing a.',
    },
    teaching: [
        { title: 'The distributive property of multiplication.', text: 'The distributive property of multiplication over addition states that for any three numbers \\(a\\), \\(b\\), and \\(c\\) (integers, fractions, decimals, or algebraic terms), multiplying \\(a\\) by the sum.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_math_ch6_1', title: 'The distributive property of.',
          scaffold: { problem: 'A school orders 15 boxes of pencils. Each box contains 12 red pencils and 8 blue pencils.',
            steps: [
            { text: 'Identify the multiplier (number of boxes = 15) and the addends inside the bracket (red pencils per box = 12, blue.' },
            { text: 'Write the expression for total pencils using the sum first: \\(15 \\times (12 + 8)\\).' },
            { text: 'Apply distributive property: \\(15 \\times 12 + 15 \\times 8\\).' },
            { text: 'Compute each product: \\(15 \\times 12 = 180\\) (since \\(10 \\times 12 = 120\\) and \\(5 \\times 12 = 60\\), sum = 180).' },
            { text: 'Add the partial products: \\(180 + 120 = 300\\). Verify with sum-first method: \\(12+8=20\\), \\(15 \\times 20 = 300\\).', faded: true, blankAnswer: '300 pencils' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch6_10', title: 'The distributive property states that.',
          scaffold: { problem: 'A school garden has a rectangular plot. The length is (x + 4) metres and the breadth is (x + 6) metres.',
            steps: [
            { text: 'Identify the given dimensions: length = (x + 4) m, breadth = (x + 6) m. We need the area = length × breadth.' },
            { text: 'Draw a rectangle. Split the length into two segments: x and 4. Split the breadth into two segments: x and 6.' },
            { text: 'Label each sub-rectangle with its dimensions and compute its area:' },
            { text: 'Add the areas of all four sub-rectangles: x² + 6x + 4x + 24 = x² + 10x + 24.' },
            { text: 'Interpret the result: The total area of the garden is (x² + 10x + 24) square metres.', faded: true, blankAnswer: 'x² + 10x + 24 m²' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch6_2', title: 'The distributive property of.',
          scaffold: { problem: 'A school orders uniform cloth for Class 8. Each student needs \\(2.5\\) metres of shirt cloth (cost ₹\\(x\\) per metre) and \\(1.2\\) metres of.',
            steps: [
            { text: 'Identify the cost per student: Shirt cloth cost = \\(2.5 \\times x = 2.5x\\), Trouser cloth cost = \\(1.2 \\times y =.' },
            { text: 'Identify the multiplier: Number of students \\(c = 40\\). Total cost expression = \\(40 \\times (2.5x + 1.2y)\\).' },
            { text: 'Apply distributive property: Multiply \\(40\\) by each term inside the bracket: \\(40 \\times 2.5x + 40 \\times 1.2y\\).' },
            { text: 'Compute the coefficients: \\(40 \\times 2.5 = 100\\), so first term is \\(100x\\).' },
            { text: 'Write final expanded expression: \\(100x + 48y\\) rupees. Verify: If \\(x=100, y=150\\), per student = \\(250+180=430\\),.', faded: true, blankAnswer: '\\(100x + 48y\\) rupees' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch6_4', title: 'Expanding (a + 1)(b + 1) means applying.',
          scaffold: { problem: 'A rectangular plot has length (x + 1) metres and breadth (y + 1) metres.',
            steps: [
            { text: 'Identify the given expressions: length = (x + 1) m, breadth = (y + 1) m. Area = length × breadth = (x + 1)(y + 1).' },
            { text: 'Apply distributive property: (x + 1)(y + 1) = x(y + 1) + 1(y + 1).' },
            { text: 'Distribute each term: x(y + 1) = xy + x; 1(y + 1) = y + 1.' },
            { text: 'Combine all terms: xy + x + y + 1. This is the expanded algebraic expression for area.' },
            { text: 'Substitute x = 10, y = 5 into expanded form: (10)(5) + 10 + 5 + 1 = 50 + 10 + 5 + 1 = 66 sq m.', faded: true, blankAnswer: 'Area = xy + x + y + 1 sq m; for x=10, y=5, area = 66 sq m.' }
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
        { type: 'dissect', nodeId: 'c8_math_ch6_10', title: 'Identify each idea',
          dissect: { specimen: 'Distributive Property of Multiplication Over Addition', spots: [
            { id: 's1', label: 'The distributive property of multiplication', prompt: 'Which idea is this? — The distributive property of multiplication over addition states that for any three.', answer: 'The distributive property of multiplication', options: ['The distributive property of multiplication', 'The distributive property states that', 'Expanding a 1b'] },
            { id: 's2', label: 'The distributive property states that', prompt: 'Which idea is this? — The distributive property states that multiplying a sum by a number gives the same result.', answer: 'The distributive property states that', options: ['The distributive property states that', 'The distributive property of multiplication', 'Expanding a 1b'] },
            { id: 's3', label: 'Expanding a 1b', prompt: 'Which idea is this? — Expanding (a + 1)(b + 1) means applying the distributive property twice: each term in the.', answer: 'Expanding a 1b', options: ['Expanding a 1b', 'The distributive property of multiplication', 'The distributive property states that'] }
          ] } }
    ],
    explore: { component: C8_MathematicsWeDistributeYetThingsMultiplySim, prompt: 'Explore the interactive — Distributive Property of Multiplication Over Addition' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch6_1', difficulty: 'standard',
          question: 'The distributive property of multiplication over addition states that for any.',
          hint: 'Revisit Class 7 distributive property in arithmetic expressions (c7_math_ch02_006) using.',
          misconception: 'Students frequently write \\(a(b + c) = ab + c\\) (forgetting to multiply the outside term by the second inside term) or.',
          parts: [
                { id: 'a', prompt: 'State the distributive property of multiplication over addition using the variables \\(a\\), \\(b\\), and \\(c\\).', answer: 'The property is \\(a(b + c) = ab + ac\\)',
                  options: ['The property is \\(a(b + c) = ab + ac\\)', 'incomplete distribution'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently write \\(a(b + c) = ab + c\\) (forgetting to multiply the outside term by the second inside term) or \\(a(b + c) = ab +.' }
          ],
            remediations: { 'students-frequently-write-a-b': { steps: ['Return to the area model: draw a rectangle with sides \\(a\\) and \\((b+c)\\).', 'Divide it into two rectangles \\(a \\times b\\) and \\(a \\times c\\).', 'Show total area = sum of parts.', 'Use a numerical example with coloured counters: 3 groups of (2 red + 4 blue) counters.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch6_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently write \\(a(b + c) = ab + c\\) (forgetting to multiply the outside term by the second inside term) or.',
          parts: [
                { id: 'a', prompt: 'A student wrote: \\(5(x + 3) = 5x + 3\\). Is this correct? If not, identify the error and give the correct expansion.', answer: 'Incorrect',
                  options: ['Incorrect', 'it\'s correct because 5 times x is 5x and you just bring down the 3'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently write \\(a(b + c) = ab + c\\) (forgetting to multiply the outside term by the second inside term) or \\(a(b + c) = ab +.' }
          ],
            remediations: { 'students-frequently-write-a-b': { steps: ['Return to the area model: draw a rectangle with sides \\(a\\) and \\((b+c)\\).', 'Divide it into two rectangles \\(a \\times b\\) and \\(a \\times c\\).', 'Show total area = sum of parts.', 'Use a numerical example with coloured counters: 3 groups of (2 red + 4 blue) counters.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch6_10', difficulty: 'standard',
          question: 'The distributive property states that multiplying a sum by a number gives the.',
          hint: 'Review the area of rectangles (c6_math_ch08_087) and the distributive property with.',
          misconception: 'Students often treat the negative term in a binomial (e.g., x - 3) as a positive length in the area model, drawing a.',
          parts: [
                { id: 'a', prompt: 'What is the algebraic expression for the total area of a rectangle divided into four smaller rectangles with dimensions a × c, a × d, b × c, and b × d?', answer: 'The total area is ac + ad + bc + bd',
                  options: ['The total area is ac + ad + bc + bd', 'ac + bd', 'only the diagonal rectangles matter, missing the cross terms ad and bc'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the negative term in a binomial (e.g., x - 3) as a positive length in the area model, drawing a rectangle of width 3.' }
          ],
            remediations: { 'students-often-treat-the-negative': { steps: ['Have the student first model (x+3)(x+2) with paper strips: cut a rectangle of length x+3 and breadth x+2, then.', 'Next, for (x-3)(x+2), start with an (x+3)(x+2) model, then cut off a 3-by-(x+2) strip and discuss what remains.', 'Guide them to label the removed strip as -3(x+2) = -3x -6.', 'Finally, have them write the expression for the remaining area: (x+3)(x+2) - 3(x+2) = x²+5x+6 -3x-6 = x²+2x.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch6_2', difficulty: 'standard',
          question: 'The distributive property of multiplication over addition states that.',
          hint: 'Revisit c7_math_ch02_006 (Distributive Property in Arithmetic Expressions) for the.',
          misconception: '**Incomplete Distribution with Negative Terms:** Students correctly distribute a positive multiplier (e.g.,.',
          parts: [
                { id: 'a', prompt: 'State the algebraic rule for expanding \\((x + y) \\times z\\). Write the expanded form without using brackets.', answer: 'The expanded form is \\(xz + yz\\) (or \\(zx + zy\\))',
                  options: ['The expanded form is \\(xz + yz\\) (or \\(zx + zy\\))', 'incomplete distribution'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Incomplete Distribution with Negative Terms:** Students correctly distribute a positive multiplier (e.g., \\(3(x+2)=3x+6\\)) but fail when.' }
          ],
            remediations: { 'incomplete-distribution-with-negative-terms': { steps: ['Revert to arithmetic: Ask the student to compute \\(-2 \\times (3 - 5)\\) numerically.', 'First do bracket: \\(3-5=-2\\), then \\(-2 \\times -2 = 4\\).', 'Now distribute: \\(-2 \\times 3 + (-2) \\times (-5) = -6 + 10 = 4\\).', 'Use the "area model" (rectangle): Draw a rectangle with sides \\(-2\\) and \\((x-5)\\).'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch6_4', difficulty: 'standard',
          question: 'Expanding (a + 1)(b + 1) means applying the distributive property twice: each.',
          hint: 'Revisit c8_math_ch6_1 (distributive property) and c7_math_ch04_006 (combining like terms).',
          misconception: 'Students often write (a+1)(b+1) = ab + 1, treating it like (a)(b) + (1)(1) — they multiply the first terms and the last.',
          parts: [
                { id: 'a', prompt: 'Write the expansion of (x + 1)(y + 1) using the distributive property. Do not simplify.', answer: '(x + 1)(y + 1) = x(y + 1) + 1(y + 1) = xy + x + y + 1',
                  options: ['(x + 1)(y + 1) = x(y + 1) + 1(y + 1) = xy + x + y + 1', 'only the first terms multiply and the 1\'s multiply, missing the cross terms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write (a+1)(b+1) = ab + 1, treating it like (a)(b) + (1)(1) — they multiply the first terms and the last terms but.' }
          ],
            remediations: { 'students-often-write-a-1': { steps: ['If a student writes ab+1, stop and ask: "What does (a+1)(b+1) mean?', 'It means (a+1) multiplied by the WHOLE of (b+1)." Write it as (a+1) × (b+1).', 'Now say: "First, multiply a by the whole (b+1) — what do you get?" (ab + a).', '"Now multiply 1 by the whole (b+1) — what do you get?" (b + 1).'] } } },
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
            remediations: { 'students-often-forget-to-multiply': { steps: ['If a student makes this error, first have them rewrite the expression inside the bracket using only addition: \\(4 - 5 =.', 'Then apply the distributive property to \\(-3(4 + (-5))\\).', 'Explicitly multiply \\(-3\\) by each term: \\((-3 \\times 4) + (-3 \\times -5)\\).', 'Use a two-color pen or highlighter: one color for the multiplier outside, another for each term inside.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
