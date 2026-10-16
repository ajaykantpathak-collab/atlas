## ELI5
Imagine you are at a street food stall that sells only 3 items: *samosa*, *kachori*, and *jalebi*. You and 4 friends (5 people total) each want one item, and the stall has unlimited stock of everything. You don't care *who* gets *what*, only *how many* of each item the group buys in total (e.g., 2 samosas, 1 kachori, 2 jalebis). This is a **combination with repetition**: selecting $r=5$ items from $n=3$ types where order doesn't matter and types can repeat. The most common mix-up is using the standard combination formula ${}^nC_r$ (which assumes no repetition) or permutation formulas (which assume order matters), instead of the stars-and-bars formula ${}^{n+r-1}C_r$.

## DEFINITION
The number of combinations of $r$ objects chosen from a set of $n$ distinct objects, where repetition of objects is allowed and the order of selection does not matter, is given by the formula ${}^{n+r-1}C_r$ (equivalently ${}^{n+r-1}C_{n-1}$).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can correctly identify a problem as requiring combinations with repetition (unlimited supply/order irrelevant), distinguish it from permutations with repetition and combinations without repetition, and apply the formula ${}^{n+r-1}C_r$ to solve word problems involving selections, distributions, or non-negative integer solutions.

## SCOPE_BOUNDARY
This node covers the derivation of the formula ${}^{n+r-1}C_r$ using the stars-and-bars method, its application to selection problems with unlimited identical items, and its equivalence to finding the number of non-negative integer solutions to $x_1 + x_2 + \dots + x_n = r$. It does NOT cover permutations with repetition ($n^r$), combinations without repetition (${}^nC_r$), or distributions with restrictions (e.g., "at least one of each type"), which are handled in subsequent problem-solving nodes.

## WALKTHROUGH
Imagine you are ordering 6 donuts from a shop offering 5 varieties, and you can pick any number of each variety (including zero). How many different assortments can you order? Start by realizing this is not a permutation problem because the order you put donuts in the box doesn't change the assortment. It's not a standard combination either, because you *can* pick the same variety multiple times. To solve it, represent the 6 donuts as 6 identical stars (`* * * * * *`). To separate them into 5 varieties, you need 4 dividers (bars `|`). For example, `* * | | * * * | * |` means 2 of type 1, 0 of type 2, 3 of type 3, 1 of type 4, 0 of type 5. Every valid assortment corresponds to a unique arrangement of 6 stars and 4 bars. The total items to arrange are $6+4=10$, choosing positions for the 4 bars (or 6 stars). Thus, the answer is ${}^{10}C_4 = {}^{5+6-1}C_6$. The key insight: **$n$ types require $n-1$ dividers, turning the selection into arranging $r$ stars and $n-1$ bars.**

Takeaway: mastery means recognising selection-with-repetition and reaching for stars and bars instead of nCr. Exam moves: count-the-assortments questions on the donut scene. Check yourself: r donuts across n varieties arrange the stars with n-1 dividers, giving n+r-1 choose r - the picture is the formula. Students miss it because combinations without repetition dominate the chapter, when the donut box shows the design: identical items plus variety labels convert a counting problem into an arrangement problem, and the dividers, not the donuts, do the differentiating.

## DIAGNOSTIC_QUESTION_1
State the formula for the number of combinations of $r$ objects from $n$ distinct types when repetition is allowed, and explain what the variables $n$ and $r$ represent in the context of selecting items from a menu.

## DIAGNOSTIC_ANSWER_1
The formula is ${}^{n+r-1}C_r$ (or ${}^{n+r-1}C_{n-1}$). Here, $n$ is the number of distinct types/categories available (e.g., menu items), and $r$ is the number of items to be selected (e.g., total dishes ordered). A wrong answer using ${}^nC_r$ reveals the student assumes items cannot be repeated (each type chosen at most once). A wrong answer using $n^r$ reveals confusion with permutations where order matters.

## DIAGNOSTIC_QUESTION_2
A student claims: "Selecting 4 candies from 3 flavors (with unlimited stock) is the same as arranging 4 identical balls into 3 distinct boxes." Is this statement correct? Justify your answer by explaining the mapping between the two scenarios.

## DIAGNOSTIC_ANSWER_2
Yes, the statement is correct. Selecting 4 candies from 3 flavors maps directly to distributing 4 identical balls into 3 distinct boxes: the number of candies of flavor $i$ equals the number of balls in box $i$. Both scenarios count the number of non-negative integer solutions to $x_1 + x_2 + x_3 = 4$, which is ${}^{3+4-1}C_4 = {}^{6}C_4 = 15$. A wrong answer ("incorrect") usually stems from not recognizing that "unlimited stock" implies identical items (stars) and "distinct flavors" implies distinct categories (boxes separated by bars).

## DIAGNOSTIC_QUESTION_3
In how many ways can a person buy 10 pastries from a bakery selling 4 types (pineapple, chocolate, black forest, butterscotch) if they must buy **at least one** of each type? (Hint: Transform the problem to fit the standard formula).

## DIAGNOSTIC_ANSWER_3
First, give 1 pastry of each type to satisfy the "at least one" condition. This uses 4 pastries. Remaining pastries to choose freely: $r' = 10 - 4 = 6$. Types remain $n = 4$. Apply formula: ${}^{n+r'-1}C_{r'} = {}^{4+6-1}C_6 = {}^{9}C_6 = {}^{9}C_3 = 84$. A wrong answer of ${}^{13}C_{10} = 286$ reveals the student applied the basic formula ${}^{n+r-1}C_r$ directly without adjusting for the "at least one" restriction (i.e., they allowed zero of a type). A wrong answer of ${}^{10}C_4$ reveals confusion with permutations or standard combinations.

## DIAGNOSTIC_QUESTION_4
Compare the number of solutions for the following two equations in non-negative integers:
(A) $x_1 + x_2 + x_3 + x_4 = 10$
(B) $x_1 + x_2 + x_3 + x_4 + x_5 = 10$
Which has more solutions? Explain conceptually *why* without calculating the exact binomial coefficients.

## DIAGNOSTIC_ANSWER_4
Equation (B) has more solutions. Equation (A) corresponds to ${}^{4+10-1}C_{10} = {}^{13}C_{10}$ (stars=10, bars=3). Equation (B) corresponds to ${}^{5+10-1}C_{10} = {}^{14}C_{10}$ (stars=10, bars=4). Adding a variable ($x_5$) adds a degree of freedom (an extra box to put stars in), increasing the number of distributions. Since ${}^{14}C_{10} > {}^{13}C_{10}$, (B) has more solutions. A wrong answer claiming (A) has more or they are equal reveals a lack of understanding of how the number of categories ($n$) affects the stars-and-bars count (more bars = more gaps = more arrangements).

## DIAGNOSTIC_QUESTION_5
A teacher argues: "The number of ways to select 5 fruits from 3 types (apples, bananas, mangoes) with repetition allowed is ${}^3C_5 = 0$ because you cannot choose 5 items from only 3 types." Evaluate this argument and identify the exact conceptual error.

## DIAGNOSTIC_ANSWER_5
The teacher's argument is **incorrect**. The error is applying the standard combination formula ${}^nC_r$ (which requires $r \le n$ and no repetition) to a problem explicitly allowing repetition. In combinations *with* repetition, $r$ can be greater than $n$ (e.g., picking 5 fruits from 3 types is perfectly valid: 3 apples, 1 banana, 1 mango). The correct formula is ${}^{n+r-1}C_r = {}^{3+5-1}C_5 = {}^{7}C_5 = 21$. The teacher confused "selecting $r$ distinct objects from $n$" with "selecting $r$ objects from $n$ types with unlimited supply."

## DIAGNOSTIC_QUESTION_6
Create a real-world word problem (Indian context) that requires the combination with repetition formula ${}^{n+r-1}C_r$ to solve. Define $n$ and $r$ clearly in your problem statement. The problem must involve a constraint that requires a small logical step *before* applying the formula (e.g., "at least one", "at most", or a fixed allocation).

## DIAGNOSTIC_ANSWER_6
**Sample Problem:** "A voter must rank 3 candidates (A, B, C) by assigning them a total of 10 'preference points'. Each candidate must get at least 1 point. How many different point allocations are possible?"
**Definitions:** $n=3$ (candidates), Total points $=10$.
**Step:** Give 1 point to each candidate first. Remaining points $r' = 10 - 3 = 7$.
**Formula:** ${}^{n+r'-1}C_{r'} = {}^{3+7-1}C_7 = {}^{9}C_7 = 36$.
**Criteria for good answer:** Clearly defines types ($n$) and identical items ($r$), includes a constraint requiring pre-allocation (transformation), and correctly applies ${}^{n+r-1}C_r$ on the reduced problem. A poor answer creates a problem solvable by simple ${}^nC_r$ or $n^r$, or forgets the transformation step for the constraint.

## COMMON_MISCONCEPTION
**The "Distinct Items" Trap:** Students treat the $r$ selected items as *distinct* objects (e.g., thinking "Samosa 1" and "Samosa 2" are different) and try to use permutation logic ($n^r$) or standard combination logic (${}^nC_r$). They fail to grasp that in combinations with repetition, the *items within a type are identical* (stars), and only the *counts per type* matter. For example, selecting {Samosa, Samosa, Kachori} is ONE combination, not multiple arrangements. This error is reinforced by the notation ${}^{n+r-1}C_r$, which looks like a standard combination but the upper index $n+r-1$ is a derived "virtual" number of slots (stars + bars), not the actual number of physical types.

## ON_FAILURE
1. **Concrete Modeling:** Give the student 5 identical buttons (stars) and 2 pencils (bars). Ask them to physically arrange them in a line to represent buying 5 items from 3 shops. Count the arrangements manually.
2. **Visual Mapping:** Draw the stars-and-bars diagram for a specific selection (e.g., 2, 0, 3). Explicitly label: "Stars = Items bought", "Bars = Dividers between types", "Gaps between bars = Types".
3. **Formula Derivation Walkthrough:** Re-derive ${}^{n+r-1}C_r$ step-by-step: "We have $r$ stars and $n-1$ bars. Total objects = $r+n-1$. Choose positions for the $n-1$ bars (or $r$ stars)."
4. **Contrast Drill:** Present 3 mini-problems side-by-side: (A) Permutation with repetition ($n^r$), (B) Combination without repetition (${}^nC_r$), (C) Combination with repetition (${}^{n+r-1}C_r$). Force the student to classify a new problem into A, B, or C *before* solving.

## PREREQUISITE_NODE_IDS
c11_app_cbse_06_002, c11_app_cbse_06_003, c11_app_cbse_06_007

## PREREQUISITE_REASONS
c11_app_cbse_06_002: Factorial notation ($n!$) and its properties are essential for computing binomial coefficients ${}^nC_r$ and simplifying expressions like ${}^{n+r-1}C_r$.
c11_app_cbse_06_003: Fundamental Principles of Counting (Multiplication/Addition) underpin the logic of "arranging stars and bars" as a sequence of choices.
c11_app_cbse_06_007: Standard Combination (${}^nC_r$) is the direct precursor; students must understand selection without repetition and the meaning of ${}^nC_r$ to contrast it with the repetition-allowed case and understand the derivation of the new formula.

## FORWARD_NODE_IDS
N/A

## FORWARD_REASONS
This is the final node in Chapter 6 (Permutations and Combinations). Mastery here enables solving advanced mixed problems in Miscellaneous Exercises and competitive exams (JEE/CUET), but there are no subsequent formal curriculum nodes in this chapter.

## CROSS_SUBJECT_PREREQS
none

## CROSS_SUBJECT_REASONS
No prior class nodes are available in the provided data for Applied Mathematics. However, conceptually, this connects to **Probability (Class 11/12)** where the sample space for "number of non-negative integer solutions" often forms the denominator, and **Algebra (Binomial Theorem/Multinomial Theorem)** where the number of terms in the expansion of $(x_1 + x_2 + \dots + x_n)^r$ is exactly ${}^{n+r-1}C_r$.

## CHAIN_DESCRIPTION
c11_app_cbse_06_002 -> c11_app_cbse_06_003 -> c11_app_cbse_06_007 -> c11_app_cbse_06_008 -> none

## THIS_FORMULA
Number of combinations of $r$ objects from $n$ types with repetition allowed = ${}^{n+r-1}C_r = \frac{(n+r-1)!}{r!(n-1)!}$

## FORMULA_VARIABLES
$n$: Number of distinct types/categories available (must be $\ge 1$). $r$: Number of objects to be selected (can be 0, 1, 2, ...; no upper bound relative to $n$). ${}^{n+r-1}C_r$: Binomial coefficient representing the number of ways.

## FORMULA_UNITS
Dimensionless (count of ways/selections/arrangements).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_app_cbse_07_001 | Probability: The number of non-negative integer solutions to $x_1 + \dots + x_n = r$ (this node's core concept) is frequently used to define the sample space size for discrete probability problems involving indistinguishable objects or Maxwell-Boltzmann statistics.
c11_app_cbse_05_001 | Binomial Theorem / Algebra: The number of distinct terms in the multinomial expansion of $(x_1 + x_2 + \dots + x_n)^r$ is exactly ${}^{n+r-1}C_r$, linking combinatorial selection to algebraic structure.

## PREREQ_CONCEPT
Standard Combinations (${}^nC_r$) and the concept of selecting subsets where order does not matter.

## PREREQ_BEFORE
The student must be fluent in calculating ${}^nC_r$ using factorials and understand the symmetry property ${}^nC_r = {}^nC_{n-r}$. They must also clearly distinguish between "arrangements" (permutations) and "selections" (combinations).

## PREREQ_STUCK
Review **c11_app_cbse_06_007 (Combination)** specifically the derivation of ${}^nC_r = \frac{n!}{r!(n-r)!}$ and the logic that "order does not matter." Practice distinguishing "selection" vs "arrangement" word problems.

## WORKED_EXAMPLE_1
PROBLEM: A college canteen offers 4 types of snacks: Samosa, Bread Pakora, Chole Bhature, and Poha. A group of 6 friends visits the canteen. Each friend orders exactly one snack. The canteen has unlimited stock of each type. The friends only care about the *total count* of each snack ordered (not who ordered what). How many different "group orders" (combinations of counts) are possible?
STEPS:
- Step 1: Identify the problem type. We are selecting $r=6$ items (snacks ordered) from $n=4$ types (snack varieties). Repetition is allowed (unlimited stock). Order does not matter (group order = counts per type). This is Combination with Repetition.
- Step 2: Recall the formula: Number of ways = ${}^{n+r-1}C_r$.
- Step 3: Substitute values: $n=4$, $r=6$. Upper index = $n+r-1 = 4+6-1 = 9$. Lower index = $r = 6$ (or $n-1 = 3$).
- Step 4: Compute ${}^{9}C_6 = {}^{9}C_3 = \frac{9 \times 8 \times 7}{3 \times 2 \times 1} = 3 \times 4 \times 7 = 84$.
- Step 5: Verify with Stars-and-Bars logic. 6 Stars (snacks), 3 Bars (dividers for 4 types). Total 9 symbols. Choose 3 positions for bars: ${}^{9}C_3 = 84$. Matches.
REASONING: The problem maps perfectly to the stars-and-bars model: 6 identical "orders" (stars) distributed into 4 distinct "categories" (snack types) separated by 3 dividers (bars). The formula ${}^{n+r-1}C_r$ counts the distinct arrangements of these symbols, each corresponding to a unique group order (e.g., `**|*|***|` = 2 Samosa, 1 Bread Pakora, 3 Chole Bhature, 0 Poha).
ANSWER: 84 different group orders are possible.

## WORKED_EXAMPLE_2
PROBLEM: Find the number of non-negative integer solutions to the equation $x_1 + x_2 + x_3 + x_4 + x_5 = 12$.
STEPS:
- Step 1: Recognize the equivalence. Finding non-negative integer solutions to $x_1 + \dots + x_n = r$ is mathematically identical to selecting $r$ identical items from $n$ distinct types (where $x_i$ = number of items of type $i$).
- Step 2: Identify parameters. Number of variables/types $n = 5$. Sum/total items $r = 12$.
- Step 3: Apply the combination with repetition formula: ${}^{n+r-1}C_r = {}^{5+12-1}C_{12} = {}^{16}C_{12}$.
- Step 4: Simplify using symmetry: ${}^{16}C_{12} = {}^{16}C_4$.
- Step 5: Calculate ${}^{16}C_4 = \frac{16 \times 15 \times 14 \times 13}{4 \times 3 \times 2 \times 1} = \frac{43680}{24} = 1820$.
REASONING: Each solution $(x_1, x_2, x_3, x_4, x_5)$ corresponds to placing 12 stars into 5 boxes separated by 4 bars. For example, solution $(3, 0, 5, 2, 2)$ maps to `***| |*****|**|**`. The number of such arrangements is the number of ways to choose positions for the 4 bars among 16 total slots (12 stars + 4 bars), which is ${}^{16}C_4$.
ANSWER: 1820 non-negative integer solutions.

## WORKED_EXAMPLE_3
PROBLEM: A student goes to a stationery shop to buy 15 pens. The shop sells 5 brands: Cello, Reynolds, Parker, Linc, and Montex. The student decides they must buy **at least 2 pens of each brand** (to gift to friends). In how many ways can the student select the 15 pens? (Pens of the same brand are identical).
STEPS:
- Step 1: Identify core problem: Select $r=15$ items from $n=5$ types with repetition allowed. Constraint: $x_i \ge 2$ for all $i=1..5$.
- Step 2: Handle the constraint ("at least 2"). Pre-allocate 2 pens to each brand. Pens used = $5 \times 2 = 10$. Remaining pens to distribute freely: $r' = 15 - 10 = 5$.
- Step 3: Reformulate problem: Now select $r'=5$ pens from $n=5$ types with **no lower bound** (can buy 0 extra of a brand). This is the standard Combination with Repetition.
- Step 4: Apply formula: ${}^{n+r'-1}C_{r'} = {}^{5+5-1}C_5 = {}^{9}C_5$.
- Step 5: Compute ${}^{9}C_5 = {}^{9}C_4 = \frac{9 \times 8 \times 7 \times 6}{4 \times 3 \times 2 \times 1} = 126$.
- Step 6: Verify logic. Original variables $x_i \ge 2$. Let $y_i = x_i - 2 \ge 0$. Then $\sum y_i = 15 - 10 = 5$. Number of non-negative solutions for $y_i$ is ${}^{5+5-1}C_5 = 126$.
REASONING: Constraints like "at least $k$" are handled by giving $k$ items to each type first (reducing $r$), then solving the standard unrestricted problem on the remainder. This transforms the restricted problem into the standard ${}^{n+r-1}C_r$ form.
ANSWER: 126 ways.

## COMPETENCY_QUESTION_1
QUESTION: In a game, a player rolls 4 identical dice simultaneously. The outcome is recorded only as a **multiset** of numbers appearing (e.g., {1, 1, 3, 6} is one outcome; order of dice doesn't matter). How many distinct outcomes are possible?
COMPETENCY: Conceptual Mapping / Model Recognition (Identifying a physical scenario as a combination-with-repetition problem).
STEPS:
- Step 1: Recognize that 4 identical dice rolled simultaneously produce a multiset of size 4 from the set {1, 2, 3, 4, 5, 6}.
- Step 2: Identify parameters: Number of types (faces) $n = 6$. Number of items selected (dice) $r = 4$. Repetition allowed (multiple dice can show same face). Order irrelevant (dice identical/simultaneous).
- Step 3: Map to formula: Number of distinct multisets = Combinations with repetition = ${}^{n+r-1}C_r$.
- Step 4: Calculate: ${}^{6+4-1}C_4 = {}^{9}C_4 = \frac{9 \times 8 \times 7 \times 6}{24} = 126$.
ANSWER: 126 distinct outcomes.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: How many 6-digit numbers (leading digit non-zero) have their digits in **non-decreasing order** (e.g., 112344, 222222, 135589 are valid; 121345 is not)?
COMPETENCY: Advanced Application / Problem Transformation (Mapping a digit constraint problem to stars-and-bars).
STEPS:
- Step 1: Analyze the constraint. A 6-digit number $d_1 d_2 d_3 d_4 d_5 d_6$ with $d_1 \neq 0$ and $d_1 \le d_2 \le \dots \le d_6$.
- Step 2: Digits are chosen from {1, 2, ..., 9} for $d_1$ (since non-zero and non-decreasing implies all subsequent digits $\ge d_1 \ge 1$). Wait, digits can be 0? No, if $d_1 \ge 1$ and non-decreasing, all digits $\in \{1, \dots, 9\}$. So $n=9$ types.
- Step 3: Selecting 6 digits ($r=6$) from 9 types {1..9} with repetition allowed, where order is *forced* to be non-decreasing. Every multiset of 6 digits from {1..9} corresponds to **exactly one** valid non-decreasing sequence (the sorted order).
- Step 4: This is exactly Combination with Repetition: Choose multiset of size 6 from 9 types. Formula: ${}^{9+6-1}C_6 = {}^{14}C_6$.
- Step 5: Calculate ${}^{14}C_6 = {}^{14}C_8 = \frac{14 \times 13 \times 12 \times 11 \times 10 \times 9}{6 \times 5 \times 4 \times 3 \times 2 \times 1} = 3003$.
ANSWER: 3003 such numbers.
DIFFICULTY: hard