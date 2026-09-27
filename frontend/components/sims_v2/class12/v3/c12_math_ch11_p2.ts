import type { SimDef } from '../../engine/types';

/** v3 generated — c12_math_ch11_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_math_ch11_p2: SimDef = {
    id: 'v3_c12_math_ch11_p2',
    title: 'Three Dimensional Geometry · Part 2/2',
    subtitle: 'Ratios describe direction; cosines normalise it',
    classLevel: 12, subject: 'mathematics', topic: 'Three Dimensional Geometry · Part 2/2',
    chapters: ['c12_math_ch11'],
    nodeIds: ['c12_math_cbse_11_007', 'c12_math_cbse_11_008', 'c12_math_cbse_11_009', 'c12_math_cbse_11_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: '3D navigator', intro: 'A drone needs its heading as cosines against three axes — one identity keeps the math honest.', goal: 'Compute direction cosines and ratios — and read parallel/perpendicular lines from them.' },
    discovery: {
        question: 'A line\'s direction ratios are 2, −3, 6 — so its direction cosines are... 2, −3, 6? What\'s missing?',
        options: ['Normalisation — divide by √(4+9+36)=7 to get 2/7, −3/7, 6/7; cosines are a unit vector\'s components and must satisfy l²+m²+n²=1', 'Nothing — direction ratios and direction cosines are the same triple', 'Absolute values — cosines are always positive lengths, never signed', 'The angles — cosines must be measured from inclinations, not computed'],
        answer: 'Normalisation — divide by √(4+9+36)=7 to get 2/7, −3/7, 6/7; cosines are a unit vector\'s components and must satisfy l²+m²+n²=1',
        hook: 'Ratios are any proportional triple; cosines are the unique normalised version. And l is cos α, not α — (2/7, 3/7, 6/7) are cosines; the angles are cos⁻¹ of each. Proportional ratios mean parallel lines; the dot product\'s zero means perpendicular.',
    },
    teaching: [
        { title: 'Equation of a Plane Passing Through a Point', text: 'A plane in three-dimensional space is uniquely determined if it passes through a given point and has a known normal vector (direction perpendicular to the plane).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_math_cbse_11_007', title: 'Your mission',
          mission: { widget: 'vector', validate: 'vector:ax=60',
            instruction: 'On the lab: add vector b to a — is the result just the lengths added?.',
        context: 'Program a drone\'s path in 3D: turn two points into direction ratios, normalise to cosines, verify the unit-square identity, and read parallel versus perpendicular off the numbers.',
            observePrompt: 'What did the vector interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_11_007', title: 'Equation of a Plane Passing Through a Point',
          scaffold: { problem: 'Find the vector and Cartesian equations of the plane passing through the point \\((2, -3, 1)\\) and perpendicular to the line with direction.',
            steps: [
            { text: 'Identify the given point \\((x_1, y_1, z_1) = (2, -3, 1)\\) and the normal vector direction ratios \\(A=4, B=-2, C=5\\).' },
            { text: 'Write the Cartesian form using \\(A(x - x_1) + B(y - y_1) + C(z - z_1) = 0\\).' },
            { text: 'Expand and simplify: \\(4x - 8 - 2y - 6 + 5z - 5 = 0 \\Rightarrow 4x - 2y + 5z - 19 = 0\\).' },
            { text: 'For the vector equation, write the normal vector \\(\\mathbf{n} = 4\\mathbf{i} - 2\\mathbf{j} + 5\\mathbf{k}\\) and point\'s.' },
            { text: 'The vector equation is \\(\\mathbf{r} \\cdot (4\\mathbf{i} - 2\\mathbf{j} + 5\\mathbf{k}) = 19\\).', faded: true, blankAnswer: 'Vector equation: \\(\\mathbf{r} \\cdot (4\\mathbf{i}.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_11_008', title: 'Distance of a Point from a Plane',
          scaffold: { problem: 'A drone is flying at coordinates (3, -2, 5) in a coordinate system where the ground is the plane 2x - y + 2z = 10.',
            steps: [
            { text: 'Write the plane equation in standard form: 2x - y + 2z - 10 = 0. Identify A=2, B=-1, C=2, D=-10.' },
            { text: 'Substitute the drone\'s coordinates into the numerator: |2(3) + (-1)(-2) + 2(5) - 10| = |6 + 2 + 10 - 10| = |8| = 8.' },
            { text: 'Compute the denominator: sqrt(2^2 + (-1)^2 + 2^2) = sqrt(4 + 1 + 4) = sqrt(9) = 3.' },
            { text: 'Distance = 8/3 units.' },
            { text: 'Interpret: The drone is 8/3 metres (or units) perpendicularly above the sloping ground.', faded: true, blankAnswer: '8/3 units' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_11_009', title: 'Angle Between Two Planes',
          scaffold: { problem: 'A roof has two sloping sections. One section lies in the plane \\( 2x - y + 2z = 6 \\) and the other in the plane \\( 3x + 6y - 2z = 9 \\).',
            steps: [
            { text: 'Identify the coefficients of the Cartesian equations. For plane 1: \\( a_1=2, b_1=-1, c_1=2 \\).' },
            { text: 'Write the formula for the cosine of the angle between two planes: \\( \\cos \\theta = \\frac{|a_1a_2 + b_1b_2.' },
            { text: 'Compute the numerator: \\( |(2)(3) + (-1)(6) + (2)(-2)| = |6 - 6 - 4| = |-4| = 4 \\).' },
            { text: 'Compute the denominator: \\( \\sqrt{2^2+(-1)^2+2^2} = \\sqrt{4+1+4} = \\sqrt{9} = 3 \\); \\( \\sqrt{3^2+6^2+(-2)^2}.' },
            { text: '\\( \\cos \\theta = \\frac{4}{21} \\approx 0.190476 \\). Then \\( \\theta = \\cos^{-1}(0.190476) \\approx 79.0^\\circ \\).', faded: true, blankAnswer: '\\( 79.0^\\circ \\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_11_010', title: 'Angle Between a Line and a Plane',
          scaffold: { problem: 'A drone flies along the path given by \\(\\frac{x-2}{3} = \\frac{y+1}{-4} = \\frac{z-5}{12}\\). The ground is the plane \\(2x - 3y + 6z = 18\\).',
            steps: [
            { text: 'Identify direction ratios of the line (drone\'s path) from the denominators: \\(a_1 = 3, b_1 = -4, c_1 = 12\\).' },
            { text: 'Identify direction ratios of the normal to the plane (ground) from coefficients of x, y, z: \\(A = 2, B = -3, C = 6\\).' },
            { text: 'Write the formula for sine of the angle: \\(\\sin\\theta = \\frac{|a_1A + b_1B.' },
            { text: 'Substitute values: Numerator = \\(|3\\cdot2 + (-4)\\cdot(-3) + 12\\cdot6| = |6 + 12 + 72| = 90\\).' },
            { text: 'Compute \\(\\theta = \\sin^{-1}\\left(\\frac{90}{91}\\right) \\approx 81.2^\\circ\\).', faded: true, blankAnswer: '\\(\\theta = \\sin^{-1}\\left(\\frac{90}{91}\\right) \\approx.' }
            ] } },
        { type: 'drill', nodeId: 'c12_math_cbse_11_010', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c12_math_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Scripting a drone\'s straight-line flight in a 3D sim, a teammate writes the path as \'direction vector + λ × starting point\' — the drone orbits the warehouse instead of leaving it.',
            decisions: [{ prompt: 'What went wrong in the line equation?', options: [
                { text: 'He swapped the roles — the equation is r = a + λb where a is the position vector of a fixed point on the line and b is the direction it travels; his version anchors on the direction and \'scales\' the point, so λ moves the line\'s anchor instead of the drone.', outcome: 'The chapter\'s anatomy: the point fixes where the line lives, the vector fixes which way it runs — reversing them doesn\'t produce a line at all.' },
                { text: 'Nothing structural — any two vectors make a line; check the motor code instead.', outcome: 'The vectors have different jobs: one is a location (unchanging, λ-free), the other a direction (multiplied by the parameter); treating them as interchangeable is precisely the failure.', reveals: 'vectors-are-interchangeable' },
                { text: 'Use the Cartesian form instead — symmetric equations avoid the mix-up.', outcome: 'Same error survives translation — Cartesian still needs the point in the numerators and the direction ratios in the denominators; swapping roles just fails in different notation.', reveals: 'form-swap-fixes-roles' }
            ] }] } },
        { type: 'case', nodeId: 'c12_math_cbse_11_010', title: 'You made it',
          caseStudy: { intro: 'You can now steer a line in space with three numbers — and tell the cosine from the angle it encodes.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'vector', prompt: 'Explore the vector interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'vector', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_11_007', difficulty: 'standard',
          question: 'A plane in three-dimensional space is uniquely determined if it passes through.',
          hint: 'Review vector dot product and the derivation of the normal form of a plane.',
          misconception: 'Students frequently confuse the normal vector of a plane with direction vectors lying in the plane.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A plane in three-dimensional space is uniquely determined if it passes through a given',
                  options: ['A plane in three-dimensional space is uniquely determined if it passes through a given', 'Direction cosines of a line are the cosines of the angles made by the line with the', 'The equation of a line in 3D space describes the set of all points (x, y, z) that lie on', 'The angle between two lines in three-dimensional space is defined as the acute angle'],
                  hint: 'Review vector dot product and the derivation of the normal form of a plane (c12_math_cbse_11_006).',
                  misconception: 'Students frequently confuse the normal vector of a plane with direction vectors lying in the plane.' }
          ],
            remediations: { 'students-frequently-confuse-the-normal': { steps: ['If a student makes the sign error in the Cartesian form, have them explicitly write the substitution step: \\(x - x_1.', 'Then multiply by \\(A, B, C\\).', 'For the normal vector confusion, ask: "Does the given vector lie *in* the plane or stand *perpendicular* to it?".', 'If it lies in the plane, we need another vector to compute the normal via cross product.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_11_008', difficulty: 'standard',
          question: 'The distance of a point \\( P(x_1, y_1, z_1) \\) from a plane \\( Ax + By + Cz +.',
          hint: 'If stuck, revisit the normal form of a plane (c12_math_cbse_11_006) and practice finding.',
          misconception: 'Students often forget to convert the plane equation to the form \\( Ax+By+Cz+D=0 \\) before substituting, leading to sign.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The distance of a point \\( P(x_1, y_1, z_1) \\) from a plane \\( Ax + By + Cz + D = 0 \\) is',
                  options: ['The distance of a point \\( P(x_1, y_1, z_1) \\) from a plane \\( Ax + By + Cz + D = 0 \\) is', 'Direction cosines of a line are the cosines of the angles made by the line with the', 'The equation of a line in 3D space describes the set of all points (x, y, z) that lie on', 'The angle between two lines in three-dimensional space is defined as the acute angle'],
                  hint: 'If stuck, revisit the normal form of a plane (c12_math_cbse_11_006) and practice finding the normal.',
                  misconception: 'Students often forget to convert the plane equation to the form \\( Ax+By+Cz+D=0 \\) before substituting, leading to sign errors in \\( D \\).' }
          ],
            remediations: { 'students-often-forget-to-convert': { steps: ['If a student makes the sign error with \\( D \\), have them rewrite the plane equation as \\( Ax+By+Cz+D=0 \\) by moving.', 'Then explicitly identify \\( D \\) as the constant term on the left.', 'Practice with 5 planes where the constant is on the right side (e.g., \\( 3x+4y=12 \\), \\( x-y+z=5 \\), \\( 2x=7 \\)) and.', 'For the absolute value error, remind them that distance is always non-negative, and ask them to test a point on the.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_11_009', difficulty: 'standard',
          question: 'The angle between two planes is defined as the acute angle between their normal.',
          hint: 'Revisit c12_math_cbse_11_006 to practice identifying normal vectors from plane equations.',
          misconception: 'Students often confuse the angle between planes with the angle between their normal vectors without the absolute value.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The angle between two planes is defined as the acute angle between their normal vectors',
                  options: ['The angle between two planes is defined as the acute angle between their normal vectors', 'Direction cosines of a line are the cosines of the angles made by the line with the', 'The equation of a line in 3D space describes the set of all points (x, y, z) that lie on', 'The angle between two lines in three-dimensional space is defined as the acute angle'],
                  hint: 'Revisit c12_math_cbse_11_006 to practice identifying normal vectors from plane equations, and.',
                  misconception: 'Students often confuse the angle between planes with the angle between their normal vectors without the absolute value.' }
          ],
            remediations: { 'students-often-confuse-the-angle': { steps: ['If a student forgets the absolute value, have them draw two intersecting planes and their normals: show that the.', 'Make them write the definition: "Angle between planes = acute angle between normals".', 'For normal vector confusion, revisit c12_math_cbse_11_006 (Equation of a Plane in Normal Form) and c12_math_cbse_11_007.', 'For perpendicular condition errors, give a targeted drill: "Write the condition for perpendicular planes in words: \'Sum.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_11_010', difficulty: 'standard',
          question: 'The angle between a line and a plane is defined as the complement of the angle.',
          hint: 'If stuck, revisit c12_math_cbse_11_001 (direction ratios) and c12_math_cbse_11_006 (plane.',
          misconception: 'Students consistently use \\(\\cos\\theta = \\frac{|\\vec{b}\\cdot\\vec{n}|}{|\\vec{b}||\\vec{n}|}\\) instead of \\(\\sin\\theta\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The angle between a line and a plane is defined as the complement of the angle between',
                  options: ['The angle between a line and a plane is defined as the complement of the angle between', 'Direction cosines of a line are the cosines of the angles made by the line with the', 'The equation of a line in 3D space describes the set of all points (x, y, z) that lie on', 'The angle between two lines in three-dimensional space is defined as the acute angle'],
                  hint: 'If stuck, revisit c12_math_cbse_11_001 (direction ratios) and c12_math_cbse_11_006 (plane normal.',
                  misconception: 'Students consistently use \\(\\cos\\theta = \\frac{|\\vec{b}\\cdot\\vec{n}|}{|\\vec{b}||\\vec{n}|}\\) instead of \\(\\sin\\theta\\), because they.' }
          ],
            remediations: { 'students-consistently-use-cos-theta': { steps: ['If a student uses cosine formula: Draw a right triangle with the line as hypotenuse, its projection on the plane.', 'Show that the angle with the plane is the angle between the line and its projection, while the angle with the normal.', 'These two angles are complementary, so sine of one equals cosine of the other.', 'Practice: Given line and plane, first find angle with normal using cosine, then subtract from 90° to get angle with.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
