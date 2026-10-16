## ELI5
Matrices come in breeds named by shape and habit. One row, one column, square when rows equal columns; diagonal when the off-diagonal falls silent; scalar when the diagonal repeats one number; identity when it repeats one; zero all over. Square matrices add two temperaments — symmetric, equal to its own transpose, and skew-symmetric, equal to its transpose's negative. And every square matrix splits exactly into a symmetric plus a skew-symmetric half.

## DEFINITION
A matrix is a rectangular array of numbers, symbols, or expressions arranged in rows and columns. The **types of matrices** classify matrices based on their order (number of rows × number of columns), the values of their elements, and special structural properties such as symmetry, diagonality, or being an identity/zero matrix.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must be able to: (1) Identify the type of any given matrix (row, column, square, rectangular, diagonal, scalar, identity, zero, symmetric, skew-symmetric) and state its order; (2) Construct a matrix of a specified type and order given a rule for its elements (e.g., $a_{ij} = \frac{i+2j}{5}$); (3) Verify whether a given square matrix is symmetric ($A' = A$) or skew-symmetric ($A' = -A$); (4) Decompose any square matrix into the sum of a symmetric and a skew-symmetric matrix.

## SCOPE_BOUNDARY
This node covers the **classification and identification** of matrices: row, column, square, rectangular, diagonal, scalar, identity, zero, equal matrices, symmetric, skew-symmetric, and the decomposition $A = \frac{1}{2}(A+A') + \frac{1}{2}(A-A')$. It does **NOT** cover matrix operations (addition, multiplication, scalar multiplication), transpose properties beyond symmetry, determinants, inverses, or solving linear systems — those are in subsequent nodes (c12_app_cbse_02_008, c12_app_cbse_02_009, c12_app_cbse_02_010, etc.).

## WALKTHROUGH
Start with a real-world scenario: "You are organizing a Class 12 farewell seating plan. You have 3 sections (A, B, C) and 4 categories (Boys/Girls × Activity 1/Activity 2). How would you arrange this data so you can instantly find 'Section B, Girls, Activity 2'?" Guide students to draw a 3×4 grid — this is a **rectangular matrix**. Then ask: "What if we only had one section?" → row matrix. "What if we only tracked one category across sections?" → column matrix. "What if sections = categories?" → square matrix. Now introduce special square matrices: "What if all off-diagonal entries are zero?" → diagonal. "What if all diagonal entries are equal?" → scalar. "What if all diagonal entries are 1?" → identity. "What if the matrix equals its transpose?" → symmetric. "What if it equals the negative of its transpose?" → skew-symmetric. End with the key insight: **Every square matrix can be uniquely split into a symmetric part and a skew-symmetric part** — this is the "symmetric + skew-symmetric decomposition" and is a favorite board exam question.

Takeaway: mastery means any matrix classified on sight and the two-part split constructed from the transpose. Exam moves: identification questions name the type and order from a displayed grid; construction questions build a typed matrix from an element rule; decomposition questions form the symmetric half by adding the transpose and the skew half by subtracting it, halving both. Method: check shape first, then diagonal habits, then transpose equality — the checklist walks from shape to temperament. Drill: one farewell-seating grid, one transpose test, one decomposition. The split is unique; the board asks for it by name almost every year.

## DIAGNOSTIC_QUESTION_1
Identify the type and order of the matrix $A = \begin{bmatrix} 5 & 0 & 0 \\ 0 & 5 & 0 \\ 0 & 0 & 5 \end{bmatrix}$. Is it an identity matrix? Justify your answer.

## DIAGNOSTIC_ANSWER_1
**Answer:** $A$ is a **scalar matrix** of order $3 \times 3$. It is **not** an identity matrix because an identity matrix must have 1 on every diagonal entry, but here the diagonal entries are 5. A scalar matrix has equal diagonal entries (any non-zero scalar $k$), while an identity matrix is the special case $k=1$.  
**Wrong answer reveals:** If a student says "identity matrix", they confuse the *structure* (diagonal non-zero, off-diagonal zero) with the *specific values* (must be 1). This is the #1 error in board exams — they see "diagonal matrix with equal entries" and auto-label it $I_3$.

## DIAGNOSTIC_QUESTION_2
A student writes: "The matrix $B = \begin{bmatrix} 0 & 2 \\ -2 & 0 \end{bmatrix}$ is skew-symmetric because its diagonal elements are zero." Is this reasoning correct? Explain why or why not.

## DIAGNOSTIC_ANSWER_2
**Answer:** The conclusion is correct ($B$ is skew-symmetric), but the **reasoning is incomplete and potentially misleading**. A matrix is skew-symmetric **iff** $B' = -B$. For $B = \begin{bmatrix} 0 & 2 \\ -2 & 0 \end{bmatrix}$, $B' = \begin{bmatrix} 0 & -2 \\ 2 & 0 \end{bmatrix} = -B$, so it is skew-symmetric. While it's true that all diagonal elements of a skew-symmetric matrix **must** be zero (since $a_{ii} = -a_{ii} \Rightarrow a_{ii}=0$), having zero diagonals is **necessary but not sufficient** — e.g., $\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$ has zero diagonals but is symmetric, not skew-symmetric.  
**Wrong answer reveals:** If the student thinks "zero diagonal ⇒ skew-symmetric", they confuse a necessary condition with the definition. This leads to errors in verifying symmetry/skew-symmetry in multi-step problems.

## DIAGNOSTIC_QUESTION_3
Construct a $2 \times 2$ matrix $A = [a_{ij}]$ where $a_{ij} = \frac{i - j}{i + j}$. Then determine whether $A$ is symmetric, skew-symmetric, or neither.

## DIAGNOSTIC_ANSWER_3
**Steps:**  
1. Compute elements:  
   $a_{11} = \frac{1-1}{1+1} = 0$  
   $a_{12} = \frac{1-2}{1+2} = -\frac{1}{3}$  
   $a_{21} = \frac{2-1}{2+1} = \frac{1}{3}$  
   $a_{22} = \frac{2-2}{2+2} = 0$  
   So $A = \begin{bmatrix} 0 & -\frac{1}{3} \\ \frac{1}{3} & 0 \end{bmatrix}$.  
2. Find transpose: $A' = \begin{bmatrix} 0 & \frac{1}{3} \\ -\frac{1}{3} & 0 \end{bmatrix}$.  
3. Compare: $A' = -A$, so $A$ is **skew-symmetric**.  
**Wrong answer reveals:** If a student claims $A$ is symmetric, they likely computed $a_{12}$ and $a_{21}$ but missed the sign difference. If they say "neither", they may have miscalculated $a_{ij}$ or forgotten to check $A' = \pm A$. This tests both construction skill and symmetry verification.

## DIAGNOSTIC_QUESTION_4
Given $A = \begin{bmatrix} 4 & 2 & -1 \\ 3 & 5 & 7 \\ 1 & -2 & 1 \end{bmatrix}$, decompose $A$ into the sum of a symmetric matrix $P$ and a skew-symmetric matrix $Q$. Verify that $P$ is symmetric and $Q$ is skew-symmetric.

## DIAGNOSTIC_ANSWER_4
**Steps:**  
1. Compute $A' = \begin{bmatrix} 4 & 3 & 1 \\ 2 & 5 & -2 \\ -1 & 7 & 1 \end{bmatrix}$.  
2. Symmetric part: $P = \frac{1}{2}(A + A') = \frac{1}{2} \begin{bmatrix} 8 & 5 & 0 \\ 5 & 10 & 5 \\ 0 & 5 & 2 \end{bmatrix} = \begin{bmatrix} 4 & \frac{5}{2} & 0 \\ \frac{5}{2} & 5 & \frac{5}{2} \\ 0 & \frac{5}{2} & 1 \end{bmatrix}$.  
3. Skew-symmetric part: $Q = \frac{1}{2}(A - A') = \frac{1}{2} \begin{bmatrix} 0 & -1 & -2 \\ 1 & 0 & 9 \\ 2 & -9 & 0 \end{bmatrix} = \begin{bmatrix} 0 & -\frac{1}{2} & -1 \\ \frac{1}{2} & 0 & \frac{9}{2} \\ 1 & -\frac{9}{2} & 0 \end{bmatrix}$.  
4. Verify: $P' = P$ (symmetric), $Q' = -Q$ (skew-symmetric), and $P+Q = A$.  
**Wrong answer reveals:** If $P$ or $Q$ has non-zero diagonal entries in $Q$, or if $P+Q \neq A$, the student likely made arithmetic errors in adding/subtracting matrices or forgot the $\frac{1}{2}$ factor. This is a 4-6 mark board question — partial credit is lost for missing verification steps.

## DIAGNOSTIC_QUESTION_5
Evaluate the statement: "If $A$ and $B$ are symmetric matrices of the same order, then $AB$ is always symmetric." Is this true or false? If false, give a counterexample. If true, prove it.

## DIAGNOSTIC_ANSWER_5
**Answer:** **False.** $AB$ is symmetric **iff** $AB = BA$ (i.e., $A$ and $B$ commute).  
**Counterexample:** Let $A = \begin{bmatrix} 1 & 2 \\ 2 & 3 \end{bmatrix}$, $B = \begin{bmatrix} 2 & 1 \\ 1 & 0 \end{bmatrix}$. Both are symmetric.  
$AB = \begin{bmatrix} 4 & 1 \\ 7 & 2 \end{bmatrix}$, but $(AB)' = \begin{bmatrix} 4 & 7 \\ 1 & 2 \end{bmatrix} \neq AB$. So $AB$ is not symmetric.  
**Why students get this wrong:** They know $(AB)' = B'A' = BA$ (since $A'=A, B'=B$), but they forget that $BA$ equals $AB$ only if $A$ and $B$ commute. This is a classic JEE/NEET trap — "product of symmetric matrices is symmetric" is a common false belief.

## DIAGNOSTIC_QUESTION_6
Create a $3 \times 3$ matrix $M$ that is **neither symmetric nor skew-symmetric**, but such that $M + M'$ is a diagonal matrix and $M - M'$ has all diagonal entries zero. Explain how you constructed it.

## DIAGNOSTIC_ANSWER_6
**Expected answer:** Any matrix where off-diagonal entries are not symmetric pairs. For example:  
$M = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{bmatrix}$.  
Then $M' = \begin{bmatrix} 1 & 4 & 7 \\ 2 & 5 & 8 \\ 3 & 6 & 9 \end{bmatrix}$.  
$M + M' = \begin{bmatrix} 2 & 6 & 10 \\ 6 & 10 & 14 \\ 10 & 14 & 18 \end{bmatrix}$ — **not diagonal** (fails condition).  
Better construction: Choose $M$ such that $m_{ij} + m_{ji} = 0$ for $i \neq j$ (so $M+M'$ is diagonal) but $m_{ij} \neq m_{ji}$ (so not symmetric) and $m_{ij} \neq -m_{ji}$ (so not skew-symmetric).  
Example: $M = \begin{bmatrix} 1 & 2 & 0 \\ 1 & 3 & 0 \\ 0 & 0 & 4 \end{bmatrix}$.  
$M' = \begin{bmatrix} 1 & 1 & 0 \\ 2 & 3 & 0 \\ 0 & 0 & 4 \end{bmatrix}$.  
$M+M' = \begin{bmatrix} 2 & 3 & 0 \\ 3 & 6 & 0 \\ 0 & 0 & 8 \end{bmatrix}$ — not diagonal.  
**Correct construction:** Let $M = \begin{bmatrix} a & b & c \\ d & e & f \\ g & h & i \end{bmatrix}$. For $M+M'$ diagonal: $b+d=0, c+g=0, f+h=0$. For not symmetric: $b \neq d$ or $c \neq g$ or $f \neq h$. For not skew-symmetric: $b \neq -d$ etc. But $b+d=0 \Rightarrow d=-b$, so $M+M'$ diagonal forces $d=-b$, which means $M$ is skew-symmetric in off-diagonals! Contradiction?  
Wait: $M+M'$ diagonal $\Rightarrow m_{ij} + m_{ji} = 0$ for $i \neq j$ $\Rightarrow m_{ji} = -m_{ij}$. This **is exactly** the off-diagonal condition for skew-symmetry. Combined with diagonal entries free, $M$ would be skew-symmetric **if** diagonals are zero. But if diagonals are non-zero, $M$ is **not** skew-symmetric (since skew-symmetric requires zero diagonals).  
So: $M = \begin{bmatrix} 1 & 2 & 3 \\ -2 & 4 & 5 \\ -3 & -5 & 6 \end{bmatrix}$.  
$M' = \begin{bmatrix} 1 & -2 & -3 \\ 2 & 4 & -5 \\ 3 & 5 & 6 \end{bmatrix}$.  
$M+M' = \begin{bmatrix} 2 & 0 & 0 \\ 0 & 8 & 0 \\ 0 & 0 & 12 \end{bmatrix}$ (diagonal).  
$M-M' = \begin{bmatrix} 0 & 4 & 6 \\ -4 & 0 & 10 \\ -6 & -10 & 0 \end{bmatrix}$ (diagonals zero).  
$M$ is not symmetric ($M \neq M'$), not skew-symmetric (diagonals non-zero).  
**Poor answer reveals:** If student cannot construct such a matrix, they don't grasp the decomposition $A = \frac{A+A'}{2} + \frac{A-A'}{2}$ — the symmetric part is $\frac{A+A'}{2}$ (diagonal here), skew-symmetric part is $\frac{A-A'}{2}$ (zero diagonals). This tests deep structural understanding.

## COMMON_MISCONCEPTION
**Misconception:** "A diagonal matrix with equal diagonal entries is an identity matrix."  
**Why it happens:** Students see the pattern — non-zero only on diagonal, all diagonal entries equal — and associate it with $I_n$ because $I_n$ is the most famous diagonal matrix. They forget the **defining condition**: identity matrix requires diagonal entries = **1 exactly**. A scalar matrix $kI$ has diagonal $k$; only when $k=1$ is it identity.  
**Concrete error:** In a board exam, given $A = \begin{bmatrix} 3 & 0 \\ 0 & 3 \end{bmatrix}$, a student writes "$A = I_2$" or "$A$ is an identity matrix of order 2". They lose 1 mark for wrong terminology. In JEE, this leads to errors in $A^{-1}$ calculation: they might think $(3I)^{-1} = I$ instead of $\frac{1}{3}I$.  
**Related confusion:** "Zero matrix is a scalar matrix with $k=0$." — True, but zero matrix is **not** an identity matrix. Students often mix "scalar matrix" and "identity matrix" definitions.

## ON_FAILURE
If a student cannot distinguish scalar vs identity matrix:  
1. **Revisit definition**: Write side-by-side:  
   - Scalar matrix: $kI = \begin{bmatrix} k & 0 \\ 0 & k \end{bmatrix}$, $k \in \mathbb{R}$  
   - Identity matrix: $I = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$ (only $k=1$)  
2. **Drill 5 examples**: Give matrices like $\begin{bmatrix} -2 & 0 \\ 0 & -2 \end{bmatrix}$, $\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$, $\begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}$, $\begin{bmatrix} 5 & 0 & 0 \\ 0 & 5 & 0 \\ 0 & 0 & 5 \end{bmatrix}$ — ask: "Scalar? Identity? Both? Neither?"  
3. **Re-diagnostic**: Ask: "If $A = 4I_3$, what is $A^{-1}$?" Correct: $\frac{1}{4}I_3$. If they say $I_3$, they still confuse scalar with identity.  
4. **Link to forward node**: This distinction is critical in c12_app_cbse_02_008 (Algebra of Matrices) for $kA$ properties and in c12_app_cbse_02_011 (Inverse) for $(kA)^{-1} = \frac{1}{k}A^{-1}$.

## PREREQUISITE_NODE_IDS
c12_app_cbse_02_005

## PREREQUISITE_REASONS
c12_app_cbse_02_005: The Introduction node defines matrix, element $a_{ij}$, order $m \times n$, and basic notation. Without this foundation, students cannot identify rows/columns, compute order, or understand what "diagonal element $a_{ii}$" means — all essential for classifying matrix types.

## FORWARD_NODE_IDS
c12_app_cbse_02_008, c12_app_cbse_02_009, c12_app_cbse_02_010

## FORWARD_REASONS
c12_app_cbse_02_008: Algebra of Matrices requires knowing types to check compatibility (e.g., addition only for same order, multiplication needs column-row match; identity matrix $I$ is multiplicative identity).  
c12_app_cbse_02_009: Scalar multiplication $kA$ produces a matrix of same type/order; understanding zero/identity matrices clarifies $0A = O$, $1A = A$.  
c12_app_cbse_02_010: Addition properties (commutative, associative, additive identity $O$, additive inverse $-A$) rely on recognizing zero matrix and negative matrix.  

## CROSS_SUBJECT_PREREQS
c11_app_cbse_08_002, c11_app_cbse_08_005

## CROSS_SUBJECT_REASONS
c11_app_cbse_08_002: Functions (Class 11) — a matrix $A = [a_{ij}]$ can be viewed as a function $a: \{1..m\} \times \{1..n\} \to \mathbb{R}$ where $a(i,j) = a_{ij}$. This functional perspective helps in constructing matrices from rules like $a_{ij} = \frac{i+2j}{5}$.  
c11_app_cbse_08_005: Types of Functions (Class 11) — injective, surjective, bijective concepts analogize to matrix properties: a square matrix is "bijective" (invertible) iff it's non-singular; symmetric/skew-symmetric decomposition mirrors even/odd function decomposition $f(x) = \frac{f(x)+f(-x)}{2} + \frac{f(x)-f(-x)}{2}$.

## CHAIN_DESCRIPTION
c12_app_cbse_02_005 -> c12_app_cbse_02_006 -> c12_app_cbse_02_008

## THIS_FORMULA
Symmetric-Skew-symmetric Decomposition: For any square matrix $A$, $A = \frac{1}{2}(A + A') + \frac{1}{2}(A - A')$, where $\frac{1}{2}(A + A')$ is symmetric and $\frac{1}{2}(A - A')$ is skew-symmetric.

## FORMULA_VARIABLES
- $A$: square matrix of order $n \times n$  
- $A'$: transpose of $A$ (interchange rows and columns)  
- $\frac{1}{2}(A + A')$: symmetric part (denoted $P$ or $S$)  
- $\frac{1}{2}(A - A')$: skew-symmetric part (denoted $Q$ or $K$)

## FORMULA_UNITS
N/A (dimensionless algebraic operation)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_app_cbse_08_002 | A matrix is a discrete bivariate function $a(i,j) = a_{ij}$; constructing matrices from formulas like $a_{ij} = \frac{i+2j}{5}$ directly uses function notation and evaluation skills from Class 11 Functions.
c11_app_cbse_08_005 | The symmetric/skew-symmetric decomposition $A = \frac{A+A'}{2} + \frac{A-A'}{2}$ is the exact matrix analog of even/odd function decomposition $f(x) = \frac{f(x)+f(-x)}{2} + \frac{f(x)-f(-x)}{2}$ taught in Types of Functions.

## PREREQ_CONCEPT
Understanding matrix notation $A = [a_{ij}]_{m \times n}$, order, diagonal vs non-diagonal elements, and transpose $A'$ (from Introduction node).

## PREREQ_BEFORE
Student must be able to: (1) State the order of a given matrix; (2) Identify the $(i,j)$-th element; (3) Write the transpose of a matrix by interchanging rows and columns.

## PREREQ_STUCK
If stuck, review **c12_app_cbse_02_005 (Introduction)** — specifically the definition of $a_{ij}$, order $m \times n$, and the transpose operation with examples like $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} \Rightarrow A' = \begin{bmatrix} 1 & 3 \\ 2 & 4 \end{bmatrix}$.

## WORKED_EXAMPLE_1
PROBLEM: A school has three sections (A, B, C) of Class 12. Each section has students opting for three streams: Science, Commerce, Humanities. The data is:  
Section A: 40 Science, 25 Commerce, 15 Humanities  
Section B: 35 Science, 30 Commerce, 20 Humanities  
Section C: 30 Science, 20 Commerce, 25 Humanities  
Represent this data as a matrix. Identify its type and order. If the school wants to track only Humanities students across sections, what type of matrix would that be?

STEPS:
- Step 1: Organize data in a grid. Rows = sections (3), Columns = streams (3). So matrix $M$ is $3 \times 3$.
- Step 2: Write matrix: $M = \begin{bmatrix} 40 & 25 & 15 \\ 35 & 30 & 20 \\ 30 & 20 & 25 \end{bmatrix}$.
- Step 3: Identify type: Rows = 3, Columns = 3 → equal → **Square matrix of order 3**.
- Step 4: Extract Humanities column (3rd column): $\begin{bmatrix} 15 \\ 20 \\ 25 \end{bmatrix}$. This has 3 rows, 1 column → **Column matrix of order $3 \times 1$**.
- Step 5: Verify: Column matrix has exactly one column — correct.

REASONING: The full dataset is square because categories (sections and streams) are equal in count. Extracting one stream reduces columns to 1, making it a column matrix. This mirrors real data slicing in spreadsheets.

ANSWER: Full matrix = $\begin{bmatrix} 40 & 25 & 15 \\ 35 & 30 & 20 \\ 30 & 20 & 25 \end{bmatrix}$, Square matrix of order $3 \times 3$. Humanities-only matrix = $\begin{bmatrix} 15 \\ 20 \\ 25 \end{bmatrix}$, Column matrix of order $3 \times 1$.

## WORKED_EXAMPLE_2
PROBLEM: Construct a $3 \times 3$ matrix $A = [a_{ij}]$ where $a_{ij} = \frac{i^2 - j^2}{i^2 + j^2}$. Determine if $A$ is symmetric, skew-symmetric, or neither. Justify.

STEPS:
- Step 1: Compute all 9 elements using $a_{ij} = \frac{i^2 - j^2}{i^2 + j^2}$.
  $a_{11} = 0$, $a_{12} = \frac{1-4}{1+4} = -\frac{3}{5}$, $a_{13} = \frac{1-9}{1+9} = -\frac{4}{5}$  
  $a_{21} = \frac{4-1}{4+1} = \frac{3}{5}$, $a_{22} = 0$, $a_{23} = \frac{4-9}{4+9} = -\frac{5}{13}$  
  $a_{31} = \frac{9-1}{9+1} = \frac{4}{5}$, $a_{32} = \frac{9-4}{9+4} = \frac{5}{13}$, $a_{33} = 0$
- Step 2: Write $A = \begin{bmatrix} 0 & -\frac{3}{5} & -\frac{4}{5} \\ \frac{3}{5} & 0 & -\frac{5}{13} \\ \frac{4}{5} & \frac{5}{13} & 0 \end{bmatrix}$.
- Step 3: Compute transpose $A' = \begin{bmatrix} 0 & \frac{3}{5} & \frac{4}{5} \\ -\frac{3}{5} & 0 & \frac{5}{13} \\ -\frac{4}{5} & -\frac{5}{13} & 0 \end{bmatrix}$.
- Step 4: Compare $A'$ with $A$ and $-A$:  
  $A' = -A$ → every element matches.
- Step 5: Conclude: $A$ is **skew-symmetric** (diagonals zero, off-diagonals opposite signs).

REASONING: The formula $a_{ij} = \frac{i^2 - j^2}{i^2 + j^2}$ is anti-symmetric in $i,j$: swapping $i$ and $j$ gives $a_{ji} = \frac{j^2 - i^2}{j^2 + i^2} = -a_{ij}$. This guarantees $A' = -A$ for any order. Diagonals are zero because $i=j \Rightarrow a_{ii}=0$.

ANSWER: $A = \begin{bmatrix} 0 & -\frac{3}{5} & -\frac{4}{5} \\ \frac{3}{5} & 0 & -\frac{5}{13} \\ \frac{4}{5} & \frac{5}{13} & 0 \end{bmatrix}$, which is **skew-symmetric** because $A' = -A$.

## WORKED_EXAMPLE_3
PROBLEM: Given $A = \begin{bmatrix} 2 & -1 & 3 \\ 4 & 0 & -2 \\ 1 & 5 & -3 \end{bmatrix}$, express $A$ as the sum of a symmetric matrix $P$ and a skew-symmetric matrix $Q$. Verify that $P$ is symmetric, $Q$ is skew-symmetric, and $P+Q=A$. Also, find the trace of $P$ and $Q$.

STEPS:
- Step 1: Compute transpose $A' = \begin{bmatrix} 2 & 4 & 1 \\ -1 & 0 & 5 \\ 3 & -2 & -3 \end{bmatrix}$.
- Step 2: Symmetric part $P = \frac{1}{2}(A + A') = \frac{1}{2} \begin{bmatrix} 4 & 3 & 4 \\ 3 & 0 & 3 \\ 4 & 3 & -6 \end{bmatrix} = \begin{bmatrix} 2 & \frac{3}{2} & 2 \\ \frac{3}{2} & 0 & \frac{3}{2} \\ 2 & \frac{3}{2} & -3 \end{bmatrix}$.
- Step 3: Skew-symmetric part $Q = \frac{1}{2}(A - A') = \frac{1}{2} \begin{bmatrix} 0 & -5 & 2 \\ 5 & 0 & -7 \\ -2 & 7 & 0 \end{bmatrix} = \begin{bmatrix} 0 & -\frac{5}{2} & 1 \\ \frac{5}{2} & 0 & -\frac{7}{2} \\ -1 & \frac{7}{2} & 0 \end{bmatrix}$.
- Step 4: Verify:  
  $P' = \begin{bmatrix} 2 & \frac{3}{2} & 2 \\ \frac{3}{2} & 0 & \frac{3}{2} \\ 2 & \frac{3}{2} & -3 \end{bmatrix} = P$ ✓  
  $Q' = \begin{bmatrix} 0 & \frac{5}{2} & -1 \\ -\frac{5}{2} & 0 & \frac{7}{2} \\ 1 & -\frac{7}{2} & 0 \end{bmatrix} = -Q$ ✓  
  $P+Q = \begin{bmatrix} 2 & -1 & 3 \\ 4 & 0 & -2 \\ 1 & 5 & -3 \end{bmatrix} = A$ ✓
- Step 5: Trace: $\text{tr}(P) = 2 + 0 + (-3) = -1$; $\text{tr}(Q) = 0 + 0 + 0 = 0$ (always true for skew-symmetric).

REASONING: The decomposition $A = \frac{A+A'}{2} + \frac{A-A'}{2}$ is unique for any square matrix. The symmetric part retains the diagonal of $A$ (since $A+A'$ doubles diagonals), while the skew-symmetric part always has zero diagonal. Trace of skew-symmetric is always 0; trace of symmetric part equals trace of $A$.

ANSWER:  
$P = \begin{bmatrix} 2 & \frac{3}{2} & 2 \\ \frac{3}{2} & 0 & \frac{3}{2} \\ 2 & \frac{3}{2} & -3 \end{bmatrix}$ (symmetric),  
$Q = \begin{bmatrix} 0 & -\frac{5}{2} & 1 \\ \frac{5}{2} & 0 & -\frac{7}{2} \\ -1 & \frac{7}{2} & 0 \end{bmatrix}$ (skew-symmetric),  
$\text{tr}(P) = -1$, $\text{tr}(Q) = 0$.

## COMPETENCY_QUESTION_1
QUESTION: A student claims: "If $A$ is a square matrix such that $A^2 = I$, then $A$ must be either $I$ or $-I$." Is this statement correct? If yes, prove it. If no, give a counterexample and explain the flaw in the student's reasoning.  
COMPETENCY: Critical Thinking / Logical Reasoning (evaluating a mathematical claim, constructing counterexamples)  
STEPS:
- Step 1: Understand the claim: $A^2 = I \Rightarrow A = I$ or $A = -I$.
- Step 2: Test with a simple non-diagonal matrix. Try $A = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$.
- Step 3: Compute $A^2 = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix} \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} = I$.
- Step 4: Observe $A \neq I$ and $A \neq -I$, but $A^2 = I$. So claim is false.
- Step 5: Explain flaw: The student assumed $x^2=1 \Rightarrow x=\pm 1$ (true for real numbers) applies to matrices. But matrix multiplication is not commutative in general, and zero divisors exist ($AB=0$ does not imply $A=0$ or $B=0$). Here $(A-I)(A+I)=0$ but neither factor is zero.

ANSWER: The statement is **false**. Counterexample: $A = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$ satisfies $A^2 = I$ but $A \neq \pm I$. The error is applying real-number algebra ($x^2=1 \Rightarrow x=\pm 1$) to matrices, ignoring that matrices can have zero divisors and non-commutative multiplication.  
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Let $A = \begin{bmatrix} \cos\theta & \sin\theta \\ -\sin\theta & \cos\theta \end{bmatrix}$.  
(a) Show that $A$ is an orthogonal matrix (i.e., $A'A = I$).  
(b) For what values of $\theta$ is $A$ symmetric? Skew-symmetric?  
(c) If $B = A + A'$, find $B$ and determine its type.  
(d) If $C = A - A'$, find $C$ and determine its type.  
(e) Verify that $A = \frac{1}{2}B + \frac{1}{2}C$ and interpret this in terms of rotation.  
COMPETENCY: Multi-concept Integration (trigonometry + matrix types + transpose + decomposition + geometric interpretation)  
STEPS:
- Step 1: Compute $A' = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$.
- Step 2 (a): $A'A = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix} \begin{bmatrix} \cos\theta & \sin\theta \\ -\sin\theta & \cos\theta \end{bmatrix} = \begin{bmatrix} \cos^2\theta+\sin^2\theta & \cos\theta\sin\theta-\sin\theta\cos\theta \\ \sin\theta\cos\theta-\cos\theta\sin\theta & \sin^2\theta+\cos^2\theta \end{bmatrix} = I$. So $A$ is orthogonal.
- Step 3 (b): $A$ symmetric $\Leftrightarrow A' = A \Leftrightarrow -\sin\theta = \sin\theta \Leftrightarrow \sin\theta=0 \Leftrightarrow \theta = n\pi$.  
  $A$ skew-symmetric $\Leftrightarrow A' = -A \Leftrightarrow \cos\theta = -\cos\theta \Leftrightarrow \cos\theta=0 \Leftrightarrow \theta = \frac{\pi}{2} + n\pi$.
- Step 4 (c): $B = A + A' = \begin{bmatrix} 2\cos\theta & 0 \\ 0 & 2\cos\theta \end{bmatrix} = 2\cos\theta \cdot I$ → **Scalar matrix** (diagonal, equal entries).
- Step 5 (d): $C = A - A' = \begin{bmatrix} 0 & 2\sin\theta \\ -2\sin\theta & 0 \end{bmatrix}$ → **Skew-symmetric matrix** (zero diagonal, off-diagonals opposite).
- Step 6 (e): $\frac{1}{2}B + \frac{1}{2}C = \cos\theta \cdot I + \begin{bmatrix} 0 & \sin\theta \\ -\sin\theta & 0 \end{bmatrix} = A$.  
  Interpretation: $A$ is a rotation matrix. $\frac{1}{2}B = \cos\theta \cdot I$ is the "scaling" part (symmetric), $\frac{1}{2}C$ is the "pure rotation" part (skew-symmetric). This is the symmetric-skew decomposition of a rotation.

ANSWER:  
(a) $A'A = I$ verified.  
(b) Symmetric when $\theta = n\pi$; skew-symmetric when $\theta = \frac{\pi}{2} + n\pi$.  
(c) $B = 2\cos\theta \cdot I$ (scalar matrix).  
(d) $C = \begin{bmatrix} 0 & 2\sin\theta \\ -2\sin\theta & 0 \end{bmatrix}$ (skew-symmetric).  
(e) $\frac{1}{2}B + \frac{1}{2}C = A$; geometrically, rotation decomposes into symmetric (cosine scaling) and skew-symmetric (sine rotation) parts.  
DIFFICULTY: hard