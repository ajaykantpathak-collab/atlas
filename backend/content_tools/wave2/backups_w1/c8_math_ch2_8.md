## ELI5
Dividing powers with the same base is cancelling on a grand scale. Write both powers out in full — a lineup of identical factors on top, another below — then strike out every factor that appears in both. What survives is the answer, and its exponent is exactly the top count minus the bottom count. The rule writes itself: same base, keep it; subtract the exponents. The base must never be zero, since dividing by zero is forbidden territory.

## DEFINITION
When dividing two powers with the same non-zero base, keep the base and subtract the exponent of the denominator from the exponent of the numerator: \(a^m \div a^n = a^{m-n}\) for \(a \neq 0\) and \(m, n\) as positive integers with \(m \ge n\). This rule follows from cancelling common factors in the expanded form.
## COGNITIVE_LEVEL
understand
## MASTERY_CRITERIA
The student can correctly apply the quotient rule for exponents to simplify expressions with the same base, explain why subtraction of exponents occurs by showing the cancellation of factors, and solve problems where the rule is combined with multiplication of powers or power of a power.
## SCOPE_BOUNDARY
Covers division of powers with the same base where exponents are positive integers and the base is non-zero, including cases where the result is a positive exponent, zero exponent, or negative exponent (as an introduction to negative exponents). Does not cover division of powers with different bases, fractional exponents, or algebraic proofs beyond cancellation.
## WALKTHROUGH
Imagine you have \(10^5\) rupees and you want to divide it equally among \(10^2\) friends. How many rupees does each friend get? Write the division as \(10^5 \div 10^2\). Expand both powers: \(10^5 = 10 \times 10 \times 10 \times 10 \times 10\) and \(10^2 = 10 \times 10\). Cancel the two tens in the denominator with two tens in the numerator, leaving \(10 \times 10 \times 10 = 10^3\). Notice that the exponent 3 is exactly \(5 - 2\). This pattern leads to the rule: when dividing powers with the same base, subtract the exponents.

Takeaway: for the same non-zero base, division subtracts exponents — the bottom lineup cancels factors from the top, and the survivors' count is the difference. Exam format: expect quotient simplifications, combined products-and-quotients, and 'show why subtraction happens' via expanded cancellation. Verification beat: expand a small case and cancel visually once; then trust the rule. Why students miss it: they add instead of subtract (mixing up the two same-base laws), or they cancel only some of the bottom factors — every factor below must find a partner above before the survivors are counted. Write the numerator as bottom-times-leftover and the subtraction falls out in front of you. Keep the base untouched throughout — only the exponents negotiate.

## DIAGNOSTIC_QUESTION_1
State the rule for dividing powers with the same base using the formula \(a^m \div a^n\). What condition must be true about the base \(a\)?
## DIAGNOSTIC_ANSWER_1
The rule is \(a^m \div a^n = a^{m-n}\) for \(a \neq 0\). A wrong answer such as \(a^{m+n}\) or \(a^{m \times n}\) reveals the student is confusing the quotient rule with the product rule \((a^m \times a^n = a^{m+n})\) or the power of a power rule \((a^m)^n = a^{mn}\). Forgetting the condition \(a \neq 0\) indicates a gap in understanding that division by zero is undefined.
## DIAGNOSTIC_QUESTION_2
Explain why \(5^7 \div 5^4 = 5^3\) by writing both powers in expanded form and showing the cancellation. Why does subtraction of exponents work here?
## DIAGNOSTIC_ANSWER_2
\(5^7 = 5 \times 5 \times 5 \times 5 \times 5 \times 5 \times 5\) and \(5^4 = 5 \times 5 \times 5 \times 5\). Cancelling four 5's from numerator and denominator leaves three 5's, which is \(5^3\). Subtraction works because each factor in the denominator cancels exactly one factor in the numerator, reducing the total count by the exponent of the denominator. A student who cannot show the cancellation or says "we subtract because the rule says so" lacks conceptual understanding of why the rule holds.
## DIAGNOSTIC_QUESTION_3
Simplify: \( \frac{7^{10}}{7^4} \times 7^2 \). Show all steps.
## DIAGNOSTIC_ANSWER_3
Step 1: Apply quotient rule: \(7^{10} \div 7^4 = 7^{10-4} = 7^6\). Step 2: Apply product rule: \(7^6 \times 7^2 = 7^{6+2} = 7^8\). Final answer: \(7^8\). A wrong answer like \(7^{16}\) (adding all exponents) or \(7^4\) (subtracting then subtracting again) reveals the student does not know the order of operations for combined exponent rules or mixes up product and quotient rules.
## DIAGNOSTIC_QUESTION_4
Compare the results of \( \frac{2^8}{2^5} \) and \( \frac{2^5}{2^8} \). What do you notice about the exponents in the answers? Can you write a general statement for \( \frac{a^m}{a^n} \) when \( m < n \)?
## DIAGNOSTIC_ANSWER_4
\( \frac{2^8}{2^5} = 2^{3} = 8 \). \( \frac{2^5}{2^8} = 2^{-3} = \frac{1}{2^3} = \frac{1}{8} \). When \( m < n \), the result is \( a^{m-n} \) which is a negative exponent, meaning the reciprocal of the positive power. A student who says the second is "undefined" or "zero" does not yet grasp that the subtraction rule extends to negative exponents, a concept formally introduced in higher classes but hinted here.
## DIAGNOSTIC_QUESTION_5
A student simplified \( \frac{3^9}{3^3} \) as \( 3^3 \). Is this correct? If not, identify the error and give the correct simplification.
## DIAGNOSTIC_ANSWER_5
The student is incorrect. The error is subtracting incorrectly: \(9 - 3 = 6\), not 3. The correct simplification is \(3^{9-3} = 3^6\). A student who agrees with the error may be dividing the exponents (\(9 \div 3 = 3\)) instead of subtracting them, confusing the quotient rule with the power of a power rule where exponents are multiplied.
## DIAGNOSTIC_QUESTION_6
Create a real-life word problem (using rupees, metres, or litres) that requires using the rule \(a^m \div a^n = a^{m-n}\) to solve. Write the problem and solve it.
## DIAGNOSTIC_ANSWER_6
Example problem: "A water tank holds \(10^6\) litres of water. If each household uses \(10^3\) litres per day, how many days will the water last for one household?" Solution: \(10^6 \div 10^3 = 10^{6-3} = 10^3 = 1000\) days. A good answer includes a clear scenario with same base (10), correct application of the rule, and interpretation of the result. A poor answer uses different bases, does not require division of powers, or solves by repeated subtraction instead of the exponent rule.
## COMMON_MISCONCEPTION
Students often divide the exponents instead of subtracting them when applying the quotient rule. For example, in \( \frac{5^8}{5^2} \), they write \(5^{8 \div 2} = 5^4\) instead of \(5^{8-2} = 5^6\). This happens because they confuse the quotient rule with the power of a power rule \((a^m)^n = a^{mn}\) where exponents are multiplied, or they mistakenly think "division of powers means divide the exponents". The error is reinforced when the numbers accidentally work (e.g., \( \frac{2^6}{2^2} = 2^{6-2}=2^4=16\) and \(2^{6 \div 2}=2^3=8\) are different, but students may not check).
## ON_FAILURE
Write the division in expanded form: \( \frac{5^8}{5^2} = \frac{5 \times 5 \times 5 \times 5 \times 5 \times 5 \times 5 \times 5}{5 \times 5} \). Cancel the two 5's in the denominator with two 5's in the numerator. Count the remaining 5's: there are 6. So the answer is \(5^6\). Ask the student: "Did we divide the exponents 8 and 2? No, we cancelled factors, which reduced the count by 2. That is subtraction, not division of exponents." Then practice 3-4 similar expansions until the pattern is clear.
## PREREQUISITE_NODE_IDS
c8_math_ch2_3, c8_math_ch2_7, c6_math_ch02_023, c6_math_ch03_036
## PREREQUISITE_REASONS
c8_math_ch2_3: Understanding base and exponent notation is essential to identify same-base division.
c8_math_ch2_7: The product rule \(a^m \times a^n = a^{m+n}\) is the inverse operation and helps derive the quotient rule.
c6_math_ch02_023: Division of integers provides the arithmetic foundation for dividing powers as repeated division.
c6_math_ch03_036: Division of fractions reinforces the concept of cancelling common factors, which is the mechanism behind the exponent rule.
## FORWARD_NODE_IDS
c8_math_ch2_9, c8_math_ch2_12
## FORWARD_REASONS
c8_math_ch2_9: Power of a power \((a^m)^n = a^{mn}\) often combines with the quotient rule in multi-step simplifications.
c8_math_ch2_12: Zero exponent \(a^0 = 1\) is a direct consequence of the quotient rule when \(m = n\) (e.g., \(a^m \div a^m = a^0 = 1\)).
## CROSS_SUBJECT_PREREQS
c7_math_ch08_004, c7_math_ch12_005
## CROSS_SUBJECT_REASONS
c7_math_ch08_004: Division of fractions uses the reciprocal method, which parallels cancelling common factors in powers.
c7_math_ch12_005: Decimal division by shifting decimal points relates to subtracting powers of 10 (e.g., \(10^3 \div 10^2 = 10^1\)), connecting place value to exponent rules.
## CHAIN_DESCRIPTION
c8_math_ch2_3 -> c8_math_ch2_7 -> c8_math_ch2_8 -> c8_math_ch2_9 -> c8_math_ch2_12
## THIS_FORMULA
\(a^m \div a^n = a^{m-n}\) for \(a \neq 0\), \(m,n \in \mathbb{Z}^+\)
## FORMULA_VARIABLES
a = base (non-zero number), m = exponent of numerator (dividend), n = exponent of denominator (divisor)
## FORMULA_UNITS
dimensionless
## COMPUTATION_TYPE
algebraic
## CROSS_SUBJECT
c8_physics_ch1_2 | Speed = distance/time; if distance is \(10^5\) m and time is \(10^2\) s, speed = \(10^3\) m/s using quotient rule.
## PREREQ_CONCEPT
Understanding that division is the inverse of multiplication and that cancelling common factors in a fraction reduces the exponent count.
## PREREQ_BEFORE
The student must be able to expand powers (e.g., \(2^5 = 2 \times 2 \times 2 \times 2 \times 2\)) and cancel common factors in a fraction.
## PREREQ_STUCK
Revisit expanding powers and cancelling common factors in numerical fractions (Class 6 Fractions division) and the product rule for exponents (c8_math_ch2_7).
## WORKED_EXAMPLE_1
PROBLEM: A bacteria culture starts with \(3^8\) cells. After an antibiotic treatment, the number of cells reduces to \(3^5\). By what factor did the cells decrease? Express the factor as a power of 3.
STEPS:
- Step 1: Identify the initial amount = \(3^8\) and final amount = \(3^5\). The decrease factor is initial ÷ final = \(3^8 \div 3^5\).
- Step 2: Recognise the same base (3) and apply the quotient rule: \(a^m \div a^n = a^{m-n}\).
- Step 3: Subtract the exponents: \(8 - 5 = 3\).
- Step 4: Write the result: \(3^3\).
- Step 5: Verify by expanding: \(3^8 = 6561\), \(3^5 = 243\), \(6561 \div 243 = 27 = 3^3\). The factor is \(3^3\) (or 27 times).
REASONING: The quotient rule directly gives the factor by which the quantity changed because division of powers with the same base corresponds to subtracting the exponents, which counts how many times the base factor is removed.
ANSWER: \(3^3\) (or 27 times)
## WORKED_EXAMPLE_2
PROBLEM: Simplify: \( \frac{10^9 \times 10^4}{10^6} \). Write the answer as a power of 10.
STEPS:
- Step 1: Simplify the numerator first using the product rule: \(10^9 \times 10^4 = 10^{9+4} = 10^{13}\).
- Step 2: Now divide by the denominator: \(10^{13} \div 10^6\).
- Step 3: Apply the quotient rule: subtract exponents: \(13 - 6 = 7\).
- Step 4: Result: \(10^7\).
- Step 5: Check: \(10^9 = 1,000,000,000\); \(10^4 = 10,000\); product = \(10,000,000,000,000 = 10^{13}\). Divide by \(10^6 = 1,000,000\) gives \(10,000,000 = 10^7\). Correct.
REASONING: When an expression combines multiplication and division of powers with the same base, we can simplify the numerator (or denominator) first using the product rule, then apply the quotient rule. The order of operations (multiplication and division left to right) allows this grouping.
ANSWER: \(10^7\)
## WORKED_EXAMPLE_3
PROBLEM: The volume of a large cube is \( (2^5)^3 \) cubic cm. It is cut into smaller cubes each of volume \( 2^6 \) cubic cm. How many small cubes are obtained?
STEPS:
- Step 1: Find the volume of the large cube using power of a power: \((2^5)^3 = 2^{5 \times 3} = 2^{15}\) cm³.
- Step 2: Volume of each small cube = \(2^6\) cm³.
- Step 3: Number of small cubes = Total volume ÷ Volume of one small cube = \(2^{15} \div 2^6\).
- Step 4: Apply quotient rule: subtract exponents: \(15 - 6 = 9\).
- Step 5: Result: \(2^9\) small cubes.
- Step 6: Compute numerical value: \(2^9 = 512\) small cubes.
REASONING: This problem combines two exponent rules: power of a power (to find the large cube's volume from its side length expressed as a power) and quotient of powers (to find how many small cubes fit). The same base (2) allows the quotient rule to be applied directly.
ANSWER: \(2^9\) or 512 small cubes
## COMPETENCY_QUESTION_1
QUESTION: Ravi says that \( \frac{6^7}{6^3} = 6^2 \) because \(7 - 3 = 4\) and then he divides 4 by 2 to get 2. Is Ravi correct? Explain the error and give the correct answer.
COMPETENCY: Error identification and correction
STEPS:
- Step 1: Identify the rule needed: quotient rule for exponents.
- Step 2: Apply the rule correctly: subtract exponents \(7 - 3 = 4\).
- Step 3: Note that Ravi incorrectly divided the result by 2, perhaps confusing with another rule.
- Step 4: State the correct answer: \(6^4\).
- Step 5: Explain that the quotient rule only involves subtraction, not further division.
ANSWER: Ravi is incorrect. The correct simplification is \(6^{7-3} = 6^4\). Ravi's error was dividing the exponent difference by 2, which is not part of any exponent rule. The quotient rule states: keep the base, subtract the exponents.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: A rectangular field has area \(5^{12}\) square metres. Its length is \(5^7\) metres. Find the breadth of the field as a power of 5. Then, if the field is divided into square plots each of side \(5^2\) metres, how many such plots can be made? Show all steps.
COMPETENCY: Translating real-world situations to mathematical expressions and multi-step problem solving
STEPS:
- Step 1: Area = length × breadth. So breadth = area ÷ length = \(5^{12} \div 5^7 = 5^{12-7} = 5^5\) metres.
- Step 2: Area of one square plot = side × side = \(5^2 \times 5^2 = 5^{2+2} = 5^4\) sq m.
- Step 3: Number of plots = total area ÷ area of one plot = \(5^{12} \div 5^4 = 5^{12-4} = 5^8\).
- Step 4: Alternatively, number of plots along length = \(5^7 \div 5^2 = 5^5\), along breadth = \(5^5 \div 5^2 = 5^3\), total = \(5^5 \times 5^3 = 5^8\).
- Step 5: Final answer: breadth = \(5^5\) m, number of plots = \(5^8\).
ANSWER: Breadth = \(5^5\) metres; Number of square plots = \(5^8\).
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: This rule follows from ______ common factors in the expanded form.

## DIAGNOSTIC_ANSWER_7
cancelling

## DIAGNOSTIC_QUESTION_8
Fill in the blank: This pattern leads to the rule: when dividing powers with the same base, subtract the ______.

## DIAGNOSTIC_ANSWER_8
exponents

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can correctly apply the quotient rule for exponents to simplify expressions with the same base, explain why subtraction of exponents occurs by showing the cancellation of factors, and solve problems where the rule is combined with multiplication of powers or power of a power.
