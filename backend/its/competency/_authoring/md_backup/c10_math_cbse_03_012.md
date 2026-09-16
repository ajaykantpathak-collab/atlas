## DEFINITION
A fixed charge plus variable charge problem is a real-world situation where the total cost is the sum of a constant fixed charge and a variable charge that depends linearly on the number of units consumed. It leads to a pair of linear equations in two variables: the fixed charge (x) and the variable charge per unit (y), formed from two given scenarios with different units and total costs.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can translate a word problem involving fixed and variable charges into a pair of linear equations, solve them using any algebraic method (substitution, elimination, or cross-multiplication), and interpret the solution in the context of the problem (e.g., state the fixed charge and the charge per unit with correct units).

## SCOPE_BOUNDARY
Covers word problems where total cost = fixed charge + (variable charge per unit × number of units). Does not cover problems with more than two unknowns, non-linear relationships, systems of three equations, or piecewise-defined charges beyond the basic fixed-plus-variable model.

## WALKTHROUGH
Imagine you hire an auto-rickshaw in Mumbai. The driver says there is a fixed charge for the first 2 km and then a per km charge after that. You travel 5 km and pay ₹50. Your friend travels 10 km and pays ₹80. How do you find the fixed charge and the per km charge? First, identify the two unknowns: let the fixed charge for the first 2 km be ₹x and the charge per additional km be ₹y. Then write the equations: for 5 km (3 extra km), x + 3y = 50; for 10 km (8 extra km), x + 8y = 80. Notice the fixed charge x appears with coefficient 1 in both equations — this makes elimination the quickest method. Subtract the first equation from the second to eliminate x, find y, then substitute back to find x. The key insight is that the fixed charge is constant regardless of distance, while the variable charge multiplies with the number of units beyond the fixed portion.

## DIAGNOSTIC_QUESTION_1
Write the general form of the pair of linear equations for a fixed charge plus variable charge problem if the fixed charge is ₹x and the variable charge per unit is ₹y, given two situations with units u1, u2 and total costs C1, C2.

## DIAGNOSTIC_ANSWER_1
The equations are: x + u1·y = C1 and x + u2·y = C2. A wrong answer (e.g., writing u1·x + y = C1) reveals the student confuses which quantity is multiplied by the units — they treat the fixed charge as variable and the variable charge as fixed.

## DIAGNOSTIC_QUESTION_2
Explain why the fixed charge remains the same in both equations while the variable charge is multiplied by the number of units.

## DIAGNOSTIC_ANSWER_2
The fixed charge is a one-time constant fee (e.g., base fare, monthly rental) that does not change with usage, so it appears as x in both equations. The variable charge depends on how many units are consumed, so it is multiplied by the number of units (u1·y and u2·y). A wrong answer indicates the student does not understand the real-world meaning of "fixed" versus "variable" and may treat both as coefficients of the units.

## DIAGNOSTIC_QUESTION_3
A telephone bill has a fixed monthly rental and a charge per call. In January, 100 calls cost ₹350. In February, 150 calls cost ₹425. Find the fixed rental and charge per call.

## DIAGNOSTIC_ANSWER_3
Let fixed rental = ₹x, charge per call = ₹y.
January: x + 100y = 350
February: x + 150y = 425
Subtract: 50y = 75 → y = 1.5
Substitute: x + 100(1.5) = 350 → x = 200.
Fixed rental = ₹200, charge per call = ₹1.50.
A wrong answer (e.g., y = 75, x = -4000) reveals arithmetic errors in subtraction or sign mistakes when substituting.

## DIAGNOSTIC_QUESTION_4
Compare the elimination method and substitution method for solving the equations from the telephone bill problem. Which is more efficient and why?

## DIAGNOSTIC_ANSWER_4
Elimination is more efficient because the coefficients of x are identical (both 1). Subtracting the equations directly eliminates x in one step. Substitution would require solving one equation for x (x = 350 - 100y) and substituting into the other, involving more steps and fractions. A wrong answer (e.g., "substitution is better because it's easier") shows the student does not recognize structural advantages of elimination when coefficients match.

## DIAGNOSTIC_QUESTION_5
A student solved the auto-rickshaw problem (5 km → ₹50, 10 km → ₹80) and got fixed charge = ₹30, per km charge = ₹6. For 5 km, the cost would be ₹30 + 3×6 = ₹48, but the problem says ₹50. The student claims the solution is correct because it satisfies the second condition (₹30 + 8×6 = ₹78 ≈ ₹80). Evaluate the student's claim.

## DIAGNOSTIC_ANSWER_5
The student's claim is incorrect. A valid solution must satisfy both given conditions simultaneously. The student's values give ₹48 for 5 km (not ₹50) and ₹78 for 10 km (not ₹80), so they satisfy neither condition exactly. The student likely made an error in forming the equations (e.g., using 5y instead of 3y for the 5 km journey) and then only checked one condition approximately. A wrong evaluation (e.g., "it's close enough") reveals a misunderstanding that mathematical solutions must be exact and satisfy all given equations.

## DIAGNOSTIC_QUESTION_6
Create your own fixed charge plus variable charge problem with a real-life context (e.g., electricity bill, gym membership, taxi fare). Provide two conditions and ask for the fixed and variable charges. Also provide the solution.

## DIAGNOSTIC_ANSWER_6
A good answer will present a coherent scenario (e.g., "A gym charges a fixed annual fee plus ₹y per visit. Member A visits 20 times and pays ₹4000. Member B visits 35 times and pays ₹5750."), correctly form the equations (x + 20y = 4000, x + 35y = 5750), solve them (y = 116.67, x = 1666.67), and state the answer with units. A poor answer (e.g., missing one condition, equations not matching the story, or solution not satisfying both equations) reveals the student cannot reverse-engineer the problem structure or does not grasp the relationship between the narrative and the algebraic model.

## COMMON_MISCONCEPTION
Students often write the equations as: fixed charge × units + variable charge = total cost. For example, for the auto-rickshaw problem they write 5x + y = 50 instead of x + 3y = 50. This reverses the roles: they multiply the fixed charge by the distance and treat the variable charge as a one-time addition. The error stems from not distinguishing which quantity is constant and which scales with units.

## ON_FAILURE
Remediation: Use a concrete example with tiny numbers. Ask: "If the fixed charge for the first 2 km is ₹20 and the per km charge after that is ₹5, what is the fare for 4 km?" The student computes 20 + 2×5 = 30. Then ask: "Which number did you multiply by 2? Which number did you just add?" Guide them to see the fixed charge (₹20) was added once, while the per km charge (₹5) was multiplied by the extra kilometres (2). Then rewrite the equation correctly: x + 2y = 30. Practice two more similar numerical examples before returning to algebraic variables.

## PREREQUISITE_NODE_IDS
c10_math_cbse_03_005, c10_math_cbse_03_006, c10_math_cbse_03_007, c9_math_ch2_9, c9_math_ch2_10, c7_math_ch15_007, c6_math_ch05_058, c10_math_cbse_03_003, c10_math_cbse_03_004, c10_math_cbse_03_008, c10_math_cbse_03_009, c10_math_cbse_03_010, c10_math_cbse_03_011

## PREREQUISITE_REASONS
c10_math_cbse_03_005: Provides substitution method for solving the formed pair of equations.
c10_math_cbse_03_006: Provides elimination method, often the most efficient for fixed-charge problems because the fixed charge coefficient is usually 1.
c10_math_cbse_03_007: Provides cross-multiplication method as an alternative algebraic technique.
c9_math_ch2_9: Establishes understanding of consistent/inconsistent systems, ensuring the formed pair has a unique solution.
c9_math_ch2_10: Builds the skill of translating word problems into linear equations, directly extended here to two variables.
c7_math_ch15_007: Teaches setting up equations from word problems, the foundational step for this node.
c6_math_ch05_058: Introduces word problems leading to equations, the earliest exposure to algebraic modelling.
c10_math_cbse_03_003: A pair of linear equations in two variables is called an **inconsistent system** if the lines  - earlier chapter node that this node's author flags as feeding into this content.
c10_math_cbse_03_004: A pair of linear equations in two variables represents a **dependent system** (coincident  - earlier chapter node that this node's author flags as feeding into this content.
c10_math_cbse_03_008: Equations reducible to a pair of linear equations in two variables are non-linear equations  - earlier chapter node that this node's author flags as feeding into this content.
c10_math_cbse_03_009: Word problems on age and number involve translating real-life situations about people's ages  - earlier chapter node that this node's author flags as feeding into this content.
c10_math_cbse_03_010: Upstream/downstream problems involve a boat or swimmer moving in a river with a constant  - earlier chapter node that this node's author flags as feeding into this content.
c10_math_cbse_03_011: Word problems on fractions and two-digit numbers are real-life situations that translate into  - earlier chapter node that this node's author flags as feeding into this content.

## FORWARD_NODE_IDS
N/A

## FORWARD_REASONS
none

## CROSS_SUBJECT_PREREQS
c9_math_ch2_5, c9_math_ch2_6

## CROSS_SUBJECT_REASONS
c9_math_ch2_5: The graph of total cost vs units is a straight line; its slope is the variable charge and y-intercept is the fixed charge, used in economics for cost functions.
c9_math_ch2_6: The slope-intercept form y = mx + c directly models fixed charge (c) and variable charge (m), used in physics for linear relationships with an initial offset (e.g., distance-time with initial position).
## CROSS_SUBJECT
c9_math_ch2_5 | The graph of total cost versus units consumed is a straight line where the slope represents the variable charge per unit and the y-intercept represents the fixed charge, a fundamental concept in economics for cost-revenue analysis.
c9_math_ch2_6 | The slope-intercept form y = mx + c is identical in structure to the fixed-charge model (total cost = variable charge × units + fixed charge), used in physics for uniform motion with an initial displacement.
## CHAIN_DESCRIPTION
c9_math_ch2_10 -> c10_math_cbse_03_012 -> none

## THIS_FORMULA
x + u₁·y = C₁ and x + u₂·y = C₂, where x = fixed charge, y = variable charge per unit, u₁, u₂ = units in two scenarios, C₁, C₂ = corresponding total costs.

## FORMULA_VARIABLES
x = fixed charge (constant, in rupees), y = variable charge per unit (in rupees per unit), u₁, u₂ = number of units in first and second scenario (in km, calls, kL, etc.), C₁, C₂ = total costs in first and second scenario (in rupees).

## FORMULA_UNITS
Fixed charge: rupees (₹); Variable charge: rupees per unit (₹/km, ₹/call, ₹/kL, etc.); Units: km, calls, kL, visits, etc.; Total cost: rupees (₹).

## COMPUTATION_TYPE
algebraic

## PREREQ_CONCEPT
Forming and solving a pair of linear equations in two variables.

## PREREQ_BEFORE
Student must be able to solve a pair of linear equations using any algebraic method and translate simple word problems into equations.

## PREREQ_STUCK
Review the elimination method (c10_math_cbse_03_006) and practice forming equations from word problems (c9_math_ch2_10).

## WORKED_EXAMPLE_1
PROBLEM: A taxi service charges a fixed fare for the first kilometre and a constant rate per kilometre thereafter. For a journey of 12 km, the charge is ₹180. For a journey of 18 km, the charge is ₹240. Find the fixed charge for the first kilometre and the rate per kilometre for the subsequent distance.

STEPS:
- Step 1: Define variables. Let fixed charge for the first km = ₹x, charge per subsequent km = ₹y.
- Step 2: For 12 km journey: first km is covered by fixed charge, remaining 11 km are charged at ₹y per km. Equation: x + 11y = 180.
- Step 3: For 18 km journey: first km fixed, remaining 17 km at ₹y per km. Equation: x + 17y = 240.
- Step 4: Subtract the first equation from the second to eliminate x: (x + 17y) - (x + 11y) = 240 - 180 → 6y = 60 → y = 10.
- Step 5: Substitute y = 10 into the first equation: x + 11(10) = 180 → x + 110 = 180 → x = 70.
- Step 6: Verify with both scenarios: 12 km → 70 + 11×10 = 180 ✓; 18 km → 70 + 17×10 = 240 ✓.

REASONING: The fixed charge is a one-time fee for the first kilometre, so it appears unchanged in both equations. The variable charge applies only to the kilometres beyond the first, so it is multiplied by (total km - 1). Subtracting the equations eliminates the fixed charge because its coefficient is 1 in both, leaving a simple equation for the variable charge.

ANSWER: Fixed charge for the first kilometre = ₹70; Rate per subsequent kilometre = ₹10.

## WORKED_EXAMPLE_2
PROBLEM: A telephone company charges a fixed monthly rental plus a fixed rate per call. In March, a customer made 120 calls and paid ₹480. In April, the same customer made 180 calls and paid ₹600. Find the monthly rental and the charge per call.

STEPS:
- Step 1: Define variables. Let monthly rental = ₹x, charge per call = ₹y.
- Step 2: March bill: x + 120y = 480.
- Step 3: April bill: x + 180y = 600.
- Step 4: Subtract the March equation from the April equation: (x + 180y) - (x + 120y) = 600 - 480 → 60y = 120 → y = 2.
- Step 5: Substitute y = 2 into the March equation: x + 120(2) = 480 → x + 240 = 480 → x = 240.
- Step 6: Verify: March → 240 + 120×2 = 480 ✓; April → 240 + 180×2 = 600 ✓.

REASONING: The monthly rental is a fixed cost incurred regardless of calls, so it is the same in both months. The call charge scales with the number of calls. Because the rental coefficient is 1 in both equations, elimination by subtraction is the most direct method.

ANSWER: Monthly rental = ₹240; Charge per call = ₹2.

## WORKED_EXAMPLE_3
PROBLEM: A gym membership has a fixed annual fee and a variable fee per visit. Member A visits 30 times in a year and pays ₹6,000. Member B visits 50 times and pays ₹8,000. Find the fixed annual fee and the fee per visit. If Member C visits 40 times, how much will they pay?

STEPS:
- Step 1: Define variables. Let fixed annual fee = ₹x, fee per visit = ₹y.
- Step 2: Member A: x + 30y = 6000.
- Step 3: Member B: x + 50y = 8000.
- Step 4: Subtract the first equation from the second: (x + 50y) - (x + 30y) = 8000 - 6000 → 20y = 2000 → y = 100.
- Step 5: Substitute y = 100 into the first equation: x + 30(100) = 6000 → x + 3000 = 6000 → x = 3000.
- Step 6: Compute Member C's cost for 40 visits: Cost = x + 40y = 3000 + 40×100 = 3000 + 4000 = 7000.
- Step 7: Verify Member A: 3000 + 30×100 = 6000 ✓; Member B: 3000 + 50×100 = 8000 ✓.

REASONING: After determining the fixed and variable charges from the two given members, we can predict the cost for any number of visits using the same linear model. This demonstrates the predictive power of the linear equation once the parameters are known.

ANSWER: Fixed annual fee = ₹3,000; Fee per visit = ₹100; Member C pays ₹7,000.

## COMPETENCY_QUESTION_1
QUESTION: A water supply bill has a fixed charge and a charge per kilolitre. A household using 15 kL pays ₹300, and another using 25 kL pays ₹400. (a) Form the pair of linear equations. (b) Solve using the elimination method. (c) Explain why the elimination method is particularly efficient for this pair of equations.

COMPETENCY: Translating real-world situations to mathematical expressions and justifying method choice.

STEPS:
- Step 1: Understand the problem: fixed charge (x) and charge per kL (y).
- Step 2: Form equations: x + 15y = 300, x + 25y = 400.
- Step 3: Solve by elimination: subtract first from second → 10y = 100 → y = 10; then x = 300 - 150 = 150.
- Step 4: Explain elimination is efficient because the coefficients of x are equal (1), so subtraction directly eliminates x without any multiplication.

ANSWER: (a) x + 15y = 300, x + 25y = 400. (b) Fixed charge = ₹150, charge per kL = ₹10. (c) Elimination is efficient because the fixed charge has the same coefficient (1) in both equations, allowing immediate elimination by subtraction.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: An auto-rickshaw fare consists of a fixed charge for the first 2 km and a per km charge thereafter. For a journey of 5 km, the fare is ₹50. For a journey of 10 km, the fare is ₹80. (a) Write the equations assuming the fixed charge covers the first 2 km. (b) Solve for the fixed charge and per km charge. (c) If the fare for a journey is ₹65, find the distance travelled. (d) Plot the graph of total fare (y-axis) vs distance (x-axis) for distances ≥ 2 km. What does the y-intercept represent?

COMPETENCY: Connecting algebraic and graphical representations, and interpreting intercepts in context.

STEPS:
- Step 1: Let fixed charge for first 2 km = ₹x, per km charge after 2 km = ₹y.
- Step 2: For 5 km: distance beyond 2 km = 3 km → x + 3y = 50.
- Step 3: For 10 km: distance beyond 2 km = 8 km → x + 8y = 80.
- Step 4: Solve: subtract → 5y = 30 → y = 6; x = 50 - 18 = 32.
- Step 5: For fare ₹65: 32 + (d - 2)×6 = 65 → (d - 2)×6 = 33 → d - 2 = 5.5 → d = 7.5 km.
- Step 6: Graph: fare = 32 + 6(d - 2) = 20 + 6d for d ≥ 2. This is a straight line with slope 6 and y-intercept 20. The y-intercept (₹20) is the fare at 0 km if the same rate applied, but actually the fixed charge covers the first 2 km, so the line segment starts at (2, 32).

ANSWER: (a) x + 3y = 50, x + 8y = 80. (b) Fixed charge = ₹32, per km charge = ₹6. (c) Distance = 7.5 km. (d) Graph is a line with slope 6 and y-intercept 20. The y-intercept ₹20 represents the hypothetical fare for 0 km if the per km rate applied from the start; it equals the fixed charge minus 2×per km charge (32 - 12 = 20).

DIFFICULTY: hard