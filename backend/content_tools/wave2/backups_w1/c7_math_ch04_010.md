## ELI5
Tiling the assembly hall floor with L-shapes, you notice each new step repeats the same arms - and that repeating skeleton is what algebra captures. Name the step with n, separate what stays fixed from what grows, and write the rule: a row of squares grows four sides per newcomer plus its loose ends; a train of pentagons grows three exposed sides each plus the two end caps. Test the rule on step one and step two, then trust it for step fifty. Geometry grows; algebra keeps the ledger.

## DEFINITION
An algebraic expression describing a geometric pattern uses variables (like $n$) to represent the general rule for finding geometric quantities—such as perimeter, area, or total number of shapes—for any step number in a sequence. It translates visual growth into a concise mathematical formula that applies universally to any term $n$.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
Can observe a visual geometric pattern, identify the fixed and changing components, write an algebraic expression for the $n$-th term of the pattern, and use that expression to calculate values for large step numbers without drawing them.
## SCOPE_BOUNDARY
Covers linear and simple quadratic geometric growth patterns involving perimeter, area, and shape counts using single variables. Does NOT cover advanced calculus, sequences and series formulas beyond linear/simple quadratic expressions, or formal proof by mathematical induction.
## WALKTHROUGH
Imagine you are arranging square tiles on the floor of your school assembly hall to form a growing sequence of L-shapes, where each new step adds the same number of tiles along the arms. How can you figure out how many tiles you need for the 50th step without drawing all 50 shapes? You start by drawing the first three steps (Step 1, Step 2, Step 3) and counting the exact number of geometric units or elements in each. Next, you look at how the pattern changes from one step to the next to separate the fixed starting amount from the part that multiplies with each step number $n$. Connecting this to our prior work with algebraic expressions and variables, we let $n$ represent the step number. Finally, you write down an expression like $3n + 2$ and check it by substituting $n = 1, 2, 3$ to ensure it matches your initial drawings.

**Takeaway:** a geometric pattern generalises by separating the fixed part from the growing part and writing the rule with n. **In the exam:** for 'find the fiftieth step' questions, build the expression, test it on the first two steps, then substitute. **Check yourself:** draw the first two L-shapes, count the tiles, and confirm your expression matches both. **Why students miss it:** they spot the growth but forget the fixed ends, so the rule fails at step one.

## DIAGNOSTIC_QUESTION_1
In a dot pattern forming a growing square grid, the number of dots for step $n$ is given by the expression $n^2 + 2n$. What does the variable $n$ represent in this geometric context?
## DIAGNOSTIC_ANSWER_1
The variable $n$ represents the step number or the figure number in the sequence of geometric patterns. A wrong answer—such as thinking $n$ is the total number of dots or the perimeter—reveals that the student confuses the input variable (which position we are looking at) with the output value (the total count resulting from that position).
## DIAGNOSTIC_QUESTION_2
A student writes the expression $4n$ for the perimeter of a growing sequence of squares where each step adds a square to a straight line. If Step 1 has a perimeter of 6 units, Step 2 has 10 units, and Step 3 has 14 units, why is the student's expression $4n$ incorrect, and what is the correct expression?
## DIAGNOSTIC_ANSWER_2
The expression $4n$ is incorrect because substituting $n=1$ gives $4(1) = 4$, whereas the actual perimeter is 6. The correct expression is $4n + 2$ because the perimeter increases by 4 units with each new square ($4n$), but starts with a base offset of 2 extra units. A wrong answer indicates the student assumes every geometric pattern must start at zero or fail to account for the constant fixed offset.
## DIAGNOSTIC_QUESTION_3
A triangular dot pattern has 3 dots in Step 1, 6 dots in Step 2, and 10 dots in Step 3. The rule for the number of dots is given by the algebraic expression $\frac{n(n + 1)}{2}$. Calculate the exact number of dots in Step 15.
## DIAGNOSTIC_ANSWER_3
To find the number of dots in Step 15, substitute $n = 15$ into the expression $\frac{n(n + 1)}{2}$. Step 1: Identify that $n = 15$. Step 2: Substitute $15$ into $(n + 1)$ to get $15 + 1 = 16$. Step 3: Multiply $15$ by $16$ to get $240$. Step 4: Divide $240$ by $2$ to get $120$. Answer: 120 dots. A wrong answer usually stems from calculation errors during multiplication or division, or failing to evaluate the numerator completely before dividing by 2.
## DIAGNOSTIC_QUESTION_4
Compare the two algebraic expressions $3n + 1$ and $4n - 1$ representing two different matchstick polygon patterns. For which step number $n$ will both patterns use the exact same number of matchsticks?
## DIAGNOSTIC_ANSWER_4
To find when both patterns use the same number of matchsticks, set the two expressions equal to each other: $3n + 1 = 4n - 1$. Subtract $3n$ from both sides to get $1 = n - 1$, then add 1 to both sides to get $n = 2$. At Step 2, both expressions evaluate to $3(2) + 1 = 7$ and $4(2) - 1 = 7$ matchsticks. A wrong answer shows a struggle with solving linear equations derived from comparing geometric growth rates.
## DIAGNOSTIC_QUESTION_5
Rahul claims that for a geometric pattern of growing rectangles where the area is given by $n(n + 3)$, the area of Step 4 is $4 + 3 = 7$ square units. Evaluate Rahul's claim and identify his error.
## DIAGNOSTIC_ANSWER_5
Rahul's claim is incorrect. He made the error of treating the algebraic expression as $n + 3$ instead of evaluating the multiplication $n \times (n + 3)$ when $n = 4$. The correct evaluation for Step 4 is $4 \times (4 + 3) = 4 \times 7 = 28$ square units. A wrong answer reveals a fundamental misunderstanding of implicit multiplication and substitution in algebraic expressions involving parentheses.
## DIAGNOSTIC_QUESTION_6
Design an algebraic expression for the total perimeter of a train of $n$ identical regular pentagons placed side by side in a straight line, where each shared side reduces the outer perimeter. Explain how you constructed your expression.
## DIAGNOSTIC_ANSWER_6
The expected expression is $3n + 2$. Explanation: A single regular pentagon has 5 sides. When $n$ pentagons are joined in a line, $(n - 1)$ sides are shared (counted twice in isolation). Thus, the perimeter is $5n - 2(n - 1) = 5n - 2n + 2 = 3n + 2$. A poor answer merely guesses a linear formula like $5n$ without accounting for the overlapping sides between adjacent pentagons.
## COMMON_MISCONCEPTION
Students often look at the common difference in a geometric pattern (e.g., adding 3 matchsticks each step) and write down only $3n$, completely ignoring the starting fixed number of elements present in Step 1. For example, if Step 1 has 5 matchsticks and increases by 3 each step, students write $3n$ instead of $3n + 2$, failing to test their expression with $n = 1$.
## ON_FAILURE
Remind the student to always test their algebraic expression with $n = 1$. Say: "If your rule is $3n$, what does it give for $n = 1$? It gives 3. But your drawing for Step 1 has 5 items! Where are the missing 2 items? We must add $+ 2$ to our rule so that when $n = 1$, the result equals 5." Guide them to check their expression against the physical drawing for every step.
## PREREQUISITE_NODE_IDS
c7_math_ch04_004, c7_math_ch04_005, c6_math_ch07_075, c6_math_ch08_085
## PREREQUISITE_REASONS
c7_math_ch04_004: requires the ability to write algebraic expressions from word problems and relationships.
c7_math_ch04_005: builds directly on matchstick pattern generalisation using variables.
c6_math_ch07_075: requires familiarity with geometric polygons and their properties.
c6_math_ch08_085: requires understanding of perimeter as the total distance around geometric figures.
## FORWARD_NODE_IDS
c7_math_ch04_006, c7_math_ch04_009, c8_math_ch11_5
## FORWARD_REASONS
c7_math_ch04_006: uses simplification of algebraic expressions when combining geometric formulas.
c7_math_ch04_009: requires substituting values into algebraic expressions derived from geometric patterns.
c8_math_ch11_5: Using algebraic expressions for geometric patterns directly applies to deriving the perimeter formula.

## CROSS_SUBJECT_PREREQS
c6_math_ch12_122, c6_math_ch05_060
## CROSS_SUBJECT_REASONS
c6_math_ch12_122: provides the foundational visual geometric pattern recognition from Class 6.
c6_math_ch05_060: establishes the link between visual patterns and algebraic generalization.
## CHAIN_DESCRIPTION
c7_math_ch04_005 -> c7_math_ch04_010 -> c7_math_ch04_009
## THIS_FORMULA
P = an + b
## FORMULA_VARIABLES
P = total geometric quantity (perimeter, count, area), a = rate of change per step, n = step number, b = fixed initial offset value.
## FORMULA_UNITS
cm, cm^2, or dimensionless count units depending on the geometric property.
## COMPUTATION_TYPE
algebraic
## CROSS_SUBJECT
c7_math_ch04_005 | Uses matchstick patterns and generalising with variables to build geometric formulas.
c6_math_ch12_122 | Extends visual geometric patterns into formal algebraic descriptions.
## PREREQ_CONCEPT
Generalising arithmetic sequences derived from visual geometric shapes into algebraic expressions with a variable $n$.
## PREREQ_BEFORE
Must be able to count geometric elements, identify constant differences, and substitute numbers into basic algebraic expressions.
## PREREQ_STUCK
Review c7_math_ch04_005 on matchstick patterns and c7_math_ch04_001 on variables to understand how letters represent changing quantities.
## WORKED_EXAMPLE_1
PROBLEM: Priya arranges square tiles in a growing row for a school art project. Step 1 uses 6 tiles, Step 2 uses 10 tiles, and Step 3 uses 14 tiles. Write an algebraic expression for the number of tiles in Step $n$, and calculate how many tiles Priya needs for Step 25.
STEPS:
- step 1: List the given tile counts for each step: Step 1 = 6, Step 2 = 10, Step 3 = 14.
- step 2: Find the common difference between consecutive steps: $10 - 6 = 4$ and $14 - 10 = 4$. Since the difference is constant (+4), the coefficient of $n$ is 4.
- step 3: Determine the constant offset $b$ by testing $4n + b$ for Step 1 ($n=1$): $4(1) + b = 6 \implies 4 + b = 6 \implies b = 2$. Thus, the algebraic expression is $4n + 2$.
- step 4: Substitute $n = 25$ into the expression to find the tiles needed for Step 25: $4(25) + 2$.
- step 5: Compute the final value: $100 + 2 = 102$ tiles with appropriate units.
REASONING: By identifying the constant rate of growth (4 tiles per step), we establish the linear term $4n$. Finding the fixed adjustment (+2) ensures the expression holds true for the very first step, allowing us to evaluate any large step like $n=25$ without manual counting.
ANSWER: Expression: $4n + 2$; Step 25 requires 102 tiles.
## WORKED_EXAMPLE_2
PROBLEM: A builder arranges triangular pavement blocks in a border pattern. The perimeter of the border for Step 1 is 8 metres, Step 2 is 14 metres, and Step 3 is 20 metres. Write the algebraic expression for the perimeter at Step $n$ and find the perimeter for Step 50.
STEPS:
- step 1: Write down the perimeters given: Step 1 = 8 m, Step 2 = 14 m, Step 3 = 20 m.
- step 2: Calculate the difference between steps: $14 - 8 = 6$ and $20 - 14 = 6$. The growth rate is 6 metres per step, giving $6n$.
- step 3: Find the starting offset by evaluating $6(1) + b = 8$, which gives $6 + b = 8 \implies b = 2$. The algebraic expression is $6n + 2$.
- step 4: Substitute $n = 50$ into the expression: $6(50) + 2$.
- step 5: Compute the multiplication and addition: $300 + 2 = 302$ metres.
REASONING: The constant difference of 6 metres dictates the coefficient of $n$. Adjusting for the base perimeter at $n=1$ gives the complete linear expression, which scales reliably to find the perimeter at any large step $n$.
ANSWER: Expression: $6n + 2$; Perimeter for Step 50 is 302 metres.
## WORKED_EXAMPLE_3
PROBLEM: A school courtyard has rectangular flower beds arranged in a growing pattern. The area of the flower bed in square metres is given by the expression $n^2 + 3n$, where $n$ is the step number. If the school principal wants to build Step 10, calculate the total area and verify if an area of 108 square metres corresponds to a whole number step $n$.
STEPS:
- step 1: Identify the given algebraic expression for the area: $A = n^2 + 3n$.
- step 2: Calculate the area for Step 10 by substituting $n = 10$: $10^2 + 3(10) = 100 + 30 = 130$ square metres.
- step 3: To find if an area of 108 square metres corresponds to a whole number step, set up the equation: $n^2 + 3n = 108$, or $n^2 + 3n - 108 = 0$.
- step 4: Test integer values of $n$ by substitution. Try $n = 9$: $9^2 + 3(9) = 81 + 27 = 108$.
- step 5: Conclude that Step 9 yields an area of exactly 108 square metres.
REASONING: Quadratic geometric patterns require both forward evaluation (substitution) and reverse verification (solving equations by inspection or testing whole numbers) to connect geometric areas with step numbers.
ANSWER: Area for Step 10 is $130\text{ m}^2$; an area of $108\text{ m}^2$ corresponds to Step 9.
## COMPETENCY_QUESTION_1
QUESTION: Amit observes a pattern of equilateral triangles made of matchsticks. Step 1 has 3 matchsticks, Step 2 has 5 matchsticks, and Step 3 has 7 matchsticks. Amit writes the expression $3n$ for Step $n$. Is Amit correct? If not, correct his expression and explain why his mistake occurred in terms of geometric growth.
COMPETENCY: Error identification and algebraic correction in geometric patterns
STEPS:
- step 1: Test Amit's expression $3n$ with Step 1: $3(1) = 3$ matchsticks, which matches the drawing.
- step 2: Test Amit's expression with Step 2: $3(2) = 6$ matchsticks. However, the actual drawing for Step 2 has 5 matchsticks, proving Amit's expression is wrong.
- step 3: Find the actual common difference: $5 - 3 = 2$ and $7 - 5 = 2$. The correct growth rate is 2 matchsticks per step, making the term $2n$.
- step 4: Find the initial offset $b$: $2(1) + b = 3 \implies b = 1$. The correct expression is $2n + 1$.
- step 5: Explain Amit's error: Amit assumed the number of matchsticks multiplied by 3 because each figure is made of triangles, ignoring that subsequent triangles share sides.
ANSWER: Amit is incorrect. The correct expression is $2n + 1$. Amit wrongly assumed the multiplier was 3 based on the shape of a single triangle, ignoring shared sides in the sequence.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: A designer creates a decorative border using circular rings. Step 1 requires 5 rings, Step 2 requires 9 rings, and Step 3 requires 13 rings. 
(a) Write the algebraic expression for the number of rings in Step $n$. 
(b) If the designer has exactly 85 rings available, what is the maximum complete step number she can build? Show all algebraic steps.
COMPETENCY: Translating geometric patterns into algebraic expressions and solving for step limits
STEPS:
- step 1: Analyze ring counts: Step 1 = 5, Step 2 = 9, Step 3 = 13.
- step 2: Find the difference between terms: $9 - 5 = 4$ and $13 - 9 = 4$. The common difference is 4, giving $4n$.
- step 3: Determine the constant offset: $4(1) + b = 5 \implies b = 1$. The expression for Step $n$ is $4n + 1$.
- step 4: Set the expression equal to 85 to find the maximum step: $4n + 1 = 85$.
- step 5: Solve for $n$: subtract 1 to get $4n = 84$, then divide by 4 to get $n = 21$.
ANSWER: (a) Expression: $4n + 1$. (b) The designer can build up to Step 21 exactly using 85 rings.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you are arranging square tiles on the floor of your school assembly hall to form a growing ______ of L-shapes, where each new step adds the same number of tiles along the arms.

## DIAGNOSTIC_ANSWER_7
sequence

**A wrong answer (writing 'collection') reveals the student drifted from the walkthrough's phrase - the tiles form a growing sequence of L-shapes, and the blank names that sequence.**

Sequences, collections, patterns - the walkthrough wants the word for step-by-step growth.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are ______ square tiles on the floor of your school assembly hall to form a growing sequence of L-shapes, where each new step adds the same number of tiles along the arms.

## DIAGNOSTIC_ANSWER_8
arranging

**A wrong answer (writing 'stacking') reveals the student swapped the walkthrough's verb - you are arranging the square tiles on the assembly hall floor when the pattern's rule appears.**

Arranging, not stacking - the verb places each tile in its growing arm.

