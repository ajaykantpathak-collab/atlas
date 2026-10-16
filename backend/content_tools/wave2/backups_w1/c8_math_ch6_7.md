## ELI5
Square a sum by brute force and a pattern surfaces: the two cross terms are identical twins, so they merge into twice the product. That is the entire secret of the squared-sum identity — square, double-product, square. Geometry agrees: one big field split into four plots, where the two rectangular plots match and stack into the middle term. Learn it as a shape, not a sentence, and every binomial square becomes a one-line write-down.

## DEFINITION
The algebraic identity \((a + b)^2 = a^2 + 2ab + b^2\) states that the square of the sum of two terms equals the square of the first term, plus twice the product of the two terms, plus the square of the second term. This holds for all real numbers \(a\) and \(b\), including integers, fractions, decimals, and algebraic expressions.
## COGNITIVE_LEVEL
understand
## MASTERY_CRITERIA
The student can derive the identity using the distributive property, apply it to expand binomial squares with numeric and algebraic terms, and recognise when a given trinomial is a perfect square of the form \(a^2 + 2ab + b^2\).
## SCOPE_BOUNDARY
Covers the expansion and factorisation of \((a + b)^2\) for binomials with positive and negative terms, including coefficients and variables. Does NOT cover \((a - b)^2\) or \((a + b)(a - b)\) (separate nodes), nor does it extend to cubes or higher powers.
## WALKTHROUGH
Imagine a square garden plot with side length \((x + 3)\) metres. To find its area, we could multiply \((x + 3)(x + 3)\). Start by drawing a square split into four rectangles: an \(x \times x\) square, two \(x \times 3\) rectangles, and a \(3 \times 3\) square. This visual connects to the distributive property: \((x + 3)(x + 3) = x(x + 3) + 3(x + 3)\). Expand each part: \(x^2 + 3x + 3x + 9 = x^2 + 6x + 9\). Notice the middle term is twice the product of \(x\) and \(3\). Generalise: replace \(x\) with \(a\) and \(3\) with \(b\) to get \((a + b)^2 = a^2 + 2ab + b^2\). The key insight is that the two cross terms are identical, so they combine to \(2ab\).

Takeaway: the square of a sum is square plus twice-the-product plus square — derived by double distribution, where the two cross terms coincide and combine. Exam format: expect derivations, expansions of binomial squares with numeric and algebraic terms, and recognition of perfect-square trinomials by their middle term. Verification beat: the middle term must be exactly twice the product of the two parts — a middle term off by a factor or a sign means the wrong identity was grabbed. Why students miss it: they forget the doubling, writing square-plus-square only — expand one concrete case and the missing cross term announces itself.

## DIAGNOSTIC_QUESTION_1
Write the expansion of \((p + 5)^2\) using the algebraic identity.
## DIAGNOSTIC_ANSWER_1
\(p^2 + 10p + 25\). A wrong answer like \(p^2 + 25\) reveals the student forgot the middle term \(2ab\). An answer like \(p^2 + 5p + 25\) shows they used \(ab\) instead of \(2ab\), indicating they don't realise the two cross terms are identical and must be added.
## DIAGNOSTIC_QUESTION_2
Explain why \((2x + 3y)^2\) is not equal to \(4x^2 + 9y^2\). Use the distributive property in your explanation.
## DIAGNOSTIC_ANSWER_2
\((2x + 3y)^2 = (2x + 3y)(2x + 3y) = 2x(2x + 3y) + 3y(2x + 3y) = 4x^2 + 6xy + 6xy + 9y^2 = 4x^2 + 12xy + 9y^2\). The missing \(12xy\) term comes from the two cross products \(2x \cdot 3y\) and \(3y \cdot 2x\), which are equal and add to \(2(2x)(3y)\). A student who says "you just square each term" is treating the square as distributive over addition, which is false; they confuse \((a+b)^2\) with \(a^2+b^2\).
## DIAGNOSTIC_QUESTION_3
Expand \((3m - 4n)^2\) using the identity. Show all steps.
## DIAGNOSTIC_ANSWER_3
\((3m - 4n)^2 = (3m)^2 + 2(3m)(-4n) + (-4n)^2 = 9m^2 - 24mn + 16n^2\). Steps: identify \(a = 3m\), \(b = -4n\); square \(a\): \(9m^2\); compute \(2ab\): \(2(3m)(-4n) = -24mn\); square \(b\): \(16n^2\); combine. A wrong sign in the middle term (e.g., \(+24mn\)) reveals the student treated \(b\) as \(4n\) instead of \(-4n\), missing that the sign of \(b\) affects \(2ab\) and \(b^2\) differently.
## DIAGNOSTIC_QUESTION_4
Compare the expansions of \((x + 2)^2\) and \((x - 2)^2\). What is the same and what is different? How does this relate to the identity?
## DIAGNOSTIC_ANSWER_4
\((x + 2)^2 = x^2 + 4x + 4\); \((x - 2)^2 = x^2 - 4x + 4\). The first and last terms are identical (\(x^2\) and \(4\)) because they depend on \(a^2\) and \(b^2\) (with \(b = \pm 2\), \(b^2 = 4\)). The middle term differs in sign because \(2ab\) uses the signed value of \(b\). This shows the identity \((a+b)^2\) works for negative \(b\) if we keep the sign inside \(b\). A student who says they are completely different misses the structural similarity; one who says they are the same misses the sign change in the linear term.
## DIAGNOSTIC_QUESTION_5
A student expanded \((5y + 2)^2\) as \(25y^2 + 4\). Identify the error and write the correct expansion.
## DIAGNOSTIC_ANSWER_5
The error is omitting the middle term \(2ab = 2(5y)(2) = 20y\). Correct expansion: \(25y^2 + 20y + 4\). The student likely squared each term separately, thinking \((a+b)^2 = a^2 + b^2\). This is a classic "freshman's dream" error. If the student instead wrote \(25y^2 + 10y + 4\), they computed \(ab\) instead of \(2ab\), forgetting the two cross terms are added.
## DIAGNOSTIC_QUESTION_6
Create a real-world problem (using metres, rupees, or kilograms) that requires using \((a + b)^2\) to solve. Provide the solution.
## DIAGNOSTIC_ANSWER_6
Example: A square room has side length \((x + 2)\) metres. If the area is \(x^2 + 10x + 25\) sq m, find \(x\). Solution: \((x+2)^2 = x^2 + 4x + 4\). But given area is \(x^2 + 10x + 25 = (x+5)^2\). So \(x+2 = x+5\)? Wait, that's inconsistent. Better: A square garden's side is increased by 3 m. Original side \(s\). New area \((s+3)^2 = s^2 + 6s + 9\). If original area was 64 sq m, find new area. \(s=8\), new area = \(11^2 = 121\) sq m. Using identity: \(8^2 + 6(8) + 9 = 64 + 48 + 9 = 121\). A poor answer gives a problem that doesn't need the identity (e.g., just multiply numbers) or cannot set up the binomial square.
## COMMON_MISCONCEPTION
Students often write \((a + b)^2 = a^2 + b^2\), forgetting the middle term \(2ab\). This happens because they incorrectly apply the distributive property as "square each term" (like \((ab)^2 = a^2b^2\)). For example, expanding \((2x + 5)^2\) as \(4x^2 + 25\) instead of \(4x^2 + 20x + 25\). Another specific error: when \(b\) is negative, e.g., \((3x - 4)^2\), they write \(9x^2 - 24x - 16\) (wrong sign on \(b^2\)) or \(9x^2 + 24x + 16\) (wrong sign on \(2ab\)), showing they don't substitute \(b = -4\) correctly into \(2ab\) and \(b^2\).
## ON_FAILURE
Have the student go back to the distributive property: \((a+b)(a+b) = a(a+b) + b(a+b)\). Make them expand \(a(a+b)\) and \(b(a+b)\) separately, then add. Circle the two cross terms \(ab\) and \(ba\), emphasise they are like terms so \(ab + ba = 2ab\). For negative \(b\), use a specific example: \((x - 3)^2 = (x + (-3))^2\). Substitute \(b = -3\) into the identity: \(x^2 + 2(x)(-3) + (-3)^2 = x^2 - 6x + 9\). Practice 5 expansions with mixed signs until the pattern is automatic.
## PREREQUISITE_NODE_IDS
c8_math_ch6_1, c8_math_ch6_2, c7_math_ch04_006, c7_math_ch04_009, c6_math_ch05_055
## PREREQUISITE_REASONS
c8_math_ch6_1: Distributive property over addition is the foundation for deriving the identity.
c8_math_ch6_2: Expanding \((a+b)c\) builds the step of multiplying a binomial by a single term.
c7_math_ch04_006: Combining like terms is essential to simplify \(ab + ba\) into \(2ab\).
c7_math_ch04_009: Substituting values into expressions is needed to verify the identity numerically.
c6_math_ch05_055: Simplifying algebraic expressions prepares students to handle the expanded form.
## FORWARD_NODE_IDS
c8_math_ch6_8, c8_math_ch6_9, c8_math_ch6_10, c8_math_ch6_11
## FORWARD_REASONS
c8_math_ch6_8: The identity \((a+b)(a-b) = a^2 - b^2\) is derived by comparing with \((a+b)^2\) and noticing the middle term cancels.
c8_math_ch6_9: \((a-b)^2\) follows the same pattern with \(b\) replaced by \(-b\), directly using this identity.
c8_math_ch6_10: Area models for \((a+b)^2\) provide the visual proof that extends to the other identities.
c8_math_ch6_11: Applications like factorising perfect square trinomials require recognising \(a^2 + 2ab + b^2\).
## CROSS_SUBJECT_PREREQS
c6_math_ch05_052, c7_math_ch04_009
## CROSS_SUBJECT_REASONS
c6_math_ch05_052: Variables and constants are used in physics formulas like kinetic energy \(KE = \frac{1}{2}mv^2\) where squaring a binomial appears in relativistic corrections.
c7_math_ch04_009: Substituting values into algebraic expressions is fundamental in economics for calculating compound interest \((P(1+r))^2\) and in physics for equations of motion.
## CHAIN_DESCRIPTION
c8_math_ch6_1 -> c8_math_ch6_7 -> c8_math_ch6_8
## THIS_FORMULA
\((a + b)^2 = a^2 + 2ab + b^2\)
## FORMULA_VARIABLES
\(a\) = first term of the binomial (can be a number, variable, or expression), \(b\) = second term of the binomial (can be a number, variable, or expression, including negative values)
## FORMULA_UNITS
dimensionless
## COMPUTATION_TYPE
algebraic
## CROSS_SUBJECT
c6_math_ch05_052 | Algebraic variables represent physical quantities in formulas like \((u+v)^2\) in kinematics
c7_math_ch04_009 | Substituting numerical values into \((a+b)^2\) is used in calculating areas of expanded rooms or compound interest growth
## PREREQ_CONCEPT
Distributive property of multiplication over addition and combining like terms.
## PREREQ_BEFORE
The student must be able to expand \((a+b)(c+d)\) using the distributive property twice and simplify by collecting like terms.
## PREREQ_STUCK
Review the distributive property with binomials (c8_math_ch6_2) and practice combining like terms such as \(xy + yx\) (c7_math_ch04_006).
## WORKED_EXAMPLE_1
PROBLEM: A square courtyard has side length \((4x + 3)\) metres. Find the area of the courtyard in terms of \(x\). If \(x = 2\) m, calculate the numerical area.

STEPS:
- Step 1: Identify that area of a square = side × side. Here side = \((4x + 3)\) m, so area = \((4x + 3)^2\) sq m.
- Step 2: Recognise the binomial square and apply the identity \((a + b)^2 = a^2 + 2ab + b^2\) with \(a = 4x\) and \(b = 3\).
- Step 3: Substitute into the identity: \((4x)^2 + 2(4x)(3) + (3)^2\).
- Step 4: Compute each term: \((4x)^2 = 16x^2\); \(2(4x)(3) = 24x\); \((3)^2 = 9\). Combine: \(16x^2 + 24x + 9\) sq m.
- Step 5: For \(x = 2\), substitute: \(16(2)^2 + 24(2) + 9 = 16(4) + 48 + 9 = 64 + 48 + 9 = 121\) sq m. Verify by direct side length: side = \(4(2)+3 = 11\) m, area = \(11^2 = 121\) sq m.

REASONING: The identity converts a product of binomials into a sum of three terms, making it easier to evaluate for a given \(x\). The verification step connects the algebraic expression to the geometric meaning.

ANSWER: Area = \(16x^2 + 24x + 9\) sq m; when \(x = 2\) m, area = 121 sq m.
## WORKED_EXAMPLE_2
PROBLEM: Expand and simplify \((2p - 5q)^2\). Then find its value when \(p = 3\) and \(q = -1\).

STEPS:
- Step 1: Write the expression as a square of a binomial: \((2p - 5q)^2\). Identify \(a = 2p\), \(b = -5q\).
- Step 2: Apply the identity \((a + b)^2 = a^2 + 2ab + b^2\) with \(b = -5q\): \((2p)^2 + 2(2p)(-5q) + (-5q)^2\).
- Step 3: Compute each term carefully with signs: \((2p)^2 = 4p^2\); \(2(2p)(-5q) = -20pq\); \((-5q)^2 = 25q^2\).
- Step 4: Write the simplified expansion: \(4p^2 - 20pq + 25q^2\).
- Step 5: Substitute \(p = 3\), \(q = -1\): \(4(3)^2 - 20(3)(-1) + 25(-1)^2 = 4(9) - 20(-3) + 25(1) = 36 + 60 + 25 = 121\).
- Step 6: Verify by direct substitution into original: \((2(3) - 5(-1))^2 = (6 + 5)^2 = 11^2 = 121\). Matches.

REASONING: Handling the negative sign in \(b\) is critical; the identity works for any real \(b\) if we substitute the signed value. The verification step confirms no sign errors were made.

ANSWER: Expansion: \(4p^2 - 20pq + 25q^2\); Value at \(p=3, q=-1\): 121.
## WORKED_EXAMPLE_3
PROBLEM: The side of a square tile is \((3y - 2)\) cm. Four such tiles are arranged to form a larger square. Find the area of the larger square in terms of \(y\). If the total area is 400 sq cm, find the value of \(y\).

STEPS:
- Step 1: Area of one tile = \((3y - 2)^2\) sq cm. Since four tiles form a larger square, the side of the larger square is \(2 \times (3y - 2) = 6y - 4\) cm.
- Step 2: Area of larger square = \((6y - 4)^2\) sq cm. Alternatively, 4 × area of one tile = \(4(3y - 2)^2\). Both should match.
- Step 3: Use identity on \((6y - 4)^2\): \(a = 6y\), \(b = -4\). Expansion: \((6y)^2 + 2(6y)(-4) + (-4)^2 = 36y^2 - 48y + 16\).
- Step 4: Set equal to 400: \(36y^2 - 48y + 16 = 400\).
- Step 5: Simplify: \(36y^2 - 48y - 384 = 0\). Divide by 12: \(3y^2 - 4y - 32 = 0\).
- Step 6: Solve quadratic: factor as \((3y + 8)(y - 4) = 0\). Solutions: \(y = 4\) or \(y = -8/3\). Since side length must be positive, \(3y - 2 > 0 \Rightarrow y > 2/3\). So \(y = 4\).
- Step 7: Verify: side of tile = \(3(4)-2 = 10\) cm. Four tiles make a square of side 20 cm, area = 400 sq cm. Correct.

REASONING: This problem combines the binomial square identity with geometric reasoning (arranging tiles) and quadratic equation solving. The identity is used to form the equation, and the context filters the valid solution.

ANSWER: Area expression: \(36y^2 - 48y + 16\) sq cm; \(y = 4\).
## COMPETENCY_QUESTION_1
QUESTION: A student claims that \((2x + 3)^2 = 4x^2 + 9\) because "you square each term". Is the student correct? Explain why or why not using the distributive property. Then write the correct expansion.

COMPETENCY: Error identification and correction

STEPS:
- Step 1: Understand the student's claim and the proposed expansion.
- Step 2: Identify the method to test the claim: use distributive property \((a+b)(a+b) = a(a+b) + b(a+b)\).
- Step 3: Apply the method with \(a = 2x\), \(b = 3\).
- Step 4: Compare the result with the student's answer and explain the missing term.
- Step 5: State the correct expansion.

ANSWER: The student is incorrect. Using distributive property: \((2x+3)^2 = (2x+3)(2x+3) = 2x(2x+3) + 3(2x+3) = 4x^2 + 6x + 6x + 9 = 4x^2 + 12x + 9\). The student missed the middle term \(12x\) which comes from the two cross products \(2x \cdot 3\) and \(3 \cdot 2x\). The correct expansion is \(4x^2 + 12x + 9\).

DIFFICULTY: easy
## COMPETENCY_QUESTION_2
QUESTION: The area of a square is given by the expression \(9x^2 - 30x + 25\) square units. Find the side length of the square in terms of \(x\). If the side length is 7 units, find the value of \(x\). Explain how you recognised the expression as a perfect square.

COMPETENCY: Translating real-world situations to mathematical expressions

STEPS:
- Step 1: Recognise that area of a square = (side)^2, so the given trinomial must be a perfect square of the form \((a - b)^2 = a^2 - 2ab + b^2\).
- Step 2: Identify \(a^2 = 9x^2 \Rightarrow a = 3x\) and \(b^2 = 25 \Rightarrow b = 5\). Check middle term: \(-2ab = -2(3x)(5) = -30x\), which matches.
- Step 3: Write side length = \(3x - 5\) (since middle term is negative, it's \((a - b)^2\)).
- Step 4: Set side = 7: \(3x - 5 = 7 \Rightarrow 3x = 12 \Rightarrow x = 4\).
- Step 5: Verify: if \(x=4\), side = \(3(4)-5 = 7\), area = \(49\). Expression: \(9(16) - 30(4) + 25 = 144 - 120 + 25 = 49\). Matches.

ANSWER: Side length = \(3x - 5\) units. When side = 7 units, \(x = 4\). The expression is a perfect square because it matches the pattern \(a^2 - 2ab + b^2\) with \(a=3x, b=5\).

DIFFICULTY: medium
