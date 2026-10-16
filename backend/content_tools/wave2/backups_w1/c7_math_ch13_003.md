## ELI5
Five test scores - 45, 50, 48, 52 and one boast-worthy 95 - and a parent asks for your typical mark. No single raw score tells the truth, so statistics sends three ambassadors: the mean, the balance point of all values; the median, the exact middle once the data stand in order; and the mode, the value that shows up most often. Each defines 'typical' by a different rule, and an outlier like that 95 drags the mean while leaving the median standing still.

## DEFINITION
Representative values are single summary numbers—namely the mean, median, and mode—that attempt to summarize an entire set of numerical data by describing its central tendency or typical value. Each value defines "typical" using a distinct mathematical rule: the arithmetic balance point (mean), the exact middle positional value (median), or the most frequently occurring value (mode).
## COGNITIVE_LEVEL
understand
## MASTERY_CRITERIA
Can identify, compute, and interpret the mean, median, and mode for a given raw data set, and explain which representative value best summarizes a dataset containing extreme outliers or non-numeric repetitions.
## SCOPE_BOUNDARY
Covers the conceptual identification and calculation of mean, median, and mode for discrete raw data sets with up to 15 data points. Does not cover grouped frequency distributions, assumed mean methods for large frequency tables, or standard deviation.
## WALKTHROUGH
Imagine you scored 45, 50, 48, 52, and 95 marks in five different math tests this term. Your parents ask, "What is your typical score?" If you just say 95, that is misleading because it only happened once; if you say 45, that ignores your best day. To answer fairly, we need a single number that represents the entire collection of scores. We begin by organizing our data—often by arranging numbers from least to greatest—and then choosing the right tool to find the center. Recall how we handled basic numbers and data counting in Class 6 data handling units. Today, we will explore three distinct ways to find this "center"—the Mean (fair share), the Median (middle position), and the Mode (most popular)—and understand why choosing the wrong one can give a completely false picture of reality.

**Takeaway:** mean, median and mode are three ambassadors of 'typical', each crowned by a different rule. **In the exam:** compute all three, then name which one the question's outliers or repeats make most honest. **Check yourself:** find all three for the five test scores and explain why the 95 bothers only the mean. **Why students miss it:** students compute one average and call it the answer, forgetting the question 'which representative fits this data?'. Outliers pull the mean, order crowns the median, frequency crowns the mode - three different kingdoms, three different kings.

## DIAGNOSTIC_QUESTION_1
What is the mathematical definition of the *mode* of a data set?
## DIAGNOSTIC_ANSWER_1
The mode is the value that appears most frequently in a data set. A student who answers "the middle value" is confusing mode with median, while someone who says "the sum divided by the count" is describing the mean.

**A wrong answer (answering 'average') reveals the student reached for the mean - the mode is the most frequent value, a frequency crown, not a sum divided by a count.**

## DIAGNOSTIC_QUESTION_2
A data set of five test scores is: 12, 14, 15, 14, 98. Why might the *mean* be a misleading representative value for this data set?
## DIAGNOSTIC_ANSWER_2
The mean is heavily pulled upward by the extreme outlier (98), making the average score much higher than what 4 out of the 5 students actually scored. A student who thinks the mean is still a good representative value does not understand how extreme values distort the arithmetic average.
## DIAGNOSTIC_QUESTION_3
Find the median of the following set of 7 book prices (in rupees): 120, 150, 110, 200, 130, 180, 140.
## DIAGNOSTIC_ANSWER_3
Step 1: Arrange the prices in ascending order: 110, 120, 130, 140, 150, 180, 200. 
Step 2: Count the total number of values ($N = 7$, which is odd). 
Step 3: Find the middle position using $\frac{N + 1}{2} = \frac{7+1}{2} = 4$th position. 
Step 4: Identify the 4th value in the ordered list, which is 140. 
Answer: Rs. 140. A student who gets 150 likely forgot to sort the data before finding the middle value.
## DIAGNOSTIC_QUESTION_4
If every number in a data set is increased by 5, how does the median of the data set change?
## DIAGNOSTIC_ANSWER_4
The median will also increase by exactly 5. A student who answers that the median stays the same is confusing "relative position" with "absolute value," failing to realize that shifting all numbers up shifts their exact middle position up by that same constant.
## DIAGNOSTIC_QUESTION_5
Arjun calculated the mean of 5 numbers to be 20. Later, he realized he accidentally included the number 50 instead of the correct number 30. Evaluate Arjun's error and find the true mean.
## DIAGNOSTIC_ANSWER_5
The sum of the 5 numbers was $5 \times 20 = 100$. The incorrect inclusion of 50 instead of 30 means the sum is too high by $50 - 30 = 20$. The true sum is $100 - 20 = 80$. The true mean is $\frac{80}{5} = 16$. A student who just subtracts 20 from the mean (getting 0) does not understand that the mean is a distributed average, not a total.
## DIAGNOSTIC_QUESTION_6
Construct a data set of 6 integers where the mode is 10, the median is 12, and the mean is 14. Show your verification.
## DIAGNOSTIC_ANSWER_6
One valid data set is: 8, 10, 10, 14, 18, 24. 
Verification: Mode is 10 (appears twice). Sorted values: 8, 10, 10, 14, 18, 24. Middle two are 10 and 14, average is 12 (median). Sum = $8+10+10+14+18+24 = 84$, and $84 \div 6 = 14$ (mean). A poor answer lists numbers randomly without checking if the three representative constraints are simultaneously satisfied.
## COMMON_MISCONCEPTION
Students frequently fail to sort data in ascending or descending order before attempting to find the median. For example, given the data set [15, 2, 8, 22, 11], a student might pick the middle number of the *unsorted* list (8) instead of sorting it first to get [2, 8, 11, 15, 22] and finding the correct median (11).
## ON_FAILURE
If a student makes this sorting error, instruct them to physically underline every number as they cross it out from smallest to largest on a scratchpad before touching the median formula. Remind them: "The median is a position-based value; without a proper queue from smallest to largest, position has no mathematical meaning!"
## PREREQUISITE_NODE_IDS
c6_math_ch09_100, c6_math_ch09_101, c6_math_ch09_102, c7_math_ch13_002
## PREREQUISITE_REASONS
c6_math_ch09_100: provides foundational knowledge of calculating basic arithmetic means.
c6_math_ch09_101: establishes the basic concept of identifying the middle value in simple ordered data.
c6_math_ch09_102: introduces the concept of frequency and identifying the most common value.
c7_math_ch13_002: equips students with data organization and frequency table structuring skills necessary for advanced representative value calculations.
## FORWARD_NODE_IDS
c7_math_ch13_004, c7_math_ch13_005, c7_math_ch13_006, c7_math_ch13_010, c7_math_ch13_009, c8_math_ch12_10, c8_math_ch12_11, c8_math_ch12_9
## FORWARD_REASONS
c7_math_ch13_004: uses foundational mean concepts to dive deeper into calculation mechanics and interpretations.
c7_math_ch13_005: builds directly on median identification for complex or large data sets.
c7_math_ch13_006: expands mode analysis into frequency distributions and multi-modal data.
c7_math_ch13_010: requires mastery of all three representative values to choose the most appropriate one for real-world decision-making.
c7_math_ch13_009: requires understanding representative values (mean, median, and mode) as foundations for data analysis.
c8_math_ch12_10: Introduces the three representative values together in Class 7, building the foundational concept.
c8_math_ch12_11: Class 7 foundation on representative values (mean, median, mode) is the direct precursor.
c8_math_ch12_9: Class 7 representative values - context of mode as one of three measures

## CROSS_SUBJECT_PREREQS
c6_math_ch04_046, c6_math_ch01_008
## CROSS_SUBJECT_REASONS
c6_math_ch04_046: decimal addition and subtraction are required when calculating means that result in non-integer values.
c6_math_ch01_008: large number addition skills are needed when summing up large data values for statistical calculations.
## CHAIN_DESCRIPTION
c6_math_ch09_100 -> c7_math_ch13_003 -> c7_math_ch13_010
## THIS_FORMULA
\text{Mean} = \frac{\text{Sum of all observations}}{\text{Total number of observations}}, \quad \text{Median} = \text{Middle value of sorted data}, \quad \text{Mode} = \text{Most frequent observation}
## FORMULA_VARIABLES
Sum of all observations = total aggregate value of data points; Total number of observations = count of data items ($N$).
## FORMULA_UNITS
Same units as the original data set (e.g., rupees, kg, marks, cm).
## COMPUTATION_TYPE
statistical
## CROSS_SUBJECT

## PREREQ_CONCEPT
Central tendency and basic data arrangement from Class 6.
## PREREQ_BEFORE
Students must be able to add multi-digit numbers, divide by integers, and sort numbers in ascending order.
## PREREQ_STUCK
Review c6_math_ch09_101 for basic middle-value identification and sorting techniques.
## WORKED_EXAMPLE_1
PROBLEM: Five local shops sold mangoes weighing the following masses (in kg): 14, 22, 14, 30, 20. Calculate the mean, median, and mode of this data set, and identify which representative value best describes the typical shop sale.
STEPS:
- Step 1: Write down the given data values: $14, 22, 14, 30, 20$. The number of observations $N = 5$.
- Step 2: Calculate the mean by summing all values and dividing by 5: $\text{Sum} = 14 + 22 + 14 + 30 + 20 = 100$. $\text{Mean} = \frac{100}{5} = 20\text{ kg}$.
- Step 3: Sort the data in ascending order to find the median: $14, 14, 20, 22, 30$. Since $N = 5$ (odd), the median is the $\frac{5+1}{2} = 3\text{rd}$ value, which is $20\text{ kg}$.
- Step 4: Identify the mode by finding the most frequent value in the sorted list: 14 appears twice, while all other numbers appear once. Thus, $\text{Mode} = 14\text{ kg}$.
- Step 5: Interpret the results: Both the mean and median equal 20 kg, showing a balanced distribution around the center, whereas the mode highlights the clustering of lower sales at 14 kg.
REASONING: By computing all three representative values, we gain a comprehensive profile of the distribution. The mean provides an arithmetic total share, the median identifies the exact positional center after sorting, and the mode pinpoints the most common specific sale amount.
ANSWER: Mean = 20 kg, Median = 20 kg, Mode = 14 kg.
## WORKED_EXAMPLE_2
PROBLEM: The daily pocket money (in rupees) of 6 students in a classroom is recorded as: 50, 40, 60, 40, 80, 100. Calculate the mean, median, and mode for this even-numbered data set.
STEPS:
- Step 1: List the data and count the number of observations: $50, 40, 60, 40, 80, 100$ where $N = 6$.
- Step 2: Calculate the mean: $\text{Sum} = 50 + 40 + 60 + 40 + 80 + 100 = 370$. $\text{Mean} = \frac{370}{6} = 61.67\text{ rupees}$.
- Step 3: Sort the data in ascending order: $40, 40, 50, 60, 80, 100$.
- Step 4: Since $N = 6$ (even), the median is the average of the two middle values (3rd and 4th terms): $\text{3rd term} = 50$, $\text{4th term} = 60$. Median = $\frac{50 + 60}{2} = \frac{110}{2} = 55\text{ rupees}$.
- Step 5: Identify the mode: 40 appears twice, making it the most frequent value. Mode = 40 rupees.
REASONING: When a data set has an even number of observations, there is no single middle number. We must isolate the two central positions and find their arithmetic mean to determine the true median.
ANSWER: Mean = Rs. 61.67, Median = Rs. 55, Mode = Rs. 40.
## WORKED_EXAMPLE_3
PROBLEM: A cricket player scores the following runs in 6 innings: 0, 35, 42, 35, 80, 12. Due to an error, a 7th innings score of 100 runs is added. Calculate the new mean, new median, and new mode, and explain how the inclusion of the 7th score alters the representative values.
STEPS:
- Step 1: Write down the extended 7-innings data set: $0, 35, 42, 35, 80, 12, 100$. Here $N = 7$.
- Step 2: Compute the new mean: $\text{Sum} = 0 + 35 + 42 + 35 + 80 + 12 + 100 = 304$. $\text{New Mean} = \frac{304}{7} \approx 43.43\text{ runs}$.
- Step 3: Sort the 7 values in ascending order: $0, 12, 35, 35, 42, 80, 100$.
- Step 4: Find the new median for $N = 7$ (odd): Position is $\frac{7+1}{2} = 4\text{th}$ term. The 4th term in the sorted list is 35 runs.
- Step 5: Determine the new mode: 35 still appears twice, which is more than any other number. Mode = 35 runs.
- Step 6: Compare with original metrics to analyze the impact of the outlier (100): The mean rose significantly because the high score pulled the arithmetic balance up, whereas the median and mode remained stable at 35 because positional and frequency measures are more resistant to extreme outliers.
REASONING: Outliers skew the mean because every single value affects the total sum. However, the median only cares about the middle rank, and the mode only cares about repetition, making them resistant to extreme high or low scores.
ANSWER: New Mean = 43.43 runs, New Median = 35 runs, New Mode = 35 runs.
## COMPETENCY_QUESTION_1
QUESTION: Priya claims that if you add a new data point to a set that is equal to the current *mean*, the overall mean of the data set will not change. Test Priya's claim using the data set: 10, 20, 30, 40. Show all steps and justify whether her statement is mathematically true or false.
COMPETENCY: Mathematical justification and property verification of the mean
STEPS:
- Step 1: Calculate the original mean of the data set $\{10, 20, 30, 40\}$. Sum = $10+20+30+40 = 100$. Number of items $N = 4$. Original Mean = $\frac{100}{4} = 25$.
- Step 2: According to Priya's claim, the new data point to be added must equal the mean, which is 25. The new data set becomes $\{10, 20, 30, 40, 25\}$.
- Step 3: Calculate the new sum and new mean: New Sum = $100 + 25 = 125$. New $N = 5$. New Mean = $\frac{125}{5} = 25$.
- Step 4: Compare the original mean (25) and the new mean (25). They are identical, proving Priya's claim is mathematically valid.
ANSWER: Priya's claim is correct. Adding a value exactly equal to the existing mean adds a proportional amount to both the numerator (sum) and denominator (count), leaving the overall quotient unchanged.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: A shoe store manager is analyzing sales data for men's shoes over a week, recording the shoe sizes sold: 7, 8, 8, 9, 9, 9, 10, 11, 12. She needs to decide whether to stock up based on the *mean*, *median*, or *mode* shoe size. Calculate all three representative values, analyze which one is most useful for inventory management, and explain why.
COMPETENCY: Selecting and interpreting appropriate representative values for real-world decision-making
STEPS:
- Step 1: List the data set and count observations: $\{7, 8, 8, 9, 9, 9, 10, 11, 12\}$, where $N = 9$.
- Step 2: Calculate the mean: $\text{Sum} = 7 + 8 + 8 + 9 + 9 + 9 + 10 + 11 + 12 = 83$. $\text{Mean} = \frac{83}{9} \approx 9.22$.
- Step 3: Find the median: The data is already sorted. Since $N = 9$ (odd), the median is the $\frac{9+1}{2} = 5\text{th}$ term, which is 9.
- Step 4: Find the mode: 9 appears three times (most frequently). Mode = 9.
- Step 5: Evaluate for inventory management: The manager should use the **mode** (Size 9) because a store cannot stock fractional shoe sizes like 9.22 (the mean). The mode directly tells her which specific size sells the most units and needs the highest stock replenishment.
ANSWER: Mean = 9.22, Median = 9, Mode = 9. The mode is the most useful measure because inventory requires discrete, actual items (size 9) rather than a non-stockable mathematical average.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: ______ values are single summary numbers—namely the mean, median, and mode—that attempt to summarize an entire set of numerical data by describing its central tendency or typical value.

## DIAGNOSTIC_ANSWER_7
Representative

**A wrong answer (writing 'Typical') reveals the student close cousin, wrong badge - the lesson's own heading word is Representative values.**

The heading groups the mean, median and mode together because each is one number willing to stand in for the whole list - a family portrait of summary values.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you ______ 45, 50, 48, 52, and 95 marks in five different math tests this term.

## DIAGNOSTIC_ANSWER_8
scored

**A wrong answer (writing 'got') reveals the student casual swap - the walkthrough says you scored 45, 50, 48, 52, and 95 across five tests.**

The five test scores - 45, 50, 48, 52 and 95 - are the raw list every representative value in this lesson is computed from, so mixing them up scrambles all three.

## DIAGNOSTIC_QUESTION_9
What is Representative values? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Representative values are single summary numbers—namely the mean, median, and mode—that attempt to summarize an entire set of numerical data by describing its central tendency or typical value.

**A wrong answer (definition fragment) reveals the student returned half the sentence - the full definition names all three: mean, median and mode, each describing central tendency.**

## DIAGNOSTIC_QUESTION_10
What common mix-up does this lesson flag about Representative values?

## DIAGNOSTIC_ANSWER_10
Students frequently fail to sort data in ascending or descending order before attempting to find the median.

**A wrong answer (skipping the sort) reveals the student hunted for a middle value in an unsorted list - the flagged mix-up where every median mistake begins.**

## DIAGNOSTIC_QUESTION_11
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_11
Can identify, compute, and interpret the mean, median, and mode for a given raw data set, and explain which representative value best summarizes a dataset containing extreme outliers or non-numeric repetitions.

**A wrong answer (two-of-three skill) reveals the student computed without interpreting - mastery includes explaining which representative value serves a dataset best, outliers and repeats included.**

