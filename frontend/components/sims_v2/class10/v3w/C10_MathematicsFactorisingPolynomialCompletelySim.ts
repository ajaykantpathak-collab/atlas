import type { SimDef } from '../../engine/types';
import C10_MathematicsFactorisingPolynomialCompletelySim from '../../../simulations/c6_12/C10_MathematicsFactorisingPolynomialCompletelySim';

/** v3 wrapped master — C10_MathematicsFactorisingPolynomialCompletelySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_mathematicsfactorisingpolynomialcompletelysim: SimDef = {
    id: 'v3w_c10_mathematicsfactorisingpolynomialcompletelysim',
    title: 'Finding Zeros of a Polynomial Using Division Algorithm',
    subtitle: 'Covers finding all zeros of cubic and quartic polynomials with real coefficients when at.',
    classLevel: 10, subject: 'mathematics', topic: 'Finding Zeros of a Polynomial Using Division Algorithm',
    chapters: [],
    nodeIds: ['c10_math_cbse_02_009', 'c10_math_cbse_02_010', 'c10_math_cbse_02_005', 'c10_math_cbse_02_007', 'c10_math_cbse_01_012', 'c10_math_cbse_02_001', 'c10_math_cbse_02_002', 'c10_math_cbse_02_003', 'c10_math_cbse_02_004', 'c10_math_cbse_02_006', 'c10_math_cbse_02_008', 'c10_math_cbse_02_011', 'c10_math_cbse_01_006', 'c10_math_cbse_01_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine you are designing a rectangular garden bed where the length is 2 metres more than the breadth, and a.', goal: 'Master Finding Zeros of a Polynomial Using Division Algorithm.' },
    discovery: {
        question: 'Compare the Division Algorithm for integers and polynomials. Identify two structural similarities and one key difference in how "size" is measured.',
        options: ['**Correct Answer:** **Similarities:** 1', 'size is the coefficient', 'polynomials use the value at x=10'],
        answer: '**Correct Answer:** **Similarities:** 1',
        hook: 'Students treat the Division Algorithm as a computational procedure (long division steps) rather than a structural.',
    },
    teaching: [
        { title: 'The Division Algorithm for polynomials.', text: 'The Division Algorithm for polynomials states that for any polynomials \\(p(x)\\) and \\(g(x)\\) with \\(g(x) \\neq 0\\), there exist unique polynomials \\(q(x)\\) (quotient) and \\(r(x)\\) (remainder) such.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_math_cbse_02_009', title: 'The Division Algorithm for polynomials.',
          scaffold: { problem: '** A cubic polynomial \\(p(x) = 2x^3 - 5x^2 - 4x + 3\\) models the volume (in cubic metres) of a storage box where \\(x\\) is the side length.',
            steps: [
            { text: 'Identify the known zero \\(\\alpha = 3\\). Form the divisor \\(g(x) = x - 3\\).' },
            { text: 'Perform polynomial long division of \\(p(x)\\) by \\(x-3\\).' },
            { text: 'Factorise the quadratic quotient: \\(2x^2 + x - 1 = 2x^2 + 2x - x - 1 = 2x(x+1) -1(x+1) = (2x-1)(x+1)\\).' },
            { text: 'Find zeros of \\(q(x)\\): \\(2x-1=0 \\Rightarrow x = \\frac{1}{2}\\); \\(x+1=0 \\Rightarrow x = -1\\).' },
            { text: 'Combine with the known zero: zeros are \\(3, \\frac{1}{2}, -1\\).', faded: true, blankAnswer: '** Valid dimensions: \\(3\\) m and \\(0.5\\) m (i.e.,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_02_010', title: 'Factorisation of a polynomial using the.',
          scaffold: { problem: 'The polynomial \\( p(x) = 2x^3 - 3x^2 - 11x + 6 \\) represents the volume (in cubic cm) of a cuboid where one dimension is \\( (x - 3) \\) cm.',
            steps: [
            { text: 'Identify the known factor. Given zero \\( x = 3 \\) (since dimension \\( x - 3 = 0 \\Rightarrow x = 3 \\)), so \\( (x - 3) \\).' },
            { text: 'Set up polynomial long division: Divide \\( 2x^3 - 3x^2 - 11x + 6 \\) by \\( (x - 3) \\).' },
            { text: 'Perform division:' },
            { text: 'Quotient is \\( 2x^2 + 3x - 2 \\). So \\( p(x) = (x - 3)(2x^2 + 3x - 2) \\).' },
            { text: 'Factorise the quadratic \\( 2x^2 + 3x - 2 \\) by splitting middle term: \\( 2x^2 + 4x - x - 2 = 2x(x + 2) - 1(x + 2) = (x.' },
            { text: 'Complete factorisation: \\( p(x) = (x - 3)(x + 2)(2x - 1) \\).', faded: true, blankAnswer: '\\( (x - 3)(x + 2)(2x - 1) \\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_02_005', title: 'For a quadratic polynomial \\(p(x) =.',
          scaffold: { problem: 'A rectangular plot in a housing society has an area represented by the quadratic polynomial \\(2x^2 + 9x + 10\\) square metres, where \\(x\\).',
            steps: [
            { text: 'Identify the quadratic polynomial: \\(p(x) = 2x^2 + 9x + 10\\). Here \\(a = 2\\), \\(b = 9\\), \\(c = 10\\).' },
            { text: 'Recall the relationship: Sum of zeros \\(\\alpha + \\beta = -b/a\\), Product of zeros \\(\\alpha\\beta = c/a\\).' },
            { text: 'Substitute the coefficients: Sum = \\(-9/2 = -4.5\\). Product = \\(10/2 = 5\\).' },
            { text: 'Since length and breadth are positive, the zeros must be positive?' },
            { text: 'Identify coefficients: \\(a=2, b=9, c=10\\).' },
            { text: 'Use formulas: Sum of zeros = \\(-b/a = -9/2\\). Product of zeros = \\(c/a = 10/2 = 5\\).' },
            { text: 'Interpret: The sum of the two break-even quantities is -4.5 items (negative sum means both break-even points are.' },
            { text: 'Sum = \\(-(-9)/2 = 9/2 = 4.5\\). Product = \\(10/2 = 5\\).' },
            { text: 'Since sum >0 and product >0, both zeros positive. Find zeros by factorisation: \\(2x^2 - 4x - 5x + 10 = 2x(x-2) -5(x-2).' },
            { text: 'Verify sum = 2 + 2.5 = 4.5 = 9/2. Product = 2 * 2.5 = 5. Matches.', faded: true, blankAnswer: 'Sum of zeros = 9/2, Product of zeros = 5. Zeros are 2 and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_02_007', title: 'The Division Algorithm for Polynomials.',
          scaffold: { problem: 'A rectangular garden has area \\( A(x) = 2x^3 - 5x^2 - 4x + 3 \\) square metres. Its length is \\( L(x) = x - 3 \\) metres.',
            steps: [
            { text: 'Identify dividend \\( p(x) = A(x) = 2x^3 - 5x^2 - 4x + 3 \\) and divisor \\( g(x) = L(x) = x - 3 \\).' },
            { text: 'Set up long division. Write dividend with all terms: \\( 2x^3 - 5x^2 - 4x + 3 \\). Divisor: \\( x - 3 \\).' },
            { text: 'Divide leading term \\( 2x^3 \\) by \\( x \\) → \\( 2x^2 \\) (first term of quotient).' },
            { text: 'Divide new leading term \\( x^2 \\) by \\( x \\) → \\( x \\) (next quotient term). Multiply: \\( (x-3)(x) = x^2 - 3x \\).' },
            { text: 'Divide leading term \\( -x \\) by \\( x \\) → \\( -1 \\) (next quotient term). Multiply: \\( (x-3)(-1) = -x + 3 \\).' },
            { text: 'Quotient \\( B(x) = 2x^2 + x - 1 \\). Remainder \\( r(x) = 0 \\). Verification: \\( (x-3)(2x^2 + x - 1) = 2x^3 + x^2 - x -.', faded: true, blankAnswer: 'Breadth \\( B(x) = 2x^2 + x - 1 \\) metres, Remainder = 0 sq.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_01_012', title: 'Finding HCF and LCM from word problems.',
          scaffold: { problem: 'A school has 144 chocolate bars and 192 juice boxes for a picnic. They want to make identical gift packs using all items with no leftovers.',
            steps: [
            { text: 'Identify the given numbers: 144 chocolates, 192 juice boxes. The phrase "identical packs with no leftovers" means we.' },
            { text: 'Write prime factorisation of each number. 144 = 2 × 2 × 2 × 2 × 3 × 3 = 2⁴ × 3².' },
            { text: 'For HCF, take each common prime factor with the smallest exponent. Common primes: 2 and 3.' },
            { text: 'Maximum number of packs = HCF = 48. Chocolates per pack = 144 ÷ 48 = 3. Juice boxes per pack = 192 ÷ 48 = 4.' },
            { text: 'Verify: 48 packs × 3 chocolates = 144; 48 packs × 4 juice boxes = 192. No leftovers. Answer with units.', faded: true, blankAnswer: 'Maximum number of packs = 48. Each pack contains 3.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_02_001', title: 'The zeros of a polynomial p(x) are the.',
          scaffold: { problem: 'A rectangular garden has length (x + 5) metres and breadth (x - 2) metres. Its area is given by A(x) = (x + 5)(x - 2) square metres.',
            steps: [
            { text: 'Write the polynomial for area: A(x) = (x + 5)(x - 2) = x² + 3x - 10. The zeros are the x-values where A(x) = 0.' },
            { text: 'Set A(x) = 0 → (x + 5)(x - 2) = 0. Using zero product property: x + 5 = 0 or x - 2 = 0.' },
            { text: 'Solve: x = -5 or x = 2. These are the zeros of the polynomial.' },
            { text: 'Geometric interpretation: On the graph of y = x² + 3x - 10, the points where the curve meets the x-axis are (-5, 0) and.' },
            { text: 'Since the coefficient of x² is positive, the parabola opens upward. It crosses the x-axis at x = -5 and x = 2.', faded: true, blankAnswer: 'Zeros: x = -5 and x = 2. Geometrically: graph of y = x² +.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_math_cbse_02_010', title: 'Identify each idea',
          dissect: { specimen: 'Finding Zeros of a Polynomial Using Division Algorithm', spots: [
            { id: 's1', label: 'The Division Algorithm for polynomials', prompt: 'Which idea is this? — The Division Algorithm for polynomials states that for any polynomials \\(p(x)\\) and.', answer: 'The Division Algorithm for polynomials', options: ['The Division Algorithm for polynomials', 'Factorisation of a polynomial using', 'For a quadratic polynomial px', 'Finding HCF and LCM from'] },
            { id: 's2', label: 'Factorisation of a polynomial using', prompt: 'Which idea is this? — Factorisation of a polynomial using the division algorithm is the process of expressing a.', answer: 'Factorisation of a polynomial using', options: ['Factorisation of a polynomial using', 'The Division Algorithm for polynomials', 'For a quadratic polynomial px', 'Finding HCF and LCM from'] },
            { id: 's3', label: 'For a quadratic polynomial px', prompt: 'Which idea is this? — For a quadratic polynomial \\(p(x) = ax^2 + bx + c\\) where \\(a \\neq 0\\), if \\(\\alpha\\) and.', answer: 'For a quadratic polynomial px', options: ['For a quadratic polynomial px', 'The Division Algorithm for polynomials', 'Factorisation of a polynomial using', 'Finding HCF and LCM from'] },
            { id: 's4', label: 'Finding HCF and LCM from', prompt: 'Which idea is this? — Finding HCF and LCM from word problems involves translating a real-life situation into a.', answer: 'Finding HCF and LCM from', options: ['Finding HCF and LCM from', 'The Division Algorithm for polynomials', 'Factorisation of a polynomial using', 'For a quadratic polynomial px'] },
            { id: 's5', label: 'The zeros of a polynomial', prompt: 'Which idea is this? — The zeros of a polynomial p(x) are the x-coordinates of the points where the graph of y =.', answer: 'The zeros of a polynomial', options: ['The zeros of a polynomial', 'The Division Algorithm for polynomials', 'Factorisation of a polynomial using', 'For a quadratic polynomial px'] }
          ] } }
    ],
    explore: { component: C10_MathematicsFactorisingPolynomialCompletelySim, prompt: 'Explore the interactive — Finding Zeros of a Polynomial Using Division Algorithm' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_02_009', difficulty: 'standard',
          question: 'The Division Algorithm for polynomials states that for any polynomials \\(p(x)\\).',
          hint: 'Revisit polynomial long division steps in c10_math_cbse_02_008 and quadratic.',
          misconception: 'Students often omit placeholder terms (e.g., writing \\(x^3 - 6x + 5\\) instead of \\(x^3 + 0x^2 - 6x + 5\\)) during long.',
          parts: [
                { id: 'a', prompt: 'Compare the Division Algorithm method with the method of factorising by grouping for the polynomial \\(p(x) = x^3 - 3x^2 - 4x + 12\\).', answer: '**Answer:** - Division Algorithm: Requires a known zero (e.g., \\(x=2\\) by trial)',
                  options: ['**Answer:** - Division Algorithm: Requires a known zero (e.g., \\(x=2\\) by trial)', 'grouping is always easier'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often omit placeholder terms (e.g., writing \\(x^3 - 6x + 5\\) instead of \\(x^3 + 0x^2 - 6x + 5\\)) during long division, causing.' }
          ],
            remediations: { 'students-often-omit-placeholder-terms': { steps: ['List known zero(s).', 'Divide.', 'Find zeros of quotient.', 'Combine ALL zeros." Use a flowchart. 3. **Wrong divisor sign:** Drill the rule: "If zero = \\(\\alpha\\), divisor = \\(x -.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_02_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often omit placeholder terms (e.g., writing \\(x^3 - 6x + 5\\) instead of \\(x^3 + 0x^2 - 6x + 5\\)) during long.',
          parts: [
                { id: 'a', prompt: 'Compare the Division Algorithm method with the method of factorising by grouping for the polynomial \\(p(x) = x^3 - 3x^2 - 4x + 12\\).', answer: '**Answer:** - Division Algorithm: Requires a known zero (e.g., \\(x=2\\) by trial)',
                  options: ['**Answer:** - Division Algorithm: Requires a known zero (e.g., \\(x=2\\) by trial)', 'grouping is always easier'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often omit placeholder terms (e.g., writing \\(x^3 - 6x + 5\\) instead of \\(x^3 + 0x^2 - 6x + 5\\)) during long division, causing.' }
          ],
            remediations: { 'students-often-omit-placeholder-terms': { steps: ['List known zero(s).', 'Divide.', 'Find zeros of quotient.', 'Combine ALL zeros." Use a flowchart. 3. **Wrong divisor sign:** Drill the rule: "If zero = \\(\\alpha\\), divisor = \\(x -.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_02_010', difficulty: 'standard',
          question: 'Factorisation of a polynomial using the division algorithm is the process of.',
          hint: 'If stuck, revisit polynomial long division steps (c10_math_cbse_02_008) and practice.',
          misconception: 'Students often forget to change the sign when writing the divisor from a given zero.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Factorisation of a polynomial using the division algorithm is the process of expressing a',
                  options: ['Factorisation of a polynomial using the division algorithm is the process of expressing a', 'The Division Algorithm for polynomials states that for any polynomials \\(p(x)\\) and', 'For a quadratic polynomial \\(p(x) = ax^2 + bx + c\\) where \\(a \\neq 0\\), if \\(\\alpha\\) and', 'The Division Algorithm for Polynomials states that for any two polynomials \\( p(x) \\) and'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often forget to change the sign when writing the divisor from a given zero.' }
          ],
            remediations: { 'students-often-forget-to-change': { steps: ['If a student makes the sign error in the divisor, remind them: "If \\( x = a \\) is a zero, the factor is \\( (x - a) \\).', 'For \\( x = 3 \\), factor is \\( (x - 3) \\); for \\( x = -2 \\), factor is \\( (x - (-2)) = (x + 2) \\)." For subtraction.', 'Practice with a scaffolded worksheet where the subtraction step is broken into: (1) write product, (2) change signs,.', 'Verify each step by multiplying back.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_02_005', difficulty: 'standard',
          question: 'For a quadratic polynomial \\(p(x) = ax^2 + bx + c\\) where \\(a \\neq 0\\), if.',
          hint: 'Revisit c9_math_ch4_8 (Factorisation of Quadratic Expressions: Splitting the Middle Term).',
          misconception: 'The most frequent board exam error is writing the sum of zeros as \\(b/a\\) instead of \\(-b/a\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'For a quadratic polynomial \\(p(x) = ax^2 + bx + c\\) where \\(a \\neq 0\\), if \\(\\alpha\\) and',
                  options: ['For a quadratic polynomial \\(p(x) = ax^2 + bx + c\\) where \\(a \\neq 0\\), if \\(\\alpha\\) and', 'The Division Algorithm for polynomials states that for any polynomials \\(p(x)\\) and', 'Factorisation of a polynomial using the division algorithm is the process of expressing a', 'The Division Algorithm for Polynomials states that for any two polynomials \\( p(x) \\) and'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'The most frequent board exam error is writing the sum of zeros as \\(b/a\\) instead of \\(-b/a\\).' }
          ],
            remediations: { 'the-most-frequent-board-exam': { steps: ['If a student makes the sign error, take them back to the expansion of \\((x-\\alpha)(x-\\beta)\\).', 'Write it step by step: \\((x-\\alpha)(x-\\beta) = x(x-\\beta) - \\alpha(x-\\beta) = x^2 - \\beta x - \\alpha x + \\alpha\\beta =.', 'Point out the minus sign before \\((\\alpha+\\beta)\\).', 'Then multiply by \\(a\\): \\(a[x^2 - (\\alpha+\\beta)x + \\alpha\\beta] = ax^2 - a(\\alpha+\\beta)x + a\\alpha\\beta\\).'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_02_007', difficulty: 'standard',
          question: 'The Division Algorithm for Polynomials states that for any two polynomials \\(.',
          hint: 'If stuck, revisit integer division algorithm (c6_math_ch01_011) and polynomial.',
          misconception: 'Students treat the Division Algorithm as a computational procedure (long division steps) rather than a structural.',
          parts: [
                { id: 'a', prompt: 'Compare the Division Algorithm for integers and polynomials. Identify two structural similarities and one key difference in how "size" is measured.', answer: '**Correct Answer:** **Similarities:** 1',
                  options: ['**Correct Answer:** **Similarities:** 1', 'size is the coefficient', 'polynomials use the value at x=10'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the Division Algorithm as a computational procedure (long division steps) rather than a structural theorem about existence.' }
          ],
            remediations: { 'students-treat-the-division-algorithm': { steps: ['** Have the student write the Division Algorithm statement from memory, then compare word-for-word with the NCERT.', '** Give a dividend with missing terms (e.g., \\( x^4 - 3x + 2 \\)) and divisor \\( x^2 - 1 \\).', '** Perform the first two steps of long division together on a whiteboard, insisting they write the subtraction row by.', '** After each subtraction, ask: "What is the degree of the new polynomial?', '** Finally, have them verify by computing \\( g(x)q(x) + r(x) \\) and confirming it equals the original \\( p(x) \\).'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the Division Algorithm as a computational procedure (long division steps) rather than a structural.',
          parts: [
                { id: 'a', prompt: 'Compare the Division Algorithm for integers and polynomials. Identify two structural similarities and one key difference in how "size" is measured.', answer: '**Correct Answer:** **Similarities:** 1',
                  options: ['**Correct Answer:** **Similarities:** 1', 'size is the coefficient', 'polynomials use the value at x=10'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the Division Algorithm as a computational procedure (long division steps) rather than a structural theorem about existence.' }
          ],
            remediations: { 'students-treat-the-division-algorithm': { steps: ['** Have the student write the Division Algorithm statement from memory, then compare word-for-word with the NCERT.', '** Give a dividend with missing terms (e.g., \\( x^4 - 3x + 2 \\)) and divisor \\( x^2 - 1 \\).', '** Perform the first two steps of long division together on a whiteboard, insisting they write the subtraction row by.', '** After each subtraction, ask: "What is the degree of the new polynomial?', '** Finally, have them verify by computing \\( g(x)q(x) + r(x) \\) and confirming it equals the original \\( p(x) \\).'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_01_012', difficulty: 'standard',
          question: 'Finding HCF and LCM from word problems involves translating a real-life.',
          hint: 'If stuck, revisit c10_math_cbse_01_002 (HCF and LCM by Prime Factorisation Method) and.',
          misconception: 'Students often see the phrase "greatest number" and automatically choose HCF, or "smallest number" and choose LCM,.',
          parts: [
                { id: 'a', prompt: 'An APPLY level question: Three traffic lights change after 48 seconds, 72 seconds, and 108 seconds respectively.', answer: 'Step 1: Identify numbers: 48, 72, 108',
                  options: ['Step 1: Identify numbers: 48, 72, 108', 'simultaneous repetition', 'maximum grouping'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often see the phrase "greatest number" and automatically choose HCF, or "smallest number" and choose LCM, without reading the.' }
          ],
            remediations: { 'students-often-see-the-phrase': { steps: ['Ask the student to circle the keywords: "divisible by", "leaves remainder", "identical groups", "simultaneously",.', 'Make a decision table: "Divisible by / multiple of / together again" → LCM; "Divides / groups / packs / greatest number.', 'Practice 5 problems where the only task is to write "HCF" or "LCM" and explain why, without computing.', 'Re-attempt the failed problem using the table.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_01_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often see the phrase "greatest number" and automatically choose HCF, or "smallest number" and choose LCM,.',
          parts: [
                { id: 'a', prompt: 'An EVALUATE level question: A student solved: "Find the greatest number of 4 digits exactly divisible by 12, 18, and 24." Their working: LCM of 12, 18, 24 =.', answer: 'Yes, correct',
                  options: ['Yes, correct', 'greatest number', 'divisible by 12, 18, 24'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often see the phrase "greatest number" and automatically choose HCF, or "smallest number" and choose LCM, without reading the.' }
          ],
            remediations: { 'students-often-see-the-phrase': { steps: ['Ask the student to circle the keywords: "divisible by", "leaves remainder", "identical groups", "simultaneously",.', 'Make a decision table: "Divisible by / multiple of / together again" → LCM; "Divides / groups / packs / greatest number.', 'Practice 5 problems where the only task is to write "HCF" or "LCM" and explain why, without computing.', 'Re-attempt the failed problem using the table.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_02_001', difficulty: 'standard',
          question: 'The zeros of a polynomial p(x) are the x-coordinates of the points where the.',
          hint: 'Revisit c9_math_ch1_2 (Plotting Points on the Cartesian Plane) and c9_math_ch2_5 (Graph.',
          misconception: 'Students believe that "number of zeros = degree of polynomial" ALWAYS holds for real zeros.',
          parts: [
                { id: 'a', prompt: 'What are the zeros of the polynomial p(x) = x² - 4, and how many times does the graph of y = x² - 4 intersect the x-axis?', answer: 'The zeros are x = 2 and x = -2 (since x² - 4 = (x-2)(x+2) = 0)',
                  options: ['The zeros are x = 2 and x = -2 (since x² - 4 = (x-2)(x+2) = 0)', 'zero is 4', 'number of zeros = degree of polynomial'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "number of zeros = degree of polynomial" ALWAYS holds for real zeros.' },
                { id: 'b', prompt: 'The graph of a quadratic polynomial y = ax² + bx + c touches the x-axis at exactly one point but does not cross it.', answer: 'The polynomial has exactly ONE real zero (a repeated zero, multiplicity 2)',
                  options: ['The polynomial has exactly ONE real zero (a repeated zero, multiplicity 2)', 'two distinct zeros', 'shows the student doesn\'t connect discriminant to graph behaviour'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "number of zeros = degree of polynomial" ALWAYS holds for real zeros.' },
                { id: 'c', prompt: 'Plot the graph of p(x) = x² + 2x + 5 by calculating at least 5 points. How many real zeros does this polynomial have?', answer: 'Points: x = -3 → 8, x = -2 → 5, x = -1 → 4, x = 0 → 5, x = 1 → 8',
                  options: ['Points: x = -3 → 8, x = -2 → 5, x = -1 → 4, x = 0 → 5, x = 1 → 8', '2 zeros', 'number of zeros = degree of polynomial'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "number of zeros = degree of polynomial" ALWAYS holds for real zeros.' }
          ],
            remediations: { 'number-of-zeros-degree-of': { steps: ['Ask the student to solve x² + 4 = 0 algebraically — they\'ll get x² = -4, no real solution.', 'Have them plot y = x² + 4 for x = -2, -1, 0, 1, 2 — all y-values are positive.', 'Point out: "The graph NEVER touches the x-axis. So how many real zeros? Zero."', 'Contrast with x² - 4 = 0 → (x-2)(x+2) = 0 → two solutions, graph crosses twice.', 'Drill the mantra: "Real zeros = x-intercepts. Count intersections, not degree." Practice with 5 mixed quadratics: some.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "number of zeros = degree of polynomial" ALWAYS holds for real zeros.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The cubic polynomial p(x) = x³ - x has three zeros: -1, 0, 1.', answer: 'The statement is correct FOR THIS polynomial',
                  options: ['The statement is correct FOR THIS polynomial', 'cubics always cross 3 times', 'number of zeros = degree of polynomial', '"number of zeros = degree of polynomial" ALWAYS holds for real zeros'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "number of zeros = degree of polynomial" ALWAYS holds for real zeros.' },
                { id: 'b', prompt: 'Construct a quadratic polynomial whose graph touches the x-axis at x = -3 and passes through the point (0, 9).', answer: '"Touching at x = -3" means repeated zero at x = -3 → polynomial is k(x + 3)²',
                  options: ['"Touching at x = -3" means repeated zero at x = -3 → polynomial is k(x + 3)²', 'number of zeros = degree of polynomial', '"number of zeros = degree of polynomial" ALWAYS holds for real zeros'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "number of zeros = degree of polynomial" ALWAYS holds for real zeros.' }
          ],
            remediations: { 'number-of-zeros-degree-of': { steps: ['Ask the student to solve x² + 4 = 0 algebraically — they\'ll get x² = -4, no real solution.', 'Have them plot y = x² + 4 for x = -2, -1, 0, 1, 2 — all y-values are positive.', 'Point out: "The graph NEVER touches the x-axis. So how many real zeros? Zero."', 'Contrast with x² - 4 = 0 → (x-2)(x+2) = 0 → two solutions, graph crosses twice.', 'Drill the mantra: "Real zeros = x-intercepts. Count intersections, not degree." Practice with 5 mixed quadratics: some.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
