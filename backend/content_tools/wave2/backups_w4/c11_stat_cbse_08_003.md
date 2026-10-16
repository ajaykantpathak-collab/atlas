## ELI5
Five grocery items priced in two years: how has the monthly bill moved? The simple aggregative method sums current prices, divides by base-year prices, multiplies by 100. The average-of-relatives method converts each item to its own percentage first, then averages. Both give every item an equal vote - rice and sugar weigh the same - which is their virtue, their blindness, and the reason weighted methods exist.

## DEFINITION
A simple index number measures the average relative change in a variable (price or quantity) of a group of items over time, without assigning weights to individual items. It is computed either by the simple aggregative method (ratio of sums of current and base period values multiplied by 100) or by the simple average of relatives method (arithmetic mean of individual price/quantity relatives, each expressed as a percentage of the base period value).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can independently compute both price and quantity index numbers using the simple aggregative method and the simple average of relatives method for a given dataset, and interpret the resulting index number as a percentage change relative to the base period.

## SCOPE_BOUNDARY
This node covers the construction of unweighted (simple) index numbers only: simple aggregative method and simple average of price/quantity relatives method. It does NOT cover weighted index numbers (Laspeyres, Paasche, Fisher), chain-base indices, or deflating/index splicing, which are treated in subsequent nodes.

## WALKTHROUGH
Imagine you are tracking the prices of five essential grocery items (rice, wheat, milk, oil, sugar) over two years to see how much your monthly grocery bill has changed. You have the prices for each item in the base year (2023) and the current year (2024). To begin, list the items and their prices in both years. Then decide which method to use: if you want a quick overall ratio, use the simple aggregative method by summing all current-year prices, dividing by the sum of base-year prices, and multiplying by 100. If you want to see the average percentage change per item, compute each item's price relative (current price/base price × 100) and then take the arithmetic mean of those relatives. The key insight is that both methods treat every item equally, regardless of how much of each item is actually consumed, which is why we later move to weighted methods.

Takeaway: mastery means computing both simple index methods and stating their unweighted assumption plainly. Exam moves: compute-the-simple-index questions on the grocery scene. Check yourself: the aggregative answer depends on the units of the price quotes, the relatives answer does not - a difference worth a line in any comparison. Students miss it because 100 looks like decoration, when the base-year ratio shows the design: the multiplier by 100 is what turns a ratio into an index number, and the equal-vote property is precisely the flaw that quantity-weighted methods were invented to repair.

## DIAGNOSTIC_QUESTION_1
What is the formula for the simple aggregative price index number, and what does each symbol represent?

## DIAGNOSTIC_ANSWER_1
The formula is \( P_{01} = \frac{\sum P_1}{\sum P_0} \times 100 \), where \( P_1 \) is the price in the current period, \( P_0 \) is the price in the base period, and the summation runs over all items. A wrong answer (e.g., using quantities instead of prices, or forgetting to multiply by 100) reveals that the student confuses price and quantity indices or does not understand that the index is expressed as a percentage of the base period.

## DIAGNOSTIC_QUESTION_2
Explain in your own words why the simple average of price relatives method might give a different result from the simple aggregative method for the same dataset.

## DIAGNOSTIC_ANSWER_2
The simple aggregative method weights each item by its absolute price level (higher-priced items dominate the sum), while the simple average of relatives treats each item's percentage change equally regardless of its price level. A wrong answer that claims they always give the same result shows the student misses the implicit weighting difference; a wrong answer that confuses the two formulas indicates a lack of conceptual distinction between summing prices and averaging ratios.

## DIAGNOSTIC_QUESTION_3
Given the following data for three items, compute the simple aggregative quantity index number for 2024 with 2023 as base year.
Item A: Q2023=10 kg, Q2024=12 kg
Item B: Q2023=5 kg, Q2024=6 kg
Item C: Q2023=20 kg, Q2024=18 kg

## DIAGNOSTIC_ANSWER_3
Step 1: Sum base-year quantities: 10+5+20 = 35 kg. Step 2: Sum current-year quantities: 12+6+18 = 36 kg. Step 3: Apply formula: \( Q_{01} = \frac{36}{35} \times 100 = 102.86 \). A wrong answer (e.g., 103.5 or 97.14) reveals arithmetic errors or using prices instead of quantities, or reversing the base and current periods.

## DIAGNOSTIC_QUESTION_4
Compare the simple aggregative method and the simple average of relatives method in terms of the units of measurement of the items. Which method is affected by the choice of units (e.g., kg vs. grams) and why?

## DIAGNOSTIC_ANSWER_4
The simple aggregative method is affected by the units of measurement because summing prices/quantities directly depends on the scale (e.g., measuring in grams instead of kg multiplies the sum by 1000, changing the index). The simple average of relatives is unit-free because each relative is a pure ratio. A wrong answer that says both are unit-free or both are affected shows the student does not understand the role of units in aggregation versus averaging ratios.

## DIAGNOSTIC_QUESTION_5
A student argues: "Since the simple average of price relatives gives equal importance to each item, it is always better than the simple aggregative method." Evaluate this statement.

## DIAGNOSTIC_ANSWER_5
The statement is not universally true. Equal importance per item may be desirable when items are heterogeneous and we want each percentage change to count equally, but it ignores the economic significance of items with larger price magnitudes (e.g., a 10% change in a car price matters more than a 10% change in a pencil price). The simple aggregative method implicitly weights by price level, which can be meaningful in some contexts. A wrong answer that agrees without qualification shows the student cannot critically assess the trade-offs between methods.

## DIAGNOSTIC_QUESTION_6
Create a small dataset (at least 4 items) where the simple aggregative price index and the simple average of price relatives index differ by more than 5 index points. Show both calculations.

## DIAGNOSTIC_ANSWER_6
Example: Item1: P0=100, P1=120; Item2: P0=10, P1=15; Item3: P0=50, P1=55; Item4: P0=200, P1=210.
Simple aggregative: ΣP0=360, ΣP1=400 → index = 111.11.
Relatives: 120, 150, 110, 105 → mean = 121.25.
Difference ≈ 10.14 points. A poor answer would use items with similar price levels, yielding a small difference, indicating the student does not grasp how price dispersion drives the divergence.

## COMMON_MISCONCEPTION
Students often believe that the simple aggregative method and the simple average of relatives method always yield the same index number because both are "simple" and "unweighted." They fail to see that the aggregative method implicitly weights items by their absolute price/quantity levels, while the average-of-relatives method weights each item's percentage change equally. For example, if one item's price is 1000 and another's is 10, a 10% change in the first item changes the aggregative sum by 100, but the same 10% change in the second changes the sum by only 1, so the first item dominates the index. In the average-of-relatives, both 10% changes contribute equally to the mean.

## ON_FAILURE
1. Have the student compute both indices for a dataset with widely varying price levels (e.g., a car and a pencil) and observe the difference. 2. Ask them to express each item's contribution to the total sum in the aggregative method and compare it to its contribution to the mean of relatives. 3. Guide them to articulate in their own words why the two methods weight items differently. 4. Provide a second dataset where prices are similar and show the indices converge, reinforcing that the divergence stems from price dispersion.

## PREREQUISITE_NODE_IDS
c11_stat_cbse_08_001, c11_stat_cbse_08_002, c8_math_ch8_1, c8_math_ch7_2, c7_math_ch13_004, c8_math_ch8_6

## PREREQUISITE_REASONS
c11_stat_cbse_08_001: Provides the definition and characteristics of index numbers, establishing what an index number is and why we construct them.
c11_stat_cbse_08_002: Explains the uses and importance, giving context for why we need to measure price/quantity changes.
c8_math_ch8_1: Percentages are the foundation of price/quantity relatives (each relative is a percentage of the base value).
c8_math_ch7_2: Ratios underlie the concept of a relative (current/base) and the index formula itself.
c7_math_ch13_004: The simple average of relatives requires computing an arithmetic mean, which is introduced here.
c8_math_ch8_6: Revisit percentage change (c8_math_ch8_6) and mean calculation (c7_math_ch13_004) with simple numerical examples.  

## FORWARD_NODE_IDS
c11_stat_cbse_08_004, c11_stat_cbse_08_005, c11_stat_cbse_08_006, c11_stat_cbse_08_007, c11_stat_cbse_08_010, c12_eco_cbse_08_003

## FORWARD_REASONS
c11_stat_cbse_08_004: Weighted index numbers are introduced as an improvement over simple indices, directly building on the limitations of unweighted methods.
c11_stat_cbse_08_005: Laspeyres' formula uses base-period quantities as weights, extending the simple aggregative idea by incorporating weights.
c11_stat_cbse_08_006: Paasche's formula uses current-period quantities as weights, another weighted extension.
c11_stat_cbse_08_007: Fisher's ideal index combines Laspeyres and Paasche, requiring mastery of both simple and weighted concepts.
c11_stat_cbse_08_010: Simple index number construction provides the foundation for interpreting any index number used in inflation calculation.  
c12_eco_cbse_08_003: Construction of simple index numbers — GDP Deflator is a Paasche-type index (current weights).  

## CROSS_SUBJECT_PREREQS
c8_math_ch8_1, c8_math_ch7_2
## CROSS_SUBJECT_REASONS
c8_math_ch8_1: Percentages (per hundred) are the direct mathematical tool used to express price relatives and the final index number.
c8_math_ch7_2: Ratios (a:b) form the basis of the relative change calculation (current/base) before converting to percentage.

## CHAIN_DESCRIPTION
c11_stat_cbse_08_001 -> c11_stat_cbse_08_003 -> c11_stat_cbse_08_004

## THIS_FORMULA
Simple Aggregative Price Index: \( P_{01} = \frac{\sum P_1}{\sum P_0} \times 100 \); Simple Aggregative Quantity Index: \( Q_{01} = \frac{\sum Q_1}{\sum Q_0} \times 100 \); Simple Average of Price Relatives: \( P_{01} = \frac{1}{N} \sum \left( \frac{P_1}{P_0} \times 100 \right) \); Simple Average of Quantity Relatives: \( Q_{01} = \frac{1}{N} \sum \left( \frac{Q_1}{Q_0} \times 100 \right) \)

## FORMULA_VARIABLES
\( P_0 \): Price in base period; \( P_1 \): Price in current period; \( Q_0 \): Quantity in base period; \( Q_1 \): Quantity in current period; \( N \): Number of items; \( \sum \): Summation over all items.

## FORMULA_UNITS
Index numbers are unit-free pure numbers (expressed as percentages, e.g., 105 means 5% increase). Prices in ₹/unit, quantities in kg, litres, metres, etc., but units cancel in relatives.

## COMPUTATION_TYPE
statistical

## CROSS_SUBJECT
c8_math_ch8_1 | Percentages provide the "per hundred" scaling that converts a price relative (ratio) into an index number.
c8_math_ch7_2 | Ratios express the fundamental comparison between current and base period values; the index is a ratio multiplied by 100.
c7_math_ch13_004 | The arithmetic mean (average) is used to aggregate individual price relatives into a single index in the average-of-relatives method.

## PREREQ_CONCEPT
Understanding that a ratio of two same-unit quantities is unit-free, and multiplying by 100 converts it to a percentage.

## PREREQ_BEFORE
The student must be able to compute a percentage change between two values and calculate the arithmetic mean of a set of numbers.

## PREREQ_STUCK
Revisit percentage change (c8_math_ch8_6) and mean calculation (c7_math_ch13_004) with simple numerical examples.

## WORKED_EXAMPLE_1
PROBLEM: Calculate the simple aggregative price index and the simple average of price relatives index for the following data (base year 2022, current year 2023). Prices in ₹ per kg.
Item: Rice, Wheat, Sugar, Oil
P2022: 40, 25, 45, 120
P2023: 44, 28, 50, 130

STEPS:
- Step 1: Identify the given data: four items with base-year prices (P0) and current-year prices (P1).
- Step 2: Compute the simple aggregative price index: sum P0 = 40+25+45+120 = 230; sum P1 = 44+28+50+130 = 252; index = (252/230)×100 = 109.57.
- Step 3: Compute price relatives for each item: Rice = (44/40)×100 = 110; Wheat = (28/25)×100 = 112; Sugar = (50/45)×100 = 111.11; Oil = (130/120)×100 = 108.33.
- Step 4: Compute the simple average of these relatives: (110 + 112 + 111.11 + 108.33) / 4 = 441.44 / 4 = 110.36.
- Step 5: Interpret: Both indices show about a 9.6% to 10.4% increase in prices overall; the average-of-relatives is slightly higher because the items with lower base prices (wheat, sugar) had higher percentage increases and are given equal weight in the average.

REASONING: The aggregative method sums prices directly, so items with higher absolute prices (oil) dominate the total. The average-of-relatives treats each item's percentage change equally, so the higher percentage increases of wheat and sugar pull the average up more. This illustrates the implicit weighting difference.

ANSWER: Simple Aggregative Price Index = 109.57; Simple Average of Price Relatives Index = 110.36.

## WORKED_EXAMPLE_2
PROBLEM: A household consumes three items. Quantities (in kg) for base year 2021 and current year 2022 are given. Compute the simple aggregative quantity index and the simple average of quantity relatives index.
Item X: Q2021=15, Q2022=18
Item Y: Q2021=10, Q2022=9
Item Z: Q2021=25, Q2022=30

STEPS:
- Step 1: List base-year quantities (Q0) and current-year quantities (Q1) for each item.
- Step 2: Simple aggregative quantity index: ΣQ0 = 15+10+25 = 50; ΣQ1 = 18+9+30 = 57; index = (57/50)×100 = 114.00.
- Step 3: Quantity relatives: X = (18/15)×100 = 120; Y = (9/10)×100 = 90; Z = (30/25)×100 = 120.
- Step 4: Simple average of quantity relatives: (120 + 90 + 120) / 3 = 330 / 3 = 110.00.
- Step 5: Compare: Aggregative index 114 vs average-of-relatives 110. The difference arises because item Z has the largest base quantity (25) and a 20% increase, which heavily influences the aggregative sum, while item Y's 10% decrease is given equal weight in the average-of-relatives, pulling it down.

REASONING: The aggregative method weights by absolute quantity levels, so the large quantity item Z dominates. The average-of-relatives weights each item's percentage change equally, so Y's decrease offsets Z's increase more strongly.

ANSWER: Simple Aggregative Quantity Index = 114.00; Simple Average of Quantity Relatives Index = 110.00.

## WORKED_EXAMPLE_3
PROBLEM: For the following data, compute both the simple aggregative price index and the simple average of price relatives index. Then, explain which index would be more appropriate if the items represent a poor household's consumption basket where the cheaper items are essential staples.
Item: Millet, Pulse, Vegetable, Fruit
P2020 (₹/kg): 20, 80, 30, 150
P2021 (₹/kg): 24, 88, 33, 165

STEPS:
- Step 1: Organize data: four items with base and current prices.
- Step 2: Simple aggregative price index: ΣP0 = 20+80+30+150 = 280; ΣP1 = 24+88+33+165 = 310; index = (310/280)×100 = 110.71.
- Step 3: Price relatives: Millet = (24/20)×100 = 120; Pulse = (88/80)×100 = 110; Vegetable = (33/30)×100 = 110; Fruit = (165/150)×100 = 110.
- Step 4: Simple average of relatives = (120 + 110 + 110 + 110) / 4 = 450 / 4 = 112.50.
- Step 5: Note the difference: average-of-relatives (112.50) > aggregative (110.71) because the staple millet (cheapest) had the highest percentage increase (20%) and gets equal weight in the average, while in the aggregative method its low price reduces its influence.
- Step 6: For a poor household, staples like millet constitute a large share of expenditure despite low unit price. The average-of-relatives better reflects the impact on their cost of living because it gives equal importance to the percentage change of each essential item, whereas the aggregative method underweights the staple.

REASONING: This example connects the mathematical difference to an economic interpretation, showing why the choice of method matters for policy. The average-of-relatives captures the higher inflation experienced on essential low-priced items.

ANSWER: Simple Aggregative Price Index = 110.71; Simple Average of Price Relatives Index = 112.50. For a poor household, the average-of-relatives index is more appropriate.

## COMPETENCY_QUESTION_1
QUESTION: A student computes the simple aggregative price index for a set of 5 items and gets 115. She then computes the simple average of price relatives for the same data and gets 112. She claims there must be a calculation error because both methods should give the same result. Is she correct? Justify your answer with a reasoned explanation and a concrete numerical example (you may create a small dataset) that demonstrates why the two methods can yield different results.

COMPETENCY: Comparing and justifying methods; identifying and correcting misconceptions.

STEPS:
- Step 1: Recognize that the student's claim is a common misconception.
- Step 2: Explain that the two methods weight items differently: aggregative weights by absolute price level, average-of-relatives weights each percentage change equally.
- Step 3: Construct a simple dataset with two items where prices differ greatly (e.g., Item A: P0=100, P1=120; Item B: P0=10, P1=15).
- Step 4: Compute both indices for this dataset to show they differ.
- Step 5: Conclude that no error is necessary; the difference is inherent to the methods.

ANSWER: The student is incorrect. The simple aggregative method and the simple average of relatives method are not mathematically equivalent; they weight items differently. For example, with Item A (P0=100, P1=120) and Item B (P0=10, P1=15): Aggregative index = (135/110)×100 = 122.73; Average of relatives = (120 + 150)/2 = 135. The difference arises because the expensive item A dominates the aggregative sum, while both items contribute equally to the average of relatives. Therefore, different results are expected and do not indicate a calculation error.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: An economist wants to construct a simple index number to measure the change in the cost of a basket of 10 goods for a rural household. The basket includes both very cheap staples (e.g., salt, ₹20/kg) and relatively expensive items (e.g., cooking oil, ₹150/litre). The economist is concerned that the simple aggregative method will be dominated by the expensive items, while the simple average of relatives will give equal weight to the percentage change in salt and oil. She proposes a compromise: compute the simple aggregative index but first convert all prices to "price per 100 grams" so that the units are uniform and the price levels become more comparable. Will this solve the domination problem? Explain why or why not, and suggest a better approach if this does not work.

COMPETENCY: Translating real-world situations to mathematical expressions; evaluating methodological choices.

STEPS:
- Step 1: Analyze the proposal: converting to price per 100 grams changes the unit but multiplies all prices by the same factor (10 for kg to 100g). The ratio of sums remains unchanged because the factor cancels out.
- Step 2: Show mathematically: new P0' = k·P0, new P1' = k·P1; ΣP1'/ΣP0' = kΣP1 / kΣP0 = ΣP1/ΣP0. So the index is identical.
- Step 3: Explain that the domination problem stems from the relative magnitudes of the prices, not the units. Changing units scales all prices equally, preserving their ratios.
- Step 4: Suggest a better approach: use a weighted index (e.g., Laspeyres or Paasche) where weights reflect the quantities consumed, or use the simple average of relatives if equal importance to each item's percentage change is desired.
- Step 5: Conclude that the proposal does not solve the problem; a weighted method is needed to reflect actual consumption importance.

ANSWER: No, converting to price per 100 grams will not solve the domination problem because it multiplies all prices by the same constant, which cancels out in the ratio of sums. The simple aggregative index is invariant to uniform scaling of units. The domination arises from the actual relative price levels (oil is inherently more expensive per unit than salt), not the choice of units. A better approach is to use a weighted index number (like Laspeyres' or Paasche's) where weights are the quantities consumed, so that items with higher expenditure shares get appropriately higher influence. Alternatively, if the goal is to give each item equal voice in percentage terms, the simple average of relatives is appropriate, but it ignores consumption quantities.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: A simple index number measures the average relative change in a variable (price or quantity) of a group of items over time, without assigning weights to ______ items.

## DIAGNOSTIC_ANSWER_7
individual

**A wrong answer ("all") reveals the student has blurred the scope - weights are unassigned to individual items, each counting once.** The word is what the blank grades. Recall the definition's closing before filling, and give the word exactly. Verify against the lesson's own wording before you commit.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are tracking the prices of five ______ grocery items (rice, wheat, milk, oil, sugar) over two years to see how much your monthly grocery bill has changed.

## DIAGNOSTIC_ANSWER_8
essential

The word is essential - the grocery basket's character. A wrong answer ("monthly") reveals the student has swapped the adjective. Recall the scene's phrase before filling, and give the word exactly. Verify against the lesson's own wording before you commit. The blank grades the exact term, not a synonym.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: It is computed either by the simple aggregative method (ratio of sums of current and base period values multiplied by ______) or by the simple average of relatives method (arithmetic mean of individual price/quantity relatives, each expressed as a percentage of the base period value).

## DIAGNOSTIC_ANSWER_9
100

**A wrong answer ("10") reveals the student has invented a multiplier - both simple methods multiply by 100 to make an index.** The number is what the blank grades. Recall the convention before filling, and give the number exactly. Verify against the lesson's own wording before you commit. The blank grades the exact term, not a synonym.

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
The student can independently compute both price and quantity index numbers using the simple aggregative method and the simple average of relatives method for a given dataset, and interpret the resulting index number as a percentage change relative to the base period. Verify against the lesson's own wording before you commit.
