## ELI5
Line up your classmates by height and the person standing exactly in the middle is the median — half the class is shorter, half taller. That is all the median asks: order the values first, then walk to the middle position. With an odd crowd there is one middle person; with an even crowd, average the two who share the middle. Because it only cares about position, one wildly tall student cannot drag it — which is why the median, not the mean, describes a typical salary in a room containing a billionaire.

## DEFINITION
The median is the middle value of a data set when the values are arranged in ascending or descending order. If the number of observations (n) is odd, the median is the value at the \(\frac{n+1}{2}\)-th position; if n is even, the median is the average of the values at the \(\frac{n}{2}\)-th and \(\left(\frac{n}{2}+1\right)\)-th positions.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
The student can correctly find the median from raw data (both odd and even counts), from a simple frequency table, and from a dot plot, and can explain why the median is a better measure of center than the mean for skewed data or data with outliers.
## SCOPE_BOUNDARY
Covers finding median from ungrouped raw data and simple frequency tables (discrete data). Does NOT cover median of grouped continuous data (class intervals) or median from cumulative frequency curves (ogives), which are Class 10 topics.
## WALKTHROUGH
Imagine your class of 7 students took a 20-mark quiz. The marks are: 14, 18, 12, 16, 15, 19, 13. The teacher wants to know the "middle" performance – not the average, but the score where half the class scored less and half scored more. To find this, we first arrange the marks in order: 12, 13, 14, 15, 16, 18, 19. Since there are 7 scores (odd), the middle one is the 4th value, which is 15. That is the median. If an 8th student joined with 17 marks, the ordered list becomes 12, 13, 14, 15, 16, 17, 18, 19. Now there are two middle values (4th and 5th), so the median is the average of 15 and 16, which is 15.5. The key insight: **always order the data first**, then locate the middle position using the count \(n\).

Takeaway: median = middle of the ordered data — position (n plus one) over two for odd n, the average of the two middle positions for even n — and it resists outliers because position, not size, decides it. Exam format: expect raw lists, frequency tables and dot plots; in every case, order first, then locate. Verification beat: with even n, confirm you averaged the two central values, not neighbours of the middle. Why students miss it: they skip the ordering step, or grab the middle position without checking whether the count is odd or even.

## DIAGNOSTIC_QUESTION_1
What is the median of the data set: 8, 3, 5, 9, 2? (Recall the definition and steps.)
## DIAGNOSTIC_ANSWER_1
The median is 5. Steps: order the data (2, 3, 5, 8, 9), count n=5 (odd), middle position is (5+1)/2 = 3rd value, which is 5. A wrong answer like 5.5 or 3 reveals the student either forgot to order the data or used the even-n formula incorrectly. **A wrong answer (picking the middle of the unordered list) reveals the student has skipped the ordering step, which is the one non-negotiable ritual of the median.** In a class test in Jaipur, five friends' marks written in rough order look harmless — but only after arranging them from lowest to highest does the middle position point to the true median; the same habit prevents grabbing a neighbour on an even-count list instead of averaging the two central values.

## DIAGNOSTIC_QUESTION_2
A student says: "For the data 4, 7, 2, 9, the median is 5.5 because the middle two numbers are 4 and 7." Is the student correct? Explain why or why not.
## DIAGNOSTIC_ANSWER_2
The student is incorrect. The data must first be ordered: 2, 4, 7, 9. The middle two values are 4 and 7, so the median is (4+7)/2 = 5.5. The student got the right number but for the wrong reason – they did not order the data first. If the data were 7, 4, 9, 2, the unordered middle two would be 4 and 9, giving 6.5, which is wrong. This misconception shows the student thinks median depends on the original order, not the sorted order.
## DIAGNOSTIC_QUESTION_3
Find the median of the following data representing the number of books read by 8 students in a month: 3, 5, 2, 6, 4, 7, 5, 3.
## DIAGNOSTIC_ANSWER_3
Ordered data: 2, 3, 3, 4, 5, 5, 6, 7. n=8 (even). Middle positions: 4th and 5th values are 4 and 5. Median = (4+5)/2 = 4.5. A wrong answer like 4 or 5 indicates the student took only one middle value instead of averaging the two. A wrong answer like 4.5 but from unordered data (e.g., taking 6 and 4 as middle) shows the ordering step was skipped.
## DIAGNOSTIC_QUESTION_4
Consider two data sets:
Set A: 10, 12, 14, 16, 18
Set B: 10, 12, 14, 16, 100
Compare the medians and means of both sets. What does this tell you about the effect of an extreme value on median vs mean?
## DIAGNOSTIC_ANSWER_4
Set A: median=14, mean=14. Set B: median=14, mean=30.4. The median is unchanged by the extreme value 100, while the mean increases dramatically. This shows the median is resistant to outliers, whereas the mean is sensitive. A wrong answer that says both change equally reveals the student does not understand the robustness property of the median.
## DIAGNOSTIC_QUESTION_5
A teacher calculates the median of 9 students' heights (in cm) as 142. She later realizes she missed one student's height of 135 cm. Without recalculating fully, can you determine if the new median will be less than, equal to, or greater than 142? Justify.
## DIAGNOSTIC_ANSWER_5
The new median will be less than 142. Original n=9 (odd), median was the 5th value = 142. Adding 135 (which is less than 142) makes n=10 (even). The new median will be the average of the 5th and 6th values in the new ordered list. The 5th value in the new list will be ≤ 142 (since we inserted a smaller value), and the 6th value will be the old 5th value (142) or the old 6th value (≥142). The average of a number ≤142 and a number ≥142 could be 142 if both are 142, but since we added a value smaller than 142, the 5th value becomes the old 4th value (which is ≤142). So the new median ≤ 142. In most cases it will be strictly less. A wrong answer "equal" shows the student thinks median never changes when adding a value, or doesn't understand how the middle position shifts.
## DIAGNOSTIC_QUESTION_6
Create a data set of 6 integers between 1 and 20 such that the median is 12 but the mean is greater than 15. Explain your reasoning.
## DIAGNOSTIC_ANSWER_6
Example: 1, 2, 11, 13, 19, 20. Ordered: 1, 2, 11, 13, 19, 20. n=6, median = (11+13)/2 = 12. Mean = (1+2+11+13+19+20)/6 = 66/6 = 11 (not >15). Need higher mean: 10, 11, 12, 13, 19, 20 → median = (12+13)/2 = 12.5 (no). Try: 5, 10, 11, 13, 19, 20 → median=12, mean=78/6=13. Need more extreme: 1, 2, 11, 13, 20, 20 → median=12, mean=67/6≈11.17. Actually, to get mean >15 with median 12, the sum must be >90. With median 12, the two middle numbers average to 12, so they could be 11 and 13. The other four numbers can be large. Example: 11, 13, 19, 20, 20, 20 → ordered: 11, 13, 19, 20, 20, 20. Median = (19+20)/2 = 19.5 (wrong). Need middle two to average 12. Let middle two be 11 and 13. Then we need four numbers: two ≤11 and two ≥13. To maximize mean, make the two lower numbers as high as possible (11 and 11) and the two upper numbers as high as possible (20, 20). Data: 11, 11, 11, 13, 20, 20. Median = (11+13)/2 = 12. Mean = 86/6 ≈ 14.33 <15. Try: 10, 11, 11, 13, 20, 20 → median=12, mean=85/6≈14.17. It's impossible with integers 1-20? Let's check: max sum with median 12: two middle are 11 and 13 (sum 24). The two below can be at most 11 and 11 (sum 22). The two above can be 20 and 20 (sum 40). Total max = 86. Mean = 86/6 = 14.33 < 15. So no such data set exists with integers 1-20. A good answer would show this reasoning and conclude impossibility. A poor answer gives a set without checking mean, or gives a set with median not 12.
## COMMON_MISCONCEPTION
Students often forget to order the data before finding the middle position. For example, given 15, 10, 20, 5, they might say the median is 10 (the 2nd value) or 15 (the 3rd value) instead of ordering to 5, 10, 15, 20 and then averaging 10 and 15 to get 12.5. Another specific error: when n is even, they pick the \(\frac{n}{2}\)-th value only (e.g., 4th value for n=8) and forget to average with the next value.
## ON_FAILURE
If a student skips ordering, give them a set of 5 numbered cards (e.g., 15, 10, 20, 5, 12) and ask them to physically arrange them in a line from smallest to largest. Then ask: "Which card is exactly in the middle?" Have them remove the cards one by one from the ends until one remains. Then repeat with 6 cards to show the two middle cards. Connect this physical activity to the written steps: **Step 1: Order. Step 2: Count n. Step 3: Find position(s). Step 4: Read value(s). Step 5: Average if needed.**
## PREREQUISITE_NODE_IDS
c6_math_ch09_101, c7_math_ch13_005, c8_math_ch12_1, c8_math_ch12_2
## PREREQUISITE_REASONS
c6_math_ch09_101: Introduced median as middle value in Class 6 with odd number of observations.
c7_math_ch13_005: Extended median to even number of observations and frequency tables in Class 7.
c8_math_ch12_1: Established the concept of a "balancing point" for mean, which sets up the contrast with median as a positional measure.
c8_math_ch12_2: Used dot plots to visualize data distribution; median can be located visually on a dot plot.
## FORWARD_NODE_IDS
c8_math_ch12_8, c8_math_ch12_9, c8_math_ch12_10, c8_math_ch12_11, c8_math_ch12_12
## FORWARD_REASONS
c8_math_ch12_8: Directly compares median and mean, requiring understanding of both measures.
c8_math_ch12_9: Introduces mode as the third measure of central tendency; together with median and mean, they form the trio.
c8_math_ch12_10: Requires choosing the best measure among mean, median, mode for a given data set.
c8_math_ch12_11: Range measures spread; median is a measure of center; both are needed to describe data.
c8_math_ch12_12: Line plots and bar graphs display data; median can be estimated or verified from these graphs.
## CROSS_SUBJECT_PREREQS
c6_math_ch09_095, c6_math_ch09_096
## CROSS_SUBJECT_REASONS
c6_math_ch09_095: Understanding what constitutes a statistical question and data variability is foundational for any data analysis in science or social studies.
c6_math_ch09_096: Organising data into tables is a prerequisite skill for handling experimental data in physics (e.g., recording measurements) or geography (e.g., population data).
## CHAIN_DESCRIPTION
c6_math_ch09_101 -> c7_math_ch13_005 -> c8_math_ch12_7 -> c8_math_ch12_8
## THIS_FORMULA
If n is odd: Median = value at position \(\frac{n+1}{2}\). If n is even: Median = \(\frac{\text{value at position } \frac{n}{2} + \text{value at position } \frac{n}{2}+1}{2}\)
## FORMULA_VARIABLES
n = number of observations in the data set; values are the sorted data points \(x_1 \le x_2 \le \dots \le x_n\).
## FORMULA_UNITS
Same units as the data (e.g., marks, cm, kg, rupees). Dimensionless if data is counts.
## COMPUTATION_TYPE
statistical
## CROSS_SUBJECT
c8_physics_ch1_3 | In physics, when measuring time periods of a pendulum, the median of repeated trials is often used to reduce the effect of outliers caused by human reaction time errors.
c8_eco_ch2_1 | In economics, median income is a standard measure of typical income because it is not skewed by extremely high incomes, unlike the mean.
## PREREQ_CONCEPT
Ordering numbers (ascending/descending) and identifying the middle position in a list.
## PREREQ_BEFORE
The student must be able to sort a list of numbers (including decimals and negative numbers) and understand the meaning of "middle" for both odd and even counts.
## PREREQ_STUCK
If stuck, revisit c6_math_ch01_004 (Comparing and Ordering Numbers) and c7_math_ch03_007 (Comparing and Ordering Decimals) to practice sorting.
## WORKED_EXAMPLE_1
PROBLEM: The daily wages (in rupees) of 7 workers at a construction site are: 350, 400, 380, 420, 360, 390, 410. Find the median wage.
STEPS:
- Step 1: Write down the given data and identify n. Data: 350, 400, 380, 420, 360, 390, 410. n = 7 (odd).
- Step 2: Arrange the data in ascending order. 350, 360, 380, 390, 400, 410, 420.
- Step 3: Find the middle position using formula \(\frac{n+1}{2}\). Position = \(\frac{7+1}{2} = 4\).
- Step 4: Identify the value at the 4th position in the ordered list. The 4th value is 390.
- Step 5: State the median with units. Median wage = ₹390.
REASONING: The median is a positional measure; it depends only on the order of values, not their actual magnitudes beyond ordering. With an odd count, there is a single middle value that splits the data into two equal halves (3 values below, 3 above).
ANSWER: ₹390
## WORKED_EXAMPLE_2
PROBLEM: The weights (in kg) of 8 parcels are: 2.5, 3.1, 2.8, 3.5, 2.9, 3.2, 3.0, 2.7. Find the median weight.
STEPS:
- Step 1: List the data and count n. Data: 2.5, 3.1, 2.8, 3.5, 2.9, 3.2, 3.0, 2.7. n = 8 (even).
- Step 2: Sort the data in ascending order. 2.5, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.5.
- Step 3: For even n, the median is the average of the \(\frac{n}{2}\)-th and \(\left(\frac{n}{2}+1\right)\)-th values. Here, \(\frac{8}{2} = 4\)th and 5th positions.
- Step 4: Read the 4th and 5th values: 2.9 and 3.0. Compute their average: \(\frac{2.9 + 3.0}{2} = \frac{5.9}{2} = 2.95\).
- Step 5: Interpret the result. The median weight is 2.95 kg, meaning half the parcels weigh ≤ 2.95 kg and half weigh ≥ 2.95 kg.
REASONING: With an even number of observations, there is no single middle value; the median is defined as the midpoint between the two central values to maintain the property that half the data lies on each side.
ANSWER: 2.95 kg
## WORKED_EXAMPLE_3
PROBLEM: The number of goals scored by a football team in 10 matches is given in the frequency table below. Find the median number of goals.

| Goals (x) | 0 | 1 | 2 | 3 | 4 |
|-----------|---|---|---|---|---|
| Frequency (f) | 2 | 3 | 1 | 3 | 1 |

STEPS:
- Step 1: Understand the data. The table shows goals scored per match. Total matches n = sum of frequencies = 2+3+1+3+1 = 10 (even).
- Step 2: Since n=10 is even, median is the average of the 5th and 6th values when all 10 matches are listed in order.
- Step 3: Construct the ordered list using frequencies: 0, 0, 1, 1, 1, 2, 3, 3, 3, 4. (2 zeros, 3 ones, 1 two, 3 threes, 1 four).
- Step 4: Identify the 5th and 6th values. 5th value = 1, 6th value = 2.
- Step 5: Compute median = \(\frac{1 + 2}{2} = 1.5\).
- Step 6: Verify: There are 5 matches with goals ≤1 (0,0,1,1,1) and 5 matches with goals ≥2 (2,3,3,3,4). The median 1.5 correctly splits the data.
REASONING: For frequency tables, we don't need to write the full list if we use cumulative frequency. But writing the list explicitly for small n avoids errors. The median can be a decimal (1.5) even though goals are integers, because it represents the midpoint between the two middle categories.
ANSWER: 1.5 goals
## COMPETENCY_QUESTION_1
QUESTION: A class of 9 students got the following marks (out of 50) in a test: 28, 32, 35, 40, 42, 45, 48, 50, 50. The teacher decides to give 5 grace marks to every student. What will be the new median? Will the median increase by 5? Explain without calculating the new list fully.
COMPETENCY: Reasoning about the effect of transformations on measures of central tendency.
STEPS:
- Step 1: Find the original median. n=9 (odd), median is 5th value = 42.
- Step 2: Understand the transformation: adding a constant (5) to every value.
- Step 3: Reason that adding a constant shifts the entire distribution by that constant, so the order remains the same and the middle position remains the same. The new median = old median + 5 = 47.
- Step 4: Conclude that yes, the median increases by exactly 5.
ANSWER: The new median is 47. Yes, the median increases by 5 because adding a constant to every data point shifts the median by that same constant.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: The median of 11 distinct integers is 20. If the largest 3 numbers are increased by 10 each, and the smallest 3 numbers are decreased by 5 each, what is the new median? Justify your answer.
COMPETENCY: Analyzing the effect of selective changes on the median.
STEPS:
- Step 1: Note that n=11 (odd), so median is the 6th value in the ordered list.
- Step 2: The median is the 6th value = 20. The changes affect only the largest 3 (positions 9,10,11) and smallest 3 (positions 1,2,3).
- Step 3: The 6th value (median) is not among the changed values. Changing values above or below the median does not change the median's position or value, as long as the order is preserved.
- Step 4: Check if order is preserved: decreasing the smallest 3 makes them even smaller; increasing the largest 3 makes them even larger. The 6th value remains 20.
- Step 5: State the new median.
ANSWER: The new median is still 20. The median is unchanged because the modifications only affect values strictly below and strictly above the median position, leaving the middle value untouched.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The median is the middle value of a data set when the values are arranged in ascending or ______ order.

## DIAGNOSTIC_ANSWER_7
descending

## DIAGNOSTIC_QUESTION_8
Fill in the blank: The ______ wants to know the "middle" performance – not the average, but the score where half the class scored less and half scored more.

## DIAGNOSTIC_ANSWER_8
teacher

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can correctly find the median from raw data (both odd and even counts), from a simple frequency table, and from a dot plot, and can explain why the median is a better measure of center than the mean for skewed data or data with outliers.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: The teacher wants to know the "middle" ______ – not the average, but the score where half the class scored less and half scored more.

## DIAGNOSTIC_ANSWER_10
performance
