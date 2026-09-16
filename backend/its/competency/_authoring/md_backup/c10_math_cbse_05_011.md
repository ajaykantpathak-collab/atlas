## DEFINITION
Word problems on Arithmetic Progressions involve translating a real-life situation where a quantity changes by a constant amount (common difference) into an AP model, identifying the first term (a), common difference (d), and number of terms (n), then applying the nth term formula \(a_n = a + (n-1)d\) or the sum formula \(S_n = \frac{n}{2}[2a + (n-1)d]\) to find the required unknown.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can independently read a real-life scenario, verify the constant difference condition, extract a, d, n, select the correct formula (nth term or sum), solve algebraically, and interpret the answer in the context of the problem (with units).

## SCOPE_BOUNDARY
Covers word problems that can be modeled as a single Arithmetic Progression (constant difference between consecutive terms). Includes finding nth term, sum of n terms, number of terms, or first term/common difference. Does NOT cover Geometric Progressions, problems requiring simultaneous equations of two APs (beyond simple comparison), or non-linear patterns.

## WALKTHROUGH
Imagine Ravi saves ₹100 in the first month and increases his savings by ₹50 every month. How much will he save in the 12th month? What is his total savings in one year? First, ask: "Does the savings increase by the same amount every month?" Yes, ₹50 constant increase → AP. Write down: a = 100, d = 50. For 12th month savings, we need the 12th term → use \(a_n = a + (n-1)d\). For total savings in 12 months, we need sum of first 12 terms → use \(S_n = \frac{n}{2}[2a + (n-1)d]\). The key insight: every AP word problem reduces to identifying (a, d, n) and choosing between term formula or sum formula.

## DIAGNOSTIC_QUESTION_1
State the two standard formulas used to solve AP word problems and what each variable represents.

## DIAGNOSTIC_ANSWER_1
The two formulas are: (1) nth term: \(a_n = a + (n-1)d\) where a = first term, d = common difference, n = term number. (2) Sum of first n terms: \(S_n = \frac{n}{2}[2a + (n-1)d]\) or \(S_n = \frac{n}{2}(a + l)\) where l = last term. A wrong answer (e.g., writing \(a_n = a + nd\) or \(S_n = n(a + d)\)) reveals the student has not memorized the exact structure of the formulas, especially the (n-1) factor, leading to off-by-one errors in exams.

## DIAGNOSTIC_QUESTION_2
A student says: "The heights of students in a class form an AP because they increase." Explain why this reasoning is incorrect and state the precise condition for a sequence to be an AP.

## DIAGNOSTIC_ANSWER_2
Heights of students do not necessarily increase by a constant difference; they vary randomly. An AP requires a **constant difference** between **every pair of consecutive terms**. The student's error is confusing "increasing" with "constant difference". This misconception leads to forcing non-AP data into AP formulas, producing meaningless answers in board exams.

## DIAGNOSTIC_QUESTION_3
A contractor pays a penalty for delay: ₹200 for the first day, ₹250 for the second day, ₹300 for the third day, and so on. If the work is delayed by 30 days, find the total penalty paid. Show all steps.

## DIAGNOSTIC_ANSWER_3
Given: a = 200, d = 50, n = 30. Use sum formula: \(S_{30} = \frac{30}{2}[2(200) + (30-1)(50)] = 15[400 + 1450] = 15 \times 1850 = 27750\). Total penalty = ₹27,750. A wrong answer (e.g., using n=29 or d=200) reveals the student cannot correctly map "first day = first term" and "increase per day = common difference", or miscounts n.

## DIAGNOSTIC_QUESTION_4
Compare the two problems: (A) "Find the 10th term of AP: 5, 8, 11, ..." (B) "A tree grows 5 cm first year, 8 cm second year, 11 cm third year... Find growth in 10th year." Are they mathematically identical? Justify.

## DIAGNOSTIC_ANSWER_4
Yes, mathematically identical. Both have a=5, d=3, n=10 → \(a_{10} = 5 + 9(3) = 32\). The only difference is context: Problem A is abstract, Problem B is real-life. A student who solves A but not B lacks the skill to **translate words into mathematical parameters** (a, d, n). This is the core competency tested in CBSE case-based questions.

## DIAGNOSTIC_QUESTION_5
A student solves: "Sum of first 20 terms of an AP is 400. First term is 5. Find d." Their working: \(400 = \frac{20}{2}[2(5) + 20d] \Rightarrow 400 = 10[10 + 20d] \Rightarrow 40 = 10 + 20d \Rightarrow d = 1.5\). Identify the error and correct it.

## DIAGNOSTIC_ANSWER_5
Error: Used \(20d\) instead of \((20-1)d = 19d\) in the sum formula. Correct step: \(400 = 10[10 + 19d] \Rightarrow 40 = 10 + 19d \Rightarrow 19d = 30 \Rightarrow d = 30/19\). The student forgot the (n-1) factor in the sum formula. This is the **most common algebraic slip** in board exams — writing nd instead of (n-1)d.

## DIAGNOSTIC_QUESTION_6
Create a real-life word problem (Indian context: rupees, metres, etc.) that requires finding the number of terms (n) given the sum and first term/difference. Write the problem and outline the solution steps.

## DIAGNOSTIC_ANSWER_6
Example: "Meena puts ₹5 in her piggy bank on day 1, ₹10 on day 2, ₹15 on day 3, and so on. After how many days will her total savings become ₹275?" Steps: a=5, d=5, S_n=275. Use \(S_n = \frac{n}{2}[2a+(n-1)d] \Rightarrow 275 = \frac{n}{2}[10+5(n-1)] \Rightarrow 550 = n(5n+5) \Rightarrow 5n^2+5n-550=0 \Rightarrow n^2+n-110=0 \Rightarrow (n+11)(n-10)=0 \Rightarrow n=10\) (reject negative). A poor answer uses a non-AP pattern or sets up an equation that is not quadratic in n, showing inability to handle "find n" problems.

## COMMON_MISCONCEPTION
**Misidentifying 'n' in "find the number of terms" problems**: Students often treat the term number (e.g., "10th term") as the number of terms (n) in the sum formula, or vice versa. Example: "A man saves ₹100 in first month and increases by ₹20 each month. In how many months will his savings reach ₹1000?" They incorrectly use \(a_n = 1000\) (nth term) instead of \(S_n = 1000\) (sum). The phrase "savings reach" implies cumulative total (sum), not monthly amount (term). This confusion costs 2-3 marks in every board exam.

## ON_FAILURE
1. **Highlight keywords**: Circle "total", "sum", "cumulative", "altogether" → use SUM formula. Circle "nth term", "amount in nth month", "value of nth item" → use TERM formula. 2. **Draw a timeline**: Write Month 1, Month 2, Month 3 with amounts. Ask: "Does the question ask for the Month 3 box (term) or the sum of all boxes up to Month 3 (sum)?" 3. **Practice 5 problems** where the only task is to decide Term vs Sum before solving. 4. **Revisit node c10_math_cbse_05_010** (Relationship between nth term and Sum) to see how \(a_n = S_n - S_{n-1}\) connects them.

## PREREQUISITE_NODE_IDS
c10_math_cbse_05_001, c10_math_cbse_05_003, c10_math_cbse_05_007, c10_math_cbse_05_010, c9_math_ch8_4, c9_math_ch8_5, c9_math_ch8_6, c9_math_ch8_7, c10_math_cbse_05_004, c10_math_cbse_05_005, c10_math_cbse_05_006, c10_math_cbse_05_008, c10_math_cbse_05_009

## PREREQUISITE_REASONS
c10_math_cbse_05_001: Defines AP and common difference — needed to verify if a situation forms an AP.
c10_math_cbse_05_003: Provides nth term formula \(a_n = a + (n-1)d\) — core tool for term-based questions.
c10_math_cbse_05_007: Provides sum formula \(S_n = \frac{n}{2}[2a+(n-1)d]\) — core tool for total/cumulative questions.
c10_math_cbse_05_010: Shows relationship \(a_n = S_n - S_{n-1}\) — helps distinguish term vs sum in tricky problems.
c9_math_ch8_4: Class 9 AP definition and common difference — foundation for recognizing AP patterns.
c9_math_ch8_5: Class 9 nth term formula — prior exposure to the formula structure.
c9_math_ch8_6: Class 9 sum formula — prior exposure to sum formula structure.
c9_math_ch8_7: Class 9 word problems — basic experience translating simple situations to AP.
c10_math_cbse_05_004: The nth term of an arithmetic progression (AP) is given by the formula \(a_n = a + (n-1)d\)  - earlier chapter node that this node's author flags as feeding into this content.
c10_math_cbse_05_005: Finding the number of terms in an AP means determining the value of \(n\) (a positive integer)  - earlier chapter node that this node's author flags as feeding into this content.
c10_math_cbse_05_006: In an Arithmetic Progression with a finite number of terms, the kth term from the end is the  - earlier chapter node that this node's author flags as feeding into this content.
c10_math_cbse_05_008: The sum of the first n terms of an arithmetic progression (AP) is derived by adding the series  - earlier chapter node that this node's author flags as feeding into this content.
c10_math_cbse_05_009: The sum of the first n terms of an arithmetic progression when the first term (a), the last  - earlier chapter node that this node's author flags as feeding into this content.

## FORWARD_NODE_IDS
c10_math_cbse_05_012

## FORWARD_REASONS
c10_math_cbse_05_012: Instalments and Savings problems are a specialized subset of AP word problems (loan repayments, recurring deposits) that require the same translation skills but add financial context (interest, EMI). Mastery of general AP word problems is essential before tackling financial APs.

## CROSS_SUBJECT_PREREQS
c6_math_ch05_058, c7_math_ch15_007, c8_math_ch13_10, c9_math_ch2_10

## CROSS_SUBJECT_REASONS
c6_math_ch05_058: Word Problems Leading to Equations — builds the foundational skill of converting verbal statements into algebraic equations, which is exactly what AP word problems require.
c7_math_ch15_007: Setting Up Equations from Word Problems — reinforces the step of identifying unknowns and forming equations before applying AP formulas.
c8_math_ch13_10: Word Problems Translating to Linear Equations — extends equation-setting to multi-step problems, mirroring the complexity of AP word problems.
c9_math_ch2_10: Word Problems Using Linear Equations — Class 9 consolidation of modeling real-life situations with linear relationships (AP is a discrete linear relationship).
## CHAIN_DESCRIPTION
c9_math_ch8_7 -> c10_math_cbse_05_001 -> c10_math_cbse_05_003 -> c10_math_cbse_05_007 -> c10_math_cbse_05_010 -> c10_math_cbse_05_011 -> c10_math_cbse_05_012

## THIS_FORMULA
\(a_n = a + (n-1)d\)  and  \(S_n = \frac{n}{2}[2a + (n-1)d] = \frac{n}{2}(a + l)\)

## FORMULA_VARIABLES
a = first term (initial value), d = common difference (constant increase/decrease per step), n = number of terms (or term number), \(a_n\) = nth term (value at step n), \(S_n\) = sum of first n terms (cumulative total), l = last term (\(a_n\))

## FORMULA_UNITS
a, d, \(a_n\), l, \(S_n\) carry the units of the context (rupees, metres, kilograms, litres, etc.); n is dimensionless (count of terms).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c10_math_cbse_05_003 | The nth term formula is a discrete linear function \(f(n) = a + (n-1)d\), directly connecting to linear equations in two variables (Chapter 3) where y = mx + c.
c10_math_cbse_05_007 | The sum formula \(S_n = \frac{n}{2}[2a+(n-1)d]\) is a quadratic function in n, linking to quadratic equations (Chapter 4) when solving for n given S_n.
## PREREQ_CONCEPT
Ability to identify a, d, n from a verbal description and distinguish between "value at nth position" (term) and "total up to nth position" (sum).

## PREREQ_BEFORE
Student must fluently compute nth term and sum of n terms for given a, d, n (nodes 003, 007) and recognize AP patterns (node 001).

## PREREQ_STUCK
If stuck, revisit **c10_math_cbse_05_003** (nth term formula) and **c10_math_cbse_05_007** (sum formula) and practice identifying a, d, n in 10 simple sequences.

## WORKED_EXAMPLE_1
PROBLEM: A school awards cash prizes to the top 5 students in a competition. The first prize is ₹5000 and each subsequent prize is ₹500 less than the preceding one. Find the value of each prize and the total amount awarded.
STEPS:
- Step 1: Identify the pattern. Prizes: 1st = 5000, 2nd = 4500, 3rd = 4000... Difference = -500 (constant). This is an AP with a = 5000, d = -500, n = 5.
- Step 2: Find each prize (terms 1 to 5) using nth term formula \(a_n = a + (n-1)d\).
  - 1st prize: \(a_1 = 5000\)
  - 2nd prize: \(a_2 = 5000 + (1)(-500) = 4500\)
  - 3rd prize: \(a_3 = 5000 + (2)(-500) = 4000\)
  - 4th prize: \(a_4 = 5000 + (3)(-500) = 3500\)
  - 5th prize: \(a_5 = 5000 + (4)(-500) = 3000\)
- Step 3: Find total amount awarded using sum formula \(S_n = \frac{n}{2}(a + l)\) where l = last term = 3000.
  \(S_5 = \frac{5}{2}(5000 + 3000) = \frac{5}{2} \times 8000 = 20000\).
- Step 4: Verify using the other sum formula: \(S_5 = \frac{5}{2}[2(5000) + 4(-500)] = 2.5[10000 - 2000] = 2.5 \times 8000 = 20000\). Matches.
- Step 5: State answer with units. Prizes: ₹5000, ₹4500, ₹4000, ₹3500, ₹3000. Total = ₹20,000.
REASONING: The problem gives a starting value and a constant decrement, confirming an AP with negative d. We need both individual terms (prizes) and the total (sum). Using \(a_n\) for each prize and \(S_n\) for total is the standard two-step approach for such "list and total" problems.
ANSWER: Prizes: ₹5000, ₹4500, ₹4000, ₹3500, ₹3000. Total amount awarded = ₹20,000.

## WORKED_EXAMPLE_2
PROBLEM: A contractor employs 150 workers to complete a road in 30 days. After 10 days, he realizes only 1/3 of the work is done. How many additional workers must he employ to finish on time, assuming each worker works at the same rate? (Hint: Work done is proportional to number of workers × days. The remaining work must be done in remaining days with increased workforce.)
STEPS:
- Step 1: Understand the work model. Total work = W. In 10 days, 150 workers do W/3. So work done = 150 × 10 × rate = W/3 → rate = W/4500 per worker per day.
- Step 2: Remaining work = 2W/3. Remaining days = 20. Let x = additional workers needed. Total workers = 150 + x.
- Step 3: Work equation: (150 + x) × 20 × rate = 2W/3. Substitute rate = W/4500.
  \((150 + x) \times 20 \times \frac{W}{4500} = \frac{2W}{3}\)
- Step 4: Cancel W (non-zero). \(\frac{20(150+x)}{4500} = \frac{2}{3} \Rightarrow \frac{150+x}{225} = \frac{2}{3} \Rightarrow 150+x = 150 \Rightarrow x = 0\).
- Step 5: Interpret. No additional workers needed! The original 150 workers will finish exactly on time because the work rate was consistent.
- Step 6: Check: 150 workers in 30 days do 150×30×rate = 4500×rate = W. Correct.
REASONING: This is a "work and time" problem modeled as a linear relationship (constant rate). It does NOT form an AP because the number of workers is constant (or changes once). It is included to show that NOT every "increasing/decreasing" word problem is an AP — the constant difference must be between consecutive terms of a sequence. Here the sequence of daily work done is constant (if workers constant), not an AP with non-zero d.
ANSWER: 0 additional workers needed.

## WORKED_EXAMPLE_3
PROBLEM: The sum of first 7 terms of an AP is 49 and the sum of first 17 terms is 289. Find the sum of first n terms. (CBSE 2019, 3 marks)
STEPS:
- Step 1: Write given data using sum formula. \(S_7 = \frac{7}{2}[2a + 6d] = 49\) and \(S_{17} = \frac{17}{2}[2a + 16d] = 289\).
- Step 2: Simplify both equations.
  Eq1: \(7(a + 3d) = 49 \Rightarrow a + 3d = 7\).  (Divide by 7)
  Eq2: \(17(a + 8d) = 289 \Rightarrow a + 8d = 17\). (Divide by 17)
- Step 3: Solve the two linear equations for a and d.
  Subtract Eq1 from Eq2: \((a+8d) - (a+3d) = 17 - 7 \Rightarrow 5d = 10 \Rightarrow d = 2\).
  Substitute d=2 in Eq1: \(a + 6 = 7 \Rightarrow a = 1\).
- Step 4: Write the general sum formula \(S_n\) in terms of n using a=1, d=2.
  \(S_n = \frac{n}{2}[2(1) + (n-1)(2)] = \frac{n}{2}[2 + 2n - 2] = \frac{n}{2}(2n) = n^2\).
- Step 5: Verify with given values: \(S_7 = 7^2 = 49\), \(S_{17} = 17^2 = 289\). Correct.
- Step 6: State final expression. The sum of first n terms is \(n^2\).
REASONING: This problem combines two sum conditions to find the AP parameters (a, d), then asks for the general sum formula. It tests the ability to set up equations from sum formulas and solve simultaneous linear equations — a classic CBSE 3-mark pattern.
ANSWER: \(S_n = n^2\)

## COMPETENCY_QUESTION_1
QUESTION: **Case-Based:** A small bakery produces 50 loaves of bread on the first day. The owner increases production by 5 loaves every day.
(i) Write the production on the 1st, 2nd, and 3rd day. Does this form an AP? Justify.
(ii) Find the production on the 30th day.
(iii) The oven capacity is 200 loaves/day. On which day will the production first exceed capacity?
(iv) Find the total production in the first 30 days.
COMPETENCY: Translating real-world situations to mathematical expressions and interpreting constraints.
STEPS:
- Step 1: Identify a = 50, d = 5. Day 1: 50, Day 2: 55, Day 3: 60. Difference = 5 (constant) → AP.
- Step 2: 30th day production = \(a_{30} = 50 + 29(5) = 50 + 145 = 195\) loaves.
- Step 3: Find smallest n such that \(a_n > 200\). \(50 + (n-1)5 > 200 \Rightarrow 5(n-1) > 150 \Rightarrow n-1 > 30 \Rightarrow n > 31\). So on Day 32.
- Step 4: Total production in 30 days = \(S_{30} = \frac{30}{2}[2(50) + 29(5)] = 15[100 + 145] = 15 \times 245 = 3675\) loaves.
ANSWER: (i) 50, 55, 60; Yes, constant difference 5. (ii) 195 loaves. (iii) Day 32. (iv) 3675 loaves.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: **Assertion-Reason:**
Assertion (A): If the sum of first n terms of an AP is given by \(S_n = 3n^2 + 5n\), then the common difference is 6.
Reason (R): The nth term of an AP can be found by \(a_n = S_n - S_{n-1}\), and the common difference is \(d = a_n - a_{n-1}\).
Choose the correct option:
(a) Both A and R are true and R is the correct explanation of A.
(b) Both A and R are true but R is NOT the correct explanation of A.
(c) A is true but R is false.
(d) A is false but R is true.
COMPETENCY: Error identification and correction / Justifying mathematical relationships.
STEPS:
- Step 1: Check Reason (R). Formula \(a_n = S_n - S_{n-1}\) is correct for any sequence. \(d = a_n - a_{n-1}\) is definition of common difference. So R is TRUE.
- Step 2: Check Assertion (A) using R's method.
  \(a_n = S_n - S_{n-1} = (3n^2+5n) - [3(n-1)^2 + 5(n-1)]\)
  \(= 3n^2+5n - [3(n^2-2n+1) + 5n-5]\)
  \(= 3n^2+5n - [3n^2-6n+3+5n-5]\)
  \(= 3n^2+5n - [3n^2 - n -2]\)
  \(= 3n^2+5n - 3n^2 + n + 2 = 6n + 2\).
- Step 3: Find d: \(d = a_n - a_{n-1} = (6n+2) - (6(n-1)+2) = 6n+2 - 6n+6-2 = 6\). So d = 6. Assertion is TRUE.
- Step 4: Since R correctly explains how to derive d from S_n, R is the correct explanation of A.
ANSWER: (a) Both A and R are true and R is the correct explanation of A.
DIFFICULTY: hard