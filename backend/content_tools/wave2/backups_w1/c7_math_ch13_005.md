## ELI5
Friends line up by height and whoever stands in the exact middle is the median - no adding, no averaging, just position. The one non-negotiable ritual is ordering the data first: an unsorted list lies about its middle. An odd count crowns one middle value; an even count averages the two central neighbours. And the median is stubborn in the best way - drag the biggest value far upward and the middle position barely notices, which is why it outshines the mean when outliers roam.

## DEFINITION
The median is the middle value of a data set when all the data points are arranged in ascending or descending order. If the number of data points is odd, the median is the exact middle number; if the number of data points is even, the median is the arithmetic mean of the two middle numbers.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
Can successfully organize a raw data set in numerical order, determine whether the number of observations is odd or even, apply the correct middle-value rule, and interpret what the median represents in a real-world scenario.
## SCOPE_BOUNDARY
Covers finding the median for discrete, ungrouped numerical data sets with both odd and even numbers of observations. Does not cover grouped frequency distributions or continuous data interpolation.
## WALKTHROUGH
Imagine you and your 5 friends are standing in a line ordered by your heights, and you want to know who is standing right in the middle. To find this out mathematically, we first learned how to count and order numbers in Class 6, and now we use that ordering skill to find the center of a data set. If you just look at a messy list of numbers, the middle number is hidden because the data is not arranged. Therefore, the very first thing we must always write down is our data sorted from smallest to largest. Once sorted, we count how many data points we have (let's call this $n$), and locate the exact middle position using position rules.

**Takeaway:** the median is a position prize: order the data, count the observations, claim the middle. **In the exam:** sort first, decide odd or even, then take the middle value or average the two central ones. **Check yourself:** order the pocket-money list, locate the middle rupee value, and verify four amounts sit on each side. **Why students miss it:** students grab the middle of a messy list - the median of disorder is a lottery ticket. Even counts demand averaging two neighbours, not picking one; and a giant outlier pushed upward leaves the middle position, and the median, almost unmoved.

## DIAGNOSTIC_QUESTION_1
What is the very first step you must perform on any raw data set before you can find its median value?
## DIAGNOSTIC_ANSWER_1
The correct answer is to arrange or sort the data points in order from least to greatest (ascending order) or greatest to least (descending order). A wrong answer—such as "finding the sum" or "finding the most frequent item"—reveals that the student is confusing the median with either the mean (average) or the mode. They fail to understand that median is a positional value that requires spatial ordering.
## DIAGNOSTIC_QUESTION_2
If a data set has 9 numbers, why can we not simply pick the 4th number as the median? Explain the position rule.
## DIAGNOSTIC_ANSWER_2
The correct answer is that with 9 numbers arranged in order, the middle position is given by $\frac{9 + 1}{2} = 5$th position, meaning there are 4 numbers below it and 4 numbers above it (positions 1, 2, 3, 4 and positions 6, 7, 8, 9). A wrong answer claiming the 4th number is the median shows a misconception about counting items versus counting spaces, failing to account for the exact center including the middle data point itself.
## DIAGNOSTIC_QUESTION_3
Find the median of the following set of daily pocket money amounts (in rupees): 45, 20, 35, 50, 15, 60, 30.
## DIAGNOSTIC_ANSWER_3
The correct answer is 35 rupees. Working steps: Step 1: Arrange the data in ascending order: 15, 20, 30, 35, 45, 50, 60. Step 2: Count the total number of observations, $n = 7$ (which is odd). Step 3: Find the middle position using the formula $\frac{n + 1}{2} = \frac{7 + 1}{2} = 4$th position. Step 4: Locate the 4th number in the sorted list, which is 35. A wrong answer like 40 indicates the student tried to compute the mean (sum divided by count) instead of finding the structural middle value.
## DIAGNOSTIC_QUESTION_4
A student says: "If I add 100 to the highest number in my data set, the median will definitely change." Is this statement always true, sometimes true, or always false? Explain why.
## DIAGNOSTIC_ANSWER_4
The correct answer is that the statement is false; it is only sometimes true or usually false. The median depends strictly on the middle position(s), not on the numerical magnitude of the extreme high or low values. Changing an extreme value outside the middle does not shift the middle position or the values occupying it. A wrong answer assuming the median must change reveals a misconception that the median reacts to every single data change like the mean does.
## DIAGNOSTIC_QUESTION_5
Look at this student's working to find the median of: 12, 4, 8, 15, 6, 20. 
Step 1: Data is already listed. 
Step 2: Count is 6 (even). 
Step 3: Middle numbers are 8 and 15. 
Step 4: Median = 8. 
Identify the error and provide the correct evaluation.
## DIAGNOSTIC_ANSWER_5
The student made two critical errors: they did not sort the data in ascending order before picking the middle numbers, and in Step 4 they only took one middle number instead of averaging the two middle numbers. The correct working: Step 1: Sort data: 4, 6, 8, 12, 15, 20. Step 2: The two middle numbers at positions 3 and 4 are 8 and 12. Step 3: Compute the mean of the two middle numbers: $\frac{8 + 12}{2} = \frac{20}{2} = 10$. Correct Median = 10. A student who misses this error believes that median finding requires no sorting or that even sets only have one median.
## DIAGNOSTIC_QUESTION_6
Construct a data set of 6 whole numbers whose median is exactly 25, such that no number in the data set is equal to 25.
## DIAGNOSTIC_ANSWER_6
The expected response is any valid set of 6 numbers where the 3rd and 4th numbers in ascending order average to 25, with neither being 25 itself (e.g., 10, 20, 24, 26, 30, 40, where $\frac{24 + 26}{2} = 25$). A poor answer features numbers that do not sort properly to a median of 25, or uses 25 as an element, revealing a lack of comprehension that the median does not need to be an actual data point when $n$ is even.
## COMMON_MISCONCEPTION
Students frequently fail to sort the data set into ascending or descending order before attempting to locate the middle value, or they mistakenly calculate the mean (average) when the number of observations is odd. For example, given the data set 10, 2, 8, 4, 6, a student might immediately look at the raw third number (8) or add them all up and divide by 5, completely bypassing the sorting rule.
## ON_FAILURE
Direct the student to physically rewrite the numbers on slips of paper or underline them from smallest to largest. Say: "Before you touch the middle, your numbers must be marching in strict size order from smallest to giant. Let's write them out with spaces: smallest first, largest last. Now, cross off one from the left and one from the right simultaneously until only the center remains."
## PREREQUISITE_NODE_IDS
c6_math_ch01_004, c6_math_ch02_018, c6_math_ch09_101, c7_math_ch13_003
## PREREQUISITE_REASONS
c6_math_ch01_004: requires comparing and ordering numbers to sort data sets accurately.
c6_math_ch02_018: requires understanding relative order on number lines.
c6_math_ch09_101: builds upon Class 6 concepts of middle value definition.
c7_math_ch13_003: introduces the representative values framework where median sits alongside mean and mode.
## FORWARD_NODE_IDS
c7_math_ch13_006, c7_math_ch13_009, c7_math_ch13_010, c8_math_ch12_11, c8_math_ch12_7, c8_math_ch12_8
## FORWARD_REASONS
c7_math_ch13_006: builds upon frequency and distribution inspection skills developed in median analysis.
c7_math_ch13_009: requires analyzing real-world data sets by applying median alongside other metrics.
c7_math_ch13_010: requires knowing how to calculate the median to choose the appropriate representative value for skewed data.
c8_math_ch12_11: Median calculation skill reinforces ordering data, which is essential for finding min/max.
c8_math_ch12_7: Extended median to even number of observations and frequency tables in Class 7.
c8_math_ch12_8: Class 7 median calculation.

## CROSS_SUBJECT_PREREQS
c6_math_ch04_044, c6_math_ch06_062
## CROSS_SUBJECT_REASONS
c6_math_ch04_044: decimal ordering helps when data sets contain decimal measurements.
c6_math_ch06_062: ratio and proportion concepts support proportional reasoning in data distribution.
## CHAIN_DESCRIPTION
c7_math_ch13_003 -> c7_math_ch13_005 -> c7_math_ch13_010
## THIS_FORMULA
\text{If } n \text{ is odd: Median } = \left(\frac{n+1}{2}\right)^{\text{th}} \text{ term}. \text{ If } n \text{ is even: Median } = \frac{\left(\frac{n}{2}\right)^{\text{th}} \text{ term} + \left(\frac{n}{2} + 1\right)^{\text{th}} \text{ term}}{2}
## FORMULA_VARIABLES
n = total number of observations in the data set
## FORMULA_UNITS
Same unit as the individual data points (e.g., rupees, cm, kg, students)
## COMPUTATION_TYPE
statistical
## CROSS_SUBJECT
c7_math_ch13_003 | Both use representative values to summarize large sets of information.
c7_math_ch13_004 | Both examine center tendencies of numerical distributions.
## PREREQ_CONCEPT
Ordering numbers from least to greatest and identifying central positions.
## PREREQ_BEFORE
Students must be able to sort integers and decimals in ascending order and count discrete items accurately.
## PREREQ_STUCK
Review c6_math_ch01_004 to practice sorting numbers from smallest to largest before attempting positional statistics.
## WORKED_EXAMPLE_1
PROBLEM: A library records the number of story books borrowed by 8 students in a week: 12, 5, 8, 20, 15, 3, 10, 18. Find the median number of books borrowed.
STEPS:
- Step 1: Identify the given data set and state that sorting is required. Data = {12, 5, 8, 20, 15, 3, 10, 18}. Total count $n = 8$.
- Step 2: Arrange the data points in ascending order from smallest to largest: 3, 5, 8, 10, 12, 15, 18, 20.
- Step 3: Since $n = 8$ is an even number, identify the two middle terms located at positions $\frac{8}{2} = 4$th and $\frac{8}{2} + 1 = 5$th.
- Step 4: Locate the 4th and 5th terms in our sorted list. The 4th term is 10, and the 5th term is 12.
- Step 5: Compute the arithmetic mean of these two middle values: Median = $\frac{10 + 12}{2} = \frac{22}{2} = 11$.
REASONING: Because the number of observations is even, there is no single exact middle number. Taking the mean of the two central values splits the ordered data evenly, ensuring equal numbers of data points lie above and below the median value.
ANSWER: 11 books
## WORKED_EXAMPLE_2
PROBLEM: The daily temperatures (in degrees Celsius) recorded in a hill station over 5 days are: -2, 4, 1, -5, 3. Find the median temperature.
STEPS:
- Step 1: Identify the given data set containing integers: {-2, 4, 1, -5, 3}. Total count $n = 5$.
- Step 2: Arrange the integers in ascending order (remembering negative numbers are smaller than positive numbers): -5, -2, 1, 3, 4.
- Step 3: Since $n = 5$ is an odd number, use the odd position formula $\frac{n + 1}{2} = \frac{5 + 1}{2} = 3$rd position.
- Step 4: Locate the 3rd term in the sorted sequence: -5, -2, [1], 3, 4. The 3rd term is 1.
- Step 5: Verify the result: there are 2 numbers smaller than 1 (-5, -2) and 2 numbers larger than 1 (3, 4), confirming it is the exact center.
REASONING: Sorting negative and positive integers requires careful attention to integer ordering rules from prior classes. Once ordered, an odd count guarantees a unique middle value.
ANSWER: 1 degree Celsius
## WORKED_EXAMPLE_3
PROBLEM: A group of 6 students plant saplings in their school garden. Their heights (in centimetres) are recorded as: 135, 142, 128, 150, 138, 145. Later, a 7th student joins whose sapling height is 160 cm. Calculate and compare the medians of the sapling heights before and after the 7th student joins.
STEPS:
- Step 1: Analyze the initial data set of 6 students: {135, 142, 128, 150, 138, 145}. Sort in ascending order: 128, 135, 138, 142, 145, 150.
- Step 2: Find the median for the initial set ($n = 6$, even). The middle terms are the 3rd (138) and 4th (142). Median 1 = $\frac{138 + 142}{2} = \frac{280}{2} = 140$ cm.
- Step 3: Analyze the new data set after the 7th student joins: {128, 135, 138, 142, 145, 150, 160}. (Notice it is already sorted because 160 is appended at the end).
- Step 4: Find the median for the new set ($n = 7$, odd). Position = $\frac{7 + 1}{2} = 4$th term.
- Step 5: Locate the 4th term in the new sorted list: 128, 135, 138, [142], 145, 150, 160. Median 2 = 142 cm. Compare: Median changed from 140 cm to 142 cm.
REASONING: Adding a new data point changes the total count from even to odd, shifting the median calculation method from averaging two numbers to selecting a single exact middle term.
ANSWER: Initial median is 140 cm; new median is 142 cm.
## COMPETENCY_QUESTION_1
QUESTION: In a local cricket tournament, Player A scores the following runs in 5 matches: 25, 40, 10, 100, 30. Player B scores in 6 matches: 35, 20, 45, 30, 25, 50. Without calculating the mean, determine which player has a higher median score and explain why extreme values (like 100) affect the median differently than the mean.
COMPETENCY: Comparing and justifying statistical measures
STEPS:
- Step 1: Sort Player A's scores: 10, 25, 30, 40, 100 ($n = 5$, odd). Median = 3rd term = 30 runs.
- Step 2: Sort Player B's scores: 20, 25, 30, 35, 45, 50 ($n = 6$, even). Middle terms are 3rd (30) and 4th (35). Median = $\frac{30 + 35}{2} = 32.5$ runs.
- Step 3: Compare the two medians: Player B's median (32.5) is greater than Player A's median (30).
- Step 4: Justify how extreme values work: Player A scored a high value of 100, which heavily pulls up the mean, but because the median only cares about the middle position, the outlier 100 only acts as a positional placeholder at the top end without inflating the center value disproportionately.
ANSWER: Player B has the higher median (32.5 runs vs 30 runs). The explanation demonstrates that the median is resistant to extreme outliers because it focuses purely on positional rank rather than numerical magnitude.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: A factory owner wants to report the typical daily wage of 7 workers to show that workers are paid well. The daily wages in rupees are: 300, 350, 320, 400, 310, 330, 2500. 
(a) Find the median wage. 
(b) The owner claims: "The typical worker earns more than 350 rupees." Evaluate this claim using the median and explain why the owner's claim might be misleading regarding the workers' actual daily income distribution.
COMPETENCY: Evaluating statistical claims and real-world data interpretation
STEPS:
- Step 1: Sort the wage data in ascending order: 300, 310, 320, 330, 350, 400, 2500.
- Step 2: Count the observations $n = 7$ (odd). Find the middle position: $\frac{7 + 1}{2} = 4$th position.
- Step 3: Locate the 4th term in the sorted sequence: 330 rupees. Thus, the median wage is 330 rupees.
- Step 4: Evaluate the owner's claim: The owner claims the typical worker earns *more than* 350 rupees, but our median calculation shows the exact middle wage is 330 rupees, with 3 workers earning even less than 330.
- Step 5: Explain the misleading nature: The single high wage of 2500 rupees (an executive or outlier salary) skews the mean upward, but the median correctly reveals that half the workers earn 330 rupees or less, exposing the owner's claim as false.
ANSWER: (a) Median wage is 330 rupees. (b) The owner's claim is false and misleading because the median wage is 330 rupees, meaning 4 out of 7 workers earn 330 rupees or less. The outlier of 2500 distorts perception, making the median a much more honest measure of central tendency here.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The median is the middle value of a data set when all the data points are arranged in ascending or ______ order.

## DIAGNOSTIC_ANSWER_7
descending

**A wrong answer (writing 'increasing') reveals the student half the pair - the definition allows ascending or descending order, and the blank holds the second.**

Height lines are usually quoted short-to-tall, but the definition's rule works in either direction so long as a genuine order exists first.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you and your 5 friends are standing in a line ______ by your heights, and you want to know who is standing right in the middle.

## DIAGNOSTIC_ANSWER_8
ordered

**A wrong answer (writing 'arranged') reveals the student close cousin - the friends stand in a line ordered by height, the walkthrough's participle.**

Ordered by height, the middle pair is what survives when the count is even - the ordering step is what makes 'middle' mean anything at all.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Imagine you and your ______ friends are standing in a line ordered by your heights, and you want to know who is standing right in the middle.

## DIAGNOSTIC_ANSWER_9
5

**A wrong answer (leaving it blank) reveals the student missed the opener - the height-line scene begins with Imagine, the walkthrough's standing invitation.**

The height-line scene is imagined before it is computed - that standing invitation is how the walkthrough sets every median in place.

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
Can successfully organize a raw data set in numerical order, determine whether the number of observations is odd or even, apply the correct middle-value rule, and interpret what the median represents in a real-world scenario.

**A wrong answer (odd-count-only skill) reveals the student handled the odd case but not both - mastery covers the even rule too: average the two middle values.**

## DIAGNOSTIC_QUESTION_11
Fill in the blank: ______ you and your 5 friends are standing in a line ordered by your heights, and you want to know who is standing right in the middle.

## DIAGNOSTIC_ANSWER_11
Imagine

**A wrong answer (any count) reveals the student lost the headcount - the walkthrough lines up you and your 5 friends, the blank's own number.**

Six heights make the line, and an even count is precisely why the two middle values must be averaged instead of one being crowned.

