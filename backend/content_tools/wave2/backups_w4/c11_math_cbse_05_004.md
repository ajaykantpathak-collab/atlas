## ELI5
Two circuit impedances meet: Z₁ = 3 + 4i ohms, Z₂ = 2 - i ohms. Multiply like binomials - FOIL - then honour the one exotic rule: i² = -1. The product formula packs it: z₁z₂ = (ac - bd) + i(ad + bc). Group reals with reals, imaginaries with imaginaries, and a new complex number emerges carrying the combined impedance. Commutative, associative - ordinary algebra's manners survive the imaginary guest.

## DEFINITION
The product of two complex numbers \(z_1 = a + ib\) and \(z_2 = c + id\) is defined as \(z_1 z_2 = (ac - bd) + i(ad + bc)\), obtained by treating \(i\) as a symbol satisfying \(i^2 = -1\) and applying the distributive law of multiplication over addition.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can multiply any two complex numbers in standard form, simplify powers of \(i\) beyond \(i^2\), verify the commutative and associative properties with given numbers, and solve for unknown real/imaginary parts when a product is given.

## SCOPE_BOUNDARY
Covers algebraic multiplication of two complex numbers in standard form \(a+ib\), simplification using \(i^2=-1\), and basic properties (closure, commutativity, associativity, identity, inverse, distributivity). Does NOT cover polar form multiplication, De Moivre's theorem, or geometric interpretation (covered in later nodes).

## WALKTHROUGH
Imagine you are designing a circuit and need to multiply two impedances given as \(Z_1 = 3 + 4i\) ohms and \(Z_2 = 2 - i\) ohms. You cannot multiply them like real numbers because of the \(i\) term. Start by writing both numbers in standard form, then apply the distributive property (FOIL) exactly as you would for binomials \((a+b)(c+d)\). Replace every \(i^2\) with \(-1\) carefully. Group the real parts and imaginary parts separately. The result is a new complex number representing the combined impedance. This process mirrors binomial expansion but with the rule \(i^2 = -1\).

Takeaway: mastery means the distributive expansion being executed with i² replaced by -1 at every appearance, powers of i beyond the second simplified by the mod-4 cycle, and unknown parts solved from given products. Exam moves: multiply-in-standard-form questions and solve-for-parts items, plus commutativity checks with concrete numbers. Check yourself: forgetting one i² substitution is the classic silent error - audit every square. Students miss it because binomial habit stops at FOIL, when the definition's rule statement is the finish line: collect, substitute, regroup.

One habit finishes the topic: before expanding, ask which part of f(k+1) is exactly f(k) - find it, name it, and the hypothesis carries the rest.

## DIAGNOSTIC_QUESTION_1
State the product of \(z_1 = 2 + 3i\) and \(z_2 = 1 - 4i\) in the form \(a + ib\).

## DIAGNOSTIC_ANSWER_1
Correct answer: \(14 - 5i\). A wrong answer like \(2 - 12i\) reveals the student forgot to replace \(i^2\) with \(-1\) (they computed \(3i \times -4i = -12i\) instead of \(-12i^2 = 12\)). An answer of \(14 + 5i\) shows a sign error when combining the imaginary parts \((-8i + 3i = -5i)\).

## DIAGNOSTIC_QUESTION_2
If \(z = x + iy\) satisfies \(z \cdot (2 - 3i) = 5 + 12i\), explain why we cannot simply "divide both sides by \(2-3i\)" at this stage, and write the two linear equations in \(x\) and \(y\) obtained by expanding the product.

## DIAGNOSTIC_ANSWER_2
Correct explanation: Division of complex numbers is not yet defined; we only know multiplication. Expanding gives \((2x+3y) + i(2y-3x) = 5+12i\), yielding \(2x+3y=5\) and \(2y-3x=12\). A student who attempts "division" reveals they are importing real-number algebra rules without recognizing that complex division requires the conjugate (next node). A student who writes only one equation misses the equality of imaginary parts.

## DIAGNOSTIC_QUESTION_3
Multiply \((1 + i)(2 + i)(3 + i)\) and express the result in standard form.

## DIAGNOSTIC_ANSWER_3
Correct answer: \(10i\). Steps: First multiply \((1+i)(2+i) = 2 + i + 2i + i^2 = 2 + 3i -1 = 1+3i\). Then multiply \((1+3i)(3+i) = 3 + i + 9i + 3i^2 = 3 + 10i -3 = 10i\). A wrong answer like \(6 + 11i\) (from \((1+i)(2+i)=1+3i\) then \(1+3i)(3+i)\) miscalculated as \(3+10i-3\) but forgetting \(i^2=-1\) in first step) shows inconsistent application of \(i^2=-1\). An answer of \(10\) reveals the student treated \(i\) as a variable and ignored \(i^2=-1\) entirely.

## DIAGNOSTIC_QUESTION_4
Compare the products \(z_1 z_2\) and \(z_2 z_1\) for \(z_1 = a+ib\) and \(z_2 = c+id\). Using the multiplication formula, prove that multiplication of complex numbers is commutative.

## DIAGNOSTIC_ANSWER_4
Correct proof: \(z_1 z_2 = (ac-bd) + i(ad+bc)\). \(z_2 z_1 = (ca-db) + i(cb+da) = (ac-bd) + i(ad+bc)\) because real multiplication is commutative. Hence \(z_1 z_2 = z_2 z_1\). A student who only verifies with numeric examples (e.g., \(z_1=1+i, z_2=2-i\)) shows they understand the property but not the general proof. A student who claims "it's obvious because multiplication is commutative" misses that the formula must be checked since \(i\) is not a real number.

## DIAGNOSTIC_QUESTION_5
A student computes \((3 + 2i)^2\) as \(9 + 4i^2 = 5\). Identify the error and give the correct product.

## DIAGNOSTIC_ANSWER_5
Error: The student used \((a+b)^2 = a^2 + b^2\) instead of \((a+b)^2 = a^2 + 2ab + b^2\). Correct expansion: \((3+2i)^2 = 9 + 2(3)(2i) + 4i^2 = 9 + 12i - 4 = 5 + 12i\). This misconception is extremely common: students forget the middle term \(2ab\) when squaring binomials involving \(i\), treating \(i\) as if it cancels the cross term.

## DIAGNOSTIC_QUESTION_6
Create a word problem involving a real-life situation (e.g., electrical circuits, signal processing) where two quantities are represented as complex numbers and must be multiplied. Define the numbers, state the question, and solve it.

## DIAGNOSTIC_ANSWER_6
Example: "In an AC circuit, impedance \(Z_1 = 4 + 3j\) ohms and \(Z_2 = 2 - j\) ohms are connected in series. Find the total impedance." (Note: series adds, parallel multiplies reciprocals; better: "A signal passes through two filters with transfer functions \(H_1 = 1+2i\) and \(H_2 = 3-i\). Find the overall transfer function.") Solution: \((1+2i)(3-i) = 3 - i + 6i - 2i^2 = 5 + 5i\). A poor answer uses addition instead of multiplication, or gives non-complex quantities, showing the student cannot map the physical situation to the mathematical operation.

## COMMON_MISCONCEPTION
Students treat \(i\) as a variable and apply \((a+ib)(c+id) = ac + i^2 bd = ac - bd\), completely omitting the cross terms \(i(ad+bc)\). This happens because they pattern-match to \((a+b)(c+d)\) but incorrectly assume the imaginary unit \(i\) "distributes" differently, or they forget the FOIL middle terms. Another frequent error: writing \(i^2 = 1\) instead of \(-1\), giving \((2+3i)(1-4i) = 2 -8i +3i -12 = -10 -5i\) (sign error on \(i^2\)).

## ON_FAILURE
If a student omits cross terms, have them first multiply two binomials with a placeholder \(x\) instead of \(i\): \((a+bx)(c+dx) = ac + (ad+bc)x + bd x^2\). Then substitute \(x=i\) and \(x^2=-1\). If they use \(i^2=1\), ask them to compute \(i^2\) from the definition \(i = \sqrt{-1}\) and verify \((-1) \times (-1) \neq 1\). Drill 5 problems where they must write the FOIL step explicitly: First, Outer, Inner, Last, then simplify.

## PREREQUISITE_NODE_IDS
c11_math_cbse_05_002, c11_math_cbse_05_003, c9_math_ch4_1, c8_math_ch6_7, c10_math_cbse_04_003, c11_math_cbse_05_001

## PREREQUISITE_REASONS
c11_math_cbse_05_002: Requires understanding standard form \(a+ib\) and equality of complex numbers.
c11_math_cbse_05_003: Builds on addition/subtraction algebra; multiplication is the next algebraic operation.
c9_math_ch4_1: Algebraic identities \((a+b)^2, (a-b)^2\) are essential for squaring complex numbers.
c8_math_ch6_7: Distributive property \((a+b)(c+d)\) is the mechanical basis for FOIL multiplication.
c10_math_cbse_04_003: Factorisation/splitting middle term reinforces binomial expansion skills.
c11_math_cbse_05_001: Review binomial expansion from Class 8 (c8_math_ch6_7) and the definition of \(i\) from c11_math_cbse_05_001.  

## FORWARD_NODE_IDS
c11_math_cbse_05_005, c11_math_cbse_05_006, c11_math_cbse_05_007, c11_math_cbse_05_008, c11_math_cbse_05_012

## FORWARD_REASONS
c11_math_cbse_05_005: Division requires multiplication by conjugate, which uses multiplication rules.
c11_math_cbse_05_006: Powers of \(i\) rely on repeated multiplication and \(i^2=-1\).
c11_math_cbse_05_007: Modulus and conjugate properties use multiplication (e.g., \(z \bar{z} = |z|^2\)).
c11_math_cbse_05_008: Argand plane geometric interpretation of multiplication (rotation/scaling) builds on algebraic product.
c11_math_cbse_05_012: Multiplication algebra needed to understand rotation-scaling geometry.  

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_07_001, c11_phy_cbse_07_002
## CROSS_SUBJECT_REASONS
c11_physics_ch7_001: AC circuit analysis uses complex impedance; multiplication combines series/parallel impedances.
c11_physics_ch7_002: Phasor representation of voltage/current uses complex numbers; multiplication corresponds to phase addition and amplitude scaling.
c11_phy_cbse_07_001: Cross-subject support: Kepler's laws of planetary motion are three empirical principles describing the motion of... supplies tools/facts used directly in this node.  
c11_phy_cbse_07_002: Cross-subject support: Newton's Law of Universal Gravitation states that every particle in the universe attracts... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_math_cbse_05_002 -> c11_math_cbse_05_003 -> c11_math_cbse_05_004 -> c11_math_cbse_05_005 -> c11_math_cbse_05_007

## THIS_FORMULA
\(z_1 z_2 = (a+ib)(c+id) = (ac - bd) + i(ad + bc)\)

## FORMULA_VARIABLES
\(a, b, c, d \in \mathbb{R}\); \(z_1 = a+ib\), \(z_2 = c+id\); \(i = \sqrt{-1}\), \(i^2 = -1\)

## FORMULA_UNITS
dimensionless (complex numbers are abstract; physical applications like impedance use ohms, but the multiplication rule itself is unitless)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch7_001 | AC circuit impedance multiplication: \(Z_{total} = Z_1 Z_2\) for certain configurations, requiring complex multiplication.
c11_physics_ch7_002 | Phasor multiplication: Multiplying voltage phasor by complex admittance gives current phasor; uses same algebraic rule.

## PREREQ_CONCEPT
Binomial expansion (FOIL method) and the definition \(i^2 = -1\).

## PREREQ_BEFORE
Student must be able to expand \((a+b)(c+d)\) fluently and simplify expressions by substituting \(i^2 = -1\).

## PREREQ_STUCK
Review binomial expansion from Class 8 (c8_math_ch6_7) and the definition of \(i\) from c11_math_cbse_05_001.

## WORKED_EXAMPLE_1
PROBLEM: In an AC circuit, the impedance of a resistor-inductor branch is \(Z_1 = 3 + 4j\) ohms and a capacitor branch is \(Z_2 = 2 - 3j\) ohms. Find the product \(Z_1 Z_2\) which represents a combined impedance in a specific filter configuration. Express in standard form \(a + jb\).

STEPS:
- Step 1: Identify the two complex numbers: \(Z_1 = 3 + 4j\), \(Z_2 = 2 - 3j\). (Note: engineering uses \(j\) for \(\sqrt{-1}\); mathematically identical to \(i\).)
- Step 2: Write the multiplication using FOIL: \((3 + 4j)(2 - 3j) = 3(2) + 3(-3j) + 4j(2) + 4j(-3j)\).
- Step 3: Compute each term: \(6 - 9j + 8j - 12j^2\).
- Step 4: Replace \(j^2\) with \(-1\): \(6 - 9j + 8j - 12(-1) = 6 - j + 12\).
- Step 5: Combine real and imaginary parts: \(18 - j\). The product is \(18 - j\) ohms² (units are ohms squared for this product).

REASONING: The FOIL method ensures all cross terms are captured. The critical step is substituting \(j^2 = -1\) which converts the last term from imaginary to real, changing the sign. This is the only difference from multiplying real binomials.

ANSWER: \(18 - j\) (or \(18 - i\) in mathematical notation)

## WORKED_EXAMPLE_2
PROBLEM: If \(z = x + iy\) and \(z^2 = 7 + 24i\), find the real values of \(x\) and \(y\).

STEPS:
- Step 1: Expand \(z^2 = (x+iy)^2 = x^2 + 2ixy + i^2 y^2 = (x^2 - y^2) + i(2xy)\).
- Step 2: Equate real and imaginary parts to the given \(7 + 24i\): \(x^2 - y^2 = 7\) and \(2xy = 24\).
- Step 3: From \(2xy = 24\), get \(xy = 12\) so \(y = 12/x\). Substitute into first equation: \(x^2 - 144/x^2 = 7\).
- Step 4: Multiply by \(x^2\): \(x^4 - 144 = 7x^2 \Rightarrow x^4 - 7x^2 - 144 = 0\). Let \(u = x^2\): \(u^2 - 7u - 144 = 0\).
- Step 5: Solve quadratic: \(u = \frac{7 \pm \sqrt{49 + 576}}{2} = \frac{7 \pm 25}{2}\). \(u = 16\) or \(u = -9\). Since \(x\) is real, \(x^2 = 16 \Rightarrow x = \pm 4\).
- Step 6: Find corresponding \(y\): if \(x=4\), \(y=3\); if \(x=-4\), \(y=-3\). Both pairs satisfy \(xy=12\). The square roots of \(7+24i\) are \(4+3i\) and \(-4-3i\).

REASONING: Squaring a complex number uses the binomial identity \((a+b)^2\). Equating real and imaginary parts gives a system of equations. The substitution reduces it to a quadratic in \(x^2\). We discard negative \(x^2\) because \(x\) is real.

ANSWER: \(x = 4, y = 3\) or \(x = -4, y = -3\)

## WORKED_EXAMPLE_3
PROBLEM: Verify the distributive property \(z_1(z_2 + z_3) = z_1 z_2 + z_1 z_3\) for \(z_1 = 1+2i\), \(z_2 = 3-i\), \(z_3 = -2+4i\).

STEPS:
- Step 1: Compute LHS: First find \(z_2 + z_3 = (3-i) + (-2+4i) = 1 + 3i\). Then multiply by \(z_1\): \((1+2i)(1+3i) = 1 + 3i + 2i + 6i^2 = 1 + 5i - 6 = -5 + 5i\).
- Step 2: Compute RHS: Find \(z_1 z_2 = (1+2i)(3-i) = 3 - i + 6i - 2i^2 = 3 + 5i + 2 = 5 + 5i\). Find \(z_1 z_3 = (1+2i)(-2+4i) = -2 + 4i - 4i + 8i^2 = -2 - 8 = -10\).
- Step 3: Add the products: \((5+5i) + (-10) = -5 + 5i\).
- Step 4: Compare LHS and RHS: Both equal \(-5 + 5i\). Distributive property holds.
- Step 5: (Optional) General proof: Let \(z_1=a+ib, z_2=c+id, z_3=e+if\). Expand both sides using the multiplication formula and show they are identical using real number distributivity.

REASONING: This example demonstrates that complex multiplication distributes over addition, a fundamental property used in simplifying expressions. The verification with specific numbers builds intuition before the general proof.

ANSWER: LHS = RHS = \(-5 + 5i\), property verified.

## COMPETENCY_QUESTION_1
QUESTION: The product of a complex number \(z\) and its conjugate \(\bar{z}\) is always a real number. Let \(z = a + ib\). (a) Write \(\bar{z}\). (b) Compute \(z \bar{z}\) and show it is real. (c) If \(z \bar{z} = 25\) and \(a = 3\), find the possible values of \(b\). (d) Explain why \(z \bar{z} \ge 0\) for all complex \(z\).

COMPETENCY: Translating real-world situations to mathematical expressions (here, the geometric meaning of modulus squared)

STEPS:
- Step 1: Recall conjugate definition: \(\bar{z} = a - ib\).
- Step 2: Multiply: \((a+ib)(a-ib) = a^2 - i^2 b^2 = a^2 + b^2\). No imaginary part.
- Step 3: Given \(a^2 + b^2 = 25\) and \(a=3\), so \(9 + b^2 = 25 \Rightarrow b^2 = 16 \Rightarrow b = \pm 4\).
- Step 4: Since \(a^2 \ge 0\) and \(b^2 \ge 0\), their sum is \(\ge 0\). It is zero only if \(a=b=0\).

ANSWER: (a) \(\bar{z} = a - ib\) (b) \(z\bar{z} = a^2 + b^2 \in \mathbb{R}\) (c) \(b = 4\) or \(b = -4\) (d) Sum of squares of real numbers is non-negative.

DIFFICULTY: easy

## COMPETENCY_QUESTION_2
QUESTION: A student claims that for any two complex numbers \(z_1, z_2\), the identity \(|z_1 z_2| = |z_1| |z_2|\) holds, where \(|a+ib| = \sqrt{a^2+b^2}\). Verify this identity for \(z_1 = 2+3i\) and \(z_2 = 1-2i\) by computing both sides. Then, using the multiplication formula, prove the identity for general \(z_1 = a+ib, z_2 = c+id\).

COMPETENCY: Comparing and justifying (algebraic proof of a fundamental property)

STEPS:
- Step 1: Compute \(z_1 z_2 = (2+3i)(1-2i) = 2 -4i +3i -6i^2 = 8 - i\). \(|z_1 z_2| = \sqrt{8^2 + (-1)^2} = \sqrt{65}\).
- Step 2: Compute \(|z_1| = \sqrt{2^2+3^2} = \sqrt{13}\), \(|z_2| = \sqrt{1^2+(-2)^2} = \sqrt{5}\). Product: \(\sqrt{13}\sqrt{5} = \sqrt{65}\). Both sides match.
- Step 3: General proof: \(z_1 z_2 = (ac-bd) + i(ad+bc)\). \(|z_1 z_2|^2 = (ac-bd)^2 + (ad+bc)^2 = a^2c^2 - 2abcd + b^2d^2 + a^2d^2 + 2abcd + b^2c^2 = a^2c^2 + b^2d^2 + a^2d^2 + b^2c^2 = (a^2+b^2)(c^2+d^2) = |z_1|^2 |z_2|^2\). Take square root (non-negative) to get \(|z_1 z_2| = |z_1| |z_2|\).

ANSWER: Verified numerically: both sides \(\sqrt{65}\). Proven algebraically by expanding \(|z_1 z_2|^2\) and factoring.

DIFFICULTY: medium

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The result is a new complex number representing the combined ______.

## DIAGNOSTIC_ANSWER_7
impedance

**A wrong answer ("current" or "voltage") reveals the student has swapped the walkthrough's quantity - the product represents the combined impedance of the two circuit elements.** Impedance is the walkthrough's own noun for what the multiplication yields. Recall the 3 + 4i and 2 - i ohms before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: The result is a new complex number ______ the combined impedance.

## DIAGNOSTIC_ANSWER_8
representing

**A wrong answer ("giving" or "showing") reveals the student has paraphrased the walkthrough's participle - the new complex number represents the combined impedance of the paired circuit elements.** Representing is the walkthrough's own participle, and the participle is what the blank grades rather than a synonym. Recall the FOIL-and-substitute routine before filling, and fill the word exactly as written.
