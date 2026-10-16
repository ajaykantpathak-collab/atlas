## ELI5
A metro train leaves the depot with 50 passengers; at every station exactly 12 board and nobody steps off. The count runs 50, 62, 74 - a sequence climbing by the same fixed difference each time: an Arithmetic Progression. To jump straight to the fiftieth station without listing fifty terms, use the general term a + (n-1)d - and read (n-1) carefully: it counts the gaps between the first term and term n, not the terms themselves. Any linear expression in n is an AP whose common difference is the coefficient of n.

## DEFINITION
An Arithmetic Progression (AP) is a sequence of numbers in which the difference between any term and its immediately preceding term is a constant, denoted by 'd' (common difference). The general term is given by $a_n = a + (n-1)d$, where 'a' is the first term and $n \in \mathbb{N}$.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can identify if a given sequence or nth-term formula represents an AP, derive the first term and common difference from any representation (list, formula, or word problem), and calculate any specific term or the position of a given term using $a_n = a + (n-1)d$.

## SCOPE_BOUNDARY
This node covers the definition, general term derivation, identification of APs from nth-term formulas ($a_n = An+B$), and basic term-finding problems. It does NOT cover sum of n terms ($S_n$), properties of APs (adding/multiplying constants), selection of terms ($a-d, a, a+d$), Arithmetic Mean, or application problems involving sums — these are covered in subsequent nodes (c11_app_cbse_05_004 to c11_app_cbse_05_007).

## WALKTHROUGH
Start with a relatable scenario: "A metro train starts with 50 passengers. At every station, exactly 12 new passengers board and no one gets off. How many passengers are on the train after the 10th station?" This creates the sequence 50, 62, 74... Guide students to see the pattern: first term $a=50$, fixed increase $d=12$. Ask: "Can we find the 50th station passengers without listing all 50 terms?" Introduce $a_n = a + (n-1)d$ as the shortcut. Emphasize that $(n-1)$ counts the *number of gaps* between term 1 and term n, not the number of terms. The key insight: any linear expression in $n$ (like $3n+2$) is an AP where the coefficient of $n$ is the common difference.

Takeaway: mastery means extracting a and d from any representation - list, formula or word problem - and jumping to any term without listing. Exam moves: find-the-nth-term questions and which-term-is-this items on the boarding scene. Check yourself: the gap count is terms minus one - the first station contributes no boarding, and likewise the first term gets no share of d. Students miss it because (n-1) looks like a typo for n, when the station-by-station count shows the design: d is applied once per gap, and there is always one fewer gap than terms - the linear shortcut only looks magical until you count the gaps yourself.

## DIAGNOSTIC_QUESTION_1
State the definition of an Arithmetic Progression and write the formula for its general term $a_n$. Identify the meaning of each variable in the formula.

## DIAGNOSTIC_ANSWER_1
An AP is a sequence where $a_{n+1} - a_n = d$ (constant) for all $n \in \mathbb{N}$. General term: $a_n = a + (n-1)d$. Here, $a$ = first term, $d$ = common difference, $n$ = term position (natural number). A wrong answer (e.g., writing $a_n = a + nd$ or confusing $d$ with the second term) reveals the student memorizes the formula without understanding that $(n-1)$ represents the number of *steps* from the first term.

## DIAGNOSTIC_QUESTION_2
The nth term of a sequence is given by $a_n = 5 - 3n$. Is this an AP? If yes, write its first term and common difference. Explain how you identified the common difference directly from the formula without calculating $a_2 - a_1$.

## DIAGNOSTIC_ANSWER_2
Yes, it is an AP. First term $a_1 = 5 - 3(1) = 2$. Common difference $d = -3$ (coefficient of $n$). A wrong answer (e.g., calculating $a_2 = -1$, then $d = -1-2 = -3$ but claiming $d=3$ or $d=5$) reveals the student relies on computation rather than recognizing the structural property: *any linear expression $An+B$ represents an AP with common difference $A$*. This is Property (v) in NCERT and a critical board-exam shortcut.

## DIAGNOSTIC_QUESTION_3
In an AP, the 7th term is 34 and the 13th term is 64. Find the 20th term.

## DIAGNOSTIC_ANSWER_3
Given: $a_7 = a + 6d = 34$ and $a_{13} = a + 12d = 64$. Subtract: $6d = 30 \Rightarrow d = 5$. Substitute: $a + 30 = 34 \Rightarrow a = 4$. Then $a_{20} = a + 19d = 4 + 19(5) = 99$. A wrong answer (e.g., $d=30$ or $a_{20}=4+20(5)=104$) reveals confusion between term *number* ($n$) and the *multiplier of d* ($n-1$). Students often use $n$ instead of $n-1$ in the formula.

## DIAGNOSTIC_QUESTION_4
Two APs have the same common difference. The difference between their 100th terms is 100. What is the difference between their 50th terms? Explain your reasoning.

## DIAGNOSTIC_ANSWER_4
Let the APs be $a, a+d, a+2d...$ and $A, A+d, A+2d...$ (same $d$). Given: $(a+99d) - (A+99d) = a - A = 100$. The difference between 50th terms: $(a+49d) - (A+49d) = a - A = 100$. The difference remains constant for *any* corresponding terms because the $d$ terms cancel out. A wrong answer (e.g., 50 or 200) reveals the student thinks the difference scales with $n$, missing that the gap between two APs with same $d$ is fixed and equal to the difference of their first terms.

## DIAGNOSTIC_QUESTION_5
A student claims: "The sequence defined by $a_n = n^2 + 1$ is an AP because the terms increase by a pattern." Evaluate this claim. Provide a counter-example using the first three terms.

## DIAGNOSTIC_ANSWER_5
The claim is false. $a_1 = 2, a_2 = 5, a_3 = 10$. Differences: $a_2 - a_1 = 3$, $a_3 - a_2 = 5$. Since $3 \neq 5$, the difference is not constant. The sequence is quadratic, not linear. A wrong evaluation (e.g., "it is an AP because it increases") reveals the student confuses "increasing pattern" with "constant difference." They must understand that AP requires *exactly equal* successive differences, not just any pattern.

## DIAGNOSTIC_QUESTION_6
Create a real-life scenario (Indian context) that generates an AP with a negative common difference. Write the first term, common difference, and the general term $a_n$. Then find which term becomes zero or negative for the first time.

## DIAGNOSTIC_ANSWER_6
Example: A water tank has 5000 litres. A leak drains 75 litres every hour. $a = 5000, d = -75$. $a_n = 5000 - 75(n-1) = 5075 - 75n$. Set $a_n \le 0 \Rightarrow 5075 \le 75n \Rightarrow n \ge 67.66$. So the 68th term (hour) is the first negative/zero term. A poor answer (e.g., $d=75$, or $a_n = 5000 - 75n$, or solving $5000 - 75n = 0 \Rightarrow n=66.6$) reveals: (1) sign error for decreasing APs, (2) using $n$ instead of $n-1$ in formula, (3) not interpreting "first negative term" as smallest integer $n$ satisfying inequality.

## COMMON_MISCONCEPTION
Students treat the general term formula $a_n = a + (n-1)d$ as a rigid template and mechanically substitute $n$ without checking if the sequence actually *is* an AP. For example, given $a_n = 2n^2 + 3$, they compute $a_1=5, a_2=11, a_3=21$ and assume $d=6$ because $11-5=6$, ignoring that $21-11=10 \neq 6$. They fail to verify the *constancy* of the difference for all $n$, which is the defining property. This happens because Class 10 drills formula substitution but rarely asks "verify if AP" for non-linear formulas.

## ON_FAILURE
1. Ask the student to write the definition of AP in their own words: "Difference between *any* two consecutive terms is *same*." 
2. Give them $a_n = n^2 + 1$ and ask: "Calculate $a_4 - a_3$ and $a_3 - a_2$. Are they equal?" 
3. Show the algebraic proof: $a_{n+1} - a_n = [2(n+1)^2+3] - [2n^2+3] = 4n+2$, which depends on $n$, so not constant. 
4. Contrast with $a_n = 5n+2$: $a_{n+1} - a_n = 5(n+1)+2 - (5n+2) = 5$, constant. 
5. Drill: "If formula has $n^2$, $\sqrt{n}$, $1/n$, or $n$ in denominator → NOT an AP. Only $An+B$ works."

## PREREQUISITE_NODE_IDS
c11_app_cbse_05_001, c11_app_cbse_05_002

## PREREQUISITE_REASONS
c11_app_cbse_05_001: Introduces the concept of sequences and progressions, establishing that AP is a specific type of sequence with a pattern.
c11_app_cbse_05_002: Covers sequence notation ($a_1, a_2, ..., a_n$), finite/infinite sequences, and the concept of general term $a_n$, which are essential prerequisites for defining AP and its general term.

## FORWARD_NODE_IDS
c11_app_cbse_05_004, c11_app_cbse_05_005, c11_app_cbse_05_006, c11_app_cbse_05_007

## FORWARD_REASONS
c11_app_cbse_05_004: Properties of AP (adding/multiplying constants) directly manipulate the $a$ and $d$ defined here.
c11_app_cbse_05_005: Selection of terms ($a-d, a, a+d$) uses the general term structure to simplify sum/product problems.
c11_app_cbse_05_006: Sum of n terms $S_n$ is derived by summing the general terms $a + (k-1)d$ from $k=1$ to $n$.
c11_app_cbse_05_007: Arithmetic Mean inserts terms between $a$ and $b$ using the same common difference concept.

## CROSS_SUBJECT_PREREQS
none

## CROSS_SUBJECT_REASONS
none

## CHAIN_DESCRIPTION
c11_app_cbse_05_002 -> c11_app_cbse_05_003 -> c11_app_cbse_05_004

## THIS_FORMULA
$a_n = a + (n-1)d$

## FORMULA_VARIABLES
$a_n$ = nth term (general term); $a$ = first term ($a_1$); $d$ = common difference ($a_{k+1} - a_k$); $n$ = term position (positive integer)

## FORMULA_UNITS
All terms ($a_n, a, d$) share the same unit (e.g., rupees, metres, passengers). $n$ is dimensionless (count).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_app_cbse_05_001 | Sequences introduction establishes that AP is a special case of sequences where the pattern is additive constant difference.
c11_app_cbse_05_002 | Sequence notation ($a_n$ for general term) and finite/infinite classification are directly used to define AP terms and scope.

## PREREQ_CONCEPT
Understanding of sequence notation ($a_1, a_2, ..., a_n$) and the concept of a general term $a_n$ as a function of $n$.

## PREREQ_BEFORE
Student must be comfortable with algebraic manipulation of linear expressions and solving simple linear equations in one variable.

## PREREQ_STUCK
Review "Sequences" (c11_app_cbse_05_002) for notation $a_n$ and "Introduction" (c11_app_cbse_05_001) for the concept of progression as a patterned sequence.

## WORKED_EXAMPLE_1
PROBLEM: A Delhi Metro train starts from the depot with 40 passengers. At each of the first 15 stations, exactly 25 passengers board and 5 alight. Assuming no other changes, how many passengers are on the train as it leaves the 15th station? Also, find the general formula for passengers after the $n$th station ($n \le 15$).

STEPS:
- Step 1: Identify the net change per station. Boarding = 25, alighting = 5 → net increase = 20 passengers per station. This is constant, so it forms an AP.
- Step 2: Determine the first term $a$. The train *starts* with 40 passengers (before station 1). After station 1, passengers = $40 + 20 = 60$. So $a_1 = 60$ (passengers leaving station 1). Alternatively, treat "start" as term 0: $a_0 = 40$, then $a_n = 40 + 20n$. But standard AP uses $a_1$ as first term. We'll use $a = 60$.
- Step 3: Common difference $d = 20$ (net increase per station).
- Step 4: Apply general term formula for 15th station: $a_{15} = a + (15-1)d = 60 + 14 \times 20 = 60 + 280 = 340$.
- Step 5: General formula: $a_n = 60 + (n-1)20 = 20n + 40$. Verify: $n=1 \rightarrow 60$, $n=15 \rightarrow 340$. Consistent.

REASONING: The key is defining what constitutes "term 1". Here, the problem asks for passengers *leaving* the $n$th station, so the state after station 1 is term 1. The net change per station is the common difference. The formula $a_n = a + (n-1)d$ works because each station adds one more $d$ to the initial $a$.

ANSWER: 340 passengers after the 15th station. General term: $a_n = 20n + 40$ (or $a_n = 60 + (n-1)20$).

## WORKED_EXAMPLE_2
PROBLEM: The 5th term of an AP is 18 and the 12th term is 46. Find the first term, common difference, and the 25th term.

STEPS:
- Step 1: Write equations using $a_n = a + (n-1)d$. For 5th term: $a + 4d = 18$ ...(i). For 12th term: $a + 11d = 46$ ...(ii).
- Step 2: Subtract (i) from (ii) to eliminate $a$: $(a+11d) - (a+4d) = 46 - 18 \Rightarrow 7d = 28 \Rightarrow d = 4$.
- Step 3: Substitute $d=4$ into (i): $a + 4(4) = 18 \Rightarrow a + 16 = 18 \Rightarrow a = 2$.
- Step 4: Find 25th term: $a_{25} = a + 24d = 2 + 24(4) = 2 + 96 = 98$.
- Step 5: Verify using the other given term: $a_{12} = 2 + 11(4) = 46$. Matches. Also check 5th term: $2 + 4(4) = 18$. Matches.

REASONING: Two terms give two linear equations in two unknowns ($a$ and $d$). Subtracting eliminates $a$ because the coefficient of $a$ is 1 in both. This is the standard algebraic method for "find AP from two terms" problems. The multiplier of $d$ is always (term number - 1).

ANSWER: First term $a = 2$, common difference $d = 4$, 25th term $a_{25} = 98$.

## WORKED_EXAMPLE_3
PROBLEM: Which term of the AP: 121, 117, 113, ... is its first negative term? Also, find the term number where the term becomes zero.

STEPS:
- Step 1: Identify $a$ and $d$. $a = 121$. $d = 117 - 121 = -4$. (Decreasing AP).
- Step 2: Write general term: $a_n = 121 + (n-1)(-4) = 121 - 4n + 4 = 125 - 4n$.
- Step 3: Find first negative term: Solve $a_n < 0 \Rightarrow 125 - 4n < 0 \Rightarrow 4n > 125 \Rightarrow n > 31.25$. Since $n$ must be a positive integer, the smallest such $n$ is 32. So the 32nd term is the first negative term.
- Step 4: Find term equal to zero: Solve $a_n = 0 \Rightarrow 125 - 4n = 0 \Rightarrow 4n = 125 \Rightarrow n = 31.25$. Not an integer. So no term is exactly zero.
- Step 5: Verify neighbors: $a_{31} = 125 - 4(31) = 125 - 124 = 1$ (positive). $a_{32} = 125 - 128 = -3$ (negative). Confirms 32nd is first negative.
- Step 6: Interpret: The AP crosses zero between 31st and 32nd term, but since terms are discrete, it jumps from 1 to -3.

REASONING: For decreasing APs ($d<0$), terms eventually become negative. The inequality $a_n < 0$ gives the threshold. The "first negative term" is the smallest integer $n$ satisfying the inequality. Zero may or may not be a term depending on whether $n$ comes out integer.

ANSWER: First negative term is the 32nd term (value = -3). No term is exactly zero.

## COMPETENCY_QUESTION_1
QUESTION: A sequence is defined by $a_n = 7 - 4n$. 
(a) Prove that this sequence is an AP. 
(b) Find its 15th term. 
(c) If the sequence is finite and the last term is -85, find the number of terms.

COMPETENCY: Understanding and applying the structural property of AP (linear nth term) and using the general term formula in forward and reverse directions.

STEPS:
- Step 1 (a): Recognize $a_n = 7 - 4n$ is of the form $An + B$ with $A = -4, B = 7$. By Property (v), it is an AP with common difference $d = A = -4$. Alternatively, compute $a_{n+1} - a_n = [7-4(n+1)] - [7-4n] = -4$, constant.
- Step 2 (b): Use formula $a_n = 7 - 4n$ directly: $a_{15} = 7 - 4(15) = 7 - 60 = -53$. Or use $a_1 = 3, d=-4$: $a_{15} = 3 + 14(-4) = -53$.
- Step 3 (c): Last term $a_n = -85$. Set $7 - 4n = -85 \Rightarrow -4n = -92 \Rightarrow n = 23$. Number of terms = 23.

ANSWER: (a) Yes, AP with $d = -4$. (b) 15th term = -53. (c) 23 terms.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In an AP, the $p$th term is $q$ and the $q$th term is $p$ (where $p \neq q$). Prove that the $(p+q)$th term is zero. Then, find the common difference in terms of $p$ and $q$.

COMPETENCY: Analytical reasoning and algebraic proof using the general term formula; deriving relationships between terms.

STEPS:
- Step 1: Write equations: $a_p = a + (p-1)d = q$ ...(i). $a_q = a + (q-1)d = p$ ...(ii).
- Step 2: Subtract (ii) from (i): $(p-1)d - (q-1)d = q - p \Rightarrow (p-q)d = -(p-q)$. Since $p \neq q$, divide by $(p-q)$: $d = -1$.
- Step 3: Substitute $d=-1$ into (i): $a + (p-1)(-1) = q \Rightarrow a - p + 1 = q \Rightarrow a = p + q - 1$.
- Step 4: Find $(p+q)$th term: $a_{p+q} = a + (p+q-1)d = (p+q-1) + (p+q-1)(-1) = (p+q-1) - (p+q-1) = 0$. Proved.
- Step 5: Common difference $d = -1$ (independent of $p,q$).

ANSWER: $(p+q)$th term = 0. Common difference $d = -1$.
DIFFICULTY: hard