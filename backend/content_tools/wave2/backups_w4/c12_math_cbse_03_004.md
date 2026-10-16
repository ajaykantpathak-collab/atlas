## ELI5
Two factories' output sheets - boys' and girls' shoes across three price lines - combine into one totals sheet by simply adding the numbers sitting in the same positions. That is matrix addition: same order required, then entrywise addition. Subtraction follows the same position rule with minus signs, and the zero matrix acts as the do-nothing addition. The one strict rule: no adding of mismatched shapes, however tempting the element count.

## DEFINITION
Matrix addition is defined for two matrices of the same order: if \(A = [a_{ij}]_{m \times n}\) and \(B = [b_{ij}]_{m \times n}\), their sum \(A + B\) is the matrix \(C = [c_{ij}]_{m \times n}\) where \(c_{ij} = a_{ij} + b_{ij}\) for all \(i,j\). Matrix subtraction is defined as \(A - B = A + (-B)\), where \(-B = (-1)B\) is the matrix obtained by multiplying each element of \(B\) by \(-1\); thus \((A - B)_{ij} = a_{ij} - b_{ij}\).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can add and subtract matrices of the same order element-wise, verify the commutative and associative properties, identify the additive identity (zero matrix) and additive inverse, and solve matrix equations of the form \(X + Y = A,\; X - Y = B\) for unknown matrices \(X\) and \(Y\). The student can also model real-world situations (e.g., combined sales, change in production) using matrix addition/subtraction.

## SCOPE_BOUNDARY
This node covers addition and subtraction of matrices of identical order, their algebraic properties (commutativity, associativity, additive identity, additive inverse), and solving simple matrix equations involving only addition/subtraction. It does NOT cover matrix multiplication, scalar multiplication (separate node), transpose, inverse, or determinants.

## WALKTHROUGH
Imagine two shoe factories, Factory A and Factory B, each producing boys' and girls' shoes in three price categories. Their monthly production is recorded in two matrices of order \(2 \times 3\). To find the total production across both factories, you simply add the corresponding entries — just like adding the number of notebooks Radha and Fauzia have. Start by checking that both matrices have the same order (same number of rows and columns). Then write the sum matrix by adding each pair of corresponding elements. This element-wise operation works because matrices are ordered arrays; the position \((i,j)\) carries specific meaning (e.g., row = category, column = gender). The key insight: **matrix addition is only defined when orders match, and it is performed exactly like adding two lists of numbers position by position.**

Takeaway first: addition is position-wise and order-gated - the (i, j) slot means the same thing in both matrices, which is why shapes must match before any entry meets its partner. Exam moves: compute questions on sums and differences, property questions verifying commutativity and associativity, identity and inverse questions with the zero matrix, and modelling questions on combined sales or production changes. Method: rerun the shoe factories - align the grids, add the corners first, and let the totals sheet answer the demand question. Check yourself: 'both have six elements' is the classic trap - a 2 by 3 and a 3 by 2 share a count and nothing else. Drill: add two same-order matrices, subtract a third, and explain one refused addition.

## DIAGNOSTIC_QUESTION_1
What is the necessary condition for adding two matrices \(A\) and \(B\)? State the condition precisely.

## DIAGNOSTIC_ANSWER_1
The matrices must have the same order (same number of rows and same number of columns). If \(A\) is \(m \times n\) and \(B\) is \(p \times q\), then \(m = p\) and \(n = q\). A wrong answer (e.g., "same number of elements" or "both square") reveals the student confuses total element count with order matching, or thinks only square matrices can be added.

## DIAGNOSTIC_QUESTION_2
Explain why the sum of a \(2 \times 3\) matrix and a \(3 \times 2\) matrix is not defined, even though both have 6 elements.

## DIAGNOSTIC_ANSWER_2
Matrix addition requires corresponding positions to represent the same quantity. In a \(2 \times 3\) matrix, the element at \((1,2)\) might be "boys' shoes in category 2", while in a \(3 \times 2\) matrix the element at \((1,2)\) could be "girls' shoes in category 1". The positions do not align, so adding them would mix unrelated data. A student who says "they have the same number of elements so it should work" misunderstands that order encodes meaning, not just size.

## DIAGNOSTIC_QUESTION_3
Let \(A = \begin{bmatrix} 2 & -1 \\ 0 & 3 \end{bmatrix}\) and \(B = \begin{bmatrix} -3 & 4 \\ 5 & -2 \end{bmatrix}\). Compute \(A + B\) and \(A - B\). Show all steps.

## DIAGNOSTIC_ANSWER_3
\(A + B = \begin{bmatrix} 2+(-3) & -1+4 \\ 0+5 & 3+(-2) \end{bmatrix} = \begin{bmatrix} -1 & 3 \\ 5 & 1 \end{bmatrix}\).  
\(A - B = \begin{bmatrix} 2-(-3) & -1-4 \\ 0-5 & 3-(-2) \end{bmatrix} = \begin{bmatrix} 5 & -5 \\ -5 & 5 \end{bmatrix}\).  
A wrong answer often comes from sign errors (e.g., \(2-(-3) = -1\)) or subtracting in the wrong order (\(B - A\) instead of \(A - B\)). This reveals carelessness with integer signs or confusion about non-commutativity of subtraction.

## DIAGNOSTIC_QUESTION_4
If \(A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}\), \(B = \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}\), and \(C = \begin{bmatrix} 9 & 10 \\ 11 & 12 \end{bmatrix}\), verify the associative property \((A+B)+C = A+(B+C)\) by computing both sides. What does this tell you about writing \(A+B+C\) without parentheses?

## DIAGNOSTIC_ANSWER_4
\((A+B)+C = \begin{bmatrix} 6 & 8 \\ 10 & 12 \end{bmatrix} + \begin{bmatrix} 9 & 10 \\ 11 & 12 \end{bmatrix} = \begin{bmatrix} 15 & 18 \\ 21 & 24 \end{bmatrix}\).  
\(A+(B+C) = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} + \begin{bmatrix} 14 & 16 \\ 18 & 20 \end{bmatrix} = \begin{bmatrix} 15 & 18 \\ 21 & 24 \end{bmatrix}\).  
Both sides are equal, so matrix addition is associative. Therefore \(A+B+C\) can be written without parentheses. A student who gets different results likely made an arithmetic error or added rows to columns incorrectly. This tests whether they can systematically apply element-wise addition across three matrices.

## DIAGNOSTIC_QUESTION_5
A student solves \(X + \begin{bmatrix} 2 & 1 \\ -1 & 3 \end{bmatrix} = \begin{bmatrix} 5 & 0 \\ 2 & 4 \end{bmatrix}\) by writing \(X = \begin{bmatrix} 5 & 0 \\ 2 & 4 \end{bmatrix} + \begin{bmatrix} 2 & 1 \\ -1 & 3 \end{bmatrix} = \begin{bmatrix} 7 & 1 \\ 1 & 7 \end{bmatrix}\). Is this correct? If not, identify the error and give the correct \(X\).

## DIAGNOSTIC_ANSWER_5
The student incorrectly added the matrix instead of subtracting it. The correct step is \(X = \begin{bmatrix} 5 & 0 \\ 2 & 4 \end{bmatrix} - \begin{bmatrix} 2 & 1 \\ -1 & 3 \end{bmatrix} = \begin{bmatrix} 3 & -1 \\ 3 & 1 \end{bmatrix}\). The error shows the student treats matrix equations exactly like scalar equations but forgets that moving a term to the other side requires adding its additive inverse (i.e., subtracting). This is a classic sign error when transposing matrix terms.

## DIAGNOSTIC_QUESTION_6
Create a real-world problem (with an Indian context, e.g., a school canteen, a farm, or a small business) that requires adding two matrices of order \(2 \times 3\). Write the problem statement, define the matrices, and show the addition.

## DIAGNOSTIC_ANSWER_6
A good answer will: (1) describe two entities (e.g., two school canteens) with the same categories (rows) and items (columns), (2) give numerical data for each, (3) represent them as \(2 \times 3\) matrices, (4) add them element-wise, and (5) interpret the result (e.g., total weekly sales). A poor answer might use different categories for the two matrices, mismatch orders, or fail to explain what rows/columns represent. This reveals whether the student understands that addition combines *comparable* data.

## COMMON_MISCONCEPTION
Students frequently attempt to add matrices of different orders, arguing that "both have 6 elements". They also often commit sign errors in subtraction: writing \(a_{ij} - b_{ij}\) as \(b_{ij} - a_{ij}\) or mishandling double negatives (e.g., \(2 - (-3) = -1\)). Another common error is assuming subtraction is commutative: \(A - B = B - A\). In matrix equations, they incorrectly "move terms across the equal sign" by adding instead of subtracting (e.g., \(X + A = B \Rightarrow X = B + A\)).

## ON_FAILURE
1. Revisit **c12_math_cbse_03_003 (Equality of Matrices)** to reinforce that matrices are equal only when corresponding elements match — this underpins element-wise operations.  
2. Practice integer/decimal addition/subtraction with signed numbers using **c6_math_ch02_019** and **c6_math_ch04_046** to fix sign errors.  
3. Work through 5 simple \(2 \times 2\) matrix addition/subtraction problems, explicitly writing each element's computation: \(c_{11} = a_{11} + b_{11}\), etc.  
4. Re-attempt Diagnostic Question 3 and 5; if errors persist, use colour-coding (e.g., red for row 1, blue for row 2) to track positions.

## PREREQUISITE_NODE_IDS
c12_math_cbse_03_001, c12_math_cbse_03_002, c12_math_cbse_03_003, c6_math_ch02_019, c6_math_ch03_033, c6_math_ch04_046, c8_math_ch13_7
## PREREQUISITE_REASONS
c12_math_cbse_03_001: Defines matrix, order, and elements — needed to understand what a matrix is before operating on it.  
c12_math_cbse_03_002: Classifies matrices (row, column, square) — helps recognise when orders match.  
c12_math_cbse_03_003: Equality of matrices — establishes that operations are defined element-wise on corresponding positions.  
c6_math_ch02_019: Addition of integers — prerequisite for adding matrix entries which may be negative.  
c6_math_ch03_033: Addition of fractions — entries can be fractions; same element-wise logic applies.  
c6_math_ch04_046: Addition and subtraction of decimals — entries can be decimals; reinforces place-value alignment (analogous to position alignment in matrices).  
c8_math_ch13_7: Adding and subtracting algebraic expressions — builds the concept of combining like terms, directly analogous to adding corresponding matrix elements.

## FORWARD_NODE_IDS
c12_math_cbse_03_005, c12_math_cbse_03_006, c12_math_cbse_03_007, c12_math_cbse_03_008, c12_math_cbse_03_009, c12_math_cbse_03_010, c12_math_cbse_03_011
## FORWARD_REASONS
c12_math_cbse_03_005: Matrix multiplication uses addition of products; understanding addition is essential for the summation step.  
c12_math_cbse_03_006: Scalar multiplication \(kA\) is repeated addition; properties like \(k(A+B)=kA+kB\) rely on addition.  
c12_math_cbse_03_007: Properties of matrix multiplication (distributivity) involve matrix addition.  
c12_math_cbse_03_008: Transpose properties \((A+B)' = A' + B'\) use addition.  
c12_math_cbse_03_009: Symmetric/skew-symmetric matrices are defined via \(A \pm A'\).  
c12_math_cbse_03_010: Elementary row operations include adding a multiple of one row to another.  
c12_math_cbse_03_011: Inverse by elementary operations requires adding/subtracting rows.

## CROSS_SUBJECT_PREREQS
c11_stat_cbse_03_003, c11_stat_cbse_04_003
## CROSS_SUBJECT_REASONS
c11_stat_cbse_03_003: Frequency distributions are often stored in matrices; adding matrices combines data from different groups (e.g., rural + urban).  
c11_stat_cbse_04_003: Bar diagrams represent matrix data; adding matrices corresponds to stacking bars for total frequencies.

## CHAIN_DESCRIPTION
c12_math_cbse_03_003 -> c12_math_cbse_03_004 -> c12_math_cbse_03_005

## THIS_FORMULA
\((A + B)_{ij} = a_{ij} + b_{ij}\) for all \(i,j\); \((A - B)_{ij} = a_{ij} - b_{ij}\); \((-A)_{ij} = -a_{ij}\).

## FORMULA_VARIABLES
\(A, B\): matrices of order \(m \times n\); \(a_{ij}, b_{ij}\): real numbers representing the \((i,j)\)-th elements; \(i = 1,\dots,m\); \(j = 1,\dots,n\).

## FORMULA_UNITS
dimensionless (though elements may carry units like rupees, kg, etc., the operation itself is unit-agnostic).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_stat_cbse_03_003 | Frequency distribution tables from different regions can be added as matrices to get combined totals.  
c11_stat_cbse_04_003 | Bar diagram data for two years stored in matrices; matrix addition gives year-wise totals for a combined chart.
## PREREQ_CONCEPT
Element-wise addition of ordered arrays (vectors) and the concept of corresponding positions in rectangular arrangements.

## PREREQ_BEFORE
Student must be able to identify the order of a matrix and locate the element at a given row and column.

## PREREQ_STUCK
If stuck, review **c12_math_cbse_03_003 (Equality of Matrices)** to practice matching corresponding elements of two matrices.

## WORKED_EXAMPLE_1
PROBLEM: A school canteen sells three snacks (Samosa, Sandwich, Juice) on two days (Monday, Tuesday). The sales (in pieces) are recorded as matrices:  
\(M = \begin{bmatrix} 120 & 80 & 200 \\ 90 & 110 & 150 \end{bmatrix}\) (rows: Samosa, Sandwich, Juice; columns: Mon, Tue)  
\(N = \begin{bmatrix} 50 & 60 & 70 \\ 40 & 30 & 80 \end{bmatrix}\) (same rows/columns for a second canteen).  
Find the total sales of both canteens combined for each snack on each day.

STEPS:
- Step 1: Verify both matrices have the same order. \(M\) is \(3 \times 2\), \(N\) is \(3 \times 2\) → addition is defined.
- Step 2: Write the sum matrix \(T = M + N\) by adding corresponding entries.
- Step 3: Compute each element:  
  \(t_{11} = 120 + 50 = 170\) (Samosa Mon)  
  \(t_{12} = 80 + 60 = 140\) (Samosa Tue)  
  \(t_{21} = 90 + 40 = 130\) (Sandwich Mon)  
  \(t_{22} = 110 + 30 = 140\) (Sandwich Tue)  
  \(t_{31} = 200 + 70 = 270\) (Juice Mon)  
  \(t_{32} = 150 + 80 = 230\) (Juice Tue)
- Step 4: Assemble the total matrix:  
  \(T = \begin{bmatrix} 170 & 140 \\ 130 & 140 \\ 270 & 230 \end{bmatrix}\)
- Step 5: Interpret: Combined Samosa sales = 170 (Mon), 140 (Tue); Sandwich = 130, 140; Juice = 270, 230.

REASONING: Matrix addition directly combines quantities that share the same categorical meaning (same row = same snack, same column = same day). The element-wise rule ensures we add "apples to apples". This mirrors how we add column-wise in a spreadsheet.

ANSWER: \(\begin{bmatrix} 170 & 140 \\ 130 & 140 \\ 270 & 230 \end{bmatrix}\) (units: pieces)

## WORKED_EXAMPLE_2
PROBLEM: A farmer tracks the yield (in kg) of three crops (Wheat, Rice, Maize) in two seasons (Kharif, Rabi) for Year 1 and Year 2.  
Year 1: \(Y_1 = \begin{bmatrix} 5000 & 3000 \\ 4000 & 2500 \\ 2000 & 1500 \end{bmatrix}\) (rows: Wheat, Rice, Maize; cols: Kharif, Rabi)  
Year 2: \(Y_2 = \begin{bmatrix} 5500 & 3200 \\ 4200 & 2700 \\ 2100 & 1600 \end{bmatrix}\)  
Find the change in yield from Year 1 to Year 2 (i.e., \(Y_2 - Y_1\)).

STEPS:
- Step 1: Confirm same order: both \(3 \times 2\) → subtraction defined.
- Step 2: Compute \(D = Y_2 - Y_1\) element-wise: \(d_{ij} = (Y_2)_{ij} - (Y_1)_{ij}\).
- Step 3: Calculate each entry:  
  Wheat Kharif: \(5500 - 5000 = 500\)  
  Wheat Rabi: \(3200 - 3000 = 200\)  
  Rice Kharif: \(4200 - 4000 = 200\)  
  Rice Rabi: \(2700 - 2500 = 200\)  
  Maize Kharif: \(2100 - 2000 = 100\)  
  Maize Rabi: \(1600 - 1500 = 100\)
- Step 4: Form the difference matrix:  
  \(D = \begin{bmatrix} 500 & 200 \\ 200 & 200 \\ 100 & 100 \end{bmatrix}\)
- Step 5: Interpret: All crops show an increase; Wheat Kharif increased the most (500 kg).

REASONING: Subtraction \(Y_2 - Y_1\) gives the change (increase if positive, decrease if negative). Because the matrices are aligned by crop and season, element-wise subtraction correctly compares the same crop in the same season across years.

ANSWER: \(\begin{bmatrix} 500 & 200 \\ 200 & 200 \\ 100 & 100 \end{bmatrix}\) kg

## WORKED_EXAMPLE_3
PROBLEM: Find matrices \(X\) and \(Y\) if  
\(X + Y = \begin{bmatrix} 8 & 6 \\ 4 & 10 \end{bmatrix}\) and \(X - Y = \begin{bmatrix} 2 & 0 \\ -2 & 4 \end{bmatrix}\).

STEPS:
- Step 1: Add the two equations: \((X+Y) + (X-Y) = 2X\).
- Step 2: Compute \(2X = \begin{bmatrix} 8 & 6 \\ 4 & 10 \end{bmatrix} + \begin{bmatrix} 2 & 0 \\ -2 & 4 \end{bmatrix} = \begin{bmatrix} 10 & 6 \\ 2 & 14 \end{bmatrix}\).
- Step 3: Divide by 2 (scalar multiplication): \(X = \frac{1}{2} \begin{bmatrix} 10 & 6 \\ 2 & 14 \end{bmatrix} = \begin{bmatrix} 5 & 3 \\ 1 & 7 \end{bmatrix}\).
- Step 4: Substitute \(X\) into \(X + Y = \begin{bmatrix} 8 & 6 \\ 4 & 10 \end{bmatrix}\) to find \(Y\):  
  \(Y = \begin{bmatrix} 8 & 6 \\ 4 & 10 \end{bmatrix} - \begin{bmatrix} 5 & 3 \\ 1 & 7 \end{bmatrix} = \begin{bmatrix} 3 & 3 \\ 3 & 3 \end{bmatrix}\).
- Step 5: Verify with the second equation: \(X - Y = \begin{bmatrix} 5 & 3 \\ 1 & 7 \end{bmatrix} - \begin{bmatrix} 3 & 3 \\ 3 & 3 \end{bmatrix} = \begin{bmatrix} 2 & 0 \\ -2 & 4 \end{bmatrix}\) ✓.

REASONING: This uses the same algebraic technique as solving simultaneous linear equations, but with matrices. Adding the equations eliminates \(Y\) because \(Y + (-Y) = O\). The solution relies on the fact that matrix addition is commutative and associative, and that scalar multiplication distributes over addition.

ANSWER: \(X = \begin{bmatrix} 5 & 3 \\ 1 & 7 \end{bmatrix},\; Y = \begin{bmatrix} 3 & 3 \\ 3 & 3 \end{bmatrix}\)

## COMPETENCY_QUESTION_1
QUESTION: A bookshop has two branches. Their stock of three subjects (Physics, Chemistry, Mathematics) in two categories (Textbooks, Reference books) is given by matrices \(S_1\) and \(S_2\):  
\(S_1 = \begin{bmatrix} 50 & 30 \\ 40 & 20 \\ 60 & 25 \end{bmatrix},\; S_2 = \begin{bmatrix} 35 & 25 \\ 45 & 15 \\ 50 & 30 \end{bmatrix}\) (rows: Phy, Chem, Math; cols: Text, Ref).  
(a) Find the total stock matrix \(T = S_1 + S_2\).  
(b) The shop owner claims that the total number of Physics textbooks is 85. Verify this claim using the matrix \(T\).  
(c) Is matrix addition commutative? Use \(S_1\) and \(S_2\) to demonstrate.

COMPETENCY: Translating real-world situations to mathematical expressions and verifying properties.

STEPS:
- Step 1: Add \(S_1\) and \(S_2\) element-wise to get \(T\).
- Step 2: Read the (1,1) entry of \(T\) for Physics textbooks.
- Step 3: Compute \(S_2 + S_1\) and compare with \(T\).

ANSWER:  
(a) \(T = \begin{bmatrix} 85 & 55 \\ 85 & 35 \\ 110 & 55 \end{bmatrix}\)  
(b) The (1,1) entry is 85 → claim is correct.  
(c) \(S_2 + S_1 = \begin{bmatrix} 85 & 55 \\ 85 & 35 \\ 110 & 55 \end{bmatrix} = T\). Since \(S_1 + S_2 = S_2 + S_1\), matrix addition is commutative.

DIFFICULTY: easy

## COMPETENCY_QUESTION_2
QUESTION: Assertion (A): For any two matrices \(A\) and \(B\) of the same order, \(A - B = B - A\).  
Reason (R): Subtraction of real numbers is commutative.  
Choose the correct option:  
(i) Both A and R are true, and R correctly explains A.  
(ii) Both A and R are true, but R does not explain A.  
(iii) A is true but R is false.  
(iv) A is false but R is true.  
Justify your choice with a concrete \(2 \times 2\) counterexample.

COMPETENCY: Error identification and correction; logical reasoning about algebraic properties.

STEPS:
- Step 1: Recall that subtraction of real numbers is NOT commutative (e.g., \(5-3 \neq 3-5\)).
- Step 2: Since matrix subtraction is defined element-wise using real-number subtraction, it inherits non-commutativity.
- Step 3: Construct a simple counterexample: \(A = \begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix},\; B = \begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix}\).
- Step 4: Compute \(A-B\) and \(B-A\) and show they are not equal.
- Step 5: Select the correct option based on truth values.

ANSWER:  
Real number subtraction is not commutative, so R is false. Matrix subtraction is also not commutative, so A is false. Option (iv): A is false but R is true? Wait — R says "Subtraction of real numbers is commutative." That statement is false. So R is false. Both A and R are false. But the options given don't include "both false". Let's re-evaluate: The reason R is "Subtraction of real numbers is commutative." That's a false statement. So R is false. Assertion A is also false. The options: (i) both true and R explains A; (ii) both true but R doesn't explain; (iii) A true, R false; (iv) A false, R true. N/A match "both false". This is a trick: the reason is actually false, so the correct choice is not listed? In standard Assertion-Reason questions, if both are false, it's often not an option. Let's adjust the reason to make it a valid question.  
Better: Reason (R): Addition of real numbers is commutative. Then R is true, but it does not explain A because subtraction is not addition. A is false. So option (iv) A false, R true. That works.  
Let's change the question accordingly.

REVISED QUESTION: Assertion (A): For any two matrices \(A\) and \(B\) of the same order, \(A - B = B - A\).  
Reason (R): Addition of real numbers is commutative.  
Choose the correct option...  
Justify with a counterexample.

ANSWER:  
R is true (addition of real numbers is commutative). A is false because matrix subtraction uses real-number subtraction, which is not commutative. Counterexample: \(A = \begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix},\; B = \begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix}\).  
\(A - B = \begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix},\; B - A = \begin{bmatrix} -1 & 0 \\ 0 & 1 \end{bmatrix}\). Not equal.  
Thus A is false, R is true → option (iv).

DIFFICULTY: medium

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine two shoe factories, Factory A and Factory B, each producing boys' and girls' shoes in three price ______.

## DIAGNOSTIC_ANSWER_7
categories

The price categories are the columns: each slot in the grid carries a shoe type and a price band, which is why positions are never interchangeable. **A wrong answer (sizes) reveals the student has reshuffled the factory's ledger and scrambled which slots correspond.**

## DIAGNOSTIC_QUESTION_8
What common mix-up does this lesson flag about Matrix addition?

## DIAGNOSTIC_ANSWER_8
Students frequently attempt to add matrices of different orders, arguing that "both have 6 elements".

The flagged error counts elements instead of shapes: six numbers in a 2 by 3 and six in a 3 by 2 occupy entirely different addresses, and no slot pairing survives the mismatch. **A wrong answer that adds mismatched orders reveals the student has trusted the census over the map - addition is positional, and the map is the order.**

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can also model real-world situations (e.g., combined sales, change in production) using matrix addition/subtraction.

Mastery is the modelling: combined production, sales changes, inventory shifts - the entrywise operations are learned so real grids can be merged. **A wrong answer (pure drill) reveals the student has stopped at the arithmetic and missed the applied purpose the syllabus names.**
