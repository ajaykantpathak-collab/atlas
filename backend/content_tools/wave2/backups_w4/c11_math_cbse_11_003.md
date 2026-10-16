## ELI5
The architect hands you x^2 + y^2 - 6x + 8y - 11 = 0 for the garden boundary - no centre, no radius in sight. Complete the square: (x - 3)^2 + (y + 4)^2 = 36, so the fountain goes at (3, -4) and the fence at radius 6. In the general form x^2 + y^2 + 2gx + 2fy + c = 0, the centre hides at (-g, -f) with radius sqrt(g^2 + f^2 - c) - real, a point, or imaginary as that expression decides.

## DEFINITION
The general equation of a circle is a second-degree equation in two variables of the form \(x^2 + y^2 + 2gx + 2fy + c = 0\), where \(g\), \(f\), and \(c\) are real constants. It represents a circle with centre \((-g, -f)\) and radius \(\sqrt{g^2 + f^2 - c}\), provided \(g^2 + f^2 - c > 0\). If \(g^2 + f^2 - c = 0\), it represents a point circle; if \(g^2 + f^2 - c < 0\), it represents an imaginary circle with no real locus.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can convert between the standard form \((x-h)^2 + (y-k)^2 = r^2\) and the general form \(x^2 + y^2 + 2gx + 2fy + c = 0\), identify the centre and radius from the general equation, and determine the nature of the circle (real, point, or imaginary) based on the sign of \(g^2 + f^2 - c\). They can also derive the general equation when given geometric conditions such as three non-collinear points, endpoints of a diameter, or tangency conditions.

## SCOPE_BOUNDARY
This node covers the general equation of a circle, its centre-radius extraction, conditions for real/point/imaginary circles, and finding the equation from given conditions (three points, diameter endpoints, centre and radius, centre and a point on the circle). It does NOT cover the general second-degree equation representing a pair of lines, conic sections other than circles, or the family of circles (which is a separate advanced topic).

## WALKTHROUGH
Imagine you are designing a circular garden in your school courtyard. The architect gives you the equation \(x^2 + y^2 - 6x + 8y - 11 = 0\) for the boundary. You need to find the centre to place a fountain and the radius to buy fencing material. Start by recalling the standard form \((x-h)^2 + (y-k)^2 = r^2\) from the previous node. Notice the general equation has \(x^2\) and \(y^2\) with coefficient 1 and no \(xy\) term. Group the \(x\) and \(y\) terms: \((x^2 - 6x) + (y^2 + 8y) = 11\). Complete the square for \(x\) by adding \((\frac{-6}{2})^2 = 9\) and for \(y\) by adding \((\frac{8}{2})^2 = 16\) to both sides. This yields \((x-3)^2 + (y+4)^2 = 36\). The centre is \((3, -4)\) and radius is \(6\) metres. The key insight: the general form hides the centre and radius inside the coefficients of \(x\) and \(y\); completing the square reveals them.

Takeaway: mastery means converting between standard and general form both ways, reading centre (-g, -f) and radius from the coefficients, and classifying the circle as real, point or imaginary from the sign of g^2 + f^2 - c. Exam moves: find-the-centre-and-radius questions and find-the-equation items from three points, a diameter, or tangency conditions. Check yourself: the centre is the negative of the coefficient halves - reading (g, f) directly is the flagged slip. Students miss it because they read signs as given, when the general form stores the data negated: completing the square is the honest decoder, and the fountain placement proves it.

## DIAGNOSTIC_QUESTION_1
Write the general equation of a circle with centre \((-2, 5)\) and radius \(3\). Identify the values of \(g\), \(f\), and \(c\).

## DIAGNOSTIC_ANSWER_1
The standard form is \((x+2)^2 + (y-5)^2 = 9\). Expanding: \(x^2 + 4x + 4 + y^2 - 10y + 25 = 9\) → \(x^2 + y^2 + 4x - 10y + 20 = 0\). Comparing with \(x^2 + y^2 + 2gx + 2fy + c = 0\), we get \(2g = 4 \Rightarrow g = 2\), \(2f = -10 \Rightarrow f = -5\), \(c = 20\). A wrong answer (e.g., \(g = -2, f = 5\)) reveals the student confuses the sign convention: the centre is \((-g, -f)\), so the signs of \(g\) and \(f\) are opposite to the centre coordinates.

## DIAGNOSTIC_QUESTION_2
The equation \(x^2 + y^2 - 4x + 6y + 13 = 0\) represents a circle. Determine whether it is a real circle, a point circle, or an imaginary circle. Justify your answer without finding the centre and radius explicitly.

## DIAGNOSTIC_ANSWER_2
Here \(g = -2\), \(f = 3\), \(c = 13\). Compute \(g^2 + f^2 - c = (-2)^2 + 3^2 - 13 = 4 + 9 - 13 = 0\). Since the value is zero, the radius is zero, so it is a point circle (a single point at \((2, -3)\)). A wrong answer (e.g., claiming it is a real circle with positive radius) reveals the student does not know the condition \(g^2 + f^2 - c > 0\) for a real circle, or they incorrectly compute \(g^2 + f^2 + c\) instead of minus \(c\).

## DIAGNOSTIC_QUESTION_3
Find the equation of the circle passing through the points \((1, 1)\), \((2, -1)\), and \((3, 2)\).

## DIAGNOSTIC_ANSWER_3
Let the general equation be \(x^2 + y^2 + 2gx + 2fy + c = 0\). Substitute the three points:
(1) \(1 + 1 + 2g + 2f + c = 0 \Rightarrow 2g + 2f + c = -2\)
(2) \(4 + 1 + 4g - 2f + c = 0 \Rightarrow 4g - 2f + c = -5\)
(3) \(9 + 4 + 6g + 4f + c = 0 \Rightarrow 6g + 4f + c = -13\)
Subtract (1) from (2): \(2g - 4f = -3\) → (A)
Subtract (2) from (3): \(2g + 6f = -8\) → (B)
Subtract (A) from (B): \(10f = -5 \Rightarrow f = -\frac{1}{2}\).
Substitute in (A): \(2g - 4(-\frac{1}{2}) = -3 \Rightarrow 2g + 2 = -3 \Rightarrow g = -\frac{5}{2}\).
Substitute in (1): \(2(-\frac{5}{2}) + 2(-\frac{1}{2}) + c = -2 \Rightarrow -5 -1 + c = -2 \Rightarrow c = 4\).
Equation: \(x^2 + y^2 - 5x - y + 4 = 0\). A wrong answer often arises from sign errors when substituting negative coordinates or solving the linear system incorrectly.

## DIAGNOSTIC_QUESTION_4
A circle has the equation \(x^2 + y^2 + 2gx + 2fy + c = 0\). If the circle passes through the origin, what is the value of \(c\)? If the circle also touches the x-axis, what is the relationship between \(g\) and \(f\)?

## DIAGNOSTIC_ANSWER_4
Passing through origin \((0,0)\) gives \(0 + 0 + 0 + 0 + c = 0 \Rightarrow c = 0\).
Touching the x-axis means the perpendicular distance from centre \((-g, -f)\) to the x-axis equals the radius. Distance = \(|-f| = |f|\). Radius = \(\sqrt{g^2 + f^2 - c} = \sqrt{g^2 + f^2}\). Equating: \(|f| = \sqrt{g^2 + f^2}\). Squaring: \(f^2 = g^2 + f^2 \Rightarrow g^2 = 0 \Rightarrow g = 0\).
A wrong answer (e.g., \(c = 0\) but \(f = 0\) for touching x-axis) reveals confusion between touching x-axis (centre's y-coordinate equals radius) and touching y-axis (centre's x-coordinate equals radius).

## DIAGNOSTIC_QUESTION_5
A student claims that the equation \(x^2 + y^2 + 4x - 6y + 14 = 0\) represents a circle with centre \((-2, 3)\) and radius \(\sqrt{14}\). Evaluate this claim and correct any errors.

## DIAGNOSTIC_ANSWER_5
The centre is correctly identified as \((-g, -f) = (-2, 3)\). However, radius = \(\sqrt{g^2 + f^2 - c} = \sqrt{(-2)^2 + 3^2 - 14} = \sqrt{4 + 9 - 14} = \sqrt{-1}\), which is imaginary. The student forgot to subtract \(c\) and instead used \(\sqrt{g^2 + f^2 + c}\) or simply \(\sqrt{c}\). The equation actually represents an imaginary circle (no real points satisfy it). A wrong evaluation (accepting the radius as \(\sqrt{14}\)) shows the student does not check the condition \(g^2 + f^2 - c > 0\) before stating the radius.

## DIAGNOSTIC_QUESTION_6
Create a real-world problem (Indian context) that requires finding the general equation of a circle given three non-collinear points. Provide the three points and ask for the equation. Ensure the numbers are chosen so that the resulting coefficients are integers.

## DIAGNOSTIC_ANSWER_6
Problem: A circular water tank is to be built in a village such that its boundary passes through three landmarks: a well at \((2, 3)\), a temple at \((4, 5)\), and a school at \((6, 3)\). Find the general equation of the boundary.
Solution: The three points are non-collinear (they form an isosceles triangle). Solving the system yields \(g = -4, f = -1, c = 3\). Equation: \(x^2 + y^2 - 8x - 2y + 3 = 0\). A poor answer would use collinear points (no unique circle) or points leading to non-integer coefficients without simplifying, showing lack of understanding of the condition for a unique circle and algebraic manipulation.

## COMMON_MISCONCEPTION
Students often write the centre as \((g, f)\) instead of \((-g, -f)\) because they directly read the coefficients of \(x\) and \(y\) from \(x^2 + y^2 + 2gx + 2fy + c = 0\). For example, for \(x^2 + y^2 - 6x + 8y - 11 = 0\), they say centre is \((-6, 8)\) instead of \((3, -4)\). They also forget that the coefficients of \(x^2\) and \(y^2\) must be equal (and non-zero) for a circle; if given \(2x^2 + 2y^2 + 4x - 6y + 1 = 0\), they might not divide by 2 first, leading to incorrect \(g\) and \(f\) values. Another frequent error: when completing the square, they add the square term only to the left side, forgetting to balance the equation by adding it to the right side.

## ON_FAILURE
If the student writes centre as \((g, f)\), ask them to expand \((x - h)^2 + (y - k)^2 = r^2\) to get \(x^2 + y^2 - 2hx - 2ky + (h^2 + k^2 - r^2) = 0\). Compare with \(x^2 + y^2 + 2gx + 2fy + c = 0\) to see that \(2g = -2h \Rightarrow h = -g\). Emphasise: "The sign flips because the standard form has \(-2hx\) while the general form has \(+2gx\)." For the coefficient issue, give an equation like \(3x^2 + 3y^2 - 12x + 18y - 9 = 0\) and ask them to find the centre. Guide them: "Step 1: Divide the entire equation by 3 to make coefficients of \(x^2\) and \(y^2\) equal to 1. Then identify \(g\) and \(f\)." For completing the square, use a colour-coded step: write \((x^2 + 2gx + g^2) + (y^2 + 2fy + f^2) = -c + g^2 + f^2\) and stress that \(g^2\) and \(f^2\) are added to both sides.

## PREREQUISITE_NODE_IDS
c11_math_cbse_11_002, c9_math_ch1_4, c9_math_ch4_1, c9_math_ch4_8, c10_math_cbse_07_001, c11_math_cbse_10_016

## PREREQUISITE_REASONS
c11_math_cbse_11_002: Standard equation of a circle \((x-h)^2 + (y-k)^2 = r^2\) is the starting point to derive the general form by expansion.
c9_math_ch1_4: Distance formula is used to derive the standard equation and to understand the radius as a distance.
c9_math_ch4_1: Algebraic identities \((a+b)^2\) and \((a-b)^2\) are essential for completing the square.
c9_math_ch4_8: Factorisation of quadratic expressions helps in recognising perfect square trinomials when completing the square.
c10_math_cbse_07_001: Distance formula in coordinate geometry (Class 10) reinforces the concept of distance between centre and any point on the circle.
c11_math_cbse_10_016: Ellipse as locus with constant sum of distances from two foci.  

## FORWARD_NODE_IDS
c11_math_cbse_11_004, c11_math_cbse_11_010
## FORWARD_REASONS
c11_math_cbse_11_004: Understanding the general second-degree equation for a circle (no \(xy\) term, equal \(x^2\) and \(y^2\) coefficients) sets the foundation for recognising the general equation of a parabola and other conics.
c11_math_cbse_11_010: Applications of conic sections often require modelling real-world situations using the general equation of a circle (e.g., circular motion, design of gears, satellite orbits).

## CROSS_SUBJECT_PREREQS
c9_math_ch1_4, c9_math_ch4_1
## CROSS_SUBJECT_REASONS
c9_math_ch1_4: Distance formula is the geometric basis for the definition of a circle (locus of points equidistant from a fixed point).
c9_math_ch4_1: Algebraic identities \((a \pm b)^2\) are the algebraic tool used to convert between standard and general forms by completing the square.

## CHAIN_DESCRIPTION
c9_math_ch1_4 -> c11_math_cbse_11_002 -> c11_math_cbse_11_003 -> c11_math_cbse_11_004

## THIS_FORMULA
General equation: \(x^2 + y^2 + 2gx + 2fy + c = 0\); Centre: \((-g, -f)\); Radius: \(r = \sqrt{g^2 + f^2 - c}\) (real circle if \(g^2 + f^2 - c > 0\), point circle if \(= 0\), imaginary if \(< 0\))

## FORMULA_VARIABLES
\(g, f, c\) are real constants; \(g\) and \(f\) determine the centre \((-g, -f)\); \(c\) along with \(g\) and \(f\) determines the radius; \(x, y\) are variables representing coordinates of any point on the circle.

## FORMULA_UNITS
Dimensionless (coordinates are in units of length, e.g., metres, cm; radius in same units; \(c\) in square units).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c9_math_ch1_4 | Distance formula derivation uses Pythagoras theorem, which is the geometric root of the circle equation (distance from centre to point = radius).
c9_math_ch4_1 | Algebraic identities \((a+b)^2 = a^2 + 2ab + b^2\) and \((a-b)^2 = a^2 - 2ab + b^2\) are directly used to complete the square when converting general form to standard form.

## PREREQ_CONCEPT
Completing the square for quadratic expressions in two variables and the distance formula in coordinate geometry.

## PREREQ_BEFORE
The student must be able to expand \((x-h)^2 + (y-k)^2 = r^2\) and identify the resulting coefficients, and must be fluent in solving a system of three linear equations in three variables.

## PREREQ_STUCK
If stuck, revisit completing the square for expressions like \(x^2 + 2gx\) (add \(g^2\) to make \((x+g)^2\)) and solving linear systems using elimination or substitution (Class 10 Chapter 3).

## WORKED_EXAMPLE_1
PROBLEM: A circular racing track is designed such that its boundary follows the equation \(x^2 + y^2 - 10x + 4y - 20 = 0\) where coordinates are in kilometres. Find the centre and radius of the track. If a pit stop is to be built at the centre, what are its coordinates?
STEPS:
- Step 1: Identify the coefficients by comparing with the general form \(x^2 + y^2 + 2gx + 2fy + c = 0\). Here \(2g = -10 \Rightarrow g = -5\), \(2f = 4 \Rightarrow f = 2\), \(c = -20\).
- Step 2: Write the centre using \((-g, -f)\). Centre = \((-(-5), -2) = (5, -2)\) km.
- Step 3: Compute \(g^2 + f^2 - c = (-5)^2 + (2)^2 - (-20) = 25 + 4 + 20 = 49\).
- Step 4: Since \(49 > 0\), it is a real circle. Radius \(r = \sqrt{49} = 7\) km.
- Step 5: The pit stop at the centre is at \((5, -2)\) km. Interpret: the track is a circle of radius 7 km centred 5 km east and 2 km south of the origin.
REASONING: The general form directly gives \(g\) and \(f\) from the coefficients of \(x\) and \(y\). The centre is the negative of these because the expanded standard form has \(-2hx\) and \(-2ky\). The radius formula comes from rearranging the expanded standard form: \(h^2 + k^2 - r^2 = c\) and substituting \(h = -g, k = -f\).
ANSWER: Centre = (5, -2) km, Radius = 7 km, Pit stop coordinates = (5, -2) km.

## WORKED_EXAMPLE_2
PROBLEM: Find the general equation of the circle which has the line segment joining \(A(2, -3)\) and \(B(-2, 5)\) as a diameter.
STEPS:
- Step 1: The centre of the circle is the midpoint of the diameter. Midpoint of \(A(2, -3)\) and \(B(-2, 5)\) is \(\left(\frac{2+(-2)}{2}, \frac{-3+5}{2}\right) = (0, 1)\).
- Step 2: The radius is half the length of the diameter. Length \(AB = \sqrt{(-2-2)^2 + (5-(-3))^2} = \sqrt{(-4)^2 + 8^2} = \sqrt{16+64} = \sqrt{80} = 4\sqrt{5}\). Radius \(r = 2\sqrt{5}\).
- Step 3: Write the standard equation: \((x-0)^2 + (y-1)^2 = (2\sqrt{5})^2 \Rightarrow x^2 + (y-1)^2 = 20\).
- Step 4: Expand to general form: \(x^2 + y^2 - 2y + 1 = 20 \Rightarrow x^2 + y^2 - 2y - 19 = 0\).
- Step 5: Verify by checking that \(A\) and \(B\) satisfy the equation: For \(A(2, -3)\): \(4 + 9 + 6 - 19 = 0\). For \(B(-2, 5)\): \(4 + 25 - 10 - 19 = 0\). Both satisfy.
REASONING: The endpoints of a diameter give the centre as their midpoint and the radius as half the distance between them. This is a direct application of the geometric property that the angle in a semicircle is a right angle, but here we use the simpler midpoint and distance formulas.
ANSWER: \(x^2 + y^2 - 2y - 19 = 0\)

## WORKED_EXAMPLE_3
PROBLEM: Find the equation of the circle passing through the points \((1, 2)\), \((3, -4)\), and \((5, -6)\). Determine whether the circle is real, point, or imaginary.
STEPS:
- Step 1: Let the general equation be \(x^2 + y^2 + 2gx + 2fy + c = 0\). Substitute the three points to get three equations:
  (i) \(1 + 4 + 2g + 4f + c = 0 \Rightarrow 2g + 4f + c = -5\)
  (ii) \(9 + 16 + 6g - 8f + c = 0 \Rightarrow 6g - 8f + c = -25\)
  (iii) \(25 + 36 + 10g - 12f + c = 0 \Rightarrow 10g - 12f + c = -61\)
- Step 2: Subtract (i) from (ii): \(4g - 12f = -20 \Rightarrow g - 3f = -5\)  (A)
  Subtract (ii) from (iii): \(4g - 4f = -36 \Rightarrow g - f = -9\)  (B)
- Step 3: Subtract (A) from (B): \((g - f) - (g - 3f) = -9 - (-5) \Rightarrow 2f = -4 \Rightarrow f = -2\).
  Substitute \(f = -2\) in (B): \(g - (-2) = -9 \Rightarrow g = -11\).
- Step 4: Substitute \(g = -11, f = -2\) in (i): \(2(-11) + 4(-2) + c = -5 \Rightarrow -22 - 8 + c = -5 \Rightarrow c = 25\).
- Step 5: Equation: \(x^2 + y^2 - 22x - 4y + 25 = 0\). Centre = \((11, 2)\).
- Step 6: Check nature: \(g^2 + f^2 - c = 121 + 4 - 25 = 100 > 0\). Real circle with radius \(10\).
REASONING: Three non-collinear points uniquely determine a circle. Substituting them into the general form gives a linear system in \(g, f, c\). Solving it yields the specific circle. The nature is determined by the sign of \(g^2 + f^2 - c\).
ANSWER: \(x^2 + y^2 - 22x - 4y + 25 = 0\); Real circle, centre \((11, 2)\), radius \(10\).

## COMPETENCY_QUESTION_1
QUESTION: A circular garden is to be fenced. The boundary passes through three trees located at coordinates \(A(2, 3)\), \(B(4, 1)\), and \(C(6, 5)\) (in metres). (a) Find the general equation of the boundary. (b) Find the length of fencing required (use \(\pi = \frac{22}{7}\)). (c) A sprinkler is placed at the centre. If it waters up to a radius of 5 m, will it cover the entire garden? Justify.
COMPETENCY: Translating real-world situations to mathematical expressions and applying geometric properties to solve practical problems.
STEPS:
- Step 1: Set up the general equation \(x^2 + y^2 + 2gx + 2fy + c = 0\) and substitute the three points to form three linear equations in \(g, f, c\).
- Step 2: Solve the system to find \(g, f, c\) and write the equation.
- Step 3: Find centre \((-g, -f)\) and radius \(r = \sqrt{g^2 + f^2 - c}\).
- Step 4: Fencing length = circumference = \(2\pi r\). Compute using \(\pi = 22/7\).
- Step 5: Compare sprinkler radius (5 m) with garden radius \(r\). If \(r \le 5\), it covers; else not.
ANSWER: (a) Solving gives \(g = -4, f = -4, c = 11\). Equation: \(x^2 + y^2 - 8x - 8y + 11 = 0\). (b) Centre = \((4, 4)\), \(r = \sqrt{16+16-11} = \sqrt{21}\) m. Circumference = \(2 \times \frac{22}{7} \times \sqrt{21} = \frac{44\sqrt{21}}{7} \approx 28.8\) m. (c) Sprinkler radius = 5 m, garden radius = \(\sqrt{21} \approx 4.58\) m. Since \(4.58 < 5\), the sprinkler covers the entire garden.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The equation \(x^2 + y^2 + 2gx + 2fy + c = 0\) represents a circle that touches both the x-axis and the y-axis. (a) Derive the relationship between \(g\), \(f\), and \(c\). (b) If the circle also passes through the point \((2, 1)\), find all possible circles (there may be more than one). (c) For each circle found, state its centre and radius.
COMPETENCY: Analyzing geometric constraints to derive algebraic conditions and solving non-linear systems.
STEPS:
- Step 1: Touching x-axis means distance from centre \((-g, -f)\) to x-axis = \(|f|\) equals radius \(r = \sqrt{g^2 + f^2 - c}\). So \(f^2 = g^2 + f^2 - c \Rightarrow g^2 = c\).
- Step 2: Touching y-axis means distance to y-axis = \(|g|\) equals radius. So \(g^2 = g^2 + f^2 - c \Rightarrow f^2 = c\).
- Step 3: From (1) and (2), \(g^2 = f^2 = c\). Hence \(c \ge 0\) and \(|g| = |f| = \sqrt{c}\).
- Step 4: Substitute \(c = g^2\) and \(f = \pm g\) into the circle equation and use the condition that it passes through \((2,1)\): \(4 + 1 + 4g + 2f + g^2 = 0\).
- Step 5: Consider cases \(f = g\) and \(f = -g\). Solve for \(g\) and find corresponding circles.
- Step 6: For each valid \(g\), write the equation, centre, and radius.
ANSWER: (a) \(g^2 = f^2 = c\). (b) Case 1: \(f = g\). Then \(5 + 4g + 2g + g^2 = 0 \Rightarrow g^2 + 6g + 5 = 0 \Rightarrow (g+1)(g+5)=0 \Rightarrow g = -1\) or \(g = -5\). For \(g=-1\), \(f=-1\), \(c=1\): Circle 1: \(x^2+y^2-2x-2y+1=0\). For \(g=-5\), \(f=-5\), \(c=25\): Circle 2: \(x^2+y^2-10x-10y+25=0\). Case 2: \(f = -g\). Then \(5 + 4g - 2g + g^2 = 0 \Rightarrow g^2 + 2g + 5 = 0\). Discriminant \(4-20 = -16 < 0\), no real \(g\). So only two circles. (c) Circle 1: Centre \((1,1)\), radius \(1\). Circle 2: Centre \((5,5)\), radius \(5\).
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you are designing a ______ garden in your school courtyard.

## DIAGNOSTIC_ANSWER_7
circular

**A wrong answer ("school" or "courtyard") reveals the student has swapped the walkthrough's adjective - you are designing a circular garden in your school courtyard.** Circular is the walkthrough's own adjective, and the adjective is what the blank grades. Recall the architect's equation before filling, and give the adjective exactly.

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
They can also derive the general equation when given geometric conditions such as three non-collinear points, endpoints of a diameter, or tangency conditions.

**A wrong answer (only completing the square) reveals the student has under-answered the mastery criterion.** Full mastery adds: derive the general equation from geometric conditions - three non-collinear points, endpoints of a diameter, or tangency conditions - not just decode a given equation.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Imagine you are ______ a circular garden in your school courtyard.

## DIAGNOSTIC_ANSWER_9
designing

**A wrong answer ("building" or "planning") reveals the student has paraphrased the walkthrough's participle - you are designing the circular garden in the school courtyard.** Designing is the walkthrough's own participle, and the participle is what the blank grades. Recall the fountain placement before filling, and fill the word exactly as written.
