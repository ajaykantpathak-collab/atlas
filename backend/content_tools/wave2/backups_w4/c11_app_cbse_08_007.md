## ELI5
A coaster cart must not jerk at the joints - the track must be smooth exactly where two pieces meet. Continuity at a point is that smoothness, and it demands three matches at once: the function must be defined there, the left-hand approach and the right-hand approach must agree, and both must agree with the actual value. All three equal - smooth joint. Any mismatch - a hole, a jump, a blast-off to infinity - is a jerk. And it is a local property: one point at a time.

## DEFINITION
A function $f(x)$ is said to be continuous at a point $x = a$ if and only if three conditions hold simultaneously: (1) $f(a)$ exists (is a finite real number), (2) $\lim_{x \to a} f(x)$ exists (is finite), and (3) $\lim_{x \to a} f(x) = f(a)$. Equivalently, the left-hand limit (LHL), right-hand limit (RHL), and the function value at $x=a$ are all equal.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must be able to verify continuity of a given function at a specific point by explicitly computing LHL, RHL, and $f(a)$, comparing them, and stating a conclusion with justification. They must also identify the type of discontinuity (removable, jump, infinite) if the function is not continuous.

## SCOPE_BOUNDARY
This node covers the definition of continuity at a point using limits (LHL, RHL), types of discontinuities (removable, jump, infinite), continuity of standard functions (polynomial, rational, trigonometric, exponential, logarithmic, modulus, greatest integer, signum) on their domains, and algebra of continuous functions. It does NOT cover continuity on intervals, theorems like Intermediate Value Theorem, or differentiability (covered in node c11_app_cbse_08_008).

## WALKTHROUGH
Imagine you are designing a roller coaster track — the track must be perfectly smooth at the joints so the cart doesn't jerk or fly off. That "smooth joint" is exactly what continuity means mathematically. To check if a function is continuous at $x=a$, start by asking: "Is the function even defined at $a$?" If yes, find what value it takes. Then ask: "What happens as I approach $a$ from the left and from the right?" Compute both limits. Finally, ask: "Do all three match?" If yes, the track is smooth; if not, there's a jerk (discontinuity). The key insight: **continuity is a local property — it only cares about behavior exactly at and around that one point**.

Takeaway: mastery means computing LHL, RHL and the value at the point, comparing all three, and naming the discontinuity type when they disagree. Exam moves: check-continuity questions and classify-the-discontinuity items on the joint scene. Check yourself: the checklist is ordered - if the value does not exist, stop; if the two approaches disagree, it is a jump; if they agree but miss the value, the hole is removable. Students miss it because continuity sounds like a whole-curve verdict, when the joint scene shows the design: the question is always about one point and its neighbourhood, and three equal numbers are the entire certificate of smoothness.

## DIAGNOSTIC_QUESTION_1
State the three necessary and sufficient conditions for a function $f(x)$ to be continuous at a point $x = a$.

## DIAGNOSTIC_ANSWER_1
The three conditions are: (1) $f(a)$ is defined (exists and is finite), (2) $\lim_{x \to a} f(x)$ exists (is finite), which implies $\lim_{x \to a^-} f(x) = \lim_{x \to a^+} f(x)$, and (3) $\lim_{x \to a} f(x) = f(a)$. A wrong answer (e.g., only stating "limit equals function value" without mentioning existence of $f(a)$ or the limit) reveals the student thinks continuity is only about equality, ignoring that both sides must *exist* first — a critical gap for handling piecewise functions or asymptotes.

## DIAGNOSTIC_QUESTION_2
Consider $f(x) = \frac{x^2 - 4}{x - 2}$. A student claims: "Since $f(x)$ simplifies to $x+2$, and $\lim_{x \to 2} (x+2) = 4$, the function is continuous at $x=2$." Is the student correct? Explain why or why not in your own words.

## DIAGNOSTIC_ANSWER_2
The student is **incorrect**. While $\lim_{x \to 2} f(x) = 4$ exists, $f(2)$ is **undefined** because the original expression gives $0/0$. Condition (1) of continuity fails. The function has a **removable discontinuity** (a hole) at $x=2$. A wrong answer (agreeing with the student) reveals the misconception that algebraic simplification *redefines* the function at the problematic point — it doesn't; the domain remains $x \neq 2$ unless explicitly redefined.

## DIAGNOSTIC_QUESTION_3
A function $f(x)$ is defined as:
$$
f(x) = 
\begin{cases}
2x + 1, & x < 1 \\
k, & x = 1 \\
x^2 + 2, & x > 1
\end{cases}
$$
Find the value of $k$ that makes $f(x)$ continuous at $x = 1$. Show all steps.

## DIAGNOSTIC_ANSWER_3
**Step 1:** Compute LHL: $\lim_{x \to 1^-} f(x) = \lim_{x \to 1^-} (2x + 1) = 2(1) + 1 = 3$.  
**Step 2:** Compute RHL: $\lim_{x \to 1^+} f(x) = \lim_{x \to 1^+} (x^2 + 2) = 1^2 + 2 = 3$.  
**Step 3:** Since LHL = RHL = 3, $\lim_{x \to 1} f(x) = 3$ exists.  
**Step 4:** For continuity, need $f(1) = \lim_{x \to 1} f(x) \Rightarrow k = 3$.  
**Answer:** $k = 3$.  
A wrong answer (e.g., $k=4$ or not computing both limits) reveals the student either plugs into the wrong piece, ignores one-sided limits, or doesn't enforce the equality of all three quantities.

## DIAGNOSTIC_QUESTION_4
Compare the discontinuities of $f(x) = \frac{1}{x}$ at $x=0$ and $g(x) = \lfloor x \rfloor$ (greatest integer function) at $x=2$. Classify each as removable, jump, or infinite. Justify your classification using limits.

## DIAGNOSTIC_ANSWER_4
For $f(x) = \frac{1}{x}$ at $x=0$: $\lim_{x \to 0^-} f(x) = -\infty$, $\lim_{x \to 0^+} f(x) = +\infty$. Neither limit is finite, and they are not equal. **Infinite discontinuity** (essential discontinuity).  
For $g(x) = \lfloor x \rfloor$ at $x=2$: $\lim_{x \to 2^-} g(x) = 1$, $\lim_{x \to 2^+} g(x) = 2$. Both limits are finite but unequal. $g(2) = 2$. **Jump discontinuity**.  
A wrong classification (e.g., calling both "jump" or "removable") reveals the student cannot distinguish between *unbounded* behavior (vertical asymptote) and *finite but unequal* one-sided limits — a key analytical skill for graphing and integration later.

## DIAGNOSTIC_QUESTION_5
A student argues: "The function $h(x) = \sin\left(\frac{1}{x}\right)$ is continuous at $x=0$ because sine is always between -1 and 1, so it doesn't blow up." Evaluate this claim. Is the student right or wrong? Defend your answer mathematically.

## DIAGNOSTIC_ANSWER_5
The student is **wrong**. While $|\sin(1/x)| \le 1$, as $x \to 0$, $1/x \to \pm\infty$, causing $\sin(1/x)$ to oscillate infinitely rapidly between -1 and 1. The limit $\lim_{x \to 0} \sin(1/x)$ **does not exist** (not even infinite). Since the limit fails to exist, condition (2) of continuity fails. This is an **oscillatory discontinuity** (a type of essential discontinuity). A wrong evaluation (accepting the claim) reveals the student confuses *boundedness* with *existence of a limit* — a subtle but critical error in limit theory.

## DIAGNOSTIC_QUESTION_6
Create your own piecewise-defined function $p(x)$ with exactly **two** discontinuities: one **removable** at $x = -1$ and one **jump** at $x = 3$. Define $p(x)$ clearly and verify both discontinuities using limits.

## DIAGNOSTIC_ANSWER_6
**Example answer:**  
$$
p(x) = 
\begin{cases}
\frac{x^2 - 1}{x + 1}, & x < -1 \\
5, & x = -1 \\
x + 2, & -1 < x < 3 \\
10, & x = 3 \\
2x - 1, & x > 3
\end{cases}
$$
**Verification:**  
At $x = -1$: LHL = $\lim_{x \to -1^-} \frac{x^2-1}{x+1} = \lim_{x \to -1^-} (x-1) = -2$; RHL = $\lim_{x \to -1^+} (x+2) = 1$; but $p(-1)=5$. Since LHL = RHL = -2 (finite) but $\neq p(-1)$, **removable discontinuity** (hole at $(-1,-2)$, point at $(-1,5)$).  
At $x = 3$: LHL = $\lim_{x \to 3^-} (x+2) = 5$; RHL = $\lim_{x \to 3^+} (2x-1) = 5$; $p(3)=10$. Wait — LHL = RHL = 5, but $p(3)=10$ → this is **removable**, not jump!  
**Correction for jump at $x=3$:** Change $x>3$ piece to $2x$ → RHL = 6 ≠ LHL=5, $p(3)=10$ → **jump discontinuity** (LHL=5, RHL=6, value=10).  
A poor answer (e.g., both discontinuities same type, or verification missing) reveals the student cannot *design* functions with specific limit behaviors — indicating shallow grasp of how piecewise definitions control LHL/RHL/value independently.

## COMMON_MISCONCEPTION
**"If the limit exists, the function is continuous."** Students often compute $\lim_{x \to a} f(x)$ and find a finite value $L$, then conclude continuity without checking whether $f(a)$ is defined or equals $L$. For example, in $f(x) = \frac{x^2-1}{x-1}$ at $x=1$, they find $\lim_{x \to 1} f(x) = 2$ and say "continuous" — but $f(1)$ is undefined! The error stems from conflating *limit existence* with *continuity*, ignoring that continuity requires **three** equal quantities: LHL, RHL, **and** $f(a)$. This misconception is reinforced by over-practicing "limit = plug in" for continuous functions (polynomials), making them forget the definition's full logic.

## ON_FAILURE
1. **Revisit the definition physically:** Draw a coordinate plane, plot a point $(a, f(a))$, then draw a "hole" at $(a, L)$ where $L = \lim_{x \to a} f(x) \neq f(a)$. Ask: "Can you trace the graph without lifting your pen?" No — because the hole and the point are separate.  
2. **Drill the 3-condition checklist:** For every problem, force the student to write:  
   - Condition 1: $f(a) = \text{?}$ (exists?)  
   - Condition 2: $\lim_{x \to a} f(x) = \text{?}$ (exists? LHL=RHL?)  
   - Condition 3: Are they equal?  
   Only if all three ✅ → continuous.  
3. **Practice "find $k$" problems** (like Diagnostic Q3) where $f(a)$ is a parameter — this forces attention to $f(a)$ as a separate entity from the limit.  
4. **Use the "removable vs. jump" table:** Create a 2×2 grid: (Limit exists? Yes/No) × ($f(a)$ defined? Yes/No) → classify discontinuity. Fill it with examples.

## PREREQUISITE_NODE_IDS
c11_app_cbse_08_002, c11_app_cbse_08_004, c11_app_cbse_08_005, c11_app_cbse_08_006

## PREREQUISITE_REASONS
c11_app_cbse_08_002: Understanding what a function is (domain, rule, unique output) is essential — continuity is a property of a function at a point in its domain.  
c11_app_cbse_08_004: Domain knowledge is critical — continuity is only checked at points in the domain (or boundary points); e.g., $\sqrt{x}$ at $x=0$ needs domain $x \ge 0$.  
c11_app_cbse_08_005: Recognizing types (polynomial, rational, trigonometric, modulus, greatest integer, signum) allows using known continuity properties (e.g., polynomials continuous everywhere on $\mathbb{R}$).  
c11_app_cbse_08_006: Limits (LHL, RHL, algebra of limits, indeterminate forms) are the *direct computational tool* for verifying continuity — without limit skills, continuity cannot be assessed.

## FORWARD_NODE_IDS
c11_app_cbse_08_008, c11_app_cbse_08_009, c11_app_cbse_08_010

## FORWARD_REASONS
c11_app_cbse_08_008: Differentiability requires continuity — a function must be continuous at a point to be differentiable there (but not vice versa). This node provides the continuity foundation.  
c11_app_cbse_08_009: Chain rule and derivative computations assume functions are continuous/differentiable on intervals; continuity checks are needed before differentiating piecewise or rational functions.  
c11_app_cbse_08_010: Tangent lines exist only where the function is continuous and differentiable; the equation of tangent at $x=a$ requires $f(a)$ to exist and $f'(a)$ to exist — continuity is step one.

## CROSS_SUBJECT_PREREQS
none

## CROSS_SUBJECT_REASONS
none

## CHAIN_DESCRIPTION
c11_app_cbse_08_006 -> c11_app_cbse_08_007 -> c11_app_cbse_08_008

## THIS_FORMULA
Continuity at $x = a$: $\lim_{x \to a^-} f(x) = \lim_{x \to a^+} f(x) = f(a)$ (all finite)

## FORMULA_VARIABLES
- $f(x)$: the function under consideration  
- $a$: the point in the domain (or boundary) where continuity is checked  
- $\lim_{x \to a^-} f(x)$: left-hand limit (LHL) as $x$ approaches $a$ from values less than $a$  
- $\lim_{x \to a^+} f(x)$: right-hand limit (RHL) as $x$ approaches $a$ from values greater than $a$  
- $f(a)$: the value of the function at $x = a$ (must be defined and finite)

## FORMULA_UNITS
N/A (pure mathematical concept; no physical units)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_app_cbse_08_006 | Limits provide the computational engine for continuity: LHL, RHL, and limit existence are defined and calculated using limit algebra and standard limits from the previous node.  
c11_app_cbse_08_005 | Function types (polynomial, rational, modulus, greatest integer, signum, exponential, logarithmic) have well-known continuity properties on their domains — knowing these types lets students quickly assess continuity without computing limits every time.

## PREREQ_CONCEPT
The concept of a limit (especially one-sided limits) and the ability to evaluate limits algebraically for rational, trigonometric, and piecewise functions.

## PREREQ_BEFORE
The student must be able to compute $\lim_{x \to a^-} f(x)$ and $\lim_{x \to a^+} f(x)$ for piecewise-defined functions and handle indeterminate forms (like $0/0$) by factorization or rationalization.

## PREREQ_STUCK
If stuck, review **one-sided limits** and **algebra of limits** from node c11_app_cbse_08_006 — specifically, practice evaluating LHL/RHL for piecewise functions and resolving $0/0$ forms.

## WORKED_EXAMPLE_1
PROBLEM: A water tank's volume (in liters) as a function of time $t$ (in minutes) is modeled by:
$$
V(t) = 
\begin{cases}
t^2 + 2t, & 0 \le t < 3 \\
15, & t = 3 \\
5t + 5, & t > 3
\end{cases}
$$
Is the volume function continuous at $t = 3$? Interpret the result physically.

STEPS:
- Step 1: Identify the point of interest: $t = 3$. We need to check if $V(t)$ is continuous there.
- Step 2: Compute $V(3)$ from the definition: $V(3) = 15$ (given explicitly).
- Step 3: Compute LHL as $t \to 3^-$: use the first piece $t^2 + 2t$. $\lim_{t \to 3^-} (t^2 + 2t) = 3^2 + 2(3) = 9 + 6 = 15$.
- Step 4: Compute RHL as $t \to 3^+$: use the third piece $5t + 5$. $\lim_{t \to 3^+} (5t + 5) = 5(3) + 5 = 15 + 5 = 20$.
- Step 5: Compare: LHL = 15, RHL = 20, $V(3) = 15$. Since LHL $\neq$ RHL, the limit $\lim_{t \to 3} V(t)$ does not exist. Condition (2) fails. Function is **not continuous** at $t=3$. It has a **jump discontinuity**.
- Step 6: Physical interpretation: At exactly $t=3$ min, the volume is 15 L. But just before 3 min, volume approaches 15 L; just after 3 min, volume jumps to 20 L. This suggests a sudden inflow (e.g., a valve opening) at $t=3$ — the model captures a real abrupt change.

REASONING: Continuity requires all three — LHL, RHL, and function value — to be equal. Here LHL = value = 15, but RHL = 20, so the "track" has a jump. The piecewise definition allows different behaviors before/after the point, which is common in real-world models (switching systems, valves, thresholds).

ANSWER: $V(t)$ is **not continuous** at $t=3$; it has a **jump discontinuity** (LHL = 15, RHL = 20, $V(3)=15$). Physically, this represents a sudden change in flow rate at $t=3$ minutes.

## WORKED_EXAMPLE_2
PROBLEM: Determine the value of $a$ such that the function
$$
f(x) = 
\begin{cases}
\frac{\sin(3x)}{x}, & x < 0 \\
a, & x = 0 \\
\frac{\tan(2x)}{x}, & x > 0
\end{cases}
$$
is continuous at $x = 0$. (Use standard limits: $\lim_{x \to 0} \frac{\sin x}{x} = 1$, $\lim_{x \to 0} \frac{\tan x}{x} = 1$.)

STEPS:
- Step 1: For continuity at $x=0$, need $\lim_{x \to 0^-} f(x) = \lim_{x \to 0^+} f(x) = f(0) = a$.
- Step 2: Compute LHL: $\lim_{x \to 0^-} \frac{\sin(3x)}{x}$. Rewrite as $3 \cdot \frac{\sin(3x)}{3x}$. As $x \to 0$, $3x \to 0$, so $\lim_{x \to 0^-} \frac{\sin(3x)}{3x} = 1$. Thus LHL = $3 \times 1 = 3$.
- Step 3: Compute RHL: $\lim_{x \to 0^+} \frac{\tan(2x)}{x}$. Rewrite as $2 \cdot \frac{\tan(2x)}{2x}$. As $x \to 0$, $2x \to 0$, so $\lim_{x \to 0^+} \frac{\tan(2x)}{2x} = 1$. Thus RHL = $2 \times 1 = 2$.
- Step 4: Compare LHL and RHL: LHL = 3, RHL = 2. They are **not equal**, so $\lim_{x \to 0} f(x)$ **does not exist**.
- Step 5: Since the limit does not exist, **no value of $a$** can make $f(x)$ continuous at $x=0$. The function has an **irremovable jump discontinuity** at $x=0$ regardless of $a$.

REASONING: Even though both one-sided limits are finite, they differ (3 vs 2). Continuity requires a *single* limit value. Standard limits ($\sin x/x$, $\tan x/x$) are essential tools for trigonometric piecewise functions. The parameter $a$ only sets $f(0)$; it cannot fix a missing limit.

ANSWER: **No such value of $a$ exists.** LHL = 3, RHL = 2 → limit does not exist → continuity impossible for any $a$.

## WORKED_EXAMPLE_3
PROBLEM: The cost $C(x)$ (in rupees) of producing $x$ units of a product is given by:
$$
C(x) = 
\begin{cases}
1000 + 50x, & 0 \le x \le 100 \\
\frac{5000x}{x + 50}, & x > 100
\end{cases}
$$
Check if the marginal cost (rate of change of cost) can be analyzed at $x=100$ by first verifying continuity of $C(x)$ at $x=100$. If not continuous, suggest a modification to the second piece to make it continuous while keeping the same asymptotic behavior for large $x$.

STEPS:
- Step 1: Check continuity at $x=100$. Compute $C(100)$ using first piece: $C(100) = 1000 + 50(100) = 1000 + 5000 = 6000$.
- Step 2: Compute LHL as $x \to 100^-$: use first piece. $\lim_{x \to 100^-} (1000 + 50x) = 1000 + 5000 = 6000$.
- Step 3: Compute RHL as $x \to 100^+$: use second piece. $\lim_{x \to 100^+} \frac{5000x}{x + 50} = \frac{5000(100)}{150} = \frac{500000}{150} = \frac{10000}{3} \approx 3333.33$.
- Step 4: Compare: LHL = 6000, RHL ≈ 3333.33, $C(100) = 6000$. LHL ≠ RHL → limit does not exist → **not continuous** at $x=100$. Jump discontinuity.
- Step 5: Marginal cost (derivative) cannot be analyzed at $x=100$ because differentiability requires continuity — a jump means no unique tangent slope.
- Step 6: Modify second piece to make RHL = 6000 at $x=100$, while keeping $\lim_{x \to \infty} C(x) = 5000$ (asymptotic behavior). Current second piece: $\frac{5000x}{x+50} \to 5000$ as $x \to \infty$. We need $\frac{kx}{x+50} \to 5000$ ⇒ $k=5000$. But at $x=100$, $\frac{5000 \cdot 100}{150} = 10000/3 \neq 6000$. So change form: use $C(x) = 5000 + \frac{m}{x+50}$? As $x \to \infty$, $C(x) \to 5000$. At $x=100$, want $C(100) = 6000$: $5000 + \frac{m}{150} = 6000 \Rightarrow \frac{m}{150} = 1000 \Rightarrow m = 150000$. New piece: $C(x) = 5000 + \frac{150000}{x+50}$ for $x > 100$. Check: at $x=100$, $5000 + 150000/150 = 5000 + 1000 = 6000$. As $x \to \infty$, $C(x) \to 5000$. Continuous and same asymptote.

REASONING: Continuity is a prerequisite for differentiability (marginal cost). The original model has a cost jump at 100 units — unrealistic for smooth production scaling. The modification uses a rational function with horizontal asymptote 5000 (economies of scale) and adjusts the numerator to match the value at the junction. This combines continuity, limits at infinity, and real-world modeling.

ANSWER: $C(x)$ is **not continuous** at $x=100$ (LHL=6000, RHL=10000/3 ≈ 3333.33). Marginal cost cannot be defined there. Modified continuous version for $x>100$: $C(x) = 5000 + \frac{150000}{x+50}$.

## COMPETENCY_QUESTION_1
QUESTION: A function $f(x)$ is defined as:
$$
f(x) = 
\begin{cases}
\frac{e^{2x} - 1}{x}, & x < 0 \\
k, & x = 0 \\
\frac{\ln(1+3x)}{x}, & x > 0
\end{cases}
$$
Using standard limits $\lim_{x \to 0} \frac{e^x - 1}{x} = 1$ and $\lim_{x \to 0} \frac{\ln(1+x)}{x} = 1$, find the value of $k$ that makes $f(x)$ continuous at $x=0$. If no such $k$ exists, explain why.

COMPETENCY: **Analytical reasoning with standard limits** — applying known limits to exponential/logarithmic piecewise functions to determine continuity.

STEPS:
- Step 1: Write the continuity condition at $x=0$: $\lim_{x \to 0^-} f(x) = \lim_{x \to 0^+} f(x) = f(0) = k$.
- Step 2: Compute LHL: $\lim_{x \to 0^-} \frac{e^{2x} - 1}{x}$. Let $u = 2x$, so as $x \to 0$, $u \to 0$. Then $\frac{e^{2x}-1}{x} = 2 \cdot \frac{e^u - 1}{u} \to 2 \times 1 = 2$.
- Step 3: Compute RHL: $\lim_{x \to 0^+} \frac{\ln(1+3x)}{x}$. Let $v = 3x$, so as $x \to 0$, $v \to 0$. Then $\frac{\ln(1+3x)}{x} = 3 \cdot \frac{\ln(1+v)}{v} \to 3 \times 1 = 3$.
- Step 4: Compare LHL = 2 and RHL = 3. They are **not equal**, so $\lim_{x \to 0} f(x)$ **does not exist**.
- Step 5: Since the two-sided limit does not exist, **no value of $k$** can satisfy continuity. The function has a jump discontinuity at $x=0$ for any $k$.

ANSWER: **No value of $k$ makes $f(x)$ continuous at $x=0$.** LHL = 2, RHL = 3 → limit does not exist.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The temperature $T(x)$ (in °C) along a metal rod of length 10 cm is modeled by:
$$
T(x) = 
\begin{cases}
20 + 5\sin\left(\frac{\pi x}{5}\right), & 0 \le x < 5 \\
\frac{ax^2 + bx + c}{x - 5}, & 5 < x \le 10
\end{cases}
$$
At $x=5$, the temperature is measured as $T(5) = 25^\circ \text{C}$.  
(a) Find the values of $a$, $b$, $c$ such that $T(x)$ is continuous at $x=5$ **and** the discontinuity of the rational piece at $x=5$ is removable.  
(b) With these values, is $T(x)$ continuous on the entire interval $[0, 10]$? Justify.

COMPETENCY: **Modeling with continuity constraints** — designing a piecewise function (physical model) to satisfy continuity and removable discontinuity conditions, combining algebra, limits, and domain reasoning.

STEPS:
- Step 1: For continuity at $x=5$, need $\lim_{x \to 5^-} T(x) = \lim_{x \to 5^+} T(x) = T(5) = 25$.
- Step 2: Compute LHL: $\lim_{x \to 5^-} \left[20 + 5\sin\left(\frac{\pi x}{5}\right)\right] = 20 + 5\sin(\pi) = 20 + 0 = 20$. But $T(5)=25$! Already LHL = 20 ≠ 25 = $T(5)$.
- Step 3: **Contradiction**: The left piece gives $T(5^-)=20$, but the measured value is 25. So **continuity at $x=5$ is impossible** with the given left piece and $T(5)=25$.
- Step 4: Re-read problem: "At $x=5$, the temperature is measured as $T(5)=25$." This is a fixed condition. The left limit is fixed at 20. Since 20 ≠ 25, **no choice of $a,b,c$ can make $T(x)$ continuous at $x=5$**.
- Step 5: For part (b): Even if we ignore the measured value and force LHL=RHL, the left piece is continuous on $[0,5)$, the right piece is rational and continuous on $(5,10]$ except possibly at $x=5$. But at $x=5$, LHL=20, so to have continuity we'd need $T(5)=20$ and RHL=20. However, the problem states $T(5)=25$. Thus **$T(x)$ cannot be continuous on $[0,10]$** under the given conditions.

ANSWER: (a) **No such $a,b,c$ exist** because $\lim_{x \to 5^-} T(x) = 20 \neq 25 = T(5)$, violating continuity regardless of the right piece.  
(b) **No**, $T(x)$ is not continuous on $[0,10]$ because it fails at $x=5$ (LHL=20, value=25).

DIFFICULTY: hard