## ELI5
Multiply negatives in pairs and they forgive each other; leave one alone and the sting remains. That is the whole story of raising a negative base to a power: even exponents pair up every negative sign, so the answer comes out positive; odd exponents leave one sign single, and the answer stays negative. Before touching the numbers, glance at the exponent's parity — it alone decides the sign of the result.

## DEFINITION
For a negative base \(-a\) (where \(a > 0\)) raised to a positive integer exponent \(n\), the sign of the result is determined by the parity of \(n\): \((-a)^n = a^n\) if \(n\) is even, and \((-a)^n = -a^n\) if \(n\) is odd. This follows directly from the integer multiplication sign rule that the product of an even number of negative factors is positive, while the product of an odd number of negative factors is negative.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
The student can correctly evaluate powers with negative bases for any positive integer exponent, explain why the sign alternates based on the exponent's parity, and apply this rule within multi-step problems involving the laws of exponents (e.g., multiplying powers with the same negative base).
## SCOPE_BOUNDARY
This node covers integer bases that are negative and positive integer exponents only. It does not cover negative exponents (which are introduced later), fractional or decimal exponents, or the case where the base is a negative fraction/decimal (though the sign rule logic extends to them). The distinction between \((-a)^n\) and \(-a^n\) (without parentheses) is emphasized as a critical notational boundary.
## WALKTHROUGH
Imagine a video game where your character has a "power level" that starts at \(-2\) points. Each time you complete a level, your power level is multiplied by itself (squared, cubed, etc.) based on the level number. If you are on level 2, your score becomes \((-2)^2\); on level 3, it becomes \((-2)^3\). To predict whether your score will be positive or negative without calculating the full value, you need the sign rule for negative bases. Begin by recalling the Class 7 rule: multiplying two negative integers gives a positive product, while multiplying three negatives gives a negative product. Write out \((-2)^2 = (-2) \times (-2)\) and \((-2)^3 = (-2) \times (-2) \times (-2)\) explicitly. Group the factors in pairs: every pair of negatives yields a positive. If the exponent is even, all negatives pair up perfectly → result is positive. If the exponent is odd, one negative remains unpaired → result is negative. This pairing insight is the key to the general rule: \((-a)^n\) is positive for even \(n\), negative for odd \(n\).

Takeaway: a negative base raised to an even power is positive, to an odd power negative — the paired-up and leftover negative factors decide the sign — while the magnitude follows the usual power rules. Exam format: expect sign-prediction questions and multi-step simplifications mixing negative bases with the exponent laws; state the parity verdict before evaluating. Verification beat: count the negative factors you are multiplying; the count's parity must match your sign. Why students miss it: they drop the brackets and treat a negative base as positive, or confuse a negative base with subtraction — the brackets carry the sign into every multiplication, and only their pairing governs the outcome.

## DIAGNOSTIC_QUESTION_1
What is the sign of \((-7)^{12}\)? Explain your reasoning in one sentence without calculating the actual value.
## DIAGNOSTIC_ANSWER_1
Positive. The exponent 12 is even, so the negative base raised to an even power yields a positive result. A wrong answer (e.g., "negative") reveals the student has not internalized the parity rule and may be guessing or applying a flawed rule like "negative base always gives negative result."
## DIAGNOSTIC_QUESTION_2
Explain the difference between \((-5)^4\) and \(-5^4\). Evaluate both expressions to demonstrate the difference.
## DIAGNOSTIC_ANSWER_2
\((-5)^4 = (-5) \times (-5) \times (-5) \times (-5) = 625\) (positive because the base \(-5\) is raised to the 4th power). \(-5^4 = -(5^4) = -(5 \times 5 \times 5 \times 5) = -625\) (negative because the exponent applies only to 5, then the negative sign is applied). A wrong answer (e.g., saying both are 625 or both are -625) reveals the student does not understand the critical role of parentheses in exponent notation and treats the negative sign as part of the base in both cases.
## DIAGNOSTIC_QUESTION_3
Simplify \((-3)^5 \times (-3)^2\) using the law of exponents for multiplying powers with the same base. State the sign of the final answer and its value.
## DIAGNOSTIC_ANSWER_3
\((-3)^5 \times (-3)^2 = (-3)^{5+2} = (-3)^7\). Since the exponent 7 is odd, the result is negative. Value: \((-3)^7 = -2187\). A wrong answer (e.g., \((-3)^{10}\) or positive 2187) reveals the student either added exponents incorrectly (multiplying instead of adding) or determined the sign incorrectly by not checking the parity of the final exponent.
## DIAGNOSTIC_QUESTION_4
Compare the values of \((-2)^6\) and \((-2)^5\). Which is greater? Justify your answer without calculating the exact values.
## DIAGNOSTIC_ANSWER_4
\((-2)^6\) is greater. \((-2)^6\) is positive (even exponent) and \((-2)^5\) is negative (odd exponent). Any positive number is greater than any negative number. A wrong answer (e.g., saying \((-2)^5\) is greater because 5 > 6 or because the magnitude 32 > 64) reveals the student is comparing magnitudes or exponents directly without considering the sign change, a common error when absolute value intuition overrides sign analysis.
## DIAGNOSTIC_QUESTION_5
A student claims: "\((-4)^3 = -12\) because you multiply the base by the exponent: \(-4 \times 3 = -12\)." Identify the error and explain the correct method to evaluate \((-4)^3\).
## DIAGNOSTIC_ANSWER_5
The error is confusing exponentiation with multiplication. The exponent indicates repeated multiplication of the base, not multiplication of the base by the exponent. Correct method: \((-4)^3 = (-4) \times (-4) \times (-4) = 16 \times (-4) = -64\). A wrong answer (e.g., accepting -12 or saying "the student forgot the negative sign") reveals the student does not understand the definition of exponentiation as repeated multiplication and falls back on a linear "base × exponent" misconception.
## DIAGNOSTIC_QUESTION_6
Create a real-world problem (using Indian context: rupees, temperature, or distance) where the solution requires evaluating a power with a negative base and an odd exponent, and another with an even exponent. Write the problem and the expressions needed.
## DIAGNOSTIC_ANSWER_6
Example: "The temperature in Leh drops by 3°C every hour for 4 hours. If the initial drop is represented as \(-3\)°C per hour, the total change after 4 hours can be modeled by \((-3)^4\)? Actually, that's not a good model. Better: A debt of ₹500 doubles every month for 3 months. If we represent the debt as a negative amount, the debt after 3 months is \((-500) \times 2^3\)? Hmm. Let's use a game: In a board game, landing on a red square multiplies your score by \(-2\). If you land on red squares 3 times in a row, your score multiplier is \((-2)^3 = -8\). If you land 4 times, it's \((-2)^4 = 16\)." A poor answer (e.g., using positive bases only, or not distinguishing odd/even exponents) reveals the student cannot contextualize the abstract sign rule, indicating a lack of deep conceptual transfer.
## COMMON_MISCONCEPTION
Students frequently confuse \((-a)^n\) with \(-a^n\). For example, they evaluate \((-3)^2\) as \(-9\) (treating it as \(-(3^2)\)) instead of \(+9\). This stems from not recognizing that parentheses make the negative sign part of the base. Another specific error: when multiplying powers with the same negative base, e.g., \((-2)^3 \times (-2)^4\), students correctly add exponents to get \((-2)^7\) but then incorrectly state the result is positive because "7 is a bigger number" or they misapply the sign rule to the original exponents (3 and 4) separately instead of the final exponent 7.
## ON_FAILURE
If a student writes \((-3)^2 = -9\), immediately ask: "What does the exponent 2 mean? Write it out as multiplication." Guide them to write \((-3) \times (-3)\). Then ask: "What is negative times negative?" (Positive). "So what is the answer?" (+9). For the multiplication error: present \((-2)^3 \times (-2)^2\). Have them expand both: \((-2)(-2)(-2) \times (-2)(-2)\). Count total factors: 5 negatives. Pair them: two pairs make positive, one left over makes negative. Result: negative. Then show the shortcut: add exponents → 5 (odd) → negative. Repeat with even sum to reinforce parity of the *sum* matters, not individual exponents.
## PREREQUISITE_NODE_IDS
c7_math_ch10_004, c7_math_ch10_005, c8_math_ch2_3, c8_math_ch2_7
## PREREQUISITE_REASONS
c7_math_ch10_004: Provides the sign rules for integer multiplication (negative × negative = positive) which is the foundation for the sign of powers.
c7_math_ch10_005: Explicitly covers the product of two negative integers, essential for understanding why even exponents yield positive results.
c8_math_ch2_3: Establishes exponential notation (base and exponent) so students know what \((-a)^n\) means structurally.
c8_math_ch2_7: The law \(a^m \times a^n = a^{m+n}\) is needed to combine powers with negative bases before applying the sign rule to the final exponent.
## FORWARD_NODE_IDS
c8_math_ch2_12
## FORWARD_REASONS
c8_math_ch2_12: Understanding the sign of powers with negative bases prepares students for the zero exponent rule \(a^0 = 1\), which must hold consistently for negative bases too (e.g., \((-5)^0 = 1\)), and the pattern of decreasing exponents (positive → zero → negative) relies on sign consistency.
## CROSS_SUBJECT_PREREQS
c6_math_ch02_022, c6_math_ch02_024
## CROSS_SUBJECT_REASONS
c6_math_ch02_022: Multiplication of Integers (Class 6) introduced the basic sign rules that are the absolute prerequisite for this topic.
c6_math_ch02_024: Properties of Integer Operations (Class 6) reinforces commutativity and associativity, allowing students to reorder and group negative factors when expanding powers.
## CHAIN_DESCRIPTION
c7_math_ch10_004 -> c8_math_ch2_11 -> c8_math_ch2_12
## THIS_FORMULA
\((-a)^n = \begin{cases} a^n & \text{if } n \text{ is even} \\ -a^n & \text{if } n \text{ is odd} \end{cases}\) for \(a > 0, n \in \mathbb{Z}^+\)
## FORMULA_VARIABLES
\(a\) = positive integer (magnitude of the base), \(n\) = positive integer exponent
## FORMULA_UNITS
dimensionless
## COMPUTATION_TYPE
algebraic
## CROSS_SUBJECT
c7_math_ch10_004 | Integer multiplication sign rules directly determine the sign of powers with negative bases through repeated multiplication.
c6_math_ch02_022 | Early introduction to integer multiplication in Class 6 provides the foundational "negative × negative = positive" fact used in every even-exponent evaluation.
## PREREQ_CONCEPT
Multiplication of integers: the product of two negative integers is positive; the product of a positive and a negative integer is negative.
## PREREQ_BEFORE
The student must be able to state and apply the sign rules for multiplying two or more integers fluently without a number line.
## PREREQ_STUCK
Revisit Class 7 Chapter 10 (Integers), specifically the nodes on multiplication sign rules (c7_math_ch10_004, c7_math_ch10_005) and practice expanding powers as repeated multiplication.
## WORKED_EXAMPLE_1
PROBLEM: In a science experiment, a chemical reaction causes the temperature change in a beaker to be modeled by \((-4)^n\) degrees Celsius, where \(n\) is the number of minutes. Find the temperature change after 3 minutes and after 4 minutes. Explain the physical meaning of the sign in each case.

STEPS:
- Step 1: Identify the base and exponents. Base = -4, exponents = 3 and 4.
- Step 2: Recall the sign rule: negative base raised to an odd exponent gives a negative result; raised to an even exponent gives a positive result.
- Step 3: Evaluate \((-4)^3\). Exponent 3 is odd → result is negative. Compute magnitude: \(4^3 = 4 \times 4 \times 4 = 64\). So \((-4)^3 = -64\).
- Step 4: Evaluate \((-4)^4\). Exponent 4 is even → result is positive. Compute magnitude: \(4^4 = 4 \times 4 \times 4 \times 4 = 256\). So \((-4)^4 = 256\).
- Step 5: Interpret: After 3 minutes, the temperature drops by 64°C (negative change). After 4 minutes, the temperature rises by 256°C (positive change). The alternating sign models an oscillating reaction.

REASONING: The sign rule derives from pairing negative factors. For \((-4)^3\), there are three \(-4\) factors: \((-4) \times (-4) \times (-4)\). The first pair gives \(+16\), multiplied by the remaining \(-4\) gives \(-64\). For \((-4)^4\), four factors form two complete pairs, yielding a positive product. This pairing logic works for any magnitude.

ANSWER: After 3 minutes: \(-64^\circ\text{C}\) (temperature drops). After 4 minutes: \(+256^\circ\text{C}\) (temperature rises).
## WORKED_EXAMPLE_2
PROBLEM: Simplify the expression \(\frac{(-5)^6}{(-5)^2}\) using the law of exponents for division. Determine the sign of the final result and its value.

STEPS:
- Step 1: Identify the law: \(\frac{a^m}{a^n} = a^{m-n}\) for same base \(a\). Here base \(a = -5\), \(m=6\), \(n=2\).
- Step 2: Subtract exponents: \(6 - 2 = 4\). So the expression simplifies to \((-5)^4\).
- Step 3: Apply the sign rule to the new exponent 4. Since 4 is even, \((-5)^4\) is positive.
- Step 4: Compute the magnitude: \(5^4 = 5 \times 5 \times 5 \times 5 = 625\).
- Step 5: Combine sign and magnitude: \((-5)^4 = +625\). Verify by expanding: \(\frac{(-5)^6}{(-5)^2} = \frac{15625}{25} = 625\).

REASONING: The division law reduces the problem to a single power. The sign of that power depends solely on the parity of the resulting exponent (4). This shows the laws of exponents work identically for negative bases; only the final sign evaluation requires the parity check.

ANSWER: \(+625\) (or simply \(625\))
## WORKED_EXAMPLE_3
PROBLEM: A stock market analyst models the daily fluctuation factor of a volatile stock as \(-1.5\). If the factor is applied for 5 consecutive days, the overall factor is \((-1.5)^5\). The analyst then multiplies this by a correction factor of \((-1.5)^2\) for the weekend. What is the overall factor for the 7-day period? Is the final value positive or negative? Calculate the exact value.

STEPS:
- Step 1: Recognize we are multiplying powers with the same base \(-1.5\): \((-1.5)^5 \times (-1.5)^2\).
- Step 2: Apply the multiplication law \(a^m \times a^n = a^{m+n}\): \((-1.5)^{5+2} = (-1.5)^7\).
- Step 3: Determine the sign of \((-1.5)^7\). Exponent 7 is odd → result is negative.
- Step 4: Compute the magnitude: \(1.5^7\). Calculate stepwise: \(1.5^2 = 2.25\), \(1.5^3 = 3.375\), \(1.5^4 = 5.0625\), \(1.5^5 = 7.59375\), \(1.5^6 = 11.390625\), \(1.5^7 = 17.0859375\).
- Step 5: Apply the negative sign: \(-17.0859375\).
- Step 6: Interpret: The overall 7-day factor is negative, meaning the stock's trend reverses direction (e.g., from gain to loss) over the week.

REASONING: Combining the laws of exponents with the sign rule requires adding exponents first, then checking parity of the sum. The sum \(5+2=7\) is odd, so the final sign is negative. This multi-step problem tests whether the student applies the sign rule to the *final* exponent, not the individual ones.

ANSWER: Overall factor = \(-17.0859375\) (negative)
## COMPETENCY_QUESTION_1
QUESTION: Ravi says: "\((-2)^6\) is greater than \((-2)^5\) because 6 is greater than 5." Priya says: "\((-2)^6\) is greater than \((-2)^5\) because any positive number is greater than any negative number." Who is correct? Justify your answer by evaluating both expressions and explaining the reasoning.

COMPETENCY: Comparing and justifying mathematical statements using conceptual understanding of sign rules and magnitude.

STEPS:
- Step 1: Evaluate \((-2)^6\). Exponent 6 is even → positive. \(2^6 = 64\). So \((-2)^6 = 64\).
- Step 2: Evaluate \((-2)^5\). Exponent 5 is odd → negative. \(2^5 = 32\). So \((-2)^5 = -32\).
- Step 3: Compare 64 and -32. 64 > -32.
- Step 4: Analyze Ravi's reasoning: He compared exponents (6 > 5) but ignored the sign change. This reasoning would fail for \((-2)^3\) vs \((-2)^2\) (exponent 3 > 2 but -8 < 4).
- Step 5: Analyze Priya's reasoning: She correctly identified the sign difference (positive vs negative) and used the number line property that positives > negatives. This is the correct conceptual justification.

ANSWER: Priya is correct. \((-2)^6 = 64\) (positive) and \((-2)^5 = -32\) (negative). Since any positive number is greater than any negative number, \(64 > -32\). Ravi's reasoning is flawed because it ignores the sign change caused by the parity of the exponent.

DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: Find all integer values of \(n\) (where \(1 \le n \le 10\)) for which the expression \((-3)^n + (-3)^{n+1}\) is positive. Explain your reasoning by analyzing the sign and magnitude of each term.

COMPETENCY: Translating real-world situations to mathematical expressions and generalizing patterns (algebraic reasoning).

STEPS:
- Step 1: Factor the expression: \((-3)^n + (-3)^{n+1} = (-3)^n [1 + (-3)] = (-3)^n \times (-2)\).
- Step 2: Analyze the sign of \((-3)^n\): positive if \(n\) is even, negative if \(n\) is odd.
- Step 3: Multiply by \(-2\) (negative). Sign of product = sign of \((-3)^n\) × sign of \(-2\).
- Step 4: Case 1: \(n\) even → \((-3)^n\) positive. Positive × negative = negative. Expression is negative.
- Step 5: Case 2: \(n\) odd → \((-3)^n\) negative. Negative × negative = positive. Expression is positive.
- Step 6: List odd \(n\) between 1 and 10 inclusive: \(n = 1, 3, 5, 7, 9\).
- Step 7: Verify with \(n=1\): \((-3)^1 + (-3)^2 = -3 + 9 = 6 > 0\). With \(n=2\): \((-3)^2 + (-3)^3 = 9 - 27 = -18 < 0\). Pattern holds.

ANSWER: The expression is positive for \(n = 1, 3, 5, 7, 9\) (all odd integers from 1 to 10).

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: This follows directly from the integer ______ sign rule that the product of an even number of negative factors is positive, while the product of an odd number of negative factors is negative.

## DIAGNOSTIC_ANSWER_7
multiplication

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Each time you complete a level, your power level is ______ by itself (squared, cubed, etc.) based on the level number.

## DIAGNOSTIC_ANSWER_8
multiplied

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can correctly evaluate powers with negative bases for any positive integer exponent, explain why the sign alternates based on the exponent's parity, and apply this rule within multi-step problems involving the laws of exponents (e.g., multiplying powers with the same negative base).
