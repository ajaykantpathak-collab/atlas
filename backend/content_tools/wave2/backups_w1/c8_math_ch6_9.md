## ELI5
Square a difference and the twin cross terms return — this time carrying minus signs, so they merge into minus twice the product. The full shape: first square, minus double product, plus second square. Notice the last term is plus, not minus: the subtraction is itself subtracted, and two negatives breed a positive. Students who forget this write a wrong ending; expand one example slowly and the positive final square shows itself every time.

## DEFINITION
The algebraic identity \((a - b)(a - b) = a^2 - 2ab + b^2\) states that the square of the difference of two terms equals the square of the first term minus twice the product of the two terms plus the square of the second term. It holds for all real numbers \(a\) and \(b\), and is derived by applying the distributive property twice: \((a - b)(a - b) = a(a - b) - b(a - b)\).
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
The student can expand \((a - b)^2\) correctly for any algebraic expressions \(a\) and \(b\) (including integers, fractions, decimals, and variables), identify when to use this identity to simplify expressions or solve equations, and explain why the middle term is \(-2ab\) by linking it to the distributive property.
## SCOPE_BOUNDARY
This node covers the expansion and application of \((a - b)^2\) for binomials with real-number coefficients and variables. It does NOT cover factorisation of quadratics into \((a - b)^2\) (that is a separate skill), nor does it extend to cubes or higher powers like \((a - b)^3\).
## WALKTHROUGH
Imagine you are tiling a square floor of side \((x - 3)\) metres. To find the area, you need to multiply \((x - 3)\) by itself. You already know how to expand \((a + b)^2\) from the previous lesson. Now, think of subtraction as adding a negative: \((x - 3) = (x + (-3))\). Write down \((x + (-3))(x + (-3))\) and apply the distributive property step by step: first multiply \(x\) by each term in the second bracket, then multiply \(-3\) by each term. Combine like terms carefully, remembering that \((-3) \times (-3) = +9\). The pattern \(a^2 - 2ab + b^2\) emerges naturally, and you can now use it as a shortcut for any similar problem.

Takeaway: the square of a difference is square minus twice-the-product plus square — same architecture as the squared sum, with the middle term's sign flipped and the final square stubbornly positive. Exam format: expect expansions, recognising the pattern inside trinomials, and explaining the middle term's origin via double distribution. Verification beat: check the final term is positive — a negative times a negative — and the middle term is minus twice the product. Why students miss it: they let the outer minus leak into every term, ending with a negative final square; only the middle term inherits the subtraction.

## DIAGNOSTIC_QUESTION_1
Write the expansion of \((2y - 5)^2\) using the identity \((a - b)^2 = a^2 - 2ab + b^2\). Identify \(a\) and \(b\) clearly.
## DIAGNOSTIC_ANSWER_1
\(a = 2y\), \(b = 5\). Expansion: \((2y)^2 - 2(2y)(5) + 5^2 = 4y^2 - 20y + 25\). A wrong answer like \(4y^2 - 10y + 25\) reveals the student forgot to double the product \(ab\) (they computed \(ab\) instead of \(2ab\)). An answer like \(4y^2 + 20y + 25\) shows confusion with the \((a + b)^2\) identity, missing the minus sign in the middle term.
## DIAGNOSTIC_QUESTION_2
Explain why \((a - b)^2\) is NOT equal to \(a^2 - b^2\). Use the distributive property to show the missing term.
## DIAGNOSTIC_ANSWER_2
\((a - b)^2 = (a - b)(a - b) = a(a - b) - b(a - b) = a^2 - ab - ab + b^2 = a^2 - 2ab + b^2\). The term \(-2ab\) is missing in \(a^2 - b^2\). A student who says "because subtraction doesn't distribute like that" or "the middle term cancels" shows they don't see the two \(-ab\) terms from the two distributions. The correct explanation must show the two separate \(-ab\) products that combine to \(-2ab\).
## DIAGNOSTIC_QUESTION_3
Expand and simplify: \((3x - 4y)^2 - (3x + 4y)^2\).
## DIAGNOSTIC_ANSWER_3
Step 1: Expand \((3x - 4y)^2 = 9x^2 - 24xy + 16y^2\).  
Step 2: Expand \((3x + 4y)^2 = 9x^2 + 24xy + 16y^2\).  
Step 3: Subtract: \((9x^2 - 24xy + 16y^2) - (9x^2 + 24xy + 16y^2) = 9x^2 - 24xy + 16y^2 - 9x^2 - 24xy - 16y^2\).  
Step 4: Combine like terms: \(-48xy\).  
A wrong answer of \(0\) reveals the student subtracted term-by-term without distributing the minus sign to the second expansion (they did \(9x^2 - 9x^2 = 0\), \(-24xy - 24xy = -48xy\) but then \(16y^2 - 16y^2 = 0\) and forgot the middle term sign flip). An answer of \(-24xy\) shows they only subtracted one \(24xy\) instead of both.
## DIAGNOSTIC_QUESTION_4
Compare the expansions of \((a - b)^2\) and \((b - a)^2\). Are they equal? Justify your answer algebraically and explain what this means about the order of subtraction inside a square.
## DIAGNOSTIC_ANSWER_4
\((a - b)^2 = a^2 - 2ab + b^2\). \((b - a)^2 = b^2 - 2ba + a^2 = a^2 - 2ab + b^2\). They are equal because squaring removes the sign of the difference: \((a - b) = -(b - a)\), and \((-1)^2 = 1\). A student who says they are different because "order matters in subtraction" is applying a rule for linear expressions to a squared expression without checking the algebra. The correct justification shows the commutative property of addition makes the expanded forms identical.
## DIAGNOSTIC_QUESTION_5
A student expanded \((5 - 2x)^2\) as \(25 - 10x + 4x^2\). Is this correct? If not, identify the exact error and give the correct expansion.
## DIAGNOSTIC_ANSWER_5
The student's answer is incorrect. The error is in the middle term: they computed \(-2 \times 5 \times 2x = -20x\) but wrote \(-10x\) (they forgot to multiply by 2, or they used \(b = x\) instead of \(b = 2x\)). Correct expansion: \(a = 5, b = 2x\). \((5)^2 - 2(5)(2x) + (2x)^2 = 25 - 20x + 4x^2\). A student who says "it's correct because \(2 \times 5 \times x = 10x\)" reveals they misidentified \(b\) as \(x\) instead of \(2x\), ignoring the coefficient.
## DIAGNOSTIC_QUESTION_6
Create a real-life word problem (in an Indian context) that requires using \((a - b)^2\) to solve. The problem must involve a square area or a cost calculation. Provide the solution.
## DIAGNOSTIC_ANSWER_6
Example: A square garden has side \((2x - 5)\) metres. A 1-metre wide path is built inside along the edges, reducing the planting area. Find the area of the planting region in terms of \(x\).  
Solution: Planting region side = \((2x - 5) - 2 = (2x - 7)\) m. Area = \((2x - 7)^2 = 4x^2 - 28x + 49\) sq m.  
A poor answer gives a problem that uses \((a + b)^2\) or linear multiplication, showing the student cannot recognise situations where a difference is squared. A good answer clearly defines the variable, sets up the subtraction before squaring, and expands correctly.
## COMMON_MISCONCEPTION
Students often write \((a - b)^2 = a^2 - b^2\), dropping the middle term \(-2ab\) entirely. This happens because they overgeneralise the difference of squares identity \((a + b)(a - b) = a^2 - b^2\) to the square of a difference. For example, they expand \((3x - 4)^2\) as \(9x^2 - 16\) instead of \(9x^2 - 24x + 16\). The error is conceptual: they treat the square as a product of sum and difference rather than a product of two identical binomials.
## ON_FAILURE
Ask the student to write \((a - b)^2\) as \((a - b)(a - b)\) and expand using the distributive property step by step: \(a \times a\), \(a \times (-b)\), \((-b) \times a\), \((-b) \times (-b)\). Have them circle the two middle terms \(-ab\) and \(-ab\) and add them to get \(-2ab\). Then compare with \((a + b)(a - b)\) to highlight the structural difference. Repeat with numerical examples like \((5 - 2)^2\) vs \(5^2 - 2^2\) to show the numerical discrepancy (9 vs 21).
## PREREQUISITE_NODE_IDS
c8_math_ch6_1, c8_math_ch6_7, c7_math_ch04_006, c7_math_ch10_005
## PREREQUISITE_REASONS
c8_math_ch6_1: Distributive property is the foundation for expanding any product of binomials.
c8_math_ch6_7: The identity \((a + b)^2\) provides the pattern; \((a - b)^2\) is its counterpart with sign changes.
c7_math_ch04_006: Simplifying algebraic expressions by combining like terms is essential after expansion.
c7_math_ch10_005: Multiplying two negative integers (e.g., \((-b) \times (-b) = +b^2\)) is critical for the last term.
## FORWARD_NODE_IDS
c8_math_ch6_10, c8_math_ch6_11
## FORWARD_REASONS
c8_math_ch6_10: Visualising \((a - b)^2\) with area models reinforces the algebraic expansion geometrically.
c8_math_ch6_11: Applications in simplifying complex expressions require fluent use of all three identities including this one.
## CROSS_SUBJECT_PREREQS
c7_math_ch04_004, c7_math_ch15_007
## CROSS_SUBJECT_REASONS
c7_math_ch04_004: Writing algebraic expressions from word problems is needed to set up real-world scenarios that lead to \((a - b)^2\).
c7_math_ch15_007: Setting up equations from word problems often results in quadratic equations where this identity simplifies the solving process.
## CHAIN_DESCRIPTION
c8_math_ch6_1 -> c8_math_ch6_9 -> c8_math_ch6_11
## THIS_FORMULA
\((a - b)^2 = a^2 - 2ab + b^2\)
## FORMULA_VARIABLES
\(a\) = first term (can be a number, variable, or algebraic expression), \(b\) = second term (can be a number, variable, or algebraic expression)
## FORMULA_UNITS
dimensionless (algebraic identity holds for any consistent units; if \(a\) and \(b\) are in metres, result is in square metres)
## COMPUTATION_TYPE
algebraic
## CROSS_SUBJECT

## PREREQ_CONCEPT
The distributive property of multiplication over addition/subtraction applied twice (FOIL method) and the rules for multiplying integers, especially negative × negative = positive.
## PREREQ_BEFORE
The student must be able to expand \((a + b)(a + b)\) using the distributive property and correctly simplify expressions like \((-3x) \times (-2y)\).
## PREREQ_STUCK
Revisit the distributive property with negative terms (c8_math_ch6_6) and integer multiplication sign rules (c7_math_ch10_005).
## WORKED_EXAMPLE_1
PROBLEM: A square plot of land has side length \((4x - 7)\) metres. Find the area of the plot in terms of \(x\). If \(x = 5\) m, calculate the numerical area.
STEPS:
- Step 1: Identify that area of a square = side × side. Here side = \((4x - 7)\) m, so area = \((4x - 7)^2\).
- Step 2: Recognise the identity \((a - b)^2 = a^2 - 2ab + b^2\) with \(a = 4x\) and \(b = 7\).
- Step 3: Substitute into the formula: \((4x)^2 - 2(4x)(7) + 7^2\).
- Step 4: Compute each term: \((4x)^2 = 16x^2\), \(-2(4x)(7) = -56x\), \(7^2 = 49\). So area = \(16x^2 - 56x + 49\) sq m.
- Step 5: Substitute \(x = 5\): \(16(25) - 56(5) + 49 = 400 - 280 + 49 = 169\) sq m. Verify: side = \(4(5) - 7 = 13\) m, area = \(13^2 = 169\) sq m. Matches.
REASONING: The identity converts a binomial square into a trinomial, making it easy to evaluate for any \(x\). The verification step uses the original side length to ensure no algebraic error was made.
ANSWER: Area = \(16x^2 - 56x + 49\) sq m; when \(x = 5\) m, area = 169 sq m.
## WORKED_EXAMPLE_2
PROBLEM: Simplify the expression: \((2a - 3b)^2 - (2a + 3b)^2\).
STEPS:
- Step 1: Expand \((2a - 3b)^2\) using \((a - b)^2 = a^2 - 2ab + b^2\) with \(a = 2a\), \(b = 3b\): \((2a)^2 - 2(2a)(3b) + (3b)^2 = 4a^2 - 12ab + 9b^2\).
- Step 2: Expand \((2a + 3b)^2\) using \((a + b)^2 = a^2 + 2ab + b^2\) with \(a = 2a\), \(b = 3b\): \((2a)^2 + 2(2a)(3b) + (3b)^2 = 4a^2 + 12ab + 9b^2\).
- Step 3: Subtract the second expansion from the first: \((4a^2 - 12ab + 9b^2) - (4a^2 + 12ab + 9b^2)\).
- Step 4: Distribute the minus sign: \(4a^2 - 12ab + 9b^2 - 4a^2 - 12ab - 9b^2\).
- Step 5: Combine like terms: \(4a^2 - 4a^2 = 0\), \(9b^2 - 9b^2 = 0\), \(-12ab - 12ab = -24ab\).
REASONING: The squares of the first and last terms cancel out because they are identical in both expansions. Only the middle terms, which have opposite signs in the two identities, survive and add up (with sign considered) to \(-24ab\).
ANSWER: \(-24ab\)
## WORKED_EXAMPLE_3
PROBLEM: The side of a square cardboard sheet is \((3y - 2)\) cm. A small square of side \((y - 1)\) cm is cut from each corner. The remaining flaps are folded up to form an open box. Express the volume of the box in terms of \(y\).
STEPS:
- Step 1: After cutting squares from corners, the new length and breadth of the base become \((3y - 2) - 2(y - 1)\).
- Step 2: Simplify the base side: \(3y - 2 - 2y + 2 = y\) cm. The height of the box is the side of the cut square: \((y - 1)\) cm.
- Step 3: Volume of open box = base area × height = \((y)^2 \times (y - 1) = y^2(y - 1)\).
- Step 4: But wait, the problem asks for volume in terms of \(y\). Expand: \(y^3 - y^2\).
- Step 5: Check constraints: side lengths must be positive. \(3y - 2 > 0 \Rightarrow y > 2/3\). \(y - 1 > 0 \Rightarrow y > 1\). So \(y > 1\).
- Step 6: If \(y = 4\) cm, original side = 10 cm, cut square = 3 cm, base = 4 cm, height = 3 cm, volume = \(4^2 \times 3 = 48\) cm³. Formula gives \(4^3 - 4^2 = 64 - 16 = 48\) cm³. Correct.
REASONING: This problem combines the \((a - b)^2\) concept (in the initial side expression) with geometric reasoning. The expansion of \((3y - 2)^2\) is not directly needed for volume, but understanding the algebraic manipulation of the side length is crucial. The step where we simplify \((3y - 2) - 2(y - 1)\) uses distributive property with negative integers.
ANSWER: Volume = \(y^3 - y^2\) cm³, for \(y > 1\).
## COMPETENCY_QUESTION_1
QUESTION: A student claims that \((x - 3)^2 = x^2 - 9\) because "you just square each term". Write a step-by-step explanation to convince the student why this is incorrect, using the distributive property and a numerical counterexample.
COMPETENCY: Error identification and correction
STEPS:
- Step 1: State the student's claim and the correct identity.
- Step 2: Expand \((x - 3)^2\) as \((x - 3)(x - 3)\) using distributive property.
- Step 3: Show the four products: \(x \cdot x\), \(x \cdot (-3)\), \((-3) \cdot x\), \((-3) \cdot (-3)\).
- Step 4: Combine to get \(x^2 - 6x + 9\) and point out the missing \(-6x\) term.
- Step 5: Give a numerical counterexample: let \(x = 5\). LHS = \((5-3)^2 = 4\). RHS (student's) = \(25 - 9 = 16\). Not equal.
ANSWER: The student's method misses the middle term \(-2ab\). Correct expansion: \((x - 3)^2 = x^2 - 6x + 9\). Numerical check with \(x=5\): \((2)^2 = 4\) but \(5^2 - 3^2 = 16\). The error is treating \((a-b)^2\) as \(a^2 - b^2\), which is a different identity for \((a+b)(a-b)\).
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: The area of a square is given by the expression \(9x^2 - 30x + 25\) sq cm. Find the side length of the square in terms of \(x\). If the perimeter is 40 cm, find the value of \(x\) and the actual side length.
COMPETENCY: Translating real-world situations to mathematical expressions
STEPS:
- Step 1: Recognise the area expression as a perfect square trinomial of the form \(a^2 - 2ab + b^2\).
- Step 2: Identify \(a^2 = 9x^2 \Rightarrow a = 3x\). \(b^2 = 25 \Rightarrow b = 5\). Check middle term: \(-2ab = -2(3x)(5) = -30x\). Matches.
- Step 3: Therefore area = \((3x - 5)^2\). Side length = \(|3x - 5|\) cm. Since side > 0, and assuming \(3x - 5 > 0\), side = \(3x - 5\).
- Step 4: Perimeter = 4 × side = \(4(3x - 5) = 12x - 20\). Given perimeter = 40 cm.
- Step 5: Solve \(12x - 20 = 40 \Rightarrow 12x = 60 \Rightarrow x = 5\).
- Step 6: Side length = \(3(5) - 5 = 10\) cm. Verify: Area = \(10^2 = 100\). Expression: \(9(25) - 30(5) + 25 = 225 - 150 + 25 = 100\). Perimeter = \(4 \times 10 = 40\). Consistent.
ANSWER: Side length = \(3x - 5\) cm; \(x = 5\); actual side length = 10 cm.
DIFFICULTY: hard
