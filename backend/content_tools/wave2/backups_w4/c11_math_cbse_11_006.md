## ELI5
A running track bends around two flag posts: every point on the inner line keeps the sum of its distances to the two posts constant - an ellipse. Two foci instead of one centre is the whole upgrade from the circle. With the constant sum 2a, the algebra distills to x^2/a^2 + y^2/b^2 = 1 (major axis along x) or x^2/b^2 + y^2/a^2 = 1 (major axis along y), with b^2 = a^2 - c^2 linking the focus distance c to the two axes.

## DEFINITION
An ellipse is the set of all points in a plane such that the sum of their distances from two fixed points (called foci) is a constant greater than the distance between the foci. The standard equation of an ellipse centered at the origin with major axis along the x-axis is \(\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1\) where \(a > b > 0\), and with major axis along the y-axis is \(\frac{x^2}{b^2} + \frac{y^2}{a^2} = 1\) where \(a > b > 0\).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can derive the standard equation of an ellipse from its geometric definition, identify the centre, vertices, co-vertices, foci, and lengths of major and minor axes from a given standard equation, and sketch the ellipse accurately labelling all key features.

## SCOPE_BOUNDARY
This node covers the geometric definition of an ellipse, derivation of its standard equations for both horizontal and vertical major axes centred at the origin, identification of parameters \(a\), \(b\), \(c\) and their relationships (\(c^2 = a^2 - b^2\)), and graphing. It does NOT cover eccentricity, directrices, latus rectum, translated/rotated ellipses, or general second-degree equations (covered in subsequent nodes).

## WALKTHROUGH
Imagine you are designing a running track for your school's sports day. The track must be an oval shape where the total distance from two fixed flag posts to any point on the track is always the same — this is exactly an ellipse! You already know a circle is the set of points at a fixed distance from one centre (Class 9, c9_math_ch5_1). Now ask: what happens if we have TWO fixed points instead of one? Start by placing the two foci at \((-c, 0)\) and \((c, 0)\) on the x-axis. Let the constant sum of distances be \(2a\). For any point \(P(x, y)\) on the ellipse, write the distance formula to each focus, set their sum equal to \(2a\), and algebraically eliminate the square roots (isolate one radical, square, simplify, isolate the remaining radical, square again). This yields \(\frac{x^2}{a^2} + \frac{y^2}{a^2 - c^2} = 1\). Substitute \(b^2 = a^2 - c^2\) to get the standard form. The key insight: the constant sum \(2a\) becomes the major axis length, and the relationship \(c^2 = a^2 - b^2\) connects the geometry to the algebra.

Takeaway: mastery means deriving the standard equation from the constant-sum definition and reading centre, vertices, co-vertices and foci off either orientation. Exam moves: write-the-equation questions and label-the-ellipse sketch items. Check yourself: which denominator is bigger decides the major axis - a is always the larger semi-axis. Students miss it because they fix the major axis by habit, when the definition's two equations differ only in which square sits on top: compare a and b first, then label.

## DIAGNOSTIC_QUESTION_1
State the geometric definition of an ellipse and write the standard equation of an ellipse with centre at the origin, major axis along the x-axis, and semi-major axis length \(a\), semi-minor axis length \(b\).

## DIAGNOSTIC_ANSWER_1
An ellipse is the set of all points in a plane such that the sum of their distances from two fixed points (foci) is a constant greater than the distance between the foci. The standard equation is \(\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1\) with \(a > b > 0\). A wrong answer (e.g., giving the circle definition \(x^2 + y^2 = r^2\) or writing \(\frac{x^2}{b^2} + \frac{y^2}{a^2} = 1\) for horizontal major axis) reveals the student confuses the ellipse definition with a circle or does not understand which denominator corresponds to the major axis.

## DIAGNOSTIC_QUESTION_2
Explain why the constant sum of distances in the ellipse definition must be strictly greater than the distance between the two foci. What happens if the constant sum equals the distance between the foci?

## DIAGNOSTIC_ANSWER_2
If the constant sum equals the distance between the foci (\(2a = 2c \Rightarrow a = c\)), then \(b^2 = a^2 - c^2 = 0\), so the ellipse collapses to the line segment joining the foci — not a closed curve. If the sum is less than the distance between foci, no point satisfies the condition (triangle inequality). A wrong answer (e.g., "it becomes a circle" or "it's still an ellipse") shows the student has not connected the algebraic condition \(a > c\) (or \(b^2 > 0\)) to the geometric definition.

## DIAGNOSTIC_QUESTION_3
Find the centre, vertices, co-vertices, foci, and lengths of major and minor axes of the ellipse given by \(4x^2 + 9y^2 = 36\). Sketch the ellipse labelling all these features.

## DIAGNOSTIC_ANSWER_3
**Step 1:** Rewrite in standard form: divide by 36 → \(\frac{x^2}{9} + \frac{y^2}{4} = 1\).  
**Step 2:** Identify \(a^2 = 9\), \(b^2 = 4\) → \(a = 3\), \(b = 2\). Since \(a^2\) is under \(x^2\), major axis is horizontal.  
**Step 3:** Centre = \((0,0)\). Vertices = \((\pm a, 0) = (\pm 3, 0)\). Co-vertices = \((0, \pm b) = (0, \pm 2)\).  
**Step 4:** \(c^2 = a^2 - b^2 = 9 - 4 = 5\) → \(c = \sqrt{5}\). Foci = \((\pm \sqrt{5}, 0)\).  
**Step 5:** Major axis length = \(2a = 6\), minor axis length = \(2b = 4\).  
**Sketch:** Draw axes, mark vertices at \((\pm3,0)\), co-vertices at \((0,\pm2)\), foci at \((\pm\sqrt{5},0) \approx (\pm2.24,0)\), draw smooth oval.  
A wrong answer (e.g., vertices at \((0,\pm3)\) or \(c^2 = a^2 + b^2 = 13\)) reveals confusion about which denominator is \(a^2\) or mixing up the ellipse/hyperbola relationship.

## DIAGNOSTIC_QUESTION_4
Compare the equations \(\frac{x^2}{16} + \frac{y^2}{25} = 1\) and \(\frac{x^2}{25} + \frac{y^2}{16} = 1\). How are their graphs related? Without plotting, determine which ellipse has its foci on the x-axis and which on the y-axis.

## DIAGNOSTIC_ANSWER_4
Both ellipses have the same semi-axis lengths (\(a=5, b=4\)) but swapped denominators. The first has \(a^2=25\) under \(y^2\) → major axis vertical, foci on y-axis at \((0,\pm3)\). The second has \(a^2=25\) under \(x^2\) → major axis horizontal, foci on x-axis at \((\pm3,0)\). They are reflections of each other across the line \(y=x\). A wrong answer (e.g., "both have foci on x-axis" or "first has foci on x-axis") shows the student does not recognise that the larger denominator determines the major axis direction.

## DIAGNOSTIC_QUESTION_5
A student writes the standard equation of an ellipse with vertices \((\pm 5, 0)\) and foci \((\pm 4, 0)\) as \(\frac{x^2}{16} + \frac{y^2}{25} = 1\). Is this correct? If not, identify the error and give the correct equation.

## DIAGNOSTIC_ANSWER_5
**Incorrect.** The student swapped \(a^2\) and \(b^2\). Vertices \((\pm5,0)\) mean \(a=5\) → \(a^2=25\). Foci \((\pm4,0)\) mean \(c=4\) → \(c^2=16\). Then \(b^2 = a^2 - c^2 = 25 - 16 = 9\). Since major axis is horizontal, the correct equation is \(\frac{x^2}{25} + \frac{y^2}{9} = 1\). The student's equation has \(a^2=16\) (under \(y^2\)) which would give vertices \((0,\pm4)\) and foci \((0,\pm\sqrt{7})\) — a completely different ellipse. This error reveals the student memorises the formula without understanding which parameter corresponds to which geometric feature.

## DIAGNOSTIC_QUESTION_6
Construct a real-world problem (with numerical values) that requires finding the standard equation of an ellipse given its geometric description. The problem must involve an Indian context (e.g., a whispering gallery in a historical monument, a planetary orbit, or a sports stadium design).

## DIAGNOSTIC_ANSWER_6
**Example problem:** "The Gol Gumbaz in Vijayapura has a whispering gallery shaped as an ellipse. The two foci are 10 metres apart. A person standing at one focus whispers, and the sound reflects off the curved wall to be heard clearly at the other focus. If the total path length of the sound from one focus to the wall and to the other focus is 26 metres, find the standard equation of the ellipse (assume centre at origin, major axis horizontal)."  
**Solution:** Distance between foci = \(2c = 10\) → \(c = 5\). Constant sum = \(2a = 26\) → \(a = 13\). Then \(b^2 = a^2 - c^2 = 169 - 25 = 144\). Equation: \(\frac{x^2}{169} + \frac{y^2}{144} = 1\).  
A poor answer (e.g., using \(a=10, c=26\) or giving a circle equation) reveals the student cannot translate the verbal description into the parameters \(a, b, c\) and their geometric meanings.

## COMMON_MISCONCEPTION
Students consistently confuse the relationship \(c^2 = a^2 - b^2\) for ellipses with \(c^2 = a^2 + b^2\) for hyperbolas. For example, given vertices \((\pm5,0)\) and foci \((\pm4,0)\), a student computes \(b^2 = a^2 + c^2 = 25 + 16 = 41\) and writes \(\frac{x^2}{25} + \frac{y^2}{41} = 1\). This is wrong because it makes \(b > a\), contradicting the definition of \(a\) as the semi-major axis. The error stems from memorising formulas without understanding that for an ellipse, the foci lie *inside* the vertices on the major axis, so \(c < a\) and \(b^2 = a^2 - c^2\) must be positive but smaller than \(a^2\).

## ON_FAILURE
1. **Revisit the geometric definition:** Draw an ellipse with foci \(F_1, F_2\) and a point \(P\) on it. Measure \(PF_1 + PF_2 = 2a\). Show that the distance from centre to focus is \(c\), and from centre to vertex is \(a\). Since \(F_1\) and \(F_2\) lie *between* the vertices, \(c < a\).  
2. **Derive \(b^2 = a^2 - c^2\) again:** Start from the right triangle formed by the centre, a co-vertex \((0,b)\), and a focus \((c,0)\). By Pythagoras, \(b^2 + c^2 = a^2\) (because the distance from focus to co-vertex equals \(a\) — prove this using the definition with \(P = (0,b)\)).  
3. **Practice with a table:** Create a 3-column table: Given (vertices, foci, or \(a,c\)), Find (\(b^2\)), Equation. Do 5 examples where you explicitly write "Since \(c < a\), we use \(b^2 = a^2 - c^2\)" each time.  
4. **Contrast with hyperbola:** Write both relationships side by side and note: "Ellipse: foci inside vertices → subtract. Hyperbola: foci outside vertices → add."

## PREREQUISITE_NODE_IDS
c11_math_cbse_11_001, c11_math_cbse_11_002, c11_math_cbse_11_004, c9_math_ch1_4, c10_math_cbse_07_001, c9_math_ch5_1

## PREREQUISITE_REASONS
c11_math_cbse_11_001: Provides the general definition of conic sections and the focus-directrix property that contextualises the ellipse definition.
c11_math_cbse_11_002: Circle is a special case of ellipse (\(a=b\)); understanding the circle equation \(x^2+y^2=r^2\) helps see the ellipse as a stretched circle.
c11_math_cbse_11_004: Parabola derivation uses the same distance-formula technique (isolate radical, square, simplify) which is reused for ellipse.
c9_math_ch1_4: Distance formula in 2D is essential for writing \(PF_1 + PF_2 = 2a\) algebraically.
c10_math_cbse_07_001: Reinforces distance formula and coordinate geometry skills needed for the derivation.
c9_math_ch5_1: lipse! You already know a circle is the set of points at a fixed distance from one centre (Class 9, c9_math_ch5_1). Now ask: what happens if we have TWO fixed points instead of one? Start by placing the two foci at \((-c, 0)\) and \((c, 0)\  

## FORWARD_NODE_IDS
c11_math_cbse_11_007, c11_math_cbse_11_010, c11_math_cbse_11_008, c12_math_cbse_08_005, c12_math_cbse_08_006

## FORWARD_REASONS
c11_math_cbse_11_007: The parameters \(a, b, c\) and the standard equation derived here are used to define eccentricity \(e = c/a\), find directrices \(x = \pm a/e\), and compute latus rectum \(2b^2/a\).
c11_math_cbse_11_010: Real-world applications (planetary orbits, whispering galleries, elliptical gears) require the standard equation and geometric parameters mastered in this node.
c11_math_cbse_11_008: Covers ellipse definition and standard equation; the derivation technique (distance formula, squaring) is similar, and comparing ellipse vs hyperbola relationships (\(c^2 = a^2 \pm b^2\)) is crucial.  
c12_math_cbse_08_005: gives the standard equation of an ellipse, its semi-axes, and symmetry.  
c12_math_cbse_08_006: Ellipse standard equation and properties.  

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_08_001, c11_phy_cbse_08_002
## CROSS_SUBJECT_REASONS
c11_physics_ch8_1: Kepler's First Law states planets orbit the sun in ellipses with the sun at one focus — directly uses the ellipse definition and parameters \(a, c, e\).
c11_physics_ch8_2: Gravitational potential energy and orbital velocity calculations in elliptical orbits require the semi-major axis \(a\) and distance \(r\) from focus, connecting to the ellipse equation.
c11_phy_cbse_08_001: Cross-subject support: Stress is the internal restoring force per unit cross-sectional area developed within a ma... supplies tools/facts used directly in this node.  
c11_phy_cbse_08_002: Cross-subject support: Strain is the dimensionless measure of deformation representing the fractional change in a... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_math_cbse_11_001 -> c11_math_cbse_11_006 -> c11_math_cbse_11_007

## THIS_FORMULA
Standard equation (horizontal major axis): \(\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1\), \(a > b > 0\)  
Standard equation (vertical major axis): \(\frac{x^2}{b^2} + \frac{y^2}{a^2} = 1\), \(a > b > 0\)  
Relationship: \(c^2 = a^2 - b^2\) where \(c\) = distance from centre to focus

## FORMULA_VARIABLES
\(a\) = semi-major axis length (half the length of the major axis), \(b\) = semi-minor axis length (half the length of the minor axis), \(c\) = distance from centre to each focus, \(x, y\) = coordinates of any point on the ellipse

## FORMULA_UNITS
All lengths (\(a, b, c, x, y\)) are in the same linear units (metres, cm, km, etc.). The equation is dimensionless (ratio of lengths squared).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch8_1 | Kepler's First Law: planetary orbits are ellipses with the sun at one focus; the semi-major axis \(a\) determines the orbital period via Kepler's Third Law (\(T^2 \propto a^3\)).
c11_physics_ch8_2 | In gravitational potential energy \(U = -GMm/r\) for elliptical orbits, the distance \(r\) from the focus varies; the total energy depends only on \(a\): \(E = -GMm/(2a)\).

## PREREQ_CONCEPT
Distance formula in coordinate geometry and algebraic manipulation of radical equations (isolating and squaring square roots).

## PREREQ_BEFORE
The student must be able to write the distance between two points \((x_1,y_1)\) and \((x_2,y_2)\) as \(\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}\) and solve equations involving two square roots by repeated squaring.

## PREREQ_STUCK
If stuck, revisit the distance formula (c9_math_ch1_4) and practice solving equations like \(\sqrt{x^2 + (y-3)^2} + \sqrt{x^2 + (y+3)^2} = 10\) by isolating one radical, squaring, simplifying, and squaring again.

## WORKED_EXAMPLE_1
PROBLEM: The arch of a bridge in Delhi is shaped like a semi-ellipse. The span (width) of the bridge is 20 metres and the maximum height at the centre is 6 metres. Find the standard equation of the full ellipse (assuming the centre is at the origin and the major axis is horizontal). How high is the arch 4 metres from the centre?

STEPS:
- Step 1: Identify the given geometric information. The span is the major axis length = 20 m, so semi-major axis \(a = 10\) m. The maximum height is the semi-minor axis \(b = 6\) m. The centre is at the origin, major axis horizontal.
- Step 2: Write the standard equation for horizontal major axis: \(\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1\). Substitute \(a = 10\), \(b = 6\): \(\frac{x^2}{100} + \frac{y^2}{36} = 1\).
- Step 3: To find the height 4 metres from the centre, substitute \(x = 4\) into the equation: \(\frac{4^2}{100} + \frac{y^2}{36} = 1\) → \(\frac{16}{100} + \frac{y^2}{36} = 1\).
- Step 4: Solve for \(y^2\): \(\frac{y^2}{36} = 1 - \frac{16}{100} = \frac{84}{100} = \frac{21}{25}\). So \(y^2 = 36 \times \frac{21}{25} = \frac{756}{25} = 30.24\).
- Step 5: Take the positive square root (since we want the height above the x-axis): \(y = \sqrt{30.24} \approx 5.5\) m. The arch is about 5.5 metres high at 4 metres from the centre.

REASONING: The bridge span corresponds to the major axis because it's the longer dimension (20 m > 6 m). The standard form directly uses \(a\) and \(b\) as the semi-axis lengths. Substituting a specific \(x\) gives the corresponding \(y\)-coordinate on the ellipse, which is the height at that horizontal distance.

ANSWER: Equation: \(\frac{x^2}{100} + \frac{y^2}{36} = 1\); Height at \(x = 4\) m is approximately 5.5 m.

## WORKED_EXAMPLE_2
PROBLEM: An ellipse has foci at \((\pm 3, 0)\) and passes through the point \((4, 2)\). Find its standard equation.

STEPS:
- Step 1: From the foci \((\pm 3, 0)\), the centre is \((0,0)\), major axis is horizontal, and \(c = 3\). The standard form is \(\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1\) with \(a > b\) and \(c^2 = a^2 - b^2\).
- Step 2: The point \((4, 2)\) lies on the ellipse, so it satisfies the equation: \(\frac{16}{a^2} + \frac{4}{b^2} = 1\). Also, \(b^2 = a^2 - c^2 = a^2 - 9\).
- Step 3: Substitute \(b^2 = a^2 - 9\) into the point equation: \(\frac{16}{a^2} + \frac{4}{a^2 - 9} = 1\).
- Step 4: Multiply through by \(a^2(a^2 - 9)\): \(16(a^2 - 9) + 4a^2 = a^2(a^2 - 9)\). Simplify: \(16a^2 - 144 + 4a^2 = a^4 - 9a^2\) → \(20a^2 - 144 = a^4 - 9a^2\).
- Step 5: Rearrange: \(a^4 - 29a^2 + 144 = 0\). Let \(u = a^2\): \(u^2 - 29u + 144 = 0\). Factor: \((u - 16)(u - 9) = 0\) → \(u = 16\) or \(u = 9\).
- Step 6: Since \(a > c = 3\), we need \(a^2 > 9\). So \(a^2 = 16\) (reject \(a^2 = 9\)). Then \(b^2 = a^2 - 9 = 7\).
- Step 7: The standard equation is \(\frac{x^2}{16} + \frac{y^2}{7} = 1\).

REASONING: The foci give \(c\) and the orientation. The point on the ellipse gives a second equation linking \(a\) and \(b\). Using \(c^2 = a^2 - b^2\) eliminates \(b\), yielding a quadratic in \(a^2\). We reject \(a^2 = 9\) because it would make \(b = 0\) (degenerate ellipse) and violates \(a > c\).

ANSWER: \(\frac{x^2}{16} + \frac{y^2}{7} = 1\)

## WORKED_EXAMPLE_3
PROBLEM: A satellite orbits Earth in an elliptical path with Earth at one focus. The semi-major axis of the orbit is 10,000 km and the eccentricity is 0.6. (Note: eccentricity \(e = c/a\)). Find the standard equation of the orbit (centre at origin, major axis horizontal). Also find the closest and farthest distances of the satellite from Earth's centre.

STEPS:
- Step 1: Given \(a = 10,000\) km, \(e = 0.6\). Compute \(c = ae = 10,000 \times 0.6 = 6,000\) km.
- Step 2: Compute \(b^2 = a^2 - c^2 = (10,000)^2 - (6,000)^2 = 100,000,000 - 36,000,000 = 64,000,000\). So \(b = 8,000\) km.
- Step 3: Standard equation (horizontal major axis): \(\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1\) → \(\frac{x^2}{10^8} + \frac{y^2}{6.4 \times 10^7} = 1\) (or \(\frac{x^2}{10000^2} + \frac{y^2}{8000^2} = 1\)).
- Step 4: Earth is at one focus. For horizontal major axis, foci are at \((\pm c, 0) = (\pm 6000, 0)\). Assume Earth is at the right focus \((6000, 0)\).
- Step 5: Closest distance (periapsis) = distance from right focus to right vertex = \(a - c = 10,000 - 6,000 = 4,000\) km.
- Step 6: Farthest distance (apoapsis) = distance from right focus to left vertex = \(a + c = 10,000 + 6,000 = 16,000\) km.

REASONING: This problem combines the ellipse geometry (node c11_math_cbse_11_006) with the eccentricity concept (node c11_math_cbse_11_007). The eccentricity \(e = c/a\) links the shape to the focus position. The periapsis and apoapsis are simply \(a \mp c\) because the vertices are at \((\pm a, 0)\) and the focus is at \((c, 0)\).

ANSWER: Equation: \(\frac{x^2}{10^8} + \frac{y^2}{6.4 \times 10^7} = 1\); Closest distance = 4,000 km; Farthest distance = 16,000 km.

## COMPETENCY_QUESTION_1
QUESTION: A student claims that the ellipse \(\frac{x^2}{9} + \frac{y^2}{25} = 1\) has its major axis along the x-axis because "9 comes first in the equation". Is the student correct? Justify your answer by identifying the actual major axis, vertices, and foci of this ellipse.

COMPETENCY: Comparing and justifying mathematical claims using definitions and algebraic reasoning

STEPS:
- Step 1: Identify the denominators: under \(x^2\) is 9, under \(y^2\) is 25.
- Step 2: Recall that the larger denominator corresponds to \(a^2\) (semi-major axis squared). Here \(25 > 9\), so \(a^2 = 25\) is under \(y^2\).
- Step 3: Therefore the major axis is vertical (along the y-axis), not horizontal.
- Step 4: Vertices are at \((0, \pm a) = (0, \pm 5)\). Foci: \(c^2 = a^2 - b^2 = 25 - 9 = 16\) → \(c = 4\), foci at \((0, \pm 4)\).
- Step 5: Conclude the student is incorrect; the order of terms does not determine the major axis — the relative sizes of the denominators do.

ANSWER: The student is incorrect. The major axis is vertical (along the y-axis) because the larger denominator (25) is under \(y^2\). Vertices: \((0, \pm 5)\); Foci: \((0, \pm 4)\).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A rectangular garden in a school is to be redesigned as an elliptical flower bed. The garden is 16 m long and 12 m wide. The design requires two sprinklers placed at the foci of the ellipse. (a) Find the standard equation of the ellipse (centre at origin, major axis along the length). (b) How far from the centre should each sprinkler be placed? (c) A gardener walks along the perimeter of the ellipse. If he starts at one end of the major axis and walks to the other end along the ellipse, what is the total distance he walks? (Note: The perimeter of an ellipse has no simple exact formula; use the approximation \(P \approx \pi \left[ 3(a+b) - \sqrt{(3a+b)(a+3b)} \right]\) by Ramanujan.)

COMPETENCY: Translating real-world situations to mathematical expressions and applying approximation formulas

STEPS:
- Step 1: Length = 16 m = major axis length → \(2a = 16\) → \(a = 8\). Width = 12 m = minor axis length → \(2b = 12\) → \(b = 6\). Major axis horizontal.
- Step 2: (a) Standard equation: \(\frac{x^2}{64} + \frac{y^2}{36} = 1\).
- Step 3: (b) \(c^2 = a^2 - b^2 = 64 - 36 = 28\) → \(c = \sqrt{28} = 2\sqrt{7} \approx 5.29\) m. Sprinklers at \((\pm 2\sqrt{7}, 0)\), so \(2\sqrt{7}\) m from centre.
- Step 4: (c) The gardener walks half the perimeter (from one vertex to the other along the ellipse). Full perimeter \(P \approx \pi \left[ 3(8+6) - \sqrt{(24+6)(8+18)} \right] = \pi \left[ 42 - \sqrt{30 \times 26} \right] = \pi \left[ 42 - \sqrt{780} \right] \approx \pi [42 - 27.93] \approx 3.1416 \times 14.07 \approx 44.2\) m. Half perimeter ≈ 22.1 m.
- Step 5: Interpret: The gardener walks approximately 22.1 metres.

ANSWER: (a) \(\frac{x^2}{64} + \frac{y^2}{36} = 1\); (b) \(2\sqrt{7}\) m (≈ 5.29 m) from centre; (c) ≈ 22.1 m (half the elliptical perimeter).

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: An ellipse is the set of all points in a plane such that the sum of their ______ from two fixed points (called foci) is a constant greater than the distance between the foci.

## DIAGNOSTIC_ANSWER_7
distances

**A wrong answer ("difference" or "ratio") reveals the student has swapped the definition's noun - an ellipse keeps the sum of distances from two foci constant.** Distances is the definition's own noun, and the noun is what the blank grades. Recall the running-track picture before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are designing a running track for your ______'s sports day.

## DIAGNOSTIC_ANSWER_8
school

**A wrong answer ("college" or "class") reveals the student has swapped the walkthrough's noun - you are designing a running track for your school's sports day.** School is the walkthrough's own noun, and the noun is what the blank grades. Recall the two flag posts before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can derive the standard equation of an ellipse from its geometric definition, identify the centre, vertices, co-vertices, foci, and lengths of major and minor axes from a given standard equation, and sketch the ellipse accurately labelling all key features.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Imagine you are ______ a running track for your school's sports day.

## DIAGNOSTIC_ANSWER_10
designing

**A wrong answer ("building" or "planning") reveals the student has paraphrased the walkthrough's participle - you are designing the running track for sports day.** Designing is the walkthrough's own participle, and the participle is what the blank grades. Recall the constant-sum rule before filling, and fill the word exactly as written.
