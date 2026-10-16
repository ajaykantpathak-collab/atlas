## ELI5
Change every price in a shop from rupees to paise — multiply each by a hundred — and the average price multiplies by a hundred too. Whatever you do to every member of the data, the mean does as well: scaling all values by a constant scales their sum by the same constant, while the count of values sits still, so the quotient scales along. Doubling every wage doubles the average wage; halving every length halves the average length.

## DEFINITION
When every value in a data set is multiplied by a constant \( k \), the new mean becomes \( k \) times the original mean. This occurs because the sum of all values scales by \( k \) while the number of observations remains unchanged, so the quotient (sum divided by count) also scales by \( k \).
## COGNITIVE_LEVEL
understand
## MASTERY_CRITERIA
The student can compute the new mean after multiplying all data values by a constant without recalculating the entire sum, and can explain why the mean scales by that constant using the relationship between sum, count, and mean.
## SCOPE_BOUNDARY
Covers multiplication by any real constant (positive, negative, fraction, decimal) and its effect on the mean. Does not cover combined transformations (e.g., multiply then add) or effects on median, mode, or range; those are addressed in subsequent nodes.
## WALKTHROUGH
Imagine a vegetable vendor records daily earnings in rupees for a week: ₹200, ₹250, ₹300, ₹350, ₹400, ₹450, ₹500. The mean is ₹350. Now suppose the vendor wants to convert these earnings to US dollars using an exchange rate of 1 USD = 80 INR (i.e., multiply each value by \( \frac{1}{80} \)). Instead of converting each day's earning and then finding the new mean, we can simply multiply the original mean ₹350 by \( \frac{1}{80} \) to get the mean in dollars. This works because multiplying every data point by a constant multiplies the total sum by that constant, and dividing by the same count gives a mean that is also multiplied by the constant. This is the multiplicative counterpart to the additive constant effect you learned in the previous node.

Takeaway: multiplying every observation by a constant k multiplies the mean by k — new mean = k times old mean — because the sum scales by k while the count is unchanged, and the mean is sum divided by count. Exam format: expect 'each value is doubled (or halved), find the new mean' — state the scaling of the sum before the quotient. Verification beat: pair this with the additive rule from the previous node and check which operation the question actually uses. Why students miss it: they add the constant instead of multiplying — scaling stretches distances, while shifting slides the centre; the two effects part ways the moment you test one.

## DIAGNOSTIC_QUESTION_1
State the rule for how the mean changes when every value in a data set is multiplied by a constant \( k \).
## DIAGNOSTIC_ANSWER_1
The new mean equals \( k \) times the original mean. A wrong answer (e.g., "the mean increases by \( k \)" or "the mean stays the same") reveals that the student is confusing multiplication with addition or does not grasp that the sum scales proportionally while the count stays fixed.
## DIAGNOSTIC_QUESTION_2
Explain why multiplying every data value by 3 results in the mean also becoming 3 times the original mean. Use the formula for mean in your explanation.
## DIAGNOSTIC_ANSWER_2
The mean is \( \frac{\sum x_i}{n} \). If each \( x_i \) becomes \( 3x_i \), the new sum is \( \sum 3x_i = 3\sum x_i \). The new mean is \( \frac{3\sum x_i}{n} = 3 \times \frac{\sum x_i}{n} = 3 \times \text{original mean} \). A wrong answer that only gives an example without using the sum formula shows the student cannot generalise the reasoning and relies on memorised patterns.
## DIAGNOSTIC_QUESTION_3
The mean of 6 numbers is 12. If each number is multiplied by 0.5, what is the new mean? Show your steps.
## DIAGNOSTIC_ANSWER_3
Original mean = 12. Constant \( k = 0.5 \). New mean = \( 12 \times 0.5 = 6 \). Steps: 1) Identify original mean = 12. 2) Identify multiplier = 0.5. 3) Apply rule: new mean = original mean × multiplier. 4) Compute: 12 × 0.5 = 6. A wrong answer like 12.5 or 11.5 indicates the student added the constant instead of multiplying, or misapplied decimal multiplication.
## DIAGNOSTIC_QUESTION_4
A data set has mean 20. After multiplying each value by a constant \( k \), the new mean becomes -60. What is the value of \( k \)? What does the negative sign tell you about the transformation?
## DIAGNOSTIC_ANSWER_4
\( k = \frac{-60}{20} = -3 \). The negative sign means the constant is negative, so the direction of the data values is reversed (positive become negative and vice versa) while the magnitude is tripled. A wrong answer like \( k = 3 \) ignores the sign change, showing the student does not connect the sign of the mean to the sign of the multiplier.
## DIAGNOSTIC_QUESTION_5
A student claims: "If I multiply all values by 2, the mean doubles. If I multiply all values by \( \frac{1}{2} \), the mean halves. So multiplying by any constant just multiplies the mean by that constant." Is this statement always correct? Justify your answer with reasoning about the definition of mean.
## DIAGNOSTIC_ANSWER_5
Yes, the statement is always correct. The mean is defined as sum divided by count. Multiplying each value by \( k \) multiplies the sum by \( k \) (distributive property), and the count \( n \) is unchanged, so the new mean is \( k \times \text{original mean} \). This holds for any real \( k \) (positive, negative, fraction, decimal, zero). A wrong answer that says "not for zero" or "not for negatives" reveals a misunderstanding that the algebraic derivation holds universally.
## DIAGNOSTIC_QUESTION_6
Create a real-world problem (Indian context) where multiplying every data value by a constant is needed to find a new mean. Provide the original data, the constant, and the question. Then solve it using the scaling rule.
## DIAGNOSTIC_ANSWER_6
Example: A school records the heights of 5 students in cm: 140, 145, 150, 155, 160. The mean height is 150 cm. The school wants to report the mean height in metres (1 m = 100 cm). Constant \( k = \frac{1}{100} \). New mean = \( 150 \times \frac{1}{100} = 1.5 \) m. A poor answer would use a constant that doesn't represent a real conversion or would recalculate the entire sum instead of using the scaling rule, showing they haven't internalised the efficiency of the rule.
## COMMON_MISCONCEPTION
Students often treat multiplication by a constant as if it were addition: they add the constant to the mean instead of multiplying. For example, given mean 10 and constant 3, they answer 13 instead of 30. Another error is forgetting that the number of observations \( n \) does not change, so they mistakenly divide by a different count. A third error occurs with fractions/decimals: they multiply the mean by the denominator instead of the fraction (e.g., multiply by \( \frac{1}{2} \) but do \( 10 \times 2 = 20 \) instead of \( 10 \times 0.5 = 5 \)).
## ON_FAILURE
If a student adds the constant, remind them: "Adding a constant shifts the mean; multiplying a constant scales the mean. Let's check with a tiny data set: values 2, 4, 6. Mean = 4. Multiply each by 3 → 6, 12, 18. New mean = 12. Did we add 3? No, we multiplied by 3." Then have them write the algebraic proof: \( \frac{\sum k x_i}{n} = k \frac{\sum x_i}{n} \). For fraction errors, practice converting fractions to decimals (e.g., \( \frac{1}{2} = 0.5 \)) and multiplying step by step: \( 10 \times \frac{1}{2} = \frac{10}{2} = 5 \).
## PREREQUISITE_NODE_IDS
c8_math_ch12_5, c8_math_ch12_1, c8_math_ch12_2, c7_math_ch13_004, c6_math_ch09_100, c7_math_ch12_002, c7_math_ch08_002, c7_math_ch10_004
## PREREQUISITE_REASONS
c8_math_ch12_5: Understanding additive constant effect provides the contrasting framework for multiplicative effect.
c8_math_ch12_1: Mean as balancing point helps visualise why scaling all values scales the balance point.
c8_math_ch12_2: Dot plots allow visual verification that all dots stretch from the centre by factor k.
c7_math_ch13_004: Mean calculation in Class 7 is the foundational skill for computing original mean.
c6_math_ch09_100: Earlier introduction to mean ensures the concept of average is familiar.
c7_math_ch12_002: Decimal multiplication skill needed for constants like 0.5, 1.25.
c7_math_ch08_002: Fraction multiplication skill needed for constants like 1/2, 3/4.
c7_math_ch10_004: Integer sign rules needed when constant is negative.
## FORWARD_NODE_IDS
c8_math_ch12_7, c8_math_ch12_8, c8_math_ch12_10, c8_math_ch12_11
## FORWARD_REASONS
c8_math_ch12_7: Median is next measure of central tendency; understanding mean transformations helps compare with median later.
c8_math_ch12_8: Comparing mean and median requires knowing how each behaves under scaling.
c8_math_ch12_10: Choosing best measure involves knowing how mean changes with units (multiplication).
c8_math_ch12_11: Range also scales by the constant; this node sets up that parallel.
## CROSS_SUBJECT_PREREQS
c7_math_ch13_004, c7_math_ch12_002, c7_math_ch08_002, c7_math_ch10_004
## CROSS_SUBJECT_REASONS
c7_math_ch13_004: Mean calculation is the statistical foundation used in science (e.g., average speed) and economics (e.g., average income).
c7_math_ch12_002: Decimal multiplication is used in physics for unit conversions (e.g., cm to m) and in commerce for currency exchange.
c7_math_ch08_002: Fraction multiplication appears in chemistry (concentration scaling) and cooking (recipe scaling).
c7_math_ch10_004: Negative integer multiplication connects to physics (direction reversal) and finance (debt scaling).
## CHAIN_DESCRIPTION
c7_math_ch13_004 -> c8_math_ch12_5 -> c8_math_ch12_6 -> c8_math_ch12_7
## THIS_FORMULA
If original mean = \( \bar{x} \), and each value is multiplied by constant \( k \), then new mean = \( k \bar{x} \).
## FORMULA_VARIABLES
\( \bar{x} \) = original mean of the data set, \( k \) = constant multiplier (any real number)
## FORMULA_UNITS
If original data has units U and \( k \) is dimensionless, new mean has units U. If \( k \) has units (e.g., conversion factor), new mean has units U × units of k.
## COMPUTATION_TYPE
algebraic
## CROSS_SUBJECT
c8_physics_ch2_3 | In physics, converting units (e.g., km/h to m/s) multiplies every speed value by a constant; the mean speed scales accordingly.
c8_eco_ch1_2 | In economics, converting currency (e.g., INR to USD) multiplies every monetary value by the exchange rate; the mean income in new currency is the original mean times the rate.
## PREREQ_CONCEPT
Mean as sum of values divided by number of values, and the distributive property of multiplication over addition.
## PREREQ_BEFORE
Student must be able to calculate the mean of a data set and multiply numbers (integers, decimals, fractions, negatives) fluently.
## PREREQ_STUCK
Review mean calculation from c7_math_ch13_004 and multiplication of decimals/fractions from c7_math_ch12_002 and c7_math_ch08_002.
## WORKED_EXAMPLE_1
PROBLEM: A farmer records the milk production (in litres) of his 5 cows for a day: 8, 10, 12, 14, 16. The mean production is 12 litres. He wants to convert the production to millilitres (1 litre = 1000 mL). What is the new mean production in millilitres? Use the scaling rule.
STEPS:
- Step 1: Identify the original mean. The problem states the mean production is 12 litres.
- Step 2: Identify the constant multiplier. To convert litres to millilitres, multiply by 1000. So \( k = 1000 \).
- Step 3: Apply the rule: new mean = original mean × constant multiplier.
- Step 4: Compute: new mean = 12 × 1000 = 12000.
- Step 5: State the answer with units. The new mean production is 12000 millilitres.
REASONING: Multiplying each cow's production by 1000 multiplies the total sum by 1000. Since the number of cows (5) stays the same, the mean also gets multiplied by 1000. This avoids converting each value individually and then recalculating the mean.
ANSWER: 12000 mL
## WORKED_EXAMPLE_2
PROBLEM: The mean score of 8 students in a test (out of 50) is 35. The teacher decides to scale the scores to be out of 100 by multiplying each score by 2. What is the new mean score out of 100?
STEPS:
- Step 1: Write down the original mean: 35 (out of 50).
- Step 2: Determine the constant multiplier. Scaling from 50 to 100 means multiplying by 2. So \( k = 2 \).
- Step 3: Use the formula: new mean = \( k \times \text{original mean} \).
- Step 4: Calculate: new mean = 2 × 35 = 70.
- Step 5: Interpret: The new mean score out of 100 is 70.
REASONING: The scaling factor is exactly the ratio of the new maximum to the old maximum (100/50 = 2). Every student's score doubles, so the total sum doubles, and the mean doubles. The number of students (8) does not change.
ANSWER: 70 (out of 100)
## WORKED_EXAMPLE_3
PROBLEM: A shopkeeper has daily sales (in ₹) for 6 days: 5000, 6000, 7000, 8000, 9000, 10000. The mean daily sales is ₹7500. Due to inflation, he increases all prices by 20%, which effectively multiplies each day's sales by 1.2. What is the new mean daily sales? If he instead gave a 10% discount (multiply by 0.9), what would the mean be?
STEPS:
- Step 1: Note the original mean = ₹7500.
- Step 2: For 20% increase, the multiplier is \( 1 + 0.20 = 1.2 \). Compute new mean = 7500 × 1.2.
- Step 3: 7500 × 1.2 = 7500 × (12/10) = (7500 × 12) / 10 = 90000 / 10 = 9000.
- Step 4: For 10% discount, the multiplier is \( 1 - 0.10 = 0.9 \). Compute new mean = 7500 × 0.9.
- Step 5: 7500 × 0.9 = 7500 × (9/10) = (7500 × 9) / 10 = 67500 / 10 = 6750.
- Step 6: State both answers with units: After 20% increase, mean = ₹9000. After 10% discount, mean = ₹6750.
REASONING: Percentage changes are multiplicative constants. A 20% increase means multiplying by 1.2; a 10% decrease means multiplying by 0.9. The mean scales by the same factor because the sum scales by that factor while the number of days (6) remains constant. This shows the rule works for any real constant, including decimals representing percentages.
ANSWER: 20% increase → ₹9000; 10% discount → ₹6750
## COMPETENCY_QUESTION_1
QUESTION: The mean weight of 10 parcels is 2.5 kg. The courier company charges ₹20 per kg. Instead of weighing each parcel individually, the manager multiplies the mean weight by the rate to find the average charge per parcel. Is this method correct? Explain why or why not, using the concept of multiplying by a constant.
COMPETENCY: Translating real-world situations to mathematical expressions
STEPS:
- Step 1: Understand the problem: We have mean weight, and we want mean charge. Charge = weight × rate.
- Step 2: Identify the constant: The rate ₹20/kg is the constant multiplier applied to each parcel's weight to get its charge.
- Step 3: Apply the rule: If each weight is multiplied by 20, the mean charge = 20 × mean weight.
- Step 4: Compute: 20 × 2.5 = ₹50. Verify: This matches calculating each parcel's charge and then averaging.
- Step 5: Conclude: Yes, the method is correct because charging per kg multiplies every weight by the same constant (20), so the mean charge is the constant times the mean weight.
ANSWER: Yes, the method is correct. The charge for each parcel is its weight multiplied by the constant rate ₹20/kg. Multiplying every data value (weight) by the same constant (20) multiplies the mean by that constant. So mean charge = 20 × 2.5 kg = ₹50.
DIFFICULTY: easy
## COMPETENCY_QUESTION_2
QUESTION: A data set of 7 numbers has a mean of -4. The data set is transformed by multiplying each number by -3. 
(a) What is the new mean? 
(b) The original data set had both positive and negative numbers. After multiplying by -3, what happens to the order of the numbers on the number line? 
(c) Does the mean remain the balancing point of the data set after this transformation? Justify.
COMPETENCY: Comparing and justifying
STEPS:
- Step 1: (a) Apply the rule: new mean = original mean × constant = -4 × (-3) = 12.
- Step 2: (b) Multiplying by a negative number reflects the numbers across zero and scales them by 3. The order on the number line reverses: the smallest becomes the largest, and vice versa.
- Step 3: (c) Yes, the mean remains the balancing point. The balancing point property is preserved under any linear transformation (multiply by constant). The sum of signed distances from the new mean to the new data points is still zero because each distance is multiplied by -3, and the sum of zero remains zero.
- Step 4: Provide a brief justification: If original sum of deviations from mean is 0, new deviations are -3 times old deviations, so their sum is -3 × 0 = 0.
ANSWER: (a) New mean = 12. (b) The order of numbers on the number line reverses (reflection across zero) and distances from zero triple. (c) Yes, the mean remains the balancing point because multiplying all deviations by a constant preserves the sum of deviations being zero.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine a vegetable vendor records daily ______ in rupees for a week: ₹200, ₹250, ₹300, ₹350, ₹400, ₹450, ₹500.

## DIAGNOSTIC_ANSWER_7
earnings

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
The student can compute the new mean after multiplying all data values by a constant without recalculating the entire sum, and can explain why the mean scales by that constant using the relationship between sum, count, and mean.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Imagine a ______ vendor records daily earnings in rupees for a week: ₹200, ₹250, ₹300, ₹350, ₹400, ₹450, ₹500.

## DIAGNOSTIC_ANSWER_9
vegetable
