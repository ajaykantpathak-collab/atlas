## ELI5
Think of the mean as a see-saw's balance point. Mark every data value along a plank and rest the plank on the mean: it stays level, because the total distance of the points below exactly equals the total distance of the points above. Nudge the plank anywhere else and it tips — the mean is the only number that balances the whole set. This picture doubles as a trick: if you know the mean but one value is missing, write the balance equation — distances below equal distances above — and the missing value falls out.

## DEFINITION
The mean of a data set is the unique value where the sum of the signed deviations of all data points from it equals zero; equivalently, the total distance of points below the mean equals the total distance of points above the mean. For a data set \(x_1, x_2, \dots, x_n\) with mean \(\bar{x}\), this means \(\sum_{i=1}^n (x_i - \bar{x}) = 0\) or \(\sum_{x_i < \bar{x}} (\bar{x} - x_i) = \sum_{x_i > \bar{x}} (x_i - \bar{x})\).
## COGNITIVE_LEVEL
understand
## MASTERY_CRITERIA
The student can verify that the mean balances a data set by computing the sum of deviations on each side and showing they are equal. The student can also use this property to find a missing data value when the mean is given, by setting up an equation based on equal total distances.
## SCOPE_BOUNDARY
This node covers the conceptual understanding of the mean as a balancing point using the property that the sum of distances on either side of the mean are equal. It does NOT cover the calculation of mean from frequency tables, weighted means, or the effect of outliers on the mean (which are addressed in later nodes).
## WALKTHROUGH
Imagine you and four friends have different numbers of marbles: Ravi has 2, Priya has 4, Amit has 6, Sita has 8, and you have 10. The mean is 6 marbles. Now think of a seesaw: if you place the mean at the centre, the total "pull" of the friends with fewer marbles (2 and 4) must balance the total "pull" of those with more marbles (8 and 10). To begin, list the data values and calculate the mean using the familiar sum-divide method. Then, for each value, find its distance from the mean (subtract the mean, keeping the sign). Add up the negative distances and the positive distances separately. You will see they are opposites. The key insight is that the mean is the only number that makes this balance happen – if you tried any other number, the two sides would not match.

Takeaway: the mean is the balance point — deviations below and above cancel to zero; use Σ(xᵢ − x̄) = 0 to find a missing value when the mean is given. Exam format: expect 'find the missing value given the mean'; the marks sit in writing the balance equation before any solving. Verification beat: after finding the value, recompute the deviations on both sides; they must cancel exactly. Why students miss it: they forget signs — distances below the mean must carry the opposite sign to distances above, or the balance test silently fails and the answer drifts.

## DIAGNOSTIC_QUESTION_1
What is the sum of the deviations of all data points from their mean? (Answer in one sentence.)
## DIAGNOSTIC_ANSWER_1
The sum of deviations from the mean is always zero. A wrong answer (e.g., "it depends on the data" or a non-zero number) reveals that the student has not internalised the defining property of the mean as a balancing point and still sees it only as a computational average.
## DIAGNOSTIC_QUESTION_2
Explain why the sum of distances of data points below the mean equals the sum of distances of data points above the mean. Use the idea of signed deviations.
## DIAGNOSTIC_ANSWER_2
Because the sum of signed deviations is zero, the total negative deviation (below the mean) must exactly cancel the total positive deviation (above the mean). Therefore, the absolute sums are equal. A wrong answer that only states "the mean is in the middle" without referencing signed deviations shows the student confuses the mean with the median or has a purely verbal understanding without mathematical justification.
## DIAGNOSTIC_QUESTION_3
The weights (in kg) of five boxes are 12, 15, 18, 21, and 24. Verify the balancing property by calculating the sum of distances below the mean and the sum of distances above the mean.
## DIAGNOSTIC_ANSWER_3
Mean = (12+15+18+21+24)/5 = 90/5 = 18 kg.
Below mean: 12 (distance 6), 15 (distance 3) → sum = 9.
Above mean: 21 (distance 3), 24 (distance 6) → sum = 9.
Sums are equal (9 = 9). A wrong answer often comes from miscalculating the mean (e.g., getting 17 or 19) or forgetting to include the value equal to the mean (18) which has distance 0 and does not affect the sums.
## DIAGNOSTIC_QUESTION_4
A data set has four values: 5, 9, 13, and one unknown \(x\). The mean of the set is 10. Without finding \(x\) first, use the balancing property to determine whether \(x\) is greater than or less than 10. Explain your reasoning.
## DIAGNOSTIC_ANSWER_4
The known values: 5 (dev -5), 9 (dev -1), 13 (dev +3). Sum of known deviations = -5 -1 +3 = -3. For the total sum of deviations to be zero, the unknown must have a deviation of +3, so \(x = 10 + 3 = 13\). Thus \(x\) is greater than 10. A wrong answer (e.g., "x is less than 10 because 5 and 9 are small") shows the student cannot work backwards from the balancing property and still relies on intuitive guessing.
## DIAGNOSTIC_QUESTION_5
A student claims: "For the data set 4, 7, 10, 13, the mean is 8.5. The distances below the mean are 4.5 and 1.5; above are 1.5 and 4.5. The sums are equal, so the balancing property holds." Is the student's verification correct? Identify any error.
## DIAGNOSTIC_ANSWER_5
The student is correct. The mean is (4+7+10+13)/4 = 34/4 = 8.5. Deviations: 4→-4.5, 7→-1.5, 10→+1.5, 13→+4.5. Sum of negative distances = 6, sum of positive distances = 6. The verification is accurate. If a student says it's incorrect, they might mistakenly think the mean must be a whole number or that the distances must be paired symmetrically in value (not just sum).
## DIAGNOSTIC_QUESTION_6
Create a data set of five whole numbers between 1 and 20 (inclusive) such that the mean is 12 and the balancing property is satisfied. Show the distances on both sides.
## DIAGNOSTIC_ANSWER_6
Example: 8, 10, 12, 14, 16. Mean = 12. Below: 8 (4), 10 (2) → sum 6. Above: 14 (2), 16 (4) → sum 6. Any valid set with mean 12 and equal sum of distances works. A poor answer might give a set with mean 12 but unequal distance sums (e.g., 10, 11, 12, 13, 16 gives below sum 3, above sum 5), revealing the student does not truly grasp that the balancing property is a necessary condition for the mean.
## COMMON_MISCONCEPTION
Students often think the mean is simply the "middle number" (confusing it with the median) and therefore assume the balancing property means there are an equal number of points on each side. They might verify by counting points instead of summing distances. For example, for data 2, 4, 6, 10, 18 (mean = 8), they might say "three points below, two above, so not balanced" and conclude the mean is wrong, instead of computing distances: below sum = 6+4+2=12, above sum = 2+10=12.
## ON_FAILURE
If a student confuses counting with summing distances, guide them through a concrete physical model: use a ruler as a seesaw and place identical coins at positions corresponding to data values. The balance point is the mean. Have them measure the distance of each coin from the balance point and multiply by the number of coins (all 1 here). They will see that the total "moment" on each side is equal. Then translate this to numbers: write each deviation with its sign, add them, and show the sum is zero. Emphasise that the mean balances the *magnitudes* of deviations, not the *count* of data points.
## PREREQUISITE_NODE_IDS
c6_math_ch09_100, c7_math_ch13_004, c6_math_ch02_021, c6_math_ch05_059
## PREREQUISITE_REASONS
c6_math_ch09_100: Students must know how to calculate the mean as an average before exploring its balancing property.
c7_math_ch13_004: Reinforces the calculation and interpretation of mean from Class 7.
c6_math_ch02_021: Understanding additive inverse (negative numbers) is essential for signed deviations.
c6_math_ch05_059: The balance model of equations provides an intuitive foundation for the mean as a balancing point.
## FORWARD_NODE_IDS
c8_math_ch12_2, c8_math_ch12_3, c8_math_ch12_4, c8_math_ch12_5, c8_math_ch12_6, c8_math_ch12_7, c8_math_ch12_8
## FORWARD_REASONS
c8_math_ch12_2: Visualising the mean on a dot plot directly uses the balancing concept to show symmetry of distances.
c8_math_ch12_3: Understanding how adding/removing a value affects the mean relies on the balancing property.
c8_math_ch12_4: Strategies for keeping the mean unchanged when adding/removing values are built on the equal-distances insight.
c8_math_ch12_5: The "mean as balancing point" model provides the geometric intuition for why the mean shifts by the constant.
c8_math_ch12_6: Mean as balancing point helps visualise why scaling all values scales the balance point.
c8_math_ch12_7: Established the concept of a "balancing point" for mean, which sets up the contrast with median as a positional measure.
c8_math_ch12_8: Establishes mean as balancing point (sum of distances = 0), essential for understanding why outliers pull the mean.

## CROSS_SUBJECT_PREREQS
c6_math_ch09_100, c7_math_ch13_004
## CROSS_SUBJECT_REASONS
c6_math_ch09_100: The concept of mean as average is the computational prerequisite for this deeper statistical understanding.
c7_math_ch13_004: Reinforces the calculation and interpretation of mean, which is the starting point for the balancing property.
## CHAIN_DESCRIPTION
c6_math_ch09_100 -> c8_math_ch12_1 -> c8_math_ch12_2
## THIS_FORMULA
\(\sum_{i=1}^n (x_i - \bar{x}) = 0\) or \(\sum_{x_i < \bar{x}} (\bar{x} - x_i) = \sum_{x_i > \bar{x}} (x_i - \bar{x})\)
## FORMULA_VARIABLES
\(x_i\) = each data value, \(\bar{x}\) = mean of the data set, \(n\) = number of data values
## FORMULA_UNITS
Same as the units of the data values (e.g., kg, rupees, metres); the sum of deviations is dimensionless in the sense that it is a sum of differences, but it carries the unit of the data.
## COMPUTATION_TYPE
statistical
## CROSS_SUBJECT
c6_math_ch09_100 | The mean as average is the computational basis for the balancing property.
c7_math_ch13_004 | Interpreting the mean as a representative value connects to its role as a balance point.
## PREREQ_CONCEPT
The concept of signed numbers (positive and negative deviations) and the ability to compute the arithmetic mean.
## PREREQ_BEFORE
The student must be able to calculate the mean of a small data set and understand that subtracting the mean from each value gives a deviation that can be positive, negative, or zero.
## PREREQ_STUCK
Review signed deviations: practice finding the difference between each data point and the mean, keeping the sign, and then summing them to see they total zero.
## WORKED_EXAMPLE_1
PROBLEM: The monthly pocket money (in rupees) of six students is: 200, 250, 300, 350, 400, 450. Verify that the mean acts as a balancing point by showing the sum of distances below the mean equals the sum of distances above the mean.

STEPS:
- Step 1: Calculate the mean. Sum = 200+250+300+350+400+450 = 1950. Number of students = 6. Mean = 1950 ÷ 6 = 325 rupees.
- Step 2: List each value and its signed deviation from the mean (value - mean). 200 - 325 = -125; 250 - 325 = -75; 300 - 325 = -25; 350 - 325 = +25; 400 - 325 = +75; 450 - 325 = +125.
- Step 3: Separate the negative and positive deviations. Negative deviations: -125, -75, -25. Positive deviations: +25, +75, +125.
- Step 4: Sum the absolute distances on each side. Below mean: |−125| + |−75| + |−25| = 125+75+25 = 225. Above mean: |25| + |75| + |125| = 25+75+125 = 225.
- Step 5: Compare the sums. Both sides sum to 225, so the balancing property holds. The mean 325 is indeed the balancing point.

REASONING: The mean is the value that makes the total positive deviation exactly cancel the total negative deviation. By computing the signed deviations and summing their absolute values on each side, we confirm the mean balances the data. This works because the sum of all signed deviations is always zero for the mean.

ANSWER: The mean is ₹325. The sum of distances below the mean is ₹225 and the sum of distances above the mean is ₹225. They are equal, verifying the balancing property.
## WORKED_EXAMPLE_2
PROBLEM: In a science test, the marks of five students are 12, 16, 20, 24, and one unknown mark \(x\). The mean mark of the group is 18. Use the balancing property to find \(x\) without using the mean formula directly.

STEPS:
- Step 1: Write the known marks and their deviations from the mean (18). 12 → 12-18 = -6; 16 → 16-18 = -2; 20 → 20-18 = +2; 24 → 24-18 = +6.
- Step 2: Sum the known deviations. (-6) + (-2) + (+2) + (+6) = 0.
- Step 3: The sum of all five deviations must be zero (balancing property). Since the sum of the four known deviations is already 0, the deviation of the unknown mark \(x\) must also be 0.
- Step 4: If the deviation of \(x\) from 18 is 0, then \(x - 18 = 0\), so \(x = 18\).
- Step 5: Verify by computing the mean with \(x=18\): (12+16+20+24+18)/5 = 90/5 = 18. Correct.

REASONING: The balancing property states that the total deviation is zero. If the known deviations already sum to zero, the missing value must have zero deviation, meaning it equals the mean. This is a powerful way to find missing data without solving an algebraic equation with the sum formula.

ANSWER: The unknown mark \(x\) is 18.
## WORKED_EXAMPLE_3
PROBLEM: A farmer records the daily milk yield (in litres) of his cow for seven days: 8, 10, 12, 14, 16, 18, and one day's record is smudged. He remembers the weekly mean was 13 litres. The smudged value is either 11 or 15. Use the balancing property to decide which one is correct without calculating the total sum.

STEPS:
- Step 1: Write the six known yields and their deviations from the mean (13). 8 → -5; 10 → -3; 12 → -1; 14 → +1; 16 → +3; 18 → +5.
- Step 2: Sum the known deviations: (-5) + (-3) + (-1) + (+1) + (+3) + (+5) = 0.
- Step 3: For the full set of seven days, the sum of all seven deviations must be zero. The six known deviations already sum to 0, so the seventh deviation must be 0.
- Step 4: A deviation of 0 means the smudged value equals the mean, i.e., 13 litres.
- Step 5: But the options are 11 or 15. Neither is 13. Therefore, the mean cannot be 13 if the other six values are correct. There is a contradiction.
- Step 6: Re-examine: The farmer said the weekly mean was 13. If the smudged value is 11, its deviation is -2; total deviation becomes -2, mean would be less than 13. If smudged is 15, deviation is +2; total deviation +2, mean would be more than 13. Neither gives mean 13. So the farmer's memory of the mean or the recorded values might be wrong. But using the balancing property, we deduce the missing value must be 13 to keep mean 13.

REASONING: The balancing property forces the sum of deviations to be zero. If the known deviations sum to zero, the missing value must equal the mean. If the given options do not include the mean, then the premise (mean = 13) is inconsistent with the data. This shows how the balancing property can detect inconsistencies.

ANSWER: The smudged value must be 13 litres to keep the mean at 13 litres. Since the options are 11 or 15, the farmer's memory of the mean or the recorded values is likely incorrect.
## COMPETENCY_QUESTION_1
QUESTION: A teacher gives a quiz to 8 students. The scores (out of 20) are: 12, 14, 15, 16, 16, 18, 19, and one score is missing. The teacher knows the class mean is 16. Without adding all scores, explain how you can find the missing score using the balancing property. Then find it.

COMPETENCY: Translating real-world situations to mathematical expressions

STEPS:
- Step 1: Understand that the sum of deviations from the mean (16) must be zero.
- Step 2: Compute the deviation of each known score from 16.
- Step 3: Sum those deviations.
- Step 4: The missing score's deviation must be the opposite of that sum to make total zero.
- Step 5: Find the missing score by adding its deviation to 16.

ANSWER: Deviations: 12→-4, 14→-2, 15→-1, 16→0, 16→0, 18→+2, 19→+3. Sum = -4-2-1+0+0+2+3 = -2. Missing deviation must be +2. Missing score = 16 + 2 = 18. Verification: total sum = 12+14+15+16+16+18+19+18 = 128, mean = 128/8 = 16. The balancing property directly gave the missing score.

DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: Two classes, A and B, took the same test. Class A has 20 students with a mean score of 65. Class B has 30 students with a mean score of 75. The principal wants to know if the overall mean of the 50 students is exactly 70. Use the balancing property concept (without calculating the total sum) to reason whether the overall mean is less than, equal to, or greater than 70. Explain your reasoning.

COMPETENCY: Comparing and justifying

STEPS:
- Step 1: Recognise that the overall mean is the balancing point of the combined data.
- Step 2: Think of each class mean as a point where that class's deviations balance.
- Step 3: The combined mean must lie between the two class means (65 and 75).
- Step 4: Because Class B has more students (30 vs 20), the overall mean will be pulled towards 75.
- Step 5: Therefore, the overall mean is greater than the midpoint 70. It is not exactly 70.

ANSWER: The overall mean is greater than 70. Since Class B has more students, its higher mean has more "weight" in the balance. The balancing point of the combined group shifts toward the larger group's mean. The exact overall mean is (20×65 + 30×75)/50 = (1300+2250)/50 = 3550/50 = 71, which is >70. The balancing property helps us see that equal distances from the overall mean would require equal total deviations, but the larger group contributes more total deviation, pulling the mean toward it.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The mean of a data set is the unique value where the sum of the signed deviations of all data points from it equals zero; ______, the total distance of points below the mean equals the total distance of points above the mean.

## DIAGNOSTIC_ANSWER_7
equivalently

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you and four ______ have different numbers of marbles: Ravi has 2, Priya has 4, Amit has 6, Sita has 8, and you have 10.

## DIAGNOSTIC_ANSWER_8
friends

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can verify that the mean balances a data set by computing the sum of deviations on each side and showing they are equal.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: ______ you and four friends have different numbers of marbles: Ravi has 2, Priya has 4, Amit has 6, Sita has 8, and you have 10.

## DIAGNOSTIC_ANSWER_10
Imagine
