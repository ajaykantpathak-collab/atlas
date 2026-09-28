## DEFINITION
Patterns with integers are sequences of numbers that follow a specific, repeating rule—such as adding, subtracting, or multiplying by a constant integer—to determine the next term in the series. These patterns help identify how values change in relation to one another across the zero boundary on the number line.
## COGNITIVE_LEVEL
analyze
## MASTERY_CRITERIA
The student must be able to identify the rule governing an integer sequence (such as a common difference or ratio) and use that rule to correctly determine the next three terms in both increasing and decreasing patterns.
## SCOPE_BOUNDARY
This node covers arithmetic and simple geometric patterns involving integers. It excludes complex series formulas (like sum of n terms), Fibonacci sequences with negative numbers, and recursive function definitions.
## WALKTHROUGH
Have you ever noticed how the temperature drops steadily as you climb higher up a mountain, or how a bank balance changes after a series of deposits and withdrawals? To begin, look at your sequence: 5, 3, 1, -1, -3. Ask yourself: "How do I get from 5 to 3?" (I subtract 2). Now check: "Does that work for 3 to 1?" (Yes, 3 - 2 = 1). The key is to test your rule across at least three numbers to ensure it is consistent. Once you find the "gap" or "multiplier," apply it to the last known number to find the next one, even if you have to cross past zero.
## DIAGNOSTIC_QUESTION_1
What is the next number in the sequence: 10, 7, 4, 1, ...?
## DIAGNOSTIC_ANSWER_1
The next number is -2. A wrong answer like 2 reveals that the student forgot to continue the pattern past zero and incorrectly assumed the pattern stops or reverses at 1.
## DIAGNOSTIC_QUESTION_2
If a sequence starts with -2, -4, -8, -16, ..., what is the rule being applied to each term?
## DIAGNOSTIC_ANSWER_2
The rule is multiplying by 2 (or by positive 2). A student who says "subtracting 2" is confusing addition/subtraction with multiplication, which is a common error when dealing with negative values.
## DIAGNOSTIC_QUESTION_3
A pattern follows the rule: "Add -3 to the current number." If the sequence starts at 2, what are the next three numbers?
## DIAGNOSTIC_ANSWER_3
The next numbers are -1, -4, and -7. To find this, perform 2 + (-3) = -1, then -1 + (-3) = -4, and -4 + (-3) = -7. A student who gets 5, 8, 11 is ignoring the negative sign in the rule.
## DIAGNOSTIC_QUESTION_4
Compare the sequence "5, 10, 15, 20" with "-5, -10, -15, -20". How do the rules differ?
## DIAGNOSTIC_ANSWER_4
The first sequence adds +5, while the second adds -5. A student who thinks they are the same ignores the direction of the change, failing to distinguish between positive and negative growth.
## DIAGNOSTIC_QUESTION_5
If a sequence is 8, 4, 0, -4, -8, is it possible for the next number to be positive? Why or why not?
## DIAGNOSTIC_ANSWER_5
No, because the pattern is consistently decreasing by 4. Since -8 is already below zero and the pattern continues to move further left on the number line, the numbers will become more negative, not positive.
## DIAGNOSTIC_QUESTION_6
Create a sequence of 5 integers that starts at -10 and increases by 3 each time.
## DIAGNOSTIC_ANSWER_6
The sequence must be -10, -7, -4, -1, 2. A poor answer would show a failure to add correctly across the zero boundary (e.g., -10, -7, -4, 0, 3).
## COMMON_MISCONCEPTION
Students often fail to cross the zero barrier correctly. For example, in the sequence 2, 0, -2, ..., they might guess "0" or "1" next, because they treat the "negative" numbers as if they behave like positive numbers (thinking -2 comes after -3 in magnitude). They struggle to visualize that -4 is "further" from zero than -2.
## ON_FAILURE
If a student struggles, draw a vertical "Building of Fun" (number line) and have them physically place markers on the floors. Tell them: "If you are on floor -2 and you go down 2 more floors, count the floors down: -3, then -4." Say: "Moving further into the negative is like going deeper underground; the number gets bigger, but the value gets smaller."
## BUILDS_ON
Number line and integer comparison.
## LEADS_TO
Introduction to variables and simple algebraic expressions.

## FORWARD_NODE_IDS
c7_math_ch10_010, c8_math_ch1_3
## FORWARD_REASONS
c7_math_ch10_010: provides foundational practice with recognizing basic patterns using integers from Class 6.
c8_math_ch1_3: pattern recognition with integers builds the habit of looking for regularities.

## CHAIN_DESCRIPTION
Number line -> Patterns with integers -> Simple algebraic expressions.
## THIS_FORMULA
N/A - conceptual
## FORMULA_VARIABLES
N/A
## FORMULA_UNITS
N/A
## COMPUTATION_TYPE
arithmetic
## CROSS_SUBJECT

## PREREQ_CONCEPT
The concept of the number line and the relative value of negative integers.
## PREREQ_BEFORE
Must be able to identify which of two integers is greater.
## PREREQ_STUCK
Review the "Building of Fun" or a horizontal number line to visualize jumps of fixed size.
## WORKED_EXAMPLE_1
PROBLEM: A submarine starts at a depth of 20 metres below sea level. Every minute, it descends another 5 metres. What will be its depth after 4 minutes?
STEPS:
- step 1: Start at -20 (below sea level is negative).
- step 2: The rule is a decrease of 5, which is -5 per minute.
- step 3: Calculate for 4 minutes: -20 + (-5) + (-5) + (-5) + (-5).
- step 4: Compute: -20 - 5 = -25; -25 - 5 = -30; -30 - 5 = -35; -35 - 5 = -40.
- step 5: The depth is 40 metres below sea level.
REASONING: Since the submarine is already below sea level, we start with a negative integer and continue to subtract to represent moving deeper.
ANSWER: -40 metres (or 40 metres below sea level)
## WORKED_EXAMPLE_2
PROBLEM: A bank account starts at -50 rupees (a debt). The user deposits 20 rupees every week for 3 weeks. What is the new balance?
STEPS:
- step 1: Start at -50.
- step 2: The rule is an addition of +20 each week.
- step 3: Apply the rule for 3 weeks: -50 + 20 + 20 + 20.
- step 4: Compute: -50 + 20 = -30; -30 + 20 = -10; -10 + 20 = 10.
- step 5: The new balance is +10 rupees.
REASONING: Deposits represent positive values added to the current balance, even if that balance starts as a negative debt.
ANSWER: +10 rupees
## WORKED_EXAMPLE_3
PROBLEM: A sequence starts: 12, 8, 4, 0, ... Find the 7th term in the sequence.
STEPS:
- step 1: Identify the pattern: 12 to 8 is -4; 8 to 4 is -4; 4 to 0 is -4.
- step 2: The rule is "subtract 4".
- step 3: List terms: 1st=12, 2nd=8, 3rd=4, 4th=0.
- step 4: Continue: 5th = 0 - 4 = -4; 6th = -4 - 4 = -8; 7th = -8 - 4 = -12.
- step 5: Verify the steps match the rule.
REASONING: By establishing the common difference of -4, we can predict any future term by repeated subtraction.
ANSWER: -12
## COMPETENCY_QUESTION_1
QUESTION: A sequence is given as -15, -10, -5, 0, 5, ... A student claims the next three numbers are 10, 15, 20. Another student claims the next three are -10, -15, -20. Who is correct and why?
COMPETENCY: Comparing and justifying
STEPS:
- step 1: Identify the change between terms.
- step 2: Calculate -10 - (-15) = +5.
- step 3: Apply the rule to current terms.
- step 4: Compare with student claims.
ANSWER: The first student is correct because the sequence is increasing by 5 each time. The second student failed to recognize that the sequence is moving towards the right on the number line (increasing), not moving further left.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: If you have a sequence that decreases by 6 each time, and the 3rd term is -2, what is the 1st term?
COMPETENCY: Translating real-world situations to mathematical expressions
STEPS:
- step 1: Let the 3rd term be -2.
- step 2: To find the 2nd term, work backward (add 6): -2 + 6 = 4.
- step 3: To find the 1st term, work backward again (add 6): 4 + 6 = 10.
- step 4: Check: 10, 4, -2. Pattern is -6. Correct.
ANSWER: The 1st term is 10. Working backward requires performing the opposite operation (addition instead of subtraction) to find the previous values.
DIFFICULTY: hard
