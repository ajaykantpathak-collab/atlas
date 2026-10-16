## ELI5
Cube root asks the reverse question: which number, multiplied by itself three times, built this? If twenty-seven is three × three × three, then the cube root of twenty-seven is three. Cubing packs a number into a box; cube root opens the box and hands the side back. The two operations undo each other, like buttoning and unbuttoning the same coat. And a neat symmetry: a negative volume cannot come from a positive side, so the cube root of a negative number is negative — three negative factors multiply to a negative.

## DEFINITION
The cube root of a number is the value that, when multiplied by itself three times, gives the original number. If \(a^3 = b\), then \(\sqrt[3]{b} = a\); this inverse relationship means cubing and taking the cube root undo each other.
## COGNITIVE_LEVEL
understand
## MASTERY_CRITERIA
The student can find the cube root of a perfect cube using prime factorisation and the inverse relationship, explain why the cube root of a negative number is negative, and apply the concept to solve volume problems where the side length of a cube is unknown.
## SCOPE_BOUNDARY
This node covers perfect cubes up to 6-digit numbers and their integer cube roots using prime factorisation and estimation; it does not cover cube roots of non-perfect cubes, decimal cube roots, or algebraic expressions with variables.
## WALKTHROUGH
Imagine you have a cubical box that can hold exactly 1,728 cubic centimetres of sand. To find the length of each side of the box, you need to know which number multiplied by itself three times gives 1,728. This is the inverse of finding the volume of a cube, which you learned in Class 6 (c6_math_ch08_091). Start by writing the volume as a product of prime factors, then group them in triplets. The product of one factor from each triplet is the side length. This process shows that finding the cube root is the reverse operation of cubing a number.

Takeaway: cubing and cube-rooting are inverse operations; find cube roots of perfect cubes by prime factorisation — triplets grouped, one factor from each triplet multiplied. Exam format: expect volume word problems ('the volume is given, find the side') and negative inputs; the volume-to-side setup is the tested move. Verification beat: cube your answer — it must return the original number exactly, sign included. Why students miss it: they take the square root instead of the cube root when the word 'root' appears alone, or drop the minus sign — cubing three negative factors stays negative, so the root must stay negative too.

## DIAGNOSTIC_QUESTION_1
What is the cube root of 343, and how do you know it is the cube root without using a calculator?
## DIAGNOSTIC_ANSWER_1
The cube root of 343 is 7 because \(7 \times 7 \times 7 = 343\). A wrong answer like 49 (which is \(7^2\)) reveals the student confuses square roots with cube roots, or they might answer 3 because they think the cube root divides by 3, showing a fundamental misunderstanding of the inverse operation.
## DIAGNOSTIC_QUESTION_2
Explain why \(\sqrt[3]{-216} = -6\) but \(\sqrt{-216}\) is not a real number. What does this tell you about the difference between square roots and cube roots of negative numbers?
## DIAGNOSTIC_ANSWER_2
\(\sqrt[3]{-216} = -6\) because \((-6) \times (-6) \times (-6) = -216\). A negative number multiplied three times stays negative, so the cube root of a negative is negative. A wrong answer claiming both are undefined or both are real shows the student has not grasped that odd roots preserve the sign while even roots do not exist for negatives in real numbers.
## DIAGNOSTIC_QUESTION_3
Find the cube root of 13,824 using prime factorisation. Show all steps.
## DIAGNOSTIC_ANSWER_3
Prime factorisation: \(13,824 = 2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 3 \times 3 \times 3 = (2^3)^3 \times 3^3\). Group into triplets: \((2^3) \times (2^3) \times (2^3) \times (3^3)\). Take one factor from each triplet: \(2 \times 2 \times 2 \times 3 = 24\). So \(\sqrt[3]{13,824} = 24\). A wrong answer like 12 (missing a triplet of 2) reveals the student cannot correctly group factors into triplets or miscounts the number of factors.
## DIAGNOSTIC_QUESTION_4
A student claims that if you double a number, its cube also doubles. Use the relationship between a number and its cube to prove whether this is true or false. Give a numerical example.
## DIAGNOSTIC_ANSWER_4
False. If the number is \(n\), its cube is \(n^3\). Doubling the number gives \(2n\), and its cube is \((2n)^3 = 8n^3\), which is 8 times the original cube, not 2 times. For example, \(3^3 = 27\); double 3 is 6, and \(6^3 = 216 = 8 \times 27\). A student who says it's true is applying linear thinking to a cubic relationship, confusing multiplication by 2 with raising to the power 3.
## DIAGNOSTIC_QUESTION_5
Ravi says \(\sqrt[3]{8000} = 20\) because \(20^3 = 8000\). Priya says \(\sqrt[3]{8000} = 200\) because \(8000 \div 40 = 200\). Evaluate both methods and justify which is correct.
## DIAGNOSTIC_ANSWER_5
Ravi is correct. The cube root is defined as the number which when cubed gives the original number; \(20^3 = 8000\) verifies this. Priya's method uses division by 40, which has no mathematical basis for cube roots. A student who supports Priya confuses cube root with division or misapplies a pattern from square roots (where \(\sqrt{100} = 10\) and \(100 \div 10 = 10\)), showing they do not understand the inverse operation definition.
## DIAGNOSTIC_QUESTION_6
Create a real-life problem (using Indian context: rupees, metres, litres) where finding a cube root is necessary to solve it. The problem must involve a perfect cube between 1,000 and 10,000.
## DIAGNOSTIC_ANSWER_6
Example: A school wants to store 4,096 litres of water in a cubical tank. What should be the side length of the tank in metres? (Note: 1 m³ = 1000 litres). Solution: Volume = 4.096 m³. Side = \(\sqrt[3]{4.096} = \sqrt[3]{4096/1000} = \sqrt[3]{4096}/\sqrt[3]{1000} = 16/10 = 1.6\) m. A poor answer might give a problem requiring square root or use a non-perfect cube, showing the student cannot distinguish between area (square) and volume (cube) contexts or identify perfect cubes.
## COMMON_MISCONCEPTION
Students often think the cube root of a number is found by dividing the number by 3 (e.g., \(\sqrt[3]{27} = 9\)) because they confuse the exponent 3 with the operation of division. They also incorrectly apply the square root pattern to cube roots, such as assuming \(\sqrt[3]{a^3 + b^3} = a + b\) (e.g., \(\sqrt[3]{8+27} = 2+3 = 5\) instead of \(\sqrt[3]{35} \approx 3.27\)). Another error is writing \(\sqrt[3]{-64} = 4\) (ignoring the negative sign) because they think roots are always positive, not realising odd roots preserve the sign.
## ON_FAILURE
If a student divides by 3, ask: "If \(\sqrt[3]{27} = 9\), then \(9^3\) should be 27. What is \(9^3\)?" Let them compute \(9 \times 9 \times 9 = 729\) and see the contradiction. Then guide them to find which number cubed gives 27 by testing small integers. For the sign error, have them compute \((-4)^3\) step by step: \((-4) \times (-4) = 16\), then \(16 \times (-4) = -64\). Emphasise that three negatives multiply to a negative, so the cube root of a negative must be negative. For the distributive error, show \(\sqrt[3]{8+27} = \sqrt[3]{35}\) and compare with \(\sqrt[3]{8} + \sqrt[3]{27} = 5\); they are not equal, so the root does not distribute over addition.
## PREREQUISITE_NODE_IDS
c8_math_ch1_10, c8_math_ch1_11, c6_math_ch01_015, c7_math_ch11_004, c8_math_ch1_8
## PREREQUISITE_REASONS
c8_math_ch1_10: Defines cube numbers and notation \(n^3\), which is the forward operation for cube roots.
c8_math_ch1_11: Teaches properties of perfect cubes (e.g., ending digits, prime factor triplets) needed to identify perfect cubes and factorise them.
c6_math_ch01_015: Prime factorisation method is essential for finding cube roots of larger perfect cubes systematically.
c7_math_ch11_004: Reinforces prime factorisation technique for HCF, which is the same skill used for grouping factors in triplets.
c8_math_ch1_8: Square roots provide the analogous inverse operation for squares, helping students understand the concept of inverse operations and the difference between even and odd roots.
## FORWARD_NODE_IDS
N/A

## FORWARD_REASONS
This is the final node in Chapter 1 (A Square and a Cube). No subsequent nodes in this chapter depend on it.
## CROSS_SUBJECT_PREREQS
c6_math_ch08_091, c6_math_ch08_092, c7_math_ch12_006
## CROSS_SUBJECT_REASONS
c6_math_ch08_091: Volume of a cube is side³; finding side from volume requires cube root, directly applying this node.
c6_math_ch08_092: Surface area of a cube is 6 × side²; if volume is given, cube root finds side first, then surface area.
c7_math_ch12_006: Shifting decimal points when multiplying/dividing by powers of 10 is used when finding cube roots of decimals (e.g., \(\sqrt[3]{0.008} = 0.2\)) in higher classes, building on decimal place value understanding.
## CHAIN_DESCRIPTION
c8_math_ch1_10 -> c8_math_ch1_11 -> c8_math_ch1_12 -> none
## THIS_FORMULA
\(\sqrt[3]{a^3} = a\) and \((\sqrt[3]{b})^3 = b\) for any real number \(a\) and any real number \(b\). For a perfect cube \(N = p^3\), \(\sqrt[3]{N} = p\).
## FORMULA_VARIABLES
\(a\) = any real number (the base), \(b\) = any real number (the cube), \(N\) = a perfect cube integer, \(p\) = integer cube root of \(N\)
## FORMULA_UNITS
dimensionless
## COMPUTATION_TYPE
algebraic
## CROSS_SUBJECT

## PREREQ_CONCEPT
Prime factorisation and the concept of inverse operations (cubing vs cube root).
## PREREQ_BEFORE
The student must be able to prime factorise numbers up to 6 digits and understand that \(n^3 = n \times n \times n\).
## PREREQ_STUCK
Revisit prime factorisation (c6_math_ch01_015) and the definition of cube numbers (c8_math_ch1_10) to practise writing numbers as products of triplets.
## WORKED_EXAMPLE_1
PROBLEM: A cubical gift box has a volume of 2,744 cubic centimetres. What is the length of each side of the box?
STEPS:
- Step 1: Identify that volume of a cube = side³. Given volume = 2,744 cm³. We need side = \(\sqrt[3]{2,744}\).
- Step 2: Perform prime factorisation of 2,744. Divide by 2: 2,744 ÷ 2 = 1,372; ÷ 2 = 686; ÷ 2 = 343. So 2,744 = 2³ × 343.
- Step 3: Factorise 343. 343 ÷ 7 = 49; 49 ÷ 7 = 7; 7 ÷ 7 = 1. So 343 = 7³.
- Step 4: Combine: 2,744 = 2³ × 7³ = (2 × 7)³ = 14³.
- Step 5: Therefore, \(\sqrt[3]{2,744} = 14\). The side length is 14 cm.
REASONING: The volume of a cube is the cube of its side length. Finding the side from the volume is the inverse operation, which is the cube root. Prime factorisation groups factors into triplets; each triplet contributes one factor to the cube root.
ANSWER: 14 cm
## WORKED_EXAMPLE_2
PROBLEM: Find the smallest number by which 3,087 must be multiplied to make it a perfect cube. Also find the cube root of the resulting number.
STEPS:
- Step 1: Prime factorise 3,087. 3,087 ÷ 3 = 1,029; ÷ 3 = 343. So 3,087 = 3² × 343.
- Step 2: Factorise 343 = 7³. So 3,087 = 3² × 7³.
- Step 3: For a perfect cube, every prime factor must appear in triplets. Here 3 appears twice (needs one more 3), 7 appears three times (already a triplet).
- Step 4: Multiply by 3 to complete the triplet: 3,087 × 3 = 3³ × 7³ = (3 × 7)³ = 21³.
- Step 5: The smallest multiplier is 3. The resulting perfect cube is 9,261. Its cube root is 21.
REASONING: A perfect cube's prime factorisation has exponents that are multiples of 3. We identify missing factors to complete triplets. The cube root of the product is the product of one factor from each triplet.
ANSWER: Multiply by 3; cube root of result = 21
## WORKED_EXAMPLE_3
PROBLEM: A school stores 5,832 litres of rainwater in a cubical tank. If 1 cubic metre = 1,000 litres, find the side length of the tank in metres.
STEPS:
- Step 1: Convert litres to cubic metres: 5,832 litres = 5,832 ÷ 1,000 = 5.832 m³.
- Step 2: Recognise 5.832 = 5,832/1,000. Find cube root: \(\sqrt[3]{5.832} = \sqrt[3]{5,832} / \sqrt[3]{1,000}\).
- Step 3: Prime factorise 5,832. 5,832 ÷ 2 = 2,916; ÷ 2 = 1,458; ÷ 2 = 729. So 5,832 = 2³ × 729.
- Step 4: Factorise 729 = 9³ = (3²)³ = 3⁶. So 729 = 3³ × 3³ = (3 × 3)³? Wait: 3⁶ = (3²)³ = 9³. Better: 729 = 3⁶ = (3²)³. So 5,832 = 2³ × 3⁶ = 2³ × (3²)³ = (2 × 3²)³ = (2 × 9)³ = 18³.
- Step 5: \(\sqrt[3]{5,832} = 18\). \(\sqrt[3]{1,000} = 10\). So side = 18/10 = 1.8 m.
- Step 6: Verify: 1.8³ = 5.832 m³ = 5,832 litres. Correct.
REASONING: This combines unit conversion (litres to m³) with cube root of a decimal by separating numerator and denominator. The cube root of a fraction is the fraction of cube roots. Prime factorisation of 5,832 reveals it is 18³, and 1,000 is 10³.
ANSWER: 1.8 m
## COMPETENCY_QUESTION_1
QUESTION: A student writes \(\sqrt[3]{125 \times 64} = \sqrt[3]{125} \times \sqrt[3]{64} = 5 \times 4 = 20\). Another student writes \(\sqrt[3]{125 + 64} = \sqrt[3]{125} + \sqrt[3]{64} = 5 + 4 = 9\). Which student is correct? Explain why the cube root distributes over multiplication but not over addition, using the definition of cube root.
COMPETENCY: Comparing and justifying mathematical properties
STEPS:
- Step 1: Compute \(\sqrt[3]{125 \times 64}\) directly: 125 × 64 = 8,000; \(\sqrt[3]{8,000} = 20\).
- Step 2: Compute \(\sqrt[3]{125} \times \sqrt[3]{64} = 5 \times 4 = 20\). They match.
- Step 3: Compute \(\sqrt[3]{125 + 64} = \sqrt[3]{189}\). 5³=125, 6³=216, so \(\sqrt[3]{189}\) is between 5 and 6, not 9.
- Step 4: Explain: \((ab)^3 = a^3 b^3\), so \(\sqrt[3]{a^3 b^3} = ab = \sqrt[3]{a^3} \sqrt[3]{b^3}\). But \((a+b)^3 \neq a^3 + b^3\), so cube root does not distribute over addition.
ANSWER: The first student is correct. Cube root distributes over multiplication because cubing distributes over multiplication: \((ab)^3 = a^3b^3\). It does not distribute over addition because \((a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3 \neq a^3 + b^3\).
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: The volume of a cubical box is 15,625 cm³. The box is to be painted on the outside at a cost of ₹5 per cm². Find the total cost of painting the box.
COMPETENCY: Translating real-world situations to mathematical expressions and multi-step problem solving
STEPS:
- Step 1: Find side length: \(\sqrt[3]{15,625}\). Factorise: 15,625 ÷ 5 = 3,125; ÷ 5 = 625; ÷ 5 = 125; ÷ 5 = 25; ÷ 5 = 5; ÷ 5 = 1. So 15,625 = 5⁶ = (5²)³ = 25³. Side = 25 cm.
- Step 2: Find surface area of cube: 6 × side² = 6 × 25² = 6 × 625 = 3,750 cm².
- Step 3: Calculate cost: 3,750 cm² × ₹5/cm² = ₹18,750.
- Step 4: Verify: Volume = 25³ = 15,625. Surface area = 6×625 = 3,750. Cost = 3,750 × 5 = 18,750.
ANSWER: ₹18,750
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The cube root of a number is the value that, when ______ by itself three times, gives the original number.

## DIAGNOSTIC_ANSWER_7
multiplied

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you have a cubical box that can hold exactly 1,728 cubic ______ of sand.

## DIAGNOSTIC_ANSWER_8
centimetres

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can find the cube root of a perfect cube using prime factorisation and the inverse relationship, explain why the cube root of a negative number is negative, and apply the concept to solve volume problems where the side length of a cube is unknown.
