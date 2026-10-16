## ELI5
A cafeteria tiffin: pick any 3 of 5 snacks. ABC and CBA are the same tiffin - selection ignores order. Arrange 3 of 5 and you get 60 permutations, but every group of 3 can line up in 6 ways, so the true selection count is 60 divided by 6: just 10. That division is the formula - nCr equals nPr over r! - and it explains why every combination secretly owns r! permutations: we divide to erase the ordering we never wanted.

## DEFINITION
A combination is a selection of r objects from a set of n distinct objects where the order of selection does not matter. The number of such combinations is denoted by \( ^nC_r \) or \( C(n, r) \) and calculated as \( ^nC_r = \frac{n!}{r!(n-r)!} \), where \( 0 \le r \le n \).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must correctly identify whether a given scenario requires permutation or combination, state the combination formula with proper notation, compute \( ^nC_r \) for given n and r (including simplifying factorials), and apply the symmetry property \( ^nC_r = ^nC_{n-r} \) and Pascal's identity \( ^nC_r + ^nC_{r-1} = ^{n+1}C_r \) to solve problems.

## SCOPE_BOUNDARY
This node covers combinations of distinct objects without repetition: definition, formula derivation from permutations, properties (symmetry, Pascal's identity, boundary values), and standard applications (team selection, committee formation, geometric selections like chords/triangles). It does NOT cover combinations with repetition (node c11_app_cbse_06_008) or permutations with identical objects.

## WALKTHROUGH
You're at a cafeteria with 5 different snacks and you can choose any 3 for your tiffin. How many different tiffin combinations can you make? Start by listing them: if snacks are A,B,C,D,E, then ABC, ABD, ABE, ACD... notice ABC and CBA are the same tiffin — order doesn't matter. Now, how many ways to *arrange* 3 out of 5? That's \( ^5P_3 = 60 \). But each group of 3 (like ABC) can be arranged in \( 3! = 6 \) ways. So the number of *selections* is \( \frac{^5P_3}{3!} = 10 \). This gives the formula \( ^nC_r = \frac{^nP_r}{r!} = \frac{n!}{r!(n-r)!} \). The key insight: every combination corresponds to \( r! \) permutations, so we divide permutations by \( r! \) to eliminate order.

Takeaway: mastery means deciding order-matters or not in one sentence, then computing nCr and using the symmetry and Pascal identities to shortcut. Exam moves: perm-versus-comb questions and simplify-the-selection items on the tiffin scene. Check yourself: the symmetry property lets you swap r for n - r, so choosing 3 to take equals choosing 2 to leave. Students miss it because the formula looks like three factorials in a trenchcoat, when the ABC-versus-CBA test shows the design: permutations overcount each selection exactly r! ways, and division by r! is the refund - spot a committee, a team, a hand of cards, and reach for the refund first.

## DIAGNOSTIC_QUESTION_1
State the formula for \( ^nC_r \) and explain what each symbol represents. Also write the values of \( ^nC_0 \) and \( ^nC_n \).

## DIAGNOSTIC_ANSWER_1
\( ^nC_r = \frac{n!}{r!(n-r)!} \), where n = total distinct objects, r = objects selected (\( 0 \le r \le n \)). \( ^nC_0 = 1 \) (selecting nothing = 1 way: leave all behind) and \( ^nC_n = 1 \) (selecting all = 1 way: take everything). A wrong answer like \( ^nC_r = \frac{n!}{(n-r)!} \) reveals confusion with permutations (missing division by r!). Writing \( ^nC_0 = 0 \) shows misunderstanding that "selecting none" is a valid choice (the empty set).

## DIAGNOSTIC_QUESTION_2
A student claims: "Since \( ^8C_3 = 56 \) and \( ^8C_5 = 56 \), the formula \( ^nC_r = ^nC_{n-r} \) means r and n-r give the same value, so \( ^8C_2 \) must also equal 56." Is the student correct? Explain why or why not using the symmetry property.

## DIAGNOSTIC_ANSWER_2
The student is **incorrect**. The symmetry property states \( ^nC_r = ^nC_{n-r} \). For n=8, \( ^8C_3 = ^8C_5 \) (since 8-3=5), but \( ^8C_2 = ^8C_6 \), not \( ^8C_5 \). \( ^8C_2 = \frac{8 \times 7}{2} = 28 \), not 56. The error reveals the student memorized "r and n-r give same value" but didn't internalize that it's specifically \( r \) paired with \( n-r \), not any two numbers that happen to be equal. They're pattern-matching without understanding the structural reason: selecting r objects is equivalent to rejecting n-r objects.

## DIAGNOSTIC_QUESTION_3
From a class of 12 students (7 boys, 5 girls), a committee of 4 must be formed with **at least 2 girls**. How many different committees are possible? Show your reasoning by breaking into cases.

## DIAGNOSTIC_ANSWER_3
Cases: (2 girls, 2 boys) + (3 girls, 1 boy) + (4 girls, 0 boys).
\( ^5C_2 \times ^7C_2 = 10 \times 21 = 210 \)
\( ^5C_3 \times ^7C_1 = 10 \times 7 = 70 \)
\( ^5C_4 \times ^7C_0 = 5 \times 1 = 5 \)
Total = 210 + 70 + 5 = **285**.
A wrong answer like \( ^5C_2 \times ^{10}C_2 \) (choose 2 girls first, then 2 from remaining 10) reveals the "overcounting" misconception — it counts committees with 3 girls multiple times (once for each pair of girls chosen in the first step). The student doesn't see that cases must be **mutually exclusive and exhaustive**.

## DIAGNOSTIC_QUESTION_4
Prove that \( ^nC_r + ^nC_{r-1} = ^{n+1}C_r \) using the factorial definition. Then explain the combinatorial reasoning: why does this identity make sense in terms of selecting r objects from (n+1) objects?

## DIAGNOSTIC_ANSWER_4
**Algebraic proof:**
\( ^nC_r + ^nC_{r-1} = \frac{n!}{r!(n-r)!} + \frac{n!}{(r-1)!(n-r+1)!} \)
\( = \frac{n!}{(r-1)!(n-r)!} \left[ \frac{1}{r} + \frac{1}{n-r+1} \right] \)
\( = \frac{n!}{(r-1)!(n-r)!} \cdot \frac{n-r+1+r}{r(n-r+1)} \)
\( = \frac{n!}{(r-1)!(n-r)!} \cdot \frac{n+1}{r(n-r+1)} \)
\( = \frac{(n+1)!}{r!(n+1-r)!} = ^{n+1}C_r \).

**Combinatorial reasoning:** From (n+1) objects, fix one special object X. To choose r objects: either X is included (choose r-1 from remaining n: \( ^nC_{r-1} \) ways) or X is excluded (choose r from remaining n: \( ^nC_r \) ways). These are disjoint cases covering all possibilities, so total = \( ^nC_r + ^nC_{r-1} \).
A student who only does the algebra but cannot explain the combinatorial story shows procedural fluency without conceptual understanding — they're manipulating symbols without seeing the selection logic.

## DIAGNOSTIC_QUESTION_5
A test has 10 questions. A student must answer 7 questions, but **must answer at least 3 of the first 5 questions**. Evaluate the proposed solution: "Choose 3 from first 5 (\( ^5C_3 \)), then choose remaining 4 from the other 7 questions (\( ^7C_4 \)), so answer = \( ^5C_3 \times ^7C_4 = 10 \times 35 = 350 \)." Is this correct? If not, find the correct answer and explain the flaw.

## DIAGNOSTIC_ANSWER_5
The proposed solution is **incorrect** — it overcounts. The flaw: choosing 3 from first 5 *then* 4 from remaining 7 counts selections with 4 or 5 questions from the first 5 multiple times. Example: if a student picks Q1,Q2,Q3,Q4 from first 5, this gets counted \( ^4C_3 = 4 \) times (once for each 3-subset chosen in step 1).

**Correct approach — cases based on how many from first 5:**
- Exactly 3 from first 5, 4 from last 5: \( ^5C_3 \times ^5C_4 = 10 \times 5 = 50 \)
- Exactly 4 from first 5, 3 from last 5: \( ^5C_4 \times ^5C_3 = 5 \times 10 = 50 \)
- Exactly 5 from first 5, 2 from last 5: \( ^5C_5 \times ^5C_2 = 1 \times 10 = 10 \)
Total = **110**.
A student who accepts the flawed solution doesn't grasp that "at least" requires partitioning into **mutually exclusive exact-count cases**, not a two-step "choose minimum then fill rest" which creates overlapping categories.

## DIAGNOSTIC_QUESTION_6
Create a real-world scenario (Indian context) where you need to select a group from a larger set, and the answer is \( ^{12}C_5 \). The scenario must naturally require "at least" or "at most" condition that simplifies to exactly this combination. Explain why your scenario yields \( ^{12}C_5 \) and not a permutation.

## DIAGNOSTIC_ANSWER_6
**Scenario:** A school has 12 teachers (5 Math, 4 Science, 3 Language). A 5-member curriculum committee must be formed with **at most 2 Math teachers**.
**Why \( ^{12}C_5 \)?** Wait — this doesn't simplify to \( ^{12}C_5 \) directly. Let me create a correct one:
**Better scenario:** From 12 candidates for a student council, 5 must be selected for the executive board. The only condition is that **two specific rivals (Aman and Bina) cannot both be on the board**.
Number of valid boards = Total boards - Boards with both = \( ^{12}C_5 - ^{10}C_3 = 792 - 120 = 672 \). Still not \( ^{12}C_5 \).

**Correct scenario for exactly \( ^{12}C_5 \):** "A basketball coach must choose 5 starting players from a squad of 12. How many different starting lineups (as a set, ignoring positions) are possible?"
This is a pure selection: order doesn't matter (no positions like PG/SG), so \( ^{12}C_5 \). If the problem said "assign 5 distinct positions (PG, SG, SF, PF, C) from 12 players," it would be \( ^{12}P_5 \).
A poor answer gives a scenario with conditions that don't simplify to a single \( ^nC_r \) (like "at least 2 seniors" requiring casework) or confuses selection with arrangement (mentions "captain and vice-captain" which implies order). The key is recognizing **pure unordered selection with no extra constraints**.

## COMMON_MISCONCEPTION
**"Choosing then arranging" confusion**: Students see "select 3 students from 10 to be President, Vice-President, Secretary" and compute \( ^{10}C_3 = 120 \), forgetting the *roles are distinct* (order matters). The correct approach: \( ^{10}P_3 = 720 \) or \( ^{10}C_3 \times 3! \). The error stems from hearing "select" and automatically using combination formula, ignoring that the *positions create an ordering*. Conversely, for "select 3 students for a committee," they sometimes compute \( ^{10}P_3 \) because "first member, second member, third member" feels like order. The root cause: not asking **"If I swap two chosen people, is the outcome different?"** — if YES → permutation; if NO → combination.

## ON_FAILURE
1. **Ask the swap question**: "You chose A, B, C. If I reorder them as B, A, C, is it a *different* outcome in this problem?" If yes → permutation; if no → combination.
2. **Role-play with small numbers**: Use 4 students {A,B,C,D}, choose 2. List all permutations (AB, BA, AC, CA, AD, DA, BC, CB, BD, DB, CD, DC = 12). Group by pair: {AB, BA}, {AC, CA}... each pair = 1 combination. Count pairs = 6 = \( ^4C_2 \). Show \( ^4P_2 / 2! = 12/2 = 6 \).
3. **Keyword trap drill**: Give 5 problems — some with "arrange/rank/assign positions" (permutation), some with "select/choose/form committee/team" (combination). Student must label P or C and justify with the swap test before computing.
4. **Connect to formula**: Derive \( ^nC_r = ^nP_r / r! \) again visually: each combination of r objects produces r! permutations. Division by r! "collapses" ordered tuples into unordered sets.

## PREREQUISITE_NODE_IDS
c11_app_cbse_06_002, c11_app_cbse_06_003, c11_app_cbse_06_004

## PREREQUISITE_REASONS
c11_app_cbse_06_002: Factorial notation (n!) and simplification (e.g., n!/(n-r)!) are essential for computing and manipulating combination formulas.
c11_app_cbse_06_003: Fundamental Principle of Multiplication underpins the derivation nPr = nCr × r! — each combination yields r! permutations.
c11_app_cbse_06_004: Permutation formula (nPr = n!/(n-r)!) is the direct precursor; combinations are derived by dividing permutations by r! to remove order.

## FORWARD_NODE_IDS
c11_app_cbse_06_008

## FORWARD_REASONS
c11_app_cbse_06_008: Combinations with repetition extends the selection concept to allow repeated elements (stars and bars), requiring the distinct-object combination formula as base case when repetition = 0.

## CROSS_SUBJECT_PREREQS
none

## CROSS_SUBJECT_REASONS
none

## CHAIN_DESCRIPTION
c11_app_cbse_06_002 -> c11_app_cbse_06_003 -> c11_app_cbse_06_004 -> c11_app_cbse_06_007 -> c11_app_cbse_06_008

## THIS_FORMULA
\( ^nC_r = \frac{n!}{r!(n-r)!} \) for \( 0 \le r \le n \), with properties: \( ^nC_0 = ^nC_n = 1 \), \( ^nC_r = ^nC_{n-r} \), \( ^nC_r + ^nC_{r-1} = ^{n+1}C_r \)

## FORMULA_VARIABLES
n = total number of distinct objects available for selection (positive integer); r = number of objects to be selected (integer, 0 ≤ r ≤ n); ! = factorial function; ^nC_r = number of combinations (selections) of r objects from n distinct objects where order does not matter.

## FORMULA_UNITS
Dimensionless (count of ways); n and r are pure numbers (counts of objects).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_app_cbse_06_002 | Factorial manipulation (cancelling factorials, simplifying n!/(n-r)!) is used in every combination calculation and proof.
c11_app_cbse_06_003 | The Fundamental Principle of Multiplication justifies the step "each combination gives r! permutations" in the derivation nPr = nCr × r!.

## PREREQ_CONCEPT
Permutation formula (nPr = n!/(n-r)!) and the concept that each unordered selection of r objects corresponds to exactly r! ordered arrangements.

## PREREQ_BEFORE
Student must fluently compute nPr, simplify factorial ratios (e.g., 10!/7! = 10×9×8), and understand that "arrangement" implies order matters while "selection" does not.

## PREREQ_STUCK
Review the permutation-to-combination derivation: write all permutations of 3 letters from {A,B,C,D}, group them by the same set of letters, and observe each group has 3! = 6 members.

## WORKED_EXAMPLE_1
PROBLEM: A school library has 10 different Mathematics books and 8 different Physics books. A student wants to borrow 6 books such that there are at least 2 Mathematics books and at least 1 Physics book. How many different selections are possible?
STEPS:
- Step 1: Identify constraints — total 6 books, at least 2 Math (M), at least 1 Physics (P). So possible (M, P) splits: (2,4), (3,3), (4,2), (5,1). Note (6,0) invalid (needs ≥1 P), (1,5) invalid (needs ≥2 M).
- Step 2: For each valid split, compute combinations using multiplication principle (independent choices from Math and Physics sets).
- Step 3: Case (2M, 4P): \( ^{10}C_2 \times ^8C_4 = 45 \times 70 = 3150 \).
- Step 4: Case (3M, 3P): \( ^{10}C_3 \times ^8C_3 = 120 \times 56 = 6720 \).
- Step 5: Case (4M, 2P): \( ^{10}C_4 \times ^8C_2 = 210 \times 28 = 5880 \).
- Step 6: Case (5M, 1P): \( ^{10}C_5 \times ^8C_1 = 252 \times 8 = 2016 \).
- Step 7: Sum all cases: 3150 + 6720 + 5880 + 2016 = 17766.
REASONING: The "at least" condition requires partitioning into mutually exclusive exact-count cases. Each case uses the multiplication principle because choosing Math books and Physics books are independent decisions. We use combinations (not permutations) because the problem asks for "selections" of books — a set of 6 books, not an ordered list.
ANSWER: 17,766 different selections.

## WORKED_EXAMPLE_2
PROBLEM: There are 15 points in a plane, no three of which are collinear except 5 points which lie on a straight line. Find the number of (i) straight lines, (ii) triangles that can be formed by joining these points.
STEPS:
- Step 1: Total points = 15. General formula for lines from n points (no 3 collinear) = \( ^nC_2 \). For triangles = \( ^nC_3 \).
- Step 2: The 5 collinear points distort the count. They contribute only 1 line among themselves, not \( ^5C_2 = 10 \) lines. So we overcounted 9 lines.
- Step 3: (i) Lines = Total lines from 15 points - Overcounted lines from 5 collinear + 1 actual line = \( ^{15}C_2 - ^5C_2 + 1 = 105 - 10 + 1 = 96 \).
- Step 4: For triangles, any 3 collinear points form a degenerate triangle (area 0). The 5 collinear points contribute \( ^5C_3 = 10 \) invalid triples.
- Step 5: (ii) Triangles = Total triangles from 15 points - Degenerate triangles from 5 collinear = \( ^{15}C_3 - ^5C_3 = 455 - 10 = 445 \).
REASONING: This is a classic "combinatorial geometry" application. The key insight: collinear points reduce the number of lines (multiple pairs give same line) and eliminate triangles (3 collinear points don't form a triangle). We use inclusion-exclusion: total from all points minus invalid configurations from the collinear subset.
ANSWER: (i) 96 straight lines, (ii) 445 triangles.

## WORKED_EXAMPLE_3
PROBLEM: In a class of 20 students (12 boys, 8 girls), a team of 5 students is to be selected for a quiz competition. The team must include at least 2 girls. However, two specific girls (Priya and Anjali) refuse to be on the team together. How many valid teams can be formed?
STEPS:
- Step 1: First, find total teams with at least 2 girls (ignoring the Priya-Anjali conflict).
- Step 2: Cases for girls count: 2 girls, 3 girls, 4 girls, 5 girls (max 5 since team size=5).
- Step 3: Total with ≥2 girls = \( ^8C_2 \times ^{12}C_3 + ^8C_3 \times ^{12}C_2 + ^8C_4 \times ^{12}C_1 + ^8C_5 \times ^{12}C_0 \)
  = (28 × 220) + (56 × 66) + (70 × 12) + (56 × 1)
  = 6160 + 3696 + 840 + 56 = 10,752.
- Step 4: Now subtract teams where BOTH Priya and Anjali are included (invalid teams).
- Step 5: If both are in the team, we need 3 more members from remaining 18 students (10 girls left + 12 boys), with the condition that total girls ≥ 2 (already satisfied since we have 2). So choose 3 from 18: \( ^{18}C_3 = 816 \).
- Step 6: Valid teams = Total with ≥2 girls - Teams with both Priya & Anjali = 10,752 - 816 = 9,936.
REASONING: This combines two constraints: a minimum-count condition (at least 2 girls) and an exclusion condition (two specific people not together). Standard technique: count all satisfying the first constraint, then subtract those violating the second. The exclusion uses the fact that if both are fixed in the team, we just choose the rest freely from the remaining pool.
ANSWER: 9,936 valid teams.

## COMPETENCY_QUESTION_1
QUESTION: A committee of 6 is to be formed from 7 men and 6 women. In how many ways can this be done if the committee must have more women than men? Justify your case breakdown.
COMPETENCY: Case analysis and combinatorial reasoning
STEPS:
- Step 1: "More women than men" in a 6-person committee means women ≥ 4 (since 3 women, 3 men is equal). So cases: (4W, 2M), (5W, 1M), (6W, 0M).
- Step 2: Case (4W, 2M): \( ^6C_4 \times ^7C_2 = 15 \times 21 = 315 \).
- Step 3: Case (5W, 1M): \( ^6C_5 \times ^7C_1 = 6 \times 7 = 42 \).
- Step 4: Case (6W, 0M): \( ^6C_6 \times ^7C_0 = 1 \times 1 = 1 \).
- Step 5: Total = 315 + 42 + 1 = 358.
ANSWER: 358 ways. The case breakdown is exhaustive (covers all possibilities with women > men) and mutually exclusive (each team has a unique number of women).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Prove that the number of ways to choose a committee of any size (including empty committee) from n people, and then choose a chairperson from the committee (if non-empty), equals \( n \cdot 2^{n-1} \). Provide both an algebraic proof (using combination identities) and a combinatorial argument.
COMPETENCY: Algebraic manipulation of combinatorial sums and double-counting/combinatorial proof
STEPS:
- Step 1: Algebraic approach. For a committee of size r (1 ≤ r ≤ n), number of ways = \( ^nC_r \times r \) (choose r people, then choose chair from them). Sum over r: \( \sum_{r=1}^n r \cdot ^nC_r \).
- Step 2: Use identity \( r \cdot ^nC_r = n \cdot ^{n-1}C_{r-1} \). Proof: \( r \cdot \frac{n!}{r!(n-r)!} = n \cdot \frac{(n-1)!}{(r-1)!(n-r)!} = n \cdot ^{n-1}C_{r-1} \).
- Step 3: Sum becomes \( \sum_{r=1}^n n \cdot ^{n-1}C_{r-1} = n \sum_{k=0}^{n-1} ^{n-1}C_k = n \cdot 2^{n-1} \) (since sum of binomial coefficients = 2^n).
- Step 4: Combinatorial argument. Method 1: Choose chair first (n ways), then for each of the other n-1 people, decide independently whether they're in the committee (2 choices each). Total = \( n \cdot 2^{n-1} \).
- Step 5: Method 2: Count all ordered pairs (committee, chair) where chair ∈ committee. This is exactly the LHS. Both methods count the same set, so equal.
ANSWER: \( n \cdot 2^{n-1} \). The algebraic proof uses the absorption identity and binomial theorem; the combinatorial proof uses the "choose chair first" strategy, a classic double-counting technique.
DIFFICULTY: hard