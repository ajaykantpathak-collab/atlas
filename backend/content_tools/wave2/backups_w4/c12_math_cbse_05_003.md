## ELI5
Well-behaved functions stay well-behaved under ordinary mixing: sums, differences and products of continuous functions are continuous, quotients too wherever the denominator refuses to be zero, and compositions - f of g - wherever the inner lands in the outer's good territory. This algebra of continuity is the traveller's shortcut: instead of recomputing limits for a messy fare formula, verify each ingredient once and let the rules certify the blend.

## DEFINITION
The algebra of continuous functions states that if \(f\) and \(g\) are two real-valued functions continuous at a point \(x = c\), then their sum \(f+g\), difference \(f-g\), product \(f \cdot g\), and quotient \(\frac{f}{g}\) (provided \(g(c) \neq 0\)) are also continuous at \(x = c\). Additionally, if \(g\) is continuous at \(c\) and \(f\) is continuous at \(g(c)\), then the composite function \(f \circ g\) is continuous at \(c\). This follows directly from the corresponding limit laws.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can state and apply the four algebraic operations and the composition theorem for continuous functions to determine continuity of combined functions (polynomials, rationals, trigonometric, absolute value, etc.) without recomputing limits from first principles. They can also identify the exact condition (\(g(c) \neq 0\) for quotients, domain compatibility for composition) that must be checked.

## SCOPE_BOUNDARY
This node covers Theorem 1 (sum, difference, product, quotient) and Theorem 2 (continuity of composite functions) from NCERT Section 5.2.1. It does NOT cover differentiability (nodes 004–013), nor does it re-derive limit laws — those are assumed from Class 11 (c11_math_cbse_13_002). Piecewise functions are used only as examples to apply the theorems, not to re-teach piecewise continuity.

## WALKTHROUGH
Imagine you are designing a fare calculator for a Delhi Metro ride: the base fare is a polynomial function of distance, a surcharge is a rational function of peak hours, and a discount is an absolute-value function of a smart-card balance. You need to know if the total fare function is continuous everywhere so that a passenger never sees a sudden jump in fare. Start by recalling the definition of continuity at a point (c12_math_cbse_05_001) and the algebra of limits (c11_math_cbse_13_002). Then, instead of computing \(\lim_{x \to c}\) for the combined function, you can simply check continuity of each component (polynomials, rationals, \(|x|\), trig functions are all continuous on their domains) and apply the algebraic rules. The key insight: **continuity is preserved under addition, subtraction, multiplication, division (denominator non-zero), and composition** — so most "standard" functions built from these operations are automatically continuous on their domains.

Takeaway first: continuity is inherited through arithmetic and composition, with exactly two gate checks - denominator non-zero, and composition compatibility. Exam moves: application questions certifying combined functions without fresh limit work, gate questions naming the exact condition for quotients and compositions, and counterexample questions on denominators hitting zero. Method: rerun the fare calculator - polynomial base, rational surcharge, absolute-value discount - and certify each piece, then the blend, citing which rule covers which operation. Check yourself: the quotient gate is a point condition, not a global one; the function is continuous everywhere its denominator lives. Drill: certify one composite fare function's continuity, naming each rule invoked.

## DIAGNOSTIC_QUESTION_1
State the condition required for the quotient \(\frac{f}{g}\) to be continuous at \(x = c\) if \(f\) and \(g\) are continuous at \(c\).

## DIAGNOSTIC_ANSWER_1
Correct answer: \(g(c) \neq 0\). If a student writes only "\(f\) and \(g\) are continuous at \(c\)", they have missed the critical domain restriction. This reveals they treat the quotient rule for continuity exactly like the sum/product rules, ignoring that division by zero is undefined — a frequent error in board exams when checking continuity of rational functions like \(\frac{x^2-1}{x-1}\) at \(x=1\).

## DIAGNOSTIC_QUESTION_2
Explain why the function \(h(x) = \sin(x^2)\) is continuous for all real \(x\) using the composition theorem. Identify the inner and outer functions and their continuity domains.

## DIAGNOSTIC_ANSWER_2
Correct answer: Let \(g(x)=x^2\) (inner) and \(f(u)=\sin u\) (outer). \(g\) is continuous on \(\mathbb{R}\) (polynomial). \(f\) is continuous on \(\mathbb{R}\) (sine function). Since range of \(g\) is \([0,\infty) \subseteq \mathbb{R} = \text{domain of } f\), the composition \(f \circ g\) is continuous on \(\mathbb{R}\). A wrong answer that only says "both are continuous" without checking the domain condition (range of inner ⊆ domain of outer) shows the student does not understand the hypothesis of Theorem 2 — a common trap in JEE when composing \(\sqrt{\sin x}\) or \(\tan(x^2)\).

## DIAGNOSTIC_QUESTION_3
Determine whether the function \(F(x) = \frac{x^2 - 4}{x - 2}\) is continuous at \(x = 2\). If not, can you redefine \(F(2)\) to make it continuous? Show all steps.

## DIAGNOSTIC_ANSWER_3
Correct answer: \(F(x) = \frac{(x-2)(x+2)}{x-2} = x+2\) for \(x \neq 2\). \(F\) is not defined at \(x=2\), so it is not continuous there. However, \(\lim_{x \to 2} F(x) = 4\). Defining \(F(2)=4\) makes it continuous (removable discontinuity). A student who says "\(F\) is continuous because it simplifies to \(x+2\)" has ignored that the original function's domain excludes \(x=2\) — they must explicitly state the domain condition \(g(c) \neq 0\) for the quotient rule.

## DIAGNOSTIC_QUESTION_4
Compare the continuity of \(f(x) = |x|\) and \(g(x) = \frac{1}{|x|}\) at \(x=0\). Why does the algebra of continuous functions give different conclusions?

## DIAGNOSTIC_ANSWER_4
Correct answer: \(f(x)=|x|\) is continuous at \(0\) (Example 3, NCERT). \(g(x)=\frac{1}{|x|}\) is not defined at \(0\), so the quotient rule does not apply — we cannot even ask about continuity at a point outside the domain. The algebra of continuous functions only guarantees continuity **at points where all functions are defined and the denominator is non-zero**. A student who claims "\(1/|x|\) is discontinuous at 0 because the quotient rule fails" confuses "not continuous" with "not defined" — a subtle but important distinction in board marking schemes.

## DIAGNOSTIC_QUESTION_5
A student writes: "Since \(f(x)=\sin x\) and \(g(x)=\frac{1}{x}\) are continuous on their domains, \(h(x)=\sin(\frac{1}{x})\) is continuous on its domain." Is this reasoning correct? Justify.

## DIAGNOSTIC_ANSWER_5
Correct answer: The reasoning is **incomplete**. The composition theorem requires \(g\) continuous at \(c\) **and** \(f\) continuous at \(g(c)\). For \(h(x)=\sin(1/x)\), \(g(x)=1/x\) is continuous on \(\mathbb{R}\setminus\{0\}\). \(f(u)=\sin u\) is continuous on \(\mathbb{R}\). For any \(c \neq 0\), \(g(c)\) is defined and \(f\) is continuous at \(g(c)\), so \(h\) is continuous on \(\mathbb{R}\setminus\{0\}\). The student's statement is true but the justification "continuous on their domains" is vague — they must explicitly verify the condition \(f\) continuous at \(g(c)\) for each \(c\) in the domain of \(g\). This is a typical JEE-style trap where the domain of the composition is not simply the intersection of domains.

## DIAGNOSTIC_QUESTION_6
Construct a function \(k(x)\) that is continuous everywhere except at exactly three points, using only polynomials, absolute value, and rational operations. Explain your construction.

## DIAGNOSTIC_ANSWER_6
Expected answer: Example: \(k(x) = \frac{|x-1|}{x-1} + \frac{|x-2|}{x-2} + \frac{|x-3|}{x-3}\). Each term is a rational function of \(|x-a|\) and \((x-a)\), continuous everywhere except at \(x=a\) (where denominator zero). Sum of three such terms is continuous except at \(x=1,2,3\). A poor answer might use piecewise definitions without leveraging the algebra theorems, showing the student cannot synthesize the algebraic properties to build functions with prescribed discontinuities.

## COMMON_MISCONCEPTION
Students often believe that if \(f\) and \(g\) are continuous, then \(\frac{f}{g}\) is continuous **everywhere** \(f\) and \(g\) are continuous. They forget the condition \(g(c) \neq 0\). For example, given \(f(x)=x^2-1\), \(g(x)=x-1\), they claim \(\frac{f}{g}\) is continuous at \(x=1\) because both are polynomials. The correct check: \(g(1)=0\), so the quotient rule does not apply at \(x=1\); the function simplifies to \(x+1\) for \(x \neq 1\) but is undefined at \(1\) — a removable discontinuity. Another error: assuming composition \(f \circ g\) is continuous wherever \(g\) is continuous, without verifying \(f\) is continuous at \(g(c)\). E.g., \(f(u)=\sqrt{u}\), \(g(x)=\sin x\): \(g\) is continuous everywhere, but \(f\) is only continuous for \(u \geq 0\); \(f \circ g = \sqrt{\sin x}\) is **not** continuous at points where \(\sin x < 0\) because it's not even defined there.

## ON_FAILURE
1. Revisit **c12_math_cbse_05_001** (definition of continuity at a point) and **c11_math_cbse_13_002** (algebra of limits).  
2. Write down the exact hypotheses of Theorem 1 and Theorem 2 from NCERT 5.2.1, highlighting the "provided \(g(c) \neq 0\)" and "\(f\) continuous at \(g(c)\)" conditions.  
3. Practice 5 problems where you must **explicitly state the domain** of each component function before applying the algebra rules (e.g., \(\frac{\sin x}{x}\), \(\sqrt{\cos x}\), \(\frac{|x|}{x}\)).  
4. Re-attempt Diagnostic Questions 1, 2, and 4, this time writing the domain condition as a separate step.

## PREREQUISITE_NODE_IDS
c12_math_cbse_05_001, c12_math_cbse_05_002, c11_math_cbse_13_001, c11_math_cbse_13_002
## PREREQUISITE_REASONS
c12_math_cbse_05_001: Provides the precise definition of continuity at a point (limit = value) which is the foundation for all algebraic operations.
c12_math_cbse_05_002: Establishes left-hand and right-hand limits, needed to check continuity of piecewise functions that often appear as components.
c11_math_cbse_13_001: Intuitive idea of limits — the conceptual bridge from "limit exists" to "function is continuous".
c11_math_cbse_13_002: Algebra of limits (sum, difference, product, quotient) — the proofs of Theorem 1 rely entirely on these limit laws.

## FORWARD_NODE_IDS
c12_math_cbse_05_004, c12_math_cbse_05_006, c12_math_cbse_05_007, c12_math_cbse_05_008, c12_math_cbse_05_012

## FORWARD_REASONS
c12_math_cbse_05_004: Differentiability requires continuity; the algebra of continuous functions helps identify where a function is continuous before checking differentiability.
c12_math_cbse_05_006: Chain rule for differentiation is the differential analogue of the composition theorem for continuity (Theorem 2).
c12_math_cbse_05_007: Implicit differentiation often involves composite functions; continuity of the components ensures the derivative exists.
c12_math_cbse_05_008: Derivatives of inverse trigonometric functions use composition of continuous functions (e.g., \(\sin^{-1}(x)\) is continuous on \([-1,1]\)).
c12_math_cbse_05_012: Algebra of continuous functions helps verify continuity of combinations (sum, product, quotient).  

## CROSS_SUBJECT_PREREQS
c11_stat_cbse_01_008, c11_stat_cbse_04_005
## CROSS_SUBJECT_REASONS
c11_stat_cbse_01_008: Continuous random variables in statistics are modeled by probability density functions (PDFs) which must be continuous; understanding function continuity is essential for defining valid PDFs.
c11_stat_cbse_04_005: Histograms approximate continuous distributions; the underlying assumption that the data comes from a continuous density function relies on the continuity of the distribution function.

## CHAIN_DESCRIPTION
c11_math_cbse_13_002 -> c12_math_cbse_05_001 -> c12_math_cbse_05_002 -> c12_math_cbse_05_003 -> c12_math_cbse_05_004

## THIS_FORMULA
If \(f\) and \(g\) are continuous at \(x=c\):
1. \(f+g\) is continuous at \(c\)
2. \(f-g\) is continuous at \(c\)
3. \(f \cdot g\) is continuous at \(c\)
4. \(\frac{f}{g}\) is continuous at \(c\) **provided \(g(c) \neq 0\)**
If \(g\) is continuous at \(c\) and \(f\) is continuous at \(g(c)\), then \(f \circ g\) is continuous at \(c\).

## FORMULA_VARIABLES
\(f, g\): real-valued functions; \(c\): a point in the domain of \(f\) and \(g\); \(g(c) \neq 0\) for quotient; range of \(g \subseteq\) domain of \(f\) for composition.

## FORMULA_UNITS
dimensionless

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_stat_cbse_01_008 | Continuous random variables require continuous PDFs; the algebra of continuous functions ensures sums/products of continuous densities remain continuous.
c11_stat_cbse_04_005 | Histograms for continuous data assume the underlying variable varies continuously; continuity of the distribution function justifies the area-under-curve interpretation.
## PREREQ_CONCEPT
Algebra of limits (Class 11) and the \(\varepsilon\)-\(\delta\) definition of continuity (Class 12, node 001).

## PREREQ_BEFORE
Student must be able to evaluate \(\lim_{x \to c} [f(x) \pm g(x)]\), \(\lim_{x \to c} f(x)g(x)\), \(\lim_{x \to c} \frac{f(x)}{g(x)}\) using limit laws, and state the definition of continuity at a point.

## PREREQ_STUCK
Revisit c11_math_cbse_13_002 (algebra of limits) and c12_math_cbse_05_001 (continuity definition) — the proofs of Theorem 1 are direct applications of these.

## WORKED_EXAMPLE_1
PROBLEM: A Delhi Metro fare function is defined as \(F(d) = 10 + 2d + \frac{5}{d+1}\) for distance \(d \geq 0\) (in km), where the first term is base fare, second is distance charge, third is a discount factor. Determine if \(F\) is continuous for all \(d \geq 0\). If not, identify the points of discontinuity.

STEPS:
- Step 1: Identify the component functions: \(f_1(d)=10\) (constant), \(f_2(d)=2d\) (polynomial), \(f_3(d)=\frac{5}{d+1}\) (rational).
- Step 2: Check continuity of each component on \([0,\infty)\). Constants and polynomials are continuous everywhere. \(f_3\) is a quotient of continuous functions (5 and \(d+1\)); denominator \(d+1 \geq 1 > 0\) for all \(d \geq 0\), so \(f_3\) is continuous on \([0,\infty)\).
- Step 3: Apply Theorem 1: sum of continuous functions is continuous. Since \(f_1, f_2, f_3\) are all continuous on \([0,\infty)\), their sum \(F = f_1+f_2+f_3\) is continuous on \([0,\infty)\).
- Step 4: Verify at the endpoint \(d=0\): \(F(0)=10+0+5=15\). \(\lim_{d \to 0^+} F(d) = 10+0+5=15\). Right-hand continuity holds.
- Step 5: Conclusion: \(F\) is continuous for all \(d \geq 0\). No discontinuities.

REASONING: The fare function is built from elementary continuous functions (constant, polynomial, rational with non-zero denominator) using only addition. By Theorem 1, the sum inherits continuity on the common domain where each piece is continuous. The denominator \(d+1\) never vanishes for \(d \geq 0\), so the quotient rule applies everywhere.

ANSWER: \(F(d)\) is continuous for all \(d \geq 0\). No points of discontinuity.

## WORKED_EXAMPLE_2
PROBLEM: Check the continuity of \(H(x) = \frac{|x-3|}{x^2-9}\) at \(x=3\) and \(x=-3\). If discontinuous, classify the discontinuity (removable, jump, infinite).

STEPS:
- Step 1: Factor denominator: \(x^2-9 = (x-3)(x+3)\). Domain of \(H\): all real \(x\) except \(x=3\) and \(x=-3\).
- Step 2: At \(x=3\): Numerator \(|x-3| \to 0\), denominator \(\to 0\). For \(x>3\), \(|x-3|=x-3\), so \(H(x)=\frac{x-3}{(x-3)(x+3)}=\frac{1}{x+3} \to \frac{1}{6}\). For \(x<3\), \(|x-3|=3-x\), so \(H(x)=\frac{3-x}{(x-3)(x+3)}=\frac{-1}{x+3} \to -\frac{1}{6}\). Left and right limits differ ⇒ jump discontinuity at \(x=3\).
- Step 3: At \(x=-3\): Numerator \(|-3-3|=6 \neq 0\), denominator \(\to 0\). As \(x \to -3^+\), \(x+3 \to 0^+\), \(x-3 \to -6\), so \(H(x) \to \frac{6}{(-6)(0^+)} \to -\infty\). As \(x \to -3^-\), \(x+3 \to 0^-\), \(H(x) \to +\infty\). Infinite discontinuity (vertical asymptote) at \(x=-3\).
- Step 4: Since \(H\) is not defined at \(x=3\) and \(x=-3\), it cannot be continuous there. The quotient rule does not apply at these points because denominator is zero.
- Step 5: Conclusion: Discontinuous at \(x=3\) (jump) and \(x=-3\) (infinite). Continuous everywhere else (algebra of continuous functions on \(\mathbb{R}\setminus\{-3,3\}\)).

REASONING: The function is a quotient of \(|x-3|\) (continuous everywhere) and \(x^2-9\) (continuous everywhere). The quotient rule guarantees continuity only where denominator \(\neq 0\). At the excluded points, we must analyse limits directly. The absolute value creates different one-sided expressions, leading to a jump at \(x=3\); at \(x=-3\) the numerator is non-zero causing infinite limits.

ANSWER: Discontinuous at \(x=3\) (jump discontinuity) and \(x=-3\) (infinite discontinuity). Continuous on \(\mathbb{R}\setminus\{-3,3\}\).

## WORKED_EXAMPLE_3
PROBLEM: Let \(f(x) = \sin(x^2)\) and \(g(x) = \sqrt{x}\). Determine the continuity of the composite function \(h(x) = g(f(x)) = \sqrt{\sin(x^2)}\). Find its exact domain of continuity.

STEPS:
- Step 1: Identify inner and outer functions: \(f(x)=\sin(x^2)\) (inner), \(g(u)=\sqrt{u}\) (outer).
- Step 2: Check continuity of \(f\): \(x^2\) is continuous on \(\mathbb{R}\); \(\sin u\) is continuous on \(\mathbb{R}\). By composition theorem, \(f(x)=\sin(x^2)\) is continuous on \(\mathbb{R}\).
- Step 3: Check continuity of \(g\): \(\sqrt{u}\) is continuous for \(u \geq 0\) (domain \([0,\infty)\)).
- Step 4: Apply composition theorem: \(h = g \circ f\) is continuous at \(x=c\) if \(f\) is continuous at \(c\) and \(g\) is continuous at \(f(c)\). This requires \(f(c) \geq 0\) i.e., \(\sin(c^2) \geq 0\).
- Step 5: Solve \(\sin(c^2) \geq 0\). \(\sin \theta \geq 0\) when \(\theta \in [2k\pi, (2k+1)\pi], k \in \mathbb{Z}\). Thus \(c^2 \in [2k\pi, (2k+1)\pi]\). Since \(c^2 \geq 0\), we need \(k \geq 0\). For each \(k \geq 0\), \(c \in [-\sqrt{(2k+1)\pi}, -\sqrt{2k\pi}] \cup [\sqrt{2k\pi}, \sqrt{(2k+1)\pi}]\).
- Step 6: Domain of continuity: Union of these intervals. At endpoints where \(\sin(c^2)=0\), \(g\) is continuous (right-continuous at 0), so \(h\) is continuous there.
- Step 7: Conclusion: \(h\) is continuous on the set \(\{x \in \mathbb{R} \mid \sin(x^2) \geq 0\}\). It is not defined (hence not continuous) where \(\sin(x^2) < 0\).

REASONING: The composition theorem requires the outer function to be continuous at the image of the inner function. Here \(g(u)=\sqrt{u}\) is only continuous for \(u \geq 0\), so we must restrict the domain to where \(\sin(x^2) \geq 0\). This is a classic JEE-style problem where the domain of the composite is not all reals even though the inner function is continuous everywhere.

ANSWER: \(h(x) = \sqrt{\sin(x^2)}\) is continuous on \(\bigcup_{k=0}^{\infty} \left[-\sqrt{(2k+1)\pi}, -\sqrt{2k\pi}\right] \cup \left[\sqrt{2k\pi}, \sqrt{(2k+1)\pi}\right]\). Discontinuous (undefined) elsewhere.

## COMPETENCY_QUESTION_1
QUESTION: A physics student models the velocity of a particle as \(v(t) = \frac{t^2 - 4}{t-2}\) for \(t \neq 2\) and \(v(2) = 5\). They claim the velocity function is continuous at \(t=2\) because "the formula simplifies to \(t+2\) which is continuous". Evaluate this claim. Is the particle's velocity continuous at \(t=2\)? If not, what value should \(v(2)\) be to make it continuous? Explain the physical interpretation of the discontinuity.

COMPETENCY: Error identification and correction; connecting mathematical continuity to physical motion.

STEPS:
- Step 1: Simplify \(v(t) = \frac{(t-2)(t+2)}{t-2} = t+2\) for \(t \neq 2\).
- Step 2: Compute \(\lim_{t \to 2} v(t) = 4\).
- Step 3: Compare with \(v(2)=5\). Since limit \(\neq\) value, \(v\) is discontinuous at \(t=2\).
- Step 4: To make continuous, set \(v(2)=4\).
- Step 5: Physical interpretation: A jump in velocity at \(t=2\) implies infinite acceleration (force), which is unphysical. The model must be corrected.

ANSWER: The claim is false. \(v(t)\) has a removable discontinuity at \(t=2\) because \(v(2)=5 \neq \lim_{t\to2}v(t)=4\). To make it continuous, define \(v(2)=4\). Physically, a discontinuous velocity would require an infinite force at that instant, which is impossible for a real particle.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The temperature (in °C) in a greenhouse over a 24-hour period is modeled by \(T(t) = 20 + 5\sin\left(\frac{\pi t}{12}\right) + \frac{10}{1+(t-12)^2}\), where \(t\) is time in hours from midnight. The gardener wants to know if there is any time when the temperature changes abruptly (discontinuity). Use the algebra of continuous functions to prove that \(T(t)\) is continuous for all \(t \in [0,24]\). Then, find the maximum temperature and the time it occurs (you may use calculus or observation).

COMPETENCY: Translating real-world situations to mathematical expressions; applying continuity theorems to a multi-term function; optimization.

STEPS:
- Step 1: Identify components: \(20\) (constant), \(5\sin(\frac{\pi t}{12})\) (composition of polynomial and sine), \(\frac{10}{1+(t-12)^2}\) (quotient of constant and polynomial).
- Step 2: Argue continuity: Constant continuous everywhere. \(\frac{\pi t}{12}\) is polynomial → continuous. \(\sin u\) continuous everywhere → composition continuous. Denominator \(1+(t-12)^2 \geq 1 > 0\) → quotient continuous.
- Step 3: Sum of continuous functions is continuous → \(T(t)\) continuous on \([0,24]\).
- Step 4: Find maximum: Derivative \(T'(t) = 5\cos(\frac{\pi t}{12})\cdot\frac{\pi}{12} + 10\cdot\frac{-2(t-12)}{(1+(t-12)^2)^2}\). Set to zero... (or observe: sine max at \(t=6\), rational term max at \(t=12\)). Maximum occurs near \(t=6\)? Actually evaluate at critical points and endpoints.
- Step 5: Compute \(T(6)=20+5(1)+\frac{10}{1+36}=25+\frac{10}{37}\approx 25.27\). \(T(12)=20+0+10=30\). \(T(0)=20+0+\frac{10}{145}\approx 20.07\). \(T(24)=20+0+\frac{10}{145}\approx 20.07\). Maximum is 30°C at \(t=12\) (noon).

ANSWER: \(T(t)\) is continuous on \([0,24]\) because it is a sum of functions each continuous on \(\mathbb{R}\) (denominator never zero). Maximum temperature is 30°C at \(t=12\) (noon).

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: This follows directly from the ______ limit laws.

## DIAGNOSTIC_ANSWER_7
corresponding

Corresponding is the inheritance clause: each continuity rule is the limit law of the same operation, translated from limits to functions. **A wrong answer (an approximate) reveals the student has weakened a proven inheritance into a rule of thumb.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are designing a fare calculator for a Delhi Metro ride: the base fare is a ______ function of distance, a surcharge is a rational function of peak hours, and a discount is an absolute-value function of a smart-card balance.

## DIAGNOSTIC_ANSWER_8
polynomial

The polynomial is the safe ingredient: base fares as polynomials are continuous everywhere, one certification covering the largest slab of the fare. **A wrong answer (a rational word) reveals the student has planted denominators in the piece the walkthrough keeps whole.**

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can state and apply the four algebraic operations and the composition theorem for continuous functions to determine continuity of combined functions (polynomials, rationals, trigonometric, absolute value, etc.) without recomputing limits from first principles.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Imagine you are designing a fare ______ for a Delhi Metro ride: the base fare is a polynomial function of distance, a surcharge is a rational function of peak hours, and a discount is an absolute-value function of a smart-card balance.

## DIAGNOSTIC_ANSWER_10
calculator

The calculator is the blend: three certified ingredients and the algebra rules are all a fare machine needs to promise no jumps. **A wrong answer (a chart) reveals the student has printed the fares instead of proving the function that prints them.**
