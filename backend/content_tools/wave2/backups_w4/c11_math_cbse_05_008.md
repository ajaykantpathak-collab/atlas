## ELI5
Treasure-map navigation: from the flagpole, walk 3 east and 4 north - or give one bearing and one distance. The Argand plane is the first dialect: plot z = x + iy at the point (x, y), real part across, imaginary part up. The polar representation is the second: modulus r = √(x² + y²) and argument θ, the angle from the positive real axis, giving z = r(cos θ + i sin θ), with the principal argument kept in (-π, π]. Same treasure, two descriptions.

## DEFINITION
The Argand plane is a Cartesian coordinate system where a complex number \(z = x + iy\) is represented as the point \((x, y)\) with the real part \(x\) on the horizontal axis and the imaginary part \(y\) on the vertical axis. The polar representation of the same complex number expresses it in terms of its modulus \(r = |z| = \sqrt{x^2 + y^2}\) and argument \(\theta = \arg(z)\) (the angle made with the positive real axis) as \(z = r(\cos \theta + i \sin \theta)\), where \(r \ge 0\) and \(\theta \in (-\pi, \pi]\) (principal argument).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can plot any complex number on the Argand plane, compute its modulus and principal argument correctly for all four quadrants, and convert between Cartesian form \(x+iy\) and polar form \(r(\cos\theta + i\sin\theta)\) with proper justification of the quadrant adjustment for \(\theta\).

## SCOPE_BOUNDARY
This node covers the geometric interpretation of complex numbers as points/vectors in the Argand plane, the definitions of modulus and argument, conversion between Cartesian and polar forms, and the principal argument convention. It does NOT cover Euler's form \(re^{i\theta}\) (node 010), De Moivre's theorem, or operations in polar form (multiplication/division) which are treated in subsequent nodes.

## WALKTHROUGH
Imagine you are navigating a treasure map in your school courtyard: you start at the flagpole (origin), walk 3 meters east and 4 meters north to reach the treasure. In the Argand plane, the treasure's location is the complex number \(3+4i\). But what if the map only gives the straight-line distance from the flagpole and the angle from east? That is the polar representation. We begin by recalling the Cartesian coordinate system from Class 9 (c9_math_ch1_1) and the modulus from the previous node (c11_math_cbse_05_007). First, plot the point \((x,y)\); then draw the perpendicular to the axes to form a right triangle. The modulus \(r\) is the hypotenuse (distance from origin). The argument \(\theta\) is the angle measured anticlockwise from the positive real axis. For a point in the first quadrant, \(\theta = \tan^{-1}(y/x)\); for other quadrants, we adjust by adding or subtracting \(\pi\). Finally, write \(z = r(\cos\theta + i\sin\theta)\). The key insight is that the same complex number has infinitely many arguments differing by \(2\pi\), but the principal argument is unique in \((-\pi, \pi]\).

Takeaway: mastery means plotting instantly, computing r, and adjusting θ by quadrant before quoting the principal argument. Exam moves: convert-Cartesian-to-polar questions and find-the-principal-argument items where tan⁻¹ alone lies. Check yourself: arctan returns only first- and fourth-quadrant answers; the point's quadrant must overrule it. Students miss it because they trust the calculator's angle, when the definition scopes θ into (-π, π] by hand: add or subtract π as the quadrant demands.

## DIAGNOSTIC_QUESTION_1
State the principal argument of the complex number \(z = -1 - i\). Explain why \(\tan^{-1}(1)\) alone does not give the correct argument.

## DIAGNOSTIC_ANSWER_1
The principal argument is \(-\frac{3\pi}{4}\) (or equivalently \(\frac{5\pi}{4}\) but principal argument must lie in \((-\pi, \pi]\)). \(\tan^{-1}(1) = \frac{\pi}{4}\) gives the reference angle in the first quadrant, but \(z\) lies in the third quadrant where both \(x\) and \(y\) are negative. The correct argument is \(-\pi + \frac{\pi}{4} = -\frac{3\pi}{4}\). A wrong answer of \(\frac{\pi}{4}\) reveals the student ignores quadrant adjustment and treats argument as simply \(\tan^{-1}(y/x)\) without considering signs of \(x\) and \(y\).

## DIAGNOSTIC_QUESTION_2
A student plots \(z = 2 - 2i\) on the Argand plane and claims its polar form is \(2\sqrt{2}(\cos \frac{\pi}{4} + i \sin \frac{\pi}{4})\). Identify the error and give the correct polar form.

## DIAGNOSTIC_ANSWER_2
The modulus is correctly computed as \(\sqrt{2^2 + (-2)^2} = 2\sqrt{2}\). However, the point \((2, -2)\) lies in the fourth quadrant, so the principal argument is \(-\frac{\pi}{4}\) (or \(\frac{7\pi}{4}\)), not \(\frac{\pi}{4}\). The correct polar form is \(2\sqrt{2}(\cos(-\frac{\pi}{4}) + i \sin(-\frac{\pi}{4}))\). The error shows the student used the reference angle without adjusting for the quadrant where sine is negative and cosine positive.

## DIAGNOSTIC_QUESTION_3
Convert the complex number \(z = -\sqrt{3} + i\) to polar form. Show all steps including quadrant determination.

## DIAGNOSTIC_ANSWER_3
Step 1: \(x = -\sqrt{3}, y = 1\). Step 2: Modulus \(r = \sqrt{(-\sqrt{3})^2 + 1^2} = \sqrt{3+1} = 2\). Step 3: Reference angle \(\alpha = \tan^{-1}(|y/x|) = \tan^{-1}(1/\sqrt{3}) = \pi/6\). Step 4: Since \(x < 0, y > 0\), the point is in the second quadrant. Principal argument \(\theta = \pi - \alpha = \pi - \pi/6 = 5\pi/6\). Step 5: Polar form: \(z = 2(\cos \frac{5\pi}{6} + i \sin \frac{5\pi}{6})\). A wrong answer using \(\theta = -\pi/6\) or \(\pi/6\) reveals failure to place the point in the correct quadrant.

## DIAGNOSTIC_QUESTION_4
Compare the polar forms of \(z_1 = 1 + i\) and \(z_2 = -1 - i\). How are their moduli and arguments related? What geometric transformation maps \(z_1\) to \(z_2\) in the Argand plane?

## DIAGNOSTIC_ANSWER_4
\(z_1\) has modulus \(\sqrt{2}\) and argument \(\pi/4\). \(z_2\) has modulus \(\sqrt{2}\) and argument \(-3\pi/4\) (or \(5\pi/4\)). The moduli are equal; the arguments differ by \(\pi\) (i.e., \(5\pi/4 - \pi/4 = \pi\)). Geometrically, \(z_2\) is the rotation of \(z_1\) by \(\pi\) radians (180°) about the origin, which is equivalent to multiplying by \(-1\). A student who says arguments are opposites or differ by \(\pi/2\) shows confusion about quadrant symmetry.

## DIAGNOSTIC_QUESTION_5
A student solves for the argument of \(z = -2\) and writes \(\theta = \tan^{-1}(0/(-2)) = 0\). Evaluate this solution and provide the correct argument.

## DIAGNOSTIC_ANSWER_5
The solution is incorrect because \(\tan^{-1}(0) = 0\) corresponds to the positive real axis, but \(z = -2\) lies on the negative real axis. The principal argument of a negative real number is \(\pi\) (or \(-\pi\), but by convention \(\pi\) is included in \((-\pi, \pi]\)). The correct argument is \(\pi\). This error reveals the student applies the formula \(\theta = \tan^{-1}(y/x)\) mechanically without considering that \(x < 0, y = 0\) is a special case where the point is on the negative x-axis.

## DIAGNOSTIC_QUESTION_6
Construct a complex number \(z\) whose modulus is 5 and whose principal argument is \(\frac{2\pi}{3}\). Write it in both Cartesian and polar forms. Then create a different complex number with the same modulus but an argument that is not co-terminal with \(\frac{2\pi}{3}\).

## DIAGNOSTIC_ANSWER_6
Polar form: \(z = 5(\cos \frac{2\pi}{3} + i \sin \frac{2\pi}{3})\). Cartesian: \(x = 5\cos \frac{2\pi}{3} = 5(-\frac{1}{2}) = -2.5\), \(y = 5\sin \frac{2\pi}{3} = 5(\frac{\sqrt{3}}{2}) = \frac{5\sqrt{3}}{2}\), so \(z = -2.5 + i\frac{5\sqrt{3}}{2}\). A different number with same modulus: \(w = 5(\cos \frac{5\pi}{3} + i \sin \frac{5\pi}{3}) = 2.5 - i\frac{5\sqrt{3}}{2}\) (argument \(\frac{5\pi}{3}\) is not co-terminal with \(\frac{2\pi}{3}\) because difference is not a multiple of \(2\pi\)). A poor answer might give an argument differing by \(2\pi\) (e.g., \(\frac{8\pi}{3}\)) which is co-terminal, showing misunderstanding of "co-terminal".

## COMMON_MISCONCEPTION
Students often compute the argument as \(\theta = \tan^{-1}(y/x)\) without adjusting for the quadrant, leading to an angle in the wrong quadrant. For example, for \(z = -1 + i\), they compute \(\tan^{-1}(-1) = -\pi/4\) and stop, placing the point in the fourth quadrant instead of the second quadrant where the correct argument is \(3\pi/4\). Another error is using the principal argument range \([0, 2\pi)\) instead of \((-\pi, \pi]\), causing inconsistency in board exams where the NCERT convention is \((-\pi, \pi]\).

## ON_FAILURE
If a student cannot determine the correct quadrant, guide them through these steps: 1) Plot the point \((x,y)\) on graph paper. 2) Identify the quadrant by signs of \(x\) and \(y\). 3) Compute the reference angle \(\alpha = \tan^{-1}(|y/x|)\). 4) Use the quadrant rule: Q1: \(\theta = \alpha\); Q2: \(\theta = \pi - \alpha\); Q3: \(\theta = -\pi + \alpha\) (or \(\alpha - \pi\)); Q4: \(\theta = -\alpha\). 5) Verify that the resulting \(\theta\) lies in \((-\pi, \pi]\). Practice with points on axes: \(x>0,y=0 \to 0\); \(x<0,y=0 \to \pi\); \(x=0,y>0 \to \pi/2\); \(x=0,y<0 \to -\pi/2\). Emphasize that \(\tan^{-1}\) only returns angles in \((-\pi/2, \pi/2)\), so it cannot directly give Q2 or Q3 angles.

## PREREQUISITE_NODE_IDS
c11_math_cbse_05_002, c11_math_cbse_05_007, c9_math_ch1_1, c9_math_ch1_3, c10_math_cbse_08_001, c10_math_cbse_08_004, c11_math_cbse_05_003, c11_math_cbse_05_004, c11_math_cbse_05_005, c11_math_cbse_05_006

## PREREQUISITE_REASONS
c11_math_cbse_05_002: Need to understand standard form \(x+iy\) to identify real and imaginary parts for plotting.
c11_math_cbse_05_007: Modulus definition \(|z| = \sqrt{x^2+y^2}\) is essential for polar radius \(r\).
c9_math_ch1_1: Cartesian coordinate system and plotting points \((x,y)\) is the foundation of Argand plane.
c9_math_ch1_3: Understanding quadrants and signs of coordinates is crucial for argument determination.
c10_math_cbse_08_001: Trigonometric ratios \(\sin, \cos, \tan\) in right triangles are used to relate \(x,y\) to \(r,\theta\).
c10_math_cbse_08_004: Specific angle values (30°, 45°, 60°) help compute exact arguments for common complex numbers.
c11_math_cbse_05_003: Argand plane represents addition as vector addition; subtraction as vector difference.  
c11_math_cbse_05_004: Argand plane geometric interpretation of multiplication (rotation/scaling) builds on algebraic product.  
c11_math_cbse_05_005: Polar representation gives geometric meaning to division (divide moduli, subtract arguments)  
c11_math_cbse_05_006: Argand plane representation uses i as rotation by 90°.  

## FORWARD_NODE_IDS
c11_math_cbse_05_009, c11_math_cbse_05_010, c11_math_cbse_05_012, c12_phy_cbse_07_006

## FORWARD_REASONS
c11_math_cbse_05_009: Polar form \(r(\cos\theta + i\sin\theta)\) is the direct prerequisite for deeper exploration of polar form properties.
c11_math_cbse_05_010: Euler's form \(re^{i\theta}\) builds on polar representation by introducing exponential notation.
c11_math_cbse_05_012: Geometric interpretations (addition, multiplication, conjugation) rely on Argand plane visualization.
c12_phy_cbse_07_006: Argand plane/polar representation underpins phasor notation used for AC voltage/current phase relationships.  

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_04_001, c11_phy_cbse_04_002
## CROSS_SUBJECT_REASONS
c11_physics_ch4_1: Vectors in physics are represented in a plane with magnitude and direction, exactly analogous to modulus and argument of complex numbers.
c11_physics_ch4_2: Resolution of vectors into components and finding resultant magnitude/direction uses the same trigonometry as converting between Cartesian and polar forms.
c11_phy_cbse_04_001: Cross-subject support: Aristotle's fallacy is the incorrect assertion that a continuous external force is require... supplies tools/facts used directly in this node.  
c11_phy_cbse_04_002: Cross-subject support: Newton's First Law of Motion (Law of Inertia) states that a body remains in its state of r... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_math_cbse_05_002 -> c11_math_cbse_05_007 -> c11_math_cbse_05_008 -> c11_math_cbse_05_009 -> c11_math_cbse_05_010

## THIS_FORMULA
\(z = x + iy = r(\cos \theta + i \sin \theta)\), where \(r = \sqrt{x^2 + y^2} \ge 0\), \(\theta = \arg(z) \in (-\pi, \pi]\), \(x = r\cos\theta\), \(y = r\sin\theta\), \(\tan\theta = y/x\) (with quadrant adjustment)

## FORMULA_VARIABLES
\(x\) = real part of \(z\), \(y\) = imaginary part of \(z\), \(r\) = modulus (distance from origin), \(\theta\) = principal argument (angle from positive real axis, anticlockwise positive)

## FORMULA_UNITS
dimensionless (complex numbers are pure numbers; modulus has same units as the quantity if applied physically, but here dimensionless)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch4_1 | Vectors in a plane are added geometrically and have magnitude/direction; complex numbers in Argand plane follow identical rules for addition and polar representation.
c11_physics_ch4_2 | The resolution of a vector into perpendicular components uses \(x = r\cos\theta, y = r\sin\theta\), exactly the conversion from polar to Cartesian form of a complex number.

## PREREQ_CONCEPT
Understanding of Cartesian coordinates, quadrant signs, and basic trigonometry (sine, cosine, tangent of standard angles) is essential before starting this node.

## PREREQ_BEFORE
The student must be able to plot points \((x,y)\) in all four quadrants, compute \(\sqrt{x^2+y^2}\), and evaluate \(\sin, \cos, \tan\) for angles \(0, \pi/6, \pi/4, \pi/3, \pi/2, \pi\) and their negative counterparts.

## PREREQ_STUCK
If stuck, revisit Class 9 coordinate geometry (c9_math_ch1_1, c9_math_ch1_3) for plotting and quadrants, and Class 10 trigonometry (c10_math_cbse_08_001, c10_math_cbse_08_004) for trigonometric ratios of standard angles.

## WORKED_EXAMPLE_1
PROBLEM: Represent the complex number \(z = -3 + 3i\) on the Argand plane and find its polar form. Verify that the polar form yields the same Cartesian coordinates.

STEPS:
- Step 1: Identify \(x = -3, y = 3\). Plot the point \((-3, 3)\) in the second quadrant.
- Step 2: Compute modulus \(r = \sqrt{(-3)^2 + 3^2} = \sqrt{9+9} = \sqrt{18} = 3\sqrt{2}\).
- Step 3: Find reference angle \(\alpha = \tan^{-1}(|y/x|) = \tan^{-1}(1) = \pi/4\).
- Step 4: Since point is in Q2 (\(x<0, y>0\)), principal argument \(\theta = \pi - \alpha = \pi - \pi/4 = 3\pi/4\). Check: \(\theta \in (-\pi, \pi]\) ✓.
- Step 5: Write polar form: \(z = 3\sqrt{2}(\cos \frac{3\pi}{4} + i \sin \frac{3\pi}{4})\).
- Step 6: Verify: \(\cos \frac{3\pi}{4} = -\frac{1}{\sqrt{2}}, \sin \frac{3\pi}{4} = \frac{1}{\sqrt{2}}\). Then \(x = 3\sqrt{2} \cdot (-\frac{1}{\sqrt{2}}) = -3\), \(y = 3\sqrt{2} \cdot \frac{1}{\sqrt{2}} = 3\). Matches original.

REASONING: The modulus is the distance from origin, always non-negative. The argument must reflect the actual quadrant; using \(\tan^{-1}(y/x)\) directly gives \(-\pi/4\) (Q4), which is wrong. The quadrant adjustment ensures the angle points to the correct location. Verification by back-substitution confirms correctness.

ANSWER: Polar form: \(z = 3\sqrt{2}(\cos \frac{3\pi}{4} + i \sin \frac{3\pi}{4})\). Modulus = \(3\sqrt{2}\), Principal argument = \(3\pi/4\).

## WORKED_EXAMPLE_2
PROBLEM: Convert the polar form \(z = 4(\cos \frac{5\pi}{6} + i \sin \frac{5\pi}{6})\) to Cartesian form \(x + iy\). Then determine in which quadrant the point lies and find its distance from the origin.

STEPS:
- Step 1: Identify \(r = 4\), \(\theta = \frac{5\pi}{6}\).
- Step 2: Compute \(x = r\cos\theta = 4 \cos \frac{5\pi}{6}\). \(\cos \frac{5\pi}{6} = \cos(\pi - \frac{\pi}{6}) = -\cos \frac{\pi}{6} = -\frac{\sqrt{3}}{2}\). So \(x = 4 \cdot (-\frac{\sqrt{3}}{2}) = -2\sqrt{3}\).
- Step 3: Compute \(y = r\sin\theta = 4 \sin \frac{5\pi}{6}\). \(\sin \frac{5\pi}{6} = \sin(\pi - \frac{\pi}{6}) = \sin \frac{\pi}{6} = \frac{1}{2}\). So \(y = 4 \cdot \frac{1}{2} = 2\).
- Step 4: Cartesian form: \(z = -2\sqrt{3} + 2i\).
- Step 5: Quadrant: \(x < 0, y > 0\) → second quadrant.
- Step 6: Distance from origin = modulus \(r = 4\) (by definition). Verify: \(\sqrt{(-2\sqrt{3})^2 + 2^2} = \sqrt{12+4} = \sqrt{16} = 4\).

REASONING: Converting from polar to Cartesian uses the definitions \(x = r\cos\theta, y = r\sin\theta\). The angle \(\frac{5\pi}{6}\) is in Q2, so cosine is negative, sine positive, giving a point in Q2. The modulus is directly given as \(r\), but verifying with Pythagoras ensures no calculation error.

ANSWER: Cartesian form: \(z = -2\sqrt{3} + 2i\). Quadrant: II. Distance from origin: 4 units.

## WORKED_EXAMPLE_3
PROBLEM: A complex number \(z\) has modulus 6 and argument \(-\frac{2\pi}{3}\). Write \(z\) in Cartesian form. Then find the complex number \(w\) obtained by rotating \(z\) by \(\frac{\pi}{2}\) anticlockwise about the origin, and express \(w\) in both polar and Cartesian forms.

STEPS:
- Step 1: For \(z\): \(r = 6\), \(\theta = -\frac{2\pi}{3}\).
- Step 2: \(x = 6 \cos(-\frac{2\pi}{3}) = 6 \cos \frac{2\pi}{3}\) (cosine is even). \(\cos \frac{2\pi}{3} = -\frac{1}{2}\). So \(x = -3\).
- Step 3: \(y = 6 \sin(-\frac{2\pi}{3}) = -6 \sin \frac{2\pi}{3}\) (sine is odd). \(\sin \frac{2\pi}{3} = \frac{\sqrt{3}}{2}\). So \(y = -6 \cdot \frac{\sqrt{3}}{2} = -3\sqrt{3}\).
- Step 4: \(z = -3 - 3\sqrt{3}i\). Check quadrant: Q3 (both negative). Argument \(-\frac{2\pi}{3}\) is in \((-\pi, \pi]\) ✓.
- Step 5: Rotation by \(\frac{\pi}{2}\) anticlockwise adds \(\frac{\pi}{2}\) to the argument: \(\theta_w = -\frac{2\pi}{3} + \frac{\pi}{2} = -\frac{4\pi}{6} + \frac{3\pi}{6} = -\frac{\pi}{6}\). Modulus unchanged: \(r_w = 6\).
- Step 6: Polar form of \(w\): \(w = 6(\cos(-\frac{\pi}{6}) + i \sin(-\frac{\pi}{6}))\).
- Step 7: Cartesian form of \(w\): \(x_w = 6 \cos(-\frac{\pi}{6}) = 6 \cdot \frac{\sqrt{3}}{2} = 3\sqrt{3}\). \(y_w = 6 \sin(-\frac{\pi}{6}) = 6 \cdot (-\frac{1}{2}) = -3\). So \(w = 3\sqrt{3} - 3i\) (Q4).
- Step 8: Verify rotation geometrically: \(z\) in Q3 at angle \(-120°\); rotating by \(+90°\) gives \(-30°\) (or \(330°\)), which is Q4. Coordinates match.

REASONING: Rotation in the Argand plane corresponds to addition of angles in polar form. This example combines conversion between forms and the geometric interpretation of argument addition, linking to multiplication by \(i\) (since multiplying by \(i\) rotates by \(\pi/2\)). The step-by-step trigonometric evaluation reinforces exact values for standard angles.

ANSWER: \(z = -3 - 3\sqrt{3}i\). \(w\) polar: \(6(\cos(-\frac{\pi}{6}) + i \sin(-\frac{\pi}{6}))\). \(w\) Cartesian: \(3\sqrt{3} - 3i\).

## COMPETENCY_QUESTION_1
QUESTION: A student claims that the complex numbers \(z_1 = 2(\cos \frac{\pi}{3} + i \sin \frac{\pi}{3})\) and \(z_2 = 2(\cos \frac{4\pi}{3} + i \sin \frac{4\pi}{3})\) are conjugates of each other. Is the student correct? Justify your answer by plotting both on the Argand plane and comparing their Cartesian forms.

COMPETENCY: Error identification and correction
STEPS:
- Step 1: Convert both to Cartesian form.
- Step 2: Plot the points and observe symmetry.
- Step 3: Recall definition of conjugate: \(\overline{x+iy} = x-iy\).
- Step 4: Compare and conclude.
ANSWER: 
\(z_1 = 2(\frac{1}{2} + i \frac{\sqrt{3}}{2}) = 1 + i\sqrt{3}\) (Q1). 
\(z_2 = 2(-\frac{1}{2} - i \frac{\sqrt{3}}{2}) = -1 - i\sqrt{3}\) (Q3). 
The conjugate of \(z_1\) is \(1 - i\sqrt{3}\), which is not \(z_2\). The points are symmetric about the origin (rotation by \(\pi\)), not about the real axis. The student is incorrect.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Find all complex numbers \(z\) such that \(|z| = 2\) and \(\arg(z) = \frac{\pi}{4} + k\pi\) for some integer \(k\). Express your answer in both polar and Cartesian forms. How many distinct complex numbers satisfy this condition?

COMPETENCY: Translating real-world situations to mathematical expressions (here, interpreting a condition on modulus and argument)
STEPS:
- Step 1: Understand that \(|z| = 2\) fixes modulus, \(\arg(z) = \frac{\pi}{4} + k\pi\) gives possible arguments.
- Step 2: Determine distinct principal arguments in \((-\pi, \pi]\).
- Step 3: For each distinct argument, write polar and Cartesian forms.
- Step 4: Count distinct numbers.
ANSWER:
For \(k = 0\): \(\theta = \pi/4\) → \(z_1 = 2(\cos \pi/4 + i \sin \pi/4) = \sqrt{2} + i\sqrt{2}\).
For \(k = 1\): \(\theta = 5\pi/4\) (equivalent to \(-3\pi/4\) in principal range) → \(z_2 = 2(\cos 5\pi/4 + i \sin 5\pi/4) = -\sqrt{2} - i\sqrt{2}\).
For \(k = -1\): \(\theta = -3\pi/4\) (same as \(k=1\)).
For \(k = 2\): \(\theta = 9\pi/4 = 2\pi + \pi/4\) → same as \(k=0\).
Thus only two distinct complex numbers: \(\sqrt{2} + i\sqrt{2}\) and \(-\sqrt{2} - i\sqrt{2}\). They are opposites (negatives of each other).
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you are navigating a treasure map in your school courtyard: you start at the ______ (origin), walk 3 meters east and 4 meters north to reach the treasure.

## DIAGNOSTIC_ANSWER_7
flagpole

**A wrong answer ("tree" or "gate") reveals the student has swapped the walkthrough's landmark - the treasure hunt starts at the flagpole, the map's origin.** Flagpole is the walkthrough's own landmark standing in for the point (0, 0). Recall the 3-metres-east, 4-metres-north walk before filling, and give the noun exactly as written.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are ______ a treasure map in your school courtyard: you start at the flagpole (origin), walk 3 meters east and 4 meters north to reach the treasure.

## DIAGNOSTIC_ANSWER_8
navigating

**A wrong answer ("reading" or "drawing") reveals the student has paraphrased the walkthrough's participle - a treasure map is being navigated across the school courtyard.** Navigating is the walkthrough's own participle, and the participle is what the blank grades. Recall the flagpole start and the bearing-versus-steps contrast before filling, and fill the word exactly.
