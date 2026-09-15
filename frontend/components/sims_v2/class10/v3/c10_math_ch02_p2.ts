import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch02_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch02_p2: SimDef = {
    id: 'v3_c10_math_ch02_p2',
    title: 'Polynomials · Part 2/2',
    subtitle: 'See where curves cross the axis — that\'s where the zeros hide',
    classLevel: 10, subject: 'mathematics', topic: 'Polynomials · Part 2/2',
    chapters: ['c10_math_ch02'],
    nodeIds: ['c10_math_cbse_02_007', 'c10_math_cbse_02_008', 'c10_math_cbse_02_009', 'c10_math_cbse_02_010', 'c10_math_cbse_02_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a curve-reading analyst', intro: 'A wavy line on graph paper is secretly a list of answers: every place it touches the x-axis is a zero of the polynomial. Your job is to read the picture, then check it with algebra.', goal: 'Connect the geometry of polynomial graphs to real zeros, and use the relationships between zeros and coefficients.' },
    discovery: {
        question: 'Graph the polynomial y = x² − 4. It crosses the x-axis at exactly two spots: −2 and +2. A friend claims a cubic MUST cross the axis three times. Your graph of x³ − 2x² + x crosses only twice-ish. Who\'s right?',
        options: ['Neither — a degree-n polynomial can cross AT MOST n times, but sometimes fewer, because zeros can repeat or be non-real', 'The friend — cubics always cross exactly three times', 'You — all cubics cross exactly twice', 'Graphs can\'t tell us anything about zeros at all'],
        answer: 'Neither — a degree-n polynomial can cross AT MOST n times, but sometimes fewer, because zeros can repeat or be non-real',
        hook: 'The x-axis crossings ARE the zeros made visible. A parabola that just kisses the axis has one zero; one that misses it entirely has none — the picture tells you before the algebra does.',
    },
    teaching: [
        { title: 'Division Algorithm for Polynomials: Statement and Proof', text: 'The Division Algorithm for Polynomials states that for any two polynomials \\( p(x) \\) and \\( g(x) \\) with \\( g(x) \\neq 0 \\), there exist unique polynomials \\( q(x) \\) (quotient) and \\( r(x) \\).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_02_007', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Read polynomial graphs like an X-ray: count x-axis crossings to find real zeros, then connect those zeros back to the coefficients hiding inside the equation.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_02_007', title: 'Division Algorithm for Polynomials: Statement and Proof',
          scaffold: { problem: 'A rectangular garden has area \\( A(x) = 2x^3 - 5x^2 - 4x + 3 \\) square metres. Its length is \\( L(x) = x - 3 \\) metres.',
            steps: [
            { text: 'Identify dividend \\( p(x) = A(x) = 2x^3 - 5x^2 - 4x + 3 \\) and divisor \\( g(x) = L(x) = x - 3 \\).' },
            { text: 'Set up long division. Write dividend with all terms: \\( 2x^3 - 5x^2 - 4x + 3 \\). Divisor: \\( x - 3 \\).' },
            { text: 'Divide leading term \\( 2x^3 \\) by \\( x \\) → \\( 2x^2 \\) (first term of quotient).' },
            { text: 'Divide new leading term \\( x^2 \\) by \\( x \\) → \\( x \\) (next quotient term). Multiply: \\( (x-3)(x) = x^2 - 3x \\).' },
            { text: 'Divide leading term \\( -x \\) by \\( x \\) → \\( -1 \\) (next quotient term). Multiply: \\( (x-3)(-1) = -x + 3 \\).' },
            { text: 'Quotient \\( B(x) = 2x^2 + x - 1 \\). Remainder \\( r(x) = 0 \\). Verification: \\( (x-3)(2x^2 + x - 1) = 2x^3 + x^2 -.', faded: true, blankAnswer: 'Breadth \\( B(x) = 2x^2 + x - 1 \\) metres, Remainder = 0.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_02_008', title: 'Division Algorithm for Polynomials: Step-by-Step Application',
          scaffold: { problem: 'A rectangular plot has area \\( 6x^3 - 13x^2 - 4x + 15 \\) square metres. If the length is \\( 2x - 3 \\) metres, find the breadth.',
            steps: [
            { text: 'Write dividend \\( 6x^3 - 13x^2 - 4x + 15 \\) and divisor \\( 2x - 3 \\) in standard form (already done).' },
            { text: 'Divide leading term of dividend by leading term of divisor: \\( 6x^3 \\div 2x = 3x^2 \\).' },
            { text: 'Multiply divisor by \\( 3x^2 \\): \\( (2x - 3)(3x^2) = 6x^3 - 9x^2 \\).' },
            { text: 'Subtract: \\( (6x^3 - 13x^2) - (6x^3 - 9x^2) = -4x^2 \\). Bring down the next term \\( -4x \\) to get \\( -4x^2 - 4x \\).' },
            { text: 'Divide new leading term: \\( -4x^2 \\div 2x = -2x \\). Add \\( -2x \\) to quotient.' },
            { text: 'Multiply divisor by \\( -2x \\): \\( (2x - 3)(-2x) = -4x^2 + 6x \\). Write under \\( -4x^2 - 4x \\).' },
            { text: 'Subtract: \\( (-4x^2 - 4x) - (-4x^2 + 6x) = -10x \\). Bring down \\( +15 \\) to get \\( -10x + 15 \\).' },
            { text: 'Divide: \\( -10x \\div 2x = -5 \\). Add \\( -5 \\) to quotient.' },
            { text: 'Multiply divisor by \\( -5 \\): \\( (2x - 3)(-5) = -10x + 15 \\). Write under \\( -10x + 15 \\).' },
            { text: 'Subtract: \\( (-10x + 15) - (-10x + 15) = 0 \\). Remainder is 0.' },
            { text: 'Quotient (breadth) = \\( 3x^2 - 2x - 5 \\) metres.' },
            { text: 'Verification: \\( (2x - 3)(3x^2 - 2x - 5) = 6x^3 - 4x^2 - 10x - 9x^2 + 6x + 15 = 6x^3 - 13x^2 - 4x + 15 \\). Matches area.', faded: true, blankAnswer: 'Breadth = \\( 3x^2 - 2x - 5 \\) metres.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_02_009', title: 'Finding Zeros of a Polynomial Using Division Algorithm',
          scaffold: { problem: '** A cubic polynomial \\(p(x) = 2x^3 - 5x^2 - 4x + 3\\) models the volume (in cubic metres) of a storage box where \\(x\\) is the side length.',
            steps: [
            { text: 'Identify the known zero \\(\\alpha = 3\\). Form the divisor \\(g(x) = x - 3\\).' },
            { text: 'Perform polynomial long division of \\(p(x)\\) by \\(x-3\\).' },
            { text: 'Factorise the quadratic quotient: \\(2x^2 + x - 1 = 2x^2 + 2x - x - 1 = 2x(x+1) -1(x+1) = (2x-1)(x+1)\\).' },
            { text: 'Find zeros of \\(q(x)\\): \\(2x-1=0 \\Rightarrow x = \\frac{1}{2}\\); \\(x+1=0 \\Rightarrow x = -1\\).' },
            { text: 'Combine with the known zero: zeros are \\(3, \\frac{1}{2}, -1\\).', faded: true, blankAnswer: '** Valid dimensions: \\(3\\) m and \\(0.5\\) m (i.e.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_02_010', title: 'Factorisation of Polynomials Using Division Algorithm',
          scaffold: { problem: 'The polynomial \\( p(x) = 2x^3 - 3x^2 - 11x + 6 \\) represents the volume (in cubic cm) of a cuboid where one dimension is \\( (x - 3) \\) cm.',
            steps: [
            { text: 'Identify the known factor. Given zero \\( x = 3 \\) (since dimension \\( x - 3 = 0 \\Rightarrow x = 3 \\)), so \\( (x - 3) \\).' },
            { text: 'Set up polynomial long division: Divide \\( 2x^3 - 3x^2 - 11x + 6 \\) by \\( (x - 3) \\).' },
            { text: 'Perform division:' },
            { text: 'Quotient is \\( 2x^2 + 3x - 2 \\). So \\( p(x) = (x - 3)(2x^2 + 3x - 2) \\).' },
            { text: 'Factorise the quadratic \\( 2x^2 + 3x - 2 \\) by splitting middle term: \\( 2x^2 + 4x - x - 2 = 2x(x + 2) - 1(x + 2) = (x.' },
            { text: 'Complete factorisation: \\( p(x) = (x - 3)(x + 2)(2x - 1) \\).', faded: true, blankAnswer: '\\( (x - 3)(x + 2)(2x - 1) \\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_02_011', title: 'Verifying Zeros and Coefficients Relationship for Given Polynomials',
          scaffold: { problem: 'In a CBSE board exam, a question asks: "Verify that \\(2\\) and \\(-\\frac{1}{3}\\) are the zeros of the quadratic polynomial \\(3x^2 - 5x.',
            steps: [
            { text: 'Identify the given polynomial and its coefficients. Polynomial: \\(3x^2 - 5x - 2\\). So \\(a = 3\\), \\(b = -5\\), \\(c = -2\\).' },
            { text: 'Write down the given zeros. \\(\\alpha = 2\\), \\(\\beta = -\\frac{1}{3}\\).' },
            { text: 'Compute the sum of the given zeros. \\(\\alpha + \\beta = 2 + (-\\frac{1}{3}) = \\frac{6}{3} - \\frac{1}{3} = \\frac{5}{3}\\).' },
            { text: 'Compute the product of the given zeros. \\(\\alpha\\beta = 2 \\times (-\\frac{1}{3}) = -\\frac{2}{3}\\).' },
            { text: 'Compute the coefficient ratios from the polynomial. Sum from coefficients \\(= -\\frac{b}{a} = -\\frac{(-5)}{3}.' },
            { text: 'Compare the two sets of values. Sum from zeros \\(= \\frac{5}{3}\\) matches sum from coefficients \\(= \\frac{5}{3}\\).' },
            { text: 'Write the concluding statement as required by CBSE. "Since both the sum and product of the given zeros match the.', faded: true, blankAnswer: 'Verified. \\(2\\) and \\(-\\frac{1}{3}\\) are zeros of \\(3x^2.' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_02_011', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A student sells handmade diyas, and her profit in rupees works out to P(x) = -2x² + 24x - 40 for x diyas sold. She graphs it, sees the curve cross the x-axis twice, and a friend says, \'Those crossing points just mean zero profit — useless information.\'',
            decisions: [{ prompt: 'What do the x-intercepts actually tell her?', options: [
                { text: 'They are the break-even sales numbers — the zeros of the polynomial, where P(x) = 0. Solving -2x² + 24x - 40 = 0 gives x = 2 and x = 10: selling fewer than 2 or more than 10 diyas loses money, and between them she is in profit. The x-intercepts of a polynomial\'s graph are precisely its zeros — the most useful points on the whole curve for her.', outcome: 'Zeros are where the graph meets the x-axis — geometrically a crossing, economically the break-even points. The \'useless\' points are actually the ones that answer her question.' },
                { text: 'The friend is right — zeros of a polynomial are just where profit is zero and carry no business meaning.', outcome: 'Zero profit is exactly the break-even threshold — the zeros mark where she crosses from loss to profit and back, which is crucial information.', reveals: 'zeros-are-useless' },
                { text: 'The two crossings mean the equation has no real solution, since a real profit curve shouldn\'t dip below zero.', outcome: 'Crossing the axis twice means the quadratic has two real zeros — the dips below zero are the loss zones, which is why the curve dips at all.', reveals: 'crossings-mean-no-solution' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_02_011', title: 'You made it',
          caseStudy: { intro: 'Zeros aren\'t just answers — they\'re where the graph lives or misses on the x-axis. Once you see it, sum and product of zeros stop being random formulas.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_02_007', difficulty: 'standard',
          question: 'The Division Algorithm for Polynomials states that for any two polynomials \\.',
          hint: 'If stuck, revisit integer division algorithm (c6_math_ch01_011) and polynomial.',
          misconception: 'Students treat the Division Algorithm as a computational procedure (long division steps) rather than a structural.',
          parts: [
                { id: 'a', prompt: 'Compare the Division Algorithm for integers and polynomials. Identify two structural similarities and one key difference in how "size" is measured.', answer: '**Correct Answer:** **Similarities:** 1',
                  options: ['**Correct Answer:** **Similarities:** 1', 'size is the coefficient', 'polynomials use the value at x=10'],
                  hint: 'If stuck, revisit integer division algorithm (c6_math_ch01_011) and polynomial multiplication.',
                  misconception: 'Students treat the Division Algorithm as a computational procedure (long division steps) rather than a structural theorem about existence.' }
          ],
            remediations: { 'students-treat-the-division-algorithm': { steps: ['** Have the student write the Division Algorithm statement from memory, then compare word-for-word with the NCERT.', '** Give a dividend with missing terms (e.g., \\( x^4 - 3x + 2 \\)) and divisor \\( x^2 - 1 \\).', '** Perform the first two steps of long division together on a whiteboard, insisting they write the subtraction row.', '** After each subtraction, ask: "What is the degree of the new polynomial?'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_02_008', difficulty: 'standard',
          question: 'The Division Algorithm for polynomials states that for any two polynomials \\.',
          hint: 'If stuck, revisit c9_math_ch4_8 (factorisation of quadratics) to strengthen algebraic.',
          misconception: 'Students often subtract incorrectly during the "subtract and bring down" step by forgetting to distribute the negative.',
          parts: [
                { id: 'a', prompt: 'Compare the long division of \\( p(x) = x^4 - 1 \\) by \\( g(x) = x^2 - 1 \\) with the factorisation \\( x^4 - 1 = (x^2-1)(x^2+1) \\).', answer: 'Long division gives quotient \\( x^2 + 1 \\), remainder \\( 0 \\)',
                  options: ['Long division gives quotient \\( x^2 + 1 \\), remainder \\( 0 \\)', 'remainder is non-zero, or not connecting remainder to factor theorem'],
                  hint: 'If stuck, revisit c9_math_ch4_8 (factorisation of quadratics) to strengthen algebraic manipulation.',
                  misconception: 'Students often subtract incorrectly during the "subtract and bring down" step by forgetting to distribute the negative sign to all terms.' }
          ],
            remediations: { 'students-often-subtract-incorrectly-during': { steps: ['When a student makes the sign-distribution error, immediately stop and isolate the subtraction step.', 'Write the current dividend line and the product line vertically aligned.', 'Circle the minus sign between them.', 'Say: "This minus sign applies to EVERY term in the bottom row.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_02_009', difficulty: 'standard',
          question: 'The Division Algorithm for polynomials states that for any polynomials \\(p(x)\\).',
          hint: 'Revisit polynomial long division steps in c10_math_cbse_02_008 and quadratic.',
          misconception: 'Students often omit placeholder terms (e.g., writing \\(x^3 - 6x + 5\\) instead of \\(x^3 + 0x^2 - 6x + 5\\)) during long.',
          parts: [
                { id: 'a', prompt: 'Compare the Division Algorithm method with the method of factorising by grouping for the polynomial \\(p(x) = x^3 - 3x^2 - 4x + 12\\).', answer: '**Answer:** - Division Algorithm: Requires a known zero (e.g., \\(x=2\\) by trial)',
                  options: ['**Answer:** - Division Algorithm: Requires a known zero (e.g., \\(x=2\\) by trial)', 'grouping is always easier'],
                  hint: 'Revisit polynomial long division steps in c10_math_cbse_02_008 and quadratic factorisation.',
                  misconception: 'Students often omit placeholder terms (e.g., writing \\(x^3 - 6x + 5\\) instead of \\(x^3 + 0x^2 - 6x + 5\\)) during long division, causing.' }
          ],
            remediations: { 'students-often-omit-placeholder-terms': { steps: ['List known zero(s).', 'Divide.', 'Find zeros of quotient.', 'Combine ALL zeros." Use a flowchart. 3. **Wrong divisor sign:** Drill the rule: "If zero = \\(\\alpha\\), divisor = \\(x.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_02_010', difficulty: 'standard',
          question: 'Factorisation of a polynomial using the division algorithm is the process.',
          hint: 'If stuck, revisit polynomial long division steps (c10_math_cbse_02_008) and practice.',
          misconception: 'Students often forget to change the sign when writing the divisor from a given zero.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Factorisation of a polynomial using the division algorithm is the process of expressing a',
                  options: ['Factorisation of a polynomial using the division algorithm is the process of expressing a', 'The zeros of a polynomial p(x) are the x-coordinates of the points where the graph of y =', 'A zero of a linear polynomial \\(p(x) = ax + b\\) (where \\(a \\neq 0\\)) is the value of', 'The zeros of a quadratic polynomial \\(p(x) = ax^2 + bx + c\\) (where \\(a, b, c \\in'],
                  hint: 'If stuck, revisit polynomial long division steps (c10_math_cbse_02_008) and practice dividing.',
                  misconception: 'Students often forget to change the sign when writing the divisor from a given zero.' }
          ],
            remediations: { 'students-often-forget-to-change': { steps: ['If a student makes the sign error in the divisor, remind them: "If \\( x = a \\) is a zero, the factor is \\( (x - a) \\).', 'For \\( x = 3 \\), factor is \\( (x - 3) \\); for \\( x = -2 \\), factor is \\( (x - (-2)) = (x + 2) \\)." For subtraction.', 'Practice with a scaffolded worksheet where the subtraction step is broken into: (1) write product, (2) change signs.', 'Verify each step by multiplying back.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_02_011', difficulty: 'standard',
          question: 'Verifying the zeros-coefficients relationship means substituting the given.',
          hint: 'Revisit the expansion of \\(a(x-\\alpha)(x-\\beta)\\) and \\(a(x-\\alpha)(x-\\beta)(x-\\gamma)\\).',
          misconception: 'Students treat the formulas as \\(\\alpha+\\beta = -b\\) and \\(\\alpha\\beta = c\\) for all quadratics, forgetting the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Verifying the zeros-coefficients relationship means substituting the given zeros of a',
                  options: ['Verifying the zeros-coefficients relationship means substituting the given zeros of a', 'The zeros of a polynomial p(x) are the x-coordinates of the points where the graph of y =', 'A zero of a linear polynomial \\(p(x) = ax + b\\) (where \\(a \\neq 0\\)) is the value of', 'The zeros of a quadratic polynomial \\(p(x) = ax^2 + bx + c\\) (where \\(a, b, c \\in'],
                  hint: 'Revisit the expansion of \\(a(x-\\alpha)(x-\\beta)\\) and \\(a(x-\\alpha)(x-\\beta)(x-\\gamma)\\) in nodes.',
                  misconception: 'Students treat the formulas as \\(\\alpha+\\beta = -b\\) and \\(\\alpha\\beta = c\\) for all quadratics, forgetting the division by leading.' }
          ],
            remediations: { 'students-treat-the-formulas-as': { steps: ['Have the student write the factorised form \\(a(x-\\alpha)(x-\\beta)\\) and expand it to \\(ax^2 - a(\\alpha+\\beta)x.', 'Ask them to compare coefficients with \\(ax^2 + bx + c\\) to see that \\(b = -a(\\alpha+\\beta)\\) and \\(c = a\\alpha\\beta\\).', 'Then rearrange to get \\(\\alpha+\\beta = -b/a\\) and \\(\\alpha\\beta = c/a\\).', 'Practice 5 non-monic quadratics (e.g., \\(3x^2 - 2x - 1\\), \\(5x^2 + 6x + 1\\)) where they must compute \\(-b/a\\) and.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
