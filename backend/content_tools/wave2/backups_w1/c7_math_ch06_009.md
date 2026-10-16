## ELI5
'Think of a number, double it, add six, halve it, subtract your number - the answer is 3!' The trick works on everyone because algebra dissolves it: twice n plus six, halved, minus n - the n's cancel like sugar stirring out, leaving a fixed 3. A quantity that never changes through a game's moves is called an invariant, and number games are invariant machines. Write the steps as expressions, simplify honestly, and the magic confesses in one line.

## DEFINITION
Mathematical reasoning through number games involves analyzing the underlying rules, parity properties, and algebraic structures of arithmetic puzzles to prove why certain outcomes are guaranteed regardless of initial choices. It bridges empirical observation of number patterns with deductive logical proof.
## COGNITIVE_LEVEL
analyze
## MASTERY_CRITERIA
Can analyze a multi-step number game or puzzle, translate the actions into algebraic expressions, and construct a logical proof or explanation for why a specific invariant or outcome always occurs.
## SCOPE_BOUNDARY
Covers number games, magic squares, card tricks based on number properties, and algebraic deduction of divisibility or parity outcomes. Does NOT cover advanced number theory proofs (such as modular arithmetic modulo $n$ beyond basic remainder analysis or Fermat's Little Theorem) which belong to higher grades.
## WALKTHROUGH
Imagine you are playing a trick with your friend: "Think of a number, multiply it by 2, add 6, divide by 2, and subtract your original number. Your answer is 3!" How did you know without even seeing their number? To begin understanding this, we write down our steps using algebra, just like we learned when forming algebraic expressions in previous grades. We test our steps with concrete numbers, then replace the unknown number with a variable like $x$. By simplifying the expression step by step, the mystery disappears and reveals a mathematical identity. The key insight is that number games are not magic; they are hidden algebraic equations where operations cancel out or leave a predictable remainder.

**Takeaway:** number games hide invariants: translate each move into algebra, simplify, and the constant survives. **In the exam:** prove a trick by writing the expression for a general n and simplifying to the fixed outcome. **Check yourself:** run the friend-trick on two different numbers and confirm both land on the same answer. **Why students miss it:** they test one lucky number and announce the rule, never writing the algebra that proves it. Play the trick twice on paper with different numbers, and watch both land on the same unshakeable three.

## DIAGNOSTIC_QUESTION_1
What term is used in number puzzles to describe a quantity that does not change its value during a sequence of operations or game steps?
## DIAGNOSTIC_ANSWER_1
The correct term is an **invariant**. A student who answers "variable" or "constant" misunderstands the nature of invariants in problem-solving; a variable changes its value, whereas an invariant remains completely unchanged through every transformation of the game.
## DIAGNOSTIC_QUESTION_2
A friend claims that if you take any 3-digit number, reverse its digits, subtract the smaller number from the larger one, the resulting difference is always a multiple of 9. Why does this happen universally for any valid 3-digit choice?
## DIAGNOSTIC_ANSWER_2
Using place value representation, any 3-digit number can be written as $100a + 10b + c$, and its reverse is $100c + 10b + a$. Subtracting them yields $99(a - c)$, which is always a multiple of 9 because 99 is divisible by 9. A student who thinks it is a coincidence misses the fundamental connection between place value structure and algebraic subtraction.
## DIAGNOSTIC_QUESTION_3
Rahul plays a game where he starts with an unknown whole number $n$, multiplies it by 3, adds 12, divides the sum by 3, and finally subtracts his original number $n$. What is the final resulting number, and what is its value?
## DIAGNOSTIC_ANSWER_3
The final result is always **4**. 
Step 1: Start with $n$. 
Step 2: Multiply by 3 to get $3n$. 
Step 3: Add 12 to get $3n + 12$. 
Step 4: Divide the sum by 3 to get $\frac{3n + 12}{3} = n + 4$. 
Step 5: Subtract the original number $n$ to get $(n + 4) - n = 4$. 
A student who gets an answer containing $n$ made an error during the division step, failing to divide both terms in the numerator ($3n$ and $12$) by 3.
## DIAGNOSTIC_QUESTION_4
Analyze two number trick rules: Rule A says "Double a number, add 10, halve the result, and subtract the original number." Rule B says "Triple a number, subtract 6, divide by 3, and add 2." Compare their final outputs when starting with the same number $x$.
## DIAGNOSTIC_ANSWER_4
For Rule A: $\frac{2x + 10}{2} - x = x + 5 - x = 5$. For Rule B: $\frac{3x - 6}{3} + 2 = x - 2 + 2 = x$. Rule A always results in the constant 5 regardless of $x$, whereas Rule B always results in the original number $x$. A student who claims both yield the same constant failed to carry out the correct algebraic simplification in Rule B.
## DIAGNOSTIC_QUESTION_5
Evaluate the following student proof for a number game: "To prove the sum of any three consecutive integers is always divisible by 3, let the numbers be $x$, $x+1$, and $x+2$. Their sum is $x + (x+1) + (x+2) = 3x + 3$. Since 3 divides both $3x$ and 3, the sum is divisible by 3." Is this reasoning valid? Justify your evaluation.
## DIAGNOSTIC_ANSWER_5
The reasoning is completely **valid**. The student correctly translated consecutive integers into algebraic form, combined like terms to get $3x + 3$, and factored out 3 as $3(x + 1)$, proving that 3 is a factor of the sum. A student who claims it is invalid likely does not understand how factoring demonstrates divisibility.
## DIAGNOSTIC_QUESTION_6
Design a new 4-step number trick game starting with an unknown integer $x$ such that the final output is always equal to twice the original number plus 5, regardless of what integer the player chooses.
## DIAGNOSTIC_ANSWER_6
An acceptable game design: 
1. Think of a number $x$. 
2. Multiply it by 4 (gives $4x$). 
3. Add 10 (gives $4x + 10$). 
4. Divide the entire result by 2 (gives $\frac{4x + 10}{2} = 2x + 5$). 
5. The final output is $2x + 5$. 
A poor answer would feature random operations that leave $x$ trapped or do not simplify neatly into a linear expression of $x$.
## COMMON_MISCONCEPTION
When analyzing number tricks with division, students frequently divide only the first term of an algebraic expression by the denominator and forget to divide the second term. For example, when simplifying $\frac{4x + 12}{4}$, a student writes $x + 12$ instead of $x + 3$, completely breaking the algebraic proof of the game.
## ON_FAILURE
Write out the expression as two separate fractions using the distributive property of division over addition: $\frac{4x + 12}{4} = \frac{4x}{4} + \frac{12}{4}$. Explicitly ask the student to simplify each fraction separately: $\frac{4x}{4} = x$ and $\frac{12}{4} = 3$, giving $x + 3$. Remind them that a denominator divides every term in the numerator.
## PREREQUISITE_NODE_IDS
c7_math_ch06_001, c7_math_ch06_002, c7_math_ch06_006, c6_math_ch05_055, c6_math_ch05_057
## PREREQUISITE_REASONS
c7_math_ch06_001: requires interpreting number sequences and relational steps.
c7_math_ch06_002: requires understanding parity properties used in advanced game proofs.
c7_math_ch06_006: requires translating word puzzles into algebraic expressions.
c6_math_ch05_055: requires simplifying algebraic expressions by combining like terms.
c6_math_ch05_057: requires solving linear equations step by step.
## FORWARD_NODE_IDS
c7_math_ch06_007
## FORWARD_REASONS
c7_math_ch06_007: uses parity and algebraic reasoning arguments to solve complex spatial and numeric problem-solving scenarios.
## CROSS_SUBJECT_PREREQS
c6_math_ch05_056, c6_math_ch01_014
## CROSS_SUBJECT_REASONS
c6_math_ch05_056: linear equations provide the fundamental equality framework for checking number game rules.
c6_math_ch01_014: divisibility rules underpin algebraic proofs of number game outcomes.
## CHAIN_DESCRIPTION
c7_math_ch06_006 -> c7_math_ch06_009 -> c7_math_ch06_007
## THIS_FORMULA
\text{Output} = \frac{a \cdot x + b}{c} - x = \text{Invariant Result}
## FORMULA_VARIABLES
x = original chosen number; a, b, c = constant integer parameters chosen for the game rules.
## FORMULA_UNITS
dimensionless
## COMPUTATION_TYPE
algebraic
## CROSS_SUBJECT
c7_math_ch06_006 | uses digit manipulation and logic puzzles to build algebraic reasoning.
c7_math_ch06_002 | uses even and odd number properties to establish invariant parity games.
## PREREQ_CONCEPT
Algebraic simplification and expression formation.
## PREREQ_BEFORE
Students must be able to form algebraic expressions from word descriptions and simplify terms using distributive properties.
## PREREQ_STUCK
Review simplifying algebraic expressions and division distribution over addition.
## WORKED_EXAMPLE_1
PROBLEM: Priya plays a number game: "Choose a number, multiply it by 5, add 20, divide the sum by 5, and then subtract 4 from the result." Prove algebraically what the final number will always be, and calculate the output if Priya starts with the number 12.

STEPS:
- Step 1: Let the chosen starting number be represented by the variable $x$.
- Step 2: Translate each instruction into an algebraic expression:
  - Multiply by 5: $5x$
  - Add 20: $5x + 20$
  - Divide the sum by 5: $\frac{5x + 20}{5}$
  - Subtract 4: $\frac{5x + 20}{5} - 4$
- Step 3: Simplify the algebraic fraction by dividing each term in the numerator by the denominator 5:
  $\frac{5x}{5} + \frac{20}{5} - 4 = x + 4 - 4$
- Step 4: Combine like terms to find the final simplified expression:
  $x + 4 - 4 = x$
- Step 5: Substitute Priya's starting number $x = 12$ into the final expression:
  Final Output = $12$

REASONING: By turning every instruction into an algebraic step, we simplify the expression and discover that the operations completely neutralize the added and subtracted constants, leaving exactly the original number $x$. Thus, whatever number Priya chooses, the game always gives back that exact same number.
ANSWER: The final output is always the original number; for $x = 12$, the answer is 12.
## WORKED_EXAMPLE_2
PROBLEM: A magic trick in a math club goes like this: "Think of a 2-digit number where the tens digit is $t$ and the units digit is $u$. Reverse the digits to form a new number. Add the original number and the reversed number together, then divide the sum by the sum of the original digits $(t + u)$." Prove what the result will always be.

STEPS:
- Step 1: Express the original 2-digit number using place value expansion:
  $\text{Original Number} = 10t + u$
- Step 2: Express the reversed number using place value expansion:
  $\text{Reversed Number} = 10u + t$
- Step 3: Add the original and reversed numbers together and simplify:
  $\text{Sum} = (10t + u) + (10u + t) = 11t + 11u = 11(t + u)$
- Step 4: Divide this sum by the sum of the digits $(t + u)$:
  $\text{Result} = \frac{11(t + u)}{t + u}$
- Step 5: Cancel the common factor $(t + u)$ (assuming $t + u \neq 0$):
  $\text{Result} = 11$

REASONING: Place value representation allows us to see the hidden algebraic structure of numbers. When we add a 2-digit number to its reverse, the sum is always a multiple of 11, which when divided by the sum of the digits always yields 11.
ANSWER: The final result is always 11 regardless of the chosen 2-digit number.
## WORKED_EXAMPLE_3
PROBLEM: Amit designs a coin game. He starts with a secret number of rupees $x$. He triples the amount, adds 15 rupees, multiplies the new total by 2, divides by 6, and finally subtracts the original amount $x$ plus 3. What is the final amount of rupees he has left?

STEPS:
- Step 1: Define the initial amount of rupees as $x$.
- Step 2: Translate each rule into algebraic steps sequentially:
  - Triple the amount: $3x$
  - Add 15 rupees: $3x + 15$
  - Multiply by 2: $2(3x + 15) = 6x + 30$
  - Divide by 6: $\frac{6x + 30}{6}$
- Step 3: Simplify the division expression:
  $\frac{6x}{6} + \frac{30}{6} = x + 5$
- Step 4: Subtract the original amount $x$ plus 3 from this result:
  $(x + 5) - (x + 3)$
- Step 5: Remove parentheses and simplify by combining like terms:
  $x + 5 - x - 3 = (x - x) + (5 - 3) = 2$

REASONING: By carefully following the order of operations and expanding expressions using the distributive property, complex multi-step rules simplify drastically. Even though the game involves multiple multiplication and division steps, the variables cancel out completely, leaving a constant invariant of 2 rupees.
ANSWER: 2 rupees
## COMPETENCY_QUESTION_1
QUESTION: A card game rulesheet states: "Pick a number from 1 to 50, add 7, multiply by 2, subtract 4, divide by 2, and subtract your original number." A student calculates their final result as 8 and claims they made a calculation mistake because the answer should always be 5. Verify the student's work step-by-step, identify the exact error in their reasoning, and determine the true constant outcome.
COMPETENCY: Error identification and algebraic verification
STEPS:
- Step 1: Let the chosen number be $x$.
- Step 2: Write out the sequence of operations algebraically: add 7 ($x+7$), multiply by 2 ($2(x+7) = 2x+14$), subtract 4 ($2x+14-4 = 2x+10$), divide by 2 ($\frac{2x+10}{2} = x+5$), subtract original number ($x+5-x$).
- Step 3: Simplify the final expression to find the invariant.
- Step 4: Compare with the student's result to find the discrepancy.
ANSWER: The true final outcome is **5**. The student incorrectly evaluated the division or subtraction step, as the algebraic simplification yields $(x + 5) - x = 5$, meaning the answer is independent of the starting number and is indeed 5.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: Two students create competing number games. 
Game 1: Choose $x$, multiply by 4, add 12, divide by 2, subtract twice the original number.
Game 2: Choose $x$, add 8, multiply by 3, subtract 24, divide by 3.
Which game produces a final output that depends on the chosen starting number $x$, and what does the other game produce? Justify your answer with complete algebraic proofs for both games.
COMPETENCY: Comparing and justifying mathematical structures
STEPS:
- Step 1: Formulate the algebraic expression for Game 1 and simplify it completely.
- Step 2: Formulate the algebraic expression for Game 2 and simplify it completely.
- Step 3: Compare the final simplified forms of both games.
- Step 4: Conclude which game depends on $x$ and which produces a constant.
ANSWER: For Game 1: $\frac{4x + 12}{2} - 2x = 2x + 6 - 2x = 6$ (Constant output). For Game 2: $\frac{3(x + 8) - 24}{3} = \frac{3x + 24 - 24}{3} = \frac{3x}{3} = x$ (Output depends on $x$). Therefore, Game 2 depends on the starting number $x$, while Game 1 always results in the constant 6.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: ______ reasoning through number games involves analyzing the underlying rules, parity properties, and algebraic structures of arithmetic puzzles to prove why certain outcomes are guaranteed regardless of initial choices.

## DIAGNOSTIC_ANSWER_7
Mathematical

**A wrong answer (writing 'Logical') reveals the student missed the title's modifier - the definition opens with Mathematical reasoning through number games, and the blank asks for that adjective.**

Mathematical is the modifier the definition itself chose for reasoning through games.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are playing a trick with your friend: "Think of a number, ______ it by 2, add 6, divide by 2, and subtract your original number.

## DIAGNOSTIC_ANSWER_8
multiply

**A wrong answer (writing 'divide') reveals the student mixed the trick's order - the walkthrough doubles the number first, and the blank asks for that operation.**

The trick's first move is to multiply by 2 - the walkthrough's own order.

The trick's first move is to multiply by 2, then add 6 - the walkthrough's own order of operations for the disappearing number.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Your answer is ______!" How did you know without even seeing their number?

## DIAGNOSTIC_ANSWER_9
3

**A wrong answer (any other result) reveals the student lost the punchline - the friend-trick always lands on 3, the invariant the algebra reveals.**

Three is the invariant the whole trick exists to deliver.

Three is the invariant the entire trick exists to deliver - every friend, every number, the same guaranteed answer every time.

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
Can analyze a multi-step number game or puzzle, translate the actions into algebraic expressions, and construct a logical proof or explanation for why a specific invariant or outcome always occurs.

**A wrong answer (guessing the outcome) reveals the student skipped the proof** - translate each move of the game into algebra and show the invariant holds every round, which is the mastery the topic demands.

