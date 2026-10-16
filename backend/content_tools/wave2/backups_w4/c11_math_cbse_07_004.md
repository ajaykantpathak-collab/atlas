## ELI5
Same five students, same three front-row slots, same 5 × 4 × 3 = 60: the formula ⁿPᵣ = n!/(n-r)! = n × (n-1) × ... × (n-r+1). A permutation of n distinct objects taken r at a time is an ordered arrangement - each count a unique sequence of choices, no repeats. The division by (n-r)! simply removes the arrangements of the unchosen: 5!/2! keeps the three chosen and forgets the bench.

## DEFINITION
A permutation of n distinct objects taken r at a time (where 0 ≤ r ≤ n) is an ordered arrangement of r objects selected from the n distinct objects. The number of such permutations is denoted by \(^nP_r\) or \(P(n, r)\) and calculated as \(^nP_r = \frac{n!}{(n-r)!}\), derived by applying the Fundamental Principle of Counting to the sequential filling of r positions from n distinct choices without repetition.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can correctly compute \(^nP_r\) for given n and r, derive the formula using the multiplication principle, solve word problems involving arrangements of distinct objects (e.g., seating, passwords, rankings), and explain why division by (n-r)! removes the unchosen objects' arrangements.

## SCOPE_BOUNDARY
Covers permutations of distinct objects without repetition where order matters and 0 ≤ r ≤ n. Does NOT cover permutations with repetition allowed (c11_math_cbse_07_006), permutations of non-distinct objects (c11_math_cbse_07_005), or circular permutations (not in Class 11 NCERT). Restricted to positive integer n and r.

## WALKTHROUGH
Imagine you are the class monitor arranging 5 students (Aman, Bina, Chetan, Diya, Eshan) in a row for a photograph, but only 3 can fit in the front row. How many different front-row arrangements are possible? Start by recognizing this as an ordered selection of 3 from 5 distinct students. Use the Fundamental Principle of Counting: the first position has 5 choices, the second has 4 remaining, the third has 3 remaining. Multiply: 5 × 4 × 3 = 60. Notice this product equals 5! / 2! = 5! / (5-3)!. Generalize: for n distinct objects taken r at a time, the number of permutations is n × (n-1) × ... × (n-r+1) = n!/(n-r)!. The key insight is that each arrangement corresponds to a unique sequence of choices where order matters and no object repeats.

Takeaway: mastery means ⁿPᵣ being computed both ways - falling product and factorial ratio - and word problems on seating, passwords and rankings solved with the no-repetition rule explicit. Exam moves: compute-the-arrangements questions and explain-the-division items arguing why the tail factorial exits. Check yourself: the falling product is the formula's honest face - r factors, each one shorter. Students miss it because they treat the factorial ratio as arbitrary, when the definition derives it: r positions filled sequentially, then the unused tail cancelled.

## DIAGNOSTIC_QUESTION_1
State the formula for the number of permutations of n distinct objects taken r at a time, and specify the condition on r.

## DIAGNOSTIC_ANSWER_1
The formula is \(^nP_r = \frac{n!}{(n-r)!}\) with the condition \(0 \le r \le n\). A wrong answer like \(^nP_r = n!\) or \(^nP_r = \frac{n!}{r!}\) reveals confusion between permutations and combinations or misunderstanding of the factorial division's role in stopping the product at (n-r+1).

## DIAGNOSTIC_QUESTION_2
Explain why the number of ways to arrange 4 different books on a shelf from a collection of 7 distinct books is \(^7P_4 = 7 \times 6 \times 5 \times 4\) and not \(^7C_4 \times 4!\) (though they are numerically equal). What does each factor represent in the multiplication principle?

## DIAGNOSTIC_ANSWER_2
The multiplication principle directly gives 7 choices for the first spot, 6 for the second, 5 for the third, 4 for the fourth. \(^7C_4 \times 4!\) first chooses 4 books (order ignored) then arranges them, which is a two-step process. The direct product \(7 \times 6 \times 5 \times 4\) reflects the sequential decision-making without an intermediate combination step. A student who cannot articulate the sequential choice per position lacks conceptual understanding of the derivation.

## DIAGNOSTIC_QUESTION_3
A 4-digit PIN code is created using digits 1–9 without repetition. How many such PINs are possible? If the PIN must be even, how many are possible?

## DIAGNOSTIC_ANSWER_3
Total PINs: \(^9P_4 = \frac{9!}{5!} = 9 \times 8 \times 7 \times 6 = 3024\). For even PINs, the last digit must be even (2,4,6,8 → 4 choices). After fixing the last digit, choose the first three from the remaining 8 digits: \(4 \times ^8P_3 = 4 \times 8 \times 7 \times 6 = 1344\). A wrong answer like \(^9P_4 / 2\) assumes symmetry that doesn't hold because the even digits are not half the available digits in a way that preserves equal distribution across positions.

## DIAGNOSTIC_QUESTION_4
Compare the number of permutations of 6 distinct objects taken 4 at a time (\(^6P_4\)) with the number of permutations of 6 distinct objects taken 2 at a time (\(^6P_2\)). Is there a relationship? Generalize: for a fixed n, how are \(^nP_r\) and \(^nP_{n-r}\) related?

## DIAGNOSTIC_ANSWER_4
\(^6P_4 = 6 \times 5 \times 4 \times 3 = 360\). \(^6P_2 = 6 \times 5 = 30\). They are not equal. However, \(^nP_r = \frac{n!}{(n-r)!}\) and \(^nP_{n-r} = \frac{n!}{r!}\). They are equal only when r = n-r (i.e., r = n/2). The relationship is \(^nP_r \times r! = ^nP_{n-r} \times (n-r)! = n!\). A student who claims they are always equal confuses permutations with combinations symmetry (\(^nC_r = ^nC_{n-r}\)).

## DIAGNOSTIC_QUESTION_5
A student solves: "Arrange 5 different mathematics books and 3 different physics books on a shelf so that all physics books are together." Their working: "Treat the 3 physics books as 1 block. Total items = 6. Arrangements = 6! = 720." Evaluate this solution.

## DIAGNOSTIC_ANSWER_5
The solution is incomplete. Treating the 3 physics books as a block gives 6! arrangements of the block and the 5 math books. However, the 3 physics books within the block can be arranged among themselves in 3! ways. Total = 6! × 3! = 720 × 6 = 4320. The student forgot the internal permutation of the block, a common error when moving from distinct objects to constrained arrangements.

## DIAGNOSTIC_QUESTION_6
Create a real-world problem (Indian context) that requires computing \(^nP_r\) with n=10, r=3, and explain why order matters in your scenario.

## DIAGNOSTIC_ANSWER_6
Example: "A school has 10 candidates for the posts of Head Boy, Head Girl, and Sports Captain. Each candidate can hold at most one post. In how many ways can the posts be filled?" Order matters because Head Boy ≠ Head Girl ≠ Sports Captain (distinct positions). Number of ways = \(^{10}P_3 = 720\). A poor answer might describe a scenario where order doesn't matter (e.g., selecting a 3-member committee) or uses repetition allowed.

## COMMON_MISCONCEPTION
Students often write \(^nP_r = \frac{n!}{r!}\) instead of \(\frac{n!}{(n-r)!}\), confusing the denominator with combinations. They also incorrectly apply the formula when r > n (e.g., arranging 5 students in 7 chairs) by computing \(^5P_7\) which is undefined. Another error: in problems with constraints (e.g., "vowels together"), they forget to multiply by the internal permutations of the constrained group.

## ON_FAILURE
If a student writes \(\frac{n!}{r!}\), ask them to list permutations of 3 distinct letters (A,B,C) taken 2 at a time. They will list 6: AB, AC, BA, BC, CA, CB. Then compute \(\frac{3!}{2!}=3\) (wrong) vs \(\frac{3!}{1!}=6\) (correct). Show that the denominator must be (n-r)! = 1! to stop the product at 3×2. For r > n, physically demonstrate: 5 students cannot fill 7 distinct chairs without repetition. For constraint problems, use a coloured-block model: arrange the block externally, then open the block and arrange internally, multiplying the two counts.

## PREREQUISITE_NODE_IDS
c11_math_cbse_07_001, c11_math_cbse_07_002, c11_math_cbse_07_003
## PREREQUISITE_REASONS
c11_math_cbse_07_001: Fundamental Principle of Counting is used to derive the permutation formula by multiplying sequential choices.
c11_math_cbse_07_002: Factorial notation n! is essential to express the compact formula \(^nP_r = \frac{n!}{(n-r)!}\) and compute values.
c11_math_cbse_07_003: Defines permutation as an ordered arrangement and introduces the notation \(^nP_r\) before deriving the formula for distinct objects.

## FORWARD_NODE_IDS
c11_math_cbse_07_005, c11_math_cbse_07_006, c11_math_cbse_07_009, c11_math_cbse_07_011

## FORWARD_REASONS
c11_math_cbse_07_005: Permutations with non-distinct objects extends the distinct case by dividing by factorials of identical objects.
c11_math_cbse_07_006: Permutations with repetition allowed modifies the distinct case by allowing choices to repeat (n^r instead of nPr).
c11_math_cbse_07_009: Word problems apply the distinct permutation formula to real-world scenarios like seating, rankings, passwords.
c11_math_cbse_07_011: Permutations of distinct objects covers the standard arrangement case used after selection.  

## CROSS_SUBJECT_PREREQS
c9_math_ch7_5, c10_math_cbse_14_002
## CROSS_SUBJECT_REASONS
c9_math_ch7_5: Sample space listing in probability often requires counting permutations of distinct outcomes (e.g., arranging outcomes of multiple trials).
c10_math_cbse_14_002: Probability problems in Class 10 use permutations to count favourable outcomes when order matters (e.g., drawing cards in sequence).

## CHAIN_DESCRIPTION
c11_math_cbse_07_001 -> c11_math_cbse_07_002 -> c11_math_cbse_07_003 -> c11_math_cbse_07_004 -> c11_math_cbse_07_005

## THIS_FORMULA
\(^nP_r = \frac{n!}{(n-r)!} = n \times (n-1) \times (n-2) \times \cdots \times (n-r+1)\), for \(0 \le r \le n\), \(n \in \mathbb{N}\)

## FORMULA_VARIABLES
n = total number of distinct objects, r = number of objects selected and arranged (0 ≤ r ≤ n), n! = factorial of n, (n-r)! = factorial of (n-r)

## FORMULA_UNITS
dimensionless (count of arrangements)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch2_3 | Permutations count distinct microstates in statistical mechanics (e.g., arranging distinguishable particles in energy levels)
c11_cs_ch4_2 | Permutations used in algorithms for generating all arrangements of distinct elements (e.g., backtracking for password cracking)

## PREREQ_CONCEPT
Fundamental Principle of Counting (multiplication rule) for sequential dependent choices without repetition.

## PREREQ_BEFORE
Student must be able to compute factorials up to 10! and apply the multiplication principle to simple stage-wise counting problems.

## PREREQ_STUCK
Revisit c11_math_cbse_07_001 (Fundamental Principle of Counting) and c11_math_cbse_07_002 (Factorial Notation) with practice on evaluating expressions like 8!/5! and 7×6×5.

## WORKED_EXAMPLE_1
PROBLEM: A school committee has 8 teachers. In how many ways can the positions of Chairperson, Vice-Chairperson, and Secretary be filled if no teacher can hold more than one position?
STEPS:
- Step 1: Identify n = 8 distinct teachers, r = 3 distinct positions. Order matters because positions are different.
- Step 2: Recognize this as permutations of 8 distinct objects taken 3 at a time: \(^8P_3\).
- Step 3: Apply formula: \(^8P_3 = \frac{8!}{(8-3)!} = \frac{8!}{5!}\).
- Step 4: Compute: \(\frac{8 \times 7 \times 6 \times 5!}{5!} = 8 \times 7 \times 6 = 336\).
- Step 5: Interpret: There are 336 different ways to assign the three distinct posts to 8 teachers.
REASONING: The multiplication principle gives 8 choices for Chairperson, then 7 for Vice-Chairperson, then 6 for Secretary. The factorial formula compactly represents this product by cancelling the unused factors (5!).
ANSWER: 336 ways

## WORKED_EXAMPLE_2
PROBLEM: How many 5-digit numbers can be formed using the digits 1, 2, 3, 4, 5, 6, 7 if no digit is repeated and the number must be greater than 50,000?
STEPS:
- Step 1: Total digits available n = 7 (1-7). We need 5-digit numbers (r=5) with no repetition.
- Step 2: Condition: number > 50,000 means the first digit (ten-thousands place) must be 5, 6, or 7 (3 choices).
- Step 3: Case analysis: Fix first digit as 5, 6, or 7. For each case, remaining 4 positions filled from remaining 6 digits.
- Step 4: For each fixed first digit, permutations of remaining 6 digits taken 4 at a time: \(^6P_4 = \frac{6!}{2!} = 6 \times 5 \times 4 \times 3 = 360\).
- Step 5: Total = 3 choices for first digit × 360 arrangements = 1080.
- Step 6: Verify: Alternatively, total 5-digit numbers from 7 digits = \(^7P_5 = 2520\). Numbers starting with 1-4 (4 choices) = 4 × \(^6P_4\) = 1440. Subtract: 2520 - 1440 = 1080. Matches.
REASONING: The constraint on the first digit splits the problem into cases. The factorial formula efficiently computes arrangements for the remaining positions. The verification using complement confirms the casework.
ANSWER: 1080 numbers

## WORKED_EXAMPLE_3
PROBLEM: In a race with 10 runners (all distinct), gold, silver, and bronze medals are awarded. In how many ways can the medals be awarded if two specific runners, A and B, must both win medals (but not necessarily gold/silver/bronze in that order)?
STEPS:
- Step 1: Total runners n=10, medals r=3 (distinct positions). Normally \(^{10}P_3 = 720\).
- Step 2: Constraint: A and B must be among the 3 medalists. So the set of 3 medalists includes A, B, and one other from the remaining 8 runners.
- Step 3: Choose the third medalist: 8 choices.
- Step 4: For each such trio {A, B, X}, arrange them in the 3 distinct medal positions: 3! = 6 ways.
- Step 5: Total = 8 × 6 = 48 ways.
- Step 6: Alternative method: Total ways to award medals to any 3 = 720. Ways where A and B both get medals = (ways to choose 3rd) × (arrange 3) = 8 × 6 = 48. Check: Ways where neither A nor B gets medal = \(^8P_3\) = 336. Ways where exactly one of A,B gets medal = 2 × (choose 2 from 8) × 3! = 2 × 28 × 6 = 336. Sum = 336+336+48=720. Consistent.
REASONING: This combines combination (choosing the third medalist) and permutation (arranging the three chosen). The constraint reduces the selection pool but the arrangement remains a full permutation of the selected distinct individuals.
ANSWER: 48 ways

## COMPETENCY_QUESTION_1
QUESTION: A password consists of 4 distinct characters chosen from 26 lowercase letters and 10 digits (0-9). The password must contain at least one digit. How many such passwords are possible? Explain why the answer is not simply \(^{36}P_4 - ^{26}P_4\).
COMPETENCY: Translating real-world situations to mathematical expressions and identifying complementary counting pitfalls.
STEPS:
- Step 1: Total characters = 36. Total 4-char passwords with distinct chars = \(^{36}P_4\).
- Step 2: Passwords with NO digits (only letters) = \(^{26}P_4\).
- Step 3: Passwords with at least one digit = Total - No digit = \(^{36}P_4 - ^{26}P_4\).
- Step 4: Wait! The question says "Explain why the answer is not simply...". Actually it IS that. The trick is to recognize that the complement of "at least one digit" is "no digits" (all letters). The subtraction is valid because the sets are disjoint and cover all possibilities. The student must justify why complementary counting works here.
- Step 5: Compute: \(^{36}P_4 = 36×35×34×33 = 1,413,720\). \(^{26}P_4 = 26×25×24×23 = 358,800\). Difference = 1,054,920.
ANSWER: 1,054,920 passwords. The complement method works because "at least one digit" and "no digits" are mutually exclusive and exhaustive for distinct-character passwords.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: There are 5 different mathematics books, 4 different physics books, and 3 different chemistry books. In how many ways can they be arranged on a shelf if books of the same subject must be together? A student argues: "Arrange the 3 subject blocks in 3! ways. Then arrange books within each block: 5! × 4! × 3!. Total = 3! × 5! × 4! × 3! = 103,680." Is this correct? If not, identify the error and give the correct answer.
COMPETENCY: Error identification and correction in multi-step permutation problems with constraints.
STEPS:
- Step 1: The student's method correctly identifies 3 subject blocks arranged in 3! ways.
- Step 2: Within each block, books are distinct: Math 5!, Physics 4!, Chemistry 3!.
- Step 3: The multiplication principle applies: choices for block order × choices for internal arrangements are independent.
- Step 4: The student's calculation: 3! = 6, 5! = 120, 4! = 24, 3! = 6. Product = 6 × 120 × 24 × 6 = 103,680.
- Step 5: The student is actually correct! The error identification is a trap. The answer is correct. The student must defend the method.
- Step 6: Verify: Total books = 12. Without constraint: 12! = 479,001,600. With constraint, the number is much smaller (103,680) which makes sense.
ANSWER: The student is correct. Total arrangements = 103,680. The method uses the multiplication principle on two independent stages: ordering the subject blocks, then ordering books within each block.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: A ______ of n distinct objects taken r at a time (where 0 ≤ r ≤ n) is an ordered arrangement of r objects selected from the n distinct objects.

## DIAGNOSTIC_ANSWER_7
permutation

**A wrong answer ("combination" or "selection") reveals the student has swapped the headword - a permutation of n distinct objects taken r at a time is an ordered arrangement, order being the whole point.** Permutation is the definition's own headword, and ordered arrangement is its title. Quote it in fill-ups, keeping the headword exact.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are the class monitor ______ 5 students (Aman, Bina, Chetan, Diya, Eshan) in a row for a photograph, but only 3 can fit in the front row.

## DIAGNOSTIC_ANSWER_8
arranging

**A wrong answer ("lining" or "seating") reveals the student has paraphrased the walkthrough's participle - the class monitor is arranging the 5 named students in a row for the photograph.** Arranging is the walkthrough's own participle, carrying the order-matters idea, and the participle is what the blank grades. Recall the 5 × 4 × 3 = 60 count before filling, and fill the word exactly.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: A permutation of n distinct objects taken r at a time (where ______ ≤ r ≤ n) is an ordered arrangement of r objects selected from the n distinct objects.

## DIAGNOSTIC_ANSWER_9
0

**A wrong answer (any other bound) reveals the student has drifted from the definition - r runs from taking none up to taking all, the full span 0 ≤ r ≤ n.** The lower bound is the definition's own floor, and the figure is what the blank holds. Recall the falling product stopping after r slots before filling, and give the figure exactly.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Imagine you are the class monitor arranging 5 students (Aman, Bina, Chetan, Diya, Eshan) in a row for a ______, but only 3 can fit in the front row.

## DIAGNOSTIC_ANSWER_10
photograph

**A wrong answer ("picture" or "contest") reveals the student has swapped the walkthrough's event - the 5 named students queue for a photograph with only 3 front-row places.** Photograph is the walkthrough's own event noun, and the noun is what the blank grades. Recall the 5 × 4 × 3 calculation before filling, and give the noun exactly.
