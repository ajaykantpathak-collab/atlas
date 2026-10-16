## ELI5
School gate at (2, 3), bus stop at (5, 7), each grid unit 10 metres: the shortcut is a right triangle with legs 3 and 4, so the straight-line gap is sqrt(3^2 + 4^2) = 5 units = 50 metres. That is the distance formula: PQ = sqrt((x2 - x1)^2 + (y2 - y1)^2), Pythagoras in coordinates. The squares already handle signs - no absolute values needed.

## DEFINITION
The distance between two points \(P(x_1, y_1)\) and \(Q(x_2, y_2)\) in the Cartesian plane is the length of the straight line segment joining them, given by \(PQ = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\). This formula is derived from the Pythagorean theorem applied to the right triangle formed by the horizontal and vertical distances between the points.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can compute the distance between any two points in the plane, apply the distance formula to determine the type of triangle (equilateral, isosceles, right-angled) or quadrilateral formed by given points, verify collinearity of three points using the distance condition, and solve real-world problems involving shortest path or geometric constraints.

## SCOPE_BOUNDARY
Covers the distance formula in a 2D Cartesian coordinate system, its algebraic manipulation, and applications to geometric problems (triangle classification, quadrilateral properties, collinearity). Does NOT cover 3D distance formula (covered in Chapter 12: Introduction to Three Dimensional Geometry) or distance from a point to a line (covered later in this chapter, node c11_math_cbse_10_014).

## WALKTHROUGH
Imagine you are standing at your school gate (point A) and your friend is at the bus stop (point B). If you map your locations on a grid where each unit is 10 metres, and your coordinates are (2, 3) and (5, 7) respectively, how far apart are you in a straight line? Start by plotting the points on graph paper. Draw horizontal and vertical lines to form a right triangle with the segment AB as the hypotenuse. The horizontal leg length is \(|5 - 2| = 3\) units, the vertical leg is \(|7 - 3| = 4\) units. By Pythagoras, \(AB = \sqrt{3^2 + 4^2} = 5\) units = 50 metres. Generalise: for any points \((x_1, y_1)\) and \((x_2, y_2)\), the horizontal distance is \(|x_2 - x_1|\), vertical is \(|y_2 - y_1|\), so the distance is \(\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\). The squares remove the need for absolute values.

Takeaway: mastery means computing distances between any two points, classifying triangles and quadrilaterals from side lengths, and testing collinearity - three collinear points make one side equal the sum of the other two. Exam moves: find-the-distance questions and what-type-of-triangle items. Check yourself: subtract first, square second - sign slips come from squaring too late. Students miss it because they memorise the formula without its picture, when the definition builds it from Pythagoras: the horizontal and vertical legs are the coordinate differences, and the segment itself is the hypotenuse.

## DIAGNOSTIC_QUESTION_1
State the distance formula between points \(P(x_1, y_1)\) and \(Q(x_2, y_2)\). If \(P(1, 2)\) and \(Q(4, 6)\), write the expression for PQ without evaluating.

## DIAGNOSTIC_ANSWER_1
The distance formula is \(PQ = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\). For the given points, \(PQ = \sqrt{(4-1)^2 + (6-2)^2} = \sqrt{3^2 + 4^2}\). A wrong answer like \(\sqrt{(1-4)^2 + (2-6)^2}\) is also algebraically correct because of squaring, but \(\sqrt{(4-1) + (6-2)} = \sqrt{7}\) reveals the student forgot to square the differences. Writing \(\sqrt{(x_1 - x_2)^2 - (y_1 - y_2)^2}\) shows confusion with the hyperbola definition.

## DIAGNOSTIC_QUESTION_2
Give the correct order of steps that show the straight-line distance between P(0, 0) and Q(3, 4) differs from the along-the-grid distance.

## DIAGNOSTIC_ANSWER_2
The contrast runs: (1) Form the right triangle with legs 3 and 4 between the points (2) Apply Pythagoras to get the straight-line distance of 5 units (3) Add the legs directly to get the along-the-grid distance of 7 units (4) Conclude the two measures differ because squares do not distribute over addition. A wrong answer that treats the two distances as equal shows the student has confused the Pythagorean theorem with simple addition of leg lengths.

## DIAGNOSTIC_QUESTION_3
Find the distance between \(A(-2, 5)\) and \(B(3, -1)\). Then determine if the point \(C(0, 2)\) lies on the line segment AB by checking if \(AC + CB = AB\).

## DIAGNOSTIC_ANSWER_3
\(AB = \sqrt{(3 - (-2))^2 + (-1 - 5)^2} = \sqrt{5^2 + (-6)^2} = \sqrt{25+36} = \sqrt{61}\).
\(AC = \sqrt{(0 - (-2))^2 + (2 - 5)^2} = \sqrt{2^2 + (-3)^2} = \sqrt{13}\).
\(CB = \sqrt{(3 - 0)^2 + (-1 - 2)^2} = \sqrt{3^2 + (-3)^2} = \sqrt{18}\).
\(\sqrt{13} + \sqrt{18} \approx 3.61 + 4.24 = 7.85\), while \(\sqrt{61} \approx 7.81\). Not equal, so C is not on AB. A student who gets \(AB = \sqrt{61}\) but then claims C is on AB because "the points look aligned" is relying on visual estimation instead of algebraic verification. A common error is miscalculating \(AC\) as \(\sqrt{(0+2)^2+(2+5)^2} = \sqrt{4+49} = \sqrt{53}\) by mishandling the negative sign in \(y_1=5\).

## DIAGNOSTIC_QUESTION_4
Three points are \(P(1, 1)\), \(Q(4, 5)\), \(R(7, 9)\). Without plotting, determine if they form a right triangle, an equilateral triangle, or are collinear. Justify using only distances.

## DIAGNOSTIC_ANSWER_4
\(PQ = \sqrt{(4-1)^2+(5-1)^2} = \sqrt{9+16}=5\).
\(QR = \sqrt{(7-4)^2+(9-5)^2} = \sqrt{9+16}=5\).
\(PR = \sqrt{(7-1)^2+(9-1)^2} = \sqrt{36+64}=10\).
Since \(PQ + QR = 5+5=10 = PR\), the points are collinear (R lies on the line segment PQ extended). They do not form a triangle. A student who computes \(PQ=5, QR=5, PR=10\) but says "isosceles triangle because two sides equal" fails to check the triangle inequality / collinearity condition. Another error: computing \(PR = \sqrt{(7-1)^2+(9-1)^2} = \sqrt{6^2+8^2}=10\) correctly but then checking \(5^2+5^2=50 \neq 100\) and concluding "not right triangle" without realising collinearity is the primary classification.

## DIAGNOSTIC_QUESTION_5
A student solves: "Find point on x-axis equidistant from (2, 3) and (4, 5)." Their working: Let point be (x, 0). \(\sqrt{(x-2)^2+(0-3)^2} = \sqrt{(x-4)^2+(0-5)^2}\). Squaring: \((x-2)^2+9 = (x-4)^2+25\). \(x^2-4x+4+9 = x^2-8x+16+25\). \(-4x+13 = -8x+41\). \(4x = 28\), \(x=7\). Answer: (7, 0). Is this correct? Identify any error.

## DIAGNOSTIC_ANSWER_5
The solution is correct. The algebra is sound: \((x-2)^2+9 = (x-4)^2+25\) expands correctly to \(x^2-4x+13 = x^2-8x+41\), giving \(4x=28, x=7\). Verification: distance to (2,3) = \(\sqrt{5^2+3^2}=\sqrt{34}\); to (4,5) = \(\sqrt{3^2+5^2}=\sqrt{34}\). A student who claims an error might mistakenly think the point on x-axis should have y-coordinate 3 or 5, or might incorrectly square only the x-difference: \((x-2)^2 = (x-4)^2\) leading to x=3, which is wrong because it ignores the y-distances.

## DIAGNOSTIC_QUESTION_6
Create a real-world problem (Indian context) that requires using the distance formula twice and comparing the results. The problem must involve a decision (e.g., which route is shorter, which location to choose). Provide the coordinates and the question.

## DIAGNOSTIC_ANSWER_6
Example: "Rahul lives at (2, 3) and works at (8, 7). He can take the metro from station A(5, 5) or station B(4, 6). Walking speed is same. Which station should he walk to from home to minimize total walking distance (home → station + station → work)?"
A good answer sets up coordinates, computes home→A + A→work and home→B + B→work, compares. A poor answer only computes home→station distances and ignores station→work, or assumes the station with smaller x-coordinate is closer without calculation.

## COMMON_MISCONCEPTION
Students often incorrectly apply the distance formula when one or both points lie on an axis. For example, for points \(A(0, 5)\) and \(B(3, 0)\), they write \(AB = \sqrt{(3-0)^2 + (0-5)^2} = \sqrt{9+25}=\sqrt{34}\) correctly, but then for points \(C(0, -2)\) and \(D(0, 4)\) on the y-axis, they write \(CD = \sqrt{(0-0)^2 + (4 - (-2))^2} = \sqrt{0 + 36} = 6\) correctly, but mistakenly think the formula "doesn't work" for axis points and instead use \(|y_2 - y_1|\) only, failing to recognise that the formula reduces to that automatically. Another specific error: when finding a point on the x-axis equidistant from two given points, they set the point as \((x, y)\) instead of \((x, 0)\), leading to two variables and inability to solve.

## ON_FAILURE
If a student struggles with axis points: 1) Have them plot (0, -2) and (0, 4) on graph paper and count squares vertically. 2) Show that the distance formula gives \(\sqrt{(0-0)^2 + (4 - (-2))^2} = \sqrt{36} = 6\), matching the count. 3) Emphasise that the formula works for ALL points; the zero difference in x is automatic. For the equidistant problem: 1) Ask "What is the y-coordinate of ANY point on the x-axis?" (Answer: 0). 2) Force them to write the unknown point as \((a, 0)\) before setting up the equation. 3) Practice 3 such problems with increasing complexity (e.g., point on y-axis, point on line y=x).

## PREREQUISITE_NODE_IDS
c11_math_cbse_10_001, c9_math_ch1_4, c10_math_cbse_07_001
## PREREQUISITE_REASONS
c11_math_cbse_10_001: Student must understand coordinate axes, quadrants, and how to read/plot coordinates (x, y) before computing distances between them.
c9_math_ch1_4: Class 9 derivation of distance formula using Pythagoras theorem provides the geometric foundation; Class 11 builds on this with algebraic fluency.
c10_math_cbse_07_001: Class 10 applications (collinearity, triangle types, quadrilateral properties) are direct prerequisites for the advanced problems in Class 11.

## FORWARD_NODE_IDS
c11_math_cbse_10_003, c11_math_cbse_10_004, c11_math_cbse_10_005, c11_math_cbse_10_006, c11_math_cbse_10_010, c11_math_cbse_10_013, c11_math_cbse_10_014, c11_math_cbse_10_016, c12_math_cbse_10_004, c12_phy_cbse_01_005

## FORWARD_REASONS
c11_math_cbse_10_003: Section formula (internal division) requires distance concept to verify ratios and derive coordinates.
c11_math_cbse_10_004: External division similarly relies on directed distances along a line.
c11_math_cbse_10_005: Area of triangle using coordinates uses side lengths (distances) in Heron's formula or the determinant method which is algebraically equivalent.
c11_math_cbse_10_006: Slope of a line uses differences in coordinates; distance formula provides the geometric meaning of \(\Delta x\) and \(\Delta y\).
c11_math_cbse_10_010: Distance formula reinforces coordinate differences, which appear in the slope formula.  
c11_math_cbse_10_013: Distance formula is used to derive the normalizing factor √(A²+B²) and to understand p as perpendicular distance.  
c11_math_cbse_10_014: Distance formula between two points underpins the derivation of point-to-line distance.  
c11_math_cbse_10_016: Distance formula is essential for translating "distance from point" conditions.  
c12_math_cbse_10_004: Distance formula — used to derive magnitude of a vector from its components.  
c12_phy_cbse_01_005: Distance formula calculates separation \( r \) between source and field point in coordinate geometry problems.  

## CROSS_SUBJECT_PREREQS
c9_math_ch1_4, c9_math_ch6_8
## CROSS_SUBJECT_REASONS
c9_math_ch1_4: Distance formula derivation using Pythagoras theorem is the mathematical bridge to physics displacement vectors (magnitude of displacement in 2D).
c9_math_ch6_8: Heron's formula for triangle area (using three side lengths) connects distance formula to geometry applications in architecture/land surveying.

## CHAIN_DESCRIPTION
c9_math_ch1_4 -> c11_math_cbse_10_001 -> c11_math_cbse_10_002 -> c11_math_cbse_10_003

## THIS_FORMULA
\(PQ = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\)

## FORMULA_VARIABLES
\(x_1, y_1\) = coordinates of first point P; \(x_2, y_2\) = coordinates of second point Q; PQ = distance between P and Q (non-negative real number).

## FORMULA_UNITS
Dimensionless in coordinate geometry; if coordinates represent metres/kilometres, distance is in same unit (e.g., metres, km).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch2_3 | In physics, displacement vector magnitude in a plane uses the same formula: \(\sqrt{(\Delta x)^2 + (\Delta y)^2}\). The distance formula is the mathematical foundation for calculating displacement between two position vectors.
c11_economics_ch1_2 | In economics, distance can represent "economic distance" or cost between two bundles of goods (x1,y1) and (x2,y2) in a 2-good model; the Euclidean metric is one way to measure dissimilarity.

## PREREQ_CONCEPT
Pythagorean theorem in a right triangle: the square of the hypotenuse equals the sum of squares of the other two sides.

## PREREQ_BEFORE
Student must be able to plot points on the Cartesian plane, identify coordinates, and compute squares and square roots of integers and decimals.

## PREREQ_STUCK
If stuck, revisit Class 9 node c9_math_ch1_4 (Distance Formula: Derivation Using Pythagoras Theorem) and practice plotting points and drawing the right triangle for 5 different pairs.

## WORKED_EXAMPLE_1
PROBLEM: A rectangular park in Delhi has corners at A(1, 2), B(5, 2), C(5, 6), D(1, 6) (coordinates in 100-metre units). A straight walking path is proposed from the midpoint of AB to the midpoint of CD. Find the length of this path in metres.

STEPS:
- Step 1: Identify coordinates of midpoints. Midpoint of AB: \(M = \left(\frac{1+5}{2}, \frac{2+2}{2}\right) = (3, 2)\). Midpoint of CD: \(N = \left(\frac{5+1}{2}, \frac{6+6}{2}\right) = (3, 6)\).
- Step 2: Note that both midpoints have same x-coordinate (3), so the segment MN is vertical. The distance is simply \(|y_N - y_M| = |6 - 2| = 4\) units.
- Step 3: Alternatively, apply distance formula: \(MN = \sqrt{(3-3)^2 + (6-2)^2} = \sqrt{0 + 16} = 4\) units.
- Step 4: Convert units: 1 unit = 100 metres, so length = \(4 \times 100 = 400\) metres.
- Step 5: Verify: The path runs vertically through the centre of the park from y=2 to y=6, spanning 4 units of 100m each. Correct.

REASONING: The midpoint formula (from Class 10) gives the coordinates of the midpoints. The distance formula then computes the length. Recognizing vertical/horizontal alignment simplifies calculation but the formula works universally.

ANSWER: 400 metres

## WORKED_EXAMPLE_2
PROBLEM: Find the value of \(k\) such that the point \(P(2, k)\) is equidistant from \(A(5, 1)\) and \(B(1, 5)\).

STEPS:
- Step 1: Write the distance equality: \(PA = PB\).
- Step 2: Apply distance formula: \(\sqrt{(2-5)^2 + (k-1)^2} = \sqrt{(2-1)^2 + (k-5)^2}\).
- Step 3: Square both sides to remove square roots: \((-3)^2 + (k-1)^2 = (1)^2 + (k-5)^2\).
- Step 4: Expand: \(9 + k^2 - 2k + 1 = 1 + k^2 - 10k + 25\).
- Step 5: Simplify: \(k^2 - 2k + 10 = k^2 - 10k + 26\). Cancel \(k^2\): \(-2k + 10 = -10k + 26\).
- Step 6: Solve: \(8k = 16 \Rightarrow k = 2\).
- Step 7: Verify: \(PA = \sqrt{(-3)^2 + (1)^2} = \sqrt{10}\); \(PB = \sqrt{(1)^2 + (-3)^2} = \sqrt{10}\). Equal.

REASONING: Equidistant condition gives an equation in k. Squaring both sides is valid because distances are non-negative. The algebraic manipulation isolates k. This is a typical "reverse" problem where distance is known to be equal and we find a coordinate.

ANSWER: \(k = 2\)

## WORKED_EXAMPLE_3
PROBLEM: Show that the points \(A(3, 0)\), \(B(6, 4)\), and \(C(-1, 3)\) form a right-angled isosceles triangle. Find its area.

STEPS:
- Step 1: Compute all three side lengths using distance formula.
- Step 2: \(AB = \sqrt{(6-3)^2 + (4-0)^2} = \sqrt{9 + 16} = \sqrt{25} = 5\).
- Step 3: \(BC = \sqrt{(-1-6)^2 + (3-4)^2} = \sqrt{49 + 1} = \sqrt{50} = 5\sqrt{2}\).
- Step 4: \(CA = \sqrt{(3 - (-1))^2 + (0-3)^2} = \sqrt{16 + 9} = \sqrt{25} = 5\).
- Step 5: Observe \(AB = CA = 5\) (isosceles) and \(AB^2 + CA^2 = 25 + 25 = 50 = BC^2\) (satisfies Pythagoras, so right-angled at A).
- Step 6: Area of right triangle = \(\frac{1}{2} \times \text{leg}_1 \times \text{leg}_2 = \frac{1}{2} \times 5 \times 5 = 12.5\) square units.

REASONING: The distance formula gives side lengths. Checking equality of two sides confirms isosceles; checking Pythagorean relation confirms right angle. The legs are the equal sides, so area is half the product of legs.

ANSWER: Right-angled isosceles triangle with area 12.5 square units.

## COMPETENCY_QUESTION_1
QUESTION: A triangular plot of land has vertices at (0, 0), (10, 0), and (4, 8) in units of 10 metres. The owner wants to build a well at a point equidistant from all three vertices (circumcentre). Without finding the circumcentre coordinates, explain how you would use the distance formula to verify that a proposed point (5, 3) is the circumcentre. What property must hold?

COMPETENCY: Translating real-world situations to mathematical expressions and verifying geometric properties algebraically.

STEPS:
- Step 1: Understand that circumcentre is equidistant from all three vertices.
- Step 2: Compute distance from (5, 3) to each vertex using distance formula.
- Step 3: Check if all three distances are equal.
- Step 4: If equal, (5, 3) is circumcentre; if not, it is not.

ANSWER: Compute \(d_1 = \sqrt{(5-0)^2+(3-0)^2} = \sqrt{34}\), \(d_2 = \sqrt{(5-10)^2+(3-0)^2} = \sqrt{34}\), \(d_3 = \sqrt{(5-4)^2+(3-8)^2} = \sqrt{26}\). Since \(\sqrt{34} \neq \sqrt{26}\), the point (5, 3) is NOT the circumcentre. The property that must hold is equal distance to all three vertices.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Two friends, Arjun at (2, 5) and Meera at (8, 1), decide to meet at a point on the x-axis such that the sum of their walking distances is minimized. They propose meeting at (5, 0). A third friend says the meeting point should be at (4, 0) to be "fair". Using the distance formula, determine which point minimizes the total distance walked. Is "fairness" (equal distance) the same as minimizing total distance? Justify.

COMPETENCY: Comparing and justifying mathematical solutions in a real-world context; understanding optimization vs. equity.

STEPS:
- Step 1: Compute total distance for meeting at (5, 0): Arjun: \(\sqrt{(5-2)^2+(0-5)^2} = \sqrt{34}\); Meera: \(\sqrt{(5-8)^2+(0-1)^2} = \sqrt{10}\); Total = \(\sqrt{34}+\sqrt{10} \approx 5.83+3.16=8.99\).
- Step 2: Compute total distance for meeting at (4, 0): Arjun: \(\sqrt{(4-2)^2+(0-5)^2} = \sqrt{29}\); Meera: \(\sqrt{(4-8)^2+(0-1)^2} = \sqrt{17}\); Total = \(\sqrt{29}+\sqrt{17} \approx 5.39+4.12=9.51\).
- Step 3: Compare totals: 8.99 < 9.51, so (5, 0) gives smaller total distance.
- Step 4: Check fairness: At (5, 0), distances are \(\sqrt{34}\) and \(\sqrt{10}\) (not equal). At (4, 0), distances are \(\sqrt{29}\) and \(\sqrt{17}\) (also not equal). The point giving equal distances would be found by solving \(\sqrt{(x-2)^2+25} = \sqrt{(x-8)^2+1}\) which gives x=5.5, not an integer.
- Step 5: Conclude: Minimizing total distance (5, 0) is different from equal distance (5.5, 0). "Fairness" as equal distance does not minimize total walking.

ANSWER: Meeting at (5, 0) minimizes total distance (approx 8.99 units) compared to (4, 0) (approx 9.51 units). Fairness (equal distance) would require meeting at (5.5, 0), which gives total distance \(\sqrt{37.25}+\sqrt{37.25} \approx 12.18\), actually larger. So minimizing total distance and equal distance are different objectives.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: This formula is derived from the ______ theorem applied to the right triangle formed by the horizontal and vertical distances between the points.

## DIAGNOSTIC_ANSWER_7
Pythagorean

**A wrong answer ("distance" or "coordinate") reveals the student has swapped the definition's adjective - the formula is derived from the Pythagorean theorem applied to the right triangle between the points.** Pythagorean is the definition's own adjective, and the adjective is what the blank grades. Recall the legs-3-and-4 triangle before filling, and give the adjective exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are ______ at your school gate (point A) and your friend is at the bus stop (point B).

## DIAGNOSTIC_ANSWER_8
standing

**A wrong answer ("waiting" or "queueing") reveals the student has paraphrased the walkthrough's verb - imagine you are standing at your school gate while your friend is at the bus stop.** Standing is the walkthrough's own verb, and the verb is what the blank grades. Recall the (2, 3) gate point before filling, and give the verb exactly.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can compute the distance between any two points in the plane, apply the distance formula to determine the type of triangle (equilateral, isosceles, right-angled) or quadrilateral formed by given points, verify collinearity of three points using the distance condition, and solve real-world problems involving shortest path or.
