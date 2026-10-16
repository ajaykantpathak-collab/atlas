## ELI5
Laspeyres says 125, Paasche says 115 - which is correct? Neither alone: one freezes old habits and overstates, the other wears today's habits and understates. Fisher's Ideal Index takes the geometric mean of the two and passes both reversal tests - time reversal and factor reversal - that neither parent passes alone. The ideal index is the compromise with a mathematical alibi.

## DEFINITION
Fisher's Ideal Index Number is a weighted price index calculated as the geometric mean of Laspeyres' and Paasche's price indices, expressed as \( P_{01} = \sqrt{P_L \times P_P} \times 100 \), where \( P_L = \frac{\sum p_1 q_0}{\sum p_0 q_0} \) uses base-year quantities as weights and \( P_P = \frac{\sum p_1 q_1}{\sum p_0 q_1} \) uses current-year quantities as weights. It is called "ideal" because it satisfies both the Time Reversal Test (\( P_{01} \times P_{10} = 1 \)) and the Factor Reversal Test (\( P_{01} \times Q_{01} = \frac{\sum p_1 q_1}{\sum p_0 q_0} \)), making it theoretically superior to Laspeyres and Paasche indices alone.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must be able to compute Fisher's Ideal Index from given price and quantity data for base and current years, verify that it satisfies the Time Reversal Test and Factor Reversal Test, and explain why it is considered "ideal" compared to Laspeyres and Paasche indices.

## SCOPE_BOUNDARY
This node covers Fisher's Ideal Price Index formula, its derivation as the geometric mean of Laspeyres and Paasche, the two reversal tests it satisfies, and numerical computation. It does NOT cover Fisher's Quantity Index, chain-base indices, or advanced properties like circular test. It stays within NCERT Class 11 Statistics for Economics Chapter 8 scope.

## WALKTHROUGH
Imagine you are a market analyst comparing rice prices between 2020 and 2024. You calculate Laspeyres index using 2020 quantities (giving 125) and Paasche index using 2024 quantities (giving 115). Which one is "correct"? Neither — Laspeyres overstates inflation by ignoring consumers switching to cheaper alternatives, while Paasche understates it by using current consumption patterns. Fisher's insight: take the geometric mean of both! Start by computing Laspeyres and Paasche separately, then multiply them and take the square root. This single number balances both perspectives and passes rigorous mathematical tests that neither index passes alone — that's why Fisher called it "ideal."

Takeaway: mastery means computing both parent indices, taking their geometric mean, and citing the two reversal tests as Fisher's credentials. Exam moves: compute-and-verify questions on the price-comparison scene. Check yourself: the geometric mean, not the arithmetic - Fisher's insight is symmetry between the two baskets, and only the geometric mean honours it. Students miss it because ideal sounds like marketing, when the 125-versus-115 spread shows the design: the tests are proofs - reverse time and the index inverts properly; reverse factors and price-times-quantity recovers the value ratio - and Fisher alone passes both, which is why the name stuck.

## DIAGNOSTIC_QUESTION_1
Write the formula for Fisher's Ideal Price Index using summation notation with \( p_0, p_1, q_0, q_1 \) and explain what each symbol represents.

## DIAGNOSTIC_ANSWER_1
**Correct answer:** Fisher's Ideal Price Index \( P_{01} = \sqrt{ \frac{\sum p_1 q_0}{\sum p_0 q_0} \times \frac{\sum p_1 q_1}{\sum p_0 q_1} } \times 100 \). Here \( p_0 \) = base year price, \( p_1 \) = current year price, \( q_0 \) = base year quantity, \( q_1 \) = current year quantity. The first fraction is Laspeyres index, the second is Paasche index.

**What a wrong answer reveals:** If a student writes arithmetic mean \( \frac{P_L + P_P}{2} \) instead of geometric mean, they confuse "average" with Fisher's specific geometric mean formulation. If they swap \( q_0 \) and \( q_1 \) in the denominators, they don't understand which quantities weight which index. If they omit the square root, they miss the defining property that makes Fisher the geometric mean.

## DIAGNOSTIC_QUESTION_2
A student calculates Laspeyres index as 130 and Paasche index as 110 for the same data. They claim Fisher's index is 120 because "it's the average of the two." Is this correct? Explain why or why not.

## DIAGNOSTIC_ANSWER_2
**Correct answer:** No, this is incorrect. Fisher's index is the **geometric mean**, not the arithmetic mean. \( P_F = \sqrt{130 \times 110} = \sqrt{14300} \approx 119.58 \), not \( \frac{130+110}{2} = 120 \). The geometric mean is always less than or equal to the arithmetic mean (AM ≥ GM), so Fisher's index will always lie between Laspeyres and Paasche but closer to the smaller one.

**What a wrong answer reveals:** If the student says "yes, 120 is correct," they fundamentally misunderstand Fisher's formula — they're using arithmetic mean instead of geometric mean. This is the most common error because "average" colloquially means arithmetic mean. They also miss that the geometric mean property is what enables Fisher to satisfy the Time Reversal Test (arithmetic mean would not).

## DIAGNOSTIC_QUESTION_3
Given the following data for wheat and rice, compute Fisher's Ideal Price Index for 2024 with base year 2020:

| Commodity | \( p_0 \) (₹/kg) | \( q_0 \) (kg) | \( p_1 \) (₹/kg) | \( q_1 \) (kg) |
|-----------|------------------|----------------|------------------|----------------|
| Wheat     | 20               | 100            | 25               | 80             |
| Rice      | 30               | 50             | 35               | 60             |

## DIAGNOSTIC_ANSWER_3
**Correct answer with steps:**
1. Compute \( \sum p_0 q_0 = (20 \times 100) + (30 \times 50) = 2000 + 1500 = 3500 \)
2. Compute \( \sum p_1 q_0 = (25 \times 100) + (35 \times 50) = 2500 + 1750 = 4250 \)
3. Compute \( \sum p_0 q_1 = (20 \times 80) + (30 \times 60) = 1600 + 1800 = 3400 \)
4. Compute \( \sum p_1 q_1 = (25 \times 80) + (35 \times 60) = 2000 + 2100 = 4100 \)
5. Laspeyres \( P_L = \frac{4250}{3500} \times 100 = 121.43 \)
6. Paasche \( P_P = \frac{4100}{3400} \times 100 = 120.59 \)
7. Fisher \( P_F = \sqrt{121.43 \times 120.59} = \sqrt{14643.2} \approx 121.01 \)

**What a wrong answer reveals:** If a student gets 121.43 or 120.59, they computed only Laspeyres or only Paasche. If they get 121.01 but used arithmetic mean \( \frac{121.43+120.59}{2} = 121.01 \) (coincidentally close here), they used wrong method — check if they show square root. If they swap \( q_0 \) and \( q_1 \) in any sum, they don't grasp which quantities belong to which index.

## DIAGNOSTIC_QUESTION_4
Compare Fisher's Ideal Index with Laspeyres and Paasche indices on these three criteria: (a) weights used, (b) Time Reversal Test, (c) Factor Reversal Test. Which index satisfies both reversal tests?

## DIAGNOSTIC_ANSWER_4
**Correct answer:**
| Criterion | Laspeyres | Paasche | Fisher |
|-----------|-----------|---------|--------|
| (a) Weights | Base year quantities (\( q_0 \)) only | Current year quantities (\( q_1 \)) only | Both \( q_0 \) and \( q_1 \) (via geometric mean) |
| (b) Time Reversal Test | Fails (\( P_{01} \times P_{10} \neq 1 \)) | Fails (\( P_{01} \times P_{10} \neq 1 \)) | **Passes** (\( P_{01} \times P_{10} = 1 \)) |
| (c) Factor Reversal Test | Fails | Fails | **Passes** (\( P_{01} \times Q_{01} = \frac{\sum p_1 q_1}{\sum p_0 q_0} \)) |

Only Fisher's Ideal Index satisfies **both** reversal tests, which is why it's called "ideal."

**What a wrong answer reveals:** If a student says Laspeyres or Paasche passes either test, they haven't understood the mathematical proofs or the significance of the tests. If they say Fisher fails Factor Reversal Test, they may be confusing it with the Circular Test (which Fisher fails). If they can't articulate what "weights used" means for each, they're memorising formulas without understanding the weighting concept.

## DIAGNOSTIC_QUESTION_5
"Fisher's Ideal Index is the best index number because it satisfies both Time Reversal and Factor Reversal Tests." Evaluate this statement. Are there any practical limitations that might make other indices preferable in real-world applications?

## DIAGNOSTIC_ANSWER_5
**Correct answer with justification:** The statement is **theoretically correct but practically limited**. Fisher is "ideal" in a mathematical sense — it satisfies both reversal tests, uses both base and current year weights, and lies between Laspeyres and Paasche. However, practical limitations include: (1) **Data requirement** — needs current-year quantities (\( q_1 \)), which are often unavailable or delayed (e.g., national accounts data lag); Laspeyres only needs base-year quantities which are fixed and known. (2) **Computational complexity** — geometric mean of two ratios is harder to compute and update than Laspeyres. (3) **Not transitive** — Fisher fails the Circular Test (\( P_{01} \times P_{12} \neq P_{02} \)), making it unsuitable for chain-linking over many periods. (4) **Interpretability** — Laspeyres has a clear "cost of fixed basket" interpretation for policy (e.g., CPI), while Fisher's hybrid basket is harder to explain to public. So statistical offices often use Laspeyres (CPI) or chain-linked Fisher (some GDP deflators) depending on purpose.

**What a wrong answer reveals:** If a student says "yes, always best" without caveats, they're memorising textbook praise without critical thinking. If they say "no, it's useless," they ignore its theoretical superiority. A good answer balances mathematical properties with practical constraints — exactly what board exam "evaluate" questions test.

## DIAGNOSTIC_QUESTION_6
Create a new numerical problem (with your own data for 2 commodities, 2 years) where Laspeyres index > Paasche index, and compute Fisher's Ideal Index. Then construct a second problem where Paasche > Laspeyres. Explain what economic situation each pattern reflects.

## DIAGNOSTIC_ANSWER_6
**Expected answer criteria:**
- **Problem 1 (Laspeyres > Paasche):** e.g., Commodity A: \( p_0=10, q_0=100, p_1=15, q_1=50 \); Commodity B: \( p_0=20, q_0=50, p_1=22, q_1=60 \). Here price rise is larger for A, and consumers reduce A's consumption significantly (\( q_1 < q_0 \)) — substitution away from the good whose price rose most. Laspeyres (using \( q_0 \)) overweights the expensive good → higher index.
- **Problem 2 (Paasche > Laspeyres):** e.g., Commodity A: \( p_0=10, q_0=100, p_1=12, q_1=120 \); Commodity B: \( p_0=20, q_0=50, p_1=30, q_1=40 \). Here price rise is larger for B, but consumers *increase* A's consumption (maybe income effect or preference shift). Paasche (using \( q_1 \)) overweights the good with larger price rise → higher index.
- **Economic interpretation:** Laspeyres > Paasche → consumers substitute away from goods with higher price increases (normal substitution effect). Paasche > Laspeyres → consumers shift consumption *toward* goods with higher price increases (possible quality upgrade, necessity goods, or income effects dominating).

**What a poor answer reveals:** If the student cannot create data where the inequality flips, they don't understand how quantity weights drive the difference. If they give no economic interpretation, they're doing arithmetic without economic reasoning. If both problems show same inequality direction, they haven't grasped the substitution effect mechanism.

## COMMON_MISCONCEPTION
**Misconception:** "Fisher's Ideal Index is just the average of Laspeyres and Paasche indices, so I can compute it as \( \frac{P_L + P_P}{2} \)."

**Why students make this error:** The word "ideal" and "mean" in "geometric mean" misleads students into thinking "average = arithmetic mean." In daily language, "average" almost always means arithmetic mean. Students have seen arithmetic mean since Class 6 (c6_math_ch09_100) and geometric mean only rarely (if at all). The formula \( \sqrt{P_L \times P_P} \) looks unfamiliar, so they default to \( \frac{P_L + P_P}{2} \). Additionally, in many numerical examples the two means are numerically close (e.g., 121.43 and 120.59 → AM=121.01, GM=121.01), so the error goes undetected.

**Concrete wrong answer example:** For data giving \( P_L = 144 \) and \( P_P = 100 \), student computes Fisher as \( \frac{144+100}{2} = 122 \) instead of \( \sqrt{144 \times 100} = 120 \). The error is 2 index points — small but conceptually wrong, and it would fail the Time Reversal Test.

## ON_FAILURE
**Step-by-step remediation:**
1. **Confront the error directly:** "You used arithmetic mean. But Fisher explicitly defined his index as the *geometric* mean. Let's see why that matters." Show two numbers where AM ≠ GM clearly: e.g., \( P_L = 144, P_P = 100 \). AM = 122, GM = 120.
2. **Demonstrate the Time Reversal Test failure:** Compute \( P_{01} \) (base→current) and \( P_{10} \) (current→base) using arithmetic mean. Show \( P_{01} \times P_{10} \neq 1 \). Then do the same with geometric mean and show \( P_{01} \times P_{10} = 1 \). This proves *only* geometric mean satisfies the test.
3. **Connect to prior knowledge:** Remind them of geometric mean from Class 9/10 (c9_math_ch8_8: GP nth term, c10_math_cbse_05_007: sum of GP) — geometric mean of \( a \) and \( b \) is \( \sqrt{ab} \), used when averaging ratios or growth rates.
4. **Practice drill:** Give 3 quick pairs: (121, 121), (144, 100), (169, 64). Have them compute both means and see the gap widen as numbers diverge. Emphasise: "For index numbers, we average *ratios* — always use geometric mean."

## PREREQUISITE_NODE_IDS
c11_stat_cbse_08_005, c11_stat_cbse_08_006, c11_stat_cbse_08_004, c11_stat_cbse_08_003, c9_math_ch8_8, c10_math_cbse_05_007, c11_stat_cbse_08_001, c11_stat_cbse_08_002, c6_math_ch09_100

## PREREQUISITE_REASONS
c11_stat_cbse_08_005: Laspeyres index formula and computation — Fisher uses Laspeyres as one component.
c11_stat_cbse_08_006: Paasche index formula and computation — Fisher uses Paasche as the other component.
c11_stat_cbse_08_004: Weighted index numbers concept — understanding why weights (quantities) matter and the difference between base-year and current-year weights.
c11_stat_cbse_08_003: Simple index numbers — foundation of price relatives \( \frac{p_1}{p_0} \times 100 \) which underlie weighted indices.
c9_math_ch8_8: Geometric progression and geometric mean — Fisher's formula is the geometric mean of two indices; students need to recall \( \sqrt{ab} \) for ratios.
c10_math_cbse_05_007: Sum of GP / geometric mean applications — reinforces geometric mean as the correct average for multiplicative/ratio data.
c11_stat_cbse_08_001: Fisher's ideal index synthesizes the two weighting approaches, addressing the "tests of adequacy" that stem from the characteristics of index numbers.  
c11_stat_cbse_08_002: Fisher's ideal index combines Laspeyres and Paasche, addressing the "which weight?" question raised in uses.  
c6_math_ch09_100: e, "average" almost always means arithmetic mean. Students have seen arithmetic mean since Class 6 (c6_math_ch09_100) and geometric mean only rarely (if at all). The formula \( \sqrt{P_L \times P_P} \) looks unfamiliar, so they default to \  

## FORWARD_NODE_IDS
c11_stat_cbse_08_008, c11_stat_cbse_08_009, c11_stat_cbse_08_010, c11_stat_cbse_08_011
## FORWARD_REASONS
c11_stat_cbse_08_008: Consumer Price Index (CPI) construction uses Laspeyres (fixed basket) but understanding Fisher helps evaluate why CPI may overstate inflation (substitution bias).
c11_stat_cbse_08_009: Wholesale Price Index (WPI) — similar index construction choices; Fisher's properties inform why different indices give different inflation signals.
c11_stat_cbse_08_010: Inflation rate calculation — choice of index formula (Laspeyres vs Fisher vs Paasche) directly affects measured inflation rate.
c11_stat_cbse_08_011: Limitations of index numbers — Fisher's failure of Circular Test and data requirements are key limitations discussed in this node.

## CROSS_SUBJECT_PREREQS
c9_eco_ch2_1, c9_eco_ch2_7, c10_eco_cbse_03_001
## CROSS_SUBJECT_REASONS
c9_eco_ch2_1: Demand definition and law of demand — explains *why* quantities change when prices change (substitution effect), which is exactly why Laspeyres (fixed \( q_0 \)) and Paasche (fixed \( q_1 \)) differ, motivating Fisher's compromise.
c9_eco_ch2_7: Supply definition and law of supply — price changes affect quantities supplied; Fisher's use of both \( q_0 \) and \( q_1 \) captures both demand and supply side adjustments.
c10_eco_cbse_03_001: Money as medium of exchange, barter limitations — index numbers measure purchasing power of money; Fisher's "ideal" property makes it a theoretically sound measure of money's value change over time.

## CHAIN_DESCRIPTION
c11_stat_cbse_08_005 -> c11_stat_cbse_08_006 -> c11_stat_cbse_08_007 -> c11_stat_cbse_08_008 -> c11_stat_cbse_08_010

## THIS_FORMULA
\( P_{01} = \sqrt{ \frac{\sum p_1 q_0}{\sum p_0 q_0} \times \frac{\sum p_1 q_1}{\sum p_0 q_1} } \times 100 \)  
Equivalently: \( P_{01} = \sqrt{P_L \times P_P} \times 100 \) where \( P_L = \frac{\sum p_1 q_0}{\sum p_0 q_0} \times 100 \) and \( P_P = \frac{\sum p_1 q_1}{\sum p_0 q_1} \times 100 \)

## FORMULA_VARIABLES
- \( p_0 \): Price in base year (₹ per unit)
- \( p_1 \): Price in current year (₹ per unit)
- \( q_0 \): Quantity in base year (units: kg, litres, pieces, etc.)
- \( q_1 \): Quantity in current year (same units as \( q_0 \))
- \( \sum p_0 q_0 \): Total base year expenditure (₹)
- \( \sum p_1 q_0 \): Cost of base year basket at current prices (₹)
- \( \sum p_0 q_1 \): Cost of current year basket at base prices (₹)
- \( \sum p_1 q_1 \): Total current year expenditure (₹)
- \( P_L \): Laspeyres price index (no units, pure number × 100)
- \( P_P \): Paasche price index (no units, pure number × 100)
- \( P_{01} \): Fisher's Ideal Price Index (no units, pure number × 100)

## FORMULA_UNITS
Index number is unit-free (pure ratio × 100). Prices in ₹/kg, ₹/litre, ₹/piece. Quantities in kg, litres, pieces. Expenditures in ₹.

## COMPUTATION_TYPE
statistical

## CROSS_SUBJECT
c9_eco_ch2_1 | Law of demand explains why \( q_1 \) differs from \( q_0 \) when prices change — this quantity response is exactly what creates the gap between Laspeyres and Paasche that Fisher reconciles.
c10_eco_cbse_03_001 | Index numbers measure change in purchasing power of money; Fisher's satisfaction of Factor Reversal Test means \( P_{01} \times Q_{01} = \frac{\sum p_1 q_1}{\sum p_0 q_0} \) (value ratio), making it a theoretically consistent measure of money's value change.

## PREREQ_CONCEPT
Laspeyres and Paasche price indices — their formulas, weight structures (base-year vs current-year quantities), and their opposing biases (Laspeyres overstates, Paasche understates inflation under normal substitution).

## PREREQ_BEFORE
Student must be able to independently compute Laspeyres and Paasche indices from a given price-quantity table, and explain why they generally give different results.

## PREREQ_STUCK
If stuck, revisit c11_stat_cbse_08_005 (Laspeyres) and c11_stat_cbse_08_006 (Paasche) — practice computing both from the same dataset until you can do it without notes. Then review geometric mean from c9_math_ch8_8.

## WORKED_EXAMPLE_1
**PROBLEM:** The following data shows prices (₹/kg) and quantities (kg) of three food items for a rural household in base year 2020 and current year 2024. Compute Fisher's Ideal Price Index for 2024 with base 2020.

| Item | \( p_0 \) | \( q_0 \) | \( p_1 \) | \( q_1 \) |
|------|----------|----------|----------|----------|
| Wheat | 22 | 50 | 28 | 45 |
| Rice | 35 | 30 | 40 | 35 |
| Dal | 80 | 10 | 95 | 8 |

**STEPS:**
- Step 1: Identify given data — we have \( p_0, q_0, p_1, q_1 \) for 3 commodities. Need to compute four sums: \( \sum p_0 q_0, \sum p_1 q_0, \sum p_0 q_1, \sum p_1 q_1 \).
- Step 2: Create a calculation table with columns for each commodity and each required product:
  - Wheat: \( p_0 q_0 = 22 \times 50 = 1100 \); \( p_1 q_0 = 28 \times 50 = 1400 \); \( p_0 q_1 = 22 \times 45 = 990 \); \( p_1 q_1 = 28 \times 45 = 1260 \)
  - Rice: \( p_0 q_0 = 35 \times 30 = 1050 \); \( p_1 q_0 = 40 \times 30 = 1200 \); \( p_0 q_1 = 35 \times 35 = 1225 \); \( p_1 q_1 = 40 \times 35 = 1400 \)
  - Dal: \( p_0 q_0 = 80 \times 10 = 800 \); \( p_1 q_0 = 95 \times 10 = 950 \); \( p_0 q_1 = 80 \times 8 = 640 \); \( p_1 q_1 = 95 \times 8 = 760 \)
- Step 3: Sum each column:
  - \( \sum p_0 q_0 = 1100 + 1050 + 800 = 2950 \)
  - \( \sum p_1 q_0 = 1400 + 1200 + 950 = 3550 \)
  - \( \sum p_0 q_1 = 990 + 1225 + 640 = 2855 \)
  - \( \sum p_1 q_1 = 1260 + 1400 + 760 = 3420 \)
- Step 4: Compute Laspeyres and Paasche indices:
  - \( P_L = \frac{3550}{2950} \times 100 = 120.34 \)
  - \( P_P = \frac{3420}{2855} \times 100 = 119.79 \)
- Step 5: Compute Fisher's Ideal Index as geometric mean:
  - \( P_F = \sqrt{120.34 \times 119.79} = \sqrt{14415.53} = 120.06 \)
- Step 6: Interpret — Fisher's index of 120.06 means prices rose by 20.06% from 2020 to 2024, using a hybrid basket that accounts for both base and current consumption patterns. Note \( P_L > P_F > P_P \) (120.34 > 120.06 > 119.79), consistent with normal substitution away from items with larger price increases (wheat price rose 27%, quantity fell; dal price rose 19%, quantity fell).

**REASONING:** Fisher's index combines Laspeyres (base-year weights) and Paasche (current-year weights) via geometric mean. The geometric mean is the correct average for ratios because it preserves the multiplicative structure — it ensures the Time Reversal Test holds. The computation follows the standard sequence: four sums → two component indices → geometric mean. The ordering \( P_L > P_F > P_P \) occurs when consumers substitute away from goods whose prices rose relatively more (wheat and dal), which is the typical case.

**ANSWER:** Fisher's Ideal Price Index = 120.06 (base 2020 = 100). Prices increased by 20.06% from 2020 to 2024.

## WORKED_EXAMPLE_2
**PROBLEM:** For a small manufacturing firm, the following data shows prices (₹/unit) and quantities (units) of two raw materials in 2022 (base) and 2024 (current). Calculate Fisher's Ideal Price Index and verify the Time Reversal Test by computing \( P_{01} \times P_{10} \).

| Material | \( p_0 \) | \( q_0 \) | \( p_1 \) | \( q_1 \) |
|----------|----------|----------|----------|----------|
| Steel | 55 | 200 | 62 | 180 |
| Copper | 480 | 50 | 550 | 55 |

**STEPS:**
- Step 1: Set up the four required sums for 2022 (base) to 2024 (current):
  - Steel: \( p_0 q_0 = 55 \times 200 = 11000 \); \( p_1 q_0 = 62 \times 200 = 12400 \); \( p_0 q_1 = 55 \times 180 = 9900 \); \( p_1 q_1 = 62 \times 180 = 11160 \)
  - Copper: \( p_0 q_0 = 480 \times 50 = 24000 \); \( p_1 q_0 = 550 \times 50 = 27500 \); \( p_0 q_1 = 480 \times 55 = 26400 \); \( p_1 q_1 = 550 \times 55 = 30250 \)
- Step 2: Sum across commodities:
  - \( \sum p_0 q_0 = 11000 + 24000 = 35000 \)
  - \( \sum p_1 q_0 = 12400 + 27500 = 39900 \)
  - \( \sum p_0 q_1 = 9900 + 26400 = 36300 \)
  - \( \sum p_1 q_1 = 11160 + 30250 = 41410 \)
- Step 3: Compute \( P_{01} \) (2022→2024):
  - \( P_L = \frac{39900}{35000} \times 100 = 114.00 \)
  - \( P_P = \frac{41410}{36300} \times 100 = 114.08 \)
  - \( P_{01} = \sqrt{114.00 \times 114.08} = \sqrt{13005.12} = 114.04 \)
- Step 4: Compute \( P_{10} \) (2024→2022) by swapping roles of base and current:
  - Now base is 2024, current is 2022: \( p_0' = p_1, q_0' = q_1, p_1' = p_0, q_1' = q_0 \)
  - \( \sum p_0' q_0' = \sum p_1 q_1 = 41410 \)
  - \( \sum p_1' q_0' = \sum p_0 q_1 = 36300 \)
  - \( \sum p_0' q_1' = \sum p_1 q_0 = 39900 \)
  - \( \sum p_1' q_1' = \sum p_0 q_0 = 35000 \)
  - \( P_L' = \frac{36300}{41410} \times 100 = 87.66 \)
  - \( P_P' = \frac{35000}{39900} \times 100 = 87.72 \)
  - \( P_{10} = \sqrt{87.66 \times 87.72} = \sqrt{7689.54} = 87.69 \)
- Step 5: Verify Time Reversal Test: \( P_{01} \times P_{10} = 114.04 \times 87.69 = 10000.17 \approx 10000 \) (i.e., 100 × 100). In index form: \( \frac{114.04}{100} \times \frac{87.69}{100} = 1.0000 \). Test satisfied!
- Step 6: Note that \( P_L \approx P_P \) here (114.00 vs 114.08) because quantity changes are small relative to price changes — steel quantity fell 10%, copper rose 10%. Fisher ≈ both.

**REASONING:** The Time Reversal Test requires that if we compute the index forward (base→current) and backward (current→base), their product equals 1 (or 10000 in percentage form). Fisher's geometric mean structure guarantees this because \( P_{01} = \sqrt{\frac{\sum p_1 q_0}{\sum p_0 q_0} \times \frac{\sum p_1 q_1}{\sum p_0 q_1}} \) and \( P_{10} = \sqrt{\frac{\sum p_0 q_1}{\sum p_1 q_1} \times \frac{\sum p_0 q_0}{\sum p_1 q_0}} \); multiplying gives 1 exactly. Laspeyres and Paasche individually fail this test. The verification step is crucial for board exams — they often ask "verify Time Reversal Test for Fisher's index."

**ANSWER:** Fisher's Ideal Price Index \( P_{01} = 114.04 \). Time Reversal Test verified: \( P_{01} \times P_{10} = 10000 \) (or 1.0000 in ratio form).

## WORKED_EXAMPLE_3
**PROBLEM:** An economy produces only three goods: Food, Clothing, and Housing. Base year 2021 and current year 2023 data are given below. Compute Fisher's Ideal Price Index and Fisher's Ideal Quantity Index. Then verify the Factor Reversal Test: \( P_{01} \times Q_{01} = \frac{\sum p_1 q_1}{\sum p_0 q_0} \).

| Good | \( p_0 \) (₹) | \( q_0 \) (units) | \( p_1 \) (₹) | \( q_1 \) (units) |
|------|---------------|-------------------|---------------|-------------------|
| Food | 40 | 1000 | 50 | 1100 |
| Clothing | 200 | 200 | 220 | 180 |
| Housing | 5000 | 50 | 6000 | 55 |

**STEPS:**
- Step 1: Compute the four expenditure sums for Price Index (\( P_{01} \)):
  - Food: \( p_0 q_0 = 40000 \); \( p_1 q_0 = 50000 \); \( p_0 q_1 = 44000 \); \( p_1 q_1 = 55000 \)
  - Clothing: \( p_0 q_0 = 40000 \); \( p_1 q_0 = 44000 \); \( p_0 q_1 = 36000 \); \( p_1 q_1 = 39600 \)
  - Housing: \( p_0 q_0 = 250000 \); \( p_1 q_0 = 300000 \); \( p_0 q_1 = 275000 \); \( p_1 q_1 = 330000 \)
  - Sums: \( \sum p_0 q_0 = 330000 \); \( \sum p_1 q_0 = 394000 \); \( \sum p_0 q_1 = 355000 \); \( \sum p_1 q_1 = 424600 \)
- Step 2: Compute Fisher Price Index \( P_{01} \):
  - \( P_L = \frac{394000}{330000} \times 100 = 119.39 \)
  - \( P_P = \frac{424600}{355000} \times 100 = 119.61 \)
  - \( P_{01} = \sqrt{119.39 \times 119.61} = \sqrt{14280.04} = 119.50 \)
- Step 3: Compute Fisher Quantity Index \( Q_{01} \) (swap prices and quantities in formula):
  - \( Q_L = \frac{\sum q_1 p_0}{\sum q_0 p_0} \times 100 = \frac{355000}{330000} \times 100 = 107.58 \)
  - \( Q_P = \frac{\sum q_1 p_1}{\sum q_0 p_1} \times 100 = \frac{424600}{394000} \times 100 = 107.77 \)
  - \( Q_{01} = \sqrt{107.58 \times 107.77} = \sqrt{11593.90} = 107.67 \)
- Step 4: Compute value ratio \( V_{01} = \frac{\sum p_1 q_1}{\sum p_0 q_0} \times 100 = \frac{424600}{330000} \times 100 = 128.67 \)
- Step 5: Verify Factor Reversal Test: \( P_{01} \times Q_{01} = 119.50 \times 107.67 = 12866.57 \). In index form: \( \frac{119.50}{100} \times \frac{107.67}{100} = 1.2867 \). Value ratio \( \frac{V_{01}}{100} = 1.2867 \). They match! Test satisfied.
- Step 6: Interpret — Prices rose 19.50%, quantities rose 7.67%, combined value rose 28.67%. The product of price and quantity indices equals the value index, meaning Fisher's decomposition of value change into price and quantity components is perfectly consistent.

**REASONING:** The Factor Reversal Test checks whether the price index and quantity index are "factor reversible" — i.e., multiplying them gives the total value change. Fisher's symmetric formula (geometric mean of \( \frac{\sum p_1 q_0}{\sum p_0 q_0} \) and \( \frac{\sum p_1 q_1}{\sum p_0 q_1} \) for prices; and geometric mean of \( \frac{\sum q_1 p_0}{\sum q_0 p_0} \) and \( \frac{\sum q_1 p_1}{\sum q_0 p_1} \) for quantities) guarantees this. Laspeyres price × Paasche quantity = value ratio, but Laspeyres price × Laspeyres quantity ≠ value ratio. Only Fisher works both ways. This problem combines price and quantity index concepts — a common board exam pattern.

**ANSWER:** Fisher's Ideal Price Index = 119.50; Fisher's Ideal Quantity Index = 107.67; Value Ratio = 128.67. Factor Reversal Test verified: \( P_{01} \times Q_{01} = V_{01} \).

## COMPETENCY_QUESTION_1
**QUESTION:** A statistical officer computes Laspeyres price index as 125 and Paasche price index as 115 for a given dataset. She reports Fisher's Ideal Index as 120, saying "it's the average of the two." Her senior officer rejects this. (a) Identify the error. (b) Compute the correct Fisher index. (c) Explain why the geometric mean is necessary for the Time Reversal Test to hold, using the property \( \sqrt{a \times b} \times \sqrt{\frac{1}{a} \times \frac{1}{b}} = 1 \).

**COMPETENCY:** Error identification and correction; conceptual justification of mathematical properties.

**STEPS:**
- Step 1: Identify the error — Fisher's index uses geometric mean \( \sqrt{P_L \times P_P} \), not arithmetic mean \( \frac{P_L + P_P}{2} \).
- Step 2: Compute correct Fisher index: \( \sqrt{125 \times 115} = \sqrt{14375} = 119.90 \) (not 120).
- Step 3: Explain Time Reversal Test: For base→current, \( P_{01} = \sqrt{\frac{\sum p_1 q_0}{\sum p_0 q_0} \times \frac{\sum p_1 q_1}{\sum p_0 q_1}} \). For current→base, swap 0 and 1: \( P_{10} = \sqrt{\frac{\sum p_0 q_1}{\sum p_1 q_1} \times \frac{\sum p_0 q_0}{\sum p_1 q_0}} \). Their product: \( P_{01} \times P_{10} = \sqrt{ \frac{\sum p_1 q_0}{\sum p_0 q_0} \times \frac{\sum p_1 q_1}{\sum p_0 q_1} \times \frac{\sum p_0 q_1}{\sum p_1 q_1} \times \frac{\sum p_0 q_0}{\sum p_1 q_0} } = \sqrt{1} = 1 \). The geometric mean structure makes the cross-cancellation work perfectly. Arithmetic mean would give \( \frac{1}{2}(a+b) \times \frac{1}{2}(\frac{1}{a}+\frac{1}{b}) \neq 1 \) in general.

**ANSWER:** (a) Error: Used arithmetic mean instead of geometric mean. (b) Correct Fisher index = 119.90. (c) Geometric mean ensures \( P_{01} \times P_{10} = 1 \) because the four component ratios cancel pairwise under the square root; arithmetic mean lacks this multiplicative symmetry.

**DIFFICULTY:** medium

## COMPETENCY_QUESTION_2
**QUESTION:** The National Statistical Office (NSO) is deciding between Laspeyres and Fisher indices for a new Consumer Price Index (CPI) series. As an economic advisor, write a brief note (4-5 sentences) comparing the two on: (i) data requirements, (ii) substitution bias, (iii) theoretical properties (reversal tests), (iv) practical feasibility for monthly release. Conclude with your recommendation for a developing economy with limited statistical capacity.

**COMPETENCY:** Translating real-world situations to mathematical expressions; comparing and justifying; policy-relevant reasoning.

**STEPS:**
- Step 1: Data requirements — Laspeyres needs only base-year quantities (\( q_0 \)) which are fixed from a survey; Fisher needs current-year quantities (\( q_1 \)) every period, requiring frequent consumption surveys.
- Step 2: Substitution bias — Laspeyres uses fixed \( q_0 \), ignoring consumers switching to cheaper alternatives when prices rise → overstates inflation (upward bias). Fisher uses both \( q_0 \) and \( q_1 \), capturing substitution → lower bias.
- Step 3: Theoretical properties — Laspeyres fails both Time Reversal and Factor Reversal Tests; Fisher passes both, making it "ideal" mathematically.
- Step 4: Practical feasibility — Laspeyres can be computed monthly with only price updates (quantities fixed); Fisher requires updated \( q_1 \) each month, which is infeasible without continuous expenditure surveys. Most countries (including India) use Laspeyres-type CPI for this reason.
- Step 5: Recommendation — For a developing economy with limited capacity, recommend Laspeyres (or a Laspeyres-chain variant) for monthly CPI due to feasibility, but compute Fisher annually/benchmark when full survey data is available to correct bias.

**ANSWER:** Laspeyres requires only base-year quantities (fixed basket), enabling monthly computation with price data alone; Fisher needs current-year quantities each period, demanding costly frequent surveys. Laspeyres has upward substitution bias (ignores consumer switching); Fisher captures substitution via \( q_1 \), reducing bias. Theoretically, Laspeyres fails Time Reversal and Factor Reversal Tests; Fisher passes both — it's "ideal." Practically, Laspeyres is feasible for monthly CPI; Fisher is not without continuous expenditure data. Recommendation: Use Laspeyres for monthly CPI (feasibility), but compute Fisher annually as a benchmark to measure and correct substitution bias.

**DIFFICULTY:** hard

## DIAGNOSTIC_QUESTION_7

A market analyst computes a Laspeyres index of 125 and a Paasche index of 115 for rice prices between two years. Calculate Fisher's Ideal Index to one decimal place.

## DIAGNOSTIC_ANSWER_7

Fisher's index is the geometric mean of the two: Fisher index = square root of (125 x 115) = 119.9 approximately. A wrong answer that takes the arithmetic mean 120 shows the student has missed that Fisher's formula takes the square root of the product, not the plain average. Verify against the lesson's own wording before you commit.

## DIAGNOSTIC_QUESTION_8

Give the correct order of steps to compute Fisher's Ideal Index from raw price and quantity data of two years.

## DIAGNOSTIC_ANSWER_8

The computation runs: (1) Sum the products of current prices and base quantities for Laspeyres (2) Sum the products of current prices and current quantities for Paasche (3) Divide each by its base-year total and multiply by 100 (4) Take the square root of the product of the two indices. A wrong answer that averages the two indices arithmetically shows the student has missed that Fisher's ideal form is the geometric mean, the step that lets it pass the reversal tests.

## DIAGNOSTIC_QUESTION_9

Why is Fisher's index called ideal, and which two tests does it alone satisfy?

## DIAGNOSTIC_ANSWER_9

It is called ideal because the geometric mean of Laspeyres and Paasche uses both base-year and current-year quantities as weights, lies between the two, and alone passes both the Time Reversal Test and the Factor Reversal Test. A wrong answer that credits Laspeyres with passing the reversal tests shows the student has missed that base-year weights alone overstate inflation and current-year weights alone understate it.

## DIAGNOSTIC_QUESTION_10

A market analyst computes a Laspeyres index of 125 and a Paasche index of 115 for rice prices between two years. Calculate Fisher's Ideal Index to one decimal place.

## DIAGNOSTIC_ANSWER_10

Fisher's index is the geometric mean of the two: Fisher index = square root of (125 x 115) = 119.9 approximately. A wrong answer that takes the arithmetic mean 120 shows the student has missed that Fisher's formula takes the square root of the product, not the plain average. Verify against the lesson's own wording before you commit.

## DIAGNOSTIC_QUESTION_11

Give the correct order of steps to compute Fisher's Ideal Index from raw price and quantity data of two years.

## DIAGNOSTIC_ANSWER_11

The computation runs: (1) Sum the products of current prices and base quantities for Laspeyres (2) Sum the products of current prices and current quantities for Paasche (3) Divide each by its base-year total and multiply by 100 (4) Take the square root of the product of the two indices. A wrong answer that averages the two indices arithmetically shows the student has missed that Fisher's ideal form is the geometric mean, the step that lets it pass the reversal tests.

## DIAGNOSTIC_QUESTION_12

Why is Fisher's index called ideal, and which two tests does it alone satisfy?

## DIAGNOSTIC_ANSWER_12

It is called ideal because the geometric mean of Laspeyres and Paasche uses both base-year and current-year quantities as weights, lies between the two, and alone passes both the Time Reversal Test and the Factor Reversal Test. A wrong answer that credits Laspeyres with passing the reversal tests shows the student has missed that base-year weights alone overstate inflation and current-year weights alone understate it.
