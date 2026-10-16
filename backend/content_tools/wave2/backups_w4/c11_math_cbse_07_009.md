## ELI5
A cultural fest must sequence 5 performances - dance, music, drama, poetry, art - with dance first and art last: the middle three fill freely, because order is the whole question. Word problems on permutations translate scenarios where arrangement matters into ⁿPᵣ = n!/(n-r)! or its variants - distinct objects, repeated letters, repetition allowed, circular sittings - reading each constraint as a reduction of free positions or items.

## DEFINITION
Word problems on applications of permutations require translating real-world scenarios into arrangements where order matters, then applying the permutation formula \(^nP_r = \frac{n!}{(n-r)!}\) or its variations (distinct objects, non-distinct objects, repetition allowed) to count the number of possible ordered selections or arrangements under given constraints.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can independently read a word problem, identify whether it involves permutations (order matters) or combinations (order doesn't matter), correctly categorize the permutation type (distinct, non-distinct, with/without repetition), set up the appropriate formula with proper substitution, and compute the answer with correct units and interpretation.

## SCOPE_BOUNDARY
This node covers word problems exclusively involving permutations: arrangements of distinct objects taken all or some at a time, arrangements with repeated objects, circular permutations, and arrangements with restrictions (together, separated, fixed positions). It does NOT cover combination word problems (node c11_math_cbse_07_010) or mixed permutation-combination problems (node c11_math_cbse_07_011).

## WALKTHROUGH
Imagine your school is organizing a cultural fest and you need to arrange 5 different performances (dance, music, drama, poetry, art) in a sequence for the evening program. The principal asks: "In how many ways can we schedule these if the dance must be first and art must be last?" This is a permutation word problem because the ORDER of performances matters. Start by reading the problem twice: first for context, second to underline key constraints (fixed positions, items that must stay together, items that cannot be adjacent). Then ask: "Are we arranging ALL items or selecting SOME?" and "Are any items identical?" This determines which permutation formula to use. The key insight: every constraint reduces the effective number of items or positions available for free arrangement.

Takeaway: mastery means the diagnostic reads - does order matter, are any items identical, is repetition permitted - before the formula choice. Exam moves: classify-and-count questions and constraint-handling items with fixed positions, blocks and bans. Check yourself: every constraint is a discount - a fixed slot removes an item, a forced pair becomes one block. Students miss it because they grab ⁿPᵣ by reflex, when the definition's craft is in the reading: two passes over the problem, then arithmetic that almost does itself.

## DIAGNOSTIC_QUESTION_1
State the permutation formula \(^nP_r\) and explain what each symbol represents. Give one real-life situation where this formula applies directly without modification.

## DIAGNOSTIC_ANSWER_1
The formula is \(^nP_r = \frac{n!}{(n-r)!}\) where \(n\) = total number of distinct objects available, \(r\) = number of objects to be arranged in order (\(r \leq n\)). A direct application: "How many 3-letter codes can be formed from 5 distinct letters {A, B, C, D, E} if no letter repeats?" Here \(n=5, r=3\), answer = \(^5P_3 = 60\). A wrong answer (e.g., writing \(n!\) or \(n^r\)) reveals the student confuses "arrangements of all objects" with "arrangements of r objects" or confuses permutations with repetition allowed.

## DIAGNOSTIC_QUESTION_2
A problem states: "Find the number of ways to arrange the letters of the word 'SUCCESS'." A student writes: \(^7P_7 = 5040\). Is this correct? Explain why or why not, and identify the exact concept the student missed.

## DIAGNOSTIC_ANSWER_2
The student's answer is incorrect. The word "SUCCESS" has 7 letters but with repetitions: S appears 3 times, C appears 2 times, U and E appear once each. The correct approach uses permutations of non-distinct objects: \(\frac{7!}{3!2!1!1!} = 420\). The student missed the concept that when objects are not all distinct, we must divide by the factorial of the frequency of each repeated object. This error shows the student applies the distinct-object formula blindly without checking for identical items.

## DIAGNOSTIC_QUESTION_3
In how many ways can 5 boys and 3 girls be seated in a row so that no two girls sit together? Show complete working.

## DIAGNOSTIC_ANSWER_3
Step 1: Arrange the 5 boys first: \(5! = 120\) ways.  
Step 2: This creates 6 gaps (before, between, after boys): \_ B1 \_ B2 \_ B3 \_ B4 \_ B5 \_  
Step 3: Choose 3 out of 6 gaps for girls: \(^6P_3 = 120\) ways (order matters as girls are distinct).  
Step 4: Total = \(120 \times 120 = 14,400\) ways.  
A wrong answer like \(^8P_8 = 40320\) (ignoring restriction) or \(5! \times ^6C_3 = 2400\) (using combinations for girls) reveals the student either ignores the "no two together" constraint or confuses permutation/combination for placing distinct girls in chosen gaps.

## DIAGNOSTIC_QUESTION_4
Compare these two problems:  
(A) "Arrange 4 different books on a shelf."  
(B) "Arrange 4 different books on a circular shelf."  
Explain why the answers differ and derive the relationship between linear and circular permutations for \(n\) distinct objects.

## DIAGNOSTIC_ANSWER_4
(A) Linear: \(4! = 24\) ways. (B) Circular: \((4-1)! = 6\) ways. In circular arrangements, rotations of the same relative order are considered identical (no fixed starting point), so we fix one object's position and arrange the remaining \(n-1\) objects linearly: \((n-1)!\). The relationship: circular permutations = \(\frac{\text{linear permutations}}{n}\). A student who gives 24 for both doesn't understand that circular symmetry reduces distinct arrangements by a factor of \(n\).

## DIAGNOSTIC_QUESTION_5
A student solves: "How many 4-digit numbers > 3000 can be formed from digits {1,2,3,4,5} without repetition?" Their working:  
Total 4-digit numbers = \(^5P_4 = 120\).  
Numbers starting with 1 or 2 = \(2 \times ^4P_3 = 48\).  
Answer = \(120 - 48 = 72\).  
Is this correct? If not, find the error and give the correct answer.

## DIAGNOSTIC_ANSWER_5
The student's method is correct and answer 72 is correct. Alternative direct method: First digit choices = {3,4,5} → 3 ways. Remaining 3 digits from 4 left → \(^4P_3 = 24\). Total = \(3 \times 24 = 72\). If a student got 60 (using \(^4P_4 = 24\) for first digit 3 only) or 96 (wrong subtraction), they misidentified valid first digits or made arithmetic errors. This evaluates whether the student can verify a solution using complementary counting.

## DIAGNOSTIC_QUESTION_6
Create a word problem on permutations that requires BOTH the "objects together" and "objects separated" techniques in the same problem. Provide the problem statement only (no solution).

## DIAGNOSTIC_ANSWER_6
Sample problem: "In how many ways can the letters of the word 'COMPUTER' be arranged so that the two vowels 'O' and 'U' are always together, but the vowels 'O' and 'E' are never together?" A good problem must have at least 3 distinct constraint items (here: O,U together; O,E separated) forcing the student to handle grouping then separation within the group. A poor problem would have only one constraint type or contradictory constraints (e.g., "A and B together but A and B separated").

## COMMON_MISCONCEPTION
Students treat "arrange in a circle" and "arrange in a row" identically, using \(n!\) for both. For example, for "5 people around a round table", they write \(5! = 120\) instead of \((5-1)! = 24\). The exact wrong step: they fail to recognize that in circular permutations, one position is fixed as reference to eliminate rotational symmetry, so only \((n-1)\) objects are effectively permuted. They also confuse "clockwise/anticlockwise different" (standard) vs "same" (necklace/garland problems) — but necklace problems are NOT in Class 11 NCERT scope.

## ON_FAILURE
If a student uses \(n!\) for circular arrangements:  
1. Draw 4 chairs in a circle labeled A,B,C,D. Ask: "If everyone moves one seat clockwise, is it a new arrangement?" (No, relative order unchanged).  
2. Show that fixing person A at "north" position leaves 3! = 6 ways to arrange B,C,D in remaining seats.  
3. Generalize: fix any 1 person → arrange remaining \(n-1\) → \((n-1)!\).  
4. Practice: "3 couples (6 people) sit around a table. Husbands and wives alternate. How many arrangements?" (Fix one husband → 2! for other husbands × 3! for wives = 12).

## PREREQUISITE_NODE_IDS
c11_math_cbse_07_001, c11_math_cbse_07_002, c11_math_cbse_07_003, c11_math_cbse_07_004, c11_math_cbse_07_005, c11_math_cbse_07_006, c6_math_ch05_058, c7_math_ch15_007, c11_math_cbse_07_008

## PREREQUISITE_REASONS
c11_math_cbse_07_001: Fundamental Principle of Counting (multiplication/addition rules) is the foundation for breaking down multi-step permutation problems.
c11_math_cbse_07_002: Factorial notation \(n!\) is essential for computing permutation formulas.
c11_math_cbse_07_003: Definition and formula of permutations \(^nP_r\) is the core tool used in all word problems.
c11_math_cbse_07_004: Permutations of distinct objects (all/some taken) covers the basic case before restrictions.
c11_math_cbse_07_005: Permutations with non-distinct objects needed for word problems with repeated letters/items.
c11_math_cbse_07_006: Permutations with repetition allowed needed for problems like "passwords with repeated characters".
c6_math_ch05_058: Word problems leading to equations builds algebraic translation skills from text to math.
c7_math_ch15_007: Setting up equations from word problems reinforces the skill of identifying variables and constraints.
c11_math_cbse_07_008: Word problems on permutations often require combination properties for selection steps within arrangements.  

## FORWARD_NODE_IDS
c11_math_cbse_07_010, c11_math_cbse_07_011
## FORWARD_REASONS
c11_math_cbse_07_010: Word problems on combinations require the same translation skills but with "order doesn't matter" logic; mastering permutations first avoids confusion.
c11_math_cbse_07_011: Mixed problems combine both concepts; students must first distinguish permutation vs combination scenarios before solving combined problems.

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_02_003, c11_chem_cbse_01_005, c11_eco_cbse_03_002
## CROSS_SUBJECT_REASONS
c11_physics_ch2_3: Kinematics problems often involve arranging events in time order (permutations of time intervals) or counting paths in motion.
c11_chemistry_ch1_5: Stereochemistry (optical isomers) uses permutations of spatial arrangements of atoms around chiral centers.
c11_economics_ch3_2: Production possibility curves involve arranging resource allocations in ordered sequences.
c11_phy_cbse_02_003: Cross-subject support: Instantaneous velocity is the rate of change of position with respect to time at a specifi... supplies tools/facts used directly in this node.  
c11_chem_cbse_01_005: Cross-subject support: Dalton's Atomic Theory is a foundational chemical model proposing that all matter consists... supplies tools/facts used directly in this node.  
c11_eco_cbse_03_002: Cross-subject support: The New Economic Policy (NEP) of 1991 is a comprehensive set of economic reforms structure... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_math_cbse_07_001 -> c11_math_cbse_07_009 -> c11_math_cbse_07_010

## THIS_FORMULA
\(^nP_r = \frac{n!}{(n-r)!}\) for distinct objects; \(\frac{n!}{p!q!r!\cdots}\) for non-distinct objects with frequencies \(p,q,r,\cdots\); \((n-1)!\) for circular permutations of \(n\) distinct objects; \(n^r\) for permutations with repetition allowed.

## FORMULA_VARIABLES
\(n\) = total number of objects available; \(r\) = number of objects to be arranged (\(r \leq n\)); \(p,q,r,\cdots\) = frequencies of identical objects in non-distinct case; all variables are positive integers.

## FORMULA_UNITS
dimensionless (count of arrangements)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch2_3 | Kinematics: counting ordered sequences of motion events (e.g., number of ways a particle can pass through checkpoints)
c11_chemistry_ch1_5 | Stereochemistry: permutations of ligand arrangements around central atom determine number of isomers
c11_computerscience_ch4_2 | Sorting algorithms: number of permutations of n elements relates to worst-case comparisons
c11_biology_ch6_3 | Genetics: permutations of allele arrangements in gamete formation

## PREREQ_CONCEPT
The Fundamental Principle of Counting (multiplication rule) is the key prerequisite: if one task can be done in \(m\) ways and a second in \(n\) ways, the sequence can be done in \(m \times n\) ways.

## PREREQ_BEFORE
Student must be able to compute \(^nP_r\) and \(\frac{n!}{p!q!}\) fluently, and distinguish between "arrangement" (permutation) and "selection" (combination) scenarios.

## PREREQ_STUCK
If stuck, revisit c11_math_cbse_07_004 (distinct permutations) and c11_math_cbse_07_005 (non-distinct permutations) to practice identifying which formula fits the object types in the problem.

## WORKED_EXAMPLE_1
PROBLEM: A school library has 5 different Mathematics books, 4 different Physics books, and 3 different Chemistry books. In how many ways can they be arranged on a shelf if books of the same subject must be together?
STEPS:
- Step 1: Identify the groups: 3 subjects (Math, Physics, Chemistry) → treat each subject as a single block initially.
- Step 2: Arrange the 3 blocks: \(3! = 6\) ways.
- Step 3: Within each block, arrange the books: Math: \(5! = 120\), Physics: \(4! = 24\), Chemistry: \(3! = 6\).
- Step 4: Apply multiplication principle: Total = \(3! \times 5! \times 4! \times 3! = 6 \times 120 \times 24 \times 6\).
- Step 5: Compute: \(6 \times 120 = 720\); \(720 \times 24 = 17,280\); \(17,280 \times 6 = 103,680\) ways.
REASONING: The "books together" constraint means we first permute the groups (subjects), then permute within each group. This is a direct application of the multiplication principle where the tasks are sequential: choose group order, then choose internal order for each group.
ANSWER: 103,680 ways

## WORKED_EXAMPLE_2
PROBLEM: How many 5-digit numbers greater than 40,000 can be formed using digits {1,2,3,4,5,6,7} if no digit is repeated?
STEPS:
- Step 1: A 5-digit number > 40,000 means the ten-thousands place (first digit) must be 4, 5, 6, or 7 → 4 choices.
- Step 2: After choosing the first digit, 6 digits remain for the other 4 positions.
- Step 3: Arrange 4 digits from remaining 6: \(^6P_4 = \frac{6!}{2!} = 360\).
- Step 4: Total = (choices for first digit) × (arrangements of rest) = \(4 \times 360\).
- Step 5: Compute: \(4 \times 360 = 1,440\) numbers.
REASONING: The constraint "greater than 40,000" restricts only the first digit. Once the first digit is fixed from the allowed set {4,5,6,7}, the remaining positions form a standard permutation of 4 from 6 distinct digits. Multiplication principle applies because first-digit choice and remaining arrangement are independent sequential tasks.
ANSWER: 1,440 numbers

## WORKED_EXAMPLE_3
PROBLEM: In how many ways can 6 men and 4 women be seated at a round table if (i) no two women sit together, (ii) two particular men must always sit together?
STEPS:
- Step 1: Handle the "two particular men together" constraint: treat those 2 men as a single block. Now we have 5 men-units (1 block + 4 other men) and 4 women = 9 units total.
- Step 2: For circular arrangement with "no two women together", first arrange the 5 men-units around the table: \((5-1)! = 4! = 24\) ways.
- Step 3: The 5 men-units create 5 gaps between them. Choose 4 gaps for 4 women: \(^5P_4 = 120\) ways (women are distinct, order matters).
- Step 4: Within the men-block, the 2 particular men can be arranged in \(2! = 2\) ways.
- Step 5: Multiply: Total = \(24 \times 120 \times 2 = 5,760\) ways.
- Step 6: Verify: No two women together ensured by gap method; men-block treated as one unit in circular arrangement; internal order of block accounted separately.
REASONING: This combines circular permutation, "together" constraint (block method), and "separated" constraint (gap method). The block reduces effective men count for circular arrangement, then gap method places women in the gaps created by men-units. Multiplication principle chains all independent choices.
ANSWER: 5,760 ways

## COMPETENCY_QUESTION_1
QUESTION: A password must be exactly 8 characters long, using only uppercase letters (A-Z) and digits (0-9). It must contain at least one digit and at least one letter. How many such passwords are possible? Explain why the answer is NOT \(36^8 - 26^8 - 10^8\).
COMPETENCY: Translating real-world situations to mathematical expressions and identifying overcounting/undercounting errors
STEPS:
- Step 1: Total characters available = 26 letters + 10 digits = 36. With repetition allowed, total 8-char strings = \(36^8\).
- Step 2: Strings with NO digits (only letters) = \(26^8\). Strings with NO letters (only digits) = \(10^8\).
- Step 3: The expression \(36^8 - 26^8 - 10^8\) subtracts both "all-letter" and "all-digit" strings, but these two sets are DISJOINT (a string cannot be both all-letters and all-digits), so no overlap to add back. The expression is actually CORRECT for "at least one letter AND at least one digit".
- Step 4: Wait — the question asks why it is NOT that expression. Let's re-read: "at least one digit AND at least one letter" means complement is "no digits OR no letters". By inclusion-exclusion: |no digits ∪ no letters| = |no digits| + |no letters| - |no digits AND no letters|. But "no digits AND no letters" is impossible (empty set) for 8-char strings. So \(36^8 - 26^8 - 10^8\) IS correct. The question contains a trick premise!
- Step 5: The correct answer: \(36^8 - 26^8 - 10^8\) IS the right answer. The premise that it's wrong is false. A student who blindly "corrects" it shows lack of critical evaluation.
ANSWER: \(36^8 - 26^8 - 10^8\) IS correct. The two excluded sets (all-letters, all-digits) are mutually exclusive, so inclusion-exclusion requires no addition back. The question tests whether the student can defend a correct method against a false challenge.
DIFFICULTY: hard

## COMPETENCY_QUESTION_2
QUESTION: The letters of the word 'DAUGHTER' are arranged randomly in a row. Find the probability that the vowels (A, U, E) occupy only the even positions (2nd, 4th, 6th, 8th). Show how this problem combines permutations with probability.
COMPETENCY: Combining multiple concepts (permutations + probability) and justifying the sample space
STEPS:
- Step 1: Total letters = 8 distinct letters. Total arrangements (sample space) = \(8! = 40,320\).
- Step 2: Even positions = 4 positions (2,4,6,8). We need to place 3 vowels in these 4 even positions.
- Step 3: Choose 3 out of 4 even positions for vowels: \(^4P_3 = 24\) ways (vowels distinct, order matters).
- Step 4: Arrange the 3 vowels in chosen positions: already counted in \(^4P_3\).
- Step 5: Remaining 5 positions (3 odd + 1 leftover even) filled by 5 consonants (D,G,H,T,R): \(5! = 120\) ways.
- Step 6: Favourable arrangements = \(24 \times 120 = 2,880\).
- Step 7: Probability = \(\frac{2880}{40320} = \frac{1}{14}\).
- Step 8: Justification: Each arrangement equally likely; permutations count ordered outcomes; probability = favourable/total.
ANSWER: Probability = \(\frac{1}{14}\). The problem combines permutation counting (for both numerator and denominator) with classical probability definition.
DIFFICULTY: medium

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine your school is organizing a cultural fest and you need to arrange 5 different ______ (dance, music, drama, poetry, art) in a sequence for the evening program.

## DIAGNOSTIC_ANSWER_7
performances

**A wrong answer ("acts" or "items") reveals the student has swapped the walkthrough's noun - the cultural fest sequences 5 different performances, dance through art, for the evening programme.** Performances is the walkthrough's own noun, and the sequencing is what makes it a permutation. Recall the dance-first, art-last constraint before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine your school is organizing a cultural fest and you need to arrange ______ different performances (dance, music, drama, poetry, art) in a sequence for the evening program.

## DIAGNOSTIC_ANSWER_8
5

**A wrong answer (any other number) reveals the student has drifted from the walkthrough - the fest must arrange 5 different performances, dance through art, in one evening sequence.** The count is the walkthrough's own figure, and the number is what the blank holds. Recall the fixed first and last slots before filling, and give the figure exactly.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can independently read a word problem, identify whether it involves permutations (order matters) or combinations (order doesn't matter), correctly categorize the permutation type (distinct, non-distinct, with/without repetition), set up the appropriate formula with proper substitution, and compute the answer with correct.
