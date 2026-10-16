## ELI5
A Delhi baker bakes chocolate cakes and fruit tarts under an oven clock and a shelf limit: the graphical method turns her dilemma into a picture. Plot each constraint as a line, shade the region satisfying every inequality at once - the feasible region, a convex polygon - and evaluate the profit line at each corner. Two theorems carry the weight: any optimum must sit at a corner, and a bounded region always hosts both a best and a worst corner.

## DEFINITION
The graphical method for solving a Linear Programming Problem (LPP) in two variables involves plotting the constraints as linear inequalities on the Cartesian plane to obtain a feasible region (a convex polygon), then evaluating the objective function \(Z = ax + by\) at each corner point (vertex) of this region. By Theorem 1, if an optimal value exists, it must occur at a corner point; by Theorem 2, if the feasible region is bounded, both maximum and minimum values exist and occur at corner points. The method is limited to two decision variables and requires the feasible region to be non-empty.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can independently: (1) graph a system of linear inequalities to identify the feasible region and its corner points; (2) evaluate the objective function at every corner point; (3) correctly determine the maximum and minimum values (or state that no optimal value exists for unbounded regions) and the corresponding decision variable values; (4) interpret the solution in the context of the original word problem.

## SCOPE_BOUNDARY
This node covers the complete graphical solution procedure (Corner Point Method) for two-variable LPPs as per NCERT Class 12, including bounded and unbounded feasible regions, multiple optimal solutions, and infeasible problems. It does NOT cover the Simplex method, sensitivity analysis, or problems with more than two variables.

## WALKTHROUGH
Imagine a small bakery in Delhi that makes only two products: chocolate cakes (₹500 profit each) and fruit tarts (₹300 profit each). The oven can run for at most 8 hours a day (each cake takes 20 min, each tart 10 min), and the display shelf holds at most 30 items. The baker wants to maximise daily profit. First, translate this into an LPP: let \(x\) = cakes, \(y\) = tarts. Constraints: \(20x + 10y \le 480\) (time), \(x + y \le 30\) (space), \(x \ge 0, y \ge 0\). Objective: Maximise \(Z = 500x + 300y\). Start by drawing the lines \(20x+10y=480\) and \(x+y=30\) on graph paper, shade the feasible region (first quadrant, below both lines), find the corner points by solving pairs of equations, then plug each corner into \(Z\). The key insight: because the feasible region is a convex polygon, the optimal profit will always occur at one of its vertices — we never need to test interior points.

Takeaway first: the feasible region's corners exhaust the search - convexity promises the linear objective's optimum lives on a vertex, never in the interior. Exam moves: graphing questions shading feasible regions, vertex questions solving intersecting pairs, evaluation questions on the objective at each corner, and interpretation questions translating the winning corner back into cakes and tarts. Method: rerun the bakery - minutes-to-hours constraint, shelf constraint, non-negativity axes, then corner-by-corner arithmetic. Check yourself: an unbounded region can host a corner evaluation that is not an optimum - the half-plane test must confirm before any 'maximum' is declared. Drill: solve one two-constraint LPP graphically, listing every corner and its objective value.

## DIAGNOSTIC_QUESTION_1
State Theorem 1 (Corner Point Theorem) for linear programming problems in your own words, including the condition on the feasible region.

## DIAGNOSTIC_ANSWER_1
Correct answer: Theorem 1 states that if a linear programming problem has an optimal value (maximum or minimum) of the objective function \(Z = ax + by\) subject to linear constraints, then this optimal value must occur at a corner point (vertex) of the feasible region. The feasible region must be a convex polygon (intersection of half-planes). A wrong answer such as "the optimal value occurs at the centre of the feasible region" or "we must test all points inside the region" reveals that the student has not understood the geometric reason why only vertices need checking — the linearity of \(Z\) makes its level lines parallel, pushing the extreme value to the boundary.

## DIAGNOSTIC_QUESTION_2
Explain why, when the feasible region is unbounded, the smallest value of \(Z\) at the corner points might NOT be the true minimum of the problem. Use the concept of an open half-plane in your explanation.

## DIAGNOSTIC_ANSWER_2
Correct answer: For an unbounded feasible region, the objective function may decrease indefinitely along a direction inside the region. After finding the smallest corner-point value \(m\), we must check whether the open half-plane \(ax + by < m\) has any point in common with the feasible region. If it does, we can find feasible points giving values lower than \(m\), so no minimum exists. A wrong answer that says "the smallest corner value is always the minimum even for unbounded regions" shows the student has missed the crucial Step 3(ii) of the Corner Point Method and does not understand that unbounded regions can extend infinitely in the direction of decreasing \(Z\).

## DIAGNOSTIC_QUESTION_3
Solve graphically: Maximise \(Z = 4x + 3y\) subject to \(x + y \le 5\), \(2x + y \le 8\), \(x \ge 0\), \(y \ge 0\). Show all steps: plot constraints, find corner points, evaluate \(Z\), state maximum.

## DIAGNOSTIC_ANSWER_3
Steps:
1. Constraints: \(x+y=5\) (intercepts (5,0), (0,5)); \(2x+y=8\) (intercepts (4,0), (0,8)).
2. Feasible region: first quadrant, below both lines. Corner points: O(0,0), A(4,0), B(3,2) [intersection of \(x+y=5\) and \(2x+y=8\)], C(0,5).
3. Evaluate \(Z=4x+3y\): O→0; A→16; B→4(3)+3(2)=18; C→15.
4. Maximum \(Z = 18\) at (3,2).
A wrong answer obtaining corner point (2,3) instead of (3,2) indicates an algebraic error solving the two equations; a wrong answer missing corner (0,5) shows incomplete identification of vertices.

## DIAGNOSTIC_QUESTION_4
Consider the LPP: Minimise \(Z = -x + 2y\) subject to \(x \ge 3\), \(x + y \ge 5\), \(x + 2y \ge 6\), \(y \ge 0\). The feasible region is unbounded. The corner points are (3,2) and (4,1) with \(Z\) values 1 and 2 respectively. Can we conclude the minimum is 1? Justify using the half-plane test.

## DIAGNOSTIC_ANSWER_4
Correct answer: No, we cannot conclude yet. The smallest corner value is \(m=1\) at (3,2). We must graph the open half-plane \(-x + 2y < 1\) (i.e., \(2y < x+1\)). If this half-plane intersects the feasible region, values lower than 1 exist and no minimum occurs. In this problem, the feasible region extends infinitely upward and rightward; the line \(-x+2y=1\) passes through (3,2) and the half-plane \(-x+2y<1\) contains points like (4,1.5) which satisfy all constraints, so the half-plane does intersect the feasible region. Hence \(Z\) has no minimum. A student who answers "Yes, minimum is 1" has ignored the unbounded-region protocol.

## DIAGNOSTIC_QUESTION_5
A student solves: Maximise \(Z = 3x + 4y\) subject to \(x + 2y \le 8\), \(3x + 2y \le 12\), \(x \ge 0, y \ge 0\). They get corner points (0,0), (4,0), (0,4), (2,3) and \(Z\) values 0, 12, 16, 18. They write "Maximum \(Z = 18\) at (2,3)". Identify the error in their corner points and correct it.

## DIAGNOSTIC_ANSWER_5
Error: The point (0,4) does NOT satisfy \(3x+2y \le 12\) because \(3(0)+2(4)=8 \le 12\) is actually true — wait, 8 ≤ 12 is true, so (0,4) is feasible. But (4,0) gives \(3(4)+2(0)=12 \le 12\) ok. The intersection of \(x+2y=8\) and \(3x+2y=12\) is found by subtracting: \(2x=4 \Rightarrow x=2\), then \(2+2y=8 \Rightarrow y=3\). So (2,3) is correct. All four corners are correct. The student's answer is actually correct. A student who claims there is an error might have miscalculated the intersection or misread the inequality signs. The diagnostic reveals whether the student can verify feasible points against all constraints.

## DIAGNOSTIC_QUESTION_6
Create a real-world LPP (Indian context: rupees, items) with two decision variables and three constraints (excluding non-negativity) such that the feasible region is a triangle with vertices (0,0), (10,0), (0,8). Write the objective function to maximise profit, and state the optimal solution.

## DIAGNOSTIC_ANSWER_6
Example: A toy maker produces cars (₹200 profit) and dolls (₹150 profit). Each car needs 2 hrs machine time, each doll 1 hr; total 20 hrs available. Each car needs 1 unit paint, each doll 2 units; total 16 units paint. Let \(x\) = cars, \(y\) = dolls. Constraints: \(2x+y \le 20\), \(x+2y \le 16\), \(x\ge0, y\ge0\). Corners: (0,0), (10,0), (0,8). Maximise \(Z=200x+150y\). Values: 0, 2000, 1200 → max ₹2000 at (10,0). A good answer must have constraints that exactly yield the given vertices, a sensible objective, and correct evaluation. A poor answer gives constraints that produce a different feasible region or forgets non-negativity.

## COMMON_MISCONCEPTION
Students often shade the wrong side of a constraint line (e.g., shade above \(x+y \le 5\) instead of below) because they test the origin (0,0) but forget that the origin might not satisfy the inequality when the line passes through the origin. For example, for \(2x - y \ge 0\), the line passes through (0,0); testing (0,0) gives \(0 \ge 0\) (true), so they shade the side containing the origin — but the inequality is \(\ge\), so the feasible side is actually the side containing (1,0) which gives \(2 \ge 0\). The error: blindly using the origin as a test point without checking if the line passes through it, leading to an inverted feasible region and completely wrong corner points.

## ON_FAILURE
Remediation: (1) Revisit c11_math_cbse_06_006 (Graphical Solution of Linear Inequalities in Two Variables) and practice shading for lines that pass through the origin using a test point NOT on the line, e.g., (1,0) or (0,1). (2) Draw 5 lines through the origin (like \(x-y\ge0\), \(2x+y\le0\)) and shade correctly. (3) Re-attempt Diagnostic Question 3, but deliberately use a test point off the origin for each constraint. (4) Verify each corner point by plugging into ALL original inequalities.

## PREREQUISITE_NODE_IDS
c12_math_cbse_12_001, c11_math_cbse_06_006, c11_math_cbse_10_006, c9_math_ch1_2, c9_math_ch2_5
## PREREQUISITE_REASONS
c12_math_cbse_12_001: Provides the mathematical formulation of LPP (objective function, constraints, decision variables) which is the starting point for graphical solution.
c11_math_cbse_06_006: Teaches how to graph a system of linear inequalities in two variables and identify the feasible region — the core graphical skill.
c11_math_cbse_10_006: Slope of a line is needed to draw constraint lines accurately and understand the direction of the objective function's level lines.
c9_math_ch1_2: Plotting points on the Cartesian plane is the basic skill for graphing lines and marking corner points.
c9_math_ch2_5: Graph of a linear equation in two variables — drawing the boundary lines of constraints.

## FORWARD_NODE_IDS
c12_math_cbse_12_003, c12_math_cbse_12_004, c12_math_cbse_12_005, c12_math_cbse_12_006
## FORWARD_REASONS
c12_math_cbse_12_003: Feasible Region and Corner Points — this node directly builds on the graphical method by formalising the properties of the feasible region and systematic corner-point identification.
c12_math_cbse_12_004: Bounded and Unbounded Feasible Region — extends the graphical method to distinguish region types and their implications for existence of optimal values.
c12_math_cbse_12_005: Maximisation and Minimisation Problems — applies the corner point method to a variety of max/min problems including special cases (multiple optima, no solution).
c12_math_cbse_12_006: Word Problems — translates real-world scenarios (diet, manufacturing, transportation) into LPPs and solves them graphically using the method mastered here.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_10_006, c11_math_cbse_06_006
## CROSS_SUBJECT_REASONS
c11_math_cbse_10_006: Slope of a line determines the orientation of constraint boundaries and the objective function's level lines; parallel level lines move in the direction of the gradient (a,b).
c11_math_cbse_06_006: Graphical solution of linear inequalities in two variables is the direct prerequisite skill for constructing the feasible region in LPP.

## CHAIN_DESCRIPTION
c11_math_cbse_06_006 -> c12_math_cbse_12_001 -> c12_math_cbse_12_002 -> c12_math_cbse_12_003

## THIS_FORMULA
Corner Point Method: 1) Graph constraints → feasible region R. 2) Find vertices of R by solving intersecting lines. 3) Evaluate Z = ax + by at each vertex. 4) If R bounded: max = largest value, min = smallest value. If R unbounded: M is max if half-plane ax+by > M has no intersection with R; else no max. Similarly for min.

## FORMULA_VARIABLES
a, b = coefficients of objective function Z = ax + by; x, y = decision variables (non-negative); constraints: linear inequalities in x, y; R = feasible region (convex polygon); vertices = corner points of R.

## FORMULA_UNITS
x, y are dimensionless counts (number of items); a, b are profit/cost per unit (₹/item); Z is total profit/cost (₹).

## COMPUTATION_TYPE
geometric

## CROSS_SUBJECT
c11_math_cbse_10_006 | Slope of constraint lines and objective function level lines determines the direction of optimisation; parallel level lines slide across the feasible region until they hit a vertex.
c11_math_cbse_06_006 | The feasible region in LPP is exactly the solution set of a system of linear inequalities in two variables, graphed using the same half-plane shading technique.
## PREREQ_CONCEPT
Graphing a system of linear inequalities in two variables and identifying the intersection region (feasible region).

## PREREQ_BEFORE
Student must be able to: plot a line from its equation, determine which side of the line satisfies a linear inequality, find the intersection point of two lines algebraically, and evaluate a linear expression at given points.

## PREREQ_STUCK
If stuck, revisit c11_math_cbse_06_006 (graphing linear inequalities) and c9_math_ch2_5 (graph of linear equations) to practice drawing lines and shading half-planes correctly.

## WORKED_EXAMPLE_1
PROBLEM: A farmer in Punjab has 10 hectares of land to grow wheat and barley. Wheat yields a profit of ₹8,000 per hectare, barley ₹6,000 per hectare. Wheat requires 2 hours of labour per hectare, barley 1 hour; total labour available is 15 hours. Fertiliser: wheat 3 bags/ha, barley 2 bags/ha; maximum 24 bags. Formulate the LPP and solve graphically to maximise profit.

STEPS:
- Step 1: Define variables. Let x = hectares of wheat, y = hectares of barley. x ≥ 0, y ≥ 0.
- Step 2: Write constraints. Land: x + y ≤ 10. Labour: 2x + y ≤ 15. Fertiliser: 3x + 2y ≤ 24.
- Step 3: Write objective function. Maximise Z = 8000x + 6000y (profit in ₹).
- Step 4: Graph the lines. x+y=10 (intercepts 10,10); 2x+y=15 (intercepts 7.5,15); 3x+2y=24 (intercepts 8,12). Shade feasible region (first quadrant, below all three lines).
- Step 5: Find corner points by solving pairs: O(0,0); A(7.5,0) from 2x+y=15 & y=0; B(6,4) from x+y=10 & 3x+2y=24? Wait, solve correctly: x+y=10 and 2x+y=15 → subtract: x=5, y=5 → (5,5). Check fertiliser: 3(5)+2(5)=25 >24 → not feasible. So intersection of 2x+y=15 and 3x+2y=24: multiply first by 2: 4x+2y=30, subtract second: x=6, then y=3 → (6,3). Intersection of x+y=10 and 3x+2y=24: multiply first by 2: 2x+2y=20, subtract: x=4, y=6 → (4,6). Check labour: 2(4)+6=14 ≤15 ok. Intersection of x+y=10 and y=0: (10,0) but labour 20>15 not feasible. So feasible corners: O(0,0), A(7.5,0), B(6,3), C(4,6), D(0,12)? Wait D from 3x+2y=24 & x=0 → y=12, but land 12>10 not feasible. So actual corners: O(0,0), A(7.5,0), B(6,3), C(4,6), E(0,10) from x=0 & x+y=10? Check fertiliser at (0,10): 20 ≤24 ok, labour: 10 ≤15 ok. So E(0,10) is a corner.
- Step 6: Evaluate Z at each corner. O: 0; A: 8000(7.5)=60,000; B: 8000(6)+6000(3)=48,000+18,000=66,000; C: 8000(4)+6000(6)=32,000+36,000=68,000; E: 6000(10)=60,000.
- Step 7: Maximum Z = ₹68,000 at (4,6). Farmer should plant 4 ha wheat and 6 ha barley.

REASONING: The feasible region is a convex polygon bounded by the axes and three constraint lines. By Theorem 2, since the region is bounded, the maximum must occur at a vertex. We systematically find all vertices by solving every pair of boundary lines and keeping only those that satisfy all constraints. Evaluating the linear objective function at each vertex gives the optimal solution. The profit is linear in the decision variables, so its maximum over a convex polygon occurs at an extreme point.

ANSWER: Maximum profit ₹68,000 by cultivating 4 hectares of wheat and 6 hectares of barley.

## WORKED_EXAMPLE_2
PROBLEM: Minimise Z = 50x + 100y subject to x + 2y ≥ 10, 3x + 4y ≤ 24, x ≥ 0, y ≥ 0. Determine if the minimum exists and find it.

STEPS:
- Step 1: Identify constraints. x+2y ≥ 10 (region above line), 3x+4y ≤ 24 (region below line), x≥0, y≥0.
- Step 2: Graph lines. x+2y=10 (intercepts 10,5); 3x+4y=24 (intercepts 8,6). Feasible region is the intersection of half-planes: above first line, below second, in first quadrant. This region is a triangle with vertices: intersection of x+2y=10 and 3x+4y=24, intersection of x+2y=10 with y-axis (0,5), intersection of 3x+4y=24 with y-axis (0,6).
- Step 3: Find corner points. Intersection: multiply first by 2: 2x+4y=20; subtract from second: x=4, then 4+2y=10 → y=3. So A(4,3). B(0,5) from x+2y=10 & x=0. C(0,6) from 3x+4y=24 & x=0. Check: B(0,5) satisfies 3(0)+4(5)=20 ≤24 ok. C(0,6) satisfies 0+2(6)=12 ≥10 ok. Region is bounded (triangle ABC).
- Step 4: Evaluate Z = 50x + 100y. A: 50(4)+100(3)=200+300=500. B: 500. C: 600.
- Step 5: Minimum Z = 500 at both A(4,3) and B(0,5). Since two adjacent corners give the same minimum, every point on the segment AB also gives Z=500 (multiple optimal solutions).

REASONING: The feasible region is bounded, so both max and min exist by Theorem 2. The objective function's level lines are 50x+100y = k, or x+2y = k/50. The constraint x+2y ≥ 10 means the level lines are parallel to one boundary. When the objective is parallel to a constraint boundary, multiple optimal solutions occur along that edge. We must check all corners; if two adjacent corners yield the same value, the entire edge is optimal.

ANSWER: Minimum value of Z is 500, attained at all points on the line segment joining (4,3) and (0,5), i.e., for any (x,y) satisfying x+2y=10, 0≤x≤4.

## WORKED_EXAMPLE_3
PROBLEM: A company makes two models of chairs: Standard (profit ₹150) and Deluxe (profit ₹200). Each Standard requires 2 hours carpentry and 1 hour finishing; each Deluxe requires 1 hour carpentry and 3 hours finishing. Carpentry dept has 100 hours/week, finishing dept 90 hours/week. The company must produce at least 10 Standard chairs per week due to a contract. Formulate and solve graphically to maximise profit. Also determine if the feasible region is bounded.

STEPS:
- Step 1: Variables. x = Standard chairs, y = Deluxe chairs. x ≥ 10 (contract), y ≥ 0.
- Step 2: Constraints. Carpentry: 2x + y ≤ 100. Finishing: x + 3y ≤ 90. Contract: x ≥ 10. Non-negativity: x ≥ 10 (already), y ≥ 0.
- Step 3: Objective: Maximise Z = 150x + 200y.
- Step 4: Graph lines. 2x+y=100 (intercepts 50,100); x+3y=90 (intercepts 90,30); x=10 (vertical line). Feasible region: x ≥ 10, y ≥ 0, below both sloping lines. Find corners.
- Step 5: Corner points. Intersection of x=10 and 2x+y=100: 20+y=100 → y=80 → (10,80). Check finishing: 10+3(80)=250 >90 → not feasible. Intersection of x=10 and x+3y=90: 10+3y=90 → y=80/3 ≈ 26.67 → (10, 80/3). Check carpentry: 2(10)+80/3 = 20+26.67=46.67 ≤100 ok. Intersection of 2x+y=100 and x+3y=90: multiply second by 2: 2x+6y=180; subtract first: 5y=80 → y=16, then x+48=90 → x=42 → (42,16). Check x≥10 ok. Intersection of 2x+y=100 with y=0: (50,0) but x≥10 ok. Intersection of x+3y=90 with y=0: (90,0) but carpentry 180>100 not feasible. Intersection of x=10 with y=0: (10,0). So feasible corners: P(10,0), Q(10, 80/3), R(42,16), S(50,0).
- Step 6: Is region bounded? Yes, enclosed by x=10, y=0, 2x+y=100, x+3y=90 — a quadrilateral.
- Step 7: Evaluate Z. P: 150(10)=1500. Q: 150(10)+200(80/3)=1500+16000/3≈1500+5333.33=6833.33. R: 150(42)+200(16)=6300+3200=9500. S: 150(50)=7500.
- Step 8: Maximum Z = 9500 at (42,16).

REASONING: The additional constraint x ≥ 10 cuts off part of the usual first-quadrant region, creating a new vertical boundary. We must include this line when finding intersections. The region remains bounded because all constraints are ≤ or ≥ with finite intercepts, forming a closed polygon. The contract constraint shifts the feasible region rightward, changing the optimal mix.

ANSWER: Maximum weekly profit ₹9,500 by producing 42 Standard chairs and 16 Deluxe chairs. Feasible region is bounded.

## COMPETENCY_QUESTION_1
QUESTION: A dietitian designs a meal using Food A (₹40/unit, 10g protein, 5g fat) and Food B (₹60/unit, 5g protein, 10g fat). The meal must provide at least 50g protein and at most 60g fat. Formulate the LPP to minimise cost. Without solving, explain how you would determine graphically whether the feasible region is bounded or unbounded, and what that implies for the existence of a minimum cost.

COMPETENCY: Translating real-world situations to mathematical expressions and analysing boundedness implications.

STEPS:
- Step 1: Define variables x, y for units of Food A and B. Write constraints for protein (≥) and fat (≤) and non-negativity.
- Step 2: Write objective function: Minimise C = 40x + 60y.
- Step 3: To check boundedness graphically: plot the lines 10x+5y=50 (protein) and 5x+10y=60 (fat) in the first quadrant. The protein constraint requires the region above its line; the fat constraint requires the region below its line. Observe whether the intersection of these half-planes with the first quadrant forms a closed polygon (bounded) or extends infinitely (unbounded).
- Step 4: If bounded, minimum exists at a corner by Theorem 2. If unbounded, after finding the smallest corner value m, check if the open half-plane 40x+60y < m intersects the feasible region. If yes, no minimum exists; if no, m is the minimum.

ANSWER: LPP: Minimise C = 40x + 60y subject to 10x+5y ≥ 50 (protein), 5x+10y ≤ 60 (fat), x ≥ 0, y ≥ 0. The protein line has intercepts (5,0) and (0,10); fat line has intercepts (12,0) and (0,6). The region above the protein line and below the fat line in the first quadrant is a quadrilateral with vertices on the axes and the intersection of the two lines — it is bounded. Therefore, a minimum cost exists and will occur at a corner point.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Consider the LPP: Maximise Z = 3x + 2y subject to x + y ≤ 4, x - y ≥ 1, x ≥ 0, y ≥ 0. A student claims the maximum is 10 at (2,2) because 3(2)+2(2)=10. Identify the error in the student's claim by checking feasibility of (2,2) and finding the actual maximum.

COMPETENCY: Error identification and correction in graphical LPP solution.

STEPS:
- Step 1: Check if (2,2) satisfies all constraints. x+y=4 ≤4 ok. x-y=0 ≥1? No, 0 is not ≥1. So (2,2) is infeasible.
- Step 2: Graph the feasible region. x+y=4 (intercepts 4,4); x-y=1 (intercepts 1,0 and 0,-1 but y≥0 so from (1,0) upward). Region: below x+y=4, above x-y=1, first quadrant. Find corners: intersection of x+y=4 and x-y=1 → add: 2x=5 → x=2.5, y=1.5 → (2.5,1.5). Intersection of x-y=1 with y=0: (1,0). Intersection of x+y=4 with y=0: (4,0). Intersection of x+y=4 with x=0: (0,4) but x-y=0-4=-4 not ≥1 → not feasible. So feasible region is triangle with vertices (1,0), (2.5,1.5), (4,0).
- Step 3: Evaluate Z at corners. (1,0): 3. (2.5,1.5): 7.5+3=10.5. (4,0): 12.
- Step 4: Maximum Z = 12 at (4,0). The student's point (2,2) violated x-y ≥ 1, and even the correct corner (2.5,1.5) gives 10.5, not 10.

ANSWER: The point (2,2) is infeasible because it does not satisfy x - y ≥ 1 (0 ≥ 1 is false). The actual feasible region is a triangle with corners (1,0), (2.5,1.5), (4,0). The maximum value of Z is 12 at (4,0).

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: By Theorem 1, if an optimal value exists, it must occur at a corner point; by Theorem 2, if the ______ region is bounded, both maximum and minimum values exist and occur at corner points.

## DIAGNOSTIC_ANSWER_7
feasible

Feasible is the region's admission policy: every constraint simultaneously satisfied, no exceptions shaded in. **A wrong answer (a profitable) reveals the student has coloured the region by earnings when its only passport is obeying every constraint.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine a ______ bakery in Delhi that makes only two products: chocolate cakes (₹500 profit each) and fruit tarts (₹300 profit each).

## DIAGNOSTIC_ANSWER_8
small

The small qualifier keeps the bakery solvable by hand: two products, two constraints, a polygon of few corners. **A wrong answer (an industrial word) reveals the student has scaled the bakery past what graph paper can arbitrate.** The small bakery is the graphical method's natural habitat: two products draw a polygon the hand can shade and the eye can check.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can independently: (1) graph a system of linear inequalities to identify the feasible region and its corner points; (2) evaluate the objective function at every corner point; (3) correctly determine the maximum and minimum values (or state that no optimal value exists for unbounded regions) and the corresponding decision.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Imagine a small bakery in Delhi that makes only two products: ______ cakes (₹500 profit each) and fruit tarts (₹300 profit each).

## DIAGNOSTIC_ANSWER_10
chocolate

The chocolate word pairs the cakes with their higher profit: the objective's steeper coefficient rides on this product's count. **A wrong answer (any other flavour) reveals the student has reassigned the profit coefficients mid-problem.** The chocolate word carries the larger profit: its coefficient is the steeper of the two, and corner comparisons hinge on it.
