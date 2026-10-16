## ELI5
Seventy-two red ribbons and ninety blue ones want the longest matching pieces, and listing every factor of both is tedious - so break each number into its prime bricks instead. Write each as a product of primes, keep only the primes both share, take each shared prime's lowest power, and multiply: that product is the HCF. The lowest power is the law, because the HCF must fit inside both numbers. Big numbers surrender quickly once they are built from primes.

## DEFINITION
The Prime Factorisation Method for finding the Highest Common Factor (HCF) involves expressing each given number as a product of its prime factors, and then finding the product of the lowest powers of all common prime factors. This method breaks down large numbers into their fundamental building blocks to efficiently find the greatest common divisor without listing all individual factors.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
Can find the HCF of two or three numbers (up to 3 digits each) by systematically writing out their prime factorisation using factor trees or division bars, identifying common prime factors, and multiplying their lowest powers to determine the correct HCF.
## SCOPE_BOUNDARY
Covers finding the HCF of two or more natural numbers using prime factorisation. It does not cover algebraic expressions, polynomials, or the Euclidean Division Method for HCF.
## WALKTHROUGH
Imagine you are organizing a school cultural festival and have 72 red ribbons and 90 blue ribbons. You want to cut them into pieces of equal length without any ribbons left over, and you want each piece to be as long as possible. To figure out the maximum possible length, you need to find the highest common factor of 72 and 90. Listing every single factor manually for large numbers is time-consuming and prone to missing factors. Instead, we can build on what you learned in Class 6 about factor trees and divisibility rules to break each number down into pure prime numbers. The key insight is that any number's hidden structure is revealed through its prime factorisation, and the HCF is simply built from the shared prime building blocks raised to their lowest common powers.

**Takeaway:** prime factorisation finds the HCF by multiplying the lowest powers of the shared primes. **In the exam:** factor-tree each number, circle common primes, take lowest powers, multiply - in that order. **Check yourself:** prime-factorise both ribbon counts and rebuild the HCF from the circled bricks. **Why students miss it:** they grab the highest powers and build the LCM while calling it the HCF.

## DIAGNOSTIC_QUESTION_1
What is the prime factorisation of the number 72 expressed in exponential form?
## DIAGNOSTIC_ANSWER_1
The correct answer is $2^3 \times 3^2$. A student who answers $2^2 \times 3^3$ has confused the exponents of the prime bases 2 and 3, likely by miscounting how many times 2 and 3 divide into 72 during repeated division. Another common wrong answer is $8 \times 9$, which shows a failure to recognize that prime factorisation requires *prime* numbers only, whereas 8 and 9 are composite numbers.
## DIAGNOSTIC_QUESTION_2
When finding the HCF of two numbers using prime factorisation, why do we select the lowest power of the common prime factors rather than the highest power?
## DIAGNOSTIC_ANSWER_2
The correct answer is that the HCF must be a factor of *both* numbers, meaning it can only contain prime factors that appear in both numbers, and it can only use each prime factor up to the maximum number of times it is guaranteed to divide evenly into *both* numbers. A student who chooses the highest power is confusing the rule for HCF with the rule for LCM (Lowest Common Multiple). Choosing the highest power would yield a multiple or a number too large to divide the original numbers.
## DIAGNOSTIC_QUESTION_3
Find the HCF of 54 and 72 using the prime factorisation method. Show your prime factorisation steps clearly.
## DIAGNOSTIC_ANSWER_3
The correct answer is 18. Working steps: First, find the prime factorisation of 54: $54 = 2 \times 27 = 2 \times 3 \times 3 \times 3 = 2^1 \times 3^3$. Next, find the prime factorisation of 72: $72 = 2 \times 36 = 2 \times 2 \times 18 = 2^3 \times 3^2$. The common prime factors are 2 and 3. The lowest power of 2 is $2^1$ and the lowest power of 3 is $3^2$. Multiplying these gives $2^1 \times 3^2 = 2 \times 9 = 18$. A student who answers 6 or 3 has failed to take the *lowest power* of all common factors or stopped factorisation too early.
## DIAGNOSTIC_QUESTION_4
Compare the Prime Factorisation Method and the Listing Factors Method for finding the HCF of 360 and 420. Which method is more efficient and why?
## DIAGNOSTIC_ANSWER_4
The Prime Factorisation Method is significantly more efficient. Listing all factors of large numbers like 360 and 420 is tedious, prone to human error, and easy to miss pairs of factors. Prime factorisation breaks each number down systematically using divisibility rules, allowing us to find the common factors cleanly through index notation. A student who claims listing is better likely struggles with division rules or lacks confidence in handling exponents.
## DIAGNOSTIC_QUESTION_5
A student calculated the HCF of 48 and 60 as follows: $48 = 2^4 \times 3^1$ and $60 = 2^2 \times 3^1 \times 5^1$. The student then stated that the HCF is $2^4 \times 3^1 \times 5^1 = 240$. Evaluate this solution and identify the exact error made.
## DIAGNOSTIC_ANSWER_5
The student's solution is incorrect because 240 is actually the *LCM* (Lowest Common Multiple), not the HCF. The student made two major errors: first, they picked the *highest* powers ($2^4$) instead of the lowest powers ($2^2$) for the common prime factors; second, they included the non-common factor 5, which belongs to the calculation of LCM, not HCF. The correct HCF is $2^2 \times 3^1 = 12$. A student who agrees with the student's work does not understand the fundamental difference between the purpose of HCF (divisors) and LCM (multiples).
## DIAGNOSTIC_QUESTION_6
Create a pair of numbers between 50 and 100 whose HCF calculated by prime factorisation is exactly 14. Show the prime factorisation of your chosen numbers to prove your work.
## DIAGNOSTIC_ANSWER_6
An example of valid numbers is 70 and 84. Proof: $70 = 2^1 \times 5^1 \times 7^1$ and $84 = 2^2 \times 3^1 \times 7^1$. The common prime factors are 2 and 7, with lowest powers $2^1$ and $7^1$. Their product is $2 \times 7 = 14$. Both numbers (70 and 84) lie between 50 and 100. A poor answer would choose numbers outside the range or numbers whose prime factorisation does not yield an HCF of 14 (e.g., sharing other common factors that inflate the HCF).
## COMMON_MISCONCEPTION
Students frequently confuse the rules of HCF and LCM when selecting powers from prime factorisation. Specifically, when finding the HCF, they mistakenly select the *highest* power of common prime factors or include non-common prime factors (which is the rule for LCM), leading to an answer that is a multiple rather than a factor. For instance, for numbers with prime factorisations $2^3 \times 3^2$ and $2^2 \times 3^4$, a student might write the HCF as $2^3 \times 3^4$ instead of $2^2 \times 3^2$.
## ON_FAILURE
Remind the student that HCF stands for Highest *Common* Factor—it must be a *factor* (a number that divides evenly into the original numbers, so it cannot be larger than the numbers themselves). Ask the student: "Can a divisor be larger than the number it divides?" Guide them to look at the prime factorisation side-by-side, circle only the prime numbers that appear in *both* lists, and explicitly choose the *smaller* exponent for each circled prime. Write out the rule: "For HCF, pick COMMON bases with the LOWEST powers."
## PREREQUISITE_NODE_IDS
c6_math_ch01_013, c6_math_ch01_014, c6_math_ch01_015, c7_math_ch11_001, c7_math_ch11_002
## PREREQUISITE_REASONS
c6_math_ch01_013: provides the foundational understanding of what factors and multiples are.
c6_math_ch01_014: provides divisibility rules needed to quickly find prime factors without guessing.
c6_math_ch01_015: introduces basic prime factorisation and concept of HCF from Class 6.
c7_math_ch11_001: defines common factors of two numbers in Class 7.
c7_math_ch11_002: defines Highest Common Factor and its conceptual meaning before learning methods.
## FORWARD_NODE_IDS
c7_math_ch11_005, c7_math_ch11_009, c7_math_ch11_010, c7_math_ch11_006, c8_math_ch1_12, c8_math_ch2_6, c8_math_ch7_3
## FORWARD_REASONS
c7_math_ch11_005: builds on factor concepts to introduce the alternative Euclidean Division Method for HCF.
c7_math_ch11_009: uses prime factorisation of HCF and LCM to explore the relationship product of numbers = HCF × LCM.
c7_math_ch11_010: applies HCF calculated via prime factorisation to real-life word problems.
c7_math_ch11_006: teaches prime factorisation techniques required for advanced LCM calculations.
c8_math_ch1_12: Reinforces prime factorisation technique for HCF, which is the same skill used for grouping factors in triplets.
c8_math_ch2_6: Class 7 practice of prime factorisation method for HCF reinforces the skill
c8_math_ch7_3: Prime factorization method for HCF, an efficient technique.

## CROSS_SUBJECT_PREREQS
c6_math_ch06_062, c6_math_ch06_063
## CROSS_SUBJECT_REASONS
c6_math_ch06_062: ratio simplification relies directly on dividing both terms by their HCF.
c6_math_ch06_063: equivalent fractions and proportions require simplifying terms using common divisors.
## CHAIN_DESCRIPTION
c7_math_ch11_002 -> c7_math_ch11_004 -> c7_math_ch11_005
## THIS_FORMULA
\text{HCF}(a, b) = \prod p_i^{\min(a_i, b_i)}
## FORMULA_VARIABLES
a = first positive integer, b = second positive integer, p_i = common prime factors, a_i and b_i = exponents of prime factors in numbers a and b respectively.
## FORMULA_UNITS
dimensionless
## COMPUTATION_TYPE
arithmetic
## CROSS_SUBJECT

## PREREQ_CONCEPT
Prime numbers and index notation for repeated multiplication.
## PREREQ_BEFORE
Must be able to test divisibility of numbers up to 100 using prime numbers (2, 3, 5, 7, 11).
## PREREQ_STUCK
Review prime factorisation using division bars from c6_math_ch01_015 before attempting multi-number HCF.
## WORKED_EXAMPLE_1
PROBLEM: Find the HCF of 84 and 120 using the prime factorisation method.
STEPS:
- Step 1: Find the prime factorisation of 84 by dividing successively by prime numbers: $84 \div 2 = 42$, $42 \div 2 = 21$, $21 \div 3 = 7$, $7 \div 7 = 1$. So, prime factorisation of $84 = 2^2 \times 3^1 \times 7^1$.
- Step 2: Find the prime factorisation of 120 by dividing successively by prime numbers: $120 \div 2 = 60$, $60 \div 2 = 30$, $30 \div 2 = 15$, $15 \div 3 = 5$, $5 \div 5 = 1$. So, prime factorisation of $120 = 2^3 \times 3^1 \times 5^1$.
- Step 3: Identify the common prime bases present in both factorisations. The common prime bases are 2 and 3. (The prime 7 is only in 84, and 5 is only in 120, so they are excluded).
- Step 4: Compare the exponents of the common prime bases and select the lowest power for each: For base 2, powers are $2^2$ and $2^3$, so we take $2^2$. For base 3, powers are $3^1$ and $3^1$, so we take $3^1$.
- Step 5: Multiply the chosen lowest powers to calculate the HCF: $\text{HCF} = 2^2 \times 3^1 = 4 \times 3 = 12$.
REASONING: By breaking both numbers down into their fundamental prime building blocks, we can precisely determine which factors they share. Taking the lowest power ensures we only include factors that can divide *both* numbers without leaving a remainder.
ANSWER: 12
## WORKED_EXAMPLE_2
PROBLEM: Three ribbons of lengths 72 cm, 108 cm, and 144 cm are to be cut into equal-sized strips with no waste. What is the maximum possible length of each strip?
STEPS:
- Step 1: Translate the problem into mathematical terms: "maximum possible length of equal strips" means we must find the Highest Common Factor (HCF) of 72, 108, and 144.
- Step 2: Find the prime factorisation of 72: $72 = 2 \times 36 = 2^3 \times 3^2$.
- Step 3: Find the prime factorisation of 108: $108 = 2 \times 54 = 2^2 \times 3^3$.
- Step 4: Find the prime factorisation of 144: $144 = 2 \times 72 = 2^4 \times 3^2$.
- Step 5: Identify common prime bases across all three numbers. The common prime bases are 2 and 3.
- Step 6: Select the lowest power for each common base: For base 2, the powers are $2^3, 2^2, 2^4$, so the lowest is $2^2$. For base 3, the powers are $3^2, 3^3, 3^2$, so the lowest is $3^2$.
- Step 7: Compute the HCF: $\text{HCF} = 2^2 \times 3^2 = 4 \times 9 = 36$.
REASONING: The length of each strip must divide 72, 108, and 144 completely. The greatest such length is precisely the HCF of the three numbers, found by taking the lowest powers of all common prime factors.
ANSWER: 36 cm
## WORKED_EXAMPLE_3
PROBLEM: Two numbers have prime factorisations $A = 2^3 \times 3^2 \times 5^1$ and $B = 2^2 \times 3^3 \times 7^1$. A student claims their HCF is $2^3 \times 3^3 \times 5^1 \times 7^1$. Correct the student's error and find the true HCF.
STEPS:
- Step 1: Analyze the student's formula. The student included *all* prime bases ($2, 3, 5, 7$) and picked the *highest* exponents ($3, 3, 1, 1$), which is the exact method for finding the LCM, not the HCF.
- Step 2: Identify the prime bases that are strictly *common* to both $A$ and $B$. Looking at $A$ ($2^3, 3^2, 5^1$) and $B$ ($2^2, 3^3, 7^1$), the only bases appearing in both are 2 and 3. The primes 5 and 7 are not common.
- Step 3: For the common base 2, compare the exponents from $A$ ($2^3$) and $B$ ($2^2$). Select the lowest power, which is $2^2$.
- Step 4: For the common base 3, compare the exponents from $A$ ($3^2$) and $B$ ($3^3$). Select the lowest power, which is $3^2$.
- Step 5: Calculate the true HCF by multiplying the lowest powers of the common primes: $\text{HCF} = 2^2 \times 3^2 = 4 \times 9 = 36$.
REASONING: HCF requires only the prime factors shared by *all* given numbers, raised to their *lowest* available powers. Non-common factors and highest powers belong to the LCM calculation.
ANSWER: 36
## COMPETENCY_QUESTION_1
QUESTION: Priya has two iron rods of lengths 135 cm and 225 cm. She wants to cut them into equal smaller pieces of maximum possible length, with no leftover metal. (a) What is the length of each small piece? (b) How many total pieces will she get from both rods combined?
COMPETENCY: Translating real-world situations to mathematical expressions and multi-step problem solving
STEPS:
- Step 1: Recognize that cutting rods into equal maximum lengths without waste requires finding the HCF of 135 and 225.
- Step 2: Find prime factorisation of 135: $135 = 5 \times 27 = 3^3 \times 5^1$.
- Step 3: Find prime factorisation of 225: $225 = 5 \times 45 = 3^2 \times 5^2$.
- Step 4: Identify common prime bases (3 and 5) and take lowest powers ($3^2$ and $5^1$). Calculate HCF $= 3^2 \times 5^1 = 9 \times 5 = 45$ cm. This is the length of each piece.
- Step 5: Calculate total number of pieces: Pieces from first rod = $135 \div 45 = 3$. Pieces from second rod = $225 \div 45 = 5$. Total pieces = $3 + 5 = 8$.
ANSWER: (a) The maximum length of each piece is 45 cm. (b) The total number of pieces obtained from both rods is 8 pieces.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: In a school mathematics club, two automated bells ring at intervals determined by prime factorisations. Bell X rings based on the prime structure $2^3 \times 5^2$ seconds, and Bell Y rings based on $2^2 \times 3^2 \times 5^1$ seconds. A technician wants to calibrate a master timer that operates at a frequency equal to the HCF of their interval seconds. Furthermore, she wants to express this HCF as a fraction of their LCM. Calculate the HCF, explain why non-common factors are excluded, and state the ratio of HCF to LCM.
COMPETENCY: Comparing concepts, justifying methods, and analyzing structural relationships between HCF and LCM
STEPS:
- Step 1: Extract the prime factorisations given: Bell X interval $X = 2^3 \times 5^2 = 200$ seconds; Bell Y interval $Y = 2^2 \times 3^2 \times 5^1 = 900$ seconds.
- Step 2: Find the HCF by identifying common prime bases (2 and 5) and taking their lowest powers ($2^2$ and $5^1$): $\text{HCF} = 2^2 \times 5^1 = 4 \times 5 = 20$ seconds.
- Step 3: Explain why non-common factors (like $3^2$ and the extra $2$ from $2^3$) are excluded: Non-common factors cannot divide both numbers simultaneously, so they cannot be part of any common divisor.
- Step 4: Find the LCM by taking *all* prime bases ($2, 3, 5$) at their *highest* powers ($2^3, 3^2, 5^2$): $\text{LCM} = 2^3 \times 3^2 \times 5^2 = 8 \times 9 \times 25 = 1800$ seconds.
- Step 5: Compute the ratio of HCF to LCM: Ratio = $\frac{\text{HCF}}{\text{LCM}} = \frac{20}{1800} = \frac{1}{90}$.
ANSWER: The HCF is 20 seconds. Non-common factors are excluded because a common divisor must be a factor of both quantities, and factors unique to only one number cannot divide the other. The ratio of HCF to LCM is 1:90.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The Prime ______ Method for finding the Highest Common Factor (HCF) involves expressing each given number as a product of its prime factors, and then finding the product of the lowest powers of all common prime factors.

## DIAGNOSTIC_ANSWER_7
Factorisation

**A wrong answer (writing 'Division') reveals the student swapped the method names - the definition opens with the Prime Factorisation Method, the blank's own phrase.**

Factorisation is the method's middle name - the blank completes the title.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are organizing a ______ cultural festival and have 72 red ribbons and 90 blue ribbons.

## DIAGNOSTIC_ANSWER_8
school

**A wrong answer (writing 'college') reveals the student changed the organisers - the walkthrough organises a school cultural festival, and the blank names that school.**

School is the festival's host in the walkthrough's ribbon story.

School is the festival's host in the walkthrough's ribbon-cutting story.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
Can find the HCF of two or three numbers (up to 3 digits each) by systematically writing out their prime factorisation using factor trees or division bars, identifying common prime factors, and multiplying their lowest powers to determine the correct HCF.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Imagine you are ______ a school cultural festival and have 72 red ribbons and 90 blue ribbons.

## DIAGNOSTIC_ANSWER_10
organizing

**A wrong answer (writing 'arranging') reveals the student near-missed the gerund - the walkthrough's verb for running the festival is organizing.**

Organizing is the gerund the walkthrough uses for running the festival.

Organizing is the gerund the walkthrough uses for running the cultural festival.

