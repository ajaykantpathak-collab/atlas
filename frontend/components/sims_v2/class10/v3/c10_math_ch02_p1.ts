import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch02_p1: SimDef = {
    id: 'v3_c10_math_ch02_p1',
    title: 'Polynomials · Part 1/2',
    subtitle: 'See where curves cross the axis — that\'s where the zeros hide',
    classLevel: 10, subject: 'mathematics', topic: 'Polynomials · Part 1/2',
    chapters: ['c10_math_ch02'],
    nodeIds: ['c10_math_cbse_02_001', 'c10_math_cbse_02_002', 'c10_math_cbse_02_003', 'c10_math_cbse_02_004', 'c10_math_cbse_02_005', 'c10_math_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a curve-reading analyst', intro: 'A wavy line on graph paper is secretly a list of answers: every place it touches the x-axis is a zero of the polynomial. Your job is to read the picture, then check it with algebra.', goal: 'Connect the geometry of polynomial graphs to real zeros, and use the relationships between zeros and coefficients.' },
    discovery: {
        question: 'Graph the polynomial y = x² − 4. It crosses the x-axis at exactly two spots: −2 and +2. A friend claims a cubic MUST cross the axis three times. Your graph of x³ − 2x² + x crosses only twice-ish. Who\'s right?',
        options: ['Neither — a degree-n polynomial can cross AT MOST n times, but sometimes fewer, because zeros can repeat or be non-real', 'The friend — cubics always cross exactly three times', 'You — all cubics cross exactly twice', 'Graphs can\'t tell us anything about zeros at all'],
        answer: 'Neither — a degree-n polynomial can cross AT MOST n times, but sometimes fewer, because zeros can repeat or be non-real',
        hook: 'The x-axis crossings ARE the zeros made visible. A parabola that just kisses the axis has one zero; one that misses it entirely has none — the picture tells you before the algebra does.',
    },
    teaching: [
        { title: 'Geometrical Meaning of Zeros of a Polynomial', text: 'The zeros of a polynomial p(x) are the x-coordinates of the points where the graph of y = p(x) intersects or touches the x-axis.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_02_001', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Read polynomial graphs like an X-ray: count x-axis crossings to find real zeros, then connect those zeros back to the coefficients hiding inside the equation.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_02_001', title: 'Geometrical Meaning of Zeros of a Polynomial',
          scaffold: { problem: 'A rectangular garden has length (x + 5) metres and breadth (x - 2) metres. Its area is given by A(x) = (x + 5)(x - 2) square metres.',
            steps: [
            { text: 'Write the polynomial for area: A(x) = (x + 5)(x - 2) = x² + 3x - 10. The zeros are the x-values where A(x) = 0.' },
            { text: 'Set A(x) = 0 → (x + 5)(x - 2) = 0. Using zero product property: x + 5 = 0 or x - 2 = 0.' },
            { text: 'Solve: x = -5 or x = 2. These are the zeros of the polynomial.' },
            { text: 'Geometric interpretation: On the graph of y = x² + 3x - 10, the points where the curve meets the x-axis are (-5, 0) and.' },
            { text: 'Since the coefficient of x² is positive, the parabola opens upward. It crosses the x-axis at x = -5 and x = 2.', faded: true, blankAnswer: 'Zeros: x = -5 and x = 2. Geometrically: graph of y = x².' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_02_002', title: 'Zeros of Linear Polynomials and the X-Intercept',
          scaffold: { problem: 'The cost (in rupees) of a taxi ride is given by the polynomial C(x) = 15x + 50, where x is the distance travelled in km.',
            steps: [
            { text: 'Identify the polynomial for discounted cost: D(x) = 15x + 30. We need to find x when D(x) = 0.' },
            { text: 'Set the polynomial equal to zero: 15x + 30 = 0.' },
            { text: 'Solve for x by transposing 30 to RHS: 15x = -30.' },
            { text: 'Divide both sides by 15: x = -30/15 = -2.' },
            { text: 'Interpret: x = -2 km. Since distance cannot be negative, this means the discounted ride is never free for any positive.', faded: true, blankAnswer: 'The zero is x = -2 km, which is not physically possible for.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_02_003', title: 'Zeros of Quadratic Polynomials and the Parabola',
          scaffold: { problem: 'A rectangular garden has length 3 metres more than its breadth. The area of the garden is 70 square metres.',
            steps: [
            { text: 'Let the breadth be \\(x\\) metres. Then length = \\(x + 3\\) metres. Area = length × breadth = \\(x(x+3) = 70\\).' },
            { text: 'Form the quadratic equation: \\(x^2 + 3x - 70 = 0\\). Identify \\(a=1, b=3, c=-70\\).' },
            { text: 'Calculate discriminant: \\(D = b^2 - 4ac = 3^2 - 4(1)(-70) = 9 + 280 = 289\\).' },
            { text: 'Apply quadratic formula: \\(x = \\frac{-3 \\pm \\sqrt{289}}{2} = \\frac{-3 \\pm 17}{2}\\).' },
            { text: 'Breadth cannot be negative, so \\(x = 7\\) m. Length = \\(7 + 3 = 10\\) m. Verify: Area = \\(7 \\times 10 = 70\\) m².', faded: true, blankAnswer: 'Breadth = 7 m, Length = 10 m.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_02_004', title: 'Zeros of Cubic Polynomials and Their Graphs',
          scaffold: { problem: 'A civil engineer in Mumbai models the cross-section of a drainage channel by the cubic polynomial h(x) = x³ - 6x² + 9x, where h(x) is the.',
            steps: [
            { text: 'Identify the given polynomial and what is asked. Given: h(x) = x³ - 6x² + 9x.' },
            { text: 'Factorise the cubic to find zeros. h(x) = x(x² - 6x + 9) = x(x - 3)².' },
            { text: 'Determine nature of each zero. x = 0: multiplicity 1 (odd) → graph crosses x-axis.' },
            { text: 'Find key points for sketching. y-intercept: h(0) = 0. Leading coefficient = 1 > 0, degree 3 → as x → +∞, h → +∞.' },
            { text: 'Sketch and interpret. Plot: (0,0) cross, (1,4), (2,2), (3,0) touch, (4,4).', faded: true, blankAnswer: 'Zeros: x = 0 (crosses), x = 3 (touches). Graph crosses.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_02_005', title: 'Relationship Between Zeros and Coefficients of Quadratic Polynomials',
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
        { type: 'scaffold', nodeId: 'c10_math_cbse_02_006', title: 'Relationship Between Zeros and Coefficients of Cubic Polynomials',
          scaffold: { problem: 'A cubic polynomial \\( p(x) = 2x^3 - 5x^2 + kx - 6 \\) has zeros \\( \\alpha, \\beta, \\gamma \\).',
            steps: [
            { text: 'Identify the given polynomial coefficients: \\( a = 2, b = -5, c = k, d = -6 \\).' },
            { text: 'Write the formulas: Sum \\( \\alpha+\\beta+\\gamma = -\\frac{b}{a} \\), Product \\( \\alpha\\beta\\gamma = -\\frac{d}{a} \\).' },
            { text: 'Verify the given sum: \\( -\\frac{b}{a} = -\\frac{-5}{2} = \\frac{5}{2} \\) (matches given).' },
            { text: 'Use the pairwise sum formula: \\( \\alpha\\beta+\\beta\\gamma+\\gamma\\alpha = \\frac{c}{a} = \\frac{k}{2} \\).' },
            { text: 'Identify coefficients: \\( a = 2, b = -9, c = 13, d = -6 \\).' },
            { text: 'Write the three relationships for zeros \\( \\alpha, \\beta, \\gamma \\):' },
            { text: 'Interpret: Sum of dimensions = 4.5 m, Sum of pairwise products = 6.5 m², Product (volume at scaling factor 1) = 3 m³.' },
            { text: 'Verify by finding actual zeros (optional): Factorise polynomial. \\( 2x^3 - 9x^2 + 13x - 6 \\).' },
            { text: 'Answer the question: The volume of the box when scaling factor is 1 is the product of dimensions = 3 cubic metres.', faded: true, blankAnswer: 'Sum of dimensions = 4.5 m, Sum of pairwise products = 6.5.' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_02_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student sells handmade diyas, and her profit in rupees works out to P(x) = -2x² + 24x - 40 for x diyas sold. She graphs it, sees the curve cross the x-axis twice, and a friend says, \'Those crossing points just mean zero profit — useless information.\'',
            decisions: [{ prompt: 'What do the x-intercepts actually tell her?', options: [
                { text: 'They are the break-even sales numbers — the zeros of the polynomial, where P(x) = 0. Solving -2x² + 24x - 40 = 0 gives x = 2 and x = 10: selling fewer than 2 or more than 10 diyas loses money, and between them she is in profit. The x-intercepts of a polynomial\'s graph are precisely its zeros — the most useful points on the whole curve for her.', outcome: 'Zeros are where the graph meets the x-axis — geometrically a crossing, economically the break-even points. The \'useless\' points are actually the ones that answer her question.' },
                { text: 'The friend is right — zeros of a polynomial are just where profit is zero and carry no business meaning.', outcome: 'Zero profit is exactly the break-even threshold — the zeros mark where she crosses from loss to profit and back, which is crucial information.', reveals: 'zeros-are-useless' },
                { text: 'The two crossings mean the equation has no real solution, since a real profit curve shouldn\'t dip below zero.', outcome: 'Crossing the axis twice means the quadratic has two real zeros — the dips below zero are the loss zones, which is why the curve dips at all.', reveals: 'crossings-mean-no-solution' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'Zeros aren\'t just answers — they\'re where the graph lives or misses on the x-axis. Once you see it, sum and product of zeros stop being random formulas.',
            decisions: [{ prompt: 'What comes next? Polynomials · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Polynomials · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_02_001', difficulty: 'standard',
          question: 'The zeros of a polynomial p(x) are the x-coordinates of the points where the.',
          hint: 'Revisit c9_math_ch1_2 (Plotting Points on the Cartesian Plane) and c9_math_ch2_5 (Graph.',
          misconception: 'Students believe that "number of zeros = degree of polynomial" ALWAYS holds for real zeros.',
          parts: [
                { id: 'a', prompt: 'What are the zeros of the polynomial p(x) = x² - 4, and how many times does the graph of y = x² - 4 intersect the x-axis?', answer: 'The zeros are x = 2 and x = -2 (since x² - 4 = (x-2)(x+2) = 0)',
                  options: ['The zeros are x = 2 and x = -2 (since x² - 4 = (x-2)(x+2) = 0)', 'zero is 4', 'number of zeros = degree of polynomial', '"number of zeros = degree of polynomial" ALWAYS holds for real zeros'],
                  hint: 'Revisit c9_math_ch1_2 (Plotting Points on the Cartesian Plane) and c9_math_ch2_5 (Graph of a Linear.',
                  misconception: 'Students believe that "number of zeros = degree of polynomial" ALWAYS holds for real zeros.' },
                { id: 'b', prompt: 'The graph of a quadratic polynomial y = ax² + bx + c touches the x-axis at exactly one point but does not cross it.', answer: 'The polynomial has exactly ONE real zero (a repeated zero, multiplicity 2)',
                  options: ['The polynomial has exactly ONE real zero (a repeated zero, multiplicity 2)', 'two distinct zeros', 'shows the student doesn\'t connect discriminant to graph behaviour', 'number of zeros = degree of polynomial'],
                  hint: 'Revisit c9_math_ch1_2 (Plotting Points on the Cartesian Plane) and c9_math_ch2_5 (Graph of a Linear.',
                  misconception: 'Students believe that "number of zeros = degree of polynomial" ALWAYS holds for real zeros.' },
                { id: 'c', prompt: 'Plot the graph of p(x) = x² + 2x + 5 by calculating at least 5 points. How many real zeros does this polynomial have?', answer: 'Points: x = -3 → 8, x = -2 → 5, x = -1 → 4, x = 0 → 5, x = 1 → 8',
                  options: ['Points: x = -3 → 8, x = -2 → 5, x = -1 → 4, x = 0 → 5, x = 1 → 8', '2 zeros', 'number of zeros = degree of polynomial', '"number of zeros = degree of polynomial" ALWAYS holds for real zeros'],
                  hint: 'Revisit c9_math_ch1_2 (Plotting Points on the Cartesian Plane) and c9_math_ch2_5 (Graph of a Linear.',
                  misconception: 'Students believe that "number of zeros = degree of polynomial" ALWAYS holds for real zeros.' },
                { id: 'd', prompt: 'Compare the graphs of p(x) = (x - 1)(x - 3) and q(x) = -(x - 1)(x - 3). Both have the same zeros. How are their graphs different?', answer: 'Both have zeros at x = 1 and x = 3',
                  options: ['Both have zeros at x = 1 and x = 3', 'graphs are identical', 'number of zeros = degree of polynomial', '"number of zeros = degree of polynomial" ALWAYS holds for real zeros'],
                  hint: 'Revisit c9_math_ch1_2 (Plotting Points on the Cartesian Plane) and c9_math_ch2_5 (Graph of a Linear.',
                  misconception: 'Students believe that "number of zeros = degree of polynomial" ALWAYS holds for real zeros.' }
          ],
            remediations: { 'number-of-zeros-degree-of': { steps: ['Ask the student to solve x² + 4 = 0 algebraically — they\'ll get x² = -4, no real solution.', 'Have them plot y = x² + 4 for x = -2, -1, 0, 1, 2 — all y-values are positive.', 'Point out: "The graph NEVER touches the x-axis. So how many real zeros? Zero."', 'Contrast with x² - 4 = 0 → (x-2)(x+2) = 0 → two solutions, graph crosses twice.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "number of zeros = degree of polynomial" ALWAYS holds for real zeros.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The cubic polynomial p(x) = x³ - x has three zeros: -1, 0, 1.', answer: 'The statement is correct FOR THIS polynomial',
                  options: ['The statement is correct FOR THIS polynomial', 'cubics always cross 3 times', 'number of zeros = degree of polynomial', '"number of zeros = degree of polynomial" ALWAYS holds for real zeros'],
                  hint: 'Revisit c9_math_ch1_2 (Plotting Points on the Cartesian Plane) and c9_math_ch2_5 (Graph of a Linear.',
                  misconception: 'Students believe that "number of zeros = degree of polynomial" ALWAYS holds for real zeros.' },
                { id: 'b', prompt: 'Construct a quadratic polynomial whose graph touches the x-axis at x = -3 and passes through the point (0, 9).', answer: '"Touching at x = -3" means repeated zero at x = -3 → polynomial is k(x + 3)²',
                  options: ['"Touching at x = -3" means repeated zero at x = -3 → polynomial is k(x + 3)²', 'number of zeros = degree of polynomial', '"number of zeros = degree of polynomial" ALWAYS holds for real zeros'],
                  hint: 'Revisit c9_math_ch1_2 (Plotting Points on the Cartesian Plane) and c9_math_ch2_5 (Graph of a Linear.',
                  misconception: 'Students believe that "number of zeros = degree of polynomial" ALWAYS holds for real zeros.' }
          ],
            remediations: { 'number-of-zeros-degree-of': { steps: ['Ask the student to solve x² + 4 = 0 algebraically — they\'ll get x² = -4, no real solution.', 'Have them plot y = x² + 4 for x = -2, -1, 0, 1, 2 — all y-values are positive.', 'Point out: "The graph NEVER touches the x-axis. So how many real zeros? Zero."', 'Contrast with x² - 4 = 0 → (x-2)(x+2) = 0 → two solutions, graph crosses twice.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_02_002', difficulty: 'standard',
          question: 'A zero of a linear polynomial \\(p(x) = ax + b\\) (where \\(a \\neq 0\\)) is the.',
          hint: 'If stuck, review solving linear equations with negative coefficients (Class 7.',
          misconception: 'Students often confuse the zero of the polynomial \\(p(x) = ax + b\\) with the y-intercept of the graph \\(y = ax + b\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A zero of a linear polynomial \\(p(x) = ax + b\\) (where \\(a \\neq 0\\)) is the value of',
                  options: ['A zero of a linear polynomial \\(p(x) = ax + b\\) (where \\(a \\neq 0\\)) is the value of', 'The zeros of a polynomial p(x) are the x-coordinates of the points where the graph of y =', 'The zeros of a quadratic polynomial \\(p(x) = ax^2 + bx + c\\) (where \\(a, b, c \\in', 'A cubic polynomial is a polynomial of degree 3 expressed as p(x) = ax³ + bx² + cx + d,'],
                  hint: 'If stuck, review solving linear equations with negative coefficients (Class 7: c7_math_ch15_006.',
                  misconception: 'Students often confuse the zero of the polynomial \\(p(x) = ax + b\\) with the y-intercept of the graph \\(y = ax + b\\).' }
          ],
            remediations: { 'students-often-confuse-the-zero': { steps: ['Ask the student to write the definitions: "Zero of p(x) is value of x such that p(x)=0" and "X-intercept is point where.', 'Have them solve \\(2x+6=0\\) aloud, emphasizing "set y=0".', 'Have them find y-intercept by setting x=0 in y=2x+6, getting (0,6).', 'Plot both points (-3,0) and (0,6) on graph paper.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_02_003', difficulty: 'standard',
          question: 'The zeros of a quadratic polynomial \\(p(x) = ax^2 + bx + c\\) (where \\(a, b,.',
          hint: 'If stuck, revisit factorization by splitting the middle term (Class 8 algebraic.',
          misconception: 'Students often confuse the discriminant condition for the number of zeros: they think \\(D > 0\\) gives one zero, \\(D.',
          parts: [
                { id: 'a', prompt: 'The graph of \\(y = x^2 - 4x + 4\\) touches the x-axis at exactly one point. Without solving, explain why this happens and give the zero.', answer: 'The polynomial is a perfect square: \\((x-2)^2\\)',
                  options: ['The polynomial is a perfect square: \\((x-2)^2\\)', 'two zeros at 2 and -2'],
                  hint: 'If stuck, revisit factorization by splitting the middle term (Class 8 algebraic identities) and.',
                  misconception: 'Students often confuse the discriminant condition for the number of zeros: they think \\(D > 0\\) gives one zero, \\(D = 0\\) gives two zeros.' },
                { id: 'b', prompt: 'A quadratic polynomial \\(p(x) = ax^2 + bx + c\\) has zeros \\(\\alpha\\) and \\(\\beta\\).', answer: 'Since the parabola opens downward, \\(a < 0\\)',
                  options: ['Since the parabola opens downward, \\(a < 0\\)', '\\(c < 0\\) without justification'],
                  hint: 'If stuck, revisit factorization by splitting the middle term (Class 8 algebraic identities) and.',
                  misconception: 'Students often confuse the discriminant condition for the number of zeros: they think \\(D > 0\\) gives one zero, \\(D = 0\\) gives two zeros.' }
          ],
            remediations: { 'students-often-confuse-the-discriminant': { steps: ['If a student makes the discriminant sign error, have them draw three quick parabolas: one crossing x-axis twice (\\(a>0.', 'Label each with \\(D>0, D=0, D<0\\).', 'Then drill: "Discriminant positive -> two distinct real zeros; zero -> one repeated real zero; negative -> no real.', 'Make them write: "Product = ac = -18, Sum = b = -7.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_02_004', difficulty: 'standard',
          question: 'A cubic polynomial is a polynomial of degree 3 expressed as p(x) = ax³ + bx².',
          hint: 'If stuck, revisit c10_math_cbse_02_009 (Finding Zeros Using Division Algorithm) for.',
          misconception: 'Students believe that a cubic polynomial ALWAYS has exactly 3 distinct x-intercepts (three distinct real zeros).',
          parts: [
                { id: 'a', prompt: 'The graph of y = p(x) touches the x-axis at x = 2 but does not cross it, and crosses the x-axis at x = -1.', answer: 'p(x) = (x - 2)²(x + 1)',
                  options: ['p(x) = (x - 2)²(x + 1)', 'touches but does not cross', 'touching the x-axis', 'crossing the x-axis'],
                  hint: 'If stuck, revisit c10_math_cbse_02_009 (Finding Zeros Using Division Algorithm) for factorisation.',
                  misconception: 'Students believe that a cubic polynomial ALWAYS has exactly 3 distinct x-intercepts (three distinct real zeros).' }
          ],
            remediations: { 'a-cubic-polynomial-always-has': { steps: ['If a student exhibits this misconception, do the following remediation in 4 steps: (1) Give them p(x) = (x - 2)²(x + 1).', 'They will see the graph touches at (2,0) and crosses at (-1,0) — only 2 intercepts.', '(2) Contrast with p(x) = (x - 2)(x + 1)² — touches at -1, crosses at 2.', '(3) Show the algebraic link: multiplicity 2 → factor squared → sign doesn\'t change when crossing the zero (since square.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_02_005', difficulty: 'standard',
          question: 'For a quadratic polynomial \\(p(x) = ax^2 + bx + c\\) where \\(a \\neq 0\\),.',
          hint: 'Revisit c9_math_ch4_8 (Factorisation of Quadratic Expressions: Splitting the Middle Term).',
          misconception: 'The most frequent board exam error is writing the sum of zeros as \\(b/a\\) instead of \\(-b/a\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'For a quadratic polynomial \\(p(x) = ax^2 + bx + c\\) where \\(a \\neq 0\\), if \\(\\alpha\\) and',
                  options: ['For a quadratic polynomial \\(p(x) = ax^2 + bx + c\\) where \\(a \\neq 0\\), if \\(\\alpha\\) and', 'The zeros of a polynomial p(x) are the x-coordinates of the points where the graph of y =', 'A zero of a linear polynomial \\(p(x) = ax + b\\) (where \\(a \\neq 0\\)) is the value of', 'The zeros of a quadratic polynomial \\(p(x) = ax^2 + bx + c\\) (where \\(a, b, c \\in'],
                  hint: 'Revisit c9_math_ch4_8 (Factorisation of Quadratic Expressions: Splitting the Middle Term) and.',
                  misconception: 'The most frequent board exam error is writing the sum of zeros as \\(b/a\\) instead of \\(-b/a\\).' }
          ],
            remediations: { 'the-most-frequent-board-exam': { steps: ['If a student makes the sign error, take them back to the expansion of \\((x-\\alpha)(x-\\beta)\\).', 'Write it step by step: \\((x-\\alpha)(x-\\beta) = x(x-\\beta) - \\alpha(x-\\beta) = x^2 - \\beta x - \\alpha x + \\alpha\\beta.', 'Point out the minus sign before \\((\\alpha+\\beta)\\).', 'Then multiply by \\(a\\): \\(a[x^2 - (\\alpha+\\beta)x + \\alpha\\beta] = ax^2 - a(\\alpha+\\beta)x + a\\alpha\\beta\\).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_02_006', difficulty: 'standard',
          question: 'For a cubic polynomial \\( p(x) = ax^3 + bx^2 + cx + d \\) where \\( a \\neq 0 \\).',
          hint: 'If stuck, revisit the expansion of three binomials (Class 9 algebraic identities) and.',
          misconception: 'Students often write the product of zeros as \\( \\frac{d}{a} \\) (missing the negative sign) because they incorrectly.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'For a cubic polynomial \\( p(x) = ax^3 + bx^2 + cx + d \\) where \\( a \\neq 0 \\), if \\(',
                  options: ['For a cubic polynomial \\( p(x) = ax^3 + bx^2 + cx + d \\) where \\( a \\neq 0 \\), if \\(', 'The zeros of a polynomial p(x) are the x-coordinates of the points where the graph of y =', 'A zero of a linear polynomial \\(p(x) = ax + b\\) (where \\(a \\neq 0\\)) is the value of', 'The zeros of a quadratic polynomial \\(p(x) = ax^2 + bx + c\\) (where \\(a, b, c \\in'],
                  hint: 'If stuck, revisit the expansion of three binomials (Class 9 algebraic identities) and practice.',
                  misconception: 'Students often write the product of zeros as \\( \\frac{d}{a} \\) (missing the negative sign) because they incorrectly extend the quadratic.' }
          ],
            remediations: { 'students-often-write-the-product': { steps: ['Ask the student to expand \\( (x-\\alpha)(x-\\beta)(x-\\gamma) \\) completely, showing each step: first multiply two.', 'Highlight the constant term: \\( (-\\alpha)(-\\beta)(-\\gamma) = -\\alpha\\beta\\gamma \\).', 'Multiply by leading coefficient \\( a \\) to get constant term \\( -a\\alpha\\beta\\gamma \\).', 'Equate to \\( d \\): \\( -a\\alpha\\beta\\gamma = d \\Rightarrow \\alpha\\beta\\gamma = -\\frac{d}{a} \\).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
