## ELI5
Give every student in the class five bonus marks and the class average climbs by exactly those five — fairness moves the whole crowd together. Adding the same amount to every value slides the entire dot plot along the number line, like shifting a bead curtain one notch to the right: every bead moves, so the balancing point moves by exactly one notch too. Nobody needs to re-add the totals; the old mean plus the bonus is the new mean, instantly.

## DEFINITION
When a constant value \(k\) is added to every observation in a data set, the mean of the new data set increases by exactly \(k\). If the original data set has \(n\) values \(x_1, x_2, \dots, x_n\) with mean \(\bar{x}\), then the new mean after adding \(k\) to each value is \(\bar{x} + k\).
## COGNITIVE_LEVEL
understand
## MASTERY_CRITERIA
The student can compute the new mean after adding a constant to all values without recalculating the entire sum, and can explain why the mean shifts by exactly that constant using the balancing point or algebraic reasoning.
## SCOPE_BOUNDARY
This node covers the effect of adding (or subtracting) the same constant to every data value on the arithmetic mean. It does NOT cover multiplying by a constant (next node), weighted means, or grouped data with frequencies.
## WALKTHROUGH
Imagine your class of 5 students took a math test and scored: 72, 68, 75, 70, 65 marks. The teacher decides to give 5 bonus marks to everyone for attempting a challenging bonus question. Instead of adding 5 to each score and finding the mean all over again, can we just adjust the original mean? We know the original mean is 70. Since every student gets the same 5 marks, the "center" of the data shifts right by 5. The new mean becomes 75. This works because adding a constant to each value is like sliding the whole dot plot along the number line — the balancing point moves by exactly that constant.

Takeaway: adding a constant to every observation shifts the mean by exactly that constant — new mean = old mean + k — because the total rises by k repeated for each of the n values, and dividing by n gives back one k. Exam format: expect quick computations 'every value increased by this, find the new mean' and a why-question — the slide-the-dot-plot picture is the accepted reasoning. Verification beat: check the shift equals the constant, not more, not less. Why students miss it: they multiply the constant by the number of values and add that to the mean — the shared rise per value is the constant itself.

## DIAGNOSTIC_QUESTION_1
The mean of 8 numbers is 42. If 3 is added to each number, what is the new mean?
## DIAGNOSTIC_ANSWER_1
The new mean is 45. A wrong answer (like 42 or 66) reveals the student either thinks the mean doesn't change or incorrectly multiplies the constant by the number of data points. They haven't grasped that adding a constant to each value shifts the balancing point by that constant, regardless of how many values there are.
## DIAGNOSTIC_QUESTION_2
Explain why adding 7 to every value in a data set increases the mean by 7, using the idea of the mean as a balancing point on a number line.
## DIAGNOSTIC_ANSWER_2
The mean is the point where the sum of distances to the left equals the sum of distances to the right. Adding 7 to every value slides each dot 7 units right. The balancing point must also slide 7 units right to keep the distances equal. A wrong explanation (e.g., "because there are 7 numbers" or "the sum increases by 7") shows the student is memorising a rule without understanding the geometric meaning of the mean.
## DIAGNOSTIC_QUESTION_3
The mean monthly pocket money of 6 friends is ₹850. Each friend's parents increase their pocket money by ₹150. What is the new mean pocket money? Show your working.
## DIAGNOSTIC_ANSWER_3
Original mean = ₹850. Constant added = ₹150. New mean = 850 + 150 = ₹1000.
Working: New sum = (850 × 6) + (150 × 6) = 5100 + 900 = 6000. New mean = 6000 ÷ 6 = 1000.
A wrong answer like ₹850 or ₹1000 without correct reasoning, or calculating 850 + 150 × 6, reveals confusion between adding to each value versus adding to the sum.
## DIAGNOSTIC_QUESTION_4
A data set has mean 36. After adding a constant \(k\) to each value, the new mean is 53. Another data set with mean 36 has the same constant \(k\) added, but it has twice as many values. What is the new mean of the second data set?
## DIAGNOSTIC_ANSWER_4
The new mean is also 53. The number of values does not affect how much the mean shifts — it always shifts by \(k\). Here \(k = 53 - 36 = 17\). Whether the data set has 5, 10, or 100 values, adding 17 to each raises the mean by 17. A wrong answer (like 53 + 17 = 70, or 53 × 2) shows the student thinks the shift depends on sample size.
## DIAGNOSTIC_QUESTION_5
Ravi calculated the new mean after adding 12 to each of 9 values (original mean 48) as: New mean = 48 + 12 × 9 = 156. Is Ravi correct? If not, identify his error and give the correct new mean.
## DIAGNOSTIC_ANSWER_5
Ravi is incorrect. The correct new mean is 48 + 12 = 60. Ravi mistakenly multiplied the constant by the number of values (12 × 9 = 108) and added to the mean, confusing the change in SUM (which is 12 × 9) with the change in MEAN. This reveals a common error: thinking the mean increases by \(n \times k\) instead of just \(k\).
## DIAGNOSTIC_QUESTION_6
Create a real-life situation (Indian context) where adding a constant to every data value changes the mean in a meaningful way. Write the original data, the constant added, and explain what the new mean represents.
## DIAGNOSTIC_ANSWER_6
Example: A cricket team's 5 bowlers have economy rates: 6.2, 5.8, 7.1, 6.5, 5.4 runs/over. Mean = 6.2. Due to a rule change, 0.5 runs are added to every bowler's economy for a "free hit" penalty. New mean = 6.7. This represents the adjusted average economy after the penalty. A poor answer gives a trivial example (like "add 0") or fails to explain what the new mean means in context, showing lack of application ability.
## COMMON_MISCONCEPTION
Students often think the mean increases by \(k \times n\) (constant times number of values) because they confuse the change in the SUM (which is \(n \times k\)) with the change in the MEAN. For example, with original mean 20, n=5, adding 3 to each: they compute new mean = 20 + 3×5 = 35 instead of 20 + 3 = 23. They correctly see the total sum increases by 15 but forget to divide by n to get the mean.
## ON_FAILURE
Ask the student: "If the sum increases by 15 and there are 5 numbers, how much does the AVERAGE increase?" Guide them: New sum = old sum + 15. New mean = (old sum + 15)/5 = old sum/5 + 15/5 = old mean + 3. Use a dot plot: draw 5 dots, mark the mean, slide each dot 3 right, show the balancing point moves 3 right. Emphasise: "The mean is the sum DIVIDED by count. The extra 15 gets shared equally among 5 values, so each gets 3 more."
## PREREQUISITE_NODE_IDS
c6_math_ch09_100, c7_math_ch13_004, c8_math_ch12_1, c8_math_ch12_2
## PREREQUISITE_REASONS
c6_math_ch09_100: Students must know how to calculate the mean of a data set before understanding how it changes.
c7_math_ch13_004: Reinforces mean calculation and interpretation from Class 7 statistics.
c8_math_ch12_1: The "mean as balancing point" model provides the geometric intuition for why the mean shifts by the constant.
c8_math_ch12_2: Visualising with dot plots helps students see the translation of the entire distribution.
## FORWARD_NODE_IDS
c8_math_ch12_6, c8_math_ch12_10
## FORWARD_REASONS
c8_math_ch12_6: Understanding addition of a constant prepares students for multiplication by a constant (scaling), which combines with translation for linear transformations.
c8_math_ch12_10: Comparing mean, median, and mode requires knowing how each measure responds to adding a constant (all shift by the constant).
## CROSS_SUBJECT_PREREQS
c6_math_ch05_056, c7_math_ch04_009
## CROSS_SUBJECT_REASONS
c6_math_ch05_056: Linear equations in one variable — the mean formula \(\bar{x} = \frac{\sum x}{n}\) is an equation; adding a constant to each \(x\) transforms it algebraically.
c7_math_ch04_009: Substituting values into algebraic expressions — students substitute \(x_i + k\) into the mean expression and simplify to \(\bar{x} + k\).
## CHAIN_DESCRIPTION
c6_math_ch09_100 -> c8_math_ch12_1 -> c8_math_ch12_5 -> c8_math_ch12_6 -> c8_math_ch12_10
## THIS_FORMULA
If original data: \(x_1, x_2, \dots, x_n\) with mean \(\bar{x} = \frac{\sum_{i=1}^n x_i}{n}\), then after adding constant \(k\) to each value: new mean = \(\bar{x} + k\)
## FORMULA_VARIABLES
\(x_i\) = original data values, \(n\) = number of values, \(\bar{x}\) = original mean, \(k\) = constant added to each value
## FORMULA_UNITS
Same units as the original data (e.g., rupees, marks, kg, metres)
## COMPUTATION_TYPE
algebraic
## CROSS_SUBJECT

## PREREQ_CONCEPT
Understanding that the mean is the sum of values divided by the count, and that adding a constant to each value adds \(n \times k\) to the sum.
## PREREQ_BEFORE
The student must be able to compute the mean of a small data set (5-6 numbers) and express the mean formula algebraically as \(\bar{x} = \frac{\sum x}{n}\).
## PREREQ_STUCK
Review the algebraic derivation: \(\frac{(x_1+k)+(x_2+k)+\dots+(x_n+k)}{n} = \frac{\sum x_i + nk}{n} = \bar{x} + k\). Focus on the step where \(nk\) is divided by \(n\) to give \(k\).
## WORKED_EXAMPLE_1
PROBLEM: The mean weight of 7 boxes of mangoes is 18.4 kg. During packing, 0.6 kg of packaging material is added to each box. Find the new mean weight of the boxes without calculating the total weight of all boxes.

STEPS:
- Step 1: Identify the given information: original mean = 18.4 kg, number of boxes = 7, constant added to each box = 0.6 kg.
- Step 2: Recall the rule: when a constant \(k\) is added to every value, the new mean = original mean + \(k\).
- Step 3: Substitute the values: new mean = 18.4 + 0.6.
- Step 4: Compute: 18.4 + 0.6 = 19.0 kg.
- Step 5: Verify by full calculation: original total = 18.4 × 7 = 128.8 kg. Added total = 0.6 × 7 = 4.2 kg. New total = 133.0 kg. New mean = 133.0 ÷ 7 = 19.0 kg. Matches.

REASONING: The rule works because adding \(k\) to each of \(n\) values increases the sum by \(n \times k\). When we divide the new sum by \(n\) to get the mean, the \(n\) cancels out, leaving just \(k\) added to the original mean. This is true regardless of how many values there are.

ANSWER: 19.0 kg
## WORKED_EXAMPLE_2
PROBLEM: A teacher recorded the marks of 8 students in a test. The mean was 56. Later, she realised she had forgotten to award 4 grace marks to each student. What is the corrected mean? If the passing mark is 60, how many more students pass after the correction if originally 3 students scored exactly 56?

STEPS:
- Step 1: Identify the original mean = 56, constant to add = 4 (grace marks).
- Step 2: Apply the rule: corrected mean = 56 + 4 = 60.
- Step 3: Determine the effect on individual scores: every student's mark increases by 4.
- Step 4: Analyse the passing situation: originally 3 students scored exactly 56. After adding 4, they score 60. Since passing mark is 60, these 3 students now pass (assuming 60 is passing).
- Step 5: Conclude: corrected mean = 60; 3 additional students now meet the passing threshold.

REASONING: Adding a constant shifts every data point by the same amount, so the mean shifts by that amount. This also shifts the entire distribution, changing how many values lie above or below a fixed threshold like a passing mark.

ANSWER: Corrected mean = 60; 3 more students pass.
## WORKED_EXAMPLE_3
PROBLEM: The mean daily wage of 12 workers in a factory is ₹450. The management decides to give a festival bonus of ₹200 to each worker. After the bonus, the government announces a 10% tax on total wages (including bonus). Find the mean net wage per worker after tax. (Hint: First find the mean after bonus, then apply the tax percentage to the mean.)

STEPS:
- Step 1: Find mean after adding bonus: original mean = ₹450, bonus per worker = ₹200. Mean after bonus = 450 + 200 = ₹650.
- Step 2: Understand the tax: 10% tax on total wages means each worker pays 10% of their individual wage as tax. Since every worker pays the same percentage, the mean tax = 10% of mean wage.
- Step 3: Calculate mean tax: 10% of ₹650 = 0.10 × 650 = ₹65.
- Step 4: Find mean net wage: mean after bonus - mean tax = 650 - 65 = ₹585.
- Step 5: Verify with total: total before bonus = 450 × 12 = ₹5400. Total bonus = 200 × 12 = ₹2400. Total after bonus = ₹7800. Total tax = 10% of 7800 = ₹780. Net total = 7800 - 780 = ₹7020. Mean net = 7020 ÷ 12 = ₹585. Matches.

REASONING: This problem combines two transformations: adding a constant (bonus) and multiplying by a constant (1 - tax rate = 0.9). The mean responds linearly to both: first shift by +200, then scale by 0.9. The order matters: (450 + 200) × 0.9 = 585, not 450 × 0.9 + 200 = 605.

ANSWER: ₹585
## COMPETENCY_QUESTION_1
QUESTION: The mean of 10 numbers is 25. A student claims: "If I add 5 to the first number, 5 to the second number, and so on for all 10 numbers, the new mean will be 25 + 5 × 10 = 75." Is the student correct? Explain why or why not using the balancing point model.

COMPETENCY: Translating real-world situations to mathematical expressions and error identification and correction

STEPS:
- Step 1: Understand the student's claim: they think adding 5 to each of 10 numbers adds 5×10=50 to the mean.
- Step 2: Identify the correct rule: adding a constant \(k\) to each value adds \(k\) (not \(n \times k\)) to the mean.
- Step 3: Apply the balancing point model: imagine 10 dots on a number line with balancing point at 25. Slide each dot 5 units right. The balancing point slides 5 units right to 30.
- Step 4: Explain the error: the student confused the change in SUM (which is 5×10=50) with the change in MEAN (which is 50÷10=5).

ANSWER: The student is incorrect. The new mean is 30, not 75. Adding 5 to each of 10 numbers increases the sum by 50, but the mean is the sum divided by 10, so the mean increases by 50÷10 = 5. The balancing point moves only 5 units because all dots move together — their relative positions don't change.

DIFFICULTY: easy
## COMPETENCY_QUESTION_2
QUESTION: A survey of 15 families in a village found the mean monthly electricity consumption to be 280 units. The electricity board revises the billing: a fixed charge of 30 units is added to every family's consumption (for meter rent), and then a 20% surcharge is applied on the revised consumption. What is the new mean monthly consumption billed? If the board instead applied the 20% surcharge first and then added the 30 units, would the mean be different? Explain.

COMPETENCY: Comparing and justifying methods; understanding order of operations in data transformations

STEPS:
- Step 1: First scenario (add 30, then 20% surcharge): Mean after fixed charge = 280 + 30 = 310. Mean after 20% surcharge = 310 × 1.20 = 372 units.
- Step 2: Second scenario (20% surcharge first, then add 30): Mean after surcharge = 280 × 1.20 = 336. Mean after fixed charge = 336 + 30 = 366 units.
- Step 3: Compare: 372 ≠ 366. The mean is different.
- Step 4: Explain why: Adding a constant and multiplying by a constant do not commute. (x + a) × b = xb + ab, but x × b + a = xb + a. Since ab ≠ a (unless b=1 or a=0), the order changes the result.
- Step 5: Interpret: The fixed charge is added to the base consumption in the first case, so it also gets the 20% surcharge. In the second case, the fixed charge is added after the surcharge, so it doesn't get surcharged.

ANSWER: First method (add then surcharge): 372 units. Second method (surcharge then add): 366 units. The mean is different because the fixed charge of 30 units is subject to the 20% surcharge only in the first method. This shows that the order of adding a constant and multiplying by a constant matters for the mean.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: ______ your class of 5 students took a math test and scored: 72, 68, 75, 70, 65 marks.

## DIAGNOSTIC_ANSWER_7
Imagine

## DIAGNOSTIC_QUESTION_8
Fill in the blank: The teacher decides to give ______ bonus marks to everyone for attempting a challenging bonus question.

## DIAGNOSTIC_ANSWER_8
5

## DIAGNOSTIC_QUESTION_9
What common mix-up does this lesson flag about When a constant value \(k\)?

## DIAGNOSTIC_ANSWER_9
For example, with original mean 20, n=5, adding 3 to each: they compute new mean = 20 + 3×5 = 35 instead of 20 + 3 = 23.

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
The student can compute the new mean after adding a constant to all values without recalculating the entire sum, and can explain why the mean shifts by exactly that constant using the balancing point or algebraic reasoning.
