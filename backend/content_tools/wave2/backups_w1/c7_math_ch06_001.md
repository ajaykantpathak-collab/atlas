## ELI5
The metro board flashes 5, 10, 15, 20 minutes and you already know the next arrival: 25. Reading a sequence means spotting its rule - here, a steady jump of five between neighbours. Some sequences march by adding, some grow by multiplying, some hide two-step tricks such as multiply-then-subtract, and some increase by gaps that themselves grow. Find the rule once and the tenth or hundredth term is plain arithmetic, not a long wait on the platform.

## DEFINITION
Interpreting number sequences involves analyzing a ordered list of numbers arranged according to a specific mathematical rule to uncover the underlying pattern, predict future terms, or solve real-world problems. By examining how terms grow, shrink, or change from one step to the next, we can describe the relationship using mathematical rules or algebraic expressions.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
Can observe a given numerical sequence, determine the underlying rule (whether arithmetic, geometric, or based on differences), calculate missing terms, and write a general expression or explanation for how any term in the sequence is generated.
## SCOPE_BOUNDARY
Covers finite and infinite sequences involving integers, fractions, and basic algebraic growth patterns suitable for Class 7 students. It does NOT cover advanced calculus limits, complex series summation formulas, or non-linear polynomial sequences beyond quadratic growth.
## WALKTHROUGH
Imagine you are standing at a metro station in Delhi and watching the digital board show the arrival times of trains: 5 minutes, 10 minutes, 15 minutes, 20 minutes... How do you know the next train will arrive in 25 minutes? You are interpreting a number sequence! To begin analyzing any sequence, start by writing down the given numbers in order and finding the difference or ratio between consecutive terms. Connect this to what you already know about basic counting, addition, and patterns from earlier grades. The key insight is that numbers in a sequence do not change randomly; they follow a rule that connects each position (term number) to its value.

**Takeaway:** a sequence is rule-governed throughout; finding the rule once converts tedious listing into instant calculation. **In the exam:** test differences first, then ratios, then two-step rules; verify the chosen rule on every given term before predicting with it. **Check yourself:** extend the metro timings by three more arrivals, then state the rule of the sequence in one clean sentence. **Why students miss it:** they assume one constant difference from the first pair of terms alone and never check the remaining neighbours.Say the rule in words first, translate it into a jump, and every distant term becomes reachable in one step.

## DIAGNOSTIC_QUESTION_1
What is a number sequence?
## DIAGNOSTIC_ANSWER_1
A number sequence is an ordered set of numbers arranged according to a specific rule. A student who thinks it is just any random group of numbers selected without order fails to understand that position and rule govern sequences.

**A wrong answer (seeing a heap, not a rule) reveals the student missed the ordering** - sequences are arranged by a rule: position tells you where, the rule tells you how the next term grows.

## DIAGNOSTIC_QUESTION_2
In the sequence 3, 6, 9, 12, ..., a student says the rule is "add 3 each time." Why is identifying this rule helpful for finding the 10th term without writing out all 10 terms?
## DIAGNOSTIC_ANSWER_2
Identifying the rule allows us to use multiplication or a direct formula rather than tedious repeated addition, because the 10th term is just the starting number plus 3 added nine times ($3 + 9 \times 3 = 30$). A student who believes you must write out every single number misses the power of mathematical rules for generalization.
## DIAGNOSTIC_QUESTION_3
Find the next two terms in the sequence: 4, 9, 14, 19, ..., ...
## DIAGNOSTIC_ANSWER_3
Steps:
1. Examine the given terms: 4, 9, 14, 19.
2. Find the difference between consecutive terms: $9 - 4 = 5$, $14 - 9 = 5$, $19 - 14 = 5$.
3. Conclude that the rule is to add 5 to the previous term.
4. Calculate the next term: $19 + 5 = 24$.
5. Calculate the term after that: $24 + 5 = 29$.
Answer: 24, 29. A student who subtracts instead of adds or gets 23 likely miscalculated the difference between 19 and 14.
## DIAGNOSTIC_QUESTION_4
Compare the sequences $A: 2, 4, 6, 8, ...$ and $B: 2, 4, 8, 16, ...$. How do their rules differ in how they grow?
## DIAGNOSTIC_ANSWER_4
Sequence A grows by adding a constant amount (+2 each time, arithmetic growth), whereas Sequence B grows by multiplying by a constant amount ($\times 2$ each time, geometric growth). A student who claims both grow by the same rule is confusing addition with multiplication.
## DIAGNOSTIC_QUESTION_5
A student looks at the sequence 2, 5, 10, 17, 26 and claims the rule is "add 3, then add 3, then add 3..." Is this student correct? Verify by checking the differences.
## DIAGNOSTIC_ANSWER_5
The student is incorrect. Let us check the differences between consecutive terms: $5 - 2 = 3$, $10 - 5 = 5$, $17 - 10 = 7$, $26 - 17 = 9$. The differences themselves form a sequence of odd numbers (3, 5, 7, 9), not a constant 3. A student who says "add 3" failed to check every step and only looked at the very first jump.
## DIAGNOSTIC_QUESTION_6
Create a number sequence of 5 terms where each term after the first is found by multiplying the previous term by 2 and then subtracting 1, starting with the number 3.
## DIAGNOSTIC_ANSWER_6
The expected sequence is 3, 5, 9, 17, 33 (since $3 \times 2 - 1 = 5$; $5 \times 2 - 1 = 9$; $9 \times 2 - 1 = 17$; $17 \times 2 - 1 = 33$). A poor answer shows arithmetic addition instead of multiplication or incorrect order of operations (e.g., subtracting first then multiplying).
## COMMON_MISCONCEPTION
Students often assume every sequence is an arithmetic progression (grows by addition) and mistakenly apply a constant difference when the sequence actually grows by multiplication (geometric) or by changing differences (quadratic). For example, in the sequence 2, 6, 18, 54, a student might look at the first jump ($6 - 2 = 4$) and incorrectly guess the next term is $54 + 4 = 58$, completely missing that each term is multiplied by 3.
## ON_FAILURE
Guide the student to test both addition and multiplication between at least three pairs of adjacent terms. Say: "Do not just look at the first two numbers. Check if the difference between term 2 and term 1 is the same as term 3 and term 2. If it is not, check if one number is a multiple or product of the previous number." Write down both operations side-by-side to show why addition fails and multiplication works.
## PREREQUISITE_NODE_IDS
c6_math_ch12_121, c6_math_ch05_060
## PREREQUISITE_REASONS
c6_math_ch12_121: provides foundational practice in identifying basic number patterns.
c6_math_ch05_060: connects patterns to algebraic thinking and variable expressions.
## FORWARD_NODE_IDS
c7_math_ch06_008, c7_math_ch06_005, c7_math_ch06_004, c7_math_ch06_009, c8_math_ch13_3
## FORWARD_REASONS
c7_math_ch06_008: extends sequence identification to more complex non-linear patterns.
c7_math_ch06_005: applies sequence interpretation to the famous Fibonacci growth pattern.
c7_math_ch06_004: requires interpreting number sequences derived from spatial or numerical arrangements.
c7_math_ch06_009: requires interpreting number sequences and relational steps.
c8_math_ch13_3: Interpreting number sequences develops the "what comes next?" reasoning used in recursive pyramid building.

## CROSS_SUBJECT_PREREQS
c6_math_ch05_052, c6_math_ch09_095
## CROSS_SUBJECT_REASONS
c6_math_ch05_052: variables help express the general rule for any term number in a sequence.
c6_math_ch09_100: data handling helps organize tabular data when analyzing numerical growth.
## CHAIN_DESCRIPTION
c6_math_ch12_121 -> c7_math_ch06_001 -> c7_math_ch06_008
## THIS_FORMULA
$a_n = a_1 + (n - 1)d$
## FORMULA_VARIABLES
$a_n$ = the value of the nth term, $a_1$ = the first term, $n$ = the position of the term, $d$ = common difference between terms.
## FORMULA_UNITS
dimensionless
## COMPUTATION_TYPE
algebraic
## CROSS_SUBJECT

## PREREQ_CONCEPT
Recognizing constant differences and relationships between consecutive numbers in a list.
## PREREQ_BEFORE
Students must be able to perform basic addition, subtraction, and multiplication of integers.
## PREREQ_STUCK
Review c6_math_ch12_121 to practice finding simple addition and multiplication patterns.
## WORKED_EXAMPLE_1
PROBLEM: Riya saves money in her piggy bank every week. Week 1 she saves ₹50, Week 2 she saves ₹75, Week 3 she saves ₹100, and Week 4 she saves ₹125. Following this pattern, how much will she save in Week 8?

STEPS:
- Step 1: List the given sequence of savings: 50, 75, 100, 125. Identify what is asked: the 8th term ($n = 8$).
- Step 2: Calculate the difference between consecutive terms to find the rule. $75 - 50 = 25$, $100 - 75 = 25$, $125 - 100 = 25$. The rule is to add 25 each week ($d = 25$).
- Step 3: Use the arithmetic sequence rule $a_n = a_1 + (n - 1)d$, where $a_1 = 50$, $n = 8$, and $d = 25$.
- Step 4: Substitute the values into the formula: $a_8 = 50 + (8 - 1) \times 25 = 50 + 7 \times 25 = 50 + 175 = 225$.
- Step 5: Interpret the result with proper units: Riya will save ₹225 in Week 8.

REASONING: By establishing that the difference between consecutive weeks is a constant ₹25, we confirm it is an arithmetic sequence. Using the formula avoids adding 25 four more times manually, preventing calculation errors.

ANSWER: ₹225
## WORKED_EXAMPLE_2
PROBLEM: A colony of bacteria starts with 3 bacteria. Every hour, the number of bacteria triples. Write down the sequence for the first 4 hours and determine how many bacteria there are at the end of the 4th hour.

STEPS:
- Step 1: Identify the starting amount ($a_1 = 3$) and the growth rule (multiply by 3 each hour).
- Step 2: Calculate the second term (after 1 hour): $3 \times 3 = 9$.
- Step 3: Calculate the third term (after 2 hours): $9 \times 3 = 27$.
- Step 4: Calculate the fourth term (after 3 hours): $27 \times 3 = 81$.
- Step 5: Calculate the fifth term representing the end of the 4th hour: $81 \times 3 = 243$.

REASONING: Unlike addition sequences, geometric sequences grow via multiplication. Each step applies the multiplier to the result of the previous step, which leads to exponential growth.

ANSWER: 243 bacteria
## WORKED_EXAMPLE_3
PROBLEM: A pattern of tiles is arranged such that Figure 1 has 4 tiles, Figure 2 has 7 tiles, Figure 3 has 12 tiles, and Figure 4 has 19 tiles. If this pattern continues, how many tiles will Figure 6 have?

STEPS:
- Step 1: Write down the sequence of tile counts: 4, 7, 12, 19.
- Step 2: Find the first differences between consecutive terms: $7 - 4 = 3$, $12 - 7 = 5$, $19 - 12 = 7$.
- Step 3: Notice the first differences (3, 5, 7) are not constant. Find the second differences: $5 - 3 = 2$, $7 - 5 = 2$. Since the second difference is constant (+2), this is a quadratic sequence.
- Step 4: Determine the next first difference by adding 2 to the last difference ($7 + 2 = 9$).
- Step 5: Add this new difference to the 4th term to get Figure 5: $19 + 9 = 28$.
- Step 6: Find the next difference ($9 + 2 = 11$) and add it to Figure 5 to get Figure 6: $28 + 11 = 39$ tiles.

REASONING: When first differences are not equal, checking second differences reveals a hidden layer of pattern. Extending the differences step-by-step allows us to find later terms without a complex algebraic formula.

ANSWER: 39 tiles
## COMPETENCY_QUESTION_1
QUESTION: Amit looks at the sequence 1, 4, 9, 16, 25 and states, "The rule is to add 3, then add 5, then add 7, then add 9. Therefore, the next number is obtained by adding 11, so it is 36." Priya looks at the same sequence and states, "Each number is the square of its position number ($1^2, 2^2, 3^2, ...$), so the 6th term is $6^2 = 36$." Are both students correct? Explain how their methods relate to each other.
COMPETENCY: Comparing and justifying multiple mathematical interpretations of a sequence
STEPS:
- Step 1: Analyze Amit's method (examining differences: 3, 5, 7, 9, 11).
- Step 2: Analyze Priya's method (identifying positional squares: $n^2$).
- Step 3: Connect the two methods: the differences of consecutive square numbers always form the sequence of odd numbers ($3, 5, 7, 9, ...$).
- Step 4: Conclude that both methods are valid and mathematically linked.
ANSWER: Both students are correct. Amit uses recursive differences (adding consecutive odd numbers), while Priya uses an explicit positional formula ($n^2$). They yield the same result because the differences between squares are always odd numbers.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: A bus leaves the depot with 5 passengers. At the first stop, 3 passengers get on. At the second stop, 6 passengers get on. At the third stop, 9 passengers get on. If passenger boarding continues following this exact pattern at every stop, how many total passengers get on at the 6th stop, and what is the total number of passengers who boarded from the 1st to the 6th stop combined?
COMPETENCY: Translating real-world situations to sequence rules and calculating cumulative sums
STEPS:
- Step 1: Write down the sequence of passengers boarding at each stop: 3, 6, 9...
- Step 2: Identify the rule: passengers boarding increase by 3 each stop (arithmetic sequence with common difference 3 and first term 3).
- Step 3: Calculate the boarding for stops 4, 5, and 6: Stop 4 = 12, Stop 5 = 15, Stop 6 = 18.
- Step 4: Compute the total cumulative sum of passengers boarding across all 6 stops: $3 + 6 + 9 + 12 + 15 + 18$.
- Step 5: Perform the addition: $3 + 6 = 9$, $9 + 9 = 18$, $18 + 12 = 30$, $30 + 15 = 45$, $45 + 18 = 63$.
ANSWER: 18 passengers board at the 6th stop, and a total of 63 passengers boarded from the 1st to the 6th stop.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: ______ number sequences involves analyzing a ordered list of numbers arranged according to a specific mathematical rule to uncover the underlying pattern, predict future terms, or solve real-world problems.

## DIAGNOSTIC_ANSWER_7
Interpreting

**A wrong answer (writing 'Counting') reveals the student swapped the title's verb - the topic is Interpreting number sequences, the analysis that uncovers the hidden rule.**

Interpreting is the title's verb - counting is only its raw material.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are standing at a metro station in Delhi and watching the digital board show the arrival ______ of trains: 5 minutes, 10 minutes, 15 minutes, 20 minutes...

## DIAGNOSTIC_ANSWER_8
times

**A wrong answer (writing 'numbers') reveals the student drifted from the sentence - the board shows arrival times of trains, and the blank asks for the noun the board counts down.**

The board counts down arrival times, the walkthrough's own phrase.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: How do you know the next train will arrive in ______ minutes?

## DIAGNOSTIC_ANSWER_9
25

**A wrong answer (any other number) reveals the student misread the pattern's next beat - the board's steady jump lands the next train at 25 minutes, the answer the walkthrough awaits.**

The steady jump of five lands the next train at 25 minutes.

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
Can observe a given numerical sequence, determine the underlying rule (whether arithmetic, geometric, or based on differences), calculate missing terms, and write a general expression or explanation for how any term in the sequence is generated.

**A wrong answer (stopping at the pattern's name) reveals the student closed the book early** - mastery runs the full loop: find the rule, compute the missing term, and express how any term in the sequence is generated.

## DIAGNOSTIC_QUESTION_11
Fill in the blank: Imagine you are ______ at a metro station in Delhi and watching the digital board show the arrival times of trains: 5 minutes, 10 minutes, 15 minutes, 20 minutes...

## DIAGNOSTIC_ANSWER_11
standing

**A wrong answer (writing 'waiting') reveals the student drifted from the walkthrough's verb - you are standing at the metro station watching the board when the sequence appears.**

Standing at the metro platform is where the sequence announces itself.

