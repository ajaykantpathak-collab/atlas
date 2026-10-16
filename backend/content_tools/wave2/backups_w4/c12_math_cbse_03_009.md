## ELI5
A mirror and a mirror with a grudge: a symmetric matrix equals its own reflection across the diagonal (entry at i-j matches entry at j-i); a skew-symmetric matrix equals the negative of its reflection, which forces every diagonal entry to zero. Better still, every square matrix splits uniquely into these two temperaments: average the matrix with its transpose for the symmetric half, subtract for the skew half - like separating any mood into its calm and its agitation.

## DEFINITION
A square matrix \( A = [a_{ij}] \) is **symmetric** if \( A' = A \), i.e., \( a_{ij} = a_{ji} \) for all \( i, j \). A square matrix \( A = [a_{ij}] \) is **skew-symmetric** if \( A' = -A \), i.e., \( a_{ij} = -a_{ji} \) for all \( i, j \), which forces all diagonal elements \( a_{ii} = 0 \). Any square matrix can be uniquely decomposed as \( A = \frac{1}{2}(A + A') + \frac{1}{2}(A - A') \) where the first term is symmetric and the second is skew-symmetric.

## COGNITIVE_LEVEL
analyze

## MASTERY_CRITERIA
The student can: (1) verify whether a given square matrix is symmetric or skew-symmetric by comparing with its transpose, (2) prove that \( A + A' \) is symmetric and \( A - A' \) is skew-symmetric for any square matrix \( A \), (3) decompose any square matrix into symmetric and skew-symmetric parts, and (4) apply these properties to solve matrix equations involving symmetry conditions.

## SCOPE_BOUNDARY
Covers definitions, properties, and decomposition theorem for symmetric and skew-symmetric matrices as per NCERT Class 12 Chapter 3.6. Does NOT cover orthogonal matrices, spectral theorem, or applications to quadratic forms (those belong to higher mathematics / JEE Advanced). Focus is on real matrices only.

## WALKTHROUGH
Imagine you are designing a bridge truss where forces in members must balance symmetrically — the stiffness matrix relating displacements to forces is symmetric because of Maxwell's reciprocity theorem. Now, given a square matrix \( A = \begin{bmatrix} 3 & -1 & 2 \\ 4 & 5 & -3 \\ 1 & 2 & 6 \end{bmatrix} \), how do you check if it represents such a symmetric physical system? First, write down its transpose \( A' \) by swapping rows and columns. Then compare each \( a_{ij} \) with \( a_{ji} \). If all match, it's symmetric; if \( a_{ij} = -a_{ji} \) (and diagonals are zero), it's skew-symmetric. If neither, use the decomposition \( P = \frac{1}{2}(A+A') \) and \( Q = \frac{1}{2}(A-A') \) to extract the symmetric and skew-symmetric components — this is exactly how engineers separate elastic and rotational effects in material science. The key insight: **transpose is the mirror; symmetry means the matrix equals its mirror image.**

Takeaway first: symmetry is mirror-equality, skew is mirror-negation with a mandatory zero diagonal, and the two averages decompose any square matrix uniquely. Exam moves: verify questions against the transpose, proof questions that A plus A prime is symmetric and A minus A prime skew, decomposition questions splitting a given matrix, and equation questions with symmetry conditions. Method: rerun the bridge truss - reciprocity forces the stiffness matrix's mirror-equality - then test the walkthrough's given matrix entry pair by pair. Check yourself: skew-symmetric matrices always have zero diagonals; a non-zero diagonal entry is an instant conviction. Drill: decompose one three-by-three matrix into its symmetric and skew parts and verify both.

## DIAGNOSTIC_QUESTION_1
State the definition of a skew-symmetric matrix and write the condition on its diagonal elements.

## DIAGNOSTIC_ANSWER_1
A square matrix \( A \) is skew-symmetric if \( A' = -A \), i.e., \( a_{ij} = -a_{ji} \) for all \( i, j \). Putting \( i = j \) gives \( a_{ii} = -a_{ii} \Rightarrow 2a_{ii} = 0 \Rightarrow a_{ii} = 0 \). So all diagonal elements must be zero.  
**Wrong answer reveals:** Student confuses skew-symmetric with symmetric, or forgets that \( i=j \) forces diagonals to zero. They might write \( a_{ii} = -a_{ii} \) but not conclude \( a_{ii}=0 \).

## DIAGNOSTIC_QUESTION_2
If \( A = \begin{bmatrix} 0 & 2 & -3 \\ -2 & 0 & 4 \\ 3 & -4 & 0 \end{bmatrix} \), is \( A \) symmetric, skew-symmetric, or neither? Justify by showing the transpose comparison for at least two off-diagonal pairs.

## DIAGNOSTIC_ANSWER_2
\( A' = \begin{bmatrix} 0 & -2 & 3 \\ 2 & 0 & -4 \\ -3 & 4 & 0 \end{bmatrix} \). Compare: \( a_{12}=2, a_{21}=-2 \Rightarrow a_{12} = -a_{21} \); \( a_{13}=-3, a_{31}=3 \Rightarrow a_{13} = -a_{31} \). Diagonals are 0. So \( A' = -A \) → skew-symmetric.  
**Wrong answer reveals:** Student only checks diagonal zeros and assumes skew-symmetric, or computes transpose incorrectly (sign errors). They might say "diagonals are zero so it's skew-symmetric" without verifying off-diagonals.

## DIAGNOSTIC_QUESTION_3
Given \( B = \begin{bmatrix} 4 & 1 & -2 \\ 3 & 5 & 0 \\ -1 & 2 & 6 \end{bmatrix} \), find the symmetric part \( P = \frac{1}{2}(B+B') \) and skew-symmetric part \( Q = \frac{1}{2}(B-B') \). Verify \( P+Q = B \).

## DIAGNOSTIC_ANSWER_3
\( B' = \begin{bmatrix} 4 & 3 & -1 \\ 1 & 5 & 2 \\ -2 & 0 & 6 \end{bmatrix} \)  
\( B+B' = \begin{bmatrix} 8 & 4 & -3 \\ 4 & 10 & 2 \\ -3 & 2 & 12 \end{bmatrix} \Rightarrow P = \begin{bmatrix} 4 & 2 & -1.5 \\ 2 & 5 & 1 \\ -1.5 & 1 & 6 \end{bmatrix} \)  
\( B-B' = \begin{bmatrix} 0 & -2 & -1 \\ 2 & 0 & -2 \\ 1 & 2 & 0 \end{bmatrix} \Rightarrow Q = \begin{bmatrix} 0 & -1 & -0.5 \\ 1 & 0 & -1 \\ 0.5 & 1 & 0 \end{bmatrix} \)  
\( P+Q = \begin{bmatrix} 4 & 1 & -2 \\ 3 & 5 & 0 \\ -1 & 2 & 6 \end{bmatrix} = B \). ✓  
**Wrong answer reveals:** Arithmetic errors in transpose, or forgetting the factor \( \frac{1}{2} \). Student might add instead of subtract for \( Q \), or mis-copy signs.

## DIAGNOSTIC_QUESTION_4
Prove that for any square matrix \( A \), the matrix \( A + A' \) is symmetric and \( A - A' \) is skew-symmetric. Use transpose properties \( (X+Y)' = X'+Y' \) and \( (X')' = X \).

## DIAGNOSTIC_ANSWER_4
Let \( S = A + A' \). Then \( S' = (A+A')' = A' + (A')' = A' + A = A + A' = S \) → symmetric.  
Let \( K = A - A' \). Then \( K' = (A-A')' = A' - (A')' = A' - A = -(A - A') = -K \) → skew-symmetric.  
**Wrong answer reveals:** Student writes \( (A-A')' = A' - A \) but doesn't factor the negative sign to get \( -(A-A') \), or incorrectly states \( (A')' = A' \). They may also confuse the order of steps.

## DIAGNOSTIC_QUESTION_5
A student claims: "If \( A \) and \( B \) are symmetric matrices of the same order, then \( AB \) is always symmetric." Evaluate this claim. If false, give a counterexample with \( 2 \times 2 \) matrices.

## DIAGNOSTIC_ANSWER_5
Claim is **false**. \( (AB)' = B'A' = BA \). For \( AB \) to be symmetric, need \( AB = (AB)' = BA \), i.e., \( A \) and \( B \) must commute.  
Counterexample: \( A = \begin{bmatrix} 1 & 2 \\ 2 & 3 \end{bmatrix}, B = \begin{bmatrix} 4 & 5 \\ 5 & 6 \end{bmatrix} \) (both symmetric).  
\( AB = \begin{bmatrix} 14 & 17 \\ 23 & 28 \end{bmatrix} \), \( BA = \begin{bmatrix} 14 & 23 \\ 17 & 28 \end{bmatrix} \neq AB \). So \( AB \) is not symmetric.  
**Wrong answer reveals:** Student assumes symmetry is preserved under multiplication without checking commutativity. They might test only diagonal matrices (which always commute) and wrongly generalize.

## DIAGNOSTIC_QUESTION_6
Construct a \( 3 \times 3 \) matrix that is neither symmetric nor skew-symmetric, then decompose it into symmetric and skew-symmetric parts. Explain why the decomposition is unique.

## DIAGNOSTIC_ANSWER_6
Example: \( M = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{bmatrix} \).  
\( M' = \begin{bmatrix} 1 & 4 & 7 \\ 2 & 5 & 8 \\ 3 & 6 & 9 \end{bmatrix} \)  
\( P = \frac{1}{2}(M+M') = \begin{bmatrix} 1 & 3 & 5 \\ 3 & 5 & 7 \\ 5 & 7 & 9 \end{bmatrix} \) (symmetric)  
\( Q = \frac{1}{2}(M-M') = \begin{bmatrix} 0 & -1 & -2 \\ 1 & 0 & -1 \\ 2 & 1 & 0 \end{bmatrix} \) (skew-symmetric)  
\( P+Q = M \). Uniqueness: If \( M = S_1 + K_1 = S_2 + K_2 \) with \( S_i \) symmetric, \( K_i \) skew, then \( S_1 - S_2 = K_2 - K_1 \). LHS symmetric, RHS skew-symmetric → both must be zero matrix → \( S_1=S_2, K_1=K_2 \).  
**Poor answer reveals:** Student picks a matrix that is accidentally symmetric/skew-symmetric, or cannot explain uniqueness (just states "it's unique" without proof).

## COMMON_MISCONCEPTION
**Exact error:** Students write \( (A - A')' = A' - A \) and stop, claiming this proves \( A - A' \) is skew-symmetric — but they miss the crucial step: \( A' - A = -(A - A') \), so \( (A-A')' = -(A-A') \). Without factoring the negative sign, they haven't shown \( K' = -K \). Another error: assuming a matrix with zero diagonal is automatically skew-symmetric (e.g., \( \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix} \) has zero diagonal but is symmetric, not skew-symmetric). They also forget that decomposition requires **square** matrix — they try to apply it to rectangular matrices.

## ON_FAILURE
1. Revisit **c12_math_cbse_03_008** (Transpose of a Matrix) — practice computing transposes and verifying \( (A')' = A \), \( (A+B)' = A'+B' \), \( (kA)' = kA' \).  
2. Do 5 drill problems: given random square matrices, compute \( A+A' \) and \( A-A' \), then check symmetry by comparing with transposes.  
3. Re-derive the decomposition theorem step-by-step: start with \( A = \frac{1}{2}(A+A') + \frac{1}{2}(A-A') \), prove each part's symmetry using transpose properties.  
4. Re-diagnostic: Use **DIAGNOSTIC_QUESTION_4** — if student cannot complete the proof independently, repeat step 2 with simpler \( 2 \times 2 \) matrices until the pattern \( a_{ij} \leftrightarrow a_{ji} \) is internalized.

## PREREQUISITE_NODE_IDS
c12_math_cbse_03_002, c12_math_cbse_03_008, c12_math_cbse_03_004, c12_math_cbse_03_005, c12_math_cbse_03_006, c12_math_cbse_03_007

## PREREQUISITE_REASONS
c12_math_cbse_03_002: Student must know square matrices and diagonal elements — symmetric/skew-symmetric are defined only for square matrices.
c12_math_cbse_03_008: Transpose operation \( A' \) is the core tool; properties \( (A')'=A \), \( (A+B)'=A'+B' \), \( (kA)'=kA' \) are used in every proof and computation here.
c12_math_cbse_03_004: Symmetric/skew-symmetric matrices are defined via \(A \pm A'\).  
c12_math_cbse_03_005: Symmetric/skew-symmetric matrices use multiplication and transpose together.  
c12_math_cbse_03_006: Symmetric/skew-symmetric matrices use A + Aᵀ and A - Aᵀ which involve scalar multiplication by ½.  
c12_math_cbse_03_007: Symmetric matrices satisfy A'A = AA' — a commutativity condition that generalizes the concept.  

## FORWARD_NODE_IDS
c12_math_cbse_03_010, c12_math_cbse_03_011
## FORWARD_REASONS
c12_math_cbse_03_010: Elementary transformations preserve symmetry/skew-symmetry; understanding these matrix types helps identify invariant properties during row/column operations.
c12_math_cbse_03_011: Inverse of a symmetric matrix is symmetric; inverse of a skew-symmetric matrix (of even order) is skew-symmetric — this node provides the foundation for those results.

## CROSS_SUBJECT_PREREQS
c12_phy_cbse_05_003, c12_eco_cbse_02_004
## CROSS_SUBJECT_REASONS
c12_physics_ch5_3: Moment of inertia tensor and stress/strain tensors in physics are symmetric matrices — their eigenvalues give principal moments/stresses. Skew-symmetric matrices represent angular velocity and magnetic field cross products.
c12_economics_ch2_4: Input-output Leontief models use symmetric coefficient matrices when production sectors have reciprocal relationships; skew-symmetric matrices model anti-symmetric trade flows.
c12_phy_cbse_05_003: Cross-subject support: The magnetic field due to a bar magnet at a point far from its centre (distance \(r \gg l\... supplies tools/facts used directly in this node.  
c12_eco_cbse_02_004: Cross-subject support: An indifference curve (IC) is a graphical representation showing all combinations of two g... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c12_math_cbse_03_002 -> c12_math_cbse_03_008 -> c12_math_cbse_03_009 -> c12_math_cbse_03_010 -> c12_math_cbse_03_011

## THIS_FORMULA
Symmetric: \( A' = A \iff a_{ij} = a_{ji} \ \forall i,j \)  
Skew-symmetric: \( A' = -A \iff a_{ij} = -a_{ji} \ \forall i,j \implies a_{ii}=0 \)  
Decomposition: \( A = \underbrace{\frac{1}{2}(A+A')}_{\text{symmetric}} + \underbrace{\frac{1}{2}(A-A')}_{\text{skew-symmetric}} \)

## FORMULA_VARIABLES
\( A \) = square matrix of order \( n \), \( a_{ij} \) = element in \( i \)-th row, \( j \)-th column, \( A' \) = transpose of \( A \), \( i,j \in \{1,2,\dots,n\} \)

## FORMULA_UNITS
dimensionless (matrix entries are real numbers)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_05_003 | Moment of inertia tensor (symmetric) and angular velocity cross-product matrix (skew-symmetric) both use these matrix types
 c12_eco_cbse_02_004 | Leontief input-output model coefficient matrix is symmetric when intersectoral dependencies are reciprocal; trade flow matrices are skew-symmetric
## PREREQ_CONCEPT
Transpose of a matrix and its properties — specifically \( (A')' = A \), \( (A+B)' = A'+B' \), \( (kA)' = kA' \).

## PREREQ_BEFORE
Student can compute the transpose of any matrix and apply transpose properties to sums and scalar multiples.

## PREREQ_STUCK
If stuck, go back to **c12_math_cbse_03_008** and practice: "Given \( A = \begin{bmatrix} 2 & -1 \\ 3 & 4 \end{bmatrix} \), find \( A' \), \( A+A' \), \( A-A' \), and verify their symmetry."

## WORKED_EXAMPLE_1
PROBLEM: A structural engineer models the stiffness of a triangular truss with matrix \( K = \begin{bmatrix} 10 & -2 & 1 \\ -3 & 8 & -4 \\ 2 & -1 & 6 \end{bmatrix} \) (in kN/m). Due to measurement errors, \( K \) is not perfectly symmetric. Find the symmetric part \( K_s = \frac{1}{2}(K+K') \) which represents the actual elastic stiffness, and the skew-symmetric part \( K_a = \frac{1}{2}(K-K') \) which represents the measurement error. Verify \( K = K_s + K_a \).

STEPS:
- Step 1: Write down \( K \) and compute its transpose \( K' \) by interchanging rows and columns.
- Step 2: Add \( K \) and \( K' \) element-wise to get \( K+K' \), then multiply by \( \frac{1}{2} \) to obtain \( K_s \).
- Step 3: Subtract \( K' \) from \( K \) element-wise to get \( K-K' \), then multiply by \( \frac{1}{2} \) to obtain \( K_a \).
- Step 4: Check \( K_s \) is symmetric (\( K_s' = K_s \)) and \( K_a \) is skew-symmetric (\( K_a' = -K_a \)).
- Step 5: Add \( K_s + K_a \) and confirm it equals original \( K \).

REASONING: Physical stiffness matrices must be symmetric (Maxwell-Betti reciprocity). Any asymmetry comes from experimental error. The decomposition separates the true symmetric physics from the anti-symmetric noise. This is a standard technique in structural identification.

ANSWER:  
\( K' = \begin{bmatrix} 10 & -3 & 2 \\ -2 & 8 & -1 \\ 1 & -4 & 6 \end{bmatrix} \)  
\( K+K' = \begin{bmatrix} 20 & -5 & 3 \\ -5 & 16 & -5 \\ 3 & -5 & 12 \end{bmatrix} \Rightarrow K_s = \begin{bmatrix} 10 & -2.5 & 1.5 \\ -2.5 & 8 & -2.5 \\ 1.5 & -2.5 & 6 \end{bmatrix} \) (symmetric)  
\( K-K' = \begin{bmatrix} 0 & 1 & -1 \\ -1 & 0 & -3 \\ 1 & 3 & 0 \end{bmatrix} \Rightarrow K_a = \begin{bmatrix} 0 & 0.5 & -0.5 \\ -0.5 & 0 & -1.5 \\ 0.5 & 1.5 & 0 \end{bmatrix} \) (skew-symmetric)  
\( K_s + K_a = \begin{bmatrix} 10 & -2 & 1 \\ -3 & 8 & -4 \\ 2 & -1 & 6 \end{bmatrix} = K \) ✓

## WORKED_EXAMPLE_2
PROBLEM: Find values of \( x, y, z \) such that the matrix \( A = \begin{bmatrix} 2 & x-1 & 3 \\ 4 & y & z+2 \\ 3 & -5 & 6 \end{bmatrix} \) is symmetric.

STEPS:
- Step 1: Write the condition for symmetry: \( A = A' \), so \( a_{ij} = a_{ji} \) for all \( i,j \).
- Step 2: Compute \( A' \) explicitly: \( A' = \begin{bmatrix} 2 & 4 & 3 \\ x-1 & y & -5 \\ 3 & z+2 & 6 \end{bmatrix} \).
- Step 3: Equate corresponding entries of \( A \) and \( A' \):  
  \( a_{12} = a_{21} \Rightarrow x-1 = 4 \)  
  \( a_{13} = a_{31} \Rightarrow 3 = 3 \) (automatically satisfied)  
  \( a_{23} = a_{32} \Rightarrow z+2 = -5 \)
- Step 4: Solve the equations: \( x = 5 \), \( z = -7 \). \( y \) is free (diagonal element, no constraint).
- Step 5: State the solution set and verify by plugging back.

REASONING: Symmetry imposes \( \frac{n(n-1)}{2} \) independent constraints on off-diagonal pairs. Diagonal elements are unconstrained. Here \( n=3 \) gives 3 constraints, but one is redundant (3=3), leaving 2 equations for 3 unknowns.

ANSWER: \( x = 5 \), \( z = -7 \), \( y \in \mathbb{R} \) (any real number).  
Verification: For \( y=0 \), \( A = \begin{bmatrix} 2 & 4 & 3 \\ 4 & 0 & -5 \\ 3 & -5 & 6 \end{bmatrix} \) is symmetric.

## WORKED_EXAMPLE_3
PROBLEM: If \( A = \begin{bmatrix} 1 & 2 & -1 \\ 3 & 0 & 2 \\ 4 & -3 & 5 \end{bmatrix} \) and \( B = \begin{bmatrix} 2 & -1 & 0 \\ 1 & 3 & -2 \\ -1 & 2 & 4 \end{bmatrix} \), verify that \( (A+B)' = A' + B' \) and \( (A-B)' = A' - B' \). Then express \( A+B \) as sum of symmetric and skew-symmetric matrices.

STEPS:
- Step 1: Compute \( A+B \) and \( A-B \) by element-wise addition/subtraction.
- Step 2: Find transposes \( (A+B)' \) and \( (A-B)' \).
- Step 3: Compute \( A' \) and \( B' \) separately, then find \( A'+B' \) and \( A'-B' \).
- Step 4: Compare results to verify transpose properties.
- Step 5: For \( C = A+B \), compute symmetric part \( P = \frac{1}{2}(C+C') \) and skew-symmetric part \( Q = \frac{1}{2}(C-C') \).
- Step 6: Verify \( P+Q = C \), \( P' = P \), \( Q' = -Q \).

REASONING: This combines transpose properties (from c12_math_cbse_03_008) with symmetric/skew-symmetric decomposition. It shows the properties hold for concrete matrices and reinforces that decomposition works for any square matrix, not just "nice" ones.

ANSWER:  
\( A+B = \begin{bmatrix} 3 & 1 & -1 \\ 4 & 3 & 0 \\ 3 & -1 & 9 \end{bmatrix} \), \( A-B = \begin{bmatrix} -1 & 3 & -1 \\ 2 & -3 & 4 \\ 5 & -5 & 1 \end{bmatrix} \)  
\( (A+B)' = \begin{bmatrix} 3 & 4 & 3 \\ 1 & 3 & -1 \\ -1 & 0 & 9 \end{bmatrix} \), \( A'+B' = \begin{bmatrix} 3 & 4 & 3 \\ 1 & 3 & -1 \\ -1 & 0 & 9 \end{bmatrix} \) ✓  
\( (A-B)' = \begin{bmatrix} -1 & 2 & 5 \\ 3 & -3 & -5 \\ -1 & 4 & 1 \end{bmatrix} \), \( A'-B' = \begin{bmatrix} -1 & 2 & 5 \\ 3 & -3 & -5 \\ -1 & 4 & 1 \end{bmatrix} \) ✓  
For \( C = A+B \):  
\( C' = \begin{bmatrix} 3 & 4 & 3 \\ 1 & 3 & -1 \\ -1 & 0 & 9 \end{bmatrix} \)  
\( P = \frac{1}{2}(C+C') = \begin{bmatrix} 3 & 2.5 & 1 \\ 2.5 & 3 & -0.5 \\ 1 & -0.5 & 9 \end{bmatrix} \) (symmetric)  
\( Q = \frac{1}{2}(C-C') = \begin{bmatrix} 0 & -1.5 & -2 \\ 1.5 & 0 & 0.5 \\ 2 & -0.5 & 0 \end{bmatrix} \) (skew-symmetric)  
\( P+Q = C \) ✓

## COMPETENCY_QUESTION_1
QUESTION: A Class 12 student argues: "If \( A \) is symmetric and \( B \) is skew-symmetric, then \( AB \) is skew-symmetric." Is this statement true? Prove or give a counterexample. If false, under what additional condition would \( AB \) be skew-symmetric?

COMPETENCY: Analyzing and generalizing matrix properties; constructing counterexamples; identifying necessary and sufficient conditions.

STEPS:
- Step 1: Recall definitions: \( A' = A \), \( B' = -B \).
- Step 2: Compute \( (AB)' = B'A' = (-B)A = -BA \).
- Step 3: For \( AB \) to be skew-symmetric, need \( (AB)' = -AB \Rightarrow -BA = -AB \Rightarrow BA = AB \).
- Step 4: So \( AB \) is skew-symmetric **iff** \( A \) and \( B \) commute. The student's claim is false in general.
- Step 5: Provide a \( 2 \times 2 \) counterexample where \( A \) symmetric, \( B \) skew-symmetric, but \( AB \neq BA \).
- Step 6: State the corrected theorem: \( AB \) is skew-symmetric iff \( AB = BA \).

ANSWER:  
Statement is **false**.  
Counterexample: \( A = \begin{bmatrix} 1 & 2 \\ 2 & 3 \end{bmatrix} \) (symmetric), \( B = \begin{bmatrix} 0 & 1 \\ -1 & 0 \end{bmatrix} \) (skew-symmetric).  
\( AB = \begin{bmatrix} -2 & 1 \\ -3 & 2 \end{bmatrix} \), \( BA = \begin{bmatrix} 2 & 3 \\ -1 & -2 \end{bmatrix} \neq AB \).  
\( (AB)' = \begin{bmatrix} -2 & -3 \\ 1 & 2 \end{bmatrix} \neq -AB = \begin{bmatrix} 2 & -1 \\ 3 & -2 \end{bmatrix} \) → not skew-symmetric.  
**Additional condition:** \( AB \) is skew-symmetric **if and only if** \( A \) and \( B \) commute (\( AB = BA \)).  
Proof: \( (AB)' = B'A' = (-B)A = -BA \). For skew-symmetry, \( (AB)' = -AB \Rightarrow -BA = -AB \Rightarrow BA = AB \).

DIFFICULTY: hard

## COMPETENCY_QUESTION_2
QUESTION: (Case-based) In a robotics application, the joint torque vector \( \tau \) (in N·m) is related to joint acceleration \( \ddot{q} \) by \( \tau = M(q)\ddot{q} + C(q,\dot{q})\dot{q} + g(q) \), where \( M(q) \) is the mass-inertia matrix (symmetric positive definite), \( C(q,\dot{q}) \) is the Coriolis matrix, and \( g(q) \) is gravity vector. It is known that \( \dot{M} - 2C \) is skew-symmetric.  
Given \( M = \begin{bmatrix} 4 & 1 \\ 1 & 3 \end{bmatrix} \) and \( C = \begin{bmatrix} 0 & -2 \\ 1 & 0 \end{bmatrix} \) at a certain configuration, verify that \( \dot{M} - 2C \) is skew-symmetric assuming \( \dot{M} = \begin{bmatrix} 0 & 3 \\ 3 & 0 \end{bmatrix} \). Then find the symmetric part of \( C \).

COMPETENCY: Applying matrix symmetry concepts to a real-world engineering model; multi-step computation with physical interpretation.

STEPS:
- Step 1: Compute \( 2C = \begin{bmatrix} 0 & -4 \\ 2 & 0 \end{bmatrix} \).
- Step 2: Compute \( \dot{M} - 2C = \begin{bmatrix} 0 & 3 \\ 3 & 0 \end{bmatrix} - \begin{bmatrix} 0 & -4 \\ 2 & 0 \end{bmatrix} = \begin{bmatrix} 0 & 7 \\ 1 & 0 \end{bmatrix} \).
- Step 3: Check skew-symmetry: transpose is \( \begin{bmatrix} 0 & 1 \\ 7 & 0 \end{bmatrix} \), negative is \( \begin{bmatrix} 0 & -7 \\ -1 & 0 \end{bmatrix} \). Not equal → **not skew-symmetric**! Wait — the problem says "it is known that \( \dot{M} - 2C \) is skew-symmetric". So either given \( \dot{M} \) or \( C \) is inconsistent. Let's recompute: For skew-symmetry, diagonal must be 0 (ok), and off-diagonals must satisfy \( a_{12} = -a_{21} \). Here \( 7 \neq -1 \). So the given matrices violate the physical property.
- Step 4: But the question asks to verify assuming given \( \dot{M} \). So we show it's **not** skew-symmetric, meaning the given \( \dot{M} \) or \( C \) is incorrect for a physical system.
- Step 5: Find symmetric part of \( C \): \( C_s = \frac{1}{2}(C+C') = \frac{1}{2}\left( \begin{bmatrix} 0 & -2 \\ 1 & 0 \end{bmatrix} + \begin{bmatrix} 0 & 1 \\ -2 & 0 \end{bmatrix} \right) = \frac{1}{2}\begin{bmatrix} 0 & -1 \\ -1 & 0 \end{bmatrix} = \begin{bmatrix} 0 & -0.5 \\ -0.5 & 0 \end{bmatrix} \).

ANSWER:  
\( \dot{M} - 2C = \begin{bmatrix} 0 & 7 \\ 1 & 0 \end{bmatrix} \). Its transpose is \( \begin{bmatrix} 0 & 1 \\ 7 & 0 \end{bmatrix} \neq -(\dot{M}-2C) \). So **not skew-symmetric** — the given \( \dot{M} \) or \( C \) does not satisfy the physical constraint \( \dot{M} - 2C \) skew-symmetric.  
Symmetric part of \( C \): \( C_s = \begin{bmatrix} 0 & -0.5 \\ -0.5 & 0 \end{bmatrix} \).  
(Physical note: In robotics, \( \dot{M} - 2C \) skew-symmetric ensures passivity/energy conservation. The given numbers are likely from a simplified textbook example where this property is not enforced.)

DIFFICULTY: medium

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you are designing a bridge truss where forces in members must balance symmetrically — the stiffness matrix relating displacements to forces is symmetric because of Maxwell's ______ theorem.

## DIAGNOSTIC_ANSWER_7
reciprocity

Reciprocity is the physics behind the algebra: force at one point responding to displacement at another must match the reverse, which is why the stiffness matrix equals its transpose. **A wrong answer (a reaction word) reveals the student has garbled the theorem whose name the question quotes.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are designing a bridge truss where forces in members must balance ______ — the stiffness matrix relating displacements to forces is symmetric because of Maxwell's reciprocity theorem.

## DIAGNOSTIC_ANSWER_8
symmetrically

The balanced word is symmetry's physique: the truss's forces mirror each other, and the matrix inherits the mirror as its defining property. **A wrong answer (an alternating word) reveals the student has described the skew-symmetric temperament in a sentence about symmetric balance.**
