## ELI5
Add the odd numbers in order and watch the totals: one, then four, then nine, then sixteen. Those are squares — one squared, two squared, three squared, four squared. Each new odd number is an L-shaped strip of tiles wrapping the previous square to grow it into the next one. So the sum of the first n odd numbers is exactly n squared, no arithmetic accident but a picture: squares are literally built from nested L-shapes, and each odd number is one more layer of the staircase.

## DEFINITION
The sum of the first n consecutive odd natural numbers starting from 1 equals the perfect square n². Mathematically, 1 + 3 + 5 + ... + (2n - 1) = n² for any natural number n.
## COGNITIVE_LEVEL
understand
## MASTERY_CRITERIA
The student can explain why the sum of consecutive odd numbers forms perfect squares using visual or algebraic reasoning, and can determine whether a given number is a perfect square by checking if it can be expressed as such a sum. They can also find the number of terms needed to reach a given perfect square.
## SCOPE_BOUNDARY
This node covers the pattern that summing consecutive odd numbers from 1 produces perfect squares, and using this to identify perfect squares. It does NOT cover the subtraction method for checking perfect squares (covered in c8_math_ch1_6) or the relationship with triangular numbers (covered in c8_math_ch1_7).
## WALKTHROUGH
Imagine you are arranging square tiles to make larger squares. You start with 1 tile (a 1×1 square). To make a 2×2 square, you add 3 tiles around it. To make a 3×3 square, you add 5 more tiles. This pattern of adding 1, then 3, then 5, then 7 tiles continues. Notice that the numbers added are consecutive odd numbers, and each new total is a perfect square. We can write this as: 1 = 1², 1+3 = 4 = 2², 1+3+5 = 9 = 3². The key insight is that the nth odd number is (2n-1), and the sum of the first n odd numbers equals n².

Takeaway: 1 + 3 + 5 + … + (2n − 1) = n²; the nth odd number is 2n − 1 and each one wraps the previous square with an L-strip of tiles. Exam format: expect 'express a square as a sum of consecutive odd numbers' and 'how many odd terms sum to a given square?' — the count of terms is the square root. Verification beat: check the final term — for n², the last odd number added must be 2n − 1. Why students miss it: they sum even numbers by mistake or stop one term short; the tile picture shows each L must add exactly the next odd count of new tiles.

## DIAGNOSTIC_QUESTION_1
What is the sum of the first 5 consecutive odd numbers starting from 1?
## DIAGNOSTIC_ANSWER_1
The sum is 25. The first 5 odd numbers are 1, 3, 5, 7, 9. Their sum is 1+3+5+7+9 = 25 = 5². A wrong answer like 20 or 30 reveals the student either miscounted the odd numbers, added incorrectly, or does not recall the pattern that the sum equals the square of the count of terms.
## DIAGNOSTIC_QUESTION_2
Explain why 1 + 3 + 5 + 7 = 16 using a visual or geometric argument.
## DIAGNOSTIC_ANSWER_2
Start with a 1×1 square (1 dot). Add 3 dots to form a 2×2 square. Add 5 dots to form a 3×3 square. Add 7 dots to form a 4×4 square. The total dots = 16 = 4². Each new odd number adds an L-shaped "gnomon" around the previous square. A wrong answer that just states "it's the formula" without geometric reasoning shows the student memorised the pattern but does not understand the structural reason why it works.
## DIAGNOSTIC_QUESTION_3
Find the value of n if 1 + 3 + 5 + ... + (2n-1) = 121.
## DIAGNOSTIC_ANSWER_3
The sum of the first n odd numbers is n². So n² = 121. Taking square root, n = 11 (since n is natural). Check: 11th odd number = 2(11)-1 = 21. Sum = 1+3+5+...+21 = 11² = 121. A wrong answer like n = 121 or n = 60 reveals the student does not connect the sum to n², or confuses the last term (2n-1) with the number of terms n.
## DIAGNOSTIC_QUESTION_4
Compare the sum of the first 10 odd numbers with the sum of the first 10 even numbers. Which is larger and by how much?
## DIAGNOSTIC_ANSWER_4
Sum of first 10 odd numbers = 10² = 100. Sum of first 10 even numbers = 2+4+6+...+20 = 2(1+2+3+...+10) = 2×55 = 110. The even sum is larger by 10. A wrong answer claiming they are equal or odd sum is larger reveals the student does not know the formula for sum of first n even numbers (n(n+1)) or cannot compare n² with n(n+1).
## DIAGNOSTIC_QUESTION_5
A student claims that 1 + 3 + 5 + 7 + 9 + 11 = 36 because "6 odd numbers sum to 6² = 36". Is this correct? Evaluate the reasoning.
## DIAGNOSTIC_ANSWER_5
Yes, the answer 36 is correct and the reasoning is valid. The sum of the first 6 odd numbers is indeed 6² = 36. The terms listed (1,3,5,7,9,11) are exactly the first 6 odd numbers. A wrong evaluation saying "incorrect" might stem from the student miscounting terms (e.g., thinking 11 is the 5th odd number) or not verifying the list matches "first n odd numbers".
## DIAGNOSTIC_QUESTION_6
Create a real-world problem where finding the sum of consecutive odd numbers helps solve it. Use an Indian context (rupees, metres, tiles, etc.).
## DIAGNOSTIC_ANSWER_6
Example: "Ravi arranges square tiles to make a square patio. He starts with 1 tile, then adds tiles around it to make a 2×2 square, then a 3×3 square, and so on. If he makes a 12×12 square patio, how many tiles did he add in the last step?" Good answer: The last step adds the 12th odd number = 2×12-1 = 23 tiles. A poor answer that gives total tiles (144) instead of the last addition reveals the student cannot distinguish between the sum and the nth term.
## COMMON_MISCONCEPTION
Students often confuse the nth odd number (2n-1) with the number of terms n. For example, when asked "How many odd numbers sum to 49?", they might answer 49 (the last term) instead of 7 (the count). They also incorrectly assume any sum of odd numbers gives a square, e.g., 3+5+7=15, not a square, because it doesn't start from 1.
## ON_FAILURE
If a student confuses n with (2n-1), have them write the sequence explicitly: "1st odd = 1, 2nd odd = 3, 3rd odd = 5, ... nth odd = 2n-1". Then ask: "For sum = 49, which n gives n²=49?" Guide them to n=7. Then verify: 7th odd = 13, sum = 1+3+5+7+9+11+13 = 49. Emphasise: the pattern ONLY works when starting from 1 and taking consecutive odds.
## PREREQUISITE_NODE_IDS
c8_math_ch1_1, c8_math_ch1_2, c7_math_ch06_002, c7_math_ch06_003, c6_math_ch12_121
## PREREQUISITE_REASONS
c8_math_ch1_1: Student must know what a square number is (n² notation) before understanding sums that produce them.
c8_math_ch1_2: Understanding perfect squares and their properties helps recognise the results of the sums.
c7_math_ch06_002: Parity concepts (odd/even) are essential to identify and generate consecutive odd numbers.
c7_math_ch06_003: Rules for sum of odd numbers provide the foundation for this specific pattern.
c6_math_ch12_121: General number pattern recognition skills help students see and extend the sequence.
## FORWARD_NODE_IDS
c8_math_ch1_6, c8_math_ch1_7, c8_math_ch1_8
## FORWARD_REASONS
c8_math_ch1_6: The subtraction method for checking perfect squares directly uses this sum pattern (repeatedly subtracting odd numbers).
c8_math_ch1_7: The relationship between perfect squares and triangular numbers builds on this odd-number sum pattern.
c8_math_ch1_8: Understanding that n² is the sum of n odds helps develop the concept of square roots as "how many odds were added".
## CROSS_SUBJECT_PREREQS
c6_math_ch08_087, c7_math_ch14_006
## CROSS_SUBJECT_REASONS
c6_math_ch08_087: Area of squares (side²) connects geometrically to the visual proof of this pattern (adding gnomons).
c7_math_ch14_006: Tiling patterns with squares demonstrate the physical arrangement of odd-number gnomons around a central square.
## CHAIN_DESCRIPTION
c8_math_ch1_1 -> c8_math_ch1_5 -> c8_math_ch1_6
## THIS_FORMULA
1 + 3 + 5 + ... + (2n - 1) = n²
## FORMULA_VARIABLES
n = number of terms (a natural number), (2n-1) = the nth odd number, n² = the resulting perfect square
## FORMULA_UNITS
dimensionless (count of numbers, pure numbers)
## COMPUTATION_TYPE
arithmetic
## CROSS_SUBJECT
c8_physics_ch2_3 | The concept of summing discrete increments to get a total (like displacement from velocity steps) mirrors summing odd numbers to get squares.
c8_eco_ch1_2 | Compound growth patterns where each step adds an increasing amount relate to the increasing odd numbers in this sum.
## PREREQ_CONCEPT
Understanding that the nth odd number is given by 2n-1 and that squaring a number means multiplying it by itself.
## PREREQ_BEFORE
The student must be able to generate consecutive odd numbers and compute squares of numbers up to at least 15.
## PREREQ_STUCK
Review the formula for the nth odd number (2n-1) and practice squaring numbers 1-15 until fluent.
## WORKED_EXAMPLE_1
PROBLEM: A mason is building a square courtyard using square stone slabs. He starts with 1 slab in the centre. For each new layer, he adds slabs around the existing square to make the next larger square. If the final courtyard is 15 slabs by 15 slabs, how many slabs did he add in the 15th layer?

STEPS:
- Step 1: Identify what is given - final square is 15×15, so n = 15 layers total. The first layer is 1 slab (1×1). Each new layer adds an odd number of slabs.
- Step 2: Recall the pattern - the kth layer adds the kth odd number of slabs. The kth odd number = 2k - 1.
- Step 3: For the 15th layer, k = 15. Calculate the 15th odd number: 2(15) - 1 = 30 - 1 = 29.
- Step 4: Verify using the sum formula - total slabs in 15×15 courtyard = 15² = 225. Sum of first 14 odd numbers = 14² = 196. Difference = 225 - 196 = 29 slabs added in the 15th layer.
- Step 5: Interpret the answer - the mason added 29 slabs in the final (15th) layer to complete the 15×15 courtyard.

REASONING: Each layer forms a "gnomon" (L-shape) around the previous square. The number of slabs in each gnomon follows the odd number sequence because expanding an (n-1)×(n-1) square to n×n requires adding n slabs along one side, n-1 along the other, and 1 at the corner = 2n-1 slabs.

ANSWER: 29 slabs
## WORKED_EXAMPLE_2
PROBLEM: Find the smallest number of consecutive odd numbers starting from 1 that must be added to get a sum greater than 500.

STEPS:
- Step 1: Identify the goal - find the smallest n such that sum of first n odd numbers > 500.
- Step 2: Use the formula - sum of first n odd numbers = n². So we need n² > 500.
- Step 3: Find the smallest integer n whose square exceeds 500. 22² = 484 (not > 500). 23² = 529 (> 500).
- Step 4: Verify - sum of first 22 odd numbers = 22² = 484 ≤ 500. Sum of first 23 odd numbers = 23² = 529 > 500.
- Step 5: State the answer - 23 consecutive odd numbers are needed.

REASONING: Since the sum of the first n odd numbers equals n² exactly, the problem reduces to finding the smallest n with n² > 500. This is a direct application of the formula in an inequality context.

ANSWER: 23 odd numbers
## WORKED_EXAMPLE_3
PROBLEM: A school auditorium has chairs arranged in a square formation. The principal wants to add more chairs to make a larger square, but only has 195 extra chairs. What is the largest square formation she can make by adding these chairs to the existing square? (Assume the current formation is also a perfect square.)

STEPS:
- Step 1: Let the current square be k×k chairs, so k² chairs. The new square will be n×n chairs, with n > k.
- Step 2: The chairs added = n² - k² = 195. Factor: (n-k)(n+k) = 195.
- Step 3: Factor 195 = 3 × 5 × 13. Possible factor pairs for (n-k) and (n+k): (1,195), (3,65), (5,39), (13,15).
- Step 4: For each pair, solve for n and k. Since n+k > n-k > 0 and both have same parity:
  - (1,195): n=98, k=97 (both integers, valid)
  - (3,65): n=34, k=31 (valid)
  - (5,39): n=22, k=17 (valid)
  - (13,15): n=14, k=1 (valid)
- Step 5: The largest possible new square is 98×98 (using the 1,195 pair). But check if this uses exactly 195 chairs: 98² - 97² = 9604 - 9409 = 195. Yes.
- Step 6: However, the problem asks for the largest square she can make by adding chairs to an EXISTING square. The existing square must be reasonable for a school auditorium. 97×97 = 9409 chairs is unrealistic. The next largest is 34×34 = 1156 chairs (existing 31×31 = 961). This is more realistic.

REASONING: This combines the sum of odds pattern (n² - k² = sum of odds from (2k+1) to (2n-1)) with factoring and real-world constraints. The difference of squares factorisation (n-k)(n+k) directly relates to the sum of consecutive odd numbers.

ANSWER: 34×34 square formation (1156 chairs total, added 195 to existing 31×31 = 961 chairs)
## COMPETENCY_QUESTION_1
QUESTION: Explain why the sum of any 5 consecutive odd numbers (not necessarily starting from 1) is always divisible by 5. Use algebraic reasoning.

COMPETENCY: Translating real-world situations to mathematical expressions

STEPS:
- Step 1: Let the first odd number be (2k+1) where k is an integer ≥ 0.
- Step 2: The 5 consecutive odd numbers are: (2k+1), (2k+3), (2k+5), (2k+7), (2k+9).
- Step 3: Sum = (2k+1) + (2k+3) + (2k+5) + (2k+7) + (2k+9) = 10k + 25.
- Step 4: Factor: 10k + 25 = 5(2k + 5).
- Step 5: Since (2k+5) is an integer, the sum is 5 times an integer, hence divisible by 5.

ANSWER: The sum of any 5 consecutive odd numbers is 5(2k+5), which is clearly a multiple of 5, hence divisible by 5. This generalises: the sum of any n consecutive odd numbers is divisible by n.

DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: A pattern of dots forms squares: 1 dot, then 4 dots (2×2), then 9 dots (3×3), etc. The difference between consecutive squares gives the sequence of odd numbers: 4-1=3, 9-4=5, 16-9=7, etc. Using this pattern, find a formula for the sum of odd numbers from (2a+1) to (2b-1) inclusive, where b > a ≥ 0. Then use it to find the sum of odd numbers from 11 to 39 inclusive.

COMPETENCY: Comparing and justifying

STEPS:
- Step 1: Recognise that sum of first b odd numbers = b², and sum of first a odd numbers = a².
- Step 2: The odd numbers from (2a+1) to (2b-1) are the (a+1)th through bth odd numbers.
- Step 3: Their sum = (sum of first b odds) - (sum of first a odds) = b² - a².
- Step 4: For the given problem: 11 is the 6th odd number (2×6-1=11), so a+1=6, a=5. 39 is the 20th odd number (2×20-1=39), so b=20.
- Step 5: Sum = 20² - 5² = 400 - 25 = 375.
- Step 6: Verify: 11+13+15+...+39. Number of terms = 20-5 = 15. Average = (11+39)/2 = 25. Sum = 15×25 = 375.

ANSWER: The formula is b² - a². The sum of odd numbers from 11 to 39 inclusive is 375.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The sum of the first n ______ odd natural numbers starting from 1 equals the perfect square n².

## DIAGNOSTIC_ANSWER_7
consecutive

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are arranging square tiles to make larger ______.

## DIAGNOSTIC_ANSWER_8
squares

## DIAGNOSTIC_QUESTION_9
Fill in the blank: The sum of the first n consecutive odd natural numbers starting from ______ equals the perfect square n².

## DIAGNOSTIC_ANSWER_9
1

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
The student can explain why the sum of consecutive odd numbers forms perfect squares using visual or algebraic reasoning, and can determine whether a given number is a perfect square by checking if it can be expressed as such a sum.

## DIAGNOSTIC_QUESTION_11
Fill in the blank: Imagine you are ______ square tiles to make larger squares.

## DIAGNOSTIC_ANSWER_11
arranging
