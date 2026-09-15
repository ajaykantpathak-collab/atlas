import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch05_p2: SimDef = {
    id: 'v3_c11_math_ch05_p2',
    title: 'Complex Numbers and Quadratic Equations · Part 2/2',
    subtitle: 'Meet the number invented to keep equations solvable — and the rule it quietly breaks.',
    classLevel: 11, subject: 'mathematics', topic: 'Complex Numbers and Quadratic Equations · Part 2/2',
    chapters: ['c11_math_ch05'],
    nodeIds: ['c11_math_cbse_05_007', 'c11_math_cbse_05_008', 'c11_math_cbse_05_009', 'c11_math_cbse_05_010', 'c11_math_cbse_05_011', 'c11_math_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a mathematician extending the number line into a plane', intro: 'A spring equation ends at x² = −9 and the real numbers surrender — so mathematics grew a new dimension rather than accept defeat.', goal: 'Compute with i correctly, respect the restricted radical rule, and read real/imaginary parts precisely.' },
    discovery: {
        question: '√(−4) × √(−9) = √36 = 6 — quick check, right?',
        options: ['Wrong — (2i)(3i) = 6i² = −6; the product rule for roots only survives for non-negative radicands', 'Right — roots multiply under one radical', 'Right — the negatives cancel', 'Wrong — the answer is 6i, not −6'],
        answer: 'Wrong — (2i)(3i) = 6i² = −6; the product rule for roots only survives for non-negative radicands',
        hook: 'The imaginary part of 2 − 5i is −5, a real number — i is not a variable to cancel, and Im(z) never carries the i.',
    },
    teaching: [
        { title: 'Modulus and Conjugate of a Complex Number', text: 'The modulus of a complex number \\( z = a + ib \\) (where \\( a, b \\in \\mathbb{R} \\)) is the non-negative real number \\( |z| = \\sqrt{a^2 + b^2} \\), representing its distance from the origin on the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_05_007', title: 'Your mission',
          mission: { widget: 'globe', validate: 'globe:tilt=60',
            instruction: 'On the lab: tilt the axis — which hemisphere gets more light?.',
        context: 'Solve x² + 9 = 0 with ±3i, put (2 + √−16)/2 into a + ib form, and argue whether \'no real roots\' ever meant \'no roots.\'',
            observePrompt: 'What did the globe interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_05_007', title: 'Modulus and Conjugate of a Complex Number',
          scaffold: { problem: 'A signal in a communication system is represented by the complex number \\( z = \\frac{2 + 3i}{1 - i} \\).',
            steps: [
            { text: 'Simplify \\( z \\) to standard form by multiplying numerator and denominator by the conjugate of the denominator: \\(.' },
            { text: 'Compute numerator: \\( (2+3i)(1+i) = 2 + 2i + 3i + 3i^2 = 2 + 5i - 3 = -1 + 5i \\).' },
            { text: 'Write \\( z \\) in standard form: \\( z = \\frac{-1 + 5i}{2} = -\\frac{1}{2} + \\frac{5}{2}i \\).' },
            { text: 'Compute modulus: \\( |z| = \\sqrt{a^2 + b^2} = \\sqrt{\\left(-\\frac{1}{2}\\right)^2 + \\left(\\frac{5}{2}\\right)^2}.' },
            { text: 'Compute conjugate: \\( \\bar{z} = -\\frac{1}{2} - \\frac{5}{2}i \\).', faded: true, blankAnswer: '\\( z = -\\frac{1}{2} + \\frac{5}{2}i \\), \\( |z|.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_05_008', title: 'Argand Plane and Polar Representation',
          scaffold: { problem: 'Represent the complex number \\(z = -3 + 3i\\) on the Argand plane and find its polar form.',
            steps: [
            { text: 'Identify \\(x = -3, y = 3\\). Plot the point \\((-3, 3)\\) in the second quadrant.' },
            { text: 'Compute modulus \\(r = \\sqrt{(-3)^2 + 3^2} = \\sqrt{9+9} = \\sqrt{18} = 3\\sqrt{2}\\).' },
            { text: 'Find reference angle \\(\\alpha = \\tan^{-1}(|y/x|) = \\tan^{-1}(1) = \\pi/4\\).' },
            { text: 'Since point is in Q2 (\\(x<0, y>0\\)), principal argument \\(\\theta = \\pi - \\alpha = \\pi - \\pi/4 = 3\\pi/4\\).' },
            { text: 'Write polar form: \\(z = 3\\sqrt{2}(\\cos \\frac{3\\pi}{4} + i \\sin \\frac{3\\pi}{4})\\).' },
            { text: 'Verify: \\(\\cos \\frac{3\\pi}{4} = -\\frac{1}{\\sqrt{2}}, \\sin \\frac{3\\pi}{4} = \\frac{1}{\\sqrt{2}}\\).', faded: true, blankAnswer: 'Polar form: \\(z = 3\\sqrt{2}(\\cos \\frac{3\\pi}{4} + i \\sin.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_05_009', title: 'Polar Form: r and theta',
          scaffold: { problem: 'A signal in an electrical engineering lab is represented by the complex impedance \\(Z = -3 + 3\\sqrt{3}i\\) ohms.',
            steps: [
            { text: 'Identify real and imaginary parts: \\(x = -3\\), \\(y = 3\\sqrt{3}\\).' },
            { text: 'Compute modulus: \\(r = \\sqrt{x^2 + y^2} = \\sqrt{(-3)^2 + (3\\sqrt{3})^2} = \\sqrt{9 + 27} = \\sqrt{36} = 6\\).' },
            { text: 'Find reference angle: \\(\\tan\\alpha = |y/x| = \\frac{3\\sqrt{3}}{3} = \\sqrt{3} \\Rightarrow \\alpha = \\frac{\\pi}{3}\\).' },
            { text: 'Determine quadrant: \\(x<0, y>0\\) ⇒ QII. Principal argument: \\(\\theta = \\pi - \\alpha = \\pi - \\frac{\\pi}{3}.' },
            { text: 'Write polar form: \\(Z = 6\\left(\\cos\\frac{2\\pi}{3} + i\\sin\\frac{2\\pi}{3}\\right)\\) ohms.', faded: true, blankAnswer: '\\(6\\left(\\cos\\frac{2\\pi}{3} + i\\sin\\frac{2\\pi}{3}\\right)\\).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_05_010', title: 'Euler\'s Form of Complex Numbers',
          scaffold: { problem: 'Express the complex number \\(z = \\frac{1 + i}{\\sqrt{3} - i}\\) in Euler form \\(r e^{i\\theta}\\) with principal argument.',
            steps: [
            { text: 'Simplify the quotient by multiplying numerator and denominator by the conjugate of the denominator: \\(\\frac{1.' },
            { text: 'Compute numerator: \\((1+i)(\\sqrt{3}+i) = \\sqrt{3} + i + i\\sqrt{3} + i^2 = (\\sqrt{3} - 1) + i(1 + \\sqrt{3})\\).' },
            { text: 'Write simplified Cartesian form: \\(z = \\frac{\\sqrt{3} - 1}{4} + i\\frac{\\sqrt{3} + 1}{4}\\).' },
            { text: 'Find modulus \\(r = \\sqrt{\\left(\\frac{\\sqrt{3} - 1}{4}\\right)^2 + \\left(\\frac{\\sqrt{3} + 1}{4}\\right)^2} = \\sqrt{\\frac{3.' },
            { text: 'Find argument \\(\\theta\\): \\(\\tan\\theta = \\frac{\\sqrt{3} + 1}{\\sqrt{3} - 1}\\).' },
            { text: 'Write Euler form: \\(z = \\frac{1}{\\sqrt{2}} e^{i\\frac{5\\pi}{12}}\\).', faded: true, blankAnswer: '\\(z = \\frac{1}{\\sqrt{2}} e^{i\\frac{5\\pi}{12}}\\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_05_011', title: 'Quadratic Equations with Complex Roots',
          scaffold: { problem: 'A rectangular garden has area 24 m². Its length is 2 metres more than its breadth. The perimeter is given by P = 2(l + b).',
            steps: [
            { text: 'Let breadth = x metres. Then length = (x + 2) metres. Area = x(x + 2) = 24 → x² + 2x - 24 = 0.' },
            { text: 'Identify coefficients: a = 1, b = 2, c = -24. Compute discriminant: D = b² - 4ac = 4 - 4(1)(-24) = 4 + 96 = 100.' },
            { text: 'Since D = 100 > 0, roots are real and distinct. Apply quadratic formula: x = [-2 ± √100]/2 = [-2 ± 10]/2.' },
            { text: 'Roots: x = 4 or x = -6. Breadth cannot be negative, so x = 4 m. Length = 6 m. Perimeter = 2(4+6) = 20 m.' },
            { text: 'Now modify: Suppose area = 30 m² with same length-breadth relation. Equation: x² + 2x - 30 = 0.' },
            { text: 'For x² + 2x + 5 = 0: √D = √(-16) = 4i. Roots: x = [-2 ± 4i]/2 = -1 ± 2i. These are complex conjugates.', faded: true, blankAnswer: 'For area 24 m²: breadth = 4 m, length = 6 m, perimeter = 20.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_05_012', title: 'Argand Diagram: Geometric Interpretation',
          scaffold: { problem: 'Represent the complex number z = -√3 + i on the Argand plane. Find its modulus, principal argument, and plot its conjugate z̅.',
            steps: [
            { text: 'Identify real and imaginary parts: x = -√3, y = 1. Plot point P(-√3, 1) on Argand plane.' },
            { text: 'Compute modulus: |z| = √(x² + y²) = √((-√3)² + 1²) = √(3 + 1) = √4 = 2.' },
            { text: 'Compute principal argument: tanθ = y/x = 1/(-√3) = -1/√3. Since point is in QII, θ = π - π/6 = 5π/6. So arg(z) = 5π/6.' },
            { text: 'Find conjugate: z̅ = x - iy = -√3 - i. Plot Q(-√3, -1) in Quadrant III.' },
            { text: 'Geometric relationship: z̅ is the reflection of z across the real axis (x-axis).', faded: true, blankAnswer: 'z = -√3 + i plots at (-√3, 1) in QII; |z| = 2; arg(z).' }
            ] } },
        { type: 'drill', nodeId: 'c11_math_cbse_05_012', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Checking homework, you find: √(-4)·√(-9) = √36 = 6, and for z = 2 − 5i the student writes Im(z) = −5i \'since the imaginary part includes the i.\'',
            decisions: [{ prompt: 'What rules of complex arithmetic were broken?', options: [
                { text: 'Apply the restricted rules: √a·√b = √(ab) holds only for non-negative radicands — with negatives, convert first: (2i)(3i) = 6i² = −6. And the imaginary part is defined as a real number: for a + ib, Im(z) = b, so Im(2 − 5i) = −5 — the i is notation, not part of the value.', outcome: 'Both slips trace to treating i like an ordinary symbol: radical laws don\'t extend to negatives, and Im(z) reports the coefficient, not the term.' },
                { text: 'Keep √36 = 6 — the product of two square roots is the root of the product, always.', outcome: 'That law is stated for non-negative reals; applied to negatives it manufactures a false positive — the true product carries i² = −1.', reveals: 'root-rule-applies-to-negatives' },
                { text: 'Keep Im(z) = −5i — the \'imaginary part\' naturally carries the i.', outcome: 'By definition Im(z) is the real coefficient b; including i confuses the part with the term and breaks comparisons like Im(z) > 0.', reveals: 'imaginary-part-includes-i' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_05_012', title: 'You made it',
          caseStudy: { intro: 'Every extension of the number system was once \'impossible\' — negatives for x + 5 = 3, fractions for 3x = 1, i for x² = −1.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'globe', prompt: 'Explore the globe interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'globe', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_05_007', difficulty: 'standard',
          question: 'The modulus of a complex number \\( z = a + ib \\) (where \\( a, b \\in \\mathbb{R}.',
          hint: 'If stuck, revisit c11_math_cbse_05_002 (standard form identification) and c9_math_ch1_4.',
          misconception: 'Students often write \\( |a + ib| = \\sqrt{a^2 + (ib)^2} = \\sqrt{a^2 - b^2} \\), treating \\( i \\) as part of the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The modulus of a complex number \\( z = a + ib \\) (where \\( a, b \\in \\mathbb{R} \\)) is the',
                  options: ['The modulus of a complex number \\( z = a + ib \\) (where \\( a, b \\in \\mathbb{R} \\)) is the', 'Complex numbers are an extension of the real number system, defined as numbers of the', 'A complex number is a number of the form \\( z = a + ib \\), where \\( a \\) and \\( b \\) are', 'Addition and subtraction of complex numbers are performed by separately adding or'],
                  hint: 'If stuck, revisit c11_math_cbse_05_002 (standard form identification) and c9_math_ch1_4 (distance.',
                  misconception: 'Students often write \\( |a + ib| = \\sqrt{a^2 + (ib)^2} = \\sqrt{a^2 - b^2} \\), treating \\( i \\) as part of the coefficient inside the square.' }
          ],
            remediations: { 'students-often-write-a-ib': { steps: ['Ask the student to plot \\( 3 + 4i \\) on the Argand plane and physically measure the distance from origin using a ruler.', 'Then write the distance formula \\( \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2} \\) with \\( (x_1,y_1) = (0,0) \\) and \\( (x_2,y_2).', 'Explicitly connect: the x-coordinate is the real part \\( a \\), the y-coordinate is the imaginary coefficient \\( b \\).', 'Have them recompute \\( |3+4i| \\) using this geometric understanding, then practice with \\( -5 + 12i \\) and \\( -3 - 4i.'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_05_008', difficulty: 'standard',
          question: 'The Argand plane is a Cartesian coordinate system where a complex number \\(z.',
          hint: 'If stuck, revisit Class 9 coordinate geometry (c9_math_ch1_1, c9_math_ch1_3) for plotting.',
          misconception: 'Students often compute the argument as \\(\\theta = \\tan^{-1}(y/x)\\) without adjusting for the quadrant, leading to.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Argand plane is a Cartesian coordinate system where a complex number \\(z = x + iy\\)',
                  options: ['The Argand plane is a Cartesian coordinate system where a complex number \\(z = x + iy\\)', 'Complex numbers are an extension of the real number system, defined as numbers of the', 'A complex number is a number of the form \\( z = a + ib \\), where \\( a \\) and \\( b \\) are', 'Addition and subtraction of complex numbers are performed by separately adding or'],
                  hint: 'If stuck, revisit Class 9 coordinate geometry (c9_math_ch1_1, c9_math_ch1_3) for plotting and.',
                  misconception: 'Students often compute the argument as \\(\\theta = \\tan^{-1}(y/x)\\) without adjusting for the quadrant, leading to an angle in the wrong.' }
          ],
            remediations: { 'students-often-compute-the-argument': { steps: ['If a student cannot determine the correct quadrant, guide them through these steps: 1) Plot the point \\((x,y)\\).', '2) Identify the quadrant by signs of \\(x\\) and \\(y\\).', '3) Compute the reference angle \\(\\alpha = \\tan^{-1}(|y/x|)\\).', '4) Use the quadrant rule: Q1: \\(\\theta = \\alpha\\); Q2: \\(\\theta = \\pi - \\alpha\\); Q3: \\(\\theta = -\\pi + \\alpha\\) (or.'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_05_009', difficulty: 'standard',
          question: 'The polar form of a non-zero complex number \\(z = x + iy\\) is \\(z.',
          hint: 'Revise Class 10 Trigonometry (c10_math_cbse_08_001 to c10_math_cbse_08_005) focusing.',
          misconception: 'Students compute \\(\\theta = \\tan^{-1}(y/x)\\) using a calculator and take that as the argument without quadrant.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The polar form of a non-zero complex number \\(z = x + iy\\) is \\(z = r(\\cos\\theta +',
                  options: ['The polar form of a non-zero complex number \\(z = x + iy\\) is \\(z = r(\\cos\\theta +', 'Complex numbers are an extension of the real number system, defined as numbers of the', 'A complex number is a number of the form \\( z = a + ib \\), where \\( a \\) and \\( b \\) are', 'Addition and subtraction of complex numbers are performed by separately adding or'],
                  hint: 'Revise Class 10 Trigonometry (c10_math_cbse_08_001 to c10_math_cbse_08_005) focusing on exact.',
                  misconception: 'Students compute \\(\\theta = \\tan^{-1}(y/x)\\) using a calculator and take that as the argument without quadrant adjustment.' }
          ],
            remediations: { 'students-compute-theta-tan-1': { steps: ['Have the student plot the point \\((x,y)\\) on the Argand plane and identify the quadrant.', 'Compute the reference angle \\(\\alpha = \\tan^{-1}(|y/x|)\\) (always positive, in QI).', 'Use the quadrant rule: QI: \\(\\theta=\\alpha\\); QII: \\(\\theta=\\pi-\\alpha\\); QIII: \\(\\theta=-\\pi+\\alpha\\) (or.', 'Verify by checking that \\(\\cos\\theta\\) has the same sign as \\(x\\) and \\(\\sin\\theta\\) has the same sign as \\(y\\).'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_05_010', difficulty: 'standard',
          question: 'Euler\'s form expresses a complex number \\(z = x + iy\\) as \\(z =.',
          hint: 'If stuck, revisit c11_math_cbse_05_009 (Polar Form: r and theta) for argument.',
          misconception: 'Students often write \\(e^{i\\theta} = \\cos\\theta + \\sin\\theta\\) (missing the \\(i\\) before \\(\\sin\\theta\\)) or treat the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Euler\'s form expresses a complex number \\(z = x + iy\\) as \\(z = r e^{i\\theta}\\), where',
                  options: ['Euler\'s form expresses a complex number \\(z = x + iy\\) as \\(z = r e^{i\\theta}\\), where', 'Complex numbers are an extension of the real number system, defined as numbers of the', 'A complex number is a number of the form \\( z = a + ib \\), where \\( a \\) and \\( b \\) are', 'Addition and subtraction of complex numbers are performed by separately adding or'],
                  hint: 'If stuck, revisit c11_math_cbse_05_009 (Polar Form: r and theta) for argument calculation, and.',
                  misconception: 'Students often write \\(e^{i\\theta} = \\cos\\theta + \\sin\\theta\\) (missing the \\(i\\) before \\(\\sin\\theta\\)) or treat the argument.' }
          ],
            remediations: { 'students-often-write-e-i': { steps: ['If a student writes \\(e^{i\\theta} = \\cos\\theta + \\sin\\theta\\): Ask them to compute \\(e^{i\\pi/2}\\) using both sides.', 'LHS = \\(i\\), RHS = \\(0 + 1 = 1\\).', 'The mismatch forces the missing \\(i\\).', 'For argument errors: Give \\(z = -1 - i\\).'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_05_011', difficulty: 'standard',
          question: 'A quadratic equation with complex roots is an equation of the form \\(ax^2 +.',
          hint: 'Revisit Class 10 discriminant node (c10_math_cbse_04_007) and Class 11 powers of iota.',
          misconception: 'Students write \\(\\sqrt{-16} = -4\\) or \\(\\sqrt{-16} = 4\\) instead of \\(4i\\), treating the negative sign as disappearing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A quadratic equation with complex roots is an equation of the form \\(ax^2 + bx + c = 0\\)',
                  options: ['A quadratic equation with complex roots is an equation of the form \\(ax^2 + bx + c = 0\\)', 'Complex numbers are an extension of the real number system, defined as numbers of the', 'A complex number is a number of the form \\( z = a + ib \\), where \\( a \\) and \\( b \\) are', 'Addition and subtraction of complex numbers are performed by separately adding or'],
                  hint: 'Revisit Class 10 discriminant node (c10_math_cbse_04_007) and Class 11 powers of iota node.',
                  misconception: 'Students write \\(\\sqrt{-16} = -4\\) or \\(\\sqrt{-16} = 4\\) instead of \\(4i\\), treating the negative sign as disappearing or moving outside.' }
          ],
            remediations: { 'students-write-sqrt-16-4': { steps: ['Revisit the definition \\(i = \\sqrt{-1}\\) and \\(i^2 = -1\\).', 'Practice simplifying \\(\\sqrt{-k}\\) for \\(k > 0\\) as \\(\\sqrt{k} \\cdot i\\) (e.g., \\(\\sqrt{-18} = 3\\sqrt{2}i\\)).', 'Drill the rule: \\(\\sqrt{a}\\sqrt{b} = \\sqrt{ab}\\) ONLY holds for \\(a, b \\geq 0\\); for negatives, factor out \\(i\\) first.', 'Re-solve the quadratic with the correct \\(\\sqrt{D} = i\\sqrt{|D|}\\) and verify sum/product of roots are real.'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_05_012', difficulty: 'standard',
          question: 'The Argand diagram is a geometric representation of complex numbers on.',
          hint: 'Revisit Class 9 coordinate geometry (c9_math_ch1_1 to 1_4) for plotting and distance.',
          misconception: 'Students treat the Argand diagram as merely a plotting exercise and fail to see operations as geometric.',
          parts: [
                { id: 'a', prompt: 'Explain why multiplying a complex number z by i corresponds to a 90° anticlockwise rotation about the origin on the Argand plane, using both algebraic and.', answer: 'Algebraically: if z = x + iy, then iz = i(x + iy) = ix - y = -y + ix',
                  options: ['Algebraically: if z = x + iy, then iz = i(x + iy) = ix - y = -y + ix', 'it rotates'],
                  hint: 'Revisit Class 9 coordinate geometry (c9_math_ch1_1 to 1_4) for plotting and distance formula, and.',
                  misconception: 'Students treat the Argand diagram as merely a plotting exercise and fail to see operations as geometric transformations.' },
                { id: 'b', prompt: 'Given z₁ = 3 + 4i and z₂ = 1 - 2i, compare |z₁ + z₂| and |z₁| + |z₂|. What geometric principle does this illustrate?', answer: 'z₁ + z₂ = 4 + 2i, |z₁ + z₂| = √(16+4) = √20 ≈ 4.47',
                  options: ['z₁ + z₂ = 4 + 2i, |z₁ + z₂| = √(16+4) = √20 ≈ 4.47', 'modulus distributes over addition'],
                  hint: 'Revisit Class 9 coordinate geometry (c9_math_ch1_1 to 1_4) for plotting and distance formula, and.',
                  misconception: 'Students treat the Argand diagram as merely a plotting exercise and fail to see operations as geometric transformations.' }
          ],
            remediations: { 'students-treat-the-argand-diagram': { steps: ['Draw z₁ = 3+4i and z₂ = 1-2i as vectors from origin.', 'Complete the parallelogram: z₁+z₂ is the diagonal.', 'Measure lengths: diagonal √20 ≈ 4.47, sum of sides 5+√5 ≈ 7.24.', 'Ask: "Can the diagonal be longer than the sum of two sides?" 5.'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_05_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the Argand diagram as merely a plotting exercise and fail to see operations as geometric.',
          parts: [
                { id: 'a', prompt: 'A student claims that the locus of z satisfying |z - (2 + 3i)| = 4 is a straight line. Evaluate this claim and provide the correct geometric description.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'straight line'],
                  hint: 'Revisit Class 9 coordinate geometry (c9_math_ch1_1 to 1_4) for plotting and distance formula, and.',
                  misconception: 'Students treat the Argand diagram as merely a plotting exercise and fail to see operations as geometric transformations.' }
          ],
            remediations: { 'students-treat-the-argand-diagram': { steps: ['Draw z₁ = 3+4i and z₂ = 1-2i as vectors from origin.', 'Complete the parallelogram: z₁+z₂ is the diagonal.', 'Measure lengths: diagonal √20 ≈ 4.47, sum of sides 5+√5 ≈ 7.24.', 'Ask: "Can the diagonal be longer than the sum of two sides?" 5.'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
