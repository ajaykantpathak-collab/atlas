import type { SimDef } from '../../engine/types';

/** v3 generated — c8_math_ch09_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_math_ch09_p2: SimDef = {
    id: 'v3_c8_math_ch09_p2',
    title: 'The Baudhayana-Pythagoras Theorem · Part 2/2',
    subtitle: 'Double a square using nothing but its diagonal',
    classLevel: 8, subject: 'mathematics', topic: 'The Baudhayana-Pythagoras Theorem · Part 2/2',
    chapters: ['c8_math_ch09'],
    nodeIds: ['c8_math_ch9_6', 'c8_math_ch9_7', 'c8_math_ch9_8', 'c8_math_ch9_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a rope-and-stake altar builder', intro: 'Ritual altars demanded perfect doubling — no \'close enough\'. Learn the diagonal trick ancient Indian geometers used, and meet √2 as a length you can hold in your hands.', goal: 'Understand the Sulba-Sutra construction for doubling a square — the diagonal becomes the new side, the area exactly doubles, and √2 appears as a concrete length.' },
    discovery: {
        question: 'A 2000-year-old Indian text knew the hypotenuse rule before Pythagoras wrote it down. What makes the theorem true forever?',
        options: ['a² + b² = c² follows from the geometry itself — provable, not observed', 'It worked for the triangles they measured', 'Priests declared it sacred law', 'Coincidence across many examples'],
        answer: 'a² + b² = c² follows from the geometry itself — provable, not observed',
        hook: 'Baudhayana stated it in the Sulba Sutras centuries before Pythagoras. Proof beats observation — that is what math is.',
    },
    teaching: [
        { title: 'Visual Proof of the Pythagoras Theorem Using Area', text: 'A visual proof of the Pythagoras theorem using area demonstrates that in a right-angled triangle, the area of the square constructed on the hypotenuse equals the sum of the areas of the squares.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_math_ch9_6', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Grab a rope and replay the Sulba-Sutra trick: mark a 5 m square, stretch the diagonal, swing it into a new square — then verify the area doubled exactly, and see why \'multiply by 1.5\' is a 12.5% overshoot.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_math_ch9_6', title: 'Visual Proof of the Pythagoras Theorem Using Area',
          scaffold: { problem: 'A farmer in Punjab has a right-triangular field with legs measuring 30 m and 40 m.',
            steps: [
            { text: 'Identify the given lengths: a = 30 m, b = 40 m. We need to compare the areas of the three squares.' },
            { text: 'Recall the visual proof: construct a large square of side (a+b) = 70 m.' },
            { text: 'First arrangement: the triangles leave two squares of sides a and b.' },
            { text: 'Second arrangement: the same four triangles leave one square of side c. Its area = c².' },
            { text: 'Conclude that the square on the hypotenuse has area 2500 m², which equals the sum of the areas of the squares on the.', faded: true, blankAnswer: 'The square on the hypotenuse has area 2500 m², equal to the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch9_7', title: 'Pythagorean Triples: (3, 4, 5) and Other Examples',
          scaffold: { problem: 'A carpenter in Delhi has three wooden planks of lengths 15 cm, 36 cm, and 39 cm.',
            steps: [
            { text: 'Identify the longest plank as the potential hypotenuse: c = 39 cm. The legs are a = 15 cm, b = 36 cm.' },
            { text: 'Write the Pythagorean condition: a² + b² = c². Substitute values: 15² + 36² = 39².' },
            { text: 'Compute squares: 15² = 225, 36² = 1296, 39² = 1521.' },
            { text: 'Add the squares of the legs: 225 + 1296 = 1521.' },
            { text: 'Compare: 1521 = 1521. The condition holds, so the planks form a right triangle.', faded: true, blankAnswer: 'Yes, they form a right triangle. The triple (15, 36, 39).' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch9_8', title: 'Applications of the Pythagoras Theorem: Finding Unknown Sides',
          scaffold: { problem: 'A ladder 10 m long is placed against a wall such that its foot is 6 m away from the wall. How high up the wall does the ladder reach?',
            steps: [
            { text: 'Identify the right triangle. The wall and ground form the legs, the ladder is the hypotenuse (10 m).' },
            { text: 'Write the Pythagoras theorem: (leg1)² + (leg2)² = (hypotenuse)². Here, 6² + h² = 10².' },
            { text: 'Substitute known values: 36 + h² = 100.' },
            { text: 'Rearrange to solve for h²: h² = 100 - 36 = 64. Then take square root: h = √64 = 8.' },
            { text: 'Verify: 6² + 8² = 36 + 64 = 100 = 10². The height is 8 m.', faded: true, blankAnswer: '8 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch9_9', title: 'Pythagoras Theorem in Real-Life Problems',
          scaffold: { problem: 'A farmer has a rectangular field 120 metres long and 50 metres wide.',
            steps: [
            { text: 'Identify the right triangle - the diagonal of the rectangle forms the hypotenuse, with length (120 m) and width (50 m).' },
            { text: 'Apply Pythagoras theorem: \\(d^2 = 120^2 + 50^2\\) where \\(d\\) is the diagonal length.' },
            { text: 'Compute squares: \\(120^2 = 14400\\), \\(50^2 = 2500\\). Sum = \\(14400 + 2500 = 16900\\).' },
            { text: 'Take square root: \\(d = \\sqrt{16900} = 130\\) m (since \\(130^2 = 16900\\)).' },
            { text: 'Calculate cost: \\(130 \\times 85 = ₹11,050\\). Verify: 130 m is reasonable (less than sum of sides 170 m, more than.', faded: true, blankAnswer: '₹11,050' }
            ] } },
        { type: 'drill', nodeId: 'c8_math_ch9_9', title: 'Rapid check',
          drill: { kind: 'data', count: 4, level: 3 } },
        { type: 'case', nodeId: 'c8_math_ch9_6', title: 'Use it in the wild',
          caseStudy: { intro: 'Re-enacting an ancient Sulba-Sutra task on the school field, a team must mark a square altar with exactly double the area of a 10 m square, using only rope and stakes. One member suggests: \'Easy — double the side to 20 m.\'',
            decisions: [{ prompt: 'Does doubling the side double the area?', options: [
                { text: 'No — a 20 m square has 400 m², four times the original 100 m². The Sulba-Sutra trick is to use the original square\'s diagonal as the new side: the square on the diagonal holds exactly two of the original squares, giving exactly 200 m².', outcome: 'This distinguishes linear from area scaling and recovers the rope-geometry insight — the diagonal is the side that doubles area.' },
                { text: 'The suggestion works — twice the side is twice everything, including the area.', outcome: 'Area scales with the square of the side; doubling the side quadruples the ground covered — the field would run out of rope and space.', reveals: 'double-side-double-area' },
                { text: 'Instead multiply the side by 1.5 — since 1.5² = 2.25, close enough to double.', outcome: 'Ritual construction demanded exactness, and 2.25 overshoots by 12.5%; the diagonal method is exact because the diagonal squared equals precisely twice the area.', reveals: 'close-enough-1-5' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch9_9', title: 'You made it',
          caseStudy: { intro: 'Legs, hypotenuse, proof — a theorem older than empires, now yours.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch9_6', difficulty: 'standard',
          question: 'A visual proof of the Pythagoras theorem using area demonstrates that in.',
          hint: 'Review the area formulas for squares (side²) and right triangles (½ × base × height) from.',
          misconception: 'Students often think the visual proof only "works" when the triangle sides are Pythagorean triples (like 3,4,5) because.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A visual proof of the Pythagoras theorem using area demonstrates that in a right-angled',
                  options: ['A visual proof of the Pythagoras theorem using area demonstrates that in a right-angled', 'Baudhayana\'s Sulba-Sutra describes a geometric method to construct a square with exactly', 'The converse of the Baudhayana-Pythagoras theorem states that in any triangle, if the', 'A square with double the area of a given square can be constructed by using the diagonal'],
                  hint: 'Review the area formulas for squares (side²) and right triangles (½ × base × height) from Class 6.',
                  misconception: 'Students often think the visual proof only "works" when the triangle sides are Pythagorean triples (like 3,4,5) because the squares then.' }
          ],
            remediations: { 'the-visual-proof-only-works': { steps: ['To fix this, have the student draw the proof with a right triangle of legs 5 cm and 7 cm on grid paper.', 'Guide them to: (1) construct the large square of side 12 cm, (2) place four copies of the 5-7-√74 triangle inside, (3).', 'Emphasize that the diagram\'s logic does not depend on integer side lengths.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch9_7', difficulty: 'standard',
          question: 'A Pythagorean triple is a set of three positive integers (a, b, c) that satisfy.',
          hint: 'Review squaring two-digit numbers (e.g., 12²=144) and HCF of three numbers using prime.',
          misconception: 'Students often think any three numbers that form an arithmetic progression (like 4,5,6 or 10,11,12) can be.',
          parts: [
                { id: 'a', prompt: 'Which of the following sets of numbers is a Pythagorean triple? (6, 8, 10), (5, 7, 9), (8, 15, 17), (9, 12, 14). Explain how you checked each.', answer: '(6, 8, 10) and (8, 15, 17) are Pythagorean triples',
                  options: ['(6, 8, 10) and (8, 15, 17) are Pythagorean triples', 'if a²+b²=c² holds for one ordering, it holds for any ordering (e'],
                  hint: 'Review squaring two-digit numbers (e.g., 12²=144) and HCF of three numbers using prime.',
                  misconception: 'Students often think any three numbers that form an arithmetic progression (like 4,5,6 or 10,11,12) can be a Pythagorean triple, or they.' },
                { id: 'b', prompt: 'A student says, "If (3, 4, 5) is a Pythagorean triple, then (4, 5, 6) must also be one because each number increased by 1." Is the student correct?', answer: 'The student is incorrect',
                  options: ['The student is incorrect', 'if a²+b²=c² holds for one ordering, it holds for any ordering (e'],
                  hint: 'Review squaring two-digit numbers (e.g., 12²=144) and HCF of three numbers using prime.',
                  misconception: 'Students often think any three numbers that form an arithmetic progression (like 4,5,6 or 10,11,12) can be a Pythagorean triple, or they.' },
                { id: 'c', prompt: 'A triangular garden plot has sides measuring 20 m, 21 m, and 29 m. The owner wants to know if the plot is right-angled to place a square shed in one corner.', answer: 'Longest side = 29 m',
                  options: ['Longest side = 29 m', '20²+21²=441 or 29²=581', 'if a²+b²=c² holds for one ordering, it holds for any ordering (e'],
                  hint: 'Review squaring two-digit numbers (e.g., 12²=144) and HCF of three numbers using prime.',
                  misconception: 'Students often think any three numbers that form an arithmetic progression (like 4,5,6 or 10,11,12) can be a Pythagorean triple, or they.' },
                { id: 'd', prompt: 'Observe the triples (3, 4, 5), (5, 12, 13), (7, 24, 25), (9, 40, 41). What pattern do you notice in the first and third numbers?', answer: 'Pattern: The first numbers are consecutive odd numbers 3, 5, 7, 9',
                  options: ['Pattern: The first numbers are consecutive odd numbers 3, 5, 7, 9', 'if a²+b²=c² holds for one ordering, it holds for any ordering (e'],
                  hint: 'Review squaring two-digit numbers (e.g., 12²=144) and HCF of three numbers using prime.',
                  misconception: 'Students often think any three numbers that form an arithmetic progression (like 4,5,6 or 10,11,12) can be a Pythagorean triple, or they.' }
          ],
            remediations: { 'any-three-numbers-that-form': { steps: ['If a student makes the arithmetic progression error, have them test (4,5,6) by computing 4²+5² and 6² side-by-side.', 'Then ask: "What operation on (3,4,5) gives (6,8,10)?" (Multiply by 2).', 'Emphasize: Pythagorean triples scale by multiplication, not addition.', 'For ordering errors, draw a right triangle and label sides; stress that the hypotenuse is ALWAYS the longest side, so.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch9_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think any three numbers that form an arithmetic progression (like 4,5,6 or 10,11,12) can be.',
          parts: [
                { id: 'a', prompt: 'Ravi claims that (10, 24, 26) is a primitive Pythagorean triple because it satisfies the theorem. Priya says it is not primitive. Who is correct?', answer: 'Priya is correct',
                  options: ['Priya is correct', 'any triple', 'primitive triple', 'if a²+b²=c² holds for one ordering, it holds for any ordering (e'],
                  hint: 'Review squaring two-digit numbers (e.g., 12²=144) and HCF of three numbers using prime.',
                  misconception: 'Students often think any three numbers that form an arithmetic progression (like 4,5,6 or 10,11,12) can be a Pythagorean triple, or they.' },
                { id: 'b', prompt: 'Create a real-world problem for a Class 8 student that requires using a Pythagorean triple other than (3, 4, 5) to find an unknown side length.', answer: 'Example problem: "A ladder 13 m long is placed against a wall',
                  options: ['Example problem: "A ladder 13 m long is placed against a wall', 'if a²+b²=c² holds for one ordering, it holds for any ordering (e'],
                  hint: 'Review squaring two-digit numbers (e.g., 12²=144) and HCF of three numbers using prime.',
                  misconception: 'Students often think any three numbers that form an arithmetic progression (like 4,5,6 or 10,11,12) can be a Pythagorean triple, or they.' }
          ],
            remediations: { 'any-three-numbers-that-form': { steps: ['If a student makes the arithmetic progression error, have them test (4,5,6) by computing 4²+5² and 6² side-by-side.', 'Then ask: "What operation on (3,4,5) gives (6,8,10)?" (Multiply by 2).', 'Emphasize: Pythagorean triples scale by multiplication, not addition.', 'For ordering errors, draw a right triangle and label sides; stress that the hypotenuse is ALWAYS the longest side, so.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch9_8', difficulty: 'standard',
          question: 'The Pythagoras theorem states that in a right-angled triangle, the square.',
          hint: 'Review squares and square roots (Class 8 chapter on squares and square roots) and solving.',
          misconception: 'Students often forget to take the square root after adding/subtracting squares, giving the squared value as the side.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Pythagoras theorem states that in a right-angled triangle, the square of the',
                  options: ['The Pythagoras theorem states that in a right-angled triangle, the square of the', 'Baudhayana\'s Sulba-Sutra describes a geometric method to construct a square with exactly', 'The converse of the Baudhayana-Pythagoras theorem states that in any triangle, if the', 'A square with double the area of a given square can be constructed by using the diagonal'],
                  hint: 'Review squares and square roots (Class 8 chapter on squares and square roots) and solving simple.',
                  misconception: 'Students often forget to take the square root after adding/subtracting squares, giving the squared value as the side length (e.g., \\(c^2.' }
          ],
            remediations: { 'students-often-forget-to-take': { steps: ['If a student makes the square root error: Have them practice perfect squares and square roots (e.g., \\(1^2=1, 2^2=4.', 'Then give a problem: "If \\(c^2 = 169\\), what is \\(c\\)?" Emphasize that \\(c^2\\) means \\(c \\times c\\), so \\(c\\) is the.', 'For the subtraction error: Use a physical model (straws or sticks) to show that the hypotenuse is the longest side.', 'Have them measure and compare: if hypotenuse is 13 and one leg is 5, the other leg cannot be longer than 13.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch9_9', difficulty: 'standard',
          question: 'The Pythagoras theorem states that in a right-angled triangle, the square.',
          hint: 'Revisit c8_math_ch9_8 (basic applications) and c7_math_ch07_005 (identifying right.',
          misconception: 'Students consistently misidentify the hypotenuse in word problems.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Pythagoras theorem states that in a right-angled triangle, the square of the',
                  options: ['The Pythagoras theorem states that in a right-angled triangle, the square of the', 'Baudhayana\'s Sulba-Sutra describes a geometric method to construct a square with exactly', 'The converse of the Baudhayana-Pythagoras theorem states that in any triangle, if the', 'A square with double the area of a given square can be constructed by using the diagonal'],
                  hint: 'Revisit c8_math_ch9_8 (basic applications) and c7_math_ch07_005 (identifying right triangles.',
                  misconception: 'Students consistently misidentify the hypotenuse in word problems.' }
          ],
            remediations: { 'students-consistently-misidentify-the-hypotenuse': { steps: ['First, have the student physically act out or draw the scenario: stand a ruler (ladder) against a book (wall) on.', 'Ask: "Which side is the slanted one?', 'Which is the longest?" Label the triangle: right angle at book-table corner, hypotenuse = ruler.', 'Second, give a fixed drill: "For each problem, circle the hypotenuse FIRST, then write the formula with hypotenuse.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
