## ELI5
A UPI PIN of 4 digits, no repetition: four slots, and the choices shrink slot by slot - 10 x 9 x 8 x 7. Order is the point: keying a PIN forward and keying it backward are different PINs, so this is a permutation, counted by nPr = n!/(n-r)!. A PIN may start with 0; a 4-digit number may not - one restriction and the first slot loses a choice. Read every problem for the same three flags: arrangement or selection, repetition allowed or not, and restrictions on positions.

## DEFINITION
A permutation is an arrangement of objects in a definite order taken some or all at a time. The number of permutations of $n$ distinct objects taken $r$ at a time (without repetition) is denoted by $^nP_r$ or $P(n, r)$ and given by $^nP_r = \frac{n!}{(n-r)!}$, where $0 < r \le n$.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must be able to distinguish between permutation and combination scenarios in word problems, correctly apply the formula $^nP_r = \frac{n!}{(n-r)!}$ for distinct objects, and solve multi-step problems involving restrictions (e.g., fixed positions, objects together/separated) with full justification.

## SCOPE_BOUNDARY
This node covers permutations of distinct objects (linear arrangements) with and without repetition, the derivation and application of $^nP_r$, and problems with restrictions (fixed positions, objects always together/never together). It does **not** cover circular permutations (node `c11_app_cbse_06_005`), permutations with identical objects (covered later in the chapter), or combinations (node `c11_app_cbse_06_007`).

## WALKTHROUGH
You are creating a 4-digit PIN for your UPI app using digits 0–9 without repetition. How many unique PINs can you make? Start by identifying the "slots" (thousands, hundreds, tens, units). The first slot has 10 choices (0–9), but wait — a PIN can start with 0, unlike a 4-digit *number*. So all 4 slots are free: $10 \times 9 \times 8 \times 7 = ^{10}P_4$. The key insight: **Permutations count ordered arrangements slot-by-slot using the Fundamental Principle of Multiplication**. If the problem said "4-digit *number*," the first slot would have only 9 choices (1–9). Always read: *arrangement* vs *selection*, *repetition allowed* vs *not*, *restrictions on positions*.

Takeaway: mastery means counting ordered arrangements slot by slot with the multiplication principle and packaging the result as nPr. Exam moves: count-the-PINs questions and spot-the-restriction items on the UPI scene. Check yourself: nPr is just the descending product cut off after r slots - the factorial form is bookkeeping, the shrinking slots are the meaning. Students miss it because formula and story feel disconnected, when the PIN-versus-number contrast shows the design: the same four slots fill differently the moment one leading choice is banned, and reading the flags - order, repetition, position rules - tells you which formula the story is wearing, before a single slot is filled.

## DIAGNOSTIC_QUESTION_1
State the formula for the number of permutations of $n$ distinct objects taken $r$ at a time without repetition, and explain what each symbol represents.

## DIAGNOSTIC_ANSWER_1
The formula is $^nP_r = \frac{n!}{(n-r)!}$, where $n$ is the total number of distinct objects, $r$ is the number of objects taken at a time for arrangement ($0 < r \le n$), and $!$ denotes factorial. A wrong answer (e.g., writing $^nC_r$ or $n^r$) reveals the student confuses permutations with combinations or permutations with repetition, indicating they have not internalized the "order matters" distinction.

## DIAGNOSTIC_QUESTION_2
In how many ways can 5 students stand in a line for a photograph if two particular students, A and B, must always stand together? A student answers $5! - 4!$. Explain why this reasoning is incorrect and provide the correct approach.

## DIAGNOSTIC_ANSWER_2
The student subtracted arrangements where A and B are *not* together from total arrangements, but $4!$ does not represent "A and B not together." Correct approach: Treat A and B as a single block (1 unit). Now arrange 4 units (block + 3 others) in $4!$ ways. A and B can swap inside the block in $2!$ ways. Total = $4! \times 2! = 48$. A wrong answer reveals the student misunderstands the "together" restriction as a simple subtraction rather than a bundling strategy.

## DIAGNOSTIC_QUESTION_3
A password must be exactly 6 characters long, formed from the letters {A, B, C, D, E} and digits {1, 2, 3}. Repetition is **not** allowed. How many such passwords can be formed if the password must start with a vowel (A or E)?

## DIAGNOSTIC_ANSWER_3
Step 1: First character (vowel) — 2 choices (A or E).
Step 2: Remaining 5 characters chosen from the leftover 7 characters (3 letters + 3 digits + 1 unused vowel) without repetition: $^7P_5 = 7 \times 6 \times 5 \times 4 \times 3 = 2520$.
Step 3: Total = $2 \times 2520 = 5040$.
A wrong answer (e.g., $^8P_6$ or $2 \times 7^5$) reveals the student either ignores the restriction on the first position or incorrectly assumes repetition is allowed.

## DIAGNOSTIC_QUESTION_4
Compare the number of 4-letter "words" (arrangements) formed from the letters of the word "LOGIC" when:
(i) Repetition is NOT allowed.
(ii) Repetition IS allowed.
Explain why the ratio of (ii) to (i) is not simply $5^4 / ^5P_4$.

## DIAGNOSTIC_ANSWER_4
(i) $^5P_4 = 120$. (ii) $5^4 = 625$. Ratio = $625/120 = 125/24 \approx 5.2$. The ratio is not an integer because the two counting principles are fundamentally different: (i) uses falling factorial (multiplication with decreasing choices), (ii) uses constant multiplication (independent choices). A wrong explanation (e.g., "ratio is 5") reveals the student thinks repetition just multiplies each slot by a constant factor, missing that without repetition the *pool shrinks*.

## DIAGNOSTIC_QUESTION_5
A student claims: "The number of ways to arrange 7 different books on a shelf such that 3 particular books are never together is $7! - 5! \times 3!$." Evaluate this claim. Is it correct? If not, what is the correct expression and why?

## DIAGNOSTIC_ANSWER_5
The claim is **incorrect**. $5! \times 3!$ counts arrangements where the 3 books are **all together as a single contiguous block**. "Never together" means **no two of those three are adjacent** — a much stricter condition.
Correct method: Arrange the other 4 books first ($4!$ ways), creating 5 gaps (including ends). Choose 3 gaps out of 5 for the 3 books ($^5P_3$ ways). Total = $4! \times ^5P_3 = 24 \times 60 = 1440$.
A wrong answer reveals the student conflates "all three together" with "any two together," a classic senior-secondary error in restriction handling.

## DIAGNOSTIC_QUESTION_6
Design a real-world scenario (Indian context) where you need to find the number of permutations of 6 distinct items taken 4 at a time with the restriction that 2 specific items must occupy the first and last positions (in either order). Write the problem statement and solve it.

## DIAGNOSTIC_ANSWER_6
**Scenario**: A school's annual day committee has 6 students: {A, B, C, D, E, F}. They need to assign 4 distinct roles (Chief Guest Welcomer, Speaker, Vote of Thanks, Stage Manager) to 4 different students. The roles of "Chief Guest Welcomer" (first) and "Stage Manager" (last) must be filled by A and B (in any order). How many assignments are possible?
**Solution**: Step 1: Assign first and last roles to A and B: $2! = 2$ ways. Step 2: Fill the 2 middle roles from remaining 4 students (C, D, E, F) without repetition: $^4P_2 = 12$. Step 3: Total = $2 \times 12 = 24$.
A poor answer (e.g., just $^6P_4 = 360$) reveals the student cannot translate positional restrictions into a staged counting process.

## COMMON_MISCONCEPTION
Students often treat "vowels never come together" as "all vowels are not in a single block." For example, in the word "FRAGILE" (vowels: A, I, E), they compute $7! - 5! \times 3!$ and think this gives arrangements where no two vowels are adjacent. **This is wrong.** $7! - 5! \times 3!$ only excludes cases where *all three* vowels are consecutive. It still allows arrangements like `F R A G I L E` (A and I adjacent) or `A F R I G L E` (I and E adjacent). The correct interpretation of "never together" is **no two vowels are adjacent**, solved by the Gap Method: arrange consonants first, then place vowels in gaps. This misconception arises because "together" in daily language suggests "all as one group," but in permutations, "together" for a set means *pairwise adjacency* is forbidden.

## ON_FAILURE
1. **Concrete Modeling**: Give the student 3 vowel cards (A, I, E) and 4 consonant cards (F, R, G, L). Ask them to physically create arrangements where "vowels never come together." Have them list 5 valid and 5 invalid arrangements. 2. **Gap Method Drill**: Draw 4 consonants as `_ C _ C _ C _ C _` (5 gaps). Ask: "In how many gaps can we place 3 vowels so no two share a gap?" Answer: Choose 3 gaps out of 5 ($^5C_3$), then arrange vowels in them ($3!$). 3. **Contrast Problems**: Solve side-by-side: (a) "All vowels together" (block method), (b) "No two vowels together" (gap method). Emphasize: (a) = 1 block, (b) = separated by at least one consonant. 4. **Formula Card**: Create a flashcard: `"Never together" → Gap Method (arrange others first, then choose gaps)`. Review before every practice session.

## PREREQUISITE_NODE_IDS
c11_app_cbse_06_002, c11_app_cbse_06_003

## PREREQUISITE_REASONS
c11_app_cbse_06_002: Factorial notation ($n!$) and simplification skills (e.g., $\frac{n!}{(n-r)!} = n(n-1)...(n-r+1)$) are essential for computing and manipulating $^nP_r$.
c11_app_cbse_06_003: The Fundamental Principle of Multiplication (Rule of Product) is the foundational logic behind the derivation of $^nP_r = n(n-1)...(n-r+1)$; without it, the formula is a black box.

## FORWARD_NODE_IDS
c11_app_cbse_06_005, c11_app_cbse_06_006, c11_app_cbse_06_007

## FORWARD_REASONS
c11_app_cbse_06_005: Circular permutations build on linear permutations by fixing one position to break rotational symmetry; the core arrangement logic ($^nP_r$) remains.
c11_app_cbse_06_006: Permutations with restrictions (always together, never together, fixed positions) are direct applications of $^nP_r$ combined with bundling/gap methods.
c11_app_cbse_06_007: Combinations ($^nC_r$) are introduced as "permutations where order doesn't matter," derived from $^nP_r = ^nC_r \times r!$; understanding $^nP_r$ is prerequisite.

## CROSS_SUBJECT_PREREQS
none

## CROSS_SUBJECT_REASONS
none

## CHAIN_DESCRIPTION
c11_app_cbse_06_002 -> c11_app_cbse_06_003 -> c11_app_cbse_06_004 -> c11_app_cbse_06_005

## THIS_FORMULA
$^nP_r = \frac{n!}{(n-r)!} = n(n-1)(n-2)...(n-r+1)$ for permutations of $n$ distinct objects taken $r$ at a time without repetition. For repetition allowed: $n^r$.

## FORMULA_VARIABLES
$n$: total number of distinct objects available (positive integer).
$r$: number of objects taken at a time for arrangement (positive integer, $0 < r \le n$).
$^nP_r$: number of permutations (arrangements).
$!$: factorial, product of all positive integers up to that number ($0! = 1$).

## FORMULA_UNITS
Dimensionless (count of arrangements).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_app_cbse_06_002 | Factorial algebra ($\frac{n!}{(n-r)!}$) is the computational engine for permutations; simplification techniques (e.g., cancelling factorials) are used in every permutation problem.
c11_app_cbse_06_003 | The Fundamental Principle of Multiplication justifies the product form $n(n-1)...(n-r+1)$; every permutation problem is a sequence of dependent choices.

## PREREQ_CONCEPT
Factorial notation and simplification ($n!$, $\frac{n!}{(n-r)!}$) + Fundamental Principle of Multiplication (dependent sequential choices).

## PREREQ_BEFORE
Student must fluently simplify factorial expressions (e.g., $\frac{10!}{7!} = 10 \times 9 \times 8$) and explain why "choices multiply" when tasks are sequential and dependent.

## PREREQ_STUCK
Review factorial simplification (node `c11_app_cbse_06_002`, Examples 1–6) and the "slot method" for the Fundamental Principle of Multiplication (node `c11_app_cbse_06_003`, Examples 15–16).

## WORKED_EXAMPLE_1
PROBLEM: How many 5-digit numbers can be formed using the digits {1, 2, 3, 4, 5, 6, 7} if no digit is repeated and the number must be **odd**?
STEPS:
- Step 1: Identify the constraint — the number must be odd, so the units digit must be odd. From the given digits, odd digits are {1, 3, 5, 7} → 4 choices for the units place.
- Step 2: After fixing the units digit, 6 digits remain. The ten-thousands place (first digit) cannot be 0 (not in set anyway), so it has 6 choices.
- Step 3: The remaining 3 places (thousands, hundreds, tens) are filled from the remaining 5 digits without repetition: $^5P_3 = 5 \times 4 \times 3 = 60$ ways.
- Step 4: Apply Fundamental Principle of Multiplication: Total = (choices for units) × (choices for ten-thousands) × (arrangements for middle 3) = $4 \times 6 \times 60 = 1440$.
- Step 5: Verify: Total 5-digit numbers without repetition from 7 digits = $^7P_5 = 2520$. Roughly half should be odd (4 odd / 7 total digits ≈ 4/7). $1440 / 2520 = 4/7$. Consistent.
REASONING: The restriction on the last digit (parity) is handled first because it has fewer choices. The first digit restriction (non-zero) is automatically satisfied since 0 is not in the set. The middle positions are a standard permutation of remaining items.
ANSWER: 1440

## WORKED_EXAMPLE_2
PROBLEM: In how many ways can the letters of the word "COMPUTER" be arranged so that the vowels (O, U, E) **never come together** (i.e., no two vowels are adjacent)?
STEPS:
- Step 1: Identify consonants and vowels. Word "COMPUTER" has 8 distinct letters. Consonants: C, M, P, T, R (5). Vowels: O, U, E (3).
- Step 2: Arrange the 5 consonants first. Since all distinct, number of ways = $5! = 120$.
- Step 3: Placing 5 consonants creates 6 gaps (including ends): `_ C _ M _ P _ T _ R _`.
- Step 4: Choose 3 gaps out of 6 for the 3 vowels such that no two vowels share a gap → $^6P_3 = 6 \times 5 \times 4 = 120$ ways (order matters because vowels are distinct).
- Step 5: Total arrangements = (arrangements of consonants) × (choices of gaps for vowels) × (arrangements of vowels in chosen gaps) = $5! \times ^6P_3 = 120 \times 120 = 14,400$.
- Step 6: Cross-check: Total arrangements without restriction = $8! = 40,320$. Arrangements with all vowels together (block method) = $6! \times 3! = 4320$. Arrangements with at least two vowels together = Total - Never together = $40,320 - 14,400 = 25,920$. This is > 4320, confirming "never together" is stricter than "not all together."
REASONING: The Gap Method is the standard technique for "no two objects of a type are adjacent." We arrange the unrestricted objects (consonants) first to create fixed slots, then place restricted objects (vowels) into those slots with at most one per slot.
ANSWER: 14,400

## WORKED_EXAMPLE_3
PROBLEM: A committee of 4 is to be formed from 6 men and 4 women. In how many ways can they be seated in a row for a photograph if the 4 committee members must sit together as a block, and within the block, the women must occupy the two middle positions?
STEPS:
- Step 1: Select the committee. We need 4 people with exactly 2 women (for middle positions) and 2 men. Choose 2 women from 4: $^4C_2 = 6$. Choose 2 men from 6: $^6C_2 = 15$. Total committees = $6 \times 15 = 90$.
- Step 2: For a fixed committee of 2 women (W1, W2) and 2 men (M1, M2), arrange them in the block with women in middle: positions are [Man, Woman, Woman, Man]. Arrange 2 men in the two end positions: $2! = 2$. Arrange 2 women in the two middle positions: $2! = 2$. Arrangements per committee = $2 \times 2 = 4$.
- Step 3: The committee block (4 people) sits together with other non-committee people? Wait — the problem says "the 4 committee members must sit together as a block" but doesn't mention others. Assume only the 4 committee members are being photographed. Then the block IS the whole row. So total arrangements = (ways to choose committee) × (ways to arrange within block) = $90 \times 4 = 360$.
- Step 4: If there were other people (say, 5 other guests), we would treat the committee as 1 block + 5 guests = 6 units, arrange in $6!$ ways, then multiply by internal block arrangements (4). But since not specified, we assume only committee members.
- Step 5: Final answer: 360 ways.
REASONING: This problem combines **combination** (selecting the committee) with **permutation with positional restrictions** (arranging the selected members). The selection step uses $^nC_r$ because the committee is a set; the arrangement step uses $^nP_r$ logic because positions are distinct and ordered.
ANSWER: 360

## COMPETENCY_QUESTION_1
QUESTION: A 6-digit number is to be formed using the digits {0, 1, 2, 3, 4, 5, 6, 7} without repetition. How many such numbers are divisible by 5?
COMPETENCY: Problem Solving & Logical Reasoning (applying divisibility rule + permutation with positional restriction)
STEPS:
- Step 1: A number is divisible by 5 iff its last digit is 0 or 5. Two cases.
- Step 2: Case 1: Last digit = 0. Remaining 7 digits {1,2,3,4,5,6,7} fill first 5 positions. First digit cannot be 0 (already used), so 7 choices for first, then $^6P_4$ for middle. Total = $7 \times ^6P_4 = 7 \times 360 = 2520$.
- Step 3: Case 2: Last digit = 5. Remaining digits {0,1,2,3,4,6,7} (7 digits). First digit cannot be 0 → 6 choices (1,2,3,4,6,7). Middle 4 positions from remaining 6 digits: $^6P_4 = 360$. Total = $6 \times 360 = 2160$.
- Step 4: Total = 2520 + 2160 = 4680.
ANSWER: 4680
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Find the number of permutations of the letters of the word "INDEPENDENCE" taken 6 at a time such that the permutation contains exactly 2 vowels and 4 consonants, and the two vowels are **not adjacent**. (Note: "INDEPENDENCE" has letters: I, N, D, E, P, E, N, D, E, N, C, E → Vowels: I, E, E, E, E (1 I, 4 E's); Consonants: N, N, N, D, D, P, C (3 N's, 2 D's, 1 P, 1 C). But since we are taking permutations of *distinct* objects in this node, assume we first select distinct letters from the set of distinct letters {I, E, N, D, P, C} — 6 distinct letters: Vowels {I, E}, Consonants {N, D, P, C}. Now solve.)
COMPETENCY: Multi-concept Integration (Selection + Permutation with Restriction + Distinct Objects)
STEPS:
- Step 1: Distinct letters in "INDEPENDENCE" = {I, E, N, D, P, C} (6 distinct). Vowels = {I, E} (2). Consonants = {N, D, P, C} (4).
- Step 2: We need permutations of 6 letters taken 6 at a time? Wait — "taken 6 at a time" from 6 distinct letters means all 6 are used. But condition: exactly 2 vowels and 4 consonants. Since there are only 2 vowels total, we MUST use both I and E, and all 4 consonants. So we are arranging all 6 distinct letters with the restriction that I and E are not adjacent.
- Step 3: Total arrangements of 6 distinct letters = $6! = 720$.
- Step 4: Arrangements where I and E are adjacent: treat {I,E} as a block. Block + 4 consonants = 5 units. Arrange in $5!$ ways. I and E can swap in block: $2!$. Total adjacent = $5! \times 2! = 240$.
- Step 5: Arrangements where vowels are NOT adjacent = Total - Adjacent = $720 - 240 = 480$.
- Step 6: Alternatively, Gap Method: Arrange 4 consonants ($4! = 24$). Creates 5 gaps. Choose 2 gaps for 2 vowels ($^5P_2 = 20$). Total = $24 \times 20 = 480$. Matches.
ANSWER: 480
DIFFICULTY: hard