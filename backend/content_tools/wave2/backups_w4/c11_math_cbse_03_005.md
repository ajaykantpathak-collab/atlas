## ELI5
A mela wheel rider sits at the 3 o'clock seat; the wheel turns 210° anticlockwise - third quadrant. Convert to 7π/6, read the unit circle: sin(π + π/6) = -sin π/6 = -1/2, so at radius 10 the height is -5 metres, five below the centre line. That is the extension: sin and cos are simply the coordinates of the point P(a, b) on the unit circle, tan and the reciprocals following as ratios - trigonometric values for every real angle, acute or not.

## DEFINITION
Trigonometric functions of any angle are defined using the unit circle: for an angle \(x\) radians measured from the positive x-axis, let \(P(a, b)\) be the point on the unit circle \(x^2 + y^2 = 1\) such that the arc length from \((1,0)\) to \(P\) is \(x\). Then \(\cos x = a\) and \(\sin x = b\). The other functions are defined as \(\tan x = \frac{\sin x}{\cos x}\) (where \(\cos x \neq 0\)), \(\cot x = \frac{\cos x}{\sin x}\) (where \(\sin x \neq 0\)), \(\sec x = \frac{1}{\cos x}\) (where \(\cos x \neq 0\)), and \(\cosec x = \frac{1}{\sin x}\) (where \(\sin x \neq 0\)). This definition extends trigonometric ratios beyond acute angles to all real numbers.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can evaluate \(\sin\), \(\cos\), \(\tan\) for any angle (including negative angles and angles \(> 2\pi\)) by reducing to an equivalent angle in \([0, 2\pi)\) using periodicity and quadrant rules, and can state the exact values for quadrantal angles and standard angles (\(\pi/6, \pi/4, \pi/3\)) in all quadrants.

## SCOPE_BOUNDARY
This node covers the unit circle definition of trigonometric functions for any real angle, periodicity (\(2\pi\) for \(\sin\) and \(\cos\), \(\pi\) for \(\tan\)), quadrantal angles, and evaluation of trigonometric functions for angles beyond the first quadrant using reduction formulas. It does NOT cover sum/difference identities, double/triple angle formulas, or transformation formulae (those are in later nodes).

## WALKTHROUGH
Imagine you are designing a Ferris wheel for a mela in Delhi. The wheel has a radius of 10 metres and its centre is at ground level. A passenger starts at the rightmost point (3 o'clock position) and the wheel rotates anticlockwise. After rotating by \(210^\circ\), what is the passenger's height above the ground? In Class 10, you only knew trigonometric ratios for acute angles (\(0^\circ\) to \(90^\circ\)). Here the angle \(210^\circ\) is in the third quadrant. To solve this, we first convert \(210^\circ\) to radians (\(\frac{7\pi}{6}\)), then use the unit circle definition: \(\sin \frac{7\pi}{6} = \sin(\pi + \frac{\pi}{6}) = -\sin \frac{\pi}{6} = -\frac{1}{2}\). The height is \(10 \times (-\frac{1}{2}) = -5\) metres (i.e., 5 metres below ground). The key insight is that for any angle \(x\), \(\sin x\) and \(\cos x\) are simply the coordinates of the point on the unit circle, and we can use symmetry and periodicity to relate any angle back to an acute reference angle.

Takeaway: mastery means any angle being reduced by periodicity and quadrant signs to a reference acute angle, and quadrantal values delivered exactly. Exam moves: evaluate-any-angle questions and state-values-in-all-quadrants items showing the reduction step. Check yourself: the rider below ground level is the sign rule made physical - third quadrant, sine negative. Students miss it because they memorise reduction formulas mechanically, when the unit circle shows why each sign flips: the coordinate's quadrant, not the formula's mood, decides the sign.

## DIAGNOSTIC_QUESTION_1
What are the values of \(\sin \pi\), \(\cos \pi\), \(\tan \pi\), \(\cosec \pi\), \(\sec \pi\), and \(\cot \pi\)? Which of these are undefined and why?

## DIAGNOSTIC_ANSWER_1
\(\sin \pi = 0\), \(\cos \pi = -1\), \(\tan \pi = 0\), \(\cosec \pi\) is undefined (division by zero), \(\sec \pi = -1\), \(\cot \pi\) is undefined (division by zero). A wrong answer (e.g., saying \(\cosec \pi = 0\) or \(\cot \pi = 0\)) reveals the student does not understand that reciprocal functions are undefined when the denominator is zero, a critical distinction from Class 10 where only acute angles were considered and denominators were never zero.

## DIAGNOSTIC_QUESTION_2
A student claims that \(\sin(450^\circ) = \sin(90^\circ) = 1\) because \(450^\circ = 90^\circ + 360^\circ\). Another student says \(\sin(450^\circ) = \sin(90^\circ) = 1\) but argues the reason is that the terminal side is the same. Are both explanations equivalent? Explain why the sine function repeats every \(360^\circ\) (or \(2\pi\) radians) using the unit circle definition.

## DIAGNOSTIC_ANSWER_2
Both explanations are essentially equivalent: adding \(360^\circ\) (or \(2\pi\) radians) corresponds to one complete revolution on the unit circle, bringing the terminal side back to the same position, so the coordinates \((a, b)\) of the point \(P\) are identical, hence \(\sin\) and \(\cos\) values repeat. A student who cannot articulate the connection between "same terminal side" and "same coordinates on unit circle" is relying on rote memorization of periodicity without understanding the geometric basis.

## DIAGNOSTIC_QUESTION_3
Find the exact value of \(\cos\left(-\frac{11\pi}{3}\right)\) without using a calculator. Show all steps of reduction.

## DIAGNOSTIC_ANSWER_3
Step 1: Use periodicity: \(\cos(2\pi + x) = \cos x\). Add \(4\pi = \frac{12\pi}{3}\) to get a positive angle: \(-\frac{11\pi}{3} + 4\pi = \frac{\pi}{3}\). Step 2: \(\cos\left(-\frac{11\pi}{3}\right) = \cos\left(\frac{\pi}{3}\right) = \frac{1}{2}\). A common error is to add only \(2\pi\) (getting \(-\frac{5\pi}{3}\)) and then struggle with the negative sign, or to incorrectly use \(\cos(-x) = -\cos x\) instead of \(\cos(-x) = \cos x\). The correct reduction shows understanding of both periodicity and even/odd properties.

## DIAGNOSTIC_QUESTION_4
Given that \(\sin x = -\frac{3}{5}\) and \(x\) lies in the third quadrant, find \(\cos x\), \(\tan x\), \(\cosec x\), \(\sec x\), and \(\cot x\). Then determine the reference angle and the actual angle \(x\) in radians (in terms of \(\pi\)).

## DIAGNOSTIC_ANSWER_4
In QIII, \(\sin\) and \(\cos\) are negative. \(\sin^2 x + \cos^2 x = 1 \Rightarrow \cos^2 x = 1 - \frac{9}{25} = \frac{16}{25} \Rightarrow \cos x = -\frac{4}{5}\). Then \(\tan x = \frac{\sin x}{\cos x} = \frac{3}{4}\), \(\cosec x = -\frac{5}{3}\), \(\sec x = -\frac{5}{4}\), \(\cot x = \frac{4}{3}\). Reference angle: \(\sin^{-1}(\frac{3}{5}) \approx 0.6435\) rad (not a standard angle). Actual angle \(x = \pi + \sin^{-1}(\frac{3}{5})\). A student who gives \(\cos x = +\frac{4}{5}\) fails to apply the quadrant sign rule. A student who cannot find the reference angle or express \(x\) as \(\pi + \alpha\) does not understand how to locate the angle on the unit circle.

## DIAGNOSTIC_QUESTION_5
A student solves \(\sin \theta = \frac{1}{2}\) for \(0 \leq \theta < 2\pi\) and writes \(\theta = \frac{\pi}{6}\) only. Is this complete? If not, what is missing and why does the student likely make this error?

## DIAGNOSTIC_ANSWER_5
The solution is incomplete. \(\sin \theta = \frac{1}{2}\) has two solutions in \([0, 2\pi)\): \(\theta = \frac{\pi}{6}\) (QI) and \(\theta = \frac{5\pi}{6}\) (QII) because sine is positive in both QI and QII. The student likely makes this error because in Class 10 they only dealt with acute angles (\(0^\circ\) to \(90^\circ\)) where sine is one-to-one, and they haven't internalized that sine is positive in two quadrants. This reveals a gap in understanding the sign rule and the symmetry of the unit circle.

## DIAGNOSTIC_QUESTION_6
Create a real-world problem (Indian context) that requires evaluating a trigonometric function for an angle greater than \(180^\circ\) (or \(\pi\) radians). The problem must involve a height or distance calculation and the angle must be in QIII or QIV. Write the problem statement and solve it.

## DIAGNOSTIC_ANSWER_6
Example problem: "A drone is flying in a circular path of radius 50 m around a point O on the ground. At a certain instant, the angle of elevation from a point A on the ground (50 m from O) to the drone is measured. If the drone's angular position from the positive x-axis is \(\frac{5\pi}{4}\) radians, find the drone's height above the ground." Solution: The drone's coordinates relative to O are \((50\cos\frac{5\pi}{4}, 50\sin\frac{5\pi}{4}) = (-\frac{50}{\sqrt{2}}, -\frac{50}{\sqrt{2}})\). Height is the y-coordinate: \(-25\sqrt{2}\) m (negative means below the horizontal plane through O). A poor answer would use an acute angle or ignore the sign, showing inability to translate a QIII angle into a physical situation.

## COMMON_MISCONCEPTION
Students often treat the reduction formulas mechanically without visualizing the unit circle. For example, when evaluating \(\sin\left(\frac{7\pi}{6}\right)\), they write \(\sin\left(\pi + \frac{\pi}{6}\right) = -\sin\frac{\pi}{6} = -\frac{1}{2}\) by memorizing "\(\sin(\pi + x) = -\sin x\)" but cannot explain why the sign changes. The specific error is applying the formula \(\sin(\pi + x) = -\sin x\) even when \(x\) is not acute (e.g., \(x = \frac{5\pi}{6}\)) and getting the wrong sign because they don't check the quadrant of the resulting angle. They also confuse \(\sin(\pi - x) = \sin x\) with \(\sin(\pi + x) = -\sin x\), leading to errors like \(\sin\left(\frac{5\pi}{6}\right) = \sin\left(\pi + \frac{-\pi}{6}\right) = -\sin\left(-\frac{\pi}{6}\right) = +\frac{1}{2}\) (correct by accident) but then misapplying it to \(\cos\).

## ON_FAILURE
If a student cannot correctly evaluate trig functions for non-acute angles:
1. Draw the unit circle and mark the given angle (convert to degrees if needed).
2. Identify the quadrant of the terminal side.
3. Find the reference angle (acute angle between terminal side and x-axis).
4. Write the trig function of the given angle as \(\pm\) (trig function of reference angle), where the sign is determined by the quadrant (ASTC rule).
5. Substitute the exact value of the reference angle.
6. Practice with angles like \(\frac{7\pi}{6}, \frac{5\pi}{4}, \frac{4\pi}{3}, \frac{11\pi}{6}\) until the quadrant-sign-ref angle process is automatic.

## PREREQUISITE_NODE_IDS
c11_math_cbse_03_001, c11_math_cbse_03_002, c11_math_cbse_03_003, c11_math_cbse_03_004, c9_math_ch1_3, c10_math_cbse_08_001, c10_math_cbse_08_003, c10_math_cbse_08_004, c10_math_cbse_08_005
## PREREQUISITE_REASONS
c11_math_cbse_03_001: Understanding degree and radian measure is essential to interpret angles like \(210^\circ\) or \(\frac{7\pi}{6}\).
c11_math_cbse_03_002: Conversion between degrees and radians is needed to switch between units when reducing angles.
c11_math_cbse_03_003: The unit circle definition of \(\sin, \cos, \tan\) is the foundation for extending to any angle.
c11_math_cbse_03_004: Values for acute angles (\(0, \frac{\pi}{6}, \frac{\pi}{4}, \frac{\pi}{3}, \frac{\pi}{2}\)) are the reference values used for all other angles.
c9_math_ch1_3: Quadrants and signs of coordinates (from Class 9 coordinate geometry) directly determine signs of trig functions.
c10_math_cbse_08_001: Trigonometric ratios in right triangles (Class 10) provide the geometric meaning for acute angles.
c10_math_cbse_08_003: Values for \(0^\circ\) and \(90^\circ\) are needed for quadrantal angles.
c10_math_cbse_08_004: Values for \(30^\circ, 60^\circ\) (\(\frac{\pi}{6}, \frac{\pi}{3}\)) are standard reference angles.
c10_math_cbse_08_005: Value for \(45^\circ\) (\(\frac{\pi}{4}\)) is a standard reference angle.

## FORWARD_NODE_IDS
c11_math_cbse_03_006, c11_math_cbse_03_007, c11_math_cbse_03_008, c11_math_cbse_03_009, c11_math_cbse_03_010, c11_math_cbse_03_011, c11_math_cbse_03_012, c11_math_cbse_03_013, c11_math_cbse_03_014, c12_math_cbse_02_003, c12_phy_cbse_04_001, c12_phy_cbse_05_002, c12_phy_cbse_09_004

## FORWARD_REASONS
c11_math_cbse_03_006: Sign rules in quadrants are a direct application of the unit circle coordinates established here.
c11_math_cbse_03_007: Domain and range follow from the boundedness of coordinates on the unit circle (\(-1 \le a,b \le 1\)).
c11_math_cbse_03_008: Pythagorean identities (\(\sin^2 x + \cos^2 x = 1\)) are derived from the unit circle equation \(a^2+b^2=1\).
c11_math_cbse_03_009: Sum/difference formulas generalize the coordinate geometry of rotation.
c11_math_cbse_03_010: Double angle formulas are special cases of sum formulas.
c11_math_cbse_03_011: Triple angle formulas build on double angle and sum formulas.
c11_math_cbse_03_012: Product-to-sum formulas are derived from sum/difference identities.
c11_math_cbse_03_013: Sum-to-product formulas are the inverses of product-to-sum.
c11_math_cbse_03_014: Solving trig equations requires evaluating functions for any angle and using periodicity.
c12_math_cbse_02_003: Extends trig functions to all quadrants, needed to handle angles outside principal range.  
c12_phy_cbse_04_001: Trigonometric functions of any angle — needed when \(\theta > 90^\circ\) (e.g., obtuse angles in 3D geometry).  
c12_phy_cbse_05_002: Trigonometric functions of any angle to evaluate sin𝜃, cos𝜃 beyond 0°–90°.  
c12_phy_cbse_09_004: Covers trigonometric functions of any angle and their signs in quadrants; relevant for understanding why sin r > 1 is impossible and the domain of inverse sine.  

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_04_001, c11_phy_cbse_04_002, c11_phy_cbse_14_001, c11_phy_cbse_14_002
## CROSS_SUBJECT_REASONS
c11_physics_ch4_01: Motion in a plane (projectile motion) uses trigonometric functions for any angle to resolve velocity components.
c11_physics_ch4_02: Uniform circular motion describes position using \(\cos(\omega t)\) and \(\sin(\omega t)\) for any angle \(\omega t\).
c11_physics_ch14_01: Simple harmonic motion displacement \(x = A \sin(\omega t + \phi)\) requires evaluating sine for any phase angle.
c11_physics_ch14_02: Wave equations \(y = A \sin(kx - \omega t)\) involve trigonometric functions of any real argument.
c11_phy_cbse_04_001: Cross-subject support: Aristotle's fallacy is the incorrect assertion that a continuous external force is require... supplies tools/facts used directly in this node.  
c11_phy_cbse_04_002: Cross-subject support: Newton's First Law of Motion (Law of Inertia) states that a body remains in its state of r... supplies tools/facts used directly in this node.  
c11_phy_cbse_14_001: Cross-subject support: A mechanical wave is classified as transverse if the particles of the medium oscillate per... supplies tools/facts used directly in this node.  
c11_phy_cbse_14_002: Cross-subject support: The speed of a travelling wave is the rate at which a particular phase point (such as a cr... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_math_cbse_03_003 -> c11_math_cbse_03_005 -> c11_math_cbse_03_006

## THIS_FORMULA
For any angle \(x\) (in radians) on the unit circle \(x^2 + y^2 = 1\): \(\cos x = a\), \(\sin x = b\) where \(P(a,b)\) is the point on the circle. \(\tan x = \frac{\sin x}{\cos x}\) (\(\cos x \neq 0\)), \(\cot x = \frac{\cos x}{\sin x}\) (\(\sin x \neq 0\)), \(\sec x = \frac{1}{\cos x}\) (\(\cos x \neq 0\)), \(\cosec x = \frac{1}{\sin x}\) (\(\sin x \neq 0\)). Periodicity: \(\sin(2n\pi + x) = \sin x\), \(\cos(2n\pi + x) = \cos x\), \(\tan(n\pi + x) = \tan x\), \(n \in \mathbb{Z}\).

## FORMULA_VARIABLES
\(x\) = angle in radians (real number), \(a\) = x-coordinate of point on unit circle, \(b\) = y-coordinate of point on unit circle, \(n\) = any integer.

## FORMULA_UNITS
Angles in radians (dimensionless) or degrees; trigonometric ratios are dimensionless.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch4_01 | Projectile motion velocity components: \(v_x = u\cos\theta\), \(v_y = u\sin\theta\) where \(\theta\) can be any launch angle.
c11_physics_ch4_02 | Uniform circular motion: position vector \(\vec{r} = R(\cos\omega t\,\hat{i} + \sin\omega t\,\hat{j})\) uses \(\cos\) and \(\sin\) of any angle \(\omega t\).
c11_physics_ch14_01 | SHM displacement: \(x = A\sin(\omega t + \phi)\) requires \(\sin\) of any real argument (phase).
c11_physics_ch14_02 | Wave function: \(y = A\sin(kx - \omega t)\) involves trigonometric functions of continuous variables.

## PREREQ_CONCEPT
Unit circle definition of trigonometric functions and the values of \(\sin, \cos, \tan\) for standard acute angles (\(0, \frac{\pi}{6}, \frac{\pi}{4}, \frac{\pi}{3}, \frac{\pi}{2}\)).

## PREREQ_BEFORE
The student must be able to convert between degrees and radians, plot angles in standard position on the coordinate plane, and recall the exact values of trigonometric ratios for \(0^\circ, 30^\circ, 45^\circ, 60^\circ, 90^\circ\).

## PREREQ_STUCK
If stuck, revisit the unit circle definition (c11_math_cbse_03_003) and the standard angle values (c11_math_cbse_03_004), and practice identifying the quadrant of an angle and its reference angle.

## WORKED_EXAMPLE_1
PROBLEM: A wind turbine blade in Gujarat has length 40 m. At a certain instant, the blade makes an angle of \(210^\circ\) with the positive x-axis (horizontal). Find the height of the tip of the blade above the ground if the centre of the turbine is at ground level.
STEPS:
- Step 1: Identify given: radius \(r = 40\) m, angle \(\theta = 210^\circ\). Height is the y-coordinate of the tip: \(y = r \sin \theta\).
- Step 2: Convert angle to radians (optional but good practice): \(210^\circ = 210 \times \frac{\pi}{180} = \frac{7\pi}{6}\) rad.
- Step 3: Determine quadrant: \(\frac{7\pi}{6} = \pi + \frac{\pi}{6}\) lies in QIII (between \(\pi\) and \(\frac{3\pi}{2}\)). In QIII, sine is negative.
- Step 4: Find reference angle: \(\alpha = \frac{7\pi}{6} - \pi = \frac{\pi}{6}\).
- Step 5: Apply sign rule: \(\sin \frac{7\pi}{6} = -\sin \frac{\pi}{6} = -\frac{1}{2}\).
- Step 6: Compute height: \(y = 40 \times (-\frac{1}{2}) = -20\) m. The negative sign means the tip is 20 m below ground level.
REASONING: The unit circle definition gives the coordinates of any point on a circle of radius \(r\) as \((r\cos\theta, r\sin\theta)\). For angles beyond \(90^\circ\), we use the symmetry of the circle: the absolute values of trig functions are the same as for the acute reference angle, and the signs are determined by the quadrant (ASTC rule).
ANSWER: -20 m (20 metres below ground level)

## WORKED_EXAMPLE_2
PROBLEM: Evaluate \(\cos\left(-\frac{19\pi}{4}\right)\) without a calculator.
STEPS:
- Step 1: Use periodicity of cosine: \(\cos(2\pi + x) = \cos x\). We want to add multiples of \(2\pi = \frac{8\pi}{4}\) to get an angle in \([0, 2\pi)\).
- Step 2: Add \(3 \times 2\pi = 6\pi = \frac{24\pi}{4}\): \(-\frac{19\pi}{4} + \frac{24\pi}{4} = \frac{5\pi}{4}\).
- Step 3: Alternatively, use even property first: \(\cos(-x) = \cos x\), so \(\cos\left(-\frac{19\pi}{4}\right) = \cos\left(\frac{19\pi}{4}\right)\). Then subtract \(2\pi = \frac{8\pi}{4}\) twice: \(\frac{19\pi}{4} - \frac{16\pi}{4} = \frac{3\pi}{4}\).
- Step 4: Both methods give equivalent angles: \(\frac{5\pi}{4}\) and \(\frac{3\pi}{4}\) have the same cosine? Wait, check: \(\cos\frac{5\pi}{4} = \cos(\pi + \frac{\pi}{4}) = -\cos\frac{\pi}{4} = -\frac{1}{\sqrt{2}}\). \(\cos\frac{3\pi}{4} = \cos(\pi - \frac{\pi}{4}) = -\cos\frac{\pi}{4} = -\frac{1}{\sqrt{2}}\). They match.
- Step 5: Identify quadrant of \(\frac{5\pi}{4}\) (QIII) or \(\frac{3\pi}{4}\) (QII). In both, cosine is negative. Reference angle is \(\frac{\pi}{4}\).
- Step 6: \(\cos\frac{\pi}{4} = \frac{1}{\sqrt{2}}\), so \(\cos\left(-\frac{19\pi}{4}\right) = -\frac{1}{\sqrt{2}}\).
REASONING: The cosine function is even and periodic with period \(2\pi\). We can reduce any angle to an equivalent angle in \([0, 2\pi)\) by adding/subtracting multiples of \(2\pi\), then use the reference angle and quadrant sign rule. The even property \(\cos(-x)=\cos x\) simplifies negative angles.
ANSWER: \(-\frac{1}{\sqrt{2}}\) (or \(-\frac{\sqrt{2}}{2}\))

## WORKED_EXAMPLE_3
PROBLEM: If \(\tan x = \frac{4}{3}\) and \(x\) lies in the third quadrant, find the values of \(\sin x\), \(\cos x\), \(\cosec x\), \(\sec x\), and \(\cot x\). Then find the smallest positive angle \(x\) in radians.
STEPS:
- Step 1: Given \(\tan x = \frac{4}{3} > 0\). Tangent is positive in QI and QIII. Given \(x\) is in QIII, consistent.
- Step 2: In QIII, both \(\sin x\) and \(\cos x\) are negative. Use identity \(1 + \tan^2 x = \sec^2 x\).
- Step 3: \(\sec^2 x = 1 + \left(\frac{4}{3}\right)^2 = 1 + \frac{16}{9} = \frac{25}{9}\). So \(\sec x = \pm \frac{5}{3}\). In QIII, \(\cos x < 0\), so \(\sec x < 0\). Thus \(\sec x = -\frac{5}{3}\).
- Step 4: \(\cos x = \frac{1}{\sec x} = -\frac{3}{5}\).
- Step 5: \(\sin x = \tan x \cdot \cos x = \frac{4}{3} \times \left(-\frac{3}{5}\right) = -\frac{4}{5}\).
- Step 6: \(\cosec x = \frac{1}{\sin x} = -\frac{5}{4}\), \(\cot x = \frac{1}{\tan x} = \frac{3}{4}\).
- Step 7: Reference angle \(\alpha\) satisfies \(\tan \alpha = \frac{4}{3}\). Since \(\frac{4}{3}\) is not a standard ratio, \(\alpha = \tan^{-1}\left(\frac{4}{3}\right)\) (approx 0.9273 rad).
- Step 8: In QIII, \(x = \pi + \alpha = \pi + \tan^{-1}\left(\frac{4}{3}\right)\).
REASONING: When given one trig function and the quadrant, we use Pythagorean identities to find the others, carefully choosing signs based on the quadrant. The actual angle is expressed using the reference angle and the quadrant's base angle (\(\pi\) for QIII).
ANSWER: \(\sin x = -\frac{4}{5}\), \(\cos x = -\frac{3}{5}\), \(\cosec x = -\frac{5}{4}\), \(\sec x = -\frac{5}{3}\), \(\cot x = \frac{3}{4}\); \(x = \pi + \tan^{-1}\left(\frac{4}{3}\right)\) rad

## COMPETENCY_QUESTION_1
QUESTION: A student is asked to find all angles \(\theta\) in \([0, 2\pi)\) such that \(\cos \theta = -\frac{\sqrt{3}}{2}\). The student answers \(\theta = \frac{5\pi}{6}\) only. Is the student correct? If not, find the missing angle(s) and explain the student's likely misconception about the cosine function.
COMPETENCY: Error identification and correction; understanding symmetry of trigonometric functions.
STEPS:
- Step 1: Recall that \(\cos \theta = -\frac{\sqrt{3}}{2}\) is negative. Cosine is negative in QII and QIII.
- Step 2: The reference angle for \(\cos \alpha = \frac{\sqrt{3}}{2}\) is \(\alpha = \frac{\pi}{6}\).
- Step 3: In QII: \(\theta = \pi - \frac{\pi}{6} = \frac{5\pi}{6}\). In QIII: \(\theta = \pi + \frac{\pi}{6} = \frac{7\pi}{6}\).
- Step 4: Both angles are in \([0, 2\pi)\). The student missed \(\frac{7\pi}{6}\).
- Step 5: The misconception: The student likely thinks cosine is negative only in QII (like sine is positive in QI and QII) or forgets that \(\cos(\pi + \alpha) = -\cos \alpha\) also gives negative cosine. They may have only memorized \(\cos(\pi - \alpha) = -\cos \alpha\).
ANSWER: The student is incorrect. The complete solution is \(\theta = \frac{5\pi}{6}\) and \(\theta = \frac{7\pi}{6}\). The misconception is not recognizing that cosine is negative in both QII and QIII, and that there are two angles in \([0, 2\pi)\) with the same cosine value (except at the extremes \(\pm 1\)).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A Ferrish wheel at a fair in Mumbai has a radius of 15 m and its centre is 18 m above the ground. A passenger boards at the lowest point (which is 3 m above ground) and the wheel rotates anticlockwise. Write an expression for the height \(h\) of the passenger above the ground as a function of the angle \(\theta\) (in radians) rotated from the boarding position. Then find the height when \(\theta = \frac{5\pi}{3}\). (Assume the boarding position corresponds to \(\theta = 0\) at the bottom of the circle.)
COMPETENCY: Translating real-world situations to mathematical expressions; applying trigonometric functions to model periodic motion.
STEPS:
- Step 1: Set up coordinate system: centre at \((0, 18)\). Boarding at bottom means initial angle from positive x-axis is \(-\frac{\pi}{2}\) (or \(\frac{3\pi}{2}\)). But the problem says \(\theta\) is angle rotated from boarding position. So if we measure from boarding position anticlockwise, the angle from positive x-axis is \(\theta - \frac{\pi}{2}\).
- Step 2: Height \(h = 18 + 15 \sin(\theta - \frac{\pi}{2})\) (since y-coordinate relative to centre is \(r\sin\phi\)).
- Step 3: Simplify using identity: \(\sin(\theta - \frac{\pi}{2}) = -\cos \theta\). So \(h = 18 - 15\cos\theta\).
- Step 4: Check: at \(\theta=0\), \(h = 18 - 15 = 3\) m (correct, lowest point). At \(\theta=\pi\), \(h = 18 + 15 = 33\) m (highest point).
- Step 5: For \(\theta = \frac{5\pi}{3}\): \(\cos\frac{5\pi}{3} = \cos(2\pi - \frac{\pi}{3}) = \cos\frac{\pi}{3} = \frac{1}{2}\).
- Step 6: \(h = 18 - 15 \times \frac{1}{2} = 18 - 7.5 = 10.5\) m.
REASONING: This problem requires modeling a real periodic motion with a trigonometric function, choosing the correct function (cosine with a phase shift or negative cosine) based on the initial condition, and evaluating it for an angle in QIV (\(\frac{5\pi}{3}\)) using the reduction formula \(\cos(2\pi - \alpha) = \cos \alpha\).
ANSWER: \(h(\theta) = 18 - 15\cos\theta\) metres; at \(\theta = \frac{5\pi}{3}\), height = 10.5 m.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: This definition extends ______ ratios beyond acute angles to all real numbers.

## DIAGNOSTIC_ANSWER_7
trigonometric

**A wrong answer ("geometric" or "circular") reveals the student has swapped the definition's adjective - the extension carries trigonometric ratios beyond acute angles to all real numbers.** Trigonometric is the definition's own adjective in the closing sentence, and the extension's reach - acute angles to all reals - is what the clause claims. Quote it in fill-ups, keeping the adjective whole.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are designing a ______ wheel for a mela in Delhi.

## DIAGNOSTIC_ANSWER_8
Ferris

**A wrong answer ("Ferris" misspelt or "giant") reveals the student has fumbled the walkthrough's name - the ride being designed is a Ferris wheel for a mela in Delhi.** Scenario blanks repeat the walkthrough verbatim, so the proper noun is the walkthrough's own phrase. Recall the 210° rider before filling, and give the name exactly.

## DIAGNOSTIC_QUESTION_9
What is Trigonometric functions of any angle? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
This definition extends trigonometric ratios beyond acute angles to all real numbers.

**A wrong answer (a loose "sines for big angles") reveals the student has paraphrased where the definition is asked - the unit-circle construction extends trigonometric ratios beyond acute angles to all real numbers.** State the extension's from and to: acute angles to all reals.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: The wheel has a radius of ______ metres and its centre is at ground level.

## DIAGNOSTIC_ANSWER_10
10

**A wrong answer (any other figure) reveals the student has drifted from the walkthrough - the mela wheel has a radius of 10 metres, centre at ground level.** The figure multiplies every sine into a height, as in 10 × (-1/2) = -5. Recall the third-quadrant rider before filling, and give the figure exactly.

## DIAGNOSTIC_QUESTION_11
What common mix-up does this lesson flag about Trigonometric functions of any angle?

## DIAGNOSTIC_ANSWER_11
Students often treat the reduction formulas mechanically without visualizing the unit circle.

**A wrong answer (applying reduction formulas blind) reveals the student has adopted the flagged mechanical habit.** Visualise the unit circle first: find the reference angle, read the quadrant's coordinate signs, then apply the acute value. The picture decides the sign; the formula only fetches the size.
