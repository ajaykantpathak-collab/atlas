import type { SimDef } from '../../engine/types';
import C8_MathematicsPropertiesRationalNumbersSim from '../../../simulations/c6_12/C8_MathematicsPropertiesRationalNumbersSim';

/** v3 wrapped master — C8_MathematicsPropertiesRationalNumbersSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_mathematicspropertiesrationalnumberssim: SimDef = {
    id: 'v3w_c8_mathematicspropertiesrationalnumberssim',
    title: 'Properties Rational Numbers',
    subtitle: 'Covers multiplication of powers with the same base where the base is a non-zero integer.',
    classLevel: 8, subject: 'mathematics', topic: 'Multiplying Powers with the Same Base: am x an = am+n',
    chapters: [],
    nodeIds: ['c8_math_ch2_7', 'c8_math_ch13_5', 'c8_math_ch13_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine you are folding a paper: each fold doubles the layers.', goal: 'Master Properties Rational Numbers.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'When multiplying two powers with the same.', text: 'When multiplying two powers with the same base, we keep the base unchanged and add the exponents. For any non-zero integer \\(a\\) and positive integers \\(m\\) and \\(n\\), \\(a^m \\times a^n = a^{m+n}\\).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_math_ch2_7', title: 'When multiplying two powers with the.',
          scaffold: { problem: 'A school\'s science club starts with 3 members. Each week, every member recruits 3 new members.',
            steps: [
            { text: 'Identify the two quantities: recruits after 2 weeks = \\(3^2\\), recruits after next 3 weeks = \\(3^3\\).' },
            { text: 'We need total new recruits = \\(3^2 \\times 3^3\\) (since each week\'s recruits multiply the previous total?' },
            { text: 'Apply the rule: same base 3, add exponents: \\(3^{2+3} = 3^5\\).' },
            { text: 'Evaluate \\(3^5 = 3 \\times 3 \\times 3 \\times 3 \\times 3 = 243\\).' },
            { text: 'State answer: Total new recruits = 243, expressed as \\(3^5\\).', faded: true, blankAnswer: '\\(3^5 = 243\\) new recruits.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch13_5', title: 'An algebraic expression is a.',
          scaffold: { problem: 'Ravi\'s mother gives him ₹50 for school supplies. He buys x notebooks at ₹12 each, y pens at ₹5 each, and a geometry box for ₹15.',
            steps: [
            { text: 'Identify the total money Ravi starts with: ₹50 (this will be the constant term in the final expression).' },
            { text: 'Write the cost of each item as a term: notebooks cost 12x, pens cost 5y, geometry box costs 15.' },
            { text: 'Total money spent = 12x + 5y + 15. This is an expression with three terms: 12x (coefficient 12, variable part x), 5y.' },
            { text: 'Money left = 50 - (12x + 5y + 15) = 50 - 12x - 5y - 15 = -12x - 5y + 35.' },
            { text: 'Verify: if x=2, y=3, spent = 24+15+15=54, but he only has 50 – expression gives -24-15+35 = -4, meaning he is short ₹4.', faded: true, blankAnswer: 'Expression: -12x - 5y + 35. Terms: -12x (coeff. -12, var..' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch13_9', title: 'The transposition method is a technique.',
          scaffold: { problem: 'Riya bought 4 identical pens and a ₹15 notebook for ₹95. Find the cost of one pen.',
            steps: [
            { text: 'Let the cost of one pen be x rupees. Total cost: 4x + 15 = 95.' },
            { text: 'Transpose the constant +15 to RHS (changes to -15): 4x = 95 - 15.' },
            { text: 'Simplify RHS: 4x = 80.' },
            { text: 'Transpose the coefficient 4 (division becomes multiplication on other side): x = 80 / 4.' },
            { text: 'Compute: x = 20. Verify: 4(20) + 15 = 80 + 15 = 95.', faded: true, blankAnswer: '₹20 per pen' }
            ] } },
        { type: 'dissect', nodeId: 'c8_math_ch13_5', title: 'Identify each idea',
          dissect: { specimen: 'Properties Rational Numbers', spots: [
            { id: 's1', label: 'When multiplying two powers with', prompt: 'Which idea is this? — When multiplying two powers with the same base, we keep the base unchanged and add the.', answer: 'When multiplying two powers with', options: ['When multiplying two powers with', 'An algebraic expression is a', 'The transposition method is a'] },
            { id: 's2', label: 'An algebraic expression is a', prompt: 'Which idea is this? — An algebraic expression is a combination of variables, constants, and arithmetic.', answer: 'An algebraic expression is a', options: ['An algebraic expression is a', 'When multiplying two powers with', 'The transposition method is a'] },
            { id: 's3', label: 'The transposition method is a', prompt: 'Which idea is this? — The transposition method is a technique for solving linear equations in one variable.', answer: 'The transposition method is a', options: ['The transposition method is a', 'When multiplying two powers with', 'An algebraic expression is a'] }
          ] } }
    ],
    explore: { component: C8_MathematicsPropertiesRationalNumbersSim, prompt: 'Explore the interactive — Properties Rational Numbers' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch2_7', difficulty: 'standard',
          question: 'When multiplying two powers with the same base, we keep the base unchanged and.',
          hint: 'If stuck, revisit c8_math_ch2_3 (Exponential Notation: Base and Exponent) and practice.',
          misconception: 'Students often multiply the bases and add the exponents, writing \\(a^m \\times a^n = (a \\times a)^{m+n} = a^{2(m+n)}\\).',
          parts: [
                { id: 'a', prompt: 'State the rule for multiplying \\(x^5 \\times x^3\\). Write the simplified form.', answer: 'The rule: \\(x^5 \\times x^3 = x^{5+3} = x^8\\)',
                  options: ['The rule: \\(x^5 \\times x^3 = x^{5+3} = x^8\\)', 'the coefficient becomes 2'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often multiply the bases and add the exponents, writing \\(a^m \\times a^n = (a \\times a)^{m+n} = a^{2(m+n)}\\).' },
                { id: 'b', prompt: 'Explain why \\(5^2 \\times 5^4 = 5^6\\) by writing out the repeated multiplication. Why can\'t we use this rule for \\(5^2 \\times 3^4\\)?', answer: '\\(5^2 = 5 \\times 5\\), \\(5^4 = 5 \\times 5 \\times 5 \\times 5\\)',
                  options: ['\\(5^2 = 5 \\times 5\\), \\(5^4 = 5 \\times 5 \\times 5 \\times 5\\)', 'add exponents anyway'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often multiply the bases and add the exponents, writing \\(a^m \\times a^n = (a \\times a)^{m+n} = a^{2(m+n)}\\).' }
          ],
            remediations: { 'students-often-multiply-the-bases': { steps: ['Have the student expand both powers: \\(2^3 = 2 \\times 2 \\times 2\\), \\(2^4 = 2 \\times 2 \\times 2 \\times 2\\).', 'Ask: "How many 2s are there in total?" Count together: 7.', 'Contrast with \\(2^3 \\times 3^4\\): expand to show bases differ, cannot combine.', 'Practice with 5 similar numerical examples, then algebraic, emphasizing "base stays, exponents add".'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch13_5', difficulty: 'standard',
          question: 'An algebraic expression is a combination of variables, constants, and.',
          hint: 'Revisit c7_math_ch04_002 (Algebraic Expressions: Terms, Coefficients and Constants) and.',
          misconception: 'Students often treat the coefficient as only the number written in front of the variable, ignoring the sign.',
          parts: [
                { id: 'a', prompt: 'In the expression \\(4x^2y - \\frac{3}{2}xy^2 + 7x - 9\\), list all the terms and state the coefficient of each term.', answer: 'The terms are: \\(4x^2y\\) (coefficient 4), \\(-\\frac{3}{2}xy^2\\) (coefficient',
                  options: ['The terms are: \\(4x^2y\\) (coefficient 4), \\(-\\frac{3}{2}xy^2\\) (coefficient', '4, -3/2, 7, -9'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the coefficient as only the number written in front of the variable, ignoring the sign.' }
          ],
            remediations: { 'students-often-treat-the-coefficient': { steps: ['Have the student rewrite the expression with explicit plus signs: \\(-4x^2 + 3x + (-5)\\).', 'Circle each term including its sign.', 'For each circled term, cover the variable part and ask "what number is multiplying the variable?" – that is the.', 'For the constant term, explain that it is a term with variable part \\(x^0 = 1\\), so its coefficient is the number.', 'Practice with 5 expressions containing negative coefficients, fractional coefficients, and multiple variables until the.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch13_9', difficulty: 'standard',
          question: 'The transposition method is a technique for solving linear equations in one.',
          hint: 'Revisit c8_math_ch13_8 (Balancing Method) and practice the phrase "subtract 3 from both.',
          misconception: 'Students transpose a term but forget to change its sign, especially with negative constants.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The transposition method is a technique for solving linear equations in one variable',
                  options: ['The transposition method is a technique for solving linear equations in one variable', 'When multiplying two powers with the same base, we keep the base unchanged and add the', 'An algebraic expression is a combination of variables, constants, and arithmetic'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students transpose a term but forget to change its sign, especially with negative constants.' }
          ],
            remediations: { 'students-transpose-a-term-but': { steps: ['Use a two-column "Balance vs Transposition" table.', 'Write the equation in the middle.', 'On the left, show balancing: "Subtract 2x from both sides".', 'On the right, show transposition: "2x jumps to left as -2x".'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
