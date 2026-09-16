## DEFINITION
Word problems on set operations involve translating real-world scenarios involving collections of objects (people, items, outcomes) into mathematical statements using set notation (union, intersection, difference, complement) and solving for unknown cardinalities using the principle of inclusion-exclusion: \(n(A \cup B) = n(A) + n(B) - n(A \cap B)\) for two sets, and \(n(A \cup B \cup C) = n(A) + n(B) + n(C) - n(A \cap B) - n(B \cap C) - n(C \cap A) + n(A \cap B \cap C)\) for three sets, where \(n(X)\) denotes the number of elements in set \(X\).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can independently read a word problem, identify the universal set and relevant subsets, draw a Venn diagram with labelled regions, set up equations using inclusion-exclusion formulas, solve for unknown quantities (including "exactly one", "at least one", "none"), and verify the solution sums to the universal set total.

## SCOPE_BOUNDARY
Covers word problems on two and three sets using union, intersection, difference, complement, and De Morgan's laws within a finite universal set. Includes finding cardinalities of disjoint regions (exactly one, exactly two, all three, none). Does NOT cover infinite sets, probability calculations, or problems requiring algebraic solution of equations beyond linear systems in cardinalities.

## WALKTHROUGH
Imagine a survey of 200 Class 11 students in a Delhi school: 120 study Mathematics, 90 study Physics, 70 study Chemistry, 40 study Math and Physics, 30 study Physics and Chemistry, 25 study Math and Chemistry, and 15 study all three. To find how many study none, start by drawing a three-circle Venn diagram. Fill the innermost region (all three) with 15. Then work outward: Math∩Physics only = 40-15=25, Physics∩Chemistry only = 30-15=15, Math∩Chemistry only = 25-15=10. Next, find "only Math" = 120 - (25+15+10) = 70. Similarly "only Physics" = 90 - (25+15+15) = 35, "only Chemistry" = 70 - (15+10+15) = 30. Sum all seven regions = 70+35+30+25+15+10+15 = 200. Since total surveyed is 200, none = 0. The key insight: always fill Venn diagram from the innermost intersection outward, subtracting known overlaps to avoid double-counting.

## DIAGNOSTIC_QUESTION_1
State the formula for the number of elements in the union of three finite sets A, B, and C in terms of their individual cardinalities and pairwise/triple intersections.

## DIAGNOSTIC_ANSWER_1
The formula is \(n(A \cup B \cup C) = n(A) + n(B) + n(C) - n(A \cap B) - n(B \cap C) - n(C \cap A) + n(A \cap B \cap C)\). A wrong answer (e.g., missing the triple intersection term or subtracting it) reveals the student does not understand the inclusion-exclusion principle for three sets and likely memorised the two-set formula without generalising.

## DIAGNOSTIC_QUESTION_2
In a survey, 100 people were asked if they drink Tea (T) or Coffee (C). 60 drink Tea, 50 drink Coffee, and 20 drink both. A student claims the number who drink neither is \(100 - (60 + 50) = -10\). Explain why this reasoning is flawed and state the correct calculation.

## DIAGNOSTIC_ANSWER_2
The student double-counted the 20 people who drink both. The correct calculation uses inclusion-exclusion: \(n(T \cup C) = 60 + 50 - 20 = 90\). Then neither = \(100 - 90 = 10\). A wrong explanation (e.g., "the total is wrong") shows the student cannot identify the overlap error and lacks the concept that "or" in sets is inclusive unless specified otherwise.

## DIAGNOSTIC_QUESTION_3
A class has 50 students. 30 play Cricket, 25 play Football, 15 play Hockey. 10 play Cricket and Football, 8 play Football and Hockey, 5 play Cricket and Hockey. 3 play all three. How many students play exactly one sport? Show stepwise working.

## DIAGNOSTIC_ANSWER_3
Step 1: Draw Venn diagram, fill centre = 3.
Step 2: Cricket∩Football only = 10-3=7; Football∩Hockey only = 8-3=5; Cricket∩Hockey only = 5-3=2.
Step 3: Only Cricket = 30 - (7+2+3) = 18; Only Football = 25 - (7+5+3) = 10; Only Hockey = 15 - (5+2+3) = 5.
Step 4: Exactly one = 18+10+5 = 33.
Answer: 33 students. A wrong answer (e.g., 30+25+15 - 2*(10+8+5) + 3*3 = ...) reveals the student tries to use a memorised formula without understanding region decomposition, often miscalculating the "exactly two" regions.

## DIAGNOSTIC_QUESTION_4
Compare the two statements: (i) "Students who study Math or Physics" and (ii) "Students who study Math or Physics but not both". For sets M and P, write the set expression for each and explain the difference in cardinality calculation.

## DIAGNOSTIC_ANSWER_4
(i) \(M \cup P\), cardinality \(n(M) + n(P) - n(M \cap P)\). (ii) \((M \cup P) - (M \cap P)\) or \((M - P) \cup (P - M)\), cardinality \(n(M) + n(P) - 2n(M \cap P)\). The difference is that (ii) excludes the intersection entirely, so its cardinality subtracts the intersection twice. A wrong answer (e.g., same expression for both) shows the student conflates inclusive "or" (union) with exclusive "or" (symmetric difference), a critical language precision error in board exams.

## DIAGNOSTIC_QUESTION_5
A student solves a 3-set problem and gets region values: only A=10, only B=15, only C=20, A∩B only=5, B∩C only=8, C∩A only=7, all three=4. The universal set has 80 elements. The student claims the complement (none) is \(80 - (10+15+20+5+8+7+4) = 11\). Evaluate if this is correct and justify.

## DIAGNOSTIC_ANSWER_5
The calculation is correct: sum of all seven disjoint regions = 69, so none = 80-69 = 11. The student correctly identified all regions are mutually exclusive and exhaustive within the universal set. If a student says it's wrong because "we need to use the formula", they misunderstand that the Venn diagram region-sum method IS the formula decomposed; both are valid. This tests whether the student recognises the equivalence of region-sum and inclusion-exclusion.

## DIAGNOSTIC_QUESTION_6
Create a word problem involving three sets (e.g., languages spoken, subjects studied, products bought) where the given data includes the universal set total, individual set totals, all three pairwise intersections, and the triple intersection. The question must ask for "exactly two" and "none". Provide the problem statement only.

## DIAGNOSTIC_ANSWER_6
Example problem: "In a housing society of 150 families, 80 subscribe to Newspaper A, 70 to B, 60 to C. 30 subscribe to A and B, 25 to B and C, 20 to A and C. 10 subscribe to all three. Find (i) number of families subscribing to exactly two newspapers, (ii) number subscribing to none." A poor problem (e.g., missing universal total, or asking only for union) reveals the student cannot design a problem requiring multi-step region calculation, indicating they don't grasp which data points are necessary and sufficient for a well-posed 3-set problem.

## COMMON_MISCONCEPTION
Students often treat "A or B" in word problems as exclusive or (either A or B but not both) instead of inclusive or (A ∪ B). For example, in "How many students play Cricket or Football?", they compute \(n(C) + n(F) - 2n(C \cap F)\) instead of \(n(C) + n(F) - n(C \cap F)\). Another specific error: when given "30 play Cricket and Football", they directly put 30 in the Cricket∩Football region of the Venn diagram without subtracting the triple intersection (if three sets are involved), leading to inflated overlap regions and negative "only" values.

## ON_FAILURE
If a student makes the exclusive-or error: 1) Ask them to list the elements of {1,2,3} ∪ {3,4,5} and confirm 3 is included once. 2) Show that "or" in mathematics means "at least one of". 3) Have them re-read the problem and identify if "but not both" is stated; if not, use inclusive union. For the triple-intersection error: 1) Draw a 3-circle Venn diagram and label the centre region as \(x = n(A \cap B \cap C)\). 2) Explain that the given "A and B" includes the centre, so the region for "A and B only" is given value minus \(x\). 4) Practice with a numerical example where triple intersection is non-zero (e.g., 15 study all three, 40 study Math and Physics → Math∩Physics only = 25).

## PREREQUISITE_NODE_IDS
c11_math_cbse_01_001, c11_math_cbse_01_002, c11_math_cbse_01_003, c11_math_cbse_01_004, c11_math_cbse_01_005, c11_math_cbse_01_006, c11_math_cbse_01_007, c11_math_cbse_01_008, c11_math_cbse_01_009, c11_math_cbse_01_010, c11_math_cbse_01_011, c11_math_cbse_01_012, c11_math_cbse_01_013, c6_math_ch05_058, c7_math_ch15_007, c8_math_ch13_10, c9_math_ch2_10, c10_math_cbse_03_009
## PREREQUISITE_REASONS
c11_math_cbse_01_001: Need precise definition of set, element, and notation to translate words into sets.
c11_math_cbse_01_002: Understanding finite/infinite sets ensures universal set is finite for cardinality problems.
c11_math_cbse_01_003: Equal sets concept helps verify if two descriptions refer to same set.
c11_math_cbse_01_004: Subset relations used in "all A are B" type statements.
c11_math_cbse_01_005: Intervals as subsets appear in problems with real number conditions.
c11_math_cbse_01_006: Power set cardinality \(2^n\) used in "number of ways" problems.
c11_math_cbse_01_007: Universal set definition is essential for complement and "none" calculations.
c11_math_cbse_01_008: Venn diagrams are the primary tool for visualising and solving word problems.
c11_math_cbse_01_009: Union operation and its cardinality formula \(n(A \cup B) = n(A) + n(B) - n(A \cap B)\) is foundational.
c11_math_cbse_01_010: Intersection operation and its properties needed for overlap regions.
c11_math_cbse_01_011: Difference of sets used for "A but not B" and symmetric difference.
c11_math_cbse_01_012: Complement of a set used for "neither/nor" and De Morgan's laws in word problems.
c11_math_cbse_01_013: De Morgan's laws used to simplify expressions like "not (A or B)" to "not A and not B".
c6_math_ch05_058: Word problems leading to equations builds algebraic translation skill.
c7_math_ch15_007: Setting up equations from word problems is directly applicable.
c8_math_ch13_10: Word problems translating to linear equations reinforces variable assignment.
c9_math_ch2_10: Word problems using linear equations provides practice in multi-step algebraic solutions.
c10_math_cbse_03_009: Word problems: age and number problems develops logical reasoning with quantities.

## FORWARD_NODE_IDS


## FORWARD_REASONS
This is the final node in Chapter 1 (Sets). Mastery here enables application of set theory in subsequent chapters: Relations & Functions (Chapter 2), Trigonometric Functions (Chapter 3), Probability (Chapter 16), and in Class 12 topics like Relations, Functions, and Probability.

## CROSS_SUBJECT_PREREQS
c9_math_ch7_5, c10_math_cbse_14_001, c10_math_cbse_13_001, c8_math_ch12_1
## CROSS_SUBJECT_REASONS
c9_math_ch7_5: Sample space and events in probability are sets; word problems on sets directly model probability questions (e.g., "A or B" = union).
c10_math_cbse_14_001: Classical probability \(P(E) = n(E)/n(S)\) uses set cardinalities; set word problems provide the combinatorial foundation.
c10_math_cbse_13_001: Grouped data frequency tables partition universal set into disjoint classes; similar to Venn diagram regions.
c8_math_ch12_1: Mean as balancing point uses sums over sets; inclusion-exclusion principle appears in weighted averages.

## CHAIN_DESCRIPTION
c11_math_cbse_01_001 -> c11_math_cbse_01_014 -> (Chapter 2: Relations & Functions, Chapter 16: Probability)

## THIS_FORMULA
For two finite sets: \(n(A \cup B) = n(A) + n(B) - n(A \cap B)\). For three finite sets: \(n(A \cup B \cup C) = n(A) + n(B) + n(C) - n(A \cap B) - n(B \cap C) - n(C \cap A) + n(A \cap B \cap C)\). Complement: \(n(A') = n(U) - n(A)\). Difference: \(n(A - B) = n(A) - n(A \cap B)\). Symmetric difference: \(n(A \Delta B) = n(A) + n(B) - 2n(A \cap B)\).

## FORMULA_VARIABLES
\(n(A)\) = number of elements in set A (cardinality); \(n(B)\) = cardinality of B; \(n(C)\) = cardinality of C; \(n(A \cap B)\) = cardinality of intersection of A and B; \(n(A \cap B \cap C)\) = cardinality of triple intersection; \(n(U)\) = cardinality of universal set; \(A'\) = complement of A w.r.t U; \(A - B\) = elements in A but not in B; \(A \Delta B\) = elements in exactly one of A or B.

## FORMULA_UNITS
dimensionless (counts of elements)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch1_1 | Set operations model mutually exclusive and exhaustive events in probability (sample space = universal set).
c11_economics_ch2_1 | Consumer preference surveys use sets (bundles of goods); union/intersection represent "or"/"and" preferences.

## PREREQ_CONCEPT
Inclusion-exclusion principle for cardinalities of finite sets and ability to decompose a universal set into disjoint regions using a Venn diagram.

## PREREQ_BEFORE
Student must be able to compute \(n(A \cup B)\), \(n(A \cap B)\), \(n(A - B)\), \(n(A')\) given any three of the four quantities, and draw a two-circle Venn diagram with labelled regions.

## PREREQ_STUCK
Review the Venn diagram region-filling technique from c11_math_cbse_01_008 and the cardinality formulas from c11_math_cbse_01_009, c11_math_cbse_01_010, c11_math_cbse_01_011, c11_math_cbse_01_012. Practice Exercise 1.4 and 1.5 completely.

## WORKED_EXAMPLE_1
PROBLEM: In a survey of 500 families in a Mumbai apartment complex, 220 read The Times of India, 180 read The Hindu, 150 read Hindustan Times. 80 read Times and Hindu, 60 read Hindu and Hindustan Times, 50 read Times and Hindustan Times. 30 read all three. Find (i) number of families reading at least one newspaper, (ii) number reading exactly one newspaper, (iii) number reading none.
STEPS:
- Step 1: Identify the universal set U = all 500 families. Define sets: T = Times of India readers, H = Hindu readers, S = Hindustan Times readers. Given: n(T)=220, n(H)=180, n(S)=150, n(T∩H)=80, n(H∩S)=60, n(T∩S)=50, n(T∩H∩S)=30.
- Step 2: Draw a three-circle Venn diagram. Fill the centre region (all three) with 30.
- Step 3: Compute pairwise-only regions: T∩H only = 80-30=50; H∩S only = 60-30=30; T∩S only = 50-30=20.
- Step 4: Compute single-only regions: Only T = 220 - (50+20+30) = 120; Only H = 180 - (50+30+30) = 70; Only S = 150 - (30+20+30) = 70.
- Step 5: (i) At least one = sum of all 7 regions = 120+70+70+50+30+20+30 = 390. Alternatively, use formula: n(T∪H∪S) = 220+180+150 - 80-60-50 + 30 = 390.
- Step 6: (ii) Exactly one = only T + only H + only S = 120+70+70 = 260.
- Step 7: (iii) None = n(U) - n(T∪H∪S) = 500 - 390 = 110.
- Step 8: Verify: Sum of all 8 regions (7 inside + none) = 390 + 110 = 500 = n(U). Consistent.
REASONING: The Venn diagram partitions the universal set into 8 disjoint regions. Filling from the innermost intersection outward ensures each given intersection value is correctly distributed. The inclusion-exclusion formula is a shortcut for the union total, but region sums give the detailed breakdown needed for "exactly one" and "exactly two". Verification against universal total catches arithmetic errors.
ANSWER: (i) 390 families, (ii) 260 families, (iii) 110 families.

## WORKED_EXAMPLE_2
PROBLEM: A coaching institute has 200 students preparing for JEE. Each student studies at least one of Physics, Chemistry, Mathematics. 120 study Physics, 100 study Chemistry, 110 study Mathematics. 50 study Physics and Chemistry, 40 study Chemistry and Mathematics, 45 study Physics and Mathematics. Find the number of students who study all three subjects. If 10 students drop Chemistry and start studying only Physics and Mathematics, what is the new number studying all three?
STEPS:
- Step 1: Let P, C, M be sets of students studying Physics, Chemistry, Mathematics. Universal set U = 200 students. Given: n(P)=120, n(C)=100, n(M)=110, n(P∩C)=50, n(C∩M)=40, n(P∩M)=45. Also given: each student studies at least one → n(P∪C∪M) = 200.
- Step 2: Use three-set inclusion-exclusion formula: n(P∪C∪M) = n(P)+n(C)+n(M) - n(P∩C) - n(C∩M) - n(P∩M) + n(P∩C∩M).
- Step 3: Substitute known values: 200 = 120+100+110 - 50-40-45 + n(P∩C∩M).
- Step 4: Compute: 200 = 330 - 135 + x = 195 + x, where x = n(P∩C∩M). So x = 200 - 195 = 5.
- Step 5: Thus initially 5 students study all three. Now, 10 students drop Chemistry and study only Physics and Mathematics. This means they move from (P∩C∩M) or (P∩C only) or (C∩M only) to (P∩M only). But we need to know where they came from. The problem states "drop Chemistry and start studying only Physics and Mathematics". This implies they were studying Chemistry before, so they were in C. They now study P and M but not C. So they leave C entirely and join P∩M only region.
- Step 6: Since they drop Chemistry, they are removed from set C. The new n(C) = 100 - 10 = 90. The new n(P∩M) increases by 10? Wait: they now study P and M but not C. So they are added to P∩M only region. The intersection P∩M includes those who study both P and M regardless of C. Since they study P and M, they are in P∩M. So new n(P∩M) = old n(P∩M) + 10 = 45 + 10 = 55. However, they are no longer in C, so they are removed from C∩M and P∩C∩M. The problem says "drop Chemistry and start studying only Physics and Mathematics". This means they were in C before, and now they are in P and M but not C. The only region that is in C and also in P and M is P∩C∩M (all three) and C∩M only and P∩C only. But they end up in P∩M only. So they must have come from P∩C∩M (since they study all three) or from P∩C only (if they didn't study M) or C∩M only (if they didn't study P). But they end up studying P and M, so they must have been studying P and M already? Actually "start studying only Physics and Mathematics" implies they now study P and M. If they were in P∩C only, they didn't study M before, so they "start studying M". If they were in C∩M only, they didn't study P before. If they were in all three, they already studied P and M. The phrase "drop Chemistry and start studying only Physics and Mathematics" suggests they now study exactly P and M. So they leave C. The change in n(P∩C∩M) depends on where they came from. The problem is ambiguous. Let's assume the 10 students were among those studying all three (since they drop one subject but keep the other two). That is the most natural reading: they were studying all three, now they study only P and M. Then new n(P∩C∩M) = 5 - 10 = -5? Impossible. So they cannot all come from the triple intersection because only 5 were there. So they must come from other regions that include C. But the problem says "10 students drop Chemistry and start studying only Physics and Mathematics". This means they are removed from C and added to P∩M only. The triple intersection decreases by the number of those 10 who were in it. Since only 5 were in triple, at most 5 can come from there. The other 5 must come from P∩C only or C∩M only. But then they "start studying" the third subject? This is messy. Let's rephrase the problem to be clearer: "If 10 students who were studying all three subjects drop Chemistry, find the new number studying all three." That would be 5-10 = -5, impossible. So maybe the problem means: 10 students who were studying Chemistry (and possibly others) now study only Physics and Mathematics. This changes multiple regions. Better to ask: "Find the number studying all three. Then, if 10 students who were studying all three drop Chemistry, how many study all three now?" But that gives negative. So the initial data might be inconsistent with "each student studies at least one"? Let's check: n(P∪C∪M) = 120+100+110 -50-40-45 +5 = 200. Correct. So 5 study all three. If 10 drop Chemistry, they must come from C. The maximum in C is 100. But the triple intersection is only 5. So at most 5 can come from triple. The problem as stated is flawed. Let's change the problem to a consistent one.
Let's create a new problem: "In a class of 100 students, 50 like Pizza, 40 like Burger, 30 like Pasta. 20 like Pizza and Burger, 15 like Burger and Pasta, 10 like Pizza and Pasta. 5 like all three. How many like none? If 5 students who like only Pizza start liking Burger as well (but not Pasta), find the new number who like exactly two items."
This is better.
Let's redo Worked Example 2 with a cleaner problem.

PROBLEM: In a class of 100 students, 50 like Pizza, 40 like Burger, 30 like Pasta. 20 like Pizza and Burger, 15 like Burger and Pasta, 10 like Pizza and Pasta. 5 like all three. Find (i) number of students who like none of these, (ii) number who like exactly two. Then, 5 students who like only Pizza start liking Burger as well (but not Pasta). Find the new number who like exactly two items.
STEPS:
- Step 1: Define sets: Pz = Pizza, B = Burger, Pa = Pasta. U = 100. n(Pz)=50, n(B)=40, n(Pa)=30, n(Pz∩B)=20, n(B∩Pa)=15, n(Pz∩Pa)=10, n(Pz∩B∩Pa)=5.
- Step 2: Draw Venn diagram. Centre = 5.
- Step 3: Pairwise only: Pz∩B only = 20-5=15; B∩Pa only = 15-5=10; Pz∩Pa only = 10-5=5.
- Step 4: Only regions: Only Pz = 50 - (15+5+5) = 25; Only B = 40 - (15+10+5) = 10; Only Pa = 30 - (10+5+5) = 10.
- Step 5: (i) None = 100 - (25+10+10+15+10+5+5) = 100 - 80 = 20. (ii) Exactly two = sum of pairwise only = 15+10+5 = 30.
- Step 6: Change: 5 students from "Only Pizza" (25) move to "Pizza and Burger only". So Only Pz becomes 25-5=20. Pz∩B only becomes 15+5=20. Other regions unchanged.
- Step 7: New exactly two = new Pz∩B only + B∩Pa only + Pz∩Pa only = 20 + 10 + 5 = 35.
REASONING: The first part uses standard region-filling. The second part tests understanding that "only Pizza" means region exclusive to Pizza. Moving students from that region to "Pizza and Burger only" changes exactly two count by +5 (since they now like two items). The triple intersection and other pairwise-only regions are unaffected because the students did not start liking Pasta.
ANSWER: (i) 20 students like none, (ii) initially 30 like exactly two, after change 35 like exactly two.

## WORKED_EXAMPLE_3
PROBLEM: In a town of 10,000 families, a survey on vehicle ownership found: 40% own a two-wheeler, 30% own a car, 20% own a bicycle. 15% own both two-wheeler and car, 10% own both car and bicycle, 8% own both two-wheeler and bicycle. 5% own all three. Find (i) percentage of families owning at least one vehicle, (ii) percentage owning exactly one vehicle, (iii) number of families owning a car but not a two-wheeler, (iv) if the town council targets families with no vehicle for a subsidy, how many families are eligible?
STEPS:
- Step 1: Convert percentages to actual numbers out of 10,000 for clarity, or work with percentages. Let's work with percentages: U = 100%. T = two-wheeler = 40%, C = car = 30%, B = bicycle = 20%. T∩C = 15%, C∩B = 10%, T∩B = 8%, T∩C∩B = 5%.
- Step 2: Use inclusion-exclusion for union: n(T∪C∪B) = 40+30+20 - 15-10-8 + 5 = 90 - 33 + 5 = 62%. So 62% own at least one vehicle.
- Step 3: (i) At least one = 62%.
- Step 4: Find exactly one: Only T = 40 - (15-5) - (8-5) - 5 = 40 - 10 - 3 - 5 = 22%. Only C = 30 - (15-5) - (10-5) - 5 = 30 - 10 - 5 - 5 = 10%. Only B = 20 - (10-5) - (8-5) - 5 = 20 - 5 - 3 - 5 = 7%. Exactly one = 22+10+7 = 39%.
- Step 5: (ii) Exactly one = 39%.
- Step 6: (iii) Car but not two-wheeler = n(C - T) = n(C) - n(C∩T) = 30% - 15% = 15%. (This includes car only and car∩bicycle only). Check: Only C = 10%, C∩B only = 10-5=5%, total 15%. Correct.
- Step 7: (iv) No vehicle = 100% - 62% = 38%. Number of families = 38% of 10,000 = 3,800 families.
- Step 8: Verify: Sum of all regions = Only T(22) + Only C(10) + Only B(7) + T∩C only(10) + C∩B only(5) + T∩B only(3) + All three(5) + None(38) = 100%. Consistent.
REASONING: Working with percentages avoids large numbers; the formulas are identical. "Car but not two-wheeler" is a set difference C - T, whose cardinality is n(C) - n(C∩T) regardless of the third set. The complement of the union gives "none". This problem combines percentage interpretation, three-set Venn logic, set difference, and real-world decision making (subsidy eligibility).
ANSWER: (i) 62%, (ii) 39%, (iii) 15% (1,500 families), (iv) 3,800 families.

## COMPETENCY_QUESTION_1
QUESTION: A school offers three extracurricular activities: Music (M), Dance (D), Drama (R). In a class of 60 students, the following data is recorded:
- 28 students participate in Music
- 25 students participate in Dance
- 22 students participate in Drama
- 10 students participate in Music and Dance
- 8 students participate in Dance and Drama
- 7 students participate in Music and Drama
- 5 students participate in all three
The class teacher claims: "Since 28+25+22 = 75, which is more than 60, there must be an error in the data." Evaluate the teacher's claim. If the data is consistent, find the number of students who participate in exactly one activity and the number who participate in none. Justify your reasoning.
COMPETENCY: Translating real-world situations to mathematical expressions and evaluating logical consistency.
STEPS:
- Step 1: Recognise that the sum of individual sets can exceed the universal set because of overlaps; this is not an error.
- Step 2: Apply inclusion-exclusion to find n(M∪D∪R).
- Step 3: Calculate n(M∪D∪R) = 28+25+22 - 10-8-7 + 5 = 75 - 25 + 5 = 55.
- Step 4: Since 55 ≤ 60, the data is consistent. None = 60 - 55 = 5.
- Step 5: Find exactly one: Only M = 28 - (10-5) - (7-5) - 5 = 28 - 5 - 2 - 5 = 16. Only D = 25 - (10-5) - (8-5) - 5 = 25 - 5 - 3 - 5 = 12. Only R = 22 - (8-5) - (7-5) - 5 = 22 - 3 - 2 - 5 = 12. Exactly one = 16+12+12 = 40.
- Step 6: Verify: Sum of regions = 16+12+12 + (5+3+2) + 5 + 5 = 40 + 10 + 5 + 5 = 60. Correct.
ANSWER: The teacher's claim is incorrect; overlapping participation explains the sum exceeding 60. Data is consistent. Exactly one activity: 40 students. None: 5 students.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a competitive exam, 200 candidates appeared for three papers: Physics (P), Chemistry (C), Mathematics (M). The results showed:
- 120 passed in Physics
- 100 passed in Chemistry
- 80 passed in Mathematics
- 40 passed in Physics and Chemistry
- 30 passed in Chemistry and Mathematics
- 25 passed in Physics and Mathematics
- 15 passed in all three
A candidate qualifies if they pass in at least two papers. Find the number of candidates who qualify. Also, find the number who pass in exactly one paper. If the qualifying criterion changes to "pass in Physics and at least one other paper", how many qualify now? Show all steps.
COMPETENCY: Applying set operations to multi-condition decision making and comparing criteria.
STEPS:
- Step 1: Define sets P, C, M. U = 200. Given cardinalities as above.
- Step 2: Draw Venn diagram. Centre = 15.
- Step 3: Pairwise only: P∩C only = 40-15=25; C∩M only = 30-15=15; P∩M only = 25-15=10.
- Step 4: Only regions: Only P = 120 - (25+10+15) = 70. Only C = 100 - (25+15+15) = 45. Only M = 80 - (15+10+15) = 40.
- Step 5: Exactly one = 70+45+40 = 155.
- Step 6: Qualify (at least two) = exactly two + all three = (25+15+10) + 15 = 50 + 15 = 65. Alternatively, n(P∪C∪M) = 120+100+80 -40-30-25 +15 = 220. None = 200-220 = -20? Wait, sum of regions = 70+45+40+25+15+10+15 = 220. That exceeds 200! The data is inconsistent. Let's check: n(P∪C∪M) = 220 > 200. Impossible. The problem data is flawed. Need to adjust numbers to be consistent. Let's change U to 250 or reduce individual totals. Let's adjust U to 250. Then none = 30. But the problem says 200 candidates appeared. So the given numbers are impossible. This is a good competency question: it tests if the student checks consistency. But the instruction says "If the data is consistent...". In this case, it's not. So the student should identify inconsistency. Let's make the numbers consistent. Let's set n(P)=100, n(C)=90, n(M)=80, pairwise: 30,25,20, triple=10. Then union = 100+90+80 -30-25-20 +10 = 205. Still >200. Let's make U=220. Or reduce numbers. Let's use: n(P)=80, n(C)=70, n(M)=60, P∩C=25, C∩M=20, P∩M=15, all three=10. Union = 80+70+60 -25-20-15 +10 = 160. None = 40. Exactly one: Only P=80-(15+5+10)=50? Wait: P∩C only=15, C∩M only=10, P∩M only=5. Only P=80-15-5-10=50. Only C=70-15-10-10=35. Only M=60-10-5-10=35. Exactly one=120. Exactly two=15+10+5=30. All three=10. At least two=40. New criterion: pass in Physics and at least one other = (P∩C) ∪ (P∩M) = n(P∩C) + n(P∩M) - n(P∩C∩M) = 25+15-10=30. Or region sum: P∩C only + P∩M only + all three = 15+5+10=30.
Let's use these consistent numbers in the question.
REVISED QUESTION: In a competitive exam, 200 candidates appeared for three papers: Physics (P), Chemistry (C), Mathematics (M). The results showed:
- 80 passed in Physics
- 70 passed in Chemistry
- 60 passed in Mathematics
- 25 passed in Physics and Chemistry
- 20 passed in Chemistry and Mathematics
- 15 passed in Physics and Mathematics
- 10 passed in all three
A candidate qualifies if they pass in at least two papers. Find the number of candidates who qualify. Also, find the number who pass in exactly one paper. If the qualifying criterion changes to "pass in Physics and at least one other paper", how many qualify now? Show all steps.
STEPS (for revised numbers):
- Step 1: Check consistency: n(P∪C∪M) = 80+70+60 -25-20-15 +10 = 160 ≤ 200. Consistent. None = 40.
- Step 2: Venn regions: Centre=10. P∩C only=15, C∩M only=10, P∩M only=5.
- Step 3: Only P=80-15-5-10=50; Only C=70-15-10-10=35; Only M=60-10-5-10=35.
- Step 4: Exactly one = 50+35+35 = 120.
- Step 5: Qualify (at least two) = exactly two + all three = (15+10+5) + 10 = 40.
- Step 6: New criterion: Pass in Physics and at least one other = (P∩C) ∪ (P∩M). Cardinality = n(P∩C) + n(P∩M) - n(P∩C∩M) = 25+15-10 = 30. (Regions: P∩C only + P∩M only + all three = 15+5+10=30).
ANSWER: Qualifying (at least two): 40 candidates. Exactly one: 120 candidates. New criterion (Physics + at least one other): 30 candidates qualify.
DIFFICULTY: hard