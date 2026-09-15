import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch02_p2: SimDef = {
    id: 'v3_c11_math_ch02_p2',
    title: 'Relations and Functions · Part 2/2',
    subtitle: 'Pair sets carefully — order inside the brackets is the whole meaning.',
    classLevel: 11, subject: 'mathematics', topic: 'Relations and Functions · Part 2/2',
    chapters: ['c11_math_ch02'],
    nodeIds: ['c11_math_cbse_02_007', 'c11_math_cbse_02_008', 'c11_math_cbse_02_009', 'c11_math_cbse_02_010', 'c11_math_cbse_02_011', 'c11_math_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a timetable designer pairing subjects with slots', intro: 'Three subjects, two teachers — how many assignments? The Cartesian product is the systematic way to count and name them all.', goal: 'Compute Cartesian products, respect ordered pairs, and use the cardinality and distributive rules.' },
    discovery: {
        question: 'A = {1, 2}, B = {3, 4}. Both A × B and B × A have four pairs — so they\'re equal?',
        options: ['No — pairs are ordered; (1, 3) and (3, 1) are different objects, so the products differ', 'Yes — sets don\'t care about order', 'Yes — cardinality equality is set equality', 'No — because 1 isn\'t in B'],
        answer: 'No — pairs are ordered; (1, 3) and (3, 1) are different objects, so the products differ',
        hook: 'The outer set is unordered, but each pair inside has a fixed first and second seat — (subject, teacher) is not (teacher, subject).',
    },
    teaching: [
        { title: 'Polynomial Functions: Linear and Quadratic', text: 'A polynomial function is a real-valued function \\( f: \\mathbb{R} \\to \\mathbb{R} \\) defined by \\( f(x) = a_0 + a_1x + a_2x^2 + \\dots + a_nx^n \\) for all \\( x \\in \\mathbb{R} \\), where \\( n \\) is.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_02_007', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'List P × Q for small sets, recover A and B from a given product, and verify the distributive law A × (B ∪ C) by hand.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_02_007', title: 'Polynomial Functions: Linear and Quadratic',
          scaffold: { problem: 'A ball is thrown upward from a 20 m high building in Delhi with initial velocity 15 m/s.',
            steps: [
            { text: 'Identify the quadratic function: \\( h(t) = -5t^2 + 15t + 20 \\). Coefficients: \\( a = -5 \\), \\( b = 15 \\), \\( c = 20 \\).' },
            { text: 'Convert to vertex form by completing the square: \\( h(t) = -5(t^2 - 3t) + 20 = -5[(t - 1.5)^2 - 2.25] + 20 = -5(t.' },
            { text: 'Maximum height = 31.25 m at \\( t = 1.5 \\) s. (Vertex \\( k \\)-value gives max since \\( a < 0 \\)).' },
            { text: 'Ball hits ground when \\( h(t) = 0 \\): \\( -5t^2 + 15t + 20 = 0 \\) → divide by -5: \\( t^2 - 3t - 4 = 0 \\) → \\( (t-4)(t+1).' },
            { text: 'Contextual domain: \\( 0 \\leq t \\leq 4 \\). Range: \\( 0 \\leq h \\leq 31.25 \\).', faded: true, blankAnswer: '(a) \\( h(t) = -5(t - 1.5)^2 + 31.25 \\) (b) Max height 31.25.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_02_008', title: 'Rational and Modulus Functions',
          scaffold: { problem: 'A company\'s average cost per unit (in rupees) for producing x items is given by \\( AC(x) = \\frac{5000 + 20x + 0.5x^2}{x} \\) for \\( x > 0.',
            steps: [
            { text: 'Identify the domain. The denominator is x. Since x > 0 (production quantity), and x ≠ 0, domain is (0, ∞).' },
            { text: 'Simplify the rational function by dividing each term in numerator by x: \\( AC(x) = \\frac{5000}{x} + 20 + 0.5x \\).' },
            { text: 'To find minimum, recognise this as sum of a term and its reciprocal form. Let \\( f(x) = 0.5x + \\frac{5000}{x} \\).' },
            { text: 'Use AM-GM inequality: For positive a, b, \\( a + b \\geq 2\\sqrt{ab} \\). Here \\( a = 0.5x \\), \\( b = \\frac{5000}{x} \\).' },
            { text: 'Equality when \\( 0.5x = \\frac{5000}{x} \\Rightarrow 0.5x^2 = 5000 \\Rightarrow x^2 = 10000 \\Rightarrow x = 100 \\) (since.' },
            { text: 'Minimum average cost = 100 + 20 = ₹120 per unit at production level x = 100 units.', faded: true, blankAnswer: 'Domain: (0, ∞); Simplified: \\( AC(x) = 0.5x + 20.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_02_009', title: 'Signum and Greatest Integer Functions',
          scaffold: { problem: 'A courier company charges ₹50 for the first kilogram and ₹20 for every additional 500 g or part thereof.',
            steps: [
            { text: 'Identify the pricing structure: first 1 kg costs ₹50; beyond that, every 0.5 kg (500 g) or fraction thereof costs ₹20.' },
            { text: 'For weight \\( w > 1 \\) kg, the additional weight is \\( w - 1 \\) kg.' },
            { text: 'Write the piecewise function: \\( C(w) = \\begin{cases} 50, & 0 < w \\le 1 \\\\ 50 + 20[2(w-1)], & w > 1 \\end{cases} \\).' },
            { text: 'For \\( w = 3.2 \\) kg, compute additional units: \\( 2(3.2 - 1) = 2 \\times 2.2 = 4.4 \\). Greatest integer \\( [4.4] = 4 \\).' },
            { text: 'Charge = \\( 50 + 20 \\times 4 = 50 + 80 = ₹130 \\).' },
            { text: 'Verify: 3.2 kg = 1 kg + 2.2 kg. 2.2 kg = 4.4 units of 500 g → 5 units charged?', faded: true, blankAnswer: '\\( C(w) = 50 + 20 \\times (-[-2(w-1)]) \\) for \\( w > 1 \\).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_02_010', title: 'Algebra of Real Functions: Sum, Difference, Product',
          scaffold: { problem: 'A company manufactures pens. The cost function for producing \\(x\\) pens is \\(C(x) = 0.5x^2 + 10x + 500\\) (in rupees).',
            steps: [
            { text: 'Identify the given functions and their domains. \\(C(x) = 0.5x^2 + 10x + 500\\) is a polynomial, domain = \\(\\mathbb{R}\\).' },
            { text: 'The profit function is \\(P(x) = R(x) - C(x)\\). Since both domains are \\(\\mathbb{R}\\), the domain of \\(P\\).' },
            { text: 'Subtract the functions pointwise: \\(P(x) = (30x - 0.2x^2) - (0.5x^2 + 10x + 500)\\).' },
            { text: 'Simplify algebraically: \\(P(x) = 30x - 0.2x^2 - 0.5x^2 - 10x - 500 = -0.7x^2 + 20x - 500\\).' },
            { text: 'Evaluate at \\(x = 100\\): \\(P(100) = -0.7(10000) + 20(100) - 500 = -7000 + 2000 - 500 = -5500\\).' },
            { text: 'Interpret: A loss of ₹5500 occurs at 100 pens. (The negative profit indicates loss.)', faded: true, blankAnswer: '\\(P(x) = -0.7x^2 + 20x - 500\\), domain \\(\\mathbb{R}\\).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_02_011', title: 'Real Functions and Their Graphs',
          scaffold: { problem: 'A Delhi Metro fare system charges ₹10 for the first 2 km, ₹5 per km for the next 3 km, and ₹8 per km thereafter.',
            steps: [
            { text: 'Define the piecewise function from the fare rules. For 0 ≤ d ≤ 2: C(d) = 10 (constant).' },
            { text: 'Verify continuity at boundaries: At d = 2, left: C(2) = 10; right: 5(2) = 10 ✓.' },
            { text: 'Graph each segment. Segment 1 (0 ≤ d ≤ 2): Horizontal line y = 10 from (0,10) to (2,10) — solid dots at both ends.' },
            { text: 'Find fare for 7.5 km: d = 7.5 > 5, so C(7.5) = 8(7.5) - 15 = 60 - 15 = ₹45.' },
            { text: 'Find distance for ₹65 fare: Solve C(d) = 65. Try segment 3: 8d - 15 = 65 → 8d = 80 → d = 10 km. Check: 10 > 5, valid.', faded: true, blankAnswer: 'C(d) = {10 for 0≤d≤2; 5d for 2<d≤5; 8d-15 for d>5}. Fare.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_02_012', title: 'Word Problems: Applications of Functions',
          scaffold: { problem: 'A car rental company in Mumbai charges a flat fee of ₹500 per day plus ₹12 per kilometre driven.',
            steps: [
            { text: 'Identify the independent variable (kilometres driven, \\( k \\)) and dependent variable (total cost \\( C \\) in ₹).' },
            { text: 'Form the function rule: \\( C(k) = 500 + 12k \\).' },
            { text: 'Determine the domain: \\( k \\) cannot be negative; also the car cannot drive infinite km in a day, but without.' },
            { text: 'Use the budget constraint: \\( C(k) \\leq 2000 \\) → \\( 500 + 12k \\leq 2000 \\) → \\( 12k \\leq 1500 \\) → \\( k \\leq 125 \\).' },
            { text: 'Find the range for the domain \\( [0, 125] \\): minimum cost at \\( k=0 \\) is ₹500; maximum at \\( k=125 \\) is ₹2000.', faded: true, blankAnswer: 'Function: \\( C(k) = 500 + 12k \\), domain \\( [0, \\infty) \\).' }
            ] } },
        { type: 'drill', nodeId: 'c11_math_cbse_02_012', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Building a timetable pairing subjects with teachers, a teammate claims: \'A × B and B × A are the same since sets ignore order — (Math, Sharma) equals (Sharma, Math). And both have the same count anyway.\'',
            decisions: [{ prompt: 'Where does his reasoning fail?', options: [
                { text: 'Distinguish the pair from the product: each ordered pair has fixed positions — first from A, second from B — so (Math, Sharma) ≠ (Sharma, Math) as pairs, and A × B ≠ B × A unless A = B. Equal cardinality (n(A)·n(B) both ways) doesn\'t make the sets equal — the members differ. The unordered outer set isn\'t the ordered inner pairs.', outcome: 'He stops double-booking logic: order inside the pair encodes which slot is subject and which is teacher — commutativity fails even when counts match.' },
                { text: 'Accept the equality — both products have pq elements, so they\'re the same set.', outcome: 'Same size, different members: {(1,3),(2,4)} and {(3,1),(4,2)} share no pair — cardinality equality never implies set equality.', reveals: 'same-count-same-product' },
                { text: 'Write the pairs as {a, b} sets instead — braces are the standard set notation.', outcome: 'Braces declare order irrelevance — which is exactly what an ordered pair forbids; (a,b) and (b,a) collapse into one {a,b}.', reveals: 'ordered-pair-as-set' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_02_012', title: 'You made it',
          caseStudy: { intro: 'n(A × B) = n(A) × n(B) — multiplication, not addition; the product is a grid of pairs, not a merger of sets.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_02_007', difficulty: 'standard',
          question: 'A polynomial function is a real-valued function \\( f: \\mathbb{R} \\to \\mathbb{R}.',
          hint: 'If stuck, revisit Class 10 Chapter 2 (Polynomials) for zeros and factorisation, and Class.',
          misconception: 'Students treat the expression \\( f(x) = ax^2 + bx + c \\) and the function \\( f \\) as interchangeable without.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A polynomial function is a real-valued function \\( f: \\mathbb{R} \\to \\mathbb{R} \\)',
                  options: ['A polynomial function is a real-valued function \\( f: \\mathbb{R} \\to \\mathbb{R} \\)', 'The Cartesian product of two non-empty sets A and B, denoted by A × B, is the set of all', 'The Cartesian product of two non-empty sets A and B, denoted A × B, is the set of all', 'A relation R from a non-empty set A to a non-empty set B is a subset of the Cartesian'],
                  hint: 'If stuck, revisit Class 10 Chapter 2 (Polynomials) for zeros and factorisation, and Class 11.',
                  misconception: 'Students treat the expression \\( f(x) = ax^2 + bx + c \\) and the function \\( f \\) as interchangeable without considering domain.' }
          ],
            remediations: { 'students-treat-the-expression-f': { steps: ['If a student simplifies \\( \\frac{x^2-1}{x-1} \\) to \\( x+1 \\) and says domain is \\( \\mathbb{R} \\), stop them.', 'Ask: "What is \\( g(1) \\)?" They\'ll say 0.', 'Then ask: "Can we divide by \\( g(1) \\)?" No.', 'So \\( x=1 \\) is not in the domain of \\( f/g \\).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_008', difficulty: 'standard',
          question: 'A **rational function** is a real-valued function of the form \\( f(x).',
          hint: 'If stuck, revisit c9_math_ch4_8 (Factorisation of Quadratic Expressions) and.',
          misconception: 'Students incorrectly simplify rational functions by cancelling common factors and then state the domain of the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A **rational function** is a real-valued function of the form \\( f(x) = \\frac{p(x)}{q(x)}',
                  options: ['A **rational function** is a real-valued function of the form \\( f(x) = \\frac{p(x)}{q(x)}', 'The Cartesian product of two non-empty sets A and B, denoted by A × B, is the set of all', 'The Cartesian product of two non-empty sets A and B, denoted A × B, is the set of all', 'A relation R from a non-empty set A to a non-empty set B is a subset of the Cartesian'],
                  hint: 'If stuck, revisit c9_math_ch4_8 (Factorisation of Quadratic Expressions) and c11_math_cbse_02_005.',
                  misconception: 'Students incorrectly simplify rational functions by cancelling common factors and then state the domain of the simplified form.' }
          ],
            remediations: { 'students-incorrectly-simplify-rational-functions': { steps: ['Have them factor numerator and denominator completely.', 'Identify values making denominator zero — these are domain exclusions.', 'Cancel common factors algebraically but write the restriction \\( x \\neq a \\) alongside the simplified form.', 'For graphing, plot the simplified function but mark an open circle at the excluded x-value with its y-coordinate from.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_009', difficulty: 'standard',
          question: 'The **signum function** (or sign function) is a real-valued function \\(.',
          hint: 'Revise solving compound inequalities (e.g., \\( 2 \\le 3x-1 < 5 \\)) and plotting points.',
          misconception: 'Students treat \\( [x] \\) as "remove the decimal part" (truncation toward zero), so they write \\( [-2.7] = -2 \\) instead.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The **signum function** (or sign function) is a real-valued function \\( f: \\mathbb{R} \\to',
                  options: ['The **signum function** (or sign function) is a real-valued function \\( f: \\mathbb{R} \\to', 'The Cartesian product of two non-empty sets A and B, denoted by A × B, is the set of all', 'The Cartesian product of two non-empty sets A and B, denoted A × B, is the set of all', 'A relation R from a non-empty set A to a non-empty set B is a subset of the Cartesian'],
                  hint: 'Revise solving compound inequalities (e.g., \\( 2 \\le 3x-1 < 5 \\)) and plotting points with.',
                  misconception: 'Students treat \\( [x] \\) as "remove the decimal part" (truncation toward zero), so they write \\( [-2.7] = -2 \\) instead of the correct \\.' }
          ],
            remediations: { 'students-treat-x-as-remove': { steps: ['Make a table with columns: \\( x \\), \\( [x] \\), \\( \\text{sgn}(x) \\) for \\( x = -3, -2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1.', 'Plot each point on graph paper, using a distinct mark for closed vs open circles.', 'Verbally state the rule: "For negative non-integers, \\( [x] \\) is the next integer to the LEFT on the number line." 4.', 'Practice 5 inequalities of the form \\( [ax+b] = c \\) by converting to \\( c \\le ax+b < c+1 \\) before solving.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_010', difficulty: 'standard',
          question: 'The algebra of real functions defines operations on functions \\(f: X \\to.',
          hint: 'If stuck, revisit finding domains of rational functions (denominator ≠ 0) and square root.',
          misconception: 'Students often incorrectly assume the domain of \\(f+g\\), \\(f-g\\), or \\(fg\\) is the **union** of the domains of \\(f\\).',
          parts: [
                { id: 'a', prompt: 'Explain why the domain of \\(\\frac{f}{g}\\) is not simply the intersection of domains of \\(f\\) and \\(g\\).', answer: 'The domain of \\(\\frac{f}{g}\\) must also exclude points where \\(g(x)=0\\)',
                  options: ['The domain of \\(\\frac{f}{g}\\) must also exclude points where \\(g(x)=0\\)', 'where at least one function is defined', 'where both are defined'],
                  hint: 'If stuck, revisit finding domains of rational functions (denominator ≠ 0) and square root functions.',
                  misconception: 'Students often incorrectly assume the domain of \\(f+g\\), \\(f-g\\), or \\(fg\\) is the **union** of the domains of \\(f\\) and \\(g\\) instead.' },
                { id: 'b', prompt: 'Two functions \\(f\\) and \\(g\\) have domains \\(\\text{dom}(f) = [-1, 5]\\) and \\(\\text{dom}(g) = [0, 6]\\). The function \\(h = f - g\\) is defined.', answer: 'No, it is not possible',
                  options: ['No, it is not possible', 'where at least one function is defined', 'where both are defined'],
                  hint: 'If stuck, revisit finding domains of rational functions (denominator ≠ 0) and square root functions.',
                  misconception: 'Students often incorrectly assume the domain of \\(f+g\\), \\(f-g\\), or \\(fg\\) is the **union** of the domains of \\(f\\) and \\(g\\) instead.' }
          ],
            remediations: { 'students-often-incorrectly-assume-the': { steps: ['If a student uses union instead of intersection for domains, do this: 1) Write the domains of \\(f\\) and \\(g\\) as sets.', '2) Ask: "For \\(f+g\\) to make sense at \\(x\\), must \\(f(x)\\) exist?', 'Must \\(g(x)\\) exist?" 3) Highlight that if either is undefined, the sum is undefined.', '4) Show the intersection visually as the overlap region.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often incorrectly assume the domain of \\(f+g\\), \\(f-g\\), or \\(fg\\) is the **union** of the domains of \\(f\\).',
          parts: [
                { id: 'a', prompt: 'A student claims that for any two real functions \\(f\\) and \\(g\\), \\((f+g)(x) = (g+f)(x)\\) and \\((f-g)(x) = (g-f)(x)\\).', answer: 'The first statement is true: addition of functions is commutative',
                  options: ['The first statement is true: addition of functions is commutative', 'where at least one function is defined', 'where both are defined'],
                  hint: 'If stuck, revisit finding domains of rational functions (denominator ≠ 0) and square root functions.',
                  misconception: 'Students often incorrectly assume the domain of \\(f+g\\), \\(f-g\\), or \\(fg\\) is the **union** of the domains of \\(f\\) and \\(g\\) instead.' },
                { id: 'b', prompt: 'Construct two different real functions \\(f\\) and \\(g\\) such that \\((fg)(x) = x^2 - 9\\) and \\(\\text{dom}(f) \\cap \\text{dom}(g) = \\mathbb{R}\\).', answer: 'Example: \\(f(x) = x+3\\), \\(g(x) = x-3\\)',
                  options: ['Example: \\(f(x) = x+3\\), \\(g(x) = x-3\\)', 'where at least one function is defined', 'where both are defined'],
                  hint: 'If stuck, revisit finding domains of rational functions (denominator ≠ 0) and square root functions.',
                  misconception: 'Students often incorrectly assume the domain of \\(f+g\\), \\(f-g\\), or \\(fg\\) is the **union** of the domains of \\(f\\) and \\(g\\) instead.' }
          ],
            remediations: { 'students-often-incorrectly-assume-the': { steps: ['If a student uses union instead of intersection for domains, do this: 1) Write the domains of \\(f\\) and \\(g\\) as sets.', '2) Ask: "For \\(f+g\\) to make sense at \\(x\\), must \\(f(x)\\) exist?', 'Must \\(g(x)\\) exist?" 3) Highlight that if either is undefined, the sum is undefined.', '4) Show the intersection visually as the overlap region.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_011', difficulty: 'standard',
          question: 'A real function is a rule that assigns to each real number x in its domain.',
          hint: 'If stuck, review c9_math_ch1_1 (Cartesian Coordinate System) and c9_math_ch2_5 (Graph.',
          misconception: 'Students incorrectly graph the greatest integer function f(x) = [x] by drawing solid dots at both ends of each.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A real function is a rule that assigns to each real number x in its domain exactly one',
                  options: ['A real function is a rule that assigns to each real number x in its domain exactly one', 'The Cartesian product of two non-empty sets A and B, denoted by A × B, is the set of all', 'The Cartesian product of two non-empty sets A and B, denoted A × B, is the set of all', 'A relation R from a non-empty set A to a non-empty set B is a subset of the Cartesian'],
                  hint: 'If stuck, review c9_math_ch1_1 (Cartesian Coordinate System) and c9_math_ch2_5 (Graph of Linear.',
                  misconception: 'Students incorrectly graph the greatest integer function f(x) = [x] by drawing solid dots at both ends of each horizontal segment, e.g.,.' }
          ],
            remediations: { 'students-incorrectly-graph-the-greatest': { steps: ['Have the student write the definition: [x] = greatest integer ≤ x.', 'Test specific values: [1.2] = 1, [1] = 1, [0.999] = 0, [-0.5] = -1, [-1] = -1.', 'Plot these points on a number line, then on Cartesian plane.', 'For interval [1, 2), every x gives y = 1 → horizontal line at y = 1 from x = 1 (included, solid dot) to x = 2.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_012', difficulty: 'standard',
          question: 'A word problem on applications of functions requires translating a real-world.',
          hint: 'Revisit c11_math_cbse_02_005 (function definition) and c9_math_ch2_10 (linear equation.',
          misconception: 'Students often write the function rule correctly but forget to restrict the domain based on the physical context.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A word problem on applications of functions requires translating a real-world scenario',
                  options: ['A word problem on applications of functions requires translating a real-world scenario', 'The Cartesian product of two non-empty sets A and B, denoted by A × B, is the set of all', 'The Cartesian product of two non-empty sets A and B, denoted A × B, is the set of all', 'A relation R from a non-empty set A to a non-empty set B is a subset of the Cartesian'],
                  hint: 'Revisit c11_math_cbse_02_005 (function definition) and c9_math_ch2_10 (linear equation word.',
                  misconception: 'Students often write the function rule correctly but forget to restrict the domain based on the physical context.' }
          ],
            remediations: { 'students-often-write-the-function': { steps: ['If a student misses domain restrictions: 1) Ask them to list what the variable represents in real life (e.g., "number.', '2) Have them write down what values are physically impossible (negative, fractional people).', '3) Show how the graph would look if they used the wrong domain (continuous line vs discrete points).', 'For the "part thereof" error: 1) Give a concrete example: 1.2 km should cost the same as 2 km.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
