## ELI5
Line the school up in rows of two for assembly: no leftover student means the count is even; one child standing alone means odd. That leftover is the entire secret - algebra writes every even number as 2n and every odd as 2n plus 1. Parity then predicts sums and products without computing: even plus even stays even, odd plus odd becomes even, and any odd factor makes the product odd. Watch the last digit - 0, 2, 4, 6, 8 are even - and zero itself counts as even.

## DEFINITION
Even numbers are integers divisible by $2$ (ending in $0, 2, 4, 6, 8$), while odd numbers are integers not divisible by $2$ (ending in $1, 3, 5, 7, 9$). Algebraically, any even number can be represented as $2n$ and any odd number as $2n + 1$ (where $n$ is an integer).
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
Can classify large numbers, algebraic expressions, and operational outcomes as even or odd using parity properties, and can prove general statements about sums and products of even/odd numbers using algebraic representation ($2n$ and $2n+1$).
## SCOPE_BOUNDARY
Covers the definition, properties, and algebraic representation of even and odd numbers in the set of integers ($\mathbb{Z}$). It does not cover modular arithmetic formally, but relies on divisibility by $2$ established in prior integer and factor units.
## WALKTHROUGH
Imagine you are organizing students into rows for the school assembly in Delhi. If every row has exactly $2$ students, you will never have a leftover student; the total count of students is even. But if every row has $2$ students and one row has a leftover student standing alone, the total count is odd. In Class 6, you learned about factors, multiples, and divisibility rules, noting that numbers ending in $0, 2, 4, 6, 8$ are multiples of $2$. Now, in Class 7, we take this further by using algebra to explore parity—the "evenness" or "oddness" of numbers—allowing us to predict the parity of large calculations and complex expressions without doing the full math. The key insight is that any even integer can be written as $2n$ and any odd integer as $2n + 1$.

**Takeaway:** even means divisible by two (form 2n); odd means one leftover (form 2n + 1); the last digit decides instantly. **In the exam:** prove parity claims by writing 2n forms and simplifying, not by testing lucky examples. **Check yourself:** sort the roll numbers of your row into even and odd by last digit alone. **Why students miss it:** they exile zero from the evens or carry addition rules into products untested.

## DIAGNOSTIC_QUESTION_1
Which of the following integers is an odd number: $-45$, $0$, $102$, or $338$?
## DIAGNOSTIC_ANSWER_1
$-45$ is the correct answer. Students who choose $0$ often confuse zero with odd numbers or think it has no parity, while students who choose $102$ or $338$ confuse the last digit's divisibility rules or forget that negative numbers also possess parity based on divisibility by $2$.
## DIAGNOSTIC_QUESTION_2
Explain why the sum of any two odd numbers is always an even number using algebraic expressions.
## DIAGNOSTIC_ANSWER_2
Let the two odd numbers be $2a + 1$ and $2b + 1$. Their sum is $(2a + 1) + (2b + 1) = 2a + 2b + 2 = 2(a + b + 1)$, which has a factor of $2$ and is therefore even. A student who answers incorrectly often tries to test only a single pair of numbers like $3 + 5 = 8$ without realizing that algebraic proof guarantees the rule for all possible integers.
## DIAGNOSTIC_QUESTION_3
If $x$ is an odd integer, what is the parity of the expression $3x + 5$? Show your calculation.
## DIAGNOSTIC_ANSWER_3
The expression evaluates to an even number. 
Step 1: Substitute $x = 2n + 1$ into the expression.
Step 2: $3(2n + 1) + 5 = 6n + 3 + 5$.
Step 3: Combine like terms: $6n + 8$.
Step 4: Factor out $2$: $2(3n + 4)$. Since it is a multiple of $2$, the result is even. 
Students who miscalculate often substitute numbers incorrectly or fail to distribute the coefficient $3$ to both terms inside the parentheses.
## DIAGNOSTIC_QUESTION_4
Compare the parity of $product = (2n)(2m)$ versus $product = (2n+1)(2m+1)$ for any integers $n$ and $m$. What pattern do you observe about the product of two even numbers versus two odd numbers?
## DIAGNOSTIC_ANSWER_4
The product of two even numbers is $4nm = 2(2nm)$, which is always even. The product of two odd numbers is $(2n+1)(2m+1) = 4nm + 2n + 2m + 1 = 2(2nm + n + m) + 1$, which is always odd. A student who struggles here fails to expand algebraic brackets correctly or mixes up addition rules with multiplication rules for parity.
## DIAGNOSTIC_QUESTION_5
A student claims that "the sum of three consecutive integers is always divisible by $6$." Evaluate this claim using parity properties.
## DIAGNOSTIC_ANSWER_5
The claim is false. Let the three consecutive integers be $n, n+1, n+2$. Their sum is $3n + 3 = 3(n+1)$. While this sum is always a multiple of $3$, it is not always divisible by $6$. For example, if $n=1$, the sum is $1 + 2 + 3 = 6$ (divisible by $6$), but if $n=2$, the sum is $2 + 3 + 4 = 9$ (not divisible by $6$, because $9$ is odd). A student who judges the claim as true likely checked only one example and confused divisibility by $3$ with divisibility by $6$.
## DIAGNOSTIC_QUESTION_6
Construct a linear algebraic expression in variable $x$ whose value is guaranteed to be odd for any integer value of $x$. Explain why your expression works.
## DIAGNOSTIC_ANSWER_6
An example is $2x^2 + 4x + 7$. Explanation: $2x^2 + 4x = 2(x^2 + 2x)$, which is always even because it is a multiple of $2$. Adding $7$ (an odd number) to an even number always yields an odd number. A weak answer provides a simple number like "13" or uses an expression like $x + 1$ without accounting for all integer types or fails to prove it algebraically.
## COMMON_MISCONCEPTION
Students often assume that rules for adding even and odd numbers apply identically to multiplication, or they confuse the results of operations. Specifically, students frequently state that the product of two odd numbers is an even number because they incorrectly add the terms mentally or think "odd times odd equals even" due to mixing up addition rules ($odd + odd = even$) with multiplication rules ($odd \times odd = odd$). For example, they might claim $3 \times 5 = 15$ is even because both factors are odd and they tried to add them ($3+5=8$).
## ON_FAILURE
Remind the student to test concrete small numbers first and write out arrays or groupings. Show them that $3 \times 5$ means three groups of five objects, where each group has an odd number of items, leaving a leftover item in each group that cannot be paired evenly. Then, guide them to write out the algebraic forms: let one number be $2a+1$ and the other be $2b+1$, and multiply them step-by-step: $(2a+1)(2b+1) = 4ab + 2a + 2b + 1 = 2(2ab + a + b) + 1$, emphasizing that the "+ 1" at the end guarantees it is odd.
## PREREQUISITE_NODE_IDS
c6_math_ch01_013, c6_math_ch01_014, c6_math_ch05_052, c6_math_ch05_053
## PREREQUISITE_REASONS
c6_math_ch01_013: factors and multiples form the foundation of understanding divisibility by 2.
c6_math_ch01_014: divisibility rules are required to identify even and odd numbers by their final digits.
c6_math_ch05_052: variables and constants are necessary to express even and odd numbers algebraically as $2n$ and $2n+1$.
c6_math_ch05_053: algebraic terms and coefficients are needed to manipulate expressions containing variables representing integers.
## FORWARD_NODE_IDS
c7_math_ch06_003, c7_math_ch06_007, c7_math_ch06_004, c7_math_ch06_006, c7_math_ch06_009, c8_math_ch1_2, c8_math_ch1_3, c8_math_ch1_5, c8_math_ch1_6, c8_math_ch5_1, c8_math_ch5_2, c8_math_ch5_3, c8_math_ch5_4, c8_math_ch5_5, c8_math_ch5_7
## FORWARD_REASONS
c7_math_ch06_003: understanding basic even and odd properties is essential for deriving rules for the sums of mixed even and odd numbers.
c7_math_ch06_007: parity arguments in problem solving rely entirely on knowing whether quantities are even or odd.
c7_math_ch06_004: requires understanding even and odd number properties often found in symmetrical grids.
c7_math_ch06_006: Even and odd parity properties help eliminate impossible digit combinations in puzzles.
c7_math_ch06_009: requires understanding parity properties used in advanced game proofs.
c8_math_ch1_2: Even and odd number properties — underpins why exponents must be even.
c8_math_ch1_3: parity (even/odd) helps predict whether the square is even/odd, a related pattern.
c8_math_ch1_5: Parity concepts (odd/even) are essential to identify and generate consecutive odd numbers.
c8_math_ch1_6: Understanding even/odd parity is essential for generating and tracking the odd-number sequence correctly.
c8_math_ch5_1: Understanding even/odd parity is essential to analyse sums of consecutive numbers.
c8_math_ch5_2: Parity (even/odd) reasoning is needed to analyze the factors k and (2a+k-1).
c8_math_ch5_3: understanding even/odd properties is essential for parity reasoning.
c8_math_ch5_4: reinforces even/odd parity properties
c8_math_ch5_5: Introduces even/odd classification and basic parity properties
c8_math_ch5_7: Establishes basic concept of even/odd numbers and their properties.

## CROSS_SUBJECT_PREREQS
c6_math_ch05_052
## CROSS_SUBJECT_REASONS
c6_math_ch05_052: uses algebraic variables to represent unknown integer quantities in generalized proofs.
## CHAIN_DESCRIPTION
c6_math_ch01_014 -> c7_math_ch06_002 -> c7_math_ch06_003
## THIS_FORMULA
Even: $2n$, Odd: $2n + 1$ (where $n \in \mathbb{Z}$)
## FORMULA_VARIABLES
n = any integer
## FORMULA_UNITS
dimensionless
## COMPUTATION_TYPE
algebraic
## CROSS_SUBJECT

## PREREQ_CONCEPT
Divisibility by 2 and algebraic expression building.
## PREREQ_BEFORE
Students must be able to identify multiples of 2 and construct basic algebraic expressions with coefficients.
## PREREQ_STUCK
Review c6_math_ch01_014 for divisibility rules and c6_math_ch05_052 for variables.
## WORKED_EXAMPLE_1
PROBLEM: A school in Jaipur has a total of $x$ students, where $x$ is an odd number. If each student is given $3$ notebooks, will the total number of notebooks distributed be even or odd? Prove your answer algebraically.

STEPS:
- Step 1: Define the given variable. Let the number of students be $x = 2n + 1$, where $n$ is an integer, because $x$ is given to be odd.
- Step 2: Set up the algebraic expression for the total number of notebooks, which is $3 \times x$.
- Step 3: Substitute the expression for $x$ into the product: $3(2n + 1)$.
- Step 4: Expand the brackets using distributive property: $3(2n) + 3(1) = 6n + 3$.
- Step 5: Rewrite $6n + 3$ to isolate a factor of $2$ for parity testing: $6n + 2 + 1 = 2(3n + 1) + 1$. Since any integer multiplied by $2$ and then increased by $1$ is odd, the total number of notebooks is odd.

REASONING: Multiplying an odd number of students by an odd number of notebooks per student results in an odd total product. By expressing $x$ as $2n+1$ and expanding algebraically, we prove that a remainder of $1$ always exists when divided by $2$.

ANSWER: The total number of notebooks is odd.
## WORKED_EXAMPLE_2
PROBLEM: Ritu adds three numbers: an even number, an odd number, and another even number. Is her final sum even or odd? Demonstrate using algebraic variables.

STEPS:
- Step 1: Define algebraic representations for the three numbers. Let the first even number be $2a$, the odd number be $2b + 1$, and the second even number be $2c$, where $a, b, c$ are integers.
- Step 2: Formulate the sum of these three numbers: Sum $= (2a) + (2b + 1) + (2c)$.
- Step 3: Rearrange the terms using the commutative and associative properties of addition: Sum $= 2a + 2b + 2c + 1$.
- Step 4: Factor out $2$ from all the even terms: Sum $= 2(a + b + c) + 1$.
- Step 5: Interpret the final expression. Because the expression is in the form $2(\text{integer}) + 1$, the sum is unconditionally odd.

REASONING: The sum of two evens is even, and adding an odd number to that even sum changes the parity to odd. Algebraically grouping the common factor of $2$ confirms that a single unit remains unpartnered.

ANSWER: The final sum is odd.
## WORKED_EXAMPLE_3
PROBLEM: A farmer in Kerala harvests $N$ coconuts, where $N$ is an even number. He packs them into boxes of $4$ coconuts each, with no coconuts left over. He then gives away $1$ box. Prove algebraically whether the remaining number of coconuts in total is even or odd.

STEPS:
- Step 1: Express the total number of coconuts. Since $N$ is a multiple of $4$ (as they pack into boxes of $4$ with zero remainder), let $N = 4k$, where $k$ is an integer. (Note: Any multiple of $4$ is also even).
- Step 2: Determine the number of coconuts in $1$ box that is given away: $4$ coconuts.
- Step 3: Write the expression for the remaining coconuts: Remaining $= N - 4 = 4k - 4$.
- Step 4: Factor out $2$ to check the parity of the remaining amount: $2(2k - 2)$. 
- Step 5: Since the expression is a multiple of $2$ with no added $1$, the remaining number of coconuts is strictly even.

REASONING: Subtracting an even number ($4$) from another even number ($4k$) always yields an even result. Factoring out $2$ shows that the remaining quantity is completely divisible by $2$.

ANSWER: The remaining number of coconuts is even.
## COMPETENCY_QUESTION_1
QUESTION: Two students are debating about integer properties. Student A claims: "If you square any odd number, the result is always odd." Student B claims: "If you square any even number, the result is always a multiple of $4$." Validate both claims using algebraic proofs and give a numerical example for each.

COMPETENCY: Translating real-world and verbal statements into algebraic proofs and justifying mathematical claims.
STEPS:
- Step 1: Represent an odd number as $2n + 1$ and an even number as $2m$.
- Step 2: Square the odd number: $(2n + 1)^2 = 4n^2 + 4n + 1 = 2(2n^2 + 2n) + 1$, which is odd. Example: $5^2 = 25$ (odd).
- Step 3: Square the even number: $(2m)^2 = 4m^2$, which has $4$ as a factor and is therefore a multiple of $4$. Example: $6^2 = 36$ (multiple of $4$).
- Step 4: Conclude that both Student A and Student B are correct based on algebraic expansion.

ANSWER: Both statements are correct. Squaring an odd number yields an algebraic form $2(2n^2+2n)+1$ (odd), and squaring an even number yields $4m^2$ (a multiple of $4$).
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: In a circular seating arrangement at a cultural festival in Kolkata, $n$ chairs are placed in a circle. Some chairs are occupied by dancers. If the number of occupied chairs is an odd number, and every time a dancer stands up, they switch places with an empty chair across the circle (which preserves parity of total occupied seats), explain why it is impossible for all dancers to end up sitting next to only empty chairs such that every occupied chair is paired with an adjacent empty chair in a strict alternating pattern of even total count. Use parity reasoning to justify your answer.

COMPETENCY: Parity argument application and logical reasoning in complex structural constraints.
STEPS:
- Step 1: Identify that an alternating pattern of occupied and unoccupied seats around a closed circle requires the total number of chairs to be even (one occupied, one empty, alternating).
- Step 2: Note that the problem states the number of occupied chairs is odd.
- Step 3: Analyze the cyclic property: in any valid strict alternating pattern around a loop, the count of elements in one state must equal the count of elements in the other state, meaning the total count must be even ($2k$).
- Step 4: Conclude that an odd number of occupied chairs cannot form an equal alternating cycle with empty chairs without violating fundamental parity rules of closed loops.

ANSWER: It is impossible because a strict alternating pattern around a closed loop requires an even total number of elements, which contradicts having an odd number of occupied chairs.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you are organizing students into rows for the ______ assembly in Delhi.

## DIAGNOSTIC_ANSWER_7
school

**A wrong answer (writing 'class') reveals the student lost the setting - the walkthrough organises students for the school assembly in Delhi, and the blank names that event.**

The rows-of-two drill happens for the school assembly - the blank's event.

## DIAGNOSTIC_QUESTION_8
What common mix-up does this lesson flag about Even numbers?

## DIAGNOSTIC_ANSWER_8
Students often assume that rules for adding even and odd numbers apply identically to multiplication, or they confuse the results of operations.

**A wrong answer (ignoring the flagged mix-up) reveals the student overlooked the lesson's caution - addition rules for even and odd do not transfer blindly to multiplication, and mixing the two births wrong predictions.**

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Imagine you are ______ students into rows for the school assembly in Delhi.

## DIAGNOSTIC_ANSWER_9
organizing

**A wrong answer (writing 'arranging') reveals the student swapped near-neighbours - the walkthrough's verb for lining up students in rows is organizing, and the blank asks for it.**

Organizing is the walkthrough's verb for lining up the rows.

