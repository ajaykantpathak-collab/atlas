## ELI5
Amit laps the track every 4 minutes, Priya every 6 - when do they cross the line together again? The LCM answers: the smallest number that is a multiple of both, the first station where their two timetables shake hands. List the multiples of each, find the first shared name, and ignore the earliers like the plain product that are common but not least. Primes are quick friends: with nothing shared but one, the LCM is simply their product.

## DEFINITION
The Least Common Multiple (LCM) of two or more non-zero whole numbers is the smallest positive whole number that is a multiple of each of the given numbers. It represents the first point in time or value where the individual patterns or cycles of the given numbers align completely.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
Can calculate the LCM of two or three numbers using prime factorisation and listing methods, and can apply LCM to solve real-world synchronization problems (such as bells ringing together or runners meeting on a track) with 100% accuracy.
## SCOPE_BOUNDARY
Covers finding the LCM of positive whole numbers using listing multiples and prime factorisation methods, and solving basic application word problems. Does NOT cover advanced algebraic LCM or polynomial LCM.
## WALKTHROUGH
Imagine two friends running around a school running track in India. Amit completes one round every 4 minutes, and Priya completes one round every 6 minutes. If they start running together at the exact same moment from the starting line, when will they both cross the starting line together again? To solve this, we can list the minutes at which Amit passes (4, 8, 12, 16, 20...) and the minutes at which Priya passes (6, 12, 18, 24...). We look for the smallest time number that appears in both lists, which is 12 minutes! Building on our prior knowledge of factors and multiples from Class 6, we now formalize this concept as the Least Common Multiple (LCM). Our key insight is that the LCM can be found efficiently by breaking numbers down into their prime factorisations rather than listing endless multiples.

**Takeaway:** the LCM is the first shared multiple - the earliest meeting point of two cycles. **In the exam:** list multiples in increasing order and stop at the first shared value; for primes, multiply them. **Check yourself:** write both runners' lap timetables and circle the first matching minute. **Why students miss it:** they multiply the numbers and call the product the least, though smaller shared multiples exist.

## DIAGNOSTIC_QUESTION_1
What is the definition of the Least Common Multiple (LCM) of two numbers?
## DIAGNOSTIC_ANSWER_1
The correct answer is the smallest positive integer that is a multiple of both given numbers. If a student answers "the largest number that divides both," they are confusing LCM with HCF (Highest Common Factor). Another common error is thinking LCM is simply the product of the two numbers without checking if a smaller common multiple exists.
## DIAGNOSTIC_QUESTION_2
Rahul says that the LCM of 4 and 6 is 24 because $4 \times 6 = 24$. Is Rahul correct, and why or why not?
## DIAGNOSTIC_ANSWER_2
Rahul is incorrect. While 24 is *a* common multiple of 4 and 6, it is not the *least* common multiple. The multiples of 4 are 4, 8, 12, 16... and the multiples of 6 are 6, 12, 18... The smallest number appearing in both lists is 12. A student who agrees with Rahul is demonstrating the misconception that the LCM is always found by simply multiplying the two numbers together.
## DIAGNOSTIC_QUESTION_3
Find the LCM of 12 and 18 by listing their first few non-zero multiples.
## DIAGNOSTIC_ANSWER_3
The correct answer is 36. Working steps: 1) List multiples of 12: 12, 24, 36, 48, 60. 2) List multiples of 18: 18, 36, 54, 72. 3) Identify the common multiples: 36, 72... 4) Select the smallest one, which is 36. If a student answers 72, they found a common multiple but missed the *least* one. If they answer 6, they confused multiples with factors (common divisor).
## DIAGNOSTIC_QUESTION_4
If two numbers are prime numbers, such as 5 and 7, how can you quickly find their LCM, and why does this rule work?
## DIAGNOSTIC_ANSWER_4
The LCM of two distinct prime numbers is always their product ($5 \times 7 = 35$). This works because prime numbers have no common factors other than 1, meaning none of their prime factors can be shared. A student who tries to use prime factorisation trees and gets confused is missing the structural property that coprime numbers share no divisors, forcing their lowest common multiple to be their direct product.
## DIAGNOSTIC_QUESTION_5
Examine this student's working for finding the LCM of 8 and 12 using prime factorisation:
Step 1: Prime factor of $8 = 2 \times 2 \times 2 = 2^3$
Step 2: Prime factor of $12 = 2 \times 2 \times 3 = 2^2 \times 3^1$
Step 3: Take the lowest power of each common prime: $2^2 = 4$.
Is this student's answer and method correct? Explain.
## DIAGNOSTIC_ANSWER_5
The student's method is incorrect in Step 3. To find the LCM using prime factorisation, you must take the *highest* power of each prime factor involved, not the lowest power (taking the lowest power gives the HCF). The correct calculation for LCM is $2^3 \times 3^1 = 8 \times 3 = 24$. A student who approves this work has mixed up the fundamental algorithmic rule for HCF versus LCM.
## DIAGNOSTIC_QUESTION_6
Create a pair of numbers whose LCM is 30 and whose HCF is 3, and explain how you constructed them.
## DIAGNOSTIC_ANSWER_6
One valid pair is 6 and 15 (or 3 and 30). Construction explanation: Since the HCF is 3, both numbers must contain 3 as a prime factor. Let the numbers be $3 \times a$ and $3 \times b$, where $a$ and $b$ are coprime. The LCM is $3 \times a \times b = 30$, so $a \times b = 10$. The pairs of factors for 10 are (1, 10) and (2, 5). Choosing (2, 5) gives numbers $3 \times 2 = 6$ and $3 \times 5 = 15$. A poor answer lists numbers randomly without verifying their HCF and LCM, showing a lack of structural understanding of number properties.
## COMMON_MISCONCEPTION
Students frequently confuse the rule for finding LCM via prime factorisation with the rule for HCF. Specifically, when selecting prime factors from exponential forms (e.g., $2^3$ and $2^2$), students take the lowest exponent (which yields the HCF) instead of taking the highest exponent for every prime present. For instance, for numbers 8 ($2^3$) and 12 ($2^2 \times 3$), a student will incorrectly write LCM $= 2^2 = 4$ instead of LCM $= 2^3 \times 3 = 24$.
## ON_FAILURE
If a student calculates the LCM and gets a number smaller than one of the original numbers, stop immediately and ask: "Can a multiple be smaller than the number itself?" Remind them that multiples grow larger (multiply by 1, 2, 3...). Write out the prime factorisation of both numbers side-by-side using exponents. Explicitly state the rule: "For LCM, L stands for Least, but we take the GREATEST power of every prime factor that appears." Have them highlight the highest exponent for each prime base before multiplying them together.
## PREREQUISITE_NODE_IDS
c6_math_ch01_013, c6_math_ch01_015, c7_math_ch11_002, c7_math_ch11_004
## PREREQUISITE_REASONS
c6_math_ch01_013: provides the fundamental understanding of what a multiple is versus a factor.
c6_math_ch01_015: introduces basic prime factorisation and early LCM concepts from Class 6.
c7_math_ch11_002: establishes the concept of Highest Common Factor, which contrasts directly with Least Common Multiple.
c7_math_ch11_004: teaches prime factorisation techniques required for advanced LCM calculations.
## FORWARD_NODE_IDS
c7_math_ch11_007, c7_math_ch11_008, c7_math_ch11_009, c7_math_ch11_010, c7_math_ch11_011
## FORWARD_REASONS
c7_math_ch11_007: builds on the definition to explore listing methods systematically for larger numbers.
c7_math_ch11_008: extends prime factorisation methods for LCM to larger, multi-digit numbers.
c7_math_ch11_009: connects HCF and LCM through the mathematical product rule of two numbers.
c7_math_ch11_010: applies LCM to complex real-life word problems in Indian currency and measurements.
c7_math_ch11_011: explores deeper theoretical properties of common multiples.
## CROSS_SUBJECT_PREREQS
c6_math_ch01_013, c6_math_ch03_031
## CROSS_SUBJECT_REASONS
c6_math_ch01_013: provides foundational integer multiplication patterns used in generating multiples.
c6_math_ch03_031: equivalent fractions require finding common denominators, which directly depends on finding the LCM of denominators.
## CHAIN_DESCRIPTION
c7_math_ch11_004 -> c7_math_ch11_006 -> c7_math_ch11_008
## THIS_FORMULA
\text{LCM}(a, b) = \text{Product of highest powers of all prime factors of } a \text{ and } b
## FORMULA_VARIABLES
a = first given positive integer
b = second given positive integer
Prime factors = prime numbers that divide evenly into $a$ or $b$
## FORMULA_UNITS
dimensionless
## COMPUTATION_TYPE
arithmetic
## CROSS_SUBJECT

## PREREQ_CONCEPT
Prime factorisation and the definition of a mathematical multiple.
## PREREQ_BEFORE
Must be able to express composite numbers as products of prime numbers using factor trees or division.
## PREREQ_STUCK
Review prime factorisation rules and how to write numbers in exponential notation (e.g., $2 \times 2 \times 3 = 2^2 \times 3$) from node c7_math_ch11_004.
## WORKED_EXAMPLE_1
PROBLEM: Three temple bells in a town in Odisha ring at intervals of 12 minutes, 15 minutes, and 20 minutes respectively. If they all ring together right now at 8:00 AM, after how many minutes will they ring together next, and what time will it be?
STEPS:
- Step 1: Identify that the problem asks for the first time future event where three separate time cycles align, which is the definition of finding the Least Common Multiple (LCM) of 12, 15, and 20.
- Step 2: Find the prime factorisation of each number:
  $12 = 2 \times 2 \times 3 = 2^2 \times 3^1$
  $15 = 3 \times 1 \times 5 = 3^1 \times 5^1$
  $20 = 2 \times 2 \times 5 = 2^2 \times 5^1$
- Step 3: Identify all prime bases involved (2, 3, and 5) and select the highest power for each base:
  Highest power of 2 is $2^2$ (from 12 and 20)
  Highest power of 3 is $3^1$ (from 12 and 15)
  Highest power of 5 is $5^1$ (from 15 and 20)
- Step 4: Compute the LCM by multiplying these highest powers together:
  $\text{LCM} = 2^2 \times 3^1 \times 5^1 = 4 \times 3 \times 5$
  $\text{LCM} = 12 \times 5 = 60$ minutes.
- Step 5: Convert 60 minutes into hours and add to the start time: $60 \text{ minutes} = 1 \text{ hour}$. $8:00\text{ AM} + 1\text{ hour} = 9:00\text{ AM}$.
REASONING: The bells ring at regular repeating intervals (multiples). To find when all three cycles coincide for the first time, we must find the smallest number that is a multiple of 12, 15, and 20 simultaneously, making LCM the exact tool required.
ANSWER: 60 minutes (or 1 hour), which means they will ring together at 9:00 AM.
## WORKED_EXAMPLE_2
PROBLEM: Priya is arranging chairs in the school assembly hall in rows. If she puts 16 chairs in each row, or 24 chairs in each row, or 36 chairs in each row, no chairs are left over in any case. What is the minimum total number of chairs Priya could have in the hall?
STEPS:
- Step 1: Recognize that the total number of chairs must be a multiple of 16, 24, and 36 simultaneously, and we want the minimum total number, which means finding $\text{LCM}(16, 24, 36)$.
- Step 2: Find the prime factorisation of each number:
  $16 = 2 \times 2 \times 2 \times 2 = 2^4$
  $24 = 2 \times 3 \times 2 \times 2 = 2^3 \times 3^1$
  $36 = 2 \times 2 \times 3 \times 3 = 2^2 \times 3^2$
- Step 3: List all prime base numbers present (2 and 3) and select their highest exponents across all factorisations:
  For base 2, the highest power is $2^4$ (from 16).
  For base 3, the highest power is $3^2$ (from 36).
- Step 4: Multiply these highest powers to calculate the LCM:
  $\text{LCM} = 2^4 \times 3^2$
  $\text{LCM} = 16 \times 9$
  $\text{Calculation:} \ 16 \times 9 = 144$.
- Step 5: Verify the result: 144 divided by 16 is 9; 144 divided by 24 is 6; 144 divided by 36 is 4. All divisions leave a remainder of 0.
REASONING: Because the total number of chairs can be grouped evenly into sets of 16, 24, or 36, the total must be a common multiple. The minimum number of chairs is therefore the Least Common Multiple.
ANSWER: 144 chairs
## WORKED_EXAMPLE_3
PROBLEM: Two runner athletes, Rohan and Sohan, start running around a circular stadium track of length 720 metres at the same point, in the same direction, at constant speeds. Rohan completes one lap in 180 seconds and Sohan completes one lap in 240 seconds. After how many seconds will they meet again at the exact starting point for the first time, and how many full laps will Rohan have completed by then?
STEPS:
- Step 1: Identify that Rohan passes the starting point every 180 seconds, and Sohan passes it every 240 seconds. They will meet at the start when their time intervals align, which is $\text{LCM}(180, 240)$.
- Step 2: Find the prime factorisations of 180 and 240:
  $180 = 18 \times 10 = (2 \times 3^2) \times (2 \times 5) = 2^2 \times 3^2 \times 5^1$
  $240 = 24 \times 10 = (2^3 \times 3) \times (2 \times 5) = 2^4 \times 3^1 \times 5^1$
- Step 3: Extract the highest power for each prime factor (2, 3, and 5):
  Highest power of 2 is $2^4$
  Highest power of 3 is $3^2$
  Highest power of 5 is $5^1$
- Step 4: Calculate the LCM:
  $\text{LCM} = 2^4 \times 3^2 \times 5^1 = 16 \times 9 \times 5$
  $\text{Calculation:} \ 16 \times 5 = 80$, then $80 \times 9 = 720$ seconds.
- Step 5: Calculate the number of laps Rohan completes in 720 seconds:
  Rohan's lap time = 180 seconds.
  Number of laps $= \frac{720\text{ seconds}}{180\text{ seconds/lap}} = 4\text{ laps}$.
REASONING: The time when runners meet at the origin is determined by the lowest common multiple of their lap completion times. Dividing this total meeting time by an individual's lap time gives the number of laps completed.
ANSWER: They will meet after 720 seconds (12 minutes), and Rohan will have completed 4 full laps.
## COMPETENCY_QUESTION_1
QUESTION: A school stationery shop has pens packed in boxes of 12 and notebooks packed in bundles of 15. A teacher wants to buy the exact same number of pens and notebooks so that no pens or notebooks are left over. 
Part A: What is the minimum number of each item she must buy?
Part B: If each box of pens costs ₹180 and each bundle of notebooks costs ₹250, what will be the total minimum cost?
COMPETENCY: Translating real-world situations to mathematical LCM models and multi-step cost calculation
STEPS:
- Step 1: Determine that the number of pens and notebooks must be equal and form a common multiple of 12 and 15, hence find $\text{LCM}(12, 15)$.
- Step 2: Compute $\text{LCM}(12, 15)$: Prime factors of $12 = 2^2 \times 3$; prime factors of $15 = 3 \times 5$. $\text{LCM} = 2^2 \times 3 \times 5 = 60$ items.
- Step 3: Calculate the number of boxes of pens needed: $60 \div 12 = 5$ boxes. Calculate the number of bundles of notebooks needed: $60 \div 15 = 4$ bundles.
- Step 4: Calculate the total cost: Cost of pens $= 5 \times \text{₹}180 = \text{₹}900$. Cost of notebooks $= 4 \times \text{₹}250 = \text{₹}1000$. Total cost $= \text{₹}900 + \text{₹}1000 = \text{₹}1900$.
ANSWER: Part A: She must buy 60 pens and 60 notebooks. Part B: The total minimum cost is ₹1900.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: Two metallic wires of lengths 36 cm and 60 cm are to be cut into smaller pieces of equal length such that no wire is wasted. Furthermore, someone claims that the minimum length of each cut piece can also be found using the LCM of 36 and 60. Evaluate this claim: Is the LCM used to find the length of the cut pieces, or is there a different concept involved? Explain clearly and find both the HCF and LCM of 36 and 60 to support your reasoning.
COMPETENCY: Error identification, method justification, and conceptual differentiation between HCF and LCM
STEPS:
- Step 1: Analyze the claim: Cutting a single object into smaller equal pieces without remainder involves dividing the length into divisors, which is the domain of HCF, not LCM.
- Step 2: Find the HCF of 36 and 60:
  $36 = 2^2 \times 3^2$
  $60 = 2^2 \times 3^1 \times 5^1$
  $\text{HCF} = 2^2 \times 3^1 = 12$ cm (this is the maximum length of each cut piece).
- Step 3: Find the LCM of 36 and 60 for comparison:
  $\text{LCM} = 2^2 \times 3^2 \times 5^1 = 4 \times 9 \times 5 = 180$ cm (this represents a length where both 36 cm and 60 cm wires would fit an exact whole number of times end-to-end).
- Step 4: Conclude by refuting the claim: The claim is false because cutting into equal pieces requires divisors (HCF), whereas LCM deals with building up or aligning repeating cycles.
ANSWER: The claim is incorrect. Cutting wires into equal pieces requires the Highest Common Factor (HCF), which is 12 cm. The LCM of 36 and 60 is 180 cm, which represents the smallest length that can be formed by joining multiple 36 cm or 60 cm wires end-to-end. LCM is for synchronization and building up, while HCF is for partitioning and dividing down.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The Least Common Multiple (LCM) of two or more non-zero whole numbers is the ______ positive whole number that is a multiple of each of the given numbers.

## DIAGNOSTIC_ANSWER_7
smallest

**A wrong answer (writing 'largest') reveals the student imported the HCF's superlative - the LCM definition wants the smallest positive whole number that is a common multiple.**

Smallest is the LCM's superlative - the least of the shared multiples.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine two friends running ______ a school running track in India.

## DIAGNOSTIC_ANSWER_8
around

**A wrong answer (writing 'on') reveals the student swapped the preposition - the friends run around the track, the walkthrough's own phrase.**

Around is the runners' preposition - they circle the track, lap by lap.

Around is the runners' preposition - they circle the school track lap after lap.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: We look for the smallest time number that appears in both lists, which is ______ minutes!

## DIAGNOSTIC_ANSWER_9
12

**A wrong answer (any other minute) reveals the student missed the walkthrough's landing - the first shared minute on both timetables is 12.**

12 minutes is the first shared minute on both runners' timetables.

12 minutes is the first shared minute where both runners cross the line together.

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
Can calculate the LCM of two or three numbers using prime factorisation and listing methods, and can apply LCM to solve real-world synchronization problems (such as bells ringing together or runners meeting on a track) with 100% accuracy.

**A wrong answer (solving but not applying) reveals the student stopped at the number** - the exam ask is the real-world sync, bells ringing together or runners crossing, so the LCM must end in a situation, not just a figure.

## DIAGNOSTIC_QUESTION_11
Fill in the blank: ______ two friends running around a school running track in India.

## DIAGNOSTIC_ANSWER_11
Imagine

**A wrong answer (leaving it blank) reveals the student missed the opener** - the walkthrough begins Imagine, as two friends lap the school track at their own paces, waiting for the shared crossing that only the LCM can time.

The scene word opens the walkthrough the way every scene in this wave does, so blanks drawn from the first sentence are free marks for anyone who read the setup.

