## ELI5
Adding two railway networks' passengers - 4,52,38,910 and 3,18,45,670 - is not about big numbers, it is about neat columns. Stack the figures so ones sit under ones and crores under crores, then add from the right, carrying whenever a column crosses ten; subtraction borrows the same way, sometimes cascading through a row of zeros like a line of dominoes. Misalign by one place and a lakh quietly becomes a ten-lakh. Alignment first, regrouping second, check last - that is the whole craft.

## DEFINITION
Operations with large numbers involving addition and subtraction require combining or finding the difference between numbers with 6, 7, or 8 digits (lakhs and crores) by strictly aligning digits according to their place value from right to left. Regrouping (carrying over or borrowing) must be applied systematically across adjacent place value columns whenever a sum reaches 10 or more, or when a digit being subtracted is smaller than the digit it is subtracted from.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
Can accurately set up, perform, and verify multi-digit addition and subtraction problems up to 8 digits (crores) with proper column alignment, handle consecutive regrouping (carrying and borrowing) across multiple place values, and solve multi-step word problems set in real-world Indian contexts.
## SCOPE_BOUNDARY
Covers addition and subtraction of whole numbers up to 8 digits (crores) using the standard place-value column algorithm, including estimation checks and real-world word problems. Does NOT cover negative numbers (integers), decimals, fractions, or algebraic manipulation of large numbers.
## WALKTHROUGH
Imagine you are the chief accountant for a state transport corporation, and you need to calculate the combined annual passenger count for two major rail networks, which totals over $4,52,38,910$ passengers for one and $3,18,45,670$ for another. To begin, you must write down both numbers vertically, ensuring that every place value—from ones up to crores—is perfectly aligned in straight vertical columns. Recall from your earlier work with smaller numbers that we always start calculating from the rightmost column (the ones place) and move leftward. When a sum in any column exceeds $9$, or when a top digit is smaller than the bottom digit during subtraction, you must perform regrouping (carrying over or borrowing) with the immediate neighbor to the left. The key insight is that large number addition and subtraction are identical in principle to 3-digit addition and subtraction; you are simply managing more place value columns with absolute neatness.

**Takeaway:** big addition and subtraction are alignment discipline: ones under ones, regroup at ten, borrow through zeros patiently. **In the exam:** set up sums vertically before calculating; after subtracting, add the difference back to the smaller number as a check. **Check yourself:** attempt the across-zeros subtraction and narrate each domino borrow aloud as it falls. **Why students miss it:** they forget to reduce the digit they borrowed from, silently inflating the answer by a whole period.

## DIAGNOSTIC_QUESTION_1
What is the primary rule for setting up an addition or subtraction problem involving large 7-digit or 8-digit numbers before performing any calculation?
## DIAGNOSTIC_ANSWER_1
The correct approach is to align the digits strictly by their place value columns (ones under ones, tens under tens, up to crores under crores) starting from the right. If a student says to align numbers from the left or line them up by their right edge regardless of place value, it reveals a fundamental confusion with place value structure, treating numbers like text rather than mathematical quantities.
## DIAGNOSTIC_QUESTION_2
Explain why we must move from right to left (ones to crores) when adding or subtracting large numbers, rather than starting from the largest place value (crores).
## DIAGNOSTIC_ANSWER_2
We move from right to left because addition and subtraction often require carrying over or borrowing between adjacent place value columns. If you started at the crores place and had to borrow from a neighbor later, you would be forced to constantly erase and change leading digits. A student who believes starting from the left is easier does not understand how regrouping propagates from smaller place values to larger ones.
## DIAGNOSTIC_QUESTION_3
Calculate the sum: $4,58,32,104 + 3,45,67,896$.
## DIAGNOSTIC_ANSWER_3
Step 1: Align columns: Ones under ones, tens under tens, up to crores.
Step 2: Add ones: $4 + 6 = 10$ (write $0$, carry $1$ to tens).
Step 3: Add tens: $0 + 9 + 1 = 10$ (write $0$, carry $1$ to hundreds).
Step 4: Continue across all columns with carries: hundreds ($1+8+1=10$), thousands ($2+7+1=10$), ten-thousands ($3+6+1=10$), lakhs ($8+5+1=14$, write $4$, carry $1$), ten-lakhs ($5+4+1=10$, write $0$, carry $1$), crores ($4+3+1=8$).
Step 5: Final sum is $8,04,00,000$. If a student gets $8,03,99,998$, it indicates they failed to correctly propagate the carries across columns where sums hit exactly $10$.
## DIAGNOSTIC_QUESTION_4
Analyze the following subtraction: $7,00,00,000 - 3,45,67,891$. Explain how borrowing must cascade across multiple zeros.
## DIAGNOSTIC_ANSWER_4
To subtract across zeros, the $7$ in the crores place must borrow, turning into a $6$ while the ten-lakhs place becomes $9$ (after passing through all intermediate zeros which also become $9$, and the final ones place becomes $10$). 
$10 - 1 = 9$ (ones); $9 - 9 = 0$ (tens); $9 - 8 = 1$ (hundreds); $9 - 7 = 2$ (thousands); $9 - 6 = 3$ (ten-thousands); $9 - 5 = 4$ (lakhs); $9 - 4 = 5$ (ten-lakhs); $6 - 3 = 3$ (crores). Final answer: $3,54,32,109$. A student who simply subtracts bottom from top when the top is zero (e.g., getting $0-1=1$) does not understand the borrowing mechanism.
## DIAGNOSTIC_QUESTION_5
Evaluate this student's work: To find the difference between $8,20,40,105$ and $3,15,22,040$, the student writes the problem and subtracts column by column, but forgets to reduce the neighbor's value when borrowing from the tens place to the ones place. Is the student's final answer too high or too low, and why?
## DIAGNOSTIC_ANSWER_5
The student's final answer will be too high. When borrowing, if you add $10$ to a digit but fail to decrease the neighboring digit you borrowed from by $1$, you are artificially adding value to the minuend rather than just redistributing it. A student who thinks failing to reduce the neighbor does not change the final value lacks conceptual understanding of place value conservation.
## DIAGNOSTIC_QUESTION_6
Construct a subtraction problem involving two 8-digit numbers where every single column requires borrowing, and state the exact difference.
## DIAGNOSTIC_ANSWER_6
Sample problem: $5,00,00,005 - 3,99,99,998$. Every column needs a borrow, and the borrow cascades from the ones place all the way up to the crores digit, giving the exact difference $1,00,00,007$. A student who treats the internal zeros as plain $0$ without regrouping gets several digits wrong.
## COMMON_MISCONCEPTION
Students frequently mismanage "zero placeholders" during multi-step borrowing in subtraction with large numbers. For instance, when subtracting from a number like $5,00,00,000$, students often treat the internal zeros as $0$ instead of borrowing across them properly, or they forget to reduce a neighboring digit by $1$ after successfully borrowing, leading to off-by-one errors in multiple columns.
## ON_FAILURE
Guide the student by rewriting the number with zeros explicitly expanded or by using color-coded columns. Tell the student: "Stop and look at the neighbor. If your top digit is smaller than the bottom digit, you must borrow. Cross out the neighbor, reduce it by $1$, and give $10$ to your current column. If the neighbor is a $0$, you must walk further left until you find a non-zero digit, reducing all intermediate $0$s to $9$s." Practice this with a smaller number like $100 - 37$ before returning to 8-digit numbers.
## PREREQUISITE_NODE_IDS
c7_math_ch01_002, c7_math_ch01_004, c6_math_ch01_008, c6_math_ch01_009
## PREREQUISITE_REASONS
c7_math_ch01_002: requires understanding place value up to 6 and 7 digits to align addition and subtraction columns correctly.
c7_math_ch01_004: requires understanding 8-digit numbers (crores) to perform operations on numbers of this magnitude.
c6_math_ch01_008: provides the foundational addition of large numbers learned in Class 6.
c6_math_ch01_009: provides the foundational subtraction of large numbers learned in Class 6.
## FORWARD_NODE_IDS
c7_math_ch01_011
## FORWARD_REASONS
c7_math_ch01_011: mastery of multi-digit addition and subtraction provides the structural column-alignment foundation needed for long multiplication and division of large numbers.
## CROSS_SUBJECT_PREREQS
c6_math_ch01_005
## CROSS_SUBJECT_REASONS
c6_math_ch01_005: understanding the magnitude of lakhs and crores is essential for processing large financial and population datasets in social science and economics.
## CHAIN_DESCRIPTION
c7_math_ch01_004 -> c7_math_ch01_010 -> c7_math_ch01_011
## THIS_FORMULA
N/A - conceptual
## FORMULA_VARIABLES
N/A
## FORMULA_UNITS
N/A
## COMPUTATION_TYPE
arithmetic
## CROSS_SUBJECT
c7_math_ch01_009 | large-scale demographic and census data require addition and subtraction of 8-digit population figures.
c6_math_ch01_005 | government budgetary allocations and national expenditure figures involve large numbers requiring precise arithmetic operations.
## PREREQ_CONCEPT
Place value alignment and regrouping (carrying and borrowing) across multiple digit columns.
## PREREQ_BEFORE
Be able to read, write, and compare 7- and 8-digit numbers in the Indian numbering system.
## PREREQ_STUCK
Review place value columns from ones to crores and practice simple borrowing across zeros with 4-digit numbers.
## WORKED_EXAMPLE_1
PROBLEM: A major infrastructure project in India had a total sanctioned budget of ₹$7,54,32,100$. By the end of the first fiscal year, the government spent ₹$2,89,45,650$. Calculate the remaining unspent budget.
STEPS:
- Step 1: Identify the given values. Total budget (minuend) = ₹$7,54,32,100$; Amount spent (subtrahend) = ₹$2,89,45,650$.
- Step 2: Set up the vertical subtraction problem, aligning columns from ones to crores.
- Step 3: Perform subtraction column by column from right to left, borrowing where necessary. Ones: $0-0 = 0$; Tens: $0$ cannot subtract $5$, borrow from hundreds ($1$ becomes $0$, tens become $10$), $10-5 = 5$.
- Step 4: Continue borrowing across columns: Hundreds ($0-6$ needs borrow, goes to thousands column), proceeding leftward through ten-thousands, lakhs, ten-lakhs, and crores. Full computation: $7,54,32,100 - 2,89,45,650 = 4,64,86,450$.
- Step 5: Verify the result by adding the remainder to the amount spent: $4,64,86,450 + 2,89,45,650 = 7,54,32,100$. The result is correct.
REASONING: Subtraction finds the difference between a total amount and a consumed portion. Aligning place values ensures we only subtract like units from like units, and correct borrowing preserves the total value of the numbers.
ANSWER: ₹$4,64,86,450$
## WORKED_EXAMPLE_2
PROBLEM: In a national census, State A recorded a population of $3,42,15,890$ and State B recorded $4,18,92,430$. What is the combined population of both states?
STEPS:
- Step 1: Identify the given values. Population of State A = $3,42,15,890$; Population of State B = $4,18,92,430$.
- Step 2: Set up the vertical addition problem, ensuring exact column alignment from ones to crores.
- Step 3: Add the ones and tens columns: Ones: $0+0 = 0$; Tens: $9+3 = 12$ (write $2$, carry $1$ to hundreds).
- Step 4: Add remaining columns from right to left including carries: Hundreds ($8+4+1=13$, write $3$, carry $1$), Thousands ($5+2+1=8$), Ten-thousands ($1+9=10$, write $0$, carry $1$), Lakhs ($2+8+1=11$, write $1$, carry $1$), Ten-lakhs ($4+1+1=6$), Crores ($3+4=7$).
- Step 5: Combine all digits to get the final sum: $7,61,08,320$.
REASONING: Combining populations requires addition. Carrying over ensures that whenever a column sum reaches $10$ or more, the excess value is correctly converted and added to the next higher place value.
ANSWER: $7,61,08,320$ people
## WORKED_EXAMPLE_3
PROBLEM: A textile corporation produced $1,25,40,600$ spools of thread in year one and $1,42,15,350$ spools in year two. If they sold $2,10,50,200$ spools across both years combined, how many spools remain in stock?
STEPS:
- Step 1: Calculate the total production across both years by adding Year 1 and Year 2 production: $1,25,40,600 + 1,42,15,350$.
- Step 2: Perform addition: $0+0=0$, $0+5=5$, $6+3=9$, $0+5=5$, $4+1=5$, $5+2=7$, $2+4=6$, $1+1=2$. Total production = $2,67,55,950$ spools.
- Step 3: Set up the subtraction to find remaining stock by subtracting total sales from total production: $2,67,55,950 - 2,10,50,200$.
- Step 4: Perform subtraction from right to left: Ones ($0-0=0$), Tens ($5-0=5$), Hundreds ($9-2=7$), Thousands ($5-0=5$), Ten-thousands ($5-5=0$), Lakhs ($7-0=7$), Ten-lakhs ($6-1=5$), Crores ($2-2=0$).
- Step 5: Final computation yields $57,05,750$ spools remaining in stock. Verify by adding sales and stock: $2,10,50,200 + 57,05,750 = 2,67,55,950$.
REASONING: This is a two-step problem combining addition (to find the aggregate total produced) and subtraction (to find what is left after a portion is removed/sold). Breaking the problem into sequential arithmetic operations prevents place value confusion.
ANSWER: $57,05,750$ spools
## COMPETENCY_QUESTION_1
QUESTION: Two students, Amit and Priya, solve the addition problem $4,85,62,390 + 3,28,45,710$. Amit gets $8,14,08,100$ and Priya gets $8,13,08,100$. Without re-doing the entire calculation from scratch, analyze which student is correct by checking the tens-thousands and lakhs columns, and explain the exact error made by the incorrect student.
COMPETENCY: Error identification and correction in large number addition
STEPS:
- Step 1: Examine the addends in the ten-thousands and lakhs columns: $5$ and $8$ in ten-thousands; $8$ and $4$ in lakhs.
- Step 2: Check the addition for ten-thousands: $5 + 8 = 13$. Plus any carry from thousands ($9+1=10$, carry $1$), so $13 + 1 = 14$ (write $4$, carry $1$).
- Step 3: Check the addition for lakhs: $8 + 2 = 10$. Plus the carry $1$ from ten-thousands gives $10 + 1 = 11$ (write $1$, carry $1$).
- Step 4: Compare Amit's and Priya's answers in those columns: Amit has $4$ in ten-thousands and $1$ in lakhs (from $14$ and $11$), whereas Priya missed a carry. Amit is correct.
ANSWER: Amit is correct ($8,14,08,100$). Priya is incorrect because she dropped a carry when adding the ten-thousands column ($5+8+1=14$), which resulted in her lakhs column being short by $1$ ($10$ instead of $11$), dropping her total by $1,00,000$.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: A state government allocates a development fund of ₹$10,00,00,000$ across three districts. District X receives ₹$3,45,20,100$ and District Y receives ₹$4,12,85,400$. Calculate how much is left for District Z, and justify whether a single subtraction or a two-step operation is more reliable for verifying the total allocation.
COMPETENCY: Translating multi-step financial allocation scenarios into arithmetic operations and justifying verification methods
STEPS:
- Step 1: Identify total fund = ₹$10,00,00,000$. Identify allocations for District X ($3,45,20,100$) and District Y ($4,12,85,400$).
- Step 2: Find the combined amount given to X and Y by adding them: $3,45,20,100 + 4,12,85,400 = 7,58,05,500$.
- Step 3: Subtract the combined amount from the total fund to find District Z's share: $10,00,00,000 - 7,58,05,500$.
- Step 4: Perform subtraction across zeros carefully: $10,00,00,000 - 7,58,05,500 = 2,41,94,500$.
- Step 5: Justify verification: A two-step operation (addition then subtraction) is essential because adding all three district shares back to the total fund ($3,45,20,100 + 4,12,85,400 + 2,41,94,500 = 10,00,00,000$) provides absolute certainty.
ANSWER: District Z receives ₹$2,41,94,500$. A two-step operation combined with a final sum verification is most reliable because it checks both the intermediate sum and the final remainder against the original budget ceiling.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Operations with large numbers involving addition and ______ require combining or finding the difference between numbers with 6, 7, or 8 digits (lakhs and crores) by strictly aligning digits according to their place value from right to left.

## DIAGNOSTIC_ANSWER_7
subtraction

**A wrong answer (writing 'multiplication') reveals the student jumped ahead of the definition - this lesson covers addition and subtraction of large numbers, combining totals or finding differences with strict place value alignment.**

Both operations live in this lesson.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: To begin, you must write down both numbers vertically, ______ that every place value—from ones up to crores—is perfectly aligned in straight vertical columns.

## DIAGNOSTIC_ANSWER_8
ensuring

**A wrong answer (writing 'hoping') reveals the student loosened the walkthrough's verb - the accountant writes both passenger figures vertically, ensuring every place value from ones to crores lines up before any adding begins.**

Alignment is the setup; regrouping is only the consequence.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Regrouping (carrying over or borrowing) must be applied systematically across adjacent place value columns whenever a sum reaches ______ or more, or when a digit being subtracted is smaller than the digit it is subtracted from.

## DIAGNOSTIC_ANSWER_9
10

**A wrong answer (writing 'five' or 'hundred') reveals the student missed the regrouping trigger - a column is carried the moment its sum reaches 10, the same threshold that makes a taxi meter tick over one full unit.**

One 10, one carry - the meter of every column rolls at exactly that threshold.

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
Can accurately set up, perform, and verify multi-digit addition and subtraction problems up to 8 digits (crores) with proper column alignment, handle consecutive regrouping (carrying and borrowing) across multiple place values, and solve multi-step word problems set in real-world Indian contexts.

## DIAGNOSTIC_QUESTION_11
Fill in the blank: To begin, you must write down both numbers ______, ensuring that every place value—from ones up to crores—is perfectly aligned in straight vertical columns.

## DIAGNOSTIC_ANSWER_11
vertically

**A wrong answer (writing 'carefully') reveals the student swapped the walkthrough's word - the figures must be written vertically so each digit sits in its own place value column, the setup every banker uses before totalling a ledger.**

Vertical, never slanted.

