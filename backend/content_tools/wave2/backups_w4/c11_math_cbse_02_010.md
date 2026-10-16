## ELI5
Samosas earn ₹10 each, juice ₹15: total revenue is (Rs + Rj)(x) = 10x + 15x = 25x. The algebra of real functions defines f + g, f − g, αf, fg and f/g pointwise - (f+g)(x) = f(x) + g(x) - and profit is revenue minus cost. Domains obey intersection: the combination lives where both live, and the quotient additionally evicts every point where g(x) = 0. Arithmetic on values, intersection on homes - that is the whole grammar.

## DEFINITION
The algebra of real functions defines operations on functions \(f: X \to \mathbb{R}\) and \(g: X \to \mathbb{R}\) where \(X \subset \mathbb{R}\). The sum \((f+g)\), difference \((f-g)\), scalar multiplication \((\alpha f)\), product \((fg)\), and quotient \(\left(\frac{f}{g}\right)\) are functions from \(X\) (or a subset) to \(\mathbb{R}\) defined pointwise: \((f+g)(x)=f(x)+g(x)\), \((f-g)(x)=f(x)-g(x)\), \((\alpha f)(x)=\alpha f(x)\), \((fg)(x)=f(x)g(x)\), and \(\left(\frac{f}{g}\right)(x)=\frac{f(x)}{g(x)}\) provided \(g(x)\neq 0\). The domain of \(f+g\), \(f-g\), and \(fg\) is \(\text{dom}(f) \cap \text{dom}(g)\); the domain of \(\frac{f}{g}\) is \(\{x \in \text{dom}(f) \cap \text{dom}(g) \mid g(x) \neq 0\}\).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can compute the sum, difference, product, and quotient of two given real functions, correctly determine the domain of each resulting function, and evaluate the combined function at specific points. The student can also solve for unknown functions given algebraic conditions involving these operations.

## SCOPE_BOUNDARY
This node covers the five algebraic operations on real functions (addition, subtraction, scalar multiplication, multiplication, division) with emphasis on domain determination. It does NOT cover composition of functions (which is in a later chapter) or operations on functions with domains not subsets of \(\mathbb{R}\). It stays within Class 11 NCERT scope: real-valued functions with domains subsets of \(\mathbb{R}\).

## WALKTHROUGH
Imagine you run a small snack stall at a school fair. Your revenue from selling samosas is given by \(R_s(x) = 10x\) (₹10 per samosa, \(x\) samosas sold) and from selling juice is \(R_j(x) = 15x\) (₹15 per glass). To find total revenue, you naturally add the two functions: \(R_{total}(x) = R_s(x) + R_j(x) = 25x\). But what if you want profit? You subtract cost \(C(x) = 5x + 100\) from revenue: \(P(x) = R_{total}(x) - C(x)\). This is exactly the algebra of functions — combining functions using arithmetic operations. Start by writing down the given functions and their domains. Then apply the operation pointwise: for each \(x\) in the common domain, compute the new function value. For division, explicitly exclude points where the denominator is zero. The key insight is that the domain of the new function is the intersection of the original domains (minus zeros of denominator for division).

Takeaway: mastery means each operation being computed pointwise on the common domain, quotient domains pruned of denominator zeros, and unknown functions recovered from combination conditions. Exam moves: compute-f-plus-g questions and determine-the-domain items with the intersection stated explicitly. Check yourself: profit is a function subtraction, not a number subtraction - the rule applies at every x. Students miss it because they keep the wider domain after dividing, when the definition's proviso g(x) ≠ 0 deletes points one by one: every excluded value must be named or the domain answer is wrong.

## DIAGNOSTIC_QUESTION_1
State the domain of \((f+g)\) if \(f(x) = \sqrt{x-2}\) and \(g(x) = \frac{1}{x-3}\).

## DIAGNOSTIC_ANSWER_1
The domain of \(f\) is \([2, \infty)\) and the domain of \(g\) is \(\mathbb{R} \setminus \{3\}\). The domain of \(f+g\) is the intersection: \([2, \infty) \cap (\mathbb{R} \setminus \{3\}) = [2, 3) \cup (3, \infty)\). A wrong answer like \([2, \infty)\) reveals the student forgot to exclude \(x=3\) where \(g\) is undefined, or forgot that domain of sum is intersection, not union.

## DIAGNOSTIC_QUESTION_2
Explain why the domain of \(\frac{f}{g}\) is not simply the intersection of domains of \(f\) and \(g\). Give an example where the domain of \(\frac{f}{g}\) is strictly smaller than \(\text{dom}(f) \cap \text{dom}(g)\).

## DIAGNOSTIC_ANSWER_2
The domain of \(\frac{f}{g}\) must also exclude points where \(g(x)=0\) because division by zero is undefined. For example, let \(f(x)=x\) and \(g(x)=x-2\). Then \(\text{dom}(f)=\mathbb{R}\), \(\text{dom}(g)=\mathbb{R}\), intersection is \(\mathbb{R}\). But \(\frac{f}{g}(x)=\frac{x}{x-2}\) is undefined at \(x=2\), so its domain is \(\mathbb{R}\setminus\{2\}\). A wrong answer indicates the student treats division like multiplication, ignoring the denominator-zero restriction.

## DIAGNOSTIC_QUESTION_3
If \(f(x) = 2x^2 - 3x + 1\) and \(g(x) = x - 4\), find \((fg)(x)\) and evaluate \((fg)(2)\).

## DIAGNOSTIC_ANSWER_3
\((fg)(x) = (2x^2 - 3x + 1)(x - 4) = 2x^3 - 8x^2 - 3x^2 + 12x + x - 4 = 2x^3 - 11x^2 + 13x - 4\). Then \((fg)(2) = 2(8) - 11(4) + 13(2) - 4 = 16 - 44 + 26 - 4 = -6\). A wrong answer like \(-10\) suggests an error in polynomial multiplication (e.g., missing a term) or arithmetic mistake in evaluation.

## DIAGNOSTIC_QUESTION_4
Two functions \(f\) and \(g\) have domains \(\text{dom}(f) = [-1, 5]\) and \(\text{dom}(g) = [0, 6]\). The function \(h = f - g\) is defined. If \(h(x) = 0\) has a solution at \(x = 5.5\), is this possible? Justify.

## DIAGNOSTIC_ANSWER_4
No, it is not possible. The domain of \(h = f - g\) is \(\text{dom}(f) \cap \text{dom}(g) = [0, 5]\). The value \(x = 5.5\) is not in this intersection, so \(h(5.5)\) is undefined. A wrong answer (e.g., "yes") reveals the student thinks the domain of difference is the union or doesn't check domain intersection before solving equations.

## DIAGNOSTIC_QUESTION_5
A student claims that for any two real functions \(f\) and \(g\), \((f+g)(x) = (g+f)(x)\) and \((f-g)(x) = (g-f)(x)\). Evaluate this claim and correct any false statement.

## DIAGNOSTIC_ANSWER_5
The first statement is true: addition of functions is commutative because \((f+g)(x)=f(x)+g(x)=g(x)+f(x)=(g+f)(x)\). The second statement is false: subtraction is not commutative; \((f-g)(x)=f(x)-g(x) = -(g(x)-f(x)) = -(g-f)(x)\). A student who says both are true does not understand that subtraction of real numbers (and hence functions) is not commutative.

## DIAGNOSTIC_QUESTION_6
Construct two different real functions \(f\) and \(g\) such that \((fg)(x) = x^2 - 9\) and \(\text{dom}(f) \cap \text{dom}(g) = \mathbb{R}\). State your functions and verify.

## DIAGNOSTIC_ANSWER_6
Example: \(f(x) = x+3\), \(g(x) = x-3\). Then \((fg)(x) = (x+3)(x-3) = x^2 - 9\). Both domains are \(\mathbb{R}\), intersection is \(\mathbb{R}\). Another valid pair: \(f(x)=x^2-9\), \(g(x)=1\). A poor answer might give \(f(x)=\sqrt{x+3}\), \(g(x)=\sqrt{x-3}\) which have restricted domains, or might not verify the product.

## COMMON_MISCONCEPTION
Students often incorrectly assume the domain of \(f+g\), \(f-g\), or \(fg\) is the **union** of the domains of \(f\) and \(g\) instead of the **intersection**. For example, given \(f(x)=\sqrt{x}\) (domain \([0,\infty)\)) and \(g(x)=\sqrt{-x}\) (domain \((-\infty,0]\)), a student might say \(\text{dom}(f+g) = \mathbb{R}\) because "both functions together cover all real numbers". The correct domain is \([0,\infty) \cap (-\infty,0] = \{0\}\) only. This error stems from confusing "where at least one function is defined" with "where both are defined".

## ON_FAILURE
If a student uses union instead of intersection for domains, do this: 1) Write the domains of \(f\) and \(g\) as sets on the number line. 2) Ask: "For \(f+g\) to make sense at \(x\), must \(f(x)\) exist? Must \(g(x)\) exist?" 3) Highlight that if either is undefined, the sum is undefined. 4) Show the intersection visually as the overlap region. 5) Practice with 3 examples where domains are intervals with partial overlap, one contained in another, and disjoint (resulting in empty domain). 6) Emphasize: "The domain of the combination is where **both** original functions exist simultaneously."

## PREREQUISITE_NODE_IDS
c11_math_cbse_02_005, c11_math_cbse_02_006, c11_math_cbse_02_007, c11_math_cbse_02_008, c11_math_cbse_02_009, c9_math_ch3_6, c9_math_ch3_10, c10_math_cbse_02_001, c11_math_cbse_02_004

## PREREQUISITE_REASONS
c11_math_cbse_02_005: Defines function, domain, codomain, image — essential to know what a real function is before operating on it.
c11_math_cbse_02_006: Identity and constant functions are basic real functions used in algebra examples.
c11_math_cbse_02_007: Polynomial functions (linear, quadratic) are the most common functions used in algebraic operations.
c11_math_cbse_02_008: Rational and modulus functions introduce domain restrictions (denominator ≠ 0, piecewise definitions) critical for domain of combined functions.
c11_math_cbse_02_009: Signum and greatest integer functions are piecewise-defined; combining them requires careful domain handling.
c9_math_ch3_6: Real numbers as union of rational and irrational — needed to understand domains are subsets of \(\mathbb{R}\).
c9_math_ch3_10: Operations on real numbers (closure properties) — underpins pointwise operations on function values.
c10_math_cbse_02_001: Zeros of polynomials and x-intercepts — relevant when finding where denominator is zero for quotient domain.
c11_math_cbse_02_004: Algebra of functions requires compatible domains.  

## FORWARD_NODE_IDS
c11_math_cbse_02_011, c11_math_cbse_02_012, c12_math_cbse_01_003, c12_math_cbse_03_007, c12_math_cbse_03_008, c12_math_cbse_05_001

## FORWARD_REASONS
c11_math_cbse_02_011: Graphs of combined functions (sum, difference, product) are built by pointwise operations on coordinates; algebra of functions is the algebraic counterpart.
c11_math_cbse_02_012: Word problems often require forming new functions by adding revenue functions, subtracting cost from revenue, etc., directly applying algebra of functions.
c12_math_cbse_01_003: Algebra of functions — needed later for composition of injective functions (forward node).  
c12_math_cbse_03_007: Algebra of functions (sum, difference, product) builds the algebraic mindset needed for matrix algebra properties.  
c12_math_cbse_03_008: Algebra of real functions provides the concept of an operation (transpose) acting on objects (matrices) with properties like distributivity.  
c12_math_cbse_05_001: Algebra of real functions — used when combining functions in piecewise definitions.  

## CROSS_SUBJECT_PREREQS
c9_math_ch2_5, c9_math_ch2_6, c10_math_cbse_04_001
## CROSS_SUBJECT_REASONS
c9_math_ch2_5: Graph of linear equation in two variables — visualizes functions as lines; adding functions corresponds to adding y-coordinates.
c9_math_ch2_6: Slope-intercept form — linear functions \(f(x)=mx+c\) are closed under addition/subtraction; slope and intercept add separately.
c10_math_cbse_04_001: Quadratic equations standard form — product of two linear functions is quadratic; finding zeros of product relates to zeros of factors.

## CHAIN_DESCRIPTION
c11_math_cbse_02_005 -> c11_math_cbse_02_010 -> c11_math_cbse_02_011

## THIS_FORMULA
\((f+g)(x) = f(x) + g(x),\quad (f-g)(x) = f(x) - g(x),\quad (\alpha f)(x) = \alpha f(x),\quad (fg)(x) = f(x)g(x),\quad \left(\frac{f}{g}\right)(x) = \frac{f(x)}{g(x)},\; g(x)\neq 0\)

## FORMULA_VARIABLES
\(f, g\): real-valued functions with domains subsets of \(\mathbb{R}\); \(x\): element in the common domain; \(\alpha\): real scalar (constant); \(\text{dom}(f), \text{dom}(g)\): domains of \(f\) and \(g\).

## FORMULA_UNITS
dimensionless (functions map real numbers to real numbers; units depend on application context)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch2_3 | In physics, net force is vector sum of individual forces; if forces are functions of position/time, adding them uses function addition. Example: \(F_{net}(x) = F_1(x) + F_2(x)\).
c11_economics_ch1_2 | In economics, total cost = fixed cost + variable cost; profit = revenue - cost; revenue = price × quantity. These are algebraic combinations of cost/revenue functions.

## PREREQ_CONCEPT
Understanding of real-valued functions, their domains, and pointwise evaluation of functions.

## PREREQ_BEFORE
Student must be able to find the domain of basic functions (polynomial, rational, square root, modulus, greatest integer) and evaluate functions at given inputs.

## PREREQ_STUCK
If stuck, revisit finding domains of rational functions (denominator ≠ 0) and square root functions (radicand ≥ 0) from nodes c11_math_cbse_02_008 and c11_math_cbse_02_009.

## WORKED_EXAMPLE_1
PROBLEM: A company manufactures pens. The cost function for producing \(x\) pens is \(C(x) = 0.5x^2 + 10x + 500\) (in rupees). The revenue function from selling \(x\) pens is \(R(x) = 30x - 0.2x^2\). Find the profit function \(P(x) = R(x) - C(x)\) and its domain. Then find the profit when 100 pens are produced and sold.

STEPS:
- Step 1: Identify the given functions and their domains. \(C(x) = 0.5x^2 + 10x + 500\) is a polynomial, domain = \(\mathbb{R}\). \(R(x) = 30x - 0.2x^2\) is a polynomial, domain = \(\mathbb{R}\).
- Step 2: The profit function is \(P(x) = R(x) - C(x)\). Since both domains are \(\mathbb{R}\), the domain of \(P\) is \(\mathbb{R} \cap \mathbb{R} = \mathbb{R}\). (In context, \(x \ge 0\) but mathematically domain is \(\mathbb{R}\).)
- Step 3: Subtract the functions pointwise: \(P(x) = (30x - 0.2x^2) - (0.5x^2 + 10x + 500)\).
- Step 4: Simplify algebraically: \(P(x) = 30x - 0.2x^2 - 0.5x^2 - 10x - 500 = -0.7x^2 + 20x - 500\).
- Step 5: Evaluate at \(x = 100\): \(P(100) = -0.7(10000) + 20(100) - 500 = -7000 + 2000 - 500 = -5500\).
- Step 6: Interpret: A loss of ₹5500 occurs at 100 pens. (The negative profit indicates loss.)

REASONING: Profit is revenue minus cost. Both are polynomial functions defined for all real numbers, so their difference is defined for all real numbers. The algebraic subtraction combines like terms. Evaluation at a specific production level gives the numerical profit/loss.

ANSWER: \(P(x) = -0.7x^2 + 20x - 500\), domain \(\mathbb{R}\) (contextually \(x \ge 0\)); \(P(100) = -5500\) (loss of ₹5500).

## WORKED_EXAMPLE_2
PROBLEM: Let \(f(x) = \frac{1}{x-2}\) and \(g(x) = \sqrt{x+3}\). Find the domain of \(\frac{f}{g}\) and simplify the expression \(\left(\frac{f}{g}\right)(x)\).

STEPS:
- Step 1: Find domain of \(f\): denominator \(x-2 \neq 0 \Rightarrow x \neq 2\). So \(\text{dom}(f) = \mathbb{R} \setminus \{2\}\).
- Step 2: Find domain of \(g\): radicand \(x+3 \ge 0 \Rightarrow x \ge -3\). So \(\text{dom}(g) = [-3, \infty)\).
- Step 3: Domain of \(\frac{f}{g}\) is \(\text{dom}(f) \cap \text{dom}(g)\) excluding points where \(g(x)=0\). \(g(x)=0 \Rightarrow \sqrt{x+3}=0 \Rightarrow x=-3\). So exclude \(x=-3\) and \(x=2\).
- Step 4: Intersection: \([-3, \infty) \cap (\mathbb{R} \setminus \{2\}) = [-3, 2) \cup (2, \infty)\). Then remove \(x=-3\) (where \(g=0\)): domain = \((-3, 2) \cup (2, \infty)\).
- Step 5: Write the quotient function: \(\left(\frac{f}{g}\right)(x) = \frac{1/(x-2)}{\sqrt{x+3}} = \frac{1}{(x-2)\sqrt{x+3}}\).
- Step 6: Verify domain matches expression: denominator \((x-2)\sqrt{x+3}\) is zero when \(x=2\) or \(x=-3\), and undefined for \(x<-3\) (square root of negative). So domain is indeed \((-3, 2) \cup (2, \infty)\).

REASONING: The domain of a quotient requires three conditions: \(f\) defined, \(g\) defined, and \(g(x) \neq 0\). We find each condition separately and take the intersection. The algebraic simplification must preserve the domain restrictions.

ANSWER: Domain = \((-3, 2) \cup (2, \infty)\); \(\left(\frac{f}{g}\right)(x) = \frac{1}{(x-2)\sqrt{x+3}}\).

## WORKED_EXAMPLE_3
PROBLEM: Let \(f(x) = 2x + 1\) and \(g(x) = x^2 - 4\). Define \(h(x) = (f \cdot g)(x) + 3f(x) - 2g(x)\). Find \(h(x)\) in simplified form and evaluate \(h(-1)\).

STEPS:
- Step 1: Write down \(f(x)\) and \(g(x)\). \(f(x)=2x+1\), \(g(x)=x^2-4\). Both are polynomials, domain = \(\mathbb{R}\).
- Step 2: Compute product \((f \cdot g)(x) = (2x+1)(x^2-4) = 2x^3 - 8x + x^2 - 4 = 2x^3 + x^2 - 8x - 4\).
- Step 3: Compute \(3f(x) = 3(2x+1) = 6x + 3\).
- Step 4: Compute \(-2g(x) = -2(x^2-4) = -2x^2 + 8\).
- Step 5: Add all three parts: \(h(x) = (2x^3 + x^2 - 8x - 4) + (6x + 3) + (-2x^2 + 8)\).
- Step 6: Combine like terms: \(2x^3 + (x^2 - 2x^2) + (-8x + 6x) + (-4 + 3 + 8) = 2x^3 - x^2 - 2x + 7\).
- Step 7: Evaluate \(h(-1) = 2(-1)^3 - (-1)^2 - 2(-1) + 7 = -2 - 1 + 2 + 7 = 6\).

REASONING: This problem combines multiple operations: multiplication of functions, scalar multiplication, and addition/subtraction. Since all functions are polynomials, the domain remains \(\mathbb{R}\) throughout. We compute each operation separately and then combine, carefully tracking like terms.

ANSWER: \(h(x) = 2x^3 - x^2 - 2x + 7\); \(h(-1) = 6\).

## COMPETENCY_QUESTION_1
QUESTION: The temperature in a city (in °C) on day \(x\) of the year is modeled by \(T_1(x) = 20 + 5\sin\left(\frac{\pi x}{182.5}\right)\). A heatwave adds an extra temperature \(T_2(x) = 3e^{-(x-200)^2/500}\) (in °C). The "feels like" temperature is \(T(x) = T_1(x) + T_2(x)\). (a) Explain why the domain of \(T\) is the intersection of domains of \(T_1\) and \(T_2\). (b) If the domain of \(T_1\) is all real numbers and domain of \(T_2\) is all real numbers, what is the domain of \(T\)? (c) Without calculating exact values, explain whether \(T(x)\) can ever be less than \(T_1(x)\).

COMPETENCY: Translating real-world situations to mathematical expressions and reasoning about domain and function behavior.

STEPS:
- Step 1: Understand that \(T = T_1 + T_2\) is defined only where both \(T_1\) and \(T_2\) are defined.
- Step 2: The domain of a sum is the intersection of domains by definition of function addition.
- Step 3: Since both domains are \(\mathbb{R}\), intersection is \(\mathbb{R}\).
- Step 4: Analyze \(T_2(x) = 3e^{-(x-200)^2/500}\). Exponential is always positive, so \(T_2(x) > 0\) for all \(x\).
- Step 5: Therefore \(T(x) = T_1(x) + T_2(x) > T_1(x)\) for all \(x\). So \(T(x)\) is never less than \(T_1(x)\).

ANSWER: (a) The sum of two functions is defined pointwise: \((T_1+T_2)(x) = T_1(x)+T_2(x)\). This requires both \(T_1(x)\) and \(T_2(x)\) to exist, i.e., \(x\) must belong to both domains. (b) Domain of \(T\) is \(\mathbb{R}\). (c) No, \(T(x)\) cannot be less than \(T_1(x)\) because \(T_2(x) = 3e^{-(x-200)^2/500} > 0\) for all real \(x\), so \(T(x) = T_1(x) + T_2(x) > T_1(x)\).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Let \(f(x) = \frac{x^2 - 1}{x - 1}\) and \(g(x) = x + 1\). A student claims that \(f(x) = g(x)\) for all \(x\), so \((f \cdot g)(x) = (x+1)^2\) with domain \(\mathbb{R}\). Identify the error in the student's reasoning. Find the correct domain of \(f\), the correct expression for \((f \cdot g)(x)\), and its domain.

COMPETENCY: Error identification and correction; understanding domain restrictions in algebraic simplification.

STEPS:
- Step 1: Analyze \(f(x) = \frac{x^2-1}{x-1}\). The denominator is zero at \(x=1\), so \(x=1\) is excluded from domain. Domain of \(f\) is \(\mathbb{R} \setminus \{1\}\).
- Step 2: Note that \(f(x)\) simplifies to \(x+1\) **only for \(x \neq 1\)**. The functions \(f\) and \(g\) are not equal because their domains differ.
- Step 3: The product \((f \cdot g)(x) = f(x) \cdot g(x) = \frac{x^2-1}{x-1} \cdot (x+1)\).
- Step 4: Simplify: \(\frac{(x-1)(x+1)}{x-1} \cdot (x+1) = (x+1)^2\), but this simplification is valid only where \(f\) is defined, i.e., \(x \neq 1\).
- Step 5: Domain of \((f \cdot g)\) is \(\text{dom}(f) \cap \text{dom}(g) = (\mathbb{R} \setminus \{1\}) \cap \mathbb{R} = \mathbb{R} \setminus \{1\}\).
- Step 6: The student incorrectly assumed \(f=g\) everywhere, ignoring the removable discontinuity at \(x=1\).

ANSWER: Error: \(f(x)\) is undefined at \(x=1\), so \(f \neq g\) as functions. Correct domain of \(f\): \(\mathbb{R} \setminus \{1\}\). \((f \cdot g)(x) = (x+1)^2\) for \(x \neq 1\). Domain of \((f \cdot g)\): \(\mathbb{R} \setminus \{1\}\).

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: This is exactly the algebra of functions — combining functions using ______ operations.

## DIAGNOSTIC_ANSWER_7
arithmetic

**A wrong answer ("algebraic" or "mathematical") reveals the student has paraphrased the walkthrough's adjective - functions combine using arithmetic operations, applied pointwise at every x of the common domain.** Arithmetic is the walkthrough's own word for the add, subtract, multiply and divide being lifted from numbers to functions. Quote it in fill-ups, keeping the adjective exact.

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
The student can compute the sum, difference, product, and quotient of two given real functions, correctly determine the domain of each resulting function, and evaluate the combined function at specific points.

**A wrong answer (only combining the rules) reveals the student has under-answered the mastery criterion.** Full mastery is threefold: compute the sum, difference, product and quotient of given functions, determine each result's domain - intersection of domains, minus zeros of the denominator - and evaluate the combined function at specific points.
