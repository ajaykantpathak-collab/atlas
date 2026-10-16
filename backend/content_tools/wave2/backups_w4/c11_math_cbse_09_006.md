## ELI5
₹5000 in a bank at 10% compound interest builds 5000, 5500, 6050, 6655, ... - a GP, and the five-year total is a GP sum. The trick: multiply the whole sum by r, subtract, and nearly everything cancels, leaving S(n) = a(1 - r^n)/(1 - r) for r not 1. Same-ratio flatlining (r = 1) needs no machinery: S(n) = na. For r > 1 flip the signs: a(r^n - 1)/(r - 1).

## DEFINITION
The sum of the first n terms of a Geometric Progression (GP) with first term \(a\) and common ratio \(r\) is given by \(S_n = a\frac{1-r^n}{1-r}\) for \(r \neq 1\), and \(S_n = na\) for \(r = 1\). This formula calculates the total of terms \(a + ar + ar^2 + \dots + ar^{n-1}\) by exploiting the multiplicative structure of the progression.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can derive the sum formula by multiplying the series by \(r\) and subtracting, correctly select the appropriate formula based on whether \(r = 1\), \(r > 1\), or \(0 < r < 1\), and apply it to solve word problems involving compound growth, depreciation, or repeated multiplicative processes.

## SCOPE_BOUNDARY
Covers finite GP sum formula derivation, application for \(r \neq 1\) and special case \(r = 1\), and problems finding \(n\), \(a\), or \(r\) given the sum. Does NOT cover infinite GP sum (node c11_math_cbse_09_007), arithmetic-geometric progression (node c11_math_cbse_09_011), or sums of special series like \(\sum n^2\) (node c11_math_cbse_09_010).

## WALKTHROUGH
Imagine you deposit ₹5000 in a bank that offers 10% compound interest annually. The amounts at the end of each year form a GP: 5000, 5500, 6050, 6655, ... If you want the total amount accumulated over 5 years including all yearly interests, you need the sum of this GP. Start by writing the series \(S_n = a + ar + ar^2 + \dots + ar^{n-1}\). Multiply both sides by \(r\) to get \(rS_n = ar + ar^2 + \dots + ar^n\). Subtract the second equation from the first — most terms cancel, leaving \(S_n - rS_n = a - ar^n\). Factor and solve for \(S_n\). This telescoping subtraction is the key insight that works for any \(r \neq 1\).

Takeaway: mastery means reproducing the multiply-by-r-and-subtract derivation, picking the correct form for r = 1, r > 1 or 0 < r < 1, and carrying compound-growth word problems to a total. Exam moves: derive-the-sum questions and find-the-total-accumulated items. Check yourself: r = 1 is not a case to ignore - the general formula divides by 1 - r, so it collapses exactly there. Students miss it because they substitute blindly, when the definition splits on the ratio: the telescoping subtraction works for every r except 1, and r = 1 simply means every term is the same a.

## DIAGNOSTIC_QUESTION_1
Write the formula for the sum of the first n terms of a GP with first term a and common ratio r, and state the condition under which this formula is valid.

## DIAGNOSTIC_ANSWER_1
The formula is \(S_n = a\frac{1-r^n}{1-r}\) for \(r \neq 1\). If a student writes \(S_n = a\frac{r^n-1}{r-1}\) without noting it's equivalent only when \(r \neq 1\), or forgets the condition \(r \neq 1\), they haven't understood why the derivation fails at \(r=1\) (division by zero). A wrong answer like \(S_n = \frac{a(r^n-1)}{r}\) reveals confusion between the nth term formula \(ar^{n-1}\) and the sum formula.

## DIAGNOSTIC_QUESTION_2
Explain why the formula \(S_n = a\frac{1-r^n}{1-r}\) cannot be used when \(r = 1\), and state the correct formula for that case.

## DIAGNOSTIC_ANSWER_2
When \(r = 1\), the denominator \(1-r = 0\), making the formula undefined. The GP becomes \(a, a, a, \dots\) (constant sequence), so the sum is simply \(n\) times \(a\), i.e., \(S_n = na\). If a student says "the formula still works if we take limit" or "use L'Hôpital's rule", they are overcomplicating a simple case. The correct understanding is that the derivation step \(S_n(1-r) = a(1-r^n)\) becomes \(0 = 0\) when \(r=1\), giving no information about \(S_n\).

## DIAGNOSTIC_QUESTION_3
Find the sum of the first 8 terms of the GP: 3, 6, 12, 24, ...

## DIAGNOSTIC_ANSWER_3
Given: \(a = 3\), \(r = 6/3 = 2\), \(n = 8\). Since \(r > 1\), use \(S_n = a\frac{r^n-1}{r-1}\). \(S_8 = 3 \times \frac{2^8 - 1}{2 - 1} = 3 \times (256 - 1) = 3 \times 255 = 765\). If a student uses \(S_n = a\frac{1-r^n}{1-r}\) and gets \(3 \times \frac{1-256}{-1} = 765\), it's correct but they should recognize the equivalent form for \(r>1\) avoids negative signs. A wrong answer 768 comes from using \(n=7\) (confusing term index with count) or 1530 from forgetting to multiply by \(a=3\).

## DIAGNOSTIC_QUESTION_4
The sum of the first 5 terms of a GP is 31 and the first term is 1. Find the common ratio \(r\), given that \(r\) is a positive integer.

## DIAGNOSTIC_ANSWER_4
Given \(S_5 = 31\), \(a = 1\), \(n = 5\). \(S_5 = \frac{r^5 - 1}{r - 1} = 31 \Rightarrow r^5 - 1 = 31(r - 1) \Rightarrow r^5 - 31r + 30 = 0\). By trial, \(r = 2\) gives \(32 - 62 + 30 = 0\). So \(r = 2\). If a student tries to use the formula \(S_n = a\frac{1-r^n}{1-r}\) and gets \(\frac{1-r^5}{1-r} = 31\) but cannot solve the polynomial, they lack algebraic manipulation skills for reverse problems. A wrong answer \(r = 31/5 = 6.2\) comes from incorrectly assuming \(S_n \approx ar^{n-1}\) or treating it as AP.

## DIAGNOSTIC_QUESTION_5
A student solves: "Find sum of first 6 terms of GP with a=2, r=3" as follows: \(S_6 = 2\frac{3^6-1}{3-1} = 2\frac{729-1}{2} = 2 \times 364 = 728\). Is this correct? If not, identify the error.

## DIAGNOSTIC_ANSWER_5
The student's calculation has an arithmetic error: \(3^6 = 729\) is correct, \(729-1 = 728\), but \(728/2 = 364\), and \(2 \times 364 = 728\). The final answer 728 is actually correct! The error is in the intermediate statement "\(2 \times 364 = 728\)" — wait, \(2 \times 364 = 728\) is correct. Let me recheck: \(S_6 = 2 + 6 + 18 + 54 + 162 + 486 = 728\). The solution is fully correct. If a student flags this as wrong, they may be miscomputing \(3^6\) as 243 (which is \(3^5\)) or misapplying the formula. This question tests careful evaluation of a complete solution.

## DIAGNOSTIC_QUESTION_6
Create a real-life problem involving a GP where the sum of the first n terms needs to be found, and the common ratio is a fraction between 0 and 1. Provide the problem statement and solve it.

## DIAGNOSTIC_ANSWER_6
Problem: "A ball is dropped from a height of 10 metres. Each time it bounces, it rebounds to 3/4 of its previous height. Find the total vertical distance travelled by the ball until it hits the ground for the 5th time." Solution: Downward distances: 10, 10(3/4), 10(3/4)², 10(3/4)³, 10(3/4)⁴. Upward distances (after 1st to 4th bounce): 10(3/4), 10(3/4)², 10(3/4)³, 10(3/4)⁴. Total = 10 + 2×10[3/4 + (3/4)² + (3/4)³ + (3/4)⁴] = 10 + 20 × \(\frac{3/4(1-(3/4)^4)}{1-3/4}\) = 10 + 20 × 3 × (1 - 81/256) = 10 + 60 × 175/256 = 10 + 41.0156 = 51.0156 m. A poor answer uses only downward distances or treats it as infinite GP.

## COMMON_MISCONCEPTION
Students often confuse the exponent in the sum formula: they use \(r^n\) in the numerator when the last term is \(ar^{n-1}\), but then incorrectly write \(S_n = a\frac{r^{n-1}-1}{r-1}\) instead of \(a\frac{r^n-1}{r-1}\). For example, for GP 2, 6, 18 (n=3, r=3), they compute \(S_3 = 2\frac{3^{2}-1}{3-1} = 2\frac{8}{2} = 8\) instead of the correct \(2\frac{27-1}{2} = 26\). This happens because they see the last term \(ar^{n-1}\) and think the numerator should have \(r^{n-1}\), not understanding that the derivation produces \(r^n\) from the extra term \(ar^n\) in \(rS_n\).

## ON_FAILURE
If a student makes this exponent error, have them write out the series explicitly for n=3: \(S_3 = a + ar + ar^2\). Multiply by r: \(rS_3 = ar + ar^2 + ar^3\). Subtract: \(S_3 - rS_3 = a - ar^3\). Show that the cancelled terms leave \(ar^3\) (which is \(ar^n\)), not \(ar^2\). Then generalize: the subtracted series always has one extra term at the end (\(ar^n\)), so the numerator is \(a - ar^n = a(1-r^n)\). Practice with n=4, n=5 until the pattern \(r^n\) is internalized.

## PREREQUISITE_NODE_IDS
c11_math_cbse_09_005, c9_math_ch8_8, c9_math_ch8_9, c8_math_ch2_7, c8_math_ch2_9, c11_math_cbse_09_001, c11_math_cbse_09_012

## PREREQUISITE_REASONS
c11_math_cbse_09_005: General term of GP (\(ar^{n-1}\)) is needed to identify the last term and understand the structure of the series.
c9_math_ch8_8: Definition of GP and common ratio from Class 9 provides the foundational concept of multiplicative patterns.
c9_math_ch8_9: nth term formula of GP from Class 9 is directly used in the sum derivation.
c8_math_ch2_7: Law of exponents \(a^m \times a^n = a^{m+n}\) is essential for manipulating \(r \times r^{n-1} = r^n\) during derivation.
c8_math_ch2_9: Power of a power \((a^m)^n = a^{mn}\) helps in simplifying expressions like \((r^k)^m\) when solving for n in sum problems.
c11_math_cbse_09_001: Uses GP sequence understanding to derive sum formulas.  
c11_math_cbse_09_012: c9_math_ch8_9 -> c11_math_cbse_09_005 -> c11_math_cbse_09_006 -> c11_math_cbse_09_007 -> c11_math_cbse_09_012  

## FORWARD_NODE_IDS
c11_math_cbse_09_007, c11_math_cbse_09_011, c12_acc_cbse_06_009, c12_bs_cbse_09_003, c12_phy_cbse_13_007

## FORWARD_REASONS
c11_math_cbse_09_007: Finite GP sum formula is the basis for deriving infinite GP sum as limit when \(|r|<1\) and \(n \to \infty\).
c11_math_cbse_09_011: GP sum formula dr(1-rⁿ⁻¹)/(1-r) appears in AGP derivation  
c12_acc_cbse_06_009: The sinking fund factor is derived from the sum of n terms of a GP; students must grasp the formula origin to avoid blind table usage.  
c12_bs_cbse_09_003: Sum of n terms of GP — the annuity PV formula is derived from summing a GP; used in constant cash flow NPV calculations.  
c12_phy_cbse_13_007: Sum of n terms of GP, relevant for total decays over multiple half-lives.  

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_02_003, c11_eco_cbse_03_002, c11_chem_cbse_01_004
## CROSS_SUBJECT_REASONS
c11_physics_ch2_3: Radioactive decay and capacitor charging/discharging follow geometric decay; total decayed amount uses GP sum.
c11_economics_ch3_2: Compound interest calculations and present value of annuities use finite GP sum with \(r = 1 + i\).
c11_chemistry_ch1_4: Concentration in serial dilutions forms a GP; total solute transferred uses GP sum.
c11_phy_cbse_02_003: Cross-subject support: Instantaneous velocity is the rate of change of position with respect to time at a specifi... supplies tools/facts used directly in this node.  
c11_eco_cbse_03_002: Cross-subject support: The New Economic Policy (NEP) of 1991 is a comprehensive set of economic reforms structure... supplies tools/facts used directly in this node.  
c11_chem_cbse_01_004: Cross-subject support: Gay Lussac's Law of Gaseous Volumes states that when gases react chemically at constant te... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c9_math_ch8_9 -> c11_math_cbse_09_005 -> c11_math_cbse_09_006 -> c11_math_cbse_09_007 -> c11_math_cbse_09_012

## THIS_FORMULA
\(S_n = \begin{cases} a\frac{1-r^n}{1-r} & \text{if } r \neq 1 \\ na & \text{if } r = 1 \end{cases}\) where \(a\) = first term, \(r\) = common ratio, \(n\) = number of terms. Equivalent form for \(r > 1\): \(S_n = a\frac{r^n-1}{r-1}\).

## FORMULA_VARIABLES
a = first term of the GP (non-zero real number), r = common ratio (real number, \(r \neq 0\)), n = number of terms (positive integer), \(S_n\) = sum of first n terms.

## FORMULA_UNITS
Units depend on context: if terms represent rupees, sum is in rupees; if metres, sum is in metres; dimensionless if pure numbers.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch2_3 | Radioactive decay total activity over n half-lives forms GP sum with r=1/2
c11_economics_ch3_2 | Future value of annuity with regular deposits uses GP sum with r = 1 + interest rate
c11_chemistry_ch1_4 | Serial dilution total concentration transferred uses GP sum with r = dilution factor

## PREREQ_CONCEPT
Understanding of geometric progression structure (each term is previous term multiplied by constant ratio) and facility with laws of exponents for algebraic manipulation.

## PREREQ_BEFORE
Student must be able to identify a, r, n from a given GP, write the general term \(T_n = ar^{n-1}\), and simplify expressions like \(r \times r^{n-1}\) using exponent rules.

## PREREQ_STUCK
If stuck, revisit c11_math_cbse_09_005 (GP General Term) to practice identifying a and r, and c8_math_ch2_7 (Multiplying Powers) to master exponent manipulation needed for the derivation.

## WORKED_EXAMPLE_1
PROBLEM: A person saves ₹100 in the first month and increases his savings by 20% each subsequent month. Find his total savings at the end of 12 months.
STEPS:
- Step 1: Identify the pattern. Savings: Month 1 = 100, Month 2 = 100 × 1.2 = 120, Month 3 = 120 × 1.2 = 144. This is a GP with a = 100, r = 1.2.
- Step 2: Determine n. End of 12 months means n = 12 terms.
- Step 3: Select formula. Since r = 1.2 > 1, use \(S_n = a\frac{r^n-1}{r-1}\).
- Step 4: Substitute values: \(S_{12} = 100 \times \frac{1.2^{12} - 1}{1.2 - 1} = 100 \times \frac{1.2^{12} - 1}{0.2}\).
- Step 5: Compute \(1.2^{12}\). \(1.2^2 = 1.44\), \(1.2^4 = 1.44^2 = 2.0736\), \(1.2^8 = 2.0736^2 = 4.2998\), \(1.2^{12} = 4.2998 \times 2.0736 = 8.916\). So \(S_{12} = 100 \times \frac{8.916 - 1}{0.2} = 100 \times \frac{7.916}{0.2} = 100 \times 39.58 = 3958\).
- Step 6: Interpret. Total savings = ₹3958 (approx). Verify: The sum grows rapidly due to compounding effect of 20% monthly increase.
REASONING: The 20% monthly increase means each term is 1.2 times the previous, forming a GP. The sum formula aggregates all monthly savings. Using \(r^n-1\) over \(r-1\) avoids negative denominator when r>1.
ANSWER: ₹3958 (approximately)

## WORKED_EXAMPLE_2
PROBLEM: The sum of the first 4 terms of a GP is 30 and the sum of the first 8 terms is 960. Find the first term and common ratio.
STEPS:
- Step 1: Write equations using sum formula. \(S_4 = a\frac{r^4-1}{r-1} = 30\) and \(S_8 = a\frac{r^8-1}{r-1} = 960\).
- Step 2: Divide the two equations to eliminate a. \(\frac{S_8}{S_4} = \frac{r^8-1}{r^4-1} = \frac{960}{30} = 32\).
- Step 3: Factor numerator: \(r^8-1 = (r^4-1)(r^4+1)\). So \(\frac{(r^4-1)(r^4+1)}{r^4-1} = r^4+1 = 32\).
- Step 4: Solve for r: \(r^4 = 31 \Rightarrow r = \sqrt[4]{31}\). Since terms are likely real, \(r = 31^{1/4}\) (positive real root).
- Step 5: Substitute back to find a. \(S_4 = a\frac{31-1}{r-1} = a\frac{30}{r-1} = 30 \Rightarrow a = r-1 = 31^{1/4} - 1\).
- Step 6: Verify. Check \(S_8 = a\frac{r^8-1}{r-1} = (r-1)\frac{31^2-1}{r-1} = 961-1 = 960\). Correct.
REASONING: Dividing sums eliminates the first term a. The algebraic identity \(r^8-1 = (r^4-1)(r^4+1)\) is crucial for simplification. This reverse problem (given sums, find parameters) tests deep understanding of the formula structure.
ANSWER: \(a = \sqrt[4]{31} - 1\), \(r = \sqrt[4]{31}\)

## WORKED_EXAMPLE_3
PROBLEM: A ball is dropped from a height of 80 metres. On each bounce, it rebounds to 3/5 of the height from which it fell. Find the total distance travelled by the ball before it comes to rest. (Assume the ball eventually stops after infinite bounces, but compute the distance after 6 bounces as a finite sum approximation.)
STEPS:
- Step 1: Model the motion. Initial drop = 80 m (down). After 1st bounce: up = 80 × 3/5 = 48 m, down = 48 m. After 2nd bounce: up = 48 × 3/5 = 28.8 m, down = 28.8 m. This continues.
- Step 2: Total distance after n bounces (where n bounces means n up-down pairs after initial drop). For 6 bounces: Downward distances form GP: 80, 48, 28.8, ... (6 terms). Upward distances form GP: 48, 28.8, ... (6 terms).
- Step 3: Downward GP: a₁ = 80, r = 3/5, n = 6. \(S_{\text{down}} = 80\frac{1-(3/5)^6}{1-3/5} = 80\frac{1-729/15625}{2/5} = 200 \times \frac{14896}{15625} = 190.87\) m.
- Step 4: Upward GP: a₂ = 48, r = 3/5, n = 6. \(S_{\text{up}} = 48\frac{1-(3/5)^6}{2/5} = 120 \times \frac{14896}{15625} = 114.52\) m.
- Step 5: Total distance = \(S_{\text{down}} + S_{\text{up}} = 190.87 + 114.52 = 305.39\) m.
- Step 6: Compare with infinite sum. Infinite total = 80 + 2×48/(1-3/5) = 80 + 240 = 320 m. After 6 bounces, 305.39 m is 95.4% of total.
REASONING: The problem combines two GPs (upward and downward) with same ratio but different first terms. The finite sum approximates the infinite process. This models real-world damping where infinite sum is theoretical limit.
ANSWER: 305.39 metres (after 6 bounces)

## COMPETENCY_QUESTION_1
QUESTION: A bacteria culture doubles every hour. Initially there are 500 bacteria. The culture is observed for 10 hours. (a) Write the expression for the number of bacteria at the end of the nth hour. (b) Find the total number of bacteria that have existed over the 10-hour period (sum of populations at each hour). (c) If the petri dish can hold a maximum of 500,000 bacteria, after how many hours will it reach capacity? Justify your method for each part.
COMPETENCY: Translating real-world exponential growth to mathematical model and applying GP sum vs nth term distinction
STEPS:
- Step 1: Recognize doubling means r = 2. Initial population a = 500. GP: 500, 1000, 2000, ...
- Step 2: (a) nth hour population = nth term of GP = \(ar^{n-1} = 500 \times 2^{n-1}\).
- Step 3: (b) Total bacteria over 10 hours = sum of first 10 terms. \(S_{10} = 500\frac{2^{10}-1}{2-1} = 500 \times 1023 = 511,500\).
- Step 4: (c) Capacity 500,000. Need \(500 \times 2^{n-1} \geq 500,000 \Rightarrow 2^{n-1} \geq 1000\). \(2^9 = 512\), \(2^{10} = 1024\). So n-1 = 10, n = 11 hours. But observation is only 10 hours, so capacity not reached within observation period.
- Step 5: Verify: At hour 10, population = 500 × 2⁹ = 256,000 < 500,000. At hour 11, population = 512,000 > 500,000.
ANSWER: (a) \(500 \times 2^{n-1}\), (b) 511,500, (c) 11 hours (not reached in 10-hour observation)
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A company's profit in the first year is ₹2 lakhs. The profit increases by 15% each year. The company plans to reinvest 40% of each year's profit into a fund that earns 10% annual compound interest. Find the total value of the reinvestment fund at the end of 5 years. (Assume reinvestment happens at year-end and earns interest from next year.)
COMPETENCY: Combining GP sum with compound interest (nested GP) and multi-step financial modeling
STEPS:
- Step 1: Yearly profits form GP: a = 2, r = 1.15. Profits: Year 1: 2, Year 2: 2.3, Year 3: 2.645, Year 4: 3.04175, Year 5: 3.4980125 (in lakhs).
- Step 2: Reinvestment each year = 40% of profit. Reinvestments: 0.8, 0.92, 1.058, 1.2167, 1.3992 (lakhs) at end of years 1 to 5.
- Step 3: Each reinvestment earns 10% compound interest for remaining years. Year 1 reinvestment (0.8) grows for 4 years: \(0.8 \times 1.1^4\). Year 2 (0.92) grows for 3 years: \(0.92 \times 1.1^3\). Year 3 (1.058) grows for 2 years: \(1.058 \times 1.1^2\). Year 4 (1.2167) grows for 1 year: \(1.2167 \times 1.1\). Year 5 (1.3992) grows for 0 years: 1.3992.
- Step 4: Total fund = \(0.8(1.1)^4 + 0.92(1.1)^3 + 1.058(1.1)^2 + 1.2167(1.1) + 1.3992\). Compute: 0.8×1.4641 = 1.17128; 0.92×1.331 = 1.22452; 1.058×1.21 = 1.28018; 1.2167×1.1 = 1.33837; +1.3992 = 6.41355 lakhs.
- Step 5: Recognize this as sum of terms of form (0.4 × 2 × 1.15^{k-1}) × 1.1^{5-k} for k=1 to 5. This is an arithmetico-geometric series, but direct computation is feasible for n=5.
ANSWER: ₹6.41 lakhs (approximately)
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you deposit ₹5000 in a bank that offers 10% ______ interest annually.

## DIAGNOSTIC_ANSWER_7
compound

**A wrong answer ("simple" or "yearly") reveals the student has swapped the walkthrough's adjective - the bank offers 10% compound interest annually.** Compound is the walkthrough's own adjective, and the adjective is what the blank grades. Recall the 5000-5500-6050 ladder before filling, and give the adjective exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: If you want the total amount accumulated over ______ years including all yearly interests, you need the sum of this GP.

## DIAGNOSTIC_ANSWER_8
5

**A wrong answer (4 or 10) reveals the student has drifted from the walkthrough - the total accumulated over 5 years, including all yearly interests, is the sum of the GP.** The 5 is the walkthrough's own year count. Recall the annual 10% growth before filling, and give the figure exactly.
