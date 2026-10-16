## ELI5
Imagine you have a function where the variable appears in both the base and the exponent, like $x^x$ or $(x+1)^{x^2}$. Standard power rules ($d(x^n)/dx = nx^{n-1}$) and exponential rules ($d(a^x)/dx = a^x \ln a$) fail because neither the base nor the exponent is constant. Logarithmic differentiation is the "universal key": take $\ln$ of both sides, use log properties to bring the exponent down, then differentiate implicitly. The most common mix-up is forgetting to multiply by the original function $y$ at the end — you get $dy/dx \cdot 1/y$ on the LHS, so you must multiply the RHS by $y$ to isolate $dy/dx$.

## DEFINITION
Logarithmic differentiation is a technique used to differentiate functions of the form $y = [f(x)]^{g(x)}$ (where both base and exponent are functions of $x$) or complicated products/quotients, by first taking the natural logarithm of both sides, simplifying using logarithm laws ($\ln(a^b) = b\ln a$, $\ln(ab) = \ln a + \ln b$, $\ln(a/b) = \ln a - \ln b$), and then differentiating implicitly with respect to $x$.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must be able to independently identify when logarithmic differentiation is required (variable base AND variable exponent, or complex products/quotients), correctly apply logarithm laws to simplify, perform implicit differentiation using chain rule and product/quotient rules, and substitute back the original function to express $dy/dx$ purely in terms of $x$.

## SCOPE_BOUNDARY
This node covers differentiation of functions of the type $[f(x)]^{g(x)}$ (e.g., $x^x$, $(x+1/x)^{x^2}$), products/quotients with many factors (e.g., $y = \frac{(x+1)^3(x-2)^2}{(x+3)^4}$), and implicit logarithmic equations (e.g., $x^y + y^x = c$). It does NOT cover standard power/exponential differentiation (Class 11), second-order derivatives (next node c12_app_cbse_03_007), or applications like maxima/minima (later nodes).

## WALKTHROUGH
A student asks: "How do I differentiate $y = x^x$? The power rule gives $x \cdot x^{x-1}$ and the exponential rule gives $x^x \ln x$ — which one is right?" Neither is right because $x$ is not constant in either position. Start by taking $\ln$ of both sides: $\ln y = x \ln x$. Now the RHS is a product — differentiate implicitly: $(1/y) dy/dx = \ln x + 1$. Finally, multiply by $y = x^x$ to get $dy/dx = x^x(\ln x + 1)$. The key insight: logarithms convert exponentiation into multiplication, multiplication into addition, and division into subtraction — turning "impossible" derivatives into standard product/quotient/chain rule problems.

Takeaway: mastery means the variable-base case identified on sight and the logarithm laws doing the simplification. Exam moves: identification questions spot base and exponent both varying; application questions take logs, differentiate implicitly, and multiply back by the original function; correction questions diagnose the two wrong-rule answers the power and exponential rules produce. Method: logarithms demote exponents to multipliers and products to sums — impossible derivatives become standard ones. Drill: one x-raised-to-x, two wrong rules, one log. The logarithm is the translator that makes the alien function speak ordinary calculus. Work two cases — the self-exponential and a tangled product — back to back, and the identification becomes instant: variable base plus variable exponent, or a product too tangled, reaches for the logarithm first.

## DIAGNOSTIC_QUESTION_1
State the exact condition on a function $y = f(x)$ that makes logarithmic differentiation necessary (as opposed to standard power rule or exponential rule).

## DIAGNOSTIC_ANSWER_1
Logarithmic differentiation is necessary when the function is of the form $y = [u(x)]^{v(x)}$ where **both the base $u(x)$ and the exponent $v(x)$ are non-constant functions of $x$**. A wrong answer (e.g., "when there is an $x$ in the exponent") reveals the student confuses $a^x$ (exponential, use $a^x \ln a$) with $x^x$ or $f(x)^{g(x)}$; they haven't grasped that the *variability of the base* is the critical factor.

## DIAGNOSTIC_QUESTION_2
A student differentiates $y = x^x$ as follows: $\ln y = x \ln x \implies \frac{1}{y} \frac{dy}{dx} = \ln x + 1 \implies \frac{dy}{dx} = \ln x + 1$. Identify the error and explain why it is mathematically incorrect.

## DIAGNOSTIC_ANSWER_2
The error is in the final step: the student forgot to multiply by $y$ (i.e., $x^x$). The correct derivative is $\frac{dy}{dx} = y(\ln x + 1) = x^x(\ln x + 1)$. A wrong answer here reveals the student treats implicit differentiation as "differentiate both sides and stop" without isolating $dy/dx$; they miss that $\frac{d}{dx}(\ln y) = \frac{1}{y} \frac{dy}{dx}$ by chain rule, so $dy/dx$ must be multiplied by $y$ to clear the denominator.

## DIAGNOSTIC_QUESTION_3
Differentiate $y = (x^2 + 1)^{x^3}$ with respect to $x$ using logarithmic differentiation. Show all steps.

## DIAGNOSTIC_ANSWER_3
**Step 1:** Take $\ln$ both sides: $\ln y = x^3 \ln(x^2 + 1)$.
**Step 2:** Differentiate implicitly w.r.t $x$:
$\frac{1}{y} \frac{dy}{dx} = 3x^2 \ln(x^2 + 1) + x^3 \cdot \frac{1}{x^2 + 1} \cdot 2x$ (product rule + chain rule).
**Step 3:** Simplify RHS: $\frac{dy}{dx} \cdot \frac{1}{y} = 3x^2 \ln(x^2 + 1) + \frac{2x^4}{x^2 + 1}$.
**Step 4:** Multiply by $y = (x^2 + 1)^{x^3}$:
$\frac{dy}{dx} = (x^2 + 1)^{x^3} \left[ 3x^2 \ln(x^2 + 1) + \frac{2x^4}{x^2 + 1} \right]$.
A wrong answer (e.g., missing the chain rule factor $2x$ in the second term, or forgetting to multiply by $y$) reveals gaps in product/chain rule application or the final substitution step.

## DIAGNOSTIC_QUESTION_4
Compare the derivatives of $y_1 = x^5$, $y_2 = 5^x$, and $y_3 = x^x$. Explain why $y_3$ requires logarithmic differentiation while $y_1$ and $y_2$ do not. What structural property of $y_3$ makes the standard rules inapplicable?

## DIAGNOSTIC_ANSWER_4
$y_1 = x^5$ has constant exponent $\to$ power rule: $5x^4$. $y_2 = 5^x$ has constant base $\to$ exponential rule: $5^x \ln 5$. $y_3 = x^x$ has **both base and exponent as variable functions of $x$** — neither rule applies because each rule assumes the other part is constant. The structural property is **simultaneous variability of base and exponent**. A wrong answer (e.g., "all three need log diff") reveals the student doesn't understand the *assumptions* behind standard formulas.

## DIAGNOSTIC_QUESTION_5
Evaluate the claim: "Logarithmic differentiation can be used to differentiate *any* positive function $y = f(x)$." Is this true? Justify with a counterexample or proof, and discuss when it is *practically advantageous* vs. *unnecessary*.

## DIAGNOSTIC_ANSWER_5
The claim is **mathematically true but practically misleading**. Any positive $f(x)$ can be written as $e^{\ln f(x)}$, and differentiating gives $f'(x) = f(x) \cdot \frac{d}{dx}[\ln f(x)]$ — this is logarithmic differentiation in essence. However, it is **advantageous only when $\ln f(x)$ simplifies significantly** (e.g., $f(x) = x^x \to \ln f = x\ln x$; $f(x) = \frac{(x+1)^3}{(x-2)^2} \to \ln f = 3\ln(x+1) - 2\ln(x-2)$). For $f(x) = x^2 + 3x$, $\ln f$ does not simplify — standard rules are faster. A wrong answer (e.g., "always use it" or "never use it for polynomials") reveals the student lacks strategic judgment about *when* the method adds value.

## DIAGNOSTIC_QUESTION_6
Create a function $y = f(x)$ that **requires** logarithmic differentiation (i.e., cannot be easily done with standard rules alone), has at least 3 factors in a product/quotient, and involves a variable exponent. Differentiate it completely.

## DIAGNOSTIC_ANSWER_6
Example: $y = \frac{x^{x^2} \cdot (x+1)^{\sin x}}{(x^2+1)^{e^x}}$.
**Step 1:** $\ln y = x^2 \ln x + \sin x \ln(x+1) - e^x \ln(x^2+1)$.
**Step 2:** Differentiate:
$\frac{1}{y} y' = (2x \ln x + x^2 \cdot \frac{1}{x}) + (\cos x \ln(x+1) + \sin x \cdot \frac{1}{x+1}) - (e^x \ln(x^2+1) + e^x \cdot \frac{2x}{x^2+1})$.
**Step 3:** Simplify: $y' = y \left[ 2x \ln x + x + \cos x \ln(x+1) + \frac{\sin x}{x+1} - e^x \ln(x^2+1) - \frac{2x e^x}{x^2+1} \right]$.
**Step 4:** Substitute $y$. A poor answer (e.g., missing a product rule term, wrong chain rule on $e^x$, or not substituting $y$ back) reveals the student cannot manage multi-layered implicit differentiation with multiple rules simultaneously.

## COMMON_MISCONCEPTION
**Misconception:** "Logarithmic differentiation is just 'taking log and differentiating' — I can apply it to $y = x^2 + 3x$ and get the same answer."
**Why it's wrong:** While mathematically valid (since $\frac{d}{dx}(x^2+3x) = (x^2+3x) \frac{d}{dx}[\ln(x^2+3x)]$), it **complicates** the problem: $\ln(x^2+3x)$ does not simplify via log laws (no products/quotients/powers to break down), so you end up differentiating a composite log function *and* multiplying back — more steps, more chain rule, more error risk. Students do this because they memorize the *procedure* ("take log, differentiate, multiply by y") without understanding the *strategic purpose*: **log laws must simplify the expression before differentiation**. The method is a tool for *simplification*, not a universal derivative formula.

## ON_FAILURE
If a student applies logarithmic differentiation to $y = x^2 + 3x$ or forgets to multiply by $y$ at the end:
1. **Diagnose:** Ask "Did $\ln y$ become a sum/difference of simpler terms?" If no $\to$ wrong tool. If yes but final answer missing $y \to$ algebraic isolation error.
2. **Remediate:** Revisit **c11_app_cbse_01_008** (Laws of Logarithms) — practice expanding $\ln(x^x)$, $\ln((x+1)^3/(x-2)^2)$, $\ln(x^2+3x)$. Show that only the first two simplify.
3. **Re-practice:** Give 3 problems: (a) $y = x^x$ (needs log diff), (b) $y = x^2 + 3x$ (does not), (c) $y = \frac{(x+1)^2}{(x-1)^3}$ (needs log diff). Student must *justify choice* before solving.
4. **Re-diagnose:** Ask student to differentiate $y = (2x+1)^{x^2}$ and circle the step where they multiply by $y$. If missed, repeat isolation drill.

## PREREQUISITE_NODE_IDS
c11_app_cbse_01_006, c11_app_cbse_01_007, c11_app_cbse_01_008, c12_app_cbse_03_003, c12_app_cbse_03_004

## PREREQUISITE_REASONS
c11_app_cbse_01_006: Indices and logarithm basics — needed to understand $\ln$ and its domain ($y>0$).
c11_app_cbse_01_007: Logarithms — definition, properties, and $\ln$ vs $\log$.
c11_app_cbse_01_008: Laws of Logarithms — critical for simplifying $\ln[f(x)^{g(x)}] = g(x)\ln f(x)$, $\ln(ab) = \ln a + \ln b$, etc.
c12_app_cbse_03_003: Standard differentiation results — provides $d(\ln x)/dx = 1/x$, $d(e^x)/dx = e^x$, product/quotient/chain rules used *inside* log diff.
c12_app_cbse_03_004: Implicit differentiation — log diff *is* implicit differentiation on $\ln y$; student must know $d(\ln y)/dx = (1/y) dy/dx$.

## FORWARD_NODE_IDS
c12_app_cbse_03_007, c12_app_cbse_03_008, c12_app_cbse_03_009, c12_app_cbse_03_010

## FORWARD_REASONS
c12_app_cbse_03_007: Second/higher order derivatives often require log diff for first derivative (e.g., $y = x^x \implies y''$ needs log diff first).
c12_app_cbse_03_008: Cost/revenue functions may involve variable exponents (e.g., elasticity models $R = p(x) \cdot x$ with $p = a x^b$).
c12_app_cbse_03_009: Rate of change problems with variable-exponent models (e.g., population growth $P = P_0 e^{kt}$ vs $P = t^t$).
c12_app_cbse_03_010: Related rates where variables linked by $x^y = c$ or similar — log diff gives $dy/dt$ in terms of $dx/dt$.

## CROSS_SUBJECT_PREREQS
c11_app_cbse_01_006, c11_app_cbse_01_007, c11_app_cbse_01_008

## CROSS_SUBJECT_REASONS
c11_app_cbse_01_006: Indices and logarithm basics — foundation for understanding why $\ln$ converts powers to products.
c11_app_cbse_01_007: Logarithms — defines $\ln$ as log base $e$, essential for calculus derivative $d(\ln x)/dx = 1/x$.
c11_app_cbse_01_008: Laws of Logarithms — the *engine* of log diff: without $\ln(a^b)=b\ln a$, $\ln(ab)=\ln a+\ln b$, the method collapses.

## CHAIN_DESCRIPTION
c11_app_cbse_01_008 -> c12_app_cbse_03_006 -> c12_app_cbse_03_007 (log laws enable log diff, which enables higher-order derivatives of complex functions)

## THIS_FORMULA
For $y = [f(x)]^{g(x)}$ (with $f(x) > 0$):
1. $\ln y = g(x) \ln f(x)$
2. $\frac{1}{y} \frac{dy}{dx} = g'(x) \ln f(x) + g(x) \cdot \frac{f'(x)}{f(x)}$
3. $\frac{dy}{dx} = y \left[ g'(x) \ln f(x) + \frac{g(x) f'(x)}{f(x)} \right] = [f(x)]^{g(x)} \left[ g'(x) \ln f(x) + \frac{g(x) f'(x)}{f(x)} \right]$

## FORMULA_VARIABLES
- $y$: dependent variable (function of $x$)
- $f(x)$: base function, must be $> 0$ for $\ln$ to be defined
- $g(x)$: exponent function
- $f'(x), g'(x)$: derivatives of base and exponent
- $\ln$: natural logarithm (base $e$)

## FORMULA_UNITS
N/A (purely mathematical; units depend on application context, e.g., if $x$ is time in seconds, $dy/dx$ has units of $y$ per second)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_app_cbse_01_008 | Logarithm laws ($\ln a^b = b \ln a$, $\ln(ab) = \ln a + \ln b$) are the algebraic engine that makes logarithmic differentiation possible — they convert exponentiation to multiplication and products to sums.
c11_app_cbse_08_008 | Instantaneous rate of change and derivative (Class 11) — introduces $dy/dx$ as limit of difference quotient; log diff is an advanced application of chain rule + implicit differentiation built on this foundation.

## PREREQ_CONCEPT
Implicit differentiation ($d(\ln y)/dx = (1/y) dy/dx$) combined with logarithm laws ($\ln(u^v) = v \ln u$) is the core prerequisite — without both, log diff cannot be executed.

## PREREQ_BEFORE
Student must fluently apply chain rule, product rule, quotient rule, and logarithm expansion/simplification *before* attempting log diff problems.

## PREREQ_STUCK
If stuck, review **c11_app_cbse_01_008** (Logarithm Laws) for simplification step, and **c12_app_cbse_03_004** (Implicit Differentiation) for the $d(\ln y)/dx = (1/y) dy/dx$ step.

## WORKED_EXAMPLE_1
PROBLEM: A bacterial culture grows such that its population at time $t$ hours is modeled by $P(t) = t^{t/2}$ for $t > 0$. Find the instantaneous rate of change of population at $t = 4$ hours.
STEPS:
- Step 1: Identify that $P(t) = t^{t/2}$ has variable base ($t$) and variable exponent ($t/2$) — standard power/exponential rules fail; logarithmic differentiation is required.
- Step 2: Take natural log of both sides: $\ln P = \frac{t}{2} \ln t$.
- Step 3: Differentiate implicitly w.r.t $t$: $\frac{1}{P} \frac{dP}{dt} = \frac{1}{2} \ln t + \frac{t}{2} \cdot \frac{1}{t} = \frac{1}{2} \ln t + \frac{1}{2}$.
- Step 4: Solve for $dP/dt$: $\frac{dP}{dt} = P \cdot \frac{1}{2} (\ln t + 1) = t^{t/2} \cdot \frac{1}{2} (\ln t + 1)$.
- Step 5: Evaluate at $t = 4$: $P(4) = 4^{4/2} = 4^2 = 16$; $\frac{dP}{dt}\big|_{t=4} = 16 \cdot \frac{1}{2} (\ln 4 + 1) = 8 (\ln 4 + 1) \approx 8(1.386 + 1) = 19.09$ bacteria/hour.
REASONING: The model $t^{t/2}$ captures accelerating growth where both the base population scale and the growth exponent increase with time. Logarithmic differentiation is the only systematic way to handle the $t$ in both positions. The final multiplication by $P(t)$ converts the logarithmic derivative back to the actual rate of change.
ANSWER: $\frac{dP}{dt}\big|_{t=4} = 8(\ln 4 + 1) \approx 19.09$ bacteria/hour.

## WORKED_EXAMPLE_2
PROBLEM: Differentiate $y = \frac{(x+2)^3 (x-1)^4}{(x+5)^2 (x-3)^5}$ with respect to $x$ using logarithmic differentiation.
STEPS:
- Step 1: Recognize this is a complex quotient of products — log diff will convert division to subtraction and powers to coefficients, avoiding messy quotient rule.
- Step 2: Take $\ln$ both sides (assume $x$ in domain where all factors positive, e.g., $x > 3$): $\ln y = 3\ln(x+2) + 4\ln(x-1) - 2\ln(x+5) - 5\ln(x-3)$.
- Step 3: Differentiate implicitly: $\frac{1}{y} \frac{dy}{dx} = \frac{3}{x+2} + \frac{4}{x-1} - \frac{2}{x+5} - \frac{5}{x-3}$.
- Step 4: Multiply by $y$: $\frac{dy}{dx} = y \left( \frac{3}{x+2} + \frac{4}{x-1} - \frac{2}{x+5} - \frac{5}{x-3} \right)$.
- Step 5: Substitute back $y$: $\frac{dy}{dx} = \frac{(x+2)^3 (x-1)^4}{(x+5)^2 (x-3)^5} \left( \frac{3}{x+2} + \frac{4}{x-1} - \frac{2}{x+5} - \frac{5}{x-3} \right)$.
REASONING: Without log diff, this would require quotient rule + product rule + chain rule on 4 factors — extremely error-prone. Log laws reduce it to simple sum of derivatives of $\ln(\text{linear})$, each giving $1/(\text{linear})$. The domain restriction ($x>3$) ensures all logs are defined; for other intervals, absolute values inside $\ln$ would be needed.
ANSWER: $\frac{dy}{dx} = \frac{(x+2)^3 (x-1)^4}{(x+5)^2 (x-3)^5} \left( \frac{3}{x+2} + \frac{4}{x-1} - \frac{2}{x+5} - \frac{5}{x-3} \right)$.

## WORKED_EXAMPLE_3
PROBLEM: If $x^y + y^x = a^b$ (where $a,b$ are constants), find $\frac{dy}{dx}$ using logarithmic differentiation.
STEPS:
- Step 1: Let $u = x^y$ and $v = y^x$. Then $u + v = a^b$ (constant). Differentiate: $\frac{du}{dx} + \frac{dv}{dx} = 0$.
- Step 2: Find $du/dx$ using log diff on $u = x^y$: $\ln u = y \ln x \implies \frac{1}{u} \frac{du}{dx} = \frac{dy}{dx} \ln x + y \cdot \frac{1}{x} \implies \frac{du}{dx} = x^y \left( \ln x \frac{dy}{dx} + \frac{y}{x} \right)$.
- Step 3: Find $dv/dx$ using log diff on $v = y^x$: $\ln v = x \ln y \implies \frac{1}{v} \frac{dv}{dx} = \ln y + x \cdot \frac{1}{y} \frac{dy}{dx} \implies \frac{dv}{dx} = y^x \left( \ln y + \frac{x}{y} \frac{dy}{dx} \right)$.
- Step 4: Substitute into $\frac{du}{dx} + \frac{dv}{dx} = 0$:
$x^y \left( \ln x \frac{dy}{dx} + \frac{y}{x} \right) + y^x \left( \ln y + \frac{x}{y} \frac{dy}{dx} \right) = 0$.
- Step 5: Collect $\frac{dy}{dx}$ terms:
$\frac{dy}{dx} \left( x^y \ln x + y^x \cdot \frac{x}{y} \right) = - \left( x^y \cdot \frac{y}{x} + y^x \ln y \right)$.
- Step 6: Solve for $\frac{dy}{dx}$:
$\frac{dy}{dx} = - \frac{ x^y \cdot \frac{y}{x} + y^x \ln y }{ x^y \ln x + y^x \cdot \frac{x}{y} } = - \frac{ y x^{y-1} + y^x \ln y }{ x^y \ln x + x y^{x-1} }$.
REASONING: This classic implicit equation ($x^y + y^x = \text{const}$) appears in JEE/NEET. The key is treating $x^y$ and $y^x$ separately with log diff, then combining. Each log diff step uses product rule on the exponentiated log form. The final expression is symmetric in $x,y$ as expected.
ANSWER: $\frac{dy}{dx} = - \frac{ y x^{y-1} + y^x \ln y }{ x^y \ln x + x y^{x-1} }$.

## COMPETENCY_QUESTION_1
QUESTION: A company's revenue from selling $x$ units of a product is given by $R(x) = x^{10-x}$ for $0 < x < 10$. The management wants to know the marginal revenue when $x = 5$. Compute $R'(5)$ and interpret its meaning in business terms.
COMPETENCY: Mathematical modeling and interpretation in economics context (application of logarithmic differentiation to marginal analysis)
STEPS:
- Step 1: Recognize $R(x) = x^{10-x}$ has variable base and variable exponent — use logarithmic differentiation.
- Step 2: $\ln R = (10-x) \ln x$.
- Step 3: Differentiate: $\frac{1}{R} R' = (-1)\ln x + (10-x)\frac{1}{x} = -\ln x + \frac{10}{x} - 1$.
- Step 4: $R' = R \left( \frac{10}{x} - 1 - \ln x \right) = x^{10-x} \left( \frac{10}{x} - 1 - \ln x \right)$.
- Step 5: Evaluate at $x=5$: $R(5) = 5^5 = 3125$; $R'(5) = 3125 \left( \frac{10}{5} - 1 - \ln 5 \right) = 3125 (2 - 1 - \ln 5) = 3125(1 - \ln 5) \approx 3125(1 - 1.609) = -1903$.
ANSWER: $R'(5) = 3125(1 - \ln 5) \approx -1903$. The negative marginal revenue at $x=5$ means selling the 6th unit would *decrease* total revenue — the company has passed the revenue-maximizing quantity.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Consider the curve defined implicitly by $x^y = y^x$ for $x, y > 0$, $x \neq y$. (a) Show that $\ln x / x = \ln y / y$. (b) Use logarithmic differentiation to find $\frac{dy}{dx}$ in terms of $x$ and $y$. (c) Prove that at any point on this curve where $x \neq y$, the tangent line has slope $\frac{dy}{dx} = \frac{y(x \ln y - y)}{x(y \ln x - x)}$.
COMPETENCY: Multi-step analytical reasoning combining implicit differentiation, logarithmic differentiation, and algebraic manipulation (JEE Advanced style)
STEPS:
- Step 1 (a): Take $\ln$ both sides of $x^y = y^x$: $y \ln x = x \ln y$. Divide by $xy$ (non-zero): $\frac{\ln x}{x} = \frac{\ln y}{y}$.
- Step 2 (b): Differentiate $y \ln x = x \ln y$ implicitly w.r.t $x$:
$\frac{dy}{dx} \ln x + y \cdot \frac{1}{x} = \ln y + x \cdot \frac{1}{y} \frac{dy}{dx}$.
- Step 3: Collect $\frac{dy}{dx}$ terms:
$\frac{dy}{dx} (\ln x - \frac{x}{y}) = \ln y - \frac{y}{x}$.
- Step 4: Solve:
$\frac{dy}{dx} = \frac{ \ln y - \frac{y}{x} }{ \ln x - \frac{x}{y} } = \frac{ x \ln y - y }{ x } \cdot \frac{ y }{ y \ln x - x } = \frac{ y(x \ln y - y) }{ x(y \ln x - x) }$.
- Step 5 (c): The expression matches the required form. Note that $x \ln y = y \ln x$ from (a), so alternative forms exist.
ANSWER: (a) $\frac{\ln x}{x} = \frac{\ln y}{y}$; (b) $\frac{dy}{dx} = \frac{ \ln y - y/x }{ \ln x - x/y }$; (c) Verified: $\frac{dy}{dx} = \frac{ y(x \ln y - y) }{ x(y \ln x - x) }$.
DIFFICULTY: hard