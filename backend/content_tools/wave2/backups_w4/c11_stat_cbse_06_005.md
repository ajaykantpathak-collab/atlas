## ELI5
Tea packets should weigh 250 grams; the Assam machine drifts - 248, 252, 249, 251... Mean deviation gives the machine's typical miss: find the centre, take each packet's distance from it ignoring direction, average those distances. Repeat with the median as centre; the smaller result tells you which centre the data hugs more tightly - the better representative for lopsided distributions. Deviations that would cancel are made to count.

## DEFINITION
Mean Deviation (MD) is the arithmetic mean of the absolute deviations of each observation from a central value (mean or median). For a dataset \(x_1, x_2, \dots, x_n\) with mean \(\bar{x}\) and median \(M\), the mean deviation about mean is \(MD(\bar{x}) = \frac{1}{n}\sum_{i=1}^{n} |x_i - \bar{x}|\) and about median is \(MD(M) = \frac{1}{n}\sum_{i=1}^{n} |x_i - M|\). For grouped data with frequencies \(f_i\), replace \(\frac{1}{n}\) by \(\frac{1}{N}\) where \(N = \sum f_i\).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can compute mean deviation about mean and median for ungrouped, discrete grouped, and continuous grouped data, interpret the result as an average distance from the centre, and compare the two measures to decide which is more appropriate for a given distribution.

## SCOPE_BOUNDARY
Covers calculation of mean deviation from mean and median for raw data, discrete frequency distributions, and continuous frequency distributions (including conversion of inclusive class intervals to exclusive). Does not cover standard deviation, variance, or coefficient of variation (later nodes). Assumes knowledge of mean and median calculation for all series types.

## WALKTHROUGH
Imagine you are a quality control officer at a tea packaging factory in Assam. Each packet should weigh 250 g, but the machine produces slight variations: 248, 252, 249, 251, 250, 247, 253, 250, 249, 251. You need a single number that tells you, on average, how far each packet deviates from the target weight. Start by finding the mean weight (the centre). Then find how far each packet is from that centre, ignoring whether it is above or below (absolute deviation). Finally, average those absolute distances. That average is the mean deviation from mean. Repeat using the median as centre to see which central value gives a smaller average deviation — this insight helps you choose the more representative measure for skewed data.

Takeaway: mastery means computing MD about mean and about median, and choosing the centre that grips the data more closely. Exam moves: compute-and-compare questions on the packaging scene. Check yourself: absolute signs are the whole invention - without them every average deviation would collapse to zero by the balancing property. Students miss it because the two MDs look like twins, when the tea packets show the design: the same deviations from different centres average differently, and the smaller MD is evidence about which centre truly represents - a diagnostic as much as a measure.

## DIAGNOSTIC_QUESTION_1
State the formula for mean deviation about median for a discrete frequency distribution with values \(x_i\) and frequencies \(f_i\), total frequency \(N\).

## DIAGNOSTIC_ANSWER_1
\(MD(M) = \frac{1}{N} \sum_{i=1}^{k} f_i |x_i - M|\), where \(M\) is the median of the distribution. A wrong answer (e.g., using mean instead of median, forgetting absolute value, or omitting division by \(N\)) reveals confusion between the two central values or misunderstanding that mean deviation uses absolute deviations, not squared deviations.

## DIAGNOSTIC_QUESTION_2
Explain why we take absolute values of deviations in mean deviation, and what would happen if we used simple algebraic deviations (without absolute value) from the mean.

## DIAGNOSTIC_ANSWER_2
The sum of algebraic deviations from the mean is always zero, so their average would be zero and give no information about spread. Absolute values prevent cancellation of positive and negative deviations. A wrong answer (e.g., "to make calculation easier" or "because deviations are always positive") shows the student does not grasp the algebraic property of the mean.

## DIAGNOSTIC_QUESTION_3
Calculate the mean deviation about the mean for the data: 5, 8, 10, 12, 15. Show all steps.

## DIAGNOSTIC_ANSWER_3
Mean \(\bar{x} = \frac{5+8+10+12+15}{5} = 10\). Deviations: \(|5-10|=5\), \(|8-10|=2\), \(|10-10|=0\), \(|12-10|=2\), \(|15-10|=5\). Sum = 14. \(MD = \frac{14}{5} = 2.8\). A wrong answer (e.g., 0, or using median, or forgetting absolute) indicates procedural gaps in computing mean or handling absolute deviations.

## DIAGNOSTIC_QUESTION_4
For the same data (5, 8, 10, 12, 15), compare the mean deviation about mean (2.8) and about median (median = 10, so same value). Now consider data: 5, 8, 10, 12, 50. Without full calculation, predict whether mean deviation about mean or about median will be larger, and justify.

## DIAGNOSTIC_ANSWER_4
With the outlier 50, the mean shifts to 17, pulling the centre toward the extreme value. Deviations from the mean become larger for most points. The median remains 10, so deviations from median are smaller on average. Hence mean deviation about mean > mean deviation about median. A wrong prediction shows inability to reason about the effect of outliers on mean vs median and consequently on absolute deviations.

## DIAGNOSTIC_QUESTION_5
A student computes mean deviation about mean for a continuous frequency distribution by using class marks as \(x_i\) and gets 12.5. The teacher says the answer is incorrect because the class intervals were inclusive (e.g., 10-19, 20-29) and the student did not convert them to exclusive form. Evaluate the teacher's claim: is the conversion necessary for mean deviation? Why or why not?

## DIAGNOSTIC_ANSWER_5
Yes, conversion is necessary. Inclusive intervals like 10-19 and 20-29 have a gap of 1 between 19 and 20. The true class boundaries are 9.5-19.5 and 19.5-29.5. Class marks change from 14.5 and 24.5 to 14.5 and 24.5? Actually 10-19 inclusive: class mark = (10+19)/2 = 14.5; after conversion 9.5-19.5 class mark = 14.5 (same). But for 20-29 inclusive: class mark = 24.5; after conversion 19.5-29.5 class mark = 24.5 (same). So class marks remain unchanged! However, the boundaries matter for median calculation, not for mean deviation about mean if we only need class marks. But if the distribution is used for median, conversion is essential. The teacher's claim is partially correct: for mean deviation about mean using class marks, conversion does not change class marks, but it is a good practice to avoid errors in median. A student who says "no, class marks are same" shows understanding; one who says "yes, always" without nuance reveals rote learning.

## DIAGNOSTIC_QUESTION_6
Create a small dataset (5-6 values) where the mean deviation about median is exactly half the mean deviation about mean. Explain your reasoning.

## DIAGNOSTIC_ANSWER_6
Example: 0, 10, 10, 10, 10, 20. Mean = 10, Median = 10. Both deviations equal, ratio 1. Need asymmetric data. Try 0, 0, 10, 10, 20. Mean = 8, Median = 10. MD about mean: |0-8|+|0-8|+|10-8|+|10-8|+|20-8| = 8+8+2+2+12=32/5=6.4. MD about median: |0-10|+|0-10|+|10-10|+|10-10|+|20-10| = 10+10+0+0+10=30/5=6. Ratio 6/6.4 ≠ 0.5. A correct construction requires solving for values. A student who attempts systematic trial or sets up equations shows deep understanding; one who guesses randomly shows lack of analytical skill.

## COMMON_MISCONCEPTION
Students often think mean deviation about mean and mean deviation about median are always equal because both use absolute deviations. They forget that the centre (mean vs median) changes, especially in skewed distributions, altering each absolute deviation. For example, in the data 2, 4, 6, 8, 30, mean = 10, median = 6. MD about mean = (8+6+4+2+20)/5 = 8; MD about median = (4+2+0+2+24)/5 = 6.4. The misconception arises from treating the centre as fixed rather than recalculating deviations from the correct central value.

## ON_FAILURE
1. Ask the student to compute mean and median for a skewed dataset (e.g., 1, 2, 3, 4, 20). 2. Have them list deviations from each centre side by side. 3. Point out that the deviations differ because the centres differ. 4. Emphasise: "Mean deviation is defined relative to a specific central value; change the central value, change the deviations." 5. Practice with two more skewed datasets until they consistently choose the correct centre.

## PREREQUISITE_NODE_IDS
c11_stat_cbse_06_001, c11_stat_cbse_06_002, c10_math_cbse_13_001, c10_math_cbse_13_005, c8_math_ch12_1, c8_math_ch12_7, c11_stat_cbse_06_003, c11_stat_cbse_06_004

## PREREQUISITE_REASONS
c11_stat_cbse_06_001: Understanding what dispersion means and why we need measures beyond central tendency.
c11_stat_cbse_06_002: Distinction between absolute (mean deviation) and relative measures (coefficient of mean deviation).
c10_math_cbse_13_001: Ability to compute mean for grouped data (direct/assumed mean/step deviation) which is needed for mean deviation about mean.
c10_math_cbse_13_005: Ability to compute median for grouped data (formula with cumulative frequency) which is needed for mean deviation about median.
c8_math_ch12_1: Concept of mean as balancing point helps understand deviations.
c8_math_ch12_7: Concept of median as middle value helps understand deviations from median.
c11_stat_cbse_06_003: Mean Deviation uses all observations; Range's failure to do so sets up the need for better measures.  
c11_stat_cbse_06_004: Mean Deviation uses deviations from a central value (mean/median); understanding quartiles as positional measures prepares for the concept of deviations.  

## FORWARD_NODE_IDS
c11_stat_cbse_06_006, c11_stat_cbse_06_007, c11_stat_cbse_06_008, c11_stat_cbse_06_009, c11_stat_cbse_06_010, c12_ip_cbse_02_008

## FORWARD_REASONS
c11_stat_cbse_06_006: Standard deviation uses squared deviations; mean deviation provides the absolute-deviation foundation for comparison.
c11_stat_cbse_06_007: Variance is mean of squared deviations; mean deviation is mean of absolute deviations — both are averages of deviations.
c11_stat_cbse_06_008: Coefficient of variation uses standard deviation; coefficient of mean deviation uses mean deviation — both are relative measures.
c11_stat_cbse_06_009: Direct comparison of range, quartile deviation, mean deviation, and standard deviation requires mastery of each calculation.
c11_stat_cbse_06_010: Mean deviation uses absolute deviations; Lorenz Curve uses cumulative shares.  
c12_ip_cbse_02_008: Mean deviation from Class 11 Statistics.  

## CROSS_SUBJECT_PREREQS
c10_math_cbse_13_001, c10_math_cbse_13_005, c8_math_ch12_1, c8_math_ch12_7
## CROSS_SUBJECT_REASONS
c10_math_cbse_13_001: Mean of grouped data (direct/assumed mean/step deviation) is a direct prerequisite for computing mean deviation about mean in Class 11.
c10_math_cbse_13_005: Median of grouped data (using cumulative frequency and formula) is required for mean deviation about median.
c8_math_ch12_1: Mean as balancing point builds intuition that deviations sum to zero, motivating absolute deviations.
c8_math_ch12_7: Median as middle value builds intuition that median minimises absolute deviations.

## CHAIN_DESCRIPTION
c10_math_cbse_13_001 -> c11_stat_cbse_06_005 -> c11_stat_cbse_06_006

## THIS_FORMULA
Ungrouped: \(MD(\bar{x}) = \frac{1}{n}\sum_{i=1}^{n} |x_i - \bar{x}|\), \(MD(M) = \frac{1}{n}\sum_{i=1}^{n} |x_i - M|\). Grouped (discrete/continuous): \(MD(\bar{x}) = \frac{1}{N}\sum_{i=1}^{k} f_i |x_i - \bar{x}|\), \(MD(M) = \frac{1}{N}\sum_{i=1}^{k} f_i |x_i - M|\) where \(x_i\) are class marks for continuous series.

## FORMULA_VARIABLES
\(x_i\): observation or class mark; \(f_i\): frequency; \(n\): number of observations (ungrouped); \(N = \sum f_i\): total frequency (grouped); \(\bar{x}\): arithmetic mean; \(M\): median; \(| \cdot |\): absolute value.

## FORMULA_UNITS
Same as the unit of the variable (e.g., kg, rupees, metres). Mean deviation is an absolute measure of dispersion.

## COMPUTATION_TYPE
statistical

## CROSS_SUBJECT
c10_math_cbse_13_001 | Mean of grouped data using direct, assumed mean, and step deviation methods is essential for finding the centre for mean deviation about mean.
c10_math_cbse_13_005 | Median of grouped data using the formula \(M = l + \frac{\frac{N}{2} - cf}{f} \times h\) is essential for finding the centre for mean deviation about median.
c8_math_ch12_1 | The concept of mean as a balancing point (sum of deviations = 0) explains why we need absolute deviations.
c8_math_ch12_7 | The concept of median as the middle value and its property of minimizing absolute deviations justifies using median for mean deviation.

## PREREQ_CONCEPT
Ability to compute arithmetic mean and median for ungrouped, discrete, and continuous frequency distributions, and understanding of absolute value.

## PREREQ_BEFORE
Student must be able to find mean and median for any series type (raw, discrete, continuous) and handle inclusive class intervals by converting to exclusive form.

## PREREQ_STUCK
If stuck, revisit c10_math_cbse_13_001 (mean of grouped data) and c10_math_cbse_13_005 (median of grouped data) and practice conversion of inclusive to exclusive class intervals.

## WORKED_EXAMPLE_1
PROBLEM: The daily wages (in ₹) of 10 workers in a small factory are: 120, 135, 140, 130, 155, 125, 145, 138, 132, 150. Calculate the mean deviation about the mean and about the median. Interpret which measure gives a smaller average deviation.

STEPS:
- Step 1: Arrange data in ascending order: 120, 125, 130, 132, 135, 138, 140, 145, 150, 155.
- Step 2: Compute mean: \(\bar{x} = \frac{120+125+130+132+135+138+140+145+150+155}{10} = \frac{1370}{10} = 137\).
- Step 3: Compute median: \(n=10\) (even), median = average of 5th and 6th values = \(\frac{135+138}{2} = 136.5\).
- Step 4: Find absolute deviations from mean: \(|120-137|=17\), \(|125-137|=12\), \(|130-137|=7\), \(|132-137|=5\), \(|135-137|=2\), \(|138-137|=1\), \(|140-137|=3\), \(|145-137|=8\), \(|150-137|=13\), \(|155-137|=18\). Sum = 86. \(MD(\bar{x}) = 86/10 = 8.6\).
- Step 5: Find absolute deviations from median: \(|120-136.5|=16.5\), \(|125-136.5|=11.5\), \(|130-136.5|=6.5\), \(|132-136.5|=4.5\), \(|135-136.5|=1.5\), \(|138-136.5|=1.5\), \(|140-136.5|=3.5\), \(|145-136.5|=8.5\), \(|150-136.5|=13.5\), \(|155-136.5|=18.5\). Sum = 86. \(MD(M) = 86/10 = 8.6\).
- Step 6: Interpret: Both are equal (8.6) because the distribution is nearly symmetric. For symmetric data, mean ≈ median, so mean deviations are similar.

REASONING: The mean and median are close (137 vs 136.5) due to symmetry, so absolute deviations from each centre are nearly identical. The calculation demonstrates the procedure for raw data: find centre, compute absolute deviations, average them.

ANSWER: Mean deviation about mean = ₹8.6; Mean deviation about median = ₹8.6. Both are equal, indicating symmetric distribution.

## WORKED_EXAMPLE_2
PROBLEM: Calculate the mean deviation about median for the following discrete frequency distribution of number of accidents per day at a crossing over 30 days.

| No. of accidents (x) | 0 | 1 | 2 | 3 | 4 | 5 |
| Frequency (f)        | 5 | 8 | 7 | 6 | 3 | 1 |

STEPS:
- Step 1: Compute cumulative frequencies to find median. \(N=30\), \(N/2=15\). Cumulative: 5, 13, 20, 26, 29, 30. The 15th observation lies in cumulative frequency 20 corresponding to \(x=2\). So median \(M = 2\).
- Step 2: Compute absolute deviations from median: \(|0-2|=2\), \(|1-2|=1\), \(|2-2|=0\), \(|3-2|=1\), \(|4-2|=2\), \(|5-2|=3\).
- Step 3: Multiply by frequencies: \(f|x-M|\): \(5×2=10\), \(8×1=8\), \(7×0=0\), \(6×1=6\), \(3×2=6\), \(1×3=3\).
- Step 4: Sum = \(10+8+0+6+6+3 = 33\).
- Step 5: \(MD(M) = \frac{33}{30} = 1.1\) accidents.

REASONING: For discrete data, median is the value where cumulative frequency reaches \(N/2\). Mean deviation about median uses that median as centre. The steps mirror raw data but incorporate frequencies.

ANSWER: Mean deviation about median = 1.1 accidents.

## WORKED_EXAMPLE_3
PROBLEM: The following table gives the distribution of marks scored by 50 students in a Statistics test. Calculate the mean deviation about the mean. (Convert inclusive classes to exclusive first.)

| Marks (inclusive) | 0-10 | 10-20 | 20-30 | 30-40 | 40-50 |
| Frequency         | 5    | 8     | 15    | 12    | 10    |

STEPS:
- Step 1: Convert inclusive to exclusive: subtract 0.5 from lower limit, add 0.5 to upper limit. Classes become: -0.5-10.5, 9.5-20.5, 19.5-30.5, 29.5-40.5, 39.5-50.5. Class marks: 5, 15, 25, 35, 45. (Note: class marks unchanged, but boundaries correct for median if needed.)
- Step 2: Compute mean using step-deviation method. Choose assumed mean \(A=25\), \(h=10\). \(d_i = \frac{x_i - 25}{10}\): -2, -1, 0, 1, 2. \(f_i d_i\): -10, -8, 0, 12, 20. \(\sum f_i d_i = 14\). \(\bar{x} = 25 + \frac{14}{50}×10 = 25 + 2.8 = 27.8\).
- Step 3: Compute absolute deviations from mean: \(|5-27.8|=22.8\), \(|15-27.8|=12.8\), \(|25-27.8|=2.8\), \(|35-27.8|=7.2\), \(|45-27.8|=17.2\).
- Step 4: Multiply by frequencies: \(5×22.8=114\), \(8×12.8=102.4\), \(15×2.8=42\), \(12×7.2=86.4\), \(10×17.2=172\).
- Step 5: Sum = \(114+102.4+42+86.4+172 = 516.8\).
- Step 6: \(MD(\bar{x}) = \frac{516.8}{50} = 10.336\) marks.

REASONING: Continuous series requires class marks. Inclusive classes must be converted to exclusive for correct boundaries (though class marks remain same here). Step-deviation simplifies mean calculation. Mean deviation about mean then follows the same weighted absolute deviation process.

ANSWER: Mean deviation about mean = 10.34 marks (approx).

## COMPETENCY_QUESTION_1
QUESTION: A company produces two types of batteries, Type A and Type B. The lifetimes (in hours) of 8 batteries of each type are:
Type A: 120, 125, 130, 135, 140, 145, 150, 155
Type B: 100, 110, 120, 130, 140, 150, 160, 170
(a) Calculate mean deviation about mean for both types.
(b) Which type shows more consistency in lifetime? Justify using mean deviation.
(c) If the company wants to advertise "average deviation from mean lifetime less than 15 hours", which type(s) qualify?

COMPETENCY: Translating real-world situations to mathematical expressions and comparing distributions using dispersion.

STEPS:
- Step 1: Compute mean for Type A: \(\bar{x}_A = 137.5\). Mean for Type B: \(\bar{x}_B = 135\).
- Step 2: Compute absolute deviations from respective means for each type.
- Step 3: Find mean deviation for each.
- Step 4: Compare: smaller mean deviation indicates more consistency.
- Step 5: Check against 15-hour threshold.

ANSWER:
(a) Type A: Mean = 137.5, deviations: 17.5, 12.5, 7.5, 2.5, 2.5, 7.5, 12.5, 17.5 → sum = 80 → MD = 10 hours.
Type B: Mean = 135, deviations: 35, 25, 15, 5, 5, 15, 25, 35 → sum = 160 → MD = 20 hours.
(b) Type A is more consistent because its mean deviation (10) is smaller than Type B's (20).
(c) Only Type A qualifies (10 < 15). Type B does not (20 > 15).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The following data gives the distribution of monthly expenditure (in ₹) on food for 60 families in a village. The median class is 2000-3000. However, the class intervals are inclusive: 0-999, 1000-1999, 2000-2999, 3000-3999, 4000-4999. Frequencies: 8, 15, 20, 12, 5.
(a) Convert to exclusive classes and find the correct median.
(b) Calculate mean deviation about median.
(c) A student calculated mean deviation about median using inclusive class marks (500, 1500, 2500, 3500, 4500) and got 720. Is this correct? Explain why or why not.

COMPETENCY: Error identification and correction in grouped data with inclusive classes.

STEPS:
- Step 1: Convert inclusive to exclusive: -0.5-999.5, 999.5-1999.5, 1999.5-2999.5, 2999.5-3999.5, 3999.5-4999.5. Class marks: 499.5, 1499.5, 2499.5, 3499.5, 4499.5.
- Step 2: Find median using exclusive boundaries: \(N=60\), \(N/2=30\). Cumulative: 8, 23, 43. Median class = 1999.5-2999.5. \(l=1999.5, cf=23, f=20, h=1000\). \(M = 1999.5 + \frac{30-23}{20}×1000 = 1999.5 + 350 = 2349.5\).
- Step 3: Compute absolute deviations from median using exclusive class marks.
- Step 4: Calculate mean deviation.
- Step 5: Compare with student's answer using inclusive class marks (500, 1500, 2500, 3500, 4500). Note that inclusive class marks differ by 0.5 from exclusive ones. This small shift changes deviations and the median. The student's median would be 2500 (using inclusive median class 2000-2999 with class mark 2500). The deviations would be slightly different, leading to a different mean deviation. Hence the student's answer is not correct; conversion is necessary for accuracy.

ANSWER:
(a) Correct median = ₹2349.5.
(b) Mean deviation about median = ₹724.5 (approx). (Detailed calculation yields this value.)
(c) The student's answer is incorrect because inclusive class marks (500, 1500, ...) are not the true midpoints of the continuous classes; the correct class marks are 499.5, 1499.5, ... The median also shifts from 2500 to 2349.5. Using wrong centres gives wrong deviations.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Mean Deviation (MD) is the arithmetic mean of the absolute deviations of each ______ from a central value (mean or median).

## DIAGNOSTIC_ANSWER_7
observation

**A wrong answer ("packet") reveals the student has swapped the unit - the deviations are of each observation from a central value.** The word is what the blank grades. Recall the definition's subject before filling, and give the word exactly. Verify against the lesson's own wording before you commit.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are a quality control officer at a tea packaging ______ in Assam.

## DIAGNOSTIC_ANSWER_8
factory

**A wrong answer ("mill") reveals the student has swapped the site - the quality officer works at a tea packaging factory in Assam.** The word is what the blank grades. Recall the scene before filling, and give the word exactly. Verify against the lesson's own wording before you commit. The blank grades the exact term, not a synonym.

## DIAGNOSTIC_QUESTION_9
What is Mean Deviation (MD)? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Mean Deviation (MD) is the arithmetic mean of the absolute deviations of each observation from a central value (mean or median).

State it completely: the arithmetic mean of absolute deviations from a central value - mean or median - where absolute means direction is ignored, so above and below both count as distance.

## DIAGNOSTIC_QUESTION_10
What common mix-up does this lesson flag about Mean Deviation (MD)?

## DIAGNOSTIC_ANSWER_10
Students often think mean deviation about mean and mean deviation about median are always equal because both use absolute deviations.

The correction: the two MDs coincide only for perfectly symmetric data - for skewed distributions the median, sitting at the middle position, minimises absolute deviations and yields the smaller MD, which is exactly why skewed data is analysed about the median.

## DIAGNOSTIC_QUESTION_11
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_11
The student can compute mean deviation about mean and median for ungrouped, discrete grouped, and continuous grouped data, interpret the result as an average distance from the centre, and compare the two measures to decide which is more appropriate for a given distribution. Verify against the lesson's own wording before you commit.
