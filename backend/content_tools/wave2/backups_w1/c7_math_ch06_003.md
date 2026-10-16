## ELI5
Seating the auditorium in rows of two, parity becomes bookkeeping: even plus even stays even, odd plus odd turns even, even plus odd lands odd - and the same ledger runs backwards for differences. The algebra is one line: every odd carries a spare one, and two spares pair up into an even. Counting a whole pile needs only one question - how many odds? An odd number of odds makes the total odd, an even number of odds leaves it even. Evens never disturb parity; odds flip it.

## DEFINITION
The sum and difference rules for even and odd numbers describe predictable patterns in parity (whether a number is even or odd) when performing addition, such as the fact that the sum of two even numbers is always even, while the sum of an even and an odd number is always odd. These algebraic patterns emerge from expressing any even number as $2m$ and any odd number as $2n + 1$ (where $m$ and $n$ are integers).
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
Can predict, justify, and algebraically prove the parity of the sum or difference of any combination of multiple even and odd integers, and apply these rules to solve number puzzles in real-world contexts.
## SCOPE_BOUNDARY
Covers the rules and algebraic proofs for addition and subtraction of finite combinations of even and odd numbers in Class 7. It does NOT cover infinite series summations, modular arithmetic beyond basic parity, or advanced number theory proofs.
## WALKTHROUGH
Imagine you are organizing desks in your school auditorium in rows of two, and you notice that if you have two rows with an even number of students and three rows with an odd number of students, will the total number of students be even or odd? To answer this without counting every single person, we need to understand how the parities of numbers combine when we add them together. We begin by recalling what we learned about picking parity in Class 6, where even numbers are multiples of 2 and odd numbers leave a remainder of 1. By representing any even number as $2p$ and any odd number as $2q + 1$ using our algebraic tools, we can add them together and factor out a 2 to see the resulting algebraic structure. The key insight is that addition of parities follows a strict set of predictable rules that never change, no matter how large the numbers get.

**Takeaway:** parity of a sum depends only on the count of odd addends: even count of odds gives even, odd count gives odd. **In the exam:** for multi-number sums, count the odds first, answer instantly, then justify with 2n forms. **Check yourself:** predict the parity of the library's book total without adding, then verify by actual addition. **Why students miss it:** they add parities digit-wise instead of counting odds, so one odd book spoils the verdict.

## DIAGNOSTIC_QUESTION_1
What is the mathematical definition of an even number in terms of algebra, and how does it help us determine sums?
## DIAGNOSTIC_ANSWER_1
An even number is any integer that can be written in the form $2k$, where $k$ is an integer. This algebraic representation helps us determine sums because we can substitute $2k$ and $2m$ into expressions to prove that adding two evens always yields an even result ($2k + 2m = 2(k + m)$). A wrong answer often confuses even numbers with numbers ending in certain digits without recognizing the underlying algebraic divisibility by 2, leading to incomplete or flawed reasoning when tackling multi-term sums.
## DIAGNOSTIC_QUESTION_2
Explain why the sum of three odd numbers is always an odd number, rather than an even number.
## DIAGNOSTIC_ANSWER_2
The sum of any two odd numbers is even (since $(2a+1) + (2b+1) = 2a + 2b + 2 = 2(a+b+1)$), and adding a third odd number to that even sum results in an odd number (since even + odd = odd). A wrong answer might assume that any sum involving three or more terms must automatically become even due to the presence of multiple numbers, ignoring the step-by-step associative property of addition.
## DIAGNOSTIC_QUESTION_3
A school library has 147 fiction books (an odd number) and receives a donation of 234 new non-fiction books (an even number). Without calculating the exact total, determine whether the total number of library books is even or odd, and verify your prediction with the actual sum.
## DIAGNOSTIC_ANSWER_3
The total number of books is odd. 
Step 1: Identify the parity of each quantity: 147 is odd, and 234 is even.
Step 2: Apply the rule for adding an odd number and an even number: $\text{Odd} + \text{Even} = \text{Odd}$.
Step 3: Calculate the exact sum to verify: $147 + 234 = 381$.
Step 4: Check the final digit of 381, which is 1 (not divisible by 2), confirming it is odd. 
A wrong answer usually stems from misidentifying the initial parity of 147 or adding the digits incorrectly, showing a breakdown in connecting real-world quantities to parity rules.
## DIAGNOSTIC_QUESTION_4
Analyze the statement: "If you add five even numbers and four odd numbers together, the final sum will always be an even number." Determine if this statement is true or false and justify your reasoning algebraically.
## DIAGNOSTIC_ANSWER_4
The statement is true. The sum of any number of even numbers is always even. The sum of four odd numbers (an even count of odds) will yield an even sum, because each pair of odd numbers adds up to an even number ($(\text{Odd} + \text{Odd}) + (\text{Odd} + \text{Odd}) = \text{Even} + \text{Even} = \text{Even}$). Finally, adding the sum of the five even numbers (which is even) to the sum of the four odd numbers (which is even) results in an even sum ($\text{Even} + \text{Even} = \text{Even}$). A wrong answer typically treats all odd numbers as making the sum odd regardless of how many odd numbers are added, forgetting that an *even* count of odd terms always sums to an even number.
## DIAGNOSTIC_QUESTION_5
Evaluate the following student work: "To find the sum of 35 (odd) and 49 (odd), I added them: $35 + 49 = 84$. Since 84 is even, my rule says Odd + Odd = Even. Therefore, if I add 35, 49, and 17 (odd), the sum $84 + 17 = 101$ is odd. My final conclusion is that the sum of three odd numbers is always even because my first two numbers gave an even answer." Identify the exact error in the student's evaluation.
## DIAGNOSTIC_ANSWER_5
The student correctly calculated $35 + 49 = 84$ (Odd + Odd = Even) and correctly calculated $84 + 17 = 101$ (Even + Odd = Odd), but their final conclusion is completely flawed because they contradicted their own final calculation. The student claimed the sum of three odd numbers is "always even" even though their own math resulted in 101, which is odd. A wrong answer here indicates the student is blindly guessing conclusions based on a superficial reading of intermediate steps rather than evaluating their own final mathematical output.
## DIAGNOSTIC_QUESTION_6
Create a mathematical puzzle involving a sequence of four consecutive integers (starting with an odd number) where the sum of these four numbers is guaranteed to be even. Prove why your statement holds true using algebraic variables.
## DIAGNOSTIC_ANSWER_6
An example puzzle: Let the four consecutive integers start with an odd number $2k + 1$. The four numbers are $(2k + 1)$, $(2k + 2)$, $(2k + 3)$, and $(2k + 4)$. 
Proof: Their sum is $(2k+1) + (2k+2) + (2k+3) + (2k+4) = 8k + 10 = 2(4k + 5)$. 
Since the sum can be factored as 2 times an integer, the total sum is always even. A poor answer fails to use algebraic expressions ($2k+1$) or provides a single numerical example without a general proof covering all consecutive integer sequences.
## COMMON_MISCONCEPTION
Students often mistakenly believe that adding *any* collection of odd numbers results in an odd sum, failing to recognize that the *count* of odd numbers matters. For instance, when adding three odd numbers ($3 + 5 + 7 = 15$), the sum is odd, but when adding four odd numbers ($3 + 5 + 7 + 9 = 24$), the sum becomes even because pairs of odd numbers cancel out their remainder of 1. Another common error is assuming subtraction of even and odd numbers follows entirely different parity rules than addition, forgetting that subtracting an odd number changes parity in the exact same way as adding an odd number.
## ON_FAILURE
When a student struggles with parity sums, guide them back to concrete counters or tally marks grouped in pairs. Say: "Let's draw each odd number as a pair of dots plus one extra dot left over. When we add two odd numbers, the two leftover single dots join together to make a new complete pair, turning the total sum even! Now, what happens when you have three leftover single dots?" Have them physically circle pairs of dots to visualize why an even count of odd numbers makes an even total, while an odd count of odd numbers leaves one single dot unpaired.
## PREREQUISITE_NODE_IDS
c7_math_ch06_002, c6_math_ch01_013, c6_math_ch05_052
## PREREQUISITE_REASONS
c7_math_ch06_002: requires understanding the fundamental definitions and properties of even and odd numbers before combining them.
c6_math_ch01_013: requires knowledge of factors, multiples, and divisibility by 2 which defines even numbers.
c6_math_ch05_052: requires familiarity with algebraic variables to express numbers generally as $2m$ or $2n+1$.
## FORWARD_NODE_IDS
c7_math_ch06_007, c7_math_ch06_009, c8_math_ch1_2, c8_math_ch1_5, c8_math_ch5_1, c8_math_ch5_3, c8_math_ch5_4, c8_math_ch5_5, c8_math_ch5_6, c8_math_ch5_7
## FORWARD_REASONS
c7_math_ch06_007: parity rules are essential for solving advanced parity argument problems where structural invariants must be tracked.
c7_math_ch06_009: number games and mathematical reasoning require deep fluency with even and odd sum/difference properties.
c8_math_ch1_2: Sum of even/odd numbers — connects to sum-of-odds property of squares.
c8_math_ch1_5: Rules for sum of odd numbers provide the foundation for this specific pattern.
c8_math_ch5_1: Rules for sums of even and odd numbers directly apply when adding consecutive numbers (which alternate parity).
c8_math_ch5_3: knowing that even+odd=odd directly explains why the sum is odd.
c8_math_ch5_4: covers sum rules for even/odd numbers
c8_math_ch5_5: Covers sum rules for even/odd numbers at Class 7 level
c8_math_ch5_6: Sum of even/odd rules needed to predict parity of results without computing
c8_math_ch5_7: Gives the observed patterns for sum of even/odd numbers without algebraic proof.

## CROSS_SUBJECT_PREREQS
c6_math_ch05_052
## CROSS_SUBJECT_REASONS
c6_math_ch05_052: uses algebraic representation of numbers with variables, which is vital for proving parity theorems across mathematics and logic.
## CHAIN_DESCRIPTION
c7_math_ch06_002 -> c7_math_ch06_003 -> c7_math_ch06_007
## THIS_FORMULA
\text{Even} \pm \text{Even} = \text{Even}, \quad \text{Even} \pm \text{Odd} = \text{Odd}, \quad \text{Odd} \pm \text{Odd} = \text{Even}
## FORMULA_VARIABLES
\text{Even} = \text{any integer multiple of 2 (represented as } 2m \text{)}, \quad \text{Odd} = \text{any integer not divisible by 2 (represented as } 2n+1 \text{)}
## FORMULA_UNITS
dimensionless
## COMPUTATION_TYPE
algebraic
## CROSS_SUBJECT
c7_math_ch06_002 | Builds directly on the classification of numbers into even and odd categories.
## PREREQ_CONCEPT
Algebraic representation of integers and basic parity properties.
## PREREQ_BEFORE
Students must be able to identify even and odd numbers and represent an even number as $2m$ and an odd number as $2n+1$.
## PREREQ_STUCK
Review c7_math_ch06_002 to reinforce how even numbers are multiples of 2 and odd numbers leave a remainder of 1.
## WORKED_EXAMPLE_1
PROBLEM: Priya has a collection of currency notes for a school charity drive. She has 345 ten-rupee notes (an odd count) and 220 twenty-rupee notes (an even count). Without counting the total number of notes, determine whether the total count of notes is even or odd, and prove your result using algebra where an even number is $2m$ and an odd number is $2n+1$.
STEPS:
- Step 1: Identify the given quantities and their parities: let $A = 345$ (which is an odd quantity, representable as $2n + 1$) and $B = 220$ (which is an even quantity, representable as $2m$).
- Step 2: Set up the algebraic addition of an odd quantity and an even quantity: $(2n + 1) + 2m$.
- Step 3: Rearrange terms using the commutative and associative properties of addition: $2n + 2m + 1$.
- Step 4: Factor out 2 from the first two terms to isolate the even structure: $2(n + m) + 1$.
- Step 5: Interpret the algebraic result: since $2(n + m)$ is a multiple of 2 (making it even), adding 1 to it makes the total expression $2(n + m) + 1$ strictly odd. Therefore, the total number of notes is odd ($345 + 220 = 565$, which confirms our result).
REASONING: By substituting general algebraic forms for even and odd numbers, we prove that the sum of an odd number and an even number always leaves a remainder of 1 when divided by 2, which guarantees an odd sum.
ANSWER: The total number of notes is odd (565 notes).
## WORKED_EXAMPLE_2
PROBLEM: In an auditorium, Row 1 has 13 seats (odd), Row 2 has 25 seats (odd), and Row 3 has 19 seats (odd). Determine whether the sum of seats in these three rows is even or odd using algebraic justification.
STEPS:
- Step 1: Represent each odd number of seats algebraically: Row 1 is $2a + 1$, Row 2 is $2b + 1$, and Row 3 is $2c + 1$, where $a, b, c$ are integers.
- Step 2: Write out the total sum expression: $(2a + 1) + (2b + 1) + (2c + 1)$.
- Step 3: Group the integer multiples of 2 together and sum the constants: $(2a + 2b + 2c) + (1 + 1 + 1) = (2a + 2b + 2c) + 3$.
- Step 4: Rewrite the constant 3 as $2 + 1$ so we can factor out 2 from all possible pairs: $2a + 2b + 2c + 2 + 1 = 2(a + b + c + 1) + 1$.
- Step 5: Interpret the result: the expression $2(amount) + 1$ represents an odd number. Verify with arithmetic: $13 + 25 + 19 = 57$, which is indeed odd.
REASONING: Adding three odd numbers results in an odd number because two of the odd numbers combine to make an even sum, and adding the third odd number to that even sum leaves a final remainder of 1.
ANSWER: The total number of seats is odd (57 seats).
## WORKED_EXAMPLE_3
PROBLEM: A farmer packs mangoes into boxes. Box X contains an even number of mangoes represented by $4k$, Box Y contains an odd number of mangoes represented by $2p + 1$, and Box Z contains another odd number represented by $2q + 1$. The farmer subtracts the mangoes in Box Y from the combined mangoes in Box X and Box Z. Determine whether the final quantity of mangoes is even or odd, and show all algebraic steps.
STEPS:
- Step 1: Define the quantities: Box X = $4k$ (even), Box Y = $2p + 1$ (odd), Box Z = $2q + 1$ (odd).
- Step 2: Set up the expression according to the problem statement (Box X plus Box Z, minus Box Y): $(4k + (2q + 1)) - (2p + 1)$.
- Step 3: Remove parentheses and distribute the negative sign carefully across Box Y: $4k + 2q + 1 - 2p - 1$.
- Step 4: Combine like terms and simplify the constants ($+1 - 1 = 0$): $4k + 2q - 2p$.
- Step 5: Factor out 2 from the entire simplified expression: $2(2k + q - p)$.
- Step 6: Interpret the result: since the entire expression is multiplied by 2, it is divisible by 2 with no remainder, proving the result is always even regardless of the values of $k, p,$ and $q$.
REASONING: Combining addition and subtraction of even and odd terms follows strict parity conservation laws; subtracting an odd number ($2p+1$) has the same parity effect as adding an odd number, ultimately balancing the parities out to an even result.
ANSWER: The final quantity of mangoes is always even.
## COMPETENCY_QUESTION_1
QUESTION: A game board has numbered tiles from 1 to 10. Rahul picks all the odd-numbered tiles and Sumit picks all the even-numbered tiles. Rahul adds his numbers together, and Sumit adds his numbers together. 
Part A: What is the parity of Rahul's sum? 
Part B: What is the parity of Sumit's sum? 
Part C: If Rahul adds his total sum to Sumit's total sum, what will be the parity of the grand total? Justify your answer using parity rules without computing the exact grand total.
COMPETENCY: Translating real-world situations to mathematical expressions and applying parity rules
STEPS:
- Step 1: Identify Rahul's numbers (all odd numbers between 1 and 10: 1, 3, 5, 7, 9) and count how many there are (5 odd numbers).
- Step 2: Identify Sumit's numbers (all even numbers between 1 and 10: 2, 4, 6, 8, 10) and determine the parity of their sum.
- Step 3: Apply the rule for an odd count of odd numbers (Part A): an odd quantity of odd numbers (5 odds) always sums to an odd number ($1+3+5+7+9 = 25$).
- Step 4: Apply the rule for even numbers (Part B): the sum of even numbers is always even ($2+4+6+8+10 = 30$).
- Step 5: Apply the rule for combining Rahul's odd sum (25) and Sumit's even sum (30) in Part C: $\text{Odd} + \text{Even} = \text{Odd}$.
ANSWER: Part A: Rahul's sum is odd (25). Part B: Sumit's sum is even (30). Part C: The grand total is odd (55), because adding an odd sum and an even sum always results in an odd number.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: Two students, Neha and Kabir, are analyzing the expression $(2x + 1) + (2y + 1) + 2z$, where $x, y, z$ are integers. Neha claims the expression always evaluates to an even number. Kabir claims that depending on whether $x$ and $y$ are even or odd, the expression can sometimes be odd. Who is correct? Provide a rigorous algebraic proof to support your verdict.
COMPETENCY: Comparing and justifying mathematical arguments with algebraic proof
STEPS:
- Step 1: Write down the given expression: $(2x + 1) + (2y + 1) + 2z$.
- Step 2: Group the variable terms and the constant terms together: $2x + 2y + 2z + 1 + 1$.
- Step 3: Simplify the constants ($1 + 1 = 2$): $2x + 2y + 2z + 2$.
- Step 4: Factor out 2 from all terms in the expression: $2(x + y + z + 1)$.
- Step 5: Analyze the factored expression: since every integer value multiplied by 2 yields an even number, and $(x + y + z + 1)$ is an integer, the entire expression is a multiple of 2 regardless of the individual values or parities of $x, y,$ and $z$. Conclude that Neha is correct.
ANSWER: Neha is correct. The algebraic simplification $2(x + y + z + 1)$ proves that the expression is a multiple of 2 for all possible integer values of $x, y,$ and $z$, meaning it is always an even number regardless of whether $x$ or $y$ are odd or even. Kabir's claim is false because the parities of $x$ and $y$ inside the parentheses do not alter the fact that the entire sum is multiplied by 2 on the outside.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The sum and difference rules for even and odd numbers describe ______ patterns in parity (whether a number is even or odd) when performing addition, such as the fact that the sum of two even numbers is always even, while the sum of an even and an odd number is always odd.

## DIAGNOSTIC_ANSWER_7
predictable

**A wrong answer (writing 'surprising') reveals the student broke the definition - the rules are described as predictable patterns in parity, the very word that makes them useful.**

Predictable is the definition's promise - the word that makes parity useful.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are organizing desks in your school ______ in rows of two, and you notice that if you have two rows with an even number of students and three rows with an odd number of students, will the total number of students be even or odd?

## DIAGNOSTIC_ANSWER_8
auditorium

**A wrong answer (writing 'classroom') reveals the student changed the venue - the desks are organised in the school auditorium, and the blank names that hall.**

The auditorium, not the classroom, holds the rows-of-two desks.

The auditorium, not the classroom, holds the rows-of-two desks in the walkthrough's opening scene.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
Can predict, justify, and algebraically prove the parity of the sum or difference of any combination of multiple even and odd integers, and apply these rules to solve number puzzles in real-world contexts.

**A wrong answer (guessing outcomes) reveals the student skipped the mastery's core - predict, justify and algebraically prove the parity of any sum or difference, then apply it to puzzles.**

Prove with 2n forms, then apply - the mastery's full pipeline.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Imagine you are ______ desks in your school auditorium in rows of two, and you notice that if you have two rows with an even number of students and three rows with an odd number of students, will the total number of students be even or odd?

## DIAGNOSTIC_ANSWER_10
organizing

**A wrong answer (writing 'counting') reveals the student drifted from the walkthrough's verb - you are organizing the desks in rows of two when the parity question arises.**

Organizing the desks is when the parity question presents itself.

