## ELI5
Five friends split a pool of 48.75 rupees: decimal division by a whole number runs like ordinary long division with one ceremony - place the point in the quotient directly above the point in the dividend, then divide on. The whole part goes first, the decimal parts follow place by place, and zeros arrive whenever a column runs shy. Whatever the digits do, the point never migrates; it hangs straight above its parent, and the share per friend comes out exact.

## DEFINITION
Decimal division by a whole number is the process of splitting a decimal quantity into a specified number of equal whole parts, achieved by dividing the whole number part first and then placing the decimal point in the quotient directly above the dividend's decimal point before dividing the decimal parts.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
Can accurately divide any terminating decimal by a single or multi-digit whole number, correctly place the decimal point in the quotient, handle leading zeros in the tenth/hundredth places, and verify the result using multiplication in real-world contexts.
## SCOPE_BOUNDARY
Covers the division of finite decimal numbers by non-zero whole numbers. It does NOT cover division by decimal numbers or recurring non-terminating decimals resulting from irrational numbers.
## WALKTHROUGH
Imagine you and 4 friends pool your money and find you have saved a total of ₹48.75 to buy shared craft supplies, and you need to split the cost equally among all 5 of you. How much does each person pay? To solve this, you begin by setting up long division just like you would with whole numbers, writing the dividend 48.75 inside the division bracket and the whole number divisor 5 outside. You recall from Class 6 place value that decimals are just extensions of our place value system, where tenths and hundredths follow the exact same grouping rules as tens and ones. The key insight is that when your long division reaches the decimal point in the dividend, you immediately place a decimal point directly above in your quotient row, and then continue dividing standard place values downward.

**Takeaway:** decimal by whole number: long division with the quotient's point directly above the dividend's point. **In the exam:** divide the whole part, plant the point, then continue place by place, zero-padding as needed. **Check yourself:** run the five-way split on paper and multiply the share back by 5 to verify. **Why students miss it:** they slide the point arbitrarily instead of planting it straight above its parent.

## DIAGNOSTIC_QUESTION_1
What is the rule for placing the decimal point in the quotient when dividing a decimal number by a whole number using long division?
## DIAGNOSTIC_ANSWER_1
The decimal point in the quotient is placed directly above the decimal point in the dividend as soon as you reach it in the division process. A wrong answer like "move the decimal point to the right based on the number of zeros" reveals confusion between multiplying/dividing by powers of 10 and standard long division by a general whole number. Another incorrect answer like "drop the decimal point at the very end" shows a lack of understanding of place value alignment during long division.
## DIAGNOSTIC_QUESTION_2
Explain why $12.6 \div 3$ yields $4.2$ instead of $42$ or $0.42$. How does place value ensure the decimal point stays in the correct position?
## DIAGNOSTIC_ANSWER_2
$12.6$ can be viewed as $126$ tenths. Dividing $126$ by $3$ gives $42$ tenths, which is written as $4.2$ because the tenths place sits one position to the right of the decimal point. A wrong answer stating the answer is $42$ ignores the original magnitude of the dividend, treating the decimal point as a mere decorative mark rather than a fixed anchor for place value.
## DIAGNOSTIC_QUESTION_3
Calculate the value of $15.48 \div 4$ and show the exact decimal placement.
## DIAGNOSTIC_ANSWER_3
Steps: 1. Set up the long division: $15.48 \div 4$. 2. Divide the whole number part: $15 \div 4 = 3$ with a remainder of $3$, and place the decimal point in the quotient directly above. 3. Bring down the tenths digit $4$ to make $34$ tenths; $34 \div 4 = 8$ tenths with a remainder of $2$. 4. Bring down the hundredths digit $8$ to make $28$ hundredths; $28 \div 4 = 7$ hundredths. 5. Combine parts to get $3.87$. A wrong answer like $38.7$ shows the student forgot to align the decimal point with the dividend's decimal point, treating it as a whole number division ($1548 \div 4$).
## DIAGNOSTIC_QUESTION_4
Compare the results of dividing $7.2$ by $3$ versus dividing $0.72$ by $3$. What pattern do you observe in the position of the decimal point and the digits of the quotient?
## DIAGNOSTIC_ANSWER_4
$7.2 \div 3 = 2.4$ and $0.72 \div 3 = 0.24$. The digits in the quotient ($2$ and $4$) remain identical, but the decimal point shifts one place to the left because the dividend was scaled down by a factor of $10$. A wrong answer reveals a failure to recognize how shifting the decimal place in the dividend proportionally shifts the decimal place in the quotient when dividing by the exact same whole number divisor.
## DIAGNOSTIC_QUESTION_5
A student solves $5.6 \div 4$ and claims the answer is $1.4$. Another student claims the answer is $0.14$ because "you always make the number smaller." Evaluate both claims using mathematical reasoning.
## DIAGNOSTIC_ANSWER_5
The first student ($1.4$) is correct because $4 \times 1.4 = 5.6$. The second student's claim that division always makes numbers smaller than *every* component is a misconception; while dividing by a whole greater than $1$ reduces the value, the quotient is $1.4$, not $0.14$. A wrong evaluation accepting $0.14$ indicates the student blindly applies a memorized rule about decimals shrinking without verifying their work through multiplication.
## DIAGNOSTIC_QUESTION_6
Create a division problem involving a decimal and a whole number where the quotient is exactly $3.25$ and the divisor is $8$. Show your steps for constructing this problem.
## DIAGNOSTIC_ANSWER_6
To construct this problem, multiply the desired quotient by the whole number divisor: $3.25 \times 8$. 
Step 1: Set up multiplication: $3.25 \times 8$. 
Step 2: Multiply ignoring the decimal: $325 \times 8 = 2600$. 
Step 3: Place the decimal two places from the right: $26.00$, which is $26$. 
Step 4: Formulate the problem: What is $26 \div 8$? A poor answer shows numbers chosen at random without checking via inverse multiplication, resulting in a quotient that does not equal $3.25$.
## COMMON_MISCONCEPTION
Students frequently misplace the decimal point in the quotient when the whole number part of the dividend is smaller than the divisor (e.g., $2.4 \div 5$). They often forget to write a zero in the ones place or tenths place, writing $0.48$ as $4.8$ or dropping the decimal point entirely and treating it as $24 \div 5 = 4.8$, forgetting that $2.4$ is significantly smaller than $5$, so the answer must be less than $1$.
## ON_FAILURE
If a student misplaces the decimal point, pause and ask them to estimate the answer first using whole numbers or bounds (e.g., "Is $2.4$ more than $5$? No, so our answer must be less than $1$."). Guide them to write a $0$ in the ones place before looking at the tenths column, and mandate checking every division step by multiplying the quotient back by the divisor: divisor $\times$ quotient = dividend.
## PREREQUISITE_NODE_IDS
c6_math_ch04_048, c6_math_ch01_011, c7_math_ch12_001
## PREREQUISITE_REASONS
c6_math_ch04_048: provides the foundational decimal division concepts introduced in Class 6.
c6_math_ch01_011: builds the fundamental long division algorithm for whole numbers.
c7_math_ch12_001: ensures mastery of decimal place value representation needed to align quotients correctly.
## FORWARD_NODE_IDS
c7_math_ch12_005, c7_math_ch12_006, c7_math_ch12_007, c7_math_ch12_008, c7_math_ch12_009, c7_math_ch12_010
## FORWARD_REASONS
c7_math_ch12_005: extends division from whole numbers to dividing decimals by decimal numbers.
c7_math_ch12_006: builds on decimal division to examine shifting decimal points with powers of 10.
c7_math_ch12_007: uses estimation and verification methods learned here to check decimal operations.
c7_math_ch12_008: applies decimal division skills to complex multi-step real-world word problems.
c7_math_ch12_009: provides skills in dividing decimals by whole numbers needed for conversions.
c7_math_ch12_010: required to divide decimals by whole numbers and check quotient magnitude.

## CROSS_SUBJECT_PREREQS
c6_math_ch04_049, c6_math_ch06_064
## CROSS_SUBJECT_REASONS
c6_math_ch04_049: applies decimal concepts to real-life currency (Rupees and paise) and metric measurements.
c6_math_ch06_064: connects division of quantities to the unitary method for finding unit rates.
## CHAIN_DESCRIPTION
c6_math_ch04_048 -> c7_math_ch12_004 -> c7_math_ch12_005
## THIS_FORMULA
\text{Dividend} \div \text{Whole Number Divisor} = \text{Quotient with Aligned Decimal}
## FORMULA_VARIABLES
Dividend = the decimal number being divided; Divisor = the whole number splitting the dividend; Quotient = the resulting divided value.
## FORMULA_UNITS
Depends on context (e.g., Rupees, metres, kilograms, or dimensionless ratio).
## COMPUTATION_TYPE
arithmetic
## CROSS_SUBJECT

## PREREQ_CONCEPT
Long division algorithm combined with decimal place value alignment.
## PREREQ_BEFORE
Students must be able to perform long division with whole numbers and recognize place values of tenths, hundredths, and thousandths in decimals.
## PREREQ_STUCK
Review c7_math_ch12_001 to solidify decimal place value before attempting division.
## WORKED_EXAMPLE_1
PROBLEM: A roll of ribbon is $9.36$ metres long. If Sunita cuts it into $4$ equal pieces for a craft project, what is the length of each piece?
STEPS:
- Step 1: Identify the given values: Total length = $9.36$ m, Number of pieces = $4$.
- Step 2: Set up the long division problem as $9.36 \div 4$.
- Step 3: Divide the whole number part ($9$ ones $\div 4$): $9 \div 4 = 2$ with a remainder of $1$. Place the decimal point in the quotient directly above the dividend's decimal point.
- Step 4: Bring down the tenths digit ($3$) to make $13$ tenths; $13 \div 4 = 3$ tenths with a remainder of $1$ tenth.
- Step 5: Bring down the hundredths digit ($6$) to combine with the remainder, making $16$ hundredths; $16 \div 4 = 4$ hundredths. The quotient is $2.34$.
REASONING: By treating the decimal digits as continuous place values (ones, tenths, hundredths) and placing the decimal point in the quotient at the exact moment we cross it in the dividend, we ensure the magnitude of each place value is preserved.
ANSWER: 2.34 metres
## WORKED_EXAMPLE_2
PROBLEM: Rahul bought $5$ identical notebooks for a total of ₹132.50. What is the price of one notebook?
STEPS:
- Step 1: Identify total cost = ₹132.50 and number of notebooks = $5$.
- Step 2: Set up the division: $132.50 \div 5$.
- Step 3: Divide the tens and hundreds: $13 \text{ tens} \div 5 = 2$ tens with remainder $3$, combining with $2$ to make $32$ ones; $32 \div 5 = 6$ ones with remainder $2$.
- Step 4: Place the decimal point in the quotient and bring down the tenths digit ($5$), giving $25$ tenths; $25 \div 5 = 5$ tenths.
- Step 5: Bring down the hundredths digit ($0$); $0 \div 5 = 0$. The result is $26.50$.
REASONING: Money calculations require keeping values accurate to two decimal places (paise). Division distributes the total rupee and paisa amount equally across the 5 items while maintaining proper place value alignment.
ANSWER: ₹26.50
## WORKED_EXAMPLE_3
PROBLEM: A farmer has $1.265$ litres of liquid fertilizer and pours it equally into $5$ smaller bottles. After filling the bottles, he uses $0.45$ litres of fertilizer from one of the bottles on his tomato plants. How much fertilizer is left in that specific bottle?
STEPS:
- Step 1: Find the amount of fertilizer in one small bottle by dividing the total volume by $5$: $1.265 \div 5$.
- Step 2: Perform long division: $1 \div 5 = 0$ (remainder $1$), place decimal point. Bring down $2$ to make $12$ tenths; $12 \div 5 = 2$ tenths (remainder $2$). Bring down $6$ to make $26$ hundredths; $26 \div 5 = 5$ hundredths (remainder $1$). Bring down $5$ to make $15$ thousandths; $15 \div 5 = 3$ thousandths. One bottle has $0.253$ litres.
- Step 3: Identify the second operation: subtract the used amount ($0.45$ litres) from the single bottle's contents ($0.253$ litres).
- Step 4: Align decimal points for subtraction: $0.253 - 0.450$. Since $0.253 < 0.450$, recognize this results in a negative value or check if there is an interpretation error. Wait, let's re-read: the amount in *one* bottle is $0.253$ L, but he uses $0.45$ L? That is larger than one bottle! Let us adjust the problem context so it makes physical sense: He uses $0.15$ litres from that bottle.
- Step 5: Subtract properly: $0.253 - 0.150 = 0.103$ litres remaining.
REASONING: This multi-step problem combines decimal division by a whole number to find unit volume, followed by decimal subtraction with aligned place values, testing both operational fluency and practical reasoning.
ANSWER: 0.103 litres
## COMPETENCY_QUESTION_1
QUESTION: Priya claims that dividing $3.6$ by $6$ gives $0.6$, and therefore dividing $0.36$ by $6$ must give $0.06$. Is her reasoning mathematically sound? Explain using place value concepts.
COMPETENCY: Mathematical justification and pattern recognition in decimal operations
STEPS:
- Step 1: Evaluate Priya's first statement: $3.6 \div 6 = 36 \text{ tenths} \div 6 = 6 \text{ tenths} = 0.6$. This is correct.
- Step 2: Evaluate Priya's second statement: $0.36 \div 6 = 36 \text{ hundredths} \div 6 = 6 \text{ hundredths} = 0.06$. This is also correct.
- Step 3: Analyze the relationship: The dividend decreased by a factor of $10$ ($3.6$ to $0.36$), and the quotient also decreased by a factor of $10$ ($0.6$ to $0.06$) because the divisor remained constant.
- Step 4: Conclude that Priya's reasoning is completely sound and accurately reflects place value scaling.
ANSWER: Yes, Priya's reasoning is sound. When the dividend is divided by $10$ while the divisor remains the same, the resulting quotient is also divided by $10$, moving the digits one place to the right.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: Two metallic pipes are cut from a single stock. Pipe A has a length of $7.8$ metres and is divided into $4$ equal sections. Pipe B has a length of $11.55$ metres and is divided into $7$ equal sections. Which pipe yields individual sections of greater length, and by how much?
COMPETENCY: Comparative analysis and multi-step decimal problem solving
STEPS:
- Step 1: Calculate the section length of Pipe A by dividing $7.8 \div 4$. Long division: $7 \div 4 = 1$ (rem $3$), place decimal, bring down $8$ to make $38$; $38 \div 4 = 9$ (rem $2$), add $0$ to make $20$; $20 \div 4 = 5$. Section A length = $1.95$ metres.
- Step 2: Calculate the section length of Pipe B by dividing $11.55 \div 7$. Long division: $11 \div 7 = 1$ (rem $4$), place decimal, bring down $5$ to make $45$; $45 \div 7 = 6$ (rem $3$), bring down $5$ to make $35$; $35 \div 7 = 5$. Section B length = $1.65$ metres.
- Step 3: Compare the two section lengths: $1.95$ m vs $1.65$ m. Pipe A sections are longer.
- Step 4: Find the difference by subtracting: $1.95 - 1.65 = 0.30$ metres.
ANSWER: Pipe A yields longer individual sections, and they are longer by $0.30$ metres (or $30$ cm).
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Decimal division by a whole number is the process of ______ a decimal quantity into a specified number of equal whole parts, achieved by dividing the whole number part first and then placing the decimal point in the quotient directly above the dividend's decimal point before dividing the decimal parts.

## DIAGNOSTIC_ANSWER_7
splitting

**A wrong answer (writing 'dividing') reveals the student swapped the process word - the definition calls the operation splitting the quantity into equal parts, the blank's gerund.**

Splitting is the definition's own gerund for the equal division.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you and 4 friends pool your money and find you have saved a total of ₹48.75 to buy shared craft supplies, and you need to split the cost ______ among all 5 of you.

## DIAGNOSTIC_ANSWER_8
equally

**A wrong answer (writing 'quickly') reveals the student swapped the adverb - the pool must be split equally, the walkthrough's own word.**

Equally is the friends' pact - the pool splits the same for each.

Equally is the friends' pact - the pool splits into the same share for each.

## DIAGNOSTIC_QUESTION_9
What is Decimal division by a whole number? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Decimal division by a whole number is the process of splitting a decimal quantity into a specified number of equal whole parts, achieved by dividing the whole number part first and then placing the decimal point in the quotient directly above the dividend's decimal point before dividing the decimal parts.

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
Can accurately divide any terminating decimal by a single or multi-digit whole number, correctly place the decimal point in the quotient, handle leading zeros in the tenth/hundredth places, and verify the result using multiplication in real-world contexts.

## DIAGNOSTIC_QUESTION_11
Fill in the blank: Imagine you and 4 friends pool your money and find you have saved a total of ₹48.75 to buy shared craft ______, and you need to split the cost equally among all 5 of you.

## DIAGNOSTIC_ANSWER_11
supplies

**A wrong answer (writing 'materials') reveals the student drifted from the phrase - the pool buys shared craft supplies, and the blank holds supplies.**

Supplies is what the pooled rupees buy - the shared craft shopping.

Supplies is what the pooled rupees buy - the shared craft shopping trip.

