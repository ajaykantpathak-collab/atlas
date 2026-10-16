## ELI5
Arrange 5 different books on a shelf: 5 choices for the first slot, then 4, 3, 2, 1 - the product 5 × 4 × 3 × 2 × 1 earns its shorthand 5!, read five factorial. Formally, n! multiplies every positive integer from 1 to n, counting arrangements of n distinct objects in a line. The recursion n! = n × (n-1)! powers every simplification, and the convention 0! = 1 anchors the empty arrangement: exactly one way to arrange nothing.

## DEFINITION
For any non-negative integer \(n\), the factorial notation \(n!\) (read as "n factorial") is defined as the product of all positive integers from 1 to \(n\):  
\(n! = n \times (n-1) \times (n-2) \times \cdots \times 3 \times 2 \times 1\).  
By convention, \(0! = 1\). This notation compactly represents the number of ways to arrange \(n\) distinct objects in a line.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can evaluate factorial expressions for given integers, simplify algebraic expressions involving factorials (e.g., \(\frac{n!}{(n-2)!}\)), and explain why \(0! = 1\) using the combinatorial interpretation of arranging zero objects.

## SCOPE_BOUNDARY
This node covers the definition, evaluation, and algebraic manipulation of factorial notation for non-negative integers up to the needs of permutations and combinations. It does NOT cover extensions like the gamma function for non-integer arguments, Stirling's approximation, or factorials of negative numbers.

## WALKTHROUGH
Imagine you are arranging 5 different books on a shelf. The first position has 5 choices, the second has 4 remaining choices, then 3, 2, and 1. The total arrangements are \(5 \times 4 \times 3 \times 2 \times 1\). Writing this product every time is tedious, so mathematicians introduced the shorthand \(5!\). Start by writing the product for small numbers like \(3!\) and \(4!\) to see the pattern. Then connect to the Fundamental Principle of Counting (c11_math_cbse_07_001): if there are \(n\) distinct tasks done in sequence with decreasing choices, the total ways is \(n!\). The key insight is that \(n! = n \times (n-1)!\), a recursive property that simplifies algebraic fractions involving factorials.

Takeaway: mastery means evaluating factorials, simplifying ratios like n!/(n-2)! by cancellation, and defending 0! = 1 combinatorially - exactly one arrangement of the empty shelf. Exam moves: evaluate-and-simplify questions and justify-0-equals-1 items. Check yourself: n!/(n-2)! collapses to n(n-1) - cancel the tail, keep the head. Students miss it because they expand the whole product, when the definition's recursive property is the shortcut: factorial ratios are telescoping agreements, not multiplication contests.

The exclamation mark is a contract: multiply down to one, and let recursion pay the bills.

## DIAGNOSTIC_QUESTION_1
Write the value of \(6!\) and explain in one sentence what the notation means.

## DIAGNOSTIC_ANSWER_1
\(6! = 720\). The notation \(6!\) means the product of all positive integers from 1 to 6. A wrong answer like \(6! = 6 \times 5 = 30\) reveals the student thinks factorial stops at 2 or multiplies only two numbers. An answer of \(6! = 6 \times 5 \times 4 \times 3 \times 2\) (missing 1) shows they forget the identity factor 1, which matters for algebraic simplification later.

## DIAGNOSTIC_QUESTION_2
Why is \(0!\) defined as 1? Use the arrangement interpretation to justify.

## DIAGNOSTIC_ANSWER_2
There is exactly 1 way to arrange zero objects: do nothing (the empty arrangement). A wrong answer like "\(0! = 0\) because zero times anything is zero" reveals the student is applying multiplication rules incorrectly to an empty product. Another wrong answer "\(0!\) is undefined" shows they haven't grasped the combinatorial basis that makes the recursive formula \(n! = n \times (n-1)!\) work for \(n=1\).

## DIAGNOSTIC_QUESTION_3
Simplify the expression \(\frac{10!}{8!}\) without calculating the full factorials.

## DIAGNOSTIC_ANSWER_3
\(\frac{10!}{8!} = \frac{10 \times 9 \times 8!}{8!} = 10 \times 9 = 90\). A wrong answer like \(10! / 8! = (10/8)! = 1.25!\) reveals the misconception that factorial distributes over division. Another error: expanding both fully as \(3628800 / 40320\) and then dividing shows they miss the cancellation shortcut, leading to arithmetic mistakes with large numbers.

## DIAGNOSTIC_QUESTION_4
Compare the growth of \(n!\) and \(2^n\) for \(n = 1, 2, 3, 4, 5\). At which \(n\) does \(n!\) first exceed \(2^n\), and why does factorial eventually grow faster?

## DIAGNOSTIC_ANSWER_4
\(1! = 1, 2^1 = 2\); \(2! = 2, 2^2 = 4\); \(3! = 6, 2^3 = 8\); \(4! = 24, 2^4 = 16\). So \(n=4\) is the first where \(n! > 2^n\). Factorial grows faster because each step multiplies by an increasing integer \(n\), while \(2^n\) always multiplies by 2. A wrong answer claiming \(2^n\) always grows faster reveals the student thinks exponential with base >1 always dominates, not recognizing that the multiplying factor in \(n!\) itself increases.

## DIAGNOSTIC_QUESTION_5
A student writes \(\frac{(n+2)!}{n!} = (n+2)(n+1)n! / n! = (n+2)(n+1)\). Another student writes \(\frac{(n+2)!}{n!} = (n+2)! / n! = (n+2)/n \times (n-1)!\)? Wait, the second student simplifies to \(\frac{n+2}{n} \times (n-1)!\). Identify the error in the second student's work and correct it.

## DIAGNOSTIC_ANSWER_5
The second student incorrectly "cancels" the factorial symbol as if it were a variable, treating \((n+2)! / n!\) like \(\frac{n+2}{n}\). The correct simplification uses \((n+2)! = (n+2)(n+1)n!\), giving \((n+2)(n+1)\). The error reveals the misconception that factorial is a multiplicative factor that can be partially cancelled, rather than a function notation.

## DIAGNOSTIC_QUESTION_6
Create a real-world problem (using Indian context: rupees, items, people) that requires calculating \(7!\) and explain why the answer is \(7!\) and not \(7^7\) or \(7 \times 6\).

## DIAGNOSTIC_ANSWER_6
Example: "In how many ways can 7 different books be arranged on a shelf?" Answer: \(7! = 5040\). The first book has 7 choices, second 6, etc., down to 1. Using \(7^7\) would imply each position has 7 independent choices (repetition allowed), and \(7 \times 6\) only counts ways to fill the first two positions. A poor problem might ask "How many ways to choose 2 books from 7?" which uses combinations, not factorial directly, showing confusion between permutations and combinations.

## COMMON_MISCONCEPTION
Students treat the factorial symbol "!" as an algebraic factor that can be cancelled partially, e.g., writing \(\frac{(n+1)!}{n!} = n+1\) correctly but then writing \(\frac{(n+2)!}{n!} = \frac{n+2}{n}\) by "cancelling the !". They see the notation as a variable multiplier rather than a function. For instance, they might simplify \(\frac{5!}{3!}\) as \(\frac{5}{3}\) instead of \(5 \times 4 = 20\). This stems from misreading \(n!\) as \(n \times !\) where "!" is a constant.

## ON_FAILURE
1. Write out the expanded form: \((n+2)! = (n+2)(n+1)n(n-1)\cdots 1\) and \(n! = n(n-1)\cdots 1\).  
2. Visually cancel the common tail \(n(n-1)\cdots 1\) leaving \((n+2)(n+1)\).  
3. Practice with numeric examples: \(\frac{7!}{5!} = \frac{7 \times 6 \times 5!}{5!} = 42\).  
4. Emphasize: "!" is not a number; it is a postfix operator meaning 'multiply down to 1'. Always expand one factorial until the other appears as a factor.

## PREREQUISITE_NODE_IDS
c11_math_cbse_07_001, c6_math_ch01_010, c7_math_ch02_002, c8_math_ch2_3
## PREREQUISITE_REASONS
c11_math_cbse_07_001: Fundamental Principle of Counting provides the multiplicative reasoning that factorial notation compactly represents.  
c6_math_ch01_010: Multiplication of large numbers builds fluency with the products that factorials represent.  
c7_math_ch02_002: Evaluating arithmetic expressions with order of operations is needed to compute factorial values correctly.  
c8_math_ch2_3: Exponential notation (base and exponent) helps distinguish \(n!\) from \(n^n\) or \(a^n\).

## FORWARD_NODE_IDS
c11_math_cbse_07_003, c11_math_cbse_07_004, c11_math_cbse_07_007, c11_math_cbse_07_008, c11_math_cbse_07_005, c11_math_cbse_07_009, c11_math_cbse_07_011, c12_cs_cbse_09_011, c12_ip_cbse_07_002

## FORWARD_REASONS
c11_math_cbse_07_003: Permutations formula \(^nP_r = \frac{n!}{(n-r)!}\) directly uses factorial notation.  
c11_math_cbse_07_004: Distinct permutations are counted by \(n!\) when \(r=n\).  
c11_math_cbse_07_007: Combinations formula \(^nC_r = \frac{n!}{r!(n-r)!}\) requires factorial manipulation.  
c11_math_cbse_07_008: Properties like \(^nC_r = ^nC_{n-r}\) rely on factorial symmetry.
c11_math_cbse_07_005: Factorial notation is essential to compute n! and p!.  
c11_math_cbse_07_009: Factorial notation \(n!\) is essential for computing permutation formulas.  
c11_math_cbse_07_011: Factorial notation n! is required to compute both P(n,r) and C(n,r) values.  
c12_cs_cbse_09_011: Factorial notation `n!` relates to `math.factorial()` and combinatorics in `random`.  
c12_ip_cbse_07_002: Factorial notation (n!) underpins permutation calculations for character-set size.  

## CROSS_SUBJECT_PREREQS
c9_math_ch8_1, c10_math_cbse_05_001
## CROSS_SUBJECT_REASONS
c9_math_ch8_1: Sequences and recursive definitions (like \(a_n = n \times a_{n-1}\)) mirror the recursive definition of factorial.  
c10_math_cbse_05_001: Arithmetic Progressions involve products of terms in sum formulas; factorial products appear in series expansions later.

## CHAIN_DESCRIPTION
c11_math_cbse_07_001 -> c11_math_cbse_07_002 -> c11_math_cbse_07_003

## THIS_FORMULA
\(n! = n \times (n-1) \times (n-2) \times \cdots \times 3 \times 2 \times 1\) for \(n \in \mathbb{N}\), and \(0! = 1\).

## FORMULA_VARIABLES
\(n\) = non-negative integer (number of objects or steps); \(n!\) = factorial of \(n\) (number of linear arrangements of \(n\) distinct objects).

## FORMULA_UNITS
dimensionless (count of arrangements)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch1_1 | Factorials appear in statistical mechanics (e.g., number of microstates \(\Omega = \frac{N!}{\prod n_i!}\)) for entropy calculations.  
c11_cs_ch4_1 | In computer science, factorial represents the number of permutations of \(n\) items, used in algorithm analysis (e.g., brute-force TSP is \(O(n!)\)).

## PREREQ_CONCEPT
Multiplication of a sequence of decreasing natural numbers (Fundamental Principle of Counting applied to sequential choices without repetition).

## PREREQ_BEFORE
The student must be able to compute products like \(5 \times 4 \times 3 \times 2 \times 1\) and understand that the order of multiplication does not change the product.

## PREREQ_STUCK
Revisit the Fundamental Principle of Counting (c11_math_cbse_07_001) and practice counting arrangements of 3 or 4 distinct objects by drawing tree diagrams.

## WORKED_EXAMPLE_1
PROBLEM: A school library has 6 different mathematics books. In how many ways can they be arranged on a shelf if all 6 books are used? Write the answer using factorial notation and evaluate it.

STEPS:
- Step 1: Identify that we are arranging all 6 distinct books in a line. The first position has 6 choices, the second has 5 remaining choices, then 4, 3, 2, 1.
- Step 2: By the Fundamental Principle of Counting, total arrangements = \(6 \times 5 \times 4 \times 3 \times 2 \times 1\).
- Step 3: Recognize this product as the definition of \(6!\). So the answer in factorial notation is \(6!\).
- Step 4: Evaluate \(6! = 6 \times 5 \times 4 \times 3 \times 2 \times 1 = 720\).
- Step 5: Interpret: There are 720 different ways to arrange the 6 books.

REASONING: Factorial notation is exactly the compact form of the product that arises when arranging all \(n\) distinct objects. The step-by-step multiplication mirrors the sequential choice process.

ANSWER: \(6! = 720\) ways.

## WORKED_EXAMPLE_2
PROBLEM: Simplify the algebraic expression \(\frac{(n+3)!}{(n+1)!}\) for a positive integer \(n\). Then find its value when \(n = 4\).

STEPS:
- Step 1: Write the larger factorial in expanded form until the smaller factorial appears: \((n+3)! = (n+3)(n+2)(n+1)!\).
- Step 2: Substitute into the fraction: \(\frac{(n+3)(n+2)(n+1)!}{(n+1)!}\).
- Step 3: Cancel the common factor \((n+1)!\) (valid since \(n \ge 1\) so \((n+1)! \neq 0\)).
- Step 4: The simplified expression is \((n+3)(n+2)\).
- Step 5: Substitute \(n = 4\): \((4+3)(4+2) = 7 \times 6 = 42\).
- Step 6: Verify by direct computation: \(\frac{7!}{5!} = \frac{5040}{120} = 42\).

REASONING: The key algebraic technique is to expand the larger factorial just enough to reveal the smaller factorial as a factor, enabling cancellation. This avoids computing large numbers and works for any \(n\).

ANSWER: Simplified form: \((n+3)(n+2)\); for \(n=4\), value = 42.

## WORKED_EXAMPLE_3
PROBLEM: Solve for \(n\) if \(\frac{n!}{(n-2)!} = 30\), given \(n\) is a positive integer greater than 2.

STEPS:
- Step 1: Expand \(n!\) as \(n \times (n-1) \times (n-2)!\).
- Step 2: Substitute into the equation: \(\frac{n \times (n-1) \times (n-2)!}{(n-2)!} = 30\).
- Step 3: Cancel \((n-2)!\) (valid for \(n>2\)): \(n(n-1) = 30\).
- Step 4: Expand and rearrange: \(n^2 - n - 30 = 0\).
- Step 5: Factor the quadratic: \((n-6)(n+5) = 0\).
- Step 6: Since \(n\) is a positive integer > 2, \(n = 6\). (Discard \(n = -5\)).
- Step 7: Check: \(\frac{6!}{4!} = \frac{720}{24} = 30\). Correct.

REASONING: This problem combines factorial simplification with quadratic equation solving. The cancellation reduces the factorial equation to a polynomial equation, a common pattern in permutation/combination problems where we solve for \(n\).

ANSWER: \(n = 6\).

## COMPETENCY_QUESTION_1
QUESTION: A teacher wants to arrange 5 different science books and 3 different mathematics books on a shelf such that all mathematics books are together. The teacher's assistant writes the answer as \(8! - 5! \times 3!\). Is this correct? Explain why or why not, and give the correct expression in factorial notation.

COMPETENCY: Comparing and justifying methods; identifying errors in combinatorial reasoning.

STEPS:
- Step 1: Understand the condition: 3 math books must be adjacent. Treat them as a single block.
- Step 2: Count items to arrange: 5 science books + 1 block = 6 items. These can be arranged in \(6!\) ways.
- Step 3: Within the block, the 3 math books can be arranged among themselves in \(3!\) ways.
- Step 4: By Fundamental Principle of Counting, total = \(6! \times 3!\).
- Step 5: The assistant's expression \(8! - 5! \times 3!\) incorrectly subtracts arrangements where math books are together? Actually \(8!\) is total arrangements of all 8 books without restriction. \(5! \times 3!\) is not the number of arrangements where math books are separated. The assistant's logic is flawed.
- Step 6: Correct expression: \(6! \times 3! = 720 \times 6 = 4320\).

ANSWER: The assistant is incorrect. The correct number of arrangements is \(6! \times 3! = 4320\). The expression \(8! - 5! \times 3!\) does not represent the complement of "math books together".

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a coding competition, a problem asks to compute the number of trailing zeros in \(100!\) (i.e., the number of consecutive zeros at the end of the decimal representation). A student says: "Trailing zeros come from factors of 10, so I need to count how many times 10 divides \(100!\). Since \(10 = 2 \times 5\), and there are more factors of 2 than 5, I just need to count factors of 5 in \(100!\)." Is the student's reasoning correct? If yes, compute the number of trailing zeros in \(100!\). If no, correct the reasoning and compute.

COMPETENCY: Translating real-world/computational problems to mathematical reasoning; applying number theory concepts (prime factorization) to factorial.

STEPS:
- Step 1: Confirm the student's reasoning: Trailing zeros = number of factors of 10 in \(100!\). Each 10 = 2 × 5. In any factorial, the exponent of 2 is greater than exponent of 5. So the number of trailing zeros equals the exponent of 5 in the prime factorization of \(100!\). The reasoning is correct.
- Step 2: To count factors of 5 in \(100!\), use the formula: \(\left\lfloor \frac{100}{5} \right\rfloor + \left\lfloor \frac{100}{25} \right\rfloor + \left\lfloor \frac{100}{125} \right\rfloor + \cdots\).
- Step 3: Compute: \(\lfloor 20 \rfloor + \lfloor 4 \rfloor + \lfloor 0 \rfloor = 20 + 4 = 24\).
- Step 4: Explain: Multiples of 5 contribute one 5 each (20 numbers). Multiples of 25 contribute an extra 5 each (4 numbers: 25, 50, 75, 100). Multiples of 125 would contribute another, but 125 > 100.
- Step 5: Final answer: 24 trailing zeros.

ANSWER: The student's reasoning is correct. The number of trailing zeros in \(100!\) is 24.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you are ______ 5 different books on a shelf.

## DIAGNOSTIC_ANSWER_7
arranging

**A wrong answer ("lining" or "placing") reveals the student has paraphrased the walkthrough's participle - 5 different books are being arranged on a shelf, slot by slot.** Arranging is the walkthrough's own participle, and the factorial literally counts such arrangements, so the word is what the blank grades. Recall the 5-4-3-2-1 choice cascade before filling, and fill it exactly as written.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are arranging ______ different books on a shelf.

## DIAGNOSTIC_ANSWER_8
5

**A wrong answer (any other number) reveals the student has drifted from the walkthrough - the shelf holds 5 different books, whose arrangement count is written 5!.** The count is the walkthrough's own figure, and the number is what the blank holds. Recall the 5 × 4 × 3 × 2 × 1 product before filling, and give the figure exactly.
