## ELI5
Imagine you want to compare the price of crude oil today with its price in January 2010, but the units are in different currencies (rupees vs dollars) and the quantities are in different measures (barrels vs gallons). A **relative index number** acts like a universal translator: it converts every price into a pure number where January 2010 = 100. If today's index is 140, it means prices are 40% higher than the January 2010 baseline — no currency conversion or unit math needed. The most common mix-up is treating the index number 140 as "140%" and saying "prices increased by 140%," when actually the increase is only 40% (140 − 100).

## DEFINITION
A relative index number for a given period expresses the price (or quantity) of that period as a percentage of the price (or quantity) in a chosen base period, calculated as $I_n = \frac{p_n}{p_0} \times 100$ where $p_0$ is the base period value and $p_n$ is the current period value. The base period index is always fixed at 100, making the index a unit-free pure number that enables direct comparison across time, commodities, or regions.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must be able to: (1) compute a relative price/quantity index for any current period given base period data, (2) interpret the index value to state the exact percentage change from the base period, and (3) construct an index series table for multiple periods using a single base period.

## SCOPE_BOUNDARY
This node covers the computation and interpretation of **relative (price/quantity) index numbers** and **index series** using a fixed base period, as introduced in NCERT Section 6.4.1 with the crude oil example (December 2005, January 2010, November 2015, October 2020). It does NOT cover aggregate methods (simple/weighted), Laspeyres/Paasche/Fisher indices, or time series analysis — those are in sibling nodes c12_app_cbse_08_007, c12_app_cbse_08_008, and c12_app_cbse_08_010.

## WALKTHROUGH
Suppose you see a news headline: "Crude oil prices surged 40% since January 2010!" How do they get that number? Start with the raw data: January 2010 price = ₹3.5 thousand/gallon, December 2005 (base) price = ₹2.5 thousand/gallon. The relative index formula $I = \frac{p_{\text{current}}}{p_{\text{base}}} \times 100$ converts this to $\frac{3.5}{2.5} \times 100 = 140$. The "40% surge" comes from $140 - 100 = 40\%$. Now extend this: if November 2015 price was ₹2.8, its index is $\frac{2.8}{2.5} \times 100 = 112$ (a 12% rise from base). Tabulating all periods with the same base (2005 = 100) creates an **index series** — a ready-to-compare timeline. The key insight: the index strips away units (rupees, gallons, dollars) and leaves a pure number that answers "how many times the base price?" instantly.

Takeaway: mastery means the relative computed, the surge read off the excess over 100, and a whole series tabulated on one base. Exam moves: computation questions divide current by base and scale to 100 for price or quantity; interpretation questions convert index minus 100 into the headline percentage; series questions tabulate several periods against the unchanging base for trend reading. Method: the index strips the units so the headline can quote pure numbers — and the headline's percentage is always the index minus 100. Drill: one headline, two periods, one tabulated series. Units, currencies, and measures all stay out of the comparison by design.

## DIAGNOSTIC_QUESTION_1
What is the relative price index number for a commodity in the base period itself, and why is it always that value regardless of the actual price?

## DIAGNOSTIC_ANSWER_1
The relative price index for the base period is always **100**. This is because $I_0 = \frac{p_0}{p_0} \times 100 = 1 \times 100 = 100$. A wrong answer (e.g., "it depends on the price" or "it is the actual price") reveals the student has not internalized that the index is a *ratio* normalized to 100, not the raw price itself. They are confusing the *value* with its *relative measure*.

## DIAGNOSTIC_QUESTION_2
In the crude oil example, the January 2010 index is 140. A student says: "This means the price in January 2010 was 140% of the base price, so the increase is 140%." Is the student correct? Explain why or why not.

## DIAGNOSTIC_ANSWER_2
The student is **incorrect**. The index 140 means the current price is 140% *of* the base price (i.e., 1.4 times the base price). The **percentage increase** is $140 - 100 = 40\%$, not 140%. A wrong answer reveals the classic confusion between "percentage *of*" and "percentage *increase over*". The index value includes the base 100; the change is the deviation from 100.

## DIAGNOSTIC_QUESTION_3
The price of wheat was ₹1,200 per quintal in 2015 (base year) and ₹1,560 per quintal in 2023. Compute the relative price index for 2023 with 2015 as base. Then, if the 2024 price is ₹1,680, compute the 2024 index *using the same 2015 base*. What is the percentage increase from 2023 to 2024? (Hint: you cannot simply subtract the two indices.)

## DIAGNOSTIC_ANSWER_3
**Step 1:** 2023 index = $\frac{1560}{1200} \times 100 = 130$. **Step 2:** 2024 index (base 2015) = $\frac{1680}{1200} \times 100 = 140$. **Step 3:** Percentage increase from 2023 to 2024 = $\frac{1680 - 1560}{1560} \times 100 = \frac{120}{1560} \times 100 \approx 7.69\%$. *Not* $140 - 130 = 10\%$. A wrong answer (e.g., 10%) reveals the student thinks index differences directly give period-to-period percentage changes, which is false unless the base is the earlier period. Indices with a common fixed base are not chainable by subtraction.

## DIAGNOSTIC_QUESTION_4
An index series for rice prices (base 2010 = 100) shows: 2012 = 115, 2014 = 125, 2016 = 110. A student claims: "Prices fell between 2014 and 2016 because the index dropped from 125 to 110." Is this claim valid? Justify using the definition of a fixed-base index series.

## DIAGNOSTIC_ANSWER_4
**Yes, the claim is valid.** In a fixed-base index series, every index is computed relative to the *same* base period (2010). Since $I_{2014} = 125$ means the 2014 price is 1.25 times the 2010 price, and $I_{2016} = 110$ means the 2016 price is 1.10 times the 2010 price, the 2016 price is lower than the 2014 price in absolute terms. The drop from 125 to 110 directly reflects a price decline. A wrong answer (e.g., "we can't compare because base is 2010") reveals the student misunderstands that a fixed-base series *enables* direct comparison of any two periods via their indices — the common denominator (base price) cancels out.

## DIAGNOSTIC_QUESTION_5
Critique this statement: "Relative index numbers are superior to simple aggregative index numbers because they are not affected by the units of measurement of commodities." Is this fully accurate? Explain with reference to the NCERT example of commodities A, B, C, D (Example 3 vs Example 4).

## DIAGNOSTIC_ANSWER_5
The statement is **partially correct but incomplete**. Relative indices (price relatives) *are* unit-free because each commodity's index is a ratio of its own prices ($p_n/p_0$), so units cancel. However, the **simple average of relatives** (Example 4) gives equal weight to each commodity's relative, ignoring their economic importance (quantities/values). The NCERT shows commodity C (price ~₹148) dominates the simple aggregative index (Example 3), but in Example 4, C's relative (101) gets the same weight as A's (119) and D's (132), which may not reflect actual expenditure patterns. A "superior" index must also account for weights — which leads to weighted methods. A student missing this nuance thinks unit-invariance is the only criterion for a good index.

## DIAGNOSTIC_QUESTION_6
Create a realistic scenario (Indian context) where a relative quantity index would be more informative than a relative price index. Specify the base period, current period, the variable measured, and explain what the index value would tell a policymaker.

## DIAGNOSTIC_ANSWER_6
**Scenario:** The Ministry of Agriculture tracks **wheat procurement quantity** (in lakh metric tonnes) by FCI. Base period: 2018-19 (procurement = 341 LMT). Current period: 2023-24 (procurement = 262 LMT). Relative quantity index = $\frac{262}{341} \times 100 \approx 76.8$. This tells the policymaker that procurement has **fallen 23.2% below the 2018-19 level**, signaling potential food stock concerns for PDS/buffer norms. A price index would not reveal this physical shortfall. A poor answer would use a price example or fail to explain why *quantity* (not price) is the relevant variable for stock adequacy.

## COMMON_MISCONCEPTION
**"The index number *is* the percentage change."** Students routinely write: "Index = 140, so percentage change = 140%." This happens because they see the "×100" in the formula and conflate the *scaled ratio* (index) with the *deviation from base* (percentage change). The index includes the base (100); the change is the *excess over 100*. In board exams, this costs 1 mark per instance (e.g., "Calculate the percentage increase" answered as "140%" instead of "40%"). In JEE/CUET, it leads to wrong answers in multi-step problems where the index is used as a multiplier (e.g., real wage = nominal wage / price index × 100).

## ON_FAILURE
1. **Revisit the definition**: Write $I_n = \frac{p_n}{p_0} \times 100$ and $ \% \Delta = I_n - 100 $ side by side. Say aloud: "Index is *ratio × 100*; percentage change is *index minus 100*." 2. **Drill 5 rapid conversions**: Given base price = 200, current prices = 220, 250, 180, 200, 300 → compute index and % change for each. 3. **Re-diagnostic**: Attempt Diagnostic Question 2 and 3 again. If error persists, review node c12_app_cbse_08_005 (Index Number basics) and c11_app_cbse_01_006 (Indices, Logarithm and Antilogarithm) for ratio/proportion fluency.

## PREREQUISITE_NODE_IDS
c12_app_cbse_08_005, c11_app_cbse_01_006

## PREREQUISITE_REASONS
c12_app_cbse_08_005: Introduces the core concept of an index number as a measure of change in related variables — the foundational definition this node operationalizes.
c11_app_cbse_01_006: Covers indices, logarithms, and antilogarithms; essential for fluency with ratio manipulation, percentage scaling, and the algebraic structure of $p_n/p_0 \times 100$.

## FORWARD_NODE_IDS
c12_app_cbse_08_007, c12_app_cbse_08_008

## FORWARD_REASONS
c12_app_cbse_08_007: Builds on relative indices to construct aggregate indices (simple/weighted) for *groups* of commodities — the natural extension from single-item to multi-item indices.
c12_app_cbse_08_008: Deepens the relative index concept into weighted average of relatives and tests of adequacy (unit test, time reversal), which require mastery of the basic relative index mechanics.

## CROSS_SUBJECT_PREREQS
c11_app_cbse_10_001, c11_app_cbse_11_001

## CROSS_SUBJECT_REASONS
c11_app_cbse_10_001: Descriptive Statistics (Class 11) — relative indices are essentially *relative measures* (like coefficient of variation) applied to time-series price/quantity data; the concept of "base = 100" parallels standardization in statistics.
c11_app_cbse_11_001: Financial Mathematics (Class 11) — index numbers are used to compute real returns (adjusting nominal returns for inflation via CPI/WPI), linking directly to present value, future value, and purchasing power calculations.

## CHAIN_DESCRIPTION
c12_app_cbse_08_005 -> c12_app_cbse_08_009 -> c12_app_cbse_08_007, c12_app_cbse_08_008

## THIS_FORMULA
Relative Price Index for period $n$ with base period $0$: $I_n = \frac{p_n}{p_0} \times 100$; Relative Quantity Index: $I_n = \frac{Q_n}{Q_0} \times 100$; Percentage change from base: $\% \Delta = I_n - 100$

## FORMULA_VARIABLES
$p_n$ = price in current period $n$; $p_0$ = price in base period $0$; $Q_n$ = quantity in current period $n$; $Q_0$ = quantity in base period $0$; $I_n$ = index number for period $n$ (unit-free pure number)

## FORMULA_UNITS
All prices in same monetary unit (e.g., ₹/kg, ₹/quintal); all quantities in same physical unit (e.g., kg, tonnes, litres); index $I_n$ has **no units** (pure number)

## COMPUTATION_TYPE
arithmetic

## CROSS_SUBJECT
c12_phy_thermodynamics_01 | Physics: Real vs nominal variables — just as price indices convert nominal prices to real prices, thermodynamic potentials convert energy to "available work" using reference states (analogous to base period).
c12_eco_macro_03 | Economics: CPI/WPI construction — the relative index formula is the building block of Consumer Price Index (weighted average of relatives) and Wholesale Price Index; understanding the base-period mechanics is essential for interpreting inflation data.

## PREREQ_CONCEPT
Ratio and percentage: the index is a ratio scaled to 100; percentage change is the ratio's deviation from 1.

## PREREQ_BEFORE
Student must fluently convert between fractions, decimals, and percentages (e.g., 1.4 = 140% = 40% increase) and understand that $\frac{a}{b} \times 100$ expresses $a$ as a percentage of $b$.

## PREREQ_STUCK
If stuck on "index vs percentage change", review Class 8-10 percentage concepts: "What % of 250 is 350?" (Answer: 140%) vs "By what % did 250 increase to become 350?" (Answer: 40%).

## WORKED_EXAMPLE_1
PROBLEM: The wholesale price of onions in Lasalgaon mandi (Maharashtra) was ₹1,800 per quintal in January 2010 (base month) and ₹3,240 per quintal in November 2015. Compute the relative price index for November 2015. Interpret the result for a farmer deciding whether to store or sell.

STEPS:
- Step 1: Identify base period value $p_0 = 1800$ (₹/quintal) and current period value $p_n = 3240$ (₹/quintal).
- Step 2: Apply the relative price index formula: $I_n = \frac{p_n}{p_0} \times 100$.
- Step 3: Substitute values: $I_n = \frac{3240}{1800} \times 100 = 1.8 \times 100 = 180$.
- Step 4: Compute percentage increase from base: $\% \text{increase} = I_n - 100 = 180 - 100 = 80\%$.
- Step 5: Interpret: The index 180 means November 2015 price is 1.8 times the January 2010 price — an 80% rise. For a farmer, this signals strong price appreciation; storing onions (if storage cost < 80% gain) could be profitable, but perishability risk must be weighed.

REASONING: The formula directly compares two price points using the base as denominator. The ×100 scaling makes the index readable as "percentage of base." The interpretation step connects the abstract number to a real economic decision (storage vs sale), which is the purpose of index numbers per NCERT Section 6.3.

ANSWER: Relative price index for November 2015 = 180. Percentage increase from January 2010 = 80%.

## WORKED_EXAMPLE_2
PROBLEM: Using the crude oil data from NCERT (base: December 2005 = ₹2.5 thousand/gallon), the prices are: January 2010 = ₹3.5, November 2015 = ₹2.8, October 2020 = ₹2.9. Construct the complete index series table. Then answer: Between which two consecutive periods in the series did the price *decrease* the most in percentage terms? (Hint: Use the indices to compute period-to-period changes correctly.)

STEPS:
- Step 1: Compute index for each period using base December 2005 ($p_0 = 2.5$):
  - Dec 2005: $I = \frac{2.5}{2.5} \times 100 = 100$
  - Jan 2010: $I = \frac{3.5}{2.5} \times 100 = 140$
  - Nov 2015: $I = \frac{2.8}{2.5} \times 100 = 112$
  - Oct 2020: $I = \frac{2.9}{2.5} \times 100 = 116$
- Step 2: Tabulate the index series (as in NCERT Table i).
- Step 3: To find period-to-period % change, use $\frac{p_{\text{later}} - p_{\text{earlier}}}{p_{\text{earlier}}} \times 100$ — *not* index difference.
  - 2005→2010: $\frac{3.5-2.5}{2.5} \times 100 = +40\%$
  - 2010→2015: $\frac{2.8-3.5}{3.5} \times 100 = -20\%$
  - 2015→2020: $\frac{2.9-2.8}{2.8} \times 100 \approx +3.57\%$
- Step 4: Compare magnitudes: 20% decrease (2010→2015) is the largest drop.
- Step 5: Verify: Index difference 140→112 = 28 points, but % change = $\frac{112-140}{140} \times 100 = -20\%$ (using 2010 as temporary base). This matches.

REASONING: A fixed-base index series allows comparison of any period to the base, but period-to-period changes require re-basing (using the earlier period as denominator). The index values themselves (140, 112, 116) cannot be subtracted to get % changes — a critical exam trap.

ANSWER: Index series: Dec 2005=100, Jan 2010=140, Nov 2015=112, Oct 2020=116. Largest price decrease: January 2010 to November 2015 (−20%).

## WORKED_EXAMPLE_3
PROBLEM: A construction firm tracks the price of cement (₹/bag) and steel (₹/tonne) over three years. Base year 2019: Cement = ₹320/bag, Steel = ₹45,000/tonne. Year 2021: Cement = ₹384/bag, Steel = ₹54,000/tonne. Year 2022: Cement = ₹400/bag, Steel = ₹51,750/tonne. (a) Compute relative price indices for each commodity for 2021 and 2022 (base 2019). (b) The firm uses cement and steel in a fixed ratio of 500 bags : 10 tonnes per project. Compute the *weighted* relative index for the input basket for 2021 and 2022 using 2019 quantities as weights (Laspeyres-type). (c) Which input drove cost inflation more in 2021 vs 2022?

STEPS:
- Step 1 (a): Cement indices: $I_{2021} = \frac{384}{320} \times 100 = 120$; $I_{2022} = \frac{400}{320} \times 100 = 125$. Steel indices: $I_{2021} = \frac{54000}{45000} \times 100 = 120$; $I_{2022} = \frac{51750}{45000} \times 100 = 115$.
- Step 2 (b): Weights = base year (2019) quantities × base year prices (value weights):
  - Cement weight $W_c = 500 \times 320 = 1,60,000$
  - Steel weight $W_s = 10 \times 45,000 = 4,50,000$
  - Total weight $W = 6,10,000$
- Step 3 (b): Weighted index = $\frac{\sum (I_i \times W_i)}{\sum W_i}$ (Weighted Average of Relatives):
  - 2021: $\frac{(120 \times 160000) + (120 \times 450000)}{610000} = \frac{19200000 + 54000000}{610000} = \frac{73200000}{610000} = 120$
  - 2022: $\frac{(125 \times 160000) + (115 \times 450000)}{610000} = \frac{20000000 + 51750000}{610000} = \frac{71750000}{610000} \approx 117.62$
- Step 4 (c): In 2021, both rose 20% (equal drivers). In 2022, cement rose to 125 (+5% from 2021) but steel fell to 115 (−4.17% from 2021). The *weighted* basket index fell from 120 to 117.62 because steel has higher weight (73.8% of basket value) and its price dropped.
- Step 5: Conclusion: Steel price movement dominates the firm's input cost due to its larger value weight.

REASONING: This extends the single-commodity relative index to a multi-commodity *weighted* index (preview of c12_app_cbse_08_007/008). It shows why relative indices alone are insufficient for decision-making — weights matter. The Laspeyres-type weighting (base year quantities) is exactly what NCERT introduces in Section 6.4.5.

ANSWER: (a) Cement: 2021=120, 2022=125; Steel: 2021=120, 2022=115. (b) Weighted basket index: 2021=120, 2022≈117.62. (c) 2021: both equal; 2022: steel price fall drove overall cost down despite cement rise, due to steel's higher value weight (73.8%).

## COMPETENCY_QUESTION_1
QUESTION: The All-India Consumer Price Index (CPI) for Industrial Workers (base 2016 = 100) was 118.2 in March 2021 and 125.6 in March 2022. A news report states: "Inflation for industrial workers was 7.4 percentage points in 2021-22." Evaluate this statement. Is "7.4 percentage points" the correct description of the change? If not, what is the correct inflation rate, and why does the distinction matter for wage indexation?

COMPETENCY: Interpretation and communication of statistical data (distinguishing index points from percentage change)

STEPS:
- Step 1: Identify the two index values: $I_{\text{Mar 2021}} = 118.2$, $I_{\text{Mar 2022}} = 125.6$.
- Step 2: Compute the index point difference: $125.6 - 118.2 = 7.4$ points. The report calls this "7.4 percentage points."
- Step 3: Compute the actual inflation rate (percentage change): $\frac{125.6 - 118.2}{118.2} \times 100 = \frac{7.4}{118.2} \times 100 \approx 6.26\%$.
- Step 4: Explain the error: "Percentage points" refers to the *absolute difference* between two percentages (or indices). The inflation *rate* is the *relative change* from the starting index. For wage indexation, if DA is linked to CPI, a 6.26% rise means wages should increase by ~6.26%, not 7.4%. Using 7.4% would over-index wages by ~1.14 percentage points.

ANSWER: The statement is incorrect. The index rose by 7.4 *index points*, but the inflation rate is 6.26%. The distinction matters because wage contracts linked to CPI use the percentage change (6.26%), not the point difference (7.4). Confusing the two leads to systematic over-compensation.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: An economist constructs a relative price index for a commodity with base year 2015. The index values for 2018, 2019, 2020 are 130, 143, 128.75 respectively. (a) Calculate the year-on-year inflation rates for 2019 and 2020. (b) The economist claims: "The average annual inflation over 2018-2020 is $\frac{30\% + 10\% - 10\%}{3} = 10\%$." Identify the flaw in this averaging method and compute the correct average annual inflation rate (geometric mean approach). (c) If the base year is shifted to 2018 (so 2018 index = 100), what are the new index values for 2019 and 2020? Show that the year-on-year inflation rates remain unchanged.

COMPETENCY: Analytical reasoning with index numbers (re-basing, geometric mean, invariance of growth rates)

STEPS:
- Step 1 (a): Year-on-year rates use *previous year as base*:
  - 2019 inflation: $\frac{143 - 130}{130} \times 100 = 10\%$
  - 2020 inflation: $\frac{128.75 - 143}{143} \times 100 = -10\%$ (deflation)
- Step 2 (b): Flaw: Arithmetic mean of percentages ignores compounding. Correct method: Geometric mean of growth factors.
  - Growth factors: $1.30$ (2015→2018), $1.10$ (2018→2019), $0.90$ (2019→2020).
  - Overall factor 2015→2020: $1.30 \times 1.10 \times 0.90 = 1.287$ (matches 2020 index 128.75).
  - Average annual factor: $(1.287)^{1/3} \approx 1.0878$ → Average annual inflation ≈ 8.78%.
  - Arithmetic mean (10%) overstates because it doesn't account for the negative year reducing the base.
- Step 3 (c): Re-base to 2018 = 100:
  - 2019 new index = $\frac{143}{130} \times 100 = 110$
  - 2020 new index = $\frac{128.75}{130} \times 100 = 99.04$
  - Verify inflation rates: 2019: $\frac{110-100}{100} \times 100 = 10\%$; 2020: $\frac{99.04-110}{110} \times 100 = -10\%$. Unchanged.

ANSWER: (a) 2019: +10%, 2020: −10%. (b) Arithmetic mean ignores compounding; correct geometric average ≈ 8.78%. (c) New indices: 2019=110, 2020=99.04; year-on-year rates invariant to base shift.

DIFFICULTY: hard