## ELI5
Electing a 3-member council - President, Vice-President, Secretary - from 8 candidates, but the Class Captain must be in and two suspended students cannot be. Restrictions stack, and each one edits the counting problem: reserve a slot for the Captain, delete the two suspended names from the pool, then arrange what remains. Inclusion shrinks the free slots, exclusion shrinks the eligible pool - modify n and r first, and only then let the permutation formula run.

## DEFINITION
Permutations with Restrictions refer to the number of arrangements of *n* distinct objects taken *r* at a time where specific conditions constrain the selection or placement of objects, such as certain objects always being included, never being included, always staying together, never staying together, or occupying fixed positions.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must be able to independently identify the restriction type (inclusion, exclusion, adjacency, fixed position) in a word problem, select the correct strategy (Total − Forbidden, Bundle Method, Gap Method, or Direct Placement), and compute the answer using factorial notation with correct arithmetic simplification.

## SCOPE_BOUNDARY
This node covers permutations of *distinct* objects with restrictions: (1) *m* particular things never occur ($^{n-m}P_r$), (2) *m* particular things always occur ($^rP_m \times ^{n-m}P_{r-m}$), (3) specified things always together (bundle method), (4) specified things never together (gap method), and (5) objects occupying fixed positions. It does NOT cover permutations with repeated identical objects (covered in c11_app_cbse_06_004) or circular permutations with restrictions (covered in c11_app_cbse_06_005).

## WALKTHROUGH
Suppose your school is electing a 3-member Student Council (President, Vice-President, Secretary) from 8 candidates. The Principal mandates that the current Class Captain *must* be included, but the two candidates who were suspended last term *cannot* be nominated. How many valid councils are possible? Start by identifying the two distinct restrictions: a mandatory inclusion and a mandatory exclusion. Handle the inclusion first: reserve a spot for the Captain and arrange the remaining spots from the eligible pool. Then apply the exclusion by reducing the eligible pool *before* arranging. The key insight is that restrictions stack — you modify the *available pool* (n) and the *slots to fill* (r) sequentially before applying $^nP_r$.

Takeaway: mastery means naming the restriction type - inclusion, exclusion, together, apart, fixed position - and picking the matching strategy before any factorial appears. Exam moves: restricted-arrangement questions and choose-the-strategy items on the council scene. Check yourself: handle the mandatory inclusion first, because it changes how many slots remain for everyone else. Students miss it because the problem reads like one big arrangement, when the captain-and-suspensions setup shows the design: each restriction is a separate edit to the pool or the slots, and the forbidden-count shortcut - total minus bad ones - is often cheaper than direct placement; sequencing the edits is the whole skill.

## DIAGNOSTIC_QUESTION_1
State the formula for the number of permutations of $n$ different things taken $r$ at a time in which $m$ particular things **never** occur. Define the condition on $n, m, r$ for this formula to be valid.

## DIAGNOSTIC_ANSWER_1
The formula is $^{n-m}P_r$, valid only when $n - m \ge r$. A wrong answer (e.g., writing $^nP_r - ^mP_r$ or $^nP_r - ^{n-m}P_r$) reveals the student is confusing "total minus forbidden" logic with the direct reduction of the pool. They are trying to subtract arrangements rather than realizing the pool of available objects has physically shrunk to $n-m$.

## DIAGNOSTIC_QUESTION_2
Explain why the formula for permutations where $m$ particular things **always** occur is $^rP_m \times ^{n-m}P_{r-m}$ and not simply $^{n-m}P_{r-m}$. Use a concrete example with $n=5, r=3, m=1$ to illustrate.

## DIAGNOSTIC_ANSWER_2
The factor $^rP_m$ accounts for choosing *which positions* the $m$ fixed objects occupy and *arranging them* in those positions. $^{n-m}P_{r-m}$ only fills the remaining slots. If a student omits $^rP_m$, they assume the fixed objects occupy specific pre-determined positions (e.g., "the first $m$ spots"), ignoring that the fixed objects can be placed in *any* of the $r$ positions. For $n=5 \{A,B,C,D,E\}, r=3, m=1$ (A must be included): $^3P_1 \times ^4P_2 = 3 \times 12 = 36$. Just $^4P_2 = 12$ only counts arrangements where A is in a specific spot (e.g., 1st position).

## DIAGNOSTIC_QUESTION_3
A 5-digit code is formed using digits 1–9 without repetition. The code must contain the digit '5' but must not contain the digit '2'. How many such codes are possible? Show your steps.

## DIAGNOSTIC_ANSWER_3
Total digits available initially: 9. Exclusion: Remove '2' $\rightarrow$ pool = 8 digits $\{1,3,4,5,6,7,8,9\}$. Inclusion: '5' is mandatory. We need 5-digit codes ($r=5$) from $n=8$ with $m=1$ fixed.
Step 1: Place mandatory '5' in one of 5 positions: $^5P_1 = 5$ ways.
Step 2: Fill remaining 4 positions from remaining 7 digits: $^7P_4 = 7 \times 6 \times 5 \times 4 = 840$.
Total $= 5 \times 840 = 4200$.
A wrong answer like $^8P_5 - ^7P_5$ reveals the student treats "must include 5" as a subtraction problem (Total without 2 minus Total without 2 and 5) but fails to realize $^7P_5$ counts codes *excluding* 5 from the *reduced* pool of 7, which is correct logic but computationally longer. A more dangerous error is $^9P_5 - ^8P_5 - ^8P_5$, showing confusion about the changing pool size.

## DIAGNOSTIC_QUESTION_4
Compare the "Bundle Method" (things always together) and the "Gap Method" (things never together). For 7 distinct books on a shelf where 3 specific books (Math, Physics, Chemistry) must **never** be adjacent, explain why we arrange the *other* 4 books first. What does the "Gap" represent physically?

## DIAGNOSTIC_ANSWER_4
We arrange the 4 "unrestricted" books first because they create the *slots* (gaps) where the restricted books can be placed safely. Physically, 4 books in a row create 5 gaps: `_ B1 _ B2 _ B3 _ B4 _` (3 internal + 2 ends). The 3 restricted books must choose 3 of these 5 gaps ($^5P_3$ ways) and arrange themselves within those chosen gaps ($3!$ ways). Total $= 4! \times ^5P_3$. A student who arranges the 3 restricted books first fails to see that the "separators" are the unrestricted objects; the gaps do not exist until the separators are placed.

## DIAGNOSTIC_QUESTION_5
Critique this student's solution: *"Find arrangements of 'COMPUTER' where vowels occupy only even positions. There are 3 vowels (O, U, E) and 3 even positions (2, 4, 6). Arrange vowels in $^3P_3 = 6$ ways. Arrange 5 consonants in remaining 5 positions in $^5P_5 = 120$ ways. Answer = $6 \times 120 = 720$."*

## DIAGNOSTIC_ANSWER_5
The solution is **correct** in result but the reasoning "3 vowels and 3 even positions" is coincidentally true only because the word has 8 letters. The student did not explicitly verify that the number of vowels $\le$ number of even positions. If the word were 'EDUCATION' (5 vowels, 4 even positions in 9 letters), the answer would be 0, but this method would wrongly compute $^4P_5$ (undefined). The student must state the feasibility condition: $\text{Number of restricted items} \le \text{Number of restricted positions}$.

## DIAGNOSTIC_QUESTION_6
Create a new word problem (Indian context) involving permutations with **two simultaneous restrictions**: one "always together" and one "never together". Define the objects, the restrictions, and the total count $n$. Do not solve it.

## DIAGNOSTIC_ANSWER_6
Example: *"A wedding photographer must arrange 8 family members in a row. The Bride and Groom (2 people) must stand together. The two feuding uncles (2 different people) must not stand together. How many arrangements?"* A good problem clearly identifies 4 distinct special objects forming two disjoint pairs with opposing restrictions, and $n=8$. A poor problem makes the pairs overlap (e.g., Bride must be with Groom, but Bride must not be with Uncle), which introduces conditional probability complexity beyond this node's scope.

## COMMON_MISCONCEPTION
Students treat "A and B never together" as "Total arrangements $-$ Arrangements with A and B together" but calculate the "together" case as $2! \times (n-1)!$ **without checking if A and B are distinct from other restricted items**. For example, in "Arrange 5 boys and 3 girls so no two girls are together AND two specific boys (Ram, Shyam) are always together," a student bundles Ram-Shyam (1 unit), counts 4 boys + 3 girls = 7 units, arranges boys ($4!$), creates gaps ($^5P_3$ for girls), and multiplies by $2!$ for Ram-Shyam. This is **wrong** because bundling Ram-Shyam reduces the *boy-count* creating fewer gaps for girls. The correct approach: Treat Ram-Shyam as a block *within* the boy-arrangement step, not as a replacement for two boys before gap creation.

## ON_FAILURE
1. Ask the student to draw the physical positions (slots) for a small case ($n=5, r=3$).
2. For "Never Together": Force them to place the "separators" (unrestricted items) first on paper, physically draw the gaps (underscores), then place the restricted items into gaps. Say: *"Gaps are born from separators. No separators = no gaps."*
3. For "Always Together": Have them tie a rubber band around the bundled items. Ask: *"Does this rubber band become a single 'super-item' for the whole problem, or only for the arrangement step?"* Guide them to see the bundle arranges internally *after* the external arrangement.
4. For Mixed Restrictions: Use the "Sequential Constraint Application" checklist: (a) Handle Fixed Positions first (place them, remove slots). (b) Handle Always Together (bundle, reduce count). (c) Handle Never Together (Gap method on *current* items). (d) Handle Always Included (Place them in remaining slots). (e) Handle Never Included (Remove from pool).

## PREREQUISITE_NODE_IDS
c11_app_cbse_06_002, c11_app_cbse_06_003, c11_app_cbse_06_004

## PREREQUISITE_REASONS
c11_app_cbse_06_002: Factorial notation ($n!$) and simplification ($\frac{n!}{(n-r)!}$) are the computational engine for every permutation formula used here.
c11_app_cbse_06_003: Fundamental Principles of Counting (Multiplication/Addition) underlie the logic of "Bundle Method" (arrange bundle $\times$ arrange inside) and "Gap Method" (arrange separators $\times$ choose gaps $\times$ arrange restricted).
c11_app_cbse_06_004: Basic Permutation formula $^nP_r = \frac{n!}{(n-r)!}$ and the concept of arranging distinct objects in a line are the direct foundation; restrictions are modifications of this base case.

## FORWARD_NODE_IDS
c11_app_cbse_06_007, c11_app_cbse_06_008

## FORWARD_REASONS
c11_app_cbse_06_007: Combinations ($^nC_r$) are derived from Permutations ($^nP_r = ^nC_r \times r!$). Restricted Permutations logic (inclusion/exclusion) directly translates to Restricted Combinations (committee selection with conditions).
c11_app_cbse_06_008: Combinations with Repetition extends the "selection" logic to infinite supply; the restriction frameworks (stars and bars with bounds) are the combinatorial analogues of the permutation restrictions taught here.

## CROSS_SUBJECT_PREREQS
none

## CROSS_SUBJECT_REASONS
none

## CHAIN_DESCRIPTION
c11_app_cbse_06_004 -> c11_app_cbse_06_006 -> c11_app_cbse_06_007

## THIS_FORMULA
1. **Never Occur:** $^{n-m}P_r$ (condition: $n-m \ge r$)
2. **Always Occur:** $^rP_m \times ^{n-m}P_{r-m}$
3. **Always Together (Bundle):** $(n-m+1)! \times m!$ (for all $n$ taken all) or $^{n-m+1}P_{r-m+1} \times m!$ (for $r$ at a time)
4. **Never Together (Gap):** $^{n-m}P_{n-m} \times ^{(n-m+1)}P_m$ (for all $n$ taken all) or Arrange $(r-m)$ others $\times$ Choose $m$ gaps from $(r-m+1)$ $\times$ Arrange $m$ restricted.
5. **Fixed Positions:** Place fixed objects $\rightarrow$ Reduce $n$ and $r$ $\rightarrow$ Apply $^{n'}P_{r'}$.

## FORMULA_VARIABLES
$n$ = Total distinct objects available; $r$ = Number of objects taken/arranged at a time ($r \le n$); $m$ = Number of objects subject to the specific restriction; $P$ = Permutation operator; $!$ = Factorial.

## FORMULA_UNITS
Dimensionless (count of arrangements).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_kinematics | In kinematics, counting distinct paths of a particle on a grid (e.g., only Right/Up moves) with forbidden coordinates is a direct application of Permutations with Restrictions (Exclusion/Inclusion of specific grid points).
c11_cs_programming | Recursive backtracking algorithms (e.g., N-Queens, Sudoku solvers) implement "Permutations with Restrictions" by placing items (queens/numbers) subject to constraints (non-attacking/row-col-box unique), pruning the permutation tree exactly like the Gap/Bundle methods.

## PREREQ_CONCEPT
Mastery of the Fundamental Principle of Multiplication and the standard Permutation formula $^nP_r = \frac{n!}{(n-r)!}$ for distinct objects without repetition.

## PREREQ_BEFORE
Student must fluently compute $^nP_r$ and simplify factorial ratios (e.g., $\frac{8!}{5!} = 8 \times 7 \times 6$) without a calculator.

## PREREQ_STUCK
Review **c11_app_cbse_06_004 (Permutations)** Examples 17-24, specifically the algebraic manipulation of $^nP_r$ equations and the logic of "Fixing positions" (Example 22).

## WORKED_EXAMPLE_1
PROBLEM: A university department has 10 professors: 4 from Computer Science (CS), 3 from Mathematics (Math), and 3 from Physics (Phy). A 5-member curriculum committee must be formed and seated in a row for a photo. The committee must include the HOD (who is a CS professor) and the two Math professors must **not** sit next to each other. How many seating arrangements are possible for the committee?
STEPS:
- Step 1: Identify constraints. Total $n=10$. Committee size $r=5$. Restriction A (Inclusion): HOD (1 specific person) MUST be on committee. Restriction B (Non-adjacency): The 2 specific Math professors (call them $M_1, M_2$) must NOT be adjacent in the final row seating.
- Step 2: Handle Selection (Committee Formation) first. Since HOD is fixed, we need to choose 4 more members from the remaining 9 professors. Number of ways to select the *group* = $^9C_4 = 126$.
- Step 3: For *each* selected group of 5 people, count valid seatings (Permutations with Restriction B). The group always contains HOD + 4 others. Among these 4 others, the number of Math professors ($k$) can be 0, 1, or 2. We must sum over cases based on $k$.
- Step 4: Case Analysis for Seating Arrangements of a specific 5-person group:
    - Case $k=0$ (No Math profs in group): 0 restricted items. Arrangements = $5! = 120$.
    - Case $k=1$ (One Math prof): 1 restricted item, cannot be adjacent to another Math prof (impossible). Arrangements = $5! = 120$.
    - Case $k=2$ (Both $M_1, M_2$ in group): Use Gap Method. Arrange the other 3 people (HOD + 2 others) in $3! = 6$ ways. This creates 4 gaps. Place $M_1, M_2$ in 2 of 4 gaps: $^4P_2 = 12$ ways. Total for this case = $6 \times 12 = 72$.
- Step 5: Count how many groups fall into each case.
    - $k=0$: Choose 4 from 7 non-Math (3 CS left + 3 Phy) = $^7C_4 = 35$ groups.
    - $k=1$: Choose 1 from 2 Math $\times$ Choose 3 from 7 non-Math = $^2C_1 \times ^7C_3 = 2 \times 35 = 70$ groups.
    - $k=2$: Choose 2 from 2 Math $\times$ Choose 2 from 7 non-Math = $1 \times ^7C_2 = 21$ groups.
    - Check: $35 + 70 + 21 = 126$ (matches Step 2).
- Step 6: Total Arrangements = $(35 \times 120) + (70 \times 120) + (21 \times 72) = 4200 + 8400 + 1512 = 14,112$.
REASONING: This problem combines **Selection (Combination)** with **Restricted Permutation**. We cannot apply permutation formulas directly to $n=10$ because the committee is a subset. We must use the "Law of Total Probability" logic: Partition the sample space (all possible committees) by the composition of the restricted items (Math profs), compute the restricted permutations for each partition, and sum weighted by the number of committees in that partition.
ANSWER: 14,112 seating arrangements.

## WORKED_EXAMPLE_2
PROBLEM: Find the number of 6-digit numbers that can be formed using digits 0, 1, 2, 3, 4, 5, 6, 7 (no repetition) such that the number is divisible by 5 and the digits 2 and 3 are **never** together.
STEPS:
- Step 1: Analyze constraints. Digits = $\{0,1,2,3,4,5,6,7\}$ ($n=8$). Length $r=6$. Divisible by 5 $\implies$ Last digit (Units place) is 0 or 5. Restriction: 2 and 3 never adjacent.
- Step 2: Split into two mutually exclusive cases based on the Unit digit (Fixed Position restriction).
- Step 3: **Case 1: Unit digit = 0.** Fixed. Remaining pool = $\{1,2,3,4,5,6,7\}$ ($n'=7$). Fill 5 places (Ten-thousands to Tens). Restriction: 2 and 3 not adjacent.
    - Total arrangements of 5 from 7 = $^7P_5 = 2520$.
    - Arrangements where 2,3 ARE together (Bundle): Treat $\{2,3\}$ as 1 block. Items to arrange = Block + choose 3 others from $\{1,4,5,6,7\}$ ($^5C_3=10$ ways). Total items = 4. Arrange 4 items in $4! = 24$ ways. Arrange inside block = $2! = 2$. Total "Together" = $10 \times 24 \times 2 = 480$.
    - Valid for Case 1 = $2520 - 480 = 2040$.
- Step 4: **Case 2: Unit digit = 5.** Fixed. Remaining pool = $\{0,1,2,3,4,6,7\}$ ($n'=7$). Fill 5 places. **Crucial:** First digit (Lakh's place) $\neq 0$. Restriction: 2 and 3 not adjacent.
    - Subcase 2a: 0 is NOT used in the 5 places. Pool = $\{1,2,3,4,6,7\}$ (6 digits). Arrange 5 from 6 = $^6P_5 = 720$. Together (Bundle 2,3): Items = Block + 3 from $\{1,4,6,7\}$ ($^4C_3=4$). Arrange 4 items = $4! \times 2 = 48$. Together = $4 \times 48 = 192$. Valid = $720 - 192 = 528$.
    - Subcase 2b: 0 IS used (in one of positions 2-5). Place 0 in 4 ways (positions 2,3,4,5). Remaining 4 places from $\{1,2,3,4,6,7\}$ (6 digits). Total arrangements = $4 \times ^6P_4 = 4 \times 360 = 1440$.
    - Together count for Subcase 2b: Bundle $\{2,3\}$. Place 0 (4 ways). Now arrange Block + 2 others (chosen from 4 remaining $\{1,4,6,7\}$) in 4 positions. Choose 2 others: $^4C_2=6$. Arrange 3 items (Block, X, Y) in $3! \times 2 = 12$. Together = $4 \times 6 \times 12 = 288$.
    - Valid Subcase 2b = $1440 - 288 = 1152$.
    - Total Case 2 = $528 + 1152 = 1680$.
- Step 5: Total Numbers = Case 1 + Case 2 = $2040 + 1680 = 3720$.
REASONING: Divisibility fixes the last digit (Fixed Position). The "Never Together" restriction applies to the *remaining* positions. The presence of '0' (cannot lead) creates a sub-restriction on the first digit, forcing a sub-case split (0 used vs 0 not used) *inside* the Case 2 calculation. The "Total - Together" (Complement) approach is cleaner than Gap Method here because we are selecting a subset ($r=5$ from $n=7$) rather than arranging all items.
ANSWER: 3,720 numbers.

## WORKED_EXAMPLE_3
PROBLEM: In a board meeting, 12 directors (8 Men, 4 Women) are to be seated around a rectangular table: 3 on each longer side, 3 on each shorter side (total 12 seats, distinct positions). The Chairperson (a specific Man) must sit at the Head position (middle of one shorter side). The two most senior Women must sit on the **same longer side** (adjacent or with one gap). The two most junior Men must **not** sit on the same side. How many seating arrangements?
STEPS:
- Step 1: Model the seats. 12 distinct labeled seats. Head (H) fixed for Chairperson (C). Remaining: 11 seats. Sides: Side A (Long, 3 seats), Side B (Long, 3 seats), Side C (Short, 2 seats left + Head), Side D (Short, 3 seats). Wait, standard rectangular: 2 Long (3 each), 2 Short (3 each)? "3 on each longer side, 3 on each shorter side" $\rightarrow$ 12 seats. Head is middle of Short Side 1. So Short Side 1: [Left, Head(C), Right]. Short Side 2: [L, M, R]. Long Side 1: [L, M, R]. Long Side 2: [L, M, R].
- Step 2: Place Chairperson C at Head. Remaining 11 people: 7 Men (incl 2 Junior $J_1, J_2$), 4 Women (incl 2 Senior $S_1, S_2$).
- Step 3: Handle Senior Women Restriction (Same Long Side). Long sides have 3 seats each. $S_1, S_2$ must both be on Long Side 1 OR both on Long Side 2.
    - Choose Side: 2 ways.
    - Choose 2 seats out of 3 on that side for $S_1, S_2$: $^3P_2 = 6$ ways.
    - Total ways to place Senior Women = $2 \times 6 = 12$.
- Step 4: After placing $S_1, S_2$, 9 seats remain. People left: 7 Men ($J_1, J_2$ + 5 others), 2 Women (Junior).
- Step 5: Handle Junior Men Restriction (Not Same Side). $J_1, J_2$ cannot occupy seats on the same side (any of the 4 sides).
    - Total ways to seat remaining 9 people in 9 seats = $9!$.
    - Subtract "Bad" cases where $J_1, J_2$ share a side.
    - Count Bad: Sides have capacities: Side A (Long1): 3 or 1 seats left (depending on Step 3). Side B (Long2): 3 or 1. Side C (Short1): 2 seats (Left, Right of Head). Side D (Short2): 3 seats.
    - *Complexity Alert:* Available seats per side depends on where Senior Women sat.
    - **Refined Strategy:** Combine Steps 3 & 5 using "Place Restricted First".
    - Place $S_1, S_2$ on a Long Side (12 ways as above). Suppose they take 2 seats on Long Side 1. Remaining seats: Long1: 1, Long2: 3, Short1: 2, Short2: 3. Total 9.
    - Now place $J_1, J_2$ in these 9 seats such that they are on different sides.
    - Ways to choose 2 different sides for $J_1, J_2$ from 4 sides with capacities $(1, 3, 2, 3)$.
    - Sum over pairs of sides: (Long1, Long2): $1 \times 3 = 3$ seat pairs. (Long1, Short1): $1 \times 2 = 2$. (Long1, Short2): $1 \times 3 = 3$. (Long2, Short1): $3 \times 2 = 6$. (Long2, Short2): $3 \times 3 = 9$. (Short1, Short2): $2 \times 3 = 6$. Total seat pairs = $3+2+3+6+9+6 = 29$.
    - Assign $J_1, J_2$ to chosen seats: $2! = 2$. Ways to place Juniors = $29 \times 2 = 58$.
    - Place remaining 7 people in remaining 7 seats: $7! = 5040$.
    - Total for this specific Senior Women placement (Long1, 2 specific seats) = $58 \times 5040$.
    - Since there are 12 ways to place Senior Women (Step 3), and by symmetry, the *number of available seat pairs for Juniors* is identical regardless of *which* Long side or *which* 2 seats the Senior Women took (as long as they are on a Long side). Verify: If Seniors on Long2, capacities are (3, 1, 2, 3) -> same pairs. If Seniors on seats 1&2 vs 2&3 on Long side, remaining seat on that side is 1 -> same capacities.
    - Grand Total = $12 \times 58 \times 5040 = 3,511,296$.
REASONING: This problem layers **Fixed Position**, **Same Side (Partial Adjacency)**, and **Different Sides (Separation)**. The rectangular table makes sides distinct "bins" with capacities. The key is recognizing that the Senior Women's restriction only affects the *capacity* of one Long side (reducing it from 3 to 1), and the Junior Men's restriction is a "Different Bins" problem. We place the most constrained groups (Senior Women -> specific side+seats; Junior Men -> specific sides) first, then permute the rest.
ANSWER: 3,511,296 arrangements.

## COMPETENCY_QUESTION_1
QUESTION: A password policy requires a 6-character password using characters from the set $\{A, B, C, D, E, 1, 2, 3, 4\}$ (9 distinct characters). The password must contain **exactly one** digit, and that digit **cannot** be in the first or last position. Characters cannot repeat. How many valid passwords exist?
COMPETENCY: Applying multiple simultaneous restrictions (Fixed Count of Type, Positional Exclusion) to permutations without repetition.
STEPS:
- Step 1: Choose the single digit: 4 choices (1,2,3,4).
- Step 2: Choose the position for this digit: Cannot be pos 1 or 6. Available positions: 2, 3, 4, 5 $\rightarrow$ 4 choices.
- Step 3: Place the chosen digit in the chosen position. (Fixed).
- Step 4: Remaining 5 positions must be filled with 5 distinct letters from $\{A,B,C,D,E\}$ (5 letters). This is a permutation of 5 distinct letters in 5 positions = $5! = 120$.
- Step 5: Total = (Choices for Digit) $\times$ (Choices for Position) $\times$ (Arrangements of Letters) = $4 \times 4 \times 120 = 1920$.
ANSWER: 1,920 passwords.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Find the number of ways to arrange the letters of the word **'INDEPENDENCE'** such that:
(i) The 3 N's are never together (all 3 not consecutive).
(ii) The 4 E's are never together (all 4 not consecutive).
(iii) No two vowels are adjacent. (Vowels: I, E, E, E, E).
Note: The word has 12 letters: I, N, D, E, P, E, N, D, E, N, C, E. (N=3, E=4, D=2, P=1, I=1, C=1).
COMPETENCY: Analyzing permutations of a multiset (repeated letters) with multiple, overlapping "Never Together" restrictions requiring Inclusion-Exclusion Principle and Gap Method adaptation for identical items.
STEPS:
- Step 1: Total arrangements without restrictions = $\frac{12!}{3!4!2!} = 1,663,200$.
- Step 2: Condition (i) 3 N's never together. Use Complement: Total - (3 N's together). Treat 3 N's as 1 block [NNN]. Items: [NNN], E, E, E, E, D, D, P, I, C (10 items, 4E, 2D). Arrangements = $\frac{10!}{4!2!} = 75,600$. Valid (i) = $1,663,200 - 75,600 = 1,587,600$.
- Step 3: Condition (ii) 4 E's never together. Complement: Treat 4 E's as 1 block [EEEE]. Items: [EEEE], N, N, N, D, D, P, I, C (9 items, 3N, 2D). Arrangements = $\frac{9!}{3!2!} = 30,240$. Valid (ii) = $1,663,200 - 30,240 = 1,632,960$.
- Step 4: Condition (iii) No two vowels adjacent. Vowels = I, E, E, E, E (5 vowels, 4 identical E's). Consonants = N, N, N, D, D, P, C (7 consonants, 3N, 2D).
    - Arrange Consonants first: $\frac{7!}{3!2!} = 420$ ways.
    - This creates 8 gaps (_ C _ C _ C _ C _ C _ C _ C _).
    - Choose 5 gaps out of 8 for the 5 vowels: $^8C_5 = 56$ ways.
    - Arrange the 5 vowels (I, E, E, E, E) in chosen 5 gaps: $\frac{5!}{4!} = 5$ ways.
    - Total Valid (iii) = $420 \times 56 \times 5 = 117,600$.
- Step 5: The question asks for arrangements satisfying **ALL THREE** simultaneously. This requires Inclusion-Exclusion on the *forbidden* events: $A$=3N together, $B$=4E together, $C$=Vowels adjacent. $N(A \cup B \cup C) = N(A)+N(B)+N(C) - N(A\cap B) - N(A\cap C) - N(B\cap C) + N(A\cap B\cap C)$. This is computationally heavy.
    - *Correction for Board Level:* Usually, such questions ask for (i), (ii), (iii) as separate sub-parts. If combined "AND", the answer is the Gap Method result (iii) *further restricted* by (i) and (ii). Since (iii) forces vowels separated, 4E's are automatically never together (satisfies ii). But 3N's could be together in consonant block.
    - Arrangements satisfying (iii) AND (i): From Step 4 consonant arrangements (420), subtract those where 3N's are together in the consonant line.
    - Consonants with 3N together: Block [NNN], D, D, P, C (5 items, 2D). Arrangements = $\frac{5!}{2!} = 60$.
    - Consonants with 3N separated = $420 - 60 = 360$.
    - Vowel placement unchanged (Gaps from 7 consonants always 8). Vowel arrangements = 5.
    - Final Answer = $360 \times 56 \times 5 = 100,800$.
ANSWER: 100,800 arrangements.
DIFFICULTY: hard