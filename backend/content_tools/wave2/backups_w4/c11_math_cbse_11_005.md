## ELI5
The satellite dish has a parabola's shape for a reason: every signal sliding along the curve reflects to one focus. For y^2 = 4ax the focus sits at F(a, 0), the directrix is the line x = -a behind the vertex, and the latus rectum - the chord through the focus cut perpendicular to the axis - spans from (a, 2a) to (a, -2a), a length of 4a. Flip the sign of a or swap the axes, and the same recipe follows the curve to its new opening.

## DEFINITION
A parabola is the set of all points in a plane that are equidistant from a fixed point (focus) and a fixed line (directrix). For the standard parabola \(y^2 = 4ax\) (opening right, \(a>0\)), the focus is \(F(a,0)\), the directrix is the line \(x = -a\), and the latus rectum is the chord through the focus perpendicular to the axis with length \(4a\). The endpoints of the latus rectum are \((a, 2a)\) and \((a, -2a)\).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can identify the focus, directrix, and latus rectum for any standard parabola (including \(y^2 = -4ax\), \(x^2 = 4ay\), \(x^2 = -4ay\)), compute their coordinates/equations, and use these to solve problems involving geometric properties (e.g., finding the equation given focus and directrix, or verifying if a point lies on the parabola using the focus-directrix property).

## SCOPE_BOUNDARY
Covers the four standard forms of parabola with vertex at origin and axis along coordinate axes. Does NOT cover parabolas with vertex not at origin, rotated axes, or general second-degree equations. Also does not cover parametric equations or tangent/normals (later nodes).

## WALKTHROUGH
Imagine a satellite dish shaped like a parabola: signals hitting the dish reflect to a single point (the focus). To design such a dish, engineers need the exact focus and the width of the dish at the focus (latus rectum). Start by recalling the standard equation \(y^2 = 4ax\) from the previous node. Write down the vertex \((0,0)\) and axis (x-axis). The focus is at distance \(a\) from the vertex along the axis, so \(F(a,0)\). The directrix is the vertical line at distance \(a\) on the opposite side: \(x = -a\). The latus rectum is the chord through \(F\) perpendicular to the axis; its endpoints satisfy \(y^2 = 4a(a) = 4a^2 \Rightarrow y = \pm 2a\), giving length \(4a\). Repeat this reasoning for the other three standard forms by flipping signs and swapping axes.

Takeaway: mastery means reading focus, directrix and latus rectum off all four standard forms - sign flips move the focus across the vertex, axis swaps turn x-roles into y-roles. Exam moves: identify-focus-and-directrix questions and verify-a-point items using the focus-directrix equality. Check yourself: the latus rectum is the dish's working width at the focus - that is why engineers care about 4a. Students miss it because they memorise four tables, when the definition regenerates each entry: distance a along the axis to the focus, the same a behind to the directrix, and the chord through the focus doubled twice to 4a.

## DIAGNOSTIC_QUESTION_1
For the parabola \(y^2 = -12x\), state the coordinates of the focus, the equation of the directrix, and the length of the latus rectum.

## DIAGNOSTIC_ANSWER_1
Focus: \((-3, 0)\); Directrix: \(x = 3\); Latus rectum length: \(12\). A wrong answer (e.g., focus \((3,0)\)) reveals the student does not correctly interpret the negative sign: for \(y^2 = -4ax\), the parabola opens left, so focus is \((-a,0)\) and directrix is \(x = a\).

## DIAGNOSTIC_QUESTION_2
Explain why the latus rectum of the parabola \(x^2 = 4ay\) has length \(4a\) and its endpoints are \((2a, a)\) and \((-2a, a)\).

## DIAGNOSTIC_ANSWER_2
The parabola \(x^2 = 4ay\) opens upward with focus \(F(0,a)\). The latus rectum is horizontal through \(F\), so its points satisfy \(y = a\). Substituting into \(x^2 = 4a(a) = 4a^2\) gives \(x = \pm 2a\). Thus endpoints are \((2a, a)\) and \((-2a, a)\), and length is \(4a\). A wrong answer (e.g., endpoints \((a, 2a)\)) reveals confusion between the roles of \(x\) and \(y\) when the axis is the y-axis.

## DIAGNOSTIC_QUESTION_3
A parabola has focus \(F(0, -5)\) and directrix \(y = 5\). Find its equation and the length of its latus rectum.

## DIAGNOSTIC_ANSWER_3
Vertex is midway between focus and directrix: \((0,0)\). Distance from vertex to focus is \(a = 5\) (but focus is below vertex, so parabola opens downward). Equation: \(x^2 = -4ay = -20y\). Latus rectum length = \(4a = 20\). A wrong answer (e.g., \(x^2 = 20y\)) shows the student missed the sign: focus below vertex means negative coefficient.

## DIAGNOSTIC_QUESTION_4
Compare the parabolas \(y^2 = 8x\) and \(x^2 = 8y\). How do their foci, directrices, and latus recta differ? What is the geometric relationship between them?

## DIAGNOSTIC_ANSWER_4
For \(y^2 = 8x\): \(4a=8 \Rightarrow a=2\). Focus \((2,0)\), directrix \(x=-2\), latus rectum horizontal endpoints \((2, \pm 4)\), length 8. For \(x^2 = 8y\): \(a=2\). Focus \((0,2)\), directrix \(y=-2\), latus rectum vertical endpoints \((\pm 4, 2)\), length 8. They are reflections of each other across the line \(y=x\). A wrong answer (e.g., same focus) reveals the student does not distinguish between axis along x-axis vs y-axis.

## DIAGNOSTIC_QUESTION_5
A student claims that for the parabola \(y^2 = -16x\), the focus is \((-4,0)\) and the directrix is \(x = -4\). Is the student correct? If not, identify the error and give the correct directrix.

## DIAGNOSTIC_ANSWER_5
The student is incorrect. For \(y^2 = -16x\), \(4a = 16 \Rightarrow a = 4\). The parabola opens left, so focus is \((-4,0)\) (correct), but the directrix is \(x = a = 4\), not \(x = -4\). The error is using the same sign for directrix as focus; the directrix is on the opposite side of the vertex. Correct directrix: \(x = 4\).

## DIAGNOSTIC_QUESTION_6
Create a real-world problem (Indian context) where you need to find the focus of a parabola to design a solar cooker. Specify the parabola's equation and ask for the focus coordinates. Explain why the focus is the ideal place to put the cooking pot.

## DIAGNOSTIC_ANSWER_6
Example problem: A solar cooker uses a parabolic reflector with cross-section \(y^2 = 20x\) (dimensions in cm). Where should the cooking pot be placed for maximum heat? Answer: Focus at \((5,0)\) cm from vertex. The focus is where all incoming parallel rays (sunlight) reflect to a single point, concentrating heat. A poor answer would give an equation not in standard form or misplace the focus, showing lack of understanding of the reflective property.

## COMMON_MISCONCEPTION
Students often confuse the sign of \(a\) when the parabola opens left or downward. For \(y^2 = -4ax\), they may write focus as \((a,0)\) instead of \((-a,0)\) and directrix as \(x = -a\) instead of \(x = a\). Similarly, for \(x^2 = -4ay\), they may write focus \((0,a)\) instead of \((0,-a)\). This happens because they memorize the formulas for \(y^2 = 4ax\) and do not adjust the sign based on the direction of opening.

## ON_FAILURE
Step 1: Have the student sketch the parabola roughly. Step 2: Identify the vertex and the direction of opening (right/left/up/down). Step 3: Recall that the focus is always inside the parabola at distance \(|a|\) from the vertex along the axis. Step 4: The directrix is the line perpendicular to the axis at distance \(|a|\) from the vertex on the opposite side. Step 5: Write the focus coordinates and directrix equation with correct signs. Practice with all four standard forms until the sign pattern is internalized.

## PREREQUISITE_NODE_IDS
c11_math_cbse_11_004, c9_math_ch1_1, c10_math_cbse_07_001
## PREREQUISITE_REASONS
c11_math_cbse_11_004: Provides the definition and standard equations of parabola which are essential to identify \(a\).
c9_math_ch1_1: Cartesian coordinate system is needed to plot focus, directrix, and interpret coordinates.
c10_math_cbse_07_001: Distance formula underpins the focus-directrix property (equidistance) and is used to derive latus rectum endpoints.

## FORWARD_NODE_IDS
c11_math_cbse_11_010
## FORWARD_REASONS
c11_math_cbse_11_010: Applications of conic sections (e.g., parabolic reflectors, projectile paths) require knowing focus, directrix, and latus rectum to solve real-world problems.

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_03_001, c11_phy_cbse_04_002
## CROSS_SUBJECT_REASONS
c11_physics_ch3_01: Projectile motion follows a parabolic trajectory; the focus-directrix property relates to the geometric description of the path.
c11_physics_ch4_02: Reflection properties of parabolic mirrors (focus) are used in optics and solar devices; latus rectum gives the aperture width.
c11_phy_cbse_03_001: Cross-subject support: A scalar is a physical quantity completely specified by its magnitude (a single numerical... supplies tools/facts used directly in this node.  
c11_phy_cbse_04_002: Cross-subject support: Newton's First Law of Motion (Law of Inertia) states that a body remains in its state of r... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_math_cbse_11_004 -> c11_math_cbse_11_005 -> c11_math_cbse_11_010

## THIS_FORMULA
For parabola \(y^2 = 4ax\): Focus \((a,0)\), Directrix \(x = -a\), Latus Rectum length \(= 4a\), Endpoints \((a, \pm 2a)\).
For \(y^2 = -4ax\): Focus \((-a,0)\), Directrix \(x = a\), Latus Rectum length \(= 4a\), Endpoints \((-a, \pm 2a)\).
For \(x^2 = 4ay\): Focus \((0,a)\), Directrix \(y = -a\), Latus Rectum length \(= 4a\), Endpoints \((\pm 2a, a)\).
For \(x^2 = -4ay\): Focus \((0,-a)\), Directrix \(y = a\), Latus Rectum length \(= 4a\), Endpoints \((\pm 2a, -a)\).

## FORMULA_VARIABLES
\(a\) = distance from vertex to focus (positive real number); vertex is at origin \((0,0)\); axis is x-axis for \(y^2\) forms, y-axis for \(x^2\) forms.

## FORMULA_UNITS
\(a\) is in length units (cm, m, etc.); coordinates are in same units; latus rectum length in same units.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch3_01 | Projectile motion is parabolic; the focus-directrix property gives a geometric definition used in deriving range and maximum height formulas.
c11_physics_ch4_02 | Parabolic mirrors focus parallel rays at the focus; latus rectum determines the mirror's aperture and light-gathering power.

## PREREQ_CONCEPT
Standard equations of parabola with vertex at origin and axis along coordinate axes (from c11_math_cbse_11_004).

## PREREQ_BEFORE
The student must be able to identify the standard form of a parabola and extract the value of \(a\) from the equation.

## PREREQ_STUCK
If stuck, revisit c11_math_cbse_11_004 to practice rewriting equations in standard form and identifying \(a\).

## WORKED_EXAMPLE_1
PROBLEM: A parabolic satellite dish has a cross-section modeled by \(y^2 = 12x\) (dimensions in metres). Find the coordinates of the focus where the receiver should be placed, the equation of the directrix, and the width of the dish at the focus (i.e., the latus rectum length).

STEPS:
- Step 1: Identify the standard form: \(y^2 = 4ax\) with \(4a = 12\), so \(a = 3\). The parabola opens to the right.
- Step 2: Focus is at \((a, 0) = (3, 0)\) metres from the vertex. This is where the receiver must be placed.
- Step 3: Directrix is the line \(x = -a = -3\) metres (behind the vertex).
- Step 4: Latus rectum length = \(4a = 12\) metres. This is the width of the dish at the focus.
- Step 5: Verify: Endpoints of latus rectum are \((3, \pm 6)\); they satisfy \(y^2 = 36 = 12 \times 3 = 36\). Correct.

REASONING: The standard form directly gives \(a\). The focus lies on the axis at distance \(a\) from the vertex inside the parabola. The directrix is perpendicular to the axis at distance \(a\) on the opposite side. The latus rectum is the chord through the focus perpendicular to the axis; its length is a fixed multiple of \(a\).

ANSWER: Focus: \((3, 0)\) m; Directrix: \(x = -3\) m; Latus rectum length: 12 m.

## WORKED_EXAMPLE_2
PROBLEM: Find the equation of the parabola with focus \(F(0, -4)\) and directrix \(y = 4\). Also find the length of its latus rectum.

STEPS:
- Step 1: The focus is on the y-axis below the origin, and the directrix is a horizontal line above the origin. Thus the parabola opens downward, and its axis is the y-axis.
- Step 2: Vertex is midway between focus and directrix: \((0, 0)\). Distance from vertex to focus is \(a = 4\).
- Step 3: For a downward opening parabola with vertex at origin, the standard form is \(x^2 = -4ay\). Substitute \(a = 4\): \(x^2 = -16y\).
- Step 4: Latus rectum length = \(4a = 16\) units.
- Step 5: Check: Endpoints of latus rectum are \((\pm 2a, -a) = (\pm 8, -4)\). They satisfy \(x^2 = 64 = -16(-4) = 64\). Correct.

REASONING: The vertex is always halfway between focus and directrix. The sign of the coefficient is determined by the direction of opening (negative for downward). The latus rectum length depends only on \(|a|\).

ANSWER: Equation: \(x^2 = -16y\); Latus rectum length: 16 units.

## WORKED_EXAMPLE_3
PROBLEM: A bridge arch is in the shape of a parabola with a span of 20 m and a maximum height of 5 m. The vertex is at the highest point. Find the equation of the parabola (choose coordinates conveniently), the coordinates of the focus, and the distance from the vertex to the directrix.

STEPS:
- Step 1: Place the vertex at the origin \((0,0)\) and the axis vertical. Since the arch opens downward, the equation is \(x^2 = -4ay\).
- Step 2: The span is 20 m, so the endpoints are at \(x = \pm 10\) when \(y = -5\) (since height is 5 m downward from vertex). Substitute \((10, -5)\) into \(x^2 = -4ay\): \(100 = -4a(-5) = 20a \Rightarrow a = 5\).
- Step 3: Equation: \(x^2 = -20y\).
- Step 4: Focus is at \((0, -a) = (0, -5)\) m (5 m below vertex).
- Step 5: Directrix is \(y = a = 5\) m (5 m above vertex). Distance from vertex to directrix is 5 m.
- Step 6: Verify: Latus rectum length = \(4a = 20\) m, which equals the span. This makes sense because the arch's base is at the latus rectum endpoints.

REASONING: Choosing the vertex at the highest point simplifies the equation. The given dimensions determine \(a\) by substituting a known point. The focus and directrix follow from the standard form.

ANSWER: Equation: \(x^2 = -20y\); Focus: \((0, -5)\) m; Distance from vertex to directrix: 5 m.

## COMPETENCY_QUESTION_1
QUESTION: A student is given the parabola \(x^2 = -12y\). They write: "Focus: (0, -3), Directrix: y = -3, Latus rectum: 12". Identify the error(s) in the student's answer and provide the correct focus, directrix, and latus rectum. Explain why the error is a common one.

COMPETENCY: Error identification and correction

STEPS:
- Step 1: Recognize the standard form \(x^2 = -4ay\) with \(4a = 12 \Rightarrow a = 3\).
- Step 2: The parabola opens downward, so focus is \((0, -a) = (0, -3)\) (student got this right).
- Step 3: Directrix is \(y = a = 3\) (student wrote \(y = -3\), which is on the same side as focus).
- Step 4: Latus rectum length = \(4a = 12\) (correct).
- Step 5: Explain the error: The directrix must be on the opposite side of the vertex from the focus. For downward opening, focus is below vertex, so directrix is above vertex at \(y = +a\).

ANSWER: Correct focus: \((0, -3)\); Correct directrix: \(y = 3\); Latus rectum: 12. Error: Directrix sign. The student likely memorized "directrix is y = -a" for \(x^2 = 4ay\) and did not adjust for the negative sign in the equation.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A parabolic reflector for a solar cooker is designed such that its cross-section is a parabola with latus rectum 24 cm and the focus is 6 cm from the vertex. If the reflector is to be made from a sheet of metal 30 cm wide (measured horizontally at the opening), what is the depth of the reflector (distance from vertex to the opening plane)? Assume the axis is horizontal and the parabola opens to the right.

COMPETENCY: Translating real-world situations to mathematical expressions and solving multi-step problems

STEPS:
- Step 1: Latus rectum = 24 cm = \(4a \Rightarrow a = 6\) cm. This matches the given focus distance (focus at \((a,0)\)).
- Step 2: Equation: \(y^2 = 4ax = 24x\).
- Step 3: The reflector is 30 cm wide horizontally? Wait: "30 cm wide (measured horizontally at the opening)" – if the axis is horizontal, the opening is vertical? Actually, if the parabola opens to the right, the opening is a vertical line segment. The width of the sheet metal is the vertical extent at the opening plane. Let the depth be \(d\) (distance from vertex to opening plane along the axis). At \(x = d\), the y-coordinates are \(\pm 15\) (half of 30 cm). So the point \((d, 15)\) lies on the parabola.
- Step 4: Substitute into \(y^2 = 24x\): \(225 = 24d \Rightarrow d = 225/24 = 9.375\) cm.
- Step 5: Check: The latus rectum is at \(x = 6\) and has endpoints \((6, \pm 12)\), width 24 cm. The opening at \(x = 9.375\) has width 30 cm. Depth = 9.375 cm.

REASONING: The problem combines the given latus rectum (to find \(a\)) and the opening width (to find the depth). The axis orientation determines which coordinate varies. The depth is the x-coordinate of the opening plane.

ANSWER: Depth = 9.375 cm.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: A parabola is the set of all points in a plane that are ______ from a fixed point (focus) and a fixed line (directrix).

## DIAGNOSTIC_ANSWER_7
equidistant

**A wrong answer ("close to" or "away from") reveals the student has paraphrased the definition's adjective - every parabola point is equidistant from the focus and the directrix.** Equidistant is the definition's own adjective, and the adjective is what the blank grades. Recall the satellite-dish reflection before filling, and give the adjective exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine a ______ dish shaped like a parabola: signals hitting the dish reflect to a single point (the focus).

## DIAGNOSTIC_ANSWER_8
satellite

**A wrong answer ("radar" or "curved") reveals the student has swapped the walkthrough's noun - a satellite dish shaped like a parabola reflects signals to the focus.** Satellite is the walkthrough's own noun, and the noun is what the blank grades. Recall the single reflection point before filling, and give the noun exactly.
