import type { SimDef } from '../../engine/types';
import C11_AppliedMathsComplexNumbersIntroductionSim from '../../../simulations/c6_12/C11_AppliedMathsComplexNumbersIntroductionSim';

/** v3 wrapped master — C11_AppliedMathsComplexNumbersIntroductionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_appliedmathscomplexnumbersintroductionsim: SimDef = {
    id: 'v3w_c11_appliedmathscomplexnumbersintroductionsim',
    title: 'Applied Maths Complex Numbers Introduction',
    subtitle: 'This node covers only the motivation for extending \\(\\mathbb{R}\\) to \\(\\mathbb{C}\\) by.',
    classLevel: 11, subject: 'science', topic: 'Need for Complex Numbers: Beyond Real Numbers',
    chapters: [],
    nodeIds: ['c11_math_cbse_05_001', 'c11_math_cbse_05_002', 'c11_math_cbse_05_003', 'c11_math_cbse_05_004', 'c11_math_cbse_05_005', 'c11_math_cbse_05_007', 'c11_math_cbse_05_008', 'c11_math_cbse_05_009', 'c11_math_cbse_05_010', 'c11_math_cbse_05_012', 'c11_math_cbse_09_008', 'c11_math_cbse_04_005', 'c11_math_cbse_03_007', 'c11_math_cbse_03_011', 'c11_math_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are solving a physics problem about a spring-mass system and arrive at the equation \\(x^2 + 9 =.', goal: 'Master Applied Maths Complex Numbers Introduction.' },
    discovery: {
        question: 'What is the conjugate of the denominator used when dividing \\(\\frac{2+3i}{4-i}\\), and why do we multiply by it?',
        options: ['The conjugate is \\(4+i\\)', '\\(4-i\\)', '\\(-4+i\\)'],
        answer: 'The conjugate is \\(4+i\\)',
        hook: 'Students forget that \\(i^2 = -1\\) when expanding the numerator after multiplying by the conjugate, treating \\(i^2\\) as.',
    },
    teaching: [
        { title: 'Complex numbers are an extension of the real.', text: 'Complex numbers are an extension of the real number system, defined as numbers of the form \\(a + ib\\) where \\(a, b \\in \\mathbb{R}\\) and \\(i\\) is the imaginary unit satisfying \\(i^2 = -1\\).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_math_cbse_05_001', title: 'Complex numbers are an extension of the.',
          scaffold: { problem: 'A physics student derives the equation \\(x^2 + 16 = 0\\) while finding the displacement in a simple harmonic motion problem.',
            steps: [
            { text: 'Write the equation: \\(x^2 + 16 = 0\\).' },
            { text: 'Isolate \\(x^2\\): \\(x^2 = -16\\).' },
            { text: 'Recall that for any real number \\(x\\), \\(x^2 \\ge 0\\). Hence no real \\(x\\) satisfies \\(x^2 = -16\\).' },
            { text: 'Introduce the imaginary unit \\(i\\) with \\(i^2 = -1\\). Then \\(\\sqrt{-16} = \\sqrt{16 \\cdot (-1)} = 4i\\).' },
            { text: 'The solutions are \\(x = 4i\\) and \\(x = -4i\\). These are purely imaginary numbers, not real numbers.', faded: true, blankAnswer: '\\(x = 4i\\) and \\(x = -4i\\) (purely imaginary numbers)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_05_002', title: 'A complex number is a number of the.',
          scaffold: { problem: 'Express \\( \\frac{3 - \\sqrt{-49}}{7} \\) in the standard form \\( a + ib \\) and identify its real and imaginary parts.',
            steps: [
            { text: 'Simplify the square root of the negative number: \\( \\sqrt{-49} = \\sqrt{49} \\cdot \\sqrt{-1} = 7i \\).' },
            { text: 'Substitute back into the expression: \\( \\frac{3 - 7i}{7} \\).' },
            { text: 'Separate the fraction into real and imaginary parts: \\( \\frac{3}{7} - \\frac{7i}{7} \\).' },
            { text: 'Simplify each part: \\( \\frac{3}{7} - i \\).' },
            { text: 'Write in standard form \\( a + ib \\): \\( a = \\frac{3}{7} \\), \\( b = -1 \\).', faded: true, blankAnswer: 'Standard form: \\( \\frac{3}{7} - i \\); Real part = \\(.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_05_003', title: 'Addition and subtraction of complex.',
          scaffold: { problem: 'A circuit in a physics lab has two impedance components: \\(Z_1 = 4 + 3j\\) ohms and \\(Z_2 = 2 - 5j\\) ohms (engineering uses \\(j\\) for.',
            steps: [
            { text: 'Identify that series connection means impedances add: \\(Z_{\\text{total}} = Z_1 + Z_2\\).' },
            { text: 'Write both in standard form: \\(Z_1 = 4 + 3j\\), \\(Z_2 = 2 - 5j\\).' },
            { text: 'Add real parts: \\(4 + 2 = 6\\). Add imaginary parts: \\(3j + (-5j) = -2j\\).' },
            { text: 'Combine: \\(Z_{\\text{total}} = 6 - 2j\\) ohms.' },
            { text: 'Interpret: The resistive part is 6 ohms, reactive part is -2j ohms (capacitive).', faded: true, blankAnswer: '\\(6 - 2j\\) ohms' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_05_004', title: 'The product of two complex numbers.',
          scaffold: { problem: 'In an AC circuit, the impedance of a resistor-inductor branch is \\(Z_1 = 3 + 4j\\) ohms and a capacitor branch is \\(Z_2 = 2 - 3j\\) ohms.',
            steps: [
            { text: 'Identify the two complex numbers: \\(Z_1 = 3 + 4j\\), \\(Z_2 = 2 - 3j\\).' },
            { text: 'Write the multiplication using FOIL: \\((3 + 4j)(2 - 3j) = 3(2) + 3(-3j) + 4j(2) + 4j(-3j)\\).' },
            { text: 'Compute each term: \\(6 - 9j + 8j - 12j^2\\).' },
            { text: 'Replace \\(j^2\\) with \\(-1\\): \\(6 - 9j + 8j - 12(-1) = 6 - j + 12\\).' },
            { text: 'Combine real and imaginary parts: \\(18 - j\\). The product is \\(18 - j\\) ohms² (units are ohms squared for this product).', faded: true, blankAnswer: '\\(18 - j\\) (or \\(18 - i\\) in mathematical notation)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_05_005', title: 'Division of complex numbers is the.',
          scaffold: { problem: 'In an AC circuit analysis, the voltage across a component is measured as \\(V = (15 + 20i)\\) volts and the impedance is \\(Z = (3 + 4i)\\).',
            steps: [
            { text: 'Identify \\(z_1 = 15+20i\\) (voltage), \\(z_2 = 3+4i\\) (impedance). Note \\(z_2 \\neq 0\\) since \\(3^2+4^2 = 25 \\neq 0\\).' },
            { text: 'Write division as fraction and multiply numerator and denominator by conjugate of denominator \\(\\overline{z_2} =.' },
            { text: 'Compute denominator: \\((3+4i)(3-4i) = 3^2 - (4i)^2 = 9 - 16i^2 = 9 - 16(-1) = 9+16 = 25\\).' },
            { text: 'Compute numerator using FOIL: \\((15+20i)(3-4i) = 15(3) + 15(-4i) + 20i(3) + 20i(-4i) = 45 -60i +60i -80i^2 = 45 -80(-1).' },
            { text: 'Combine: \\(I = \\frac{125}{25} + i\\frac{0}{25} = 5 + 0i = 5\\) amperes. Verify: \\(5 \\times (3+4i) = 15+20i = V\\). ✓', faded: true, blankAnswer: '\\(I = 5\\) A (or \\(5 + 0i\\) A)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_05_007', title: 'The modulus of a complex number \\( z =.',
          scaffold: { problem: 'A signal in a communication system is represented by the complex number \\( z = \\frac{2 + 3i}{1 - i} \\).',
            steps: [
            { text: 'Simplify \\( z \\) to standard form by multiplying numerator and denominator by the conjugate of the denominator: \\( z =.' },
            { text: 'Compute numerator: \\( (2+3i)(1+i) = 2 + 2i + 3i + 3i^2 = 2 + 5i - 3 = -1 + 5i \\).' },
            { text: 'Write \\( z \\) in standard form: \\( z = \\frac{-1 + 5i}{2} = -\\frac{1}{2} + \\frac{5}{2}i \\).' },
            { text: 'Compute modulus: \\( |z| = \\sqrt{a^2 + b^2} = \\sqrt{\\left(-\\frac{1}{2}\\right)^2 + \\left(\\frac{5}{2}\\right)^2} =.' },
            { text: 'Compute conjugate: \\( \\bar{z} = -\\frac{1}{2} - \\frac{5}{2}i \\).', faded: true, blankAnswer: '\\( z = -\\frac{1}{2} + \\frac{5}{2}i \\), \\( |z| =.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_math_cbse_05_002', title: 'Identify each idea',
          dissect: { specimen: 'Applied Maths Complex Numbers Introduction', spots: [
            { id: 's1', label: 'Complex numbers are an extension', prompt: 'Which idea is this? — Complex numbers are an extension of the real number system, defined as numbers of the.', answer: 'Complex numbers are an extension', options: ['Complex numbers are an extension', 'A complex number is a', 'Addition and subtraction of complex', 'The product of two complex'] },
            { id: 's2', label: 'A complex number is a', prompt: 'Which idea is this? — A complex number is a number of the form \\( z = a + ib \\), where \\( a \\) and \\( b \\) are.', answer: 'A complex number is a', options: ['A complex number is a', 'Complex numbers are an extension', 'Addition and subtraction of complex', 'The product of two complex'] },
            { id: 's3', label: 'Addition and subtraction of complex', prompt: 'Which idea is this? — Addition and subtraction of complex numbers are performed by separately adding or.', answer: 'Addition and subtraction of complex', options: ['Addition and subtraction of complex', 'Complex numbers are an extension', 'A complex number is a', 'The product of two complex'] },
            { id: 's4', label: 'The product of two complex', prompt: 'Which idea is this? — The product of two complex numbers \\(z_1 = a + ib\\) and \\(z_2 = c + id\\) is defined as.', answer: 'The product of two complex', options: ['The product of two complex', 'Complex numbers are an extension', 'A complex number is a', 'Addition and subtraction of complex'] },
            { id: 's5', label: 'Division of complex numbers is', prompt: 'Which idea is this? — Division of complex numbers is the operation of finding a complex number \\(z\\) such that.', answer: 'Division of complex numbers is', options: ['Division of complex numbers is', 'Complex numbers are an extension', 'A complex number is a', 'Addition and subtraction of complex'] },
            { id: 's6', label: 'The modulus of a complex', prompt: 'Which idea is this? — The modulus of a complex number \\( z = a + ib \\) (where \\( a, b \\in \\mathbb{R} \\)) is the.', answer: 'The modulus of a complex', options: ['The modulus of a complex', 'Complex numbers are an extension', 'A complex number is a', 'Addition and subtraction of complex'] }
          ] } }
    ],
    explore: { component: C11_AppliedMathsComplexNumbersIntroductionSim, prompt: 'Explore the interactive — Applied Maths Complex Numbers Introduction' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_05_001', difficulty: 'standard',
          question: 'Complex numbers are an extension of the real number system, defined as numbers.',
          hint: 'Review Class 10 quadratic equations, specifically the discriminant and the case \\(D < 0\\).',
          misconception: 'Students often apply the rule \\(\\sqrt{a}\\sqrt{b} = \\sqrt{ab}\\) to negative numbers, e.g., \\(\\sqrt{-4}\\sqrt{-9} =.',
          parts: [
                { id: 'a', prompt: 'What is the defining property of the imaginary unit \\(i\\)? State it as an equation.', answer: '\\(i^2 = -1\\)',
                  options: ['\\(i^2 = -1\\)', 'a principal branch'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often apply the rule \\(\\sqrt{a}\\sqrt{b} = \\sqrt{ab}\\) to negative numbers, e.g., \\(\\sqrt{-4}\\sqrt{-9} = \\sqrt{36} = 6\\).' },
                { id: 'b', prompt: 'Why does the equation \\(x^2 + 4 = 0\\) have no real solution? Explain using the properties of real numbers.', answer: 'For any real number \\(x\\), \\(x^2 \\ge 0\\), so \\(x^2 + 4 \\ge 4 > 0\\)',
                  options: ['For any real number \\(x\\), \\(x^2 \\ge 0\\), so \\(x^2 + 4 \\ge 4 > 0\\)', 'because the discriminant is negative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often apply the rule \\(\\sqrt{a}\\sqrt{b} = \\sqrt{ab}\\) to negative numbers, e.g., \\(\\sqrt{-4}\\sqrt{-9} = \\sqrt{36} = 6\\).' },
                { id: 'c', prompt: 'Compare the equations \\(x^2 - 9 = 0\\) and \\(x^2 + 9 = 0\\). How do their solution sets differ, and what does this reveal about the completeness of.', answer: '\\(x^2 - 9 = 0\\) has real solutions \\(\\pm 3\\)',
                  options: ['\\(x^2 - 9 = 0\\) has real solutions \\(\\pm 3\\)', 'two solutions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often apply the rule \\(\\sqrt{a}\\sqrt{b} = \\sqrt{ab}\\) to negative numbers, e.g., \\(\\sqrt{-4}\\sqrt{-9} = \\sqrt{36} = 6\\).' }
          ],
            remediations: { 'students-often-apply-the-rule': { steps: ['Show the counterexample: \\(\\sqrt{-1}\\sqrt{-1} = i\\cdot i = -1\\) but \\(\\sqrt{(-1)(-1)} = \\sqrt{1} = 1\\).', 'Explicitly state the theorem: \\(\\sqrt{a}\\sqrt{b} = \\sqrt{ab}\\) is valid only when \\(a,b \\ge 0\\).', 'Practice rewriting every \\(\\sqrt{-k}\\) as \\(i\\sqrt{k}\\) before any multiplication.', 'Emphasise that \\(i\\) is defined by \\(i^2 = -1\\), not by \\(\\sqrt{-1} = i\\) (which is ambiguous because \\(-i\\) also.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_05_002', difficulty: 'standard',
          question: 'A complex number is a number of the form \\( z = a + ib \\), where \\( a \\) and \\(.',
          hint: 'If stuck, review the discriminant and the quadratic formula (c10_math_cbse_04_005,.',
          misconception: 'Students often write the imaginary part as \\( bi \\) instead of \\( b \\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A complex number is a number of the form \\( z = a + ib \\), where \\( a \\) and \\( b \\) are',
                  options: ['A complex number is a number of the form \\( z = a + ib \\), where \\( a \\) and \\( b \\) are', 'Complex numbers are an extension of the real number system, defined as numbers of the', 'Addition and subtraction of complex numbers are performed by separately adding or', 'The product of two complex numbers \\(z_1 = a + ib\\) and \\(z_2 = c + id\\) is defined as'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the imaginary part as \\( bi \\) instead of \\( b \\).' }
          ],
            remediations: { 'students-often-write-the-imaginary': { steps: ['Revisit the definition: "A complex number is \\( a + ib \\) where \\( a,b \\) are real numbers." Write it on a card.', 'Practice identifying \\( a \\) and \\( b \\) for 10 examples, including pure real (\\( 7 \\)), pure imaginary (\\( -3i \\)),.', 'For each, say aloud: "Real part is ____, Imaginary part is ____ (without i)."', 'Do a quick drill: simplify \\( \\sqrt{-k} \\) for \\( k = 1,4,9,16,25 \\) and write each as \\( 0 + bi \\).', 'Explain to a peer why \\( \\text{Im}(2-5i) = -5 \\) and not \\( -5i \\). This verbalisation cures the misconception.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_05_003', difficulty: 'standard',
          question: 'Addition and subtraction of complex numbers are performed by separately adding.',
          hint: 'If stuck, revisit "Complex Numbers: Definition and Standard Form" (c11_math_cbse_05_002).',
          misconception: 'Students often write \\((a+ib) + (c+id) = (a+c) + (b+d)i\\) without parentheses around the imaginary coefficient, then.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Addition and subtraction of complex numbers are performed by separately adding or',
                  options: ['Addition and subtraction of complex numbers are performed by separately adding or', 'Complex numbers are an extension of the real number system, defined as numbers of the', 'A complex number is a number of the form \\( z = a + ib \\), where \\( a \\) and \\( b \\) are', 'The product of two complex numbers \\(z_1 = a + ib\\) and \\(z_2 = c + id\\) is defined as'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write \\((a+ib) + (c+id) = (a+c) + (b+d)i\\) without parentheses around the imaginary coefficient, then later misinterpret.' }
          ],
            remediations: { 'students-often-write-a-ib': { steps: ['If a student drops \\(i\\) or misplaces signs: 1) Have them rewrite each complex number as an ordered pair \\((a, b)\\) and.', '2) Perform addition as \\((a+c, b+d)\\).', '3) Convert back to \\(a+ib\\) format, emphasizing that the second component is the coefficient of \\(i\\).', '4) Practice with integer arithmetic drills: \\(-3 + (-5) = -8\\), so \\(-3i + (-5i) = -8i\\).'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_05_004', difficulty: 'standard',
          question: 'The product of two complex numbers \\(z_1 = a + ib\\) and \\(z_2 = c + id\\) is.',
          hint: 'Review binomial expansion from Class 8 (c8_math_ch6_7) and the definition of \\(i\\) from.',
          misconception: 'Students treat \\(i\\) as a variable and apply \\((a+ib)(c+id) = ac + i^2 bd = ac - bd\\), completely omitting the cross.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The product of two complex numbers \\(z_1 = a + ib\\) and \\(z_2 = c + id\\) is defined as',
                  options: ['The product of two complex numbers \\(z_1 = a + ib\\) and \\(z_2 = c + id\\) is defined as', 'Complex numbers are an extension of the real number system, defined as numbers of the', 'A complex number is a number of the form \\( z = a + ib \\), where \\( a \\) and \\( b \\) are', 'Addition and subtraction of complex numbers are performed by separately adding or'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat \\(i\\) as a variable and apply \\((a+ib)(c+id) = ac + i^2 bd = ac - bd\\), completely omitting the cross terms \\(i(ad+bc)\\).' }
          ],
            remediations: { 'students-treat-i-as-a': { steps: ['If a student omits cross terms, have them first multiply two binomials with a placeholder \\(x\\) instead of \\(i\\):.', 'Then substitute \\(x=i\\) and \\(x^2=-1\\).', 'If they use \\(i^2=1\\), ask them to compute \\(i^2\\) from the definition \\(i = \\sqrt{-1}\\) and verify \\((-1) \\times (-1).', 'Drill 5 problems where they must write the FOIL step explicitly: First, Outer, Inner, Last, then simplify.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_05_005', difficulty: 'standard',
          question: 'Division of complex numbers is the operation of finding a complex number \\(z\\).',
          hint: 'Revisit c11_math_cbse_05_004 (Multiplication of Complex Numbers) and practice 10.',
          misconception: 'Students forget that \\(i^2 = -1\\) when expanding the numerator after multiplying by the conjugate, treating \\(i^2\\) as.',
          parts: [
                { id: 'a', prompt: 'What is the conjugate of the denominator used when dividing \\(\\frac{2+3i}{4-i}\\), and why do we multiply by it?', answer: 'The conjugate is \\(4+i\\)',
                  options: ['The conjugate is \\(4+i\\)', '\\(4-i\\)', '\\(-4+i\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students forget that \\(i^2 = -1\\) when expanding the numerator after multiplying by the conjugate, treating \\(i^2\\) as \\(+1\\) or leaving it.' }
          ],
            remediations: { 'students-forget-that-i-2': { steps: ['Have the student compute \\((c+id)(c-id)\\) slowly: \\(c^2 - c id + c id - i^2 d^2 = c^2 - i^2 d^2\\).', 'Ask "What is \\(i^2\\)?" until they say \\(-1\\).', 'Substitute: \\(c^2 - (-1)d^2 = c^2 + d^2\\).', 'For numerator, use FOIL with coloured pens: First, Outer, Inner, Last, circling every \\(i^2\\) term and replacing with.', 'Practice 5 problems where denominator is purely real after conjugate multiplication, checking each \\(i^2\\) replacement.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_05_007', difficulty: 'standard',
          question: 'The modulus of a complex number \\( z = a + ib \\) (where \\( a, b \\in \\mathbb{R}.',
          hint: 'If stuck, revisit c11_math_cbse_05_002 (standard form identification) and c9_math_ch1_4.',
          misconception: 'Students often write \\( |a + ib| = \\sqrt{a^2 + (ib)^2} = \\sqrt{a^2 - b^2} \\), treating \\( i \\) as part of the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The modulus of a complex number \\( z = a + ib \\) (where \\( a, b \\in \\mathbb{R} \\)) is the',
                  options: ['The modulus of a complex number \\( z = a + ib \\) (where \\( a, b \\in \\mathbb{R} \\)) is the', 'Complex numbers are an extension of the real number system, defined as numbers of the', 'A complex number is a number of the form \\( z = a + ib \\), where \\( a \\) and \\( b \\) are', 'Addition and subtraction of complex numbers are performed by separately adding or'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write \\( |a + ib| = \\sqrt{a^2 + (ib)^2} = \\sqrt{a^2 - b^2} \\), treating \\( i \\) as part of the coefficient inside the square.' }
          ],
            remediations: { 'students-often-write-a-ib': { steps: ['Ask the student to plot \\( 3 + 4i \\) on the Argand plane and physically measure the distance from origin using a ruler.', 'Then write the distance formula \\( \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2} \\) with \\( (x_1,y_1) = (0,0) \\) and \\( (x_2,y_2) =.', 'Explicitly connect: the x-coordinate is the real part \\( a \\), the y-coordinate is the imaginary coefficient \\( b \\).', 'Have them recompute \\( |3+4i| \\) using this geometric understanding, then practice with \\( -5 + 12i \\) and \\( -3 - 4i.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
