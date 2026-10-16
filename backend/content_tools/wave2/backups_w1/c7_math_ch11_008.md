## ELI5
Two assembly bells ring every 12 and 18 seconds, and prime factorisation predicts their next duet: split each number into prime bricks, then take every prime that appears anywhere - at its highest power - and multiply. Highest, not lowest: the LCM must be roomy enough to contain both numbers whole, while the HCF wanted the cramped common part. For big bells and long timetables, a short tower of primes beats a scrolling list of multiples every time.

## DEFINITION
Finding the Least Common Multiple (LCM) by prime factorisation involves expressing each given number as a product of its prime factors, and then taking the highest power of every prime factor present in any of the factorisations to find their product. This method is much faster for large numbers than listing all multiples.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
Can find the LCM of two or three numbers by writing their prime factorisations in exponential form, selecting the highest power for each prime factor, and multiplying them together to compute the final value.
## SCOPE_BOUNDARY
Covers finding the LCM of two or three positive integers using the prime factorisation method. It does not cover the division method (short division method) or algebraic expressions, which are handled in higher classes.
## WALKTHROUGH
Imagine two school bell rings at a morning assembly: one bell rings every 12 seconds and another bell rings every 18 seconds. If they both ring together right now, after how many seconds will they ring together again? To solve this, we need to find the Least Common Multiple (LCM) of 12 and 18, which tells us the earliest time their cycles align. While listing multiples works for small numbers, it becomes too slow when numbers get larger like 120 and 210. Instead, we break down each number into its basic building blocks using prime factorisation, just like you learned in Class 6. By comparing the prime factors of each number, we can systematically build the smallest number that contains both of them as factors.

**Takeaway:** LCM by primes: highest power of every prime present anywhere, then multiply them all. **In the exam:** factorise in exponential form, lift the highest exponent per prime, and compute the product. **Check yourself:** prime-factorise both bell intervals and rebuild the LCM from the tallest bricks. **Why students miss it:** they take lowest powers and quietly compute the HCF while labelling it LCM. The tallest brick of every prime present builds a roomy meeting point for both bells.

## DIAGNOSTIC_QUESTION_1
What is the prime factorisation of 36 expressed in exponential form?
## DIAGNOSTIC_ANSWER_1
The correct answer is $2^2 \times 3^2$. A wrong answer like $2 \times 3^3$ reveals that the student has confused the counts of prime factors or made a multiplication error when dividing by prime numbers (e.g., $36 \div 2 = 18$, $18 \div 2 = 9$, $9 \div 3 = 3$, $3 \div 3 = 1$).
## DIAGNOSTIC_QUESTION_2
When finding the LCM of two numbers using prime factorisation, why do we choose the highest power of each prime factor instead of the lowest power?
## DIAGNOSTIC_ANSWER_2
The correct answer is that taking the highest power ensures the resulting multiple is large enough to contain all the prime factors of each original number completely, which is required for it to be a true multiple of both numbers. A student who incorrectly chooses the lowest power is confusing the rule for LCM with the rule for finding the HCF (Highest Common Factor).
## DIAGNOSTIC_QUESTION_3
Find the LCM of 24 and 36 using prime factorisation.
## DIAGNOSTIC_ANSWER_3
The correct answer is 72. 
Steps: 
1. Prime factorise 24: $24 = 2 \times 2 \times 2 \times 3 = 2^3 \times 3^1$.
2. Prime factorise 36: $36 = 2 \times 2 \times 3 \times 3 = 2^2 \times 3^2$.
3. Identify all unique prime factors involved, which are 2 and 3.
4. Select the highest power for each: highest power of 2 is $2^3$, and highest power of 3 is $3^2$.
5. Multiply these highest powers together: $LCM = 2^3 \times 3^2 = 8 \times 9 = 72$. 
A wrong answer like 12 shows the student found the HCF instead of the LCM by taking the lowest powers ($2^2 \times 3^1$).
## DIAGNOSTIC_QUESTION_4
Compare the prime factorisation of numbers $A = 2^3 \times 5^2$ and $B = 2^2 \times 5^3 \times 7$. Without calculating the final numbers, what is their LCM?
## DIAGNOSTIC_ANSWER_4
The correct answer is $2^3 \times 5^3 \times 7$. A wrong answer that omits 7 or uses incorrect powers shows the student does not understand that the LCM must include *every* prime factor present across all numbers, raised to its maximum encountered power.
## DIAGNOSTIC_QUESTION_5
Rahul states that the LCM of 15 and 25 is $3 \times 5 = 15$ because both numbers share a factor of 5. Evaluate his statement and correct any errors in his reasoning.
## DIAGNOSTIC_ANSWER_5
Rahul's statement is incorrect. His method gives the HCF, not the LCM. To find the LCM, we prime factorise: $15 = 3^1 \times 5^1$ and $25 = 5^2$. We then take the highest power of each prime factor, which gives $3^1 \times 5^2 = 3 \times 25 = 75$. A wrong evaluation indicates the student cannot distinguish between the definitions and rules for HCF and LCM.
## DIAGNOSTIC_QUESTION_6
Create a pair of two-digit numbers whose LCM found by prime factorisation is exactly 180, and show their prime factorisations.
## DIAGNOSTIC_ANSWER_6
An acceptable answer is 20 and 45. Prime factorisation: $20 = 2^2 \times 5^1$ and $45 = 3^2 \times 5^1$. Their LCM is $2^2 \times 3^2 \times 5^1 = 4 \times 9 \times 5 = 180$. A poor answer features numbers whose LCM does not equal 180, showing a failure to work backward from a target LCM using prime powers.
## COMMON_MISCONCEPTION
Students often confuse the rules for LCM and HCF when looking at prime factorisation forms. When asked for the LCM of numbers like $2^3 \times 3^2$ and $2^2 \times 3^4$, they incorrectly pick the lowest powers ($2^2 \times 3^2 = 36$) instead of the highest powers ($2^3 \times 3^4 = 648$), yielding the HCF instead of the LCM.
## ON_FAILURE
Remind the student of what a "multiple" means: it must be a number that is *larger* than or equal to the given numbers, so it needs *more* building blocks, not fewer. Tell them: "For LCM, think 'L' for 'Largest power' of every prime factor." Have them write out both prime factorisations side by side, circle the higher exponent for each shared base, and explicitly write out the multiplication of those maximum powers.
## PREREQUISITE_NODE_IDS
c6_math_ch01_015, c7_math_ch11_006, c7_math_ch11_007
## PREREQUISITE_REASONS
c6_math_ch01_015: requires knowing how to break down a number into prime factors using factor trees or division.
c7_math_ch11_006: requires understanding the conceptual definition of Least Common Multiple before applying methods.
c7_math_ch11_007: provides the foundational listing method for finding multiples to compare against prime factorisation.
## FORWARD_NODE_IDS
c7_math_ch11_009, c7_math_ch11_010, c8_math_ch2_6
## FORWARD_REASONS
c7_math_ch11_009: using prime factorisations of numbers helps verify the product relationship between HCF and LCM.
c7_math_ch11_010: real-life word problems involving synchronized events require computing LCM via prime factorisation efficiently.
c8_math_ch2_6: Class 7 practice of LCM by prime factorisation reinforces exponential thinking

## CROSS_SUBJECT_PREREQS
c6_math_ch01_014, c6_math_ch01_015
## CROSS_SUBJECT_REASONS
c6_math_ch01_014: divisibility rules are essential for quickly determining prime factors during factorisation.
c6_math_ch01_015: foundational prime factorisation skills form the core computational engine for this node.
## CHAIN_DESCRIPTION
c7_math_ch11_007 -> c7_math_ch11_008 -> c7_math_ch11_010
## THIS_FORMULA
LCM(a, b) = \prod p_i^{\max(a_i, b_i)}
## FORMULA_VARIABLES
a_i, b_i = exponents of prime factor p_i in the prime factorisations of a and b respectively.
## FORMULA_UNITS
dimensionless
## COMPUTATION_TYPE
arithmetic
## CROSS_SUBJECT
c7_math_ch11_006 | uses the fundamental concept of multiples established in earlier modules.
c7_math_ch11_010 | applies LCM computation to solve real-world scheduling problems.
## PREREQ_CONCEPT
Prime factorisation in exponential form
## PREREQ_BEFORE
Be able to express any composite number as a product of prime powers.
## PREREQ_STUCK
Review c6_math_ch01_015 to practice breaking numbers down into prime factors using repeated division.
## WORKED_EXAMPLE_1
PROBLEM: Two runner athletes are training on a circular running track at a local sports stadium in Delhi. Runner A completes one lap in 40 seconds, and Runner B completes one lap in 60 seconds. If they start running together from the starting line at the same time, after how many seconds will they meet again at the starting line?
STEPS:
- Step 1: Identify the numbers to find the LCM for, which are 40 and 60 seconds.
- Step 2: Find the prime factorisation of 40 by dividing by prime numbers: $40 \div 2 = 20$, $20 \div 2 = 10$, $10 \div 2 = 5$, $5 \div 5 = 1$. So, $40 = 2 \times 2 \times 2 \times 5 = 2^3 \times 5^1$.
- Step 3: Find the prime factorisation of 60 by dividing by prime numbers: $60 \div 2 = 30$, $30 \div 2 = 15$, $15 \div 3 = 5$, $5 \div 5 = 1$. So, $60 = 2 \times 2 \times 3 \times 5 = 2^2 \times 3^1 \times 5^1$.
- Step 4: List all unique prime factors (2, 3, and 5) and select the highest power for each: for 2 it is $2^3$, for 3 it is $3^1$, and for 5 it is $5^1$.
- Step 5: Multiply these highest powers together: $LCM = 2^3 \times 3^1 \times 5^1 = 8 \times 3 \times 5 = 24 \times 5 = 120$.
REASONING: The time when they meet again must be a common multiple of their individual lap times because it must be a full number of laps for both. Finding the *least* common multiple gives the very first time they cross the starting line together.
ANSWER: 120 seconds
## WORKED_EXAMPLE_2
PROBLEM: Three bells in a village temple toll at intervals of 12 minutes, 15 minutes, and 20 minutes respectively. If they toll together at 8:00 AM, find the LCM of their time intervals using prime factorisation to determine after how many minutes they will toll together next.
STEPS:
- Step 1: Identify the three time intervals: 12, 15, and 20 minutes.
- Step 2: Write the prime factorisation for each interval: $12 = 2^2 \times 3^1$, $15 = 3^1 \times 5^1$, and $20 = 2^2 \times 5^1$.
- Step 3: Identify all unique prime bases present across the factorisations, which are 2, 3, and 5.
- Step 4: Determine the highest power for each prime base: highest power for 2 is $2^2$, for 3 is $3^1$, and for 5 is $5^1$.
- Step 5: Compute the LCM by multiplying these maximum powers: $LCM = 2^2 \times 3^1 \times 5^1 = 4 \times 3 \times 5 = 12 \times 5 = 60$.
REASONING: Synchronization problems require finding a common multiple of multiple time cycles. Using prime factorisation handles three or more numbers efficiently without writing out long lists of multiples.
ANSWER: 60 minutes
## WORKED_EXAMPLE_3
PROBLEM: A sweet shop owner has 84 pieces of barfi and 140 pieces of laddu. He wants to pack them in minimum-sized gift boxes such that each box contains an equal number of sweets of the same kind, but he also needs to find the LCM of 84 and 140 to coordinate box packaging cycles with another store branch. Calculate the prime factorisations and the LCM of 84 and 140.
STEPS:
- Step 1: Write down the two numbers: 84 and 140.
- Step 2: Perform prime factorisation for 84: $84 \div 2 = 42$, $42 \div 2 = 21$, $21 \div 3 = 7$, $7 \div 7 = 1$. Thus, $84 = 2^2 \times 3^1 \times 7^1$.
- Step 3: Perform prime factorisation for 140: $140 \div 2 = 70$, $70 \div 2 = 35$, $35 \div 5 = 7$, $7 \div 7 = 1$. Thus, $140 = 2^2 \times 5^1 \times 7^1$.
- Step 4: Identify all unique prime factors: 2, 3, 5, and 7.
- Step 5: Find the highest power for each prime factor: highest power of 2 is $2^2$, of 3 is $3^1$, of 5 is $5^1$, and of 7 is $7^1$.
- Step 6: Multiply the maximum powers together: $LCM = 2^2 \times 3^1 \times 5^1 \times 7^1 = 4 \times 3 \times 5 \times 7 = 12 \times 35 = 420$.
REASONING: Even in problems featuring mixed contexts, finding the LCM via prime factorisation relies strictly on breaking numbers down into prime bases and taking the maximum exponent for each base to guarantee divisibility by both original numbers.
ANSWER: 420
## COMPETENCY_QUESTION_1
QUESTION: Priya was asked to find the LCM of 72 and 108. Her working was as follows: 
$72 = 2^3 \times 3^2$ 
$108 = 2^2 \times 3^3$ 
She wrote: "LCM = $2^2 \times 3^2 = 36$". 
Critique Priya's solution. Identify her error, explain why it is mathematically incorrect, and provide the correct calculation.
COMPETENCY: Error identification and correction
STEPS:
- Step 1: Examine Priya's prime factorisations of 72 and 108 to check if they are correct ($72 = 8 \times 9 = 2^3 \times 3^2$ and $108 = 4 \times 27 = 2^2 \times 3^3$ are correct).
- Step 2: Analyze her choice of exponents in the final step where she selected $2^2$ and $3^2$.
- Step 3: Recognize that she selected the *lowest* powers instead of the highest powers, which means she calculated the HCF instead of the LCM.
- Step 4: Correct the selection by choosing the highest powers: $2^3$ and $3^3$.
- Step 5: Compute the correct LCM: $2^3 \times 3^3 = 8 \times 27 = 216$.
ANSWER: Priya calculated the HCF instead of the LCM because she selected the lowest powers of the prime factors ($2^2$ and $3^2$) rather than the highest powers ($2^3$ and $3^3$). The correct LCM is $2^3 \times 3^3 = 216$.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: Two metallic wires of lengths 360 cm and 540 cm are to be cut into equal-length pieces without any leftover wire, but an engineer also needs to determine the LCM of these two lengths to synchronize a manufacturing machine setting. Using prime factorisation, find the LCM of 360 and 540, and explain what this number signifies about their prime components.
COMPETENCY: Translating real-world situations to mathematical expressions and advanced computation
STEPS:
- Step 1: Extract the two numbers from the problem: 360 and 540 cm.
- Step 2: Find the prime factorisation of 360: $360 = 36 \times 10 = (2^2 \times 3^2) \times (2^1 \times 5^1) = 2^3 \times 3^2 \times 5^1$.
- Step 3: Find the prime factorisation of 540: $540 = 54 \times 10 = (2^1 \times 3^3) \times (2^1 \times 5^1) = 2^2 \times 3^3 \times 5^1$.
- Step 4: Select the highest power for each prime base (2, 3, and 5): highest power of 2 is $2^3$, of 3 is $3^3$, and of 5 is $5^1$.
- Step 5: Multiply the highest powers: $LCM = 2^3 \times 3^3 \times 5^1 = 8 \times 27 \times 5 = 216 \times 5 = 1080$.
ANSWER: The LCM of 360 and 540 is 1080 cm. This number signifies the smallest length that is an exact multiple of both 360 cm and 540 cm, meaning its prime factorisation ($2^3 \times 3^3 \times 5^1$) contains the maximum prime building blocks of both original numbers.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Finding the Least Common Multiple (LCM) by prime factorisation involves expressing each given number as a product of its prime factors, and then taking the highest power of every prime factor present in any of the ______ to find their product.

## DIAGNOSTIC_ANSWER_7
factorisations

**A wrong answer (writing 'powers') reveals the student half the phrase - each number becomes a product of its prime factorisations' bases and powers; the blank asks for the plural noun.**

Factorisations is the plural - every number contributes its own prime product.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine two school bell rings at a morning assembly: one bell rings every 12 seconds and ______ bell rings every 18 seconds.

## DIAGNOSTIC_ANSWER_8
another

**A wrong answer (writing 'first') reveals the student broke the pair - one bell rings and another bell answers, the blank's own word.**

Another is the pair word - one bell rings, another answers.

Another is the pair word - one bell rings and another answers it.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
Can find the LCM of two or three numbers by writing their prime factorisations in exponential form, selecting the highest power for each prime factor, and multiplying them together to compute the final value.

**A wrong answer (single-prime answers) reveals the student dropped bricks - mastery requires every prime present at its highest power, multiplied into one value.**

Every prime present, highest power, multiply - the LCM's recipe in full.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Imagine two school bell rings at a morning ______: one bell rings every 12 seconds and another bell rings every 18 seconds.

## DIAGNOSTIC_ANSWER_10
assembly

**A wrong answer (writing 'morning') reveals the student the blank asks for the event - two bells ring at a morning assembly, the walkthrough's own setting.**

Assembly is where the two bells ring - the walkthrough's venue.

Assembly is the venue where the two bells ring in the walkthrough.

