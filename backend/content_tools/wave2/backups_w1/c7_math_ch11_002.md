## ELI5
Packing 24 red ribbons and 36 blue ribbons into identical gift hampers with nothing left over, the biggest possible hamper count is the HCF - the highest factor the two numbers share. Factors sit below their numbers, so the HCF does too; it can never outgrow either. Two different primes share only the factor one, so their HCF is one. List the factors, spot the shared names, take the tallest - and every hamper comes out perfectly matched.

## DEFINITION
The Highest Common Factor (HCF) of two or more numbers is the greatest positive integer that divides each of those numbers completely without leaving any remainder. It represents the ultimate sharing capacity or the largest uniform grouping possible for given quantities.
## COGNITIVE_LEVEL
understand
## MASTERY_CRITERIA
Can define HCF conceptually, list and identify common factors of numbers, and correctly compute the HCF of two-digit and three-digit numbers using different methods. Can also translate word problems about dividing items into equal groups into HCF calculations.
## SCOPE_BOUNDARY
Covers the definition of HCF, common factors, and finding the HCF of two or three positive integers using listing and factor comparison. Does not cover advanced number theory proofs or algebraic HCF of polynomials.
## WALKTHROUGH
Imagine you are organizing a school cultural fest in Delhi and have 24 red ribbons and 36 blue ribbons. You want to make identical gift hampers such that every hamper has the exact same number of red ribbons and the exact same number of blue ribbons, with none left over. To find the maximum number of identical hampers you can make, you need to find the factors that are shared by both 24 and 36. You learned about factors and divisibility rules in Class 6, where you found individual factors like $1, 2, 3, 4, 6, 8, 12, 24$ for 24. Now, by comparing the factor lists of both numbers, we locate all numbers that divide both, called common factors. The largest of these common factors is our Highest Common Factor, which tells us the exact maximum number of identical gift hampers we can create.

**Takeaway:** the HCF is the greatest shared factor - the largest grouping both quantities divide into exactly. **In the exam:** compute by listing or primes, then sanity-check that the HCF divides both numbers and beats all other common factors. **Check yourself:** verify your hamper count by dividing both ribbon counts and checking zero leftovers. **Why students miss it:** they let the HCF outgrow the numbers, forgetting that a factor must fit inside.

## DIAGNOSTIC_QUESTION_1
What does HCF stand for, and what does it mathematically signify when comparing two numbers like 12 and 18?
## DIAGNOSTIC_ANSWER_1
HCF stands for Highest Common Factor. For 12 and 18, it signifies the largest whole number (which is 6) that can divide both 12 and 18 evenly without leaving a remainder. A student who says HCF is the largest multiple or confuses it with LCM is mixing up factors (divisors) with multiples (products).
## DIAGNOSTIC_QUESTION_2
Rahul says that the HCF of two numbers can sometimes be larger than both of the numbers themselves. Is Rahul correct? Explain why or why not.
## DIAGNOSTIC_ANSWER_2
Rahul is incorrect. The HCF (Highest Common Factor) can never be greater than the numbers themselves because a factor must divide the number completely, and the largest factor of a number is the number itself. A student who says yes is confusing HCF with LCM (Least Common Multiple), which is always greater than or equal to the given numbers.
## DIAGNOSTIC_QUESTION_3
Find all the common factors of 30 and 45, and state their HCF.
## DIAGNOSTIC_ANSWER_3
Step 1: List the factors of 30: $1, 2, 3, 5, 6, 10, 15, 30$. 
Step 2: List the factors of 45: $1, 3, 5, 9, 15, 45$. 
Step 3: Identify the common factors by matching both lists: $1, 3, 5, 15$. 
Step 4: Select the highest number from the common factors, which is 15. The HCF is 15. A student who includes numbers like 2 or 10 has failed to verify if those numbers divide 45.
## DIAGNOSTIC_QUESTION_4
If two numbers are prime numbers, such as 7 and 13, what is always their HCF, and why does this happen?
## DIAGNOSTIC_ANSWER_4
The HCF of two distinct prime numbers is always 1. This happens because prime numbers only have two distinct factors: 1 and the number itself. Since they share no other factors besides 1, their greatest common factor must be 1. A student who answers 0 or says they have no HCF does not understand that 1 is always a universal factor.
## DIAGNOSTIC_QUESTION_5
Priya calculated the HCF of 24 and 36. She wrote down the factors of 24 as $1, 2, 3, 4, 6, 8, 12, 24$ and the factors of 36 as $1, 2, 3, 4, 6, 9, 12, 18, 36$. She then concluded that the common factors are $1, 2, 3, 4, 6, 12$, and since 12 is the largest, the HCF is 12. Evaluate Priya's working and check if her conclusion is sound.
## DIAGNOSTIC_ANSWER_5
Priya's working is completely correct. She accurately listed all factors for both numbers, correctly identified the intersection of those lists (common factors), and correctly picked the maximum value among them. A student who disagrees likely made a counting or division error when listing the factors.
## DIAGNOSTIC_QUESTION_6
Create a pair of composite numbers whose HCF is 6. Show the factor lists to prove your answer.
## DIAGNOSTIC_ANSWER_6
Example answer: The numbers 18 and 30. 
Factors of 18: $1, 2, 3, 6, 9, 18$. 
Factors of 30: $1, 2, 3, 5, 6, 10, 15, 30$. 
Common factors: $1, 2, 3, 6$. 
The highest common factor is 6. A poor answer would use numbers whose HCF is not 6 or use prime numbers instead of composite numbers.
## COMMON_MISCONCEPTION
Students frequently confuse HCF (Highest Common Factor) with LCM (Lowest Common Multiple), resulting in students multiplying the numbers or finding huge numbers instead of divisors. Another common error is missing factors when listing them out—for example, forgetting that numbers like 36 can be written as $4 \times 9$, missing the factors 4 and 9 while only checking up to 6.
## ON_FAILURE
Remind the student to check the direction of division: "Factors fit INSIDE the number (divisors), while multiples stretch BEYOND the number." If they missed factors, have them write multiplication pairs ($1 \times 36$, $2 \times 18$, $3 \times 12$, $4 \times 9$, $6 \times 6$) systematically from smallest to largest to ensure no factor is skipped.
## PREREQUISITE_NODE_IDS
c6_math_ch01_013, c6_math_ch01_014, c6_math_ch01_015, c7_math_ch11_001
## PREREQUISITE_REASONS
c6_math_ch01_013: provides foundational knowledge of what factors and multiples are.
c6_math_ch01_014: provides divisibility rules needed to quickly test which numbers are factors.
c6_math_ch01_015: introduces basic prime factorisation and early HCF concepts from Class 6.
c7_math_ch11_001: establishes how to find common factors of two numbers before evaluating the highest one.
## FORWARD_NODE_IDS
c7_math_ch11_003, c7_math_ch11_004, c7_math_ch11_005, c7_math_ch11_010, c7_math_ch11_006, c8_math_ch10_4, c8_math_ch7_3
## FORWARD_REASONS
c7_math_ch11_003: uses the listing method specifically to find the HCF of numbers.
c7_math_ch11_004: builds on HCF using prime factorisation techniques.
c7_math_ch11_005: builds on HCF using the Euclidean division algorithm.
c7_math_ch11_010: applies HCF and LCM concepts to solve complex real-life word problems.
c7_math_ch11_006: establishes the concept of Highest Common Factor, which contrasts directly with Least Common Multiple.
c8_math_ch10_4: Highest Common Factor (HCF) is required to simplify multi-term ratios to lowest terms in one step.
c8_math_ch7_3: Defines HCF and methods to find it, directly used in simplification.

## CROSS_SUBJECT_PREREQS
c6_math_ch06_062, c6_math_ch03_031
## CROSS_SUBJECT_REASONS
c6_math_ch06_062: ratio simplification relies directly on dividing numbers by their HCF.
c6_math_ch03_031: simplifying fractions to lowest terms requires dividing the numerator and denominator by their HCF.
## CHAIN_DESCRIPTION
c7_math_ch11_001 -> c7_math_ch11_002 -> c7_math_ch11_003
## THIS_FORMULA
N/A - conceptual
## FORMULA_VARIABLES
N/A
## FORMULA_UNITS
N/A
## COMPUTATION_TYPE
arithmetic
## CROSS_SUBJECT

## PREREQ_CONCEPT
Finding factors of a number and identifying common elements between two sets.
## PREREQ_BEFORE
Must be able to test divisibility and list all factor pairs of numbers up to 50 without errors.
## PREREQ_STUCK
Review factor pairs and multiplication tables up to 10x10, specifically revisiting c6_math_ch01_013.
## WORKED_EXAMPLE_1
PROBLEM: A florist in Lucknow has 42 yellow roses and 56 red roses. She wants to make identical flower bouquets using both types of roses such that no roses are left over. What is the maximum number of identical bouquets she can make?
STEPS:
- Step 1: Identify the quantities given: 42 yellow roses and 56 red roses, which need to be split evenly into maximum identical groups. This requires finding the HCF of 42 and 56.
- Step 2: List all factors of 42 by finding multiplication pairs: $1 \times 42$, $2 \times 21$, $3 \times 14$, $6 \times 7$. Thus, factors of 42 are $1, 2, 3, 6, 7, 14, 21, 42$.
- Step 3: List all factors of 56 by finding multiplication pairs: $1 \times 56$, $2 \times 28$, $4 \times 14$, $7 \times 8$. Thus, factors of 56 are $1, 2, 4, 7, 8, 14, 28, 56$.
- Step 4: Identify the common factors present in both lists: $1, 2, 7, 14$.
- Step 5: Select the highest number from the common factors. The greatest number is 14. Therefore, the maximum number of identical bouquets she can make is 14.
REASONING: The problem asks for equal distribution without leftover items, which defines a common divisor. By finding all common divisors and picking the largest one (HCF), we determine the maximum possible group size.
ANSWER: 14 bouquets
## WORKED_EXAMPLE_2
PROBLEM: Three ribbons of lengths 36 cm, 48 cm, and 60 cm are to be cut into equal pieces of maximum possible length without any waste. What must be the length of each piece?
STEPS:
- Step 1: Recognize that cutting equal pieces without waste means finding a common divisor for 36, 48, and 60. Since we want the maximum length, we need the HCF of all three numbers.
- Step 2: Write down the complete factor list for 36: $1, 2, 3, 4, 6, 9, 12, 18, 36$.
- Step 3: Write down the complete factor list for 48: $1, 2, 3, 4, 6, 8, 12, 16, 24, 48$.
- Step 4: Write down the complete factor list for 60: $1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60$.
- Step 5: Compare the three lists and find the common factors: $1, 2, 3, 4, 6, 12$. The largest common factor among them is 12.
REASONING: When measuring or cutting multiple items into equal parts, the length must divide each total length evenly. The HCF ensures that no material is wasted and pieces are as long as physically possible.
ANSWER: 12 cm
## WORKED_EXAMPLE_3
PROBLEM: Two numbers have a product of 180. If their HCF is 6, and one of the numbers is 30, find the other number and verify its factor properties.
STEPS:
- Step 1: Recall the fundamental relationship between two numbers, their HCF, and their LCM: $\text{Product of two numbers} = \text{HCF} \times \text{LCM}$. Alternatively, use the property that the HCF must divide both numbers.
- Step 2: Let the unknown number be $x$. We are given that one number is 30 and their product is 180. Therefore, $30 \times x = 180$.
- Step 3: Solve the algebraic equation for $x$ by dividing both sides by 30: $x = \frac{180}{30}$.
- Step 4: Compute the division: $x = 6$.
- Step 5: Check if the HCF of the two numbers (30 and 6) is indeed 6. Factors of 6 are $1, 2, 3, 6$. Factors of 30 include 6. The highest common factor of 6 and 30 is 6. The conditions are fully satisfied.
REASONING: By using algebraic equations alongside number properties, we connect basic multiplication equations with divisibility rules to solve for unknown values.
ANSWER: 6
## COMPETENCY_QUESTION_1
QUESTION: A school has 72 students in Class 7A and 90 students in Class 7B. The sports teacher wants to arrange both classes into separate rows such that every row in both classes has the exact same number of students, and that number is as large as possible. 
Part A: How many students will be in each row? 
Part B: How many total rows will be formed across both classes combined?
COMPETENCY: Translating real-world situations to mathematical expressions and multi-step HCF applications
STEPS:
- Step 1: Understand that arranging equal rows of maximum size means finding the HCF of 72 and 90.
- Step 2: List factors of 72 ($1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72$) and 90 ($1, 2, 3, 5, 6, 9, 10, 15, 18, 30, 45, 90$).
- Step 3: Find the HCF of 72 and 90, which is 18. This answers Part A (students per row).
- Step 4: Calculate total rows by dividing each class count by 18: Class 7A rows = $72 \div 18 = 4$, Class 7B rows = $90 \div 18 = 5$. Total rows = $4 + 5 = 9$.
ANSWER: Part A: 18 students per row. Part B: 9 total rows.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: Two container trucks carry oil drums. Truck A carries 108 litres of oil, and Truck B carries 144 litres of oil. The oil is to be poured into identical smaller tin containers without mixing, so that every tin is completely filled to its maximum capacity. 
Part A: What is the maximum capacity of each smaller tin? 
Part B: If the shopkeeper sells all tins filled from Truck A at ₹50 per tin and all tins from Truck B at ₹75 per tin, calculate the total earnings.
COMPETENCY: Multi-step problem solving combining HCF with arithmetic operations and financial calculation
STEPS:
- Step 1: Find the HCF of 108 and 144 to determine the maximum capacity of each tin container.
- Step 2: List factors of 108 ($1, 2, 3, 4, 6, 9, 12, 18, 27, 36, 54, 108$) and 144 ($1, 2, 3, 4, 6, 8, 9, 12, 16, 18, 24, 36, 48, 72, 144$). The HCF is 36 litres.
- Step 3: Calculate the number of tins from Truck A: $108 \div 36 = 3$ tins. Calculate earnings from Truck A: $3 \times ₹50 = ₹150$.
- Step 4: Calculate the number of tins from Truck B: $144 \div 36 = 4$ tins. Calculate earnings from Truck B: $4 \times ₹75 = ₹300$.
- Step 5: Add both earnings together: $₹150 + ₹300 = ₹450$.
ANSWER: Part A: 36 litres per tin. Part B: Total earnings = ₹450.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The Highest Common Factor (HCF) of two or more numbers is the greatest positive integer that divides each of those numbers ______ without leaving any remainder.

## DIAGNOSTIC_ANSWER_7
completely

**A wrong answer (writing 'evenly') reveals the student swapped the adverb - the definition's word is completely: no remainder, nothing partial about the division.**

Completely is the strictness - no remainder survives the HCF's division.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are organizing a ______ cultural fest in Delhi and have 24 red ribbons and 36 blue ribbons.

## DIAGNOSTIC_ANSWER_8
school

**A wrong answer (writing 'college') reveals the student changed the organisers - the walkthrough organises a school cultural fest, and the blank names that school.**

School is the fest's organiser in the walkthrough's Delhi scene.

School is the fest's host in the walkthrough's Delhi ribbon-packing scene.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
Can define HCF conceptually, list and identify common factors of numbers, and correctly compute the HCF of two-digit and three-digit numbers using different methods.

**A wrong answer (compute-only skill) reveals the student computed without concepts - mastery also demands defining the HCF and identifying common factors before any largest claim.**

Define it, list common factors, compute it - the mastery's three layers.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Imagine you are ______ a school cultural fest in Delhi and have 24 red ribbons and 36 blue ribbons.

## DIAGNOSTIC_ANSWER_10
organizing

**A wrong answer (writing 'arranging') reveals the student near-missed the gerund - the walkthrough's verb for running the fest is organizing, the blank's own word.**

Organizing is the walkthrough's gerund for running the ribbon-packing fest.

