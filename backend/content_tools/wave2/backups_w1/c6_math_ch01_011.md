## ELI5
Division is fair sharing by repeated subtraction: a bag of marbles dealt out into equal groups until the remainders run short. Every division names four characters - dividend, divisor, quotient, remainder - as in a divided by b gives q with r left over. Twenty sweets among five friends is four each, no leftovers. The remainder is the honest guest who did not fit; it must stay smaller than the host divisor.

## DEFINITION
Division is the mathematical process of splitting a total quantity into equal groups or finding how many times one number fits into another. It represents the inverse operation of multiplication, often described as repeated subtraction.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
The student must be able to perform long division on 4-digit numbers by 2-digit divisors, correctly identify the quotient and remainder, and interpret the remainder in the context of a word problem.
## SCOPE_BOUNDARY
This node covers the long division algorithm for large numbers (dividends up to 4 digits). It does not include division of decimals, algebraic expressions, or formal divisibility tests.
## WALKTHROUGH
Imagine you have a large bag of 4,567 marbles and you need to put them into bags of 13 marbles each for your friends. How do you start without counting one by one? You begin by asking how many groups of 13 fit into the first two digits (45). Since 13 goes into 45 three times (39), you subtract 39 from 45 to see what is left over, then "bring down" the next digit to continue the process. You are essentially breaking a big, scary number into smaller, manageable chunks that are easy to multiply. By repeating this "divide, multiply, subtract, bring down" cycle, you eventually reach the end of the number, leaving you with a quotient (your groups) and a remainder (what couldn't fit into a full group).

**Takeaway:** division splits a total into equal groups - dividend, divisor, quotient, remainder - the inverse of multiplication. **In the exam:** in division questions, name all four parts and check the remainder sits strictly below the divisor. **Check yourself:** deal the walkthrough's marble bag into equal piles and narrate where the remainder lands. **Why students miss it:** students leave remainders bigger than the divisor - another full round was a no that went unplayed; the quotient always had more to give.

## DIAGNOSTIC_QUESTION_1
What are the four components of a division problem: a / b = q remainder r?
## DIAGNOSTIC_ANSWER_1
The components are dividend (a), divisor (b), quotient (q), and remainder (r). A wrong answer here suggests the student lacks the vocabulary to follow step-by-step instructions.

**A wrong answer (answering 'two parts') reveals the student hired half the cast - the four parts are dividend, divisor, quotient and remainder.**

## DIAGNOSTIC_QUESTION_2
If you divide 20 by 5, why is the answer 4 and not 5?
## DIAGNOSTIC_ANSWER_2
The answer is 4 because 5 added to itself 4 times equals 20. A student saying 5 often confuses division with simple subtraction or counting, failing to see the relationship between multiplication and division.

**A wrong answer (answering '5') reveals the student counted the friends instead of the sweets per friend - five sweets in each of five shares spends all twenty.**

## DIAGNOSTIC_QUESTION_3
Divide 845 by 12 using long division. What is the quotient and the remainder?
## DIAGNOSTIC_ANSWER_3
845 / 12 = 70 with a remainder of 5. Students who get this wrong often forget to place a zero in the quotient when the divisor is larger than the "brought down" number, a common procedural error.

**A wrong answer (losing the remainder) reveals the student stopped one step early - the long division leaves a remainder the quotient alone never shows.**

## DIAGNOSTIC_QUESTION_4
If you have 100 sweets to share among 12 people, and each gets 8, why is there a remainder of 4?
## DIAGNOSTIC_ANSWER_4
The remainder 4 represents the 4 sweets left over that cannot be split equally among the 12 people without cutting them into pieces. A wrong answer suggests the student thinks division must always result in a whole number.

**A wrong answer (answering 'bad division') reveals the student demanded perfect packing - twelve people eating eight sweets each spends ninety-six, and four sweets stay in the bag.**

## DIAGNOSTIC_QUESTION_5
Is it possible for the remainder to be larger than the divisor? Why or why not?
## DIAGNOSTIC_ANSWER_5
No, the remainder must always be smaller than the divisor because if it were equal or larger, you could have formed at least one more group. A student who says "yes" does not understand that division is about creating the maximum number of full groups.

**A wrong answer (answering 'yes') reveals the student left a full round unplayed - a remainder as big as the divisor means the divisor fits once more.**

## DIAGNOSTIC_QUESTION_6
Create a real-world scenario where a remainder of 3 when dividing by 5 would make sense.
## DIAGNOSTIC_ANSWER_6
An example would be: "I have 18 apples and want to pack them into bags of 5; I will have 3 apples left over that don't fit into a bag." A poor answer involves things that cannot be left over (like half a person), showing a lack of contextual logic.

**A wrong answer (sharing with no leftovers) reveals the student erased the point - the scene must honestly leave three unshared after equal groups of five.**

## COMMON_MISCONCEPTION
Students often "drop" a number and forget to place a placeholder zero in the quotient. For example, in 816 / 8, they might incorrectly write 12 instead of 102. This happens because they focus only on the digit they brought down and ignore the value of the place they are currently filling.
## ON_FAILURE
If a student gets 12 instead of 102, ask them to check their work by multiplying their answer (12) by the divisor (8). When they see 12 * 8 = 96, which is not 816, explain that the quotient must be closer to the original number. Remind them: "Every time you bring down a digit, you MUST put a digit in the quotient, even if that digit is a zero."
## BUILDS_ON
Multiplication tables (single and double digits).
## LEADS_TO
Introduction to fractions and decimal division.

## PREREQUISITE_NODE_IDS
c6_math_ch01_001, c6_math_ch01_002, c6_math_ch01_003, c6_math_ch01_004, c6_math_ch01_005, c6_math_ch01_006

## FORWARD_NODE_IDS
c7_math_ch01_011, c7_math_ch02_001, c7_math_ch11_005, c7_math_ch12_004
## FORWARD_REASONS
c7_math_ch01_011: builds upon foundational long division of large numbers learned in class 6.
c7_math_ch02_001: requires division skills to evaluate terms containing quotients.
c7_math_ch11_005: builds competence in long division with remainders.
c7_math_ch12_004: builds the fundamental long division algorithm for whole numbers.

## CHAIN_DESCRIPTION
Multiplication tables -> Long Division of Large Numbers -> Decimal Division.
## THIS_FORMULA
a / b = q remainder r
## FORMULA_VARIABLES
a = dividend; b = divisor; q = quotient; r = remainder
## FORMULA_UNITS
N/A
## COMPUTATION_TYPE
arithmetic
## CROSS_SUBJECT

## PREREQ_CONCEPT
The relationship between multiplication and division (inverse operations).
## PREREQ_BEFORE
Must be able to subtract 2-digit numbers and multiply 2-digit numbers by 1-digit numbers.
## PREREQ_STUCK
Review the "multiplication facts" for the specific divisor (e.g., if dividing by 13, write out 13x1, 13x2, etc.).
## WORKED_EXAMPLE_1
PROBLEM: A library has 1,245 books to be packed into boxes. Each box can hold 12 books. How many boxes can be filled completely, and how many books will be left over?
STEPS:
- Identify: Dividend = 1245, Divisor = 12. Ask: How many 12s in 12?
- 12 into 12 goes 1 time. Quotient: 1. Remainder: 0.
- Bring down 4. 12 into 4 goes 0 times. Quotient: 10.
- Bring down 5. 12 into 45 goes 3 times (12 * 3 = 36). Subtract 36 from 45. Remainder: 9.
- Final: Quotient = 103, Remainder = 9.
REASONING: We divide digit by digit to ensure we account for every book. The zero in the quotient is vital because 12 does not fit into 4.
ANSWER: 103 boxes filled, 9 books left over.
## WORKED_EXAMPLE_2
PROBLEM: A farmer harvested 2,850 kg of rice and wants to distribute it equally into 15 gunny bags. How many kilograms of rice will be in each bag?
STEPS:
- Identify: Dividend = 2850, Divisor = 15.
- 15 into 28 goes 1 time (15 * 1 = 15). Subtract 15 from 28 = 13.
- Bring down 5: 135. 15 into 135 goes 9 times (15 * 9 = 135). Subtract = 0.
- Bring down 0: 15 into 0 goes 0 times. Quotient: 190.
- Final: 190 kg per bag.
REASONING: By breaking the large 2,850 into 15 equal parts, we ensure the weight is balanced. Each step reduces the size of the remaining dividend.
ANSWER: 190 kg per bag.
## WORKED_EXAMPLE_3
PROBLEM: A school has 2,500 rupees to buy notebooks costing 15 rupees each. How many notebooks can they buy, and how much money will remain?
STEPS:
- Identify: 2500 / 15.
- 15 into 25 goes 1 time. Remainder = 10.
- Bring down 0: 15 into 100 goes 6 times (15 * 6 = 90). Remainder = 10.
- Bring down 0: 15 into 100 goes 6 times (15 * 6 = 90). Remainder = 10.
- Result: 166 notebooks, 10 rupees remainder.
REASONING: We combine division with the concept of remainders to see how far the budget stretches. The division tells us the quantity, while the remainder tells us the unused resources.
ANSWER: 166 notebooks, 10 rupees remaining.
## COMPETENCY_QUESTION_1
QUESTION: You divide 500 by 20 and get 25. Then you divide 500 by 25 and get 20. Does this always happen with division? Explain your reasoning.
COMPETENCY: Comparing and justifying
STEPS:
- Test with another set of numbers (e.g., 100 / 10 = 10).
- Consider if the divisor is 1.
- Identify the relationship between divisor and quotient.
ANSWER: Yes, this is a property of the relationship between multiplication and division. If a / b = q, then a / q = b. This shows that the divisor and quotient are interchangeable factors of the dividend.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: A student divides 4,200 by 20 and gets 21. Is this correct? If not, identify the error and explain how to fix it.
COMPETENCY: Error identification and correction
STEPS:
- Perform the division 4200 / 20.
- Compare with the student's answer (21).
- Identify the place value error.
ANSWER: The answer is incorrect. The student likely ignored the place value of the zeros. 4,200 / 20 is 210, not 21. To fix it, the student should recognize that 420 divided by 2 is 210, and the extra zero must be accounted for.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Division is the ______ process of splitting a total quantity into equal groups or finding how many times one number fits into another.

## DIAGNOSTIC_ANSWER_7
mathematical

**A wrong answer (answering 'multiplication') reveals the student invited the inverse - the blank's equal-splitting process is division.**  The blank's own answer, mathematical, is exactly what both the definition and the walkthrough use - any other filler breaks the sentence's sense. The lesson's framing makes the re-check quick: name the property, run the test, give the example, and the answer is both longer and safer.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you have a ______ bag of 4,567 marbles and you need to put them into bags of 13 marbles each for your friends.

## DIAGNOSTIC_ANSWER_8
large

**A wrong answer (answering 'small') reveals the student underestimated the bag - the walkthrough carries a huge bag of marbles.**  The blank's own answer, large, is exactly what both the definition and the walkthrough use - any other filler breaks the sentence's sense. The lesson's framing makes the re-check quick: name the property, run the test, give the example, and the answer is both longer and safer.

## DIAGNOSTIC_QUESTION_9
What is Division? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Division is the mathematical process of splitting a total quantity into equal groups or finding how many times one number fits into another.

**A wrong answer (defining without sharing) reveals the student learned the symbol, missed the scene - mastery states splitting into equal groups or finding how many times one fits.**

## DIAGNOSTIC_QUESTION_10
What common mix-up does this lesson flag about Division?

## DIAGNOSTIC_ANSWER_10
Students often "drop" a number and forget to place a placeholder zero in the quotient.

**A wrong answer (rounding the remainder away) reveals the student walked into the flagged mix-up - the remainder is real: leftovers get named, not erased.**  The flagged mix-up is the lesson's own warning - restate it in your own words and give the everyday example the walkthrough supplies to close it.

## DIAGNOSTIC_QUESTION_11
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_11
The student must be able to perform long division on 4-digit numbers by 2-digit divisors, correctly identify the quotient and remainder, and interpret the remainder in the context of a word problem.

**A wrong answer (checking with nothing) reveals the student trusted the first answer - mastery multiplies quotient by divisor, adds the remainder, and compares.**

