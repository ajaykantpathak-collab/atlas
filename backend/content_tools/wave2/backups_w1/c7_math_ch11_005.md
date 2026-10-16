## ELI5
Rows for the assembly: 156 desks and 96 chairs must form identical rows, and Euclid's division method finds the biggest row without any listing. Divide the larger by the smaller, then keep dividing - last divisor by the last remainder - until the remainder hits zero. The final non-zero remainder in the driver's seat is the HCF, because any common factor of the pair must also divide every remainder along the way. Divide, replace, repeat: three short sums retire a page of factor lists.

## DEFINITION
The Euclidean Division Method for finding the Highest Common Factor (HCF) is an efficient step-by-step procedure based on repeated division, where the last non-zero remainder represents the HCF of two numbers.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
Can apply the division lemma method to find the HCF of large numbers through repeated division and interpret why the process stops when the remainder becomes zero.
## SCOPE_BOUNDARY
Covers finding the HCF of two positive integers using successive division. Does not cover the formal Euclidean algorithm proof for negative integers or polynomials in this specific node.
## WALKTHROUGH
Imagine you are a school event coordinator dividing 156 long wooden desks and 96 plastic chairs into exact, identical rows for an assembly, leaving no leftovers of either type. Instead of listing every single factor or drawing massive prime factor trees, mathematicians use a clever shortcut called the Euclidean Division Method. To begin, you divide the larger number by the smaller number, just like you learned in earlier division operations, and note down the remainder. Then, you take the previous divisor, make it your new dividend, take the remainder as your new divisor, and repeat this cycle. The key insight is that the common factors of two numbers do not change if you replace the larger number by its remainder when divided by the smaller number, making even large numbers simple to handle.

**Takeaway:** Euclid's method: divide, then loop divisor-over-remainder until zero; the last non-zero remainder is the HCF. **In the exam:** show every division step with its quotient and remainder; stop only at a zero remainder. **Check yourself:** run the desks-and-chairs division chain on paper and confirm the final remainder is zero. **Why students miss it:** they grab the last quotient instead of the last non-zero remainder and report the wrong HCF.

## DIAGNOSTIC_QUESTION_1
What is the mathematical term for the number that is left over when you divide one integer by another during the Euclidean division process?
## DIAGNOSTIC_ANSWER_1
The correct answer is the "remainder". A student who answers "quotient" confuses the result of the division with what remains unconsolidated, while a student who answers "factor" shows a lack of vocabulary recall regarding division components.

**A wrong answer (grabbing the wrong column) reveals the student read the ladder hastily** - the division chain leaves two candidates, and the HCF is the remainder that finally reaches zero, not a quotient on the way down.

## DIAGNOSTIC_QUESTION_2
Why does the Euclidean Division Method require us to replace the original dividend with the previous divisor, and the previous divisor with the remainder, in each successive step?
## DIAGNOSTIC_ANSWER_2
The correct answer is that any common factor of two numbers also divides their remainder, meaning the HCF remains unchanged throughout these steps until the remainder becomes zero. A student who says "to make the numbers bigger" or "it is just a random rule" does not understand that the set of common divisors stays invariant during this division sequence.
## DIAGNOSTIC_QUESTION_3
Use the Euclidean Division Method to find the HCF of 135 and 225. Show the division steps clearly.
## DIAGNOSTIC_ANSWER_3
The correct answer is 45. Working: Step 1: Divide 225 by 135. $225 = 135 \times 1 + 90$ (Remainder = 90). Step 2: Divide 135 by the remainder 90. $135 = 90 \times 1 + 45$ (Remainder = 45). Step 3: Divide 90 by the new remainder 45. $90 = 45 \times 2 + 0$ (Remainder = 0). Since the remainder is now 0, the last non-zero divisor is 45. A student who stops at 90 has confused the divisor with the remainder.
## DIAGNOSTIC_QUESTION_4
Compare the Prime Factorisation Method (c7_math_ch11_004) and the Euclidean Division Method for finding the HCF of 1050 and 1470. Why is Euclidean division often preferred for very large numbers?
## DIAGNOSTIC_ANSWER_4
The correct answer is that Euclidean division relies on quick, short divisions rather than finding all prime numbers up to the square root of the given integers, avoiding long prime factor trees. A student who claims prime factorisation is always faster does not understand how difficult it is to find prime factors of large numbers without a calculator.
## DIAGNOSTIC_QUESTION_5
A student performs the Euclidean division method for 84 and 36 as follows: $84 \div 36 = 2$ with a remainder of 12. Next, they divide 36 by 12 and get $36 \div 12 = 3$ with a remainder of 0. They conclude the HCF is 3. Is their conclusion correct, and if not, what is the error?
## DIAGNOSTIC_ANSWER_5
The conclusion is incorrect. The student mistook the last quotient (3) for the HCF instead of identifying the last non-zero remainder (12). The correct HCF is 12 because 12 is the divisor that leaves a remainder of zero.

**A wrong answer (crowning the last quotient) reveals the student awarded the trophy to a runner** - the Euclid algorithm's prize is the last non-zero remainder, the divisor that finally divides clean.

## DIAGNOSTIC_QUESTION_6
Create a pair of numbers greater than 100 where the Euclidean Division Method terminates in exactly two division steps. Explain your construction process.
## DIAGNOSTIC_ANSWER_6
An acceptable response provides two numbers, such as 210 and 150. Construction: Work backwards by choosing a target HCF like 30, multiplying it to form a divisor and quotient, and building the steps ($150 = 30 \times 5$, so let second number be 150, and first number $150 \times 1 + 30 = 180$, or similar sequence). A poor answer lists random numbers without checking the exact number of steps required.
## COMMON_MISCONCEPTION
Students frequently mistake the final quotient for the HCF instead of taking the final non-zero remainder. For example, when finding the HCF of 48 and 18, they write $48 = 18 \times 2 + 12$, then $18 = 12 \times 1 + 6$, then $12 = 6 \times 2 + 0$. When the remainder becomes zero, they see the quotient 2 from the last line ($6 \times 2$) and incorrectly report 2 as the HCF instead of the divisor 6.
## ON_FAILURE
Remind the student to trace back through their division steps and explicitly circle the last non-zero remainder, not the quotient. Say: "Look at the equation where the remainder becomes zero. The number you divided by—the divisor—just before getting zero is your HCF. Point to it with your pencil." Have them write down: "HCF is always a divisor, never the quotient."
## PREREQUISITE_NODE_IDS
c7_math_ch11_002, c6_math_ch01_011, c6_math_ch01_013
## PREREQUISITE_REASONS
c7_math_ch11_002: provides the fundamental definition of Highest Common Factor.
c6_math_ch01_011: builds competence in long division with remainders.
c6_math_ch01_013: establishes understanding of factors and multiples.
## FORWARD_NODE_IDS
c7_math_ch11_009, c7_math_ch11_010
## FORWARD_REASONS
c7_math_ch11_009: uses the computed HCF to explore the relationship between HCF and LCM.
c7_math_ch11_010: applies efficient HCF calculation methods to solve complex real-life word problems.
## CROSS_SUBJECT_PREREQS
c6_math_ch01_014
## CROSS_SUBJECT_REASONS
c6_math_ch01_014: divisibility rules support mental estimation of quotients during the Euclidean division steps.
## CHAIN_DESCRIPTION
c7_math_ch11_002 -> c7_math_ch11_005 -> c7_math_ch11_010
## THIS_FORMULA
a = b \times q + r  \text{ where } 0 \le r < b
## FORMULA_VARIABLES
a = larger dividend, b = smaller divisor, q = quotient, r = remainder
## FORMULA_UNITS
dimensionless
## COMPUTATION_TYPE
arithmetic
## CROSS_SUBJECT
c7_math_ch11_002 | both establish methods for finding common factors of quantities
c6_math_ch01_015 | both rely on decomposition and factor properties of integers
## PREREQ_CONCEPT
Division algorithm with quotient and remainder.
## PREREQ_BEFORE
Be able to perform long division and identify remainders accurately.
## PREREQ_STUCK
Review basic division with remainders from large numbers operations.
## WORKED_EXAMPLE_1
PROBLEM: Find the HCF of 306 and 657 using the Euclidean Division Method.
STEPS:
- step 1: Identify the larger number as dividend ($a = 657$) and the smaller number as divisor ($b = 306$).
- step 2: Apply division: $657 \div 306$. Quotient is 2, because $306 \times 2 = 612$.
- step 3: Calculate the remainder: $657 - 612 = 45$. Write equation: $657 = 306 \times 2 + 45$.
- step 4: Take the previous divisor (306) as the new dividend and the remainder (45) as the new divisor. Divide $306 \div 45$. Quotient is 6, because $45 \times 6 = 270$.
- step 5: Calculate the new remainder: $306 - 270 = 36$. Write equation: $306 = 45 \times 6 + 36$.
- step 6: Repeat the shift: take 45 as dividend and 36 as divisor. Divide $45 \div 36$. Quotient is 1, remainder is $45 - 36 = 9$. Write: $45 = 36 \times 1 + 9$.
- step 7: Repeat the shift: take 36 as dividend and 9 as divisor. Divide $36 \div 9$. Quotient is 4, remainder is $36 - (9 \times 4) = 0$. Write: $36 = 9 \times 4 + 0$.
REASONING: Since the remainder has reached 0, the divisor in this final step (which is 9) is the Highest Common Factor. Each step preserves the common factors of the numbers while steadily reducing their size.
ANSWER: HCF = 9
## WORKED_EXAMPLE_2
PROBLEM: Two tanker trucks carry diesel fuel for a school generator. One holds 403 litres and the other holds 434 litres. Find the maximum capacity of a container that can measure the fuel of both tankers an exact integer number of times using the Euclidean Division Method.
STEPS:
- step 1: Identify that the maximum capacity container must be the HCF of 434 and 403.
- step 2: Divide the larger number by the smaller: $434 \div 403$. Quotient is 1.
- step 3: Find the remainder: $434 - (403 \times 1) = 31$. Express as: $434 = 403 \times 1 + 31$.
- step 4: Shift numbers: Use 403 as the dividend and 31 as the divisor. Compute $403 \div 31$. Quotient is 13, because $31 \times 13 = 403$.
- step 5: Find the new remainder: $403 - 403 = 0$. Express as: $403 = 31 \times 13 + 0$.
REASONING: The last non-zero remainder in the division sequence is 31. Therefore, 31 litres is the HCF, meaning a 31-litre container can measure both fuel quantities perfectly without any leftover fractional amounts.
ANSWER: 31 litres
## WORKED_EXAMPLE_3
PROBLEM: A rectangular floor measures 144 cm in length and 108 cm in width. It needs to be paved with identical square tiles with no cutting required. Find the side length of the largest possible square tile using the Euclidean Division Method, and calculate how many such tiles are needed.
STEPS:
- step 1: Recognize that the maximum side length of a square tile must be the HCF of 144 and 108.
- step 2: Apply Euclidean division on 144 and 108: $144 \div 108 = 1$ with a remainder of $144 - 108 = 36$. Write: $144 = 108 \times 1 + 36$.
- step 3: Shift numbers: divide 108 by 36: $108 \div 36 = 3$ with a remainder of $108 - (36 \times 3) = 0$. Write: $108 = 36 \times 3 + 0$.
- step 4: Conclude that the HCF is 36, which means the maximum side length of the square tile is 36 cm.
- step 5: Calculate the area of the floor: $\text{Area} = 144 \text{ cm} \times 108 \text{ cm} = 15552 \text{ cm}^2$.
- step 6: Calculate the area of one square tile: $\text{Tile Area} = 36 \text{ cm} \times 36 \text{ cm} = 1296 \text{ cm}^2$.
- step 7: Divide total area by tile area to find the total number of tiles: $15552 \div 1296 = 12$ tiles.
REASONING: The HCF gives the largest common linear dimension that divides both sides evenly. Combining this dimension with mensuration area formulas allows us to solve the complete real-world tiling problem.
ANSWER: Side length = 36 cm, Total tiles = 12 tiles
## COMPETENCY_QUESTION_1
QUESTION: A student claims that if you double both numbers, say from 45 and 75 to 90 and 150, the Euclidean division steps will change completely, but the final HCF will remain unrelated. Evaluate this statement by calculating the HCF of 90 and 150 using Euclidean division and compare it with the HCF of 45 and 75.
COMPETENCY: Comparing and justifying properties of mathematical operations
STEPS:
- step 1: Find HCF of 45 and 75 using Euclidean division ($75 = 45 \times 1 + 30$; $45 = 30 \times 1 + 15$; $30 = 15 \times 2 + 0$, so HCF = 15).
- step 2: Perform Euclidean division for 90 and 150 ($150 = 90 \times 1 + 60$; $90 = 60 \times 1 + 30$; $60 = 30 \times 2 + 0$).
- step 3: Identify the HCF of 90 and 150 as 30.
- step 4: Compare 30 with 15 (note that $30 = 15 \times 2$, meaning doubling the numbers doubles their HCF).
ANSWER: The student's claim that the HCF is unrelated is false; when both original numbers are scaled by a factor (e.g., doubled), the resulting HCF is scaled by the exact same factor because common factors scale proportionally.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: Three wire lengths measuring 210 metres, 315 metres, and 420 metres need to be cut into equal pieces without any waste. Design a systematic plan using the Euclidean Division Method to find the maximum possible length of each piece, and explain how you handle three numbers instead of two.
COMPETENCY: Translating multi-step real-world constraints into structured algorithms
STEPS:
- step 1: Understand that to find the greatest common length for three numbers, we first find the HCF of any two numbers (e.g., 210 and 315).
- step 2: Apply Euclidean division to 315 and 210 ($315 = 210 \times 1 + 105$; $210 = 105 \times 2 + 0$), yielding an intermediate HCF of 105.
- step 3: Take this intermediate HCF (105) and find its HCF with the third number (420).
- step 4: Apply Euclidean division to 420 and 105 ($420 = 105 \times 4 + 0$).
- step 5: Conclude that 105 is the final HCF, representing the maximum possible piece length of 105 metres.
ANSWER: The maximum possible length of each piece of wire is 105 metres, achieved by finding the HCF of the first two numbers and then finding the HCF of that result with the third number.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The Euclidean Division Method for finding the Highest Common Factor (HCF) is an efficient step-by-step procedure based on repeated division, where the last non-zero remainder ______ the HCF of two numbers.

## DIAGNOSTIC_ANSWER_7
represents

**A wrong answer (writing 'quotient') reveals the student said the answer, not the leftover - the blank holds represents, the verb saying the last non-zero remainder IS the HCF.**

Represents is the definition's claim - the last non-zero remainder IS the HCF.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are a school event coordinator dividing 156 long wooden desks and 96 plastic chairs into exact, ______ rows for an assembly, leaving no leftovers of either type.

## DIAGNOSTIC_ANSWER_8
identical

**A wrong answer (writing 'equal') reveals the student near-synonym slip - the walkthrough's word for the identical rows is identical.**

Identical is the walkthrough's word for the rows of desks and chairs.

Identical is the walkthrough's word for the assembly rows of desks and chairs.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
Can apply the division lemma method to find the HCF of large numbers through repeated division and interpret why the process stops when the remainder becomes zero.

**A wrong answer (one division only) reveals the student stopped mid-chain - mastery requires repeating until the remainder dies and interpreting why the process halts there.**

Loop until zero, then interpret the halt - the mastery's full arc.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Imagine you are a school event ______ dividing 156 long wooden desks and 96 plastic chairs into exact, identical rows for an assembly, leaving no leftovers of either type.

## DIAGNOSTIC_ANSWER_10
coordinator

**A wrong answer (writing 'teacher') reveals the student swapped the organiser - the walkthrough's coordinator divides the desks and chairs, and the blank names that role.**

Coordinator is the role that divides the desks and chairs into rows.

