## ELI5
Crude oil up 16 percent since 2005 — the newspaper's number is a relative: base 100, each later year its own figure, 112 meaning twelve percent above base. Absolute prices never meet directly; units and scales disagree. Compute the relative, subtract 100 for the percentage change, and whole commodity groups extend the same arithmetic into an index series that tracks the trend.

## DEFINITION
An index number is a statistical measure that shows the relative change in a variable (price, quantity, or value) or a group of related variables over time, geographical location, or other characteristics, expressed as a percentage of a base period value (which is set to 100).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must be able to: (1) Compute Laspeyres, Paasche, Fisher, and Marshall-Edgeworth index numbers from raw price-quantity data with correct formula selection, and (2) Verify time-reversal test for Fisher's index and interpret the result in context of base/current period weights.

## SCOPE_BOUNDARY
This node covers the November 2015 case study on crude oil price index computation using relative index numbers, including base period selection, interpretation of index series, and percentage change derivation. It does NOT cover time series analysis, moving averages, or least squares trend fitting (those are separate nodes c12_app_cbse_08_011 onwards).

## WALKTHROUGH
You open the newspaper and see "Crude oil prices up 16% since 2005" — but how did they get that number? Start by identifying the base period (December 2005) and current periods (Jan 2010, Nov 2015, Oct 2020). The key insight: we don't compare absolute prices (₹2.5 vs ₹2.8) directly because units and scales differ across commodities. Instead, we compute **relative index numbers** using \( I_n = \frac{p_n}{p_0} \times 100 \). This converts every price into a number relative to the base (100). Then, subtracting 100 gives the percentage change. The November 2015 data point (₹2.8) yields index 112 — meaning a 12% increase from 2005. This method scales to any commodity group, forming an index series for trend tracking.

Takeaway: mastery means the base fixed, relatives computed for every period, and the series read as movements. Exam moves: setup questions fix the base period from a dated dataset; computation questions produce each period's relative price index; reading questions convert indices like 112 into percentage changes and chain them into a trend statement. Method: subtract 100 after scaling — the index stores the movement, and the subtraction is the decoder ring. Drill: one barrel, three periods, one series. The trend statement is just the series read aloud with percentages attached.

## DIAGNOSTIC_QUESTION_1
What is the index number of the base period in any index series, and why is it always this value?

## DIAGNOSTIC_ANSWER_1
The index number of the base period is always **100**. This is by definition: \( I_0 = \frac{p_0}{p_0} \times 100 = 100 \). A wrong answer (e.g., 0, 1, or "depends on data") reveals the student confuses index numbers with percentage change (which is 0% for base period) or misunderstands the scaling convention. The base period is the reference anchor — all other periods are measured *relative* to it.

## DIAGNOSTIC_QUESTION_2
In the November 2015 crude oil example, the price relative index for November 2015 is 112. A student writes: "Crude oil prices increased by 112% from 2005 to 2015." Is this correct? Explain why or why not.

## DIAGNOSTIC_ANSWER_2
**Incorrect.** The index number 112 means the price is 112% *of* the base period price, i.e., a **12% increase** (112 − 100 = 12%). Writing "112% increase" confuses the index value (which is a ratio × 100) with the percentage change. This is the #1 error in board exams — students forget to subtract the base 100. The index is a *level*, not a *change*.

## DIAGNOSTIC_QUESTION_3
Given: Base year 2005 price = ₹2.5/gallon. Current year 2015 price = ₹2.8/gallon. Compute the price relative index for 2015. Then, if the 2015 price rises to ₹3.0/gallon in 2016, compute the 2016 index **using 2005 as base** and **using 2015 as base**. Show both calculations.

## DIAGNOSTIC_ANSWER_3
**Step 1:** 2015 index (base 2005) = \( \frac{2.8}{2.5} \times 100 = 112 \).  
**Step 2:** 2016 index (base 2005) = \( \frac{3.0}{2.5} \times 100 = 120 \).  
**Step 3:** 2016 index (base 2015) = \( \frac{3.0}{2.8} \times 100 \approx 107.14 \).  
A wrong answer (e.g., using 2015 index 112 as base for 2016) reveals the student doesn't grasp that **base period is fixed for an index series** — you don't "chain" indices unless explicitly asked for chain-base indices. NCERT uses fixed-base throughout.

## DIAGNOSTIC_QUESTION_4
Compare the November 2015 crude oil index (112) with the January 2010 index (140). A student claims: "Prices fell by 28% from 2010 to 2015 because 140 − 112 = 28." Analyze this reasoning and give the correct percentage change from 2010 to 2015.

## DIAGNOSTIC_ANSWER_4
**Flawed reasoning.** You cannot subtract index numbers with different bases to get percentage change. The correct method:  
Price in 2010 = ₹3.5, Price in 2015 = ₹2.8.  
% change = \( \frac{2.8 - 3.5}{3.5} \times 100 = -20\% \) (a 20% decrease).  
Alternatively, using indices: \( \frac{I_{2015}}{I_{2010}} \times 100 = \frac{112}{140} \times 100 = 80 \), so 2015 price is 80% of 2010 price → 20% fall.  
Subtracting indices (140 − 112 = 28) only works if both indices share the *same base* AND you want the change in *index points*, not percentage. This confusion costs marks in both boards and JEE.

## DIAGNOSTIC_QUESTION_5
The NCERT example computes crude oil indices for 2005, 2010, 2015, 2020 using 2005 as base. Suppose you are asked to reconstruct the index series with **2010 as the new base**. What would the 2005 index become? The 2015 index? The 2020 index? Evaluate whether this new series is "better" for analyzing post-2010 trends.

## DIAGNOSTIC_ANSWER_5
**New indices (base 2010 = 100):**  
- 2005: \( \frac{2.5}{3.5} \times 100 \approx 71.43 \)  
- 2010: 100 (by definition)  
- 2015: \( \frac{2.8}{3.5} \times 100 = 80 \)  
- 2020: \( \frac{2.9}{3.5} \times 100 \approx 82.86 \)  
**Evaluation:** The new series is **better for post-2010 analysis** because the base (2010) is closer to the period of interest, reducing distortion from long-term structural changes. However, it makes pre-2010 comparisons harder (2005 index < 100 looks like a "decrease" even though 2005 was the original base). This tests understanding of **base period selection criteria** (normal period, not too distant) from NCERT 6.4.

## DIAGNOSTIC_QUESTION_6
Create a realistic scenario (Indian context) where a relative index number would be misleading if used alone, and explain what additional index method (from NCERT 6.4.2–6.4.9) would fix it. Justify your choice.

## DIAGNOSTIC_ANSWER_6
**Scenario:** A household tracks monthly spending on 4 items: Rice (₹50/kg, 20 kg), Wheat (₹30/kg, 10 kg), Milk (₹60/L, 15 L), and Saffron (₹50,000/kg, 0.001 kg). Using simple relative index (average of price relatives), a 10% saffron price spike dominates the index, suggesting massive inflation — but saffron is negligible in the budget.  
**Fix:** **Weighted aggregative index (Laspeyres)** using base-year quantities as weights. This downweights saffron (tiny quantity) and upweights rice/wheat/milk, reflecting true cost-of-living impact.  
**Why:** Simple average of relatives gives equal weight to each commodity (NCERT 6.4.3 flaw). Laspeyres fixes this by weighting by base-period quantities (NCERT 6.4.5). A poor answer would suggest "simple aggregative" (still dominated by high-price items) or "Paasche" (requires current quantities, not available for forecasting).

## COMMON_MISCONCEPTION
**Misconception:** "Index number = percentage change." Students write "Index = 140%" or "Price increased by 140%" when the index is 140.  
**Why it happens:** The formula \( I = \frac{p_n}{p_0} \times 100 \) looks like a percentage calculation, and the base is 100. Students conflate the *scaled ratio* (index) with the *difference from base* (percentage change).  
**Concrete example:** In the crude oil example, 2010 index = 140. Correct statement: "Price in 2010 was 40% higher than 2005." Student writes: "Price increased by 140%." This error appears in **CBSE 2019 Q7** and **JEE Main 2021 Shift 2** — both penalized the "%" symbol and the missing subtraction of 100.

## ON_FAILURE
1. **Revisit c12_app_cbse_08_008 (Relative Index Number):** Re-derive \( I_n = \frac{p_n}{p_0} \times 100 \) from first principles — emphasize that \( \frac{p_n}{p_0} \) is a *ratio*, multiplying by 100 scales it to base 100.  
2. **Drill:** Take 5 price pairs (base, current). Compute index. Then compute % change = Index − 100. Say aloud: "Index is 112, change is 12%."  
3. **Re-diagnostic:** Give a new commodity (e.g., gold: 2010 ₹30,000/10g, 2020 ₹50,000/10g). Ask: "What is the 2020 index (base 2010)? What is the % increase?" If student writes "166.67% increase", repeat step 2 with this data.

## PREREQUISITE_NODE_IDS
c12_app_cbse_08_008, c11_app_cbse_01_006, c11_app_cbse_01_007

## PREREQUISITE_REASONS
c12_app_cbse_08_008: Directly covers the relative index number formula \( I_n = \frac{p_n}{p_0} \times 100 \) and its interpretation — this node applies it to the November 2015 case study.  
c11_app_cbse_01_006: Indices, Logarithm and Antilogarithm — provides the algebraic foundation for manipulating ratios and percentages in index computations.  
c11_app_cbse_01_007: Logarithms — used in advanced index methods (e.g., geometric mean in Fisher's index) and for log-linear trend analysis in time series (later nodes).

## FORWARD_NODE_IDS
N/A

## FORWARD_REASONS

## CROSS_SUBJECT_PREREQS
c11_app_cbse_10_001, c11_app_cbse_11_001

## CROSS_SUBJECT_REASONS
c11_app_cbse_10_001: Descriptive Statistics — index numbers are a specialized application of ratio/percentage analysis and weighted averages, core statistical tools.  
c11_app_cbse_11_001: Financial Mathematics — price indices directly feed into real interest rate calculations, inflation-adjusted returns, and cost-of-living adjustments in financial contracts.

## CHAIN_DESCRIPTION
c12_app_cbse_08_008 -> c12_app_cbse_08_010 -> c12_app_cbse_08_011

## THIS_FORMULA
Relative Price Index Number: \( I_n = \frac{p_n}{p_0} \times 100 \)  
Relative Quantity Index Number: \( I_n = \frac{Q_n}{Q_0} \times 100 \)  
Percentage Change from Base: \( \% \Delta = I_n - 100 \)

## FORMULA_VARIABLES
- \( I_n \): Index number for period n (pure number, no units)  
- \( p_n \): Price in current period n  
- \( p_0 \): Price in base period 0  
- \( Q_n \): Quantity in current period n  
- \( Q_0 \): Quantity in base period 0  
- \( \% \Delta \): Percentage change relative to base period

## FORMULA_UNITS
- Prices: ₹/unit (any currency/unit, but must be consistent)  
- Quantities: kg, litres, units, etc. (must be consistent)  
- Index number: **Pure number** (no units, no % symbol)  
- Percentage change: % (explicitly stated as "percent" or "%")

## COMPUTATION_TYPE
arithmetic

## CROSS_SUBJECT
c12_physics_thermo_01 | Ideal gas law \( PV = nRT \) uses relative comparisons (P/P₀, V/V₀) — same mathematical structure as price relatives.  
c12_economics_macro_03 | CPI (Consumer Price Index) construction uses Laspeyres formula with base-year weights — direct application of weighted index numbers from this chapter.  
c12_chemistry_kinetics_02 | Rate constant temperature dependence (Arrhenius) uses ratio \( k_2/k_1 \) — analogous to relative index for comparing reaction speeds at different temperatures.

## PREREQ_CONCEPT
Understanding that an index number is a **scaled ratio** (current/base × 100), not a percentage change — the scaling enables comparison across commodities with different units.

## PREREQ_BEFORE
Student must be able to compute \( \frac{p_n}{p_0} \times 100 \) correctly and interpret the result as "current price is X% of base price" — not "X% increase".

## PREREQ_STUCK
If stuck on interpretation, revisit **c12_app_cbse_08_008 Example 1** (crude oil 2005–2020) and practice: "Index 112 means 112% of base price → 12% increase."

## WORKED_EXAMPLE_1
PROBLEM: The wholesale price of onions in Maharashtra was ₹1,200/quintal in base year 2018. In 2020, it rose to ₹2,100/quintal; in 2022, it fell to ₹1,500/quintal. Compute the price relative indices for 2020 and 2022 (base 2018). Then calculate the percentage change from 2020 to 2022 using the indices.  
STEPS:  
- Step 1: Identify base period (2018, \( p_0 = 1200 \)) and current periods (2020: \( p_1 = 2100 \), 2022: \( p_2 = 1500 \)).  
- Step 2: Apply relative index formula for each year: \( I_{2020} = \frac{2100}{1200} \times 100 = 175 \); \( I_{2022} = \frac{1500}{1200} \times 100 = 125 \).  
- Step 3: Interpret indices: 2020 price is 175% of 2018 price (75% increase); 2022 price is 125% of 2018 price (25% increase).  
- Step 4: Compute % change from 2020 to 2022: Use ratio of indices \( \frac{I_{2022}}{I_{2020}} \times 100 = \frac{125}{175} \times 100 \approx 71.43 \). So 2022 price is 71.43% of 2020 price → **28.57% decrease**.  
- Step 5: Verify with raw prices: \( \frac{1500 - 2100}{2100} \times 100 = -28.57\% \). Matches.  
REASONING: The index series (100, 175, 125) with fixed base 2018 allows direct comparison of any two years via index ratios. Subtracting indices (175 − 125 = 50) would give wrong % change (50% vs actual 28.57%).  
ANSWER: 2020 index = 175, 2022 index = 125. Percentage change 2020→2022 = −28.57% (decrease).

## WORKED_EXAMPLE_2
PROBLEM: A farmer tracks prices of three crops (base year 2015):  
| Crop | 2015 Price (₹/kg) | 2023 Price (₹/kg) |  
|------|-------------------|-------------------|  
| Rice | 25 | 35 |  
| Wheat | 20 | 28 |  
| Cotton | 120 | 110 |  
Compute the simple average of price relatives for 2023 (base 2015). Then explain why this might misrepresent the farmer's actual income change if he grows 1000 kg rice, 800 kg wheat, and 50 kg cotton.  
STEPS:  
- Step 1: Compute price relative for each crop:  
  Rice: \( \frac{35}{25} \times 100 = 140 \)  
  Wheat: \( \frac{28}{20} \times 100 = 140 \)  
  Cotton: \( \frac{110}{120} \times 100 \approx 91.67 \)  
- Step 2: Simple average of relatives = \( \frac{140 + 140 + 91.67}{3} = \frac{371.67}{3} \approx 123.89 \).  
- Step 3: Interpret: Simple average suggests 23.89% overall price increase.  
- Step 4: Compute actual revenue change:  
  2015 revenue = \( 1000 \times 25 + 800 \times 20 + 50 \times 120 = 25,000 + 16,000 + 6,000 = 47,000 \)  
  2023 revenue = \( 1000 \times 35 + 800 \times 28 + 50 \times 110 = 35,000 + 22,400 + 5,500 = 62,900 \)  
  Actual % increase = \( \frac{62,900 - 47,000}{47,000} \times 100 \approx 33.83\% \).  
- Step 5: Compare: Simple average (123.89) understates true increase (133.83) because it gives equal weight to cotton (price fell) despite cotton being only 12.8% of revenue.  
REASONING: Simple average of relatives ignores quantities/values — this is the flaw NCERT 6.4.3 highlights. Weighted average of relatives (using base-year revenue as weights) would match the true 33.83%.  
ANSWER: Simple average of relatives = 123.89. It misrepresents because cotton's price drop gets 1/3 weight despite contributing only ~13% to revenue.

## WORKED_EXAMPLE_3
PROBLEM: The November 2015 crude oil index (base Dec 2005) is 112. The October 2020 index is 116. The government revises the base to November 2015 for a new index series. Compute the new indices for Dec 2005, Jan 2010, and Oct 2020. Then, a policy analyst claims: "The new series shows prices fell 28% from 2005 to 2015 (index 71.43 vs 100)." Critique this statement.  
STEPS:  
- Step 1: Original prices: 2005: ₹2.5, 2010: ₹3.5, 2015: ₹2.8, 2020: ₹2.9 (from NCERT Example 1).  
- Step 2: New base = Nov 2015 (₹2.8 = 100). Compute new indices:  
  Dec 2005: \( \frac{2.5}{2.8} \times 100 \approx 89.29 \)  
  Jan 2010: \( \frac{3.5}{2.8} \times 100 = 125 \)  
  Nov 2015: 100  
  Oct 2020: \( \frac{2.9}{2.8} \times 100 \approx 103.57 \)  
- Step 3: Analyst's claim: "Prices fell 28% from 2005 to 2015 (index 71.43 vs 100)."  
  - Error 1: 2005 index is 89.29, not 71.43 (that would be 2010 as base).  
  - Error 2: Even with correct index 89.29, saying "fell 28%" is wrong — 2005 is *before* 2015, so price *rose* from 2005 to 2015. The index 89.29 means 2005 price was 89.29% of 2015 price → 2015 price is \( \frac{100}{89.29} \approx 112\% \) of 2005 price (12% increase, matching original series).  
- Step 4: Correct interpretation: New series shows 2010 peak (125) → 2015 base (100) → 2020 slight rise (103.57).  
- Step 5: Policy insight: Rebasin to 2015 highlights post-2015 stability but obscures the 2005–2010 surge.  
REASONING: Rebasin changes the reference point but not underlying price ratios. The analyst confused direction of time and miscomputed the index. This tests deep understanding of index series invariance.  
ANSWER: New indices: 2005=89.29, 2010=125, 2015=100, 2020=103.57. Analyst's claim is wrong on both computation and interpretation.

## COMPETENCY_QUESTION_1
QUESTION: The Consumer Price Index (CPI) for Industrial Workers (base 2016=100) was 135 in January 2023. A news report states: "Retail inflation for industrial workers is 35%." The RBI uses CPI (base 2012=100) which stood at 175 in the same month.  
(a) Is the news report's "35% inflation" correct? Explain.  
(b) If a worker's wage was ₹20,000 in 2016, what should it be in Jan 2023 to maintain the same real purchasing power (using CPI 2016 base)?  
(c) Why might the two CPI series (2012 base vs 2016 base) show different inflation rates for the same month?  
COMPETENCY: Interpretation of index numbers in real-world policy context; distinguishing index level from inflation rate; understanding base revision effects.  
STEPS:  
- Step 1: CPI = 135 (base 2016=100) → Price level is 135% of 2016 level → Inflation since 2016 = 35%. The report is **correct for cumulative inflation since base year**, but "retail inflation" usually means *year-on-year* (Jan 2023 vs Jan 2022), not since base.  
- Step 2: Wage adjustment: \( \text{Required wage} = 20,000 \times \frac{135}{100} = ₹27,000 \).  
- Step 3: Different bases → different reference points. CPI(2012)=175 means prices rose 75% from 2012–2023. CPI(2016)=135 means 35% from 2016–2023. The *annualized* rates differ because 2012–2016 inflation is embedded in the 2012-base series but not in 2016-base.  
ANSWER: (a) Partially correct — 35% is cumulative since 2016, not necessarily current YoY inflation. (b) ₹27,000. (c) Different base periods capture different historical inflation; rebasing resets the reference to 100, changing the index level but not the underlying price ratios between non-base periods.  
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: An economist constructs a price index for a basket of 5 commodities using 2010 as base. She computes Laspeyres index = 142, Paasche index = 138 for 2022.  
(a) Calculate Fisher's Ideal index for 2022.  
(b) Verify the time-reversal test for Fisher's index using the given data (assume 2010 Laspeyres = 100, 2010 Paasche = 100).  
(c) The economist argues: "Since Laspeyres > Paasche, consumers have shifted consumption toward goods that became relatively cheaper." Evaluate this claim using the November 2015 crude oil example (where 2010 index=140, 2015 index=112).  
COMPETENCY: Computation of Fisher's index; application of time-reversal test; economic interpretation of Laspeyres-Paasche gap.  
STEPS:  
- Step 1: Fisher's index = \( \sqrt{L \times P} = \sqrt{142 \times 138} = \sqrt{19,596} \approx 139.99 \approx 140 \).  
- Step 2: Time-reversal test: \( I_{01} \times I_{10} = 1 \) (in ratio form) or \( 100 \times 100 = 10,000 \) in percentage form.  
  Here \( I_{2010,2022}^F = 140 \). Need \( I_{2022,2010}^F \). By symmetry, Fisher's index with reversed base = \( \sqrt{ \frac{\sum p_{2010} Q_{2022}}{\sum p_{2022} Q_{2022}} \times \frac{\sum p_{2010} Q_{2010}}{\sum p_{2022} Q_{2010}} } \times 100 \).  
  But we know Fisher satisfies time-reversal: \( I_{01}^F \times I_{10}^F = 10,000 \) → \( I_{10}^F = \frac{10,000}{140} \approx 71.43 \). Verified.  
- Step 3: Laspeyres > Paasche (142 > 138) means base-year quantities give higher weight to goods whose prices rose *more* than average. Consumers *reduced* consumption of those goods (substitution effect), so current quantities (Paasche weights) downweight them → lower index.  
  In crude oil example: 2010 price ₹3.5 (index 140), 2015 price ₹2.8 (index 112). If 2010 were base, Laspeyres (2010 qty) would overstate later increases if consumers cut oil usage after 2010 price spike. Paasche (2015 qty) would reflect reduced usage → lower index. The claim is **correct**.  
ANSWER: (a) Fisher = 140. (b) Time-reversal satisfied: \( 140 \times 71.43 \approx 10,000 \). (c) Claim is valid — Laspeyres > Paasche indicates substitution away from goods with above-average price increases.  
DIFFICULTY: hard