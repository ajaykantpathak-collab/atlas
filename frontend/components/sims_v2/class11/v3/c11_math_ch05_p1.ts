import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch05_p1: SimDef = {
    id: 'v3_c11_math_ch05_p1',
    title: 'Complex Numbers and Quadratic Equations · Part 1/2',
    subtitle: 'Meet the number invented to keep equations solvable — and the rule it quietly breaks.',
    classLevel: 11, subject: 'mathematics', topic: 'Complex Numbers and Quadratic Equations · Part 1/2',
    chapters: ['c11_math_ch05'],
    nodeIds: ['c11_math_cbse_05_001', 'c11_math_cbse_05_002', 'c11_math_cbse_05_003', 'c11_math_cbse_05_004', 'c11_math_cbse_05_005', 'c11_math_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a mathematician extending the number line into a plane', intro: 'A spring equation ends at x² = −9 and the real numbers surrender — so mathematics grew a new dimension rather than accept defeat.', goal: 'Compute with i correctly, respect the restricted radical rule, and read real/imaginary parts precisely.' },
    discovery: {
        question: '√(−4) × √(−9) = √36 = 6 — quick check, right?',
        options: ['Wrong — (2i)(3i) = 6i² = −6; the product rule for roots only survives for non-negative radicands', 'Right — roots multiply under one radical', 'Right — the negatives cancel', 'Wrong — the answer is 6i, not −6'],
        answer: 'Wrong — (2i)(3i) = 6i² = −6; the product rule for roots only survives for non-negative radicands',
        hook: 'The imaginary part of 2 − 5i is −5, a real number — i is not a variable to cancel, and Im(z) never carries the i.',
    },
    teaching: [
        { title: 'Need for Complex Numbers: Beyond Real Numbers', text: 'Complex numbers are an extension of the real number system, defined as numbers of the form \\(a + ib\\) where \\(a, b \\in \\mathbb{R}\\) and \\(i\\) is the imaginary unit satisfying \\(i^2 = -1\\).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_05_001', title: 'Your mission',
          mission: { widget: 'globe', validate: 'globe:tilt=60',
            instruction: 'On the lab: tilt the axis — which hemisphere gets more light?.',
        context: 'Solve x² + 9 = 0 with ±3i, put (2 + √−16)/2 into a + ib form, and argue whether \'no real roots\' ever meant \'no roots.\'',
            observePrompt: 'What did the globe interactive show you?' } },
        { type: 'case', nodeId: 'c11_math_cbse_05_001', title: 'Need for Complex Numbers: Beyond Real Numbers',
          caseStudy: { intro: 'Imagine you are solving a physics problem about a spring-mass system and arrive at the equation \\(x^2 + 9 = 0\\).',
            decisions: [{ prompt: 'What is the defining property of the imaginary unit \\(i\\)? State it as an equation.', options: [
                { text: '\\(i^2 = -1\\)', outcome: '\\(i^2 = -1\\). A wrong answer like \\(i = \\sqrt{-1}\\) is ambiguous because \\(-\\sqrt{-1}\\) also.' },
                { text: 'a principal branch', outcome: 'Not quite — Students often apply the rule \\(\\sqrt{a}\\sqrt{b} = \\sqrt{ab}\\) to negative numbers, e.g.', reveals: 'students-often-apply-the-rule' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_05_002', title: 'Complex Numbers: Definition and Standard Form',
          scaffold: { problem: 'Express \\( \\frac{3 - \\sqrt{-49}}{7} \\) in the standard form \\( a + ib \\) and identify its real and imaginary parts.',
            steps: [
            { text: 'Simplify the square root of the negative number: \\( \\sqrt{-49} = \\sqrt{49} \\cdot \\sqrt{-1} = 7i \\).' },
            { text: 'Substitute back into the expression: \\( \\frac{3 - 7i}{7} \\).' },
            { text: 'Separate the fraction into real and imaginary parts: \\( \\frac{3}{7} - \\frac{7i}{7} \\).' },
            { text: 'Simplify each part: \\( \\frac{3}{7} - i \\).' },
            { text: 'Write in standard form \\( a + ib \\): \\( a = \\frac{3}{7} \\), \\( b = -1 \\).', faded: true, blankAnswer: 'Standard form: \\( \\frac{3}{7} - i \\); Real part = \\.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_05_003', title: 'Algebra of Complex Numbers: Addition and Subtraction',
          scaffold: { problem: 'A circuit in a physics lab has two impedance components: \\(Z_1 = 4 + 3j\\) ohms and \\(Z_2 = 2 - 5j\\) ohms (engineering uses \\(j\\) for.',
            steps: [
            { text: 'Identify that series connection means impedances add: \\(Z_{\\text{total}} = Z_1 + Z_2\\).' },
            { text: 'Write both in standard form: \\(Z_1 = 4 + 3j\\), \\(Z_2 = 2 - 5j\\).' },
            { text: 'Add real parts: \\(4 + 2 = 6\\). Add imaginary parts: \\(3j + (-5j) = -2j\\).' },
            { text: 'Combine: \\(Z_{\\text{total}} = 6 - 2j\\) ohms.' },
            { text: 'Interpret: The resistive part is 6 ohms, reactive part is -2j ohms (capacitive).', faded: true, blankAnswer: '\\(6 - 2j\\) ohms' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_05_004', title: 'Multiplication of Complex Numbers',
          scaffold: { problem: 'In an AC circuit, the impedance of a resistor-inductor branch is \\(Z_1 = 3 + 4j\\) ohms and a capacitor branch is \\(Z_2 = 2 - 3j\\) ohms.',
            steps: [
            { text: 'Identify the two complex numbers: \\(Z_1 = 3 + 4j\\), \\(Z_2 = 2 - 3j\\).' },
            { text: 'Write the multiplication using FOIL: \\((3 + 4j)(2 - 3j) = 3(2) + 3(-3j) + 4j(2) + 4j(-3j)\\).' },
            { text: 'Compute each term: \\(6 - 9j + 8j - 12j^2\\).' },
            { text: 'Replace \\(j^2\\) with \\(-1\\): \\(6 - 9j + 8j - 12(-1) = 6 - j + 12\\).' },
            { text: 'Combine real and imaginary parts: \\(18 - j\\). The product is \\(18 - j\\) ohms² (units are ohms squared for this product).', faded: true, blankAnswer: '\\(18 - j\\) (or \\(18 - i\\) in mathematical notation)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_05_005', title: 'Division of Complex Numbers',
          scaffold: { problem: 'In an AC circuit analysis, the voltage across a component is measured as \\(V = (15 + 20i)\\) volts and the impedance is \\(Z = (3 + 4i)\\).',
            steps: [
            { text: 'Identify \\(z_1 = 15+20i\\) (voltage), \\(z_2 = 3+4i\\) (impedance). Note \\(z_2 \\neq 0\\) since \\(3^2+4^2 = 25 \\neq 0\\).' },
            { text: 'Write division as fraction and multiply numerator and denominator by conjugate of denominator \\(\\overline{z_2}.' },
            { text: 'Compute denominator: \\((3+4i)(3-4i) = 3^2 - (4i)^2 = 9 - 16i^2 = 9 - 16(-1) = 9+16 = 25\\).' },
            { text: 'Compute numerator using FOIL: \\((15+20i)(3-4i) = 15(3) + 15(-4i) + 20i(3) + 20i(-4i) = 45 -60i +60i -80i^2 = 45 -80(-1).' },
            { text: 'Combine: \\(I = \\frac{125}{25} + i\\frac{0}{25} = 5 + 0i = 5\\) amperes. Verify: \\(5 \\times (3+4i) = 15+20i = V\\). ✓', faded: true, blankAnswer: '\\(I = 5\\) A (or \\(5 + 0i\\) A)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_05_006', title: 'Powers of i (iota)',
          scaffold: { problem: 'Simplify (3i)⁷ + (2i)⁻⁵.',
            steps: [
            { text: 'Separate the constants and powers of i: (3i)⁷ = 3⁷ · i⁷ and (2i)⁻⁵ = 2⁻⁵ · i⁻⁵.' },
            { text: 'Reduce the exponents of i modulo 4. For i⁷: 7 = 4×1 + 3, so i⁷ = i³ = -i. For i⁻⁵: write i⁻⁵ = 1/i⁵.' },
            { text: 'Compute the constants: 3⁷ = 2187, 2⁻⁵ = 1/32.' },
            { text: 'Combine: 2187 × (-i) + (1/32) × (-i) = -2187i - (1/32)i = -(2187 + 1/32)i = -(70016/32 + 1/32)i = -(70017/32)i.' },
            { text: 'Final answer: - (70017/32) i.', faded: true, blankAnswer: '- (70017/32) i' }
            ] } },
        { type: 'drill', nodeId: 'c11_math_cbse_05_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Checking homework, you find: √(-4)·√(-9) = √36 = 6, and for z = 2 − 5i the student writes Im(z) = −5i \'since the imaginary part includes the i.\'',
            decisions: [{ prompt: 'What rules of complex arithmetic were broken?', options: [
                { text: 'Apply the restricted rules: √a·√b = √(ab) holds only for non-negative radicands — with negatives, convert first: (2i)(3i) = 6i² = −6. And the imaginary part is defined as a real number: for a + ib, Im(z) = b, so Im(2 − 5i) = −5 — the i is notation, not part of the value.', outcome: 'Both slips trace to treating i like an ordinary symbol: radical laws don\'t extend to negatives, and Im(z) reports the coefficient, not the term.' },
                { text: 'Keep √36 = 6 — the product of two square roots is the root of the product, always.', outcome: 'That law is stated for non-negative reals; applied to negatives it manufactures a false positive — the true product carries i² = −1.', reveals: 'root-rule-applies-to-negatives' },
                { text: 'Keep Im(z) = −5i — the \'imaginary part\' naturally carries the i.', outcome: 'By definition Im(z) is the real coefficient b; including i confuses the part with the term and breaks comparisons like Im(z) > 0.', reveals: 'imaginary-part-includes-i' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'Every extension of the number system was once \'impossible\' — negatives for x + 5 = 3, fractions for 3x = 1, i for x² = −1.',
            decisions: [{ prompt: 'What comes next? Complex Numbers and Quadratic Equations · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Complex Numbers and Quadratic Equations · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'globe', prompt: 'Explore the globe interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'globe', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_05_001', difficulty: 'standard',
          question: 'Complex numbers are an extension of the real number system, defined as numbers.',
          hint: 'Review Class 10 quadratic equations, specifically the discriminant and the case \\(D < 0\\).',
          misconception: 'Students often apply the rule \\(\\sqrt{a}\\sqrt{b} = \\sqrt{ab}\\) to negative numbers, e.g., \\(\\sqrt{-4}\\sqrt{-9}.',
          parts: [
                { id: 'a', prompt: 'What is the defining property of the imaginary unit \\(i\\)? State it as an equation.', answer: '\\(i^2 = -1\\)',
                  options: ['\\(i^2 = -1\\)', 'a principal branch'],
                  hint: 'Review Class 10 quadratic equations, specifically the discriminant and the case \\(D < 0\\) (nodes.',
                  misconception: 'Students often apply the rule \\(\\sqrt{a}\\sqrt{b} = \\sqrt{ab}\\) to negative numbers, e.g., \\(\\sqrt{-4}\\sqrt{-9} = \\sqrt{36} = 6\\).' },
                { id: 'b', prompt: 'Why does the equation \\(x^2 + 4 = 0\\) have no real solution? Explain using the properties of real numbers.', answer: 'For any real number \\(x\\), \\(x^2 \\ge 0\\), so \\(x^2 + 4 \\ge 4 > 0\\)',
                  options: ['For any real number \\(x\\), \\(x^2 \\ge 0\\), so \\(x^2 + 4 \\ge 4 > 0\\)', 'because the discriminant is negative'],
                  hint: 'Review Class 10 quadratic equations, specifically the discriminant and the case \\(D < 0\\) (nodes.',
                  misconception: 'Students often apply the rule \\(\\sqrt{a}\\sqrt{b} = \\sqrt{ab}\\) to negative numbers, e.g., \\(\\sqrt{-4}\\sqrt{-9} = \\sqrt{36} = 6\\).' },
                { id: 'c', prompt: 'Compare the equations \\(x^2 - 9 = 0\\) and \\(x^2 + 9 = 0\\). How do their solution sets differ, and what does this reveal about the completeness.', answer: '\\(x^2 - 9 = 0\\) has real solutions \\(\\pm 3\\)',
                  options: ['\\(x^2 - 9 = 0\\) has real solutions \\(\\pm 3\\)', 'two solutions'],
                  hint: 'Review Class 10 quadratic equations, specifically the discriminant and the case \\(D < 0\\) (nodes.',
                  misconception: 'Students often apply the rule \\(\\sqrt{a}\\sqrt{b} = \\sqrt{ab}\\) to negative numbers, e.g., \\(\\sqrt{-4}\\sqrt{-9} = \\sqrt{36} = 6\\).' }
          ],
            remediations: { 'students-often-apply-the-rule': { steps: ['Show the counterexample: \\(\\sqrt{-1}\\sqrt{-1} = i\\cdot i = -1\\) but \\(\\sqrt{(-1)(-1)} = \\sqrt{1} = 1\\).', 'Explicitly state the theorem: \\(\\sqrt{a}\\sqrt{b} = \\sqrt{ab}\\) is valid only when \\(a,b \\ge 0\\).', 'Practice rewriting every \\(\\sqrt{-k}\\) as \\(i\\sqrt{k}\\) before any multiplication.', 'Emphasise that \\(i\\) is defined by \\(i^2 = -1\\), not by \\(\\sqrt{-1} = i\\) (which is ambiguous because \\(-i\\) also.'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_05_002', difficulty: 'standard',
          question: 'A complex number is a number of the form \\( z = a + ib \\), where \\( a \\) and \\.',
          hint: 'If stuck, review the discriminant and the quadratic formula (c10_math_cbse_04_005.',
          misconception: 'Students often write the imaginary part as \\( bi \\) instead of \\( b \\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A complex number is a number of the form \\( z = a + ib \\), where \\( a \\) and \\( b \\) are',
                  options: ['A complex number is a number of the form \\( z = a + ib \\), where \\( a \\) and \\( b \\) are', 'Complex numbers are an extension of the real number system, defined as numbers of the', 'Addition and subtraction of complex numbers are performed by separately adding or', 'The product of two complex numbers \\(z_1 = a + ib\\) and \\(z_2 = c + id\\) is defined as'],
                  hint: 'If stuck, review the discriminant and the quadratic formula (c10_math_cbse_04_005.',
                  misconception: 'Students often write the imaginary part as \\( bi \\) instead of \\( b \\).' }
          ],
            remediations: { 'students-often-write-the-imaginary': { steps: ['Revisit the definition: "A complex number is \\( a + ib \\) where \\( a,b \\) are real numbers." Write it on a card.', 'Practice identifying \\( a \\) and \\( b \\) for 10 examples, including pure real (\\( 7 \\)), pure imaginary (\\( -3i \\)).', 'For each, say aloud: "Real part is ____, Imaginary part is ____ (without i)."', 'Do a quick drill: simplify \\( \\sqrt{-k} \\) for \\( k = 1,4,9,16,25 \\) and write each as \\( 0 + bi \\).'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_05_003', difficulty: 'standard',
          question: 'Addition and subtraction of complex numbers are performed by separately adding.',
          hint: 'If stuck, revisit "Complex Numbers: Definition and Standard Form" (c11_math_cbse_05_002).',
          misconception: 'Students often write \\((a+ib) + (c+id) = (a+c) + (b+d)i\\) without parentheses around the imaginary coefficient, then.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Addition and subtraction of complex numbers are performed by separately adding or',
                  options: ['Addition and subtraction of complex numbers are performed by separately adding or', 'Complex numbers are an extension of the real number system, defined as numbers of the', 'A complex number is a number of the form \\( z = a + ib \\), where \\( a \\) and \\( b \\) are', 'The product of two complex numbers \\(z_1 = a + ib\\) and \\(z_2 = c + id\\) is defined as'],
                  hint: 'If stuck, revisit "Complex Numbers: Definition and Standard Form" (c11_math_cbse_05_002).',
                  misconception: 'Students often write \\((a+ib) + (c+id) = (a+c) + (b+d)i\\) without parentheses around the imaginary coefficient, then later misinterpret.' }
          ],
            remediations: { 'students-often-write-a-ib': { steps: ['If a student drops \\(i\\) or misplaces signs: 1) Have them rewrite each complex number as an ordered pair \\((a, b)\\) and.', '2) Perform addition as \\((a+c, b+d)\\).', '3) Convert back to \\(a+ib\\) format, emphasizing that the second component is the coefficient of \\(i\\).', '4) Practice with integer arithmetic drills: \\(-3 + (-5) = -8\\), so \\(-3i + (-5i) = -8i\\).'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_05_004', difficulty: 'standard',
          question: 'The product of two complex numbers \\(z_1 = a + ib\\) and \\(z_2 = c + id\\).',
          hint: 'Review binomial expansion from Class 8 (c8_math_ch6_7) and the definition of \\(i\\) from.',
          misconception: 'Students treat \\(i\\) as a variable and apply \\((a+ib)(c+id) = ac + i^2 bd = ac - bd\\), completely omitting the cross.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The product of two complex numbers \\(z_1 = a + ib\\) and \\(z_2 = c + id\\) is defined as',
                  options: ['The product of two complex numbers \\(z_1 = a + ib\\) and \\(z_2 = c + id\\) is defined as', 'Complex numbers are an extension of the real number system, defined as numbers of the', 'A complex number is a number of the form \\( z = a + ib \\), where \\( a \\) and \\( b \\) are', 'Addition and subtraction of complex numbers are performed by separately adding or'],
                  hint: 'Review binomial expansion from Class 8 (c8_math_ch6_7) and the definition of \\(i\\) from.',
                  misconception: 'Students treat \\(i\\) as a variable and apply \\((a+ib)(c+id) = ac + i^2 bd = ac - bd\\), completely omitting the cross terms \\(i(ad+bc)\\).' }
          ],
            remediations: { 'students-treat-i-as-a': { steps: ['If a student omits cross terms, have them first multiply two binomials with a placeholder \\(x\\) instead of \\(i\\).', 'Then substitute \\(x=i\\) and \\(x^2=-1\\).', 'If they use \\(i^2=1\\), ask them to compute \\(i^2\\) from the definition \\(i = \\sqrt{-1}\\) and verify \\((-1) \\times (-1).', 'Drill 5 problems where they must write the FOIL step explicitly: First, Outer, Inner, Last, then simplify.'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_05_005', difficulty: 'standard',
          question: 'Division of complex numbers is the operation of finding a complex number \\(z\\).',
          hint: 'Revisit c11_math_cbse_05_004 (Multiplication of Complex Numbers) and practice 10.',
          misconception: 'Students forget that \\(i^2 = -1\\) when expanding the numerator after multiplying by the conjugate, treating \\(i^2\\).',
          parts: [
                { id: 'a', prompt: 'What is the conjugate of the denominator used when dividing \\(\\frac{2+3i}{4-i}\\), and why do we multiply by it?', answer: 'The conjugate is \\(4+i\\)',
                  options: ['The conjugate is \\(4+i\\)', '\\(4-i\\)', '\\(-4+i\\)'],
                  hint: 'Revisit c11_math_cbse_05_004 (Multiplication of Complex Numbers) and practice 10 conjugate.',
                  misconception: 'Students forget that \\(i^2 = -1\\) when expanding the numerator after multiplying by the conjugate, treating \\(i^2\\) as \\(+1\\) or leaving.' }
          ],
            remediations: { 'students-forget-that-i-2': { steps: ['Have the student compute \\((c+id)(c-id)\\) slowly: \\(c^2 - c id + c id - i^2 d^2 = c^2 - i^2 d^2\\).', 'Ask "What is \\(i^2\\)?" until they say \\(-1\\).', 'Substitute: \\(c^2 - (-1)d^2 = c^2 + d^2\\).', 'For numerator, use FOIL with coloured pens: First, Outer, Inner, Last, circling every \\(i^2\\) term and replacing with.'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_05_006', difficulty: 'standard',
          question: 'The powers of the imaginary unit i (where i = √(-1)) follow a cyclic pattern.',
          hint: 'If stuck, review c11_math_cbse_05_004 (Multiplication of Complex Numbers) and.',
          misconception: 'Students often think iⁿ = i^(n mod 4) works for all real n, not just integers.',
          parts: [
                { id: 'a', prompt: 'What is the value of i⁻³? Show your reasoning.', answer: 'i⁻³ = i',
                  options: ['i⁻³ = i', 'iⁿ = i^(n mod 4) works for all real n, not just integers'],
                  hint: 'If stuck, review c11_math_cbse_05_004 (Multiplication of Complex Numbers) and c8_math_ch2_12 (Zero.',
                  misconception: 'Students often think iⁿ = i^(n mod 4) works for all real n, not just integers.' },
                { id: 'b', prompt: 'Explain why iⁿ = i^(n mod 4) for any integer n, using the definition i² = -1.', answer: 'Because i⁴ = (i²)² = (-1)² = 1, so i⁴ = 1',
                  options: ['Because i⁴ = (i²)² = (-1)² = 1, so i⁴ = 1', 'iⁿ = i^(n mod 4) works for all real n, not just integers'],
                  hint: 'If stuck, review c11_math_cbse_05_004 (Multiplication of Complex Numbers) and c8_math_ch2_12 (Zero.',
                  misconception: 'Students often think iⁿ = i^(n mod 4) works for all real n, not just integers.' },
                { id: 'c', prompt: 'Simplify: (i¹⁷ + i²⁶) / (i³¹ - i⁴⁰).', answer: 'i¹⁷ = i^(16+1) = i, i²⁶ = i^(24+2) = -1, i³¹ = i^(28+3) = -i, i⁴⁰ = i^(40) = 1',
                  options: ['i¹⁷ = i^(16+1) = i, i²⁶ = i^(24+2) = -1, i³¹ = i^(28+3) = -i, i⁴⁰ = i^(40) = 1', 'iⁿ = i^(n mod 4) works for all real n, not just integers'],
                  hint: 'If stuck, review c11_math_cbse_05_004 (Multiplication of Complex Numbers) and c8_math_ch2_12 (Zero.',
                  misconception: 'Students often think iⁿ = i^(n mod 4) works for all real n, not just integers.' },
                { id: 'd', prompt: 'Compare the values of i^(4k+1), i^(4k+2), i^(4k+3), i^(4k) for integer k. What geometric transformation does multiplication by i represent on the Argand plane?', answer: 'i^(4k) = 1, i^(4k+1) = i, i^(4k+2) = -1, i^(4k+3) = -i',
                  options: ['i^(4k) = 1, i^(4k+1) = i, i^(4k+2) = -1, i^(4k+3) = -i', 'iⁿ = i^(n mod 4) works for all real n, not just integers'],
                  hint: 'If stuck, review c11_math_cbse_05_004 (Multiplication of Complex Numbers) and c8_math_ch2_12 (Zero.',
                  misconception: 'Students often think iⁿ = i^(n mod 4) works for all real n, not just integers.' }
          ],
            remediations: { 'i-i-n-mod-4': { steps: ['If a student incorrectly reduces exponents, have them write out the first 8 powers of i explicitly: i¹=i, i²=-1, i³=-i.', 'Then ask them to find i⁹, i¹⁰, i¹¹, i¹².', 'Next, show negative powers: i⁰=1, i⁻¹ = 1/i = -i, i⁻² = 1/i² = -1, i⁻³ = 1/i³ = i, i⁻⁴ = 1/i⁴ = 1.', 'Emphasize that the cycle of 4 holds for all integers because i⁴=1.'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_05_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think iⁿ = i^(n mod 4) works for all real n, not just integers.',
          parts: [
                { id: 'a', prompt: 'A student claims that i^(-5) = -i because "negative exponent flips the sign". Evaluate this claim and correct it.', answer: 'The claim is false',
                  options: ['The claim is false', 'iⁿ = i^(n mod 4) works for all real n, not just integers'],
                  hint: 'If stuck, review c11_math_cbse_05_004 (Multiplication of Complex Numbers) and c8_math_ch2_12 (Zero.',
                  misconception: 'Students often think iⁿ = i^(n mod 4) works for all real n, not just integers.' },
                { id: 'b', prompt: 'Create a real-world problem (e.g., from electrical engineering or signal processing) where simplifying a high power of i is necessary.', answer: 'Example: In an AC circuit, the impedance of a capacitor is Z = 1/(iωC)',
                  options: ['Example: In an AC circuit, the impedance of a capacitor is Z = 1/(iωC)', 'iⁿ = i^(n mod 4) works for all real n, not just integers'],
                  hint: 'If stuck, review c11_math_cbse_05_004 (Multiplication of Complex Numbers) and c8_math_ch2_12 (Zero.',
                  misconception: 'Students often think iⁿ = i^(n mod 4) works for all real n, not just integers.' }
          ],
            remediations: { 'i-i-n-mod-4': { steps: ['If a student incorrectly reduces exponents, have them write out the first 8 powers of i explicitly: i¹=i, i²=-1, i³=-i.', 'Then ask them to find i⁹, i¹⁰, i¹¹, i¹².', 'Next, show negative powers: i⁰=1, i⁻¹ = 1/i = -i, i⁻² = 1/i² = -1, i⁻³ = 1/i³ = i, i⁻⁴ = 1/i⁴ = 1.', 'Emphasize that the cycle of 4 holds for all integers because i⁴=1.'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
