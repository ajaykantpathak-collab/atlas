import type { SimDef } from '../../engine/types';

/** v3 generated — c12_app_ch02_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_app_ch02_p2: SimDef = {
    id: 'v3_c12_app_ch02_p2',
    title: 'Algebra · Part 2/2',
    subtitle: 'This node covers ONLY the "Check Your Progress" Exercise-A (Section 2.3.2) questions 1–7.',
    classLevel: 12, subject: 'app', topic: 'Algebra · Part 2/2',
    chapters: ['c12_app_ch02'],
    nodeIds: ['c12_app_cbse_02_007', 'c12_app_cbse_02_008', 'c12_app_cbse_02_009', 'c12_app_cbse_02_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Imagine you\'re a data analyst at a Delhi Metro operations center — you receive raw passenger count data from.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A matrix has 12 elements. Write all possible orders this matrix can have. Explain why (2×5) is NOT a possible order.',
        options: ['Correct answer: Possible orders are 1×12, 12×1, 2×6, 6×2, 3×4, 4×3', 'same elements', 'same order AND same corresponding elements'],
        answer: 'Correct answer: Possible orders are 1×12, 12×1, 2×6, 6×2, 3×4, 4×3',
        hook: '**Misconception**: "A zero matrix of order 2×3 and a zero matrix of order 3×2 are equal because all elements are zero.".',
    },
    teaching: [
        { title: 'CHECK YOUR PROGRESS', text: '"Check Your Progress" is a formative assessment checkpoint within the Algebra chapter (Unit 2) that tests a student\'s ability to recall matrix definitions, classify matrices by type and order.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_app_cbse_02_007', title: 'CHECK YOUR PROGRESS',
          scaffold: { problem: 'A small bakery in Pune tracks daily sales of 3 items (bread, cake, cookies) across 2 outlets (Koregaon Park, Baner) for Monday.',
            steps: [
            { text: 'Identify rows (outlets: 2) and columns (items: 3) → order = 2×3. Write matrix M = [[45, 30, 60], [38, 25, 55]].' },
            { text: 'Tuesday = 1.5 × M (scalar multiplication). Compute each element: 1.5×45=67.5, 1.5×30=45, 1.5×60=90; 1.5×38=57.' },
            { text: 'Classify M: rows=2, columns=3 → not equal → rectangular matrix. Not square, so cannot be diagonal/scalar/identity.' },
            { text: 'Verify order consistency: M is 2×3, T is 2×3 — scalar multiplication preserves order.' },
            { text: 'Interpret: Fractional sales (67.5 breads) imply average/expected values — acceptable in planning models.', faded: true, blankAnswer: '(i) M = [[45, 30, 60], [38, 25, 55]], order 2×3. (ii).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_02_008', title: 'ALGEBRA OF MATRICES',
          scaffold: { problem: 'A small Kirana store sells 3 items: Rice (₹40/kg), Dal (₹80/kg), Oil (₹120/L). On Monday, sales were: 50 kg Rice, 20 kg Dal, 10 L Oil.',
            steps: [
            { text: 'Define matrices. S = [[50, 20, 10], [40, 25, 15]] (2×3). P = [[40], [80], [120]] (3×1).' },
            { text: 'Compute SP entry (1,1) = Row 1 of S • Column 1 of P = 50×40 + 20×80 + 10×120 = 2000 + 1600 + 1200 = 4800.' },
            { text: 'Compute SP entry (2,1) = Row 2 of S • Column 1 of P = 40×40 + 25×80 + 15×120 = 1600 + 2000 + 1800 = 5400.' },
            { text: 'Result SP = [[4800], [5400]]. Monday revenue = ₹4800, Tuesday = ₹5400.' },
            { text: 'Verify manually: Mon = 50×40 + 20×80 + 10×120 = 4800 ✓. Tue = 40×40 + 25×80 + 15×120 = 5400 ✓.', faded: true, blankAnswer: 'SP = [[4800], [5400]]; Monday revenue ₹4800, Tuesday.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_02_009', title: 'MULTIPLICATION OF A MATRIX BY A SCALAR VALUE',
          scaffold: { problem: 'A small factory produces two products (P1, P2) using three raw materials (R1, R2, R3).',
            steps: [
            { text: 'Identify given matrix M (2×3) and scalar k = 2.5. Compute kM by multiplying each element: 2.5 × [[2,3,1],[4,1,2]].' },
            { text: 'Verify order remains 2×3. Each row still represents a product, each column a material.' },
            { text: 'Cost vector C = [50, 30, 20] (1×3 row matrix). To get cost per product, compute (kM) × Cᵀ?' },
            { text: 'Compute cost for P1: 5×50 + 7.5×30 + 2.5×20 = 250 + 225 + 50 = ₹525.' },
            { text: 'Interpret: Scaling production by 2.5 scales material needs by 2.5, so cost per unit also scales by 2.5.', faded: true, blankAnswer: 'New requirement matrix = [[5, 7.5, 2.5], [10, 2.5, 5]].' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_02_010', title: 'ADDITION OF MATRICES',
          scaffold: { problem: '** A small business owner tracks monthly sales (in ₹1000s) of three products (P1, P2, P3) across two branches (Branch A, Branch B) for.',
            steps: [
            { text: 'Verify conformability. Both $J$ and $F$ are $2 \\times 3$ (2 branches, 3 products).' },
            { text: 'Compute $T = J + F$ element-wise.' },
            { text: 'Compute $D = F - J = F + (-J)$.' },
            { text: 'Interpret $D$. Negative entries mean sales *decreased* in Feb vs Jan.', faded: true, blankAnswer: '** Total Sales $T = \\begin{bmatrix} 22 & 20 & 25 \\\\ 25 & 13.' }
            ] } },
        { type: 'case', nodeId: 'c12_app_cbse_02_009', title: 'MULTIPLICATION OF A MATRIX BY A SCALAR VALUE',
          caseStudy: { intro: 'Start with the baker’s story: "On Monday, the baker uses matrix A to track ingredients for two breads. On Sunday, demand triples.',
            decisions: [{ prompt: 'What is the result of multiplying the matrix A = [[2, -1], [0, 3]] by the scalar k = -4? Write the resulting matrix and state its order.', options: [
                { text: 'The result is -4A = [[-8, 4], [0, -12]], a 2×2 matrix', outcome: 'The result is -4A = [[-8, 4], [0, -12]], a 2×2 matrix. A wrong answer (e.g., only multiplying.' },
                { text: 'multiply row by column', outcome: 'Not quite — **Misconception:** "Scalar multiplication means multiplying the scalar only with the diagonal.', reveals: 'misconception-scalar-multiplication-means-multip' },
                { text: '"multiply row by column"', outcome: 'Not quite — **Misconception:** "Scalar multiplication means multiplying the scalar only with the diagonal.', reveals: 'misconception-scalar-multiplication-means-multip' }
            ] }] } },
        { type: 'case', nodeId: 'c12_app_cbse_02_010', title: 'You made it',
          caseStudy: { intro: 'You finished Algebra — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_app_cbse_02_007', difficulty: 'standard',
          question: '"Check Your Progress" is a formative assessment checkpoint within the Algebra.',
          hint: 'If stuck, review "order of a matrix" and "general element aᵢⱼ" in c12_app_cbse_02_005.',
          misconception: '**Misconception**: "A zero matrix of order 2×3 and a zero matrix of order 3×2 are equal because all elements are zero.".',
          parts: [
                { id: 'a', prompt: 'A matrix has 12 elements. Write all possible orders this matrix can have. Explain why (2×5) is NOT a possible order.', answer: 'Correct answer: Possible orders are 1×12, 12×1, 2×6, 6×2, 3×4, 4×3',
                  options: ['Correct answer: Possible orders are 1×12, 12×1, 2×6, 6×2, 3×4, 4×3', 'same elements', 'same order AND same corresponding elements', 'assertion-reason'],
                  hint: 'If stuck, review "order of a matrix" and "general element aᵢⱼ" in c12_app_cbse_02_005.',
                  misconception: '**Misconception**: "A zero matrix of order 2×3 and a zero matrix of order 3×2 are equal because all elements are zero." **Why it\'s wrong**.' },
                { id: 'b', prompt: 'Given matrix A = [aᵢⱼ]₂ₓ₃ where aᵢⱼ = (i − 2j)². Construct the full matrix A. Then identify: Is A a square matrix? A diagonal matrix? A symmetric matrix?', answer: 'Correct construction: i=1,j=1: (1−2)²=1',
                  options: ['Correct construction: i=1,j=1: (1−2)²=1', 'same elements', 'same order AND same corresponding elements', 'assertion-reason'],
                  hint: 'If stuck, review "order of a matrix" and "general element aᵢⱼ" in c12_app_cbse_02_005.',
                  misconception: '**Misconception**: "A zero matrix of order 2×3 and a zero matrix of order 3×2 are equal because all elements are zero." **Why it\'s wrong**.' },
                { id: 'c', prompt: 'Matrix P = [[5, 0], [0, 5]] and Matrix Q = [[1, 0], [0, 1]]. A student says: "Both are diagonal matrices with equal diagonal elements, so both are scalar.', answer: 'Error: Q is an identity matrix (I₂)',
                  options: ['Error: Q is an identity matrix (I₂)', 'scalar = equal diagonal', 'identity = 1 on diagonal', 'same elements'],
                  hint: 'If stuck, review "order of a matrix" and "general element aᵢⱼ" in c12_app_cbse_02_005.',
                  misconception: '**Misconception**: "A zero matrix of order 2×3 and a zero matrix of order 3×2 are equal because all elements are zero." **Why it\'s wrong**.' }
          ],
            remediations: { 'misconception-a-zero-matrix-of': { steps: ['If a student fails the diagnostic questions: 1.', '**Revisit c12_app_cbse_02_006 (TYPES OF MATRICES)** — re-read definitions of each type with the hierarchy diagram.', '**Re-do NCERT Example 3 and Example 4** (Section 2.3) step-by-step: Example 3 (possible orders for 4 elements), Example.', 'Do not just read — write every substitution.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception**: "A zero matrix of order 2×3 and a zero matrix of order 3×2 are equal because all elements are zero.".',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "For any matrix A of order m×n, the number of distinct matrices that can be formed using only the numbers {2, 0, −1} is 3^(m×n)." Is this.', answer: 'The claim is **false** as a universal statement',
                  options: ['The claim is **false** as a universal statement', 'always true', 'same elements', 'same order AND same corresponding elements'],
                  hint: 'If stuck, review "order of a matrix" and "general element aᵢⱼ" in c12_app_cbse_02_005.',
                  misconception: '**Misconception**: "A zero matrix of order 2×3 and a zero matrix of order 3×2 are equal because all elements are zero." **Why it\'s wrong**.' }
          ],
            remediations: { 'misconception-a-zero-matrix-of': { steps: ['If a student fails the diagnostic questions: 1.', '**Revisit c12_app_cbse_02_006 (TYPES OF MATRICES)** — re-read definitions of each type with the hierarchy diagram.', '**Re-do NCERT Example 3 and Example 4** (Section 2.3) step-by-step: Example 3 (possible orders for 4 elements), Example.', 'Do not just read — write every substitution.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_02_008', difficulty: 'standard',
          question: 'Algebra of matrices defines the rules for performing arithmetic operations.',
          hint: 'If stuck on multiplication, revisit vector dot product (Class 11 Physics/Math) and.',
          misconception: 'Students treat matrix multiplication as element-wise multiplication (Hadamard product) because it works that way for.',
          parts: [
                { id: 'a', prompt: 'State the necessary and sufficient condition for two matrices A (of order m × n) and B (of order p × q) to be added. What is the order of the sum matrix?', answer: 'Condition: m = p and n = q (same order)',
                  options: ['Condition: m = p and n = q (same order)', 'number of columns of A = rows of B'],
                  hint: 'If stuck on multiplication, revisit vector dot product (Class 11 Physics/Math) and practice.',
                  misconception: 'Students treat matrix multiplication as element-wise multiplication (Hadamard product) because it works that way for addition and scalar.' }
          ],
            remediations: { 'students-treat-matrix-multiplication-as': { steps: ['Have the student physically write out the row-column dot product for a 2×2 × 2×2 case: "Row 1 of A: [a b], Column 1.', 'Use a colored-grid method — highlight row i of A in yellow, column j of B in blue, their intersection is the computed.', 'Give 3 practice problems where element-wise and correct multiplication give DIFFERENT results (avoid diagonal/identity.', 'Ask student to explain in words: "What does the (2,3) entry of AB represent if A is items×ingredients and B.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_02_009', difficulty: 'standard',
          question: 'For a matrix **A = [aᵢⱼ]** of order **m × n** and a scalar **k** (a real.',
          hint: 'If stuck, review "Types of Matrices" (c12_app_cbse_02_006) for order and element.',
          misconception: '**Misconception:** "Scalar multiplication means multiplying the scalar only with the diagonal elements of the matrix.',
          parts: [
                { id: 'a', prompt: 'What is the result of multiplying the matrix A = [[2, -1], [0, 3]] by the scalar k = -4? Write the resulting matrix and state its order.', answer: 'The result is -4A = [[-8, 4], [0, -12]], a 2×2 matrix',
                  options: ['The result is -4A = [[-8, 4], [0, -12]], a 2×2 matrix', 'multiply row by column', '"multiply row by column"'],
                  hint: 'If stuck, review "Types of Matrices" (c12_app_cbse_02_006) for order and element notation, and.',
                  misconception: '**Misconception:** "Scalar multiplication means multiplying the scalar only with the diagonal elements of the matrix, or multiplying the.' },
                { id: 'b', prompt: 'Explain in your own words why the property (k + p)A = kA + pA holds true for any matrix A and scalars k, p.', answer: 'The property holds',
                  options: ['The property holds', 'multiply row by column', '"multiply row by column"'],
                  hint: 'If stuck, review "Types of Matrices" (c12_app_cbse_02_006) for order and element notation, and.',
                  misconception: '**Misconception:** "Scalar multiplication means multiplying the scalar only with the diagonal elements of the matrix, or multiplying the.' },
                { id: 'c', prompt: 'If X = [[1, 2], [3, 4]] and Y = [[5, 6], [7, 8]], find the matrix Z such that 3X - 2Y = 4Z. Show all steps.', answer: 'Step 1: Compute 3X = [[3, 6], [9, 12]]',
                  options: ['Step 1: Compute 3X = [[3, 6], [9, 12]]', 'multiply row by column', '"multiply row by column"'],
                  hint: 'If stuck, review "Types of Matrices" (c12_app_cbse_02_006) for order and element notation, and.',
                  misconception: '**Misconception:** "Scalar multiplication means multiplying the scalar only with the diagonal elements of the matrix, or multiplying the.' },
                { id: 'd', prompt: 'Given A = [[a, b], [c, d]] and B = [[p, q], [r, s]], prove that k(A - B) = kA - kB for any scalar k by comparing the (1,1) and (2,2) elements of both sides.', answer: 'LHS (1,1): k(a - p) = ka - kp',
                  options: ['LHS (1,1): k(a - p) = ka - kp', 'multiply row by column', '"multiply row by column"'],
                  hint: 'If stuck, review "Types of Matrices" (c12_app_cbse_02_006) for order and element notation, and.',
                  misconception: '**Misconception:** "Scalar multiplication means multiplying the scalar only with the diagonal elements of the matrix, or multiplying the.' }
          ],
            remediations: { 'misconception-scalar-multiplication-means-multip': { steps: ['If the student shows the diagonal-only misconception: 1.', '**Revisit definition**: Go back to node c12_app_cbse_02_009\'s definition: "kA is obtained by multiplying *each element*.', '**Contrast with scalar matrix**: Use node c12_app_cbse_02_006 (Types of Matrices) — show a scalar matrix.', 'S×A scales rows; kA scales all elements.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_02_010', difficulty: 'standard',
          question: 'For two matrices $A = [a_{ij}]$ and $B = [b_{ij}]$ of the same order $m \\times.',
          hint: 'If stuck on "same order" requirement: Revisit **c12_app_cbse_02_005 (Introduction)** for.',
          misconception: '**The "Total Elements" Trap:** Students frequently believe that if two matrices have the **same total number.',
          parts: [
                { id: 'a', prompt: 'Find the matrix $X$ such that $2A + 3X = 5B$, where $A = \\begin{bmatrix} 2 & -1 \\\\ 0 & 3 \\end{bmatrix}$ and $B = \\begin{bmatrix} 1 & 4 \\\\ -2 & 0.', answer: '**Correct Answer:** **Step 1:** Compute $2A = 2 \\begin{bmatrix} 2 & -1 \\\\ 0 & 3',
                  options: ['**Correct Answer:** **Step 1:** Compute $2A = 2 \\begin{bmatrix} 2 & -1 \\\\ 0 & 3', 'divide matrices'],
                  hint: 'If stuck on "same order" requirement: Revisit **c12_app_cbse_02_005 (Introduction)** for the.',
                  misconception: '**The "Total Elements" Trap:** Students frequently believe that if two matrices have the **same total number of elements** (e.g., both have.' },
                { id: 'b', prompt: 'Let $A, B, C$ be three matrices of the same order $m \\times n$.', answer: '**Correct Answer:** Let $A = [a_{ij}], B = [b_{ij}], C = [c_{ij}]$',
                  options: ['**Correct Answer:** Let $A = [a_{ij}], B = [b_{ij}], C = [c_{ij}]$', 'Hence proved'],
                  hint: 'If stuck on "same order" requirement: Revisit **c12_app_cbse_02_005 (Introduction)** for the.',
                  misconception: '**The "Total Elements" Trap:** Students frequently believe that if two matrices have the **same total number of elements** (e.g., both have.' }
          ],
            remediations: { 'the-total-elements-trap-students': { steps: ['**Immediate Diagnosis:** Give the student two matrices: $P = \\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{bmatrix}$ ($2.', 'Ask: "Add $P$ and $Q$." If they produce a $2 \\times 3$ or $3 \\times 2$ matrix, the misconception is confirmed.', '**Visual Remediation:** Draw two grids on paper: a $2$-row, $3$-column grid for $P$ and a $3$-row, $2$-column grid for.', 'Ask the student to place a finger on $p_{13}$ (value 3) and find the "corresponding" element in $Q$.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
