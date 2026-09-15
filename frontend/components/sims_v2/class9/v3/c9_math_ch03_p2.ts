import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch03_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch03_p2: SimDef = {
    id: 'v3_c9_math_ch03_p2',
    title: 'Number Systems',
    subtitle: 'From counting numbers to irrationals — the number line is bigger than it looks.',
    classLevel: 9, subject: 'mathematics', topic: 'Number Systems · Part 2/2',
    chapters: ['c9_math_ch03'],
    nodeIds: ['c9_math_ch3_5', 'c9_math_ch3_6', 'c9_math_ch3_7', 'c9_math_ch3_8', 'c9_math_ch3_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a cryptographer choosing keys', intro: 'A colleague claims every number on the line is a fraction in disguise. Your job: find the number that proves him wrong.', goal: 'Classify any number — natural, whole, integer, rational, irrational — and prove why √2 can\'t be a fraction.' },
    discovery: {
        question: 'Between any two fractions there\'s always another fraction. So is EVERY number a fraction?',
        options: ['No — √2 and π can never be written as fractions', 'Yes — decimals are just fractions in disguise', 'Yes — infinity means every number is rational', 'No — only negatives aren\'t fractions'],
        answer: 'No — √2 and π can never be written as fractions',
        hook: 'The number line looks complete with fractions — but irrationals fill gaps the rationals can\'t touch.',
    },
    teaching: [
        { title: 'Irrational Numbers: Definition and Examples', text: 'An irrational number is a real number that cannot be expressed as a ratio of two integers \\( \\frac{p}{q} \\) where \\( p, q \\in \\mathbb{Z} \\) and \\( q \\neq 0 \\).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch3_5', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'On the number line: locate √2 by geometry — construct it, and see exactly where it sits between the rationals.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'case', nodeId: 'c9_math_ch3_5', title: 'Irrational Numbers: Definition and Examples',
          caseStudy: { intro: 'Imagine you have a square plot of land with each side exactly 1 metre. You want to build a fence along the diagonal.',
            decisions: [{ prompt: 'State the definition of an irrational number in your own words, and give one example that is NOT \\( \\sqrt{2} \\) or \\( \\pi \\).', options: [
                { text: 'An irrational number cannot be written as \\( \\frac{p}{q} \\) with integers \\( p,q \\) (\\( q', outcome: 'An irrational number cannot be written as \\( \\frac{p}{q} \\) with integers \\( p,q \\) (\\( q \\neq 0.' },
                { text: 'a number with a square root', outcome: 'Not quite — Students believe **any number written with a square root symbol (\\( \\sqrt{} \\)) is irrational**.', reveals: 'any-number-written-with-a' },
                { text: 'a non-terminating decimal', outcome: 'Not quite — Students believe **any number written with a square root symbol (\\( \\sqrt{} \\)) is irrational**.', reveals: 'any-number-written-with-a' }
            ] }] } },
        { type: 'case', nodeId: 'c9_math_ch3_6', title: 'Real Numbers: Union of Rational and Irrational Numbers',
          caseStudy: { intro: 'Imagine you are measuring the length of a diagonal of a square tile of side 1 metre in your kitchen. You know the length is √2 metres.',
            decisions: [{ prompt: 'State the definition of the set of real numbers in terms of rational and irrational numbers. Use set notation.', options: [
                { text: 'The set of real numbers ℝ is the union of the set of rational numbers ℚ and the set of', outcome: 'The set of real numbers ℝ is the union of the set of rational numbers ℚ and the set of irrational.' },
                { text: 'irrational', outcome: 'Not quite — Students often think "irrational" means "not a real number" or "not a valid number".', reveals: 'irrational-means-not-a-real' },
                { text: 'not a real number', outcome: 'Not quite — Students often think "irrational" means "not a real number" or "not a valid number".', reveals: 'irrational-means-not-a-real' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_math_ch3_7', title: 'Decimal Expansions of Rational Numbers: Terminating Decimals',
          scaffold: { problem: 'A recipe requires \\( \\frac{117}{250} \\) kg of sugar. The digital scale shows weight in kilograms with three decimal places (e.g., 0.468.',
            steps: [
            { text: 'Identify the given fraction: \\( \\frac{117}{250} \\). Check if it is in lowest terms. 117 = 9 × 13 = 3² × 13.' },
            { text: 'Factor the denominator: \\( 250 = 2 \\times 5^3 \\). The prime factors are only 2 and 5.' },
            { text: 'Apply the condition: since the denominator has only 2 and 5 as prime factors, the decimal expansion terminates.' },
            { text: 'Determine the number of decimal places: \\( m = 1 \\) (power of 2), \\( n = 3 \\) (power of 5). Maximum = 3.' },
            { text: 'Convert to decimal to verify: \\( \\frac{117}{250} = \\frac{117 \\times 4}{250 \\times 4} = \\frac{468}{1000} = 0.468 \\).', faded: true, blankAnswer: 'Yes, the scale will display exactly 0.468 kg.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch3_8', title: 'Decimal Expansions of Rational Numbers: Non-Terminating Recurring',
          scaffold: { problem: 'Express 7/13 as a decimal. Identify the recurring block and write the answer with a bar.',
            steps: [
            { text: 'Write 7 as 7.000000... and divide by 13 using long division.' },
            { text: '13 goes into 70 five times (13×5=65), remainder 5. Write 5 after decimal point.' },
            { text: 'Bring down 0 → 50. 13 goes into 50 three times (13×3=39), remainder 11. Write 3.' },
            { text: 'Bring down 0 → 110. 13 goes into 110 eight times (13×8=104), remainder 6. Write 8.' },
            { text: 'Bring down 0 → 60. 13 goes into 60 four times (13×4=52), remainder 8. Write 4.' },
            { text: 'Bring down 0 → 80. 13 goes into 80 six times (13×6=78), remainder 2. Write 6.' },
            { text: 'Bring down 0 → 20. 13 goes into 20 one time (13×1=13), remainder 7. Write 1.' },
            { text: 'Remainder 7 is the original numerator, so the sequence of remainders (5,11,6,8,2,7) will repeat.', faded: true, blankAnswer: '0.\\overline{538461}' }
            ] } },
        { type: 'case', nodeId: 'c9_math_ch3_9', title: 'Decimal Expansions of Irrational Numbers: Non-Terminating Non-Recurring',
          caseStudy: { intro: 'Imagine you are measuring the diagonal of a square floor tile of side 1 metre using a ruler marked in millimetres.',
            decisions: [{ prompt: 'Which of the following decimal expansions represents an irrational number? (A) 0.125 (B) 0.333... (C) 0.101001000100001...', options: [
                { text: 'Correct answer: (C) 0.101001000100001', outcome: 'Correct answer: (C) 0.101001000100001... Reason: (A) terminates, (B) and (D) are recurring.' },
                { text: 'any infinite decimal is irrational', outcome: 'Not quite — Students often believe that any non-terminating decimal is irrational, ignoring the recurring case.', reveals: 'any-non-terminating-decimal-is' },
                { text: 'any non-terminating decimal is irrational, ignoring the recurring case', outcome: 'Not quite — Students often believe that any non-terminating decimal is irrational, ignoring the recurring case.', reveals: 'any-non-terminating-decimal-is' }
            ] }] } },
        { type: 'drill', nodeId: 'c9_math_ch3_9', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch3_5', title: 'Use it in the wild',
          caseStudy: { intro: 'Filling a number-system chart, a student writes \'natural numbers start at 0\' and reasons: \'since 0 leaves numbers alone in addition, dividing by 0 should give the number back too — division is just the inverse of multiplication.\'',
            decisions: [{ prompt: 'Which of the two claims needs correction?', options: [
                { text: 'Both: ℕ starts at 1 while whole numbers W add the 0. And zero\'s calm in addition (a + 0 = a) hides its violence in multiplication (a × 0 = 0 for every a) — which is exactly why division by zero is undefined: a ÷ 0 would need an answer that 0 × anything can never produce.', outcome: 'This separates the sets correctly and traces \'cannot divide by zero\' to zero\'s own properties, not an arbitrary rule.' },
                { text: 'Both claims are fine — zero counts and dividing by it just returns the same number.', outcome: 'Zero is a whole number but not a natural number, and 5 ÷ 0 would demand a number whose product with 0 is 5 — impossible when 0 annihilates everything.', reveals: 'zero-is-natural' },
                { text: 'Only the first is wrong — natural numbers start at 1 — but the division logic is sound.', outcome: 'The inverse argument fails precisely at 0: because 0 × x = 0 always, \'5 ÷ 0\' has no candidate answer and \'0 ÷ 0\' has infinitely many — neither can be a number.', reveals: 'divide-by-zero-ok' }
            ] }] } },
        { type: 'case', nodeId: 'c9_math_ch3_9', title: 'You made it',
          caseStudy: { intro: 'Number systems are humanity expanding what \'number\' means — every extension was once heresy and is now arithmetic.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch3_5', difficulty: 'standard',
          question: 'An irrational number is a real number that cannot be expressed as a ratio.',
          hint: 'If stuck, revisit **c9_math_ch3_3 (Rational Numbers: Definition and Representation)** for.',
          misconception: 'Students believe **any number written with a square root symbol (\\( \\sqrt{} \\)) is irrational**.',
          parts: [
                { id: 'a', prompt: 'Explain why \\( 0.101001000100001\\ldots \\) (where the number of zeros between ones increases by one each time) is irrational, but \\( 0.\\overline{101} \\).', answer: '\\( 0.101001000100001\\ldots \\) has a pattern but **no fixed repeating block**',
                  options: ['\\( 0.101001000100001\\ldots \\) has a pattern but **no fixed repeating block**', 'any pattern', '**any number written with a square root symbol (\\( \\sqrt{} \\)) is irrational**'],
                  hint: 'If stuck, revisit **c9_math_ch3_3 (Rational Numbers: Definition and Representation)** for the \\.',
                  misconception: 'Students believe **any number written with a square root symbol (\\( \\sqrt{} \\)) is irrational**.' },
                { id: 'b', prompt: 'Compare the decimal expansions of \\( \\sqrt{2} \\) and \\( \\sqrt{4} \\). Why does the presence of a square root symbol not guarantee irrationality?', answer: '\\( \\sqrt{4}=2.0 \\) (terminating decimal) → rational',
                  options: ['\\( \\sqrt{4}=2.0 \\) (terminating decimal) → rational', 'all square roots are irrational', '**any number written with a square root symbol (\\( \\sqrt{} \\)) is irrational**'],
                  hint: 'If stuck, revisit **c9_math_ch3_3 (Rational Numbers: Definition and Representation)** for the \\.',
                  misconception: 'Students believe **any number written with a square root symbol (\\( \\sqrt{} \\)) is irrational**.' }
          ],
            remediations: { 'any-number-written-with-a': { steps: ['**Simplify first**: Ask the student to simplify \\( \\sqrt{9}, \\sqrt{16}, \\sqrt{0.25}, \\sqrt{\\frac{4}{9}} \\) completely.', '**Check the result**: After simplification, if the answer is an integer or a fraction \\( \\frac{p}{q} \\), it is rational.', '**Decimal test**: For non-terminating decimals, ask: "Does a *fixed block* of digits repeat forever?" If yes →.', '**Practice set**: Give 10 numbers mixing perfect squares, non-perfect squares, terminating, recurring, and.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch3_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **any number written with a square root symbol (\\( \\sqrt{} \\)) is irrational**.',
          parts: [
                { id: 'a', prompt: 'A student claims: "\\( 0.123456789101112\\ldots \\) (writing natural numbers in order) is rational because it has a clear pattern." Evaluate this claim and.', answer: 'The claim is **false**',
                  options: ['The claim is **false**', 'pattern', 'recurring block', '**any number written with a square root symbol (\\( \\sqrt{} \\)) is irrational**'],
                  hint: 'If stuck, revisit **c9_math_ch3_3 (Rational Numbers: Definition and Representation)** for the \\.',
                  misconception: 'Students believe **any number written with a square root symbol (\\( \\sqrt{} \\)) is irrational**.' },
                { id: 'b', prompt: 'Create two irrational numbers between \\( \\sqrt{2} \\) and \\( \\sqrt{3} \\). Explain how you know they are irrational and lie in that interval.', answer: '\\( \\sqrt{2}\\approx1.414 \\), \\( \\sqrt{3}\\approx1.732 \\)',
                  options: ['\\( \\sqrt{2}\\approx1.414 \\), \\( \\sqrt{3}\\approx1.732 \\)', '**any number written with a square root symbol (\\( \\sqrt{} \\)) is irrational**'],
                  hint: 'If stuck, revisit **c9_math_ch3_3 (Rational Numbers: Definition and Representation)** for the \\.',
                  misconception: 'Students believe **any number written with a square root symbol (\\( \\sqrt{} \\)) is irrational**.' }
          ],
            remediations: { 'any-number-written-with-a': { steps: ['**Simplify first**: Ask the student to simplify \\( \\sqrt{9}, \\sqrt{16}, \\sqrt{0.25}, \\sqrt{\\frac{4}{9}} \\) completely.', '**Check the result**: After simplification, if the answer is an integer or a fraction \\( \\frac{p}{q} \\), it is rational.', '**Decimal test**: For non-terminating decimals, ask: "Does a *fixed block* of digits repeat forever?" If yes →.', '**Practice set**: Give 10 numbers mixing perfect squares, non-perfect squares, terminating, recurring, and.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch3_6', difficulty: 'standard',
          question: 'The set of real numbers, denoted by ℝ, is the union of the set of rational.',
          hint: 'If stuck, revisit the definition of rational numbers (p/q form) and the examples.',
          misconception: 'Students often think "irrational" means "not a real number" or "not a valid number".',
          parts: [
                { id: 'a', prompt: 'Explain why the number 0.101001000100001... (where the number of zeros between ones increases by one each time) is a real number. Is it rational or irrational?', answer: 'The given decimal is non-terminating and non-repeating, so it is irrational',
                  options: ['The given decimal is non-terminating and non-repeating, so it is irrational', 'or that irrational numbers are somehow', 'not a valid number', 'irrational'],
                  hint: 'If stuck, revisit the definition of rational numbers (p/q form) and the examples of irrational.',
                  misconception: 'Students often think "irrational" means "not a real number" or "not a valid number".' },
                { id: 'b', prompt: 'Classify each of the following numbers as rational or irrational, and hence state whether each is a real number: (a) √(49/64) (b) √(2/3) (c) 0.121221222...', answer: '√(49/64) (',
                  options: ['√(49/64) (', 'irrational', 'not a real number', 'not a valid number'],
                  hint: 'If stuck, revisit the definition of rational numbers (p/q form) and the examples of irrational.',
                  misconception: 'Students often think "irrational" means "not a real number" or "not a valid number".' },
                { id: 'c', prompt: 'Consider the statement: "Every real number is either rational or irrational, but not both." Analyze this statement and prove that the sets ℚ and 𝕀 are.', answer: 'By definition, a rational number can be expressed as p/q where p,q ∈ ℤ, q≠0',
                  options: ['By definition, a rational number can be expressed as p/q where p,q ∈ ℤ, q≠0', 'irrational', 'not a real number', 'not a valid number'],
                  hint: 'If stuck, revisit the definition of rational numbers (p/q form) and the examples of irrational.',
                  misconception: 'Students often think "irrational" means "not a real number" or "not a valid number".' }
          ],
            remediations: { 'irrational-means-not-a-real': { steps: ['If a student says "√2 is not real because it\'s irrational", do the following: (1) Draw a number line and mark 0, 1, 2.', '(2) Construct a right triangle with legs 1 cm each; the hypotenuse is √2 cm.', '(3) Use a compass to transfer this length to the number line from 0.', '(4) Point to the mark and say: "This point exists on the number line.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch3_7', difficulty: 'standard',
          question: 'A rational number \\( \\frac{p}{q} \\) (in lowest terms, \\( q \\neq 0 \\)) has.',
          hint: 'If stuck, revisit prime factorization (Class 6 node c6_math_ch01_015) and simplifying.',
          misconception: 'Students often think that if a denominator is even or ends with 5, the decimal terminates.',
          parts: [
                { id: 'a', prompt: 'Explain why a rational number with denominator 12 (in lowest terms) cannot have a terminating decimal expansion, while one with denominator 25 can.', answer: '12 = \\( 2^2 \\times 3 \\) contains a prime factor 3',
                  options: ['12 = \\( 2^2 \\times 3 \\) contains a prime factor 3', 'if a denominator is even or ends with 5, the decimal terminates'],
                  hint: 'If stuck, revisit prime factorization (Class 6 node c6_math_ch01_015) and simplifying fractions.',
                  misconception: 'Students often think that if a denominator is even or ends with 5, the decimal terminates.' },
                { id: 'b', prompt: 'Without performing long division, determine whether \\( \\frac{17}{1250} \\) has a terminating decimal expansion.', answer: 'Step 1: Check if fraction is in lowest terms',
                  options: ['Step 1: Check if fraction is in lowest terms', '3 places', 'non-terminating', 'if a denominator is even or ends with 5, the decimal terminates'],
                  hint: 'If stuck, revisit prime factorization (Class 6 node c6_math_ch01_015) and simplifying fractions.',
                  misconception: 'Students often think that if a denominator is even or ends with 5, the decimal terminates.' }
          ],
            remediations: { 'if-a-denominator-is-even': { steps: ['If a student makes this error: 1.', 'Ask them to prime factorize the denominator of \\( \\frac{1}{6} \\) and \\( \\frac{1}{15} \\) completely.', 'Have them attempt to multiply each denominator by integers (2, 4, 5, 8, 10, ...) to see if they ever get a power of 10.', 'They will find they never do because the factor 3 remains.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch3_8', difficulty: 'standard',
          question: 'A rational number in its simplest form p/q (where q ≠ 0) has a non-terminating.',
          hint: 'Revisit long division of integers (especially when dividend < divisor) and the method.',
          misconception: 'Students often believe that any non-terminating decimal is irrational. They see 0.333...',
          parts: [
                { id: 'a', prompt: 'What condition on the denominator q (in simplest form) guarantees that the rational number p/q has a non-terminating recurring decimal expansion?', answer: 'The denominator q must have at least one prime factor other than 2 and 5',
                  options: ['The denominator q must have at least one prime factor other than 2 and 5', 'the denominator must be coprime to 10', 'any non-terminating decimal is irrational'],
                  hint: 'Revisit long division of integers (especially when dividend < divisor) and the method of converting.',
                  misconception: 'Students often believe that any non-terminating decimal is irrational. They see 0.333...' },
                { id: 'b', prompt: 'When dividing 1 by 7 using long division, the remainders you get are 1, 3, 2, 6, 4, 5, and then 1 again.', answer: 'The decimal expansion repeats',
                  options: ['The decimal expansion repeats', 'length 7', 'the repetition starts only when the same digit appears, not the same remainder', 'any non-terminating decimal is irrational'],
                  hint: 'Revisit long division of integers (especially when dividend < divisor) and the method of converting.',
                  misconception: 'Students often believe that any non-terminating decimal is irrational. They see 0.333...' },
                { id: 'c', prompt: 'Convert the fraction 5/12 into its decimal form. Show the long division steps and clearly indicate the recurring part with a bar.', answer: 'Step 1: 12 goes into 5 zero times, write 0',
                  options: ['Step 1: 12 goes into 5 zero times, write 0', 'any non-terminating decimal is irrational'],
                  hint: 'Revisit long division of integers (especially when dividend < divisor) and the method of converting.',
                  misconception: 'Students often believe that any non-terminating decimal is irrational. They see 0.333...' }
          ],
            remediations: { 'any-non-terminating-decimal-is': { steps: ['If a student insists non-terminating decimals are irrational, first do long division of 1/3 together on the board.', 'Then ask: "Since we are dividing two integers, the result must be rational by definition.', 'The decimal is just a representation." For conversion errors, use the "multiply by powers of 10 to align the repeating.', '(2) Multiply by 10^n to move the non-recurring part left of the decimal.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch3_9', difficulty: 'standard',
          question: 'An irrational number is a real number whose decimal expansion.',
          hint: 'Review c9_math_ch3_7 and c9_math_ch3_8 for the two types of rational decimal expansions.',
          misconception: 'Students often believe that any non-terminating decimal is irrational, ignoring the recurring case.',
          parts: [
                { id: 'a', prompt: 'Which of the following decimal expansions represents an irrational number? (A) 0.125 (B) 0.333... (C) 0.101001000100001... (D) 0.142857142857...', answer: 'Correct answer: (C) 0.101001000100001',
                  options: ['Correct answer: (C) 0.101001000100001', 'any infinite decimal is irrational', 'any non-terminating decimal is irrational, ignoring the recurring case'],
                  hint: 'Review c9_math_ch3_7 and c9_math_ch3_8 for the two types of rational decimal expansions.',
                  misconception: 'Students often believe that any non-terminating decimal is irrational, ignoring the recurring case. For example, they classify 0.333...' },
                { id: 'b', prompt: 'A student claims: "Since 1/7 = 0.142857142857... has a repeating block, it is irrational because the decimals go on forever." Explain why this reasoning.', answer: 'Correct answer: The student confuses "non-terminating" with "non-recurring"',
                  options: ['Correct answer: The student confuses "non-terminating" with "non-recurring"', 'non-terminating', 'non-recurring', 'any non-terminating decimal is irrational, ignoring the recurring case'],
                  hint: 'Review c9_math_ch3_7 and c9_math_ch3_8 for the two types of rational decimal expansions.',
                  misconception: 'Students often believe that any non-terminating decimal is irrational, ignoring the recurring case. For example, they classify 0.333...' },
                { id: 'c', prompt: 'Determine whether the number 0.1234567891011121314... (formed by concatenating natural numbers) is rational or irrational. Justify your answer.', answer: 'Correct answer: Irrational',
                  options: ['Correct answer: Irrational', 'counting numbers', 'any non-terminating decimal is irrational, ignoring the recurring case'],
                  hint: 'Review c9_math_ch3_7 and c9_math_ch3_8 for the two types of rational decimal expansions.',
                  misconception: 'Students often believe that any non-terminating decimal is irrational, ignoring the recurring case. For example, they classify 0.333...' },
                { id: 'd', prompt: 'Compare the decimal expansions of √2 ≈ 1.41421356... and 1.41421356 (a terminating decimal).', answer: 'Correct answer: √2 is irrational',
                  options: ['Correct answer: √2 is irrational', 'any non-terminating decimal is irrational, ignoring the recurring case'],
                  hint: 'Review c9_math_ch3_7 and c9_math_ch3_8 for the two types of rational decimal expansions.',
                  misconception: 'Students often believe that any non-terminating decimal is irrational, ignoring the recurring case. For example, they classify 0.333...' }
          ],
            remediations: { 'any-non-terminating-decimal-is': { steps: ['To fix: Have the student write the definition of rational decimal expansion: "terminating OR non-terminating recurring".', 'Then give them a set of decimals: 0.5, 0.333..., 0.121212..., 0.1010010001...', 'Ask them to classify each using the definition.', 'For each non-terminating one, explicitly ask: "Does a block of digits repeat exactly?'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
