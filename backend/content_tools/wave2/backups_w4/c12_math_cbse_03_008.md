## ELI5
A marks table lists three students across two subjects; to read it with subjects as rows instead, flip the table about its diagonal - the rows become columns. That flip is the transpose: the element sitting at row i, column j of the new matrix is the element from row j, column i of the old. Order swaps from m by n to n by m, diagonal entries stay put, and off-diagonal partners trade places across the diagonal.

## DEFINITION
The transpose of a matrix \(A = [a_{ij}]_{m \times n}\) is the matrix \(A'\) (or \(A^T\)) of order \(n \times m\) obtained by interchanging the rows and columns of \(A\); that is, the \((i,j)\)-th element of \(A'\) is the \((j,i)\)-th element of \(A\): \((A')_{ij} = a_{ji}\) for all \(1 \le i \le n,\; 1 \le j \le m\).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can compute the transpose of any given matrix, verify the four fundamental properties of transpose \((A')' = A\), \((kA)' = kA'\), \((A+B)' = A' + B'\), \((AB)' = B'A'\) with concrete examples, and explain why the order of multiplication reverses in the last property.

## SCOPE_BOUNDARY
This node covers the definition of transpose, its four algebraic properties, and their verification through examples. It does NOT cover symmetric or skew-symmetric matrices (node c12_math_cbse_03_009), elementary transformations (c12_math_cbse_03_010), or inverses (c12_math_cbse_03_011).

## WALKTHROUGH
Imagine you have a table showing the marks of three students (Radha, Fauzia, Simran) in two subjects (Maths, Physics) arranged as a \(3 \times 2\) matrix. If you want to view the same data with subjects as rows and students as columns, you need to swap rows and columns — this is exactly the transpose operation. Start by writing the original matrix and its order \(m \times n\). To form the transpose, make the first row of the original matrix become the first column of the new matrix, the second row become the second column, and so on. The resulting matrix will have order \(n \times m\). Notice that the diagonal elements (if any) stay in place, while off-diagonal elements swap across the diagonal. This simple "flip" leads to powerful properties that simplify many matrix calculations, especially when dealing with products.

Takeaway first: the transpose is a change of viewpoint, not of data - the same numbers seen from the other axis - and its four algebraic habits (double flip returns the original, scalars pass through, sums split, and products reverse order) do the heavy lifting later. Exam moves: compute questions on any transpose, verification questions on the four properties with examples, and explain questions on why the product property reverses order. Method: rerun the marks table - students down or subjects down, identical facts - then verify each property on a small example. Check yourself: the reversal in (AB) prime equals B prime A prime is forced by the shapes, not by convention - try reversing it and watch the multiplication become undefined. Drill: flip one three-by-two matrix and verify two of the four properties.

## DIAGNOSTIC_QUESTION_1
If \(A = \begin{bmatrix} 2 & -1 & 0 \\ 3 & 4 & 5 \end{bmatrix}\), write the transpose \(A'\) and state its order.

## DIAGNOSTIC_ANSWER_1
\(A' = \begin{bmatrix} 2 & 3 \\ -1 & 4 \\ 0 & 5 \end{bmatrix}\) of order \(3 \times 2\). A wrong answer such as keeping the same order \(2 \times 3\) or writing \(\begin{bmatrix} 2 & -1 \\ 3 & 4 \\ 0 & 5 \end{bmatrix}\) reveals that the student has not understood that rows become columns and the order changes from \(m \times n\) to \(n \times m\).

## DIAGNOSTIC_QUESTION_2
Explain why \((A')' = A\) is always true for any matrix \(A\). Use the definition of transpose in your explanation.

## DIAGNOSTIC_ANSWER_2
Transpose swaps rows and columns: \((A')_{ij} = a_{ji}\). Applying transpose again gives \(((A')')_{ij} = (A')_{ji} = a_{ij}\), which is exactly the original element. Hence \((A')' = A\). A wrong answer that merely states "it's a property" without referencing the index swap shows the student memorized the rule but does not understand the mechanism.

## DIAGNOSTIC_QUESTION_3
Let \(A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}\) and \(B = \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}\). Compute \((A+B)'\) and \(A' + B'\) and verify they are equal.

## DIAGNOSTIC_ANSWER_3
\(A+B = \begin{bmatrix} 6 & 8 \\ 10 & 12 \end{bmatrix}\), so \((A+B)' = \begin{bmatrix} 6 & 10 \\ 8 & 12 \end{bmatrix}\). \(A' = \begin{bmatrix} 1 & 3 \\ 2 & 4 \end{bmatrix}\), \(B' = \begin{bmatrix} 5 & 7 \\ 6 & 8 \end{bmatrix}\), so \(A' + B' = \begin{bmatrix} 6 & 10 \\ 8 & 12 \end{bmatrix}\). They match. A common error is to add the transposes incorrectly (e.g., adding row-wise instead of element-wise) or to forget that addition is element-wise, revealing a shaky grasp of matrix addition.

## DIAGNOSTIC_QUESTION_4
Given \(A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}_{2 \times 3}\) and \(B = \begin{bmatrix} 7 & 8 \\ 9 & 10 \\ 11 & 12 \end{bmatrix}_{3 \times 2}\), compute \((AB)'\) and \(B'A'\). Are they equal? What does this tell you about the order of multiplication in the transpose of a product?

## DIAGNOSTIC_ANSWER_4
\(AB = \begin{bmatrix} 58 & 64 \\ 139 & 154 \end{bmatrix}\), so \((AB)' = \begin{bmatrix} 58 & 139 \\ 64 & 154 \end{bmatrix}\). \(B' = \begin{bmatrix} 7 & 9 & 11 \\ 8 & 10 & 12 \end{bmatrix}\), \(A' = \begin{bmatrix} 1 & 4 \\ 2 & 5 \\ 3 & 6 \end{bmatrix}\), \(B'A' = \begin{bmatrix} 58 & 139 \\ 64 & 154 \end{bmatrix}\). They are equal. The order of multiplication reverses: \((AB)' = B'A'\). A student who computes \(A'B'\) (which is not even defined because \(A'\) is \(3 \times 2\) and \(B'\) is \(2 \times 3\)) or claims \((AB)' = A'B'\) has not internalized the reversal rule.

## DIAGNOSTIC_QUESTION_5
A student claims that for any scalar \(k\) and matrix \(A\), \((kA)' = kA'\) is false because "the scalar should also be transposed". Evaluate this claim and explain why the student is wrong.

## DIAGNOSTIC_ANSWER_5
The claim is false. Transpose acts only on the matrix entries; a scalar has no rows or columns to interchange. By definition, \((kA)_{ij} = k a_{ij}\), so \(((kA)')_{ij} = (kA)_{ji} = k a_{ji} = k (A')_{ij}\). Hence \((kA)' = kA'\). The student's error shows a misunderstanding that transpose is an operation on the array structure, not on the scalar multiplier.

## DIAGNOSTIC_QUESTION_6
Construct a \(2 \times 3\) matrix \(A\) and a \(3 \times 2\) matrix \(B\) such that \((AB)' \neq A'B'\) (i.e., the product \(A'B'\) is defined but gives a different matrix). Show your work.

## DIAGNOSTIC_ANSWER_6
Take \(A = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \end{bmatrix}\), \(B = \begin{bmatrix} 1 & 0 \\ 0 & 1 \\ 0 & 0 \end{bmatrix}\). Then \(AB = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}\), \((AB)' = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}\). \(A' = \begin{bmatrix} 1 & 0 \\ 0 & 1 \\ 0 & 0 \end{bmatrix}\), \(B' = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \end{bmatrix}\), \(A'B' = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 0 \end{bmatrix} \neq (AB)'\). A student who cannot produce such a counterexample likely thinks \((AB)' = A'B'\) always holds, missing the crucial reversal of order.

## COMMON_MISCONCEPTION
Students frequently write \((AB)' = A'B'\) instead of \((AB)' = B'A'\). For example, with \(A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}\), \(B = \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}\), they compute \(A'B' = \begin{bmatrix} 1 & 3 \\ 2 & 4 \end{bmatrix}\begin{bmatrix} 5 & 7 \\ 6 & 8 \end{bmatrix} = \begin{bmatrix} 23 & 31 \\ 34 & 46 \end{bmatrix}\) but the correct \((AB)' = \begin{bmatrix} 19 & 43 \\ 22 & 50 \end{bmatrix}' = \begin{bmatrix} 19 & 22 \\ 43 & 50 \end{bmatrix}\). The error stems from treating transpose as a simple element-wise operation that distributes over multiplication without reversing order, ignoring that matrix multiplication is not commutative.

## ON_FAILURE
1. Revisit the definition of matrix multiplication (node c12_math_cbse_03_005) and explicitly write the \((i,k)\)-th element of \(AB\) as \(\sum_j a_{ij}b_{jk}\).
2. Write the \((k,i)\)-th element of \((AB)'\) as \(\sum_j a_{ij}b_{jk}\).
3. Write the \((k,i)\)-th element of \(B'A'\) as \(\sum_j b_{kj}a_{ji} = \sum_j a_{ij}b_{jk}\) (since \(b_{kj} = (B')_{jk}\) and \(a_{ji} = (A')_{ij}\)).
4. Conclude that the two sums are identical, so \((AB)' = B'A'\). Practice with two numerical examples of different sizes until the reversal becomes automatic.

## PREREQUISITE_NODE_IDS
c12_math_cbse_03_001, c12_math_cbse_03_002, c12_math_cbse_03_003, c12_math_cbse_03_004, c12_math_cbse_03_005, c12_math_cbse_03_006, c12_math_cbse_03_007, c11_math_cbse_02_010, c11_math_cbse_01_001

## PREREQUISITE_REASONS
c12_math_cbse_03_001: Need to know what a matrix is and its order.
c12_math_cbse_03_002: Understanding types (row, column, square) helps see how transpose changes a row matrix to a column matrix and vice versa.
c12_math_cbse_03_003: Equality of matrices is used to verify properties like \((A+B)' = A' + B'\).
c12_math_cbse_03_004: Matrix addition is required for property \((A+B)' = A' + B'\).
c12_math_cbse_03_005: Matrix multiplication is essential for property \((AB)' = B'A'\).
c12_math_cbse_03_006: Scalar multiplication is needed for property \((kA)' = kA'\).
c12_math_cbse_03_007: Properties of matrix multiplication (non-commutativity) explain why order reverses in transpose of product.
c11_math_cbse_02_010: Algebra of real functions provides the concept of an operation (transpose) acting on objects (matrices) with properties like distributivity.
c11_math_cbse_01_001: Sets underlie the definition of a matrix as an ordered rectangular array of numbers.

## FORWARD_NODE_IDS
c12_math_cbse_03_009, c12_math_cbse_03_010, c12_math_cbse_03_011
## FORWARD_REASONS
c12_math_cbse_03_009: Symmetric and skew-symmetric matrices are defined using transpose (\(A' = A\) or \(A' = -A\)).
c12_math_cbse_03_010: Elementary row/column operations involve transpose when converting row operations to column operations.
c12_math_cbse_03_011: The inverse of a matrix is often found using transpose in the adjugate method; also \((A^{-1})' = (A')^{-1}\).

## CROSS_SUBJECT_PREREQS
c11_math_cbse_02_010, c11_math_cbse_01_001
## CROSS_SUBJECT_REASONS
c11_math_cbse_02_010: The transpose operation is a linear map on the vector space of matrices; its properties mirror those of linear functions (additivity, homogeneity).
c11_math_cbse_01_001: A matrix is a set of ordered entries; transpose is a permutation of that set, illustrating set-theoretic bijections.

## CHAIN_DESCRIPTION
c12_math_cbse_03_005 -> c12_math_cbse_03_008 -> c12_math_cbse_03_009

## THIS_FORMULA
\((A')_{ij} = a_{ji}\) for \(A = [a_{ij}]_{m \times n}\); Properties: \((A')' = A\), \((kA)' = kA'\), \((A+B)' = A' + B'\), \((AB)' = B'A'\).

## FORMULA_VARIABLES
\(A\) = matrix of order \(m \times n\); \(a_{ij}\) = element in \(i\)-th row, \(j\)-th column of \(A\); \(A'\) = transpose of \(A\), order \(n \times m\); \(k\) = scalar; \(B\) = matrix of compatible order for addition/multiplication.

## FORMULA_UNITS
dimensionless (matrices are arrays of numbers, no physical units)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_04_001 | Rotation matrices in physics: the transpose of a rotation matrix is its inverse, used in coordinate transformations.
 N/A | Image processing: transposing a pixel matrix rotates the image 90 degrees; used in computer graphics.
## PREREQ_CONCEPT
Matrix multiplication and the fact that it is not commutative (AB ≠ BA in general).

## PREREQ_BEFORE
The student must be able to multiply two matrices of compatible orders and add matrices of the same order.

## PREREQ_STUCK
If stuck, review matrix multiplication (c12_math_cbse_03_005) and matrix addition (c12_math_cbse_03_004) with concrete numerical examples.

## WORKED_EXAMPLE_1
PROBLEM: A school stores the fees (in rupees) for three classes (VI, VII, VIII) in two terms (Term 1, Term 2) as a matrix \(F = \begin{bmatrix} 5000 & 5500 \\ 6000 & 6500 \\ 7000 & 7500 \end{bmatrix}\). The administration wants a matrix where rows represent terms and columns represent classes. Find the required matrix and state its order.
STEPS:
- Step 1: Identify the given matrix \(F\) has order \(3 \times 2\) (3 classes, 2 terms). The element \(f_{ij}\) is the fee for class \(i\) in term \(j\).
- Step 2: To swap rows and columns, write the first row of \(F\) as the first column of \(F'\), the second row as the second column, and the third row as the third column.
- Step 3: \(F' = \begin{bmatrix} 5000 & 6000 & 7000 \\ 5500 & 6500 & 7500 \end{bmatrix}\).
- Step 4: Verify order: \(F'\) has 2 rows (terms) and 3 columns (classes), so order is \(2 \times 3\).
- Step 5: Interpret: The entry in row 1, column 2 of \(F'\) is 6000, which is the Term 1 fee for Class VII — consistent with the original data.
REASONING: Transpose reorients data without changing values. The \((i,j)\) entry of \(F'\) is the \((j,i)\) entry of \(F\), so fees are correctly reassigned.
ANSWER: \(F' = \begin{bmatrix} 5000 & 6000 & 7000 \\ 5500 & 6500 & 7500 \end{bmatrix}\) of order \(2 \times 3\).

## WORKED_EXAMPLE_2
PROBLEM: Let \(A = \begin{bmatrix} 2 & -1 \\ 0 & 3 \end{bmatrix}\), \(B = \begin{bmatrix} 1 & 4 \\ -2 & 5 \end{bmatrix}\). Verify the property \((A+B)' = A' + B'\).
STEPS:
- Step 1: Compute \(A+B = \begin{bmatrix} 2+1 & -1+4 \\ 0+(-2) & 3+5 \end{bmatrix} = \begin{bmatrix} 3 & 3 \\ -2 & 8 \end{bmatrix}\).
- Step 2: Find \((A+B)'\) by swapping rows and columns: \((A+B)' = \begin{bmatrix} 3 & -2 \\ 3 & 8 \end{bmatrix}\).
- Step 3: Compute \(A' = \begin{bmatrix} 2 & 0 \\ -1 & 3 \end{bmatrix}\) and \(B' = \begin{bmatrix} 1 & -2 \\ 4 & 5 \end{bmatrix}\).
- Step 4: Add \(A' + B' = \begin{bmatrix} 2+1 & 0+(-2) \\ -1+4 & 3+5 \end{bmatrix} = \begin{bmatrix} 3 & -2 \\ 3 & 8 \end{bmatrix}\).
- Step 5: Compare: \((A+B)' = A' + B'\). The property holds.
REASONING: Transpose distributes over addition because addition is element-wise and transpose merely re-indexes elements; the sum of re-indexed elements equals the re-indexed sum.
ANSWER: Verified: \((A+B)' = A' + B' = \begin{bmatrix} 3 & -2 \\ 3 & 8 \end{bmatrix}\).

## WORKED_EXAMPLE_3
PROBLEM: Let \(A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}_{2 \times 3}\) and \(B = \begin{bmatrix} 7 & 8 \\ 9 & 10 \\ 11 & 12 \end{bmatrix}_{3 \times 2}\). Compute \((AB)'\) and \(B'A'\) and confirm they are equal.
STEPS:
- Step 1: Compute \(AB\). Since \(A\) is \(2 \times 3\) and \(B\) is \(3 \times 2\), \(AB\) is \(2 \times 2\).
  \(AB = \begin{bmatrix} 1\cdot7 + 2\cdot9 + 3\cdot11 & 1\cdot8 + 2\cdot10 + 3\cdot12 \\ 4\cdot7 + 5\cdot9 + 6\cdot11 & 4\cdot8 + 5\cdot10 + 6\cdot12 \end{bmatrix} = \begin{bmatrix} 58 & 64 \\ 139 & 154 \end{bmatrix}\).
- Step 2: \((AB)' = \begin{bmatrix} 58 & 139 \\ 64 & 154 \end{bmatrix}\).
- Step 3: Find \(A' = \begin{bmatrix} 1 & 4 \\ 2 & 5 \\ 3 & 6 \end{bmatrix}_{3 \times 2}\) and \(B' = \begin{bmatrix} 7 & 9 & 11 \\ 8 & 10 & 12 \end{bmatrix}_{2 \times 3}\).
- Step 4: Compute \(B'A'\) (order \(2 \times 2\)):
  \(B'A' = \begin{bmatrix} 7\cdot1 + 9\cdot2 + 11\cdot3 & 7\cdot4 + 9\cdot5 + 11\cdot6 \\ 8\cdot1 + 10\cdot2 + 12\cdot3 & 8\cdot4 + 10\cdot5 + 12\cdot6 \end{bmatrix} = \begin{bmatrix} 58 & 139 \\ 64 & 154 \end{bmatrix}\).
- Step 5: Compare: \((AB)' = B'A'\). Note that \(A'B'\) is \(3 \times 3\) and not equal.
REASONING: The \((i,k)\) element of \(AB\) is \(\sum_j a_{ij}b_{jk}\). The \((k,i)\) element of \((AB)'\) is the same sum. The \((k,i)\) element of \(B'A'\) is \(\sum_j b_{kj}a_{ji} = \sum_j a_{ij}b_{jk}\), proving equality.
ANSWER: \((AB)' = B'A' = \begin{bmatrix} 58 & 139 \\ 64 & 154 \end{bmatrix}\).

## COMPETENCY_QUESTION_1
QUESTION: A student writes \((ABC)' = A'B'C'\) for three matrices \(A, B, C\) of compatible orders. Is this correct? If not, give the correct formula and explain why the order of multiplication reverses when taking the transpose of a product. Use the definition of matrix multiplication to justify your answer.
COMPETENCY: Explaining and justifying mathematical properties
STEPS:
- Step 1: Recall the property for two matrices: \((AB)' = B'A'\).
- Step 2: Apply it iteratively: \((ABC)' = ((AB)C)' = C'(AB)' = C'B'A'\).
- Step 3: Explain that the \((i,j)\) element of \(AB\) is \(\sum_k a_{ik}b_{kj}\); transposing swaps indices, making the sum \(\sum_k b_{jk}a_{ki}\), which is exactly the \((j,i)\) element of \(B'A'\).
- Step 4: Conclude that for any number of matrices, the transpose of the product is the product of the transposes in reverse order.
ANSWER: The student is incorrect. The correct formula is \((ABC)' = C'B'A'\). The order reverses because transpose exchanges the row and column indices of each factor, and matrix multiplication sums over the column index of the first factor and the row index of the second. Transposing turns that sum into a sum over the row index of the first factor's transpose and the column index of the second factor's transpose, which matches the product of transposes in reverse order.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A company has two factories (F1, F2) producing three products (P1, P2, P3). The production matrix (units per day) is \(P = \begin{bmatrix} 100 & 150 & 200 \\ 80 & 120 & 180 \end{bmatrix}\) where rows are factories and columns are products. The profit per unit (in rupees) for each product is given as a column matrix \(C = \begin{bmatrix} 50 \\ 40 \\ 30 \end{bmatrix}\). (a) Find the daily profit for each factory using matrix multiplication. (b) If the company wants a matrix where rows are products and columns are factories, what is the transpose of \(P\)? (c) Using \(P'\) and \(C\), can you compute the same profits? Explain.
COMPETENCY: Translating real-world situations to mathematical expressions and interpreting results
STEPS:
- Step 1: (a) Daily profit = \(P \times C\). \(P\) is \(2 \times 3\), \(C\) is \(3 \times 1\) → product is \(2 \times 1\).
  \(PC = \begin{bmatrix} 100\cdot50 + 150\cdot40 + 200\cdot30 \\ 80\cdot50 + 120\cdot40 + 180\cdot30 \end{bmatrix} = \begin{bmatrix} 5000+6000+6000 \\ 4000+4800+5400 \end{bmatrix} = \begin{bmatrix} 17000 \\ 14200 \end{bmatrix}\) rupees.
- Step 2: (b) \(P' = \begin{bmatrix} 100 & 80 \\ 150 & 120 \\ 200 & 180 \end{bmatrix}\) (order \(3 \times 2\)).
- Step 3: (c) To use \(P'\) and \(C\), note that \(C\) is \(3 \times 1\). \(P'\) is \(3 \times 2\). The product \(P'C\) is not defined (columns of \(P'\) = 2 ≠ rows of \(C\) = 3). However, \(C' P'\) would be \(1 \times 2\) giving a row matrix of profits. But the natural way is \(PC\). The transpose changes the orientation; profit calculation requires the original orientation.
- Step 4: Interpret: Transpose swaps the role of factories and products; profit per factory is obtained by multiplying factory-row by product-column.
ANSWER: (a) Factory F1: ₹17,000; Factory F2: ₹14,200. (b) \(P' = \begin{bmatrix} 100 & 80 \\ 150 & 120 \\ 200 & 180 \end{bmatrix}\). (c) Direct multiplication \(P'C\) is not defined; the correct profit calculation uses \(PC\). Transpose is useful when we need product-wise data across factories.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: If you want to view the same data with subjects as rows and students as columns, you need to swap rows and columns — this is exactly the ______ operation.

## DIAGNOSTIC_ANSWER_7
transpose

Transpose is the flip's name: the operation that re-reads a table from the other axis without changing a single entry. **A wrong answer (inverse) reveals the student has confused a reshaping with an undoing - transpose needs no division and forgives every matrix.**
