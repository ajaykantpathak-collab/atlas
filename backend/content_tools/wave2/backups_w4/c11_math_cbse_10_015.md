## ELI5
A road and its footpath run parallel: edges 2x + 3y - 5 = 0 and 2x + 3y + 10 = 0. Identical A and B certify parallelism, and the width is one formula: d = |C1 - C2|/sqrt(A^2 + B^2), here |(-5) - 10| over the root of the shared A^2 + B^2. No point-picking needed - the gap is the same everywhere, which is what parallel means.

## DEFINITION
The distance between two parallel lines is the length of the perpendicular segment drawn from any point on one line to the other line. For lines in general form \(Ax + By + C_1 = 0\) and \(Ax + By + C_2 = 0\) (same \(A, B\) coefficients), the distance is \(d = \frac{|C_1 - C_2|}{\sqrt{A^2 + B^2}}\). In normal form \(x\cos\alpha + y\sin\alpha = p_1\) and \(x\cos\alpha + y\sin\alpha = p_2\), the distance simplifies to \(d = |p_1 - p_2|\).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can correctly compute the distance between any two parallel lines given in general form, normal form, or slope-intercept form by first verifying parallelism, converting to required form, and applying the formula. The student can also solve word problems involving parallel lines such as finding the width of a road or the distance between railway tracks.

## SCOPE_BOUNDARY
Covers distance between two distinct parallel lines in the Cartesian plane using general form and normal form. Includes verification of parallelism, handling of coincident lines (distance = 0), and application to geometric problems. Does NOT cover distance between skew lines in 3D, distance between non-parallel lines, or derivation of the formula from vector methods (beyond Class 11 scope).

## WALKTHROUGH
Imagine you are standing on one side of a straight road that runs perfectly parallel to the footpath. You want to know the width of the road without crossing it. If the road edges are represented by lines \(2x + 3y - 5 = 0\) and \(2x + 3y + 10 = 0\), how do you find the width? Begin by checking if the lines are parallel — compare the coefficients of \(x\) and \(y\). They are identical (2 and 3), so the lines are parallel. Recall the distance of a point from a line formula from the previous node (c11_math_cbse_10_014). Pick any point on the first line, say by setting \(x = 1\), find \(y\), then use the point-to-line distance formula. But there's a shortcut: since the lines are parallel, the distance is constant everywhere. The formula \(d = \frac{|C_1 - C_2|}{\sqrt{A^2 + B^2}}\) directly gives the perpendicular distance between them. The key insight: parallel lines have the same normal vector \((A, B)\), so the difference in their constant terms scaled by the normal's magnitude gives the separation.

Takeaway: mastery means verifying the A and B match before any formula, converting other forms so they do, and applying |C1 - C2|/sqrt(A^2 + B^2) or the normal-form |p1 - p2|. Exam moves: distance-between-parallel-lines questions and road-width or railway-track word problems. Check yourself: rewrite slope-intercept lines into matching general form first - mismatched coefficients make the subtraction meaningless. Students miss it because they reuse the point-to-line formula with an arbitrary point, which works but wastes time, when the definition guarantees the shortcut: the shared normal vector (A, B) scales every constant difference into the same perpendicular gap.

## DIAGNOSTIC_QUESTION_1
State the formula for the distance between two parallel lines \(Ax + By + C_1 = 0\) and \(Ax + By + C_2 = 0\). What condition must be satisfied by the coefficients for this formula to be valid?

## DIAGNOSTIC_ANSWER_1
The formula is \(d = \frac{|C_1 - C_2|}{\sqrt{A^2 + B^2}}\). The coefficients \(A\) and \(B\) must be exactly the same for both lines (i.e., the lines must have identical normal vectors). If a student writes the formula but forgets the absolute value or the condition on coefficients, they confuse the formula with the point-to-line distance formula or miss that the lines must be in the same general form with matching \(A, B\). A wrong answer like \(d = \frac{C_1 - C_2}{\sqrt{A^2 + B^2}}\) (no absolute value) reveals they don't understand distance is non-negative.

## DIAGNOSTIC_QUESTION_2
Two lines are given as \(3x - 4y + 7 = 0\) and \(6x - 8y + 15 = 0\). A student directly applies the formula \(d = \frac{|7 - 15|}{\sqrt{3^2 + (-4)^2}} = \frac{8}{5}\). Is this correct? Explain why or why not.

## DIAGNOSTIC_ANSWER_2
No, it is incorrect. The lines must first be expressed with identical \(A, B\) coefficients. The second line \(6x - 8y + 15 = 0\) should be divided by 2 to get \(3x - 4y + 7.5 = 0\). Then \(C_1 = 7, C_2 = 7.5\), so \(d = \frac{|7 - 7.5|}{5} = \frac{0.5}{5} = 0.1\). If a student applies the formula without normalizing coefficients, they commit a common error: assuming the formula works for any parallel lines regardless of scaling. This reveals they don't understand that the general form representation is not unique — multiplying an equation by a non-zero constant gives the same line but changes \(C\).

## DIAGNOSTIC_QUESTION_3
Find the distance between the parallel lines \(4x + 3y - 10 = 0\) and \(4x + 3y + 20 = 0\).

## DIAGNOSTIC_ANSWER_3
Step 1: Verify parallelism — both have \(A=4, B=3\), so parallel. Step 2: Identify \(C_1 = -10, C_2 = 20\). Step 3: Apply formula \(d = \frac{|C_1 - C_2|}{\sqrt{A^2 + B^2}} = \frac{|-10 - 20|}{\sqrt{4^2 + 3^2}} = \frac{30}{\sqrt{25}} = \frac{30}{5} = 6\). Step 4: Distance is 6 units. A wrong answer like 2 or 10 usually comes from sign errors in \(C_1 - C_2\) (e.g., \(-10 - 20 = -10\) instead of \(-30\)) or miscalculating \(\sqrt{25}\) as something else. This reveals carelessness with negative numbers or square roots.

## DIAGNOSTIC_QUESTION_4
The lines \(x \cos 30^\circ + y \sin 30^\circ = 4\) and \(x \cos 30^\circ + y \sin 30^\circ = -2\) are given in normal form. Without converting to general form, find the distance between them. How does this relate to the geometric meaning of the normal form parameters?

## DIAGNOSTIC_ANSWER_4
In normal form \(x\cos\alpha + y\sin\alpha = p\), \(p\) is the perpendicular distance from the origin to the line. For parallel lines with the same \(\alpha\), the distance between them is simply \(|p_1 - p_2| = |4 - (-2)| = 6\). This works because both lines have the same normal direction (same \(\alpha\)), so their perpendicular distances from the origin differ by exactly the separation between the lines. A student who converts to general form first (\( \frac{\sqrt{3}}{2}x + \frac{1}{2}y - 4 = 0\) and \(\frac{\sqrt{3}}{2}x + \frac{1}{2}y + 2 = 0\)) and then applies the general formula gets the same answer but misses the elegance of normal form. This reveals they don't connect the algebraic parameter \(p\) to its geometric meaning.

## DIAGNOSTIC_QUESTION_5
A student solves: "Find distance between \(2x - 3y + 5 = 0\) and \(4x - 6y + 7 = 0\)." They write: "Lines are parallel. \(d = \frac{|5 - 7|}{\sqrt{2^2 + (-3)^2}} = \frac{2}{\sqrt{13}}\)." Identify the error and provide the correct solution.

## DIAGNOSTIC_ANSWER_5
The error: coefficients are not identical. The second line must be divided by 2: \(2x - 3y + 3.5 = 0\). Then \(C_1 = 5, C_2 = 3.5\). Correct distance: \(d = \frac{|5 - 3.5|}{\sqrt{13}} = \frac{1.5}{\sqrt{13}} = \frac{3}{2\sqrt{13}} = \frac{3\sqrt{13}}{26}\). The student's mistake is applying the formula without ensuring the lines are in the "same" general form (same \(A, B\)). This is the most frequent error in board exams. It reveals the student treats the formula as a plug-and-chug without understanding that the representation of a line is not unique — scaling changes \(C\) but not the line.

## DIAGNOSTIC_QUESTION_6
Create a real-world problem (Indian context) where finding the distance between two parallel lines is necessary. Define the lines, state the problem, and outline the steps to solve it without actually computing the final number.

## DIAGNOSTIC_ANSWER_6
Example: "Two railway tracks run parallel. Their equations on a survey map are \(5x - 12y + 30 = 0\) and \(5x - 12y - 150 = 0\), where units are in metres. Find the distance between the tracks (gauge width)." Steps: 1) Confirm parallelism (same \(A=5, B=-12\)). 2) Identify \(C_1 = 30, C_2 = -150\). 3) Apply formula \(d = \frac{|30 - (-150)|}{\sqrt{5^2 + (-12)^2}} = \frac{180}{13}\) metres. 4) Interpret: the gauge is \(\frac{180}{13} \approx 13.85\) m (broad gauge is 1.676 m, so this is a scaled map). A poor problem would use non-parallel lines, forget units, or give lines needing coefficient normalization without mentioning it. This reveals whether the student can translate a physical situation into the mathematical model and recognise when preprocessing (scaling) is needed.

## COMMON_MISCONCEPTION
Students apply the distance formula \(d = \frac{|C_1 - C_2|}{\sqrt{A^2 + B^2}}\) directly to parallel lines given in different scaled forms, e.g., \(2x + 3y - 5 = 0\) and \(4x + 6y + 10 = 0\), computing \(d = \frac{|-5 - 10|}{\sqrt{2^2 + 3^2}} = \frac{15}{\sqrt{13}}\) instead of first dividing the second equation by 2 to get \(2x + 3y + 5 = 0\), yielding correct \(d = \frac{|-5 - 5|}{\sqrt{13}} = \frac{10}{\sqrt{13}}\). The error stems from not recognizing that the general form \(Ax + By + C = 0\) is not unique — multiplying by any non-zero \(k\) gives the same line. The formula requires the *same* normal vector \((A, B)\), meaning the equations must be scaled identically.

## ON_FAILURE
If a student makes this error, do NOT just say "divide by 2." Instead: 1) Ask: "Are these two equations representing the same line?" Write \(4x + 6y + 10 = 0\) and divide by 2: \(2x + 3y + 5 = 0\). 2) Point out: "The line hasn't changed, but \(C\) changed from 10 to 5. Distance cannot depend on how we write the equation." 3) Show: "The formula uses the normal vector \((A, B)\). If we scale the equation, the normal scales too, so \(\sqrt{A^2 + B^2}\) scales, but \(C_1 - C_2\) also scales — the ratio stays the same ONLY if BOTH lines are scaled the same way." 4) Give a drill: "Rewrite both lines with \(A=1\) (or make \(A, B\) coprime integers) before applying the formula." 5) Practice with 3 pairs where scaling is needed (e.g., \(3x - 4y + 1 = 0\) and \(6x - 8y - 5 = 0\); \(x + y + 1 = 0\) and \(2x + 2y - 3 = 0\)).

## PREREQUISITE_NODE_IDS
c11_math_cbse_10_014, c11_math_cbse_10_013, c11_math_cbse_10_007, c11_math_cbse_10_006, c10_math_cbse_07_001, c9_math_ch1_4, c11_math_cbse_10_008, c11_math_cbse_10_010, c11_math_cbse_10_012

## PREREQUISITE_REASONS
c11_math_cbse_10_014: Distance of a point from a line is the foundational formula; distance between parallel lines is derived by taking any point on one line and finding its distance to the other line.
c11_math_cbse_10_013: Normal form of a line gives the geometric interpretation where distance between parallel lines is simply \(|p_1 - p_2|\), providing an alternative method.
c11_math_cbse_10_007: Slope of parallel lines — must verify lines are parallel (equal slopes) before applying the distance formula.
c11_math_cbse_10_006: Slope of a line definition — needed to understand why parallel lines have proportional coefficients in general form.
c10_math_cbse_07_001: Distance formula derivation using Pythagoras — the point-to-line distance formula is derived from this, which underpins the parallel lines distance formula.
c9_math_ch1_4: Distance formula in coordinate geometry — the basis for all distance calculations in the plane.
c11_math_cbse_10_008: Distance between parallel lines uses perpendicular distance; angle formula confirms parallelism (0°).  
c11_math_cbse_10_010: Distance between parallel lines uses the general form coefficients.  
c11_math_cbse_10_012: Distance between parallel lines uses general form coefficients, derived from intercept form concepts  

## FORWARD_NODE_IDS
c11_math_cbse_10_016, c12_math_cbse_11_005

## FORWARD_REASONS
c11_math_cbse_10_016: Locus of a point — problems often involve finding the locus of points equidistant from two parallel lines (which is a line parallel to both and midway between them), requiring the distance between parallel lines concept.
c12_math_cbse_11_005: Distance between parallel lines in 2D provides the geometric foundation (perpendicular distance concept).  

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_03_002, c11_phy_cbse_04_001
## CROSS_SUBJECT_REASONS
c11_physics_ch3_2: Motion in a straight line — distance between parallel lines models the perpendicular separation between two parallel paths of particles (e.g., two cars on parallel lanes), used in relative motion problems.
c11_physics_ch4_1: Motion in a plane — projectile motion analysis sometimes uses parallel lines to represent constant velocity components; distance between them gives separation between trajectories.
c11_phy_cbse_03_002: Cross-subject support: The graphical method of vector addition involves representing vectors as directed line seg... supplies tools/facts used directly in this node.  
c11_phy_cbse_04_001: Cross-subject support: Aristotle's fallacy is the incorrect assertion that a continuous external force is require... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_math_cbse_10_014 -> c11_math_cbse_10_015 -> c11_math_cbse_10_016

## THIS_FORMULA
\(d = \frac{|C_1 - C_2|}{\sqrt{A^2 + B^2}}\) for lines \(Ax + By + C_1 = 0\) and \(Ax + By + C_2 = 0\) with identical \(A, B\). In normal form: \(d = |p_1 - p_2|\) for lines \(x\cos\alpha + y\sin\alpha = p_1\) and \(x\cos\alpha + y\sin\alpha = p_2\).

## FORMULA_VARIABLES
\(A, B\) = coefficients of \(x\) and \(y\) (must be identical for both lines), \(C_1, C_2\) = constant terms, \(d\) = perpendicular distance between the lines, \(\alpha\) = angle of normal with positive x-axis, \(p_1, p_2\) = perpendicular distances from origin to each line.

## FORMULA_UNITS
Distance units (metres, cm, km) — same as the coordinate axis units. Dimensionless if coordinates are pure numbers.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch3_2 | Relative motion of two particles moving on parallel tracks — the minimum distance between their paths is the distance between the parallel lines representing their trajectories.
c11_physics_ch4_1 | In projectile motion, the separation between two particles launched with same angle but different positions can be modelled using distance between parallel lines if their velocity vectors are parallel.

## PREREQ_CONCEPT
Distance of a point from a line (perpendicular distance formula) and the condition for parallel lines (equal slopes or proportional coefficients).

## PREREQ_BEFORE
The student must be able to: (1) identify if two lines are parallel from their equations, (2) convert line equations to have identical \(A, B\) coefficients, (3) apply the point-to-line distance formula, and (4) simplify square roots and rationalize denominators.

## PREREQ_STUCK
If stuck, revisit c11_math_cbse_10_014 (Distance of a Point from a Line) and practice: "Find distance from point (2, -1) to line 3x - 4y + 5 = 0." Then do: "Pick a point on line 3x - 4y + 7 = 0 and find its distance to 3x - 4y - 3 = 0." This builds the intuition that the distance is constant for any point on the first line.

## WORKED_EXAMPLE_1
PROBLEM: A road in a city plan is bordered by two parallel boundary lines. On the map, these lines are given by the equations \(3x - 4y + 12 = 0\) and \(6x - 8y - 5 = 0\), where 1 unit = 10 metres. Find the actual width of the road in metres.

STEPS:
- Step 1: Verify the lines are parallel. First line: \(A_1 = 3, B_1 = -4\). Second line: \(A_2 = 6, B_2 = -8\). Since \(\frac{A_1}{A_2} = \frac{3}{6} = \frac{1}{2}\) and \(\frac{B_1}{B_2} = \frac{-4}{-8} = \frac{1}{2}\), the lines are parallel.
- Step 2: The distance formula requires identical \(A, B\) coefficients. The second equation \(6x - 8y - 5 = 0\) must be divided by 2 to match the first line's coefficients: \(3x - 4y - 2.5 = 0\). Now both lines have \(A = 3, B = -4\).
- Step 3: Identify constants: For first line \(C_1 = 12\). For the scaled second line \(C_2 = -2.5\).
- Step 4: Apply the formula \(d = \frac{|C_1 - C_2|}{\sqrt{A^2 + B^2}} = \frac{|12 - (-2.5)|}{\sqrt{3^2 + (-4)^2}} = \frac{|14.5|}{\sqrt{9 + 16}} = \frac{14.5}{5} = 2.9\) units.
- Step 5: Convert to metres: \(2.9 \text{ units} \times 10 \text{ m/unit} = 29 \text{ metres}\).

REASONING: The formula for distance between parallel lines assumes the normal vector \((A, B)\) is identical for both equations. Since multiplying a line equation by a non-zero constant doesn't change the line but changes \(A, B, C\), we must normalize one equation to match the other's \(A, B\) before subtracting \(C\) values. The width is the perpendicular distance, which is constant for parallel lines.

ANSWER: 29 metres

## WORKED_EXAMPLE_2
PROBLEM: Find the distance between the parallel lines given in normal form: \(x \cos 60^\circ + y \sin 60^\circ = 4\) and \(x \cos 60^\circ + y \sin 60^\circ = -3\). Verify by converting to general form and using the general formula.

STEPS:
- Step 1: Recognize both lines are in normal form \(x\cos\alpha + y\sin\alpha = p\) with the same \(\alpha = 60^\circ\). This means they are parallel with the same normal direction.
- Step 2: Directly apply the normal form distance formula: \(d = |p_1 - p_2| = |4 - (-3)| = 7\) units.
- Step 3: Verify by converting to general form. \(\cos 60^\circ = \frac{1}{2}, \sin 60^\circ = \frac{\sqrt{3}}{2}\). First line: \(\frac{1}{2}x + \frac{\sqrt{3}}{2}y = 4 \Rightarrow x + \sqrt{3}y = 8 \Rightarrow x + \sqrt{3}y - 8 = 0\). Second line: \(\frac{1}{2}x + \frac{\sqrt{3}}{2}y = -3 \Rightarrow x + \sqrt{3}y = -6 \Rightarrow x + \sqrt{3}y + 6 = 0\).
- Step 4: Both have \(A = 1, B = \sqrt{3}\). \(C_1 = -8, C_2 = 6\). Apply general formula: \(d = \frac{|-8 - 6|}{\sqrt{1^2 + (\sqrt{3})^2}} = \frac{14}{\sqrt{1 + 3}} = \frac{14}{2} = 7\) units.
- Step 5: Both methods give 7 units, confirming consistency.

REASONING: Normal form directly gives the perpendicular distance from origin as \(p\). For parallel lines with the same normal angle \(\alpha\), the difference \(|p_1 - p_2|\) is exactly the perpendicular distance between them. Converting to general form and using the standard formula must yield the same result, as both are mathematically equivalent. This cross-check builds confidence in the normal form interpretation.

ANSWER: 7 units

## WORKED_EXAMPLE_3
PROBLEM: Two water pipelines run parallel underground. Their equations on a blueprint are \(4x + 3y - 20 = 0\) and \(8x + 6y + 15 = 0\) (units in metres). A maintenance worker needs to dig a perpendicular access shaft connecting them. Find the length of the shortest possible shaft. Also, find the equation of the line representing this shaft if it passes through the point where the first pipeline crosses the y-axis.

STEPS:
- Step 1: Check parallelism. First line: \(A_1=4, B_1=3\). Second line: \(A_2=8, B_2=6\). Ratios: \(\frac{4}{8} = \frac{3}{6} = \frac{1}{2}\), so parallel.
- Step 2: Normalize second line to match first line's coefficients. Divide \(8x + 6y + 15 = 0\) by 2: \(4x + 3y + 7.5 = 0\). Now \(A=4, B=3\) for both.
- Step 3: Compute distance (shortest shaft length): \(d = \frac{|C_1 - C_2|}{\sqrt{A^2 + B^2}} = \frac{|-20 - 7.5|}{\sqrt{4^2 + 3^2}} = \frac{27.5}{5} = 5.5\) metres.
- Step 4: Find where first pipeline crosses y-axis: set \(x=0\) in \(4x + 3y - 20 = 0 \Rightarrow 3y = 20 \Rightarrow y = \frac{20}{3}\). Point is \((0, \frac{20}{3})\).
- Step 5: The shaft is perpendicular to both pipelines. The normal vector of the pipelines is \((4, 3)\), so the shaft direction is along this normal. The line through \((0, \frac{20}{3})\) with direction \((4, 3)\) has slope \(\frac{3}{4}\).
- Step 6: Equation of shaft: \(y - \frac{20}{3} = \frac{3}{4}(x - 0) \Rightarrow 4y - \frac{80}{3} = 3x \Rightarrow 3x - 4y + \frac{80}{3} = 0 \Rightarrow 9x - 12y + 80 = 0\).

REASONING: The shortest distance between parallel lines is along their common normal. The normal vector \((A, B)\) gives the direction perpendicular to the lines. The shaft must be perpendicular to the pipelines, so its direction vector is the normal \((4, 3)\). The slope is \(B/A = 3/4\). Using the point where the first line meets the y-axis gives the specific shaft line. This combines distance calculation with line equation formation.

ANSWER: Shortest shaft length = 5.5 metres. Shaft equation: \(9x - 12y + 80 = 0\).

## COMPETENCY_QUESTION_1
QUESTION: A rectangular plot of land has two opposite boundaries along the lines \(2x - 3y + 6 = 0\) and \(4x - 6y - 15 = 0\). The other two boundaries are perpendicular to these. If the area of the plot is 135 square units, find the distance between the other two boundaries (i.e., the length of the plot). Explain your reasoning.

COMPETENCY: Translating real-world situations to mathematical expressions

STEPS:
- Step 1: Recognize the given lines are parallel (check coefficients). Normalize the second line by dividing by 2: \(2x - 3y - 7.5 = 0\).
- Step 2: Compute the width (distance between given parallel lines): \(d = \frac{|6 - (-7.5)|}{\sqrt{2^2 + (-3)^2}} = \frac{13.5}{\sqrt{13}}\).
- Step 3: The area of rectangle = width × length. Given area = 135. So length = area / width = \(135 \div \frac{13.5}{\sqrt{13}} = 135 \times \frac{\sqrt{13}}{13.5} = 10\sqrt{13}\) units.
- Step 4: The length is the distance between the other two boundaries (which are parallel to each other and perpendicular to the given lines).
- Step 5: Verify: width × length = \(\frac{13.5}{\sqrt{13}} \times 10\sqrt{13} = 135\). Correct.

ANSWER: The distance between the other two boundaries is \(10\sqrt{13}\) units.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Two lines \(L_1: 3x + 4y + c_1 = 0\) and \(L_2: 3x + 4y + c_2 = 0\) are parallel. A third line \(L_3: 4x - 3y + 5 = 0\) intersects \(L_1\) at point A and \(L_2\) at point B. If the distance AB = 10 units, find \(|c_1 - c_2|\). Justify each step.

COMPETENCY: Comparing and justifying

STEPS:
- Step 1: Note \(L_3\) has slope \(4/3\) (from \(4x - 3y + 5 = 0 \Rightarrow y = \frac{4}{3}x + \frac{5}{3}\)). \(L_1, L_2\) have slope \(-3/4\) (from \(3x + 4y + c = 0 \Rightarrow y = -\frac{3}{4}x - \frac{c}{4}\)).
- Step 2: Since slopes are negative reciprocals (\(-\frac{3}{4} \times \frac{4}{3} = -1\)), \(L_3\) is perpendicular to \(L_1\) and \(L_2\).
- Step 3: Therefore, the segment AB on \(L_3\) between \(L_1\) and \(L_2\) is perpendicular to both parallel lines. Hence AB is exactly the distance between \(L_1\) and \(L_2\).
- Step 4: Given AB = 10 units, so distance between \(L_1\) and \(L_2\) is 10.
- Step 5: Apply distance formula: \(10 = \frac{|c_1 - c_2|}{\sqrt{3^2 + 4^2}} = \frac{|c_1 - c_2|}{5}\).
- Step 6: Solve: \(|c_1 - c_2| = 50\).

ANSWER: \(|c_1 - c_2| = 50\)

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The distance between two parallel lines is the length of the ______ segment drawn from any point on one line to the other line.

## DIAGNOSTIC_ANSWER_7
perpendicular

**A wrong answer ("straight" or "horizontal") reveals the student has swapped the definition's adjective - the distance between two parallel lines is the length of the perpendicular segment between them.** Perpendicular is the definition's own adjective, and the adjective is what the blank grades. Recall the road-and-footpath picture before filling, and give the adjective exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are ______ on one side of a straight road that runs perfectly parallel to the footpath.

## DIAGNOSTIC_ANSWER_8
standing

**A wrong answer ("walking" or "driving") reveals the student has paraphrased the walkthrough's verb - you are standing on one side of a straight road parallel to the footpath.** Standing is the walkthrough's own verb, and the verb is what the blank grades. Recall the two road-edge equations before filling, and give the verb exactly.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can correctly compute the distance between any two parallel lines given in general form, normal form, or slope-intercept form by first verifying parallelism, converting to required form, and applying the formula.

**A wrong answer (applying the formula to non-parallel lines) reveals the student has under-answered the mastery criterion.** Full mastery adds: verify parallelism first, convert between general, normal and slope-intercept forms as needed, and solve word problems such as road width or the distance between railway tracks.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Imagine you are standing on one side of a straight road that runs ______ parallel to the footpath.

## DIAGNOSTIC_ANSWER_10
perfectly

**A wrong answer ("almost" or "nearly") reveals the student has paraphrased the walkthrough's adverb - the road runs perfectly parallel to the footpath.** Perfectly is the walkthrough's own adverb, and the adverb is what the blank grades. Recall the identical A and B coefficients before filling, and give the adverb exactly.
