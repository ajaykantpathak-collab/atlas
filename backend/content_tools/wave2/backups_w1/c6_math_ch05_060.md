## ELI5
A block tower that grows by the same handful each level is a pattern with a rule, and algebra writes the rule once for every level: the level number times the step, plus the starter's offset. Guessing level by level dies at the hundredth; the rule answers instantly. Find the jump, fit the start, and let a letter stand for any level.

## DEFINITION
Algebra is the branch of mathematics that uses variables (letters) to represent unknown numbers, allowing us to describe general patterns and relationships with simple formulas. A variable acts as a placeholder that can represent any number within a specific context.
## COGNITIVE_LEVEL
understand
## MASTERY_CRITERIA
The student must be able to identify a pattern in a sequence of numbers and write a simple algebraic expression (e.g., $3n + 1$) to describe any term in that sequence. They must demonstrate this by predicting the value of the 10th or 20th term correctly.
## SCOPE_BOUNDARY
This node covers identifying patterns and representing them with basic algebraic expressions ($a_n = dn + c$). It does not cover series convergence, complex equations, or geometric proofs.
## WALKTHROUGH
Imagine you are building a tower using blocks, and each level you add requires exactly 3 more blocks than the one below. If the first level has 2 blocks, the second has 5, and the third has 8, how do you find the 100th level without counting every single block? Start by looking at how much the pattern "jumps" each time (the difference). Since it jumps by 3, we know our rule involves $3 \times n$. Test this by putting $n=1$ into $3 \times n$; you get 3, but you need 2. To get from 3 to 2, you must subtract 1. Therefore, your rule is $3n - 1$. The key insight is that the "jump" tells you the multiplier, and the "adjustment" tells you the constant.

**Takeaway:** algebra turns a growing pattern into a rule - step times position plus offset - that predicts any term instantly. **In the exam:** in pattern questions, name the common difference, fit the offset from the first term, and write the rule with a letter for position. **Check yourself:** climb the walkthrough's tower - each level adds the same handful, and the rule counts any level without building it. **Why students miss it:** students fit rules by addition alone - the walkthrough's tower is a no to that; the jump multiplies the position and the offset tunes the start. Rehearse the exam move once more - jump, offset, rule - and the answer arranges itself in exam-ready order with nothing left to chance.

## DIAGNOSTIC_QUESTION_1
If a sequence starts 5, 8, 11, 14, ..., what is the "jump" or common difference between consecutive terms?
## DIAGNOSTIC_ANSWER_1
The jump is 3. A student who says "5" or "14" is confusing the starting term or the last term with the rate of change.

**A wrong answer (naming a term as the jump) reveals the student confused the step with the stones - the jump is the shared gap, not the first or last term.**

## DIAGNOSTIC_QUESTION_2
For the pattern 4, 7, 10, 13, ..., if the rule is $3n + 1$, what does the letter 'n' represent?
## DIAGNOSTIC_ANSWER_2
'n' represents the position of the term (1st, 2nd, 3rd, etc.). If a student says 'n' is just any number, they miss the concept that 'n' links the position to the value.

**A wrong answer (treating the letter as any number) reveals the student missed the post - the letter holds the term's position, linking where it stands to what it is worth.**

## DIAGNOSTIC_QUESTION_3
A pattern follows the rule $5n - 2$. Find the 10th term.
## DIAGNOSTIC_ANSWER_3
The 10th term is $5(10) - 2 = 48$. A student who calculates $5 \times (10 - 2)$ shows an error in understanding the order of operations or the formula structure.

**A wrong answer (grouping before multiplying) reveals the student broke the order - the rule multiplies the step by the position first and subtracts afterwards.**

## DIAGNOSTIC_QUESTION_4
Given the pattern 2, 5, 8, 11, ..., why is it incorrect to say the rule is simply $3n$?
## DIAGNOSTIC_ANSWER_4
$3n$ would give 3, 6, 9... for $n=1, 2, 3$. Because the sequence starts at 2, $3n$ is always 1 too high. A student who thinks $3n$ is correct ignores the starting value.

**A wrong answer (accepting the offset-free rule) reveals the student ignored the landing - the pure step rule overshoots the first term, and the offset is what pulls it back.**

## DIAGNOSTIC_QUESTION_5
If a student claims the rule for 10, 20, 30, 40 is $n + 10$, is this correct? Justify your answer.
## DIAGNOSTIC_ANSWER_5
No, it is incorrect. For $n=1$, $n+10$ gives 11, not 10. The correct rule is $10n$. A student who agrees with $n+10$ likely confuses addition with multiplication.

**A wrong answer (backing the addition rule) reveals the student confused climbing with stepping - the terms grow by repeated jumps, which is multiplication by position.**

## DIAGNOSTIC_QUESTION_6
Create a number pattern where the 1st term is 5 and each term increases by 4. Write the algebraic rule for your pattern.
## DIAGNOSTIC_ANSWER_6
The sequence is 5, 9, 13, 17... The rule is $4n + 1$. A poor answer would be a sequence that doesn't increase by 4 or a rule that doesn't produce the first term correctly.

**A wrong answer (writing a rule that misses the start) reveals the student skipped the fitting - the rule must reproduce the very first term before it may claim any others.**

## COMMON_MISCONCEPTION
Students often try to find the rule by looking at the relationship between the term and the position as an addition problem instead of a multiplication problem. For example, in 2, 5, 8..., they see $2+3=5$, so they might guess the rule is $n+3$, ignoring that the pattern must work for all terms, not just the first two.
## ON_FAILURE
Ask the student to write the sequence in a table: Position (n) | Value ($a_n$). Ask them, "If $n$ increases by 1, how much does the value increase?" Once they identify the jump (e.g., 3), tell them the rule MUST start with $3 \times n$. Then, have them calculate $3 \times 1, 3 \times 2$ and compare those to the actual values in the table to find the "fix" (the constant $c$).
## BUILDS_ON
Basic arithmetic operations (addition and multiplication).
## LEADS_TO
Solving linear equations and graphing coordinate geometry.

## PREREQUISITE_NODE_IDS
c6_math_ch04_042, c6_math_ch04_043, c6_math_ch04_044, c6_math_ch04_045, c6_math_ch04_046, c6_math_ch04_047

## FORWARD_NODE_IDS
c7_math_ch04_005, c7_math_ch06_001, c7_math_ch06_008, c8_math_ch13_3, c8_math_ch5_1, c8_math_ch5_7
## FORWARD_REASONS
c7_math_ch04_005: builds upon number and geometric patterns from Class 6 to transition into algebraic generalisation.
c7_math_ch06_001: connects patterns to algebraic thinking and variable expressions.
c7_math_ch06_008: requires understanding basic pattern rules and early algebra connections.
c8_math_ch13_3: Patterns and algebra connects geometric/number patterns to algebraic generalisation — the core of this topic.
c8_math_ch5_1: Patterns and algebra connects numerical patterns to algebraic expressions.
c8_math_ch5_7: Connects patterns to algebraic generalization, the core skill used here.

## CHAIN_DESCRIPTION
arithmetic_operations -> patterns_and_algebra -> linear_equations
## THIS_FORMULA
$a_n = dn + c$
## FORMULA_VARIABLES
$a_n$ = the value of the term at position $n$; $n$ = the position of the term; $d$ = the common difference (the jump); $c$ = the adjustment constant.
## FORMULA_UNITS
N/A
## COMPUTATION_TYPE
algebraic
## CROSS_SUBJECT

## PREREQ_CONCEPT
The concept of a sequence as an ordered list of numbers.
## PREREQ_BEFORE
Ability to perform multiplication and addition fluently.
## PREREQ_STUCK
Review the multiplication tables and identifying differences between numbers.
## WORKED_EXAMPLE_1
PROBLEM: A notebook costs 20 rupees, and every additional page added to it costs 2 rupees. If a notebook has $n$ pages, write a rule for the total cost and find the cost for 50 pages.
STEPS:
- step 1: Identify the fixed cost (20) and the variable cost per page (2).
- step 2: The pattern is 22, 24, 26... where 22 is for 1 page, 24 for 2, etc.
- step 3: The jump is 2, so the rule is $2n + c$. Since for $n=1$, $2(1)+c = 22$, then $c=20$.
- step 4: Rule is $2n + 20$.
- step 5: For 50 pages, $2(50) + 20 = 100 + 20 = 120$.
REASONING: The constant 20 represents the base cost, and $2n$ represents the cost of pages added. This combines a fixed starting point with a steady increase.
ANSWER: 120 rupees
## WORKED_EXAMPLE_2
PROBLEM: Guna saves 5 rupees on Monday. Every day after, he saves 7 rupees more than the day before. How much will he have saved on the 10th day?
STEPS:
- step 1: Monday ($n=1$) = 5. Tuesday ($n=2$) = 12. Wednesday ($n=3$) = 19.
- step 2: Jump is 7, so rule is $7n + c$.
- step 3: For $n=1$, $7(1) + c = 5 \rightarrow 7 + c = 5 \rightarrow c = -2$.
- step 4: Rule is $7n - 2$.
- step 5: For $n=10$, $7(10) - 2 = 70 - 2 = 68$.
REASONING: We find the common difference to determine the multiplier and then adjust using the first term to find the constant.
ANSWER: 68 rupees
## WORKED_EXAMPLE_3
PROBLEM: A taxi charges 50 rupees for the first kilometre and 10 rupees for every extra kilometre. Write the cost formula for $n$ kilometres and find the price for a 15 km trip.
STEPS:
- step 1: At $n=1$, cost = 50. At $n=2$, cost = 60. At $n=3$, cost = 70.
- step 2: Jump is 10, so rule is $10n + c$.
- step 3: For $n=1$, $10(1) + c = 50 \rightarrow 10 + c = 50 \rightarrow c = 40$.
- step 4: Formula is $10n + 40$.
- step 5: For 15 km, $10(15) + 40 = 150 + 40 = 190$.
REASONING: The formula accounts for the fact that the first kilometre includes the base charge, effectively making the "constant" part of the linear progression.
ANSWER: 190 rupees
## COMPETENCY_QUESTION_1
QUESTION: A pattern is 7, 12, 17, 22. A student says the rule is $n+5$. Is this correct? Explain why or why not, and provide the correct rule.
COMPETENCY: Error identification and correction
STEPS:
- step 1: Test the student's rule with $n=1$: $1+5 = 6$. The actual first term is 7.
- step 2: The student's rule is wrong because it doesn't produce the correct values.
- step 3: Find the jump: $12-7=5$. The rule must be $5n + c$.
- step 4: Solve for $c$: $5(1) + c = 7 \rightarrow c=2$.
ANSWER: No, it is incorrect. The rule $n+5$ only adds 5 to the position, but the pattern increases by 5 every time, which requires $5n$. The correct rule is $5n+2$.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: You are given a sequence: 10, 13, 16, 19. If this pattern continues, will the number 50 appear in this sequence? Use an algebraic rule to justify.
COMPETENCY: Translating real-world situations to mathematical expressions
STEPS:
- step 1: Identify the jump: $13-10=3$.
- step 2: Find the rule: $3n + c$. For $n=1$, $3(1)+c=10 \rightarrow c=7$. Rule is $3n + 7$.
- step 3: Set the rule equal to 50: $3n + 7 = 50$.
- step 4: Solve for $n$: $3n = 43$.
- step 5: Since 43 is not divisible by 3, $n$ is not a whole number.
ANSWER: No, 50 will not appear. Since $n$ must be a whole number (position), and 50 does not fit the $3n+7$ rule for any whole number $n$, it cannot be part of the sequence.

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Algebra is the branch of mathematics that uses variables (letters) to represent unknown numbers, allowing us to describe general patterns and ______ with simple formulas.

## DIAGNOSTIC_ANSWER_7
relationships

**A wrong answer (writing any other word) reveals the student missed the definition's aim - the sentence names what algebra lets us describe.** The blank's own answer, relationships, is the definition's prize - variables let simple formulas capture general patterns and relationships.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are building a tower using blocks, and each level you add ______ exactly 3 more blocks than the one below.

## DIAGNOSTIC_ANSWER_8
requires

**A wrong answer (writing any other verb) reveals the student loosened the scene - the walkthrough's tower grows under a particular demand.** The blank's own answer, requires, is the walkthrough's hinge - each level demands the same extra handful, which is the pattern's jump.

## DIAGNOSTIC_QUESTION_9
What is Algebra? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Algebra is the branch of mathematics that uses variables (letters) to represent unknown numbers, allowing us to describe general patterns and relationships with simple formulas.

**A wrong answer (padding instead of quoting) reveals the student drifted from the definition's wording - the sentence wants the lesson's own clause.** The blank's own answer is the definition's clause: algebra uses variables to represent unknown numbers and describe general patterns with formulas - quote it as written.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Imagine you are building a tower using blocks, and each level you add requires exactly ______ more blocks than the one below.

## DIAGNOSTIC_ANSWER_10
3

**A wrong answer (guessing a different count) reveals the student skipped the walkthrough's tower - the level-by-level demand is stated plainly.** The blank's own answer matches the tower's step in the walkthrough - that shared handful is the jump every rule must encode.

## DIAGNOSTIC_QUESTION_11
What common mix-up does this lesson flag about Algebra?

## DIAGNOSTIC_ANSWER_11
Students often try to find the rule by looking at the relationship between the term and the position as an addition problem instead of a multiplication problem.

**A wrong answer (fitting rules by adding only) reveals the student walked into the flagged mix-up - reading position-to-value as pure addition is exactly the flagged error.**

## DIAGNOSTIC_QUESTION_12
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_12
They must demonstrate this by predicting the value of the 10th or 20th term correctly.

**A wrong answer (claiming rules without prediction) reveals the student missed the bar - mastery is proved by predicting a far term correctly from the rule, the walkthrough's tower counted without being built.**

