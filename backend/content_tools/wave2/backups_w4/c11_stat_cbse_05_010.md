## ELI5
Delhi to Jaipur at 60 km/h, the return at 40. The round trip's average speed is not 50 - you lingered far longer at 40. Distance fixed, time varying: average the reciprocals instead. HM = 2 divided by (1/60 + 1/40) = 48 km/h. Wherever the numerator is constant and the denominator does the varying - speed over fixed distance, price per unit over fixed spend - the harmonic mean is the honest average.

## DEFINITION
The Harmonic Mean (HM) is a measure of central tendency defined as the reciprocal of the arithmetic mean of the reciprocals of the given observations. For a set of n positive values \(x_1, x_2, \ldots, x_n\), the harmonic mean is \(HM = \frac{n}{\sum_{i=1}^n \frac{1}{x_i}}\). It is the appropriate average for rates and ratios where the numerator is constant (e.g., speed = distance/time with fixed distance, price per unit with fixed expenditure).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must be able to: (1) Identify real-world situations requiring harmonic mean (rates with constant numerator), (2) Calculate HM for individual, discrete, and continuous series using the correct formula, and (3) Justify why HM is preferred over AM or GM in specific contexts like average speed, average price per unit, or average density.

## SCOPE_BOUNDARY
This node covers calculation of Harmonic Mean for individual, discrete, and continuous series, the relationship HM ≤ GM ≤ AM for positive numbers, weighted harmonic mean, and specific applications (average speed, average price, average density). It does NOT cover harmonic mean for grouped data with open-ended classes, harmonic mean of negative/zero values (undefined), or advanced applications like harmonic mean in finance (P/E ratios) beyond Class 11 scope.

## WALKTHROUGH
Imagine you travel from Delhi to Jaipur at 60 km/h and return at 40 km/h. What is your average speed for the round trip? Most students instinctively calculate (60+40)/2 = 50 km/h — but this is wrong because you spend more time at the slower speed. The correct approach recognises that distance is constant (numerator fixed), so we need the harmonic mean: \(HM = \frac{2}{\frac{1}{60} + \frac{1}{40}} = 48 \text{ km/h}\). This scenario reveals the core insight: when the numerator (distance, expenditure, quantity) is fixed and the denominator (time, price per unit, volume) varies, harmonic mean gives the true average rate. We begin by identifying the "constant numerator" pattern, then apply the reciprocal-of-reciprocals formula.

Takeaway: mastery means spotting the constant-numerator pattern and computing HM through reciprocals for any series type. Exam moves: average-speed and average-price questions on the highway scene. Check yourself: HM never exceeds AM - 48 below 50 is the signature, not a coincidence. Students miss it because the trip looks symmetric, when the unequal times show the design: the slow leg owns more of the clock, and only reciprocal averaging weights by time rather than by legs - the same halves-trap from average speed, here solved with the harmonic mean as the general tool.

## DIAGNOSTIC_QUESTION_1
Define Harmonic Mean mathematically for a set of n positive observations \(x_1, x_2, \ldots, x_n\). State the formula and explain in one sentence when it is the appropriate average to use.

## DIAGNOSTIC_ANSWER_1
**Correct Answer:** \(HM = \frac{n}{\sum_{i=1}^n \frac{1}{x_i}}\). It is appropriate when averaging rates or ratios where the numerator is constant (e.g., speed with fixed distance, price per kg with fixed expenditure).  
**What a wrong answer reveals:** If a student writes \(HM = \frac{\sum x_i}{n}\) (arithmetic mean formula) or says "when data has extreme values" (median's use), they confuse HM with other averages. If they say "when values are multiplied" they confuse it with Geometric Mean. This shows they haven't grasped the defining characteristic: reciprocal-of-reciprocals structure and the constant-numerator condition.

## DIAGNOSTIC_QUESTION_2
A car travels 100 km at 50 km/h, then another 100 km at 100 km/h. A student calculates average speed as (50+100)/2 = 75 km/h. Explain why this is incorrect and what the correct average speed is. What conceptual error did the student make?

## DIAGNOSTIC_ANSWER_2
**Correct Answer:** The student used Arithmetic Mean, which assumes equal time at each speed. But here distance is fixed (100 km each), so time varies: \(t_1 = 2 \text{ h}, t_2 = 1 \text{ h}\). Total distance = 200 km, total time = 3 h, average speed = 200/3 ≈ 66.67 km/h. Harmonic Mean: \(HM = \frac{2}{\frac{1}{50} + \frac{1}{100}} = \frac{2}{0.03} = 66.67 \text{ km/h}\). The error: treating speeds as equally weighted when the weighting variable (time) is not equal. The student missed the "constant numerator = distance" condition that mandates HM.  
**What a wrong answer reveals:** If the student says "AM is fine because there are only two speeds" or "HM is for more than 2 values", they don't understand that the choice of average depends on the physical situation (what is constant), not the number of observations.

## DIAGNOSTIC_QUESTION_3
Calculate the Harmonic Mean for the following discrete series:
| Value (x) | 4 | 8 | 12 | 16 |
| Frequency (f) | 2 | 3 | 4 | 1 |
Show all steps including the formula for discrete series.

## DIAGNOSTIC_ANSWER_3
**Correct Answer with Steps:**
1. Formula for discrete series: \(HM = \frac{\sum f}{\sum \frac{f}{x}}\)
2. Compute \(\frac{f}{x}\) for each row:
   - \(x=4, f=2: \frac{2}{4} = 0.5\)
   - \(x=8, f=3: \frac{3}{8} = 0.375\)
   - \(x=12, f=4: \frac{4}{12} = 0.3333\)
   - \(x=16, f=1: \frac{1}{16} = 0.0625\)
3. \(\sum f = 2+3+4+1 = 10\)
4. \(\sum \frac{f}{x} = 0.5 + 0.375 + 0.3333 + 0.0625 = 1.2708\)
5. \(HM = \frac{10}{1.2708} = 7.87\) (approx)
**What a wrong answer reveals:** If a student computes \(\frac{\sum fx}{\sum f}\) (weighted AM) or uses mid-points incorrectly, they are applying the wrong formula. If they forget to sum frequencies in the numerator, they confuse the discrete series formula with the individual series formula \(n/\sum(1/x)\).

## DIAGNOSTIC_QUESTION_4
For any set of positive numbers, the relationship \(HM \le GM \le AM\) holds. Prove this for the two numbers 4 and 16 by calculating all three means. Then explain why HM is the smallest: what property of the reciprocal function causes this?

## DIAGNOSTIC_ANSWER_4
**Correct Answer:**
- \(AM = \frac{4+16}{2} = 10\)
- \(GM = \sqrt{4 \times 16} = \sqrt{64} = 8\)
- \(HM = \frac{2}{\frac{1}{4} + \frac{1}{16}} = \frac{2}{0.3125} = 6.4\)
Thus \(6.4 \le 8 \le 10\) holds.
**Why HM is smallest:** The reciprocal function \(f(x) = 1/x\) is convex for \(x > 0\). By Jensen's inequality, the arithmetic mean of reciprocals is ≥ reciprocal of arithmetic mean: \(\frac{1}{n}\sum \frac{1}{x_i} \ge \frac{1}{\frac{1}{n}\sum x_i}\). Taking reciprocals reverses the inequality: \(HM \le AM\). Since GM is the geometric mean of the same numbers, it lies between them. The convexity of \(1/x\) amplifies the effect of smaller values, pulling HM down.
**What a wrong answer reveals:** If a student says "HM is smaller because it uses reciprocals" without explaining the convexity/inequality mechanism, they have a surface-level understanding. If they claim the order can reverse for some datasets, they don't know the theorem holds for all positive numbers.

## DIAGNOSTIC_QUESTION_5
A factory buys raw material at three different prices: ₹20/kg, ₹25/kg, and ₹30/kg. It spends exactly ₹10,000 at each price. The purchase manager claims the average price paid is ₹25/kg (arithmetic mean). Evaluate this claim. What is the correct average price per kg? Justify which average is appropriate.

## DIAGNOSTIC_ANSWER_5
**Correct Answer:** The claim is incorrect. Since expenditure (₹10,000) is fixed at each price, the quantity purchased varies: \(q_1 = 500 \text{ kg}, q_2 = 400 \text{ kg}, q_3 = 333.33 \text{ kg}\). Total expenditure = ₹30,000, total quantity = 1233.33 kg. Correct average price = Total expenditure / Total quantity = 30000/1233.33 = ₹24.32/kg. Using HM: \(HM = \frac{3}{\frac{1}{20} + \frac{1}{25} + \frac{1}{30}} = \frac{3}{0.12333} = 24.32 \text{ ₹/kg}\). AM (₹25) overstates the average because it gives equal weight to each price, but more kg were bought at lower prices. HM correctly weights by quantity (which is inversely proportional to price when expenditure is fixed).  
**What a wrong answer reveals:** If the student defends AM saying "there are three prices so divide by 3", they ignore the physical context (fixed expenditure). If they use GM, they confuse multiplicative growth with rate averaging. This tests whether they can map the real-world constraint (constant numerator = expenditure) to the correct mathematical tool.

## DIAGNOSTIC_QUESTION_6
Create a real-world problem (Indian context) where Harmonic Mean is the correct average, but a student would likely misuse Arithmetic Mean. Provide the problem statement, the incorrect AM calculation, the correct HM calculation, and a one-line explanation of the "constant numerator" in your problem.

## DIAGNOSTIC_ANSWER_6
**Expected Answer Criteria:** A good problem will have:
- A clear constant numerator (e.g., fixed distance, fixed expenditure, fixed quantity)
- A varying denominator (time, price per unit, concentration)
- Numerical values allowing clean calculation
- Explicit identification of the constant numerator
Example: "A milk vendor buys milk at ₹40/L, ₹50/L, and ₹60/L, spending ₹2000 at each rate. Find the average price per litre." Incorrect AM = ₹50/L. Correct HM = \(3/(\frac{1}{40}+\frac{1}{50}+\frac{1}{60}) = 48.65 \text{ ₹/L}\). Constant numerator: Expenditure (₹2000).  
**What a poor answer reveals:** If the problem uses "average speed for equal time intervals" or "average of percentages", the student doesn't understand the constant-numerator condition. If they can't articulate why AM fails, they lack the conceptual link between physical situation and mathematical structure.

## COMMON_MISCONCEPTION
**Specific Error:** Students believe Harmonic Mean is "just another average" to be used when data has extreme values (like median) or when values are multiplied (like geometric mean). They fail to recognise the **defining structural condition**: HM is the *only* correct average when averaging rates/ratios with a **constant numerator** (fixed distance, fixed expenditure, fixed quantity).  
**Why this error occurs:** Textbooks often present HM as a formula to memorise without emphasising the physical derivation. In Class 10, students learn AM for "average of values", Median for "middle value", Mode for "most frequent" — but HM has no simple verbal hook. The "reciprocal of arithmetic mean of reciprocals" definition is mathematically precise but conceptually opaque. Students then default to AM because it's familiar, or to Median because they hear "HM is for rates" but confuse it with "robust to outliers".  
**Concrete Wrong Answer Example:** Problem: "A train travels 200 km at 80 km/h and 200 km at 100 km/h. Find average speed." Student: "AM = (80+100)/2 = 90 km/h. Since there are extreme values (80 and 100 are far apart), maybe Median = 90 km/h too. HM is for something else." They completely miss that distance is fixed, so time weights are unequal.

## ON_FAILURE
**Targeted Remediation Steps:**
1. **Concrete Physical Derivation:** Draw a distance-time diagram for the round-trip problem. Mark distances (equal), times (unequal). Show that total distance / total time = \(2d / (d/v_1 + d/v_2) = 2 / (1/v_1 + 1/v_2)\). Let the student *see* the reciprocal structure emerge from physics, not from a formula sheet.
2. **Constant Numerator Identification Drill:** Give 5 scenarios (speed, price, density, work rate, fuel efficiency). For each, ask: "What is the numerator? What is the denominator? Which is fixed?" Only proceed to calculation after they correctly identify the fixed numerator in all 5.
3. **Formula Mapping:** Show that for discrete series with fixed expenditure \(E\) at prices \(p_i\), quantity \(q_i = E/p_i\). Total quantity = \(\sum E/p_i\). Average price = Total expenditure / Total quantity = \(nE / \sum(E/p_i) = n / \sum(1/p_i)\). This derives the HM formula from the physical definition of average price, making the formula inevitable rather than arbitrary.
4. **Contrast Table:** Create a 3-column table: Scenario | Fixed Numerator? | Correct Average. Fill: (Equal distance speeds → Yes → HM), (Equal time speeds → No → AM), (Investment returns → Multiplicative → GM), (Outlier-prone data → No fixed numerator → Median).

## PREREQUISITE_NODE_IDS
c11_stat_cbse_05_001, c11_stat_cbse_05_002, c11_stat_cbse_05_004, c11_stat_cbse_05_009, c6_math_ch06_066, c10_math_cbse_03_010, c11_stat_cbse_05_008

## PREREQUISITE_REASONS
c11_stat_cbse_05_001: Understanding what an average represents and why different averages exist is the conceptual foundation for grasping HM's specific purpose.
c11_stat_cbse_05_002: Arithmetic Mean calculation (individual, discrete, continuous) provides the procedural template; HM formulas are structural variants (reciprocals, frequency weighting).
c11_stat_cbse_05_004: Weighted Arithmetic Mean introduces the concept of weighting observations by importance/frequency, directly analogous to how HM weights by the denominator variable (time, quantity).
c11_stat_cbse_05_009: Geometric Mean covers the multiplicative average and the inequality HM ≤ GM ≤ AM; understanding GM helps position HM in the hierarchy of means.
c6_math_ch06_066: Inverse Proportion (Class 6) is the mathematical heart of HM: when numerator is constant, rate and denominator are inversely proportional. This concept must be reactivated.
c10_math_cbse_03_010: Speed-Distance-Time word problems (Class 10) provide the most common HM context. Students must recall how to compute time from speed and distance.
c11_stat_cbse_05_008: Similarly, Harmonic Mean is introduced for rates/speeds where Arithmetic Mean fails; the skewness context from this node sets the stage.  

## FORWARD_NODE_IDS
c11_stat_cbse_05_011
## FORWARD_REASONS
c11_stat_cbse_05_011: Comparative Merits and Limitations of Different Averages requires a complete understanding of HM (calculation, use-cases, merits, limitations) to compare it fairly with AM, Median, Mode, and GM.

## CROSS_SUBJECT_PREREQS
c6_math_ch06_066, c10_math_cbse_03_010, c8_math_ch7_8, c8_math_ch7_9, c8_math_ch10_7, c8_math_ch10_8
## CROSS_SUBJECT_REASONS
c6_math_ch06_066: Inverse Proportion (Class 6) — HM is fundamentally about averaging inversely proportional quantities (rate ∝ 1/time when distance fixed). This is the deepest mathematical prerequisite.
c10_math_cbse_03_010: Speed, Distance, Time word problems (Class 10) — The classic HM application (average speed for equal distances) is built on this algebraic foundation.
c8_math_ch7_8: Direct Proportion applications (Class 8) — Contrasting direct vs inverse proportion clarifies when HM applies (inverse) vs when AM applies (direct).
c8_math_ch7_9: Applications of Direct Proportion — Reinforces the "constant ratio" concept that distinguishes AM scenarios from HM scenarios.
c8_math_ch10_7: Inverse Proportion Definition (Class 8) — Formalises the inverse relationship that HM captures.
c8_math_ch10_8: Inverse Proportion Tabular/Algebraic Representation — Provides the tabular method (varying denominator, constant numerator) that mirrors HM calculation tables.

## CHAIN_DESCRIPTION
c11_stat_cbse_05_001 -> c11_stat_cbse_05_010 -> c11_stat_cbse_05_011

## THIS_FORMULA
Individual Series: \(HM = \frac{n}{\sum_{i=1}^n \frac{1}{x_i}}\); Discrete Series: \(HM = \frac{\sum f}{\sum \frac{f}{x}}\); Continuous Series: \(HM = \frac{\sum f}{\sum \frac{f}{m}}\) where \(m\) = mid-point of class interval; Weighted HM: \(HM_w = \frac{\sum w}{\sum \frac{w}{x}}\)

## FORMULA_VARIABLES
\(n\) = number of observations; \(x_i\) = i-th observation (positive); \(f\) = frequency of each value; \(m\) = mid-point of class interval; \(w\) = weight assigned to each observation; \(\sum\) = summation over all observations/classes

## FORMULA_UNITS
HM has the same units as the original observations (e.g., km/h for speed, ₹/kg for price, kg/m³ for density). The reciprocals have inverse units (h/km, kg/₹, m³/kg) which cancel in the final division.

## COMPUTATION_TYPE
statistical

## CROSS_SUBJECT
c6_math_ch06_066 | Inverse proportion is the mathematical structure underlying HM: when distance is fixed, speed and time are inversely proportional. HM averages the rates by correctly weighting the inversely proportional variable (time).
c10_math_cbse_03_010 | Speed-distance-time problems provide the canonical HM application. The formula \( \text{average speed} = \frac{\text{total distance}}{\text{total time}} \) directly yields the HM formula when distances are equal.
c8_math_ch10_7 | Inverse proportion definition and identification (Class 8) trains students to recognise the "constant product" (numerator × denominator = constant) pattern that signals HM usage.
c8_math_ch10_8 | Tabular representation of inverse proportion (Class 8) mirrors the HM calculation table: columns for rate, denominator, and reciprocal computations.

## PREREQ_CONCEPT
Inverse proportionality: When two variables have a constant product (e.g., speed × time = distance), averaging the first variable while the second varies requires Harmonic Mean.

## PREREQ_BEFORE
The student must be able to: (1) Identify inverse proportion relationships in word problems, (2) Calculate Arithmetic Mean for discrete series using \(\sum fx / \sum f\), (3) Compute reciprocals of fractions and decimals fluently.

## PREREQ_STUCK
If stuck, revisit **Inverse Proportion (c6_math_ch06_066 and c8_math_ch10_7)** — specifically, practice identifying which quantity is fixed (numerator) and which varies (denominator) in rate problems. Then review **Weighted Arithmetic Mean (c11_stat_cbse_05_004)** to understand frequency weighting, which HM adapts by weighting with reciprocals.

## WORKED_EXAMPLE_1
PROBLEM: A truck driver travels from Mumbai to Pune (150 km) at 50 km/h and returns at 60 km/h. Find the average speed for the entire journey.  
STEPS:
- Step 1: Identify the physical situation — equal distances (150 km each way), different speeds. The numerator (distance) is constant, so Harmonic Mean is required.
- Step 2: Recall the HM formula for two values: \(HM = \frac{2}{\frac{1}{v_1} + \frac{1}{v_2}}\) or derive from definition: Average speed = Total Distance / Total Time.
- Step 3: Compute time for each leg: \(t_1 = \frac{150}{50} = 3 \text{ hours}\), \(t_2 = \frac{150}{60} = 2.5 \text{ hours}\).
- Step 4: Total distance = 300 km, Total time = 5.5 hours. Average speed = \(300 / 5.5 = 54.545 \text{ km/h}\).
- Step 5: Verify using HM formula directly: \(HM = \frac{2}{\frac{1}{50} + \frac{1}{60}} = \frac{2}{0.02 + 0.01667} = \frac{2}{0.03667} = 54.545 \text{ km/h}\). Matches.
- Step 6: Interpret — The average speed (54.55 km/h) is less than the arithmetic mean (55 km/h) because more time was spent at the lower speed. HM correctly weights by time.
REASONING: The harmonic mean emerges naturally from the definition of average speed (total distance/total time) when distances are equal. The reciprocal structure accounts for the inverse relationship between speed and time. Using AM would incorrectly assume equal time at each speed.
ANSWER: 54.55 km/h (approx)

## WORKED_EXAMPLE_2
PROBLEM: A household buys electricity at three different rates during a year: ₹4/unit for 3 months, ₹5/unit for 4 months, and ₹6/unit for 5 months. The monthly consumption (in units) varies such that the monthly bill is exactly ₹2000 each month. Find the average price per unit for the year.  
STEPS:
- Step 1: Identify the constant numerator — monthly expenditure (₹2000) is fixed. Price per unit varies. Quantity consumed varies inversely with price. This is an HM situation.
- Step 2: Since expenditure is fixed per month, but months have different rates, we have 12 observations (monthly prices) with weights = number of months. Use Weighted HM: \(HM_w = \frac{\sum w}{\sum \frac{w}{x}}\).
- Step 3: Construct table:
  | Rate (x) | Months (w) | w/x |
  | 4 | 3 | 3/4 = 0.75 |
  | 5 | 4 | 4/5 = 0.8 |
  | 6 | 5 | 5/6 ≈ 0.8333 |
- Step 4: \(\sum w = 3+4+5 = 12\), \(\sum \frac{w}{x} = 0.75 + 0.8 + 0.8333 = 2.3833\).
- Step 5: \(HM_w = \frac{12}{2.3833} = 5.035 \text{ ₹/unit}\).
- Step 6: Verify via total expenditure/total units: Total expenditure = ₹2000 × 12 = ₹24,000. Units at ₹4: 2000/4 = 500/month × 3 = 1500. At ₹5: 400/month × 4 = 1600. At ₹6: 333.33/month × 5 = 1666.67. Total units = 4766.67. Average price = 24000/4766.67 = 5.035 ₹/unit. Matches.
REASONING: Weighted HM handles the case where the constant-numerator condition holds within subgroups (each month) but the rate changes across subgroups with different durations (weights). The weight is the number of months at each rate.
ANSWER: ₹5.035 per unit (approx)

## WORKED_EXAMPLE_3
PROBLEM: The following data shows the speed (km/h) of a vehicle over different distance intervals. Calculate the average speed for the entire journey.
| Distance Interval (km) | 0-50 | 50-100 | 100-150 | 150-200 |
| Speed (km/h) | 40 | 50 | 60 | 80 |
STEPS:
- Step 1: Recognise this is a continuous series with equal class intervals (50 km each). The distance per interval is constant (50 km), so HM is appropriate. Speed is the rate, distance is the fixed numerator.
- Step 2: For continuous series with equal class intervals, we can treat each interval as one observation with frequency = 1 (since distance is equal). Or use the continuous series formula: \(HM = \frac{\sum f}{\sum \frac{f}{m}}\) where \(m\) = speed (the rate). Here \(f = 1\) for each class (equal distance).
- Step 3: Compute reciprocals of speeds: \(1/40 = 0.025\), \(1/50 = 0.02\), \(1/60 = 0.01667\), \(1/80 = 0.0125\).
- Step 4: \(\sum f = 4\), \(\sum \frac{f}{m} = 0.025 + 0.02 + 0.01667 + 0.0125 = 0.07417\).
- Step 5: \(HM = \frac{4}{0.07417} = 53.93 \text{ km/h}\).
- Step 6: Cross-check using total distance/total time: Each interval = 50 km. Times: \(50/40=1.25\), \(50/50=1\), \(50/60=0.8333\), \(50/80=0.625\). Total time = 3.7083 h. Total distance = 200 km. Average speed = \(200/3.7083 = 53.93 \text{ km/h}\). Matches.
- Step 7: Compare with AM = (40+50+60+80)/4 = 57.5 km/h. AM overestimates because it ignores that more time is spent at lower speeds.
REASONING: This problem combines continuous series format (class intervals) with the HM concept. The key insight is that equal distance intervals mean equal "weight" for each speed in the HM calculation, even though the data is presented as a grouped frequency distribution. The mid-point of each class is the speed itself (not a midpoint of speeds).
ANSWER: 53.93 km/h (approx)

## COMPETENCY_QUESTION_1
QUESTION: A car manufacturer tests fuel efficiency of a new model under three driving conditions: City (12 km/L), Highway (18 km/L), and Mixed (15 km/L). The test protocol requires driving exactly 100 km in each condition. The marketing team claims the average fuel efficiency is 15 km/L (arithmetic mean). As a statistician, evaluate this claim. Calculate the correct average. Explain why the marketing team's figure is misleading for a consumer who drives equal distances in each condition.  
COMPETENCY: Translating real-world situations to mathematical expressions; Comparing and justifying choice of average  
STEPS:
- Step 1: Identify the rate (km/L) and the fixed numerator (distance = 100 km per condition).
- Step 2: Recognise that fuel consumed varies inversely with efficiency: City = 100/12 L, Highway = 100/18 L, Mixed = 100/15 L.
- Step 3: Total distance = 300 km. Total fuel = 100(1/12 + 1/18 + 1/15) = 100(0.08333 + 0.05556 + 0.06667) = 20.556 L.
- Step 4: Correct average efficiency = Total distance / Total fuel = 300 / 20.556 = 14.59 km/L.
- Step 5: Alternatively, HM = \(3 / (1/12 + 1/18 + 1/15) = 14.59 \text{ km/L}\).
- Step 6: The marketing claim (15 km/L) overstates efficiency by 0.41 km/L (2.8% error). For a consumer driving 15,000 km/year, this means ~42 extra litres of fuel costing ~₹4000/year (at ₹95/L).
ANSWER: The marketing claim is incorrect. The true average fuel efficiency for equal-distance driving is 14.59 km/L (Harmonic Mean), not 15 km/L (Arithmetic Mean). AM is misleading because it assumes equal fuel consumption across conditions, but the test protocol fixes distance, not fuel. HM correctly weights by fuel consumed (the denominator).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A factory produces three products A, B, C. The per-unit costs are ₹200, ₹300, ₹500 respectively. The factory spends exactly ₹1,00,000 on each product line per month. The cost accountant computes the average per-unit cost as ₹333.33 (AM). The production manager argues the true average cost per unit across all production is lower. Who is correct? Calculate the correct average. Then, if the factory changes policy to produce equal *quantities* (1000 units each) instead of equal *expenditure*, what happens to the average cost? Which average applies in the new policy?  
COMPETENCY: Error identification and correction; Applying multiple concepts (HM vs AM) to policy scenarios  
STEPS:
- Step 1: Current policy — fixed expenditure (₹1,00,000) per product. Numerator (cost) fixed, denominator (units) varies. This is HM.
- Step 2: Units produced: A = 100000/200 = 500, B = 100000/300 = 333.33, C = 100000/500 = 200. Total units = 1033.33. Total cost = ₹3,00,000.
- Step 3: Correct average cost = Total cost / Total units = 300000/1033.33 = ₹290.32/unit. HM = \(3 / (1/200 + 1/300 + 1/500) = 290.32\). Production manager is correct; AM (₹333.33) overstates by ₹43.
- Step 4: New policy — equal quantities (1000 units each). Now denominator (units) is fixed, numerator (cost) varies. This is AM situation.
- Step 5: Total cost = 1000×200 + 1000×300 + 1000×500 = ₹10,00,000. Total units = 3000. Average cost = 1000000/3000 = ₹333.33/unit = AM.
- Step 6: The average cost increases from ₹290.32 to ₹333.33 because equal quantities give more weight to the expensive product C (which was underweighted under equal expenditure).
ANSWER: Production manager is correct. Current policy (equal expenditure) → HM = ₹290.32/unit. New policy (equal quantities) → AM = ₹333.33/unit. The switch to equal quantities raises the average cost because it removes the natural weighting toward cheaper products that occurs when expenditure is fixed.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The Harmonic Mean (HM) is a measure of central tendency defined as the reciprocal of the arithmetic mean of the reciprocals of the given ______.

## DIAGNOSTIC_ANSWER_7
observations

**A wrong answer ("values") reveals the student has blurred the object - the reciprocals are of the given observations, each one inverted.** The word is what the blank grades. Recall the definition's object before filling, and give the word exactly. Verify against the lesson's own wording before you commit.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you ______ from Delhi to Jaipur at 60 km/h and return at 40 km/h.

## DIAGNOSTIC_ANSWER_8
travel

The word is travel - what you do from Delhi to Jaipur. A wrong answer ("drive") reveals the student has paraphrased the verb. Recall the scene's opening before filling, and give the word exactly. Verify against the lesson's own wording before you commit. The blank grades the exact term, not a synonym.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student must be able to: (1) Identify real-world situations requiring harmonic mean (rates with constant numerator), (2) Calculate HM for individual, discrete, and continuous series using the correct formula, and (3) Justify why HM is preferred over AM or GM in specific contexts like average speed, average price per unit, or average.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: ______ you travel from Delhi to Jaipur at 60 km/h and return at 40 km/h.

## DIAGNOSTIC_ANSWER_10
Imagine

The word is Imagine - the walkthrough's opening cue. A wrong answer ("Suppose") reveals the student has paraphrased where the lesson dictated. Recall the sentence's first word before filling, and give the word exactly. Verify against the lesson's own wording before you commit. The blank grades the exact term, not a synonym.
