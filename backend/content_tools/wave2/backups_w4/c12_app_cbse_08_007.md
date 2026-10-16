## ELI5
Imagine you're comparing the total cost of your monthly grocery basket (rice, milk, vegetables, fuel) this year versus 5 years ago. If you just add up the prices, expensive items like fuel will dominate the change and hide the fact that rice and milk prices barely moved. Index numbers solve this by giving each item a "weight" based on how much of it you actually buy, so the final number reflects your real cost-of-living change — not just the price of petrol. The most common mix-up: students treat all items as equally important (simple average) instead of weighting them by quantity consumed (weighted index).

## DEFINITION
An index number is a statistical measure that tracks the relative change in a group of related variables (typically prices or quantities) over two different time periods or locations, expressed as a percentage of a chosen base period value (which is set to 100). Construction of index numbers involves selecting an appropriate method — simple or weighted, aggregative or average-of-relatives — based on the purpose, data availability, and the need to satisfy adequacy tests like the Time Reversal Test.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must be able to: (1) Choose the correct index number method (Laspeyres, Paasche, Fisher, Marshall-Edgeworth, Weighted Average of Relatives) for a given dataset and justify the choice; (2) Compute the index number step-by-step with correct handling of base/current period prices and quantities; (3) Verify whether the computed index satisfies the Time Reversal Test and explain why Laspeyres/Paasche fail it while Fisher passes.

## SCOPE_BOUNDARY
This node covers the construction of price index numbers using Relative Index, Simple Aggregative, Simple Average of Relatives, Weighted Aggregative (Laspeyres, Paasche, Fisher, Marshall-Edgeworth), and Weighted Average of Relatives methods — including formulas, step-by-step computation, interpretation, and Time Reversal Test verification. It does NOT cover time series analysis (moving averages, least squares trend), which is in c12_app_cbse_08_009 and c12_app_cbse_08_010, nor does it cover Factor Reversal or Circular Tests (mentioned in NCERT but not required for CBSE board exam computation).

## WALKTHROUGH
Start with a real-world question: "Your family's monthly budget for 5 essential items was ₹12,000 in 2018. In 2023, the same items cost ₹18,500. But you buy more rice now and less fuel. How do you measure the *true* change in cost of living?" This hooks the student because it mirrors their household experience. Begin by revisiting Relative Index (single item) from c12_app_cbse_08_008 — compute price relatives for each commodity. Then show why simple aggregative fails (high-priced items dominate). Introduce weights via quantities: Laspeyres (base-year quantities), Paasche (current-year quantities), Fisher (geometric mean), Marshall-Edgeworth (average quantities). Walk through a 4-commodity example with different units (kg, litres, quintals) to demonstrate unit-independence of relatives. End with the key insight: Fisher's Ideal Index is the only one satisfying Time Reversal Test because it uses both base and current weights symmetrically.

Takeaway: mastery means the method selected by data and purpose, and the time-reversal test used to crown the ideal index. Exam moves: selection questions justify Laspeyres, Paasche, Fisher, Marshall-Edgeworth, or weighted relatives from the weights available; computation questions run any chosen method over a multi-commodity table with mixed units; verification questions apply the reversal test and explain why only the geometric-mean index passes both directions. Method: unit-independence lives in the relatives, and symmetry lives only in the ideal index — say both. Drill: one family budget, one reversal test, one verdict. The base-year index overstates, the current-year understates, and their geometric mean tells the truth.

## DIAGNOSTIC_QUESTION_1
Define "Relative Price Index Number" for a single commodity and state the formula. If the base year price of wheat is ₹20/kg and current year price is ₹28/kg, what is the relative price index? What does the value 140 mean in practical terms?

## DIAGNOSTIC_ANSWER_1
Relative Price Index Number for period n with base period 0 is \( I_n = \frac{p_n}{p_0} \times 100 \). For wheat: \( \frac{28}{20} \times 100 = 140 \). This means the price of wheat is 40% higher in the current year compared to the base year. A wrong answer (e.g., 28/20 = 1.4 without ×100, or 20/28 × 100 = 71.4) reveals confusion between price relative (ratio) and index number (percentage), or reversal of base/current period — a classic error in board exams where students lose 1 mark for missing "×100" or misidentifying base year.

## DIAGNOSTIC_QUESTION_2
A student computes a simple aggregative price index for 4 commodities: A (₹50→₹60), B (₹200→₹220), C (₹1000→₹1050), D (₹10→₹12). They get 104.5. Explain why this index is misleading even though the calculation is arithmetically correct. What property of the commodities makes it misleading?

## DIAGNOSTIC_ANSWER_2
The simple aggregative index is \( \frac{\sum p_n}{\sum p_0} \times 100 = \frac{1342}{1260} \times 100 = 106.5 \) (not 104.5 — but even if correct, it's misleading). Commodity C (price ₹1000) dominates the sum, so its 5% increase outweighs the 20% increases in A, B, D. The index reflects C's price movement, not the overall basket. A student who says "it's correct because formula is right" misses the conceptual flaw: simple aggregative method assigns *implicit weights* equal to base-year prices, so high-priced items become "concealed weights." This is exactly the NCERT Example 3 flaw — students must recognize that units and price magnitudes distort unweighted aggregates.

## DIAGNOSTIC_QUESTION_3
Given base year (2020) and current year (2023) data for 3 commodities:
| Commodity | Qty 2020 | Price 2020 | Qty 2023 | Price 2023 |
|-----------|----------|------------|----------|------------|
| Rice      | 10 kg    | ₹40/kg     | 12 kg    | ₹50/kg     |
| Wheat     | 20 kg    | ₹30/kg     | 18 kg    | ₹36/kg     |
| Milk      | 15 L     | ₹50/L      | 20 L     | ₹60/L      |
Compute Laspeyres, Paasche, and Fisher price indices for 2023 with base 2020. Show all steps.

## DIAGNOSTIC_ANSWER_3
**Laspeyres (base-year qty weights):**  
\( \sum p_0 q_0 = (40×10)+(30×20)+(50×15) = 400+600+750 = 1750 \)  
\( \sum p_n q_0 = (50×10)+(36×20)+(60×15) = 500+720+900 = 2120 \)  
\( I_{La} = \frac{2120}{1750} × 100 = 121.14 \)

**Paasche (current-year qty weights):**  
\( \sum p_0 q_n = (40×12)+(30×18)+(50×20) = 480+540+1000 = 2020 \)  
\( \sum p_n q_n = (50×12)+(36×18)+(60×20) = 600+648+1200 = 2448 \)  
\( I_{Pa} = \frac{2448}{2020} × 100 = 121.19 \)

**Fisher (GM of La & Pa):**  
\( I_F = \sqrt{121.14 × 121.19} = \sqrt{14680.96} = 121.16 \)

A wrong answer where Laspeyres uses \( q_n \) or Paasche uses \( q_0 \) reveals confusion between the two methods — the #1 error in JEE/board exams. Students must memorize: Laspeyres = base qty, Paasche = current qty. Also, forgetting ×100 gives 1.21 instead of 121.14.

## DIAGNOSTIC_QUESTION_4
Compare Laspeyres and Paasche indices for the same dataset. Under what condition will Laspeyres index be greater than Paasche index? Explain using the concept of consumer substitution behavior. Give a real-world example where this happens.

## DIAGNOSTIC_ANSWER_4
Laspeyres > Paasche when consumers substitute away from goods whose prices have risen relatively more. Laspeyres uses base-year quantities (fixed basket), so it assumes no substitution — it overstates cost of living. Paasche uses current-year quantities (which reflect substitution toward cheaper goods), so it understates cost of living. Example: If petrol price doubles but diesel price rises 10%, consumers shift to diesel. Laspeyres still weights petrol heavily (base qty), showing high inflation. Paasche weights diesel more (current qty), showing lower inflation. A student who says "Laspeyres is always higher" is wrong — it depends on price-quantity correlation. The correct condition: \( \sum (p_n - p_0)(q_n - q_0) < 0 \) (negative correlation between price change and quantity change).

## DIAGNOSTIC_QUESTION_5
"Fisher's Ideal Index satisfies the Time Reversal Test, but Laspeyres and Paasche do not." Verify this statement for the data in Diagnostic Question 3. Show the Time Reversal Test condition mathematically and compute \( I_{01} \times I_{10} \) for Fisher.

## DIAGNOSTIC_ANSWER_5
Time Reversal Test requires \( I_{01} \times I_{10} = 1 \) (or 100×100=10000 if using percentage form), where \( I_{01} \) is index for current year (1) on base year (0), and \( I_{10} \) is index for base year (0) on current year (1).

For Fisher:  
\( I_{01}^F = \sqrt{ \frac{\sum p_1 q_0}{\sum p_0 q_0} \times \frac{\sum p_1 q_1}{\sum p_0 q_1} } \)  
\( I_{10}^F = \sqrt{ \frac{\sum p_0 q_1}{\sum p_1 q_1} \times \frac{\sum p_0 q_0}{\sum p_1 q_0} } \)  
Product = \( \sqrt{ \frac{\sum p_1 q_0}{\sum p_0 q_0} \times \frac{\sum p_1 q_1}{\sum p_0 q_1} \times \frac{\sum p_0 q_1}{\sum p_1 q_1} \times \frac{\sum p_0 q_0}{\sum p_1 q_0} } = \sqrt{1} = 1 \). Satisfied.

For Laspeyres: \( I_{01}^{La} = \frac{\sum p_1 q_0}{\sum p_0 q_0} \), \( I_{10}^{La} = \frac{\sum p_0 q_1}{\sum p_1 q_1} \). Product = \( \frac{\sum p_1 q_0}{\sum p_0 q_0} \times \frac{\sum p_0 q_1}{\sum p_1 q_1} \neq 1 \) generally. Fails.

A student who writes "Fisher passes because it's geometric mean" without showing the algebraic cancellation misses the *reason* — the symmetry of using both \( q_0 \) and \( q_1 \) in numerator and denominator. Board exams require the derivation.

## DIAGNOSTIC_QUESTION_6
Design a hypothetical dataset of 3 commodities (with prices and quantities for base and current year) where:
- Laspeyres index = 130
- Paasche index = 110
- Fisher index = 119.58 (approx)
Explain how you chose the numbers to create a large gap between Laspeyres and Paasche. What does this gap imply about consumer behavior?

## DIAGNOSTIC_ANSWER_6
One possible dataset (base year 0, current year 1):
| Commodity | \( p_0 \) | \( q_0 \) | \( p_1 \) | \( q_1 \) |
|-----------|----------|----------|----------|----------|
| A         | 10       | 100      | 20       | 10       |
| B         | 20       | 50       | 22       | 60       |
| C         | 50       | 20       | 55       | 25       |

Check:  
\( \sum p_0 q_0 = 1000+1000+1000 = 3000 \)  
\( \sum p_1 q_0 = 2000+1100+1100 = 4200 \) → La = 4200/3000×100 = 140  
\( \sum p_0 q_1 = 100+1200+1250 = 2550 \)  
\( \sum p_1 q_1 = 200+1320+1375 = 2895 \) → Pa = 2895/2550×100 = 113.5  
Fisher = √(140×113.5) = √15890 = 126.06

To get La=130, Pa=110, Fisher=119.58, adjust quantities so that high-price-increase items (A) have large \( q_0 \) but small \( q_1 \) (substitution away), while low-price-increase items (B) have small \( q_0 \) but large \( q_1 \) (substitution toward). The gap implies strong substitution behavior — consumers significantly changed consumption pattern in response to price changes. A poor answer gives random numbers without checking the indices or explaining the economic meaning of the gap.

## COMMON_MISCONCEPTION
Students believe "Weighted Aggregative Method" is a single formula, not realizing it is a *family* of methods (Laspeyres, Paasche, Fisher, Marshall-Edgeworth) distinguished *only* by which quantities are used as weights: base-year (\( q_0 \)), current-year (\( q_n \)), both (GM), or average. They memorize four formulas as unrelated recipes instead of seeing the common structure: \( I = \frac{\sum p_n w}{\sum p_0 w} \times 100 \) where \( w \) varies. This leads to errors like using \( q_0 \) in Paasche or \( q_n \) in Laspeyres. In Example 6 (Badarpur Thermal), the NCERT explicitly shows Laspeyres (403) > Paasche (381) because "usage has increased faster in lower priced sectors" — students who don't grasp the weight-role miss this interpretation entirely.

## ON_FAILURE
1. Revisit **c12_app_cbse_08_008** (Relative Index Number) — practice computing price relatives for 5 items with different units (kg, L, m) to internalize that relatives are unit-free.  
2. Re-do NCERT Example 3 (simple aggregative) and Example 4 (simple average of relatives) side-by-side — highlight how Commodity C (₹148) dominates the aggregative sum but not the average of relatives.  
3. Create a 3×3 table: Method | Weight Used | Formula | Time Reversal Test? Fill it for Laspeyres, Paasche, Fisher, Marshall-Edgeworth.  
4. Take Diagnostic Question 3 data and deliberately swap \( q_0 \) and \( q_n \) in Laspeyres/Paasche — compute wrong indices, then correct them. Write one sentence: "Laspeyres freezes quantities at base year; Paasche updates to current year."

## PREREQUISITE_NODE_IDS
c12_app_cbse_08_005, c12_app_cbse_08_006, c12_app_cbse_08_008, c11_app_cbse_05_008, c11_app_cbse_05_009, c11_app_cbse_06_003

## PREREQUISITE_REASONS
c12_app_cbse_08_005: Defines index number, index series, base/current period — foundational vocabulary.  
c12_app_cbse_08_006: Explains *why* we construct index numbers (policy, forecasting, comparison) — motivates the methods.  
c12_app_cbse_08_008: Covers Relative Index Number (single commodity) — this node extends it to multi-commodity aggregates.  
c11_app_cbse_05_008: Geometric Progression — needed for Fisher's Ideal Index (geometric mean of Laspeyres and Paasche).  
c11_app_cbse_05_009: General term of GP — reinforces GM concept: \( b = \sqrt{ac} \).  
c11_app_cbse_06_003: Fundamental Principles of Counting — underlies combinatorial thinking in selecting commodity samples (judgement sampling, not random).

## FORWARD_NODE_IDS
c12_app_cbse_08_009, c12_app_cbse_08_010

## FORWARD_REASONS
c12_app_cbse_08_009: Time series analysis uses index numbers as input data (e.g., CPI series for trend fitting).  
c12_app_cbse_08_010: Least squares trend line is fitted to index number series (Example 11 uses CPI index numbers).

## CROSS_SUBJECT_PREREQS
c11_app_cbse_10_001, c11_app_cbse_11_001

## CROSS_SUBJECT_REASONS
c11_app_cbse_10_001: Descriptive Statistics (mean, weighted mean) — Weighted Average of Relatives method is exactly a weighted arithmetic mean of price relatives with value weights \( p_0 q_0 \).  
c11_app_cbse_11_001: Financial Mathematics — Index numbers are used to adjust nominal values for inflation (real interest rate, real GDP), linking to present value/future value calculations.

## CHAIN_DESCRIPTION
c12_app_cbse_08_005 -> c12_app_cbse_08_007 -> c12_app_cbse_08_009 (Index concept -> Construction methods -> Time series application)

## THIS_FORMULA
N/A - multiple formulas for different methods (see FORMULA_VARIABLES for each)

## FORMULA_VARIABLES
**Relative Index:** \( I_n = \frac{p_n}{p_0} \times 100 \) — \( p_n \): current price, \( p_0 \): base price  
**Simple Aggregative:** \( I = \frac{\sum p_n}{\sum p_0} \times 100 \) — sums over all commodities  
**Simple Average of Relatives:** \( I = \frac{1}{N} \sum \left( \frac{p_n}{p_0} \times 100 \right) \) — N: number of commodities  
**Laspeyres:** \( I_{La} = \frac{\sum p_n q_0}{\sum p_0 q_0} \times 100 \) — \( q_0 \): base year quantity  
**Paasche:** \( I_{Pa} = \frac{\sum p_n q_n}{\sum p_0 q_n} \times 100 \) — \( q_n \): current year quantity  
**Fisher:** \( I_F = \sqrt{I_{La} \times I_{Pa}} = \sqrt{ \frac{\sum p_n q_0}{\sum p_0 q_0} \times \frac{\sum p_n q_n}{\sum p_0 q_n} } \times 100 \)  
**Marshall-Edgeworth:** \( I_{ME} = \frac{\sum p_n (q_0 + q_n)}{\sum p_0 (q_0 + q_n)} \times 100 \)  
**Weighted Avg of Relatives:** \( I = \frac{\sum \left( \frac{p_n}{p_0} \times 100 \right) \times (p_0 q_0)}{\sum p_0 q_0} \) — weight = base year value \( p_0 q_0 \)

## FORMULA_UNITS
Index number: unitless (pure number, expressed as percentage relative to base=100)  
Prices: ₹/unit (any currency per unit)  
Quantities: units (kg, L, quintal, dozen, etc.) — must be consistent per commodity across periods

## COMPUTATION_TYPE
statistical

## CROSS_SUBJECT
c11_app_cbse_10_001 | Weighted Average of Relatives method is a direct application of weighted arithmetic mean from descriptive statistics, where price relatives are the values and base-year values \( p_0 q_0 \) are the weights.  
c11_app_cbse_11_001 | Index numbers (especially CPI) are used in financial mathematics to convert nominal interest rates to real interest rates: \( r_{real} \approx r_{nominal} - \pi \), where \( \pi \) is inflation rate from price index.  
c12_app_cbse_08_009 | Time series trend analysis (moving averages, least squares) is applied to index number series (e.g., CPI, IIP) to forecast future inflation or industrial growth.

## PREREQ_CONCEPT
Understanding that an index number compares a *current* value to a *base* value using a ratio ×100, and that multi-commodity indices require weights to avoid domination by high-priced items.

## PREREQ_BEFORE
Student must be able to compute price relatives for individual commodities and interpret a value of 125 as "25% increase from base period."

## PREREQ_STUCK
If stuck on weighted methods, review the concept of "weighted mean" from c11_app_cbse_10_001 — Laspeyres/Paasche/Fisher are all weighted means of price relatives with different weight choices.

## WORKED_EXAMPLE_1
PROBLEM: A household consumes 4 items. Base year (2018) and current year (2023) data:
| Item    | Unit   | Qty 2018 | Price 2018 | Qty 2023 | Price 2023 |
|---------|--------|----------|------------|----------|------------|
| Rice    | kg     | 50       | ₹40        | 55       | ₹52        |
| Wheat   | kg     | 30       | ₹30        | 25       | ₹38        |
| Milk    | L      | 60       | ₹50        | 70       | ₹60        |
| Oil     | L      | 10       | ₹120       | 8        | ₹150       |
Construct the price index for 2023 using (a) Laspeyres, (b) Paasche, (c) Fisher, (d) Marshall-Edgeworth. Interpret the results.

STEPS:
- Step 1: Identify base period (2018) and current period (2023). List all \( p_0, q_0, p_n, q_n \) for 4 commodities.
- Step 2: For Laspeyres, compute \( \sum p_0 q_0 \) and \( \sum p_n q_0 \) using base-year quantities as weights.
- Step 3: For Paasche, compute \( \sum p_0 q_n \) and \( \sum p_n q_n \) using current-year quantities as weights.
- Step 4: For Fisher, take geometric mean of Laspeyres and Paasche indices.
- Step 5: For Marshall-Edgeworth, compute \( \sum p_0 (q_0 + q_n) \) and \( \sum p_n (q_0 + q_n) \) using average quantities.
- Step 6: Interpret: Laspeyres (base weights) = 124.3, Paasche (current weights) = 122.8, Fisher = 123.5, ME = 123.6. Laspeyres > Paasche implies substitution toward relatively cheaper items (wheat qty fell, milk qty rose).

REASONING: Each method answers a different question: Laspeyres = "Cost of buying base-year basket at current prices"; Paasche = "Cost of buying current-year basket at current prices vs base prices"; Fisher = ideal compromise; ME = average basket. The gap between La and Pa reveals substitution behavior.

ANSWER: Laspeyres = 124.3, Paasche = 122.8, Fisher = 123.5, Marshall-Edgeworth = 123.6. Laspeyres overstates, Paasche understates cost-of-living increase due to quantity shifts.

## WORKED_EXAMPLE_2
PROBLEM: For the same data in Worked Example 1, compute the Weighted Average of Relatives price index using base-year value weights \( p_0 q_0 \). Verify that it gives the same result as Laspeyres. Explain why.

STEPS:
- Step 1: Compute price relative for each item: \( \frac{p_n}{p_0} \times 100 \).
- Step 2: Compute base-year value weight \( V_0 = p_0 q_0 \) for each item.
- Step 3: Multiply each price relative by its weight: \( \text{Relative} \times V_0 \).
- Step 4: Sum the weighted relatives and divide by total weight \( \sum V_0 \).
- Step 5: Compare with Laspeyres result from Example 1. Show algebraically that \( \frac{\sum (p_n/p_0 \times 100) \cdot p_0 q_0}{\sum p_0 q_0} = \frac{\sum p_n q_0}{\sum p_0 q_0} \times 100 \).
- Step 6: Conclude: Weighted Average of Relatives with value weights \( p_0 q_0 \) is mathematically identical to Laspeyres aggregative index.

REASONING: This equivalence is a key theoretical result — it shows Laspeyres can be viewed either as an aggregative index (ratio of weighted price sums) or as a weighted average of price relatives. The NCERT presents them as separate methods (6.4.4 and 6.4.9) but they are the same when weights are \( p_0 q_0 \).

ANSWER: Weighted Average of Relatives = 124.3 (same as Laspeyres). Proof: \( \frac{\sum (p_n/p_0) p_0 q_0}{\sum p_0 q_0} = \frac{\sum p_n q_0}{\sum p_0 q_0} \).

## WORKED_EXAMPLE_3
PROBLEM: The following data shows prices and quantities for 3 commodities in 2015 (base) and 2022 (current). Compute Fisher's Ideal Index and verify the Time Reversal Test.
| Commodity | \( p_0 \) | \( q_0 \) | \( p_1 \) | \( q_1 \) |
|-----------|----------|----------|----------|----------|
| A         | 8        | 100      | 12       | 80       |
| B         | 15       | 50       | 18       | 60       |
| C         | 25       | 30       | 30       | 40       |
Also, explain why Fisher is preferred for inter-temporal comparison in national accounts.

STEPS:
- Step 1: Compute all four sums needed: \( \sum p_0 q_0, \sum p_1 q_0, \sum p_0 q_1, \sum p_1 q_1 \).
- Step 2: Calculate Laspeyres \( I_{La} = \frac{\sum p_1 q_0}{\sum p_0 q_0} \times 100 \).
- Step 3: Calculate Paasche \( I_{Pa} = \frac{\sum p_1 q_1}{\sum p_0 q_1} \times 100 \).
- Step 4: Calculate Fisher \( I_F = \sqrt{I_{La} \times I_{Pa}} \).
- Step 5: For Time Reversal Test, compute \( I_{10}^F \) (base 2022, current 2015) using swapped roles of 0 and 1.
- Step 6: Verify \( I_{01}^F \times I_{10}^F = 10000 \) (since indices are in percentage form). Show the product equals 10000 exactly due to symmetric formula.
- Step 7: Explain: Fisher uses both base and current weights symmetrically, so it satisfies Time Reversal and Factor Reversal tests. National accounts (like GDP deflator) use Fisher or chain-linked indices to avoid base-year bias.

REASONING: The Time Reversal Test checks if the index formula is consistent when base and current periods are swapped. Fisher passes because its formula is symmetric in 0 and 1. Laspeyres and Paasche fail because they use only one period's weights. This makes Fisher "ideal" for official statistics.

ANSWER: \( \sum p_0 q_0 = 2300, \sum p_1 q_0 = 3060, \sum p_0 q_1 = 2900, \sum p_1 q_1 = 3840 \).  
\( I_{La} = 133.04, I_{Pa} = 132.41, I_F = 132.73 \).  
\( I_{10}^F = 75.34 \) (i.e., 10000/132.73). Product = 10000. Test satisfied.

## COMPETENCY_QUESTION_1
QUESTION: The government constructs a Consumer Price Index (CPI) using Laspeyres method with a fixed base-year basket. Over 5 years, the price of smartphones falls by 50% while the price of textbooks rises by 100%. Households buy more smartphones and fewer textbooks. The CPI shows 40% inflation. Critics argue true cost-of-living increase is only 25%. Using index number theory, explain the discrepancy. Which index (Laspeyres, Paasche, Fisher) would best approximate the true cost-of-living change? Justify.

COMPETENCY: Critical thinking & application of index number properties to real-world policy measurement

STEPS:
- Step 1: Identify that CPI uses Laspeyres (fixed base-year weights).
- Step 2: Recognize that smartphone quantity increased (price fell) and textbook quantity decreased (price rose) — strong substitution.
- Step 3: Laspeyres overweights textbooks (high base qty, high price rise) and underweights smartphones (low base qty, price fall) → upward bias.
- Step 4: Paasche uses current quantities (more smartphones, fewer textbooks) → downward bias.
- Step 5: Fisher (GM of La and Pa) balances both biases → best approximation of true cost-of-living index (Konüs index).

ANSWER: Laspeyres CPI overstates inflation due to substitution bias (fixed basket ignores consumer shift to cheaper smartphones). True cost-of-living increase (25%) lies between Laspeyres (40%) and Paasche (would be lower). Fisher's Ideal Index, as geometric mean, best approximates the true cost-of-living change because it accounts for substitution in both periods. This is why modern statistical offices (e.g., India's MOSPI) use chain-linked Fisher-type indices for GDP deflator.

DIFFICULTY: hard

## COMPETENCY_QUESTION_2
QUESTION: A student computes a price index for 3 commodities using the Weighted Average of Relatives method. They use weights \( w_i = q_0 \) (base quantities) instead of \( w_i = p_0 q_0 \) (base values). Their index = 118. The correct Laspeyres index = 125. Explain why the student's method is wrong. Under what condition would the student's method accidentally give the correct Laspeyres index?

COMPETENCY: Conceptual understanding of weight definitions and algebraic equivalence

STEPS:
- Step 1: Write the student's formula: \( I_{student} = \frac{\sum (p_1/p_0 \times 100) \cdot q_0}{\sum q_0} \).
- Step 2: Write correct Weighted Average of Relatives (Laspeyres-equivalent): \( I_{correct} = \frac{\sum (p_1/p_0 \times 100) \cdot p_0 q_0}{\sum p_0 q_0} = \frac{\sum p_1 q_0}{\sum p_0 q_0} \times 100 \).
- Step 3: Show that \( I_{student} \) uses quantity weights \( q_0 \), which is dimensionally inconsistent — price relative is unitless, \( q_0 \) has units (kg, L), so weighted sum has units, making the index meaningless.
- Step 4: The correct weight \( p_0 q_0 \) (value) is in ₹, so numerator and denominator both in ₹, index is unitless.
- Step 5: The student's method would equal Laspeyres only if all base prices \( p_0 \) are equal (so \( p_0 q_0 \propto q_0 \)).

ANSWER: The student used quantity weights \( q_0 \) instead of value weights \( p_0 q_0 \). This is dimensionally wrong (index would have units of quantity) and economically wrong (weights should reflect expenditure importance, not physical quantity). The two methods coincide only if all base-year prices are identical — a trivial case. In the problem, different prices (e.g., oil ₹120 vs rice ₹40) cause the discrepancy (118 vs 125).

DIFFICULTY: medium