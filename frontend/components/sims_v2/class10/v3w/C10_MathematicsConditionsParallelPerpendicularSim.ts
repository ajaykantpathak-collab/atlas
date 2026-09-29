import type { SimDef } from '../../engine/types';
import C10_MathematicsConditionsParallelPerpendicularSim from '../../../simulations/c6_12/C10_MathematicsConditionsParallelPerpendicularSim';

/** v3 wrapped master — C10_MathematicsConditionsParallelPerpendicularSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_mathematicsconditionsparallelperpendicularsim: SimDef = {
    id: 'v3w_c10_mathematicsconditionsparallelperpendicularsim',
    title: 'Basic Proportionality Theorem (Thales\' Theorem)',
    subtitle: 'Covers the Basic Proportionality Theorem (BPT) statement, proof using area of triangles,.',
    classLevel: 10, subject: 'mathematics', topic: 'Basic Proportionality Theorem (Thales\' Theorem)',
    chapters: [],
    nodeIds: ['c10_math_cbse_06_003', 'c10_math_cbse_06_004', 'c10_math_cbse_12_006', 'c10_math_cbse_03_001', 'c10_math_cbse_03_002', 'c10_math_cbse_03_003', 'c10_math_cbse_03_007', 'c10_math_cbse_07_010', 'c10_math_cbse_06_009', 'c10_math_cbse_07_001', 'c10_math_cbse_07_003', 'c10_math_cbse_07_005', 'c10_math_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine you are designing a triangular garden plot with vertices at three trees.', goal: 'Master Basic Proportionality Theorem (Thales\' Theorem).' },
    discovery: {
        question: 'In ΔPQR, a line ST is drawn intersecting PQ at S and PR at T. A student writes PS/SQ = PT/TR and claims BPT applies.',
        options: ['The student must verify that ST || QR', 'triangle must be similar', 'angles must be equal'],
        answer: 'The student must verify that ST || QR',
        hook: 'Students write AD/AB = AE/AC instead of AD/DB = AE/EC. They confuse the internal division ratio (part-to-part) with the.',
    },
    teaching: [
        { title: 'If a line is drawn parallel to one side of a.', text: 'If a line is drawn parallel to one side of a triangle intersecting the other two sides at distinct points, then it divides those two sides in the same ratio.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_math_cbse_06_003', title: 'If a line is drawn parallel to one side.',
          scaffold: { problem: 'A triangular plot of land ΔPQR has a boundary PQ = 20 m. A farmer wants to build a fence ST parallel to QR, with S on PQ and T on PR.',
            steps: [
            { text: 'Identify the given: In ΔPQR, ST || QR. PS = 8 m, SQ = 12 m, PT = 10 m, QR = 15 m. Need TR and ST.' },
            { text: 'Apply BPT: PS/SQ = PT/TR → 8/12 = 10/TR.' },
            { text: 'Simplify and solve for TR: 8/12 = 2/3. So 2/3 = 10/TR → cross-multiply: 2 × TR = 3 × 10 → 2TR = 30 → TR = 15 m.' },
            { text: 'Find ST using similarity (ΔPST ~ ΔPQR): PS/PQ = ST/QR. PQ = PS + SQ = 8 + 12 = 20 m.' },
            { text: 'Verify: PS/SQ = 8/12 = 2/3, PT/TR = 10/15 = 2/3 ✓. ST = 6 m, QR = 15 m, ratio 6/15 = 2/5 = PS/PQ ✓.', faded: true, blankAnswer: 'TR = 15 m, Fence length ST = 6 m.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_06_004', title: 'The Converse of Basic Proportionality.',
          scaffold: { problem: 'In ΔPQR, points S and T lie on sides PQ and PR respectively. PS = 6 cm, SQ = 9 cm, PT = 8 cm, TR = 12 cm.',
            steps: [
            { text: 'Write the given data clearly: In ΔPQR, S lies on PQ, T lies on PR. PS = 6 cm, SQ = 9 cm, PT = 8 cm, TR = 12 cm.' },
            { text: 'Compute the ratios PS/SQ and PT/TR. PS/SQ = 6/9 = 2/3. PT/TR = 8/12 = 2/3.' },
            { text: 'State the observation: PS/SQ = PT/TR = 2/3. Note that S lies on segment PQ and T lies on segment PR (internal division).' },
            { text: 'Invoke the Converse of Basic Proportionality Theorem: If a line divides two sides of a triangle in the same ratio, then.' },
            { text: 'Conclude: Therefore, ST ∥ QR. (Hence proved.)', faded: true, blankAnswer: 'ST ∥ QR (proved using Converse of BPT)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_12_006', title: 'A frustum of a right circular cone is.',
          scaffold: { problem: 'A right circular cone of height 24 cm and base radius 10 cm is cut by a plane parallel to the base at a distance of 8 cm from the base.',
            steps: [
            { text: 'Identify the original cone dimensions: Height H = 24 cm, Base radius R = 10 cm.' },
            { text: 'Use similarity of triangles to find the top radius r of the frustum.' },
            { text: 'Solve for r: r = (10 × 16)/24 = 160/24 = 20/3 ≈ 6.67 cm.' },
            { text: 'Find the slant height l of the frustum. First find original cone slant height L = √(H² + R²) = √(24² + 10²) = √(576 +.' },
            { text: 'State the frustum dimensions clearly: Larger base radius R = 10 cm, Smaller top radius r = 20/3 cm (≈ 6.67 cm),.', faded: true, blankAnswer: 'R = 10 cm, r = 20/3 cm (6.67 cm), h = 8 cm, l = 26/3 cm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_03_001', title: 'A pair of linear equations in two.',
          scaffold: { problem: 'Ritu goes to a bookstore and buys 5 pens and 3 pencils for ₹65. Her friend buys 2 pens and 4 pencils for ₹50.',
            steps: [
            { text: 'Define variables. Let cost of one pen = \\(x\\) rupees, cost of one pencil = \\(y\\) rupees.' },
            { text: 'Form equations from the given data. Ritu: \\(5x + 3y = 65\\). Friend: \\(2x + 4y = 50\\).' },
            { text: 'Find intercepts for first equation \\(5x + 3y = 65\\). Put \\(x=0 \\Rightarrow 3y=65 \\Rightarrow y=65/3 \\approx 21.67\\) →.' },
            { text: 'Find intercepts for second equation \\(2x + 4y = 50\\). Put \\(x=0 \\Rightarrow 4y=50 \\Rightarrow y=12.5\\) → point C(0,.' },
            { text: 'Plot points A, B and draw line 1. Plot points C, D and draw line 2 on the same graph. Observe intersection point.' },
            { text: 'State answer with units. Cost of one pen = ₹55/7 ≈ ₹7.86, cost of one pencil = ₹60/7 ≈ ₹8.57.', faded: true, blankAnswer: 'Pen = ₹55/7 (approx ₹7.86), Pencil = ₹60/7 (approx ₹8.57)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_03_002', title: 'A system of two linear equations in two.',
          scaffold: { problem: 'Determine whether the system 2x + 3y = 8 and 4x − y = 2 has a unique solution. If so, find it.',
            steps: [
            { text: 'Check the ratio condition. a₁/a₂ = 2/4 = 1/2, b₁/b₂ = 3/(−1) = −3. Since 1/2 ≠ −3, the system has a unique solution.' },
            { text: 'Solve by substitution. From the second equation: y = 4x − 2.' },
            { text: 'Substitute into the first: 2x + 3(4x − 2) = 8 ⇒ 2x + 12x − 6 = 8 ⇒ 14x = 14 ⇒ x = 1.' },
            { text: 'Find y: y = 4(1) − 2 = 2. Solution: (1, 2).' },
            { text: 'Verify: 2(1) + 3(2) = 2 + 6 = 8 ✓ and 4(1) − 2 = 2 ✓.', faded: true, blankAnswer: 'The system has a unique solution: x = 1, y = 2.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_03_003', title: 'A pair of linear equations in two.',
          scaffold: { problem: 'A stationery shop sells pens and notebooks. On Monday, 3 pens and 4 notebooks cost ₹110. On Tuesday, 6 pens and 8 notebooks cost ₹210.',
            steps: [
            { text: 'Let the cost of one pen be ₹\\(x\\) and one notebook be ₹\\(y\\). Write the two equations from the given data: \\(3x + 4y =.' },
            { text: 'Convert both equations to standard form \\(ax + by + c = 0\\): \\(3x + 4y - 110 = 0\\) and \\(6x + 8y - 210 = 0\\).' },
            { text: 'Identify coefficients: \\(a_1 = 3, b_1 = 4, c_1 = -110\\); \\(a_2 = 6, b_2 = 8, c_2 = -210\\).' },
            { text: 'Compute the three ratios: \\(\\frac{a_1}{a_2} = \\frac{3}{6} = \\frac{1}{2}\\), \\(\\frac{b_1}{b_2} = \\frac{4}{8} =.' },
            { text: 'Compare the ratios: \\(\\frac{1}{2} = \\frac{1}{2} \\neq \\frac{11}{21}\\).' },
            { text: 'Conclude: The system is inconsistent — the lines are parallel.', faded: true, blankAnswer: 'The system is inconsistent (parallel lines). No solution.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_math_cbse_06_004', title: 'Identify each idea',
          dissect: { specimen: 'Basic Proportionality Theorem (Thales\' Theorem)', spots: [
            { id: 's1', label: 'If a line is drawn', prompt: 'Which idea is this? — If a line is drawn parallel to one side of a triangle intersecting the other two sides at.', answer: 'If a line is drawn', options: ['If a line is drawn', 'The Converse of Basic Proportionality', 'A frustum of a right', 'A pair of linear equations'] },
            { id: 's2', label: 'The Converse of Basic Proportionality', prompt: 'Which idea is this? — The Converse of Basic Proportionality Theorem states: If a line divides any two sides of.', answer: 'The Converse of Basic Proportionality', options: ['The Converse of Basic Proportionality', 'If a line is drawn', 'A frustum of a right', 'A pair of linear equations'] },
            { id: 's3', label: 'A frustum of a right', prompt: 'Which idea is this? — A frustum of a right circular cone is the solid obtained when a right circular cone is.', answer: 'A frustum of a right', options: ['A frustum of a right', 'If a line is drawn', 'The Converse of Basic Proportionality', 'A pair of linear equations'] },
            { id: 's4', label: 'A pair of linear equations', prompt: 'Which idea is this? — A pair of linear equations in two variables is represented graphically by two straight.', answer: 'A pair of linear equations', options: ['A pair of linear equations', 'If a line is drawn', 'The Converse of Basic Proportionality', 'A frustum of a right'] },
            { id: 's5', label: 'A system of two linear', prompt: 'Which idea is this? — A system of two linear equations in two variables is consistent if it has at least one.', answer: 'A system of two linear', options: ['A system of two linear', 'If a line is drawn', 'The Converse of Basic Proportionality', 'A frustum of a right'] }
          ] } }
    ],
    explore: { component: C10_MathematicsConditionsParallelPerpendicularSim, prompt: 'Explore the interactive — Basic Proportionality Theorem (Thales\' Theorem)' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_06_003', difficulty: 'standard',
          question: 'If a line is drawn parallel to one side of a triangle intersecting the other.',
          hint: 'If stuck, revisit c6_math_ch06_063 (proportion and cross-multiplication) and.',
          misconception: 'Students write AD/AB = AE/AC instead of AD/DB = AE/EC. They confuse the internal division ratio (part-to-part) with the.',
          parts: [
                { id: 'a', prompt: 'In ΔPQR, a line ST is drawn intersecting PQ at S and PR at T. A student writes PS/SQ = PT/TR and claims BPT applies.', answer: 'The student must verify that ST || QR',
                  options: ['The student must verify that ST || QR', 'triangle must be similar', 'angles must be equal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write AD/AB = AE/AC instead of AD/DB = AE/EC. They confuse the internal division ratio (part-to-part) with the whole-side ratio.' },
                { id: 'b', prompt: 'In ΔXYZ, line PQ intersects XY at P and XZ at Q. Given XP = 3 cm, PY = 6 cm, XQ = 4 cm, QZ = 8 cm. Can you conclude PQ || YZ?', answer: 'Yes, PQ || YZ',
                  options: ['Yes, PQ || YZ', 'cannot conclude without converse theorem'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write AD/AB = AE/AC instead of AD/DB = AE/EC. They confuse the internal division ratio (part-to-part) with the whole-side ratio.' }
          ],
            remediations: { 'students-write-ad-ab-ae': { steps: ['If a student uses AD/AB = AE/AC, clarify: "Both formulas work for internal division because of componendo, but AD/DB =.', '2) Measure AD, DB, AE, EC.', '3) Show AD/DB ≠ AE/EC numerically.', '4) Revisit the area proof: "ΔBDE and ΔDEC have equal area ONLY because they lie between parallels DE and BC.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_06_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write AD/AB = AE/AC instead of AD/DB = AE/EC. They confuse the internal division ratio (part-to-part) with the.',
          parts: [
                { id: 'a', prompt: 'In ΔXYZ, line PQ intersects XY at P and XZ at Q. Given XP = 3 cm, PY = 6 cm, XQ = 4 cm, QZ = 8 cm. Can you conclude PQ || YZ?', answer: 'Yes, PQ || YZ',
                  options: ['Yes, PQ || YZ', 'cannot conclude without converse theorem'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write AD/AB = AE/AC instead of AD/DB = AE/EC. They confuse the internal division ratio (part-to-part) with the whole-side ratio.' }
          ],
            remediations: { 'students-write-ad-ab-ae': { steps: ['If a student uses AD/AB = AE/AC, clarify: "Both formulas work for internal division because of componendo, but AD/DB =.', '2) Measure AD, DB, AE, EC.', '3) Show AD/DB ≠ AE/EC numerically.', '4) Revisit the area proof: "ΔBDE and ΔDEC have equal area ONLY because they lie between parallels DE and BC.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_06_004', difficulty: 'standard',
          question: 'The Converse of Basic Proportionality Theorem states: If a line divides any two.',
          hint: 'If stuck, revisit c10_math_cbse_06_003 (BPT statement and proof) and c6_math_ch06_063.',
          misconception: 'Students confuse the Converse of BPT with BPT itself. The exact wrong step: In a problem where they are given AD/DB =.',
          parts: [
                { id: 'a', prompt: 'In ΔABC, points D and E lie on AB and AC respectively. AD = 4 cm, DB = 6 cm, AE = 5 cm, EC = 7.5 cm.', answer: 'Yes, the student is correct',
                  options: ['Yes, the student is correct', 'internal division'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse the Converse of BPT with BPT itself. The exact wrong step: In a problem where they are given AD/DB = AE/EC and asked to.' }
          ],
            remediations: { 'students-confuse-the-converse-of': { steps: ['Draw two triangles side by side. Label one "BPT: Given DE ∥ BC → Prove AD/DB = AE/EC".', 'Make them say aloud: "Parallel gives ratio" vs "Ratio gives parallel".', 'Give 5 mixed problems — some with "Given parallel", some with "Given ratio" — and have them identify which theorem to.', 'For the external division error, draw a triangle with D on AB extended. Ask: "Is D on side AB?" No.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_12_006', difficulty: 'standard',
          question: 'A frustum of a right circular cone is the solid obtained when a right circular.',
          hint: 'If stuck, revisit Class 9 similar triangles (c9_math_ch4_8) and Class 8 visualising solid.',
          misconception: 'Students confuse the slant height l of the frustum with the slant height L of the original cone, and incorrectly use L.',
          parts: [
                { id: 'a', prompt: 'A solid is formed by cutting a right circular cone of height 12 cm and base radius 6 cm with a plane parallel to the base at a distance of 4 cm from the base.', answer: 'The remaining solid is called a frustum of a right circular cone',
                  options: ['The remaining solid is called a frustum of a right circular cone', 'truncated cone', 'one circular face'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse the slant height l of the frustum with the slant height L of the original cone, and incorrectly use L in place of l when.' }
          ],
            remediations: { 'students-confuse-the-slant-height': { steps: ['If the student confuses l and L: (1) Draw the full original cone with vertex V, base radius R, height H, slant height L.', '(2) Draw the cutting plane at height h from base, creating top radius r.', '(3) Label the removed top cone: height H-h, radius r, slant height l₁.', '(4) Show clearly on the diagram: frustum slant height l = L - l₁.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_03_001', difficulty: 'standard',
          question: 'A pair of linear equations in two variables is represented graphically by two.',
          hint: 'If stuck, revisit Class 9 node c9_math_ch2_5 (Graph of a Linear Equation in Two.',
          misconception: 'Students often think that if the coefficients of \\(x\\) and \\(y\\) are different numbers, the lines must intersect.',
          parts: [
                { id: 'a', prompt: 'What is the geometrical representation of the linear equation \\(2x + 3y = 12\\) on the Cartesian plane?', answer: 'The equation \\(2x + 3y = 12\\) represents a straight line',
                  options: ['The equation \\(2x + 3y = 12\\) represents a straight line', 'it represents a point', 'a curve'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that if the coefficients of \\(x\\) and \\(y\\) are different numbers, the lines must intersect.' },
                { id: 'b', prompt: 'Two lines are drawn on the same graph: Line A passes through (0,2) and (3,0). Line B passes through (0,4) and (6,0).', answer: 'Line A has equation \\(2x + 3y = 6\\) (intercepts 3 and 2)',
                  options: ['Line A has equation \\(2x + 3y = 6\\) (intercepts 3 and 2)', 'one solution', 'infinite solutions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that if the coefficients of \\(x\\) and \\(y\\) are different numbers, the lines must intersect.' }
          ],
            remediations: { 'if-the-coefficients-of-x': { steps: ['If a student makes the ratio error, do this remediation: 1.', 'Write both equations in standard form \\(a_1x + b_1y + c_1 = 0\\) and \\(a_2x + b_2y + c_2 = 0\\).', 'Compute the three ratios \\(a_1/a_2, b_1/b_2, c_1/c_2\\) as fractions in simplest form.', 'Compare: if \\(a_1/a_2 = b_1/b_2 \\neq c_1/c_2\\) → parallel (no solution); if all three equal → coincident (infinite.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_03_002', difficulty: 'standard',
          question: 'A system of two linear equations in two variables is consistent if it has at.',
          hint: 'Review graphing linear equations (c9_math_ch6_1) and practice identifying slopes from.',
          misconception: 'Students often confuse the three cases by only checking a₁/a₂ and forgetting b₁/b₂ and c₁/c₂.',
          parts: [
                { id: 'a', prompt: 'Without graphing, determine whether the system 3x + 2y = 7 and 2x + 3y = 8 has a unique solution.', answer: 'Check: a₁/a₂ = 3/2 and b₁/b₂ = 2/3',
                  options: ['Check: a₁/a₂ = 3/2 and b₁/b₂ = 2/3', 'yes, because both equations have the same coefficients', 'consistent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the three cases by only checking a₁/a₂ and forgetting b₁/b₂ and c₁/c₂.' },
                { id: 'b', prompt: 'A system has a₁/a₂ = 5/3 and b₁/b₂ = 5/3. What can you conclude about the number of solutions?', answer: 'Since a₁/a₂ = b₁/b₂, the lines are either parallel (no solution) or coincident',
                  options: ['Since a₁/a₂ = b₁/b₂, the lines are either parallel (no solution) or coincident', 'unique solution', 'consistent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the three cases by only checking a₁/a₂ and forgetting b₁/b₂ and c₁/c₂.' }
          ],
            remediations: { 'students-often-confuse-the-three': { steps: ['Draw three pairs of lines on graph paper: intersecting (different slopes), parallel (same slope, different intercepts),.', 'Practice the ratio test with 10 systems, classifying each as unique, no solution, or infinitely many.', 'Emphasise the vocabulary: consistent = at least one solution (unique OR infinite); inconsistent = no solution.', 'For each system, verify the algebraic classification by actually solving or graphing.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the three cases by only checking a₁/a₂ and forgetting b₁/b₂ and c₁/c₂.',
          parts: [
                { id: 'a', prompt: 'Why do two lines with different slopes always intersect at exactly one point?', answer: 'Two lines with different slopes are not parallel',
                  options: ['Two lines with different slopes are not parallel', 'they might not intersect if they are far apart', 'consistent', 'unique solution'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the three cases by only checking a₁/a₂ and forgetting b₁/b₂ and c₁/c₂.' },
                { id: 'b', prompt: 'Given the system x + 2y = 4 and 2x + 3y = 7, find the unique solution using substitution and verify it satisfies both equations.', answer: 'From the first equation: x = 4 − 2y',
                  options: ['From the first equation: x = 4 − 2y', 'consistent', 'unique solution', 'at least one solution'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the three cases by only checking a₁/a₂ and forgetting b₁/b₂ and c₁/c₂.' }
          ],
            remediations: { 'students-often-confuse-the-three': { steps: ['Draw three pairs of lines on graph paper: intersecting (different slopes), parallel (same slope, different intercepts),.', 'Practice the ratio test with 10 systems, classifying each as unique, no solution, or infinitely many.', 'Emphasise the vocabulary: consistent = at least one solution (unique OR infinite); inconsistent = no solution.', 'For each system, verify the algebraic classification by actually solving or graphing.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_03_003', difficulty: 'standard',
          question: 'A pair of linear equations in two variables is called an **inconsistent.',
          hint: 'If stuck, revisit c9_math_ch2_6 (slope-intercept form) and c10_math_cbse_03_001.',
          misconception: '**The "Two-Ratio Trap":** Students check only \\(\\frac{a_1}{a_2} = \\frac{b_1}{b_2}\\) and immediately conclude "parallel.',
          parts: [
                { id: 'a', prompt: 'Determine whether the following pair of equations has a solution: \\(2x - 3y = 7\\) and \\(4x - 6y = 20\\). Show all steps using the ratio method.', answer: '**Step 1:** Write in standard form: \\(2x - 3y - 7 = 0\\) and \\(4x - 6y - 20 = 0\\)',
                  options: ['**Step 1:** Write in standard form: \\(2x - 3y - 7 = 0\\) and \\(4x - 6y - 20 = 0\\)', 'unique solution', 'infinitely many solutions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**The "Two-Ratio Trap":** Students check only \\(\\frac{a_1}{a_2} = \\frac{b_1}{b_2}\\) and immediately conclude "parallel lines, no solution".' }
          ],
            remediations: { 'the-two-ratio-trap-students': { steps: ['Write standard form.', 'Write \\(\\frac{a_1}{a_2}\\), \\(\\frac{b_1}{b_2}\\), \\(\\frac{c_1}{c_2}\\).', 'Compare all three." 2. **Use a checklist table** on rough paper: | Ratio | Value | Equal to previous?'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_03_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**The "Two-Ratio Trap":** Students check only \\(\\frac{a_1}{a_2} = \\frac{b_1}{b_2}\\) and immediately conclude "parallel.',
          parts: [
                { id: 'a', prompt: 'A student writes: "The equations \\(x + 2y = 3\\) and \\(2x + 4y = 5\\) have no solution because when I multiply the first equation by 2, I get \\(2x + 4y = 6\\),.', answer: 'The reasoning is **valid and correct**',
                  options: ['The reasoning is **valid and correct**', 'this method is wrong, you must use ratios'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**The "Two-Ratio Trap":** Students check only \\(\\frac{a_1}{a_2} = \\frac{b_1}{b_2}\\) and immediately conclude "parallel lines, no solution".' }
          ],
            remediations: { 'the-two-ratio-trap-students': { steps: ['Write standard form.', 'Write \\(\\frac{a_1}{a_2}\\), \\(\\frac{b_1}{b_2}\\), \\(\\frac{c_1}{c_2}\\).', 'Compare all three." 2. **Use a checklist table** on rough paper: | Ratio | Value | Equal to previous?'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
