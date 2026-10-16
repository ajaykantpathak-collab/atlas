## ELI5
Detach the fan blade and spin it about an edge - it fights harder, and the theorem prices the fight: the new inertia is the centre-of-mass value plus total mass times the offset squared. Shift the axis a distance d and the cross terms cancel by the centre-of-mass definition, leaving pure addition. The catch: one axis must pass through the centre of mass, always.

## DEFINITION
The Parallel Axis Theorem states that the moment of inertia \(I\) of a rigid body about any axis is equal to the moment of inertia \(I_{\text{cm}}\) about a parallel axis passing through its centre of mass plus the product of the total mass \(M\) of the body and the square of the perpendicular distance \(d\) between the two parallel axes. Mathematically, \(I = I_{\text{cm}} + M d^2\). The SI unit of moment of inertia is \(\text{kg}\,\text{m}^2\). This theorem applies only when one of the two parallel axes passes through the centre of mass of the body.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can correctly calculate the moment of inertia of a rigid body about an axis parallel to one through its centre of mass, given \(I_{\text{cm}}\), \(M\), and \(d\). The student can also explain why the theorem requires one axis to pass through the centre of mass and identify the perpendicular distance \(d\) in a diagram.

## SCOPE_BOUNDARY
This node covers the statement, proof, and application of the Parallel Axis Theorem for rigid bodies rotating about a fixed axis. It does NOT cover the Perpendicular Axis Theorem (which applies only to planar laminae) or the calculation of \(I_{\text{cm}}\) for complex shapes by integration (those are in subsequent nodes). The theorem is valid for any rigid body, but the axis must be fixed in direction relative to the body.

## WALKTHROUGH
Observe a ceiling fan in an Indian household: the blades rotate about the central axis through the motor (centre of mass). Now imagine the same fan blade detached and rotating about a parallel axis at its edge – like a wheel rotating about a point on its rim. The resistance to rotation (moment of inertia) increases. To quantify this increase, we start from the definition of moment of inertia \(I = \sum m_i r_i^2\) (from node c11_phy_cbse_06_008). We shift the axis by a distance \(d\) and express the new distances in terms of the old distances from the centre-of-mass axis. Using the definition of centre of mass (\(\sum m_i r_{i,\text{cm}} = 0\)), the cross-term vanishes, leaving the simple additive term \(M d^2\). This yields the Parallel Axis Theorem: \(I = I_{\text{cm}} + M d^2\).

Takeaway: mastery means applying the theorem with the correct d, spotting when the centre-of-mass condition is met, and explaining why the cross term dies. Exam moves: shift-the-axis questions and validate-the-use items. Check yourself: parallel is not enough - the centre-of-mass anchor is the licence, and skipping the check is the flagged error. Students miss it because the formula looks unconditional, when the definition's derivation leans on the vanishing centred sum: that cancellation is exactly what the centre-of-mass axis buys, and no other axis pays the same discount.

## DIAGNOSTIC_QUESTION_1
State the Parallel Axis Theorem formula and name each variable with its SI unit.

## DIAGNOSTIC_ANSWER_1
The formula is \(I = I_{\text{cm}} + M d^2\), where \(I\) is the moment of inertia about the given axis (\(\text{kg}\,\text{m}^2\)), \(I_{\text{cm}}\) is the moment of inertia about a parallel axis through the centre of mass (\(\text{kg}\,\text{m}^2\)), \(M\) is the total mass of the body (\(\text{kg}\)), and \(d\) is the perpendicular distance between the two parallel axes (\(\text{m}\)). A wrong answer (e.g., missing \(I_{\text{cm}}\) or using \(d\) instead of \(d^2\)) reveals that the student has memorised the formula incorrectly or does not understand the physical meaning of each term.

## DIAGNOSTIC_QUESTION_2
Why must one of the two parallel axes pass through the centre of mass for the Parallel Axis Theorem to hold? Explain using the derivation step where the cross-term vanishes.

## DIAGNOSTIC_ANSWER_2
In the derivation, we write the distance from the new axis as \(r_i = \sqrt{(r_{i,\text{cm}} + d)^2}\) (for perpendicular displacement). Expanding \(I = \sum m_i (r_{i,\text{cm}}^2 + d^2 + 2 \vec{r}_{i,\text{cm}} \cdot \vec{d})\) gives a cross-term \(2 \vec{d} \cdot \sum m_i \vec{r}_{i,\text{cm}}\). This sum is zero **only** when the origin is the centre of mass, by definition \(\sum m_i \vec{r}_{i,\text{cm}} = 0\). If the reference axis is not through the CM, the cross-term does not vanish and the simple formula \(I = I_{\text{cm}} + M d^2\) fails. A wrong answer indicates the student does not grasp the mathematical necessity of the CM condition.

## DIAGNOSTIC_QUESTION_3
A uniform thin rod of mass \(2.0\,\text{kg}\) and length \(1.0\,\text{m}\) has a moment of inertia \(I_{\text{cm}} = \frac{1}{12}ML^2\) about an axis through its centre perpendicular to its length. Use the Parallel Axis Theorem to find its moment of inertia about a parallel axis through one end. Show all steps with units.

## DIAGNOSTIC_ANSWER_3
**Step 1:** Identify given: \(M = 2.0\,\text{kg}\), \(L = 1.0\,\text{m}\), \(I_{\text{cm}} = \frac{1}{12}ML^2\).  
**Step 2:** Distance between axes \(d = L/2 = 0.50\,\text{m}\) (from centre to end).  
**Step 3:** Formula: \(I = I_{\text{cm}} + M d^2\).  
**Step 4:** Substitute:  
\(I_{\text{cm}} = \frac{1}{12} \times 2.0 \times (1.0)^2 = \frac{2.0}{12} = 0.1667\,\text{kg}\,\text{m}^2\).  
\(M d^2 = 2.0 \times (0.50)^2 = 2.0 \times 0.25 = 0.50\,\text{kg}\,\text{m}^2\).  
**Step 5:** \(I = 0.1667 + 0.50 = 0.6667\,\text{kg}\,\text{m}^2 \approx 0.67\,\text{kg}\,\text{m}^2\).  
A wrong answer (e.g., using \(d = L\) or forgetting to square \(d\)) shows the student cannot identify the correct perpendicular distance or mishandles units.

## DIAGNOSTIC_QUESTION_4
A solid disc of mass \(M\) and radius \(R\) has \(I_{\text{cm}} = \frac{1}{2}MR^2\) about its central perpendicular axis. A student claims the moment of inertia about a parallel axis tangent to the rim (touching the edge) is \(I = \frac{1}{2}MR^2 + M(2R)^2\). Is the student correct? Justify your answer.

## DIAGNOSTIC_ANSWER_4
The student is **incorrect**. The perpendicular distance \(d\) between the central axis and a parallel axis tangent to the rim is exactly the radius \(R\), not the diameter \(2R\). The tangent axis touches the circle at one point; the shortest distance between the two parallel lines (axes) is \(R\). The correct formula is \(I = \frac{1}{2}MR^2 + M R^2 = \frac{3}{2}MR^2\). A wrong answer reveals the student confuses the diameter with the perpendicular distance between parallel axes.

## DIAGNOSTIC_QUESTION_5
A rectangular lamina of mass \(M\) has moment of inertia \(I_{\text{cm}}\) about an axis through its centre perpendicular to its plane. A second axis is parallel to the first but passes through one corner of the rectangle. The distance between the axes is \(d\). If the lamina is cut into two identical halves along a line parallel to the axes, and one half is removed, how does the moment of inertia of the remaining half about the corner axis change? Explain without calculation.

## DIAGNOSTIC_ANSWER_5
The moment of inertia of the remaining half about the corner axis will be **less than half** of the original \(I\) about that axis. Reason: The Parallel Axis Theorem applies to the whole body. For the half-lamina, its own centre of mass shifts, and its mass becomes \(M/2\). The new \(I' = I'_{\text{cm}} + (M/2)d'^2\). Since mass is halved and the distribution is no longer symmetric about the original centre, \(I'_{\text{cm}}\) is not simply \(I_{\text{cm}}/2\), and \(d'\) (distance from new CM to corner axis) is different from \(d\). The student must recognise that the theorem must be reapplied to the new body with its new CM and mass; one cannot just halve the original total \(I\). A wrong answer (e.g., "it becomes exactly half") shows the student treats the theorem as a linear scaling rule without considering the shift in centre of mass.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a metre scale (uniform rod) and a stopwatch to verify the Parallel Axis Theorem. Describe the setup, measurements, and how you would compare experimental and theoretical values.

## DIAGNOSTIC_ANSWER_6
**Setup:** Suspend the metre scale horizontally by a thin string at its centre (CM) and set it into small torsional oscillations; measure period \(T_{\text{cm}}\). Then suspend it at a distance \(d\) from the centre (e.g., at the 20 cm mark) and measure period \(T_d\).  
**Theory:** For a torsional pendulum, \(T = 2\pi \sqrt{I/\kappa}\), where \(\kappa\) is the torsion constant of the string. Thus \(I \propto T^2\).  
**Verification:** Calculate \(I_{\text{cm}} = \frac{1}{12}ML^2\). Predict \(I_d = I_{\text{cm}} + M d^2\). Experimentally, \(I_d / I_{\text{cm}} = (T_d / T_{\text{cm}})^2\). Compare the ratio.  
**Good answer criteria:** Identifies torsional oscillation method, correctly relates period to moment of inertia, uses the same string (constant \(\kappa\)), and compares ratios. A poor answer (e.g., using a simple pendulum formula or ignoring the torsion constant) reveals confusion between translational and rotational oscillation physics.

## COMMON_MISCONCEPTION
Students often believe the Parallel Axis Theorem can be applied between **any two parallel axes** (e.g., from an axis at one end to an axis at 1/3 length) by using the distance between those two axes directly. They forget that the formula \(I = I_{\text{cm}} + M d^2\) **requires \(I_{\text{cm}}\) to be the moment of inertia about the axis through the centre of mass**. If neither axis passes through the CM, one must first find \(I_{\text{cm}}\) (by subtracting \(M d_1^2\) from the known \(I_1\)) and then add \(M d_2^2\) for the second axis. Another error: using the distance **along the body** (e.g., along the rod) instead of the **perpendicular distance** between the axes.

## ON_FAILURE
1. Re-derive the theorem on paper: write \(I = \sum m_i (\vec{r}_{i,\text{cm}} + \vec{d})^2\), expand, and explicitly show the cross-term \(\sum m_i \vec{r}_{i,\text{cm}} = 0\) only at the CM.  
2. Draw a diagram of a rod with three parallel axes: through CM, through one end, and through a point at 1/3 length. Label perpendicular distances \(d_1\) and \(d_2\). Practice calculating \(I\) at the 1/3 point by first finding \(I_{\text{cm}}\) from the end-axis value.  
3. Solve a numerical problem where the given axis is NOT through the CM (e.g., "A rod has \(I = 0.5\,\text{kg}\,\text{m}^2\) about an axis 0.2 m from its centre. Find \(I\) about a parallel axis 0.5 m from the centre."). This forces the two-step process: find \(I_{\text{cm}}\), then find new \(I\).

## PREREQUISITE_NODE_IDS
c11_phy_cbse_06_008, c11_phy_cbse_06_001, c11_phy_cbse_06_003, c11_phy_cbse_06_004
## PREREQUISITE_REASONS
c11_phy_cbse_06_008: Moment of Inertia definition (\(I = \sum m_i r_i^2\)) is the foundation; the theorem is a direct consequence of this definition.
c11_phy_cbse_06_001: Centre of Mass concept is essential because the theorem explicitly references the axis through the CM and uses the property \(\sum m_i \vec{r}_{i,\text{cm}} = 0\).
c11_phy_cbse_06_003: Vector Product (Cross Product) is needed to understand the vector nature of distances and the derivation involving \(\vec{r} \times \vec{F}\) in later dynamics.
c11_phy_cbse_06_004: Torque definition (\(\tau = \vec{r} \times \vec{F}\)) and rotational dynamics (\(\tau = I\alpha\)) provide the physical context where moment of inertia is used, motivating why we need to calculate \(I\) about different axes.

## FORWARD_NODE_IDS
c11_phy_cbse_06_010, c11_phy_cbse_06_011, c11_phy_cbse_06_013, c11_phy_cbse_06_014
## FORWARD_REASONS
c11_phy_cbse_06_010: Perpendicular Axis Theorem is the companion theorem for planar bodies; both are used together to find moments of inertia of composite shapes.
c11_phy_cbse_06_011: Moment of Inertia of Common Bodies applies the Parallel Axis Theorem to derive standard results (e.g., rod about end, disc about tangent).
c11_phy_cbse_06_013: Dynamics of Rotational Motion uses \(I\) about various axes to compute angular acceleration (\(\tau = I\alpha\)); the theorem allows shifting the axis to where torque is applied.
c11_phy_cbse_06_014: Rolling Motion on Inclined Plane requires \(I\) about the point of contact (instantaneous axis), which is found using the Parallel Axis Theorem with \(d = R\).

## CROSS_SUBJECT_PREREQS
c9_math_ch1_4, c8_math_ch6_7, c8_math_ch6_8, c10_math_cbse_07_001
## CROSS_SUBJECT_REASONS
c9_math_ch1_4: Distance Formula (using Pythagoras) is used to compute perpendicular distances between axes in 3D geometry problems.
c8_math_ch6_7: Algebraic Identity \((a+b)^2 = a^2 + 2ab + b^2\) is exactly the expansion used in the derivation of the theorem when squaring the distance from the new axis.
c8_math_ch6_8: Algebraic Identity \((a-b)^2 = a^2 - 2ab + b^2\) appears when the axis shift is in the opposite direction; the cross-term sign changes but vanishes at CM.
c10_math_cbse_07_001: Distance Formula in coordinate geometry is directly applied to find the perpendicular distance \(d\) between two parallel lines (axes) given their equations.

## CHAIN_DESCRIPTION
c11_phy_cbse_06_008 -> c11_phy_cbse_06_009 -> c11_phy_cbse_06_010

## THIS_FORMULA
\(I = I_{\text{cm}} + M d^2\) (SI unit: \(\text{kg}\,\text{m}^2\))

## FORMULA_VARIABLES
\(I\) = moment of inertia about the given axis (\(\text{kg}\,\text{m}^2\)), \(I_{\text{cm}}\) = moment of inertia about a parallel axis through the centre of mass (\(\text{kg}\,\text{m}^2\)), \(M\) = total mass of the rigid body (\(\text{kg}\)), \(d\) = perpendicular distance between the two parallel axes (\(\text{m}\))

## FORMULA_UNITS
\(\text{kg}\,\text{m}^2\)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c9_math_ch1_4 | The distance formula \(\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}\) is used to calculate the perpendicular distance \(d\) between two parallel axes when their equations or coordinates are given in a plane.
c8_math_ch6_7 | The algebraic expansion \((r_{cm} + d)^2 = r_{cm}^2 + d^2 + 2 r_{cm} d\) is the mathematical core of the derivation; the cross-term \(2 r_{cm} d\) sums to zero because \(\sum m_i r_{i,cm} = 0\) at the centre of mass.

## PREREQ_CONCEPT
Moment of inertia definition (\(I = \sum m_i r_i^2\)) and the concept of centre of mass (\(\sum m_i \vec{r}_{i,\text{cm}} = 0\)).

## PREREQ_BEFORE
The student must be able to calculate the moment of inertia of simple symmetric bodies (ring, rod, disc) about their symmetry axes and locate the centre of mass of uniform bodies.

## PREREQ_STUCK
If stuck, revisit node c11_phy_cbse_06_008 (Moment of Inertia: Definition) for the summation formula and node c11_phy_cbse_06_001 (Centre of Mass: Definition and Formula) for the property \(\sum m_i \vec{r}_{i,\text{cm}} = 0\).

## WORKED_EXAMPLE_1
PROBLEM: A uniform circular disc of mass \(5.0\,\text{kg}\) and radius \(0.40\,\text{m}\) is rotating about an axis tangent to its rim and perpendicular to its plane. The moment of inertia of the disc about its central perpendicular axis is \(I_{\text{cm}} = \frac{1}{2}MR^2\). Calculate the moment of inertia about the tangent axis.

STEPS:
- Step 1: Identify given quantities: \(M = 5.0\,\text{kg}\), \(R = 0.40\,\text{m}\), \(I_{\text{cm}} = \frac{1}{2}MR^2\). The new axis is parallel to the central axis and tangent to the rim, so the perpendicular distance \(d = R = 0.40\,\text{m}\).
- Step 2: Write the Parallel Axis Theorem formula: \(I = I_{\text{cm}} + M d^2\). Check units: \(I_{\text{cm}}\) in \(\text{kg}\,\text{m}^2\), \(M d^2\) in \(\text{kg} \times \text{m}^2 = \text{kg}\,\text{m}^2\). Consistent.
- Step 3: Compute \(I_{\text{cm}} = \frac{1}{2} \times 5.0 \times (0.40)^2 = 2.5 \times 0.16 = 0.40\,\text{kg}\,\text{m}^2\).
- Step 4: Compute \(M d^2 = 5.0 \times (0.40)^2 = 5.0 \times 0.16 = 0.80\,\text{kg}\,\text{m}^2\).
- Step 5: Add: \(I = 0.40 + 0.80 = 1.20\,\text{kg}\,\text{m}^2\). Verify: The moment of inertia about a tangent should be larger than about the centre; \(1.20 > 0.40\) is physically reasonable.

REASONING: The Parallel Axis Theorem adds the "mass \(\times\) distance²" term because every mass element is now farther from the axis by the same perpendicular distance \(d\). The cross-term vanishes due to the centre-of-mass property. The calculation is a direct substitution once \(d\) is correctly identified as the radius.

ANSWER: \(1.20\,\text{kg}\,\text{m}^2\)

## WORKED_EXAMPLE_2
PROBLEM: A thin uniform rod of mass \(3.0\,\text{kg}\) and length \(2.0\,\text{m}\) has a moment of inertia \(I_{\text{end}} = 4.0\,\text{kg}\,\text{m}^2\) about an axis perpendicular to the rod through one end. Find its moment of inertia about a parallel axis through a point \(0.50\,\text{m}\) from the same end.

STEPS:
- Step 1: Given: \(M = 3.0\,\text{kg}\), \(L = 2.0\,\text{m}\), \(I_{\text{end}} = 4.0\,\text{kg}\,\text{m}^2\). The known axis is at one end (distance from CM = \(L/2 = 1.0\,\text{m}\)). The new axis is at \(0.50\,\text{m}\) from that end, so its distance from the CM is \(d_{\text{new}} = |1.0 - 0.50| = 0.50\,\text{m}\).
- Step 2: First, find \(I_{\text{cm}}\) using the theorem in reverse: \(I_{\text{end}} = I_{\text{cm}} + M (L/2)^2\). So \(I_{\text{cm}} = I_{\text{end}} - M (L/2)^2\).
- Step 3: Compute \(M (L/2)^2 = 3.0 \times (1.0)^2 = 3.0\,\text{kg}\,\text{m}^2\). Then \(I_{\text{cm}} = 4.0 - 3.0 = 1.0\,\text{kg}\,\text{m}^2\). (Check: formula for rod about centre is \(\frac{1}{12}ML^2 = \frac{1}{12} \times 3.0 \times 4.0 = 1.0\,\text{kg}\,\text{m}^2\). Matches.)
- Step 4: Now apply theorem forward for the new axis: \(I_{\text{new}} = I_{\text{cm}} + M d_{\text{new}}^2\).
- Step 5: Compute \(M d_{\text{new}}^2 = 3.0 \times (0.50)^2 = 3.0 \times 0.25 = 0.75\,\text{kg}\,\text{m}^2\). Then \(I_{\text{new}} = 1.0 + 0.75 = 1.75\,\text{kg}\,\text{m}^2\).
- Step 6: Verify: The new axis is closer to the CM than the end axis, so \(I_{\text{new}} < I_{\text{end}}\) (1.75 < 4.0). Correct.

REASONING: When the given axis is not through the CM, we must first recover \(I_{\text{cm}}\) by subtracting the known \(M d^2\) term. Then we apply the theorem again with the new distance. This two-step process is essential for problems where neither axis is the CM axis.

ANSWER: \(1.75\,\text{kg}\,\text{m}^2\)

## WORKED_EXAMPLE_3
PROBLEM: A flywheel in the shape of a uniform disc (mass \(20\,\text{kg}\), radius \(0.50\,\text{m}\)) is mounted on a horizontal axle through its centre. A constant torque of \(50\,\text{N}\,\text{m}\) is applied. The axle bearings are frictionless. (a) Find the angular acceleration. (b) The axle is now shifted so the disc rotates about a parallel axis tangent to its rim. The same torque is applied. Find the new angular acceleration.

STEPS:
- Step 1: For part (a), axis through centre: \(I_{\text{cm}} = \frac{1}{2}MR^2 = \frac{1}{2} \times 20 \times (0.50)^2 = 10 \times 0.25 = 2.5\,\text{kg}\,\text{m}^2\).
- Step 2: Use \(\tau = I \alpha\). \(\alpha = \tau / I = 50 / 2.5 = 20\,\text{rad/s}^2\).
- Step 3: For part (b), new axis is tangent to rim: perpendicular distance \(d = R = 0.50\,\text{m}\).
- Step 4: Apply Parallel Axis Theorem: \(I_{\text{tangent}} = I_{\text{cm}} + M d^2 = 2.5 + 20 \times (0.50)^2 = 2.5 + 20 \times 0.25 = 2.5 + 5.0 = 7.5\,\text{kg}\,\text{m}^2\).
- Step 5: New angular acceleration \(\alpha' = \tau / I_{\text{tangent}} = 50 / 7.5 = 6.67\,\text{rad/s}^2\).
- Step 6: Interpret: The moment of inertia increased by a factor of 3, so angular acceleration decreased by the same factor for the same torque. This shows how mass distribution relative to the axis affects rotational response.

REASONING: This problem combines the Parallel Axis Theorem with rotational dynamics (\(\tau = I\alpha\)). The theorem provides the new \(I\), which directly determines \(\alpha\) for a given torque. The physical insight is that moving the axis away from the CM increases rotational inertia, making the body harder to angularly accelerate.

ANSWER: (a) \(20\,\text{rad/s}^2\), (b) \(6.67\,\text{rad/s}^2\)

## COMPETENCY_QUESTION_1
QUESTION: A uniform square plate of side \(a\) and mass \(M\) has moment of inertia \(I_{\text{cm}} = \frac{1}{6}Ma^2\) about an axis through its centre perpendicular to its plane. A student wants to find the moment of inertia about an axis through one corner perpendicular to the plane. The student writes \(I = \frac{1}{6}Ma^2 + M(a)^2\). Is this correct? If not, what is the correct distance \(d\) to use, and what is the correct \(I\)?

COMPETENCY: Interpreting physical situations using formulas and identifying geometric distances.

STEPS:
- Step 1: Visualise the square plate. The centre is at the intersection of diagonals. The corner is at a distance of half the diagonal from the centre.
- Step 2: The diagonal of a square of side \(a\) is \(a\sqrt{2}\). Half the diagonal is \(a\sqrt{2}/2 = a/\sqrt{2}\).
- Step 3: The perpendicular distance \(d\) between the central axis and the corner axis is \(a/\sqrt{2}\), not \(a\).
- Step 4: Apply theorem: \(I = I_{\text{cm}} + M d^2 = \frac{1}{6}Ma^2 + M (a/\sqrt{2})^2 = \frac{1}{6}Ma^2 + \frac{1}{2}Ma^2 = \frac{2}{3}Ma^2\).

ANSWER: The student is incorrect. The correct distance is \(d = a/\sqrt{2}\). The correct moment of inertia is \(I = \frac{2}{3}Ma^2\).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A composite body consists of a uniform rod of mass \(M\) and length \(L\) welded to a uniform disc of mass \(M\) and radius \(R = L/2\) at the rod's end, such that the disc's plane is perpendicular to the rod. Find the moment of inertia of this composite body about an axis through the free end of the rod (opposite the disc) and perpendicular to the rod. Use \(I_{\text{rod, end}} = \frac{1}{3}ML^2\) and \(I_{\text{disc, cm}} = \frac{1}{2}MR^2\).

COMPETENCY: Predicting outcomes from changing variables and combining concepts (composite bodies + parallel axis theorem).

STEPS:
- Step 1: The axis is at the free end of the rod. The rod's moment of inertia about this axis is directly given: \(I_{\text{rod}} = \frac{1}{3}ML^2\).
- Step 2: For the disc, its centre of mass is at the welded end, which is at distance \(L\) from the axis. The disc's own CM axis is parallel to the rotation axis (both perpendicular to rod). Use Parallel Axis Theorem for the disc: \(I_{\text{disc}} = I_{\text{disc, cm}} + M d^2\).
- Step 3: Here \(d = L\). \(I_{\text{disc, cm}} = \frac{1}{2}MR^2 = \frac{1}{2}M(L/2)^2 = \frac{1}{8}ML^2\).
- Step 4: \(M d^2 = M L^2\).
- Step 5: \(I_{\text{disc}} = \frac{1}{8}ML^2 + ML^2 = \frac{9}{8}ML^2\).
- Step 6: Total \(I = I_{\text{rod}} + I_{\text{disc}} = \frac{1}{3}ML^2 + \frac{9}{8}ML^2 = \frac{8}{24}ML^2 + \frac{27}{24}ML^2 = \frac{35}{24}ML^2\).

ANSWER: \(\frac{35}{24}ML^2\) (or approximately \(1.458\,ML^2\))

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: This theorem applies only when one of the two ______ axes passes through the centre of mass of the body.

## DIAGNOSTIC_ANSWER_7
parallel

**A wrong answer ("perpendicular" or "coplanar") reveals the student has swapped the definition's adjective - the theorem links two parallel axes.** Parallel is the definition's own adjective, and the adjective is what the blank grades. Recall the centre-of-mass condition before filling, and give the adjective exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a ceiling fan in an Indian household: the blades rotate about the ______ axis through the motor (centre of mass).

## DIAGNOSTIC_ANSWER_8
central

**A wrong answer ("outer" or "rim") reveals the student has swapped the walkthrough's adjective - the blades rotate about the central axis through the motor.** Central is the walkthrough's own adjective, and the adjective is what the blank grades. Recall the detached-blade contrast before filling, and give the adjective exactly.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Observe a ceiling fan in an Indian ______: the blades rotate about the central axis through the motor (centre of mass).

## DIAGNOSTIC_ANSWER_9
household

**A wrong answer ("kitchen" or "factory") reveals the student has swapped the walkthrough's noun - the fan hangs in an Indian household.** Household is the walkthrough's own noun, and the noun is what the blank grades. Recall the motor axis before filling, and give the noun exactly.
