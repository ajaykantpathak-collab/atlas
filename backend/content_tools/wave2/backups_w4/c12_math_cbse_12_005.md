## ELI5
A Jaipur workshop carves toy cars and dresses dolls under carving and painting hours: maximisation is choosing the weekly plan that makes profit largest over the feasible region. The Corner Point Method is the verdict procedure - graph the constraints, harvest the vertices, price the objective at each, and let the bounded region's biggest number win. Unbounded regions play by stricter rules: the champion corner must survive the open half-plane test first.

## DEFINITION
In a Linear Programming Problem (LPP), maximisation or minimisation refers to finding the optimal value (maximum or minimum) of a linear objective function \(Z = ax + by\) over a feasible region defined by a system of linear inequalities (constraints) including non-negativity restrictions \(x \ge 0, y \ge 0\). The Corner Point Method guarantees that if an optimal value exists, it occurs at a corner point (vertex) of the feasible region; for bounded regions both maximum and minimum exist, while for unbounded regions existence must be verified by checking whether the open half-plane \(ax + by > M\) (or \(< m\)) has any point in common with the feasible region.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can (1) graph the feasible region from a set of linear constraints, (2) identify all corner points correctly by solving intersecting lines, (3) evaluate the objective function at each corner point, (4) determine the optimal value for bounded regions directly, and (5) for unbounded regions correctly apply the open half-plane test to decide whether the candidate optimum is truly the maximum/minimum or whether no optimum exists.

## SCOPE_BOUNDARY
Covers the Corner Point Method for solving LPPs in two variables graphically as per NCERT Class 12: bounded and unbounded feasible regions, multiple optimal solutions, and the special verification step for unbounded regions. Does NOT cover the Simplex method, problems with more than two decision variables, sensitivity analysis, or integer programming.

## WALKTHROUGH
Imagine a small workshop in Jaipur that makes wooden toys: cars (₹50 profit each) and dolls (₹40 profit each). Each car needs 2 hours of carving and 1 hour of painting; each doll needs 1 hour of carving and 2 hours of painting. The workshop has 100 carving-hours and 80 painting-hours per week. How many of each toy should be made to maximise weekly profit? Start by writing the decision variables (x = cars, y = dolls), then the constraints (2x + y ≤ 100, x + 2y ≤ 80, x,y ≥ 0), then the objective function (Z = 50x + 40y). This connects directly to Class 11 graphical solution of linear inequalities (c11_math_cbse_06_006). The key insight: because the feasible region is a convex polygon, the maximum profit will always occur at one of its vertices — we only need to check those few points.

Takeaway first: maximisation and minimisation are the same procedure reading the table from opposite ends - biggest or smallest corner value, licence checked for unbounded regions. Exam moves: full-solve questions graphing and pricing every corner, unbounded-region questions applying the half-plane test, and formulation questions preceding the graphical work. Method: rerun the workshop - variables for cars and dolls, two resource inequalities, non-negativity, corners evaluated, maximum announced. Check yourself: minimisation problems read the smallest corner, but existence still depends on boundedness or the half-plane test - direction of reading never waives the licence. Drill: solve one maximisation completely, then restate the procedure's differences for minimisation.

## DIAGNOSTIC_QUESTION_1
State the two fundamental theorems (Theorem 1 and Theorem 2) used in the Corner Point Method for solving a linear programming problem graphically.

## DIAGNOSTIC_ANSWER_1
Theorem 1: If the objective function \(Z = ax + by\) has an optimal value (maximum or minimum) on the feasible region \(R\) (a convex polygon), that optimal value must occur at a corner point (vertex) of \(R\). Theorem 2: If the feasible region \(R\) is bounded, then \(Z\) has both a maximum and a minimum value on \(R\), and each occurs at a corner point of \(R\). A wrong answer (e.g., saying the optimum occurs at the centre or on an edge) reveals the student has not internalised the geometric reason — linearity of \(Z\) forces extreme values to the boundary, and convexity forces them to vertices.

## DIAGNOSTIC_QUESTION_2
A student solves an LPP and finds the feasible region is unbounded. The smallest value of \(Z\) at the corner points is \(-300\) at \((6,0)\). The student immediately writes "Minimum value of Z is \(-300\)". Why is this conclusion potentially incorrect, and what additional step must be performed?

## DIAGNOSTIC_ANSWER_2
For an unbounded feasible region, a candidate minimum value at a corner point is only the true minimum if the open half-plane \(ax + by < m\) (here \(Z < -300\)) has **no point in common** with the feasible region. If that half-plane overlaps the feasible region, the objective function can decrease indefinitely and no minimum exists. The student's error is skipping the verification step (Step 3(ii) of the Corner Point Method), which is mandatory for unbounded regions.

## DIAGNOSTIC_QUESTION_3
Maximise \(Z = 3x + 4y\) subject to \(x + y \le 4, x \ge 0, y \ge 0\). Find the maximum value of \(Z\) and the point(s) where it occurs.

## DIAGNOSTIC_ANSWER_3
Constraints: \(x+y\le4, x\ge0, y\ge0\). Feasible region is a right triangle with vertices O(0,0), A(4,0), B(0,4). Evaluate Z: O→0, A→12, B→16. Maximum Z = 16 at (0,4). A wrong answer (e.g., 12 at (4,0)) usually comes from mis-identifying the corner points or incorrectly evaluating the objective function at (0,4).

## DIAGNOSTIC_QUESTION_4
Consider the LPP: Minimise \(Z = -50x + 20y\) subject to \(2x - y \ge -5, 3x + y \ge 3, 2x - 3y \le 12, x\ge0, y\ge0\). The feasible region is unbounded. The corner points give values: (0,5)→100, (0,3)→60, (1,0)→-50, (6,0)→-300. The student claims the minimum is -300 at (6,0). Is this correct? Justify by performing the required half-plane test.

## DIAGNOSTIC_ANSWER_4
Candidate minimum \(m = -300\). Test the open half-plane \(-50x + 20y < -300\) i.e. \(-5x + 2y < -30\). The origin (0,0) gives \(0 < -30\) false, so the half-plane is away from origin. But the feasible region extends infinitely in the direction of increasing \(x\) and \(y\); pick a point like (10,10): \(-50(10)+20(10) = -300\) which is not < -300, but (20,0): \(-1000 < -300\) true and (20,0) satisfies all constraints? Check: 2(20)-0=40≥-5 ✓, 3(20)+0=60≥3 ✓, 2(20)-0=40≤12 ✗. So (20,0) not feasible. However, the ray from (6,0) along the line 2x-3y=12 goes to infinity; take (12,4): -50(12)+20(4)=-600+80=-520 < -300, and check constraints: 2(12)-4=20≥-5 ✓, 3(12)+4=40≥3 ✓, 2(12)-3(4)=12≤12 ✓. So (12,4) is feasible and gives Z=-520 < -300. Hence the half-plane **does** intersect the feasible region → **no minimum exists**. The student's claim is wrong because they omitted the verification step.

## DIAGNOSTIC_QUESTION_5
A student solves an LPP and gets two corner points giving the same maximum value of the objective function. The student writes: "The maximum occurs at both points, so there are two optimal solutions." Is this statement complete? What does the NCERT remark say about the set of all optimal solutions in this case?

## DIAGNOSTIC_ANSWER_5
The statement is incomplete. When two corner points yield the same optimal value, **every point on the line segment joining them** also gives that same optimal value (because the objective function is linear and constant on that edge). The student misses the infinite family of optimal solutions along that edge. This error shows they treat corner points as isolated rather than understanding the linear structure of the objective function on the boundary.

## DIAGNOSTIC_QUESTION_6
Create a real-world maximisation problem (Indian context) with two decision variables, three constraints (excluding non-negativity), and a bounded feasible region. Write the complete mathematical formulation and solve it graphically using the Corner Point Method. Show all corner points and the optimal solution.

## DIAGNOSTIC_ANSWER_6
Example: A farmer in Punjab has 50 acres of land. He grows wheat (₹2000 profit/acre) and rice (₹3000 profit/acre). Wheat needs 2 hours/acre of labour, rice needs 3 hours/acre; total labour available is 120 hours. Fertiliser: wheat 50 kg/acre, rice 40 kg/acre; max 2000 kg. Let x = acres of wheat, y = acres of rice. Maximise Z = 2000x + 3000y subject to: x + y ≤ 50, 2x + 3y ≤ 120, 50x + 40y ≤ 2000 → 5x + 4y ≤ 200, x≥0, y≥0. Corner points: O(0,0), A(40,0), B(0,40), C(20,20) [intersection of x+y=50 and 2x+3y=120], D(0,50) but D violates 2x+3y≤120? Actually (0,50): 2(0)+3(50)=150>120 so not feasible. Intersection of 2x+3y=120 and 5x+4y=200 gives (0,40) and (40,0) and (80/7, 200/7) ≈ (11.4,28.6). Feasible region vertices: O(0,0), A(40,0), E(80/7,200/7), B(0,40). Z values: 0, 80000, 2000(80/7)+3000(200/7)= (160000+600000)/7=760000/7≈108571, 120000. Max = 120000 at (0,40) i.e. 40 acres rice, 0 wheat. A good answer includes correct formulation, accurate graph, all corner points identified by solving pairs of equations, and correct optimum.

## COMMON_MISCONCEPTION
Students often forget to check the **non-negativity constraints** \(x \ge 0, y \ge 0\) when finding corner points, leading to vertices with negative coordinates that are not actually in the feasible region. For example, in the problem: Maximise \(Z = 3x + 2y\) subject to \(x + y \le 4, x - y \ge 1, x \ge 0, y \ge 0\), the intersection of \(x+y=4\) and \(x-y=1\) is \((2.5, 1.5)\) — valid. But if a student solves \(x+y=4\) and \(x-y=1\) without checking \(x\ge0,y\ge0\), they might miss that the line \(x-y=1\) intersects the axes at (1,0) and (0,-1); the latter is invalid. A more subtle error: in unbounded regions, students assume the smallest corner value is the minimum without drawing the half-plane \(ax+by < m\) to verify no feasible points lie there. This costs full marks in board exams and leads to wrong answers in JEE where unbounded regions are common.

## ON_FAILURE
1. Revisit **c11_math_cbse_06_006** (Graphical Solution of Linear Inequalities in Two Variables) — practice shading the correct half-plane for each inequality and identifying the intersection region. 2. Revisit **c12_math_cbse_12_003** (Feasible Region and Corner Points) — drill finding intersection points by solving pairs of boundary lines, and discarding any point with negative coordinates. 3. For the unbounded-region verification step, do a focused exercise: take the NCERT Example 4, plot the feasible region, draw the line \(-50x+20y = -300\), then shade the half-plane \(-50x+20y < -300\) and check overlap. 4. Re-diagnostic: Give the student an unbounded LPP where the candidate minimum **is** the true minimum (half-plane has no overlap) and one where it is not; ask them to perform the test and state the conclusion.

## PREREQUISITE_NODE_IDS
c12_math_cbse_12_001, c12_math_cbse_12_002, c12_math_cbse_12_003, c12_math_cbse_12_004, c11_math_cbse_06_006, c11_math_cbse_10_006, c11_math_cbse_10_009

## PREREQUISITE_REASONS
c12_math_cbse_12_001: Provides the mathematical formulation (objective function, constraints, decision variables) that this node optimises.
c12_math_cbse_12_002: Teaches the graphical method of plotting constraints and identifying the feasible region — the geometric foundation for corner point evaluation.
c12_math_cbse_12_003: Defines feasible region, corner points, and how to compute their coordinates by solving simultaneous equations.
c12_math_cbse_12_004: Distinguishes bounded vs unbounded feasible regions, which determines whether the Corner Point Method gives the answer directly or requires the extra half-plane test.
c11_math_cbse_06_006: Prerequisite skill of graphing linear inequalities in two variables and finding their solution region.
c11_math_cbse_10_006: Slope of a line is needed to draw constraint boundaries accurately and to understand the direction of the objective function.
c11_math_cbse_10_009: Various forms of line equations (intercept form, slope-intercept) are used to quickly plot the constraint lines.

## FORWARD_NODE_IDS
c12_math_cbse_12_006
## FORWARD_REASONS
c12_math_cbse_12_006: Word problems (diet, manufacturing, transportation) require the student to first formulate the LPP (node 001), graph the feasible region (nodes 002-004), and then apply the Corner Point Method (this node) to find the optimal solution. Mastery of maximisation/minimisation is essential before tackling applied word problems.

## CROSS_SUBJECT_PREREQS
c11_stat_cbse_05_001, c11_stat_cbse_05_004
## CROSS_SUBJECT_REASONS
c11_stat_cbse_05_001: The concept of optimisation (maximising profit/minimising cost) is central to decision-making in economics and operations research, which use statistical data for constraints and objective coefficients.
c11_stat_cbse_05_004: Weighted arithmetic mean appears in formulating objective functions when profits/costs are averaged over multiple products with different weights.

## CHAIN_DESCRIPTION
c11_math_cbse_06_006 -> c12_math_cbse_12_001 -> c12_math_cbse_12_002 -> c12_math_cbse_12_003 -> c12_math_cbse_12_004 -> c12_math_cbse_12_005 -> c12_math_cbse_12_006

## THIS_FORMULA
Corner Point Method:
1. Graph the feasible region and find all corner points (vertices).
2. Evaluate \(Z = ax + by\) at each corner point. Let \(M = \max Z\), \(m = \min Z\).
3. If feasible region is bounded: \(M\) = maximum, \(m\) = minimum.
4. If feasible region is unbounded:
   - \(M\) is maximum iff the open half-plane \(ax + by > M\) has **no** point in common with feasible region; else no maximum.
   - \(m\) is minimum iff the open half-plane \(ax + by < m\) has **no** point in common with feasible region; else no minimum.

## FORMULA_VARIABLES
\(a, b\) = coefficients of objective function (profit/cost per unit); \(x, y\) = decision variables (quantities); \(Z\) = objective function value (total profit/cost); \(M\) = largest corner value; \(m\) = smallest corner value.

## FORMULA_UNITS
\(x, y\) in units (pieces, acres, hours); \(a, b\) in ₹/unit; \(Z\) in ₹; constraints in resource units (hours, kg, ₹, pieces).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_06_003 | In physics, optimisation of work done or energy in constrained systems (e.g., maximising range of projectile under height constraint) uses the same corner-point logic: the extreme of a linear/quadratic function on a convex domain occurs at the boundary.
 c12_eco_cbse_02_004 | Producer's equilibrium (cost minimisation for given output or output maximisation for given cost) is a linear programming problem when production functions are linear; the iso-cost and iso-quant lines are linear constraints, and the optimum occurs at a corner of the feasible input combination region.
## PREREQ_CONCEPT
Graphical solution of a system of linear inequalities in two variables (finding the feasible region and its vertices).

## PREREQ_BEFORE
The student must be able to plot lines from linear equations, determine which side of the line satisfies the inequality, and solve two linear equations simultaneously to find intersection points.

## PREREQ_STUCK
If stuck, go back to Class 11 Chapter 6 (Linear Inequalities) and practice graphing systems of 3-4 inequalities and identifying all corner points of the resulting polygon.

## WORKED_EXAMPLE_1
PROBLEM: A small factory in Gujarat produces two types of steel utensils: Type A (profit ₹30) and Type B (profit ₹40). Type A requires 2 hours on Machine I and 1 hour on Machine II. Type B requires 1 hour on Machine I and 2 hours on Machine II. Machine I is available for 80 hours/week, Machine II for 100 hours/week. Formulate the LPP and find the production plan that maximises weekly profit using the Corner Point Method.

STEPS:
- Step 1: Define decision variables. Let \(x\) = number of Type A utensils, \(y\) = number of Type B utensils per week. Both \(x \ge 0, y \ge 0\).
- Step 2: Write constraints. Machine I: \(2x + y \le 80\). Machine II: \(x + 2y \le 100\). Non-negativity: \(x \ge 0, y \ge 0\).
- Step 3: Write objective function. Maximise \(Z = 30x + 40y\) (profit in ₹).
- Step 4: Graph the feasible region. Find intercepts: \(2x+y=80\) → (40,0) and (0,80); \(x+2y=100\) → (100,0) and (0,50). The feasible region is the polygon with vertices O(0,0), A(40,0), B(0,50), and intersection of \(2x+y=80\) and \(x+2y=100\). Solve: multiply second by 2: \(2x+4y=200\); subtract first: \(3y=120 \Rightarrow y=40\), then \(x=20\). So corner point C(20,40).
- Step 5: Evaluate Z at each corner. O: 0; A(40,0): 1200; B(0,50): 2000; C(20,40): \(30(20)+40(40)=600+1600=2200\).
- Step 6: Feasible region is bounded (closed polygon). Maximum Z = 2200 at (20,40). So produce 20 Type A and 40 Type B for max profit ₹2200.

REASONING: The constraints are linear inequalities; their intersection is a convex polygon. By Theorem 2, since the region is bounded, the maximum of the linear objective function must occur at a vertex. We computed Z at all four vertices and picked the largest.

ANSWER: Maximum profit ₹2200 by producing 20 Type A and 40 Type B utensils per week.

## WORKED_EXAMPLE_2
PROBLEM: Minimise \(Z = 5x + 10y\) subject to \(x + 2y \ge 120, x + y \ge 60, x - 2y \ge 0, x \ge 0, y \ge 0\). Determine if the feasible region is bounded or unbounded, and find the minimum value of Z.

STEPS:
- Step 1: Plot the constraints. \(x+2y=120\) → (120,0), (0,60); inequality \(\ge\) so region away from origin. \(x+y=60\) → (60,0), (0,60); \(\ge\) away from origin. \(x-2y=0\) → line through origin with slope 1/2; \(\ge\) means region below the line (since at (1,0): 1≥0 true). Non-negativity: first quadrant.
- Step 2: Find corner points. Intersection of \(x+2y=120\) and \(x+y=60\): subtract → \(y=60\), then \(x=0\) → point P(0,60). Intersection of \(x+y=60\) and \(x-2y=0\): substitute \(x=2y\) → \(3y=60 \Rightarrow y=20, x=40\) → Q(40,20). Intersection of \(x+2y=120\) and \(x-2y=0\): \(x=2y\) → \(4y=120 \Rightarrow y=30, x=60\) → R(60,30). Also check axes intercepts: on y-axis, \(x=0\) gives from \(x+2y\ge120 \Rightarrow y\ge60\) and \(x+y\ge60 \Rightarrow y\ge60\), so (0,60) is the lowest. On x-axis, \(y=0\) gives \(x\ge120\) and \(x\ge60\) and \(x\ge0\) → (120,0) is a corner? But \(x-2y\ge0\) is \(x\ge0\) satisfied. However, the line \(x-2y=0\) passes through origin; the region \(x-2y\ge0\) is to the right of this line. The feasible region is the area **above** both \(x+2y=120\) and \(x+y=60\) and **to the right of** \(x-2y=0\). This region is **unbounded** (extends infinitely to the northeast). Its vertices are P(0,60), Q(40,20), R(60,30) — and it has no other vertices; the boundary goes from P along \(x+2y=120\) to R, then along \(x-2y=0\) to infinity, and from P along \(x+y=60\) to Q, then along \(x-2y=0\) to infinity.
- Step 3: Evaluate Z at corner points. P(0,60): \(5(0)+10(60)=600\). Q(40,20): \(5(40)+10(20)=200+200=400\). R(60,30): \(5(60)+10(30)=300+300=600\). Smallest value \(m = 400\) at Q(40,20).
- Step 4: Since region is unbounded, verify if 400 is truly the minimum. Test half-plane \(5x+10y < 400\) i.e. \(x+2y < 80\). The feasible region requires \(x+2y \ge 120\) (from first constraint). The half-plane \(x+2y < 80\) and the feasible region \(x+2y \ge 120\) have **no overlap** (since 80 < 120). Therefore, no feasible point gives Z < 400. Minimum exists and is 400.

REASONING: The feasible region is unbounded, so we cannot automatically accept the smallest corner value as the minimum. We must check whether the open half-plane corresponding to values lower than that corner value intersects the feasible region. Here the constraint \(x+2y \ge 120\) itself prevents any point with \(x+2y < 80\), so the minimum is confirmed.

ANSWER: Minimum value of Z is 400 at (40,20). Feasible region is unbounded.

## WORKED_EXAMPLE_3
PROBLEM: A dietitian in a Delhi hospital wants to mix two foods, F1 and F2, to meet minimum daily requirements of vitamins A and B at minimum cost. F1 costs ₹50/kg and contains 4 units/kg of vitamin A and 3 units/kg of vitamin B. F2 costs ₹70/kg and contains 3 units/kg of vitamin A and 6 units/kg of vitamin B. The diet must contain at least 120 units of vitamin A and 180 units of vitamin B. Formulate and solve graphically. Also check if the feasible region is bounded.

STEPS:
- Step 1: Variables. \(x\) = kg of F1, \(y\) = kg of F2. \(x \ge 0, y \ge 0\).
- Step 2: Constraints. Vitamin A: \(4x + 3y \ge 120\). Vitamin B: \(3x + 6y \ge 180\) → divide by 3: \(x + 2y \ge 60\). Non-negativity.
- Step 3: Objective. Minimise cost \(Z = 50x + 70y\).
- Step 4: Graph. \(4x+3y=120\) → (30,0), (0,40). \(x+2y=60\) → (60,0), (0,30). Both \(\ge\) so region away from origin. Intersection of the two lines: solve \(4x+3y=120\) and \(x+2y=60\). From second, \(x = 60 - 2y\). Substitute: \(4(60-2y)+3y=120 \Rightarrow 240 - 8y + 3y = 120 \Rightarrow 5y = 120 \Rightarrow y = 24\). Then \(x = 60 - 48 = 12\). Corner point P(12,24). Other corners: on y-axis, \(x=0\): from \(4(0)+3y\ge120 \Rightarrow y\ge40\); from \(x+2y\ge60 \Rightarrow y\ge30\). So (0,40) is a corner. On x-axis, \(y=0\): \(4x\ge120 \Rightarrow x\ge30\); \(x\ge60\). So (60,0) is a corner. Feasible region is the area **above both lines** in the first quadrant — it is **unbounded** (extends infinitely up and right). Vertices: A(60,0), P(12,24), B(0,40).
- Step 5: Evaluate Z. A(60,0): \(50(60)=3000\). P(12,24): \(50(12)+70(24)=600+1680=2280\). B(0,40): \(70(40)=2800\). Smallest \(m = 2280\) at P(12,24).
- Step 6: Unbounded region → verify minimum. Test half-plane \(50x+70y < 2280\) i.e. \(5x+7y < 228\). Does it intersect feasible region? The feasible region satisfies \(4x+3y \ge 120\) and \(x+2y \ge 60\). We need to see if there is any point with \(5x+7y < 228\) that also satisfies these. Try a point far out on the ray from P along the boundary? Actually, the objective function line \(5x+7y=228\) has slope -5/7 ≈ -0.714. The constraint lines have slopes -4/3 ≈ -1.33 and -1/2 = -0.5. The objective slope is between them. In an unbounded region where the objective slope lies between the slopes of the two bounding edges that meet at the vertex, the minimum **is** at that vertex and the half-plane \(5x+7y < 228\) will not intersect the feasible region. Check: take a point on the edge \(4x+3y=120\) beyond P, say \(x=0, y=40\) (that's B, Z=2800>2280). On the other edge \(x+2y=60\) beyond P, say \(x=60, y=0\) (A, Z=3000). Any point inside the region has larger x,y → larger Z. So half-plane \(5x+7y < 228\) is below the line through P; the feasible region is above both constraints, which at P meet. The line \(5x+7y=228\) is a supporting line. The half-plane \(<228\) is on the origin side; but the feasible region is away from origin. So no intersection. Minimum confirmed.

REASONING: This combines formulation (node 001), graphing (002), corner points (003), boundedness (004), and the unbounded verification step (this node). The cost coefficients (50,70) give an objective slope between the two active constraint slopes, guaranteeing the minimum at the intersection.

ANSWER: Minimum cost ₹2280 by mixing 12 kg of F1 and 24 kg of F2. Feasible region is unbounded.

## COMPETENCY_QUESTION_1
QUESTION: A company manufactures two products P and Q. Each unit of P requires 2 hours of machining and 1 hour of assembly; each unit of Q requires 1 hour of machining and 2 hours of assembly. The company has 100 machining hours and 80 assembly hours available per week. Profit per unit is ₹200 for P and ₹150 for Q. The company wants to maximise profit. (a) Formulate the LPP. (b) A student claims that since profit per unit of P (₹200) is higher than Q (₹150), the company should produce only P. Is this reasoning correct? Justify your answer by solving the LPP graphically and comparing the optimal solution with the student's suggestion. (c) If the profit on Q increases to ₹250 while P remains ₹200, how does the optimal solution change? Explain without re-solving the entire LPP.

COMPETENCY: Translating real-world situations to mathematical expressions, and comparing and justifying decisions using graphical optimisation.

STEPS:
- Step 1: Formulate LPP: Let x = units of P, y = units of Q. Maximise Z = 200x + 150y subject to 2x + y ≤ 100, x + 2y ≤ 80, x,y ≥ 0.
- Step 2: Find corner points: O(0,0), A(50,0), B(0,40), C(40,20) [intersection of 2x+y=100 and x+2y=80 → 3x=120? Wait: solve: from first y=100-2x; second: x+2(100-2x)=80 → x+200-4x=80 → -3x=-120 → x=40, y=20]. Evaluate Z: O=0, A=10000, B=6000, C=200(40)+150(20)=8000+3000=11000. Max = 11000 at (40,20).
- Step 3: Student's suggestion (only P) gives 50 units of P → profit ₹10000. Optimal mix gives ₹11000. So student is wrong because constraints on assembly hours force a mix; producing only P leaves assembly hours unused (50 hours used out of 80) while machining is fully used. Adding Q uses leftover assembly hours and increases profit.
- Step 4: New profit: Z' = 200x + 250y. The slope of objective changes from -200/150 = -4/3 ≈ -1.33 to -200/250 = -4/5 = -0.8. The constraint slopes are -2 (machining) and -1/2 (assembly). The new slope -0.8 is still between -2 and -0.5? Actually -2 < -0.8 < -0.5? No: -2 is steeper negative, -0.5 is shallower. On the number line, -2 < -0.8 < -0.5 is false because -0.8 < -0.5? Wait: -0.8 is more negative than -0.5? No, -0.5 > -0.8. So order: -2 < -0.8 < -0.5. Yes, -0.8 lies between the two constraint slopes. So the optimal vertex remains the intersection of the two constraints (40,20). But we must check if the vertex changes? The feasible region is same. The objective line rotates anti-clockwise (slope increases from -1.33 to -0.8). Since it's still between the two binding constraint slopes, the optimum stays at the same corner (40,20). New profit = 200(40)+250(20)=8000+5000=13000.

ANSWER: (a) Maximise Z=200x+150y s.t. 2x+y≤100, x+2y≤80, x,y≥0. (b) Student is wrong; optimal is 40 P and 20 Q giving ₹11000 > ₹10000. (c) Optimal solution remains (40,20) because the new objective slope -0.8 still lies between the slopes of the two binding constraints (-2 and -0.5), so the same corner point remains optimal. Profit increases to ₹13000.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: (Case-based) A farmer in Maharashtra has 200 acres of land. He can grow cotton (profit ₹8000/acre) and soyabean (profit ₹5000/acre). Cotton requires 100 litres of water/acre and 2 kg of pesticide/acre; soyabean requires 50 litres of water/acre and 1 kg of pesticide/acre. Water available: 15000 litres; pesticide: 300 kg. The government mandates that at least 20% of the land must be used for soyabean. (a) Formulate the LPP to maximise profit. (b) The farmer argues that since cotton gives higher profit per acre, he should use the minimum allowed land for soyabean (i.e., 40 acres) and the rest for cotton. Use the Corner Point Method to check if this strategy is optimal. (c) If water availability drops to 10000 litres, does the feasible region become empty? Justify.

COMPETENCY: Multi-step analytical reasoning with real-world constraints, including a policy constraint (minimum percentage), and evaluating a proposed strategy.

STEPS:
- Step 1: Variables: x = acres of cotton, y = acres of soyabean. x≥0, y≥0.
- Step 2: Constraints: Land: x + y ≤ 200. Water: 100x + 50y ≤ 15000 → 2x + y ≤ 300. Pesticide: 2x + y ≤ 300 (same as water! so redundant). Soyabean mandate: y ≥ 0.2(x+y) → y ≥ 0.2x + 0.2y → 0.8y ≥ 0.2x → 4y ≥ x → x - 4y ≤ 0. Also y ≥ 40 (since 20% of 200 = 40, but the percentage constraint is more precise).
- Step 3: Objective: Maximise Z = 8000x + 5000y.
- Step 4: Find corner points of feasible region. Intersection of x+y=200 and x-4y=0: substitute x=4y → 5y=200 → y=40, x=160 → P(160,40). Intersection of x+y=200 and 2x+y=300: subtract → x=100, y=100 → Q(100,100). Intersection of x-4y=0 and 2x+y=300: x=4y → 8y+y=300 → 9y=300 → y=100/3 ≈33.33, x=400/3≈133.33 → but check x+y ≤200: 133.33+33.33=166.66 ≤200 ok. Also check y≥40? 33.33 < 40, so this point violates the mandate? Wait, the mandate is y ≥ 0.2(x+y) which gave x-4y≤0. At (133.33,33.33): x-4y=0, so it satisfies equality. But y=33.33, total land=166.66, 20% of 166.66 is 33.33, so it satisfies the percentage constraint. However, the farmer also has the land constraint x+y≤200; this point uses only 166.66 acres. Is there a constraint that he must use all 200 acres? No, "has 200 acres" means up to 200. So (133.33,33.33) is feasible. But wait, the percentage constraint is y ≥ 0.2(x+y). At (133.33,33.33), y=33.33, total=166.66, 20% is 33.33, so equality holds. So it's a corner. Also intercepts: on y-axis, x=0: from x+y≤200 → y≤200; from 2x+y≤300 → y≤300; from x-4y≤0 → -4y≤0 → y≥0. So (0,200) is feasible? But mandate: y≥0.2(0+y) → y≥0.2y → 0.8y≥0 true. So (0,200) is a corner. On x-axis, y=0: mandate gives 0≥0.2x → x≤0, so only (0,0). But (0,0) violates nothing? Mandate: 0≥0.2(0) true. But is (0,0) a corner? The feasible region is bounded by x+y=200, 2x+y=300, x-4y=0, and axes. Let's list all intersections that satisfy all constraints:
1. (0,0)
2. (0,200) — intersection of x=0 and x+y=200
3. (100,100) — intersection of x+y=200 and 2x+y=300
4. (150,0) — intersection of y=0 and 2x+y=300? But mandate x-4y≤0 → x≤0, so (150,0) violates mandate. So not feasible.
5. Intersection of x-4y=0 and x+y=200 → (160,40) — P
6. Intersection of x-4y=0 and 2x+y=300 → (133.33,33.33) — R
Check R against x+y≤200: 166.66 ≤200 ok.
So feasible region vertices in order: (0,0), (0,200), (100,100), (160,40), (133.33,33.33)? Wait, (0,0) to (0,200) is y-axis. (0,200) to (100,100) is x+y=200. (100,100) to (160,40) is? (160,40) is on x+y=200? 160+40=200 yes. So (100,100) to (160,40) is along x+y=200. Then (160,40) to (133.33,33.33) is along x-4y=0? Check: 160-4*40=0 yes. 133.33-4*33.33=0 yes. Then (133.33,33.33) to (0,0) is along x-4y=0? But (0,0) is on that line. So the feasible region is a polygon with vertices (0,0), (0,200), (100,100), (160,40), (133.33,33.33). But wait, (133.33,33.33) has y=33.33 which is less than 40. The mandate is percentage, not absolute 40 acres. So it's allowed. However, the farmer's suggestion is to use minimum soyabean i.e., y=40 (when x+y=200). That's point (160,40). Let's evaluate Z at all vertices:
(0,0): 0
(0,200): 5000*200 = 1,000,000
(100,100): 8000*100 + 5000*100 = 1,300,000
(160,40): 8000*160 + 5000*40 = 1,280,000 + 200,000 = 1,480,000
(133.33,33.33): 8000*133.33 + 5000*33.33 ≈ 1,066,640 + 166,650 = 1,233,290
Maximum is at (160,40) with ₹1,480,000.
- Step 5: Farmer's suggestion: minimum soyabean (40 acres) and rest cotton (160 acres) → exactly (160,40). That IS the optimal solution! So his reasoning accidentally hits the optimum, but his logic "since cotton has higher profit per acre, use minimum soyabean" is not generally valid; it worked here because the constraints made that corner optimal. We must verify by Corner Point Method.
- Step 6: If water drops to 10000 litres: constraint 2x+y ≤ 200 (since 100x+50y≤10000 → 2x+y≤200). Now compare with land x+y≤200. The line 2x+y=200 has intercepts (100,0) and (0,200). The line x+y=200 has intercepts (200,0) and (0,200). The feasible region requires x+y≤200 AND 2x+y≤200 AND x-4y≤0. The region 2x+y≤200 is stricter than x+y≤200 for x>0 (since 2x+y ≤ x+y+ x ≤ 200 + x, not directly). Actually, for a given y, 2x+y ≤200 allows less x than x+y≤200. So the water constraint is binding. The feasible region is now bounded by 2x+y=200, x-4y=0, and axes. Intersection of 2x+y=200 and x-4y=0: x=4y → 8y+y=200 → 9y=200 → y=200/9≈22.22, x=800/9≈88.89. Check mandate: y≥0.2(x+y)? 22.22 ≥ 0.2(111.11)=22.22 ok. Also x+y=111.11≤200 ok. Vertices: (0,0), (0,200) but (0,200) violates 2x+y≤200? 0+200=200 ≤200 ok. Wait, (0,200) satisfies 2x+y=200. So (0,200) is on the water line. And (0,200) satisfies x-4y≤0? 0-800≤0 yes. So (0,200) is a vertex. Intersection of 2x+y=200 and x+y=200? Subtract: x=0, y=200. So they meet at (0,200). The water line and land line meet at (0,200). The other intersection of water line with x-axis is (100,0) but violates mandate. So feasible region vertices: (0,0), (0,200), (88.89,22.22). And maybe (100,0) is not feasible. So region is a triangle. Not empty. So feasible region is not empty.

ANSWER: (a) Maximise Z=8000x+5000y s.t. x+y≤200, 2x+y≤300, x-4y≤0, x,y≥0. (b) Farmer's suggestion (160,40) gives profit ₹1,480,000. Corner point evaluation shows this is indeed the maximum. However, his reasoning is not a proof; the Corner Point Method confirms it. (c) With water=10000, constraint becomes 2x+y≤200. Feasible region has vertices (0,0), (0,200), (800/9, 200/9) ≈ (88.89,22.22). It is non-empty (e.g., (0,100) satisfies all: 0+100≤200, 0+100≤200, 0-400≤0). So not empty.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine a small ______ in Jaipur that makes wooden toys: cars (₹50 profit each) and dolls (₹40 profit each).

## DIAGNOSTIC_ANSWER_7
workshop

The workshop is the problem's stage: two toys, two resource ceilings, and one weekly profit to maximise. **A wrong answer (a factory) reveals the student has scaled the workshop beyond the hand-drawn feasible region.** The workshop is the problem's scale: two toys, two weekly hour ceilings, and a profit line to maximise over the corners.

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
The student can (1) graph the feasible region from a set of linear constraints, (2) identify all corner points correctly by solving intersecting lines, (3) evaluate the objective function at each corner point, (4) determine the optimal value for bounded regions directly, and (5) for unbounded regions correctly apply the open half-plane.
