## ELI5
What happens when an exponent empties out completely? Divide a power by itself — the quotient rule says subtract the exponents and you are left with a zeroth power; but anything divided by itself is one. Both roads must reach the same answer, so a non-zero base raised to zero equals one. Watch the pattern descend too: each step down divides by the base, and the staircase always lands on one at the bottom. Only zero itself is barred from this game.

## DEFINITION
For any non-zero number a — whether an integer, fraction, decimal or algebraic expression — the zeroth power equals one: a⁰ = 1. The base may not be zero, because 0⁰ is left undefined. The rule follows from the law of exponents: dividing aⁿ by itself gives aⁿ⁻ⁿ = a⁰, and any non-zero quantity divided by itself equals 1 — so a⁰ must equal 1.

## COGNITIVE_LEVEL
understand
## MASTERY_CRITERIA
The student can apply the zero exponent rule to simplify expressions with integer, fractional, decimal, and algebraic bases (excluding zero), and can explain why \(a^0 = 1\) using the quotient rule of exponents or a descending pattern of powers.
## SCOPE_BOUNDARY
Covers the zero exponent rule for non-zero bases only. Does not cover \(0^0\) (indeterminate) or negative exponents (formally introduced in higher classes). Limited to integer exponents within Class 8 NCERT scope.
## WALKTHROUGH
Imagine a bacteria culture that doubles every hour. After 3 hours you have \(2^3 = 8\) times the original amount, after 2 hours \(2^2 = 4\) times, after 1 hour \(2^1 = 2\) times. How many times the original amount do you have at the start (0 hours)? Write the powers in descending order: \(2^3=8\), \(2^2=4\), \(2^1=2\). Each step divides by the base 2. Continuing the pattern, \(2^0 = 2 \div 2 = 1\). Connect this to the quotient rule learned earlier: \(2^3 \div 2^3 = 2^{3-3} = 2^0\), but \(2^3 \div 2^3 = 8 \div 8 = 1\). Therefore \(2^0 = 1\). Generalise: for any non-zero base \(a\), \(a^m \div a^m = a^{m-m} = a^0 = 1\).

Takeaway: a non-zero base to the power zero equals one — proved by the quotient rule, since the base divided by itself subtracts to a zero exponent yet must equal one — or by the descending pattern where each step divides by the base. Exam format: expect 'evaluate this expression with a zero exponent hidden inside' and 'justify why the rule holds'; the justification via division is the marked step. Verification beat: any base-to-zero inside a bigger expression collapses to one before the other operations. Why students miss it: they answer zero, confusing the exponent's value with the result, or apply the rule to a zero base, where it was never defined.

## DIAGNOSTIC_QUESTION_1
State the zero exponent rule for any non-zero base \(a\).
## DIAGNOSTIC_ANSWER_1
\(a^0 = 1\) for \(a \neq 0\). A wrong answer like \(a^0 = 0\) reveals the student thinks "zero exponent means zero", confusing the exponent with multiplication by zero. **A wrong answer (zero) reveals the student reads the zero exponent as an instruction to zero everything out — the exponent counts factors, and a count of zero leaves an empty product, which is one.** Remember the division proof: something split into parts equal to itself is one, whichever non-zero base you try from your notebook in Nagpur.

## DIAGNOSTIC_QUESTION_2
Explain why \(5^0 = 1\) using the quotient rule for exponents (\(a^m \div a^n = a^{m-n}\)).
## DIAGNOSTIC_ANSWER_2
\(5^0 = 5^{3-3} = 5^3 \div 5^3 = 125 \div 125 = 1\). A wrong answer that says "because any number to the power zero is 1 by definition" without using the quotient rule shows lack of understanding of the derivation. **A wrong answer (asserting the rule 'by definition' without the quotient argument) reveals the student cannot derive the result — the examiner wants the division shown: the base divided by an equal power of itself, exponents subtracting to zero, the quotient visibly one.** Try it aloud with the descending ladder for any base: keep dividing by the base and watch the value march down to one, never to zero — that staircase is the derivation.

## DIAGNOSTIC_QUESTION_3
Simplify: \(\left(\frac{3}{4}\right)^0 + (-7)^0 \times 2^0\).
## DIAGNOSTIC_ANSWER_3
\(\left(\frac{3}{4}\right)^0 = 1\), \((-7)^0 = 1\), \(2^0 = 1\). So \(1 + 1 \times 1 = 1 + 1 = 2\). A wrong answer might incorrectly compute \((-7)^0\) as \(-1\) or \(0\), revealing sign confusion or the misconception that a negative base yields a negative result.
## DIAGNOSTIC_QUESTION_4
Compare the expressions: \((x^2)^0\) and \(x^{2 \times 0}\). Are they equal for all non-zero \(x\)? Justify.
## DIAGNOSTIC_ANSWER_4
\((x^2)^0 = 1\) (since base \(x^2 \neq 0\)). \(x^{2 \times 0} = x^0 = 1\). They are equal. A wrong answer might say they are different because one is a power of a power and the other is a product, showing misunderstanding of the power-of-a-power rule and zero exponent.
## DIAGNOSTIC_QUESTION_5
A student simplifies \((2^3 \times 2^{-3})\) as \(2^0 = 1\). Is this correct? If yes, explain why the step is valid even though negative exponents are not yet formally introduced.
## DIAGNOSTIC_ANSWER_5
Yes, it is correct because \(2^3 \times 2^{-3} = 2^{3+(-3)} = 2^0 = 1\), and also \(2^3 \times \frac{1}{2^3} = 8 \times \frac{1}{8} = 1\). The step uses the product rule extended to negative exponents. A wrong answer might say it's invalid because negative exponents aren't allowed, showing rigidity in applying rules only to familiar cases.
## DIAGNOSTIC_QUESTION_6
Create a real-world problem involving repeated halving (or doubling) where the zero exponent naturally appears as the starting quantity. Write the problem and solve it.
## DIAGNOSTIC_ANSWER_6
Example: "A ball is dropped from a height of 10 metres. Each bounce reaches half the previous height. Write an expression for the height after \(n\) bounces. What is the height after 0 bounces?" Solution: height \(= 10 \times \left(\frac{1}{2}\right)^n\). For \(n=0\), height \(= 10 \times \left(\frac{1}{2}\right)^0 = 10 \times 1 = 10\) metres. A poor answer might not connect zero exponent to the initial condition or might use an incorrect base.
## COMMON_MISCONCEPTION
Students often think \(0^0 = 1\) by applying the rule blindly, or they think \(a^0 = 0\) because "zero times anything is zero". Specifically, they confuse the exponent zero with the base zero: they might write \(5^0 = 0\), reasoning that "the exponent is zero so the answer is zero". Another misconception: \((-5)^0 = -1\), because they think the negative sign stays.
## ON_FAILURE
Use the descending pattern approach: Write powers of 2 from \(2^3\) down to \(2^0\): 8, 4, 2, ?. Each step divides by 2. So \(2 \div 2 = 1\). Then generalise: \(a^3, a^2, a^1, a^0\). Each step divides by \(a\). So \(a^1 \div a = a^0 = 1\). Emphasise the base cannot be zero because division by zero is undefined. Have the student practise with fractions, decimals, and negative bases to reinforce that the rule holds for any non-zero base.
## PREREQUISITE_NODE_IDS
c8_math_ch2_3, c8_math_ch2_7, c8_math_ch2_8, c7_math_ch02_002, c7_math_ch04_009
## PREREQUISITE_REASONS
c8_math_ch2_3: understanding base and exponent notation is essential before applying zero exponent.
c8_math_ch2_7: product rule \(a^m \times a^n = a^{m+n}\) helps derive \(a^0\) by setting \(m = -n\) (though negative exponents not formal, pattern works).
c8_math_ch2_8: quotient rule \(a^m \div a^n = a^{m-n}\) directly gives \(a^0\) when \(m=n\).
c7_math_ch02_002: order of operations needed to evaluate expressions with exponents correctly.
c7_math_ch04_009: substituting values into algebraic expressions to verify zero exponent rule for variables.
## FORWARD_NODE_IDS
N/A

## FORWARD_REASONS
N/A
## CROSS_SUBJECT_PREREQS
c7_math_ch01_008, c7_math_ch06_005
## CROSS_SUBJECT_REASONS
c7_math_ch01_008: Patterns in Products helps recognise multiplicative patterns that lead to exponential notation.
c7_math_ch06_005: Virahanka-Fibonacci Sequence demonstrates exponential growth in nature, motivating zero exponent as initial term.
## CHAIN_DESCRIPTION
c8_math_ch2_8 -> c8_math_ch2_12 -> none
## THIS_FORMULA
\(a^0 = 1\), for \(a \neq 0\)
## FORMULA_VARIABLES
\(a\) = any non-zero number (integer, fraction, decimal, or algebraic expression)
## FORMULA_UNITS
dimensionless
## COMPUTATION_TYPE
algebraic
## CROSS_SUBJECT
c7_math_ch01_008 | Patterns in Products builds foundation for recognising exponential patterns used in scientific growth models.
c7_math_ch06_005 | Virahanka-Fibonacci Sequence illustrates exponential growth in biology, where zero exponent represents the initial term.
## PREREQ_CONCEPT
Understanding that exponents represent repeated multiplication and the quotient rule for dividing powers with the same base.
## PREREQ_BEFORE
Student must be able to apply the quotient rule \(a^m \div a^n = a^{m-n}\) and evaluate expressions with exponents.
## PREREQ_STUCK
Revisit the quotient rule for exponents (c8_math_ch2_8) and practice dividing powers with same base where exponents are equal.
## WORKED_EXAMPLE_1
PROBLEM: A scientist starts with 1 gram of a radioactive substance. The amount halves every hour. Write an expression for the amount remaining after \(n\) hours. How much is present at the start (\(n=0\))?
STEPS:
- Step 1: Identify the pattern: after 1 hour, amount \(= 1 \times \left(\frac{1}{2}\right)^1\); after 2 hours, amount \(= 1 \times \left(\frac{1}{2}\right)^2\); so after \(n\) hours, amount \(= 1 \times \left(\frac{1}{2}\right)^n\).
- Step 2: For \(n=0\), the expression becomes \(1 \times \left(\frac{1}{2}\right)^0\).
- Step 3: Apply zero exponent rule: \(\left(\frac{1}{2}\right)^0 = 1\) (since base \(\frac{1}{2} \neq 0\)).
- Step 4: Compute: \(1 \times 1 = 1\) gram.
- Step 5: Interpret: At the start (0 hours), the full 1 gram is present, consistent with the rule.
REASONING: The zero exponent represents the initial condition before any halving occurs. The quotient rule \(\left(\frac{1}{2}\right)^n \div \left(\frac{1}{2}\right)^n = \left(\frac{1}{2}\right)^0 = 1\) confirms this.
ANSWER: 1 gram
## WORKED_EXAMPLE_2
PROBLEM: Simplify the expression: \(\left( (-3)^4 \div (-3)^4 \right) \times (0.5)^0 + \left(\frac{2}{7}\right)^0\).
STEPS:
- Step 1: Simplify the division: \((-3)^4 \div (-3)^4 = (-3)^{4-4} = (-3)^0\) (using quotient rule).
- Step 2: Apply zero exponent rule: \((-3)^0 = 1\) (base \(-3 \neq 0\)).
- Step 3: Apply zero exponent rule to \((0.5)^0 = 1\) and \(\left(\frac{2}{7}\right)^0 = 1\).
- Step 4: Substitute: \(1 \times 1 + 1 = 1 + 1 = 2\).
- Step 5: Verify by direct computation: \((-3)^4 = 81\), \(81 \div 81 = 1\); \(0.5^0 = 1\); \(\left(\frac{2}{7}\right)^0 = 1\); \(1 \times 1 + 1 = 2\).
REASONING: The quotient rule directly yields a zero exponent. The zero exponent rule applies to negative bases, decimals, and fractions as long as base \(\neq 0\).
ANSWER: 2
## WORKED_EXAMPLE_3
PROBLEM: If \(x\) is a non-zero integer, simplify: \(\left(x^5 \times x^{-5}\right) + \left(x^0\right)^3 - \left(x^2\right)^0\). (Note: \(x^{-5}\) means \(1/x^5\)).
STEPS:
- Step 1: Use product rule: \(x^5 \times x^{-5} = x^{5+(-5)} = x^0\).
- Step 2: Apply zero exponent rule: \(x^0 = 1\).
- Step 3: Simplify \(\left(x^0\right)^3\): since \(x^0 = 1\), then \(1^3 = 1\). Alternatively, power of a power: \(\left(x^0\right)^3 = x^{0 \times 3} = x^0 = 1\).
- Step 4: Simplify \(\left(x^2\right)^0 = 1\) (base \(x^2 \neq 0\) because \(x \neq 0\)).
- Step 5: Combine: \(1 + 1 - 1 = 1\).
- Step 6: Check with a sample value, say \(x=2\): \(2^5=32\), \(2^{-5}=1/32\), product \(=1\); \((2^0)^3=1\); \((2^2)^0=4^0=1\); \(1+1-1=1\).
REASONING: This combines product rule, power of a power, and zero exponent rule. It shows consistency even with negative exponents (as reciprocals) and algebraic bases.
ANSWER: 1
## COMPETENCY_QUESTION_1
QUESTION: A student claims that \(0^0 = 1\) because "any number to the power zero is 1". Is the student correct? Explain why or why not, using the quotient rule \(a^m \div a^n = a^{m-n}\) with \(a=0\).
COMPETENCY: Error identification and correction
STEPS:
- Step 1: Recall the zero exponent rule is defined for \(a \neq 0\).
- Step 2: Apply quotient rule with \(a=0\): \(0^m \div 0^n = 0^{m-n}\). If \(m=n\), we get \(0^0 = 0^m \div 0^m\).
- Step 3: But \(0^m = 0\) for \(m>0\), so \(0^m \div 0^m = 0 \div 0\) which is undefined.
- Step 4: Conclude \(0^0\) is indeterminate, not 1.
ANSWER: The student is incorrect. The rule \(a^0 = 1\) only holds for non-zero bases. For base 0, the expression \(0^0\) is undefined because it leads to division by zero in the quotient rule derivation.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: In a computer game, a player's score doubles every level. If the score at level 1 is 10 points, write an expression for the score at level \(n\). What is the score at level 0 (before starting)? If the game designer changes the rule so that the score triples every level, how does the expression change? Does the zero exponent rule still apply?
COMPETENCY: Translating real-world situations to mathematical expressions
STEPS:
- Step 1: For doubling: score \(= 10 \times 2^n\) (since level 0: \(n=0 \Rightarrow 10 \times 2^0 = 10\); level 1: \(10 \times 2^1 = 20\), etc.). At level 0, score \(= 10 \times 2^0 = 10 \times 1 = 10\).
- Step 2: For tripling: score \(= 10 \times 3^n\). At level 0, score \(= 10 \times 3^0 = 10 \times 1 = 10\).
- Step 3: Zero exponent rule applies because bases 2 and 3 are non-zero. The initial score is the coefficient (10) times 1.
- Step 4: Explain that zero exponent gives the initial multiplier regardless of growth factor.
ANSWER: For doubling: score \(= 10 \times 2^n\); at level 0, score = 10. For tripling: score \(= 10 \times 3^n\); at level 0, score = 10. The zero exponent rule applies in both cases because bases 2 and 3 are non-zero. The initial score is always the starting value (10) multiplied by 1.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: How many times the ______ amount do you have at the start (0 hours)?

## DIAGNOSTIC_ANSWER_7
original

## DIAGNOSTIC_QUESTION_8
Fill in the blank: How many times the original amount do you have at the start (______ hours)?

## DIAGNOSTIC_ANSWER_8
0
