## ELI5
A garden path must pass through two trees at (2, 3) and (5, 7). Steal the slope from the pair, m = (y2 - y1)/(x2 - x1), then feed it into the point-slope form with either tree: y - y1 = ((y2 - y1)/(x2 - x1))(x - x1). That is the whole two-point form - the slope slot explicitly filled by the difference quotient. Same x-coordinates? The line is vertical: x = x1.

## DEFINITION
The two-point form gives the equation of a straight line passing through two distinct points \(P(x_1, y_1)\) and \(Q(x_2, y_2)\) in the Cartesian plane. If \(x_1 \neq x_2\), the slope is \(m = \frac{y_2 - y_1}{x_2 - x_1}\) and the equation is \(y - y_1 = \frac{y_2 - y_1}{x_2 - x_1}(x - x_1)\). If \(x_1 = x_2\), the line is vertical with equation \(x = x_1\).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can derive the two-point form from the slope formula, write the equation of a line given two points (including vertical lines), and convert it to other forms (slope-intercept, intercept, normal) to solve geometric problems such as finding intersections, checking collinearity, or determining the line's position relative to a point.

## SCOPE_BOUNDARY
This node covers the derivation, application, and conversion of the two-point form for straight lines in the Cartesian plane. It includes the special case of vertical lines. It does NOT cover three-dimensional lines, parametric forms, or vector equations of lines (those are in Class 12).

## WALKTHROUGH
Imagine you are designing a straight walking path in a school garden that must pass through two trees located at coordinates (2, 3) and (5, 7). You need the equation of the path to mark it out. Start by recalling the slope formula from c11_math_cbse_10_006: slope \(m = \frac{y_2 - y_1}{x_2 - x_1}\). Write down the coordinates of the two trees. Substitute them into the slope formula to find the steepness of the path. Then use the point-slope form (c11_math_cbse_10_009) with one of the points to get the equation. The key insight is that the two-point form is just the point-slope form with the slope explicitly replaced by the difference quotient of the two given points.

Takeaway: mastery means deriving the form from the slope formula, writing the line through two given points, and handling the vertical case x = x1 where the slope quotient divides by zero. Exam moves: find-the-equation questions and collinearity or intersection items that begin from two points. Check yourself: either point may sit in the point-slope slot - both give the same line, a quick self-test. Students miss it because they treat the two-point form as a third formula to memorise, when the definition assembles it from pieces you already own: slope first, point-slope second, and the difference quotient simply fills the slope slot. The vertical sibling matters equally: when x1 = x2 the quotient collapses, and the honest answer is the vertical line itself.

## DIAGNOSTIC_QUESTION_1
Write the two-point form of the equation of a line passing through points \(A(x_1, y_1)\) and \(B(x_2, y_2)\) when \(x_1 \neq x_2\). Also state the equation when \(x_1 = x_2\).

## DIAGNOSTIC_ANSWER_1
When \(x_1 \neq x_2\): \(y - y_1 = \frac{y_2 - y_1}{x_2 - x_1}(x - x_1)\). When \(x_1 = x_2\): \(x = x_1\). A wrong answer (e.g., swapping numerator and denominator, or forgetting the vertical line case) reveals that the student has memorised the formula without understanding its derivation from slope, or does not recognise that division by zero is undefined and requires a separate case.

## DIAGNOSTIC_QUESTION_2
Explain why the two-point form \(y - y_1 = \frac{y_2 - y_1}{x_2 - x_1}(x - x_1)\) fails when \(x_1 = x_2\), and describe the geometric meaning of this failure.

## DIAGNOSTIC_ANSWER_2
The formula fails because the denominator \(x_2 - x_1\) becomes zero, making the slope undefined. Geometrically, this means the two points lie on a vertical line, which has no finite slope. The line's equation is simply \(x = x_1\). A student who says "the line doesn't exist" or "the slope is zero" confuses vertical lines with horizontal lines, showing a fundamental misunderstanding of slope as a measure of steepness and the concept of undefined slope.

## DIAGNOSTIC_QUESTION_3
Find the equation of the line passing through the points \((-2, 5)\) and \((4, -1)\). Express your answer in slope-intercept form \(y = mx + c\).

## DIAGNOSTIC_ANSWER_3
Step 1: Identify points: \((x_1, y_1) = (-2, 5)\), \((x_2, y_2) = (4, -1)\).  
Step 2: Compute slope \(m = \frac{-1 - 5}{4 - (-2)} = \frac{-6}{6} = -1\).  
Step 3: Use point-slope with \((-2, 5)\): \(y - 5 = -1(x + 2)\).  
Step 4: Simplify: \(y - 5 = -x - 2 \Rightarrow y = -x + 3\).  
Answer: \(y = -x + 3\). A wrong answer often comes from sign errors in the slope calculation (e.g., \(\frac{5 - (-1)}{-2 - 4} = \frac{6}{-6} = -1\) is correct but students may mess up the order) or algebraic mistakes when simplifying. If a student gets \(y = x + 3\), they likely dropped a negative sign.

## DIAGNOSTIC_QUESTION_4
A line passes through \((3, k)\) and \((7, 2)\) and has slope \(-\frac{1}{2}\). Find \(k\). Then write the equation of the line in two-point form and verify that the point \((11, 0)\) lies on it.

## DIAGNOSTIC_ANSWER_4
Step 1: Use slope formula: \(\frac{2 - k}{7 - 3} = -\frac{1}{2} \Rightarrow \frac{2 - k}{4} = -\frac{1}{2} \Rightarrow 2 - k = -2 \Rightarrow k = 4\).  
Step 2: Two-point form with \((3, 4)\) and \((7, 2)\): \(y - 4 = \frac{2 - 4}{7 - 3}(x - 3) = \frac{-2}{4}(x - 3) = -\frac{1}{2}(x - 3)\).  
Step 3: Check \((11, 0)\): LHS = \(0 - 4 = -4\), RHS = \(-\frac{1}{2}(11 - 3) = -\frac{1}{2} \times 8 = -4\). LHS = RHS, so point lies on line.  
A student who cannot find \(k\) may not connect the given slope to the two-point slope expression. If they substitute incorrectly or forget to verify, they lack the habit of checking solutions.

## DIAGNOSTIC_QUESTION_5
A student writes the equation of the line through \((1, 2)\) and \((4, 8)\) as \(y - 2 = \frac{8 - 2}{1 - 4}(x - 1)\). Identify the error and correct it.

## DIAGNOSTIC_ANSWER_5
The student swapped the order of subtraction in the denominator: they used \(x_1 - x_2\) instead of \(x_2 - x_1\). The correct slope is \(\frac{8 - 2}{4 - 1} = \frac{6}{3} = 2\). The student's slope is \(\frac{6}{-3} = -2\), which is the negative of the correct slope. The correct equation is \(y - 2 = 2(x - 1)\). This error reveals that the student does not understand that slope is independent of the order of points as long as the same order is used for both numerator and denominator. They mechanically plug into a memorised template without checking consistency.

## DIAGNOSTIC_QUESTION_6
Create a real-life problem (in an Indian context) that requires finding the equation of a line through two given points, and solve it. The problem must involve a vertical line.

## DIAGNOSTIC_ANSWER_6
Example problem: "A straight road runs along the line \(x = 50\) metres from the school gate (origin). Two lamp posts are to be placed on this road at distances 10 m and 30 m from the gate along the y-direction. Find the equation of the road and the coordinates of the lamp posts."  
Solution: The road is vertical, so its equation is \(x = 50\). The lamp posts are at \((50, 10)\) and \((50, 30)\). A poor answer would give a sloping line equation or fail to recognise that both points share the same x-coordinate. This tests whether the student can translate a vertical line description into the correct mathematical form.

## COMMON_MISCONCEPTION
Students often write the two-point form as \(y - y_1 = \frac{y_2 - y_1}{x_1 - x_2}(x - x_1)\) (swapping the x-differences) and do not realise that this changes the sign of the slope. They also forget the vertical line case and attempt to use the formula with \(x_1 = x_2\), leading to division by zero. Another frequent error is using the wrong point for \((x_1, y_1)\) after computing the slope correctly, e.g., using \((x_2, y_2)\) in the point-slope part but keeping the slope as \(\frac{y_2 - y_1}{x_2 - x_1}\) which is fine, but if they mix the order inconsistently (e.g., slope from \(P\) to \(Q\) but point \(R\) not on the line) they get a wrong equation.

## ON_FAILURE
If a student makes the sign error, have them compute the slope twice: once as \(\frac{y_2 - y_1}{x_2 - x_1}\) and once as \(\frac{y_1 - y_2}{x_1 - x_2}\) and verify they are equal. Then emphasise that the point-slope form must use the same point that was used as the "first" point in the slope numerator if they want to directly substitute. For the vertical line case, draw a vertical line on graph paper, pick two points on it, and ask them to compute the slope. They will see the denominator is zero. Then state the rule: "If x-coordinates are equal, the line is vertical: \(x = \text{constant}\)." Practice with 3-4 mixed problems (some vertical, some not) until they automatically check \(x_1 = x_2\) first.

## PREREQUISITE_NODE_IDS
c11_math_cbse_10_001, c11_math_cbse_10_002, c11_math_cbse_10_006, c11_math_cbse_10_009, c9_math_ch1_1, c9_math_ch1_2, c10_math_cbse_07_001, c10_math_cbse_07_002, c11_math_cbse_10_003, c11_math_cbse_10_005, c11_math_cbse_10_007, c11_math_cbse_10_008

## PREREQUISITE_REASONS
c11_math_cbse_10_001: Need to understand coordinate axes and how to represent points as ordered pairs.
c11_math_cbse_10_002: Distance formula reinforces coordinate differences, which appear in the slope formula.
c11_math_cbse_10_006: Slope definition and formula are the direct basis for deriving the two-point form.
c11_math_cbse_10_009: Point-slope form is the immediate predecessor; two-point form is obtained by substituting the slope expression.
c9_math_ch1_1: Cartesian coordinate system basics from Class 9.
c9_math_ch1_2: Plotting points on the plane.
c10_math_cbse_07_001: Distance formula derivation using Pythagoras (reinforces coordinate differences).
c10_math_cbse_07_002: Applications of distance formula (familiarity with coordinate geometry).
c11_math_cbse_10_003: Two-point form uses endpoints; section formula finds intermediate points for line equations  
c11_math_cbse_10_005: Two-point form directly gives line through two vertices; third vertex area follows.  
c11_math_cbse_10_007: two-point form gives slope, then parallel/perpendicular lines can be constructed.  
c11_math_cbse_10_008: Two-point form uses slope between two points; angle between lines helps verify geometric properties of triangles.  

## FORWARD_NODE_IDS
c11_math_cbse_10_011, c11_math_cbse_10_012, c11_math_cbse_10_013, c11_math_cbse_10_014, c11_math_cbse_10_015, c12_math_cbse_10_008, c12_math_cbse_11_002

## FORWARD_REASONS
c11_math_cbse_10_011: Slope-intercept form is derived by rearranging the two-point form to \(y = mx + c\).
c11_math_cbse_10_012: Intercept form is obtained by finding x and y intercepts from the two-point form.
c11_math_cbse_10_013: Normal form requires converting the general form (which can come from two-point form) to normal form.
c11_math_cbse_10_014: Distance of a point from a line uses the general form of the line, which can be derived from two-point form.
c11_math_cbse_10_015: Distance between parallel lines uses the general form coefficients.
c12_math_cbse_10_008: Two-point form in 2D directly extends to the vector equation through two points in 3D.  
c12_math_cbse_11_002: Two-point form in 2D \(\frac{y - y_1}{y_2 - y_1} = \frac{x - x_1}{x_2 - x_1}\) extends directly to the 3D two-point form \(\frac{x - x_1}{x_2 - x_1} = \frac{y - y_1}{y_2 - y_1} = \frac{z - z_1}{z_2 - z_1}\).  

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_03_001, c11_eco_cbse_02_003
## CROSS_SUBJECT_REASONS
c11_physics_ch3_1: Motion in a straight line – position-time graphs are straight lines; two points (time, position) give the velocity (slope) and equation of motion.
c11_economics_ch2_3: Linear demand/supply curves – two price-quantity points determine the linear equation, which is used to find equilibrium.
c11_phy_cbse_03_001: Cross-subject support: A scalar is a physical quantity completely specified by its magnitude (a single numerical... supplies tools/facts used directly in this node.  
c11_eco_cbse_02_003: Cross-subject support: The Mahalanobis Model, implemented in India's Second Five Year Plan (1956-61), is a two-se... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_math_cbse_10_006 -> c11_math_cbse_10_009 -> c11_math_cbse_10_010 -> c11_math_cbse_10_011

## THIS_FORMULA
\(y - y_1 = \frac{y_2 - y_1}{x_2 - x_1}(x - x_1)\) for \(x_1 \neq x_2\); \(x = x_1\) for \(x_1 = x_2\)

## FORMULA_VARIABLES
\(x_1, y_1\) = coordinates of first point; \(x_2, y_2\) = coordinates of second point; \(x, y\) = variables representing any point on the line; slope \(m = \frac{y_2 - y_1}{x_2 - x_1}\) (when defined)

## FORMULA_UNITS
dimensionless (coordinates are pure numbers; if coordinates represent physical quantities like metres, the slope has units of the ratio of those units)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch3_1 | In physics, the equation of motion for uniform velocity is a straight line on a displacement-time graph. Given two data points (time, displacement), the two-point form yields the velocity (slope) and the equation of motion.
c11_economics_ch2_3 | In economics, a linear demand curve can be determined from two observed price-quantity pairs. The two-point form gives the demand equation, which is then used to find consumer surplus or equilibrium.

## PREREQ_CONCEPT
The concept of slope as the ratio of vertical change to horizontal change between two points, and the point-slope form of a line.

## PREREQ_BEFORE
The student must be able to compute the slope between two points correctly, handle sign conventions, and write the equation of a line given a point and a slope (point-slope form).

## PREREQ_STUCK
If stuck, revisit c11_math_cbse_10_006 (Slope of a Line) and c11_math_cbse_10_009 (Point-Slope Form) and practice 5-10 problems on each.

## WORKED_EXAMPLE_1
PROBLEM: A straight railway track passes through two stations A and B. Station A is located at coordinates (2 km, 3 km) and station B at (8 km, 15 km) relative to the railway head office. Find the equation of the track in the form \(y = mx + c\). Also find the distance of the track from the head office at the point where the track crosses the y-axis.

STEPS:
- Step 1: Identify the coordinates: \(A(2, 3)\) and \(B(8, 15)\). Let \((x_1, y_1) = (2, 3)\) and \((x_2, y_2) = (8, 15)\).
- Step 2: Compute the slope \(m = \frac{y_2 - y_1}{x_2 - x_1} = \frac{15 - 3}{8 - 2} = \frac{12}{6} = 2\).
- Step 3: Use the two-point form: \(y - y_1 = m(x - x_1) \Rightarrow y - 3 = 2(x - 2)\).
- Step 4: Simplify to slope-intercept form: \(y - 3 = 2x - 4 \Rightarrow y = 2x - 1\).
- Step 5: The y-intercept is \(c = -1\). The track crosses the y-axis at \((0, -1)\). The distance from the head office (origin) to this point is \(|-1| = 1\) km (since it's on the y-axis).
REASONING: The two-point form directly uses the slope calculated from the two given points. Converting to \(y = mx + c\) reveals the y-intercept, which is the distance from the origin along the y-axis. The problem is set in a real Indian context (railway track, distances in km).
ANSWER: Equation: \(y = 2x - 1\); y-intercept distance = 1 km.

## WORKED_EXAMPLE_2
PROBLEM: A line passes through the points \((5, -2)\) and \((5, 4)\). Write its equation. Then find the equation of a line perpendicular to it that passes through the point \((-3, 1)\).

STEPS:
- Step 1: Observe that both points have the same x-coordinate: \(x_1 = x_2 = 5\). This is a vertical line.
- Step 2: The equation of the vertical line is \(x = 5\).
- Step 3: A line perpendicular to a vertical line is horizontal (slope = 0).
- Step 4: The horizontal line passing through \((-3, 1)\) has equation \(y = 1\).
- Step 5: Verify: The vertical line \(x = 5\) and horizontal line \(y = 1\) intersect at \((5, 1)\) and are perpendicular.
REASONING: This example tests the special case \(x_1 = x_2\) and the concept of perpendicular lines (from c11_math_cbse_10_007). The student must recognise the vertical line immediately and not attempt to use the slope formula.
ANSWER: First line: \(x = 5\); Perpendicular line: \(y = 1\).

## WORKED_EXAMPLE_3
PROBLEM: The line joining the points \((k, 2k)\) and \((3k, 5)\) has a slope of \(-1\). Find the value of \(k\) and the equation of the line in general form \(Ax + By + C = 0\).

STEPS:
- Step 1: Points: \(P(k, 2k)\) and \(Q(3k, 5)\). Slope \(m = \frac{5 - 2k}{3k - k} = \frac{5 - 2k}{2k}\).
- Step 2: Set slope equal to \(-1\): \(\frac{5 - 2k}{2k} = -1\).
- Step 3: Solve for \(k\): \(5 - 2k = -2k \Rightarrow 5 = 0\). This is a contradiction!
- Step 4: Re-examine: The equation \(5 - 2k = -2k\) simplifies to \(5 = 0\), which is impossible. Therefore, no such \(k\) exists.
- Step 5: But wait – we must consider if the denominator is zero. If \(2k = 0 \Rightarrow k = 0\), then the points are \((0, 0)\) and \((0, 5)\) – a vertical line with undefined slope, not \(-1\). So no solution.
- Step 6: Conclusion: There is no real value of \(k\) that makes the slope \(-1\). The problem has no solution.
REASONING: This example combines algebraic manipulation with the two-point slope formula and requires checking for the vertical line case. It teaches students to be careful about domain restrictions (denominator ≠ 0) and to recognise when an equation leads to a contradiction.
ANSWER: No real value of \(k\) satisfies the condition.

## COMPETENCY_QUESTION_1
QUESTION: A straight road is to be constructed through two villages located at coordinates \(A(10, 20)\) and \(B(30, 5)\) on a survey map (units in 100 metres). The road must also pass through a checkpoint at \(C(20, y_C)\). Find \(y_C\) and the equation of the road in the form \(\frac{x}{a} + \frac{y}{b} = 1\) (intercept form). Also, determine whether the road passes through the forest reserve located at \(D(40, -5)\).

COMPETENCY: Translating real-world situations to mathematical expressions and interpreting geometric meaning.
STEPS:
- Step 1: Find the equation of the line through A and B using two-point form.
- Step 2: Substitute \(x = 20\) to find \(y_C\).
- Step 3: Convert the equation to intercept form.
- Step 4: Check if point D satisfies the equation.
ANSWER: Slope = \(\frac{5-20}{30-10} = -\frac{15}{20} = -\frac{3}{4}\). Equation: \(y - 20 = -\frac{3}{4}(x - 10) \Rightarrow 4y - 80 = -3x + 30 \Rightarrow 3x + 4y = 110\). Intercept form: \(\frac{x}{110/3} + \frac{y}{110/4} = 1 \Rightarrow \frac{x}{36.67} + \frac{y}{27.5} = 1\). For \(x=20\): \(3(20)+4y=110 \Rightarrow 60+4y=110 \Rightarrow y=12.5\). So \(y_C = 12.5\). Check D(40, -5): \(3(40)+4(-5)=120-20=100 \neq 110\). Road does not pass through forest reserve.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A line \(L\) passes through the points \(P(t, 2t)\) and \(Q(3, t+1)\). Another line \(M\) is perpendicular to \(L\) and passes through the origin. If the x-intercept of \(M\) is 4, find the value of \(t\) and the equations of both lines.

COMPETENCY: Combining multiple concepts (two-point form, perpendicular slopes, intercepts) to solve a multi-step problem with a parameter.
STEPS:
- Step 1: Find slope of \(L\) in terms of \(t\): \(m_L = \frac{(t+1) - 2t}{3 - t} = \frac{1 - t}{3 - t}\).
- Step 2: Slope of \(M\) is \(m_M = -\frac{1}{m_L} = \frac{t-3}{1-t}\) (provided \(t \neq 1\)).
- Step 3: Line \(M\) passes through origin, so its equation is \(y = m_M x\).
- Step 4: x-intercept of \(M\) is 4, meaning when \(y=0\), \(x=4\). But for a line through origin, the x-intercept is always 0 unless the line is horizontal? Wait: A line through origin has equation \(y = mx\). Its x-intercept is found by setting \(y=0 \Rightarrow 0 = mx \Rightarrow x=0\). So the x-intercept is always 0. But the problem says x-intercept is 4. Contradiction unless the line is vertical? A vertical line through origin is \(x=0\), x-intercept 0. So no line through origin can have x-intercept 4 except... Actually, if the line is the x-axis itself (\(y=0\)), every point is an x-intercept? No, the x-axis has infinitely many x-intercepts. But the problem says "the x-intercept is 4", implying a unique non-zero intercept. This is impossible for a line through origin. Therefore, the only possibility is that \(M\) is the x-axis? But then its equation is \(y=0\), slope 0, and it passes through origin. Then \(L\) would be vertical (perpendicular to x-axis). If \(L\) is vertical, its points have same x-coordinate: \(t = 3\). Then \(P(3, 6)\) and \(Q(3, 4)\). Slope undefined. Then \(M\) is horizontal through origin: \(y=0\). Its x-intercept is not uniquely 4. So the problem might be flawed? Let's re-read: "Another line M is perpendicular to L and passes through the origin. If the x-intercept of M is 4". A line through origin cannot have a non-zero x-intercept unless it is the x-axis itself (which has all x as intercepts). So perhaps the line M does NOT pass through the origin? Wait, the problem says "passes through the origin". This is a trick: a line through the origin has x-intercept 0. So the condition "x-intercept is 4" cannot be satisfied unless we interpret "x-intercept" differently? Actually, the x-intercept is the x-coordinate where the line crosses the x-axis. For a line through origin, that is 0. So there is no solution. This is a problem that tests critical evaluation of conditions.
- Step 5: Realize the impossibility: A line through the origin always has x-intercept 0. Therefore, no such \(t\) exists.
- Step 6: State the conclusion clearly.
ANSWER: No real value of \(t\) satisfies the conditions because any line passing through the origin has x-intercept 0, not 4.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you are designing a straight walking path in a school garden that must pass through two trees located at ______ (2, 3) and (5, 7).

## DIAGNOSTIC_ANSWER_7
coordinates

**A wrong answer ("positions" or "spots") reveals the student has swapped the walkthrough's noun - the path must pass through two trees located at coordinates (2, 3) and (5, 7).** Coordinates is the walkthrough's own noun, and the noun is what the blank grades. Recall the school-garden path before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
The student can derive the two-point form from the slope formula, write the equation of a line given two points (including vertical lines), and convert it to other forms (slope-intercept, intercept, normal) to solve geometric problems such as finding intersections, checking collinearity, or determining the line's position relative to a.
