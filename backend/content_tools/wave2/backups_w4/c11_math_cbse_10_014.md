## ELI5
Standing at P(3, -4) with a road along 3x - 4y + 5 = 0, how far is the shortest walk to the tarmac? Along the perpendicular, and one formula delivers it: d = |Ax1 + By1 + C| / sqrt(A^2 + B^2). Here |9 + 16 + 5| / sqrt(9 + 16) = 30/5 = 6 units. The absolute value keeps distance non-negative; the denominator scales by the normal vector's length.

## DEFINITION
The perpendicular distance from a point \(P(x_1, y_1)\) to a line \(L: Ax + By + C = 0\) is the length of the segment drawn from \(P\) perpendicular to \(L\). It is given by the formula \(d = \frac{|Ax_1 + By_1 + C|}{\sqrt{A^2 + B^2}}\), where \(A, B, C\) are real constants with \(A\) and \(B\) not both zero.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can compute the perpendicular distance from any point to any line given in general form, convert other line forms (slope-intercept, intercept, normal) to general form before applying the formula, and solve problems involving shortest distance, parallel line distance, and locus conditions using this distance formula.

## SCOPE_BOUNDARY
Covers distance from a point to a line in the Cartesian plane using the general form \(Ax+By+C=0\). Includes conversion from other line forms to general form. Does NOT cover distance between parallel lines (next node), distance from point to line in 3D, or vector-based distance formulas.

## WALKTHROUGH
Imagine you are standing at a point \(P(3, -4)\) and there is a straight road represented by the line \(3x - 4y + 5 = 0\). You want to find the shortest distance from your position to the road to decide if you can hear the traffic. The shortest distance is always along the perpendicular. First, identify \(A=3, B=-4, C=5\) from the line equation and \(x_1=3, y_1=-4\) from the point. Substitute into the formula \(d = \frac{|3(3) + (-4)(-4) + 5|}{\sqrt{3^2 + (-4)^2}}\). Compute numerator: \(|9 + 16 + 5| = 30\). Denominator: \(\sqrt{9+16}=5\). Distance \(= 30/5 = 6\) units. The key insight is that the absolute value ensures distance is non-negative, and the denominator normalizes by the length of the normal vector \((A,B)\).

Takeaway: mastery means converting any line form to general form first, substituting the point without sign slips, and reading the shortest-distance geometry out of the formula. Exam moves: point-to-line distance questions and parallel-line or locus problems that reduce to it. Check yourself: the denominator never changes with the point - only the numerator does - a fast check on repeated computations. Students miss it because they forget the absolute value or mis-scale the denominator, when the definition builds the formula from the projection of the point onto the unit normal: the length of that projection is the distance, and the road-walk picture keeps it honest.

## DIAGNOSTIC_QUESTION_1
State the formula for the perpendicular distance from a point \((x_1, y_1)\) to the line \(Ax + By + C = 0\). What condition must \(A\) and \(B\) satisfy?

## DIAGNOSTIC_ANSWER_1
The formula is \(d = \frac{|Ax_1 + By_1 + C|}{\sqrt{A^2 + B^2}}\). \(A\) and \(B\) cannot both be zero because then the equation would not represent a line. If a student writes the formula without absolute value or forgets the square root in the denominator, they have a fundamental recall error and will get negative distances or dimensionally incorrect answers.

## DIAGNOSTIC_QUESTION_2
A student computes the distance from \(P(2, -1)\) to the line \(3x - 4y = 12\) as follows: \(d = \frac{|3(2) - 4(-1) - 12|}{\sqrt{3^2 + (-4)^2}} = \frac{|6 + 4 - 12|}{5} = \frac{2}{5}\). Is this correct? Explain why or why not.

## DIAGNOSTIC_ANSWER_2
The student's working is correct. The line \(3x - 4y = 12\) is rewritten as \(3x - 4y - 12 = 0\), so \(C = -12\). Substitution yields numerator \(|6 + 4 - 12| = 2\), denominator \(5\), giving \(d = 0.4\). If a student instead uses \(C = 12\) (forgetting to move constant to LHS), they would get \(|6+4+12|/5 = 22/5 = 4.4\), which is wrong. This tests understanding that the formula requires the line in the form \(Ax+By+C=0\) with \(C\) on the left side.

## DIAGNOSTIC_QUESTION_3
Find the perpendicular distance from the point \((-3, 2)\) to the line \(4x + 3y - 10 = 0\). Show all steps.

## DIAGNOSTIC_ANSWER_3
Step 1: Identify \(A=4, B=3, C=-10\), \(x_1=-3, y_1=2\). Step 2: Substitute: \(d = \frac{|4(-3) + 3(2) - 10|}{\sqrt{4^2+3^2}}\). Step 3: Numerator: \(|-12 + 6 - 10| = |-16| = 16\). Step 4: Denominator: \(\sqrt{16+9}=5\). Step 5: \(d = 16/5 = 3.2\) units. A common error is sign mistakes in the numerator: e.g., computing \(4(-3) + 3(2) + 10 = -12+6+10=4\) (using \(C=+10\) instead of \(-10\)), giving \(d=0.8\). This reveals the student does not correctly identify \(C\) from the general form.

## DIAGNOSTIC_QUESTION_4
The line \(L\) is given in slope-intercept form as \(y = 2x + 3\). A student directly substitutes \(A=2, B=1, C=3\) into the distance formula for point \((1,1)\). Why is this incorrect? What should the correct \(A, B, C\) be?

## DIAGNOSTIC_ANSWER_4
The formula requires the line in the form \(Ax+By+C=0\). The given line \(y=2x+3\) must be rearranged to \(2x - y + 3 = 0\) (or \(-2x + y - 3 = 0\)). Thus \(A=2, B=-1, C=3\) (or \(A=-2, B=1, C=-3\)). The student incorrectly took coefficients from the slope-intercept form without converting. This tests analytical understanding that the formula is derived for the general form, and the normal vector is \((A,B)\) from that form.

## DIAGNOSTIC_QUESTION_5
A student claims that the distance from point \(P(0,0)\) to the line \(x + y + 1 = 0\) is \(\frac{1}{\sqrt{2}}\), but to the line \(2x + 2y + 2 = 0\) is \(\frac{2}{\sqrt{8}} = \frac{1}{\sqrt{2}}\). They argue that since the second line is just the first multiplied by 2, the distance should be the same. Evaluate this reasoning.

## DIAGNOSTIC_ANSWER_5
The reasoning is correct. The distance formula uses \(A,B,C\) from the given equation, but if the entire equation is multiplied by a non-zero constant \(k\), the numerator becomes \(|k(Ax_1+By_1+C)| = |k| \cdot |Ax_1+By_1+C|\) and the denominator becomes \(\sqrt{(kA)^2+(kB)^2} = |k|\sqrt{A^2+B^2}\). The factor \(|k|\) cancels, yielding the same distance. This shows the distance is a geometric property independent of the scaling of the equation. If a student says the distances are different because the coefficients changed, they fail to see the homogeneity of the formula.

## DIAGNOSTIC_QUESTION_6
Create a real-world problem (Indian context) where finding the distance from a point to a line is necessary. Define the coordinates, line equation, and ask for the distance. Then solve it.

## DIAGNOSTIC_ANSWER_6
Example: A water pipeline runs along the line \(2x - y + 4 = 0\). A village centre is at \(P(1, 5)\). Find the shortest length of pipe needed to connect the village to the pipeline. Solution: \(A=2, B=-1, C=4\), \(x_1=1, y_1=5\). \(d = \frac{|2(1) -1(5) + 4|}{\sqrt{4+1}} = \frac{|2-5+4|}{\sqrt{5}} = \frac{1}{\sqrt{5}} \approx 0.447\) km (if units are km). A good answer includes correct setup, unit interpretation, and the realization that the perpendicular gives the minimal pipe length. A poor answer might use horizontal/vertical distance instead of perpendicular, showing misunderstanding of "shortest distance".

## COMMON_MISCONCEPTION
Students often forget to convert the line equation to the general form \(Ax+By+C=0\) before identifying \(A, B, C\). For example, given \(y = 3x - 2\), they use \(A=3, B=1, C=-2\) instead of rewriting as \(3x - y - 2 = 0\) giving \(A=3, B=-1, C=-2\). Another frequent error is dropping the absolute value in the numerator, leading to negative distances. A third error is using the distance formula for two points \(\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}\) by incorrectly finding a "point on the line" without ensuring it is the foot of the perpendicular.

## ON_FAILURE
If a student makes the conversion error, guide them through a two-step process: (1) Write the line equation with all terms on LHS and zero on RHS. (2) Identify \(A, B, C\) as the coefficients of \(x, y,\) and the constant term respectively. Practice with multiple forms: slope-intercept, intercept form, normal form. For absolute value errors, emphasize that distance is a length and cannot be negative; show a case where \(Ax_1+By_1+C\) is negative and ask what the distance should be. For the foot-of-perpendicular confusion, derive the distance formula from the area of a triangle or projection to reinforce why the formula works without finding the foot.

## PREREQUISITE_NODE_IDS
c11_math_cbse_10_001, c11_math_cbse_10_002, c11_math_cbse_10_006, c11_math_cbse_10_009, c11_math_cbse_10_010, c11_math_cbse_10_011, c11_math_cbse_10_012, c11_math_cbse_10_013, c9_math_ch1_4, c10_math_cbse_07_001, c11_math_cbse_10_005, c11_math_cbse_10_007, c11_math_cbse_10_008

## PREREQUISITE_REASONS
c11_math_cbse_10_001: Understanding coordinates of a point is essential to identify \((x_1,y_1)\).
c11_math_cbse_10_002: Distance formula between two points underpins the derivation of point-to-line distance.
c11_math_cbse_10_006: Slope concept helps in understanding perpendicular lines (product of slopes = -1) used in geometric derivation.
c11_math_cbse_10_009: Point-slope form conversion to general form is a common prerequisite step.
c11_math_cbse_10_010: Two-point form conversion to general form is needed for lines given by two points.
c11_math_cbse_10_011: Slope-intercept form must be converted to general form before using the formula.
c11_math_cbse_10_012: Intercept form conversion to general form is another common starting point.
c11_math_cbse_10_013: Normal form directly gives the distance from origin, but general form is needed for arbitrary points.
c9_math_ch1_4: Derivation of distance formula using Pythagoras theorem is the geometric basis.
c10_math_cbse_07_001: Reinforces distance formula and its algebraic manipulation.
c11_math_cbse_10_005: Distance from point to line is height; area = ½ × base × height connects to coordinate formula.  
c11_math_cbse_10_007: distance from point to line uses perpendicular distance; relies on perpendicular slope.  
c11_math_cbse_10_008: Distance of point from line uses perpendicular distance; angle formula confirms perpendicularity (90°).  

## FORWARD_NODE_IDS
c11_math_cbse_10_015, c11_math_cbse_10_016, c12_math_cbse_11_008

## FORWARD_REASONS
c11_math_cbse_10_015: Distance between parallel lines is computed as the distance from any point on one line to the other line, directly applying this node's formula.
c11_math_cbse_10_016: Locus problems often involve constant distance from a point to a line (parabola definition) or sum/difference of distances, requiring this distance formula.
c12_math_cbse_11_008: The 2D distance from a point to a line is the planar analogue that builds intuition for the 3D case.  

## CROSS_SUBJECT_PREREQS
c9_math_ch1_4, c10_math_cbse_07_001
## CROSS_SUBJECT_REASONS
c9_math_ch1_4: The distance formula derivation using Pythagoras theorem is fundamental to coordinate geometry used in physics (e.g., displacement).
c10_math_cbse_07_001: Applications of distance formula in coordinate geometry are used in physics for finding shortest distance from a particle to a path (line).

## CHAIN_DESCRIPTION
c9_math_ch1_4 -> c11_math_cbse_10_014 -> c11_math_cbse_10_015

## THIS_FORMULA
\(d = \frac{|Ax_1 + By_1 + C|}{\sqrt{A^2 + B^2}}\)

## FORMULA_VARIABLES
\(d\) = perpendicular distance (positive scalar), \(A, B, C\) = coefficients of the line in general form \(Ax + By + C = 0\) (with \(A, B\) not both zero), \(x_1, y_1\) = coordinates of the point.

## FORMULA_UNITS
Distance units (e.g., cm, m, km) same as coordinate units. Dimensionless if coordinates are pure numbers.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch4_1 | The shortest distance from a point to a line is used in physics to find the perpendicular distance from a particle to a line of motion or force.
c11_economics_ch2_3 | In linear programming (though not in Class 11), the distance from a point to a constraint line measures feasibility margin.

## PREREQ_CONCEPT
Conversion of line equations to the general form \(Ax+By+C=0\) and the distance formula between two points.

## PREREQ_BEFORE
The student must be able to rewrite any linear equation (slope-intercept, point-slope, intercept, normal) into the general form \(Ax+By+C=0\) and correctly identify \(A, B, C\).

## PREREQ_STUCK
Review the conversion between different forms of a line (nodes c11_math_cbse_10_009 to c11_math_cbse_10_013) and practice identifying \(A, B, C\) from each.

## WORKED_EXAMPLE_1
PROBLEM: A straight road passes through points \(A(1, 2)\) and \(B(4, 6)\). A school is located at \(P(-2, 3)\). Find the shortest distance from the school to the road.
STEPS:
- Step 1: Find the equation of the line (road) through A and B. Slope \(m = \frac{6-2}{4-1} = \frac{4}{3}\). Using point-slope form: \(y - 2 = \frac{4}{3}(x - 1)\).
- Step 2: Convert to general form \(Ax+By+C=0\). Multiply by 3: \(3y - 6 = 4x - 4\) → \(4x - 3y + 2 = 0\). So \(A=4, B=-3, C=2\).
- Step 3: Identify point coordinates: \(x_1 = -2, y_1 = 3\).
- Step 4: Apply distance formula: \(d = \frac{|4(-2) + (-3)(3) + 2|}{\sqrt{4^2 + (-3)^2}} = \frac{|-8 -9 + 2|}{\sqrt{16+9}} = \frac{|-15|}{5} = 3\).
- Step 5: Interpret: The shortest distance from the school to the road is 3 units (e.g., km).
REASONING: The shortest distance from a point to a line is the perpendicular distance. We first derive the line equation from given points, convert to general form to extract coefficients, then apply the formula. The absolute value ensures a positive distance.
ANSWER: 3 units

## WORKED_EXAMPLE_2
PROBLEM: Find the distance from the point \(P(2, -5)\) to the line given in intercept form as \(\frac{x}{4} + \frac{y}{-3} = 1\).
STEPS:
- Step 1: Convert intercept form to general form. Multiply by 12 (LCM of 4 and 3): \(3x - 4y = 12\).
- Step 2: Rearrange to \(Ax+By+C=0\): \(3x - 4y - 12 = 0\). Thus \(A=3, B=-4, C=-12\).
- Step 3: Point coordinates: \(x_1=2, y_1=-5\).
- Step 4: Substitute into formula: \(d = \frac{|3(2) + (-4)(-5) - 12|}{\sqrt{3^2 + (-4)^2}} = \frac{|6 + 20 - 12|}{\sqrt{9+16}} = \frac{14}{5} = 2.8\).
- Step 5: Verify: The line has x-intercept 4, y-intercept -3. The point (2,-5) is below the line. Distance is positive 2.8 units.
REASONING: The intercept form must be converted to general form before using the distance formula. The LCM step clears denominators efficiently. The formula works for any line orientation.
ANSWER: 2.8 units

## WORKED_EXAMPLE_3
PROBLEM: A point \(P(h, k)\) moves such that its perpendicular distance from the line \(3x - 4y + 5 = 0\) is always 2 units. Find the equation of the locus of \(P\).
STEPS:
- Step 1: The distance from \(P(h,k)\) to the line is given by \(d = \frac{|3h - 4k + 5|}{\sqrt{3^2+(-4)^2}} = \frac{|3h - 4k + 5|}{5}\).
- Step 2: Set this equal to the constant distance 2: \(\frac{|3h - 4k + 5|}{5} = 2\).
- Step 3: Remove absolute value: \(|3h - 4k + 5| = 10\). This gives two equations: \(3h - 4k + 5 = 10\) or \(3h - 4k + 5 = -10\).
- Step 4: Simplify each: \(3h - 4k - 5 = 0\) and \(3h - 4k + 15 = 0\).
- Step 5: Replace \(h,k\) with \(x,y\) for locus: \(3x - 4y - 5 = 0\) and \(3x - 4y + 15 = 0\).
- Step 6: Interpret: The locus consists of two lines parallel to the given line, at a distance 2 on either side.
REASONING: The locus of points at a fixed distance from a given line is a pair of parallel lines. The absolute value in the distance formula naturally leads to two linear equations. This combines the distance formula with locus concept (next node).
ANSWER: \(3x - 4y - 5 = 0\) and \(3x - 4y + 15 = 0\)

## COMPETENCY_QUESTION_1
QUESTION: A triangular park has vertices at \(A(0,0)\), \(B(6,0)\), and \(C(0,8)\). A water fountain is to be placed at the point inside the park that is equidistant from all three sides. (a) Explain why this point is the incenter of the triangle. (b) Find the distance from this incenter to side AB (the x-axis). (c) Hence find the coordinates of the incenter without using the angle bisector formula, using only the distance from a point to a line formula.
COMPETENCY: Translating real-world situations to mathematical expressions and solving using geometric properties.
STEPS:
- Step 1: Recognize that the point equidistant from all three sides is the incenter. The distance to each side is the inradius \(r\).
- Step 2: Side AB is the x-axis (\(y=0\)). The distance from incenter \((x,y)\) to AB is \(|y|\). Since incenter is inside the triangle (first quadrant), distance = \(y\). So inradius \(r = y\).
- Step 3: Side AC is the y-axis (\(x=0\)). Distance = \(x = r\).
- Step 4: Side BC: line through (6,0) and (0,8) is \(4x+3y-24=0\). Distance from \((r,r)\) to BC is \(\frac{|4r+3r-24|}{5} = \frac{|7r-24|}{5}\). Set equal to \(r\).
- Step 5: Solve \(\frac{|7r-24|}{5} = r\). Since incenter is inside, \(7r-24\) is negative (check: if r=3, 21-24=-3). So \(\frac{24-7r}{5} = r\) → \(24-7r = 5r\) → \(12r = 24\) → \(r=2\).
- Step 6: Incenter coordinates are \((r,r) = (2,2)\). Distance to AB is 2 units.
ANSWER: (a) Incenter is equidistant from sides. (b) Distance = 2 units. (c) Incenter = (2,2).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Two lines \(L_1: 3x - 4y + 7 = 0\) and \(L_2: 3x - 4y - 13 = 0\) are parallel. A point \(P\) moves such that the sum of its perpendicular distances to \(L_1\) and \(L_2\) is always 10 units. (a) Show that the locus of \(P\) is the region between two lines parallel to \(L_1\) and \(L_2\). (b) Find the equations of these two boundary lines. (c) What is the distance between these two boundary lines?
COMPETENCY: Analyzing and synthesizing multiple concepts (distance formula, parallel lines, locus, absolute value equations).
STEPS:
- Step 1: Let \(P(x,y)\). Distance to \(L_1\): \(d_1 = \frac{|3x-4y+7|}{5}\). Distance to \(L_2\): \(d_2 = \frac{|3x-4y-13|}{5}\).
- Step 2: Given \(d_1 + d_2 = 10\) → \(|3x-4y+7| + |3x-4y-13| = 50\).
- Step 3: Let \(u = 3x-4y\). The expression becomes \(|u+7| + |u-13| = 50\). This is the sum of distances from \(u\) to -7 and 13 on the number line.
- Step 4: The sum of distances from a point to two fixed points is constant. For points between -7 and 13, the sum is constant 20. For points outside, the sum increases linearly. We need sum = 50 > 20, so \(u\) lies outside the interval \([-7, 13]\).
- Step 5: Case 1: \(u \le -7\). Then \(-(u+7) - (u-13) = 50\) → \(-2u + 6 = 50\) → \(-2u = 44\) → \(u = -22\). So \(3x-4y = -22\) → \(3x-4y+22=0\).
- Step 6: Case 2: \(u \ge 13\). Then \((u+7) + (u-13) = 50\) → \(2u - 6 = 50\) → \(2u = 56\) → \(u = 28\). So \(3x-4y = 28\) → \(3x-4y-28=0\).
- Step 7: The locus is the two lines \(3x-4y+22=0\) and \(3x-4y-28=0\). Distance between them = \(\frac{|22 - (-28)|}{5} = \frac{50}{5} = 10\) units.
ANSWER: (a) The locus is two lines parallel to given lines. (b) \(3x-4y+22=0\) and \(3x-4y-28=0\). (c) Distance = 10 units.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: You want to find the ______ distance from your position to the road to decide if you can hear the traffic.

## DIAGNOSTIC_ANSWER_7
shortest

**A wrong answer ("perpendicular" or "straight") reveals the student has swapped the walkthrough's adjective - you want the shortest distance from your position to the road.** Shortest is the walkthrough's own adjective, and the adjective is what the blank grades. Recall that the shortest path runs along the perpendicular before filling, and give the adjective exactly.

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
The student can compute the perpendicular distance from any point to any line given in general form, convert other line forms (slope-intercept, intercept, normal) to general form before applying the formula, and solve problems involving shortest distance, parallel line distance, and locus conditions using this distance formula.
