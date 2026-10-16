## ELI5
Definite integrals obey house rules that spare you the antiderivative: flipping the limits flips the sign; an interval splits at any interior point; a symmetric design lets you compute half and double; and the mirror substitution x becomes a plus b minus x leaves the limits untouched while transforming the integrand. Odd functions on symmetric intervals vanish entirely; even ones halve. The Mughal garden's symmetric paving is the picture: measure half, reflect, done.

## DEFINITION
The properties of definite integrals are a set of algebraic and symmetry rules that allow manipulation of definite integrals without explicitly finding antiderivatives. For a continuous function \(f\) on \([a,b]\), these properties include: reversal of limits changes sign (\(\int_a^b f(x)dx = -\int_b^a f(x)dx\)), additivity over intervals (\(\int_a^b f(x)dx = \int_a^c f(x)dx + \int_c^b f(x)dx\)), and symmetry transformations such as \(\int_a^b f(x)dx = \int_a^b f(a+b-x)dx\) and \(\int_0^a f(x)dx = \int_0^a f(a-x)dx\). Even/odd function properties over symmetric intervals \([-a,a]\) yield \(\int_{-a}^a f(x)dx = 2\int_0^a f(x)dx\) (even) or \(0\) (odd). These hold provided \(f\) is integrable on the relevant intervals.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can correctly select and apply the appropriate property (P1–P7) to simplify and evaluate a given definite integral, including breaking intervals at points of discontinuity, exploiting symmetry to reduce computation, and transforming the integrand via substitution \(x \to a+b-x\) or \(x \to a-x\) without changing the limits. The student can also prove each property using the Fundamental Theorem of Calculus or a direct substitution.

## SCOPE_BOUNDARY
This node covers the seven standard properties (P0–P7) of definite integrals as listed in NCERT Section 7.10, including their proofs, applications to evaluation, and combination with basic integration techniques. It does NOT cover integration by substitution for definite integrals (that is node c12_math_cbse_07_011), nor does it cover improper integrals, parametric integrals, or integrals with variable limits (Leibniz rule).

## WALKTHROUGH
Imagine you are an architect designing a symmetrical Mughal garden pathway. The area under the curve \(y = f(x)\) from \(x=0\) to \(x=10\) represents the paving stones needed. If the design is symmetric about \(x=5\), you only need to calculate stones for half the path and double it — this is the even-function property in action. To begin any problem: (1) Identify the limits and the integrand. (2) Check if the limits are symmetric \([-a,a]\) or \([0,a]\) or \([0,2a]\). (3) Test the integrand for even/odd symmetry or for the transformation \(f(a+b-x)\). (4) Apply the matching property to simplify the integral before integrating. (5) Integrate the simplified form using antiderivatives and FTC Part 2. The key insight: properties turn a hard integral into an easy one by changing the function's argument, not by finding a new antiderivative.

Takeaway first: the properties are manipulation levers - reordering limits, splitting intervals, mirroring arguments, and exploiting even or odd symmetry - each provable by substitution or the Fundamental Theorem. Exam moves: selection questions choosing the right property, application questions simplifying before integrating, splitting questions at discontinuities, and proof questions deriving each rule. Method: rerun the garden - limits identified, symmetry tested, the mirror substitution applied, and the simplified half doubled. Check yourself: the variable's name is irrelevant - P zero says x and t integrate identically - so substitution arguments never need permission. Drill: evaluate one symmetric integral two ways and prove one property by substitution.

## DIAGNOSTIC_QUESTION_1
State property P3: \(\int_a^b f(x)dx = \int_a^b f(a+b-x)dx\). Write the substitution used to prove it.

## DIAGNOSTIC_ANSWER_1
The substitution is \(t = a+b-x\), so \(dt = -dx\). When \(x=a\), \(t=b\); when \(x=b\), \(t=a\). Then \(\int_a^b f(x)dx = \int_b^a f(a+b-t)(-dt) = \int_a^b f(a+b-t)dt = \int_a^b f(a+b-x)dx\). A wrong answer (e.g., \(t = x-a\) or forgetting the minus sign) reveals the student does not understand how the limits flip and the differential changes sign, which is the core of the proof.

## DIAGNOSTIC_QUESTION_2
Explain why \(\int_{-2}^2 x^3 dx = 0\) without computing the antiderivative. Which property justifies this?

## DIAGNOSTIC_ANSWER_2
The function \(f(x)=x^3\) is odd because \(f(-x) = -x^3 = -f(x)\). By property P7(ii), \(\int_{-a}^a f(x)dx = 0\) for an odd function. Here \(a=2\). A wrong answer (e.g., saying it's because the function is symmetric) shows confusion between even and odd symmetry; the student must identify the function as odd, not just symmetric.

## DIAGNOSTIC_QUESTION_3
Evaluate \(\int_0^{\pi} \frac{x \sin x}{1+\cos^2 x} dx\) using property P4.

## DIAGNOSTIC_ANSWER_3
Let \(I = \int_0^{\pi} \frac{x \sin x}{1+\cos^2 x} dx\). By P4, \(I = \int_0^{\pi} \frac{(\pi-x) \sin(\pi-x)}{1+\cos^2(\pi-x)} dx = \int_0^{\pi} \frac{(\pi-x) \sin x}{1+\cos^2 x} dx\) (since \(\sin(\pi-x)=\sin x\), \(\cos(\pi-x)=-\cos x\)). Adding the two expressions: \(2I = \int_0^{\pi} \frac{\pi \sin x}{1+\cos^2 x} dx\). Substitute \(t=\cos x\), \(dt = -\sin x dx\): when \(x=0\), \(t=1\); \(x=\pi\), \(t=-1\). Then \(2I = \pi \int_1^{-1} \frac{-dt}{1+t^2} = \pi \int_{-1}^1 \frac{dt}{1+t^2} = \pi [\tan^{-1} t]_{-1}^1 = \pi (\frac{\pi}{4} - (-\frac{\pi}{4})) = \frac{\pi^2}{2}\). So \(I = \frac{\pi^2}{4}\). A wrong answer (e.g., forgetting to change limits in the \(t\)-substitution or misapplying \(\sin(\pi-x)\)) reveals gaps in trigonometric identities combined with property application.

## DIAGNOSTIC_QUESTION_4
Compare the use of P3 and P4. When would you choose P4 over P3? Give an example integral where P4 is directly applicable but P3 would require extra work.

## DIAGNOSTIC_ANSWER_4
P4 is the special case of P3 when \(a=0\) and \(b=a\), i.e., the lower limit is 0. P4 states \(\int_0^a f(x)dx = \int_0^a f(a-x)dx\). Choose P4 when the integral has limits \([0,a]\) because the transformation \(x \to a-x\) is simpler to write and remember. Example: \(\int_0^{\pi/2} \frac{\sin x}{\sin x + \cos x} dx\). Using P4 with \(a=\pi/2\) gives \(\int_0^{\pi/2} \frac{\cos x}{\cos x + \sin x} dx\); adding yields \(\int_0^{\pi/2} 1 dx = \pi/2\), so original integral is \(\pi/4\). Using P3 with \(a=0, b=\pi/2\) gives the same but P4 is more direct. A wrong answer (e.g., saying P3 and P4 are identical) shows the student hasn't recognized the special-case relationship and the efficiency of P4 for \([0,a]\) limits.

## DIAGNOSTIC_QUESTION_5
A student writes: \(\int_{-1}^1 \frac{1}{x^2} dx = \left[ -\frac{1}{x} \right]_{-1}^1 = -1 - 1 = -2\). Evaluate this solution. Is the property P7 applicable? Why or why not?

## DIAGNOSTIC_ANSWER_5
The solution is incorrect because \(f(x)=1/x^2\) is not continuous on \([-1,1]\) (it has an infinite discontinuity at \(x=0\)). The definite integral is improper and diverges. Property P7 requires \(f\) to be integrable on \([-a,a]\); here it is not. The student blindly applied the even-function property (P7(i)) without checking continuity/integrability. A wrong evaluation (e.g., saying the answer is \(-2\) or \(0\)) reveals the student ignores the domain condition for definite integrals and applies properties mechanically.

## DIAGNOSTIC_QUESTION_6
Create a definite integral problem that requires using both P2 (additivity) and P7 (even/odd) to evaluate efficiently. Provide the integrand, limits, and the final answer.

## DIAGNOSTIC_ANSWER_6
Example: Evaluate \(\int_{-2}^2 (|x| + x^3) dx\). Split using P2: \(\int_{-2}^2 |x| dx + \int_{-2}^2 x^3 dx\). \(|x|\) is even, so first integral \(= 2\int_0^2 x dx = 2 \cdot \frac{4}{2} = 4\). \(x^3\) is odd, so second integral \(= 0\). Total \(= 4\). A poor answer would be an integral that doesn't need both properties (e.g., just an even function on \([-a,a]\)), showing the student cannot design a problem that combines concepts.

## COMMON_MISCONCEPTION
Students often apply P3 or P4 by writing \(\int_a^b f(x)dx = \int_a^b f(a+b-x)dx\) but then **forget to change the argument of \(f\) inside the integral** — they keep \(f(x)\) instead of \(f(a+b-x)\). For example, in \(\int_0^{\pi} x f(\sin x) dx\), they write \(\int_0^{\pi} (\pi-x) f(\sin x) dx\) correctly for the factor \((\pi-x)\) but then incorrectly keep \(f(\sin x)\) instead of \(f(\sin(\pi-x)) = f(\sin x)\) (which happens to be the same here, but if it were \(f(\cos x)\) they would need \(f(-\cos x)\)). The error is treating the property as only changing the coefficient outside, not the function's argument.

## ON_FAILURE
1. Revisit the proof of P3 in NCERT (or node c12_math_cbse_07_010 derivation): do the substitution \(t = a+b-x\) step by step, writing \(dt = -dx\), changing limits, and flipping them back using P1. 2. Practice 5 integrals where the argument change matters (e.g., \(\int_0^{\pi} x \cos x dx\), \(\int_0^{\pi/2} \frac{\sin^2 x}{\sin x + \cos x} dx\)). 3. For each, explicitly write: "Let \(I = \int...\). By P3, \(I = \int... f(a+b-x) dx\)." 4. Re-diagnostic: Give the student \(\int_0^{\pi} \frac{x}{1+\sin x} dx\) and ask them to write the transformed integral using P3 without evaluating. Check if they correctly replace \(x\) by \(\pi-x\) **and** \(\sin x\) by \(\sin(\pi-x)\).

## PREREQUISITE_NODE_IDS
c12_math_cbse_07_007, c12_math_cbse_07_008, c12_math_cbse_07_009, c11_math_cbse_13_001, c11_math_cbse_13_006, c12_math_cbse_07_003, c12_math_cbse_07_004

## PREREQUISITE_REASONS
c12_math_cbse_07_007: Definite integral as limit of a sum provides the foundational definition of \(\int_a^b f(x)dx\) as an area/limit.
c12_math_cbse_07_008: FTC Part 1 links the area function to the derivative, essential for understanding why properties hold.
c12_math_cbse_07_009: FTC Part 2 gives the evaluation method \(F(b)-F(a)\) used in proving properties P1–P7.
c11_math_cbse_13_001: Limits are needed to understand the definite integral as a limit of Riemann sums.
c11_math_cbse_13_006: Derivatives and the concept of antiderivative are required for FTC and integration techniques.
c12_math_cbse_07_003: Properties of definite integrals (symmetry, etc.) are applied to integrals of rational functions.  
c12_math_cbse_07_004: Properties of definite integrals (e.g., King's property) combine with integration by parts for symmetric limits.  

## FORWARD_NODE_IDS
c12_math_cbse_07_011
## FORWARD_REASONS
c12_math_cbse_07_011: Evaluation of Definite Integrals by Substitution builds directly on the properties learned here; substitution often changes limits, and properties like P1 (reversal) and P2 (splitting) are used in conjunction with substitution.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_001, c11_math_cbse_13_006
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_001: The concept of a limit underpins the definition of definite integral as area; physics uses limits for instantaneous velocity and work done by variable force.
c11_math_cbse_13_006: Derivatives and antiderivatives are the bridge between differential and integral calculus; in physics, velocity is derivative of position, and displacement is integral of velocity.

## CHAIN_DESCRIPTION
c12_math_cbse_07_009 -> c12_math_cbse_07_010 -> c12_math_cbse_07_011

## THIS_FORMULA
P0: \(\int_a^b f(x)dx = \int_a^b f(t)dt\)
P1: \(\int_a^b f(x)dx = -\int_b^a f(x)dx\), \(\int_a^a f(x)dx = 0\)
P2: \(\int_a^b f(x)dx = \int_a^c f(x)dx + \int_c^b f(x)dx\)
P3: \(\int_a^b f(x)dx = \int_a^b f(a+b-x)dx\)
P4: \(\int_0^a f(x)dx = \int_0^a f(a-x)dx\)
P5: \(\int_0^{2a} f(x)dx = \int_0^a f(x)dx + \int_0^a f(2a-x)dx\)
P6: \(\int_0^{2a} f(x)dx = 2\int_0^a f(x)dx\) if \(f(2a-x)=f(x)\); \(=0\) if \(f(2a-x)=-f(x)\)
P7: \(\int_{-a}^a f(x)dx = 2\int_0^a f(x)dx\) if \(f(-x)=f(x)\); \(=0\) if \(f(-x)=-f(x)\)

## FORMULA_VARIABLES
\(f\) = integrable function; \(a,b,c\) = real numbers with \(a \le c \le b\); \(x,t\) = dummy integration variables; \(2a\) = symmetric upper limit for P5,P6.

## FORMULA_UNITS
dimensionless (properties are algebraic identities; units depend on the specific integral's integrand and variable)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_001 | The limit definition of definite integral is used in physics to derive work done by a variable force \(W = \int F(x)dx\).
c11_math_cbse_13_006 | The antiderivative concept from derivatives is essential for FTC Part 2, which evaluates definite integrals in economics (consumer surplus = \(\int_0^{q^*} D(q)dq - p^*q^*\)).
## PREREQ_CONCEPT
Fundamental Theorem of Calculus Part 2 (evaluation of definite integrals via antiderivatives) and the definition of definite integral as a limit of a sum.

## PREREQ_BEFORE
The student must be able to evaluate basic definite integrals using FTC Part 2 and understand the geometric interpretation as signed area.

## PREREQ_STUCK
If stuck, review the proof of FTC Part 2 (node c12_math_cbse_07_009) and practice evaluating \(\int_a^b f(x)dx\) for polynomial, trigonometric, and exponential functions.

## WORKED_EXAMPLE_1
PROBLEM: A water tank has a cross-sectional area that varies with height \(x\) (in metres) as \(A(x) = 4 - x^2\) for \(0 \le x \le 2\). The tank is symmetric about the mid-height \(x=1\). Use property P4 to find the total volume of the tank from \(x=0\) to \(x=2\) by integrating only from \(0\) to \(1\) and doubling, given that \(A(2-x) = A(x)\). (Volume = \(\int_0^2 A(x) dx\))

STEPS:
- Step 1: Recognize the integral is \(V = \int_0^2 (4 - x^2) dx\) with limits \([0,2]\). Here \(2a = 2\) so \(a=1\).
- Step 2: Check symmetry condition for P6: \(f(x) = 4 - x^2\). Compute \(f(2-x) = 4 - (2-x)^2 = 4 - (4 - 4x + x^2) = 4x - x^2\). This is NOT equal to \(f(x)\). So P6 (even about \(x=1\)) does not apply directly.
- Step 3: Instead, use P2 to split at \(x=1\): \(V = \int_0^1 (4-x^2)dx + \int_1^2 (4-x^2)dx\).
- Step 4: For the second integral, apply P3 with \(a=1, b=2\): \(\int_1^2 f(x)dx = \int_1^2 f(3-x)dx\). Here \(f(3-x) = 4 - (3-x)^2 = 4 - (9 - 6x + x^2) = -5 + 6x - x^2\). This doesn't simplify nicely.
- Step 5: Better: just evaluate directly. \(V = \int_0^2 (4-x^2)dx = [4x - x^3/3]_0^2 = (8 - 8/3) - 0 = 16/3 \, \text{m}^3\).
- Step 6: However, the problem states \(A(2-x)=A(x)\) which is false for \(4-x^2\). Correct symmetric area would be \(A(x) = 1 - (x-1)^2 = 2x - x^2\). Then \(V = \int_0^2 (2x-x^2)dx\). Using P6: \(f(2-x) = 2(2-x) - (2-x)^2 = 4-2x - (4-4x+x^2) = 2x - x^2 = f(x)\). So \(V = 2\int_0^1 (2x-x^2)dx = 2[x^2 - x^3/3]_0^1 = 2(1 - 1/3) = 4/3 \, \text{m}^3\).

REASONING: The problem tests whether the student blindly applies P6 or checks the symmetry condition \(f(2a-x)=f(x)\). The correct approach is to verify the condition first. Here the given \(4-x^2\) is not symmetric about \(x=1\); the symmetric version is \(2x-x^2\). P6 only works when the condition holds.

ANSWER: For the symmetric area function \(A(x)=2x-x^2\), volume = \(4/3 \, \text{m}^3\). For the given \(A(x)=4-x^2\), volume = \(16/3 \, \text{m}^3\) (but symmetry property cannot be used).

## WORKED_EXAMPLE_2
PROBLEM: Evaluate \(I = \int_0^{\pi} \frac{x}{1+\sin x} dx\) using property P4.

STEPS:
- Step 1: Identify limits \([0,\pi]\), so \(a=\pi\). Apply P4: \(I = \int_0^{\pi} \frac{\pi-x}{1+\sin(\pi-x)} dx\).
- Step 2: Simplify \(\sin(\pi-x) = \sin x\). So \(I = \int_0^{\pi} \frac{\pi-x}{1+\sin x} dx\).
- Step 3: Add the original and transformed integrals: \(2I = \int_0^{\pi} \frac{x + \pi - x}{1+\sin x} dx = \pi \int_0^{\pi} \frac{dx}{1+\sin x}\).
- Step 4: Evaluate \(J = \int_0^{\pi} \frac{dx}{1+\sin x}\). Multiply numerator and denominator by \(1-\sin x\): \(J = \int_0^{\pi} \frac{1-\sin x}{1-\sin^2 x} dx = \int_0^{\pi} \frac{1-\sin x}{\cos^2 x} dx = \int_0^{\pi} (\sec^2 x - \sec x \tan x) dx\).
- Step 5: Integrate: \(J = [\tan x - \sec x]_0^{\pi}\). But \(\tan x\) and \(\sec x\) are discontinuous at \(\pi/2\)! Use P2: split at \(\pi/2\). \(J = \int_0^{\pi/2} (\sec^2 x - \sec x \tan x) dx + \int_{\pi/2}^{\pi} (\sec^2 x - \sec x \tan x) dx\). Each evaluates to \(1 - 1 = 0\)? Wait, check limits: \(\tan(\pi/2^-)\to\infty\). Better method: use substitution \(t = \tan(x/2)\). Or note \(\int_0^{\pi} \frac{dx}{1+\sin x} = 2\) (known result). Let's do properly: \(\int \frac{dx}{1+\sin x} = \tan x - \sec x + C\)? Derivative of \(\tan x - \sec x = \sec^2 x - \sec x \tan x = \frac{1-\sin x}{\cos^2 x} = \frac{1}{1+\sin x}\). Yes. But at \(\pi/2\) it's improper. Use symmetry: \(\int_0^{\pi} \frac{dx}{1+\sin x} = 2\int_0^{\pi/2} \frac{dx}{1+\sin x}\). On \([0,\pi/2)\), \(\tan x - \sec x\) is continuous. At \(0\): \(0-1=-1\). At \(\pi/2^-\): \(\tan x \to \infty\), \(\sec x \to \infty\), but \(\tan x - \sec x = \frac{\sin x - 1}{\cos x} \to \frac{0}{0}\). Use L'Hôpital or identity: \(\tan x - \sec x = \frac{\sin x - 1}{\cos x} = -\frac{1-\sin x}{\cos x} = -\frac{\cos x}{1+\sin x} \to 0\) as \(x\to\pi/2^-\). So \(\int_0^{\pi/2} = 0 - (-1) = 1\). Thus \(J = 2 \times 1 = 2\).
- Step 6: Therefore \(2I = \pi \times 2 = 2\pi\), so \(I = \pi\).

REASONING: P4 transforms \(x\) into \(\pi-x\), eliminating the linear term when added. The resulting integral \(\int_0^{\pi} \frac{dx}{1+\sin x}\) is evaluated by splitting at the discontinuity (P2) and using the antiderivative \(\tan x - \sec x\) with careful limits. This shows how properties combine with improper integral handling.

ANSWER: \(I = \pi\)

## WORKED_EXAMPLE_3
PROBLEM: Evaluate \(I = \int_{-1}^1 \frac{x^3 + 2x^2 + 3x + 4}{x^2 + 1} dx\) using properties of even/odd functions and polynomial division.

STEPS:
- Step 1: Perform polynomial division: \(\frac{x^3 + 2x^2 + 3x + 4}{x^2 + 1} = x + 2 + \frac{2x + 2}{x^2 + 1}\).
- Step 2: Split the integral using P2 (linearity): \(I = \int_{-1}^1 (x+2) dx + \int_{-1}^1 \frac{2x+2}{x^2+1} dx\).
- Step 3: Split further: \(\int_{-1}^1 x dx + \int_{-1}^1 2 dx + \int_{-1}^1 \frac{2x}{x^2+1} dx + \int_{-1}^1 \frac{2}{x^2+1} dx\).
- Step 4: Apply P7: \(x\) is odd \(\Rightarrow \int_{-1}^1 x dx = 0\). \(\frac{2x}{x^2+1}\) is odd \(\Rightarrow \int_{-1}^1 \frac{2x}{x^2+1} dx = 0\). \(2\) is even \(\Rightarrow \int_{-1}^1 2 dx = 2 \times 2\int_0^1 1 dx = 4 \times 1 = 4\). \(\frac{2}{x^2+1}\) is even \(\Rightarrow \int_{-1}^1 \frac{2}{x^2+1} dx = 2 \times 2\int_0^1 \frac{dx}{x^2+1} = 4 [\tan^{-1} x]_0^1 = 4 \times \frac{\pi}{4} = \pi\).
- Step 5: Sum: \(I = 0 + 4 + 0 + \pi = 4 + \pi\).
- Step 6: Verify by direct antiderivative: \(\int (x+2) dx = x^2/2 + 2x\); \(\int \frac{2x}{x^2+1} dx = \ln(x^2+1)\); \(\int \frac{2}{x^2+1} dx = 2\tan^{-1}x\). Evaluate from \(-1\) to \(1\): \((1/2+2) - (1/2-2) = 4\); \(\ln2 - \ln2 = 0\); \(2(\pi/4 - (-\pi/4)) = \pi\). Total \(4+\pi\). Matches.

REASONING: Polynomial division simplifies the rational function into a polynomial part and a proper fraction. Even/odd properties (P7) eliminate the odd terms over symmetric limits \([-1,1]\), reducing computation. The even terms are doubled over \([0,1]\). This combines algebraic manipulation with integral properties.

ANSWER: \(4 + \pi\)

## COMPETENCY_QUESTION_1
QUESTION: A particle moves along a line with velocity \(v(t) = t^3 - 3t\) m/s for \(t \in [-2, 2]\). Find the total distance travelled by the particle. Use properties of definite integrals to simplify the calculation. Explain why the net displacement is zero but distance is not.

COMPETENCY: Translating real-world situations to mathematical expressions and justifying method choice.

STEPS:
- Step 1: Distance = \(\int_{-2}^2 |v(t)| dt\). Net displacement = \(\int_{-2}^2 v(t) dt\).
- Step 2: \(v(t) = t^3 - 3t\) is odd because \(v(-t) = -t^3 + 3t = -v(t)\). By P7(ii), \(\int_{-2}^2 v(t) dt = 0\). So net displacement = 0.
- Step 3: For distance, need \(|v(t)|\). Find where \(v(t) \ge 0\): \(t(t^2-3) \ge 0\) on \([-2,2]\). Roots at \(t=-\sqrt{3}, 0, \sqrt{3}\). Sign chart: \([-2,-\sqrt{3}]\): negative; \([-\sqrt{3},0]\): positive; \([0,\sqrt{3}]\): negative; \([\sqrt{3},2]\): positive.
- Step 4: Use P2 to split: \(\int_{-2}^2 |v| dt = \int_{-2}^{-\sqrt{3}} -v dt + \int_{-\sqrt{3}}^0 v dt + \int_0^{\sqrt{3}} -v dt + \int_{\sqrt{3}}^2 v dt\).
- Step 5: Notice \(|v(t)|\) is even because \(v\) is odd \(\Rightarrow |v(-t)| = |-v(t)| = |v(t)|\). So distance = \(2 \int_0^2 |v(t)| dt\) by P7(i). Then split \([0,2]\) at \(\sqrt{3}\): \(2\left( \int_0^{\sqrt{3}} -v dt + \int_{\sqrt{3}}^2 v dt \right)\).
- Step 6: Compute \(\int_0^{\sqrt{3}} (3t - t^3) dt + \int_{\sqrt{3}}^2 (t^3 - 3t) dt\). First: \([3t^2/2 - t^4/4]_0^{\sqrt{3}} = 3\cdot3/2 - 9/4 = 9/2 - 9/4 = 9/4\). Second: \([t^4/4 - 3t^2/2]_{\sqrt{3}}^2 = (4 - 6) - (9/4 - 9/2) = -2 - (9/4 - 18/4) = -2 + 9/4 = 1/4\). Sum = \(9/4 + 1/4 = 10/4 = 2.5\). Double = 5 m.

ANSWER: Total distance = 5 m. Net displacement = 0 because \(v(t)\) is odd and integrated over symmetric interval \([-2,2]\) (P7). Distance is non-zero because \(|v(t)|\) is even and positive.

DIFFICULTY: hard

## COMPETENCY_QUESTION_2
QUESTION: Prove that for any integrable function \(f\) on \([0, a]\), \(\int_0^a f(x) dx = \int_0^a f(a-x) dx\) (P4). Then use this to evaluate \(\int_0^{\pi/2} \ln(\sin x) dx\) by showing it equals \(\int_0^{\pi/2} \ln(\cos x) dx\) and adding them to get \(\int_0^{\pi/2} \ln(\sin x \cos x) dx = \int_0^{\pi/2} \ln(\frac{1}{2}\sin 2x) dx\). Simplify using substitution \(u=2x\) and known result \(\int_0^{\pi/2} \ln(\sin x) dx = -\frac{\pi}{2}\ln 2\).

COMPETENCY: Deriving and proving mathematical results; combining multiple concepts (properties, substitution, log properties).

STEPS:
- Step 1: Prove P4: Let \(t = a-x\), then \(dt = -dx\). When \(x=0, t=a\); when \(x=a, t=0\). \(\int_0^a f(x)dx = \int_a^0 f(a-t)(-dt) = \int_0^a f(a-t)dt = \int_0^a f(a-x)dx\).
- Step 2: Let \(I = \int_0^{\pi/2} \ln(\sin x) dx\). By P4 with \(a=\pi/2\), \(I = \int_0^{\pi/2} \ln(\sin(\pi/2 - x)) dx = \int_0^{\pi/2} \ln(\cos x) dx\).
- Step 3: Add: \(2I = \int_0^{\pi/2} \ln(\sin x \cos x) dx = \int_0^{\pi/2} \ln(\frac{1}{2}\sin 2x) dx = \int_0^{\pi/2} [\ln(\sin 2x) - \ln 2] dx\).
- Step 4: Split: \(2I = \int_0^{\pi/2} \ln(\sin 2x) dx - \ln 2 \int_0^{\pi/2} dx = \int_0^{\pi/2} \ln(\sin 2x) dx - \frac{\pi}{2}\ln 2\).
- Step 5: For \(J = \int_0^{\pi/2} \ln(\sin 2x) dx\), substitute \(u=2x\), \(du=2dx\). Limits: \(0 \to \pi\). \(J = \frac{1}{2}\int_0^{\pi} \ln(\sin u) du\). Use P2: \(\int_0^{\pi} \ln(\sin u) du = \int_0^{\pi/2} \ln(\sin u) du + \int_{\pi/2}^{\pi} \ln(\sin u) du\). Second integral: substitute \(v=\pi-u\), becomes \(\int_0^{\pi/2} \ln(\sin v) dv = I\). So \(\int_0^{\pi} \ln(\sin u) du = 2I\). Thus \(J = \frac{1}{2} \cdot 2I = I\).
- Step 6: Substitute back: \(2I = I - \frac{\pi}{2}\ln 2 \Rightarrow I = -\frac{\pi}{2}\ln 2\).

ANSWER: \(\int_0^{\pi/2} \ln(\sin x) dx = -\frac{\pi}{2}\ln 2\). The proof of P4 uses substitution \(t=a-x\). The evaluation combines P4, P2, log properties, and substitution.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The properties of definite integrals are a set of algebraic and symmetry rules that allow manipulation of definite integrals without explicitly finding ______.

## DIAGNOSTIC_ANSWER_7
antiderivatives

Antiderivatives is what the rules spare you: the properties reshape the integral itself before any reverse-differentiation is attempted. **A wrong answer (limits) reveals the student has misfiled the manipulation target - the limits are respected furniture, not the object of change.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: To begin any problem: (1) Identify the limits and the ______.

## DIAGNOSTIC_ANSWER_8
integrand

The integrand completes the inventory: limits and integrand are the two facts to inspect before any property is invoked. **A wrong answer (the area) reveals the student has listed the answer among the inputs.** The integrand completes the pair: limits say where, the integrand says what - both must be inspected before any property fires.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: To begin any problem: (______) Identify the limits and the integrand.

## DIAGNOSTIC_ANSWER_9
1

The first step is numbered one: identify limits and integrand before touching a single property. **A wrong answer (a later number) reveals the student has started the recipe at its middle and skipped the mise en place.** Step one is numbered one: the recipe's first line is always the inventory of limits and integrand.

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
The student can also prove each property using the Fundamental Theorem of Calculus or a direct substitution.

Mastery is the proofs: each property must be derivable by substitution or the Fundamental Theorem, not merely believed. **A wrong answer (application without proof) reveals the student can use the rules but cannot yet show why they are true - which this topic explicitly examines.**
