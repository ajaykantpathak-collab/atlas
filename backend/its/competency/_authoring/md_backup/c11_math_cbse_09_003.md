## DEFINITION
The sum of the first n terms of an Arithmetic Progression (AP) with first term a and common difference d is given by S_n = n/2 [2a + (n-1)d]. Equivalently, if the last term (nth term) is denoted by l, then S_n = n/2 (a + l). This formula calculates the total of all terms from the 1st to the nth term in an arithmetic sequence.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can correctly identify which sum formula to use based on given information (first term and common difference vs. first and last term), solve for any unknown variable (n, a, d, or S_n) when the other three are known, and apply the relationship a_n = S_n - S_{n-1} to find individual terms from sum expressions.

## SCOPE_BOUNDARY
This node covers the derivation and application of both sum formulas for finite APs, finding unknown parameters (n, a, d) given the sum, and the connection between nth term and sum of n terms. It does NOT cover sum of infinite AP (diverges), sum of special series (Σn, Σn², Σn³ - covered in node 010), or arithmetic-geometric progressions (covered in node 011).

## WALKTHROUGH
Imagine you are saving money every month for a school trip: you save ₹500 in the first month and increase your savings by ₹50 each subsequent month. After 12 months, how much will you have saved in total? This is exactly an AP sum problem where a = 500, d = 50, n = 12. To begin, always write down what is given: identify a, d, and n from the problem statement. Then decide which formula to use: if you know a and d, use S_n = n/2 [2a + (n-1)d]; if you know the first and last term, use S_n = n/2 (a + l). The key insight is that pairing the first and last term, second and second-last term, etc., each pair sums to the same value (a + l), and there are n/2 such pairs - this is the intuitive basis for the formula.

## DIAGNOSTIC_QUESTION_1
Write the formula for the sum of first n terms of an AP when the first term is a and the common difference is d. Then state the alternative formula when the last term l is known instead of d.

## DIAGNOSTIC_ANSWER_1
The two formulas are: S_n = n/2 [2a + (n-1)d] and S_n = n/2 (a + l) where l = a + (n-1)d is the nth term. A wrong answer (e.g., writing S_n = n(a + l) or S_n = n/2 [a + (n-1)d]) reveals the student has memorised the formula incorrectly - missing the factor of 2 in the first term or forgetting the 1/2 factor entirely, which are the two most common algebraic errors in this formula.

## DIAGNOSTIC_QUESTION_2
Explain why the formula S_n = n/2 (a + l) works by describing the pairing method. Use the AP: 3, 7, 11, 15, 19 to illustrate with n = 5.

## DIAGNOSTIC_ANSWER_2
In the AP 3, 7, 11, 15, 19, pairing first and last: 3+19=22, second and fourth: 7+15=22, middle term 11 is half of 22. There are 5/2 = 2.5 pairs each summing to 22, giving 2.5 × 22 = 55. A wrong explanation (e.g., "multiply first term by n" or "add all terms individually") shows the student does not understand the structural symmetry of an AP and is relying on rote memorisation without grasping why the formula works.

## DIAGNOSTIC_QUESTION_3
Find the sum of the first 20 terms of the AP whose nth term is given by a_n = 5n - 3.

## DIAGNOSTIC_ANSWER_3
Given a_n = 5n - 3. For n=1, a = 5(1) - 3 = 2. Common difference d = coefficient of n = 5. Using S_n = n/2 [2a + (n-1)d]: S_20 = 20/2 [2(2) + 19(5)] = 10[4 + 95] = 10 × 99 = 990. A wrong answer (e.g., 1000 or 980) typically comes from incorrectly identifying a or d - students often take a = -3 (constant term) instead of finding the first term, or miscalculate 2a + (n-1)d as 2(5n-3) + (n-1)5.

## DIAGNOSTIC_QUESTION_4
The sum of first n terms of an AP is given by S_n = 3n² + 5n. Find the 10th term of this AP. Explain why you cannot simply substitute n=10 into S_n.

## DIAGNOSTIC_ANSWER_4
The 10th term a_10 = S_10 - S_9. S_10 = 3(100) + 50 = 350. S_9 = 3(81) + 45 = 288. a_10 = 350 - 288 = 62. Substituting n=10 into S_n gives the sum of first 10 terms, not the 10th term alone. A student who substitutes n=10 directly into S_n and gets 350 as the answer confuses "sum of first n terms" with "nth term" - this is the most fundamental conceptual error in this topic.

## DIAGNOSTIC_QUESTION_5
A student solves: "Find n if S_n = 210 for the AP: 2, 5, 8, ..." and writes: 210 = n/2 [2(2) + (n-1)3] → 420 = n(4 + 3n - 3) → 420 = n(3n + 1) → 3n² + n - 420 = 0 → (3n + 36)(n - 11.67) = 0 → n = 11.67. Identify the error and find the correct answer.

## DIAGNOSTIC_ANSWER_5
The factorisation is wrong: 3n² + n - 420 = 0 does not factor to (3n + 36)(n - 11.67). Correct factorisation: 3n² + 36n - 35n - 420 = 3n(n+12) - 35(n+12) = (3n-35)(n+12) = 0 → n = 35/3 or n = -12. Since n must be a positive integer, check: n=11 gives S_11 = 11/2[4+30] = 187; n=12 gives S_12 = 12/2[4+33] = 222. No integer n gives exactly 210. The error is incorrect factorisation of the quadratic - a very common algebraic mistake when the quadratic doesn't factor neatly over integers.

## DIAGNOSTIC_QUESTION_6
Create a real-life problem (Indian context: rupees, savings, instalments) where the sum of an AP is given and the student must find the number of terms n. The problem should result in a quadratic equation that has one valid positive integer solution. Provide the problem statement and the complete solution.

## DIAGNOSTIC_ANSWER_6
Problem: "Ravi saves ₹100 in the first week and increases his weekly savings by ₹20 each week. After how many weeks will his total savings reach ₹2800?" Solution: a=100, d=20, S_n=2800. 2800 = n/2[200 + (n-1)20] → 5600 = n(200 + 20n - 20) → 5600 = n(20n + 180) → 20n² + 180n - 5600 = 0 → n² + 9n - 280 = 0 → (n+20)(n-14) = 0 → n = 14 weeks. A poor problem would have non-integer solutions or negative time, showing the student doesn't understand the constraints of real-world AP problems.

## COMMON_MISCONCEPTION
Students confuse S_n (sum of first n terms) with a_n (nth term). Specifically, when given S_n = 3n² + 5n, they substitute n=10 to find the 10th term, getting 350 instead of correctly computing a_10 = S_10 - S_9 = 62. Another specific error: in the formula S_n = n/2 [2a + (n-1)d], students write 2a as 2×first term correctly but then write (n-1)d as n×d - d and forget to multiply d by (n-1), effectively using S_n = n/2 [2a + nd - d] but then simplifying incorrectly to S_n = n/2 [2a + nd] - d, dropping the division by 2 on the d term.

## ON_FAILURE
If a student substitutes n into S_n to find the nth term, ask: "If S_5 = 50 and S_4 = 30, what is the 5th term?" Guide them to see a_5 = S_5 - S_4 = 20. Then generalise: a_n = S_n - S_{n-1}. For the formula error, have them expand S_n = n/2 [2a + (n-1)d] step by step: = n/2 × 2a + n/2 × (n-1)d = na + n(n-1)d/2. Emphasise that BOTH terms inside the bracket are multiplied by n/2. Practice with n=3: S_3 = 3/2[2a+2d] = 3a+3d. Check: a + (a+d) + (a+2d) = 3a+3d. The pattern confirms the formula structure.

## PREREQUISITE_NODE_IDS
c11_math_cbse_09_002, c10_math_cbse_05_007, c10_math_cbse_05_008, c10_math_cbse_05_009, c10_math_cbse_05_010, c6_math_ch05_056, c6_math_ch05_057, c7_math_ch15_003, c8_math_ch13_8, c9_math_ch2_8, c11_math_cbse_09_001

## PREREQUISITE_REASONS
c11_math_cbse_09_002: Provides the general term formula a_n = a + (n-1)d which is essential for deriving the sum formula and for finding the last term l.
c10_math_cbse_05_007: Class 10 foundation for sum formula S_n = n/2[2a+(n-1)d] - this node builds directly on that derivation.
c10_math_cbse_05_008: Derivation of sum formula using pairing method - the conceptual basis that Class 11 assumes known.
c10_math_cbse_05_009: Alternative formula S_n = n/2(a+l) when last term is known - must be fluent in both forms.
c10_math_cbse_05_010: Relationship a_n = S_n - S_{n-1} - critical for problems where sum is given as a function of n.
c6_math_ch05_056: Linear equations in one variable - needed to solve for n when sum gives a quadratic equation.
c6_math_ch05_057: Solving linear equations methods - prerequisite for algebraic manipulation in sum problems.
c7_math_ch15_003: Systematic method for solving linear equations - extends to quadratic equations in n.
c8_math_ch13_8: Balancing method for linear equations - algebraic foundation for manipulating sum formulas.
c9_math_ch2_8: Substitution method for linear equations - useful when solving systems involving AP parameters.
c11_math_cbse_09_001: Builds on sequence terms to develop sum of n terms of AP.  

## FORWARD_NODE_IDS
c11_math_cbse_09_004, c11_math_cbse_09_010, c11_math_cbse_09_011, c11_math_cbse_09_012, c12_eco_cbse_02_001

## FORWARD_REASONS
c11_math_cbse_09_004: Arithmetic Mean uses the sum concept - inserting m means between a and b creates an AP where sum properties apply.
c11_math_cbse_09_010: Sum of special series (Σn, Σn², Σn³) uses AP sum techniques and summation notation introduced here.
c11_math_cbse_09_011: Arithmetic-Geometric Progression combines AP and GP - requires mastery of AP sum to handle the arithmetic component.
c11_math_cbse_09_012: Word problems on AP and GP applications directly use sum formulas in complex real-world scenarios.
c12_eco_cbse_02_001: c11_math_cbse_09_003 | Sum of n terms of an AP is used to verify TU = Σ MU when MU follows an arithmetic pattern.  

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_02_003, c11_eco_cbse_03_004, c11_chem_cbse_01_005
## CROSS_SUBJECT_REASONS
c11_physics_ch2_3: Motion with constant acceleration - displacement in nth second and total displacement form AP patterns; sum of displacements over time intervals uses AP sum formula.
c11_economics_ch3_4: Consumer's equilibrium and marginal utility - total utility as sum of marginal utilities often follows arithmetic patterns in simplified models.
c11_chemistry_ch1_5: Concentration calculations in serial dilutions - volumes/concentrations in stepwise dilutions can form AP; total reagent used is sum of AP.
c11_phy_cbse_02_003: Cross-subject support: Instantaneous velocity is the rate of change of position with respect to time at a specifi... supplies tools/facts used directly in this node.  
c11_eco_cbse_03_004: Cross-subject support: Financial Sector Reforms under Liberalisation refer to the systematic deregulation and res... supplies tools/facts used directly in this node.  
c11_chem_cbse_01_005: Cross-subject support: Dalton's Atomic Theory is a foundational chemical model proposing that all matter consists... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c10_math_cbse_05_007 -> c11_math_cbse_09_003 -> c11_math_cbse_09_004

## THIS_FORMULA
S_n = n/2 [2a + (n-1)d] = n/2 (a + l) where l = a + (n-1)d; a_n = S_n - S_{n-1}

## FORMULA_VARIABLES
a = first term of the AP, d = common difference, n = number of terms (positive integer), l = last term (nth term), S_n = sum of first n terms, a_n = nth term

## FORMULA_UNITS
dimensionless (pure numbers); if terms represent physical quantities (rupees, metres, kg), S_n has the same units as the terms

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch2_3 | In uniformly accelerated motion, distances covered in successive seconds form an AP; total distance in n seconds is sum of AP
c11_economics_ch3_4 | Total utility as sum of marginal utilities; instalment payments with constant increase form AP
c11_chemistry_ch1_5 | Serial dilution volumes; stepwise addition of reagent in titration with constant increment

## PREREQ_CONCEPT
Quadratic equations and the relationship between a sequence term and the sum of terms (a_n = S_n - S_{n-1})

## PREREQ_BEFORE
Student must be able to solve quadratic equations by factorisation and quadratic formula, and must know the nth term formula a_n = a + (n-1)d fluently.

## PREREQ_STUCK
If stuck, revisit solving quadratic equations (Class 10 Chapter 4) and the derivation of AP sum formula using the pairing method (Class 10 Chapter 5).

## WORKED_EXAMPLE_1
PROBLEM: A construction company pays a penalty for delay: ₹200 for the first day, ₹250 for the second day, ₹300 for the third day, and so on, increasing by ₹50 each day. If the total penalty paid is ₹27,000, find the number of days of delay.
STEPS:
- Step 1: Identify the AP parameters: first term a = 200, common difference d = 50, sum S_n = 27000. Unknown: n (number of days).
- Step 2: Choose the appropriate sum formula. Since a and d are known, use S_n = n/2 [2a + (n-1)d].
- Step 3: Substitute values: 27000 = n/2 [2(200) + (n-1)50] = n/2 [400 + 50n - 50] = n/2 [50n + 350].
- Step 4: Simplify and solve the quadratic: 27000 = n(25n + 175) → 25n² + 175n - 27000 = 0 → Divide by 25: n² + 7n - 1080 = 0 → Factor: (n + 36)(n - 30) = 0 → n = 30 or n = -36.
- Step 5: Interpret: n must be a positive integer, so n = 30 days. Verify: S_30 = 30/2[400 + 29×50] = 15[400 + 1450] = 15 × 1850 = 27750? Wait, recalculate: 29×50 = 1450, 400+1450=1850, 15×1850 = 27750. That doesn't match 27000. Let me recheck: 27000 = n/2[400 + 50(n-1)] = n/2[400 + 50n - 50] = n/2[50n + 350] = n(25n + 175). For n=30: 30(750+175)=30×925=27750. The problem statement has inconsistent numbers. Let me correct: If penalty is ₹200, ₹250, ₹300... and total is ₹27,750, then n=30. Or if total is ₹27,000, the AP parameters need adjustment. For pedagogical accuracy, let's use consistent numbers: total penalty ₹27,750 → n=30 days.
REASONING: This problem requires setting up the sum formula with given a and d, forming a quadratic equation in n, solving it, and rejecting the negative root as physically meaningless. The verification step is crucial to catch arithmetic errors.
ANSWER: 30 days (with corrected total penalty of ₹27,750)

## WORKED_EXAMPLE_2
PROBLEM: The sum of first n terms of an AP is given by S_n = 4n² - 3n. Find the AP (i.e., first term a and common difference d) and its 15th term.
STEPS:
- Step 1: Recall the relationship between nth term and sum: a_n = S_n - S_{n-1} for n ≥ 2, and a_1 = S_1.
- Step 2: Find first term a = a_1 = S_1 = 4(1)² - 3(1) = 4 - 3 = 1.
- Step 3: Find second term a_2 = S_2 - S_1. S_2 = 4(4) - 3(2) = 16 - 6 = 10. So a_2 = 10 - 1 = 9.
- Step 4: Common difference d = a_2 - a_1 = 9 - 1 = 8. The AP is 1, 9, 17, 25, ...
- Step 5: Find 15th term using a_n = a + (n-1)d: a_15 = 1 + 14×8 = 1 + 112 = 113.
- Step 6: Verify using sum formula: a_15 = S_15 - S_14. S_15 = 4(225) - 45 = 900 - 45 = 855. S_14 = 4(196) - 42 = 784 - 42 = 742. a_15 = 855 - 742 = 113. Matches.
REASONING: When S_n is given as a polynomial in n, the AP parameters are extracted using a_1 = S_1 and d = a_2 - a_1 = (S_2 - S_1) - S_1 = S_2 - 2S_1. This method works because S_n is quadratic in n for any AP, and the coefficients directly relate to a and d.
ANSWER: AP: 1, 9, 17, 25, ... with a = 1, d = 8; 15th term = 113

## WORKED_EXAMPLE_3
PROBLEM: In an AP, the sum of first 10 terms is 150 and the sum of first 20 terms is 600. Find the sum of first 30 terms.
STEPS:
- Step 1: Write equations using S_n = n/2 [2a + (n-1)d]. For n=10: 150 = 10/2 [2a + 9d] → 150 = 5(2a + 9d) → 2a + 9d = 30. (Equation 1)
- Step 2: For n=20: 600 = 20/2 [2a + 19d] → 600 = 10(2a + 19d) → 2a + 19d = 60. (Equation 2)
- Step 3: Solve the system: Subtract Eq1 from Eq2: (2a + 19d) - (2a + 9d) = 60 - 30 → 10d = 30 → d = 3.
- Step 4: Substitute d = 3 into Eq1: 2a + 27 = 30 → 2a = 3 → a = 1.5.
- Step 5: Find S_30 = 30/2 [2(1.5) + 29(3)] = 15 [3 + 87] = 15 × 90 = 1350.
- Step 6: Alternative method using property of AP sums: S_10, S_20 - S_10, S_30 - S_20 form an AP. S_10 = 150, S_20 - S_10 = 450. Common difference of this new AP = 450 - 150 = 300. So S_30 - S_20 = 450 + 300 = 750. S_30 = 600 + 750 = 1350. Both methods agree.
REASONING: This problem combines two concepts: solving for AP parameters from two sum conditions, and the property that sums of equal blocks of terms in an AP themselves form an AP. The second method is elegant and often faster in exams.
ANSWER: Sum of first 30 terms = 1350

## COMPETENCY_QUESTION_1
QUESTION: A student claims: "If S_n = 5n² + 3n for an AP, then the common difference is 5 because the coefficient of n² is 5." Is this claim correct? Justify your answer by finding the actual common difference and explaining the relationship between the coefficients of S_n and the AP parameters.
COMPETENCY: Translating real-world situations to mathematical expressions
STEPS:
- Step 1: Recall that for an AP, S_n = (d/2)n² + (a - d/2)n. Compare with given S_n = 5n² + 3n.
- Step 2: Equate coefficients: d/2 = 5 → d = 10. And a - d/2 = 3 → a - 5 = 3 → a = 8.
- Step 3: The student's claim is incorrect. The coefficient of n² is d/2, not d. So d = 2 × 5 = 10, not 5.
- Step 4: Verify: AP is 8, 18, 28, 38, ... S_1 = 8, S_2 = 26, S_3 = 54. Formula gives S_1 = 5+3=8, S_2 = 20+6=26, S_3 = 45+9=54. Matches.
ANSWER: The claim is incorrect. The common difference is 10, not 5. For any AP, S_n = (d/2)n² + (a - d/2)n, so the coefficient of n² is d/2. Here d/2 = 5 gives d = 10.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The sum of first p terms of an AP is equal to the sum of first q terms (p ≠ q). Prove that the sum of first (p+q) terms is zero. Then, if p = 7 and q = 13, and the first term is 20, find the common difference and the 10th term.
COMPETENCY: Comparing and justifying
STEPS:
- Step 1: Given S_p = S_q. Using S_n = n/2[2a + (n-1)d]: p/2[2a + (p-1)d] = q/2[2a + (q-1)d].
- Step 2: Multiply by 2: 2ap + p(p-1)d = 2aq + q(q-1)d → 2a(p-q) + d[p(p-1) - q(q-1)] = 0.
- Step 3: Factor p(p-1) - q(q-1) = p² - p - q² + q = (p-q)(p+q) - (p-q) = (p-q)(p+q-1).
- Step 4: Since p ≠ q, divide by (p-q): 2a + d(p+q-1) = 0.
- Step 5: Now S_{p+q} = (p+q)/2[2a + (p+q-1)d] = (p+q)/2 × 0 = 0. Proved.
- Step 6: For p=7, q=13, a=20: 2(20) + d(7+13-1) = 0 → 40 + 19d = 0 → d = -40/19.
- Step 7: 10th term = a + 9d = 20 + 9(-40/19) = 20 - 360/19 = (380 - 360)/19 = 20/19.
ANSWER: Proof complete. For p=7, q=13, a=20: common difference d = -40/19, 10th term = 20/19.
DIFFICULTY: hard