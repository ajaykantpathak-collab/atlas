## DEFINITION
A pattern is a predictable, repeating, or evolving arrangement of numbers, shapes, or objects that follows a specific rule. In mathematics, we study these patterns to find the underlying logic that explains how they grow or repeat.
## COGNITIVE_LEVEL
analyze
## MASTERY_CRITERIA
The student must be able to identify the rule governing a sequence, calculate the next three terms, and represent the sequence pictorially. They must also be able to explain the relationship between a number sequence and its corresponding geometric shape.
## SCOPE_BOUNDARY
This node covers the identification and creation of number and shape sequences, including squares, triangles, and simple arithmetic relationships. It excludes advanced algebraic sequence formulas (like $n^{th}$ term derivation), chaos theory, and complex growth models.
## WALKTHROUGH
Have you ever noticed how the petals of a flower or the tiles on your kitchen floor follow a repeating design? To start understanding patterns, don't just look at the numbers; try drawing them as dots or shapes first. If you see a sequence like 1, 4, 9, 16, ask yourself: "How many dots do I add to make the next shape?" By turning numbers into pictures, you reveal the hidden "rule" that connects them. The key insight is that every mathematical pattern has a "reason" behind it, often hidden in the way it looks.
## DIAGNOSTIC_QUESTION_1
What is the next number in the sequence: 1, 3, 6, 10, 15, ...?
A) 18
B) 20
C) 21
D) 25
## DIAGNOSTIC_ANSWER_1
The correct answer is C) 21. A wrong answer suggests the student is either adding a constant number (like +2) instead of seeing the increasing difference (+2, +3, +4, +5, +6) or has simply guessed without checking the gap between terms.
## DIAGNOSTIC_QUESTION_2
Why are the numbers 1, 4, 9, 16, 25 called "Square Numbers"?
A) Because they are even numbers.
B) Because they can be arranged into a perfect square grid of dots.
C) Because you multiply them by 4 to get the next one.
D) Because they are all multiples of 2.
## DIAGNOSTIC_ANSWER_2
The correct answer is B. Choosing A, C, or D reveals a misunderstanding of the *geometric* origin of the name, showing the student is focusing on the numerical value only, rather than the spatial structure.
## DIAGNOSTIC_QUESTION_3
If you have a square grid of 16 dots, and you want to form the next square, how many *additional* dots do you need to add to the existing 16?
## DIAGNOSTIC_ANSWER_3
You need 9 dots. The current square is $4 \times 4$ (16 dots); the next square is $5 \times 5$ (25 dots). Subtracting the two ($25 - 16 = 9$) shows the growth. A wrong answer indicates the student is not visualizing the transition from one square size to the next.
## DIAGNOSTIC_QUESTION_4
If adding the first 3 odd numbers gives $1 + 3 + 5 = 9$ (which is $3^2$), what is the sum of the first 4 odd numbers?
## DIAGNOSTIC_ANSWER_4
The sum is 16 ($4^2$). A wrong answer shows the student has not yet generalized the pattern that the sum of the first $n$ odd numbers always equals $n \times n$.
## DIAGNOSTIC_QUESTION_5
Is it always true that if you add two consecutive triangular numbers, you get a square number? Give an example to support your answer.
## DIAGNOSTIC_ANSWER_5
Yes, it is true. For example, the 2nd and 3rd triangular numbers are 3 and 6. $3 + 6 = 9$, which is $3^2$. A wrong answer suggests the student has not tested the hypothesis across different parts of the sequence.
## DIAGNOSTIC_QUESTION_6
Create a new shape sequence using circles instead of dots and describe the rule for how it grows.
## DIAGNOSTIC_ANSWER_6
The student should provide a drawing (e.g., 1 circle, 3 circles in a triangle, 6 circles in a triangle) and a clear rule (e.g., "I add a new row at the bottom that is one circle larger than the previous row"). A poor answer fails to define a consistent "rule of growth."
## COMMON_MISCONCEPTION
Students often assume that the difference between numbers in a sequence must be constant (arithmetic progression). They might see 1, 3, 6, 10 and incorrectly assume the next number is 13, because they see the gaps are +2, +3, +4, and then assume the next gap is simply +3 again, failing to recognize that the gap itself is growing.
## ON_FAILURE
If a student fails, ask them to "draw" the sequence using dots on paper. Tell them: "Don't look at the numbers yet. Look at the shape. How many new dots did you add to the edges of the previous shape to make the new one?" This physical act of adding rows helps them see that the *gap* is actually a changing number, not a fixed one.
## BUILDS_ON
Basic counting and addition.
## LEADS_TO
Algebraic expressions and sequences and series.
## CHAIN_DESCRIPTION
Counting -> Patterns in Numbers/Shapes -> Algebraic Expressions.
## THIS_FORMULA
N/A - conceptual
## FORMULA_VARIABLES
N/A
## FORMULA_UNITS
N/A
## COMPUTATION_TYPE
geometric
## CROSS_SUBJECT

## PREREQ_CONCEPT
Arithmetic addition and basic multiplication.
## PREREQ_BEFORE
Must be able to identify basic shapes and count objects in a grid.
## PREREQ_STUCK
Review simple addition tables and basic shape identification.
## WORKED_EXAMPLE_1
PROBLEM: A gardener is planting marigold flowers in a triangular pattern. The first row has 1 flower, the second has 2, the third has 3, and so on. If the gardener completes 5 rows, how many flowers are planted in total?
STEPS:
- Row 1: 1 flower
- Row 2: 1 + 2 = 3 flowers
- Row 3: 3 + 3 = 6 flowers
- Row 4: 6 + 4 = 10 flowers
- Row 5: 10 + 5 = 15 flowers
REASONING: By adding the row number to the previous total (cumulative sum), we determine the triangular number. This method works because each new row increases the total by the current row index.
ANSWER: 15 flowers.
## WORKED_EXAMPLE_2
PROBLEM: A student has 1, 4, 9, 16 beads arranged in squares. How many beads are needed for the 6th square in this sequence?
STEPS:
- Square 1: $1 \times 1 = 1$
- Square 2: $2 \times 2 = 4$
- Square 3: $3 \times 3 = 9$
- Square 4: $4 \times 4 = 16$
- Square 5: $5 \times 5 = 25$
- Square 6: $6 \times 6 = 36$
REASONING: The sequence follows the rule of $n \times n$. To find the 6th term, we multiply the position number by itself.
ANSWER: 36 beads.
## WORKED_EXAMPLE_3
PROBLEM: A school hall has a pattern of floor tiles. The first set of tiles forms a $2 \times 2$ square, the second a $3 \times 3$ square, and the third a $4 \times 4$ square. If each tile costs 5 rupees, how much will the 5th square pattern cost to build?
STEPS:
- Pattern 1: $2 \times 2 = 4$ tiles
- Pattern 2: $3 \times 3 = 9$ tiles
- Pattern 3: $4 \times 4 = 16$ tiles
- Pattern 4: $5 \times 5 = 25$ tiles
- Pattern 5: $6 \times 6 = 36$ tiles
- Cost: $36 \text{ tiles} \times 5 \text{ rupees/tile} = 180 \text{ rupees}$
REASONING: We first identify the sequence of square numbers. Then we calculate the cost by multiplying the total number of tiles by the unit price.
ANSWER: 180 rupees.
## COMPETENCY_QUESTION_1
QUESTION: You are given two sequences: 1, 2, 3, 4, 5... and 1, 3, 6, 10, 15... Explain how the second sequence is formed using the first sequence.
COMPETENCY: Translating real-world situations to mathematical expressions.
STEPS:
- Step 1: Observe that 3 is 1+2, 6 is 1+2+3, 10 is 1+2+3+4.
- Step 2: Recognize the second sequence is the "running total" (cumulative sum) of the first.
- Step 3: Explain the rule: Each term $T_n = \text{Sum of first } n \text{ counting numbers}$.
ANSWER: The second sequence is the sum of the first $n$ counting numbers, also known as triangular numbers.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: A design uses a hexagon with 6 sides. If you add a hexagon to every side of the original, how many total sides would the new shape have? Compare this to how a square grows.
COMPETENCY: Comparing and justifying.
STEPS:
- Step 1: Visualize the central hexagon.
- Step 2: Determine how many new hexagons are added (one per side).
- Step 3: Account for shared sides where the hexagons touch.
- Step 4: Compare the growth rate to a square grid.
ANSWER: The growth in hexagons is faster and more complex because they do not stack as neatly as squares; they leave gaps or share boundaries, whereas squares fill a grid perfectly.
DIFFICULTY: hard
