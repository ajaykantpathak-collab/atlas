import type { SimDef } from '../../engine/types';
import C8_MathematicsPowerPlaySim from '../../../simulations/c6_12/C8_MathematicsPowerPlaySim';

/** v3 wrapped master — C8_MathematicsPowerPlaySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_mathematicspowerplaysim: SimDef = {
    id: 'v3w_c8_mathematicspowerplaysim',
    title: 'Multiplying Powers with Different Bases: am x bm = (ab)m',
    subtitle: 'Covers multiplication of powers with identical integer exponents (positive, negative, or.',
    classLevel: 8, subject: 'mathematics', topic: 'Multiplying Powers with Different Bases: am x bm = (ab)m',
    chapters: [],
    nodeIds: ['c8_math_ch2_10', 'c8_math_ch2_11', 'c8_math_ch2_12', 'c8_math_ch2_3', 'c8_math_ch2_4', 'c8_math_ch2_5', 'c8_math_ch2_7', 'c8_math_ch2_8'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine you are buying 3 boxes of pencils and 3 boxes of pens.', goal: 'Master Multiplying Powers with Different Bases: am x bm = (ab)m.' },
    discovery: {
        question: 'What is the sign of \\((-7)^{12}\\)? Explain your reasoning in one sentence without calculating the actual value.',
        options: ['Positive', 'negative', 'negative base always gives negative result'],
        answer: 'Positive',
        hook: 'Students frequently confuse \\((-a)^n\\) with \\(-a^n\\). For example, they evaluate \\((-3)^2\\) as \\(-9\\) (treating it as.',
    },
    teaching: [
        { title: 'When two powers have the same exponent but.', text: 'When two powers have the same exponent but different bases, their product equals the product of the bases raised to that common exponent.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_math_ch2_10', title: 'When two powers have the same exponent.',
          scaffold: { problem: 'A water tank has a square base of side 6 m and height 6 m. Another tank has a square base of side 4 m and height 4 m.',
            steps: [
            { text: 'Volume of first tank = (side)^2 × height = 6^2 × 6 = 6^3 cubic metres.' },
            { text: 'Product of volumes = 6^3 × 4^3. Identify bases 6 and 4, common exponent 3.' },
            { text: 'Apply the law a^m × b^m = (a×b)^m: 6^3 × 4^3 = (6×4)^3.' },
            { text: 'Multiply bases: 6×4 = 24. Write as single power: 24^3.' },
            { text: 'Verify: 6^3 = 216, 4^3 = 64, product = 13824. 24^3 = 24×24×24 = 13824. Units: cubic metres.', faded: true, blankAnswer: '24^3 cubic metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch2_11', title: 'For a negative base \\(-a\\) (where \\(a >.',
          scaffold: { problem: 'In a science experiment, a chemical reaction causes the temperature change in a beaker to be modeled by \\((-4)^n\\) degrees Celsius, where.',
            steps: [
            { text: 'Identify the base and exponents. Base = -4, exponents = 3 and 4.' },
            { text: 'Recall the sign rule: negative base raised to an odd exponent gives a negative result; raised to an even exponent gives.' },
            { text: 'Evaluate \\((-4)^3\\). Exponent 3 is odd → result is negative. Compute magnitude: \\(4^3 = 4 \\times 4 \\times 4 = 64\\).' },
            { text: 'Evaluate \\((-4)^4\\). Exponent 4 is even → result is positive. Compute magnitude: \\(4^4 = 4 \\times 4 \\times 4 \\times 4 =.' },
            { text: 'Interpret: After 3 minutes, the temperature drops by 64°C (negative change).', faded: true, blankAnswer: 'After 3 minutes: \\(-64^\\circ\\text{C}\\) (temperature drops)..' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch2_12', title: 'For any non-zero number \\(a\\) (integer,.',
          scaffold: { problem: 'A scientist starts with 1 gram of a radioactive substance. The amount halves every hour.',
            steps: [
            { text: 'Identify the pattern: after 1 hour, amount \\(= 1 \\times \\left(\\frac{1}{2}\\right)^1\\); after 2 hours, amount \\(= 1.' },
            { text: 'For \\(n=0\\), the expression becomes \\(1 \\times \\left(\\frac{1}{2}\\right)^0\\).' },
            { text: 'Apply zero exponent rule: \\(\\left(\\frac{1}{2}\\right)^0 = 1\\) (since base \\(\\frac{1}{2} \\neq 0\\)).' },
            { text: 'Compute: \\(1 \\times 1 = 1\\) gram.' },
            { text: 'Interpret: At the start (0 hours), the full 1 gram is present, consistent with the rule.', faded: true, blankAnswer: '1 gram' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch2_3', title: 'Exponential notation is a concise way.',
          scaffold: { problem: 'A water lily in a pond doubles its covered area every day. On Day 1 it covers 1 square metre.',
            steps: [
            { text: 'Understand the growth pattern. Day 1: 1 m² = 2⁰ (but we start with 1 as 2⁰, however the problem says Day 1 covers 1 m².' },
            { text: 'Identify the base and exponent. Base = 2 (doubling factor). Exponent = 5 (number of doublings from Day 1 to Day 6).' },
            { text: 'Write the exponential expression: \\(2^5\\).' },
            { text: 'Evaluate \\(2^5\\) by repeated multiplication: \\(2 \\times 2 = 4\\), \\(4 \\times 2 = 8\\), \\(8 \\times 2 = 16\\), \\(16 \\times 2.' },
            { text: 'State the final answer with units: 32 square metres.', faded: true, blankAnswer: 'Exponential expression: \\(2^5\\); Base = 2, Exponent = 5;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch2_4', title: 'A power of 2 is an expression of the.',
          scaffold: { problem: 'A new library book is so popular that each person who reads it recommends it to 2 friends the next day.',
            steps: [
            { text: 'Identify the pattern — each day the number of NEW readers doubles. Monday starts with 1 reader (2⁰ = 1).' },
            { text: 'Tuesday: 2¹ = 2 new readers. Wednesday: 2² = 4 new readers. Thursday: 2³ = 8 new readers. Friday: 2⁴ = 16 new readers.' },
            { text: 'Compute 2⁴ by doubling from 2³: 2³ = 8, so 2⁴ = 8 × 2 = 16. Or expand: 2 × 2 × 2 × 2 = 16.' },
            { text: 'Verify by building the full sequence: 2⁰=1, 2¹=2, 2²=4, 2³=8, 2⁴=16. Each step doubles.' },
            { text: 'Answer the question: On Friday, there will be 16 new readers.', faded: true, blankAnswer: '16 new readers on Friday' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch2_5', title: 'Expressing a number in exponential form.',
          scaffold: { problem: 'The distance from Earth to the Moon is approximately 3,84,000 km. Express this distance in standard form (scientific notation).',
            steps: [
            { text: 'Identify the given number: 3,84,000 km. Write it with an explicit decimal point: 3,84,000.0' },
            { text: 'Move the decimal point to the left until the number is between 1 and 10.' },
            { text: 'The number between 1 and 10 is 3.84. The number of places moved (5) becomes the exponent of 10.' },
            { text: 'Write in standard form: \\( 3.84 \\times 10^5 \\) km.' },
            { text: 'Verify: \\( 3.84 \\times 100,000 = 384,000 \\). Correct.', faded: true, blankAnswer: '\\( 3.84 \\times 10^5 \\) km' }
            ] } },
        { type: 'dissect', nodeId: 'c8_math_ch2_11', title: 'Identify each idea',
          dissect: { specimen: 'Multiplying Powers with Different Bases: am x bm = (ab)m', spots: [
            { id: 's1', label: 'When two powers have the', prompt: 'Which idea is this? — When two powers have the same exponent but different bases, their product equals the.', answer: 'When two powers have the', options: ['When two powers have the', 'For a negative base -a', 'For any non-zero number a', 'Exponential notation is a concise'] },
            { id: 's2', label: 'For a negative base -a', prompt: 'Which idea is this? — For a negative base \\(-a\\) (where \\(a > 0\\)) raised to a positive integer exponent \\(n\\),.', answer: 'For a negative base -a', options: ['For a negative base -a', 'When two powers have the', 'For any non-zero number a', 'Exponential notation is a concise'] },
            { id: 's3', label: 'For any non-zero number a', prompt: 'Which idea is this? — For any non-zero number \\(a\\) (integer, fraction, decimal, or algebraic expression),.', answer: 'For any non-zero number a', options: ['For any non-zero number a', 'When two powers have the', 'For a negative base -a', 'Exponential notation is a concise'] },
            { id: 's4', label: 'Exponential notation is a concise', prompt: 'Which idea is this? — Exponential notation is a concise way to represent repeated multiplication of the same.', answer: 'Exponential notation is a concise', options: ['Exponential notation is a concise', 'When two powers have the', 'For a negative base -a', 'For any non-zero number a'] },
            { id: 's5', label: 'A power of 2 is', prompt: 'Which idea is this? — A power of 2 is an expression of the form 2ⁿ where n is a non-negative integer,.', answer: 'A power of 2 is', options: ['A power of 2 is', 'When two powers have the', 'For a negative base -a', 'For any non-zero number a'] },
            { id: 's6', label: 'Expressing a number in exponential', prompt: 'Which idea is this? — Expressing a number in exponential form means writing it as a base raised to an exponent.', answer: 'Expressing a number in exponential', options: ['Expressing a number in exponential', 'When two powers have the', 'For a negative base -a', 'For any non-zero number a'] }
          ] } }
    ],
    explore: { component: C8_MathematicsPowerPlaySim, prompt: 'Explore the interactive — Multiplying Powers with Different Bases: am x bm = (ab)m' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch2_10', difficulty: 'standard',
          question: 'When two powers have the same exponent but different bases, their product.',
          hint: 'If stuck, revisit expanding powers (c8_math_ch2_3) and integer multiplication sign rules.',
          misconception: 'Students often add the exponents when multiplying powers with different bases, writing a^m × b^m = (ab)^(2m) or.',
          parts: [
                { id: 'a', prompt: 'Explain why 2^4 × 3^4 = (2×3)^4 is true by writing both sides in expanded form. Why can we not do the same for 2^4 × 3^5?', answer: 'LHS = (2×2×2×2) × (3×3×3×3) = (2×3)×(2×3)×(2×3)×(2×3) = 6^4 = RHS',
                  options: ['LHS = (2×2×2×2) × (3×3×3×3) = (2×3)×(2×3)×(2×3)×(2×3) = 6^4 = RHS', 'we can still combine them'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often add the exponents when multiplying powers with different bases, writing a^m × b^m = (ab)^(2m) or (ab)^(m+m).' }
          ],
            remediations: { 'students-often-add-the-exponents': { steps: ['Ask the student to expand both powers fully: 2^3 × 5^3 = (2×2×2) × (5×5×5).', 'Have them regroup by pairing one 2 with one 5: (2×5)×(2×5)×(2×5).', 'Count the pairs: three pairs of (2×5) = 10^3.', 'Contrast with same-base case: 2^3 × 2^2 = (2×2×2)×(2×2) = five 2\'s = 2^5.'] } } },
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
        { type: 'subpart', nodeId: 'c8_math_ch2_12', difficulty: 'standard',
          question: 'For any non-zero number \\(a\\) (integer, fraction, decimal, or algebraic.',
          hint: 'Revisit the quotient rule for exponents (c8_math_ch2_8) and practice dividing powers with.',
          misconception: 'Students often think \\(0^0 = 1\\) by applying the rule blindly, or they think \\(a^0 = 0\\) because "zero times anything.',
          parts: [
                { id: 'a', prompt: 'State the zero exponent rule for any non-zero base \\(a\\).', answer: '\\(a^0 = 1\\) for \\(a \\neq 0\\)',
                  options: ['\\(a^0 = 1\\) for \\(a \\neq 0\\)', 'zero exponent means zero', 'zero times anything is zero'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \\(0^0 = 1\\) by applying the rule blindly, or they think \\(a^0 = 0\\) because "zero times anything is zero".' },
                { id: 'b', prompt: 'Explain why \\(5^0 = 1\\) using the quotient rule for exponents (\\(a^m \\div a^n = a^{m-n}\\)).', answer: '\\(5^0 = 5^{3-3} = 5^3 \\div 5^3 = 125 \\div 125 = 1\\)',
                  options: ['\\(5^0 = 5^{3-3} = 5^3 \\div 5^3 = 125 \\div 125 = 1\\)', 'because any number to the power zero is 1 by definition', 'zero times anything is zero'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \\(0^0 = 1\\) by applying the rule blindly, or they think \\(a^0 = 0\\) because "zero times anything is zero".' },
                { id: 'c', prompt: 'Simplify: \\(\\left(\\frac{3}{4}\\right)^0 + (-7)^0 \\times 2^0\\).', answer: '\\(\\left(\\frac{3}{4}\\right)^0 = 1\\), \\((-7)^0 = 1\\), \\(2^0 = 1\\)',
                  options: ['\\(\\left(\\frac{3}{4}\\right)^0 = 1\\), \\((-7)^0 = 1\\), \\(2^0 = 1\\)', 'zero times anything is zero', 'the exponent is zero so the answer is zero'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \\(0^0 = 1\\) by applying the rule blindly, or they think \\(a^0 = 0\\) because "zero times anything is zero".' }
          ],
            remediations: { '0-0-1-by-applying': { steps: ['Use the descending pattern approach: Write powers of 2 from \\(2^3\\) down to \\(2^0\\): 8, 4, 2, ?.', 'Then generalise: \\(a^3, a^2, a^1, a^0\\).', 'Each step divides by \\(a\\).', 'So \\(a^1 \\div a = a^0 = 1\\).'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch2_12', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think \\(0^0 = 1\\) by applying the rule blindly, or they think \\(a^0 = 0\\) because "zero times anything.',
          parts: [
                { id: 'a', prompt: 'A student simplifies \\((2^3 \\times 2^{-3})\\) as \\(2^0 = 1\\). Is this correct?', answer: 'Yes, it is correct',
                  options: ['Yes, it is correct', 'zero times anything is zero', 'the exponent is zero so the answer is zero', '\\(a^0 = 0\\) because "zero times anything is zero"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \\(0^0 = 1\\) by applying the rule blindly, or they think \\(a^0 = 0\\) because "zero times anything is zero".' },
                { id: 'b', prompt: 'Create a real-world problem involving repeated halving (or doubling) where the zero exponent naturally appears as the starting quantity.', answer: 'Example: "A ball is dropped from a height of 10 metres',
                  options: ['Example: "A ball is dropped from a height of 10 metres', 'zero times anything is zero', 'the exponent is zero so the answer is zero', '\\(a^0 = 0\\) because "zero times anything is zero"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \\(0^0 = 1\\) by applying the rule blindly, or they think \\(a^0 = 0\\) because "zero times anything is zero".' }
          ],
            remediations: { '0-0-1-by-applying': { steps: ['Use the descending pattern approach: Write powers of 2 from \\(2^3\\) down to \\(2^0\\): 8, 4, 2, ?.', 'Then generalise: \\(a^3, a^2, a^1, a^0\\).', 'Each step divides by \\(a\\).', 'So \\(a^1 \\div a = a^0 = 1\\).'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch2_3', difficulty: 'standard',
          question: 'Exponential notation is a concise way to represent repeated multiplication of.',
          hint: 'If stuck, revisit c7_math_ch10_004 (Multiplication of Integers: Sign Rules) and.',
          misconception: 'Students often treat the exponent as a multiplier: they compute \\(a^n\\) as \\(a \\times n\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Exponential notation is a concise way to represent repeated multiplication of the same',
                  options: ['Exponential notation is a concise way to represent repeated multiplication of the same', 'When two powers have the same exponent but different bases, their product equals the', 'For a negative base \\(-a\\) (where \\(a > 0\\)) raised to a positive integer exponent \\(n\\),', 'For any non-zero number \\(a\\) (integer, fraction, decimal, or algebraic expression),'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the exponent as a multiplier: they compute \\(a^n\\) as \\(a \\times n\\).' }
          ],
            remediations: { 'students-often-treat-the-exponent': { steps: ['Have the student write out the repeated multiplication explicitly: "What does \\(2^5\\) mean?', 'Count the factors together: "How many 2\'s are there? That\'s the exponent."', 'For negative bases, use parentheses: "Write \\((-3)^2\\) as \\((-3) \\times (-3)\\).', 'Practice with base 10 patterns from Class 7 (c7_math_ch01_008): \\(10^1=10\\), \\(10^2=100\\), \\(10^3=1000\\) to reinforce.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch2_4', difficulty: 'standard',
          question: 'A power of 2 is an expression of the form 2ⁿ where n is a non-negative integer,.',
          hint: 'Review c8_math_ch2_3 (Exponential Notation) to reconnect the symbol 2ⁿ with its meaning.',
          misconception: 'Students treat the exponent as a factor to multiply by the base: they compute 2ⁿ as 2 × n.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A power of 2 is an expression of the form 2ⁿ where n is a non-negative integer,',
                  options: ['A power of 2 is an expression of the form 2ⁿ where n is a non-negative integer,', 'When two powers have the same exponent but different bases, their product equals the', 'For a negative base \\(-a\\) (where \\(a > 0\\)) raised to a positive integer exponent \\(n\\),', 'For any non-zero number \\(a\\) (integer, fraction, decimal, or algebraic expression),'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the exponent as a factor to multiply by the base: they compute 2ⁿ as 2 × n.' }
          ],
            remediations: { 'students-treat-the-exponent-as': { steps: ['When a student writes 2⁵ = 10, do not just say "wrong".', 'Instead: (1) Ask "What does the little 5 mean?" to surface their interpretation.', '(2) Write 2⁵ = 2 × 2 × 2 × 2 × 2 on paper and count the 2\'s together.', '(3) Contrast with 2 × 5 = 2 + 2 + 2 + 2 + 2 = 10.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch2_5', difficulty: 'standard',
          question: 'Expressing a number in exponential form means writing it as a base raised to an.',
          hint: 'Revisit prime factorisation (c6_math_ch01_015) and the definition of base/exponent.',
          misconception: 'Students treat the exponent as a "zero counter" only for base 10.',
          parts: [
                { id: 'a', prompt: 'Write the number 70,000 in standard form (scientific notation).', answer: '\\( 7 \\times 10^4 \\)',
                  options: ['Correct answer: \\( 7 \\times 10^4 \\)', 'base × exponent', 'base multiplied by itself exponent times'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the exponent as a "zero counter" only for base 10.' },
                { id: 'b', prompt: 'The number 64 can be written as \\( 2^6 \\), \\( 4^3 \\), and \\( 8^2 \\).', answer: 'Correct explanation: 64 = 2 × 2 × 2 × 2 × 2 × 2 = 2^6',
                  options: ['Correct explanation: 64 = 2 × 2 × 2 × 2 × 2 × 2 = 2^6', 'the exponent tells how many zeros', 'only one form is correct'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the exponent as a "zero counter" only for base 10.' },
                { id: 'c', prompt: 'Express 3,60,00,000 in standard form. Show the steps of moving the decimal point.', answer: 'Write number with decimal: 3,60,00,000.0',
                  options: ['Write number with decimal: 3,60,00,000.0', 'base × exponent', 'base multiplied by itself exponent times'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the exponent as a "zero counter" only for base 10.' }
          ],
            remediations: { 'students-treat-the-exponent-as': { steps: ['Go back to **c8_math_ch2_3** and use physical counters: show 2^3 as three groups of two counters.', 'For standard form normalization, use a place value chart.', 'Slide a decimal point marker from the rightmost end leftwards, counting aloud each jump over a digit, until the number.', 'The count (3) is the exponent.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch2_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the exponent as a "zero counter" only for base 10.',
          parts: [
                { id: 'a', prompt: 'A student writes the standard form of 5,200 as \\( 52 \\times 10^2 \\). Is this correct? If not, identify the error and give the correct standard form.', answer: 'Incorrect',
                  options: ['Incorrect', 'it\'s correct because 52 × 100 = 5200', 'base × exponent', 'base multiplied by itself exponent times'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the exponent as a "zero counter" only for base 10.' },
                { id: 'b', prompt: 'Create a real-life problem (using Indian context: rupees, population, distance) where expressing a large number in standard form makes the problem easier to.', answer: 'Example: "India\'s population is about 1,40,00,00,000',
                  options: ['Example: "India\'s population is about 1,40,00,00,000', 'base × exponent', 'base multiplied by itself exponent times'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the exponent as a "zero counter" only for base 10.' }
          ],
            remediations: { 'students-treat-the-exponent-as': { steps: ['Go back to **c8_math_ch2_3** and use physical counters: show 2^3 as three groups of two counters.', 'For standard form normalization, use a place value chart.', 'Slide a decimal point marker from the rightmost end leftwards, counting aloud each jump over a digit, until the number.', 'The count (3) is the exponent.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
