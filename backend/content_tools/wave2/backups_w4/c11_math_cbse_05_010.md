## ELI5
An AC engineer juggles V = 220 sin(100πt) and phase shifts - until Euler's form hands over exponent laws. Since e^{iθ} = cos θ + i sin θ, any complex number writes as z = r e^{iθ}: modulus times a point on the unit circle. Multiplication becomes exponent addition, division exponent subtraction - oscillations become rotating vectors. The form covers every non-zero complex number; at z = 0 the argument retires undefined. Polar form in tighter notation, powered by the function whose derivative returns itself.

## DEFINITION
Euler's form expresses a complex number \(z = x + iy\) as \(z = r e^{i\theta}\), where \(r = |z| = \sqrt{x^2 + y^2}\) is the modulus, \(\theta = \arg(z)\) is the principal argument (typically \(-\pi < \theta \le \pi\)), and \(e^{i\theta} = \cos\theta + i\sin\theta\) is Euler's formula. This representation is valid for all non-zero complex numbers; for \(z=0\), the form is \(0\) with undefined argument.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can convert any non-zero complex number between Cartesian, polar, and Euler forms, perform multiplication/division using exponent laws on the Euler form, and explain why \(e^{i\theta}\) represents a point on the unit circle using the series definition or differential equation intuition.

## SCOPE_BOUNDARY
Covers Euler's formula \(e^{i\theta}=\cos\theta+i\sin\theta\), Euler's form \(z=re^{i\theta}\), conversion between forms, and algebraic operations (multiplication, division, powers) using exponent rules. Does NOT cover complex logarithm, multi-valued arguments, or applications to differential equations (Class 12+).

## WALKTHROUGH
Imagine you are an electrical engineer analysing an AC circuit with voltage \(V = 220\sin(100\pi t)\) volts. The phase difference between voltage and current is crucial. Instead of juggling \(\sin\) and \(\cos\), what if we could treat oscillations as rotating vectors and use simple exponent rules? That's exactly what Euler's form does. Start by recalling the polar form \(z = r(\cos\theta + i\sin\theta)\) from the previous node (c11_math_cbse_05_009). Now ask: "Is there a function whose derivative is itself, but rotates in the complex plane?" The exponential function \(e^x\) has derivative \(e^x\); if we put \(x = i\theta\), the derivative becomes \(i e^{i\theta}\) — a rotation by 90°. This suggests \(e^{i\theta}\) traces a circle. Verify by writing the Maclaurin series for \(e^x\), substitute \(x=i\theta\), separate real and imaginary parts, and recognise the series for \(\cos\theta\) and \(\sin\theta\). The key insight: Euler's form turns multiplication of complex numbers into addition of exponents, exactly like real exponentials.

Takeaway: mastery means fluent three-way conversion - Cartesian, polar, Euler - and products and quotients executed by adding and subtracting the angles. Exam moves: convert-to-Euler-form questions and multiply-using-exponent-laws items on the unit circle. Check yourself: e^{iθ} rides the unit circle - modulus 1, argument θ - which is why r sits outside the exponential. Students miss it because e^{iθ} looks like ordinary exponentials, when the definition's formula packs cosine and sine into one rotating object: the series proof is the receipt.

## DIAGNOSTIC_QUESTION_1
State Euler's formula and write the Euler form of the complex number \(z = -1 + i\sqrt{3}\).

## DIAGNOSTIC_ANSWER_1
Euler's formula: \(e^{i\theta} = \cos\theta + i\sin\theta\). For \(z = -1 + i\sqrt{3}\), modulus \(r = \sqrt{(-1)^2 + (\sqrt{3})^2} = 2\). Argument \(\theta = \pi - \frac{\pi}{3} = \frac{2\pi}{3}\) (since point lies in QII). Euler form: \(z = 2 e^{i\frac{2\pi}{3}}\). A wrong answer like \(2 e^{-i\frac{\pi}{3}}\) reveals the student cannot determine the correct quadrant for the principal argument; \(e^{i\frac{\pi}{3}}\) reveals they used the reference angle without quadrant adjustment.

## DIAGNOSTIC_QUESTION_2
Explain why \(e^{i\pi} = -1\) is a direct consequence of Euler's formula, and why this identity does NOT imply \(i\pi = \ln(-1)\) in the same way as real logarithms.

## DIAGNOSTIC_ANSWER_2
Substitute \(\theta = \pi\) into \(e^{i\theta} = \cos\theta + i\sin\theta\): \(\cos\pi = -1\), \(\sin\pi = 0\), so \(e^{i\pi} = -1\). The identity \(e^{i\pi} = -1\) does not mean \(i\pi = \ln(-1)\) uniquely because the complex exponential is periodic: \(e^{i(\pi + 2k\pi)} = -1\) for any integer \(k\). Thus \(\ln(-1)\) is multi-valued: \(i(\pi + 2k\pi)\). A student who writes \(\ln(-1) = i\pi\) as a single value misses the periodicity of the complex exponential and the multi-valued nature of the complex logarithm.

## DIAGNOSTIC_QUESTION_3
Given \(z_1 = 3 e^{i\frac{\pi}{4}}\) and \(z_2 = 2 e^{-i\frac{\pi}{6}}\), compute \(z_1 z_2\) and \(\frac{z_1}{z_2}\) in Euler form. Then convert \(z_1 z_2\) to Cartesian form \(a+ib\).

## DIAGNOSTIC_ANSWER_3
\(z_1 z_2 = (3 \times 2) e^{i(\frac{\pi}{4} - \frac{\pi}{6})} = 6 e^{i\frac{\pi}{12}}\). \(\frac{z_1}{z_2} = \frac{3}{2} e^{i(\frac{\pi}{4} + \frac{\pi}{6})} = \frac{3}{2} e^{i\frac{5\pi}{12}}\). For Cartesian: \(6 e^{i\frac{\pi}{12}} = 6(\cos\frac{\pi}{12} + i\sin\frac{\pi}{12})\). Using \(\cos\frac{\pi}{12} = \frac{\sqrt{6}+\sqrt{2}}{4}\), \(\sin\frac{\pi}{12} = \frac{\sqrt{6}-\sqrt{2}}{4}\), we get \(z_1 z_2 = \frac{3}{2}(\sqrt{6}+\sqrt{2}) + i\frac{3}{2}(\sqrt{6}-\sqrt{2})\). A wrong answer like \(6 e^{i\frac{5\pi}{12}}\) for the product reveals the student added exponents instead of subtracting for division, or misapplied the sign in the exponent.

## DIAGNOSTIC_QUESTION_4
Compare the geometric effect of multiplying a complex number \(z\) by \(e^{i\alpha}\) versus multiplying by a real number \(k > 0\). What does each operation do to the modulus and argument?

## DIAGNOSTIC_ANSWER_4
Multiplying by \(e^{i\alpha}\) (where \(\alpha \in \mathbb{R}\)): modulus unchanged (\(|z e^{i\alpha}| = |z|\)), argument increased by \(\alpha\) (rotation by \(\alpha\) radians anticlockwise). Multiplying by real \(k>0\): modulus scaled by \(k\) (\(|kz| = k|z|\)), argument unchanged (no rotation). A student who says both change the argument confuses scaling with rotation; one who says \(e^{i\alpha}\) changes the modulus forgets \(|e^{i\alpha}|=1\).

## DIAGNOSTIC_QUESTION_5
A student claims: "Since \(e^{i\theta} = \cos\theta + i\sin\theta\), we can write \(\cos\theta = \frac{e^{i\theta} + e^{-i\theta}}{2}\) and \(\sin\theta = \frac{e^{i\theta} - e^{-i\theta}}{2i}\)." Verify these identities and explain why they are useful for integrating powers of trigonometric functions.

## DIAGNOSTIC_ANSWER_5
Add: \(e^{i\theta} + e^{-i\theta} = (\cos\theta + i\sin\theta) + (\cos\theta - i\sin\theta) = 2\cos\theta \Rightarrow \cos\theta = \frac{e^{i\theta} + e^{-i\theta}}{2}\). Subtract: \(e^{i\theta} - e^{-i\theta} = 2i\sin\theta \Rightarrow \sin\theta = \frac{e^{i\theta} - e^{-i\theta}}{2i}\). These convert trigonometric integrals into sums of exponentials, which are trivial to integrate: \(\int e^{ax} dx = \frac{e^{ax}}{a}\). For example, \(\int \cos^3\theta d\theta\) becomes \(\int \left(\frac{e^{i\theta}+e^{-i\theta}}{2}\right)^3 d\theta\), expand, integrate termwise. A student who cannot derive these lacks the algebraic manipulation skill with Euler form; one who doesn't see the integration utility misses the cross-topic link to calculus.

## DIAGNOSTIC_QUESTION_6
Construct a complex number \(z\) (non-zero) such that \(z^3 = -8i\) and express all three solutions in Euler form. Explain how the solutions are geometrically arranged on the Argand plane.

## DIAGNOSTIC_ANSWER_6
Write \(-8i = 8 e^{-i\frac{\pi}{2}}\) (principal argument \(-\frac{\pi}{2}\)). Cube roots: \(z_k = 8^{1/3} e^{i\frac{-\pi/2 + 2k\pi}{3}} = 2 e^{i\frac{-\pi/2 + 2k\pi}{3}}, k=0,1,2\). So \(z_0 = 2 e^{-i\frac{\pi}{6}}\), \(z_1 = 2 e^{i\frac{\pi}{2}} = 2i\), \(z_2 = 2 e^{i\frac{7\pi}{6}} = 2 e^{-i\frac{5\pi}{6}}\). Geometrically: three points on circle of radius 2, equally spaced by \(120^\circ\) (arguments differ by \(\frac{2\pi}{3}\)). A poor answer gives only one root (ignoring multi-valued nature) or spaces them incorrectly (e.g., by \(90^\circ\)), revealing incomplete grasp of De Moivre's theorem in Euler form.

## COMMON_MISCONCEPTION
Students often write \(e^{i\theta} = \cos\theta + \sin\theta\) (missing the \(i\) before \(\sin\theta\)) or treat the argument as multi-valued in the Euler form itself (writing \(z = r e^{i(\theta+2k\pi)}\) as the standard form). The Euler form uses the **principal argument** \(-\pi < \theta \le \pi\); the multi-valued nature appears only when solving equations like \(z^n = w\). Another error: when converting \(z = -2\) to Euler form, students write \(2 e^{i\pi}\) but then use \(\theta = \pi\) in further calculations without realising \(\pi\) is the boundary of the principal interval (some conventions use \(0 \le \theta < 2\pi\); CBSE uses \(-\pi < \theta \le \pi\)).

## ON_FAILURE
If a student writes \(e^{i\theta} = \cos\theta + \sin\theta\): Ask them to compute \(e^{i\pi/2}\) using both sides. LHS = \(i\), RHS = \(0 + 1 = 1\). The mismatch forces the missing \(i\). For argument errors: Give \(z = -1 - i\). Student finds \(\theta = \frac{5\pi}{4}\) (or \(-\frac{3\pi}{4}\)). Ask "Is \(\frac{5\pi}{4}\) in the principal range \((- \pi, \pi]\)?" No. Then "Subtract \(2\pi\): \(\frac{5\pi}{4} - 2\pi = -\frac{3\pi}{4}\)." Drill: "Principal argument must lie in \((-\pi, \pi]\); add/subtract \(2\pi\) until it does." For multi-valued confusion: Show \(z^2 = -1\). Solutions: \(e^{i\pi/2}, e^{i3\pi/2}\) (or \(e^{-i\pi/2}\)). Emphasise: the **form** \(z = re^{i\theta}\) uses one \(\theta\); the **equation** \(z^n = w\) generates multiple \(\theta\) values.

## PREREQUISITE_NODE_IDS
c11_math_cbse_05_007, c11_math_cbse_05_008, c11_math_cbse_05_009, c8_math_ch2_3, c8_math_ch2_7, c8_math_ch2_9, c9_math_ch8_8, c9_math_ch8_9, c10_math_cbse_08_001, c10_math_cbse_08_002, c10_math_cbse_08_003, c10_math_cbse_08_004, c10_math_cbse_08_005, c11_math_cbse_05_006

## PREREQUISITE_REASONS
c11_math_cbse_05_007: Modulus and conjugate are needed to find \(r = |z|\) and verify \(|e^{i\theta}|=1\).
c11_math_cbse_05_008: Argand plane gives geometric meaning to modulus and argument.
c11_math_cbse_05_009: Polar form \(r(\cos\theta+i\sin\theta)\) is the direct precursor; Euler form is its compact rewrite.
c8_math_ch2_3: Exponential notation \(a^m\) and laws of exponents are essential for manipulating \(e^{i\theta}\).
c8_math_ch2_7: Law \(a^m a^n = a^{m+n}\) underpins multiplication in Euler form.
c8_math_ch2_9: Law \((a^m)^n = a^{mn}\) underpins powers/roots in Euler form.
c9_math_ch8_8: Geometric progression and common ratio concept helps see \(e^{i\theta}\) as a rotation operator.
c9_math_ch8_9: nth term of GP \(ar^{n-1}\) connects to De Moivre's theorem \((e^{i\theta})^n = e^{in\theta}\).
c10_math_cbse_08_001: Trigonometric ratios \(\sin,\cos\) define the real/imaginary parts of \(e^{i\theta}\).
c10_math_cbse_08_002: Reciprocal ratios appear when converting between forms.
c10_math_cbse_08_003: Values at \(0^\circ, 90^\circ\) give \(e^{i0}=1, e^{i\pi/2}=i\).
c10_math_cbse_08_004: Values at \(30^\circ, 60^\circ\) give standard angles in Euler form.
c10_math_cbse_08_005: Value at \(45^\circ\) gives \(e^{i\pi/4} = \frac{1}{\sqrt{2}}(1+i)\).
c11_math_cbse_05_006: Euler's form e^(iθ) directly generalises powers of i.  

## FORWARD_NODE_IDS


## FORWARD_REASONS


## CROSS_SUBJECT_PREREQS
c11_phy_cbse_04_001, c11_phy_cbse_04_002, c11_phy_cbse_07_001, c11_phy_cbse_07_002, c11_phy_cbse_07_003
## CROSS_SUBJECT_REASONS
c11_physics_ch4_001: Simple harmonic motion uses \(x = A\cos(\omega t + \phi)\); Euler form converts this to \(\Re(A e^{i(\omega t + \phi)})\) for easier superposition.
c11_physics_ch4_002: Phasor representation of AC voltage/current uses \(V = V_0 e^{i\omega t}\); impedance calculations become complex algebra.
c11_physics_ch7_001: Wave equation solutions \(y = A e^{i(kx - \omega t)}\) use Euler form to describe travelling waves.
c11_physics_ch7_002: Superposition of waves adds complex amplitudes; Euler form makes interference calculations algebraic.
c11_physics_ch7_003: Quantum mechanics wavefunction \(\psi(x,t) = A e^{i(kx - \omega t)}\) is fundamentally Euler form.
c11_phy_cbse_04_001: Cross-subject support: Aristotle's fallacy is the incorrect assertion that a continuous external force is require... supplies tools/facts used directly in this node.  
c11_phy_cbse_04_002: Cross-subject support: Newton's First Law of Motion (Law of Inertia) states that a body remains in its state of r... supplies tools/facts used directly in this node.  
c11_phy_cbse_07_001: Cross-subject support: Kepler's laws of planetary motion are three empirical principles describing the motion of... supplies tools/facts used directly in this node.  
c11_phy_cbse_07_002: Cross-subject support: Newton's Law of Universal Gravitation states that every particle in the universe attracts... supplies tools/facts used directly in this node.  
c11_phy_cbse_07_003: Cross-subject support: The gravitational constant \( G \) is the universal proportionality constant in Newton's l... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_math_cbse_05_009 -> c11_math_cbse_05_010 -> c11_math_cbse_05_011

## THIS_FORMULA
Euler's formula: \(e^{i\theta} = \cos\theta + i\sin\theta\). Euler's form of complex number: \(z = r e^{i\theta}\) where \(r = |z| \ge 0\), \(\theta = \arg(z) \in (-\pi, \pi]\).

## FORMULA_VARIABLES
\(z\) = complex number; \(r = |z| = \sqrt{x^2+y^2}\) = modulus (non-negative real); \(\theta = \arg(z)\) = principal argument in radians, \(-\pi < \theta \le \pi\); \(x = r\cos\theta\), \(y = r\sin\theta\) = Cartesian coordinates; \(i = \sqrt{-1}\).

## FORMULA_UNITS
Modulus \(r\) has same units as \(z\) (e.g., volts, metres, dimensionless). Argument \(\theta\) is in radians (dimensionless). Exponential \(e^{i\theta}\) is dimensionless.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch4_001 | SHM displacement \(x = A\cos(\omega t + \phi)\) becomes \(\Re(A e^{i(\omega t + \phi)})\); adding oscillations reduces to adding complex amplitudes.
c11_physics_ch4_002 | AC circuit analysis: voltage \(V = V_0 e^{i\omega t}\), current \(I = I_0 e^{i(\omega t - \phi)}\); impedance \(Z = V/I\) uses Euler form division.
c11_physics_ch7_001 | Wave function \(y(x,t) = A e^{i(kx - \omega t)}\) describes travelling wave; real part gives physical displacement.
c11_physics_ch7_002 | Interference: resultant amplitude = sum of individual complex amplitudes in Euler form; intensity \(\propto |\text{sum}|^2\).
c11_physics_ch7_003 | Quantum wavefunction \(\psi = A e^{i(kx - \omega t)}\); probability density \(|\psi|^2 = |A|^2\) uses modulus of Euler form.

## PREREQ_CONCEPT
Polar representation of complex numbers and laws of exponents for real numbers.

## PREREQ_BEFORE
Student must be able to convert \(z = x+iy\) to polar form \(r(\cos\theta+i\sin\theta)\), compute modulus and principal argument, and apply exponent rules \(a^m a^n = a^{m+n}\), \((a^m)^n = a^{mn}\).

## PREREQ_STUCK
If stuck, revisit c11_math_cbse_05_009 (Polar Form: r and theta) for argument calculation, and c8_math_ch2_7, c8_math_ch2_9 for exponent laws.

## WORKED_EXAMPLE_1
PROBLEM: Express the complex number \(z = \frac{1 + i}{\sqrt{3} - i}\) in Euler form \(r e^{i\theta}\) with principal argument.
STEPS:
- Step 1: Simplify the quotient by multiplying numerator and denominator by the conjugate of the denominator: \(\frac{1 + i}{\sqrt{3} - i} \times \frac{\sqrt{3} + i}{\sqrt{3} + i}\).
- Step 2: Compute numerator: \((1+i)(\sqrt{3}+i) = \sqrt{3} + i + i\sqrt{3} + i^2 = (\sqrt{3} - 1) + i(1 + \sqrt{3})\). Compute denominator: \((\sqrt{3})^2 - i^2 = 3 + 1 = 4\).
- Step 3: Write simplified Cartesian form: \(z = \frac{\sqrt{3} - 1}{4} + i\frac{\sqrt{3} + 1}{4}\).
- Step 4: Find modulus \(r = \sqrt{\left(\frac{\sqrt{3} - 1}{4}\right)^2 + \left(\frac{\sqrt{3} + 1}{4}\right)^2} = \sqrt{\frac{3 - 2\sqrt{3} + 1 + 3 + 2\sqrt{3} + 1}{16}} = \sqrt{\frac{8}{16}} = \frac{1}{\sqrt{2}}\).
- Step 5: Find argument \(\theta\): \(\tan\theta = \frac{\sqrt{3} + 1}{\sqrt{3} - 1}\). Rationalise: \(\frac{(\sqrt{3}+1)^2}{3-1} = \frac{4+2\sqrt{3}}{2} = 2+\sqrt{3} = \tan 75^\circ = \tan\frac{5\pi}{12}\). Since both real and imaginary parts are positive, \(z\) lies in QI, so principal argument \(\theta = \frac{5\pi}{12}\).
- Step 6: Write Euler form: \(z = \frac{1}{\sqrt{2}} e^{i\frac{5\pi}{12}}\).
REASONING: Simplifying the quotient first avoids messy modulus/argument of a fraction. The tangent value \(2+\sqrt{3}\) is recognised as \(\tan 75^\circ\) from standard angles (Class 10 trigonometry). Quadrant check ensures correct principal argument.
ANSWER: \(z = \frac{1}{\sqrt{2}} e^{i\frac{5\pi}{12}}\)

## WORKED_EXAMPLE_2
PROBLEM: If \(z = 2 e^{i\frac{\pi}{3}}\), find \(z^4\) and \(\frac{1}{z}\) in Euler form, then convert \(z^4\) to Cartesian form.
STEPS:
- Step 1: Apply exponent rule for power: \(z^4 = (2 e^{i\frac{\pi}{3}})^4 = 2^4 \cdot e^{i \cdot 4 \cdot \frac{\pi}{3}} = 16 e^{i\frac{4\pi}{3}}\).
- Step 2: Adjust argument to principal range: \(\frac{4\pi}{3} > \pi\), subtract \(2\pi\): \(\frac{4\pi}{3} - 2\pi = -\frac{2\pi}{3}\). So \(z^4 = 16 e^{-i\frac{2\pi}{3}}\) (principal argument).
- Step 3: Apply exponent rule for reciprocal: \(\frac{1}{z} = \frac{1}{2 e^{i\frac{\pi}{3}}} = \frac{1}{2} e^{-i\frac{\pi}{3}}\). Argument \(-\frac{\pi}{3}\) is already in \((-\pi, \pi]\).
- Step 4: Convert \(z^4\) to Cartesian: \(16 e^{-i\frac{2\pi}{3}} = 16\left(\cos\left(-\frac{2\pi}{3}\right) + i\sin\left(-\frac{2\pi}{3}\right)\right) = 16\left(-\frac{1}{2} - i\frac{\sqrt{3}}{2}\right) = -8 - 8i\sqrt{3}\).
REASONING: Euler form reduces powers and reciprocals to simple exponent arithmetic. The argument must always be brought back to the principal interval \((-\pi, \pi]\) for the final Euler form answer. Conversion to Cartesian uses exact values of cosine and sine for standard angles.
ANSWER: \(z^4 = 16 e^{-i\frac{2\pi}{3}} = -8 - 8i\sqrt{3}\); \(\frac{1}{z} = \frac{1}{2} e^{-i\frac{\pi}{3}}\)

## WORKED_EXAMPLE_3
PROBLEM: Solve \(z^3 = -8i\) and represent all solutions geometrically on the Argand plane. Express each solution in Euler form with principal argument.
STEPS:
- Step 1: Write RHS in Euler form: \(-8i = 8 e^{-i\frac{\pi}{2}}\) (modulus 8, argument \(-\frac{\pi}{2}\) because point is on negative imaginary axis).
- Step 2: General solution for \(z\): \(z = 8^{1/3} e^{i\frac{-\pi/2 + 2k\pi}{3}} = 2 e^{i\frac{-\pi/2 + 2k\pi}{3}}, \quad k = 0, 1, 2\).
- Step 3: Compute for each \(k\):
  \(k=0: \theta_0 = \frac{-\pi/2}{3} = -\frac{\pi}{6}\) (in range) \(\Rightarrow z_0 = 2 e^{-i\frac{\pi}{6}}\).
  \(k=1: \theta_1 = \frac{-\pi/2 + 2\pi}{3} = \frac{3\pi/2}{3} = \frac{\pi}{2}\) (in range) \(\Rightarrow z_1 = 2 e^{i\frac{\pi}{2}} = 2i\).
  \(k=2: \theta_2 = \frac{-\pi/2 + 4\pi}{3} = \frac{7\pi/2}{3} = \frac{7\pi}{6} > \pi\). Adjust: \(\frac{7\pi}{6} - 2\pi = -\frac{5\pi}{6}\) \(\Rightarrow z_2 = 2 e^{-i\frac{5\pi}{6}}\).
- Step 4: Verify all have modulus 2 and arguments differ by \(\frac{2\pi}{3}\).
- Step 5: Geometric description: Three points on circle radius 2 centred at origin, vertices of an equilateral triangle, arguments \(-\frac{5\pi}{6}, -\frac{\pi}{6}, \frac{\pi}{2}\).
REASONING: Euler form makes finding nth roots systematic: take nth root of modulus, divide argument by n, then add \(\frac{2k\pi}{n}\) for \(k=0,1,\dots,n-1\). Each root must have its argument adjusted to the principal interval. The geometric arrangement (regular polygon) is a direct consequence of equal angular spacing.
ANSWER: \(z_0 = 2 e^{-i\frac{\pi}{6}}, \quad z_1 = 2 e^{i\frac{\pi}{2}}, \quad z_2 = 2 e^{-i\frac{5\pi}{6}}\); vertices of equilateral triangle on circle \(|z|=2\).

## COMPETENCY_QUESTION_1
QUESTION: A signal processing engineer represents two AC voltages as phasors: \(V_1 = 10 e^{i\frac{\pi}{4}}\) V and \(V_2 = 5 e^{-i\frac{\pi}{6}}\) V. The resultant voltage is \(V = V_1 + V_2\). Find the magnitude and phase (principal argument) of \(V\) in Euler form. Explain why you cannot simply add the exponents.
COMPETENCY: Translating real-world situations to mathematical expressions and justifying method choice
STEPS:
- Step 1: Recognise that addition of complex numbers in Euler form requires conversion to Cartesian form because \(e^{i\alpha} + e^{i\beta} \neq e^{i(\alpha+\beta)}\).
- Step 2: Convert \(V_1\) and \(V_2\) to Cartesian: \(V_1 = 10(\cos\frac{\pi}{4} + i\sin\frac{\pi}{4}) = 5\sqrt{2} + i5\sqrt{2}\). \(V_2 = 5(\cos(-\frac{\pi}{6}) + i\sin(-\frac{\pi}{6})) = \frac{5\sqrt{3}}{2} - i\frac{5}{2}\).
- Step 3: Add Cartesian components: Real part = \(5\sqrt{2} + \frac{5\sqrt{3}}{2}\), Imaginary part = \(5\sqrt{2} - \frac{5}{2}\).
- Step 4: Compute modulus \(|V| = \sqrt{(\text{Re})^2 + (\text{Im})^2}\) and argument \(\theta = \tan^{-1}(\frac{\text{Im}}{\text{Re}})\) with quadrant check.
- Step 5: Write resultant in Euler form \(V = |V| e^{i\theta}\). Explain: Exponents add only for multiplication, not addition.
ANSWER: \(|V| = \frac{5}{2}\sqrt{10 + 4\sqrt{2} + 2\sqrt{6}} \approx 14.55\) V, \(\theta = \tan^{-1}\left(\frac{2\sqrt{2} - 1}{2\sqrt{2} + \sqrt{3}}\right) \approx 0.37\) rad (QI). \(V \approx 14.55 e^{i0.37}\) V. Exponents add for multiplication because \(e^{i\alpha}e^{i\beta}=e^{i(\alpha+\beta)}\); addition has no such property.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Prove that for any integer \(n\), \(\cos(n\theta) = \Re(e^{in\theta})\) and \(\sin(n\theta) = \Im(e^{in\theta})\). Use this to derive the triple-angle formula \(\cos 3\theta = 4\cos^3\theta - 3\cos\theta\) without using trigonometric identities directly.
COMPETENCY: Comparing and justifying algebraic methods, deriving new formulas from known ones
STEPS:
- Step 1: By Euler's formula, \(e^{in\theta} = \cos(n\theta) + i\sin(n\theta)\). Taking real and imaginary parts gives the required expressions.
- Step 2: Also \(e^{in\theta} = (e^{i\theta})^n = (\cos\theta + i\sin\theta)^n\).
- Step 3: For \(n=3\), expand \((\cos\theta + i\sin\theta)^3\) using binomial theorem: \(\cos^3\theta + 3i\cos^2\theta\sin\theta - 3\cos\theta\sin^2\theta - i\sin^3\theta\).
- Step 4: Real part is \(\cos^3\theta - 3\cos\theta\sin^2\theta\). Replace \(\sin^2\theta = 1 - \cos^2\theta\).
- Step 5: Simplify: \(\cos^3\theta - 3\cos\theta(1 - \cos^2\theta) = 4\cos^3\theta - 3\cos\theta\). Equate to \(\cos 3\theta\).
ANSWER: \(\cos 3\theta = 4\cos^3\theta - 3\cos\theta\). The derivation uses only Euler's formula and binomial expansion, avoiding standard trig identities. This demonstrates the power of Euler form to convert trigonometric problems into algebraic ones.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The phase difference between ______ and current is crucial.

## DIAGNOSTIC_ANSWER_7
voltage

**A wrong answer ("power" or "resistance") reveals the student has swapped the walkthrough's quantity - the phase gap sits between voltage and current in the AC circuit analysis.** Voltage is the walkthrough's own first quantity, named before current in the same sentence. Recall the V = 220 sin(100πt) setup before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: The phase ______ between voltage and current is crucial.

## DIAGNOSTIC_ANSWER_8
difference

**A wrong answer ("gap" or "shift") reveals the student has paraphrased the walkthrough's noun - the phase difference between voltage and current drives the whole analysis.** Difference is the walkthrough's own noun in that phrase, and the noun is what the blank grades. Recall why rotating vectors replace sine juggling before filling, and give the noun exactly.
