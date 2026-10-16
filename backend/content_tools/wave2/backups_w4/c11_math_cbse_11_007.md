## ELI5
An elliptical dish 10 m wide and 6 m deep needs its receiver at a focus - and eccentricity tells you how off-centre that focus sits. Compute c = sqrt(a^2 - b^2) from the semi-axes, then e = c/a: a number always below 1, because the focus is closer to the centre than the curve's farthest reach. Foci sit at (plus or minus c, 0) or (0, plus or minus c) depending on which axis is major, and the directrices follow at a/e or b/e.

## DEFINITION
For an ellipse in standard form \(\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1\) with \(a > b > 0\) (major axis along x-axis), the eccentricity is \(e = \frac{c}{a}\) where \(c^2 = a^2 - b^2\). The foci are \((\pm c, 0)\) and the directrices are \(x = \pm \frac{a}{e}\). If the major axis is along the y-axis (\(b > a\)), then \(e = \frac{c}{b}\), \(c^2 = b^2 - a^2\), foci are \((0, \pm c)\), and directrices are \(y = \pm \frac{b}{e}\).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can compute eccentricity, coordinates of foci, and equations of directrices for any ellipse given in standard or general form, and can use these to solve real-world problems involving elliptical orbits, arches, or reflective properties.

## SCOPE_BOUNDARY
Covers ellipses centered at the origin with axes parallel to coordinate axes. Does NOT cover rotated ellipses, ellipses with center not at origin, or parametric/polar forms. Stays within Class 11 NCERT scope.

## WALKTHROUGH
Imagine a satellite dish shaped like an ellipse. The receiver must be placed at a focus to collect signals. If the dish is 10 m wide and 6 m deep, where is the focus? Start by identifying the semi-major axis \(a\) and semi-minor axis \(b\) from the dimensions. Write the standard equation \(\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1\). Compute \(c = \sqrt{a^2 - b^2}\) (or \(\sqrt{b^2 - a^2}\) if vertical). Then eccentricity \(e = c/a\) (or \(c/b\)). Foci are at \((\pm c, 0)\) or \((0, \pm c)\). Directrices are \(x = \pm a/e\) or \(y = \pm b/e\). The key insight: the distance from center to focus is always less than the semi-major axis, so \(e < 1\).

Takeaway: mastery means computing e, foci and directrices for either orientation, and reading e as the nearness of the foci to the centre. Exam moves: find-the-eccentricity questions and evaluate-the-claim items where the major axis must be re-read from the denominators. Check yourself: b bigger than a means the major axis runs along y - recompute with e = c/b before placing anything. Students miss it because they assume x-axis major by default, when the definition branches on the comparison: the larger denominator names the major axis, and every formula inherits its letters from that verdict.

## DIAGNOSTIC_QUESTION_1
State the formula for eccentricity of an ellipse \(\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1\) with \(a > b\), and give the coordinates of its foci.

## DIAGNOSTIC_ANSWER_1
Eccentricity \(e = \frac{\sqrt{a^2 - b^2}}{a}\), foci are \((\pm \sqrt{a^2 - b^2}, 0)\). A wrong answer like \(e = \frac{\sqrt{b^2 - a^2}}{a}\) or foci at \((0, \pm c)\) reveals confusion about which axis is major and the condition \(a > b\).

Eccentricity e = c/a with c^2 = a^2 - b^2; the foci are (plus or minus c, 0). **A wrong answer (e = sqrt(b^2 - a^2) or foci on the y-axis) reveals the student has lost track of the major axis - the condition a > b pins it along x.** Recheck the inequality before writing any formula.

## DIAGNOSTIC_QUESTION_2
Explain why the eccentricity of an ellipse is always less than 1, using the relationship \(c^2 = a^2 - b^2\).

## DIAGNOSTIC_ANSWER_2
Since \(a > b > 0\), \(c = \sqrt{a^2 - b^2} < a\), so \(e = c/a < 1\). If a student says \(e > 1\) or uses \(c = \sqrt{a^2 + b^2}\), they are confusing ellipse with hyperbola or misapplying the Pythagorean relation.

Because a > b, c = sqrt(a^2 - b^2) stays below a, so e = c/a < 1. **A wrong answer (e > 1 or c = sqrt(a^2 + b^2)) reveals the student has imported the hyperbola's machinery - there the foci outrun the vertices and the squares add.** The ellipse's defining sum keeps everything inside.

## DIAGNOSTIC_QUESTION_3
Find the eccentricity, foci, and directrices of the ellipse \(4x^2 + 9y^2 = 36\).

## DIAGNOSTIC_ANSWER_3
Divide by 36: \(\frac{x^2}{9} + \frac{y^2}{4} = 1\). Here \(a^2 = 9, b^2 = 4 \Rightarrow a=3, b=2\). \(c = \sqrt{9-4} = \sqrt{5}\). \(e = \frac{\sqrt{5}}{3}\). Foci: \((\pm \sqrt{5}, 0)\). Directrices: \(x = \pm \frac{3}{\sqrt{5}/3} = \pm \frac{9}{\sqrt{5}}\). A wrong answer with \(a=2, b=3\) shows inability to identify the larger denominator as \(a^2\).

## DIAGNOSTIC_QUESTION_4
An ellipse has foci at \((\pm 4, 0)\) and eccentricity \(e = \frac{2}{3}\). Find its equation and directrices.

## DIAGNOSTIC_ANSWER_4
Given \(c = 4\), \(e = c/a = 2/3 \Rightarrow a = 6\). Then \(b^2 = a^2 - c^2 = 36 - 16 = 20\). Equation: \(\frac{x^2}{36} + \frac{y^2}{20} = 1\). Directrices: \(x = \pm a/e = \pm 6/(2/3) = \pm 9\). If a student uses \(b\) instead of \(a\) in \(e = c/a\), they will get incorrect \(a\) and \(b\).

## DIAGNOSTIC_QUESTION_5
A student claims that for the ellipse \(\frac{x^2}{16} + \frac{y^2}{25} = 1\), the foci are \((\pm 3, 0)\) and directrices are \(x = \pm \frac{16}{3}\). Evaluate this claim.

## DIAGNOSTIC_ANSWER_5
The claim is false. Here \(b^2 = 25 > a^2 = 16\), so major axis is y-axis. \(c = \sqrt{25-16} = 3\). Foci: \((0, \pm 3)\). \(e = c/b = 3/5\). Directrices: \(y = \pm b/e = \pm 25/3\). The student incorrectly assumed major axis along x-axis.

The claim is false: b^2 = 25 exceeds a^2 = 16, so the major axis runs along y. c = 3, foci (0, plus or minus 3), e = 3/5, directrices y = plus or minus 25/3. **A wrong answer agreeing with the student reveals the same slipped assumption - major axis along x by default.** Compare denominators first; the 25 under y^2 wins, and every element follows the y-branch.

## DIAGNOSTIC_QUESTION_6
Construct a real-world problem where an elliptical arch of a bridge has a span of 20 m and height 8 m at the center. Ask for the distance from the center to the foci and the equations of the directrices.

## DIAGNOSTIC_ANSWER_6
Span = 20 m \(\Rightarrow\) semi-major axis \(a = 10\) m (horizontal). Height = 8 m \(\Rightarrow\) semi-minor axis \(b = 8\) m. \(c = \sqrt{100-64} = 6\) m. Foci at \((\pm 6, 0)\). \(e = 6/10 = 0.6\). Directrices: \(x = \pm a/e = \pm 10/0.6 = \pm 50/3\) m. A poor answer would use \(a=8, b=10\) or forget to halve the span.

## COMMON_MISCONCEPTION
Students often confuse which denominator is \(a^2\) and which is \(b^2\). They assume \(a\) is always under \(x^2\) and \(b\) under \(y^2\), leading to wrong identification of major axis, incorrect \(c = \sqrt{a^2 - b^2}\) (sometimes getting imaginary \(c\)), and swapped foci/directrices. Another error: using \(e = c/b\) for horizontal ellipse or \(e = c/a\) for vertical ellipse.

## ON_FAILURE
Step 1: Rewrite the ellipse equation in standard form \(\frac{x^2}{A} + \frac{y^2}{B} = 1\). Step 2: Compare \(A\) and \(B\). The larger denominator is \(a^2\) (semi-major axis squared), the smaller is \(b^2\). Step 3: If \(A > B\), major axis is x-axis: \(c = \sqrt{A - B}\), \(e = c/\sqrt{A}\), foci \((\pm c, 0)\), directrices \(x = \pm \sqrt{A}/e\). If \(B > A\), major axis is y-axis: \(c = \sqrt{B - A}\), \(e = c/\sqrt{B}\), foci \((0, \pm c)\), directrices \(y = \pm \sqrt{B}/e\). Step 4: Always verify \(e < 1\). Practice with 5 examples of each orientation.

## PREREQUISITE_NODE_IDS
c11_math_cbse_11_006, c9_math_ch1_4, c9_math_ch1_7, c8_math_ch6_7, c8_math_ch6_8
## PREREQUISITE_REASONS
c11_math_cbse_11_006: Provides definition and standard equation of ellipse, which is the starting point for finding eccentricity, foci, directrices.
c9_math_ch1_4: Distance formula is used to derive \(c^2 = a^2 - b^2\) and to verify focus-directrix property.
c9_math_ch1_7: Section formula helps in understanding the internal division property of foci.
c8_math_ch6_7: Algebraic identity \((a+b)^2\) and \((a-b)^2\) are used in simplifying expressions for eccentricity.
c8_math_ch6_8: Identity \(a^2 - b^2 = (a+b)(a-b)\) is directly used in \(c^2 = a^2 - b^2\).

## FORWARD_NODE_IDS
c11_math_cbse_11_008, c11_math_cbse_11_010, c11_math_cbse_11_009

## FORWARD_REASONS
c11_math_cbse_11_008: Hyperbola uses analogous concepts (eccentricity, foci, directrices) but with \(c^2 = a^2 + b^2\); understanding ellipse first builds contrast.
c11_math_cbse_11_010: Applications of conic sections (planetary orbits, reflectors) require knowledge of foci and eccentricity of ellipses.
c11_math_cbse_11_009: Covers ellipse eccentricity derivation; the hyperbola derivation is analogous but with sign change, so understanding ellipse eccentricity helps contrast.  

## CROSS_SUBJECT_PREREQS
c9_math_ch1_4, c10_math_cbse_07_001
## CROSS_SUBJECT_REASONS
c9_math_ch1_4: Distance formula is fundamental in physics for calculating displacement, orbital radii, and in engineering for structural analysis of elliptical arches.
c10_math_cbse_07_001: Coordinate geometry skills (distance, section formula) are used in physics (kinematics, gravitation) and economics (optimization problems involving elliptical constraints).

## CHAIN_DESCRIPTION
c11_math_cbse_11_006 -> c11_math_cbse_11_007 -> c11_math_cbse_11_008

## THIS_FORMULA
For ellipse \(\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1\) with \(a > b\): \(c^2 = a^2 - b^2\), \(e = c/a\), foci \((\pm c, 0)\), directrices \(x = \pm a/e\). For \(b > a\): \(c^2 = b^2 - a^2\), \(e = c/b\), foci \((0, \pm c)\), directrices \(y = \pm b/e\).

## FORMULA_VARIABLES
\(a\) = semi-major axis length, \(b\) = semi-minor axis length, \(c\) = distance from center to focus, \(e\) = eccentricity (\(0 < e < 1\)).

## FORMULA_UNITS
All lengths in same units (metres, cm, etc.). Eccentricity is dimensionless.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c9_math_ch1_4 | Distance formula used in physics to compute orbital distances and in engineering for elliptical gear design.
c10_math_cbse_07_001 | Coordinate geometry applied in economics for utility functions with elliptical indifference curves and in physics for projectile motion under central forces.

## PREREQ_CONCEPT
Standard equation of ellipse and identification of major/minor axes from the equation.

## PREREQ_BEFORE
Student must be able to convert any ellipse equation to standard form and correctly identify \(a^2\) and \(b^2\) as the larger and smaller denominators.

## PREREQ_STUCK
If stuck, revisit c11_math_cbse_11_006 (Ellipse: Definition and Standard Equation) and practice identifying \(a\) and \(b\) from equations like \(9x^2 + 4y^2 = 36\).

## WORKED_EXAMPLE_1
PROBLEM: A satellite orbits Earth in an elliptical path with equation \(\frac{x^2}{2500} + \frac{y^2}{900} = 1\) (distances in km). Find the eccentricity, coordinates of foci, and equations of directrices.
STEPS:
- Step 1: Identify \(a^2\) and \(b^2\). Since \(2500 > 900\), \(a^2 = 2500, b^2 = 900\). So \(a = 50\) km, \(b = 30\) km. Major axis is along x-axis.
- Step 2: Compute \(c = \sqrt{a^2 - b^2} = \sqrt{2500 - 900} = \sqrt{1600} = 40\) km.
- Step 3: Eccentricity \(e = c/a = 40/50 = 0.8\).
- Step 4: Foci are at \((\pm c, 0) = (\pm 40, 0)\) km.
- Step 5: Directrices: \(x = \pm a/e = \pm 50/0.8 = \pm 62.5\) km.
REASONING: The standard form directly gives \(a\) and \(b\). The relation \(c^2 = a^2 - b^2\) comes from the definition of ellipse (sum of distances to foci is constant). Eccentricity measures deviation from circle; here \(e=0.8\) indicates a fairly elongated orbit.
ANSWER: \(e = 0.8\), foci \((\pm 40, 0)\) km, directrices \(x = \pm 62.5\) km.

## WORKED_EXAMPLE_2
PROBLEM: An elliptical arch of a bridge has a span of 20 m and a maximum height of 6 m. Find the distance from the center to each focus and the equations of the directrices.
STEPS:
- Step 1: Span = 20 m \(\Rightarrow\) semi-major axis \(a = 10\) m (horizontal). Height = 6 m \(\Rightarrow\) semi-minor axis \(b = 6\) m.
- Step 2: Verify \(a > b\): \(10 > 6\), so major axis horizontal. \(a = 10, b = 6\).
- Step 3: \(c = \sqrt{a^2 - b^2} = \sqrt{100 - 36} = \sqrt{64} = 8\) m.
- Step 4: Foci at \((\pm 8, 0)\) m from center.
- Step 5: Eccentricity \(e = c/a = 8/10 = 0.8\). Directrices: \(x = \pm a/e = \pm 10/0.8 = \pm 12.5\) m.
REASONING: The arch is a semi-ellipse; the full ellipse has the same \(a\) and \(b\). The foci are inside the arch, and directrices are vertical lines outside the arch. This information is used in structural analysis for load distribution.
ANSWER: Foci at \((\pm 8, 0)\) m, directrices \(x = \pm 12.5\) m.

## WORKED_EXAMPLE_3
PROBLEM: An ellipse has foci at \((0, \pm 5)\) and passes through the point \((3, 4)\). Find its equation, eccentricity, and directrices.
STEPS:
- Step 1: Foci on y-axis \(\Rightarrow\) major axis vertical. Standard form: \(\frac{x^2}{b^2} + \frac{y^2}{a^2} = 1\) with \(a > b\). \(c = 5\).
- Step 2: Point \((3,4)\) lies on ellipse: \(\frac{9}{b^2} + \frac{16}{a^2} = 1\). Also \(c^2 = a^2 - b^2 = 25\).
- Step 3: Let \(A = a^2, B = b^2\). Then \(A - B = 25\) and \(9/B + 16/A = 1\). Substitute \(A = B + 25\): \(9/B + 16/(B+25) = 1\).
- Step 4: Multiply by \(B(B+25)\): \(9(B+25) + 16B = B(B+25)\) \(\Rightarrow 9B + 225 + 16B = B^2 + 25B\) \(\Rightarrow 25B + 225 = B^2 + 25B\) \(\Rightarrow B^2 = 225\) \(\Rightarrow B = 15\) (positive). Then \(A = 40\).
- Step 5: \(a = \sqrt{40} = 2\sqrt{10}\), \(b = \sqrt{15}\). Eccentricity \(e = c/a = 5/(2\sqrt{10}) = \sqrt{10}/4 \approx 0.79\).
- Step 6: Directrices: \(y = \pm a/e = \pm (2\sqrt{10})/(\sqrt{10}/4) = \pm 8\).
REASONING: This problem combines the focus-directrix property with coordinate geometry. Solving for \(a^2, b^2\) uses the condition that the point satisfies the ellipse equation and the relationship \(c^2 = a^2 - b^2\).
ANSWER: Equation: \(\frac{x^2}{15} + \frac{y^2}{40} = 1\), \(e = \frac{\sqrt{10}}{4}\), directrices \(y = \pm 8\).

## COMPETENCY_QUESTION_1
QUESTION: A planet orbits the sun in an elliptical orbit with semi-major axis 10 AU and eccentricity 0.2. (1 AU = 1.5 × 10^8 km). (a) Find the distance between the foci in km. (b) The sun is at one focus. Find the minimum and maximum distances of the planet from the sun. (c) Explain why the orbit cannot be a circle.
COMPETENCY: Translating real-world situations to mathematical expressions and interpreting results in context.
STEPS:
- Step 1: Convert semi-major axis to km: \(a = 10 \times 1.5 \times 10^8 = 1.5 \times 10^9\) km.
- Step 2: Given \(e = 0.2\), find \(c = e \times a = 0.2 \times 1.5 \times 10^9 = 3 \times 10^8\) km. Distance between foci = \(2c = 6 \times 10^8\) km.
- Step 3: Minimum distance (perihelion) = \(a - c = 1.5 \times 10^9 - 3 \times 10^8 = 1.2 \times 10^9\) km. Maximum distance (aphelion) = \(a + c = 1.8 \times 10^9\) km.
- Step 4: For a circle, \(e = 0\). Here \(e = 0.2 > 0\), so orbit is elliptical, not circular.
ANSWER: (a) \(6 \times 10^8\) km, (b) min \(1.2 \times 10^9\) km, max \(1.8 \times 10^9\) km, (c) \(e \neq 0\).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A whispering gallery is designed as an elliptical hall. The foci are 4 m apart, and the maximum height of the ceiling (semi-minor axis) is 5 m. (a) Find the length of the hall (major axis). (b) If a person stands at one focus and whispers, the sound reflects to the other focus. What is the total distance traveled by the sound from one focus to the other via reflection? (c) If the hall is to be covered with acoustic panels costing ₹200 per square meter, estimate the cost to cover the curved ceiling (approximate the ellipse perimeter using Ramanujan's formula: \(P \approx \pi [3(a+b) - \sqrt{(3a+b)(a+3b)}]\)).
COMPETENCY: Applying mathematical modeling to real-world design and cost estimation, combining geometry with approximation formulas.
STEPS:
- Step 1: Foci distance = \(2c = 4\) m \(\Rightarrow c = 2\) m. Given semi-minor axis \(b = 5\) m. Since foci on major axis, \(c^2 = a^2 - b^2\) \(\Rightarrow a^2 = c^2 + b^2 = 4 + 25 = 29\) \(\Rightarrow a = \sqrt{29} \approx 5.385\) m. Major axis length = \(2a \approx 10.77\) m.
- Step 2: For any point on ellipse, sum of distances to foci = \(2a\). Sound travels from one focus to ellipse to other focus: total distance = \(2a \approx 10.77\) m.
- Step 3: Perimeter of full ellipse \(P \approx \pi [3(a+b) - \sqrt{(3a+b)(a+3b)}]\). \(a+b \approx 10.385\), \(3a+b \approx 21.155\), \(a+3b \approx 20.385\). \(P \approx \pi [31.155 - \sqrt{431.3}] \approx \pi [31.155 - 20.77] \approx \pi \times 10.385 \approx 32.63\) m. Ceiling is half-ellipse: curved length \(\approx 16.31\) m. Assume width of hall = minor axis = 10 m. Area of curved ceiling \(\approx 16.31 \times 10 = 163.1\) m². Cost \(\approx 163.1 \times 200 = ₹32,620\).
ANSWER: (a) ≈ 10.77 m, (b) ≈ 10.77 m, (c) ≈ ₹32,620.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The receiver must be placed at a ______ to collect signals.

## DIAGNOSTIC_ANSWER_7
focus

**A wrong answer ("vertex" or "centre") reveals the student has swapped the walkthrough's noun - the receiver must be placed at a focus to collect signals.** Focus is the walkthrough's own noun, and the noun is what the blank grades. Recall the elliptical dish before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
The student can compute eccentricity, coordinates of foci, and equations of directrices for any ellipse given in standard or general form, and can use these to solve real-world problems involving elliptical orbits, arches, or reflective properties.

**A wrong answer (only naming e) reveals the student has under-answered the mastery criterion.** Full mastery adds: compute the foci and directrices for either orientation, and apply them to real-world problems involving elliptical orbits, arches, or reflective properties.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: The ______ must be placed at a focus to collect signals.

## DIAGNOSTIC_ANSWER_9
receiver

**A wrong answer ("dish" or "antenna") reveals the student has swapped the walkthrough's noun - the receiver must be placed at a focus.** Receiver is the walkthrough's own noun, and the noun is what the blank grades. Recall the 10 m by 6 m dish before filling, and give the noun exactly.
