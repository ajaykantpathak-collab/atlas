import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch04_p2: SimDef = {
    id: 'v3_c10_math_ch04_p2',
    title: 'Quadratic Equations · Part 2/2',
    subtitle: 'Predict how many answers an equation has before solving it',
    classLevel: 10, subject: 'mathematics', topic: 'Quadratic Equations · Part 2/2',
    chapters: ['c10_math_ch04'],
    nodeIds: ['c10_math_cbse_04_007', 'c10_math_cbse_04_008', 'c10_math_cbse_04_009', 'c10_math_cbse_04_010', 'c10_math_cbse_04_011', 'c10_math_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a problem-solver decoding curved paths', intro: 'Rockets, rain gutters and rectangular fields all ask the same question: given ax² + bx + c = 0, when does it hit zero? Your tools: factoring, completing the square, and one famous formula.', goal: 'Solve quadratic equations by three methods and use the discriminant to predict the nature of roots.' },
    discovery: {
        question: 'A javelin\'s height follows h = −5t² + 20t. Ask \'when does it land?\' and you\'re solving a quadratic — one answer at takeoff (t = 0), one at landing (t = 4). Why does this single question get TWO answers?',
        options: ['Because a quadratic\'s graph is a parabola — a horizontal line can meet it twice, once, or not at all, matching the discriminant\'s verdict', 'Because time flows forwards and backwards simultaneously', 'Because the javelin secretly lands twice in reality', 'Because all equations in physics give double answers'],
        answer: 'Because a quadratic\'s graph is a parabola — a horizontal line can meet it twice, once, or not at all, matching the discriminant\'s verdict',
        hook: 'The discriminant b² − 4ac is a fortune-teller: positive means two landings, zero means a perfect graze, negative means the event never happens. Two answers isn\'t a bug — it\'s parabola geometry.',
    },
    teaching: [
        { title: 'Nature of Roots: The Discriminant (D = b-squared - 4ac)', text: 'The discriminant of a quadratic equation \\(ax^2 + bx + c = 0\\) (where \\(a, b, c \\in \\mathbb{R}\\) and \\(a \\neq 0\\)) is defined as \\(D = b^2 - 4ac\\).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_04_007', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Solve quadratics three different ways — factorisation, completing the square, and the formula — then let the discriminant predict whether your answers even exist before you compute them.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_04_007', title: 'Nature of Roots: The Discriminant (D = b-squared - 4ac)',
          scaffold: { problem: 'A rectangular plot in a housing society has area 300 m². The length is 5 m more than twice the breadth.',
            steps: [
            { text: 'Let breadth = \\(x\\) metres. Then length = \\(2x + 5\\) metres. Area = length × breadth = \\(x(2x + 5) = 300\\).' },
            { text: 'Write in standard form: \\(2x^2 + 5x - 300 = 0\\). Identify coefficients: \\(a = 2\\), \\(b = 5\\), \\(c = -300\\).' },
            { text: 'Compute discriminant \\(D = b^2 - 4ac = (5)^2 - 4(2)(-300) = 25 + 2400 = 2425\\).' },
            { text: 'Analyse \\(D\\): \\(2425 > 0\\) and \\(2425\\) is not a perfect square (since \\(49^2 = 2401\\), \\(50^2 = 2500\\)).' },
            { text: 'Conclusion: The equation has two distinct irrational roots. Since breadth must be positive, only one root will.', faded: true, blankAnswer: 'Quadratic equation: \\(2x^2 + 5x - 300 = 0\\); Discriminant.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_04_008', title: 'Discriminant: Two Distinct Real Roots (D > 0)',
          scaffold: { problem: 'A rectangular plot in a housing society has an area of 300 m². Its length is 10 metres more than its breadth.',
            steps: [
            { text: 'Let breadth = \\( x \\) metres. Then length = \\( x + 10 \\) metres. Area = length × breadth = \\( x(x + 10) = 300 \\).' },
            { text: 'Form the quadratic equation: \\( x^2 + 10x - 300 = 0 \\). Identify \\( a = 1, b = 10, c = -300 \\).' },
            { text: 'Compute discriminant: \\( D = b^2 - 4ac = (10)^2 - 4(1)(-300) = 100 + 1200 = 1300 \\).' },
            { text: 'Apply quadratic formula: \\( x = \\frac{-b \\pm \\sqrt{D}}{2a} = \\frac{-10 \\pm \\sqrt{1300}}{2} \\).' },
            { text: '\\( x = \\frac{-10 \\pm 10\\sqrt{13}}{2} = -5 \\pm 5\\sqrt{13} \\). Since breadth > 0, take \\( x = -5 + 5\\sqrt{13} \\) (approx.' },
            { text: 'Verify: Area = \\( (-5 + 5\\sqrt{13})(5 + 5\\sqrt{13}) = (5\\sqrt{13})^2 - 5^2 = 325 - 25 = 300 \\) m². Correct.', faded: true, blankAnswer: 'Breadth = \\( 5(\\sqrt{13} - 1) \\) m ≈ 13.03 m, Length = \\.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_04_009', title: 'Discriminant: Two Equal Real Roots (D = 0)',
          scaffold: { problem: 'A rectangular park is to be designed such that its length is 6 metres more than its breadth.',
            steps: [
            { text: 'Let breadth = \\(x\\) metres. Then length = \\(x + 6\\) metres. Area = length × breadth = \\(x(x + 6)\\) square metres.' },
            { text: 'Set up the equation: \\(x(x + 6) = 9 \\Rightarrow x^2 + 6x = 9 \\Rightarrow x^2 + 6x - 9 = 0\\).' },
            { text: 'Compute discriminant: \\(D = b^2 - 4ac = 6^2 - 4(1)(-9) = 36 + 36 = 72\\).' },
            { text: 'Find roots using quadratic formula: \\(x = \\frac{-6 \\pm \\sqrt{72}}{2} = \\frac{-6 \\pm 6\\sqrt{2}}{2} = -3 \\pm 3\\sqrt{2}\\).' },
            { text: 'Breadth must be positive. \\(-3 - 3\\sqrt{2} \\approx -7.24\\) (reject). \\(-3 + 3\\sqrt{2} \\approx 1.24\\) (accept).' },
            { text: 'The problem asks if there is more than one design. Since only one positive root exists, there is exactly one valid.', faded: true, blankAnswer: 'Breadth = \\(3(\\sqrt{2} - 1)\\) m ≈ 1.24 m, Length.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_04_010', title: 'Discriminant: No Real Roots (D < 0)',
          scaffold: { problem: 'A rectangular plot in a housing society has a perimeter of 60 metres. The residents want the area to be at least 250 m². Is it possible?',
            steps: [
            { text: 'Let the length be \\(x\\) metres. Then breadth = \\(\\frac{60}{2} - x = 30 - x\\) metres.' },
            { text: 'Area = \\(x(30 - x) = 30x - x^2\\). We want area \\(\\ge 250\\) → \\(-x^2 + 30x - 250 \\ge 0\\) → \\(x^2 - 30x + 250 \\le 0\\).' },
            { text: 'Consider the related equation \\(x^2 - 30x + 250 = 0\\). Identify coefficients: \\(a = 1\\), \\(b = -30\\), \\(c = 250\\).' },
            { text: 'Compute discriminant: \\(D = (-30)^2 - 4(1)(250) = 900 - 1000 = -100\\).' },
            { text: 'Since \\(D < 0\\), the quadratic \\(x^2 - 30x + 250\\) has no real roots.' },
            { text: 'Conclusion: It is **not possible** to have a rectangle with perimeter 60 m and area ≥ 250 m².', faded: true, blankAnswer: 'No, it is not possible. The discriminant is \\(-100 < 0\\).' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_04_011', title: 'Word Problems: Applications of Quadratic Equations',
          scaffold: { problem: 'A rectangular park in a housing society has an area of 500 m². Its length is 5 m more than twice its breadth.',
            steps: [
            { text: 'Identify the unknown. Let the breadth of the park be \\(x\\) metres. Then length = \\(2x + 5\\) metres.' },
            { text: 'Use the area formula for a rectangle: Area = length × breadth. Substitute: \\(x(2x + 5) = 500\\).' },
            { text: 'Simplify to standard quadratic form: \\(2x^2 + 5x - 500 = 0\\).' },
            { text: 'Solve by factorisation. Split middle term: \\(2x^2 + 35x - 20x - 500 = 0\\) → \\(x(2x + 35) - 10(2x + 35) = 0\\) → \\((x.' },
            { text: 'Interpret roots. Breadth cannot be negative, so reject \\(x = -17.5\\). Breadth = 10 m. Length = \\(2(10) + 5 = 25\\) m.' },
            { text: 'Let breadth = \\(x\\) m. Then length = \\(x + 5\\) m.' },
            { text: 'Area = length × breadth = \\(x(x+5) = 300\\).' },
            { text: 'Standard form: \\(x^2 + 5x - 300 = 0\\).' },
            { text: 'Factorise: \\(x^2 + 20x - 15x - 300 = 0\\) → \\(x(x+20) - 15(x+20) = 0\\) → \\((x-15)(x+20)=0\\).' },
            { text: 'Reject negative root. Breadth = 15 m, Length = 20 m.', faded: true, blankAnswer: 'Breadth = 15 m, Length = 20 m.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_04_012', title: 'Word Problems: Speed, Time and Distance Using Quadratics',
          scaffold: { problem: 'A passenger train takes 2 hours less for a journey of 300 km if its speed is increased by 5 km/h from its usual speed.',
            steps: [
            { text: 'Identify the unknown. Let the usual speed of the train be x km/h.' },
            { text: 'Write expressions for time taken. Usual time = Distance / Usual speed = 300/x hours. Increased speed = (x + 5) km/h.' },
            { text: 'Translate the condition into an equation. "Takes 2 hours less" means usual time minus new time = 2 hours.' },
            { text: 'Solve the equation. Multiply both sides by x(x+5) to clear denominators: 300(x+5) - 300x = 2x(x+5).' },
            { text: 'Interpret the roots. Speed cannot be negative, so reject x = -30. Usual speed = 25 km/h.', faded: true, blankAnswer: 'Usual speed of the train = 25 km/h.' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_04_012', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A family buys a rectangular plot: the length is 3 metres more than the breadth and the area is 180 m². Father guesses \'just divide 180 by 3 to get the length\' and starts measuring 60 metres along the ground.',
            decisions: [{ prompt: 'How should the dimensions actually be found?', options: [
                { text: 'Let the breadth be x, so length is x + 3 and x(x + 3) = 180 gives the quadratic x² + 3x - 180 = 0, which factorises as (x + 15)(x - 12) = 0 — so breadth is 12 m and length 15 m. The \'3 more\' relationship multiplies through the whole equation; it cannot be handled by dividing the area by 3.', outcome: 'Translating \'length is 3 more than breadth\' into x and x + 3, then solving the quadratic, is the correct route — and 12 × 15 = 180 checks.' },
                { text: 'Father\'s shortcut works — 180 divided by 3 gives the 60 m length because the difference between the sides is 3.', outcome: 'The 3 is a difference between the sides, not a divisor of the area; 60 × 57 would give 3420 m², not 180.', reveals: 'divide-area-by-difference' },
                { text: 'The problem is unsolvable as stated — you would need the perimeter as well to find two unknowns.', outcome: 'The area relation x(x+3) = 180 already pins down x — one quadratic equation in one unknown is enough.', reveals: 'quadratic-needs-second-equation' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_04_012', title: 'You made it',
          caseStudy: { intro: 'Projectile paths, profit curves, area puzzles — all parabolas in disguise. Master the discriminant and you can predict the number of answers before doing any solving.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_04_007', difficulty: 'standard',
          question: 'The discriminant of a quadratic equation \\(ax^2 + bx + c = 0\\) (where \\(a, b,.',
          hint: 'If stuck, revisit c10_math_cbse_04_001 (standard form identification) and c9_math_ch3_5.',
          misconception: 'Students often think that if \\(D > 0\\) and \\(D\\) is a perfect square, the roots are "equal" or "rational and equal".',
          parts: [
                { id: 'a', prompt: 'State the formula for the discriminant of the quadratic equation \\(ax^2 + bx + c = 0\\) and write the three conditions on \\(D\\) that determine the nature.', answer: 'The discriminant is \\(D = b^2 - 4ac\\)',
                  options: ['The discriminant is \\(D = b^2 - 4ac\\)', 'rational and equal'],
                  hint: 'If stuck, revisit c10_math_cbse_04_001 (standard form identification) and c9_math_ch3_5 (irrational.',
                  misconception: 'Students often think that if \\(D > 0\\) and \\(D\\) is a perfect square, the roots are "equal" or "rational and equal".' },
                { id: 'b', prompt: 'Explain why the sign of \\(D = b^2 - 4ac\\) decides the nature of roots. Refer to the quadratic formula in your explanation.', answer: 'The quadratic formula is \\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} = \\frac{-b \\pm',
                  options: ['The quadratic formula is \\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} = \\frac{-b \\pm', 'rational and equal'],
                  hint: 'If stuck, revisit c10_math_cbse_04_001 (standard form identification) and c9_math_ch3_5 (irrational.',
                  misconception: 'Students often think that if \\(D > 0\\) and \\(D\\) is a perfect square, the roots are "equal" or "rational and equal".' },
                { id: 'c', prompt: 'Find the discriminant of \\(3x^2 - 5x + 2 = 0\\) and state the nature of its roots.', answer: 'Given: \\(a = 3\\), \\(b = -5\\), \\(c = 2\\)',
                  options: ['Given: \\(a = 3\\), \\(b = -5\\), \\(c = 2\\)', 'rational and equal'],
                  hint: 'If stuck, revisit c10_math_cbse_04_001 (standard form identification) and c9_math_ch3_5 (irrational.',
                  misconception: 'Students often think that if \\(D > 0\\) and \\(D\\) is a perfect square, the roots are "equal" or "rational and equal".' },
                { id: 'd', prompt: 'The equation \\(kx^2 - 6x + 9 = 0\\) has equal roots. Find the value of \\(k\\). Then, using the same \\(k\\), determine the nature of roots of \\(kx^2 + 6x + 9 = 0\\).', answer: 'For equal roots, \\(D = 0\\)',
                  options: ['For equal roots, \\(D = 0\\)', 'rational and equal'],
                  hint: 'If stuck, revisit c10_math_cbse_04_001 (standard form identification) and c9_math_ch3_5 (irrational.',
                  misconception: 'Students often think that if \\(D > 0\\) and \\(D\\) is a perfect square, the roots are "equal" or "rational and equal".' }
          ],
            remediations: { 'if-d-0-and-d': { steps: ['Show the quadratic formula \\(x = \\frac{-b \\pm \\sqrt{D}}{2a}\\).', 'Take \\(x^2 - 5x + 6 = 0\\) with \\(D = 1\\). Compute roots: \\(\\frac{5 \\pm 1}{2} = 3, 2\\). Ask: "Are they equal?" No.', 'Contrast with \\(x^2 - 4x + 4 = 0\\) where \\(D = 0\\): roots = \\(\\frac{4 \\pm 0}{2} = 2, 2\\).', 'Make a table: \\(D > 0\\), perfect square → distinct rational \\(D > 0\\), not perfect square → distinct irrational \\(D.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that if \\(D > 0\\) and \\(D\\) is a perfect square, the roots are "equal" or "rational and equal".',
          parts: [
                { id: 'a', prompt: 'A student solved \\(2x^2 - 4x + 3 = 0\\) and wrote: "\\(D = (-4)^2 - 4(2)(3) = 16 - 24 = -8\\).', answer: 'The student correctly computed \\(D = -8\\) and concluded no real roots',
                  options: ['The student correctly computed \\(D = -8\\) and concluded no real roots', 'The equation has no real roots', 'imaginary', 'complex'],
                  hint: 'If stuck, revisit c10_math_cbse_04_001 (standard form identification) and c9_math_ch3_5 (irrational.',
                  misconception: 'Students often think that if \\(D > 0\\) and \\(D\\) is a perfect square, the roots are "equal" or "rational and equal".' }
          ],
            remediations: { 'if-d-0-and-d': { steps: ['Show the quadratic formula \\(x = \\frac{-b \\pm \\sqrt{D}}{2a}\\).', 'Take \\(x^2 - 5x + 6 = 0\\) with \\(D = 1\\). Compute roots: \\(\\frac{5 \\pm 1}{2} = 3, 2\\). Ask: "Are they equal?" No.', 'Contrast with \\(x^2 - 4x + 4 = 0\\) where \\(D = 0\\): roots = \\(\\frac{4 \\pm 0}{2} = 2, 2\\).', 'Make a table: \\(D > 0\\), perfect square → distinct rational \\(D > 0\\), not perfect square → distinct irrational \\(D.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_04_008', difficulty: 'standard',
          question: 'For a quadratic equation \\( ax^2 + bx + c = 0 \\) with real coefficients \\(.',
          hint: 'Revisit c10_math_cbse_04_006 (Quadratic Formula: Direct Application) and.',
          misconception: 'Students compute \\( D = b^2 - 4ac \\) correctly and see \\( D > 0 \\), but when applying the quadratic formula, they write.',
          parts: [
                { id: 'a', prompt: 'What is the condition on the discriminant \\( D = b^2 - 4ac \\) for a quadratic equation \\( ax^2 + bx + c = 0 \\) to have two distinct real roots?', answer: 'The condition is \\( D > 0 \\)',
                  options: ['The condition is \\( D > 0 \\)', 'two distinct real roots', 'real roots', 'no real roots'],
                  hint: 'Revisit c10_math_cbse_04_006 (Quadratic Formula: Direct Application) and c10_math_cbse_04_007.',
                  misconception: 'Students compute \\( D = b^2 - 4ac \\) correctly and see \\( D > 0 \\), but when applying the quadratic formula, they write \\( x = \\frac{b \\pm.' }
          ],
            remediations: { 'students-compute-d-b-2': { steps: ['Have the student write the quadratic formula from memory: \\( x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\).', 'Give 3 equations where \\( b \\) is positive, negative, and zero: \\( x^2 + 5x + 6 = 0 \\), \\( x^2 - 5x + 6 = 0 \\), \\( x^2.', 'Solve all three using the formula, emphasising that the numerator is \\( -b \\pm \\sqrt{D} \\), not \\( b \\pm \\sqrt{D} \\).', 'Create a "sign-check" habit: after identifying \\( a, b, c \\), write \\( -b = \\_\\_\\_ \\) explicitly before substituting.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_04_009', difficulty: 'standard',
          question: 'For a quadratic equation in standard form \\(ax^2 + bx + c = 0\\) with \\(a \\neq.',
          hint: 'If stuck, review c10_math_cbse_04_007 (Nature of Roots: The Discriminant) for the three.',
          misconception: '**The "\\(p = 0\\) is valid" error**: When solving \\(b^2 = 4ac\\) for an unknown parameter (e.g., \\(p\\)), students often.',
          parts: [
                { id: 'a', prompt: 'State the condition for a quadratic equation \\(ax^2 + bx + c = 0\\) to have two equal real roots. Write the formula for the repeated root.', answer: 'The condition is \\(D = b^2 - 4ac = 0\\) or equivalently \\(b^2 = 4ac\\)',
                  options: ['The condition is \\(D = b^2 - 4ac = 0\\) or equivalently \\(b^2 = 4ac\\)', '\\(D > 0\\)', '\\(D < 0\\)', 'perfect square only with \\(a=1\\)'],
                  hint: 'If stuck, review c10_math_cbse_04_007 (Nature of Roots: The Discriminant) for the three cases, and.',
                  misconception: '**The "\\(p = 0\\) is valid" error**: When solving \\(b^2 = 4ac\\) for an unknown parameter (e.g., \\(p\\)), students often include \\(p = 0\\).' },
                { id: 'b', prompt: 'Explain why the quadratic equation \\(x^2 - 6x + 9 = 0\\) has equal roots without using the discriminant formula. What is the repeated root?', answer: 'The expression \\(x^2 - 6x + 9\\) is a perfect square trinomial: \\((x - 3)^2\\)',
                  options: ['The expression \\(x^2 - 6x + 9\\) is a perfect square trinomial: \\((x - 3)^2\\)', 'roots are 3 and -3', 'perfect square only with \\(a=1\\)'],
                  hint: 'If stuck, review c10_math_cbse_04_007 (Nature of Roots: The Discriminant) for the three cases, and.',
                  misconception: '**The "\\(p = 0\\) is valid" error**: When solving \\(b^2 = 4ac\\) for an unknown parameter (e.g., \\(p\\)), students often include \\(p = 0\\).' },
                { id: 'c', prompt: 'Find the value of \\(k\\) for which the quadratic equation \\(2x^2 + kx + 8 = 0\\) has equal roots. Also find the repeated root.', answer: 'Given: \\(a = 2\\), \\(b = k\\), \\(c = 8\\)',
                  options: ['Given: \\(a = 2\\), \\(b = k\\), \\(c = 8\\)', 'perfect square only with \\(a=1\\)'],
                  hint: 'If stuck, review c10_math_cbse_04_007 (Nature of Roots: The Discriminant) for the three cases, and.',
                  misconception: '**The "\\(p = 0\\) is valid" error**: When solving \\(b^2 = 4ac\\) for an unknown parameter (e.g., \\(p\\)), students often include \\(p = 0\\).' }
          ],
            remediations: { 'the-p-0-is-valid': { steps: ['Verify \\(a \\neq 0\\) after finding parameter values." If the student treats \\(\\pm 0\\) as two values: Write \\(\\frac{-b.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_04_010', difficulty: 'standard',
          question: 'For a quadratic equation \\(ax^2 + bx + c = 0\\) with real coefficients \\(a,.',
          hint: 'Revisit node c10_math_cbse_04_007 (Nature of Roots: The Discriminant) and practice.',
          misconception: '**Misconception:** "If the discriminant is negative, the quadratic equation has **no solution**." **Exact wrong step:**.',
          parts: [
                { id: 'a', prompt: 'Consider the quadratic equation \\(px^2 - 2\\sqrt{5}px + 15 = 0\\) where \\(p\\) is a non-zero real constant. It is given that the equation has **no real roots**.', answer: '**Step 1:** Coefficients: \\(a = p\\), \\(b = -2\\sqrt{5}p\\), \\(c = 15\\)',
                  options: ['**Step 1:** Coefficients: \\(a = p\\), \\(b = -2\\sqrt{5}p\\), \\(c = 15\\)', 'p can be negative'],
                  hint: 'Revisit node c10_math_cbse_04_007 (Nature of Roots: The Discriminant) and practice identifying \\(a.',
                  misconception: '**Misconception:** "If the discriminant is negative, the quadratic equation has **no solution**." **Exact wrong step:** Students write "No.' }
          ],
            remediations: { 'misconception-if-the-discriminant-is': { steps: ['** Ask the student to complete the square for \\(x^2 - 4x + 5\\) and observe it becomes \\((x-2)^2 + 1\\).', '** Show the graph of \\(y = x^2 - 4x + 5\\) — it\'s a parabola opening upward with vertex at (2,1), entirely above the.', '** For inequality errors, make them solve \\(k^2 < 24\\) on a number line: plot \\(\\pm\\sqrt{24}\\), test a point (e.g.', '** Practice writing the exact phrase: **"The equation has no real roots because \\(D < 0\\)."** Insist on "real" every.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_04_011', difficulty: 'standard',
          question: 'Word problems involving quadratic equations require translating a real-life.',
          hint: 'If stuck, revisit c10_math_cbse_04_002 (Forming Quadratic Equations) and.',
          misconception: 'Students often solve the quadratic equation correctly but forget to reject the extraneous root (e.g., negative time.',
          parts: [
                { id: 'a', prompt: 'A student forms the equation \\(x^2 - 5x + 6 = 0\\) from a problem about two consecutive positive integers whose product is 6.', answer: 'The answer is incomplete',
                  options: ['The answer is incomplete', 'yes, roots are the answer'],
                  hint: 'If stuck, revisit c10_math_cbse_04_002 (Forming Quadratic Equations) and c10_math_cbse_04_003.',
                  misconception: 'Students often solve the quadratic equation correctly but forget to reject the extraneous root (e.g., negative time, negative length, or.' }
          ],
            remediations: { 'students-often-solve-the-quadratic': { steps: ['If a student includes extraneous roots, follow these steps: (1) Ask them to read the problem statement again and.', '(2) Have them write the constraint as an inequality (e.g., \\(x > 0\\)).', '(3) Check each root against the inequality.', '(4) Practice 5 problems where they must write a "Rejection Statement" for each invalid root before writing the final.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_04_012', difficulty: 'standard',
          question: 'Word problems on speed, time, and distance that reduce to quadratic equations.',
          hint: 'If stuck, revisit c10_math_cbse_04_003 (factorisation) and c10_math_cbse_04_006.',
          misconception: 'Students often write the time equation incorrectly by reversing the order of subtraction when a time difference.',
          parts: [
                { id: 'a', prompt: 'Two problems: (A) A car covers 150 km. If speed increases by 10 km/h, time decreases by 30 minutes. (B) A car covers 150 km.', answer: 'For (A): 150/x - 150/(x+10) = 1/2 → x²+10x-3000=0',
                  options: ['For (A): 150/x - 150/(x+10) = 1/2 → x²+10x-3000=0', 'yes, same root'],
                  hint: 'If stuck, revisit c10_math_cbse_04_003 (factorisation) and c10_math_cbse_04_006 (quadratic formula).',
                  misconception: 'Students often write the time equation incorrectly by reversing the order of subtraction when a time difference is given.' }
          ],
            remediations: { 'students-often-write-the-time': { steps: ['If a student makes the subtraction order error, have them first calculate numerical times for a concrete example.', 'New speed = 45 km/h, new time = 8 hours.', 'Which minus which gives +1?', 'So original time minus new time = 1." Then generalise: time1 - time2 = positive difference.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
