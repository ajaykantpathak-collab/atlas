## ELI5
A bakery plans chocolate and vanilla cakes under oven and decorator hours: every production plan satisfying all the limits at once is a point in the feasible region - the overlapped shading of every inequality. Its corners are the geometry's landmarks, each a spot where two boundary lines cross. Because profit is a straight-line function of the plan, its best value must arrive at one of those corners, which is why the Corner Point Method only ever checks vertices.

## DEFINITION
The feasible region of a Linear Programming Problem (LPP) is the set of all points in the Cartesian plane that satisfy every constraint of the problem, including the non-negativity restrictions \(x \ge 0, y \ge 0\). A corner point (or vertex) of the feasible region is a point that lies at the intersection of two boundary lines of the feasible region.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can (1) graph a system of linear inequalities to identify the feasible region and correctly shade it, (2) determine the coordinates of every corner point by solving the corresponding pairs of linear equations, and (3) explain why the optimal value of a linear objective function must occur at a corner point of the feasible region (Theorem 1).

## SCOPE_BOUNDARY
This node covers the definition and identification of the feasible region and its corner points, the two fundamental theorems of linear programming (Theorem 1 and Theorem 2), and the step‑by‑step Corner Point Method for bounded feasible regions. It does NOT cover unbounded feasible regions in detail (node c12_math_cbse_12_004), nor the complete solution of word problems (node c12_math_cbse_12_006). It assumes the constraints are linear inequalities in two variables.

## WALKTHROUGH
Imagine a small bakery in Delhi that makes two types of cakes: chocolate (₹200 profit per cake) and vanilla (₹150 profit per cake). The oven can bake at most 50 cakes per day, and the decorator can work on at most 40 cakes per day. Each chocolate cake needs 1 hour of oven time and 2 hours of decoration; each vanilla cake needs 2 hours of oven time and 1 hour of decoration. The owner wants to maximise daily profit. First, we translate the situation into inequalities: let \(x\) = chocolate cakes, \(y\) = vanilla cakes. Oven constraint: \(x + 2y \le 50\); decoration constraint: \(2x + y \le 40\); non-negativity: \(x \ge 0, y \ge 0\). We graph each inequality on the same coordinate axes. The overlapping shaded region is the feasible region — every point inside represents a possible production plan. The corners of this polygon are where the boundary lines intersect. Because profit \(Z = 200x + 150y\) is linear, its maximum must occur at one of these corners (Theorem 1). We find each corner by solving the two line equations, then evaluate \(Z\) at each corner to pick the maximum. This is the Corner Point Method.

Takeaway first: the feasible region is every constraint's intersection, its corners are boundary-line meetings, and linear objectives testify only at those corners. Exam moves: graphing questions shading the overlap, corner questions solving each pair of boundary equations, and explain questions proving the corner-only optimum for linear objectives. Method: rerun the bakery - oven inequality, decorator inequality, axes from non-negativity, then each corner solved and priced. Check yourself: corners come only from boundary pairs actually meeting at the region's rim; intersections of lines outside the feasible shading are bystanders, not vertices. Drill: find every corner of one feasible region and evaluate a linear objective at each.

## DIAGNOSTIC_QUESTION_1
State the definition of a feasible region in a linear programming problem with two variables. What are the non‑negativity constraints?

## DIAGNOSTIC_ANSWER_1
The feasible region is the common region determined by all the constraints (including non‑negativity constraints \(x \ge 0, y \ge 0\)) of a linear programming problem. The non‑negativity constraints are \(x \ge 0\) and \(y \ge 0\). A wrong answer (e.g., "the region that satisfies only the main constraints") reveals that the student forgets that non‑negativity is part of every LPP and must be included in the graph.

## DIAGNOSTIC_QUESTION_2
Explain why the optimal value of a linear objective function \(Z = ax + by\) over a convex polygonal feasible region must occur at a corner point (vertex) and not in the interior or on an edge (unless the edge itself is optimal).

## DIAGNOSTIC_ANSWER_2
Because \(Z = ax + by\) is a linear function, its level curves are parallel straight lines. As we move a level line in the direction of increasing (or decreasing) \(Z\), the last point of the feasible region that the line touches is always a vertex. If the feasible region is bounded, Theorem 1 guarantees the optimum is at a vertex. A wrong answer (e.g., "it occurs at the centre") shows the student does not understand the geometry of linear functions and confuses linear programming with quadratic optimisation.

## DIAGNOSTIC_QUESTION_3
For the constraints \(x + y \le 10\), \(2x + y \le 14\), \(x \ge 0\), \(y \ge 0\), find the feasible region and list the coordinates of all its corner points.

## DIAGNOSTIC_ANSWER_3
Step 1: Graph \(x + y = 10\) (intercepts (10,0) and (0,10)) and shade below. Step 2: Graph \(2x + y = 14\) (intercepts (7,0) and (0,14)) and shade below. Step 3: Include first quadrant (\(x\ge0, y\ge0\)). The feasible region is a quadrilateral with corner points: O(0,0), A(7,0) [intersection of \(2x+y=14\) with x‑axis], B(4,6) [intersection of \(x+y=10\) and \(2x+y=14\): subtract to get \(x=4\), then \(y=6\)], C(0,10) [intersection of \(x+y=10\) with y‑axis]. A wrong answer (e.g., missing (0,0) or miscalculating B as (5,5)) reveals errors in solving simultaneous equations or forgetting axes intersections.

## DIAGNOSTIC_QUESTION_4
Compare the Corner Point Method for a bounded feasible region with the method required when the feasible region is unbounded. What additional check must be performed in the unbounded case?

## DIAGNOSTIC_ANSWER_4
For a bounded region, the maximum and minimum of \(Z\) are simply the largest and smallest values of \(Z\) at the corner points (Theorem 2). For an unbounded region, after finding the smallest/largest corner‑point value \(m/M\), we must check whether the open half‑plane \(ax+by < m\) (or \(> M\)) has any point in common with the feasible region. If it does, no minimum (or maximum) exists. A wrong answer (e.g., "same method works") shows the student ignores the critical difference highlighted in Theorem 2 and the remark.

## DIAGNOSTIC_QUESTION_5
A student solves an LPP and obtains corner points (0,0), (5,0), (3,4), (0,5). For \(Z = 4x + 3y\), they claim the maximum is 24 at (3,4) and the minimum is 0 at (0,0). Evaluate this claim and identify any error.

## DIAGNOSTIC_ANSWER_5
Evaluate \(Z\) at each corner: (0,0)→0; (5,0)→20; (3,4)→12+12=24; (0,5)→15. Maximum is indeed 24 at (3,4). Minimum is 0 at (0,0). The claim is correct. If the student had said minimum is 15 at (0,5), that would reveal they only checked the "non‑zero" corners and forgot the origin, a common oversight when the feasible region includes the origin.

## DIAGNOSTIC_QUESTION_6
Construct a linear programming problem (objective function and constraints) whose feasible region is a triangle with vertices (0,0), (6,0), (0,8). Write the objective function \(Z = px + qy\) such that the maximum occurs at (6,0) and the minimum at (0,8). Explain your choice of \(p\) and \(q\).

## DIAGNOSTIC_ANSWER_6
Constraints: \(x \ge 0, y \ge 0, 4x + 3y \le 24\) (line through (6,0) and (0,8)). Choose \(Z = 4x - 3y\). At (6,0): \(Z=24\); at (0,8): \(Z=-24\); at (0,0): \(Z=0\). Maximum 24 at (6,0), minimum -24 at (0,8). A poor answer (e.g., \(Z = x + y\)) gives maximum at (6,0) and (0,8) both 6 and 8? Actually (0,8) gives 8, (6,0) gives 6, so max at (0,8) — wrong. This reveals the student does not understand how the coefficients of the objective function determine which vertex is optimal.

## COMMON_MISCONCEPTION
Students often think that any point on the boundary of the feasible region can be optimal. They incorrectly evaluate the objective function at points along an edge (e.g., midpoints) instead of only at the vertices. For example, in the bakery problem, they might test (2,4) on the edge \(x+2y=10\) and think it could be the maximum, not realising that for a linear objective function the extreme values on a line segment occur at the endpoints (the corner points). Another frequent error: when finding corner points, they solve the wrong pair of equations (e.g., intersecting a constraint line with the wrong axis) or forget to include the intersections with the axes (\(x=0\) or \(y=0\)) as corner points.

## ON_FAILURE
If a student cannot identify the feasible region correctly: (1) Revisit c11_math_cbse_06_006 (Graphical Solution of Linear Inequalities in Two Variables) to practise shading the correct half‑plane for each inequality. (2) Revisit c10_math_cbse_03_005 (Substitution Method) and c10_math_cbse_03_006 (Elimination Method) to solve pairs of linear equations accurately for corner coordinates. (3) Draw the constraints one by one on graph paper, using a different colour for each, and explicitly mark the intersection points. (4) Re‑diagnose by asking the student to find the feasible region and corner points for \(x+2y\le8, 3x+y\le9, x\ge0, y\ge0\) and check if they get (0,0), (3,0), (2,3), (0,4).

## PREREQUISITE_NODE_IDS
c11_math_cbse_06_006, c10_math_cbse_03_005, c10_math_cbse_03_006, c9_math_ch1_1, c9_math_ch1_2, c12_math_cbse_12_001, c12_math_cbse_12_002, c12_eco_cbse_02_001

## PREREQUISITE_REASONS
c11_math_cbse_06_006: Graphing linear inequalities in two variables is the direct skill needed to draw each constraint and find the feasible region.
c10_math_cbse_03_005: Substitution method for solving a pair of linear equations gives the coordinates of intersection points (corner points).
c10_math_cbse_03_006: Elimination method is an alternative algebraic technique to find corner point coordinates.
c9_math_ch1_1: Understanding the Cartesian coordinate system, axes, and quadrants is essential for plotting.
c9_math_ch1_2: Plotting points and reading coordinates is needed to identify intercepts and vertices.
c12_math_cbse_12_001: The mathematical formulation of an LPP (objective function, constraints, decision variables) must be understood before finding its feasible region.
c12_math_cbse_12_002: The graphical method of solving LPP introduces the overall process; this node deepens the feasible region and corner point concepts.
c12_eco_cbse_02_001: c12_eco_cbse_02_001 | In economics, consumer utility maximisation under a budget constraint is a linear programming problem when utility and budget are linear (e.g., perfect substitutes).  

## FORWARD_NODE_IDS
c12_math_cbse_12_004, c12_math_cbse_12_005, c12_math_cbse_12_006
## FORWARD_REASONS
c12_math_cbse_12_004: Understanding bounded vs. unbounded feasible regions builds directly on identifying the feasible region and its corner points.
c12_math_cbse_12_005: Maximisation and minimisation problems apply the Corner Point Method to find optimal values at the corner points identified here.
c12_math_cbse_12_006: Word problems require formulating the LPP, graphing the feasible region, finding corner points, and then evaluating the objective function — all steps covered in this and the previous nodes.

## CROSS_SUBJECT_PREREQS
c11_stat_cbse_05_002, c11_stat_cbse_05_005
## CROSS_SUBJECT_REASONS
c11_stat_cbse_05_002: Arithmetic mean calculation uses linear combinations of data values, analogous to the linear objective function \(Z = ax + by\).
c11_stat_cbse_05_005: Median and quartiles involve ordering and linear interpolation, which rely on the same coordinate geometry and inequality concepts used in graphing feasible regions.

## CHAIN_DESCRIPTION
c11_math_cbse_06_006 -> c12_math_cbse_12_003 -> c12_math_cbse_12_004

## THIS_FORMULA
N/A - conceptual (Theorems 1 and 2 are statements, not algebraic formulas)

## FORMULA_VARIABLES
N/A

## FORMULA_UNITS
N/A

## COMPUTATION_TYPE
geometric

## CROSS_SUBJECT
c12_phy_cbse_03_001 | In physics, optimisation of a linear function subject to linear constraints appears in simple circuit analysis (Kirchhoff's laws give linear equations; power maximisation is linear in currents).
 c12_eco_cbse_02_001 | In economics, consumer utility maximisation under a budget constraint is a linear programming problem when utility and budget are linear (e.g., perfect substitutes).
## PREREQ_CONCEPT
Graphical solution of a system of linear inequalities in two variables (Class 11).

## PREREQ_BEFORE
The student must be able to graph a linear inequality, identify the correct half‑plane, and find the intersection of two lines algebraically.

## PREREQ_STUCK
If stuck, review Class 11 Linear Inequalities (graphical method) and Class 10 Pair of Linear Equations (substitution/elimination).

## WORKED_EXAMPLE_1
PROBLEM: A small factory in Pune produces two types of pens: gel pens (profit ₹5 per pen) and ball pens (profit ₹3 per pen). The factory has at most 400 machine-hours and 300 labour-hours available per week. Each gel pen requires 2 machine-hours and 1 labour-hour; each ball pen requires 1 machine-hour and 2 labour-hours. Formulate the LPP, graph the feasible region, find all corner points, and determine the maximum weekly profit using the Corner Point Method.
STEPS:
- Step 1: Define variables. Let \(x\) = number of gel pens, \(y\) = number of ball pens produced per week. Profit \(Z = 5x + 3y\) (to maximise).
- Step 2: Write constraints. Machine-hours: \(2x + y \le 400\). Labour-hours: \(x + 2y \le 300\). Non-negativity: \(x \ge 0, y \ge 0\).
- Step 3: Graph each constraint. For \(2x+y=400\), intercepts: (200,0) and (0,400). Shade below. For \(x+2y=300\), intercepts: (300,0) and (0,150). Shade below. The first quadrant gives the feasible region.
- Step 4: Find corner points by solving pairs of lines.
  - O: (0,0) [intersection of axes]
  - A: (200,0) [intersection of \(2x+y=400\) with x-axis]
  - B: Intersection of \(2x+y=400\) and \(x+2y=300\). Multiply second by 2: \(2x+4y=600\). Subtract first: \(3y=200 \Rightarrow y=200/3 \approx 66.67\). Then \(x=400 - y = 400 - 66.67 = 333.33\)? Wait, check: from first \(2x = 400 - y = 400 - 66.67 = 333.33 \Rightarrow x = 166.67\). Alternatively solve exactly: \(2x+y=400\) and \(x+2y=300\). Multiply second by 2: \(2x+4y=600\). Subtract first: \(3y=200 \Rightarrow y=200/3\). Substitute into first: \(2x + 200/3 = 400 \Rightarrow 2x = 1000/3 \Rightarrow x = 500/3\). So B = (500/3, 200/3).
  - C: (0,150) [intersection of \(x+2y=300\) with y-axis].
- Step 5: Evaluate \(Z = 5x + 3y\) at each corner.
  - O(0,0): \(Z = 0\)
  - A(200,0): \(Z = 1000\)
  - B(500/3, 200/3): \(Z = 5(500/3) + 3(200/3) = 2500/3 + 600/3 = 3100/3 \approx 1033.33\)
  - C(0,150): \(Z = 450\)
- Step 6: Maximum profit is ₹3100/3 ≈ ₹1033.33 at (500/3, 200/3). Since pens must be integers, the practical maximum is at integer points near this corner (e.g., (167,66) or (166,67)), but the LPP continuous solution is as above.
REASONING: The feasible region is a convex polygon (bounded). By Theorem 1, the maximum of the linear objective function occurs at a vertex. We computed \(Z\) at all vertices and selected the largest value. The fractional solution indicates the continuous relaxation; for actual production, integer programming would be needed, but the question asks for the LPP solution.
ANSWER: Maximum profit = ₹3100/3 (≈ ₹1033.33) at (500/3, 200/3) i.e., 166⅔ gel pens and 66⅔ ball pens.

## WORKED_EXAMPLE_2
PROBLEM: Minimise \(Z = 3x + 5y\) subject to \(x + y \ge 2\), \(x + 3y \ge 3\), \(x \ge 0\), \(y \ge 0\). Identify the feasible region, its corner points, and the minimum value of \(Z\).
STEPS:
- Step 1: Write constraints. \(x+y \ge 2\), \(x+3y \ge 3\), \(x\ge0, y\ge0\). Objective: Minimise \(Z = 3x+5y\).
- Step 2: Graph each inequality. \(x+y=2\) intercepts (2,0), (0,2). Since origin (0,0) gives \(0\ge2\) false, shade away from origin. \(x+3y=3\) intercepts (3,0), (0,1). Origin gives \(0\ge3\) false, shade away from origin. Non-negativity restricts to first quadrant.
- Step 3: The feasible region is the intersection of these half-planes. It is unbounded (extends infinitely in the positive x and y directions). The boundary lines intersect at a corner point.
- Step 4: Find corner points.
  - Intersection of \(x+y=2\) and \(x+3y=3\): Subtract first from second: \(2y=1 \Rightarrow y=0.5\). Then \(x=2-0.5=1.5\). Point P = (1.5, 0.5).
  - Intersection of \(x+y=2\) with x-axis? That would be (2,0), but check if it satisfies \(x+3y\ge3\): \(2+0=2 \not\ge3\), so (2,0) is NOT in feasible region.
  - Intersection of \(x+3y=3\) with y-axis? (0,1) satisfies \(x+y=0+1=1 \not\ge2\), so not feasible.
  - Intersection of \(x+y=2\) with y-axis? (0,2) satisfies \(x+3y=6\ge3\) yes. So A = (0,2) is a corner.
  - Intersection of \(x+3y=3\) with x-axis? (3,0) satisfies \(x+y=3\ge2\) yes. So B = (3,0) is a corner.
  - The feasible region is unbounded with corner points A(0,2), P(1.5,0.5), B(3,0).
- Step 5: Evaluate \(Z = 3x+5y\) at each corner.
  - A(0,2): \(Z = 0 + 10 = 10\)
  - P(1.5,0.5): \(Z = 4.5 + 2.5 = 7\)
  - B(3,0): \(Z = 9 + 0 = 9\)
- Step 6: The smallest value at corners is 7 at P(1.5,0.5). Since the region is unbounded, we must check if \(Z\) can be less than 7. The inequality \(3x+5y < 7\) is an open half-plane. Does it intersect the feasible region? The line \(3x+5y=7\) passes through P. The feasible region lies entirely on or above the line \(x+3y=3\) and \(x+y=2\). At P, both are equalities. For any point in the feasible region, \(x+3y\ge3\) and \(x+y\ge2\). We can show \(3x+5y \ge 7\) for all feasible points (e.g., by linear combination: \(3x+5y = (x+y) + 2(x+3y) - ?\) Actually, \(3x+5y = 2(x+3y) - (x+y) + ?\) Not needed; graphically the half-plane \(3x+5y<7\) does not intersect the feasible region). Therefore, minimum is 7 at (1.5, 0.5).
REASONING: For an unbounded region, Theorem 1 says if an optimum exists it is at a corner point. We found the smallest corner value (7) and verified that the open half-plane \(Z < 7\) has no common point with the feasible region (the line \(Z=7\) is a supporting line at P). Hence 7 is the true minimum.
ANSWER: Minimum value of \(Z\) is 7 at the point (1.5, 0.5).

## WORKED_EXAMPLE_3
PROBLEM: A farmer in Punjab has 10 hectares of land to grow wheat and rice. Wheat yields a profit of ₹20,000 per hectare, rice ₹30,000 per hectare. Wheat requires 2 units of fertiliser per hectare, rice requires 3 units. The farmer has at most 24 units of fertiliser. Wheat requires 1 unit of pesticide per hectare, rice requires 2 units. The farmer has at most 14 units of pesticide. Formulate the LPP, find the feasible region, determine all corner points, and find the maximum profit.
STEPS:
- Step 1: Variables: \(x\) = hectares of wheat, \(y\) = hectares of rice. Maximise \(Z = 20000x + 30000y\).
- Step 2: Constraints:
  Land: \(x + y \le 10\)
  Fertiliser: \(2x + 3y \le 24\)
  Pesticide: \(x + 2y \le 14\)
  Non-negativity: \(x \ge 0, y \ge 0\)
- Step 3: Graph the lines.
  \(x+y=10\): intercepts (10,0), (0,10)
  \(2x+3y=24\): intercepts (12,0), (0,8)
  \(x+2y=14\): intercepts (14,0), (0,7)
  All are \(\le\), so shade below each line in the first quadrant.
- Step 4: Find corner points of the feasible region (intersection of boundaries).
  - O(0,0)
  - A: Intersection of \(x+y=10\) with x-axis? (10,0) but check fertiliser: \(2(10)+0=20\le24\) ok, pesticide: \(10+0=10\le14\) ok. So A(10,0) is a corner.
  - B: Intersection of \(2x+3y=24\) with x-axis? (12,0) violates land \(12>10\), so not feasible.
  - C: Intersection of \(x+2y=14\) with y-axis? (0,7) check land: \(0+7=7\le10\) ok, fertiliser: \(0+21=21\le24\) ok. So C(0,7) is a corner.
  - D: Intersection of \(x+y=10\) and \(2x+3y=24\). Multiply first by 2: \(2x+2y=20\). Subtract from second: \(y=4\). Then \(x=6\). Point D(6,4). Check pesticide: \(6+8=14\le14\) ok (on boundary).
  - E: Intersection of \(x+y=10\) and \(x+2y=14\). Subtract: \(y=4\), \(x=6\) — same as D? Wait, \(x+2y=14\) and \(x+y=10\) give \(y=4, x=6\). So all three lines intersect at (6,4)? Check fertiliser: \(2(6)+3(4)=12+12=24\) yes. So (6,4) is the intersection of all three constraints! That means the feasible region is a quadrilateral with corners O(0,0), A(10,0), D(6,4), C(0,7).
  - Wait, is there a corner on the fertiliser line between (6,4) and (0,8)? (0,8) violates land (0+8=8≤10 ok) and pesticide (0+16=16>14) so (0,8) not feasible. The boundary from D to C is along \(x+2y=14\)? Let's check: At D(6,4), \(x+2y=14\). At C(0,7), \(x+2y=14\). So the segment D-C is on the pesticide line. The segment D-A is on the fertiliser line? At D(6,4), \(2x+3y=24\). At A(10,0), \(2(10)+0=20\ne24\). So D-A is not on fertiliser line. Let's re-evaluate.
  Actually, the feasible region is bounded by the lines: x-axis from O to A, then A to D along which constraint? At A(10,0), land is binding (x+y=10). At D(6,4), land and fertiliser and pesticide are all binding? That's three lines meeting at one point, which is degenerate. Let's check if the fertiliser constraint is redundant. For points on land line x+y=10, fertiliser = 2x+3y = 2x+3(10-x)=30-x. For x=6, fertiliser=24. For x=10, fertiliser=20. So fertiliser ≤24 is automatically satisfied on the land segment from (6,4) to (10,0)? At x=8, y=2, fertiliser=16+6=22≤24. So the boundary from A to D is the land line x+y=10. The boundary from D to C is the pesticide line x+2y=14. The boundary from C to O is the y-axis. The boundary from O to A is the x-axis. So the corner points are O(0,0), A(10,0), D(6,4), C(0,7). The fertiliser line passes through D but is not a boundary edge.
- Step 5: Evaluate \(Z = 20000x + 30000y\) at each corner.
  - O(0,0): \(Z = 0\)
  - A(10,0): \(Z = 2,00,000\)
  - D(6,4): \(Z = 1,20,000 + 1,20,000 = 2,40,000\)
  - C(0,7): \(Z = 2,10,000\)
- Step 6: Maximum is ₹2,40,000 at (6,4) i.e., 6 hectares wheat, 4 hectares rice.
REASONING: We identified the feasible region by graphing all constraints. The corner points were found by solving the relevant pairs of binding constraints. Theorem 2 applies because the region is bounded (enclosed by axes and the lines). The maximum profit is at the vertex (6,4).
ANSWER: Maximum profit = ₹2,40,000 by cultivating 6 hectares of wheat and 4 hectares of rice.

## COMPETENCY_QUESTION_1
QUESTION: A student solves the LPP: Maximise \(Z = 4x + 2y\) subject to \(x + y \le 5\), \(x + 2y \le 8\), \(x \ge 0\), \(y \ge 0\). They graph the constraints and claim the feasible region is a triangle with vertices (0,0), (5,0), (0,4). They evaluate \(Z\) at these points and get maximum 20 at (5,0). Identify the error in the student's feasible region and find the correct maximum.
COMPETENCY: Error identification and correction
STEPS:
- Step 1: Graph the two constraints correctly. \(x+y=5\) has intercepts (5,0) and (0,5). \(x+2y=8\) has intercepts (8,0) and (0,4).
- Step 2: The student used (0,4) as the y-intercept of the first constraint, but (0,4) lies on \(x+2y=8\), not on \(x+y=5\). The feasible region is the intersection of the half-planes below both lines. The y-intercept of the feasible region is the smaller of the two y-intercepts, which is (0,4) from the second constraint. However, the intersection of the two lines is also a corner point.
- Step 3: Find the intersection of \(x+y=5\) and \(x+2y=8\). Subtract: \(y=3\), then \(x=2\). So the corner points are (0,0), (5,0), (2,3), (0,4).
- Step 4: Evaluate \(Z = 4x+2y\) at all four corners: (0,0)→0; (5,0)→20; (2,3)→8+6=14; (0,4)→8.
- Step 5: The maximum is 20 at (5,0), which matches the student's answer, but their feasible region was missing the vertex (2,3). The error was assuming the feasible region is a triangle; it is actually a quadrilateral. However, the maximum still occurs at (5,0) in this case.
ANSWER: The student incorrectly identified the feasible region as a triangle; it is a quadrilateral with vertices (0,0), (5,0), (2,3), (0,4). The maximum value of Z is 20 at (5,0), which happens to be the same as the student's answer, but their reasoning was flawed because they missed a corner point.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Consider the LPP: Minimise \(Z = -x + 2y\) subject to \(x \ge 3\), \(x + y \ge 5\), \(x + 2y \ge 6\), \(y \ge 0\). (This is Exercise 12.1, Q9 from NCERT.) Find the feasible region, its corner points, and the minimum value of Z. Is the feasible region bounded or unbounded? Does the minimum exist? Justify.
COMPETENCY: Translating real-world situations to mathematical expressions, Comparing and justifying
STEPS:
- Step 1: Write constraints. \(x \ge 3\) (vertical line x=3, shade right). \(x+y \ge 5\) (line through (5,0) and (0,5), shade away from origin). \(x+2y \ge 6\) (line through (6,0) and (0,3), shade away from origin). \(y \ge 0\) (above x-axis).
- Step 2: Graph and find intersection points.
  - Intersection of \(x=3\) and \(x+y=5\): \(3+y=5 \Rightarrow y=2\). Point A(3,2). Check \(x+2y=3+4=7\ge6\) ok.
  - Intersection of \(x=3\) and \(x+2y=6\): \(3+2y=6 \Rightarrow y=1.5\). Point B(3,1.5). Check \(x+y=4.5 \not\ge5\) so B is NOT in feasible region.
  - Intersection of \(x+y=5\) and \(x+2y=6\): subtract: \(y=1\), \(x=4\). Point C(4,1). Check \(x\ge3\) ok.
  - Intersection of \(x+y=5\) with y-axis? x=0 not allowed (x≥3).
  - Intersection of \(x+2y=6\) with y-axis? (0,3) not allowed.
  - The line \(x=3\) extends upward indefinitely. The feasible region is the area to the right of x=3, above both lines \(x+y=5\) and \(x+2y=6\), and above y=0. The boundary consists of the segment from A(3,2) to C(4,1) along \(x+y=5\), then the ray from C along \(x+2y=6\) going upward (increasing y, decreasing x? Wait, on \(x+2y=6\), as y increases, x decreases. But we also have \(x\ge3\). So the ray from C along \(x+2y=6\) goes towards larger y and smaller x until x=3? At x=3, y=1.5 (point B) but B fails \(x+y\ge5\). So the boundary from C goes along \(x+2y=6\) in the direction of increasing y? Actually, the feasible region is above both lines. The line \(x+2y=6\) is less restrictive than \(x+y=5\) for large y? Let's check: For a given x, \(x+2y\ge6 \Rightarrow y \ge (6-x)/2\). \(x+y\ge5 \Rightarrow y \ge 5-x\). For x>4, 5-x < (6-x)/2? At x=5, 5-x=0, (6-x)/2=0.5. So \(x+2y\ge6\) is tighter. The feasible region is bounded below by the upper envelope of the two lines. The corner points are A(3,2) and C(4,1). The region extends infinitely upward from the line segment AC? Actually, the region is the set of points satisfying all inequalities. It is unbounded, extending infinitely in the positive y direction (and positive x direction along x=3?).
  Let's find the corner points correctly. The feasible region is the intersection of:
  x ≥ 3
  y ≥ 0
  x + y ≥ 5
  x + 2y ≥ 6
  The boundary lines are x=3, y=0, x+y=5, x+2y=6.
  Intersection of x=3 and x+y=5: (3,2) — call it P.
  Intersection of x+y=5 and x+2y=6: (4,1) — call it Q.
  Intersection of x+2y=6 and y=0: (6,0) — but x=6 ≥3, so (6,0) satisfies all? Check x+y=6≥5 ok. So (6,0) is a corner? But is it on the boundary of the feasible region? The line y=0 is a boundary (y≥0). The point (6,0) is on y=0 and x+2y=6. It satisfies x≥3 and x+y≥5. So (6,0) is a corner point R.
  Intersection of x=3 and y=0: (3,0) but fails x+y≥5 (3<5). So not feasible.
  The feasible region is a polygon with vertices P(3,2), Q(4,1), R(6,0), and then unbounded along the ray from R along y=0? No, y=0 is the x-axis. The region is above y=0, so it extends upward from the segment PQ? Actually, the region is above both lines x+y=5 and x+2y=6. For x between 3 and 4, the lower bound is x+y=5. For x between 4 and 6, the lower bound is x+2y=6. For x ≥ 6, the lower bound is y=0? But x+2y≥6 with y=0 gives x≥6. So for x≥6, the constraints are x≥3, y≥0, x+y≥5 (automatically true if y≥0 and x≥6), x+2y≥6 (automatically true if y≥0 and x≥6). So the feasible region includes the entire half-strip x≥6, y≥0. So the boundary is: from P(3,2) along x=3 upward? Wait, x=3 is a vertical line. For x=3, we need y≥2 (from x+y≥5) and y≥1.5 (from x+2y≥6) and y≥0. So y≥2. So the line x=3 for y≥2 is part of the boundary. The feasible region is unbounded, extending infinitely along x=3 upward and along y=0 to the right from (6,0), and also the interior above the lines.
  The corner points (vertices of the boundary) are P(3,2), Q(4,1), R(6,0). The region is unbounded.
- Step 3: Evaluate Z = -x + 2y at the three corners.
  P(3,2): Z = -3 + 4 = 1
  Q(4,1): Z = -4 + 2 = -2
  R(6,0): Z = -6 + 0 = -6
- Step 4: The smallest value at corners is -6 at R(6,0). Since the region is unbounded, we must check if Z can be less than -6. Consider the open half-plane -x+2y < -6, i.e., 2y < x - 6. Does this intersect the feasible region? The feasible region includes points with large x and y=0 (e.g., (100,0)): Z = -100 < -6. So the half-plane -x+2y < -6 contains points of the feasible region (like (100,0)). Therefore, Z has no minimum value; it can decrease indefinitely.
- Step 5: Check if maximum exists. The largest corner value is 1 at P(3,2). Check half-plane -x+2y > 1, i.e., 2y > x+1. Does it intersect the feasible region? The region extends upward along x=3: at (3,10), Z = -3+20=17 > 1. So maximum also does not exist.
ANSWER: Feasible region is unbounded with corner points (3,2), (4,1), (6,0). The minimum value of Z does not exist (Z can be arbitrarily negative). The maximum value also does not exist (Z can be arbitrarily positive).
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: A corner point (or vertex) of the feasible region is a point that lies at the ______ of two boundary lines of the feasible region.

## DIAGNOSTIC_ANSWER_7
intersection

The intersection is the corner's birth certificate: two boundary lines crossing at a point the region actually keeps. **A wrong answer (a midpoint) reveals the student has placed vertices where lines merely pass rather than cross.** The intersection is the corner's origin story: two boundary lines meeting at a point the feasible shading keeps.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine a small bakery in Delhi that makes two types of cakes: ______ (₹200 profit per cake) and vanilla (₹150 profit per cake).

## DIAGNOSTIC_ANSWER_8
chocolate

The chocolate word carries the bigger per-cake profit: its coefficient leads the objective the corners will compete on. **A wrong answer (vanilla twice) reveals the student has swapped the products and with them the objective's gradient.**

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can (1) graph a system of linear inequalities to identify the feasible region and correctly shade it, (2) determine the coordinates of every corner point by solving the corresponding pairs of linear equations, and (3) explain why the optimal value of a linear objective function must occur at a corner point of the feasible.
