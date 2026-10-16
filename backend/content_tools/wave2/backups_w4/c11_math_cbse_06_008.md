## ELI5
A candle business models profit as P(x) = -2x² + 40x - 150 and asks when it clears ₹50: -2x² + 40x - 150 ≥ 50 - a quadratic inequality, ax² + bx + c compared against zero. Method: gather everything to one side, find the roots as if solving the equation, then read signs between them - a quadratic changes sign only at its real roots, so the number line splits into alternating intervals.

## DEFINITION
A quadratic inequality in one variable is an inequality of the form \(ax^2 + bx + c > 0\), \(ax^2 + bx + c < 0\), \(ax^2 + bx + c \geq 0\), or \(ax^2 + bx + c \leq 0\), where \(a, b, c \in \mathbb{R}\), \(a \neq 0\), and \(x\) is the variable. The solution set consists of all real values of \(x\) that satisfy the inequality, determined by the sign of the quadratic expression relative to its roots.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can solve any quadratic inequality in one variable with real coefficients using both the algebraic (sign chart/wavy curve) method and the graphical method, correctly express the solution in interval notation and on a number line, and handle strict vs. non-strict inequalities including cases where the discriminant is negative.

## SCOPE_BOUNDARY
Covers quadratic inequalities in one variable of the form \(ax^2+bx+c \gtreqqless 0\) with real coefficients. Includes cases with distinct real roots, equal real roots, and no real roots (discriminant \(\Delta < 0\)). Does NOT cover quadratic inequalities in two variables, systems of quadratic inequalities, or inequalities involving absolute values of quadratics.

## WALKTHROUGH
Imagine a small business sells handmade candles. The profit (in ₹) from selling \(x\) candles is given by \(P(x) = -2x^2 + 40x - 150\). The owner wants to know how many candles to sell to make a profit of at least ₹50. This translates to \(-2x^2 + 40x - 150 \geq 50\), a quadratic inequality. We already know how to solve linear inequalities and quadratic equations. Here we combine both: first bring all terms to one side to get a standard quadratic expression, then find its roots (like solving a quadratic equation), and finally use a sign chart or graph to determine where the expression is positive or negative. The key insight is that a quadratic expression changes sign only at its real roots, so the number line is divided into intervals whose signs alternate (if \(a>0\)) or follow a predictable pattern.

Takeaway: mastery means the standard form being reached first, roots found, and a sign chart - or the parabola's opening - deciding the satisfying intervals. Exam moves: solve-the-quadratic-inequality questions and handle-the-negative-discriminant items where the expression never changes sign. Check yourself: moving terms across the inequality uses the same rules as linear - flip on negative multiplication. Students miss it because they solve the equation and stop, when the definition's question is a region: roots are the doors, the intervals between them are the answer.

## DIAGNOSTIC_QUESTION_1
State the general form of a quadratic inequality in one variable and write the condition on the leading coefficient for the parabola to open upward.

## DIAGNOSTIC_ANSWER_1
The general form is \(ax^2 + bx + c > 0\) (or \(<, \geq, \leq\)) with \(a, b, c \in \mathbb{R}, a \neq 0\). The parabola opens upward when \(a > 0\). A wrong answer (e.g., saying \(a < 0\) for upward opening) reveals confusion between the sign of \(a\) and the direction of the parabola, which is critical for determining the sign of the quadratic expression outside the roots.

## DIAGNOSTIC_QUESTION_2
Explain why the inequality \(x^2 - 4x + 5 > 0\) is true for all real \(x\) without solving it algebraically. Use the discriminant and the sign of the leading coefficient.

## DIAGNOSTIC_ANSWER_2
The discriminant \(\Delta = (-4)^2 - 4(1)(5) = 16 - 20 = -4 < 0\), so the quadratic has no real roots and the parabola does not intersect the x-axis. Since the leading coefficient \(a = 1 > 0\), the parabola opens upward and lies entirely above the x-axis. Hence \(x^2 - 4x + 5 > 0\) for all \(x \in \mathbb{R}\). A wrong answer indicates the student does not connect the discriminant to the graph's position relative to the x-axis or misinterprets the role of \(a\).

## DIAGNOSTIC_QUESTION_3
Solve the inequality \(2x^2 - 5x - 3 \leq 0\) using the algebraic (wavy curve) method. Show the sign chart and write the solution in interval notation.

## DIAGNOSTIC_ANSWER_3
Step 1: Factor the quadratic: \(2x^2 - 5x - 3 = (2x+1)(x-3)\). Roots: \(x = -\frac{1}{2}, 3\).
Step 2: Mark roots on number line. Since \(a=2>0\), the expression is positive outside the roots and negative between them.
Step 3: For \(\leq 0\), we include the interval where expression is negative or zero: \([-\frac{1}{2}, 3]\).
A wrong answer (e.g., \((-\infty, -\frac{1}{2}] \cup [3, \infty)\)) reveals the student reversed the sign pattern, likely forgetting that \(a>0\) means positive outside the roots.

## DIAGNOSTIC_QUESTION_4
Compare the solution sets of \(x^2 - 4x + 3 > 0\) and \(x^2 - 4x + 3 \geq 0\). How does the inequality symbol change the solution? Illustrate on a number line.

## DIAGNOSTIC_ANSWER_4
The quadratic factors as \((x-1)(x-3)\) with roots 1 and 3. For \(> 0\): \((-\infty, 1) \cup (3, \infty)\) (open circles at 1,3). For \(\geq 0\): \((-\infty, 1] \cup [3, \infty)\) (closed circles at 1,3). The only difference is the inclusion of the roots. A wrong answer that gives the same intervals for both shows the student does not distinguish between strict and non-strict inequalities when the expression equals zero at the roots.

## DIAGNOSTIC_QUESTION_5
A student solves \(-x^2 + 2x + 3 \geq 0\) by multiplying both sides by \(-1\) to get \(x^2 - 2x - 3 \leq 0\), then factors as \((x-3)(x+1) \leq 0\) and writes the solution as \([-1, 3]\). Is this correct? Justify.

## DIAGNOSTIC_ANSWER_5
Yes, it is correct. Multiplying an inequality by \(-1\) reverses the inequality sign, so \(\geq\) becomes \(\leq\). The roots of \(x^2-2x-3\) are \(-1\) and \(3\). Since \(a=1>0\), the expression is \(\leq 0\) between the roots, giving \([-1, 3]\). Alternatively, the original quadratic has \(a=-1<0\) (opens downward) and is \(\geq 0\) between its roots, which are the same. A wrong answer (e.g., saying the sign should not flip) reveals a fundamental error in inequality manipulation.

## DIAGNOSTIC_QUESTION_6
Create a quadratic inequality whose solution set is exactly \((-2, 5)\). Explain how you constructed it.

## DIAGNOSTIC_ANSWER_6
The solution \((-2, 5)\) means the quadratic is positive strictly between the roots \(-2\) and \(5\) (assuming \(a>0\)). So the roots are \(-2\) and \(5\). A simple quadratic with these roots is \((x+2)(x-5) = x^2 - 3x - 10\). Since we want \(> 0\) between the roots, we need the parabola to open downward, so multiply by \(-1\): \(-x^2 + 3x + 10 > 0\). Check: roots are \(-2, 5\); \(a=-1<0\) so expression is positive between roots. A poor answer (e.g., giving \(x^2 - 3x - 10 > 0\)) shows the student does not adjust the leading coefficient sign to match the required solution interval.

## COMMON_MISCONCEPTION
Students often forget to reverse the inequality sign when multiplying or dividing by a negative number during the process of making the leading coefficient positive. For example, given \(-2x^2 + 5x - 2 \geq 0\), they might multiply by \(-1\) and write \(2x^2 - 5x + 2 \geq 0\) (keeping \(\geq\)) instead of \(2x^2 - 5x + 2 \leq 0\). This leads to the exact opposite solution set. Another specific error: when using the wavy curve method, they start the sign from the rightmost interval as positive regardless of the sign of \(a\), instead of starting with the sign of \(a\) for the rightmost interval.

## ON_FAILURE
If a student makes the sign-reversal error, have them first solve the inequality without multiplying by \(-1\): find the roots of the original quadratic, note the sign of \(a\) (negative), and determine that a downward-opening parabola is \(\geq 0\) between its roots. Then compare with the result after correctly multiplying by \(-1\). Emphasize the rule: "Multiply/Divide by negative → flip the inequality sign." Practice with 3-4 examples where the leading coefficient is negative, forcing the step explicitly.

## PREREQUISITE_NODE_IDS
c11_math_cbse_06_001, c11_math_cbse_06_002, c11_math_cbse_06_003, c10_math_cbse_04_001, c10_math_cbse_04_003, c10_math_cbse_04_005, c10_math_cbse_04_007, c11_math_cbse_06_005, c11_math_cbse_06_006, c11_math_cbse_06_007

## PREREQUISITE_REASONS
c11_math_cbse_06_001: Defines inequalities and notation (\(>, <, \geq, \leq\)) used throughout.
c11_math_cbse_06_002: Provides rules for manipulating inequalities (addition, multiplication by positive/negative) which are essential for rearranging quadratic inequalities.
c11_math_cbse_06_003: Covers algebraic solution of linear inequalities; the step of isolating the variable expression is analogous.
c10_math_cbse_04_001: Identifies quadratic equations in standard form, a prerequisite for recognizing quadratic inequalities.
c10_math_cbse_04_003: Factorisation method for finding roots of the quadratic expression.
c10_math_cbse_04_005: Quadratic formula for finding roots when factorisation is not easy.
c10_math_cbse_04_007: Discriminant analysis to determine nature of roots (real/distinct, equal, none) which dictates the sign pattern.
c11_math_cbse_06_005: Quadratic inequalities extend the same intersection principle to non-linear expressions, requiring the system-solving framework mastered here.  
c11_math_cbse_06_006: Quadratic inequalities extend the graphical method to non-linear boundaries (parabolas), building on the half-plane concept.  
c11_math_cbse_06_007: Quadratic inequalities build on the modeling and solving skills developed here; word problems may lead to quadratic inequalities.  

## FORWARD_NODE_IDS
c12_math_cbse_06_002

## FORWARD_REASONS
This is the last node in Chapter 6 (Linear Inequalities). Quadratic inequalities are an extension topic; further applications appear in later chapters (e.g., domain of functions in Chapter 2 of Class 12, optimization in calculus).
c12_math_cbse_06_002: Solving quadratic inequalities for sign charts.  

## CROSS_SUBJECT_PREREQS
c10_math_cbse_04_011, c10_math_cbse_04_012, c9_math_ch1_4
## CROSS_SUBJECT_REASONS
c10_math_cbse_04_011: Word problems on quadratic equations (e.g., projectile motion, area) naturally lead to quadratic inequalities when constraints like "height > 20m" or "area ≤ 50 sq m" are imposed.
c10_math_cbse_04_012: Speed-time-distance problems with quadratic relations often require inequality solutions (e.g., "time taken is less than 3 hours").
c9_math_ch1_4: Distance formula and coordinate geometry use quadratic expressions; inequalities define regions (e.g., interior of a circle \(x^2+y^2 < r^2\)).

## CHAIN_DESCRIPTION
c10_math_cbse_04_007 -> c11_math_cbse_06_008 -> none

## THIS_FORMULA
For \(ax^2 + bx + c \gtreqqless 0\) with \(a \neq 0\):
- If \(\Delta = b^2 - 4ac > 0\): roots \(\alpha, \beta = \frac{-b \pm \sqrt{\Delta}}{2a}\) (assume \(\alpha < \beta\)).
  - \(a > 0\): expression \(> 0\) for \(x \in (-\infty, \alpha) \cup (\beta, \infty)\); \(< 0\) for \(x \in (\alpha, \beta)\).
  - \(a < 0\): expression \(> 0\) for \(x \in (\alpha, \beta)\); \(< 0\) for \(x \in (-\infty, \alpha) \cup (\beta, \infty)\).
- If \(\Delta = 0\): root \(\alpha = -b/(2a)\).
  - \(a > 0\): expression \(\geq 0\) for all \(x\); \(> 0\) for \(x \neq \alpha\).
  - \(a < 0\): expression \(\leq 0\) for all \(x\); \(< 0\) for \(x \neq \alpha\).
- If \(\Delta < 0\): no real roots.
  - \(a > 0\): expression \(> 0\) for all \(x \in \mathbb{R}\).
  - \(a < 0\): expression \(< 0\) for all \(x \in \mathbb{R}\).

## FORMULA_VARIABLES
\(a, b, c\) = real coefficients of the quadratic (\(a \neq 0\)); \(x\) = variable; \(\Delta = b^2 - 4ac\) = discriminant; \(\alpha, \beta\) = real roots (if \(\Delta \geq 0\)).

## FORMULA_UNITS
dimensionless (pure algebraic inequality)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c10_math_cbse_04_011 | Quadratic inequality arises when a quadratic equation word problem has a constraint like "profit at least ₹500" or "height greater than 20m".
c10_math_cbse_04_012 | In speed-time-distance problems, quadratic inequalities model conditions like "time taken is less than a given value".
c9_math_ch1_4 | The inequality \(x^2 + y^2 < r^2\) defines the interior of a circle, a quadratic inequality in two variables (extension).

## PREREQ_CONCEPT
Solving quadratic equations (finding roots via factorisation or quadratic formula) and understanding the sign of a quadratic expression based on its leading coefficient and discriminant.

## PREREQ_BEFORE
The student must be able to solve \(ax^2+bx+c=0\) for real roots and determine the sign of \(a\) and \(\Delta\) quickly.

## PREREQ_STUCK
If stuck, revisit Class 10 Quadratic Equations: factorisation (splitting middle term), quadratic formula, and discriminant analysis (c10_math_cbse_04_003, c10_math_cbse_04_005, c10_math_cbse_04_007).

## WORKED_EXAMPLE_1
PROBLEM: A rectangular garden has length \( (x+4) \) metres and width \( (x-2) \) metres. The area must be at least 24 square metres. Find the possible values of \(x\) (length and width must be positive).

STEPS:
- Step 1: Write the inequality for area: \((x+4)(x-2) \geq 24\).
- Step 2: Expand and bring all terms to one side: \(x^2 + 2x - 8 - 24 \geq 0 \Rightarrow x^2 + 2x - 32 \geq 0\).
- Step 3: Find roots using quadratic formula: \(x = \frac{-2 \pm \sqrt{4 + 128}}{2} = \frac{-2 \pm \sqrt{132}}{2} = -1 \pm \sqrt{33}\). Approx: \(-1 - 5.744 = -6.744\) and \(-1 + 5.744 = 4.744\).
- Step 4: Since \(a=1>0\), the quadratic is \(\geq 0\) outside the roots: \(x \leq -1-\sqrt{33}\) or \(x \geq -1+\sqrt{33}\).
- Step 5: Apply physical constraints: width \(x-2 > 0 \Rightarrow x > 2\) and length \(x+4 > 0 \Rightarrow x > -4\). Intersection with solution: \(x \geq -1+\sqrt{33}\) (since \(-1+\sqrt{33} \approx 4.744 > 2\)).
REASONING: The problem combines a real-world constraint (area) with physical feasibility (positive dimensions). We form the quadratic inequality, solve it algebraically using the discriminant and sign of \(a\), then intersect with the domain restrictions from the context.
ANSWER: \(x \geq -1 + \sqrt{33}\) (i.e., \(x \geq 4.744...\) metres)

## WORKED_EXAMPLE_2
PROBLEM: Solve the inequality \(\frac{x^2 - 5x + 6}{x^2 + x - 6} < 0\) using the wavy curve method.

STEPS:
- Step 1: Factor numerator and denominator: Numerator: \(x^2-5x+6 = (x-2)(x-3)\). Denominator: \(x^2+x-6 = (x+3)(x-2)\).
- Step 2: Identify critical points (roots of numerator and denominator): \(x = -3, 2, 3\). Note \(x=2\) makes denominator zero → excluded from domain.
- Step 3: Simplify the expression: \(\frac{(x-2)(x-3)}{(x+3)(x-2)} = \frac{x-3}{x+3}\) for \(x \neq 2\). The factor \((x-2)\) cancels but \(x=2\) remains a hole (excluded).
- Step 4: Draw number line with critical points \(-3, 2, 3\). Determine sign of simplified expression \(\frac{x-3}{x+3}\) in each interval using test points or wavy curve (start with sign of leading coefficients: both 1, so positive for \(x>3\)).
- Step 5: Sign chart: \((-\infty, -3)\): \(+\); \((-3, 2)\): \(-\); \((2, 3)\): \(-\); \((3, \infty)\): \(+\).
- Step 6: We need expression \(< 0\) (negative). Solution: \((-3, 2) \cup (2, 3)\). Exclude \(x=2\) and \(x=-3\).
REASONING: Rational inequalities require factoring both numerator and denominator, finding all critical points (including values that make denominator zero), and testing intervals. Cancellation of common factors does not remove the domain restriction.
ANSWER: \(x \in (-3, 2) \cup (2, 3)\)

## WORKED_EXAMPLE_3
PROBLEM: Find the values of \(k\) for which the quadratic inequality \(kx^2 - 2kx + (k-3) < 0\) holds for all real \(x\).

STEPS:
- Step 1: For the inequality to hold for ALL real \(x\), the quadratic must be negative for every \(x\). This requires: (i) parabola opens downward \(\Rightarrow k < 0\), and (ii) no real roots \(\Rightarrow \Delta < 0\).
- Step 2: Compute discriminant: \(\Delta = (-2k)^2 - 4(k)(k-3) = 4k^2 - 4k^2 + 12k = 12k\).
- Step 3: Condition \(\Delta < 0 \Rightarrow 12k < 0 \Rightarrow k < 0\).
- Step 4: Both conditions give \(k < 0\). Check boundary: if \(k=0\), inequality becomes \(-3 < 0\) which is true for all \(x\), but the expression is no longer quadratic (it's linear). The problem says "quadratic inequality", so \(k \neq 0\).
- Step 5: Therefore, \(k < 0\).
REASONING: This is a "parameter" problem where we find conditions on a coefficient so that the inequality holds universally. It combines the discriminant condition for no real roots with the sign of the leading coefficient to ensure the parabola lies entirely below the x-axis.
ANSWER: \(k < 0\)

## COMPETENCY_QUESTION_1
QUESTION: A company's profit (in ₹ thousands) from producing \(x\) hundred units of a product is modeled by \(P(x) = -3x^2 + 36x - 80\). The company wants to maintain a profit of at least ₹20,000. Determine the range of production levels (in hundreds of units) that satisfy this. Also, explain why the production level cannot be negative and how that affects the final answer.

COMPETENCY: Translating real-world situations to mathematical expressions and interpreting solutions in context.

STEPS:
- Step 1: Convert profit condition to inequality: \(-3x^2 + 36x - 80 \geq 20\) (since profit is in thousands, 20 means ₹20,000).
- Step 2: Rearrange: \(-3x^2 + 36x - 100 \geq 0\). Multiply by \(-1\) (flip sign): \(3x^2 - 36x + 100 \leq 0\).
- Step 3: Find roots: \(\Delta = 1296 - 1200 = 96\). Roots: \(x = \frac{36 \pm \sqrt{96}}{6} = \frac{36 \pm 4\sqrt{6}}{6} = 6 \pm \frac{2\sqrt{6}}{3}\). Approx: \(6 \pm 1.633 \Rightarrow 4.367, 7.633\).
- Step 4: Since \(a=3>0\), inequality \(\leq 0\) holds between roots: \(x \in [6 - \frac{2\sqrt{6}}{3}, 6 + \frac{2\sqrt{6}}{3}]\).
- Step 5: Production level \(x \geq 0\) (cannot be negative). The lower root is positive (~4.37), so the interval is valid. Also, profit must be non-negative in reality, but the inequality already ensures \(\geq 20\).
- Step 6: Interpret: Produce between approx 437 and 763 units (since \(x\) is in hundreds).
ANSWER: Production level \(x\) (in hundreds) must satisfy \(6 - \frac{2\sqrt{6}}{3} \leq x \leq 6 + \frac{2\sqrt{6}}{3}\), i.e., approximately 4.37 to 7.63 hundred units.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Consider the inequality \((x-a)(x-b) > 0\) where \(a < b\). A student claims that the solution is always \(x < a\) or \(x > b\). Another student says it depends on the sign of the leading coefficient. Who is correct? Justify your answer by analyzing the expanded form and the sign of the quadratic coefficient. Then, construct a quadratic inequality of the form \(px^2 + qx + r > 0\) with \(p < 0\) whose solution is exactly \((a, b)\).

COMPETENCY: Comparing and justifying methods; understanding the role of the leading coefficient in determining the solution set of a quadratic inequality.

STEPS:
- Step 1: Expand \((x-a)(x-b) = x^2 - (a+b)x + ab\). The leading coefficient is \(1 > 0\).
- Step 2: For a quadratic with \(a>0\), the expression is positive outside the roots. So the first student is correct FOR THIS SPECIFIC FORM because the leading coefficient is implicitly positive (1).
- Step 3: The second student is correct in general: if the quadratic were multiplied by \(-1\), the inequality sign would flip and the solution would be between the roots. The sign of the leading coefficient determines whether the parabola opens up or down, which dictates where the expression is positive.
- Step 4: To construct \(px^2+qx+r > 0\) with \(p<0\) and solution \((a,b)\): we need the quadratic to be positive BETWEEN the roots, so parabola must open downward (\(p<0\)). Roots are \(a\) and \(b\). So the quadratic is \(p(x-a)(x-b)\) with \(p<0\). Example: \(-(x-a)(x-b) > 0\) i.e., \(-x^2 + (a+b)x - ab > 0\). Here \(p=-1, q=a+b, r=-ab\).
ANSWER: The first student is correct for \((x-a)(x-b)>0\) because the leading coefficient is 1 (>0). In general, the solution depends on the sign of the leading coefficient. For \(p<0\), the inequality \(-(x-a)(x-b) > 0\) has solution \((a,b)\).
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The owner wants to know how many ______ to sell to make a profit of at least ₹50.

## DIAGNOSTIC_ANSWER_7
candles

**A wrong answer ("products" or "units") reveals the student has swapped the walkthrough's item - the candle business counts candles sold against the profit target of at least ₹50.** Candles is the walkthrough's own item noun inside P(x) = -2x² + 40x - 150, and the noun is what the blank grades. Recall the inequality translation before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: The owner wants to know how many candles to sell to make a profit of at least ₹______.

## DIAGNOSTIC_ANSWER_8
50

**A wrong answer (any other figure) reveals the student has drifted from the walkthrough - the profit target is at least ₹50, the threshold on the right side of the inequality.** The figure is the walkthrough's own threshold, and the number is what the blank holds. Recall the -2x² + 40x - 150 ≥ 50 translation before filling, and give the figure exactly.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can solve any quadratic inequality in one variable with real coefficients using both the algebraic (sign chart/wavy curve) method and the graphical method, correctly express the solution in interval notation and on a number line, and handle strict vs. non-strict inequalities including cases where the discriminant is negative.
