## ELI5
Setting out desks for the school function, row 1 needs 3 desks, row 2 needs 5, row 3 needs 7 - each new row adds the same 2. When a pattern grows by a fixed step, you never lay rows one by one to reach the fiftieth; you name the row with a letter n and write the rule: the step times n, adjusted by the starting offset. Check the rule against the first two rows, then trust it for the hundredth. Generalisation is arithmetic with foresight.

## DEFINITION
The process of observing numerical or geometric patterns and expressing the underlying relationship as a general algebraic formula using variables. This allows us to predict any term in a sequence without calculating all the intermediate steps.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
Can analyze a given sequence of numbers or shapes, identify the common difference or multiplicative rule, and write a correct algebraic expression using a variable (like $n$) to represent the $n$-th term.
## SCOPE_BOUNDARY
Covers linear and simple geometric number patterns where the relationship between the position number and the value is linear ($an + b$), excluding quadratic or exponential sequences.
## WALKTHROUGH
Imagine you are organizing desks in your school auditorium for an annual function. Row 1 has 3 desks, Row 2 has 5 desks, and Row 3 has 7 desks, following a steady growth. If the principal asks you how many desks are needed for the 50th row, you wouldn't want to draw all 50 rows on paper! Instead, you look at how the pattern grows: each new row adds 2 desks to the previous one. By connecting the row number to the quantity using a letter-number like $n$, you discover the hidden rule: $2n + 1$. This powerful method of generalizing patterns lets us leap from counting one by one to calculating any term instantly using algebra.

**Takeaway:** a pattern with a constant step always generalises to step times n plus the starting adjustment. **In the exam:** test any proposed rule against the first two terms, and one more, before trusting it for the fiftieth term. **Check yourself:** write the desk rule down clearly, then predict a row far beyond the chart without listing every single term. **Why students miss it:** they guess the rule from a single term, so 3n stands where 3n + 1 was needed all along.

## DIAGNOSTIC_QUESTION_1
What term in algebra is used to describe finding a general rule for a sequence of numbers using a letter like $n$?
## DIAGNOSTIC_ANSWER_1
The correct answer is generalisation or algebraic generalisation. A wrong answer like "multiplication" or "substitution" shows that the student confuses the overall process of finding a rule with just one arithmetic operation used during the calculation.
## DIAGNOSTIC_QUESTION_2
A student looks at the pattern 4, 7, 10, 13 and says the rule is just $3n$ because it increases by 3 each time. Why is this explanation incomplete for finding the 4th term?
## DIAGNOSTIC_ANSWER_2
The correct answer is that $3n$ gives 3, 6, 9, 12 for $n = 1, 2, 3, 4$, which misses every term by exactly 1; the complete rule must be $3n + 1$. A wrong answer claiming $3n$ is completely correct reveals that the student forgot to test their rule against the initial term in the sequence.
## DIAGNOSTIC_QUESTION_3
In a pattern of matchstick squares, 1 square uses 4 sticks, 2 attached squares use 7 sticks, and 3 squares use 10 sticks. Use the general rule $3n + 1$ to calculate the exact number of matchsticks needed for 25 connected squares.
## DIAGNOSTIC_ANSWER_3
The correct answer is 76 matchsticks. Working steps: 
1. Identify the general rule given: $3n + 1$.
2. Identify the given position number: $n = 25$.
3. Substitute the value of $n$ into the algebraic expression: $3(25) + 1$.
4. Multiply: $3 \times 25 = 75$.
5. Add the remaining constant: $75 + 1 = 76$. 
A wrong answer of 75 indicates the student forgot to add the starting baseline stick (+1) to the sequence.
## DIAGNOSTIC_QUESTION_4
Compare the two patterns: Pattern A is 5, 8, 11, 14 and Pattern B is 2, 5, 8, 11. How do their algebraic generalisations differ?
## DIAGNOSTIC_ANSWER_4
The correct answer is that both share the same common difference of 3 (giving $3n$), but Pattern A starts higher and has the rule $3n + 2$, whereas Pattern B has the rule $3n - 1$. A wrong answer stating they have completely different algebraic structures shows the student does not recognize that parallel growth rates produce expressions with identical coefficients.
## DIAGNOSTIC_QUESTION_5
Rahul wrote the algebraic rule $5n - 2$ for a sequence. When $n = 3$, he calculated the term value as $5(3) - 2 = 13$. When $n = 4$, he calculated $5(4) - 2 = 18$. Is Rahul's sequence generation consistent, and what is the common difference?
## DIAGNOSTIC_ANSWER_5
The correct answer is yes, it is consistent, and the common difference is 5. Working justification: The difference between the 4th term (18) and the 3rd term (13) is 5, which matches the coefficient of $n$ in the expression. A wrong answer stating the difference is 3 or 2 reveals that the student looked at constants or operations rather than the multiplier attached to the variable.
## DIAGNOSTIC_QUESTION_6
Create your own number sequence where the 4th term is 19 and the common difference between consecutive terms is 4. Write down the first four terms and the algebraic generalisation rule for your sequence.
## DIAGNOSTIC_ANSWER_6
The expected answer should provide a sequence starting with 7, 11, 15, 19, with the algebraic rule $4n + 3$. A poor answer that lists random numbers without a constant difference of 4 shows a failure to grasp how linear sequences maintain a uniform growth rate linked to the coefficient of $n$.
## COMMON_MISCONCEPTION
Students often set the coefficient of $n$ equal to the first term of the sequence instead of the common difference between consecutive terms. For example, given the sequence 5, 8, 11, 14, a student might write $5n$ instead of $3n + 2$, thinking the multiplier must match the starting number.
## ON_FAILURE
Guide the student by writing out the sequence and calculating the gap between adjacent terms first. Say: "Before looking at the first number, find out how much is added each time you move to the next step. That growth amount is always your coefficient multiplied by $n$; the first term only helps you find what number to add or subtract at the end."
## PREREQUISITE_NODE_IDS
c7_math_ch04_001, c7_math_ch04_005, c6_math_ch12_121
## PREREQUISITE_REASONS
c7_math_ch04_001: requires understanding variables to write algebraic expressions.
c7_math_ch04_005: builds on matchstick pattern generalisation using variables.
c6_math_ch12_121: provides foundational practice in spotting number patterns.
## FORWARD_NODE_IDS
c7_math_ch04_009, c7_math_ch04_010, c8_math_ch11_6, c8_math_ch13_3, c8_math_ch5_1
## FORWARD_REASONS
c7_math_ch04_009: substitution is needed to evaluate general rules for specific term positions.
c7_math_ch04_010: applies generalisation rules to describe geometric perimeters and areas.
c8_math_ch11_6: Pick patterns and reveal relationships builds the skill of finding general rules from specific numerical sequences.
c8_math_ch13_3: Picking patterns and revealing relationships builds the habit of looking for structural rules, not just numerical answers.
c8_math_ch5_1: Picking patterns and revealing relationships is the core skill for this exploration.

## CROSS_SUBJECT_PREREQS
c7_math_ch04_001
## CROSS_SUBJECT_REASONS
c7_math_ch04_001: core algebraic representation needed for translating patterns into mathematical sentences.
## CHAIN_DESCRIPTION
c7_math_ch04_005 -> c7_math_ch04_008 -> c7_math_ch04_009
## THIS_FORMULA
Term_n = an + b
## FORMULA_VARIABLES
a = common difference between terms, n = position or term number, b = adjustment constant to match the first term
## FORMULA_UNITS
dimensionless
## COMPUTATION_TYPE
algebraic
## CROSS_SUBJECT
c7_math_ch04_005 | uses visual pattern observation to build algebraic expressions
c7_math_ch04_001 | uses variables to represent unknown quantities in word relationships
## PREREQ_CONCEPT
Identifying common differences in arithmetic sequences and using variables as place-holders.
## PREREQ_BEFORE
Be able to compute differences between consecutive numbers and write basic algebraic terms like $2n$ or $3n$.
## PREREQ_STUCK
Review c7_math_ch04_005 to practice connecting visual steps to algebraic coefficients.
## WORKED_EXAMPLE_1
PROBLEM: Priya arranges flower pots in rows for a school exhibition. Row 1 has 5 pots, Row 2 has 8 pots, and Row 3 has 11 pots. Find the general algebraic rule for the number of pots in the $n$-th row, and use it to find how many pots are needed for Row 15.
STEPS:
- step 1: List the given values of the sequence to examine the growth: 5, 8, 11, ...
- step 2: Find the common difference ($a$) between consecutive terms: $8 - 5 = 3$ and $11 - 8 = 3$, so $a = 3$.
- step 3: Set up the partial rule using the common difference: $3n + b$. Test $n = 1$: $3(1) + b = 5$, which means $3 + b = 5$, so $b = 2$.
- step 4: Combine into the final generalisation rule: $3n + 2$.
- step 5: Substitute $n = 15$ into the rule to calculate the pots in Row 15: $3(15) + 2 = 45 + 2 = 47$ pots.
REASONING: The common difference becomes the multiplier of our variable $n$ because the pattern grows by a steady rate of 3 units at each step. The adjustment constant $b$ accounts for the offset needed to land precisely on the first term when $n = 1$.
ANSWER: 47 pots
## WORKED_EXAMPLE_2
PROBLEM: An auditorium arranges chairs in rows such that Row 1 has 7 chairs, Row 2 has 12 chairs, and Row 3 has 17 chairs. Determine the general algebraic rule for the $n$-th row, and calculate which row will contain exactly 77 chairs.
STEPS:
- step 1: Identify the sequence terms: 7, 12, 17, ...
- step 2: Calculate the common difference ($a$): $12 - 7 = 5$, so $a = 5$.
- step 3: Build the trial expression $5n + b$. Test for $n = 1$: $5(1) + b = 7$, which means $5 + b = 7$, so $b = 2$.
- step 4: State the final generalisation rule: $5n + 2 = \text{Total chairs}$.
- step 5: Set the expression equal to 77 and solve for $n$: $5n + 2 = 77 \implies 5n = 75 \implies n = 15$.
REASONING: Once the general rule is established, finding the row number for a specific total becomes an equation-solving task where we work backward from the total value.
ANSWER: Row 15
## WORKED_EXAMPLE_3
PROBLEM: A gardener plants saplings in a triangular pattern where Row 1 has 4 plants, Row 2 has 7 plants, Row 3 has 10 plants, and so on. Due to space limits, the garden can only accommodate up to 20 rows. Calculate the exact number of plants in the 20th row, and then find the total number of plants in the last two rows combined (Row 19 and Row 20).
STEPS:
- step 1: Extract the sequence terms: 4, 7, 10, ...
- step 2: Determine the common difference: $7 - 4 = 3$, so the coefficient is 3.
- step 3: Find the constant offset: $3(1) + b = 4 \implies b = 1$, giving the general rule $3n + 1$.
- step 4: Calculate plants in Row 20 by substituting $n = 20$: $3(20) + 1 = 60 + 1 = 61$ plants.
- step 5: Calculate plants in Row 19 by substituting $n = 19$: $3(19) + 1 = 57 + 1 = 58$ plants.
- step 6: Add the plants of both rows together: $61 + 58 = 119$ plants.
REASONING: Combining generalisation with multi-step evaluation allows us to solve complex real-world queries by breaking them down into individual term calculations before performing final arithmetic operations.
ANSWER: 119 plants
## COMPETENCY_QUESTION_1
QUESTION: Amit observes a tile pattern on his floor. Pattern 1 uses 6 tiles, Pattern 2 uses 10 tiles, and Pattern 3 uses 14 tiles. Amit claims that the rule for the $n$-th pattern is $6n$. Is Amit correct? If not, identify his error and write the correct algebraic generalisation.
COMPETENCY: Error identification, correction, and algebraic justification
STEPS:
- step 1: Test Amit's rule ($6n$) against the first few given pattern values.
- step 2: For $n = 1$, $6(1) = 6$ (matches); for $n = 2$, $6(2) = 12$ (does not match the given 10 tiles).
- step 3: Determine the actual common difference between consecutive terms: $10 - 6 = 4$ and $14 - 10 = 4$.
- step 4: Formulate the correct rule using the common difference 4: $4n + b$. Test for $n = 1$: $4(1) + b = 6 \implies b = 2$, giving $4n + 2$.
ANSWER: Amit is incorrect. He mistook the first term (6) for the common growth rate. The correct common difference is 4, and the correct general rule is $4n + 2$.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: Two different metal wire patterns are being tested in a workshop. Pattern X follows the rule $4n + 3$, and Pattern Y follows the rule $6n - 1$, where $n$ represents the serial number of the design. At which design number ($n$) will both patterns use the exact same amount of wire, and what will that total wire length be?
COMPETENCY: Comparing algebraic generalisations and solving comparative linear relations
STEPS:
- step 1: Set the two algebraic expressions equal to each other to find the point of intersection: $4n + 3 = 6n - 1$.
- step 2: Rearrange terms by moving variable terms to one side and constants to the other: $3 + 1 = 6n - 4n$.
- step 3: Simplify both sides: $4 = 2n$.
- step 4: Solve for $n$: $n = 2$.
- step 5: Substitute $n = 2$ into either expression to find the wire length: $4(2) + 3 = 8 + 3 = 11$ units. Verify with Pattern Y: $6(2) - 1 = 12 - 1 = 11$ units.
ANSWER: Both patterns will use the same amount of wire at design number $n = 2$, and the total wire length will be 11 units.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The process of observing numerical or geometric patterns and expressing the underlying ______ as a general algebraic formula using variables.

## DIAGNOSTIC_ANSWER_7
relationship

**A wrong answer (writing 'sequence') reveals the student swapped the definition's noun - the observed relationship is what gets expressed as a general algebraic formula using variables, letting any term be predicted.**

The relationship, once named, predicts terms nobody has drawn.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are organizing desks in your school ______ for an annual function.

## DIAGNOSTIC_ANSWER_8
auditorium

**A wrong answer (writing 'hall') reveals the student drifted from the venue - the desks are organised in the school auditorium for the annual function, the pattern's stage.**

The auditorium is the venue; the function is the occasion.

The auditorium is the venue and the annual function the occasion, as the sentence says.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Instead, you look at how the pattern grows: each new row adds ______ desks to the previous one.

## DIAGNOSTIC_ANSWER_9
2

**A wrong answer (any other step) reveals the student misread the growth - each new row in the auditorium adds 2 desks to the previous one, the constant step the rule must carry.**

Two desks per row - the constant step the rule must carry.

Two desks per row is the constant step the general rule must always carry.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Imagine you are ______ desks in your school auditorium for an annual function.

## DIAGNOSTIC_ANSWER_10
organizing

**A wrong answer (writing 'arranging') reveals the student reached for a cousin** - the walkthrough is organizing desks in the school auditorium, rows growing steadily until the formula must answer for the 50th row without counting a single chair.

The auditorium's rows grow by the same jump each time, which is why a formula - not a head-count - answers for the fiftieth row.

