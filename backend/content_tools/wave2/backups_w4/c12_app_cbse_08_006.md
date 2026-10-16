## ELI5
Inflation at five percent, the market up 200 points, industrial output grown 3 — one tool speaks all three: the index number. Current value divided by base value, times 100; 180 against a base of 100 means prices rose four-fifths above the base, not that anything costs 180 rupees. Unit-free relatives let kilos, litres, and metres share a single comparison.

## DEFINITION
An index number is a statistical measure designed to show the average change in a variable (price, quantity, or value) or a group of related variables over two different situations — typically two time periods (base period and current period) — expressed as a percentage relative to a base value of 100.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must be able to: (1) Interpret a given index number (e.g., CPI = 152) to state the exact percentage change in the cost of living since the base year, and (2) Identify the correct type of index number (Price, Quantity, Value) required for a specific real-world policy question (e.g., measuring inflation vs. measuring industrial output).

## SCOPE_BOUNDARY
This node covers the **purpose, interpretation, and classification** of index numbers (Price, Quantity, Value) as per NCERT Unit 6.3 and 6.5. It does **NOT** cover construction methods (Laspeyres, Paasche, Fisher, Moving Averages, Least Squares) — those are covered in sibling nodes c12_app_cbse_08_007, c12_app_cbse_08_008, c12_app_cbse_08_009, c12_app_cbse_08_010.

## WALKTHROUGH
Start by asking: *"The government announces 'Inflation is at 5%'. The stock market says 'Nifty is up 200 points'. A factory manager says 'IIP grew 3%'. What single mathematical tool connects all three statements?"* Guide students to realize all three are **Index Numbers** tracking different variables (prices, stock prices, production quantities). Show a newspaper clipping of CPI data (Base 2012=100, Current=180). Ask: *"Does 180 mean prices are ₹180? Or 180% higher?"* Lead them to the definition: Index = (Current Value / Base Value) × 100. The key insight: **Index numbers are unit-free relatives, not absolute amounts.** They allow comparison across different units (kg, litres, metres) and time periods.

Takeaway: mastery means the one formula recognised behind all three headline numbers and the interpretation kept unit-free. Exam moves: connection questions link inflation, market, and output statements to price, value, and quantity indices; interpretation questions correct the "costs 180 rupees" misreading into a relative statement; computation questions run the division-and-multiplication on given pairs. Method: whatever the variable, the recipe is identical — divide, multiply by 100, read the excess. Drill: three headlines, one recipe, zero units. The index is the translator between economics and arithmetic. Clip three different newspaper headlines — inflation, market, output — and write the same recipe under each; the sameness of the recipe is the whole lesson of the node.

## DIAGNOSTIC_QUESTION_1
The Consumer Price Index (CPI) for industrial workers with base year 2012 = 100 stands at 175 in January 2024. What does this number 175 precisely indicate about the price level?

## DIAGNOSTIC_ANSWER_1
**Correct Answer:** It indicates that the general price level of the consumption basket for industrial workers has increased by **75%** since the base year 2012. The index value 175 means current prices are 1.75 times the base year prices.  
**Why a wrong answer reveals misunderstanding:** If a student says "prices are ₹175" or "inflation is 175%", they confuse the **index number (a pure relative number)** with **absolute price (rupees)** or **percentage change (which is Index - 100)**. This is the single most common error in board exams — forgetting the base is 100, not 0.

## DIAGNOSTIC_QUESTION_2
A student reads: "The Index of Industrial Production (IIP) grew from 130 to 143." They claim: "Industrial production increased by 13%." Is this statement correct? Explain why or why not using the definition of index numbers.

## DIAGNOSTIC_ANSWER_2
**Correct Answer:** The statement is **incorrect**. The percentage increase is calculated as:  
\(\frac{143 - 130}{130} \times 100 = 10\%\), not 13%.  
The student incorrectly subtracted the index values (143 - 130 = 13) and treated the difference as the percentage. Index numbers are **already percentages relative to base (100)**. The difference between two index numbers gives the **change in index points**, not the percentage change from the earlier period.  
**Why a wrong answer reveals misunderstanding:** This exposes the confusion between **percentage points** (difference of indices) and **percent change** (relative to the previous period's index). Competitive exams (JEE/CUET) frequently trap students here.

## DIAGNOSTIC_QUESTION_3
The Reserve Bank of India uses CPI (Combined) as the nominal anchor for monetary policy. A government committee wants to measure the change in the **volume of goods produced** by the manufacturing sector, ignoring price changes. Which type of index number should they construct: Price Index, Quantity Index, or Value Index? Justify your choice.

## DIAGNOSTIC_ANSWER_3
**Correct Answer:** **Quantity Index** (specifically, the Index of Industrial Production - IIP).  
**Reasoning:**  
- **Price Index** (e.g., CPI, WPI) measures change in *prices* of a basket of goods.  
- **Value Index** measures change in *total value* (Price × Quantity), mixing both price and volume effects.  
- **Quantity Index** measures change in *physical volume/quantity* of goods produced/consumed, using base-year prices as weights to isolate volume changes.  
Since the goal is to track **production volume** independent of price fluctuations, a Quantity Index is the correct tool.  
**Why a wrong answer reveals misunderstanding:** Choosing "Value Index" shows the student doesn't grasp that value = price × quantity, so it conflates inflation with real growth. Choosing "Price Index" confuses the variable being measured.

## DIAGNOSTIC_QUESTION_4
Consider two cities, A and B. City A has CPI = 140 (Base 2012=100). City B has CPI = 160 (Base 2012=100). A student concludes: *"Goods are 20% more expensive in City B than City A."* Analyze this conclusion. Is it valid? What critical assumption about the **base period** and **consumption basket** is required for this comparison to hold?

## DIAGNOSTIC_ANSWER_4
**Correct Answer:** The conclusion is **invalid** without strict assumptions.  
The index numbers 140 and 160 mean:  
- City A prices are 40% above the *national/base* 2012 level.  
- City B prices are 60% above the *same national/base* 2012 level.  
The relative difference is \(\frac{160}{140} \times 100 = 114.3\), so City B is ~14.3% costlier than City A, **not 20%**.  
**Critical Assumptions Required:**  
1. **Identical Base Period:** Both indices must use the *same* base year (2012).  
2. **Identical Basket & Weights:** Both CPIs must represent the *same* consumption basket (same goods, same weights). If City A's CPI weights food 50% and City B weights housing 50%, the comparison is meaningless.  
**Why a wrong answer reveals misunderstanding:** Students often treat index numbers as directly comparable absolute scales, ignoring that they are **ratios tied to a specific base and basket**. This is a classic CBSE case-based question trap.

## DIAGNOSTIC_QUESTION_5
Evaluate this statement: *"Since Fisher's Ideal Index is the Geometric Mean of Laspeyres and Paasche indices, it is always the best index number for all policy decisions, including wage revision contracts and GDP deflator calculation."* Defend or critique using the concepts of **purpose-specific construction** and **test of adequacy**.

## DIAGNOSTIC_ANSWER_5
**Correct Answer:** **Critique — The statement is false.**  
**Justification:**  
1. **No "All-Purpose" Index (NCERT 6.4, Note after Example 2):** Index numbers are constructed for a *specific purpose*. A Cost-of-Living Index (COLI) for wage revision requires *current-period consumption weights* (Paasche-type) to reflect actual living standards. GDP Deflator requires *current-period quantities* of *all* domestically produced goods (Paasche-type). Fisher's Index uses *both* base and current weights — it is a theoretical compromise, not a practical substitute for purpose-specific indices.  
2. **Adequacy Tests ≠ Policy Suitability:** Fisher satisfies Time Reversal and Factor Reversal tests (mathematical consistency), but **fails the "purpose test"** for COLI because it uses base-period weights which overstate cost of living (Laspeyres bias).  
3. **Data Constraints:** Fisher requires *both* base and current period quantity data, which is often unavailable for timely policy (e.g., monthly CPI). Laspeyres (fixed base weights) is used for CPI precisely because base weights are known and fixed.  
**Why a wrong answer reveals misunderstanding:** Students memorize "Fisher is ideal" without understanding **ideal for what?** (mathematical symmetry) vs. **suitable for what?** (policy objective). Board exams test this distinction via Assertion-Reason questions.

## DIAGNOSTIC_QUESTION_6
Create a realistic scenario where a **Value Index** would be the preferred measure over a Price Index or Quantity Index. Define the base period, current period, the variable tracked, and explain why the *total value* (not just price or quantity alone) is the decision-critical metric.

## DIAGNOSTIC_ANSWER_6
**Expected Answer Criteria (Good Response):**  
- **Scenario:** A retail chain (e.g., Reliance Retail) tracking **total sales revenue** of "Electronics Category" across 500 stores for Diwali 2023 vs Diwali 2022.  
- **Base:** Diwali 2022; **Current:** Diwali 2023.  
- **Variable:** Total Sales Value (₹ Crores) = Σ (Price_i × Quantity_Sold_i).  
- **Why Value Index:** The business decision is **revenue growth target setting**. A Price Index would ignore volume changes (discounts driving higher units). A Quantity Index would ignore price/mix changes (premium smartphone sales vs budget). Only Value Index captures the *combined effect* of pricing strategy, product mix shift, and volume — the actual P&L driver.  
**Why a poor answer reveals misunderstanding:** Vague scenarios like "measuring economy" or confusing Value Index with GDP (which is a value aggregate, but the *deflator* is a price index). The student must articulate that **Value Index = Price Index × Quantity Index (conceptually)** and is used when the *monetary aggregate* is the KPI.

## COMMON_MISCONCEPTION
**Misconception:** *"Index number = Percentage. So CPI 150 means 150% inflation."*  
**Exact Wrong Reasoning:** Students see the formula \(I = \frac{p_1}{p_0} \times 100\) and the "×100". They think the result *is* the percentage increase. They forget the base is **100**, not 0.  
**Why they make this error:** In Class 11 (c11_app_cbse_11_001 Financial Mathematics), they learned: \(\text{Percentage Change} = \frac{\text{New} - \text{Old}}{\text{Old}} \times 100\). The Index Number formula looks identical but **lacks the subtraction of 1 (or 100)**. The brain pattern-matches "×100 → percentage".  
**Concrete Example:** Base year price ₹100, Current year ₹150.  
- Correct Index = 150. Correct % Increase = 50%.  
- Student writes: "Index = 150, so Inflation = 150%."  
This error costs 1-2 marks in **every** CBSE board paper (Short Answer/Case Study) and appears in CUET as a "select the correct interpretation" MCQ.

## ON_FAILURE
1. **Immediate Re-teach (5 mins):** Write on board:  
   \(\text{Index} = \frac{P_1}{P_0} \times 100\)  
   \(\%\Delta = \frac{P_1 - P_0}{P_0} \times 100 = \text{Index} - 100\)  
   Ask: *"If Index = 100, %Δ = ?"* (0%). *"If Index = 200, %Δ = ?"* (100%). Drill 5 rapid-fire conversions.  
2. **Visual Anchor:** Draw a number line: 0 — 100 (Base) — 150 (Index) — 200. Label: "100 = Base Level", "Distance from 100 = % Change".  
3. **Re-diagnostic:** Give 3 index values (112, 95, 250). Ask for % change. If any error → revisit **c11_app_cbse_11_001 (Financial Mathematics: Percentage Change)** and **c12_app_cbse_08_004 (Introduction: Index Number definition)**.  
4. **Lock-in:** Assign 2 word problems where they must *convert* index to % change and *interpret* in a sentence (e.g., "WPI 120 means wholesale prices rose 20%").

## PREREQUISITE_NODE_IDS
c11_app_cbse_11_001, c12_app_cbse_08_004, c12_app_cbse_08_005

## PREREQUISITE_REASONS
c11_app_cbse_11_001: Financial Mathematics covers percentage change, ratios, and growth rates — the mathematical foundation for interpreting index numbers as relatives.  
c12_app_cbse_08_004: Introduction establishes the real-world context (newspaper headlines, Nifty/Sensex, CPI) that motivates *why* we need index numbers.  
c12_app_cbse_08_005: Index Number node defines the core concept (measure of change in group of variables, base period, current period, index series) which this node applies.

## FORWARD_NODE_IDS
c12_app_cbse_08_007, c12_app_cbse_08_008, c12_app_cbse_08_009, c12_app_cbse_08_010

## FORWARD_REASONS
c12_app_cbse_08_007: Construction of Index Number requires understanding *what* an index measures (Price/Quantity/Value) and *why* (purpose) before learning *how* to calculate (Simple/Weighted methods).  
c12_app_cbse_08_008: Relative Index Number is the building block of all aggregate indices; this node's interpretation of "Index = 140 → 40% increase" is the prerequisite logic.  
c12_app_cbse_08_009: Time series analysis (Moving Averages, Least Squares) uses index numbers as the input data series (e.g., CPI series) to extract trends.  
c12_app_cbse_08_010: Test of Adequacy (Time Reversal, Factor Reversal) evaluates the *properties* of the index numbers defined and interpreted here.

## CROSS_SUBJECT_PREREQS
c11_app_cbse_10_001, c11_app_cbse_11_001

## CROSS_SUBJECT_REASONS
c11_app_cbse_10_001: Descriptive Statistics (Mean, Weighted Mean) provides the averaging foundation for "Simple Average of Relatives" and "Weighted Average of Relatives" methods used in index construction.  
c11_app_cbse_11_001: Financial Mathematics (Percentages, Growth Rates, Present Value) is the direct mathematical prerequisite — index numbers are applied percentage relatives used in inflation adjustment of cash flows, real return calculation, and cost-of-living escalation clauses.

## CHAIN_DESCRIPTION
c11_app_cbse_11_001 -> c12_app_cbse_08_004 -> c12_app_cbse_08_005 -> c12_app_cbse_08_006 -> c12_app_cbse_08_007

## THIS_FORMULA
Index Number for period \(n\) with base period \(0\):  
\(I_n = \frac{\text{Value in current period}}{\text{Value in base period}} \times 100\)  
For Price Index: \(I_n = \frac{p_n}{p_0} \times 100\)  
For Quantity Index: \(I_n = \frac{Q_n}{Q_0} \times 100\)  
For Value Index: \(I_n = \frac{p_n Q_n}{p_0 Q_0} \times 100\)

## FORMULA_VARIABLES
- \(I_n\): Index number for current period \(n\) (pure number, no units)  
- \(p_n, p_0\): Price per unit in current period and base period (₹/unit)  
- \(Q_n, Q_0\): Quantity in current period and base period (kg, litres, units)  
- \(p_n Q_n, p_0 Q_0\): Total value in current and base period (₹)

## FORMULA_UNITS
- Index Number: **Unit-less** (pure relative number, base = 100)  
- Prices: ₹/unit (kg, litre, metre, etc.)  
- Quantities: Physical units (kg, litre, count)  
- Values: ₹ (Rupees)

## COMPUTATION_TYPE
statistical

## CROSS_SUBJECT
c12_phy_thermodynamics_03 | Physics: Thermodynamics uses **Index Numbers** conceptually in **Steam Tables** and **Compressibility Factor (Z)** charts where properties are tabulated relative to critical constants (base), analogous to price relatives.  
c12_chem_chemical_kinetics_04 | Chemistry: Chemical Kinetics uses **Relative Rate Constants** (\(k/k_0\)) at different temperatures (Arrhenius equation) — a direct application of index number logic: current rate relative to base rate.  
c12_eco_macro_02 | Economics: **National Income Accounting** — Real GDP = Nominal GDP / GDP Deflator (Price Index/100). The GDP Deflator *is* a Paasche-type Price Index. Understanding index construction here is essential for distinguishing Real vs Nominal variables.  
c12_bio_ecology_05 | Biology: **Population Ecology** — Population indices (e.g., Tiger Census Index) track relative abundance over time using a base year = 100, identical to Index of Industrial Production methodology.

## PREREQ_CONCEPT
Percentage change and relative comparison (Class 11 Financial Mathematics) — specifically, the distinction between *absolute change* (New - Old) and *relative change* ((New - Old)/Old × 100).

## PREREQ_BEFORE
Student must fluently convert between: "Index = 125" ↔ "25% increase", "Index = 80" ↔ "20% decrease", and "Index = 100" ↔ "No change" — without formula prompts.

## PREREQ_STUCK
If stuck on interpretation, immediately revisit **c11_app_cbse_11_001 (Percentage Change & Growth Rates)** and practice: "If revenue grew from ₹50L to ₹65L, what is the index (base=100)? What is % growth?"

## WORKED_EXAMPLE_1
PROBLEM: The All-India Consumer Price Index for Industrial Workers (CPI-IW) with base 2016 = 100 was 126.5 in July 2023. A worker's dearness allowance (DA) is linked to this index with a neutral point of 115. If the basic pay is ₹35,000/month and DA rate is 0.5% per index point above neutral point, calculate the monthly DA amount for July 2023.  
STEPS:
- Step 1: Identify given: Base Index = 100 (2016), Current Index (July 2023) = 126.5, Neutral Point = 115, Basic Pay = ₹35,000, DA Rate = 0.5% per point.
- Step 2: Calculate index points above neutral point: \(126.5 - 115 = 11.5\) points.
- Step 3: Calculate DA percentage: \(11.5 \times 0.5\% = 5.75\%\).
- Step 4: Calculate DA amount: \(5.75\% \times ₹35,000 = ₹2,012.50\).
- Step 5: Interpret: The index 126.5 means prices are 26.5% above 2016; DA compensates only for rise above 115 (15% above 2016).
REASONING: This applies the core interpretation (Index - Neutral Point = compensation base) used in actual government wage revision orders (7th Pay Commission). The index number is not just a statistic — it drives ₹ calculations.
ANSWER: Monthly DA = **₹2,012.50**

## WORKED_EXAMPLE_2
PROBLEM: A factory produces 3 products. Base Year (2020) and Current Year (2023) data:  
| Product | Base Price (₹) | Base Qty | Current Price (₹) | Current Qty |  
|---------|----------------|----------|-------------------|-------------|  
| X       | 100            | 50       | 120               | 60          |  
| Y       | 200            | 30       | 250               | 25          |  
| Z       | 50             | 100      | 60                | 120         |  
The management wants to know: (a) Has the **sales revenue** grown? (b) Has the **production volume** grown? Identify the correct index type for each and compute both.  
STEPS:
- Step 1: Identify questions: (a) Revenue growth → Value Index. (b) Production volume growth → Quantity Index.
- Step 2: Compute Base Year Total Value: \( (100×50) + (200×30) + (50×100) = 5,000 + 6,000 + 5,000 = ₹16,000 \).
- Step 3: Compute Current Year Total Value: \( (120×60) + (250×25) + (60×120) = 7,200 + 6,250 + 7,200 = ₹20,650 \).
- Step 4: Value Index = \( \frac{20,650}{16,000} \times 100 = 129.06 \). Revenue grew ~29%.
- Step 5: Quantity Index (Laspeyres-type, fixed base weights): \( \frac{\sum p_0 Q_1}{\sum p_0 Q_0} \times 100 \).  
  Numerator: \( (100×60) + (200×25) + (50×120) = 6,000 + 5,000 + 6,000 = 17,000 \).  
  Denominator: Base Value = 16,000 (from Step 2).  
  Quantity Index = \( \frac{17,000}{16,000} \times 100 = 106.25 \). Volume grew ~6.25%.
- Step 6: Analyze gap: Revenue grew 29% but volume only 6.25% → **Price/mix effect dominates** (premium product Y price up, volume down).
REASONING: Demonstrates how different index types answer different business questions from the *same raw data*. Value Index uses current prices & quantities; Quantity Index uses base prices as weights to isolate volume.
ANSWER: (a) Value Index = **129.06** (Revenue ↑ 29.06%). (b) Quantity Index = **106.25** (Volume ↑ 6.25%).

## WORKED_EXAMPLE_3
PROBLEM: (CBSE Case-Study Style) The Government constructs a **Cost of Living Index (CLI)** for metro city employees. Base Year 2015 = 100. The index uses 5 groups with weights: Food (40%), Housing (25%), Transport (15%), Education (10%), Medical (10%). In 2024, the group indices are: Food 140, Housing 180, Transport 120, Education 160, Medical 200.  
(i) Calculate the CLI for 2024.  
(ii) If an employee's salary was ₹60,000 in 2015, what should be the 2024 salary to maintain the *same standard of living*?  
(iii) The employee's actual 2024 salary is ₹85,000. Has their real income increased or decreased? By what %?  
STEPS:
- Step 1: Recognize CLI is a **Weighted Average of Relatives (Price Index)**. Formula: \(CLI = \frac{\sum (I_i \times W_i)}{\sum W_i}\) where \(I_i\) = group index, \(W_i\) = weight (%).
- Step 2: Compute weighted sum:  
  \( (140 × 40) + (180 × 25) + (120 × 15) + (160 × 10) + (200 × 10) \)  
  \( = 5,600 + 4,500 + 1,800 + 1,600 + 2,000 = 15,500 \).
- Step 3: CLI 2024 = \( \frac{15,500}{100} = 155 \). (Index = 155 → 55% cost increase since 2015).
- Step 4: Salary for same living standard = Base Salary × (CLI/100) = \( 60,000 × \frac{155}{100} = ₹93,000 \).
- Step 5: Compare Actual (₹85,000) vs Required (₹93,000). Shortfall = ₹8,000.
- Step 6: Real Income Change: Real Salary = \( \frac{\text{Nominal Salary}}{\text{CLI}} \times 100 \).  
  2015 Real = ₹60,000. 2024 Real = \( \frac{85,000}{155} \times 100 = ₹54,838.71 \).  
  % Change = \( \frac{54,838.71 - 60,000}{60,000} \times 100 = -8.6\% \). Real income **fell 8.6%**.
REASONING: Integrates Index interpretation (CLI), wage adjustment (policy use), and real vs nominal distinction (Economics cross-link). The "Weighted Average of Relatives" method is the standard for CLI/CPI construction (NCERT 6.4.9).
ANSWER: (i) CLI = **155**. (ii) Required Salary = **₹93,000**. (iii) Real Income **decreased by 8.6%** (Nominal rose 41.7%, but prices rose 55%).

## COMPETENCY_QUESTION_1
QUESTION: The Wholesale Price Index (WPI) for 'Fuel & Power' group was 118.2 in March 2023 (Base 2011-12=100). In March 2024, it rose to 124.5. A news anchor says: *"Fuel inflation doubled from 18.2% to 24.5%."*  
(a) Identify the error in the anchor's statement.  
(b) Calculate the correct **year-on-year inflation rate** for Fuel & Power for March 2024.  
(c) Explain why WPI (a Laspeyres-type index) might **overstate** the true cost increase for industrial users who switch to cheaper energy sources.  
COMPETENCY: Critical Thinking & Error Analysis (Interpretation of Index Numbers in Media)  
STEPS:
- Step 1: Recognize anchor confuses **Index Level** (118.2, 124.5) with **Inflation Rate** (% change YoY).
- Step 2: Compute correct YoY inflation: \(\frac{124.5 - 118.2}{118.2} \times 100 = 5.33\%\).
- Step 3: Explain Laspeyres bias: Fixed base-year weights (2011-12 consumption pattern) don't capture substitution (e.g., industry shifting from coal to solar), so index rises faster than actual cost.
ANSWER: (a) Error: Treated index points (118.2, 124.5) as inflation percentages. (b) Correct YoY Inflation = **5.33%**. (c) Laspeyres/WPI uses fixed base weights → ignores substitution effect → overstates cost of living/production increase.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: (JEE Main / CUET Style - Multi-concept)  
A farmer sells Wheat and Cotton. Base Year (2018) Prices: Wheat ₹20/kg, Cotton ₹50/kg. Current Year (2023) Prices: Wheat ₹28/kg, Cotton ₹55/kg. Base Year Quantities Sold: Wheat 1000 kg, Cotton 500 kg. Current Year Quantities Sold: Wheat 1200 kg, Cotton 400 kg.  
Calculate:  
(i) Laspeyres Price Index (2023 on 2018)  
(ii) Paasche Quantity Index (2023 on 2018)  
(iii) Fisher's Ideal Price Index  
(iv) Based on (i) and (ii), comment on the **direction of substitution** by the farmer (which crop shifted relatively more?).  
COMPETENCY: Problem Solving & Synthesis (Application of Multiple Index Formulas + Economic Interpretation)  
STEPS:
- Step 1: Set up data table with p0, q0, p1, q1 for both commodities.
- Step 2: Laspeyres Price Index = \(\frac{\sum p_1 q_0}{\sum p_0 q_0} \times 100\).  
  \(\sum p_0 q_0 = (20×1000) + (50×500) = 20,000 + 25,000 = 45,000\).  
  \(\sum p_1 q_0 = (28×1000) + (55×500) = 28,000 + 27,500 = 55,500\).  
  \(I_{La} = \frac{55,500}{45,000} \times 100 = 123.33\).
- Step 3: Paasche Quantity Index = \(\frac{\sum p_0 q_1}{\sum p_0 q_0} \times 100\)? **NO.** Paasche Quantity uses *current prices* as weights: \(\frac{\sum p_1 q_1}{\sum p_1 q_0} \times 100\).  
  \(\sum p_1 q_1 = (28×1200) + (55×400) = 33,600 + 22,000 = 55,600\).  
  \(\sum p_1 q_0 = 55,500\) (from Step 2).  
  \(I_{Paasche\_Qty} = \frac{55,600}{55,500} \times 100 = 100.18\).
- Step 4: Fisher's Price Index = \(\sqrt{I_{La} \times I_{Paasche\_Price}}\). Need Paasche Price Index: \(\frac{\sum p_1 q_1}{\sum p_0 q_1} \times 100\).  
  \(\sum p_0 q_1 = (20×1200) + (50×400) = 24,000 + 20,000 = 44,000\).  
  \(I_{Pa\_Price} = \frac{55,600}{44,000} \times 100 = 126.36\).  
  \(I_{Fisher} = \sqrt{123.33 \times 126.36} = \sqrt{15,584.5} = 124.84\).
- Step 5: Interpretation: Laspeyres Price (123.33) < Paasche Price (126.36) → **Current period weights give higher price index** → Quantities shifted *towards* the commodity whose price rose *less* (Wheat: +40% vs Cotton: +10%). Farmer substituted **towards Wheat** (lower price rise).
ANSWER: (i) Laspeyres Price Index = **123.33** (ii) Paasche Quantity Index = **100.18** (iii) Fisher's Price Index = **124.84** (iv) Farmer substituted **towards Wheat** (price rose less), shown by Paasche Price > Laspeyres Price.
DIFFICULTY: hard