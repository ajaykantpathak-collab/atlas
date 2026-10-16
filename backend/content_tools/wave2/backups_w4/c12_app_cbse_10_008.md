## ELI5
Plot the flour line and the hours line, test the origin to shade each correctly, and the feasible polygon appears in the first quadrant. Corners come from solving the intersecting pairs; the profit evaluated at each corner crowns the winner. Unbounded regions warn that more is always possible; infeasible ones, that the caps contradict. The theorem spares you the interior: vertices only, always.

## DEFINITION
The Graphical Method of solving a Linear Programming Problem (LPP) is a geometric technique used to find the optimal value (maximum or minimum) of a linear objective function $Z = ax + by$ subject to a set of linear inequality constraints in two variables ($x, y \ge 0$), by plotting the constraints on a coordinate plane, identifying the feasible region, and evaluating the objective function at the corner points (vertices) of this region.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must be able to independently formulate a two-variable LPP from a word problem, accurately plot all constraints on a graph to identify the feasible region (bounded or unbounded), determine coordinates of all corner points by solving simultaneous equations, evaluate the objective function at each corner, and correctly state the optimal solution with the optimal value, including handling special cases like unbounded regions, infeasible regions, and multiple optimal solutions.

## SCOPE_BOUNDARY
This node covers the complete graphical solution procedure for two-variable LPPs using both the Corner Point Method and the Iso-Profit/Iso-Cost Method, including bounded/unbounded feasible regions, infeasible problems, and alternative optimal solutions. It does NOT cover the Simplex Method, sensitivity analysis, or problems with more than two decision variables (which require algebraic/computational methods).

## WALKTHROUGH
Start with a relatable scenario: "A bakery makes two types of cakes — Chocolate (profit ₹200) and Vanilla (profit ₹150). Each Chocolate needs 2 kg flour and 1 hour; each Vanilla needs 1 kg flour and 2 hours. The bakery has 100 kg flour and 80 hours daily. How many of each cake maximizes profit?" This mirrors the Rajat example from NCERT (Section 8.2). Guide the student to: (1) Define variables $x, y$; (2) Write constraints as inequalities; (3) Plot lines $2x+y=100$, $x+2y=80$ on graph paper; (4) Use the origin-test $(0,0)$ to shade the correct side for each inequality; (5) Identify the feasible polygon in the first quadrant; (6) Find corner coordinates by solving intersecting lines; (7) Plug corners into $Z=200x+150y$; (8) Pick the maximum. The key insight: **The optimal solution is always at a vertex** (Theorem 1, NCERT 8.4), so we never need to check infinite interior points.

Takeaway: mastery means the graph constructed accurately and every special case recognised from the picture. Exam moves: plotting questions draw constraints with correct shading via the origin test; corner questions solve simultaneous pairs for vertices; evaluation questions crown the optimum and state its value; case questions interpret unbounded, infeasible, and multiple-optima drawings. Method: the origin test shades honestly only when the line misses the origin — know when to test elsewhere. Drill: two cakes, one polygon, one vertex table. The picture answers; the algebra merely labels its corners.

## DIAGNOSTIC_QUESTION_1
State the Fundamental Theorem of Linear Programming (Theorem 1 in NCERT) regarding the location of the optimal value of the objective function $Z = ax + by$ over a feasible region $R$.

## DIAGNOSTIC_ANSWER_1
**Correct Answer:** If the objective function $Z = ax + by$ has an optimal value (maximum or minimum) over the feasible region $R$ determined by linear constraints, this optimal value must occur at a corner point (vertex) of $R$. A corner point is the intersection of two boundary lines of the feasible region.  
**What a wrong answer reveals:** If a student says "the optimal value occurs at any point in the feasible region" or "at the center of the region," they confuse the feasible region (set of all valid solutions) with the optimal solution (the single best point). This misconception leads to checking random interior points instead of systematically evaluating vertices.

## DIAGNOSTIC_QUESTION_2
Explain in your own words how to determine which side of the line $ax + by = c$ represents the inequality $ax + by \le c$ when graphing a constraint. Why does the "origin test" (substituting $x=0, y=0$) work for this?

## DIAGNOSTIC_ANSWER_2
**Correct Answer:** To graph $ax + by \le c$, first draw the line $ax + by = c$. Substitute $(0,0)$ into the inequality: if $a(0)+b(0) \le c$ is true (i.e., $0 \le c$), the origin satisfies the inequality, so shade the side containing the origin; otherwise shade the opposite side. The test works because a line divides the plane into two half-planes; the origin lies in exactly one of them. If the origin satisfies the inequality, that entire half-plane is the solution set.  
**What a wrong answer reveals:** If a student says "always shade towards the origin" or "shade away from the origin for $\le$," they have memorized a rule without understanding the logic. This fails when the line passes through the origin (where the test is inconclusive) or when the constraint is $ax + by \ge c$ and the origin does not satisfy it.

## DIAGNOSTIC_QUESTION_3
A company produces two products A and B. Profit is $Z = 50x + 40y$. Constraints: $2x + y \le 100$ (Machine hours), $x + 3y \le 90$ (Labor hours), $x, y \ge 0$. Plot the constraints, find all corner points of the feasible region, and determine the maximum profit.

## DIAGNOSTIC_ANSWER_3
**Correct Answer with Steps:**  
1. **Constraints as lines:** $2x+y=100 \to$ intercepts $(50,0), (0,100)$; $x+3y=90 \to$ intercepts $(90,0), (0,30)$.  
2. **Origin test:** $(0,0)$ satisfies both $\le$ inequalities $\to$ shade toward origin. Feasible region is bounded polygon in Q1.  
3. **Corner points:** $O(0,0)$; $A(50,0)$ from $2x+y=100$ on x-axis; $C(0,30)$ from $x+3y=90$ on y-axis; $B$ = intersection of $2x+y=100$ and $x+3y=90$. Solve: multiply 2nd by 2: $2x+6y=180$; subtract 1st: $5y=80 \to y=16$; then $2x+16=100 \to x=42$. So $B(42,16)$.  
4. **Evaluate $Z=50x+40y$:** $O: 0$; $A: 2500$; $B: 50(42)+40(16)=2100+640=2740$; $C: 1200$.  
5. **Maximum profit = ₹2740 at (42, 16)** i.e., 42 units of A, 16 units of B.  
**What a wrong answer reveals:** If a student misses corner $B$ or miscalculates its coordinates (e.g., solves equations incorrectly), they will get a suboptimal profit. If they only check axes intercepts, they miss the true optimum at the intersection of two active constraints — a classic board exam error.

## DIAGNOSTIC_QUESTION_4
Compare the Corner Point Method and the Iso-Profit Method for solving a maximization LPP with a bounded feasible region. Under what circumstances would the Iso-Profit Method be preferable, and what is its critical limitation when the feasible region is unbounded?

## DIAGNOSTIC_ANSWER_4
**Correct Answer:** Both methods rely on the theorem that the optimum occurs at a vertex. The Corner Point Method evaluates $Z$ at every vertex explicitly — systematic and foolproof for bounded regions. The Iso-Profit Method draws one objective line $Z=k$, then slides a parallel line toward the direction of increasing $Z$ until it last touches the feasible region; that contact point is optimal. **Preferable when:** The feasible region has many vertices (e.g., 6+ constraints) and you only need the maximum — sliding a ruler is faster than computing 6+ values. **Critical limitation for unbounded regions:** If the region is unbounded in the direction of increasing $Z$, the iso-profit line can slide infinitely far without leaving the region, falsely suggesting no maximum exists even if one does at a vertex. You must then verify by checking if the open half-plane $Z > Z_{candidate}$ has no intersection with the feasible region (NCERT Example 9).  
**What a wrong answer reveals:** If a student thinks the Iso-Profit Method always works without verification for unbounded regions, they will incorrectly conclude "no solution" for problems that actually have a finite maximum at a vertex (like Example 11 in NCERT where minimum exists but maximum doesn't).

## DIAGNOSTIC_QUESTION_5
A student solves an LPP graphically and finds the feasible region is unbounded. They evaluate the objective function $Z = 3x + 5y$ at all corner points and get a minimum value of 12 at vertex $V$. They claim "The minimum value of Z is 12." Is this conclusion valid? Justify your answer using the theory for unbounded feasible regions.

## DIAGNOSTIC_ANSWER_5
**Correct Answer:** No, the conclusion is **not automatically valid**. For an unbounded feasible region, Theorem 2 states that a minimum (or maximum) may not exist even if corner points give a candidate value. The student must perform the **verification step**: Draw the line $3x+5y=12$ and check the open half-plane $3x+5y < 12$. If this half-plane has **no point in common** with the feasible region, then 12 is indeed the minimum. If it **does** have common points, then values lower than 12 are achievable in the feasible region, so no minimum exists (the objective decreases indefinitely). This is exactly the procedure in NCERT Examples 11 and 9.  
**What a wrong answer reveals:** If the student says "Yes, because Theorem 1 says optimum is at a corner," they confuse Theorem 1 (which says *if* an optimum exists, it's at a corner) with Theorem 2 (which says for unbounded regions, an optimum *may not exist*). This is a high-stakes error in JEE/Board exams where unbounded regions appear specifically to test this verification step.

## DIAGNOSTIC_QUESTION_6
Create a real-world word problem (Indian context, Class 12 level) that leads to an LPP with **multiple optimal solutions** (i.e., the objective function is parallel to a constraint boundary). Formulate it mathematically and describe the graphical condition for this to happen.

## DIAGNOSTIC_ANSWER_6
**Expected Answer (sample problem):**  
*A farmer has 100 kg of fertilizer and 80 kg of pesticide. Crop A needs 2 kg fertilizer and 1 kg pesticide per hectare; Crop B needs 1 kg fertilizer and 2 kg pesticide per hectare. Profit is ₹3000/hectare for A and ₹1500/hectare for B. Maximize profit.*  
**Mathematical Formulation:**  
Maximize $Z = 3000x + 1500y$  
Subject to:  
$2x + y \le 100$ (fertilizer)  
$x + 2y \le 80$ (pesticide)  
$x, y \ge 0$  
**Graphical Condition:** The objective function line $3000x+1500y = k$ simplifies to $2x+y = k/1500$. The fertilizer constraint is $2x+y \le 100$. The slopes are identical ($-2$). When the iso-profit line is moved to maximize $Z$, it coincides with the entire boundary segment of the feasible region along $2x+y=100$ between its intersections with the axes and the other constraint. Every point on this segment gives the same maximum profit.  
**What a poor answer reveals:** If the student creates a problem where the objective slope accidentally matches a constraint but doesn't verify that the matching segment is actually part of the feasible boundary (e.g., the parallel constraint is redundant or outside the feasible region), they haven't truly understood the geometry of alternative optima.

## COMMON_MISCONCEPTION
**Misconception:** "If the feasible region is unbounded, the LPP has no solution (no maximum/minimum)."  
**Why students make this error:** They see the region extending infinitely and assume the objective function can increase/decrease forever. They miss Theorem 2's nuance: *if* an optimum exists in an unbounded region, it **still occurs at a corner point**. The unboundedness only means we must **verify** whether the objective can actually improve indefinitely in the feasible direction.  
**Concrete Example:** NCERT Example 11: Minimize $Z=3x+5y$ subject to $x+3y\ge3$, $x+y\ge2$, $x,y\ge0$. Feasible region is unbounded (extends infinitely up-right). Corner points: $A(3,0), B(1.5,0.5), C(0,2)$. Values: $Z_A=9, Z_B=7, Z_C=10$. Minimum candidate is 7 at B. Verification: Half-plane $3x+5y < 7$ has no intersection with feasible region $\to$ **minimum 7 exists at B**. A student with this misconception would incorrectly write "No minimum because region is unbounded" and lose full marks.

## ON_FAILURE
1. **Revisit graphing linear inequalities:** Go to Class 11 node `c11_app_cbse_12_004` (Various Forms of the Equation of a Line) and `c11_app_cbse_12_001` (Straight Line) to practice plotting lines $ax+by=c$ and using the origin test for $ax+by \le c$ vs $\ge c$. Do 5 inequalities of each type.  
2. **Master corner point calculation:** Practice solving pairs of linear equations (substitution/elimination) from Class 10/11 algebra. Focus on fractional answers (e.g., $20/19, 45/19$ in NCERT Example 6) — board exams often give non-integer vertices.  
3. **Drill the verification step for unbounded regions:** Take NCERT Examples 9 and 11. Re-plot them. Explicitly draw the verification line ($Z > M$ or $Z < m$) and shade the open half-plane. Check intersection with feasible region. Repeat until the "why" is intuitive.  
4. **Re-diagnostic:** Solve Check Your Progress Question 6(iv) from NCERT (maximize $Z=-x+2y$ with $-0.5x+y\le2, x-y\le-1, x,y\ge0$). The feasible region is unbounded. Verify if maximum exists. Correct answer: Multiple optimal solutions at $(0,2)$ and $(2,3)$ with $Z=4$.

## PREREQUISITE_NODE_IDS
c11_app_cbse_12_001, c11_app_cbse_12_004, c12_app_cbse_10_005, c12_app_cbse_10_007

## PREREQUISITE_REASONS
c11_app_cbse_12_001: Straight Line — provides the foundation for plotting constraint lines $ax+by=c$, finding intercepts, slopes, and intersection points (solving simultaneous equations).  
c11_app_cbse_12_004: Various Forms of the Equation of a Line — essential for converting constraints into intercept form ($x/a + y/b = 1$) for quick plotting and understanding slope for Iso-Profit method.  
c12_app_cbse_10_005: Mathematical Formulation of LPP — student must already know how to translate a word problem into decision variables, objective function, and constraints before attempting graphical solution.  
c12_app_cbse_10_007: Solving a Linear Programming Problem — introduces key terminology (feasible region, feasible/infeasible solution, optimal solution, Theorems 1 & 2) that the graphical method operationalizes.

## FORWARD_NODE_IDS
c12_app_cbse_10_009, c12_app_cbse_10_010

## FORWARD_REASONS
c12_app_cbse_10_009: Corner-Point Method — this node is the detailed procedural expansion of the Corner Point Method summarized in Section 8.5.1; mastery here is required to execute the step-by-step algorithm in the next node.  
c12_app_cbse_10_010: Iso-Profit/Iso-Cost Method — this node introduces the geometric intuition of sliding parallel objective lines; the next node formalizes it into a step-by-step algorithm with the LCM trick for choosing initial $Z$.

## CROSS_SUBJECT_PREREQS
c11_app_cbse_08_003, c11_app_cbse_08_004

## CROSS_SUBJECT_REASONS
c11_app_cbse_08_003: Graphical representation of functions — the concept of plotting a function $y=f(x)$ on coordinate axes directly transfers to plotting constraint lines and the feasible region in the $xy$-plane.  
c11_app_cbse_08_004: Domain and range of a function — the feasible region *is* the domain of the objective function restricted by constraints; understanding domain restrictions helps grasp why $x,y\ge0$ confines us to the first quadrant.

## CHAIN_DESCRIPTION
c11_app_cbse_12_001 -> c12_app_cbse_10_005 -> c12_app_cbse_10_008 -> c12_app_cbse_10_009

## THIS_FORMULA
N/A - conceptual (The graphical method is a procedure, not a single formula. The core principle is Theorem 1: Optimal value of $Z=ax+by$ occurs at a corner point of the feasible region.)

## FORMULA_VARIABLES
N/A

## FORMULA_UNITS
N/A

## COMPUTATION_TYPE
geometric

## CROSS_SUBJECT
c12_physics_06_001 | Work-Energy Theorem: Optimization of work done under constraints (e.g., maximizing range of projectile with fixed energy) mirrors LPP structure — objective function = range, constraints = energy/momentum conservation.  
c12_chemistry_04_001 | Chemical Kinetics: Rate laws with multiple reactants under concentration constraints can be framed as optimization (maximize yield given fixed initial concentrations) — analogous to diet/manufacturing LPPs.  
c12_economics_02_001 | Consumer Equilibrium: Utility maximization $U(x,y)$ subject to budget constraint $p_x x + p_y y \le M$ is a classic constrained optimization problem; graphical solution uses indifference curves (iso-utility lines) exactly like iso-profit lines in LPP.

## PREREQ_CONCEPT
Plotting linear inequalities and finding intersection points of two lines (solving simultaneous linear equations).

## PREREQ_BEFORE
The student must be able to: (1) Convert $ax+by \le c$ into line $ax+by=c$ and plot it using intercepts; (2) Use the origin test to shade the correct half-plane; (3) Solve two linear equations simultaneously to find intersection coordinates, including fractional answers.

## PREREQ_STUCK
If stuck on plotting or finding intersections, immediately review Class 11 `c11_app_cbse_12_001` (Straight Line) and `c11_app_cbse_12_004` (Various Forms of the Equation of a Line) — practice 5 problems of each type before returning.

## WORKED_EXAMPLE_1
PROBLEM: A small workshop makes wooden toys: Cars (profit ₹50) and Trucks (profit ₹70). Each Car needs 2 hours cutting and 1 hour painting. Each Truck needs 1 hour cutting and 2 hours painting. Cutting machine available 100 hrs/week; Painting machine available 80 hrs/week. Formulate as LPP and solve graphically to maximize weekly profit.

STEPS:
- Step 1: Define decision variables: Let $x$ = number of Cars, $y$ = number of Trucks produced per week. Both $\ge 0$.
- Step 2: Formulate constraints: Cutting: $2x + y \le 100$; Painting: $x + 2y \le 80$; Non-negativity: $x \ge 0, y \ge 0$.
- Step 3: Formulate objective: Maximize $Z = 50x + 70y$.
- Step 4: Plot constraints: Line $2x+y=100$ has intercepts $(50,0)$ and $(0,100)$. Line $x+2y=80$ has intercepts $(80,0)$ and $(0,40)$. Origin $(0,0)$ satisfies both $\le$ inequalities $\to$ shade toward origin. Feasible region is bounded quadrilateral in Q1 with vertices $O(0,0), A(50,0), B, C(0,40)$.
- Step 5: Find intersection $B$ of $2x+y=100$ and $x+2y=80$. Solve: From 2nd, $x=80-2y$. Substitute in 1st: $2(80-2y)+y=100 \to 160-4y+y=100 \to 3y=60 \to y=20$. Then $x=80-40=40$. So $B(40,20)$.
- Step 6: Evaluate $Z$ at all corners: $O: 0$; $A: 50(50)=2500$; $B: 50(40)+70(20)=2000+1400=3400$; $C: 70(40)=2800$.
- Step 7: Maximum profit is ₹3400 at $(40,20)$ i.e., 40 Cars and 20 Trucks.

REASONING: The constraints represent limited machine hours (shared resources). The feasible region captures all production combinations that don't exceed capacity. By Theorem 1, the profit-maximizing combination must be at a vertex. Evaluating all four vertices reveals the optimum at the intersection of the two binding constraints (both machines fully utilized).

ANSWER: Maximum weekly profit = ₹3400 by producing 40 Cars and 20 Trucks.

## WORKED_EXAMPLE_2
PROBLEM: Solve graphically: Minimize $Z = 4x + 3y$ subject to $x + 2y \ge 8$, $3x + 2y \ge 12$, $x \ge 0, y \ge 0$. Identify if the feasible region is bounded or unbounded, and verify the minimum.

STEPS:
- Step 1: Constraints are $\ge$ type. Plot lines: $x+2y=8$ intercepts $(8,0), (0,4)$; $3x+2y=12$ intercepts $(4,0), (0,6)$.
- Step 2: Origin test for $x+2y \ge 8$: $0 \ge 8$ is FALSE $\to$ shade AWAY from origin. For $3x+2y \ge 12$: $0 \ge 12$ FALSE $\to$ shade AWAY from origin. Feasible region is the intersection of these two half-planes in Q1 — it is UNBOUNDED (extends infinitely up-right).
- Step 3: Find corner points: Intersection of $x+2y=8$ and $3x+2y=12$: Subtract 1st from 2nd: $2x=4 \to x=2$. Then $2+2y=8 \to y=3$. So $B(2,3)$. Other vertices: $A(8,0)$ from $x+2y=8$ on x-axis; $C(0,6)$ from $3x+2y=12$ on y-axis. (Note: $(4,0)$ and $(0,4)$ are NOT in feasible region because they fail the other constraint).
- Step 4: Evaluate $Z=4x+3y$: $A(8,0): 32$; $B(2,3): 8+9=17$; $C(0,6): 18$. Candidate minimum = 17 at $B(2,3)$.
- Step 5: VERIFICATION (required for unbounded region): Check if open half-plane $4x+3y < 17$ has any point in common with feasible region. Draw line $4x+3y=17$. Test origin: $0 < 17$ TRUE $\to$ half-plane $4x+3y < 17$ contains origin. But origin is NOT in feasible region (it fails both constraints). The line $4x+3y=17$ passes through $B(2,3)$ and the half-plane $<17$ lies entirely outside the feasible region (toward origin). Thus NO common points $\to$ Minimum $Z=17$ EXISTS at $(2,3)$.

REASONING: For $\ge$ constraints, the feasible region lies away from the origin, often creating unbounded regions. Theorem 2 requires explicit verification that the objective cannot decrease indefinitely. The verification line $Z=17$ touches the feasible region only at $B$, and the "better" half-plane $Z<17$ is completely separated from the feasible region.

ANSWER: Minimum $Z = 17$ at $x=2, y=3$. Feasible region is unbounded; minimum verified to exist.

## WORKED_EXAMPLE_3
PROBLEM: (JEE-style) A manufacturer produces two models of bicycles: Model X and Model Y. Model X requires 6 man-hours to assemble and 2 man-hours to paint. Model Y requires 4 man-hours to assemble and 4 man-hours to paint. Total available man-hours: Assembly 120 hrs, Painting 80 hrs. Profit per unit: Model X = ₹1000, Model Y = ₹800. However, due to a supplier contract, at least 10 units of Model Y must be produced weekly. Formulate and solve graphically. Also, determine if the optimal solution changes if the profit of Model Y increases to ₹1200.

STEPS:
- Step 1: Variables: $x$ = Model X units, $y$ = Model Y units. $x \ge 0, y \ge 10$ (contract constraint).
- Step 2: Constraints: Assembly: $6x + 4y \le 120 \to 3x + 2y \le 60$; Painting: $2x + 4y \le 80 \to x + 2y \le 40$; Contract: $y \ge 10$.
- Step 3: Objective: Maximize $Z = 1000x + 800y$.
- Step 4: Plot lines: $3x+2y=60$ intercepts $(20,0), (0,30)$; $x+2y=40$ intercepts $(40,0), (0,20)$; $y=10$ horizontal line. Origin test: Assembly/Painting are $\le$ $\to$ shade toward origin; Contract $y \ge 10$ $\to$ shade above $y=10$. Feasible region is a bounded polygon (triangle/trapezoid).
- Step 5: Find vertices: Intersection of $y=10$ and $x+2y=40$: $x+20=40 \to x=20 \to P(20,10)$. Intersection of $y=10$ and $3x+2y=60$: $3x+20=60 \to x=40/3 \approx 13.33 \to Q(40/3, 10)$. Intersection of $3x+2y=60$ and $x+2y=40$: Subtract: $2x=20 \to x=10, y=15 \to R(10,15)$. Also check intercepts on $y=10$ boundary: $(0,10)$ fails $x+2y\le40$? $0+20\le40$ OK. But $(0,10)$ fails $3x+2y\le60$? $0+20\le60$ OK. So $(0,10)$ is a vertex? Wait: $x\ge0, y\ge10$. The line $x=0$ with $y=10$ gives $(0,10)$. Check constraints: $3(0)+2(10)=20\le60$ OK; $0+2(10)=20\le40$ OK. So $S(0,10)$ is a vertex. But is it a corner? The feasible region is bounded by $x=0$, $y=10$, $x+2y=40$, $3x+2y=60$. Vertices: $S(0,10)$, $P(20,10)$, $R(10,15)$, and intersection of $x+2y=40$ with $x=0$ is $(0,20)$ but $y=20 \ge 10$ OK, check assembly: $3(0)+2(20)=40\le60$ OK. So $T(0,20)$ is also a vertex. Wait — need to find the actual polygon. Let's list all constraint boundaries: $x=0$, $y=10$, $x+2y=40$, $3x+2y=60$. The feasible region is the polygon with vertices: $(0,10)$, $(0,20)$, $(10,15)$, $(20,10)$, and intersection of $y=10$ with $3x+2y=60$ is $(40/3,10)$ but $(20,10)$ is on $x+2y=40$ and $y=10$. Which constraints are active? At $(20,10)$: painting binding ($x+2y=40$), contract binding ($y=10$). At $(40/3,10)$: assembly binding ($3x+2y=60$), contract binding. But $(40/3,10)$ has $x+2y = 40/3 + 20 = 100/3 \approx 33.3 \le 40$ so painting slack. The feasible region is bounded by $x=0$ from $(0,10)$ to $(0,20)$, then $x+2y=40$ from $(0,20)$ to $(10,15)$, then $3x+2y=60$ from $(10,15)$ to $(40/3,10)$, then $y=10$ from $(40/3,10)$ to $(0,10)$. So vertices: $A(0,10), B(0,20), C(10,15), D(40/3, 10)$.
- Step 6: Evaluate $Z=1000x+800y$: $A: 8000$; $B: 16000$; $C: 10000+12000=22000$; $D: 1000(40/3)+8000 = 40000/3 + 24000/3 = 64000/3 \approx 21333.33$. Max at $C(10,15)$ with $Z=22000$.
- Step 7: New profit: $Z' = 1000x + 1200y$. Re-evaluate: $A: 12000$; $B: 24000$; $C: 10000+18000=28000$; $D: 1000(40/3)+12000 = 40000/3 + 36000/3 = 76000/3 \approx 25333.33$. Max still at $C(10,15)$ with $Z'=28000$. Optimal solution unchanged (still 10 Model X, 15 Model Y), but max profit increases.

REASONING: The contract constraint $y \ge 10$ adds a horizontal boundary line. The feasible region remains bounded because the two resource constraints slope downward and intersect. The optimum occurs at the intersection of the two resource constraints (both binding), not at the contract boundary. Changing Model Y's profit alters the slope of the iso-profit line, but not enough to make a different vertex optimal — the slope of $Z'$ is $-1000/1200 = -5/6 \approx -0.833$, while the binding constraints have slopes $-3/2 = -1.5$ and $-1/2 = -0.5$. Since $-1.5 < -0.833 < -0.5$, the iso-profit line is still "between" the two constraint slopes, so the same vertex remains optimal.

ANSWER: Original: Max profit ₹22,000 at 10 Model X, 15 Model Y. With Model Y profit ₹1200: Max profit ₹28,000 at same production mix (10, 15).

## COMPETENCY_QUESTION_1
QUESTION: A dietitian designs a meal plan using two foods: Food I (cost ₹40/kg, contains 3 units protein/kg, 2 units iron/kg) and Food II (cost ₹60/kg, contains 4 units protein/kg, 3 units iron/kg). Minimum daily requirements: 12 units protein, 9 units iron. Formulate the LPP to minimize cost. Then, using the graphical method, determine the minimum cost and the optimal quantities. Explain why the optimal solution occurs at the intersection of the two nutrient constraints rather than at an axis intercept.

COMPETENCY: Mathematical Modeling and Graphical Optimization (Application + Analysis)

STEPS:
- Step 1: Define variables and formulate LPP (objective + constraints).
- Step 2: Plot constraints and identify feasible region (note: $\ge$ constraints $\to$ region away from origin, unbounded).
- Step 3: Find all corner points of feasible region.
- Step 4: Evaluate objective at each corner.
- Step 5: Perform verification for unbounded region to confirm minimum exists.
- Step 6: Explain geometrically why the intersection of the two nutrient lines is optimal (slope of objective line relative to constraint slopes).

ANSWER: 
**Formulation:** Minimize $Z = 40x + 60y$ subject to $3x+4y \ge 12$ (protein), $2x+3y \ge 9$ (iron), $x,y \ge 0$.  
**Graphical Solution:**  
Lines: $3x+4y=12$ intercepts $(4,0), (0,3)$; $2x+3y=9$ intercepts $(4.5,0), (0,3)$. Both $\ge$ $\to$ shade away from origin. Feasible region unbounded.  
Corner points: Intersection of $3x+4y=12$ and $2x+3y=9$: Multiply 1st by 2: $6x+8y=24$; 2nd by 3: $6x+9y=27$; subtract: $y=3$, then $3x+12=12 \to x=0$. So $B(0,3)$. Other vertices: $A(4,0)$ on protein line? Check iron: $2(4)+3(0)=8 \not\ge 9$ $\to$ NOT feasible. $C(0,3)$ is on both lines? $3(0)+4(3)=12$ OK, $2(0)+3(3)=9$ OK. Wait — the two lines intersect at $(0,3)$? Check: $3(0)+4(3)=12$ yes; $2(0)+3(3)=9$ yes. They intersect on the y-axis. Other boundary: $x=0$ with $y\ge3$ (from both constraints). The feasible region is the area above both lines in Q1. The "corner" is actually the single vertex $(0,3)$ where the two lines meet, and the region extends infinitely along $x=0$ for $y\ge3$ and along the two lines. But wait — are there other vertices? The lines $3x+4y=12$ and $2x+3y=9$ intersect at $(0,3)$. The protein line hits x-axis at $(4,0)$ but that point fails iron constraint. The iron line hits x-axis at $(4.5,0)$ but fails protein. So the only vertex in Q1 is $(0,3)$. The feasible region is the unbounded region bounded by the y-axis from $(0,3)$ upward, and the two lines extending from $(0,3)$ into Q1.  
Evaluate $Z=40x+60y$ at $(0,3)$: $Z=180$.  
Verification: Check half-plane $40x+60y < 180 \to 2x+3y < 9$. This is the region BELOW the iron constraint line. But the feasible region is ABOVE both lines. No intersection $\to$ minimum 180 exists at $(0,3)$.  
**Why at intersection?** The objective slope is $-40/60 = -2/3$. Protein constraint slope = $-3/4 = -0.75$. Iron constraint slope = $-2/3 \approx -0.667$. The objective slope (-0.667) exactly matches the iron constraint slope! So the iso-cost line is parallel to the iron constraint. As we slide the iso-cost line toward the origin (minimizing), it first touches the feasible region along the entire iron constraint segment from $(0,3)$ outward? Wait — the iron constraint is $2x+3y=9$. At $(0,3)$, both constraints meet. The feasible region is above both lines. The iso-cost lines are parallel to the iron line. The line $2x+3y=9$ is the boundary. The next iso-cost line toward origin would be $2x+3y < 9$ which is infeasible. So the minimum occurs at the point where the iron constraint boundary meets the protein constraint boundary — i.e., their intersection $(0,3)$. Since the objective is parallel to one constraint, the minimum could also occur at any point on that constraint boundary IF the feasible region extended along it — but here the protein constraint cuts it off at $(0,3)$, making it a unique vertex optimum.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: (Case-based, CBSE + JEE Advanced style) A startup produces two smart devices: Hub (profit ₹500) and Sensor (profit ₹300). Each Hub uses 3 units of Chip A and 2 units of Chip B. Each Sensor uses 2 units of Chip A and 4 units of Chip B. Weekly supply: Chip A ≤ 180 units, Chip B ≤ 160 units. Assembly time: Hub 1 hr, Sensor 2 hrs; max 100 assembly hrs/week. The startup has a contract to supply at least 20 Sensors weekly.  
(a) Formulate the LPP.  
(b) Solve graphically to maximize profit.  
(c) The startup considers dropping the Sensor contract to increase flexibility. Analyze how this changes the feasible region and the optimal profit. Does the optimal production mix change? Justify using the concept of redundant constraints and binding constraints.

COMPETENCY: Constraint Analysis and Sensitivity Interpretation (Analysis + Evaluation)

STEPS:
- Step 1: Formulate LPP with all 5 constraints (2 chip constraints, assembly, contract, non-negativity).
- Step 2: Plot all constraints; identify feasible region (bounded polygon). Find all vertices by solving relevant pairs.
- Step 3: Evaluate profit at each vertex; find maximum.
- Step 4: Remove contract constraint $y \ge 20$; re-identify feasible region and vertices.
- Step 5: Re-evaluate profit; compare optimal solutions.
- Step 6: Determine if contract constraint was binding or redundant at original optimum. Explain the economic implication.

ANSWER:
**(a) Formulation:**  
Let $x$ = Hubs, $y$ = Sensors.  
Maximize $Z = 500x + 300y$  
Subject to:  
$3x + 2y \le 180$ (Chip A)  
$2x + 4y \le 160 \to x + 2y \le 80$ (Chip B)  
$x + 2y \le 100$ (Assembly)  
$y \ge 20$ (Contract)  
$x \ge 0, y \ge 0$

**(b) Graphical Solution:**  
Lines:  
Chip A: $3x+2y=180$ intercepts $(60,0), (0,90)$  
Chip B: $x+2y=80$ intercepts $(80,0), (0,40)$  
Assembly: $x+2y=100$ intercepts $(100,0), (0,50)$  
Contract: $y=20$ (horizontal)  

Note: Chip B constraint $x+2y \le 80$ is tighter than Assembly $x+2y \le 100$ (same LHS, smaller RHS) $\to$ Assembly constraint is **redundant** (always satisfied if Chip B is satisfied). Feasible region determined by Chip A, Chip B, Contract, axes.

Vertices:  
1. Intersection Chip B & Contract: $x+2(20)=80 \to x=40 \to P(40,20)$  
2. Intersection Chip A & Contract: $3x+2(20)=180 \to 3x=140 \to x=140/3 \approx 46.67 \to Q(140/3, 20)$  
   But check Chip B at Q: $140/3 + 40 = 260/3 \approx 86.67 > 80$ $\to$ Q violates Chip B! So Q not feasible.  
3. Intersection Chip A & Chip B: $3x+2y=180$ and $x+2y=80$. Subtract: $2x=100 \to x=50, y=15 \to R(50,15)$. But $y=15 < 20$ violates Contract $\to$ R not feasible.  
4. Intersection Chip B & $y$-axis: $(0,40)$ — check Contract: $40 \ge 20$ OK. Check Chip A: $3(0)+2(40)=80 \le 180$ OK. $\to S(0,40)$  
5. Intersection Contract & $y$-axis: $(0,20)$ — check Chip B: $0+40=40 \le 80$ OK. $\to T(0,20)$  
6. Intersection Chip A & $x$-axis: $(60,0)$ — fails Contract ($0 \ge 20$ false).  

Actual feasible vertices (in order): $T(0,20)$, $S(0,40)$, and intersection of Chip A and Chip B? No, that's at $y=15$. The feasible region is bounded by: $y=20$ from $(0,20)$ to... where does Chip A intersect $y=20$? $3x+40=180 \to x=140/3 \approx 46.67$. But Chip B at that point: $140/3 + 40 = 260/3 > 80$. So the boundary goes from $(0,20)$ along $y=20$ until it hits Chip B? Chip B at $y=20$: $x+40=80 \to x=40$. So $P(40,20)$ is on Chip B and Contract. Then from $P$ along Chip B $x+2y=80$ up to $S(0,40)$. Then down $y$-axis to $T(0,20)$. So feasible region is triangle with vertices $T(0,20), P(40,20), S(0,40)$.

Evaluate $Z=500x+300y$:  
$T(0,20): 6000$  
$P(40,20): 20000 + 6000 = 26000$  
$S(0,40): 12000$  
**Maximum profit = ₹26,000 at $P(40,20)$** i.e., 40 Hubs, 20 Sensors.

**(c) Without Contract ($y \ge 20$ removed):**  
Feasible region now bounded by Chip A, Chip B, axes. Vertices: $O(0,0), A(60,0), R(50,15), S(0,40)$.  
Evaluate $Z$: $O:0$, $A:30000$, $R: 500(50)+300(15)=25000+4500=29500$, $S:12000$.  
**New maximum = ₹30,000 at $A(60,0)$** i.e., 60 Hubs, 0 Sensors.  
**Analysis:** The contract constraint $y \ge 20$ was **binding** at the original optimum $P(40,20)$ (it forced $y=20$). Removing it expands the feasible region to include $R(50,15)$ and $A(60,0)$. The new optimum shifts to $A(60,0)$ where only Chip A is binding (Chip B and Assembly have slack). Profit increases by ₹4,000. The contract constraint was not redundant — it actively restricted the solution space and reduced maximum profit. This shows how contractual obligations can create opportunity costs.

DIFFICULTY: hard