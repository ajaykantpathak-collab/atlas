## ELI5
A Delhi Metro fare card: the fare depends only on the distance, and one journey can never be charged two amounts. Tap in at Rajiv Chowk, tap out at HUDA City Centre - exactly one fare comes out. That is a function: a rule assigning each input exactly one output, written y = f(x), like a fare formula where f(15) = 50 means 15 km costs 50 rupees. Same input, guaranteed same output - a deterministic machine, which is why calculus can later study its rate of change.

## DEFINITION
A function $f$ from a set $A$ (domain) to a set $B$ (co-domain) is a rule that assigns to **each element $x \in A$ exactly one element $y \in B$**, denoted as $y = f(x)$. The set of all actual outputs $\{f(x) : x \in A\}$ is called the **range** of the function.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can (1) determine if a given relation (set of ordered pairs, equation, graph, or arrow diagram) represents a function by verifying the "unique output for each input" condition, and (2) evaluate $f(a)$ for a given algebraic function $f(x)$ and interpret the meaning of the input/output in a real-world context.

## SCOPE_BOUNDARY
This node covers the **definition of a function**, distinction between domain/co-domain/range, function notation $f(x)$, evaluation of functions, algebra of functions (sum, difference, product, quotient), and the vertical line test for graphs. It does **NOT** cover graphical representation details (node 003), domain/range calculation techniques (node 004), classification of function types (node 005), or limits/continuity/derivatives (nodes 006+).

## WALKTHROUGH
Imagine you are designing a **metro fare card system** for Delhi Metro: the fare depends *only* on the distance travelled (input), and for every distance, there must be *exactly one* fare (output) — no ambiguity. Start by asking: "If I tap in at Rajiv Chowk and tap out at HUDA City Centre, can the machine charge me two different amounts for the same journey?" This anchors the "single output" rule. Next, introduce $f(x)$ notation as the "fare calculator formula." Show how $f(15) = 50$ means "15 km costs ₹50." Then demonstrate algebra of functions: if $f(x)$ is the base fare and $g(x)$ is a discount function, $(f-g)(x)$ is the net fare. End with the insight: **a function is a deterministic machine — same input, guaranteed same output — which is why Calculus can study its rate of change.**

Takeaway: mastery means testing any relation for the unique-output rule and evaluating f(a) with a story attached. Exam moves: is-it-a-function questions and interpret-f(a) items on the fare-card scene. Check yourself: the test lives on the inputs - an input with two outputs fails, but two inputs sharing one output is perfectly legal, like two distances costing the same fare. Students miss it because machine pictures invite vending-machine fancy, when the tap-in-tap-out scene shows the design: the smart card cannot improvise, the range is only the fares actually charged, and the algebra of functions is just fares being added, subtracted or discounted - one deterministic machine at a time.

## DIAGNOSTIC_QUESTION_1
State the defining condition that distinguishes a function from a general relation. Use the terms "domain," "co-domain," and "unique image" in your answer.

## DIAGNOSTIC_ANSWER_1
A relation $f \subseteq A \times B$ is a function if and only if **every element $x$ in the domain $A$ has exactly one image $y$ in the co-domain $B$** (i.e., $(x, y_1) \in f$ and $(x, y_2) \in f \implies y_1 = y_2$). A wrong answer (e.g., "each input has at least one output" or "outputs are unique") reveals the student confuses *existence* with *uniqueness* or confuses the function property with one-to-one (injective) property.

## DIAGNOSTIC_QUESTION_2
The relation $R = \{(x, y) : y^2 = x, x \in \mathbb{R}, y \in \mathbb{R}\}$ is given. Is $R$ a function? Justify your answer by testing a specific value from the domain.

## DIAGNOSTIC_ANSWER_2
$R$ is **not a function**. For $x = 4 \in \mathbb{R}$, we have $y^2 = 4 \implies y = 2$ or $y = -2$. Thus, the single input $4$ maps to two distinct outputs ($2$ and $-2$), violating the "unique image" condition. A wrong answer (e.g., "yes, because every $x$ gives a $y$") reveals the student checks only *existence* of an output, not *uniqueness*, or mistakenly treats $y = \sqrt{x}$ (principal root) as the relation instead of $y^2 = x$.

## DIAGNOSTIC_QUESTION_3
Let $f(x) = 2x^2 - 3x + 1$ and $g(x) = x - 4$. Define the function $h = \frac{f}{g}$. Find the domain of $h$ and evaluate $h(0)$.

## DIAGNOSTIC_ANSWER_3
**Domain of $h$:** $h(x) = \frac{f(x)}{g(x)}$ is defined only when $g(x) \neq 0$. $g(x) = x - 4 = 0 \implies x = 4$. So Domain $= \mathbb{R} \setminus \{4\}$. **Evaluation:** $h(0) = \frac{f(0)}{g(0)} = \frac{2(0)^2 - 3(0) + 1}{0 - 4} = \frac{1}{-4} = -\frac{1}{4}$. A wrong domain (e.g., $\mathbb{R}$) reveals the student forgets the quotient condition $g(x) \neq 0$. A wrong evaluation (e.g., $h(0) = f(0) \cdot g(0)$) reveals confusion between quotient and product algebra.

## DIAGNOSTIC_QUESTION_4
Consider the graph of a circle $x^2 + y^2 = 9$. A student claims: "Since for $x=0$ we get only $y=3$ and $y=-3$ (two values), but for $x=3$ we get only $y=0$ (one value), the circle *partially* satisfies the function condition. So it is a function for some $x$." Analyze this claim.

## DIAGNOSTIC_ANSWER_4
The claim is **incorrect**. A relation is a function **only if *every* element of the domain has a unique image**. The definition is universal ("for all $x \in \text{Domain}$"), not existential ("for some $x$"). Since $x=0$ (which is in the domain $[-3, 3]$) has two images, the relation fails the function definition globally. A wrong answer accepting "partial function" reveals the student treats the vertical line test as a "majority pass" criterion rather than a strict "no vertical line cuts the curve more than once" condition.

## DIAGNOSTIC_QUESTION_5
A student defines a function $f: \mathbb{R} \to \mathbb{R}$ by $f(x) = \frac{x^2 - 4}{x - 2}$ and simplifies it to $f(x) = x + 2$, claiming the domain is $\mathbb{R}$ because "$x+2$ is defined for all real numbers." Evaluate this reasoning.

## DIAGNOSTIC_ANSWER_5
The reasoning is **flawed**. The original rule $f(x) = \frac{x^2 - 4}{x - 2}$ is **undefined at $x = 2$** (division by zero). Algebraic simplification $x+2$ is valid *only for $x \neq 2$*. The domain of the *given function* is $\mathbb{R} \setminus \{2\}$, not $\mathbb{R}$. The simplified expression $x+2$ represents a *different function* (say $g(x) = x+2$) which *extends* $f$ continuously. A wrong answer accepting domain $\mathbb{R}$ reveals the student confuses the *algebraic expression* with the *function rule*, ignoring the implicit domain restriction of the original definition.

## DIAGNOSTIC_QUESTION_6
Create a real-world scenario (Indian context) involving **two variables** where the relationship is **NOT a function**. Define the independent and dependent variables clearly, and explain *exactly which input* breaks the function condition by producing multiple outputs.

## DIAGNOSTIC_ANSWER_6
**Scenario:** "Mapping a **PIN code** (input) to the **City name** (output) in India." Independent variable: PIN code (6-digit number). Dependent variable: City name. **Breakdown:** PIN code `110001` (Connaught Place, Delhi) maps to "New Delhi". But PIN code `560001` maps to "Bengaluru". Wait — that's still a function (one PIN $\to$ one city). **Correct non-function scenario:** "Mapping a **City name** (input) to **PIN code(s)** (output)." Input: "Mumbai". Outputs: `400001`, `400002`, `400050`, ... (multiple PIN codes for one city). The input "Mumbai" has **multiple images**, violating the function condition. A poor answer (e.g., "Temperature vs Time" — which *is* a function) reveals the student cannot construct a many-to-one or one-to-many relation intentionally.

## COMMON_MISCONCEPTION
**"If an equation can be solved for $y$, it is a function of $x$."** Students see $y = x^2$ (function) and $x = y^2$ (not a function of $x$) but think "both have $y$ isolated on one side in some form." They miss that $x = y^2 \implies y = \pm\sqrt{x}$ gives **two outputs** for $x>0$. The error stems from treating algebraic manipulation (solving for $y$) as equivalent to the *definition* (unique output per input), ignoring the $\pm$ sign from even roots. Example: $x^2 + y^2 = 25$ — students say "it's a function because it's an equation in $x$ and $y$."

## ON_FAILURE
1. **Re-anchor to the vending machine:** "If you press 'Cola' and sometimes get Cola, sometimes get Sprite — is it a reliable machine? No. A function *must* be reliable for *every* button." 2. **Drill the vertical line test physically:** Draw $x=y^2$ on paper. Place a ruler vertically at $x=4$. Mark the two intersection points $(4,2)$ and $(4,-2)$. Say: "One input ($4$), two outputs ($2, -2$). **Fail.**" 3. **Practice "Find the culprit":** Give 5 relations (tables, graphs, equations). For each non-function, student must *explicitly state the specific input value* with multiple outputs. 4. **Contrast $y=\sqrt{x}$ vs $y^2=x$:** Emphasize $\sqrt{\cdot}$ denotes the *principal* (non-negative) root by *definition*, making it a function; $y^2=x$ is the *relation* containing both roots.

## PREREQUISITE_NODE_IDS
c11_app_cbse_08_001

## PREREQUISITE_REASONS
c11_app_cbse_08_001: The Introduction node establishes the context of Calculus as the study of change via functions, motivating why we need a precise definition of "function" before studying limits/derivatives.

## FORWARD_NODE_IDS
c11_app_cbse_08_003, c11_app_cbse_08_004, c11_app_cbse_08_005

## FORWARD_REASONS
c11_app_cbse_08_003: Graphical representation requires knowing what a function *is* (vertical line test) before plotting or interpreting graphs. c11_app_cbse_08_004: Domain/range definitions depend entirely on the function's input-output structure established here. c11_app_cbse_08_005: Classifying function types (polynomial, rational, etc.) presupposes the object being classified is a function.

## CROSS_SUBJECT_PREREQS
none

## CROSS_SUBJECT_REASONS
No prior class nodes available for cross-subject links in Applied Mathematics Class 11.

## CHAIN_DESCRIPTION
c11_app_cbse_08_001 -> c11_app_cbse_08_002 -> c11_app_cbse_08_003

## THIS_FORMULA
**Algebra of Functions:** Let $f$ and $g$ be functions with domains $D_f$ and $D_g$. For $x \in D_f \cap D_g$:
- $(f+g)(x) = f(x) + g(x)$
- $(f-g)(x) = f(x) - g(x)$
- $(fg)(x) = f(x) \cdot g(x)$
- $\left(\frac{f}{g}\right)(x) = \frac{f(x)}{g(x)}$, provided $g(x) \neq 0$

## FORMULA_VARIABLES
- $f, g$: Functions from subsets of $\mathbb{R}$ to $\mathbb{R}$
- $x$: Independent variable (input), $x \in D_f \cap D_g$
- $f(x), g(x)$: Dependent variable values (outputs)
- $D_f, D_g$: Domains of $f$ and $g$ respectively

## FORMULA_UNITS
Units depend on the real-world context of $f$ and $g$ (e.g., if $f(x)$ is velocity in m/s and $g(x)$ is time in s, $(fg)(x)$ is distance in m). In pure mathematics, inputs/outputs are real numbers (dimensionless).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_app_cbse_08_001 | The concept of "variable" and "rate of change" introduced in the Calculus Introduction is the physical motivation for defining functions mathematically.
c11_phy_cbse_02_001 | In Physics (Kinematics), position $x(t)$, velocity $v(t)$, acceleration $a(t)$ are all functions of time $t$; the derivative $dx/dt = v$ is the core link between Calculus and Physics.

## PREREQ_CONCEPT
Understanding of **variables** (independent/dependent) and **ordered pairs** $(x, y)$ from coordinate geometry (Class 9/10).

## PREREQ_BEFORE
The student must be able to distinguish between an independent variable (freely chosen) and a dependent variable (determined by a rule), and plot points $(x, y)$ on a Cartesian plane.

## PREREQ_STUCK
Review **Cartesian product of sets** and **relations** (Class 11 Maths Chapter 2) — specifically, that a relation is a subset of $A \times B$, and a function is a *special type* of relation with the uniqueness constraint.

## WORKED_EXAMPLE_1
PROBLEM: A Delhi Metro smart card charges a base fare of ₹10 for the first 2 km, and ₹5 for every additional km. Let $x$ be the distance travelled in km ($x \geq 0$). Define the fare $F(x)$ as a function. Is $F$ a function? Find $F(1)$, $F(5)$, and $(F+F)(3)$ (i.e., fare for two passengers travelling 3 km each).

STEPS:
- Step 1: Identify the rule. For $0 \leq x \leq 2$, $F(x) = 10$. For $x > 2$, $F(x) = 10 + 5(x - 2) = 5x$.
- Step 2: Verify function condition. For every $x \geq 0$, the rule gives exactly one fare value. No $x$ has two fares. **Yes, $F$ is a function.** Domain: $[0, \infty)$.
- Step 3: Evaluate $F(1)$. Since $1 \leq 2$, $F(1) = 10$. Evaluate $F(5)$. Since $5 > 2$, $F(5) = 5(5) = 25$.
- Step 4: Compute $(F+F)(3)$. First, $F(3) = 5(3) = 15$ (since $3 > 2$). Then $(F+F)(3) = F(3) + F(3) = 15 + 15 = 30$. This is the total fare for two passengers each travelling 3 km.
- Step 5: Interpret. The function models a real-world fare structure. The algebra $(F+F)(x) = 2F(x)$ represents scaling for multiple passengers.

REASONING: The piecewise definition captures the fare slab structure. The function condition holds because the slabs are mutually exclusive and exhaustive. Algebra of functions allows combining fares for group travel.

ANSWER: $F(x) = \begin{cases} 10, & 0 \leq x \leq 2 \\ 5x, & x > 2 \end{cases}$; $F$ is a function; $F(1)=10$, $F(5)=25$, $(F+F)(3)=30$.

## WORKED_EXAMPLE_2
PROBLEM: Let $f(x) = \sqrt{x+3}$ and $g(x) = \frac{1}{x-2}$. Find the domain of $(f \cdot g)(x)$ and evaluate $(f \cdot g)(1)$.

STEPS:
- Step 1: Find domain of $f$. $f(x) = \sqrt{x+3}$ requires $x+3 \geq 0 \implies x \geq -3$. So $D_f = [-3, \infty)$.
- Step 2: Find domain of $g$. $g(x) = \frac{1}{x-2}$ requires $x-2 \neq 0 \implies x \neq 2$. So $D_g = \mathbb{R} \setminus \{2\}$.
- Step 3: Domain of product $(f \cdot g)(x)$ is $D_f \cap D_g = [-3, \infty) \cap (\mathbb{R} \setminus \{2\}) = [-3, 2) \cup (2, \infty)$.
- Step 4: Evaluate at $x=1$. Check $1 \in \text{Domain}$? Yes, $1 \in [-3, 2)$. $f(1) = \sqrt{1+3} = \sqrt{4} = 2$. $g(1) = \frac{1}{1-2} = -1$.
- Step 5: $(f \cdot g)(1) = f(1) \cdot g(1) = 2 \times (-1) = -2$.

REASONING: The domain of any algebraic combination of functions is the intersection of their individual domains, with the extra restriction $g(x) \neq 0$ for quotients. Here we only need intersection for product. Evaluation is direct substitution after verifying the input lies in the combined domain.

ANSWER: Domain of $(f \cdot g)$ is $[-3, 2) \cup (2, \infty)$; $(f \cdot g)(1) = -2$.

## WORKED_EXAMPLE_3
PROBLEM: A rectangular plot of land in a village has length $L$ metres and breadth $B$ metres. The area $A$ is a function of $L$ and $B$: $A(L, B) = L \times B$. The village panchayat decides to increase the length by 20% and decrease the breadth by 10%. Express the new area $A_{\text{new}}$ as a function of the original $L$ and $B$. By what percentage does the area change? Is the percentage change dependent on $L$ or $B$?

STEPS:
- Step 1: Identify original function: $A(L, B) = L \cdot B$. (Note: This is a function of *two* variables, but the concept of unique output per input pair still holds.)
- Step 2: Express new dimensions. New length $L' = L + 0.2L = 1.2L$. New breadth $B' = B - 0.1B = 0.9B$.
- Step 3: Define new area function: $A_{\text{new}}(L, B) = L' \cdot B' = (1.2L)(0.9B) = 1.08 LB = 1.08 A(L, B)$.
- Step 4: Compute percentage change: $\frac{A_{\text{new}} - A}{A} \times 100\% = \frac{1.08A - A}{A} \times 100\% = 0.08 \times 100\% = 8\%$ increase.
- Step 5: Analyze dependency. The factor $1.08$ is a constant — it does not contain $L$ or $B$. The percentage change is **independent** of the original dimensions.
- Step 6: Connect to function algebra. If we define $f(L) = 1.2L$ and $g(B) = 0.9B$, then $A_{\text{new}} = f(L) \cdot g(B)$. The product of linear scaling functions yields a constant scaling factor for the area.

REASONING: This extends the single-variable function concept to a multivariable context (area depends on two inputs) and uses algebra of functions (product) to model a real-world percentage change problem. The constancy of the percentage change is a key insight: proportional changes multiply.

ANSWER: $A_{\text{new}}(L, B) = 1.08 LB$; Area increases by **8%**; The percentage change is **independent** of $L$ and $B$.

## COMPETENCY_QUESTION_1
QUESTION: A function $f: \mathbb{R} \to \mathbb{R}$ is defined by $f(x) = \frac{ax + b}{cx + d}$, where $a, b, c, d \in \mathbb{R}$ and $c \neq 0$. The function satisfies $f(1) = 2$, $f(2) = 3$, and $f(f(x)) = x$ for all $x$ in its domain. Find the values of $a, b, c, d$ and the domain of $f$.

COMPETENCY: **Analytical Reasoning & Algebraic Manipulation** — solving for parameters using function properties (involution $f(f(x))=x$) and given values, while respecting domain restrictions.

STEPS:
- Step 1: Use $f(f(x)) = x$. For a linear fractional function $f(x) = \frac{ax+b}{cx+d}$, $f(f(x)) = x$ implies it is an **involution**. This holds iff $a + d = 0$ (trace zero condition for $2\times2$ matrix representation). So $d = -a$.
- Step 2: Substitute $d = -a$ into $f(x) = \frac{ax+b}{cx-a}$. Use $f(1)=2$: $\frac{a+b}{c-a} = 2 \implies a+b = 2c - 2a \implies 3a + b - 2c = 0$. (Eq 1)
- Step 3: Use $f(2)=3$: $\frac{2a+b}{2c-a} = 3 \implies 2a+b = 6c - 3a \implies 5a + b - 6c = 0$. (Eq 2)
- Step 4: Subtract Eq 1 from Eq 2: $2a - 4c = 0 \implies a = 2c$. Substitute into Eq 1: $3(2c) + b - 2c = 0 \implies 6c + b - 2c = 0 \implies b = -4c$.
- Step 5: Choose $c=1$ (scaling invariance: multiplying numerator/denominator by constant doesn't change $f$). Then $a=2, b=-4, d=-2$. $f(x) = \frac{2x - 4}{x - 2} = \frac{2(x-2)}{x-2}$.
- Step 6: Domain: Denominator $x-2 \neq 0 \implies x \neq 2$. Domain = $\mathbb{R} \setminus \{2\}$. Note: $f(x) = 2$ for all $x \neq 2$, but $f(f(x))$ is not defined at $x=2$ (and $f(2)$ undefined). Check $f(f(x))$: For $x \neq 2$, $f(x)=2$, then $f(f(x)) = f(2)$ which is **undefined**! Contradiction? Wait — $f(x)=2$ constant on domain, so $f(f(x)) = f(2)$ is undefined. The condition $f(f(x))=x$ **cannot hold** for this $f$. Re-examine: $f(f(x))=x$ requires $f$ to be bijective on its domain. A constant function is not. **Error in assumption**: $f(f(x))=x$ for *all $x$ in domain* implies range $\subseteq$ domain and $f$ is its own inverse. For $f(x) = \frac{ax+b}{cx-a}$, $f(f(x)) = x$ holds identically *where defined* if $a^2+bc \neq 0$. Here $a^2+bc = 4c^2 -4c^2 = 0$ — degenerate case! So $a^2+bc \neq 0$ is needed. With $a=2c, b=-4c$, $a^2+bc = 4c^2 -4c^2=0$. **No solution exists** satisfying all three conditions simultaneously. The problem constraints are inconsistent.

ANSWER: **No such function exists.** The conditions $f(1)=2$, $f(2)=3$, and $f(f(x))=x$ are mutually inconsistent for a linear fractional function $f(x) = \frac{ax+b}{cx+d}$ with $c \neq 0$. (A valid function would require $a^2+bc \neq 0$ for the involution property, but the given values force $a^2+bc=0$, making $f$ constant on its domain, violating $f(f(x))=x$.)

DIFFICULTY: hard

## COMPETENCY_QUESTION_2
QUESTION: The cost $C(x)$ (in ₹) of producing $x$ units of a product in a factory is given by $C(x) = 0.005x^3 - 0.3x^2 + 10x + 5000$ for $x \geq 0$. The price per unit $p(x)$ (in ₹) at which $x$ units can be sold is given by $p(x) = 200 - 0.5x$. Define the **revenue function** $R(x)$ and **profit function** $P(x)$. Find the number of units $x$ that maximizes profit, and the maximum profit. (Assume $x$ is a continuous variable for optimization.)

COMPETENCY: **Mathematical Modelling & Optimization** — constructing composite functions from economic definitions (Revenue = Price × Quantity, Profit = Revenue - Cost) and using derivative concepts (preview of Chapter 8.8/8.9) to find maximum.

STEPS:
- Step 1: Define Revenue function: $R(x) = x \cdot p(x) = x(200 - 0.5x) = 200x - 0.5x^2$.
- Step 2: Define Profit function: $P(x) = R(x) - C(x) = (200x - 0.5x^2) - (0.005x^3 - 0.3x^2 + 10x + 5000) = -0.005x^3 - 0.2x^2 + 190x - 5000$.
- Step 3: To maximize $P(x)$, find critical points: $P'(x) = 0$. $P'(x) = -0.015x^2 - 0.4x + 190$. (This uses derivative rules from nodes 008/009 — preview).
- Step 4: Solve $-0.015x^2 - 0.4x + 190 = 0 \implies 0.015x^2 + 0.4x - 190 = 0$. Multiply by 1000: $15x^2 + 400x - 190000 = 0 \implies 3x^2 + 80x - 38000 = 0$.
- Step 5: Quadratic formula: $x = \frac{-80 \pm \sqrt{6400 + 456000}}{6} = \frac{-80 \pm \sqrt{462400}}{6} = \frac{-80 \pm 680}{6}$. Positive root: $x = \frac{600}{6} = 100$. (Negative root discarded as $x \geq 0$).
- Step 6: Verify maximum: $P''(x) = -0.03x - 0.4$. At $x=100$, $P''(100) = -3 - 0.4 = -3.4 < 0 \implies$ Local maximum.
- Step 7: Compute maximum profit: $P(100) = -0.005(10^6) - 0.2(10^4) + 190(100) - 5000 = -5000 - 2000 + 19000 - 5000 = 7000$.

ANSWER: $R(x) = 200x - 0.5x^2$; $P(x) = -0.005x^3 - 0.2x^2 + 190x - 5000$; Profit is maximized at **$x = 100$ units**; Maximum profit = **₹7,000**.

DIFFICULTY: medium