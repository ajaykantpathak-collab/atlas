## ELI5
Every digit in a number wears a badge saying what it is worth, and the badge is its seat: sitting in the ones seat a digit is itself, one seat left it is worth ten times more, one seat right, ten times less. The seats keep going forever in both directions — past the units seat to the right, the seats hold tenths, hundredths, pieces smaller than one, written with negative powers of ten. A number is just its digits, each multiplied by the worth of its seat, all added up.

## DEFINITION
The place value system in base 10 assigns each digit a value equal to the digit multiplied by a power of 10, where the exponent corresponds to the digit's position from the right (starting at 0 for the units place). For a number with digits \(d_n d_{n-1} \dots d_1 d_0 . d_{-1} d_{-2} \dots\), its value is \(\sum_{k} d_k \times 10^k\).
## COGNITIVE_LEVEL
understand
## MASTERY_CRITERIA
The student can express any whole number or decimal in expanded form using powers of 10 (including negative exponents for decimal places), convert between standard notation and power-of-10 expanded form, and explain why shifting the decimal point corresponds to multiplying or dividing by powers of 10.
## SCOPE_BOUNDARY
Covers representation of numbers in base-10 using positive, zero, and negative integer exponents (e.g., \(10^3, 10^0, 10^{-2}\)). Does NOT cover scientific notation with a single non-zero digit before the decimal point (that is introduced later), nor does it cover bases other than 10.
## WALKTHROUGH
Imagine you have ₹4,325.50 in your bank account. You know the digits 4,3,2,5,5,0 but what does each actually *mean* in terms of tens, hundreds, and paise? Let's start by writing the number in a place value table with columns labeled as powers of 10: \(10^3, 10^2, 10^1, 10^0, 10^{-1}, 10^{-2}\). Connect this to Class 7 learning where you saw decimals as tenths and hundredths (c7_math_ch03_002, c7_math_ch03_003). Now, instead of writing "tenths column", we write \(10^{-1}\). The key insight: moving one place left multiplies the place value by 10 (exponent increases by 1); moving right divides by 10 (exponent decreases by 1). This pattern holds forever in both directions.

Takeaway: value = sum of digit × 10^position, positions counting from zero at the units place and going negative past the decimal point; expanded form is that sum written out. Exam format: expect 'write in expanded form using powers of ten' and 'explain what shifting the decimal does' — name the exponent change explicitly. Verification beat: reassemble the expanded form; it must rebuild the original number digit for digit. Why students miss it: they keep exponents positive after the decimal point — each step right of the point drops the exponent by one, into the negatives.

## DIAGNOSTIC_QUESTION_1
Write the number 7,204 in expanded form using powers of 10. (Example format: \(3 \times 10^2 + 0 \times 10^1 + 5 \times 10^0\))
## DIAGNOSTIC_ANSWER_1
\(7 \times 10^3 + 2 \times 10^2 + 0 \times 10^1 + 4 \times 10^0\). A wrong answer like \(7 \times 10^3 + 2 \times 10^1 + 4 \times 10^0\) reveals the student ignores the zero placeholder and does not understand that the exponent corresponds to the *position*, not the count of non-zero digits. Another error: writing \(7 \times 1000 + 2 \times 100 + 4\) shows they recall expanded notation but not the power-of-10 representation.
## DIAGNOSTIC_QUESTION_2
Explain why the digit 5 in the number 0.05 has the value \(5 \times 10^{-2}\) and not \(5 \times 10^{-1}\) or \(5 \times 10^{-3}\).
## DIAGNOSTIC_ANSWER_2
The first digit after the decimal point is the tenths place (\(10^{-1}\)), the second is the hundredths place (\(10^{-2}\)). In 0.05, the 5 is in the *second* position after the decimal, so its place value is hundredths = \(10^{-2}\). A wrong answer that says "because there are two zeros" or "because it's 5 hundredths" without linking to the exponent shows the student memorizes the fraction name but does not connect it to the systematic power-of-10 pattern. They may think the exponent counts zeros rather than position.
## DIAGNOSTIC_QUESTION_3
Convert the following power-of-10 expanded form into standard decimal notation: \(3 \times 10^4 + 6 \times 10^2 + 8 \times 10^0 + 2 \times 10^{-1} + 5 \times 10^{-3}\).
## DIAGNOSTIC_ANSWER_3
Step 1: Evaluate each term: \(3 \times 10000 = 30000\), \(6 \times 100 = 600\), \(8 \times 1 = 8\), \(2 \times 0.1 = 0.2\), \(5 \times 0.001 = 0.005\). Step 2: Add them aligning place values: 30000 + 600 = 30600; +8 = 30608; +0.2 = 30608.2; +0.005 = 30608.205. Answer: 30,608.205. A common error: writing 30608.25 (misplacing the 5 in hundredths instead of thousandths) shows the student does not track the exponent's effect on decimal placement. Another error: 3608.205 (forgetting the zero placeholder for \(10^3\) and \(10^1\)) reveals they skip missing powers.
## DIAGNOSTIC_QUESTION_4
Compare the two numbers: \(A = 4 \times 10^3 + 2 \times 10^1 + 7 \times 10^{-2}\) and \(B = 4 \times 10^3 + 2 \times 10^2 + 7 \times 10^{-1}\). Without fully converting to standard form, determine which is larger and explain how the powers of 10 tell you this.
## DIAGNOSTIC_ANSWER_4
Both have \(4 \times 10^3\) (thousands). Compare the next highest power present: A has \(2 \times 10^1\) (tens), B has \(2 \times 10^2\) (hundreds). Since \(10^2 > 10^1\), B's hundreds contribution (200) is larger than A's tens contribution (20). The decimal parts (\(10^{-2}\) vs \(10^{-1}\)) are too small to overcome this difference. Therefore B > A. A wrong answer that converts both fully and then compares shows the student cannot yet reason *relationally* using the exponents; they rely on computation instead of structure.
## DIAGNOSTIC_QUESTION_5
A student writes the expanded form of 50,007 as \(5 \times 10^4 + 7 \times 10^0\). They argue the zeros in the middle "don't count" so they skip them. Evaluate this reasoning: is the final expression mathematically correct? Is the *reasoning* correct? Explain.
## DIAGNOSTIC_ANSWER_5
The final expression \(5 \times 10^4 + 7 \times 10^0\) is mathematically correct because the missing terms (\(0 \times 10^3, 0 \times 10^2, 0 \times 10^1\)) add zero. However, the *reasoning* "zeros don't count so we skip them" is dangerous. It works for *writing* the expanded form but fails when *reading* a number from expanded form: if given \(5 \times 10^4 + 7 \times 10^0\), a student with this reasoning might write 57 instead of 50,007 because they don't know to insert zeros for missing powers. The correct reasoning: "Every position from the highest power down to units must be accounted for; zero digits contribute zero but hold the place."
## DIAGNOSTIC_QUESTION_6
Create a real-world problem (using rupees, metres, or litres) where the answer is a number that *requires* a zero placeholder in at least two different place values (e.g., thousands and tens) when written in standard form. Then write that answer in power-of-10 expanded form.
## DIAGNOSTIC_ANSWER_6
Example problem: "A school library has 3,005 books. They buy 2,090 more. How many books total?" Answer: 5,095. Expanded form: \(5 \times 10^3 + 0 \times 10^2 + 9 \times 10^1 + 5 \times 10^0\). A good answer shows the student understands that zero placeholders appear in the *middle* of a number (hundreds and tens here) and must be represented as \(0 \times 10^k\) in a complete expanded form. A poor answer gives a number like 5,000 (only trailing zeros) or writes expanded form without the zero terms, indicating they don't grasp that placeholders are needed for *internal* zeros.
## COMMON_MISCONCEPTION
Students treat the exponent as the *number of zeros* in the place value name (e.g., "thousands has three zeros so it's \(10^3\)") rather than the *position index*. This leads to errors with decimals: they think \(10^{-1}\) is "one zero after decimal" and write 0.0 for tenths, or they cannot explain why \(10^{-2}\) is hundredths. Another manifestation: when converting \(3 \times 10^4 + 5 \times 10^1\) to standard form, they write 30005 (putting 5 in the units place) because they see "10^1 has one zero → ten → one zero after 3" and lose track of position.
## ON_FAILURE
If a student exhibits the "exponent counts zeros" misconception:
1. Draw a place value chart with columns labeled \(10^4, 10^3, 10^2, 10^1, 10^0, 10^{-1}, 10^{-2}\) and also write the place value names (Ten-thousands, Thousands, Hundreds, Tens, Ones, Tenths, Hundredths).
2. Have them place a digit (e.g., 7) in each column one at a time and write the value as \(7 \times 10^k\). Ask: "What is k in this column?" Emphasize that k is the *column number* from the ones column (0), increasing left, decreasing right.
3. Give a number with internal zeros like 40,205. Have them write it in the chart, then write the expanded form *including* the zero terms: \(4 \times 10^4 + 0 \times 10^3 + 2 \times 10^2 + 0 \times 10^1 + 5 \times 10^0\).
4. Finally, ask: "If I give you \(4 \times 10^4 + 2 \times 10^2 + 5 \times 10^0\), how do you know where to put the zeros?" Guide them to: "The missing exponents (3 and 1) tell me which places have zero."
## PREREQUISITE_NODE_IDS
c7_math_ch03_004, c7_math_ch03_011, c7_math_ch01_002, c6_math_ch01_003
## PREREQUISITE_REASONS
c7_math_ch03_004: Established decimal place value (tenths, hundredths, thousandths) which is extended here to negative powers of 10.
c7_math_ch03_011: Explicitly covered decimal system and place value relationships, the direct conceptual predecessor.
c7_math_ch01_002: Extended place value system to 6-7 digit whole numbers, reinforcing positive powers of 10.
c6_math_ch01_003: Introduced place value and face value distinction, the foundational concept for digit-position-value.
## FORWARD_NODE_IDS
c8_math_ch3_6, c8_math_ch3_7, c8_math_ch3_10, c8_math_ch3_11, c8_math_ch3_8, c8_math_ch3_9
## FORWARD_REASONS
c8_math_ch3_6: Understanding power-of-10 notation is essential to appreciate how Hindu numerals (with zero) enabled efficient calculation and transmission to the Arab world.
c8_math_ch3_7: Aryabhata's contributions and the Bakhshali manuscript used place value with powers of 10; this node provides the mathematical language to understand those historical developments.
c8_math_ch3_10: Place value system with powers of 10 is the direct analogue; students must understand positional notation before changing the base.
c8_math_ch3_11: Explains the place value system that necessitated a symbol for zero, driving the evolution of the '0' shape from dot to circle.
c8_math_ch3_8: Place value system (powers of 10) provides the contrast needed to understand Roman numerals' lack of place value.
c8_math_ch3_9: The "Power of 10 Notation" node explicitly establishes the base-10 pattern that both Indian and Egyptian systems share.

## CROSS_SUBJECT_PREREQS
c6_math_ch04_043, c7_math_ch03_005
## CROSS_SUBJECT_REASONS
c6_math_ch04_043: Place value in decimals (Class 6) is the direct arithmetic foundation for using powers of 10 in measurement (science) and money (economics).
c7_math_ch03_005: Units of measurement and decimal notation (Class 7) connects metric conversions (mm, cm, m, km) to shifting powers of 10, a key cross-curricular application.
## CHAIN_DESCRIPTION
c7_math_ch03_004 -> c8_math_ch3_5 -> c8_math_ch3_6
## THIS_FORMULA
For a number with digits \(d_n d_{n-1} \dots d_1 d_0 . d_{-1} d_{-2} \dots d_{-m}\), its value is \(\sum_{k=-m}^{n} d_k \times 10^k\).
## FORMULA_VARIABLES
\(d_k\) = digit (0-9) at position k; \(k\) = integer exponent (positive for places left of decimal, zero for units, negative for places right of decimal); \(n\) = highest power (leftmost digit position); \(m\) = number of decimal places.
## FORMULA_UNITS
dimensionless (pure number representation)
## COMPUTATION_TYPE
algebraic
## CROSS_SUBJECT
c8_physics_ch1_1 | In physics, metric prefixes (kilo, centi, milli) correspond to powers of 10; converting units requires multiplying/dividing by \(10^3, 10^{-2}, 10^{-3}\) — directly applying this node's concept.
c8_eco_ch2_3 | In economics, large numbers like GDP (crores) and small percentages (basis points = \(10^{-4}\)) use power-of-10 notation for readability and calculation.
## PREREQ_CONCEPT
Understanding that each place value is exactly 10 times the place to its right (and 1/10 of the place to its left), extended to decimals.
## PREREQ_BEFORE
The student must be able to write a 6-digit whole number and a decimal up to thousandths in a place value table and name each column (lakh, ten-thousands, thousands, hundreds, tens, ones, tenths, hundredths, thousandths).
## PREREQ_STUCK
Revisit c7_math_ch03_004 (Decimal Place Value: Tenths, Hundredths, Thousandths) and c7_math_ch03_011 (Decimal System and Place Value Relationships) to reinforce the 10-to-1 relationship between adjacent places.
## WORKED_EXAMPLE_1
PROBLEM: The distance from Delhi to Mumbai is approximately 1,414 km. Write this distance in metres using power-of-10 expanded form. (1 km = 1000 m)
STEPS:
- Step 1: Convert km to metres: 1,414 km = 1,414 × 1000 m = 1,414,000 m.
- Step 2: Write 1,414,000 in a place value table up to \(10^6\): digits are 1 (millions/\(10^6\)), 4 (hundred-thousands/\(10^5\)), 1 (ten-thousands/\(10^4\)), 4 (thousands/\(10^3\)), 0 (hundreds/\(10^2\)), 0 (tens/\(10^1\)), 0 (ones/\(10^0\)).
- Step 3: Express each non-zero digit as digit × power of 10: \(1 \times 10^6 + 4 \times 10^5 + 1 \times 10^4 + 4 \times 10^3\).
- Step 4: Include zero placeholders for completeness (optional but good practice): \(+ 0 \times 10^2 + 0 \times 10^1 + 0 \times 10^0\).
- Step 5: Verify by evaluating: 1,000,000 + 400,000 + 10,000 + 4,000 = 1,414,000. Correct.
REASONING: Converting km to m multiplies by \(10^3\), which shifts digits three places left (adds three zeros). The power-of-10 expanded form makes each digit's contribution explicit and shows the internal structure of the number. The zero terms remind us that the hundreds, tens, and ones places are empty.
ANSWER: \(1 \times 10^6 + 4 \times 10^5 + 1 \times 10^4 + 4 \times 10^3\) (or with zero terms: \(+ 0 \times 10^2 + 0 \times 10^1 + 0 \times 10^0\))
## WORKED_EXAMPLE_2
PROBLEM: A scientist measures the thickness of a human hair as 0.000072 m. Write this measurement in power-of-10 expanded form using negative exponents.
STEPS:
- Step 1: Identify the non-zero digits and their positions after the decimal: 7 is in the 5th decimal place, 2 is in the 6th decimal place.
- Step 2: Recall that the first decimal place is \(10^{-1}\) (tenths), second is \(10^{-2}\) (hundredths), ..., fifth is \(10^{-5}\), sixth is \(10^{-6}\).
- Step 3: Write each digit with its power of 10: \(7 \times 10^{-5} + 2 \times 10^{-6}\).
- Step 4: Check by evaluating: \(7 \times 0.00001 = 0.00007\); \(2 \times 0.000001 = 0.000002\); sum = 0.000072. Correct.
- Step 5: Note that zeros in the first four decimal places are not written as terms because they contribute zero, but they are implied by the exponents -5 and -6 skipping -1 to -4.
REASONING: For small decimals, negative exponents efficiently capture the place value without writing many zeros. The exponent directly tells how many places after the decimal the digit sits (exponent -k means k-th place). This is the same pattern as whole numbers, just extending leftward from the decimal point.
ANSWER: \(7 \times 10^{-5} + 2 \times 10^{-6}\)
## WORKED_EXAMPLE_3
PROBLEM: The population of a city is 12,34,567 (12 lakh 34 thousand 567). The population of a nearby town is 8,76,543 (8 lakh 76 thousand 543). Find the total population and express it in power-of-10 expanded form.
STEPS:
- Step 1: Write both numbers in standard form with aligned place values (up to \(10^6\)):
  City:   1,234,567 → digits: 1(\(10^6\)), 2(\(10^5\)), 3(\(10^4\)), 4(\(10^3\)), 5(\(10^2\)), 6(\(10^1\)), 7(\(10^0\))
  Town:     876,543 → digits: 0(\(10^6\)), 8(\(10^5\)), 7(\(10^4\)), 6(\(10^3\)), 5(\(10^2\)), 4(\(10^1\)), 3(\(10^0\))
- Step 2: Add column by column (or add numbers: 1,234,567 + 876,543 = 2,111,110).
- Step 3: Write the sum 2,111,110 in place value table: 2(\(10^6\)), 1(\(10^5\)), 1(\(10^4\)), 1(\(10^3\)), 1(\(10^2\)), 1(\(10^1\)), 0(\(10^0\)).
- Step 4: Express in power-of-10 expanded form: \(2 \times 10^6 + 1 \times 10^5 + 1 \times 10^4 + 1 \times 10^3 + 1 \times 10^2 + 1 \times 10^1 + 0 \times 10^0\).
- Step 5: Simplify (optional): \(2 \times 10^6 + 1 \times 10^5 + 1 \times 10^4 + 1 \times 10^3 + 1 \times 10^2 + 1 \times 10^1\).
- Step 6: Verify: 2,000,000 + 100,000 + 10,000 + 1,000 + 100 + 10 = 2,111,110. Correct.
REASONING: This combines addition of large numbers (Class 6/7 skill) with the new power-of-10 representation. Aligning by powers of 10 (not just by rightmost digit) ensures correct addition. The expanded form of the sum reveals a pattern: all digits from \(10^6\) down to \(10^1\) are 1 except the leading 2.
ANSWER: \(2 \times 10^6 + 1 \times 10^5 + 1 \times 10^4 + 1 \times 10^3 + 1 \times 10^2 + 1 \times 10^1\) (or include \(+ 0 \times 10^0\))
## COMPETENCY_QUESTION_1
QUESTION: A student claims that in the number 0.0056, the digit 5 represents \(5 \times 10^{-3}\) because "there are three zeros before the 5". Another student says it's \(5 \times 10^{-3}\) because "5 is in the thousandths place". A third student says it's \(5 \times 10^{-2}\) because "you count the decimal point as position 0, then 5 is at position -2". Evaluate each student's reasoning. Who is correct? Why are the others wrong?
COMPETENCY: Error identification and correction; reasoning about place value structure.
STEPS:
- Step 1: Identify the position of digit 5 in 0.0056. The decimal places: 1st=0 (tenths), 2nd=0 (hundredths), 3rd=5 (thousandths), 4th=6 (ten-thousandths). So 5 is in the 3rd decimal place.
- Step 2: Recall that the k-th decimal place corresponds to \(10^{-k}\). So 3rd decimal place → \(10^{-3}\). Value = \(5 \times 10^{-3}\).
- Step 3: Evaluate Student 1: "three zeros before the 5" – there are actually two zeros before the 5 (0.00 5 6). The reasoning is flawed because it counts zeros, not position. If the number were 0.00056, there would be three zeros but 5 would be in 4th place (\(10^{-4}\)). So Student 1 gets the right answer for the wrong reason.
- Step 4: Evaluate Student 2: "thousandths place" – correct. Thousandths = \(10^{-3}\). This reasoning uses the place value name, which is linked to the power of 10. Correct reasoning.
- Step 5: Evaluate Student 3: "count decimal point as position 0" – this is a common misconception. The units place (ones) is position 0 (\(10^0\)). The first decimal place is -1. So 5 is at position -3, not -2. Student 3 is wrong.
ANSWER: Student 2 is correct with valid reasoning. Student 1 gets the correct exponent but uses a faulty "count zeros" rule that fails for other numbers. Student 3 misidentifies the reference point (decimal point vs units place).
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: In a science experiment, you measure the mass of a chemical sample as 0.0045 kg. Your lab partner records it as \(45 \times 10^{-4}\) kg. You write it as \(4.5 \times 10^{-3}\) kg. A third student writes \(450 \times 10^{-5}\) kg. Are all these representations mathematically equal? If yes, why might one be preferred in scientific contexts? If no, which are incorrect?
COMPETENCY: Comparing and justifying equivalent representations; understanding normalized scientific notation (preview).
STEPS:
- Step 1: Convert each to standard decimal to check equality.
  - 0.0045 kg (given)
  - \(45 \times 10^{-4} = 45 \times 0.0001 = 0.0045\) kg
  - \(4.5 \times 10^{-3} = 4.5 \times 0.001 = 0.0045\) kg
  - \(450 \times 10^{-5} = 450 \times 0.00001 = 0.0045\) kg
- Step 2: All four are mathematically equal because multiplying the coefficient by 10 and decreasing the exponent by 1 (or vice versa) preserves the product: \(a \times 10^k = (10a) \times 10^{k-1}\).
- Step 3: In scientific contexts, the preferred form is *normalized scientific notation*: one non-zero digit before the decimal point, i.e., \(4.5 \times 10^{-3}\). This allows easy comparison of magnitude (exponent) and precision (significant figures in coefficient).
- Step 4: The form \(45 \times 10^{-4}\) has two digits before the decimal; \(450 \times 10^{-5}\) has three. These are valid power-of-10 expressions but not normalized.
- Step 5: The form 0.0045 is standard decimal notation, not power-of-10 expanded form. It hides the magnitude.
ANSWER: Yes, all are mathematically equal. \(4.5 \times 10^{-3}\) is preferred in science because it follows the convention of normalized scientific notation (coefficient between 1 and 10), making magnitude and precision immediately clear.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The place value system in base 10 assigns each digit a value equal to the digit multiplied by a power of 10, where the exponent ______ to the digit's position from the right (starting at 0 for the units place).

## DIAGNOSTIC_ANSWER_7
corresponds

## DIAGNOSTIC_QUESTION_8
Fill in the blank: You know the digits 4,3,2,5,5,0 but what does each ______ *mean* in terms of tens, hundreds, and paise?

## DIAGNOSTIC_ANSWER_8
actually

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can express any whole number or decimal in expanded form using powers of 10 (including negative exponents for decimal places), convert between standard notation and power-of-10 expanded form, and explain why shifting the decimal point corresponds to multiplying or dividing by powers of 10.
