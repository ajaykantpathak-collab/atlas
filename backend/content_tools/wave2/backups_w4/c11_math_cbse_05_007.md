## ELI5
From your classroom to a point 3 metres east, 4 north: Pythagoras gives 5. The complex number 3 + 4i inherits that measure - its modulus |z| = √(a² + b²) is exactly the Argand-plane distance from the origin. Its conjugate, 3 - 4i, is the mirror twin: imaginary part sign-flipped, real part untouched. The pair work as a team: |z| = |z̄|, and z·z̄ = |z|² - the identity that evicts i from denominators and unlocks the polar form ahead.

## DEFINITION
The modulus of a complex number \( z = a + ib \) (where \( a, b \in \mathbb{R} \)) is the non-negative real number \( |z| = \sqrt{a^2 + b^2} \), representing its distance from the origin on the Argand plane. The conjugate of \( z \) is \( \bar{z} = a - ib \), obtained by changing the sign of the imaginary part while keeping the real part unchanged.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can compute the modulus and conjugate of any complex number in standard form, apply the properties \( |z| = |\bar{z}| \) and \( z\bar{z} = |z|^2 \) to simplify expressions, and interpret both concepts geometrically on the Argand plane to solve multi-step problems involving division, equations, and inequalities of complex numbers.

## SCOPE_BOUNDARY
This node covers the definition, computation, algebraic properties, and geometric interpretation of modulus and conjugate for complex numbers in standard form \( a + ib \). It does NOT cover polar representation (covered in c11_math_cbse_05_008 and c11_math_cbse_05_009), Euler's form (c11_math_cbse_05_010), or applications to quadratic equations with complex roots (c11_math_cbse_05_011).

## WALKTHROUGH
Imagine you're measuring the distance from your classroom (origin) to a point marked 3 metres east and 4 metres north — you'd use the Pythagorean theorem to get 5 metres. Now, what if that point represents the complex number \( 3 + 4i \)? The modulus \( |3 + 4i| \) is exactly that distance: \( \sqrt{3^2 + 4^2} = 5 \). The conjugate \( 3 - 4i \) is its mirror image across the real axis (east-west line). We've already learned addition, subtraction, multiplication, and division of complex numbers (c11_math_cbse_05_003 to c11_math_cbse_05_005), and powers of \( i \) (c11_math_cbse_05_006). Now we'll see how modulus and conjugate simplify division and reveal geometric symmetry. Start by writing \( z = a + ib \), then compute \( |z| = \sqrt{a^2 + b^2} \) and \( \bar{z} = a - ib \) — these two tools will unlock the polar form and Argand diagram coming next.

Takeaway: mastery means both objects being computed on sight and their properties deployed - modulus multiplicative, conjugate distributing over products and quotients. Exam moves: compute-modulus-and-conjugate questions and simplify-using-z-z̄ items feeding division problems. Check yourself: the conjugate flips only the imaginary sign - 3 - 4i, never -3 + 4i. Students miss it because the two tools look cosmetic, when the definition's geometry is the point: modulus is distance, conjugation is reflection, and together they turn algebra into pictures.

## DIAGNOSTIC_QUESTION_1
What is the modulus of the complex number \( z = -5 + 12i \)? Write the formula and compute the exact value.

## DIAGNOSTIC_ANSWER_1
The modulus is \( |z| = \sqrt{(-5)^2 + 12^2} = \sqrt{25 + 144} = \sqrt{169} = 13 \). A wrong answer like \( \sqrt{-25 + 144} = \sqrt{119} \) reveals the student is squaring the imaginary unit \( i \) instead of treating the coefficient 12 as a real number, confusing algebraic form with the modulus formula.

## DIAGNOSTIC_QUESTION_2
If \( z = 2 - 3i \), what is \( z \cdot \bar{z} \)? How does this relate to \( |z|^2 \)? Explain why this relationship holds for any complex number.

## DIAGNOSTIC_ANSWER_2
\( \bar{z} = 2 + 3i \), so \( z \cdot \bar{z} = (2 - 3i)(2 + 3i) = 4 - 9i^2 = 4 + 9 = 13 \). Also \( |z| = \sqrt{2^2 + (-3)^2} = \sqrt{13} \), so \( |z|^2 = 13 \). The identity \( z\bar{z} = |z|^2 \) holds because \( (a+ib)(a-ib) = a^2 - (ib)^2 = a^2 + b^2 = |z|^2 \). A wrong answer like \( (2-3i)(2-3i) = 4 - 12i + 9i^2 = -5 -12i \) shows the student confused conjugate with the original number, missing the sign change in the imaginary part.

## DIAGNOSTIC_QUESTION_3
Simplify \( \frac{3 + 4i}{1 - 2i} \) by multiplying numerator and denominator by the conjugate of the denominator. Express your answer in standard form \( a + ib \).

## DIAGNOSTIC_ANSWER_3
Multiply by \( \frac{1 + 2i}{1 + 2i} \): Numerator: \( (3+4i)(1+2i) = 3 + 6i + 4i + 8i^2 = 3 + 10i - 8 = -5 + 10i \). Denominator: \( (1-2i)(1+2i) = 1 - 4i^2 = 1 + 4 = 5 \). Result: \( \frac{-5 + 10i}{5} = -1 + 2i \). A wrong answer like \( -5 + 10i \) (forgetting to divide by 5) or \( \frac{-5 + 10i}{1 - 4i} \) (not simplifying denominator) reveals the student doesn't recognize that the conjugate product yields a real denominator, which is the entire purpose of this technique.

## DIAGNOSTIC_QUESTION_4
Given \( z_1 = 1 + i \) and \( z_2 = 2 - i \), verify whether \( |z_1 z_2| = |z_1| |z_2| \) and \( \overline{z_1 z_2} = \bar{z_1} \bar{z_2} \). What do these properties tell you about the algebraic structure?

## DIAGNOSTIC_ANSWER_4
\( z_1 z_2 = (1+i)(2-i) = 2 - i + 2i - i^2 = 3 + i \). \( |z_1 z_2| = \sqrt{3^2 + 1^2} = \sqrt{10} \). \( |z_1| = \sqrt{2} \), \( |z_2| = \sqrt{5} \), product \( = \sqrt{10} \). Equal. \( \overline{z_1 z_2} = 3 - i \). \( \bar{z_1} = 1-i \), \( \bar{z_2} = 2+i \), product \( = (1-i)(2+i) = 2 + i - 2i - i^2 = 3 - i \). Equal. These show modulus is multiplicative and conjugation is an automorphism — both preserve the algebraic structure. A wrong answer where the student computes \( |z_1 z_2| \) as \( |z_1| + |z_2| \) reveals additive thinking instead of multiplicative, a common error when generalizing from real absolute value properties.

## DIAGNOSTIC_QUESTION_5
A student claims: "For any complex number \( z \), \( |z^2| = |z|^2 \) and \( \overline{z^2} = (\bar{z})^2 \)." Is this always true? Justify your answer with a proof or counterexample.

## DIAGNOSTIC_ANSWER_5
Yes, always true. Proof: \( |z^2| = |z \cdot z| = |z| \cdot |z| = |z|^2 \) (using multiplicativity of modulus). \( \overline{z^2} = \overline{z \cdot z} = \bar{z} \cdot \bar{z} = (\bar{z})^2 \) (using conjugation distributes over multiplication). These are special cases of the general properties \( |z_1 z_2| = |z_1||z_2| \) and \( \overline{z_1 z_2} = \bar{z_1}\bar{z_2} \). A wrong answer claiming it's false with a counterexample like \( z = 1+i \) (where \( z^2 = 2i \), \( |z^2| = 2 \), \( |z|^2 = (\sqrt{2})^2 = 2 \) — actually equal!) reveals the student made an arithmetic error in computing powers or moduli, not a conceptual flaw.

## DIAGNOSTIC_QUESTION_6
Create a complex number \( z \) such that \( |z| = 5 \) and \( \text{Re}(z) = 3 \). How many such numbers exist? Find all of them and plot them on the Argand plane.

## DIAGNOSTIC_ANSWER_6
Let \( z = 3 + iy \). Then \( |z| = \sqrt{3^2 + y^2} = 5 \Rightarrow 9 + y^2 = 25 \Rightarrow y^2 = 16 \Rightarrow y = \pm 4 \). Two numbers: \( 3 + 4i \) and \( 3 - 4i \). They are symmetric about the real axis (conjugates). A poor answer giving only \( 3 + 4i \) misses the negative root, revealing the student forgets that modulus uses \( y^2 \), losing sign information — a key insight that conjugate pairs share the same modulus.

## COMMON_MISCONCEPTION
Students often write \( |a + ib| = \sqrt{a^2 + (ib)^2} = \sqrt{a^2 - b^2} \), treating \( i \) as part of the coefficient inside the square instead of recognizing \( b \) is the real coefficient of \( i \). For example, for \( z = 3 + 4i \), they compute \( \sqrt{3^2 + (4i)^2} = \sqrt{9 - 16} = \sqrt{-7} \) instead of \( \sqrt{3^2 + 4^2} = 5 \). This stems from confusing the algebraic form \( a + ib \) with the modulus formula, where both \( a \) and \( b \) are real numbers representing coordinates on the Argand plane.

## ON_FAILURE
Ask the student to plot \( 3 + 4i \) on the Argand plane and physically measure the distance from origin using a ruler — they'll get 5 units. Then write the distance formula \( \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2} \) with \( (x_1,y_1) = (0,0) \) and \( (x_2,y_2) = (3,4) \). Explicitly connect: the x-coordinate is the real part \( a \), the y-coordinate is the imaginary coefficient \( b \) (not \( ib \)). Have them recompute \( |3+4i| \) using this geometric understanding, then practice with \( -5 + 12i \) and \( -3 - 4i \) to reinforce that modulus depends only on squares of real coefficients.

## PREREQUISITE_NODE_IDS
c11_math_cbse_05_002, c11_math_cbse_05_003, c11_math_cbse_05_004, c11_math_cbse_05_005, c11_math_cbse_05_006, c6_math_ch02_025, c9_math_ch1_4
## PREREQUISITE_REASONS
c11_math_cbse_05_002: Requires understanding standard form \( a+ib \) to identify real and imaginary parts for modulus/conjugate computation.
c11_math_cbse_05_003: Addition/subtraction of complex numbers needed for algebraic manipulation of conjugate expressions.
c11_math_cbse_05_004: Multiplication of complex numbers essential for proving properties like \( z\bar{z} = |z|^2 \) and \( |z_1 z_2| = |z_1||z_2| \).
c11_math_cbse_05_005: Division of complex numbers uses conjugate of denominator — the primary application of conjugate in this chapter.
c11_math_cbse_05_006: Powers of \( i \) needed when simplifying expressions involving \( i^2 = -1 \) during conjugate multiplication.
c6_math_ch02_025: Absolute value of integers is the 1D analogue of modulus; students generalize \( |x| = \sqrt{x^2} \) to \( |a+ib| = \sqrt{a^2+b^2} \).
c9_math_ch1_4: Distance formula derived from Pythagoras theorem is exactly the modulus formula; geometric interpretation depends on this.

## FORWARD_NODE_IDS
c11_math_cbse_05_008, c11_math_cbse_05_009, c11_math_cbse_05_010, c11_math_cbse_05_012
## FORWARD_REASONS
c11_math_cbse_05_008: Argand plane representation uses modulus as radial distance and conjugate as reflection across real axis — direct geometric interpretation.
c11_math_cbse_05_009: Polar form \( r(\cos\theta + i\sin\theta) \) uses \( r = |z| \); modulus is the radial coordinate.
c11_math_cbse_05_010: Euler's form \( re^{i\theta} \) builds on polar form where \( r = |z| \); modulus becomes the magnitude in exponential representation.
c11_math_cbse_05_012: Argand diagram geometric interpretation of equations/inequalities like \( |z - z_0| = r \) (circles) relies entirely on modulus definition.

## CROSS_SUBJECT_PREREQS
c9_math_ch1_4, c8_math_ch9_5, c8_math_ch2_3
## CROSS_SUBJECT_REASONS
c9_math_ch1_4: Distance formula \( \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2} \) is identical to modulus formula \( \sqrt{a^2 + b^2} \) — both measure Euclidean distance in plane.
c8_math_ch9_5: Baudhayana-Pythagoras theorem \( a^2 + b^2 = c^2 \) is the mathematical foundation of modulus computation — the hypotenuse is the modulus.
c8_math_ch2_3: Exponential notation \( a^m \) underlies the property \( |z^n| = |z|^n \) which generalizes to integer powers via repeated multiplication.

## CHAIN_DESCRIPTION
c11_math_cbse_05_002 -> c11_math_cbse_05_003 -> c11_math_cbse_05_004 -> c11_math_cbse_05_005 -> c11_math_cbse_05_006 -> c11_math_cbse_05_007 -> c11_math_cbse_05_008 -> c11_math_cbse_05_009 -> c11_math_cbse_05_010

## THIS_FORMULA
Modulus: \( |z| = \sqrt{a^2 + b^2} \) for \( z = a + ib \). Conjugate: \( \bar{z} = a - ib \). Key properties: \( |z| = |\bar{z}| \), \( z\bar{z} = |z|^2 \), \( |z_1 z_2| = |z_1||z_2| \), \( \overline{z_1 z_2} = \bar{z_1}\bar{z_2} \), \( |z_1 / z_2| = |z_1|/|z_2| \), \( \overline{(z_1 / z_2)} = \bar{z_1}/\bar{z_2} \).

## FORMULA_VARIABLES
\( z \) = complex number in standard form; \( a \) = real part \( \text{Re}(z) \); \( b \) = imaginary coefficient \( \text{Im}(z) \) (not \( ib \)); \( i \) = imaginary unit with \( i^2 = -1 \); \( |z| \) = modulus (non-negative real); \( \bar{z} \) = conjugate; \( z_1, z_2 \) = arbitrary complex numbers.

## FORMULA_UNITS
dimensionless (modulus and conjugate are pure numbers; if \( z \) represents a physical quantity with units, \( |z| \) inherits those units)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch02_3 | In physics, the magnitude of a 2D vector \( \vec{v} = a\hat{i} + b\hat{j} \) is \( |\vec{v}| = \sqrt{a^2 + b^2} \), identical to complex modulus — both represent Euclidean distance in plane.
c11_physics_ch04_5 | AC circuit impedance \( Z = R + iX \) has magnitude \( |Z| = \sqrt{R^2 + X^2} \) (modulus) and phase angle \( \theta = \tan^{-1}(X/R) \); conjugate \( \bar{Z} = R - iX \) appears in power calculations \( P = \frac{1}{2} \text{Re}(V \bar{I}) \).

## PREREQ_CONCEPT
The distance formula in coordinate geometry (Class 9) and absolute value of real numbers (Class 6) are the two foundational concepts that unify in the modulus of a complex number.

## PREREQ_BEFORE
The student must be able to identify the real and imaginary parts of a complex number in standard form \( a + ib \), perform basic algebraic operations on complex numbers, and recall the distance formula \( \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2} \).

## PREREQ_STUCK
If stuck, revisit c11_math_cbse_05_002 (standard form identification) and c9_math_ch1_4 (distance formula derivation) — these are the exact building blocks for modulus.

## WORKED_EXAMPLE_1
PROBLEM: A signal in a communication system is represented by the complex number \( z = \frac{2 + 3i}{1 - i} \). Find the modulus and conjugate of \( z \), and verify that \( z \cdot \bar{z} = |z|^2 \).

STEPS:
- Step 1: Simplify \( z \) to standard form by multiplying numerator and denominator by the conjugate of the denominator: \( z = \frac{2+3i}{1-i} \times \frac{1+i}{1+i} \).
- Step 2: Compute numerator: \( (2+3i)(1+i) = 2 + 2i + 3i + 3i^2 = 2 + 5i - 3 = -1 + 5i \). Compute denominator: \( (1-i)(1+i) = 1 - i^2 = 1 + 1 = 2 \).
- Step 3: Write \( z \) in standard form: \( z = \frac{-1 + 5i}{2} = -\frac{1}{2} + \frac{5}{2}i \). Identify \( a = -\frac{1}{2} \), \( b = \frac{5}{2} \).
- Step 4: Compute modulus: \( |z| = \sqrt{a^2 + b^2} = \sqrt{\left(-\frac{1}{2}\right)^2 + \left(\frac{5}{2}\right)^2} = \sqrt{\frac{1}{4} + \frac{25}{4}} = \sqrt{\frac{26}{4}} = \frac{\sqrt{26}}{2} \).
- Step 5: Compute conjugate: \( \bar{z} = -\frac{1}{2} - \frac{5}{2}i \). Verify \( z \cdot \bar{z} = \left(-\frac{1}{2} + \frac{5}{2}i\right)\left(-\frac{1}{2} - \frac{5}{2}i\right) = \frac{1}{4} - \frac{25}{4}i^2 = \frac{1}{4} + \frac{25}{4} = \frac{26}{4} = \frac{13}{2} \). Compute \( |z|^2 = \left(\frac{\sqrt{26}}{2}\right)^2 = \frac{26}{4} = \frac{13}{2} \). Both equal, verified.

REASONING: Simplifying to standard form first is crucial because the modulus and conjugate formulas are defined for \( a + ib \) with explicit real \( a, b \). The conjugate multiplication trick eliminates \( i \) from the denominator, making the real and imaginary parts visible. The verification step confirms the fundamental identity \( z\bar{z} = |z|^2 \), which is the algebraic backbone of complex number geometry.

ANSWER: \( z = -\frac{1}{2} + \frac{5}{2}i \), \( |z| = \frac{\sqrt{26}}{2} \), \( \bar{z} = -\frac{1}{2} - \frac{5}{2}i \), and \( z \cdot \bar{z} = |z|^2 = \frac{13}{2} \).

## WORKED_EXAMPLE_2
PROBLEM: Find all complex numbers \( z \) satisfying \( |z - 2 + 3i| = 4 \) and \( \text{Re}(z) = 0 \). Interpret geometrically.

STEPS:
- Step 1: Let \( z = x + iy \). The condition \( \text{Re}(z) = 0 \) means \( x = 0 \), so \( z = iy \) (pure imaginary).
- Step 2: Substitute into the modulus equation: \( |iy - 2 + 3i| = | -2 + i(y + 3) | = 4 \).
- Step 3: Apply modulus formula: \( \sqrt{(-2)^2 + (y+3)^2} = 4 \).
- Step 4: Square both sides: \( 4 + (y+3)^2 = 16 \Rightarrow (y+3)^2 = 12 \Rightarrow y+3 = \pm \sqrt{12} = \pm 2\sqrt{3} \).
- Step 5: Solve for \( y \): \( y = -3 + 2\sqrt{3} \) or \( y = -3 - 2\sqrt{3} \).
- Step 6: The two solutions are \( z_1 = i(-3 + 2\sqrt{3}) \) and \( z_2 = i(-3 - 2\sqrt{3}) \). Geometrically, \( |z - (2 - 3i)| = 4 \) is a circle centered at \( 2 - 3i \) with radius 4; \( \text{Re}(z) = 0 \) is the imaginary axis. The solutions are the two intersection points.

REASONING: This problem combines modulus (distance) with a constraint on the real part. Writing \( z = x + iy \) converts the complex equation into real coordinate geometry. The equation \( |z - z_0| = r \) is the complex form of a circle — a key concept for the Argand diagram node. Solving yields two points because a line (imaginary axis) intersects a circle at most twice.

ANSWER: \( z = i(-3 + 2\sqrt{3}) \) and \( z = i(-3 - 2\sqrt{3}) \). Two solutions, symmetric about the center's imaginary coordinate.

## WORKED_EXAMPLE_3
PROBLEM: If \( z_1 = 3 + 4i \) and \( z_2 = 1 - 2i \), compute \( \left| \frac{z_1^2 + z_2^2}{z_1 - z_2} \right| \) using properties of modulus without fully expanding the numerator and denominator.

STEPS:
- Step 1: Compute \( z_1 - z_2 = (3+4i) - (1-2i) = 2 + 6i \). Its modulus: \( |z_1 - z_2| = \sqrt{2^2 + 6^2} = \sqrt{4 + 36} = \sqrt{40} = 2\sqrt{10} \).
- Step 2: Use the property \( |z_1^2 + z_2^2| \neq |z_1|^2 + |z_2|^2 \) (modulus is not additive). Instead, compute \( z_1^2 \) and \( z_2^2 \) directly: \( z_1^2 = (3+4i)^2 = 9 + 24i + 16i^2 = -7 + 24i \). \( z_2^2 = (1-2i)^2 = 1 - 4i + 4i^2 = -3 - 4i \).
- Step 3: Sum: \( z_1^2 + z_2^2 = (-7 + 24i) + (-3 - 4i) = -10 + 20i \). Modulus: \( |z_1^2 + z_2^2| = \sqrt{(-10)^2 + 20^2} = \sqrt{100 + 400} = \sqrt{500} = 10\sqrt{5} \).
- Step 4: Apply quotient property: \( \left| \frac{z_1^2 + z_2^2}{z_1 - z_2} \right| = \frac{|z_1^2 + z_2^2|}{|z_1 - z_2|} = \frac{10\sqrt{5}}{2\sqrt{10}} \).
- Step 5: Simplify: \( \frac{10\sqrt{5}}{2\sqrt{10}} = 5 \cdot \frac{\sqrt{5}}{\sqrt{10}} = 5 \cdot \sqrt{\frac{5}{10}} = 5 \cdot \sqrt{\frac{1}{2}} = \frac{5}{\sqrt{2}} = \frac{5\sqrt{2}}{2} \).

REASONING: This problem tests whether the student knows which modulus properties are valid (multiplicative, quotient) and which are not (additive). The key insight is that \( |z_1^2 + z_2^2| \) cannot be split, so direct computation of the sum is necessary. However, once the numerator and denominator moduli are found separately, the quotient property simplifies the final division elegantly.

ANSWER: \( \frac{5\sqrt{2}}{2} \)

## COMPETENCY_QUESTION_1
QUESTION: A student simplifies \( \frac{1 + i}{1 - i} \) as follows: "Multiply numerator and denominator by \( 1 + i \): \( \frac{(1+i)^2}{(1-i)(1+i)} = \frac{1 + 2i + i^2}{1 - i^2} = \frac{1 + 2i - 1}{1 + 1} = \frac{2i}{2} = i \)." Then they claim: "So \( \left| \frac{1 + i}{1 - i} \right| = |i| = 1 \)." Is the student's final answer correct? Is their method valid? Explain why or why not, and describe an alternative method using modulus properties directly.

COMPETENCY: Error identification and correction; comparing and justifying methods

STEPS:
- Step 1: Check the algebraic simplification: \( \frac{1+i}{1-i} \times \frac{1+i}{1+i} = \frac{(1+i)^2}{1 - i^2} = \frac{1 + 2i - 1}{2} = \frac{2i}{2} = i \). Correct.
- Step 2: Check the modulus: \( |i| = \sqrt{0^2 + 1^2} = 1 \). Correct final answer.
- Step 3: Alternative method using modulus quotient property: \( \left| \frac{1+i}{1-i} \right| = \frac{|1+i|}{|1-i|} = \frac{\sqrt{1^2+1^2}}{\sqrt{1^2+(-1)^2}} = \frac{\sqrt{2}}{\sqrt{2}} = 1 \).
- Step 4: Compare methods: Both give 1. The property method is faster and avoids algebraic expansion, but requires knowing the property holds. The algebraic method is more fundamental but more computation.

ANSWER: Yes, the final answer is correct (modulus = 1). The method is valid but longer than necessary. The modulus quotient property \( |z_1/z_2| = |z_1|/|z_2| \) gives the answer in one step: \( \frac{|1+i|}{|1-i|} = \frac{\sqrt{2}}{\sqrt{2}} = 1 \). This demonstrates that modulus of a quotient depends only on the moduli, not the arguments — a powerful structural insight.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Let \( z \) be a complex number such that \( |z| = 2 \) and \( \text{Re}(z) = \sqrt{2} \). Find \( z + \bar{z} \) and \( z - \bar{z} \). Then determine the value of \( \left| \frac{z}{\bar{z}} + \frac{\bar{z}}{z} \right| \).

COMPETENCY: Translating real-world situations to mathematical expressions; multi-concept synthesis

STEPS:
- Step 1: Let \( z = x + iy \). Given \( |z| = 2 \Rightarrow x^2 + y^2 = 4 \). Given \( \text{Re}(z) = \sqrt{2} \Rightarrow x = \sqrt{2} \).
- Step 2: Find \( y \): \( (\sqrt{2})^2 + y^2 = 4 \Rightarrow 2 + y^2 = 4 \Rightarrow y^2 = 2 \Rightarrow y = \pm \sqrt{2} \). So \( z = \sqrt{2} \pm i\sqrt{2} \), \( \bar{z} = \sqrt{2} \mp i\sqrt{2} \).
- Step 3: Compute \( z + \bar{z} = 2\sqrt{2} \) (real part doubled, imaginary cancels). Compute \( z - \bar{z} = \pm 2i\sqrt{2} \) (imaginary part doubled, real cancels).
- Step 4: For the expression: \( \frac{z}{\bar{z}} + \frac{\bar{z}}{z} = \frac{z^2 + \bar{z}^2}{z\bar{z}} \). Since \( z\bar{z} = |z|^2 = 4 \), and \( z^2 + \bar{z}^2 = (z+\bar{z})^2 - 2z\bar{z} = (2\sqrt{2})^2 - 2(4) = 8 - 8 = 0 \).
- Step 5: Therefore \( \frac{z}{\bar{z}} + \frac{\bar{z}}{z} = \frac{0}{4} = 0 \), so its modulus is \( |0| = 0 \).

ANSWER: \( z + \bar{z} = 2\sqrt{2} \), \( z - \bar{z} = \pm 2i\sqrt{2} \), and \( \left| \frac{z}{\bar{z}} + \frac{\bar{z}}{z} \right| = 0 \). The result is independent of the sign of \( y \) — both conjugate pairs yield the same value.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you're measuring the ______ from your classroom (origin) to a point marked 3 metres east and 4 metres north — you'd use the Pythagorean theorem to get 5 metres.

## DIAGNOSTIC_ANSWER_7
distance

**A wrong answer ("path" or "route") reveals the student has swapped the walkthrough's measure - the 3-metres-east, 4-metres-north walk measures a distance from the classroom origin, and that distance is the modulus of 3 + 4i.** Distance is the walkthrough's own noun. Recall the Pythagorean answer of 5 before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you're measuring the distance from your classroom (origin) to a point marked 3 metres east and 4 metres north — you'd use the ______ theorem to get 5 metres.

## DIAGNOSTIC_ANSWER_8
Pythagorean

**A wrong answer ("Euclidean" or "coordinate") reveals the student has swapped the walkthrough's theorem - the 3-4-5 triangle comes from the Pythagorean theorem.** Pythagorean is the walkthrough's own adjective naming the theorem, and the adjective is what the blank grades. Recall the metres east and north before filling, and give the adjective exactly.
