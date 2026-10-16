## ELI5
A student council of 5 from 12 volunteers - 7 girls, 5 boys - with at least 2 girls: split into cases of exactly 2, 3, 4 or 5 girls, multiply each by its boys' complement via ⁿCᵣ, and add. Word problems on combinations handle selection scenarios where order is irrelevant - committees, teams, delegations - translating at least, at most and exactly into case sums, with the symmetry property easing the arithmetic.

## DEFINITION
Word problems on applications of combinations require identifying selection scenarios where order of choice is irrelevant, translating verbal conditions into combination expressions using \( ^nC_r = \frac{n!}{r!(n-r)!} \), and solving for the number of ways using properties like \( ^nC_r = ^nC_{n-r} \) and \( ^nC_r + ^nC_{r-1} = ^{n+1}C_r \). These problems involve selecting committees, teams, or groups from a larger set, often with constraints such as "at least," "at most," "exactly," or conditional selections.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can independently read a word problem, identify it as a combination (not permutation) situation, correctly set up the combination expressions for all cases including "at least" and "at most" constraints, compute the values using factorial simplification, and interpret the final answer in the context of the problem. They can also explain why order does not matter in their chosen approach.

## SCOPE_BOUNDARY
This node covers solving word problems using combinations for selection from distinct objects only. It includes problems with constraints (at least, at most, exactly), mixed gender/team selections, and geometric applications (lines, triangles, diagonals). It does NOT cover combinations with repetition, circular permutations, or problems requiring the multinomial theorem. All problems stay within Class 11 NCERT scope: positive integers \( n, r \) with \( 0 \le r \le n \).

## WALKTHROUGH
Imagine your school is forming a 5-member student council from 12 volunteers — 7 girls and 5 boys. The principal insists the council must have at least 2 girls. How many different councils are possible? Start by asking: "Does the order in which we pick the members matter?" No — a council with Ananya, Rohan, Priya is the same as Rohan, Priya, Ananya. This is a combination problem. First, write down the total volunteers (12) and the split (7 girls, 5 boys). Next, identify the constraint: "at least 2 girls" means 2, 3, 4, or 5 girls. For each case, compute girls chosen × boys chosen using \( ^nC_r \). Sum all cases. The key insight: break "at least" into disjoint cases, use \( ^nC_r = ^nC_{n-r} \) to simplify calculations, and always verify that \( r \le n \) for each term.

Takeaway: mastery means the order test being settled first, at-least constraints being exploded into disjoint exact cases, and each ⁿCᵣ checked for r within bounds. Exam moves: count-the-committees questions and justify-the-case-split items. Check yourself: the council with Ananya, Rohan and Priya equals the one read backwards - order blindness is the requirement, not sloppiness. Students miss it because they permute committees, when the definition's verdict was settled at the start: no roles, no order, no falling product.

## DIAGNOSTIC_QUESTION_1
State the formula for the number of combinations of \( n \) distinct objects taken \( r \) at a time, and write the condition on \( r \) for the formula to be valid.

## DIAGNOSTIC_ANSWER_1
The formula is \( ^nC_r = \frac{n!}{r!(n-r)!} \) with the condition \( 0 \le r \le n \) and \( n \) a non-negative integer. A wrong answer like \( ^nC_r = \frac{n!}{(n-r)!} \) (missing \( r! \) in denominator) reveals the student is confusing combinations with permutations \( ^nP_r \). Writing \( r > n \) as valid shows they don't understand the physical meaning: you cannot choose more objects than available.

## DIAGNOSTIC_QUESTION_2
In a word problem, the phrase "a committee of 4 is to be formed from 10 people" appears. Explain why this is a combination problem and not a permutation problem. Give a concrete example with names to illustrate.

## DIAGNOSTIC_ANSWER_2
It is a combination because the committee {A, B, C, D} is identical to {D, C, B, A} — the order of selection does not create a new committee. If the problem said "choose a President, Vice-President, Secretary, Treasurer from 10 people," then order would matter (permutation). A wrong answer claiming "committees have order" or giving an example where swapping names changes the committee reveals the student cannot distinguish selection (combination) from arrangement (permutation).

## DIAGNOSTIC_QUESTION_3
A class has 15 students: 9 boys and 6 girls. A team of 5 students is to be selected such that the team includes exactly 3 girls. How many such teams can be formed? Show all steps.

## DIAGNOSTIC_ANSWER_3
Step 1: Identify girls = 6, boys = 9, team size = 5, exactly 3 girls ⇒ 2 boys.
Step 2: Choose 3 girls from 6: \( ^6C_3 = \frac{6!}{3!3!} = 20 \).
Step 3: Choose 2 boys from 9: \( ^9C_2 = \frac{9!}{2!7!} = 36 \).
Step 4: By Fundamental Principle of Counting, total teams = \( 20 \times 36 = 720 \).
A wrong answer like \( ^{15}C_5 = 3003 \) ignores the gender constraint. An answer \( ^6C_3 + ^9C_2 = 56 \) adds instead of multiplying, showing confusion between "AND" (multiply) and "OR" (add) in counting.

## DIAGNOSTIC_QUESTION_4
Compare the number of ways to select a cricket team of 11 players from 15 players if (a) a particular player is always included, (b) a particular player is never included. Which is larger? Justify without computing the exact values.

## DIAGNOSTIC_ANSWER_4
Case (a): 1 player fixed, choose remaining 10 from 14 ⇒ \( ^{14}C_{10} = ^{14}C_4 \).
Case (b): 1 player excluded, choose 11 from remaining 14 ⇒ \( ^{14}C_{11} = ^{14}C_3 \).
Since \( ^{14}C_4 > ^{14}C_3 \) (binomial coefficients increase up to the middle), case (a) has more ways. A wrong answer claiming they are equal or that (b) is larger reveals the student doesn't know the symmetry property \( ^nC_r = ^nC_{n-r} \) or the unimodal nature of binomial coefficients.

## DIAGNOSTIC_QUESTION_5
A student solves: "From 5 men and 3 women, a committee of 4 with at least 1 woman is to be formed." Their working: Total ways = \( ^8C_4 = 70 \). Ways with no women = \( ^5C_4 = 5 \). Answer = \( 70 - 5 = 65 \). Is this correct? If yes, explain why the complement method works. If no, find the error.

## DIAGNOSTIC_ANSWER_5
The solution is correct. The complement of "at least 1 woman" is "0 women" (all men). Total unrestricted selections = \( ^8C_4 \). Selections with 0 women = choose 4 men from 5 = \( ^5C_4 \). By complement rule, desired = Total − Unwanted. A student who says "incorrect, should add cases for 1, 2, 3 women" doesn't recognize the complement method as valid and efficient. A student who computes \( ^3C_1 \times ^5C_3 + ^3C_2 \times ^5C_2 + ^3C_3 \times ^5C_1 \) and gets 65 shows understanding but misses the elegant shortcut.

## DIAGNOSTIC_QUESTION_6
Create a word problem that requires using the identity \( ^nC_r + ^nC_{r-1} = ^{n+1}C_r \) to simplify the calculation. The problem must have a real-world context (e.g., sports, school, shopping) and involve a constraint that naturally splits into two cases whose sum matches the identity.

## DIAGNOSTIC_ANSWER_6
Example: "A basketball squad of 12 players includes 2 captains. A team of 5 is to be chosen such that exactly one captain is included. In how many ways?" 
Case 1: Captain A included, Captain B excluded ⇒ choose 4 from remaining 10: \( ^{10}C_4 \).
Case 2: Captain B included, Captain A excluded ⇒ choose 4 from remaining 10: \( ^{10}C_4 \).
Total = \( 2 \times ^{10}C_4 \). This does NOT directly use the identity. 
Better problem: "From 10 students, a team of 4 is to be selected. Two particular students, A and B, refuse to be together. How many teams?" 
Total = \( ^{10}C_4 \). Teams with both A and B = \( ^8C_2 \). Answer = \( ^{10}C_4 - ^8C_2 \). 
Using identity: \( ^{10}C_4 = ^9C_4 + ^9C_3 \), and \( ^8C_2 = ^9C_3 - ^8C_3 \)... 
A good student-created problem: "A pizza place offers 10 toppings. A customer wants a pizza with 4 toppings but insists that if topping A is chosen, topping B must also be chosen. How many choices?" 
Case 1: Neither A nor B chosen ⇒ choose 4 from 8: \( ^8C_4 \).
Case 2: Both A and B chosen ⇒ choose 2 from remaining 8: \( ^8C_2 \).
Total = \( ^8C_4 + ^8C_2 \). This doesn't directly use the identity either. 
Ideal problem using identity: "In how many ways can a committee of 5 be formed from 11 people if two particular persons must either both be included or both excluded?" 
Case 1: Both included ⇒ choose 3 from remaining 9: \( ^9C_3 \).
Case 2: Both excluded ⇒ choose 5 from remaining 9: \( ^9C_5 \).
Total = \( ^9C_3 + ^9C_5 = ^9C_3 + ^9C_4 = ^{10}C_4 \) (using \( ^nC_r = ^nC_{n-r} \) and identity). 
A poor answer creates a problem without a natural case split matching the identity, or uses permutations instead.

## COMMON_MISCONCEPTION
Students treat "at least one" constraints by adding cases but forget that the cases must be mutually exclusive and collectively exhaustive. For example, in "at least 2 girls from 6 girls, 9 boys, team of 5," they write \( ^6C_2 \times ^9C_3 + ^6C_3 \times ^9C_2 + ^6C_4 \times ^9C_1 + ^6C_5 \times ^9C_0 \) correctly, but then also add \( ^6C_2 \times ^9C_3 \) again for "exactly 2 girls" thinking it's a separate scenario. Another error: using \( ^nP_r \) instead of \( ^nC_r \) for selections like "choose 3 members for a committee" because they see "choose" and think "arrange." A third error: in geometric problems like "number of diagonals in an n-sided polygon," they compute \( ^nC_2 \) (all line segments) but forget to subtract n (the sides), giving \( ^nC_2 \) instead of \( ^nC_2 - n \).

## ON_FAILURE
If a student adds overlapping cases: Ask them to list all possible teams for a tiny version (e.g., 3 girls, 2 boys, team of 3, at least 1 girl). Have them manually count and see that each team appears exactly once in their case breakdown. If they use \( ^nP_r \): Give a concrete 3-person committee {A, B, C} and ask "Is committee {A, B, C} different from {B, A, C}?" When they say no, write \( ^3P_3 = 6 \) and \( ^3C_3 = 1 \) and ask which matches. For diagonals: Draw a pentagon, count all line segments between vertices (10), then count sides (5), ask "Which are diagonals?" Guide them to subtract.

## PREREQUISITE_NODE_IDS
c11_math_cbse_07_007, c11_math_cbse_07_008, c11_math_cbse_07_009, c6_math_ch05_058, c7_math_ch15_007, c8_math_ch13_10, c9_math_ch2_10, c10_math_cbse_03_009, c10_math_cbse_04_011
## PREREQUISITE_REASONS
c11_math_cbse_07_007: Provides the definition and formula \( ^nC_r = \frac{n!}{r!(n-r)!} \) which is the core tool for all combination word problems.
c11_math_cbse_07_008: Supplies properties \( ^nC_r = ^nC_{n-r} \) and \( ^nC_r + ^nC_{r-1} = ^{n+1}C_r \) essential for simplifying calculations and solving constraint problems elegantly.
c11_math_cbse_07_009: Contrasts permutation word problems (order matters) with combination word problems (order irrelevant), preventing the common confusion between the two.
c6_math_ch05_058: Builds the foundational skill of translating word problems into mathematical equations/expressions, now applied to combinatorial expressions.
c7_math_ch15_007: Reinforces setting up equations from word problems, extended here to setting up combination expressions from verbal constraints.
c8_math_ch13_10: Develops algebraic translation of word problems, crucial for handling "at least," "at most" as inequalities in counting.
c9_math_ch2_10: Provides practice with multi-step word problems requiring systematic case analysis, directly applicable to constrained selection problems.
c10_math_cbse_03_009: Strengthens logical reasoning in age/number word problems, transferable to combinatorial reasoning with multiple constraints.
c10_math_cbse_04_011: Offers experience with quadratic word problems where setting up the correct equation is key, analogous to setting up correct combination expressions.

## FORWARD_NODE_IDS
c11_math_cbse_07_011, c12_math_cbse_13_007

## FORWARD_REASONS
c11_math_cbse_07_011: Mixed problems require seamless switching between permutation and combination reasoning. Mastery of pure combination word problems here is essential before tackling hybrid problems where both concepts appear together.
c12_math_cbse_13_007: Word problems on combinations to apply in probability contexts.  

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_03_001, c11_chem_cbse_01_001, c11_eco_cbse_02_001
## CROSS_SUBJECT_REASONS
c11_physics_ch3_001: In statistical mechanics, combinations count microstates (e.g., distributing particles in energy levels) — identical to selecting groups from distinct objects.
c11_chemistry_ch1_001: Molecular combinations in isomerism (e.g., choosing positions for substituents on a benzene ring) use \( ^nC_r \) directly.
c11_economics_ch2_001: Consumer choice theory uses combinations to count affordable bundles from a set of goods — a direct application of selection problems.
c11_phy_cbse_03_001: Cross-subject support: A scalar is a physical quantity completely specified by its magnitude (a single numerical... supplies tools/facts used directly in this node.  
c11_chem_cbse_01_001: Cross-subject support: Chemistry is the central science that studies the composition, structure, properties, and... supplies tools/facts used directly in this node.  
c11_eco_cbse_02_001: Cross-subject support: A Five Year Plan in India is a comprehensive policy document formulated by the Planning Co... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_math_cbse_07_007 -> c11_math_cbse_07_010 -> c11_math_cbse_07_011

## THIS_FORMULA
\( ^nC_r = \frac{n!}{r!(n-r)!} \) for \( 0 \le r \le n \); Key properties: \( ^nC_r = ^nC_{n-r} \), \( ^nC_r + ^nC_{r-1} = ^{n+1}C_r \), \( ^nC_0 = ^nC_n = 1 \)

## FORMULA_VARIABLES
\( n \) = total number of distinct objects available for selection; \( r \) = number of objects to be selected; \( ^nC_r \) = number of combinations (selections) possible; \( ! \) = factorial notation (\( n! = n \times (n-1) \times \cdots \times 1 \), \( 0! = 1 \))

## FORMULA_UNITS
dimensionless (counts of ways)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch3_001 | In statistical mechanics, the number of ways to choose \( r \) particles for an energy level from \( n \) available particles is \( ^nC_r \), identical to committee selection problems.
c11_chemistry_ch1_001 | Positional isomerism in organic chemistry: choosing 2 positions out of 6 on a benzene ring for substituents gives \( ^6C_2 = 15 \) isomers, a direct combination application.
c11_economics_ch2_001 | Budget constraint problems: a consumer with fixed income choosing a bundle of goods from a set of available items uses the same "selection from distinct objects" logic.
c11_computerscience_ch4_001 | Recursive combination generation algorithms use the identity \( ^nC_r = ^{n-1}C_{r-1} + ^{n-1}C_r \), mirroring the case-split method (include/exclude a specific element) taught in this node.

## PREREQ_CONCEPT
The student must be fluent in the combination formula \( ^nC_r = \frac{n!}{r!(n-r)!} \) and its basic properties, and must distinguish selection (combination) from arrangement (permutation) based on whether order matters in the context.

## PREREQ_BEFORE
The student should be able to compute \( ^nC_r \) for given \( n, r \) without a calculator (using factorial cancellation), apply \( ^nC_r = ^nC_{n-r} \) to simplify, and translate simple verbal statements like "choose 3 from 10" into \( ^{10}C_3 \).

## PREREQ_STUCK
If stuck, revisit c11_math_cbse_07_007 (Combinations: Definition and Formula) to practice factorial simplification and c11_math_cbse_07_008 (Properties of Combinations) to master \( ^nC_r = ^nC_{n-r} \) and Pascal's identity before attempting word problems.

## WORKED_EXAMPLE_1
PROBLEM: A school library has 8 different Mathematics books and 6 different Physics books. In how many ways can a student select 5 books if the selection must include at least 2 Mathematics books?
STEPS:
- Step 1: Identify the two categories — Mathematics (8 books) and Physics (6 books). Total books = 14. We need to select 5 books with constraint: at least 2 Mathematics books.
- Step 2: "At least 2 Mathematics books" means the number of Mathematics books can be 2, 3, 4, or 5. For each case, the remaining books are Physics books. List the disjoint cases: (2M, 3P), (3M, 2P), (4M, 1P), (5M, 0P).
- Step 3: For each case, compute combinations using \( ^nC_r \). Case 1: \( ^8C_2 \times ^6C_3 = \frac{8!}{2!6!} \times \frac{6!}{3!3!} = 28 \times 20 = 560 \). Case 2: \( ^8C_3 \times ^6C_2 = \frac{8!}{3!5!} \times \frac{6!}{2!4!} = 56 \times 15 = 840 \). Case 3: \( ^8C_4 \times ^6C_1 = \frac{8!}{4!4!} \times 6 = 70 \times 6 = 420 \). Case 4: \( ^8C_5 \times ^6C_0 = \frac{8!}{5!3!} \times 1 = 56 \times 1 = 56 \).
- Step 4: Add the mutually exclusive cases: Total = 560 + 840 + 420 + 56 = 1876.
- Step 5: Verify using complement method: Total unrestricted selections = \( ^{14}C_5 = 2002 \). Selections with 0 or 1 Mathematics book: (0M,5P) = \( ^8C_0 \times ^6C_5 = 1 \times 6 = 6 \); (1M,4P) = \( ^8C_1 \times ^6C_4 = 8 \times 15 = 120 \). Unwanted = 6 + 120 = 126. Desired = 2002 - 126 = 1876. Matches.
REASONING: The problem requires selection where order doesn't matter (a set of 5 books), so combinations are used. The "at least" constraint is handled by splitting into exhaustive, mutually exclusive cases. The complement method provides a verification and is often faster when the unwanted cases are fewer.
ANSWER: 1876 ways

## WORKED_EXAMPLE_2
PROBLEM: A committee of 6 is to be formed from 7 men and 4 women. In how many ways can this be done if the committee must have at most 2 women?
STEPS:
- Step 1: Identify categories: Men = 7, Women = 4. Committee size = 6. Constraint: at most 2 women ⇒ women can be 0, 1, or 2.
- Step 2: List disjoint cases based on number of women: (0W, 6M), (1W, 5M), (2W, 4M). Check feasibility: 6M from 7 is possible (\( ^7C_6 \)), 5M from 7 is possible, 4M from 7 is possible.
- Step 3: Compute each case using \( ^nC_r \). Case 1 (0W, 6M): \( ^4C_0 \times ^7C_6 = 1 \times ^7C_1 = 1 \times 7 = 7 \) (using \( ^nC_r = ^nC_{n-r} \)). Case 2 (1W, 5M): \( ^4C_1 \times ^7C_5 = 4 \times ^7C_2 = 4 \times 21 = 84 \). Case 3 (2W, 4M): \( ^4C_2 \times ^7C_4 = 6 \times ^7C_3 = 6 \times 35 = 210 \).
- Step 4: Sum the cases: Total = 7 + 84 + 210 = 301.
- Step 5: Verify with complement: Total unrestricted = \( ^{11}C_6 = ^{11}C_5 = 462 \). Unwanted cases (3 or 4 women): (3W,3M) = \( ^4C_3 \times ^7C_3 = 4 \times 35 = 140 \); (4W,2M) = \( ^4C_4 \times ^7C_2 = 1 \times 21 = 21 \). Unwanted = 140 + 21 = 161. Desired = 462 - 161 = 301. Confirmed.
REASONING: "At most 2 women" naturally splits into 0, 1, 2 women. Using \( ^nC_r = ^nC_{n-r} \) simplifies \( ^7C_6 \) to \( ^7C_1 \) and \( ^7C_5 \) to \( ^7C_2 \), making mental arithmetic easier. The complement method (unwanted = 3 or 4 women) has fewer cases here, showing strategic choice of method.
ANSWER: 301 ways

## WORKED_EXAMPLE_3
PROBLEM: There are 12 points in a plane, no three of which are collinear except 5 points which lie on a straight line. Find (i) the number of straight lines that can be formed by joining these points, (ii) the number of triangles that can be formed using these points as vertices.
STEPS:
- Step 1: Understand the geometry. 12 total points. 5 are collinear (lie on one line). The other 7 are in general position (no three collinear). Any two points determine a line; any three non-collinear points determine a triangle.
- Step 2: Part (i) — Number of straight lines. If no three were collinear, lines = \( ^{12}C_2 \) (choose any 2 points). But the 5 collinear points: any pair among them gives the SAME line. So \( ^5C_2 \) pairs produce only 1 line instead of \( ^5C_2 \) lines. Correction: subtract the overcount. Total lines = \( ^{12}C_2 - ^5C_2 + 1 \).
- Step 3: Compute part (i). \( ^{12}C_2 = \frac{12 \times 11}{2} = 66 \). \( ^5C_2 = \frac{5 \times 4}{2} = 10 \). Lines = 66 - 10 + 1 = 57.
- Step 4: Part (ii) — Number of triangles. If no three collinear, triangles = \( ^{12}C_3 \) (choose any 3 points). But the 5 collinear points: any 3 chosen from them are collinear and do NOT form a triangle. So subtract these invalid selections. Triangles = \( ^{12}C_3 - ^5C_3 \).
- Step 5: Compute part (ii). \( ^{12}C_3 = \frac{12 \times 11 \times 10}{3 \times 2 \times 1} = 220 \). \( ^5C_3 = ^5C_2 = 10 \). Triangles = 220 - 10 = 210.
- Step 6: Verify logic. The +1 in lines accounts for the single line formed by the 5 collinear points. The -\( ^5C_3 \) in triangles removes exactly the degenerate (collinear) triples. Both use the core idea: combinations count selections, then adjust for geometric constraints.
REASONING: This problem combines combinations with geometry. The key insight: combinations count pairs/triples of points, but collinearity creates overcounting (for lines) or invalid selections (for triangles). The adjustment uses the same combination formula on the collinear subset. This tests deep understanding of what \( ^nC_r \) counts.
ANSWER: (i) 57 straight lines, (ii) 210 triangles

## COMPETENCY_QUESTION_1
QUESTION: A question paper has two sections: Section A with 6 questions and Section B with 4 questions. A student must attempt 7 questions in total, selecting at least 3 from Section A and at least 2 from Section B. In how many ways can the student choose the questions? A student argues: "Total ways = \( ^{10}C_7 = 120 \), then subtract invalid selections." Is this approach valid? If yes, complete it. If no, explain why and give the correct method.
COMPETENCY: Translating real-world situations to mathematical expressions and evaluating solution strategies
STEPS:
- Step 1: Identify the constraints — total 7 questions, at least 3 from A (6 available), at least 2 from B (4 available). This means possible splits: (3A,4B), (4A,3B), (5A,2B), (6A,1B). But B has only 4 questions, so (3A,4B) is valid, (4A,3B) valid, (5A,2B) valid, (6A,1B) valid. (7A,0B) violates "at least 2 from B". (2A,5B) violates "at least 3 from A" and B has only 4.
- Step 2: Direct case method: Case 1: 3A,4B ⇒ \( ^6C_3 \times ^4C_4 = 20 \times 1 = 20 \). Case 2: 4A,3B ⇒ \( ^6C_4 \times ^4C_3 = 15 \times 4 = 60 \). Case 3: 5A,2B ⇒ \( ^6C_5 \times ^4C_2 = 6 \times 6 = 36 \). Case 4: 6A,1B ⇒ \( ^6C_6 \times ^4C_1 = 1 \times 4 = 4 \). Total = 20 + 60 + 36 + 4 = 120.
- Step 3: Evaluate student's complement approach. Total unrestricted = \( ^{10}C_7 = 120 \). Invalid selections: (0A,7B) impossible (B has 4), (1A,6B) impossible, (2A,5B) impossible (B has 4), (7A,0B) violates ≥2 from B ⇒ \( ^6C_7 \times ^4C_0 = 0 \) (can't choose 7 from 6), (0A,7B) = 0, (1A,6B) = 0, (2A,5B) = 0. Wait — all invalid cases are impossible due to insufficient questions in sections! So complement gives 120 - 0 = 120, which matches but for the wrong reason. The complement method fails to easily capture "at least" constraints when section sizes are small.
- Step 4: Conclude — student's approach gives correct numerical answer (120) but the reasoning "subtract invalid selections" is flawed because the invalid selections don't exist as computable combinations (they require choosing more questions than available). The direct case method is correct and transparent.
ANSWER: 120 ways. The student's complement approach is not valid as a general method because the "invalid" selections (e.g., 7 from Section A) are not simply \( ^6C_7 \) (which is 0 by definition) — the constraints interact with limited section sizes. The direct case analysis is the correct method.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A mixed doubles tennis match is to be arranged from 5 married couples. No husband and wife can play in the same match (i.e., they cannot be partners or opponents). In how many ways can the 4 players (2 men, 2 women) be selected and arranged into two teams of one man and one woman each?
COMPETENCY: Combining combinatorial reasoning with constraint handling and arrangement within selection
STEPS:
- Step 1: Understand the structure. We need 2 men and 2 women. They will form two teams: (Man1, Woman1) vs (Man2, Woman2). Constraint: no husband-wife pair can be among the 4 selected players (since they'd either be partners or opponents).
- Step 2: Select 2 men from 5 husbands: \( ^5C_2 = 10 \) ways.
- Step 3: For each pair of men selected, their wives are EXCLUDED from the women's selection. So we must choose 2 women from the remaining 3 wives (5 total wives - 2 wives of selected men). Ways to choose women = \( ^3C_2 = 3 \).
- Step 4: Now we have 2 specific men (say M1, M2) and 2 specific women (W3, W4, neither married to M1 or M2). We need to form two mixed doubles teams. Pair the men with women: M1 can pair with W3 or W4 (2 choices), then M2 gets the other woman. So 2 ways to form teams for each selection of 4 people.
- Step 5: Total = (ways to choose men) × (ways to choose women given men) × (ways to pair into teams) = \( 10 \times 3 \times 2 = 60 \).
- Step 6: Alternative check: Choose 2 couples to EXCLUDE? No, that's different. Verify: Total ways without restriction: Choose 2 men (\( ^5C_2 \)), choose 2 women (\( ^5C_2 \)), pair them (2 ways) = \( 10 \times 10 \times 2 = 200 \). Subtract cases where at least one couple is present... This is messier. The direct conditional selection (Step 2-4) is cleaner.
ANSWER: 60 ways
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: These problems involve selecting committees, teams, or groups from a larger set, often with ______ such as "at least," "at most," "exactly," or conditional selections.

## DIAGNOSTIC_ANSWER_7
constraints

**A wrong answer ("conditions" or "rules") reveals the student has swapped the definition's noun - committee and team problems arrive with constraints such as "at least," "at most," "exactly," or conditional selections.** Constraints is the definition's own noun for those qualifiers, and the noun is what the blank grades. Quote it in fill-ups, keeping it exact.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine your school is forming a 5-member student council from 12 ______ — 7 girls and 5 boys.

## DIAGNOSTIC_ANSWER_8
volunteers

**A wrong answer ("students" or "candidates") reveals the student has swapped the walkthrough's pool - the 5-member council draws from 12 volunteers, 7 girls and 5 boys.** Volunteers is the walkthrough's own pool noun, and the noun is what the blank grades. Recall the at-least-2-girls constraint before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: The principal insists the council must have at least ______ girls.

## DIAGNOSTIC_ANSWER_9
2

**A wrong answer (any other number) reveals the student has drifted from the walkthrough - the principal insists on at least 2 girls, the floor beneath the case split running to 5.** The figure is the walkthrough's own threshold, and the number is what the blank holds. Recall the exact-2, 3, 4 and 5 cases before filling, and give the figure exactly.

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
The student can independently read a word problem, identify it as a combination (not permutation) situation, correctly set up the combination expressions for all cases including "at least" and "at most" constraints, compute the values using factorial simplification, and interpret the final answer in the context of the problem.
