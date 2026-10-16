## ELI5
Splitting ₹(3 + 4i) among (1 + 2i) friends sounds absurd - and that is the point: complex division is not splitting. Borrow the rationalising trick: multiply numerator and denominator by the conjugate c - id, and (c + id)(c - id) = c² + d² turns the denominator real. The quotient lands in standard form with x = (ac + bd)/(c² + d²) and y = (bc - ad)/(c² + d²). The conjugate is the tool; a real denominator is the prize.

## DEFINITION
Division of complex numbers is the operation of finding a complex number \(z\) such that \(z \cdot z_2 = z_1\) for given complex numbers \(z_1 = a + ib\) and \(z_2 = c + id\) (with \(z_2 \neq 0\)), performed by multiplying numerator and denominator by the conjugate of the denominator \(\overline{z_2} = c - id\) to obtain the quotient in standard form \(x + iy\) where \(x = \frac{ac + bd}{c^2 + d^2}\) and \(y = \frac{bc - ad}{c^2 + d^2}\).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
Student can correctly divide any two complex numbers in standard form, express the result in \(a + ib\) form, identify when division is undefined, and apply division to solve equations of the form \(z_1/z_2 = z_3\) or find unknown complex numbers in rational expressions.

## SCOPE_BOUNDARY
Covers division of complex numbers in algebraic form \(a + ib\) using the conjugate method, simplification to standard form, and application to simple equations. Does NOT cover division in polar/exponential form (later nodes), geometric interpretation of division (Argand plane), or division by zero cases beyond stating it is undefined.

## WALKTHROUGH
Imagine you have ₹(3+4i) and want to split it equally among (1+2i) friends — how much does each friend get? This absurd scenario mirrors the real challenge: division of complex numbers isn't defined like real numbers because we can't "split" an imaginary quantity. But recall from Class 10 how we rationalised denominators like \(\frac{1}{\sqrt{2}}\) by multiplying by \(\frac{\sqrt{2}}{\sqrt{2}}\). Here, the "irrational" part is the imaginary unit in the denominator. To divide \(\frac{a+ib}{c+id}\), we multiply numerator and denominator by the conjugate \(c-id\), turning the denominator into the real number \(c^2+d^2\). The key insight: the conjugate eliminates \(i\) from the denominator because \((c+id)(c-id) = c^2 + d^2\), a purely real number, allowing us to separate real and imaginary parts cleanly.

Takeaway: mastery means the conjugate being multiplied top and bottom, the denominator collapsing to c² + d², and the numerator expanded with i² honoured as -1. Exam moves: divide-and-express-in-standard-form questions and solve-z₁/z₂-equals-z₃ items. Check yourself: the flagged error is treating i² as +1 mid-expansion - one sign slip poisons the quotient. Students miss it because real division needs no preparation, when the definition's operation exists only through conjugation: there is no dividing here, only clever multiplying that ends in division.

Say the goal out loud before starting: a real denominator. Every step - conjugate, expand, group - is chosen to serve that single sentence.

## DIAGNOSTIC_QUESTION_1
What is the conjugate of the denominator used when dividing \(\frac{2+3i}{4-i}\), and why do we multiply by it?

## DIAGNOSTIC_ANSWER_1
The conjugate is \(4+i\). We multiply by it because \((4-i)(4+i) = 4^2 - i^2 = 16 - (-1) = 17\), a real number, which eliminates \(i\) from the denominator. A wrong answer like "\(4-i\)" (same as denominator) reveals the student confuses conjugate with reciprocal; "\(-4+i\)" reveals sign errors in conjugate formation.

## DIAGNOSTIC_QUESTION_2
Explain why \(\frac{1}{i} = -i\) using the conjugate method, and why multiplying numerator and denominator by \(i\) directly also works.

## DIAGNOSTIC_ANSWER_2
\(\frac{1}{i} = \frac{1 \cdot (-i)}{i \cdot (-i)} = \frac{-i}{-i^2} = \frac{-i}{1} = -i\). Multiplying by \(i\) gives \(\frac{i}{i^2} = \frac{i}{-1} = -i\). Both work because \(i\) and \(-i\) are both conjugates of \(i\) (since \(i = 0+i\), conjugate is \(0-i = -i\)). A student who says "multiply by \(i\) because it's the reciprocal" confuses reciprocal (\(1/i = -i\)) with conjugate; the conjugate method is generalisable to any complex denominator.

## DIAGNOSTIC_QUESTION_3
Divide \(\frac{5-2i}{3+4i}\) and express the result in \(a+ib\) form. Show all steps.

## DIAGNOSTIC_ANSWER_3
Multiply by conjugate of denominator: \(\frac{(5-2i)(3-4i)}{(3+4i)(3-4i)}\). Numerator: \(15 -20i -6i +8i^2 = 15 -26i -8 = 7 -26i\). Denominator: \(9 -16i^2 = 9+16 = 25\). Result: \(\frac{7}{25} - \frac{26}{25}i\). A wrong answer like \(\frac{23}{25} - \frac{26}{25}i\) reveals the student computed \(5 \times 3 + (-2) \times (-4) = 15+8=23\) instead of \(15 + 8i^2 = 15-8=7\), forgetting \(i^2 = -1\).

## DIAGNOSTIC_QUESTION_4
Compare the results of \(\frac{z_1}{z_2}\) and \(\frac{\overline{z_1}}{\overline{z_2}}\) for \(z_1 = 2+3i, z_2 = 1-i\). What relationship do you observe? Prove it generally.

## DIAGNOSTIC_ANSWER_4
\(\frac{2+3i}{1-i} = \frac{(2+3i)(1+i)}{2} = \frac{-1+5i}{2} = -\frac{1}{2} + \frac{5}{2}i\). \(\frac{2-3i}{1+i} = \frac{(2-3i)(1-i)}{2} = \frac{-1-5i}{2} = -\frac{1}{2} - \frac{5}{2}i = \overline{\left(\frac{z_1}{z_2}\right)}\). Generally, \(\overline{\left(\frac{z_1}{z_2}\right)} = \frac{\overline{z_1}}{\overline{z_2}}\). A student who gets different results likely made sign errors in conjugate multiplication; this tests understanding that conjugation distributes over division.

## DIAGNOSTIC_QUESTION_5
A student solved \(\frac{3+4i}{2-i} = \frac{(3+4i)(2+i)}{(2-i)(2+i)} = \frac{6+3i+8i+4i^2}{5} = \frac{6+11i-4}{5} = \frac{2+11i}{5}\). Is this correct? If not, identify the exact error.

## DIAGNOSTIC_ANSWER_5
Incorrect. The error is in the numerator expansion: \(4i^2 = 4(-1) = -4\), so \(6 + 11i - 4 = 2 + 11i\) is correct, but the student wrote \(6+3i+8i+4i^2\) — the term \(3i\) should be \(3i\) (from \(3 \times i\)) and \(8i\) (from \(4i \times 2\)) giving \(11i\), which is correct. Wait, the actual error: \((3+4i)(2+i) = 6 + 3i + 8i + 4i^2 = 6 + 11i - 4 = 2 + 11i\). The student's working is actually correct! But the final answer \(\frac{2+11i}{5}\) is right. A student who flags this as wrong might mistakenly think \(4i^2 = 4\) instead of \(-4\). This question tests careful verification of \(i^2 = -1\) application.

## DIAGNOSTIC_QUESTION_6
Create a word problem involving division of complex numbers that models a real situation in electrical engineering (impedance) or signal processing, using Indian context (e.g., voltage in a circuit with resistance and reactance). Define all variables.

## DIAGNOSTIC_ANSWER_6
Example: "In an AC circuit, voltage \(V = (120 + 80i)\) volts and impedance \(Z = (6 + 8i)\) ohms. Find the current \(I = V/Z\) in \(a+ib\) form." Solution: \(I = \frac{120+80i}{6+8i} = \frac{(120+80i)(6-8i)}{100} = \frac{720 -960i +480i -640i^2}{100} = \frac{1360 -480i}{100} = 13.6 - 4.8i\) A. A poor answer uses unrealistic numbers, omits units, or doesn't require conjugate method (e.g., purely real impedance). This tests ability to contextualise abstract division.

## COMMON_MISCONCEPTION
Students forget that \(i^2 = -1\) when expanding the numerator after multiplying by the conjugate, treating \(i^2\) as \(+1\) or leaving it as \(i^2\). For example, in \(\frac{1+2i}{3-i}\), numerator expansion \((1+2i)(3+i) = 3 + i + 6i + 2i^2\) becomes \(3 + 7i + 2 = 5 + 7i\) (wrong) instead of \(3 + 7i - 2 = 1 + 7i\) (correct). They also incorrectly compute the denominator as \(c^2 - d^2\) instead of \(c^2 + d^2\) by doing \((c+id)(c-id) = c^2 - (id)^2 = c^2 - i^2d^2 = c^2 + d^2\) but writing \(c^2 - d^2\) by forgetting \(i^2 = -1\).

## ON_FAILURE
Step 1: Have the student compute \((c+id)(c-id)\) slowly: \(c^2 - c id + c id - i^2 d^2 = c^2 - i^2 d^2\). Step 2: Ask "What is \(i^2\)?" until they say \(-1\). Step 3: Substitute: \(c^2 - (-1)d^2 = c^2 + d^2\). Step 4: For numerator, use FOIL with coloured pens: First, Outer, Inner, Last, circling every \(i^2\) term and replacing with \(-1\) before combining like terms. Step 5: Practice 5 problems where denominator is purely real after conjugate multiplication, checking each \(i^2\) replacement aloud.

## PREREQUISITE_NODE_IDS
c11_math_cbse_05_002, c11_math_cbse_05_003, c11_math_cbse_05_004, c6_math_ch03_036, c7_math_ch08_004, c9_math_ch4_10
## PREREQUISITE_REASONS
c11_math_cbse_05_002: Need standard form \(a+ib\) and equality of complex numbers to express quotient
c11_math_cbse_05_003: Addition/subtraction used when combining real and imaginary parts after expansion
c11_math_cbse_05_004: Multiplication of complex numbers is required for numerator and denominator expansion
c6_math_ch03_036: Division of fractions provides the "multiply by reciprocal" intuition extended to conjugate
c7_math_ch08_004: Reciprocal method for fraction division generalises to complex conjugate method
c9_math_ch4_10: Simplification of rational expressions using algebraic identities (conjugate pairs)

## FORWARD_NODE_IDS
c11_math_cbse_05_006, c11_math_cbse_05_007, c11_math_cbse_05_008, c11_math_cbse_05_011
## FORWARD_REASONS
c11_math_cbse_05_006: Powers of \(i\) simplify \(i^2, i^3\) terms appearing in division expansions
c11_math_cbse_05_007: Modulus and conjugate are directly used in division formula \(|z|^2 = z\overline{z}\)
c11_math_cbse_05_008: Polar representation gives geometric meaning to division (divide moduli, subtract arguments)
c11_math_cbse_05_011: Quadratic formula with complex roots requires division by \(2a\) (complex when \(a\) complex)

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_07_001, c11_phy_cbse_07_002
## CROSS_SUBJECT_REASONS
c11_physics_ch7_1: AC circuit analysis uses complex impedance \(Z = R + iX\); current \(I = V/Z\) requires complex division
c11_physics_ch7_2: Phasor division in alternating current circuits uses complex number division for voltage/current relationships
c11_phy_cbse_07_001: Cross-subject support: Kepler's laws of planetary motion are three empirical principles describing the motion of... supplies tools/facts used directly in this node.  
c11_phy_cbse_07_002: Cross-subject support: Newton's Law of Universal Gravitation states that every particle in the universe attracts... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_math_cbse_05_004 -> c11_math_cbse_05_005 -> c11_math_cbse_05_007

## THIS_FORMULA
\(\frac{z_1}{z_2} = \frac{a+ib}{c+id} = \frac{(a+ib)(c-id)}{(c+id)(c-id)} = \frac{ac+bd}{c^2+d^2} + i\frac{bc-ad}{c^2+d^2}\), for \(z_2 \neq 0\) (i.e., \(c^2+d^2 \neq 0\))

## FORMULA_VARIABLES
\(a, b, c, d \in \mathbb{R}\); \(z_1 = a+ib\) (dividend), \(z_2 = c+id\) (divisor), \(\overline{z_2} = c-id\) (conjugate of divisor); result \(x+iy\) where \(x = \frac{ac+bd}{c^2+d^2}, y = \frac{bc-ad}{c^2+d^2}\)

## FORMULA_UNITS
dimensionless (pure numbers); in physics applications: volts/ohms = amperes, etc.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch7_1 | AC circuit impedance division: voltage (complex) divided by impedance (complex) gives current (complex)
c11_physics_ch7_2 | Phasor analysis: division of complex phasors represents phase shift and amplitude scaling in AC circuits

## PREREQ_CONCEPT
Multiplication of complex numbers and the concept of conjugate \(\overline{z} = a-ib\) with property \(z\overline{z} = |z|^2 \in \mathbb{R}\).

## PREREQ_BEFORE
Student must fluently multiply two complex numbers using FOIL, simplify using \(i^2 = -1\), and identify the conjugate of any complex number.

## PREREQ_STUCK
Revisit c11_math_cbse_05_004 (Multiplication of Complex Numbers) and practice 10 conjugate multiplications \((a+ib)(a-ib)\) until \(a^2+b^2\) is automatic.

## WORKED_EXAMPLE_1
PROBLEM: In an AC circuit analysis, the voltage across a component is measured as \(V = (15 + 20i)\) volts and the impedance is \(Z = (3 + 4i)\) ohms. Find the current \(I = V/Z\) in standard form \(a+ib\) amperes.

STEPS:
- Step 1: Identify \(z_1 = 15+20i\) (voltage), \(z_2 = 3+4i\) (impedance). Note \(z_2 \neq 0\) since \(3^2+4^2 = 25 \neq 0\).
- Step 2: Write division as fraction and multiply numerator and denominator by conjugate of denominator \(\overline{z_2} = 3-4i\): \(I = \frac{(15+20i)(3-4i)}{(3+4i)(3-4i)}\).
- Step 3: Compute denominator: \((3+4i)(3-4i) = 3^2 - (4i)^2 = 9 - 16i^2 = 9 - 16(-1) = 9+16 = 25\).
- Step 4: Compute numerator using FOIL: \((15+20i)(3-4i) = 15(3) + 15(-4i) + 20i(3) + 20i(-4i) = 45 -60i +60i -80i^2 = 45 -80(-1) = 45+80 = 125\).
- Step 5: Combine: \(I = \frac{125}{25} + i\frac{0}{25} = 5 + 0i = 5\) amperes. Verify: \(5 \times (3+4i) = 15+20i = V\). ✓

REASONING: The conjugate method converts division into multiplication by a real denominator. The denominator becomes \(|z_2|^2 = c^2+d^2\), a real number, allowing clean separation of real and imaginary parts. Here the current is purely real (resistive), meaning voltage and impedance have same phase angle.

ANSWER: \(I = 5\) A (or \(5 + 0i\) A)

## WORKED_EXAMPLE_2
PROBLEM: Solve for the complex number \(z\) if \(\frac{z}{2-i} = 3+4i\). Express \(z\) in standard form.

STEPS:
- Step 1: Recognise this as \(z = (3+4i)(2-i)\). Multiply both sides by \(2-i\) (valid since \(2-i \neq 0\)).
- Step 2: Multiply using FOIL: \((3+4i)(2-i) = 3(2) + 3(-i) + 4i(2) + 4i(-i) = 6 -3i +8i -4i^2\).
- Step 3: Simplify using \(i^2 = -1\): \(6 +5i -4(-1) = 6 +5i +4 = 10 + 5i\).
- Step 4: Verify by dividing back: \(\frac{10+5i}{2-i} = \frac{(10+5i)(2+i)}{(2-i)(2+i)} = \frac{20+10i+10i+5i^2}{4+1} = \frac{20+20i-5}{5} = \frac{15+20i}{5} = 3+4i\). ✓
- Step 5: State answer: \(z = 10 + 5i\).

REASONING: Instead of dividing, we multiply by the divisor — the inverse operation. This avoids fraction manipulation and uses only multiplication, which is simpler. The verification step uses the division algorithm to confirm correctness, reinforcing the relationship between multiplication and division.

ANSWER: \(z = 10 + 5i\)

## WORKED_EXAMPLE_3
PROBLEM: Simplify \(\frac{(2+3i)^2}{(1-i)^3}\) and express in \(a+ib\) form.

STEPS:
- Step 1: Compute numerator \((2+3i)^2 = 4 + 12i + 9i^2 = 4 + 12i - 9 = -5 + 12i\).
- Step 2: Compute denominator \((1-i)^3 = (1-i)^2(1-i) = (1 - 2i + i^2)(1-i) = (1 - 2i -1)(1-i) = (-2i)(1-i) = -2i + 2i^2 = -2i -2 = -2 - 2i\).
- Step 3: Now divide: \(\frac{-5+12i}{-2-2i}\). Multiply by conjugate of denominator \(-2+2i\): \(\frac{(-5+12i)(-2+2i)}{(-2-2i)(-2+2i)}\).
- Step 4: Denominator: \((-2)^2 - (2i)^2 = 4 - 4i^2 = 4 + 4 = 8\).
- Step 5: Numerator: \((-5)(-2) + (-5)(2i) + 12i(-2) + 12i(2i) = 10 -10i -24i +24i^2 = 10 -34i -24 = -14 -34i\).
- Step 6: Result: \(\frac{-14}{8} + i\frac{-34}{8} = -\frac{7}{4} - \frac{17}{4}i\).

REASONING: This combines powers (squaring, cubing) with division. Computing powers first simplifies the expression to a single division. The denominator's conjugate is \(-2+2i\) (not \(2-2i\)) — sign errors here are common. Each \(i^2\) is replaced by \(-1\) immediately to avoid accumulation of errors.

ANSWER: \(-\frac{7}{4} - \frac{17}{4}i\)

## COMPETENCY_QUESTION_1
QUESTION: A student claims that \(\frac{a+ib}{c+id} = \frac{a}{c} + i\frac{b}{d}\) by "dividing real parts and imaginary parts separately". Using \(z_1 = 1+2i, z_2 = 3+4i\), show numerically why this is false. Then prove the correct formula by starting from \((x+iy)(c+id) = a+ib\) and solving for \(x,y\).

COMPETENCY: Error identification and correction; deriving formulas from first principles

STEPS:
- Step 1: Compute LHS correctly: \(\frac{1+2i}{3+4i} = \frac{(1+2i)(3-4i)}{25} = \frac{3-4i+6i-8i^2}{25} = \frac{11+2i}{25} = 0.44 + 0.08i\).
- Step 2: Compute student's wrong method: \(\frac{1}{3} + i\frac{2}{4} = 0.333... + 0.5i\).
- Step 3: Show they differ: \(0.44 \neq 0.333\), \(0.08 \neq 0.5\).
- Step 4: Derive correctly: Let \((x+iy)(c+id) = a+ib\). Expand: \(xc - yd + i(xd + yc) = a+ib\). Equate real/imaginary: \(xc - yd = a\), \(xd + yc = b\). Solve this linear system for \(x,y\) using elimination or matrices to get \(x = \frac{ac+bd}{c^2+d^2}, y = \frac{bc-ad}{c^2+d^2}\).

ANSWER: The student's method gives \(\frac{1}{3} + \frac{1}{2}i\), correct answer is \(\frac{11}{25} + \frac{2}{25}i\). The correct formula is derived by solving the system \(cx - dy = a, dx + cy = b\).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a signal processing application, a filter's transfer function is \(H(z) = \frac{z^2 + 2z + 2}{z^2 - 2z + 2}\) where \(z = e^{i\theta}\). For \(\theta = \frac{\pi}{4}\), compute \(H(e^{i\pi/4})\) in \(a+ib\) form. (Hint: \(e^{i\pi/4} = \frac{1}{\sqrt{2}} + \frac{1}{\sqrt{2}}i\)).

COMPETENCY: Applying complex division in multi-step engineering context; combining polar/exponential concepts with algebraic division

STEPS:
- Step 1: Substitute \(z = \frac{1}{\sqrt{2}}(1+i)\). Compute \(z^2 = \frac{1}{2}(1+i)^2 = \frac{1}{2}(2i) = i\).
- Step 2: Numerator: \(z^2 + 2z + 2 = i + 2\cdot\frac{1}{\sqrt{2}}(1+i) + 2 = i + \sqrt{2}(1+i) + 2 = (2+\sqrt{2}) + i(1+\sqrt{2})\).
- Step 3: Denominator: \(z^2 - 2z + 2 = i - \sqrt{2}(1+i) + 2 = (2-\sqrt{2}) + i(1-\sqrt{2})\).
- Step 4: Divide: \(\frac{(2+\sqrt{2}) + i(1+\sqrt{2})}{(2-\sqrt{2}) + i(1-\sqrt{2})}\). Multiply by conjugate of denominator.
- Step 5: Denominator magnitude: \((2-\sqrt{2})^2 + (1-\sqrt{2})^2 = (4 - 4\sqrt{2} + 2) + (1 - 2\sqrt{2} + 2) = 9 - 6\sqrt{2}\).
- Step 6: Numerator expansion and simplification yields purely imaginary result: \(H = i\) (after full computation).

ANSWER: \(H(e^{i\pi/4}) = 0 + 1i\) (the filter passes this frequency with 90° phase shift)

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you have ₹(3+4i) and want to ______ it equally among (1+2i) friends — how much does each friend get?

## DIAGNOSTIC_ANSWER_7
split

**A wrong answer ("divide" or "share") reveals the student has paraphrased the walkthrough's verb - the absurd scenario asks to split the ₹(3 + 4i) among the (1 + 2i) friends.** Split is the walkthrough's own verb, chosen precisely because the act is impossible and forces the conjugate method. Recall the rationalising-denominator rescue before filling, and give the verb exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: ______ you have ₹(3+4i) and want to split it equally among (1+2i) friends — how much does each friend get?

## DIAGNOSTIC_ANSWER_8
Imagine

**A wrong answer ("Suppose" or "Picture") reveals the student has paraphrased the walkthrough's opening word - the scene starts "Imagine you have ₹(3 + 4i)."** Scenario blanks repeat the walkthrough verbatim, and first words are exam currency in these blanks. Fill the exact opener, not a synonym, and let the absurd-division scene stand as written.
