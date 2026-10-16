## ELI5
The treasure sits at 3 + 4i; the guide says 5 units at about 53° from east. Polar form is that instruction: z = r(cos θ + i sin θ) with r = |z| = √(x² + y²) > 0 the modulus and θ = arg(z) the argument, where x = r cos θ and y = r sin θ - equivalently cos θ = x/r, sin θ = y/r straight from right-triangle ratios. The principal argument lives in (-π, π], fixed by quadrant analysis, making the representation unique.

## DEFINITION
The polar form of a non-zero complex number \(z = x + iy\) is \(z = r(\cos\theta + i\sin\theta)\), where \(r = |z| = \sqrt{x^2 + y^2} > 0\) is the modulus and \(\theta = \arg(z)\) is the argument (angle) satisfying \(x = r\cos\theta\), \(y = r\sin\theta\), with the principal argument \(\theta \in (-\pi, \pi]\).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can convert any non-zero complex number from Cartesian form \(x+iy\) to polar form \(r(\cos\theta + i\sin\theta)\) by correctly computing \(r\) and determining the principal argument \(\theta\) using quadrant analysis, and can explain why the representation is unique for a given principal argument.

## SCOPE_BOUNDARY
Covers conversion between Cartesian and polar forms, computation of modulus and principal argument (including quadrant adjustments), and geometric interpretation on the Argand plane. Does NOT cover Euler's form \(re^{i\theta}\), De Moivre's theorem, or operations in polar form (multiplication/division) which are in subsequent nodes.

## WALKTHROUGH
Imagine you are navigating a treasure map on a coordinate grid where the treasure is at point \(3 + 4i\). Instead of saying "go 3 units east and 4 units north", a polar description says "go 5 units at an angle of about 53° from the positive x-axis". This is exactly what polar form does for complex numbers: it replaces Cartesian coordinates \((x,y)\) with distance \(r\) and direction \(\theta\). To begin, plot the complex number on the Argand plane (recall node c11_math_cbse_05_008). The distance from origin is \(r = \sqrt{x^2+y^2}\) (modulus, from node c11_math_cbse_05_007). The angle \(\theta\) is measured anticlockwise from the positive real axis. The key insight: \(\cos\theta = x/r\) and \(\sin\theta = y/r\) come from right-triangle trigonometry, but you must adjust \(\theta\) based on the quadrant of \((x,y)\) to get the principal argument in \((-\pi,\pi]\).

Takeaway: mastery means the conversion pipeline being run in order - plot, r, reference angle, quadrant adjustment - and uniqueness explained through the principal range. Exam moves: convert-to-polar-form questions and justify-the-quadrant-adjustment items. Check yourself: a third-quadrant point needs π added to the arctan, not ignored. Students miss it because the formulas look symmetric, when the definition's quadrant clause is the hard part: the triangle gives the reference, the quadrant gives the truth, and only both together give θ.

## DIAGNOSTIC_QUESTION_1
State the polar form of the complex number \(z = -1 - i\). Write the modulus \(r\) and principal argument \(\theta\) explicitly.

## DIAGNOSTIC_ANSWER_1
\(r = \sqrt{2}\), \(\theta = -\frac{3\pi}{4}\) (or equivalently \(\frac{5\pi}{4}\) but principal argument is \(-\frac{3\pi}{4}\)). Polar form: \(\sqrt{2}\left(\cos\left(-\frac{3\pi}{4}\right) + i\sin\left(-\frac{3\pi}{4}\right)\right)\). A wrong answer like \(\theta = \frac{\pi}{4}\) reveals the student forgot quadrant adjustment: \(\tan^{-1}(1) = \pi/4\) but the point is in QIII where both sine and cosine are negative, so \(\theta = \pi/4 - \pi = -3\pi/4\).

## DIAGNOSTIC_QUESTION_2
Explain why the polar form \(z = r(\cos\theta + i\sin\theta)\) is not unique if we allow any angle \(\theta\), but becomes unique when we restrict \(\theta\) to the principal argument interval \((-\pi, \pi]\).

## DIAGNOSTIC_ANSWER_2
Adding any integer multiple of \(2\pi\) to \(\theta\) gives the same cosine and sine values, so \(r(\cos(\theta+2k\pi) + i\sin(\theta+2k\pi)) = r(\cos\theta + i\sin\theta)\) for all integers \(k\). Restricting to \((-\pi, \pi]\) picks exactly one representative from each equivalence class. A wrong answer that says "\(\theta\) is unique because \(\tan\theta = y/x\) has one solution" reveals confusion between the multi-valued nature of \(\tan^{-1}\) and the principal argument convention.

## DIAGNOSTIC_QUESTION_3
Convert \(z = -2 + 2\sqrt{3}i\) to polar form. Show all steps including quadrant determination.

## DIAGNOSTIC_ANSWER_3
Step 1: \(x = -2, y = 2\sqrt{3}\). Step 2: \(r = \sqrt{(-2)^2 + (2\sqrt{3})^2} = \sqrt{4+12} = 4\). Step 3: \(\tan\alpha = |y/x| = \sqrt{3} \Rightarrow \alpha = \pi/3\). Step 4: Point \((-2, 2\sqrt{3})\) is in QII, so \(\theta = \pi - \alpha = \pi - \pi/3 = 2\pi/3\). Step 5: Polar form: \(4(\cos\frac{2\pi}{3} + i\sin\frac{2\pi}{3})\). A wrong answer with \(\theta = -\pi/3\) or \(\pi/3\) reveals the student used \(\tan^{-1}(y/x)\) directly without quadrant correction.

## DIAGNOSTIC_QUESTION_4
Compare the polar forms of \(z_1 = 1+i\) and \(z_2 = -1-i\). How are their moduli and arguments related? What geometric transformation maps \(z_1\) to \(z_2\) on the Argand plane?

## DIAGNOSTIC_ANSWER_4
\(z_1\): \(r_1=\sqrt{2}, \theta_1=\pi/4\). \(z_2\): \(r_2=\sqrt{2}, \theta_2=-3\pi/4\) (or \(5\pi/4\)). Moduli are equal; arguments differ by \(\pi\) (i.e., \(\theta_2 = \theta_1 - \pi\)). Geometrically, \(z_2 = -z_1\) is a rotation by \(\pi\) radians (180°) about the origin. A wrong answer stating arguments differ by \(\pi/2\) reveals confusion between multiplication by \(i\) (rotation by \(\pi/2\)) and multiplication by \(-1\) (rotation by \(\pi\)).

## DIAGNOSTIC_QUESTION_5
A student converts \(z = -\sqrt{3} + i\) to polar form and writes \(r=2, \theta = \tan^{-1}(-1/\sqrt{3}) = -\pi/6\). Is this correct? If not, identify the error and give the correct principal argument.

## DIAGNOSTIC_ANSWER_5
Incorrect. The student computed \(\tan^{-1}(y/x) = \tan^{-1}(1/(-\sqrt{3})) = -\pi/6\) but this angle is in QIV, while the point \((-\sqrt{3}, 1)\) is in QII. The correct reference angle is \(\pi/6\); since QII, \(\theta = \pi - \pi/6 = 5\pi/6\). The error is blindly using calculator \(\tan^{-1}\) without quadrant analysis. This reveals the common misconception that \(\arg(z) = \tan^{-1}(y/x)\) always.

## DIAGNOSTIC_QUESTION_6
Create a complex number \(z\) (not purely real or imaginary) whose principal argument is exactly \(\frac{2\pi}{3}\) and whose modulus is 5. Write it in both Cartesian and polar forms. Explain how you chose the Cartesian coordinates.

## DIAGNOSTIC_ANSWER_6
Polar: \(5(\cos\frac{2\pi}{3} + i\sin\frac{2\pi}{3})\). Cartesian: \(x = 5\cos\frac{2\pi}{3} = -\frac{5}{2}, y = 5\sin\frac{2\pi}{3} = \frac{5\sqrt{3}}{2}\), so \(z = -\frac{5}{2} + i\frac{5\sqrt{3}}{2}\). A poor answer that gives a point in QI or QIV reveals the student does not connect the argument to the correct quadrant; a good answer shows understanding that \(\cos(2\pi/3)<0, \sin(2\pi/3)>0\) forces QII.

## COMMON_MISCONCEPTION
Students compute \(\theta = \tan^{-1}(y/x)\) using a calculator and take that as the argument without quadrant adjustment. For example, for \(z = -1 - i\), they get \(\tan^{-1}(1) = \pi/4\) and write \(\theta = \pi/4\) (QI), but the point is in QIII where both coordinates are negative, so the correct principal argument is \(\pi/4 - \pi = -3\pi/4\). They also often forget that \(\tan^{-1}\) only returns values in \((-\pi/2, \pi/2)\), missing QII and QIII entirely.

## ON_FAILURE
1. Have the student plot the point \((x,y)\) on the Argand plane and identify the quadrant.
2. Compute the reference angle \(\alpha = \tan^{-1}(|y/x|)\) (always positive, in QI).
3. Use the quadrant rule: QI: \(\theta=\alpha\); QII: \(\theta=\pi-\alpha\); QIII: \(\theta=-\pi+\alpha\) (or \(\alpha-\pi\)); QIV: \(\theta=-\alpha\).
4. Verify by checking that \(\cos\theta\) has the same sign as \(x\) and \(\sin\theta\) has the same sign as \(y\).
5. Practice with at least five points covering all four quadrants and axes.

## PREREQUISITE_NODE_IDS
c11_math_cbse_05_007, c11_math_cbse_05_008, c10_math_cbse_08_001, c10_math_cbse_08_004, c9_math_ch1_3, c11_math_cbse_05_006, c10_math_cbse_08_005

## PREREQUISITE_REASONS
c11_math_cbse_05_007: Provides modulus \(r = |z|\) definition and calculation.
c11_math_cbse_05_008: Introduces Argand plane representation and the geometric meaning of polar coordinates.
c10_math_cbse_08_001: Defines trigonometric ratios \(\sin, \cos, \tan\) in right triangles, essential for \(x=r\cos\theta, y=r\sin\theta\).
c10_math_cbse_08_004: Gives exact values for standard angles (30°, 45°, 60°) used in common polar forms.
c9_math_ch1_3: Establishes quadrant sign conventions for coordinates, needed for argument adjustment.
c11_math_cbse_05_006: Polar form r(cosθ + i sinθ) relies on understanding i as e^(iπ/2).  
c10_math_cbse_08_005: Revise Class 10 Trigonometry (c10_math_cbse_08_001 to c10_math_cbse_08_005) focusing on exact values and the ASTC rule for signs in quadrants.  

## FORWARD_NODE_IDS
c11_math_cbse_05_010

## FORWARD_REASONS
c11_math_cbse_05_010: Euler's form \(re^{i\theta}\) directly extends polar form using the exponential function.

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_04_001, c11_phy_cbse_04_002
## CROSS_SUBJECT_REASONS
c11_physics_ch4_1: Motion in a plane uses vectors with magnitude and direction, directly analogous to modulus and argument of complex numbers.
c11_physics_ch4_2: Projectile motion and circular motion problems use polar coordinates (radius, angle) which mirror complex polar representation.
c11_phy_cbse_04_001: Cross-subject support: Aristotle's fallacy is the incorrect assertion that a continuous external force is require... supplies tools/facts used directly in this node.  
c11_phy_cbse_04_002: Cross-subject support: Newton's First Law of Motion (Law of Inertia) states that a body remains in its state of r... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_math_cbse_05_007 -> c11_math_cbse_05_009 -> c11_math_cbse_05_010

## THIS_FORMULA
\(z = x + iy = r(\cos\theta + i\sin\theta)\) where \(r = \sqrt{x^2 + y^2} > 0\), \(\theta = \arg(z) \in (-\pi, \pi]\), with \(x = r\cos\theta, y = r\sin\theta\).

## FORMULA_VARIABLES
\(z\) = complex number, \(x\) = real part, \(y\) = imaginary part, \(r\) = modulus (distance from origin), \(\theta\) = principal argument (angle from positive real axis, anticlockwise positive).

## FORMULA_UNITS
\(r\) is dimensionless (or same unit as \(x,y\) if they represent physical quantities); \(\theta\) is in radians (dimensionless).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch4_1 | Vectors in physics use magnitude and direction exactly like modulus and argument; addition of vectors corresponds to complex addition in Cartesian form, but rotation/scaling corresponds to polar multiplication.
c11_physics_ch4_2 | Uniform circular motion: position vector \(r(\cos\omega t + i\sin\omega t)\) is a complex number in polar form with time-dependent argument.

## PREREQ_CONCEPT
Trigonometric ratios and quadrant sign rules (ASTC) for sine, cosine, tangent.

## PREREQ_BEFORE
Student must be able to compute \(\sin, \cos, \tan\) for standard angles (\(\pi/6, \pi/4, \pi/3, \pi/2, \pi\)) and determine the sign of each in all four quadrants.

## PREREQ_STUCK
Revise Class 10 Trigonometry (c10_math_cbse_08_001 to c10_math_cbse_08_005) focusing on exact values and the ASTC rule for signs in quadrants.

## WORKED_EXAMPLE_1
PROBLEM: A signal in an electrical engineering lab is represented by the complex impedance \(Z = -3 + 3\sqrt{3}i\) ohms. Express \(Z\) in polar form \(r(\cos\theta + i\sin\theta)\) with principal argument.
STEPS:
- Step 1: Identify real and imaginary parts: \(x = -3\), \(y = 3\sqrt{3}\).
- Step 2: Compute modulus: \(r = \sqrt{x^2 + y^2} = \sqrt{(-3)^2 + (3\sqrt{3})^2} = \sqrt{9 + 27} = \sqrt{36} = 6\).
- Step 3: Find reference angle: \(\tan\alpha = |y/x| = \frac{3\sqrt{3}}{3} = \sqrt{3} \Rightarrow \alpha = \frac{\pi}{3}\).
- Step 4: Determine quadrant: \(x<0, y>0\) ⇒ QII. Principal argument: \(\theta = \pi - \alpha = \pi - \frac{\pi}{3} = \frac{2\pi}{3}\).
- Step 5: Write polar form: \(Z = 6\left(\cos\frac{2\pi}{3} + i\sin\frac{2\pi}{3}\right)\) ohms.
REASONING: The modulus gives the magnitude of impedance, and the argument gives the phase angle. Quadrant analysis ensures the correct phase angle in \((-\pi,\pi]\); using \(\tan^{-1}(y/x)\) directly would give \(-\pi/3\) (QIV), which is wrong because cosine would be positive while \(x\) is negative.
ANSWER: \(6\left(\cos\frac{2\pi}{3} + i\sin\frac{2\pi}{3}\right)\) ohms

## WORKED_EXAMPLE_2
PROBLEM: Convert the complex number \(z = 2\left(\cos\frac{5\pi}{6} + i\sin\frac{5\pi}{6}\right)\) to Cartesian form \(x+iy\). Verify that the principal argument of the result is indeed \(\frac{5\pi}{6}\).
STEPS:
- Step 1: Recognize polar form with \(r=2, \theta=\frac{5\pi}{6}\).
- Step 2: Compute \(x = r\cos\theta = 2\cos\frac{5\pi}{6} = 2\left(-\frac{\sqrt{3}}{2}\right) = -\sqrt{3}\).
- Step 3: Compute \(y = r\sin\theta = 2\sin\frac{5\pi}{6} = 2\left(\frac{1}{2}\right) = 1\).
- Step 4: Cartesian form: \(z = -\sqrt{3} + i\).
- Step 5: Verify argument: For \(x=-\sqrt{3}, y=1\), point is in QII. Reference angle \(\alpha = \tan^{-1}(|1/(-\sqrt{3})|) = \tan^{-1}(1/\sqrt{3}) = \pi/6\). QII ⇒ \(\theta = \pi - \pi/6 = 5\pi/6\). Matches.
REASONING: Conversion from polar to Cartesian uses the defining relations \(x=r\cos\theta, y=r\sin\theta\). Verification by reversing the process confirms consistency and catches sign errors (e.g., if one mistakenly used \(\cos\frac{5\pi}{6} = \sqrt{3}/2\)).
ANSWER: \(-\sqrt{3} + i\)

## WORKED_EXAMPLE_3
PROBLEM: Find all complex numbers \(z\) such that \(|z| = 4\) and \(\arg(z) = \frac{\pi}{3}\) or \(\arg(z) = -\frac{2\pi}{3}\). Plot them on the Argand plane and describe the geometric relationship between the two points.
STEPS:
- Step 1: For \(\arg(z) = \frac{\pi}{3}\) (QI): \(z_1 = 4(\cos\frac{\pi}{3} + i\sin\frac{\pi}{3}) = 4(\frac{1}{2} + i\frac{\sqrt{3}}{2}) = 2 + 2\sqrt{3}i\).
- Step 2: For \(\arg(z) = -\frac{2\pi}{3}\) (QIII): \(z_2 = 4(\cos(-\frac{2\pi}{3}) + i\sin(-\frac{2\pi}{3})) = 4(-\frac{1}{2} - i\frac{\sqrt{3}}{2}) = -2 - 2\sqrt{3}i\).
- Step 3: Observe \(z_2 = -z_1\). Both have same modulus 4.
- Step 4: Arguments differ by \(\pi\): \(\frac{\pi}{3} - (-\frac{2\pi}{3}) = \pi\).
- Step 5: Geometric relationship: The two points are diametrically opposite on the circle \(|z|=4\); one is the rotation of the other by 180° about the origin.
- Step 6: Plot: \(z_1\) at \((2, 2\sqrt{3})\), \(z_2\) at \((-2, -2\sqrt{3})\).
REASONING: This problem combines modulus/argument definition with quadrant awareness. The two arguments \(\pi/3\) and \(-2\pi/3\) are not co-terminal (they differ by \(\pi\), not \(2\pi\)), so they represent distinct points on the same circle. The connection to multiplication by \(-1\) (rotation by \(\pi\)) is a key algebraic-geometric link.
ANSWER: \(z_1 = 2 + 2\sqrt{3}i\), \(z_2 = -2 - 2\sqrt{3}i\); they are endpoints of a diameter of the circle \(|z|=4\).

## COMPETENCY_QUESTION_1
QUESTION: A student claims that the polar form of \(z = -2 - 2i\) is \(2\sqrt{2}(\cos\frac{\pi}{4} + i\sin\frac{\pi}{4})\) because \(\tan^{-1}(1) = \pi/4\) and \(r = \sqrt{8} = 2\sqrt{2}\). Identify the error, give the correct polar form, and explain why the student's answer represents a different complex number.
COMPETENCY: Error identification and correction
STEPS:
- Step 1: Compute correct modulus: \(r = \sqrt{(-2)^2+(-2)^2} = 2\sqrt{2}\) (student got this right).
- Step 2: Determine quadrant: \(x=-2, y=-2\) ⇒ QIII.
- Step 3: Reference angle \(\alpha = \tan^{-1}(|-2/-2|) = \pi/4\).
- Step 4: QIII principal argument: \(\theta = -\pi + \alpha = -\pi + \pi/4 = -3\pi/4\).
- Step 5: Correct polar form: \(2\sqrt{2}(\cos(-\frac{3\pi}{4}) + i\sin(-\frac{3\pi}{4}))\).
- Step 6: Student's form has \(\theta=\pi/4\) (QI), giving \(2\sqrt{2}(\frac{\sqrt{2}}{2} + i\frac{\sqrt{2}}{2}) = 2+2i\), which is the reflection of \(z\) across the origin.
ANSWER: Error: Used \(\tan^{-1}(y/x)\) without quadrant adjustment. Correct form: \(2\sqrt{2}(\cos(-\frac{3\pi}{4}) + i\sin(-\frac{3\pi}{4}))\). Student's form represents \(2+2i\), not \(-2-2i\).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In an AC circuit analysis, three impedances are given in polar form: \(Z_1 = 5(\cos\frac{\pi}{6} + i\sin\frac{\pi}{6})\), \(Z_2 = 3(\cos(-\frac{\pi}{3}) + i\sin(-\frac{\pi}{3}))\), \(Z_3 = 4(\cos\frac{2\pi}{3} + i\sin\frac{2\pi}{3})\). Without converting to Cartesian form, determine which impedance has the largest resistive (real) component and which has the largest reactive (imaginary) component. Justify using properties of cosine and sine on the given intervals.
COMPETENCY: Comparing and justifying
STEPS:
- Step 1: Real part = \(r\cos\theta\), Imaginary part = \(r\sin\theta\).
- Step 2: For \(Z_1\): \(\theta=\pi/6\) (QI) ⇒ \(\cos>0, \sin>0\). Real = \(5\cos\frac{\pi}{6} = 5\frac{\sqrt{3}}{2} \approx 4.33\); Imag = \(5\sin\frac{\pi}{6} = 2.5\).
- Step 3: For \(Z_2\): \(\theta=-\pi/3\) (QIV) ⇒ \(\cos>0, \sin<0\). Real = \(3\cos(-\frac{\pi}{3}) = 3\cdot\frac{1}{2} = 1.5\); Imag = \(3\sin(-\frac{\pi}{3}) = -3\frac{\sqrt{3}}{2} \approx -2.60\) (magnitude 2.60).
- Step 4: For \(Z_3\): \(\theta=2\pi/3\) (QII) ⇒ \(\cos<0, \sin>0\). Real = \(4\cos\frac{2\pi}{3} = 4(-\frac{1}{2}) = -2\); Imag = \(4\sin\frac{2\pi}{3} = 4\frac{\sqrt{3}}{2} \approx 3.46\).
- Step 5: Largest real part: \(Z_1\) (4.33 > 1.5 > -2). Largest imaginary part magnitude: \(Z_3\) (3.46 > 2.60 > 2.5).
- Step 6: Justification: Cosine decreases from 1 to -1 on \([0,\pi]\); sine increases from 0 to 1 on \([0,\pi/2]\) then decreases to 0 on \([\pi/2,\pi]\). The product \(r\cos\theta\) and \(r\sin\theta\) must be compared numerically.
ANSWER: Largest resistive component: \(Z_1\). Largest reactive component magnitude: \(Z_3\).
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Instead of saying "go 3 units east and 4 units north", a polar ______ says "go 5 units at an angle of about 53° from the positive x-axis".

## DIAGNOSTIC_ANSWER_7
description

**A wrong answer ("system" or "instruction") reveals the student has swapped the walkthrough's noun - the distance-plus-angle phrasing is a polar description, replacing the steps-and-directions version.** Description is the walkthrough's own noun for the second dialect of the same location. Recall the 5-units-at-53° phrasing before filling, and give the noun exactly.
