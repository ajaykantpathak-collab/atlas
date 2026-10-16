## ELI5
A garden plot sits against two walls - the axes - and the diagonal fence runs from (8, 0) to (0, 6): equation x/8 + y/6 = 1. That is the intercept form: a is where the line cuts the x-axis, b where it cuts the y-axis, both non-zero, and the line never passes through the origin. The intercepts sit openly in the denominators, which is exactly why this form exists.

## DEFINITION
The intercept form of a straight line is the equation of a line that makes non-zero intercepts \(a\) and \(b\) on the x-axis and y-axis respectively, given by \(\frac{x}{a} + \frac{y}{b} = 1\), where \(a\) is the x-intercept (distance from origin to where the line crosses x-axis) and \(b\) is the y-intercept (distance from origin to where the line crosses y-axis). Both \(a\) and \(b\) are non-zero real numbers, and the line does not pass through the origin.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can derive the intercept form from the two-point form using intercept points \((a,0)\) and \((0,b)\), convert between intercept form and general form \(Ax + By + C = 0\), find intercepts from any linear equation, and solve application problems involving area of triangle formed by the line with coordinate axes.

## SCOPE_BOUNDARY
Covers derivation of intercept form \(\frac{x}{a} + \frac{y}{b} = 1\) from two-point form, conversion to/from general form and slope-intercept form, finding x and y intercepts from any linear equation, and applications like area of triangle with axes. Does NOT cover lines passing through origin (where intercept form is undefined), lines parallel to axes (where one intercept is infinite), or 3D intercept form.

## WALKTHROUGH
Imagine you're designing a rectangular garden plot in your backyard where two adjacent sides lie along the boundary walls (x-axis and y-axis). The diagonal fence connecting the points where the garden meets the walls has equation \(\frac{x}{8} + \frac{y}{6} = 1\). You need to find the exact coordinates where the fence meets each wall to order the correct length of fencing material. Start by recalling that any line crossing the x-axis has y=0 at that point, and crossing the y-axis has x=0. Use the two-point form with points \((a,0)\) and \((0,b)\) to derive the intercept form. The key insight is that the intercepts \(a\) and \(b\) directly appear in the denominator, making this form uniquely powerful for visualizing where a line cuts the axes.

Takeaway: mastery means deriving the form from the two intercept points (a, 0) and (0, b), converting between intercept and general form, and reading intercepts off any linear equation. Exam moves: find-the-intercepts questions and area-of-the-triangle items where the line and the axes enclose a region. Check yourself: the intercepts are distances to the crossing points, not lengths of the line - and a line through the origin has no intercept form at all. Students miss it because they confuse intercepts with coefficients, when the definition fixes the meaning: set y = 0 to find a, x = 0 to find b, and the form writes itself.

## DIAGNOSTIC_QUESTION_1
What is the intercept form of a straight line, and what do the parameters \(a\) and \(b\) represent geometrically?

## DIAGNOSTIC_ANSWER_1
The intercept form is \(\frac{x}{a} + \frac{y}{b} = 1\), where \(a\) is the x-intercept (the x-coordinate where the line crosses the x-axis, so the point is \((a,0)\)) and \(b\) is the y-intercept (the y-coordinate where the line crosses the y-axis, so the point is \((0,b)\)). Both \(a\) and \(b\) must be non-zero. A wrong answer where the student writes \(ax + by = 1\) or swaps \(a\) and \(b\) reveals confusion between intercept form and general form, or misunderstanding that the intercepts appear in the denominator, not as coefficients.

## DIAGNOSTIC_QUESTION_2
A student claims that the line \(3x - 4y = 12\) has x-intercept 3 and y-intercept -4 because the coefficients are 3 and -4. Explain why this reasoning is incorrect and find the actual intercepts.

## DIAGNOSTIC_ANSWER_2
The student incorrectly assumes the general form \(Ax + By = C\) gives intercepts directly as \(A\) and \(B\). To find intercepts, we must convert to intercept form: divide both sides by 12 to get \(\frac{3x}{12} - \frac{4y}{12} = 1\), which simplifies to \(\frac{x}{4} + \frac{y}{-3} = 1\). Thus x-intercept = 4, y-intercept = -3. The error reveals the misconception that coefficients in general form equal intercepts, ignoring the need to normalize the constant term to 1.

## DIAGNOSTIC_QUESTION_3
Find the equation of the line that makes intercepts 5 and -3 on the x-axis and y-axis respectively. Then find the area of the triangle formed by this line with the coordinate axes.

## DIAGNOSTIC_ANSWER_3
Given \(a = 5\), \(b = -3\). Using intercept form: \(\frac{x}{5} + \frac{y}{-3} = 1\). Multiply by 15: \(3x - 5y = 15\). The triangle vertices are \((0,0)\), \((5,0)\), \((0,-3)\). Area = \(\frac{1}{2} \times |5| \times |-3| = 7.5\) square units. A wrong answer of 15 (forgetting the 1/2) or -7.5 (not taking absolute value) reveals computational errors in area formula or sign handling.

## DIAGNOSTIC_QUESTION_4
The line \(\frac{x}{a} + \frac{y}{b} = 1\) passes through the point \((2,3)\) and the sum of its intercepts is 10. Find the possible equations of the line.

## DIAGNOSTIC_ANSWER_4
Given: \(\frac{2}{a} + \frac{3}{b} = 1\) and \(a + b = 10\). Substitute \(b = 10 - a\): \(\frac{2}{a} + \frac{3}{10-a} = 1\). Multiply by \(a(10-a)\): \(2(10-a) + 3a = a(10-a)\). Simplify: \(20 - 2a + 3a = 10a - a^2\) → \(a^2 - 9a + 20 = 0\) → \((a-4)(a-5)=0\). So \(a=4, b=6\) or \(a=5, b=5\). Equations: \(\frac{x}{4} + \frac{y}{6} = 1\) (or \(3x+2y=12\)) and \(\frac{x}{5} + \frac{y}{5} = 1\) (or \(x+y=5\)). Wrong answers often miss one solution or make algebraic errors in clearing denominators.

## DIAGNOSTIC_QUESTION_5
A student solves for the intercepts of the line \(2x + 3y = 6\) by setting \(x=0\) to get \(y=2\) and \(y=0\) to get \(x=3\), then writes the intercept form as \(\frac{x}{2} + \frac{y}{3} = 1\). Evaluate this solution.

## DIAGNOSTIC_ANSWER_5
The student correctly found intercepts \((3,0)\) and \((0,2)\) but incorrectly wrote the intercept form. The intercept form uses the intercept values in the denominator: x-intercept is 3, so denominator under x is 3; y-intercept is 2, so denominator under y is 2. Correct form: \(\frac{x}{3} + \frac{y}{2} = 1\). The student swapped the intercept values, revealing confusion between the coordinate values and their placement in the formula.

## DIAGNOSTIC_QUESTION_6
Create a real-world problem where the intercept form of a line is the most natural way to model the situation, and explain why other forms (point-slope, slope-intercept) would be less convenient.

## DIAGNOSTIC_ANSWER_6
Example: A factory produces two products A and B. Each unit of A requires 2 hours of machine time and 3 hours of labour. Each unit of B requires 4 hours of machine time and 1 hour of labour. The factory has 24 hours of machine time and 12 hours of labour available daily. If \(x\) units of A and \(y\) units of B are produced, the constraints are \(2x + 4y = 24\) (machine) and \(3x + y = 12\) (labour). The intercept form \(\frac{x}{12} + \frac{y}{6} = 1\) and \(\frac{x}{4} + \frac{y}{12} = 1\) immediately shows maximum possible production of each product alone (when other is zero). Other forms would require extra steps to find these boundary values. A poor answer gives a generic "graphing" problem without justifying why intercept form is uniquely suited.

## COMMON_MISCONCEPTION
Students confuse the intercept form \(\frac{x}{a} + \frac{y}{b} = 1\) with the general form \(Ax + By = C\) and directly read intercepts as coefficients \(A\) and \(B\). For example, given \(4x + 5y = 20\), they state x-intercept = 4, y-intercept = 5. The correct process is to divide by the constant term (20) to get \(\frac{4x}{20} + \frac{5y}{20} = 1\) → \(\frac{x}{5} + \frac{y}{4} = 1\), giving intercepts 5 and 4. This error stems from not recognizing that intercept form requires the constant term to be 1, and intercepts are the denominators, not the numerators.

## ON_FAILURE
If a student makes this error, have them: (1) Find intercepts by substitution method first (set x=0, find y; set y=0, find x) to get the correct intercept values. (2) Write the intercept form using those values as denominators. (3) Compare with the original equation to see the division step needed. (4) Practice converting 5 equations from general to intercept form by dividing by the constant term, then verify by finding intercepts via substitution each time. Emphasize: "The number in the denominator is the intercept; the number in the numerator is the coefficient."

## PREREQUISITE_NODE_IDS
c11_math_cbse_10_001, c11_math_cbse_10_006, c11_math_cbse_10_009, c11_math_cbse_10_010, c11_math_cbse_10_011, c9_math_ch1_1, c9_math_ch1_2, c10_math_cbse_07_001, c10_math_cbse_07_002, c11_math_cbse_10_007

## PREREQUISITE_REASONS
c11_math_cbse_10_001: Understanding coordinate axes and plotting points is essential to visualize intercepts
c11_math_cbse_10_006: Slope concept connects intercept form to slope-intercept form via \(m = -b/a\)
c11_math_cbse_10_009: Point-slope form is the foundation from which two-point and intercept forms are derived
c11_math_cbse_10_010: Two-point form using \((a,0)\) and \((0,b)\) directly derives intercept form
c11_math_cbse_10_011: Slope-intercept form \(y = mx + c\) converts to intercept form by rearranging
c9_math_ch1_1: Cartesian coordinate system basics from Class 9
c9_math_ch1_2: Plotting points on coordinate plane
c10_math_cbse_07_001: Distance formula for verifying intercept distances
c10_math_cbse_07_002: Applications of coordinate geometry
c11_math_cbse_10_007: intercept form can be converted to slope form to apply conditions.  

## FORWARD_NODE_IDS
c11_math_cbse_10_013, c11_math_cbse_10_014, c11_math_cbse_10_015, c11_math_cbse_10_016
## FORWARD_REASONS
c11_math_cbse_10_013: Normal form uses perpendicular distance from origin, which relates to intercepts via area of triangle
c11_math_cbse_10_014: Distance from point to line formula uses general form, which connects to intercept form through conversion
c11_math_cbse_10_015: Distance between parallel lines uses general form coefficients, derived from intercept form concepts
c11_math_cbse_10_016: Locus problems often involve intercept conditions (e.g., sum of intercepts constant)

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_03_001, c11_eco_cbse_02_001, c11_chem_cbse_01_001
## CROSS_SUBJECT_REASONS
c11_physics_ch3_1: Motion in a straight line - intercepts on position-time and velocity-time graphs represent initial position and initial velocity
c11_economics_ch2_1: Budget line in consumer theory - intercepts represent maximum quantities of goods when spending entire income on one good
c11_chemistry_ch1_1: Beer-Lambert law in spectroscopy - absorbance vs concentration graph intercept relates to blank measurement
c11_phy_cbse_03_001: Cross-subject support: A scalar is a physical quantity completely specified by its magnitude (a single numerical... supplies tools/facts used directly in this node.  
c11_eco_cbse_02_001: Cross-subject support: A Five Year Plan in India is a comprehensive policy document formulated by the Planning Co... supplies tools/facts used directly in this node.  
c11_chem_cbse_01_001: Cross-subject support: Chemistry is the central science that studies the composition, structure, properties, and... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_math_cbse_10_010 -> c11_math_cbse_10_012 -> c11_math_cbse_10_013 (Two-point form derives intercept form, which enables normal form through perpendicular distance concepts)

## THIS_FORMULA
\(\frac{x}{a} + \frac{y}{b} = 1\) where \(a \neq 0\), \(b \neq 0\) are x-intercept and y-intercept respectively

## FORMULA_VARIABLES
\(x, y\) = coordinates of any point on the line; \(a\) = x-intercept (distance from origin to x-axis crossing, point \((a,0)\)); \(b\) = y-intercept (distance from origin to y-axis crossing, point \((0,b)\))

## FORMULA_UNITS
\(x, y, a, b\) are in same linear units (metres, cm, etc.); equation is dimensionless

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch3_1 | In kinematics, the velocity-time graph \(v = u + at\) has y-intercept \(u\) (initial velocity) and x-intercept \(-u/a\) (time when velocity becomes zero)
c11_economics_ch2_1 | Budget line \(P_x x + P_y y = M\) has intercepts \(M/P_x\) and \(M/P_y\) representing maximum purchasable quantities of goods X and Y
c11_chemistry_ch1_1 | Calibration curve \(A = \epsilon b c\) in spectroscopy - when rearranged, intercept form helps determine detection limits

## PREREQ_CONCEPT
Two-point form of a line using points \((a,0)\) and \((0,b)\) is the direct algebraic precursor to intercept form.

## PREREQ_BEFORE
Student must be able to find x and y intercepts of any line by setting y=0 and x=0 respectively, and must understand the two-point form formula \(\frac{y-y_1}{y_2-y_1} = \frac{x-x_1}{x_2-x_1}\).

## PREREQ_STUCK
If stuck, revisit c11_math_cbse_10_010 (Two-Point Form) and practice deriving intercept form by substituting \((x_1,y_1) = (a,0)\) and \((x_2,y_2) = (0,b)\) into the two-point formula.

## WORKED_EXAMPLE_1
PROBLEM: A straight line passes through the point (4, -2) and its intercepts on the axes are equal in magnitude but opposite in sign. Find the equation of the line in intercept form and general form.

STEPS:
- Step 1: Let the intercepts be \(a\) and \(b\). Given \(|a| = |b|\) and opposite signs, so \(b = -a\).
- Step 2: Write the intercept form: \(\frac{x}{a} + \frac{y}{-a} = 1\) which simplifies to \(\frac{x - y}{a} = 1\) or \(x - y = a\).
- Step 3: Substitute the given point (4, -2): \(4 - (-2) = a\) → \(a = 6\).
- Step 4: Since \(b = -a\), \(b = -6\). Intercept form: \(\frac{x}{6} + \frac{y}{-6} = 1\) or \(\frac{x}{6} - \frac{y}{6} = 1\).
- Step 5: Convert to general form: Multiply by 6: \(x - y = 6\) → \(x - y - 6 = 0\).
- Step 6: Verify: x-intercept (set y=0): x=6 ✓; y-intercept (set x=0): -y=6 → y=-6 ✓; point (4,-2): 4-(-2)=6 ✓.

REASONING: The condition "equal magnitude opposite sign" directly gives \(b = -a\), reducing the problem to one variable. Using intercept form makes the intercept condition transparent, whereas slope-intercept form would require additional steps to express the intercept relationship.

ANSWER: Intercept form: \(\frac{x}{6} - \frac{y}{6} = 1\); General form: \(x - y - 6 = 0\)

## WORKED_EXAMPLE_2
PROBLEM: Find the equation of the line which forms a triangle of area 12 square units with the coordinate axes and passes through the point (2, 3).

STEPS:
- Step 1: Let intercepts be \(a\) and \(b\). Area of triangle with axes = \(\frac{1}{2}|a||b| = 12\) → \(|ab| = 24\).
- Step 2: Line passes through (2,3), so \(\frac{2}{a} + \frac{3}{b} = 1\).
- Step 3: Consider cases for signs. Case 1: \(a>0, b>0\) → \(ab = 24\). Substitute \(b = 24/a\): \(\frac{2}{a} + \frac{3a}{24} = 1\) → \(\frac{2}{a} + \frac{a}{8} = 1\).
- Step 4: Multiply by \(8a\): \(16 + a^2 = 8a\) → \(a^2 - 8a + 16 = 0\) → \((a-4)^2 = 0\) → \(a = 4\), \(b = 6\).
- Step 5: Case 2: \(a>0, b<0\) → \(ab = -24\). Then \(b = -24/a\): \(\frac{2}{a} - \frac{3a}{24} = 1\) → \(\frac{2}{a} - \frac{a}{8} = 1\) → \(16 - a^2 = 8a\) → \(a^2 + 8a - 16 = 0\) → \(a = -4 \pm 4\sqrt{2}\). Only positive root: \(a = 4(\sqrt{2}-1)\), \(b = -6(\sqrt{2}+1)\).
- Step 6: Case 3: \(a<0, b>0\) → similar to case 2 by symmetry. Case 4: both negative gives same as case 1 with sign changes.
- Step 7: Primary solution (positive intercepts): \(\frac{x}{4} + \frac{y}{6} = 1\) or \(3x + 2y = 12\).

REASONING: The area condition gives a relationship between intercepts, and the point condition gives another. Solving the system requires considering sign combinations because area uses absolute values. The intercept form directly incorporates both conditions naturally.

ANSWER: Main solution: \(\frac{x}{4} + \frac{y}{6} = 1\) or \(3x + 2y = 12\). Additional solutions with mixed-sign intercepts: \(\frac{x}{4(\sqrt{2}-1)} + \frac{y}{-6(\sqrt{2}+1)} = 1\) and symmetric counterpart.

## WORKED_EXAMPLE_3
PROBLEM: A line L makes intercepts \(a\) and \(b\) on the axes such that \(a + b = 10\) and \(ab = 21\). Find the equation of L. Then find the equation of the line perpendicular to L that passes through the point where L crosses the x-axis.

STEPS:
- Step 1: Given \(a+b=10\) and \(ab=21\). These are sum and product of roots of quadratic \(t^2 - 10t + 21 = 0\).
- Step 2: Solve: \((t-3)(t-7)=0\) → \(a=3, b=7\) or \(a=7, b=3\).
- Step 3: Two possible lines: L₁: \(\frac{x}{3} + \frac{y}{7} = 1\) (or \(7x + 3y = 21\)) and L₂: \(\frac{x}{7} + \frac{y}{3} = 1\) (or \(3x + 7y = 21\)).
- Step 4: Find x-intercept of each: L₁ crosses x-axis at (3,0); L₂ crosses at (7,0).
- Step 5: Slope of L₁: from \(7x + 3y = 21\) → \(y = -\frac{7}{3}x + 7\), so \(m_1 = -\frac{7}{3}\). Perpendicular slope \(m_{\perp} = \frac{3}{7}\).
- Step 6: Line through (3,0) with slope \(\frac{3}{7}\): \(y - 0 = \frac{3}{7}(x - 3)\) → \(7y = 3x - 9\) → \(3x - 7y = 9\).
- Step 7: For L₂: slope \(m_2 = -\frac{3}{7}\), perpendicular slope \(m_{\perp} = \frac{7}{3}\). Line through (7,0): \(y = \frac{7}{3}(x-7)\) → \(3y = 7x - 49\) → \(7x - 3y = 49\).
- Step 8: Verify perpendicularity: \(m_1 \times m_{\perp} = (-\frac{7}{3}) \times \frac{3}{7} = -1\) ✓.

REASONING: This problem combines intercept form (using sum/product of intercepts), coordinate geometry (finding intercept points), and perpendicular line condition (product of slopes = -1). The intercept form makes the sum/product conditions directly accessible.

ANSWER: Line L: \(\frac{x}{3} + \frac{y}{7} = 1\) or \(\frac{x}{7} + \frac{y}{3} = 1\). Perpendicular lines: \(3x - 7y = 9\) (for first L) and \(7x - 3y = 49\) (for second L).

## COMPETENCY_QUESTION_1
QUESTION: A triangular plot of land is bounded by the x-axis, y-axis, and a straight fence. The fence passes through a tree located at (4, 5). The total length of fencing available is exactly enough to cover the perimeter of the triangle. If the x-intercept of the fence is twice the y-intercept, find the equation of the fence line and the total length of fencing required.

COMPETENCY: Translating real-world constraints into mathematical equations and solving multi-condition problems

STEPS:
- Step 1: Let y-intercept = \(b\), then x-intercept \(a = 2b\) (given).
- Step 2: Line passes through (4,5): \(\frac{4}{2b} + \frac{5}{b} = 1\) → \(\frac{2}{b} + \frac{5}{b} = 1\) → \(\frac{7}{b} = 1\) → \(b = 7\).
- Step 3: Then \(a = 14\). Intercept form: \(\frac{x}{14} + \frac{y}{7} = 1\) or \(x + 2y = 14\).
- Step 4: Triangle vertices: (0,0), (14,0), (0,7). Side lengths: 14 (on x-axis), 7 (on y-axis), hypotenuse = \(\sqrt{14^2 + 7^2} = \sqrt{196+49} = \sqrt{245} = 7\sqrt{5}\).
- Step 5: Perimeter = \(14 + 7 + 7\sqrt{5} = 21 + 7\sqrt{5}\) units.

ANSWER: Equation: \(\frac{x}{14} + \frac{y}{7} = 1\) or \(x + 2y = 14\); Total fencing: \(21 + 7\sqrt{5}\) units (≈ 36.65 units)

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The line \(\frac{x}{a} + \frac{y}{b} = 1\) intersects the line \(2x - 3y = 6\) at point P. If the x-intercept of the first line is 3 and the area of triangle formed by the two lines and the x-axis is 15 square units, find the value of \(b\) and the coordinates of P.

COMPETENCY: Synthesizing intercept form, line intersection, and geometric area conditions to solve for unknown parameters

STEPS:
- Step 1: Given \(a = 3\), so first line: \(\frac{x}{3} + \frac{y}{b} = 1\) → \(bx + 3y = 3b\).
- Step 2: Second line: \(2x - 3y = 6\). Find x-intercept: set y=0 → \(2x=6\) → \(x=3\). So both lines have same x-intercept (3,0).
- Step 3: Find intersection P: Solve \(bx + 3y = 3b\) and \(2x - 3y = 6\). Add: \((b+2)x = 3b + 6\) → \(x = \frac{3(b+2)}{b+2} = 3\) (if \(b \neq -2\)).
- Step 4: If \(x=3\), then from second line: \(2(3) - 3y = 6\) → \(y=0\). So P = (3,0) for any \(b \neq -2\).
- Step 5: Triangle with x-axis: vertices are (0,0), (3,0), and y-intercept of first line (0,b). But wait - the triangle formed by two lines and x-axis: the two lines intersect at (3,0) on x-axis, so they don't form a triangle with x-axis unless they have different x-intercepts!
- Step 6: Re-read: "area of triangle formed by the two lines and the x-axis". The lines are: L1: \(\frac{x}{3} + \frac{y}{b} = 1\), L2: \(2x - 3y = 6\), and x-axis: \(y=0\). L2 has x-intercept 3. L1 has x-intercept 3. Both cross x-axis at same point. The triangle vertices would be: intersection of L1 & L2 (which is (3,0)), intersection of L1 & x-axis (3,0), intersection of L2 & x-axis (3,0). All three vertices coincide! Area = 0, not 15.
- Step 7: Contradiction means our assumption is wrong. The lines must have different x-intercepts. But L1 x-intercept is given as 3. L2 x-intercept is 3. Unless... the problem means the triangle formed by the two lines and the y-axis? Or perhaps the x-intercept of L1 is not 3?
- Step 8: Re-interpret: "the x-intercept of the first line is 3" - this is given. L2 x-intercept is 3. They are the same. Then the triangle with x-axis has zero area. The problem might have a typo, or "x-intercept" means something else. Let's assume the triangle is formed by the two lines and the y-axis.
- Step 9: Triangle with y-axis: vertices: (0,0), (0,b) [L1 y-intercept], (0,-2) [L2 y-intercept: 2(0)-3y=6 → y=-2]. Area = \(\frac{1}{2} \times |b - (-2)| \times\) (x-coordinate of intersection of L1 and L2). But intersection is at x=3. So area = \(\frac{1}{2} \times |b+2| \times 3 = 15\) → \(|b+2| = 10\) → \(b+2 = \pm 10\) → \(b = 8\) or \(b = -12\).
- Step 10: Check: If \(b=8\), L1: \(\frac{x}{3} + \frac{y}{8} = 1\). Intersection with L2: as calculated, x=3, y=0. Triangle with y-axis: vertices (0,0), (0,8), (0,-2)? No, triangle vertices: (0,0), (0,8), and intersection (3,0). Area = \(\frac{1}{2} \times 8 \times 3 = 12\), not 15.
- Step 11: Let's recalculate intersection properly. L1: \(8x + 3y = 24\). L2: \(2x - 3y = 6\). Add: \(10x = 30\) → \(x=3\). Then \(y=0\). So intersection is (3,0). Triangle with y-axis: (0,0), (0,8), (3,0). Area = \(\frac{1}{2} \times 8 \times 3 = 12\).
- Step 12: The problem says area = 15. Let's use the formula: Area of triangle formed by lines \(A_1x+B_1y+C_1=0\), \(A_2x+B_2y+C_2=0\), and x-axis \(y=0\) is \(\frac{1}{2} \left| \frac{C_1}{A_1} - \frac{C_2}{A_2} \right| \times \left| \frac{C_1C_2(A_1B_2 - A_2B_1)}{...} \right|\) - too complex.
- Step 13: Simpler: The two lines and x-axis form a triangle only if they have distinct x-intercepts. Since both have x-intercept 3, the problem is inconsistent as stated. The intended problem likely has different x-intercepts or refers to y-axis.
- Step 14: Assume the triangle is with y-axis. Then vertices: (0,0), (0,b), (0,-2) - these are collinear! No triangle.
- Step 15: The triangle must be formed by the two lines and one axis. For a triangle, the two lines must intersect at a point not on that axis. Their intersection is (3,0) which IS on x-axis. So they cannot form a triangle with x-axis. They can form a triangle with y-axis if their intersection is not on y-axis. But intersection is (3,0), not on y-axis. So triangle with y-axis: vertices (0,0), (0,b) [L1], (0,-2) [L2] - wait, (0,0), (0,b), (0,-2) are all on y-axis! Collinear.
- Step 16: The triangle vertices are: intersection of L1 & L2 = (3,0), intersection of L1 & y-axis = (0,b), intersection of L2 & y-axis = (0,-2). These three form a triangle! Area = \(\frac{1}{2} \times\) base \(\times\) height. Base on y-axis = \(|b - (-2)| = |b+2|\). Height = horizontal distance from intersection (3,0) to y-axis = 3. Area = \(\frac{1}{2} \times |b+2| \times 3 = 15\) → \(|b+2| = 10\) → \(b = 8\) or \(b = -12\).
- Step 17: For \(b=8\): L1: \(\frac{x}{3} + \frac{y}{8} = 1\). P = (3,0).
- Step 18: For \(b=-12\): L1: \(\frac{x}{3} - \frac{y}{12} = 1\). P = (3,0).
- Step 19: Both satisfy conditions. The triangle is formed by the two lines and the y-axis.

ANSWER: \(b = 8\) or \(b = -12\); Point P = (3, 0) in both cases. The triangle of area 15 is formed with the y-axis, not x-axis (problem statement likely has a typo).

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you're designing a rectangular garden plot in your backyard where two adjacent sides lie along the ______ walls (x-axis and y-axis).

## DIAGNOSTIC_ANSWER_7
boundary

**A wrong answer ("side" or "outer") reveals the student has swapped the walkthrough's adjective - two adjacent sides lie along the boundary walls, the x-axis and y-axis.** Boundary is the walkthrough's own adjective, and the adjective is what the blank grades. Recall the diagonal fence picture before filling, and give the adjective exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you're designing a ______ garden plot in your backyard where two adjacent sides lie along the boundary walls (x-axis and y-axis).

## DIAGNOSTIC_ANSWER_8
rectangular

**A wrong answer ("triangular" or "square") reveals the student has swapped the walkthrough's adjective - you are designing a rectangular garden plot in your backyard.** Rectangular is the walkthrough's own adjective, and the adjective is what the blank grades. Recall the two walls before filling, and give the adjective exactly.
