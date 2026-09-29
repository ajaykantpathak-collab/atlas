import type { SimDef } from '../../engine/types';
import C8_MathematicsSquaresAndSquareRootsSim from '../../../simulations/c6_12/C8_MathematicsSquaresAndSquareRootsSim';

/** v3 wrapped master — C8_MathematicsSquaresAndSquareRootsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_mathematicssquaresandsquarerootssim: SimDef = {
    id: 'v3w_c8_mathematicssquaresandsquarerootssim',
    title: 'Square Numbers: Definition and Notation (n squared)',
    subtitle: 'This node covers the definition of square numbers, the notation \\( n^2 \\), and computing.',
    classLevel: 8, subject: 'mathematics', topic: 'Square Numbers: Definition and Notation (n squared)',
    chapters: [],
    nodeIds: ['c8_math_ch1_1', 'c8_math_ch1_2', 'c8_math_ch1_3', 'c8_math_ch1_4', 'c8_math_ch1_6', 'c8_math_ch1_8', 'c8_math_ch1_9', 'c8_math_ch9_8', 'c8_math_ch9_9', 'c8_math_ch1_10', 'c8_math_ch1_5', 'c8_math_ch9_3', 'c8_math_ch9_10', 'c8_math_ch9_4', 'c8_math_ch9_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine you are tiling a square floor in your classroom using 1 m × 1 m tiles.', goal: 'Master Square Numbers: Definition and Notation (n squared).' },
    discovery: {
        question: 'Explain why \\( 5^2 \\) is not the same as \\( 2 \\times 5 \\). Use the area of a square in your explanation.',
        options: ['\\( 5^2 \\) means \\( 5 \\times 5 = 25 \\)', 'both give 10', 'the 2 just means multiply by 2'],
        answer: '\\( 5^2 \\) means \\( 5 \\times 5 = 25 \\)',
        hook: 'Students often interpret \\( n^2 \\) as \\( n \\times 2 \\) (e.g., \\( 8^2 = 16 \\)) because they see the "2" and think.',
    },
    teaching: [
        { title: 'A square number is the product obtained when.', text: 'A square number is the product obtained when a natural number is multiplied by itself. For any natural number \\( n \\), its square is denoted by \\( n^2 \\) and calculated as \\( n \\times n \\).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_math_ch1_1', title: 'A square number is the product obtained.',
          scaffold: { problem: 'A square classroom has a side length of 12 metres. The school wants to cover the floor with 1 m × 1 m tiles. How many tiles are needed?',
            steps: [
            { text: 'Identify the side length of the square floor: 12 m.' },
            { text: 'Recall that the area of a square = side × side, which is written as \\( (\\text{side})^2 \\).' },
            { text: 'Compute \\( 12^2 = 12 \\times 12 \\). Break 12 into 10 + 2: \\( 12 \\times 12 = 12 \\times (10 + 2) = (12 \\times 10) + (12.' },
            { text: 'Calculate: \\( 12 \\times 10 = 120 \\); \\( 12 \\times 2 = 24 \\); \\( 120 + 24 = 144 \\).' },
            { text: 'Interpret the result: 144 tiles are needed. The unit is square metres (m²) because we multiplied metres by metres.', faded: true, blankAnswer: '\\( 12^2 = 144 \\) tiles (or 144 m²)' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch1_2', title: 'A perfect square is a natural number.',
          scaffold: { problem: 'A gardener wants to plant 1296 saplings in a square grid (same number of rows and columns). Can she do it without leaving any sapling out?',
            steps: [
            { text: 'Identify the problem — we need to check if 1296 is a perfect square.' },
            { text: 'Recall the rule — a number is a perfect square if all exponents in its prime factorization are even.' },
            { text: 'Prime factorize 1296:' },
            { text: 'Check exponents — both 4 and 4 are even. Therefore, 1296 is a perfect square.' },
            { text: 'Find the square root for the grid size: √1296 = 2² × 3² = 4 × 9 = 36. The gardener can make a 36 × 36 grid.', faded: true, blankAnswer: 'Yes, 1296 is a perfect square (36²). The gardener can plant.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch1_3', title: 'The units digit of a perfect square.',
          scaffold: { problem: 'A school auditorium has chairs arranged in a square formation. The total number of chairs is a perfect square between 5000 and 6000.',
            steps: [
            { text: 'Let the number of rows be \\( n \\). Then total chairs \\( = n^2 \\).' },
            { text: 'From the units-digit pattern, \\( n^2 \\) ends in 4 only when \\( n \\) ends in 2 or 8 (since \\( 2^2=4 \\), \\( 8^2=64 \\)).' },
            { text: 'Estimate \\( n \\): \\( \\sqrt{5000} \\approx 70.7 \\), \\( \\sqrt{6000} \\approx 77.5 \\).' },
            { text: 'List integers 71–77 and pick those ending in 2 or 8: 72 ends in 2, 78 is too high, so only 72 qualifies.' },
            { text: 'Verify: \\( 72^2 = 5184 \\) (ends in 4, between 5000 and 6000). The units digit of the number of rows is 2.', faded: true, blankAnswer: 'The units digit of the number of rows must be 2.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch1_4', title: 'If a number ends with exactly \\(n\\).',
          scaffold: { problem: 'A school has 1200 students. For a seating arrangement, the principal wants to know how many trailing zeros will be in the square of the.',
            steps: [
            { text: 'Identify the given number and count its trailing zeros. 1200 ends with two zeros (the digits in tens and units place.' },
            { text: 'Recall the rule: If a number has n trailing zeros, its square has 2n trailing zeros.' },
            { text: 'Apply the rule: n = 2, so the square will have 2 × 2 = 4 trailing zeros.' },
            { text: 'Verify by expressing 1200 as 12 × 100 = 12 × 10². Then 1200² = (12 × 10²)² = 12² × 10⁴ = 144 × 10000 = 1,440,000.' },
            { text: 'State the answer with context: The square of 1200 will have 4 trailing zeros.', faded: true, blankAnswer: '4 trailing zeros' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch1_6', title: 'A natural number N is a perfect square.',
          scaffold: { problem: 'A gardener has 289 saplings and wants to plant them in a square formation (same number of rows and columns).',
            steps: [
            { text: 'Identify the number to test: N = 289. We will subtract odd numbers 1, 3, 5, ... until we reach 0 or a negative number.' },
            { text: 'Perform subtractions systematically, recording each step:' },
            { text: 'Count the number of subtractions performed. The odd numbers used were 1, 3, 5, ..., 33.' },
            { text: 'Since we reached exactly 0 after 17 subtractions, 289 is a perfect square and √289 = 17.' },
            { text: 'Interpret the result: The gardener can plant 17 rows with 17 saplings each, using all 289 saplings.', faded: true, blankAnswer: 'Yes, 289 is a perfect square (17²). Each row will have 17.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch1_8', title: 'The square root of a perfect square.',
          scaffold: { problem: 'A square tile has an area of 1296 square centimetres. What is the length of one side of the tile?',
            steps: [
            { text: 'Identify that the side length of a square is the square root of its area. We need to find \\( \\sqrt{1296} \\).' },
            { text: 'Use prime factorisation method. Divide 1296 by smallest primes: \\( 1296 \\div 2 = 648 \\), \\( 648 \\div 2 = 324 \\), \\( 324.' },
            { text: 'Write in exponent form: \\( 1296 = 2^4 \\times 3^4 \\). Group into pairs: \\( (2^2)^2 \\times (3^2)^2 = (2^2 \\times 3^2)^2 =.' },
            { text: 'Take one factor from each pair: \\( 2^2 \\times 3^2 = 4 \\times 9 = 36 \\). So \\( \\sqrt{1296} = 36 \\).' },
            { text: 'Verify: \\( 36 \\times 36 = 1296 \\). The side length is 36 cm.', faded: true, blankAnswer: '36 cm' }
            ] } },
        { type: 'dissect', nodeId: 'c8_math_ch1_2', title: 'Identify each idea',
          dissect: { specimen: 'Square Numbers: Definition and Notation (n squared)', spots: [
            { id: 's1', label: 'A square number is the', prompt: 'Which idea is this? — A square number is the product obtained when a natural number is multiplied by itself.', answer: 'A square number is the', options: ['A square number is the', 'A perfect square is a', 'The units digit of a', 'If a number ends with'] },
            { id: 's2', label: 'A perfect square is a', prompt: 'Which idea is this? — A perfect square is a natural number that can be expressed as the square of an integer.', answer: 'A perfect square is a', options: ['A perfect square is a', 'A square number is the', 'The units digit of a', 'If a number ends with'] },
            { id: 's3', label: 'The units digit of a', prompt: 'Which idea is this? — The units digit of a perfect square depends only on the units digit of the original.', answer: 'The units digit of a', options: ['The units digit of a', 'A square number is the', 'A perfect square is a', 'If a number ends with'] },
            { id: 's4', label: 'If a number ends with', prompt: 'Which idea is this? — If a number ends with exactly \\(n\\) zeros (i.e., is a multiple of \\(10^n\\) but not.', answer: 'If a number ends with', options: ['If a number ends with', 'A square number is the', 'A perfect square is a', 'The units digit of a'] },
            { id: 's5', label: 'A natural number N is', prompt: 'Which idea is this? — A natural number N is a perfect square if and only if it can be expressed as the sum of.', answer: 'A natural number N is', options: ['A natural number N is', 'A square number is the', 'A perfect square is a', 'The units digit of a'] },
            { id: 's6', label: 'The square root of a', prompt: 'Which idea is this? — The square root of a perfect square number is the positive number which, when multiplied.', answer: 'The square root of a', options: ['The square root of a', 'A square number is the', 'A perfect square is a', 'The units digit of a'] }
          ] } }
    ],
    explore: { component: C8_MathematicsSquaresAndSquareRootsSim, prompt: 'Explore the interactive — Square Numbers: Definition and Notation (n squared)' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch1_1', difficulty: 'standard',
          question: 'A square number is the product obtained when a natural number is multiplied by.',
          hint: 'If stuck, revisit multiplication of two-digit numbers (Class 6) and integer sign rules.',
          misconception: 'Students often interpret \\( n^2 \\) as \\( n \\times 2 \\) (e.g., \\( 8^2 = 16 \\)) because they see the "2" and think.',
          parts: [
                { id: 'a', prompt: 'Explain why \\( 5^2 \\) is not the same as \\( 2 \\times 5 \\). Use the area of a square in your explanation.', answer: '\\( 5^2 \\) means \\( 5 \\times 5 = 25 \\)',
                  options: ['\\( 5^2 \\) means \\( 5 \\times 5 = 25 \\)', 'both give 10', 'the 2 just means multiply by 2'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often interpret \\( n^2 \\) as \\( n \\times 2 \\) (e.g., \\( 8^2 = 16 \\)) because they see the "2" and think "multiply by 2".' }
          ],
            remediations: { 'students-often-interpret-n-2': { steps: ['If a student writes \\( 8^2 = 16 \\), ask: "What does the little 2 mean?', 'Let\'s read it: \'8 squared\' means 8 multiplied by itself.', 'Show me 8 times 8 using repeated addition or the area model." Draw a 8×8 grid and count.', 'For the negative sign error, write both \\( (-5)^2 \\) and \\( -5^2 \\) side by side.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_2', difficulty: 'standard',
          question: 'A perfect square is a natural number that can be expressed as the square of an.',
          hint: 'Revisit prime factorization (c6_math_ch01_015) and practice writing numbers as products.',
          misconception: 'Students often believe that if a number passes the units digit test (ends in 0,1,4,5,6,9) and has an even number of.',
          parts: [
                { id: 'a', prompt: 'Which of the following numbers is **guaranteed** to be a perfect square based only on its units digit? A) 324 B) 156 C) 289 D) 432', answer: 'A) 324 and C) 289 (both end in 4 or 9',
                  options: ['Correct answer: A) 324 and C) 289 (both end in 4 or 9', '**any** number ending in 0,1,4,5,6,9 is a perfect square (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a number passes the units digit test (ends in 0,1,4,5,6,9) and has an even number of trailing zeros, it.' },
                { id: 'b', prompt: 'Riya says: "1200 is a perfect square because it ends with two zeros." Is she correct?', answer: 'Riya is **incorrect**',
                  options: ['Riya is **incorrect**', 'must have even zeros', 'if it has even zeros, it is a square'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a number passes the units digit test (ends in 0,1,4,5,6,9) and has an even number of trailing zeros, it.' },
                { id: 'c', prompt: 'Determine whether 1764 is a perfect square using prime factorization. Show all steps.', answer: '**Step 1:** Prime factorize 1764',
                  options: ['**Step 1:** Prime factorize 1764', 'not a square'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a number passes the units digit test (ends in 0,1,4,5,6,9) and has an even number of trailing zeros, it.' }
          ],
            remediations: { 'if-a-number-passes-the': { steps: ['Write the number’s prime factorization clearly.', 'Circle each prime’s exponent.', 'Ask: "Is **every** exponent even?" If any is odd, stop — it’s not a perfect square.', 'Practice with numbers that pass digit/zero tests but fail factorization (e.g., 1640, 2000, 360).'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if a number passes the units digit test (ends in 0,1,4,5,6,9) and has an even number of.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since 1 + 3 + 5 + 7 + 9 = 25, and 25 is 5², then 1 + 3 + 5 + 7 + 9 + 11 must be 6² = 36." Is the student\'s reasoning valid?', answer: 'Yes, the reasoning is **valid**',
                  options: ['Yes, the reasoning is **valid**', 'we need to calculate to be sure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a number passes the units digit test (ends in 0,1,4,5,6,9) and has an even number of trailing zeros, it.' }
          ],
            remediations: { 'if-a-number-passes-the': { steps: ['Write the number’s prime factorization clearly.', 'Circle each prime’s exponent.', 'Ask: "Is **every** exponent even?" If any is odd, stop — it’s not a perfect square.', 'Practice with numbers that pass digit/zero tests but fail factorization (e.g., 1640, 2000, 360).'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_3', difficulty: 'standard',
          question: 'The units digit of a perfect square depends only on the units digit of the.',
          hint: 'Review writing numbers in expanded form using powers of 10 (Class 6 Place Value) and.',
          misconception: 'Students often believe that if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square.',
          parts: [
                { id: 'a', prompt: 'What are the possible units digits of a perfect square? List them.', answer: 'The possible units digits are 0, 1, 4, 5, 6, 9',
                  options: ['The possible units digits are 0, 1, 4, 5, 6, 9', 'if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square.' },
                { id: 'b', prompt: 'Explain why a number ending in 2 can never be a perfect square, using the algebraic form \\( (10a+b)^2 \\).', answer: 'For any integer \\( n = 10a+b \\), \\( n^2 = 100a^2 + 20ab + b^2 \\)',
                  options: ['For any integer \\( n = 10a+b \\), \\( n^2 = 100a^2 + 20ab + b^2 \\)', 'if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square.' },
                { id: 'c', prompt: 'Find the units digit of \\( 237^2 \\) without calculating the full square.', answer: 'Step 1: The units digit of 237 is 7',
                  options: ['Step 1: The units digit of 237 is 7', 'if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square.' }
          ],
            remediations: { 'if-a-number-ends-in': { steps: ['Have the student list squares of 1–20 and circle only the units digits.', 'Ask: "Does every number ending in 6 appear in this list?" (No, 6, 16, 26, 36… only 16 and 36 are squares).', 'Use the algebraic form \\( (10a+b)^2 = 100a^2+20ab+b^2 \\) to prove the units digit depends only on \\( b \\).', 'Give 5 numbers that pass the units-digit test but are not squares (e.g., 11, 24, 35, 46, 59) and have the student.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since 169 ends in 9, it must be a perfect square." Evaluate this statement and give a counterexample if it is false.', answer: 'The statement is false',
                  options: ['The statement is false', 'if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square.' },
                { id: 'b', prompt: 'Create a three-digit number that cannot be a perfect square and explain why using the units digit pattern.', answer: 'Example 1: 237 (ends in 7) → cannot be a perfect square',
                  options: ['Example 1: 237 (ends in 7) → cannot be a perfect square', 'if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square.' }
          ],
            remediations: { 'if-a-number-ends-in': { steps: ['Have the student list squares of 1–20 and circle only the units digits.', 'Ask: "Does every number ending in 6 appear in this list?" (No, 6, 16, 26, 36… only 16 and 36 are squares).', 'Use the algebraic form \\( (10a+b)^2 = 100a^2+20ab+b^2 \\) to prove the units digit depends only on \\( b \\).', 'Give 5 numbers that pass the units-digit test but are not squares (e.g., 11, 24, 35, 46, 59) and have the student.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_4', difficulty: 'standard',
          question: 'If a number ends with exactly \\(n\\) zeros (i.e., is a multiple of \\(10^n\\) but.',
          hint: 'Revisit place value (c6_math_ch01_003) and multiplication by powers of 10.',
          misconception: 'Students often count all zeros in the number, not just the trailing zeros at the end.',
          parts: [
                { id: 'a', prompt: 'Find the number of trailing zeros in the square of 3500 without performing the full multiplication.', answer: '3500 ends with 2 zeros',
                  options: ['3500 ends with 2 zeros', 'it has 1 or 3 zeros)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often count all zeros in the number, not just the trailing zeros at the end.' },
                { id: 'b', prompt: 'Compare the squares of 50 and 500. How many times more trailing zeros does 500² have compared to 50²? Explain the relationship.', answer: '50 has 1 trailing zero → 50² has 2 zeros',
                  options: ['50 has 1 trailing zero → 50² has 2 zeros', 'the relationship is additive rather than multiplicative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often count all zeros in the number, not just the trailing zeros at the end.' }
          ],
            remediations: { 'students-often-count-all-zeros': { steps: ['Have the student write the number with its place value: 10100 = 1×10⁴ + 0×10³ + 1×10² + 0×10¹ + 0×10⁰.', 'Circle the zeros at the end (units and tens places) – only those two are trailing zeros.', 'Show that 10100 = 101 × 100 = 101 × 10².', 'Squaring gives 101² × 10⁴, so exactly 4 trailing zeros.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_4', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often count all zeros in the number, not just the trailing zeros at the end.',
          parts: [
                { id: 'a', prompt: 'Compare the squares of 50 and 500. How many times more trailing zeros does 500² have compared to 50²? Explain the relationship.', answer: '50 has 1 trailing zero → 50² has 2 zeros',
                  options: ['50 has 1 trailing zero → 50² has 2 zeros', 'the relationship is additive rather than multiplicative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often count all zeros in the number, not just the trailing zeros at the end.' }
          ],
            remediations: { 'students-often-count-all-zeros': { steps: ['Have the student write the number with its place value: 10100 = 1×10⁴ + 0×10³ + 1×10² + 0×10¹ + 0×10⁰.', 'Circle the zeros at the end (units and tens places) – only those two are trailing zeros.', 'Show that 10100 = 101 × 100 = 101 × 10².', 'Squaring gives 101² × 10⁴, so exactly 4 trailing zeros.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_6', difficulty: 'standard',
          question: 'A natural number N is a perfect square if and only if it can be expressed as.',
          hint: 'Revisit c8_math_ch1_5 (Sum of Consecutive Odd Numbers Gives Perfect Square) and practise.',
          misconception: 'Students often miscount the number of subtractions performed, especially when the number of steps is large, and then.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A natural number N is a perfect square if and only if it can be expressed as the sum of',
                  options: ['A natural number N is a perfect square if and only if it can be expressed as the sum of', 'A square number is the product obtained when a natural number is multiplied by itself', 'A perfect square is a natural number that can be expressed as the square of an integer', 'The units digit of a perfect square depends only on the units digit of the original'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often miscount the number of subtractions performed, especially when the number of steps is large, and then incorrectly report the.' }
          ],
            remediations: { 'students-often-miscount-the-number': { steps: ['Have the student write the odd-number sequence (1, 3, 5, ...) in a column first, then perform subtractions in a.', 'After each subtraction, they must verbally state: "I have done ___ subtractions, the next odd is ___".', 'This dual-record method prevents skipping odds and forces accurate step counting.', 'Practice with 144 (12 steps) and 225 (15 steps) until the count matches the root every time.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_8', difficulty: 'standard',
          question: 'The square root of a perfect square number is the positive number which, when.',
          hint: 'If stuck, revisit prime factorisation (c6_math_ch01_015) and practice writing numbers as.',
          misconception: 'Students often think the square root of a number is obtained by dividing the number by 2 (e.g., \\( \\sqrt{64} = 32 \\)).',
          parts: [
                { id: 'a', prompt: 'What is the square root of 144? Write the answer and explain what the symbol \\( \\sqrt{144} \\) means.', answer: 'The square root of 144 is 12',
                  options: ['The square root of 144 is 12', 'the square root of a number is obtained by dividing the number by 2 (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the square root of a number is obtained by dividing the number by 2 (e.g., \\( \\sqrt{64} = 32 \\)) or by halving the.' },
                { id: 'b', prompt: 'A student says \\( \\sqrt{100} = 50 \\) because "you divide by 2 to find the square root". Why is this reasoning incorrect?', answer: 'The reasoning is incorrect',
                  options: ['The reasoning is incorrect', 'half of a number', 'a number that squares to the original'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the square root of a number is obtained by dividing the number by 2 (e.g., \\( \\sqrt{64} = 32 \\)) or by halving the.' },
                { id: 'c', prompt: 'Find the square root of 1764 using the prime factorisation method. Show all steps.', answer: 'Step 1: Prime factorise 1764',
                  options: ['Step 1: Prime factorise 1764', 'the square root of a number is obtained by dividing the number by 2 (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the square root of a number is obtained by dividing the number by 2 (e.g., \\( \\sqrt{64} = 32 \\)) or by halving the.' }
          ],
            remediations: { 'the-square-root-of-a': { steps: ['If a student makes this error, immediately ask: "If \\( \\sqrt{64} = 32 \\), then what is \\( 32 \\times 32 \\)?" Let them.', 'Then ask: "Does that equal 64?" Then remind: "Square root asks: what number times itself gives 64?', 'We know \\( 8 \\times 8 = 64 \\), so \\( \\sqrt{64} = 8 \\)." Next, give a set of 5 perfect squares (36, 81, 100, 144, 225).', 'This builds the inverse-operation concept concretely.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_8', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the square root of a number is obtained by dividing the number by 2 (e.g., \\( \\sqrt{64} = 32 \\)).',
          parts: [
                { id: 'a', prompt: 'Create a word problem for a Class 8 student that requires finding the square root of a 4-digit perfect square.', answer: 'Example: "A square playground has an area of 3136 square metres',
                  options: ['Example: "A square playground has an area of 3136 square metres', 'the square root of a number is obtained by dividing the number by 2 (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the square root of a number is obtained by dividing the number by 2 (e.g., \\( \\sqrt{64} = 32 \\)) or by halving the.' }
          ],
            remediations: { 'the-square-root-of-a': { steps: ['If a student makes this error, immediately ask: "If \\( \\sqrt{64} = 32 \\), then what is \\( 32 \\times 32 \\)?" Let them.', 'Then ask: "Does that equal 64?" Then remind: "Square root asks: what number times itself gives 64?', 'We know \\( 8 \\times 8 = 64 \\), so \\( \\sqrt{64} = 8 \\)." Next, give a set of 5 perfect squares (36, 81, 100, 144, 225).', 'This builds the inverse-operation concept concretely.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
