import type { SimDef } from '../../engine/types';
import C8_MathematicsFactorisationsimpleCasesSim from '../../../simulations/c6_12/C8_MathematicsFactorisationsimpleCasesSim';

/** v3 wrapped master — C8_MathematicsFactorisationsimpleCasesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_mathematicsfactorisationsimplecasessim: SimDef = {
    id: 'v3w_c8_mathematicsfactorisationsimplecasessim',
    title: 'Factorisationsimple Cases',
    subtitle: 'This node covers integer bases that are negative and positive integer exponents only.',
    classLevel: 8, subject: 'mathematics', topic: 'Exponents with Negative Bases: Sign Rules',
    chapters: [],
    nodeIds: ['c8_math_ch2_11', 'c8_math_ch2_8', 'c8_math_ch9_4', 'c8_math_ch6_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine a video game where your character has a "power level" that starts at \\(-2\\) points.', goal: 'Master Factorisationsimple Cases.' },
    discovery: {
        question: 'What is the sign of \\((-7)^{12}\\)? Explain your reasoning in one sentence without calculating the actual value.',
        options: ['Positive', 'negative', 'negative base always gives negative result'],
        answer: 'Positive',
        hook: 'Students frequently confuse \\((-a)^n\\) with \\(-a^n\\). For example, they evaluate \\((-3)^2\\) as \\(-9\\) (treating it as.',
    },
    teaching: [
        { title: 'For a negative base \\(-a\\) (where \\(a > 0\\)).', text: 'For a negative base \\(-a\\) (where \\(a > 0\\)) raised to a positive integer exponent \\(n\\), the sign of the result is determined by the parity of \\(n\\): \\((-a)^n = a^n\\) if \\(n\\) is even, and \\((-a)^n.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_math_ch2_11', title: 'For a negative base \\(-a\\) (where \\(a >.',
          scaffold: { problem: 'In a science experiment, a chemical reaction causes the temperature change in a beaker to be modeled by \\((-4)^n\\) degrees Celsius, where.',
            steps: [
            { text: 'Identify the base and exponents. Base = -4, exponents = 3 and 4.' },
            { text: 'Recall the sign rule: negative base raised to an odd exponent gives a negative result; raised to an even exponent gives.' },
            { text: 'Evaluate \\((-4)^3\\). Exponent 3 is odd → result is negative. Compute magnitude: \\(4^3 = 4 \\times 4 \\times 4 = 64\\).' },
            { text: 'Evaluate \\((-4)^4\\). Exponent 4 is even → result is positive. Compute magnitude: \\(4^4 = 4 \\times 4 \\times 4 \\times 4 =.' },
            { text: 'Interpret: After 3 minutes, the temperature drops by 64°C (negative change).', faded: true, blankAnswer: 'After 3 minutes: \\(-64^\\circ\\text{C}\\) (temperature drops)..' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch2_8', title: 'When dividing two powers with the same.',
          scaffold: { problem: 'A bacteria culture starts with \\(3^8\\) cells. After an antibiotic treatment, the number of cells reduces to \\(3^5\\).',
            steps: [
            { text: 'Identify the initial amount = \\(3^8\\) and final amount = \\(3^5\\).' },
            { text: 'Recognise the same base (3) and apply the quotient rule: \\(a^m \\div a^n = a^{m-n}\\).' },
            { text: 'Subtract the exponents: \\(8 - 5 = 3\\).' },
            { text: 'Write the result: \\(3^3\\).' },
            { text: 'Verify by expanding: \\(3^8 = 6561\\), \\(3^5 = 243\\), \\(6561 \\div 243 = 27 = 3^3\\). The factor is \\(3^3\\) (or 27 times).', faded: true, blankAnswer: '\\(3^3\\) (or 27 times)' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch9_4', title: 'In an isosceles right triangle, the two.',
          scaffold: { problem: 'A square sheet of aluminium foil has a side length of 15 cm. It is cut along its diagonal to make two identical triangular pieces.',
            steps: [
            { text: 'Identify the triangle formed. Cutting a square along its diagonal produces two isosceles right triangles.' },
            { text: 'Recall the relationship for an isosceles right triangle: hypotenuse = leg \\(\\times \\sqrt{2}\\), i.e., \\(h = a\\sqrt{2}\\).' },
            { text: 'Substitute the given leg length: \\(h = 15 \\times \\sqrt{2} = 15\\sqrt{2}\\) cm. This is the exact answer.' },
            { text: 'Compute the approximate decimal value using \\(\\sqrt{2} \\approx 1.414\\): \\(h \\approx 15 \\times 1.414 = 21.21\\) cm.' },
            { text: 'Verify by checking area of squares: Square on leg = \\(15^2 = 225\\) cm². Two such squares = 450 cm².', faded: true, blankAnswer: 'Exact: \\(15\\sqrt{2}\\) cm. Approximate: 21.21 cm.' }
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
        { type: 'dissect', nodeId: 'c8_math_ch2_8', title: 'Identify each idea',
          dissect: { specimen: 'Factorisationsimple Cases', spots: [
            { id: 's1', label: 'For a negative base -a', prompt: 'Which idea is this? — For a negative base \\(-a\\) (where \\(a > 0\\)) raised to a positive integer exponent \\(n\\),.', answer: 'For a negative base -a', options: ['For a negative base -a', 'When dividing two powers with', 'In an isosceles right triangle', 'Expanding a 1b'] },
            { id: 's2', label: 'When dividing two powers with', prompt: 'Which idea is this? — When dividing two powers with the same non-zero base, keep the base and subtract the.', answer: 'When dividing two powers with', options: ['When dividing two powers with', 'For a negative base -a', 'In an isosceles right triangle', 'Expanding a 1b'] },
            { id: 's3', label: 'In an isosceles right triangle', prompt: 'Which idea is this? — In an isosceles right triangle, the two legs (sides forming the right angle) are equal in.', answer: 'In an isosceles right triangle', options: ['In an isosceles right triangle', 'For a negative base -a', 'When dividing two powers with', 'Expanding a 1b'] },
            { id: 's4', label: 'Expanding a 1b', prompt: 'Which idea is this? — Expanding (a + 1)(b + 1) means applying the distributive property twice: each term in the.', answer: 'Expanding a 1b', options: ['Expanding a 1b', 'For a negative base -a', 'When dividing two powers with', 'In an isosceles right triangle'] }
          ] } }
    ],
    explore: { component: C8_MathematicsFactorisationsimpleCasesSim, prompt: 'Explore the interactive — Factorisationsimple Cases' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch2_11', difficulty: 'standard',
          question: 'For a negative base \\(-a\\) (where \\(a > 0\\)) raised to a positive integer.',
          hint: 'Revisit Class 7 Chapter 10 (Integers), specifically the nodes on multiplication sign.',
          misconception: 'Students frequently confuse \\((-a)^n\\) with \\(-a^n\\). For example, they evaluate \\((-3)^2\\) as \\(-9\\) (treating it as.',
          parts: [
                { id: 'a', prompt: 'What is the sign of \\((-7)^{12}\\)? Explain your reasoning in one sentence without calculating the actual value.', answer: 'Positive',
                  options: ['Positive', 'negative', 'negative base always gives negative result'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse \\((-a)^n\\) with \\(-a^n\\). For example, they evaluate \\((-3)^2\\) as \\(-9\\) (treating it as \\(-(3^2)\\)) instead.' }
          ],
            remediations: { 'students-frequently-confuse-a-n': { steps: ['If a student writes \\((-3)^2 = -9\\), immediately ask: "What does the exponent 2 mean?', 'Write it out as multiplication." Guide them to write \\((-3) \\times (-3)\\).', 'Then ask: "What is negative times negative?" (Positive).', '"So what is the answer?" (+9).'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch2_11', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently confuse \\((-a)^n\\) with \\(-a^n\\). For example, they evaluate \\((-3)^2\\) as \\(-9\\) (treating it as.',
          parts: [
                { id: 'a', prompt: 'A student claims: "\\((-4)^3 = -12\\) because you multiply the base by the exponent: \\(-4 \\times 3 = -12\\)." Identify the error and explain the correct method to.', answer: 'The error is confusing exponentiation with multiplication',
                  options: ['The error is confusing exponentiation with multiplication', 'the student forgot the negative sign', 'base × exponent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse \\((-a)^n\\) with \\(-a^n\\). For example, they evaluate \\((-3)^2\\) as \\(-9\\) (treating it as \\(-(3^2)\\)) instead.' }
          ],
            remediations: { 'students-frequently-confuse-a-n': { steps: ['If a student writes \\((-3)^2 = -9\\), immediately ask: "What does the exponent 2 mean?', 'Write it out as multiplication." Guide them to write \\((-3) \\times (-3)\\).', 'Then ask: "What is negative times negative?" (Positive).', '"So what is the answer?" (+9).'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch2_8', difficulty: 'standard',
          question: 'When dividing two powers with the same non-zero base, keep the base and.',
          hint: 'Revisit expanding powers and cancelling common factors in numerical fractions (Class 6.',
          misconception: 'Students often divide the exponents instead of subtracting them when applying the quotient rule.',
          parts: [
                { id: 'a', prompt: 'State the rule for dividing powers with the same base using the formula \\(a^m \\div a^n\\). What condition must be true about the base \\(a\\)?', answer: 'The rule is \\(a^m \\div a^n = a^{m-n}\\) for \\(a \\neq 0\\)',
                  options: ['The rule is \\(a^m \\div a^n = a^{m-n}\\) for \\(a \\neq 0\\)', 'division of powers means divide the exponents', '"division of powers means divide the exponents"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often divide the exponents instead of subtracting them when applying the quotient rule.' },
                { id: 'b', prompt: 'Simplify: \\( \\frac{7^{10}}{7^4} \\times 7^2 \\). Show all steps.', answer: 'Step 1: Apply quotient rule: \\(7^{10} \\div 7^4 = 7^{10-4} = 7^6\\)',
                  options: ['Step 1: Apply quotient rule: \\(7^{10} \\div 7^4 = 7^{10-4} = 7^6\\)', 'division of powers means divide the exponents', '"division of powers means divide the exponents"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often divide the exponents instead of subtracting them when applying the quotient rule.' },
                { id: 'c', prompt: 'Compare the results of \\( \\frac{2^8}{2^5} \\) and \\( \\frac{2^5}{2^8} \\). What do you notice about the exponents in the answers?', answer: '\\( \\frac{2^8}{2^5} = 2^{3} = 8 \\)',
                  options: ['\\( \\frac{2^8}{2^5} = 2^{3} = 8 \\)', 'undefined', 'division of powers means divide the exponents'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often divide the exponents instead of subtracting them when applying the quotient rule.' }
          ],
            remediations: { 'students-often-divide-the-exponents': { steps: ['Write the division in expanded form: \\( \\frac{5^8}{5^2} = \\frac{5 \\times 5 \\times 5 \\times 5 \\times 5 \\times 5 \\times 5.', 'Cancel the two 5\'s in the denominator with two 5\'s in the numerator.', 'Count the remaining 5\'s: there are 6.', 'Ask the student: "Did we divide the exponents 8 and 2?'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch2_8', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often divide the exponents instead of subtracting them when applying the quotient rule.',
          parts: [
                { id: 'a', prompt: 'A student simplified \\( \\frac{3^9}{3^3} \\) as \\( 3^3 \\). Is this correct? If not, identify the error and give the correct simplification.', answer: 'The student is incorrect',
                  options: ['The student is incorrect', 'division of powers means divide the exponents', '"division of powers means divide the exponents"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often divide the exponents instead of subtracting them when applying the quotient rule.' },
                { id: 'b', prompt: 'Create a real-life word problem (using rupees, metres, or litres) that requires using the rule \\(a^m \\div a^n = a^{m-n}\\) to solve.', answer: 'Example problem: "A water tank holds \\(10^6\\) litres of water',
                  options: ['Example problem: "A water tank holds \\(10^6\\) litres of water', 'division of powers means divide the exponents', '"division of powers means divide the exponents"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often divide the exponents instead of subtracting them when applying the quotient rule.' }
          ],
            remediations: { 'students-often-divide-the-exponents': { steps: ['Write the division in expanded form: \\( \\frac{5^8}{5^2} = \\frac{5 \\times 5 \\times 5 \\times 5 \\times 5 \\times 5 \\times 5.', 'Cancel the two 5\'s in the denominator with two 5\'s in the numerator.', 'Count the remaining 5\'s: there are 6.', 'Ask the student: "Did we divide the exponents 8 and 2?'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch9_4', difficulty: 'standard',
          question: 'In an isosceles right triangle, the two legs (sides forming the right angle).',
          hint: 'Revisit the geometric construction of "doubling a square" (c8_math_ch9_1) by folding or.',
          misconception: 'Students often confuse the linear scale factor with the area scale factor.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In an isosceles right triangle, the two legs (sides forming the right angle) are equal in',
                  options: ['In an isosceles right triangle, the two legs (sides forming the right angle) are equal in', 'For a negative base \\(-a\\) (where \\(a > 0\\)) raised to a positive integer exponent \\(n\\),', 'When dividing two powers with the same non-zero base, keep the base and subtract the', 'Expanding (a + 1)(b + 1) means applying the distributive property twice: each term in the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the linear scale factor with the area scale factor.' }
          ],
            remediations: { 'students-often-confuse-the-linear': { steps: ['If a student adds the legs, guide them through a concrete area comparison: 1.', 'Draw a 5 cm leg and construct a square on it (area 25 cm²).', 'Draw the second equal leg and its square (another 25 cm²).', 'Combine the two squares to form a larger square of area 50 cm².'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch9_4', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the linear scale factor with the area scale factor.',
          parts: [
                { id: 'a', prompt: 'A student solves this problem: "The hypotenuse of an isosceles right triangle is \\(10\\sqrt{2}\\) cm.', answer: 'Yes, the solution is correct',
                  options: ['Yes, the solution is correct', 'cancel'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the linear scale factor with the area scale factor.' }
          ],
            remediations: { 'students-often-confuse-the-linear': { steps: ['If a student adds the legs, guide them through a concrete area comparison: 1.', 'Draw a 5 cm leg and construct a square on it (area 25 cm²).', 'Draw the second equal leg and its square (another 25 cm²).', 'Combine the two squares to form a larger square of area 50 cm².'] } } },
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
            remediations: { 'students-often-write-a-1': { steps: ['If a student writes ab+1, stop and ask: "What does (a+1)(b+1) mean?', 'It means (a+1) multiplied by the WHOLE of (b+1)." Write it as (a+1) × (b+1).', 'Now say: "First, multiply a by the whole (b+1) — what do you get?" (ab + a).', '"Now multiply 1 by the whole (b+1) — what do you get?" (b + 1).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
