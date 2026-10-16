## ELI5
Imagine you have a rectangular garden and you want to measure its area. If the garden has a weird curved edge instead of a straight one, you can't just multiply length by breadth. Definite integrals measure that curved area. The "properties" are like shortcuts: Property 4 says if you flip the garden left-to-right, the area stays the same. Property 7 says if the garden is perfectly symmetric (like a butterfly), you only need to measure half and double it. The most common mix-up? Students apply Property 7 (symmetry) to functions that *look* symmetric but aren't — like $f(x)=x^2$ on $[-2, 1]$ — forgetting the *limits* must be symmetric about the y-axis ($[-a, a]$) for even/odd rules to work.

## DEFINITION
Properties of definite integrals are algebraic and geometric rules that allow simplification of $\int_a^b f(x) dx$ without finding the antiderivative explicitly, including independence of dummy variable (P1), reversal of limits (P2), additivity over intervals (P3), King's property (P4: $\int_a^b f(x) dx = \int_a^b f(a+b-x) dx$), reflection about y-axis (P5: $\int_0^a f(x) dx = \int_0^a f(a-x) dx$), periodic/symmetric interval splitting (P6, P7), and even/odd function simplification over symmetric limits (P8).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must correctly identify which property (P1–P8) applies to a given definite integral, execute the required substitution/limit change with correct sign handling, and simplify the integral to a solvable form or a known value, demonstrating this on at least 3 distinct problem types (e.g., King's property for rational/trig integrals, even/odd for polynomial/trig, additivity for piecewise/absolute value functions).

## SCOPE_BOUNDARY
This node covers the 8 standard properties of definite integrals (P1–P8) as listed in NCERT Class 12 Applied Mathematics Chapter 4 (Section 3.6), their proofs via the Fundamental Theorem of Calculus, and their application to evaluate integrals involving polynomials, rational functions, trigonometric functions, absolute values, and greatest integer functions. It does NOT cover reduction formulas, Beta/Gamma functions, Leibniz rule (differentiation under integral sign), or improper integrals — these are beyond the CBSE Applied Mathematics syllabus.

## WALKTHROUGH
You're given $\int_0^\pi \frac{x \sin x}{1+\cos^2 x} dx$. Direct integration looks impossible — the $x$ in the numerator ruins standard substitutions. But notice the limits $0$ to $\pi$ and the structure $f(x)$ vs $f(\pi-x)$. This is the classic setup for **King's Property (P4)**: $\int_a^b f(x) dx = \int_a^b f(a+b-x) dx$. Let $I = \int_0^\pi \frac{x \sin x}{1+\cos^2 x} dx$. Replace $x \to \pi - x$: $\sin(\pi-x)=\sin x$, $\cos(\pi-x)=-\cos x \Rightarrow \cos^2(\pi-x)=\cos^2 x$. So $I = \int_0^\pi \frac{(\pi-x)\sin x}{1+\cos^2 x} dx$. Add the two expressions for $I$: $2I = \pi \int_0^\pi \frac{\sin x}{1+\cos^2 x} dx$. Now substitute $\cos x = t$, $-\sin x dx = dt$, limits $1 \to -1$. The integral becomes elementary. The key insight: **symmetry in limits + algebraic manipulation of the integrand via substitution = simplification without antiderivative of the original function.**

Takeaway: mastery means the fitting property recognised and the symmetry substitution executed cleanly. Exam moves: identification questions name the applicable property among the eight; execution questions perform the reflection and add the two forms of the integral; simplification questions reduce the fused integral to a standard substitution. Method: symmetric limits invite the king's move — replace the variable, add the twin, and watch the awkward factor vanish. Drill: one trigonometric fraction, one reflected twin, one elementary remainder. No antiderivative of the original was ever needed; symmetry did the integration.

## DIAGNOSTIC_QUESTION_1
State Property 4 (King's Property) of definite integrals in your own words, including the substitution used and the condition on limits.

## DIAGNOSTIC_ANSWER_1
**Correct Answer:** Property 4 states $\int_a^b f(x) dx = \int_a^b f(a+b-x) dx$. It is proved by substituting $t = a+b-x$, so $dt = -dx$. When $x=a$, $t=b$; when $x=b$, $t=a$. The integral becomes $\int_b^a f(t)(-dt) = \int_a^b f(t) dt = \int_a^b f(x) dx$ (by P1). **Wrong Answer Reveals:** If a student writes $t = b-x$ or forgets the sign change $dt = -dx$, they confuse P4 with P5 ($a=0$ case) or misunderstand the limit reversal. If they omit the "dummy variable" step (P1), they don't grasp why $\int_a^b f(t) dt = \int_a^b f(x) dx$.

## DIAGNOSTIC_QUESTION_2
Explain why $\int_{-2}^2 (x^3 + x) dx = 0$ without computing the antiderivative. Which property applies, and what condition must the function satisfy?

## DIAGNOSTIC_ANSWER_2
**Correct Answer:** Property 8 applies: $\int_{-a}^a f(x) dx = 0$ if $f(x)$ is **odd** ($f(-x) = -f(x)$). Here $f(x)=x^3+x$, $f(-x) = -x^3 - x = -f(x)$, and limits are symmetric $[-2, 2]$. **Wrong Answer Reveals:** If a student says "because it's symmetric" without specifying *odd* function and *symmetric limits about 0*, they confuse even/odd symmetry. If they claim $\int_{-a}^a f(x) dx = 2\int_0^a f(x) dx$ (even function rule), they misidentify parity. Many forget the limits *must* be $[-a, a]$; $\int_{-1}^2 (x^3+x) dx \neq 0$.

## DIAGNOSTIC_QUESTION_3
Evaluate $\int_0^4 |x-2| dx$ using Property 3 (additivity). Show the split point and both sub-integrals.

## DIAGNOSTIC_ANSWER_3
**Correct Answer:** $|x-2|$ changes definition at $x=2$. By P3: $\int_0^4 |x-2| dx = \int_0^2 |x-2| dx + \int_2^4 |x-2| dx$. On $[0,2]$, $x-2 \le 0 \Rightarrow |x-2| = 2-x$. On $[2,4]$, $x-2 \ge 0 \Rightarrow |x-2| = x-2$. So $I = \int_0^2 (2-x) dx + \int_2^4 (x-2) dx = [2x - x^2/2]_0^2 + [x^2/2 - 2x]_2^4 = (4-2) + (8-8 - (2-4)) = 2 + 2 = 4$. **Wrong Answer Reveals:** If a student splits at $x=0$ or $x=4$ (the limits), they don't understand the split must be at the *point where the integrand changes behaviour* (here $x=2$). If they write $|x-2| = x-2$ everywhere, they ignore the definition of absolute value. If they forget to change the integrand in each sub-interval, they treat $|x-2|$ as a single algebraic expression.

## DIAGNOSTIC_QUESTION_4
Compare the use of Property 4 (King's) and Property 5 (Reflection) for $\int_0^\pi x f(\sin x) dx$. When would you choose one over the other?

## DIAGNOSTIC_ANSWER_4
**Correct Answer:** P4 uses $x \to a+b-x = \pi - x$; P5 uses $x \to a-x$ but **only works when lower limit is 0** (here $a=\pi$). For $\int_0^\pi x f(\sin x) dx$, P4 gives $I = \int_0^\pi (\pi-x) f(\sin(\pi-x)) dx = \int_0^\pi (\pi-x) f(\sin x) dx$ since $\sin(\pi-x)=\sin x$. Adding: $2I = \pi \int_0^\pi f(\sin x) dx$. P5 would give $x \to \pi - x$ (same substitution!) because $a=\pi$, so P5 *reduces to P4* when $a=b$ in P4? Wait — P5 is $\int_0^a f(x) dx = \int_0^a f(a-x) dx$. Here the integrand is $x f(\sin x)$, not $f(x)$. P5 applies to the *whole integrand* as $f(x)$. If we set $g(x) = x f(\sin x)$, P5 gives $\int_0^\pi g(x) dx = \int_0^\pi g(\pi-x) dx = \int_0^\pi (\pi-x) f(\sin(\pi-x)) dx$ — identical to P4. **So for limits $[0, a]$, P4 and P5 are equivalent.** P4 is more general (works for any $[a,b]$); P5 is a special case. Choose P4 always — it's the "King" for a reason. **Wrong Answer Reveals:** If a student thinks P5 is different or "simpler" for $[0,a]$, they don't see P5 $\subset$ P4. If they try P5 on $[a,b]$ with $a \neq 0$, they misapply the property.

## DIAGNOSTIC_QUESTION_5
A student claims: "For any continuous $f$, $\int_0^{2a} f(x) dx = 2\int_0^a f(x) dx$." Is this true? If not, give a counterexample and state the correct Property 7 condition.

## DIAGNOSTIC_ANSWER_5
**Correct Answer:** **False.** Counterexample: $f(x)=x$, $a=1$. $\int_0^2 x dx = [x^2/2]_0^2 = 2$. But $2\int_0^1 x dx = 2 \cdot [x^2/2]_0^1 = 1 \neq 2$. Property 7 states: $\int_0^{2a} f(x) dx = 2\int_0^a f(x) dx$ **only if** $f(2a-x) = f(x)$ (symmetry about $x=a$). For $f(x)=x$, $f(2-x)=2-x \neq x$. The correct condition is symmetry about the *midpoint* $x=a$, not the y-axis. **Wrong Answer Reveals:** If the student confuses this with Property 8 (even function on $[-a,a]$), they mix up "symmetry about y-axis" ($f(-x)=f(x)$) with "symmetry about $x=a$" ($f(2a-x)=f(x)$). Many memorize "$2\int_0^a$" without the condition $f(2a-x)=f(x)$.

## DIAGNOSTIC_QUESTION_6
Create a definite integral problem (with limits and integrand) that *requires* Property 4 (King's Property) to solve elegantly, but would be extremely messy via direct antiderivative. Explain why your problem fits.

## DIAGNOSTIC_ANSWER_6
**Good Answer Example:** $I = \int_0^{\pi/2} \frac{\sin^2 x}{\sin^2 x + \cos^2 x} dx$ — wait, that's trivial ($\sin^2+\cos^2=1$). Better: $I = \int_0^{\pi/2} \frac{\sin^3 x}{\sin^3 x + \cos^3 x} dx$. Direct integration requires partial fractions of $\tan^3 x$ etc. Using P4: $x \to \pi/2 - x$, $\sin \leftrightarrow \cos$. $I = \int_0^{\pi/2} \frac{\cos^3 x}{\cos^3 x + \sin^3 x} dx$. Add: $2I = \int_0^{\pi/2} 1 dx = \pi/2 \Rightarrow I = \pi/4$. **Why it fits:** The limits $[0, \pi/2]$ are symmetric for $\sin \leftrightarrow \cos$ swap. The integrand is a rational function of $\sin x, \cos x$ where numerator/denominator swap under $x \to \pi/2 - x$. Direct antiderivative is messy (Weierstrass substitution); P4 exploits symmetry to avoid it entirely. **Poor Answer Reveals:** If the student gives an integral solvable by simple substitution (e.g., $\int_0^1 x(1-x) dx$) or where P4 doesn't simplify (e.g., $\int_0^\pi x \cos x dx$ — P4 gives $\int_0^\pi (\pi-x)(-\cos x) dx$, adding yields $\pi \int_0^\pi \cos x dx = 0$, but direct integration by parts is equally easy), they don't recognize the *signature pattern*: rational trig functions on $[0, \pi/2]$ or $[0, \pi]$ with $\sin/\cos$ symmetry.

## COMMON_MISCONCEPTION
**The "Blind Symmetry" Error:** Students apply Property 8 (even/odd) to $\int_{-a}^a f(x) dx$ by checking only $f(-x) = \pm f(x)$ but **forgetting the limits must be exactly $[-a, a]$**. Example: $\int_{-1}^2 x^3 dx$. Student sees $x^3$ is odd, writes answer $0$. Correct: $\int_{-1}^2 x^3 dx = [x^4/4]_{-1}^2 = 4 - 1/4 = 15/4 \neq 0$. **Why it happens:** The textbook states "$\int_{-a}^a f(x) dx = 0$ if $f$ is odd" — students memorise the formula but miss the quantifier "for limits $[-a, a]$". They don't connect the *geometry* (area cancellation left/right of y-axis) to the *algebra* (limits). Similarly, for Property 7, they apply $\int_0^{2a} f(x) dx = 2\int_0^a f(x) dx$ without verifying $f(2a-x)=f(x)$, confusing "midpoint symmetry" with "y-axis symmetry".

## ON_FAILURE
1. **Revisit the geometric meaning:** Draw $y=f(x)$ on $[-a,a]$ for odd $f$ — shade area left (negative) and right (positive) of y-axis. Show they cancel *only* if limits are symmetric. 2. **Drill limit-checking:** Give 5 integrals (e.g., $\int_{-2}^3 x^3 dx$, $\int_0^4 (x-2)^3 dx$, $\int_1^3 (x-2)^3 dx$) — student must state "Property 8 applies? Yes/No" and *why* (limits symmetric? function odd/even about midpoint?). 3. **Re-derive P7 from P6:** Let $I = \int_0^{2a} f(x) dx = \int_0^a f(x) dx + \int_a^{2a} f(x) dx$. In second integral, put $x = 2a-t$. Show $I = \int_0^a f(x) dx + \int_0^a f(2a-t) dt$. Now the condition $f(2a-x)=f(x)$ makes the second integral equal the first. 4. **Re-diagnostic:** Ask student to evaluate $\int_{-2}^1 |x| dx$ using P3 (split at 0) and explain why P8 fails.

## PREREQUISITE_NODE_IDS
c12_app_cbse_04_006, c11_app_cbse_08_007, c11_app_cbse_08_008

## PREREQUISITE_REASONS
c12_app_cbse_04_006: Definite Integral — provides the definition of $\int_a^b f(x) dx$, Fundamental Theorem of Calculus (FTC), and evaluation via antiderivatives; all properties are proved using FTC.
c11_app_cbse_08_007: Continuity of a function — properties P1–P8 assume $f$ is continuous on $[a,b]$ (or piecewise continuous for P3); understanding continuity ensures valid application.
c11_app_cbse_08_008: Instantaneous rate of change and derivative — FTC links derivative and integral; the proofs of properties rely on $F'(x)=f(x)$ where $F$ is an antiderivative.

## FORWARD_NODE_IDS
c12_app_cbse_04_008

## FORWARD_REASONS
c12_app_cbse_04_008: Consumers' Surplus and Producers' Surplus — requires evaluating definite integrals of demand/supply functions; properties (especially P3 for piecewise linear functions, P4/P8 for symmetric demand curves) simplify these calculations.

## CROSS_SUBJECT_PREREQS
c11_app_cbse_12_005, c11_app_cbse_12_006

## CROSS_SUBJECT_REASONS
c11_app_cbse_12_005: Circle — the equation $x^2+y^2=a^2$ gives $y=\sqrt{a^2-x^2}$ (even function); area of circle $= 4\int_0^a \sqrt{a^2-x^2} dx$ uses P8 (even function on $[-a,a]$) and P3 (quadrant symmetry).
c11_app_cbse_12_006: Properties of Circles — chord lengths, sector areas, and segment areas involve integrals of $\sqrt{a^2-x^2}$ or trigonometric substitutions where P4/P5 simplify $\int_0^{\pi/2} \sin^n x \cos^m x dx$ type integrals common in circle geometry.

## CHAIN_DESCRIPTION
c12_app_cbse_04_006 -> c12_app_cbse_04_007 -> c12_app_cbse_04_008

## THIS_FORMULA
P1: $\int_a^b f(x) dx = \int_a^b f(t) dt$ | P2: $\int_a^b f(x) dx = -\int_b^a f(x) dx$ | P3: $\int_a^b f(x) dx = \int_a^c f(x) dx + \int_c^b f(x) dx$ | P4: $\int_a^b f(x) dx = \int_a^b f(a+b-x) dx$ | P5: $\int_0^a f(x) dx = \int_0^a f(a-x) dx$ | P6: $\int_0^{2a} f(x) dx = \int_0^a f(x) dx + \int_0^a f(2a-x) dx$ | P7: $\int_0^{2a} f(x) dx = \begin{cases} 2\int_0^a f(x) dx & \text{if } f(2a-x)=f(x) \\ 0 & \text{if } f(2a-x)=-f(x) \end{cases}$ | P8: $\int_{-a}^a f(x) dx = \begin{cases} 2\int_0^a f(x) dx & \text{if } f(-x)=f(x) \text{ (even)} \\ 0 & \text{if } f(-x)=-f(x) \text{ (odd)} \end{cases}$

## FORMULA_VARIABLES
$a, b, c$: real numbers with $a < c < b$ (limits of integration); $f$: real-valued function continuous on the relevant interval; $x, t$: dummy variables of integration; $F$: antiderivative of $f$ ($F'=f$).

## FORMULA_UNITS
Dimensionless (pure mathematical operations); if $f(x)$ has units (e.g., marginal cost in ₹/unit), the integral has units of the quantity (e.g., ₹).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_app_cbse_12_005 | Area of circle via integration uses even-function property (P8) on $[-a,a]$ for $y=\sqrt{a^2-x^2}$
c11_app_cbse_12_006 | Circle sector/segment area problems reduce to $\int_0^{\pi/2} \sin^n \theta \cos^m \theta d\theta$ where King's property (P4) gives standard reduction results

## PREREQ_CONCEPT
Fundamental Theorem of Calculus (FTC) linking $\int_a^b f(x) dx = F(b)-F(a)$ with $F'=f$; every property proof uses this.

## PREREQ_BEFORE
Student must be able to state FTC, find antiderivatives of basic functions (polynomials, trig, exponential, log), and evaluate $\int_a^b f(x) dx$ by computing $F(b)-F(a)$.

## PREREQ_STUCK
If stuck on property proofs, review FTC (c12_app_cbse_04_006) and practice differentiating $F(b)-F(a)$ with respect to limits.

## WORKED_EXAMPLE_1
PROBLEM: Evaluate $I = \int_0^\pi \frac{x}{1+\sin x} dx$ using properties of definite integrals.
STEPS:
- Step 1: Identify the structure — limits $[0, \pi]$, numerator $x$, denominator $1+\sin x$. This suggests King's Property (P4) because $a+b = \pi$ and $\sin(\pi-x) = \sin x$.
- Step 2: Apply P4: $I = \int_0^\pi \frac{\pi-x}{1+\sin(\pi-x)} dx = \int_0^\pi \frac{\pi-x}{1+\sin x} dx$.
- Step 3: Add the original and transformed integrals: $2I = \int_0^\pi \frac{x + \pi - x}{1+\sin x} dx = \pi \int_0^\pi \frac{1}{1+\sin x} dx$.
- Step 4: Simplify the remaining integral: $\int_0^\pi \frac{1}{1+\sin x} dx$. Multiply numerator and denominator by $1-\sin x$: $\int_0^\pi \frac{1-\sin x}{\cos^2 x} dx = \int_0^\pi (\sec^2 x - \sec x \tan x) dx$.
- Step 5: Evaluate: $[\tan x - \sec x]_0^\pi = (\tan \pi - \sec \pi) - (\tan 0 - \sec 0) = (0 - (-1)) - (0 - 1) = 1 + 1 = 2$.
- Step 6: Thus $2I = \pi \cdot 2 = 2\pi \Rightarrow I = \pi$.
REASONING: P4 eliminates the $x$ in the numerator by adding $I$ to its symmetric counterpart. The resulting integral $\int_0^\pi \frac{dx}{1+\sin x}$ is standard and solved by rationalizing the denominator using $1-\sin x$ and $\cos^2 x = 1-\sin^2 x$.
ANSWER: $\pi$

## WORKED_EXAMPLE_2
PROBLEM: Evaluate $I = \int_{-1}^2 |x^3 - x| dx$.
STEPS:
- Step 1: Find where the integrand changes sign. $x^3 - x = x(x-1)(x+1)$. Roots at $x=-1, 0, 1$. On $[-1,2]$, sign changes at $x=-1, 0, 1$.
- Step 2: Apply P3 (additivity) to split at these points: $I = \int_{-1}^0 |x^3-x| dx + \int_0^1 |x^3-x| dx + \int_1^2 |x^3-x| dx$.
- Step 3: Determine sign in each subinterval: 
  - $[-1,0]$: test $x=-0.5 \Rightarrow (-0.5)^3 - (-0.5) = -0.125 + 0.5 > 0 \Rightarrow |x^3-x| = x^3-x$.
  - $[0,1]$: test $x=0.5 \Rightarrow 0.125 - 0.5 < 0 \Rightarrow |x^3-x| = -(x^3-x) = x - x^3$.
  - $[1,2]$: test $x=1.5 \Rightarrow 3.375 - 1.5 > 0 \Rightarrow |x^3-x| = x^3-x$.
- Step 4: Write integrals without absolute value: 
  $I = \int_{-1}^0 (x^3-x) dx + \int_0^1 (x-x^3) dx + \int_1^2 (x^3-x) dx$.
- Step 5: Compute each:
  $\int_{-1}^0 (x^3-x) dx = [x^4/4 - x^2/2]_{-1}^0 = 0 - (1/4 - 1/2) = 1/4$.
  $\int_0^1 (x-x^3) dx = [x^2/2 - x^4/4]_0^1 = 1/2 - 1/4 = 1/4$.
  $\int_1^2 (x^3-x) dx = [x^4/4 - x^2/2]_1^2 = (4 - 2) - (1/4 - 1/2) = 2 + 1/4 = 9/4$.
- Step 6: Sum: $I = 1/4 + 1/4 + 9/4 = 11/4$.
REASONING: Absolute value integrals require splitting at roots (P3). The sign analysis in each subinterval is crucial — students often guess signs incorrectly. Testing a point in each interval is reliable.
ANSWER: $11/4$

## WORKED_EXAMPLE_3
PROBLEM: Show that $\int_0^{\pi/2} \log(\sin x) dx = \int_0^{\pi/2} \log(\cos x) dx = -\frac{\pi}{2} \log 2$.
STEPS:
- Step 1: Let $I = \int_0^{\pi/2} \log(\sin x) dx$. Apply P5 (or P4 with $a=0, b=\pi/2$): substitute $x \to \pi/2 - x$. Then $\sin(\pi/2-x) = \cos x$. So $I = \int_0^{\pi/2} \log(\cos x) dx$. This proves the first equality.
- Step 2: Now add the two forms: $2I = \int_0^{\pi/2} [\log(\sin x) + \log(\cos x)] dx = \int_0^{\pi/2} \log(\sin x \cos x) dx$.
- Step 3: Use $\sin x \cos x = \frac{1}{2} \sin 2x$: $2I = \int_0^{\pi/2} \log(\frac{1}{2} \sin 2x) dx = \int_0^{\pi/2} [\log(\sin 2x) - \log 2] dx$.
- Step 4: Split using P3: $2I = \int_0^{\pi/2} \log(\sin 2x) dx - \log 2 \int_0^{\pi/2} dx = \int_0^{\pi/2} \log(\sin 2x) dx - \frac{\pi}{2} \log 2$.
- Step 5: Evaluate $J = \int_0^{\pi/2} \log(\sin 2x) dx$. Substitute $2x = t \Rightarrow dx = dt/2$. Limits: $x=0 \to t=0$, $x=\pi/2 \to t=\pi$. So $J = \frac{1}{2} \int_0^\pi \log(\sin t) dt$.
- Step 6: Split $J$ at $\pi/2$ using P3: $J = \frac{1}{2} [\int_0^{\pi/2} \log(\sin t) dt + \int_{\pi/2}^\pi \log(\sin t) dt]$. In the second integral, put $t = \pi - u \Rightarrow \sin(\pi-u)=\sin u$, limits $\pi/2 \to 0$, $dt = -du$: $\int_{\pi/2}^\pi \log(\sin t) dt = \int_0^{\pi/2} \log(\sin u) du = I$.
- Step 7: Thus $J = \frac{1}{2}(I + I) = I$. Substitute back: $2I = I - \frac{\pi}{2} \log 2 \Rightarrow I = -\frac{\pi}{2} \log 2$.
REASONING: This classic problem chains P4/P5 (symmetry), P3 (additivity), substitution, and algebraic manipulation of logarithms. The key is recognizing $\int_0^\pi \log(\sin x) dx = 2\int_0^{\pi/2} \log(\sin x) dx$ via symmetry of $\sin x$ about $\pi/2$.
ANSWER: $-\frac{\pi}{2} \log 2$

## COMPETENCY_QUESTION_1
QUESTION: The marginal cost function for producing $x$ units of a product is $MC(x) = 3x^2 - 12x + 15$ (in ₹/unit). The fixed cost is ₹100. The production runs from $x=0$ to $x=4$. A student claims the total variable cost is $\int_0^4 MC(x) dx = \int_0^2 MC(x) dx + \int_2^4 MC(x) dx$ and that because $MC(x)$ is a quadratic, the two integrals are equal. Is the student correct? Justify using properties of definite integrals.
COMPETENCY: Analytical reasoning with property application (P3, P7) and quadratic symmetry.
STEPS:
- Step 1: Compute $\int_0^4 (3x^2 - 12x + 15) dx$ directly: $[x^3 - 6x^2 + 15x]_0^4 = 64 - 96 + 60 = 28$.
- Step 2: Check if $MC(x)$ satisfies $f(4-x) = f(x)$ for P7 on $[0,4]$ (here $2a=4 \Rightarrow a=2$). $MC(4-x) = 3(4-x)^2 - 12(4-x) + 15 = 3(16 - 8x + x^2) - 48 + 12x + 15 = 48 - 24x + 3x^2 - 48 + 12x + 15 = 3x^2 - 12x + 15 = MC(x)$. Yes, symmetric about $x=2$.
- Step 3: By P7, since $f(2a-x)=f(x)$ with $a=2$, $\int_0^4 MC(x) dx = 2\int_0^2 MC(x) dx$. So the two halves ARE equal.
- Step 4: Verify: $\int_0^2 (3x^2 - 12x + 15) dx = [x^3 - 6x^2 + 15x]_0^2 = 8 - 24 + 30 = 14$. Twice is $28$. Matches.
- Step 5: Conclusion: The student is **correct** — the quadratic $MC(x)$ has its vertex at $x=2$ (since $MC'(x)=6x-12=0 \Rightarrow x=2$), making it symmetric about $x=2$ on $[0,4]$, so P7 applies.
ANSWER: Yes, the student is correct. $MC(x)$ is symmetric about $x=2$ (vertex of parabola), so $\int_0^4 MC(x) dx = 2\int_0^2 MC(x) dx$ by Property 7.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A competitive exam question asks: "Evaluate $\int_0^\pi \frac{x \tan x}{\sec x + \tan x} dx$." A student attempts direct integration by parts and gets stuck. Show how to solve this elegantly using King's Property (P4) and a trigonometric identity. What is the final answer?
COMPETENCY: Problem-solving with strategic property selection (P4) and trigonometric manipulation — JEE/NEET style.
STEPS:
- Step 1: Let $I = \int_0^\pi \frac{x \tan x}{\sec x + \tan x} dx$. Limits $[0, \pi]$ suggest P4: $x \to \pi - x$.
- Step 2: Apply P4: $I = \int_0^\pi \frac{(\pi-x) \tan(\pi-x)}{\sec(\pi-x) + \tan(\pi-x)} dx = \int_0^\pi \frac{(\pi-x) (-\tan x)}{-\sec x - \tan x} dx = \int_0^\pi \frac{(\pi-x) \tan x}{\sec x + \tan x} dx$ (since $\tan(\pi-x)=-\tan x$, $\sec(\pi-x)=-\sec x$).
- Step 3: Add the two expressions: $2I = \int_0^\pi \frac{\pi \tan x}{\sec x + \tan x} dx = \pi \int_0^\pi \frac{\tan x}{\sec x + \tan x} dx$.
- Step 4: Simplify the integrand: Multiply numerator and denominator by $\sec x - \tan x$: $\frac{\tan x (\sec x - \tan x)}{\sec^2 x - \tan^2 x} = \tan x (\sec x - \tan x) = \sec x \tan x - \tan^2 x$.
- Step 5: Use $\tan^2 x = \sec^2 x - 1$: Integrand $= \sec x \tan x - (\sec^2 x - 1) = \sec x \tan x - \sec^2 x + 1$.
- Step 6: Integrate from $0$ to $\pi$: $\int_0^\pi (\sec x \tan x - \sec^2 x + 1) dx = [\sec x - \tan x + x]_0^\pi$.
- Step 7: Evaluate: At $x=\pi$: $\sec \pi - \tan \pi + \pi = -1 - 0 + \pi = \pi - 1$. At $x=0$: $\sec 0 - \tan 0 + 0 = 1 - 0 = 1$. Difference $= (\pi - 1) - 1 = \pi - 2$.
- Step 8: So $2I = \pi(\pi - 2) \Rightarrow I = \frac{\pi(\pi-2)}{2}$.
REASONING: P4 eliminates $x$ from the numerator. The resulting trigonometric integral is simplified using the identity $\sec^2 x - \tan^2 x = 1$ (multiplying by conjugate), reducing to elementary antiderivatives $\sec x \tan x$ (derivative of $\sec x$) and $\sec^2 x$ (derivative of $\tan x$).
ANSWER: $\frac{\pi(\pi-2)}{2}$
DIFFICULTY: hard