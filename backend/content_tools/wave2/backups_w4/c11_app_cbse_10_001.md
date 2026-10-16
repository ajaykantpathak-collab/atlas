## ELI5
Term results arrive: English 78, Math 92, Physics 85, Chemistry 81, Applied Math 88. Parents ask how you did overall - the mean says about 84.8, but Math pulls it up, and one subject can drag the average. Worse, two students can both average 85: one collecting steady 85s, the other mixing 100s with 50s. So measure the spread - standard deviation - and when Class 10 marks were out of 100 but Class 11 are out of 80, compare with the unit-free coefficient of variation. Central tendency says where the data sits; dispersion says how much to trust it.

## DEFINITION
Descriptive Statistics is the branch of statistics concerned with organizing, summarizing, and presenting raw data in a meaningful way using measures of central tendency (mean, median, mode), measures of dispersion (range, mean deviation, variance, standard deviation), and positional measures (quartiles, percentiles) to reveal the underlying patterns, spread, and shape of the data distribution.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must be able to compute and interpret the mean, median, mode, variance, standard deviation, and coefficient of variation for both ungrouped and grouped frequency distributions, and justify which measure is most appropriate for a given real-world dataset based on the presence of outliers or skewness.

## SCOPE_BOUNDARY
This node covers the computation and interpretation of central tendency (Arithmetic Mean, Median, Mode), dispersion (Range, Mean Deviation about Mean/Median, Variance, Standard Deviation), and relative dispersion (Coefficient of Variation) for discrete and continuous frequency distributions as per the CBSE Class 11 Applied Mathematics syllabus. It does **not** cover probability distributions, inferential statistics (hypothesis testing, confidence intervals), or correlation/regression analysis.

## WALKTHROUGH
You just got your Class 11 term exam results for five subjects: English 78, Math 92, Physics 85, Chemistry 81, Applied Math 88. Your parents ask, "How did you do overall?" You could say "I got 84.8% on average," but your Math score pulls that up. If you dropped Math, your average changes drastically. We start by asking: **What single number represents my performance best?** We organize the raw marks into a frequency table, calculate the **Mean** (balance point), **Median** (middle mark), and **Mode** (most frequent range). But averages lie — two students can average 85% with one getting all 85s and the other getting 100, 100, 100, 50, 50. So we measure **spread** using Standard Deviation. Finally, to compare your consistency in Class 10 (marks out of 100) vs Class 11 (marks out of 80), we use the **Coefficient of Variation** (unit-free %). The key insight: **Central tendency tells you WHERE the data is; dispersion tells you HOW MUCH you can trust that center.**

Takeaway: mastery means computing mean, median, mode, variance, standard deviation and CV, and defending the right measure for the dataset at hand. Exam moves: compute-and-interpret questions and which-measure-fits items on the report-card scene. Check yourself: averages lie quietly whenever outliers or skew are present - the spread is the fact-check. Students miss it because one summary number feels complete, when the twin-85s story shows the design: identical centres can hide opposite realities, and only a dispersion measure or a unit-free CV exposes the difference - location first, trust second, every time.

## DIAGNOSTIC_QUESTION_1
Define the term "Coefficient of Variation" and state its formula for a frequency distribution.

## DIAGNOSTIC_ANSWER_1
The Coefficient of Variation (CV) is a relative measure of dispersion expressed as a percentage, defined as $CV = \frac{\sigma}{\bar{x}} \times 100$, where $\sigma$ is the standard deviation and $\bar{x}$ is the arithmetic mean of the distribution. It allows comparison of variability between datasets with different units or vastly different means. A wrong answer (e.g., defining it as $\frac{\bar{x}}{\sigma} \times 100$ or omitting the multiplication by 100) reveals the student confuses the numerator/denominator or treats it as an absolute measure rather than a relative percentage, failing to grasp its purpose for cross-dataset comparison.

## DIAGNOSTIC_QUESTION_2
Explain why the Mean Deviation about the Median is theoretically considered a better measure of dispersion than Mean Deviation about the Mean, yet the Standard Deviation (based on the Mean) is preferred in advanced statistical analysis.

## DIAGNOSTIC_ANSWER_2
The sum of absolute deviations is minimized when taken from the Median, making Mean Deviation about Median theoretically the "least" average deviation. However, Standard Deviation uses squared deviations from the Mean because squaring removes negative signs algebraically (unlike absolute value), making it differentiable and amenable to further mathematical treatment (e.g., combining variances of independent samples, Central Limit Theorem). A wrong answer indicates the student memorizes formulas without understanding the mathematical properties (differentiability, additivity of variance) that make SD the standard in higher statistics, or they incorrectly claim the Mean minimizes absolute deviations.

## DIAGNOSTIC_QUESTION_3
Given the following frequency distribution of daily wages (in ₹) of 30 workers in a factory, calculate the Standard Deviation using the Assumed Mean (Step-Deviation) method.
| Daily Wages (₹) | 100-120 | 120-140 | 140-160 | 160-180 | 180-200 |
| :--- | :---: | :---: | :---: | :---: | :---: |
| No. of Workers | 4 | 6 | 10 | 7 | 3 |

## DIAGNOSTIC_ANSWER_3
**Steps:**
1.  Find class marks ($x_i$): 110, 130, 150, 170, 190. Choose Assumed Mean $A = 150$, class width $h = 20$.
2.  Calculate step deviations $u_i = \frac{x_i - A}{h}$: -2, -1, 0, 1, 2.
3.  Compute $\sum f_i = 30$, $\sum f_i u_i = (4 \times -2) + (6 \times -1) + (10 \times 0) + (7 \times 1) + (3 \times 2) = -8 - 6 + 0 + 7 + 6 = -1$.
4.  Compute $\sum f_i u_i^2 = (4 \times 4) + (6 \times 1) + (10 \times 0) + (7 \times 1) + (3 \times 4) = 16 + 6 + 0 + 7 + 12 = 41$.
5.  Variance $\sigma^2 = h^2 \left[ \frac{\sum f_i u_i^2}{N} - \left( \frac{\sum f_i u_i}{N} \right)^2 \right] = 400 \left[ \frac{41}{30} - \left( \frac{-1}{30} \right)^2 \right] = 400 \left[ 1.3667 - 0.0011 \right] = 400 \times 1.3656 = 546.22$.
6.  Standard Deviation $\sigma = \sqrt{546.22} \approx 23.37$.
A wrong answer (e.g., forgetting to square $h$ in the variance formula, or using $N-1$ denominator) reveals confusion between population vs sample formulas or mechanical application of the step-deviation algorithm without understanding the algebraic derivation of variance from coded data.

## DIAGNOSTIC_QUESTION_4
Two batsmen, Rahul and Virat, have the following runs in their last 10 innings:
Rahul: 45, 50, 48, 52, 47, 51, 49, 53, 46, 54
Virat: 10, 90, 5, 95, 0, 100, 15, 85, 20, 80
Both have a Mean of 49.5. Analyze which batsman is more consistent and justify your answer using *two* different measures of dispersion. Explain why the Range might be misleading here.

## DIAGNOSTIC_ANSWER_4
**Analysis:**
1.  **Range:** Rahul Range = $54 - 45 = 9$. Virat Range = $100 - 0 = 100$. Rahul is more consistent.
2.  **Standard Deviation (SD):**
    *   Rahul deviations from 49.5: -4.5, 0.5, -1.5, 2.5, -2.5, 1.5, -0.5, 3.5, -3.5, 4.5. Sum of squares = 82.5. Variance = 8.25. SD $\approx 2.87$.
    *   Virat deviations: -39.5, 40.5, -44.5, 45.5, -49.5, 50.5, -34.5, 35.5, -29.5, 30.5. Sum of squares $\approx 16482.5$. Variance = 1648.25. SD $\approx 40.6$.
    *   Rahul's SD (2.87) << Virat's SD (40.6). Rahul is far more consistent.
**Why Range misleads:** Range depends *only* on two extreme values (Min, Max). If Virat scored 0 and 100 once each but 50 in the other 8 innings, Range = 100, but he would actually be consistent. SD uses *every* data point. A wrong answer suggests the student cannot compute SD for ungrouped data efficiently or fails to articulate the conceptual limitation of Range (sensitivity to outliers, ignores distribution shape).

## DIAGNOSTIC_QUESTION_5
A student argues: "Since the Coefficient of Variation (CV) is just $\frac{\sigma}{\bar{x}} \times 100$, if Dataset A has a higher Standard Deviation than Dataset B, Dataset A must have a higher CV." Evaluate this claim. Provide a concrete numerical counterexample if false, or a proof if true.

## DIAGNOSTIC_ANSWER_5
**Evaluation:** The claim is **FALSE**. CV normalizes dispersion by the mean. A dataset with a huge mean can have a large SD but small CV; a dataset with a tiny mean can have a small SD but huge CV.
**Counterexample:**
*   Dataset A (Heights of adults in cm): Mean $\bar{x}_A = 170$, SD $\sigma_A = 10$. $CV_A = \frac{10}{170} \times 100 \approx 5.88\%$.
*   Dataset B (Heights of newborns in cm): Mean $\bar{x}_B = 50$, SD $\sigma_B = 5$. $CV_B = \frac{5}{50} \times 100 = 10\%$.
Here $\sigma_A (10) > \sigma_B (5)$, but $CV_A (5.88\%) < CV_B (10\%)$.
A wrong answer (agreeing with the claim) reveals the student treats CV as a monotonic function of SD alone, ignoring the denominator (Mean), and fails to understand the core purpose of CV: **unit-free comparison of relative variability across different scales.**

## DIAGNOSTIC_QUESTION_6
Create a realistic grouped frequency distribution (minimum 5 classes) for the "Monthly Electricity Consumption (in kWh) of 50 households in a Delhi colony" such that:
1. The distribution is positively skewed (mean > median > mode).
2. The Modal Class is the 3rd class interval.
3. The total frequency is exactly 50.
Provide the table and briefly explain how you ensured the skewness condition.

## DIAGNOSTIC_ANSWER_6
**Example Distribution:**
| Consumption (kWh) | 0-100 | 100-200 | 200-300 | 300-400 | 400-500 | 500-600 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| No. of Households | 5 | 10 | **18** | 10 | 5 | 2 |
**Total = 50.** Modal Class = 200-300 (Frequency 18, highest).
**Skewness Check (Approx):**
*   Mean $\approx$ Weighted average of class marks $\approx$ 255 (pulled right by 500-600 tail).
*   Median Class = 200-300 (Cumulative freq: 15, 33... Median at 25th value). Median $\approx$ 230.
*   Mode $\approx$ 200 + $\frac{18-10}{2*18 - 10 - 10} \times 100 = 200 + \frac{8}{16} \times 100 = 250$. (Using Mode formula $L + \frac{f_1-f_0}{2f_1-f_0-f_2}h$).
*   **Result:** Mean (~255) > Median (~230) < Mode (250)? Wait, Mode > Median here. Let's adjust frequencies to pull mode left.
**Better Example:**
| Consumption (kWh) | 0-100 | 100-200 | 200-300 | 300-400 | 400-500 |
| :--- | :---: | :---: | :---: | :---: | :---: |
| No. of Households | 8 | 12 | **15** | 10 | 5 |
**Total = 50.** Modal Class = 200-300 (Freq 15).
*   Mode $\approx 200 + \frac{15-12}{30-12-10} \times 100 = 200 + \frac{3}{8} \times 100 = 237.5$.
*   Median Class = 200-300 (Cum freq 20, 35). Median $\approx 200 + \frac{25-20}{15} \times 100 = 233.3$. (Wait, Median < Mode? Need Mean > Median > Mode).
*   Mean $\approx \frac{8(50)+12(150)+15(250)+10(350)+5(450)}{50} = \frac{400+1800+3750+3500+2250}{50} = \frac{15700}{50} = 314$.
*   **Order:** Mean (314) > Mode (237.5) > Median (233.3). Close enough for "positive skew" (Mean > Median). To get strict Mean > Median > Mode, need longer right tail.
**Final Valid Example:**
| Class | 0-100 | 100-200 | 200-300 | 300-400 | 400-500 | 500-600 |
| Freq | 5 | 8 | **12** | 10 | 10 | 5 |
**Sum=50.** Modal=200-300.
Mean $\approx 305$. Median Class=300-400 (Cum: 25, 35). Median $\approx 300 + \frac{5}{10}100 = 350$. Mode $\approx 200 + \frac{12-8}{24-8-10}100 = 200 + \frac{4}{6}100 = 266.7$.
**Order:** Mean (305) < Median (350)? No, this is negative skew.
**Correct Construction Logic:** For Positive Skew (Right tail): Frequencies must rise to mode, then fall *slowly* with a long tail.
| Class | 0-100 | 100-200 | 200-300 | 300-400 | 400-500 | 500-600 | 600-700 |
| Freq | 3 | 5 | **15** | 12 | 8 | 5 | 2 |
**Sum=50.** Modal=200-300.
Mean $\approx \frac{3(50)+5(150)+15(250)+12(350)+8(450)+5(550)+2(650)}{50} = \frac{150+750+3750+4200+3600+2750+1300}{50} = \frac{16500}{50} = 330$.
Median Class = 200-300 (Cum: 8, 23). Median $\approx 200 + \frac{25-8}{15} \times 100 = 313.3$.
Mode $\approx 200 + \frac{15-5}{30-5-12} \times 100 = 200 + \frac{10}{13} \times 100 = 276.9$.
**Order:** Mean (330) > Median (313.3) > Mode (276.9). **Condition Satisfied.**
A poor answer (symmetric frequencies like 5, 10, 15, 10, 5) reveals the student does not understand the relationship between frequency shape, tail length, and the empirical ordering of Mean, Median, Mode.

## COMMON_MISCONCEPTION
**Misconception:** "Standard Deviation and Mean Deviation measure the same thing (average distance from center), so they are interchangeable; SD is just a 'squared' version of MD."
**Why it happens:** Students see both formulas involve $\sum f|x - \bar{x}|$ and $\sum f(x - \bar{x})^2$ and assume the squaring is just a mathematical trick to remove negative signs, not realizing it fundamentally changes the weight given to outliers. They miss that SD squares the deviations *before* averaging, giving disproportionate weight to large deviations (outliers), while MD treats all deviations linearly.
**Concrete Example:** Dataset: 10, 10, 10, 10, 50. Mean = 18.
Deviations: -8, -8, -8, -8, 32.
MD = $\frac{8+8+8+8+32}{5} = 12.8$.
SD = $\sqrt{\frac{64+64+64+64+1024}{5}} = \sqrt{256} = 16$.
The single outlier (50) contributes 32 to MD sum but $32^2 = 1024$ to SD sum (vs $8^2=64$ for others). SD "penalizes" the outlier 16x more relative to its deviation magnitude, whereas MD penalizes it only 4x more. Students who think they are interchangeable will fail to choose the correct measure when outliers are present (e.g., income data).

## ON_FAILURE
1.  **Visualize the Weighting:** Draw a number line with the Mean at center. Plot the 5 data points from the example above (four at -8, one at +32). Calculate the "Area of Squares" (deviation^2) for each point. Show physically that the square for +32 (area 1024) dwarfs the four squares for -8 (area 64 each, total 256). Explain: "SD sums these *areas*; MD sums the *side lengths*. That is why SD explodes with outliers."
2.  **Algebraic Proof:** Show the identity $\sigma^2 = \frac{1}{N}\sum (x_i - \bar{x})^2$. Contrast with $MD = \frac{1}{N}\sum |x_i - \bar{x}|$. Ask: "If one deviation doubles (e.g., 10 to 20), what happens to its contribution in MD? (Doubles). In SD? (Quadruples)."
3.  **Decision Rule Drill:** Give 3 mini-scenarios: (a) Heights of students (Normal, no outliers) -> Use SD. (b) Salaries in a company with CEO (Extreme outlier) -> Use MD or IQR. (c) Comparing consistency of two batsmen (Different means) -> Use CV. Force the student to justify the choice based on outlier sensitivity and unit comparison.

## PREREQUISITE_NODE_IDS
N/A

## PREREQUISITE_REASONS
none

## FORWARD_NODE_IDS
N/A

## FORWARD_REASONS
none

## CROSS_SUBJECT_PREREQS
c11_math_sets_relations, c11_math_functions

## CROSS_SUBJECT_REASONS
c11_math_sets_relations: Frequency distributions are fundamentally defined on sets (classes) with a relation mapping elements to frequencies; understanding set builder notation and Cartesian products helps define class intervals rigorously.
c11_math_functions: The concepts of Mean, Variance, and Standard Deviation are functions mapping a dataset (domain) to a real number (codomain); the Step-Deviation method uses a linear transformation function $u = \frac{x-A}{h}$ to simplify computation, requiring understanding of function transformation properties.

## CHAIN_DESCRIPTION
c11_math_sets_relations -> c11_app_cbse_10_001 -> c11_math_functions

## THIS_FORMULA
N/A - conceptual (This node covers multiple formulas; key formulas listed in FORMULA_VARIABLES)

## FORMULA_VARIABLES
**Arithmetic Mean (Grouped):** $\bar{x} = \frac{\sum f_i x_i}{\sum f_i}$ or $\bar{x} = A + h \frac{\sum f_i u_i}{\sum f_i}$; $f_i$ = frequency of $i^{th}$ class, $x_i$ = class mark, $A$ = assumed mean, $h$ = class width, $u_i = \frac{x_i - A}{h}$.
**Variance (Grouped):** $\sigma^2 = \frac{\sum f_i (x_i - \bar{x})^2}{\sum f_i} = h^2 \left[ \frac{\sum f_i u_i^2}{N} - \left( \frac{\sum f_i u_i}{N} \right)^2 \right]$.
**Standard Deviation:** $\sigma = \sqrt{\sigma^2}$.
**Mean Deviation about Mean:** $MD_{\bar{x}} = \frac{\sum f_i |x_i - \bar{x}|}{\sum f_i}$.
**Coefficient of Variation:** $CV = \frac{\sigma}{\bar{x}} \times 100$ (provided $\bar{x} \neq 0$).
**Median (Grouped):** $Median = l + \frac{\frac{N}{2} - cf}{f} \times h$; $l$ = lower limit of median class, $cf$ = cumulative frequency before median class, $f$ = frequency of median class, $h$ = class width.
**Mode (Grouped):** $Mode = l + \frac{f_1 - f_0}{2f_1 - f_0 - f_2} \times h$; $f_1$ = modal class freq, $f_0$ = pre-modal freq, $f_2$ = post-modal freq.

## FORMULA_UNITS
Mean, Median, Mode, Standard Deviation, Mean Deviation: Same units as raw data (e.g., ₹, cm, kg, marks).
Variance: (Units of raw data)$^2$ (e.g., ₹², cm²).
Coefficient of Variation: Unitless (Percentage %).

## COMPUTATION_TYPE
statistical

## CROSS_SUBJECT
c11_math_sets_relations | Frequency distributions partition the universal set of raw data into disjoint subsets (classes); the frequency is the cardinality of each subset.
c11_math_functions | Statistical measures (Mean, SD) are real-valued functions of the dataset; the step-deviation method applies a linear transformation function $u(x) = \frac{x-A}{h}$ to simplify the computation of the variance function.
c11_eco_statistics | Economics uses these exact measures (Mean income, SD of prices, CV of exports) to analyze economic data; Lorenz Curve and Gini Coefficient build directly on cumulative frequency concepts (Ogives) taught here.
c11_bio_statistics | Biology uses Mean $\pm$ SD for reporting experimental results (e.g., plant height, enzyme activity); Standard Error and t-tests (higher classes) require variance estimation learned here.

## PREREQ_CONCEPT
Ability to construct and interpret Frequency Distribution Tables (Discrete and Continuous) and calculate Class Marks ($x_i$) for continuous class intervals.

## PREREQ_BEFORE
The student must be comfortable converting raw data into a grouped frequency table with proper class boundaries (exclusive/inclusive conversion) and calculating the mid-point (class mark) for each interval, as all formulas ($x_i$, $f_i$) depend on this table structure.

## PREREQ_STUCK
Review "Organising Data" (Section 10.2 of NCERT) specifically: conversion of inclusive classes to exclusive (true) class limits, calculation of class marks, and cumulative frequency construction.

## WORKED_EXAMPLE_1
PROBLEM: The following data shows the marks obtained by 60 students in an Applied Mathematics test (Max Marks 50). Find the Mean, Median, and Mode. Interpret the skewness of the distribution.
| Marks | 0-10 | 10-20 | 20-30 | 30-40 | 40-50 |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Students | 5 | 10 | 20 | 15 | 10 |
STEPS:
- Step 1: Verify class intervals are continuous (exclusive). They are (0-10, 10-20...). Calculate Class Marks ($x_i$): 5, 15, 25, 35, 45. Identify $N = \sum f_i = 60$.
- Step 2: **Mean Calculation (Direct Method):** Compute $f_i x_i$: 25, 150, 500, 525, 450. Sum = 1650. $\bar{x} = 1650 / 60 = 27.5$.
- Step 3: **Median Calculation:** Find $N/2 = 30$. Construct Cumulative Frequency (cf): 5, 15, 35, 50, 60. Median Class = 20-30 (cf just > 30). $l=20, cf=15, f=20, h=10$. Median $= 20 + \frac{30-15}{20} \times 10 = 20 + 7.5 = 27.5$.
- Step 4: **Mode Calculation:** Modal Class = 20-30 (Max freq 20). $l=20, f_1=20, f_0=10, f_2=15, h=10$. Mode $= 20 + \frac{20-10}{40-10-15} \times 10 = 20 + \frac{10}{15} \times 10 = 20 + 6.67 = 26.67$.
- Step 5: **Interpret Skewness:** Mean (27.5) $\approx$ Median (27.5) > Mode (26.67). The distribution is approximately symmetric (slight positive skew). Since Mean $\approx$ Median, the data is fairly balanced around the center.
REASONING: The Direct Method is used for Mean as values are small. Median uses cumulative frequency to locate the middle position. Mode uses the grouping formula. Comparing the three measures reveals the shape: Mean > Median > Mode implies positive skew (tail right); Mean < Median < Mode implies negative skew (tail left); equality implies symmetry.
ANSWER: Mean = 27.5, Median = 27.5, Mode = 26.67. The distribution is nearly symmetric with a slight positive skew.

## WORKED_EXAMPLE_2
PROBLEM: Calculate the Standard Deviation and Coefficient of Variation for the following distribution of weekly wages (in ₹) of workers in a factory.
| Wages (₹) | 300-320 | 320-340 | 340-360 | 360-380 | 380-400 |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Workers | 4 | 10 | 18 | 12 | 6 |
STEPS:
- Step 1: Identify parameters for Step-Deviation Method. Class width $h = 20$. Choose Assumed Mean $A = 350$ (mid of 340-360, freq 18). Class Marks $x_i$: 310, 330, 350, 370, 390.
- Step 2: Compute Step Deviations $u_i = \frac{x_i - 350}{20}$: -2, -1, 0, 1, 2.
- Step 3: Construct Calculation Table:
  $f_i$: 4, 10, 18, 12, 6. $N=50$.
  $f_i u_i$: -8, -10, 0, 12, 12. $\sum f_i u_i = 6$.
  $f_i u_i^2$: 16, 10, 0, 12, 24. $\sum f_i u_i^2 = 62$.
- Step 4: **Calculate Mean:** $\bar{x} = A + h \frac{\sum f_i u_i}{N} = 350 + 20 \times \frac{6}{50} = 350 + 2.4 = 352.4$.
- Step 5: **Calculate Variance:** $\sigma^2 = h^2 \left[ \frac{\sum f_i u_i^2}{N} - \left( \frac{\sum f_i u_i}{N} \right)^2 \right] = 400 \left[ \frac{62}{50} - \left( \frac{6}{50} \right)^2 \right] = 400 \left[ 1.24 - 0.0144 \right] = 400 \times 1.2256 = 490.24$.
- Step 6: **Calculate SD and CV:** $\sigma = \sqrt{490.24} \approx 22.14$. $CV = \frac{22.14}{352.4} \times 100 \approx 6.28\%$.
REASONING: Step-deviation simplifies arithmetic for large numbers. Variance formula derives from $\sigma^2 = \frac{\sum f(x-\bar{x})^2}{N} = \frac{\sum f(hu + A - \bar{x})^2}{N} = h^2 \frac{\sum f(u - \bar{u})^2}{N}$. CV expresses SD as % of mean, allowing comparison with other factories paying different wage scales.
ANSWER: Standard Deviation $\approx$ ₹22.14, Coefficient of Variation $\approx$ 6.28%. The wages are relatively consistent (Low CV).

## WORKED_EXAMPLE_3
PROBLEM: A company has two factories, A and B. Factory A employs 100 workers with an average weekly wage of ₹450 and SD of ₹15. Factory B employs 80 workers with an average weekly wage of ₹500 and SD of ₹20. The management decides to merge the wage structures. Find the Combined Mean and Combined Standard Deviation for all 180 workers.
STEPS:
- Step 1: **Combined Mean:** $\bar{x}_{combined} = \frac{n_1 \bar{x}_1 + n_2 \bar{x}_2}{n_1 + n_2} = \frac{100(450) + 80(500)}{180} = \frac{45000 + 40000}{180} = \frac{85000}{180} \approx 472.22$.
- Step 2: **Calculate Combined Variance Formula:** $\sigma^2_{combined} = \frac{n_1 (\sigma_1^2 + d_1^2) + n_2 (\sigma_2^2 + d_2^2)}{n_1 + n_2}$, where $d_1 = \bar{x}_1 - \bar{x}_{combined}$, $d_2 = \bar{x}_2 - \bar{x}_{combined}$.
- Step 3: **Compute Deviations of Group Means from Combined Mean:**
  $d_1 = 450 - 472.22 = -22.22$. $d_1^2 \approx 493.73$.
  $d_2 = 500 - 472.22 = 27.78$. $d_2^2 \approx 771.73$.
- Step 4: **Plug into Variance Formula:**
  Factory A contribution: $100 \times (15^2 + 493.73) = 100 \times (225 + 493.73) = 100 \times 718.73 = 71873$.
  Factory B contribution: $80 \times (20^2 + 771.73) = 80 \times (400 + 771.73) = 80 \times 1171.73 = 93738.4$.
  Total Sum = $71873 + 93738.4 = 165611.4$.
  $\sigma^2_{combined} = \frac{165611.4}{180} \approx 920.06$.
- Step 5: **Combined SD:** $\sigma_{combined} = \sqrt{920.06} \approx 30.33$.
- Step 6: **Interpretation:** The combined SD (30.33) is significantly larger than individual SDs (15, 20). This is because the *difference in means* (50) contributes heavily to the overall spread (between-group variation), not just within-group variation.
REASONING: Combined Mean is weighted average. Combined Variance formula accounts for within-group variance ($\sigma^2$) and between-group variance ($d^2$). This is a classic "Combined Series" problem testing deep understanding of variance decomposition (ANOVA precursor).
ANSWER: Combined Mean = ₹472.22, Combined Standard Deviation $\approx$ ₹30.33.

## COMPETENCY_QUESTION_1
QUESTION: A meteorological department records the daily maximum temperature (in °C) for a city over two weeks (14 days):
Week 1: 38, 39, 40, 41, 42, 43, 44
Week 2: 35, 36, 37, 38, 39, 40, 41
The department claims: "The temperature was more variable in Week 1 because the range is 6°C (38 to 44) compared to Week 2 range of 6°C (35 to 41)... wait, ranges are equal. So variability is the same." Critique this claim using Standard Deviation and Coefficient of Variation. Which week was actually more variable in a relative sense?
COMPETENCY: Statistical Reasoning & Critical Evaluation of Claims
STEPS:
- Step 1: Note both datasets have 7 values. Calculate Mean for Week 1: $\frac{38+39+40+41+42+43+44}{7} = 41$. Mean for Week 2: $\frac{35+36+37+38+39+40+41}{7} = 38$.
- Step 2: Calculate SD for Week 1. Deviations from 41: -3, -2, -1, 0, 1, 2, 3. Sum of squares = 9+4+1+0+1+4+9 = 28. Variance = 28/7 = 4. SD = 2.
- Step 3: Calculate SD for Week 2. Deviations from 38: -3, -2, -1, 0, 1, 2, 3. Sum of squares = 28. Variance = 4. SD = 2.
- Step 4: Calculate CV. Week 1: $CV_1 = \frac{2}{41} \times 100 \approx 4.88\%$. Week 2: $CV_2 = \frac{2}{38} \times 100 \approx 5.26\%$.
- Step 5: Critique: The claim "variability is the same" is true for *absolute* dispersion (Range and SD are identical). However, *relative* dispersion (CV) is higher in Week 2 (5.26% > 4.88%) because the same absolute spread (2°C) represents a larger fraction of the lower mean temperature (38°C vs 41°C).
ANSWER: Absolute variability (SD) is identical (2°C). Relative variability (CV) is higher in Week 2 (~5.26%) than Week 1 (~4.88%). The claim is incomplete; it ignores the scale (mean) of the data.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a frequency distribution of 100 students' heights (cm), the following summary statistics were computed: Mean = 165 cm, Median = 164 cm, Mode = 162 cm, Standard Deviation = 8 cm. Later, it was discovered that the measuring tape was stretched, causing every measurement to be recorded as 2 cm *greater* than the actual height.
(a) Determine the corrected Mean, Median, Mode, and Standard Deviation.
(b) Determine the corrected Coefficient of Variation.
(c) Explain why the Standard Deviation does not change, but the Coefficient of Variation does.
COMPETENCY: Understanding Invariance Properties of Statistical Measures under Linear Transformation
STEPS:
- Step 1: Identify the transformation. Recorded $x_{recorded} = x_{true} + 2$. This is a shift of origin ($A=2$, $h=1$).
- Step 2: **Corrected Central Tendency:** All measures of location shift by -2 cm.
  Corrected Mean = 165 - 2 = 163 cm.
  Corrected Median = 164 - 2 = 162 cm.
  Corrected Mode = 162 - 2 = 160 cm.
- Step 3: **Corrected Dispersion (SD):** Standard Deviation is invariant to change of origin (adding/subtracting constant). $\sigma_{true} = \sigma_{recorded} = 8$ cm. (Variance also unchanged at 64 cm²).
- Step 4: **Corrected CV:** $CV_{true} = \frac{\sigma_{true}}{\bar{x}_{true}} \times 100 = \frac{8}{163} \times 100 \approx 4.91\%$. (Original CV = $\frac{8}{165} \times 100 \approx 4.85\%$).
- Step 5: **Justification:** SD depends on *differences* between values $(x_i - \bar{x})$. Adding a constant $c$ to all $x_i$ adds $c$ to $\bar{x}$, so $(x_i+c) - (\bar{x}+c) = x_i - \bar{x}$. Differences unchanged $\rightarrow$ SD unchanged. CV = $\frac{\sigma}{\bar{x}}$. Since $\sigma$ is constant but $\bar{x}$ decreases (165 $\to$ 163), the ratio $\frac{\sigma}{\bar{x}}$ increases.
ANSWER: (a) Mean=163, Median=162, Mode=160, SD=8. (b) CV $\approx$ 4.91%. (c) SD is shift-invariant (measures spread); CV is scale-dependent ratio (spread/location), so denominator change alters it.
DIFFICULTY: hard