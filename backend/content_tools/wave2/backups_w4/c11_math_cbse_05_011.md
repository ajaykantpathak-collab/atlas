## ELI5
A bridge arch follows h(x) = -x² + 4x - 13; setting h = 0 gives x² - 4x + 13 = 0, discriminant 16 - 52 = -36 - the arch never touches ground. But the roots exist as a conjugate pair: write √D = i√|D|, and x = (-b ± i√|D|)/2a. Complex roots of real quadratics always arrive in pairs α and its conjugate, whose sum -b/a and product c/a stay real - symmetry the quadratic formula guarantees.

## DEFINITION
A quadratic equation with complex roots is an equation of the form \(ax^2 + bx + c = 0\) where \(a, b, c \in \mathbb{R}\), \(a \neq 0\), and the discriminant \(D = b^2 - 4ac < 0\), yielding two complex conjugate roots \(\alpha = \frac{-b + i\sqrt{|D|}}{2a}\) and \(\beta = \frac{-b - i\sqrt{|D|}}{2a}\) where \(i = \sqrt{-1}\).

## COGNITIVE_LEVEL
analyze

## MASTERY_CRITERIA
The student can solve any quadratic equation with real coefficients and negative discriminant, express roots in standard form \(a \pm ib\), verify the conjugate pair property, and apply the sum/product of roots relationships to construct equations from given complex roots.

## SCOPE_BOUNDARY
Covers quadratic equations with real coefficients and complex roots (D < 0) including root properties, conjugate pairs, and formation of equations from complex roots. Does NOT cover quadratic equations with complex coefficients or cubic/higher degree equations with complex roots.

## WALKTHROUGH
Imagine you are designing a parabolic arch for a bridge where the height \(h\) (in metres) follows \(h(x) = -x^2 + 4x - 13\). You need to find where the arch touches the ground (h = 0). Setting \(-x^2 + 4x - 13 = 0\) gives \(x^2 - 4x + 13 = 0\). The discriminant is \(16 - 52 = -36 < 0\) — no real solutions! This means the arch never touches the ground. But mathematically, the roots exist as complex numbers. First, identify \(a, b, c\) from \(ax^2 + bx + c = 0\). Compute \(D = b^2 - 4ac\). If \(D < 0\), write \(\sqrt{D} = i\sqrt{|D|}\). Apply the quadratic formula: \(x = \frac{-b \pm i\sqrt{|D|}}{2a}\). The key insight: complex roots of real quadratics always occur as conjugate pairs \(\alpha, \bar{\alpha}\) with sum \(-\frac{b}{a} \in \mathbb{R}\) and product \(\frac{c}{a} \in \mathbb{R}\).

Takeaway: mastery means the D < 0 branch being executed cleanly and the conjugate-pair property verified through sum and product. Exam moves: solve-with-negative-discriminant questions and construct-equation-from-complex-roots items. Check yourself: √-16 is 4i, not -4 or 4 - the flagged error hands the sign to i. Students miss it because the formula's machinery hides the structure, when the definition's pair property is the headline: real coefficients, complex roots, conjugates forever.

## DIAGNOSTIC_QUESTION_1
State the quadratic formula for roots of \(ax^2 + bx + c = 0\) and write the condition on the discriminant \(D\) for the roots to be non-real complex numbers.

## DIAGNOSTIC_ANSWER_1
The quadratic formula is \(x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}\). For non-real complex roots, the discriminant must satisfy \(D = b^2 - 4ac < 0\). A wrong answer (e.g., \(D > 0\) or \(D \neq 0\)) reveals the student confuses the discriminant conditions for real vs complex roots, a critical Class 10 concept that must be solid before proceeding.

## DIAGNOSTIC_QUESTION_2
Explain why the roots of \(2x^2 - 6x + 11 = 0\) must be complex conjugates of each other. Use the coefficients to justify your answer without solving the equation.

## DIAGNOSTIC_ANSWER_2
For \(2x^2 - 6x + 11 = 0\), coefficients are real (\(a=2, b=-6, c=11\)). The discriminant \(D = 36 - 88 = -52 < 0\). Since coefficients are real, complex roots occur in conjugate pairs: if \(\alpha = p+iq\) is a root, its conjugate \(\bar{\alpha} = p-iq\) is also a root. This ensures sum \(\alpha+\bar{\alpha} = 2p = -b/a = 3 \in \mathbb{R}\) and product \(\alpha\bar{\alpha} = p^2+q^2 = c/a = 11/2 \in \mathbb{R}\). A wrong answer indicates the student doesn't understand the conjugate pair theorem for polynomials with real coefficients.

## DIAGNOSTIC_QUESTION_3
Solve \(3x^2 - 4x + 5 = 0\) and express the roots in the form \(a \pm ib\). Verify that the sum and product of roots match \(-\frac{b}{a}\) and \(\frac{c}{a}\) respectively.

## DIAGNOSTIC_ANSWER_3
Given \(3x^2 - 4x + 5 = 0\): \(a=3, b=-4, c=5\). \(D = (-4)^2 - 4(3)(5) = 16 - 60 = -44\). \(\sqrt{D} = \sqrt{-44} = i\sqrt{44} = 2i\sqrt{11}\). Roots: \(x = \frac{4 \pm 2i\sqrt{11}}{6} = \frac{2}{3} \pm i\frac{\sqrt{11}}{3}\). Sum = \(\frac{4}{3} = -\frac{-4}{3} = -\frac{b}{a}\). Product = \(\left(\frac{2}{3}\right)^2 + \left(\frac{\sqrt{11}}{3}\right)^2 = \frac{4}{9} + \frac{11}{9} = \frac{15}{9} = \frac{5}{3} = \frac{c}{a}\). A wrong answer (e.g., forgetting \(i\) or miscalculating \(\sqrt{44}\)) reveals algebraic manipulation errors with radicals and imaginary units.

## DIAGNOSTIC_QUESTION_4
Compare the roots of \(x^2 - 4x + 13 = 0\) and \(x^2 - 4x - 13 = 0\). How does the sign of the constant term affect the nature of roots? Generalize for \(x^2 - 4x + c = 0\).

## DIAGNOSTIC_ANSWER_4
For \(x^2 - 4x + 13 = 0\): \(D = 16 - 52 = -36 < 0\) → complex roots \(2 \pm 3i\). For \(x^2 - 4x - 13 = 0\): \(D = 16 + 52 = 68 > 0\) → real distinct roots \(2 \pm \sqrt{17}\). For \(x^2 - 4x + c = 0\): \(D = 16 - 4c\). If \(c > 4\), \(D < 0\) (complex); if \(c = 4\), \(D = 0\) (equal real); if \(c < 4\), \(D > 0\) (distinct real). The sign of \(c\) directly controls the discriminant. A wrong answer shows inability to analyze the parameter dependence of root nature.

## DIAGNOSTIC_QUESTION_5
A student claims the roots of \(x^2 + 2x + 5 = 0\) are \(-1 \pm 2i\). Another student says they are \(1 \pm 2i\). Evaluate both claims and identify the error in the incorrect solution.

## DIAGNOSTIC_ANSWER_5
For \(x^2 + 2x + 5 = 0\): \(a=1, b=2, c=5\). \(D = 4 - 20 = -16\). \(\sqrt{D} = 4i\). Roots: \(x = \frac{-2 \pm 4i}{2} = -1 \pm 2i\). The first student is correct. The second student likely used \(+b\) instead of \(-b\) in the quadratic formula (\(x = \frac{b \pm \sqrt{D}}{2a}\)). This is a common sign error. The sum of roots should be \(-b/a = -2\); \((-1+2i)+(-1-2i) = -2\) ✓, while \((1+2i)+(1-2i) = 2\) ✗. Evaluating claims tests understanding of the formula structure.

## DIAGNOSTIC_QUESTION_6
Construct a quadratic equation with real coefficients whose roots are \(3 + 4i\) and \(3 - 4i\). Then create a different quadratic equation (with integer coefficients) having the same roots.

## DIAGNOSTIC_ANSWER_6
Sum of roots = \((3+4i)+(3-4i) = 6\). Product = \((3+4i)(3-4i) = 9 - 16i^2 = 9 + 16 = 25\). Equation: \(x^2 - 6x + 25 = 0\). For integer coefficients with same roots, multiply by any non-zero integer: \(2x^2 - 12x + 50 = 0\) or \(5x^2 - 30x + 125 = 0\). A poor answer (e.g., using only one root, or getting product wrong as \(9+16i\)) reveals failure to apply the conjugate pair property and the sum/product relationships.

## COMMON_MISCONCEPTION
Students write \(\sqrt{-16} = -4\) or \(\sqrt{-16} = 4\) instead of \(4i\), treating the negative sign as disappearing or moving outside. Example: For \(x^2 + 4x + 20 = 0\), \(D = 16 - 80 = -64\). Incorrect: \(\sqrt{-64} = -8\) → roots \(= \frac{-4 \pm (-8)}{2} = -6, 2\) (real!). Correct: \(\sqrt{-64} = 8i\) → roots \(= -2 \pm 4i\). This error stems from not internalizing \(i = \sqrt{-1}\) as a distinct algebraic entity and misapplying \(\sqrt{ab} = \sqrt{a}\sqrt{b}\) for negative numbers.

## ON_FAILURE
Step 1: Revisit the definition \(i = \sqrt{-1}\) and \(i^2 = -1\). Step 2: Practice simplifying \(\sqrt{-k}\) for \(k > 0\) as \(\sqrt{k} \cdot i\) (e.g., \(\sqrt{-18} = 3\sqrt{2}i\)). Step 3: Drill the rule: \(\sqrt{a}\sqrt{b} = \sqrt{ab}\) ONLY holds for \(a, b \geq 0\); for negatives, factor out \(i\) first. Step 4: Re-solve the quadratic with the correct \(\sqrt{D} = i\sqrt{|D|}\) and verify sum/product of roots are real.

## PREREQUISITE_NODE_IDS
c11_math_cbse_05_001, c11_math_cbse_05_002, c11_math_cbse_05_006, c10_math_cbse_04_005, c10_math_cbse_04_007, c10_math_cbse_04_010, c11_math_cbse_05_005

## PREREQUISITE_REASONS
c11_math_cbse_05_001: Establishes why complex numbers are needed (beyond real numbers) when D < 0
c11_math_cbse_05_002: Defines standard form a+ib and equality of complex numbers for expressing roots
c11_math_cbse_05_006: Powers of iota (i) are essential for simplifying √D when D < 0
c10_math_cbse_04_005: Quadratic formula derivation from completing the square
c10_math_cbse_04_007: Discriminant D = b²-4ac and its role in determining nature of roots
c10_math_cbse_04_010: Case D < 0 (no real roots) - the gateway to complex roots
c11_math_cbse_05_005: Quadratic formula with complex roots requires division by \(2a\) (complex when \(a\) complex)  

## FORWARD_NODE_IDS


## FORWARD_REASONS


## CROSS_SUBJECT_PREREQS
c11_phy_cbse_04_001, c11_phy_cbse_04_002
## CROSS_SUBJECT_REASONS
c11_physics_ch04_001: Oscillations and waves (SHM) use complex roots of characteristic equations to describe damped harmonic motion
c11_physics_ch04_002: AC circuit analysis (impedance, resonance) involves quadratic equations with complex roots in RLC circuits
c11_phy_cbse_04_001: Cross-subject support: Aristotle's fallacy is the incorrect assertion that a continuous external force is require... supplies tools/facts used directly in this node.  
c11_phy_cbse_04_002: Cross-subject support: Newton's First Law of Motion (Law of Inertia) states that a body remains in its state of r... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c10_math_cbse_04_010 -> c11_math_cbse_05_011 -> c11_math_cbse_05_012

## THIS_FORMULA
\(x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}\) with \(D = b^2 - 4ac < 0 \implies \sqrt{D} = i\sqrt{|D|}\), giving roots \(\alpha, \beta = \frac{-b}{2a} \pm i\frac{\sqrt{|D|}}{2a}\)

## FORMULA_VARIABLES
a = coefficient of x² (a ∈ ℝ, a ≠ 0), b = coefficient of x (b ∈ ℝ), c = constant term (c ∈ ℝ), D = discriminant = b² - 4ac, i = √(-1), |D| = absolute value of discriminant

## FORMULA_UNITS
dimensionless (algebraic quantities)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch04_001 | Damped harmonic oscillator equation mx'' + bx' + kx = 0 leads to characteristic equation mr² + br + k = 0; complex roots give oscillatory solutions
c11_physics_ch04_002 | RLC circuit differential equation Lq'' + Rq' + q/C = 0 yields characteristic equation Lr² + Rr + 1/C = 0; complex roots correspond to underdamped oscillations

## PREREQ_CONCEPT
Quadratic formula and discriminant analysis from Class 10 (D = b² - 4ac determines root nature) combined with complex number algebra (i = √-1, standard form a+ib)

## PREREQ_BEFORE
Student must be able to compute discriminant, state the three cases (D > 0, D = 0, D < 0), and simplify expressions like √(-18) = 3√2 i using powers of iota.

## PREREQ_STUCK
Revisit Class 10 discriminant node (c10_math_cbse_04_007) and Class 11 powers of iota node (c11_math_cbse_05_006) to solidify √(negative) simplification.

## WORKED_EXAMPLE_1
PROBLEM: A rectangular garden has area 24 m². Its length is 2 metres more than its breadth. The perimeter is given by P = 2(l + b). Form a quadratic equation for the breadth and determine if real dimensions exist. If not, find the complex roots and interpret the result.
STEPS:
- Step 1: Let breadth = x metres. Then length = (x + 2) metres. Area = x(x + 2) = 24 → x² + 2x - 24 = 0.
- Step 2: Identify coefficients: a = 1, b = 2, c = -24. Compute discriminant: D = b² - 4ac = 4 - 4(1)(-24) = 4 + 96 = 100.
- Step 3: Since D = 100 > 0, roots are real and distinct. Apply quadratic formula: x = [-2 ± √100]/2 = [-2 ± 10]/2.
- Step 4: Roots: x = 4 or x = -6. Breadth cannot be negative, so x = 4 m. Length = 6 m. Perimeter = 2(4+6) = 20 m.
- Step 5: Now modify: Suppose area = 30 m² with same length-breadth relation. Equation: x² + 2x - 30 = 0. D = 4 + 120 = 124 > 0 (still real). To get complex roots, need D < 0. Try area = 5 m²: x² + 2x - 5 = 0 → D = 4 + 20 = 24 > 0. Need c such that 4 - 4c < 0 → c > 1. Set area = -5 m² (impossible physically): x² + 2x + 5 = 0. D = 4 - 20 = -16 < 0.
- Step 6: For x² + 2x + 5 = 0: √D = √(-16) = 4i. Roots: x = [-2 ± 4i]/2 = -1 ± 2i. These are complex conjugates. Sum = -2 = -b/a, Product = (-1)² + 2² = 5 = c/a. No real garden exists with these parameters.
REASONING: This example bridges a real-world measurement problem (area, perimeter) to the mathematical necessity of complex roots when physical constraints cannot be satisfied. The discriminant sign directly tells us whether a real solution exists. When D < 0, the complex roots still obey sum/product relationships with real coefficients.
ANSWER: For area 24 m²: breadth = 4 m, length = 6 m, perimeter = 20 m. For modified equation x² + 2x + 5 = 0: complex roots -1 ± 2i (no real garden possible).

## WORKED_EXAMPLE_2
PROBLEM: The characteristic equation of a damped oscillator is 2r² + 4r + 13 = 0. Find the roots and determine if the system is underdamped, critically damped, or overdamped. Express the general solution form.
STEPS:
- Step 1: Identify coefficients from 2r² + 4r + 13 = 0: a = 2, b = 4, c = 13.
- Step 2: Compute discriminant: D = b² - 4ac = 16 - 4(2)(13) = 16 - 104 = -88.
- Step 3: Since D < 0, roots are complex conjugates. Simplify √D: √(-88) = √88 · i = √(4×22) · i = 2√22 i.
- Step 4: Apply quadratic formula: r = [-4 ± 2√22 i] / (2×2) = [-4 ± 2√22 i] / 4 = -1 ± (√22/2)i.
- Step 5: Roots are α = -1 + i(√22/2) and β = -1 - i(√22/2). Real part = -1 < 0 (decaying), imaginary part ≠ 0 (oscillatory) → underdamped.
- Step 6: General solution: x(t) = e^(-t)[A cos(√22/2 t) + B sin(√22/2 t)] where A, B are constants from initial conditions.
REASONING: In physics, the discriminant of the characteristic equation determines damping behavior: D > 0 (overdamped, two distinct real roots), D = 0 (critically damped, equal real roots), D < 0 (underdamped, complex conjugate roots). The real part gives decay rate, imaginary part gives oscillation frequency. This connects algebraic root nature to physical system behavior.
ANSWER: Roots: -1 ± i(√22/2). System is underdamped. General solution: x(t) = e^(-t)[A cos(√22/2 t) + B sin(√22/2 t)].

## WORKED_EXAMPLE_3
PROBLEM: Given that 2 + 3i is a root of the quadratic equation x² + px + q = 0 with real coefficients p, q, find p and q. Then find the other root and verify the sum and product relationships. Finally, construct a new quadratic equation whose roots are the squares of the original roots.
STEPS:
- Step 1: Since coefficients are real and 2 + 3i is a root, its conjugate 2 - 3i must be the other root (conjugate pair theorem).
- Step 2: Sum of roots = (2 + 3i) + (2 - 3i) = 4. But sum = -p/a = -p (since a=1). So -p = 4 → p = -4.
- Step 3: Product of roots = (2 + 3i)(2 - 3i) = 4 - 9i² = 4 + 9 = 13. Product = q/a = q. So q = 13.
- Step 4: Equation is x² - 4x + 13 = 0. Verify: D = 16 - 52 = -36 < 0 ✓. Roots: [4 ± √(-36)]/2 = [4 ± 6i]/2 = 2 ± 3i ✓.
- Step 5: New roots: α² = (2 + 3i)² = 4 + 12i + 9i² = 4 + 12i - 9 = -5 + 12i. β² = (2 - 3i)² = -5 - 12i.
- Step 6: Sum of new roots = (-5 + 12i) + (-5 - 12i) = -10. Product = (-5)² + 12² = 25 + 144 = 169. New equation: x² + 10x + 169 = 0.
REASONING: This multi-step problem combines conjugate pair property (from real coefficients), Vieta's formulas (sum/product), and transformation of roots. The new equation's roots are also conjugates because squaring preserves conjugation: (conj(z))² = conj(z²). The discriminant of the new equation is 100 - 676 = -576 < 0, consistent with complex roots.
ANSWER: p = -4, q = 13. Other root: 2 - 3i. New equation: x² + 10x + 169 = 0.

## COMPETENCY_QUESTION_1
QUESTION: A quadratic equation x² + bx + c = 0 has real coefficients. One root is given as -3 + 4i.
(a) Write the other root and justify your answer using a theorem about polynomials with real coefficients.
(b) Find the values of b and c.
(c) If the equation is multiplied by 5, how do the roots change? Explain.
(d) A student claims the roots of 5x² + 5bx + 5c = 0 are 5(-3 + 4i) and 5(-3 - 4i). Is this correct? Justify.
COMPETENCY: Translating real-world situations to mathematical expressions / Comparing and justifying
STEPS:
- Step 1: Apply conjugate pair theorem for real-coefficient polynomials.
- Step 2: Use Vieta's formulas (sum = -b, product = c) to find coefficients.
- Step 3: Analyze effect of multiplying equation by constant on roots.
- Step 4: Evaluate student's claim by testing if scaled roots satisfy the scaled equation.
ANSWER: (a) Other root = -3 - 4i. Justification: Complex roots of polynomials with real coefficients occur in conjugate pairs. (b) Sum = -6 = -b → b = 6. Product = (-3)² + 4² = 9 + 16 = 25 = c. Equation: x² + 6x + 25 = 0. (c) Multiplying equation by 5 gives 5x² + 30x + 125 = 0. Roots are UNCHANGED because dividing by 5 gives original equation. Roots depend on ratio of coefficients, not absolute values. (d) Student's claim is INCORRECT. If roots were scaled by 5, sum would be -30, product 625. But for 5x² + 30x + 125 = 0, sum = -30/5 = -6, product = 125/5 = 25. The roots remain -3 ± 4i.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Consider the family of quadratic equations x² - 2kx + (k² + 4) = 0 where k ∈ ℝ.
(a) Find the discriminant in terms of k. What is the nature of roots for all real k?
(b) Express the roots in terms of k. Show they are complex conjugates.
(c) Find the locus of the roots in the complex plane as k varies over ℝ.
(d) For what value of k is the real part of the roots equal to 3? What are the roots then?
(e) A student says: "Since the discriminant is constant (-16), the roots are fixed." Identify and correct this misconception.
COMPETENCY: Error identification and correction / Analyzing parameter-dependent families
STEPS:
- Step 1: Compute discriminant D(k) = (-2k)² - 4(1)(k² + 4).
- Step 2: Simplify D(k) and determine its sign for all k ∈ ℝ.
- Step 3: Write roots using quadratic formula with parameter k.
- Step 4: Identify real and imaginary parts as functions of k; eliminate k to find locus.
- Step 5: Solve for k when real part = 3; find corresponding roots.
- Step 6: Analyze student's statement about "fixed roots" vs "fixed discriminant".
ANSWER: (a) D = 4k² - 4(k² + 4) = 4k² - 4k² - 16 = -16. D < 0 for ALL k ∈ ℝ. Roots are always complex conjugates. (b) Roots: x = [2k ± √(-16)]/2 = [2k ± 4i]/2 = k ± 2i. Conjugates for all real k. (c) Roots: z = k + 2i and z = k - 2i. As k varies, real part varies over ℝ, imaginary part fixed at ±2. Locus: two horizontal lines Im(z) = 2 and Im(z) = -2 in the complex plane. (d) Real part = k = 3. Roots: 3 ± 2i. (e) Student confuses "discriminant is constant" with "roots are constant". Discriminant D = -16 is constant, but roots = k ± 2i depend on k. The imaginary part magnitude (2) is fixed by |D|, but real part varies with k.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: You need to find where the arch ______ the ground (h = 0).

## DIAGNOSTIC_ANSWER_7
touches

**A wrong answer ("leaves" or "meets") reveals the student has swapped the walkthrough's verb - the question asks where the arch touches the ground, the condition h = 0.** Touches is the walkthrough's own verb for that contact condition, and the verb is what the blank grades. Recall the discriminant 16 - 52 = -36 before filling, and give the verb exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: You need to find where the arch touches the ground (h = ______).

## DIAGNOSTIC_ANSWER_8
0

**A wrong answer (any other value) reveals the student has drifted from the walkthrough - the ground condition sets h = 0, the arch's zero height where contact would happen.** The value is the walkthrough's own constant, and the figure is what the blank holds. Recall the negative discriminant that rules out real contact before filling, and give the figure exactly.
