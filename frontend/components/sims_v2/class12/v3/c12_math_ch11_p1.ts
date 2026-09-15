import type { SimDef } from '../../engine/types';

/** v3 generated — c12_math_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_math_ch11_p1: SimDef = {
    id: 'v3_c12_math_ch11_p1',
    title: 'Three Dimensional Geometry · Part 1/2',
    subtitle: 'Ratios describe direction; cosines normalise it',
    classLevel: 12, subject: 'mathematics', topic: 'Three Dimensional Geometry · Part 1/2',
    chapters: ['c12_math_ch11'],
    nodeIds: ['c12_math_cbse_11_001', 'c12_math_cbse_11_002', 'c12_math_cbse_11_003', 'c12_math_cbse_11_004', 'c12_math_cbse_11_005', 'c12_math_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: '3D navigator', intro: 'A drone needs its heading as cosines against three axes — one identity keeps the math honest.', goal: 'Compute direction cosines and ratios — and read parallel/perpendicular lines from them.' },
    discovery: {
        question: 'A line\'s direction ratios are 2, −3, 6 — so its direction cosines are... 2, −3, 6? What\'s missing?',
        options: ['Normalisation — divide by √(4+9+36)=7 to get 2/7, −3/7, 6/7; cosines are a unit vector\'s components and must satisfy l²+m²+n²=1', 'Nothing — same thing', 'Absolute values', 'The angles'],
        answer: 'Normalisation — divide by √(4+9+36)=7 to get 2/7, −3/7, 6/7; cosines are a unit vector\'s components and must satisfy l²+m²+n²=1',
        hook: 'Ratios are any proportional triple; cosines are the unique normalised version. And l is cos α, not α — (2/7, 3/7, 6/7) are cosines; the angles are cos⁻¹ of each. Proportional ratios mean parallel lines; the dot product\'s zero means perpendicular.',
    },
    teaching: [
        { title: 'Direction Cosines and Direction Ratios', text: 'Direction cosines of a line are the cosines of the angles made by the line with the positive directions of the coordinate axes.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_math_cbse_11_001', title: 'Your mission',
          mission: { widget: 'vector', validate: 'vector:ax=60',
            instruction: 'On the lab: add vector b to a — is the result just the lengths added?.',
        context: 'Program a drone\'s path in 3D: turn two points into direction ratios, normalise to cosines, verify the unit-square identity, and read parallel versus perpendicular off the numbers.',
            observePrompt: 'What did the vector interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_11_001', title: 'Direction Cosines and Direction Ratios',
          scaffold: { problem: 'A drone flies from point A(2, -1, 3) to point B(5, 2, -1). Find the direction cosines of its path.',
            steps: [
            { text: 'Identify coordinates: A(2, -1, 3), B(5, 2, -1).' },
            { text: 'Compute direction ratios: x₂-x₁ = 3, y₂-y₁ = 3, z₂-z₁ = -4.' },
            { text: 'Compute distance AB = √(3²+3²+(-4)²) = √(9+9+16) = √34.' },
            { text: 'Direction cosines: l = 3/√34, m = 3/√34, n = -4/√34.' },
            { text: 'Verify: l²+m²+n² = (9+9+16)/34 = 34/34 = 1.', faded: true, blankAnswer: 'Direction cosines are (3/√34, 3/√34, -4/√34).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_11_002', title: 'Equation of a Line in 3D Space',
          scaffold: { problem: '** A telephone wire is stretched between two poles. The base of the first pole is at \\(A(10, 5, 0)\\) metres and the base of the second pole.',
            steps: [
            { text: 'Coordinates of attachment points: \\(A\'(10, 5, 8)\\) and \\(B\'(25, -3, 6)\\) (adding z-coordinates for height).' },
            { text: 'Direction vector \\(\\overrightarrow{A\'B\'} = (25-10)\\hat{i} + (-3-5)\\hat{j} + (6-8)\\hat{k} = 15\\hat{i} - 8\\hat{j}.' },
            { text: 'Vector equation using point A\': \\(\\vec{r} = (10\\hat{i} + 5\\hat{j} + 8\\hat{k}) + \\lambda(15\\hat{i} - 8\\hat{j}.' },
            { text: 'For the bird, x-coordinate = 16. From parametric: \\(x = 10 + 15\\lambda = 16 \\Rightarrow 15\\lambda = 6 \\Rightarrow.' },
            { text: 'Find z-coordinate (height): \\(z = 8 + (-2)\\lambda = 8 - 2 \\times 0.4 = 8 - 0.8 = 7.2\\) m.', faded: true, blankAnswer: '** Vector equation: \\(\\vec{r} = (10\\hat{i} + 5\\hat{j}.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_11_003', title: 'Angle Between Two Lines in 3D',
          scaffold: { problem: 'A telephone tower in Delhi is supported by two guy wires. One wire runs along the line \\(\\frac{x-10}{2} = \\frac{y-5}{-1} = \\frac{z}{3}\\).',
            steps: [
            { text: 'Identify that the angle between the wires is the angle between their direction vectors.' },
            { text: 'Write the formula for the cosine of the angle: \\(\\cos\\theta = \\frac{|a_1a_2 + b_1b_2.' },
            { text: 'Substitute the direction ratios: Numerator = \\(|2(1) + (-1)(2) + 3(-2)| = |2 - 2 - 6| = |-6| = 6\\).' },
            { text: 'Compute magnitudes: \\(\\sqrt{2^2+(-1)^2+3^2} = \\sqrt{4+1+9} = \\sqrt{14}\\); \\(\\sqrt{1^2+2^2+(-2)^2} = \\sqrt{1+4+4}.' },
            { text: '\\(\\cos\\theta = \\frac{6}{\\sqrt{14} \\times 3} = \\frac{2}{\\sqrt{14}} = \\frac{2\\sqrt{14}}{14} = \\frac{\\sqrt{14}}{7}\\).', faded: true, blankAnswer: '\\(\\theta = \\cos^{-1}\\left(\\frac{\\sqrt{14}}{7}\\right).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_11_004', title: 'Shortest Distance Between Two Skew Lines',
          scaffold: { problem: 'Two water pipelines in a housing society in Pune are laid along skew lines.',
            steps: [
            { text: 'Find direction vectors. For pipeline A: \\(\\vec{b_1} = \\vec{AB} = (4-1)\\hat{i} + (5-2)\\hat{j} + (6-3)\\hat{k} = 3\\hat{i}.' },
            { text: 'Check if lines are parallel. \\(\\vec{b_1} = \\vec{b_2}\\), so direction ratios are proportional → lines are parallel, not.' },
            { text: 'Choose position vectors: \\(\\vec{a_1} = \\vec{OA} = \\hat{i} + 2\\hat{j} + 3\\hat{k}\\); \\(\\vec{a_2} = \\vec{OC} = 2\\hat{i}.' },
            { text: 'Compute \\(\\vec{b_1} \\times \\vec{b_2} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 3 & 3 & 3 \\\\ 3 & 3 & 4.' },
            { text: '\\(|\\vec{b_1} \\times \\vec{b_2}| = \\sqrt{3^2 + (-3)^2 + 0^2} = \\sqrt{18} = 3\\sqrt{2}\\).' },
            { text: '\\(\\vec{a_2} - \\vec{a_1} = (2-1)\\hat{i} + (3-2)\\hat{j} + (1-3)\\hat{k} = \\hat{i} + \\hat{j} - 2\\hat{k}\\).' },
            { text: '\\((\\vec{b_1} \\times \\vec{b_2}) \\cdot (\\vec{a_2} - \\vec{a_1}) = (3)(1) + (-3)(1) + (0)(-2) = 3 - 3 = 0\\).' },
            { text: '\\(d = \\frac{|0|}{3\\sqrt{2}} = 0\\). Distance zero means lines intersect! Check: Solve for intersection.', faded: true, blankAnswer: '\\(d = \\frac{1}{\\sqrt{2}} \\approx 0.707\\) metres.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_11_005', title: 'Shortest Distance Between Two Parallel Lines',
          scaffold: { problem: 'Two parallel conveyor belts in a factory run along lines L₁ and L₂. L₁ passes through point A(2, -1, 3) with direction ratios 2, 3, 6.',
            steps: [
            { text: 'Identify given data. Line L₁: point A(2, -1, 3), direction ratios (2, 3, 6).' },
            { text: 'Write position vectors. a₁ = 2î - ĵ + 3k̂, a₂ = 5î + 2ĵ - k̂. Common direction vector b = 2î + 3ĵ + 6k̂.' },
            { text: 'Compute vector from A to B: a₂ - a₁ = (5-2)î + (2-(-1))ĵ + (-1-3)k̂ = 3î + 3ĵ - 4k̂.' },
            { text: 'Compute cross product (a₂ - a₁) × b = (3î + 3ĵ - 4k̂) × (2î + 3ĵ + 6k̂).' },
            { text: 'Find magnitude of cross product: |(a₂ - a₁) × b| = √(30² + (-26)² + 3²) = √(900 + 676 + 9) = √1585.' },
            { text: 'Find magnitude of direction vector: |b| = √(2² + 3² + 6²) = √(4 + 9 + 36) = √49 = 7.' },
            { text: 'Apply formula: d = |(a₂ - a₁) × b| / |b| = √1585 / 7 metres.' },
            { text: 'Simplify or approximate: √1585 ≈ 39.81, so d ≈ 5.69 metres.', faded: true, blankAnswer: '√1585 / 7 metres (approximately 5.69 m)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_11_006', title: 'Equation of a Plane in Normal Form',
          scaffold: { problem: 'A plane is at a distance of 7 units from the origin. The normal to the plane from the origin has direction ratios 3, -4, 12.',
            steps: [
            { text: 'The direction ratios of the normal are given as 3, -4, 12. To get the unit normal vector, we need the direction.' },
            { text: 'The direction cosines are \\(l = 3/13\\), \\(m = -4/13\\), \\(n = 12/13\\).' },
            { text: 'The perpendicular distance from the origin is given as \\(d = 7\\) units.' },
            { text: 'Write the vector form: \\(\\mathbf{r} \\cdot \\hat{\\mathbf{n}} = d\\) where \\(\\hat{\\mathbf{n}} = \\frac{3}{13}\\mathbf{i}.' },
            { text: 'Write the Cartesian form by substituting \\(\\mathbf{r} = x\\mathbf{i}+y\\mathbf{j}+z\\mathbf{k}\\): \\(\\frac{3}{13}x.', faded: true, blankAnswer: 'Vector form: \\(\\mathbf{r} \\cdot \\left(.' }
            ] } },
        { type: 'drill', nodeId: 'c12_math_cbse_11_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c12_math_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Scripting a drone\'s straight-line flight in a 3D sim, a teammate writes the path as \'direction vector + λ × starting point\' — the drone orbits the warehouse instead of leaving it.',
            decisions: [{ prompt: 'What went wrong in the line equation?', options: [
                { text: 'He swapped the roles — the equation is r = a + λb where a is the position vector of a fixed point on the line and b is the direction it travels; his version anchors on the direction and \'scales\' the point, so λ moves the line\'s anchor instead of the drone.', outcome: 'The chapter\'s anatomy: the point fixes where the line lives, the vector fixes which way it runs — reversing them doesn\'t produce a line at all.' },
                { text: 'Nothing structural — any two vectors make a line; check the motor code instead.', outcome: 'The vectors have different jobs: one is a location (unchanging, λ-free), the other a direction (multiplied by the parameter); treating them as interchangeable is precisely the failure.', reveals: 'vectors-are-interchangeable' },
                { text: 'Use the Cartesian form instead — symmetric equations avoid the mix-up.', outcome: 'Same error survives translation — Cartesian still needs the point in the numerators and the direction ratios in the denominators; swapping roles just fails in different notation.', reveals: 'form-swap-fixes-roles' }
            ] }] } },
        { type: 'case', nodeId: 'c12_math_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now steer a line in space with three numbers — and tell the cosine from the angle it encodes.',
            decisions: [{ prompt: 'What comes next? Three Dimensional Geometry · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Three Dimensional Geometry · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'vector', prompt: 'Explore the vector interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'vector', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_11_001', difficulty: 'standard',
          question: 'Direction cosines of a line are the cosines of the angles made by the line with.',
          hint: 'Review 3D coordinates (c11_math_cbse_12_001) and 3D distance formula.',
          misconception: 'Students often confuse direction ratios with direction cosines.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Direction cosines of a line are the cosines of the angles made by the line with the',
                  options: ['Direction cosines of a line are the cosines of the angles made by the line with the', 'The equation of a line in 3D space describes the set of all points (x, y, z) that lie on', 'The angle between two lines in three-dimensional space is defined as the acute angle', 'The shortest distance between two skew lines in three-dimensional space is the length of'],
                  hint: 'Review 3D coordinates (c11_math_cbse_12_001) and 3D distance formula (c11_math_cbse_12_002).',
                  misconception: 'Students often confuse direction ratios with direction cosines.' }
          ],
            remediations: { 'students-often-confuse-direction-ratios': { steps: ['If a student makes this error, have them first compute the magnitude of the direction ratios vector √(a²+b²+c²).', 'Then divide each component by that magnitude to get the direction cosines.', 'Emphasize that direction cosines are the components of a unit vector along the line.', 'Practice with multiple examples where they compute both direction ratios and direction cosines for the same line, and.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_11_002', difficulty: 'standard',
          question: 'The equation of a line in 3D space describes the set of all points (x, y, z).',
          hint: 'Revisit **c11_math_cbse_12_003** (Section Formula in 3D) to practice vector subtraction.',
          misconception: '**Sign errors in Cartesian form numerators:** When the Cartesian equation is written as \\(\\frac{x - x_1}{a} = \\frac{y.',
          parts: [
                { id: 'a', prompt: 'The Cartesian equation of a line is \\(\\frac{x - 1}{3} = \\frac{y + 2}{-4} = \\frac{z - 5}{2}\\).', answer: '**Answer:** Yes, the student is correct',
                  options: ['**Answer:** Yes, the student is correct', 'the point is \\((1, 2, -5', '\\(y_1 = 2\\) instead of \\(-2\\)'],
                  hint: 'Revisit **c11_math_cbse_12_003** (Section Formula in 3D) to practice vector subtraction for.',
                  misconception: '**Sign errors in Cartesian form numerators:** When the Cartesian equation is written as \\(\\frac{x - x_1}{a} = \\frac{y - y_1}{b} = \\frac{z.' },
                { id: 'b', prompt: 'Two lines are given: \\(L_1: \\frac{x - 2}{1} = \\frac{y + 3}{2} = \\frac{z - 1}{-2}\\) and \\(L_2: \\vec{r} = (4\\hat{i} - \\hat{j} + 3\\hat{k}) + \\mu(2\\hat{i}.', answer: '**Answer:** Yes, \\(L_1\\) and \\(L_2\\) are parallel',
                  options: ['**Answer:** Yes, \\(L_1\\) and \\(L_2\\) are parallel', 'not parallel because the numbers are different'],
                  hint: 'Revisit **c11_math_cbse_12_003** (Section Formula in 3D) to practice vector subtraction for.',
                  misconception: '**Sign errors in Cartesian form numerators:** When the Cartesian equation is written as \\(\\frac{x - x_1}{a} = \\frac{y - y_1}{b} = \\frac{z.' }
          ],
            remediations: { 'sign-errors-in-cartesian-form': { steps: ['If a student makes the sign error in Cartesian numerators: 1.', 'Have them rewrite the equation as \\(\\frac{x - x_1}{a} = \\frac{y - y_1}{b} = \\frac{z - z_1}{c}\\) explicitly, then match.', 'Practice 5 examples where coordinates are negative: e.g., point \\((-2, 3, -5)\\) with direction ratios \\(1, -2, 4\\) →.', 'Ask them to state \\(x_1, y_1, z_1\\) from the equation.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_11_003', difficulty: 'standard',
          question: 'The angle between two lines in three-dimensional space is defined as the acute.',
          hint: 'If stuck, revisit c12_math_cbse_11_001 (direction cosines/ratios) and.',
          misconception: '**Misconception:** "The angle between two lines is given by \\(\\cos\\theta.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The angle between two lines in three-dimensional space is defined as the acute angle',
                  options: ['The angle between two lines in three-dimensional space is defined as the acute angle', 'Direction cosines of a line are the cosines of the angles made by the line with the', 'The equation of a line in 3D space describes the set of all points (x, y, z) that lie on', 'The shortest distance between two skew lines in three-dimensional space is the length of'],
                  hint: 'If stuck, revisit c12_math_cbse_11_001 (direction cosines/ratios) and c12_math_cbse_11_002.',
                  misconception: '**Misconception:** "The angle between two lines is given by \\(\\cos\\theta.' }
          ],
            remediations: { 'misconception-the-angle-between-two': { steps: ['If a student forgets the absolute value, have them draw two lines in 2D with slopes \\(m_1=1\\) (45°) and \\(m_2=-1\\).', 'The angle between them is 90°, but the dot product of direction vectors \\((1,1)\\) and \\((1,-1)\\) is 0, giving.', 'Then take \\((1,1)\\) and \\((-1,-1)\\) (same line, opposite direction): dot product = -2, magnitudes \\(\\sqrt{2}\\) each.', 'This visual demonstration forces the absolute value.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_11_004', difficulty: 'standard',
          question: 'The shortest distance between two skew lines in three-dimensional space is the.',
          hint: 'If stuck, revisit vector algebra (cross product, scalar triple product) and practice.',
          misconception: 'Students often mistakenly use the formula for parallel lines \\(d = \\frac{|\\vec{b} \\times (\\vec{a_2}.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The shortest distance between two skew lines in three-dimensional space is the length of',
                  options: ['The shortest distance between two skew lines in three-dimensional space is the length of', 'Direction cosines of a line are the cosines of the angles made by the line with the', 'The equation of a line in 3D space describes the set of all points (x, y, z) that lie on', 'The angle between two lines in three-dimensional space is defined as the acute angle'],
                  hint: 'If stuck, revisit vector algebra (cross product, scalar triple product) and practice converting.',
                  misconception: 'Students often mistakenly use the formula for parallel lines \\(d = \\frac{|\\vec{b} \\times (\\vec{a_2} - \\vec{a_1})|}{|\\vec{b}|}\\) for skew.' }
          ],
            remediations: { 'students-often-mistakenly-use-the': { steps: ['If a student makes the above errors: 1.', '**Revisit cross product**: Go to Class 11 Vector Algebra (not in provided nodes, but conceptually) or practice.', 'Use node c11_math_cbse_12_002 (distance in 3D) to recall vector operations.', '**Practice absolute value**: Solve 5 problems where the dot product yields negative; emphasize that distance.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_11_005', difficulty: 'standard',
          question: 'The shortest distance between two parallel lines in three-dimensional space.',
          hint: 'If stuck, revisit c12_math_cbse_11_001 (Direction Cosines and Direction Ratios) for.',
          misconception: 'Students often use the 2D parallel line distance formula |c₁ - c₂|/√(a²+b²) directly on 3D Cartesian equations.',
          parts: [
                { id: 'a', prompt: 'A student solves a parallel line distance problem and gets d = 0. They claim the lines are coincident. Is this necessarily true?', answer: 'Correct answer: Not necessarily',
                  options: ['Correct answer: Not necessarily', 'yes, d=0 always means coincident', 'correct point selection on each line'],
                  hint: 'If stuck, revisit c12_math_cbse_11_001 (Direction Cosines and Direction Ratios) for direction.',
                  misconception: 'Students often use the 2D parallel line distance formula |c₁ - c₂|/√(a²+b²) directly on 3D Cartesian equations by ignoring the.' }
          ],
            remediations: { 'students-often-use-the-2d': { steps: ['If a student makes this error: (1) Have them draw a 2D analogy: two parallel lines y=2x+1 and y=2x+5.', 'The points (0,1) and (0,5) have distance 4, but perpendicular distance is |5-1|/√5 = 4/√5.', 'Show the vector (0,4) is not perpendicular to direction (1,2).', '(2) In 3D, give lines (x)/1 = (y)/2 = (z)/3 and (x-1)/1 = (y-2)/2 = (z-3)/3.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_11_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often use the 2D parallel line distance formula |c₁ - c₂|/√(a²+b²) directly on 3D Cartesian equations.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student\'s solution: Problem: Distance between lines (x-1)/2 = (y+2)/3 = (z-3)/6 and (x-4)/4 = (y-1)/6 = (z+1)/12. Student\'s steps: 1.', answer: 'The student\'s answer is incorrect',
                  options: ['The student\'s answer is incorrect', 'incorrect, should use b = (4,6,12)', 'incorrect, cross product sign error in j-component'],
                  hint: 'If stuck, revisit c12_math_cbse_11_001 (Direction Cosines and Direction Ratios) for direction.',
                  misconception: 'Students often use the 2D parallel line distance formula |c₁ - c₂|/√(a²+b²) directly on 3D Cartesian equations by ignoring the.' }
          ],
            remediations: { 'students-often-use-the-2d': { steps: ['If a student makes this error: (1) Have them draw a 2D analogy: two parallel lines y=2x+1 and y=2x+5.', 'The points (0,1) and (0,5) have distance 4, but perpendicular distance is |5-1|/√5 = 4/√5.', 'Show the vector (0,4) is not perpendicular to direction (1,2).', '(2) In 3D, give lines (x)/1 = (y)/2 = (z)/3 and (x-1)/1 = (y-2)/2 = (z-3)/3.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_11_006', difficulty: 'standard',
          question: 'The normal form of a plane is the equation of a plane expressed in terms of.',
          hint: 'If stuck, revisit c12_math_cbse_11_001 (Direction Cosines and Direction Ratios) and.',
          misconception: 'Students often think that any equation of the form \\(Ax+By+Cz=D\\) is in normal form if \\(D>0\\).',
          parts: [
                { id: 'a', prompt: 'Convert the plane equation \\(2x - 3y + 6z - 14 = 0\\) to normal form and state the perpendicular distance from the origin and the direction cosines of the unit.', answer: 'Given: \\(2x - 3y + 6z - 14 = 0\\) → \\(2x - 3y + 6z = 14\\)',
                  options: ['Given: \\(2x - 3y + 6z - 14 = 0\\) → \\(2x - 3y + 6z = 14\\)', 'any equation of the form \\(Ax+By+Cz=D\\) is in normal form if \\(D>0\\)'],
                  hint: 'If stuck, revisit c12_math_cbse_11_001 (Direction Cosines and Direction Ratios) and practice.',
                  misconception: 'Students often think that any equation of the form \\(Ax+By+Cz=D\\) is in normal form if \\(D>0\\).' },
                { id: 'b', prompt: 'A plane has normal form \\(\\frac{1}{3}x - \\frac{2}{3}y - \\frac{2}{3}z = 4\\). Another plane has equation \\(2x - 4y - 4z = 24\\). Are they the same plane?', answer: 'Yes, they represent the same plane',
                  options: ['Yes, they represent the same plane', 'any equation of the form \\(Ax+By+Cz=D\\) is in normal form if \\(D>0\\)'],
                  hint: 'If stuck, revisit c12_math_cbse_11_001 (Direction Cosines and Direction Ratios) and practice.',
                  misconception: 'Students often think that any equation of the form \\(Ax+By+Cz=D\\) is in normal form if \\(D>0\\).' }
          ],
            remediations: { 'any-equation-of-the-form': { steps: ['If a student makes the sign error, have them re-derive the normal form from the geometric definition: the plane is the.', 'Write the general equation as \\(\\mathbf{r} \\cdot \\mathbf{n} = -D\\) where \\(\\mathbf{n}=(A,B,C)\\).', 'Then \\(\\mathbf{r} \\cdot \\frac{\\mathbf{n}}{|\\mathbf{n}|} = \\frac{-D}{|\\mathbf{n}|}\\).', 'For the right side to be the positive distance \\(d\\), we need \\(\\frac{-D}{|\\mathbf{n}|} \\ge 0\\), so we must choose the.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
