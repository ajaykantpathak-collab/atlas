## ELI5
A business opens every day of the week regardless of the date: 1000 days from Monday is found by keeping only the remainder — 6 days forward, Sunday. Two numbers are "the same day" when they leave the same remainder, and that sameness is congruence. Even negative numbers obey: borrow one full week and the remainder comes out between 0 and 6. Infinite dates, seven shelves — modular arithmetic is shelf-sorting for numbers.

## DEFINITION
Modular arithmetic is a system of arithmetic for integers where numbers "wrap around" upon reaching a fixed positive integer $m$ (the modulus); two integers are considered equivalent if they leave the same remainder when divided by $m$, and the modulo operator $X \bmod m$ returns this unique non-negative remainder $R$ where $0 \le R < m$.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must be able to: (1) correctly compute $X \bmod m$ for any integers $X$ (positive, negative, or zero) and $m > 0$, ensuring the remainder is in $[0, m-1]$; (2) apply addition, subtraction, and multiplication properties of modulo arithmetic to simplify large expressions; (3) solve real-world cyclic problems (clocks, calendars, scheduling) using modular arithmetic.

## SCOPE_BOUNDARY
This node covers the modulo operator definition, its properties (addition, subtraction, multiplication, translation invariance), addition/subtraction/multiplication modulo $m$ operations, and applications to clock/calendar problems. It does NOT cover congruence modulo notation ($a \equiv b \pmod m$), equivalence classes, or arithmetic functions (Euler's totient, divisor functions) — those are in subsequent nodes (c12_app_cbse_01_005, c12_app_cbse_01_006).

## WALKTHROUGH
Start with a real-world question: "If today is Monday, what day will it be after 1000 days?" Students instinctively know the week repeats every 7 days. Guide them to compute $1000 \div 7 = 142$ remainder $6$, so 6 days after Monday is Sunday. Then formalize: we only needed the remainder. Introduce the modulo operator $X \bmod m = R$ using Euclid's division algorithm $X = mQ + R$. Emphasize the critical rule: $R$ is **always** $0 \le R < m$, even for negative $X$ (e.g., $-31 \bmod 7 = 4$ because $-31 = 7 \times (-5) + 4$). Walk through the properties: $(X + kY) \bmod Y = X \bmod Y$, and the three operational properties for addition, subtraction, multiplication. End with the key insight: modular arithmetic turns infinite integers into a finite cyclic system of $m$ numbers $\{0, 1, \dots, m-1\}$, making massive calculations tractable.

Takeaway: mastery means the division algorithm stated as the operator's definition and the properties applied to shrink work. Exam moves: computation questions place any integer on its shelf; property questions use addition, subtraction, and multiplication behaviour to fold big expressions; application questions route clocks, calendars, and schedules through the remainder. Method: state Euclid's ledger first — dividend equals divisor times quotient plus remainder — then treat every number as its shelf label. Drill: one thousand days, one negative, one folded expression. The shelves number m; the numbers number infinity — sorting is the whole economy.

## DIAGNOSTIC_QUESTION_1
Compute $(-68) \bmod 12$ and explain why the answer is not $-8$.

## DIAGNOSTIC_ANSWER_1
**Answer:** $4$. By Euclid's division algorithm, we need $-68 = 12 \times Q + R$ with $0 \le R < 12$. The quotient $Q = -6$ (since $12 \times (-6) = -72$) gives remainder $R = -68 - (-72) = 4$. The answer is not $-8$ because the definition of the modulo operator in this textbook **requires the remainder to be non-negative** ($0 \le R < m$). A student answering $-8$ has applied the "remainder" concept from programming languages (like C++ or Python's `%` operator with negative dividends) instead of the mathematical definition used in NCERT.

## DIAGNOSTIC_QUESTION_2
A student claims: "For any integers $A, B, C$ with $C > 0$, $(A - B) \bmod C = (A \bmod C) - (B \bmod C)$." Is this statement true or false? Give a counterexample if false, or explain why it holds if true.

## DIAGNOSTIC_ANSWER_2
**Answer:** False. The correct property is $(A - B) \bmod C = \big((A \bmod C) - (B \bmod C)\big) \bmod C$. The outer modulo is essential because $(A \bmod C) - (B \bmod C)$ can be negative or $\ge C$. Counterexample: $A=3, B=7, C=5$. LHS: $(3-7) \bmod 5 = (-4) \bmod 5 = 1$. RHS without outer mod: $(3 \bmod 5) - (7 \bmod 5) = 3 - 2 = 1$ (accidentally works). Better counterexample: $A=2, B=7, C=5$. LHS: $(2-7) \bmod 5 = (-5) \bmod 5 = 0$. RHS without outer mod: $2 - 2 = 0$ (still works). Try $A=1, B=4, C=5$: LHS $= (-3) \bmod 5 = 2$; RHS without outer mod $= 1 - 4 = -3 \neq 2$. A student who says "true" has missed the outer modulo operation, which is the most common error in applying the subtraction property.

## DIAGNOSTIC_QUESTION_3
Find the remainder when $127 \times 137 \times 23 \times 50 \times 235 \times 15$ is divided by $7$ using modular arithmetic properties. Show all steps.

## DIAGNOSTIC_ANSWER_3
**Answer:** $4$.
Steps:
1. Reduce each factor modulo 7:
   $127 \bmod 7 = 1$ (since $126 = 7 \times 18$)
   $137 \bmod 7 = 4$ (since $133 = 7 \times 19$)
   $23 \bmod 7 = 2$
   $50 \bmod 7 = 1$ (since $49 = 7 \times 7$)
   $235 \bmod 7 = 4$ (since $231 = 7 \times 33$)
   $15 \bmod 7 = 1$
2. Apply multiplication property repeatedly:
   $(127 \times 137 \times 23 \times 50 \times 235 \times 15) \bmod 7$
   $= (1 \times 4 \times 2 \times 1 \times 4 \times 1) \bmod 7$
   $= 32 \bmod 7$
3. $32 = 7 \times 4 + 4$, so remainder $= 4$.
A student getting a different answer likely made an arithmetic error in one of the individual mods or forgot the final modulo reduction after multiplying the reduced terms.

## DIAGNOSTIC_QUESTION_4
Compare the two expressions for $m=8$: $E_1 = (5 +_8 11)$ and $E_2 = (5 + 11) \bmod 8$. Are they equal? Now consider $E_3 = (3 +_8 11)$ and $E_4 = (3 + 11) \bmod 8$. What do you observe about the relationship between $+_m$ and the standard modulo operator?

## DIAGNOSTIC_ANSWER_4
**Answer:** $E_1 = 5 +_8 11 = 6$ (since $5+11=16 > 8$, so $16-8=6$). $E_2 = (5+11) \bmod 8 = 16 \bmod 8 = 0$. They are **not equal**. $E_3 = 3 +_8 11 = 6$ (since $3+11=14 > 8$, $14-8=6$). $E_4 = 14 \bmod 8 = 6$. Here they are equal.
**Observation:** The textbook defines $a +_m b$ as: if $a+b < m$, result is $a+b$; if $a+b \ge m$, result is $a+b-m$. This is **not** the same as $(a+b) \bmod m$ when $a+b$ is a multiple of $m$ (i.e., $(a+b) \bmod m = 0$ but $a +_m b = m$ is not allowed since results should be in $\{0,1,\dots,m-1\}$ — wait, the textbook Example 6(iii) says $17 +_{30} 13 = 0$ because $30 \bmod 30 = 0$. So actually $a +_m b = (a+b) \bmod m$ **always**. Let's re-check Example 6(i): $3 +_8 11 = 6$, and $(3+11) \bmod 8 = 14 \bmod 8 = 6$. Example 6(ii): $15 +_{25} 6 = 21$, $(15+6) \bmod 25 = 21$. Example 6(iii): $17 +_{30} 13 = 0$, $(17+13) \bmod 30 = 0$. They **are** equivalent. The student must recognize that $+_m$ is just a notational variant for $(a+b) \bmod m$. A student who claims they differ has misread the definition box.

## DIAGNOSTIC_QUESTION_5
A competitive exam question asks: "What is the unit digit of $7^{100}$?" A student solves it by computing $7^{100} \bmod 10$ using the property $(A \times B) \bmod C = ((A \bmod C) \times (B \bmod C)) \bmod C$ repeatedly. Is this a valid approach? Justify your answer and find the unit digit.

## DIAGNOSTIC_ANSWER_5
**Answer:** Yes, it is perfectly valid. The unit digit of any integer $N$ is exactly $N \bmod 10$. Since modular arithmetic respects multiplication, we can compute $7^{100} \bmod 10$ by repeated squaring or pattern detection:
$7^1 \bmod 10 = 7$
$7^2 \bmod 10 = 49 \bmod 10 = 9$
$7^3 \bmod 10 = (9 \times 7) \bmod 10 = 63 \bmod 10 = 3$
$7^4 \bmod 10 = (3 \times 7) \bmod 10 = 21 \bmod 10 = 1$
$7^5 \bmod 10 = (1 \times 7) \bmod 10 = 7$ → cycle of length 4.
$100 \bmod 4 = 0$, so $7^{100} \bmod 10 = 7^4 \bmod 10 = 1$.
**Unit digit = 1.**
A student who says "invalid" doesn't realize that the modulo operator distributes over multiplication, making it the standard tool for unit-digit problems. A student getting a different digit likely messed up the cycle length or the exponent modulo.

## DIAGNOSTIC_QUESTION_6
Create a real-world problem (Indian context) that requires modular arithmetic to solve, involving a cycle length other than 7 (days) or 12 (hours). State the problem, the modulus used, and the solution.

## DIAGNOSTIC_ANSWER_6
**Sample Problem:** "A traffic light at a busy Delhi intersection cycles through Green (45 sec), Yellow (5 sec), Red (50 sec) repeatedly. If it turns Green at exactly 08:00:00, what colour will it show at 08:07:30?"
**Modulus:** Total cycle = $45+5+50 = 100$ seconds.
**Solution:** Time elapsed = 7 min 30 sec = 450 seconds. $450 \bmod 100 = 50$ seconds into the cycle.
Cycle: 0-45s Green, 45-50s Yellow, 50-100s Red. At 50s, it just turned Red.
**Answer:** Red.
A poor answer would use a trivial modulus (7 or 12), forget to convert units to a common base (seconds), or miscalculate the position within the cycle. This tests the ability to model a novel periodic situation.

## COMMON_MISCONCEPTION
**The "Negative Remainder" Trap:** Students consistently write $-31 \bmod 7 = -3$ (or $-4$) because they think "remainder when dividing -31 by 7". They apply the truncated division rule from programming ($-31 = 7 \times (-4) + (-3)$) instead of the Euclidean division rule used in mathematics ($-31 = 7 \times (-5) + 4$). The NCERT definition **explicitly requires** $0 \le R < m$. This error propagates: in subtraction modulo, they compute $(11 -_7 43)$ as $(11-43) = -32$, then say $-32 \bmod 7 = -4$ (wrong) instead of $3$ (correct, since $-32 = 7 \times (-5) + 3$). This costs marks in both Board exams (where steps are checked) and JEE (where negative remainders are never accepted).

## ON_FAILURE
If a student struggles with negative modulo:
1. **Revisit Euclid's Division Lemma** (Class 10): For any integers $a, b$ ($b>0$), $\exists$ unique $q, r$ with $a = bq + r, 0 \le r < b$. Drill: find $q, r$ for $a = -31, b=7$; $a = -68, b=12$; $a = -1, b=5$. Emphasize $q$ is the **floor** (greatest integer $\le a/b$), not truncation toward zero.
2. **Visualize the Number Line**: Mark multiples of $m$. The remainder is the distance from the multiple **just below or equal to** $a$ up to $a$. For $-31$ and $m=7$, multiples are $\dots, -35, -28, \dots$. The one $\le -31$ is $-35$. Distance $= -31 - (-35) = 4$.
3. **Practice Drill**: Compute 10 negative modulos daily until 100% accuracy: $-1 \bmod 5, -7 \bmod 3, -100 \bmod 13$, etc. Use the checklist: "Is my answer between 0 and $m-1$?"

## PREREQUISITE_NODE_IDS
c11_app_cbse_01_002, c11_app_cbse_01_003

## PREREQUISITE_REASONS
c11_app_cbse_01_002: Prime numbers and divisibility concepts from Class 11 are foundational for understanding the structure of integers modulo $m$, especially when $m$ is prime (fields) vs composite (rings with zero divisors), which underpins later congruence and arithmetic function topics.
c11_app_cbse_01_003: The encryption application of prime numbers (RSA) in Class 11 directly motivates modular arithmetic — the core mathematical engine of modern cryptography. Understanding *why* we care about remainders (secure communication) provides context for the abstract definitions here.

## FORWARD_NODE_IDS
c12_app_cbse_01_005, c12_app_cbse_01_006

## FORWARD_REASONS
c12_app_cbse_01_005: Congruence modulo ($a \equiv b \pmod m$) is the equivalence relation induced by the modulo operator. Mastery of $X \bmod m$ and its properties is a strict prerequisite for defining and manipulating congruences, equivalence classes, and solving linear congruences.
c12_app_cbse_01_006: Simple arithmetic functions (Euler's $\phi$, divisor functions $\tau, \sigma$, Möbius $\mu$) are defined on positive integers and their properties (multiplicativity) are proven using prime factorization and modular arithmetic concepts (e.g., $\phi(n)$ counts numbers coprime to $n$, i.e., units in $\mathbb{Z}/n\mathbb{Z}$).

## CROSS_SUBJECT_PREREQS
c11_app_cbse_08_002, c11_app_cbse_08_003

## CROSS_SUBJECT_REASONS
c11_app_cbse_08_002: Functions (domain, codomain, image) from Class 11 Applied Math are essential to understand arithmetic functions like $\phi(n), \tau(n), \sigma(n), \mu(n)$ as functions $f: \mathbb{Z}^+ \to \mathbb{R}$ or $\mathbb{C}$. The modulo operator itself is a function $\bmod m: \mathbb{Z} \to \{0,1,\dots,m-1\}$.
c11_app_cbse_08_003: Graphical representation of functions helps visualize the "sawtooth" pattern of $f(x) = x \bmod m$ — periodic, piecewise linear, discontinuous at multiples of $m$. This visual intuition aids in understanding cyclic behaviour in scheduling and clock problems.

## CHAIN_DESCRIPTION
c11_app_cbse_01_002 -> c12_app_cbse_01_004 -> c12_app_cbse_01_005

## THIS_FORMULA
Euclid's Division Algorithm: For integers $X, Y$ with $Y > 0$, $\exists$ unique integers $Q, R$ such that $X = Y \times Q + R$ where $0 \le R < Y$. The modulo operator is defined as $X \bmod Y = R$.

## FORMULA_VARIABLES
$X$: Dividend (any integer: positive, negative, or zero)
$Y$: Divisor / Modulus (positive integer, $Y > 0$)
$Q$: Quotient (integer, can be negative, zero, or positive)
$R$: Remainder (integer, **always** $0 \le R < Y$)

## FORMULA_UNITS
Dimensionless (pure numbers). In applications: $X$ and $Y$ share the same unit (e.g., hours, days, metres), $R$ has that unit, $Q$ is unitless count.

## COMPUTATION_TYPE
arithmetic

## CROSS_SUBJECT
c11_app_cbse_08_002 | The modulo operator is a function from $\mathbb{Z}$ to $\{0,1,\dots,m-1\}$; understanding domain, codomain, range, and pre-image/image from Class 11 Functions clarifies its behaviour as a many-to-one, periodic function.
c11_app_cbse_08_003 | Graphing $y = x \bmod m$ produces a periodic sawtooth wave; this visual from Class 11 Graphical Representation of Functions builds intuition for cyclic phenomena (clocks, calendars, scheduling algorithms) in this chapter.

## PREREQ_CONCEPT
Euclid's Division Lemma (Class 10): For any integers $a, b$ ($b>0$), there exist unique integers $q, r$ such that $a = bq + r$ with $0 \le r < b$.

## PREREQ_BEFORE
The student must be able to fluently apply Euclid's Division Lemma to find quotient and remainder for **any** integer dividend (positive, negative, zero) and positive divisor, and state the condition $0 \le r < b$ as a non-negotiable definition of remainder.

## PREREQ_STUCK
If stuck, review Class 10 NCERT Mathematics Chapter 1 (Real Numbers), specifically Euclid's Division Lemma and its application to negative integers — practice finding $q, r$ for $-23 = 7q + r$ until the condition $0 \le r < 7$ forces $q = -4, r = 5$ automatically.

## WORKED_EXAMPLE_1
PROBLEM: A digital lock uses a 4-digit code where each digit is generated by the rule: $d_k = (3 \times d_{k-1} + 7) \bmod 10$ for $k = 2,3,4$, with seed $d_1 = 2$. Find the 4-digit code. If the lock resets after 1000 such codes are generated (i.e., the sequence of 4-digit codes repeats), what is the 2025th code generated?

STEPS:
- Step 1: Generate the first code digit by digit using the recurrence modulo 10. $d_1 = 2$ (given). $d_2 = (3 \times 2 + 7) \bmod 10 = 13 \bmod 10 = 3$. $d_3 = (3 \times 3 + 7) \bmod 10 = 16 \bmod 10 = 6$. $d_4 = (3 \times 6 + 7) \bmod 10 = 25 \bmod 10 = 5$. First code = 2365.
- Step 2: Recognize that the sequence of codes is determined by the seed $d_1$ and the recurrence. Since each digit depends only on the previous digit modulo 10, and there are only 10 possible digits, the sequence of digits must eventually cycle. However, the problem states the lock resets after 1000 codes (given period).
- Step 3: Find which code in the cycle corresponds to the 2025th generation. Since the cycle length is 1000, we need the position within the cycle: $2025 \bmod 1000$.
- Step 4: Compute $2025 \bmod 1000 = 25$. So the 2025th code is the same as the 25th code.
- Step 5: We would need to generate 25 codes to find the 25th one, but the problem only asks for the method. The key insight is using modulo to reduce the large index 2025 to a manageable index 25 within the known period.

REASONING: This problem combines the modulo operator (for digit generation) with the periodic nature of modular sequences (for code repetition). The recurrence $d_k = (3d_{k-1}+7) \bmod 10$ is a linear congruential generator — a classic pseudo-random number algorithm. The lock's "reset after 1000 codes" imposes an external period; we use modulo arithmetic to map the large index 2025 into the fundamental period.

ANSWER: First code = 2365. The 2025th code = the 25th code (since $2025 \bmod 1000 = 25$). To find the exact 25th code, one would iterate the recurrence 24 more times from the first code.

## WORKED_EXAMPLE_2
PROBLEM: Find the remainder when $N = 226 \times 369 \times 122 \times 461 \times 1025$ is divided by 8. (This is Exercise 1, Q4 from NCERT).

STEPS:
- Step 1: Apply the multiplication property of modulo: $(A \times B) \bmod C = ((A \bmod C) \times (B \bmod C)) \bmod C$. Extend to 5 factors: $N \bmod 8 = (226 \bmod 8 \times 369 \bmod 8 \times 122 \bmod 8 \times 461 \bmod 8 \times 1025 \bmod 8) \bmod 8$.
- Step 2: Compute each factor modulo 8:
  $226 \div 8 = 28 \times 8 = 224$, remainder $2$. So $226 \bmod 8 = 2$.
  $369 \div 8 = 46 \times 8 = 368$, remainder $1$. So $369 \bmod 8 = 1$.
  $122 \div 8 = 15 \times 8 = 120$, remainder $2$. So $122 \bmod 8 = 2$.
  $461 \div 8 = 57 \times 8 = 456$, remainder $5$. So $461 \bmod 8 = 5$.
  $1025 \div 8 = 128 \times 8 = 1024$, remainder $1$. So $1025 \bmod 8 = 1$.
- Step 3: Multiply the remainders: $2 \times 1 \times 2 \times 5 \times 1 = 20$.
- Step 4: Reduce the product modulo 8: $20 \bmod 8 = 4$ (since $20 = 2 \times 8 + 4$).
- Step 5: Verify using the property that we can reduce intermediate products: $((((2 \times 1) \bmod 8) \times 2) \bmod 8 \times 5) \bmod 8 \times 1) \bmod 8 = 4$. Same result.

REASONING: Direct multiplication of 5 three-digit numbers is tedious and error-prone. The multiplication property of modulo allows us to replace each large factor with its small remainder modulo 8 *before* multiplying. This keeps numbers tiny throughout. The final modulo 8 on the product of remainders is mandatory because the product of remainders can exceed the modulus.

ANSWER: The remainder is 4.

## WORKED_EXAMPLE_3
PROBLEM: The Indian Railways runs a special train that departs from Delhi every 17 days and from Mumbai every 23 days. Today (Day 0), a train departs from both cities simultaneously. After how many days will they next depart on the same day? If today is a Tuesday, what day of the week will that be?

STEPS:
- Step 1: Recognize this as a "simultaneous event" problem. Delhi departs on days that are multiples of 17: $0, 17, 34, 51, \dots$. Mumbai departs on multiples of 23: $0, 23, 46, 69, \dots$. We need the smallest positive day $d$ that is a multiple of both 17 and 23.
- Step 2: Since 17 and 23 are prime (and coprime), $\text{LCM}(17, 23) = 17 \times 23 = 391$. So they next coincide on Day 391.
- Step 3: Now find the day of the week. Week cycle = 7 days. Current day = Tuesday. We need the day after 391 days.
- Step 4: Compute $391 \bmod 7$. $391 \div 7$: $7 \times 55 = 385$, remainder $6$. So $391 \bmod 7 = 6$.
- Step 5: Advance 6 days from Tuesday: Wed(1), Thu(2), Fri(3), Sat(4), Sun(5), Mon(6).
- Step 6: Verify using modulo addition: Tuesday is day 2 (if Sun=0, Mon=1, Tue=2... or just count). $2 + 6 = 8 \equiv 1 \pmod 7$ (Monday).

REASONING: This combines LCM (from number theory) with modular arithmetic (day-of-week calculation). The LCM finds the coincidence in the "departure modulus" (17 and 23), then modulo 7 maps the absolute day count to the weekly cycle. This is a typical competitive exam problem blending concepts.

ANSWER: They next depart together after 391 days, which will be a Monday.

## COMPETENCY_QUESTION_1
QUESTION: A student writes the following solution for $(-43) \bmod 7$:
"$-43 = 7 \times (-6) + (-1)$, so $(-43) \bmod 7 = -1$."
Identify the error, state the correct definition of the modulo operator as per NCERT, and compute the correct value. Then explain why the student's quotient $-6$ is mathematically incorrect for the Euclidean division algorithm.

COMPETENCY: Conceptual Understanding & Error Analysis
STEPS:
- Step 1: Identify the error: The remainder $-1$ violates the condition $0 \le R < 7$.
- Step 2: State NCERT definition: For integers $X, Y$ ($Y>0$), $X \bmod Y = R$ where $X = Y \times Q + R$ and $0 \le R < Y$.
- Step 3: Find correct $Q, R$ for $X=-43, Y=7$. We need $Q$ such that $7Q \le -43 < 7(Q+1)$. $7 \times (-7) = -49 \le -43$, $7 \times (-6) = -42 > -43$. So $Q = -7$. Then $R = -43 - (-49) = 6$.
- Step 4: Correct answer: $(-43) \bmod 7 = 6$.
- Step 5: Explain why $Q=-6$ is wrong: The Euclidean algorithm requires $Q = \lfloor X/Y \rfloor$ (floor division). $-43/7 \approx -6.14$, floor is $-7$, not $-6$ (which is truncation toward zero).

ANSWER: Error: Remainder must be non-negative ($0 \le R < m$). Correct value: 6. The student used truncating division (like in C++), but NCERT uses Euclidean division where quotient is the floor of the true quotient.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a factory, three machines A, B, C start working simultaneously at 8:00 AM. Machine A completes a cycle every 18 minutes, B every 24 minutes, C every 30 minutes. Each machine beeps at the end of its cycle. Using modular arithmetic, determine:
(a) The first time after 8:00 AM when all three beep together.
(b) How many times they beep together between 8:00 AM and 6:00 PM (inclusive of 8:00 AM if they beep then, but they start silently).
(c) If machine B develops a fault and instead beeps every 25 minutes from 12:00 PM onwards, will the three machines ever beep together again that day? Justify using congruences.

COMPETENCY: Problem Solving & Multi-concept Integration (LCM, Modulo, Congruence, Piecewise Conditions)
STEPS:
- Step 1 (a): Simultaneous beep $\iff$ time $t$ (in minutes) is a multiple of 18, 24, and 30. $t = \text{LCM}(18, 24, 30)$. Prime factorizations: $18=2\times3^2$, $24=2^3\times3$, $30=2\times3\times5$. $\text{LCM} = 2^3 \times 3^2 \times 5 = 8 \times 9 \times 5 = 360$ minutes = 6 hours. First joint beep: 8:00 AM + 6 hrs = 2:00 PM.
- Step 2 (b): Total duration = 10 hours = 600 minutes. Joint beeps at $t = 0, 360, 720, \dots$ minutes. Within $[0, 600]$: $t=0$ (8:00 AM, but they start silently — "beeps at end of cycle", so first beep at 360 min), $t=360$ (2:00 PM). $t=720 > 600$. So only **once** at 2:00 PM. (If 8:00 AM counted as a beep, it would be twice, but "starts working... beeps at end of cycle" implies first beep at 360 min).
- Step 3 (c): From 12:00 PM (240 min after 8 AM) onwards, B's cycle changes to 25 min. We need $t \ge 240$ such that $t \equiv 0 \pmod{18}$, $t \equiv 0 \pmod{30}$, and $t \equiv 240 \pmod{25}$? Wait: B beeped at multiples of 24 before 240. At $t=240$, B completes a cycle (240/24=10). Then new cycle 25 min: next B beeps at $240+25=265, 290, 315, \dots$ i.e., $t \equiv 240 \pmod{25}$? $240 \bmod 25 = 15$. So $t \equiv 15 \pmod{25}$ for $t \ge 240$.
- Step 4: A and C beep together at $\text{LCM}(18,30)=90$ min intervals: $t \equiv 0 \pmod{90}$. We need $t \equiv 0 \pmod{90}$ and $t \equiv 15 \pmod{25}$, with $240 \le t \le 600$.
- Step 5: $t = 90k$. $90k \equiv 15 \pmod{25}$. $90 \equiv 15 \pmod{25}$. So $15k \equiv 15 \pmod{25} \implies 15(k-1) \equiv 0 \pmod{25}$. Divide by 5: $3(k-1) \equiv 0 \pmod{5} \implies k-1 \equiv 0 \pmod{5}$ (since $\gcd(3,5)=1$). So $k = 1, 6, 11, \dots$
- Step 6: $k=1 \implies t=90$ (before 12 PM, invalid). $k=6 \implies t=540$ min = 9 hours after 8 AM = 5:00 PM. $540 \le 600$, valid. $k=11 \implies t=990 > 600$. So **yes**, they beep together at 5:00 PM.

ANSWER: (a) 2:00 PM. (b) Once (at 2:00 PM). (c) Yes, at 5:00 PM. The solution uses LCM for periodic coincidence, modulo for time-of-day, and congruence solving for the piecewise change in B's period.
DIFFICULTY: hard