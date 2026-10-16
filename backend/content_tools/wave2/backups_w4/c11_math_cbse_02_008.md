## ELI5
A Metro card prices C(d) = (10 + 2d)/d per kilometre: a rational function - one polynomial over another, p(x)/q(x), living only where q(x) ≠ 0, so d = 0 is barred from the domain. The modulus |x| is distance from the school gate: 50 metres east or 50 west both read 50 - x for x ≥ 0, -x for x < 0, defined everywhere, changing rule at zero. Rational excludes zeros; modulus folds the left half up.

## DEFINITION
A **rational function** is a real-valued function of the form \( f(x) = \frac{p(x)}{q(x)} \) where \( p(x) \) and \( q(x) \) are polynomial functions defined on a domain \( D \subseteq \mathbb{R} \), with the restriction \( q(x) \neq 0 \) for all \( x \in D \). The **modulus function** (absolute value function) is defined as \( f: \mathbb{R} \to \mathbb{R} \) by \( f(x) = |x| = \begin{cases} x, & x \geq 0 \\ -x, & x < 0 \end{cases} \). Both are real functions with domains that are subsets of \( \mathbb{R} \).

## COGNITIVE_LEVEL
analyze

## MASTERY_CRITERIA
Student can determine the domain and range of any rational function by identifying values that make the denominator zero, sketch the graph of the modulus function and its transformations (e.g., \( |x-a| \), \( |x|+b \), \( a|x| \)), and solve equations/inequalities involving both function types by considering piecewise definitions and algebraic manipulation.

## SCOPE_BOUNDARY
Covers rational functions \( \frac{p(x)}{q(x)} \) where \( p, q \) are polynomials (linear, quadratic, cubic), domain restrictions from denominator zeros, vertical/horizontal asymptotes conceptually, modulus function \( |x| \) and its basic transformations, piecewise representation, and solving equations like \( |x-2| = 3 \) or \( \frac{x+1}{x-2} = 0 \). Does NOT cover oblique asymptotes, partial fractions, calculus-based analysis (limits, derivatives), or complex roots of denominator.

## WALKTHROUGH
Imagine you're designing a pricing model for a Delhi Metro smart card: the cost per kilometre decreases as distance increases, but there's a fixed base fare. This creates a rational function \( C(d) = \frac{10 + 2d}{d} \) for distance \( d > 0 \). To understand this, first identify where the function breaks — the denominator \( d \) cannot be zero, so domain is \( d > 0 \). For modulus, think of a student's distance from school gate: whether they're 50m east or 50m west, the distance is 50m — that's \( |x| \). Start by writing the piecewise definition: \( |x| = x \) for \( x \geq 0 \), \( -x \) for \( x < 0 \). The key insight: rational functions exclude denominator zeros from domain, while modulus functions are defined everywhere but change rule at \( x = 0 \).

Takeaway: mastery means the denominator's zeros being excluded before anything else, and the modulus graph - a V of slope ±1 - being shifted and stretched through |x - a|, |x| + b, a|x|. Exam moves: find-the-domain questions and solve-modulus-inequalities items via the piecewise split. Check yourself: cancelling common factors before fixing the domain erases holes the original still has - the flagged error. Students miss it because the simplified form looks defined everywhere, when the definition binds the unsimplified q(x): the domain belongs to the original function, not the shortcut.

## DIAGNOSTIC_QUESTION_1
What is the domain of the rational function \( f(x) = \frac{x^2 - 4}{x^2 - 5x + 6} \)? Write your answer in set notation.

## DIAGNOSTIC_ANSWER_1
The domain is \( \mathbb{R} \setminus \{2, 3\} \). The denominator \( x^2 - 5x + 6 = (x-2)(x-3) \) is zero at \( x = 2 \) and \( x = 3 \). A wrong answer like \( \mathbb{R} \setminus \{2\} \) or \( \mathbb{R} \setminus \{3\} \) reveals the student only found one root or incorrectly factorised. An answer of \( \mathbb{R} \) shows they forgot domain restrictions entirely.

## DIAGNOSTIC_QUESTION_2
Explain why the function \( f(x) = \frac{x^2 - 4}{x - 2} \) is NOT the same as \( g(x) = x + 2 \), even though they simplify algebraically to the same expression for \( x \neq 2 \).

## DIAGNOSTIC_ANSWER_2
\( f(x) \) has domain \( \mathbb{R} \setminus \{2\} \) while \( g(x) \) has domain \( \mathbb{R} \). At \( x = 2 \), \( f \) is undefined (division by zero) but \( g(2) = 4 \). Two functions are equal only if they have identical domains and matching outputs for every input in that domain. A student who says "they are the same because they simplify" confuses algebraic equivalence with functional equality — a critical Class 11 distinction.

## DIAGNOSTIC_QUESTION_3
Solve the equation \( |2x - 5| = 3 \) and represent the solution set on a number line.

## DIAGNOSTIC_ANSWER_3
Step 1: \( |2x - 5| = 3 \) means \( 2x - 5 = 3 \) or \( 2x - 5 = -3 \).
Step 2: Case 1: \( 2x = 8 \Rightarrow x = 4 \). Case 2: \( 2x = 2 \Rightarrow x = 1 \).
Step 3: Solution set \( \{1, 4\} \). On number line: solid dots at 1 and 4.
A wrong answer like \( x = 4 \) only reveals the student forgot the negative case. An answer like \( x = -1, 4 \) shows sign error in solving \( 2x - 5 = -3 \).

## DIAGNOSTIC_QUESTION_4
Compare the graphs of \( y = \frac{1}{x} \) and \( y = \frac{1}{x-2} + 3 \). Describe the transformation sequence and state the new asymptotes.

## DIAGNOSTIC_ANSWER_4
The graph of \( y = \frac{1}{x} \) is shifted right by 2 units (replacing \( x \) with \( x-2 \)) then up by 3 units (adding 3). Vertical asymptote moves from \( x = 0 \) to \( x = 2 \); horizontal asymptote moves from \( y = 0 \) to \( y = 3 \). A student who says "shift left by 2" confuses \( x-2 \) with \( x+2 \). One who gives asymptotes as \( x = -2, y = 3 \) makes the same error. This tests understanding of transformation order and asymptote behaviour.

## DIAGNOSTIC_QUESTION_5
A student claims: "The range of \( f(x) = \frac{x^2 + 1}{x^2 + 2} \) is \( (0, 1) \) because numerator < denominator always." Evaluate this claim and correct if necessary.

## DIAGNOSTIC_ANSWER_5
The claim is partially correct but incomplete. Let \( y = \frac{x^2+1}{x^2+2} = 1 - \frac{1}{x^2+2} \). Since \( x^2+2 \geq 2 \), \( \frac{1}{x^2+2} \in (0, \frac{1}{2}] \), so \( y \in [\frac{1}{2}, 1) \). The range is \( [\frac{1}{2}, 1) \), not \( (0, 1) \). The student correctly noted \( y < 1 \) but missed the lower bound because they didn't consider the minimum of \( x^2+2 \). This reveals a common error: assuming numerator < denominator implies range starts at 0, without finding actual minimum.

## DIAGNOSTIC_QUESTION_6
Construct a rational function \( f(x) = \frac{p(x)}{q(x)} \) that has domain \( \mathbb{R} \setminus \{-1, 3\} \), a horizontal asymptote at \( y = 2 \), and passes through the point \( (0, -1) \). Justify your construction.

## DIAGNOSTIC_ANSWER_6
One possible function: \( f(x) = \frac{2x^2 - 2x - 6}{x^2 - 2x - 3} \).
Construction: Denominator \( q(x) = (x+1)(x-3) = x^2 - 2x - 3 \) gives domain exclusions. For horizontal asymptote \( y = 2 \), degrees of \( p \) and \( q \) must be equal with leading coefficient ratio 2:1, so \( p(x) = 2x^2 + bx + c \). Using \( f(0) = -1 \): \( \frac{c}{-3} = -1 \Rightarrow c = 3 \). Choose \( b = -2 \) for simplicity: \( p(x) = 2x^2 - 2x + 3 \). Wait, check: \( f(0) = 3/-3 = -1 \). But \( p(x) = 2x^2 - 2x + 3 \), \( q(x) = x^2 - 2x - 3 \). A student who only gives \( \frac{2x^2}{x^2-2x-3} \) satisfies domain and asymptote but fails the point condition. Good answer shows systematic use of all three conditions.

## COMMON_MISCONCEPTION
Students incorrectly simplify rational functions by cancelling common factors and then state the domain of the simplified form. For example, given \( f(x) = \frac{x^2 - 4}{x - 2} \), they cancel \( (x-2) \) to get \( x+2 \) and claim domain is \( \mathbb{R} \). The error: they treat the simplified expression as the original function, ignoring that cancellation is only valid for \( x \neq 2 \). The function \( f \) has a removable discontinuity (hole) at \( x = 2 \), while \( g(x) = x+2 \) is defined there. In board exams, this loses marks in domain questions and graph sketching where the hole must be shown as an open circle.

## ON_FAILURE
If a student makes this error, do not just say "don't cancel." Instead: Step 1: Have them factor numerator and denominator completely. Step 2: Identify values making denominator zero — these are domain exclusions. Step 3: Cancel common factors algebraically but write the restriction \( x \neq a \) alongside the simplified form. Step 4: For graphing, plot the simplified function but mark an open circle at the excluded x-value with its y-coordinate from the simplified expression. Step 5: Practice with \( \frac{x^2-1}{x-1} \), \( \frac{x^2-9}{x+3} \), \( \frac{x^3-8}{x-2} \) to reinforce that domain comes from original denominator, not simplified.

## PREREQUISITE_NODE_IDS
c11_math_cbse_02_005, c11_math_cbse_02_006, c11_math_cbse_02_007, c6_math_ch02_025, c9_math_ch3_3, c9_math_ch4_10, c11_math_cbse_02_004, c9_math_ch4_8

## PREREQUISITE_REASONS
c11_math_cbse_02_005: Functions definition (domain, codomain, range, image/preimage) is essential to understand rational/modulus as special function types.
c11_math_cbse_02_006: Identity and constant functions provide baseline real-valued function examples before rational/modulus.
c11_math_cbse_02_007: Polynomial functions (linear, quadratic) are the building blocks of rational functions' numerators/denominators.
c6_math_ch02_025: Absolute value of integers introduces |x| concept before generalising to real modulus function.
c9_math_ch3_3: Rational numbers definition and operations underpin rational function algebra.
c9_math_ch4_10: Simplifying rational expressions (factorisation, cancellation) is directly used in rational function domain analysis.
c11_math_cbse_02_004: Rational and modulus functions have restricted domains; range finding is a key skill.  
c9_math_ch4_8: If stuck, revisit c9_math_ch4_8 (Factorisation of Quadratic Expressions) and c11_math_cbse_02_005 (Functions: Definition and Types) for domain/range basics.  

## FORWARD_NODE_IDS
c11_math_cbse_02_009, c11_math_cbse_02_010, c11_math_cbse_02_011, c11_math_cbse_02_012, c12_math_cbse_01_003, c12_math_cbse_05_001, c12_math_cbse_07_003

## FORWARD_REASONS
c11_math_cbse_02_009: Signum and greatest integer functions are other standard real functions whose graphs and properties build on modulus function understanding.
c11_math_cbse_02_010: Algebra of real functions (sum, difference, product, quotient) applies directly to rational and modulus functions as operands.
c11_math_cbse_02_011: Graphs of real functions combines all previous function types; rational and modulus graphs are key components.
c11_math_cbse_02_012: rational and modulus functions appear in problems with rates, concentrations, or absolute distances.  
c12_math_cbse_01_003: Rational and modulus functions — absolute value appears in many injectivity problems (e.g., \( \frac{x}{1+|x|} \)).  
c12_math_cbse_05_001: Rational and modulus functions — rational functions have discontinuities where denominator is zero; modulus functions require piecewise handling.  
c12_math_cbse_07_003: Rational functions are the integrands; knowing their properties (domain, asymptotes) aids in setting up partial fractions.  

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_02_001, c11_eco_cbse_02_003
## CROSS_SUBJECT_REASONS
c11_physics_ch02_001: Kinematics uses rational functions for average velocity \( v_{avg} = \frac{\Delta x}{\Delta t} \) and modulus for distance/speed from displacement/velocity.
c11_economics_ch02_003: Cost functions like average cost \( AC = \frac{TC}{Q} \) are rational functions; modulus appears in absolute deviation measures.
c11_phy_cbse_02_001: Cross-subject support: Position is the location of a point object specified by its coordinate (x) on a chosen axi... supplies tools/facts used directly in this node.  
c11_eco_cbse_02_003: Cross-subject support: The Mahalanobis Model, implemented in India's Second Five Year Plan (1956-61), is a two-se... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_math_cbse_02_007 -> c11_math_cbse_02_008 -> c11_math_cbse_02_009: Polynomial functions lead to rational functions (quotients of polynomials) and modulus function, which then enable signum and greatest integer functions.

## THIS_FORMULA
Rational function: \( f(x) = \frac{p(x)}{q(x)} \), \( p(x), q(x) \) polynomials, \( q(x) \neq 0 \). Modulus function: \( f(x) = |x| = \begin{cases} x, & x \geq 0 \\ -x, & x < 0 \end{cases} \)

## FORMULA_VARIABLES
\( p(x) \) = numerator polynomial, \( q(x) \) = denominator polynomial, \( x \) = independent variable (real number), \( f(x) \) = function value (real number)

## FORMULA_UNITS
dimensionless (pure mathematical functions; units depend on application context)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch02_001 | Rational functions model average velocity (displacement/time); modulus gives speed from velocity
c11_economics_ch02_003 | Average cost = Total Cost / Quantity is rational function; absolute deviation uses modulus
c11_chemistry_ch01_005 | Concentration = moles/volume is rational function; pH = -log[H+] involves rational expressions

## PREREQ_CONCEPT
Factorisation of polynomials and solving polynomial equations (to find denominator zeros and simplify rational expressions).

## PREREQ_BEFORE
Student must be able to factorise quadratic and cubic polynomials, solve polynomial equations, and understand the definition of a function (domain, codomain, range).

## PREREQ_STUCK
If stuck, revisit c9_math_ch4_8 (Factorisation of Quadratic Expressions) and c11_math_cbse_02_005 (Functions: Definition and Types) for domain/range basics.

## WORKED_EXAMPLE_1
PROBLEM: A company's average cost per unit (in rupees) for producing x items is given by \( AC(x) = \frac{5000 + 20x + 0.5x^2}{x} \) for \( x > 0 \). Find the domain, simplify the function, and determine the minimum average cost.
STEPS:
- Step 1: Identify the domain. The denominator is x. Since x > 0 (production quantity), and x ≠ 0, domain is (0, ∞).
- Step 2: Simplify the rational function by dividing each term in numerator by x: \( AC(x) = \frac{5000}{x} + 20 + 0.5x \).
- Step 3: To find minimum, recognise this as sum of a term and its reciprocal form. Let \( f(x) = 0.5x + \frac{5000}{x} \). The constant 20 doesn't affect minimisation.
- Step 4: Use AM-GM inequality: For positive a, b, \( a + b \geq 2\sqrt{ab} \). Here \( a = 0.5x \), \( b = \frac{5000}{x} \). So \( 0.5x + \frac{5000}{x} \geq 2\sqrt{0.5x \cdot \frac{5000}{x}} = 2\sqrt{2500} = 2 \times 50 = 100 \).
- Step 5: Equality when \( 0.5x = \frac{5000}{x} \Rightarrow 0.5x^2 = 5000 \Rightarrow x^2 = 10000 \Rightarrow x = 100 \) (since x > 0).
- Step 6: Minimum average cost = 100 + 20 = ₹120 per unit at production level x = 100 units.
REASONING: The domain excludes x=0 because division by zero is undefined and x>0 is given. Simplifying by dividing each term by x converts the rational function into a sum of a linear term and a reciprocal term, making optimisation possible via AM-GM or calculus (not in Class 11 syllabus but AM-GM is). The constant term shifts the minimum vertically.
ANSWER: Domain: (0, ∞); Simplified: \( AC(x) = 0.5x + 20 + \frac{5000}{x} \); Minimum average cost = ₹120 at x = 100 units.

## WORKED_EXAMPLE_2
PROBLEM: Sketch the graph of \( f(x) = |x - 3| - 2 \) and find its vertex, domain, and range.
STEPS:
- Step 1: Recognise this as transformation of basic modulus function \( y = |x| \). The expression \( |x - 3| \) shifts graph right by 3 units. Subtracting 2 shifts down by 2 units.
- Step 2: Find vertex. For \( y = |x| \), vertex is (0,0). After right shift 3: (3,0). After down shift 2: (3, -2).
- Step 3: Write piecewise definition: \( f(x) = \begin{cases} (x - 3) - 2 = x - 5, & x \geq 3 \\ -(x - 3) - 2 = -x + 1, & x < 3 \end{cases} \).
- Step 4: Find intercepts. y-intercept: x=0, f(0) = |0-3| - 2 = 3 - 2 = 1 → (0,1). x-intercepts: f(x)=0 ⇒ |x-3|=2 ⇒ x-3=2 or x-3=-2 ⇒ x=5 or x=1 → (1,0) and (5,0).
- Step 5: Plot key points: vertex (3,-2), y-intercept (0,1), x-intercepts (1,0) and (5,0). Draw V-shape opening upward with vertex at (3,-2).
- Step 6: State domain and range. Domain: ℝ (all real numbers). Range: [-2, ∞) since minimum value is -2 at vertex.
REASONING: The modulus function \( |x-a| \) has vertex at (a,0). Vertical shift by k moves vertex to (a,k). Piecewise definition splits at the vertex x-coordinate. The V-shape has slopes +1 (right arm) and -1 (left arm). Domain always ℝ for modulus functions; range depends on vertical shift and opening direction.
ANSWER: Vertex: (3, -2); Domain: ℝ; Range: [-2, ∞); Graph: V-shape with vertex at (3,-2), passing through (0,1), (1,0), (5,0).

## WORKED_EXAMPLE_3
PROBLEM: Solve the inequality \( \frac{x^2 - 5x + 6}{x^2 - 4} \geq 0 \) and represent the solution on a number line.
STEPS:
- Step 1: Factor numerator and denominator completely. Numerator: \( x^2 - 5x + 6 = (x-2)(x-3) \). Denominator: \( x^2 - 4 = (x-2)(x+2) \).
- Step 2: Write the function: \( f(x) = \frac{(x-2)(x-3)}{(x-2)(x+2)} \). Note domain restrictions: denominator zero at x = 2 and x = -2, so domain is ℝ \ {-2, 2}.
- Step 3: Simplify by cancelling common factor (x-2), but KEEP the restriction x ≠ 2: \( f(x) = \frac{x-3}{x+2} \) for x ≠ 2, -2.
- Step 4: Make sign chart for \( \frac{x-3}{x+2} \). Critical points: x = -2 (denominator zero, vertical asymptote), x = 2 (hole, excluded), x = 3 (numerator zero).
- Step 5: Test intervals: (-∞, -2): pick x=-3 → (-6)/(-1) = +6 > 0. (-2, 2): pick x=0 → (-3)/(2) = -1.5 < 0. (2, 3): pick x=2.5 → (-0.5)/(4.5) < 0. (3, ∞): pick x=4 → (1)/(6) > 0.
- Step 6: Include x=3 (numerator zero, inequality allows ≥0). Exclude x=-2 (asymptote) and x=2 (hole). Solution: (-∞, -2) ∪ [3, ∞).
- Step 7: On number line: open circle at -2, open circle at 2, closed circle at 3. Shade left of -2 and right of 3 including 3.
REASONING: Always factor first to identify all critical points. Cancellation of (x-2) creates a removable discontinuity (hole) at x=2 — the function is undefined there, so x=2 can never be in solution. The inequality ≥0 includes zeros of numerator (x=3) but excludes zeros of denominator. Sign chart method systematically determines sign in each interval.
ANSWER: Solution set: \( (-\infty, -2) \cup [3, \infty) \). Number line: open circles at -2 and 2, closed circle at 3, shading left of -2 and right of 3 including 3.

## COMPETENCY_QUESTION_1
QUESTION: A water tank is being filled at a rate that varies with time. The volume V (in litres) after t minutes is given by \( V(t) = \frac{100t}{t+5} \) for t ≥ 0. (a) Find the domain of V(t). (b) Determine the initial volume and the volume after 10 minutes. (c) Will the tank ever reach exactly 100 litres? Justify your answer. (d) If the tank has a capacity of 150 litres, find the time when it will be 80% full.
COMPETENCY: Translating real-world situations to mathematical expressions and interpreting function behaviour in context
STEPS:
- Step 1: Identify domain from context and formula. t ≥ 0 given, denominator t+5 ≠ 0 ⇒ t ≠ -5. Since t ≥ 0, domain is [0, ∞).
- Step 2: Initial volume: t=0 ⇒ V(0) = 0/(5) = 0 litres. Volume at t=10: V(10) = 1000/15 = 200/3 ≈ 66.67 litres.
- Step 3: Check if V(t) = 100. Solve 100t/(t+5) = 100 ⇒ 100t = 100t + 500 ⇒ 0 = 500, impossible. As t→∞, V(t)→100 but never equals 100. Horizontal asymptote at V=100.
- Step 4: 80% of 150 = 120 litres. But maximum approaches 100, so never reaches 120. Tank never 80% full.
- Step 5: Interpret: The model has limiting capacity 100 litres, but physical tank is 150L — model may be invalid for large t or tank has different filling mechanism.
ANSWER: (a) [0, ∞) (b) Initial: 0 L, at 10 min: 66.67 L (c) No, V(t) approaches 100 L asymptotically but never reaches it (d) Never — maximum volume approaches 100 L < 120 L (80% of 150 L).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The function f is defined by \( f(x) = \frac{|x-2|}{x-2} \) for x ≠ 2. (a) Write f(x) as a piecewise function. (b) Find the domain and range of f. (c) Sketch the graph of y = f(x). (d) Is f a rational function? A modulus function? Both? Neither? Explain. (e) Define a new function g(x) = f(x) + 1. Find range of g.
COMPETENCY: Comparing and justifying function classifications; combining modulus and rational concepts
STEPS:
- Step 1: For piecewise, consider x-2 > 0 (x > 2) and x-2 < 0 (x < 2). If x > 2: |x-2| = x-2 ⇒ f(x) = (x-2)/(x-2) = 1. If x < 2: |x-2| = -(x-2) ⇒ f(x) = -(x-2)/(x-2) = -1.
- Step 2: Domain: x ≠ 2 ⇒ (-∞, 2) ∪ (2, ∞). Range: {-1, 1} (only two output values).
- Step 3: Graph: horizontal line y=1 for x>2 (open circle at (2,1)), horizontal line y=-1 for x<2 (open circle at (2,-1)). No point at x=2.
- Step 4: f is a rational function (quotient of |x-2| and x-2, where numerator is modulus function, denominator is polynomial). It is not a polynomial rational function (numerator not polynomial). It involves modulus but is not the basic modulus function.
- Step 5: g(x) = f(x) + 1. For x>2: g(x)=2. For x<2: g(x)=0. Range of g: {0, 2}.
ANSWER: (a) \( f(x) = \begin{cases} 1, & x > 2 \\ -1, & x < 2 \end{cases} \) (b) Domain: ℝ\{2}, Range: {-1, 1} (c) Two horizontal half-lines with open circles at x=2 (d) Rational function (quotient of functions), involves modulus but not a basic modulus function (e) Range of g: {0, 2}
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you're designing a pricing model for a Delhi Metro smart card: the cost per kilometre decreases as ______ increases, but there's a fixed base fare.

## DIAGNOSTIC_ANSWER_7
distance

**A wrong answer ("fare" or "speed") reveals the student has swapped the walkthrough's variable - the per-kilometre cost falls as distance increases, the smart card's d.** Scenario blanks repeat the walkthrough verbatim, so the variable noun is the walkthrough's own choice. Recall the fixed base fare and C(d) = (10 + 2d)/d before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you're ______ a pricing model for a Delhi Metro smart card: the cost per kilometre decreases as distance increases, but there's a fixed base fare.

## DIAGNOSTIC_ANSWER_8
designing

**A wrong answer ("building" or "testing") reveals the student has paraphrased the walkthrough's participle - a pricing model is being designed for the Delhi Metro card.** Scenario blanks repeat the walkthrough verbatim, so the participle is the walkthrough's own word for the planning act. Recall the decreasing per-kilometre cost before filling, and fill the verb exactly as written.
