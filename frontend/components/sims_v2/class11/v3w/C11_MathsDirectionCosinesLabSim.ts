import type { SimDef } from '../../engine/types';
import C11_MathsDirectionCosinesLabSim from '../../../simulations/three/C11_MathsDirectionCosinesLabSim';

/** v3 wrapped master — C11_MathsDirectionCosinesLabSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_mathsdirectioncosineslabsim: SimDef = {
    id: 'v3w_c11_mathsdirectioncosineslabsim',
    title: 'Direction Cosines Lab',
    subtitle: 'This node covers the 3D Cartesian coordinate system, coordinates of a point (x,y,z),.',
    classLevel: 11, subject: 'mathematics', topic: 'Coordinates of a Point in 3D Space',
    chapters: [],
    nodeIds: ['c11_math_cbse_12_001', 'c11_math_cbse_12_002', 'c11_math_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are an architect designing a multi-storey building in Mumbai.', goal: 'Master Direction Cosines Lab.' },
    discovery: {
        question: 'Compare the number of coordinates needed to specify a point on a line, in a plane, and in space. Explain why the number increases with dimension.',
        options: ['Line: 1 coordinate (distance from origin along the line)', 'plane needs 3 coordinates', 'dimensions'],
        answer: 'Line: 1 coordinate (distance from origin along the line)',
        hook: 'Students often confuse which coordinate becomes zero for which plane: they set x=0 for XY-plane instead of z=0, or y=0.',
    },
    teaching: [
        { title: 'A point in three-dimensional space is.', text: 'A point in three-dimensional space is uniquely identified by an ordered triplet (x, y, z) where x, y, z are real numbers representing the signed perpendicular distances from the point to the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_math_cbse_12_001', title: 'A point in three-dimensional space is.',
          scaffold: { problem: 'A drone takes off from a corner of a rectangular field (origin).',
            steps: [
            { text: 'Define the coordinate system. Let the take-off corner be origin O(0,0,0).' },
            { text: 'First position: x = 50 (east), y = 30 (north), z = 20 (height). Coordinates: (50, 30, 20).' },
            { text: 'Determine octant: all coordinates positive (+,+,+) → Octant I (XOYZ).' },
            { text: 'Drone descends 15 m vertically: z changes from 20 to 20 - 15 = 5. x and y unchanged.' },
            { text: 'New coordinates: (50, 30, 5). Signs still (+,+,+) → still Octant I.', faded: true, blankAnswer: 'First position: (50, 30, 20) in Octant I. After descent:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_12_002', title: 'The distance between two points P(x₁,.',
          scaffold: { problem: 'A telephone tower stands at point A(10, 20, 0) on the ground. A drone is hovering at point B(10, 20, 50) directly above the tower.',
            steps: [
            { text: 'Identify the coordinates of the two points: boy at C(30, 40, 0), drone at B(10, 20, 50).' },
            { text: 'Write the 3D distance formula: distance = √[(x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)²].' },
            { text: 'Assign (x₁, y₁, z₁) = (30, 40, 0) and (x₂, y₂, z₂) = (10, 20, 50).' },
            { text: 'Square each difference: (-20)² = 400; (-20)² = 400; 50² = 2500.' },
            { text: 'Sum the squares: 400 + 400 + 2500 = 3300.' },
            { text: 'Take the square root: √3300 = √(100 × 33) = 10√33 ≈ 57.45 m.', faded: true, blankAnswer: '10√33 m (approximately 57.45 m)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_12_006', title: 'Applications of 3D Coordinate Geometry.',
          scaffold: { problem: 'A drone takes off from a warehouse at W(10, 20, 5) metres (x = east, y = north, z = altitude) and flies straight to a delivery point D(40,.',
            steps: [
            { text: 'Identify given data — W(10, 20, 5), D(40, 50, 15), ratio WC:CD = 2:3 (internal division from W).' },
            { text: 'Apply internal section formula with m=2, n=3 for point C dividing WD internally.' },
            { text: 'Compute x-coordinate: x_C = (2×40 + 3×10)/(2+3) = (80+30)/5 = 110/5 = 22.' },
            { text: 'Compute y-coordinate: y_C = (2×50 + 3×20)/5 = (100+60)/5 = 160/5 = 32.' },
            { text: 'Compute z-coordinate: z_C = (2×15 + 3×5)/5 = (30+15)/5 = 45/5 = 9. So C = (22, 32, 9).' },
            { text: 'Compute distance WC using 3D distance formula: WC = √[(22-10)² + (32-20)² + (9-5)²] = √[12² + 12² + 4²] = √[144+144+16].', faded: true, blankAnswer: 'C = (22, 32, 9) metres; WC = 4√19 metres ≈ 17.44 metres.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_math_cbse_12_002', title: 'Identify each idea',
          dissect: { specimen: 'Direction Cosines Lab', spots: [
            { id: 's1', label: 'A point in three-dimensional space', prompt: 'Which idea is this? — A point in three-dimensional space is uniquely identified by an ordered triplet (x, y, z).', answer: 'A point in three-dimensional space', options: ['A point in three-dimensional space', 'The distance between two points', 'Applications of 3D Coordinate Geometry'] },
            { id: 's2', label: 'The distance between two points', prompt: 'Which idea is this? — The distance between two points P(x₁, y₁, z₁) and Q(x₂, y₂, z₂) in three-dimensional.', answer: 'The distance between two points', options: ['The distance between two points', 'A point in three-dimensional space', 'Applications of 3D Coordinate Geometry'] },
            { id: 's3', label: 'Applications of 3D Coordinate Geometry', prompt: 'Which idea is this? — Applications of 3D Coordinate Geometry involve using the distance formula, section.', answer: 'Applications of 3D Coordinate Geometry', options: ['Applications of 3D Coordinate Geometry', 'A point in three-dimensional space', 'The distance between two points'] }
          ] } }
    ],
    explore: { component: C11_MathsDirectionCosinesLabSim, prompt: 'Explore the interactive — Direction Cosines Lab' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_12_001', difficulty: 'standard',
          question: 'A point in three-dimensional space is uniquely identified by an ordered triplet.',
          hint: 'If stuck, revisit Class 9 Chapter 3 (Coordinate Geometry) - specifically plotting points.',
          misconception: 'Students often confuse which coordinate becomes zero for which plane: they set x=0 for XY-plane instead of z=0, or y=0.',
          parts: [
                { id: 'a', prompt: 'Compare the number of coordinates needed to specify a point on a line, in a plane, and in space. Explain why the number increases with dimension.', answer: 'Line: 1 coordinate (distance from origin along the line)',
                  options: ['Line: 1 coordinate (distance from origin along the line)', 'plane needs 3 coordinates', 'dimensions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse which coordinate becomes zero for which plane: they set x=0 for XY-plane instead of z=0, or y=0 for YZ-plane instead.' }
          ],
            remediations: { 'students-often-confuse-which-coordinate': { steps: ['If a student makes the plane-coordinate error, have them physically model with three pencils as axes meeting at a.', 'The book surface is the XY-plane.', 'Ask: "Which pencil measures height above the book?" (z-axis).', '"If a point is ON the book, what is its height?" (zero).'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse which coordinate becomes zero for which plane: they set x=0 for XY-plane instead of z=0, or y=0.',
          parts: [
                { id: 'a', prompt: 'A student claims that the point (0, 0, -4) lies on the z-axis and also in the XY-plane. Evaluate this claim and correct any error.', answer: 'The claim is partially correct but contains an error',
                  options: ['The claim is partially correct but contains an error', 'on an axis', 'in a plane'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse which coordinate becomes zero for which plane: they set x=0 for XY-plane instead of z=0, or y=0 for YZ-plane instead.' },
                { id: 'b', prompt: 'Compare the number of coordinates needed to specify a point on a line, in a plane, and in space. Explain why the number increases with dimension.', answer: 'Line: 1 coordinate (distance from origin along the line)',
                  options: ['Line: 1 coordinate (distance from origin along the line)', 'plane needs 3 coordinates', 'dimensions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse which coordinate becomes zero for which plane: they set x=0 for XY-plane instead of z=0, or y=0 for YZ-plane instead.' }
          ],
            remediations: { 'students-often-confuse-which-coordinate': { steps: ['If a student makes the plane-coordinate error, have them physically model with three pencils as axes meeting at a.', 'The book surface is the XY-plane.', 'Ask: "Which pencil measures height above the book?" (z-axis).', '"If a point is ON the book, what is its height?" (zero).'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_12_002', difficulty: 'standard',
          question: 'The distance between two points P(x₁, y₁, z₁) and Q(x₂, y₂, z₂) in.',
          hint: 'Review the 2D distance formula derivation (Class 9/10) and practice plotting points in 3D.',
          misconception: 'Students often forget to square the differences before summing, or they take the square root of each squared difference.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The distance between two points P(x₁, y₁, z₁) and Q(x₂, y₂, z₂) in three-dimensional',
                  options: ['The distance between two points P(x₁, y₁, z₁) and Q(x₂, y₂, z₂) in three-dimensional', 'A point in three-dimensional space is uniquely identified by an ordered triplet (x, y, z)', 'Applications of 3D Coordinate Geometry involve using the distance formula, section'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often forget to square the differences before summing, or they take the square root of each squared difference individually and.' }
          ],
            remediations: { 'students-often-forget-to-square': { steps: ['If a student makes this error, first remind them of the 2D case: distance is √(Δx²+Δy²), not |Δx|+|Δy|.', 'Show a right triangle with legs 3 and 4: the hypotenuse is 5, not 7.', 'Then extend to 3D: the space diagonal of a box with edges 3,4,5 is √(3²+4²+5²)=√50, not 12.', 'Have them compute both ways for several examples to see the difference.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_12_006', difficulty: 'standard',
          question: 'Applications of 3D Coordinate Geometry involve using the distance formula,.',
          hint: 'Revisit c11_math_cbse_12_002 (distance formula) and.',
          misconception: 'Students treat the section formula as three independent 1D formulas and apply different ratios to x, y, z coordinates.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Applications of 3D Coordinate Geometry involve using the distance formula, section',
                  options: ['Applications of 3D Coordinate Geometry involve using the distance formula, section', 'A point in three-dimensional space is uniquely identified by an ordered triplet (x, y, z)', 'The distance between two points P(x₁, y₁, z₁) and Q(x₂, y₂, z₂) in three-dimensional'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the section formula as three independent 1D formulas and apply different ratios to x, y, z coordinates when one coordinate.' }
          ],
            remediations: { 'students-treat-the-section-formula': { steps: ['Re-derive the section formula from vector parameterisation: P = A + λ(B - A) where λ = m/(m+n).', 'Show that λ is the same for all coordinates.', 'Give a concrete example: A(0,0,0), B(6,6,6), λ=1/3 gives P(2,2,2).', 'If x used λ=1/3 but y used λ=1/2, P would be (2,3,2) — not on the line.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_12_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the section formula as three independent 1D formulas and apply different ratios to x, y, z coordinates.',
          parts: [
                { id: 'a', prompt: 'A student solves: "Find the point on the z-axis equidistant from A(1, 2, 3) and B(4, 5, 6)." Their working: Let P(0, 0, z).', answer: 'The solution is correct',
                  options: ['The solution is correct', 'incorrect because z-axis points have x=0, y=0'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the section formula as three independent 1D formulas and apply different ratios to x, y, z coordinates when one coordinate.' }
          ],
            remediations: { 'students-treat-the-section-formula': { steps: ['Re-derive the section formula from vector parameterisation: P = A + λ(B - A) where λ = m/(m+n).', 'Show that λ is the same for all coordinates.', 'Give a concrete example: A(0,0,0), B(6,6,6), λ=1/3 gives P(2,2,2).', 'If x used λ=1/3 but y used λ=1/2, P would be (2,3,2) — not on the line.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
