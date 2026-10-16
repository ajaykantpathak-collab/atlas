## ELI5
Five coloured pens - red, blue, green, black, purple - choose 3 for the pencil case: order is irrelevant, the case cannot tell who entered first. That is a combination: a selection of r from n distinct objects where order does not matter, counted by ⁿCᵣ = n!/(r!(n-r)!). Mechanism: take the permutation count and divide by r!, the arrangements of the chosen - every set was counted r! times.

## DEFINITION
A combination is a selection of \(r\) objects from a set of \(n\) distinct objects where the order of selection does not matter. The number of such combinations is denoted by \(^nC_r\) or \(C(n, r)\) and is given by the formula \(^nC_r = \frac{n!}{r!(n-r)!}\), where \(0 \le r \le n\) and \(n\) is a non-negative integer.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can correctly compute \(^nC_r\) for given \(n\) and \(r\), explain the difference between permutation and combination in a given scenario, and apply the formula to solve simple selection problems without repetition.

## SCOPE_BOUNDARY
This node covers the definition of combinations, the formula \(^nC_r = \frac{n!}{r!(n-r)!}\), and its evaluation for \(0 \le r \le n\). It does NOT cover properties of combinations (like \(^nC_r = ^nC_{n-r}\)), combinations with repetitions, or word problems involving combinations (which are covered in subsequent nodes).

## WALKTHROUGH
Imagine you have 5 different coloured pens — red, blue, green, black, and purple — and you want to choose 3 to put in your pencil case. Does the order in which you pick them matter? No, because they all go into the same case. This is a combination problem. We already know permutations (\(^nP_r\)) where order matters. For combinations, we divide the number of permutations by the number of ways to arrange the \(r\) selected objects (which is \(r!\)). So \(^nC_r = \frac{^nP_r}{r!} = \frac{n!}{r!(n-r)!}\). Guide the student to write down the formula and identify \(n\) and \(r\) from the problem.

Takeaway: mastery means the order test being run first, ⁿCᵣ computed by factorial simplification, and the ⁿPᵣ-to-ⁿCᵣ division explained. Exam moves: compute-the-selection questions and permutation-or-combination items with justification. Check yourself: a committee, a hand of cards, a pencil case - none records arrival order; a podium, a password, a queue all do. Students miss it because they divide by the wrong factorial, when the definition's division targets the chosen r: their internal orderings were the overcount, so r! exits the denominator.

Selection is the soul: once the group is fixed, its every shuffling is the same group wearing different minutes.

## DIAGNOSTIC_QUESTION_1
Write the formula for the number of combinations of \(n\) distinct objects taken \(r\) at a time. State the condition on \(r\) and \(n\).

## DIAGNOSTIC_ANSWER_1
The formula is \(^nC_r = \frac{n!}{r!(n-r)!}\), where \(n\) is a non-negative integer and \(0 \le r \le n\). A wrong answer (e.g., writing the permutation formula or forgetting the division by \(r!\)) reveals that the student confuses combinations with permutations or does not recall the exact formula.

## DIAGNOSTIC_QUESTION_2
Explain why the number of combinations \(^nC_r\) is smaller than the number of permutations \(^nP_r\) for the same \(n\) and \(r\) (with \(r > 1\)). Use the example of selecting 2 students from a class of 4 to illustrate.

## DIAGNOSTIC_ANSWER_2
In permutations, each arrangement of the selected objects counts as distinct; in combinations, different orders of the same selected objects are considered the same selection. For 4 students (A, B, C, D) selecting 2, permutations give 12 ordered pairs (AB, BA, AC, CA, AD, DA, BC, CB, BD, DB, CD, DC), while combinations give only 6 unordered pairs {A,B}, {A,C}, {A,D}, {B,C}, {B,D}, {C,D}. A wrong answer indicates the student does not grasp that combinations ignore order.

## DIAGNOSTIC_QUESTION_3
A committee of 3 members is to be formed from 5 teachers and 4 students. If the committee must consist of 2 teachers and 1 student, how many different committees are possible? (Assume all teachers are distinct and all students are distinct.)

## DIAGNOSTIC_ANSWER_3
Step 1: Choose 2 teachers from 5: \(^5C_2 = \frac{5!}{2!3!} = 10\).  
Step 2: Choose 1 student from 4: \(^4C_1 = \frac{4!}{1!3!} = 4\).  
Step 3: By Fundamental Principle of Counting, total committees = \(10 \times 4 = 40\).  
A wrong answer (e.g., adding instead of multiplying, or using permutations) shows the student cannot apply the combination formula in a multi-step selection problem.

## DIAGNOSTIC_QUESTION_4
Compare the values of \(^{10}C_3\) and \(^{10}C_7\). Without calculating the exact numbers, explain why they are equal. Then compute both to verify.

## DIAGNOSTIC_ANSWER_4
By the symmetry property \(^nC_r = ^nC_{n-r}\), \(^{10}C_3 = ^{10}C_7\). Computing: \(^{10}C_3 = \frac{10!}{3!7!} = 120\), \(^{10}C_7 = \frac{10!}{7!3!} = 120\). A wrong answer (e.g., saying they are different) indicates the student has not recognized the symmetry in the formula.

## DIAGNOSTIC_QUESTION_5
A student claims that \(^nC_r = \frac{^nP_r}{r!}\) is always true. Is this correct? If yes, prove it using the formulas. If not, give a counterexample.

## DIAGNOSTIC_ANSWER_5
Yes, it is correct. \(^nP_r = \frac{n!}{(n-r)!}\). Dividing by \(r!\) gives \(\frac{n!}{r!(n-r)!} = ^nC_r\). This holds for all \(0 \le r \le n\). A wrong answer (e.g., saying it's false because of some condition) shows the student does not understand the algebraic relationship between permutations and combinations.

## DIAGNOSTIC_QUESTION_6
Create a real-life problem (in an Indian context, e.g., choosing dishes from a menu, selecting players for a cricket team) that requires the use of \(^nC_r\) with \(n=8\) and \(r=3\). Write the problem statement and solve it.

## DIAGNOSTIC_ANSWER_6
Example problem: "A restaurant offers 8 different vegetarian starters. A customer wants to order 3 different starters for a party. How many different combinations of starters can the customer choose?" Solution: \(^8C_3 = \frac{8!}{3!5!} = 56\). A poor answer might use permutations or have an unrealistic context, showing the student cannot formulate a combination scenario.

## COMMON_MISCONCEPTION
Students often mistakenly use the permutation formula \(^nP_r\) when the problem asks for combinations, because they think "arranging" and "selecting" are the same. For example, in a problem "Choose 3 books from 5 to take on a trip," they compute \(^5P_3 = 60\) instead of \(^5C_3 = 10\). The error is not recognizing that the order of books in the bag does not matter.

## ON_FAILURE
If a student uses permutations instead of combinations, ask: "Does the order of selection change the outcome? If I pick book A then B then C, is that different from picking C then B then A for the trip?" Guide them to see that the set of books is the same. Then show the relationship: \(^nC_r = \frac{^nP_r}{r!}\) and have them recompute.

## PREREQUISITE_NODE_IDS
c11_math_cbse_07_001, c11_math_cbse_07_002, c11_math_cbse_07_003, c11_math_cbse_07_006

## PREREQUISITE_REASONS
c11_math_cbse_07_001: Fundamental Principle of Counting is needed to multiply choices when selecting from different groups (e.g., teachers and students).  
c11_math_cbse_07_002: Factorial Notation (n!) is essential to understand and compute the combination formula.  
c11_math_cbse_07_003: Permutations Definition and Formula provides the basis for deriving combinations as permutations divided by r!.
c11_math_cbse_07_006: Combinations introduce selection where order doesn't matter; understanding permutations with repetition helps later when combinations with repetition are introduced (though not in Class 11 NCERT, it appears in higher studies).  

## FORWARD_NODE_IDS
c11_math_cbse_07_008, c11_math_cbse_07_010, c11_math_cbse_07_011, c12_cs_cbse_09_011, c12_ip_cbse_07_002, c12_math_cbse_13_004, c12_math_cbse_13_007, c12_math_cbse_13_009, c12_math_cbse_13_010

## FORWARD_REASONS
c11_math_cbse_07_008: Properties of Combinations (like symmetry, Pascal's identity) build directly on the definition and formula.  
c11_math_cbse_07_010: Word Problems on Combinations require the ability to compute \(^nC_r\) and apply it in context.  
c11_math_cbse_07_011: Mixed Problems need both permutations and combinations, so this node is a prerequisite.
c12_cs_cbse_09_011: Combinations formula `nCr` relates to `random.sample()` without replacement.  
c12_ip_cbse_07_002: Combinations (ⁿCᵣ) relevant for diceware word-list selection without replacement.  
c12_math_cbse_13_004: Combinations (nCr) are needed to compute probabilities in finite sample spaces (e.g., card draws, committee selections) where independence is tested.  
c12_math_cbse_13_007: Combinations for unordered outcomes (e.g., drawing balls simultaneously).  
c12_math_cbse_13_009: The binomial coefficient \(\binom{n}{r}\) comes from combinations; essential for counting arrangements of successes.  
c12_math_cbse_13_010: Combinations formula \(\binom{n}{k}\) is essential for counting sequences of successes/failures.  

## CROSS_SUBJECT_PREREQS
c9_math_ch7_5, c9_math_ch7_6, c10_math_cbse_14_002
## CROSS_SUBJECT_REASONS
c9_math_ch7_5: Sample Space: Listing All Possible Outcomes — combinations are used to count outcomes in probability.  
c9_math_ch7_6: Events: Favourable and Total Outcomes — combinations help count favourable outcomes when order doesn't matter.  
c10_math_cbse_14_002: Sample Space and Events of an Experiment — same as above, but Class 10 probability uses combinations for equally likely outcomes.

## CHAIN_DESCRIPTION
c11_math_cbse_07_002 -> c11_math_cbse_07_007 -> c11_math_cbse_07_008

## THIS_FORMULA
\(^nC_r = \frac{n!}{r!(n-r)!}\), where \(n \in \mathbb{N}_0\), \(r \in \mathbb{N}_0\), \(0 \le r \le n\)

## FORMULA_VARIABLES
n = total number of distinct objects, r = number of objects to be selected, n! = factorial of n, r! = factorial of r, (n-r)! = factorial of (n-r)

## FORMULA_UNITS
dimensionless (counts of selections)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch2_3: In statistical mechanics, combinations count microstates for identical particles (Bose-Einstein statistics).  
c11_economics_ch3_2: In consumer choice theory, combinations model selection of bundles from a set of goods.

## PREREQ_CONCEPT
Factorial notation and the fundamental principle of counting.

## PREREQ_BEFORE
The student must be able to compute factorials and understand the difference between ordered and unordered selections.

## PREREQ_STUCK
If stuck, revisit factorial notation (c11_math_cbse_07_002) and the fundamental principle of counting (c11_math_cbse_07_001).

## WORKED_EXAMPLE_1
PROBLEM: A student has 6 different textbooks but can only carry 4 in his backpack. How many different sets of 4 textbooks can he choose?  
STEPS:
- Step 1: Identify that the order of textbooks in the backpack does not matter; this is a combination problem.  
- Step 2: Write down n = 6 (total textbooks), r = 4 (textbooks to select).  
- Step 3: Apply the combination formula: \(^6C_4 = \frac{6!}{4!(6-4)!} = \frac{6!}{4!2!}\).  
- Step 4: Compute factorials: \(6! = 720\), \(4! = 24\), \(2! = 2\). So \(^6C_4 = \frac{720}{24 \times 2} = \frac{720}{48} = 15\).  
- Step 5: Interpret: There are 15 different sets of 4 textbooks he can carry.  
REASONING: The combination formula divides the total permutations (\(^6P_4 = 360\)) by the number of ways to arrange the 4 selected books (\(4! = 24\)) because each set of 4 books can be arranged in 24 orders, all of which correspond to the same combination.  
ANSWER: 15 sets

## WORKED_EXAMPLE_2
PROBLEM: From a group of 7 boys and 5 girls, a team of 5 members is to be formed such that the team includes exactly 3 boys and 2 girls. How many different teams can be formed?  
STEPS:
- Step 1: Recognize that we need to select 3 boys from 7 and 2 girls from 5; these are independent selections.  
- Step 2: Compute combinations for boys: \(^7C_3 = \frac{7!}{3!4!} = \frac{7 \times 6 \times 5}{3 \times 2 \times 1} = 35\).  
- Step 3: Compute combinations for girls: \(^5C_2 = \frac{5!}{2!3!} = \frac{5 \times 4}{2 \times 1} = 10\).  
- Step 4: Apply Fundamental Principle of Counting: Total teams = \(35 \times 10 = 350\).  
- Step 5: Verify that no other constraints exist; answer is 350 teams.  
REASONING: The selections from boys and girls are independent, so we multiply the number of ways. This uses the combination formula for each group and the multiplication principle.  
ANSWER: 350 teams

## WORKED_EXAMPLE_3
PROBLEM: A question paper has two sections: Section A with 6 questions and Section B with 4 questions. A student must attempt 5 questions, choosing at least 2 from each section. In how many ways can the student select the questions?  
STEPS:
- Step 1: Identify the possible distributions of questions: (2 from A, 3 from B) or (3 from A, 2 from B) or (4 from A, 1 from B) or (5 from A, 0 from B) but with at least 2 from each, so only (2,3) and (3,2) are valid.  
- Step 2: For (2 from A, 3 from B): \(^6C_2 \times ^4C_3 = \frac{6 \times 5}{2} \times 4 = 15 \times 4 = 60\).  
- Step 3: For (3 from A, 2 from B): \(^6C_3 \times ^4C_2 = \frac{6 \times 5 \times 4}{6} \times \frac{4 \times 3}{2} = 20 \times 6 = 120\).  
- Step 4: Add the two cases (mutually exclusive): \(60 + 120 = 180\).  
- Step 5: Check if any other distributions satisfy "at least 2 from each": (4,1) has only 1 from B, invalid; (5,0) invalid. So total = 180.  
REASONING: The problem requires combining combinations from two sections with a constraint. We break into cases that satisfy the constraint, compute combinations for each case, and add because cases are mutually exclusive.  
ANSWER: 180 ways

## COMPETENCY_QUESTION_1
QUESTION: In a class of 30 students, the teacher wants to select a group of 4 students for a project. She decides to select the group by drawing names from a hat. One student argues that the probability of any particular group of 4 being selected is \(1/^{30}P_4\). Another says it is \(1/^{30}C_4\). Who is correct? Justify your answer.  
COMPETENCY: Translating real-world situations to mathematical expressions; Comparing and justifying  
STEPS:
- Step 1: Understand that drawing names from a hat without regard to order means each group of 4 is equally likely.  
- Step 2: Recognize that the total number of possible groups is the number of combinations of 30 students taken 4 at a time, i.e., \(^{30}C_4\).  
- Step 3: The probability of a specific group is 1 divided by the total number of equally likely outcomes.  
- Step 4: Conclude that the second student is correct; the first student incorrectly used permutations, which would count ordered selections.  
ANSWER: The second student is correct. The number of equally likely outcomes is \(^{30}C_4\), so probability = \(1/^{30}C_4\).  
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A cricket team of 11 players is to be selected from a squad of 16 players, which includes 5 bowlers and 2 wicketkeepers. The team must include at least 3 bowlers and exactly 1 wicketkeeper. How many different teams can be formed? (Assume all players are distinct and a player can only have one primary role; the remaining players are all-rounders/batsmen.)  
COMPETENCY: Error identification and correction; Multi-step analytical reasoning  
STEPS:
- Step 1: Identify total players: 16 = 5 bowlers + 2 wicketkeepers + 9 others (all-rounders/batsmen).  
- Step 2: The team must have exactly 1 wicketkeeper: choose 1 from 2: \(^2C_1 = 2\).  
- Step 3: The team must have at least 3 bowlers. We consider cases for number of bowlers: 3, 4, or 5.  
- Step 4: For each case, select bowlers from 5, and the remaining players from the 9 others (since wicketkeeper already chosen, and we need total 11).  
  - Case 1: 3 bowlers, 1 wicketkeeper, 7 others: \(^5C_3 \times ^2C_1 \times ^9C_7 = 10 \times 2 \times 36 = 720\).  
  - Case 2: 4 bowlers, 1 wicketkeeper, 6 others: \(^5C_4 \times 2 \times ^9C_6 = 5 \times 2 \times 84 = 840\).  
  - Case 3: 5 bowlers, 1 wicketkeeper, 5 others: \(^5C_5 \times 2 \times ^9C_5 = 1 \times 2 \times 126 = 252\).  
- Step 5: Sum the cases: \(720 + 840 + 252 = 1812\).  
- Step 6: Verify no other constraints; answer is 1812.  
ANSWER: 1812 teams  
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you have 5 different coloured pens — red, blue, green, black, and purple — and you want to ______ 3 to put in your pencil case.

## DIAGNOSTIC_ANSWER_7
choose

**A wrong answer ("pick" or "take") reveals the student has paraphrased the walkthrough's verb - you want to choose 3 of the 5 coloured pens for the pencil case.** Choose is the walkthrough's own verb, and choosing without order is the combination's whole identity. Recall the red-blue-green-black-purple roster before filling, and give the verb exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you have 5 different ______ pens — red, blue, green, black, and purple — and you want to choose 3 to put in your pencil case.

## DIAGNOSTIC_ANSWER_8
coloured

**A wrong answer ("writing" or "school") reveals the student has swapped the walkthrough's adjective - the roster runs 5 different coloured pens, red through purple.** Coloured is the walkthrough's own adjective in that phrase, and the adjective is what the blank grades. Recall the choose-3-for-the-case question before filling, and give the adjective exactly.
