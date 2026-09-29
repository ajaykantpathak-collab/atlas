import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch03_p1: SimDef = {
    id: 'v3_c9_math_ch03_p1',
    title: 'Number Systems',
    subtitle: 'From counting numbers to irrationals — the number line is bigger than it looks.',
    classLevel: 9, subject: 'mathematics', topic: 'Number Systems',
    chapters: ['c9_math_ch03'],
    nodeIds: ['c9_math_ch3_1', 'c9_math_ch3_10', 'c9_math_ch3_11', 'c9_math_ch3_2', 'c9_math_ch3_3', 'c9_math_ch3_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a cryptographer choosing keys', intro: 'A colleague claims every number on the line is a fraction in disguise. Your job: find the number that proves him wrong.', goal: 'Classify any number — natural, whole, integer, rational, irrational — and prove why √2 can\'t be a fraction.' },
    discovery: {
        question: 'Between any two fractions there\'s always another fraction. So is EVERY number a fraction?',
        options: ['No — √2 and π can never be written as fractions', 'Yes — decimals are just fractions in disguise', 'Yes — infinity means every number is rational', 'No — only negatives aren\'t fractions'],
        answer: 'No — √2 and π can never be written as fractions',
        hook: 'The number line looks complete with fractions — but irrationals fill gaps the rationals can\'t touch.',
    },
    teaching: [
        { title: 'Natural Numbers and the Discovery of Zero', text: 'Natural numbers (denoted by ℕ) are the set of counting numbers {1, 2, 3, ...} used for ordering and quantifying discrete objects.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch3_1', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'On the number line: locate √2 by geometry — construct it, and see exactly where it sits between the rationals.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'case', nodeId: 'c9_math_ch3_1', title: 'Natural Numbers and the Discovery of Zero',
          caseStudy: { intro: 'Imagine a Class 9 teacher asks: "If you have ₹50 and spend exactly ₹50, how much money do you have left?" You answer "zero rupees." But is "zero" a number you.',
            decisions: [{ prompt: 'State the exact difference between the set of natural numbers (ℕ) and the set of whole numbers (W). Write both sets in roster form.', options: [
                { text: 'ℕ = {1, 2, 3, 4, ...} and W = {0, 1, 2, 3, 4, ...}', outcome: 'ℕ = {1, 2, 3, 4, ...} and W = {0, 1, 2, 3, 4, ...}. The only difference is that W contains 0 while.' },
                { text: 'Is 0 a rational number?', outcome: 'Not quite — Students treat zero as "nothing" rather than a number with specific algebraic properties.', reveals: 'students-treat-zero-as-nothing' },
                { text: 'ℕ includes 0, or that W starts from 1', outcome: 'Not quite — Students treat zero as "nothing" rather than a number with specific algebraic properties.', reveals: 'students-treat-zero-as-nothing' }
            ] }] } },
        { type: 'case', nodeId: 'c9_math_ch3_10', title: 'Operations on Real Numbers: Closure Properties',
          caseStudy: { intro: 'Imagine you are helping your father calculate the total cost of materials for a home renovation.',
            decisions: [{ prompt: 'State the closure property of real numbers under addition. Give one example using an irrational number.', options: [
                { text: 'Correct answer: For any two real numbers \\(a\\) and \\(b\\), \\(a + b\\) is also a real number', outcome: 'Correct answer: For any two real numbers \\(a\\) and \\(b\\), \\(a + b\\) is also a real number.' },
                { text: 'irrational', outcome: 'Not quite — Students often believe the **sum or product of two irrational numbers is always irrational**.', reveals: 'the-sum-or-product-of' },
                { text: 'commutativity \\(a+b=b+a\\', outcome: 'Not quite — Students often believe the **sum or product of two irrational numbers is always irrational**.', reveals: 'the-sum-or-product-of' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_math_ch3_11', title: 'Representing Square Roots on the Number Line',
          scaffold: { problem: 'Represent √5 on the number line using the sequential spiral method (adding 1 unit perpendicular each time).',
            steps: [
            { text: 'Draw a number line l. Mark point O as 0 and point A such that OA = 1 unit (using ruler).' },
            { text: 'At point A, construct a perpendicular line using compass. On this perpendicular, mark point B such that AB = 1 unit.' },
            { text: 'With centre O and radius OB, draw an arc cutting the number line at C. Then OC = √2. (This marks √2 on the number line.)' },
            { text: 'At point C, construct a perpendicular. Mark point D on it such that CD = 1 unit. Join OD. OD = √((√2)²+1²) = √3.' },
            { text: 'With centre O and radius OD, draw an arc cutting the number line at E. Then OE = √3.' },
            { text: 'Repeat: at E, erect perpendicular of 1 unit to get √4 = 2 (point F).', faded: true, blankAnswer: 'Point H on the number line represents √5, at a distance.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch3_2', title: 'Integers: Extension to Negative Numbers',
          scaffold: { problem: 'The temperature in Srinagar at 6 AM was $-4^\\circ\\text{C}$. By noon, it rose by $9^\\circ\\text{C}$.',
            steps: [
            { text: 'Identify the starting temperature: $T_1 = -4^\\circ\\text{C}$.' },
            { text: 'Noon temperature = morning temperature + rise = $-4 + 9$. Since signs differ, subtract absolute values: $9 - 4 = 5$.' },
            { text: 'Midnight temperature = noon temperature - fall = $5 - 13$. Subtracting a larger positive from a smaller positive: $5.' },
            { text: 'Combine into a single expression: $(-4) + 9 - 13$. Group as $[(-4) + 9] - 13 = 5 - 13 = -8$.' },
            { text: 'Verify on a vertical number line: start at $-4$, move up 9 steps to $5$, then move down 13 steps to $-8$.', faded: true, blankAnswer: '$-8^\\circ\\text{C}$' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch3_3', title: 'Rational Numbers: Definition and Representation',
          scaffold: { problem: 'A recipe requires $\\frac{3}{4}$ cup of sugar. You only have a $\\frac{1}{8}$ cup measure. How many $\\frac{1}{8}$ cup scoops do you need?',
            steps: [
            { text: 'Identify what is given — required amount $= \\frac{3}{4}$ cup, scoop size $= \\frac{1}{8}$ cup.' },
            { text: 'Set up the equation: $n = \\frac{3}{4} \\div \\frac{1}{8} = \\frac{3}{4} \\times \\frac{8}{1}$ (division by a fraction.' },
            { text: 'Compute: $n = \\frac{3 \\times 8}{4 \\times 1} = \\frac{24}{4} = 6$. So $n = 6 = \\frac{6}{1}$.' },
            { text: 'Check standard form: $\\frac{6}{1}$ has $q=1 > 0$ and $\\text{HCF}(6,1)=1$ ✓.' },
            { text: 'Interpret: You need 6 scoops of $\\frac{1}{8}$ cup. The rational number is $6$ (or $\\frac{6}{1}$), confirming that whole.', faded: true, blankAnswer: '6 scoops; rational number $\\frac{6}{1}$ (or simply $6$).' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch3_4', title: 'Rational Numbers on the Number Line',
          scaffold: { problem: 'A carpenter needs to cut a wooden plank of length exactly 11/6 metres. He has a measuring tape marked in metres and centimetres (decimals).',
            steps: [
            { text: 'Convert the rational number to decimal. 11 ÷ 6 = 1.8333... (recurring 3). So the number is 1.8333...' },
            { text: 'First magnification: Divide the segment [1, 2] into 10 equal parts (each 0.1). The divisions are 1.1, 1.2, ..., 1.9.' },
            { text: 'Second magnification: Divide the segment [1.8, 1.9] into 10 equal parts (each 0.01).' },
            { text: 'Third magnification: Divide [1.83, 1.84] into 10 equal parts (each 0.001). Divisions: 1.831, 1.832, ..., 1.839.' },
            { text: 'Since the decimal recurs with 3, every subsequent magnification will pick the 3rd sub-interval (e.g., [1.8333, 1.8334].', faded: true, blankAnswer: 'The point 11/6 m is located at the unique intersection.' }
            ] } },
        { type: 'drill', nodeId: 'c9_math_ch3_4', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch3_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Filling a number-system chart, a student writes \'natural numbers start at 0\' and reasons: \'since 0 leaves numbers alone in addition, dividing by 0 should give the number back too — division is just the inverse of multiplication.\'',
            decisions: [{ prompt: 'Which of the two claims needs correction?', options: [
                { text: 'Both: ℕ starts at 1 while whole numbers W add the 0. And zero\'s calm in addition (a + 0 = a) hides its violence in multiplication (a × 0 = 0 for every a) — which is exactly why division by zero is undefined: a ÷ 0 would need an answer that 0 × anything can never produce.', outcome: 'This separates the sets correctly and traces \'cannot divide by zero\' to zero\'s own properties, not an arbitrary rule.' },
                { text: 'Both claims are fine — zero counts and dividing by it just returns the same number.', outcome: 'Zero is a whole number but not a natural number, and 5 ÷ 0 would demand a number whose product with 0 is 5 — impossible when 0 annihilates everything.', reveals: 'zero-is-natural' },
                { text: 'Only the first is wrong — natural numbers start at 1 — but the division logic is sound.', outcome: 'The inverse argument fails precisely at 0: because 0 × x = 0 always, \'5 ÷ 0\' has no candidate answer and \'0 ÷ 0\' has infinitely many — neither can be a number.', reveals: 'divide-by-zero-ok' }
            ] }] } },
        { type: 'case', nodeId: 'c9_math_ch3_4', title: 'The bigger picture',
          caseStudy: { intro: 'Number systems are humanity expanding what \'number\' means — every extension was once heresy and is now arithmetic.',
            decisions: [{ prompt: 'What comes next? Number Systems · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Number Systems · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch3_1', difficulty: 'standard',
          question: 'Natural numbers (denoted by ℕ) are the set of counting numbers {1, 2, 3, ...}.',
          hint: 'If stuck, revisit c6_math_ch01_002 (Natural Numbers and Whole Numbers) and.',
          misconception: 'Students treat zero as "nothing" rather than a number with specific algebraic properties.',
          parts: [
                { id: 'a', prompt: 'State the exact difference between the set of natural numbers (ℕ) and the set of whole numbers (W). Write both sets in roster form.', answer: 'ℕ = {1, 2, 3, 4, ...} and W = {0, 1, 2, 3, 4, ...}',
                  options: ['ℕ = {1, 2, 3, 4, ...} and W = {0, 1, 2, 3, 4, ...}', 'Is 0 a rational number?', 'ℕ includes 0, or that W starts from 1'],
                  hint: 'If stuck, revisit c6_math_ch01_002 (Natural Numbers and Whole Numbers) and c6_math_ch02_021.',
                  misconception: 'Students treat zero as "nothing" rather than a number with specific algebraic properties.' },
                { id: 'b', prompt: 'Explain why zero is called the "additive identity" for whole numbers but the "multiplicative annihilator".', answer: 'Additive identity: for any whole number a, a + 0 = a (e.g., 7 + 0 = 7)',
                  options: ['Additive identity: for any whole number a, a + 0 = a (e.g., 7 + 0 = 7)', 'adding zero changes the number'],
                  hint: 'If stuck, revisit c6_math_ch01_002 (Natural Numbers and Whole Numbers) and c6_math_ch02_021.',
                  misconception: 'Students treat zero as "nothing" rather than a number with specific algebraic properties.' },
                { id: 'c', prompt: 'Compare the closure property of whole numbers under addition and under subtraction. Is W closed under subtraction?', answer: 'W is closed under addition: for any a, b ∈ W, a + b ∈ W (e.g., 3 + 5 = 8 ∈ W)',
                  options: ['W is closed under addition: for any a, b ∈ W, a + b ∈ W (e.g., 3 + 5 = 8 ∈ W)', 'W is closed under subtraction'],
                  hint: 'If stuck, revisit c6_math_ch01_002 (Natural Numbers and Whole Numbers) and c6_math_ch02_021.',
                  misconception: 'Students treat zero as "nothing" rather than a number with specific algebraic properties.' }
          ],
            remediations: { 'students-treat-zero-as-nothing': { steps: ['Remediation: 1) Return to the definition: a ÷ b = c means c × b = a.', '2) Test with b = 0: ask "What number c makes c × 0 = 5?" — none exists, so 5 ÷ 0 is undefined.', '3) Test with a = 0, b = 0: "What number c makes c × 0 = 0?" — every number works, so 0 ÷ 0 has no unique answer.', '4) Contrast with 0 ÷ 5 = 0 because 0 × 5 = 0 (unique).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch3_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat zero as "nothing" rather than a number with specific algebraic properties.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Since 0 is the additive identity, dividing any number by 0 should give that number back, because division is the inverse of multiplication.".', answer: 'The conclusion is incorrect',
                  options: ['The conclusion is incorrect', 'the inverse of multiplication (a × b = c ⇒ c ÷ b = a) works for b = 0'],
                  hint: 'If stuck, revisit c6_math_ch01_002 (Natural Numbers and Whole Numbers) and c6_math_ch02_021.',
                  misconception: 'Students treat zero as "nothing" rather than a number with specific algebraic properties.' }
          ],
            remediations: { 'students-treat-zero-as-nothing': { steps: ['Remediation: 1) Return to the definition: a ÷ b = c means c × b = a.', '2) Test with b = 0: ask "What number c makes c × 0 = 5?" — none exists, so 5 ÷ 0 is undefined.', '3) Test with a = 0, b = 0: "What number c makes c × 0 = 0?" — every number works, so 0 ÷ 0 has no unique answer.', '4) Contrast with 0 ÷ 5 = 0 because 0 × 5 = 0 (unique).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch3_10', difficulty: 'standard',
          question: 'The set of real numbers is closed under addition, subtraction, and.',
          hint: 'Revisit the definitions of rational (c9_math_ch3_3) and irrational numbers.',
          misconception: 'Students often believe the **sum or product of two irrational numbers is always irrational**.',
          parts: [
                { id: 'a', prompt: 'Why is the set of real numbers **not** closed under division if we include division by zero? Give a specific numerical example.', answer: 'Correct answer: Division by zero is undefined in mathematics',
                  options: ['Correct answer: Division by zero is undefined in mathematics', 'infinite', 'irrational', '\\(5 \\div 0 = \\infty\\'],
                  hint: 'Revisit the definitions of rational (c9_math_ch3_3) and irrational numbers (c9_math_ch3_5) and the.',
                  misconception: 'Students often believe the **sum or product of two irrational numbers is always irrational**.' },
                { id: 'b', prompt: 'Let \\(a = \\sqrt{5}\\) and \\(b = \\sqrt{20}\\). Determine whether each of the following results in a real number: \\(a + b\\), \\(a - b\\), \\(a \\times b\\), \\(a \\div.', answer: '\\(a = \\sqrt{5}\\), \\(b = \\sqrt{20} = 2\\sqrt{5}\\)',
                  options: ['\\(a = \\sqrt{5}\\), \\(b = \\sqrt{20} = 2\\sqrt{5}\\)', 'irrational', 'the product of two irrationals is always irrational', 'the **sum or product of two irrational numbers is always irrational**'],
                  hint: 'Revisit the definitions of rational (c9_math_ch3_3) and irrational numbers (c9_math_ch3_5) and the.',
                  misconception: 'Students often believe the **sum or product of two irrational numbers is always irrational**.' }
          ],
            remediations: { 'the-sum-or-product-of': { steps: ['Write the definition of closure: "A set \\(S\\) is closed under operation \\(\\circ\\) if for all \\(a,b \\in S\\), \\(a \\circ.', 'Test \\(\\mathbb{I}\\) with addition: Take \\(\\sqrt{2} \\in \\mathbb{I}\\) and \\(-\\sqrt{2} \\in \\mathbb{I}\\).', 'Sum \\(= 0 \\notin \\mathbb{I}\\).', 'Conclusion: \\(\\mathbb{I}\\) not closed under addition.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch3_11', difficulty: 'standard',
          question: 'Representing square roots on the number line is a geometric construction method.',
          hint: 'Revisit c8_math_ch9_5 (Baudhayana-Pythagoras Theorem) and c8_math_ch9_6 (Visual Proof).',
          misconception: 'Students often treat the square root spiral as a linear process: they think the distance from √2 to √3 is 1 unit.',
          parts: [
                { id: 'a', prompt: 'What is the length of the hypotenuse of a right triangle with legs of length 1 unit and 1 unit, and where does this length appear on the number line.', answer: 'The hypotenuse length is √2 units',
                  options: ['The hypotenuse length is √2 units', '2 units', '1.5 units'],
                  hint: 'Revisit c8_math_ch9_5 (Baudhayana-Pythagoras Theorem) and c8_math_ch9_6 (Visual Proof) to rebuild.',
                  misconception: 'Students often treat the square root spiral as a linear process: they think the distance from √2 to √3 is 1 unit (because 3-2=1), so they.' },
                { id: 'b', prompt: 'Explain why constructing a perpendicular of 1 unit at the point √2 on the number line and joining it to zero gives a hypotenuse of exactly √3.', answer: 'The existing distance from zero to √2 is one leg (√2)',
                  options: ['The existing distance from zero to √2 is one leg (√2)', 'we add 1 to √2 to get √3', 'the hypotenuse becomes √2 + 1'],
                  hint: 'Revisit c8_math_ch9_5 (Baudhayana-Pythagoras Theorem) and c8_math_ch9_6 (Visual Proof) to rebuild.',
                  misconception: 'Students often treat the square root spiral as a linear process: they think the distance from √2 to √3 is 1 unit (because 3-2=1), so they.' }
          ],
            remediations: { 'students-often-treat-the-square': { steps: ['If a student makes this error, immediately have them measure the actual distance between √2 and √3 on a correctly.', 'Ask: "Is this gap 1 cm?" They\'ll see it\'s ~0.318 cm.', 'Then re-derive: (√3)² - (√2)² = 3-2=1, but that\'s the difference of squares, not the difference of lengths.', 'Walk through the right triangle: leg1=√2, leg2=1, hyp=√3.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch3_2', difficulty: 'standard',
          question: 'Integers are the set of numbers consisting of all positive whole numbers, their.',
          hint: 'Revisit the number line model for integer addition/subtraction (Class 6/7): physically.',
          misconception: 'Students treat subtraction of a negative integer as subtraction of its absolute value.',
          parts: [
                { id: 'a', prompt: 'State the additive inverse of $-17$ and explain what happens when you add an integer to its additive inverse.', answer: 'The additive inverse of $-17$ is $17$',
                  options: ['The additive inverse of $-17$ is $17$', 'additive inverse', 'absolute value', 'the inverse is $-17$ or that the sum is $-34$'],
                  hint: 'Revisit the number line model for integer addition/subtraction (Class 6/7): physically draw the.',
                  misconception: 'Students treat subtraction of a negative integer as subtraction of its absolute value.' },
                { id: 'b', prompt: 'Why does the product of two negative integers, say $(-4) \\times (-3)$, have to be positive $12$?', answer: 'Consider $(-4) \\times (3 + (-3)) = (-4) \\times 0 = 0$',
                  options: ['Consider $(-4) \\times (3 + (-3)) = (-4) \\times 0 = 0$', 'it\'s just a rule'],
                  hint: 'Revisit the number line model for integer addition/subtraction (Class 6/7): physically draw the.',
                  misconception: 'Students treat subtraction of a negative integer as subtraction of its absolute value.' },
                { id: 'c', prompt: 'A submarine is at $-250$ metres (below sea level). It ascends $120$ metres, then descends $80$ metres, and finally ascends $50$ metres.', answer: 'Start: $-250$',
                  options: ['Start: $-250$', 'descend'],
                  hint: 'Revisit the number line model for integer addition/subtraction (Class 6/7): physically draw the.',
                  misconception: 'Students treat subtraction of a negative integer as subtraction of its absolute value.' },
                { id: 'd', prompt: 'Compare the two expressions: $A = (-5) \\times (-2) \\times (-3)$ and $B = (-5) \\times [(-2) \\times (-3)]$. Are they equal?', answer: 'Yes, they are equal',
                  options: ['Yes, they are equal', 'brackets change the sign'],
                  hint: 'Revisit the number line model for integer addition/subtraction (Class 6/7): physically draw the.',
                  misconception: 'Students treat subtraction of a negative integer as subtraction of its absolute value.' }
          ],
            remediations: { 'students-treat-subtraction-of-a': { steps: ['Return to the number line: physically act out "start at 7, subtract -5".', 'Subtracting means "move in the opposite direction of the number".', 'The number is $-5$ (left), so opposite direction is right.', 'Use the additive inverse definition: $a - b = a + (-b)$.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch3_3', difficulty: 'standard',
          question: 'A rational number is any number that can be expressed in the form $\\frac{p}{q}$.',
          hint: 'If stuck, revisit c6_math_ch03_031 (Equivalent Fractions) and c6_math_ch02_024.',
          misconception: '**Misconception:** "A number is rational only if it is *written* as a fraction $\\frac{p}{q}$." **Exact error:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A rational number is any number that can be expressed in the form $\\frac{p}{q}$ where $p$',
                  options: ['A rational number is any number that can be expressed in the form $\\frac{p}{q}$ where $p$', 'Natural numbers (denoted by ℕ) are the set of counting numbers {1, 2, 3, ...} used for', 'The set of real numbers is closed under addition, subtraction, and multiplication: for', 'Representing square roots on the number line is a geometric construction method that uses'],
                  hint: 'If stuck, revisit c6_math_ch03_031 (Equivalent Fractions) and c6_math_ch02_024 (Properties.',
                  misconception: '**Misconception:** "A number is rational only if it is *written* as a fraction $\\frac{p}{q}$." **Exact error:** Students classify $0.75$.' }
          ],
            remediations: { 'misconception-a-number-is-rational': { steps: ['**Revisit conversion:** Give 10 numbers in mixed forms (integers, decimals, fractions, roots, repeating decimals).', 'For each, student *must* write the $\\frac{p}{q}$ form explicitly before classifying.', '**Use the definition as a checklist:** "Is $p$ integer?', 'If yes to all → rational." Do this aloud for $\\sqrt{16}$, $0.\\overline{3}$, $-7$, $\\frac{22}{7}$.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch3_4', difficulty: 'standard',
          question: 'A rational number is any number that can be expressed as the quotient p/q.',
          hint: 'If stuck, revisit the long division method for converting fractions to decimals.',
          misconception: 'Students often treat the successive magnification process as merely a drawing exercise and think that because they stop.',
          parts: [
                { id: 'a', prompt: 'Locate the rational number 7/4 on the number line using the method of successive magnification.', answer: 'Step 1: 7/4 = 1.75',
                  options: ['Step 1: 7/4 = 1.75', '[1.74, 1.75] instead of recognizing it\'s exactly on the mark'],
                  hint: 'If stuck, revisit the long division method for converting fractions to decimals (c9_math_ch3_3) and.',
                  misconception: 'Students often treat the successive magnification process as merely a drawing exercise and think that because they stop drawing after 3-4.' }
          ],
            remediations: { 'students-often-treat-the-successive': { steps: ['If a student makes the negative interval error, do this: 1) Draw a number line from -1 to 0.', 'Mark -0.1, -0.2, ..., -0.9.', 'Ask: "Which is larger, -0.6 or -0.7?" (Answer: -0.6).', '2) Ask: "Where does -0.66 lie?'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
