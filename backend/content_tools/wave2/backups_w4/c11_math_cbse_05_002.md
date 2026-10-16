## ELI5
Solve x² + 4 = 0 and mathematics invents an ally: i with i² = -1, making √-4 = 2i and the roots 2i and -2i - pure imaginary, real part 0. Another quadratic, x² + 2x + 5 = 0, lands at -1 ± 2i, mixing a real part -1 with imaginary part ±2. Hence the standard form z = a + ib: a = Re(z), b = Im(z), both real. Every real number is a complex number with b = 0 - the extension embraces the old.

## DEFINITION
A complex number is a number of the form \( z = a + ib \), where \( a \) and \( b \) are real numbers and \( i = \sqrt{-1} \) (so \( i^2 = -1 \)). The real number \( a \) is called the real part of \( z \), denoted \( \text{Re}(z) \), and \( b \) is called the imaginary part of \( z \), denoted \( \text{Im}(z) \). The standard form of a complex number is \( a + ib \) with \( a, b \in \mathbb{R} \).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can identify the real and imaginary parts of any complex number written in standard form, convert expressions like \( \sqrt{-9} \) into the form \( a+ib \), and explain why the set of complex numbers extends the real numbers to include solutions of \( x^2 = -1 \).

## SCOPE_BOUNDARY
This node covers the definition of complex numbers, the imaginary unit \( i \), standard form \( a+ib \), and identification of real and imaginary parts. It does NOT cover algebraic operations (addition, multiplication, division), modulus, conjugate, polar representation, or quadratic equations with complex roots — these are addressed in subsequent nodes.

## WALKTHROUGH
Imagine you are solving the quadratic equation \( x^2 + 4 = 0 \). You get \( x^2 = -4 \), which has no solution in real numbers because the square of any real number is non‑negative. This is exactly the historical problem that led mathematicians to invent a new number \( i \) with the property \( i^2 = -1 \). Now ask: if \( i^2 = -1 \), what is \( \sqrt{-4} \)? It becomes \( 2i \). So the solutions are \( 2i \) and \( -2i \). These are complex numbers with real part 0. Next, consider \( x^2 + 2x + 5 = 0 \). Using the quadratic formula, you get \( x = -1 \pm 2i \). Here the solutions have both a real part (\( -1 \)) and an imaginary part (\( \pm 2 \)). This motivates the general form \( a + ib \). Write down the definition: a complex number is \( z = a + ib \) where \( a,b \in \mathbb{R} \). Emphasise that every real number is also a complex number (take \( b = 0 \)). The key insight is that the symbol \( i \) is not a variable but a constant satisfying \( i^2 = -1 \), and the standard form separates the real and imaginary components uniquely.

## DIAGNOSTIC_QUESTION_1
Write the complex number \( \sqrt{-25} \) in standard form \( a + ib \) and state its real and imaginary parts.

## DIAGNOSTIC_ANSWER_1
The standard form is \( 0 + 5i \). Real part \( = 0 \), Imaginary part \( = 5 \). A wrong answer like \( 5i \) without the zero real part, or stating the imaginary part as \( 5i \) instead of \( 5 \), reveals confusion between the imaginary part (a real number) and the imaginary component (which includes \( i \)).

## DIAGNOSTIC_QUESTION_2
If \( z = 3 - 4i \), what are \( \text{Re}(z) \) and \( \text{Im}(z) \)? A student says \( \text{Im}(z) = -4i \). Explain why this is incorrect.

## DIAGNOSTIC_ANSWER_2
\( \text{Re}(z) = 3 \), \( \text{Im}(z) = -4 \). The imaginary part is defined as the real coefficient of \( i \), not the term \( -4i \). The student’s error shows they conflate the imaginary part with the imaginary term; they need to recall the precise definition: if \( z = a + ib \), then \( \text{Im}(z) = b \) (a real number).

## DIAGNOSTIC_QUESTION_3
Express \( \frac{2 + \sqrt{-16}}{2} \) in standard form \( a + ib \).

## DIAGNOSTIC_ANSWER_3
\( \sqrt{-16} = 4i \). Then \( \frac{2 + 4i}{2} = 1 + 2i \). So \( a = 1, b = 2 \). A wrong answer like \( 1 + 4i \) (forgetting to divide the imaginary part) or \( 1 + 2 \) (treating \( i \) as 1) indicates a procedural gap in simplifying complex expressions.

## DIAGNOSTIC_QUESTION_4
Compare the complex numbers \( z_1 = 5 + 0i \) and \( z_2 = 0 + 5i \). How do their positions on the complex plane differ? (You may describe without drawing.)

## DIAGNOSTIC_ANSWER_4
\( z_1 = 5 \) lies on the real axis (5 units to the right of the origin). \( z_2 = 5i \) lies on the imaginary axis (5 units above the origin). A student who says both are the same or both lie on the real axis has not grasped the geometric distinction between real and imaginary components.

## DIAGNOSTIC_QUESTION_5
A student solves \( x^2 + 9 = 0 \) and writes \( x = \pm 3 \). Evaluate this solution and explain the error.

## DIAGNOSTIC_ANSWER_5
The solution is incorrect because \( (\pm 3)^2 = 9 \), not \( -9 \). The correct solutions are \( x = \pm 3i \). The error stems from ignoring the negative sign under the square root and not introducing \( i \). This reveals a fundamental misunderstanding that the square root of a negative number is not a real number.

## DIAGNOSTIC_QUESTION_6
Create a quadratic equation with real coefficients that has the complex number \( 2 - 3i \) as one of its roots. Write the equation in standard form \( ax^2 + bx + c = 0 \).

## DIAGNOSTIC_ANSWER_6
Since coefficients are real, complex roots occur in conjugate pairs. The other root is \( 2 + 3i \). Sum of roots = 4, product = \( (2)^2 + (3)^2 = 13 \). The equation is \( x^2 - 4x + 13 = 0 \). A poor answer might give an equation with complex coefficients or only one root, showing lack of understanding of the conjugate root theorem for real polynomials.

## COMMON_MISCONCEPTION
Students often write the imaginary part as \( bi \) instead of \( b \). For example, for \( z = 2 - 5i \), they say \( \text{Im}(z) = -5i \). The definition explicitly states: if \( z = a + ib \), then \( \text{Im}(z) = b \) (a real number). Another frequent error is treating \( i \) as a variable that can be cancelled or moved across the equality like an algebraic symbol, e.g., writing \( \frac{3+4i}{i} = 3+4 \) by cancelling \( i \).

## ON_FAILURE
Step 1: Revisit the definition: "A complex number is \( a + ib \) where \( a,b \) are real numbers." Write it on a card. Step 2: Practice identifying \( a \) and \( b \) for 10 examples, including pure real (\( 7 \)), pure imaginary (\( -3i \)), and general (\( -2+6i \)). Step 3: For each, say aloud: "Real part is ____, Imaginary part is ____ (without i)." Step 4: Do a quick drill: simplify \( \sqrt{-k} \) for \( k = 1,4,9,16,25 \) and write each as \( 0 + bi \). Step 5: Explain to a peer why \( \text{Im}(2-5i) = -5 \) and not \( -5i \). This verbalisation cures the misconception.

## PREREQUISITE_NODE_IDS
c11_math_cbse_05_001, c9_math_ch3_5, c9_math_ch3_6, c10_math_cbse_04_007, c10_math_cbse_04_010, c10_math_cbse_04_005

## PREREQUISITE_REASONS
c11_math_cbse_05_001: Establishes the need for complex numbers by showing equations with no real solutions.
c9_math_ch3_5: Defines irrational numbers and the real number line, which complex numbers extend.
c9_math_ch3_6: Covers real numbers as union of rational and irrational; complex numbers are the next extension.
c10_math_cbse_04_007: Introduces discriminant \( D = b^2 - 4ac \); when \( D < 0 \), quadratic has no real roots, motivating complex roots.
c10_math_cbse_04_010: Discusses the case \( D < 0 \) (no real roots), directly leading to the introduction of complex numbers.
c10_math_cbse_04_005: If stuck, review the discriminant and the quadratic formula (c10_math_cbse_04_005, c10_math_cbse_04_007) and the definition of the real number line (c9_math_ch3_6).  

## FORWARD_NODE_IDS
c11_math_cbse_05_003, c11_math_cbse_05_004, c11_math_cbse_05_005, c11_math_cbse_05_006, c11_math_cbse_05_007, c11_math_cbse_05_008, c11_math_cbse_05_011, c11_math_cbse_05_012

## FORWARD_REASONS
c11_math_cbse_05_003: Addition/subtraction of complex numbers requires understanding standard form to combine real and imaginary parts separately.
c11_math_cbse_05_004: Multiplication uses the distributive law and \( i^2 = -1 \), relying on the standard form representation.
c11_math_cbse_05_005: Division uses the conjugate, which is defined from the standard form \( a+ib \).
c11_math_cbse_05_006: Powers of \( i \) cycle \( i, -1, -i, 1 \); this is used to simplify higher powers in standard form.
c11_math_cbse_05_007: Modulus and conjugate are defined directly from the real and imaginary parts of \( a+ib \).
c11_math_cbse_05_008: Need to understand standard form \(x+iy\) to identify real and imaginary parts for plotting.  
c11_math_cbse_05_011: Defines standard form a+ib and equality of complex numbers for expressing roots  
c11_math_cbse_05_012: Need standard form a+ib to identify real/imaginary parts for plotting.  

## CROSS_SUBJECT_PREREQS
c9_math_ch1_4, c10_math_cbse_08_006
## CROSS_SUBJECT_REASONS
c9_math_ch1_4: Distance formula in coordinate geometry uses squares and square roots; complex numbers provide an algebraic structure for 2D vectors (Argand plane).
c10_math_cbse_08_006: Trigonometric identity \( \sin^2\theta + \cos^2\theta = 1 \) connects to the modulus of a complex number in polar form, bridging algebra and trigonometry.

## CHAIN_DESCRIPTION
c11_math_cbse_05_001 -> c11_math_cbse_05_002 -> c11_math_cbse_05_003

## THIS_FORMULA
\( z = a + ib \), where \( a, b \in \mathbb{R} \) and \( i = \sqrt{-1} \) (so \( i^2 = -1 \)). \( \text{Re}(z) = a \), \( \text{Im}(z) = b \).

## FORMULA_VARIABLES
\( z \) = complex number, \( a \) = real part (real number), \( b \) = imaginary part (real number), \( i \) = imaginary unit satisfying \( i^2 = -1 \).

## FORMULA_UNITS
dimensionless (complex numbers are abstract mathematical objects; no physical units)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch4_3 | Alternating current (AC) circuit analysis uses complex impedance \( Z = R + iX \) where resistance \( R \) and reactance \( X \) are real numbers; standard form directly applies.
c11_physics_ch7_2 | Quantum mechanics wave functions are complex-valued; the probability density is \( |\psi|^2 \), requiring understanding of complex numbers in standard form.

## PREREQ_CONCEPT
The concept of the real number system and the fact that the square of any real number is non‑negative, so \( x^2 = -1 \) has no solution in \( \mathbb{R} \).

## PREREQ_BEFORE
The student must be comfortable with the quadratic formula and the discriminant, and understand that when the discriminant is negative, the quadratic equation has no real roots.

## PREREQ_STUCK
If stuck, review the discriminant and the quadratic formula (c10_math_cbse_04_005, c10_math_cbse_04_007) and the definition of the real number line (c9_math_ch3_6).

## WORKED_EXAMPLE_1
PROBLEM: Express \( \frac{3 - \sqrt{-49}}{7} \) in the standard form \( a + ib \) and identify its real and imaginary parts.
STEPS:
- Step 1: Simplify the square root of the negative number: \( \sqrt{-49} = \sqrt{49} \cdot \sqrt{-1} = 7i \).
- Step 2: Substitute back into the expression: \( \frac{3 - 7i}{7} \).
- Step 3: Separate the fraction into real and imaginary parts: \( \frac{3}{7} - \frac{7i}{7} \).
- Step 4: Simplify each part: \( \frac{3}{7} - i \).
- Step 5: Write in standard form \( a + ib \): \( a = \frac{3}{7} \), \( b = -1 \). So the complex number is \( \frac{3}{7} - i \).
REASONING: The key is to first express the radical in terms of \( i \), then treat the expression as a binomial divided by a real number, splitting it into two fractions. This maintains the separation of real and imaginary components required by the standard form.
ANSWER: Standard form: \( \frac{3}{7} - i \); Real part = \( \frac{3}{7} \), Imaginary part = \( -1 \).

## WORKED_EXAMPLE_2
PROBLEM: If \( z = \frac{(2+i)^2}{1-i} \), write \( z \) in standard form \( a + ib \).
STEPS:
- Step 1: Expand the numerator: \( (2+i)^2 = 4 + 4i + i^2 = 4 + 4i - 1 = 3 + 4i \).
- Step 2: The denominator is \( 1 - i \). Multiply numerator and denominator by the conjugate of the denominator, \( 1 + i \): \( z = \frac{(3+4i)(1+i)}{(1-i)(1+i)} \).
- Step 3: Compute denominator: \( (1-i)(1+i) = 1 - i^2 = 1 - (-1) = 2 \).
- Step 4: Expand numerator: \( (3+4i)(1+i) = 3 + 3i + 4i + 4i^2 = 3 + 7i - 4 = -1 + 7i \).
- Step 5: Divide by 2: \( z = \frac{-1}{2} + \frac{7}{2}i \).
- Step 6: Identify \( a = -\frac{1}{2} \), \( b = \frac{7}{2} \).
REASONING: This example combines the definition of standard form with algebraic manipulation (expansion, conjugate multiplication) that will be formalised in later nodes. It shows that any algebraic expression involving \( i \) can be reduced to \( a+ib \) by using \( i^2 = -1 \) and rationalising denominators.
ANSWER: Standard form: \( -\frac{1}{2} + \frac{7}{2}i \); Real part = \( -\frac{1}{2} \), Imaginary part = \( \frac{7}{2} \).

## WORKED_EXAMPLE_3
PROBLEM: Find real numbers \( x \) and \( y \) such that \( (x + iy)(2 - 3i) = 4 + i \).
STEPS:
- Step 1: Expand the left-hand side: \( (x+iy)(2-3i) = 2x - 3ix + 2iy - 3i^2y = 2x - 3ix + 2iy + 3y \) (since \( i^2 = -1 \)).
- Step 2: Group real and imaginary parts: \( (2x + 3y) + i(-3x + 2y) \).
- Step 3: Equate real and imaginary parts to the right-hand side \( 4 + i \):
  Real part: \( 2x + 3y = 4 \)
  Imaginary part: \( -3x + 2y = 1 \)
- Step 4: Solve the system of linear equations. Multiply first by 3: \( 6x + 9y = 12 \). Multiply second by 2: \( -6x + 4y = 2 \).
- Step 5: Add the two equations: \( 13y = 14 \) ⇒ \( y = \frac{14}{13} \).
- Step 6: Substitute back: \( 2x + 3(\frac{14}{13}) = 4 \) ⇒ \( 2x = 4 - \frac{42}{13} = \frac{52-42}{13} = \frac{10}{13} \) ⇒ \( x = \frac{5}{13} \).
REASONING: This problem uses the fact that two complex numbers are equal iff their real parts are equal and their imaginary parts are equal. It connects the definition of standard form with solving simultaneous linear equations (a Class 10 skill), demonstrating how complex numbers turn one equation into two real equations.
ANSWER: \( x = \frac{5}{13} \), \( y = \frac{14}{13} \). The complex number is \( \frac{5}{13} + \frac{14}{13}i \).

## COMPETENCY_QUESTION_1
QUESTION: A student claims that \( \sqrt{-4} \times \sqrt{-9} = \sqrt{36} = 6 \). Is this correct? Justify your answer by evaluating each side using the definition of \( i \).
COMPETENCY: Error identification and correction; understanding the limitations of the square root property \( \sqrt{a}\sqrt{b} = \sqrt{ab} \) for negative numbers.
STEPS:
- Step 1: Recall that \( \sqrt{-4} = 2i \) and \( \sqrt{-9} = 3i \) by definition of \( i \).
- Step 2: Compute the left-hand side: \( (2i)(3i) = 6i^2 = 6(-1) = -6 \).
- Step 3: The student's right-hand side is \( 6 \). Since \( -6 \neq 6 \), the claim is false.
- Step 4: Explain that the property \( \sqrt{a}\sqrt{b} = \sqrt{ab} \) holds only for non‑negative real numbers \( a, b \). For negative numbers, one must first convert to \( i \) form.
ANSWER: The student is incorrect. The correct product is \( -6 \). The error arises from applying the square root product rule to negative radicands.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The impedance of an AC circuit is given by \( Z = R + iX \), where \( R \) is resistance and \( X \) is reactance (both in ohms). If \( Z = 3 + 4i \) ohms, find the magnitude of the impedance \( |Z| \) and explain its physical significance. (Note: \( |Z| = \sqrt{R^2 + X^2} \)).
COMPETENCY: Translating real-world situations to mathematical expressions; applying the standard form to a physics context.
STEPS:
- Step 1: Identify \( R = 3 \) (real part) and \( X = 4 \) (imaginary part) from the standard form \( 3 + 4i \).
- Step 2: Apply the magnitude formula: \( |Z| = \sqrt{3^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5 \) ohms.
- Step 3: Interpret: The magnitude \( |Z| \) represents the total opposition to current flow in the circuit, combining both resistive and reactive effects. It is the ratio of peak voltage to peak current.
ANSWER: Magnitude = 5 ohms. It represents the total impedance magnitude, determining the amplitude of current for a given voltage amplitude.
DIFFICULTY: hard