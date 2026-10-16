## ELI5
Imagine you and your friend track your monthly expenses in a notebook with categories like Food, Transport, and Entertainment. If you want to find your *combined* household expenses, you don't need a new notebook—you just add your "Food" to their "Food", your "Transport" to their "Transport", and so on. Matrix addition works exactly like this: you can only combine lists (matrices) that have the exact same categories in the exact same order (same order/dimensions), and you add them item-by-item. The most common mix-up? Trying to add your 3-category budget to your friend's 4-category budget—it fails because the "slots" don't match.

## DEFINITION
For two matrices $A = [a_{ij}]$ and $B = [b_{ij}]$ of the same order $m \times n$, their sum $C = A + B$ is a matrix $C = [c_{ij}]$ of order $m \times n$ where each element $c_{ij} = a_{ij} + b_{ij}$ for all $i = 1, \dots, m$ and $j = 1, \dots, n$. If the orders differ, the sum is **not defined**.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must be able to: (1) Instantly identify if two given matrices are conformable for addition by checking their orders; (2) Correctly compute the sum by adding corresponding elements; (3) Apply the commutative ($A+B=B+A$) and associative ($(A+B)+C = A+(B+C)$) properties to simplify expressions involving 3 or more matrices; (4) Solve for unknown elements in matrix equations of the form $A + X = B$ or $2A + 3B = C$.

## SCOPE_BOUNDARY
This node covers **only** the definition, computation, and algebraic properties (commutative, associative, additive identity, additive inverse) of matrix addition and subtraction. It does **not** cover matrix multiplication, scalar multiplication (covered in sibling node `c12_app_cbse_02_009`), transpose, determinants, or inverse matrices.

## WALKTHROUGH
Start by asking: *"You run a small cafe. Monday's sales (in Rs.) are: Coffee 500, Tea 300, Snacks 700. Tuesday's sales are: Coffee 600, Tea 250, Snacks 800. How do you find the total sales for the two days?"* Students will naturally say "add them category-wise." Write this as two column matrices and add them. Then ask: *"What if Tuesday you also sold 'Desserts' but Monday you didn't?"* They will realize you can't add a 3-item list to a 4-item list. This anchors the **"same order"** rule. Next, introduce the formal definition $c_{ij} = a_{ij} + b_{ij}$. Demonstrate commutativity by swapping Monday/Tuesday order—total is unchanged. Finally, show subtraction as adding the negative matrix ($A - B = A + (-B)$), linking back to the scalar multiplication node (`c12_app_cbse_02_009`) for the $-1$ scalar. The key insight: **Matrix addition is just organized, element-wise addition of real numbers—nothing more, nothing less.**

Takeaway: mastery means the same-order rule enforced, the element-wise sum computed, and the properties used to tidy expressions. Exam moves: compatibility questions refuse mismatched orders instantly; computation questions add and subtract corresponding elements including negatives; property questions reorder and regroup three-matrix sums, and unknown-element questions solve A-plus-X-equals-B entry by entry. Method: matrix addition is organised ordinary addition — nothing more — so audit it like arithmetic, entry by entry. Drill: one cafe, two days, one dessert that breaks the order. The dessert did the teaching: no matching order, no sum.

## DIAGNOSTIC_QUESTION_1
State the necessary and sufficient condition for two matrices $A$ and $B$ to be added. If $A$ is of order $2 \times 3$ and $B$ is of order $3 \times 2$, is $A + B$ defined? Justify your answer in one sentence.

## DIAGNOSTIC_ANSWER_1
**Correct Answer:** Two matrices can be added **if and only if they have the same order** (same number of rows and same number of columns). Since $A$ is $2 \times 3$ and $B$ is $3 \times 2$, their orders differ ($2 \neq 3$ rows, $3 \neq 2$ columns), so $A + B$ is **not defined**.
**Wrong Answer Analysis:** If a student says "Yes, both have 6 elements," they are confusing **total number of elements** with **order/dimensions**. This is a critical JEE/Board trap: a $2 \times 3$ matrix has 2 rows and 3 columns; a $3 \times 2$ has 3 rows and 2 columns. The "slots" (positions) do not align. If they say "Order doesn't matter, just add corresponding numbers," they lack the fundamental definition of matrix structure.

## DIAGNOSTIC_QUESTION_2
Given $A = \begin{bmatrix} 1 & -2 \\ 3 & 4 \end{bmatrix}$ and $B = \begin{bmatrix} 5 & 6 \\ -7 & 8 \end{bmatrix}$, a student computes $A + B = \begin{bmatrix} 6 & 4 \\ -4 & 12 \end{bmatrix}$. They then claim, *"Since addition of real numbers is commutative, matrix addition must also be commutative. So $B + A$ will give the exact same matrix."* Is the student's **reasoning** correct? Explain why or why not, referencing the definition of matrix addition.

## DIAGNOSTIC_ANSWER_2
**Correct Answer:** **Yes, the conclusion is correct ($B+A = A+B$), and the reasoning is valid.** Matrix addition is defined element-wise: $(A+B)_{ij} = a_{ij} + b_{ij}$. Since real number addition is commutative ($a_{ij} + b_{ij} = b_{ij} + a_{ij}$), it follows that $(A+B)_{ij} = (B+A)_{ij}$ for all $i,j$. Thus $A+B = B+A$. The property is **inherited** from the commutativity of real numbers at the element level.
**Wrong Answer Analysis:** If a student says "No, matrix addition is not commutative because matrix multiplication isn't," they are conflating **addition** with **multiplication**—a very common error. If they say "Yes, but only for $2 \times 2$ matrices," they misunderstand that the proof holds for **any** order $m \times n$ because it relies on element-wise commutativity, which is universal for real numbers.

## DIAGNOSTIC_QUESTION_3
Find the matrix $X$ such that $2A + 3X = 5B$, where $A = \begin{bmatrix} 2 & -1 \\ 0 & 3 \end{bmatrix}$ and $B = \begin{bmatrix} 1 & 4 \\ -2 & 0 \end{bmatrix}$. Show all steps, including the scalar multiplications.

## DIAGNOSTIC_ANSWER_3
**Correct Answer:**
**Step 1:** Compute $2A = 2 \begin{bmatrix} 2 & -1 \\ 0 & 3 \end{bmatrix} = \begin{bmatrix} 4 & -2 \\ 0 & 6 \end{bmatrix}$.
**Step 2:** Compute $5B = 5 \begin{bmatrix} 1 & 4 \\ -2 & 0 \end{bmatrix} = \begin{bmatrix} 5 & 20 \\ -10 & 0 \end{bmatrix}$.
**Step 3:** Substitute into equation: $\begin{bmatrix} 4 & -2 \\ 0 & 6 \end{bmatrix} + 3X = \begin{bmatrix} 5 & 20 \\ -10 & 0 \end{bmatrix}$.
**Step 4:** Isolate $3X$ by subtracting $2A$ (additive inverse): $3X = \begin{bmatrix} 5 & 20 \\ -10 & 0 \end{bmatrix} - \begin{bmatrix} 4 & -2 \\ 0 & 6 \end{bmatrix} = \begin{bmatrix} 1 & 22 \\ -10 & -6 \end{bmatrix}$.
**Step 5:** Divide by scalar 3 (multiply by $1/3$): $X = \frac{1}{3} \begin{bmatrix} 1 & 22 \\ -10 & -6 \end{bmatrix} = \begin{bmatrix} 1/3 & 22/3 \\ -10/3 & -2 \end{bmatrix}$.
**Wrong Answer Analysis:** If a student writes $3X = 5B - 2A$ but computes $5B - 2A$ as $\begin{bmatrix} 5-4 & 20-(-2) \\ -10-0 & 0-6 \end{bmatrix} = \begin{bmatrix} 1 & 18 \\ -10 & -6 \end{bmatrix}$ (error in $20 - (-2) = 18$ instead of $22$), they have a **sign error in subtraction**—a top mark-loser in Boards. If they write $X = \frac{5B - 2A}{3}$ but try to "divide matrices," they confuse scalar division with matrix division (which is undefined).

## DIAGNOSTIC_QUESTION_4
Let $A, B, C$ be three matrices of the same order $m \times n$. Prove that $(A + B) + C = A + (B + C)$ using the definition of matrix addition and the associativity of real number addition. Write the proof in 3-4 clear lines.

## DIAGNOSTIC_ANSWER_4
**Correct Answer:**
Let $A = [a_{ij}], B = [b_{ij}], C = [c_{ij}]$.
LHS $= (A+B)+C = [a_{ij}+b_{ij}] + [c_{ij}] = [(a_{ij}+b_{ij})+c_{ij}]$.
By associativity of real numbers, $(a_{ij}+b_{ij})+c_{ij} = a_{ij}+(b_{ij}+c_{ij})$.
Thus LHS $= [a_{ij}+(b_{ij}+c_{ij})] = [a_{ij}] + [b_{ij}+c_{ij}] = A+(B+C)$ = RHS. Hence proved.
**Wrong Answer Analysis:** If a student writes a numerical example (e.g., with $2 \times 2$ matrices) and says "Hence proved," they confuse **verification by example** with **general proof**—a major Board exam error (0 marks for "prove" questions). If they write $(A+B)+C = A+B+C = A+(B+C)$ without referencing the element-wise definition or real number associativity, the proof is incomplete; they are assuming the conclusion.

## DIAGNOSTIC_QUESTION_5
A student argues: *"The zero matrix $O$ is the additive identity for matrices, so for any matrix $A$, $A + O = A$. Therefore, $O$ must be a square matrix because only square matrices have identities (like $I$ for multiplication)."* Evaluate this claim. Is the student correct? Explain the flaw in their reasoning.

## DIAGNOSTIC_ANSWER_5
**Correct Answer:** The student is **incorrect**. The additive identity $O$ (zero matrix) **does not need to be square**. For a matrix $A$ of order $m \times n$, the additive identity is the zero matrix $O_{m \times n}$ of the **same order** $m \times n$. $O_{m \times n}$ has all entries zero. The student falsely generalizes the property of the **multiplicative identity** $I$ (which *must* be square, $n \times n$, to satisfy $AI = IA = A$) to the **additive identity**. Addition only requires same order; multiplication requires compatible inner dimensions ($n$ of $A$ = rows of $B$), forcing $I$ to be square.
**Wrong Answer Analysis:** If the student insists $O$ must be square, they are conflating **additive identity** (exists for *any* $m \times n$) with **multiplicative identity** (exists only for square matrices). This reveals a lack of distinction between the algebraic structures of $(M_{m\times n}, +)$ (abelian group for all $m,n$) vs $(M_{n\times n}, \cdot)$ (monoid only for square).

## DIAGNOSTIC_QUESTION_6
Create a real-life scenario (Indian context) involving **three** matrices of the same order where you need to use the **associative property** $(A+B)+C = A+(B+C)$ to simplify a calculation. Define the matrices with plausible data, state what each represents, and show how grouping differently reduces effort or avoids errors.

## DIAGNOSTIC_ANSWER_6
**Expected Answer (Criteria):**
- **Scenario:** E.g., A school tracks fee collections (Tuition, Transport, Lab) for 3 classes (10, 11, 12) over 3 months (Jan, Feb, Mar). Matrix $A$ = Jan fees, $B$ = Feb fees, $C$ = Mar fees. All are $3 \times 3$.
- **Matrices:** Defined with realistic numbers (e.g., $A = \begin{bmatrix} 5000 & 1000 & 500 \\ \dots \end{bmatrix}$).
- **Use of Associativity:** To find total annual fees (Jan+Feb+Mar), computing $(A+B)+C$ requires adding Jan+Feb first (maybe large numbers), then adding Mar. Computing $A+(B+C)$ allows adding Feb+Mar first. If Feb and Mar have many similar entries (e.g., same transport fee), $B+C$ might be easier mentally. Or, if using a calculator, $(A+B)+C$ might overflow less than $A+(B+C)$ in some hypothetical fixed-precision system (though less relevant now).
- **Key:** The student must explicitly show **two different groupings** yielding the **same final matrix**, and explain *why* one grouping was strategically better (e.g., "Feb and Mar have identical Transport fees, so $B+C$ gives a clean column, making $A+(B+C)$ faster").
**Poor Answer Reveals:** If the scenario uses matrices of *different* orders, they missed the "same order" prerequisite. If they just state the property without a contextual reason for regrouping, they treat associativity as a syntactic rule, not a computational tool.

## COMMON_MISCONCEPTION
**The "Total Elements" Trap:** Students frequently believe that if two matrices have the **same total number of elements** (e.g., both have 6 elements), they can be added. They attempt to add a $2 \times 3$ matrix to a $3 \times 2$ matrix by "matching up the 6 numbers." **Why this is wrong:** Matrix addition is defined **position-wise** ($c_{ij} = a_{ij} + b_{ij}$). The index pair $(i,j)$—row $i$, column $j$—must exist in *both* matrices. A $2 \times 3$ matrix has positions $(1,1), (1,2), (1,3), (2,1), (2,2), (2,3)$. A $3 \times 2$ matrix has positions $(1,1), (1,2), (2,1), (2,2), (3,1), (3,2)$. The sets of positions are **different**; there is no $(1,3)$ in the second matrix, and no $(3,1)$ in the first. **Why students make this error:** They focus on the *count* of data points (a scalar property) rather than the *structure* (a 2D addressing scheme). Textbook examples often use same-order matrices, so the "shape" constraint is never visibly violated. In competitive exams (JEE Main), a question might give $A_{2\times3}$ and $B_{3\times2}$ and ask for $A+B$; the correct answer is **"Not defined"**, not a $2\times3$ or $3\times2$ matrix.

## ON_FAILURE
1. **Immediate Diagnosis:** Give the student two matrices: $P = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}$ ($2 \times 3$) and $Q = \begin{bmatrix} 7 & 8 \\ 9 & 10 \\ 11 & 12 \end{bmatrix}$ ($3 \times 2$). Ask: "Add $P$ and $Q$." If they produce a $2 \times 3$ or $3 \times 2$ matrix, the misconception is confirmed.
2. **Visual Remediation:** Draw two grids on paper: a $2$-row, $3$-column grid for $P$ and a $3$-row, $2$-column grid for $Q$. Ask the student to place a finger on $p_{13}$ (value 3) and find the "corresponding" element in $Q$. They will realize $Q$ has no 3rd column in row 1. Repeat for $q_{31}$ (value 11)—$P$ has no 3rd row.
3. **Re-diagnostic:** Provide $R = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$ and $S = \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}$ (both $2 \times 2$). Ask them to add. Then give $T = \begin{bmatrix} 1 & 2 & 3 \end{bmatrix}$ ($1 \times 3$) and $U = \begin{bmatrix} 4 \\ 5 \\ 6 \end{bmatrix}$ ($3 \times 1$). Ask: "Is $T+U$ defined?" Correct answer: **No, orders differ ($1\times3$ vs $3\times1$)**. Mastery is achieved when they reject addition based *solely* on order mismatch, regardless of element count.

## PREREQUISITE_NODE_IDS
c12_app_cbse_02_005, c12_app_cbse_02_006, c12_app_cbse_02_009

## PREREQUISITE_REASONS
c12_app_cbse_02_005: Introduces the concept of a matrix, its elements $a_{ij}$, and order $m \times n$—the foundational vocabulary for defining addition.
c12_app_cbse_02_006: Establishes types of matrices (row, column, square, zero). The **zero matrix** $O$ is the additive identity; recognizing it by order is essential for Property (iv).
c12_app_cbse_02_009: Covers scalar multiplication ($kA$). This is required to define the **negative matrix** $-A = (-1)A$ (additive inverse, Property v) and to solve equations like $2A + 3X = 5B$ (Diagnostic Q3).

## FORWARD_NODE_IDS
c12_app_cbse_02_008

## FORWARD_REASONS
c12_app_cbse_02_008: "Algebra of Matrices" is the parent topic node that synthesizes addition, subtraction, scalar multiplication, and matrix multiplication. Mastery of addition properties (commutativity, associativity, identity, inverse) is a direct prerequisite for understanding the algebraic structure of the matrix ring/algebra in that node.

## CROSS_SUBJECT_PREREQS
c11_app_cbse_03_002, c11_app_cbse_08_002

## CROSS_SUBJECT_REASONS
c11_app_cbse_03_002: **Sets (Class 11)**. A matrix is formally a **function** $A: \{1,\dots,m\} \times \{1,\dots,n\} \to \mathbb{R}$ (or $\mathbb{C}$). Matrix addition is **pointwise addition of functions**: $(A+B)(i,j) = A(i,j) + B(i,j)$. The "same order" requirement is exactly the requirement that two functions have the **same domain** to be added. This set-theoretic view clarifies why order must match.
c11_app_cbse_08_002: **Functions (Class 11)**. The concept of a function's **domain** and **codomain** directly maps to matrix **order** ($m \times n$) and **element type** (real numbers). Just as $f+g$ is only defined if $\text{dom}(f) = \text{dom}(g)$, $A+B$ is only defined if $\text{order}(A) = \text{order}(B)$. This reinforces the structural view over the "list of numbers" view.

## CHAIN_DESCRIPTION
c12_app_cbse_02_005 -> c12_app_cbse_02_006 -> c12_app_cbse_02_009 -> c12_app_cbse_02_010 -> c12_app_cbse_02_008

## THIS_FORMULA
If $A = [a_{ij}]_{m \times n}$ and $B = [b_{ij}]_{m \times n}$, then $A + B = [a_{ij} + b_{ij}]_{m \times n}$. Subtraction: $A - B = A + (-B) = [a_{ij} - b_{ij}]_{m \times n}$.

## FORMULA_VARIABLES
- $A, B$: Matrices of identical order $m \times n$.
- $a_{ij}, b_{ij}$: Real number elements at row $i$, column $j$ ($1 \le i \le m, 1 \le j \le n$).
- $m$: Number of rows (positive integer).
- $n$: Number of columns (positive integer).
- $O_{m \times n}$: Zero matrix (additive identity), all elements $0$.
- $-A$: Additive inverse of $A$, defined as $(-1)A = [-a_{ij}]$.

## FORMULA_UNITS
Elements $a_{ij}, b_{ij}$ are real numbers (unitless in pure algebra; carry physical units like Rs., meters, kg in applications). The matrix itself has no unit; its elements do.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_app_cbse_03_002 | A matrix is a function from the index set $\{1..m\} \times \{1..n\}$ to $\mathbb{R}$. Matrix addition is pointwise function addition, requiring identical domains (same order).
c11_app_cbse_08_002 | Functions have domains; addition of functions requires common domain. Matrix order = function domain. This explains the conformability condition structurally.

## PREREQ_CONCEPT
Understanding that a matrix is defined by its **order** (rows $\times$ columns) and that each position $(i,j)$ is a distinct "slot"—not just an unordered bag of numbers.

## PREREQ_BEFORE
The student must be able to: (1) State the order of any given matrix; (2) Identify the element $a_{ij}$ at a specific position; (3) Perform scalar multiplication $kA$ (multiply every element by $k$).

## PREREQ_STUCK
If stuck on "same order" requirement: Revisit **c12_app_cbse_02_005 (Introduction)** for the definition of matrix order and element indexing $a_{ij}$. If stuck on scalar multiplication in equations like $2A+3X=5B$: Revisit **c12_app_cbse_02_009 (Multiplication by Scalar)**.

## WORKED_EXAMPLE_1
**PROBLEM:** A small business owner tracks monthly sales (in ₹1000s) of three products (P1, P2, P3) across two branches (Branch A, Branch B) for January and February.
January Sales Matrix $J = \begin{bmatrix} 12 & 8 & 15 \\ 10 & 5 & 20 \end{bmatrix}$ (Row 1: Branch A, Row 2: Branch B; Col 1: P1, Col 2: P2, Col 3: P3).
February Sales Matrix $F = \begin{bmatrix} 10 & 12 & 10 \\ 15 & 8 & 18 \end{bmatrix}$ (same layout).
Find the total sales matrix $T = J + F$ for the two months. Then, find the *increase* matrix $D = F - J$ (February over January). Interpret the negative entries in $D$.

**STEPS:**
- Step 1: Verify conformability. Both $J$ and $F$ are $2 \times 3$ (2 branches, 3 products). Orders match $\Rightarrow$ addition/subtraction defined.
- Step 2: Compute $T = J + F$ element-wise.
  $t_{11} = 12+10=22$, $t_{12}=8+12=20$, $t_{13}=15+10=25$.
  $t_{21} = 10+15=25$, $t_{22}=5+8=13$, $t_{23}=20+18=38$.
  $T = \begin{bmatrix} 22 & 20 & 25 \\ 25 & 13 & 38 \end{bmatrix}$.
- Step 3: Compute $D = F - J = F + (-J)$.
  $-J = \begin{bmatrix} -12 & -8 & -15 \\ -10 & -5 & -20 \end{bmatrix}$.
  $D = \begin{bmatrix} 10-12 & 12-8 & 10-15 \\ 15-10 & 8-5 & 18-20 \end{bmatrix} = \begin{bmatrix} -2 & 4 & -5 \\ 5 & 3 & -2 \end{bmatrix}$.
- Step 4: Interpret $D$. Negative entries mean sales *decreased* in Feb vs Jan.
  $d_{11}=-2$: Branch A, P1 dropped by ₹2000.
  $d_{13}=-5$: Branch A, P3 dropped by ₹5000.
  $d_{23}=-2$: Branch B, P3 dropped by ₹2000.
  All other entries positive $\Rightarrow$ sales increased.

**REASONING:** Matrix addition/subtraction directly models aggregation and comparison of structured data. The order ($2 \times 3$) encodes the structure: 2 branches $\times$ 3 products. Element-wise operation preserves this structure. Negative results in subtraction have a clear real-world meaning (decline).

**ANSWER:** Total Sales $T = \begin{bmatrix} 22 & 20 & 25 \\ 25 & 13 & 38 \end{bmatrix}$ (in ₹1000s). Increase Matrix $D = \begin{bmatrix} -2 & 4 & -5 \\ 5 & 3 & -2 \end{bmatrix}$ (in ₹1000s). Negative entries indicate a drop in sales for that branch-product combination.

## WORKED_EXAMPLE_2
**PROBLEM:** Solve for the matrix $X$ in the equation: $2 \begin{bmatrix} 1 & -1 \\ 2 & 3 \end{bmatrix} + 3X = 5 \begin{bmatrix} 2 & 0 \\ -1 & 4 \end{bmatrix} - X$.
(Note: This combines scalar multiplication, addition, and solving for an unknown matrix—common in Board 2-3 mark questions.)

**STEPS:**
- Step 1: Compute the known scalar multiplications on both sides.
  LHS known part: $2 \begin{bmatrix} 1 & -1 \\ 2 & 3 \end{bmatrix} = \begin{bmatrix} 2 & -2 \\ 4 & 6 \end{bmatrix}$.
  RHS known part: $5 \begin{bmatrix} 2 & 0 \\ -1 & 4 \end{bmatrix} = \begin{bmatrix} 10 & 0 \\ -5 & 20 \end{bmatrix}$.
- Step 2: Write the equation with computed matrices:
  $\begin{bmatrix} 2 & -2 \\ 4 & 6 \end{bmatrix} + 3X = \begin{bmatrix} 10 & 0 \\ -5 & 20 \end{bmatrix} - X$.
- Step 3: Bring all $X$ terms to one side, constants to the other. Add $X$ to both sides (additive inverse property):
  $\begin{bmatrix} 2 & -2 \\ 4 & 6 \end{bmatrix} + 3X + X = \begin{bmatrix} 10 & 0 \\ -5 & 20 \end{bmatrix}$.
  $\Rightarrow \begin{bmatrix} 2 & -2 \\ 4 & 6 \end{bmatrix} + 4X = \begin{bmatrix} 10 & 0 \\ -5 & 20 \end{bmatrix}$.
  (Note: $3X + X = 3X + 1X = (3+1)X = 4X$ by distributive property of scalar multiplication over addition, from node `c12_app_cbse_02_009`).
- Step 4: Subtract the constant matrix from both sides (add its negative):
  $4X = \begin{bmatrix} 10 & 0 \\ -5 & 20 \end{bmatrix} - \begin{bmatrix} 2 & -2 \\ 4 & 6 \end{bmatrix} = \begin{bmatrix} 8 & 2 \\ -9 & 14 \end{bmatrix}$.
- Step 5: Multiply both sides by scalar $\frac{1}{4}$ (scalar division):
  $X = \frac{1}{4} \begin{bmatrix} 8 & 2 \\ -9 & 14 \end{bmatrix} = \begin{bmatrix} 2 & 0.5 \\ -2.25 & 3.5 \end{bmatrix}$.

**REASONING:** Solving matrix equations mirrors solving linear equations $ax + b = c - x$, but every operation must respect matrix algebra rules: same order for addition, scalar multiplication distributes over addition, and "division" is multiplication by the reciprocal scalar. The key step is recognizing $3X + X = 4X$ uses the scalar distributive law $(k+p)A = kA + pA$.

**ANSWER:** $X = \begin{bmatrix} 2 & 1/2 \\ -9/4 & 7/2 \end{bmatrix}$ or $\begin{bmatrix} 2 & 0.5 \\ -2.25 & 3.5 \end{bmatrix}$.

## WORKED_EXAMPLE_3
**PROBLEM:** (Competitive Exam Style - JEE Main/CUET) Let $A = \begin{bmatrix} x & 2 \\ 3 & y \end{bmatrix}$, $B = \begin{bmatrix} 1 & -2 \\ -3 & 4 \end{bmatrix}$, $C = \begin{bmatrix} 5 & 0 \\ 0 & 6 \end{bmatrix}$.
If $A + B = C$, find $x$ and $y$.
Now, let $P = \begin{bmatrix} x & 1 \\ 2 & y \end{bmatrix}$ and $Q = \begin{bmatrix} 2 & 3 \\ 4 & 5 \end{bmatrix}$.
Determine if there exist real numbers $x, y$ such that $P + Q = \text{diag}(7, 11)$ (a diagonal matrix with 7, 11 on diagonal).
If yes, find them; if no, explain why.

**STEPS:**
- Step 1: Solve $A + B = C$.
  $\begin{bmatrix} x+1 & 2+(-2) \\ 3+(-3) & y+4 \end{bmatrix} = \begin{bmatrix} 5 & 0 \\ 0 & 6 \end{bmatrix}$.
  $\Rightarrow \begin{bmatrix} x+1 & 0 \\ 0 & y+4 \end{bmatrix} = \begin{bmatrix} 5 & 0 \\ 0 & 6 \end{bmatrix}$.
- Step 2: Equate corresponding elements (Equality of Matrices definition, node `c12_app_cbse_02_006`).
  $x + 1 = 5 \Rightarrow x = 4$.
  $y + 4 = 6 \Rightarrow y = 2$.
  (Off-diagonals are automatically 0=0, consistent).
- Step 3: Analyze second part: $P + Q = \text{diag}(7, 11) = \begin{bmatrix} 7 & 0 \\ 0 & 11 \end{bmatrix}$.
  Compute $P+Q = \begin{bmatrix} x+2 & 1+3 \\ 2+4 & y+5 \end{bmatrix} = \begin{bmatrix} x+2 & 4 \\ 6 & y+5 \end{bmatrix}$.
- Step 4: Equate to target diagonal matrix:
  $\begin{bmatrix} x+2 & 4 \\ 6 & y+5 \end{bmatrix} = \begin{bmatrix} 7 & 0 \\ 0 & 11 \end{bmatrix}$.
- Step 5: Compare off-diagonal elements: $4 = 0$ (from $(1,2)$ position) and $6 = 0$ (from $(2,1)$ position).
  **Contradiction.** $4 \neq 0$ and $6 \neq 0$.
- Step 6: Conclusion. **No such real numbers $x, y$ exist.** The sum $P+Q$ has fixed off-diagonal entries 4 and 6 (independent of $x,y$), which can never be zero. A diagonal matrix requires all off-diagonals to be zero.

**REASONING:** This tests two things: (1) Basic matrix addition + equality to find unknowns (standard Board). (2) **Structural constraint**: The unknowns $x,y$ only appear on the diagonal of $P+Q$. The off-diagonals are *constants* determined by the fixed matrices. If those constants don't match the target structure (diagonal), **no solution exists regardless of $x,y$**. This "fixed off-diagonal" trap is a classic JEE Main/CUET question.

**ANSWER:** Part 1: $x=4, y=2$. Part 2: **No solution exists** because $(P+Q)_{12} = 4 \neq 0$ and $(P+Q)_{21} = 6 \neq 0$, but a diagonal matrix requires these to be 0.

## COMPETENCY_QUESTION_1
**QUESTION:** (Case-Based) A school cafeteria records the number of Vegetarian (V) and Non-Vegetarian (NV) meals served in Morning (M) and Evening (E) shifts over two days. The data is represented as matrices where rows = shifts (M, E) and columns = meal types (V, NV).
Day 1: $D_1 = \begin{bmatrix} 120 & 80 \\ 150 & 100 \end{bmatrix}$
Day 2: $D_2 = \begin{bmatrix} 100 & 90 \\ 140 & 110 \end{bmatrix}$
The manager wants to analyze the **total meals served per shift per meal type** over the two days, and the **change (Day 2 - Day 1)**.
(a) Compute the Total matrix $T$ and the Change matrix $\Delta$.
(b) The manager claims: *"Since total Vegetarian meals on Day 1 (120+150=270) is less than Day 2 (100+140=240), the total Vegetarian meals over two days must be less than 2*270 = 540."* Is the manager's claim correct? Justify using matrix addition properties.
(c) If the cafeteria has a fixed capacity of 300 meals per shift, use matrix addition to check if **any** shift on **any** day exceeded capacity. (Hint: Compare each shift's total meals (V+NV) to 300).

**COMPETENCY:** Problem Solving & Real-World Application (CBSE Competency: "Apply concept of matrix and determinant to formulate and solve real-life situations")

**STEPS:**
- Step 1 (a): $T = D_1 + D_2 = \begin{bmatrix} 220 & 170 \\ 290 & 210 \end{bmatrix}$. $\Delta = D_2 - D_1 = \begin{bmatrix} -20 & 10 \\ -10 & 10 \end{bmatrix}$.
- Step 2 (b): Manager's claim: "Day 1 V total = 270, Day 2 V total = 240. Total V over 2 days < 540?"
  Actual Total V (from $T$) = $T_{M,V} + T_{E,V} = 220 + 290 = 510$.
  $2 \times 270 = 540$. Is $510 < 540$? **Yes**. But the *reasoning* is flawed. The manager compared *Day 1 total* to *Day 2 total* and inferred something about the *sum*. The correct logic: Total V = (Day 1 V) + (Day 2 V) = 270 + 240 = 510. The claim "less than 540" happens to be numerically true, but the reasoning "since Day 2 < Day 1, sum < 2*Day1" is logically invalid (e.g., if Day 2 was 280, sum=550 > 540). Matrix addition is commutative/associative; the sum is just the sum of the two days' column sums.
- Step 3 (c): Check capacity per shift per day.
  Day 1 Shift M: $120+80=200 \le 300$. Shift E: $150+100=250 \le 300$.
  Day 2 Shift M: $100+90=190 \le 300$. Shift E: $140+110=250 \le 300$.
  No shift exceeded capacity.
  (Matrix method: Row sums of $D_1$ and $D_2$ all $\le 300$).

**ANSWER:** (a) $T = \begin{bmatrix} 220 & 170 \\ 290 & 210 \end{bmatrix}$, $\Delta = \begin{bmatrix} -20 & 10 \\ -10 & 10 \end{bmatrix}$. (b) Claim is **numerically true (510 < 540) but logically flawed**. Total V = Sum of Day 1 V and Day 2 V = 270+240=510. The inequality $510 < 540$ holds, but not because "Day 2 < Day 1 implies sum < 2*Day1". (c) No shift exceeded 300 meals. Max was 250 (Day 1 Evening, Day 2 Evening).

**DIFFICULTY:** medium

## COMPETENCY_QUESTION_2
**QUESTION:** (Assertion-Reason + JEE Style) Let $A, B, C$ be three matrices of the same order $m \times n$.
**Assertion (A):** The equation $A + X = B$ has a unique solution for $X$ given by $X = B - A$.
**Reason (R):** Matrix addition is commutative and associative, and every matrix $A$ has a unique additive inverse $-A$ such that $A + (-A) = O$.
(a) Both A and R are true and R is the correct explanation of A.
(b) Both A and R are true but R is NOT the correct explanation of A.
(c) A is true but R is false.
(d) A is false but R is true.

**Then**, consider the matrix equation $2X + 3A = 5B$ where $A, B$ are known $2 \times 2$ matrices.
Using the properties in R, derive the formula for $X$ in terms of $A$ and $B$. State which property is used at each step.

**COMPETENCY:** Logical Reasoning & Algebraic Manipulation (CBSE Competency: "Perform mathematical operations: Addition and subtraction of matrices, properties of addition"; JEE: Algebra of Matrices)

**STEPS:**
- Step 1: Evaluate Assertion (A). Equation: $A + X = B$. Add $-A$ to both sides (additive inverse exists): $(A + X) + (-A) = B + (-A)$. By associativity: $A + (X + (-A)) = B - A$. By commutativity/inverse: $A + (-A) + X = B - A \Rightarrow O + X = B - A \Rightarrow X = B - A$. **Unique** because additive inverse is unique and addition is a function. $\Rightarrow$ **A is True**.
- Step 2: Evaluate Reason (R). States: Commutative, Associative, Unique Additive Inverse ($-A$). All are **standard proven properties** of matrix addition (see NCERT 2.4.2 Properties i, ii, iii, v). $\Rightarrow$ **R is True**.
- Step 3: Does R explain A? **Yes.** The derivation of $X = B - A$ *explicitly uses* associativity (to regroup), commutativity (to bring $-A$ next to $A$), and existence/uniqueness of additive inverse (to cancel $A$). R provides the *algebraic structure* (abelian group) that guarantees the solution exists and is unique. $\Rightarrow$ **Option (a) is correct**.
- Step 4: Derive $X$ for $2X + 3A = 5B$.
  Given: $2X + 3A = 5B$.
  Step 4a: Add $-3A$ to both sides (Additive Inverse property): $2X + 3A + (-3A) = 5B + (-3A)$.
  Step 4b: Associativity: $2X + (3A - 3A) = 5B - 3A$.
  Step 4c: Additive Inverse ($3A - 3A = O$): $2X + O = 5B - 3A$.
  Step 4d: Additive Identity ($Y+O=Y$): $2X = 5B - 3A$.
  Step 4e: Multiply by scalar $1/2$ (Scalar Multiplication property): $X = \frac{1}{2}(5B - 3A) = \frac{5}{2}B - \frac{3}{2}A$.

**ANSWER:** Option **(a)**. Both A and R are true and R correctly explains A.
Derivation: $X = \frac{5}{2}B - \frac{3}{2}A$, using: Additive Inverse (step 4a), Associativity (4b), Additive Inverse (4c), Additive Identity (4d), Scalar Multiplication (4e).

**DIFFICULTY:** hard