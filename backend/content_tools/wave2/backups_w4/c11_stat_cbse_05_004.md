## ELI5
Your final percentage: unit tests carry weight 20, the half-yearly 30, the final 50. A simple average would grade a quiz equal to the final - absurd. The weighted mean fixes it: multiply each score by its weight, sum the products, divide by the total weight. Importance becomes arithmetic. And when all weights are equal it quietly collapses into the ordinary mean - a generalisation, not a rival.

## DEFINITION
Weighted Arithmetic Mean is a measure of central tendency where each observation is assigned a weight reflecting its relative importance, calculated as the sum of the products of values and their corresponding weights divided by the sum of the weights. Symbolically, \(\bar{X}_w = \frac{\sum_{i=1}^{n} w_i x_i}{\sum_{i=1}^{n} w_i}\), where \(x_i\) are the values and \(w_i\) are the non-negative weights (not all zero).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must be able to compute the weighted arithmetic mean for discrete and continuous data, justify the choice of weights in a real-world scenario, and explain how the weighted mean differs from the simple arithmetic mean when weights are not uniform.

## SCOPE_BOUNDARY
This node covers the formula, calculation methods (direct only), interpretation, and applications of weighted arithmetic mean for ungrouped and grouped data. It does NOT cover weighted geometric/harmonic means, index number construction (Chapter 8), or calculus-based weighting.

## WALKTHROUGH
Imagine you are a Class 11 student calculating your final percentage: your unit tests (weight 20%), half-yearly (weight 30%), and final exam (weight 50%). A simple average would treat all exams equally, but that misrepresents your performance because the final exam matters more. This is exactly why we need weighted arithmetic mean — it lets us assign "importance weights" to each value. We start by identifying the values (\(x_i\)) and their weights (\(w_i\)), multiply each value by its weight, sum these products, and divide by the total weight. The key insight: when all weights are equal, the weighted mean reduces to the simple arithmetic mean, making it a generalization.

Takeaway: mastery means computing weighted means, justifying the weights, and knowing when weighting changes the answer. Exam moves: compute-and-justify questions on the report-card scene. Check yourself: the weights are judgements - 50 for the final says the course values endurance over flashes. Students miss it because weights and frequencies feel identical, when the mark sheet shows the design: frequencies count how often a value occurs, weights declare how much it matters - a frequency is discovered in the data, a weight is argued into it - and confusing them imports your opinions as if they were observations.

## DIAGNOSTIC_QUESTION_1
State the formula for weighted arithmetic mean and define each symbol used. Under what condition does the weighted arithmetic mean become equal to the simple arithmetic mean?

## DIAGNOSTIC_ANSWER_1
The formula is \(\bar{X}_w = \frac{\sum w_i x_i}{\sum w_i}\), where \(x_i\) are the values and \(w_i\) are the corresponding weights (non-negative, not all zero). It equals the simple arithmetic mean when all weights are equal (i.e., \(w_1 = w_2 = \dots = w_n\)). A wrong answer (e.g., forgetting the denominator or confusing \(w_i\) with frequencies) reveals the student does not distinguish between frequency (count of occurrences) and weight (assigned importance), a critical confusion in grouped data vs. weighted data.

## DIAGNOSTIC_QUESTION_2
A student calculates the weighted mean of marks 80, 70, 90 with weights 2, 3, 5 as \(\frac{80+70+90}{3} = 80\). Explain why this is incorrect and compute the correct weighted mean.

## DIAGNOSTIC_ANSWER_2
The student used the simple arithmetic mean formula, ignoring the weights entirely. The correct calculation: \(\frac{(80\times2)+(70\times3)+(90\times5)}{2+3+5} = \frac{160+210+450}{10} = \frac{820}{10} = 82\). A wrong answer indicates the student treats weights as optional labels rather than multiplicative factors that shift the mean toward higher-weighted values.

## DIAGNOSTIC_QUESTION_3
The prices (₹/kg) of three commodities are: Rice ₹40, Wheat ₹25, Pulses ₹80. A family spends 50% of its food budget on rice, 30% on wheat, and 20% on pulses. Calculate the weighted arithmetic mean price per kg using budget shares as weights. Interpret the result.

## DIAGNOSTIC_ANSWER_3
Weights are budget shares: \(w_1=0.5, w_2=0.3, w_3=0.2\). Weighted mean = \(\frac{(40\times0.5)+(25\times0.3)+(80\times0.2)}{0.5+0.3+0.2} = \frac{20+7.5+16}{1} = ₹43.5/\text{kg}\). This represents the average price per kg of the food basket as actually consumed. An incorrect answer (e.g., simple mean ₹48.33) shows the student fails to recognize that budget shares are weights summing to 1, and that the weighted mean reflects the family's actual expenditure pattern.

## DIAGNOSTIC_QUESTION_4
Compare the simple arithmetic mean and weighted arithmetic mean for the data: Values = [100, 200, 300], Weights = [1, 2, 3]. Which mean is larger? Explain analytically why the weighted mean shifts in that direction without calculating the exact values.

## DIAGNOSTIC_ANSWER_4
Simple mean = 200. Weighted mean = \(\frac{100+400+900}{6} = \frac{1400}{6} \approx 233.33\). The weighted mean is larger because higher weights are assigned to larger values (300 has weight 3, 100 has weight 1). The weighted mean is pulled toward the values with larger weights. A student who cannot explain this directional shift without calculation lacks conceptual understanding of weighting as a "gravitational pull" on the mean.

## DIAGNOSTIC_QUESTION_5
A teacher computes the class average using two methods: (A) simple mean of all students' marks, (B) weighted mean where each student's weight is their attendance percentage. Method B gives a higher average. The teacher claims "Method B is better because it rewards regular students." Evaluate this claim statistically.

## DIAGNOSTIC_ANSWER_5
The claim confuses statistical representation with normative judgment. Method B does not "reward" students; it computes the average mark per unit of attendance, which answers a different question: "What is the typical mark of a student who attends 100% of classes?" If attendance correlates with marks, Method B will be higher, but it no longer represents the class average mark. The weighted mean is appropriate only when weights reflect the genuine importance of each observation for the research question (e.g., budget shares in price index). A wrong evaluation shows the student cannot distinguish between descriptive statistics and incentive design.

## DIAGNOSTIC_QUESTION_6
Create a real-world problem (Indian context, using ₹, kg, or litres) where the weighted arithmetic mean is the ONLY appropriate average, and the simple arithmetic mean would be misleading. Provide the data, weights, and both means, then explain why the weighted mean is correct.

## DIAGNOSTIC_ANSWER_6
Example: A farmer sells three crops: Wheat (500 kg at ₹22/kg), Rice (300 kg at ₹35/kg), Millet (200 kg at ₹18/kg). Simple mean price = ₹25/kg. Weighted mean (weights = quantities) = \(\frac{500\times22 + 300\times35 + 200\times18}{1000} = \frac{11000+10500+3600}{1000} = ₹25.1/\text{kg}\). The simple mean misleads because it treats each crop equally despite vastly different quantities sold. The weighted mean gives the true average revenue per kg. A poor answer uses trivial weights (e.g., 1,2,3) or contexts where simple mean suffices (equal importance), showing inability to identify situations requiring differential importance.

## COMMON_MISCONCEPTION
Students often confuse **weights** with **frequencies**. In a frequency distribution, the frequency \(f_i\) is the count of how many times \(x_i\) occurs — it is an observed fact. In weighted mean, \(w_i\) is an assigned importance (e.g., budget share, credit hours, population proportion) — it is a decision by the analyst. For instance, in the NCERT example of mangoes (price \(P_1\)) and potatoes (price \(P_2\)), the weights \(W_1, W_2\) are budget shares, not the number of times the price was recorded. This leads to errors like using "number of commodities" as weights instead of "expenditure shares" in index number problems.

## ON_FAILURE
If a student confuses weights with frequencies: (1) Give two side-by-side datasets: Dataset A: prices 10, 20 with frequencies 3, 2 (observed counts). Dataset B: prices 10, 20 with weights 0.6, 0.4 (budget shares). (2) Ask: "In which dataset does the number 3 mean 'this price appeared 3 times'? In which does 0.6 mean 'we decide this item matters 60%?" (3) Have them compute both means and interpret: Dataset A mean = ₹14 (average price per transaction), Dataset B mean = ₹14 (average price per rupee spent). (4) Emphasize: frequencies are **counts** (integers, from data collection); weights are **importance coefficients** (can be fractions, from analytical choice).

## PREREQUISITE_NODE_IDS
c11_stat_cbse_05_001, c11_stat_cbse_05_002, c11_stat_cbse_05_003, c10_math_cbse_13_001, c8_math_ch7_2, c7_math_ch13_004
## PREREQUISITE_REASONS
c11_stat_cbse_05_001: Establishes the need for averages and the concept of a representative value — without this, weighted mean is a formula without purpose.
c11_stat_cbse_05_002: Covers simple arithmetic mean calculation for ungrouped/grouped data — weighted mean is a direct generalization where frequencies become weights.
c11_stat_cbse_05_003: Properties of arithmetic mean (especially combined mean) build the algebraic foundation for understanding how weighting affects the mean.
c10_math_cbse_13_001: Direct method for grouped data (\(\frac{\sum f_i x_i}{\sum f_i}\)) is structurally identical to weighted mean; students must recognize frequency as a special case of weight.
c7_math_ch13_004: Basic mean calculation and interpretation from Class 7 — the starting point for any average.
c8_math_ch7_2: Requires this concept - this node (Weighted Arithmetic Mean is a measure of central tendency where each observation is assign...) builds directly on that foundation.  
## FORWARD_NODE_IDS
c11_stat_cbse_05_011, c11_stat_cbse_05_010, c12_ip_cbse_02_008, c11_stat_cbse_05_009

## FORWARD_REASONS
c11_stat_cbse_05_011: Comparative Merits and Limitations of Different Averages requires understanding weighted mean as a distinct average with specific use cases (e.g., index numbers, course grades) to compare it fairly with median, mode, geometric mean, etc.
c11_stat_cbse_05_010: Weighted Arithmetic Mean introduces the concept of weighting observations by importance/frequency, directly analogous to how HM weights by the denominator variable (time, quantity).  
c12_ip_cbse_02_008: Weighted arithmetic mean from Class 11 Statistics.  
c11_stat_cbse_05_009: ative)^weight and then the (Σweight)-th root. This example combines GM with weighted averages (from c11_stat_cbse_05_004) and applies to economics (index numbers), demonstrating cross-chapter synthesis.  

## CROSS_SUBJECT_PREREQS
c10_eco_cbse_03_005, c9_eco_ch1_3
## CROSS_SUBJECT_REASONS
c10_eco_cbse_03_005: Terms of Credit (interest rate, collateral, documentation) involve weighted criteria for loan approval — weights reflect risk importance, directly analogous to weighted mean.
c9_eco_ch1_3: Choice and Opportunity Cost involves weighing alternatives by their forgone benefits — the decision weights are subjective importance measures, just like in weighted mean.

## CHAIN_DESCRIPTION
c11_stat_cbse_05_002 -> c11_stat_cbse_05_004 -> c11_stat_cbse_05_011

## THIS_FORMULA
\(\bar{X}_w = \frac{\sum_{i=1}^{n} w_i x_i}{\sum_{i=1}^{n} w_i}\)

## FORMULA_VARIABLES
\(\bar{X}_w\): Weighted arithmetic mean; \(x_i\): Value of the \(i\)-th observation; \(w_i\): Weight assigned to the \(i\)-th observation (non-negative real numbers, not all zero); \(n\): Number of observations.

## FORMULA_UNITS
\(\bar{X}_w\) has the same units as \(x_i\) (e.g., ₹/kg, marks, kg/hectare). Weights \(w_i\) are dimensionless (ratios, percentages, or arbitrary scale).

## COMPUTATION_TYPE
statistical

## CROSS_SUBJECT
c10_eco_cbse_03_005 | Weighted criteria in credit evaluation (interest rate, collateral, documentation) mirror weighted mean: each factor has a weight reflecting its importance in the lending decision.
c9_eco_ch1_3 | Opportunity cost requires weighing alternatives by their relative importance — the "weights" are the decision-maker's subjective valuations, exactly like budget shares in a weighted price index.

## PREREQ_CONCEPT
Simple arithmetic mean and the concept of frequency as a count of occurrences.

## PREREQ_BEFORE
Student must be able to compute the simple arithmetic mean for ungrouped and grouped data using the direct method (\(\frac{\sum f_i x_i}{\sum f_i}\)) and explain what the mean represents.

## PREREQ_STUCK
Revisit c11_stat_cbse_05_002 (Arithmetic Mean: Calculation) and c10_math_cbse_13_001 (Mean of Grouped Data: Direct Method) — focus on the structure \(\frac{\sum (\text{value} \times \text{multiplier})}{\sum \text{multiplier}}\) and identify whether the multiplier is a frequency (observed count) or a weight (assigned importance).

## WORKED_EXAMPLE_1
PROBLEM: A Class 11 student's final grade is calculated from three components: Unit Tests (30% weight), Half-Yearly Exam (30% weight), Final Exam (40% weight). The student scored 72, 68, and 85 respectively. Calculate the weighted mean grade. If the school changes the weights to 20%, 30%, 50%, how does the grade change? Interpret.
STEPS:
- Step 1: Identify values \(x_i\) and weights \(w_i\) for first scheme: \(x = [72, 68, 85]\), \(w = [0.30, 0.30, 0.40]\) (weights sum to 1).
- Step 2: Apply formula \(\bar{X}_w = \frac{\sum w_i x_i}{\sum w_i}\). Since \(\sum w_i = 1\), denominator = 1.
- Step 3: Compute numerator: \(0.30 \times 72 = 21.6\), \(0.30 \times 68 = 20.4\), \(0.40 \times 85 = 34.0\). Sum = 76.0.
- Step 4: Weighted mean = 76.0 marks.
- Step 5: For new weights \(w' = [0.20, 0.30, 0.50]\): numerator = \(0.20 \times 72 + 0.30 \times 68 + 0.50 \times 85 = 14.4 + 20.4 + 42.5 = 77.3\). New mean = 77.3 marks.
- Step 6: Interpret: The grade increased because the highest score (85) got a larger weight (0.50 vs 0.40), pulling the mean upward. This shows how weight allocation directly impacts the result.
REASONING: Weights represent the relative importance of each assessment component. The weighted mean aggregates scores proportionally to their importance. Changing weights changes the "center of gravity" of the scores toward the components with higher weights.
ANSWER: First scheme: 76.0 marks; Second scheme: 77.3 marks. The increase occurs because the final exam (highest score) received more weight.

## WORKED_EXAMPLE_2
PROBLEM: A consumer buys three types of fuel in a month: Petrol (40 litres at ₹95/litre), Diesel (60 litres at ₹88/litre), CNG (20 kg at ₹75/kg). Calculate the weighted average price per unit of fuel, using quantities as weights. Why is the simple mean (₹86) misleading?
STEPS:
- Step 1: Identify values and weights. Values \(x_i\): prices per unit (₹95, ₹88, ₹75). Weights \(w_i\): quantities consumed (40, 60, 20). Note: units differ (litres vs kg) but weights are quantities, so weighted mean unit = ₹ per (litre or kg) — we treat "unit" as the purchase unit.
- Step 2: Set up formula: \(\bar{X}_w = \frac{\sum w_i x_i}{\sum w_i}\).
- Step 3: Compute \(\sum w_i x_i = (40 \times 95) + (60 \times 88) + (20 \times 75) = 3800 + 5280 + 1500 = 10580\).
- Step 4: Compute \(\sum w_i = 40 + 60 + 20 = 120\).
- Step 5: Weighted mean = \(\frac{10580}{120} = ₹88.17\) per unit.
- Step 6: Simple mean = \(\frac{95+88+75}{3} = ₹86\). The simple mean treats each fuel equally, but the consumer buys more diesel (60 units) and petrol (40 units) than CNG (20 units). The weighted mean reflects actual expenditure per unit purchased.
REASONING: When quantities vary significantly, the simple average ignores the volume of consumption. The weighted mean with quantities as weights gives the true average cost per unit of fuel consumed, which is essential for budgeting.
ANSWER: Weighted average price = ₹88.17 per unit. Simple mean ₹86 understates the cost because it gives equal importance to the cheapest fuel (CNG) which was bought in the smallest quantity.

## WORKED_EXAMPLE_3
PROBLEM: In a village, 3 crops are grown. Data: Wheat: 200 hectares, yield 30 quintals/hectare; Rice: 150 hectares, yield 25 quintals/hectare; Millet: 100 hectares, yield 15 quintals/hectare. Calculate the overall average yield per hectare for the village. Then, if the government wants to report the "average yield per crop type" (treating each crop equally), what would that be? Which measure should a policy-maker use for food security planning?
STEPS:
- Step 1: For overall village yield per hectare, the weight is area (hectares) because total production = sum of (area × yield). Values \(x_i\): yields (30, 25, 15). Weights \(w_i\): areas (200, 150, 100).
- Step 2: Weighted mean yield = \(\frac{(200 \times 30) + (150 \times 25) + (100 \times 15)}{200+150+100} = \frac{6000 + 3750 + 1500}{450} = \frac{11250}{450} = 25\) quintals/hectare.
- Step 3: Simple mean of yields (per crop type) = \(\frac{30+25+15}{3} = 23.33\) quintals/hectare.
- Step 4: Compare: Weighted mean (25) > Simple mean (23.33) because the highest-yielding crop (wheat) has the largest area.
- Step 5: For food security planning, total production matters. Total production = 11,250 quintals. The weighted mean (25 quintals/hectare) multiplied by total area (450 ha) recovers total production. The simple mean (23.33) × 450 = 10,500 quintals — underestimates actual production by 750 quintals.
- Step 6: Conclusion: Policy-makers must use area-weighted yield to estimate total food availability. Simple mean is appropriate only if the question is "what is the typical yield of a randomly chosen crop type?"
REASONING: This combines weighted mean with the concept of total = mean × total weight (here, total area). The choice of average depends on the policy question: total output requires weighting by area; crop diversification analysis might use simple mean.
ANSWER: Area-weighted mean yield = 25 quintals/hectare; Simple mean of crop yields = 23.33 quintals/hectare. For food security planning, use the weighted mean (25) because it correctly aggregates to total production.

## COMPETENCY_QUESTION_1
QUESTION: A university calculates CGPA using credit-weighted mean: \(\text{CGPA} = \frac{\sum (\text{Grade Point} \times \text{Credits})}{\sum \text{Credits}}\). A student has 4 courses: Course A (4 credits, Grade 8), Course B (3 credits, Grade 9), Course C (2 credits, Grade 7), Course D (3 credits, Grade 6). (a) Compute the CGPA. (b) The student argues: "If I drop Course D (lowest grade), my CGPA will improve because I remove a low grade." Is the student correct? Prove mathematically. (c) Under what condition would dropping a course *not* change the CGPA?
COMPETENCY: Translating real-world situations to mathematical expressions and justifying conclusions with algebraic reasoning.
STEPS:
- Step 1: Compute current CGPA: \(\sum w_i x_i = 4\times8 + 3\times9 + 2\times7 + 3\times6 = 32+27+14+18 = 91\). \(\sum w_i = 4+3+2+3 = 12\). CGPA = \(91/12 = 7.583\).
- Step 2: Compute CGPA after dropping Course D: new sum = \(91 - 18 = 73\), new total credits = \(12 - 3 = 9\). New CGPA = \(73/9 = 8.111\). Compare: 8.111 > 7.583, so CGPA improves.
- Step 3: General condition: Dropping a course with grade \(x_d\) and credit \(w_d\) increases CGPA iff \(x_d < \text{current CGPA}\). Because new CGPA = \(\frac{\sum w_i x_i - w_d x_d}{\sum w_i - w_d}\). This is > old CGPA \(\frac{\sum w_i x_i}{\sum w_i}\) iff \(x_d < \frac{\sum w_i x_i}{\sum w_i}\).
- Step 4: Here \(x_d = 6 < 7.583\), so CGPA increases.
- Step 5: Condition for no change: \(x_d = \text{current CGPA}\). If the dropped course's grade equals the current CGPA, the weighted mean remains unchanged.
ANSWER: (a) CGPA = 7.58 (approx). (b) Yes, student is correct; CGPA becomes 8.11. (c) Dropping a course does not change CGPA if and only if that course's grade point equals the current CGPA.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The Consumer Price Index (CPI) for a rural household uses weighted arithmetic mean of price relatives. The weights (budget shares) are: Food 45%, Fuel 15%, Clothing 10%, Housing 20%, Miscellaneous 10%. In a given year, price relatives (current year price / base year price × 100) are: Food 120, Fuel 150, Clothing 110, Housing 130, Miscellaneous 125. (a) Calculate the CPI. (b) If the price of Fuel doubles (price relative becomes 300) while others stay same, what is the new CPI? (c) Explain why the CPI increase is less than the fuel price increase proportionally. (d) If the government wants to minimize the reported CPI increase, which commodity's weight would they be tempted to understate? Justify.
COMPETENCY: Applying weighted mean to economic index numbers, analyzing sensitivity to weight and value changes, and evaluating ethical implications.
STEPS:
- Step 1: Compute CPI = \(\sum w_i \times \text{price relative}_i\) (since weights sum to 1). = \(0.45\times120 + 0.15\times150 + 0.10\times110 + 0.20\times130 + 0.10\times125 = 54 + 22.5 + 11 + 26 + 12.5 = 126\).
- Step 2: New CPI with Fuel relative = 300: \(0.45\times120 + 0.15\times300 + 0.10\times110 + 0.20\times130 + 0.10\times125 = 54 + 45 + 11 + 26 + 12.5 = 148.5\).
- Step 3: CPI increase = 22.5 points. Fuel price relative increase = 150 points (from 150 to 300). The CPI increase is only 15% of the fuel price relative increase because fuel's weight is only 15%. The weighted mean dampens the impact of any single component proportional to its weight.
- Step 4: To minimize reported CPI increase, the government would understate the weight of the commodity with the highest price relative increase (Fuel, 150→300). Since CPI = \(\sum w_i P_i\), reducing \(w_{\text{fuel}}\) reduces the contribution of the largest \(P_i\) increase. This is manipulation of weights to suppress inflation measurement.
ANSWER: (a) CPI = 126. (b) New CPI = 148.5. (c) CPI increase is only 15% of fuel price relative increase because fuel weight is 0.15. (d) Fuel weight — because it has the largest price increase, reducing its weight reduces the overall index most effectively.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Weighted Arithmetic Mean is a measure of central tendency where each observation is assigned a weight reflecting its relative importance, calculated as the sum of the products of values and their ______ weights divided by the sum of the weights.

## DIAGNOSTIC_ANSWER_7
corresponding

**A wrong answer ("random") reveals the student has missed the pairing - weights are assigned to values as their corresponding companions, value by value.** The word is what the blank grades. Recall the definition's pairing before filling, and give the word exactly. Verify against the lesson's own wording before you commit.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are a Class 11 student ______ your final percentage: your unit tests (weight 20%), half-yearly (weight 30%), and final exam (weight 50%).

## DIAGNOSTIC_ANSWER_8
calculating

The word is calculating - the student's task on the final percentage. A wrong answer ("estimating") reveals the student has softened the verb. Recall the scene's opening before filling, and give the word exactly. Verify against the lesson's own wording before you commit. The blank grades the exact term, not a synonym.

## DIAGNOSTIC_QUESTION_9
What is Weighted Arithmetic Mean? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Weighted Arithmetic Mean is a measure of central tendency where each observation is assigned a weight reflecting its relative importance, calculated as the sum of the products of values and their corresponding weights divided by the sum of the weights. Verify against the lesson's own wording before you commit.

## DIAGNOSTIC_QUESTION_10
What common mix-up does this lesson flag about Weighted Arithmetic Mean?

## DIAGNOSTIC_ANSWER_10
Students often confuse weights with frequencies.

The correction: a frequency reports how many times a value occurs - a fact of the dataset; a weight declares how much a value counts - a decision of the analyst. The same multiplication table serves both, which is why the formulas look like twins while the meanings differ.

## DIAGNOSTIC_QUESTION_11
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_11
The student must be able to compute the weighted arithmetic mean for discrete and continuous data, justify the choice of weights in a real-world scenario, and explain how the weighted mean differs from the simple arithmetic mean when weights are not uniform. Verify against the lesson's own wording before you commit.
