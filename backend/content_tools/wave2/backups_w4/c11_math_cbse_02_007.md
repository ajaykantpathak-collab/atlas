## ELI5
A ball thrown from a Mumbai building follows h(t) = -5t² + 20t + 15 - a polynomial function: f(x) = a₀ + a₁x + ... + aₙxⁿ with real coefficients and a non-negative integer degree. Degree 1 is linear, f(x) = mx + c with m ≠ 0; degree 2 is quadratic, f(x) = ax² + bx + c with a ≠ 0. The function view adds what expressions alone lack: domain all of R, a range capped by the vertex, and algebra - polynomials add, multiply and combine like numbers.

## DEFINITION
A polynomial function is a real-valued function \( f: \mathbb{R} \to \mathbb{R} \) defined by \( f(x) = a_0 + a_1x + a_2x^2 + \dots + a_nx^n \) for all \( x \in \mathbb{R} \), where \( n \) is a non-negative integer and \( a_0, a_1, \dots, a_n \in \mathbb{R} \). A linear function is a polynomial function of degree 1: \( f(x) = mx + c \) with \( m \neq 0 \); a quadratic function is a polynomial function of degree 2: \( f(x) = ax^2 + bx + c \) with \( a \neq 0 \).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can identify the degree and coefficients of a polynomial function, determine its domain and range, sketch the graph of linear and quadratic functions using key features (slope, intercepts, vertex, axis of symmetry), and apply the algebra of functions (sum, difference, product, quotient) to combine polynomial functions.

## SCOPE_BOUNDARY
This node covers linear and quadratic polynomial functions as real-valued functions with domain \( \mathbb{R} \) (or subsets thereof), their graphical representation, domain-range analysis, and algebraic operations on them. It does NOT cover cubic or higher-degree polynomials in detail, complex roots, or calculus-based analysis (derivatives, maxima/minima using calculus).

## WALKTHROUGH
Imagine you are tracking the height of a ball thrown upward from a building in Mumbai. The height \( h \) (in metres) after \( t \) seconds follows \( h(t) = -5t^2 + 20t + 15 \). This is a quadratic function — a polynomial of degree 2. Begin by asking: "What type of function is this? What is its degree? What do the coefficients tell us about the ball's motion?" Connect to Class 10 where you solved \( -5t^2 + 20t + 15 = 0 \) to find when the ball hits the ground. Now, in Class 11, we view this as a function \( f: \mathbb{R} \to \mathbb{R} \) with domain all real numbers and range restricted by the vertex. The key insight: every polynomial expression defines a function, but the function perspective adds domain, codomain, range, and algebraic structure (we can add/multiply functions like numbers).

Takeaway: mastery means the degree and coefficients being read off instantly, the domain stated as R, the range derived from the vertex, and graphs sketched through slope, intercepts and axis of symmetry. Exam moves: identify-degree-and-coefficients questions and sketch-linear-quadratic items using the vertex form f(x) = a(x-h)² + k. Check yourself: the ball's -5t² coefficient is gravity's signature - the parabola opens downward. Students miss it because they treat polynomials as expressions to factor, when the definition promotes them to functions: domain, range and combination rules ride along once the arrow is drawn.

## DIAGNOSTIC_QUESTION_1
What is the degree of the polynomial function \( f(x) = 3x^2 - 7x + 2 \)? State the coefficients of \( x^2 \), \( x \), and the constant term.

## DIAGNOSTIC_ANSWER_1
The degree is 2. Coefficients: \( a_2 = 3 \) (for \( x^2 \)), \( a_1 = -7 \) (for \( x \)), \( a_0 = 2 \) (constant term). A wrong answer (e.g., degree 3 or missing the negative sign) reveals the student confuses the highest exponent with the number of terms, or treats coefficients as absolute values ignoring signs.

## DIAGNOSTIC_QUESTION_2
The function \( f(x) = 2x + 5 \) is a linear function. Explain why the condition \( m \neq 0 \) is necessary in the definition \( f(x) = mx + c \). What happens if \( m = 0 \)?

## DIAGNOSTIC_ANSWER_2
If \( m = 0 \), the function becomes \( f(x) = c \), a constant function (degree 0), not a linear function (degree 1). The graph changes from a slanted line to a horizontal line. A wrong answer (e.g., "it's still linear because it's a straight line") reveals the student confuses the geometric shape (line) with the algebraic degree; they miss that "linear" specifically means degree 1, not just "graph is a line."

## DIAGNOSTIC_QUESTION_3
Given \( f(x) = x^2 - 4x + 3 \) and \( g(x) = 2x - 1 \), find \( (f + g)(x) \), \( (f - g)(x) \), and \( (fg)(x) \). State the domain of each resulting function.

## DIAGNOSTIC_ANSWER_3
\( (f+g)(x) = x^2 - 2x + 2 \), domain \( \mathbb{R} \). \( (f-g)(x) = x^2 - 6x + 4 \), domain \( \mathbb{R} \). \( (fg)(x) = (x^2 - 4x + 3)(2x - 1) = 2x^3 - 9x^2 + 10x - 3 \), domain \( \mathbb{R} \). A wrong answer (e.g., incorrect expansion of product, or stating domain excludes values) reveals algebraic manipulation errors (distributive property) or misunderstanding that polynomial functions have domain \( \mathbb{R} \) and their sums/products remain polynomials with domain \( \mathbb{R} \).

## DIAGNOSTIC_QUESTION_4
Compare the graphs of \( f(x) = x^2 \) and \( g(x) = -2x^2 + 4x - 1 \). Identify the transformations (reflection, stretch, translation) that map the graph of \( f \) onto the graph of \( g \). How do the domains and ranges differ?

## DIAGNOSTIC_ANSWER_4
\( g(x) = -2(x-1)^2 + 1 \) (complete the square). Transformations: reflect across x-axis (negative sign), vertical stretch by factor 2, translate right 1 unit, up 1 unit. Domain of both is \( \mathbb{R} \). Range of \( f \) is \( [0, \infty) \); range of \( g \) is \( (-\infty, 1] \). A wrong answer (e.g., missing the reflection or wrong vertex) reveals the student cannot connect algebraic form to graphical transformations or misapplies completing the square.

## DIAGNOSTIC_QUESTION_5
A student claims: "The function \( f(x) = \frac{x^2 - 1}{x - 1} \) is a polynomial function because it simplifies to \( x + 1 \)." Evaluate this claim. Is the student correct? Justify your answer.

## DIAGNOSTIC_ANSWER_5
The student is incorrect. \( f(x) = \frac{x^2 - 1}{x - 1} \) is a rational function, not a polynomial function, because its domain is \( \mathbb{R} \setminus \{1\} \) (denominator cannot be zero). Although it simplifies to \( x+1 \) for \( x \neq 1 \), the functions are not equal — they have different domains. A polynomial function must be defined for all real numbers. A wrong answer reveals confusion between algebraic simplification and function equality (which requires identical domains).

## DIAGNOSTIC_QUESTION_6
Create a real-world problem (Indian context) that can be modeled by a quadratic function \( f(x) = ax^2 + bx + c \) where \( a < 0 \). Define the variables, state the domain restriction based on context, and explain what the vertex represents in your problem.

## DIAGNOSTIC_ANSWER_6
Example: A farmer in Punjab has 100 metres of fencing to build a rectangular enclosure along a river (river side needs no fence). Let \( x \) = width perpendicular to river (metres). Then length parallel to river = \( 100 - 2x \). Area \( A(x) = x(100 - 2x) = -2x^2 + 100x \). Domain: \( 0 < x < 50 \) (width positive, length positive). Vertex at \( x = 25 \) gives maximum area 1250 m². A poor answer (e.g., linear model, no domain restriction, vertex misinterpreted) reveals inability to translate constraints into a quadratic model or connect vertex to optimization.

## COMMON_MISCONCEPTION
Students treat the expression \( f(x) = ax^2 + bx + c \) and the function \( f \) as interchangeable without considering domain. For example, they write the range of \( f(x) = x^2 \) as "all real numbers" because "x² can be any number," ignoring that squares are non-negative. Another error: when finding \( (f/g)(x) \) for \( f(x)=x^2-1, g(x)=x-1 \), they simplify to \( x+1 \) and state domain \( \mathbb{R} \), forgetting \( g(x) \neq 0 \) requires \( x \neq 1 \). The exact wrong step: cancelling factors without carrying forward the domain restriction from the denominator.

## ON_FAILURE
If a student simplifies \( \frac{x^2-1}{x-1} \) to \( x+1 \) and says domain is \( \mathbb{R} \), stop them. Ask: "What is \( g(1) \)?" They'll say 0. Then ask: "Can we divide by \( g(1) \)?" No. So \( x=1 \) is not in the domain of \( f/g \). Show step-by-step: (1) Write domain of \( f \) and \( g \) separately. (2) Domain of \( f/g \) = \( \{x \in \text{dom}(f) \cap \text{dom}(g) : g(x) \neq 0\} \). (3) Simplify expression only after stating domain. (4) Final function: \( (f/g)(x) = x+1, x \neq 1 \). Practice with \( f(x)=x^2-4, g(x)=x+2 \).

## PREREQUISITE_NODE_IDS
c11_math_cbse_02_005, c11_math_cbse_02_006, c10_math_cbse_02_001, c10_math_cbse_02_003, c10_math_cbse_04_007, c9_math_ch2_1, c9_math_ch2_5, c11_math_cbse_02_004

## PREREQUISITE_REASONS
c11_math_cbse_02_005: Functions definition (domain, codomain, image) is essential to understand polynomial functions as a special type of function.
c11_math_cbse_02_006: Identity and constant functions are base cases of polynomial functions (degree 1 and 0).
c10_math_cbse_02_001: Geometrical meaning of zeros connects to x-intercepts of polynomial graphs.
c10_math_cbse_02_003: Zeros of quadratic polynomials and parabola shape directly inform quadratic function graphs.
c10_math_cbse_04_007: Discriminant determines nature of roots, which determines x-intercepts of quadratic function graph.
c9_math_ch2_1: Linear polynomial definition and standard form from Class 9 is the foundation for linear functions.
c9_math_ch2_5: Graph of linear equation in two variables from Class 9 is the graphical representation of linear functions.
c11_math_cbse_02_004: Polynomial functions' domains and ranges are determined using these concepts.  

## FORWARD_NODE_IDS
c11_math_cbse_02_008, c11_math_cbse_02_009, c11_math_cbse_02_010, c11_math_cbse_02_011, c11_math_cbse_02_012, c12_math_cbse_01_003, c12_math_cbse_01_004, c12_math_cbse_05_001, c12_math_cbse_07_003, c12_math_cbse_09_005, c12_math_cbse_09_002

## FORWARD_REASONS
c11_math_cbse_02_008: Rational functions are quotients of polynomial functions; understanding polynomial algebra is prerequisite for rational function domain/operations.
c11_math_cbse_02_009: Greatest integer and signum functions are piecewise-defined; polynomial functions provide the continuous/smooth contrast.
c11_math_cbse_02_010: Algebra of real functions (sum, difference, product, quotient) is explicitly practiced with polynomial functions here and extended to all real functions.
c11_math_cbse_02_011: Graphs of real functions builds on the graphing techniques (intercepts, vertex, symmetry) developed for polynomial functions.
c11_math_cbse_02_012: linear and quadratic polynomial functions are the most common models in word problems.  
c12_math_cbse_01_003: Polynomial functions (linear, quadratic) — standard functions used in injectivity examples.  
c12_math_cbse_01_004: Polynomial functions (linear, quadratic) are standard test cases for onto.  
c12_math_cbse_05_001: Polynomial functions — all polynomials are continuous everywhere.  
c12_math_cbse_07_003: Understanding polynomial functions helps identify degrees and factorability.  
c12_math_cbse_09_005: Polynomial functions are the most common \(g(x)\) and \(h(y)\) in textbook exercises.  
c12_math_cbse_09_002: If stuck, review "Polynomial Functions" from Class 11 (c11_math_cbse_02_007) and "Order of a Differential Equation" (c12_math_cbse_09_001) — practice identifying y', y'', y''' and their powers in 10 mixed equations.  

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_02_003, c11_eco_cbse_02_001
## CROSS_SUBJECT_REASONS
c11_physics_ch2_3: Motion under constant acceleration (free fall, projectile) is modeled by quadratic functions \( s(t) = ut + \frac{1}{2}at^2 \); linear functions model uniform motion.
c11_economics_ch2_1: Cost, revenue, and profit functions in microeconomics are often polynomial (linear cost, quadratic revenue); break-even analysis uses zeros of polynomial functions.
c11_phy_cbse_02_003: Cross-subject support: Instantaneous velocity is the rate of change of position with respect to time at a specifi... supplies tools/facts used directly in this node.  
c11_eco_cbse_02_001: Cross-subject support: A Five Year Plan in India is a comprehensive policy document formulated by the Planning Co... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c10_math_cbse_02_003 -> c11_math_cbse_02_007 -> c11_math_cbse_02_010

## THIS_FORMULA
Linear function: \( f(x) = mx + c \), \( m \neq 0 \), domain \( \mathbb{R} \), range \( \mathbb{R} \). Quadratic function: \( f(x) = ax^2 + bx + c \), \( a \neq 0 \), domain \( \mathbb{R} \), range \( [k, \infty) \) if \( a > 0 \) or \( (-\infty, k] \) if \( a < 0 \) where \( k = f(-b/2a) = c - b^2/(4a) \). Vertex form: \( f(x) = a(x-h)^2 + k \) with vertex \( (h, k) \), \( h = -b/(2a) \).

## FORMULA_VARIABLES
\( m \) = slope (rate of change), \( c \) = y-intercept (initial value), \( a \) = leading coefficient (determines concavity and stretch), \( b \) = linear coefficient, \( c \) = constant term (y-intercept), \( h \) = x-coordinate of vertex (axis of symmetry), \( k \) = y-coordinate of vertex (maximum/minimum value), \( x \) = independent variable (input), \( f(x) \) = dependent variable (output).

## FORMULA_UNITS
Dimensionless for pure mathematics; in applications: \( x \) in metres/seconds/rupees, \( f(x) \) in metres/rupees/kilograms depending on context.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch2_3 | Quadratic function models displacement under constant acceleration: \( s(t) = ut + \frac{1}{2}at^2 \); vertex gives maximum height in projectile motion.
c11_economics_ch2_1 | Profit function \( P(x) = R(x) - C(x) \) where revenue \( R(x) \) and cost \( C(x) \) are often polynomial; quadratic profit functions have maximum at vertex.
c11_chemistry_ch1_2 | Rate of reaction vs concentration can be modeled by polynomial functions in chemical kinetics.

## PREREQ_CONCEPT
Understanding of function definition (domain, codomain, range, unique image) and polynomial expressions (degree, coefficients, zeros) from Class 10.

## PREREQ_BEFORE
Student must be able to: (1) identify a function from a relation, (2) find zeros of quadratic polynomials by factorisation/quadratic formula, (3) complete the square for quadratic expressions, (4) plot points on Cartesian plane.

## PREREQ_STUCK
If stuck, revisit Class 10 Chapter 2 (Polynomials) for zeros and factorisation, and Class 11 Chapter 2 nodes 005-006 for function definition and identity/constant functions.

## WORKED_EXAMPLE_1
PROBLEM: A ball is thrown upward from a 20 m high building in Delhi with initial velocity 15 m/s. The height \( h \) (in metres) after \( t \) seconds is given by \( h(t) = -5t^2 + 15t + 20 \). (a) Write the function in vertex form. (b) Find the maximum height and when it occurs. (c) Find when the ball hits the ground. (d) State the domain and range of \( h \) in this context.
STEPS:
- Step 1: Identify the quadratic function: \( h(t) = -5t^2 + 15t + 20 \). Coefficients: \( a = -5 \), \( b = 15 \), \( c = 20 \). Since \( a < 0 \), parabola opens downward — has a maximum.
- Step 2: Convert to vertex form by completing the square: \( h(t) = -5(t^2 - 3t) + 20 = -5[(t - 1.5)^2 - 2.25] + 20 = -5(t - 1.5)^2 + 11.25 + 20 = -5(t - 1.5)^2 + 31.25 \). Vertex is \( (1.5, 31.25) \).
- Step 3: Maximum height = 31.25 m at \( t = 1.5 \) s. (Vertex \( k \)-value gives max since \( a < 0 \)).
- Step 4: Ball hits ground when \( h(t) = 0 \): \( -5t^2 + 15t + 20 = 0 \) → divide by -5: \( t^2 - 3t - 4 = 0 \) → \( (t-4)(t+1) = 0 \) → \( t = 4 \) (discard \( t = -1 \) as time cannot be negative).
- Step 5: Contextual domain: \( 0 \leq t \leq 4 \). Range: \( 0 \leq h \leq 31.25 \). (Height starts at 20, goes up to 31.25, falls to 0).
REASONING: The vertex form reveals the maximum directly without calculus. The domain restriction comes from physical context (time ≥ 0, height ≥ 0). The range is bounded by the vertex (max) and ground (min).
ANSWER: (a) \( h(t) = -5(t - 1.5)^2 + 31.25 \) (b) Max height 31.25 m at 1.5 s (c) Hits ground at \( t = 4 \) s (d) Domain: \( [0, 4] \), Range: \( [0, 31.25] \)

## WORKED_EXAMPLE_2
PROBLEM: Let \( f(x) = 2x^2 - 3x + 1 \) and \( g(x) = x - 2 \). Find \( (f/g)(x) \) and its domain. Simplify the expression if possible. Evaluate \( (f/g)(3) \).
STEPS:
- Step 1: Write the quotient function: \( (f/g)(x) = \frac{f(x)}{g(x)} = \frac{2x^2 - 3x + 1}{x - 2} \).
- Step 2: Determine domain: \( g(x) \neq 0 \) ⇒ \( x - 2 \neq 0 \) ⇒ \( x \neq 2 \). Also domain of \( f \) and \( g \) is \( \mathbb{R} \). So domain of \( f/g \) is \( \mathbb{R} \setminus \{2\} \).
- Step 3: Attempt to simplify numerator: \( 2x^2 - 3x + 1 = (2x - 1)(x - 1) \). No common factor with \( x - 2 \), so expression does not simplify further.
- Step 4: Evaluate at \( x = 3 \): \( (f/g)(3) = \frac{2(9) - 3(3) + 1}{3 - 2} = \frac{18 - 9 + 1}{1} = \frac{10}{1} = 10 \).
- Step 5: Verify: \( f(3) = 10 \), \( g(3) = 1 \), quotient = 10. Correct.
REASONING: The domain of a quotient function excludes points where the denominator is zero, even if the algebraic expression could be simplified. Here no cancellation occurs, but the domain restriction \( x \neq 2 \) must still be stated explicitly.
ANSWER: \( (f/g)(x) = \frac{2x^2 - 3x + 1}{x - 2} \), domain \( \mathbb{R} \setminus \{2\} \); \( (f/g)(3) = 10 \)

## WORKED_EXAMPLE_3
PROBLEM: A rectangular garden in Bengaluru is to be fenced on three sides (the fourth side is a wall). The total length of fencing available is 60 m. Let \( x \) be the length of each side perpendicular to the wall (in metres). (a) Express the area \( A \) as a function of \( x \). (b) Find the domain of \( A \) in this context. (c) Find the dimensions that maximise the area and the maximum area. (d) If the cost of fencing is ₹150 per metre, write the cost as a function of \( x \) and find the cost for the optimal dimensions.
STEPS:
- Step 1: Draw diagram: wall on one side, two sides of length \( x \) perpendicular to wall, one side parallel to wall of length \( y \). Fencing used: \( 2x + y = 60 \) ⇒ \( y = 60 - 2x \).
- Step 2: Area \( A(x) = x \cdot y = x(60 - 2x) = -2x^2 + 60x \). This is a quadratic function with \( a = -2 < 0 \), so it has a maximum.
- Step 3: Contextual domain: \( x > 0 \) and \( y > 0 \) ⇒ \( 60 - 2x > 0 \) ⇒ \( x < 30 \). So domain: \( (0, 30) \). (Endpoints give zero area).
- Step 4: Find vertex: \( x = -b/(2a) = -60/(2 \times -2) = 15 \). Then \( y = 60 - 2(15) = 30 \). Maximum area \( A(15) = 15 \times 30 = 450 \) m².
- Step 5: Cost function: \( C(x) = 150 \times \text{fencing length} = 150(2x + y) = 150(60) = 9000 \) rupees. Wait — fencing length is fixed at 60 m! So cost is constant ₹9000 regardless of \( x \). (Trick: cost depends on total fencing, not dimensions).
- Step 6: For optimal dimensions (\( x=15, y=30 \)), cost = ₹9000. The area is maximised at 450 m² for this fixed cost.
REASONING: This combines quadratic optimisation (vertex) with a real-world constraint. The cost function turns out to be constant because total fencing is fixed — an important insight: not every quantity varies with \( x \).
ANSWER: (a) \( A(x) = -2x^2 + 60x \) (b) Domain: \( (0, 30) \) (c) Dimensions: 15 m (perpendicular) × 30 m (parallel), Max area = 450 m² (d) Cost function: \( C(x) = 9000 \) (constant), Cost for optimal = ₹9000

## COMPETENCY_QUESTION_1
QUESTION: The function \( f(x) = ax^2 + bx + c \) has vertex at \( (2, -3) \) and passes through \( (0, 1) \). (a) Find \( a, b, c \). (b) Determine the range of \( f \). (c) The function \( g(x) = f(x) + k \) has its minimum value equal to 5. Find \( k \). (d) Is \( h(x) = f(x) \cdot f(-x) \) an even function? Justify.
COMPETENCY: Translating graphical/geometric properties to algebraic form and analyzing function symmetry
STEPS:
- Step 1: Use vertex form \( f(x) = a(x-2)^2 - 3 \). Substitute \( (0,1) \): \( 1 = a(4) - 3 \) ⇒ \( 4a = 4 \) ⇒ \( a = 1 \).
- Step 2: Expand: \( f(x) = (x-2)^2 - 3 = x^2 - 4x + 4 - 3 = x^2 - 4x + 1 \). So \( a=1, b=-4, c=1 \).
- Step 3: Since \( a > 0 \), parabola opens upward. Minimum value = -3 (at vertex). Range: \( [-3, \infty) \).
- Step 4: \( g(x) = f(x) + k \) has minimum \( -3 + k = 5 \) ⇒ \( k = 8 \).
- Step 5: \( f(-x) = x^2 + 4x + 1 \). \( h(x) = (x^2 - 4x + 1)(x^2 + 4x + 1) = (x^2+1)^2 - (4x)^2 = x^4 + 2x^2 + 1 - 16x^2 = x^4 - 14x^2 + 1 \). Check \( h(-x) = (-x)^4 - 14(-x)^2 + 1 = x^4 - 14x^2 + 1 = h(x) \). Yes, \( h \) is even.
ANSWER: (a) \( a=1, b=-4, c=1 \) (b) Range: \( [-3, \infty) \) (c) \( k = 8 \) (d) Yes, \( h(x) \) is even because \( h(-x) = h(x) \) (all powers of x are even).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A company manufacturing eco-friendly bags has fixed cost ₹5000 and variable cost ₹20 per bag. The selling price per bag is \( p(x) = 100 - 0.5x \) where \( x \) is the number of bags produced and sold (demand function). (a) Write the cost function \( C(x) \), revenue function \( R(x) \), and profit function \( P(x) \). (b) Find the break-even points (where profit = 0). (c) Find the production level that maximises profit and the maximum profit. (d) What is the domain of \( P(x) \) in this context? Explain why the mathematical domain differs from the contextual domain.
COMPETENCY: Modeling real-world economics with polynomial functions and interpreting results in context
STEPS:
- Step 1: Cost: \( C(x) = 5000 + 20x \). Revenue: \( R(x) = x \cdot p(x) = x(100 - 0.5x) = 100x - 0.5x^2 \). Profit: \( P(x) = R(x) - C(x) = (100x - 0.5x^2) - (5000 + 20x) = -0.5x^2 + 80x - 5000 \).
- Step 2: Break-even: \( P(x) = 0 \) ⇒ \( -0.5x^2 + 80x - 5000 = 0 \) ⇒ multiply by -2: \( x^2 - 160x + 10000 = 0 \). Discriminant: \( 160^2 - 4(10000) = 25600 - 40000 = -14400 < 0 \). No real roots → no break-even points. The company always makes a loss.
- Step 3: Vertex of \( P(x) \): \( x = -b/(2a) = -80/(2 \times -0.5) = 80 \). Max profit \( P(80) = -0.5(6400) + 80(80) - 5000 = -3200 + 6400 - 5000 = -1800 \). Maximum "profit" is -₹1800 (minimum loss).
- Step 4: Mathematical domain of \( P \) is \( \mathbb{R} \). Contextual domain: \( x \geq 0 \) (can't produce negative bags) and \( p(x) \geq 0 \) ⇒ \( 100 - 0.5x \geq 0 \) ⇒ \( x \leq 200 \). Also \( x \) integer. So contextual domain: \( \{0, 1, 2, \dots, 200\} \).
ANSWER: (a) \( C(x)=5000+20x \), \( R(x)=100x-0.5x^2 \), \( P(x)=-0.5x^2+80x-5000 \) (b) No break-even points (discriminant < 0) (c) Max profit at \( x=80 \) bags, max profit = -₹1800 (minimum loss) (d) Mathematical domain: \( \mathbb{R} \); Contextual domain: \( \{0,1,\dots,200\} \). Mathematical domain includes negative production and prices, which are meaningless.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you are tracking the height of a ball thrown upward from a ______ in Mumbai.

## DIAGNOSTIC_ANSWER_7
building

**A wrong answer ("tower" or "terrace") reveals the student has swapped the walkthrough's launch point - the ball is thrown upward from a building in Mumbai.** Scenario blanks repeat the walkthrough verbatim, so the structure noun is the walkthrough's own choice. Recall the height function h(t) = -5t² + 20t + 15 before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: This is a quadratic function — a polynomial of degree ______.

## DIAGNOSTIC_ANSWER_8
2

**A wrong answer (any other number) reveals the student has drifted from the walkthrough - the height function is a polynomial of degree 2, the t² term deciding it.** The degree is the highest power, so the squared term makes it quadratic. Recall the -5t² term before filling, and give the walkthrough's number exactly as printed there.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can identify the degree and coefficients of a polynomial function, determine its domain and range, sketch the graph of linear and quadratic functions using key features (slope, intercepts, vertex, axis of symmetry), and apply the algebra of functions (sum, difference, product, quotient) to combine polynomial functions.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Imagine you are ______ the height of a ball thrown upward from a building in Mumbai.

## DIAGNOSTIC_ANSWER_10
tracking

**A wrong answer ("watching" or "measuring") reveals the student has paraphrased the walkthrough's participle - the height of the ball is being tracked over time.** Scenario blanks repeat the walkthrough verbatim, so the participle is the walkthrough's own word for the observation in progress. Recall the Mumbai building scene before filling, and fill the verb exactly as written.
