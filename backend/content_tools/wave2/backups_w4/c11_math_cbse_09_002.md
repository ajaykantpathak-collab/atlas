## ELI5
A savings plan starts at ₹500 in January and grows by ₹100 every subsequent month - the 12th deposit lands at 500 + 11(100). That is the entire formula: a(n) = a + (n-1)d, with first term a and common difference d. The (n-1) counts increases, one fewer than the term number, and it makes the nth term a linear function of n - the straight-line signature of an AP.

## DEFINITION
The general term (nth term) of an arithmetic progression (AP) with first term \(a\) and common difference \(d\) is given by \(a_n = a + (n-1)d\), where \(n \in \mathbb{N}\). This formula expresses the linear dependence of the term value on its position index \(n\).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can compute any term of an AP given the first term and common difference, determine the first term or common difference when two arbitrary terms are known, verify whether a given sequence is an AP by checking if its nth term is linear in \(n\), and solve word problems involving unknown terms in real-world contexts like savings plans or stacking patterns.

## SCOPE_BOUNDARY
This node covers the derivation, application, and algebraic manipulation of the general term formula \(a_n = a + (n-1)d\) for arithmetic progressions. It does NOT cover the sum of n terms (handled in c11_math_cbse_09_003), arithmetic mean (c11_math_cbse_09_004), or geometric progressions (c11_math_cbse_09_005 onwards).

## WALKTHROUGH
Imagine you start a savings plan in January where you deposit ₹500 in the first month and decide to increase the deposit by ₹100 every subsequent month. You want to know how much you will deposit in December (the 12th month) without calculating all 11 months in between. This is exactly what the general term of an AP does: it jumps directly to any term using a linear formula. Begin by writing down the first term \(a = 500\) and the common difference \(d = 100\). Recall from Class 10 that each term adds one more \(d\) to the first term: 2nd term = \(a+d\), 3rd term = \(a+2d\), so the pattern for the nth term is \(a + (n-1)d\). Substitute \(n=12\) to get the December deposit. The key insight is that the term number \(n\) appears as a coefficient of \(d\), making the nth term a linear function of \(n\).

Takeaway: mastery means computing any term from a and d, running the formula backwards to recover a or d from two known terms, and testing linearity in n to certify an AP. Exam moves: find-the-nth-term questions and reconstruct-the-AP items, including savings and stacking word problems. Check yourself: with a and d hidden, write one equation per known term and solve the pair simultaneously. Students miss it because they add d a full n times, when the definition's formula adds it only (n-1) times: the first term already sits in the sequence, so every position after it costs one fewer increase.

## DIAGNOSTIC_QUESTION_1
State the formula for the general term of an AP and identify what each symbol represents.

## DIAGNOSTIC_ANSWER_1
The formula is \(a_n = a + (n-1)d\), where \(a\) is the first term, \(d\) is the common difference, \(n\) is the term number (positive integer), and \(a_n\) is the nth term. A wrong answer like \(a_n = a + nd\) reveals the student does not understand that the first term corresponds to \(n=1\) with zero increments of \(d\).

## DIAGNOSTIC_QUESTION_2
Explain why the nth term of an AP is always a linear expression in \(n\). What does the coefficient of \(n\) represent?

## DIAGNOSTIC_ANSWER_2
The nth term \(a_n = a + (n-1)d = dn + (a-d)\) is of the form \(pn + q\), which is linear in \(n\). The coefficient of \(n\) is the common difference \(d\). If a student says the coefficient is \(a\) or cannot explain the linear form, they are memorising the formula without connecting it to the constant rate of change that defines an AP.

## DIAGNOSTIC_QUESTION_3
The 5th term of an AP is 22 and the 9th term is 38. Find the first term and the common difference.

## DIAGNOSTIC_ANSWER_3
Using \(a_5 = a + 4d = 22\) and \(a_9 = a + 8d = 38\). Subtract: \(4d = 16 \Rightarrow d = 4\). Then \(a + 16 = 22 \Rightarrow a = 6\). A common error is writing \(a_5 = a + 5d\) (using \(n\) instead of \(n-1\)), leading to \(d = 16/4 = 4\) by coincidence but wrong equations. Another error is subtracting incorrectly: \(38-22=16\) but dividing by \(9-5=4\) gives correct \(d\) only if the formula is used correctly.

## DIAGNOSTIC_QUESTION_4
A sequence is defined by \(a_n = 3n^2 - 2n + 1\). Is this an AP? Justify your answer by analysing the difference between consecutive terms.

## DIAGNOSTIC_ANSWER_4
Compute \(a_{n+1} - a_n = [3(n+1)^2 - 2(n+1) + 1] - [3n^2 - 2n + 1] = 6n + 1\). Since the difference depends on \(n\) (not constant), it is NOT an AP. A student who only checks the first few terms (e.g., \(a_1=2, a_2=9, a_3=22\); differences 7 and 13) might see they are not equal but cannot generalise. The misconception is that checking a few terms is sufficient; the algebraic proof requires showing the difference is not constant for all \(n\).

## DIAGNOSTIC_QUESTION_5
A student solves: "Find the 10th term of the AP: 7, 12, 17, ..." and writes: \(a=7, d=5, a_{10} = 7 + 10 \times 5 = 57\). Identify the error and give the correct answer.

## DIAGNOSTIC_ANSWER_5
The error is using \(n\) instead of \(n-1\) in the formula: \(a_{10} = a + 10d\) instead of \(a + 9d\). Correct calculation: \(a_{10} = 7 + 9 \times 5 = 52\). This reveals the classic off-by-one misconception where students think the 10th term adds the common difference 10 times, forgetting the first term already has zero additions.

## DIAGNOSTIC_QUESTION_6
Create a real-life problem (Indian context) that can be modelled by an AP where the general term formula is needed to find a specific term without listing all previous terms. Provide the problem statement and the solution.

## DIAGNOSTIC_ANSWER_6
Example: "A construction company penalises a contractor ₹2000 for the first day of delay and increases the penalty by ₹500 for each subsequent day. Find the penalty on the 15th day." Solution: \(a=2000, d=500, n=15 \Rightarrow a_{15} = 2000 + 14 \times 500 = 9000\). A good answer includes a clear AP context (constant increment), correct identification of \(a\) and \(d\), and correct use of \(n-1\). A poor answer might use simple multiplication (2000*15) or forget the initial penalty structure.

## COMMON_MISCONCEPTION
Students consistently write the nth term as \(a_n = a + nd\) instead of \(a + (n-1)d\). For example, in the AP 3, 7, 11, ... they calculate the 4th term as \(3 + 4 \times 4 = 19\) instead of \(3 + 3 \times 4 = 15\). This happens because they think "nth term means adding d n times" and fail to realise the first term \(a\) itself is the term for \(n=1\) with zero additions of \(d\). Another frequent error is misidentifying the common difference when terms are given non-consecutively, e.g., given \(a_3=10, a_6=22\), they compute \(d = (22-10)/(6-3) = 4\) correctly but then use \(a_3 = a + 3d\) to find \(a\), again using \(n\) instead of \(n-1\).

## ON_FAILURE
1. Ask the student to write the first 5 terms of an AP with \(a=2, d=3\) explicitly: 2, 5, 8, 11, 14.
2. Have them label each term with its term number \(n\) and the number of \(d\)'s added: \(n=1 \rightarrow 2+0\times3\), \(n=2 \rightarrow 2+1\times3\), \(n=3 \rightarrow 2+2\times3\).
3. Point out the pattern: number of \(d\)'s = \(n-1\).
4. Practice 3-4 problems where they must first write the expanded form (e.g., \(a_7 = a + 6d\)) before using the formula, reinforcing the \((n-1)\) factor.
5. For non-consecutive terms, use the relation \(a_m - a_n = (m-n)d\) to find \(d\) directly, then back-substitute using correct index.

## PREREQUISITE_NODE_IDS
c11_math_cbse_09_001, c10_math_cbse_05_001, c10_math_cbse_05_002, c10_math_cbse_05_003, c10_math_cbse_05_004
## PREREQUISITE_REASONS
c11_math_cbse_09_001: Understanding what a sequence is and how an AP is a special type of sequence with constant difference is foundational.
c10_math_cbse_05_001: The definition of AP and common difference \(d\) is prerequisite to formulating the general term.
c10_math_cbse_05_002: The general form \(a, a+d, a+2d, \dots\) directly leads to the pattern for the nth term.
c10_math_cbse_05_003: The derivation of \(a_n = a + (n-1)d\) from the pattern is the core conceptual bridge.
c10_math_cbse_05_004: Practice in finding unknown terms using the formula builds the algebraic fluency needed for Class 11 problems.

## FORWARD_NODE_IDS
c11_math_cbse_09_003, c11_math_cbse_09_004, c11_math_cbse_09_011, c11_math_cbse_09_012, c11_math_cbse_09_005, c12_eco_cbse_02_001

## FORWARD_REASONS
c11_math_cbse_09_003: The sum of n terms formula \(S_n = \frac{n}{2}[2a + (n-1)d]\) is derived using the general term \(a_n\).
c11_math_cbse_09_004: Arithmetic Mean between two numbers uses the property that three terms in AP have the middle term as the average, relying on the general term structure.
c11_math_cbse_09_011: Arithmetic-Geometric Progression combines AP general term with GP general term.
c11_math_cbse_09_012: Word problems on AP applications require finding specific terms using the general term formula.
c11_math_cbse_09_005: AP general term — provides contrast (additive vs multiplicative)  
c12_eco_cbse_02_001: c11_math_cbse_09_002 | Arithmetic progression concepts help in constructing TU schedules where MU changes by a constant amount.  

## CROSS_SUBJECT_PREREQS
c9_math_ch2_1, c9_math_ch2_3, c10_math_cbse_05_003
## CROSS_SUBJECT_REASONS
c9_math_ch2_1: The nth term \(a_n = dn + (a-d)\) is a linear polynomial in \(n\); understanding linear polynomials (degree, coefficients) helps analyse AP behaviour.
c9_math_ch2_3: Real-life linear patterns (e.g., constant speed, fixed cost + variable cost) are modelled by AP; the general term gives the value at any step.
c10_math_cbse_05_003: The Class 10 derivation of the nth term formula is the direct mathematical prerequisite; Class 11 extends it to more complex algebraic proofs.

## CHAIN_DESCRIPTION
c11_math_cbse_09_001 -> c11_math_cbse_09_002 -> c11_math_cbse_09_003

## THIS_FORMULA
\(a_n = a + (n-1)d\)

## FORMULA_VARIABLES
\(a\) = first term of the AP; \(d\) = common difference (\(d = a_{k+1} - a_k\) for any \(k\)); \(n\) = term number (positive integer); \(a_n\) = value of the nth term.

## FORMULA_UNITS
dimensionless (or same units as the sequence terms, e.g., rupees, metres, kilograms)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c9_math_ch2_3 | The nth term of an AP is a linear function of n, directly linking to linear patterns in real-life situations like constant rate of change.
c10_math_cbse_05_003 | The formula for nth term of AP is derived and used in Class 10; Class 11 builds on this for proofs and complex problems.

## PREREQ_CONCEPT
Linear functions and the concept of constant rate of change (common difference) in a sequence.

## PREREQ_BEFORE
The student must be able to identify an AP, compute its common difference, and write the first few terms given \(a\) and \(d\).

## PREREQ_STUCK
Revisit the derivation of the nth term formula from Class 10 (c10_math_cbse_05_003) by writing the sequence as \(a, a+d, a+2d, \dots\) and observing the coefficient of \(d\).

## WORKED_EXAMPLE_1
PROBLEM: A student saves ₹50 in the first week of the year and increases her weekly savings by ₹10 every week. How much will she save in the 25th week? What is the total amount saved in the first 25 weeks? (Only find the 25th week savings here; total is for next node.)

STEPS:
- Step 1: Identify the given values. The savings form an AP with first term \(a = 50\) (week 1) and common difference \(d = 10\) (increase per week). We need the 25th term, so \(n = 25\).
- Step 2: Recall the general term formula for an AP: \(a_n = a + (n-1)d\).
- Step 3: Substitute the known values: \(a_{25} = 50 + (25-1) \times 10\).
- Step 4: Simplify step by step: \(a_{25} = 50 + 24 \times 10 = 50 + 240 = 290\).
- Step 5: Interpret the result: In the 25th week, she saves ₹290. The unit is rupees.

REASONING: The weekly savings increase by a constant amount ₹10, which is the definition of an AP. The general term formula directly computes the value at any week \(n\) without listing all previous weeks. The \((n-1)\) factor accounts for the fact that the first week has zero increments.

ANSWER: ₹290

## WORKED_EXAMPLE_2
PROBLEM: In an AP, the 7th term is 34 and the 13th term is 64. Find the first term, the common difference, and the 20th term.

STEPS:
- Step 1: Write equations using the general term formula for the given terms. \(a_7 = a + 6d = 34\) ... (1). \(a_{13} = a + 12d = 64\) ... (2).
- Step 2: Subtract equation (1) from equation (2) to eliminate \(a\): \((a + 12d) - (a + 6d) = 64 - 34 \Rightarrow 6d = 30\).
- Step 3: Solve for \(d\): \(d = 30 / 6 = 5\).
- Step 4: Substitute \(d = 5\) into equation (1): \(a + 6 \times 5 = 34 \Rightarrow a + 30 = 34 \Rightarrow a = 4\).
- Step 5: Now find the 20th term using \(a_{20} = a + 19d = 4 + 19 \times 5 = 4 + 95 = 99\).
- Step 6: Verify: 7th term = \(4 + 6\times5 = 34\) (correct), 13th term = \(4 + 12\times5 = 64\) (correct).

REASONING: Two terms of an AP give two linear equations in two unknowns (\(a\) and \(d\)). Subtracting eliminates \(a\) because the coefficient of \(a\) is 1 in both. The difference in term indices (13-7=6) equals the coefficient of \(d\) in the subtracted equation, giving \(d\) directly. This method works for any two terms.

ANSWER: First term \(a = 4\), common difference \(d = 5\), 20th term \(a_{20} = 99\)

## WORKED_EXAMPLE_3
PROBLEM: The nth term of a sequence is given by \(a_n = 5n - 3\). Prove that this sequence is an AP. Find its first term, common difference, and the 15th term.

STEPS:
- Step 1: To prove it is an AP, show that the difference between consecutive terms is constant. Compute \(a_{n+1} = 5(n+1) - 3 = 5n + 5 - 3 = 5n + 2\).
- Step 2: Find the difference \(a_{n+1} - a_n = (5n + 2) - (5n - 3) = 5\). Since the difference is 5 (a constant independent of \(n\)), the sequence is an AP with common difference \(d = 5\).
- Step 3: Find the first term by substituting \(n=1\): \(a_1 = 5(1) - 3 = 2\). So \(a = 2\).
- Step 4: Verify using the general term formula: \(a_n = a + (n-1)d = 2 + (n-1)5 = 2 + 5n - 5 = 5n - 3\). Matches given expression.
- Step 5: Find the 15th term: \(a_{15} = 5(15) - 3 = 75 - 3 = 72\). Alternatively, \(a_{15} = a + 14d = 2 + 14 \times 5 = 72\).
- Step 6: Conclude: The sequence is an AP with first term 2, common difference 5, and 15th term 72.

REASONING: Any sequence whose nth term is a linear expression in \(n\) (i.e., of the form \(pn + q\)) is an AP with common difference \(p\). Here \(p=5\), \(q=-3\). The first term is obtained at \(n=1\). This connects the algebraic form of the general term to the definition of AP.

ANSWER: AP proved; first term = 2, common difference = 5, 15th term = 72

## COMPETENCY_QUESTION_1
QUESTION: A sequence is defined by \(a_n = 2n^2 + 3\). A student claims it is an AP because the terms are increasing. Evaluate this claim. If false, explain why and find the actual difference between the 4th and 3rd terms.

COMPETENCY: Conceptual understanding and error identification – distinguishing between increasing sequences and arithmetic progressions.

STEPS:
- Step 1: Understand that an AP requires a constant difference between consecutive terms, not just increasing values.
- Step 2: Compute the general difference \(a_{n+1} - a_n\) for the given formula.
- Step 3: Evaluate the difference for specific terms (3rd and 4th) to show it is not constant.
- Step 4: State the correct conclusion.

ANSWER: The claim is false. An AP requires a constant common difference. For \(a_n = 2n^2 + 3\), \(a_{n+1} - a_n = [2(n+1)^2 + 3] - [2n^2 + 3] = 2(n^2+2n+1) - 2n^2 = 4n + 2\), which depends on \(n\). For \(n=3\), difference = \(4(3)+2 = 14\). The 3rd term is \(2(9)+3=21\), 4th term is \(2(16)+3=35\), difference = 14. Since the difference changes with \(n\), it is not an AP.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The sum of the 4th and 8th terms of an AP is 24, and the sum of the 6th and 10th terms is 44. Find the first three terms of the AP.

COMPETENCY: Translating word conditions into algebraic equations and solving a system – multi-step analytical reasoning.

STEPS:
- Step 1: Express the given conditions using the general term formula \(a_n = a + (n-1)d\).
- Step 2: Write equations: \(a_4 + a_8 = (a+3d) + (a+7d) = 2a + 10d = 24\) ... (1). \(a_6 + a_{10} = (a+5d) + (a+9d) = 2a + 14d = 44\) ... (2).
- Step 3: Subtract (1) from (2): \(4d = 20 \Rightarrow d = 5\).
- Step 4: Substitute \(d=5\) into (1): \(2a + 50 = 24 \Rightarrow 2a = -26 \Rightarrow a = -13\).
- Step 5: Write the first three terms: \(a_1 = -13\), \(a_2 = -13 + 5 = -8\), \(a_3 = -8 + 5 = -3\).
- Step 6: Verify: 4th term = \(-13+15=2\), 8th term = \(-13+35=22\), sum=24. 6th term = \(-13+25=12\), 10th term = \(-13+45=32\), sum=44.

ANSWER: The first three terms are \(-13, -8, -3\).

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you start a savings plan in January where you deposit ₹500 in the first month and decide to increase the deposit by ₹100 every ______ month.

## DIAGNOSTIC_ANSWER_7
subsequent

**A wrong answer ("following" or "next") reveals the student has paraphrased the walkthrough's adjective - you decide to increase the deposit by ₹100 every subsequent month.** Subsequent is the walkthrough's own adjective, and the adjective is what the blank grades. Recall the January start at ₹500 before filling, and give the adjective exactly.
