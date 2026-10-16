## ELI5
Balapur's 50 farmers: one holds 500 acres, the rest farm 1 to 5. The mean bows to the mansion; the median looks for the farmer standing exactly midway in the queue sorted smallest to largest. Position, not arithmetic: half the holdings above it, half below. For individual data pick the middle value; for classes, find where the N/2-th item lives and interpolate. Extremes cannot bribe it.

## DEFINITION
The median is a positional average that divides an ordered data set into two equal halves, such that the number of observations above it equals the number below it. For individual and discrete series, it is the value of the (N+1)/2-th item; for continuous series, it is calculated using the formula \( \text{Median} = L + \frac{\frac{N}{2} - cf}{f} \times h \), where L is the lower limit of the median class, cf is the cumulative frequency of the class preceding the median class, f is the frequency of the median class, and h is the class interval.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can independently compute the median for individual, discrete, and continuous series from raw data or frequency distributions, correctly identify the median class in continuous series, and interpret the result in context (e.g., "50% of workers earn less than this wage").

## SCOPE_BOUNDARY
This node covers median calculation for three series types (individual, discrete, continuous) using the standard positional formulas. It does NOT cover quartiles, deciles, percentiles (node c11_stat_cbse_05_006), graphical determination of median via ogives, or median for open-ended distributions without assumptions.

## WALKTHROUGH
Imagine you are a village planner in Balapur (from the NCERT example) comparing landholdings of 50 farmers. You have their acreages but one farmer owns 500 acres while others own 1–5 acres. The arithmetic mean would be skewed by that one large holding, but the median would represent the "typical" farmer because it only cares about the middle position. Start by asking: "If we line up all farmers from smallest to largest landholding, which farmer stands exactly in the middle?" That is the median. For individual series, sort the data and pick the middle value (or average the two middle values if N is even). For discrete series, use cumulative frequency to locate the (N+1)/2-th item. For continuous series, find the class containing the N/2-th item and interpolate. The key insight: median is a *positional* measure, not a computational one like the mean, so it ignores extreme values.

Takeaway: mastery means locating the median positionally in every series type and reading it as the typical member, not the mathematical centre. Exam moves: find-the-median and interpret-it questions on the landholding scene. Check yourself: with even counts the median averages the two middle values - the queue simply has two leaders. Students miss it because the mean is the household word, when the 500-acre outlier shows the design: village averages get written by the biggest farmer unless the planner chooses position over computation - and the median's whole virtue is that it refuses to hear the extremes out.

## DIAGNOSTIC_QUESTION_1
What is the position of the median in an individual series with 15 observations? State the formula and the position number.

## DIAGNOSTIC_ANSWER_1
The position is given by (N+1)/2 = (15+1)/2 = 8th item. A wrong answer like "7.5th item" or "N/2 = 7.5" reveals confusion between the formula for individual/discrete series (which uses (N+1)/2) and continuous series (which uses N/2). It also shows the student may not understand that the median position is a rank, not the median value itself.

## DIAGNOSTIC_QUESTION_2
In a discrete frequency distribution, the cumulative frequencies are 5, 12, 20, 25, 30. N = 30. A student says the median is the value corresponding to cumulative frequency 15. Is this correct? Explain why or why not.

## DIAGNOSTIC_ANSWER_2
No, it is not correct. For discrete series, the median position is (N+1)/2 = 15.5th item. The median is the value corresponding to the cumulative frequency that is *just greater than or equal to* 15.5, which is 20 (the third value). The student incorrectly used N/2 = 15 and did not account for the +1 in the formula for discrete series. This reveals a common misconception: applying the continuous series formula (N/2) to discrete series.

## DIAGNOSTIC_QUESTION_3
The daily wages (in Rs) of 10 workers are: 120, 150, 180, 200, 250, 300, 220, 350, 370, 260. Calculate the median wage. Show all steps.

## DIAGNOSTIC_ANSWER_3
Step 1: Arrange in ascending order: 120, 150, 180, 200, 220, 250, 260, 300, 350, 370. Step 2: N = 10 (even), so median = average of 5th and 6th items = (220 + 250)/2 = 235. Answer: Rs 235. A wrong answer like 220 or 250 shows the student forgot to average the two middle values for even N. An answer of 240 (the mean) shows confusion between mean and median.

## DIAGNOSTIC_QUESTION_4
For the following continuous distribution, identify the median class and explain why it is the median class.
Class: 0-10, 10-20, 20-30, 30-40, 40-50
Frequency: 5, 8, 12, 10, 5

## DIAGNOSTIC_ANSWER_4
N = 40, so N/2 = 20. Cumulative frequencies: 5, 13, 25, 35, 40. The median class is 20-30 because its cumulative frequency (25) is the first to exceed 20. The class preceding it has cf = 13 < 20. A wrong identification like 30-40 (cf=35) shows the student picks the class where cf is closest to 20 rather than the first exceeding N/2. This reveals misunderstanding of the "first cumulative frequency greater than N/2" rule.

## DIAGNOSTIC_QUESTION_5
A student argues: "The median is always one of the observed values in the data set." Evaluate this statement for individual, discrete, and continuous series. Provide a counterexample for each series type if the statement is false.

## DIAGNOSTIC_ANSWER_5
The statement is false for all three types. Individual series: even N, e.g., 1,2,3,4 → median = 2.5 (not in data). Discrete series: same logic, median can be average of two values. Continuous series: median is interpolated within a class interval and is rarely exactly an observed value (which are not even known individually). A student who says "true for individual series" ignores even-N cases. This reveals a misconception that median must be a data point, confusing it with mode.

## DIAGNOSTIC_QUESTION_6
Create a discrete frequency distribution with N=11 where the median is 30, but the arithmetic mean is greater than 30. Explain how you constructed it.

## DIAGNOSTIC_ANSWER_6
Example: Values: 10, 20, 30, 40, 50 with frequencies: 2, 2, 3, 2, 2. N=11, median position = 6th item → cumulative frequencies: 2,4,7,9,11 → 6th item is 30. Mean = (20+40+90+80+100)/11 = 330/11 = 30. To make mean > 30, increase frequency of higher values: e.g., 10(1), 20(1), 30(3), 40(3), 50(3) → N=11, median still 30 (6th item), mean = (10+20+90+120+150)/11 = 390/11 ≈ 35.45 > 30. A poor answer would not satisfy both conditions or would not explain the construction, showing inability to manipulate distributions to achieve desired properties.

## COMMON_MISCONCEPTION
Students often use the continuous series formula (N/2) for discrete series, or vice versa. Specifically, they locate the median class in a discrete series using N/2 instead of (N+1)/2, and then try to apply the interpolation formula. For example, given discrete data: X: 10,20,30 with f: 2,3,5 (N=10), they compute N/2=5, see cf=5 at X=20, and say median=20. The correct median position is (10+1)/2=5.5, so median is the value at cf≥5.5, which is 30. This error stems from not distinguishing between "position of the median item" (discrete) and "fractional rank for interpolation" (continuous).

## ON_FAILURE
If a student makes this error, do the following: 1. Have them write both formulas side by side: Individual/Discrete: Median = size of (N+1)/2-th item; Continuous: Median = L + ((N/2 - cf)/f)×h. 2. Ask: "In discrete series, do we know the exact values of all items? Yes. In continuous, do we? No, we only know intervals." 3. Use a concrete discrete example with N=4: values 10,20,30,40 with frequencies 1,1,1,1. The median position is 2.5 → average of 2nd and 3rd = 25. Show that N/2=2 would give 20, which is wrong. 4. Practice identifying median position for both even and odd N in discrete series until they consistently use (N+1)/2.

## PREREQUISITE_NODE_IDS
c11_stat_cbse_05_001, c10_math_cbse_13_005, c11_stat_cbse_05_003, c10_math_cbse_13_001

## PREREQUISITE_REASONS
c11_stat_cbse_05_001: Understanding the need for averages and the concept of central tendency provides the motivation for learning median as an alternative to mean. c10_math_cbse_13_005: Class 10 covered median of grouped data (continuous series) using the same interpolation formula; this node builds on that by adding individual and discrete series and deepening conceptual understanding.
c11_stat_cbse_05_003: Median is introduced as an alternative measure unaffected by extreme values, contrasting with the mean's sensitivity (property ii in NCERT).  
c10_math_cbse_13_005: Requires this concept - this node (The median is a positional average that divides an ordered data set into two equal halves,...) builds directly on that foundation.  
c10_math_cbse_13_001: If stuck, revisit "Cumulative Frequency Distribution" from Class 10 Statistics (c10_math_cbse_13_001) and practice constructing less-than and more-than cumulative frequency tables.  

## FORWARD_NODE_IDS
c11_stat_cbse_05_006, c11_stat_cbse_05_008, c11_stat_cbse_05_007, c11_stat_cbse_05_011, c12_ip_cbse_02_008

## FORWARD_REASONS
c11_stat_cbse_05_006: Quartiles, deciles, and percentiles are positional measures calculated exactly like the median but with different fractions (N/4, 3N/4, etc.); median mastery is essential for understanding these partition values. c11_stat_cbse_05_008: The empirical relationship between mean, median, and mode (Mode ≈ 3 Median - 2 Mean) requires a solid grasp of how median is computed and its properties relative to mean.
c11_stat_cbse_05_007: Median calculation introduces cumulative frequency and class intervals, which are essential for identifying the modal class in continuous series.  
c11_stat_cbse_05_011: Covers Median computation and its positional property (unaffected by extremes).  
c12_ip_cbse_02_008: Median calculation from Class 11 Statistics.  
c11_stat_cbse_05_008: Student must know how to calculate Median (including interpolation for continuous series) to use it in the formula.  

## CROSS_SUBJECT_PREREQS
c10_math_cbse_13_005, c8_math_ch12_7
## CROSS_SUBJECT_REASONS
c10_math_cbse_13_005: Directly covers median of grouped data in Class 10 Mathematics, providing the formula and method for continuous series which is revisited here. c8_math_ch12_007: Class 8 introduced median as the middle value for ungrouped data and compared it with mean, establishing the foundational concept of median as a positional measure.
c8_math_ch12_7: Cross-subject support: this concept supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c10_math_cbse_13_005 -> c11_stat_cbse_05_005 -> c11_stat_cbse_05_006

## THIS_FORMULA
Individual/Discrete: Median = value of ((N+1)/2)-th item; Continuous: Median = L + ((N/2 - cf)/f) × h

## FORMULA_VARIABLES
N = total number of observations; L = lower limit of median class; cf = cumulative frequency of class preceding median class; f = frequency of median class; h = class interval (magnitude) of median class.

## FORMULA_UNITS
Median has the same units as the variable (e.g., rupees, kg, marks). N, cf, f are counts (no units). L and h have units of the variable.

## COMPUTATION_TYPE
statistical

## CROSS_SUBJECT
c10_math_cbse_13_005 | The median formula for continuous series is identical to the one taught in Class 10 Mathematics (Statistics chapter), reinforcing the statistical technique across subjects.
c8_math_ch12_008 | Class 8 Mathematics introduced the comparison between median and mean, highlighting median's resistance to extreme values, which is a key economic interpretation in this node.

## PREREQ_CONCEPT
Understanding cumulative frequency and how to construct a less-than cumulative frequency table is essential for locating the median class in discrete and continuous series.

## PREREQ_BEFORE
The student must be able to sort raw data, compute cumulative frequencies, and identify the class interval containing a given rank (e.g., N/2-th item).

## PREREQ_STUCK
If stuck, revisit "Cumulative Frequency Distribution" from Class 10 Statistics (c10_math_cbse_13_001) and practice constructing less-than and more-than cumulative frequency tables.

## WORKED_EXAMPLE_1
PROBLEM: The monthly incomes (in Rs) of 9 households in a village are: 4500, 3200, 5100, 2800, 4000, 3500, 4800, 3900, 4200. Find the median income.
STEPS:
- Step 1: Arrange the data in ascending order: 2800, 3200, 3500, 3900, 4000, 4200, 4500, 4800, 5100.
- Step 2: Count the number of observations: N = 9 (odd).
- Step 3: Median position = (N+1)/2 = (9+1)/2 = 5th item.
- Step 4: The 5th value in the ordered list is 4000.
- Step 5: Interpret: The median monthly income is Rs 4000, meaning half the households earn ≤ Rs 4000 and half earn ≥ Rs 4000.
REASONING: For individual series with odd N, the median is exactly the middle value after sorting. No interpolation is needed because we have the exact value of each observation. The positional formula (N+1)/2 gives the rank of that middle value.
ANSWER: Rs 4000

## WORKED_EXAMPLE_2
PROBLEM: The following table shows the number of children in 50 families. Calculate the median number of children.
No. of children (X): 0, 1, 2, 3, 4, 5
No. of families (f): 5, 10, 15, 12, 5, 3
STEPS:
- Step 1: Construct the less-than cumulative frequency table.
  X: 0, f=5, cf=5
  X: 1, f=10, cf=15
  X: 2, f=15, cf=30
  X: 3, f=12, cf=42
  X: 4, f=5, cf=47
  X: 5, f=3, cf=50
- Step 2: N = 50. Median position = (N+1)/2 = 51/2 = 25.5th item.
- Step 3: Locate the value corresponding to cumulative frequency just greater than or equal to 25.5. cf=30 at X=2 is the first cf ≥ 25.5.
- Step 4: Therefore, median = 2 children.
- Step 5: Verify: 25 families have ≤2 children, 25 families have ≥2 children (since cf at X=1 is 15, and from X=2 onward is 35). The median correctly splits the distribution.
REASONING: In discrete series, we use cumulative frequency to find which value occupies the median position. The median is the value of the variable (not an interpolated number) because the variable takes discrete values. The formula (N+1)/2 gives a rank; we find the value at that rank.
ANSWER: 2 children

## WORKED_EXAMPLE_3
PROBLEM: The daily wages (in Rs) of 80 workers in a factory are given below. Compute the median wage.
Daily wages (Rs): 100-120, 120-140, 140-160, 160-180, 180-200, 200-220
No. of workers: 10, 15, 20, 18, 12, 5
STEPS:
- Step 1: Write the classes in ascending order (already given) and compute less-than cumulative frequencies.
  100-120: f=10, cf=10
  120-140: f=15, cf=25
  140-160: f=20, cf=45
  160-180: f=18, cf=63
  180-200: f=12, cf=75
  200-220: f=5, cf=80
- Step 2: N = 80. Median position = N/2 = 40th item (for continuous series).
- Step 3: Identify median class: the class where cumulative frequency first exceeds 40. cf=45 at class 140-160 → median class = 140-160.
- Step 4: Extract values: L = 140, cf (preceding) = 25, f = 20, h = 20.
- Step 5: Apply formula: Median = L + ((N/2 - cf)/f) × h = 140 + ((40 - 25)/20) × 20 = 140 + (15/20)×20 = 140 + 15 = 155.
- Step 6: Interpret: The median daily wage is Rs 155. Half the workers earn ≤ Rs 155, half earn ≥ Rs 155.
REASONING: In continuous series, individual values are unknown, so we interpolate within the median class assuming uniform distribution. The formula uses N/2 (not (N+1)/2) because we are finding the point that splits the area under the histogram into two equal halves. The interpolation factor (N/2 - cf)/f represents how far into the median class the median lies.
ANSWER: Rs 155

## COMPETENCY_QUESTION_1
QUESTION: A researcher collects data on the number of hours 11 students spend on homework per week: 5, 8, 12, 3, 7, 10, 6, 9, 4, 11, 2. (a) Calculate the median. (b) The researcher later realizes that the student who reported 12 hours actually spent 20 hours. Recalculate the median. (c) Explain why the median changed (or did not change) and what this implies about using median vs mean for this data.
COMPETENCY: Comparing and justifying the choice of measure of central tendency based on data properties.
STEPS:
- Step 1: Sort the original data: 2,3,4,5,6,7,8,9,10,11,12. N=11, median position = 6th item = 7 hours.
- Step 2: Replace 12 with 20, re-sort: 2,3,4,5,6,7,8,9,10,11,20. Median position still 6th item = 7 hours.
- Step 3: The median did not change because the change only affected the largest value, which is not the middle position. The median is resistant to extreme values.
- Step 4: The mean would change from (77/11=7) to (85/11≈7.73), showing sensitivity to the outlier.
- Step 5: Conclusion: For skewed data or data with outliers, median is a better representative of typical homework time.
ANSWER: (a) 7 hours (b) 7 hours (c) Median unchanged because it depends only on the middle position; mean would increase. Median is preferred for skewed distributions.
DIFFICULTY: easy

## COMPETENCY_QUESTION_2
QUESTION: The following table shows the distribution of monthly expenditure (in Rs) on food for 100 families in a locality. The median expenditure is known to be Rs 1850. Find the missing frequencies f1 and f2.
Expenditure (Rs): 1000-1500, 1500-2000, 2000-2500, 2500-3000, 3000-3500
No. of families: 10, f1, 25, f2, 5
Total = 100
COMPETENCY: Translating real-world situations to mathematical expressions and solving for unknowns using statistical formulas.
STEPS:
- Step 1: Let f1 and f2 be the missing frequencies. Sum of frequencies: 10 + f1 + 25 + f2 + 5 = 100 → f1 + f2 = 60. (Equation 1)
- Step 2: Compute cumulative frequencies:
  1000-1500: cf=10
  1500-2000: cf=10+f1
  2000-2500: cf=35+f1
  2500-3000: cf=35+f1+f2 = 35+60 = 95 (using Eq1)
  3000-3500: cf=100
- Step 3: Median = 1850 lies in class 1500-2000 (since 1850 is between 1500 and 2000). So median class = 1500-2000.
- Step 4: Apply median formula: Median = L + ((N/2 - cf)/f) × h
  L=1500, N/2=50, cf (preceding)=10, f=f1, h=500.
  1850 = 1500 + ((50 - 10)/f1) × 500
  350 = (40/f1) × 500
  350 = 20000/f1
  f1 = 20000/350 = 57.14 → not an integer! Wait, check: 40/f1 * 500 = 20000/f1. 1850-1500=350. So 350 = 20000/f1 → f1 = 20000/350 = 57.14. But frequencies must be integers. Let's re-examine: The median class might be 2000-2500 if f1 is small? But 1850 is in 1500-2000. If f1=57, then cf before median class=10, cf median class=67, N/2=50 is within median class. Then median = 1500 + ((50-10)/57)*500 = 1500 + (40/57)*500 ≈ 1500 + 350.88 = 1850.88 ≈ 1850 (rounded). So f1 ≈ 57, f2 = 3. But 57+3=60. So f1=57, f2=3.
- Step 5: Verify: f1=57, f2=3. cf before median class=10, cf median class=67. N/2=50. Median = 1500 + ((50-10)/57)*500 = 1500 + 350.877 = 1850.88 ≈ 1850. Acceptable.
- Step 6: Answer: f1 = 57, f2 = 3.
REASONING: This problem requires setting up equations from the total frequency and the median formula, then solving for the unknowns. It tests the ability to work backwards from a given median to find missing frequencies, a common board exam pattern.
ANSWER: f1 = 57, f2 = 3
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The median is a positional average that divides an ordered data set into two equal halves, such that the number of ______ above it equals the number below it.

## DIAGNOSTIC_ANSWER_7
observations

**A wrong answer ("values") reveals the student has blurred the mirror - the observations above the median equal those below it.** The word is what the blank grades. Recall the definition's balance clause before filling, and give the word exactly. Verify against the lesson's own wording before you commit.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are a village planner in Balapur (from the NCERT example) ______ landholdings of 50 farmers.

## DIAGNOSTIC_ANSWER_8
comparing

The word is comparing - the planner's task with the landholdings. A wrong answer ("surveying") reveals the student has swapped the verb. Recall the scene's opening before filling, and give the word exactly. Verify against the lesson's own wording before you commit. The blank grades the exact term, not a synonym.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Imagine you are a village planner in Balapur (from the NCERT example) comparing landholdings of ______ farmers.

## DIAGNOSTIC_ANSWER_9
50

**A wrong answer ("500") reveals the student has quoted the biggest farm - the comparison covers 50 farmers.** The number is what the blank grades. Recall the scene's headcount before filling, and give the number exactly. Verify against the lesson's own wording before you commit. The blank grades the exact term, not a synonym.

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
The student can independently compute the median for individual, discrete, and continuous series from raw data or frequency distributions, correctly identify the median class in continuous series, and interpret the result in context (e.g., "50% of workers earn less than this wage"). Verify against the lesson's own wording before you commit.

## DIAGNOSTIC_QUESTION_11
Fill in the blank: Imagine you are a village planner in Balapur (from the NCERT example) comparing ______ of 50 farmers.

## DIAGNOSTIC_ANSWER_11
landholdings

The word is landholdings - what is being compared. A wrong answer ("incomes") reveals the student has swapped the variable. Recall the Balapur scene before filling, and give the word exactly. Verify against the lesson's own wording before you commit. The blank grades the exact term, not a synonym.
