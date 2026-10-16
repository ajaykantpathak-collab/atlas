## ELI5
Two and a half kilograms of jalebis packed into half-kilo cones: dividing a decimal by a decimal starts by promoting the divisor to a whole number. Slide both points right by the same number of places - the quotient never notices, because shifting both dividend and divisor equally changes nothing. Then divide as ordinary whole numbers. Count the cones your answer grants and sanity-check: dividing by a number below one should hand you more cones than kilograms.

## DEFINITION
Dividing a decimal number by another decimal number involves converting the divisor into a whole number by multiplying both the dividend and the divisor by the same power of 10 ($10, 100, 1000$, etc.), and then performing whole-number division to find the quotient.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
Can convert any decimal division problem into a whole-number divisor problem by shifting decimal points equally, and can compute the correct quotient with proper placement of the decimal point.
## SCOPE_BOUNDARY
Covers division of terminating decimals by terminating decimals with positive quotients, up to thousandths place. Does not cover non-terminating repeating decimal fractions or abstract algebraic proofs of real numbers.
## WALKTHROUGH
Imagine you bought $2.5$ kilograms of sweet jalebis for a school celebration, and you want to pack them into small paper cones, each holding $0.5$ kilograms. How many cones can you fill? To find out, you need to divide $2.5$ by $0.5$, which means dividing a decimal by a decimal. Just like we learned when we studied fractions as division, dividing by a decimal is tricky because the divisor has a fractional part. To make it easy, we use equivalent fractions or shifting decimal points: we multiply both numbers by $10$ so the divisor becomes a whole number. Then, the problem becomes $25 \div 5$, which is much easier to solve! The key insight is that shifting the decimal point the same number of places in both numbers does not change the final quotient.

**Takeaway:** decimal by decimal: shift both points equally until the divisor is whole, then divide normally. **In the exam:** count the divisor's decimal places, shift both numbers that many places, and compute. **Check yourself:** convert the jalebi packing into whole-number division and count the cones. **Why students miss it:** they shift only the divisor, quietly rescaling the answer by a power of ten. Slide both points the same distance and the quotient never feels the move.

## DIAGNOSTIC_QUESTION_1
What is the primary rule for making it easier to divide a decimal by another decimal number?
## DIAGNOSTIC_ANSWER_1
The correct answer is that you multiply both the dividend and the divisor by the same power of $10$ to make the divisor a whole number. A wrong answer usually shows that the student only shifted the decimal point in the dividend or tried to ignore the decimal point in the divisor entirely, which changes the value of the expression.
## DIAGNOSTIC_QUESTION_2
Why does multiplying both the dividend and the divisor by $10$ when calculating $3.6 \div 1.2$ give the exact same answer as $36 \div 12$?
## DIAGNOSTIC_ANSWER_2
The correct answer is that $3.6 \div 1.2$ can be written as the fraction $\frac{3.6}{1.2}$, and multiplying the numerator and denominator by $10$ gives an equivalent fraction $\frac{36}{12}$, which represents the exact same ratio and division. A wrong answer reveals the misconception that changing the numbers to whole numbers alters the final quotient, forgetting the rule of equivalent fractions.
## DIAGNOSTIC_QUESTION_3
Calculate the value of $7.5 \div 1.5$. Show your reasoning.
## DIAGNOSTIC_ANSWER_3
The correct answer is $5$. Working: 
1. Write as a fraction: $\frac{7.5}{1.5}$. 
2. Multiply numerator and denominator by $10$ to remove decimals: $\frac{7.5 \times 10}{1.5 \times 10} = \frac{75}{15}$. 
3. Divide whole numbers: $75 \div 15 = 5$. 
A wrong answer, such as $0.5$ or $50$, indicates that the student miscounted the decimal places or incorrectly placed the decimal point after division.
## DIAGNOSTIC_QUESTION_4
Compare the results of $4.8 \div 0.4$ and $0.48 \div 0.04$. Without fully recalculating, explain how their quotients relate to each other.
## DIAGNOSTIC_ANSWER_4
The correct answer is that both expressions yield the exact same quotient ($12$). In the second expression, both the dividend and the divisor were multiplied by $100$ ($0.48 \times 100 = 48$ and $0.04 \times 100 = 4$), which maintains equivalence according to the properties of division. A wrong answer indicates confusion about how scaling both numbers by the same factor preserves the ratio.
## DIAGNOSTIC_QUESTION_5
A student evaluates $6.3 \div 0.3$ and states the answer is $0.21$. Identify the error in the student's work and provide the correct evaluation.
## DIAGNOSTIC_ANSWER_5
The student's error was dividing $6.3$ by $3$ without shifting the decimal point of the dividend, or mistaking the operation for multiplication and moving the decimal two places to the left. The correct evaluation is: 
1. Convert divisor $0.3$ to whole number by multiplying both by $10$. 
2. Expression becomes $63 \div 3$. 
3. Calculate $63 \div 3 = 21$. 
A wrong answer shows the student cannot spot computational or decimal-shift errors in another person's work.
## DIAGNOSTIC_QUESTION_6
Create a division problem involving two decimals where the divisor is $0.05$ and the final quotient is a whole number greater than $10$. Show the conversion steps.
## DIAGNOSTIC_ANSWER_6
An expected good answer would be $0.85 \div 0.05$. 
Steps: 
1. Write expression: $0.85 \div 0.05$. 
2. Multiply both by $100$ to clear the divisor: $85 \div 5$. 
3. Compute whole number division: $85 \div 5 = 17$ (which is a whole number greater than $10$). 
A poor answer would feature a divisor that is not $0.05$ or result in a quotient that is not a whole number, showing a failure to construct a problem meeting specific constraints.
## COMMON_MISCONCEPTION
Students often shift the decimal point in the divisor to make it a whole number but forget to shift the decimal point in the dividend by the exact same number of places. For example, when calculating $4.5 \div 0.2$, they shift the decimal in $0.2$ to get $2$, but they leave $4.5$ as $4.5$ and calculate $4.5 \div 2 = 2.25$ instead of shifting both to get $45 \div 2 = 22.5$.
## ON_FAILURE
If a student makes this error, guide them back to fraction notation. Ask them to write the division as a fraction: $\frac{4.5}{0.2}$. Remind them of the golden rule of fractions: whatever you multiply the denominator by to clear the decimal, you MUST multiply the numerator by the exact same power of $10$. Say: "If we multiply the bottom by $10$ to make it $2$, we must multiply the top by $10$ to make it $45$. Now our problem is $\frac{45}{2}$!"
## PREREQUISITE_NODE_IDS
c7_math_ch12_001, c7_math_ch12_002, c7_math_ch12_004, c6_math_ch04_048
## PREREQUISITE_REASONS
c7_math_ch12_001: requires understanding decimal place values and representations.
c7_math_ch12_002: builds on multiplication skills used to scale decimals.
c7_math_ch12_004: provides the foundation for dividing decimals by whole numbers before moving to decimal divisors.
c6_math_ch04_048: reviews foundational Class 6 division of decimals concepts.
## FORWARD_NODE_IDS
c7_math_ch12_006, c7_math_ch12_007, c7_math_ch12_008, c7_math_ch12_010
## FORWARD_REASONS
c7_math_ch12_006: uses decimal shifting techniques learned here for quick mental math.
c7_math_ch12_007: requires division accuracy to estimate and verify results.
c7_math_ch12_008: applies decimal division to solve complex real-world word problems.
c7_math_ch12_010: requires checking the reasonableness of decimal division answers.
## CROSS_SUBJECT_PREREQS
c6_math_ch04_049, c6_math_ch06_064
## CROSS_SUBJECT_REASONS
c6_math_ch04_049: connects decimal operations to real-world measurements of money and length.
c6_math_ch06_064: applies division of decimals when finding unit rates using the unitary method.
## CHAIN_DESCRIPTION
c7_math_ch12_004 -> c7_math_ch12_005 -> c7_math_ch12_008
## THIS_FORMULA
a \div b = (a \times 10^n) \div (b \times 10^n)
## FORMULA_VARIABLES
a = dividend (decimal number), b = divisor (decimal number), n = number of decimal places needed to make the divisor a whole number.
## FORMULA_UNITS
dimensionless
## COMPUTATION_TYPE
arithmetic
## CROSS_SUBJECT
c7_math_ch06_002 | finding unit cost of items when total price and weight are given in decimals.
## PREREQ_CONCEPT
Converting decimal divisors to whole numbers using powers of 10.
## PREREQ_BEFORE
Students must know how to multiply decimals by powers of $10$ and perform whole-number division.
## PREREQ_STUCK
Review c7_math_ch12_001 to practice shifting decimal points when multiplying by powers of 10.
## WORKED_EXAMPLE_1
PROBLEM: A tailor has a ribbon of length $12.6$ metres. She wants to cut pieces that are $0.3$ metres long. How many pieces of ribbon can she cut?
STEPS:
- step 1: Identify the given values: Total length of ribbon (dividend) = $12.6$ m, length of each piece (divisor) = $0.3$ m. We need to find $12.6 \div 0.3$.
- step 2: Write the division expression as a fraction: $\frac{12.6}{0.3}$.
- step 3: Multiply both the numerator and the denominator by $10$ to eliminate the decimal point in the divisor: $\frac{12.6 \times 10}{0.3 \times 10} = \frac{126}{3}$.
- step 4: Perform the whole-number division $126 \div 3$. Since $12 \div 3 = 4$ and $6 \div 3 = 2$, the result is $42$.
- step 5: Verify the result with units: $42 \text{ pieces} \times 0.3 \text{ m/piece} = 12.6 \text{ m}$, which matches the original total length.
REASONING: By multiplying both the dividend and divisor by $10$, we scale the problem up into whole numbers without changing the ratio, making standard division possible.
ANSWER: 42 pieces
## WORKED_EXAMPLE_2
PROBLEM: An oil container holds $7.2$ litres of mustard oil. If small bottles each hold $0.15$ litres, how many bottles can be filled completely?
STEPS:
- step 1: Identify given values: Total oil = $7.2$ litres, bottle capacity = $0.15$ litres. Set up the division: $7.2 \div 0.15$.
- step 2: Write as a fraction: $\frac{7.2}{0.15}$.
- step 3: Determine the power of $10$ needed to make the divisor ($0.15$) a whole number. Since $0.15$ has two decimal places, multiply both numerator and denominator by $100$: $\frac{7.2 \times 100}{0.15 \times 100}$.
- step 4: Calculate the scaled numerator: $7.2 \times 100 = 720$. Calculate the scaled denominator: $0.15 \times 100 = 15$. The expression becomes $720 \div 15$.
- step 5: Perform long division: $720 \div 15 = 48$ bottles.
REASONING: The divisor has two decimal places, so scaling both numbers by $100$ ensures the divisor becomes the whole number $15$ while preserving the correct quotient.
ANSWER: 48 bottles
## WORKED_EXAMPLE_3
PROBLEM: Rahul cycles a distance of $18.75$ kilometres at a constant speed, taking $1.5$ hours. What is Rahul's average speed in kilometres per hour?
STEPS:
- step 1: Recall the formula for speed: $\text{Speed} = \frac{\text{Distance}}{\text{Time}}$. Here, Distance = $18.75$ km and Time = $1.5$ hours.
- step 2: Substitute the values into the formula: $\text{Speed} = 18.75 \div 1.5$. Write as a fraction: $\frac{18.75}{1.5}$.
- step 3: To make the divisor ($1.5$) a whole number, multiply both numerator and denominator by $10$: $\frac{18.75 \times 10}{1.5 \times 10} = \frac{187.5}{15}$.
- step 4: Notice that the numerator still has a decimal place. Multiply both numerator and denominator by $10$ again (or multiply the original fraction by $100$): $\frac{187.5 \times 10}{15 \times 10} = \frac{1875}{150}$.
- step 5: Simplify or perform long division: $1875 \div 150 = 12.5$ km/h. Verify by multiplying back: $12.5 \times 1.5 = 18.75$.
REASONING: When divisors and dividends have a different number of decimal places, we match the scale to the number with the maximum decimal places (two places in $18.75$), multiplying both by $100$ to clear all decimals cleanly.
ANSWER: 12.5 km/h
## COMPETENCY_QUESTION_1
QUESTION: Two students, Amit and Priya, are trying to solve $2.4 \div 0.08$. Amit says, "We multiply $2.4$ by $100$ and $0.08$ by $100$, getting $240 \div 8 = 30$." Priya says, "We only need to multiply $2.4$ by $10$ and $0.08$ by $10$, getting $24 \div 0.8 = 30$." Who is correct in their method, and what is the final answer?
COMPETENCY: Comparing and justifying mathematical methods
STEPS:
- step 1: Analyze Amit's method: multiplied both numbers by $100$ to make the divisor a whole number ($8$).
- step 2: Analyze Priya's method: multiplied both numbers by $10$, leaving the divisor as a decimal ($0.8$).
- step 3: Evaluate Priya's divisor: $0.8$ is still a decimal, so Priya's method does not eliminate decimals from the divisor, making further division difficult.
- step 4: Conclude that Amit's method successfully converts the divisor into a whole number, leading directly to easy whole-number division ($240 \div 8$).
ANSWER: Amit is correct because the primary goal of decimal division is to make the divisor a whole number. Multiplying both by $100$ turns $0.08$ into $8$ and $2.4$ into $240$. The final answer is $30$.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: A farmer has a rectangular plot of land with an area of $45.5$ square metres. If the width of the plot is $3.5$ metres, calculate its length. If fencing costs ₹ $45.50$ per metre, find the total cost to fence the entire plot.
COMPETENCY: Multi-step problem solving with decimals in real-world contexts
STEPS:
- step 1: Use the area formula for a rectangle: $\text{Area} = \text{Length} \times \text{Width}$. Therefore, $\text{Length} = \frac{\text{Area}}{\text{Width}} = \frac{45.5}{3.5}$.
- step 2: Solve for length by multiplying both numerator and denominator by $10$: $\frac{455}{35} = 13$ metres.
- step 3: Calculate the perimeter of the rectangle to find the total fencing required: $\text{Perimeter} = 2 \times (\text{Length} + \text{Width}) = 2 \times (13 + 3.5) = 2 \times 16.5 = 33$ metres.
- step 4: Calculate the total cost of fencing by multiplying the perimeter by the cost per metre: $33 \times 45.50$.
- step 5: Perform multiplication: $33 \times 45.50 =$ ₹ $1501.50$.
ANSWER: The length of the plot is $13$ metres, and the total cost to fence the plot is ₹ $1501.50$.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Just like we learned when we studied ______ as division, dividing by a decimal is tricky because the divisor has a fractional part.

## DIAGNOSTIC_ANSWER_7
fractions

**A wrong answer (writing 'decimals') reveals the student answered the objects - the sentence's comparison is to fractions studied as division, the blank's noun.**

Fractions is the earlier topic the division comparison leans on.

Fractions is the earlier topic the division comparison leans on here.

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
Can convert any decimal division problem into a whole-number divisor problem by shifting decimal points equally, and can compute the correct quotient with proper placement of the decimal point.

**A wrong answer (conversion-only skill) reveals the student mastered the shift alone - mastery also demands the correct quotient with its point properly placed.**

Shift both points equally, then divide - and place the quotient's point with care.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Just like we learned when we studied fractions as division, dividing by a decimal is tricky because the divisor has a ______ part.

## DIAGNOSTIC_ANSWER_9
fractional

**A wrong answer (writing 'decimal') reveals the student half the phrase - the divisor carries a fractional part, which is exactly what the shift fixes.**

Fractional is the divisor's condition - the shift exists to remove it.

Fractional is the divisor's condition - the whole point of the shift is to remove it.

