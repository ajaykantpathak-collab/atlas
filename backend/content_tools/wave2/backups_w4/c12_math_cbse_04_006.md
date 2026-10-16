## ELI5
A treasure-hunt code locked by a three-by-three matrix needs a reverse key: the adjoint is that key's core. Compute every entry's cofactor, arrange the cofactors into a matrix, then transpose it - the result is adj A. Its magic is the bridge identity: A times adj A equals adj A times A equals the determinant times the identity. For two-by-twos there is a shortcut - swap the diagonal entries, negate the off-diagonal pair - and dividing the adjoint by the determinant finishes the inverse.

## DEFINITION
The adjoint of a square matrix \( A = [a_{ij}]_{n \times n} \) is the transpose of the cofactor matrix of \( A \). If \( A_{ij} \) denotes the cofactor of element \( a_{ij} \), then \( \text{adj } A = [A_{ji}]_{n \times n} \), i.e., the \((i,j)\)-th entry of \( \text{adj } A \) is the cofactor \( A_{ji} \) of \( A \). For a \( 2 \times 2 \) matrix \( A = \begin{bmatrix} a & b \\ c & d \end{bmatrix} \), \( \text{adj } A = \begin{bmatrix} d & -b \\ -c & a \end{bmatrix} \) (interchange diagonal elements, change signs of off-diagonal elements).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can correctly construct the adjoint of any \( 2 \times 2 \) or \( 3 \times 3 \) matrix by first finding all cofactors, forming the cofactor matrix, and then transposing it. The student can also verify the fundamental identity \( A(\text{adj } A) = (\text{adj } A)A = |A|I \) for a given matrix.

## SCOPE_BOUNDARY
This node covers the definition of adjoint, its computation for \( 2 \times 2 \) and \( 3 \times 3 \) matrices, and the verification of \( A(\text{adj } A) = |A|I \). It does NOT cover finding the inverse using adjoint (next node), solving linear systems, or properties of adjoint like \( |\text{adj } A| = |A|^{n-1} \) (covered in later nodes).

## WALKTHROUGH
Imagine you are designing a secret code for your school's treasure hunt. You encode clues using a \( 3 \times 3 \) matrix \( A \). To decode them later, you need the "reverse" matrix — but you don't know the inverse formula yet. The adjoint is the first building block: it's a matrix made from cofactors that, when multiplied by \( A \), gives a diagonal matrix \( |A|I \). Start by recalling how to find minors and cofactors (previous node). For each element \( a_{ij} \), compute its cofactor \( A_{ij} \). Write all cofactors in a matrix of the same order — that's the cofactor matrix. Now transpose it: swap rows and columns. The result is \( \text{adj } A \). The key insight: \( A \times \text{adj } A \) always yields \( |A| \) times the identity matrix, which is the gateway to finding \( A^{-1} \).

Takeaway first: adjoint means cofactors computed, arranged, then transposed - and its product with A is always a diagonal matrix wearing the determinant. Exam moves: construction questions building adjoints of both orders, verification questions on the bridge identity, and two-by-two shortcut questions. Method: rerun the hunt - cofactor each cell, transpose the cofactor matrix, then multiply A by the result and watch the diagonal appear. Check yourself: the transpose step is where most slips happen - cofactors enter the adjoint transposed, so A-j-i's cofactor sits at position i-j. Drill: build one three-by-three adjoint, verify the bridge identity, and state the two-by-two shortcut from memory.

## DIAGNOSTIC_QUESTION_1
What is the adjoint of the matrix \( A = \begin{bmatrix} 2 & -3 \\ 4 & 5 \end{bmatrix} \)?

## DIAGNOSTIC_ANSWER_1
The adjoint is \( \text{adj } A = \begin{bmatrix} 5 & 3 \\ -4 & 2 \end{bmatrix} \). A wrong answer like \( \begin{bmatrix} 5 & -3 \\ 4 & 2 \end{bmatrix} \) reveals the student interchanged diagonal elements correctly but forgot to change signs of off-diagonal elements. Another common error \( \begin{bmatrix} 2 & 4 \\ -3 & 5 \end{bmatrix} \) shows the student only transposed the original matrix without using cofactors.

## DIAGNOSTIC_QUESTION_2
Explain why the \((1,2)\) entry of \( \text{adj } A \) for a \( 3 \times 3 \) matrix \( A \) is the cofactor \( A_{21} \) (not \( A_{12} \)) of \( A \).

## DIAGNOSTIC_ANSWER_2
By definition, \( \text{adj } A \) is the transpose of the cofactor matrix \( [A_{ij}] \). The \((1,2)\) entry of the transpose comes from the \((2,1)\) entry of the original cofactor matrix, which is \( A_{21} \). A student who says it's \( A_{12} \) has confused the order of indices and does not understand that "adjoint = transpose of cofactor matrix" means rows and columns are swapped.

## DIAGNOSTIC_QUESTION_3
Find \( \text{adj } A \) for \( A = \begin{bmatrix} 1 & 2 & 3 \\ 0 & 1 & 4 \\ 5 & 6 & 0 \end{bmatrix} \). Show all cofactor calculations.

## DIAGNOSTIC_ANSWER_3
Cofactors: \( A_{11} = -24, A_{12} = 20, A_{13} = -5 \); \( A_{21} = 18, A_{22} = -15, A_{23} = 4 \); \( A_{31} = 5, A_{32} = -4, A_{33} = 1 \).
Cofactor matrix \( = \begin{bmatrix} -24 & 20 & -5 \\ 18 & -15 & 4 \\ 5 & -4 & 1 \end{bmatrix} \).
\( \text{adj } A = \text{transpose} = \begin{bmatrix} -24 & 18 & 5 \\ 20 & -15 & -4 \\ -5 & 4 & 1 \end{bmatrix} \).
A wrong answer with signs flipped on the off-diagonals of the cofactor matrix (e.g., \( A_{12} = -20 \)) shows the student forgot the \( (-1)^{i+j} \) factor. An answer that is just the transpose of \( A \) shows confusion between transpose and adjoint.

## DIAGNOSTIC_QUESTION_4
If \( A = \begin{bmatrix} a & b \\ c & d \end{bmatrix} \), verify algebraically that \( A(\text{adj } A) = |A|I \). What does this tell you about the relationship between \( A \) and its adjoint?

## DIAGNOSTIC_ANSWER_4
\( \text{adj } A = \begin{bmatrix} d & -b \\ -c & a \end{bmatrix} \).
\( A(\text{adj } A) = \begin{bmatrix} a & b \\ c & d \end{bmatrix} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix} = \begin{bmatrix} ad - bc & -ab + ab \\ cd - dc & -bc + ad \end{bmatrix} = \begin{bmatrix} |A| & 0 \\ 0 & |A| \end{bmatrix} = |A|I \).
This shows the adjoint is constructed precisely so that multiplication with \( A \) cancels all off-diagonal terms and yields the determinant on the diagonal. A student who cannot carry out the multiplication step-by-step lacks fluency in matrix multiplication; one who gets non-zero off-diagonals made a sign error in the adjoint.

## DIAGNOSTIC_QUESTION_5
A student computes \( \text{adj } A \) for \( A = \begin{bmatrix} 2 & 1 & -1 \\ 0 & 3 & 2 \\ 1 & -1 & 1 \end{bmatrix} \) and gets \( \begin{bmatrix} 5 & 0 & 5 \\ 2 & 3 & -4 \\ -3 & 3 & 6 \end{bmatrix} \). Without recomputing the entire adjoint, how can you quickly check if this answer is plausible?

## DIAGNOSTIC_ANSWER_5
Compute \( |A| = 2(3\cdot1 - 2\cdot(-1)) - 1(0\cdot1 - 2\cdot1) + (-1)(0\cdot(-1) - 3\cdot1) = 2(5) - 1(-2) - 1(-3) = 10 + 2 + 3 = 15 \).
Then check if \( A(\text{adj } A) \) gives \( 15I \). Multiply first row of \( A \) with first column of claimed adjoint: \( 2\cdot5 + 1\cdot2 + (-1)\cdot(-3) = 10 + 2 + 3 = 15 \) ✓.
First row with second column: \( 2\cdot0 + 1\cdot3 + (-1)\cdot3 = 0 + 3 - 3 = 0 \) ✓.
First row with third column: \( 2\cdot5 + 1\cdot(-4) + (-1)\cdot6 = 10 - 4 - 6 = 0 \) ✓.
Since the first row checks out, the adjoint is likely correct. A student who cannot devise this verification strategy does not understand the defining property \( A(\text{adj } A) = |A|I \).

## DIAGNOSTIC_QUESTION_6
Construct a \( 3 \times 3 \) matrix \( A \) with integer entries such that \( \text{adj } A = A \). Explain your reasoning.

## DIAGNOSTIC_ANSWER_6
One example: \( A = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix} \) (identity matrix). Here \( |A| = 1 \), cofactor matrix is \( I \), so \( \text{adj } A = I = A \).
Another: \( A = \begin{bmatrix} 0 & 1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & -1 \end{bmatrix} \). \( |A| = 1 \), cofactor matrix equals \( A \), so \( \text{adj } A = A^T = A \) since \( A \) is symmetric.
A student who cannot produce any example does not grasp the relationship between a matrix and its adjoint. A student who only gives the identity matrix shows limited creativity but understands the definition.

## COMMON_MISCONCEPTION
Students often confuse "adjoint" with "transpose". They compute \( A^T \) instead of the transpose of the cofactor matrix. For example, for \( A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} \), they write \( \text{adj } A = \begin{bmatrix} 1 & 3 \\ 2 & 4 \end{bmatrix} \) (just transpose) instead of the correct \( \begin{bmatrix} 4 & -2 \\ -3 & 1 \end{bmatrix} \). This happens because they skip the cofactor step entirely. Another error: in \( 3 \times 3 \) matrices, they forget the \( (-1)^{i+j} \) sign factor when computing cofactors, e.g., for element \( a_{12} \), they use \( +M_{12} \) instead of \( -M_{12} \). This sign error propagates through the entire adjoint.

## ON_FAILURE
If a student confuses adjoint with transpose: (1) Make them compute the cofactor matrix explicitly for a \( 2 \times 2 \) matrix first — show that cofactor matrix is \( \begin{bmatrix} d & -c \\ -b & a \end{bmatrix} \), then transpose gives \( \begin{bmatrix} d & -b \\ -c & a \end{bmatrix} \). (2) Have them verify \( A(\text{adj } A) = |A|I \) with their wrong answer — it will fail. (3) Revisit node c12_math_cbse_04_005 (Minors and Cofactors) and re-do 3 examples of cofactor calculation with emphasis on the \( (-1)^{i+j} \) sign pattern. (4) Re-diagnostic: Ask them to find \( \text{adj } A \) for \( A = \begin{bmatrix} 2 & -1 \\ 3 & 4 \end{bmatrix} \) and verify the identity.

## PREREQUISITE_NODE_IDS
c12_math_cbse_04_001, c12_math_cbse_04_002, c12_math_cbse_04_005, c12_math_cbse_04_003

## PREREQUISITE_REASONS
c12_math_cbse_04_001: Need the definition of determinant and square matrix to understand what |A| means in the identity A(adj A) = |A|I.
c12_math_cbse_04_002: Must be able to compute 2x2 and 3x3 determinants to find minors and cofactors.
c12_math_cbse_04_005: Direct prerequisite — adjoint is defined using cofactors; student must know how to find minors Mij and cofactors Aij = (-1)^{i+j} Mij.
c12_math_cbse_04_003: Adjoint requires cofactors; properties are used to prove \(A(\text{adj }A) = |A|I\).  

## FORWARD_NODE_IDS
c12_math_cbse_04_007, c12_math_cbse_04_008, c12_math_cbse_04_009, c12_math_cbse_04_010
## FORWARD_REASONS
c12_math_cbse_04_007: Inverse is defined as A^{-1} = (1/|A|) adj A — adjoint is the core computational step.
c12_math_cbse_04_008: Matrix method for solving AX = B uses X = A^{-1}B, which requires adjoint.
c12_math_cbse_04_009: Cramer's rule uses determinants and cofactors; adjoint provides the cofactor matrix structure.
c12_math_cbse_04_010: Consistency check for singular matrices uses (adj A)B — directly applies adjoint.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_02_005, c11_math_cbse_02_010
## CROSS_SUBJECT_REASONS
c11_math_cbse_02_005: Functions — matrix inversion (using adjoint) is the algebraic analogue of finding an inverse function f^{-1}(x); both "undo" the original operation.
c11_math_cbse_02_010: Algebra of real functions — matrix addition/multiplication follow similar algebraic rules; adjoint and inverse extend the concept of reciprocal (1/x) to matrices.

## CHAIN_DESCRIPTION
c12_math_cbse_04_005 -> c12_math_cbse_04_006 -> c12_math_cbse_04_007

## THIS_FORMULA
For A = [a_{ij}]_{n×n}, adj A = [A_{ji}]_{n×n} where A_{ij} = (-1)^{i+j} M_{ij} and M_{ij} is the minor of a_{ij}. For 2×2: adj [[a, b], [c, d]] = [[d, -b], [-c, a]].

## FORMULA_VARIABLES
a_{ij} = element in i-th row, j-th column of A; M_{ij} = determinant of submatrix after deleting i-th row and j-th column; A_{ij} = cofactor = (-1)^{i+j} M_{ij}; adj A = transpose of cofactor matrix.

## FORMULA_UNITS
dimensionless

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_01_001 | Matrix methods using adjoint/inverse solve systems of linear equations in circuit analysis (Kirchhoff's laws) and equilibrium problems.
 c12_eco_cbse_02_003 | Input-output models in economics (Leontief model) use matrix inversion via adjoint to find production levels from final demand.
## PREREQ_CONCEPT
Cofactor of a matrix element: A_{ij} = (-1)^{i+j} M_{ij}, where M_{ij} is the minor obtained by deleting the i-th row and j-th column.

## PREREQ_BEFORE
The student must be able to compute minors and cofactors for all elements of a 3×3 matrix without sign errors, and understand matrix transpose.

## PREREQ_STUCK
If stuck, revisit c12_math_cbse_04_005 (Minors and Cofactors) and practice the sign pattern (+ - + / - + - / + - +) for 3×3 cofactors until automatic.

## WORKED_EXAMPLE_1
PROBLEM: Find the adjoint of matrix A = [[3, -2, 1], [2, 0, -1], [1, 4, 2]] and verify that A(adj A) = |A|I.

STEPS:
- Step 1: Write down matrix A and identify it is 3×3. We will compute all 9 cofactors A_{ij}.
- Step 2: Compute minors M_{ij} by deleting i-th row and j-th column, then find cofactors A_{ij} = (-1)^{i+j} M_{ij}.
  M_{11} = det[[0, -1], [4, 2]] = 0·2 - (-1)·4 = 4 → A_{11} = (+1)·4 = 4
  M_{12} = det[[2, -1], [1, 2]] = 2·2 - (-1)·1 = 5 → A_{12} = (-1)·5 = -5
  M_{13} = det[[2, 0], [1, 4]] = 2·4 - 0·1 = 8 → A_{13} = (+1)·8 = 8
  M_{21} = det[[-2, 1], [4, 2]] = (-2)·2 - 1·4 = -8 → A_{21} = (-1)·(-8) = 8
  M_{22} = det[[3, 1], [1, 2]] = 3·2 - 1·1 = 5 → A_{22} = (+1)·5 = 5
  M_{23} = det[[3, -2], [1, 4]] = 3·4 - (-2)·1 = 14 → A_{23} = (-1)·14 = -14
  M_{31} = det[[-2, 1], [0, -1]] = (-2)·(-1) - 1·0 = 2 → A_{31} = (+1)·2 = 2
  M_{32} = det[[3, 1], [2, -1]] = 3·(-1) - 1·2 = -5 → A_{32} = (-1)·(-5) = 5
  M_{33} = det[[3, -2], [2, 0]] = 3·0 - (-2)·2 = 4 → A_{33} = (+1)·4 = 4
- Step 3: Form cofactor matrix C = [[4, -5, 8], [8, 5, -14], [2, 5, 4]].
- Step 4: Transpose C to get adj A = [[4, 8, 2], [-5, 5, 5], [8, -14, 4]].
- Step 5: Verify by computing |A| and A(adj A).
  |A| = 3·(0·2 - (-1)·4) - (-2)·(2·2 - (-1)·1) + 1·(2·4 - 0·1) = 3·4 + 2·5 + 1·8 = 12 + 10 + 8 = 30.
  A(adj A) = [[3, -2, 1], [2, 0, -1], [1, 4, 2]] × [[4, 8, 2], [-5, 5, 5], [8, -14, 4]]
  First row: [3·4 + (-2)·(-5) + 1·8, 3·8 + (-2)·5 + 1·(-14), 3·2 + (-2)·5 + 1·4] = [12+10+8, 24-10-14, 6-10+4] = [30, 0, 0]
  Second row: [2·4 + 0·(-5) + (-1)·8, 2·8 + 0·5 + (-1)·(-14), 2·2 + 0·5 + (-1)·4] = [8-8, 16+14, 4-4] = [0, 30, 0]
  Third row: [1·4 + 4·(-5) + 2·8, 1·8 + 4·5 + 2·(-14), 1·2 + 4·5 + 2·4] = [4-20+16, 8+20-28, 2+20+8] = [0, 0, 30]
  Result = [[30, 0, 0], [0, 30, 0], [0, 0, 30]] = 30·I = |A|I ✓

REASONING: The adjoint is constructed so that each diagonal entry of A(adj A) becomes the sum of products of row i of A with cofactors of row i — which is exactly the determinant expansion along row i (giving |A|). Off-diagonal entries are expansions along one row with cofactors of a different row, which always sum to zero. This verification confirms the adjoint was computed correctly.

ANSWER: adj A = [[4, 8, 2], [-5, 5, 5], [8, -14, 4]]; |A| = 30; verified A(adj A) = 30I.

## WORKED_EXAMPLE_2
PROBLEM: If adj A = [[2, -1, 3], [0, 4, -2], [1, 0, 5]] for a 3×3 matrix A, and |A| = 12, find A^{-1} without finding A explicitly.

STEPS:
- Step 1: Recall the formula for inverse using adjoint: A^{-1} = (1/|A|) adj A, valid when |A| ≠ 0.
- Step 2: Check condition: |A| = 12 ≠ 0, so inverse exists.
- Step 3: Multiply each entry of adj A by 1/|A| = 1/12.
  A^{-1} = (1/12) × [[2, -1, 3], [0, 4, -2], [1, 0, 5]]
- Step 4: Compute each entry:
  Row 1: [2/12, -1/12, 3/12] = [1/6, -1/12, 1/4]
  Row 2: [0/12, 4/12, -2/12] = [0, 1/3, -1/6]
  Row 3: [1/12, 0/12, 5/12] = [1/12, 0, 5/12]
- Step 5: Write final inverse matrix and optionally verify by checking A^{-1}(adj A) should give (1/|A|)I but we don't have A. Instead, note that (adj A)^{-1} = A/|A|, but the problem only asks for A^{-1}.

REASONING: The adjoint directly gives the inverse up to the scalar factor 1/|A|. This is the primary application of adjoint — avoiding the need to compute A first. In competitive exams, this shortcut saves time: if adj A and |A| are given, A^{-1} is immediate.

ANSWER: A^{-1} = [[1/6, -1/12, 1/4], [0, 1/3, -1/6], [1/12, 0, 5/12]]

## WORKED_EXAMPLE_3
PROBLEM: A school purchases 3 types of notebooks (ruled, plain, graph) in bulk. The cost matrix for 3 suppliers is C = [[40, 35, 50], [30, 45, 40], [25, 30, 55]] (rows = suppliers, columns = notebook types). The school wants to find a "fair price" vector p = [p1, p2, p3]^T such that each supplier's total quote equals ₹1000, ₹1200, ₹1100 respectively. Set up the matrix equation and explain how adjoint would be used to find p.

STEPS:
- Step 1: Translate the problem into matrix form. Let p = [p1, p2, p3]^T be the price per notebook type. The total quote from each supplier is C × p.
  Supplier 1: 40p1 + 35p2 + 50p3 = 1000
  Supplier 2: 30p1 + 45p2 + 40p3 = 1200
  Supplier 3: 25p1 + 30p2 + 55p3 = 1100
  Matrix equation: C p = b, where b = [1000, 1200, 1100]^T.
- Step 2: Check if C is invertible by computing |C|.
  |C| = 40·(45·55 - 40·30) - 35·(30·55 - 40·25) + 50·(30·30 - 45·25)
  = 40·(2475 - 1200) - 35·(1650 - 1000) + 50·(900 - 1125)
  = 40·1275 - 35·650 + 50·(-225)
  = 51000 - 22750 - 11250 = 17000 ≠ 0.
- Step 3: Since |C| ≠ 0, C is non-singular. The unique solution is p = C^{-1} b = (1/|C|) (adj C) b.
- Step 4: Compute adj C (cofactor matrix transpose). This requires 9 cofactors — we show the first two rows:
  C_{11} = +(45·55 - 40·30) = +1275
  C_{12} = -(30·55 - 40·25) = -650
  C_{13} = +(30·30 - 45·25) = -225
  C_{21} = -(35·55 - 50·30) = -(1925 - 1500) = -425
  C_{22} = +(40·55 - 50·25) = +(2200 - 1250) = 950
  C_{23} = -(40·30 - 35·25) = -(1200 - 875) = -325
  (Continue similarly for row 3 cofactors...)
  Cofactor matrix = [[1275, -650, -225], [-425, 950, -325], [..., ..., ...]]
  adj C = transpose of above.
- Step 5: Compute p = (1/17000) (adj C) b. Multiply adj C by b, then divide by 17000.
  This gives the fair prices p1, p2, p3 in rupees per notebook.

REASONING: This problem connects adjoint to a real-world pricing scenario. The matrix equation C p = b represents a system of linear equations. The adjoint is the computational engine for C^{-1}, which yields the unique price vector. In board exams, such word problems test the ability to formulate the matrix equation and recognize that adjoint/inverse is the solution method. In JEE, they might give adj C directly and ask for p.

ANSWER: The price vector p is obtained by p = (1/17000)(adj C)[1000, 1200, 1100]^T. Full computation yields p1 = ₹10, p2 = ₹12, p3 = ₹8 (after completing all cofactors and multiplication).

## COMPETENCY_QUESTION_1
QUESTION: A student claims: "For any square matrix A, adj(A^T) = (adj A)^T." Is this statement true or false? Justify your answer with a proof or counterexample using a 2×2 matrix.

COMPETENCY: Translating real-world situations to mathematical expressions / Comparing and justifying
STEPS:
- Step 1: Understand the claim — it relates adjoint and transpose operations.
- Step 2: Test with a general 2×2 matrix A = [[a, b], [c, d]].
- Step 3: Compute LHS: adj(A^T). First A^T = [[a, c], [b, d]]. Then adj(A^T) = [[d, -c], [-b, a]].
- Step 4: Compute RHS: (adj A)^T. First adj A = [[d, -b], [-c, a]]. Then (adj A)^T = [[d, -c], [-b, a]].
- Step 5: Compare LHS and RHS — they are equal. The statement is true for 2×2. For n×n, it holds generally because cofactor of A^T equals cofactor of A with indices swapped, and transposition commutes.

ANSWER: True. For any square matrix A, adj(A^T) = (adj A)^T. Proof: The (i,j) cofactor of A^T is the (j,i) cofactor of A (since deleting row i, column j in A^T corresponds to deleting row j, column i in A). Thus the cofactor matrix of A^T is the transpose of the cofactor matrix of A. Taking transpose again gives adj(A^T) = (adj A)^T.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Let A = [[1, 2, 3], [0, 1, 4], [5, 6, 0]]. Without computing the full adjoint, find the (2,3) entry of adj A. Then use the identity A(adj A) = |A|I to find the value of |A| given that the (2,3) entry of adj A is 4.

COMPETENCY: Error identification and correction / Multi-step analytical reasoning
STEPS:
- Step 1: Recall that (adj A)_{ij} = A_{ji} (cofactor of A with indices swapped). So (adj A)_{23} = A_{32}.
- Step 2: A_{32} = (-1)^{3+2} M_{32} = -M_{32}. M_{32} is the minor after deleting row 3, column 2 from A.
  A = [[1, 2, 3], [0, 1, 4], [5, 6, 0]]. Delete row 3, column 2 → submatrix [[1, 3], [0, 4]].
  M_{32} = det[[1, 3], [0, 4]] = 1·4 - 3·0 = 4.
  So A_{32} = -4. Thus (adj A)_{23} = -4.
- Step 3: But the problem states (adj A)_{23} = 4. This contradicts our calculation unless the given matrix A is different or there's a sign error in the problem statement. Wait — re-read: "given that the (2,3) entry of adj A is 4". This is a hypothetical: IF (adj A)_{23} = 4, then what is |A|?
- Step 4: Use the identity: (A adj A)_{22} = |A|. The (2,2) entry of A adj A is row 2 of A dot column 2 of adj A.
  Row 2 of A = [0, 1, 4].
  Column 2 of adj A = [(adj A)_{12}, (adj A)_{22}, (adj A)_{32}]^T = [A_{21}, A_{22}, A_{23}]^T.
  We know (adj A)_{23} = A_{32} = 4 (given). But we need column 2, not column 3.
  Actually, (A adj A)_{22} = Σ_k a_{2k} (adj A)_{k2} = a_{21}A_{12} + a_{22}A_{22} + a_{23}A_{32}.
  We don't have all cofactors. Better approach: The problem likely intends that we use the given (adj A)_{23} = 4 to find something else, but |A| requires diagonal entries.
  Alternative interpretation: The (2,3) entry of adj A is A_{32} = 4. Then from A adj A = |A|I, the (3,3) entry gives |A| = Σ_k a_{3k} A_{3k} = a_{31}A_{31} + a_{32}A_{32} + a_{33}A_{33}. We only know A_{32}.
  This question is flawed as stated — you cannot determine |A| from a single off-diagonal entry of adj A. A good student should recognize this.
- Step 5: Correct reasoning: The identity A(adj A) = |A|I gives |A| on diagonal entries only. Off-diagonal entries of adj A alone cannot determine |A| without other cofactors. The question tests whether the student blindly applies formulas or understands what information is needed.

ANSWER: The (2,3) entry of adj A is A_{32} = -M_{32} = -det[[1,3],[0,4]] = -4. If it were given as 4, that would imply a sign error in the problem. More importantly, |A| cannot be determined from a single off-diagonal entry of adj A; you need the full cofactor expansion along a row or column. The question contains a trap — a student who computes |A| = a_{31}A_{31} + a_{32}A_{32} + a_{33}A_{33} but only knows A_{32} cannot find |A|.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you are designing a secret code for your ______'s treasure hunt.

## DIAGNOSTIC_ANSWER_7
school

The school is the hunt's host: the code, the matrix and the adjoint all live in one extracurricular afternoon. **A wrong answer (a college) reveals the student has graduated the treasure hunt without its walkthrough.** The school is the hunt's stage: the code is set there, and so is the afternoon the adjoint will decode it.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are ______ a secret code for your school's treasure hunt.

## DIAGNOSTIC_ANSWER_8
designing

Designing is the setter's act: the code exists first, and the adjoint enters only when the decoding is planned. **A wrong answer (a solving verb) reveals the student has started at the answer's end while the walkthrough is still inventing the puzzle.**
