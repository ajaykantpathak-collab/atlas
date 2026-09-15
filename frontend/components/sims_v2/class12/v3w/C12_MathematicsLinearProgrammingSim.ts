import type { SimDef } from '../../engine/types';
import C12_MathematicsLinearProgrammingSim from '../../../simulations/c6_12/C12_MathematicsLinearProgrammingSim';

/** v3 wrapped master — C12_MathematicsLinearProgrammingSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_mathematicslinearprogrammingsim: SimDef = {
    id: 'v3w_c12_mathematicslinearprogrammingsim',
    title: 'Linear Programming',
    subtitle: 'This node covers only the **definition and mathematical formulation** of a Linear.',
    classLevel: 12, subject: 'mathematics', topic: 'Linear Programming Problem: Definition and Formulation',
    chapters: [],
    nodeIds: ['c12_math_cbse_12_001', 'c12_math_cbse_12_002', 'c12_math_cbse_12_003', 'c12_math_cbse_12_004', 'c12_math_cbse_12_005', 'c12_math_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine a small bakery owner in Delhi who makes two types of cakes: Chocolate (profit ₹120 per cake) and.', goal: 'Master Linear Programming.' },
    discovery: {
        question: 'A student formulates the following LPP for a factory producing two products A and B: Maximise \\(Z = 50x + 40y\\) Subject to: \\(2x + 3y \\ge 100\\) (machine hours).',
        options: ['The formulation is **incorrect**', 'minimum requirement', 'resource availability'],
        answer: 'The formulation is **incorrect**',
        hook: '**Misconception:** "In a maximisation problem, all constraints must be ≤ type; in a minimisation problem, all.',
    },
    teaching: [
        { title: 'A Linear Programming Problem (LPP) is the.', text: 'A Linear Programming Problem (LPP) is the mathematical formulation of an optimisation problem where we seek to find the maximum or minimum value of a linear objective function \\(Z = ax + by\\) (with.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_math_cbse_12_001', title: 'A Linear Programming Problem (LPP) is.',
          scaffold: { problem: 'A small furniture workshop in Jaipur makes chairs and tables. Each chair requires 2 hours of carpentry and 1 hour of finishing.',
            steps: [
            { text: 'Identify decision variables. Let \\(x\\) = number of chairs produced per week, \\(y\\) = number of tables produced per week.' },
            { text: 'Write the objective function. Profit \\(Z = 200x + 350y\\). We want to maximise \\(Z\\).' },
            { text: 'Translate resource constraints into linear inequalities.' },
            { text: 'Add non‑negativity restrictions. \\(x \\ge 0,\\ y \\ge 0\\) (cannot produce negative furniture).' },
            { text: 'State the complete formulation.', faded: true, blankAnswer: 'Maximise \\(Z = 200x + 350y\\) subject to \\(2x + 3y \\le.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_12_002', title: 'The graphical method for solving a.',
          scaffold: { problem: 'A farmer in Punjab has 10 hectares of land to grow wheat and barley.',
            steps: [
            { text: 'Define variables. Let x = hectares of wheat, y = hectares of barley. x ≥ 0, y ≥ 0.' },
            { text: 'Write constraints. Land: x + y ≤ 10. Labour: 2x + y ≤ 15. Fertiliser: 3x + 2y ≤ 24.' },
            { text: 'Write objective function. Maximise Z = 8000x + 6000y (profit in ₹).' },
            { text: 'Graph the lines. x+y=10 (intercepts 10,10); 2x+y=15 (intercepts 7.5,15); 3x+2y=24 (intercepts 8,12).' },
            { text: 'Find corner points by solving pairs: O(0,0); A(7.5,0) from 2x+y=15 & y=0; B(6,4) from x+y=10 & 3x+2y=24?' },
            { text: 'Evaluate Z at each corner. O: 0; A: 8000(7.5)=60,000; B: 8000(6)+6000(3)=48,000+18,000=66,000; C:.' },
            { text: 'Maximum Z = ₹68,000 at (4,6). Farmer should plant 4 ha wheat and 6 ha barley.', faded: true, blankAnswer: 'Maximum profit ₹68,000 by cultivating 4 hectares of wheat.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_12_003', title: 'The feasible region of a Linear.',
          scaffold: { problem: 'A small factory in Pune produces two types of pens: gel pens (profit ₹5 per pen) and ball pens (profit ₹3 per pen).',
            steps: [
            { text: 'Define variables. Let \\(x\\) = number of gel pens, \\(y\\) = number of ball pens produced per week.' },
            { text: 'Write constraints. Machine-hours: \\(2x + y \\le 400\\). Labour-hours: \\(x + 2y \\le 300\\).' },
            { text: 'Graph each constraint. For \\(2x+y=400\\), intercepts: (200,0) and (0,400). Shade below.' },
            { text: 'Find corner points by solving pairs of lines.' },
            { text: 'Evaluate \\(Z = 5x + 3y\\) at each corner.' },
            { text: 'Maximum profit is ₹3100/3 ≈ ₹1033.33 at (500/3, 200/3). Since pens must be integers, the practical maximum is at.', faded: true, blankAnswer: 'Maximum profit = ₹3100/3 (≈ ₹1033.33) at (500/3, 200/3).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_12_004', title: 'A feasible region in a linear.',
          scaffold: { problem: 'Determine if the feasible region is bounded or unbounded for the constraints: x + y ≤ 50, 3x + y ≤ 90, x ≥ 0, y ≥ 0.',
            steps: [
            { text: 'Graph the line x + y = 50. Intercepts: (50,0) and (0,50). Since inequality is ≤, shade the half-plane containing the.' },
            { text: 'Graph the line 3x + y = 90. Intercepts: (30,0) and (0,90). Test origin: 0 ≤ 90 ✓. Shade below this line.' },
            { text: 'Apply x ≥ 0 (right of y-axis) and y ≥ 0 (above x-axis). The feasible region is the intersection of all four half-planes.' },
            { text: 'Find corner points by solving boundary intersections:' },
            { text: 'The region OABC is a quadrilateral enclosed by axes and two lines — it is **bounded** (can be enclosed in a circle).' },
            { text: 'Since bounded, evaluate Z = 4x + y at each corner:' },
            { text: 'Maximum is 120 at (30,0). By Theorem 2, this is the global maximum.', faded: true, blankAnswer: 'Feasible region is bounded. Maximum Z = 120 at (30,0).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_12_005', title: 'In a Linear Programming Problem (LPP),.',
          scaffold: { problem: 'A small factory in Gujarat produces two types of steel utensils: Type A (profit ₹30) and Type B (profit ₹40).',
            steps: [
            { text: 'Define decision variables. Let \\(x\\) = number of Type A utensils, \\(y\\) = number of Type B utensils per week.' },
            { text: 'Write constraints. Machine I: \\(2x + y \\le 80\\). Machine II: \\(x + 2y \\le 100\\). Non-negativity: \\(x \\ge 0, y \\ge 0\\).' },
            { text: 'Write objective function. Maximise \\(Z = 30x + 40y\\) (profit in ₹).' },
            { text: 'Graph the feasible region. Find intercepts: \\(2x+y=80\\) → (40,0) and (0,80); \\(x+2y=100\\) → (100,0) and (0,50).' },
            { text: 'Evaluate Z at each corner. O: 0; A(40,0): 1200; B(0,50): 2000; C(20,40): \\(30(20)+40(40)=600+1600=2200\\).' },
            { text: 'Feasible region is bounded (closed polygon). Maximum Z = 2200 at (20,40).', faded: true, blankAnswer: 'Maximum profit ₹2200 by producing 20 Type A and 40 Type B.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_12_006', title: 'A Linear Programming Problem (LPP) word.',
          scaffold: { problem: 'A small bakery makes two types of cakes: Chocolate (profit ₹80) and Vanilla (profit ₹60).',
            steps: [
            { text: 'Identify decision variables. Let x = number of Chocolate cakes, y = number of Vanilla cakes per day. Both ≥ 0.' },
            { text: 'Write objective function. Profit Z = 80x + 60y (to maximise).' },
            { text: 'Write constraints from resources. Flour: 200x + 100y ≤ 5000 (5kg = 5000g). Sugar: 50x + 100y ≤ 2000 (2kg = 2000g).' },
            { text: 'Graph the constraints. Plot lines 2x+y=50 (intercepts (25,0), (0,50)) and x+2y=40 (intercepts (40,0), (0,20)).' },
            { text: 'Evaluate Z at each corner point. Z(0,0)=0; Z(25,0)=2000; Z(0,20)=1200; Z(20,10)=80*20+60*10=1600+600=2200.' },
            { text: 'Interpret: Make 20 Chocolate and 10 Vanilla cakes for maximum profit ₹2200.', faded: true, blankAnswer: 'Maximum profit ₹2200 by making 20 Chocolate cakes and 10.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_math_cbse_12_002', title: 'Identify each idea',
          dissect: { specimen: 'Linear Programming', spots: [
            { id: 's1', label: 'A Linear Programming Problem LPP', prompt: 'Which idea is this? — A Linear Programming Problem (LPP) is the mathematical formulation of an optimisation.', answer: 'A Linear Programming Problem LPP', options: ['A Linear Programming Problem LPP', 'The graphical method for solving', 'The feasible region of a', 'A feasible region in a'] },
            { id: 's2', label: 'The graphical method for solving', prompt: 'Which idea is this? — The graphical method for solving a Linear Programming Problem (LPP) in two variables.', answer: 'The graphical method for solving', options: ['The graphical method for solving', 'A Linear Programming Problem LPP', 'The feasible region of a', 'A feasible region in a'] },
            { id: 's3', label: 'The feasible region of a', prompt: 'Which idea is this? — The feasible region of a Linear Programming Problem (LPP) is the set of all points in the.', answer: 'The feasible region of a', options: ['The feasible region of a', 'A Linear Programming Problem LPP', 'The graphical method for solving', 'A feasible region in a'] },
            { id: 's4', label: 'A feasible region in a', prompt: 'Which idea is this? — A feasible region in a linear programming problem is **bounded** if it can be enclosed.', answer: 'A feasible region in a', options: ['A feasible region in a', 'A Linear Programming Problem LPP', 'The graphical method for solving', 'The feasible region of a'] },
            { id: 's5', label: 'In a Linear Programming Problem', prompt: 'Which idea is this? — In a Linear Programming Problem (LPP), maximisation or minimisation refers to finding the.', answer: 'In a Linear Programming Problem', options: ['In a Linear Programming Problem', 'A Linear Programming Problem LPP', 'The graphical method for solving', 'The feasible region of a'] }
          ] } }
    ],
    explore: { component: C12_MathematicsLinearProgrammingSim, prompt: 'Explore the interactive — Linear Programming' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_12_001', difficulty: 'standard',
          question: 'A Linear Programming Problem (LPP) is the mathematical formulation of an.',
          hint: 'Revisit c11_math_cbse_06_006 (Graphical Solution of Linear Inequalities in Two Variables).',
          misconception: '**Misconception:** "In a maximisation problem, all constraints must be ≤ type; in a minimisation problem, all.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Linear Programming Problem (LPP) is the mathematical formulation of an optimisation',
                  options: ['A Linear Programming Problem (LPP) is the mathematical formulation of an optimisation', 'The graphical method for solving a Linear Programming Problem (LPP) in two variables', 'The feasible region of a Linear Programming Problem (LPP) is the set of all points in the', 'A feasible region in a linear programming problem is **bounded** if it can be enclosed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "In a maximisation problem, all constraints must be ≤ type; in a minimisation problem, all constraints must be ≥ type.".' }
          ],
            remediations: { 'misconception-in-a-maximisation-problem': { steps: ['If a student writes the wrong inequality direction: 1.', 'Ask them to read the constraint wording aloud: "We have *at most* ₹50,000" → "at most" means ≤.', '"We need *at least* 100 units protein" → "at least" means ≥.', 'Have them classify each constraint as **Resource** (availability, capacity, budget) → ≤, or **Requirement** (demand,.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "In a maximisation problem, all constraints must be ≤ type; in a minimisation problem, all.',
          parts: [
                { id: 'a', prompt: 'A student formulates the following LPP for a factory producing two products A and B: Maximise \\(Z = 50x + 40y\\) Subject to: \\(2x + 3y \\ge 100\\) (machine hours).', answer: 'The formulation is **incorrect**',
                  options: ['The formulation is **incorrect**', 'minimum requirement', 'resource availability'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "In a maximisation problem, all constraints must be ≤ type; in a minimisation problem, all constraints must be ≥ type.".' }
          ],
            remediations: { 'misconception-in-a-maximisation-problem': { steps: ['If a student writes the wrong inequality direction: 1.', 'Ask them to read the constraint wording aloud: "We have *at most* ₹50,000" → "at most" means ≤.', '"We need *at least* 100 units protein" → "at least" means ≥.', 'Have them classify each constraint as **Resource** (availability, capacity, budget) → ≤, or **Requirement** (demand,.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_12_002', difficulty: 'standard',
          question: 'The graphical method for solving a Linear Programming Problem (LPP) in two.',
          hint: 'If stuck, revisit c11_math_cbse_06_006 (graphing linear inequalities) and c9_math_ch2_5.',
          misconception: 'Students often shade the wrong side of a constraint line (e.g., shade above \\(x+y \\le 5\\) instead of below) because.',
          parts: [
                { id: 'a', prompt: 'Consider the LPP: Minimise \\(Z = -x + 2y\\) subject to \\(x \\ge 3\\), \\(x + y \\ge 5\\), \\(x + 2y \\ge 6\\), \\(y \\ge 0\\). The feasible region is unbounded.', answer: 'Correct answer: No, we cannot conclude yet',
                  options: ['Correct answer: No, we cannot conclude yet', 'Yes, minimum is 1'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often shade the wrong side of a constraint line (e.g., shade above \\(x+y \\le 5\\) instead of below) because they test the origin.' }
          ],
            remediations: { 'students-often-shade-the-wrong': { steps: ['Remediation: (1) Revisit c11_math_cbse_06_006 (Graphical Solution of Linear Inequalities in Two Variables) and practice.', '(2) Draw 5 lines through the origin (like \\(x-y\\ge0\\), \\(2x+y\\le0\\)) and shade correctly.', '(3) Re-attempt Diagnostic Question 3, but deliberately use a test point off the origin for each constraint.', '(4) Verify each corner point by plugging into ALL original inequalities.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_12_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often shade the wrong side of a constraint line (e.g., shade above \\(x+y \\le 5\\) instead of below) because.',
          parts: [
                { id: 'a', prompt: 'Consider the LPP: Minimise \\(Z = -x + 2y\\) subject to \\(x \\ge 3\\), \\(x + y \\ge 5\\), \\(x + 2y \\ge 6\\), \\(y \\ge 0\\). The feasible region is unbounded.', answer: 'Correct answer: No, we cannot conclude yet',
                  options: ['Correct answer: No, we cannot conclude yet', 'Yes, minimum is 1'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often shade the wrong side of a constraint line (e.g., shade above \\(x+y \\le 5\\) instead of below) because they test the origin.' }
          ],
            remediations: { 'students-often-shade-the-wrong': { steps: ['Remediation: (1) Revisit c11_math_cbse_06_006 (Graphical Solution of Linear Inequalities in Two Variables) and practice.', '(2) Draw 5 lines through the origin (like \\(x-y\\ge0\\), \\(2x+y\\le0\\)) and shade correctly.', '(3) Re-attempt Diagnostic Question 3, but deliberately use a test point off the origin for each constraint.', '(4) Verify each corner point by plugging into ALL original inequalities.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_12_003', difficulty: 'standard',
          question: 'The feasible region of a Linear Programming Problem (LPP) is the set of all.',
          hint: 'If stuck, review Class 11 Linear Inequalities (graphical method) and Class 10 Pair of.',
          misconception: 'Students often think that any point on the boundary of the feasible region can be optimal.',
          parts: [
                { id: 'a', prompt: 'For the constraints \\(x + y \\le 10\\), \\(2x + y \\le 14\\), \\(x \\ge 0\\), \\(y \\ge 0\\), find the feasible region and list the coordinates of all its corner points.', answer: 'Step 1: Graph \\(x + y = 10\\) (intercepts (10,0) and (0,10)) and shade below',
                  options: ['Step 1: Graph \\(x + y = 10\\) (intercepts (10,0) and (0,10)) and shade below', 'any point on the boundary of the feasible region can be optimal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any point on the boundary of the feasible region can be optimal.' }
          ],
            remediations: { 'any-point-on-the-boundary': { steps: ['If a student cannot identify the feasible region correctly: (1) Revisit c11_math_cbse_06_006 (Graphical Solution of.', '(2) Revisit c10_math_cbse_03_005 (Substitution Method) and c10_math_cbse_03_006 (Elimination Method) to solve pairs of.', '(3) Draw the constraints one by one on graph paper, using a different colour for each, and explicitly mark the.', '(4) Re‑diagnose by asking the student to find the feasible region and corner points for \\(x+2y\\le8, 3x+y\\le9, x\\ge0,.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_12_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that any point on the boundary of the feasible region can be optimal.',
          parts: [
                { id: 'a', prompt: 'A student solves an LPP and obtains corner points (0,0), (5,0), (3,4), (0,5).', answer: 'Evaluate \\(Z\\) at each corner: (0,0)→0',
                  options: ['Evaluate \\(Z\\) at each corner: (0,0)→0', 'any point on the boundary of the feasible region can be optimal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any point on the boundary of the feasible region can be optimal.' },
                { id: 'b', prompt: 'Construct a linear programming problem (objective function and constraints) whose feasible region is a triangle with vertices (0,0), (6,0), (0,8).', answer: 'Constraints: \\(x \\ge 0, y \\ge 0, 4x + 3y \\le 24\\) (line through (6,0) and (0,8))',
                  options: ['Constraints: \\(x \\ge 0, y \\ge 0, 4x + 3y \\le 24\\) (line through (6,0) and (0,8))', 'any point on the boundary of the feasible region can be optimal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any point on the boundary of the feasible region can be optimal.' }
          ],
            remediations: { 'any-point-on-the-boundary': { steps: ['If a student cannot identify the feasible region correctly: (1) Revisit c11_math_cbse_06_006 (Graphical Solution of.', '(2) Revisit c10_math_cbse_03_005 (Substitution Method) and c10_math_cbse_03_006 (Elimination Method) to solve pairs of.', '(3) Draw the constraints one by one on graph paper, using a different colour for each, and explicitly mark the.', '(4) Re‑diagnose by asking the student to find the feasible region and corner points for \\(x+2y\\le8, 3x+y\\le9, x\\ge0,.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_12_004', difficulty: 'standard',
          question: 'A feasible region in a linear programming problem is **bounded** if it can be.',
          hint: 'If stuck, revisit Class 11 node **c11_math_cbse_06_006** (Graphical Solution of Linear.',
          misconception: 'Students believe that if a feasible region is unbounded, the objective function **cannot** have a maximum or minimum.',
          parts: [
                { id: 'a', prompt: 'Consider the LPP: Minimize Z = -50x + 20y subject to 2x - y ≥ -5, 3x + y ≥ 3, 2x - 3y ≤ 12, x ≥ 0, y ≥ 0. The corner points are (0,5), (0,3), (1,0), (6,0).', answer: 'The student is **incorrect**',
                  options: ['The student is **incorrect**', 'boundedness is sufficient for existence', 'boundedness is necessary for existence'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that if a feasible region is unbounded, the objective function **cannot** have a maximum or minimum.' }
          ],
            remediations: { 'if-a-feasible-region-is': { steps: ['Revisit **c11_math_cbse_06_006** (Graphical Solution of Linear Inequalities in Two Variables) to practice shading.', 'Re-read **Theorem 1 and Theorem 2** in NCERT Section 12.2.2; write them in your own words emphasizing the "if and only.', 'Do the half-plane test mechanically: For candidate max M, graph ax+by > M; for candidate min m, graph ax+by < m.', 'Pick a test point on the objective line (e.g., increase x by 1, adjust y to stay on line) and check feasibility.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_12_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that if a feasible region is unbounded, the objective function **cannot** have a maximum or minimum.',
          parts: [
                { id: 'a', prompt: 'A student solves an LPP with an unbounded feasible region and finds the maximum value of Z at a corner point.', answer: 'The **first student is correct**',
                  options: ['The **first student is correct**', 'existence is not guaranteed', 'existence is impossible', 'boundedness is sufficient for existence'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that if a feasible region is unbounded, the objective function **cannot** have a maximum or minimum.' },
                { id: 'b', prompt: 'Construct a linear programming problem (objective function and constraints) such that: - The feasible region is unbounded.', answer: 'Example: Maximize/Minimize Z = -x + y subject to x ≥ 1, y ≥ 0, x + y ≥ 2',
                  options: ['Example: Maximize/Minimize Z = -x + y subject to x ≥ 1, y ≥ 0, x + y ≥ 2', 'boundedness is sufficient for existence', 'boundedness is necessary for existence'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that if a feasible region is unbounded, the objective function **cannot** have a maximum or minimum.' },
                { id: 'c', prompt: 'Consider the LPP: Minimize Z = -50x + 20y subject to 2x - y ≥ -5, 3x + y ≥ 3, 2x - 3y ≤ 12, x ≥ 0, y ≥ 0. The corner points are (0,5), (0,3), (1,0), (6,0).', answer: 'The student is **incorrect**',
                  options: ['The student is **incorrect**', 'boundedness is sufficient for existence', 'boundedness is necessary for existence'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that if a feasible region is unbounded, the objective function **cannot** have a maximum or minimum.' }
          ],
            remediations: { 'if-a-feasible-region-is': { steps: ['Revisit **c11_math_cbse_06_006** (Graphical Solution of Linear Inequalities in Two Variables) to practice shading.', 'Re-read **Theorem 1 and Theorem 2** in NCERT Section 12.2.2; write them in your own words emphasizing the "if and only.', 'Do the half-plane test mechanically: For candidate max M, graph ax+by > M; for candidate min m, graph ax+by < m.', 'Pick a test point on the objective line (e.g., increase x by 1, adjust y to stay on line) and check feasibility.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_12_005', difficulty: 'standard',
          question: 'In a Linear Programming Problem (LPP), maximisation or minimisation refers to.',
          hint: 'If stuck, go back to Class 11 Chapter 6 (Linear Inequalities) and practice graphing.',
          misconception: 'Students often forget to check the **non-negativity constraints** \\(x \\ge 0, y \\ge 0\\) when finding corner points,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In a Linear Programming Problem (LPP), maximisation or minimisation refers to finding the',
                  options: ['In a Linear Programming Problem (LPP), maximisation or minimisation refers to finding the', 'A Linear Programming Problem (LPP) is the mathematical formulation of an optimisation', 'The graphical method for solving a Linear Programming Problem (LPP) in two variables', 'The feasible region of a Linear Programming Problem (LPP) is the set of all points in the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often forget to check the **non-negativity constraints** \\(x \\ge 0, y \\ge 0\\) when finding corner points, leading to vertices with.' }
          ],
            remediations: { 'students-often-forget-to-check': { steps: ['Revisit **c11_math_cbse_06_006** (Graphical Solution of Linear Inequalities in Two Variables) — practice shading the.', 'Revisit **c12_math_cbse_12_003** (Feasible Region and Corner Points) — drill finding intersection points by solving.', 'For the unbounded-region verification step, do a focused exercise: take the NCERT Example 4, plot the feasible region,.', 'Re-diagnostic: Give the student an unbounded LPP where the candidate minimum **is** the true minimum (half-plane has no.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_12_006', difficulty: 'standard',
          question: 'A Linear Programming Problem (LPP) word problem is a real-life optimisation.',
          hint: 'If stuck on formulation, revisit c11_math_cbse_06_007 (Word Problems: Applications of.',
          misconception: 'Students often write the constraints for a diet problem with the inequality sign reversed: they use ≤ for minimum.',
          parts: [
                { id: 'a', prompt: 'In a diet problem, a dietician wants to mix two foods X and Y to meet minimum daily requirements of vitamin A (at least 80 units) and vitamin B (at least 100.', answer: 'Correct answer: B) 4x + 2y ≥ 80',
                  options: ['Correct answer: B) 4x + 2y ≥ 80', 'at least'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the constraints for a diet problem with the inequality sign reversed: they use ≤ for minimum nutrient requirements.' },
                { id: 'b', prompt: 'A manufacturing problem has constraints: 3x + 2y ≤ 12 (machine hours), x + y ≤ 5 (labour hours), x ≥ 0, y ≥ 0. The objective is to maximise Z = 10x + 15y.', answer: 'The conclusion is correct',
                  options: ['The conclusion is correct', 'at least'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the constraints for a diet problem with the inequality sign reversed: they use ≤ for minimum nutrient requirements.' },
                { id: 'c', prompt: 'A transportation problem: Two factories F1 and F2 supply to three depots D1, D2, D3.', answer: 'Let x = units F1→D1, y = units F1→D2',
                  options: ['Let x = units F1→D1, y = units F1→D2', 'at least'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the constraints for a diet problem with the inequality sign reversed: they use ≤ for minimum nutrient requirements.' }
          ],
            remediations: { 'students-often-write-the-constraints': { steps: ['If a student reverses inequality signs: 1) Ask them to read the phrase "at least 80 units" aloud and ask "Does that.', '90?" → they will say 80 or more.', '2) Write "amount ≥ 80" on board.', '3) Show that 4x+2y is the amount, so 4x+2y ≥ 80.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_12_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the constraints for a diet problem with the inequality sign reversed: they use ≤ for minimum.',
          parts: [
                { id: 'a', prompt: 'A student solves a manufacturing LPP: Maximise Z = 50x + 40y subject to 2x + y ≤ 10, x + 3y ≤ 15, x ≥ 0, y ≥ 0.', answer: 'Check (3,4) in x+3y ≤ 15: 3 + 3*4 = 3+12 = 15 ≤ 15',
                  options: ['Check (3,4) in x+3y ≤ 15: 3 + 3*4 = 3+12 = 15 ≤ 15', 'at least'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the constraints for a diet problem with the inequality sign reversed: they use ≤ for minimum nutrient requirements.' },
                { id: 'b', prompt: 'Create your own diet problem with two foods (Food A and Food B) and two nutrients (Protein and Iron).', answer: 'Example answer: Food A: 10g protein, 5mg iron per kg, cost ₹60/kg',
                  options: ['Example answer: Food A: 10g protein, 5mg iron per kg, cost ₹60/kg', 'at least'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the constraints for a diet problem with the inequality sign reversed: they use ≤ for minimum nutrient requirements.' }
          ],
            remediations: { 'students-often-write-the-constraints': { steps: ['If a student reverses inequality signs: 1) Ask them to read the phrase "at least 80 units" aloud and ask "Does that.', '90?" → they will say 80 or more.', '2) Write "amount ≥ 80" on board.', '3) Show that 4x+2y is the amount, so 4x+2y ≥ 80.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
