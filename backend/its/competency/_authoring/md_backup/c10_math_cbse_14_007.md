## DEFINITION
The complement of an event E, denoted E' or "not E", is the event that E does NOT occur. The probability of the complement is P(not E) = 1 − P(E). This follows from the fact that the sample space S is partitioned into E and E' (E and not E), so P(E) + P(not E) = P(S) = 1. The complement rule is one of the most useful tools in probability: if computing P(E) directly is difficult, compute P(not E) and subtract from 1.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can define the complement of an event, state and derive the formula P(not E) = 1 − P(E), use it to find the probability of the complement when P(E) is known, and apply it to solve problems where direct computation of P(E) is difficult but P(not E) is easier to compute.

## SCOPE_BOUNDARY
This node covers the complement rule P(not E) = 1 − P(E) and its applications. It does NOT cover compound events using "AND" and "OR" rules (c10_math_cbse_14_008) or conditional probability.

## WALKTHROUGH
When you roll a die, the event E = "rolling a 6" has P(E) = 1/6. The complement "not E" = "not rolling a 6" includes {1, 2, 3, 4, 5}, so P(not E) = 5/6. Notice: 1/6 + 5/6 = 1. This is the complement rule: P(not E) = 1 − P(E). The rule is powerful when direct counting is hard. For example, "at least one head in 3 coin tosses" — counting directly (HHH, HHT, HTH, HTT, THH, THT, TTH = 7) is tedious. Instead, compute P(no heads) = P(TTT) = 1/8, then P(at least one head) = 1 − 1/8 = 7/8. The complement trick ("at least one" → complement is "none") is a standard board exam technique.

## DIAGNOSTIC_QUESTION_1
State the complement rule for probability.

## DIAGNOSTIC_ANSWER_1
P(not E) = 1 − P(E), where "not E" is the complement of event E. A wrong answer (e.g., "P(not E) = P(E)") shows the student does not understand the relationship between an event and its complement.

## DIAGNOSTIC_QUESTION_2
If P(E) = 0.3, find P(not E).

## DIAGNOSTIC_ANSWER_2
P(not E) = 1 − 0.3 = 0.7. A wrong answer (e.g., 0.3 or −0.3) shows the student cannot apply the complement formula.

## DIAGNOSTIC_QUESTION_3
A die is rolled. What is the probability of NOT getting a prime number?

## DIAGNOSTIC_ANSWER_3
P(prime) = 3/6 = 1/2 (primes: 2, 3, 5). P(not prime) = 1 − 1/2 = 1/2. (Non-primes: 1, 4, 6 — note 1 is not prime.) A wrong answer (e.g., 3/6 = 1/2 without showing the complement step, or including 1 as prime) shows incomplete reasoning or a number theory error.

## DIAGNOSTIC_QUESTION_4
Explain why P(E) + P(not E) = 1.

## DIAGNOSTIC_ANSWER_4
The sample space S is the union of E and "not E", and they are mutually exclusive (an outcome either is in E or is not, but not both). So P(E) + P(not E) = P(S) = 1. A wrong answer (e.g., "because they are the same event") shows the student does not understand that E and not E partition the sample space.

## DIAGNOSTIC_QUESTION_5
A bag has 10 balls, 4 of which are defective. What is the probability of drawing a non-defective ball?

## DIAGNOSTIC_ANSWER_5
P(defective) = 4/10 = 2/5. P(non-defective) = 1 − 2/5 = 3/5. (Directly: 6 non-defective out of 10, P = 6/10 = 3/5.) A wrong answer (e.g., 4/10) shows the student computed P(defective) instead of P(non-defective).

## DIAGNOSTIC_QUESTION_6
Three coins are tossed. Use the complement rule to find the probability of getting at least one head.

## DIAGNOSTIC_ANSWER_6
P(at least one head) = 1 − P(no heads) = 1 − P(TTT) = 1 − 1/8 = 7/8. The complement of "at least one head" is "no heads" (all tails), which is easier to compute. A wrong answer (e.g., listing all 7 favourable outcomes and getting 7/8 without using the complement) is correct but misses the efficiency of the method.

## COMMON_MISCONCEPTION
Students often try to directly count favourable outcomes for "at least one" problems, which is tedious and error-prone. The complement trick (P(at least one) = 1 − P(none)) is much faster. Another error: confusing "not E" with the opposite outcome — "not rolling a 6" is not "rolling a 1", it is "rolling 1, 2, 3, 4, or 5". The complement includes ALL outcomes not in E, not just one specific alternative.

## ON_FAILURE
1. Practice the complement trick: for "at least one" problems, compute P(none) and subtract from 1.
2. Verify: P(E) + P(not E) should always equal 1. If not, recheck.
3. Emphasise: "not E" includes ALL outcomes not in E, not just one alternative.
4. Practice 10 problems using both direct counting and the complement rule to see the efficiency.

## PREREQUISITE_NODE_IDS
c10_math_cbse_14_001, c10_math_cbse_14_006, c10_math_cbse_14_002, c10_math_cbse_14_003, c10_math_cbse_14_004, c10_math_cbse_14_005

## PREREQUISITE_REASONS
c10_math_cbse_14_001: Provides the classical definition P(E) = m/n from which the complement rule is derived.
c10_math_cbse_14_006: Covers the bounds P = 0 and P = 1, which are the extreme cases of the complement (if P(E) = 0, P(not E) = 1 and vice versa).
c10_math_cbse_14_002: The sample space of a random experiment is the set of all possible outcomes of that  - earlier chapter node that this node's author flags as feeding into this content.
c10_math_cbse_14_003: The probability of an event E, denoted P(E), is defined as the ratio of the number of  - earlier chapter node that this node's author flags as feeding into this content.
c10_math_cbse_14_004: An elementary event is an event that consists of exactly one outcome of a random experiment.  - earlier chapter node that this node's author flags as feeding into this content.
c10_math_cbse_14_005: For any event E in a random experiment with equally likely outcomes, the complementary event  - earlier chapter node that this node's author flags as feeding into this content.

## FORWARD_NODE_IDS
c10_math_cbse_14_008, c10_math_cbse_14_011, c10_math_cbse_14_010

## FORWARD_REASONS
c10_math_cbse_14_008: Combines the complement rule with the addition rule for "OR" events.
c10_math_cbse_14_011: Applies the complement rule in word problems and real-life scenarios.
c10_math_cbse_14_010: Finding P(not E) = 1 − P(E) is faster for "at least" problems.

## CROSS_SUBJECT_PREREQS
c9_math_ch7_1
## CROSS_SUBJECT_REASONS
N/A
## CHAIN_DESCRIPTION
c10_math_cbse_14_001 -> c10_math_cbse_14_006 -> c10_math_cbse_14_007 -> c10_math_cbse_14_008

## THIS_FORMULA
P(not E) = 1 − P(E)

## FORMULA_VARIABLES
P(E) = probability of event E; P(not E) = probability of the complement (E does not occur)

## FORMULA_UNITS
dimensionless

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
N/A
## PREREQ_CONCEPT
The classical definition P(E) = m/n and the fact that the sample space is partitioned into E and its complement.

## PREREQ_BEFORE
The student must be able to compute P(E) = m/n and understand that E and "not E" together cover the entire sample space.

## PREREQ_STUCK
Review the classical definition (c10_math_cbse_14_001). Practice identifying the complement of an event and verifying that P(E) + P(not E) = 1.

## WORKED_EXAMPLE_1
PROBLEM: A die is rolled. Find the probability of NOT getting a number divisible by 3.
STEPS:
- Step 1: Sample space S = {1, 2, 3, 4, 5, 6}, n = 6.
- Step 2: Event E = "divisible by 3" = {3, 6}, m = 2. P(E) = 2/6 = 1/3.
- Step 3: Complement "not E" = "not divisible by 3" = {1, 2, 4, 5}, m = 4.
- Step 4: P(not E) = 1 − P(E) = 1 − 1/3 = 2/3. (Direct: 4/6 = 2/3. ✓)
REASONING: This is a direct application of the complement rule. The key is identifying the event E and its complement. The verification shows that both the complement formula and direct counting give the same answer.
ANSWER: P(not divisible by 3) = 2/3.

## WORKED_EXAMPLE_2
PROBLEM: Three coins are tossed simultaneously. Find the probability of getting at least one head, using the complement rule.
STEPS:
- Step 1: Sample space S = {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}, n = 8.
- Step 2: Event E = "at least one head". The complement "not E" = "no heads" = {TTT}, m = 1.
- Step 3: P(not E) = P(no heads) = 1/8.
- Step 4: P(E) = 1 − P(not E) = 1 − 1/8 = 7/8.
- Step 5: Verify: Direct count of "at least one head" = 7 outcomes (all except TTT). P = 7/8. ✓
REASONING: This demonstrates the power of the complement trick. Counting 7 favourable outcomes directly is possible but error-prone. The complement ("no heads" = TTT) is a single outcome, making the computation much simpler. Board exams frequently test this technique for "at least one" problems.
ANSWER: P(at least one head) = 7/8.

## WORKED_EXAMPLE_3
PROBLEM: A bag contains 12 balls, 5 of which are red. Two balls are drawn at random (without replacement). Find the probability that at least one is red, using the complement rule.
STEPS:
- Step 1: Total ways to draw 2 from 12: C(12,2) = 66.
- Step 2: Complement "not E" = "no red balls" = "both are non-red". Non-red balls = 12 − 5 = 7.
- Step 3: Ways to draw 2 non-red from 7: C(7,2) = 21. P(not E) = 21/66 = 7/22.
- Step 4: P(at least one red) = 1 − P(not E) = 1 − 7/22 = 15/22.
- Step 5: Verify: Direct count = C(5,1)×C(7,1) + C(5,2) = 35 + 10 = 45. P = 45/66 = 15/22. ✓
REASONING: This is a more advanced application combining the complement rule with combinations. The complement ("both non-red") is easier to compute than the direct count (which requires summing "exactly 1 red" and "exactly 2 red"). The complement trick is especially valuable in "at least one" problems with large sample spaces.
ANSWER: P(at least one red) = 15/22.

## COMPETENCY_QUESTION_1
QUESTION: Case-based: A quality control inspector checks batches of 20 items. Historically, 15% of items are defective. (a) What is the probability that a randomly selected item is NOT defective? (b) If the inspector checks one item, what is the probability it is either defective or not defective? (c) Explain why the complement rule is useful in quality control.
COMPETENCY: Applying probability to quality control
STEPS:
- Step 1: (a) P(defective) = 0.15. P(not defective) = 1 − 0.15 = 0.85.
- Step 2: (b) P(defective or not defective) = P(S) = 1. These are complementary events that partition the sample space.
- Step 3: (c) The complement rule is useful because it is often easier to compute the probability of the complement. For example, P(at least one defective in a batch) = 1 − P(none defective), and P(none defective) may be simpler to calculate.
- Step 4: Verify: 0.15 + 0.85 = 1. ✓
REASONING: This applies the complement rule to a real quality control scenario. The key insight in part (c) is that in quality control, "at least one defective" is often the event of interest, and its complement "zero defectives" is easier to compute, especially for large batches.
ANSWER: (a) 0.85. (b) 1. (c) The complement rule simplifies "at least one" calculations.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Assertion-Reason:
Assertion (A): P(not E) = 1 − P(E) for any event E.
Reason (R): The events E and "not E" are mutually exclusive and together exhaust the sample space.
Choose the correct option:
(i) Both A and R are true and R correctly explains A.
(ii) Both A and R are true but R does not explain A.
(iii) A is true but R is false.
(iv) A is false but R is true.
COMPETENCY: Evaluating probability reasoning
STEPS:
- Step 1: Check A: P(not E) = 1 − P(E). TRUE — this is the complement rule, derived from the partition of S into E and not E.
- Step 2: Check R: E and "not E" are mutually exclusive (an outcome is in E or in not E, not both) and exhaustive (every outcome is in one or the other). TRUE.
- Step 3: Check explanation: R explains A because mutual exclusivity gives P(E ∪ not E) = P(E) + P(not E), and exhaustiveness gives P(E ∪ not E) = P(S) = 1. Combining: P(E) + P(not E) = 1, hence P(not E) = 1 − P(E).
- Step 4: Select option (i).
REASONING: This tests the logical foundation of the complement rule. The rule is not an axiom — it is derived from two properties: mutual exclusivity (no overlap) and exhaustiveness (full coverage) of E and its complement. Understanding these properties is essential for applying the rule correctly.
ANSWER: Option (i) — Both A and R are true and R correctly explains A.
DIFFICULTY: medium
