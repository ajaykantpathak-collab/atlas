## ELI5
A Metro fare is fixed base plus per-kilometre charge: f(x) = fixed + rate × x, distance the independent variable, total fare the dependent one. A word problem on applications of functions is exactly this translation - identify what changes together, name the rule f: A → B, and let the context set the domain: distance never negative, routes never endless. Then evaluate forward for fares or invert for distances, and answer in the original units. Every story hides a rule; the domain is its fine print.

## DEFINITION
A word problem on applications of functions requires translating a real-world scenario into a mathematical function \( f: A \to B \) where \( A \) (domain) and \( B \) (codomain) are subsets of real numbers, such that each input (independent variable) has exactly one output (dependent variable). The solution involves identifying the rule \( f(x) \), determining its domain from contextual constraints, and using the function to find unknown values or interpret the relationship.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can independently convert a descriptive real-world situation (involving costs, distances, temperatures, etc.) into a properly defined function with explicit domain and range, evaluate the function for given inputs, solve for inputs given outputs, and interpret the results in the original context using correct units.

## SCOPE_BOUNDARY
Covers word problems that lead to real-valued functions (linear, quadratic, rational, piecewise-defined including modulus/greatest integer) with domain restrictions arising from physical constraints. Does NOT cover problems requiring calculus (derivatives/integrals) or functions of more than one independent variable.

## WALKTHROUGH
Imagine a Delhi Metro commuter who pays a fixed base fare plus an additional charge per kilometre. This is a classic "fixed + variable" situation. Start by asking: "What are the two quantities that change together?" Identify the independent variable (distance travelled in km) and dependent variable (total fare in ₹). Write down the fixed and variable parts from the problem statement. Then express the total fare as a function \( f(x) = \text{fixed} + \text{variable} \times x \). Determine the domain: distance cannot be negative, and there may be a maximum route length. This connects directly to the linear functions studied in c11_math_cbse_02_007 and the algebra of functions in c11_math_cbse_02_010. The key insight is that every word problem hides a function rule; your job is to uncover it and respect its domain.

Takeaway: mastery means the fixed-plus-variable skeleton being recognised, the domain being clipped by context - no negative distances, no rides past the last station - and answers returning with units. Exam moves: convert-situation-to-function questions and solve-for-input items where an output is given. Check yourself: the commuter's bill is f(distance), never distance(f) - direction of the arrow matters. Students miss it because they write the right rule on the wrong domain, when the definition demands both: the rule says how, the domain says where, and the units say in what language.

## DIAGNOSTIC_QUESTION_1
Define a function \( f(x) \) that represents the total cost \( C \) (in rupees) of buying \( x \) notebooks if each notebook costs ₹12 and there is a fixed packaging charge of ₹5 per order. State the domain of this function in the context of the problem.

## DIAGNOSTIC_ANSWER_1
The function is \( f(x) = 12x + 5 \). The domain is the set of positive integers \( \{1, 2, 3, \dots\} \) because you cannot buy a negative or fractional number of notebooks in this context. A wrong answer like \( f(x) = 12x \) (missing the fixed charge) or domain \( \mathbb{R} \) (ignoring that \( x \) must be a positive integer) reveals the student cannot distinguish between variable and fixed components or does not apply contextual constraints to the domain.

## DIAGNOSTIC_QUESTION_2
A function \( g(t) = 50 - 4.9t^2 \) gives the height (in metres) of a ball thrown upward from a 50 m building after \( t \) seconds. Explain why the domain of \( g \) in this physical situation is NOT all real numbers, and find the largest possible domain.

## DIAGNOSTIC_ANSWER_2
The domain is restricted because time \( t \) cannot be negative, and the ball stops when it hits the ground (height = 0). Solving \( 50 - 4.9t^2 = 0 \) gives \( t \approx 3.19 \) s. So the domain is \( [0, \sqrt{50/4.9}] \approx [0, 3.19] \). If a student says the domain is \( \mathbb{R} \) or \( [0, \infty) \), they are ignoring the physical constraint that the ball cannot go below ground; they are treating the formula as an abstract polynomial without connecting it to the real-world event it models.

## DIAGNOSTIC_QUESTION_3
A taxi charges ₹25 for the first kilometre and ₹12 for each additional kilometre. Write the piecewise function \( C(x) \) for the fare when \( x \) km are travelled (\( x > 0 \)). Calculate the fare for a 4.5 km trip.

## DIAGNOSTIC_ANSWER_3
For \( 0 < x \leq 1 \), \( C(x) = 25 \). For \( x > 1 \), \( C(x) = 25 + 12 \times \lceil x-1 \rceil \) if charging per started km, but typically in such problems we assume proportional for fractional km: \( C(x) = 25 + 12(x-1) = 12x + 13 \). For 4.5 km: \( C(4.5) = 12 \times 4.5 + 13 = 54 + 13 = ₹67 \). A common error is to use \( C(x) = 25 + 12x \) (charging ₹12 for the first km as well) or to forget the piecewise nature and apply the second rule for all \( x \). This shows the student does not recognise that the pricing rule changes at the 1 km boundary.

## DIAGNOSTIC_QUESTION_4
Compare the two functions: \( f(x) = 2x + 10 \) (cost of a gym membership with ₹10 registration + ₹2 per visit) and \( g(x) = 5x \) (pay-per-visit at ₹5). Determine the number of visits for which the membership becomes cheaper. Explain how the domain affects the answer.

## DIAGNOSTIC_ANSWER_4
Set \( 2x + 10 < 5x \) → \( 10 < 3x \) → \( x > 10/3 \approx 3.33 \). Since visits are whole numbers, membership is cheaper for \( x \geq 4 \) visits. Domain is positive integers. If a student solves \( 2x+10 = 5x \) and gets \( x = 3.33 \) but says "3 visits" or "3.33 visits", they have not considered that the domain is discrete (number of visits must be integer) and that the inequality must be checked at integer points. This reveals a gap in connecting the algebraic solution back to the contextual domain.

## DIAGNOSTIC_QUESTION_5
A student solves the problem: "The temperature in Celsius \( C \) and Fahrenheit \( F \) are related by \( F = \frac{9}{5}C + 32 \). Find the temperature where both scales read the same." Their working: \( C = \frac{9}{5}C + 32 \) → \( -\frac{4}{5}C = 32 \) → \( C = -40 \). They conclude: "The temperature is -40°F." Evaluate if this conclusion is fully correct and justify.

## DIAGNOSTIC_ANSWER_5
The conclusion is incomplete. The temperature where both scales read the same is -40°, meaning -40°C = -40°F. The student found \( C = -40 \) but then wrote "-40°F" without stating that this is also the Celsius value. A fully correct answer: "At -40°, both scales show the same reading: -40°C = -40°F." If the student only gives one unit, they have not interpreted the equality of the two functions \( f(C) = \frac{9}{5}C+32 \) and \( g(C)=C \) at the intersection point. This shows they can solve the equation but miss the physical meaning of the solution.

## DIAGNOSTIC_QUESTION_6
Create a real-world word problem (Indian context) that leads to a piecewise-defined function involving the greatest integer function \( [x] \). Define the function, state its domain, and give one example of evaluating it.

## DIAGNOSTIC_ANSWER_6
Example problem: "A courier service charges ₹30 for the first 500 g and ₹10 for every additional 500 g or part thereof. Write the cost function \( C(w) \) for a parcel of weight \( w \) grams (\( w > 0 \))." Function: \( C(w) = 30 + 10 \left[ \frac{w-1}{500} \right] \) for \( w > 0 \), with domain \( (0, \infty) \). For \( w = 1200 \) g: \( \frac{1199}{500} = 2.398 \), greatest integer = 2, cost = 30 + 20 = ₹50. A poor answer would use a linear function without the greatest integer part, or define the domain incorrectly (e.g., only multiples of 500). This reveals the student cannot identify situations where charges jump at discrete intervals and require the greatest integer function.

## COMMON_MISCONCEPTION
Students often write the function rule correctly but forget to restrict the domain based on the physical context. For example, in a problem where \( x \) represents the number of items produced, they give the domain as \( \mathbb{R} \) or \( [0, \infty) \) instead of non-negative integers. Another specific error: when a problem says "₹10 for every additional kilometre or part thereof", students write \( f(x) = 10x \) instead of using the ceiling/greatest integer function to capture "part thereof". They treat discrete jumps as continuous.

## ON_FAILURE
If a student misses domain restrictions: 1) Ask them to list what the variable represents in real life (e.g., "number of people", "length of cloth"). 2) Have them write down what values are physically impossible (negative, fractional people). 3) Show how the graph would look if they used the wrong domain (continuous line vs discrete points). For the "part thereof" error: 1) Give a concrete example: 1.2 km should cost the same as 2 km. 2) Make a table: distance 1, 1.1, 1.5, 2, 2.1 km and compute cost manually. 3) Ask which mathematical function gives that jump pattern – introduce the greatest integer/ceiling function. 4) Practice converting "or part thereof" to \( \lceil x \rceil \) or \( [x-1]+1 \).

## PREREQUISITE_NODE_IDS
c11_math_cbse_02_005, c11_math_cbse_02_007, c11_math_cbse_02_008, c11_math_cbse_02_009, c11_math_cbse_02_010, c11_math_cbse_02_011, c6_math_ch05_058, c7_math_ch15_007, c8_math_ch13_10, c9_math_ch2_10, c10_math_cbse_03_012, c11_math_cbse_02_004, c11_math_cbse_02_006

## PREREQUISITE_REASONS
c11_math_cbse_02_005: understanding the definition of a function is essential to verify that the word problem yields a valid function.
c11_math_cbse_02_007: linear and quadratic polynomial functions are the most common models in word problems.
c11_math_cbse_02_008: rational and modulus functions appear in problems with rates, concentrations, or absolute distances.
c11_math_cbse_02_009: greatest integer and signum functions model "per unit or part thereof" and threshold-based pricing.
c11_math_cbse_02_010: algebra of functions allows combining cost, revenue, profit functions (e.g., profit = revenue - cost).
c11_math_cbse_02_011: graphing helps visualise domain/range and interpret solutions like break-even points.
c6_math_ch05_058: prior experience translating word statements into algebraic equations.
c7_math_ch15_007: setting up equations from word problems, now extended to function notation.
c8_math_ch13_10: applications of linear equations in real life, foundation for linear function models.
c9_math_ch2_10: word problems using linear equations, directly relevant to linear function applications.
c10_math_cbse_03_012: fixed charge + variable charge problems, a classic linear function word problem type.
c11_math_cbse_02_004: Word problems translate real-world constraints into domain/range restrictions.  
c11_math_cbse_02_006: Word problems often model fixed charges (constant) and variable charges (identity/linear) — direct application.  

## FORWARD_NODE_IDS


## FORWARD_REASONS
This is the final node in Chapter 2 (Relations and Functions). No subsequent nodes in this chapter depend on it.

## CROSS_SUBJECT_PREREQS
c9_math_ch2_3, c10_math_cbse_03_012, c10_math_cbse_04_011
## CROSS_SUBJECT_REASONS
c9_math_ch2_3: Linear patterns in real-life situations (e.g., growth/decay) directly connect to linear function word problems in physics (uniform motion) and economics (simple cost models).
c10_math_cbse_03_012: Fixed charge plus variable charge problems appear in electricity billing (physics/economics) and taxi fares; the same mathematical structure is used across subjects.
c10_math_cbse_04_011: Quadratic equation word problems (projectile motion, area optimization) become quadratic function applications in Class 11, linking to physics (kinematics) and business (profit maximisation).

## CHAIN_DESCRIPTION
c11_math_cbse_02_005 -> c11_math_cbse_02_012 -> none

## THIS_FORMULA
N/A - conceptual (general function notation: \( f(x) = \text{expression in } x \), domain \( D_f \subseteq \mathbb{R} \), range \( R_f \subseteq \mathbb{R} \))

## FORMULA_VARIABLES
N/A

## FORMULA_UNITS
Units depend on the problem context (e.g., rupees, metres, seconds, degrees Celsius). Always include units in the final answer.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch03_001 | Motion in a straight line: position as a function of time \( x(t) \) is a direct application of functions; word problems on displacement/velocity use the same translation skills.
c11_economics_ch02_001 | Cost, revenue, and profit functions: \( C(x) \), \( R(x) \), \( P(x) = R(x) - C(x) \) are core economic models built exactly as function word problems.

## PREREQ_CONCEPT
Translating verbal descriptions into algebraic expressions and solving equations, with an understanding of the definition of a function (each input has exactly one output).

## PREREQ_BEFORE
The student must be able to identify independent and dependent variables in a real-world statement, write an algebraic rule linking them, and determine which values of the independent variable make sense in context.

## PREREQ_STUCK
Revisit c11_math_cbse_02_005 (function definition) and c9_math_ch2_10 (linear equation word problems) to practice variable identification and equation formation before adding domain/range analysis.

## WORKED_EXAMPLE_1
PROBLEM: A car rental company in Mumbai charges a flat fee of ₹500 per day plus ₹12 per kilometre driven. Write the total daily cost \( C \) as a function of kilometres driven \( k \). If a customer has a budget of ₹2000 for a day, what is the maximum distance they can drive? State the domain and range of the function in this context.

STEPS:
- Step 1: Identify the independent variable (kilometres driven, \( k \)) and dependent variable (total cost \( C \) in ₹). Note the fixed component (₹500) and variable component (₹12 per km).
- Step 2: Form the function rule: \( C(k) = 500 + 12k \).
- Step 3: Determine the domain: \( k \) cannot be negative; also the car cannot drive infinite km in a day, but without an explicit upper bound we take \( k \geq 0 \). Since distance is continuous, domain = \( [0, \infty) \).
- Step 4: Use the budget constraint: \( C(k) \leq 2000 \) → \( 500 + 12k \leq 2000 \) → \( 12k \leq 1500 \) → \( k \leq 125 \). So maximum distance = 125 km.
- Step 5: Find the range for the domain \( [0, 125] \): minimum cost at \( k=0 \) is ₹500; maximum at \( k=125 \) is ₹2000. Range = \( [500, 2000] \). Interpret: with ₹2000 budget, the customer can drive up to 125 km.

REASONING: The problem is a linear function application. The fixed fee is the y-intercept, the per-km rate is the slope. The budget gives an inequality that restricts the domain further. The range follows from the domain because the function is increasing. This mirrors the linear function concepts from c11_math_cbse_02_007 and the algebraic manipulation from c11_math_cbse_02_010.

ANSWER: Function: \( C(k) = 500 + 12k \), domain \( [0, \infty) \) (contextually \( [0, 125] \) for the budget), range \( [500, \infty) \) (contextually \( [500, 2000] \)). Maximum distance = 125 km.

## WORKED_EXAMPLE_2
PROBLEM: The temperature at a hill station varies with height. At ground level (0 m) it is 30°C. The temperature drops by 6.5°C for every 1000 m increase in altitude. Express temperature \( T \) as a function of height \( h \) (in metres). Find the height at which water freezes (0°C). If the hill top is at 2500 m, what is the temperature there? State the domain and range.

STEPS:
- Step 1: Identify variables: height \( h \) (metres) is independent, temperature \( T \) (°C) is dependent. The rate of change is -6.5°C per 1000 m = -0.0065°C per metre.
- Step 2: Write the linear function: \( T(h) = 30 - 0.0065h \). (Alternatively, using km: \( T(h) = 30 - 6.5 \times \frac{h}{1000} \)).
- Step 3: Find height for freezing: set \( T(h) = 0 \) → \( 30 - 0.0065h = 0 \) → \( 0.0065h = 30 \) → \( h = 30 / 0.0065 \approx 4615.38 \) m.
- Step 4: Temperature at hill top (2500 m): \( T(2500) = 30 - 0.0065 \times 2500 = 30 - 16.25 = 13.75 \)°C.
- Step 5: Domain: height cannot be negative; maximum is hill top 2500 m (or theoretically up to where temperature reaches absolute zero, but context limits to 2500 m). Domain = \( [0, 2500] \). Range: at \( h=0 \), \( T=30 \); at \( h=2500 \), \( T=13.75 \). Since function is decreasing, range = \( [13.75, 30] \).

REASONING: This is a linear function with a negative slope, modelling a physical phenomenon (lapse rate). The domain is restricted by the physical scenario (ground to hill top). The freezing point calculation solves \( f(x) = 0 \), a common "find the input for a given output" task. The unit conversion (per 1000 m to per metre) is a crucial algebraic step.

ANSWER: Function: \( T(h) = 30 - 0.0065h \) (or \( 30 - 6.5 \times \frac{h}{1000} \)). Freezing height ≈ 4615 m (above hill top, so not reached). Temperature at 2500 m = 13.75°C. Domain: \( [0, 2500] \), Range: \( [13.75, 30] \).

## WORKED_EXAMPLE_3
PROBLEM: A company manufactures pens. The fixed cost per day is ₹2000. The variable cost is ₹5 per pen for the first 1000 pens, but due to overtime, the cost rises to ₹8 per pen for any pens beyond 1000. The selling price is ₹12 per pen. Write the daily cost function \( C(x) \), revenue function \( R(x) \), and profit function \( P(x) \) for \( x \) pens produced and sold (\( x \geq 0 \)). Find the break-even points (where profit = 0).

STEPS:
- Step 1: Identify that the cost function is piecewise due to the change at 1000 pens. For \( 0 \leq x \leq 1000 \): \( C(x) = 2000 + 5x \). For \( x > 1000 \): \( C(x) = 2000 + 5 \times 1000 + 8(x - 1000) = 7000 + 8x - 8000 = 8x - 1000 \).
- Step 2: Revenue function is linear: \( R(x) = 12x \) (price × quantity).
- Step 3: Profit function \( P(x) = R(x) - C(x) \). For \( 0 \leq x \leq 1000 \): \( P(x) = 12x - (2000 + 5x) = 7x - 2000 \). For \( x > 1000 \): \( P(x) = 12x - (8x - 1000) = 4x + 1000 \).
- Step 4: Find break-even points by setting \( P(x) = 0 \) in each piece. First piece: \( 7x - 2000 = 0 \) → \( x = 2000/7 \approx 285.7 \). Since \( x \) must be integer, break-even at 286 pens (profit becomes positive). Check: \( P(285) = -5 \), \( P(286) = 2 \). Second piece: \( 4x + 1000 = 0 \) → \( x = -250 \) (not in domain \( x > 1000 \)), so no break-even there.
- Step 5: Domain of all functions: \( x \geq 0 \) (integer). Range of profit: for \( 0 \leq x \leq 1000 \), \( P(x) \) goes from -2000 to 5000; for \( x > 1000 \), \( P(x) > 5000 \) and increases. So overall profit range is \( [-2000, \infty) \).

REASONING: This combines piecewise-defined functions (from modulus/greatest integer concepts in c11_math_cbse_02_009) with algebra of functions (c11_math_cbse_02_010: profit = revenue - cost). The break-even analysis requires solving \( P(x)=0 \) in each piece and checking if the solution lies in that piece's subdomain. The integer constraint on \( x \) (pens) is a contextual domain refinement.

ANSWER: 
Cost: \( C(x) = \begin{cases} 2000 + 5x, & 0 \leq x \leq 1000 \\ 8x - 1000, & x > 1000 \end{cases} \)
Revenue: \( R(x) = 12x \)
Profit: \( P(x) = \begin{cases} 7x - 2000, & 0 \leq x \leq 1000 \\ 4x + 1000, & x > 1000 \end{cases} \)
Break-even point: 286 pens (first piece). No break-even in second piece. Domain: \( x \in \mathbb{Z}, x \geq 0 \). Profit range: \( [-2000, \infty) \).

## COMPETENCY_QUESTION_1
QUESTION: A Delhi Metro ride costs ₹10 for the first 2 km, ₹5 for each additional kilometre up to 10 km, and ₹3 for each kilometre beyond 10 km. 
(a) Write the piecewise fare function \( F(d) \) for distance \( d \) km (\( d > 0 \)).
(b) A passenger has ₹50. What is the maximum distance they can travel? 
(c) Explain why the function is not differentiable at \( d = 2 \) and \( d = 10 \), and what this means in terms of the fare structure.

COMPETENCY: Translating real-world situations to mathematical expressions (piecewise functions) and interpreting non-differentiability as a change in pricing policy.

STEPS:
- Step 1: Understand the fare slabs and identify the three intervals: (0,2], (2,10], (10,∞).
- Step 2: Write the function for each interval, ensuring continuity at the boundaries (the fare at the start of a slab equals the fare at the end of the previous slab).
- Step 3: For part (b), set up inequality \( F(d) \leq 50 \) and solve in each interval, checking which interval the solution falls into.
- Step 4: For part (c), explain that the slope (rate per km) changes abruptly at the boundaries, so the derivative (marginal cost per km) jumps; this reflects the discrete change in pricing policy.

ANSWER: 
(a) \( F(d) = \begin{cases} 10, & 0 < d \leq 2 \\ 10 + 5(d-2) = 5d, & 2 < d \leq 10 \\ 10 + 5(8) + 3(d-10) = 3d + 20, & d > 10 \end{cases} \)
(b) Check each piece: For \( d \leq 2 \), max fare 10 < 50. For \( 2 < d \leq 10 \), \( 5d \leq 50 \) → \( d \leq 10 \). So up to 10 km costs ₹50 exactly. For \( d > 10 \), \( 3d+20 \leq 50 \) → \( 3d \leq 30 \) → \( d \leq 10 \), but this contradicts \( d > 10 \). So maximum distance = 10 km.
(c) The left and right derivatives at d=2 are 0 and 5; at d=10 are 5 and 3. The function has corners (not differentiable) because the per-km rate changes abruptly. This means the marginal cost of an extra kilometre jumps at those distances.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The cost of producing \( x \) units of a product is given by \( C(x) = 0.01x^2 + 5x + 2000 \) (in rupees). The selling price per unit is \( p(x) = 50 - 0.02x \) (price decreases with quantity due to market saturation). 
(a) Write the revenue function \( R(x) \) and profit function \( P(x) \).
(b) Find the production level \( x \) that maximizes profit. (Hint: Profit is a quadratic function; use vertex formula.)
(c) What is the maximum profit? What is the selling price at that production level?
(d) Discuss the domain restrictions for this model in a real business context.

COMPETENCY: Combining functions (revenue = price × quantity, profit = revenue - cost), optimizing a quadratic function, and interpreting domain constraints in an economic context.

STEPS:
- Step 1: Write revenue \( R(x) = x \cdot p(x) = x(50 - 0.02x) = 50x - 0.02x^2 \).
- Step 2: Write profit \( P(x) = R(x) - C(x) = (50x - 0.02x^2) - (0.01x^2 + 5x + 2000) = -0.03x^2 + 45x - 2000 \).
- Step 3: This is a downward-opening quadratic. Maximum at vertex \( x = -b/(2a) = -45/(2 \times -0.03) = 45/0.06 = 750 \) units.
- Step 4: Maximum profit \( P(750) = -0.03(750)^2 + 45(750) - 2000 = -16875 + 33750 - 2000 = 14875 \) ₹.
- Step 5: Selling price at \( x=750 \): \( p(750) = 50 - 0.02(750) = 50 - 15 = 35 \) ₹/unit.
- Step 6: Domain: \( x \geq 0 \) (cannot produce negative units). Also price must be non-negative: \( 50 - 0.02x \geq 0 \) → \( x \leq 2500 \). So practical domain is \( [0, 2500] \). The vertex at 750 lies within this domain.

ANSWER: 
(a) \( R(x) = 50x - 0.02x^2 \), \( P(x) = -0.03x^2 + 45x - 2000 \).
(b) Production level for max profit: 750 units.
(c) Maximum profit: ₹14,875. Selling price at that level: ₹35 per unit.
(d) Domain: \( 0 \leq x \leq 2500 \) (non-negative production and non-negative price). Also \( x \) should be integer in practice.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine a Delhi Metro commuter who pays a fixed base fare plus an ______ charge per kilometre.

## DIAGNOSTIC_ANSWER_7
additional

**A wrong answer ("extra" or "variable") reveals the student has paraphrased the walkthrough's adjective - the commuter pays a fixed base fare plus an additional charge per kilometre.** Additional is the walkthrough's own word for the per-km component stacked on the base. Recall the fixed-plus-variable structure before filling, and give the adjective exactly as written.

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
The student can independently convert a descriptive real-world situation (involving costs, distances, temperatures, etc.) into a properly defined function with explicit domain and range, evaluate the function for given inputs, solve for inputs given outputs, and interpret the results in the original context using correct units.
