## ELI5
A fund rises 50 percent, then falls 50 percent. The arithmetic mean shrugs: zero, break-even. The statement disagrees - 10,000 became 7,500, a 25 percent loss. Multiplicative processes multiply: 1.5 times 0.5 is 0.75, whose root is about 0.866 - an honest annualised return of minus 13.4 percent. That is the geometric mean: the constant rate that would land you in the same place, the truthful average for growth, ratios and index numbers.

## DEFINITION
The Geometric Mean (GM) is the n-th root of the product of n positive observations, defined as \( GM = \left( \prod_{i=1}^{n} x_i \right)^{1/n} \) for ungrouped data and \( GM = \text{antilog} \left( \frac{\sum f \log x}{\sum f} \right) \) for grouped data. It is the appropriate average for multiplicative processes, ratios, rates of change, and percentage growth where the Arithmetic Mean overstates the central tendency.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must be able to compute the Geometric Mean for individual, discrete, and continuous series using both direct product and logarithmic methods, and justify why GM is preferred over AM for average growth rates, index numbers, and ratio data by demonstrating the property \( GM \leq AM \) with equality only when all values are equal.

## SCOPE_BOUNDARY
This node covers calculation of Geometric Mean for ungrouped (individual) and grouped (discrete/continuous) data using direct and log methods, its properties (GM ≤ AM, effect of extreme values), and applications in average growth rates, compound interest, and index numbers. It does NOT cover Harmonic Mean (next node) or advanced topics like weighted geometric mean with non-integer weights.

## WALKTHROUGH
Imagine you invested ₹10,000 in a mutual fund that grew by 50% in Year 1, then fell by 50% in Year 2. Your friend says "average return is 0% so you broke even" – but your actual value is ₹7,500, a 25% loss! This happens because Arithmetic Mean (0%) misrepresents multiplicative growth. Geometric Mean correctly gives -13.4% annualised return. To begin, recall that for multiplicative processes, we multiply growth factors (1.5 × 0.5 = 0.75) and take the n-th root (√0.75 ≈ 0.866), then subtract 1. The key insight: GM answers "what constant rate would give the same final result?" – making it essential for finance, population growth, and index numbers where AM fails.

Takeaway: mastery means computing GM by logs or growth factors and deploying it wherever processes compound. Exam moves: average-growth-rate questions on the mutual-fund scene. Check yourself: GM never exceeds AM - equality only when every value matches, which makes the inequality a quick error check. Students miss it because averaging percentages feels safe, when the halved statement shows the design: a 50 percent fall needs a 100 percent rise to undo, percentages do not add - they compound - and the geometric mean is the only average that speaks the language of multiplication fluently.

## DIAGNOSTIC_QUESTION_1
State the formula for Geometric Mean of n positive observations \( x_1, x_2, ..., x_n \) and explain why all observations must be strictly positive.

## DIAGNOSTIC_ANSWER_1
The formula is \( GM = (x_1 \times x_2 \times ... \times x_n)^{1/n} \) or equivalently \( \log(GM) = \frac{1}{n} \sum \log x_i \). All observations must be positive because the logarithm of zero or negative numbers is undefined in real numbers, and the product of an even number of negative values could yield a positive product with a real root, but the logarithmic method (standard for computation) would fail. A wrong answer (e.g., "zero is allowed" or "we can use absolute values") reveals the student does not understand the logarithmic foundation of GM computation and the domain restrictions of the log function.

## DIAGNOSTIC_QUESTION_2
A student calculates the average growth rate of a bacteria culture that doubles every hour for 3 hours as \( \frac{2+2+2}{3} = 2 \) (200% per hour). Explain why this is incorrect and what the correct Geometric Mean growth factor is.

## DIAGNOSTIC_ANSWER_2
The student used Arithmetic Mean on growth factors (2, 2, 2), but growth is multiplicative: starting with 1 unit, after 3 hours it becomes \( 1 \times 2 \times 2 \times 2 = 8 \). The constant hourly growth factor \( r \) satisfies \( r^3 = 8 \), so \( r = 2 \) – here AM = GM because all values are equal. However, if growth rates were 2, 3, 4 (factors), AM = 3 but GM = \( \sqrt[3]{24} \approx 2.88 \). The error reveals the student treats multiplicative growth as additive, confusing growth factors with percentage changes. They must understand that GM operates on the ratio scale, not the interval scale.

## DIAGNOSTIC_QUESTION_3
Calculate the Geometric Mean of the data set: 4, 9, 16 using the logarithmic method. Show all steps including finding antilog.

## DIAGNOSTIC_ANSWER_3
Step 1: Take log of each value: log 4 = 0.6021, log 9 = 0.9542, log 16 = 1.2041. Step 2: Sum = 2.7604. Step 3: Divide by n=3: 2.7604/3 = 0.9201. Step 4: Antilog(0.9201) = 8.318 ≈ 8.32. Step 5: Verify: \( \sqrt[3]{4 \times 9 \times 16} = \sqrt[3]{576} = 8.32 \). A wrong answer (e.g., using natural log but base-10 antilog, or forgetting to divide by n) reveals confusion between log bases or the formula structure. The student must consistently use the same log base and remember the division by n corresponds to the n-th root.

## DIAGNOSTIC_QUESTION_4
Compare the Geometric Mean and Arithmetic Mean for the data: 2, 8, 32. Prove that GM ≤ AM and explain when equality holds. What does this inequality imply for average returns on investment?

## DIAGNOSTIC_ANSWER_4
AM = (2+8+32)/3 = 14. GM = \( \sqrt[3]{2 \times 8 \times 32} = \sqrt[3]{512} = 8 \). Indeed 8 ≤ 14. Equality holds iff all observations are equal (AM-GM inequality). For investment returns, this means the arithmetic average return overstates the actual compound growth rate. If an asset returns 100%, 300%, 700% in three years, AM = 367% but GM = 300% (since growth factors 2, 4, 8 give GM=4, i.e., 300% per year). The investor who relies on AM expects higher terminal wealth than reality. A wrong answer (e.g., "AM is always better" or "GM can exceed AM") reveals fundamental misunderstanding of the inequality and its financial implication.

## DIAGNOSTIC_QUESTION_5
Critique this statement: "For calculating average speed over a journey with equal distances at different speeds, we should use Geometric Mean of the speeds." Provide a counterexample and the correct average.

## DIAGNOSTIC_ANSWER_5
The statement is FALSE. For equal distances, average speed = Harmonic Mean of speeds, not Geometric Mean. Counterexample: 60 km at 30 km/h (2 h) and 60 km at 60 km/h (1 h). Total distance 120 km, total time 3 h → average speed = 40 km/h. HM = \( \frac{2}{\frac{1}{30}+\frac{1}{60}} = 40 \). GM = \( \sqrt{30 \times 60} \approx 42.4 \) km/h (incorrect). GM is for multiplicative growth (ratios), HM for rates with fixed numerator (distance). A student choosing GM confuses the structure of the problem: speed = distance/time, so time = distance/speed – the additive quantity is time (reciprocal of speed), requiring HM. This reveals confusion between when to use GM (product of ratios) vs HM (sum of reciprocals).

## DIAGNOSTIC_QUESTION_6
Create a real-world problem from Indian economics where Geometric Mean is the ONLY appropriate average, and Arithmetic Mean would give a misleading result. Specify the data, compute both, and explain the interpretation difference.

## DIAGNOSTIC_ANSWER_6
Problem: India's GDP growth rates over 5 years: 8%, 7%, -5%, 9%, 6%. Growth factors: 1.08, 1.07, 0.95, 1.09, 1.06. AM of rates = (8+7-5+9+6)/5 = 5%. GM of factors = \( \sqrt[5]{1.08 \times 1.07 \times 0.95 \times 1.09 \times 1.06} = \sqrt[5]{1.267} \approx 1.0486 \) → 4.86% annualised. If ₹100 crore initial GDP: AM predicts ₹100 × (1.05)^5 = ₹127.63 cr. Actual: ₹100 × 1.267 = ₹126.7 cr. GM matches reality; AM overstates by ₹0.93 cr. A poor answer uses positive-only data (no negative growth) where AM and GM are close, missing the critical role of GM in handling volatility and negative values. The student must recognise that GM captures compounding and volatility drag.

## COMMON_MISCONCEPTION
Students believe Geometric Mean can be calculated for data containing zero or negative values by "ignoring zeros" or "taking absolute values". They compute GM of {2, 0, 8} as \( \sqrt[3]{2 \times 0 \times 8} = 0 \) or \( \sqrt[2]{2 \times 8} = 4 \) (dropping zero). Both are wrong: GM is UNDEFINED for non-positive data because the logarithmic transformation \( \log x \) requires \( x > 0 \). In growth rate contexts, a zero growth factor means total loss (value becomes zero forever), making "average growth" meaningless. The error stems from treating GM as a mechanical formula rather than understanding its multiplicative foundation.

## ON_FAILURE
If a student attempts GM on non-positive data: (1) Ask: "What is log(0) or log(-5)?" to expose the domain error. (2) Show the growth interpretation: a -100% return (factor 0) means capital is wiped out – no recovery possible, so "average growth" is undefined. (3) Demonstrate with a concrete example: ₹1000 → 0 → any positive number is impossible. (4) Redirect to the correct approach: for growth rates including -100%, either exclude that period with a footnote, or use Arithmetic Mean on rates with a clear caveat that it does not represent compound growth. Never "drop zeros" or "use absolute values".

## PREREQUISITE_NODE_IDS
c11_stat_cbse_05_001, c11_stat_cbse_05_002, c8_math_ch2_1, c9_math_ch8_8, c8_math_ch2_3, c11_stat_cbse_05_008, c11_stat_cbse_05_004

## PREREQUISITE_REASONS
c11_stat_cbse_05_001: Understanding what an average represents and why different averages exist is the conceptual foundation for accepting GM as a distinct measure.
c11_stat_cbse_05_002: Arithmetic Mean calculation and properties (especially sensitivity to extremes) provide the contrast needed to appreciate when GM is preferred.
c8_math_ch2_1: Multiplicative vs additive growth distinction is the core intuition behind why GM exists – it averages growth factors, not absolute changes.
c9_math_ch8_8: Geometric Progression (GP) formula \( ar^{n-1} \) directly parallels GM as the constant ratio \( r \) in a GP; the n-th root extraction is the same operation.
c8_math_ch2_3: Exponential notation \( a^m \times a^n = a^{m+n} \) and \( (a^m)^n = a^{mn} \) underpins the logarithmic method: \( \log(\prod x_i) = \sum \log x_i \) and \( \frac{1}{n} \sum \log x_i = \log(\sqrt[n]{\prod x_i}) \).
c11_stat_cbse_05_008: Understanding when Mean is misleading (skewed data) motivates the need for Geometric Mean for ratios/rates.  
c11_stat_cbse_05_004: ative)^weight and then the (Σweight)-th root. This example combines GM with weighted averages (from c11_stat_cbse_05_004) and applies to economics (index numbers), demonstrating cross-chapter synthesis.  

## FORWARD_NODE_IDS
c11_stat_cbse_05_010, c11_stat_cbse_05_011
## FORWARD_REASONS
c11_stat_cbse_05_010: Harmonic Mean is the third Pythagorean mean; understanding GM completes the trio (AM, GM, HM) and the inequality chain HM ≤ GM ≤ AM, which is a key exam topic.
c11_stat_cbse_05_011: Comparative Merits requires evaluating all five averages (AM, Median, Mode, GM, HM) on criteria like algebraic treatment, sensitivity to extremes, and suitability for ratios/rates/open-ended classes – GM's unique role for multiplicative data must be clear.

## CROSS_SUBJECT_PREREQS
c9_math_ch8_8, c8_math_ch8_9, c10_math_cbse_05_001, c8_math_ch2_1
## CROSS_SUBJECT_REASONS
c9_math_ch8_8: Geometric Progression (GP) teaches the constant ratio concept; GM is exactly that constant ratio for a set of growth factors – the mathematical bridge is the n-th root of a product.
c8_math_ch8_9: Simple Interest (linear growth) vs Compound Interest (geometric growth) – GM calculates the equivalent constant compound rate, directly applying the GM concept to finance.
c10_math_cbse_05_001: Arithmetic Progression (AP) contrasts with GP; AM corresponds to AP (constant difference), GM to GP (constant ratio) – this analogy helps students remember when to use which.
c8_math_ch2_1: Paper folding doubling pattern (2, 4, 8, 16...) is a GP; the "average doubling rate" per fold is the GM of the growth factors, connecting visual exponential growth to the formula.

## CHAIN_DESCRIPTION
c11_stat_cbse_05_001 -> c11_stat_cbse_05_002 -> c11_stat_cbse_05_009 -> c11_stat_cbse_05_010 -> c11_stat_cbse_05_011

## THIS_FORMULA
For ungrouped data (n positive observations): \( GM = \left( \prod_{i=1}^{n} x_i \right)^{\frac{1}{n}} = \text{antilog} \left( \frac{1}{n} \sum_{i=1}^{n} \log x_i \right) \). For discrete series: \( GM = \text{antilog} \left( \frac{\sum f_i \log x_i}{\sum f_i} \right) \). For continuous series: use mid-values \( x_i \) of class intervals in the discrete formula.

## FORMULA_VARIABLES
\( x_i \): individual observations (must be > 0); \( n \): number of observations; \( f_i \): frequency of i-th observation/class; \( \prod \): product notation; \( \log \): logarithm (base 10 or e, consistent); \( \text{antilog} \): inverse logarithm (10^y or e^y matching log base).

## FORMULA_UNITS
GM has the same units as the original observations (e.g., if x is in ₹, GM is in ₹; if x is a growth factor (unitless), GM is unitless). Logarithms are unitless.

## COMPUTATION_TYPE
geometric

## CROSS_SUBJECT
c9_math_ch8_8 | Geometric Progression provides the algebraic structure: the GM of growth factors is the common ratio of the GP formed by successive values.
c8_math_ch8_9 | Compound Interest formula A = P(1+r)^n uses the same n-th root principle: the equivalent annual rate r = (A/P)^(1/n) - 1 is the GM of annual growth factors minus 1.
c10_math_cbse_05_001 | Arithmetic Progression (constant difference) maps to Arithmetic Mean; Geometric Progression (constant ratio) maps to Geometric Mean – this structural analogy is a powerful memory aid.
c8_math_ch2_1 | Multiplicative growth (doubling pattern) vs linear growth demonstrates why AM fails for exponential processes – the paper folding example (2, 4, 8, 16) has GM = 2, AM = 7.5.

## PREREQ_CONCEPT
The student must understand that multiplicative processes (growth rates, ratios, index numbers) require averaging on the logarithmic scale, not the linear scale, because the product of growth factors determines the final outcome.

## PREREQ_BEFORE
The student must be able to compute Arithmetic Mean for all series types, use logarithm tables/calculators for log and antilog operations, and understand the concept of growth factor = (1 + rate/100).

## PREREQ_STUCK
If stuck, revisit c9_math_ch8_8 (Geometric Progression) to review n-th root and constant ratio concepts, and c8_math_ch2_3 (Exponential Notation) for log/antilog mechanics.

## WORKED_EXAMPLE_1
PROBLEM: The annual growth rates of a startup's revenue over 4 years were: 20%, 30%, -10%, 40%. Calculate the average annual growth rate using Geometric Mean. Interpret the result.

STEPS:
- Step 1: Convert percentage growth rates to growth factors (decimal multipliers): Year 1: 1 + 20/100 = 1.20; Year 2: 1.30; Year 3: 1 - 10/100 = 0.90; Year 4: 1.40. All factors are positive – GM is defined.
- Step 2: Take logarithm (base 10) of each factor: log(1.20) = 0.07918; log(1.30) = 0.11394; log(0.90) = -0.04576; log(1.40) = 0.14613.
- Step 3: Sum the logarithms: 0.07918 + 0.11394 + (-0.04576) + 0.14613 = 0.29349.
- Step 4: Divide by number of years (n = 4): 0.29349 / 4 = 0.07337.
- Step 5: Take antilog (10^0.07337) = 1.1837. This is the average growth factor.
- Step 6: Convert back to percentage: (1.1837 - 1) × 100 = 18.37% per annum.
- Step 7: Verify by direct product method: (1.20 × 1.30 × 0.90 × 1.40)^(1/4) = (1.9656)^(0.25) = 1.1837. Compare with Arithmetic Mean of rates: (20+30-10+40)/4 = 20%. The AM overstates the true compound growth because it ignores the volatility drag (the -10% year has disproportionate impact).

REASONING: The Geometric Mean of growth factors gives the constant annual rate that would yield the same final revenue if applied each year. The logarithmic method converts multiplication into addition (log(a×b) = log a + log b), making computation feasible for large n. The AM of percentages (20%) is higher than GM (18.37%) because AM does not account for the fact that a 10% loss requires an 11.1% gain just to break even – this asymmetry is captured by GM.

ANSWER: 18.37% per annum (Geometric Mean growth rate). The Arithmetic Mean of 20% is misleadingly optimistic.

## WORKED_EXAMPLE_2
PROBLEM: Calculate the Geometric Mean for the following discrete frequency distribution of monthly household expenditure (in ₹) on food:

Expenditure (₹): 1200, 1500, 1800, 2000, 2500
Number of households: 5, 10, 15, 8, 2

STEPS:
- Step 1: Verify all x_i > 0. Yes, all expenditures are positive.
- Step 2: Set up calculation table with columns: x, f, log x, f × log x.
- Step 3: Compute log x (base 10): log(1200)=3.07918, log(1500)=3.17609, log(1800)=3.25527, log(2000)=3.30103, log(2500)=3.39794.
- Step 4: Multiply each log x by frequency f: 5×3.07918=15.3959, 10×3.17609=31.7609, 15×3.25527=48.82905, 8×3.30103=26.40824, 2×3.39794=6.79588.
- Step 5: Sum f = 5+10+15+8+2 = 40. Sum f log x = 15.3959+31.7609+48.82905+26.40824+6.79588 = 129.18997.
- Step 6: Compute mean of logs: (Σ f log x) / (Σ f) = 129.18997 / 40 = 3.22975.
- Step 7: Take antilog: 10^3.22975 = 1697.4. Round to nearest rupee: ₹1697.
- Step 8: Compare with AM: Σfx/Σf = (6000+15000+27000+16000+5000)/40 = 69000/40 = ₹1725. GM (₹1697) < AM (₹1725), consistent with GM ≤ AM inequality. GM is lower because it downweights the high-expenditure households (right-skewed data).

REASONING: For grouped data with frequencies, each observation's log is weighted by its frequency before averaging. This is equivalent to taking the product of each value raised to its frequency power, then the N-th root where N = total frequency. The logarithmic method avoids overflow from large products (e.g., 1200^5 × 1500^10 × ...). The result ₹1697 represents the "typical" expenditure in a multiplicative sense – if every household spent this amount, the total expenditure would be the same only if we considered geometric aggregation, which is appropriate for ratio-scale data like expenditures where relative differences matter.

ANSWER: Geometric Mean = ₹1697 (approx). Arithmetic Mean = ₹1725. GM < AM as expected for positively skewed data.

## WORKED_EXAMPLE_3
PROBLEM: The price relatives (current year price / base year price × 100) for 5 commodities in a price index are: 120, 150, 110, 130, 140 with weights (base year expenditure shares): 30, 20, 25, 15, 10. Compute the weighted Geometric Mean index number. Explain why GM is preferred over AM for index numbers.

STEPS:
- Step 1: Recognise this requires WEIGHTED Geometric Mean. Formula: \( GM_w = \text{antilog} \left( \frac{\sum w_i \log x_i}{\sum w_i} \right) \) where w_i are weights, x_i are price relatives.
- Step 2: Verify all x_i > 0. Yes, price relatives are positive (110-150).
- Step 3: Compute log x_i (base 10): log(120)=2.07918, log(150)=2.17609, log(110)=2.04139, log(130)=2.11394, log(140)=2.14613.
- Step 4: Multiply by weights w_i: 30×2.07918=62.3754, 20×2.17609=43.5218, 25×2.04139=51.03475, 15×2.11394=31.7091, 10×2.14613=21.4613.
- Step 5: Sum weights Σw = 30+20+25+15+10 = 100. Sum w log x = 62.3754+43.5218+51.03475+31.7091+21.4613 = 210.10235.
- Step 6: Weighted mean of logs = 210.10235 / 100 = 2.1010235.
- Step 7: Antilog = 10^2.1010235 = 126.18. The weighted GM index = 126.18.
- Step 8: Compute weighted AM for comparison: Σwx/Σw = (30×120 + 20×150 + 25×110 + 15×130 + 10×140)/100 = (3600+3000+2750+1950+1400)/100 = 12700/100 = 127.00.
- Step 9: Interpretation: The GM index (126.18) is lower than AM index (127.00). GM satisfies the Time Reversal Test and Factor Reversal Test (Fisher's ideal index properties) – it treats price increases and decreases symmetrically on a ratio scale. AM overstates inflation because a 50% increase (150) and 33.3% decrease (66.67) average to 108.33 in AM but 100 in GM (no net change). This is critical for policy decisions.

REASONING: Index numbers measure relative price changes (ratios), which are multiplicative. The weighted GM corresponds to the geometric mean of price relatives weighted by expenditure shares – this is the theoretical foundation of the Fisher Ideal Index and satisfies key axiomatic properties (time reversal, factor reversal). The log-weighted method is computationally identical to taking the product of (price relative)^weight and then the (Σweight)-th root. This example combines GM with weighted averages (from c11_stat_cbse_05_004) and applies to economics (index numbers), demonstrating cross-chapter synthesis.

ANSWER: Weighted Geometric Mean Index = 126.18. Weighted Arithmetic Mean Index = 127.00. GM is preferred because it satisfies index number tests and correctly averages ratios.

## COMPETENCY_QUESTION_1
QUESTION: A mutual fund's NAV (Net Asset Value) grew from ₹100 to ₹150 in Year 1, then fell to ₹120 in Year 2, then rose to ₹180 in Year 3. (a) Calculate the annual growth factors for each year. (b) Compute the Geometric Mean annual growth factor and the equivalent constant annual growth rate (%). (c) If an investor uses the Arithmetic Mean of the annual percentage returns to project the 3-year value, by how much will they overestimate the final NAV? (d) Explain why the fund's factsheet must report the Geometric Mean (CAGR) and not the Arithmetic Mean.

COMPETENCY: Translating real-world financial scenarios to mathematical expressions and justifying the choice of average.

STEPS:
- Step 1: Calculate year-wise growth factors: Year 1: 150/100 = 1.50; Year 2: 120/150 = 0.80; Year 3: 180/120 = 1.50.
- Step 2: Compute GM of growth factors: (1.50 × 0.80 × 1.50)^(1/3) = (1.80)^(1/3) = 1.2164. CAGR = (1.2164 - 1) × 100 = 21.64%.
- Step 3: Annual % returns: Year 1: +50%, Year 2: -20%, Year 3: +50%. AM = (50 - 20 + 50)/3 = 26.67%. Projected NAV using AM: 100 × (1.2667)^3 = 100 × 2.032 = ₹203.2. Actual NAV = ₹180. Overestimation = ₹23.2.
- Step 4: Justification: SEBI regulations require CAGR (GM-based) because it reflects the actual compound growth an investor experiences. AM ignores volatility drag and sequence of returns risk.

ANSWER: (a) Growth factors: 1.50, 0.80, 1.50. (b) GM factor = 1.2164, CAGR = 21.64%. (c) Overestimation = ₹23.2 (AM projects ₹203.2 vs actual ₹180). (d) GM/CAGR represents the constant rate that replicates the actual terminal wealth; AM is a simple average of percentages that does not compound correctly and violates the Time Reversal Test.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The population of a town was 50,000 in 2010. The decadal growth rates (%) for 2010-2020 and 2020-2030 are given as 20% and 25% respectively. However, the census data shows the actual 2030 population is 72,000. (a) Calculate the Geometric Mean decadal growth rate implied by the actual 2030 population. (b) Show that the Arithmetic Mean of the reported growth rates (20%, 25%) is inconsistent with the actual data. (c) If the 2020 census was missed and only 2010 and 2030 data exist, which mean (AM or GM) should be used to estimate the 2020 population, and what is that estimate? (d) A student argues: "Since GM < AM always, using GM for population projection will always underestimate future population." Critique this statement.

COMPETENCY: Comparing and justifying statistical methods in demographic contexts, identifying errors in reported data.

STEPS:
- Step 1: Actual growth factor over 20 years: 72000/50000 = 1.44. GM decadal factor = √1.44 = 1.20. GM growth rate = 20% per decade.
- Step 2: Reported rates: 20% and 25%. AM = 22.5%. If AM were correct, 2030 population = 50000 × (1.225)^2 = 50000 × 1.5006 = 75,030 ≠ 72,000. Inconsistency confirmed.
- Step 3: For interpolating 2020 population from 2010 and 2030: use GM. 2020 population = 50000 × 1.20 = 60,000. (Check: 60000 × 1.20 = 72,000 ✓). AM would give 50000 × 1.225 = 61,250 (wrong).
- Step 4: Critique: The statement is false. GM < AM is true for the growth *factors*, but GM gives the *correct* compound projection. Using AM overestimates because it ignores that a 25% growth on a larger base (after 20% growth) adds more absolute people than 20% on the smaller base – but the actual data shows only 20% each decade. The "underestimate" claim confuses the mean of rates with the projection method. GM projects accurately; AM projects incorrectly high.

ANSWER: (a) 20% per decade. (b) AM projects 75,030 vs actual 72,000. (c) Use GM; estimate = 60,000. (d) The statement is false: GM gives the accurate projection; AM overestimates. The inequality GM ≤ AM refers to the averages of the growth factors, not the projection accuracy.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: It is the appropriate average for ______ processes, ratios, rates of change, and percentage growth where the Arithmetic Mean overstates the central tendency.

## DIAGNOSTIC_ANSWER_7
multiplicative

**A wrong answer ("additive") reveals the student has reversed the definition - GM is the appropriate average for multiplicative processes, ratios and percentage growth.** The word is what the blank grades. Recall the definition's list before filling, and give the word exactly. Verify against the lesson's own wording before you commit.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you invested ₹10,000 in a ______ fund that grew by 50% in Year 1, then fell by 50% in Year 2.

## DIAGNOSTIC_ANSWER_8
mutual

**A wrong answer ("savings") reveals the student has swapped the vehicle - the investment was in a mutual fund.** The word is what the blank grades. Recall the scene before filling, and give the word exactly. Verify against the lesson's own wording before you commit. The blank grades the exact term, not a synonym.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: This happens because Arithmetic Mean (______%) misrepresents multiplicative growth.

## DIAGNOSTIC_ANSWER_9
0

**A wrong answer ("25") reveals the student has answered the loss, not the AM - the arithmetic mean of plus 50 and minus 50 is 0 percent.** The number is what the blank grades. Recall the friend's claim before filling, and give the number exactly. Verify against the lesson's own wording before you commit.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Imagine you ______ ₹10,000 in a mutual fund that grew by 50% in Year 1, then fell by 50% in Year 2.

## DIAGNOSTIC_ANSWER_10
invested

The word is invested - what you did with the 10,000. A wrong answer ("deposited") reveals the student has paraphrased the verb. Recall the scene's opening before filling, and give the word exactly. Verify against the lesson's own wording before you commit. The blank grades the exact term, not a synonym.
