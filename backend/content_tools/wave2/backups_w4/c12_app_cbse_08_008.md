## ELI5
Petrol was 60 when driving began and is 100 now — not a jump out of thin air: the base becomes 100, today reads 166.67, and the increase is the 66.67 above it. Divide by the base, multiply by 100, and every period joins an index series built on the same normal base year. Pure numbers, no units, one shared yardstick across the whole series.

## DEFINITION
A relative index number for a given period expresses the value of a variable (price, quantity, or value) in that period as a percentage of its value in a chosen base period, calculated as $I_n = \frac{p_n}{p_0} \times 100$ (for price) or $I_n = \frac{Q_n}{Q_0} \times 100$ (for quantity), where $p_0, Q_0$ are base period values and $p_n, Q_n$ are current period values. The base period index is always 100 by definition.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must be able to: (1) compute relative price/quantity index numbers for single items given base and current period data, (2) construct an index series by calculating indices for multiple periods using the same base, and (3) interpret the index values to state the percentage change from the base period correctly (e.g., index 140 → 40% increase, index 85 → 15% decrease).

## SCOPE_BOUNDARY
This node covers **only** the relative index number (price relative and quantity relative) for a **single item/commodity** across multiple time periods with a fixed base period. It does NOT cover aggregate index methods (simple aggregative, weighted aggregative, Laspeyres, Paasche, Fisher, etc.), index number tests (unit test, time reversal test), or time series analysis — those are separate nodes (c12_app_cbse_08_007, c12_app_cbse_08_009, c12_app_cbse_08_010).

## WALKTHROUGH
Start with a relatable scenario: "Your parents say 'petrol was ₹60/litre when I started driving, now it's ₹100 — that's a 67% jump!' How did they get 67%? They used 60 as base (100), current 100 gives index 166.67, so increase = 66.67%." Then introduce the formula $I_n = \frac{p_n}{p_0} \times 100$ step by step: identify $p_0$ (base price), $p_n$ (current price), divide, multiply by 100. Emphasize that the result is a **pure number** (no units). Show how to build an index series table (like NCERT Example 1 crude oil). Key insight: the base period choice is arbitrary but must be a "normal" period — this connects to the next node on construction issues.

Takeaway: mastery means the relative computed stepwise and an index series built on one unchanging base. Exam moves: computation questions divide current by base and scale to 100; series questions tabulate several periods against the same base without recomputing the base; interpretation questions translate each index into its percentage movement, up or down. Method: identify the base price, the current price, and never let the base drift mid-series. Drill: one fuel price, one table, one normal base year. The yardstick survives every row only if nobody quietly changes it.

## DIAGNOSTIC_QUESTION_1
Define "relative price index number" in your own words and state the formula. What is the index number of the base period always equal to?

## DIAGNOSTIC_ANSWER_1
Relative price index number for period $n$ with base period $0$ is $I_n = \frac{p_n}{p_0} \times 100$, where $p_n$ is current period price and $p_0$ is base period price. The base period index is always 100. A wrong answer (e.g., giving formula as $\frac{p_0}{p_n} \times 100$ or saying base index is 0 or 1) reveals confusion between base/current period roles or misunderstanding that the index is a percentage-of-base scale where base = 100%.

## DIAGNOSTIC_QUESTION_2
A student computes the relative price index for wheat in 2023 (base 2018) as $I_{2023} = \frac{25}{20} \times 100 = 125$. They write: "Wheat price increased by 125% from 2018 to 2023." Is this statement correct? Explain why or why not.

## DIAGNOSTIC_ANSWER_2
The statement is **incorrect**. Index 125 means the 2023 price is 125% of the 2018 price, so the **increase** is $125 - 100 = 25\%$, not 125%. A student making this error confuses the index value (level relative to base) with the percentage change (difference from base). This is the #1 interpretation error in board exams — always subtract 100 to get % change.

## DIAGNOSTIC_QUESTION_3
The price of crude oil was ₹2,500/gallon in Dec 2005 (base), ₹3,500 in Jan 2010, ₹2,800 in Nov 2015, and ₹2,900 in Oct 2020. Compute the relative price index for each period and construct the index series table. What was the percentage change from 2005 to 2010?

## DIAGNOSTIC_ANSWER_3
Indices: 2005 = 100, 2010 = $\frac{3500}{2500} \times 100 = 140$, 2015 = $\frac{2800}{2500} \times 100 = 112$, 2020 = $\frac{2900}{2500} \times 100 = 116$. Index series table: Period | Price | Index. % change 2005→2010 = $140 - 100 = 40\%$ increase. A wrong answer (e.g., 35% or 140%) reveals either arithmetic error or the index-vs-%change confusion from Diagnostic 2.

## DIAGNOSTIC_QUESTION_4
Compare two commodities: Commodity A (base price ₹100, current ₹150) and Commodity B (base price ₹10, current ₹18). Compute relative price indices. Which commodity experienced a larger **percentage increase**? Does the commodity with the larger absolute price increase (₹50 vs ₹8) necessarily have the larger percentage increase? Explain.

## DIAGNOSTIC_ANSWER_4
Index A = $\frac{150}{100} \times 100 = 150$ (50% increase). Index B = $\frac{18}{10} \times 100 = 180$ (80% increase). Commodity B had larger percentage increase despite smaller absolute increase (₹8 vs ₹50). This demonstrates why relative indices are essential: they normalize for different base price levels, enabling fair comparison. A student saying "A increased more because ₹50 > ₹8" fails to grasp the purpose of relative indices.

## DIAGNOSTIC_QUESTION_5
Critique this statement: "The relative index number for a commodity in 2022 with base 2018 is 95. This means the price fell by 5% from 2018 to 2022." Is the reasoning fully correct? What additional assumption about the base period is implicitly required for this interpretation to be valid in economic analysis?

## DIAGNOSTIC_ANSWER_5
The arithmetic is correct: index 95 → 5% decrease. However, the **economic interpretation** assumes the base period (2018) was a "normal" period without abnormal price shocks (boom, depression, war, natural calamity). If 2018 had unusually high prices due to a temporary supply disruption, a 2022 index of 95 might not indicate a real 5% decline in normal conditions — it might just mean prices returned to normal. NCERT explicitly states base period must be "normal" (Sec 6.4, Choice of base period). A student missing this shows lack of understanding of index number construction principles.

## DIAGNOSTIC_QUESTION_6
Create a real-world scenario (Indian context) where you would use relative quantity index numbers instead of price indices. Define the variable, choose a base period, invent plausible data for 3 current periods, compute the index series, and write a one-sentence interpretation for a policymaker.

## DIAGNOSTIC_ANSWER_6
Scenario: Tracking **rice production (in million tonnes)** in India to assess food security. Base: 2018-19 (normal monsoon year, production = 116 MT). Data: 2019-20 = 118 MT, 2020-21 = 124 MT, 2021-22 = 130 MT. Indices: 2018-19 = 100, 2019-20 = 102, 2020-21 = 107, 2021-22 = 112. Interpretation: "Rice production has increased 12% over the base period, indicating improving food grain availability." A poor answer would use price data, forget to multiply by 100, or give interpretation without % change.

## COMMON_MISCONCEPTION
**Confusing the index number with the percentage change.** Students consistently write "index = 140 means 140% increase" instead of "40% increase". This happens because they see "×100" in the formula and think the result is already a percentage. But the formula converts the ratio to a **percentage-of-base** scale where base = 100. The percentage change is **always** Index − 100. Another variant: writing units (₹, %, kg) with the index. The index is a **pure number** — NCERT says "there is no need to write % symbol". This error costs 1-2 marks per question in board exams and appears in JEE Main data interpretation sets.

## ON_FAILURE
If a student confuses index with % change: (1) Make them compute 3 indices by hand: base=100, current=120 → index=120, then explicitly write "increase = 120−100 = 20%". (2) Give 5 mixed practice items where they must state both index and % change. (3) Revisit the formula derivation: $I_n = \frac{p_n}{p_0} \times 100 = \frac{p_n}{p_0} \times 100\%$ — the "×100" creates the percentage-of-base scale, not the change. (4) Use Diagnostic Question 2 as re-test. If they still err, they likely need remediation on "percentage change vs percentage of" concept from Class 8 arithmetic (not in node list, but foundational).

## PREREQUISITE_NODE_IDS
c12_app_cbse_08_004, c12_app_cbse_08_005, c12_app_cbse_08_006, c11_app_cbse_01_007, c11_app_cbse_01_008

## PREREQUISITE_REASONS
c12_app_cbse_08_004: Introduces the concept of index numbers as measures of change — needed to understand *why* we construct relative indices. c12_app_cbse_08_005: Defines index number formally and introduces base/current period terminology used here. c12_app_cbse_08_006: Explains the purpose/uses of index numbers, motivating the need for relative comparison across items. c11_app_cbse_01_007: Logarithms — used in advanced index number theory (geometric mean in Fisher's index) and for computing percentage changes via log differences (competitive exam shortcut). c11_app_cbse_01_008: Laws of logarithms — essential for deriving Fisher's ideal index as geometric mean of Laspeyres and Paasche (later nodes).

## FORWARD_NODE_IDS
c12_app_cbse_08_007, c12_app_cbse_08_009, c12_app_cbse_08_010

## FORWARD_REASONS
c12_app_cbse_08_007: Construction of Index Number builds on relative indices to create aggregate indices for multiple commodities (simple/weighted aggregative methods). c12_app_cbse_08_009: "January 2010" — likely a case study/example node applying relative indices to real crude oil data (as in NCERT Example 1). c12_app_cbse_08_010: "November 2015" — another application node using the same crude oil dataset for further analysis.

## CROSS_SUBJECT_PREREQS
c11_app_cbse_11_001, c11_app_cbse_10_001

## CROSS_SUBJECT_REASONS
c11_app_cbse_11_001: Financial Mathematics — index numbers are used to compute real returns (nominal return adjusted by price index), cost of living adjustments, and inflation-indexed bonds. c11_app_cbse_10_001: Descriptive Statistics — relative indices are a form of relative measure (like coefficient of variation) that standardizes data for comparison; index series construction uses tabular data presentation skills.

## CHAIN_DESCRIPTION
c12_app_cbse_08_005 -> c12_app_cbse_08_008 -> c12_app_cbse_08_007

## THIS_FORMULA
$I_n = \frac{p_n}{p_0} \times 100$ (Relative Price Index) and $I_n = \frac{Q_n}{Q_0} \times 100$ (Relative Quantity Index)

## FORMULA_VARIABLES
$I_n$: Relative index number for period $n$ (pure number, no units). $p_n$: Price in current period $n$. $p_0$: Price in base period $0$. $Q_n$: Quantity in current period $n$. $Q_0$: Quantity in base period $0$.

## FORMULA_UNITS
All variables ($p_n, p_0, Q_n, Q_0$) must be in **same units** (e.g., both in ₹/kg or both in tonnes). $I_n$ is unitless (pure number). Base period index $I_0 = 100$ always.

## COMPUTATION_TYPE
arithmetic

## CROSS_SUBJECT
c12_app_cbse_01_006 | Economics: Consumer Price Index (CPI) and Wholesale Price Index (WPI) are weighted aggregate indices built from relative price indices of individual items; understanding relative index is prerequisite for CPI/WPI construction.
c12_app_cbse_02_001 | Business Studies: Index of Industrial Production (IIP) uses relative quantity indices to measure manufacturing output growth; base year revision (e.g., 2011-12 to 2016-17) changes all index values.

## PREREQ_CONCEPT
Understanding of ratio, percentage, and the concept of a "base period" as reference point for comparison.

## PREREQ_BEFORE
Student must be able to compute percentage change ($\frac{new - old}{old} \times 100\%$) and understand that $\frac{p_n}{p_0} \times 100 = 100 + \% \text{change}$.

## PREREQ_STUCK
If stuck, review "percentage increase/decrease" from Class 8 arithmetic and the definition of base/current period in node c12_app_cbse_08_005.

## WORKED_EXAMPLE_1
PROBLEM: The price of petrol in Delhi was ₹69.50/litre in January 2018 (base period). In January 2019 it was ₹72.80, in January 2020 it was ₹75.40, in January 2021 it was ₹83.70, and in January 2022 it was ₹95.40. Compute the relative price index for each year and construct the index series. Interpret the 2022 index for a consumer.
STEPS:
- Step 1: Identify base period price $p_0 = 69.50$ (Jan 2018). Base index $I_{2018} = 100$ by definition.
- Step 2: For each subsequent year, apply formula $I_n = \frac{p_n}{p_0} \times 100$. 
  - 2019: $I = \frac{72.80}{69.50} \times 100 = 104.75$
  - 2020: $I = \frac{75.40}{69.50} \times 100 = 108.49$
  - 2021: $I = \frac{83.70}{69.50} \times 100 = 120.43$
  - 2022: $I = \frac{95.40}{69.50} \times 100 = 137.27$
- Step 3: Construct index series table with columns: Year, Price (₹/litre), Relative Index.
- Step 4: Interpret 2022 index: 137.27 means petrol price in Jan 2022 was 137.27% of Jan 2018 price, i.e., a 37.27% increase over 4 years.
- Step 5: Verify: % change from 2018 to 2022 = $\frac{95.40 - 69.50}{69.50} \times 100 = 37.27\%$, matches index − 100.
REASONING: The relative index converts absolute prices to a common base-100 scale, enabling direct comparison of percentage changes across time. The step-by-step arithmetic ensures no unit or decimal errors. Verification via direct % change formula confirms correctness.
ANSWER: Index Series: 2018=100, 2019=104.75, 2020=108.49, 2021=120.43, 2022=137.27. Petrol price rose 37.27% from Jan 2018 to Jan 2022.

## WORKED_EXAMPLE_2
PROBLEM: A farmer produced 120 quintals of wheat in 2017-18 (base year). Production in subsequent years: 2018-19 = 135 quintals, 2019-20 = 110 quintals, 2020-21 = 145 quintals. Compute relative quantity indices and determine in which year production decline was steepest relative to base year.
STEPS:
- Step 1: Base quantity $Q_0 = 120$ quintals (2017-18). Base index = 100.
- Step 2: Compute quantity index $I_n = \frac{Q_n}{Q_0} \times 100$ for each year:
  - 2018-19: $\frac{135}{120} \times 100 = 112.5$
  - 2019-20: $\frac{110}{120} \times 100 = 91.67$
  - 2020-21: $\frac{145}{120} \times 100 = 120.83$
- Step 3: Calculate % change from base for each: 2018-19: +12.5%, 2019-20: −8.33%, 2020-21: +20.83%.
- Step 4: Identify steepest decline: 2019-20 has index 91.67 (< 100), meaning 8.33% below base. This is the only year with decline.
- Step 5: Interpret: The drought/flood in 2019-20 (hypothetical cause) caused production to fall 8.33% below the 2017-18 level.
REASONING: Quantity indices work identically to price indices but measure volume changes. The index < 100 directly signals a decrease from base. Comparing indices (91.67 vs 112.5 vs 120.83) instantly shows 2019-20 as the only below-base year.
ANSWER: Quantity Indices: 2017-18=100, 2018-19=112.5, 2019-20=91.67, 2020-21=120.83. Steepest (and only) decline relative to base: 2019-20 at 8.33% below base.

## WORKED_EXAMPLE_3
PROBLEM: (JEE Main / CUET style) The relative price index of commodity X in 2020 with base 2015 is 125. The relative price index of commodity Y in 2020 with base 2015 is 160. In 2015, the price of X was ₹200/kg and price of Y was ₹50/kg. A consumer buys 10 kg of X and 20 kg of Y in both years. Compute the percentage increase in the consumer's total expenditure on these two commodities from 2015 to 2020. (Combines relative index with expenditure calculation)
STEPS:
- Step 1: Use indices to find 2020 prices. For X: $I_X = 125 = \frac{p_{X,2020}}{200} \times 100 \Rightarrow p_{X,2020} = 250$. For Y: $I_Y = 160 = \frac{p_{Y,2020}}{50} \times 100 \Rightarrow p_{Y,2020} = 80$.
- Step 2: Compute 2015 expenditure: $E_{2015} = (200 \times 10) + (50 \times 20) = 2000 + 1000 = ₹3000$.
- Step 3: Compute 2020 expenditure (same quantities): $E_{2020} = (250 \times 10) + (80 \times 20) = 2500 + 1600 = ₹4100$.
- Step 4: Compute % increase in expenditure: $\frac{4100 - 3000}{3000} \times 100 = \frac{1100}{3000} \times 100 = 36.67\%$.
- Step 5: Verify via weighted index logic: Expenditure weights in base: X = 2000, Y = 1000. Weighted price index = $\frac{2000 \times 125 + 1000 \times 160}{3000} = \frac{250000 + 160000}{3000} = 136.67$. % increase = 36.67%. Matches.
REASONING: This problem tests if students can reverse-engineer prices from indices (common in competitive exams) and connect relative indices to real expenditure impact. The weighted index verification shows the link to aggregate methods (next node).
ANSWER: 2020 prices: X = ₹250/kg, Y = ₹80/kg. Total expenditure rose from ₹3000 to ₹4100, a 36.67% increase.

## COMPETENCY_QUESTION_1
QUESTION: The wholesale price of onions in a mandi was ₹1,200/quintal in 2018 (base). In 2019 it rose to ₹1,800, in 2020 it fell to ₹900, and in 2021 it rose to ₹2,100. A trader claims: "Onion prices in 2021 are 75% higher than in 2019." Use relative index numbers to verify this claim. Is the trader correct? Explain your reasoning.
COMPETENCY: Analytical reasoning with index numbers — interpreting and comparing indices across non-base periods.
STEPS:
- Step 1: Compute all indices with base 2018: 2018=100, 2019=$\frac{1800}{1200}\times100=150$, 2020=$\frac{900}{1200}\times100=75$, 2021=$\frac{2100}{1200}\times100=175$.
- Step 2: Trader compares 2021 to 2019 (not base). To verify, compute index of 2021 with 2019 as base: $\frac{2100}{1800}\times100 = 116.67$.
- Step 3: This means 2021 price is 116.67% of 2019 price → 16.67% increase, not 75%.
- Step 4: Trader likely computed $\frac{175-100}{100} \times 100 = 75\%$ (comparing 2021 index to base 100) or misread the indices.
ANSWER: Trader is incorrect. 2021 price is 16.67% higher than 2019, not 75%. The 75% figure would be the increase from 2018 (base) to 2021. This tests understanding that index comparisons must use same base or be re-based.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: (Case-based) The government constructs a "Food Price Index" for policy decisions. For rice, the base year (2015-16) price is ₹20/kg and current year (2022-23) price is ₹35/kg. For wheat, base price is ₹18/kg and current price is ₹27/kg. The index uses relative price indices with base = 100. 
(a) Compute the relative price index for rice and wheat. 
(b) If the index is a simple average of the two relatives, what is the Food Price Index for 2022-23? 
(c) A critic argues: "This index overstates food inflation because it gives equal weight to rice and wheat, but a typical household spends 70% of its grain budget on rice and 30% on wheat." Compute the weighted average of relatives index using expenditure weights and compare. Which index better reflects the household's cost of living?
COMPETENCY: Application of relative indices to policy context; evaluation of weighting methods; connection to Laspeyres index concept.
STEPS:
- Step 1: Rice index = $\frac{35}{20} \times 100 = 175$. Wheat index = $\frac{27}{18} \times 100 = 150$.
- Step 2: Simple average of relatives = $\frac{175 + 150}{2} = 162.5$.
- Step 3: Weighted average of relatives (expenditure weights): Rice weight = 70, Wheat weight = 30. Index = $\frac{175 \times 70 + 150 \times 30}{70 + 30} = \frac{12250 + 4500}{100} = 167.5$.
- Step 4: Compare: Simple average = 162.5 (62.5% increase), Weighted = 167.5 (67.5% increase). Weighted index is higher because rice (higher inflation: 75% vs 50%) gets higher weight.
- Step 5: The weighted index better reflects household cost of living because it accounts for actual expenditure patterns. Simple average treats both commodities as equally important, which is unrealistic.
ANSWER: (a) Rice=175, Wheat=150. (b) Simple average index = 162.5. (c) Weighted index = 167.5. Weighted index better reflects cost of living as it incorporates actual consumption weights. This foreshadows Laspeyres index (next node).
DIFFICULTY: hard