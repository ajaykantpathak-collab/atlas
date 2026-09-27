import type { SimDef } from '../../engine/types';

/** v3 generated — c12_app_ch10_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_app_ch10_p2: SimDef = {
    id: 'v3_c12_app_ch10_p2',
    title: 'Linear Programming · Part 2/2',
    subtitle: 'This node covers the complete graphical solution process for two-variable LPPs using both.',
    classLevel: 12, subject: 'app', topic: 'Linear Programming · Part 2/2',
    chapters: ['c12_app_ch10'],
    nodeIds: ['c12_app_cbse_10_007', 'c12_app_cbse_10_008', 'c12_app_cbse_10_009', 'c12_app_cbse_10_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start with a relatable scenario: "A bakery makes two types of cakes — Chocolate (₹50 profit) and Vanilla (₹40.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Explain in your own words how to determine which side of the line $ax + by = c$ represents the inequality $ax + by \\le c$ when graphing a constraint.',
        options: ['**Correct Answer:** To graph $ax + by \\le c$, first draw the line $ax + by = c$', 'always shade towards the origin', 'shade away from the origin for $\\le$'],
        answer: '**Correct Answer:** To graph $ax + by \\le c$, first draw the line $ax + by = c$',
        hook: '**Misconception:** "If the feasible region is unbounded, the LPP has no solution (no maximum/minimum)." **Why students.',
    },
    teaching: [
        { title: 'SOLVING A LINEAR PROGRAMMING PROBLEM', text: 'Solving a Linear Programming Problem (LPP) is the process of determining the values of decision variables that maximize or minimize a linear objective function Z = ax + by, subject to a set of linear.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c12_app_cbse_10_007', title: 'SOLVING A LINEAR PROGRAMMING PROBLEM',
          caseStudy: { intro: 'Start with a relatable scenario: "A bakery makes two types of cakes — Chocolate (₹50 profit) and Vanilla (₹40 profit).',
            decisions: [{ prompt: 'State the Fundamental Theorem of Linear Programming (Theorem 1) in your own words.', options: [
                { text: '**Correct Answer:** The Fundamental Theorem of Linear Programming states that if a linear', outcome: '**Correct Answer:** The Fundamental Theorem of Linear Programming states that if a linear.' },
                { text: 'anywhere in the feasible region', outcome: 'Not quite — **Misconception:** "For an unbounded feasible region, if the objective function has.', reveals: 'misconception-for-an-unbounded-feasible' },
                { text: 'at the center', outcome: 'Not quite — **Misconception:** "For an unbounded feasible region, if the objective function has.', reveals: 'misconception-for-an-unbounded-feasible' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_10_008', title: 'GRAPHICAL METHOD OF SOLVING LINEAR PROGRAMMING PROBLEM:',
          scaffold: { problem: 'A small workshop makes wooden toys: Cars (profit ₹50) and Trucks (profit ₹70). Each Car needs 2 hours cutting and 1 hour painting.',
            steps: [
            { text: 'Define decision variables: Let $x$ = number of Cars, $y$ = number of Trucks produced per week. Both $\\ge 0$.' },
            { text: 'Formulate constraints: Cutting: $2x + y \\le 100$; Painting: $x + 2y \\le 80$; Non-negativity: $x \\ge 0, y \\ge 0$.' },
            { text: 'Formulate objective: Maximize $Z = 50x + 70y$.' },
            { text: 'Plot constraints: Line $2x+y=100$ has intercepts $(50,0)$ and $(0,100)$.' },
            { text: 'Find intersection $B$ of $2x+y=100$ and $x+2y=80$. Solve: From 2nd, $x=80-2y$.' },
            { text: 'Evaluate $Z$ at all corners: $O: 0$; $A: 50(50)=2500$; $B: 50(40)+70(20)=2000+1400=3400$; $C: 70(40)=2800$.' },
            { text: 'Maximum profit is ₹3400 at $(40,20)$ i.e., 40 Cars and 20 Trucks.', faded: true, blankAnswer: 'Maximum weekly profit = ₹3400 by producing 40 Cars and 20.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_10_009', title: 'CORNER - POINT METHOD',
          scaffold: { problem: 'A small toy manufacturer makes two types of dolls: Type A (profit ₹50) and Type B (profit ₹60).',
            steps: [
            { text: 'Formulate LPP. Let x = number of Type A dolls, y = number of Type B dolls. Maximize Z = 50x + 60y.' },
            { text: 'Plot constraints. Line 2x+y=100: intercepts (50,0), (0,100). Line x+2y=80: intercepts (80,0), (0,40).' },
            { text: 'Find corner points of feasible region. O(0,0); A(50,0) from 2x+y=100 & y=0; C(0,40) from x+2y=80 & x=0;.' },
            { text: 'Evaluate Z at each corner. O: 0; A: 50(50)+60(0)=2500; B: 50(40)+60(20)=2000+1200=3200; C: 50(0)+60(40)=2400.' },
            { text: 'Feasible region is bounded (closed polygon OABCO). Maximum Z = 3200 at B(40,20). Optimal: 40 Type A, 20 Type B dolls.', faded: true, blankAnswer: 'Maximum weekly profit = ₹3200 by producing 40 Type A and 20.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_10_010', title: 'ISO-PROFIT/ ISO-COST METHOD:',
          scaffold: { problem: 'A small factory makes two types of pens: Gel (profit ₹5) and Ball (profit ₹3).',
            steps: [
            { text: 'Formulate LPP. Let x = gel pens, y = ball pens. Maximize Z = 5x + 3y.' },
            { text: 'Plot constraints. 2x+y=100 → intercepts (50,0), (0,100). x+2y=80 → intercepts (80,0), (0,40).' },
            { text: 'Draw initial iso-profit line. LCM(5,3)=15. Choose Z=150 → 5x+3y=150. Intercepts: (30,0), (0,50). Slope = -5/3.' },
            { text: 'Slide parallel lines away from origin (max). The line moves upward.' },
            { text: 'Compute optimal profit. Z = 5(40) + 3(20) = 200 + 60 = ₹260. Verify at other corners: O(0,0)=0, A(50,0)=250.', faded: true, blankAnswer: 'Produce 40 gel pens and 20 ball pens for maximum daily.' }
            ] } },
        { type: 'case', nodeId: 'c12_app_cbse_10_010', title: 'You made it',
          caseStudy: { intro: 'You finished Linear Programming — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_app_cbse_10_007', difficulty: 'standard',
          question: 'Solving a Linear Programming Problem (LPP) is the process of determining the.',
          hint: 'If stuck on plotting or finding intersections, review Class 11 Straight Lines.',
          misconception: '**Misconception:** "For an unbounded feasible region, if the objective function has a maximum/minimum at a corner.',
          parts: [
                { id: 'a', prompt: 'A student solves an LPP and finds the feasible region is unbounded. They evaluate Z at all corner points and find a minimum value of 15 at point (2,3).', answer: '**Correct Answer:** No, the conclusion is not always correct',
                  options: ['**Correct Answer:** No, the conclusion is not always correct', 'Yes, it\'s always correct'],
                  hint: 'If stuck on plotting or finding intersections, review Class 11 Straight Lines (c11_app_cbse_12_001.',
                  misconception: '**Misconception:** "For an unbounded feasible region, if the objective function has a maximum/minimum at a corner point, that value is the.' }
          ],
            remediations: { 'misconception-for-an-unbounded-feasible': { steps: ['**Revisit Theorem 2** (NCERT Section 8.4): Read the two bullet points for unbounded regions.', 'Write them in your own words: "For unbounded R, optimum may not exist.', 'If it exists, it\'s at a corner.', 'To check existence, draw Z = candidate value line and test the open half-plane." 2.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_10_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "For an unbounded feasible region, if the objective function has a maximum/minimum at a corner.',
          parts: [
                { id: 'a', prompt: 'An LPP has constraints: x + y ≤ 5, x - y ≥ 3, x ≥ 0, y ≥ 0. The objective is Maximize Z = 2x + y.', answer: '**Correct Answer:** The **second student is correct**',
                  options: ['**Correct Answer:** The **second student is correct**', 'first student is correct'],
                  hint: 'If stuck on plotting or finding intersections, review Class 11 Straight Lines (c11_app_cbse_12_001.',
                  misconception: '**Misconception:** "For an unbounded feasible region, if the objective function has a maximum/minimum at a corner point, that value is the.' }
          ],
            remediations: { 'misconception-for-an-unbounded-feasible': { steps: ['**Revisit Theorem 2** (NCERT Section 8.4): Read the two bullet points for unbounded regions.', 'Write them in your own words: "For unbounded R, optimum may not exist.', 'If it exists, it\'s at a corner.', 'To check existence, draw Z = candidate value line and test the open half-plane." 2.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_10_008', difficulty: 'standard',
          question: 'The Graphical Method of solving a Linear Programming Problem (LPP) is.',
          hint: 'If stuck on plotting or finding intersections, immediately review Class 11.',
          misconception: '**Misconception:** "If the feasible region is unbounded, the LPP has no solution (no maximum/minimum)." **Why students.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how to determine which side of the line $ax + by = c$ represents the inequality $ax + by \\le c$ when graphing a constraint.', answer: '**Correct Answer:** To graph $ax + by \\le c$, first draw the line $ax + by = c$',
                  options: ['**Correct Answer:** To graph $ax + by \\le c$, first draw the line $ax + by = c$', 'always shade towards the origin', 'shade away from the origin for $\\le$'],
                  hint: 'If stuck on plotting or finding intersections, immediately review Class 11 `c11_app_cbse_12_001`.',
                  misconception: '**Misconception:** "If the feasible region is unbounded, the LPP has no solution (no maximum/minimum)." **Why students make this error:**.' }
          ],
            remediations: { 'misconception-if-the-feasible-region': { steps: ['**Revisit graphing linear inequalities:** Go to Class 11 node `c11_app_cbse_12_004` (Various Forms of the Equation of.', 'Do 5 inequalities of each type.', '**Master corner point calculation:** Practice solving pairs of linear equations (substitution/elimination) from Class.', 'Focus on fractional answers (e.g., $20/19, 45/19$ in NCERT Example 6) — board exams often give non-integer vertices.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_10_009', difficulty: 'standard',
          question: 'The Corner-Point Method is a graphical technique for solving a Linear.',
          hint: 'If stuck on finding corner coordinates, review solving simultaneous linear equations.',
          misconception: 'Students believe that for an unbounded feasible region, if a corner point gives a maximum (or minimum) value, that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Corner-Point Method is a graphical technique for solving a Linear Programming Problem',
                  options: ['The Corner-Point Method is a graphical technique for solving a Linear Programming Problem', 'A Linear Programming Problem (LPP) is the mathematical formulation of optimizing', 'Linear Programming is a mathematical technique for optimizing (maximizing or minimizing)', 'Linear Programming is a mathematical technique used to find the optimal value (maximum or'],
                  hint: 'If stuck on finding corner coordinates, review solving simultaneous linear equations (Class 10) and.',
                  misconception: 'Students believe that for an unbounded feasible region, if a corner point gives a maximum (or minimum) value, that value is automatically.' }
          ],
            remediations: { 'for-an-unbounded-feasible-region': { steps: ['If a student fails the half-plane test concept: (1) Revisit c12_app_cbse_10_008 (Graphical Method) to reinforce.', '(2) Draw 3 unbounded regions on graph paper: one where max exists, one where min exists, one where neither exists.', '(3) For each, pick a candidate corner value, draw the line Z = value, and physically shade the open half-plane Z >.', '(4) Check overlap with feasible region using a colored pencil.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_10_010', difficulty: 'standard',
          question: 'The iso-profit/iso-cost method is a graphical technique for solving linear.',
          hint: 'If stuck, review "slope of line = -a/b" from Class 11 Coordinate Geometry (node.',
          misconception: '**Misconception:** "For maximization, I slide the iso-profit line until it *leaves* the feasible region; the last.',
          parts: [
                { id: 'a', prompt: 'A company produces products A and B. Profit: ₹30 per A, ₹20 per B. Constraints: 2A + B ≤ 100 (machine hours), A + 2B ≤ 80 (labor hours), A,B ≥ 0.', answer: '**Step 1:** Formulate: Maximize Z = 30A + 20B, s.t',
                  options: ['**Step 1:** Formulate: Maximize Z = 30A + 20B, s.t', 'farthest line that touches', 'line just before it leaves'],
                  hint: 'If stuck, review "slope of line = -a/b" from Class 11 Coordinate Geometry (node.',
                  misconception: '**Misconception:** "For maximization, I slide the iso-profit line until it *leaves* the feasible region; the last corner it touched.' },
                { id: 'b', prompt: 'Compare the iso-profit method and corner-point method for solving the same LPP. Under what conditions would they give different optimal solutions?', answer: 'Both methods **always give the same optimal solution** for a given LPP',
                  options: ['Both methods **always give the same optimal solution** for a given LPP', 'iso-profit gives multiple solutions, corner-point gives unique', 'they differ for unbounded regions', 'farthest line that touches'],
                  hint: 'If stuck, review "slope of line = -a/b" from Class 11 Coordinate Geometry (node.',
                  misconception: '**Misconception:** "For maximization, I slide the iso-profit line until it *leaves* the feasible region; the last corner it touched.' }
          ],
            remediations: { 'misconception-for-maximization': { steps: ['**Revisit plotting:** Go to node `c12_app_cbse_10_008` (Graphical Method) and re-practice plotting constraints and.', '**Relearn slope logic:** Review `c11_app_cbse_12_003` (Angle between lines) and `c11_app_cbse_12_004` (Equation of line.', '**Drill direction rule:** Make a flashcard: "MAX → AWAY from origin | MIN → TOWARD origin | UNBOUNDED → VERIFY with.', '**Re-diagnostic:** Solve Example 9 from NCERT (p.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
