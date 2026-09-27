import type { SimDef } from '../../engine/types';

/** v3 generated — c11_app_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_app_ch08_p1: SimDef = {
    id: 'v3_c11_app_ch08_p1',
    title: 'Calculus · Part 1/2',
    subtitle: 'This node covers the *conceptual overview* of Calculus Chapter 8: the big picture.',
    classLevel: 11, subject: 'app', topic: 'Calculus · Part 1/2',
    chapters: ['c11_app_ch08'],
    nodeIds: ['c11_app_cbse_08_001', 'c11_app_cbse_08_002', 'c11_app_cbse_08_003', 'c11_app_cbse_08_004', 'c11_app_cbse_08_005', 'c11_app_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start with a real question: "Your friend\'s bike speedometer shows 40 km/h — but what does that *actually.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Consider the graph of a circle $x^2 + y^2 = 9$. A student claims: "Since for $x=0$ we get only $y=3$ and $y=-3$ (two values), but for $x=3$ we get only $y=0$.',
        options: ['The claim is **incorrect**', 'partial function', 'majority pass'],
        answer: 'The claim is **incorrect**',
        hook: '**"If an equation can be solved for $y$, it is a function of $x$."** Students see $y = x^2$ (function) and $x = y^2$.',
    },
    teaching: [
        { title: 'Introduction', text: 'Calculus is the branch of mathematics that studies continuous change through two fundamental operations: differentiation (measuring instantaneous rate of change) and integration (accumulating.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c11_app_cbse_08_001', title: 'Introduction',
          caseStudy: { intro: 'Start with a real question: "Your friend\'s bike speedometer shows 40 km/h — but what does that *actually mean* at this exact second?" Guide students to realise.',
            decisions: [{ prompt: 'State the definition of a function in your own words, and explain why the vertical line test works to identify functions from graphs.', options: [
                { text: 'A function is a rule that assigns exactly one output to each allowed input', outcome: 'A function is a rule that assigns exactly one output to each allowed input.' },
                { text: 'a function is just an equation with x and y', outcome: 'Not quite — Students believe "limit" means "plug in values closer and closer until you guess the answer".', reveals: 'limit-means-plug-in-values' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_08_002', title: 'Functions',
          scaffold: { problem: 'A Delhi Metro smart card charges a base fare of ₹10 for the first 2 km, and ₹5 for every additional km.',
            steps: [
            { text: 'Identify the rule. For $0 \\leq x \\leq 2$, $F(x) = 10$. For $x > 2$, $F(x) = 10 + 5(x - 2) = 5x$.' },
            { text: 'Verify function condition. For every $x \\geq 0$, the rule gives exactly one fare value. No $x$ has two fares.' },
            { text: 'Evaluate $F(1)$. Since $1 \\leq 2$, $F(1) = 10$. Evaluate $F(5)$. Since $5 > 2$, $F(5) = 5(5) = 25$.' },
            { text: 'Compute $(F+F)(3)$. First, $F(3) = 5(3) = 15$ (since $3 > 2$). Then $(F+F)(3) = F(3) + F(3) = 15 + 15 = 30$.' },
            { text: 'Interpret. The function models a real-world fare structure. The algebra $(F+F)(x) = 2F(x)$ represents scaling for.', faded: true, blankAnswer: '$F(x) = \\begin{cases} 10, & 0 \\leq x \\leq 2 \\\\ 5x, & x > 2.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_08_003', title: 'Graphical representation of functions:',
          scaffold: { problem: 'A projectile is launched from a 20 m high platform in Bhopal with initial vertical velocity 30 m/s.',
            steps: [
            { text: 'Recognize h(t) = −5t² + 30t + 20 is a quadratic (polynomial degree 2) opening downward (coefficient of t² is negative).' },
            { text: 'Find the vertex (maximum point) using t = −b/(2a) with a=−5, b=30 → t = −30/(2×−5) = 3 seconds.' },
            { text: 'Find t-intercept (when it hits ground): solve h(t)=0 → −5t²+30t+20=0 → t²−6t−4=0 → t = [6 ± √(36+16)]/2 = 3 ± √13.' },
            { text: 'Find h-intercept: h(0) = 20. So graph starts at (0,20), rises to (3,65), falls to (3+√13, 0).' },
            { text: 'Domain: [0, 3+√13] (time from launch to landing). Range: [0, 65] (height from ground to max).', faded: true, blankAnswer: '(a) Maximum height = 65 m at t = 3 s. (b) Hits ground at.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_08_004', title: 'Domain and range of a function:',
          scaffold: { problem: 'A rectangular sheet of metal 20 cm by 30 cm has squares of side x cm cut from each corner. The sides are folded up to form an open-top box.',
            steps: [
            { text: 'Identify the dimensions after cutting and folding. Length = 30 - 2x, Breadth = 20 - 2x, Height = x.' },
            { text: 'Write the volume function: V(x) = x(30 - 2x)(20 - 2x) = 4x(15 - x)(10 - x) = 4x³ - 100x² + 600x.' },
            { text: 'Determine the domain from physical constraints. x > 0 (positive cut), 30 - 2x > 0 ⇒ x < 15, 20 - 2x > 0 ⇒ x < 10.' },
            { text: 'Find the range. V(x) is a cubic polynomial on (0,10), continuous, V→0 as x→0⁺ and x→10⁻.' },
            { text: 'Since V is continuous on (0,10) and approaches 0 at both ends with one maximum, range = (0, V_max] ≈ (0, 1056] cm³.', faded: true, blankAnswer: 'V(x) = 4x³ - 100x² + 600x, Domain = (0, 10), Range = (0.' }
            ] } },
        { type: 'case', nodeId: 'c11_app_cbse_08_005', title: 'Types of functions:',
          caseStudy: { intro: 'Start with a real-world question: "Your phone battery drains faster when it\'s low — is that linear, exponential, or something else?" This hooks students into.',
            decisions: [{ prompt: 'State the definition of a rational function and give an example that is NOT a polynomial function. What is the domain of your example?', options: [
                { text: 'A rational function is a function of the form f(x) = p(x)/q(x) where p(x) and q(x) are', outcome: 'A rational function is a function of the form f(x) = p(x)/q(x) where p(x) and q(x) are polynomial.' },
                { text: '|x| = x for all x, and similarly that √(x²) = x', outcome: 'Not quite — Students believe that |x| = x for all x, and similarly that √(x²) = x.', reveals: 'x-x-for-all-x' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_08_006', title: 'Limit of a function:',
          scaffold: { problem: 'A cylindrical tank\'s volume is given by $V(h) = \\pi h^2 (3R - h)/3$ where $R=5$ m is fixed radius and $h$ is water depth.',
            steps: [
            { text: 'Identify the function and point: $V(h) = \\frac{\\pi h^2 (15 - h)}{3}$, find $\\lim_{h \\to 3} V(h)$.' },
            { text: 'Check direct substitution: Polynomials are continuous everywhere, so limit = function value. Substitute $h=3$.' },
            { text: 'Compute $V(3) = \\frac{\\pi (3)^2 (15 - 3)}{3} = \\frac{\\pi \\cdot 9 \\cdot 12}{3} = 36\\pi$.' },
            { text: 'Verify using Algebra of Limits: $\\lim_{h \\to 3} \\frac{\\pi}{3} \\cdot h^2 \\cdot (15-h) = \\frac{\\pi}{3} \\cdot (\\lim h^2).' },
            { text: 'Interpret: The sensor reads "Error" at 3m, but the physical volume is $36\\pi \\approx 113.1 \\text{ m}^3$.', faded: true, blankAnswer: '$36\\pi \\text{ m}^3$ (approx $113.1 \\text{ m}^3$).' }
            ] } },
        { type: 'case', nodeId: 'c11_app_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through Calculus like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? Calculus · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Calculus · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_app_cbse_08_001', difficulty: 'standard',
          question: 'Calculus is the branch of mathematics that studies continuous change through.',
          hint: 'Review "dependent and independent variables" and "plotting graphs of linear equations".',
          misconception: 'Students believe "limit" means "plug in values closer and closer until you guess the answer" — treating it as.',
          parts: [
                { id: 'a', prompt: 'State the definition of a function in your own words, and explain why the vertical line test works to identify functions from graphs.', answer: 'A function is a rule that assigns exactly one output to each allowed input',
                  options: ['A function is a rule that assigns exactly one output to each allowed input', 'a function is just an equation with x and y'],
                  hint: 'Review "dependent and independent variables" and "plotting graphs of linear equations" from Class.',
                  misconception: 'Students believe "limit" means "plug in values closer and closer until you guess the answer" — treating it as a numerical approximation.' },
                { id: 'b', prompt: 'The NCERT text says: "Study of changes tend to be simpler if we study it by considering changes over tiny interval of time (instantaneous) rather than studying.', answer: 'Over the 10-second period, the car\'s speed changes continuously',
                  options: ['Over the 10-second period, the car\'s speed changes continuously', 'tiny intervals are more accurate'],
                  hint: 'Review "dependent and independent variables" and "plotting graphs of linear equations" from Class.',
                  misconception: 'Students believe "limit" means "plug in values closer and closer until you guess the answer" — treating it as a numerical approximation.' }
          ],
            remediations: { 'limit-means-plug-in-values': { steps: ['Return to the *definition*: "lim_{x→a} f(x) = L means: for every tolerance ε > 0, there exists a precision δ > 0 such.', 'Use the "game" analogy: Challenger picks ε (how close f(x) must be to L); Defender must find δ (how close x must be.', 'Walk through f(x) = (x²-4)/(x-2) at x=2: simplify to x+2 (x≠2), then show for any ε, choose δ = ε works — proving the.', 'Contrast with a function where the pattern *fails* (e.g., sin(1/x) at x=0) to show why "looking at values".'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "limit" means "plug in values closer and closer until you guess the answer" — treating it as.',
          parts: [
                { id: 'a', prompt: 'Critique this student claim: "The derivative of f(x) = |x| at x = 0 is 0 because the graph has a sharp corner there and the slope looks flat." Is the reasoning.', answer: 'The claim is invalid',
                  options: ['The claim is invalid', 'looks flat'],
                  hint: 'Review "dependent and independent variables" and "plotting graphs of linear equations" from Class.',
                  misconception: 'Students believe "limit" means "plug in values closer and closer until you guess the answer" — treating it as a numerical approximation.' }
          ],
            remediations: { 'limit-means-plug-in-values': { steps: ['Return to the *definition*: "lim_{x→a} f(x) = L means: for every tolerance ε > 0, there exists a precision δ > 0 such.', 'Use the "game" analogy: Challenger picks ε (how close f(x) must be to L); Defender must find δ (how close x must be.', 'Walk through f(x) = (x²-4)/(x-2) at x=2: simplify to x+2 (x≠2), then show for any ε, choose δ = ε works — proving the.', 'Contrast with a function where the pattern *fails* (e.g., sin(1/x) at x=0) to show why "looking at values".'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_08_002', difficulty: 'standard',
          question: 'A function $f$ from a set $A$ (domain) to a set $B$ (co-domain) is a rule that.',
          hint: 'Review **Cartesian product of sets** and **relations** (Class 11 Maths Chapter 2).',
          misconception: '**"If an equation can be solved for $y$, it is a function of $x$."** Students see $y = x^2$ (function) and $x = y^2$.',
          parts: [
                { id: 'a', prompt: 'The relation $R = \\{(x, y) : y^2 = x, x \\in \\mathbb{R}, y \\in \\mathbb{R}\\}$ is given. Is $R$ a function?', answer: '$R$ is **not a function**',
                  options: ['$R$ is **not a function**', 'yes, because every $x$ gives a $y$'],
                  hint: 'Review **Cartesian product of sets** and **relations** (Class 11 Maths Chapter 2) — specifically.',
                  misconception: '**"If an equation can be solved for $y$, it is a function of $x$."** Students see $y = x^2$ (function) and $x = y^2$ (not a function.' },
                { id: 'b', prompt: 'Consider the graph of a circle $x^2 + y^2 = 9$. A student claims: "Since for $x=0$ we get only $y=3$ and $y=-3$ (two values), but for $x=3$ we get only $y=0$.', answer: 'The claim is **incorrect**',
                  options: ['The claim is **incorrect**', 'partial function', 'majority pass', 'no vertical line cuts the curve more than once'],
                  hint: 'Review **Cartesian product of sets** and **relations** (Class 11 Maths Chapter 2) — specifically.',
                  misconception: '**"If an equation can be solved for $y$, it is a function of $x$."** Students see $y = x^2$ (function) and $x = y^2$ (not a function.' }
          ],
            remediations: { 'if-an-equation-can-be': { steps: ['**Re-anchor to the vending machine:** "If you press \'Cola\' and sometimes get Cola, sometimes get Sprite — is it.', 'A function *must* be reliable for *every* button." 2.', '**Drill the vertical line test physically:** Draw $x=y^2$ on paper.', 'Place a ruler vertically at $x=4$.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_08_003', difficulty: 'standard',
          question: 'Graphical representation of a function is the visual depiction of the set.',
          hint: 'Review "Functions" (c11_app_cbse_08_002) — specifically the vertical line test, function.',
          misconception: 'Students believe that **transforming f(x) to f(x−a) shifts the graph LEFT by a units** (because "minus means left").',
          parts: [
                { id: 'a', prompt: 'The graph of f(x) = √(x + 4) starts at x = −4 and goes rightward.', answer: 'The student is **incorrect**',
                  options: ['The student is **incorrect**', 'minus means left'],
                  hint: 'Review "Functions" (c11_app_cbse_08_002) — specifically the vertical line test, function notation.',
                  misconception: 'Students believe that **transforming f(x) to f(x−a) shifts the graph LEFT by a units** (because "minus means left").' },
                { id: 'b', prompt: 'Sketch the graph of f(x) = |x − 2| + 1 by transforming the graph of y = |x|. Identify the vertex, axis of symmetry, domain, and range.', answer: 'Start with y = |x| (V-shape, vertex at (0,0), symmetry about y-axis)',
                  options: ['Start with y = |x| (V-shape, vertex at (0,0), symmetry about y-axis)', 'minus means left', 'f(x−a) shifts *left* by a, not right'],
                  hint: 'Review "Functions" (c11_app_cbse_08_002) — specifically the vertical line test, function notation.',
                  misconception: 'Students believe that **transforming f(x) to f(x−a) shifts the graph LEFT by a units** (because "minus means left").' },
                { id: 'c', prompt: 'Compare the graphs of f(x) = 2ˣ and g(x) = (1/2)ˣ. How are they related? What does this reveal about exponential functions with bases >1 vs. between 0 and 1?', answer: 'g(x) = (1/2)ˣ = 2⁻ˣ = f(−x)',
                  options: ['g(x) = (1/2)ˣ = 2⁻ˣ = f(−x)', 'they are the same', 'reflected across x-axis', 'minus means left'],
                  hint: 'Review "Functions" (c11_app_cbse_08_002) — specifically the vertical line test, function notation.',
                  misconception: 'Students believe that **transforming f(x) to f(x−a) shifts the graph LEFT by a units** (because "minus means left").' }
          ],
            remediations: { 'transforming-f-x-to-f': { steps: ['**Concrete test:** Have the student pick a simple function (e.g., f(x)=x²) and compute f(0), f(1), f(2).', 'Then compute g(x)=f(x−2) at x=2,3,4: g(2)=f(0)=0, g(3)=f(1)=1, g(4)=f(2)=4.', 'Ask: "Where did the point (0,0) go?', '(3,1)." → **Pattern: every point moves RIGHT by 2.** 2.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_08_004', difficulty: 'standard',
          question: 'The domain of a function is the set of all permissible input values.',
          hint: 'Review solving quadratic inequalities (e.g., x² - 5x + 6 > 0) and rational inequalities.',
          misconception: 'Students believe that for f(x) = √(x²), the domain is x ≥ 0 because "square root requires non-negative input." They.',
          parts: [
                { id: 'a', prompt: 'What is the domain of the function f(x) = 1 / (x² - 5x + 6)? State your answer in set-builder notation.', answer: 'The domain is {x ∈ ℝ | x ≠ 2, x ≠ 3}',
                  options: ['The domain is {x ∈ ℝ | x ≠ 2, x ≠ 3}', 'all real numbers', 'square root requires non-negative input', 'for f(x) = √(x²), the domain is x ≥ 0'],
                  hint: 'Review solving quadratic inequalities (e.g., x² - 5x + 6 > 0) and rational inequalities (e.g.',
                  misconception: 'Students believe that for f(x) = √(x²), the domain is x ≥ 0 because "square root requires non-negative input." They confuse the *input*.' },
                { id: 'b', prompt: 'Explain why the domain of f(x) = √(x - 3) + √(7 - x) is [3, 7] and not (-∞, 7] ∪ [3, ∞). Use the definition of domain for a sum of functions.', answer: 'The domain of a sum f+g is the intersection of the domains of f and g',
                  options: ['The domain of a sum f+g is the intersection of the domains of f and g', 'either radical can handle the input', 'square root requires non-negative input', 'for f(x) = √(x²), the domain is x ≥ 0'],
                  hint: 'Review solving quadratic inequalities (e.g., x² - 5x + 6 > 0) and rational inequalities (e.g.',
                  misconception: 'Students believe that for f(x) = √(x²), the domain is x ≥ 0 because "square root requires non-negative input." They confuse the *input*.' },
                { id: 'c', prompt: 'Find the range of f(x) = (x² + 2x + 3) / (x² + 2x + 4) for x ∈ ℝ. Show all steps.', answer: 'Let y = (x²+2x+3)/(x²+2x+4)',
                  options: ['Let y = (x²+2x+3)/(x²+2x+4)', 'square root requires non-negative input', 'for f(x) = √(x²), the domain is x ≥ 0'],
                  hint: 'Review solving quadratic inequalities (e.g., x² - 5x + 6 > 0) and rational inequalities (e.g.',
                  misconception: 'Students believe that for f(x) = √(x²), the domain is x ≥ 0 because "square root requires non-negative input." They confuse the *input*.' },
                { id: 'd', prompt: 'Compare the domains and ranges of f(x) = log₁₀(x² - 4) and g(x) = 2 log₁₀(x - 2). Are they the same function? Justify.', answer: 'No, they are not the same function',
                  options: ['No, they are not the same function', 'yes, by log properties', 'square root requires non-negative input', 'for f(x) = √(x²), the domain is x ≥ 0'],
                  hint: 'Review solving quadratic inequalities (e.g., x² - 5x + 6 > 0) and rational inequalities (e.g.',
                  misconception: 'Students believe that for f(x) = √(x²), the domain is x ≥ 0 because "square root requires non-negative input." They confuse the *input*.' }
          ],
            remediations: { 'for-f-x-x': { steps: ['Ask the student: "What is the radicand in √(x²)?', 'Have them evaluate √((-3)²) step by step: (-3)² = 9, √9 = 3.', 'Contrast with √x where x = -3: √(-3) is undefined.', 'Generalize: For √(g(x)), the condition is g(x) ≥ 0, not x ≥ 0.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_08_005', difficulty: 'standard',
          question: 'A function f: A → B is a rule that assigns to each element x in the domain.',
          hint: 'Review "Domain and range of a function" (c11_app_cbse_08_004) — practice finding domains.',
          misconception: 'Students believe that |x| = x for all x, and similarly that √(x²) = x.',
          parts: [
                { id: 'a', prompt: 'Given f(x) = |x-3|, find all x such that f(x) = 5. Show your work algebraically using the piecewise definition of modulus.', answer: 'Using |u| = u if u≥0, -u if u<0 with u = x-3: Case 1: x-3 ≥ 0 ⇒ x ≥ 3',
                  options: ['Using |u| = u if u≥0, -u if u<0 with u = x-3: Case 1: x-3 ≥ 0 ⇒ x ≥ 3', '|x| = x for all x, and similarly that √(x²) = x'],
                  hint: 'Review "Domain and range of a function" (c11_app_cbse_08_004) — practice finding domains.',
                  misconception: 'Students believe that |x| = x for all x, and similarly that √(x²) = x. They forget that |x| = -x when x < 0, and √(x²) = |x|, not x.' },
                { id: 'b', prompt: 'Compare the graphs of f(x) = 2^x and g(x) = (1/2)^x. How are they related geometrically?', answer: 'g(x) = (1/2)^x = 2^{-x} = f(-x)',
                  options: ['g(x) = (1/2)^x = 2^{-x} = f(-x)', 'both increase, or asymptotes are different', '|x| = x for all x, and similarly that √(x²) = x'],
                  hint: 'Review "Domain and range of a function" (c11_app_cbse_08_004) — practice finding domains.',
                  misconception: 'Students believe that |x| = x for all x, and similarly that √(x²) = x. They forget that |x| = -x when x < 0, and √(x²) = |x|, not x.' }
          ],
            remediations: { 'x-x-for-all-x': { steps: ['Have the student write the piecewise definition of |x| from memory.', 'Give 5 numerical inputs (e.g., -3, -1, 0, 2, 5) and ask them to compute |x| using the piecewise rule, not intuition.', 'Ask them to solve |x+2| = 4 by splitting into two cases with conditions (x+2≥0 and x+2<0).', 'Graph y=|x| and y=x on the same axes; highlight where they differ.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_08_006', difficulty: 'standard',
          question: 'The limit of a function f(x) as x approaches \'a\' is the unique real number.',
          hint: 'If stuck on the algebra step (factorization/rationalization), immediately revisit Class.',
          misconception: '**Misconception:** "If direct substitution gives $\\frac{0}{0}$, the limit does not exist (or is 0, or is undefined).".',
          parts: [
                { id: 'a', prompt: 'Consider $f(x) = \\frac{|x-3|}{x-3}$. Explain why $\\lim_{x \\to 3} f(x)$ does not exist, even though $f(x)$ is defined for all $x \\neq 3$.', answer: 'For $x < 3$, $|x-3| = -(x-3)$, so $f(x) = -1$ (LHL = -1)',
                  options: ['For $x < 3$, $|x-3| = -(x-3)$, so $f(x) = -1$ (LHL = -1)', 'limit is 0 because numerator and denominator go to 0'],
                  hint: 'If stuck on the algebra step (factorization/rationalization), immediately revisit Class 9/10.',
                  misconception: '**Misconception:** "If direct substitution gives $\\frac{0}{0}$, the limit does not exist (or is 0, or is undefined)." **Why it happens:**.' },
                { id: 'b', prompt: 'Evaluate $\\lim_{x \\to 2} \\frac{x^3 - 8}{x^2 - 4}$ by factorizing. Show all steps clearly.', answer: 'Step 1: Direct substitution gives $\\frac{0}{0}$ (indeterminate)',
                  options: ['Step 1: Direct substitution gives $\\frac{0}{0}$ (indeterminate)', 'limit does not exist'],
                  hint: 'If stuck on the algebra step (factorization/rationalization), immediately revisit Class 9/10.',
                  misconception: '**Misconception:** "If direct substitution gives $\\frac{0}{0}$, the limit does not exist (or is 0, or is undefined)." **Why it happens:**.' },
                { id: 'c', prompt: 'Compare the limits: $\\lim_{x \\to 0} \\frac{\\sin 5x}{x}$ and $\\lim_{x \\to 0} \\frac{\\sin 5x}{3x}$.', answer: 'We know $\\lim_{x \\to 0} \\frac{\\sin kx}{x} = k$',
                  options: ['We know $\\lim_{x \\to 0} \\frac{\\sin kx}{x} = k$', 'both are 1 because $\\sin x \\approx x$'],
                  hint: 'If stuck on the algebra step (factorization/rationalization), immediately revisit Class 9/10.',
                  misconception: '**Misconception:** "If direct substitution gives $\\frac{0}{0}$, the limit does not exist (or is 0, or is undefined)." **Why it happens:**.' }
          ],
            remediations: { 'misconception-if-direct-substitution-gives': { steps: ['**Isolate the "0/0" trigger:** Give the student 5 limit problems where direct substitution yields $\\frac{0}{0}$ but.', 'Force them to *only* write "Indeterminate Form — Factorize/Rationalize/Use Standard Limit" as Step 1, without solving.', '**Contrast Arithmetic vs Calculus:** Explicitly write: "Arithmetic: $0/0$ = Error.', 'Calculus: $0/0$ = \'Try another way\'." Use the analogy: "0/0 is a \'File Corrupted\' error — the data (limit) is there.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
