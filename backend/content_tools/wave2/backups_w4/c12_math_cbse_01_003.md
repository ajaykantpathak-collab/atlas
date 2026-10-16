## ELI5
Roll numbers exist so that no two students ever share one: a function that gives distinct inputs distinct outputs is one-one (injective), like a school that never recycles a roll number. The moment two different inputs land on the same output, the function is many-one. The algebra test: assume f of x-one equals f of x-two and see whether you are forced to conclude x-one equals x-two; for graphs, a horizontal line cutting the curve twice convicts it.

## DEFINITION
A function \( f: X \to Y \) is called **one-one (or injective)** if distinct elements in the domain \( X \) have distinct images in the codomain \( Y \). Formally, \( \forall x_1, x_2 \in X,\; f(x_1) = f(x_2) \implies x_1 = x_2 \). Equivalently, \( x_1 \neq x_2 \implies f(x_1) \neq f(x_2) \). If this condition fails, the function is called **many-one**.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can (1) state the precise definition of an injective function using quantifiers, (2) prove a given function is one-one by assuming \( f(x_1)=f(x_2) \) and deducing \( x_1=x_2 \), (3) disprove injectivity by exhibiting a concrete counterexample \( x_1 \neq x_2 \) with \( f(x_1)=f(x_2) \), and (4) apply the horizontal line test on graphs to decide injectivity for real-valued functions.

## SCOPE_BOUNDARY
This node covers **only** the definition, algebraic verification, graphical interpretation (horizontal line test), and standard examples/counterexamples of one-one (injective) functions. It does **not** cover onto (surjective), bijective, composition, or inverse functions — those are separate nodes (c12_math_cbse_01_004, c12_math_cbse_01_005, c12_math_cbse_01_006, c12_math_cbse_01_007). Domain/codomain restrictions that affect injectivity (e.g., \( f(x)=x^2 \) on \( \mathbb{R} \) vs \( [0,\infty) \)) are included.

## WALKTHROUGH
Imagine a school assigns each student a unique roll number. If two different students ever got the same roll number, chaos would follow — that is exactly what a **non-injective** function does: it "collapses" two distinct inputs into one output. To check if a function \( f \) is one-one, start by writing the assumption \( f(x_1) = f(x_2) \) for arbitrary \( x_1, x_2 \) in the domain. Then use algebraic manipulation to see if you are **forced** to conclude \( x_1 = x_2 \). If yes, the function is injective; if you can find even one pair \( x_1 \neq x_2 \) satisfying the equation, it is many-one. This algebraic method works for any function given by a formula, while the horizontal line test gives a quick visual check for graphs of real functions. The key insight: **injectivity depends on the domain and codomain** — changing them can turn a many-one function into a one-one function (e.g., \( x^2 \) on \( \mathbb{R} \) vs \( [0,\infty) \)).

Takeaway first: injectivity is checked by assumption and algebra - set the outputs equal and see whether equality of inputs is forced - with the horizontal line test as the graph's quick verdict. Exam moves: statement questions with quantifiers, prove questions deducing x-one equals x-two from equal images, counterexample questions disproving injectivity concretely, and test questions on graphs. Method: rerun the roll-number story, then run the algebra on one given function until the inputs are either forced equal or caught unequal. Check yourself: injectivity depends on the domain - x squared is many-one over all reals but one-one on non-negatives; changing the domain changes the verdict. Drill: prove or disprove injectivity for two functions, one by algebra, one by counterexample.

## DIAGNOSTIC_QUESTION_1
State the formal definition of a one-one (injective) function \( f: X \to Y \) using logical quantifiers.

## DIAGNOSTIC_ANSWER_1
Correct answer: \( \forall x_1, x_2 \in X,\; f(x_1) = f(x_2) \implies x_1 = x_2 \).  
A wrong answer like "different inputs give different outputs" is informally correct but lacks the precise logical structure needed for proofs. If a student writes "\( f(x_1) \neq f(x_2) \implies x_1 \neq x_2 \)", they have written the converse, which is always true for any function and does **not** define injectivity — this reveals confusion between a statement and its converse.

## DIAGNOSTIC_QUESTION_2
A student claims: "The function \( f: \mathbb{R} \to \mathbb{R} \) defined by \( f(x) = x^3 - x \) is one-one because it is a cubic polynomial and all cubic polynomials are strictly increasing." Explain why this reasoning is flawed, and determine whether \( f \) is actually one-one.

## DIAGNOSTIC_ANSWER_2
The reasoning is flawed because not all cubic polynomials are strictly increasing (e.g., \( x^3 - x \) has derivative \( 3x^2 - 1 \), which changes sign). To test injectivity, solve \( f(x_1)=f(x_2) \): \( x_1^3 - x_1 = x_2^3 - x_2 \implies (x_1-x_2)(x_1^2+x_1x_2+x_2^2-1)=0 \). This gives \( x_1=x_2 \) OR \( x_1^2+x_1x_2+x_2^2=1 \). The second equation has solutions with \( x_1 \neq x_2 \) (e.g., \( x_1=1, x_2=0 \) gives \( 1=1 \)), so \( f(1)=0=f(0) \). Hence \( f \) is **not** one-one. A student who only checks "cubic ⇒ one-one" misses the critical role of the derivative's sign and the algebraic condition.

## DIAGNOSTIC_QUESTION_3
Check whether the function \( f: \mathbb{Z} \to \mathbb{Z} \) defined by \( f(n) = 2n + 3 \) is one-one. Show all steps.

## DIAGNOSTIC_ANSWER_3
Assume \( f(n_1) = f(n_2) \) for \( n_1, n_2 \in \mathbb{Z} \).  
Then \( 2n_1 + 3 = 2n_2 + 3 \)  
⇒ \( 2n_1 = 2n_2 \) (subtract 3 from both sides)  
⇒ \( n_1 = n_2 \) (divide by 2, valid in integers).  
Since \( f(n_1)=f(n_2) \implies n_1=n_2 \), the function is **one-one**.  
A common error: forgetting that division by 2 is allowed in \( \mathbb{Z} \) only because the result is guaranteed to be an integer (here it is, since both sides are even). If a student says "divide by 2" without noting the integer closure, they are glossing over a subtle domain issue.

## DIAGNOSTIC_QUESTION_4
Consider the function \( f: \mathbb{R} \to \mathbb{R} \) defined by \( f(x) = \frac{x}{1+|x|} \). Without using calculus, prove that \( f \) is one-one by analyzing the equation \( f(x_1) = f(x_2) \). (Hint: consider cases based on the signs of \( x_1, x_2 \).)

## DIAGNOSTIC_ANSWER_4
Assume \( f(x_1)=f(x_2) \), i.e., \( \frac{x_1}{1+|x_1|} = \frac{x_2}{1+|x_2|} \).  
**Case 1:** \( x_1, x_2 \ge 0 \). Then \( \frac{x_1}{1+x_1} = \frac{x_2}{1+x_2} \implies x_1(1+x_2)=x_2(1+x_1) \implies x_1+x_1x_2 = x_2+x_1x_2 \implies x_1=x_2 \).  
**Case 2:** \( x_1, x_2 \le 0 \). Then \( |x_i|=-x_i \), so \( \frac{x_1}{1-x_1} = \frac{x_2}{1-x_2} \implies x_1(1-x_2)=x_2(1-x_1) \implies x_1=x_2 \).  
**Case 3:** \( x_1 \ge 0, x_2 \le 0 \) (or vice versa). Then LHS ≥ 0, RHS ≤ 0. Equality forces both sides = 0 ⇒ \( x_1=0, x_2=0 \), which falls into Case 1/2.  
Thus in all cases \( x_1=x_2 \), so \( f \) is one-one.  
A student who tries to cross-multiply without splitting cases will get \( x_1(1+|x_2|)=x_2(1+|x_1|) \) and may incorrectly cancel terms, missing the sign dependence of the absolute value. The case analysis is essential.

## DIAGNOSTIC_QUESTION_5
A student writes the following "proof" that \( f(x)=x^2 \) is one-one on \( \mathbb{R} \):  
"Assume \( f(x_1)=f(x_2) \). Then \( x_1^2 = x_2^2 \). Taking square roots gives \( x_1 = x_2 \). Hence \( f \) is one-one."  
Identify the exact logical error and give a correct counterexample.

## DIAGNOSTIC_ANSWER_5
The error is in "taking square roots gives \( x_1 = x_2 \)". From \( x_1^2 = x_2^2 \) we correctly get \( |x_1| = |x_2| \), i.e., \( x_1 = x_2 \) **or** \( x_1 = -x_2 \). The student ignored the second possibility. A concrete counterexample: \( x_1 = 2, x_2 = -2 \) gives \( f(2)=4=f(-2) \) but \( 2 \neq -2 \). Hence \( f \) is **not** one-one on \( \mathbb{R} \). This reveals the classic mistake of treating \( \sqrt{x^2} = x \) instead of \( \sqrt{x^2} = |x| \).

## DIAGNOSTIC_QUESTION_6
Construct a function \( f: \mathbb{N} \to \mathbb{N} \) that is one-one but **not** onto, and prove both properties. Then modify the domain/codomain to make the same formula bijective.

## DIAGNOSTIC_ANSWER_6
Example: \( f(n) = 2n \) (or \( f(n)=n+1 \)).  
**One-one:** \( 2n_1 = 2n_2 \implies n_1=n_2 \).  
**Not onto:** No \( n \in \mathbb{N} \) gives \( f(n)=1 \) (or any odd number).  
To make it bijective, change codomain to the range: \( f: \mathbb{N} \to \{2,4,6,\dots\} \) (or \( f: \mathbb{N} \to \mathbb{N}\setminus\{1\} \) for \( n+1 \)). Then it becomes onto by definition, and remains one-one.  
A poor answer might give a formula without proving both properties, or suggest changing the domain to \( \mathbb{Z} \) (which would break injectivity for \( n+1 \) because \( f(0)=f(-1)? \) Wait, \( n+1 \) on \( \mathbb{Z} \) is still injective but not onto unless codomain is \( \mathbb{Z} \)). The key is to recognize that **restricting the codomain to the range** always turns an injective function into a bijection.

## COMMON_MISCONCEPTION
**Misconception:** "A function is one-one if its graph is strictly increasing or strictly decreasing."  
**Why it's wrong:** This is true **only for continuous functions on an interval**. Discontinuous functions can be one-one without being monotonic (e.g., \( f(x) = \frac{1}{x} \) on \( \mathbb{R}\setminus\{0\} \) is one-one but not monotonic on its whole domain). Also, students often think "horizontal line test fails ⇒ not one-one" without checking if the horizontal line actually hits the graph at two points **in the domain**. For instance, \( f(x)=x^2 \) on \( [0,\infty) \) passes the horizontal line test even though the full parabola fails it. The misconception leads to errors in JEE questions where domain restrictions are crucial.

## ON_FAILURE
If a student confuses monotonicity with injectivity:  
1. Show the counterexample \( f(x)=\frac{1}{x} \) on \( \mathbb{R}\setminus\{0\} \): it is injective (if \( 1/x_1 = 1/x_2 \) then \( x_1=x_2 \)) but not monotonic across the whole domain (it decreases on \( (-\infty,0) \) and \( (0,\infty) \) separately, but jumps from \( -\infty \) to \( +\infty \)).  
2. Revisit the **definition**: injectivity is purely about \( f(x_1)=f(x_2) \implies x_1=x_2 \). No calculus or monotonicity is required.  
3. Practice 3-4 algebraic proofs using the definition on functions with restricted domains (e.g., \( f(x)=x^2 \) on \( [0,\infty) \), \( f(x)=|x| \) on \( [0,\infty) \), \( f(x)=x^3-x \) on \( [1,\infty) \)).  
4. Re-diagnostic: Ask "Is \( f(x)=\frac{1}{x} \) one-one on \( \mathbb{R}\setminus\{0\} \)? Prove it using only the definition."

## PREREQUISITE_NODE_IDS
c11_math_cbse_02_005, c11_math_cbse_02_006, c11_math_cbse_02_007, c11_math_cbse_02_008, c11_math_cbse_02_009, c11_math_cbse_02_010, c11_math_cbse_02_011, c12_math_cbse_01_001, c12_math_cbse_01_002
## PREREQUISITE_REASONS
c11_math_cbse_02_005: Defines function, domain, codomain, range — essential to state \( f: X \to Y \) correctly.
c11_math_cbse_02_006: Identity and constant functions — basic examples to test injectivity.
c11_math_cbse_02_007: Polynomial functions (linear, quadratic) — standard functions used in injectivity examples.
c11_math_cbse_02_008: Rational and modulus functions — absolute value appears in many injectivity problems (e.g., \( \frac{x}{1+|x|} \)).
c11_math_cbse_02_009: Signum and greatest integer functions — classic non-injective examples.
c11_math_cbse_02_010: Algebra of functions — needed later for composition of injective functions (forward node).
c11_math_cbse_02_011: Graphs of real functions — prerequisite for horizontal line test.
c12_math_cbse_01_001: Reflexive, symmetric, transitive relations — foundation for understanding equivalence relations induced by functions (Example 21 in NCERT).
c12_math_cbse_01_002: Equivalence relations — directly used in Example 21 (relation \( f(a)=f(b) \) is equivalence iff \( f \) is well-defined).

## FORWARD_NODE_IDS
c12_math_cbse_01_004, c12_math_cbse_01_005, c12_math_cbse_01_006, c12_math_cbse_01_007
## FORWARD_REASONS
c12_math_cbse_01_004: Onto (surjective) functions are the dual concept; together with one-one they define bijective.
c12_math_cbse_01_005: Bijective functions require both one-one and onto — this node provides the one-one part.
c12_math_cbse_01_006: Composition of functions preserves injectivity (if \( f,g \) injective then \( g\circ f \) injective) — needs one-one definition.
c12_math_cbse_01_007: Inverse of a function exists iff the function is bijective — injectivity is half the condition.

## CROSS_SUBJECT_PREREQS
c12_phy_cbse_02_001, c12_eco_cbse_02_001
## CROSS_SUBJECT_REASONS
c12_physics_cbse_02_001: In kinematics, position as a function of time \( x(t) \) must be one-one for the motion to be reversible (no two times give same position) — injectivity ensures a unique inverse \( t(x) \).
c12_economics_cbse_02_001: Demand function \( q = f(p) \) is typically strictly decreasing (hence one-one) so that each price corresponds to a unique quantity demanded, enabling inverse demand function \( p = f^{-1}(q) \) used in consumer surplus calculations.
c12_phy_cbse_02_001: Cross-subject support: Electrostatic potential at a point in an electric field is the work done by an external ag... supplies tools/facts used directly in this node.  
c12_eco_cbse_02_001: Cross-subject support: Total Utility (TU) is the aggregate psychological satisfaction a consumer derives from con... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_math_cbse_02_005 -> c12_math_cbse_01_003 -> c12_math_cbse_01_004

## THIS_FORMULA
\( \forall x_1, x_2 \in X,\; f(x_1) = f(x_2) \implies x_1 = x_2 \) (Definition of injective function)

## FORMULA_VARIABLES
\( f \) = function from set \( X \) (domain) to set \( Y \) (codomain); \( x_1, x_2 \) = arbitrary elements of domain \( X \)

## FORMULA_UNITS
dimensionless (purely set-theoretic/logical condition)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_02_001 | Injectivity of position-time function ensures unique time for each position, needed for inverse kinematics
 c12_eco_cbse_02_001 | Strictly monotonic demand/supply functions are injective, allowing well-defined inverse functions for surplus analysis
## PREREQ_CONCEPT
Understanding of function notation \( f: X \to Y \), domain, codomain, and the logical structure of implications (\( P \implies Q \)).

## PREREQ_BEFORE
Student must be able to evaluate functions at given inputs, understand quantifiers "for all" and "there exists", and manipulate algebraic equations (including absolute values and piecewise definitions).

## PREREQ_STUCK
Revisit c11_math_cbse_02_005 (function definition) and c11_math_cbse_02_011 (graph reading) — practice identifying domain/codomain and applying horizontal line test on basic graphs.

## WORKED_EXAMPLE_1
PROBLEM: A school assigns each student a unique ID of the form \( f(\text{roll}) = 3 \times \text{roll} + 7 \), where roll numbers are positive integers \( 1,2,\dots,50 \). Prove that no two students get the same ID (i.e., \( f \) is one-one). If the school expands to 100 students, does the function remain one-one? What if roll numbers could be negative?

STEPS:
- Step 1: Identify the function: \( f: \mathbb{N} \to \mathbb{Z} \) (or \( \mathbb{N} \to \mathbb{N} \)) given by \( f(x) = 3x + 7 \), with domain initially \( \{1,2,\dots,50\} \).
- Step 2: To prove one-one, assume \( f(x_1) = f(x_2) \) for \( x_1, x_2 \) in the domain.
- Step 3: Write the equation: \( 3x_1 + 7 = 3x_2 + 7 \).
- Step 4: Subtract 7 from both sides: \( 3x_1 = 3x_2 \).
- Step 5: Divide by 3 (valid since 3 ≠ 0 and we are in integers/reals): \( x_1 = x_2 \).
- Step 6: Conclusion: The assumption \( f(x_1)=f(x_2) \) forces \( x_1=x_2 \), so \( f \) is one-one on **any** subset of \( \mathbb{Z} \) (or \( \mathbb{R} \)).
- Step 7: For 100 students, domain becomes \( \{1,\dots,100\} \) — the same algebraic proof holds, so still one-one.
- Step 8: If roll numbers could be negative (domain \( \mathbb{Z} \)), the proof is identical because division by 3 is valid in \( \mathbb{Z} \) (the equation \( 3x_1=3x_2 \) implies \( x_1=x_2 \) in integers). Hence \( f \) remains one-one.

REASONING: The function \( f(x)=3x+7 \) is a linear polynomial with non-zero slope. The algebraic proof uses only the cancellation property of multiplication by a non-zero constant, which holds in \( \mathbb{Z}, \mathbb{Q}, \mathbb{R} \). Domain expansion does not affect injectivity as long as the algebraic structure remains the same. This illustrates that injectivity is a property of the **formula and the domain**, not the size of the domain.

ANSWER: \( f \) is one-one for all three domain choices (\( \{1..50\}, \{1..100\}, \mathbb{Z} \)).

## WORKED_EXAMPLE_2
PROBLEM: Determine whether the function \( f: \mathbb{R} \to \mathbb{R} \) defined by \( f(x) = \frac{2x+1}{x-3} \) is one-one. If not, find a restricted domain on which it becomes one-one.

STEPS:
- Step 1: Assume \( f(x_1) = f(x_2) \) for \( x_1, x_2 \in \mathbb{R} \setminus \{3\} \) (domain excludes 3 because denominator zero).
- Step 2: Write equation: \( \frac{2x_1+1}{x_1-3} = \frac{2x_2+1}{x_2-3} \).
- Step 3: Cross-multiply (valid since denominators non-zero): \( (2x_1+1)(x_2-3) = (2x_2+1)(x_1-3) \).
- Step 4: Expand both sides: \( 2x_1x_2 - 6x_1 + x_2 - 3 = 2x_1x_2 - 6x_2 + x_1 - 3 \).
- Step 5: Cancel \( 2x_1x_2 \) and \( -3 \): \( -6x_1 + x_2 = -6x_2 + x_1 \).
- Step 6: Bring like terms together: \( -6x_1 - x_1 = -6x_2 - x_2 \) ⇒ \( -7x_1 = -7x_2 \) ⇒ \( x_1 = x_2 \).
- Step 7: The algebra forces \( x_1 = x_2 \) with no extra conditions. Hence \( f \) is one-one on its maximal domain \( \mathbb{R} \setminus \{3\} \).
- Step 8: Since it is already one-one on the whole domain, no restriction is needed. (Note: The function is also onto \( \mathbb{R} \setminus \{2\} \), but that is for the next node.)

REASONING: Rational functions of the form \( \frac{ax+b}{cx+d} \) with \( ad-bc \neq 0 \) are always one-one on their domain (they are Möbius transformations). The cross-multiplication leads to a linear equation in \( x_1, x_2 \) because the \( x_1x_2 \) terms cancel. The condition \( ad-bc \neq 0 \) ensures the coefficient of \( x_1 \) and \( x_2 \) after cancellation is non-zero (here \( -7 \neq 0 \)).

ANSWER: \( f \) is one-one on \( \mathbb{R} \setminus \{3\} \). No further restriction needed.

## WORKED_EXAMPLE_3
PROBLEM: Let \( f: \mathbb{R} \to \mathbb{R} \) be defined by \( f(x) = x^3 - 3x \). (a) Prove that \( f \) is **not** one-one on \( \mathbb{R} \). (b) Find the largest interval containing 0 on which \( f \) is one-one. (c) Explain why the horizontal line test gives the same conclusion.

STEPS:
- Step 1 (a): To disprove injectivity, find distinct \( x_1, x_2 \) with \( f(x_1)=f(x_2) \). Try simple values: \( f(0)=0 \), \( f(\sqrt{3}) = 3\sqrt{3} - 3\sqrt{3} = 0 \), \( f(-\sqrt{3}) = -3\sqrt{3} + 3\sqrt{3} = 0 \). So \( f(0)=f(\sqrt{3})=f(-\sqrt{3})=0 \) with three distinct inputs. Hence not one-one.
- Step 2 (b): Use calculus (allowed for analysis) to find monotonic intervals. \( f'(x) = 3x^2 - 3 = 3(x^2-1) \). Critical points at \( x = \pm 1 \).
- Step 3: Sign of \( f' \): \( f'(x) > 0 \) for \( |x| > 1 \) (increasing), \( f'(x) < 0 \) for \( |x| < 1 \) (decreasing). So \( f \) is strictly decreasing on \( [-1, 1] \) and strictly increasing on \( (-\infty, -1] \) and \( [1, \infty) \).
- Step 4: A continuous function is one-one on an interval iff it is strictly monotonic there. The largest interval containing 0 on which \( f \) is strictly monotonic is \( [-1, 1] \) (where it is strictly decreasing).
- Step 5 (c): Horizontal line test: Draw horizontal line \( y = 0 \). It intersects the graph at \( x = -\sqrt{3}, 0, \sqrt{3} \) — three points, so fails on \( \mathbb{R} \). On \( [-1, 1] \), any horizontal line intersects at most once because the function is strictly decreasing.
- Step 6: Verify endpoints: \( f(-1)=2 \), \( f(1)=-2 \). The range on \( [-1,1] \) is \( [-2, 2] \). No horizontal line \( y=c \) with \( c \in [-2,2] \) hits the graph more than once.

REASONING: For continuous functions on intervals, injectivity ⇔ strict monotonicity. The cubic \( x^3-3x \) has a local max at \( x=-1 \) and local min at \( x=1 \), so it "turns around" and fails the horizontal line test globally. The largest interval containing 0 where it doesn't turn is between the critical points.

ANSWER: (a) Not one-one (e.g., \( f(0)=f(\sqrt{3})=0 \)). (b) \( [-1, 1] \). (c) Horizontal line \( y=0 \) cuts graph at three points on \( \mathbb{R} \), but at most once on \( [-1,1] \).

## COMPETENCY_QUESTION_1
QUESTION: A function \( f: A \to B \) is defined by \( f(x) = \frac{x^2 - 1}{x^2 + 1} \), where \( A = \mathbb{R} \) and \( B = [-1, 1) \). (i) Is \( f \) one-one? Prove your answer. (ii) If \( f \) is not one-one, restrict the domain \( A \) to a maximal subset \( A' \subseteq \mathbb{R} \) containing 0 such that \( f|_{A'} \) is one-one. (iii) For your chosen \( A' \), is \( f|_{A'} \) onto \( B \)? Justify.

COMPETENCY: Translating real-world situations to mathematical expressions / Analyzing domain-restricted injectivity

STEPS:
- Step 1: Check injectivity on \( \mathbb{R} \): compute \( f(x_1)=f(x_2) \) and see if it forces \( x_1=x_2 \).
- Step 2: Note that \( f(-x) = f(x) \) (even function), so \( f(1)=f(-1)=0 \) with \( 1 \neq -1 \) ⇒ not one-one on \( \mathbb{R} \).
- Step 3: To get a maximal subset containing 0 where \( f \) is one-one, use monotonicity. Compute derivative or analyze \( f(x) = 1 - \frac{2}{x^2+1} \). Since \( x^2+1 \) decreases on \( (-\infty,0] \) and increases on \( [0,\infty) \), \( f \) increases on \( (-\infty,0] \) and decreases on \( [0,\infty) \).
- Step 4: Maximal interval containing 0 with strict monotonicity is \( (-\infty, 0] \) or \( [0, \infty) \). Choose \( A' = [0, \infty) \).
- Step 5: Check if \( f|_{[0,\infty)} \) is onto \( [-1,1) \). Range of \( f \) on \( [0,\infty) \) is \( f(0)=-1 \) to limit \( \lim_{x\to\infty} f(x)=1 \) (not attained). So range = \( [-1,1) = B \). Hence it is onto.

ANSWER: (i) No, \( f \) is not one-one on \( \mathbb{R} \) (e.g., \( f(1)=f(-1)=0 \)). (ii) \( A' = [0, \infty) \) (or \( (-\infty, 0] \)). (iii) Yes, \( f|_{[0,\infty)} \) is onto \( [-1,1) \).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Let \( f: \mathbb{N} \to \mathbb{N} \) be defined by \( f(n) = \begin{cases} \frac{n}{2}, & \text{if } n \text{ is even} \\ \frac{n+1}{2}, & \text{if } n \text{ is odd} \end{cases} \). (a) Prove that \( f \) is **not** one-one. (b) Modify the codomain to \( B \subseteq \mathbb{N} \) such that \( f: \mathbb{N} \to B \) becomes bijective. (c) A student claims: "Since \( f \) is not one-one, it cannot have an inverse." Is this statement correct? Explain with reference to the restricted function in (b).

COMPETENCY: Error identification and correction / Constructing bijections by domain/codomain restriction

STEPS:
- Step 1 (a): Find two distinct natural numbers with same image. \( f(1) = \frac{1+1}{2} = 1 \), \( f(2) = \frac{2}{2} = 1 \). So \( f(1)=f(2)=1 \) but \( 1 \neq 2 \). Hence not one-one.
- Step 2 (b): The function maps every pair \( (2k-1, 2k) \) to \( k \). So the range is \( \mathbb{N} \) itself (every \( k \in \mathbb{N} \) is image of \( 2k-1 \) and \( 2k \)). To make it bijective, we need to restrict domain so that each \( k \) has exactly one pre-image. Choose domain \( A' = \{1, 3, 5, \dots\} \) (odd numbers) or \( \{2, 4, 6, \dots\} \) (even numbers). Then \( f: A' \to \mathbb{N} \) is bijective.
- Step 3 (c): The student's statement is **incorrect** as a blanket rule. A non-injective function does not have an inverse **on its original domain**, but by restricting the domain (as in (b)) we obtain a bijective function which **does** have an inverse. The inverse of \( f|_{\text{odds}} \) is \( f^{-1}(k) = 2k-1 \). This is a standard technique in defining inverse trigonometric functions (e.g., restricting \( \sin x \) to \( [-\pi/2, \pi/2] \)).

ANSWER: (a) Not one-one because \( f(1)=f(2)=1 \). (b) Restrict domain to odd numbers (or even numbers); then \( f \) becomes bijective onto \( \mathbb{N} \). (c) The statement is false — a non-injective function can have an inverse after suitable domain restriction.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: If this ______ fails, the function is called many-one.

## DIAGNOSTIC_ANSWER_7
condition

The condition is the contract: injectivity is precisely this clause, and its failure is the definition of many-one. **A wrong answer (a graph or value) reveals the student has named a symptom while the definition asks for the clause itself.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine a school ______ each student a unique roll number.

## DIAGNOSTIC_ANSWER_8
assigns

Assigns is the function's verb: the school maps students to numbers, and injectivity is the promise that the mapping never repeats. **A wrong answer (a receiving verb) reveals the student has watched the numbers while the definition watches the assignment rule.**

## DIAGNOSTIC_QUESTION_9
Fill in the blank: ______ a school assigns each student a unique roll number.

## DIAGNOSTIC_ANSWER_9
Imagine

The imperative starts the thought experiment: picture the roll numbers first, then ask what breaks when two collide. **A wrong answer (a statement) reveals the student has answered the question's quoted opening with something other than its own first word.**
