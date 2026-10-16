## ELI5
Build a border of connected squares from matchsticks and count: the first square costs 4 sticks, but every square after it adds only 3, because neighbours share a side. That shared side is the whole idea of generalising: the count grows by a fixed step, so a letter n can stand for any number of squares, and a two-part rule - one fixed start, plus the same step every time - predicts the count for a hundred squares without laying a single stick. Patterns become formulas the moment the repeating step is named.

## DEFINITION
Matchstick patterns and generalising with variables is the process of building geometric shapes with a constant number of matchsticks, observing how the total count changes as the number of shapes grows, and writing an algebraic expression using a variable (like $n$) to describe the rule for any number of shapes.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
Can analyze a growing visual or physical matchstick sequence, determine the fixed increment and starting value, and write a correct algebraic expression using a variable to represent the number of matchsticks required for any given number of shapes ($n$).
## SCOPE_BOUNDARY
Covers linear matchstick patterns leading to expressions of the form $an + b$ or $an$, where $n$ is a positive integer representing the number of figures. It does not cover quadratic or non-linear sequences (like $n^2$).
## WALKTHROUGH
Imagine you are sitting in your school art class and designing a border using matchsticks to make connected squares. To make 1 square, you need 4 matchsticks. If you want to connect a second square right next to it, you do not need 4 more matchsticks because they share a common side; you only add 3 more matchsticks, making a total of 7. How can we figure out how many matchsticks are needed if your art teacher asks you to build 50 connected squares without drawing them all? In Class 6, you learned how to write simple algebraic expressions using letters and constants. Now, we will connect that knowledge to visual patterns by finding a steady rate of change and writing a general algebraic formula using a variable like $n$ to represent any number of shapes.

**Takeaway:** growing patterns generalise when the fixed step is found: one starting value plus the same step every time. **In the exam:** tabulate shape number against stick count, name the constant step, then write start plus step times n. **Check yourself:** extend the connected-squares border by one square and confirm the step with your own sticks. **Why students miss it:** they multiply blindly by n, forgetting the shared sides that shrink each newcomer's cost.

## DIAGNOSTIC_QUESTION_1
What is a variable in the context of matchstick patterns?
A) A fixed number that never changes in the pattern
B) A letter that represents an unknown or changing number of shapes, such as the number of triangles or squares built
C) The exact number of matchsticks in a single base shape
D) The total cost of the matchsticks used in an activity
## DIAGNOSTIC_ANSWER_1
The correct answer is B. A variable is a letter used to represent an unknown or varying quantity, which in pattern problems stands for the number of figures being constructed. A wrong answer like A reveals a confusion between constants and variables, thinking that a letter must stand for a fixed number like 3 or 4. A wrong answer like C shows that the student mistakes the specific count of a single shape for the general role of a variable.
## DIAGNOSTIC_QUESTION_2
Rahul says that to make $n$ connected triangles where each triangle uses 3 matchsticks, the total number of matchsticks is always $3n$. Priya says that for connected triangles sharing sides, the rule is $2n + 1$. Who is correct if the triangles are connected in a row sharing a side?
A) Rahul is correct because $3 \times n$ accounts for 3 matchsticks per triangle.
B) Priya is correct because sharing a side means we do not add 3 full matchsticks for every new triangle added after the first.
C) Both are correct because multiplication and addition give the same result for any number of triangles.
D) Neither is correct because matchstick patterns cannot be expressed with algebraic expressions.
## DIAGNOSTIC_ANSWER_2
The correct answer is B. Priya is correct because when triangles are connected in a chain, the first triangle takes 3 matchsticks, and each subsequent triangle added to the chain only requires 2 additional matchsticks, giving the expression $2n + 1$. A student who chooses A has failed to account for shared sides between adjacent geometric shapes, mistakenly assuming independent shapes. A student who chooses C demonstrates a lack of basic numerical testing, as $3n$ and $2n+1$ yield different values for $n > 1$.
## DIAGNOSTIC_QUESTION_3
A pattern of letter 'H' shapes is made using matchsticks. One 'H' takes 7 matchsticks. Two connected 'H' shapes take 12 matchsticks. Three connected 'H' shapes take 17 matchsticks. Which algebraic expression gives the number of matchsticks for $n$ connected 'H' shapes?
A) $7n$
B) $5n + 2$
C) $7n - 2$
D) $2n + 5$
## DIAGNOSTIC_ANSWER_3
The correct answer is B. Step 1: Identify the values given: for $n = 1$, matchsticks = 7; for $n = 2$, matchsticks = 12; for $n = 3$, matchsticks = 17. Step 2: Find the difference between consecutive terms (the common difference), which is $12 - 7 = 5$ and $17 - 12 = 5$. Step 3: Since the growth is 5 per shape, the coefficient of $n$ is 5, so the expression starts as $5n$. Step 4: Test $n = 1$: $5(1) = 5$, but we need 7. We must add 2 to get the first term ($5(1) + 2 = 7$). Step 5: Verify with $n = 3$: $5(3) + 2 = 15 + 2 = 17$, which matches the given data. Therefore, the expression is $5n + 2$. A wrong answer like A occurs if the student multiplies the number of matchsticks in the first figure by $n$ without checking subsequent growth.
## DIAGNOSTIC_QUESTION_4
Consider two different matchstick patterns: Pattern A uses the rule $3n + 1$ and Pattern B uses the rule $4n$. For what value of $n$ (number of shapes) will both patterns require the exact same number of matchsticks?
A) $n = 0$
B) $n = 1$
C) $n = 3$
D) They will never require the same number of matchsticks.
## DIAGNOSTIC_ANSWER_4
The correct answer is B. Step 1: Set the two expressions equal to find where they intersect: $3n + 1 = 4n$. Step 2: Subtract $3n$ from both sides of the equation: $1 = 4n - 3n$. Step 3: Simplify: $1 = n$. Step 4: Verify by substituting $n = 1$ into both expressions: Pattern A gives $3(1) + 1 = 4$, and Pattern B gives $4(1) = 4$. Both equal 4 when $n = 1$. A wrong answer like C or D indicates that the student guessed randomly or could not set up and solve a simple linear equation from two algebraic expressions.
## DIAGNOSTIC_QUESTION_5
A student writes the expression $3n - 1$ for a matchstick pattern where 1 triangle takes 3 matchsticks, 2 triangles take 5 matchsticks, and 3 triangles take 7 matchsticks. Evaluate if this student's expression is correct for $n$ triangles.
A) Correct, because substituting $n=1, 2, 3$ gives 2, 5, and 8, which fits.
B) Incorrect, because substituting $n=1$ gives $3(1) - 1 = 2$, but 1 triangle takes 3 matchsticks. The correct expression is $2n + 1$.
C) Correct, because any algebraic expression with $n$ works for any visual pattern.
D) Incorrect only because it uses subtraction instead of addition.
## DIAGNOSTIC_ANSWER_5
The correct answer is B. Step 1: Check the student's expression for $n = 1$: $3(1) - 1 = 2$. Step 2: Compare with the given problem where 1 triangle takes 3 matchsticks ($2(1)+1 = 3$). Step 3: Check for $n = 2$: student's expression gives $3(2) - 1 = 5$, which matches the given data, but for $n=1$ it failed. Step 4: Conclude that an expression must work for all terms in the sequence, making $2n + 1$ the correct generalisation. A wrong answer like A shows the student checked only the second or third term and ignored the failure at $n = 1$.
## DIAGNOSTIC_QUESTION_6
Create an algebraic expression for a matchstick pattern where the first shape requires 5 matchsticks, and each subsequent shape added to the chain requires 4 additional matchsticks. Write down the expression for $n$ shapes and explain how you derived the coefficient and constant.
## DIAGNOSTIC_ANSWER_6
The expected answer is the expression $4n + 1$. Derivation explanation: Since each new shape adds 4 matchsticks, the multiplier (coefficient) of $n$ is 4. Testing $n = 1$ gives $4(1) = 4$, but the first shape requires 5 matchsticks, so we must add 1 to adjust, resulting in $4(1) + 1 = 5$. A poor answer would just state $5n$ or $4n$ without verifying against the first shape, showing a lack of understanding of how the starting value affects the constant term in a linear expression.
## COMMON_MISCONCEPTION
Students often assume that if a single shape takes $k$ matchsticks, then $n$ connected shapes will always take $k \times n$ matchsticks, completely ignoring the fact that connected shapes share sides. For example, if one square takes 4 matchsticks, students write $4n$ for $n$ squares, failing to realise that sharing sides means subsequent squares only require 3 additional matchsticks, making the correct expression $3n + 1$.
## ON_FAILURE
If a student writes $4n$ for connected squares, do not just tell them the formula is $3n + 1$. Instead, have them physically draw 2 squares connected side by side and count the matchsticks together: ask, 'How many matchsticks are in the first square? (4). If we add a second square sharing one side, how many *new* matchsticks do we actually lay down? (3).' Write $4 + 3 = 7$ for two squares. Then test $4n$: $4 \times 2 = 8$, which is too high. Explain that the shared side means we subtract 1 from every shape after the first, or count the base matchstick plus 3 per square, leading to $3n + 1$.
## PREREQUISITE_NODE_IDS
c7_math_ch04_001, c6_math_ch05_060
## PREREQUISITE_REASONS
c7_math_ch04_001: requires understanding variables as letter-numbers to represent unknown quantities in expressions.
c6_math_ch05_060: builds upon number and geometric patterns from Class 6 to transition into algebraic generalisation.
## FORWARD_NODE_IDS
c7_math_ch04_008, c7_math_ch04_010, c8_math_ch11_4, c8_math_ch11_5, c8_math_ch11_6, c8_math_ch13_3, c8_math_ch2_1, c8_math_ch2_2, c8_math_ch5_1
## FORWARD_REASONS
c7_math_ch04_008: uses pick patterns and visual relationships to further develop generalisation skills.
c7_math_ch04_010: applies algebraic expressions derived from patterns to describe geometric properties like perimeter and area.
c8_math_ch11_4: Matchstick patterns teach generalising a pattern into an algebraic expression, directly applicable to deriving \(8^n\).
c8_math_ch11_5: Generalising matchstick patterns to algebraic expressions prepares students for Pₙ = 3s(4/3)ⁿ.
c8_math_ch11_6: Matchstick patterns and generalising with variables teaches the algebraic thinking to express patterns as formulas with n.
c8_math_ch13_3: Matchstick patterns taught generalising with variables — essential for writing pyramid apex as algebraic expression.
c8_math_ch2_1: Generalising matchstick patterns with variables prepares students to express the folding pattern as a rule.
c8_math_ch2_2: Matchstick patterns taught generalising linear patterns with variables — needed to express linear growth algebraically.
c8_math_ch5_1: Matchstick patterns taught generalising with variables, needed to express consecutive numbers as n, n+1, n+2.

## CROSS_SUBJECT_PREREQS
c6_math_ch12_122
## CROSS_SUBJECT_REASONS
c6_math_ch12_122: geometric patterns provide the visual and spatial foundation needed to analyze how shapes grow and repeat.
## CHAIN_DESCRIPTION
c6_math_ch12_122 -> c7_math_ch04_005 -> c7_math_ch04_010
## THIS_FORMULA
an + b
## FORMULA_VARIABLES
a = number of matchsticks added per new shape (common difference), n = number of shapes, b = adjustment constant based on the first shape
## FORMULA_UNITS
matchsticks (count)
## COMPUTATION_TYPE
algebraic
## CROSS_SUBJECT
c7_math_ch04_001 | variables are used to represent quantities in both algebraic expressions and word problems.
c7_math_ch04_010 | geometric formulas rely on the same variable-based expressions developed in matchstick patterns.
## PREREQ_CONCEPT
Recognising a constant rate of change in a sequence of shapes and representing it with an algebraic expression.
## PREREQ_BEFORE
Students must be able to count elements in geometric shapes, find differences between consecutive terms, and write basic algebraic expressions using variables.
## PREREQ_STUCK
Review c7_math_ch04_001 to understand how variables represent quantities, and practice finding the difference between numbers in a growing sequence.
## WORKED_EXAMPLE_1
PROBLEM: Amit is making a pattern of letter 'F' using matchsticks. One letter 'F' requires 4 matchsticks. Two connected 'F' letters require 7 matchsticks. Three connected 'F' letters require 10 matchsticks. Find an algebraic expression for the number of matchsticks required to make $n$ connected 'F' letters.
STEPS:
- Step 1: Identify the number of matchsticks for the first few shapes: for $n=1$, matchsticks = 4; for $n=2$, matchsticks = 7; for $n=3$, matchsticks = 10.
- Step 2: Calculate the difference between consecutive terms: $7 - 4 = 3$ and $10 - 7 = 3$. The common difference is 3.
- Step 3: Use the common difference as the coefficient of $n$, giving $3n$, and test it with $n = 1$: $3(1) = 3$.
- Step 4: Compare the test result (3) with the actual first term (4). The difference is $4 - 3 = 1$, so we must add 1 to the expression.
- Step 5: Write the final algebraic expression: $3n + 1$, and verify for $n = 3$: $3(3) + 1 = 9 + 1 = 10$, which matches.
REASONING: The common difference tells us how many matchsticks are added with each new letter 'F'. The adjustment constant ensures the formula works correctly for the very first shape in the sequence.
ANSWER: 3n + 1 matchsticks
## WORKED_EXAMPLE_2
PROBLEM: A decorative border is made using matchsticks arranged in connected pentagons. One pentagon requires 5 matchsticks. Two connected pentagons require 9 matchsticks. Three connected pentagons require 13 matchsticks. If Riya builds $n$ connected pentagons, how many matchsticks does she need, and how many matchsticks are needed for 25 pentagons?
STEPS:
- Step 1: List the given values: 1 pentagon = 5 matchsticks, 2 pentagons = 9 matchsticks, 3 pentagons = 13 matchsticks.
- Step 2: Find the growth rate (common difference) between terms: $9 - 5 = 4$ and $13 - 9 = 4$.
- Step 3: Form the algebraic expression using the growth rate 4: $4n$, then test $n = 1$: $4(1) = 4$. Since we need 5, add 1, giving the expression $4n + 1$.
- Step 4: Substitute $n = 25$ into the expression to find the total matchsticks for 25 pentagons: $4(25) + 1$.
- Step 5: Compute the final value: $100 + 1 = 101$ matchsticks with proper units.
REASONING: Identifying the linear growth rate gives the coefficient of the variable, and checking the first term provides the constant offset. Substituting $n = 25$ evaluates the general expression for a specific practical case.
ANSWER: Expression: 4n + 1; Total for 25 pentagons: 101 matchsticks
## WORKED_EXAMPLE_3
PROBLEM: A designer creates a pattern using matchsticks where a single hexagon takes 6 matchsticks, two connected hexagons take 11 matchsticks, and three connected hexagons take 16 matchsticks. The designer has a budget of 200 rupees and matchsticks cost 2 rupees each. What is the maximum number of connected hexagons ($n$) the designer can build using this pattern within the budget?
STEPS:
- Step 1: Determine the matchstick pattern by finding the difference between terms: $11 - 6 = 5$ and $16 - 11 = 5$, giving the expression $5n + 1$ (since $5(1) + 1 = 6$).
- Step 2: Calculate the maximum number of matchsticks affordable with 200 rupees at 2 rupees per matchstick: $\text{Total matchsticks} = 200 \div 2 = 100$ matchsticks.
- Step 3: Set up the inequality or equation relating matchsticks to $n$: $5n + 1 \le 100$.
- Step 4: Solve the inequality: subtract 1 from both sides: $5n \le 99$, then divide by 5: $n \le 99 \div 5 = 19.8$.
- Step 5: Since the number of shapes $n$ must be a whole number, round down to the nearest whole integer: $n = 19$ connected hexagons.
REASONING: We first generalise the visual pattern into an algebraic expression, calculate the total available resources from the financial budget, and then solve an inequality to find the maximum discrete number of shapes possible.
ANSWER: 19 connected hexagons
## COMPETENCY_QUESTION_1
QUESTION: Two students are analyzing a matchstick pattern of connected squares. Student A writes the expression $4n$ for $n$ squares. Student B writes the expression $3n + 1$. 
1. Explain why Student A's formula is incorrect for 3 connected squares.
2. Verify which student's formula is correct by calculating the matchstick count for 5 connected squares using physical reasoning.
COMPETENCY: Translating real-world situations to mathematical expressions and error analysis
STEPS:
- Step 1: Understand that 1 square has 4 sides/matchsticks, 2 connected squares share 1 side (7 matchsticks), and 3 connected squares share 2 sides (10 matchsticks).
- Step 2: Test Student A's formula ($4n$) for $n = 3$: $4 \times 3 = 12$, but counting actual squares gives 10 matchsticks.
- Step 3: Test Student B's formula ($3n + 1$) for $n = 3$: $3(3) + 1 = 10$, which matches.
- Step 4: Calculate for $n = 5$ using Student B's formula: $3(5) + 1 = 16$ matchsticks, and interpret the physical meaning (1 base square plus 4 attached squares requiring 3 matchsticks each: $1 + 4(3) = 13$? Wait, 1 square = 4, each extra = 3. For 5 squares: $4 + 4(3) = 16$).
ANSWER: 1. Student A's formula is incorrect because it assumes every square is built independently with 4 matchsticks, ignoring shared sides. For 3 squares, Student A gives 12, but actual count is 10. 2. Student B's formula ($3n + 1$) is correct. For 5 squares, $3(5) + 1 = 16$ matchsticks.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: A pattern of steps is made with matchsticks. Step 1 requires 3 matchsticks. Step 2 requires 7 matchsticks. Step 3 requires 11 matchsticks. 
1. Find the algebraic expression for the number of matchsticks in Step $n$.
2. If a builder has exactly 60 matchsticks, what is the highest step number ($n$) they can completely construct without breaking or falling short of matchsticks? Show all algebraic steps.
COMPETENCY: Generalising patterns and solving linear constraints in real-world contexts
STEPS:
- Step 1: Identify the values: Step 1 = 3, Step 2 = 7, Step 3 = 11.
- Step 2: Find the common difference: $7 - 3 = 4$ and $11 - 7 = 4$, so the coefficient is 4, giving $4n$.
- Step 3: Test $n = 1$: $4(1) = 4$, but we need 3, so subtract 1. The expression is $4n - 1$. Verify for $n = 3$: $4(3) - 1 = 12 - 1 = 11$ (correct).
- Step 4: Set up the inequality for 60 matchsticks: $4n - 1 \le 60$.
- Step 5: Solve for $n$: add 1 to both sides ($4n \le 61$), then divide by 4 ($n \le 15.25$).
- Step 6: Interpret the result for whole steps: the maximum complete step number is 15.
ANSWER: 1. Expression: $4n - 1$. 2. The maximum complete step number is 15 (since $4(15) - 1 = 59$ matchsticks are used, and 16 steps would require 63 matchsticks, which exceeds 60).
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you are sitting in your school art class and designing a border using ______ to make connected squares.

## DIAGNOSTIC_ANSWER_7
matchsticks

**A wrong answer (writing 'straws') reveals the student swapped the craft material - the art-class border is designed with matchsticks, whose shared sides create the pattern's constant step.**

Matchsticks share sides; straws would tell a different story.

