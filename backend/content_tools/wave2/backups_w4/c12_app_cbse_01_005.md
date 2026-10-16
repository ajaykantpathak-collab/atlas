## ELI5
On a seven-shelf clock, every number lands on a shelf, and numbers landing on the same shelf are congruent: 1000 and 6 both sit on Sunday's shelf. The formal test is simple — their difference must divide evenly by the modulus. Reduce big numbers before combining, and the arithmetic of enormous powers shrinks to shelf-hopping between a handful of drawers. Whole numbers, few shelves: that is why congruence tames the huge.

## DEFINITION
Two integers $a$ and $b$ are said to be **congruent modulo $m$** (where $m$ is a positive integer), written as $a \equiv b \pmod m$, if and only if they leave the same remainder when divided by $m$, or equivalently, if their difference $a - b$ is an integer multiple of $m$ (i.e., $m \mid (a-b)$).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must be able to: (1) Determine whether $a \equiv b \pmod m$ holds for given integers (including negative values) by computing non-negative remainders or checking divisibility of the difference; (2) Use properties of congruence (addition, subtraction, multiplication, exponentiation) to simplify large expressions modulo $m$; (3) Identify and list elements of an equivalence class $[r]_m$ for a given modulus $m$.

## SCOPE_BOUNDARY
This node covers: definition of congruence modulo $m$, verification using both remainder and divisibility criteria, properties of congruence (addition, subtraction, multiplication, power), equivalence classes and partitioning of $\mathbb{Z}$ into $m$ residue classes, and applications to finding remainders of large products/powers. It does **not** cover: modular inverses, solving linear congruences $ax \equiv b \pmod m$, Chinese Remainder Theorem, or Fermat's/Euler's theorems (beyond the scope of NCERT Class 12 Applied Mathematics Chapter 1).

## WALKTHROUGH
Start with the familiar "day of the week" problem: "If today is Wednesday, what day is it after 1000 days?" Students instinctively divide 1000 by 7 and use the remainder (6) to count forward. This *is* congruence modulo 7. Generalize: instead of days, use any modulus $m$ (like a 12-hour clock for time, 60 for minutes, 360 for angles). Show that $a \equiv b \pmod m$ means $a$ and $b$ land on the same "hour" on an $m$-hour clock. Emphasize the critical rule: **remainder $r$ must satisfy $0 \le r < m$**, even for negative dividends. Demonstrate $-31 \pmod 7$: find the multiple of 7 *just below* $-31$ (which is $-35$), then remainder $= -31 - (-35) = 4$. Connect to the NCERT illustration: $262 \equiv 137 \pmod 5$ because both leave remainder 2. End with the key insight: **Congruence turns infinite integers into just $m$ distinct classes**, making huge calculations manageable.

Takeaway: mastery means congruence tested two ways and the equivalence class enumerated. Exam moves: testing questions verify or reject a congruence by remainders or by divisibility of the difference; property questions carry addition, multiplication, and powers through the modulus; class questions list the members of a residue class. Method: convert both sides to shelf labels before any operation — powers especially, where reducing early saves entire pages. Drill: one thousand, one difference test, one class list. Same shelf is the whole definition; everything else is bookkeeping.

## DIAGNOSTIC_QUESTION_1
State the two equivalent conditions for $a \equiv b \pmod m$ to be true, where $a, b \in \mathbb{Z}$ and $m \in \mathbb{Z}^+$.

## DIAGNOSTIC_ANSWER_1
**Correct answer:** (1) $a$ and $b$ leave the same remainder when divided by $m$ (i.e., $a \bmod m = b \bmod m$ with $0 \le r < m$); (2) $m$ divides $a-b$ (i.e., $a-b = km$ for some integer $k$, written $m \mid (a-b)$).
**What a wrong answer reveals:** If a student only gives one condition, they haven't internalized the equivalence. If they say "remainder is $a-b$" or allow negative remainders (e.g., $-31 \bmod 7 = -3$), they confuse the modulo *operator* (which always yields $0 \le r < m$) with the remainder in a specific division algorithm step. This leads to errors in board exams (1-mark definition questions) and JEE (where negative mod handling is a frequent trap).

## DIAGNOSTIC_QUESTION_2
Explain why $-68 \bmod 12 = 4$ and not $-8$ or $8$. Use the definition $X = Y \times Q + R$ with $0 \le R < Y$.

## DIAGNOSTIC_ANSWER_2
**Correct answer:** We need $Q, R \in \mathbb{Z}$ such that $-68 = 12 \times Q + R$ and $0 \le R < 12$. The multiple of 12 *just below* $-68$ is $-72 = 12 \times (-6)$. Then $R = -68 - (-72) = 4$. So $Q = -6, R = 4$. $-8$ violates $R \ge 0$; $8$ would require $-68 = 12 \times Q + 8 \implies 12Q = -76$, not an integer multiple.
**What a wrong answer reveals:** Students often apply the "positive remainder" rule only for positive dividends. They compute $68 \bmod 12 = 8$ and assume $-68 \bmod 12 = -8$ or $8$. This is the **#1 error in modulo arithmetic** — forgetting that the modulo operator *always* returns a non-negative remainder in standard mathematical convention (and NCERT). In competitive exams, this sign error changes the final answer completely.

## DIAGNOSTIC_QUESTION_3
Find the remainder when $(127 \times 137 \times 23 \times 50 \times 235 \times 15)$ is divided by $7$, using congruence properties. Show every step.

## DIAGNOSTIC_ANSWER_3
**Correct answer with steps:**
1. Reduce each factor modulo 7:
   $127 \div 7 = 18 \times 7 + 1 \Rightarrow 127 \equiv 1 \pmod 7$
   $137 \div 7 = 19 \times 7 + 4 \Rightarrow 137 \equiv 4 \pmod 7$
   $23 \div 7 = 3 \times 7 + 2 \Rightarrow 23 \equiv 2 \pmod 7$
   $50 \div 7 = 7 \times 7 + 1 \Rightarrow 50 \equiv 1 \pmod 7$
   $235 \div 7 = 33 \times 7 + 4 \Rightarrow 235 \equiv 4 \pmod 7$
   $15 \div 7 = 2 \times 7 + 1 \Rightarrow 15 \equiv 1 \pmod 7$
2. Multiply the residues: $(1 \times 4 \times 2 \times 1 \times 4 \times 1) \bmod 7 = 32 \bmod 7$.
3. $32 = 4 \times 7 + 4 \Rightarrow 32 \equiv 4 \pmod 7$.
**Final remainder: 4.**
**What a wrong answer reveals:** If a student multiplies the original numbers first, they face overflow/calculation errors. If they incorrectly reduce (e.g., $137 \bmod 7 = 3$), they miscompute the quotient. If they forget the final modulo reduction ($32$ instead of $4$), they confuse "product of residues" with "final remainder". This tests the multiplication property $(A \times B) \bmod C = ((A \bmod C) \times (B \bmod C)) \bmod C$ — a staple of board 3-mark questions and JEE Main.

## DIAGNOSTIC_QUESTION_4
Given $5 \equiv 2 \pmod 3$, use Property 5 ($a \equiv b \pmod m \implies a^k \equiv b^k \pmod m$) to find $5^6 \bmod 4$. Explain why we *cannot* directly apply Property 5 with modulus 3 to find the answer modulo 4.

## DIAGNOSTIC_ANSWER_4
**Correct answer:**
To find $5^6 \bmod 4$, first note $5 \equiv 1 \pmod 4$ (since $5 = 4 \times 1 + 1$).
By Property 5: $5^6 \equiv 1^6 \equiv 1 \pmod 4$. So $5^6 \bmod 4 = 1$.
**Why modulus 3 fails:** Property 5 preserves the *same* modulus: $a \equiv b \pmod m \implies a^k \equiv b^k \pmod m$. Here $5 \equiv 2 \pmod 3$ gives info modulo 3, but we need modulo 4. Congruences modulo different moduli are independent; $5^6 \equiv 2^6 \equiv 64 \equiv 1 \pmod 3$ is true but irrelevant for $\bmod 4$.
**What a wrong answer reveals:** Students often think "if $a \equiv b \pmod m$, then $a^k \equiv b^k$ for *any* modulus". They might compute $2^6 \bmod 4 = 0$ and claim $5^6 \bmod 4 = 0$. This confuses the modulus in the hypothesis with the target modulus. Board exams test this via "Find $5^{100} \bmod 6$" where the trick is finding a base congruent to $\pm 1$ modulo 6.

## DIAGNOSTIC_QUESTION_5
A student claims: "If $a \equiv b \pmod m$ and $c \equiv d \pmod m$, then $a^c \equiv b^d \pmod m$." Is this always true? If yes, prove it; if no, give a counterexample with $m=5$.

## DIAGNOSTIC_ANSWER_5
**Correct answer:** **False.** Counterexample: $m=5$, $a=2, b=7$ (so $2 \equiv 7 \pmod 5$), $c=3, d=8$ (so $3 \equiv 8 \pmod 5$).
Then $a^c = 2^3 = 8 \equiv 3 \pmod 5$, but $b^d = 7^8$. Now $7 \equiv 2 \pmod 5$, so $7^8 \equiv 2^8 = 256 \equiv 1 \pmod 5$.
Since $3 \not\equiv 1 \pmod 5$, the claim fails.
**Why it fails:** Property 5 only allows exponentiation by a *fixed integer* $k$ ($a^k \equiv b^k$). It does **not** allow the exponent itself to vary within a congruence class. The exponent is not "modulo $m$" in the base; modular exponentiation follows Euler's theorem ($\phi(m)$ cycle), not modulo $m$.
**What a wrong answer reveals:** Students overgeneralize the property "congruence can be multiplied" to "congruence can be exponentiated with congruent exponents". This is a **JEE Advanced-level trap** — understanding that $a^b \bmod m$ depends on $b \bmod \phi(m)$ (when $\gcd(a,m)=1$), not $b \bmod m$.

## DIAGNOSTIC_QUESTION_6
Construct a real-world scenario (Indian context) where congruence modulo $m$ naturally arises with $m \notin \{7, 12, 24, 60\}$. Define the modulus, the congruence classes, and give a practical question solvable using congruence.

## DIAGNOSTIC_ANSWER_6
**Expected answer (example):**
**Scenario:** A metro train runs on a circular loop with **17 stations** numbered $0$ to $16$. The train moves forward one station every 3 minutes.
**Modulus:** $m = 17$ (number of stations).
**Congruence classes:** Station $k$ corresponds to class $[k]_{17} = \{ \dots, k-17, k, k+17, k+34, \dots \}$ — all times (in 3-min intervals) when the train is at station $k$.
**Practical question:** "If the train is at station 5 now (time $t=0$), at which station will it be after 1000 intervals (3000 minutes)?"
**Solution:** $5 + 1000 \equiv 5 + 1000 \bmod 17$. $1000 = 17 \times 58 + 14 \Rightarrow 1000 \equiv 14 \pmod{17}$. So station $= (5+14) \bmod 17 = 19 \bmod 17 = 2$.
**What a poor answer reveals:** Using $m=7,12,24,60$ shows lack of transfer. Not defining classes as infinite sets shows incomplete understanding of equivalence classes. A question solvable without congruence (e.g., simple division) shows failure to create a *need* for the concept. This tests the competency "model real-world periodic phenomena using modular arithmetic" — a CBSE case-study pattern.

## COMMON_MISCONCEPTION
**Misconception:** "The remainder when dividing a negative number is negative (or the same as the positive dividend's remainder)."
**Exact wrong reasoning:** Students compute $68 \div 12 = 5$ rem $8$, then assume $-68 \div 12 = -5$ rem $-8$ (truncating toward zero) or $-68 \div 12 = -6$ rem $8$ (incorrectly keeping positive remainder without adjusting quotient). They write $-31 \bmod 7 = -3$ or $3$ instead of $4$.
**Why students make this error:** In programming languages (C, Java, Python 2), `%` operator often returns negative remainders for negative dividends (truncated division). School math (Euclid's algorithm) defines remainder as *always non-negative* ($0 \le r < m$) with quotient *floor* division. NCERT follows the mathematical convention: $-31 = 7 \times (-5) + 4$. The mismatch between coding intuition and math convention causes this persistent error. **Consequence:** In board exams, $-31 \bmod 7 = -3$ gets 0/1 mark. In JEE, a single sign error in a multi-step modulo problem (e.g., finding last digit of $7^{-100}$) cascades to a completely wrong answer.

## ON_FAILURE
1. **Revisit the definition:** Go to `c12_app_cbse_01_004` (MODULAR ARITHMETIC) and re-work Examples 1 & 2 from NCERT (page 1.4–1.5), focusing *only* on negative dividend cases: $-31 \bmod 7$, $-68 \bmod 12$, $-18 \bmod 5$. Write each as $X = Y \times Q + R$ with $0 \le R < Y$; verify $Q$ is the *floor* (not truncation).
2. **Drill the pattern:** For modulus $m=5$, list $X \bmod 5$ for $X = -10, -9, \dots, -1, 0, 1, \dots, 10$. Observe the sequence: $0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0$. See that negative numbers *continue the cycle backward*, not flip signs.
3. **Re-diagnostic:** Solve: "Find $(-123 \times 456) \bmod 11$." If you get a negative intermediate remainder, return to step 1. Correct path: $-123 \bmod 11 = 10$ (since $-123 = 11 \times (-12) + 9$? Wait: $-123 = 11 \times (-12) + 9$? $11 \times (-12) = -132$, $-123 - (-132) = 9$. So $-123 \equiv 9 \equiv -2 \pmod{11}$. Better: $-123 \bmod 11 = 9$. $456 \bmod 11 = 5$. Product $= 45 \bmod 11 = 1$. If you got $-2 \times 5 = -10 \equiv 1$, that's also valid *if* you convert to positive at the end. Mastery: always keep residues in $\{0,1,\dots,m-1\}$.

## PREREQUISITE_NODE_IDS
c12_app_cbse_01_004, c11_app_cbse_01_002

## PREREQUISITE_REASONS
c12_app_cbse_01_004: Provides the modulo operator definition, properties (addition, subtraction, multiplication), and the critical convention $0 \le R < Y$ for negative dividends — the direct foundation for congruence.
c11_app_cbse_01_002: Prime numbers and divisibility ($m \mid (a-b)$) are essential for understanding the "difference is multiple of $m$" condition and later for Euler's totient function (though not in this node's scope).

## FORWARD_NODE_IDS
c12_app_cbse_01_006

## FORWARD_REASONS
c12_app_cbse_01_006: Simple arithmetic functions (Euler's $\phi$, $\tau$, $\sigma$, $\mu$) rely on congruence concepts: $\phi(n)$ counts numbers coprime to $n$ (i.e., units in $\mathbb{Z}/n\mathbb{Z}$); multiplicative properties of $\phi, \tau, \sigma$ use prime factorization which connects to congruence classes modulo prime powers.

## CROSS_SUBJECT_PREREQS
c11_app_cbse_03_004, c11_app_cbse_03_005, c11_app_cbse_04_005

## CROSS_SUBJECT_REASONS
c11_app_cbse_03_004: Types of sets (finite/infinite) underpin the partitioning of $\mathbb{Z}$ into $m$ equivalence classes (each infinite).
c11_app_cbse_03_005: Subsets — each equivalence class $[r]_m$ is a subset of $\mathbb{Z}$; the $m$ classes form a partition (disjoint, union = $\mathbb{Z}$).
c11_app_cbse_04_005: Types of relations — congruence modulo $m$ is an *equivalence relation* (reflexive, symmetric, transitive), explicitly proved in NCERT (page 1.11). This is the bridge from abstract relations to number theory.

## CHAIN_DESCRIPTION
c12_app_cbse_01_004 -> c12_app_cbse_01_005 -> c12_app_cbse_01_006

## THIS_FORMULA
$a \equiv b \pmod m \iff m \mid (a-b) \iff a \bmod m = b \bmod m$ (with $0 \le r < m$).
Properties: If $a \equiv b \pmod m$ and $c \equiv d \pmod m$, then:
$a+c \equiv b+d \pmod m$; $a-c \equiv b-d \pmod m$; $a \times c \equiv b \times d \pmod m$; $a^k \equiv b^k \pmod m$ ($k \in \mathbb{Z}^+$).

## FORMULA_VARIABLES
$a,b,c,d \in \mathbb{Z}$ (any integers, positive/negative/zero); $m \in \mathbb{Z}^+$ (positive integer modulus); $k \in \mathbb{Z}^+$ (positive integer exponent); $r \in \{0,1,\dots,m-1\}$ (standard residue).

## FORMULA_UNITS
Dimensionless (pure numbers). Modulus $m$ has no unit; it defines the cyclic group size.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_app_cbse_03_004 | Equivalence classes partition the infinite set $\mathbb{Z}$ into $m$ disjoint infinite subsets — a direct application of set partitioning.
c11_app_cbse_04_005 | Congruence modulo $m$ is the canonical example of an equivalence relation (reflexive, symmetric, transitive) on $\mathbb{Z}$, used to define quotient sets $\mathbb{Z}/m\mathbb{Z}$.

## PREREQ_CONCEPT
Modulo operator with non-negative remainder convention for all integers (including negatives): $X \bmod Y = R$ where $X = Y \times Q + R$, $0 \le R < Y$, $Q = \lfloor X/Y \rfloor$.

## PREREQ_BEFORE
Student must fluently compute $X \bmod m$ for any integer $X$ (positive, negative, zero) and positive $m$, obtaining $R \in \{0,1,\dots,m-1\}$.

## PREREQ_STUCK
If stuck on negative modulo, review `c12_app_cbse_01_004` Example 1(ii) and Illustration 1 (Table 1): the pattern for $X < 0, Y > 0$ is $R = Y - (|X| \bmod Y)$ unless $|X| \bmod Y = 0$, then $R=0$.

## WORKED_EXAMPLE_1
**PROBLEM:** A temple bell rings every 48 minutes. If it rang at 6:00 AM, will it ring exactly at 10:00 PM on the same day? If not, when is the nearest ring before 10:00 PM?
**STEPS:**
- Step 1: Convert times to minutes from a reference. 6:00 AM = 6 × 60 = 360 minutes past midnight. 10:00 PM = 22 × 60 = 1320 minutes past midnight.
- Step 2: Time elapsed from 6:00 AM to 10:00 PM = 1320 − 360 = 960 minutes.
- Step 3: The bell rings at times $t = 360 + 48k$ minutes ($k = 0,1,2,\dots$). We need $360 + 48k = 1320 \Rightarrow 48k = 960 \Rightarrow k = 20$. Since $k=20$ is an integer, the bell *does* ring exactly at 10:00 PM.
- Step 4: Verify using congruence: $1320 \equiv 360 \pmod{48}$? $1320 - 360 = 960 = 48 \times 20$. Yes, $48 \mid 960$, so $1320 \equiv 360 \pmod{48}$.
- Step 5: (If the question asked "nearest before" for a non-matching time, e.g., 10:05 PM = 1325 min: $1325 - 360 = 965$. $965 \bmod 48 = 5$ (since $48 \times 20 = 960$). So last ring was 5 minutes earlier at 10:00 PM.)
**REASONING:** This models a periodic event (bell) as an arithmetic progression modulo the period. Congruence $t \equiv t_0 \pmod{T}$ checks if time $t$ aligns with the cycle. The non-negative remainder gives the offset from the last event.
**ANSWER:** Yes, the bell rings exactly at 10:00 PM (20th ring after 6:00 AM).

## WORKED_EXAMPLE_2
**PROBLEM:** Find the remainder when $3^{100} + 4^{100}$ is divided by 7.
**STEPS:**
- Step 1: Reduce bases modulo 7: $3 \bmod 7 = 3$; $4 \bmod 7 = 4$. Note $4 \equiv -3 \pmod 7$.
- Step 2: Compute powers modulo 7 using cycles. For $3$: $3^1=3$, $3^2=9\equiv2$, $3^3=6\equiv-1$, $3^6\equiv1 \pmod 7$. Cycle length 6.
  $100 = 6 \times 16 + 4 \Rightarrow 3^{100} \equiv (3^6)^{16} \times 3^4 \equiv 1^{16} \times 3^4 \equiv 3^4 \pmod 7$.
  $3^4 = 3^3 \times 3 \equiv (-1) \times 3 = -3 \equiv 4 \pmod 7$.
- Step 3: For $4$: $4 \equiv -3 \pmod 7 \Rightarrow 4^{100} \equiv (-3)^{100} = 3^{100} \equiv 4 \pmod 7$ (since 100 is even).
- Step 4: Sum: $3^{100} + 4^{100} \equiv 4 + 4 = 8 \equiv 1 \pmod 7$.
- Step 5: Verify with alternative: $4^3 = 64 \equiv 1 \pmod 7$, cycle 3. $100 = 3 \times 33 + 1 \Rightarrow 4^{100} \equiv 4^1 = 4$. Consistent.
**REASONING:** Using $a \equiv b \pmod m \implies a^k \equiv b^k \pmod m$ (Property 5) reduces huge exponents. Recognizing $4 \equiv -3 \pmod 7$ exploits symmetry: $(-3)^{even} = 3^{even}$. The cycle length (order) divides $\phi(7)=6$ (Fermat's little theorem), but we only need the cycle observed by computation.
**ANSWER:** Remainder = 1.

## WORKED_EXAMPLE_3
**PROBLEM:** In a 30-day month, a medicine must be taken every 8 hours (3 times a day). The first dose is taken at 8:00 AM on the 1st. On which dates and times will the dose coincide with 8:00 AM again? (Assume exact 8-hour intervals.)
**STEPS:**
- Step 1: Dose times: $t_k = 8:00 \text{ AM} + 8k$ hours, $k=0,1,2,\dots$. 8:00 AM corresponds to hour 8 (24-hr clock) or simply $t \equiv 8 \pmod{24}$ for 8:00 AM occurrences.
- Step 2: We need $t_k \equiv 8 \pmod{24}$. $t_k = 8 + 8k$ (in hours from midnight of 1st). So $8 + 8k \equiv 8 \pmod{24} \Rightarrow 8k \equiv 0 \pmod{24}$.
- Step 3: Solve $8k \equiv 0 \pmod{24}$. This means $24 \mid 8k \Rightarrow 3 \mid k$. So $k = 3, 6, 9, \dots$ (multiples of 3).
- Step 4: $k=3 \Rightarrow t = 8 + 24 = 32$ hours from start = 8:00 AM on 2nd (since 24 hrs = 1 day).
  $k=6 \Rightarrow t = 8 + 48 = 56$ hrs = 8:00 AM on 3rd.
  Generally, every 3rd dose (every 24 hours) hits 8:00 AM.
- Step 5: In 30 days (720 hours), max $k$: $8 + 8k \le 728$ (end of 30th day 8 AM? Better: doses at $k=0$ to $k=90$ since $8 \times 90 = 720$). Multiples of 3 up to 90: $k=0,3,6,\dots,90$. That's 31 times (including start).
- Step 6: Dates: 1st, 2nd, 3rd, ..., 30th, and 31st? Wait: $k=90 \Rightarrow t=8+720=728$ hrs = 30 days + 8 hrs = 8:00 AM on 31st (but month has 30 days). So last within month: $k=87 \Rightarrow 8+696=704$ hrs = 29 days + 8 hrs = 8:00 AM on 30th. Total 30 times (1st through 30th).
**REASONING:** This combines two periodicities: dosing interval (8 hr) and clock cycle (24 hr). The coincidence condition is a linear congruence $8k \equiv 0 \pmod{24}$. Solving $8k = 24m \Rightarrow k=3m$ shows the LCM(8,24)=24 hour alignment. The equivalence class $[8]_{24}$ represents all 8:00 AM times; we find which dosing times fall in this class.
**ANSWER:** Every day at 8:00 AM (1st through 30th), i.e., 30 times in the month. The doses at $k=0,3,6,\dots,87$ (every 3rd dose) coincide with 8:00 AM.

## COMPETENCY_QUESTION_1
**QUESTION:** A digital lock uses a 4-digit code (0000–9999). The lock opens if the entered code is congruent to the true code modulo 37. The true code is 2024. How many distinct 4-digit codes will open the lock? List the smallest and largest such codes.
**COMPETENCY:** Mathematical modeling and application of equivalence classes to a real-world security scenario.
**STEPS:**
- Step 1: True code $c = 2024$. Modulus $m = 37$. We need all $x \in [0, 9999]$ such that $x \equiv 2024 \pmod{37}$.
- Step 2: Compute $2024 \bmod 37$. $37 \times 54 = 1998$. $2024 - 1998 = 26$. So $2024 \equiv 26 \pmod{37}$.
- Step 3: The equivalence class $[26]_{37} = \{26 + 37k \mid k \in \mathbb{Z}\}$. Find $k$ such that $0 \le 26 + 37k \le 9999$.
- Step 4: Lower bound: $26 + 37k \ge 0 \Rightarrow k \ge 0$ (since $k=-1$ gives $-11$). Smallest: $k=0 \Rightarrow x=26$ (code 0026).
- Step 5: Upper bound: $26 + 37k \le 9999 \Rightarrow 37k \le 9973 \Rightarrow k \le \lfloor 9973/37 \rfloor = 269$ (since $37 \times 269 = 9953$, $26+9953=9979$; $k=270 \Rightarrow 26+9990=10016 > 9999$). Largest: $k=269 \Rightarrow x = 26 + 37 \times 269 = 26 + 9953 = 9979$.
- Step 6: Count: $k = 0, 1, \dots, 269$ → 270 distinct codes.
**ANSWER:** 270 codes open the lock. Smallest: 0026. Largest: 9979.
**DIFFICULTY:** medium

## COMPETENCY_QUESTION_2
**QUESTION:** Let $S = \{x \in \mathbb{Z} \mid 1 \le x \le 1000 \text{ and } x^2 \equiv 1 \pmod{24}\}$. Find the number of elements in $S$ and the sum of all elements in $S$.
**COMPETENCY:** Analytical reasoning with quadratic congruences and symmetry in equivalence classes (combines congruence, number theory, and series summation).
**STEPS:**
- Step 1: Solve $x^2 \equiv 1 \pmod{24}$. Factor: $(x-1)(x+1) \equiv 0 \pmod{24}$. We need $24 \mid (x-1)(x+1)$.
- Step 2: Since $x-1$ and $x+1$ differ by 2, they have same parity. For product to be divisible by $8=2^3$ and $3$, analyze modulo 8 and modulo 3 separately (Chinese Remainder Theorem idea, but elementary).
- Step 3: Modulo 8: squares of odd numbers: $1^2=1, 3^2=9\equiv1, 5^2=25\equiv1, 7^2=49\equiv1 \pmod 8$. So any odd $x$ satisfies $x^2 \equiv 1 \pmod 8$. Even $x$ give $0,4 \pmod 8$. So $x$ must be odd.
- Step 4: Modulo 3: $x^2 \equiv 1 \pmod 3 \Rightarrow x \not\equiv 0 \pmod 3$. So $x \equiv \pm 1 \pmod 3$.
- Step 5: Combine: $x$ odd and $x \not\equiv 0 \pmod 3$. Equivalently, $x \equiv 1, 5, 7, 11, 13, 17, 19, 23 \pmod{24}$ (the 8 units modulo 24).
- Step 6: In $[1, 1000]$, how many numbers in each residue class? $1000 = 24 \times 41 + 16$. Each of the 8 classes appears 41 times fully, plus residues $\le 16$ appear once more.
  Residues in our set: $1,5,7,11,13$ (five of them $\le 16$), and $17,19,23$ (three $>16$).
  Count = $8 \times 41 + 5 = 328 + 5 = 333$.
- Step 7: Sum: Each full block of 24 contributes sum of the 8 residues = $1+5+7+11+13+17+19+23 = 96$.
  41 blocks: $41 \times 96 = 3936$. But each block is shifted: block $j$ (0-indexed) has numbers $24j + r$. Sum over $j=0..40$ of $\sum_r (24j + r) = 24 \times 8 \times \sum_{j=0}^{40} j + 41 \times 96 = 192 \times \frac{40 \times 41}{2} + 3936 = 192 \times 820 + 3936 = 157440 + 3936 = 161376$.
  Plus partial block ($j=41$, residues $\le 16$): $24 \times 41 \times 5 + (1+5+7+11+13) = 4920 + 37 = 4957$.
  Total sum = $161376 + 4957 = 166333$.
**ANSWER:** $|S| = 333$. Sum = 166333.
**DIFFICULTY:** hard