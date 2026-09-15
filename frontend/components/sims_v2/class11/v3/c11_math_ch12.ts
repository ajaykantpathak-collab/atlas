import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch12 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch12: SimDef = {
    id: 'v3_c11_math_ch12',
    title: 'Introduction to Three Dimensional Geometry',
    subtitle: 'Add one axis — and learn that summing isn\'t measuring.',
    classLevel: 11, subject: 'mathematics', topic: 'Introduction to Three Dimensional Geometry',
    chapters: ['c11_math_ch12'],
    nodeIds: ['c11_math_cbse_12_001', 'c11_math_cbse_12_002', 'c11_math_cbse_12_003', 'c11_math_cbse_12_004', 'c11_math_cbse_12_005', 'c11_math_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an architect locating a light fixture in a room\'s volume', intro: 'A floor plan finds the wall distances; a third number — height — turns a map into a building.', goal: 'Locate points in octants and on planes, and apply the 3D distance formula.' },
    discovery: {
        question: 'Distance from the origin to (1, 1, 1)? Easy — 1 + 1 + 1 = 3.',
        options: ['No — Euclidean distance squares first: √(1² + 1² + 1²) = √3; adding differences gives a taxicab metric, not length', 'Yes — coordinates sum to the distance', 'Yes — and in 2D it\'d be x + y', 'No — it\'s exactly 1'],
        answer: 'No — Euclidean distance squares first: √(1² + 1² + 1²) = √3; adding differences gives a taxicab metric, not length',
        hook: 'And (0, 0, −4) is on the z-axis but NOT in the XY-plane — an axis needs two zero coordinates, a plane needs its own missing one.',
    },
    teaching: [
        { title: 'Coordinates of a Point in 3D Space', text: 'A point in three-dimensional space is uniquely identified by an ordered triplet (x, y, z) where x, y, z are real numbers representing the signed perpendicular distances from the point to the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_12_001', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Drop a perpendicular from (2, −3, 6) to the XY-plane correctly, then compute the 3D distance between (2, −1, 3) and (−4, 5, −2).',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_12_001', title: 'Coordinates of a Point in 3D Space',
          scaffold: { problem: 'A drone takes off from a corner of a rectangular field (origin).',
            steps: [
            { text: 'Define the coordinate system. Let the take-off corner be origin O(0,0,0).' },
            { text: 'First position: x = 50 (east), y = 30 (north), z = 20 (height). Coordinates: (50, 30, 20).' },
            { text: 'Determine octant: all coordinates positive (+,+,+) → Octant I (XOYZ).' },
            { text: 'Drone descends 15 m vertically: z changes from 20 to 20 - 15 = 5. x and y unchanged.' },
            { text: 'New coordinates: (50, 30, 5). Signs still (+,+,+) → still Octant I.', faded: true, blankAnswer: 'First position: (50, 30, 20) in Octant I. After descent.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_12_002', title: 'Distance Between Two Points in 3D',
          scaffold: { problem: 'A telephone tower stands at point A(10, 20, 0) on the ground. A drone is hovering at point B(10, 20, 50) directly above the tower.',
            steps: [
            { text: 'Identify the coordinates of the two points: boy at C(30, 40, 0), drone at B(10, 20, 50).' },
            { text: 'Write the 3D distance formula: distance = √[(x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)²].' },
            { text: 'Assign (x₁, y₁, z₁) = (30, 40, 0) and (x₂, y₂, z₂) = (10, 20, 50).' },
            { text: 'Square each difference: (-20)² = 400; (-20)² = 400; 50² = 2500.' },
            { text: 'Sum the squares: 400 + 400 + 2500 = 3300.' },
            { text: 'Take the square root: √3300 = √(100 × 33) = 10√33 ≈ 57.45 m.', faded: true, blankAnswer: '10√33 m (approximately 57.45 m)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_12_003', title: 'Section Formula in 3D: Internal Division',
          scaffold: { problem: 'A telephone tower is to be erected along a straight line between two buildings.',
            steps: [
            { text: 'Identify given data: A(20, 30, 50), B(80, 90, 110). "Distance from A is twice distance from B" means AP : PB = 2 : 1.' },
            { text: 'Write the internal division formula for 3D: \\( x = \\frac{m x_2 + n x_1}{m+n}, y = \\frac{m y_2 + n y_1}{m+n},.' },
            { text: 'Substitute m=2, n=1, x₁=20, x₂=80: x = (2×80 + 1×20)/(2+1) = (160+20)/3 = 180/3 = 60.' },
            { text: 'Substitute for y: y = (2×90 + 1×30)/3 = (180+30)/3 = 210/3 = 70.' },
            { text: 'Substitute for z: z = (2×110 + 1×50)/3 = (220+50)/3 = 270/3 = 90.' },
            { text: 'Verify: Distance AP = √[(60-20)²+(70-30)²+(90-50)²] = √[1600+1600+1600] = √4800.', faded: true, blankAnswer: 'Tower base coordinates: (60, 70, 90) metres.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_12_004', title: 'Section Formula in 3D: Midpoint',
          scaffold: { problem: 'A rectangular hall has corners at A(2, 3, 0) and C(10, 11, 4) representing opposite vertices of the floor diagonal (z=0 is floor, z=4.',
            steps: [
            { text: 'Identify the given points. The hall\'s opposite corners are A(2, 3, 0) and C(10, 11, 4).' },
            { text: 'Recall the 3D midpoint formula: M = ((x₁+x₂)/2, (y₁+y₂)/2, (z₁+z₂)/2).' },
            { text: 'Substitute coordinates: x₁=2, y₁=3, z₁=0; x₂=10, y₂=11, z₂=4.' },
            { text: 'Compute each coordinate: x_M = (2+10)/2 = 12/2 = 6; y_M = (3+11)/2 = 14/2 = 7; z_M = (0+4)/2 = 4/2 = 2.' },
            { text: 'Interpret: The chandelier should be attached at (6, 7, 2), which is 6m along length, 7m along width, and 2m above the.', faded: true, blankAnswer: '(6, 7, 2) metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_12_005', title: 'Section Formula in 3D: External Division',
          scaffold: { problem: 'Two drones are flying at positions A(2, 3, 5) and B(8, 7, 11) in a 3D coordinate system (units in metres).',
            steps: [
            { text: 'Identify given points: A(2,3,5), B(8,7,11). The condition BC:AC = 1:3 means AC:BC = 3:1.' },
            { text: 'Write the external division formula: x = (m x₂ - n x₁)/(m - n), y = (m y₂ - n y₁)/(m - n), z = (m z₂ - n z₁)/(m - n).' },
            { text: 'Substitute coordinates: x = (3×8 - 1×2)/(3-1) = (24-2)/2 = 11; y = (3×7 - 1×3)/2 = (21-3)/2 = 9; z = (3×11 - 1×5)/2.' },
            { text: 'Verify the ratio: Distance AB = √[(6)²+(4)²+(6)²] = √88. Distance BC = √[(3)²+(2)²+(3)²] = √22.' },
            { text: 'Interpret: The control signal point C is at (11, 9, 14) metres.', faded: true, blankAnswer: 'C(11, 9, 14) metres.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_12_006', title: 'Applications of 3D Coordinate Geometry',
          scaffold: { problem: 'A drone takes off from a warehouse at W(10, 20, 5) metres (x = east, y = north, z = altitude) and flies straight to a delivery point D(40.',
            steps: [
            { text: 'Identify given data — W(10, 20, 5), D(40, 50, 15), ratio WC:CD = 2:3 (internal division from W).' },
            { text: 'Apply internal section formula with m=2, n=3 for point C dividing WD internally.' },
            { text: 'Compute x-coordinate: x_C = (2×40 + 3×10)/(2+3) = (80+30)/5 = 110/5 = 22.' },
            { text: 'Compute y-coordinate: y_C = (2×50 + 3×20)/5 = (100+60)/5 = 160/5 = 32.' },
            { text: 'Compute z-coordinate: z_C = (2×15 + 3×5)/5 = (30+15)/5 = 45/5 = 9. So C = (22, 32, 9).' },
            { text: 'Compute distance WC using 3D distance formula: WC = √[(22-10)² + (32-20)² + (9-5)²] = √[12² + 12² + 4²] = √[144+144+16].', faded: true, blankAnswer: 'C = (22, 32, 9) metres; WC = 4√19 metres ≈ 17.44 metres.' }
            ] } },
        { type: 'drill', nodeId: 'c11_math_cbse_12_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a 3D-modelling class, a student sets x = 0 for \'a point on the XY-plane\', locates the foot of the perpendicular from (2,3,4) to the YZ-plane at (2,0,0), and computes a 3D distance as |Δx| + |Δy| + |Δz| = 12.',
            decisions: [{ prompt: 'Which coordinate-plane rules is he misapplying?', options: [
                { text: 'Name planes by the axes that span them: the XY-plane is z = 0 (x and y span it), and the YZ-plane is x = 0 — so the perpendicular foot from (2,3,4) drops only x: (0,3,4). And distance is the space diagonal of a box: √(Δx² + Δy² + Δz²) — square roots don\'t distribute over sums, so 3,4,5 differences give √50, not 12.', outcome: 'He now reasons from which axes span the plane — the missing coordinate is the one set to zero — and Pythagoras runs twice, not root-by-part.' },
                { text: 'Keep x = 0 for the XY-plane — the x-coordinate must be zero there.', outcome: 'The zero coordinate is the one NOT in the plane\'s name: XY-plane means z = 0; setting x = 0 lands you on the YZ-plane.', reveals: 'wrong-coordinate-set-zero' },
                { text: 'Keep the sum-of-roots distance — it\'s just Pythagoras in three parts.', outcome: 'Square root doesn\'t distribute: the legs combine under one root — √(9+16+25) = √50 = 5√2, while 12 adds magnitudes like a taxi route.', reveals: 'root-distributes-over-sum' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_12_006', title: 'You made it',
          caseStudy: { intro: 'The third coordinate is just one more leg in Pythagoras — base diagonal, then space diagonal.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_12_001', difficulty: 'standard',
          question: 'A point in three-dimensional space is uniquely identified by an ordered triplet.',
          hint: 'If stuck, revisit Class 9 Chapter 3 (Coordinate Geometry) - specifically plotting points.',
          misconception: 'Students often confuse which coordinate becomes zero for which plane: they set x=0 for XY-plane instead of z=0, or y=0.',
          parts: [
                { id: 'a', prompt: 'Compare the number of coordinates needed to specify a point on a line, in a plane, and in space. Explain why the number increases with dimension.', answer: 'Line: 1 coordinate (distance from origin along the line)',
                  options: ['Line: 1 coordinate (distance from origin along the line)', 'plane needs 3 coordinates', 'dimensions'],
                  hint: 'If stuck, revisit Class 9 Chapter 3 (Coordinate Geometry) - specifically plotting points and.',
                  misconception: 'Students often confuse which coordinate becomes zero for which plane: they set x=0 for XY-plane instead of z=0, or y=0 for YZ-plane instead.' }
          ],
            remediations: { 'students-often-confuse-which-coordinate': { steps: ['If a student makes the plane-coordinate error, have them physically model with three pencils as axes meeting at.', 'The book surface is the XY-plane.', 'Ask: "Which pencil measures height above the book?" (z-axis).', '"If a point is ON the book, what is its height?" (zero).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse which coordinate becomes zero for which plane: they set x=0 for XY-plane instead of z=0, or y=0.',
          parts: [
                { id: 'a', prompt: 'A student claims that the point (0, 0, -4) lies on the z-axis and also in the XY-plane. Evaluate this claim and correct any error.', answer: 'The claim is partially correct but contains an error',
                  options: ['The claim is partially correct but contains an error', 'on an axis', 'in a plane'],
                  hint: 'If stuck, revisit Class 9 Chapter 3 (Coordinate Geometry) - specifically plotting points and.',
                  misconception: 'Students often confuse which coordinate becomes zero for which plane: they set x=0 for XY-plane instead of z=0, or y=0 for YZ-plane instead.' }
          ],
            remediations: { 'students-often-confuse-which-coordinate': { steps: ['If a student makes the plane-coordinate error, have them physically model with three pencils as axes meeting at.', 'The book surface is the XY-plane.', 'Ask: "Which pencil measures height above the book?" (z-axis).', '"If a point is ON the book, what is its height?" (zero).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_12_002', difficulty: 'standard',
          question: 'The distance between two points P(x₁, y₁, z₁) and Q(x₂, y₂, z₂).',
          hint: 'Review the 2D distance formula derivation (Class 9/10) and practice plotting points in 3D.',
          misconception: 'Students often forget to square the differences before summing, or they take the square root of each squared difference.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The distance between two points P(x₁, y₁, z₁) and Q(x₂, y₂, z₂) in three-dimensional',
                  options: ['The distance between two points P(x₁, y₁, z₁) and Q(x₂, y₂, z₂) in three-dimensional', 'A point in three-dimensional space is uniquely identified by an ordered triplet (x, y, z)', 'The section formula for internal division in three-dimensional geometry gives the', 'The midpoint of a line segment joining two points P(x₁, y₁, z₁) and Q(x₂, y₂, z₂) in'],
                  hint: 'Review the 2D distance formula derivation (Class 9/10) and practice plotting points in 3D.',
                  misconception: 'Students often forget to square the differences before summing, or they take the square root of each squared difference individually and.' }
          ],
            remediations: { 'students-often-forget-to-square': { steps: ['If a student makes this error, first remind them of the 2D case: distance is √(Δx²+Δy²), not |Δx|+|Δy|.', 'Show a right triangle with legs 3 and 4: the hypotenuse is 5, not 7.', 'Then extend to 3D: the space diagonal of a box with edges 3,4,5 is √(3²+4²+5²)=√50, not 12.', 'Have them compute both ways for several examples to see the difference.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_12_003', difficulty: 'standard',
          question: 'The section formula for internal division in three-dimensional geometry gives.',
          hint: 'Revisit Class 10 Coordinate Geometry: Section Formula (c10_math_cbse_07_004) and practice.',
          misconception: 'Students often swap the ratio assignment: they think "ratio m:n" means m parts from the first point A and n parts from.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The section formula for internal division in three-dimensional geometry gives the',
                  options: ['The section formula for internal division in three-dimensional geometry gives the', 'A point in three-dimensional space is uniquely identified by an ordered triplet (x, y, z)', 'The distance between two points P(x₁, y₁, z₁) and Q(x₂, y₂, z₂) in three-dimensional', 'The midpoint of a line segment joining two points P(x₁, y₁, z₁) and Q(x₂, y₂, z₂) in'],
                  hint: 'Revisit Class 10 Coordinate Geometry: Section Formula (c10_math_cbse_07_004) and practice 2D.',
                  misconception: 'Students often swap the ratio assignment: they think "ratio m:n" means m parts from the first point A and n parts from the second point.' }
          ],
            remediations: { 'students-often-swap-the-ratio': { steps: ['Draw a number line for one coordinate (say x) with A at x₁ and B at x₂. Mark the division point P.', 'Write the vector equation: AP : PB = m : n ⇒ (x - x₁) : (x₂ - x) = m : n.', 'Cross-multiply: n(x - x₁) = m(x₂ - x).', 'Solve for x: nx - nx₁ = mx₂ - mx ⇒ x(m+n) = mx₂ + nx₁ ⇒ x = (mx₂ + nx₁)/(m+n).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_12_004', difficulty: 'standard',
          question: 'The midpoint of a line segment joining two points P(x₁, y₁, z₁) and Q(x₂, y₂.',
          hint: 'If stuck, revisit the 2D midpoint formula (Class 10 Chapter 7) and the 3D coordinate.',
          misconception: 'Students often confuse the midpoint formula with the distance formula, writing M = (√[(x₂-x₁)² + (y₂-y₁)².',
          parts: [
                { id: 'a', prompt: 'Points A(2, 3, 4), B(6, 7, 8), and C(0, -1, 2) are given. Without calculating all midpoints, determine which pair of points has a midpoint with the largest.', answer: 'The midpoint\'s x-coordinate is (x₁+x₂)/2',
                  options: ['The midpoint\'s x-coordinate is (x₁+x₂)/2', 'largest x-coordinate of midpoint', 'largest individual x-coordinate'],
                  hint: 'If stuck, revisit the 2D midpoint formula (Class 10 Chapter 7) and the 3D coordinate system.',
                  misconception: 'Students often confuse the midpoint formula with the distance formula, writing M = (√[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²])/2 instead of the.' }
          ],
            remediations: { 'students-often-confuse-the-midpoint': { steps: ['If a student writes the distance formula instead of the midpoint formula, ask: "What does the distance formula give you?', 'What does the midpoint give you?', 'A point with three coordinates.', 'Can a single number be a point in 3D?" Then guide them: "Write the section formula for ratio m:n.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_12_005', difficulty: 'standard',
          question: 'If a point R divides the line segment joining two points P(x₁, y₁, z₁) and.',
          hint: 'If stuck, revisit the internal division formula (c11_math_cbse_12_003) and practice 1D.',
          misconception: 'Students often confuse external division with internal division by using the formula with addition in the numerator and.',
          parts: [
                { id: 'a', prompt: 'Find the coordinates of the point that divides the line segment joining A(1, 2, 3) and B(4, 5, 6) externally in the ratio 2:3.', answer: 'Using the formula with m=2, n=3: x = (2×4 - 3×1)/(2-3) = (8-3)/(-1) = -5',
                  options: ['Using the formula with m=2, n=3: x = (2×4 - 3×1)/(2-3) = (8-3)/(-1) = -5', 'externally'],
                  hint: 'If stuck, revisit the internal division formula (c11_math_cbse_12_003) and practice 1D external.',
                  misconception: 'Students often confuse external division with internal division by using the formula with addition in the numerator and m+n in the.' }
          ],
            remediations: { 'students-often-confuse-external-division': { steps: ['If a student uses the internal division formula for external division, first ask them to draw the points on a 1D number.', 'Derive the 1D external division formula using directed distances: PR = x_R - 2, QR = x_R - 8.', 'Since R is beyond Q, QR is positive but the ratio PR/QR = 3/1 gives x_R - 2 = 3(x_R - 8) → x_R = 11.', 'Show that this matches (3×8 - 1×2)/(3-1) = 11.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_12_006', difficulty: 'standard',
          question: 'Applications of 3D Coordinate Geometry involve using the distance formula.',
          hint: 'Revisit c11_math_cbse_12_002 (distance formula) and.',
          misconception: 'Students treat the section formula as three independent 1D formulas and apply different ratios to x, y, z coordinates.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Applications of 3D Coordinate Geometry involve using the distance formula, section',
                  options: ['Applications of 3D Coordinate Geometry involve using the distance formula, section', 'A point in three-dimensional space is uniquely identified by an ordered triplet (x, y, z)', 'The distance between two points P(x₁, y₁, z₁) and Q(x₂, y₂, z₂) in three-dimensional', 'The section formula for internal division in three-dimensional geometry gives the'],
                  hint: 'Revisit c11_math_cbse_12_002 (distance formula) and c11_math_cbse_12_003/c11_math_cbse_12_005.',
                  misconception: 'Students treat the section formula as three independent 1D formulas and apply different ratios to x, y, z coordinates when one coordinate.' }
          ],
            remediations: { 'students-treat-the-section-formula': { steps: ['Re-derive the section formula from vector parameterisation: P = A + λ(B - A) where λ = m/(m+n).', 'Show that λ is the same for all coordinates.', 'Give a concrete example: A(0,0,0), B(6,6,6), λ=1/3 gives P(2,2,2).', 'If x used λ=1/3 but y used λ=1/2, P would be (2,3,2) — not on the line.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
