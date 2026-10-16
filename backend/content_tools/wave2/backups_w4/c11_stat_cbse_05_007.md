## ELI5
The shoe store stocks the size that sells most - the mode, the fashionable value. Discrete sizes like 7, 8, 9: read the frequency column's maximum and done. Continuous classes: make them exclusive and equal first, spot the modal class, then apply the formula using its two neighbour gaps, D1 and D2. Because only the modal class and its neighbours matter, the mode shrugs off extreme values and survives open-ended tables.

## DEFINITION
Mode is the value that occurs with the highest frequency in a data set; for discrete series it is the variable value with maximum frequency, and for continuous series it is calculated using the modal class formula \( \text{Mode} = L + \frac{D_1}{D_1 + D_2} \times h \) where \( L \) is the lower limit of the modal class, \( D_1 = f_m - f_{m-1} \), \( D_2 = f_m - f_{m+1} \), and \( h \) is the class interval.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can correctly identify the modal class in a continuous frequency distribution, apply the mode formula with proper handling of inclusive class intervals and cumulative frequency conversions, and justify the choice of mode over mean or median for qualitative or open-ended data.

## SCOPE_BOUNDARY
This node covers calculation of mode for discrete series (by inspection) and continuous series (by formula), including conversion of less-than/more-than cumulative frequencies and inclusive class intervals to exclusive form. It also covers merits of mode. It does not cover the empirical relationship between mean, median, and mode (next node) or geometric/harmonic mean.

## WALKTHROUGH
Imagine you own a shoe store and want to stock the size that sells the most — that is the mode, the most "fashionable" value. Begin by checking if your data is discrete (distinct sizes like 7, 8, 9) or continuous (class intervals like 20–25, 25–30). For discrete data, simply find the frequency column's maximum; the corresponding variable is the mode. For continuous data, first ensure class intervals are exclusive and equal — if given as less-than cumulative frequencies, convert to ordinary frequencies by subtraction. Identify the modal class (highest frequency), then apply the formula step by step. The key insight is that mode depends only on the modal class and its neighbours, making it robust against extreme values and usable for open-ended distributions.

Takeaway: mastery means finding the mode by series type and arguing when it beats mean and median - qualitative data, open ends, most-common sizing. Exam moves: find-the-mode and choose-the-average questions on the store scene. Check yourself: a table can be bimodal or have no mode at all - the fashion metaphor does not promise a unique winner. Students miss it because the formula looks heavier than the idea, when the shoe rack shows the design: the mode is the customer's own average - what actually walks out the door - and the D1-over-D1-plus-D2 machinery only refines where inside the winning class the true peak stands.

## DIAGNOSTIC_QUESTION_1
State the formula for calculating mode in a continuous frequency distribution and define each symbol used.

## DIAGNOSTIC_ANSWER_1
The formula is \( \text{Mode} = L + \frac{D_1}{D_1 + D_2} \times h \), where \( L \) = lower limit of the modal class, \( D_1 = f_m - f_{m-1} \) (difference between modal class frequency and preceding class frequency), \( D_2 = f_m - f_{m+1} \) (difference between modal class frequency and succeeding class frequency), and \( h \) = class interval (width). A wrong answer reveals the student has memorised the formula without understanding the meaning of \( D_1 \) and \( D_2 \) — often confusing which class is preceding/succeeding or using absolute frequencies instead of differences.

## DIAGNOSTIC_QUESTION_2
A student computes the mode for the following discrete series and gets 30. Variable: 10, 20, 30, 40, 50; Frequency: 2, 8, 20, 10, 5. They say, "The mode is 30 because it has the highest frequency 20." Is this correct? Explain why or why not.

## DIAGNOSTIC_ANSWER_2
Yes, it is correct. In a discrete series, mode is the value of the variable corresponding to the highest frequency. Here, frequency 20 corresponds to variable 30, so mode = 30. A wrong answer (e.g., saying mode is 20) reveals the student confuses the frequency value with the variable value — a common error when they mechanically pick the largest number in the frequency column without linking it to its variable.

## DIAGNOSTIC_QUESTION_3
For the continuous distribution below, find the mode. Class intervals: 0–10, 10–20, 20–30, 30–40, 40–50; Frequencies: 5, 12, 20, 8, 5.

## DIAGNOSTIC_ANSWER_3
Modal class is 20–30 (highest frequency 20). \( L = 20 \), \( f_m = 20 \), \( f_{m-1} = 12 \), \( f_{m+1} = 8 \), \( h = 10 \). \( D_1 = 20 - 12 = 8 \), \( D_2 = 20 - 8 = 12 \). Mode \( = 20 + \frac{8}{8+12} \times 10 = 20 + 4 = 24 \). A wrong answer (e.g., 25 or 28) reveals the student either used \( f_{m-1} \) and \( f_{m+1} \) incorrectly (swapped preceding/succeeding) or forgot to multiply by \( h \), or used the midpoint instead of lower limit.

## DIAGNOSTIC_QUESTION_4
Compare the mode calculated from the continuous series in Question 3 with the mode you would get if you treated the same data as a discrete series using the mid-points (5, 15, 25, 35, 45) with the same frequencies. Why do they differ?

## DIAGNOSTIC_ANSWER_4
Discrete mode using mid-points: highest frequency 20 at mid-point 25 → mode = 25. Continuous mode = 24. They differ because the continuous formula interpolates within the modal class using the shape of the distribution (neighbouring frequencies), while the discrete method assumes all observations are exactly at the mid-point. A wrong answer (e.g., "they are the same") reveals the student does not understand that grouping data into classes loses information, and the mode formula is an approximation based on the assumption of uniform distribution within the modal class.

## DIAGNOSTIC_QUESTION_5
A factory produces shirts in sizes S, M, L, XL with frequencies 50, 120, 80, 30. The manager says, "The average size is M because it's the mode." The owner says, "We should use the mean size." Evaluate which average is more appropriate for production planning and why.

## DIAGNOSTIC_ANSWER_5
Mode (M) is more appropriate because shirt sizes are categorical/ordinal qualitative data — mean size cannot be calculated (no numerical values assigned). Mode gives the most demanded size, which directly informs inventory decisions. A wrong answer (e.g., "mean is better because it uses all data") reveals the student does not recognise that mean requires numerical data and equal intervals, and fails to match the average type to the data nature — a key merit of mode.

## DIAGNOSTIC_QUESTION_6
Create a continuous frequency distribution with 5 classes where the mode is exactly at the lower limit of the modal class. Provide the class intervals and frequencies, then verify using the formula.

## DIAGNOSTIC_ANSWER_6
Example: Classes 0–10, 10–20, 20–30, 30–40, 40–50; Frequencies 5, 10, 20, 20, 5. Modal class is 20–30 (frequency 20, tied with 30–40 but first occurrence). \( L = 20 \), \( f_m = 20 \), \( f_{m-1} = 10 \), \( f_{m+1} = 20 \). \( D_1 = 10 \), \( D_2 = 0 \). Mode \( = 20 + \frac{10}{10+0} \times 10 = 30 \) — wait, that gives upper limit. To get mode at lower limit, need \( D_1 = 0 \). So set frequencies: 5, 20, 20, 10, 5. Modal class 10–20 (first highest). \( L = 10 \), \( f_m = 20 \), \( f_{m-1} = 5 \), \( f_{m+1} = 20 \). \( D_1 = 15 \), \( D_2 = 0 \) → mode = 20. Not lower limit. Correct construction: make \( D_1 = 0 \) → \( f_m = f_{m-1} \). But then modal class not unique. Actually, mode = L when \( D_1 = 0 \) i.e., \( f_m = f_{m-1} \). But then two classes have same max frequency → bimodal. So mode cannot be exactly at lower limit unless we accept bimodal or use a different definition. A good answer recognises this subtlety: mode = L only if \( D_1 = 0 \), which implies the preceding class has equal frequency, making the distribution bimodal. A poor answer gives a distribution without checking the condition, revealing lack of algebraic insight into the formula.

## COMMON_MISCONCEPTION
Students often apply the continuous series mode formula to discrete series by converting variables into class intervals of width 1 (e.g., 10 becomes 9.5–10.5) and then using the formula, which yields a decimal mode like 30.2 instead of the correct discrete mode 30. This happens because they memorise the formula as a universal recipe without understanding that discrete data has exact values and the formula is an interpolation approximation for grouped data only. Another error is using inclusive class intervals (e.g., 10–19, 20–29) directly in the formula without converting to exclusive form (9.5–19.5, 19.5–29.5), leading to wrong \( L \) and \( h \).

## ON_FAILURE
If a student uses the formula on discrete data, ask: "What is the actual observed value that occurs most often?" Have them list raw data points to see mode is an observed value, not an interpolated one. For inclusive intervals, give a simple example: classes 10–19, 20–29 with frequencies 5, 10. Ask: "What is the lower limit of the modal class?" They say 20. Then ask: "If a value is 19.5, which class does it belong to?" They realise 19.5 falls in a gap. Then show conversion: 9.5–19.5, 19.5–29.5, so \( L = 19.5 \), \( h = 10 \). Practice 3 conversions until automatic.

## PREREQUISITE_NODE_IDS
c11_stat_cbse_05_001, c11_stat_cbse_05_005, c10_math_cbse_13_004, c7_math_ch13_006, c11_stat_cbse_05_006

## PREREQUISITE_REASONS
c11_stat_cbse_05_001: Understanding the purpose of averages sets the context for why mode is needed as a measure of central tendency.
c11_stat_cbse_05_005: Median calculation introduces cumulative frequency and class intervals, which are essential for identifying the modal class in continuous series.
c10_math_cbse_13_004: Class 10 covered mode of grouped data using the same formula; this node builds on that with discrete series, cumulative frequency conversion, and merits.
c7_math_ch13_006: Class 7 introduced mode as "most frequent value" for raw data, the foundational concept for discrete series mode.
c11_stat_cbse_05_006: Mode calculation for continuous series uses the same interpolation logic (L + [D₁/(D₁+D₂)] × h) reinforcing the grouped-data estimation concept.  

## FORWARD_NODE_IDS
c11_stat_cbse_05_008, c11_stat_cbse_05_011, c12_ip_cbse_02_008

## FORWARD_REASONS
c11_stat_cbse_05_008: The empirical relationship \( \text{Mode} = 3 \times \text{Median} - 2 \times \text{Mean} \) requires mode calculation skills from this node.
c11_stat_cbse_05_011: Comparative merits of averages need a thorough understanding of mode's properties (graphical location, open-ended suitability, qualitative data) established here.
c12_ip_cbse_02_008: Mode calculation from Class 11 Statistics.  

## CROSS_SUBJECT_PREREQS
c10_math_cbse_13_004, c7_math_ch13_006
## CROSS_SUBJECT_REASONS
c10_math_cbse_13_004: Directly teaches the mode formula for grouped data in Class 10 Mathematics, which is the computational basis for this node's continuous series calculation.
c7_math_ch13_006: Introduces mode as "most frequent value" in Class 7 Mathematics, building the intuitive foundation for discrete series mode.

## CHAIN_DESCRIPTION
c11_stat_cbse_05_001 -> c11_stat_cbse_05_007 -> c11_stat_cbse_05_008

## THIS_FORMULA
Mode = L + (D1 / (D1 + D2)) × h

## FORMULA_VARIABLES
L = lower limit of the modal class; D1 = f_m - f_{m-1} (difference between modal class frequency and preceding class frequency); D2 = f_m - f_{m+1} (difference between modal class frequency and succeeding class frequency); h = class interval (width); f_m = frequency of modal class.

## FORMULA_UNITS
Mode has the same units as the variable (e.g., rupees, kg, marks). L and h share the variable's units. D1 and D2 are frequencies (unitless counts).

## COMPUTATION_TYPE
statistical

## CROSS_SUBJECT
c10_math_cbse_13_004 | The mode formula for continuous series is identical to the one taught in Class 10 Mathematics (Statistics chapter), reinforcing computational fluency across subjects.
c7_math_ch13_006 | The concept of mode as "most frequent value" from Class 7 Mathematics extends directly to discrete series mode in Class 11 Economics/Statistics.

## PREREQ_CONCEPT
Ability to construct and interpret frequency distribution tables, including identifying class limits, class intervals, and cumulative frequencies.

## PREREQ_BEFORE
The student must be able to convert less-than/more-than cumulative frequency tables into ordinary frequency distributions and adjust inclusive class intervals to exclusive form.

## PREREQ_STUCK
Review c11_stat_cbse_05_005 (Median) for cumulative frequency conversion and class interval adjustment techniques.

## WORKED_EXAMPLE_1
PROBLEM: A survey of 50 households in a village recorded the number of milk-producing animals per household. Find the mode.
Number of animals: 0, 1, 2, 3, 4, 5
Number of households: 5, 12, 18, 10, 3, 2

STEPS:
- Step 1: Identify that this is a discrete series because the variable (number of animals) takes distinct integer values.
- Step 2: Locate the maximum frequency in the frequency column. The frequencies are 5, 12, 18, 10, 3, 2. The highest is 18.
- Step 3: Find the variable value corresponding to this maximum frequency. Frequency 18 corresponds to "2 animals".
- Step 4: State the mode. Mode = 2 animals.
- Step 5: Interpret: The most typical household has 2 milk-producing animals. This helps the dairy cooperative plan collection routes.
REASONING: In discrete series, mode is found by simple inspection — no formula needed. The mode is an actual observed value, not an approximation. This contrasts with continuous series where we interpolate within a class interval.
ANSWER: Mode = 2 animals

## WORKED_EXAMPLE_2
PROBLEM: The daily wages (in Rs) of 80 workers in a factory are given below. Calculate the mode.
Daily wages (Rs): 100–120, 120–140, 140–160, 160–180, 180–200, 200–220
Number of workers: 10, 15, 25, 20, 7, 3

STEPS:
- Step 1: Confirm data is continuous with equal class intervals (h = 20) and exclusive form (upper limit of one class = lower limit of next).
- Step 2: Identify modal class — the class with highest frequency. Frequencies: 10, 15, 25, 20, 7, 3. Maximum is 25, so modal class = 140–160.
- Step 3: Extract values for formula: L = 140 (lower limit of modal class), f_m = 25, f_{m-1} = 15 (preceding class 120–140), f_{m+1} = 20 (succeeding class 160–180), h = 20.
- Step 4: Compute D1 = f_m - f_{m-1} = 25 - 15 = 10. Compute D2 = f_m - f_{m+1} = 25 - 20 = 5.
- Step 5: Apply formula: Mode = 140 + (10 / (10 + 5)) × 20 = 140 + (10/15) × 20 = 140 + 13.33 = 153.33.
- Step 6: Verify: Mode lies within modal class (140–160) and is closer to the lower limit because D1 > D2 (preceding class has lower frequency than succeeding class, so concentration is toward lower end).
REASONING: The formula interpolates the mode within the modal class based on the relative frequencies of neighbouring classes. Larger D1 means the rise to the modal class is steeper from the left, pulling mode leftward.
ANSWER: Mode = Rs 153.33

## WORKED_EXAMPLE_3
PROBLEM: The following is a less-than cumulative frequency distribution of monthly electricity consumption (in kWh) of 100 households. Find the mode.
Monthly consumption (kWh): Less than 50, Less than 100, Less than 150, Less than 200, Less than 250, Less than 300
Number of households: 8, 25, 55, 85, 95, 100

STEPS:
- Step 1: Convert less-than cumulative frequency to ordinary frequency distribution. Class intervals: 0–50, 50–100, 100–150, 150–200, 200–250, 250–300.
- Step 2: Compute frequencies by subtraction: 0–50: 8; 50–100: 25-8=17; 100–150: 55-25=30; 150–200: 85-55=30; 200–250: 95-85=10; 250–300: 100-95=5.
- Step 3: Identify modal class. Two classes have maximum frequency 30: 100–150 and 150–200. This is bimodal. By convention, take the first modal class: 100–150.
- Step 4: Extract values: L = 100, f_m = 30, f_{m-1} = 17 (class 50–100), f_{m+1} = 30 (class 150–200), h = 50.
- Step 5: Compute D1 = 30 - 17 = 13. D2 = 30 - 30 = 0.
- Step 6: Apply formula: Mode = 100 + (13 / (13 + 0)) × 50 = 100 + 50 = 150. But 150 is the upper limit of the modal class. Since D2=0, the mode is at the boundary. This indicates the next class has equal frequency. The mode is 150 kWh (or we can say the distribution is bimodal with modes at 150 and 150? Actually both classes have same frequency, so mode is ill-defined by formula; but using first modal class gives 150).
- Step 7: Interpret: The most common consumption is around 150 kWh, but the flat peak suggests two equally common ranges.
REASONING: Cumulative frequency conversion is essential before mode calculation. Bimodal distributions require careful handling — the formula gives a boundary value when neighbouring class has equal frequency, signalling a flat top.
ANSWER: Mode = 150 kWh (with note that distribution is bimodal)

## COMPETENCY_QUESTION_1
QUESTION: A readymade garment shop sells shirts in sizes S, M, L, XL, XXL. The sales data for last month is:
Size: S, M, L, XL, XXL
Number sold: 45, 120, 85, 60, 20
The owner wants to know which size to stock more of for the next season. 
(a) Which measure of central tendency is most appropriate? Justify your choice.
(b) If the owner instead calculates the mean size by assigning codes 1,2,3,4,5 to S, M, L, XL, XXL, what would be the problem with that approach?
(c) State two merits of using mode in this situation.

COMPETENCY: Translating real-world situations to mathematical expressions and justifying the choice of statistical measure.

STEPS:
- Step 1: Recognise that shirt sizes are ordinal qualitative data, not numerical.
- Step 2: Identify that mode gives the most frequently sold size (M), which directly answers the stocking question.
- Step 3: Explain why mean is inappropriate: coding sizes as 1–5 assumes equal intervals and numerical meaning, which is false (difference between S and M is not same as L and XL in any measurable sense).
- Step 4: List merits: (i) Mode can be used for qualitative data; (ii) Mode is not affected by extreme values (e.g., a few XXL sales don't change the mode).
ANSWER: (a) Mode is most appropriate because it identifies the most demanded size (M) for qualitative ordinal data. (b) Mean of coded sizes is meaningless because the codes are arbitrary labels without equal intervals or true numerical significance. (c) Merits: (i) Suitable for qualitative data; (ii) Unaffected by extreme values; (iii) Can be determined graphically; (iv) Useful for open-ended distributions.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The following frequency distribution has an error in the modal class frequency. The reported mode is 42.5 using the formula. Find the correct frequency of the modal class.
Class intervals: 20–30, 30–40, 40–50, 50–60, 60–70
Frequencies: 12, 18, f, 15, 10 (where f is the frequency of modal class 40–50)
Given that the mode is 42.5, find f.

COMPETENCY: Error identification and correction using inverse application of the mode formula.

STEPS:
- Step 1: Identify modal class = 40–50 (since mode 42.5 lies in it). So L = 40, h = 10.
- Step 2: Let f_m = f. Then f_{m-1} = 18 (class 30–40), f_{m+1} = 15 (class 50–60).
- Step 3: D1 = f - 18, D2 = f - 15.
- Step 4: Mode formula: 42.5 = 40 + [(f - 18) / ((f - 18) + (f - 15))] × 10.
- Step 5: Simplify: 2.5 = [(f - 18) / (2f - 33)] × 10 → 2.5/10 = (f - 18)/(2f - 33) → 0.25 = (f - 18)/(2f - 33).
- Step 6: Cross-multiply: 0.25(2f - 33) = f - 18 → 0.5f - 8.25 = f - 18 → 18 - 8.25 = f - 0.5f → 9.75 = 0.5f → f = 19.5.
- Step 7: Frequency must be integer. Check: if f=19, mode = 40 + (1/ (1+4))×10 = 42. If f=20, mode = 40 + (2/(2+5))×10 = 42.86. Neither gives 42.5. So data has inconsistency — perhaps class intervals not equal or mode reported approximately. But mathematically f=19.5.
- Step 8: Conclude: The given mode 42.5 is not exactly achievable with integer frequencies; the closest integer frequencies give mode 42 (f=19) or 42.86 (f=20). The error might be in reported mode or in neighbouring frequencies.
ANSWER: The exact frequency f would be 19.5, which is impossible for a frequency count. This indicates either the reported mode 42.5 is approximate, or the neighbouring frequencies (18 and 15) are incorrect. With integer frequencies, f=19 gives mode=42, f=20 gives mode≈42.86.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you own a shoe store and want to ______ the size that sells the most — that is the mode, the most "fashionable" value.

## DIAGNOSTIC_ANSWER_7
stock

The word is stock - the store's decision about the best-selling size. A wrong answer ("sell") reveals the student has answered the outcome, not the action. Recall the shopkeeper's task before filling, and give the word exactly. Verify against the lesson's own wording before you commit. The blank grades the exact term, not a synonym.

## DIAGNOSTIC_QUESTION_8
What common mix-up does this lesson flag about Mode?

## DIAGNOSTIC_ANSWER_8
Students often apply the continuous series mode formula to discrete series by converting variables into class intervals of width 1 (e.g., 10 becomes 9.5–10.5) and then using the formula, which yields a decimal mode like 30.2 instead of the correct discrete mode 30. Verify against the lesson's own wording before you commit.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can correctly identify the modal class in a continuous frequency distribution, apply the mode formula with proper handling of inclusive class intervals and cumulative frequency conversions, and justify the choice of mode over mean or median for qualitative or open-ended data. Verify against the lesson's own wording before you commit.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Imagine you own a shoe store and want to stock the size that sells the most — that is the mode, the most "______" value.

## DIAGNOSTIC_ANSWER_10
fashionable

The word is fashionable - the lesson's nickname for the modal value. A wrong answer ("popular") reveals the student has paraphrased the quote. Recall the sentence's phrase before filling, and give the word exactly. Verify against the lesson's own wording before you commit. The blank grades the exact term, not a synonym.
