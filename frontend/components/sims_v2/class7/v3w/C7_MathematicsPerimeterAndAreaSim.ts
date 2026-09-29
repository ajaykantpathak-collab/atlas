import type { SimDef } from '../../engine/types';
import C7_MathematicsPerimeterAndAreaSim from '../../../simulations/c6_12/C7_MathematicsPerimeterAndAreaSim';

/** v3 wrapped master — C7_MathematicsPerimeterAndAreaSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_mathematicsperimeterandareasim: SimDef = {
    id: 'v3w_c7_mathematicsperimeterandareasim',
    title: 'Equilateral Triangles: Construction and Properties',
    subtitle: 'Covers the definition, properties (equal sides and 60° interior angles), and.',
    classLevel: 7, subject: 'mathematics', topic: 'Equilateral Triangles: Construction and Properties',
    chapters: [],
    nodeIds: ['c7_math_ch07_002', 'c7_math_ch04_010', 'c7_math_ch07_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine you are an architect designing a stained-glass window for a school auditorium in Delhi, and you need.', goal: 'Master Equilateral Triangles: Construction and Properties.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'An equilateral triangle is a special.', text: 'An equilateral triangle is a special three-sided polygon in which all three sides are equal in length and all three interior angles are equal, measuring exactly 60° each.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_math_ch07_002', title: 'An equilateral triangle is a special.',
          scaffold: { problem: 'Priya wants to make a triangular banner for her school sports day in the shape of an equilateral triangle.',
            steps: [
            { text: 'Identify the given information. The shape is an equilateral triangle, so all 3 sides are equal in length, and side $s =.' },
            { text: 'Identify what needs to be calculated. The total outer edge length, which is the perimeter of the triangle.' },
            { text: 'Write down the formula for the perimeter of an equilateral triangle: $\\text{Perimeter} = 3 \\times s$.' },
            { text: 'Substitute the given value into the formula: $\\text{Perimeter} = 3 \\times 45$.' },
            { text: 'Compute the final product: $3 \\times 45 = 135\\text{ cm}$, and verify units.', faded: true, blankAnswer: '135 cm' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch04_010', title: 'An algebraic expression describing a.',
          scaffold: { problem: 'Priya arranges square tiles in a growing row for a school art project. Step 1 uses 6 tiles, Step 2 uses 10 tiles, and Step 3 uses 14 tiles.',
            steps: [
            { text: 'List the given tile counts for each step: Step 1 = 6, Step 2 = 10, Step 3 = 14.' },
            { text: 'Find the common difference between consecutive steps: $10 - 6 = 4$ and $14 - 10 = 4$.' },
            { text: 'Determine the constant offset $b$ by testing $4n + b$ for Step 1 ($n=1$): $4(1) + b = 6 \\implies 4 + b = 6 \\implies b =.' },
            { text: 'Substitute $n = 25$ into the expression to find the tiles needed for Step 25: $4(25) + 2$.' },
            { text: 'Compute the final value: $100 + 2 = 102$ tiles with appropriate units.', faded: true, blankAnswer: 'Expression: $4n + 2$; Step 25 requires 102 tiles.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch07_004', title: 'Triangles are classified based on the.',
          scaffold: { problem: 'A triangular garden bed in a park has sides measuring $12\\text{ m}$, $9\\text{ m}$, and $12\\text{ m}$.',
            steps: [
            { text: 'Identify the given side lengths of the triangular garden: $\\text{Side}_1 = 12\\text{ m}$, $\\text{Side}_2 = 9\\text{ m}$,.' },
            { text: 'Compare the side lengths to classify the triangle. Since two sides are equal ($12\\text{ m}$ and $12\\text{ m}$) and one.' },
            { text: 'Set up the formula for total fencing, which is the perimeter of the triangle: $\\text{Perimeter} = \\text{Side}_1 +.' },
            { text: 'Substitute the values into the formula and compute: $\\text{Perimeter} = 12 + 9 + 12 = 33\\text{ m}$.' },
            { text: 'State the final classification and total fencing requirement with correct units.', faded: true, blankAnswer: 'Isosceles triangle; Total fencing required is $33\\text{ m}$.' }
            ] } },
        { type: 'dissect', nodeId: 'c7_math_ch04_010', title: 'Identify each idea',
          dissect: { specimen: 'Equilateral Triangles: Construction and Properties', spots: [
            { id: 's1', label: 'An equilateral triangle is a', prompt: 'Which idea is this? — An equilateral triangle is a special three-sided polygon in which all three sides are.', answer: 'An equilateral triangle is a', options: ['An equilateral triangle is a', 'An algebraic expression describing a', 'Triangles are classified based on'] },
            { id: 's2', label: 'An algebraic expression describing a', prompt: 'Which idea is this? — An algebraic expression describing a geometric pattern uses variables (like $n$) to.', answer: 'An algebraic expression describing a', options: ['An algebraic expression describing a', 'An equilateral triangle is a', 'Triangles are classified based on'] },
            { id: 's3', label: 'Triangles are classified based on', prompt: 'Which idea is this? — Triangles are classified based on the equality of their side lengths into three types: an.', answer: 'Triangles are classified based on', options: ['Triangles are classified based on', 'An equilateral triangle is a', 'An algebraic expression describing a'] }
          ] } }
    ],
    explore: { component: C7_MathematicsPerimeterAndAreaSim, prompt: 'Explore the interactive — Equilateral Triangles: Construction and Properties' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch07_002', difficulty: 'standard',
          question: 'An equilateral triangle is a special three-sided polygon in which all three.',
          hint: 'Review c6_math_ch07_080 and c6_math_ch11_118 to practice basic compass settings and arc.',
          misconception: 'Students often believe that if they draw three lines of any random length that meet at three corners, they can force.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An equilateral triangle is a special three-sided polygon in',
                  options: ['An equilateral triangle is a special three-sided polygon in', 'An algebraic expression describing a geometric pattern uses variables (like $n$) to', 'Triangles are classified based on the equality of their side lengths into three types: an'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if they draw three lines of any random length that meet at three corners, they can force them to form an.' }
          ],
            remediations: { 'if-they-draw-three-lines': { steps: ['Guide the student back to the definition of compass construction.', 'Say: "Remember that the compass radius represents the side length of your triangle.', 'If your base line segment is AB = 6 cm, your compass must be opened to exactly 6 cm from the scale before you place the.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch04_010', difficulty: 'standard',
          question: 'An algebraic expression describing a geometric pattern uses variables (like.',
          hint: 'Review c7_math_ch04_005 on matchstick patterns and c7_math_ch04_001 on variables to.',
          misconception: 'Students often look at the common difference in a geometric pattern (e.g., adding 3 matchsticks each step) and write.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An algebraic expression describing a geometric pattern uses variables (like $n$) to',
                  options: ['An algebraic expression describing a geometric pattern uses variables (like $n$) to', 'An equilateral triangle is a special three-sided polygon in', 'Triangles are classified based on the equality of their side lengths into three types: an'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often look at the common difference in a geometric pattern (e.g., adding 3 matchsticks each step) and write down only $3n$,.' }
          ],
            remediations: { 'students-often-look-at-the': { steps: ['Remind the student to always test their algebraic expression with $n = 1$.', 'Say: "If your rule is $3n$, what does it give for $n = 1$?', 'But your drawing for Step 1 has 5 items!', 'Where are the missing 2 items?'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch07_004', difficulty: 'standard',
          question: 'Triangles are classified based on the equality of their side lengths into three.',
          hint: 'Review c6_math_ch07_070 (Introduction to Geometry: Points, Lines, Line Segments) and.',
          misconception: 'Students often confuse an isosceles triangle with a scalene triangle when the orientation of the triangle is tilted or.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Triangles are classified based on the equality of their side lengths into three types: an',
                  options: ['Triangles are classified based on the equality of their side lengths into three types: an', 'An equilateral triangle is a special three-sided polygon in', 'An algebraic expression describing a geometric pattern uses variables (like $n$) to'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse an isosceles triangle with a scalene triangle when the orientation of the triangle is tilted or rotated, failing to.' }
          ],
            remediations: { 'students-often-confuse-an-isosceles': { steps: ['If a student struggles, take a physical ruler and measure each side of the triangle explicitly in front of them.', 'Ask them to write down the three side lengths side-by-side (e.g., $5\\text{ cm}$, $5\\text{ cm}$, $8\\text{ cm}$).', 'Guide them to count how many numbers match: if zero match, it is scalene; if two match, it is isosceles; if all three.', 'Reassure them to rely on the written numbers rather than visual appearances.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
