import type { SimDef } from '../../engine/types';
import C11_MathematicsIntroductionToThreeDimensionalGeometrySim from '../../../simulations/c6_12/C11_MathematicsIntroductionToThreeDimensionalGeometrySim';

/** v3 wrapped master — C11_MathematicsIntroductionToThreeDimensionalGeometrySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_mathematicsintroductiontothreedimensionalgeometrysim: SimDef = {
    id: 'v3w_c11_mathematicsintroductiontothreedimensionalgeometrysim',
    title: 'Section Formula in 3D: Internal Division',
    subtitle: 'Covers internal division only (ratio \\( m:n \\) with \\( m,n > 0 \\)).',
    classLevel: 11, subject: 'mathematics', topic: 'Section Formula in 3D: Internal Division',
    chapters: [],
    nodeIds: ['c11_math_cbse_12_003', 'c11_math_cbse_12_006', 'c11_math_cbse_10_002', 'c11_math_cbse_12_001', 'c11_math_cbse_12_002', 'c11_math_cbse_12_004', 'c11_math_cbse_10_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are designing a model rocket launch pad with three support legs anchored at points A(2, -1, 3).', goal: 'Master Section Formula in 3D: Internal Division.' },
    discovery: {
        question: 'Compare the number of coordinates needed to specify a point on a line, in a plane, and in space. Explain why the number increases with dimension.',
        options: ['Line: 1 coordinate (distance from origin along the line)', 'plane needs 3 coordinates', 'dimensions'],
        answer: 'Line: 1 coordinate (distance from origin along the line)',
        hook: 'Students often confuse which coordinate becomes zero for which plane: they set x=0 for XY-plane instead of z=0, or y=0.',
    },
    teaching: [
        { title: 'The section formula for internal division in.', text: 'The section formula for internal division in three-dimensional geometry gives the coordinates of a point \\( P(x, y, z) \\) that divides the line segment joining two given points \\( A(x_1, y_1, z_1) \\).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_math_cbse_12_003', title: 'The section formula for internal.',
          scaffold: { problem: 'A telephone tower is to be erected along a straight line between two buildings.',
            steps: [
            { text: 'Identify given data: A(20, 30, 50), B(80, 90, 110). "Distance from A is twice distance from B" means AP : PB = 2 : 1.' },
            { text: 'Write the internal division formula for 3D: \\( x = \\frac{m x_2 + n x_1}{m+n}, y = \\frac{m y_2 + n y_1}{m+n}, z =.' },
            { text: 'Substitute m=2, n=1, x₁=20, x₂=80: x = (2×80 + 1×20)/(2+1) = (160+20)/3 = 180/3 = 60.' },
            { text: 'Substitute for y: y = (2×90 + 1×30)/3 = (180+30)/3 = 210/3 = 70.' },
            { text: 'Substitute for z: z = (2×110 + 1×50)/3 = (220+50)/3 = 270/3 = 90.' },
            { text: 'Verify: Distance AP = √[(60-20)²+(70-30)²+(90-50)²] = √[1600+1600+1600] = √4800.', faded: true, blankAnswer: 'Tower base coordinates: (60, 70, 90) metres.' }
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
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_002', title: 'The distance between two points.',
          scaffold: { problem: 'A rectangular park in Delhi has corners at A(1, 2), B(5, 2), C(5, 6), D(1, 6) (coordinates in 100-metre units).',
            steps: [
            { text: 'Identify coordinates of midpoints. Midpoint of AB: \\(M = \\left(\\frac{1+5}{2}, \\frac{2+2}{2}\\right) = (3, 2)\\).' },
            { text: 'Note that both midpoints have same x-coordinate (3), so the segment MN is vertical.' },
            { text: 'Alternatively, apply distance formula: \\(MN = \\sqrt{(3-3)^2 + (6-2)^2} = \\sqrt{0 + 16} = 4\\) units.' },
            { text: 'Convert units: 1 unit = 100 metres, so length = \\(4 \\times 100 = 400\\) metres.' },
            { text: 'Verify: The path runs vertically through the centre of the park from y=2 to y=6, spanning 4 units of 100m each. Correct.', faded: true, blankAnswer: '400 metres' }
            ] } },
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
        { type: 'scaffold', nodeId: 'c11_math_cbse_12_004', title: 'The midpoint of a line segment joining.',
          scaffold: { problem: 'A rectangular hall has corners at A(2, 3, 0) and C(10, 11, 4) representing opposite vertices of the floor diagonal (z=0 is floor, z=4 is.',
            steps: [
            { text: 'Identify the given points. The hall\'s opposite corners are A(2, 3, 0) and C(10, 11, 4).' },
            { text: 'Recall the 3D midpoint formula: M = ((x₁+x₂)/2, (y₁+y₂)/2, (z₁+z₂)/2).' },
            { text: 'Substitute coordinates: x₁=2, y₁=3, z₁=0; x₂=10, y₂=11, z₂=4.' },
            { text: 'Compute each coordinate: x_M = (2+10)/2 = 12/2 = 6; y_M = (3+11)/2 = 14/2 = 7; z_M = (0+4)/2 = 4/2 = 2.' },
            { text: 'Interpret: The chandelier should be attached at (6, 7, 2), which is 6m along length, 7m along width, and 2m above the.', faded: true, blankAnswer: '(6, 7, 2) metres' }
            ] } },
        { type: 'dissect', nodeId: 'c11_math_cbse_12_006', title: 'Identify each idea',
          dissect: { specimen: 'Section Formula in 3D: Internal Division', spots: [
            { id: 's1', label: 'The section formula for internal', prompt: 'Which idea is this? — The section formula for internal division in three-dimensional geometry gives the.', answer: 'The section formula for internal', options: ['The section formula for internal', 'Applications of 3D Coordinate Geometry', 'The distance between two points', 'A point in three-dimensional space'] },
            { id: 's2', label: 'Applications of 3D Coordinate Geometry', prompt: 'Which idea is this? — Applications of 3D Coordinate Geometry involve using the distance formula, section.', answer: 'Applications of 3D Coordinate Geometry', options: ['Applications of 3D Coordinate Geometry', 'The section formula for internal', 'The distance between two points', 'A point in three-dimensional space'] },
            { id: 's3', label: 'The distance between two points', prompt: 'Which idea is this? — The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian.', answer: 'The distance between two points', options: ['The distance between two points', 'The section formula for internal', 'Applications of 3D Coordinate Geometry', 'A point in three-dimensional space'] },
            { id: 's4', label: 'A point in three-dimensional space', prompt: 'Which idea is this? — A point in three-dimensional space is uniquely identified by an ordered triplet (x, y, z).', answer: 'A point in three-dimensional space', options: ['A point in three-dimensional space', 'The section formula for internal', 'Applications of 3D Coordinate Geometry', 'The distance between two points'] },
            { id: 's5', label: 'The midpoint of a line', prompt: 'Which idea is this? — The midpoint of a line segment joining two points P(x₁, y₁, z₁) and Q(x₂, y₂, z₂) in.', answer: 'The midpoint of a line', options: ['The midpoint of a line', 'The section formula for internal', 'Applications of 3D Coordinate Geometry', 'The distance between two points'] }
          ] } }
    ],
    explore: { component: C11_MathematicsIntroductionToThreeDimensionalGeometrySim, prompt: 'Explore the interactive — Section Formula in 3D: Internal Division' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_12_003', difficulty: 'standard',
          question: 'The section formula for internal division in three-dimensional geometry gives.',
          hint: 'Revisit Class 10 Coordinate Geometry: Section Formula (c10_math_cbse_07_004) and practice.',
          misconception: 'Students often swap the ratio assignment: they think "ratio m:n" means m parts from the first point A and n parts from.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The section formula for internal division in three-dimensional geometry gives the',
                  options: ['The section formula for internal division in three-dimensional geometry gives the', 'Applications of 3D Coordinate Geometry involve using the distance formula, section', 'The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian', 'A point in three-dimensional space is uniquely identified by an ordered triplet (x, y, z)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often swap the ratio assignment: they think "ratio m:n" means m parts from the first point A and n parts from the second point B,.' }
          ],
            remediations: { 'students-often-swap-the-ratio': { steps: ['Draw a number line for one coordinate (say x) with A at x₁ and B at x₂. Mark the division point P.', 'Write the vector equation: AP : PB = m : n ⇒ (x - x₁) : (x₂ - x) = m : n.', 'Cross-multiply: n(x - x₁) = m(x₂ - x).', 'Solve for x: nx - nx₁ = mx₂ - mx ⇒ x(m+n) = mx₂ + nx₁ ⇒ x = (mx₂ + nx₁)/(m+n).', 'Emphasize that the coefficient of x₂ is m (the part towards B) and coefficient of x₁ is n (the part towards A).'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_12_006', difficulty: 'standard',
          question: 'Applications of 3D Coordinate Geometry involve using the distance formula,.',
          hint: 'Revisit c11_math_cbse_12_002 (distance formula) and.',
          misconception: 'Students treat the section formula as three independent 1D formulas and apply different ratios to x, y, z coordinates.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Applications of 3D Coordinate Geometry involve using the distance formula, section',
                  options: ['Applications of 3D Coordinate Geometry involve using the distance formula, section', 'The section formula for internal division in three-dimensional geometry gives the', 'The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian', 'A point in three-dimensional space is uniquely identified by an ordered triplet (x, y, z)'],
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
            remediations: { 'students-treat-the-section-formula': { steps: ['Re-derive the section formula from vector parameterisation: P = A + λ(B - A) where λ = m/(m+n).', 'Show that λ is the same for all coordinates.', 'Give a concrete example: A(0,0,0), B(6,6,6), λ=1/3 gives P(2,2,2).', 'If x used λ=1/3 but y used λ=1/2, P would be (2,3,2) — not on the line.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_10_002', difficulty: 'standard',
          question: 'The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the.',
          hint: 'If stuck, revisit Class 9 node c9_math_ch1_4 (Distance Formula: Derivation Using.',
          misconception: 'Students often incorrectly apply the distance formula when one or both points lie on an axis.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian',
                  options: ['The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian', 'The section formula for internal division in three-dimensional geometry gives the', 'Applications of 3D Coordinate Geometry involve using the distance formula, section', 'A point in three-dimensional space is uniquely identified by an ordered triplet (x, y, z)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often incorrectly apply the distance formula when one or both points lie on an axis.' }
          ],
            remediations: { 'students-often-incorrectly-apply-the': { steps: ['If a student struggles with axis points: 1) Have them plot (0, -2) and (0, 4) on graph paper and count squares.', '2) Show that the distance formula gives \\(\\sqrt{(0-0)^2 + (4 - (-2))^2} = \\sqrt{36} = 6\\), matching the count.', '3) Emphasise that the formula works for ALL points; the zero difference in x is automatic.', 'For the equidistant problem: 1) Ask "What is the y-coordinate of ANY point on the x-axis?" (Answer: 0).'] } } },
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
                  options: ['The distance between two points P(x₁, y₁, z₁) and Q(x₂, y₂, z₂) in three-dimensional', 'The section formula for internal division in three-dimensional geometry gives the', 'Applications of 3D Coordinate Geometry involve using the distance formula, section', 'The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often forget to square the differences before summing, or they take the square root of each squared difference individually and.' }
          ],
            remediations: { 'students-often-forget-to-square': { steps: ['If a student makes this error, first remind them of the 2D case: distance is √(Δx²+Δy²), not |Δx|+|Δy|.', 'Show a right triangle with legs 3 and 4: the hypotenuse is 5, not 7.', 'Then extend to 3D: the space diagonal of a box with edges 3,4,5 is √(3²+4²+5²)=√50, not 12.', 'Have them compute both ways for several examples to see the difference.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_12_004', difficulty: 'standard',
          question: 'The midpoint of a line segment joining two points P(x₁, y₁, z₁) and Q(x₂, y₂,.',
          hint: 'If stuck, revisit the 2D midpoint formula (Class 10 Chapter 7) and the 3D coordinate.',
          misconception: 'Students often confuse the midpoint formula with the distance formula, writing M = (√[(x₂-x₁)² + (y₂-y₁)² +.',
          parts: [
                { id: 'a', prompt: 'Points A(2, 3, 4), B(6, 7, 8), and C(0, -1, 2) are given. Without calculating all midpoints, determine which pair of points has a midpoint with the largest.', answer: 'The midpoint\'s x-coordinate is (x₁+x₂)/2',
                  options: ['The midpoint\'s x-coordinate is (x₁+x₂)/2', 'largest x-coordinate of midpoint', 'largest individual x-coordinate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the midpoint formula with the distance formula, writing M = (√[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²])/2 instead of the.' }
          ],
            remediations: { 'students-often-confuse-the-midpoint': { steps: ['If a student writes the distance formula instead of the midpoint formula, ask: "What does the distance formula give you?', 'What does the midpoint give you?', 'A point with three coordinates.', 'Can a single number be a point in 3D?" Then guide them: "Write the section formula for ratio m:n.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_12_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the midpoint formula with the distance formula, writing M = (√[(x₂-x₁)² + (y₂-y₁)² +.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If M is the midpoint of AB, then AM = MB = AB/2, so the distance from A to M is half the distance from A to B." Is this statement correct?', answer: 'Yes, the statement is correct',
                  options: ['Yes, the statement is correct', 'only true in 2D', 'only true if coordinates are positive', '3D distance behaves differently'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the midpoint formula with the distance formula, writing M = (√[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²])/2 instead of the.' },
                { id: 'b', prompt: 'Points A(2, 3, 4), B(6, 7, 8), and C(0, -1, 2) are given. Without calculating all midpoints, determine which pair of points has a midpoint with the largest.', answer: 'The midpoint\'s x-coordinate is (x₁+x₂)/2',
                  options: ['The midpoint\'s x-coordinate is (x₁+x₂)/2', 'largest x-coordinate of midpoint', 'largest individual x-coordinate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the midpoint formula with the distance formula, writing M = (√[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²])/2 instead of the.' }
          ],
            remediations: { 'students-often-confuse-the-midpoint': { steps: ['If a student writes the distance formula instead of the midpoint formula, ask: "What does the distance formula give you?', 'What does the midpoint give you?', 'A point with three coordinates.', 'Can a single number be a point in 3D?" Then guide them: "Write the section formula for ratio m:n.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
