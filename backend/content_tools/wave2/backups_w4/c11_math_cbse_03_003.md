## ELI5
A Ferris wheel shrunk to a unit circle: the seat starts at (1, 0) and travels arc length x anticlockwise, landing at P(a, b). That landing point is the whole definition: cos x = a, sin x = b, tan x = b/a when a ≠ 0, and the reciprocals cosec, sec, cot whenever their denominators live. Coordinates, not triangle sides - which is why sine and cosine now exist for every real x, far past the 0° to 90° nursery of ratios.

## DEFINITION
For any angle \(x\) measured in radians, let \(P(a, b)\) be the point on the unit circle \(x^2 + y^2 = 1\) such that the arc length from \((1,0)\) to \(P\) along the circle is \(x\) (anticlockwise for positive \(x\), clockwise for negative \(x\)). Then the trigonometric functions are defined as \(\cos x = a\), \(\sin x = b\), \(\tan x = \frac{\sin x}{\cos x} = \frac{b}{a}\) (provided \(a \neq 0\)), \(\cosec x = \frac{1}{\sin x}\) (\(\sin x \neq 0\)), \(\sec x = \frac{1}{\cos x}\) (\(\cos x \neq 0\)), \(\cot x = \frac{\cos x}{\sin x}\) (\(\sin x \neq 0\)).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can define all six trigonometric functions for any real angle using the unit circle, compute their values for quadrantal angles (\(0, \frac{\pi}{2}, \pi, \frac{3\pi}{2}, 2\pi\)), and explain the periodic nature \(\sin(2n\pi + x) = \sin x\), \(\cos(2n\pi + x) = \cos x\). The student can also determine the sign of each function in the four quadrants using coordinates of \(P(a,b)\).

## SCOPE_BOUNDARY
This node covers the unit-circle definitions of \(\sin x, \cos x, \tan x\) and their reciprocals for any angle \(x \in \mathbb{R}\), the values at quadrantal angles, the fundamental identity \(\sin^2 x + \cos^2 x = 1\), and the periodic property with period \(2\pi\). It does NOT cover sum/difference formulas, double/triple angle formulas, transformation formulae, or solving trigonometric equations (those are in later nodes c11_math_cbse_03_009–014).

## WALKTHROUGH
Imagine a giant Ferris wheel at a fair in Delhi with radius 10 metres. The centre is at ground level, and a seat starts at the far right (3 o'clock position). As the wheel rotates anticlockwise, the seat's height above ground and horizontal distance from the centre change continuously. If we scale the wheel down to a unit circle (radius 1 metre), the seat's coordinates become exactly \(\cos \theta\) and \(\sin \theta\) where \(\theta\) is the angle rotated in radians. This real-world rotation motivates extending trigonometric ratios beyond acute angles: we simply track the coordinates of a point moving on the unit circle. To begin, draw a unit circle centred at the origin, mark an angle \(x\) from the positive x-axis, drop perpendiculars to the axes, and read off the coordinates. The key insight is that \(\sin x\) and \(\cos x\) are just the y- and x-coordinates of that point, making them defined for all real \(x\), not just \(0^\circ\) to \(90^\circ\).

Takeaway: mastery means the six functions being read as coordinates and their ratios, quadrantal values computed on sight, and periodicity sin(2nπ + x) = sin x stated as a lap rule. Exam moves: define-via-unit-circle questions and evaluate-quadrantal-angles items with the point P(a, b) named. Check yourself: anticlockwise is positive arc; clockwise walks in with a minus. Students miss it because they keep reaching for triangles, when the definition's circle covers every angle: the seat's coordinates are the values, and quadrant signs fall out of a and b automatically.

## DIAGNOSTIC_QUESTION_1
State the coordinates of the point on the unit circle corresponding to an angle of \(\frac{3\pi}{2}\) radians, and hence write the values of \(\sin \frac{3\pi}{2}\), \(\cos \frac{3\pi}{2}\), and \(\tan \frac{3\pi}{2}\).

## DIAGNOSTIC_ANSWER_1
The point is \((0, -1)\). Therefore \(\sin \frac{3\pi}{2} = -1\), \(\cos \frac{3\pi}{2} = 0\), and \(\tan \frac{3\pi}{2}\) is undefined (division by zero). A wrong answer like \(( -1, 0)\) reveals the student confuses the order of coordinates or the direction of rotation; answering \(\tan = 0\) shows they forget that \(\tan\) is undefined when \(\cos = 0\).

## DIAGNOSTIC_QUESTION_2
Explain why \(\sin^2 x + \cos^2 x = 1\) holds for every real number \(x\), using the unit circle definition.

## DIAGNOSTIC_ANSWER_2
For any angle \(x\), the point \(P(\cos x, \sin x)\) lies on the unit circle \(x^2 + y^2 = 1\). Substituting the coordinates gives \(\cos^2 x + \sin^2 x = 1\). This is true for all \(x\) because the definition places \(P\) exactly on that circle. A student who says "it's a Pythagorean identity from right triangles" only understands it for acute angles and misses the extension to all real numbers via the unit circle.

## DIAGNOSTIC_QUESTION_3
If \(\cos x = -\frac{4}{5}\) and \(x\) lies in the third quadrant, find \(\sin x\) and \(\tan x\).

## DIAGNOSTIC_ANSWER_3
Step 1: Use \(\sin^2 x = 1 - \cos^2 x = 1 - \frac{16}{25} = \frac{9}{25}\). Step 2: In the third quadrant, \(\sin x\) is negative, so \(\sin x = -\frac{3}{5}\). Step 3: \(\tan x = \frac{\sin x}{\cos x} = \frac{-3/5}{-4/5} = \frac{3}{4}\). A wrong sign for \(\sin x\) (e.g., \(+\frac{3}{5}\)) shows the student does not apply quadrant sign rules; a wrong \(\tan\) sign (e.g., \(-\frac{3}{4}\)) indicates they mishandle division of two negatives.

## DIAGNOSTIC_QUESTION_4
Compare the values of \(\sin \frac{5\pi}{6}\) and \(\sin \frac{7\pi}{6}\). Without using a calculator, determine which is larger and explain using the unit circle.

## DIAGNOSTIC_ANSWER_4
\(\frac{5\pi}{6}\) is in QII (reference angle \(\frac{\pi}{6}\)), so \(\sin \frac{5\pi}{6} = \sin \frac{\pi}{6} = \frac{1}{2}\). \(\frac{7\pi}{6}\) is in QIII (reference angle \(\frac{\pi}{6}\)), so \(\sin \frac{7\pi}{6} = -\sin \frac{\pi}{6} = -\frac{1}{2}\). Thus \(\sin \frac{5\pi}{6} > \sin \frac{7\pi}{6}\). A student who says they are equal in magnitude but misses the sign difference does not fully grasp how the y-coordinate changes sign across quadrants.

## DIAGNOSTIC_QUESTION_5
A student claims that \(\tan x\) is periodic with period \(2\pi\) because \(\sin x\) and \(\cos x\) have period \(2\pi\). Evaluate this claim and correct it if necessary.

## DIAGNOSTIC_ANSWER_5
The claim is incorrect. \(\tan x = \frac{\sin x}{\cos x}\). Since \(\sin(x+\pi) = -\sin x\) and \(\cos(x+\pi) = -\cos x\), the ratio \(\tan(x+\pi) = \frac{-\sin x}{-\cos x} = \tan x\). Hence the fundamental period of \(\tan x\) is \(\pi\), not \(2\pi\). A student who agrees with the claim overlooks that the signs of both numerator and denominator flip simultaneously, leaving the ratio unchanged after \(\pi\).

## DIAGNOSTIC_QUESTION_6
Construct a real-world problem (with an Indian context) that requires finding the exact value of \(\cos \frac{2\pi}{3}\) using the unit circle definition, and solve it.

## DIAGNOSTIC_ANSWER_6
Example problem: "A wind turbine blade in Gujarat has length 1 unit. At a certain instant, the blade makes an angle of \(120^\circ\) with the positive x-axis (east direction). Find the horizontal distance of the blade tip from the vertical axis." Solution: \(120^\circ = \frac{2\pi}{3}\) rad, which lies in QII. Reference angle is \(\frac{\pi}{3}\). In QII, \(\cos\) is negative, so \(\cos \frac{2\pi}{3} = -\cos \frac{\pi}{3} = -\frac{1}{2}\). The horizontal distance is \(\frac{1}{2}\) unit to the left of the axis. A poor answer would give \(\cos 120^\circ = -0.5\) without linking to the unit circle or reference angle, showing only calculator reliance.

## COMMON_MISCONCEPTION
Students often treat \(\sin x\) and \(\cos x\) as only the ratios \(\frac{\text{opposite}}{\text{hypotenuse}}\) and \(\frac{\text{adjacent}}{\text{hypotenuse}}\) from right-triangle trigonometry (Class 10). When faced with an angle like \(150^\circ\) or \(-\frac{\pi}{4}\), they try to draw a right triangle with that angle, which is impossible for obtuse/negative angles. They then either give up or incorrectly use the acute reference angle without adjusting the sign, e.g., stating \(\sin 150^\circ = \frac{1}{2}\) but \(\cos 150^\circ = \frac{\sqrt{3}}{2}\) (missing the negative sign in QII). The exact wrong step is: "Reference angle is \(30^\circ\), so \(\sin 150^\circ = \sin 30^\circ = \frac{1}{2}\) and \(\cos 150^\circ = \cos 30^\circ = \frac{\sqrt{3}}{2}\)" — forgetting that in QII, \(x\)-coordinate (cosine) is negative.

## ON_FAILURE
1. Return to the unit circle diagram: draw the angle in standard position, identify the quadrant, and mark the coordinates \((a,b)\) of the intersection point. 2. Explicitly state: "In this quadrant, \(a\) is positive/negative and \(b\) is positive/negative." 3. Use the definition \(\cos x = a, \sin x = b\) to assign signs. 4. Practice with quadrantal angles first (\(0, \frac{\pi}{2}, \pi, \frac{3\pi}{2}, 2\pi\)) where coordinates are \((\pm1, 0)\) or \((0, \pm1)\) to build confidence. 5. Then move to angles like \(\frac{2\pi}{3}, \frac{4\pi}{3}, \frac{5\pi}{3}\) using reference angles and the sign rule: "All Students Take Calculus" (ASTC) for signs of \(\sin, \cos, \tan\) in QI–QIV.

## PREREQUISITE_NODE_IDS
c11_math_cbse_03_001, c11_math_cbse_03_002, c10_math_cbse_08_001, c9_math_ch1_3, c9_math_ch6_2
## PREREQUISITE_REASONS
c11_math_cbse_03_001: Understanding angle measurement (degree/radian) and positive/negative rotation is essential to place the angle on the unit circle.
c11_math_cbse_03_002: Converting between degrees and radians allows students to work with angles given in either unit.
c10_math_cbse_08_001: Prior knowledge of trigonometric ratios in right triangles provides the intuitive foundation for the unit circle extension.
c9_math_ch1_3: Quadrants and signs of coordinates are needed to determine signs of \(\sin x\) and \(\cos x\).
c9_math_ch6_2: Circumference of a circle (\(2\pi r\)) underpins the relation \(l = r\theta\) and the fact that one revolution is \(2\pi\) radians.

## FORWARD_NODE_IDS
c11_math_cbse_03_004, c11_math_cbse_03_005, c11_math_cbse_03_006, c11_math_cbse_03_007, c11_math_cbse_03_008, c11_math_cbse_03_010, c11_math_cbse_03_012, c11_math_cbse_03_014, c12_math_cbse_02_001, c12_math_cbse_02_002, c12_math_cbse_02_003, c12_math_cbse_02_004, c12_math_cbse_05_008, c12_math_cbse_07_004, c12_math_cbse_10_004, c12_phy_cbse_04_001, c12_phy_cbse_06_005, c12_phy_cbse_07_002, c12_phy_cbse_07_007, c12_phy_cbse_09_003, c12_phy_cbse_09_004, c12_phy_cbse_10_002, c12_phy_cbse_10_007, c12_phy_cbse_10_008

## FORWARD_REASONS
c11_math_cbse_03_004: The unit circle definition is used to find exact values for acute angles (special triangles).
c11_math_cbse_03_005: Extending to any angle requires the unit circle definition and quadrant sign rules.
c11_math_cbse_03_006: Signs of trigonometric functions in each quadrant are derived directly from the signs of coordinates \((a,b)\).
c11_math_cbse_03_007: Domain and range follow from the fact that \(a,b \in [-1,1]\) on the unit circle.
c11_math_cbse_03_008: The Pythagorean identity \(\sin^2 x + \cos^2 x = 1\) is an immediate consequence of the unit circle equation \(a^2 + b^2 = 1\).
c11_math_cbse_03_010: Basic definitions of \(\sin x, \cos x, \tan x\) as ratios on the unit circle are needed to understand the domain restrictions (e.g., \(\tan 2x\) undefined when \(\cos 2x = 0\)).  
c11_math_cbse_03_012: Basic definitions of sin, cos, tan as functions of any angle are needed to apply formulas beyond acute angles.  
c11_math_cbse_03_014: Defines trigonometric functions on the unit circle, essential for understanding values.  
c12_math_cbse_02_001: Basic definitions of sin, cos, tan, cot, sec, cosec and their values at standard angles are needed to evaluate principal values.  
c12_math_cbse_02_002: Defines trigonometric functions sin, cos, tan for any angle — needed to understand why we restrict domains.  
c12_math_cbse_02_003: Defines \( \sin, \cos, \tan \) for any angle using unit circle — needed to compute values like \( \sin \frac{5\pi}{6} \).  
c12_math_cbse_02_004: Defines $\sin$, $\cos$ as functions on $\mathbb{R}$, necessary to understand why restriction is needed for inverses.  
c12_math_cbse_05_008: Defines sin, cos, tan and their inverses with principal value branches.  
c12_math_cbse_07_004: Definitions and properties of trigonometric functions needed for integrals involving sin, cos, tan.  
c12_math_cbse_10_004: Trigonometric functions (sin, cos, tan) — needed for the geometric definition \(\vec{a}\cdot\vec{b}=|\vec{a}||\vec{b}|\cos\theta\).  
c12_phy_cbse_04_001: Trigonometric functions (sin, cos, tan) — used in \(\sin\theta\) for magnitude and in resolving vectors.  
c12_phy_cbse_06_005: Trigonometric functions (sin, cos) and their derivatives are essential for ε = ε₀ sin(ωt).  
c12_phy_cbse_07_002: Covers trigonometric functions (sin, cos) and their properties, needed to handle sinusoidal voltage/current and the sin²(ωt) average.  
c12_phy_cbse_07_007: Trigonometric functions sin, cos, tan needed for phasor representation and phase angle calculations.  
c12_phy_cbse_09_003: Trigonometric functions (sine) are essential for Snell's law calculations and understanding the sine relationship.  
c12_phy_cbse_09_004: Defines trigonometric functions (sine, cosine) for any angle; needed to understand sin(ic) and the inverse sine function for calculating critical angle.  
c12_phy_cbse_10_002: Trigonometric functions (sin, cos, tan) are essential for expressing the geometry of the triangles in the Huygens' construction and for writing Snell's law.  
c12_phy_cbse_10_007: Trigonometric functions — small-angle approximation \(\sin\theta \approx \theta\) used for linear width on screen.  
c12_phy_cbse_10_008: Trigonometric functions of any angle — extends cos to angles beyond 90°, needed for Malus's law over full rotation.  

## CROSS_SUBJECT_PREREQS
c9_math_ch1_3, c10_math_cbse_08_001, c9_math_ch6_2
## CROSS_SUBJECT_REASONS
c9_math_ch1_3: Coordinate geometry (quadrants, signs of coordinates) is the mathematical language used to define signs of trigonometric functions.
c10_math_cbse_08_001: The right-triangle trigonometric ratios are the special case of the unit circle definitions when the angle is acute.
c9_math_ch6_2: The circumference formula \(2\pi r\) connects arc length to radian measure, which is the basis for the unit circle parameterization.

## CHAIN_DESCRIPTION
c11_math_cbse_03_001 -> c11_math_cbse_03_002 -> c11_math_cbse_03_003 -> c11_math_cbse_03_004 -> c11_math_cbse_03_005 -> c11_math_cbse_03_006

## THIS_FORMULA
\(\sin x = y\), \(\cos x = x\), \(\tan x = \frac{y}{x}\) (for \(x \neq 0\)), where \(P(x, y)\) is the point on the unit circle \(x^2 + y^2 = 1\) corresponding to angle \(x\) radians. \(\cosec x = \frac{1}{\sin x}\), \(\sec x = \frac{1}{\cos x}\), \(\cot x = \frac{\cos x}{\sin x}\).

## FORMULA_VARIABLES
\(x\) = angle in radians (real number), \(P(x, y)\) = coordinates of the point on the unit circle after rotating by \(x\) radians from \((1,0)\).

## FORMULA_UNITS
Angle \(x\) is in radians (dimensionless). Coordinates \(x, y\) are dimensionless (ratios of lengths).

## COMPUTATION_TYPE
geometric

## CROSS_SUBJECT
c11_physics_ch14_01 | In physics, simple harmonic motion (e.g., a spring-mass system) is described by \(x = A \sin(\omega t + \phi)\) where the sine function comes from the unit circle projection.
c11_physics_ch15_02 | Wave motion uses \(\sin(kx - \omega t)\); the periodic nature and phase shifts are direct applications of the unit circle definition.

## PREREQ_CONCEPT
Radian measure and the unit circle equation \(x^2 + y^2 = 1\).

## PREREQ_BEFORE
The student must be able to convert between degrees and radians, identify the quadrant of a given angle, and recall the coordinates of points on the unit circle for multiples of \(\frac{\pi}{2}\).

## PREREQ_STUCK
If stuck, review the conversion between degrees and radians (c11_math_cbse_03_002) and the signs of coordinates in each quadrant (c9_math_ch1_3).

## WORKED_EXAMPLE_1
PROBLEM: A point \(P\) on the unit circle corresponds to an angle of \(\frac{2\pi}{3}\) radians. Find the exact values of \(\sin \frac{2\pi}{3}\), \(\cos \frac{2\pi}{3}\), \(\tan \frac{2\pi}{3}\), \(\cosec \frac{2\pi}{3}\), \(\sec \frac{2\pi}{3}\), and \(\cot \frac{2\pi}{3}\).

STEPS:
- Step 1: Identify the quadrant. \(\frac{2\pi}{3} = 120^\circ\), which lies between \(\frac{\pi}{2}\) and \(\pi\) → Quadrant II.
- Step 2: Find the reference angle. Reference angle = \(\pi - \frac{2\pi}{3} = \frac{\pi}{3}\).
- Step 3: Recall the coordinates for \(\frac{\pi}{3}\) on the unit circle: \(\left(\cos \frac{\pi}{3}, \sin \frac{\pi}{3}\right) = \left(\frac{1}{2}, \frac{\sqrt{3}}{2}\right)\).
- Step 4: Apply quadrant signs. In QII, \(x\) (cosine) is negative, \(y\) (sine) is positive. So \(\cos \frac{2\pi}{3} = -\frac{1}{2}\), \(\sin \frac{2\pi}{3} = \frac{\sqrt{3}}{2}\).
- Step 5: Compute \(\tan = \frac{\sin}{\cos} = \frac{\sqrt{3}/2}{-1/2} = -\sqrt{3}\).
- Step 6: Compute reciprocals: \(\cosec = \frac{1}{\sin} = \frac{2}{\sqrt{3}} = \frac{2\sqrt{3}}{3}\), \(\sec = \frac{1}{\cos} = -2\), \(\cot = \frac{1}{\tan} = -\frac{1}{\sqrt{3}} = -\frac{\sqrt{3}}{3}\).

REASONING: The unit circle definition directly gives sine and cosine as coordinates. The reference angle provides the absolute values, and the quadrant determines the signs. All other functions follow from these two.

ANSWER: \(\sin \frac{2\pi}{3} = \frac{\sqrt{3}}{2}\), \(\cos \frac{2\pi}{3} = -\frac{1}{2}\), \(\tan \frac{2\pi}{3} = -\sqrt{3}\), \(\cosec \frac{2\pi}{3} = \frac{2\sqrt{3}}{3}\), \(\sec \frac{2\pi}{3} = -2\), \(\cot \frac{2\pi}{3} = -\frac{\sqrt{3}}{3}\).

## WORKED_EXAMPLE_2
PROBLEM: If \(\sin x = \frac{3}{5}\) and \(x\) lies in the second quadrant, find the values of \(\cos x\), \(\tan x\), \(\cosec x\), \(\sec x\), and \(\cot x\).

STEPS:
- Step 1: Write the Pythagorean identity: \(\sin^2 x + \cos^2 x = 1\).
- Step 2: Substitute \(\sin x = \frac{3}{5}\): \(\left(\frac{3}{5}\right)^2 + \cos^2 x = 1 \Rightarrow \frac{9}{25} + \cos^2 x = 1\).
- Step 3: Solve for \(\cos^2 x\): \(\cos^2 x = 1 - \frac{9}{25} = \frac{16}{25}\).
- Step 4: Determine the sign of \(\cos x\). Since \(x\) is in QII, \(\cos x\) is negative. Hence \(\cos x = -\frac{4}{5}\).
- Step 5: Compute \(\tan x = \frac{\sin x}{\cos x} = \frac{3/5}{-4/5} = -\frac{3}{4}\).
- Step 6: Compute reciprocals: \(\cosec x = \frac{5}{3}\), \(\sec x = -\frac{5}{4}\), \(\cot x = -\frac{4}{3}\).

REASONING: The unit circle definition gives \(\sin x\) as the y-coordinate. The Pythagorean identity (derived from \(x^2 + y^2 = 1\)) gives the magnitude of \(\cos x\), and the quadrant gives its sign. All other ratios are algebraic combinations.

ANSWER: \(\cos x = -\frac{4}{5}\), \(\tan x = -\frac{3}{4}\), \(\cosec x = \frac{5}{3}\), \(\sec x = -\frac{5}{4}\), \(\cot x = -\frac{4}{3}\).

## WORKED_EXAMPLE_3
PROBLEM: Evaluate \(\sin \frac{11\pi}{6}\) and \(\cos \frac{11\pi}{6}\) using the periodicity and symmetry of the unit circle, without using a calculator.

STEPS:
- Step 1: Note that \(\frac{11\pi}{6}\) is greater than \(2\pi\)? No, \(\frac{11\pi}{6} \approx 1.833\pi\), so it's less than \(2\pi\). It lies in QIV because \(\frac{3\pi}{2} < \frac{11\pi}{6} < 2\pi\).
- Step 2: Find the reference angle: \(2\pi - \frac{11\pi}{6} = \frac{12\pi}{6} - \frac{11\pi}{6} = \frac{\pi}{6}\).
- Step 3: Recall the coordinates for \(\frac{\pi}{6}\): \(\left(\cos \frac{\pi}{6}, \sin \frac{\pi}{6}\right) = \left(\frac{\sqrt{3}}{2}, \frac{1}{2}\right)\).
- Step 4: Apply QIV signs: In QIV, \(x\) (cosine) is positive, \(y\) (sine) is negative.
- Step 5: Therefore \(\cos \frac{11\pi}{6} = \frac{\sqrt{3}}{2}\), \(\sin \frac{11\pi}{6} = -\frac{1}{2}\).
- Step 6: Verify using periodicity: \(\sin \frac{11\pi}{6} = \sin\left(2\pi - \frac{\pi}{6}\right) = -\sin \frac{\pi}{6} = -\frac{1}{2}\) (since \(\sin(2\pi - x) = -\sin x\)).

REASONING: Angles in QIV have positive cosine and negative sine. The reference angle gives the absolute values, and the symmetry \(\sin(2\pi - x) = -\sin x\) confirms the sign.

ANSWER: \(\sin \frac{11\pi}{6} = -\frac{1}{2}\), \(\cos \frac{11\pi}{6} = \frac{\sqrt{3}}{2}\).

## COMPETENCY_QUESTION_1
QUESTION: Using the unit circle, explain why \(\sin(\pi - x) = \sin x\) and \(\cos(\pi - x) = -\cos x\) for any angle \(x\). Illustrate with a diagram description and give an example with \(x = \frac{\pi}{6}\).

COMPETENCY: Translating real-world situations to mathematical expressions / Geometric reasoning

STEPS:
- Step 1: Visualize angle \(x\) in standard position (QI for simplicity). Its terminal point is \(P(\cos x, \sin x)\).
- Step 2: The angle \(\pi - x\) is the supplement; its terminal point is \(Q\) in QII, symmetric to \(P\) across the y-axis.
- Step 3: By symmetry, \(Q\) has coordinates \((-\cos x, \sin x)\).
- Step 4: Therefore \(\sin(\pi - x) = \sin x\) (same y-coordinate) and \(\cos(\pi - x) = -\cos x\) (opposite x-coordinate).
- Step 5: Example: \(x = \frac{\pi}{6}\). \(\sin \frac{\pi}{6} = \frac{1}{2}\), \(\cos \frac{\pi}{6} = \frac{\sqrt{3}}{2}\). Then \(\sin \frac{5\pi}{6} = \frac{1}{2}\), \(\cos \frac{5\pi}{6} = -\frac{\sqrt{3}}{2}\).

ANSWER: The unit circle symmetry about the y-axis shows that supplementary angles share the same sine but have opposite cosines. For \(x = \frac{\pi}{6}\), \(\sin \frac{5\pi}{6} = \frac{1}{2}\) and \(\cos \frac{5\pi}{6} = -\frac{\sqrt{3}}{2}\).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A student is asked to find all angles \(x\) in \([0, 2\pi)\) such that \(\tan x = -\sqrt{3}\). The student answers \(x = \frac{2\pi}{3}\) only. Identify the error, find the complete solution set, and explain how the unit circle definition of \(\tan x = \frac{\sin x}{\cos x}\) helps avoid this mistake.

COMPETENCY: Error identification and correction / Multi-concept application

STEPS:
- Step 1: Recognize that \(\tan x = -\sqrt{3}\) means \(\frac{\sin x}{\cos x} = -\sqrt{3}\). This occurs when the reference angle is \(\frac{\pi}{3}\) and \(\sin\) and \(\cos\) have opposite signs.
- Step 2: Opposite signs occur in QII (\(\sin +, \cos -\)) and QIV (\(\sin -, \cos +\)).
- Step 3: In QII, the angle is \(\pi - \frac{\pi}{3} = \frac{2\pi}{3}\). In QIV, the angle is \(2\pi - \frac{\pi}{3} = \frac{5\pi}{3}\).
- Step 4: The student missed the QIV solution because they only considered the principal value or only QII.
- Step 5: Using the unit circle, \(\tan x = \frac{y}{x}\). The ratio is \(-\sqrt{3}\) when \((x,y)\) is proportional to \((-1, \sqrt{3})\) (QII) or \((1, -\sqrt{3})\) (QIV). Both give the same ratio.

ANSWER: The complete solution set is \(x = \frac{2\pi}{3}, \frac{5\pi}{3}\). The error was ignoring the second quadrant where tangent is negative (QIV). The unit circle definition \(\tan x = \frac{y}{x}\) makes it clear that the sign depends on the signs of both coordinates, so one must check all quadrants where the ratio matches.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine a giant Ferris wheel at a fair in Delhi with ______ 10 metres.

## DIAGNOSTIC_ANSWER_7
radius

**A wrong answer ("diameter" or "height") reveals the student has swapped the walkthrough's dimension - the giant Ferris wheel has a radius of 10 metres before the shrink to unit size.** Scenario blanks repeat the walkthrough verbatim, so the dimension noun is the walkthrough's own word. Recall the 3 o'clock starting seat before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine a giant Ferris wheel at a fair in Delhi with radius ______ metres.

## DIAGNOSTIC_ANSWER_8
10

**A wrong answer (any other figure) reveals the student has drifted from the walkthrough - the full-size wheel has a radius of 10 metres, scaled down to 1 for the unit circle.** The pair of figures is the whole scaling story, and the walkthrough's number is the answer. Recall the seat's coordinates becoming cos and sin before filling, and give the figure exactly.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: ______ a giant Ferris wheel at a fair in Delhi with radius 10 metres.

## DIAGNOSTIC_ANSWER_9
Imagine

**A wrong answer ("Suppose" or "Picture") reveals the student has paraphrased the walkthrough's opening word - the scene starts "Imagine a giant Ferris wheel at a fair in Delhi."** Scenario blanks repeat the walkthrough verbatim, and first words are exam currency in these blanks. Fill the exact opener, not a synonym, and let the wheel scene stand as written.
