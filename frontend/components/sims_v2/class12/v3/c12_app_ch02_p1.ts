import type { SimDef } from '../../engine/types';

/** v3 generated — c12_app_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_app_ch02_p1: SimDef = {
    id: 'v3_c12_app_ch02_p1',
    title: 'Algebra · Part 1/2',
    subtitle: 'This node covers **only** the definition of a matrix, its order, general element.',
    classLevel: 12, subject: 'app', topic: 'Algebra · Part 1/2',
    chapters: ['c12_app_ch02'],
    nodeIds: ['c12_app_cbse_02_001', 'c12_app_cbse_02_002', 'c12_app_cbse_02_003', 'c12_app_cbse_02_004', 'c12_app_cbse_02_005', 'c12_app_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Imagine you are the class monitor and need to record attendance for 5 days across 4 sections — you\'d.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Construct a 2×2 matrix A = [aᵢⱼ] where aᵢⱼ = (i + 2j)². Then identify whether A is diagonal, scalar, or neither. Justify.',
        options: ['a₁₁ = (1+2)² = 9', 'diagonal elements are non-zero', 'order = 6'],
        answer: 'a₁₁ = (1+2)² = 9',
        hook: '**Misconception**: "The order of a matrix is the total number of elements." **Why it happens**: Students see "3×2.',
    },
    teaching: [
        { title: 'Algebra', text: 'A matrix is a rectangular array of numbers, symbols, or expressions arranged in *m* rows and *n* columns, denoted by a capital letter (e.g., A = [aᵢⱼ]ₘₓₙ) where aᵢⱼ is the element at the i-th row and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_app_cbse_02_001', title: 'Algebra',
          scaffold: { problem: 'A school in Mumbai has 3 sections of Class 12 (A, B, C). Each section has students enrolled in 4 streams: Science, Commerce, Humanities.',
            steps: [
            { text: 'Identify rows and columns. Rows = sections (3), Columns = streams (4). So matrix has 3 rows and 4 columns.' },
            { text: 'Write the matrix with sections as rows, streams as columns. Row 1 (Section A): [40, 35, 15, 10].' },
            { text: 'State the order. Order = 3 × 4 (read as "3 by 4"). Total elements = 3 × 4 = 12.' },
            { text: 'Locate a₂₃. Row 2 = Section B, Column 3 = Humanities. Value = 20.' },
            { text: 'Verify consistency. All rows have 4 entries, all columns have 3 entries. Total 12 numbers match 3×4=12.', faded: true, blankAnswer: 'Matrix E = [40 35 15 10; 38 30 20 12; 42 28 18 8]. Order.' }
            ] } },
        { type: 'case', nodeId: 'c12_app_cbse_02_002', title: 'LEARNING OUTCOMES',
          caseStudy: { intro: 'Imagine you open the NCERT book and see a dense page of 16 bullet points — your first thought: "Do I really need all this?" Start by asking: **"Which 3 bullets.',
            decisions: [{ prompt: 'Recall the exact wording of the Learning Outcome bullet that requires you to "Use elementary operations (transformations) to evaluate.', options: [
                { text: 'Correct answer: "Use elementary operations (transformations) to evaluate determinant', outcome: 'Correct answer: "Use elementary operations (transformations) to evaluate determinant value.".' },
                { text: 'Use elementary operations (transformations) to evaluate determinant value', outcome: 'Not quite — Students treat the Learning Outcomes page as a **passive index** ("I\'ve seen these words") rather.', reveals: 'students-treat-the-learning-outcomes' },
                { text: 'Find determinant using cofactor expansion', outcome: 'Not quite — Students treat the Learning Outcomes page as a **passive index** ("I\'ve seen these words") rather.', reveals: 'students-treat-the-learning-outcomes' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_02_003', title: 'Applied Mathematics',
          scaffold: { problem: 'A stationery shop sells pens (₹10), notebooks (₹40), and erasers (₅).',
            steps: [
            { text: 'Identify dimensions. Sales: 2 shops × 3 items → S is 2×3. Price: 3 items × 1 price → P is 3×1.' },
            { text: 'Construct S = [[20, 15, 30], [25, 10, 20]] (rows: Shop A, B; cols: pen, notebook, eraser). P = [[10], [40], [5]].' },
            { text: 'Compute R = SP. R₁₁ = 20×10 + 15×40 + 30×5 = 200 + 600 + 150 = 950. R₂₁ = 25×10 + 10×40 + 20×5 = 250 + 400 + 100 = 750.' },
            { text: 'Tuesday sales = 1.5 × S (scalar multiplication). Tuesday revenue = (1.5S)P = 1.5(SP) = 1.5R (by associativity.' },
            { text: 'Verify by direct computation: 1.5S = [[30, 22.5, 45], [37.5, 15, 30]].', faded: true, blankAnswer: 'Monday revenue: Shop A ₹950, Shop B ₹750. Tuesday revenue.' }
            ] } },
        { type: 'case', nodeId: 'c12_app_cbse_02_004', title: 'Concept map',
          caseStudy: { intro: 'You open the NCERT textbook and see a dense flowchart on page 2.2 titled "Concept Map" with boxes like "Adjoint Matrix," "Cramer\'s Rule," "Hawkins-Simon.',
            decisions: [{ prompt: '**REMEMBER:** List the three distinct methods shown in the NCERT Concept Map for solving a system of simultaneous linear equations, and.', options: [
                { text: '**Correct Answer:** The three methods are: (1) Inverse of Coefficient Matrix Method', outcome: '**Correct Answer:** The three methods are: (1) Inverse of Coefficient Matrix Method (Adjoint.' },
                { text: 'Matrix Multiplication', outcome: 'Not quite — **Misconception:** "The Concept Map is just a summary diagram — I can ignore it and learn each.', reveals: 'misconception-the-concept-map-is' },
                { text: 'Transpose', outcome: 'Not quite — **Misconception:** "The Concept Map is just a summary diagram — I can ignore it and learn each.', reveals: 'misconception-the-concept-map-is' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_02_005', title: 'Introduction',
          scaffold: { problem: 'A small library has 3 shelves (S1, S2, S3) and 4 genres (Fiction, Non-fiction, Sci-Fi, Biography).',
            steps: [
            { text: 'Identify dimensions — shelves = rows (m=3), genres = columns (n=4) → order 3×4.' },
            { text: 'Write general 3×4 matrix template with positions a₁₁ to a₃₄.' },
            { text: 'Substitute formula aᵢⱼ = 2i + j for each of the 12 positions:' },
            { text: 'Write full matrix: A = [[3,4,5,6], [5,6,7,8], [7,8,9,10]]' },
            { text: 'Total books = sum of all elements = (3+4+5+6) + (5+6+7+8) + (7+8+9+10) = 18 + 26 + 34 = 78.', faded: true, blankAnswer: 'Matrix = [[3,4,5,6], [5,6,7,8], [7,8,9,10]], total books.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_02_006', title: 'TYPES OF MATRICES',
          scaffold: { problem: 'A school has three sections (A, B, C) of Class 12. Each section has students opting for three streams: Science, Commerce, Humanities.',
            steps: [
            { text: 'Organize data in a grid. Rows = sections (3), Columns = streams (3). So matrix $M$ is $3 \\times 3$.' },
            { text: 'Write matrix: $M = \\begin{bmatrix} 40 & 25 & 15 \\\\ 35 & 30 & 20 \\\\ 30 & 20 & 25 \\end{bmatrix}$.' },
            { text: 'Identify type: Rows = 3, Columns = 3 → equal → **Square matrix of order 3**.' },
            { text: 'Extract Humanities column (3rd column): $\\begin{bmatrix} 15 \\\\ 20 \\\\ 25 \\end{bmatrix}$.' },
            { text: 'Verify: Column matrix has exactly one column — correct.', faded: true, blankAnswer: 'Full matrix = $\\begin{bmatrix} 40 & 25 & 15 \\\\ 35 & 30 & 20.' }
            ] } },
        { type: 'case', nodeId: 'c12_app_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through Algebra like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? Algebra · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Algebra · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_app_cbse_02_001', difficulty: 'standard',
          question: 'A matrix is a rectangular array of numbers, symbols, or expressions arranged.',
          hint: 'Review "Cartesian product of two sets" (c11_app_cbse_04_003) and "Ordered pair".',
          misconception: '**Misconception**: "The order of a matrix is the total number of elements." **Why it happens**: Students see "3×2.',
          parts: [
                { id: 'a', prompt: 'Write the order and the number of elements of the matrix A = [1 3 -4; 2 5 0] (written in row-wise form: first row 1, 3, -4; second row 2, 5, 0).', answer: 'Order = 2 × 3 (2 rows, 3 columns)',
                  options: ['Order = 2 × 3 (2 rows, 3 columns)', 'order = 6'],
                  hint: 'Review "Cartesian product of two sets" (c11_app_cbse_04_003) and "Ordered pair".',
                  misconception: '**Misconception**: "The order of a matrix is the total number of elements." **Why it happens**: Students see "3×2 matrix has 6 elements".' },
                { id: 'b', prompt: 'Construct a 2×2 matrix A = [aᵢⱼ] where aᵢⱼ = (i + 2j)². Then identify whether A is diagonal, scalar, or neither. Justify.', answer: 'a₁₁ = (1+2)² = 9',
                  options: ['a₁₁ = (1+2)² = 9', 'diagonal elements are non-zero', 'order = 6'],
                  hint: 'Review "Cartesian product of two sets" (c11_app_cbse_04_003) and "Ordered pair".',
                  misconception: '**Misconception**: "The order of a matrix is the total number of elements." **Why it happens**: Students see "3×2 matrix has 6 elements".' },
                { id: 'c', prompt: 'Two matrices X and Y are given: X = [a 3; 2 b], Y = [1 3; 2 4]. If X = Y, find a and b. Now, if Z = [a 3; 2 b] and W = [1 2; 3 4], can Z = W? Explain.', answer: 'X = Y ⇒ a = 1, b = 4 (corresponding elements equal)',
                  options: ['X = Y ⇒ a = 1, b = 4 (corresponding elements equal)', 'both are 2×2 and have same numbers', 'order = 6'],
                  hint: 'Review "Cartesian product of two sets" (c11_app_cbse_04_003) and "Ordered pair".',
                  misconception: '**Misconception**: "The order of a matrix is the total number of elements." **Why it happens**: Students see "3×2 matrix has 6 elements".' }
          ],
            remediations: { 'misconception-the-order-of-a': { steps: ['**Revisit notation**: Have the student write "Order = (rows, columns)" 10 times for 5 different matrices (e.g., [1 2; 3.', '**Physical analogy**: Use a cinema seating chart — "Row F, Seat 4" is not the same as "Row 4, Seat F".', 'Matrix element aᵢⱼ = (row i, column j).', '**Diagnostic re-check**: Give 3 matrices: (a) 2×3, (b) 3×2, (c) 1×6.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception**: "The order of a matrix is the total number of elements." **Why it happens**: Students see "3×2.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Every identity matrix is a scalar matrix, but not every scalar matrix is an identity matrix." Is it true?', answer: '**True.** Identity matrix Iₙ has 1 on diagonal, 0 elsewhere',
                  options: ['**True.** Identity matrix Iₙ has 1 on diagonal, 0 elsewhere', 'False, they are the same', 'order = 6'],
                  hint: 'Review "Cartesian product of two sets" (c11_app_cbse_04_003) and "Ordered pair".',
                  misconception: '**Misconception**: "The order of a matrix is the total number of elements." **Why it happens**: Students see "3×2 matrix has 6 elements".' }
          ],
            remediations: { 'misconception-the-order-of-a': { steps: ['**Revisit notation**: Have the student write "Order = (rows, columns)" 10 times for 5 different matrices (e.g., [1 2; 3.', '**Physical analogy**: Use a cinema seating chart — "Row F, Seat 4" is not the same as "Row 4, Seat F".', 'Matrix element aᵢⱼ = (row i, column j).', '**Diagnostic re-check**: Give 3 matrices: (a) 2×3, (b) 3×2, (c) 1×6.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_02_002', difficulty: 'standard',
          question: 'Learning Outcomes for CBSE Class 12 Applied Mathematics Chapter 2 (Algebra) are.',
          hint: 'If the idea of "matrix as function" is unclear, revisit c11_app_cbse_08_002 (Functions).',
          misconception: 'Students treat the Learning Outcomes page as a **passive index** ("I\'ve seen these words") rather than an **active.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Learning Outcomes for CBSE Class 12 Applied Mathematics Chapter 2 (Algebra) are the 16',
                  options: ['Learning Outcomes for CBSE Class 12 Applied Mathematics Chapter 2 (Algebra) are the 16', 'A matrix is a rectangular array of numbers, symbols, or expressions arranged in *m* rows', 'Matrix algebra defines operations (addition, subtraction, scalar multiplication, matrix', 'A Concept Map for Class 12 Applied Mathematics Algebra (Chapter 2) is a structured visual'],
                  hint: 'If the idea of "matrix as function" is unclear, revisit c11_app_cbse_08_002 (Functions) and.',
                  misconception: 'Students treat the Learning Outcomes page as a **passive index** ("I\'ve seen these words") rather than an **active skills checklist** ("I.' }
          ],
            remediations: { 'students-treat-the-learning-outcomes': { steps: ['Print the 16 bullets on a single A4 sheet.', 'For each bullet, write the **exact node ID** from the sibling list that teaches it (e.g., bullet 1 →.', 'Pick the **three bullets you feel weakest on**; go to their mapped nodes and solve the first two worked examples.', 'If stuck at step 2 of any example, note the **missing prerequisite** (e.g., "don\'t remember cofactor sign pattern") and.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_02_003', difficulty: 'standard',
          question: 'Matrix algebra defines operations (addition, subtraction, scalar.',
          hint: 'If stuck on multiplication, return to c12_app_cbse_02_009 (scalar multiplication) and.',
          misconception: '**Misconception:** "Matrix multiplication is just multiplying corresponding elements like addition." **Why.',
          parts: [
                { id: 'a', prompt: 'What is the order of the matrix resulting from the multiplication of a 3×4 matrix A with a 4×2 matrix B? Is the product BA defined? Why or why not?', answer: 'The product AB has order 3×2 (rows of A × columns of B)',
                  options: ['The product AB has order 3×2 (rows of A × columns of B)', 'also 3×2', 'BA is 4×4 or "also 3×2'],
                  hint: 'If stuck on multiplication, return to c12_app_cbse_02_009 (scalar multiplication) and.',
                  misconception: '**Misconception:** "Matrix multiplication is just multiplying corresponding elements like addition." **Why it happens:** Students see.' }
          ],
            remediations: { 'misconception-matrix-multiplication-is-just': { steps: ['**Immediate remediation:** Have the student compute [[a,b],[c,d]] × [[x],[y]] (2×2 × 2×1) by hand: first element.', 'Emphasize: "Row of first, column of second, multiply pairwise, add." 2.', '**Visual anchor:** Draw a 2×3 matrix and 3×2 matrix with colored rows/columns.', 'Trace the "row 1 of A" meeting "column 1 of B" — that\'s one element of product.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_02_004', difficulty: 'standard',
          question: 'A Concept Map for Class 12 Applied Mathematics Algebra (Chapter 2) is.',
          hint: 'If stuck, review **c11_app_cbse_04_003 (Cartesian Product)** for coordinate indexing.',
          misconception: '**Misconception:** "The Concept Map is just a summary diagram — I can ignore it and learn each topic (Matrices.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND:** The Concept Map shows "Adjoint Matrix" pointing to "Inverse Matrix" which points to "Solving System...', answer: '**Correct Answer:** The formula for inverse is A⁻¹ = (adj A) / |A|',
                  options: ['**Correct Answer:** The formula for inverse is A⁻¹ = (adj A) / |A|', 'Inverse comes first'],
                  hint: 'If stuck, review **c11_app_cbse_04_003 (Cartesian Product)** for coordinate indexing (i,j) and.',
                  misconception: '**Misconception:** "The Concept Map is just a summary diagram — I can ignore it and learn each topic (Matrices, Determinants, Inverse).' }
          ],
            remediations: { 'misconception-the-concept-map-is': { steps: ['**Remediation Path (3 Steps):** 1.', '**Revisit Node c12_app_cbse_02_005 (Introduction)** — Read the "Republic Day Parade" and "Cinema Hall Seating".', '**Revisit Node c12_app_cbse_02_006 (Types of Matrices)** — Focus on **Square Matrix**, **Identity Matrix**, and **Zero.', 'These three are the *anchors* for Determinant, Inverse, and Row Reduction respectively.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_02_005', difficulty: 'standard',
          question: 'A matrix is a rectangular array of numbers, symbols, or expressions arranged.',
          hint: 'Review c11_app_cbse_04_003 (Cartesian Product of Two Sets) — practice writing A × B for.',
          misconception: 'Students treat matrix order as "number of elements in a row × number of elements in a column" but write it as (columns.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A matrix is a rectangular array of numbers, symbols, or expressions arranged in rows and',
                  options: ['A matrix is a rectangular array of numbers, symbols, or expressions arranged in rows and', 'A matrix is a rectangular array of numbers, symbols, or expressions arranged in *m* rows', 'Learning Outcomes for CBSE Class 12 Applied Mathematics Chapter 2 (Algebra) are the 16', 'Matrix algebra defines operations (addition, subtraction, scalar multiplication, matrix'],
                  hint: 'Review c11_app_cbse_04_003 (Cartesian Product of Two Sets) — practice writing A × B for A = {1,2}.',
                  misconception: 'Students treat matrix order as "number of elements in a row × number of elements in a column" but write it as (columns × rows) because they.' }
          ],
            remediations: { 'students-treat-matrix-order-as': { steps: ['Draw a 2×3 grid on paper, label rows R1, R2 and columns C1, C2, C3.', 'Physically point to each cell saying "Row 1, Column 1 → a₁₁", "Row 1, Column 2 → a₁₂" — do all 6.', 'Write order as (number of row labels) × (number of column labels) = 2 × 3.', 'Practice 5 matrices from NCERT Exercise 2.2, Q1-3, each time saying "m rows, n columns → m×n" aloud before writing.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_02_006', difficulty: 'standard',
          question: 'A matrix is a rectangular array of numbers, symbols, or expressions arranged.',
          hint: 'If stuck, review **c12_app_cbse_02_005 (Introduction)** — specifically the definition.',
          misconception: '**Misconception:** "A diagonal matrix with equal diagonal entries is an identity matrix." **Why it happens:** Students.',
          parts: [
                { id: 'a', prompt: 'Identify the type and order of the matrix $A = \\begin{bmatrix} 5 & 0 & 0 \\\\ 0 & 5 & 0 \\\\ 0 & 0 & 5 \\end{bmatrix}$. Is it an identity matrix?', answer: '**Answer:** $A$ is a **scalar matrix** of order $3 \\times 3$',
                  options: ['**Answer:** $A$ is a **scalar matrix** of order $3 \\times 3$', 'identity matrix', 'Zero matrix is a scalar matrix with $k=0$'],
                  hint: 'If stuck, review **c12_app_cbse_02_005 (Introduction)** — specifically the definition of $a_{ij}$.',
                  misconception: '**Misconception:** "A diagonal matrix with equal diagonal entries is an identity matrix." **Why it happens:** Students see the pattern.' },
                { id: 'b', prompt: 'Construct a $2 \\times 2$ matrix $A = [a_{ij}]$ where $a_{ij} = \\frac{i - j}{i + j}$. Then determine whether $A$ is symmetric, skew-symmetric, or neither.', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'Zero matrix is a scalar matrix with $k=0$'],
                  hint: 'If stuck, review **c12_app_cbse_02_005 (Introduction)** — specifically the definition of $a_{ij}$.',
                  misconception: '**Misconception:** "A diagonal matrix with equal diagonal entries is an identity matrix." **Why it happens:** Students see the pattern.' },
                { id: 'c', prompt: 'Given $A = \\begin{bmatrix} 4 & 2 & -1 \\\\ 3 & 5 & 7 \\\\ 1 & -2 & 1 \\end{bmatrix}$, decompose $A$ into the sum of a symmetric matrix $P$ and a skew-symmetric.', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'Zero matrix is a scalar matrix with $k=0$'],
                  hint: 'If stuck, review **c12_app_cbse_02_005 (Introduction)** — specifically the definition of $a_{ij}$.',
                  misconception: '**Misconception:** "A diagonal matrix with equal diagonal entries is an identity matrix." **Why it happens:** Students see the pattern.' }
          ],
            remediations: { 'misconception-a-diagonal-matrix-with': { steps: ['If a student cannot distinguish scalar vs identity matrix: 1.', '**Revisit definition**: Write side-by-side: - Scalar matrix: $kI = \\begin{bmatrix} k & 0 \\\\ 0 & k \\end{bmatrix}$, $k.', '**Drill 5 examples**: Give matrices like $\\begin{bmatrix} -2 & 0 \\\\ 0 & -2 \\end{bmatrix}$, $\\begin{bmatrix} 1 & 0 \\\\ 0.', '**Re-diagnostic**: Ask: "If $A = 4I_3$, what is $A^{-1}$?" Correct: $\\frac{1}{4}I_3$.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
