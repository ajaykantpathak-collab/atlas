## ELI5
Range is spread measured the quick way: biggest value minus smallest — the full reach of the data. Two classes can share the same average yet live different lives, one huddled close to the middle, the other scattered from bottom to top, and the range is the first number to notice. It answers 'how wide is the whole story?' with one difference. Its weakness mirrors its charm: it listens only to the two extremes, so one wild outlier can stretch it while everything in between stays exactly where it was.

## DEFINITION
Range is the difference between the maximum and minimum values in a data set. It measures the total spread of the data by calculating the distance from the smallest to the largest observation.
## COGNITIVE_LEVEL
understand
## MASTERY_CRITERIA
The student can compute the range for any given ungrouped data set, interpret what the range reveals about data variability in context, and explain why range alone is insufficient to describe the full distribution (e.g., sensitivity to outliers).
## SCOPE_BOUNDARY
Covers range calculation for raw/ungrouped data sets with whole numbers, decimals, and integers. Does NOT cover interquartile range, mean deviation, variance, or standard deviation (these are higher-class topics). Does not cover grouped data range estimation.
## WALKTHROUGH
Imagine you are comparing two cricket players: Rohit scored 45, 52, 48, 50, 55 runs in five matches, while Virat scored 10, 90, 30, 70, 40. Both have the same mean (50), but their performances feel very different. How can we quantify this difference in consistency? First, identify the highest and lowest score for each player. For Rohit, highest=55, lowest=45. For Virat, highest=90, lowest=10. Subtract lowest from highest: Rohit's range = 10, Virat's range = 80. The much larger range for Virat shows his scores are far more spread out. This connects to Class 7 learning of mean/median (c7_math_ch13_004, c7_math_ch13_005) - measures of center are not enough; we need a measure of spread. The key insight: Range = Maximum value − Minimum value. It is the simplest measure of dispersion.

Takeaway: range = maximum − minimum; it is the quickest spread measure but blind to everything between the extremes. Exam format: expect 'compute and interpret' — the interpretation sentence (data widely or tightly spread) carries marks alongside the subtraction itself. Verification beat: scan the full data set before subtracting — the true maximum sometimes hides mid-table rather than at the end. Why students miss it: they report the range as 'maximum and minimum' instead of their difference, or trust range alone to describe spread when a single outlier has stretched it far beyond the typical values.

## DIAGNOSTIC_QUESTION_1
What is the range of the data set: 12, 7, 19, 5, 14, 22, 9?
## DIAGNOSTIC_ANSWER_1
Correct answer: 17 (22 − 5 = 17). A wrong answer like 12 (the median) or 12.7 (the mean) reveals the student is confusing range with measures of central tendency. An answer of 12 (count of numbers) reveals confusion with frequency. An answer of 22 (just the maximum) reveals the student forgot to subtract the minimum.
## DIAGNOSTIC_QUESTION_2
Two classes took a math test. Class A has a range of 15 marks. Class B has a range of 40 marks. Both classes have the same mean score of 65. Which class has more consistent performance? Explain why range tells us this.
## DIAGNOSTIC_ANSWER_2
Correct answer: Class A has more consistent performance because a smaller range (15) means the scores are clustered closer together, while Class B's larger range (40) indicates wider variability. A wrong answer choosing Class B reveals the student thinks larger range means more consistency. An answer saying "cannot tell" reveals the student does not understand that range directly measures spread.
## DIAGNOSTIC_QUESTION_3
The daily high temperatures (in °C) in Delhi for a week were: 32, 35, 30, 28, 34, 36, 31. Find the range. If the temperature on Sunday was recorded incorrectly as 42 instead of 36, how does the range change?
## DIAGNOSTIC_ANSWER_3
Correct answer: Original range = 36 − 28 = 8°C. With error: max becomes 42, min remains 28, new range = 42 − 28 = 14°C. Range increases by 6°C. A wrong answer that keeps range as 8°C reveals the student did not update the maximum. An answer of 14°C for original range reveals the student used the incorrect data from the start. An answer of "range decreases" reveals confusion about direction of change.
## DIAGNOSTIC_QUESTION_4
Consider three data sets with the same mean (50) and same range (20):
Set X: 40, 45, 50, 55, 60
Set Y: 40, 40, 50, 60, 60
Set Z: 40, 40, 40, 60, 60, 60
All have range = 20. Do they have the same spread? Why or why not?
## DIAGNOSTIC_ANSWER_4
Correct answer: No, they do not have the same spread. Range only considers the extremes (min and max), ignoring how data is distributed between them. Set X is evenly spread, Set Y has clustering at extremes and center, Set Z has all data at extremes. A wrong answer saying "yes, same range means same spread" reveals the student thinks range captures the full distribution shape. An answer focusing only on the number of data points reveals confusion between spread and sample size.
## DIAGNOSTIC_QUESTION_5
A student calculated the range of the data set {3, 7, 2, 9, 5} as 9 − 2 = 7. Another student said the range is 7 − 3 = 4 because they used the median (5) and subtracted the smallest from the median. Evaluate both methods. Which is correct and why?
## DIAGNOSTIC_ANSWER_5
Correct answer: First student is correct. Range = maximum − minimum = 9 − 2 = 7. The second student's method is wrong because range uses the extreme values, not the median. The second student confused range with a measure of distance from center. A wrong answer accepting the second method reveals the student thinks range is measured from the center. An answer saying both are correct reveals inability to distinguish between measures of spread and measures of center.
## DIAGNOSTIC_QUESTION_6
Create a real-life scenario (Indian context) where knowing the range is more useful than knowing the mean. Describe the data, calculate the range, and explain why the mean would be misleading.
## DIAGNOSTIC_ANSWER_6
Good answer example: "Daily price of tomatoes (₹/kg) for a week: 20, 22, 18, 25, 19, 21, 60. Mean = 26.4, Range = 60−18 = 42. The mean suggests price ~₹26, but the range reveals one day had a huge spike (₹60). A housewife budgeting needs to know the possible maximum (range) not the average." A poor answer that uses a scenario where mean is sufficient (e.g., height of students) reveals the student cannot identify contexts where variability matters more than center. An answer without calculation reveals inability to apply the formula.
## COMMON_MISCONCEPTION
Students often confuse range with the "number of values" in the data set (e.g., for data {4, 7, 9}, they say range = 3 because there are three numbers). Others think range is calculated from the mean (e.g., max − mean) or median (max − median). A specific error: when data includes negative numbers (e.g., temperatures −5, 0, 3), students compute range as 3 − 0 = 3 instead of 3 − (−5) = 8, forgetting that subtracting a negative adds.
## ON_FAILURE
If a student confuses range with count: Have them physically plot the numbers on a number line. Ask: "How far apart are the leftmost and rightmost dots?" Count the jumps, not the dots. If they use mean/median: Give two data sets with same mean but different ranges (like the cricket example). Ask: "If both have same average, why do they feel different? Which number captures that difference?" For negative numbers: Use a vertical number line (thermometer). Show −5°C and 3°C. Ask: "What is the temperature difference?" Guide: difference = higher − lower = 3 − (−5) = 8. Emphasize: Range = Maximum − Minimum, always.
## PREREQUISITE_NODE_IDS
c8_math_ch12_7, c8_math_ch12_9, c8_math_ch12_10, c7_math_ch13_003, c7_math_ch13_004, c7_math_ch13_005, c7_math_ch13_006
## PREREQUISITE_REASONS
c8_math_ch12_7: Understanding median as a measure of center is needed before introducing spread measures.
c8_math_ch12_9: Understanding mode as a measure of center provides context for why we need spread.
c8_math_ch12_10: Comparing mean, median, mode teaches that center alone is insufficient, motivating range.
c7_math_ch13_003: Class 7 foundation on representative values (mean, median, mode) is the direct precursor.
c7_math_ch13_004: Mean calculation skill is needed to understand that same mean can have different spreads.
c7_math_ch13_005: Median calculation skill reinforces ordering data, which is essential for finding min/max.
c7_math_ch13_006: Mode calculation skill completes the set of central tendency measures before spread.
## FORWARD_NODE_IDS
c8_math_ch12_12
## FORWARD_REASONS
c8_math_ch12_12: Line plots and bar graphs require choosing an appropriate scale; the range of the data determines the minimum span of the axis.
## CROSS_SUBJECT_PREREQS
c7_math_ch13_008, c7_math_ch13_009
## CROSS_SUBJECT_REASONS
c7_math_ch13_008: Interpreting graphs in economics/social studies requires understanding data spread to read axes correctly.
c7_math_ch13_009: Analysing real-world data sets in science (e.g., temperature variation, rainfall) uses range to describe variability.
## CHAIN_DESCRIPTION
c7_math_ch13_003 -> c8_math_ch12_7 -> c8_math_ch12_11 -> c8_math_ch12_12
## THIS_FORMULA
Range = Maximum value − Minimum value
## FORMULA_VARIABLES
Maximum value = largest observation in the data set, Minimum value = smallest observation in the data set
## FORMULA_UNITS
Same units as the data (e.g., rupees, metres, °C, kg)
## COMPUTATION_TYPE
arithmetic
## CROSS_SUBJECT
c8_geo_ch2_1 | In geography, diurnal temperature range and annual rainfall range describe climate variability.
## PREREQ_CONCEPT
Ordering numbers (including integers and decimals) and subtraction are the core arithmetic prerequisites.
## PREREQ_BEFORE
The student must be able to identify the largest and smallest values in a list of numbers (including negative numbers and decimals) and subtract them correctly.
## PREREQ_STUCK
If stuck, revisit ordering integers and decimals on a number line (c6_math_ch02_017, c6_math_ch04_044) and subtraction of integers (c6_math_ch02_020).
## WORKED_EXAMPLE_1
PROBLEM: The weights (in kg) of 8 students in a class are: 34, 42, 38, 45, 31, 40, 36, 44. Find the range of the weights.
STEPS:
- Step 1: Identify the given data set: 34, 42, 38, 45, 31, 40, 36, 44. We need to find the range.
- Step 2: Recall the formula: Range = Maximum value − Minimum value. To apply this, first find the maximum and minimum.
- Step 3: Order the data to easily spot min and max: 31, 34, 36, 38, 40, 42, 44, 45. Minimum = 31 kg, Maximum = 45 kg.
- Step 4: Substitute into formula: Range = 45 − 31 = 14.
- Step 5: Interpret: The weights of students vary by 14 kg. The spread from lightest to heaviest is 14 kg. Answer with units: 14 kg.
REASONING: Ordering the data ensures we do not miss the true extremes. The range gives a single number summarizing the total variability in weights, complementing the average weight.
ANSWER: 14 kg
## WORKED_EXAMPLE_2
PROBLEM: The daily profit (in ₹) of a small shop for 6 days was: 1200, 950, 1500, 800, 1100, 1350. On the 7th day, the profit was ₹2000. By how much does the range increase when the 7th day is included?
STEPS:
- Step 1: Find range for first 6 days. Data: 1200, 950, 1500, 800, 1100, 1350. Order: 800, 950, 1100, 1200, 1350, 1500. Min=800, Max=1500. Range₁ = 1500 − 800 = 700.
- Step 2: Include 7th day: new data set adds 2000. New max = 2000 (since 2000 > 1500). Min remains 800.
- Step 3: Calculate new range: Range₂ = 2000 − 800 = 1200.
- Step 4: Find increase in range: Increase = Range₂ − Range₁ = 1200 − 700 = 500.
- Step 5: Interpret: Adding a very high profit day increased the spread by ₹500. The range is sensitive to extreme values.
REASONING: This example shows how range changes with new data, highlighting its sensitivity to outliers. The step-by-step comparison isolates the effect of the new maximum.
ANSWER: ₹500
## WORKED_EXAMPLE_3
PROBLEM: In a science experiment, the temperature of a liquid was recorded every hour for 5 hours: 24.5°C, 26.0°C, 23.8°C, 25.2°C, 24.0°C. The thermometer has an error of ±0.5°C. What is the range of the recorded data? Could the true range be larger or smaller? Explain.
STEPS:
- Step 1: Recorded data: 24.5, 26.0, 23.8, 25.2, 24.0. Order: 23.8, 24.0, 24.5, 25.2, 26.0.
- Step 2: Min = 23.8°C, Max = 26.0°C. Recorded range = 26.0 − 23.8 = 2.2°C.
- Step 3: Consider thermometer error ±0.5°C. True max could be as high as 26.0 + 0.5 = 26.5°C. True min could be as low as 23.8 − 0.5 = 23.3°C.
- Step 4: Maximum possible true range = 26.5 − 23.3 = 3.2°C. Minimum possible true range: true max could be 26.0 − 0.5 = 25.5°C, true min could be 23.8 + 0.5 = 24.3°C, giving range = 25.5 − 24.3 = 1.2°C.
- Step 5: Conclude: The recorded range is 2.2°C, but due to measurement error, the true range could be as low as 1.2°C or as high as 3.2°C. Range is affected by measurement precision.
REASONING: This connects range to real-world measurement uncertainty, a key concept in science. It requires understanding that range depends on observed extremes, which have error bounds.
ANSWER: Recorded range = 2.2°C. True range could be between 1.2°C and 3.2°C.
## COMPETENCY_QUESTION_1
QUESTION: A teacher compares two sections' test scores (out of 50).
Section A: 30, 32, 35, 38, 40, 42, 45
Section B: 20, 25, 30, 35, 40, 45, 50
Both sections have 7 students. The principal says "Section B performed better because its range is larger." Is the principal correct? Justify your answer using both range and mean.
COMPETENCY: Comparing and justifying using statistical measures
STEPS:
- Step 1: Calculate range for Section A: max=45, min=30, range=15. Section B: max=50, min=20, range=30.
- Step 2: Calculate mean for Section A: sum=262, mean=262/7≈37.4. Section B: sum=245, mean=245/7=35.
- Step 3: Compare: Section A has higher mean (37.4 > 35) but smaller range (15 < 30).
- Step 4: Evaluate principal's claim: Larger range means more spread, not better performance. Section A has higher average and more consistent scores. The principal is incorrect.
ANSWER: The principal is incorrect. Section A has a higher mean (37.4 vs 35) indicating better average performance. Section B's larger range (30 vs 15) only shows greater variability, not better performance.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: A farmer records daily milk yield (in litres) from his cow for 10 days: 8, 9, 7, 10, 8, 9, 7, 10, 8, 9. He wants to buy a milk can that can hold the maximum daily yield plus a safety margin of 1 litre. What capacity should he choose? If the cow's yield becomes more variable (range increases by 3 litres) but the minimum stays 7, what new capacity is needed?
COMPETENCY: Translating real-world situations to mathematical expressions and solving multi-step problems
STEPS:
- Step 1: Find current max and min from data. Data: 8,9,7,10,8,9,7,10,8,9. Min=7, Max=10. Range=3.
- Step 2: Required capacity = max + 1 = 10 + 1 = 11 litres.
- Step 3: New situation: range increases by 3 litres, new range = 3+3=6 litres. Min stays 7.
- Step 4: New max = min + new range = 7 + 6 = 13 litres.
- Step 5: New capacity = new max + 1 = 13 + 1 = 14 litres.
ANSWER: Current capacity needed: 11 litres. If variability increases, new capacity needed: 14 litres.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Range is the ______ between the maximum and minimum values in a data set.

## DIAGNOSTIC_ANSWER_7
difference

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are ______ two cricket players: Rohit scored 45, 52, 48, 50, 55 runs in five matches, while Virat scored 10, 90, 30, 70, 40.

## DIAGNOSTIC_ANSWER_8
comparing

## DIAGNOSTIC_QUESTION_9
What is Range? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Range is the difference between the maximum and minimum values in a data set.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Both have the same mean (______), but their performances feel very different.

## DIAGNOSTIC_ANSWER_10
50

## DIAGNOSTIC_QUESTION_11
What common mix-up does this lesson flag about Range?

## DIAGNOSTIC_ANSWER_11
Students often confuse range with the "number of values" in the data set (e.g., for data {4, 7, 9}, they say range = 3 because there are three numbers).

## DIAGNOSTIC_QUESTION_12
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_12
The student can compute the range for any given ungrouped data set, interpret what the range reveals about data variability in context, and explain why range alone is insufficient to describe the full distribution (e.g., sensitivity to outliers).
