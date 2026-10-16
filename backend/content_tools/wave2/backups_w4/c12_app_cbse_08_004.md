## ELI5
Grandfather's wheat cost 2; today it is 30 — fifteen times? Set the base year at 100 and every year becomes a relative: the crude-oil example reads 140, meaning forty percent above base, not a hundred-and-forty percent rise. The index is a pure number, no units, the economy's thermometer. One caveat: the base must be a normal year, not a festival or a crisis.

## DEFINITION
An index number is a statistical measure designed to show the average change in a group of related variables (prices, quantities, or values) over two different situations — typically two time periods, geographical locations, or categories — expressed as a percentage relative to a base period assigned the value 100.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must be able to: (1) correctly identify the base period and current period in a given dataset, (2) compute a simple price relative index using the formula \( I_n = \frac{p_n}{p_0} \times 100 \), and (3) interpret the result (e.g., "index 125 means 25% increase over base period") without confusing the index value with the percentage change.

## SCOPE_BOUNDARY
This node covers the *conceptual foundation* of index numbers: definition, purpose, base/current period distinction, price/quantity relatives, and index series. It does NOT cover construction methods (simple aggregative, weighted, Laspeyres, Paasche, Fisher), tests of adequacy, or time series — those are in subsequent nodes (c12_app_cbse_08_005 onwards).

## WALKTHROUGH
Start with a relatable scenario: "Your grandfather says 'In my time, 1 kg wheat cost ₹2!' Today it's ₹30. Is wheat really 15 times costlier, or did money lose value?" This hooks the need for a *standardized comparison tool*. Then introduce the core idea: pick a base year (say 2010), set its price level = 100, and express every other year's price as a relative number. Walk through the crude oil example from NCERT (2005 base, 2010 price ₹3.5 vs ₹2.5 → index 140). Emphasize: the index is a *pure number* (no units), and 140 means "40% above base", not "140% increase". End with the key insight: index numbers compress complex, multi-unit economic data into a single comparable number — the "thermometer" of the economy.

Takeaway: mastery means base and current periods identified and the relative computed and read without the percentage trap. Exam moves: identification questions name base and current periods in a dataset; computation questions divide, multiply by 100, and produce the relative for price or quantity; interpretation questions distinguish "index 140" from "a 140 percent increase". Method: write the ratio first, the 100 second, and read the excess over 100 as the movement. Drill: one wheat price, one crude barrel, one thermometer. The base year's honesty decides the thermometer's trustworthiness.

## DIAGNOSTIC_QUESTION_1
What is the index number of the base period by definition, and why is it assigned this specific value?

## DIAGNOSTIC_ANSWER_1
The index number of the base period is always **100**. It is assigned this value by convention to serve as a fixed reference benchmark — all other periods are expressed as a percentage *of* this base. A wrong answer (e.g., "0", "1", or "the actual price") reveals the student misunderstands the *relative* nature of index numbers: they measure *change relative to a baseline*, not absolute levels.

## DIAGNOSTIC_QUESTION_2
A student computes the price relative for 2020 with base 2015 as \( \frac{2020 \text{ price}}{2015 \text{ price}} \times 100 = 135 \). They write: "Prices increased by 135% from 2015 to 2020." Is this correct? Explain.

## DIAGNOSTIC_ANSWER_2
**Incorrect.** The index is 135, which means prices are 135% *of* the base period level — i.e., a **35% increase** (135 − 100 = 35). The student confused the *index value* (135) with the *percentage change* (35%). This is the single most common error in board exams: forgetting to subtract 100 to get the actual percentage change.

## DIAGNOSTIC_QUESTION_3
The price of 1 kg rice was ₹40 in 2010 (base) and ₹52 in 2020. The price of 1 litre milk was ₹30 in 2010 and ₹45 in 2020. Compute the price relative index for each commodity in 2020. Which commodity saw a higher *rate* of price increase?

## DIAGNOSTIC_ANSWER_3
Rice: \( \frac{52}{40} \times 100 = 130 \). Milk: \( \frac{45}{30} \times 100 = 150 \). Milk's index (150) > Rice's index (130), so **milk had a higher rate of price increase** (50% vs 30%). A wrong answer (e.g., comparing absolute increases ₹12 vs ₹15) reveals the student doesn't grasp that index numbers *normalize for base price* — essential when units or base magnitudes differ.

## DIAGNOSTIC_QUESTION_4
Why can we *not* directly compare the absolute price change of crude oil (₹/gallon) with the absolute price change of wheat (₹/kg) to understand overall inflation? How does an index number solve this?

## DIAGNOSTIC_ANSWER_4
Absolute changes are in different units (₹/gallon vs ₹/kg) and different base magnitudes — a ₹10 rise in crude oil may be trivial, while a ₹10 rise in wheat is massive. Index numbers **convert each to a unit-free percentage relative to its own base** (both become pure numbers like 112, 140), making them directly comparable and aggregatable. A vague answer ("units differ") misses the core: index numbers *standardize by base-period proportion*, not just remove units.

## DIAGNOSTIC_QUESTION_5
An economist claims: "Since the Consumer Price Index (CPI) rose from 120 to 132, inflation was 12%." Evaluate this statement. Is the reasoning correct? If not, what is the correct inflation rate?

## DIAGNOSTIC_ANSWER_5
**Incorrect reasoning.** The economist subtracted index values (132 − 120 = 12) and called it 12%. But inflation rate = \( \frac{132 - 120}{120} \times 100 = 10\% \). Index numbers are *already percentages of base*; the change *between* two index numbers must be calculated as a percentage of the *earlier index*, not as a raw difference. This traps students who treat index numbers like ordinary numbers.

## DIAGNOSTIC_QUESTION_6
Create a realistic mini-dataset (3 commodities, base year 2018, current year 2023) where Commodity A has the *largest absolute price increase* but the *smallest price relative index*. Show the data and explain why this happens.

## DIAGNOSTIC_ANSWER_6
Example:  
| Commodity | 2018 Price | 2023 Price | Abs. Increase | Price Relative |  
|-----------|------------|------------|---------------|----------------|  
| A (Gold)  | 30,000     | 30,500     | 500           | 101.67         |  
| B (Rice)  | 40         | 55         | 15            | 137.5          |  
| C (Milk)  | 30         | 42         | 12            | 140            |  
Commodity A has the largest absolute rise (₹500) but the smallest index (101.67) because its *base price is huge* — a ₹500 change is only 1.67%. This shows why **absolute changes mislead**; index numbers reveal the *proportional* impact. A poor answer uses similar base prices, missing the point entirely.

## COMMON_MISCONCEPTION
**Misconception:** "Index number = Percentage change."  
Students repeatedly write "Index 140 means 140% increase" or "Inflation = Current Index − Base Index".  
**Why it happens:** The formula \( I = \frac{p_n}{p_0} \times 100 \) outputs a number *around* 100, and the "×100" looks like a percentage. Students conflate the *scaled relative* (index) with the *actual percent change* (index − 100). NCERT examples (crude oil: index 140 → "40% above base") explicitly separate these, but students skip the subtraction step.  
**Concrete error:** In Example 1, a student writes "crude oil price in 2010 was 140% higher than 2005" — it was 40% higher. This costs 1 mark in board exams (incorrect interpretation) and leads to wrong inflation calculations in competitive exams.

## ON_FAILURE
1. **Re-visit the crude oil example (NCERT p.4–5):** Recompute each year's index *and* explicitly write "Index = 140 → % change = 140 − 100 = 40%" for every row.  
2. **Drill 5 quick conversions:** Given index values (105, 95, 120, 80, 100), write the % change each time: +5%, −5%, +20%, −20%, 0%.  
3. **Create a 2-commodity table** where base prices differ wildly (e.g., car vs pencil); compute relatives and verify that the *higher absolute increase* does *not* mean higher index.  
4. **Re-diagnostic:** Ask the student: "If base year index is 100 and current year index is 118, what is the percentage increase? Why is it not 118%?" — they must answer "18%, because index is relative to 100, not absolute."

## PREREQUISITE_NODE_IDS
c11_app_cbse_10_001, c11_app_cbse_01_006, c11_app_cbse_01_007

## PREREQUISITE_REASONS
c11_app_cbse_10_001: Descriptive Statistics (Class 11) — provides foundation in averages, percentages, and data interpretation needed to understand "average change" in index numbers.  
c11_app_cbse_01_006: Indices, Logarithm and Antilogarithm — builds algebraic fluency with ratios, proportions, and percentage calculations (core to \( \frac{p_n}{p_0} \times 100 \)).  
c11_app_cbse_01_007: Logarithms — reinforces multiplicative thinking (ratios as log-differences) which underpins geometric mean methods (Fisher's index) later in this chapter.

## FORWARD_NODE_IDS
c12_app_cbse_08_005, c12_app_cbse_08_006, c12_app_cbse_08_007, c12_app_cbse_08_008

## FORWARD_REASONS
c12_app_cbse_08_005: Index Number — this node's definition and price relative concept directly enable the formal construction methods (simple/weighted) taught next.  
c12_app_cbse_08_006: Use of Index Numbers — understanding *what* an index measures (price/quantity/value change) is prerequisite to appreciating its *uses* (CPI, GDP, policy-making).  
c12_app_cbse_08_007: Construction of Index Number — the base/current period distinction and relative index formula are the building blocks for all aggregative and weighted methods.  
c12_app_cbse_08_008: Relative Index Number — this node introduces the concept; the next node deepens it with quantity relatives, value relatives, and index series.

## CROSS_SUBJECT_PREREQS
c11_app_cbse_11_001, c11_app_cbse_09_001

## CROSS_SUBJECT_REASONS
c11_app_cbse_11_001: Financial Mathematics (Class 11) — concepts like present value, inflation-adjusted returns, and real vs nominal interest rates directly use price index numbers (CPI/WPI) to deflate monetary values.  
c11_app_cbse_09_001: Descriptive Statistics (Class 11) — index numbers are a specialized application of "measures of central tendency" (averages of relatives) and "dispersion" (variability across commodities), extending univariate stats to economic time series.

## CHAIN_DESCRIPTION
c11_app_cbse_10_001 -> c12_app_cbse_08_004 -> c12_app_cbse_08_005

## THIS_FORMULA
Price Relative Index for period n (base period 0): \( I_n = \frac{p_n}{p_0} \times 100 \)  
Quantity Relative Index for period n (base period 0): \( I_n = \frac{Q_n}{Q_0} \times 100 \)

## FORMULA_VARIABLES
- \( I_n \): Index number for current period n (pure number, no units)  
- \( p_n \): Price per unit in current period n (₹/kg, ₹/litre, etc.)  
- \( p_0 \): Price per unit in base period 0 (same units as \( p_n \))  
- \( Q_n \): Quantity in current period n (kg, litres, units, etc.)  
- \( Q_0 \): Quantity in base period 0 (same units as \( Q_n \))

## FORMULA_UNITS
- \( I_n \): Pure number (conventionally expressed as "index points", e.g., 140)  
- \( p_n, p_0 \): Same monetary unit per physical unit (₹/kg, ₹/litre, $/barrel) — **must match**  
- \( Q_n, Q_0 \): Same physical unit (kg, litres, dozens, units) — **must match**

## COMPUTATION_TYPE
arithmetic

## CROSS_SUBJECT
c12_phy_cbse_08_001 | Physics: Thermodynamics — index numbers mirror the concept of "relative change" used in pressure-volume-temperature ratios (e.g., \( \frac{P_2}{P_1} \) in gas laws); both normalize by a reference state.  
c12_che_cbse_04_001 | Chemistry: Chemical Kinetics — rate constants at different temperatures are compared via ratios (Arrhenius equation), analogous to price relatives; both use a base reference (T₀ or base year) to quantify proportional change.  
c12_eco_cbse_02_001 | Economics: National Income Accounting — GDP deflator and CPI are direct applications of index numbers; this node's price relative formula is the micro-foundation of macroeconomic inflation measurement.

## PREREQ_CONCEPT
Ratio and percentage: the idea that \( \frac{\text{new}}{\text{old}} \times 100 \) expresses "new as a percent of old" — not "percent increase".

## PREREQ_BEFORE
Student must fluently convert between fraction, decimal, and percentage (e.g., 1.35 = 135% = 35% increase) and understand that "base = 100" is a convention, not a calculation result.

## PREREQ_STUCK
If stuck on "index vs % change", review Class 8 percentage basics: "If a shirt cost ₹200 and now costs ₹250, the new price is 125% of old, but the increase is 25%." The index is the 125; the inflation is the 25.

## WORKED_EXAMPLE_1
PROBLEM: The table shows prices of three essential commodities in a village shop. 2015 is the base year. Compute the price relative index for each commodity in 2022 and determine which commodity's price rose the fastest in *percentage terms*.  
| Commodity | Unit | Price 2015 (₹) | Price 2022 (₹) |  
|-----------|------|----------------|----------------|  
| Wheat     | kg   | 20             | 28             |  
| Mustard Oil | litre | 100          | 160            |  
| Salt      | kg   | 15             | 18             |  

STEPS:
- Step 1: Identify base period (2015) and current period (2022); confirm units match for each commodity (kg/kg, litre/litre).  
- Step 2: Recall formula \( I_n = \frac{p_n}{p_0} \times 100 \). Apply to each commodity separately.  
- Step 3: Wheat: \( \frac{28}{20} \times 100 = 140 \). Mustard Oil: \( \frac{160}{100} \times 100 = 160 \). Salt: \( \frac{18}{15} \times 100 = 120 \).  
- Step 4: Interpret: Wheat index 140 → 40% increase. Mustard Oil index 160 → 60% increase. Salt index 120 → 20% increase.  
- Step 5: Compare percentage increases: Mustard Oil (60%) > Wheat (40%) > Salt (20%). Despite Salt having the lowest absolute rise (₹3), Mustard Oil's *rate* is highest.  

REASONING: Price relatives normalize for base price magnitude. Mustard Oil's base price (₹100) is 5× Wheat's (₹20), but its absolute rise (₹60) is only 3× Wheat's (₹8) — so proportionally, oil rose faster. This is why we *must* use relatives, not absolute changes.

ANSWER: Price Relative Indices (2022, base 2015): Wheat = 140, Mustard Oil = 160, Salt = 120. Mustard Oil had the fastest percentage price rise (60%).

## WORKED_EXAMPLE_2
PROBLEM: A factory tracks the quantity of raw material consumed per month. Base year 2018 consumption: Steel = 50 tons, Plastic = 200 kg, Copper = 500 kg. Current year 2023 consumption: Steel = 55 tons, Plastic = 250 kg, Copper = 480 kg. Compute the quantity relative index for each material. Which material's usage *decreased* relative to base?  

STEPS:
- Step 1: Note units differ (tons vs kg) but *each commodity's units are consistent* across years — valid for quantity relatives.  
- Step 2: Use quantity relative formula \( I_n = \frac{Q_n}{Q_0} \times 100 \).  
- Step 3: Steel: \( \frac{55}{50} \times 100 = 110 \). Plastic: \( \frac{250}{200} \times 100 = 125 \). Copper: \( \frac{480}{500} \times 100 = 96 \).  
- Step 4: Interpret: Steel index 110 → 10% increase. Plastic index 125 → 25% increase. Copper index 96 → 4% *decrease* (since < 100).  
- Step 5: Answer the specific question: Copper's index (96) is below 100, so its usage decreased.  

REASONING: Quantity relatives work identically to price relatives — they measure proportional change in volume. An index below 100 always indicates a decline from base period, regardless of commodity. This is critical for production planning (e.g., copper shortage).

ANSWER: Quantity Relative Indices (2023, base 2018): Steel = 110, Plastic = 125, Copper = 96. Copper usage decreased by 4% relative to base year.

## WORKED_EXAMPLE_3
PROBLEM: (JEE Main / CUET style) The price relative indices for four commodities in 2025 (base 2020) are: A = 120, B = 150, C = 90, D = 110. The base year prices (₹/unit) are: A = 50, B = 20, C = 200, D = 80. A student claims: "Commodity C had the highest base price, so it dominates the overall price change." Evaluate this claim by computing the *actual* current prices and the simple aggregative index. Does the simple aggregative index support the claim?  

STEPS:
- Step 1: Recover current prices from index: \( p_n = \frac{I_n}{100} \times p_0 \).  
  A: \( \frac{120}{100} \times 50 = 60 \)  
  B: \( \frac{150}{100} \times 20 = 30 \)  
  C: \( \frac{90}{100} \times 200 = 180 \)  
  D: \( \frac{110}{100} \times 80 = 88 \)  
- Step 2: Compute simple aggregative index: \( I = \frac{\sum p_n}{\sum p_0} \times 100 \).  
  \( \sum p_0 = 50 + 20 + 200 + 80 = 350 \)  
  \( \sum p_n = 60 + 30 + 180 + 88 = 358 \)  
  \( I = \frac{358}{350} \times 100 = 102.29 \)  
- Step 3: Analyze the claim. Commodity C's price *fell* (index 90), but its high base price (₹200) makes it contribute ₹180 to \( \sum p_n \) — 50% of the total current aggregate!  
- Step 4: Compare with weighted reality. If quantities consumed were equal, C's fall would be offset by others' rises. But simple aggregative index gives C hidden weight due to high unit price.  
- Step 5: Conclude: The claim is **partially true but misleading**. C *does* dominate the simple aggregate (concealed weight), but its price *decreased* — so it pulls the index *down*, not up. The overall index (102.29) shows only 2.29% net increase, masking C's 10% fall and B's 50% rise.  

REASONING: This exposes the flaw in simple aggregative method (covered in c12_app_cbse_08_007): high-priced commodities become "concealed weights". The student's claim confuses *influence on aggregate* with *direction of change*. Competitive exams test this exact trap.

ANSWER: Current prices: A=60, B=30, C=180, D=88. Simple aggregative index = 102.29. Commodity C dominates the aggregate sum (50.3%) due to high base price, but its price *fell* (index 90), so it *reduces* the overall index. The claim is incorrect in implying C drives an increase.

## COMPETENCY_QUESTION_1
QUESTION: The Government of India uses the Consumer Price Index (CPI) to adjust dearness allowance (DA) for central government employees. Suppose CPI (base 2012 = 100) was 180 in Jan 2023 and 192 in Jan 2024. An employee's basic pay is ₹50,000. The DA is calculated as:  
\( \text{DA \%} = \frac{\text{CPI}_{\text{current}} - \text{CPI}_{\text{base}}}{\text{CPI}_{\text{base}}} \times 100 \)  
where "base" here means the *reference CPI at which DA was last revised* (assume 180).  
(a) Compute the DA percentage effective Jan 2024.  
(b) If the employee mistakenly uses \( \text{CPI}_{\text{current}} - \text{CPI}_{\text{base}} \) (raw difference) as the DA %, how much extra DA (in ₹) would they incorrectly claim?  
(c) Explain why the formula uses division by CPI_base, not raw difference.  

COMPETENCY: Real-world application of index numbers in policy; interpreting index as relative measure; identifying a common computational trap.  

STEPS:
- Step 1: Identify CPI_base = 180 (Jan 2023), CPI_current = 192 (Jan 2024).  
- Step 2: (a) Correct DA% = \( \frac{192 - 180}{180} \times 100 = \frac{12}{180} \times 100 = 6.67\% \).  
- Step 3: (b) Mistaken DA% = 192 − 180 = 12%. Extra % claimed = 12% − 6.67% = 5.33%. Extra ₹ = 5.33% of ₹50,000 = ₹2,665.  
- Step 4: (c) CPI is already an index (base 2012 = 100). The *change* between two index values must be measured relative to the *earlier index* (180), not as absolute difference. Raw difference (12) ignores that 180 represents 180% of 2012 prices — a 12-point rise is only 6.67% of *that* level.  

ANSWER: (a) 6.67% (b) ₹2,665 extra claimed incorrectly (c) Because index numbers are ratios scaled to 100; percentage change between two indices requires dividing by the base-period index, not subtracting.  

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: (Case-based, CBSE Board + IPMAT style) A startup tracks its monthly server costs (in ₹) for 3 services over 2 years:  

| Service | Unit | Jan 2022 Price | Jan 2023 Price | Monthly Usage (units) |  
|---------|------|----------------|----------------|------------------------|  
| Cloud Compute | hour | 10 | 12 | 5000 |  
| Database | GB-month | 5 | 7 | 2000 |  
| CDN | TB | 2 | 3 | 500 |  

The CTO wants a single "Infrastructure Cost Index" for Jan 2023 (base Jan 2022) to present to investors.  
(a) Compute the *price relative* for each service.  
(b) Compute the *simple aggregative price index*.  
(c) Compute the *weighted aggregative index* using monthly usage as weights (Laspeyres-type).  
(d) The CTO says: "Our costs went up 25% because the simple average of price relatives is 25%." Verify this claim.  
(e) Which index (b or c) better reflects the *actual impact on the startup's monthly bill*? Justify with numbers.  

COMPETENCY: Multi-concept integration (price relatives, simple vs weighted aggregative, real-world decision making); quantitative comparison; critical evaluation of index choice.  

STEPS:
- Step 1: (a) Price relatives: Compute: \( \frac{12}{10} \times 100 = 120 \); \( \frac{7}{5} \times 100 = 140 \); \( \frac{3}{2} \times 100 = 150 \).  
- Step 2: (b) Simple aggregative: \( \sum p_0 = 10+5+2 = 17 \); \( \sum p_n = 12+7+3 = 22 \); Index = \( \frac{22}{17} \times 100 = 129.41 \).  
- Step 3: (c) Weighted aggregative (Laspeyres): Weights = usage.  
  \( \sum p_0 q_0 = (10 \times 5000) + (5 \times 2000) + (2 \times 500) = 50,000 + 10,000 + 1,000 = 61,000 \)  
  \( \sum p_n q_0 = (12 \times 5000) + (7 \times 2000) + (3 \times 500) = 60,000 + 14,000 + 1,500 = 75,500 \)  
  Index = \( \frac{75,500}{61,000} \times 100 = 123.77 \)  
- Step 4: (d) Simple average of relatives = \( \frac{120 + 140 + 150}{3} = 136.67 \) → 36.67% increase, NOT 25%. CTO's claim is false (they likely averaged 20%, 40%, 50% incorrectly).  
- Step 5: (e) Actual monthly bill: Jan 2022 = ₹61,000; Jan 2023 = ₹75,500. Increase = \( \frac{75,500 - 61,000}{61,000} \times 100 = 23.77\% \). Weighted index (123.77) matches this *exactly*; simple aggregative (129.41) overstates because it ignores that CDN (highest % rise) has lowest usage. Weighted index is correct for business impact.  

ANSWER: (a) 120, 140, 150 (b) 129.41 (c) 123.77 (d) Claim false: simple avg of relatives = 136.67 (36.67% rise) (e) Weighted aggregative index (123.77) matches actual bill increase (23.77%); simple aggregative (129.41) overstates by ignoring usage weights.  

DIFFICULTY: hard