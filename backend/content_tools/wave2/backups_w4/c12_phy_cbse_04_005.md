## ELI5
A copper loop, a battery, a compass at its centre: close the switch and the needle swings to face along the loop's axis. The loop's axial field comes from summing every element's Biot-Savart contribution - perpendicular components cancel by symmetry, axial ones pile up - yielding mu-zero I R squared over two times R squared plus x squared to the three-halves. At the centre it simplifies to mu-zero I over two R; N turns multiply the lot.

## DEFINITION
The magnetic field on the axis of a circular current loop is the vector sum of contributions from all infinitesimal current elements, directed along the axis with magnitude \( B = \frac{\mu_0 I R^2}{2(x^2+R^2)^{3/2}} \) at a distance \( x \) from the centre, where \( I \) is the steady current, \( R \) is the loop radius, and \( \mu_0 = 4\pi \times 10^{-7} \, \text{T·m/A} \) is the permeability of free space. At the centre (\( x=0 \)), this reduces to \( B = \frac{\mu_0 I}{2R} \) (or \( \frac{\mu_0 N I}{2R} \) for \( N \) closely wound turns).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can (1) derive the axial magnetic field formula from the Biot–Savart law by correctly resolving components and integrating over the loop, (2) compute the field at the centre and at any axial point for single or multi-turn loops with correct SI units, and (3) determine the field direction using the right‑hand thumb rule for a given current direction.

## SCOPE_BOUNDARY
Covers the magnetic field on the axis of a circular current loop (including centre) using Biot–Savart law. Does NOT cover: magnetic field off‑axis, fields due to non‑circular loops, solenoids, toroids, or Ampere’s circuital law (those are in subsequent nodes). Assumes steady current in vacuum/air.

## WALKTHROUGH
Observe a school laboratory demonstration: a circular copper loop connected to a battery and a compass needle placed at its centre. When the circuit is closed, the needle aligns perpendicular to the plane of the loop. Start by recalling the Biot–Savart law for a current element (previous node). Consider a small element \( d\vec{l} \) on the loop and the displacement vector \( \vec{r} \) to an axial point P. Note that \( d\vec{l} \perp \vec{r} \) so \( |d\vec{l} \times \vec{r}| = r\,dl \). The field \( d\vec{B} \) has an axial component \( dB_x = dB \cos\theta \) and a perpendicular component that cancels by symmetry when integrated over the full loop. Integrate \( dB_x \) over the circumference \( 2\pi R \) to obtain the axial field formula. Finally, apply the right‑hand thumb rule: curl fingers in current direction, thumb gives axial field direction.

Takeaway first: the loop's field is the circle's cooperation - sideways components self-cancel, axial components accumulate - and the centre is the formula's friendliest point. Exam moves: derivation questions resolving components around the loop, computation questions at centre and general axial points, multi-turn questions, and direction questions by the thumb rule. Method: rerun the demonstration - element considered, cross product taken, components split, symmetry invoked, integral closed. Check yourself: at the centre every element contributes fully - sine of ninety - so the formula is most generous there; off-axis the distance and angle both tax the result. Drill: derive the axial formula once, evaluate the centre's field for a stated loop, and state its direction.

## DIAGNOSTIC_QUESTION_1
State the exact expression for the magnetic field at the centre of a circular loop of radius \( R \) carrying a steady current \( I \). Include the SI unit of each quantity.

## DIAGNOSTIC_ANSWER_1
\( B = \frac{\mu_0 I}{2R} \) with \( \mu_0 = 4\pi \times 10^{-7} \, \text{T·m/A} \), \( I \) in amperes (A), \( R \) in metres (m), giving \( B \) in tesla (T). A wrong answer like \( B = \frac{\mu_0 I}{2\pi R} \) reveals confusion with the straight‑wire formula; omitting \( \mu_0 \) or using gauss instead of tesla shows unit unawareness.

## DIAGNOSTIC_QUESTION_2
Explain why the perpendicular components of the magnetic field cancel out when integrating over the entire circular loop for an axial point, while the axial components add up.

## DIAGNOSTIC_ANSWER_2
For every current element \( d\vec{l} \) there is a diametrically opposite element \( d\vec{l}' \) whose perpendicular component \( dB_\perp \) is equal in magnitude but opposite in direction (radially outward vs inward), so they cancel pairwise. The axial components \( dB_x \) are both directed along the axis (same sense) and therefore add constructively. A student who says “perpendicular components cancel because the loop is symmetric” without mentioning pairwise opposition shows incomplete understanding of vector addition.

## DIAGNOSTIC_QUESTION_3
A circular coil of 50 turns and radius 5.0 cm carries a current of 0.80 A. Calculate the magnetic field at a point on the axis 12 cm from the centre of the coil. Give your answer in tesla.

## DIAGNOSTIC_ANSWER_3
Given: \( N = 50 \), \( R = 0.050 \, \text{m} \), \( I = 0.80 \, \text{A} \), \( x = 0.12 \, \text{m} \), \( \mu_0 = 4\pi \times 10^{-7} \, \text{T·m/A} \).
Formula: \( B = \frac{\mu_0 N I R^2}{2(x^2+R^2)^{3/2}} \).
Step 1: \( R^2 = (0.050)^2 = 2.5 \times 10^{-3} \, \text{m}^2 \).
Step 2: \( x^2 = (0.12)^2 = 1.44 \times 10^{-2} \, \text{m}^2 \).
Step 3: \( x^2+R^2 = 1.69 \times 10^{-2} \, \text{m}^2 \); \( (x^2+R^2)^{3/2} = (1.69 \times 10^{-2})^{3/2} = (1.3 \times 10^{-1})^3 = 2.197 \times 10^{-3} \, \text{m}^3 \).
Step 4: Numerator \( = (4\pi \times 10^{-7}) \times 50 \times 0.80 \times 2.5 \times 10^{-3} = 4\pi \times 10^{-7} \times 100 \times 10^{-3} = 4\pi \times 10^{-8} \).
Step 5: \( B = \frac{4\pi \times 10^{-8}}{2 \times 2.197 \times 10^{-3}} = \frac{4\pi \times 10^{-8}}{4.394 \times 10^{-3}} = 2.86 \times 10^{-5} \, \text{T} \).
A wrong answer like \( 1.43 \times 10^{-5} \, \text{T} \) indicates forgetting the factor \( N \) or misplacing the factor 2.

## DIAGNOSTIC_QUESTION_4
Two identical circular loops of radius \( R \) carry the same current \( I \). Loop A is a single turn; Loop B has 10 closely wound turns. Compare the magnetic field at the centre of each loop and at a point on the axis at distance \( x = R \) from the centre. Explain any differences in the ratio of fields.

## DIAGNOSTIC_ANSWER_4
At the centre: \( B_A = \frac{\mu_0 I}{2R} \), \( B_B = \frac{\mu_0 (10I)}{2R} = 10 B_A \). At \( x = R \): \( B_A = \frac{\mu_0 I R^2}{2(2R^2)^{3/2}} = \frac{\mu_0 I}{2R} \cdot \frac{1}{2^{3/2}} \), \( B_B = 10 B_A \). The ratio \( B_B/B_A = 10 \) at both positions because the \( N \) factor multiplies the entire expression uniformly. A student who claims the ratio changes with \( x \) misunderstands that \( N \) is a simple multiplicative factor for closely wound turns of same radius.

## DIAGNOSTIC_QUESTION_5
A student derives the axial field of a circular loop and writes \( B = \frac{\mu_0 I R}{2(x^2+R^2)^{3/2}} \). Identify the error and explain why it is dimensionally incorrect.

## DIAGNOSTIC_ANSWER_5
The error is \( R \) instead of \( R^2 \) in the numerator. Dimensionally: \( \mu_0 I \) has units \( \text{T·m} \). The denominator \( (x^2+R^2)^{3/2} \) has units \( \text{m}^3 \). So \( \frac{\mu_0 I R}{...} \) gives \( \frac{\text{T·m} \cdot \text{m}}{\text{m}^3} = \text{T/m} \), not tesla. The correct \( R^2 \) gives \( \frac{\text{T·m} \cdot \text{m}^2}{\text{m}^3} = \text{T} \). A student missing this reveals poor dimensional analysis habit.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a battery, a variable resistor, a circular loop of wire, and a compass to verify that the magnetic field at the centre of the loop is directly proportional to the current. Describe the procedure, measurements, and how you would plot the data.

## DIAGNOSTIC_ANSWER_6
Procedure: (1) Make a circular loop of known radius \( R \) (e.g., 10 cm) with insulated copper wire. (2) Connect it in series with a battery, a variable resistor (rheostat), and an ammeter. (3) Place a compass at the centre of the loop, aligning the loop’s plane with the magnetic meridian (so Earth’s field is along the axis). (4) Vary the rheostat to get different currents \( I \); for each, note the compass deflection \( \theta \) from the meridian. (5) The loop’s field \( B = \frac{\mu_0 I}{2R} \) is perpendicular to Earth’s horizontal field \( B_H \); \( \tan\theta = B/B_H \). Plot \( \tan\theta \) vs \( I \); a straight line through origin confirms proportionality. A poor answer would omit the need to align the loop with the magnetic meridian or forget to use \( \tan\theta \).

## COMMON_MISCONCEPTION
Students often apply the right‑hand thumb rule for a straight wire (thumb along current, fingers curl around wire) to a circular loop, concluding the field at the centre is along the plane of the loop. The correct rule for a loop: curl fingers in the direction of current, the extended thumb points along the axial field direction. Another error is using \( B = \frac{\mu_0 I}{2\pi R} \) (straight‑wire formula) for the centre of a loop.

## ON_FAILURE
1. Re‑watch the right‑hand thumb rule demonstration for a circular loop (Class 10 video or teacher demo). 2. Practice the rule with a physical loop: hold a circular wire, point fingers along current, observe thumb direction. 3. Re‑derive the axial field from Biot–Savart law step‑by‑step (node c12_phy_cbse_04_004) focusing on the cross product \( d\vec{l} \times \vec{r} \) and the cancellation of perpendicular components. 4. Solve three numerical problems: one at centre, one on axis, one with multiple turns, checking units at each step.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_04_004, c11_phy_cbse_03_008, c10_phy_cbse_02_003, c11_math_cbse_13_001
## PREREQUISITE_REASONS
c12_phy_cbse_04_004: Biot–Savart law is the starting point for the derivation.
c11_phy_cbse_03_008: Vector cross product is needed to evaluate \( d\vec{l} \times \vec{r} \) and resolve components.
c10_phy_cbse_02_003: Right‑hand thumb rule for a circular loop (introduced in Class 10) gives field direction.
c11_math_cbse_13_001: Intuitive idea of limits and integration is required to sum contributions over the loop.

## FORWARD_NODE_IDS
c12_phy_cbse_04_006, c12_phy_cbse_04_007, c12_phy_cbse_04_009, c12_phy_cbse_04_010, c12_math_cbse_10_006

## FORWARD_REASONS
c12_phy_cbse_04_006: Ampere’s circuital law provides an alternative method for symmetric current distributions; the circular loop result is a benchmark.
c12_phy_cbse_04_007: Solenoid field is derived by stacking many circular loops; the loop formula is the building block.
c12_phy_cbse_04_009: Torque on a current loop uses magnetic moment \( m = NIA \), whose field at large distances matches the loop’s axial field.
c12_phy_cbse_04_010: Moving coil galvanometer operates on torque \( \tau = NIAB \); the coil is a circular/rectangular loop whose magnetic moment derives from this node.
c12_math_cbse_10_006: c12_phy_cbse_04_005 | Resolution of vectors: Component of velocity along an inclined plane is projection of velocity vector on the plane's direction vector.  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_002, c11_math_cbse_10_006, c10_math_cbse_11_001
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_002: Algebraic methods of evaluating limits are used when integrating \( dB_x \) over the loop and taking the limit \( x \gg R \) for dipole approximation.
c11_math_cbse_10_006: Slope of a line and angle between lines help in visualising the geometry of \( \cos\theta = R/\sqrt{x^2+R^2} \).
c10_math_cbse_11_001: Area of a circle \( \pi R^2 \) appears in the magnetic moment \( m = NIA \) and in the dipole field approximation.

## CHAIN_DESCRIPTION
c12_phy_cbse_04_004 -> c12_phy_cbse_04_005 -> c12_phy_cbse_04_007

## THIS_FORMULA
Axial field: \( B = \frac{\mu_0 N I R^2}{2(x^2+R^2)^{3/2}} \) (T). Centre field: \( B = \frac{\mu_0 N I}{2R} \) (T).

## FORMULA_VARIABLES
\( B \) = magnetic field (T), \( \mu_0 \) = permeability of free space = \( 4\pi \times 10^{-7} \, \text{T·m/A} \), \( N \) = number of turns (dimensionless), \( I \) = current (A), \( R \) = loop radius (m), \( x \) = axial distance from centre (m).

## FORMULA_UNITS
T (tesla), T·m/A, A, m, m.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_002 | Integration of \( dB_x \) over the loop uses algebraic limit evaluation; the definite integral \( \int_0^{2\pi} dl = 2\pi R \) is a basic calculus application.
c11_phy_cbse_03_008 | Vector cross product \( d\vec{l} \times \vec{r} \) determines the direction and magnitude of the infinitesimal field \( d\vec{B} \).
## PREREQ_CONCEPT
Biot–Savart law for a current element and vector cross product.

## PREREQ_BEFORE
Student must be able to state the Biot–Savart law in vector form and compute cross products of perpendicular vectors.

## PREREQ_STUCK
If stuck, revisit the Biot–Savart law derivation for a straight wire (c12_phy_cbse_04_004) and practice cross products with \( \hat{i}, \hat{j}, \hat{k} \) (c11_phy_cbse_03_008).

## WORKED_EXAMPLE_1
PROBLEM: A circular coil of 200 turns and mean radius 15 cm is connected to a 12 V battery. The total resistance of the circuit is 6.0 Ω. Find the magnetic field at the centre of the coil.
STEPS:
- Step 1: Identify given quantities: \( N = 200 \), \( R = 0.15 \, \text{m} \), \( V = 12 \, \text{V} \), \( R_{\text{circuit}} = 6.0 \, \Omega \). Need \( B \) at centre.
- Step 2: Find current using Ohm’s law: \( I = V/R = 12/6.0 = 2.0 \, \text{A} \).
- Step 3: Use centre field formula: \( B = \frac{\mu_0 N I}{2R} \). \( \mu_0 = 4\pi \times 10^{-7} \, \text{T·m/A} \).
- Step 4: Substitute: \( B = \frac{(4\pi \times 10^{-7}) \times 200 \times 2.0}{2 \times 0.15} = \frac{4\pi \times 10^{-7} \times 400}{0.30} = \frac{1.6\pi \times 10^{-4}}{0.30} = 1.675 \times 10^{-3} \, \text{T} \).
- Step 5: Check units: \( \frac{\text{T·m/A} \times \text{A}}{\text{m}} = \text{T} \). Result \( 1.68 \times 10^{-3} \, \text{T} \) (or 1.68 mT) is reasonable for a lab coil.
REASONING: The coil is closely wound so all turns have same radius. The battery and resistance give the current via Ohm’s law (Class 10/12 physics). The centre formula is a direct application of the derived result.
ANSWER: \( 1.68 \times 10^{-3} \, \text{T} \) (or 1.68 mT) directed along the axis per right‑hand thumb rule.

## WORKED_EXAMPLE_2
PROBLEM: A single circular loop of radius 8.0 cm carries a current of 5.0 A. Calculate the magnetic field at a point on the axis 6.0 cm from the centre. Also find the distance from the centre where the field drops to half its value at the centre.
STEPS:
- Step 1: Given \( N=1 \), \( R=0.08 \, \text{m} \), \( I=5.0 \, \text{A} \), \( x=0.06 \, \text{m} \). \( \mu_0 = 4\pi \times 10^{-7} \).
- Step 2: Compute \( B \) at \( x=0.06 \): \( B = \frac{\mu_0 I R^2}{2(x^2+R^2)^{3/2}} \).
  \( R^2 = 6.4 \times 10^{-3} \), \( x^2 = 3.6 \times 10^{-3} \), \( x^2+R^2 = 10.0 \times 10^{-3} \).
  \( (x^2+R^2)^{3/2} = (10.0 \times 10^{-3})^{3/2} = (3.162 \times 10^{-1})^3 = 3.162 \times 10^{-2} \)? Wait: \( (10^{-2})^{3/2} = 10^{-3} \). Actually \( 10.0 \times 10^{-3} = 0.01 \). \( \sqrt{0.01} = 0.1 \), cube = 0.001 = \( 1.0 \times 10^{-3} \).
  Numerator: \( 4\pi \times 10^{-7} \times 5.0 \times 6.4 \times 10^{-3} = 4\pi \times 32 \times 10^{-10} = 4.02 \times 10^{-8} \).
  \( B = \frac{4.02 \times 10^{-8}}{2 \times 1.0 \times 10^{-3}} = 2.01 \times 10^{-5} \, \text{T} \).
- Step 3: Centre field \( B_0 = \frac{\mu_0 I}{2R} = \frac{4\pi \times 10^{-7} \times 5.0}{0.16} = 3.93 \times 10^{-5} \, \text{T} \).
- Step 4: Find \( x \) where \( B = B_0/2 \): \( \frac{\mu_0 I R^2}{2(x^2+R^2)^{3/2}} = \frac{1}{2} \frac{\mu_0 I}{2R} \).
  Cancel \( \mu_0 I \): \( \frac{R^2}{(x^2+R^2)^{3/2}} = \frac{1}{4R} \).
  \( 4R^3 = (x^2+R^2)^{3/2} \).
  Cube root: \( (4R^3)^{2/3} = x^2+R^2 \) → \( 4^{2/3} R^2 = x^2+R^2 \).
  \( 4^{2/3} = (2^2)^{2/3} = 2^{4/3} \approx 2.52 \).
  \( x^2 = (2.52 - 1)R^2 = 1.52 R^2 \).
  \( x = \sqrt{1.52} \times 0.08 = 1.23 \times 0.08 = 0.0986 \, \text{m} \approx 9.9 \, \text{cm} \).
- Step 5: Verify: at \( x=9.9 \, \text{cm} \), \( B \) should be half of centre. Units consistent.
REASONING: The axial formula is used directly. The half‑field distance requires algebraic manipulation of the formula, showing how field decays with distance.
ANSWER: At 6.0 cm: \( 2.0 \times 10^{-5} \, \text{T} \). Half‑field distance: 9.9 cm from centre.

## WORKED_EXAMPLE_3
PROBLEM: A circular coil of 100 turns, radius 10 cm, carries a current of 3.0 A. It is placed with its plane vertical and its axis horizontal pointing east. A small compass is placed at the centre of the coil. The horizontal component of Earth’s magnetic field at the location is \( 3.6 \times 10^{-5} \, \text{T} \) directed north. Find the deflection of the compass needle from north.
STEPS:
- Step 1: Compute coil’s field at centre: \( B_c = \frac{\mu_0 N I}{2R} = \frac{4\pi \times 10^{-7} \times 100 \times 3.0}{0.20} = 1.885 \times 10^{-3} \, \text{T} \) directed east (right‑hand rule: current anticlockwise as seen from east? Actually, if axis points east, current as seen from east is anticlockwise? Let’s define: axis horizontal east. Right‑hand rule: curl fingers in current direction, thumb points east. So \( B_c \) is east).
- Step 2: Earth’s horizontal field \( B_H = 3.6 \times 10^{-5} \, \text{T} \) north.
- Step 3: The compass aligns with the resultant of \( \vec{B}_c \) (east) and \( \vec{B}_H \) (north). Deflection \( \theta \) from north given by \( \tan\theta = B_c / B_H \) (since perpendicular).
- Step 4: \( \tan\theta = \frac{1.885 \times 10^{-3}}{3.6 \times 10^{-5}} = 52.36 \).
- Step 5: \( \theta = \tan^{-1}(52.36) \approx 88.9^\circ \). The needle points almost exactly east.
REASONING: This combines the circular loop field with Earth’s field (vector addition). The compass responds to the net horizontal field. The large coil field dominates, so deflection is near 90°.
ANSWER: Deflection ≈ 88.9° from north towards east (i.e., nearly east).

## COMPETENCY_QUESTION_1
QUESTION: A student sets up a circular loop of radius 5 cm with 10 turns carrying 0.5 A. She measures the magnetic field at the centre as \( 6.3 \times 10^{-5} \, \text{T} \) using a calibrated Hall probe. She then moves the probe to a point on the axis 5 cm from the centre and measures \( 2.2 \times 10^{-5} \, \text{T} \). Are these measurements consistent with theory? Justify quantitatively.
COMPETENCY: Interpreting physical situations using formulas and evaluating experimental data.
STEPS:
- Step 1: Calculate theoretical centre field: \( B_0 = \frac{\mu_0 N I}{2R} = \frac{4\pi \times 10^{-7} \times 10 \times 0.5}{0.10} = 6.28 \times 10^{-5} \, \text{T} \). Matches measured \( 6.3 \times 10^{-5} \, \text{T} \).
- Step 2: Calculate theoretical axial field at \( x = 0.05 \, \text{m} \): \( B = \frac{\mu_0 N I R^2}{2(x^2+R^2)^{3/2}} \).
  \( R=0.05 \), \( x=0.05 \), \( x^2+R^2 = 0.005 \), \( (x^2+R^2)^{3/2} = (0.005)^{3/2} = 3.536 \times 10^{-4} \).
  Numerator: \( 4\pi \times 10^{-7} \times 10 \times 0.5 \times 0.0025 = 1.57 \times 10^{-8} \).
  \( B = \frac{1.57 \times 10^{-8}}{2 \times 3.536 \times 10^{-4}} = 2.22 \times 10^{-5} \, \text{T} \). Matches measured \( 2.2 \times 10^{-5} \, \text{T} \).
- Step 3: Conclude measurements are consistent (within rounding).
ANSWER: Yes, both measurements agree with theoretical values (centre: \( 6.28 \times 10^{-5} \, \text{T} \), axial: \( 2.22 \times 10^{-5} \, \text{T} \)).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Two identical circular loops of radius \( R \) are placed coaxially with their centres separated by a distance \( d \). Each carries a current \( I \) in the same direction. Derive an expression for the magnetic field at the midpoint between the loops. For what value of \( d \) is the field at the midpoint uniform to first order (i.e., \( dB/dx = 0 \) at midpoint)? This configuration is called a Helmholtz pair.
COMPETENCY: Predicting outcomes from changing variables and applying calculus to physical optimization.
STEPS:
- Step 1: Field at midpoint due to one loop at distance \( d/2 \): \( B_1 = \frac{\mu_0 I R^2}{2((d/2)^2+R^2)^{3/2}} \). Both loops add, so \( B_{\text{mid}} = 2B_1 = \frac{\mu_0 I R^2}{((d/2)^2+R^2)^{3/2}} \).
- Step 2: To find \( d \) for maximum uniformity, consider field on axis as function of \( x \) from midpoint. By symmetry, first derivative at midpoint is zero for any \( d \). Need second derivative zero? Actually, Helmholtz condition is \( \frac{d^2B}{dx^2} = 0 \) at midpoint.
- Step 3: Let \( x \) be displacement from midpoint. Field from left loop at \( x \): distance = \( d/2 + x \). Right loop: \( d/2 - x \). Total \( B(x) = \frac{\mu_0 I R^2}{2} \left[ \frac{1}{((d/2+x)^2+R^2)^{3/2}} + \frac{1}{((d/2-x)^2+R^2)^{3/2}} \right] \).
- Step 4: Compute \( \frac{d^2B}{dx^2} \) at \( x=0 \). After algebra (or known result), condition gives \( d = R \).
- Step 5: For \( d=R \), the field near midpoint is very uniform. This is the Helmholtz coil configuration.
ANSWER: \( B_{\text{mid}} = \frac{\mu_0 I R^2}{((d/2)^2+R^2)^{3/2}} \). Uniform to first order when \( d = R \).
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Observe a school laboratory ______: a circular copper loop connected to a battery and a compass needle placed at its centre.

## DIAGNOSTIC_ANSWER_7
demonstration

The demonstration completes the scene: the loop, the battery, and the compass that betrays the field's axial direction. **A wrong answer (a lecture) reveals the student has replaced the live demo with talk where the walkthrough built a circuit.**

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
The student can (1) derive the axial magnetic field formula from the Biot–Savart law by correctly resolving components and integrating over the loop, (2) compute the field at the centre and at any axial point for single or multi-turn loops with correct SI units, and (3) determine the field direction using the right‑hand thumb rule for a.
