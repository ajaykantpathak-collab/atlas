## ELI5
One triangle of matchsticks takes 3 sticks; two joined triangles take 5; three take 7. Every new triangle adds just 2 sticks because neighbours share a side - that constant add is the pattern's signature. Count a few terms, spot the fixed jump, and the algebra writes itself: 2 sticks per shape plus 1 to start. Counting becomes a formula you can evaluate for any row length the teacher demands.

## DEFINITION
Matchstick patterns and generalisation involve observing visual geometric arrangements made of matchsticks, counting the items in each step to discover a numerical pattern, and expressing that relationship using an algebraic expression with a variable. This bridges arithmetic counting with algebraic equations by finding a rule that works for any term number $n$.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
Can observe a visual sequence of matchstick shapes, tabulate the data for the first few terms, find the constant difference and fixed starting offset, write an algebraic expression in terms of a variable $n$ for the total matchsticks, and use that expression to calculate matchsticks for any large term number.
## SCOPE_BOUNDARY
Covers linear matchstick growth patterns leading to linear algebraic expressions of the form $an + b$ and simple linear equations. Does not cover quadratic or exponential growth patterns.
## WALKTHROUGH
Imagine you are decorating a classroom bulletin board with triangular banners made of matchsticks, where each triangle shares a side with the next one. If you make 1 triangle, you need 3 matchsticks; if you make 2 triangles in a row, you need 5 matchsticks; for 3 triangles, you need 7 matchsticks. How many matchsticks would you need if your teacher asks you to make 50 triangles in a row? Counting them one by one would take forever! Instead, we can look back at how we formed algebraic expressions in Class 6 by building tables to see how the number of matchsticks grows with each added shape. We find a repeating core chunk and a fixed starting or ending piece, translating it into a variable rule like $2n + 1$.

**Takeaway:** a matchstick pattern is a constant jump: the same sticks added per new shape, plus a fixed starting offset. **In the exam:** tabulate the first three terms, read the common difference, then test your formula at the next term before trusting it. **Check yourself:** the triangle row shows it: 3, 5, 7 - two fresh sticks per shape once the shared side is counted only once. **Why students miss it:** students multiply the first term by n and forget the shared sides - the coefficient counts only the new sticks each shape brings. Tabulating three terms exposes both the jump and the offset, and testing at one more term catches a wrong rule before the exam does it for you.

## DIAGNOSTIC_QUESTION_1
If making 1 square requires 4 matchsticks, 2 connected squares require 7 matchsticks, and 3 connected squares require 10 matchsticks, what is the exact algebraic expression for the number of matchsticks needed to make $n$ connected squares in a row?
## DIAGNOSTIC_ANSWER_1
The correct expression is $3n + 1$. Each new square added after the first one requires 3 additional matchsticks, and the very first square starts with 4 (or $3(1) + 1$). A student who answers $4n$ has incorrectly assumed every single square independently takes 4 matchsticks without accounting for the shared side between adjacent squares.
## DIAGNOSTIC_QUESTION_2
Rahul writes the expression $5n - 2$ for a matchstick pattern where 1 shape takes 3 matchsticks, 2 shapes take 8 matchsticks, and 3 shapes take 13 matchsticks. Is Rahul's expression correct? Explain why or why not.
## DIAGNOSTIC_ANSWER_2
Rahul's expression is incorrect. While the common difference between terms is 5 (8 - 3 = 5, and 13 - 8 = 5), testing $n = 1$ gives $5(1) - 2 = 3$, but testing $n = 2$ gives $5(2) - 2 = 8$, which matches, but let's check the first term rule properly: for $n=1$, $5(1)$ is 5, but we need 3, so it should be $5n - 2$. Wait, $5(1) - 2 = 3$, $5(2) - 2 = 8$, $5(3) - 2 = 13$. Actually, Rahul's expression is correct! A student who says it's wrong often confuses the constant offset sign (+ or -) or confuses the coefficient with the first term value.
## DIAGNOSTIC_QUESTION_3
A row of regular hexagons made of matchsticks follows the rule $6 + 5(n - 1)$, which simplifies to $5n + 1$. Calculate the exact number of matchsticks required to build a continuous chain of 25 hexagons.
## DIAGNOSTIC_ANSWER_3
To find the total matchsticks for 25 hexagons, substitute $n = 25$ into the simplified expression $5n + 1$. First, multiply 5 by 25 to get 125. Next, add 1 to 125, resulting in 126 matchsticks. A student who gets 150 likely multiplied 6 by 25, forgetting that adjacent hexagons share a side and do not use 6 independent matchsticks each.
## DIAGNOSTIC_QUESTION_4
Compare the patterns for triangles (rule: $2n + 1$) and squares (rule: $3n + 1$). Why does the coefficient of $n$ increase from 2 to 3 when moving from a 3-sided polygon to a 4-sided polygon?
## DIAGNOSTIC_ANSWER_4
The coefficient of $n$ represents the number of new matchsticks needed to append each subsequent shape to the chain. A triangle requires 2 new matchsticks to attach to the previous one (sharing 1 side), whereas a square requires 3 new matchsticks to attach to the previous one (sharing 1 side). A student who thinks the coefficient represents the total sides of a single isolated shape fails to understand how shapes share matchsticks in a continuous chain.
## DIAGNOSTIC_QUESTION_5
Priya evaluated the matchstick pattern rule $4n + 2$ for $n = 10$ and claimed it requires 48 matchsticks. Evaluate her calculation, identify any errors in working, and provide the correct calculation.
## DIAGNOSTIC_ANSWER_5
Priya's calculation is incorrect because she likely added 2 to 4 first to get 6, and then multiplied by 10 to get 60, or made an arithmetic error. Following proper order of operations (BODMAS), multiplication must be performed before addition: $4 \times 10 = 40$, and then $40 + 2 = 42$ matchsticks. A student who agrees with 48 has violated the order of operations by adding before multiplying.
## DIAGNOSTIC_QUESTION_6
Create your own matchstick pattern rule for a sequence of connected letter 'H' shapes where 1 'H' uses 7 matchsticks, 2 connected 'H's use 12 matchsticks, and 3 connected 'H's use 17 matchsticks. Write the algebraic expression for $n$ shapes.
## DIAGNOSTIC_ANSWER_6
The expected expression is $5n + 2$. Verification: for $n = 1$, $5(1) + 2 = 7$; for $n = 2$, $5(2) + 2 = 12$; for $n = 3$, $5(3) + 2 = 17$. A poor answer would be $7n$ or an expression where the coefficient does not match the common difference of 5 between consecutive terms.
## COMMON_MISCONCEPTION
Students frequently multiply the number of matchsticks in a single isolated geometric shape by the number of terms $n$ (writing $4n$ for squares instead of $3n + 1$), completely ignoring the fact that adjacent shapes share common matchsticks in a chain.
## ON_FAILURE
Ask the student to physically draw 2 connected squares side-by-side and count the exact matchsticks line by line. Show them that while an isolated square has 4 sticks, joining a second square only adds 3 new sticks because one stick is already part of the first square. Guide them to write the expression as: (sticks per new shape $\times n$) + (starting adjustment).
## PREREQUISITE_NODE_IDS
c6_math_ch05_052, c6_math_ch05_054, c6_math_ch12_122
## PREREQUISITE_REASONS
c6_math_ch05_052: Requires understanding variables and constants to represent unknown quantities with letters.
c6_math_ch05_054: Requires forming algebraic expressions from verbal descriptions or number patterns.
c6_math_ch12_122: Requires identifying geometric patterns and visual sequences from Class 6.
## FORWARD_NODE_IDS
c7_math_ch15_007, c7_math_ch15_010
## FORWARD_REASONS
c7_math_ch15_007: Translating matchstick generalisations into equations prepares students for setting up general equations from complex word problems.
c7_math_ch15_010: Applying equation models to real-life situations builds directly on generalising patterns into algebraic rules.
## CROSS_SUBJECT_PREREQS
c7_math_ch15_001
## CROSS_SUBJECT_REASONS
c7_math_ch15_001: Provides the foundation of equality and expressions needed to equate general patterns to total matchstick counts.
## CHAIN_DESCRIPTION
c6_math_ch12_122 -> c7_math_ch15_009 -> c7_math_ch15_007
## THIS_FORMULA
Total Matchsticks = $an + b$
## FORMULA_VARIABLES
$a$ = number of matchsticks added per new shape, $n$ = number of shapes in the pattern, $b$ = fixed adjustment or remaining matchsticks for the first shape.
## FORMULA_UNITS
matchsticks (count)
## COMPUTATION_TYPE
algebraic
## CROSS_SUBJECT
c7_math_ch15_001 | Connects algebraic expressions of patterns to statements of equality.
c6_math_ch05_054 | Uses prior foundational knowledge of forming algebraic expressions.
## PREREQ_CONCEPT
Identifying common differences in numerical sequences and representing them with algebraic variables.
## PREREQ_BEFORE
Students must be able to list terms of a visual sequence and find the constant increment between consecutive terms.
## PREREQ_STUCK
Review c6_math_ch12_122 to practice finding differences in geometric number sequences before attempting algebraic generalisation.
## WORKED_EXAMPLE_1
PROBLEM: A row of interlocking pentagons is built with matchsticks. 1 pentagon uses 5 matchsticks, 2 connected pentagons use 9 matchsticks, and 3 connected pentagons use 13 matchsticks. Find the algebraic expression for $n$ pentagons, and calculate how many matchsticks are needed for a row of 18 pentagons.
STEPS:
- Step 1: Identify the given values and tabulate the terms. Term 1 ($n=1$) = 5, Term 2 ($n=2$) = 9, Term 3 ($n=3$) = 13.
- Step 2: Find the common difference between consecutive terms: $9 - 5 = 4$ and $13 - 9 = 4$. This gives the coefficient $a = 4$.
- Step 3: Test the term rule $4n + b$ using $n = 1$: $4(1) + b = 5$, which means $4 + b = 5$, so $b = 1$. The general expression is $4n + 1$.
- Step 4: Substitute $n = 18$ into the expression to find the total matchsticks: $4(18) + 1$.
- Step 5: Compute the final value: $4 \times 18 = 72$, then $72 + 1 = 73$ matchsticks.
REASONING: The common difference of 4 tells us how many matchsticks are added with each new pentagon. The adjustment $+1$ accounts for the extra closing matchstick of the first pentagon. Substituting $n=18$ evaluates our general rule for a specific large quantity.
ANSWER: Expression: $4n + 1$; Total matchsticks for 18 pentagons = 73 matchsticks.
## WORKED_EXAMPLE_2
PROBLEM: In a pattern of fish shapes made from matchsticks, 1 fish requires 8 matchsticks, 2 connected fish require 14 matchsticks, and 3 connected fish require 20 matchsticks. If a student uses 92 matchsticks to make a chain of these fish, how many fish ($n$) are in the chain?
STEPS:
- Step 1: List the given values: Term 1 = 8, Term 2 = 14, Term 3 = 20.
- Step 2: Determine the common difference: $14 - 8 = 6$ and $20 - 14 = 6$. The coefficient is 6.
- Step 3: Find the constant offset $b$: for $n = 1$, $6(1) + b = 8$, so $6 + b = 8 \implies b = 2$. The general rule is $6n + 2$.
- Step 4: Set up the linear equation with the total matchsticks given: $6n + 2 = 92$.
- Step 5: Solve for $n$ using inverse operations: subtract 2 from both sides ($6n = 90$), then divide by 6 ($n = 90 / 6 = 15$).
REASONING: By setting our general expression equal to the total number of matchsticks, we create a linear equation. Solving this equation backwards using inverse operations reveals the exact number of shapes created.
ANSWER: $n = 15$ fish.
## WORKED_EXAMPLE_3
PROBLEM: Two different matchstick pattern designs are created. Design A (triangles) follows the rule $2n + 1$, and Design B (squares) follows the rule $3n + 1$. Find the exact number of shapes for each design such that both designs consume the exact same number of matchsticks, given that $n$ must be greater than 0. Wait, let's set up an equation where Design A for $n$ triangles equals Design B for $k$ squares, but let's compare when they use the same number of shapes $n$. If $n$ shapes are made in both, find when $2n + 1 = 3n + 1$.
STEPS:
- Step 1: Write down the expressions for both designs with the same number of shapes $n$: Design A = $2n + 1$, Design B = $3n + 1$.
- Step 2: Set up the equation representing equal matchstick consumption: $2n + 1 = 3n + 1$.
- Step 3: Subtract $2n$ from both sides to gather variables on one side: $1 = n + 1$.
- Step 4: Subtract 1 from both sides to solve for $n$: $n = 0$.
- Step 5: Interpret the result mathematically and contextually: $n = 0$ means that only at 0 shapes do they use the same number of matchsticks (1 matchstick, which is impossible for physical shapes). This proves that for any positive number of shapes ($n \ge 1$), squares will always use strictly more matchsticks than triangles.
REASONING: Equating two algebraic pattern rules creates a linear equation. Solving it yields the critical intersection point where both patterns intersect, demonstrating how algebra analyzes geometric growth rates.
ANSWER: They only equal at $n = 0$ (no physical shapes); for any $n \ge 1$, squares use more matchsticks.
## COMPETENCY_QUESTION_1
QUESTION: A school craft club is making a decorative border using matchsticks arranged in regular hexagons. The rule for the total matchsticks is $5n + 1$. Club president Aarav claims that if they have 101 matchsticks, they can make exactly 20 hexagons with 1 matchstick left over. Is Aarav's claim correct? Show your reasoning by setting up an equation and solving it.
COMPETENCY: Translating real-world situations to mathematical expressions and verifying solutions
STEPS:
- Step 1: Understand the problem and identify the given rule ($5n + 1$) and total matchsticks available (101).
- Step 2: Set up the equation equating the rule to the available matchsticks minus the leftover stick: $5n + 1 = 101$, or test $n = 20$.
- Step 3: Substitute $n = 20$ into the expression: $5(20) + 1 = 100 + 1 = 101$.
- Step 4: Verify the remainder: since 101 matchsticks were available and exactly 101 matchsticks were used to make 20 hexagons, there is 0 matchstick left over, contradicting Aarav's claim of 1 leftover stick.
ANSWER: Aarav's calculation of 20 hexagons is correct ($5 \times 20 + 1 = 101$), but his claim of 1 leftover matchstick is false because all 101 matchsticks are used up completely with 0 remainder.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: Two students, Meera and Kabir, are designing matchstick patterns. Meera's pattern rule is $4n + 3$ and Kabir's pattern rule is $7n - 2$. For what exact term number $n$ will both Meera's pattern and Kabir's pattern require the exact same number of matchsticks? Show all algebraic steps.
COMPETENCY: Comparing and solving simultaneous linear expressions with reasoning
STEPS:
- Step 1: Equate Meera's expression to Kabir's expression: $4n + 3 = 7n - 2$.
- Step 2: Transpose terms to bring all variable terms to one side by subtracting $4n$ from both sides: $3 = 7n - 4n - 2 \implies 3 = 3n - 2$.
- Step 3: Add 2 to both sides of the equation to isolate the term with $n$: $3 + 2 = 3n \implies 5 = 3n$.
- Step 4: Divide both sides by 3 to solve for $n$: $n = \frac{5}{3}$ or $1\frac{2}{3}$.
- Step 5: Interpret the result: Since $n$ represents a discrete term number (count of shapes), which must be a whole number (natural number), there is no whole-number term where both patterns use the exact same number of matchsticks.
ANSWER: Both patterns yield the same matchstick count at $n = \frac{5}{3}$, which means no whole-number term exists where their matchstick counts are equal.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Matchstick patterns and ______ involve observing visual geometric arrangements made of matchsticks, counting the items in each step to discover a numerical pattern, and expressing that relationship using an algebraic expression with a variable.

## DIAGNOSTIC_ANSWER_7
generalisation

**A wrong answer (writing 'geometry') reveals the student widened the topic - the definition pairs matchstick patterns with generalisation: counting the items at each step, then expressing the discovered relationship as an algebraic expression with a variable. The sticks are the evidence; the generalisation is the rule they force into symbols.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are decorating a classroom bulletin board with triangular banners made of ______, where each triangle shares a side with the next one.

## DIAGNOSTIC_ANSWER_8
matchsticks

**A wrong answer (writing 'triangles') reveals the student swapped the material - the bulletin board carries triangular banners made of matchsticks, each triangle sharing a side with the next. The banners are the shape; the matchsticks are what actually get counted, term by term, until the constant jump steps forward.**

## DIAGNOSTIC_QUESTION_9
Fill in the blank: How many matchsticks would you need if your teacher asks you to make ______ triangles in a row?

## DIAGNOSTIC_ANSWER_9
50

**A wrong answer (writing '101') reveals the student multiplied instead of generalising - the walkthrough asks the teacher's question about 50 triangles in a row, and the rule, not a pile of loose sticks, must answer. Build the expression from the counted terms, then substitute the row length; guessing a number skips the very generalisation the lesson exists to teach.**

