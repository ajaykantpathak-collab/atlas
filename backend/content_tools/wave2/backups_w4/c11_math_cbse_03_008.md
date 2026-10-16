## ELI5
A surveyor 50 m from a monument reads elevation 37°, knowing tan 37° ≈ 3/4 but needing sine and cosine: the master identity supplies them. On the unit circle the radius is 1, so cos²x + sin²x = 1 for every angle - a² + b² = 1 worn as trigonometry. Divide by cos²x to get 1 + tan²x = sec²x; divide by sin²x to get 1 + cot²x = cosec²x. Geometric truths, not algebraic tricks - and quadrant signs decide roots.

## DEFINITION
The Pythagorean identities are three fundamental equations relating the squares of trigonometric functions, derived from the Pythagorean theorem applied to the unit circle: for any angle \(x\) where the functions are defined, \(\sin^2 x + \cos^2 x = 1\); \(1 + \tan^2 x = \sec^2 x\) (where \(\cos x \neq 0\)); and \(1 + \cot^2 x = \cosec^2 x\) (where \(\sin x \neq 0\)). These identities hold for all real angles, not just acute angles, because they are based on the unit circle definition \(\cos x = a, \sin x = b\) where \(a^2 + b^2 = 1\).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can derive all three Pythagorean identities from the unit circle equation \(x^2 + y^2 = 1\), correctly determine the sign of a trigonometric function when using these identities to find other function values (given quadrant information), and apply the identities to simplify complex trigonometric expressions and solve trigonometric equations.

## SCOPE_BOUNDARY
This node covers the three fundamental Pythagorean identities for all real angles using the unit circle definition, their algebraic derivations, sign determination based on quadrant, and applications in simplification and finding trigonometric values. It does NOT cover sum/difference formulas (node c11_math_cbse_03_009), double/triple angle identities (nodes c11_math_cbse_03_010, c11_math_cbse_03_011), transformation formulae (nodes c11_math_cbse_03_012, c11_math_cbse_03_013), or solving trigonometric equations (node c11_math_cbse_03_014).

## WALKTHROUGH
Imagine a surveyor standing 50 metres from the base of a historical monument in Delhi, measuring the angle of elevation to the top as \(37^\circ\). She knows \(\tan 37^\circ \approx \frac{3}{4}\) but needs \(\sin 37^\circ\) and \(\cos 37^\circ\) to calculate the height using different methods. In Class 10, you used right triangles for acute angles only. Now, place the angle on a unit circle centred at the origin: the terminal side intersects the circle at \(P(\cos x, \sin x)\). Since the radius is 1, the distance from origin to \(P\) is 1, giving \(\cos^2 x + \sin^2 x = 1\) for ANY angle. This is the master identity. Divide by \(\cos^2 x\) (when \(\cos x \neq 0\)) to get \(1 + \tan^2 x = \sec^2 x\), and divide by \(\sin^2 x\) (when \(\sin x \neq 0\)) to get \(1 + \cot^2 x = \cosec^2 x\). The key insight: these are not just algebraic tricks—they are geometric truths from the circle definition, valid for all quadrants, but you MUST use quadrant signs when taking square roots.

Takeaway: mastery means all three identities being derived from x² + y² = 1, signs chosen by quadrant when square roots are taken, and expressions simplified or equations solved by substitution. Exam moves: derive-the-identities questions and simplify-using-Pythagorean items with a sign check at every root. Check yourself: taking a square root returns two candidates - the quadrant picks one. Students miss it because they treat the identities as algebraic furniture, when the unit circle earns them: the radius's constancy is the entire proof, valid in every quadrant at once.

## DIAGNOSTIC_QUESTION_1
Write the three Pythagorean identities and state the domain restrictions for each (i.e., for which angles they are valid).

## DIAGNOSTIC_ANSWER_1
The three identities are:
1. \(\sin^2 x + \cos^2 x = 1\) — valid for all real \(x\).
2. \(1 + \tan^2 x = \sec^2 x\) — valid for all \(x\) where \(\cos x \neq 0\), i.e., \(x \neq (2n+1)\frac{\pi}{2}, n \in \mathbb{Z}\).
3. \(1 + \cot^2 x = \cosec^2 x\) — valid for all \(x\) where \(\sin x \neq 0\), i.e., \(x \neq n\pi, n \in \mathbb{Z}\).
A wrong answer (e.g., missing domain restrictions or writing \(\tan^2 x + 1 = \sec^2 x\) without noting \(\cos x \neq 0\)) reveals the student is memorising formulas without understanding their derivation from division by \(\cos^2 x\) or \(\sin^2 x\), which fails when those denominators are zero.

## DIAGNOSTIC_QUESTION_2
Explain why \(\sin^2 x + \cos^2 x = 1\) is true for an angle of \(210^\circ\) (third quadrant) even though the right-triangle definition of sine and cosine only applies to acute angles.

## DIAGNOSTIC_ANSWER_2
On the unit circle, an angle of \(210^\circ\) has terminal side in the third quadrant. The coordinates of the intersection point are \((\cos 210^\circ, \sin 210^\circ) = (-\frac{\sqrt{3}}{2}, -\frac{1}{2})\). The distance from the origin is \(\sqrt{(-\frac{\sqrt{3}}{2})^2 + (-\frac{1}{2})^2} = \sqrt{\frac{3}{4} + \frac{1}{4}} = 1\). Since the radius is always 1, \(x^2 + y^2 = 1\) holds for every point on the circle, regardless of quadrant. The right-triangle definition is a special case; the unit circle definition extends it to all angles. A wrong answer (e.g., "it works because the formula is universal" without geometric reasoning) shows the student hasn't connected the algebraic identity to its geometric foundation.

## DIAGNOSTIC_QUESTION_3
Given \(\cos x = -\frac{12}{13}\) and \(x\) lies in the second quadrant, find the exact values of \(\sin x\), \(\tan x\), \(\cosec x\), \(\sec x\), and \(\cot x\) using Pythagorean identities.

## DIAGNOSTIC_ANSWER_3
**Step 1:** Use \(\sin^2 x + \cos^2 x = 1\). \(\sin^2 x = 1 - \cos^2 x = 1 - \frac{144}{169} = \frac{25}{169}\).  
**Step 2:** \(\sin x = \pm \frac{5}{13}\). Since \(x\) is in QII, \(\sin x > 0\), so \(\sin x = \frac{5}{13}\).  
**Step 3:** \(\tan x = \frac{\sin x}{\cos x} = \frac{5/13}{-12/13} = -\frac{5}{12}\).  
**Step 4:** \(\cosec x = \frac{1}{\sin x} = \frac{13}{5}\).  
**Step 5:** \(\sec x = \frac{1}{\cos x} = -\frac{13}{12}\).  
**Step 6:** \(\cot x = \frac{1}{\tan x} = -\frac{12}{5}\).  
A wrong sign for \(\sin x\) (choosing \(-\frac{5}{13}\)) reveals the student applies the identity algebraically but ignores quadrant sign rules from node c11_math_cbse_03_006.

## DIAGNOSTIC_QUESTION_4
Compare the expressions \(\sqrt{1 - \cos^2 x}\) and \(\sin x\). Are they equivalent for all \(x\)? If not, give a specific counterexample and explain the relationship between them.

## DIAGNOSTIC_ANSWER_4
They are NOT equivalent for all \(x\). \(\sqrt{1 - \cos^2 x} = \sqrt{\sin^2 x} = |\sin x|\), which is always non-negative. But \(\sin x\) can be negative (e.g., in QIII and QIV). Counterexample: \(x = 210^\circ\). \(\cos 210^\circ = -\frac{\sqrt{3}}{2}\), so \(\sqrt{1 - \cos^2 210^\circ} = \sqrt{1 - \frac{3}{4}} = \frac{1}{2}\). But \(\sin 210^\circ = -\frac{1}{2}\). The correct relationship is \(\sin x = \pm \sqrt{1 - \cos^2 x}\), where the sign depends on the quadrant of \(x\). A student who says "yes, they are equal because \(\sin^2 x = 1 - \cos^2 x\)" is ignoring the principal square root convention and quadrant signs.

## DIAGNOSTIC_QUESTION_5
A student simplifies \(\frac{\sec^2 x - 1}{\tan x}\) as follows: \(\frac{\sec^2 x - 1}{\tan x} = \frac{\tan^2 x}{\tan x} = \tan x\). Is this simplification correct for all \(x\) in the domain of the original expression? Justify your answer.

## DIAGNOSTIC_ANSWER_5
The algebraic manipulation uses the identity \(1 + \tan^2 x = \sec^2 x \implies \sec^2 x - 1 = \tan^2 x\), which is valid where \(\cos x \neq 0\). However, the original expression \(\frac{\sec^2 x - 1}{\tan x}\) has domain restrictions: \(\cos x \neq 0\) (for \(\sec x\)) AND \(\tan x \neq 0\) (denominator). \(\tan x = 0\) when \(x = n\pi\). At these points, the original expression is undefined (division by zero), but the simplified expression \(\tan x\) equals 0. Therefore, the simplification \(\tan x\) is NOT equivalent to the original expression at \(x = n\pi\). The correct simplified form is \(\tan x\) with the condition \(x \neq n\pi\). A student who says "yes, it's correct" fails to consider domain equivalence, a critical concept for trigonometric identities.

## DIAGNOSTIC_QUESTION_6
Create a real-world problem (in an Indian context) where a surveyor or architect must use the Pythagorean identity \(\sin^2 x + \cos^2 x = 1\) to find an unknown trigonometric ratio, given one ratio and quadrant information. Provide the problem statement and the complete solution.

## DIAGNOSTIC_ANSWER_6
**Problem:** An architect designing a ramp for a metro station in Bengaluru knows the ramp makes an angle \(x\) with the horizontal where \(\cos x = \frac{4}{5}\) and the ramp slopes upward (angle between \(0^\circ\) and \(90^\circ\)). The vertical rise per metre of ramp length is \(\sin x\). Find the exact value of \(\sin x\) and the slope (rise/run) of the ramp.  
**Solution:** Since the ramp slopes upward, \(x\) is in QI, so \(\sin x > 0\). Using \(\sin^2 x + \cos^2 x = 1\): \(\sin^2 x = 1 - (\frac{4}{5})^2 = 1 - \frac{16}{25} = \frac{9}{25}\). \(\sin x = \sqrt{\frac{9}{25}} = \frac{3}{5}\) (positive because QI). Slope = \(\frac{\text{rise}}{\text{run}} = \frac{\sin x}{\cos x} = \frac{3/5}{4/5} = \frac{3}{4}\).  
A poor answer would give \(\sin x = \pm \frac{3}{5}\) without justifying the positive sign, or would compute slope as \(\frac{4}{3}\) (confusing rise/run), showing lack of connection between trigonometric ratios and physical meaning.

## COMMON_MISCONCEPTION
Students mechanically apply \(\sin x = \sqrt{1 - \cos^2 x}\) without the \(\pm\) sign and without checking the quadrant to determine the correct sign. For example, given \(\cos x = -\frac{3}{5}\) in QIII, they write \(\sin x = \sqrt{1 - \frac{9}{25}} = \frac{4}{5}\) instead of \(-\frac{4}{5}\). Another error: when using \(1 + \tan^2 x = \sec^2 x\) to find \(\sec x\) from \(\tan x\), they forget that \(\sec x = \pm \sqrt{1 + \tan^2 x}\) and the sign depends on the quadrant of \(x\) (specifically the sign of \(\cos x\)). A third error: treating \(\sec^2 x - 1 = \tan^2 x\) as an identity without domain restrictions, leading to incorrect simplification of rational expressions (as in Diagnostic Question 5).

## ON_FAILURE
1. **Revisit the unit circle**: Draw the unit circle, mark an angle in QIII (e.g., \(210^\circ\)), and show that the coordinates are both negative. Compute \(\cos^2 x + \sin^2 x\) numerically to verify it equals 1.  
2. **Practice sign determination**: Give 5 problems where \(\cos x\) or \(\sin x\) is given with quadrant, and the student must find the other using \(\sin^2 x + \cos^2 x = 1\) **and** state the sign rule used. Example: "\(\cos x = -\frac{5}{13}\), QII → \(\sin x = +\frac{12}{13}\) because sine is positive in QII."  
3. **Domain drill**: For each identity, list the excluded values: \(\sin^2 x + \cos^2 x = 1\) (all \(x\)); \(1 + \tan^2 x = \sec^2 x\) (\(x \neq (2n+1)\frac{\pi}{2}\)); \(1 + \cot^2 x = \cosec^2 x\) (\(x \neq n\pi\)). Have the student explain WHY each exclusion exists (division by zero in derivation).  
4. **Simplification with domain**: Practice simplifying expressions like \(\frac{\sec^2 x - 1}{\tan x}\) and writing the final answer with explicit domain restrictions (e.g., "\(\tan x, x \neq n\pi\)").

## PREREQUISITE_NODE_IDS
c11_math_cbse_03_003, c11_math_cbse_03_004, c11_math_cbse_03_005, c11_math_cbse_03_006, c11_math_cbse_03_007, c10_math_cbse_08_006, c10_math_cbse_08_007, c10_math_cbse_08_008
## PREREQUISITE_REASONS
c11_math_cbse_03_003: Defines \(\sin x, \cos x, \tan x\) on the unit circle — the geometric basis for Pythagorean identities.
c11_math_cbse_03_004: Provides values for acute angles; connects Class 10 right-triangle ratios to unit circle coordinates.
c11_math_cbse_03_005: Extends definitions to any angle using unit circle — essential because Pythagorean identities hold for ALL angles, not just acute.
c11_math_cbse_03_006: Gives sign rules in quadrants — critical for choosing correct sign when taking square roots in identities.
c11_math_cbse_03_007: Defines domains of \(\tan, \cot, \sec, \cosec\) — needed to state domain restrictions of derived identities.
c10_math_cbse_08_006: Class 10 introduction to \(\sin^2 A + \cos^2 A = 1\) for acute angles — the starting point before generalisation.
c10_math_cbse_08_007: Class 10 identity \(1 + \tan^2 A = \sec^2 A\) — prior exposure to derived identities.
c10_math_cbse_08_008: Class 10 identity \(1 + \cot^2 A = \cosec^2 A\) — completes the set of three identities.

## FORWARD_NODE_IDS
c11_math_cbse_03_009, c11_math_cbse_03_010, c11_math_cbse_03_011, c11_math_cbse_03_014, c12_math_cbse_02_003, c12_math_cbse_02_006, c12_math_cbse_02_007, c12_math_cbse_07_004, c12_math_cbse_07_005, c12_phy_cbse_09_008, c12_phy_cbse_10_006

## FORWARD_REASONS
c11_math_cbse_03_009: Sum/difference formulas are derived using Pythagorean identities (e.g., to find \(\cos(x+y)\) via distance formula on unit circle).
c11_math_cbse_03_010: Double angle formulas \(\cos 2x = 2\cos^2 x - 1 = 1 - 2\sin^2 x\) come directly from \(\cos^2 x + \sin^2 x = 1\).
c11_math_cbse_03_011: Triple angle formulas use double angle formulas which rely on Pythagorean identities.
c11_math_cbse_03_014: Solving trigonometric equations (e.g., \(2\sin^2 x + 3\cos x = 0\)) requires substituting \(\sin^2 x = 1 - \cos^2 x\) to get a quadratic in one function.
c12_math_cbse_02_003: Pythagorean identities, used in substitution simplifications (e.g., \( \sqrt{1-\sin^2\theta} = \cos\theta \)).  
c12_math_cbse_02_006: Pythagorean identity $\sin^2\theta + \cos^2\theta = 1$ is used to derive the double-angle formula and verify $\left|\frac{2x}{1+x^2}\right| \le 1$.  
c12_math_cbse_02_007: Pythagorean identities ($\sin^2\theta+\cos^2\theta=1$) underlie all half-angle derivations  
c12_math_cbse_07_004: Pythagorean identities used to simplify trigonometric integrals that arise during integration by parts.  
c12_math_cbse_07_005: Trigonometric identities (Pythagorean, double-angle) are essential to convert powers/products into standard forms.  
c12_phy_cbse_09_008: Pythagorean identity sin²θ + cos²θ = 1 used in deriving refractive index formula and solving for angles.  
c12_phy_cbse_10_006: Trigonometric identity cos²(φ/2) used in intensity derivation.  

## CROSS_SUBJECT_PREREQS
c9_math_ch1_4, c10_math_cbse_07_001
## CROSS_SUBJECT_REASONS
c9_math_ch1_4: Distance formula derivation uses Pythagoras theorem — same geometric principle as unit circle identity \(x^2 + y^2 = 1\).
c10_math_cbse_07_001: Coordinate geometry distance formula \(\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}\) is the planar version of the unit circle radius calculation.

## CHAIN_DESCRIPTION
c11_math_cbse_03_003 -> c11_math_cbse_03_005 -> c11_math_cbse_03_006 -> c11_math_cbse_03_008 -> c11_math_cbse_03_009 -> c11_math_cbse_03_010 -> c11_math_cbse_03_014

## THIS_FORMULA
\(\sin^2 x + \cos^2 x = 1\) (for all \(x \in \mathbb{R}\)); \(1 + \tan^2 x = \sec^2 x\) (for \(x \neq (2n+1)\frac{\pi}{2}, n \in \mathbb{Z}\)); \(1 + \cot^2 x = \cosec^2 x\) (for \(x \neq n\pi, n \in \mathbb{Z}\))

## FORMULA_VARIABLES
\(x\) = angle in radians (or degrees); \(\sin x, \cos x, \tan x, \cot x, \sec x, \cosec x\) = trigonometric functions of angle \(x\); \(n\) = any integer

## FORMULA_UNITS
dimensionless (ratios of lengths)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch14_001 | Simple harmonic motion: displacement \(x = A \sin(\omega t + \phi)\) uses \(\sin^2 + \cos^2 = 1\) to derive total energy conservation \(E = \frac{1}{2}kA^2\).
c11_physics_ch15_002 | Wave equation: transverse wave \(y = A \sin(kx - \omega t)\) uses Pythagorean identity in intensity calculations and phase difference analysis.

## PREREQ_CONCEPT
Unit circle definition of trigonometric functions: \(\cos x = x\)-coordinate, \(\sin x = y\)-coordinate of point on circle \(x^2 + y^2 = 1\).

## PREREQ_BEFORE
Student must be able to: (1) locate any angle on the unit circle and determine its quadrant, (2) state the signs of \(\sin x, \cos x, \tan x\) in each quadrant, (3) recall the three Pythagorean identities from Class 10 for acute angles.

## PREREQ_STUCK
If stuck, revisit c11_math_cbse_03_005 (Trigonometric Functions of Any Angle) to review unit circle coordinates for non-acute angles, and c11_math_cbse_03_006 (Sign of Trigonometric Functions in Quadrants) to practice sign determination.

## WORKED_EXAMPLE_1
PROBLEM: A kite is flying at a height of 75 metres above the ground, attached to a string inclined at an angle \(x\) to the horizontal. If \(\cosec x = \frac{5}{3}\) and the string is taut, find the length of the string and the horizontal distance of the kite from the flyer. (Assume the string is straight and the ground is horizontal.)

STEPS:
- Step 1: Identify given and unknown. Given: \(\cosec x = \frac{5}{3}\), height (opposite side) = 75 m. Find: string length (hypotenuse) and horizontal distance (adjacent side).
- Step 2: Use reciprocal identity: \(\sin x = \frac{1}{\cosec x} = \frac{3}{5}\). Since height > 0 and string is above ground, \(x\) is in QI (0° < x < 90°), so all ratios positive.
- Step 3: Use Pythagorean identity \(\sin^2 x + \cos^2 x = 1\) to find \(\cos x\). \(\cos^2 x = 1 - \sin^2 x = 1 - \frac{9}{25} = \frac{16}{25}\). \(\cos x = +\frac{4}{5}\) (positive in QI).
- Step 4: In the right triangle, \(\sin x = \frac{\text{height}}{\text{string length}} \Rightarrow \frac{3}{5} = \frac{75}{\text{string length}}\). String length = \(75 \times \frac{5}{3} = 125\) m.
- Step 5: \(\cos x = \frac{\text{horizontal distance}}{\text{string length}} \Rightarrow \frac{4}{5} = \frac{\text{horizontal distance}}{125}\). Horizontal distance = \(125 \times \frac{4}{5} = 100\) m.
REASONING: The problem connects the unit circle identity to a physical right triangle. The Pythagorean identity gives \(\cos x\) from \(\sin x\), and the quadrant (QI) determines the positive sign. The trigonometric ratios then directly give the sides of the triangle.
ANSWER: String length = 125 m, horizontal distance = 100 m.

## WORKED_EXAMPLE_2
PROBLEM: If \(\tan x = -\frac{4}{3}\) and \(x\) lies in the fourth quadrant, find the values of \(\sin x, \cos x, \sec x, \cosec x, \cot x\).

STEPS:
- Step 1: Identify quadrant and signs. QIV: \(\cos x > 0, \sin x < 0, \tan x < 0, \cot x < 0, \sec x > 0, \cosec x < 0\). Given \(\tan x = -\frac{4}{3}\) matches QIV sign.
- Step 2: Use identity \(1 + \tan^2 x = \sec^2 x\). \(\sec^2 x = 1 + (-\frac{4}{3})^2 = 1 + \frac{16}{9} = \frac{25}{9}\).
- Step 3: \(\sec x = \pm \frac{5}{3}\). In QIV, \(\cos x > 0 \Rightarrow \sec x > 0\). So \(\sec x = \frac{5}{3}\).
- Step 4: \(\cos x = \frac{1}{\sec x} = \frac{3}{5}\).
- Step 5: Use \(\sin^2 x + \cos^2 x = 1\). \(\sin^2 x = 1 - (\frac{3}{5})^2 = 1 - \frac{9}{25} = \frac{16}{25}\). \(\sin x = \pm \frac{4}{5}\). In QIV, \(\sin x < 0\), so \(\sin x = -\frac{4}{5}\).
- Step 6: \(\cosec x = \frac{1}{\sin x} = -\frac{5}{4}\). \(\cot x = \frac{1}{\tan x} = -\frac{3}{4}\).
REASONING: Starting with \(\tan x\), we used \(1 + \tan^2 x = \sec^2 x\) because it directly gives \(\sec x\) (and hence \(\cos x\)) without ambiguity of square root sign if we apply quadrant rules. Then \(\sin^2 x + \cos^2 x = 1\) gives \(\sin x\) with sign from quadrant. This order minimises sign errors.
ANSWER: \(\sin x = -\frac{4}{5}, \cos x = \frac{3}{5}, \tan x = -\frac{4}{3}, \cot x = -\frac{3}{4}, \sec x = \frac{5}{3}, \cosec x = -\frac{5}{4}\).

## WORKED_EXAMPLE_3
PROBLEM: Simplify the expression \(\frac{\sin^4 x - \cos^4 x}{\sin^2 x - \cos^2 x}\) and state its domain. Then evaluate it for \(x = \frac{5\pi}{6}\).

STEPS:
- Step 1: Factor numerator as difference of squares: \(\sin^4 x - \cos^4 x = (\sin^2 x - \cos^2 x)(\sin^2 x + \cos^2 x)\).
- Step 2: Apply Pythagorean identity: \(\sin^2 x + \cos^2 x = 1\). Numerator becomes \((\sin^2 x - \cos^2 x) \cdot 1 = \sin^2 x - \cos^2 x\).
- Step 3: Simplify fraction: \(\frac{\sin^2 x - \cos^2 x}{\sin^2 x - \cos^2 x} = 1\), provided \(\sin^2 x - \cos^2 x \neq 0\).
- Step 4: Find domain restrictions. Denominator zero when \(\sin^2 x = \cos^2 x \Rightarrow \tan^2 x = 1 \Rightarrow \tan x = \pm 1\). This occurs at \(x = \frac{\pi}{4} + \frac{n\pi}{2}, n \in \mathbb{Z}\). Also, original expression has no \(\tan, \sec, \cot, \cosec\), so no additional restrictions from those.
- Step 5: Simplified expression is \(1\) for all \(x \neq \frac{\pi}{4} + \frac{n\pi}{2}\).
- Step 6: Evaluate at \(x = \frac{5\pi}{6}\). Check if in domain: \(\frac{5\pi}{6} = 150^\circ\). \(\tan 150^\circ = -\frac{1}{\sqrt{3}} \neq \pm 1\), so valid. Value = 1.
REASONING: Algebraic simplification using \(\sin^2 x + \cos^2 x = 1\) reduces the expression to a constant, but the domain must exclude points where the original denominator is zero. This is a classic board exam pattern: simplify trigonometric expression and state domain.
ANSWER: Simplified expression = 1, domain: \(x \in \mathbb{R} \setminus \{\frac{\pi}{4} + \frac{n\pi}{2} \mid n \in \mathbb{Z}\}\). Value at \(x = \frac{5\pi}{6}\) is 1.

## COMPETENCY_QUESTION_1
QUESTION: A student claims that since \(\sin^2 x + \cos^2 x = 1\) for all \(x\), the equation \(\sin x + \cos x = 1\) is also true for all \(x\). Is the student correct? Justify your answer with a counterexample and explain the algebraic error.

COMPETENCY: Error identification and correction
STEPS:
- Step 1: Recognise the student's error: confusing \(\sin^2 x + \cos^2 x\) with \((\sin x + \cos x)^2\).
- Step 2: Expand \((\sin x + \cos x)^2 = \sin^2 x + 2\sin x \cos x + \cos^2 x = 1 + 2\sin x \cos x\).
- Step 3: For \(\sin x + \cos x = 1\) to hold, we need \(1 + 2\sin x \cos x = 1 \Rightarrow \sin x \cos x = 0\), which is not true for all \(x\).
- Step 4: Provide counterexample: \(x = 45^\circ = \frac{\pi}{4}\). \(\sin \frac{\pi}{4} = \cos \frac{\pi}{4} = \frac{1}{\sqrt{2}}\). \(\sin x + \cos x = \frac{2}{\sqrt{2}} = \sqrt{2} \neq 1\). But \(\sin^2 x + \cos^2 x = \frac{1}{2} + \frac{1}{2} = 1\).
- Step 5: Conclude: The student incorrectly distributed the square root over addition: \(\sqrt{a^2 + b^2} \neq a + b\).
ANSWER: The student is incorrect. Counterexample: \(x = 45^\circ\) gives \(\sin x + \cos x = \sqrt{2} \neq 1\). The error is assuming \(\sqrt{\sin^2 x + \cos^2 x} = \sin x + \cos x\), but \(\sqrt{a^2 + b^2} \neq a + b\) in general.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a physics experiment, the displacement of a particle is given by \(y = 3\sin \theta + 4\cos \theta\) where \(\theta = \omega t\). The maximum displacement (amplitude) is found by writing \(y = R \sin(\theta + \alpha)\) where \(R = \sqrt{3^2 + 4^2} = 5\). A student argues that since \(\sin^2 \theta + \cos^2 \theta = 1\), the maximum value of \(3\sin \theta + 4\cos \theta\) should be \(3(1) + 4(1) = 7\). Identify the flaw in the student's reasoning and find the correct maximum value.

COMPETENCY: Translating real-world situations to mathematical expressions
STEPS:
- Step 1: Understand the student's argument: they think \(\sin \theta\) and \(\cos \theta\) can both be 1 simultaneously because \(\sin^2 \theta + \cos^2 \theta = 1\).
- Step 2: Explain the flaw: \(\sin^2 \theta + \cos^2 \theta = 1\) is a constraint linking \(\sin \theta\) and \(\cos \theta\); they cannot both be 1 at the same \(\theta\). If \(\sin \theta = 1\), then \(\cos \theta = 0\), and vice versa.
- Step 3: Correct method: Use the identity \(a\sin \theta + b\cos \theta = R\sin(\theta + \alpha)\) where \(R = \sqrt{a^2 + b^2}\). This is derived by setting \(R\cos \alpha = a, R\sin \alpha = b\), then \(R^2 = a^2 + b^2\) using \(\sin^2 \alpha + \cos^2 \alpha = 1\).
- Step 4: Compute \(R = \sqrt{3^2 + 4^2} = 5\). The maximum value of \(R\sin(\theta + \alpha)\) is \(R = 5\) (since max of sine is 1).
- Step 5: Verify: Maximum occurs when \(\sin(\theta + \alpha) = 1 \Rightarrow \theta + \alpha = \frac{\pi}{2}\). At that \(\theta\), \(\sin \theta = \cos \alpha = \frac{3}{5}, \cos \theta = \sin \alpha = \frac{4}{5}\). Then \(3\sin \theta + 4\cos \theta = 3(\frac{3}{5}) + 4(\frac{4}{5}) = \frac{9+16}{5} = 5\).
ANSWER: The student's flaw is assuming \(\sin \theta\) and \(\cos \theta\) can simultaneously attain their individual maximum values of 1. The constraint \(\sin^2 \theta + \cos^2 \theta = 1\) prevents this. The correct maximum displacement is 5 units.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: In Class 10, you used ______ triangles for acute angles only.

## DIAGNOSTIC_ANSWER_7
right

**A wrong answer ("angled" or "standard") reveals the student has clipped the walkthrough's compound - Class 10 used right triangles for acute angles only, before the unit circle set every angle free.** Scenario blanks repeat the walkthrough verbatim, so the two-word compound is the walkthrough's own phrase. Recall the master identity's origin before filling, and give the compound exactly as written.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: In Class 10, you used right ______ for acute angles only.

## DIAGNOSTIC_ANSWER_8
triangles

**A wrong answer ("ratios" or "methods") reveals the student has swapped the walkthrough's noun - Class 10 worked with right triangles, acute angles only.** Scenario blanks repeat the walkthrough verbatim, so the noun is the walkthrough's own word completing the compound. Recall the surveyor's 37° problem before filling, and give the noun exactly.
