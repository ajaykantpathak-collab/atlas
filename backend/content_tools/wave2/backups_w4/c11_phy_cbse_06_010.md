## ELI5
A fan blade is a flat plate, and flatness is a licence: for any planar lamina, the out-of-plane inertia is the sum of the two in-plane ones - the perpendicular-axis sum, with the in-plane axes meeting where the perpendicular one pierces. The theorem converts one hard three-dimensional integral into two easier planar ones - but only for sheets; give the body thickness and the licence expires.

## DEFINITION
The Perpendicular Axis Theorem states that for a planar lamina (a thin, flat body), the moment of inertia about an axis perpendicular to its plane is equal to the sum of the moments of inertia about any two mutually perpendicular axes lying in the plane of the lamina and intersecting at the point where the perpendicular axis passes through. Mathematically, if a lamina lies in the xy-plane, then \( I_z = I_x + I_y \), where \( I_z \) is the moment of inertia about the z-axis (perpendicular to the plane), and \( I_x, I_y \) are moments of inertia about the x and y axes in the plane. The SI unit is kg·m². This theorem applies ONLY to planar bodies of negligible thickness.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can identify when the Perpendicular Axis Theorem is applicable (planar lamina only), correctly set up the coordinate axes with the intersection condition, and compute the moment of inertia about a perpendicular axis given the in-plane moments (or vice versa). They can also explain why the theorem fails for 3D bodies like a solid cylinder.

## SCOPE_BOUNDARY
Covers the statement, proof, conditions of applicability (planar lamina, mutually perpendicular axes intersecting at a common point), and application to symmetric planar bodies (ring, disc, rectangular plate). Does NOT cover: 3D bodies, non-planar mass distributions, or the Parallel Axis Theorem (covered in sibling node c11_phy_cbse_06_009). Limited to rotation about fixed axes as per Class 11 NCERT scope.

## WALKTHROUGH
Observe a ceiling fan blade — it's a thin, flat plate rotating about an axis perpendicular to its plane through the centre. To find its moment of inertia about that vertical axis, you could measure it directly, but the Perpendicular Axis Theorem lets you calculate it from the moments about two perpendicular axes in the blade's plane (like along its length and width). Start by confirming the body is a planar lamina (negligible thickness). Draw the lamina in the xy-plane. Identify the point where the perpendicular axis (z-axis) pierces the plane — this MUST be the intersection of your chosen x and y axes. Write \( I_z = I_x + I_y \). If the lamina has symmetry, choose axes along symmetry directions to simplify \( I_x \) and \( I_y \). This theorem converts a 3D integration problem into two simpler 2D integrations.

Takeaway: mastery means checking planarity first, placing the axes at the piercing point, and combining the theorem with symmetry to avoid integration. Exam moves: apply-the-theorem questions and why-it-fails-for-solids items. Check yourself: a solid cylinder is not a lamina - the theorem's silence there is the flagged boundary. Students miss it because they apply the sum rule on reflex, when the definition scopes it to negligible thickness: the proof lives in the flat plane, and a third dimension smuggles in mass the theorem never counted.

## DIAGNOSTIC_QUESTION_1
State the Perpendicular Axis Theorem mathematically and list the TWO essential conditions for its validity. What is the SI unit of the quantities involved?

## DIAGNOSTIC_ANSWER_1
The theorem states \( I_z = I_x + I_y \) for a planar lamina in the xy-plane. Conditions: (1) The body must be a planar lamina (negligible thickness, all mass in one plane). (2) The three axes must be mutually perpendicular, with the two in-plane axes intersecting at the point where the perpendicular axis passes through. SI unit: kg·m². A wrong answer (e.g., applying it to a solid sphere or ignoring the intersection condition) reveals the student memorised the formula without understanding the geometric constraints — they treat it as a universal algebraic identity rather than a geometric theorem with strict applicability limits.

## DIAGNOSTIC_QUESTION_2
A student claims: "For a solid cylinder of radius R and height h, the moment of inertia about its axis is \( I_z = \frac{1}{2}MR^2 \). Using the Perpendicular Axis Theorem, the moment of inertia about a diameter is \( I_x = I_y = \frac{1}{4}MR^2 \)." Is this correct? Explain why or why not.

## DIAGNOSTIC_ANSWER_2
Incorrect. The Perpendicular Axis Theorem applies ONLY to planar laminas (thin flat bodies). A solid cylinder has finite thickness — its mass is distributed in 3D, not confined to a single plane. The theorem \( I_z = I_x + I_y \) fails because \( I_x \) and \( I_y \) for a 3D body include contributions from mass elements at different z-positions, while \( I_z \) does not. The correct moment of inertia of a solid cylinder about a diameter through its centre is \( \frac{1}{4}MR^2 + \frac{1}{12}Mh^2 \) (using Parallel Axis Theorem on discs). A student making this error confuses the Perpendicular Axis Theorem (for 2D bodies) with the symmetry-based result for a thin disc, not recognising the dimensionality constraint.

## DIAGNOSTIC_QUESTION_3
A thin rectangular plate of mass M = 2.0 kg has sides a = 0.6 m and b = 0.8 m. Calculate its moment of inertia about an axis perpendicular to its plane and passing through its centre. (Given: \( I_{\text{centre, along length}} = \frac{1}{12}Ma^2 \), \( I_{\text{centre, along breadth}} = \frac{1}{12}Mb^2 \)).

## DIAGNOSTIC_ANSWER_3
Step 1: Identify given: M = 2.0 kg, a = 0.6 m, b = 0.8 m. Plate is planar → theorem applies.
Step 2: Axes: x along length a, y along breadth b, z perpendicular through centre. Intersection at centre satisfied.
Step 3: \( I_x = \frac{1}{12}Ma^2 = \frac{1}{12} \times 2.0 \times (0.6)^2 = \frac{1}{12} \times 2.0 \times 0.36 = 0.06 \) kg·m².
Step 4: \( I_y = \frac{1}{12}Mb^2 = \frac{1}{12} \times 2.0 \times (0.8)^2 = \frac{1}{12} \times 2.0 \times 0.64 = 0.1067 \) kg·m².
Step 5: \( I_z = I_x + I_y = 0.06 + 0.1067 = 0.1667 \) kg·m² ≈ 0.167 kg·m².
Wrong answer (e.g., using \( \frac{1}{12}M(a^2+b^2) \) directly without theorem, or using wrong formula for \( I_x, I_y \)) reveals confusion between the Perpendicular Axis Theorem result and the standard formula for a rectangular plate about a perpendicular axis — they don't recognise the theorem as the derivation path.

## DIAGNOSTIC_QUESTION_4
A thin uniform square plate of side L has moment of inertia \( I_0 \) about an axis perpendicular to its plane through its centre. What is its moment of inertia about an axis perpendicular to its plane through one of its corners? Use the Perpendicular Axis Theorem AND the Parallel Axis Theorem. Explain the sequence of theorems used.

## DIAGNOSTIC_ANSWER_4
Step 1: For square plate side L, mass M. About centre perpendicular axis: \( I_0 = \frac{1}{6}ML^2 \) (standard result, or via theorem: \( I_x = I_y = \frac{1}{12}ML^2 \), so \( I_0 = \frac{1}{6}ML^2 \)).
Step 2: Corner axis is parallel to centre perpendicular axis, distance \( d = \frac{L}{\sqrt{2}} \).
Step 3: Apply Parallel Axis Theorem: \( I_{\text{corner}} = I_0 + Md^2 = \frac{1}{6}ML^2 + M\left(\frac{L}{\sqrt{2}}\right)^2 = \frac{1}{6}ML^2 + \frac{1}{2}ML^2 = \frac{2}{3}ML^2 \).
Step 4: Alternatively, use Perpendicular Axis Theorem at corner: need \( I_x', I_y' \) about axes in plane through corner. By Parallel Axis Theorem on in-plane axes: \( I_x' = I_x + M(L/2)^2 = \frac{1}{12}ML^2 + \frac{1}{4}ML^2 = \frac{1}{3}ML^2 \). Similarly \( I_y' = \frac{1}{3}ML^2 \). Then \( I_{\text{corner}} = I_x' + I_y' = \frac{2}{3}ML^2 \). Same result.
Wrong sequence (e.g., applying Parallel Axis Theorem directly to \( I_x, I_y \) without shifting to corner first) reveals the student doesn't understand that the Perpendicular Axis Theorem requires the in-plane axes to intersect at the perpendicular axis point — you must shift the in-plane axes to the corner before applying the theorem.

## DIAGNOSTIC_QUESTION_5
Evaluate this statement: "The Perpendicular Axis Theorem can be used to find the moment of inertia of a thin ring about a tangent in its plane, given its moment of inertia about a diameter." Is this a valid application? Justify.

## DIAGNOSTIC_ANSWER_5
Invalid application. The Perpendicular Axis Theorem relates moments about THREE mutually perpendicular axes intersecting at a common point: one perpendicular to the plane, two in the plane. A tangent in the plane does not pass through the centre (where the perpendicular axis intersects the plane). The theorem requires the in-plane axes to intersect at the foot of the perpendicular axis. For a tangent, the intersection condition fails. To find moment of inertia about a tangent in the plane, use the Parallel Axis Theorem: \( I_{\text{tangent}} = I_{\text{diameter}} + MR^2 \). A student accepting this statement confuses the Perpendicular Axis Theorem (which connects perpendicular and in-plane axes at a point) with the Parallel Axis Theorem (which connects parallel axes). They miss the critical intersection requirement.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a rectangular cardboard sheet, a pin, and a stopwatch to verify the Perpendicular Axis Theorem experimentally. Describe the measurements and calculations needed.

## DIAGNOSTIC_ANSWER_6
Experiment: (1) Cut a uniform rectangular cardboard (planar lamina). Mark centre O. (2) Suspend it horizontally by a pin through O (axis perpendicular to plane). Give a small angular twist and measure period T_z of torsional oscillations. \( I_z \propto T_z^2 \). (3) Suspend it by a pin along a line through O in the plane (x-axis). Measure period T_x for oscillations in the plane. \( I_x \propto T_x^2 \). (4) Repeat for perpendicular in-plane axis through O (y-axis). Measure T_y. (5) Since \( I \propto T^2 \) for same torsional constant, check if \( T_z^2 = T_x^2 + T_y^2 \). Calculations: Compute \( I_x, I_y, I_z \) from geometry formulas, verify \( I_z = I_x + I_y \). A poor answer (e.g., using different suspension points for each axis, or measuring linear oscillations) reveals the student doesn't grasp that the theorem requires a COMMON intersection point for all three axes — the experimental verification must use the same point O for all three suspension axes.

## COMMON_MISCONCEPTION
Students believe the Perpendicular Axis Theorem applies to ANY body with perpendicular axes, such as a solid cube or a cylinder. They write \( I_z = I_x + I_y \) for a solid sphere or a 3D rectangular block. The exact wrong reasoning: "Since x, y, z are perpendicular axes, the theorem applies." They miss the CRITICAL condition: the body must be a PLANAR LAMINA (all mass in one plane). For a 3D body, \( I_x = \int (y^2+z^2)dm \), \( I_y = \int (x^2+z^2)dm \), \( I_z = \int (x^2+y^2)dm \). Then \( I_x + I_y = \int (x^2+y^2+2z^2)dm = I_z + 2\int z^2 dm \neq I_z \). The extra \( 2\int z^2 dm \) term is non-zero for 3D bodies. This misconception leads to errors in problems involving composite bodies (e.g., a disc with a hemisphere attached) where students blindly apply the theorem to the 3D part.

## ON_FAILURE
If the student applies the theorem to a 3D body: (1) Ask them to write the integral definitions: \( I_x = \int (y^2+z^2)dm \), \( I_y = \int (x^2+z^2)dm \), \( I_z = \int (x^2+y^2)dm \). (2) Have them compute \( I_x + I_y - I_z = 2\int z^2 dm \). (3) Ask: "For a planar lamina in xy-plane, what is z for every mass element?" Answer: z = 0. So the extra term vanishes. (4) Demonstrate with a physical rectangular block vs a thin cardboard sheet: balance a block on a pin through its centre (perpendicular to a face) — it won't balance because mass is distributed in z. The cardboard balances flat. (5) Practice: Given 5 bodies (thin ring, solid sphere, rectangular plate, solid cylinder, thin triangular lamina), have the student tick which ones satisfy the theorem. Only the ring, plate, and triangle (all planar) qualify.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_06_008, c11_phy_cbse_06_009, c11_phy_cbse_06_003, c11_phy_cbse_06_001
## PREREQUISITE_REASONS
c11_phy_cbse_06_008: Moment of Inertia definition provides the basic quantity \( I = \int r^2 dm \) and its physical meaning as rotational inertia.
c11_phy_cbse_06_009: Parallel Axis Theorem is often used in combination with Perpendicular Axis Theorem (e.g., shifting in-plane axes to a corner before applying perpendicular axis theorem).
c11_phy_cbse_06_003: Vector Product (Cross Product) is needed to understand the vector nature of angular velocity and the derivation of \( v = \omega \times r \), which underpins the moment of inertia integrals.
c11_phy_cbse_06_001: Centre of Mass concept is essential because the perpendicular axis typically passes through the centre of mass of symmetric laminas, and the in-plane axes must intersect at that point.

## FORWARD_NODE_IDS
c11_phy_cbse_06_011, c11_phy_cbse_06_013, c11_phy_cbse_06_014
## FORWARD_REASONS
c11_phy_cbse_06_011: Moment of Inertia of Common Bodies uses the Perpendicular Axis Theorem to derive moments for planar bodies (ring, disc, rectangular plate) about perpendicular axes from their in-plane moments.
c11_phy_cbse_06_013: Dynamics of Rotational Motion uses moments of inertia (often found via this theorem) in \( \tau = I\alpha \) for planar bodies rotating about perpendicular axes.
c11_phy_cbse_06_014: Rolling Motion kinetic energy calculations require moments of inertia of planar cross-sections (e.g., disc, ring) about their symmetry axes, derived using this theorem.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_12_001, c11_math_cbse_12_002
## CROSS_SUBJECT_REASONS
c11_math_ch12_001: Three-Dimensional Geometry - Understanding coordinate axes, planes, and perpendicular distances is essential for setting up the x, y, z axes correctly and visualising the intersection condition.
c11_math_ch12_002: Vector Algebra - The position vector \( \vec{r} = x\hat{i} + y\hat{j} + z\hat{k} \) and its magnitude squared \( r^2 = x^2 + y^2 + z^2 \) directly lead to the integral proof of the theorem: \( I_z = \int (x^2+y^2)dm \), \( I_x = \int (y^2+z^2)dm \), \( I_y = \int (x^2+z^2)dm \).
c11_math_cbse_12_001: Cross-subject support: A point in three-dimensional space is uniquely identified by an ordered triplet (x, y, z)... supplies tools/facts used directly in this node.  
c11_math_cbse_12_002: Cross-subject support: The distance between two points P(x₁, y₁, z₁) and Q(x₂, y₂, z₂) in three-dimensional space... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_phy_cbse_06_008 -> c11_phy_cbse_06_010 -> c11_phy_cbse_06_011 (Moment of Inertia definition enables Perpendicular Axis Theorem, which enables calculation of common bodies' moments of inertia)

## THIS_FORMULA
\( I_z = I_x + I_y \) (for a planar lamina in the xy-plane, with z-axis perpendicular to the plane through the intersection of x and y axes). SI unit: kg·m².

## FORMULA_VARIABLES
\( I_z \) = moment of inertia about axis perpendicular to the plane (kg·m²), \( I_x \) = moment of inertia about x-axis in the plane (kg·m²), \( I_y \) = moment of inertia about y-axis in the plane (kg·m²). All axes mutually perpendicular and intersect at a common point in the plane.

## FORMULA_UNITS
kg·m²

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_ch12_001 | Three-dimensional coordinate geometry provides the framework for mutually perpendicular axes and the condition that they intersect at a common point — the origin (0,0,0) in the lamina's plane.
c11_math_ch12_002 | Vector algebra gives the position vector \( \vec{r} = x\hat{i} + y\hat{j} + z\hat{k} \). The theorem's proof uses \( r^2 = x^2 + y^2 + z^2 \) and the lamina condition z=0 to show \( I_x + I_y = \int(y^2+z^2)dm + \int(x^2+z^2)dm = \int(x^2+y^2)dm = I_z \).

## PREREQ_CONCEPT
Moment of Inertia as \( I = \int r^2 dm \) where r is the perpendicular distance from the axis of rotation.

## PREREQ_BEFORE
The student must be able to set up and evaluate the integral for moment of inertia of simple planar bodies (ring, rod, rectangular plate) about axes in their plane and perpendicular to their plane.

## PREREQ_STUCK
If stuck, revisit c11_phy_cbse_06_008 (Moment of Inertia Definition) and practice calculating \( I = \int r^2 dm \) for a thin rod about its end and centre, and a thin ring about its diameter and perpendicular axis.

## WORKED_EXAMPLE_1
PROBLEM: A thin uniform square metal plate of side 40 cm and mass 3.0 kg rotates about an axis perpendicular to its plane passing through its centre. Calculate its moment of inertia about this axis. Then find the moment of inertia about an axis perpendicular to its plane passing through one of its corners.

STEPS:
- Step 1: Identify given: square plate, side L = 0.40 m, mass M = 3.0 kg. Planar lamina → Perpendicular Axis Theorem applies. Axis 1: through centre perpendicular to plane (z-axis). Axis 2: through corner perpendicular to plane (z'-axis, parallel to z-axis).
- Step 2: For centre perpendicular axis, use theorem with in-plane axes through centre along sides. \( I_x = I_y = \frac{1}{12}ML^2 \) (standard result for rod about centre, applicable to plate strip). \( I_x = I_y = \frac{1}{12} \times 3.0 \times (0.40)^2 = \frac{1}{12} \times 3.0 \times 0.16 = 0.04 \) kg·m².
- Step 3: Apply Perpendicular Axis Theorem at centre: \( I_z = I_x + I_y = 0.04 + 0.04 = 0.08 \) kg·m². (Alternatively, standard formula \( \frac{1}{6}ML^2 = \frac{1}{6} \times 3.0 \times 0.16 = 0.08 \) kg·m²).
- Step 4: For corner axis, use Parallel Axis Theorem: distance from centre to corner \( d = \frac{L}{\sqrt{2}} = \frac{0.40}{\sqrt{2}} = 0.2828 \) m. \( I_{z'} = I_z + Md^2 = 0.08 + 3.0 \times (0.2828)^2 = 0.08 + 3.0 \times 0.08 = 0.08 + 0.24 = 0.32 \) kg·m².
- Step 5: Verify using Perpendicular Axis Theorem at corner: shift in-plane axes to corner. \( I_x' = I_x + M(L/2)^2 = 0.04 + 3.0 \times (0.20)^2 = 0.04 + 0.12 = 0.16 \) kg·m². Similarly \( I_y' = 0.16 \) kg·m². Then \( I_{z'} = I_x' + I_y' = 0.32 \) kg·m². Matches.

REASONING: The Perpendicular Axis Theorem simplifies the calculation for the centre axis by reducing it to known in-plane moments. For the corner axis, we must use the Parallel Axis Theorem because the perpendicular axis is shifted. We can either shift the perpendicular axis directly (Parallel Axis Theorem on \( I_z \)) or shift the in-plane axes first and then apply Perpendicular Axis Theorem at the corner — both give the same result, confirming consistency.

ANSWER: Moment of inertia about centre perpendicular axis = 0.08 kg·m². Moment of inertia about corner perpendicular axis = 0.32 kg·m².

## WORKED_EXAMPLE_2
PROBLEM: A thin circular disc of radius R = 0.2 m and mass M = 1.5 kg has a small circular hole of radius R/4 cut out, with the hole's centre at a distance R/2 from the disc's centre. Find the moment of inertia of the remaining body about an axis perpendicular to the plane passing through the original disc's centre.

STEPS:
- Step 1: System: disc with a hole → planar lamina. Perpendicular Axis Theorem applies to the whole lamina. We need \( I_z \) about original centre O.
- Step 2: Use superposition: \( I_{\text{remaining}} = I_{\text{full disc}} - I_{\text{hole}} \) (both about O).
- Step 3: Full disc about perpendicular axis through centre: \( I_{\text{disc}} = \frac{1}{2}MR^2 = \frac{1}{2} \times 1.5 \times (0.2)^2 = 0.75 \times 0.04 = 0.03 \) kg·m².
- Step 4: Hole: radius r = R/4 = 0.05 m. Mass of hole \( m = M \times \frac{\pi r^2}{\pi R^2} = 1.5 \times \frac{1}{16} = 0.09375 \) kg. Hole's centre is at distance d = R/2 = 0.1 m from O.
- Step 5: Hole's moment about its own perpendicular axis: \( I_{\text{hole, own}} = \frac{1}{2}mr^2 = \frac{1}{2} \times 0.09375 \times (0.05)^2 = 0.000117 \) kg·m².
- Step 6: Hole's moment about O (Parallel Axis Theorem): \( I_{\text{hole, O}} = I_{\text{hole, own}} + md^2 = 0.000117 + 0.09375 \times (0.1)^2 = 0.000117 + 0.0009375 = 0.0010545 \) kg·m².
- Step 7: \( I_{\text{remaining}} = 0.03 - 0.0010545 = 0.0289455 \) kg·m² ≈ 0.0289 kg·m².

REASONING: The Perpendicular Axis Theorem is implicitly used in the standard formula \( I = \frac{1}{2}MR^2 \) for a disc about its perpendicular axis (derived from \( I_x = I_y = \frac{1}{4}MR^2 \) via the theorem). For the composite body, we use superposition of moments of inertia (valid because integrals are additive) and the Parallel Axis Theorem to shift the hole's moment to the common point O. The planar condition holds for both the disc and the hole.

ANSWER: 0.0289 kg·m²

## WORKED_EXAMPLE_3
PROBLEM: A thin uniform rectangular plate of mass M = 4.0 kg has sides a = 0.5 m and b = 1.2 m. It is free to rotate about a horizontal axis along its longer side (length b). A force of 10 N is applied perpendicular to the plate at the midpoint of the opposite longer side. Find the initial angular acceleration of the plate. (Neglect friction at the axis.)

STEPS:
- Step 1: Identify the axis of rotation: along the longer side (b = 1.2 m). This is an in-plane axis (say y-axis). The plate lies in xy-plane. We need \( I_y \) about this edge.
- Step 2: Use Perpendicular Axis Theorem to find \( I_y \) about the edge. First, find moments about centre. \( I_{x,\text{cm}} = \frac{1}{12}Ma^2 = \frac{1}{12} \times 4.0 \times (0.5)^2 = \frac{1}{12} \times 4.0 \times 0.25 = 0.0833 \) kg·m². \( I_{y,\text{cm}} = \frac{1}{12}Mb^2 = \frac{1}{12} \times 4.0 \times (1.2)^2 = \frac{1}{12} \times 4.0 \times 1.44 = 0.48 \) kg·m².
- Step 3: \( I_{z,\text{cm}} = I_{x,\text{cm}} + I_{y,\text{cm}} = 0.0833 + 0.48 = 0.5633 \) kg·m² (perpendicular axis through centre).
- Step 4: Shift \( I_y \) from centre to edge (distance a/2 = 0.25 m) using Parallel Axis Theorem: \( I_{y,\text{edge}} = I_{y,\text{cm}} + M(a/2)^2 = 0.48 + 4.0 \times (0.25)^2 = 0.48 + 4.0 \times 0.0625 = 0.48 + 0.25 = 0.73 \) kg·m².
- Step 5: Torque about the edge axis: Force F = 10 N applied at opposite edge, perpendicular to plate. Lever arm = a = 0.5 m. \( \tau = F \times a = 10 \times 0.5 = 5.0 \) N·m.
- Step 6: Angular acceleration: \( \alpha = \tau / I_{y,\text{edge}} = 5.0 / 0.73 = 6.85 \) rad/s².

REASONING: This problem combines three concepts: (1) Perpendicular Axis Theorem to get the centre perpendicular moment (though not directly used, it verifies consistency), (2) Parallel Axis Theorem to shift the in-plane axis from centre to edge, (3) Rotational dynamics \( \tau = I\alpha \). The force is perpendicular to the plate, so torque is simply force times lever arm (distance between the two longer sides). The axis is along the longer side, so the moment of inertia about that axis is needed.

ANSWER: 6.85 rad/s²

## COMPETENCY_QUESTION_1
QUESTION: A thin uniform equilateral triangular lamina of side L and mass M is free to rotate in a vertical plane about a horizontal axis along one of its sides. It is released from rest with its plane horizontal. Find the initial angular acceleration of the lamina. (Hint: Moment of inertia of equilateral triangle about an axis through its centroid and perpendicular to its plane is \( \frac{1}{12}ML^2 \). Moment of inertia about a median (in-plane axis through centroid) is \( \frac{1}{24}ML^2 \).)

COMPETENCY: Applying the Perpendicular Axis Theorem and Parallel Axis Theorem in combination to find the moment of inertia about a non-standard axis, then using rotational dynamics.

STEPS:
- Step 1: Understand the geometry: equilateral triangle, side L. Axis of rotation is along one side (in-plane axis). Need \( I_{\text{side}} \).
- Step 2: Use known moments about centroid. Perpendicular axis through centroid: \( I_{z,\text{cm}} = \frac{1}{12}ML^2 \). In-plane axis through centroid (median): \( I_{\text{median}} = \frac{1}{24}ML^2 \).
- Step 3: By Perpendicular Axis Theorem at centroid, the other in-plane axis (perpendicular to median) has \( I_{\text{other}} = I_{z,\text{cm}} - I_{\text{median}} = \frac{1}{12}ML^2 - \frac{1}{24}ML^2 = \frac{1}{24}ML^2 \). (Symmetry: both in-plane axes through centroid have same moment).
- Step 4: The axis along a side is parallel to the median through centroid. Distance from centroid to side = altitude/3 = \( \frac{\sqrt{3}}{6}L \). Use Parallel Axis Theorem: \( I_{\text{side}} = I_{\text{median}} + M\left(\frac{\sqrt{3}}{6}L\right)^2 = \frac{1}{24}ML^2 + \frac{1}{12}ML^2 = \frac{1}{8}ML^2 \).
- Step 5: Torque when plane is horizontal: weight Mg acts at centroid, perpendicular distance from side axis = altitude/3 = \( \frac{\sqrt{3}}{6}L \). \( \tau = Mg \times \frac{\sqrt{3}}{6}L \).
- Step 6: \( \alpha = \tau / I_{\text{side}} = \frac{Mg \frac{\sqrt{3}}{6}L}{\frac{1}{8}ML^2} = \frac{4\sqrt{3}g}{3L} \).

ANSWER: \( \alpha = \frac{4\sqrt{3}g}{3L} \) rad/s²
DIFFICULTY: hard

## COMPETENCY_QUESTION_2
QUESTION: A thin uniform annular disc (ring with inner radius R₁, outer radius R₂) of mass M lies in the xy-plane. Its moment of inertia about the z-axis (perpendicular through centre) is \( I_z = \frac{1}{2}M(R_1^2 + R_2^2) \). Using the Perpendicular Axis Theorem, find its moment of inertia about a diameter (x-axis). Now, a student argues: "Since the annulus is symmetric, \( I_x = I_y \), so \( I_x = \frac{1}{4}M(R_1^2 + R_2^2) \)." Is this argument fully correct? If not, what hidden assumption about the mass distribution is being made, and under what condition would it fail?

COMPETENCY: Critical evaluation of symmetry arguments combined with the Perpendicular Axis Theorem, identifying hidden assumptions.

STEPS:
- Step 1: Perpendicular Axis Theorem gives \( I_z = I_x + I_y \). For an annular disc symmetric about both x and y axes (which are perpendicular diameters), \( I_x = I_y \) by symmetry. So \( I_x = I_z/2 = \frac{1}{4}M(R_1^2 + R_2^2) \).
- Step 2: The student's argument assumes the annular disc has symmetry about the x and y axes — i.e., the mass distribution is symmetric with respect to both diameters. This is true for a uniform annulus centred at the origin.
- Step 3: The hidden assumption: the mass distribution must be symmetric under 90° rotation about the z-axis (or reflection across x and y axes). This requires the inner and outer boundaries to be concentric circles centred at the origin, and the surface density to be uniform (or at least symmetric).
- Step 4: It would fail if: (a) the inner circle is not concentric with the outer circle (eccentric annulus), (b) the density is not uniform (e.g., varies with angle θ), or (c) the axes chosen are not symmetry axes (e.g., diameters at 45° to the symmetry axes of a non-circular shape). In such cases, \( I_x \neq I_y \), and you cannot simply divide \( I_z \) by 2.
- Step 5: For an eccentric annulus, the Perpendicular Axis Theorem still holds (\( I_z = I_x + I_y \)), but \( I_x \neq I_y \). You would need to compute them separately via integration.

ANSWER: The argument is correct ONLY for a concentric uniform annulus. The hidden assumption is that the mass distribution is symmetric under 90° rotation about the perpendicular axis (or has both x and y axes as symmetry axes). It fails for eccentric annuli, non-uniform density, or non-symmetric axes.
DIFFICULTY: medium

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The Perpendicular Axis Theorem states that for a planar lamina (a thin, flat body), the moment of inertia about an axis perpendicular to its plane is equal to the sum of the moments of inertia about any two mutually perpendicular axes lying in the plane of the lamina and ______ at the point where the perpendicular axis passes through.

## DIAGNOSTIC_ANSWER_7
intersecting

**A wrong answer ("parallel" or "crossing" first) reveals the student has swapped the definition's adjective - the in-plane axes must be mutually perpendicular and intersecting.** Intersecting is the definition's own participle, and the participle is what the blank grades. Recall the piercing-point condition before filling, and give the participle exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a ceiling fan blade — it's a thin, flat plate rotating about an axis ______ to its plane through the centre.

## DIAGNOSTIC_ANSWER_8
perpendicular

**A wrong answer ("parallel" or "tangent") reveals the student has swapped the direction word - the blade rotates about an axis perpendicular to its plane.** Perpendicular is the walkthrough's own word for that axis, and the word is what the blank grades. Recall the thin-flat-plate framing before filling, and give the word exactly.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can identify when the Perpendicular Axis Theorem is applicable (planar lamina only), correctly set up the coordinate axes with the intersection condition, and compute the moment of inertia about a perpendicular axis given the in-plane moments (or vice versa).
